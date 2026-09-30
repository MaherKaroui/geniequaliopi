/**
 * Contenus d'évaluation complets (positionnement, QCM final, exercices corrigés,
 * compétences) pour les familles de formations qui retombaient jusqu'ici sur le
 * contenu générique : Informatique, Digital Marketing, Bureautique, CAP Esthétique.
 * Chaque exercice porte son corrigé (`reponseAttendue`) qui sert de barème.
 */
import type { QCMQuestion, ExercicePratique } from "./evalContent";

export interface EvalComplement {
  qcmPositionnement: QCMQuestion[];
  qcmFinal: QCMQuestion[];
  exercices: ExercicePratique[];
  competences: string[];
  appreciations: string[];
}

const q = (question: string, options: string[], correctIndex: number): QCMQuestion => ({ question, options, correctIndex });

export const EVAL_COMPLEMENTS: Record<string, EvalComplement> = {
  "Informatique": {
    qcmPositionnement: [
      q("Quel composant stocke durablement les fichiers d'un ordinateur ?", ["La mémoire vive (RAM)", "Le disque (SSD / HDD)", "Le processeur", "La carte graphique"], 1),
      q("Que signifie « système d'exploitation » ?", ["Un antivirus", "Le logiciel qui gère le matériel et les applications (Windows, macOS, Linux)", "Un navigateur internet", "Un tableur"], 1),
      q("Quelle extension correspond à une archive compressée ?", [".zip", ".docx", ".jpg", ".exe"], 0),
      q("Quel raccourci ouvre l'explorateur de fichiers sous Windows ?", ["Win + E", "Ctrl + E", "Alt + F4", "Win + L"], 0),
      q("Qu'est-ce qu'une adresse IP ?", ["Un mot de passe", "L'identifiant d'un appareil sur un réseau", "Une adresse e-mail", "Le nom d'un site"], 1),
      q("Quel est le rôle d'un routeur ?", ["Imprimer des documents", "Relier des réseaux et acheminer les données", "Stocker des sauvegardes", "Protéger l'écran"], 1),
      q("Un mot de passe robuste contient :", ["Son prénom", "12 caractères ou plus mêlant lettres, chiffres et symboles", "« 123456 »", "La date de naissance"], 1),
      q("Que fait une sauvegarde 3-2-1 ?", ["3 copies, sur 2 supports, dont 1 hors site", "3 mots de passe pour 2 comptes", "3 antivirus sur 2 postes", "Rien de particulier"], 0),
      q("Qu'est-ce que l'hameçonnage (phishing) ?", ["Une panne matérielle", "Un message frauduleux qui cherche à voler des identifiants", "Une mise à jour", "Un logiciel de dessin"], 1),
      q("Où se règlent les mises à jour sous Windows ?", ["Paramètres > Windows Update", "Panneau Word", "Bloc-notes", "Explorateur > Affichage"], 0),
    ],
    qcmFinal: [
      q("Quelle commande affiche la configuration réseau sous Windows ?", ["ipconfig", "dir", "ping", "cls"], 0),
      q("Quelle commande teste la joignabilité d'un serveur ?", ["ping", "copy", "format", "tree"], 0),
      q("Que signifie DHCP ?", ["Attribution automatique des adresses IP", "Chiffrement des disques", "Partage d'imprimante", "Messagerie sécurisée"], 0),
      q("Quel protocole sécurise la navigation web ?", ["HTTP", "HTTPS", "FTP", "Telnet"], 1),
      q("Quel droit NTFS permet de modifier un fichier sans pouvoir changer ses autorisations ?", ["Lecture", "Modification", "Contrôle total", "Aucun"], 1),
      q("Qu'est-ce que l'authentification à deux facteurs ?", ["Deux mots de passe identiques", "Un mot de passe + un second élément (code SMS, application)", "Deux comptes administrateur", "Deux antivirus"], 1),
      q("Quel est le rôle du pare-feu ?", ["Filtrer les connexions entrantes et sortantes", "Accélérer le processeur", "Compresser les fichiers", "Nettoyer l'écran"], 0),
      q("Quelle est la bonne réaction face à un courriel suspect ?", ["Cliquer pour vérifier", "Ne pas cliquer, signaler au référent informatique et supprimer", "Le transférer à tous", "Répondre avec ses identifiants"], 1),
      q("Que contient un ticket d'incident bien rédigé ?", ["Seulement « ça ne marche pas »", "Utilisateur, poste, symptôme, message d'erreur, date, impact", "Le mot de passe de l'utilisateur", "Rien, un appel suffit"], 1),
      q("Quelle obligation impose le RGPD pour les données personnelles ?", ["Aucune", "Collecter le strict nécessaire et les protéger", "Les publier", "Les conserver sans limite"], 1),
    ],
    exercices: [
      { titre: "Exercice 1 : Organisation d'une arborescence", consigne: "Créez sur le poste une arborescence « Clients / 2026 / Devis – Factures – Contrats », déplacez-y 5 fichiers fournis, renommez-les au format AAAA-MM-JJ_Client_Type et compressez le dossier 2026.", reponseAttendue: "Arborescence exacte à 3 niveaux ; 5 fichiers renommés selon la convention (ex. 2026-03-09_Dupont_Devis.pdf) ; archive 2026.zip créée et ouvrable. Barème : arborescence 4 pts, nommage 4 pts, archive 2 pts." },
      { titre: "Exercice 2 : Diagnostic réseau", consigne: "Un poste n'accède plus à internet. Relevez sa configuration (ipconfig), testez la passerelle puis un site externe (ping) et rédigez le diagnostic.", reponseAttendue: "Relevé de l'adresse IP, du masque et de la passerelle ; ping passerelle puis ping 8.8.8.8 puis ping d'un nom de domaine ; conclusion argumentée (câble / Wi-Fi, DHCP, DNS ou fournisseur). Barème : méthode 5 pts, conclusion 5 pts." },
      { titre: "Exercice 3 : Sécurisation d'un poste", consigne: "Appliquez la check-list de sécurité : mises à jour, antivirus actif, pare-feu, verrouillage automatique à 5 minutes, compte standard pour l'usage courant.", reponseAttendue: "Les 5 points sont vérifiés et justifiés par une capture ou un relevé ; le compte utilisé au quotidien n'est pas administrateur. Barème : 2 pts par point." },
      { titre: "Exercice 4 : Politique de sauvegarde", consigne: "Proposez une politique de sauvegarde pour une TPE de 5 postes (fréquence, supports, rétention, test de restauration).", reponseAttendue: "Règle 3-2-1 ; sauvegarde quotidienne incrémentale et hebdomadaire complète ; une copie hors site ou cloud chiffré ; rétention d'au moins 30 jours ; test de restauration mensuel tracé. Barème : 2 pts par élément." },
      { titre: "Exercice 5 : Traitement d'un incident", consigne: "À partir d'un appel utilisateur (« mon imprimante ne marche plus »), rédigez le ticket, les vérifications et la réponse à l'utilisateur.", reponseAttendue: "Ticket complet (utilisateur, poste, symptôme, message, impact, priorité) ; vérifications ordonnées (alimentation, file d'attente, pilote, réseau) ; réponse claire, polie, avec délai. Barème : ticket 4, vérifications 4, communication 2." },
      { titre: "Exercice 6 : Sensibilisation à l'hameçonnage", consigne: "Analysez 4 courriels fournis et indiquez pour chacun s'il est légitime, avec les indices relevés.", reponseAttendue: "Identification correcte des 4 courriels ; indices cités : expéditeur usurpé, lien dont l'adresse diffère, urgence, pièce jointe inattendue, fautes. Barème : 2,5 pts par courriel." },
    ],
    competences: ["Gérer fichiers et dossiers sur un poste de travail", "Diagnostiquer un problème de connexion réseau", "Sécuriser un poste et les accès", "Mettre en place et tester une sauvegarde", "Traiter et tracer un incident utilisateur"],
    appreciations: [
      "Excellente méthode de diagnostic, démarche rigoureuse et bien documentée.",
      "Très bonne maîtrise des commandes réseau et des règles de sécurité.",
      "Bon niveau d'ensemble ; la politique de sauvegarde est pertinente.",
      "Progression nette ; la rédaction des tickets reste à consolider.",
      "Niveau satisfaisant ; bonne vigilance face aux courriels frauduleux.",
      "Travail sérieux ; les droits d'accès doivent encore être approfondis.",
      "Bonne autonomie sur le poste de travail, à renforcer sur le réseau.",
      "Objectifs atteints ; bonne communication avec l'utilisateur.",
      "Acquis solides ; continuer à pratiquer le diagnostic pas à pas.",
      "Belle progression entre le positionnement et l'évaluation finale.",
    ],
  },

  "Digital Marketing": {
    qcmPositionnement: [
      q("Que signifie SEO ?", ["Publicité payante", "Optimisation pour les moteurs de recherche", "Envoi de SMS", "Gestion des stocks"], 1),
      q("Qu'est-ce qu'un persona ?", ["Un logo", "Le portrait type d'un client cible", "Un mot-clé", "Un concurrent"], 1),
      q("Quel réseau est le plus orienté professionnel ?", ["TikTok", "LinkedIn", "Snapchat", "Pinterest"], 1),
      q("Que mesure le taux de clic (CTR) ?", ["Clics / impressions", "Ventes / visites", "Abonnés / publications", "Coût / vente"], 0),
      q("Qu'est-ce qu'un appel à l'action (CTA) ?", ["Une invitation claire à agir (« Demander un devis »)", "Une facture", "Un mot de passe", "Une mention légale"], 0),
      q("Quel outil mesure l'audience d'un site ?", ["Google Analytics", "Photoshop", "Excel seul", "Word"], 0),
      q("Qu'est-ce que l'e-mailing opt-in ?", ["Envoi à des contacts ayant donné leur accord", "Achat de fichiers", "Envoi sans désinscription", "Spam"], 0),
      q("Que signifie « taux de conversion » ?", ["Part des visiteurs qui réalisent l'action visée", "Nombre de pages", "Nombre de mots-clés", "Temps de chargement"], 0),
      q("Qu'est-ce qu'une ligne éditoriale ?", ["Le ton, les thèmes et la fréquence de publication", "Une facture", "Un code promo", "Un bandeau cookie"], 0),
      q("Le consentement aux cookies publicitaires est :", ["Facultatif", "Obligatoire avant dépôt (RGPD / CNIL)", "Réservé aux grandes entreprises", "Inutile en France"], 1),
    ],
    qcmFinal: [
      q("Où placer le mot-clé principal d'une page ?", ["Uniquement dans le pied de page", "Dans la balise title, le H1 et le début du texte", "Dans les images seulement", "Nulle part"], 1),
      q("Qu'est-ce qu'un objectif SMART ?", ["Spécifique, mesurable, atteignable, réaliste, temporellement défini", "Simple et rapide", "Un logiciel", "Une campagne virale"], 0),
      q("Quel indicateur suit la rentabilité d'une campagne payante ?", ["ROAS (revenu / dépense publicitaire)", "Nombre de likes", "Nombre de pages", "Taux de rebond seul"], 0),
      q("Qu'est-ce que le test A/B ?", ["Comparer deux versions pour garder la plus performante", "Un audit juridique", "Un sondage", "Une facture"], 0),
      q("Quel format favorise l'engagement sur les réseaux ?", ["Vidéo courte sous-titrée", "PDF de 40 pages", "Texte sans visuel", "Lien seul"], 0),
      q("Que doit contenir tout e-mail commercial ?", ["Un lien de désinscription", "Le mot de passe du client", "Aucun expéditeur", "Des pièces jointes lourdes"], 0),
      q("Le taux de rebond élevé sur une page indique souvent :", ["Un contenu inadapté à l'attente du visiteur", "Un excellent référencement", "Un site hors ligne", "Un e-mail envoyé"], 0),
      q("Qu'est-ce qu'un tunnel de conversion ?", ["Les étapes qui mènent le prospect à l'action", "Un hébergement", "Un pare-feu", "Un logo"], 0),
      q("Qui peut recevoir de la prospection B2C par e-mail ?", ["Les personnes ayant donné leur consentement préalable", "Tout le monde", "Les contacts achetés", "Les salariés d'une entreprise"], 0),
      q("Quel rythme de publication est recommandé pour une TPE ?", ["Régulier et tenable (2 à 3 fois par semaine)", "10 fois par jour", "Une fois par an", "Aucun"], 0),
    ],
    exercices: [
      { titre: "Exercice 1 : Persona et objectifs", consigne: "Pour l'entreprise fictive fournie, rédigez un persona complet et trois objectifs SMART pour les 6 prochains mois.", reponseAttendue: "Persona : âge, métier, besoins, freins, canaux utilisés ; 3 objectifs chiffrés et datés (ex. +30 % de demandes de devis d'ici au 30/09). Barème : persona 5 pts, objectifs 5 pts." },
      { titre: "Exercice 2 : Optimisation SEO d'une page", consigne: "Réécrivez le titre, la méta-description, le H1 et le premier paragraphe de la page fournie pour le mot-clé « formation Word Lyon ».", reponseAttendue: "Title ≤ 60 caractères avec le mot-clé en tête ; méta-description ≤ 155 caractères avec bénéfice et CTA ; H1 unique contenant le mot-clé ; premier paragraphe naturel qui le reprend. Barème : 2,5 pts par élément." },
      { titre: "Exercice 3 : Calendrier éditorial", consigne: "Construisez un calendrier éditorial d'un mois pour LinkedIn et Instagram (thèmes, formats, jours, objectifs).", reponseAttendue: "8 à 12 publications, alternance de formats (carrousel, vidéo courte, témoignage), thèmes reliés aux objectifs, un CTA par publication. Barème : cohérence 4, variété 3, CTA 3." },
      { titre: "Exercice 4 : Campagne e-mailing", consigne: "Rédigez un e-mail de relance clients (objet, pré-en-tête, corps, CTA) conforme au RGPD.", reponseAttendue: "Objet ≤ 50 caractères, pré-en-tête complémentaire, message centré sur un bénéfice, CTA unique, lien de désinscription et identité de l'expéditeur. Barème : rédaction 6, conformité 4." },
      { titre: "Exercice 5 : Lecture d'un tableau de bord", consigne: "À partir des statistiques fournies (visites, taux de rebond, conversions), identifiez deux problèmes et proposez deux actions.", reponseAttendue: "Problèmes justifiés par les chiffres (ex. rebond de 78 % sur la page tarifs) ; actions précises et mesurables (réécrire la page, ajouter un CTA). Barème : analyse 5, actions 5." },
      { titre: "Exercice 6 : Test A/B", consigne: "Concevez un test A/B sur le bouton d'une page de contact : hypothèse, variantes, indicateur, durée, décision.", reponseAttendue: "Une seule variable modifiée, hypothèse formulée, indicateur = taux de conversion, durée suffisante (2 semaines ou volume minimal), règle de décision annoncée. Barème : 2 pts par élément." },
    ],
    competences: ["Définir une cible et des objectifs SMART", "Optimiser le référencement naturel d'une page", "Planifier et produire des contenus pour les réseaux sociaux", "Concevoir une campagne e-mailing conforme au RGPD", "Analyser les indicateurs et ajuster les actions"],
    appreciations: [
      "Excellente compréhension de la stratégie digitale et des indicateurs.",
      "Très bons contenus, ton adapté à la cible.",
      "Bonne maîtrise du SEO on-page ; l'analyse des données peut progresser.",
      "Progression visible ; le calendrier éditorial est cohérent.",
      "Niveau satisfaisant ; attention à la conformité RGPD des e-mails.",
      "Travail sérieux et créatif, objectifs bien formulés.",
      "Bonne autonomie sur les outils ; poursuivre la pratique des tests A/B.",
      "Objectifs atteints ; bonne lecture des tableaux de bord.",
      "Acquis solides sur les réseaux sociaux, à consolider sur l'e-mailing.",
      "Belle progression entre le positionnement et l'évaluation finale.",
    ],
  },

  "Bureautique": {
    qcmPositionnement: [
      q("Quel logiciel sert à créer un tableau de calcul ?", ["Word", "Excel", "PowerPoint", "Outlook"], 1),
      q("Quel raccourci copie une sélection ?", ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + Z"], 0),
      q("Dans Excel, une formule commence par :", ["#", "=", "@", "!"], 1),
      q("Quel logiciel sert à créer une présentation ?", ["PowerPoint", "Excel", "Paint", "Bloc-notes"], 0),
      q("Comment enregistrer un document sous un autre nom ?", ["Fichier > Enregistrer sous", "Ctrl + P", "Insertion > Nom", "Affichage > Copie"], 0),
      q("Quelle fonction additionne une plage dans Excel ?", ["=SOMME()", "=MOYENNE()", "=MAX()", "=SI()"], 0),
      q("Dans Word, où se trouve la numérotation des pages ?", ["Insertion > Numéro de page", "Accueil > Police", "Révision > Orthographe", "Affichage > Zoom"], 0),
      q("Quel format garantit la mise en page à l'envoi ?", ["PDF", "TXT", "CSV", "ZIP"], 0),
      q("Qu'est-ce qu'une pièce jointe ?", ["Un fichier envoyé avec un courriel", "Un dossier local", "Un mot de passe", "Un onglet Excel"], 0),
      q("Comment annuler la dernière action ?", ["Ctrl + Z", "Ctrl + Y", "Ctrl + A", "Échap"], 0),
    ],
    qcmFinal: [
      q("Quelle fonction Excel renvoie une valeur selon une condition ?", ["=SI()", "=SOMME()", "=NB()", "=ARRONDI()"], 0),
      q("Comment figer la première ligne d'un tableau Excel ?", ["Affichage > Figer les volets", "Accueil > Fusionner", "Données > Trier", "Insertion > Tableau"], 0),
      q("Quel outil Excel synthétise une grande liste de données ?", ["Le tableau croisé dynamique", "Le correcteur", "Le zoom", "Le mode plan Word"], 0),
      q("Dans Word, quel outil génère une table des matières automatique ?", ["Les styles de titre + Références > Table des matières", "Le surlignage", "Le copier-coller", "Les tabulations"], 0),
      q("Comment réaliser un publipostage ?", ["Publipostage > choisir la liste de destinataires > insérer les champs", "Copier 50 fois la lettre", "Imprimer puis écrire à la main", "Insertion > Image"], 0),
      q("Quelle est la bonne pratique pour une diapositive ?", ["Une idée par diapositive, peu de texte, visuels lisibles", "20 lignes de texte", "Police 8", "Aucun titre"], 0),
      q("Quelle référence reste fixe quand on recopie une formule ?", ["$A$1", "A1", "A$", "1A"], 0),
      q("Comment trier une liste Excel par date ?", ["Données > Trier", "Accueil > Gras", "Insertion > Graphique", "Révision > Commentaire"], 0),
      q("Quel graphique montre une évolution dans le temps ?", ["Courbe", "Secteurs", "Nuage de mots", "Radar"], 0),
      q("Dans Outlook, comment planifier une réunion ?", ["Nouvelle réunion > inviter les participants > envoyer", "Nouveau courriel sans destinataire", "Répondre à tous", "Archiver"], 0),
    ],
    exercices: [
      { titre: "Exercice 1 : Courrier Word mis en forme", consigne: "Rédigez un courrier professionnel (en-tête, destinataire, objet, corps justifié, signature) et exportez-le en PDF.", reponseAttendue: "Structure complète et alignements corrects (date à droite, objet en gras, corps justifié, interligne 1,15), PDF exporté fidèle au document. Barème : structure 5, mise en forme 3, export 2." },
      { titre: "Exercice 2 : Tableau de suivi Excel", consigne: "Créez un tableau de suivi de dépenses (date, catégorie, montant) avec total, moyenne et mise en forme conditionnelle au-delà de 500 €.", reponseAttendue: "Formules =SOMME et =MOYENNE justes, mise en forme conditionnelle > 500 €, format monétaire, en-têtes figés. Barème : formules 4, mise en forme 3, présentation 3." },
      { titre: "Exercice 3 : Condition et recherche", consigne: "Dans la liste fournie, ajoutez une colonne « Statut » (=SI) et retrouvez le tarif de chaque produit avec RECHERCHEX ou RECHERCHEV.", reponseAttendue: "=SI(C2>=100;\"À commander\";\"OK\") recopiée sur toute la colonne ; recherche du tarif exacte avec référence absolue sur la table. Barème : SI 5, recherche 5." },
      { titre: "Exercice 4 : Présentation PowerPoint", consigne: "Réalisez une présentation de 6 diapositives présentant un service de l'entreprise, avec un thème cohérent et un graphique.", reponseAttendue: "6 diapositives titrées, une idée par diapositive, thème homogène, graphique lisible issu d'Excel, diapositive de conclusion avec contact. Barème : structure 4, lisibilité 4, graphique 2." },
      { titre: "Exercice 5 : Publipostage", consigne: "Préparez un publipostage d'invitations à partir d'une liste Excel de 10 contacts.", reponseAttendue: "Source Excel liée, champs Civilité / Nom / Adresse insérés, aperçu vérifié sur au moins 3 destinataires, fusion en un document de 10 invitations. Barème : liaison 3, champs 4, fusion 3." },
      { titre: "Exercice 6 : Organisation Outlook", consigne: "Créez deux règles de classement, une réunion avec trois participants et une signature professionnelle.", reponseAttendue: "Règles actives et testées ; réunion avec objet, lieu ou lien visio, horaire ; signature avec nom, fonction, organisme, téléphone. Barème : règles 4, réunion 3, signature 3." },
    ],
    competences: ["Produire des documents professionnels avec Word", "Construire des tableaux et formules avec Excel", "Exploiter et synthétiser des données", "Concevoir une présentation claire avec PowerPoint", "Organiser sa messagerie et son agenda"],
    appreciations: [
      "Excellente maîtrise de la suite bureautique, documents soignés.",
      "Très bonne aisance sur Excel, formules justes et bien présentées.",
      "Bon niveau d'ensemble ; le publipostage est réussi.",
      "Progression nette sur Word ; Excel reste à consolider.",
      "Niveau satisfaisant ; présentations claires et lisibles.",
      "Travail sérieux, bonne autonomie sur les outils.",
      "Bonne compréhension des fonctions conditionnelles.",
      "Objectifs atteints ; organisation Outlook efficace.",
      "Acquis solides ; continuer à pratiquer les tableaux croisés dynamiques.",
      "Belle progression entre le positionnement et l'évaluation finale.",
    ],
  },

  "CAP Esthétique": {
    qcmPositionnement: [
      q("Quelle est la couche la plus superficielle de la peau ?", ["Le derme", "L'épiderme", "L'hypoderme", "Le muscle"], 1),
      q("Avant tout soin, le professionnel doit :", ["Se laver et se désinfecter les mains", "Appliquer directement le produit", "Retirer ses gants", "Parfumer la cabine"], 0),
      q("Quel type de peau présente brillance et pores dilatés ?", ["Sèche", "Grasse", "Normale", "Sensible"], 1),
      q("Quel produit enlève le maquillage ?", ["Un démaquillant adapté", "Un masque", "Une crème de nuit", "Un vernis"], 0),
      q("Qu'est-ce qu'une contre-indication ?", ["Une situation qui interdit ou adapte le soin", "Un tarif", "Un produit", "Un outil"], 0),
      q("Comment se désinfectent les instruments métalliques ?", ["Nettoyage puis trempage dans un désinfectant, puis stérilisation si prévu", "Un simple essuyage", "Rinçage à l'eau froide", "Aucune action"], 0),
      q("Quel sens de retrait de la cire tiède ?", ["Dans le sens inverse de la pousse du poil", "Dans le sens du poil", "Perpendiculairement", "Au hasard"], 0),
      q("Que vérifie-t-on avant une teinture des cils ?", ["Un test d'allergie préalable", "La couleur des yeux seulement", "La taille de la cliente", "Rien"], 0),
      q("Quel règlement encadre les produits cosmétiques dans l'UE ?", ["Règlement (CE) n° 1223/2009", "Code de la route", "RGPD", "Code civil"], 0),
      q("Que signifie fidéliser une cliente ?", ["La faire revenir grâce à la qualité du service et du conseil", "Augmenter les prix", "Changer de produit chaque fois", "Réduire le temps de soin"], 0),
    ],
    qcmFinal: [
      q("Dans quel ordre se déroule un soin du visage ?", ["Démaquillage, gommage, modelage, masque, soin final", "Masque, démaquillage, gommage", "Modelage, démaquillage, masque", "Gommage seul"], 0),
      q("Quelle manœuvre de modelage est un effleurage ?", ["Glissé superficiel et enveloppant", "Pétrissage profond", "Tapotement rapide", "Pression statique"], 0),
      q("Un bouton d'acné inflammatoire contre-indique :", ["Le gommage mécanique sur la zone", "Le démaquillage", "La crème hydratante", "La prise de rendez-vous"], 0),
      q("Quelle épilation convient aux zones sensibles ?", ["Cire chaude ou cire à bas point de fusion", "Rasoir", "Crème décolorante seule", "Aucune"], 0),
      q("Comment gérer les déchets d'activités de soins à risques (DASRI) ?", ["Collecteur dédié et filière d'élimination agréée", "Poubelle ménagère", "Évier", "Recyclage papier"], 0),
      q("Quelle couleur corrige des cernes bleutés ?", ["Correcteur orangé ou saumon", "Vert", "Blanc", "Violet"], 0),
      q("La pose de vernis semi-permanent nécessite :", ["Préparation de l'ongle, base, couleur, top coat, catalysation", "Une seule couche sans lampe", "De l'eau chaude", "Un gommage"], 0),
      q("Quel argument est adapté à la vente conseil ?", ["Relier le produit au besoin identifié lors du diagnostic", "Vanter le prix le plus élevé", "Proposer tout le catalogue", "Imposer un produit"], 0),
      q("Quelle posture prévient les troubles musculo-squelettiques ?", ["Fauteuil réglé, dos droit, poignets dans l'axe", "Travail penché longtemps", "Bras levés en permanence", "Aucune"], 0),
      q("En fin de prestation, l'esthéticienne :", ["Conseille, encaisse, propose le prochain rendez-vous et remet la cabine en état", "Part sans conseil", "Laisse la cabine en l'état", "Ne note rien dans la fiche cliente"], 0),
    ],
    exercices: [
      { titre: "Exercice 1 : Diagnostic de peau", consigne: "Réalisez le diagnostic de peau d'un modèle et complétez la fiche cliente (type, état, contre-indications, soin proposé).", reponseAttendue: "Type et état de peau identifiés et argumentés, contre-indications recherchées, soin cohérent avec le diagnostic, fiche datée et signée. Barème : diagnostic 5, contre-indications 2, soin 3." },
      { titre: "Exercice 2 : Soin du visage", consigne: "Réalisez un soin du visage complet de 45 minutes en respectant le protocole d'hygiène.", reponseAttendue: "Hygiène (mains, poste, linge) respectée, étapes dans l'ordre, gestes maîtrisés, temps tenu, conseils à domicile donnés. Barème : hygiène 3, protocole 4, gestuelle 3." },
      { titre: "Exercice 3 : Épilation des jambes", consigne: "Réalisez une épilation demi-jambes à la cire tiède et donnez les conseils post-épilation.", reponseAttendue: "Test de température, application dans le sens du poil, retrait inverse et rapide, peau tendue, résidus retirés, conseils (pas de soleil ni hammam 24 h). Barème : technique 6, sécurité 2, conseils 2." },
      { titre: "Exercice 4 : Maquillage de jour", consigne: "Réalisez un maquillage de jour adapté à la morphologie du modèle.", reponseAttendue: "Teint unifié, corrections adaptées, regard et bouche harmonisés, rendu naturel, choix des couleurs justifié. Barème : teint 4, harmonie 4, justification 2." },
      { titre: "Exercice 5 : Beauté des mains", consigne: "Réalisez une manucure avec pose de vernis classique.", reponseAttendue: "Préparation (limage, cuticules, gommage), modelage, pose régulière base / 2 couches / top coat, finition nette. Barème : préparation 4, pose 4, finition 2." },
      { titre: "Exercice 6 : Vente conseil", consigne: "Jeu de rôle : conseillez une cliente à la peau sèche et proposez une routine de 2 produits.", reponseAttendue: "Questions de découverte, reformulation du besoin, 2 produits reliés au besoin, prix annoncé, conclusion avec prise de rendez-vous. Barème : découverte 3, argumentation 4, conclusion 3." },
    ],
    competences: ["Réaliser un diagnostic de peau et des phanères", "Mettre en œuvre un protocole de soin du visage dans le respect de l'hygiène", "Réaliser des épilations et des soins des mains et des pieds", "Réaliser un maquillage adapté à la morphologie", "Accueillir, conseiller et vendre des produits cosmétiques"],
    appreciations: [
      "Excellente gestuelle et hygiène irréprochable.",
      "Très bon diagnostic de peau, soins bien adaptés.",
      "Bon niveau d'ensemble ; le maquillage peut gagner en précision.",
      "Progression nette sur l'épilation, conseils pertinents.",
      "Niveau satisfaisant ; attention à la gestion du temps de soin.",
      "Travail sérieux, excellente relation cliente.",
      "Bonne maîtrise des protocoles, vente conseil à consolider.",
      "Objectifs atteints ; posture professionnelle adaptée.",
      "Acquis solides ; continuer la pratique sur modèles variés.",
      "Belle progression entre le positionnement et l'évaluation finale.",
    ],
  },
};
