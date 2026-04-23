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
  "Anglais A1": {
    qcmPositionnement: [
      { question: "How do you say 'bonjour' in English?", options: ["Goodbye", "Hello", "Sorry", "Please"], correctIndex: 1 },
      { question: "What is the English word for 'maison'?", options: ["Car", "Book", "House", "School"], correctIndex: 2 },
      { question: "Choose the correct sentence:", options: ["I is French", "I am French", "I are French", "I be French"], correctIndex: 1 },
      { question: "'She ___ a doctor.'", options: ["am", "are", "is", "be"], correctIndex: 2 },
      { question: "What day comes after Monday?", options: ["Wednesday", "Sunday", "Tuesday", "Thursday"], correctIndex: 2 },
      { question: "How do you say your age in English?", options: ["I have 30 years", "I am 30 years old", "I am 30 years", "I have 30 old"], correctIndex: 1 },
      { question: "What is the plural of 'child'?", options: ["Childs", "Childrens", "Children", "Childes"], correctIndex: 2 },
      { question: "'I ___ coffee every morning.'", options: ["drinks", "drink", "drinking", "am drink"], correctIndex: 1 },
      { question: "What colour is the sky?", options: ["Red", "Green", "Blue", "Yellow"], correctIndex: 2 },
      { question: "'Where ___ you from?'", options: ["is", "am", "do", "are"], correctIndex: 3 },
    ],
    qcmFinal: [
      { question: "'He ___ to work by bus every day.'", options: ["go", "goes", "going", "goed"], correctIndex: 1 },
      { question: "Choose the correct article: '___ apple'", options: ["a", "an", "the", "—"], correctIndex: 1 },
      { question: "'They ___ have a car.'", options: ["doesn't", "isn't", "don't", "aren't"], correctIndex: 2 },
      { question: "What time is 14:30?", options: ["Two thirty", "Half past two", "Quarter past two", "Both A and B"], correctIndex: 3 },
      { question: "'___ is your name?' – 'My name is Sophie.'", options: ["Where", "How", "What", "Who"], correctIndex: 2 },
      { question: "'I like ___.'", options: ["swim", "to swimming", "swimming", "swims"], correctIndex: 2 },
      { question: "'The book is ___ the table.'", options: ["in", "on", "at", "to"], correctIndex: 1 },
      { question: "'She ___ two brothers and one sister.'", options: ["have", "has", "is", "are"], correctIndex: 1 },
      { question: "Which sentence is correct?", options: ["She is a nurse", "She is nurse", "She am a nurse", "She are nurse"], correctIndex: 0 },
      { question: "'Can I have the ___, please?' (at a restaurant)", options: ["ticket", "bill", "note", "paper"], correctIndex: 1 },
    ],
    exercices: [
      { titre: "Exercise 1: Introduce Yourself", consigne: "Write 8 sentences about yourself in English. Include: your name, age, nationality, job, family, where you live, what you like, and your daily routine.", reponseAttendue: "My name is [Name] and I am happy to introduce myself in English. I am thirty years old and I am French. I was born in a small city in France but now I live in Paris with my family. I work as a [position] at [company] where I have been working for three years. My job is very interesting because I meet many different people every day and I learn new things. I have two children, a boy who is seven and a girl who is four. They go to school near our house. In my free time, I like reading books and watching films with my family. I also enjoy cooking French food at the weekend. Every morning, I wake up at half past six. I have breakfast with my children, then I take the metro to go to work. I start working at nine o'clock and I finish at half past five. In the evening, I help my children with their homework and we have dinner together. I go to bed at about eleven o'clock. I think learning English is very important for my career and I am very motivated to improve my level." },
      { titre: "Exercise 2: Describe Your Family", consigne: "Write a short paragraph (6-8 sentences) describing your family in English. Use: my mother, my father, my brother/sister, names, ages, and jobs.", reponseAttendue: "I would like to talk about my family. My family is quite big and we are very close to each other. My father is sixty-two years old and he is retired now. Before, he worked as an engineer in a factory for more than thirty years. My mother is fifty-eight years old and she works part-time as a secretary in a doctor's office. She is very kind and she loves cooking for the whole family. I have one older brother and one younger sister. My brother is thirty-five and he works as a teacher in a high school in Lyon. He is married and he has two children, so I am an uncle. My sister is twenty-five and she is studying at university. She wants to become a lawyer. We all get together every Sunday for a family lunch at my parents' house. It is always a very happy moment because we eat well and we talk a lot. I love my family very much and I am grateful for them." },
      { titre: "Exercise 3: Write a Simple Email", consigne: "Write a short professional email to your colleague to invite them to a meeting tomorrow at 10 o'clock. Include: greeting, the information, and closing.", reponseAttendue: "Subject: Meeting tomorrow at 10 o'clock. Dear colleague, I hope you are doing well. I am writing to let you know that there will be a team meeting tomorrow morning at ten o'clock in the main meeting room on the second floor. The meeting will last approximately one hour. We will discuss the new project and the planning for next month. Could you please bring the sales report from last week? It would be very useful for our discussion. Also, if you have any questions or topics you would like to add to the agenda, please send them to me before the end of today. There will be coffee and biscuits available in the meeting room. I hope you can attend. Please confirm your availability by replying to this email. Thank you very much and see you tomorrow. Best regards, [Name]." },
      { titre: "Exercise 4: At the Restaurant – Dialogue", consigne: "Write a dialogue between a waiter and a customer at a restaurant. The customer orders a main course, a drink, and asks for the bill. Minimum 10 lines.", reponseAttendue: "Waiter: Good evening, welcome to our restaurant. Do you have a reservation? Customer: Good evening. No, I don't have a reservation. A table for one, please. Waiter: Of course, please follow me. Here is your table by the window. Customer: Thank you, it is very nice here. Waiter: Here is the menu. Would you like something to drink while you choose? Customer: Yes, I would like a glass of red wine, please. Waiter: Certainly. Are you ready to order? Customer: Yes, I think so. I would like the grilled chicken with vegetables and a side salad, please. Waiter: Excellent choice. Would you like any bread with that? Customer: Yes, please. Waiter: Here is your meal. Enjoy your dinner. Customer: Thank you very much, it looks delicious. Customer: Excuse me, can I have the bill, please? Waiter: Of course, here it is. That will be twenty-three euros. Customer: Can I pay by credit card? Waiter: Yes, of course. Here is the card machine. Customer: Thank you. The food was really good. I will come back again. Waiter: Thank you, have a good evening!" },
      { titre: "Exercise 5: My Daily Routine", consigne: "Describe your typical day from morning to evening in English. Write at least 10 sentences using the present simple and time expressions.", reponseAttendue: "Let me describe my typical day from morning to evening. I wake up at seven o'clock every morning when my alarm rings. The first thing I do is take a shower and get dressed for work. Then I go to the kitchen and I have breakfast. I usually eat toast with butter and jam and I drink a big cup of coffee. I leave the house at quarter past eight and I walk to the bus stop. The bus takes about twenty minutes to get to my office. I arrive at work at nine o'clock. In the morning, I check my emails and I have meetings with my colleagues. At half past twelve, I have lunch in the company canteen. I usually eat a salad or a sandwich. In the afternoon, I work on my computer and I make phone calls to clients. I finish work at half past five. Sometimes I go to the gym after work because I like to stay in shape. I get home at about seven o'clock. I cook dinner for my family and we eat together at half past seven. After dinner, I help my children with their homework. Then I watch television or I read a book. I go to bed at about eleven o'clock because I need to rest for the next day." },
      { titre: "Exercise 6: Describe a Picture", consigne: "Look at the picture provided (an office scene) and describe what you see in English. Use: there is/there are, prepositions of place, and colours. Write at least 8 sentences.", reponseAttendue: "I am going to describe the office scene in the picture. There is a large wooden desk in the middle of the room. On the desk, there is a computer with a big screen and a keyboard. Next to the computer, there is a white cup of coffee and some papers. There are two comfortable black chairs in front of the desk. Behind the desk, there is a big window with blue curtains. Through the window, I can see some trees and the sky. On the left side of the room, there is a tall bookshelf with many books and folders. The books are different colours: red, blue, green and yellow. On the right side, there is a small table with a printer on it. There are some plants in the corner of the room. The plants are green and they make the office look nice and fresh. The walls are painted in a light grey colour and there is a clock on the wall above the door. The floor is made of dark brown wood. There is also a white board on the wall for writing notes during meetings. The office looks very clean, organised and professional." },
      { titre: "Exercise 7: Shopping Role Play", consigne: "Write a dialogue in a clothing shop. You want to buy a shirt. Ask about the price, the size, and the colour. Minimum 8 lines.", reponseAttendue: "Customer: Good morning, excuse me. I am looking for a shirt for work. Shop assistant: Good morning, welcome. What kind of shirt are you looking for? Customer: I need a formal shirt, please. Do you have any in blue? Shop assistant: Yes, we have several blue shirts. What size do you need? Customer: I am a medium, I think. Can I try this one on? Shop assistant: Of course. The fitting rooms are over there on the right. Customer: Thank you. It fits very well. How much does it cost? Shop assistant: This shirt is thirty-five euros. We also have a special offer today: if you buy two shirts, you get ten percent off. Customer: That is a good deal. Do you have the same shirt in white? Shop assistant: Yes, here you are. Would you like to try it on as well? Customer: No, it is the same size so it should be fine. I will take both shirts, please. Shop assistant: Very good. That will be sixty-three euros in total with the discount. Customer: Can I pay by card? Shop assistant: Yes, of course. Here is the card machine. Would you like a bag? Customer: Yes, please. Thank you for your help. Shop assistant: You are welcome. Have a nice day!" },
      { titre: "Exercise 8: My Hobbies", consigne: "Write a short text (8-10 sentences) about your hobbies and free time activities in English. Use: I like + verb-ing, I enjoy, I love, I don't like.", reponseAttendue: "I have many hobbies and I like doing different things in my free time. First of all, I really enjoy reading books, especially novels and detective stories. I usually read before going to bed because it helps me relax after a long day at work. I also love cooking, particularly French and Italian food. At the weekend, I often try new recipes and I cook a special meal for my family. I like going for walks in the park near my house because the fresh air makes me feel good. I enjoy playing football with my friends on Saturday mornings. We have a small team and we play in the local park. I love travelling to new countries during the holidays. Last summer, I went to Spain and it was fantastic. I like taking photos when I travel so I can remember the beautiful places. I also enjoy listening to music, especially jazz and pop. I don't like running because I find it boring and tiring. I don't enjoy watching television very much because I prefer to do activities outside. Sometimes, I like gardening in the summer. I grow tomatoes, herbs and flowers in my garden. It is very relaxing and I feel proud when I see the plants growing." },
      { titre: "Exercise 9: Asking for Directions", consigne: "Write a dialogue where you ask a stranger for directions to the train station. Include: excuse me, go straight, turn left/right, how far, thank you.", reponseAttendue: "Me: Excuse me, sorry to bother you. I am a bit lost. Could you please tell me how to get to the train station? Stranger: Of course, no problem. It is not very far from here. Me: Oh good, thank you. Which way do I need to go? Stranger: Okay, so first, go straight ahead on this road for about two hundred metres. You will pass a bakery on your left and a pharmacy on your right. Me: Okay, I go straight ahead. Stranger: Then, at the traffic lights, turn left into the big avenue. Continue walking for about three minutes. Me: Turn left at the traffic lights, got it. Stranger: After that, you will see a supermarket on the right side of the road. Turn right just after the supermarket into a small street. Me: Right after the supermarket. Stranger: Yes, exactly. Walk along that street and the train station will be right in front of you. You cannot miss it because there is a big sign. Me: Is it far from the supermarket? Stranger: No, not at all. It takes about two minutes to walk from there. The whole journey from here should take you about ten minutes on foot. Me: That is great, thank you very much for your help. I really appreciate it. Stranger: You are welcome. Have a good trip!" },
      { titre: "Exercise 10: At the Doctor", consigne: "Write a dialogue at the doctor's office. You have a headache and a sore throat. The doctor asks questions and gives advice. Minimum 10 lines.", reponseAttendue: "Receptionist: Good morning, do you have an appointment? Patient: Good morning. Yes, my appointment is at ten o'clock. My name is [Name]. Receptionist: Please take a seat in the waiting room. The doctor will see you in a few minutes. Doctor: Good morning, please come in and sit down. What seems to be the problem? Patient: Good morning, doctor. I don't feel very well. I have a bad headache and my throat is very sore. Doctor: I see. How long have you had these symptoms? Patient: I have had the headache for three days now and my throat started hurting two days ago. Doctor: Do you have a fever or a temperature? Patient: I think so. I felt very hot last night and I could not sleep well. Doctor: Let me check your temperature. Yes, you have a slight fever, thirty-eight degrees. Let me look at your throat. Please open your mouth and say 'aah'. Patient: Aah. Doctor: Your throat is quite red and swollen. It looks like you have a throat infection. Are you taking any medication at the moment? Patient: No, I am not taking anything. I only took some paracetamol yesterday for the headache. Doctor: Okay, I am going to prescribe you some antibiotics. Take one tablet three times a day after meals for seven days. Also, drink a lot of water and hot tea with honey. It will help your throat. Patient: Should I stay at home and rest? Doctor: Yes, I recommend that you rest for at least three days. I will give you a sick note for your employer. Please come back to see me if you don't feel better after five days. Patient: Thank you very much, doctor. I will follow your advice. Doctor: You are welcome. Take care and get well soon." },
    ],
    competences: ["Se présenter en anglais", "Comprendre des phrases simples", "Utiliser le vocabulaire quotidien", "Écrire des messages courts", "Participer à des conversations simples", "Décrire son environnement", "Utiliser les structures grammaticales de base"],
    appreciations: [
      "Excellent progress for a beginner. Can introduce herself/himself confidently. Good pronunciation and enthusiasm. Vocabulary well acquired.",
      "Very good participation. The basic grammar (to be, to have, present simple) is well mastered. Writing exercises are clear and correct.",
      "Good overall level. Can hold simple conversations about daily life. Needs more practice with spelling and written expression.",
      "Satisfactory progress. The essential vocabulary is acquired. Must continue practising the present simple (especially the -s for he/she).",
      "Strong motivation and regular participation. The dialogues are well performed. Good comprehension of spoken English.",
      "Good command of basic structures. Can write simple emails and describe routine. Pronunciation improving steadily.",
      "Very good work throughout the course. The exercises on family, food and daily routine are excellent. Confident speaker.",
      "Solid foundation in A1 English built. Can ask and answer simple questions. Reading comprehension is good. Should practise listening more.",
      "Active participant with good engagement. Can navigate basic situations (restaurant, shopping, directions). Grammar foundations in place.",
      "Remarkable progression from zero to functional A1. Can introduce himself/herself, describe daily routine, and write short messages.",
      "Good acquisition of A1 competences. Particularly strong in vocabulary (colours, numbers, family). Should review articles (a/an/the).",
      "Excellent dedication and practice. Consistently completed all exercises. Ready to progress to A2 level.",
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
  "Initiation Word": {
    qcmPositionnement: [
      { question: "À quoi sert Microsoft Word ?", options: ["Faire des calculs", "Créer et mettre en forme des documents texte", "Naviguer sur Internet", "Retoucher des photos"], correctIndex: 1 },
      { question: "Comment créer un nouveau document dans Word ?", options: ["Fichier > Nouveau", "Affichage > Nouveau", "Insertion > Document", "Outils > Créer"], correctIndex: 0 },
      { question: "Quel raccourci permet de sauvegarder un document ?", options: ["Ctrl+P", "Ctrl+S", "Ctrl+N", "Ctrl+Z"], correctIndex: 1 },
      { question: "Comment mettre un texte en gras ?", options: ["Ctrl+I", "Ctrl+G", "Ctrl+B", "Ctrl+U"], correctIndex: 2 },
      { question: "Que signifie l'extension .docx ?", options: ["Un fichier image", "Un fichier Word", "Un fichier Excel", "Un fichier PDF"], correctIndex: 1 },
      { question: "Quel onglet permet d'insérer une image ?", options: ["Accueil", "Insertion", "Mise en page", "Révision"], correctIndex: 1 },
      { question: "Comment annuler la dernière action ?", options: ["Ctrl+Y", "Ctrl+Z", "Ctrl+A", "Ctrl+X"], correctIndex: 1 },
      { question: "Qu'est-ce qu'un en-tête dans Word ?", options: ["Le titre du document", "Une zone qui apparaît en haut de chaque page", "La première ligne du texte", "Le nom du fichier"], correctIndex: 1 },
      { question: "Comment sélectionner tout le texte d'un document ?", options: ["Ctrl+T", "Ctrl+A", "Ctrl+S", "Ctrl+E"], correctIndex: 1 },
      { question: "Quel menu permet de modifier les marges ?", options: ["Accueil", "Insertion", "Mise en page", "Affichage"], correctIndex: 2 },
    ],
    qcmFinal: [
      { question: "Comment insérer un tableau dans Word ?", options: ["Insertion > Tableau", "Accueil > Tableau", "Mise en page > Grille", "Affichage > Tableau"], correctIndex: 0 },
      { question: "Quel raccourci permet de copier du texte ?", options: ["Ctrl+V", "Ctrl+C", "Ctrl+X", "Ctrl+P"], correctIndex: 1 },
      { question: "Comment changer l'orientation d'une page en paysage ?", options: ["Accueil > Orientation", "Mise en page > Orientation > Paysage", "Insertion > Page paysage", "Affichage > Paysage"], correctIndex: 1 },
      { question: "À quoi sert le pied de page ?", options: ["Afficher du texte en bas de chaque page", "Ajouter une note de bas de page", "Numéroter les paragraphes", "Insérer une image en bas"], correctIndex: 0 },
      { question: "Comment créer une liste à puces ?", options: ["Accueil > Puces", "Insertion > Liste", "Mise en page > Puces", "Révision > Liste"], correctIndex: 0 },
      { question: "Quel bouton permet d'aligner le texte au centre ?", options: ["Aligner à gauche", "Centrer", "Justifier", "Aligner à droite"], correctIndex: 1 },
      { question: "Comment modifier l'interligne d'un paragraphe ?", options: ["Accueil > Interligne", "Insertion > Espacement", "Mise en page > Retrait", "Affichage > Lignes"], correctIndex: 0 },
      { question: "Quel format est recommandé pour imprimer un document Word ?", options: [".xlsx", ".pptx", ".pdf", ".txt"], correctIndex: 2 },
      { question: "Comment insérer un saut de page ?", options: ["Insertion > Saut de page", "Accueil > Page suivante", "Mise en page > Couper", "Appuyer 20 fois sur Entrée"], correctIndex: 0 },
      { question: "Que fait le raccourci Ctrl+P ?", options: ["Coller", "Imprimer", "Enregistrer", "Fermer"], correctIndex: 1 },
    ],
    exercices: [
      { titre: "Exercice 1 : Création d'un courrier professionnel", consigne: "Créez un courrier professionnel avec en-tête, date, adresse du destinataire, objet, corps de texte et signature. Appliquez une police Times New Roman taille 12, un interligne 1,5 et des marges de 2,5 cm.", reponseAttendue: "Document avec mise en forme professionnelle : en-tête avec coordonnées, date alignée à droite, adresse du destinataire à gauche, objet en gras, corps de texte justifié, formule de politesse et signature." },
      { titre: "Exercice 2 : Mise en forme d'un CV", consigne: "Créez un CV d'une page avec : nom et prénom en titre, photo insérée, sections (Expérience, Formation, Compétences) avec puces, mise en forme soignée avec couleurs et bordures.", reponseAttendue: "CV structuré avec titre en gras taille 16, photo insérée et redimensionnée, sections clairement identifiées avec titres en couleur, listes à puces pour les éléments, mise en page aérée et professionnelle." },
      { titre: "Exercice 3 : Tableau et mise en page", consigne: "Créez un tableau de 4 colonnes et 6 lignes représentant un planning hebdomadaire. Mettez en forme les en-têtes (fond coloré, texte en gras blanc), ajustez les largeurs de colonnes et centrez le tableau.", reponseAttendue: "Tableau avec en-têtes colorés (Jour, Matin, Après-midi, Soir), bordures nettes, texte centré dans les cellules, largeurs de colonnes adaptées au contenu, tableau centré sur la page." },
      { titre: "Exercice 4 : Document avec images et formes", consigne: "Créez un document de type 'flyer' d'une page : insérez un titre WordArt, 2 images avec habillage de texte, une forme avec du texte et une bordure de page décorative.", reponseAttendue: "Flyer attractif avec titre WordArt centré, images insérées avec habillage 'carré' ou 'rapproché', forme (rectangle arrondi) avec texte d'accroche, bordure de page appliquée via Mise en page > Bordures." },
      { titre: "Exercice 5 : Préparation à l'impression", consigne: "Prenez le document fourni et préparez-le pour l'impression : ajoutez un en-tête avec le nom de l'entreprise, un pied de page avec numérotation, vérifiez l'aperçu avant impression et ajustez les marges si nécessaire.", reponseAttendue: "Document avec en-tête personnalisé (nom entreprise + logo), pied de page avec numéro de page centré, marges ajustées (2 cm), aperçu vérifié sans débordement, document prêt à l'impression." },
      { titre: "Exercice 6 : Synthèse – Document professionnel complet", consigne: "Créez un document professionnel de 2 pages : page 1 avec titre, introduction et tableau récapitulatif ; page 2 avec listes à puces, image insérée et conclusion. Appliquez une mise en page cohérente avec en-têtes/pieds de page.", reponseAttendue: "Document de 2 pages avec saut de page, mise en forme cohérente (police uniforme, titres en gras et colorés), tableau professionnel, listes structurées, image pertinente, en-tête et pied de page sur chaque page." },
    ],
    competences: ["Découverte et navigation dans l'interface Word", "Création et enregistrement de documents", "Mise en forme du texte et des paragraphes", "Insertion d'objets (images, tableaux, formes)", "Mise en page et préparation à l'impression"],
    appreciations: [
      "Excellente prise en main de Word. Les documents créés sont soignés et professionnels. Très bonne autonomie dès le 2e jour.",
      "Bonne progression sur la mise en forme. Les tableaux sont bien maîtrisés. L'insertion d'images nécessite encore un peu de pratique.",
      "Très bon travail d'ensemble. Le CV et le courrier sont de qualité professionnelle. Exercices réalisés avec soin.",
      "Niveau satisfaisant. Les bases sont acquises. Doit encore consolider la gestion des en-têtes et pieds de page.",
      "Excellente participation. A terminé tous les exercices avec brio. Capable de créer des documents professionnels de qualité.",
      "Bonne compréhension des fonctionnalités. La mise en page est maîtrisée. Quelques hésitations sur l'habillage d'images.",
      "Solide acquisition des compétences Word de base. Les exercices pratiques sont bien réussis. Progression visible.",
      "Très bonne implication tout au long de la formation. Le document de synthèse finale est remarquable.",
      "Bon niveau atteint. Les listes, tableaux et mises en forme sont acquis. Continue de pratiquer régulièrement.",
      "Progression remarquable entre le test initial et l'évaluation finale. Objectifs pleinement atteints.",
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
      { question: "Que peut-on faire avec Adobe Firefly ?", options: ["Uniquement du texte", "Générer des images intégrées à la suite Adobe", "De la comptabilité", "Du montage vidéo avancé"], correctIndex: 1 },
      { question: "L'IA peut-elle remplacer totalement un rédacteur humain ?", options: ["Oui, complètement", "Non, elle reste un outil d'assistance", "Seulement pour les emails", "Uniquement en anglais"], correctIndex: 1 },
      { question: "Que signifie FALC ?", options: ["Format Avancé de Lecture Continue", "Facile à Lire et à Comprendre", "Fichier Automatisé de Langues Courantes", "Formation Appliquée en Lecture Cognitive"], correctIndex: 1 },
    ],
    qcmFinal: [
      { question: "Quels sont les 5 éléments d'un prompt structuré ?", options: ["Rôle, Cible, Objectif, Contexte, Format", "Titre, Image, Lien, Couleur, Police", "Date, Lieu, Heure, Nom, Prénom", "Sujet, Verbe, COD, COI, CC"], correctIndex: 0 },
      { question: "Quelle technique consiste à donner des exemples à l'IA ?", options: ["Zero-shot", "Few-shot prompting", "Brainstorming", "Mind mapping"], correctIndex: 1 },
      { question: "Que dit l'AI Act européen ?", options: ["L'IA est interdite", "Des obligations de transparence pour les contenus IA", "Seuls les Européens peuvent utiliser l'IA", "L'IA est libre de tout cadre"], correctIndex: 1 },
      { question: "Peut-on saisir des données personnelles dans ChatGPT ?", options: ["Oui, sans limite", "Non, cela enfreint le RGPD", "Seulement les emails", "Seulement les noms"], correctIndex: 1 },
      { question: "Que faut-il faire avant de publier un texte généré par IA ?", options: ["Le publier immédiatement", "Le vérifier, le relire et l'enrichir", "Le traduire", "Le supprimer"], correctIndex: 1 },
      { question: "Comment rendre un contenu accessible à une personne avec un handicap visuel ?", options: ["Augmenter le volume sonore", "Rédiger des textes alternatifs pour les images", "Utiliser plus de couleurs", "Écrire en italique"], correctIndex: 1 },
      { question: "Quel est l'avantage du prompting itératif ?", options: ["Obtenir un résultat parfait du premier coup", "Affiner progressivement le résultat", "Écrire moins", "Utiliser moins de tokens"], correctIndex: 1 },
      { question: "Comment anonymiser un prompt contenant des données sensibles ?", options: ["Supprimer le prompt", "Remplacer les données réelles par des données fictives", "Ajouter 'confidentiel' au début", "Envoyer le prompt par email"], correctIndex: 1 },
      { question: "Quel niveau de risque l'IA Act attribue-t-il aux chatbots ?", options: ["Inacceptable", "Élevé", "Limité", "Minimal"], correctIndex: 2 },
      { question: "Quel est le workflow recommandé pour optimiser un contenu IA ?", options: ["Copier-coller directement", "Analyse → Optimisation → Validation", "Laisser l'IA faire tout automatiquement", "Écrire tout soi-même"], correctIndex: 1 },
    ],
    exercices: [
      { titre: "C1 – Exercice : Plan stratégique d'implémentation IA", consigne: "À partir d'un contexte professionnel donné, analysez le poste de travail, identifiez les tâches optimisables par l'IA Générative, et rédigez un plan stratégique d'intégration avec un tableau de justification des outils choisis (ChatGPT, Gemini, Firefly, Copilot).", reponseAttendue: "Plan structuré comprenant : diagnostic du poste, identification d'au moins 4 tâches optimisables, tableau de sélection d'outils avec justification, calendrier de mise en œuvre, prise en compte du handicap." },
      { titre: "C2 – Exercice : Rédaction d'un prompt structuré", consigne: "Rédigez un prompt complet respectant la structure Rôle-Cible-Objectif-Contexte-Format pour demander à un outil d'IA de rédiger un article professionnel. Fournissez le contenu généré et commentez sa pertinence.", reponseAttendue: "Prompt structuré avec les 5 composantes clairement identifiées. Contenu généré pertinent et adapté à l'objectif. Analyse critique de la qualité du résultat." },
      { titre: "C3 – Exercice : Correction d'un prompt à risque", consigne: "Un prompt vous est fourni contenant des données confidentielles d'entreprise. Identifiez les risques de violation de données, corrigez le prompt en appliquant les bonnes pratiques de sécurité, et justifiez vos corrections.", reponseAttendue: "Identification de tous les éléments sensibles (noms, montants, emails). Prompt corrigé avec anonymisation complète. Justification argumentée de chaque correction." },
      { titre: "C4 – Exercice : Production d'un contenu inclusif", consigne: "Produisez un contenu rédactionnel accessible en tenant compte des besoins d'une personne en situation de handicap cognitif. Fournissez le prompt et le contenu en FALC. À l'oral, présentez les adaptations pour les handicaps visuel, auditif et cognitif.", reponseAttendue: "Prompt intégrant les consignes FALC. Contenu en phrases courtes (15 mots max), mots simples, structure logique. Connaissance des 3 types d'accessibilité (alt text, sous-titres, FALC)." },
      { titre: "C5 – Exercice : Optimisation d'un contenu généré", consigne: "Un contenu déjà généré par IA vous est fourni. Rédigez un prompt d'optimisation selon les critères imposés (changement de ton et prise en compte d'un handicap). Fournissez le contenu optimisé et commentez les améliorations.", reponseAttendue: "Prompt d'optimisation ciblé et pertinent. Contenu amélioré respectant tous les critères (ton adapté, accessibilité préservée). Analyse comparative avant/après." },
      { titre: "C6 – Exercice : Analyse de conformité IA Act et RGPD", consigne: "Un cas pratique vous est présenté avec un contenu généré par IA présentant des risques réglementaires et éthiques. Identifiez les risques, expliquez les conséquences, et proposez des solutions conformes à l'IA Act et au RGPD.", reponseAttendue: "Identification précise des risques (données personnelles, biais discriminants, absence de marquage). Conséquences détaillées (sanctions, atteinte image). Solutions conformes et argumentées avec références IA Act/RGPD." },
    ],
    competences: [
      "C1 – Stratégie d'implémentation de l'IA Générative",
      "C2 – Prompt Engineering (requêtage)",
      "C3 – Confidentialité des données professionnelles",
      "C4 – Production de contenus inclusifs",
      "C5 – Optimisation des contenus générés par l'IA",
      "C6 – Conformité IA Act et RGPD",
    ],
    appreciations: [
      "Excellente maîtrise de la stratégie d'implémentation IA et du prompt engineering. Les contenus produits sont pertinents, inclusifs et conformes. Très bonne compréhension du cadre réglementaire.",
      "Bonne progression sur l'ensemble des compétences. Les prompts sont bien structurés (Rôle-Cible-Objectif-Contexte-Format). Doit encore approfondir les aspects de confidentialité des données.",
      "Très bon niveau d'ensemble. L'analyse de conformité IA Act/RGPD est rigoureuse. Les contenus inclusifs respectent les normes d'accessibilité. Participation très active.",
      "Niveau satisfaisant. Les bases du prompting sont acquises. La prise en compte du handicap est bien intégrée. Doit approfondir la veille réglementaire.",
      "Excellente créativité dans l'optimisation des contenus. Les corrections de prompts à risque sont exemplaires. Usage responsable de l'IA bien intégré.",
      "Bonne compréhension des outils et de leurs limites. Le plan stratégique d'implémentation est pertinent et bien justifié. Progression visible.",
      "Très bonne implication. La production de contenus FALC est maîtrisée. Bonne capacité à identifier les risques réglementaires.",
      "Solide acquisition des 6 compétences. Les exercices de mise en situation sont bien réalisés. Argumentation claire à l'oral.",
      "Bon résultat global. L'anonymisation des données et la conformité RGPD sont bien appliquées. Les mentions obligatoires sont respectées.",
      "Progression remarquable. De novice en IA à un usage confiant, responsable et conforme. Les objectifs de certification sont pleinement atteints.",
    ],
  },
  "Massage Prénatal": {
    qcmPositionnement: [
      { question: "À partir de quel mois de grossesse peut-on pratiquer un massage prénatal ?", options: ["1er mois", "3ème mois (après le 1er trimestre)", "6ème mois", "9ème mois"], correctIndex: 1 },
      { question: "Quelle position est recommandée pour masser une femme enceinte ?", options: ["Sur le ventre", "Sur le dos uniquement", "Sur le côté (décubitus latéral)", "Debout"], correctIndex: 2 },
      { question: "Quel est l'objectif principal du massage prénatal ?", options: ["Déclencher l'accouchement", "Soulager les tensions et favoriser le bien-être", "Remplacer le suivi médical", "Muscler le dos"], correctIndex: 1 },
      { question: "Quelle zone du corps est souvent source de tension chez la femme enceinte ?", options: ["Les oreilles", "La région lombaire et le bassin", "Les poignets", "Les genoux"], correctIndex: 1 },
      { question: "Quelle huile est généralement déconseillée pendant la grossesse ?", options: ["Huile d'amande douce", "Huile essentielle de sauge", "Huile de coco", "Huile de jojoba"], correctIndex: 1 },
      { question: "Qu'est-ce que le périnée ?", options: ["Un muscle du bras", "L'ensemble des muscles du plancher pelvien", "Un os du bassin", "Un ligament du genou"], correctIndex: 1 },
      { question: "Quelle technique de respiration aide à la relaxation prénatale ?", options: ["Hyperventilation", "Respiration abdominale profonde", "Apnée prolongée", "Respiration buccale rapide"], correctIndex: 1 },
      { question: "Pourquoi faut-il éviter les pressions profondes sur certains points d'acupression ?", options: ["Elles sont douloureuses", "Elles peuvent stimuler des contractions", "Elles provoquent des hématomes", "Elles n'ont aucun effet"], correctIndex: 1 },
      { question: "Quel est le rôle du massage du bassin chez la femme enceinte ?", options: ["Élargir les os", "Soulager les douleurs pelviennes et préparer à l'accouchement", "Accélérer la grossesse", "Tonifier les abdominaux"], correctIndex: 1 },
      { question: "Quelle contre-indication absolue interdit le massage prénatal ?", options: ["Fatigue légère", "Grossesse à risque avec menace d'accouchement prématuré", "Mal de dos modéré", "Stress quotidien"], correctIndex: 1 },
    ],
    qcmFinal: [
      { question: "Quelles sont les trois phases d'une séance de massage prénatal ?", options: ["Accueil-massage-repos", "Recentrage-massage-retour au calme", "Échauffement-massage-étirement", "Diagnostic-traitement-facturation"], correctIndex: 1 },
      { question: "Comment adapter la pression du massage au 3ème trimestre ?", options: ["Augmenter la pression", "Utiliser des pressions douces et enveloppantes", "Ne plus masser", "Masser uniquement les pieds"], correctIndex: 1 },
      { question: "Quel exercice de conscience corporelle est pratiqué en massage prénatal ?", options: ["Sprint", "Prise de conscience du bassin et mobilisation douce", "Musculation abdominale", "Gainage intense"], correctIndex: 1 },
      { question: "Pourquoi intègre-t-on la respiration dans le massage prénatal ?", options: ["Pour occuper la cliente", "Pour favoriser la détente, l'oxygénation et la connexion mère-bébé", "Pour fatiguer la cliente", "Pour mesurer la fréquence cardiaque"], correctIndex: 1 },
      { question: "Quelle technique spécifique soulage les jambes lourdes chez la femme enceinte ?", options: ["Percussion vigoureuse", "Drainage lymphatique doux (effleurage ascendant)", "Massage transverse profond", "Application de froid"], correctIndex: 1 },
      { question: "Comment positionner les coussins pour un massage en décubitus latéral ?", options: ["Un seul sous la tête", "Sous la tête, entre les genoux et sous le ventre", "Aucun coussin nécessaire", "Uniquement sous les pieds"], correctIndex: 1 },
      { question: "Quel est le bénéfice du massage du dos pendant la grossesse ?", options: ["Corriger la scoliose", "Soulager les tensions musculaires dues au poids du ventre", "Renforcer les muscles", "Aucun bénéfice prouvé"], correctIndex: 1 },
      { question: "Quelles huiles végétales sont recommandées pour le massage prénatal ?", options: ["Huile de moteur", "Amande douce, jojoba, argan", "Huile de friture", "Huile de ricin pure"], correctIndex: 1 },
      { question: "Comment terminer une séance de massage prénatal ?", options: ["En réveillant brusquement la cliente", "Par un retour au calme progressif avec respiration et temps d'intégration", "En demandant de se lever immédiatement", "Par des exercices de musculation"], correctIndex: 1 },
      { question: "Quel suivi est recommandé après une séance de massage prénatal ?", options: ["Aucun", "Conseils d'hydratation, repos et auto-massage à domicile", "Prescription médicale", "Régime alimentaire strict"], correctIndex: 1 },
    ],
    exercices: [
      { titre: "Exercice 1 : Pratique de recentrage et respiration", consigne: "Réalisez une séquence de recentrage de 10 minutes incluant une respiration abdominale guidée, un balayage corporel et une mise en connexion mère-bébé.", reponseAttendue: "Le stagiaire guide la cliente en position confortable, propose une respiration en 4 temps (inspir 4s, pause 2s, expir 6s), réalise un balayage corporel de la tête aux pieds et invite à la connexion avec le bébé par le toucher du ventre." },
      { titre: "Exercice 2 : Massage du dos en décubitus latéral", consigne: "Effectuez un massage complet du dos sur une femme enceinte positionnée en décubitus latéral. Démontrez l'installation des coussins et les techniques d'effleurage, pétrissage doux et pressions glissées.", reponseAttendue: "Installation correcte (coussin tête, genoux, ventre), enchaînement fluide effleurage-pétrissage-pressions glissées le long des paravertébraux, pression adaptée, communication avec la cliente." },
      { titre: "Exercice 3 : Drainage des jambes et pieds", consigne: "Pratiquez un drainage lymphatique doux des membres inférieurs adapté à la grossesse. Montrez les gestes d'effleurage ascendant et les points à éviter.", reponseAttendue: "Effleurage ascendant des chevilles vers les cuisses, pression légère et régulière, évitement des varices et des points d'acupression (malléole interne), mobilisation douce des chevilles." },
      { titre: "Exercice 4 : Prise de conscience du bassin", consigne: "Guidez un exercice de prise de conscience du bassin incluant des mobilisations douces (antéversion/rétroversion, cercles) et des techniques de relâchement du périnée.", reponseAttendue: "Guidance verbale claire, mobilisations progressives du bassin en position assise sur ballon ou debout, exercices de Kegel inversés pour le relâchement, respiration coordonnée." },
      { titre: "Exercice 5 : Séance complète de massage prénatal", consigne: "Réalisez une séance complète de 45 minutes incluant : accueil et anamnèse, recentrage, massage dos, massage jambes, conscience du bassin et retour au calme.", reponseAttendue: "Séance structurée avec anamnèse (contre-indications vérifiées), recentrage 5 min, massage dos 15 min, jambes 10 min, bassin 10 min, retour au calme 5 min. Fluidité des enchaînements et communication bienveillante." },
      { titre: "Exercice 6 : Conseils d'auto-massage et étirements", consigne: "Élaborez une fiche de conseils d'auto-massage et d'étirements que la femme enceinte pourra pratiquer à domicile entre les séances.", reponseAttendue: "Fiche structurée avec : auto-massage du bas du dos avec balle, étirements du psoas, mobilisations du bassin sur ballon, exercices de respiration, massage des pieds. Illustrations ou descriptions claires." },
    ],
    competences: [
      "Techniques de recentrage et respiration prénatale",
      "Massage du dos adapté à la grossesse",
      "Drainage lymphatique doux des membres inférieurs",
      "Prise de conscience et mobilisation du bassin",
      "Connaissance des contre-indications et précautions",
    ],
    appreciations: [
      "Excellente maîtrise des techniques de massage prénatal. Toucher enveloppant et bienveillant. Les contre-indications sont parfaitement intégrées. Grande qualité d'écoute.",
      "Bonne progression sur l'ensemble des techniques. Le drainage des jambes est bien maîtrisé. Doit encore approfondir la guidance respiratoire.",
      "Très bon niveau pratique. La séance complète est fluide et bien structurée. Excellente communication avec la cliente. Approche holistique bien comprise.",
      "Niveau satisfaisant. Les gestes de base sont acquis. La prise de conscience du bassin nécessite encore de la pratique pour plus de fluidité.",
      "Excellente sensibilité dans le toucher. Les techniques de relaxation sont particulièrement bien menées. Très bonne gestion du temps de séance.",
      "Bonne compréhension de l'anatomie de la femme enceinte. Les adaptations posturales sont correctes. Continue à progresser sur le pétrissage doux.",
      "Très bonne implication et attention portée au confort de la cliente. La fiche d'auto-massage est complète et professionnelle.",
      "Solide acquisition des compétences. Les exercices de Kegel et la mobilisation du bassin sont bien guidés. Bon sens de l'observation.",
      "Progression remarquable entre le début et la fin de formation. L'approche globale corps-esprit est bien intégrée.",
      "Excellent résultat final. Maîtrise complète du protocole de massage prénatal. Prête à exercer en autonomie.",
    ],
  },
  "Massage Postpartum": {
    qcmPositionnement: [
      { question: "À partir de quel trimestre le massage prénatal est-il le plus recommandé ?", options: ["1er trimestre", "2ème trimestre", "3ème trimestre", "Après l'accouchement uniquement"], correctIndex: 1 },
      { question: "Quelle position est privilégiée pour masser une femme enceinte ?", options: ["Sur le ventre", "Sur le dos", "En décubitus latéral gauche", "Debout"], correctIndex: 2 },
      { question: "Pourquoi évite-t-on la position sur le dos au 3ème trimestre ?", options: ["C'est inconfortable", "Risque de compression de la veine cave", "Le bébé bouge trop", "Cela provoque des nausées"], correctIndex: 1 },
      { question: "Quel est le rôle de la relaxine pendant la grossesse ?", options: ["Augmenter la tension artérielle", "Assouplir les ligaments", "Stimuler la lactation", "Réduire les nausées"], correctIndex: 1 },
      { question: "Quelle huile essentielle est interdite pendant toute la grossesse ?", options: ["Lavande vraie", "Ylang-ylang", "Sauge", "Petit grain bigarade"], correctIndex: 2 },
      { question: "Quel point d'acupression est à éviter absolument chez la femme enceinte ?", options: ["Laogong (centre de la paume)", "Hegu (entre pouce et index)", "Yintang (entre les sourcils)", "Baihui (sommet du crâne)"], correctIndex: 1 },
      { question: "Quelle technique de respiration est utilisée pour le recentrage en début de séance ?", options: ["Hyperventilation", "Respiration abdominale en 4 temps", "Apnée prolongée", "Respiration buccale rapide"], correctIndex: 1 },
      { question: "Dans quel sens effectue-t-on le drainage des jambes ?", options: ["Descendant (cuisse vers cheville)", "Ascendant (cheville vers cuisse)", "Circulaire", "Latéral"], correctIndex: 1 },
      { question: "Quelle est la différence entre massage bien-être et massage thérapeutique ?", options: ["Aucune différence", "Le bien-être vise la détente, le thérapeutique traite une pathologie", "Le bien-être est plus douloureux", "Le thérapeutique ne nécessite pas de diplôme"], correctIndex: 1 },
      { question: "Quelle contre-indication absolue interdit le massage prénatal ?", options: ["Fatigue modérée", "Pré-éclampsie", "Mal de dos léger", "Insomnie"], correctIndex: 1 },
    ],
    qcmFinal: [
      { question: "Combien de coussins minimum faut-il pour installer une cliente en décubitus latéral ?", options: ["1 (sous la tête)", "2 (tête et genoux)", "3 (tête, genoux et ventre)", "Aucun"], correctIndex: 2 },
      { question: "Quelle est la pression recommandée en massage prénatal sur une échelle de 1 à 10 ?", options: ["1-2", "2-5", "6-8", "8-10"], correctIndex: 1 },
      { question: "Quel mouvement est effectué sur le ventre de la femme enceinte ?", options: ["Pétrissage profond", "Effleurage circulaire très léger", "Friction vigoureuse", "Percussion"], correctIndex: 1 },
      { question: "Pourquoi synchronise-t-on la respiration du praticien avec ses mouvements ?", options: ["Pour impressionner la cliente", "Pour éviter les tensions et moduler la pression naturellement", "Par obligation réglementaire", "Pour compter les mouvements"], correctIndex: 1 },
      { question: "Quelle zone du pied est sûre à masser chez la femme enceinte ?", options: ["Malléole interne", "Malléole externe", "Voûte plantaire (centre)", "Derrière la cheville"], correctIndex: 2 },
      { question: "Comment termine-t-on correctement une séance de massage prénatal ?", options: ["En réveillant brusquement la cliente", "Par un retour au calme progressif et un retrait lent du contact", "En lui demandant de se lever immédiatement", "Par des exercices de musculation"], correctIndex: 1 },
      { question: "Quelle est la durée recommandée d'une séance complète au 3ème trimestre ?", options: ["90 minutes", "60 minutes", "45 minutes maximum", "120 minutes"], correctIndex: 2 },
      { question: "Quel document le praticien doit-il faire signer avant la première séance ?", options: ["Un contrat de travail", "Un consentement éclairé", "Une ordonnance médicale", "Un certificat de naissance"], correctIndex: 1 },
      { question: "Quel est le bénéfice principal du massage du sacrum ?", options: ["Tonifier les abdominaux", "Soulager les douleurs pelviennes", "Stimuler les contractions", "Corriger la posture"], correctIndex: 1 },
      { question: "Quelle assurance est obligatoire pour exercer le massage bien-être ?", options: ["Assurance auto", "Responsabilité Civile Professionnelle (RCP)", "Assurance vie", "Mutuelle santé"], correctIndex: 1 },
    ],
    exercices: [
      { titre: "Exercice 1 : Installation de la cliente en décubitus latéral", consigne: "Installez une cliente simulée en position de décubitus latéral gauche avec les coussins appropriés. Justifiez chaque placement et vérifiez le confort.", reponseAttendue: "Installation correcte avec coussin sous la tête (hauteur = largeur de l'épaule), coussin entre les genoux (maintien axe du bassin), coussin sous le ventre (support utérin), bras supérieur soutenu. Justification : côté gauche pour décomprimer la veine cave. Vérification verbale du confort." },
      { titre: "Exercice 2 : Séquence de recentrage et respiration guidée", consigne: "Réalisez une séquence de recentrage de 8 minutes incluant l'ancrage, la respiration abdominale en 4 temps et la connexion mère-bébé.", reponseAttendue: "Ancrage au sol (2 min), respiration carrée puis abdominale guidée (inspir 4s, pause 2s, expir 6s, pause 2s – 6 cycles), balayage corporel progressif, connexion mère-bébé avec mains sur le ventre et visualisation. Voix calme et posée." },
      { titre: "Exercice 3 : Massage du dos complet en position latérale", consigne: "Réalisez un massage complet du dos de 15 minutes sur une cliente en décubitus latéral. Enchaînez effleurage, pétrissage des paravertébraux, pressions glissées et massage du sacrum.", reponseAttendue: "Effleurage d'ouverture (5 passages), pétrissage pouces paravertébraux (3 passages aller-retour), pressions glissées dans les gouttières (4 passages), massage circulaire du sacrum (1 min), pétrissage rhomboïdes, effleurage de clôture. Fluidité et continuité du contact." },
      { titre: "Exercice 4 : Drainage des jambes et massage des pieds", consigne: "Pratiquez un drainage lymphatique doux des membres inférieurs suivi d'un massage des pieds. Identifiez et évitez les points d'acupression interdits.", reponseAttendue: "Effleurage ascendant cheville-cuisse (6 passages), drainage mollets en V (4 passages), pétrissage léger, mobilisation rotule. Pieds : voûte plantaire (pouces circulaires), orteils (rotation), mobilisation chevilles. Évitement Sanyinjiao, Kunlun, Taichong. Pression adaptée aux œdèmes." },
      { titre: "Exercice 5 : Massage complet de 60 minutes", consigne: "Réalisez une séance complète de massage prénatal de 60 minutes incluant : accueil, recentrage, dos, jambes, pieds, bras, mains, crâne et retour au calme. Respectez le timing.", reponseAttendue: "Séance structurée : accueil et anamnèse (5 min), installation et recentrage (8 min), dos (15 min), jambes (10 min), pieds (8 min), bras et mains (5 min), crâne et visage (5 min), retour au calme (4 min). Transitions fluides, communication bienveillante, respect des contre-indications." },
      { titre: "Exercice 6 : Cas pratique – Adaptation et conseils", consigne: "Votre cliente est au 8ème mois de grossesse, elle présente des œdèmes importants aux chevilles et des douleurs lombaires. Décrivez votre protocole adapté et les conseils post-séance.", reponseAttendue: "Protocole adapté : séance de 45 min max, pression très légère, focus drainage des jambes (15 min) et massage du sacrum/lombaires (10 min). Position latérale exclusive. Changements de position fréquents. Conseils : hydratation (2 verres d'eau), repos 30 min, surélever les jambes, auto-massage avec balle de tennis sur le dos, étirements du psoas quotidiens." },
    ],
    competences: [
      "Installation sécurisée de la femme enceinte en décubitus latéral",
      "Maîtrise des techniques de massage prénatal (effleurage, pétrissage, drainage)",
      "Connaissance des contre-indications et points d'acupression à éviter",
      "Réalisation d'un protocole complet de massage prénatal de 60 minutes",
      "Communication bienveillante et relation client adaptée à la maternité",
    ],
    appreciations: [
      "Excellente maîtrise de l'ensemble du protocole de massage prénatal. Le toucher est enveloppant et bienveillant. Les contre-indications sont parfaitement intégrées. Prête à exercer en autonomie.",
      "Très bonne progression sur les 6 jours. Le drainage des jambes est particulièrement bien réalisé. La guidance respiratoire est naturelle et apaisante.",
      "Niveau très satisfaisant. La séance complète est fluide et respecte le timing. Excellente qualité d'écoute et d'adaptation à la cliente.",
      "Bonne acquisition des techniques de base. L'installation en décubitus latéral est parfaitement maîtrisée. Doit encore travailler la fluidité des transitions.",
      "Grande sensibilité dans le toucher. Les techniques de relaxation et de connexion mère-bébé sont particulièrement bien menées. Très bonne posture ergonomique.",
      "Bon niveau d'ensemble. Les manœuvres de massage du dos et du sacrum sont efficaces. Continue à progresser sur le massage des pieds.",
      "Très bonne implication tout au long de la formation. La fiche d'anamnèse est rigoureuse et complète. Approche professionnelle remarquable.",
      "Solide acquisition des compétences pratiques. Le respect des zones à éviter est systématique. Bonne gestion du temps de séance.",
      "Progression remarquable entre le début et la fin de formation. L'approche holistique corps-esprit est bien intégrée dans la pratique.",
      "Excellent résultat final. Maîtrise complète du protocole de massage prénatal et postpartum. Capacité à adapter les techniques selon le trimestre.",
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

const ECSR_CONTENT: FormationEvalContent = {
  qcmPositionnement: [
    { question: "Quel document est le référentiel de base pour l'enseignement de la conduite ?", options: ["Le Code de la route", "Le REMC", "Le PNF", "Le livret d'apprentissage"], correctIndex: 1 },
    { question: "Quelle autorité délivre l'autorisation d'enseigner la conduite ?", options: ["Le maire", "Le préfet", "Le ministre", "La DREETS"], correctIndex: 1 },
    { question: "Quelle est la durée de validité de l'autorisation d'enseigner ?", options: ["3 ans", "5 ans", "10 ans", "Illimitée"], correctIndex: 1 },
    { question: "Combien de compétences globales comporte le REMC ?", options: ["2", "3", "4", "5"], correctIndex: 2 },
    { question: "Quel est le taux maximal d'alcoolémie pour un conducteur novice ?", options: ["0,5 g/l", "0,2 g/l", "0,0 g/l", "0,8 g/l"], correctIndex: 1 },
    { question: "Quel est le nombre minimum de bonnes réponses pour réussir l'ETG ?", options: ["30/40", "32/40", "35/40", "38/40"], correctIndex: 2 },
    { question: "Quelle est la durée de l'épreuve pratique du permis B ?", options: ["20 minutes", "25 minutes", "30 minutes", "32 minutes"], correctIndex: 3 },
    { question: "Que signifie l'acronyme REMC ?", options: ["Règlement d'Évaluation des Moniteurs Certifiés", "Référentiel pour l'Éducation à une Mobilité Citoyenne", "Registre des Enseignants et Moniteurs de Conduite", "Référentiel Européen de Mobilité et Conduite"], correctIndex: 1 },
    { question: "Quel modèle hiérarchique est utilisé dans le REMC ?", options: ["Modèle ADDIE", "Matrice GDE", "Pyramide de Maslow", "Modèle de Kirkpatrick"], correctIndex: 1 },
    { question: "Quel numéro d'urgence est commun à toute l'Europe ?", options: ["15", "18", "112", "114"], correctIndex: 2 },
  ],
  qcmFinal: [
    { question: "Qu'est-ce que la conduite commentée ?", options: ["L'enseignant commente la route", "L'apprenant verbalise son analyse de l'environnement routier", "Un commentaire écrit après la leçon", "Une vidéo commentée de conduite"], correctIndex: 1 },
    { question: "Quel est le premier facteur d'accident mortel en France ?", options: ["L'alcool", "La vitesse", "Le téléphone", "La fatigue"], correctIndex: 1 },
    { question: "Que signifie AAC ?", options: ["Apprentissage Assisté par Conduite", "Apprentissage Anticipé de la Conduite", "Autorisation Administrative de Conduire", "Attestation d'Aptitude à la Conduite"], correctIndex: 1 },
    { question: "Quel type d'évaluation permet d'ajuster la pédagogie en cours d'apprentissage ?", options: ["Diagnostique", "Formative", "Sommative", "Certificative"], correctIndex: 1 },
    { question: "Quelle théorie de l'apprentissage met l'accent sur la construction des connaissances par l'apprenant ?", options: ["Behaviorisme", "Cognitivisme", "Constructivisme", "Connectivisme"], correctIndex: 2 },
    { question: "Combien de CCP composent le titre professionnel ECSR ?", options: ["1", "2", "3", "4"], correctIndex: 1 },
    { question: "Quelle est la zone proximale de développement (ZPD) ?", options: ["La distance de freinage", "L'écart entre ce que l'apprenant sait faire seul et avec aide", "La zone de danger en intersection", "L'espace de manœuvre du véhicule"], correctIndex: 1 },
    { question: "Quel document l'enseignant doit-il renseigner avec l'apprenant après chaque séance ?", options: ["Le carnet d'entretien", "Le livret d'apprentissage", "Le contrat de formation", "La fiche de paie"], correctIndex: 1 },
    { question: "Que doit faire l'enseignant en premier en cas d'accident ?", options: ["Appeler la police", "Protéger la zone", "Secourir les victimes", "Remplir le constat"], correctIndex: 1 },
    { question: "Quelle est la particularité du véhicule d'apprentissage ?", options: ["Il est électrique", "Il possède une double commande", "Il est plus petit", "Il a un moteur bridé"], correctIndex: 1 },
  ],
  exercices: [
    { titre: "Construction d'un scénario pédagogique", consigne: "Construisez un scénario pédagogique pour une séance individuelle de conduite de 1h portant sur les intersections avec priorité à droite. Détaillez les objectifs, les méthodes, le parcours choisi et les critères d'évaluation.", reponseAttendue: "Objectif : Maîtriser le franchissement des intersections avec priorité à droite. Méthode : Progression du simple au complexe (quartier calme → zone urbaine dense). Parcours : itinéraire avec 8-10 intersections de difficulté croissante. Évaluation : observation du regard, ralentissement adapté, placement correct." },
    { titre: "Animation d'une séance collective sur l'alcool au volant", consigne: "Préparez le plan d'animation d'une séance collective de 45 minutes sur les dangers de l'alcool au volant. Précisez les supports, méthodes pédagogiques et le déroulement.", reponseAttendue: "Plan en 3 phases : 1) Recueil des représentations (brainstorming 10 min), 2) Apport d'informations (diaporama + vidéo – effets de l'alcool, réglementation, sanctions – 20 min), 3) Mise en situation avec lunettes de simulation et débat (15 min). Supports : vidéoprojecteur, lunettes d'alcoolémie, données accidentologiques ONISR." },
    { titre: "Analyse d'une situation de conduite à risque", consigne: "À partir de la situation suivante : 'Un apprenant roule à 50 km/h en agglomération et ne ralentit pas à l'approche d'un passage piéton où des enfants sortent d'une école', analysez les risques et proposez une stratégie de remédiation.", reponseAttendue: "Risques : vitesse inadaptée, non-anticipation, piétons vulnérables. Remédiation : travail sur l'exploration visuelle (regard loin + balayage latéral), compréhension de la signalisation (zone 30, abords d'école), conscience des usagers vulnérables, exercice de conduite commentée dans la zone." },
    { titre: "Conception d'une action de sensibilisation en entreprise", consigne: "Une entreprise vous demande d'animer une demi-journée de sensibilisation au risque routier professionnel pour ses 30 salariés commerciaux. Rédigez votre proposition d'intervention.", reponseAttendue: "Proposition : 1) Accueil et quiz de positionnement (30 min), 2) Conférence interactive sur les risques routiers professionnels avec données accidentologiques (45 min), 3) Atelier pratique en 3 groupes tournants : simulateur, vérifications véhicule, éco-conduite (1h30), 4) Bilan et engagement individuel (15 min). Supports : simulateur, véhicule de démonstration, lunettes alcool/drogue." },
    { titre: "Évaluation des compétences d'un apprenant", consigne: "Un apprenant a effectué 25 heures de conduite. Rédigez un bilan de ses compétences en vous appuyant sur les 4 compétences globales du REMC et proposez un plan de progression pour les prochaines séances.", reponseAttendue: "Bilan REMC : C1 (Maîtriser) – Acquis : démarrage, arrêt, vitesses. À travailler : manœuvres en espace réduit. C2 (Appréhender) – Acquis : signalisation courante. À travailler : anticipation des priorités. C3 (Circuler) – Acquis : insertion sur voie rapide. À travailler : gestion des ronds-points complexes. C4 (Autonomie) – En cours d'acquisition. Plan : 5h de ronds-points et intersections complexes, puis évaluation de synthèse." },
  ],
  competences: [
    "Construire et préparer un scénario pédagogique de formation à la conduite",
    "Animer une séance collective de formation à la sécurité routière",
    "Animer une séance individuelle de formation à la conduite d'un véhicule léger",
    "Évaluer le degré d'acquisition des compétences des apprenants",
    "Encadrer et faciliter l'intervention d'un tiers (AAC/conduite supervisée)",
    "Repérer les difficultés d'apprentissage et proposer des remédiations",
    "Apprécier la dynamique de l'environnement routier et identifier les risques",
    "Analyser une demande de prestation de sensibilisation",
    "Construire et préparer une action de sensibilisation",
    "Animer une séance de sensibilisation à la sécurité routière",
    "Analyser ses pratiques professionnelles pour les faire évoluer",
    "Maîtriser la réglementation routière et le cadre institutionnel",
  ],
  appreciations: [
    "Excellent niveau pédagogique. Les séances sont construites avec rigueur et les apprenants progressent rapidement. Maîtrise solide du REMC.",
    "Bonne progression tout au long de la formation. Les mises en situation professionnelle sont réussies. Quelques points à consolider en animation de groupe.",
    "Très bonne implication dans les activités pratiques. La conduite commentée est bien maîtrisée. Doit renforcer les connaissances réglementaires.",
    "Niveau satisfaisant. Les fondamentaux de la pédagogie de la conduite sont acquis. Doit poursuivre la pratique en situation réelle.",
    "Excellente capacité d'adaptation aux différents publics. Les séances de sensibilisation sont dynamiques et pertinentes.",
    "Bon résultat aux évaluations. L'analyse des situations de conduite est pertinente. Axes de progression identifiés en gestion de groupe.",
    "Solide acquisition des compétences du CCP1. Les séances individuelles de conduite sont bien menées avec un bon dosage des interventions.",
    "Très bonne maîtrise de l'environnement routier et des facteurs de risque. Les supports pédagogiques sont bien exploités.",
    "Progression significative. L'examen blanc a été réussi avec de bons résultats. Prêt pour la certification.",
    "Excellent résultat global. Maîtrise complète des deux blocs de compétences. Profil prometteur pour la profession.",
  ],
};

EVAL_CONTENT["ECSR"] = ECSR_CONTENT;

const VTC_CONTENT: FormationEvalContent = {
  qcmPositionnement: [
    { question: "Quelle est la durée minimale de détention du permis B pour s'inscrire à l'examen VTC ?", options: ["1 an", "2 ans", "3 ans", "5 ans"], correctIndex: 2 },
    { question: "Un VTC peut-il prendre en charge un client qui le hèle dans la rue ?", options: ["Oui, comme un taxi", "Non, jamais (réservation préalable obligatoire)", "Oui, hors agglomération", "Oui, si le compteur est éteint"], correctIndex: 1 },
    { question: "Quel taux de TVA s'applique aux courses VTC en France métropolitaine ?", options: ["5,5%", "10%", "20%", "Exonération"], correctIndex: 1 },
    { question: "Quelle est l'ancienneté maximale d'un véhicule pour exercer en VTC ?", options: ["3 ans", "5 ans", "6 ans", "10 ans"], correctIndex: 2 },
    { question: "Un VTC peut-il être équipé d'un compteur horokilométrique (taximètre) ?", options: ["Oui, obligatoirement", "Oui, en option", "Non, c'est strictement interdit", "Uniquement à l'aéroport"], correctIndex: 2 },
    { question: "Quelle est la durée de validité de la carte professionnelle VTC ?", options: ["1 an", "3 ans", "5 ans", "10 ans"], correctIndex: 2 },
    { question: "Le numéro d'urgence européen unique est :", options: ["15", "17", "18", "112"], correctIndex: 3 },
    { question: "Quel est le taux légal d'alcoolémie pour un conducteur expérimenté ?", options: ["0,2 g/L", "0,5 g/L", "0,8 g/L", "Aucune limite"], correctIndex: 1 },
    { question: "Au-delà de quel montant un devis écrit est-il obligatoire ?", options: ["50 €", "100 €", "150 €", "200 €"], correctIndex: 1 },
    { question: "Combien de places maximum peut comporter un véhicule VTC (conducteur compris) ?", options: ["5", "7", "9", "12"], correctIndex: 2 },
  ],
  qcmFinal: [
    { question: "Quelle note minimale faut-il à l'épreuve d'anglais pour être admissible ?", options: ["2/20", "4/20", "6/20", "10/20"], correctIndex: 1 },
    { question: "Quelle est la durée minimale de la conduite en circulation lors de l'épreuve d'admission ?", options: ["10 minutes", "15 minutes", "20 minutes", "30 minutes"], correctIndex: 2 },
    { question: "Quel est le revenu minimum garanti par course en Île-de-France (loi LOM) ?", options: ["5,00 €", "7,65 €", "9,50 €", "12,00 €"], correctIndex: 2 },
    { question: "Combien de fois un candidat admissible peut-il se présenter à l'épreuve d'admission ?", options: ["1 fois", "2 fois", "3 fois", "5 fois"], correctIndex: 2 },
    { question: "La distance d'arrêt à 90 km/h sur sol sec est d'environ :", options: ["50 m", "80 m", "108 m", "150 m"], correctIndex: 2 },
    { question: "Combien d'années faut-il conserver les factures émises ?", options: ["3 ans", "5 ans", "10 ans", "Indéfiniment"], correctIndex: 2 },
    { question: "Quel est le seuil maximal de paiement en espèces pour un résident fiscal français ?", options: ["300 €", "1 000 €", "3 000 €", "15 000 €"], correctIndex: 1 },
    { question: "Combien de points peut comporter le bloc 'qualité de service' lors de l'admission ?", options: ["2 points", "3 points", "5 points", "10 points"], correctIndex: 2 },
    { question: "Quelle commission moyenne prélèvent les plateformes VTC type Uber ?", options: ["5-10%", "20-30%", "40-50%", "Aucune"], correctIndex: 1 },
    { question: "Le tarif d'une course VTC est :", options: ["Réglementé par la préfecture", "Calculé par compteur", "Libre, convenu à l'avance", "Identique au taxi"], correctIndex: 2 },
  ],
  exercices: [
    { titre: "Calcul du prix de revient kilométrique", consigne: "Vous parcourez 50 000 km/an. Vos charges fixes annuelles s'élèvent à 15 000 € (assurance, amortissement véhicule, cotisations) et vos charges variables à 11 000 € (carburant, entretien, péages). Calculez votre prix de revient au km et le tarif minimal client pour dégager 35% de marge.", reponseAttendue: "Prix de revient = (15 000 + 11 000) / 50 000 = 0,52 €/km. Pour 35% de marge : 0,52 / 0,65 = 0,80 €/km minimum. Le tarif client conseillé se situe autour de 1,20 à 1,80 €/km selon la zone." },
    { titre: "Rédaction d'une facture VTC conforme", consigne: "Rédigez la facture d'une course Paris (Hôtel Le Meurice) → Aéroport CDG T2E pour M. Smith, britannique, le 12 mars 2025 à 16h30. Tarif convenu : 85 € TTC. Distance : 35 km. Listez l'ensemble des mentions obligatoires.", reponseAttendue: "Facture VTC n°[unique], date émission, identité exploitant (nom, SIREN, n° registre VTC), identité client (M. Smith), date/heure prise en charge (12/03/25 16h30) et dépose, lieu départ (Hôtel Le Meurice, Paris 1) et arrivée (CDG T2E), distance 35 km, montant HT 77,27 €, TVA 10% = 7,73 €, montant TTC 85 €, mode de paiement, conservation 10 ans." },
    { titre: "Mise en situation : conduite anglaise A2", consigne: "Un client britannique monte dans votre véhicule. Rédigez le dialogue d'accueil, de mi-trajet (signalement bouchon) et de fin de course en anglais professionnel niveau A2.", reponseAttendue: "Accueil : 'Good afternoon Mr. [Name], I'm [Driver]. Welcome on board. May I take your luggage?' / Confirmation : 'We are heading to [destination], is that correct?' / Mi-trajet : 'There is some traffic on the A1, the journey may take a little longer. Is the temperature comfortable?' / Fin : 'We have arrived at your destination. That will be [X] euros, please. Here is your receipt. Have a wonderful day.'" },
    { titre: "Analyse d'un cas de maraude électronique", consigne: "Un confrère VTC vous explique qu'il stationne en double file devant un grand hôtel parisien en attente d'une réservation immédiate via son application. Analysez la situation au regard de la réglementation et proposez la conduite à tenir.", reponseAttendue: "Pratique illégale : maraude électronique passible de 15 000 € + 1 an emprisonnement (art. L.3122-9). De plus, stationnement en double file sanctionné (135 €). Conduite à tenir : se garer dans une zone légale (parking, place de stationnement gratuit/payant), patienter sans tourner en rond, accepter les courses uniquement après réservation préalable confirmée par l'application." },
    { titre: "Préparation d'un parcours examen", consigne: "Lors de l'épreuve, vous devez aller de la gare Montparnasse à l'aéroport d'Orly Sud, vendredi 17h. Décrivez votre méthode de préparation en 3 minutes et justifiez l'itinéraire choisi.", reponseAttendue: "1) Saisie GPS Montparnasse → Orly Sud. 2) Comparaison itinéraires : A6a directe (16 km, 30 min) vs périphérique sud + A6 (22 km, 35 min). 3) Choix : A6a directe car plus courte et heure de pointe vendredi soir – le périphérique est saturé à cette heure. 4) Visualisation des 3 premiers points : sortie Montparnasse direction Porte d'Orléans, prise de l'A6a, sortie Orly Sud aérogare." },
    { titre: "Conduite à tenir en cas d'accident léger", consigne: "Pendant une course, vous êtes percuté à l'arrière par un autre véhicule à un feu rouge. Votre client est légèrement secoué mais sans blessure apparente. Détaillez la procédure complète à appliquer en respectant la méthode PAS et les obligations professionnelles.", reponseAttendue: "PROTÉGER : warnings, sortie sécurisée avec gilet, triangle à 30 m, faire descendre le client côté trottoir. ALERTER : appel 112 si doute médical, sinon constat amiable. SECOURIR : rassurer le client, proposer eau, vérifier qu'il ne ressent pas de douleur cervicale (whiplash). PROFESSIONNEL : prévenir la plateforme, prévenir l'assurance dans les 5 jours ouvrés, organiser le transport du client (taxi pris en charge ou fin de course remboursée), remplir constat avec circonstances claires (responsabilité du véhicule arrière à 100%)." },
  ],
  competences: [
    "Maîtriser la réglementation T3P et les spécificités VTC",
    "Connaître les conditions d'obtention et de renouvellement de la carte professionnelle",
    "Vérifier la conformité du véhicule et de sa signalétique",
    "Choisir un statut juridique et fiscal adapté à son activité",
    "Calculer un prix de revient et fixer des tarifs rentables",
    "Émettre une facture conforme et gérer l'encaissement",
    "Appliquer le Code de la route en conduite professionnelle",
    "Adopter une conduite souple, sécurisée et économique",
    "Gérer une situation d'urgence ou d'accident (méthode PAS)",
    "Communiquer en anglais niveau A2 avec une clientèle internationale",
    "Préparer un parcours et utiliser efficacement le GPS",
    "Offrir un service commercial de qualité (accueil, prise de congé)",
    "Distinguer maraude légale et illégale (taxi vs VTC)",
    "Comprendre les enjeux des plateformes et préserver son indépendance",
  ],
  appreciations: [
    "Excellente maîtrise réglementaire. Distinctions taxi/VTC parfaitement assimilées. Prêt(e) pour l'examen théorique.",
    "Bonne progression sur la gestion d'entreprise. Le calcul du prix de revient est acquis. Doit consolider les régimes fiscaux.",
    "Très bon niveau en sécurité routière. Les distances de sécurité et l'écoconduite sont bien comprises.",
    "Niveau correct en anglais. Les phrases d'accueil et de fin de course sont maîtrisées. Doit étoffer le vocabulaire technique.",
    "Excellente capacité d'analyse des situations de conduite. La méthode PAS est parfaitement intégrée.",
    "Bonne implication tout au long de la formation. Les mises en situation pratiques sont concluantes. Prêt(e) pour l'admission.",
    "Solide acquisition des fondamentaux commerciaux et tarifaires. La facturation est conforme aux obligations légales.",
    "Très bonne préparation à l'examen pratique. Le parcours est préparé avec méthode et la conduite est souple.",
    "Maîtrise de la réglementation spécifique VTC (maraude, plateformes). Les pièges juridiques sont identifiés.",
    "Excellent profil commercial. L'accueil et la qualité de service sont au rendez-vous. Réussite à l'examen prévisible.",
  ],
};

EVAL_CONTENT["VTC"] = VTC_CONTENT;

const VTEST_CONTENT: FormationEvalContent = {
  qcmPositionnement: [
    { question: "What does 'ROI' stand for in a business context?", options: ["Return on Investment", "Rate of Interest", "Report on Income", "Review of Inventory"], correctIndex: 0 },
    { question: "Which expression is the most formal way to start a professional email?", options: ["Hey John,", "Dear Mr. Smith,", "Hi there,", "What's up,"], correctIndex: 1 },
    { question: "What is the correct meaning of the false friend 'actually'?", options: ["Actuellement", "En fait", "Vraiment", "Activement"], correctIndex: 1 },
    { question: "Which tense is used to describe a completed action at a specific time in the past?", options: ["Present Perfect", "Past Simple", "Past Continuous", "Present Simple"], correctIndex: 1 },
    { question: "What does 'Could you hold the line?' mean on the phone?", options: ["Raccrochez", "Patientez un instant", "Rappelez plus tard", "Parlez plus fort"], correctIndex: 1 },
    { question: "Which word means 'chiffre d'affaires' in English?", options: ["Benefits", "Revenue", "Salary", "Expenses"], correctIndex: 1 },
    { question: "What is the purpose of an 'Executive Summary' in a report?", options: ["Detailed analysis", "Brief overview of key points", "Financial data only", "List of participants"], correctIndex: 1 },
    { question: "Which modal verb expresses a strong obligation?", options: ["Could", "Might", "Must", "Would"], correctIndex: 2 },
    { question: "What does 'to follow up' mean in a professional context?", options: ["Suivre physiquement", "Assurer le suivi", "Copier", "Ignorer"], correctIndex: 1 },
    { question: "Which expression is used to politely disagree in a meeting?", options: ["You're wrong!", "I see your point, but…", "That's ridiculous.", "No way."], correctIndex: 1 },
  ],
  qcmFinal: [
    { question: "Which closing is appropriate for a formal business email to someone you don't know?", options: ["Cheers,", "Yours faithfully,", "See you,", "XOXO,"], correctIndex: 1 },
    { question: "In the sentence 'We have increased sales by 20% this year', which tense is used?", options: ["Past Simple", "Present Perfect", "Future", "Past Perfect"], correctIndex: 1 },
    { question: "What does 'break-even point' mean?", options: ["Point de rupture", "Seuil de rentabilité", "Point culminant", "Fin de contrat"], correctIndex: 1 },
    { question: "Which technique involves reading only titles and first sentences to get the main idea?", options: ["Scanning", "Skimming", "Intensive reading", "Proofreading"], correctIndex: 1 },
    { question: "What is the correct structure for a conditional offer in negotiation?", options: ["If you do X, I will Y.", "Do X or else.", "I demand X.", "X is my final offer."], correctIndex: 0 },
    { question: "Which expression means 'ordre du jour' (not the French meaning)?", options: ["Diary", "Agenda", "Calendar", "Schedule"], correctIndex: 1 },
    { question: "What does VTest Business English evaluate?", options: ["Only grammar", "4 skills: Reading, Listening, Writing, Speaking", "Only vocabulary", "Only pronunciation"], correctIndex: 1 },
    { question: "Which connector introduces a contrast?", options: ["Furthermore", "However", "In addition", "Moreover"], correctIndex: 1 },
    { question: "What is 'onboarding' in HR terminology?", options: ["Licenciement", "Intégration d'un nouveau collaborateur", "Entretien annuel", "Démission"], correctIndex: 1 },
    { question: "Which phrase is used to summarize at the end of a meeting?", options: ["Let's move on.", "So, to recap…", "Any other business?", "Let's get started."], correctIndex: 1 },
  ],
  exercices: [
    { titre: "C1 – Compréhension orale : Écoute d'une déclaration", consigne: "Écoutez la déclaration suivante et répondez à la question en anglais : 'The quarterly report shows that our APAC division outperformed expectations by 12%, primarily due to a new strategic partnership. However, European operations saw a slight decline.' → Question: What was the main reason for APAC's strong performance?", reponseAttendue: "The main reason for APAC's strong performance was a new strategic partnership that helped the division outperform expectations by 12%." },
    { titre: "C1 – Compréhension orale : Dialogue professionnel", consigne: "Écoutez le dialogue suivant et répondez aux 3 questions : 'Manager: We need to reschedule the client meeting from Thursday to Monday. Can you book Room 204 with video conferencing? Employee: Sure. Should I send updated invitations to all participants? Manager: Yes, and please include the revised agenda.' → 1. Quel jour est la nouvelle réunion ? 2. Quelle salle ? 3. Que doit faire l'employé ?", reponseAttendue: "1. The new meeting is on Monday. 2. Room 204 with video conferencing. 3. The employee must book the room, send updated invitations and include the revised agenda." },
    { titre: "C2 – Compréhension écrite : Email professionnel", consigne: "Lisez l'email suivant et répondez aux questions en anglais : 'Dear Ms. Clark, Further to our conversation on Monday, I am writing to confirm the delivery date for the new software update. The rollout is scheduled for March 15th. Please ensure all team members have completed the training module by March 10th. Should you have any questions, do not hesitate to contact me. Best regards, David.' → 1. What is the main purpose of the email? 2. What action is required? 3. What is the deadline?", reponseAttendue: "1. The purpose is to confirm the delivery date of the software update. 2. All team members must complete the training module. 3. The deadline is March 10th for training completion, with rollout on March 15th." },
    { titre: "C2 – Compréhension écrite : Rapport financier", consigne: "Lisez le passage suivant et répondez aux 3 questions : 'Revenue increased by 8% year-on-year, driven primarily by strong performance in the APAC market. Operating expenses rose by 3%, resulting in an improved profit margin of 12.5%. The Board recommends reinvesting 40% of profits into R&D.' → 1. By how much did revenue grow? 2. What drove the growth? 3. What does the Board recommend?", reponseAttendue: "1. Revenue grew by 8% year-on-year. 2. The growth was driven by strong performance in the APAC market. 3. The Board recommends reinvesting 40% of profits into R&D." },
    { titre: "C3 – Expression orale : Présentation structurée", consigne: "Préparez un plan de présentation orale (3 minutes) pour présenter un nouveau produit/service à un groupe de clients potentiels. Structurez avec : Hook (accroche), 3 points clés, conclusion avec call to action. Rédigez le script complet en anglais.", reponseAttendue: "Hook: 'Did you know that 70% of businesses lose clients due to poor communication?' Point 1: Our solution streamlines communication with a unified platform. Point 2: Real-time analytics dashboard for data-driven decisions. Point 3: 24/7 dedicated support team. Conclusion: 'Let's schedule a demo next week to show you how we can transform your business.'" },
    { titre: "C3 – Expression orale : Simulation de réunion", consigne: "Rédigez un script de participation à une réunion en anglais. Vous devez : 1. Exprimer votre accord avec une proposition, 2. Exprimer un désaccord poli sur un point, 3. Proposer une alternative, 4. Résumer les points d'action.", reponseAttendue: "1. 'I completely agree with Sarah's suggestion to increase the marketing budget. That makes perfect sense given our Q3 targets.' 2. 'I see your point about cutting the R&D budget, but I'm not entirely convinced. The long-term impact could be significant.' 3. 'What if we reallocate funds from the trade show budget instead? That would save costs without affecting R&D.' 4. 'So, to recap: Sarah will prepare the revised budget, I'll draft the reallocation proposal by Friday, and we'll reconvene on Monday.'" },
    { titre: "C4 – Expression écrite : Rédaction d'email formel", consigne: "Rédigez un email professionnel formel en anglais (minimum 150 mots) pour : proposer un report de livraison de vendredi à lundi prochain. Incluez une excuse, la raison, la nouvelle date proposée et une demande de confirmation.", reponseAttendue: "Subject: Request to Reschedule Delivery – Order #4521. Dear Mr. Thompson, I am writing to inform you that, unfortunately, we will not be able to proceed with the delivery scheduled for this Friday, March 14th. Due to unforeseen supply chain disruptions, the final quality checks have been delayed. We sincerely apologise for any inconvenience this may cause. We would like to propose rescheduling the delivery to Monday, March 17th. All other terms and conditions remain unchanged. Could you please confirm that this new date is acceptable for your team? Please do not hesitate to contact me should you require any further information. Best regards." },
    { titre: "C4 – Expression écrite : Compte rendu de réunion", consigne: "Rédigez un compte rendu (minutes) en anglais d'une réunion d'équipe. Incluez : date, participants, points discutés, décisions prises et action items avec responsables et deadlines.", reponseAttendue: "Meeting Minutes – Date: March 12, 2026 – Attendees: J. Smith (Chair), S. Martin, P. Durand, L. Chen. Agenda: Q2 Budget Review. Key decisions: 1. Marketing budget increased by 15%. 2. New supplier approved for APAC region. Action items: S. Martin to prepare revised budget by March 19. P. Durand to contact supplier by March 15. Next meeting: March 26, 10:00 AM, Room 204." },
    { titre: "C1/C3 – Simulation d'appel téléphonique", consigne: "Rédigez un script complet de conversation téléphonique professionnelle en anglais : vous appelez un fournisseur pour reporter une livraison et négocier un délai. Utilisez les expressions téléphoniques appropriées (greeting, identification, request, confirmation, closing).", reponseAttendue: "Good morning, this is [Name] from [Company]. I'm calling regarding order #4521. I'm afraid we need to reschedule the delivery from Friday to next Monday due to a scheduling conflict at our warehouse. Could you please confirm that this is possible? … Thank you for your understanding. I'll send a confirmation email. Have a good day." },
    { titre: "C2/C4 – Négociation commerciale", consigne: "Vous négociez un contrat de prestation en anglais. Le client demande 20% de réduction et un paiement à 90 jours. Votre maximum est 12% et 60 jours. Rédigez vos 3 arguments en anglais avec des expressions de softening et proposez un compromis.", reponseAttendue: "1. 'I understand your position, and I was wondering if we could meet halfway at 12% – this reflects our commitment to a long-term partnership.' 2. 'Would it be possible to consider 60-day payment terms? This would help us maintain our cash flow and ensure consistent service quality.' 3. 'If you could agree to these terms, we would be happy to include an additional month of premium support at no extra cost. I believe this represents a fair compromise for both parties.'" },
  ],
  competences: [
    "Lire et comprendre des documents professionnels en anglais",
    "Comprendre des échanges oraux professionnels",
    "Rédiger des emails et documents avec le registre adapté",
    "S'exprimer à l'oral en contexte professionnel",
    "Maîtriser la grammaire du Business English",
    "Identifier et éviter les faux-amis",
    "Utiliser les stratégies de skimming et scanning",
    "Appliquer les techniques de négociation en anglais",
    "Structurer une présentation orale efficace",
    "Se préparer à la certification VTest (4 Skills)",
  ],
  appreciations: [
    "Excellent niveau d'anglais professionnel. Expression fluide et vocabulaire riche.",
    "Très bon niveau. Compréhension écrite et orale solides.",
    "Bon niveau général. Progrès notables en expression écrite.",
    "Niveau satisfaisant. Bonne compréhension écrite.",
    "Progression remarquable. Vocabulaire professionnel bien assimilé.",
    "Très bonne participation. Maîtrise des expressions de réunion et négociation.",
    "Excellent travail sur les emails et comptes rendus. Grammaire solide.",
    "Bonne assimilation du vocabulaire financier et RH.",
    "Stagiaire motivé(e). Présentations orales bien structurées.",
    "Niveau solide en compréhension. Expression écrite précise.",
  ],
  questionsOuvertesDebut: [
    { question: "In which professional situations do you currently use English?", reponseAttendue: "I use English for emails with international clients and reading technical documentation." },
    { question: "What are your main difficulties when communicating in English at work?", reponseAttendue: "My main difficulties are understanding native speakers on the phone and expressing complex ideas during meetings." },
    { question: "What is your target level after this training?", reponseAttendue: "I would like to reach at least B2 level to participate confidently in international meetings." },
    { question: "Describe a recent situation where you needed English at work.", reponseAttendue: "Last month, I had to present our quarterly results to the international management team." },
    { question: "What type of professional documents do you read or write in English?", reponseAttendue: "I regularly read market reports and write emails and prepare presentations in English." },
  ],
  questionsOuvertesFin: [
    { question: "How has your confidence in using English professionally evolved?", reponseAttendue: "I feel much more confident now, especially in meetings and when writing formal emails." },
    { question: "Which of the four skills has improved the most?", reponseAttendue: "My speaking skills have improved the most. I feel comfortable presenting ideas and participating in discussions." },
    { question: "Describe how you would handle a business negotiation in English now.", reponseAttendue: "I would prepare arguments in advance, use softening language, and propose compromises using conditional structures." },
    { question: "What strategies will you use to continue improving your English?", reponseAttendue: "I plan to listen to business podcasts, read industry articles in English, and practice speaking with colleagues." },
    { question: "How do you feel about taking the VTest certification exam?", reponseAttendue: "I feel well-prepared thanks to the practice tests and strategies. I am confident I can achieve at least a B2 score." },
  ],
};

EVAL_CONTENT["VTest"] = VTEST_CONTENT;

EVAL_CONTENT["SAMA"] = {
  qcmPositionnement: [
    { question: "Quel document permet d'identifier un patient à l'accueil ?", options: ["La carte de fidélité", "La carte Vitale", "Le permis de conduire uniquement", "Un ticket de caisse"], correctIndex: 1 },
    { question: "Que signifie le sigle DPI ?", options: ["Dossier Patient Informatisé", "Document de Planification Interne", "Données Personnelles Informatiques", "Dossier Professionnel Individuel"], correctIndex: 0 },
    { question: "Qu'est-ce que l'identitovigilance ?", options: ["La surveillance des badges d'accès", "La vérification de l'identité du patient à chaque étape", "Le contrôle des identifiants informatiques", "La protection des données du personnel"], correctIndex: 1 },
    { question: "Quel logiciel est couramment utilisé pour la prise de rendez-vous médicaux en ligne ?", options: ["Excel", "Doctolib", "PowerPoint", "Photoshop"], correctIndex: 1 },
    { question: "Que signifie le sigle CMU ?", options: ["Couverture Maladie Universelle", "Centre Médical Universitaire", "Caisse Mutuelle Unique", "Consultation Médicale Urgente"], correctIndex: 0 },
    { question: "Quel est le délai légal pour communiquer un dossier médical au patient ?", options: ["48 heures", "1 semaine", "8 jours maximum", "3 mois"], correctIndex: 2 },
    { question: "Qu'est-ce que la télétransmission ?", options: ["L'envoi de fax", "La transmission électronique des feuilles de soins à l'Assurance Maladie", "L'envoi d'emails aux patients", "La visioconférence médicale"], correctIndex: 1 },
    { question: "Quel professionnel rédige un compte rendu opératoire ?", options: ["L'infirmier", "Le secrétaire médical", "Le chirurgien", "Le directeur de l'hôpital"], correctIndex: 2 },
    { question: "Que signifie le secret médical ?", options: ["Interdiction de parler de son travail", "Obligation de confidentialité sur les informations du patient", "Interdiction de communiquer entre collègues", "Protection du salaire des médecins"], correctIndex: 1 },
    { question: "Quel est le rôle principal du secrétaire assistant médico-administratif ?", options: ["Réaliser des soins infirmiers", "Assurer l'accueil et la gestion administrative du patient", "Prescrire des médicaments", "Gérer la comptabilité de l'hôpital"], correctIndex: 1 },
  ],
  qcmFinal: [
    { question: "Lors de l'accueil d'un patient, quelle est la première vérification à effectuer ?", options: ["Son groupe sanguin", "Son identité (identitovigilance)", "Son poids", "Sa tension artérielle"], correctIndex: 1 },
    { question: "Quel document est nécessaire pour la prise en charge financière d'un patient ?", options: ["Une ordonnance", "L'attestation de droits (carte Vitale + mutuelle)", "Le carnet de vaccination", "Le livret de famille"], correctIndex: 1 },
    { question: "Qu'est-ce qu'un codage CCAM ?", options: ["Un code postal médical", "La Classification Commune des Actes Médicaux pour la facturation", "Un code d'accès au dossier patient", "Un certificat médical"], correctIndex: 1 },
    { question: "Quel est le principe de la loi Kouchner (4 mars 2002) concernant le dossier médical ?", options: ["Le médecin peut refuser l'accès au dossier", "Le patient a un droit d'accès direct à son dossier médical", "Seule la famille peut consulter le dossier", "Le dossier doit être détruit après 5 ans"], correctIndex: 1 },
    { question: "Qu'est-ce que la MSSanté ?", options: ["Un logiciel de comptabilité", "La Messagerie Sécurisée de Santé pour les échanges entre professionnels", "Un réseau social médical", "Une mutuelle santé"], correctIndex: 1 },
    { question: "Comment gère-t-on un patient mécontent à l'accueil ?", options: ["On l'ignore", "On écoute, reformule et propose une solution adaptée", "On appelle la sécurité immédiatement", "On lui demande de revenir un autre jour"], correctIndex: 1 },
    { question: "Que doit contenir un compte rendu de consultation ?", options: ["Les coordonnées bancaires du patient", "Les motifs, observations, diagnostic et prescriptions", "Le menu du restaurant de l'hôpital", "Le planning des congés du médecin"], correctIndex: 1 },
    { question: "Quel est le rôle du parcours de soins coordonnés ?", options: ["Réduire les effectifs hospitaliers", "Organiser le suivi du patient via le médecin traitant", "Supprimer les spécialistes", "Remplacer les consultations par des emails"], correctIndex: 1 },
    { question: "Comment archiver un dossier médical ?", options: ["Le jeter après la dernière consultation", "Respecter les durées légales de conservation (20 ans minimum)", "Le stocker sur une clé USB personnelle", "L'envoyer au patient par courrier"], correctIndex: 1 },
    { question: "Que signifie T2A dans le contexte hospitalier ?", options: ["Tarification À l'Activité", "Temps de Travail Annuel", "Taxe d'Accueil Ambulatoire", "Transfert Automatique d'Agenda"], correctIndex: 0 },
  ],
  exercices: [
    { titre: "Accueil et identification du patient", consigne: "Un patient se présente à l'accueil avec sa carte Vitale mais sans pièce d'identité. Décrivez la procédure d'identitovigilance à suivre et les documents à demander.", reponseAttendue: "Vérifier l'identité par questions (nom, prénom, date de naissance), demander une pièce d'identité pour la prochaine visite, noter l'alerte dans le dossier, appliquer le protocole d'identitovigilance de l'établissement." },
    { titre: "Gestion de planning multi-praticiens", consigne: "Le Dr Martin (cardiologue) est absent demain. Il a 8 rendez-vous programmés. Décrivez les étapes pour gérer cette situation : report, priorisation, communication.", reponseAttendue: "Identifier les urgences à reporter en priorité vers un confrère, contacter chaque patient pour proposer un nouveau créneau, mettre à jour Doctolib, informer l'équipe, noter les reports dans le dossier patient." },
    { titre: "Prise en charge administrative et financière", consigne: "Mme Dupont consulte un spécialiste sans avoir été orientée par son médecin traitant. Expliquez les conséquences financières et la procédure à suivre.", reponseAttendue: "Hors parcours de soins coordonnés : remboursement réduit (30% au lieu de 70%). Informer la patiente, proposer de contacter le médecin traitant pour régulariser, enregistrer le statut dans le logiciel de facturation." },
    { titre: "Transcription d'un compte rendu médical", consigne: "Transcrivez la dictée suivante du Dr Bernard : 'Patient vu ce jour pour douleurs thoraciques atypiques. ECG normal. Bilan sanguin : troponine négative. Pas de syndrome coronarien aigu. Surveillance ambulatoire préconisée. Contrôle à 15 jours.'", reponseAttendue: "Compte rendu mis en forme avec en-tête du praticien, date, identité du patient, motif de consultation, examens réalisés et résultats, conclusion diagnostique et conduite à tenir." },
    { titre: "Gestion d'une demande d'accès au dossier médical", consigne: "Le fils d'un patient décédé demande l'accès au dossier médical de son père. Quels documents devez-vous vérifier et quelle est la procédure ?", reponseAttendue: "Vérifier : acte de décès, preuve de la filiation (livret de famille), pièce d'identité. Vérifier que le patient n'avait pas exprimé d'opposition. Préparer les éléments communicables en excluant les notes personnelles du médecin. Respecter le délai légal de 8 jours." },
    { titre: "Communication via MSSanté", consigne: "Le médecin traitant de M. Leblanc demande les résultats de son IRM par email. Décrivez la procédure sécurisée à suivre.", reponseAttendue: "Utiliser exclusivement la messagerie MSSanté (jamais un email classique). Vérifier l'identité du destinataire dans l'annuaire. Joindre le compte rendu en pièce jointe. Mentionner les références du patient. Conserver une trace de l'envoi." },
    { titre: "Facturation et télétransmission", consigne: "Un patient présente une carte Vitale expirée et une attestation papier de la CPAM. Comment procédez-vous pour la facturation de la consultation ?", reponseAttendue: "Saisir manuellement les informations de l'attestation papier dans le logiciel. Créer une feuille de soins papier ou électronique. Conserver une copie de l'attestation. Informer le patient de la mise à jour de sa carte Vitale. Effectuer la télétransmission dès que possible." },
    { titre: "Terminologie médicale", consigne: "Expliquez les termes suivants en langage courant : dyspnée, tachycardie, hématurie, céphalée, asthénie.", reponseAttendue: "Dyspnée = difficulté à respirer ; Tachycardie = rythme cardiaque trop rapide ; Hématurie = sang dans les urines ; Céphalée = mal de tête ; Asthénie = fatigue intense." },
    { titre: "Gestion de conflit à l'accueil", consigne: "Un patient s'énerve car il attend depuis 45 minutes alors qu'il avait rendez-vous. Le médecin a pris du retard à cause d'une urgence. Comment réagissez-vous ?", reponseAttendue: "Écouter le patient avec empathie, s'excuser pour l'attente, expliquer qu'une urgence a décalé les consultations sans donner de détails (secret médical), proposer un verre d'eau, informer le médecin, proposer un nouveau rendez-vous si le patient ne peut pas attendre." },
    { titre: "Archivage et conservation des dossiers", consigne: "Votre établissement doit archiver les dossiers des patients sortis depuis plus de 5 ans. Décrivez la procédure d'archivage dans le respect de la réglementation.", reponseAttendue: "Durée légale de conservation : 20 ans à compter de la dernière consultation (ou 28 ans pour les mineurs). Trier les dossiers par date. Vérifier qu'aucun n'est en dessous du seuil. Archiver en local sécurisé ou via prestataire agréé. Mettre à jour le registre d'archivage. Respecter le RGPD." },
  ],
  competences: [
    "Accueil physique et téléphonique du patient",
    "Identitovigilance et vérification d'identité",
    "Gestion des plannings et agendas médicaux",
    "Prise en charge administrative et financière du patient",
    "Facturation et télétransmission des actes médicaux",
    "Transcription et mise en forme de documents médicaux",
    "Terminologie médicale",
    "Suivi médico-administratif du dossier patient",
    "Communication via messagerie sécurisée de santé",
    "Gestion de l'accès au dossier médical",
    "Archivage et conservation des dossiers",
    "Respect du secret médical et de la confidentialité",
  ],
  appreciations: [
    "Excellente maîtrise de l'accueil patient et des procédures d'identitovigilance. Transcription médicale de très bonne qualité.",
    "Bonne progression sur la terminologie médicale et la gestion des plannings. La facturation est bien assimilée.",
    "Très bonne implication. La gestion des situations conflictuelles à l'accueil est maîtrisée. La transcription nécessite encore un peu de pratique.",
    "Niveau satisfaisant. Les procédures administratives sont acquises. Doit encore approfondir la terminologie des spécialités médicales.",
    "Stagiaire sérieux(se) et appliqué(e). La prise en charge financière et la télétransmission sont bien comprises.",
    "Bonne compréhension du cadre réglementaire. L'utilisation de MSSanté et du DPI est opérationnelle.",
  ],
};

EVAL_CONTENT["SAMS"] = {
  ...EVAL_CONTENT["SAMA"],
  qcmPositionnement: [
    ...EVAL_CONTENT["SAMA"].qcmPositionnement.slice(0, 7),
    { question: "Que signifie le sigle MDPH ?", options: ["Maison Départementale des Personnes Handicapées", "Mutuelle De Protection Hospitalière", "Module De Planification Hospitalière", "Maison De soins Pour Hospitalisés"], correctIndex: 0 },
    { question: "Quel est le rôle du CCAS ?", options: ["Centre Communal d'Action Sociale : aide aux personnes en difficulté", "Centre de Consultation et d'Aide Sanitaire", "Caisse Centrale d'Assurance Sociale", "Comité de Coordination des Aides Sociales"], correctIndex: 0 },
    { question: "Qu'est-ce qu'un PIA dans le secteur médico-social ?", options: ["Plan d'Investissement Annuel", "Projet Individuel d'Accompagnement", "Programme d'Insertion Administrative", "Protocole d'Intervention Avancée"], correctIndex: 1 },
  ],
  competences: [
    "Accueil physique et téléphonique des usagers",
    "Gestion administrative des dossiers des usagers",
    "Suivi des parcours et des prises en charge",
    "Rédaction de comptes rendus et transmissions",
    "Coordination avec les partenaires sociaux et médico-sociaux",
    "Terminologie médico-sociale",
    "Gestion des plannings des intervenants",
    "Facturation et suivi financier des prestations",
    "Communication avec les familles et les aidants",
    "Respect du secret professionnel et de la confidentialité",
    "Utilisation des logiciels métier (DUI, dossier usager)",
    "Archivage et gestion documentaire",
  ],
};

EVAL_CONTENT["NTC"] = {
  qcmPositionnement: [
    { question: "Qu'est-ce qu'un persona en marketing ?", options: ["Un logiciel CRM", "Un profil fictif représentant un segment de clientèle cible", "Un concurrent direct", "Un type de contrat commercial"], correctIndex: 1 },
    { question: "Que signifie le sigle CRM ?", options: ["Centre de Recherche Marketing", "Customer Relationship Management", "Compte Rendu Mensuel", "Certification Relations Métier"], correctIndex: 1 },
    { question: "Qu'est-ce que la prospection B2B ?", options: ["La vente aux particuliers", "La recherche de clients professionnels (entreprise à entreprise)", "La publicité à la télévision", "Le service après-vente"], correctIndex: 1 },
    { question: "Que signifie un objectif SMART ?", options: ["Simple, Motivant, Accessible, Rapide, Tangible", "Spécifique, Mesurable, Atteignable, Réaliste, Temporellement défini", "Stratégique, Marketing, Automatisé, Rentable, Technique", "Standard, Modifiable, Adaptable, Raisonnable, Testé"], correctIndex: 1 },
    { question: "Qu'est-ce que le social selling ?", options: ["Vendre sur les marchés", "Utiliser les réseaux sociaux pour prospecter et vendre", "Vendre des produits sociaux", "Faire du bénévolat commercial"], correctIndex: 1 },
    { question: "Que représente le taux de conversion en vente ?", options: ["Le nombre de prospects contactés", "Le pourcentage de prospects transformés en clients", "Le chiffre d'affaires mensuel", "Le nombre de visites sur le site web"], correctIndex: 1 },
    { question: "Qu'est-ce qu'un argumentaire de vente ?", options: ["Un contrat de vente", "Un ensemble structuré d'arguments pour convaincre un prospect", "Un devis commercial", "Un bon de commande"], correctIndex: 1 },
    { question: "Que signifie le sigle KPI ?", options: ["Key Performance Indicator (indicateur clé de performance)", "Knowledge Process Integration", "Key Product Innovation", "Keen Profit Index"], correctIndex: 0 },
    { question: "Qu'est-ce que le closing en négociation ?", options: ["L'ouverture d'un compte client", "La phase de conclusion de la vente", "La fermeture d'un magasin", "L'envoi d'un devis"], correctIndex: 1 },
    { question: "Qu'est-ce qu'une veille concurrentielle ?", options: ["Surveiller ses collègues", "Analyser les produits, prix et stratégies des concurrents", "Faire des heures supplémentaires", "Rédiger des rapports internes"], correctIndex: 1 },
  ],
  qcmFinal: [
    { question: "Quelle est la différence entre stratégie inbound et outbound ?", options: ["Inbound = prospection directe, Outbound = attirer les clients", "Inbound = attirer les clients par le contenu, Outbound = prospection directe", "Ce sont des synonymes", "Inbound = vente en ligne, Outbound = vente en magasin"], correctIndex: 1 },
    { question: "Quel outil permet d'automatiser les campagnes de prospection ?", options: ["Un tableur Excel", "Une plateforme d'automatisation marketing (HubSpot, Make, etc.)", "Un téléphone fixe", "Un agenda papier"], correctIndex: 1 },
    { question: "Qu'est-ce que le SONCAS en technique de vente ?", options: ["Un logiciel CRM", "Un modèle identifiant les motivations d'achat (Sécurité, Orgueil, Nouveauté, Confort, Argent, Sympathie)", "Un type de contrat", "Une certification commerciale"], correctIndex: 1 },
    { question: "Comment traiter une objection prix ?", options: ["Baisser le prix immédiatement", "Reformuler, valoriser le rapport qualité/prix et démontrer le ROI", "Ignorer l'objection", "Proposer un produit moins cher"], correctIndex: 1 },
    { question: "Qu'est-ce que l'upselling ?", options: ["Vendre un produit moins cher", "Proposer un produit ou service de gamme supérieure au client", "Annuler une vente", "Faire une remise commerciale"], correctIndex: 1 },
    { question: "Que mesure le pipe commercial (pipeline) ?", options: ["Le nombre de réclamations", "L'ensemble des opportunités commerciales en cours à différents stades de maturité", "Le chiffre d'affaires passé", "Le nombre d'employés"], correctIndex: 1 },
    { question: "Qu'est-ce que la méthode SPIN selling ?", options: ["Situation, Problème, Implication, Need-payoff : une technique de questionnement en vente consultative", "Speed, Precision, Innovation, Networking", "Un logiciel de gestion commerciale", "Une méthode de recrutement"], correctIndex: 0 },
    { question: "Que signifie le cross-selling ?", options: ["Vendre à l'international", "Proposer des produits complémentaires à un client existant", "Vendre en équipe", "Changer de secteur commercial"], correctIndex: 1 },
    { question: "Qu'est-ce que le RGPD dans le contexte de la prospection commerciale ?", options: ["Un logiciel de comptabilité", "Le Règlement Général sur la Protection des Données encadrant la collecte et l'utilisation des données personnelles", "Un réseau de vente", "Un certificat de qualité"], correctIndex: 1 },
    { question: "Comment calculer un seuil de rentabilité ?", options: ["Chiffre d'affaires ÷ nombre de clients", "Charges fixes ÷ taux de marge sur coûts variables", "Bénéfice net × 100", "Prix de vente - prix d'achat"], correctIndex: 1 },
  ],
  exercices: [
    { titre: "Veille concurrentielle et analyse de marché", consigne: "Vous êtes NTC chez IndustrieTech, fournisseur de solutions d'automatisation industrielle. Réalisez une analyse concurrentielle complète : identifiez 5 concurrents directs, comparez leurs offres (prix, services, délais), et proposez 3 axes de différenciation pour votre entreprise.", reponseAttendue: "Analyse SWOT des concurrents, tableau comparatif prix/services/délais, identification des avantages concurrentiels (SAV réactif, solutions sur-mesure, expertise technique), recommandations stratégiques argumentées." },
    { titre: "Élaboration d'un plan d'actions commerciales", consigne: "Votre direction fixe un objectif de +15% de CA sur le semestre 2. Votre portefeuille compte 60 clients actifs et 25 prospects qualifiés. Élaborez un plan d'actions commerciales SMART avec rétroplanning, budget prévisionnel et KPIs de suivi.", reponseAttendue: "Objectifs SMART quantifiés, actions planifiées (prospection terrain, emailing, salons, social selling), rétroplanning semaine par semaine, budget par action, tableau de bord avec KPIs (nb RDV, taux transformation, CA généré, pipe)." },
    { titre: "Prospection multicanale", consigne: "Vous devez prospecter 30 PME industrielles en Région Auvergne-Rhône-Alpes. Créez un fichier de prospection qualifié, rédigez un script de phoning, un email de prospection et un message LinkedIn personnalisé.", reponseAttendue: "Fichier avec critères de segmentation (secteur, taille, CA), script phoning avec accroche/découverte/traitement objections/closing, email professionnel avec objet accrocheur et call-to-action, approche LinkedIn personnalisée." },
    { titre: "Conception d'une proposition technique et commerciale", consigne: "L'entreprise MECANORD (50 salariés, usinage de précision) a besoin d'un système de contrôle qualité automatisé. Budget estimé : 45 000€ HT. Concevez une proposition technique et commerciale complète incluant l'argumentaire.", reponseAttendue: "Analyse des besoins MECANORD, solution technique détaillée, chiffrage (matériel + installation + formation + maintenance), argumentaire CAP (Caractéristiques-Avantages-Preuves), ROI démontré, planning de déploiement, CGV." },
    { titre: "Simulation de négociation commerciale", consigne: "Le directeur de production de MECANORD vous annonce que votre concurrent propose la même solution à 38 000€. Préparez votre stratégie de négociation : arguments, concessions possibles, points non négociables, technique de closing.", reponseAttendue: "Préparation : analyse de l'offre concurrente (différences techniques, services inclus), arguments de valeur ajoutée, matrice de concessions (remise max 5%, facilités de paiement, extension garantie), technique SPIN pour recentrer sur les besoins, closing par alternative." },
    { titre: "Analyse de performance et actions correctives", consigne: "À mi-parcours (fin T2), votre tableau de bord affiche : CA réalisé 180K€ (objectif 250K€), 45 RDV (objectif 60), taux de transformation 22% (objectif 30%). Analysez les écarts et proposez un plan d'actions correctives pour le S2.", reponseAttendue: "Analyse des écarts par KPI, identification des causes (cible mal segmentée, argumentaire à revoir, suivi insuffisant), plan correctif avec actions prioritaires, nouveaux objectifs intermédiaires, reporting hebdomadaire proposé." },
    { titre: "Représentation de l'entreprise et e-réputation", consigne: "Votre entreprise participe au salon Industrie Lyon dans 3 semaines. Préparez : votre elevator pitch (2 min), un plan de communication LinkedIn avant/pendant/après le salon, et un plan de suivi des contacts.", reponseAttendue: "Elevator pitch structuré (problème/solution/preuve/appel à l'action), planning LinkedIn (teasing avant, posts live pendant, récap après), template de suivi contacts (relance J+2, qualification, proposition RDV)." },
    { titre: "Gestion de la relation client et fidélisation", consigne: "Le client AEROTECH (CA annuel 120K€) menace de résilier son contrat suite à 2 retards de livraison. Préparez votre plan de reconquête : entretien de médiation, geste commercial, plan de fidélisation sur 12 mois.", reponseAttendue: "Plan d'entretien de médiation (écoute, reconnaissance du problème, solutions concrètes), geste commercial calibré (avoir, extension service, livraison prioritaire), plan de fidélisation (point mensuel, comité de pilotage, offre privilégiée, enquête satisfaction trimestrielle)." },
    { titre: "Utilisation du CRM et reporting", consigne: "Votre direction vous demande un rapport d'activité trimestriel exploitable. À partir des données CRM (75 contacts, 30 RDV, 8 propositions, 5 ventes), créez un tableau de bord avec analyse et recommandations.", reponseAttendue: "Tableau de bord visuel avec KPIs (taux de contact, taux de RDV, taux de proposition, taux de closing), analyse des ratios, identification des goulots d'étranglement, comparaison N/N-1, recommandations opérationnelles." },
    { titre: "Intégration de la dimension RSE dans la vente", consigne: "Un prospect vous demande comment votre solution contribue au développement durable. Construisez un argumentaire RSE intégrant : impact environnemental, économie circulaire, empreinte carbone, et engagements éco-responsables de votre entreprise.", reponseAttendue: "Argumentaire structuré : réduction empreinte carbone (chiffres), conformité loi AGEC et loi Climat et Résilience, politique d'économie circulaire (recyclage, reconditionnement), certifications environnementales, impact social (emploi local, insertion)." },
  ],
  competences: [
    "Veille commerciale et concurrentielle",
    "Élaboration de stratégies de prospection",
    "Conception de plans d'actions commerciales",
    "Prospection multicanale (phoning, emailing, social selling)",
    "Création et exploitation de personas",
    "Conception de propositions techniques et commerciales",
    "Techniques de négociation et closing",
    "Traitement des objections",
    "Analyse de performances et KPIs commerciaux",
    "Gestion de la relation client (CRM/e-CRM)",
    "Fidélisation et optimisation du portefeuille client",
    "Communication professionnelle et e-réputation",
    "Reporting et bilan d'activité commerciale",
    "Intégration RSE et développement durable dans la démarche commerciale",
  ],
  appreciations: [
    "Excellente maîtrise des techniques de prospection et de négociation. L'analyse concurrentielle est pertinente et les propositions commerciales sont très bien construites.",
    "Bonne progression sur l'utilisation du CRM et le social selling. Les plans d'actions sont structurés et les KPIs bien suivis.",
    "Très bon sens commercial. La préparation des entretiens de vente est rigoureuse et l'argumentaire est convaincant. Le traitement des objections est efficace.",
    "Niveau satisfaisant. Les fondamentaux de la prospection sont acquis. Doit encore approfondir les techniques de closing et la négociation complexe.",
    "Stagiaire impliqué(e) et motivé(e). La veille concurrentielle est bien structurée. Les compétences en reporting progressent rapidement.",
    "Bonne compréhension de la démarche commerciale B2B. L'intégration de la dimension RSE dans les propositions est pertinente.",
  ],
};

const CIP_CONTENT: FormationEvalContent = {
  qcmPositionnement: [
    { question: "Quel est le rôle principal du Conseiller en Insertion Professionnelle ?", options: ["Recruter du personnel", "Accompagner les personnes vers l'emploi", "Gérer la paie", "Former les salariés"], correctIndex: 1 },
    { question: "Qu'est-ce qu'une PMSMP ?", options: ["Un contrat de travail", "Une période de mise en situation en milieu professionnel", "Un plan de mobilité", "Un programme de médiation sociale"], correctIndex: 1 },
    { question: "Quel organisme a remplacé Pôle emploi ?", options: ["APEC", "France Travail", "Cap emploi", "Mission locale"], correctIndex: 1 },
    { question: "Qu'est-ce que le CEJ ?", options: ["Un contrat d'engagement jeune", "Un certificat d'études juridiques", "Un conseil d'entreprise junior", "Un centre d'emploi des jeunes"], correctIndex: 0 },
    { question: "Combien de blocs de compétences comporte le titre CIP ?", options: ["2", "3", "4", "5"], correctIndex: 1 },
    { question: "Qu'est-ce que l'approche ADVP ?", options: ["Un logiciel de gestion RH", "Une méthode d'activation du développement vocationnel et personnel", "Un dispositif de financement", "Un outil de recrutement"], correctIndex: 1 },
    { question: "Quel est le public cible des missions locales ?", options: ["Les seniors", "Les jeunes de 16 à 25 ans", "Les travailleurs handicapés", "Les cadres"], correctIndex: 1 },
    { question: "Qu'est-ce que la MRS ?", options: ["La méthode de recrutement par simulation", "La mise en relation sociale", "Le management des ressources sociales", "La médiation et résolution de situations"], correctIndex: 0 },
    { question: "Quel dispositif finance la formation des demandeurs d'emploi en complément du CPF ?", options: ["RSA", "AIF", "ARE", "ASS"], correctIndex: 1 },
    { question: "Que signifie RQTH ?", options: ["Reconnaissance de la Qualité de Travailleur Handicapé", "Registre des Qualifications et Titres Homologués", "Règlement des Questions de Travail et d'Handicap", "Répertoire Qualifié des Travailleurs Habilités"], correctIndex: 0 },
    { question: "Qu'est-ce qu'un SIAE ?", options: ["Un service informatique", "Une structure d'insertion par l'activité économique", "Un système d'aide à l'emploi", "Un syndicat interprofessionnel"], correctIndex: 1 },
    { question: "Quelle technique d'entretien consiste à dire au bénéficiaire ce que l'on a compris de ses propos ?", options: ["La question fermée", "La reformulation", "Le silence", "La confrontation"], correctIndex: 1 },
    { question: "Qu'est-ce que le marché caché de l'emploi ?", options: ["Les emplois non déclarés", "Les offres non publiées, pourvues par réseau ou candidature spontanée", "Les emplois à l'étranger", "Les postes réservés aux fonctionnaires"], correctIndex: 1 },
    { question: "Quel outil permet de classer les métiers par domaine professionnel ?", options: ["Le code NAF", "Le répertoire ROME", "Le code APE", "Le SIRET"], correctIndex: 1 },
    { question: "Qu'est-ce que l'IAE ?", options: ["L'intelligence artificielle en entreprise", "L'insertion par l'activité économique", "L'indemnisation des accidents de l'emploi", "L'initiative d'aide à l'embauche"], correctIndex: 1 },
  ],
  qcmFinal: [
    { question: "Quelles sont les 4 phases de la méthode ADVP ?", options: ["Explorer, Cristalliser, Spécifier, Réaliser", "Accueillir, Diagnostiquer, Valider, Placer", "Identifier, Analyser, Proposer, Suivre", "Écouter, Reformuler, Orienter, Conclure"], correctIndex: 0 },
    { question: "Quel est le taux d'OETH (obligation d'emploi TH) pour les entreprises de 20+ salariés ?", options: ["3%", "6%", "10%", "1%"], correctIndex: 1 },
    { question: "Dans la méthode STAR pour les entretiens, que signifie le A ?", options: ["Analyse", "Action", "Attitude", "Aptitude"], correctIndex: 1 },
    { question: "Quel dispositif permet aux acheteurs publics d'imposer des heures d'insertion dans les marchés ?", options: ["Le PEC", "Les clauses sociales", "L'AFPR", "Le CIE"], correctIndex: 1 },
    { question: "Quelle est la durée maximale d'un CEJ ?", options: ["6 mois", "12 mois", "18 mois", "24 mois"], correctIndex: 1 },
    { question: "Quels sont les 3 CCP du titre professionnel CIP ?", options: ["Accueil/Diagnostic, Accompagnement parcours, Relation employeurs", "Recrutement, Formation, Évaluation", "Prospection, Placement, Suivi", "Information, Orientation, Insertion"], correctIndex: 0 },
    { question: "Qu'est-ce que le dossier professionnel (DP) pour l'examen CIP ?", options: ["Un CV détaillé", "Un document décrivant la pratique professionnelle pour chaque activité type", "Une lettre de motivation", "Un rapport de stage"], correctIndex: 1 },
    { question: "Quel logiciel est utilisé par les missions locales pour le suivi des jeunes ?", options: ["SAP", "i-Milo", "Salesforce", "DUDE"], correctIndex: 1 },
    { question: "Quelle aide financière l'AGEFIPH apporte-t-elle aux employeurs recrutant un TH ?", options: ["Jusqu'à 1 000 €", "Jusqu'à 4 000 €", "Jusqu'à 10 000 €", "Jusqu'à 500 €"], correctIndex: 1 },
    { question: "Qu'est-ce que le BMO de France Travail ?", options: ["Le bilan mensuel des offres", "L'enquête Besoins en Main-d'Œuvre", "Le budget de mobilisation des opérateurs", "Le barème minimal des offres"], correctIndex: 1 },
    { question: "Quel est le montant maximum de l'allocation CEJ ?", options: ["300 €/mois", "420 €/mois", "528 €/mois", "600 €/mois"], correctIndex: 2 },
    { question: "Qu'est-ce qu'un emploi franc ?", options: ["Un emploi sans contrat", "Une aide pour les résidents de QPV embauchés en CDI/CDD", "Un emploi à temps partiel", "Un contrat aidé pour seniors"], correctIndex: 1 },
    { question: "Quel est le délai recommandé pour le suivi post-embauche ?", options: ["J+7, J+30, J+90", "J+1, J+15, J+60", "J+30, J+60, J+180", "J+7 uniquement"], correctIndex: 0 },
    { question: "Combien de critères de discrimination sont interdits par la loi ?", options: ["10", "15", "20", "25"], correctIndex: 3 },
    { question: "Quel organisme gère le CPF ?", options: ["France Travail", "La Caisse des Dépôts", "L'URSSAF", "L'OPCO"], correctIndex: 1 },
  ],
  exercices: [
    { titre: "Étude de cas : Diagnostic global d'insertion", consigne: "Mme Fatima B., 38 ans, mère de 3 enfants, est bénéficiaire du RSA. Elle souhaite reprendre une activité professionnelle après 8 ans d'interruption. Elle n'a pas le permis de conduire, vit dans un logement social en zone rurale, et son dernier emploi était aide à domicile. Réalisez un diagnostic global en identifiant les freins périphériques et proposez un plan d'action structuré avec les dispositifs mobilisables.", reponseAttendue: "Freins identifiés : mobilité (pas de permis, zone rurale), garde d'enfants (3 enfants), compétences à actualiser (8 ans d'arrêt), isolement géographique. Plan d'action : 1) Mobilité : plateforme de mobilité + aide au permis Mission locale/France Travail ; 2) Garde : EAJE ou assistante maternelle via CAF ; 3) Compétences : PMSMP en aide à domicile + formation ADVF (CPF+AIF) ; 4) Accompagnement RSA via référent unique ; 5) Suivi à J+15, M+1, M+3." },
    { titre: "Simulation d'entretien d'accueil", consigne: "M. Karim D., 24 ans, se présente à votre structure sans rendez-vous. Il dit 'je cherche du travail, n'importe quoi'. Rédigez le déroulé complet de l'entretien d'accueil : les questions que vous posez, les techniques d'écoute active utilisées, et la synthèse que vous ferez en fin d'entretien.", reponseAttendue: "Accueil bienveillant, présentation de la structure. Questions ouvertes pour explorer la demande réelle. Reformulation pour valider la compréhension. Exploration : parcours scolaire, expériences (même informelles), centres d'intérêt, contraintes (mobilité, logement). Diagnostic : identifier si NEET → CEJ possible. Proposition : RDV de diagnostic approfondi + inscription France Travail si pas fait. Remise de documentation sur les services." },
    { titre: "Conception d'un atelier TRE", consigne: "Concevez un atelier collectif de 3 heures sur le thème 'Réussir son entretien d'embauche' pour un groupe de 8 demandeurs d'emploi de niveaux variés. Détaillez : objectifs pédagogiques, déroulé séquencé, méthodes pédagogiques, supports nécessaires, et modalités d'évaluation.", reponseAttendue: "Objectifs : préparer un entretien, maîtriser la méthode STAR, gérer le stress. Déroulé : 1) Ice-breaker 15min ; 2) Apports théoriques : structure de l'entretien, les questions types, la méthode STAR 45min ; 3) Exercice individuel : préparer son pitch 2min 20min ; 4) Jeux de rôle en binômes filmés 60min ; 5) Débriefing collectif 30min ; 6) Bilan + évaluation 10min. Supports : grille d'auto-évaluation, fiche mémo STAR, caméra/téléphone pour filmer." },
    { titre: "Prospection employeur", consigne: "Vous devez prospecter une entreprise de logistique locale (50 salariés) pour lui proposer vos services d'intermédiation. Rédigez : 1) votre argumentaire téléphonique de prise de RDV ; 2) votre offre de services détaillée ; 3) les aides à l'embauche que vous pouvez proposer.", reponseAttendue: "Argumentaire : accroche (secteur logistique en tension), proposition de valeur (candidats pré-sélectionnés, suivi post-embauche gratuit, aides financières). Offre de services : sourcing ciblé, présélection sur habiletés (MRS), accompagnement intégration, suivi à J+7/J+30/J+90. Aides : PEC si public éloigné, emplois francs si QPV, aide alternance si -30 ans, AMEETH si TH. Convention de partenariat à formaliser." },
    { titre: "Plan d'action individualisé", consigne: "M. Ahmed S., 45 ans, ancien chef d'équipe en BTP, est en reconversion suite à un accident du travail (RQTH en cours). Il souhaite devenir formateur en prévention des risques. Élaborez son plan d'action complet sur 12 mois avec les dispositifs, financements et partenaires à mobiliser.", reponseAttendue: "M1-M2 : Finalisation RQTH (MDPH) + bilan de compétences (CPF). M3 : Enquête métier formateur prévention + PMSMP en organisme de formation. M4-M9 : Formation 'Formateur professionnel d'adultes' TP FPA (CPF + AGEFIPH + Région). M10-M11 : Stage pratique en organisme. M12 : Certification + recherche emploi ciblée. Partenaires : Cap emploi, AGEFIPH, France Travail, OPCO de l'organisme d'accueil. Financement : CPF (solde) + aide AGEFIPH formation + complément AIF." },
    { titre: "Veille informationnelle", consigne: "Réalisez une veille sur les dispositifs d'aide à l'insertion mis à jour en 2024-2025. Identifiez au moins 5 changements récents (nouveaux dispositifs, modifications de dispositifs existants, réformes) et expliquez leur impact sur votre pratique de CIP.", reponseAttendue: "1) Création de France Travail (ex Pôle emploi) : guichet unique, inscription automatique RSA ; 2) Réforme du RSA : 15h d'activité obligatoire ; 3) Fin progressive des contrats aidés classiques au profit du PEC renforcé ; 4) Extension du CEJ aux 25-30 ans handicapés ; 5) Nouveau SMIC et revalorisations ARE/ASS ; 6) Renforcement des clauses sociales dans les marchés publics. Impact : adaptation de l'information au public, mise à jour des outils, nouvelles procédures d'orientation." },
  ],
  competences: [
    "Accueillir et informer une personne ou un groupe sur les ressources d'insertion",
    "Analyser la demande et poser les bases d'un diagnostic partagé",
    "Exercer une veille informationnelle et technique sur l'insertion",
    "Travailler en équipe et en réseau partenarial",
    "Co-construire et suivre un projet d'insertion professionnelle",
    "Concevoir et animer des ateliers thématiques collectifs",
    "Préparer et accompagner la personne dans ses démarches de recherche d'emploi",
    "Prospecter les employeurs et développer des partenariats",
    "Apporter un appui technique aux employeurs en matière de recrutement",
    "Faciliter l'intégration et le maintien en emploi",
    "Connaître le cadre légal de la non-discrimination et de l'égalité",
    "Utiliser les logiciels métier et outils numériques d'insertion",
  ],
  appreciations: [
    "Excellente maîtrise des techniques d'entretien et du diagnostic partagé. Les plans d'action sont pertinents et les dispositifs bien mobilisés. Posture professionnelle remarquable.",
    "Bonne progression sur l'ensemble des compétences CIP. La connaissance des dispositifs est solide. Doit encore approfondir la prospection employeur et les clauses sociales.",
    "Très bonne capacité d'analyse des situations complexes. L'accompagnement individualisé est rigoureux et empathique. Les ateliers collectifs sont bien structurés.",
    "Niveau satisfaisant. Les fondamentaux de l'accompagnement sont acquis. La veille informationnelle et la connaissance du territoire sont à renforcer.",
    "Stagiaire impliqué(e) et motivé(e). La conduite d'entretien est fluide et les reformulations pertinentes. Bonne maîtrise des outils numériques d'insertion.",
    "Solide sur les 3 blocs de compétences. La médiation avec les employeurs est efficace. Le suivi post-embauche est bien structuré avec un reporting de qualité.",
  ],
  questionsOuvertesDebut: [
    { question: "Selon vous, quelles sont les principales qualités requises pour exercer le métier de CIP ?", reponseAttendue: "Les qualités essentielles sont : l'écoute active et l'empathie pour comprendre les situations des personnes accompagnées, la neutralité bienveillante pour ne pas porter de jugement, l'adaptabilité pour s'ajuster aux publics variés, la rigueur administrative pour le suivi des parcours, la capacité d'analyse pour poser un diagnostic pertinent, et le sens du réseau pour mobiliser les partenaires du territoire." },
    { question: "Qu'est-ce qu'un frein périphérique à l'emploi ? Donnez 3 exemples.", reponseAttendue: "Un frein périphérique est un obstacle qui n'est pas directement lié aux compétences professionnelles mais qui empêche l'accès ou le maintien en emploi. Exemples : la mobilité (pas de permis, zone mal desservie), le logement (hébergement précaire, sans domicile), la santé (problèmes physiques ou psychiques), la garde d'enfants, la maîtrise de la langue française, l'illectronisme." },
    { question: "Quelle est la différence entre un entretien directif et un entretien semi-directif ?", reponseAttendue: "L'entretien directif suit un questionnaire structuré avec des questions fermées, le CIP guide fortement l'échange (utile pour recueillir des informations précises). L'entretien semi-directif utilise des questions ouvertes autour de thèmes préparés, laissant la personne s'exprimer librement tout en gardant un fil conducteur (idéal pour le diagnostic et l'accompagnement)." },
    { question: "Que signifie l'acronyme ROME et à quoi sert-il ?", reponseAttendue: "ROME signifie Répertoire Opérationnel des Métiers et des Emplois. C'est un outil créé par France Travail qui classe les métiers par fiches regroupant : la définition du métier, les compétences requises, les conditions d'exercice, les formations associées et les passerelles vers d'autres métiers. Le CIP l'utilise pour l'orientation professionnelle et la construction de projets." },
    { question: "Qu'est-ce que le CPF et comment fonctionne-t-il ?", reponseAttendue: "Le Compte Personnel de Formation est un dispositif permettant à toute personne active d'acquérir des droits à la formation mobilisables tout au long de sa vie professionnelle. Il est crédité en euros (500€/an, plafonné à 5000€, ou 800€/an plafonné à 8000€ pour les moins qualifiés). Il est géré par la Caisse des Dépôts via l'application Mon Compte Formation." },
  ],
  questionsOuvertesFin: [
    { question: "Décrivez la méthode ADVP et expliquez comment vous l'utiliseriez avec un jeune en difficulté d'orientation.", reponseAttendue: "La méthode ADVP (Activation du Développement Vocationnel et Personnel) comporte 4 phases : Explorer (découvrir ses intérêts et l'environnement professionnel), Cristalliser (clarifier ses préférences), Spécifier (préciser le choix professionnel), Réaliser (mettre en œuvre le projet). Avec un jeune en difficulté : Phase 1 – lui faire explorer des métiers via enquêtes, PMSMP, vidéos ; Phase 2 – l'aider à identifier ses critères prioritaires ; Phase 3 – cibler 2-3 métiers réalistes ; Phase 4 – construire le plan d'action (formation, alternance, CEJ)." },
    { question: "Vous recevez une personne qui dit avoir été discriminée lors d'un entretien d'embauche en raison de son origine. Quelle est votre démarche ?", reponseAttendue: "1) Écouter et accueillir la parole sans minimiser ; 2) Documenter les faits précisément (date, lieu, propos, témoins) ; 3) Informer sur les voies de recours : Défenseur des droits, saisine prudhomale, plainte pénale ; 4) Orienter vers une association spécialisée (SOS Racisme, LICRA, HALDE) ; 5) Proposer un soutien pour la suite du parcours ; 6) Signaler en interne si l'employeur est partenaire. La loi interdit la discrimination sur 25 critères." },
    { question: "Comment organiseriez-vous une action de prospection auprès des employeurs de votre territoire ?", reponseAttendue: "1) Cartographier le tissu économique : secteurs porteurs, entreprises qui recrutent, métiers en tension (via BMO France Travail, INSEE, CARIF-OREF) ; 2) Cibler 10-15 entreprises prioritaires ; 3) Préparer l'argumentaire : avantages (sourcing gratuit, suivi post-embauche, aides financières PEC/emplois francs/AMEETH) ; 4) Prospecter : phoning + mailing + visites terrain ; 5) Formaliser par convention de partenariat ; 6) Maintenir le lien : newsletter, invitations forums, relance trimestrielle." },
    { question: "Expliquez ce qu'est l'insertion par l'activité économique (IAE) et ses différentes structures.", reponseAttendue: "L'IAE est un dispositif permettant aux personnes éloignées de l'emploi de travailler dans des structures adaptées avec un accompagnement socioprofessionnel. Les 4 types : EI (Entreprise d'Insertion) – contrat CDD d'insertion, production de biens/services ; ETTI (Entreprise de Travail Temporaire d'Insertion) – intérim d'insertion ; AI (Association Intermédiaire) – mise à disposition auprès de particuliers, associations, collectivités ; ACI (Atelier et Chantier d'Insertion) – activités d'utilité sociale, public le plus éloigné de l'emploi." },
    { question: "Quels sont les éléments essentiels du dossier professionnel (DP) pour l'examen du titre CIP ?", reponseAttendue: "Le DP décrit la pratique professionnelle pour chaque activité type du titre. Il comprend : 1) La présentation du candidat et de son parcours ; 2) Pour chaque CCP, la description d'une ou plusieurs situations professionnelles vécues illustrant les compétences mobilisées ; 3) Les résultats obtenus et les outils/méthodes utilisés ; 4) Une analyse réflexive de sa pratique. Le DP sert de support à l'entretien final avec le jury de certification." },
  ],
};
EVAL_CONTENT["CIP"] = CIP_CONTENT;

// ===== RPMS =====
EVAL_CONTENT["RPMS"] = {
  qcmPositionnement: [
    { question: "Que signifie SWOT ?", options: ["Système de Workflow Opérationnel", "Strengths, Weaknesses, Opportunities, Threats", "Stratégie Webmarketing et Outils", "Suivi Workload et Organisation"], correctIndex: 1 },
    { question: "Qu'est-ce que le BFR ?", options: ["Le Bénéfice Financier Résiduel", "Le Besoin en Fonds de Roulement", "Le Budget Fonctionnel de Recettes", "Le Bilan Financier Restructuré"], correctIndex: 1 },
    { question: "Quel document résume le patrimoine d'une entreprise ?", options: ["Le compte de résultat", "Le bilan", "Le business plan", "Le prévisionnel"], correctIndex: 1 },
    { question: "Que signifie EBE ?", options: ["Excédent Brut d'Exploitation", "Évaluation du Budget d'Entreprise", "État des Bénéfices", "Estimation du Bilan"], correctIndex: 0 },
    { question: "Combien de styles de management (Hersey & Blanchard) ?", options: ["2", "3", "4", "6"], correctIndex: 2 },
    { question: "Fréquence de l'entretien professionnel obligatoire ?", options: ["Tous les ans", "Tous les 2 ans", "Tous les 3 ans", "Tous les 5 ans"], correctIndex: 1 },
    { question: "Que signifie PESTEL ?", options: ["Politique, Économique, Social, Technologique, Environnemental, Légal", "Production, Évaluation, Stratégie, Technique, Engagement, Leadership", "Planification, Exécution, Suivi, Test, Évaluation, Livraison", "Prix, Efficacité, Service, Technologie, Éthique, Logistique"], correctIndex: 0 },
    { question: "Qu'est-ce qu'un tableau de bord de gestion ?", options: ["Un outil comptable obligatoire", "Un document fiscal", "Un outil de pilotage avec indicateurs clés", "Un logiciel de paie"], correctIndex: 2 },
    { question: "Seuil pour l'obligation de mettre en place un CSE ?", options: ["5 salariés", "11 salariés", "20 salariés", "50 salariés"], correctIndex: 1 },
    { question: "Qu'est-ce que le point mort ?", options: ["Le CA minimum pour couvrir les charges", "Le moment où l'entreprise ferme", "Le bénéfice net maximal", "Le taux d'endettement critique"], correctIndex: 0 },
  ],
  qcmFinal: [
    { question: "Comment calcule-t-on la marge brute ?", options: ["CA − Charges fixes", "(CA − Coût des ventes) / CA", "Résultat net / CA", "EBE / CA"], correctIndex: 1 },
    { question: "Quels sont les 4P du mix marketing ?", options: ["Produit, Prix, Place, Promotion", "Plan, Politique, Performance, Profit", "Prévision, Production, Pilotage, Performance", "Positionnement, Prospection, Promotion, Partenariat"], correctIndex: 0 },
    { question: "Qu'est-ce que la méthode PDCA ?", options: ["Plan-Do-Check-Act", "Planifier-Développer-Contrôler-Améliorer", "Les deux sont correctes", "Aucune des réponses"], correctIndex: 2 },
    { question: "Quelle forme juridique offre une responsabilité limitée ?", options: ["Entreprise individuelle", "SARL", "Auto-entrepreneur", "SNC"], correctIndex: 1 },
    { question: "Qu'est-ce que la GEPP ?", options: ["Gestion des Emplois et des Parcours Professionnels", "Guide d'Évaluation du Personnel", "Gestion Économique du Plan de Production", "Grille d'Évaluation du Potentiel"], correctIndex: 0 },
    { question: "Quel outil analyse les 5 forces concurrentielles ?", options: ["La matrice BCG", "Le modèle de Porter", "L'analyse PESTEL", "Le Business Model Canvas"], correctIndex: 1 },
    { question: "Délai moyen de paiement clients ?", options: ["(Créances / CA TTC) × 360", "Créances / Dettes × 100", "CA / Nombre de clients", "Trésorerie / CA × 360"], correctIndex: 0 },
    { question: "Qu'est-ce que le Balanced Scorecard ?", options: ["Un logiciel de comptabilité", "Un outil de pilotage à 4 perspectives", "Un tableau Excel RH", "Un indicateur boursier"], correctIndex: 1 },
    { question: "Quel document formalise la stratégie ?", options: ["Le bilan comptable", "Le business plan", "La fiche de paie", "L'organigramme"], correctIndex: 1 },
    { question: "Durée légale du travail en France ?", options: ["32h/semaine", "35h/semaine", "37h/semaine", "39h/semaine"], correctIndex: 1 },
  ],
  exercices: [
    { titre: "Cas 1 : Plan d'actions commerciales", consigne: "Vous êtes RPMS d'une PME de 15 salariés. Le CA a baissé de 12%. Élaborez un PAC sur 6 mois.", reponseAttendue: "Diagnostic, objectifs SMART (+15% CA), actions (prospection, fidélisation, partenariats), budget 5000€, KPIs (taux conversion, CA mensuel, NPS)." },
    { titre: "Cas 2 : Gestion d'un conflit", consigne: "Deux collaborateurs sont en conflit. Décrivez votre démarche de résolution.", reponseAttendue: "Entretiens individuels, identification des causes, médiation avec méthode DESC, solutions (redistribution tâches, outils de partage), suivi J+15 et M+1." },
    { titre: "Cas 3 : Analyse financière", consigne: "CA=800k€, Achats=320k€, Personnel=280k€, Charges ext.=120k€, Amort.=30k€. Calculez marge brute, VA, EBE, résultat.", reponseAttendue: "Marge brute=480k€ (60%), VA=360k€, EBE=80k€, Résultat exploitation=50k€." },
    { titre: "Cas 4 : Recrutement", consigne: "Recrutez un commercial. Fiche de poste, processus et parcours d'intégration 3 mois.", reponseAttendue: "Fiche de poste, processus multi-canal, entretien structuré, intégration : formation produit, accompagnement terrain, bilan période d'essai." },
  ],
  competences: ["Pilotage stratégie commerciale", "Management d'équipe", "Gestion budgétaire et financière", "Analyse comptable", "GRH", "Conduite de projet", "Communication managériale", "Relation client", "Droit du travail", "Pilotage par indicateurs"],
  appreciations: [
    "Excellente capacité d'analyse financière et de pilotage. Leadership naturel dans les travaux de groupe.",
    "Bonne maîtrise du management et de la gestion. PAC bien structuré. Progression notable en analyse financière.",
    "Très bonne implication. Compétences RH solides. Doit approfondir les ratios financiers.",
    "Niveau satisfaisant. Gestion de projet bien maîtrisée. Cas pratiques de management bien traités.",
    "Stagiaire motivé(e) et rigoureux(se). Business plan de qualité professionnelle.",
    "Bonne progression. Gestion de trésorerie et pilotage budgétaire bien compris.",
  ],
};

// ===== ASSISTANT DE DIRECTION =====
EVAL_CONTENT["Assistant de Direction"] = {
  qcmPositionnement: [
    { question: "Quels sont les 4 quadrants de la matrice d'Eisenhower ?", options: ["Important/Urgent, Important/Non urgent, Non important/Urgent, Non important/Non urgent", "Stratégique/Opérationnel, Court/Long terme", "Prioritaire/Secondaire/Tertiaire/Optionnel", "Planifier/Organiser/Diriger/Contrôler"], correctIndex: 0 },
    { question: "Que signifie GED ?", options: ["Gestion des Effectifs", "Gestion Électronique des Documents", "Guide d'Évaluation", "Gestion des Emplois"], correctIndex: 1 },
    { question: "Durée légale de conservation des factures ?", options: ["5 ans", "10 ans", "3 ans", "30 ans"], correctIndex: 1 },
    { question: "Quel outil planifie visuellement un projet ?", options: ["La matrice SWOT", "Le diagramme de Gantt", "L'organigramme", "Le PERT"], correctIndex: 1 },
    { question: "Formule de politesse appropriée en courrier formel ?", options: ["Cordialement", "Veuillez agréer l'expression de mes salutations distinguées", "À bientôt", "Bien à vous"], correctIndex: 1 },
    { question: "Que signifie RGPD ?", options: ["Planification Documentaire", "Protection des Données", "Personnel et Droits", "Procédures Documentaires"], correctIndex: 1 },
    { question: "Logiciel pour gestion d'agendas partagés ?", options: ["Excel", "Outlook", "PowerPoint", "Word"], correctIndex: 1 },
    { question: "Qu'est-ce qu'une note de synthèse ?", options: ["Note de service", "Résumé structuré d'un dossier complexe", "Note d'information", "Mémorandum"], correctIndex: 1 },
    { question: "Rôle principal d'un(e) assistant(e) de direction ?", options: ["Remplacer le directeur", "Faciliter les décisions et organiser le quotidien", "Gérer la comptabilité", "Recruter"], correctIndex: 1 },
    { question: "Méthode de gestion du temps efficace ?", options: ["AIDA", "NERAC", "SONCAS", "QQOQCP"], correctIndex: 1 },
  ],
  qcmFinal: [
    { question: "Étapes d'organisation d'une réunion ?", options: ["OJ → Convocations → Salle → Dossier → Notes → CR → Suivi", "Invitation → Discussion → Conclusion", "Planning → Exécution → Contrôle", "Brief → Validation → Envoi"], correctIndex: 0 },
    { question: "Comment rédiger un CR de réunion efficace ?", options: ["Retranscrire mot à mot", "Structurer par thème avec décisions et actions", "Résumé libre de 2 lignes", "Enregistrer l'audio"], correctIndex: 1 },
    { question: "Différence entre PV et compte rendu ?", options: ["Le PV est juridiquement engageant, le CR informatif", "Le PV est plus court", "Le CR est obligatoire", "Aucune différence"], correctIndex: 0 },
    { question: "Comment gérer un interlocuteur agressif ?", options: ["Raccrocher", "Écouter, reformuler, proposer une solution", "Transférer sans prévenir", "Ignorer"], correctIndex: 1 },
    { question: "Qu'est-ce qu'un rétro-planning ?", options: ["Un planning qui part de la fin", "Un planning de vacances", "Un historique", "Un plan de sauvegarde"], correctIndex: 0 },
    { question: "Règle des 2 minutes ?", options: ["Pause toutes les 2 min", "Si <2 min, faire immédiatement", "Réunions de 2 min", "Emails en 2 min"], correctIndex: 1 },
    { question: "Organisation d'un déplacement ?", options: ["Transport → Hébergement → Ordre de mission → Notes de frais", "Acheter un billet", "Demander au directeur", "Appeler l'agence"], correctIndex: 0 },
    { question: "Outil collaboratif pour le partage de docs ?", options: ["Fax", "SharePoint / Google Drive", "Courrier postal", "Photocopieur"], correctIndex: 1 },
    { question: "Contenu d'un ordre du jour ?", options: ["Thèmes, temps alloué, intervenants, documents à préparer", "Date et heure uniquement", "CR de la précédente", "Coordonnées des participants"], correctIndex: 0 },
    { question: "Qu'est-ce que le time blocking ?", options: ["Bloquer des sites web", "Bloquer des créneaux dédiés dans l'agenda", "Limiter le temps de pause", "Un logiciel de gestion"], correctIndex: 1 },
  ],
  exercices: [
    { titre: "Cas 1 : Organisation d'un séminaire", consigne: "Organisez un séminaire de 2 jours pour 30 personnes. Rétro-planning, budget et logistique.", reponseAttendue: "Rétro-planning J-60 à J+7. Budget : salle 2000€, restauration 3000€, hébergement 4500€, transport 1500€. Documents : programme, convocations, évaluation." },
    { titre: "Cas 2 : Note de synthèse", consigne: "Rédigez une note de synthèse sur la mise en place du télétravail (points clés, avantages/inconvénients, recommandations).", reponseAttendue: "Contexte, cadre juridique (ANI 2020), avantages (productivité, bien-être), risques (isolement, sécurité IT), recommandations (2j/semaine, charte, formation managers)." },
    { titre: "Cas 3 : Gestion d'agendas conflictuels", consigne: "3 RDV au même moment : client, CODIR, entretien RH. Proposez un arbitrage.", reponseAttendue: "Client prioritaire (enjeu commercial), CODIR décalé à 16h, entretien reporté au lendemain. Informer et confirmer les nouveaux créneaux." },
    { titre: "Cas 4 : Système de veille", consigne: "Mettez en place un système de veille pour votre directeur.", reponseAttendue: "Sources : presse, newsletters, LinkedIn. Outils : Google Alerts, Feedly, Notion. Format revue de presse : titre, résumé, impact. Diffusion hebdomadaire." },
  ],
  competences: ["Gestion de l'agenda et des priorités", "Communication écrite", "Communication orale et accueil", "Organisation de réunions", "Rédaction de CR et notes", "Classement et archivage (GED)", "Gestion des déplacements", "Outils bureautiques avancés", "Veille informationnelle", "Coordination de projets"],
  appreciations: [
    "Excellente organisation et rigueur. CR clairs et structurés. Parfaite maîtrise des outils bureautiques.",
    "Bonne progression en rédaction. Organisation des réunions efficace. Veille à approfondir.",
    "Très bonne communication écrite et orale. Gestion des agendas conflictuels bien maîtrisée.",
    "Niveau satisfaisant. Fondamentaux acquis. Gestion de projet et rétro-planning à consolider.",
    "Stagiaire impliqué(e). Notes de synthèse de qualité. Accueil téléphonique irréprochable.",
    "Bonne maîtrise générale. Organisation d'événements efficace. Communication fluide et diplomatique.",
  ],
};

// ===== INFOGRAPHISTE =====
EVAL_CONTENT["Infographiste"] = {
  qcmPositionnement: [
    { question: "Différence vectoriel / bitmap ?", options: ["Vectoriel plus lourd", "Bitmap sans perte", "Vectoriel = courbes mathématiques, bitmap = pixels", "Aucune"], correctIndex: 2 },
    { question: "Mode colorimétrique pour l'impression ?", options: ["RVB", "CMJN", "Pantone uniquement", "HSL"], correctIndex: 1 },
    { question: "Résolution pour l'impression ?", options: ["72 dpi", "150 dpi", "300 dpi", "600 dpi"], correctIndex: 2 },
    { question: "Logiciel Adobe pour la retouche photo ?", options: ["Illustrator", "InDesign", "Photoshop", "Premiere Pro"], correctIndex: 2 },
    { question: "Qu'est-ce que le fond perdu ?", options: ["La zone de texte", "La marge au-delà du format de coupe", "L'espace entre colonnes", "Le dos d'une brochure"], correctIndex: 1 },
    { question: "Couleurs primaires en CMJN ?", options: ["3", "4", "5", "6"], correctIndex: 1 },
    { question: "Outil pour les courbes de Bézier dans Illustrator ?", options: ["Pinceau", "Plume", "Crayon", "Gomme"], correctIndex: 1 },
    { question: "Qu'est-ce qu'une charte graphique ?", options: ["Un contrat", "Les règles d'utilisation de l'identité visuelle", "Un logiciel", "Un type de police"], correctIndex: 1 },
    { question: "Format logo web avec transparence ?", options: ["JPEG", "BMP", "PNG", "TIFF"], correctIndex: 2 },
    { question: "Que signifie PAO ?", options: ["Publication Assistée par Ordinateur", "Programmation Avancée", "Production Automatisée", "Plateforme d'Aide"], correctIndex: 0 },
  ],
  qcmFinal: [
    { question: "Différence Illustrator / Photoshop ?", options: ["Illustrator = vectoriel, Photoshop = bitmap", "Illustrator = photos", "Aucune différence", "Illustrator = mise en page"], correctIndex: 0 },
    { question: "Qu'est-ce que le PDF/X ?", options: ["Format présentation", "Standard d'échange pour l'impression", "Format vidéo", "Logiciel de conversion"], correctIndex: 1 },
    { question: "Couleur complémentaire du rouge ?", options: ["Orange", "Vert", "Violet", "Jaune"], correctIndex: 1 },
    { question: "Qu'est-ce qu'un gabarit InDesign ?", options: ["Modèle de couleur", "Page type réutilisable", "Outil de dessin", "Format d'export"], correctIndex: 1 },
    { question: "Nombre max de polices par projet ?", options: ["1", "2-3", "5-6", "Illimité"], correctIndex: 1 },
    { question: "Que fait le Pathfinder ?", options: ["Dégradés", "Combine/soustrait des formes vectorielles", "Effets photo", "Gère les calques"], correctIndex: 1 },
    { question: "Typographie sans-serif ?", options: ["Avec empattements", "Sans empattements, épurée", "Manuscrite", "Monospace"], correctIndex: 1 },
    { question: "Format vectoriel pour le web ?", options: ["PSD", "TIFF", "SVG", "RAW"], correctIndex: 2 },
    { question: "Droit de cession ?", options: ["Copier librement", "Transfert contractuel des droits d'exploitation", "Modifier sans autorisation", "Abandon du droit moral"], correctIndex: 1 },
    { question: "Qu'est-ce qu'un moodboard ?", options: ["Planning", "Tableau d'inspiration visuelle", "Outil retouche", "Format impression"], correctIndex: 1 },
  ],
  exercices: [
    { titre: "Cas 1 : Création d'un logo", consigne: "Créez le logo d'une boulangerie 'La Mie Dorée'. Brief, 3 pistes graphiques, justification.", reponseAttendue: "Brief (valeurs, cible, concurrents). 3 pistes : épi de blé, calligraphie, pictogramme pain+soleil. Choix justifié, déclinable en monochrome et favicon." },
    { titre: "Cas 2 : Charte graphique", consigne: "Élaborez la charte graphique d'une start-up 'NovaTech'.", reponseAttendue: "Couleurs : bleu nuit #1A2E4A, orange #FF6B35, gris #F5F5F5. Typos : Poppins Bold + Inter Regular. Logo : zone protection, taille min, versions. Applications." },
    { titre: "Cas 3 : Maquette InDesign", consigne: "Maquettez un catalogue de 8 pages pour une marque de vêtements.", reponseAttendue: "Format A4, fond perdu 3mm, grille 3 colonnes, gabarits (couverture, produit, texte), styles de paragraphe, nuancier." },
    { titre: "Cas 4 : Retouche photo", consigne: "Décrivez le workflow de retouche de 5 photos produit sous Photoshop.", reponseAttendue: "Analyse, développement RAW, correction niveaux/courbes, détourage, retouche tampon, harmonisation, export 300dpi + 72dpi." },
  ],
  competences: ["Composition et design graphique", "Couleur et typographie", "Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Logos et identité visuelle", "Charte graphique", "Prépresse", "Gestion de projet créatif", "Droit d'auteur"],
  appreciations: [
    "Excellente créativité et maîtrise technique Adobe. Portfolio professionnel. Sens aigu de la composition.",
    "Bonne progression sur Illustrator et InDesign. Logos originaux. Prépresse à approfondir.",
    "Très bon sens esthétique. Retouche photo maîtrisée. Chartes graphiques complètes.",
    "Niveau satisfaisant. Fondamentaux acquis. Créativité bien exprimée dans les exercices de logo.",
    "Stagiaire motivé(e) et créatif(ve). Maquette InDesign professionnelle.",
    "Bonne maîtrise de la suite Adobe. Typographie et couleur bien intégrées.",
  ],
};

// ===== RESTAURATION =====
EVAL_CONTENT["Restauration"] = {
  qcmPositionnement: [
    { question: "Principes de la méthode HACCP ?", options: ["3", "5", "7", "10"], correctIndex: 2 },
    { question: "Température de la zone de danger ?", options: ["0 à 3°C", "3 à 63°C", "63 à 100°C", "< 0°C"], correctIndex: 1 },
    { question: "Que signifie FIFO ?", options: ["First In, First Out", "Food Inspection For Operators", "Formation Initiale", "Fiches d'Inspection"], correctIndex: 0 },
    { question: "Allergènes à déclaration obligatoire ?", options: ["8", "10", "14", "20"], correctIndex: 2 },
    { question: "Qu'est-ce que la marche en avant ?", options: ["Exercice de gym", "Progression du sale vers le propre", "Mode de cuisson", "Type de service"], correctIndex: 1 },
    { question: "Température minimale de cuisson à cœur ?", options: ["45°C", "55°C", "63°C", "75°C"], correctIndex: 2 },
    { question: "Qu'est-ce qu'une brunoise ?", options: ["Sauce", "Dés très fins (1-2 mm)", "Type de cuisson", "Dessert"], correctIndex: 1 },
    { question: "Document pour la traçabilité ?", options: ["Le menu", "La fiche technique", "Le bon de livraison avec lots", "Le planning"], correctIndex: 2 },
    { question: "Tenue du personnel en cuisine ?", options: ["Tenue de ville", "Charlotte, tablier, chaussures de sécurité", "Uniquement tablier", "Tenue libre"], correctIndex: 1 },
    { question: "Les 5 sauces mères ?", options: ["Ketchup, moutarde, mayo, BBQ, soja", "Béchamel, velouté, espagnole, tomate, hollandaise", "Vinaigrette, aïoli, pesto, rouille, gribiche", "Beurre blanc, noisette, coulis, jus, fumet"], correctIndex: 1 },
  ],
  qcmFinal: [
    { question: "7 principes HACCP dans l'ordre ?", options: ["Analyse dangers, CCP, limites, surveillance, actions correctives, vérification, documentation", "Nettoyage, cuisson, service, stockage, livraison, contrôle, archivage", "Réception, stockage, préparation, cuisson, dressage, service, plonge", "Hygiène, qualité, traçabilité, formation, contrôle, audit, amélioration"], correctIndex: 0 },
    { question: "Température de conservation surgelés ?", options: ["-10°C", "-15°C", "-18°C", "-25°C"], correctIndex: 2 },
    { question: "Service à l'anglaise ?", options: ["Client se sert", "Serveur sert depuis le plat", "Plats dressés en cuisine", "Service au guéridon"], correctIndex: 1 },
    { question: "Durée max en zone de danger ?", options: ["30 min", "1h", "2h", "4h"], correctIndex: 2 },
    { question: "Qu'est-ce qu'un roux ?", options: ["Salade", "Beurre + farine cuit", "Viande marinée", "Dessert chocolat"], correctIndex: 1 },
    { question: "Lavage fruits et légumes ?", options: ["Eau claire", "Eau + vinaigre ou eau javellisée", "Pas de lavage", "Eau chaude"], correctIndex: 1 },
    { question: "Que signifie DLC ?", options: ["Date Limite de Conservation", "Date Limite de Consommation", "Durée Légale de Commercialisation", "Délai de Conditionnement"], correctIndex: 1 },
    { question: "Plan de nettoyage et désinfection ?", options: ["Plan architectural", "Document quoi/quand/comment nettoyer", "Plan de menus", "Organigramme"], correctIndex: 1 },
    { question: "Certification NF525 ?", options: ["Norme alimentaire", "Obligation certification logiciels de caisse", "Label bio", "Norme incendie"], correctIndex: 1 },
    { question: "Viande fraîche de qualité ?", options: ["Couleur vive, ferme, odeur neutre", "Brune, molle, forte odeur", "Grise, brillante", "Sèche, croûte épaisse"], correctIndex: 0 },
  ],
  exercices: [
    { titre: "Cas 1 : Plan HACCP simplifié", consigne: "Établissez un plan HACCP pour une salade composée froide.", reponseAttendue: "Dangers (biologiques, chimiques, physiques). CCP : réception T°, stockage FIFO, lavage légumes, assemblage <30min zone danger. Documentation : bons, relevés T°, fiches nettoyage." },
    { titre: "Cas 2 : Organisation d'un service", consigne: "Organisez un service de 50 couverts : mise en place, déroulement, nettoyage.", reponseAttendue: "Mise en place (dressage, postes, briefing). Service (accueil, commandes, synchronisation, encaissement). Après-service (débarrassage, nettoyage, comptabilité caisse)." },
    { titre: "Cas 3 : Réception marchandises", consigne: "Décrivez la procédure de contrôle à la réception (viandes, légumes, laitiers).", reponseAttendue: "Conformité bon commande/livraison. T° : viandes ≤3°C, laitiers ≤6°C. DLC, aspect, emballage. Refus si non-conforme. Rangement immédiat. Fiche de réception." },
    { titre: "Cas 4 : Gestion des allergènes", consigne: "Client allergique gluten et fruits à coque. Votre démarche ?", reponseAttendue: "Consulter fiches allergènes, identifier plats compatibles, informer cuisine (étiquette), vérifier contaminations croisées, confirmer au client, documenter." },
  ],
  competences: ["Hygiène et HACCP", "Chaîne du froid/chaud", "Techniques de découpe", "Modes de cuisson", "Préparations froides/chaudes", "Service en salle", "Accueil client", "Gestion de caisse", "Traçabilité et stocks", "Nettoyage et désinfection"],
  appreciations: [
    "Excellente maîtrise de l'hygiène et sécurité alimentaire. Techniques culinaires acquises. Service irréprochable.",
    "Bonne progression. Traçabilité et stocks bien compris. Gestes de découpe en bonne voie.",
    "Très bonne implication en cuisine et en salle. Accueil chaleureux. Protocoles HACCP respectés.",
    "Niveau satisfaisant. Bases culinaires acquises. Service fluide. Cuissons avancées à approfondir.",
    "Stagiaire motivé(e) et ponctuel(le). Travail en équipe apprécié. Allergènes bien maîtrisés.",
    "Bonne polyvalence cuisine/salle. Plan de nettoyage rigoureusement appliqué. Caisse acquise.",
  ],
};

// Map formation intitulé to content key
function getContentKey(intitule: string): string {
  const lower = intitule.toLowerCase();
  if (lower.includes("vtc") || lower.includes("voiture de transport avec chauffeur") || lower.includes("rs5637") || lower.includes("chauffeur vtc")) return "VTC";
  if (lower.includes("ecsr") || lower.includes("enseignant de la conduite") || lower.includes("sécurité routière")) return "ECSR";
  if (lower.includes("vtest") || lower.includes("v-test") || lower.includes("rs6905")) return "VTest";
  // CIP must be checked before generic "social"
  if (lower.includes("conseiller en insertion") || lower.includes("insertion professionnelle") || lower.includes("cip") || lower.includes("rncp37274")) return "CIP";
  // NTC must be checked before generic "commercial"
  if (lower.includes("ntc") || lower.includes("rncp39063") || lower.includes("négociateur technico-commercial") || lower.includes("negociateur technico-commercial")) return "NTC";
  // SAMA / SAMS must be checked BEFORE generic "médico-social" / "social"
  if (lower.includes("sama") || lower.includes("rncp40800") || lower.includes("secrétaire assistant médico-administratif") || lower.includes("secretaire assistant medico-administratif")) return "SAMA";
  if (lower.includes("sams") || lower.includes("rncp36805") || lower.includes("secrétaire assistant médico-social") || lower.includes("secretaire assistant medico-social")) return "SAMS";
  // New formations
  if (lower.includes("responsable de petite") || lower.includes("rpms") || lower.includes("petite et moyenne structure")) return "RPMS";
  if (lower.includes("assistant") && lower.includes("direction")) return "Assistant de Direction";
  if (lower.includes("infographiste") || lower.includes("infographie") || lower.includes("metteur en page")) return "Infographiste";
  if (lower.includes("restauration") || lower.includes("employé polyvalent en restauration")) return "Restauration";
  if (lower.includes("excel")) return "Excel Professionnel";
  if ((lower.includes("anglais") || lower.includes("english")) && (lower.includes("a1") || lower.includes("débutant"))) return "Anglais A1";
  if (lower.includes("anglais")) return "Anglais Professionnel";
  if (lower.includes("informatique") || lower.includes("admin") || lower.includes("réseau") || lower.includes("système")) return "Informatique";
  if (lower.includes("management") || lower.includes("leadership")) return "Management";
  if (lower.includes("digital") || lower.includes("marketing") || lower.includes("seo")) return "Digital Marketing";
  if (lower.includes("initiation word")) return "Initiation Word";
  if (lower.includes("bureautique") || lower.includes("word") || lower.includes("pack office")) return "Bureautique";
  if (lower.includes("esthétique") || lower.includes("cosmétique") || lower.includes("cap")) return "CAP Esthétique";
  if (lower.includes("français") || lower.includes("médico-social") || lower.includes("social")) return "FLE Médico-Social";
  if (lower.includes("intelligence artificielle") || lower.includes("ia générative") || lower.includes("contenus rédactionnels")) return "IA Générative";
  if (lower.includes("massage") || lower.includes("prénatal") || lower.includes("prenatal") || lower.includes("relaxation prénatals")) return "Massage Prénatal";
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
  "Anglais A1": {
    debut: [
      { question: "How do you say 'bonjour' in English?", reponseAttendue: "Hello / Good morning / Good afternoon." },
      { question: "What is your name? Answer in a complete sentence.", reponseAttendue: "My name is [Name]." },
      { question: "How do you spell your last name in English? (Spell each letter)", reponseAttendue: "The student spells their last name using the English alphabet (e.g., D-U-P-O-N-T)." },
      { question: "What are the days of the week in English?", reponseAttendue: "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday." },
      { question: "Count from 1 to 10 in English.", reponseAttendue: "One, two, three, four, five, six, seven, eight, nine, ten." },
      { question: "What colour is the sky?", reponseAttendue: "The sky is blue." },
      { question: "How do you say 'merci beaucoup' in English?", reponseAttendue: "Thank you very much." },
      { question: "Complete: 'I ___ a student.' (am/is/are)", reponseAttendue: "I am a student." },
      { question: "What time is it? (Show a clock at 3:00)", reponseAttendue: "It is three o'clock." },
      { question: "Why do you want to learn English?", reponseAttendue: "Open answer – expected: for work, travel, communication, personal development, etc." },
    ],
    fin: [
      { question: "Introduce yourself in English (name, age, job, city).", reponseAttendue: "My name is [Name]. I am [age] years old. I am a [job]. I live in [city]." },
      { question: "Describe your typical day using at least 5 sentences.", reponseAttendue: "I wake up at 7 o'clock. I have breakfast. I go to work by bus. I work from 9 to 5. I have dinner with my family. I go to bed at 10 o'clock." },
      { question: "Ask 3 questions to a new colleague in English.", reponseAttendue: "What is your name? Where are you from? What is your job? / How long have you been working here?" },
      { question: "Write a short email to say you cannot come to work tomorrow.", reponseAttendue: "Dear [Name], I am writing to inform you that I cannot come to work tomorrow because I am sick. I am sorry for the inconvenience. Best regards, [Name]." },
      { question: "What is the difference between 'this' and 'that'?", reponseAttendue: "'This' is for something close to you. 'That' is for something far from you. Example: This is my pen (here). That is your pen (there)." },
      { question: "Put these words in the correct order: 'like / I / very much / English'", reponseAttendue: "I like English very much." },
      { question: "Translate into English: 'Je travaille dans un bureau. J'aime mon travail.'", reponseAttendue: "I work in an office. I like my job." },
      { question: "Describe the weather today in English.", reponseAttendue: "Today it is sunny/cloudy/rainy. It is warm/cold. The temperature is about [X] degrees." },
      { question: "What did you learn during this English A1 training? (Answer in English)", reponseAttendue: "I learned the alphabet, numbers, colours, days of the week, how to introduce myself, basic grammar (to be, to have), vocabulary for daily life and work, and how to write simple emails." },
      { question: "Name 5 things you can see in an office.", reponseAttendue: "A desk, a chair, a computer, a phone, a printer / a pen / a book / a lamp." },
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
  "Initiation Word": {
    debut: [
      { question: "Avez-vous déjà utilisé un logiciel de traitement de texte ?", reponseAttendue: "Réponse libre : le stagiaire peut mentionner Word, LibreOffice Writer, Google Docs ou indiquer qu'il n'a jamais utilisé de traitement de texte." },
      { question: "À quoi sert Microsoft Word selon vous ?", reponseAttendue: "Microsoft Word est un logiciel de traitement de texte qui permet de créer, modifier et mettre en forme des documents comme des lettres, CV, rapports." },
      { question: "Savez-vous ce qu'est une mise en forme de texte ? Donnez un exemple.", reponseAttendue: "La mise en forme consiste à modifier l'apparence du texte : gras, italique, souligné, changement de police, taille, couleur." },
      { question: "Comment enregistrez-vous habituellement un fichier sur votre ordinateur ?", reponseAttendue: "En utilisant le menu Fichier > Enregistrer ou Enregistrer sous, ou avec le raccourci Ctrl+S." },
      { question: "Qu'attendez-vous de cette formation Initiation Word ?", reponseAttendue: "Réponse libre : le stagiaire exprime ses attentes (apprendre les bases, créer des documents professionnels, être autonome sur Word)." },
    ],
    fin: [
      { question: "Citez trois fonctionnalités de mise en forme que vous avez apprises.", reponseAttendue: "Gras, italique, souligné, changement de police, taille de caractères, couleur du texte, alignement, interligne, listes à puces." },
      { question: "Expliquez les étapes pour insérer et redimensionner une image dans Word.", reponseAttendue: "Onglet Insertion > Images > choisir l'image > Insérer. Pour redimensionner : cliquer sur l'image, utiliser les poignées d'angle en maintenant la touche Maj pour garder les proportions." },
      { question: "Comment préparer un document pour l'impression ?", reponseAttendue: "Vérifier les marges (Mise en page), l'orientation, ajouter en-têtes/pieds de page si nécessaire, utiliser l'aperçu avant impression (Ctrl+P) pour vérifier le rendu." },
      { question: "Quelle est la différence entre Enregistrer et Enregistrer sous ?", reponseAttendue: "Enregistrer sauvegarde le document au même emplacement sous le même nom. Enregistrer sous permet de choisir un nouvel emplacement et/ou un nouveau nom de fichier." },
      { question: "Qu'avez-vous appris pendant cette formation Initiation Word ?", reponseAttendue: "J'ai appris à créer des documents Word, mettre en forme du texte et des paragraphes, insérer des images et tableaux, gérer la mise en page et préparer un document pour l'impression." },
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
      { question: "Connaissez-vous des outils d'IA générative ? Lesquels ?", reponseAttendue: "ChatGPT (OpenAI), Google Gemini, Adobe Firefly, Microsoft Copilot, Claude (Anthropic), Midjourney, Canva IA." },
      { question: "Qu'est-ce qu'un prompt ?", reponseAttendue: "Un prompt est l'instruction ou la consigne que l'on donne à un outil d'IA pour lui indiquer ce que l'on souhaite obtenir comme résultat." },
      { question: "Quels types de contenus peut-on créer avec l'IA générative ?", reponseAttendue: "Des textes (articles, posts, emails, rapports), des images (illustrations, visuels, bannières), du code, des présentations, des traductions." },
      { question: "Que signifie RGPD ?", reponseAttendue: "Règlement Général sur la Protection des Données – cadre européen qui protège les données personnelles des citoyens." },
      { question: "Quels risques identifiez-vous dans l'utilisation de l'IA pour la création de contenus ?", reponseAttendue: "Hallucinations (faits inventés), fuite de données confidentielles, violation du droit d'auteur, contenus biaisés ou discriminants, manque d'originalité." },
      { question: "Savez-vous ce que signifie FALC ?", reponseAttendue: "Facile à Lire et à Comprendre – méthode de rédaction adaptée aux personnes ayant un handicap cognitif, utilisant des phrases courtes et des mots simples." },
      { question: "Avez-vous déjà utilisé un outil d'IA pour créer du contenu ? Décrivez votre expérience.", reponseAttendue: "Réponse ouverte décrivant l'expérience personnelle avec des outils d'IA." },
      { question: "Qu'est-ce que l'IA Act européen ?", reponseAttendue: "Le premier cadre législatif au monde pour encadrer l'utilisation de l'intelligence artificielle, avec des obligations de transparence et une classification par niveau de risque." },
      { question: "Quels sont vos objectifs pour cette formation ?", reponseAttendue: "Réponse ouverte : maîtriser les outils IA, créer des contenus professionnels inclusifs, comprendre le cadre juridique (IA Act, RGPD), etc." },
    ],
    fin: [
      { question: "Décrivez les 5 composantes d'un prompt structuré (C2).", reponseAttendue: "1. Rôle (qui est l'IA), 2. Cible (à qui s'adresse le contenu), 3. Objectif (la tâche à réaliser), 4. Contexte (le cadre), 5. Format (format de sortie attendu)." },
      { question: "Comment élaborer un plan stratégique d'implémentation de l'IA Générative (C1) ?", reponseAttendue: "Diagnostic du poste → Identification des tâches optimisables → Sélection et justification des outils → Planification progressive → Formation de l'équipe → Évaluation avec indicateurs." },
      { question: "Quelles sont les bonnes pratiques pour protéger les données confidentielles dans l'IA (C3) ?", reponseAttendue: "Ne jamais saisir de données personnelles, anonymiser les prompts, utiliser les versions professionnelles, désactiver l'historique, paramétrer la confidentialité." },
      { question: "Comment adapter un contenu pour une personne en situation de handicap cognitif (C4) ?", reponseAttendue: "Utiliser le FALC : phrases courtes (15 mots max), mots simples du quotidien, une idée par phrase, structure logique avec titres clairs, mise en page aérée, pictogrammes." },
      { question: "Décrivez les 3 types d'accessibilité à prendre en compte (C4).", reponseAttendue: "Visuel : textes alternatifs, lecteurs d'écran, versions audio. Auditif : transcription écrite, sous-titrage, alternatives visuelles. Cognitif : FALC, langage simple, structure hiérarchisée." },
      { question: "Quel est le workflow d'optimisation d'un contenu IA (C5) ?", reponseAttendue: "1. Analyse du contenu initial et identification des faiblesses. 2. Rédaction d'un prompt d'optimisation avec critères imposés (ton, handicap). 3. Validation du contenu amélioré." },
      { question: "Quels sont les niveaux de risque définis par l'IA Act (C6) ?", reponseAttendue: "Inacceptable (interdit), Élevé (conformité stricte), Limité (transparence obligatoire – ex: chatbots), Minimal (aucune obligation)." },
      { question: "Comment corriger un prompt présentant des risques de violation de données (C3) ?", reponseAttendue: "Identifier les données sensibles, remplacer par des données fictives ou génériques, supprimer les informations personnelles, justifier les corrections apportées." },
      { question: "Rédigez une mention appropriée pour un contenu créé avec l'aide de l'IA.", reponseAttendue: "'Contenu rédigé avec l'assistance de l'intelligence artificielle et vérifié par [Nom, Fonction]' ou 'Visuel généré par IA – illustration non contractuelle'." },
      { question: "Qu'avez-vous appris pendant cette formation ?", reponseAttendue: "J'ai appris la stratégie d'implémentation IA (C1), le prompt engineering (C2), la protection des données (C3), la production de contenus inclusifs (C4), l'optimisation des contenus (C5) et la conformité IA Act/RGPD (C6)." },
    ],
  },
  "Massage Prénatal": {
    debut: [
      { question: "Qu'est-ce que le massage prénatal ?", reponseAttendue: "Le massage prénatal est une technique de massage adaptée aux femmes enceintes, visant à soulager les tensions musculaires, favoriser la relaxation et accompagner les transformations corporelles de la grossesse." },
      { question: "Quelles sont les principales contre-indications au massage prénatal ?", reponseAttendue: "Grossesse à risque, menace d'accouchement prématuré, pré-éclampsie, placenta praevia, saignements, fièvre, contractions régulières avant terme." },
      { question: "Pourquoi est-il déconseillé de masser une femme enceinte au 1er trimestre ?", reponseAttendue: "Le premier trimestre présente un risque accru de fausse couche. Par précaution, on attend généralement la fin du 1er trimestre pour commencer les massages." },
      { question: "Quelles zones du corps sont les plus sollicitées pendant la grossesse ?", reponseAttendue: "Le bas du dos (lombaires), le bassin, les jambes (rétention d'eau, jambes lourdes), les épaules et la nuque (tensions posturales)." },
      { question: "Quelle est la différence entre un massage relaxant et un massage prénatal ?", reponseAttendue: "Le massage prénatal est spécifiquement adapté à la grossesse : positions, pressions, zones à éviter, prise en compte des modifications corporelles et des contre-indications spécifiques." },
      { question: "Qu'est-ce que le périnée et pourquoi est-il important pendant la grossesse ?", reponseAttendue: "Le périnée est l'ensemble des muscles du plancher pelvien qui soutient les organes. Pendant la grossesse, il subit une pression accrue et doit être préparé pour l'accouchement." },
      { question: "Quelles huiles sont adaptées au massage prénatal ?", reponseAttendue: "Huiles végétales neutres : amande douce, jojoba, argan. Éviter les huiles essentielles sans avis médical, en particulier celles à base de sauge, romarin ou menthe poivrée." },
      { question: "Décrivez la position de décubitus latéral.", reponseAttendue: "Position allongée sur le côté (généralement gauche), avec un coussin sous la tête, un entre les genoux et un sous le ventre pour un soutien optimal." },
      { question: "Qu'est-ce que la respiration abdominale ?", reponseAttendue: "C'est une respiration profonde où l'on gonfle le ventre à l'inspiration et on le relâche à l'expiration, permettant une détente profonde et une meilleure oxygénation." },
      { question: "Quels sont vos objectifs pour cette formation en massage prénatal ?", reponseAttendue: "Réponse ouverte : apprendre les techniques spécifiques au massage prénatal, comprendre l'anatomie de la femme enceinte, savoir adapter les gestes, accompagner le bien-être maternel." },
    ],
    fin: [
      { question: "Décrivez le protocole complet d'une séance de massage prénatal.", reponseAttendue: "1. Accueil et anamnèse (vérification des contre-indications). 2. Installation en décubitus latéral. 3. Recentrage et respiration. 4. Massage du dos. 5. Massage des jambes. 6. Exercices de conscience du bassin. 7. Retour au calme progressif. 8. Conseils post-séance." },
      { question: "Quelles sont les techniques de drainage adaptées aux jambes lourdes de la grossesse ?", reponseAttendue: "Effleurage ascendant léger des chevilles vers les cuisses, mouvements lents et réguliers, évitement des varices et des zones sensibles (malléole interne), surélévation légère des pieds." },
      { question: "Comment réaliser un exercice de prise de conscience du bassin ?", reponseAttendue: "Guidance verbale pour amener la conscience sur le bassin, mobilisations douces (antéversion/rétroversion, cercles, bercements), coordination avec la respiration, travail de relâchement du périnée." },
      { question: "Quels sont les bienfaits du massage prénatal sur le plan psychologique ?", reponseAttendue: "Réduction du stress et de l'anxiété, amélioration du sommeil, connexion mère-bébé, sentiment de bien-être et de prise en charge, préparation mentale à l'accouchement." },
      { question: "Comment adapter votre pratique au 3ème trimestre de grossesse ?", reponseAttendue: "Pressions plus douces, durée de séance éventuellement réduite, position exclusivement latérale, attention accrue aux signes de fatigue, pause fréquentes, évitement total des points d'acupression stimulants." },
      { question: "Quels points d'acupression faut-il impérativement éviter chez la femme enceinte ?", reponseAttendue: "Le point Hegu (entre pouce et index), le point Sanyinjiao (malléole interne, 4 doigts au-dessus), le point Jianjing (trapèze supérieur). Ces points peuvent stimuler les contractions." },
      { question: "Décrivez les techniques de recentrage en début de séance.", reponseAttendue: "Installation confortable, respiration guidée en 4 temps (inspiration 4s, pause 2s, expiration 6s), balayage corporel progressif de la tête aux pieds, invitation à la connexion avec le bébé." },
      { question: "Quels conseils d'auto-massage donner à une femme enceinte ?", reponseAttendue: "Auto-massage du bas du dos avec une balle contre un mur, massage des pieds, étirements doux du psoas, mobilisations du bassin sur ballon, respiration quotidienne, hydratation régulière." },
      { question: "Comment gérer une situation d'inconfort pendant la séance ?", reponseAttendue: "Communiquer en continu, observer les réactions non verbales, ajuster immédiatement la position ou la pression, proposer des pauses, arrêter si nécessaire, orienter vers un professionnel de santé si besoin." },
      { question: "Qu'avez-vous appris pendant cette formation en massage prénatal ?", reponseAttendue: "J'ai appris les techniques de recentrage et respiration, le massage du dos en décubitus latéral, le drainage des jambes, la prise de conscience du bassin, les contre-indications et les protocoles d'auto-massage à transmettre." },
    ],
  },
  "VTest": {
    debut: [
      { question: "In which professional situations do you currently use English?", reponseAttendue: "I use English for emails with international clients, reading technical documentation, and participating in conference calls with colleagues abroad." },
      { question: "What are your main difficulties when communicating in English at work?", reponseAttendue: "My main difficulties are understanding native speakers on the phone and expressing complex ideas fluently during meetings and presentations." },
      { question: "Which of the four skills (Reading, Listening, Writing, Speaking) do you find most challenging?", reponseAttendue: "I find Speaking the most challenging because I need to think in real time and I lack confidence in my pronunciation and fluency." },
      { question: "Have you ever taken a language certification test before? If so, which one?", reponseAttendue: "Yes, I took the TOEIC two years ago and scored 650. I also did a Cambridge placement test at B1 level." },
      { question: "What is your target CECRL level after this training?", reponseAttendue: "I would like to reach at least B2 level to participate confidently in international meetings and write detailed professional reports." },
      { question: "Describe a recent situation where you needed English at work.", reponseAttendue: "Last month, I had to present our quarterly results to the international management team via video conference. I struggled with technical vocabulary and fielding questions." },
      { question: "What type of professional documents do you read or write in English?", reponseAttendue: "I regularly read market reports and industry articles, and I write emails, meeting minutes, and commercial proposals in English." },
      { question: "How comfortable are you with writing a formal business email in English?", reponseAttendue: "I can write basic emails but I'm not confident with the formal register, appropriate closings, and I sometimes mix up false friends like 'actually' and 'eventually'." },
      { question: "What do you know about the VTest Business English certification?", reponseAttendue: "I know it evaluates 4 skills (Reading, Listening, Writing, Speaking) and provides a CECRL level from A2 to C2. It is taken online on the VTest platform." },
      { question: "What specific vocabulary areas do you need to develop for your job?", reponseAttendue: "I need to develop vocabulary related to finance (revenue, profit margin, ROI), project management (milestones, deliverables), and negotiation (compromise, terms and conditions)." },
    ],
    fin: [
      { question: "How has your confidence in using English professionally evolved during this training?", reponseAttendue: "My confidence has improved significantly. I now feel comfortable participating in meetings, writing formal emails, and giving short presentations in English." },
      { question: "Which of the four VTest skills (Reading, Listening, Writing, Speaking) has improved the most?", reponseAttendue: "My Speaking skills have improved the most. The role-play exercises and presentation practice helped me become more fluent and confident when expressing ideas orally." },
      { question: "Write a short professional email to confirm a meeting with a client.", reponseAttendue: "Dear Mr. Johnson, I am writing to confirm our meeting scheduled for Tuesday, March 15th at 10:00 AM. The agenda will cover the Q2 budget review. Please confirm at your earliest convenience. Best regards." },
      { question: "Describe how you would handle a business negotiation in English now.", reponseAttendue: "I would prepare my arguments in advance, use softening language like 'I was wondering if...', propose compromises using conditional structures, and seek a win-win outcome." },
      { question: "Explain the difference between 'affect' and 'effect', and give a professional example.", reponseAttendue: "Affect is a verb meaning to influence: 'The budget cuts will affect the project timeline.' Effect is a noun meaning the result: 'The effect of the new strategy was positive.'" },
      { question: "What strategies will you use to continue improving your English after this training?", reponseAttendue: "I plan to listen to business podcasts daily, read industry articles in English, practice speaking with native-speaking colleagues, and use apps like Babbel for vocabulary review." },
      { question: "How do you feel about taking the VTest certification exam?", reponseAttendue: "I feel well-prepared thanks to the practice tests and exam strategies we covered. I am confident I can achieve at least a B2 level across all four skills." },
      { question: "Summarize the key grammar structures you learned for professional writing.", reponseAttendue: "I learned to use the Present Perfect for results, passive voice for formal reports, conditional structures for negotiations, and modal verbs (could, would, should) for diplomatic requests." },
      { question: "What are the main false friends you will avoid in professional communication?", reponseAttendue: "Actually (en fait, not actuellement), eventually (finalement, not éventuellement), to attend (assister à, not attendre), delay (retard, not délai), resume (CV, not résumé)." },
      { question: "What have you learned during this VTest Business English training?", reponseAttendue: "I learned professional email writing, meeting vocabulary, presentation techniques, negotiation strategies, grammar for business contexts, and exam preparation for the 4 VTest skills." },
    ],
  },
};

QUESTIONS_OUVERTES["SAMA"] = {
  debut: [
    { question: "Avez-vous déjà travaillé dans un environnement médical ou médico-administratif ?", reponseAttendue: "Oui/Non avec description de l'expérience : type de structure (hôpital, clinique, cabinet), durée et fonctions exercées." },
    { question: "Que signifie pour vous le secret médical ?", reponseAttendue: "Le secret médical est l'obligation de confidentialité sur toutes les informations relatives au patient : état de santé, traitements, vie privée." },
    { question: "Quels logiciels bureautiques ou médicaux connaissez-vous ?", reponseAttendue: "Word, Excel, Doctolib, logiciels de gestion de cabinet, DPI, messagerie sécurisée de santé." },
    { question: "Comment accueillez-vous une personne en situation de stress ou d'angoisse ?", reponseAttendue: "Écoute active, ton calme et rassurant, reformulation, proposer de l'aide concrète, orienter si nécessaire." },
    { question: "Que savez-vous de la carte Vitale et de son utilisation ?", reponseAttendue: "La carte Vitale contient les informations d'assurance maladie du patient et permet la télétransmission des feuilles de soins à la CPAM." },
    { question: "Pourquoi avez-vous choisi la formation de secrétaire assistant médico-administratif ?", reponseAttendue: "Motivation personnelle liée au secteur médical, envie d'aider les patients, intérêt pour l'organisation administrative." },
    { question: "Connaissez-vous la différence entre un hôpital public et une clinique privée ?", reponseAttendue: "L'hôpital public est géré par l'État et accueille tous les patients. La clinique privée est un établissement à but lucratif ou non lucratif avec des tarifs pouvant différer." },
    { question: "Qu'est-ce qu'un dossier patient selon vous ?", reponseAttendue: "Le dossier patient regroupe toutes les informations administratives et médicales d'un patient : identité, antécédents, examens, comptes rendus, prescriptions." },
    { question: "Comment organisez-vous votre travail au quotidien ?", reponseAttendue: "Planification des tâches par priorité, utilisation d'un agenda, gestion des urgences, suivi des dossiers en cours." },
    { question: "Que feriez-vous si un patient vous demande des informations sur son diagnostic ?", reponseAttendue: "Je l'orienterais vers le médecin car le secrétaire médical ne peut pas communiquer d'informations médicales au patient." },
  ],
  fin: [
    { question: "Décrivez la procédure d'accueil d'un nouveau patient dans une structure médicale.", reponseAttendue: "Vérification d'identité (identitovigilance), collecte des documents (carte Vitale, mutuelle, ordonnance), création du dossier administratif, orientation vers le service concerné." },
    { question: "Expliquez le processus de facturation d'un acte médical.", reponseAttendue: "Saisie de l'acte avec le code CCAM/NGAP, vérification des droits du patient, application du tiers payant si applicable, télétransmission à la CPAM et à la mutuelle." },
    { question: "Quelles sont les règles de conservation d'un dossier médical ?", reponseAttendue: "Conservation de 20 ans minimum à compter de la dernière consultation, 28 ans pour les mineurs. Archivage sécurisé conforme au RGPD." },
    { question: "Comment gérez-vous un conflit entre un patient et un professionnel de santé ?", reponseAttendue: "Rester neutre, écouter les deux parties, proposer une médiation, orienter si besoin vers le service des relations avec les usagers." },
    { question: "Décrivez les étapes de transcription d'un compte rendu médical.", reponseAttendue: "Écoute de la dictée, transcription avec mise en forme normée, vérification de la terminologie médicale, relecture, transmission au médecin pour validation." },
    { question: "Quels sont vos acquis les plus importants de cette formation ?", reponseAttendue: "Maîtrise de la terminologie médicale, gestion du DPI, accueil patient, facturation et télétransmission, respect du cadre réglementaire." },
    { question: "Comment utilisez-vous la messagerie sécurisée de santé (MSSanté) ?", reponseAttendue: "Connexion via identifiant professionnel, envoi de documents médicaux uniquement via MSSanté, vérification du destinataire dans l'annuaire, conservation des traces d'envoi." },
    { question: "Expliquez la procédure de communication d'un dossier médical à un ayant droit.", reponseAttendue: "Vérification de la qualité d'ayant droit (acte de décès, filiation), vérification de l'absence d'opposition du patient de son vivant, communication des éléments hors notes personnelles du médecin, respect du délai de 8 jours." },
    { question: "Qu'est-ce que le parcours de soins coordonnés et quel est son impact sur la facturation ?", reponseAttendue: "Le parcours de soins coordonnés passe par le médecin traitant qui oriente vers les spécialistes. Hors parcours, le remboursement est réduit (30% au lieu de 70%)." },
    { question: "Qu'avez-vous appris pendant cette formation ?", reponseAttendue: "J'ai appris l'accueil patient, la gestion administrative et financière, la transcription médicale, la terminologie, le cadre réglementaire, la gestion du DPI et l'utilisation des outils numériques de santé." },
  ],
};

QUESTIONS_OUVERTES["SAMS"] = {
  debut: QUESTIONS_OUVERTES["SAMA"].debut,
  fin: QUESTIONS_OUVERTES["SAMA"].fin,
};

QUESTIONS_OUVERTES["NTC"] = {
  debut: [
    { question: "Avez-vous déjà exercé une activité commerciale ou de prospection ?", reponseAttendue: "Oui/Non avec description : type de produits/services vendus, secteur B2B ou B2C, durée d'expérience." },
    { question: "Que signifie pour vous le terme 'négociation technico-commerciale' ?", reponseAttendue: "C'est une démarche de vente qui combine la maîtrise technique des produits/services avec des compétences de négociation pour proposer des solutions adaptées aux besoins du client professionnel." },
    { question: "Quels outils numériques avez-vous déjà utilisés dans un contexte professionnel ?", reponseAttendue: "Pack Office (Word, Excel, PowerPoint), CRM (Salesforce, HubSpot), réseaux sociaux professionnels (LinkedIn), outils de messagerie." },
    { question: "Connaissez-vous la différence entre la vente B2B et B2C ?", reponseAttendue: "B2B = vente entre entreprises, cycles de vente plus longs, interlocuteurs multiples, décision collective. B2C = vente aux particuliers, cycle court, décision individuelle." },
    { question: "Que savez-vous de la veille commerciale ?", reponseAttendue: "La veille commerciale consiste à surveiller en continu l'environnement concurrentiel, les évolutions du marché, les tendances et les changements réglementaires pour adapter sa stratégie." },
    { question: "Comment définiriez-vous un bon argumentaire de vente ?", reponseAttendue: "Un argumentaire structuré qui met en avant les caractéristiques, avantages et preuves (CAP) du produit/service en réponse aux besoins identifiés du client." },
    { question: "Qu'est-ce qu'un CRM selon vous ?", reponseAttendue: "Un CRM (Customer Relationship Management) est un outil de gestion de la relation client qui permet de centraliser les données clients, suivre les interactions et piloter l'activité commerciale." },
    { question: "Pourquoi avez-vous choisi la formation de Négociateur Technico-Commercial ?", reponseAttendue: "Motivation liée au commerce B2B, envie de développer des compétences en négociation, intérêt pour la dimension technique et stratégique de la vente." },
    { question: "Que savez-vous du développement durable dans le contexte commercial ?", reponseAttendue: "Intégration de la RSE dans la démarche commerciale : économie circulaire, réduction de l'empreinte carbone, loi AGEC, valorisation des produits éco-responsables." },
    { question: "Comment organisez-vous votre travail et vos priorités ?", reponseAttendue: "Planification des tâches par importance/urgence, utilisation d'un agenda, suivi des objectifs, gestion du temps entre prospection, rendez-vous et administratif." },
  ],
  fin: [
    { question: "Décrivez votre démarche complète de prospection d'un nouveau secteur.", reponseAttendue: "Analyse du marché cible, création de personas, constitution d'un fichier qualifié, approche multicanale (phoning, emailing, LinkedIn, terrain), qualification des leads, prise de RDV, suivi CRM, analyse des résultats." },
    { question: "Comment concevez-vous une proposition technique et commerciale personnalisée ?", reponseAttendue: "Analyse approfondie des besoins du prospect, étude de l'offre concurrente, conception de la solution technique adaptée, chiffrage détaillé, argumentaire CAP, anticipation des objections, présentation avec supports adaptés." },
    { question: "Expliquez la méthode SONCAS et son utilisation en négociation.", reponseAttendue: "SONCAS identifie les motivations d'achat : Sécurité, Orgueil, Nouveauté, Confort, Argent, Sympathie. On adapte l'argumentaire en fonction du profil motivationnel dominant du client." },
    { question: "Comment analysez-vous vos performances commerciales et quelles actions correctives proposez-vous ?", reponseAttendue: "Suivi des KPIs (CA, nb RDV, taux de conversion, pipe), analyse des écarts vs objectifs, identification des causes, proposition d'actions correctives (revoir la segmentation, renforcer le suivi, ajuster l'argumentaire), reporting à la hiérarchie." },
    { question: "Qu'est-ce que le social selling et comment l'utilisez-vous ?", reponseAttendue: "Utilisation des réseaux sociaux (LinkedIn principalement) pour prospecter, partager du contenu à valeur ajoutée, interagir avec les prospects, développer son personal branding et sa crédibilité d'expert." },
    { question: "Comment intégrez-vous la dimension RSE dans votre activité commerciale ?", reponseAttendue: "Veille sur les technologies vertes, intégration des arguments éco-responsables dans les propositions, sensibilisation des clients aux impacts environnementaux, conformité loi AGEC et loi Climat, valorisation de l'économie circulaire." },
    { question: "Décrivez une situation de négociation complexe et comment vous la gérez.", reponseAttendue: "Préparation (analyse du client, arguments, concessions, points non négociables), écoute active, reformulation, traitement des objections (prix, délai, concurrence), technique de closing, suivi post-négociation." },
    { question: "Comment gérez-vous la fidélisation d'un client stratégique ?", reponseAttendue: "Communication régulière et transparente, point trimestriel, anticipation des besoins, propositions d'upselling/cross-selling, gestion proactive des réclamations, enquêtes de satisfaction, programme de fidélisation." },
    { question: "Quels sont les principaux indicateurs que vous suivez dans votre CRM ?", reponseAttendue: "Nombre de contacts/prospects, taux de prise de RDV, taux de conversion, CA réalisé vs objectif, pipe commercial, durée du cycle de vente, taux de fidélisation, NPS." },
    { question: "Qu'avez-vous appris pendant cette formation de NTC ?", reponseAttendue: "J'ai appris à structurer une démarche de prospection, concevoir des propositions commerciales personnalisées, maîtriser les techniques de négociation, analyser mes performances via les KPIs, utiliser un CRM, intégrer la RSE et gérer un portefeuille client B2B." },
  ],
};
QUESTIONS_OUVERTES["RPMS"] = {
  debut: [
    { question: "Avez-vous déjà exercé des fonctions de management ou d'encadrement d'équipe ?", reponseAttendue: "Oui/Non avec description : taille de l'équipe, secteur d'activité, durée, responsabilités (planning, recrutement, évaluation)." },
    { question: "Que signifie pour vous 'piloter une petite ou moyenne structure' ?", reponseAttendue: "C'est assurer la gestion globale d'une entreprise de taille PME : stratégie commerciale, gestion financière, management des équipes, suivi des indicateurs de performance et développement de l'activité." },
    { question: "Connaissez-vous la différence entre un bilan et un compte de résultat ?", reponseAttendue: "Le bilan présente le patrimoine de l'entreprise (actif/passif) à une date donnée. Le compte de résultat retrace les produits et charges sur un exercice pour déterminer le résultat (bénéfice ou perte)." },
    { question: "Qu'est-ce que le BFR (Besoin en Fonds de Roulement) ?", reponseAttendue: "Le BFR représente le décalage de trésorerie entre les décaissements (achats, salaires) et les encaissements (ventes). BFR = Stocks + Créances clients − Dettes fournisseurs." },
    { question: "Citez 3 styles de management que vous connaissez.", reponseAttendue: "Directif (décisions unilatérales), participatif (implication de l'équipe dans les décisions), délégatif (autonomie maximale). On peut aussi citer le style persuasif (expliquer et convaincre)." },
    { question: "Quels outils de gestion avez-vous déjà utilisés ?", reponseAttendue: "Tableurs (Excel, Google Sheets), logiciels de comptabilité (Sage, Ciel), CRM, outils de gestion de projet (Trello, Asana), ERP." },
    { question: "Comment définiriez-vous une analyse SWOT ?", reponseAttendue: "C'est un outil de diagnostic stratégique qui identifie les Forces (Strengths), Faiblesses (Weaknesses), Opportunités (Opportunities) et Menaces (Threats) d'une entreprise." },
    { question: "Quelle est la fréquence de l'entretien professionnel obligatoire ?", reponseAttendue: "Tous les 2 ans, avec un bilan récapitulatif tous les 6 ans. Il porte sur les perspectives d'évolution professionnelle et les besoins en formation." },
    { question: "Pourquoi avez-vous choisi la formation TP RPMS ?", reponseAttendue: "Motivation liée à un projet de création/reprise d'entreprise, évolution vers un poste de direction, souhait de structurer des compétences en gestion et management." },
    { question: "Qu'attendez-vous concrètement de cette formation ?", reponseAttendue: "Acquérir des compétences en pilotage commercial, gestion financière, management d'équipe, conduite de projet et stratégie d'entreprise pour être opérationnel en tant que RPMS." },
  ],
  fin: [
    { question: "Expliquez comment vous élaboreriez un plan d'actions commerciales pour une PME dont le CA baisse.", reponseAttendue: "Diagnostic de la situation (analyse SWOT, étude du marché), fixation d'objectifs SMART, définition des actions (prospection, fidélisation, partenariats, communication digitale), budgétisation, mise en place de KPIs (taux de conversion, CA mensuel, NPS) et suivi trimestriel." },
    { question: "Comment calculez-vous la marge brute, la valeur ajoutée et l'EBE ?", reponseAttendue: "Marge brute = CA − Coût des achats. Valeur ajoutée = Marge brute − Consommations externes. EBE = VA − Charges de personnel − Impôts et taxes + Subventions d'exploitation." },
    { question: "Décrivez votre démarche pour résoudre un conflit entre deux collaborateurs.", reponseAttendue: "Entretiens individuels pour écouter chaque partie, identification des causes du conflit, médiation avec la méthode DESC, recherche de solutions communes, mise en place d'actions correctives et suivi à J+15 et M+1." },
    { question: "Qu'est-ce que la GEPP et comment la mettriez-vous en place dans une PME ?", reponseAttendue: "La Gestion des Emplois et des Parcours Professionnels vise à anticiper les besoins en compétences. Mise en place : cartographie des emplois et compétences, analyse des écarts, plan de formation, mobilité interne, entretiens professionnels, veille sur les évolutions métiers." },
    { question: "Comment construisez-vous un tableau de bord de gestion ?", reponseAttendue: "Identification des objectifs stratégiques, sélection des indicateurs clés (CA, marge, trésorerie, satisfaction client, productivité), choix de la périodicité, création de visuels (graphiques, jauges), analyse des écarts et actions correctives." },
    { question: "Expliquez le modèle des 5 forces de Porter appliqué à votre secteur.", reponseAttendue: "Les 5 forces : rivalité concurrentielle, menace des nouveaux entrants, pouvoir de négociation des fournisseurs, pouvoir de négociation des clients, menace des produits de substitution. Application concrète au secteur avec analyse de chaque force." },
    { question: "Comment gérez-vous le recrutement et l'intégration d'un nouveau collaborateur ?", reponseAttendue: "Analyse du besoin, rédaction de la fiche de poste, diffusion multi-canal, présélection, entretiens structurés, vérification des références, parcours d'intégration (accueil, formation, tutorat, bilan à 1 mois et en fin de période d'essai)." },
    { question: "Quels sont les principaux ratios financiers que vous surveillez ?", reponseAttendue: "Taux de marge brute, taux d'endettement, ratio de liquidité, délai moyen de paiement clients/fournisseurs, seuil de rentabilité, CAF, BFR en jours de CA." },
    { question: "Comment intégrez-vous la RSE dans le pilotage d'une PME ?", reponseAttendue: "Diagnostic RSE, politique environnementale (réduction déchets, énergie), engagement social (QVT, diversité, formation), gouvernance responsable, communication auprès des parties prenantes, indicateurs de suivi." },
    { question: "Qu'avez-vous appris pendant cette formation TP RPMS ?", reponseAttendue: "J'ai appris à piloter les opérations commerciales, manager une équipe, analyser les finances d'une structure, construire un business plan, conduire des projets et élaborer une stratégie de développement pour une PME." },
  ],
};

QUESTIONS_OUVERTES["Assistant de Direction"] = {
  debut: [
    { question: "Avez-vous déjà exercé des fonctions d'assistanat ou de secrétariat ?", reponseAttendue: "Oui/Non avec description : type de structure, secteur d'activité, missions exercées (gestion d'agenda, courrier, organisation de réunions), durée d'expérience." },
    { question: "Que signifie pour vous le rôle d'assistant(e) de direction ?", reponseAttendue: "L'assistant(e) de direction est le bras droit du dirigeant : il/elle organise le quotidien, gère l'agenda, filtre les communications, prépare les dossiers, coordonne les projets et assure l'interface avec les interlocuteurs internes et externes." },
    { question: "Connaissez-vous la matrice d'Eisenhower ? Expliquez son principe.", reponseAttendue: "C'est un outil de priorisation qui classe les tâches selon deux axes : urgence et importance. 4 quadrants : Urgent+Important (faire immédiatement), Important+Non urgent (planifier), Urgent+Non important (déléguer), Ni urgent ni important (éliminer)." },
    { question: "Quels logiciels bureautiques maîtrisez-vous ?", reponseAttendue: "Pack Office (Word, Excel, PowerPoint, Outlook), Google Workspace, outils collaboratifs (Teams, Zoom), logiciels de gestion d'agenda, outils de GED." },
    { question: "Qu'est-ce qu'une note de synthèse ?", reponseAttendue: "C'est un document court et structuré qui résume les points essentiels d'un dossier complexe pour faciliter la prise de décision du dirigeant. Elle comprend : contexte, analyse, points clés et recommandations." },
    { question: "Comment organisez-vous votre journée de travail ?", reponseAttendue: "Consultation de l'agenda et des emails dès l'arrivée, identification des urgences, planification des tâches selon les priorités, gestion des imprévus, suivi des dossiers en cours, anticipation du lendemain." },
    { question: "Que signifie RGPD et pourquoi est-ce important pour un(e) assistant(e) ?", reponseAttendue: "Le Règlement Général sur la Protection des Données encadre le traitement des données personnelles. L'assistant(e) manipule des données sensibles (contacts, informations RH, données clients) et doit garantir leur confidentialité et leur sécurité." },
    { question: "Comment rédige-t-on un courrier formel ?", reponseAttendue: "En-tête (expéditeur, destinataire, date, objet, référence), formule d'appel, corps du courrier (introduction, développement, conclusion), formule de politesse, signature." },
    { question: "Qu'est-ce que la GED (Gestion Électronique des Documents) ?", reponseAttendue: "La GED est un système informatique qui permet de créer, stocker, classer, rechercher et partager des documents numériques de manière organisée et sécurisée, en remplacement ou complément du classement papier." },
    { question: "Pourquoi avez-vous choisi la formation Assistant(e) de Direction ?", reponseAttendue: "Envie de développer des compétences en organisation, communication professionnelle, gestion de projet et polyvalence pour accompagner un dirigeant au quotidien." },
  ],
  fin: [
    { question: "Décrivez les étapes d'organisation d'un séminaire d'entreprise de 2 jours pour 30 personnes.", reponseAttendue: "Rétro-planning J-60 à J+7 : définition des objectifs, recherche et réservation du lieu, programme, convocations, logistique (transport, hébergement, restauration), supports de présentation, badges, évaluation post-séminaire, CR et suivi des décisions." },
    { question: "Comment rédigez-vous un compte rendu de réunion efficace ?", reponseAttendue: "Structuration par thème abordé, mention des participants, des décisions prises, des actions à mener (responsable + délai), distinction entre points d'information et points de décision, relecture avant diffusion dans les 48h." },
    { question: "Quelle est la différence entre un PV et un compte rendu ?", reponseAttendue: "Le PV (procès-verbal) est un document juridiquement engageant qui retranscrit fidèlement les débats et votes (obligatoire pour AG, CSE). Le CR est un document informatif synthétique des échanges et décisions." },
    { question: "Comment gérez-vous un interlocuteur mécontent au téléphone ?", reponseAttendue: "Écoute active sans interrompre, reformulation pour montrer la compréhension, empathie, proposition de solution concrète ou transfert vers la personne compétente, suivi de la résolution, documentation de l'incident." },
    { question: "Expliquez comment vous mettez en place un système de veille pour votre directeur.", reponseAttendue: "Identification des thématiques clés, sélection des sources (presse spécialisée, newsletters, LinkedIn, sites institutionnels), paramétrage d'alertes (Google Alerts), utilisation d'outils d'agrégation (Feedly), synthèse hebdomadaire sous forme de revue de presse avec titre, résumé et impact." },
    { question: "Comment organisez-vous un déplacement professionnel pour votre directeur ?", reponseAttendue: "Ordre de mission, réservation transport (train/avion avec comparatif), hébergement, transferts, programme détaillé du déplacement, dossier de voyage (billets, confirmations, adresses), préparation des documents pour les rendez-vous, gestion des notes de frais au retour." },
    { question: "Qu'est-ce que le time blocking et comment l'appliquez-vous ?", reponseAttendue: "Le time blocking consiste à bloquer des créneaux dédiés dans l'agenda pour des tâches spécifiques (traitement emails, dossiers de fond, imprévus). Cela évite la dispersion et garantit l'avancement des projets importants." },
    { question: "Comment assurez-vous la confidentialité des informations sensibles ?", reponseAttendue: "Respect du RGPD, mots de passe sécurisés, verrouillage de l'ordinateur, armoires fermées, classification des documents (confidentiel/interne/public), sensibilisation des collègues, destruction sécurisée des documents obsolètes." },
    { question: "Décrivez le contenu d'un ordre du jour de réunion.", reponseAttendue: "Date, heure, lieu, liste des participants, thèmes à aborder avec temps alloué et intervenant pour chaque point, documents à préparer, rappel de l'objectif de la réunion." },
    { question: "Qu'avez-vous appris pendant cette formation Assistant(e) de Direction ?", reponseAttendue: "J'ai appris à gérer un agenda complexe, organiser des événements, rédiger des notes de synthèse et CR, maîtriser les outils collaboratifs, mettre en place une veille informationnelle, gérer les priorités et coordonner des projets." },
  ],
};

QUESTIONS_OUVERTES["Infographiste"] = {
  debut: [
    { question: "Avez-vous déjà utilisé des logiciels de création graphique ? Lesquels ?", reponseAttendue: "Oui/Non avec description : Photoshop, Illustrator, InDesign, Canva, GIMP, Figma, etc. Niveau de maîtrise et contexte d'utilisation (personnel, professionnel, scolaire)." },
    { question: "Quelle est la différence entre une image vectorielle et une image bitmap ?", reponseAttendue: "Le vectoriel utilise des courbes mathématiques (Bézier) et peut être redimensionné sans perte de qualité. Le bitmap (ou matriciel) est composé de pixels et perd en qualité à l'agrandissement." },
    { question: "Que signifie CMJN et dans quel contexte l'utilise-t-on ?", reponseAttendue: "Cyan, Magenta, Jaune, Noir – c'est le mode colorimétrique utilisé pour l'impression. Contrairement au RVB (écran), le CMJN fonctionne en synthèse soustractive." },
    { question: "Quelle résolution est recommandée pour un document destiné à l'impression ?", reponseAttendue: "300 dpi (dots per inch) minimum pour l'impression professionnelle. Pour le web, 72 dpi suffisent." },
    { question: "Qu'est-ce qu'une charte graphique ?", reponseAttendue: "C'est un document de référence qui définit les règles d'utilisation de l'identité visuelle d'une marque : logo (versions, zones de protection), couleurs, typographies, iconographie, ton éditorial et applications." },
    { question: "Citez 3 formats d'image et leurs usages.", reponseAttendue: "JPEG : photos web (compression avec perte). PNG : images web avec transparence (sans perte). PDF : documents imprimés. Aussi : SVG (vectoriel web), TIFF (impression haute qualité), PSD (fichier source Photoshop)." },
    { question: "Qu'est-ce que le fond perdu en imprimerie ?", reponseAttendue: "C'est une zone supplémentaire (généralement 3 à 5 mm) ajoutée au-delà du format de coupe final, pour éviter les bords blancs après massicotage." },
    { question: "Comment définiriez-vous une bonne composition graphique ?", reponseAttendue: "Hiérarchie visuelle claire, équilibre entre les éléments, utilisation de la règle des tiers, contraste suffisant, espace blanc maîtrisé, cohérence typographique et harmonie des couleurs." },
    { question: "Que signifie PAO ?", reponseAttendue: "Publication Assistée par Ordinateur – ensemble des techniques et logiciels permettant de concevoir des documents destinés à l'impression (affiches, brochures, livres, magazines)." },
    { question: "Pourquoi avez-vous choisi la formation Infographiste ?", reponseAttendue: "Passion pour le design, envie de professionnaliser des compétences créatives, projet de travailler en agence/freelance, souhait de maîtriser la suite Adobe et les techniques de production graphique." },
  ],
  fin: [
    { question: "Décrivez votre démarche pour créer un logo professionnel.", reponseAttendue: "Brief client (valeurs, cible, concurrents, contraintes), recherches et moodboard, croquis, création de 3 pistes graphiques dans Illustrator, présentation argumentée, itérations, déclinaisons (couleur, N&B, favicon, horizontal/vertical), charte d'utilisation." },
    { question: "Comment élaborez-vous une charte graphique complète ?", reponseAttendue: "Définition des couleurs (codes hexa, RVB, CMJN, Pantone), typographies (titres, corps, web), logo et ses règles (zone de protection, taille minimum, fonds interdits), iconographie, ton, grille de mise en page, exemples d'applications (papeterie, web, signalétique)." },
    { question: "Expliquez le workflow de préparation d'un fichier pour l'impression.", reponseAttendue: "Vérification du mode CMJN, résolution 300 dpi, fond perdu 3-5 mm, vectorisation des textes, aplatissement des transparences, vérification du surimpression, export en PDF/X-1a ou PDF/X-4, contrôle preflight, épreuve de couleur." },
    { question: "Quelle est la différence entre Illustrator, Photoshop et InDesign ?", reponseAttendue: "Illustrator : création vectorielle (logos, illustrations, icônes). Photoshop : retouche photo et composition bitmap. InDesign : mise en page multi-pages (catalogues, magazines, brochures). Ils sont complémentaires dans un flux de production PAO." },
    { question: "Comment créez-vous un moodboard et à quoi sert-il ?", reponseAttendue: "Collecte d'images, couleurs, typographies et textures d'inspiration sur Pinterest, Behance, Dribbble. Assemblage dans un document visuel. Il sert à définir et valider la direction artistique avec le client avant la production." },
    { question: "Qu'est-ce que le cercle chromatique et comment l'utilisez-vous ?", reponseAttendue: "Le cercle chromatique organise les couleurs par teinte. Il permet de choisir des harmonies : complémentaires (couleurs opposées), analogues (couleurs voisines), triadiques (3 couleurs équidistantes). Utile pour créer des palettes cohérentes." },
    { question: "Comment retouchez-vous une série de photos produit sous Photoshop ?", reponseAttendue: "Import RAW, correction niveaux/courbes, balance des blancs, détourage (plume ou sélection), retouche tampon/correcteur, harmonisation couleurs, calques de réglage non-destructifs, script d'automatisation, export 300 dpi + 72 dpi." },
    { question: "Qu'est-ce que le droit d'auteur et le droit de cession en création graphique ?", reponseAttendue: "Le droit d'auteur protège toute création originale (droit moral incessible + droits patrimoniaux). Le droit de cession est un transfert contractuel des droits d'exploitation (reproduction, diffusion) moyennant rémunération, limité dans le temps et l'espace." },
    { question: "Comment maquettez-vous un catalogue multi-pages dans InDesign ?", reponseAttendue: "Création du document (format, marges, colonnes, fond perdu), gabarits (pages types), styles de paragraphe/caractère, nuancier, importation des images et textes, grille de base, numérotation automatique, table des matières, vérification preflight, export PDF." },
    { question: "Qu'avez-vous appris pendant cette formation Infographiste ?", reponseAttendue: "J'ai appris la théorie du design (composition, couleur, typographie), la maîtrise de la suite Adobe (Photoshop, Illustrator, InDesign), la création de logos et chartes graphiques, les techniques de prépresse et le workflow de production professionnelle." },
  ],
};

QUESTIONS_OUVERTES["Restauration"] = {
  debut: [
    { question: "Avez-vous déjà travaillé dans le secteur de la restauration ? Si oui, dans quel type d'établissement ?", reponseAttendue: "Oui/Non avec description : type de restauration (commerciale, collective, rapide, traiteur), poste occupé (commis, serveur, plongeur, polyvalent), durée d'expérience." },
    { question: "Que signifie HACCP et pourquoi est-ce important en restauration ?", reponseAttendue: "Hazard Analysis Critical Control Point – c'est une méthode d'analyse des dangers et de maîtrise des points critiques pour garantir la sécurité alimentaire. Elle est obligatoire dans tout établissement de restauration." },
    { question: "Quelle est la température de la zone de danger pour les aliments ?", reponseAttendue: "Entre +3°C et +63°C – c'est la plage de température où les bactéries se multiplient le plus rapidement. Les aliments ne doivent pas y rester plus de 2 heures." },
    { question: "Citez les équipements de protection individuelle obligatoires en cuisine.", reponseAttendue: "Charlotte ou toque (cheveux), tablier propre, chaussures de sécurité antidérapantes, pas de bijoux ni montre, ongles courts et propres, tenue changée quotidiennement." },
    { question: "Que signifie la 'marche en avant' en restauration ?", reponseAttendue: "C'est un principe d'organisation des flux qui garantit que les denrées progressent toujours du sale vers le propre, sans retour en arrière ni croisement avec les déchets ou le matériel sale." },
    { question: "Combien d'allergènes sont à déclaration obligatoire ? Citez-en 5.", reponseAttendue: "14 allergènes. Exemples : gluten, crustacés, œufs, poisson, arachides, soja, lait, fruits à coque, céleri, moutarde, sésame, sulfites, lupin, mollusques." },
    { question: "Quels sont les différents types de restauration que vous connaissez ?", reponseAttendue: "Restauration commerciale (restaurants traditionnels, brasseries), restauration rapide (fast-food, snacking), restauration collective (cantines, hôpitaux, EHPAD), traiteur/événementiel, hôtellerie-restauration." },
    { question: "Que signifie FIFO et pourquoi l'applique-t-on en restauration ?", reponseAttendue: "First In, First Out – les produits reçus en premier doivent être utilisés en premier. Cela permet de respecter les DLC, d'éviter le gaspillage et de garantir la fraîcheur des aliments." },
    { question: "Connaissez-vous les techniques de découpe de base en cuisine ?", reponseAttendue: "Émincer (tranches fines), ciseler (petits dés fins), brunoise (dés 1-2 mm), julienne (bâtonnets fins), mirepoix (dés 1 cm), chiffonnade (lanières de feuilles)." },
    { question: "Pourquoi avez-vous choisi la formation Employé Polyvalent en Restauration ?", reponseAttendue: "Intérêt pour la cuisine et le service, souhait de travailler dans la restauration, envie d'acquérir des compétences polyvalentes (cuisine, service, hygiène), projet professionnel dans l'hôtellerie-restauration." },
  ],
  fin: [
    { question: "Décrivez les 7 principes de la méthode HACCP dans l'ordre.", reponseAttendue: "1) Analyse des dangers (biologiques, chimiques, physiques), 2) Détermination des CCP, 3) Établissement des limites critiques, 4) Mise en place de la surveillance, 5) Actions correctives, 6) Vérification du système, 7) Documentation et enregistrements." },
    { question: "Comment contrôlez-vous une livraison de marchandises ?", reponseAttendue: "Vérification du bon de livraison vs bon de commande (quantités, références). Contrôle des températures (viandes ≤3°C, surgelés ≤-18°C, laitiers ≤6°C). Vérification des DLC/DDM, de l'aspect et de l'intégrité des emballages. Refus si non-conforme. Rangement immédiat. Fiche de réception signée." },
    { question: "Citez les 5 sauces mères de la cuisine française et donnez un exemple d'utilisation pour chacune.", reponseAttendue: "1) Béchamel (roux blanc + lait) → gratin, croque-monsieur. 2) Velouté (roux + fond blanc) → sauce suprême. 3) Espagnole (roux brun + fond brun) → sauce bordelaise. 4) Tomate → pâtes, pizza. 5) Hollandaise (jaunes + beurre clarifié) → asperges, eggs Benedict." },
    { question: "Un client vous informe qu'il est allergique au gluten et aux fruits à coque. Quelle est votre démarche ?", reponseAttendue: "Consulter les fiches allergènes de chaque plat, identifier les plats compatibles, informer la cuisine (étiquette spéciale), vérifier l'absence de contamination croisée (ustensiles, huile de friture), confirmer les options au client, documenter dans le cahier des allergènes." },
    { question: "Décrivez l'organisation d'un service de 50 couverts du début à la fin.", reponseAttendue: "Avant-service : mise en place (dressage des tables, vérification du matériel, briefing équipe). Service : accueil, prise de commandes, envoi synchronisé cuisine/salle, service à l'assiette, suivi satisfaction. Après-service : débarrassage, nettoyage, comptabilité caisse, plan de nettoyage." },
    { question: "Qu'est-ce qu'un plan de nettoyage et désinfection (PND) ?", reponseAttendue: "Document qui décrit pour chaque zone/équipement : quoi nettoyer, avec quel produit, à quelle fréquence, selon quel protocole, par qui, et comment vérifier l'efficacité. Il garantit le respect des normes d'hygiène et constitue une preuve en cas de contrôle sanitaire." },
    { question: "Expliquez les différents modes de cuisson et donnez un exemple pour chacun.", reponseAttendue: "Sauter (feu vif, corps gras → légumes sautés), rôtir (four, chaleur sèche → poulet rôti), braiser (milieu humide fermé → bourguignon), pocher (liquide frémissant → œufs pochés), frire (bain d'huile → frites), griller (contact direct → grillades), vapeur (vapeur d'eau → légumes vapeur)." },
    { question: "Comment gérez-vous l'encaissement et la clôture de caisse ?", reponseAttendue: "Saisie des commandes dans le logiciel de caisse, vérification du total, proposition des moyens de paiement (CB, espèces, titres-restaurant), remise du ticket. Clôture : comptage du fond de caisse, édition du Z de caisse, vérification des écarts, rangement sécurisé des espèces." },
    { question: "Quelles sont les règles de traçabilité en restauration ?", reponseAttendue: "Conservation des bons de livraison avec numéros de lots, étiquetage des produits entamés (date d'ouverture, DLC secondaire), fiches de traçabilité par plat, relevés de températures quotidiens, archivage des documents pendant la durée réglementaire." },
    { question: "Qu'avez-vous appris pendant cette formation Employé Polyvalent en Restauration ?", reponseAttendue: "J'ai appris les règles d'hygiène et HACCP, la chaîne du froid/chaud, les techniques culinaires de base (découpes, cuissons, sauces), le service en salle, l'accueil client, la gestion de caisse, la traçabilité et la gestion des allergènes." },
  ],
};

const DEFAULT_QUESTIONS_OUVERTES: QuestionsOuvertesFormation = {
  debut: [
    { question: "Que connaissez-vous sur le sujet de la formation ?", reponseAttendue: "Le stagiaire dit ce qu'il sait déjà sur le domaine." },
    { question: "Quels outils ou logiciels avez-vous déjà utilisés ?", reponseAttendue: "Liste des outils ou logiciels déjà pratiqués." },
    { question: "Avez-vous déjà travaillé dans ce domaine ? Racontez.", reponseAttendue: "Description simple de l'expérience professionnelle en lien." },
    { question: "Pourquoi suivez-vous cette formation ?", reponseAttendue: "Le stagiaire explique ses raisons et ses objectifs." },
    { question: "Avez-vous déjà fait une formation sur le même sujet ?", reponseAttendue: "Oui ou non, et laquelle si oui." },
    { question: "Comment évaluez-vous votre niveau ? (Débutant, Moyen, Avancé)", reponseAttendue: "Auto-évaluation simple du niveau, avec une explication courte." },
    { question: "Où comptez-vous utiliser ce que vous allez apprendre ?", reponseAttendue: "Le stagiaire décrit le contexte d'utilisation prévu." },
    { question: "Qu'est-ce qui vous semble difficile dans ce domaine ?", reponseAttendue: "Identification simple des points qui posent problème." },
    { question: "Si vous deviez expliquer le sujet en quelques mots, que diriez-vous ?", reponseAttendue: "Définition courte et personnelle des notions clés." },
    { question: "Qu'attendez-vous de cette formation ?", reponseAttendue: "Attentes claires : compétences à acquérir, résultats espérés." },
  ],
  fin: [
    { question: "Qu'avez-vous appris d'important pendant la formation ?", reponseAttendue: "Liste simple des compétences principales acquises." },
    { question: "Quel outil ou méthode vous a paru le plus utile ?", reponseAttendue: "Description courte d'un outil ou d'une méthode et de son utilité." },
    { question: "Comment allez-vous utiliser ces apprentissages dans votre travail ?", reponseAttendue: "Plan simple de mise en pratique au quotidien." },
    { question: "Sur quoi voulez-vous encore vous améliorer ?", reponseAttendue: "Identification honnête des points à approfondir." },
    { question: "Résumez en quelques phrases ce que vous retenez de la formation.", reponseAttendue: "Synthèse personnelle et claire des points essentiels." },
    { question: "Pensez-vous avoir progressé ? Donnez un exemple.", reponseAttendue: "Comparaison simple avant/après avec un exemple concret." },
    { question: "Quel exercice vous a le plus aidé ? Pourquoi ?", reponseAttendue: "Choix d'un exercice et explication courte de son utilité." },
    { question: "Conseilleriez-vous cette formation à quelqu'un ? Pourquoi ?", reponseAttendue: "Recommandation simple avec une raison." },
    { question: "Comment allez-vous continuer à progresser après la formation ?", reponseAttendue: "Idées de ressources ou d'actions pour continuer à apprendre." },
    { question: "Qu'est-ce qui a changé pour vous grâce à cette formation ?", reponseAttendue: "Bilan personnel court avec un exemple concret." },
  ],
};

function ensureMinimumQuestions(
  questions: QuestionOuverte[],
  fallbackQuestions: QuestionOuverte[],
  min = 10
): QuestionOuverte[] {
  const merged: QuestionOuverte[] = [];
  const seen = new Set<string>();

  for (const question of [...questions, ...fallbackQuestions]) {
    const key = question.question.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(question);
    if (merged.length >= min) break;
  }

  return merged;
}

/**
 * Génère 5 questions dynamiques (début/fin) à partir des objectifs et du programme
 * réels de la formation. Utilisé en complément des questions fixes pour garantir
 * la cohérence avec n'importe quelle formation.
 */
function generateDynamicQuestions(
  formationIntitule: string,
  objectifs?: string,
  programme?: string,
  type: "debut" | "fin" = "debut"
): QuestionOuverte[] {
  const intitule = formationIntitule || "cette formation";
  const cleanLine = (l: string) => l.trim()
    .replace(/^[-•*◦▪►–—]\s*/, "")
    .replace(/^\d+[\.\):]\s*/, "")
    .replace(/^(Jour|Module|Bloc|Séquence|Chapitre)\s*\d+\s*[-:–]?\s*/i, "")
    .replace(/^À l'issue.*capable de\s*:?\s*/i, "")
    .trim();

  const objs = (objectifs || "")
    .split(/\n|\.(?=\s)|;/)
    .map(cleanLine)
    .filter(l => l.length > 8 && l.length < 200);

  const progs = (programme || "")
    .split(/\n/)
    .map(cleanLine)
    .filter(l => l.length > 8 && l.length < 200 && !/^\d{1,2}[h:]\d{2}/.test(l));

  const seen = new Set<string>();
  const topics: string[] = [];
  [...objs, ...progs].forEach(t => {
    const key = t.toLowerCase().slice(0, 40);
    if (!seen.has(key)) {
      seen.add(key);
      topics.push(t);
    }
  });

  if (topics.length === 0) return [];

  const dynamicQs: QuestionOuverte[] = [];
  const maxQs = Math.min(5, topics.length);

  for (let i = 0; i < maxQs; i++) {
    const topic = topics[i];
    const topicShort = topic.length > 80 ? topic.slice(0, 77) + "..." : topic;

    if (type === "debut") {
      const qVariants = [
        `Que connaissez-vous sur : ${topicShort} ?`,
        `Avez-vous déjà fait : ${topicShort} ? Racontez en quelques mots.`,
        `Comment feriez-vous aujourd'hui pour : ${topicShort} ?`,
        `Selon vous, qu'est-ce qui est important dans : ${topicShort} ?`,
        `Qu'est-ce qui vous semble difficile dans : ${topicShort} ?`,
      ];
      dynamicQs.push({
        question: qVariants[i % qVariants.length],
        reponseAttendue: `Réponse attendue : le stagiaire dit ce qu'il sait déjà sur « ${topicShort} » et ce qu'il a besoin d'apprendre dans la formation « ${intitule} ».`,
      });
    } else {
      const qVariants = [
        `Avec vos mots, expliquez ce que vous avez appris sur : ${topicShort}.`,
        `Comment allez-vous utiliser au travail : ${topicShort} ?`,
        `Que faut-il retenir d'important sur : ${topicShort} ?`,
        `Donnez un exemple simple pour utiliser : ${topicShort}.`,
        `Quels outils ou méthodes utiliserez-vous pour : ${topicShort} ?`,
      ];
      dynamicQs.push({
        question: qVariants[i % qVariants.length],
        reponseAttendue: `Réponse attendue : le stagiaire montre qu'il sait faire « ${topicShort} » et donne un exemple concret d'utilisation après la formation « ${intitule} ».`,
      });
    }
  }

  return dynamicQs;
}

export function getQuestionsOuvertes(
  formationIntitule: string,
  objectifs?: string,
  programme?: string
): QuestionsOuvertesFormation {
  const key = getContentKey(formationIntitule);
  const hasSpecificContent = !!QUESTIONS_OUVERTES[key];
  const source = QUESTIONS_OUVERTES[key] || DEFAULT_QUESTIONS_OUVERTES;
  const wordFallback = key === "Initiation Word" ? QUESTIONS_OUVERTES["Bureautique"] : undefined;

  // Si pas de contenu spécifique pour cette formation, génère des questions
  // dynamiques cohérentes avec son intitulé/objectifs/programme.
  const dynamicDebut = !hasSpecificContent ? generateDynamicQuestions(formationIntitule, objectifs, programme, "debut") : [];
  const dynamicFin = !hasSpecificContent ? generateDynamicQuestions(formationIntitule, objectifs, programme, "fin") : [];

  return {
    debut: ensureMinimumQuestions(
      [...dynamicDebut, ...source.debut],
      [...(wordFallback?.debut ?? []), ...DEFAULT_QUESTIONS_OUVERTES.debut]
    ),
    fin: ensureMinimumQuestions(
      [...dynamicFin, ...source.fin],
      [...(wordFallback?.fin ?? []), ...DEFAULT_QUESTIONS_OUVERTES.fin]
    ),
  };
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
      // Fin de formation: all profiles perform well (scores 8-10)
      if (profile.level === 'excellent') {
        quality = seed < 95 ? 'full' : 'partial';
      } else if (profile.level === 'bon') {
        quality = seed < 90 ? 'full' : 'partial';
      } else if (profile.level === 'moyen') {
        quality = seed < 80 ? 'full' : 'partial';
      } else {
        quality = seed < 70 ? 'full' : seed < 95 ? 'partial' : 'wrong';
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
  const targetScoresDebut = [5, 6, 6, 7, 7, 5, 6, 7, 6, 5];
  const targetScoresFin = [8, 9, 9, 10, 10, 9, 9, 10, 10, 8];
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

  if (!isDebut) {
    const targetFullCount = Math.max(8, Math.min(10, Math.round(target)));
    const prioritized = adjustedQualities
      .map((quality, i) => ({
        i,
        priority: quality === 'full' ? 2 : quality === 'partial' ? 1 : 0,
        seed: rawAnswers[i].seed,
      }))
      .sort((a, b) => (b.priority - a.priority) || (a.seed - b.seed));

    const normalizedQualities: Array<'full' | 'partial' | 'wrong' | 'empty'> = rawAnswers.map(() => 'wrong');
    prioritized.slice(0, targetFullCount).forEach(({ i }) => {
      normalizedQualities[i] = 'full';
    });

    adjustedQualities.splice(0, adjustedQualities.length, ...normalizedQualities);
  }

  // Detect if questions are in English
  const isEnglish = questions.some(q => /^(how|what|why|where|when|who|which|do |does |can |could |complete|count|put |name |write |ask |describe |translate |introduce)/i.test(q.question));

  // Generate final answers with adjusted qualities
  return rawAnswers.map((raw, i) => {
    const quality = adjustedQualities[i];
    const expected = raw.question.reponseAttendue;
    let reponse: string;
    let score: number;
    let feedback: string;
    
    switch (quality) {
      case 'full':
        reponse = generateFullAnswer(expected, stagiaireIndex, raw.qi, stagiaireInfo, isEnglish);
        score = 1;
        feedback = "Bonne réponse";
        break;
      case 'partial':
        reponse = generatePartialAnswer(expected, raw.seed, stagiaireIndex, raw.qi, stagiaireInfo, isEnglish);
        score = 0.5;
        const partialFeedbacks = ["Réponse partielle", "Réponse incomplète", "Réponse acceptable", "Réponse partiellement correcte"];
        feedback = partialFeedbacks[(raw.seed + stagiaireIndex) % partialFeedbacks.length];
        break;
      case 'wrong':
        reponse = generateWrongAnswer(expected, raw.seed, stagiaireIndex, raw.qi, isEnglish);
        score = 0;
        const wrongFeedbacks = ["Réponse insuffisante", "Réponse incorrecte", "Réponse hors sujet", "Réponse erronée"];
        feedback = wrongFeedbacks[(raw.seed + stagiaireIndex) % wrongFeedbacks.length];
        break;
      case 'empty':
      default:
        const emptyResponses = isEnglish
          ? [
              "I don't know.",
              "I am not sure.",
              "/",
              "I don't have enough knowledge to answer.",
              "No idea.",
              "I don't remember.",
            ]
          : [
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
function generateFullAnswer(expected: string, stagiaireIndex: number, questionIndex: number, stagiaireInfo?: { nom?: string; prenom?: string; entreprise?: string; poste?: string }, isEnglish?: boolean): string {
  const cleaned = cleanBrackets(expected, stagiaireInfo?.nom, stagiaireInfo?.prenom, stagiaireInfo?.entreprise, stagiaireInfo?.poste);
  const sentences = cleaned.split(/(?<=[.!])\s+/).filter(s => s.trim());
  const seed = (stagiaireIndex * 13 + questionIndex * 7) % 8;
  
  const expansions = isEnglish
    ? [
        ' This is very useful in everyday life.',
        ' This is important to know for communication.',
        ' I can use this at work every day.',
        ' This is a key skill I learned during the training.',
        '', '', '', '',
      ]
    : [
        ' Cela permet d\'assurer un travail de qualité au quotidien.',
        ' C\'est essentiel pour être efficace en situation professionnelle.',
        ' C\'est directement applicable dans le cadre de mon travail.',
        ' C\'est un élément fondamental à connaître et à savoir appliquer.',
        '', '', '', '',
      ];
  
  const varied = sentences.map((s, i) => {
    const sv = (stagiaireIndex * 13 + questionIndex * 7 + i * 3) % 5;
    let result = s;
    if (!isEnglish) {
      if (sv === 1) result = result.replace('Il faut', 'On doit').replace('il faut', 'on doit');
      if (sv === 2) result = result.replace('permet de', 'sert à').replace('Il faut', 'Il est nécessaire de');
      if (sv === 3) result = result.replace('par exemple', 'notamment').replace('Exemple :', 'Par exemple :');
      if (sv === 4) result = result.replace('c\'est', 'il s\'agit de').replace('C\'est', 'Il s\'agit de');
    } else {
      if (sv === 1) result = result.replace('You can', 'It is possible to');
      if (sv === 2) result = result.replace('For example', 'For instance');
      if (sv === 3) result = result.replace('It is', 'This is');
    }
    return result;
  });
  
  if ((stagiaireIndex + questionIndex) % 3 === 0 && varied.length > 2) {
    const tmp = varied[1]; varied[1] = varied[2]; varied[2] = tmp;
  }
  
  return varied.join(' ') + expansions[seed];
}

function generatePartialAnswer(expected: string, seed: number, stagiaireIndex: number, questionIndex: number, stagiaireInfo?: { nom?: string; prenom?: string; entreprise?: string; poste?: string }, isEnglish?: boolean): string {
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

function generateWrongAnswer(expected: string, seed: number, stagiaireIndex: number, questionIndex: number, isEnglish?: boolean): string {
  const vaguePool = isEnglish
    ? [
        "I think it is something important but I am not sure about the details.",
        "I don't remember exactly but I think it is related to grammar.",
        "I know there are rules but I cannot explain them clearly.",
        "I think it is about vocabulary but I am not confident.",
        "I believe it has to do with English but I need to study more.",
        "I am not sure, maybe it is about communication.",
        "I think the answer is yes but I cannot explain why.",
        "I remember hearing about this but I forgot the details.",
      ]
    : [
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
