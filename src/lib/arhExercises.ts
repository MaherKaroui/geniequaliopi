// Exercices par module — Assistant ressources humaines (ARH, RNCP35030 / TP-01284)
// 6 modules × 5 QCM + 1 exercice pratique, avec 4 productions stagiaires
// différentes (rédigées à la main, humanisées) tirées selon le stagiaire.

import type { PaieModuleExercises, PaieModuleQCM } from "./paiePreset";

const mq = (question: string, options: string[], correctIndex: number): PaieModuleQCM => ({ question, options, correctIndex });

export const ARH_MODULE_EXERCISES: PaieModuleExercises[] = [
  {
    moduleTitre: "Module 1 — Gestion administrative du personnel : embauche et formalités",
    qcm: [
      mq("La DPAE doit être adressée à l'URSSAF :", ["Dans les 8 jours suivant l'embauche", "Au plus tôt 8 jours avant l'embauche et au plus tard avant la prise de poste", "Le jour de la première paie", "Uniquement pour les CDI"], 1),
      mq("Le contrat CDD doit être remis au salarié :", ["Le jour de la fin du contrat", "Dans les 2 jours ouvrables suivant l'embauche", "Dans le mois", "Aucun délai imposé"], 1),
      mq("Le registre unique du personnel est tenu :", ["Par établissement", "Uniquement au siège", "Seulement au-delà de 50 salariés", "Il a été supprimé en 2020"], 0),
      mq("La visite d'information et de prévention doit avoir lieu :", ["Avant l'embauche systématiquement", "Dans les 3 mois suivant la prise de poste (sauf poste à risque)", "Dans l'année", "Uniquement à la demande du salarié"], 1),
      mq("Un CDD conclu sans écrit est :", ["Nul", "Réputé conclu à durée indéterminée", "Valable 3 mois", "Requalifié en contrat d'intérim"], 1),
    ],
    exercice: {
      titre: "Check-list d'embauche complète d'un CDD de remplacement",
      consigne: "L'entreprise TERRALIS embauche M. Karim HADDAD en CDD du 6 octobre au 31 janvier pour remplacer une salariée en congé maternité (conducteur de travaux, ETAM, 35 h, 2 450 € brut). Listez les formalités dans l'ordre chronologique et les mentions obligatoires du contrat.",
      reponseAttendue:
        "FORMALITÉS : 1. DPAE sur net-entreprises (au plus tôt 8 jours avant, au plus tard avant la prise de poste), accusé conservé. 2. Rédaction du CDD et remise sous 2 jours ouvrables. 3. Inscription au registre unique du personnel. 4. Affiliation mutuelle et prévoyance ou dispense écrite. 5. Déclaration au service de santé au travail (VIP sous 3 mois). 6. Ouverture du dossier salarié dématérialisé (accès restreint, durées de conservation RGPD). 7. Création dans le logiciel de paie et intégration en DSN.\nMENTIONS OBLIGATOIRES : motif précis du recours (remplacement de Mme DUPONT, congé maternité) avec nom et qualification de la salariée remplacée, dates de début et de fin (ou terme imprécis = retour de la salariée), poste et classification ETAM, période d'essai (1 jour par semaine, 1 mois maximum), rémunération 2 450 € brut pour 35 h, convention collective du Bâtiment ETAM, caisse de retraite complémentaire et prévoyance, indemnité de fin de contrat de 10 %.\nVIGILANCE : un CDD sans écrit ni motif est réputé à durée indéterminée.",
      variantes: [
        "J'ai commencé par la DPAE sur net-entreprises, je l'ai faite 3 jours avant l'entrée et j'ai imprimé l'accusé pour le dossier. Ensuite j'ai préparé le contrat, je sais qu'il faut le remettre dans les 2 jours ouvrables sinon on risque la requalification. J'ai noté M. HADDAD sur le registre du personnel le jour de son arrivée, puis j'ai fait l'affiliation mutuelle et la demande de visite d'information et de prévention. Pour les mentions j'ai bien mis le motif avec le nom de Mme DUPONT et son poste, les dates, la qualification ETAM, le salaire de 2 450 €, la convention du Bâtiment et la prime de précarité de 10 %. J'ai hésité sur la période d'essai, j'ai retenu 1 jour par semaine plafonné à 1 mois.",
        "Alors dans l'ordre : DPAE, contrat signé avant la prise de poste, registre unique, mutuelle, médecine du travail, dossier salarié et création en paie. Ce que j'ai retenu surtout c'est qu'un CDD sans écrit devient un CDI, donc chez nous on ne laisse plus personne démarrer sans contrat signé. Sur les mentions j'ai listé le motif de remplacement avec le nom de la salariée, les dates du 6 octobre au 31 janvier, le poste de conducteur de travaux, le brut, la convention collective et la retraite complémentaire. J'ai oublié la prévoyance dans ma première version, le formateur me l'a fait ajouter.",
        "Moi je suis en reconversion donc j'ai suivi la check-list du support pas à pas. DPAE en premier, c'est la seule formalité avec un délai vraiment strict. Puis contrat écrit, registre, mutuelle, santé au travail, dossier RGPD, paie. Pour les mentions du CDD j'ai écrit : identité des parties, motif de recours détaillé, date de début et de fin, poste et coefficient, durée du travail, salaire, période d'essai, convention collective, organismes de retraite et de prévoyance, indemnité de fin de contrat. Je ne suis pas encore à l'aise sur le terme imprécis quand c'est un retour de congé maternité, je dois revoir ce point.",
        "J'ai traité le dossier comme si c'était chez nous. DPAE la veille de l'entrée, contrat en deux exemplaires signés le jour même, inscription au registre, affiliation mutuelle avec le bulletin d'adhésion, demande de VIP sur le portail du service de santé au travail et création du salarié dans Silae pour la paie d'octobre. Mentions : motif de remplacement nominatif, dates, qualification, 35 h, 2 450 € brut, essai d'un mois maximum, IDCC du Bâtiment, prévoyance et 10 % de précarité. J'ai ajouté une clause de confidentialité et la mention RGPD sur le traitement des données, ça faisait partie des bonnes pratiques vues en cours.",
      ],
      points: 5,
    },
  },
  {
    moduleTitre: "Module 2 — Variables de paie, contrôle du bulletin et DSN",
    qcm: [
      mq("Les 8 premières heures supplémentaires hebdomadaires sont majorées de :", ["10 %", "25 %", "50 %", "100 %"], 1),
      mq("La DSN mensuelle est déposée au plus tard :", ["Le 5 ou le 15 du mois suivant selon l'effectif", "Le dernier jour du mois", "Le 20 du mois", "Chaque trimestre"], 0),
      mq("La subrogation signifie que :", ["Le salarié perçoit directement les IJSS", "L'employeur maintient le salaire et perçoit les IJSS à la place du salarié", "Les cotisations sont suspendues", "Le contrat est suspendu sans solde"], 1),
      mq("Le nombre de titres-restaurant attribués correspond :", ["Aux jours calendaires du mois", "Aux jours travaillés effectifs comportant une pause repas", "À 22 par mois systématiquement", "Au choix du salarié"], 1),
      mq("Le « net social » figurant sur le bulletin sert :", ["Au calcul du RSA et de la prime d'activité", "Au calcul de la retraite", "À la déclaration de TVA", "À rien, c'est indicatif"], 0),
    ],
    exercice: {
      titre: "Contrôler les variables du mois avant transmission au gestionnaire",
      consigne: "Vous préparez la transmission des variables de novembre pour 145 salariés. Décrivez votre méthode de collecte puis citez 6 points de contrôle avant envoi, et les contrôles à réception des bulletins.",
      reponseAttendue:
        "MÉTHODE : rétroplanning (clôture des variables le 20, transmission le 22, bulletins le 28, virement le 30) ; collecte par sources (gestion des temps, managers, notes de frais, arrêts de travail, titres-restaurant) ; consolidation dans un fichier unique normalisé, une ligne par salarié.\n6 CONTRÔLES : 1. Cohérence entrées/sorties avec le registre unique du personnel. 2. Heures supplémentaires (25 % puis 50 %, durées maximales 10 h/jour et 48 h/semaine). 3. Absences justifiées, maintien de salaire conventionnel et subrogation IJSS. 4. Titres-restaurant = jours travaillés effectifs, hors absences et selon l'accord télétravail. 5. Primes soumises / frais non soumis, respect des plafonds URSSAF. 6. Comparatif M-1 salarié par salarié, justification de tout écart supérieur à 10 %.\nÀ RÉCEPTION : contrôle du brut, du net à payer, du net imposable, du net social, des cumuls de congés payés, puis validation de la DSN avant le 5 ou le 15 selon l'effectif et traitement des retours CRM.",
      variantes: [
        "Ma méthode : je bloque la collecte au 20 du mois, j'envoie un mail de rappel aux managers le 15 pour les primes et les astreintes, et j'exporte les heures depuis notre logiciel de gestion des temps. Je regroupe tout dans un seul fichier avec une ligne par salarié. Mes contrôles : entrées et sorties du mois, heures supplémentaires majorées correctement, absences avec justificatif, titres-restaurant recalculés sur les jours réellement travaillés, primes soumises à cotisations, et surtout la comparaison avec le mois précédent qui me permet de repérer les erreurs de saisie. À réception je vérifie le brut, le net à payer et les cumuls de congés avant de valider la DSN.",
        "Avant la formation je transmettais les variables sans vraiment contrôler. Maintenant j'ai construit un fichier de contrôle avec des formules. Je pointe le nombre de bulletins avec l'effectif du registre, je recalcule les heures supplémentaires à 25 % sur les 8 premières, je vérifie que chaque absence a bien son arrêt scanné dans le dossier, je recompte les tickets restaurant en enlevant les jours de télétravail et les absences, je contrôle les frais qui ne doivent pas être soumis, et je fais un comparatif avec octobre pour tout écart de plus de 10 %. Le point que je maîtrise le moins encore c'est le contrôle du net social, je l'ai ajouté à ma check-list.",
        "J'ai décrit le circuit complet : collecte du 1er au 20, contrôle du 20 au 22, transmission le 22 au cabinet, retour des bulletins le 28, contrôle et validation avant le virement du 30. Les six contrôles que j'ai cités sont : cohérence de l'effectif, heures supplémentaires et durées maximales, absences et subrogation, titres-restaurant, éléments soumis ou non soumis, et écarts par rapport au mois précédent. J'insiste sur la subrogation parce que chez nous on avait perdu des IJSS faute d'avoir envoyé l'attestation de salaire à temps. À réception je contrôle ligne à ligne les bulletins des entrées et sorties, ce sont ceux où il y a le plus d'erreurs.",
        "Pour moi le plus important c'est la traçabilité : chaque variable doit avoir une pièce justificative. Je collecte par sources, je consolide, je fais valider le fichier par la responsable RH avant envoi. Mes contrôles portent sur les entrées et sorties, les heures supplémentaires, les absences et le maintien de salaire prévu par la convention, les titres-restaurant, les primes et frais, et le comparatif M-1. À réception je regarde le brut, le net imposable, le net social et le solde de congés, puis je valide la DSN avant le 15 puisque nous sommes moins de 50 salariés. Je garde une copie du fichier de variables comme preuve en cas de contrôle.",
      ],
      points: 5,
    },
  },
  {
    moduleTitre: "Module 3 — Tableaux de bord RH et pilotage social sous Excel",
    qcm: [
      mq("Le taux d'absentéisme se calcule :", ["Nombre d'absents / effectif", "Heures d'absence / heures théoriques travaillées × 100", "Jours de congés / jours ouvrés", "Absences / turnover"], 1),
      mq("Le turnover se calcule :", ["Entrées / effectif", "((entrées + sorties) / 2) / effectif moyen × 100", "Sorties × 100", "Départs en période d'essai uniquement"], 1),
      mq("L'index égalité professionnelle F/H doit être publié avant le :", ["1er janvier", "1er mars", "30 juin", "31 décembre"], 1),
      mq("Un tableau croisé dynamique sert à :", ["Protéger un fichier", "Agréger et croiser rapidement des données par critère", "Verrouiller des formules", "Créer un publipostage"], 1),
      mq("La diffusion d'un tableau de bord RH doit respecter :", ["Aucune règle particulière", "L'anonymisation et l'agrégation des données (RGPD)", "La publication nominative des salaires", "L'envoi à tous les salariés"], 1),
    ],
    exercice: {
      titre: "Construire le tableau de bord social trimestriel",
      consigne: "La direction demande un tableau de bord trimestriel. Indiquez les indicateurs retenus, leurs formules de calcul, la structure du fichier Excel et les précautions de diffusion.",
      reponseAttendue:
        "INDICATEURS : effectif inscrit et ETP (somme des quotités) ; taux d'absentéisme = heures d'absence / heures théoriques × 100, ventilé par motif ; turnover = ((entrées + sorties)/2) / effectif moyen × 100 ; pyramide des âges par tranches de 10 ans et par sexe ; masse salariale brute et évolution vs N-1 ; répartition CDI / CDD / alternance / intérim ; index égalité F/H.\nSTRUCTURE EXCEL : feuille « Données » (une ligne par salarié : matricule, sexe, date de naissance, entrée, contrat, quotité, brut, heures d'absence) ; feuille « TCD » par service et par mois ; feuille « Tableau de bord » avec 6 à 8 indicateurs, graphiques (pyramide, courbe absentéisme, camembert contrats) et mise en forme conditionnelle sur seuils.\nDIFFUSION : agrégation par service avec seuil minimum de 5 salariés, aucune donnée nominative de rémunération, date de mise à jour visible, commentaire d'analyse de 5 lignes pour la direction.",
      variantes: [
        "J'ai construit trois feuilles : les données brutes, les TCD et le tableau de bord. Dans les données j'ai mis une ligne par salarié avec le matricule, le sexe, l'âge, la date d'entrée, le type de contrat, la quotité, le brut et les heures d'absence. Ensuite j'ai fait un TCD par service et par mois. Sur la feuille de restitution j'ai mis six indicateurs : effectif ETP, absentéisme, turnover, masse salariale, répartition des contrats et pyramide des âges. J'ai ajouté une mise en forme conditionnelle en vert, orange et rouge selon les seuils. Ce que j'ai découvert c'est qu'il ne faut jamais diffuser de salaires nominatifs, on agrège par service à partir de 5 salariés.",
        "Franchement c'est l'exercice qui m'a le plus servi. Avant je calculais l'absentéisme à la main. Là j'ai posé la formule heures d'absence divisées par heures théoriques fois 100 et j'ai décliné par motif : maladie, accident du travail, absences injustifiées. Pour le turnover j'ai pris la moyenne des entrées et des sorties sur l'effectif moyen. J'ai fait un graphique en courbe pour l'absentéisme mois par mois et un histogramme pour la pyramide des âges. J'ai mis la date de mise à jour en en-tête parce que la direction me demandait toujours si les chiffres étaient à jour.",
        "J'ai retenu sept indicateurs : effectif, ETP, absentéisme par motif, turnover avec un focus sur les départs en période d'essai, masse salariale et son évolution, répartition des contrats et index égalité. Sur Excel j'ai utilisé les TCD avec un bouton Actualiser tout, ça évite de refaire les calculs chaque trimestre. J'ai ajouté un onglet Analyse avec cinq lignes de commentaire, parce qu'un tableau sans analyse ne sert à rien pour la direction. Je dois encore progresser sur les graphiques croisés dynamiques, j'ai mis du temps à les mettre en forme.",
        "Ma logique : un fichier, trois niveaux. Les données anonymisées, les calculs, la restitution. J'ai calculé l'absentéisme, le turnover, l'ancienneté moyenne et la pyramide des âges. J'ai aussi ajouté le coût de l'absentéisme estimé, ça parle davantage à la direction. Côté RGPD j'ai remplacé les noms par des matricules et j'ai supprimé la colonne salaire de la version diffusée aux managers. J'ai prévu une actualisation trimestrielle avec une procédure écrite d'une page pour que la personne qui me remplace puisse le faire.",
      ],
      points: 5,
    },
  },
  {
    moduleTitre: "Module 4 — Recrutement, sourcing et intégration",
    qcm: [
      mq("Lors d'un entretien, il est interdit de demander :", ["Les prétentions salariales", "La disponibilité", "La situation familiale ou un projet de grossesse", "Les compétences techniques"], 2),
      mq("Les CV des candidats non retenus se conservent au maximum :", ["6 mois", "2 ans", "5 ans", "Indéfiniment"], 1),
      mq("Une offre d'emploi doit obligatoirement :", ["Indiquer l'âge souhaité", "Respecter la non-discrimination (art. L1132-1) et la mention H/F", "Mentionner la nationalité exigée", "Préciser la situation familiale attendue"], 1),
      mq("Le rapport d'étonnement s'inscrit dans :", ["La procédure disciplinaire", "Le parcours d'intégration d'un nouveau collaborateur", "L'entretien de départ", "Le bilan de compétences"], 1),
      mq("La promesse d'embauche écrite doit préciser :", ["Uniquement le salaire", "Le poste, la rémunération, la date d'entrée et la durée de validité", "Seulement la date d'entrée", "Rien, elle est orale"], 1),
    ],
    exercice: {
      titre: "Offre d'emploi et trame de présélection téléphonique",
      consigne: "MEDIALIS CONSEIL recrute un(e) chargé(e) de communication en CDI. Rédigez la structure de l'offre d'emploi et la trame de présélection téléphonique de 10 minutes, en respectant la non-discrimination.",
      reponseAttendue:
        "OFFRE : 1. Titre clair « Chargé(e) de communication H/F – CDI – Levallois-Perret ». 2. Présentation de l'entreprise en 4 lignes. 3. Missions en 5 à 7 puces avec verbes d'action. 4. Profil : formation, expérience, compétences techniques (Canva, réseaux sociaux, rédaction web) et comportementales. 5. Conditions : contrat, date, fourchette de rémunération, télétravail, avantages. 6. Processus et délais de réponse. 7. Mentions légales : non-discrimination (art. L1132-1), écriture H/F, accessibilité aux personnes en situation de handicap. 8. Diffusion : site carrière, Welcome to the Jungle, LinkedIn, APEC, cooptation.\nPRÉSÉLECTION (10 min) : se présenter et vérifier la disponibilité ; rappeler le poste ; parcours en 3 minutes ; motivation ; 2 questions techniques ; outils maîtrisés ; sécuriser disponibilité, préavis, prétentions et mobilité ; présenter la suite du processus ; remplir immédiatement la grille (notation 1 à 4 sur 5 critères, avis go / no-go argumenté) ; réponse à tous les candidats sous 15 jours.\nINTERDIT : questions sur la situation familiale, la santé, la religion, l'origine, la grossesse ou l'appartenance syndicale.",
      variantes: [
        "J'ai rédigé l'offre en huit blocs : titre du poste avec H/F et la ville, présentation de l'entreprise, missions en puces avec des verbes d'action, profil recherché, conditions avec la fourchette de salaire, processus de recrutement, mention de non-discrimination et ouverture aux personnes en situation de handicap. Pour la présélection j'ai fait une trame chronométrée : 2 minutes de présentation, 3 minutes de parcours, 2 minutes de motivation, 2 questions techniques et 2 minutes pour les éléments factuels. C'est justement ce que j'oubliais avant : les prétentions et la disponibilité. Maintenant je remplis ma grille juste après l'appel, tant que c'est frais.",
        "Ce qui m'a marquée c'est la partie non-discrimination. Avant je demandais aux candidates si elles avaient des enfants, en pensant bien faire pour les horaires. J'ai compris que c'est interdit et que ça expose l'entreprise. Dans mon offre j'ai mis la mention H/F, la référence à l'article L1132-1 et l'ouverture aux travailleurs handicapés. Pour la trame téléphonique j'ai gardé cinq critères notés de 1 à 4 : expérience, compétences techniques, motivation, disponibilité et adéquation salariale, avec un avis go ou no-go argumenté à la fin. Et je réponds à tous les candidats, même en négatif, sous 15 jours.",
        "Mon offre commence par un titre précis parce que c'est ce qui détermine le référencement sur les jobboards. Ensuite quatre lignes sur l'entreprise, six missions, le profil, les conditions et le processus. J'ai indiqué une fourchette de rémunération, on m'a expliqué que ça augmente le taux de réponse et que ça évite de perdre du temps en entretien. Pour la diffusion j'ai prévu le site carrière, LinkedIn, Welcome to the Jungle et la cooptation interne avec une prime. La trame de présélection tient sur une page avec les questions et une case notation par critère. Je dois encore travailler mon aisance au téléphone.",
        "J'ai construit l'offre et la trame en pensant à l'expérience candidat. L'offre est courte, concrète, sans jargon, avec les délais annoncés. La présélection dure 10 minutes maximum : je me présente, je vérifie que la personne peut parler, je résume le poste, je pose mes questions et j'annonce la suite. Je note tout de suite sur ma grille pour être objective et pouvoir justifier mes choix en cas de contestation. J'ai aussi retenu que les CV et les grilles se conservent 2 ans maximum et que les candidats doivent être informés du traitement de leurs données.",
      ],
      points: 5,
    },
  },
  {
    moduleTitre: "Module 5 — Plan de développement des compétences et financements",
    qcm: [
      mq("L'OPCO est :", ["Un organisme paritaire qui finance la formation professionnelle", "Une caisse de retraite", "Un service de l'URSSAF", "Une mutuelle obligatoire"], 0),
      mq("La demande de prise en charge OPCO doit être déposée :", ["Après la formation", "Avant le début de la formation", "Dans l'année qui suit", "Au moment du paiement de la facture"], 1),
      mq("Le financement d'une formation par un OPCO suppose que l'organisme soit :", ["Coté en bourse", "Certifié Qualiopi", "Adhérent à une fédération", "Situé dans la même région"], 1),
      mq("Le CPF est mobilisé :", ["Uniquement par l'employeur", "À l'initiative du salarié, avec accord de l'employeur si la formation est sur le temps de travail", "Seulement en cas de licenciement", "Uniquement pour un bilan de compétences"], 1),
      mq("Le certificat de réalisation est nécessaire pour :", ["Déclencher le remboursement OPCO", "Inscrire le salarié", "Justifier une absence", "Calculer la paie"], 0),
    ],
    exercice: {
      titre: "Construire le plan de développement des compétences et monter un dossier OPCO",
      consigne: "18 demandes de formation remontent des entretiens professionnels, pour un budget de 25 000 €. Construisez le plan N+1 et détaillez le montage du dossier de prise en charge OPCO.",
      reponseAttendue:
        "PLAN : 1. Consolider les 18 demandes (salarié, service, besoin, origine, dispositif, coût, durée, priorité). 2. Isoler les formations obligatoires (habilitations, sécurité, SST, CACES) non négociables. 3. Croiser avec la stratégie et la cartographie des compétences (GEPP). 4. Arbitrer sous contrainte : mutualiser en intra (30 à 40 % d'économie), distanciel pour les modules courts, échelonner sur 2 exercices. 5. Optimiser les financements : OPCO, CPF co-construit, Pro-A, alternance, FNE. 6. Formaliser : objectifs, calendrier trimestriel, bénéficiaires, budget par action, indicateurs. 7. Consulter le CSE puis diffuser aux managers.\nDOSSIER OPCO : identifier l'OPCO de rattachement et les critères de prise en charge ; vérifier la certification Qualiopi de l'organisme ; réunir devis ou convention, programme détaillé, CV du formateur, calendrier, liste nominative ; déposer AVANT le début de la formation (pas de rétroactivité) ; obtenir l'accord de prise en charge ; après la formation transmettre émargements, attestation d'assiduité, facture et certificat de réalisation ; évaluer à chaud, à froid à 3 mois, bilan annuel à la direction et au CSE.",
      variantes: [
        "J'ai d'abord mis les 18 demandes dans un tableau avec une colonne priorité. J'ai séparé les formations obligatoires, qui passent d'office, des formations de développement. Ensuite j'ai regardé ce qui pouvait être mutualisé : j'avais 6 demandes Excel, donc une session intra au lieu de 6 inscriptions individuelles, ça divise le coût par trois. J'ai bouclé le budget à 24 200 € en décalant deux formations longues sur l'année suivante. Pour le dossier OPCO j'ai listé les pièces : devis, programme, CV du formateur, calendrier et liste des participants, avec un dépôt avant le démarrage parce qu'il n'y a pas de prise en charge rétroactive.",
        "Le point que je retiens c'est la chronologie. Avant, dans mon entreprise, on déposait les dossiers après coup et on perdait le financement. Là j'ai construit un rétroplanning : recueil des besoins en novembre, arbitrage en décembre, consultation du CSE en janvier, dépôt OPCO au moins un mois avant chaque session. J'ai priorisé les obligations réglementaires, puis les besoins liés aux projets de l'année, puis les souhaits individuels. J'ai aussi proposé du CPF co-construit pour deux salariés qui voulaient une certification, ça a soulagé le budget.",
        "J'ai présenté le plan sous forme de tableau trimestriel avec pour chaque action : intitulé, objectif, bénéficiaires, durée, coût, financement envisagé et indicateur d'évaluation. J'ai retenu 14 actions sur les 18 demandes et j'ai motivé par écrit les 4 refus, pour pouvoir répondre aux salariés lors des entretiens. Côté OPCO j'ai vérifié notre branche, le taux de prise en charge et la certification Qualiopi de l'organisme, ce que je ne faisais pas avant. Après la formation je sais qu'il faut envoyer les émargements, l'attestation d'assiduité, la facture et le certificat de réalisation pour être remboursé.",
        "Ma démarche a été budgétaire avant tout. J'ai chiffré les 18 demandes, ça faisait 38 000 €, donc 13 000 € de trop. J'ai mutualisé, basculé trois modules en distanciel, et négocié un tarif de groupe avec l'organisme. Je suis arrivée à 24 800 €. J'ai gardé la traçabilité de tous mes arbitrages pour la présentation au CSE. Pour le dossier OPCO j'ai fait une check-list de pièces et un tableau de suivi des demandes avec les dates de dépôt, d'accord et de remboursement. Je dois encore me familiariser avec le dispositif Pro-A, je l'ai cité sans bien le maîtriser.",
      ],
      points: 5,
    },
  },
  {
    moduleTitre: "Module 6 — Entretiens professionnels, GEPP et RGPD RH",
    qcm: [
      mq("L'entretien professionnel est obligatoire :", ["Tous les ans", "Tous les 2 ans avec un état des lieux tous les 6 ans", "Tous les 5 ans", "À la demande du salarié uniquement"], 1),
      mq("Dans une entreprise d'au moins 50 salariés, le défaut d'entretien ouvre droit à un abondement correctif de :", ["500 €", "1 500 €", "3 000 €", "6 000 €"], 2),
      mq("L'entretien professionnel porte sur :", ["L'évaluation de la performance", "Les perspectives d'évolution professionnelle et les besoins de formation", "La sanction disciplinaire", "La fixation des objectifs annuels"], 1),
      mq("La BDESE est :", ["La base de données économiques, sociales et environnementales mise à disposition du CSE", "Un logiciel de paie", "Un registre de sécurité", "Une déclaration fiscale"], 0),
      mq("Le dossier d'un salarié parti est conservé :", ["Indéfiniment", "5 ans après le départ (bulletins 50 ans côté employeur)", "6 mois", "Jusqu'au solde de tout compte"], 1),
    ],
    exercice: {
      titre: "Plan de rattrapage des entretiens professionnels et exploitation des comptes rendus",
      consigne: "Aucun entretien professionnel n'a été réalisé depuis 3 ans dans une entreprise de 145 salariés. Décrivez le risque encouru, le plan de rattrapage et l'exploitation des comptes rendus.",
      reponseAttendue:
        "RISQUE : entretien obligatoire tous les 2 ans avec état des lieux tous les 6 ans (art. L6315-1). Au-delà de 50 salariés, le défaut d'entretien ou de formation non obligatoire ouvre droit à un abondement correctif de 3 000 € par salarié sur le CPF, plus un risque prud'homal au titre de l'obligation d'employabilité.\nPLAN : 1. Extraire la liste des 145 salariés avec date d'entrée et date du dernier entretien. 2. Prioriser les échéances de 6 ans, les retours de congé maternité, de longue maladie ou de mandat. 3. Planifier sur 4 mois, 8 à 10 entretiens par semaine répartis entre les managers. 4. Former les managers une demi-journée (posture, distinction avec l'entretien annuel, trame commune). 5. Convoquer par écrit 15 jours avant avec la trame jointe. 6. Réaliser l'entretien (projet professionnel, formation, mobilité, VAE, CPF) et signer le compte rendu en deux exemplaires.\nEXPLOITATION : consolidation des demandes, alimentation du plan de développement N+1 et du budget OPCO, cartographie des compétences et viviers de mobilité (GEPP), synthèse anonymisée à la direction et au CSE, archivage dans le dossier salarié avec accès restreint (RGPD).",
      variantes: [
        "Le risque m'a marqué : 3 000 € par salarié, sur 145 personnes ça peut monter très haut. J'ai proposé un plan sur 4 mois avec un tableau de suivi Excel : nom, service, date d'entrée, date du dernier entretien, échéance, manager, date planifiée, statut. J'ai priorisé les salariés proches des 6 ans et les retours de congé maternité. J'ai prévu une demi-journée de formation des managers parce que la plupart confondent l'entretien professionnel et l'entretien annuel d'évaluation. Les comptes rendus signés alimentent ensuite le plan de formation et sont archivés dans le dossier salarié avec un accès limité au service RH.",
        "J'ai commencé par sécuriser la preuve : convocation écrite 15 jours avant avec la trame jointe, compte rendu signé des deux parties, copie remise au salarié. Même si l'entreprise est en retard, il faut pouvoir montrer à l'inspection que le rattrapage est engagé. Ensuite j'ai bâti un planning de 10 entretiens par semaine répartis entre 8 managers. Pour l'exploitation j'ai fait une synthèse anonymisée avec les demandes classées par thème : logiciels, management, langues, certifications. Cette synthèse sert de base au plan N+1 et à la présentation au CSE.",
        "Mon plan est en trois temps : diagnostic, rattrapage, pérennisation. Le diagnostic c'est l'extraction complète des 145 salariés avec leurs dates. Le rattrapage c'est le planning sur 4 mois, la formation des managers et une trame commune. La pérennisation, c'est ce que je trouve le plus important : une alerte automatique dans le SIRH 2 mois avant chaque échéance, pour ne plus jamais se retrouver dans cette situation. Sur l'exploitation, je remonte les besoins de formation, j'identifie les souhaits de mobilité interne et je construis une cartographie des compétences pour anticiper les départs en retraite.",
        "J'ai insisté sur la distinction entre l'entretien professionnel et l'entretien annuel : on ne parle pas de performance, on parle de parcours, de formation, de VAE, de CPF et de mobilité. Dans mon plan de rattrapage j'ai prévu de commencer par un service pilote pour tester la trame, puis de généraliser. J'ai aussi rédigé un guide d'une page pour les managers avec les questions à poser et celles à éviter. Côté RGPD, les comptes rendus sont rangés dans le dossier salarié, accessibles uniquement aux RH et au manager direct, et conservés pendant toute la durée du contrat puis 5 ans après le départ.",
      ],
      points: 5,
    },
  },
];

/** Détecte une formation Assistant ressources humaines (ARH). */
export function isARHFormation(intitule: string): boolean {
  const t = (intitule || "").toLowerCase();
  return t.includes("assistant ressources humaines")
    || t.includes("assistante ressources humaines")
    || t.includes("(arh)")
    || t.includes("rncp35030")
    || t.includes("tp-01284");
}
