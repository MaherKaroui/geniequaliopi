import type { CourseChapter } from "../courseContent";

export const GSC35_PARTIE2: CourseChapter[] = [
  {
    title: "Chapitre 3 – Concevoir et contractualiser une offre de formation conforme (C2)",
    description:
      "Construire une offre de formation qui réponde à un besoin réel et qui respecte le Code du travail : analyse des besoins, objectifs opérationnels et évaluables, programme complet (prérequis, durée, modalités et délais d'accès, tarifs, accessibilité, contacts), méthodes et modalités d'évaluation, positionnement à l'entrée, convention avec une entreprise (article L.6353-1 et article D.6353-1), contrat avec une personne physique qui se forme à ses frais (articles L.6353-3 à L.6353-7), conditions générales de vente, conditions d'annulation, attestation de fin de formation et certificat de réalisation. Exemples tirés du fil rouge Atelier Sésame Formation. Durée indicative : une journée (jour 2). Module C2 du programme.",
    sections: [
      {
        title: "3.1 – Analyser les besoins : le point de départ de toute offre",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Distinguer la demande exprimée par un client ou un stagiaire du besoin réel de compétences qu'il faut satisfaire.</li>
<li>Conduire une analyse des besoins à deux niveaux : le besoin de l'offre (pour concevoir un catalogue) et le besoin individuel (pour adapter une session à une personne ou à un groupe).</li>
<li>Conserver la trace de cette analyse, qui sert à la fois la qualité pédagogique et la démonstration attendue par l'indicateur 4 du référentiel national qualité.</li>
</ul>

<h3>Demande, besoin, objectif : trois notions à ne pas confondre</h3>
<p>Un organisme de formation reçoit rarement un besoin bien formulé. Il reçoit une <strong>demande</strong> : « Je voudrais une formation Excel », « Il faudrait former notre accueil », « J'aimerais me reconvertir dans l'assistanat ». Cette demande est souvent exprimée sous la forme d'une solution (une formation, un logiciel, une durée) et non sous la forme d'un problème à résoudre. Le travail de l'organisme consiste à remonter de la demande vers le <strong>besoin</strong>, c'est-à-dire l'écart entre la situation actuelle et la situation souhaitée, puis à traduire ce besoin en <strong>objectifs</strong> que la formation permettra d'atteindre.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Notion</th><th>Définition</th><th>Exemple chez Atelier Sésame Formation (fictif)</th></tr>
<tr><td>Demande</td><td>Ce que le client ou le futur stagiaire exprime spontanément</td><td>« Je voudrais apprendre Excel. »</td></tr>
<tr><td>Besoin</td><td>L'écart entre ce que la personne sait faire aujourd'hui et ce qu'elle doit savoir faire dans sa situation professionnelle</td><td>La personne doit produire chaque semaine un tableau de suivi des commandes et ne sait ni trier, ni filtrer, ni faire de totaux automatiques.</td></tr>
<tr><td>Objectif</td><td>Ce que la personne sera capable de faire à l'issue de la formation, formulé de façon observable</td><td>« Construire un tableau de suivi des commandes avec tri, filtres et sous-totaux, sans aide, en moins de trente minutes. »</td></tr>
<tr><td>Solution</td><td>La formation, sa durée, ses modalités</td><td>Deux jours en présentiel en petit groupe, avec exercices sur des fichiers proches de ceux de la stagiaire.</td></tr>
</table>
<p>Lorsque l'on saute l'étape du besoin, on vend une formation standard qui ne correspond pas à la situation : la stagiaire passe une demi-journée sur les graphiques dont elle n'a pas l'usage et repart sans savoir faire ses sous-totaux. La satisfaction baisse, les réclamations augmentent et l'organisme ne peut pas démontrer que la prestation était adaptée.</p>

<blockquote><strong>Rappel du fil rouge.</strong> Atelier Sésame Formation est un organisme de formation <em>fictif</em>, créé sous forme d'entreprise individuelle à Massy (Essonne) par Inès MARCHAND, formatrice et dirigeante. Elle intervient en bureautique et en accueil physique et téléphonique, avec l'appui occasionnel de deux formateurs indépendants, dont Paul RENAUD. Ses clients sont des particuliers qui financent eux-mêmes leur formation et quelques entreprises du territoire, comme la société fictive Vergers de l'Yvette. Inès veut structurer son centre, obtenir la certification Qualiopi et diversifier ses financements. Tous les noms, chiffres et situations de ce chapitre sont fictifs.</blockquote>

<h3>Premier niveau : analyser le besoin d'un marché pour concevoir l'offre</h3>
<p>Avant même de recevoir un stagiaire, l'organisme doit savoir à quels besoins son catalogue répond. Cette analyse, que l'on appelle parfois « étude d'opportunité », mobilise plusieurs sources :</p>
<ul>
<li><strong>Les demandes reçues</strong> : appels, mails, formulaires du site, questions posées lors des salons. Inès tient depuis six mois un simple tableau où elle note chaque demande, même celles qu'elle ne peut pas satisfaire. Elle y découvre que les demandes « accueil téléphonique » viennent surtout de cabinets médicaux et de petites agences immobilières.</li>
<li><strong>Les retours des stagiaires et des entreprises</strong> : questionnaires de fin de formation, échanges à froid quelques semaines après la session.</li>
<li><strong>Les observatoires et publications sur l'emploi</strong> : publications des observatoires de branche, données de France Travail sur les métiers en tension, enquêtes sur les besoins de main-d'œuvre. Ces sources, que l'on retrouvera au chapitre 7 avec la veille sur les métiers (indicateur 24), permettent de vérifier qu'une compétence est réellement recherchée.</li>
<li><strong>Les partenaires locaux</strong> : agences France Travail, missions locales, structures d'insertion, réseaux d'entreprises, chambres consulaires. Un échange de vingt minutes avec un conseiller vaut souvent mieux que des heures de recherche.</li>
<li><strong>La concurrence</strong> : quelles formations voisines existent, à quelle durée, à quel prix, avec quelles modalités ? L'objectif n'est pas de copier mais de repérer un positionnement (public mal servi, format plus court, horaires adaptés).</li>
</ul>
<p>Le résultat de cette analyse se résume dans une fiche d'opportunité d'une page : public visé, besoin identifié, sources consultées, offres existantes, positionnement retenu, décision (créer, adapter, renoncer). Cette fiche est une pièce utile lors de l'audit Qualiopi pour montrer que l'offre ne sort pas de nulle part.</p>

<h3>Second niveau : analyser le besoin individuel avant chaque entrée en formation</h3>
<p>Même avec un catalogue bien construit, chaque stagiaire et chaque entreprise arrive avec une situation particulière. L'analyse individuelle du besoin permet d'adapter le contenu, les exemples, le rythme et parfois la durée. Elle répond directement à l'indicateur 4 du référentiel national qualité : le prestataire analyse le besoin du bénéficiaire en lien avec l'entreprise et/ou le financeur concernés.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Avec qui analyser le besoin</th><th>Outils possibles</th><th>Trace à conserver</th></tr>
<tr><td>Particulier qui finance lui-même sa formation</td><td>Le futur stagiaire</td><td>Questionnaire de recueil des besoins, entretien téléphonique ou en visioconférence, test de positionnement</td><td>Questionnaire rempli et daté, compte rendu d'entretien, résultat du test</td></tr>
<tr><td>Salarié envoyé par son entreprise</td><td>Le salarié et son responsable (ou le service RH)</td><td>Entretien avec le responsable, questionnaire au salarié, fiche de poste, exemples de documents de travail</td><td>Fiche d'analyse du besoin co-signée ou validée par mail, éléments transmis</td></tr>
<tr><td>Groupe intra-entreprise</td><td>Le commanditaire, éventuellement un échantillon de participants</td><td>Réunion de cadrage, questionnaire en ligne aux participants, observation d'un poste</td><td>Compte rendu de la réunion de cadrage, synthèse des questionnaires</td></tr>
<tr><td>Personne orientée par un prescripteur</td><td>La personne et, avec son accord, le conseiller qui l'oriente</td><td>Entretien, questionnaire, échange avec le conseiller</td><td>Fiche de besoin, échanges écrits avec le prescripteur</td></tr>
</table>

<h4>Ce que doit contenir un questionnaire de recueil des besoins</h4>
<ol>
<li><strong>La situation actuelle</strong> : emploi occupé ou visé, tâches concernées, outils utilisés, fréquence d'utilisation.</li>
<li><strong>Le projet</strong> : pourquoi cette formation, maintenant ; ce que la personne veut être capable de faire ensuite.</li>
<li><strong>Le niveau ressenti</strong> sur les principaux points du programme (par exemple une échelle de « jamais utilisé » à « je maîtrise »).</li>
<li><strong>Les contraintes</strong> : disponibilités, distance, garde d'enfants, horaires, équipement personnel.</li>
<li><strong>Les besoins d'adaptation</strong> : la question doit être posée à tous, de façon neutre et sans exiger de justificatif médical : « Avez-vous besoin d'un aménagement pour suivre la formation dans de bonnes conditions (accessibilité des locaux, supports, rythme, outils) ? Si oui, notre référente handicap vous contactera. »</li>
<li><strong>Les attentes</strong> : ce que la personne espère trouver, ce qu'elle redoute.</li>
</ol>
<p>Le questionnaire ne doit demander que les informations nécessaires. L'article L.6353-9 du Code du travail prévoit que les informations demandées au candidat à une action de formation ne peuvent avoir comme finalité que d'apprécier son aptitude à suivre l'action de formation ; elles doivent présenter un lien direct et nécessaire avec l'action et le candidat est tenu d'y répondre de bonne foi. Un formulaire qui demande la situation familiale, la nationalité ou le numéro de sécurité sociale pour une formation bureautique ne respecte pas ce principe, ni celui de minimisation des données du RGPD, que l'on verra au chapitre 6.</p>

<h3>Exploiter l'analyse : de la fiche de besoin à l'adaptation de la session</h3>
<p>Recueillir des besoins sans les exploiter ne sert à rien, et l'auditeur Qualiopi le voit immédiatement : des questionnaires remplis mais une formation identique pour tous. L'exploitation consiste à prendre des décisions visibles :</p>
<ul>
<li>adapter les exemples et les exercices au secteur des stagiaires (tableaux de suivi de commandes pour un commerce, planning de rendez-vous pour un cabinet) ;</li>
<li>réorganiser le temps passé sur chaque partie du programme en fonction du niveau du groupe ;</li>
<li>prévoir des activités différenciées pour les stagiaires plus avancés ou plus fragiles ;</li>
<li>réorienter une personne dont le besoin ne correspond pas à la formation, plutôt que de l'inscrire quand même ;</li>
<li>déclencher la procédure d'accessibilité lorsqu'un besoin d'aménagement est signalé.</li>
</ul>
<p>Chez Atelier Sésame Formation, Inès a ajouté à sa fiche de besoin une dernière rubrique « Décisions pédagogiques prises » qu'elle remplit avant chaque session : « Groupe de cinq, trois débutants complets : exercices de prise en main ajoutés le premier matin ; une stagiaire déjà à l'aise sur les filtres : exercices d'approfondissement sur les tableaux croisés ; un besoin d'agrandissement des supports signalé : impression en corps 16 prévue. » Cette rubrique est la preuve la plus simple et la plus convaincante de l'exploitation des besoins.</p>

<blockquote><strong>À retenir.</strong> L'analyse des besoins se fait à deux niveaux : pour concevoir l'offre (opportunité, public, positionnement) et pour chaque entrée en formation (situation, projet, niveau, contraintes, adaptations). Elle remonte de la demande vers le besoin, ne collecte que les informations utiles (article L.6353-9) et se traduit par des décisions pédagogiques écrites. C'est le socle de l'indicateur 4 et de tout ce qui suit dans ce chapitre.</blockquote>
`,
      },
      {
        title: "3.2 – Formuler des objectifs opérationnels et évaluables",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Rédiger des objectifs de formation opérationnels (centrés sur une action observable en situation professionnelle) et évaluables (associés à un critère de réussite).</li>
<li>Articuler objectif général, objectifs opérationnels et objectifs pédagogiques de séquence.</li>
<li>Vérifier la cohérence entre objectifs, contenus et modalités d'évaluation, ce que l'on appelle l'alignement pédagogique.</li>
</ul>

<h3>Pourquoi les objectifs sont la colonne vertébrale de l'offre</h3>
<p>L'article L.6313-2 du Code du travail définit l'action de formation comme « un parcours pédagogique permettant d'atteindre un objectif professionnel ». Tout part donc de l'objectif. C'est lui qui permet de choisir les contenus, de dimensionner la durée, de construire l'évaluation et, à la fin, de dire si la formation a atteint son but. L'indicateur 5 du référentiel national qualité demande au prestataire de définir « les objectifs opérationnels et évaluables de la prestation » ; c'est l'un des indicateurs qui ne peuvent donner lieu qu'à une non-conformité majeure, ce qui montre son importance.</p>
<p>Un objectif mal formulé produit une formation floue, une évaluation impossible et une attestation qui ne veut rien dire. Comparez :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Formulation à éviter</th><th>Pourquoi elle pose problème</th><th>Formulation opérationnelle et évaluable</th></tr>
<tr><td>« Découvrir Excel »</td><td>« Découvrir » n'est pas observable ; aucun critère de réussite</td><td>« Saisir, mettre en forme et imprimer un tableau de suivi simple (dix colonnes, cinquante lignes) avec des totaux automatiques, sans erreur de formule. »</td></tr>
<tr><td>« Sensibiliser à l'accueil téléphonique »</td><td>La sensibilisation n'engage à rien ; on ne sait pas ce que la personne saura faire</td><td>« Prendre un appel entrant en appliquant les cinq étapes de la grille d'accueil (présentation, écoute, reformulation, réponse ou orientation, prise de congé), lors d'une simulation filmée. »</td></tr>
<tr><td>« Connaître les bases de Word »</td><td>« Connaître » est invérifiable sans précision</td><td>« Produire un courrier professionnel conforme à la norme de présentation fournie, en utilisant les styles et la mise en page, en moins de vingt minutes. »</td></tr>
<tr><td>« Être plus à l'aise à l'oral »</td><td>Ressenti subjectif, impossible à mesurer de façon fiable</td><td>« Présenter en trois minutes l'offre de services de son entreprise à un visiteur, en respectant le plan fourni, devant le groupe. »</td></tr>
</table>

<h3>Les trois composantes d'un objectif bien formulé</h3>
<ol>
<li><strong>Un verbe d'action observable</strong> : rédiger, calculer, construire, présenter, accueillir, identifier, classer, paramétrer, compléter. On bannit « connaître », « comprendre », « savoir », « maîtriser » lorsqu'ils sont employés seuls, parce qu'ils ne décrivent pas ce que l'on voit la personne faire. L'usage veut que l'on puisse faire précéder l'objectif de la mention « à l'issue de la formation, le stagiaire sera capable de ».</li>
<li><strong>Des conditions de réalisation</strong> : avec quels outils, quels documents, quelle aide, dans quel contexte (sur poste informatique, à partir d'un cas fourni, en simulation).</li>
<li><strong>Un critère de réussite</strong> : un niveau de qualité, un délai, un taux d'erreur, une conformité à une grille. C'est ce qui rend l'objectif évaluable.</li>
</ol>
<p>Un objectif peut être enrichi d'une indication sur le contexte professionnel (« dans le cadre de l'accueil d'un cabinet médical ») qui facilite l'appropriation par le stagiaire et par l'entreprise.</p>

<h3>Objectif général, objectifs opérationnels, objectifs de séquence</h3>
<p>Une formation se décrit généralement à trois niveaux, du plus large au plus fin :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Niveau</th><th>Rôle</th><th>Exemple : « Accueil physique et téléphonique en entreprise – 14 h » (fictif)</th></tr>
<tr><td>Objectif général (ou finalité)</td><td>Dit à quoi sert la formation dans la vie professionnelle ; figure en tête du programme</td><td>Assurer un accueil physique et téléphonique professionnel, qui donne une image fiable de l'entreprise et oriente correctement chaque interlocuteur.</td></tr>
<tr><td>Objectifs opérationnels</td><td>Décrivent les capacités observables visées à la fin ; ce sont eux que l'on évalue et que l'on reporte sur l'attestation</td><td>1. Accueillir un visiteur en appliquant la grille d'accueil. 2. Traiter un appel entrant et le transférer ou prendre un message complet. 3. Gérer une situation de mécontentement simple sans escalade. 4. Tenir un registre des visites et des appels conforme aux consignes.</td></tr>
<tr><td>Objectifs pédagogiques de séquence</td><td>Découpent chaque objectif opérationnel en étapes d'apprentissage ; servent au formateur pour construire le déroulé</td><td>Pour l'objectif 2 : identifier les cinq étapes de l'appel ; formuler une phrase de présentation ; reformuler une demande ; rédiger un message téléphonique complet.</td></tr>
</table>
<p>On recommande de limiter le nombre d'objectifs opérationnels : de trois à six pour une formation de deux à cinq jours. Au-delà, l'évaluation devient ingérable et le stagiaire ne perçoit plus ce qui est essentiel.</p>

<h3>S'aider d'une taxonomie pour choisir le bon niveau</h3>
<p>Les taxonomies, dont la plus connue est celle de Bloom révisée, classent les verbes d'action selon le niveau de complexité cognitive : se souvenir, comprendre, appliquer, analyser, évaluer, créer. Elles évitent deux écueils : viser trop bas (« citer les étapes de l'accueil ») alors que l'entreprise attend un savoir-faire, ou viser trop haut (« concevoir une politique d'accueil ») pour une formation de deux jours destinée à des débutants.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Niveau</th><th>Verbes possibles</th><th>Exemple en bureautique</th></tr>
<tr><td>Se souvenir</td><td>citer, nommer, repérer</td><td>Repérer les onglets du ruban utiles à la mise en forme</td></tr>
<tr><td>Comprendre</td><td>expliquer, reformuler, distinguer</td><td>Distinguer une référence relative d'une référence absolue</td></tr>
<tr><td>Appliquer</td><td>utiliser, réaliser, calculer, compléter</td><td>Calculer des totaux et des moyennes avec les fonctions adaptées</td></tr>
<tr><td>Analyser</td><td>comparer, diagnostiquer, classer</td><td>Diagnostiquer pourquoi une formule renvoie une erreur</td></tr>
<tr><td>Évaluer</td><td>vérifier, justifier, choisir</td><td>Choisir le type de graphique adapté à un message</td></tr>
<tr><td>Créer</td><td>concevoir, construire, élaborer</td><td>Construire un tableau de bord mensuel à partir de données brutes</td></tr>
</table>

<h3>L'alignement pédagogique : objectifs, contenus et évaluation doivent se répondre</h3>
<p>Un objectif opérationnel n'a de sens que s'il est travaillé pendant la formation et évalué à la fin. L'outil le plus simple pour le vérifier est une <strong>matrice d'alignement</strong> en trois colonnes, que l'on présente utilement à l'auditeur pour les indicateurs 5, 6 et 11.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Objectif opérationnel</th><th>Contenus et activités qui le travaillent</th><th>Modalité d'évaluation et critère de réussite</th></tr>
<tr><td>Accueillir un visiteur en appliquant la grille d'accueil</td><td>Apport sur les étapes de l'accueil, observation de deux vidéos, jeux de rôle par binômes</td><td>Mise en situation observée par la formatrice avec la grille ; réussite si quatre étapes sur cinq sont correctement réalisées</td></tr>
<tr><td>Traiter un appel entrant et prendre un message complet</td><td>Écoute d'enregistrements fictifs, exercices de reformulation, simulations téléphoniques</td><td>Simulation d'appel ; message vérifié avec la liste des sept rubriques obligatoires (nom, société, objet, coordonnées, date, heure, suite à donner)</td></tr>
<tr><td>Gérer une situation de mécontentement simple</td><td>Méthode d'écoute active, phrases d'apaisement, cas pratiques</td><td>Jeu de rôle évalué sur une grille de trois critères (écoute, absence d'escalade, solution ou orientation proposée)</td></tr>
<tr><td>Tenir un registre des visites et des appels</td><td>Démonstration, exercice sur un registre modèle</td><td>Registre complété à partir d'un scénario de dix événements ; réussite si au moins neuf sont correctement enregistrés</td></tr>
</table>
<p>Si une ligne n'a pas d'activité, l'objectif n'est pas travaillé ; si une ligne n'a pas d'évaluation, l'objectif n'est pas vérifiable ; si une activité n'est rattachée à aucun objectif, elle est peut-être inutile. La matrice se construit en même temps que le programme et se révise après chaque session.</p>

<blockquote><strong>À retenir.</strong> Un objectif opérationnel décrit ce que le stagiaire saura faire, de façon observable, dans des conditions données, avec un critère de réussite. On distingue l'objectif général, trois à six objectifs opérationnels et des objectifs de séquence. La matrice d'alignement objectifs / activités / évaluation garantit la cohérence de l'offre et constitue une preuve directe pour les indicateurs 5, 6 et 11.</blockquote>
`,
      },
      {
        title: "3.3 – Construire le programme et informer le public : les mentions indispensables",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Lister les informations qu'un programme de formation doit contenir pour respecter le Code du travail et le référentiel national qualité.</li>
<li>Rédiger chaque rubrique du programme de façon claire, exacte et vérifiable.</li>
<li>Organiser la diffusion de l'information (site internet, fiche programme, catalogue) et sa mise à jour.</li>
</ul>

<h3>Deux sources d'obligations qui se complètent</h3>
<p>Le contenu de l'information remise au futur stagiaire découle de deux séries de règles.</p>
<p><strong>Le Code du travail</strong>, d'abord. L'article L.6353-8 prévoit que les objectifs et le contenu de la formation, la liste des formateurs et des enseignants, les horaires, les modalités d'évaluation, les coordonnées de la personne chargée des relations avec les stagiaires par l'entité commanditaire de la formation et le règlement intérieur applicable à la formation sont mis à disposition du stagiaire avant son inscription définitive. Lorsque la formation est suivie par une personne physique à titre individuel et à ses frais (contrat de l'article L.6353-3), s'y ajoutent les tarifs, les modalités de règlement et les conditions financières prévues en cas de cessation anticipée de la formation ou d'abandon en cours de stage ; ces informations doivent être remises au stagiaire potentiel avant son inscription définitive et avant tout règlement de frais.</p>
<p><strong>Le référentiel national qualité</strong>, ensuite. Son indicateur 1 demande une information accessible au public, détaillée et vérifiable, sur les prestations proposées : prérequis, objectifs, durée, modalités et délais d'accès, tarifs, contacts, méthodes mobilisées et modalités d'évaluation, accessibilité aux personnes handicapées. Le guide de lecture précise que l'information doit être exhaustive (tous les items), datée et actualisée. Même un organisme qui ne vise pas encore la certification a intérêt à respecter cette liste : c'est elle qu'un financeur, un prescripteur ou un client averti s'attend à trouver.</p>

<h3>La fiche programme rubrique par rubrique</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Ce qu'elle doit dire</th><th>Erreur fréquente</th></tr>
<tr><td>Intitulé</td><td>Un titre explicite qui décrit la compétence visée</td><td>Un titre publicitaire (« Devenez un as du bureau ») qui ne dit pas de quoi il s'agit</td></tr>
<tr><td>Public visé</td><td>Les personnes à qui la formation s'adresse (fonctions, situations)</td><td>« Tout public », sans plus de précision</td></tr>
<tr><td>Prérequis</td><td>Ce qu'il faut savoir ou avoir pour suivre la formation dans de bonnes conditions, et comment c'est vérifié ; « aucun » est possible mais doit être assumé</td><td>Confondre prérequis et public visé ; afficher des prérequis jamais vérifiés</td></tr>
<tr><td>Objectifs</td><td>L'objectif général et les objectifs opérationnels (section 3.2)</td><td>Une liste de thèmes au lieu d'objectifs</td></tr>
<tr><td>Contenu</td><td>Les grandes parties du programme, dans l'ordre, avec si possible un découpage par demi-journée</td><td>Un contenu trop vague ou, à l'inverse, une liste de cent fonctions de logiciel</td></tr>
<tr><td>Durée</td><td>Le nombre d'heures et, le cas échéant, de jours ; la répartition entre présentiel, distanciel et travail personnel</td><td>Annoncer des jours sans préciser les heures</td></tr>
<tr><td>Modalités</td><td>Présentiel, à distance, mixte ; inter ou intra-entreprise ; effectif minimal et maximal</td><td>Ne pas préciser que la session peut être reportée si l'effectif minimal n'est pas atteint</td></tr>
<tr><td>Délais d'accès</td><td>Le temps qui s'écoule entre la demande et l'entrée effective en formation, et les dates des prochaines sessions</td><td>Oublier cette rubrique, très souvent relevée en audit</td></tr>
<tr><td>Méthodes mobilisées</td><td>Les méthodes pédagogiques (apports, démonstrations, exercices, mises en situation, études de cas) et les moyens (salle, postes, supports remis)</td><td>« Méthode active et participative », formule creuse</td></tr>
<tr><td>Modalités d'évaluation</td><td>Le positionnement à l'entrée, les évaluations en cours et à la fin, le document remis (attestation)</td><td>Ne mentionner que le questionnaire de satisfaction, qui n'évalue pas les acquis</td></tr>
<tr><td>Tarif</td><td>Le prix, en précisant s'il est net de taxe (exonération de TVA) ou hors taxe, et ce qu'il comprend</td><td>Un prix « à partir de » sans indication de ce qui le fait varier</td></tr>
<tr><td>Accessibilité</td><td>Les conditions d'accès des personnes en situation de handicap, le contact de la référente handicap, les adaptations possibles</td><td>« Nos locaux sont accessibles » sans vérification ni contact</td></tr>
<tr><td>Contacts</td><td>Le nom ou la fonction, le téléphone et l'adresse électronique de l'interlocuteur pour les questions administratives et pédagogiques</td><td>Un simple formulaire de contact sans interlocuteur identifié</td></tr>
<tr><td>Formateurs</td><td>La liste des intervenants et leurs qualifications ; l'article L.6353-8 vise la liste des formateurs, l'article L.6353-4 leurs diplômes, titres ou références dans le contrat avec un particulier</td><td>Ne rien dire des intervenants</td></tr>
<tr><td>Indicateurs de résultats</td><td>Les résultats obtenus (taux de satisfaction, taux d'atteinte des objectifs, taux d'abandon) avec leur période et leur base de calcul</td><td>Des taux non datés ou sans effectif (« 100 % de satisfaction »)</td></tr>
<tr><td>Date de mise à jour</td><td>La date de la dernière version de la fiche</td><td>Absence de date, qui empêche de démontrer l'actualisation</td></tr>
</table>

<h3>Rédiger les délais d'accès sans s'engager au-delà du possible</h3>
<p>Les délais d'accès sont l'une des rubriques les plus souvent absentes. Ils répondent à une question simple du futur stagiaire : « Si je m'inscris aujourd'hui, quand pourrai-je commencer ? » Pour un organisme qui travaille avec des particuliers, ce délai doit tenir compte du délai de rétractation de dix jours prévu par l'article L.6353-5 (section 3.6) : aucune somme ne pouvant être exigée avant la fin de ce délai, il est raisonnable de ne pas faire commencer la formation avant son expiration. Exemple de rédaction chez Atelier Sésame Formation :</p>
<blockquote>« Délais d'accès : l'inscription est possible jusqu'à quinze jours avant le début de la session, sous réserve de places disponibles, afin de respecter le délai de rétractation de dix jours prévu par le Code du travail pour les personnes qui financent elles-mêmes leur formation. Pour une entreprise, le délai moyen entre la demande et la réalisation d'une session intra est de trois à six semaines. Prochaines sessions : voir le calendrier en ligne, mis à jour chaque mois. »</blockquote>
<p>Ce texte est vérifiable (on peut contrôler les dates d'inscription et de début de session) et réaliste. Il évite les promesses du type « démarrage immédiat » que l'organisme ne pourrait pas tenir avec un particulier.</p>

<h3>Le tarif : clarté et cohérence avec le régime de TVA</h3>
<p>Le tarif affiché doit être celui que le stagiaire paiera. Pour un organisme qui bénéficie de l'exonération de TVA des activités de formation professionnelle continue (article 261-4-4° du Code général des impôts, vu au chapitre 2), le prix s'affiche « net de taxe » avec la mention de l'exonération. Un organisme assujetti affiche ses prix hors taxe et toutes taxes comprises ; envers les particuliers, c'est le prix toutes taxes comprises qui doit apparaître. On précise ce que comprend le prix (supports, accès à des ressources en ligne, repas éventuels) et ce qu'il ne comprend pas (transport, hébergement).</p>
<p>La formation « Gérer son centre de formation » que vous suivez illustre une offre à prix unique pour un public de particuliers : 1 575 € par stagiaire pour 35 heures, soit 45 € de l'heure, sans frais supplémentaires.</p>

<h3>Accessibilité : une rubrique qui engage</h3>
<p>La rubrique accessibilité ne se limite pas aux locaux. Elle dit au futur stagiaire en situation de handicap : voici qui contacter, voici ce que nous pouvons adapter, voici ce que nous ne pouvons pas faire nous-mêmes et vers qui nous vous orienterons. Exemple :</p>
<blockquote>« Accessibilité : nos locaux sont situés en rez-de-chaussée et accessibles aux personnes à mobilité réduite (vérification effectuée le [date]). Les supports peuvent être fournis en grands caractères ou au format numérique. Pour tout besoin d'adaptation (rythme, matériel, accompagnement), contactez notre référente handicap au [téléphone] ou à [adresse électronique] avant votre inscription : nous étudierons avec vous les aménagements possibles et, si nécessaire, nous solliciterons les partenaires spécialisés. »</blockquote>
<p>Le contenu exact dépend évidemment des locaux réels ; l'organisme n'affiche que ce qu'il a vérifié. Le chapitre 7 reviendra sur le rôle de la référente handicap et sur le réseau de partenaires (indicateur 26).</p>

<h3>Diffuser et mettre à jour l'information</h3>
<p>L'information doit être <strong>accessible au public</strong>, ce qui signifie concrètement qu'une personne qui ne connaît pas l'organisme peut la trouver : page du site internet, fiche téléchargeable, catalogue, affichage. Une fiche remise uniquement après inscription ne suffit pas. Trois bonnes pratiques :</p>
<ul>
<li><strong>Une source unique</strong> : une seule fiche par formation, dont dérivent la page du site et le document remis ; cela évite les incohérences (une durée de 14 h sur le site et de 12 h sur la fiche).</li>
<li><strong>Un versionnement visible</strong> : un numéro de version et une date de mise à jour en pied de page.</li>
<li><strong>Une revue périodique</strong> : au moins une fois par an, et à chaque changement de prix, de lieu, de durée ou de contenu. Inès a inscrit cette revue dans son calendrier annuel, en janvier, au moment où elle calcule ses indicateurs de résultats de l'année écoulée.</li>
</ul>

<h3>Les indicateurs de résultats : afficher des chiffres justes</h3>
<p>L'indicateur 2 du référentiel demande la diffusion d'indicateurs de résultats adaptés à la nature des prestations et des publics. Pour une formation non certifiante comme celles d'Atelier Sésame, on retient par exemple : nombre de stagiaires formés sur la période, taux de satisfaction, taux d'atteinte des objectifs mesuré par l'évaluation finale, taux d'abandon. Chaque chiffre est accompagné de sa période et de sa base (« sur 42 stagiaires formés entre janvier et décembre 2025 »). Un organisme qui débute et n'a pas encore de résultats l'indique honnêtement ; il ne publie pas de chiffres inventés ou empruntés. Les formations conduisant à une certification professionnelle doivent en outre afficher les taux d'obtention et les informations prévues par l'indicateur 3 ; cela ne concerne pas les formations non certifiantes.</p>

<blockquote><strong>À retenir.</strong> Le programme rassemble les informations exigées par l'article L.6353-8 (objectifs, contenu, formateurs, horaires, évaluation, contact, règlement intérieur, et pour les particuliers tarifs, modalités de règlement et conditions en cas d'abandon) et par l'indicateur 1 (prérequis, objectifs, durée, modalités et délais d'accès, tarifs, contacts, méthodes, évaluation, accessibilité). Il est accessible au public, exact, daté et mis à jour, et s'accompagne d'indicateurs de résultats honnêtes.</blockquote>
`,
      },
      {
        title: "3.4 – Concevoir le déroulé, le positionnement et les modalités d'évaluation",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Construire un déroulé pédagogique séquencé, cohérent avec les objectifs et la durée.</li>
<li>Mettre en place un positionnement à l'entrée et vérifier les prérequis.</li>
<li>Choisir et outiller les modalités d'évaluation des acquis (diagnostique, formative, sommative) et distinguer évaluation des acquis et mesure de la satisfaction.</li>
</ul>

<h3>Du programme au déroulé pédagogique</h3>
<p>Le programme est destiné au public ; le <strong>déroulé pédagogique</strong> (ou scénario pédagogique) est l'outil de travail du formateur. Il découpe la formation en séquences, précise pour chacune l'objectif, la durée, la méthode, l'activité des stagiaires, les supports et l'évaluation éventuelle. C'est ce document qui permet de démontrer, au titre de l'indicateur 6, que les contenus et les modalités de mise en œuvre sont adaptés aux objectifs et aux publics.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Séquence</th><th>Durée</th><th>Objectif de séquence</th><th>Méthode et activité</th><th>Supports</th><th>Évaluation</th></tr>
<tr><td>Accueil et positionnement</td><td>45 min</td><td>Faire connaissance, présenter le déroulement, situer chacun</td><td>Tour de table guidé, test de positionnement de quinze questions</td><td>Livret d'accueil, test papier ou en ligne</td><td>Diagnostique</td></tr>
<tr><td>Les cinq étapes de l'accueil</td><td>1 h 15</td><td>Identifier les étapes et leur fonction</td><td>Apport illustré, analyse de deux vidéos d'accueil fictives</td><td>Diaporama, grille d'accueil</td><td>Questions orales</td></tr>
<tr><td>Accueil physique en situation</td><td>1 h 30</td><td>Accueillir un visiteur avec la grille</td><td>Jeux de rôle par trois (accueillant, visiteur, observateur)</td><td>Fiches de scénarios, grille d'observation</td><td>Formative, retour entre pairs</td></tr>
<tr><td>Bilan de la demi-journée</td><td>15 min</td><td>Repérer ce qui est acquis et ce qui reste à travailler</td><td>Tour de table, questions</td><td>Tableau des acquis</td><td>Autoévaluation</td></tr>
</table>
<p>Un bon déroulé alterne les méthodes : une règle pratique consiste à ne pas dépasser vingt à trente minutes d'apport continu et à faire pratiquer les stagiaires au moins la moitié du temps lorsqu'il s'agit d'un savoir-faire. Il prévoit les pauses, un temps de bilan à chaque fin de demi-journée et une marge pour les imprévus.</p>

<h3>Choisir les méthodes en fonction de l'objectif</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Méthode</th><th>Principe</th><th>Adaptée pour</th><th>Point de vigilance</th></tr>
<tr><td>Expositive (apport)</td><td>Le formateur transmet un contenu structuré</td><td>Poser un cadre, des règles, des définitions</td><td>Courte, illustrée, suivie d'une application</td></tr>
<tr><td>Démonstrative</td><td>Le formateur montre, le stagiaire reproduit</td><td>Manipulations sur logiciel, gestes techniques</td><td>Rythme adapté, aide individuelle</td></tr>
<tr><td>Interrogative</td><td>Le formateur fait découvrir par des questions</td><td>Faire émerger les représentations, réactiver des acquis</td><td>Prévoir des relances pour les plus discrets</td></tr>
<tr><td>Active ou expérientielle</td><td>Le stagiaire agit (cas, simulation, projet) puis analyse</td><td>Savoir-faire relationnels, résolution de problèmes</td><td>Consignes écrites claires, débriefing systématique</td></tr>
<tr><td>Apprentissage entre pairs</td><td>Les stagiaires s'expliquent mutuellement</td><td>Groupes hétérogènes, consolidation</td><td>Encadrer pour éviter la transmission d'erreurs</td></tr>
</table>

<h3>Le positionnement à l'entrée</h3>
<p>Le positionnement a deux fonctions : <strong>vérifier les prérequis</strong> (la personne peut-elle suivre la formation ?) et <strong>situer le niveau de départ</strong> (que sait-elle déjà, sur quoi faudra-t-il insister ?). L'indicateur 8 du référentiel demande au prestataire de déterminer les procédures de positionnement et d'évaluation des acquis à l'entrée de la prestation. Il vise les actions de formation et l'apprentissage ; il ne s'applique pas aux bilans de compétences ni à la VAE, qui ont leurs propres logiques d'entrée.</p>
<p>La procédure de positionnement répond à quatre questions :</p>
<ol>
<li><strong>Quand ?</strong> Avant l'inscription définitive pour les prérequis (afin de ne pas faire signer un contrat à une personne qui ne pourra pas suivre), et au début de la formation pour le niveau détaillé.</li>
<li><strong>Comment ?</strong> Questionnaire d'autoévaluation, test de connaissances, exercice pratique court, entretien.</li>
<li><strong>Avec quels critères ?</strong> Par exemple : « savoir utiliser un clavier et une souris, ouvrir et enregistrer un fichier » pour une initiation bureautique.</li>
<li><strong>Que se passe-t-il si les prérequis ne sont pas remplis ?</strong> La procédure doit le prévoir : réorientation vers une formation plus adaptée, module de remise à niveau, report, ou entrée avec un accompagnement renforcé si l'écart est faible. On note la décision et sa justification.</li>
</ol>
<p>Chez Atelier Sésame Formation, Inès utilise un test de positionnement en ligne de vingt questions et trois manipulations pour ses formations bureautiques. Le résultat est commenté au téléphone avec le futur stagiaire avant l'envoi du contrat. Elle a ainsi orienté deux personnes vers un atelier d'initiation numérique gratuit proposé par une structure de son territoire, plutôt que de les inscrire à une formation sur tableur qu'elles n'auraient pas pu suivre.</p>

<h3>Les trois temps de l'évaluation des acquis</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Évaluation</th><th>Moment</th><th>Fonction</th><th>Outils</th></tr>
<tr><td>Diagnostique</td><td>Avant ou au début de la formation</td><td>Situer le niveau de départ, adapter</td><td>Test de positionnement, autoévaluation, entretien</td></tr>
<tr><td>Formative</td><td>Pendant la formation</td><td>Aider le stagiaire à progresser, corriger les erreurs, ajuster le rythme</td><td>Exercices corrigés, quiz, retours sur mises en situation, autoévaluation de fin de journée</td></tr>
<tr><td>Sommative (ou finale)</td><td>À la fin de la formation</td><td>Mesurer l'atteinte des objectifs opérationnels</td><td>Étude de cas, épreuve pratique, mise en situation avec grille, questionnaire de connaissances</td></tr>
</table>
<p>L'indicateur 11 demande au prestataire d'évaluer l'atteinte par les publics bénéficiaires des objectifs de la prestation. Le guide de lecture attend un processus d'évaluation formalisé et mis en œuvre, qui permet d'apprécier l'atteinte des objectifs. Concrètement, l'auditeur demandera à voir, pour quelques stagiaires, les évaluations réalisées et la façon dont les résultats ont été exploités.</p>

<h3>Construire une grille d'évaluation</h3>
<p>Une grille d'évaluation transforme un objectif opérationnel en critères observables. Elle rend l'évaluation plus juste (le même référentiel pour tous), plus transparente (le stagiaire sait ce qui est attendu) et plus facile à tracer. Exemple pour l'objectif « Traiter un appel entrant et prendre un message complet » :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Indicateur observable</th><th>Acquis</th><th>En cours</th><th>Non acquis</th></tr>
<tr><td>Présentation</td><td>Annonce le nom de l'entreprise et son prénom, ton clair</td><td></td><td></td><td></td></tr>
<tr><td>Écoute et reformulation</td><td>Reformule la demande avant d'y répondre</td><td></td><td></td><td></td></tr>
<tr><td>Orientation</td><td>Transfère vers le bon interlocuteur ou propose de prendre un message</td><td></td><td></td><td></td></tr>
<tr><td>Message</td><td>Le message comporte les sept rubriques attendues, sans erreur sur les coordonnées</td><td></td><td></td><td></td></tr>
<tr><td>Prise de congé</td><td>Annonce la suite et remercie</td><td></td><td></td><td></td></tr>
</table>
<p>Le seuil de réussite est annoncé à l'avance (par exemple, quatre critères sur cinq acquis, dont obligatoirement le message). Les résultats sont reportés sur l'attestation de fin de formation (section 3.7).</p>

<h3>Ne pas confondre évaluation des acquis et satisfaction</h3>
<p>Le questionnaire de satisfaction (« Êtes-vous satisfait de la formation ? Le formateur était-il clair ? ») mesure la perception du stagiaire. Il est indispensable, mais il relève du critère 7 du référentiel (recueil des appréciations, indicateur 30) et non de l'évaluation des acquis. Un organisme qui présente uniquement des questionnaires de satisfaction pour démontrer l'atteinte des objectifs s'expose à une non-conformité sur l'indicateur 11. On peut, en revanche, compléter l'évaluation par une <strong>évaluation à froid</strong>, quelques semaines après la formation, qui interroge le stagiaire (et, pour un salarié, son responsable) sur la mise en pratique des acquis.</p>

<h3>Adapter et différencier pendant la formation</h3>
<p>L'indicateur 10 demande au prestataire de mettre en œuvre et d'adapter la prestation, l'accompagnement et le suivi aux publics bénéficiaires. Le déroulé doit donc prévoir des marges : exercices de niveaux différents, temps d'accompagnement individuel, possibilité de revenir sur une notion. Les adaptations décidées sont tracées, par exemple dans un bref journal de session tenu par le formateur : « Mardi après-midi : deux stagiaires en difficulté sur les formules, exercice de rattrapage proposé pendant que le groupe travaillait sur la mise en forme. » Cette trace simple répond à une question que l'auditeur pose systématiquement : « Comment avez-vous adapté la formation à ce groupe ? »</p>
<p>L'indicateur 12, enfin, demande de décrire et de mettre en œuvre des mesures pour favoriser l'engagement des bénéficiaires et prévenir les ruptures de parcours. Pour une formation courte en présentiel, ces mesures sont simples mais doivent être écrites : rappel la veille de la session, appel le jour même en cas d'absence non prévenue, possibilité de rattraper une demi-journée manquée lors d'une session ultérieure, échange individuel avec un stagiaire qui décroche.</p>

<blockquote><strong>À retenir.</strong> Le déroulé pédagogique séquence la formation et relie chaque activité à un objectif. Le positionnement vérifie les prérequis avant l'inscription et situe le niveau au départ, avec une solution prévue quand les prérequis ne sont pas remplis. L'évaluation combine diagnostic, évaluations formatives et évaluation finale outillée par des grilles ; elle ne se confond pas avec la satisfaction. Indicateurs concernés : 6, 8, 10, 11 et 12.</blockquote>
`,
      },
      {
        title: "3.5 – Contractualiser avec une entreprise : devis, convention et conditions générales",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Identifier le document contractuel requis lorsqu'une entreprise (ou tout autre acheteur) achète une action de formation.</li>
<li>Rédiger une convention de formation conforme à l'article D.6353-1 du Code du travail, ou un devis valant convention.</li>
<li>Prévoir des conditions générales de vente professionnelles claires : commande, prix, facturation, annulation, report, responsabilité.</li>
</ul>

<h3>Le principe : une convention entre l'acheteur et l'organisme</h3>
<p>L'article L.6353-1 du Code du travail pose la règle : pour la réalisation des actions de formation mentionnées à l'article L.6313-1, une convention est conclue entre l'acheteur et l'organisme qui les dispense, selon des modalités déterminées par décret. L'acheteur est le plus souvent l'employeur du salarié, mais ce peut être aussi un financeur public, une association ou un autre organisme (en cas de sous-traitance, traitée au chapitre 7).</p>
<p>L'article D.6353-1 en précise le contenu. La convention indique notamment :</p>
<ul>
<li>l'intitulé, l'objectif et le contenu de l'action, les moyens prévus, la durée et la période de réalisation ;</li>
<li>le prix de l'action et les modalités de règlement.</li>
</ul>
<p>Le même article admet que des <strong>bons de commande ou des devis approuvés</strong> par l'acheteur tiennent lieu de convention, à condition de comporter ces mêmes mentions. Pour les formations financées par le compte personnel de formation via la plateforme gérée par la Caisse des Dépôts, ce sont les conditions générales d'utilisation du service dématérialisé qui tiennent lieu de convention ; ce point ne concerne que les formations éligibles au CPF, ce qui n'est pas le cas des formations non certifiantes (chapitre 5).</p>
<p>On notera que l'ancien article L.6353-2, qui imposait des mentions obligatoires dans les conventions, a été abrogé au 1er janvier 2019 : les exigences sont désormais concentrées dans l'article D.6353-1. Beaucoup de modèles anciens circulent encore avec des références périmées ; vérifiez systématiquement les articles cités dans vos documents.</p>

<h3>Ce qu'une bonne convention contient en pratique</h3>
<p>Au-delà des mentions réglementaires, une convention utile protège les deux parties et facilite le travail administratif. Voici la structure recommandée, utilisée par Atelier Sésame Formation pour ses clients entreprises :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Article</th><th>Contenu</th><th>Commentaire</th></tr>
<tr><td>Parties</td><td>Dénomination, adresse, SIRET de l'acheteur ; raison sociale, adresse, SIRET et numéro de déclaration d'activité de l'organisme</td><td>Le numéro de déclaration d'activité est demandé par les financeurs ; on rappelle qu'il ne vaut pas agrément de l'État</td></tr>
<tr><td>Objet</td><td>Intitulé de l'action, nature (action de formation au sens de l'article L.6313-1), objectifs, programme annexé</td><td>Le programme en annexe évite de surcharger la convention</td></tr>
<tr><td>Bénéficiaires</td><td>Nom des stagiaires ou nombre de participants</td><td>Les noms peuvent être transmis plus tard, avant le début de la session</td></tr>
<tr><td>Dates, durée, lieu, horaires</td><td>Période de réalisation, nombre d'heures, adresse, horaires</td><td>Préciser si la formation se déroule chez le client ou dans les locaux de l'organisme</td></tr>
<tr><td>Moyens</td><td>Moyens pédagogiques et techniques, nom ou profil du formateur</td><td>Si le client fournit la salle et les postes, le dire</td></tr>
<tr><td>Modalités d'évaluation et de suivi</td><td>Positionnement, évaluations, émargement, attestation et documents remis</td><td>Cohérent avec le programme</td></tr>
<tr><td>Prix</td><td>Prix total, détail éventuel, mention de l'exonération de TVA le cas échéant</td><td>Pour une formation intra : prix par jour ou forfait par groupe</td></tr>
<tr><td>Modalités de règlement</td><td>Échéance, moyen de paiement, éventuelle subrogation de paiement à un OPCO</td><td>Si l'OPCO paie directement l'organisme, le prévoir et préciser ce qui reste à la charge de l'entreprise</td></tr>
<tr><td>Annulation, report, absence</td><td>Délais et conséquences financières</td><td>Voir ci-dessous</td></tr>
<tr><td>Différends</td><td>Recherche d'une solution amiable, juridiction compétente</td><td>Entre professionnels, une clause attributive de compétence est possible</td></tr>
<tr><td>Signatures</td><td>Date, nom et qualité des signataires</td><td>La convention est signée avant le début de la formation</td></tr>
</table>

<h3>Annulation, report et absence : écrire des règles équilibrées</h3>
<p>Les conditions d'annulation sont la source la plus fréquente de litiges. Elles doivent être annoncées avant la commande, écrites dans les conditions générales de vente et rappelées dans la convention. On distingue généralement :</p>
<ul>
<li><strong>L'annulation par le client</strong> : sans frais si elle intervient suffisamment tôt (par exemple plus de quinze jours avant le début), avec une indemnité forfaitaire au-delà. Le montant doit rester proportionné au préjudice réel (salle réservée, formateur mobilisé). Il est d'usage de proposer un report ou le remplacement du stagiaire par un collègue, sans frais.</li>
<li><strong>L'absence d'un stagiaire</strong> : la convention précise si les heures non suivies sont facturées. Attention : un financeur ne prend en charge que les heures réellement suivies. Si une indemnité est facturée au client pour une absence, elle doit être facturée séparément, en tant qu'indemnité, et non présentée comme des heures de formation. Elle ne peut pas être imputée sur un financement de formation.</li>
<li><strong>L'annulation ou le report par l'organisme</strong> : effectif minimal non atteint, indisponibilité du formateur, événement extérieur. L'organisme s'engage à prévenir dans un délai annoncé, à proposer une nouvelle date et, à défaut, à rembourser les sommes versées.</li>
</ul>
<p>Exemple de clause chez Atelier Sésame Formation (entreprises) :</p>
<blockquote>« Toute annulation par le client doit être notifiée par écrit. Si elle intervient plus de quinze jours calendaires avant le début de la session, aucune somme n'est due. Entre quinze et cinq jours, une indemnité de 30 % du prix est facturée ; à moins de cinq jours, une indemnité de 50 % du prix est facturée. Ces indemnités ne constituent pas des dépenses de formation et ne peuvent faire l'objet d'une prise en charge par un financeur. Le client peut, sans frais, remplacer un stagiaire par un autre salarié répondant aux prérequis ou reporter son inscription sur une session ultérieure dans un délai de six mois. »</blockquote>
<p>Les pourcentages de cet exemple sont des choix commerciaux de l'organisme fictif, non des montants fixés par un texte : chaque organisme fixe les siens, de façon proportionnée.</p>

<h3>Les conditions générales de vente professionnelles</h3>
<p>Les conditions générales de vente (CGV) constituent, entre professionnels, le socle de la négociation commerciale. Le Code de commerce impose de les communiquer à tout acheteur professionnel qui en fait la demande et encadre les mentions relatives au paiement (délais de paiement, pénalités de retard, indemnité forfaitaire pour frais de recouvrement). Pour un organisme de formation, les CGV traitent en outre de la commande, des documents remis (convention, convocation, attestation), de la prise en charge par un financeur, des conditions d'annulation, de la propriété intellectuelle des supports et de la protection des données. Elles sont accessibles sur le site et annexées ou référencées dans chaque devis.</p>
<p>Les mentions de facturation (numéro, date, identification des parties, désignation, prix, mention d'exonération de TVA) seront détaillées au chapitre 6. Retenez dès maintenant qu'un devis signé, une convention signée et une facture doivent porter <strong>les mêmes informations</strong> (intitulé, dates, durée, prix) : les incohérences entre ces documents sont un signal d'alerte pour un financeur ou un contrôleur.</p>

<h3>Le parcours documentaire d'une formation achetée par une entreprise</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Document</th><th>Qui le produit</th><th>Moment</th></tr>
<tr><td>1</td><td>Analyse du besoin (fiche de cadrage)</td><td>Organisme, avec l'entreprise</td><td>Avant le devis</td></tr>
<tr><td>2</td><td>Devis et programme</td><td>Organisme</td><td>Après l'analyse</td></tr>
<tr><td>3</td><td>Convention (ou devis signé valant convention) et CGV</td><td>Organisme, signée par les deux parties</td><td>Avant le début, et avant la demande de prise en charge à l'OPCO le cas échéant</td></tr>
<tr><td>4</td><td>Convocation avec informations pratiques et règlement intérieur</td><td>Organisme</td><td>Quelques jours avant la session</td></tr>
<tr><td>5</td><td>Feuilles d'émargement, évaluations</td><td>Organisme, signées par les stagiaires et le formateur</td><td>Pendant la formation</td></tr>
<tr><td>6</td><td>Attestation de fin de formation, certificat de réalisation</td><td>Organisme</td><td>À la fin</td></tr>
<tr><td>7</td><td>Facture</td><td>Organisme</td><td>À la fin ou selon l'échéancier</td></tr>
<tr><td>8</td><td>Questionnaires de satisfaction (à chaud, à froid), retour du commanditaire</td><td>Organisme</td><td>À la fin et quelques semaines après</td></tr>
</table>

<h3>Exemple du fil rouge : la demande de Vergers de l'Yvette</h3>
<p>La société fictive Vergers de l'Yvette, exploitation arboricole avec une boutique de vente directe, souhaite former ses deux salariées de l'accueil à la gestion des appels et des réclamations. Inès conduit un entretien de cadrage avec la gérante, adresse un questionnaire aux deux salariées, puis propose une formation intra de 14 heures dans la boutique, un lundi et un mardi, jours de fermeture au public. Le devis reprend l'intitulé, les objectifs, le programme en annexe, les dates, la durée, le lieu, le nom de la formatrice, le prix forfaitaire du groupe et les modalités de règlement. La gérante le signe : il vaut convention, car il comporte toutes les mentions de l'article D.6353-1. Inès conserve le devis signé, le compte rendu de l'entretien de cadrage et les questionnaires : ce sont les preuves des indicateurs 4 et 6 pour cette action.</p>

<blockquote><strong>À retenir.</strong> Une action de formation achetée par une entreprise donne lieu à une convention (article L.6353-1) dont le contenu est fixé par l'article D.6353-1 : intitulé, objectif, contenu, moyens, durée et période, prix et modalités de règlement. Un devis ou un bon de commande approuvé qui comporte ces mentions en tient lieu. Les CGV fixent des règles d'annulation proportionnées, et les indemnités de dédit ne sont jamais présentées comme des heures de formation.</blockquote>
`,
      },
      {
        title: "3.6 – Contractualiser avec une personne physique : le contrat de formation professionnelle",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Identifier les situations dans lesquelles un contrat de formation professionnelle doit être conclu avec un particulier.</li>
<li>Rédiger un contrat comportant les mentions exigées « à peine de nullité » par l'article L.6353-4.</li>
<li>Appliquer correctement le délai de rétractation, les règles de paiement et les règles de rupture prévues par les articles L.6353-5 à L.6353-7.</li>
</ul>

<h3>Quand un contrat est-il obligatoire ?</h3>
<p>L'article L.6353-3 du Code du travail prévoit que lorsqu'une personne physique entreprend une formation, à titre individuel et à ses frais, un contrat est conclu entre elle et le dispensateur de formation. C'est la situation de la plupart des stagiaires d'Atelier Sésame Formation, et c'est aussi celle des stagiaires de la formation que vous suivez : des personnes qui financent elles-mêmes leur formation, sans prise en charge par un employeur ou un financeur.</p>
<p>Ce contrat est un document protecteur, voulu par le législateur pour éviter les abus : inscriptions précipitées, paiements intégraux avant le début, programmes flous. Ses règles sont d'ordre public : un organisme ne peut pas y déroger au détriment du stagiaire, même avec l'accord de celui-ci.</p>

<h3>Les mentions obligatoires de l'article L.6353-4</h3>
<p>Le contrat précise, <strong>à peine de nullité</strong> :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Mention (article L.6353-4)</th><th>Traduction concrète dans le contrat</th></tr>
<tr><td>1° La nature, la durée, le programme et l'objet des actions de formation qu'il prévoit ainsi que les effectifs qu'elles concernent</td><td>Intitulé, nature d'action de formation, objectifs, programme annexé, nombre d'heures et de jours, dates et horaires, lieu, effectif minimal et maximal du groupe</td></tr>
<tr><td>2° Le niveau de connaissances préalables requis pour suivre la formation et obtenir les qualifications auxquelles elle prépare</td><td>Prérequis et modalités de leur vérification (positionnement) ; pour une formation non certifiante, on indique qu'aucune certification n'est préparée</td></tr>
<tr><td>3° Les conditions dans lesquelles la formation est donnée aux stagiaires, notamment les modalités de formation dans le cas des formations réalisées en tout ou en partie à distance, les moyens pédagogiques et techniques mis en œuvre ainsi que les modalités de contrôle des connaissances et la nature de la sanction éventuelle de la formation</td><td>Présentiel ou distance, méthodes, moyens (salle, postes, supports), évaluations prévues, document délivré à la fin (attestation de fin de formation)</td></tr>
<tr><td>4° Les diplômes, titres ou références des personnes chargées de la formation prévue par le contrat</td><td>Nom et qualifications de la formatrice ou des formateurs (diplômes, expérience professionnelle, expérience de formation)</td></tr>
<tr><td>5° Les modalités de paiement ainsi que les conditions financières prévues en cas de cessation anticipée de la formation ou d'abandon en cours de stage</td><td>Prix, échéancier respectant l'article L.6353-6, sort des sommes en cas d'abandon ou de rupture pour force majeure</td></tr>
</table>
<p>Un contrat nul expose l'organisme à devoir restituer les sommes perçues. L'oubli le plus fréquent concerne la mention 4 (qualifications du formateur) et la mention 5 (conditions financières en cas d'abandon).</p>

<h3>Le délai de rétractation de dix jours</h3>
<p>L'article L.6353-5 dispose que, dans le délai de dix jours à compter de la signature du contrat, le stagiaire peut se rétracter par lettre recommandée avec avis de réception. La rétractation n'a pas à être motivée et n'entraîne aucun frais. Le contrat doit informer clairement le stagiaire de ce droit, de son point de départ (la signature) et de sa forme. Un modèle de lettre de rétractation peut utilement être annexé.</p>
<p>Ce délai a une conséquence directe sur le calendrier commercial : pour une session qui débute le lundi 16 novembre 2026, un contrat signé le mardi 10 novembre laisse le délai de rétractation courir jusqu'au début de la formation, voire au-delà. Inès fixe donc une date limite de signature quinze jours avant le début de chaque session, ce qui laisse le délai s'écouler entièrement et permet de percevoir l'acompte avant la formation.</p>
<p><strong>Articulation avec le Code de la consommation.</strong> Lorsque le contrat est conclu à distance (par exemple entièrement en ligne) ou hors établissement, les règles du Code de la consommation relatives à ces contrats peuvent aussi s'appliquer, notamment un délai de rétractation de quatorze jours et des obligations d'information précontractuelle renforcées. La combinaison des deux régimes fait l'objet de débats ; la solution prudente consiste à informer le stagiaire de ses droits de façon complète et à appliquer le délai le plus protecteur lorsque le contrat est conclu à distance. En cas de doute sur sa situation, l'organisme gagne à faire vérifier ses modèles par un professionnel du droit.</p>

<h3>Les règles de paiement de l'article L.6353-6</h3>
<p>L'article L.6353-6 prévoit trois règles cumulatives :</p>
<ol>
<li><strong>Aucune somme ne peut être exigée du stagiaire avant l'expiration du délai de rétractation</strong>. Pas d'acompte à la signature, pas de chèque encaissé « en garantie ».</li>
<li><strong>À l'expiration de ce délai, il ne peut être payé une somme supérieure à 30 % du prix convenu.</strong></li>
<li><strong>Le solde donne lieu à échelonnement des paiements au fur et à mesure du déroulement de l'action de formation.</strong></li>
</ol>
<p>Application à la formation « Gérer son centre de formation » (1 575 € net de taxe) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Moment</th><th>Montant maximal exigible</th><th>Commentaire</th></tr>
<tr><td>Signature du contrat</td><td>0 €</td><td>Aucune somme pendant le délai de rétractation</td></tr>
<tr><td>Après expiration du délai de dix jours</td><td>472,50 € (30 % de 1 575 €)</td><td>Acompte maximal</td></tr>
<tr><td>En cours de formation</td><td>Solde de 1 102,50 €, échelonné</td><td>Par exemple 551,25 € à l'issue du deuxième jour et 551,25 € à l'issue du dernier jour</td></tr>
</table>
<p>Ces règles valent aussi pour les paiements en plusieurs fois proposés par l'organisme : l'échéancier doit respecter le plafond de 30 % au départ et l'étalement du solde pendant la formation. Un paiement intégral demandé avant le début est contraire à la loi, même si le stagiaire le propose spontanément.</p>

<h3>Abandon, force majeure et cessation anticipée</h3>
<p>L'article L.6353-7 prévoit que si, par suite de force majeure dûment reconnue, le stagiaire est empêché de suivre la formation, il peut rompre le contrat. Dans ce cas, seules les prestations effectivement dispensées sont rémunérées à due proportion de leur valeur prévue au contrat. La force majeure s'entend d'un événement imprévisible, irrésistible et extérieur (hospitalisation imprévue, par exemple) ; le contrat peut indiquer les justificatifs attendus.</p>
<p>En dehors de la force majeure, l'abandon ou la cessation anticipée relève des conditions financières prévues au contrat (mention 5° de l'article L.6353-4). Ces conditions doivent être claires et proportionnées. Une clause qui ferait payer au stagiaire la totalité du prix pour une formation abandonnée dès le premier jour, sans motif ni proportion, risque d'être jugée abusive au regard du Code de la consommation. Une rédaction équilibrée consiste à facturer les heures suivies au prorata et, éventuellement, une indemnité limitée et justifiée.</p>
<p>Exemple de clause (Atelier Sésame Formation, fictif) :</p>
<blockquote>« En cas de rupture du contrat par le stagiaire pour un cas de force majeure dûment reconnu, seules les heures de formation effectivement dispensées sont dues, au prorata de leur valeur prévue au présent contrat. En cas d'abandon pour un autre motif, les heures effectivement suivies sont dues au prorata ; aucune autre somme n'est exigée si le stagiaire informe l'organisme par écrit de son abandon. L'organisme rembourse dans un délai de quinze jours les sommes versées excédant les montants dus. »</blockquote>

<h3>L'information précontractuelle et la date de signature</h3>
<p>Rappelons que l'article L.6353-8 impose de remettre au stagiaire potentiel, avant son inscription définitive et tout règlement de frais, le programme, la liste des formateurs, les horaires, les modalités d'évaluation, le contact, le règlement intérieur, les tarifs, les modalités de règlement et les conditions financières en cas d'abandon. La chronologie conseillée est donc :</p>
<ol>
<li>premier contact, envoi du programme et des conditions générales ;</li>
<li>recueil des besoins et positionnement ;</li>
<li>envoi du contrat accompagné du règlement intérieur et du programme ;</li>
<li>signature par le stagiaire puis par l'organisme, chacun conservant un exemplaire ;</li>
<li>délai de rétractation de dix jours ;</li>
<li>appel de l'acompte (30 % au plus) ;</li>
<li>convocation ;</li>
<li>formation, échelonnement du solde, émargement, évaluation, attestation, facture.</li>
</ol>

<h3>Conditions générales de vente pour les particuliers</h3>
<p>Envers un consommateur, les CGV doivent être rédigées de façon claire et compréhensible, sans clause abusive. Le professionnel doit notamment informer le consommateur, avant la conclusion du contrat, des caractéristiques essentielles du service, du prix, des modalités de paiement et d'exécution, et de la possibilité de recourir gratuitement à un <strong>médiateur de la consommation</strong> en cas de litige. Ce dernier point est souvent oublié par les petits organismes : le Code de la consommation impose à tout professionnel de garantir au consommateur le recours effectif à un dispositif de médiation et d'en communiquer les coordonnées. Le chapitre 5 reviendra sur les mentions du site internet et les pratiques commerciales.</p>

<blockquote><strong>À retenir.</strong> Un particulier qui finance lui-même sa formation signe un contrat (article L.6353-3) comportant, à peine de nullité, les cinq mentions de l'article L.6353-4. Il dispose de dix jours pour se rétracter par lettre recommandée (L.6353-5) ; aucune somme n'est exigible avant la fin de ce délai, l'acompte est limité à 30 % et le solde est échelonné pendant la formation (L.6353-6). En cas de force majeure, seules les prestations effectivement dispensées sont rémunérées, à due proportion de leur valeur prévue au contrat (L.6353-7). Les conditions d'abandon sont claires et proportionnées, et le médiateur de la consommation est indiqué.</blockquote>
`,
      },
      {
        title: "3.7 – Clôturer la formation : émargement, attestation, certificat de réalisation et conservation",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Organiser la preuve de la réalisation de la formation (émargement, traces d'activité).</li>
<li>Rédiger une attestation de fin de formation complète et distinguer ce document du certificat de réalisation.</li>
<li>Constituer un dossier stagiaire complet, facile à présenter à un financeur, à un auditeur ou à un contrôleur.</li>
</ul>

<h3>Prouver que la formation a eu lieu</h3>
<p>Un organisme de formation doit pouvoir démontrer, longtemps après la session, que la formation a été réalisée conformément à ce qui était prévu. Cette démonstration intéresse les financeurs (qui ne paient que les heures réalisées), l'administration en cas de contrôle (chapitre 2), le certificateur Qualiopi et, en cas de litige, le juge. La preuve principale, pour une formation en présentiel, est la <strong>feuille d'émargement</strong>.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément de la feuille d'émargement</th><th>Pourquoi</th></tr>
<tr><td>Nom de l'organisme, intitulé de la formation, lieu</td><td>Rattacher la feuille à une action précise</td></tr>
<tr><td>Date et demi-journée (matin, après-midi) avec horaires</td><td>Prouver la durée réellement suivie ; la signature par demi-journée est la pratique attendue par la plupart des financeurs</td></tr>
<tr><td>Nom et signature de chaque stagiaire</td><td>Prouver la présence individuelle</td></tr>
<tr><td>Nom et signature du formateur</td><td>Prouver l'animation et la présence de l'intervenant</td></tr>
<tr><td>Mention des absences, retards et départs anticipés</td><td>Calculer les heures réellement suivies</td></tr>
</table>
<p>Les règles de base : chaque stagiaire signe lui-même, au moment de la demi-journée concernée, jamais à l'avance ni a posteriori ; une case vide est barrée et l'absence notée ; aucune signature n'est imitée. Une feuille signée en bloc à la fin de la semaine perd toute valeur probante et peut caractériser une fraude. Les outils d'émargement électronique sont admis s'ils garantissent l'identité du signataire, l'horodatage et l'intégrité du document.</p>

<h3>L'attestation de fin de formation</h3>
<p>L'attestation de fin de formation est le document remis au stagiaire pour lui permettre de faire valoir la formation suivie. Pour les formations qui ne conduisent pas à une certification professionnelle, l'article L.6313-7 du Code du travail prévoit qu'elles peuvent faire l'objet de la remise d'une attestation dont le titulaire peut se prévaloir. Le Code du travail imposait auparavant, de façon générale, la remise d'une attestation mentionnant les objectifs, la nature et la durée de l'action et les résultats de l'évaluation des acquis ; cette obligation générale a été retirée par la loi du 5 septembre 2018. La remise de l'attestation reste cependant la pratique attendue par les stagiaires, par les financeurs et par les auditeurs, et elle est souvent exigée par les conditions des financeurs. Atelier Sésame Formation la remet systématiquement, et la formation que vous suivez se conclut également par une attestation de fin de formation.</p>
<p>Contenu recommandé, qui reprend les rubriques historiques et reste la référence :</p>
<ul>
<li>identification de l'organisme (raison sociale, adresse, numéro de déclaration d'activité) ;</li>
<li>identité du stagiaire ;</li>
<li>intitulé et nature de l'action (action de formation), dates, lieu, durée prévue et durée suivie ;</li>
<li>objectifs opérationnels de la formation ;</li>
<li>résultats de l'évaluation des acquis, objectif par objectif (acquis, en cours d'acquisition, non acquis) ;</li>
<li>pour une formation non certifiante, la mention qu'elle ne donne lieu à aucune certification professionnelle ;</li>
<li>date, nom, qualité et signature du représentant de l'organisme.</li>
</ul>
<p>L'attestation ne doit jamais laisser croire à un diplôme ou à une certification. Les termes « diplôme », « certificat de compétences » ou « titre » sont proscrits pour une formation non certifiante ; on parle d'« attestation de fin de formation ».</p>

<h3>Le certificat de réalisation</h3>
<p>Le certificat de réalisation est un document distinct, destiné aux <strong>financeurs</strong>. Il atteste que l'action a été réalisée et indique la durée réalisée pour chaque bénéficiaire ; il est notamment demandé par les opérateurs de compétences et par la Caisse des Dépôts pour déclencher le paiement. Le ministère chargé de la formation professionnelle met à disposition un modèle, qu'il est conseillé d'utiliser tel quel. Il est établi et signé par l'organisme, sous sa responsabilité ; une fausse déclaration engage l'organisme et peut être sanctionnée.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Document</th><th>Destinataire principal</th><th>Fonction</th><th>Contenu clé</th></tr>
<tr><td>Feuille d'émargement</td><td>Organisme (preuve), financeur sur demande</td><td>Prouver la présence par demi-journée</td><td>Dates, horaires, signatures des stagiaires et du formateur</td></tr>
<tr><td>Attestation de fin de formation</td><td>Stagiaire</td><td>Faire valoir la formation et ses résultats</td><td>Objectifs, nature, durée, résultats de l'évaluation des acquis</td></tr>
<tr><td>Certificat de réalisation</td><td>Financeur</td><td>Attester la réalisation et la durée pour le paiement</td><td>Identité du bénéficiaire, action, durée réalisée, signature de l'organisme</td></tr>
<tr><td>Attestation d'assiduité (selon financeurs)</td><td>Financeur, employeur</td><td>Préciser les présences et absences</td><td>Heures suivies, absences</td></tr>
</table>
<p>Pour un particulier qui finance lui-même sa formation, le certificat de réalisation n'est pas requis par un financeur, mais rien n'empêche de le remettre avec l'attestation et la facture acquittée.</p>

<h3>Le dossier stagiaire : une trace complète et ordonnée</h3>
<p>Chez Atelier Sésame Formation, chaque stagiaire dispose d'un dossier numérique nommé « AAAA-MM_NOM_Prénom_intitulé ». Il contient, dans cet ordre :</p>
<ol>
<li>la demande initiale et les échanges préalables ;</li>
<li>le questionnaire de recueil des besoins et le résultat du positionnement ;</li>
<li>le contrat (particulier) ou la convention (entreprise), signés, avec le programme et les CGV ;</li>
<li>la preuve de remise du règlement intérieur et la convocation ;</li>
<li>les feuilles d'émargement ;</li>
<li>les évaluations (formatives et finale, grilles complétées) ;</li>
<li>l'attestation de fin de formation et, le cas échéant, le certificat de réalisation ;</li>
<li>les factures et preuves de paiement ;</li>
<li>les questionnaires de satisfaction à chaud et à froid ;</li>
<li>le cas échéant, les échanges relatifs à une adaptation, un aléa ou une réclamation.</li>
</ol>
<p>Ce dossier sert directement lors de l'audit Qualiopi : l'auditeur choisit plusieurs stagiaires et demande à suivre leur parcours du premier contact jusqu'à l'évaluation à froid. Un dossier ordonné de cette façon permet de répondre en quelques minutes. Les durées de conservation et les règles de protection des données seront précisées au chapitre 6 ; à ce stade, retenez que les pièces justifiant la réalisation et le paiement des formations doivent être conservées suffisamment longtemps pour répondre à un contrôle et que les données personnelles ne doivent pas être gardées au-delà de ce qui est nécessaire.</p>

<blockquote><strong>À retenir.</strong> L'émargement par demi-journée, signé au moment de la présence, est la preuve centrale de la réalisation. L'attestation de fin de formation, remise au stagiaire, reprend les objectifs, la nature, la durée et les résultats de l'évaluation ; pour une formation non certifiante, elle se fonde sur l'article L.6313-7 et ne doit jamais ressembler à un diplôme. Le certificat de réalisation, établi selon le modèle ministériel, est destiné aux financeurs. Un dossier stagiaire ordonné rend l'audit et le contrôle simples.</blockquote>
`,
      },
      {
        title: "3.8 – Quiz de fin de chapitre",
        content: `
<p>Pour chaque question, une seule réponse est correcte. Le corrigé figure après chaque question.</p>

<h4>Question 1 – Un futur stagiaire déclare : « Je voudrais une formation Excel. » Qu'exprime-t-il ?</h4>
<ol type="A">
<li>Un objectif opérationnel</li>
<li>Une demande, qu'il faut analyser pour remonter au besoin réel</li>
<li>Un prérequis</li>
<li>Un besoin déjà analysé</li>
</ol>
<p><strong>Réponse : B.</strong> La demande est souvent formulée comme une solution. L'analyse des besoins (indicateur 4) consiste à identifier l'écart entre ce que la personne sait faire et ce qu'elle doit savoir faire, avant de proposer une formation.</p>

<h4>Question 2 – Lequel de ces objectifs est opérationnel et évaluable ?</h4>
<ol type="A">
<li>« Découvrir les fonctions de base du traitement de texte »</li>
<li>« Être sensibilisé à la qualité de l'accueil »</li>
<li>« Produire un courrier professionnel conforme à la norme de présentation fournie, en moins de vingt minutes »</li>
<li>« Maîtriser Word »</li>
</ol>
<p><strong>Réponse : C.</strong> L'objectif comporte un verbe d'action observable, des conditions (norme fournie) et un critère de réussite (conformité, délai).</p>

<h4>Question 3 – Selon l'article L.6353-8, quelles informations doivent être remises à un particulier qui finance lui-même sa formation, avant son inscription définitive et tout règlement ?</h4>
<ol type="A">
<li>Uniquement le prix</li>
<li>Le programme et la facture</li>
<li>Les objectifs et le contenu, la liste des formateurs, les horaires, les modalités d'évaluation, le contact, le règlement intérieur, les tarifs, les modalités de règlement et les conditions financières en cas de cessation anticipée ou d'abandon</li>
<li>Le certificat de réalisation</li>
</ol>
<p><strong>Réponse : C.</strong> Le premier alinéa vise tous les stagiaires ; le second ajoute, pour les contrats conclus avec un particulier, les tarifs, les modalités de règlement et les conditions financières en cas d'abandon.</p>

<h4>Question 4 – Quelle rubrique de l'indicateur 1 est la plus souvent oubliée dans les programmes ?</h4>
<ol type="A">
<li>L'intitulé</li>
<li>Les délais d'accès</li>
<li>La durée</li>
<li>Les objectifs</li>
</ol>
<p><strong>Réponse : B.</strong> Les délais d'accès (temps entre la demande et l'entrée en formation) sont fréquemment absents, alors qu'ils figurent parmi les items attendus avec les prérequis, objectifs, durée, modalités, tarifs, contacts, méthodes, évaluation et accessibilité.</p>

<h4>Question 5 – Le test de positionnement d'une candidate montre qu'elle ne remplit pas les prérequis. Que prévoit une procédure conforme à l'indicateur 8 ?</h4>
<ol type="A">
<li>L'inscrire quand même pour ne pas perdre la vente</li>
<li>Refuser sans explication</li>
<li>Une solution formalisée : réorientation, remise à niveau, report ou accompagnement renforcé, avec la décision tracée</li>
<li>Lui faire signer une décharge</li>
</ol>
<p><strong>Réponse : C.</strong> La procédure de positionnement doit prévoir ce qui se passe quand les prérequis ne sont pas remplis, et la décision est conservée dans le dossier.</p>

<h4>Question 6 – Un organisme présente à l'auditeur des questionnaires de satisfaction pour prouver l'atteinte des objectifs. Quel est le problème ?</h4>
<ol type="A">
<li>Aucun, la satisfaction suffit</li>
<li>La satisfaction mesure une perception, pas les acquis : l'indicateur 11 exige une évaluation de l'atteinte des objectifs</li>
<li>Les questionnaires doivent être anonymes</li>
<li>Il faut un questionnaire par jour</li>
</ol>
<p><strong>Réponse : B.</strong> La satisfaction relève de l'indicateur 30 ; l'atteinte des objectifs se démontre par des évaluations (épreuve pratique, grille, étude de cas).</p>

<h4>Question 7 – Une entreprise signe un devis comportant l'intitulé, l'objectif, le contenu, les moyens, la durée, la période de réalisation, le prix et les modalités de règlement. Faut-il en plus une convention ?</h4>
<ol type="A">
<li>Oui, toujours</li>
<li>Non : un devis approuvé comportant les mentions de l'article D.6353-1 tient lieu de convention</li>
<li>Oui, sauf si la formation dure moins d'une journée</li>
<li>Non, aucun document n'est nécessaire entre professionnels</li>
</ol>
<p><strong>Réponse : B.</strong> L'article D.6353-1 admet que des bons de commande ou des devis approuvés tiennent lieu de convention s'ils comportent les mêmes mentions.</p>

<h4>Question 8 – Leïla BENSAÏD (fictive) signe le 2 novembre un contrat pour une formation de 1 575 € financée par elle-même. Que peut lui demander l'organisme le jour de la signature ?</h4>
<ol type="A">
<li>La totalité du prix</li>
<li>Un acompte de 30 %</li>
<li>Aucune somme</li>
<li>Un chèque de caution non encaissé</li>
</ol>
<p><strong>Réponse : C.</strong> Aucune somme ne peut être exigée avant l'expiration du délai de rétractation de dix jours (articles L.6353-5 et L.6353-6). Après ce délai, l'acompte est limité à 30 % (472,50 €) et le solde est échelonné pendant la formation.</p>

<h4>Question 9 – Une stagiaire est hospitalisée en urgence au troisième jour d'une formation de cinq jours. Que doit-elle payer ?</h4>
<ol type="A">
<li>La totalité du prix</li>
<li>Rien du tout</li>
<li>Les prestations effectivement dispensées, à due proportion de leur valeur prévue au contrat</li>
<li>50 % du prix, forfaitairement</li>
</ol>
<p><strong>Réponse : C.</strong> En cas de force majeure dûment reconnue, le stagiaire peut rompre le contrat et seules les prestations effectivement dispensées sont rémunérées, à due proportion (article L.6353-7).</p>

<h4>Question 10 – Pour une formation non certifiante, quelle formulation convient sur le document remis au stagiaire à la fin ?</h4>
<ol type="A">
<li>« Diplôme d'assistant(e) d'accueil »</li>
<li>« Certificat de compétences professionnelles »</li>
<li>« Attestation de fin de formation » mentionnant les objectifs, la nature, la durée et les résultats de l'évaluation, sans référence à une certification</li>
<li>« Titre professionnel »</li>
</ol>
<p><strong>Réponse : C.</strong> Les formations non certifiantes peuvent donner lieu à une attestation dont le titulaire peut se prévaloir (article L.6313-7). Tout terme suggérant un diplôme ou une certification est trompeur.</p>
`,
      },
      {
        title: "3.9 – Cas pratique corrigé : l'offre « Accueil et standard téléphonique » d'Atelier Sésame Formation",
        content: `
<h3>Contexte (fictif)</h3>
<p>Inès MARCHAND veut lancer une nouvelle formation inter-entreprises « Accueil physique et standard téléphonique », destinée à la fois à des salariés envoyés par leur entreprise et à des particuliers en reconversion qui la financeront eux-mêmes. Elle dispose des éléments suivants :</p>
<ul>
<li>Son tableau des demandes recense, sur un an, onze demandes portant sur l'accueil, dont sept venant de cabinets médicaux, de cabinets d'avocats et de petites agences.</li>
<li>Elle envisage 14 heures sur deux jours, en présentiel, dans ses locaux de Massy, groupe de quatre à huit personnes, au prix de 490 € net de taxe par stagiaire (organisme exonéré de TVA).</li>
<li>Son premier brouillon de programme indique : « Objectifs : découvrir les bases de l'accueil, être sensibilisé à la communication téléphonique, maîtriser le standard. Évaluation : questionnaire de satisfaction. Tarif : nous consulter. »</li>
<li>Leïla BENSAÏD, en reconversion, souhaite s'inscrire à la session des 7 et 8 décembre ; elle propose de payer la totalité tout de suite par virement « pour être sûre d'avoir sa place ».</li>
<li>La société fictive Vergers de l'Yvette veut inscrire une salariée à la même session et demande « un document pour son dossier ».</li>
</ul>

<h3>Consigne</h3>
<ol>
<li>Reformulez trois objectifs opérationnels et évaluables à la place du brouillon.</li>
<li>Listez les rubriques manquantes du programme au regard de l'article L.6353-8 et de l'indicateur 1, et rédigez la rubrique « délais d'accès ».</li>
<li>Proposez une modalité d'évaluation finale pour l'un des objectifs, avec son critère de réussite.</li>
<li>Indiquez le document contractuel adapté pour Leïla et pour Vergers de l'Yvette, et les mentions essentielles de chacun.</li>
<li>Répondez à la proposition de paiement de Leïla en précisant l'échéancier possible.</li>
<li>Listez les documents que contiendra le dossier de Leïla à l'issue de la formation.</li>
</ol>

<h3>Corrigé</h3>

<h4>1. Objectifs opérationnels</h4>
<p>À l'issue de la formation, le stagiaire sera capable de :</p>
<ol>
<li>accueillir un visiteur en appliquant les cinq étapes de la grille d'accueil (présentation, écoute, reformulation, réponse ou orientation, prise de congé), lors d'une mise en situation observée ;</li>
<li>traiter un appel entrant et, si l'interlocuteur est indisponible, rédiger un message comportant les sept rubriques attendues, sans erreur sur les coordonnées ;</li>
<li>répondre à un interlocuteur mécontent sans escalade, en reformulant sa demande et en proposant une solution ou une orientation, lors d'un jeu de rôle.</li>
</ol>
<p>Les formulations « découvrir », « être sensibilisé » et « maîtriser » ont disparu : elles ne décrivent pas un comportement observable.</p>

<h4>2. Rubriques manquantes et délais d'accès</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique manquante</th><th>Source de l'exigence</th></tr>
<tr><td>Public visé et prérequis (et leur vérification)</td><td>Indicateur 1 ; article L.6353-4, 2° pour le contrat avec un particulier</td></tr>
<tr><td>Contenu détaillé et durée (14 h, deux jours, horaires)</td><td>Article L.6353-8 (contenu, horaires) ; indicateur 1 (durée)</td></tr>
<tr><td>Modalités et délais d'accès, dates des sessions</td><td>Indicateur 1</td></tr>
<tr><td>Méthodes mobilisées</td><td>Indicateur 1</td></tr>
<tr><td>Modalités d'évaluation des acquis (et non la seule satisfaction)</td><td>Article L.6353-8 ; indicateur 1</td></tr>
<tr><td>Tarif précis (490 € net de taxe, exonération de TVA), modalités de règlement, conditions en cas d'abandon</td><td>Indicateur 1 ; article L.6353-8, second alinéa, pour les particuliers</td></tr>
<tr><td>Liste et qualifications des formateurs</td><td>Article L.6353-8</td></tr>
<tr><td>Contact (personne chargée des relations avec les stagiaires)</td><td>Article L.6353-8 ; indicateur 1</td></tr>
<tr><td>Accessibilité aux personnes handicapées, contact de la référente handicap</td><td>Indicateur 1</td></tr>
<tr><td>Règlement intérieur applicable (mis à disposition)</td><td>Article L.6353-8</td></tr>
<tr><td>Date de mise à jour</td><td>Guide de lecture : information datée et actualisée</td></tr>
</table>
<p>Rédaction proposée pour les délais d'accès :</p>
<blockquote>« Inscription possible jusqu'à quinze jours avant le début de la session, dans la limite des places disponibles (huit personnes au maximum), pour respecter le délai de rétractation de dix jours dont bénéficient les personnes qui financent elles-mêmes leur formation. La session est maintenue à partir de quatre inscrits ; en dessous, elle est reportée et les inscrits sont prévenus au moins dix jours avant. Prochaine session : 7 et 8 décembre. »</blockquote>
<p>La formule « Tarif : nous consulter » est remplacée par le prix réel. Elle n'est acceptable que pour des prestations sur mesure, accompagnée des éléments qui déterminent le prix.</p>

<h4>3. Évaluation finale de l'objectif 2</h4>
<p>Simulation de trois appels enregistrés (fictifs) en fin de deuxième jour. Le stagiaire traite chaque appel et rédige les messages nécessaires. La formatrice utilise la grille de cinq critères (présentation, reformulation, orientation, message, prise de congé). <strong>Critère de réussite :</strong> sur au moins deux appels sur trois, quatre critères sur cinq acquis, dont obligatoirement le message complet. Le résultat est reporté sur l'attestation de fin de formation (« objectif 2 : acquis »).</p>

<h4>4. Documents contractuels</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Stagiaire</th><th>Document</th><th>Mentions essentielles</th></tr>
<tr><td>Leïla BENSAÏD, particulier à ses frais</td><td>Contrat de formation professionnelle (article L.6353-3)</td><td>Les cinq mentions de l'article L.6353-4 à peine de nullité : nature, durée, programme, objet et effectifs ; prérequis ; conditions de déroulement, moyens, contrôle des connaissances et nature de la sanction (attestation, aucune certification) ; diplômes, titres ou références de la formatrice ; modalités de paiement et conditions financières en cas de cessation anticipée ou d'abandon. Plus : information sur le délai de rétractation de dix jours par lettre recommandée, règle de la force majeure, coordonnées du médiateur de la consommation.</td></tr>
<tr><td>Salariée de Vergers de l'Yvette</td><td>Convention de formation, ou devis signé valant convention (articles L.6353-1 et D.6353-1)</td><td>Intitulé, objectif et contenu, moyens prévus, durée et période de réalisation, prix et modalités de règlement ; en pratique aussi le nom de la stagiaire, les conditions d'annulation et les documents remis. Le « document pour son dossier » demandé par l'entreprise est probablement destiné à une demande de prise en charge : la convention et le programme y répondent.</td></tr>
</table>

<h4>5. Réponse à la proposition de paiement de Leïla</h4>
<p>Inès doit refuser le paiement intégral, même proposé spontanément : la loi interdit d'exiger une somme avant la fin du délai de rétractation, et le paiement à l'issue de ce délai est plafonné à 30 % du prix. Réponse proposée :</p>
<blockquote>« Merci pour votre confiance. Votre place est réservée dès la signature du contrat, sans paiement. La loi vous laisse dix jours pour changer d'avis : aucune somme ne vous sera demandée pendant ce délai. À son issue, nous vous demanderons un acompte de 147 €, soit 30 % du prix ; le solde de 343 € sera réglé à la fin du premier jour de formation pour 171,50 € et à la fin du second jour pour 171,50 €. »</blockquote>
<p>Calcul : 30 % de 490 € = 147 € ; solde 343 €, échelonné pendant la formation. Pour que l'acompte puisse être demandé avant la session des 7 et 8 décembre, le contrat doit être signé au plus tard le 23 novembre (quinze jours avant), conformément à la règle de délais d'accès.</p>

<h4>6. Dossier de Leïla à l'issue de la formation</h4>
<ul>
<li>Échanges préalables et programme remis (avec date d'envoi) ;</li>
<li>questionnaire de recueil des besoins et résultat du positionnement ;</li>
<li>contrat signé par les deux parties, CGV et règlement intérieur remis ;</li>
<li>convocation ;</li>
<li>feuilles d'émargement des quatre demi-journées ;</li>
<li>grilles d'évaluation formative et finale ;</li>
<li>attestation de fin de formation signée ;</li>
<li>factures et preuves de paiement (acompte et échéances) ;</li>
<li>questionnaire de satisfaction à chaud, puis à froid quelques semaines plus tard.</li>
</ul>

<h4>Erreurs fréquentes relevées lors de la correction</h4>
<ul>
<li>Accepter le paiement intégral de Leïla « puisqu'elle le propose ».</li>
<li>Conserver un objectif « maîtriser le standard », non évaluable.</li>
<li>Proposer un contrat de particulier à l'entreprise, ou une simple convention à Leïla.</li>
<li>Oublier les qualifications de la formatrice dans le contrat (mention 4° de l'article L.6353-4).</li>
<li>Ne pas tenir compte du délai de rétractation dans les délais d'accès et faire commencer la formation avant son expiration.</li>
</ul>

<blockquote><strong>À retenir.</strong> Une offre conforme se construit dans l'ordre : besoin analysé, objectifs opérationnels, programme complet et daté, évaluation alignée, document contractuel adapté au financeur (contrat pour le particulier, convention ou devis signé pour l'entreprise), échéancier légal et dossier stagiaire complet. Chaque étape produit une trace qui servira lors de l'audit Qualiopi, objet du chapitre suivant.</blockquote>
`,
      },
    ],
  },
  {
    title: "Chapitre 4 – Mettre en place la démarche qualité et préparer la certification Qualiopi (C3)",
    description:
      "Comprendre l'obligation de certification qualité (article L.6316-1 du Code du travail) et son périmètre, maîtriser le référentiel national qualité dans sa version issue du décret n° 2026-728 du 1er août 2026, en vigueur le 1er novembre 2026 (7 critères, 33 indicateurs), lire chaque indicateur avec ses attentes et ses preuves, distinguer les indicateurs communs, spécifiques et adaptés aux nouveaux entrants, choisir un organisme certificateur accrédité, comprendre le cycle d'audit (initial, surveillance, renouvellement), les non-conformités mineures et majeures, et préparer un système de preuves proportionné à un petit organisme. Exemples tirés du fil rouge Atelier Sésame Formation. Durée indicative : une journée (jour 3). Module C3 du programme.",
    sections: [
      {
        title: "4.1 – Pourquoi Qualiopi : l'obligation de certification et son périmètre",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Expliquer à quoi sert la certification qualité des prestataires d'actions concourant au développement des compétences.</li>
<li>Déterminer si un organisme est tenu d'être certifié, en fonction de ses financements.</li>
<li>Situer la certification par rapport à la déclaration d'activité et au contrôle de l'État.</li>
</ul>

<h3>Une obligation liée aux financements, pas à l'activité</h3>
<p>La loi n° 2018-771 du 5 septembre 2018 pour la liberté de choisir son avenir professionnel a créé une certification qualité unique pour les prestataires de formation. Elle est inscrite à l'article L.6316-1 du Code du travail : les prestataires mentionnés à l'article L.6351-1 (c'est-à-dire les organismes ayant déclaré leur activité, vus au chapitre 2) financés par un opérateur de compétences, par la commission paritaire mentionnée à l'article L.6323-17-6 (les associations Transitions Pro), par l'État, par les régions, par la Caisse des dépôts et consignations, par l'opérateur France Travail ou par l'Agefiph sont certifiés sur la base de critères définis par décret en Conseil d'État. Cette obligation est entrée en application le 1er janvier 2022.</p>
<p>La certification n'est donc pas une condition pour exercer une activité de formation. Un organisme peut être déclaré, former des particuliers qui paient eux-mêmes ou des entreprises qui financent sur leurs fonds propres, sans être certifié. Elle devient indispensable dès que l'organisme veut accéder aux <strong>fonds publics ou mutualisés</strong>.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Source de financement</th><th>Certification exigée ?</th><th>Commentaire</th></tr>
<tr><td>Particulier qui paie lui-même</td><td>Non</td><td>Le contrat de l'article L.6353-3 s'applique ; la certification reste un gage de confiance</td></tr>
<tr><td>Entreprise qui paie sur ses fonds propres, sans prise en charge</td><td>Non</td><td>La convention de l'article L.6353-1 s'applique</td></tr>
<tr><td>Opérateur de compétences (OPCO) : plan de développement des compétences des entreprises de moins de cinquante salariés, alternance, etc.</td><td>Oui</td><td>L'OPCO ne peut financer qu'un prestataire certifié</td></tr>
<tr><td>Compte personnel de formation (Caisse des Dépôts)</td><td>Oui</td><td>S'ajoute l'exigence d'une formation éligible au CPF (certification inscrite au RNCP ou au répertoire spécifique) ; ce n'est pas le cas des formations non certifiantes</td></tr>
<tr><td>France Travail, État, régions</td><td>Oui</td><td>Achats de formation, aides individuelles</td></tr>
<tr><td>Agefiph</td><td>Oui</td><td>Aides et prestations liées au handicap</td></tr>
<tr><td>Transitions Pro (projet de transition professionnelle)</td><td>Oui</td><td>Formations longues de reconversion</td></tr>
</table>
<p>Pour Atelier Sésame Formation, la question est donc stratégique : aujourd'hui financée par des particuliers et quelques entreprises sur fonds propres, Inès n'a pas l'obligation d'être certifiée. Mais sans certification, elle ne peut pas répondre à une entreprise de dix salariés qui souhaite faire prendre en charge la formation par son OPCO, ni à une personne orientée par France Travail. La certification est la porte d'entrée vers ces financements, présentés au chapitre 5.</p>

<h3>Les quatre catégories d'actions</h3>
<p>L'article L.6313-1 du Code du travail distingue quatre catégories d'actions concourant au développement des compétences : les actions de formation, les bilans de compétences, les actions permettant de faire valider les acquis de l'expérience et les actions de formation par apprentissage. La certification est délivrée pour une ou plusieurs de ces catégories, et le certificat les mentionne. Un organisme certifié pour les actions de formation qui veut proposer des bilans de compétences doit passer un <strong>audit d'extension</strong> ; il ne peut pas utiliser sa certification pour une catégorie qui n'y figure pas.</p>

<h3>Exceptions et cas particuliers</h3>
<ul>
<li><strong>Établissements d'enseignement supérieur</strong> : l'article L.6316-4 répute avoir satisfait à l'obligation certains établissements dont la qualité est évaluée par ailleurs (établissements publics accrédités après évaluation par le Haut Conseil de l'évaluation de la recherche et de l'enseignement supérieur, certains établissements privés et écoles évalués par les instances prévues par le Code de l'éducation).</li>
<li><strong>Sous-traitance</strong> : l'obligation pèse sur le prestataire qui reçoit le financement. Un organisme qui intervient uniquement comme sous-traitant d'un organisme certifié n'est pas, à ce titre, tenu d'être lui-même certifié ; c'est le donneur d'ordre qui doit s'assurer que son sous-traitant respecte le référentiel (indicateur 27). C'est la situation de Paul RENAUD, formateur indépendant qui intervient pour Atelier Sésame Formation.</li>
<li><strong>Labels reconnus</strong> : l'article L.6316-2 permet aussi qu'une certification soit délivrée par une instance de labellisation reconnue par France compétences, sur la base du même référentiel. Ces instances concernent des réseaux ou secteurs particuliers.</li>
</ul>

<h3>Ce que Qualiopi n'est pas</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Idée reçue</th><th>Réalité</th></tr>
<tr><td>« Qualiopi certifie mes formations. »</td><td>Qualiopi certifie le <strong>prestataire</strong> et ses processus, pas le contenu d'une formation ni sa valeur sur le marché du travail. Une formation n'est pas « certifiée Qualiopi » ; elle n'est pas non plus « certifiante » pour autant.</td></tr>
<tr><td>« Avec Qualiopi, mes formations sont éligibles au CPF. »</td><td>Non : l'éligibilité au CPF suppose en outre une certification professionnelle enregistrée au RNCP ou au répertoire spécifique et une habilitation à la préparer.</td></tr>
<tr><td>« Le numéro de déclaration d'activité vaut agrément. »</td><td>Non : il atteste un enregistrement administratif. Ni la déclaration ni la certification ne valent agrément de l'État.</td></tr>
<tr><td>« Une fois certifié, je suis tranquille trois ans. »</td><td>Un audit de surveillance intervient entre le 14e et le 22e mois, et le référentiel doit être appliqué en continu.</td></tr>
<tr><td>« Qualiopi remplace le contrôle de l'État. »</td><td>Non : les services de contrôle de l'État (chapitre 2) et les financeurs gardent leurs propres pouvoirs de contrôle. La certification ne protège pas d'un contrôle.</td></tr>
</table>

<h3>La marque Qualiopi et la liste publique</h3>
<p>Qualiopi est la marque qui atteste la certification ; son usage est encadré par un règlement d'usage et une charte graphique publiés par le ministère chargé de la formation professionnelle. Le logo ne peut être utilisé que par un organisme certifié, pendant la validité du certificat, et accompagné de la mention des catégories d'actions certifiées. L'état de la certification de chaque organisme apparaît par ailleurs sur la liste publique des organismes de formation, consultable en ligne. Utiliser le logo sans être certifié, ou pour une catégorie non certifiée, est une pratique commerciale trompeuse.</p>

<blockquote><strong>À retenir.</strong> La certification Qualiopi est obligatoire pour accéder aux financements des OPCO, de Transitions Pro, de l'État, des régions, de la Caisse des Dépôts, de France Travail et de l'Agefiph (article L.6316-1), pas pour exercer. Elle certifie un prestataire pour une ou plusieurs des quatre catégories d'actions, non une formation. Elle ne rend pas une formation éligible au CPF et ne remplace pas les contrôles. Le logo s'utilise selon le règlement d'usage, avec la mention des catégories certifiées.</blockquote>
`,
      },
      {
        title: "4.2 – Le référentiel national qualité 2026 : 7 critères, 33 indicateurs",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Présenter l'architecture du référentiel national qualité : critères, indicateurs, niveaux attendus, éléments de preuve.</li>
<li>Identifier les changements apportés par le décret n° 2026-728 du 1er août 2026.</li>
<li>Distinguer indicateurs communs, indicateurs spécifiques à certaines actions et adaptations pour les nouveaux entrants.</li>
</ul>

<h3>Les textes de référence</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Texte</th><th>Objet</th></tr>
<tr><td>Article L.6316-1 du Code du travail</td><td>Obligation de certification des prestataires financés par fonds publics ou mutualisés</td></tr>
<tr><td>Article L.6316-2</td><td>Certification délivrée par un organisme certificateur accrédité (ou en cours d'accréditation) par l'instance nationale d'accréditation, ou par une instance de labellisation reconnue par France compétences</td></tr>
<tr><td>Article L.6316-3</td><td>Référentiel national fixé par décret</td></tr>
<tr><td>Article R.6316-1</td><td>Les sept critères de qualité</td></tr>
<tr><td>Décret n° 2019-565 du 6 juin 2019, modifié</td><td>Référentiel national qualité et ses indicateurs (article D.6316-1-1 et annexe)</td></tr>
<tr><td>Décret n° 2026-728 du 1er août 2026 (JORF du 4 août 2026)</td><td>Actualisation du référentiel : passage de 32 à 33 indicateurs, en vigueur le 1er novembre 2026</td></tr>
<tr><td>Arrêté du 6 juin 2019 relatif aux modalités d'audit, modifié</td><td>Déroulement des audits, durées, non-conformités, nouveaux entrants</td></tr>
<tr><td>Guide de lecture du référentiel national qualité</td><td>Document du ministère qui précise, pour chaque indicateur, le niveau attendu, les éléments de preuve possibles et les adaptations par catégorie d'actions. À la date de rédaction de ce support (octobre 2026), la version publiée reste la V.9 du 8 janvier 2024.</td></tr>
</table>
<p>Le guide de lecture n'a pas de valeur réglementaire mais il est utilisé par tous les auditeurs : c'est l'outil de travail principal pour préparer la certification. Comme la V.9 est antérieure au décret de 2026, elle ne commente pas l'indicateur 33 ni les compléments apportés aux indicateurs 27 et 32 ; pour ces points, on se réfère au texte du décret et aux consignes de son organisme certificateur, en surveillant la publication d'une nouvelle version du guide.</p>

<h3>Les sept critères (article R.6316-1)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Intitulé</th><th>Indicateurs</th><th>En une phrase</th></tr>
<tr><td>1</td><td>Les conditions d'information du public sur les prestations proposées, les délais pour y accéder et les résultats obtenus</td><td>1 à 3</td><td>Dire clairement ce que l'on propose et ce que l'on obtient</td></tr>
<tr><td>2</td><td>L'identification précise des objectifs des prestations proposées et l'adaptation de ces prestations aux publics bénéficiaires, lors de la conception des prestations</td><td>4 à 8</td><td>Concevoir à partir des besoins et d'objectifs évaluables</td></tr>
<tr><td>3</td><td>L'adaptation aux publics bénéficiaires des prestations et des modalités d'accueil, d'accompagnement, de suivi et d'évaluation mises en œuvre</td><td>9 à 16</td><td>Accompagner, adapter et évaluer pendant la prestation</td></tr>
<tr><td>4</td><td>L'adéquation des moyens pédagogiques, techniques et d'encadrement aux prestations mises en œuvre</td><td>17 à 20</td><td>Disposer des bons moyens et les coordonner</td></tr>
<tr><td>5</td><td>La qualification et le développement des connaissances et compétences des personnels chargés de mettre en œuvre les prestations</td><td>21 et 22</td><td>Avoir des intervenants compétents et les faire progresser</td></tr>
<tr><td>6</td><td>L'inscription et l'investissement du prestataire dans son environnement professionnel</td><td>23 à 29</td><td>Faire de la veille, travailler en réseau, maîtriser la sous-traitance</td></tr>
<tr><td>7</td><td>Le recueil et la prise en compte des appréciations et des réclamations formulées par les parties prenantes aux prestations délivrées</td><td>30 à 33</td><td>Écouter, traiter, améliorer, maîtriser les risques</td></tr>
</table>

<h3>Ce que change le décret n° 2026-728</h3>
<p>Le décret du 1er août 2026, publié au Journal officiel du 4 août 2026, actualise le référentiel national qualité. Il s'applique à compter du <strong>1er novembre 2026</strong> : un audit réalisé à partir de cette date porte sur la nouvelle version. Les sept critères sont conservés ; le nombre d'indicateurs passe de 32 à 33.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Avant</th><th>À compter du 1er novembre 2026</th><th>Conséquence pratique</th></tr>
<tr><td>27</td><td>Sous-traitance : le prestataire s'assure du respect du référentiel par ses sous-traitants</td><td>Étendu au <strong>portage salarial</strong> : lorsque le prestataire fait appel à la sous-traitance ou au portage salarial, il s'assure du respect du référentiel et en assure la traçabilité dans les contrats</td><td>Les formateurs intervenant en portage salarial entrent dans le dispositif de sélection, de contractualisation et de contrôle ; les exigences qualité figurent dans chaque contrat</td></tr>
<tr><td>32</td><td>Démarche d'amélioration continue à partir des appréciations et des réclamations</td><td>Complété par une <strong>analyse des risques sur la qualité des formations délivrées</strong></td><td>Tous les organismes doivent identifier, coter et maîtriser les risques qui pèsent sur la qualité de leurs prestations (chapitre 7)</td></tr>
<tr><td>33</td><td>N'existait pas</td><td><strong>Nouvel indicateur propre aux CFA</strong> : dispositif d'évaluation des contenus et des enseignements par les apprenants, distinct du recueil général de satisfaction, avec partage des résultats et démarche d'amélioration</td><td>Ne concerne que les actions de formation par apprentissage</td></tr>
<tr><td>Autres</td><td colspan="3">Le décret ajuste aussi la rédaction de certains indicateurs propres aux CFA. Pour un organisme qui ne réalise que des actions de formation, les changements à retenir concernent les indicateurs 27 et 32.</td></tr>
</table>

<h3>Indicateurs communs, spécifiques et non applicables</h3>
<p>Chaque indicateur est soit <strong>commun</strong> à toutes les catégories d'actions, soit <strong>spécifique</strong> à certaines d'entre elles. Les indicateurs spécifiques sont de deux types :</p>
<ul>
<li>ceux qui ne s'appliquent qu'à une catégorie : les indicateurs 13, 14, 15, 20, 29 et 33 ne concernent que les CFA (apprentissage) ;</li>
<li>ceux qui s'appliquent lorsqu'une situation se présente : les indicateurs 3, 7 et 16 concernent les prestations conduisant à une certification professionnelle ; l'indicateur 28 concerne les prestations comprenant des périodes de formation en situation de travail ; l'indicateur 8 (positionnement) vise les actions de formation et l'apprentissage.</li>
</ul>
<p>Un indicateur qui ne s'applique pas à l'organisme est déclaré <strong>non applicable</strong>, avec une justification. Certains indicateurs communs peuvent aussi être sans objet dans une situation donnée : l'indicateur 27 lorsque l'organisme ne recourt ni à la sous-traitance ni au portage salarial. L'auditeur vérifie que la non-applicabilité est réelle : un organisme qui fait intervenir des formateurs indépendants sous contrat de sous-traitance ne peut pas déclarer l'indicateur 27 non applicable.</p>
<p>Pour Atelier Sésame Formation, qui ne réalise que des actions de formation non certifiantes, en présentiel, sans période en entreprise, les indicateurs 3, 7, 13, 14, 15, 16, 20, 28, 29 et 33 sont non applicables. Les 23 autres s'appliquent, y compris l'indicateur 27, puisqu'Inès sous-traite des sessions à Paul RENAUD.</p>

<h3>Niveau attendu, éléments de preuve et nouvel entrant</h3>
<p>Pour chaque indicateur, le guide de lecture précise un <strong>niveau attendu</strong> (ce que l'organisme doit démontrer) et des <strong>exemples d'éléments de preuve</strong>. Ces exemples ne sont ni obligatoires ni limitatifs : un petit organisme peut démontrer le même niveau avec des preuves simples, proportionnées à sa taille. L'auditeur juge la démonstration, pas la quantité de documents.</p>
<p>Un <strong>nouvel entrant</strong> est un prestataire dans sa première année d'activité, ou qui débute une activité dans une nouvelle catégorie d'actions. Comme il n'a pas encore d'historique, l'arrêté relatif aux modalités d'audit prévoit que, pour certains indicateurs, l'auditeur vérifie lors de l'audit initial que le processus est <strong>formalisé</strong>, la mise en œuvre effective étant vérifiée lors de l'audit de surveillance. Dans sa rédaction consultée en 2026, l'arrêté vise les indicateurs 2, 3, 11, 13, 14, 19, 22, 24, 25, 26 et 32. Ces adaptations sont signalées dans les tableaux des sections suivantes. Pour l'indicateur 33 créé en 2026, les modalités d'audit applicables aux nouveaux entrants sont à vérifier auprès de l'organisme certificateur et dans la version en vigueur de l'arrêté.</p>

<blockquote><strong>À retenir.</strong> Le référentiel compte 7 critères (article R.6316-1) et, depuis le décret n° 2026-728 applicable au 1er novembre 2026, 33 indicateurs : l'indicateur 27 couvre aussi le portage salarial, l'indicateur 32 inclut une analyse des risques et l'indicateur 33, propre aux CFA, a été créé. Le guide de lecture V.9 du 8 janvier 2024 reste l'outil de référence pour les niveaux attendus. Les indicateurs sont communs ou spécifiques ; un indicateur non applicable se justifie ; un nouvel entrant démontre des processus formalisés pour onze indicateurs, la mise en œuvre étant vérifiée en surveillance.</blockquote>
`,
      },
      {
        title: "4.3 – Les indicateurs des critères 1 à 3 : information, conception, accompagnement",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Comprendre, en langage simple, ce que demande chacun des indicateurs 1 à 16.</li>
<li>Identifier des preuves réalistes pour un petit organisme de formation.</li>
<li>Repérer les indicateurs spécifiques et les adaptations pour nouvel entrant.</li>
</ul>

<p>Les tableaux qui suivent reformulent chaque indicateur en langage courant. Le libellé exact figure dans l'annexe du décret ; le niveau attendu détaillé, dans le guide de lecture. Légende de la colonne « Portée » : <strong>C</strong> = commun à toutes les catégories ; <strong>S</strong> = spécifique (catégories ou situations indiquées) ; <strong>NE</strong> = adaptation nouvel entrant (processus formalisé vérifié à l'audit initial, mise en œuvre vérifiée à l'audit de surveillance) ; <strong>M</strong> = indicateur ne pouvant donner lieu qu'à une non-conformité majeure selon l'arrêté relatif aux modalités d'audit.</p>

<h3>Critère 1 – Information du public</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Ce que dit l'indicateur, en clair</th><th>Ce que l'auditeur attend</th><th>Exemples de preuves</th><th>Portée</th></tr>
<tr><td>1</td><td>Informer le public de façon accessible, détaillée et vérifiable sur les prestations : prérequis, objectifs, durée, modalités et délais d'accès, tarifs, contacts, méthodes mobilisées, modalités d'évaluation, accessibilité aux personnes handicapées</td><td>Une information exhaustive (tous les items), datée, actualisée et accessible sans être déjà inscrit</td><td>Pages du site, fiches programmes datées, catalogue, plaquette ; pour un organisme déjà certifié, usage conforme du logo</td><td>C</td></tr>
<tr><td>2</td><td>Diffuser des indicateurs de résultats adaptés à la nature des prestations et aux publics</td><td>Au moins une information chiffrée sur les résultats, avec sa source, sa période et sa fréquence de mise à jour</td><td>Taux de satisfaction, taux d'atteinte des objectifs, taux d'abandon publiés sur le site avec effectif et période ; tableau de calcul</td><td>C, NE</td></tr>
<tr><td>3</td><td>Pour les prestations conduisant à une certification professionnelle : informer sur les taux d'obtention, les possibilités de valider des blocs de compétences, les équivalences, passerelles, suites de parcours et débouchés</td><td>Des informations chiffrées et sourcées pour chaque certification préparée</td><td>Fiches programmes avec taux d'obtention, lien vers la fiche de la certification au répertoire, débouchés</td><td>S (prestations certifiantes), NE</td></tr>
</table>

<h3>Critère 2 – Objectifs et adaptation lors de la conception</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Ce que dit l'indicateur, en clair</th><th>Ce que l'auditeur attend</th><th>Exemples de preuves</th><th>Portée</th></tr>
<tr><td>4</td><td>Analyser le besoin du bénéficiaire en lien avec l'entreprise et/ou le financeur</td><td>Une démonstration de la façon dont le besoin est recueilli et analysé, selon la finalité de la prestation</td><td>Questionnaires de recueil des besoins, comptes rendus d'entretien, fiches de cadrage avec les entreprises, échanges avec les prescripteurs</td><td>C, M</td></tr>
<tr><td>5</td><td>Définir des objectifs opérationnels et évaluables</td><td>Des objectifs formulés en termes de capacités observables, avec des modalités d'évaluation associées</td><td>Programmes, matrice d'alignement objectifs / évaluation</td><td>C, M</td></tr>
<tr><td>6</td><td>Établir des contenus et des modalités de mise en œuvre adaptés aux objectifs et aux publics</td><td>Des contenus et des modalités cohérents avec les objectifs, tenant compte des besoins recueillis</td><td>Déroulés pédagogiques, scénarios, supports, adaptations décidées après l'analyse des besoins</td><td>C, M</td></tr>
<tr><td>7</td><td>Pour les prestations conduisant à une certification professionnelle : s'assurer que les contenus correspondent aux exigences de la certification visée</td><td>Un lien démontré entre le contenu et le référentiel de la certification</td><td>Tableau de correspondance programme / référentiel de compétences et d'évaluation, convention avec le certificateur</td><td>S (actions de formation et apprentissage certifiants), M</td></tr>
<tr><td>8</td><td>Déterminer les procédures de positionnement et d'évaluation des acquis à l'entrée</td><td>Une procédure de positionnement mise en œuvre et adaptée aux publics, prévoyant le cas où les prérequis ne sont pas remplis</td><td>Tests de positionnement, grilles d'entretien, résultats, décisions de réorientation</td><td>S (actions de formation et apprentissage)</td></tr>
</table>

<h3>Critère 3 – Accueil, accompagnement, suivi et évaluation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Ce que dit l'indicateur, en clair</th><th>Ce que l'auditeur attend</th><th>Exemples de preuves</th><th>Portée</th></tr>
<tr><td>9</td><td>Informer les bénéficiaires des conditions de déroulement de la prestation</td><td>Des modalités d'accueil et de déroulement formalisées et transmises</td><td>Convocation, livret d'accueil, règlement intérieur, informations pratiques (accès, horaires, contacts, restauration)</td><td>C</td></tr>
<tr><td>10</td><td>Mettre en œuvre et adapter la prestation, l'accompagnement et le suivi aux publics</td><td>Des adaptations réelles aux profils (contenus, rythme, accompagnement, suivi)</td><td>Journal de session, exercices différenciés, comptes rendus de suivi, preuves de réalisation (émargements)</td><td>C, M</td></tr>
<tr><td>11</td><td>Évaluer l'atteinte des objectifs par les bénéficiaires</td><td>Un processus d'évaluation formalisé et mis en œuvre, qui permet d'apprécier l'atteinte des objectifs</td><td>Grilles d'évaluation complétées, épreuves finales, attestations de fin de formation reprenant les résultats</td><td>C, NE, M</td></tr>
<tr><td>12</td><td>Décrire et mettre en œuvre des mesures pour favoriser l'engagement et prévenir les ruptures de parcours</td><td>Des mesures formalisées et appliquées</td><td>Procédure de suivi des absences, relances, entretiens individuels, statistiques d'abandon et actions décidées</td><td>C</td></tr>
<tr><td>13</td><td>Pour l'alternance : anticiper avec l'apprenant et l'entreprise les missions confiées et coordonner les apprentissages en centre et en entreprise</td><td>Un processus formalisé d'articulation entre le centre et l'entreprise</td><td>Livret d'apprentissage, fiches de liaison, comptes rendus de visites en entreprise</td><td>S (CFA), NE</td></tr>
<tr><td>14</td><td>Mettre en œuvre un accompagnement socio-professionnel, éducatif et relatif à la citoyenneté ; disposer d'une procédure de traitement sans délai des situations de rupture liées à des difficultés, violences ou discriminations</td><td>Un accompagnement formalisé et mis en œuvre, et une procédure de traitement des situations de rupture</td><td>Plan d'accompagnement, actions menées, procédure de signalement et de traitement</td><td>S (CFA), NE, M</td></tr>
<tr><td>15</td><td>Informer les apprentis de leurs droits et devoirs d'apprentis et de salariés, des règles de santé et de sécurité (de façon renforcée pour les mineurs), des dispositifs de prévention et de signalement des violences, du harcèlement, des agissements sexistes et des discriminations, et des interlocuteurs utiles, dont le médiateur de l'apprentissage</td><td>Une information complète et traçable pour chaque apprenti</td><td>Livret de l'apprenti, émargement de la séance d'information, affichage, coordonnées du médiateur</td><td>S (CFA), M</td></tr>
<tr><td>16</td><td>Pour les formations conduisant à une certification professionnelle : s'assurer que les conditions de présentation à la certification respectent les exigences formelles du certificateur</td><td>Le respect des règles du certificateur (habilitation, inscriptions, déroulement des épreuves, aménagements)</td><td>Convention d'habilitation, procès-verbaux, inscriptions, règlement d'examen</td><td>S (prestations certifiantes : formation, apprentissage, VAE), M</td></tr>
</table>

<h3>Lecture pour Atelier Sésame Formation</h3>
<p>Sur les seize premiers indicateurs, Inès en a dix à démontrer (1, 2, 4, 5, 6, 8, 9, 10, 11, 12) ; les indicateurs 3, 7 et 16 sont non applicables car ses formations ne préparent pas à une certification professionnelle, et les indicateurs 13, 14 et 15 parce qu'elle ne fait pas d'apprentissage. Le travail réalisé au chapitre 3 couvre directement la quasi-totalité de ces dix indicateurs : programmes complets (1), indicateurs de résultats (2), analyse des besoins (4), objectifs (5), déroulés (6), positionnement (8), convocation et livret d'accueil (9), adaptations et journal de session (10), grilles d'évaluation (11), suivi des absences (12). C'est la meilleure démonstration qu'une démarche qualité bien conduite n'est pas une couche administrative supplémentaire, mais la formalisation d'un travail pédagogique sérieux.</p>

<blockquote><strong>À retenir.</strong> Les critères 1 à 3 couvrent seize indicateurs : information du public (1 à 3), conception (4 à 8), accompagnement et évaluation (9 à 16). Les indicateurs 3, 7 et 16 ne valent que pour les prestations certifiantes, les indicateurs 13 à 15 que pour les CFA, l'indicateur 8 pour les actions de formation et l'apprentissage. Les indicateurs 4, 5, 6, 7, 10, 11, 14, 15 et 16 ne peuvent donner lieu qu'à une non-conformité majeure : ce sont des priorités absolues de préparation.</blockquote>
`,
      },
      {
        title: "4.4 – Les indicateurs des critères 4 à 7 : moyens, compétences, environnement, amélioration",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Comprendre, en langage simple, ce que demande chacun des indicateurs 17 à 33.</li>
<li>Repérer les nouveautés 2026 (indicateurs 27, 32 et 33) et leurs conséquences.</li>
<li>Identifier des preuves proportionnées pour un organisme composé d'une dirigeante-formatrice et de formateurs indépendants.</li>
</ul>

<p>Même légende que dans la section précédente : <strong>C</strong> = commun ; <strong>S</strong> = spécifique ; <strong>NE</strong> = adaptation nouvel entrant ; <strong>M</strong> = non-conformité majeure uniquement.</p>

<h3>Critère 4 – Moyens pédagogiques, techniques et d'encadrement</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Ce que dit l'indicateur, en clair</th><th>Ce que l'auditeur attend</th><th>Exemples de preuves</th><th>Portée</th></tr>
<tr><td>17</td><td>Mettre à disposition (ou s'assurer de la mise à disposition) des moyens humains et techniques adaptés et d'un environnement approprié : locaux, équipements, plateaux techniques</td><td>Des locaux, équipements et moyens humains en adéquation avec les objectifs ; pour le bilan de compétences, la confidentialité des échanges</td><td>Description des locaux, bail ou convention de mise à disposition, inventaire du matériel, vérification de l'accessibilité, contrat de location de salle, fiche de vérification avant session</td><td>C</td></tr>
<tr><td>18</td><td>Mobiliser et coordonner les différents intervenants internes et externes (pédagogiques, administratifs, logistiques, commerciaux)</td><td>Une coordination des fonctions nécessaires à la prestation ; une personne seule peut assurer toutes les fonctions</td><td>Organigramme fonctionnel, répartition des rôles, réunions de préparation, échanges avec les formateurs, désignation des référents</td><td>C</td></tr>
<tr><td>19</td><td>Mettre à disposition des bénéficiaires des ressources pédagogiques et leur permettre de se les approprier</td><td>Des ressources cohérentes, actualisées, disponibles, et des dispositions pour que le bénéficiaire puisse les utiliser ; pour la formation à distance, une assistance technique et pédagogique</td><td>Supports remis, plateforme de ressources, fiches mémo, exercices, version adaptée des supports, procédure de mise à jour</td><td>C, NE</td></tr>
<tr><td>20</td><td>Pour les CFA : disposer d'un personnel dédié à la mobilité nationale et internationale, d'un référent handicap et d'un conseil de perfectionnement, assurer un pilotage associant apprentis, formateurs et entreprises, et, selon la part d'heures assurées par des intervenants permanents, des modalités renforcées de supervision pédagogique</td><td>La présentation de ces fonctions, de leurs actions et du fonctionnement du conseil de perfectionnement</td><td>Lettres de mission, comptes rendus du conseil de perfectionnement, actions de mobilité</td><td>S (CFA), M</td></tr>
</table>

<h3>Critère 5 – Qualification et développement des compétences des personnels</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Ce que dit l'indicateur, en clair</th><th>Ce que l'auditeur attend</th><th>Exemples de preuves</th><th>Portée</th></tr>
<tr><td>21</td><td>Déterminer, mobiliser et évaluer les compétences des intervenants internes et externes, adaptées aux prestations</td><td>Des compétences requises définies en amont, adaptées, et évaluées par le prestataire</td><td>Profils de poste ou de mission, CV et justificatifs, grille de sélection des formateurs, observation en séance, évaluation annuelle</td><td>C, M</td></tr>
<tr><td>22</td><td>Entretenir et développer les compétences de ses salariés, adaptées aux prestations</td><td>La mobilisation des leviers de formation et de professionnalisation ; un indépendant démontre sa propre démarche de développement</td><td>Plan de développement des compétences, entretiens professionnels, attestations de formation suivies, participation à des réseaux professionnels</td><td>C, NE, M</td></tr>
</table>

<h3>Critère 6 – Inscription dans l'environnement professionnel</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Ce que dit l'indicateur, en clair</th><th>Ce que l'auditeur attend</th><th>Exemples de preuves</th><th>Portée</th></tr>
<tr><td>23</td><td>Réaliser une veille légale et réglementaire sur la formation professionnelle et en exploiter les enseignements</td><td>Une veille en place, prise en compte par le prestataire et communiquée en interne</td><td>Liste des sources (Légifrance, sites ministériels, centres de ressources), tableau de veille daté, décisions prises (par exemple : mise à jour des documents pour le référentiel 2026)</td><td>C</td></tr>
<tr><td>24</td><td>Réaliser une veille sur l'évolution des compétences, des métiers et des emplois dans ses secteurs d'intervention et en exploiter les enseignements</td><td>Une veille en place et son impact éventuel sur les prestations</td><td>Abonnements, publications d'observatoires, échanges avec des entreprises, évolutions de programmes décidées</td><td>C, NE</td></tr>
<tr><td>25</td><td>Réaliser une veille sur les innovations pédagogiques et technologiques et en exploiter les enseignements</td><td>Une veille en place et son impact éventuel sur les prestations</td><td>Participation à des webinaires ou salons, tests d'outils, nouvelles activités introduites dans les formations</td><td>C, NE</td></tr>
<tr><td>26</td><td>Mobiliser les expertises, outils et réseaux nécessaires pour accueillir, accompagner, former ou orienter les publics en situation de handicap</td><td>Un réseau de partenaires et d'experts du handicap identifié et mobilisable</td><td>Désignation de la référente handicap, annuaire des partenaires, procédure d'accueil, exemples d'adaptations</td><td>C, NE, M</td></tr>
<tr><td>27</td><td><strong>Modifié en 2026.</strong> Lorsque le prestataire fait appel à la sous-traitance ou au portage salarial, s'assurer du respect du référentiel et en assurer la traçabilité dans les contrats</td><td>Des dispositions pour vérifier le respect du référentiel par le sous-traitant ou le salarié porté (sélection, contrat, pilotage, contrôle) et leur traçabilité dans chaque contrat ; à défaut de recours, l'indicateur est déclaré non applicable</td><td>Contrats de sous-traitance et de portage comportant les exigences qualité, charte qualité signée, registre des sous-traitants, bilans de collaboration</td><td>C (si recours), M</td></tr>
<tr><td>28</td><td>Lorsque les prestations comprennent des périodes de formation en situation de travail, mobiliser un réseau de partenaires socio-économiques pour co-construire l'ingénierie et favoriser l'accueil en entreprise</td><td>Un réseau mobilisé et sa contribution</td><td>Conventions de partenariat, comptes rendus de travail avec les entreprises</td><td>S (périodes en situation de travail)</td></tr>
<tr><td>29</td><td>Pour les CFA : développer des actions qui concourent à l'insertion professionnelle ou à la poursuite d'études</td><td>Des actions mises en œuvre et le suivi des sortants</td><td>Ateliers de recherche d'employeur, enquêtes d'insertion</td><td>S (CFA), M</td></tr>
</table>

<h3>Critère 7 – Appréciations, réclamations et amélioration continue</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Ce que dit l'indicateur, en clair</th><th>Ce que l'auditeur attend</th><th>Exemples de preuves</th><th>Portée</th></tr>
<tr><td>30</td><td>Recueillir les appréciations des parties prenantes : bénéficiaires, financeurs, équipes pédagogiques, entreprises concernées</td><td>Une sollicitation de chaque partie prenante à une fréquence pertinente, avec relances et libre expression</td><td>Questionnaires à chaud et à froid, questionnaire aux entreprises clientes, retour des formateurs, synthèse annuelle</td><td>C</td></tr>
<tr><td>31</td><td>Traiter les difficultés rencontrées par les parties prenantes, les réclamations et les aléas survenus en cours de prestation</td><td>Des modalités de traitement en place : accusé de réception, réponse, suivi, traçabilité</td><td>Procédure de réclamation accessible, registre des réclamations et aléas, réponses envoyées</td><td>C, M</td></tr>
<tr><td>32</td><td><strong>Complété en 2026.</strong> Mettre en place une démarche d'amélioration continue à partir de l'analyse des appréciations et des réclamations, <strong>ainsi qu'une analyse des risques sur la qualité des formations délivrées</strong></td><td>Une démarche d'amélioration alimentée par les appréciations et réclamations, et une analyse des risques (identification, cotation, mesures, suivi)</td><td>Plan d'amélioration daté avec actions et responsables, cartographie des risques qualité, bilans de l'efficacité des actions</td><td>C, NE, M</td></tr>
<tr><td>33</td><td><strong>Créé en 2026.</strong> Pour les CFA : mettre en place un dispositif d'évaluation des contenus et des enseignements par les apprenants, distinct du recueil général de satisfaction, partager les résultats avec les équipes pédagogiques et en tirer une démarche d'amélioration dont l'efficacité est mesurée</td><td>Le dispositif, le partage avec l'équipe, le plan d'amélioration et sa mesure</td><td>Questionnaires d'évaluation des enseignements, comptes rendus de réunions pédagogiques, plan d'actions</td><td>S (CFA) ; régime d'audit à confirmer auprès du certificateur</td></tr>
</table>

<h3>Les nouveautés 2026 appliquées à Atelier Sésame Formation</h3>
<p><strong>Indicateur 27.</strong> Paul RENAUD intervient comme formateur indépendant, déclaré comme organisme de formation, dans le cadre d'un contrat de sous-traitance. Le second formateur occasionnel, lui, envisage d'intervenir via une société de portage salarial. Depuis le 1er novembre 2026, les deux situations relèvent de l'indicateur 27. Inès met à jour ses deux contrats : engagement à respecter le référentiel, documents à utiliser (émargement, grilles d'évaluation), participation au recueil des appréciations, transmission des pièces dans un délai fixé, droit de contrôle de l'organisme, conditions de résiliation. Elle tient un registre simple des intervenants externes et réalise un bilan de chaque collaboration.</p>
<p><strong>Indicateur 32.</strong> Inès complète son plan d'amélioration par une analyse des risques : quels événements pourraient dégrader la qualité de ses formations ? Elle identifie par exemple l'indisponibilité de la formatrice (elle est seule à animer la plupart des sessions), la panne du matériel informatique, un groupe trop hétérogène, une erreur dans un document contractuel, la perte de données. Pour chaque risque, elle évalue la probabilité et la gravité, puis décide d'une mesure : vivier de formateurs de remplacement, postes de secours, renforcement du positionnement, relecture des modèles, sauvegarde externe. La méthode sera détaillée au chapitre 7.</p>
<p><strong>Indicateur 33.</strong> Non applicable : Atelier Sésame Formation ne réalise pas d'actions de formation par apprentissage.</p>

<h3>Récapitulatif des 33 indicateurs</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Communs</th><th>Spécifiques</th><th>Adaptation nouvel entrant</th><th>Majeure uniquement</th></tr>
<tr><td>1</td><td>1, 2</td><td>3 (certifiant)</td><td>2, 3</td><td>–</td></tr>
<tr><td>2</td><td>4, 5, 6</td><td>7 (certifiant), 8 (formation et apprentissage)</td><td>–</td><td>4, 5, 6, 7</td></tr>
<tr><td>3</td><td>9, 10, 11, 12</td><td>13, 14, 15 (CFA), 16 (certifiant)</td><td>11, 13, 14</td><td>10, 11, 14, 15, 16</td></tr>
<tr><td>4</td><td>17, 18, 19</td><td>20 (CFA)</td><td>19</td><td>20</td></tr>
<tr><td>5</td><td>21, 22</td><td>–</td><td>22</td><td>21, 22</td></tr>
<tr><td>6</td><td>23, 24, 25, 26, 27</td><td>28 (situation de travail), 29 (CFA)</td><td>24, 25, 26</td><td>26, 27, 29</td></tr>
<tr><td>7</td><td>30, 31, 32</td><td>33 (CFA, créé en 2026)</td><td>32</td><td>31, 32</td></tr>
</table>
<p>Les colonnes « nouvel entrant » et « majeure uniquement » reprennent l'arrêté relatif aux modalités d'audit dans sa rédaction consultée en 2026, antérieure au décret n° 2026-728 ; elles peuvent être ajustées pour tenir compte du nouvel indicateur 33. Vérifiez la version en vigueur au moment de votre audit.</p>

<blockquote><strong>À retenir.</strong> Les critères 4 à 7 couvrent les indicateurs 17 à 33 : moyens et coordination (17 à 20), compétences des intervenants (21, 22), veilles, handicap, sous-traitance et partenariats (23 à 29), appréciations, réclamations, amélioration et évaluation des enseignements (30 à 33). En 2026, l'indicateur 27 s'étend au portage salarial avec traçabilité dans les contrats, l'indicateur 32 intègre une analyse des risques et l'indicateur 33 est créé pour les CFA.</blockquote>
`,
      },
      {
        title: "4.5 – Choisir son organisme certificateur et comprendre le cycle d'audit",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Choisir un organisme certificateur habilité à délivrer la certification.</li>
<li>Décrire les étapes de l'audit initial, de l'audit de surveillance et de l'audit de renouvellement.</li>
<li>Anticiper les cas particuliers : extension à une nouvelle catégorie, transfert, nouvelle demande après refus.</li>
</ul>

<h3>Qui peut délivrer la certification ?</h3>
<p>Selon l'article L.6316-2 du Code du travail, la certification est délivrée soit par un <strong>organisme certificateur accrédité</strong>, ou en cours d'accréditation, par l'instance nationale d'accréditation (en France, le Cofrac) ou par un organisme signataire de l'accord européen de reconnaissance multilatérale, soit par une <strong>instance de labellisation reconnue par France compétences</strong>. La liste des organismes certificateurs autorisés est publiée par le ministère chargé de la formation professionnelle ; vérifiez qu'un organisme y figure avant de signer.</p>

<h3>Critères de choix d'un certificateur</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Questions à poser</th></tr>
<tr><td>Habilitation</td><td>L'organisme figure-t-il sur la liste officielle ? Pour quelles catégories d'actions ?</td></tr>
<tr><td>Tarif</td><td>Le devis couvre-t-il l'audit initial, l'audit de surveillance, les frais de déplacement, un éventuel audit complémentaire ? Les tarifs sont libres et varient sensiblement d'un certificateur à l'autre.</td></tr>
<tr><td>Délais</td><td>Quelle date d'audit peut être proposée ? L'arrêté relatif aux modalités d'audit prévoit que l'organisme certificateur propose une date d'audit initial dans un délai maximal de trente jours calendaires à compter de la réception du contrat signé et des pièces demandées.</td></tr>
<tr><td>Modalités</td><td>Audit sur site ou à distance ? Quels documents doivent être transmis en amont ? Quelle plateforme d'échange ?</td></tr>
<tr><td>Auditeurs</td><td>Les auditeurs connaissent-ils les petits organismes et les catégories d'actions concernées ?</td></tr>
<tr><td>Accompagnement</td><td>Attention : un certificateur ne peut pas à la fois conseiller un organisme pour préparer sa certification et l'auditer, pour des raisons d'impartialité. Le conseil, s'il est souhaité, est demandé à un autre prestataire.</td></tr>
</table>

<h3>L'audit initial</h3>
<ol>
<li><strong>Demande et contrat.</strong> L'organisme candidat transmet ses informations administratives (dénomination, SIREN, statut, numéro de déclaration d'activité, catégories d'actions, chiffre d'affaires de formation, nombre de sites) et signe le contrat de certification, accompagné d'une déclaration sur l'honneur relative à ses éventuelles certifications ou demandes antérieures.</li>
<li><strong>Préparation.</strong> L'auditeur envoie un plan d'audit : date, horaires, personnes à rencontrer, documents à préparer. Le plan indique s'il s'agit d'un audit de nouvel entrant.</li>
<li><strong>Audit.</strong> Sa durée dépend du chiffre d'affaires, du nombre de catégories d'actions et du nombre de sites ; pour un petit organisme mono-site et une seule catégorie, elle est courte, de l'ordre d'une journée au plus. L'auditeur examine chaque indicateur applicable, s'entretient avec la direction et, si possible, avec des intervenants, et consulte des dossiers de bénéficiaires.</li>
<li><strong>Rapport.</strong> L'auditeur formule ses constats : conformités, non-conformités mineures ou majeures, éventuellement des pistes de progrès.</li>
<li><strong>Décision.</strong> L'organisme certificateur, et non l'auditeur seul, prend la décision de certification. Le certificat est délivré pour trois ans et mentionne les catégories d'actions certifiées.</li>
</ol>

<h3>L'audit de surveillance</h3>
<p>L'audit de surveillance a lieu <strong>entre le 14e et le 22e mois</strong> suivant la date d'obtention de la certification. Il vérifie que le référentiel continue d'être appliqué. Il se déroule en principe à distance, et sur site dans certains cas (réclamations, analyse de risque de l'organisme certificateur, demande de l'organisme audité). Il porte au minimum sur les indicateurs ayant fait l'objet de non-conformités lors de l'audit précédent, sur certains indicateurs désignés par l'arrêté (dont les indicateurs 1, 17 et 19, ainsi que l'indicateur 3 lorsqu'il est applicable) et sur les indicateurs ne pouvant donner lieu qu'à des non-conformités majeures. Pour un organisme audité initialement en tant que nouvel entrant, tous les indicateurs applicables sont examinés : c'est là que l'auditeur vérifie la mise en œuvre effective des processus qui n'étaient que formalisés lors de l'audit initial.</p>
<p>Ne pas préparer la surveillance est une erreur courante. Elle arrive vite (dès le 14e mois), et l'auditeur demande des preuves de fonctionnement réel : dossiers de stagiaires de la période, plan d'amélioration mis à jour, veilles exploitées, réclamations traitées.</p>

<h3>L'audit de renouvellement</h3>
<p>Avant l'échéance des trois ans, un audit de renouvellement est réalisé sur site, selon les modalités d'un audit initial. Il vérifie notamment la mise en œuvre des actions correctives décidées après l'audit de surveillance. La nouvelle décision prend effet le lendemain de l'expiration du certificat précédent, ce qui suppose d'anticiper : il est conseillé de programmer le renouvellement plusieurs mois avant l'échéance pour éviter toute interruption, qui priverait l'organisme de l'accès aux financements.</p>

<h3>Cas particuliers</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Règle (arrêté relatif aux modalités d'audit)</th></tr>
<tr><td>Ajout d'une catégorie d'actions (par exemple, bilans de compétences)</td><td>Audit d'extension, selon les modalités d'un audit initial, portant sur la nouvelle catégorie</td></tr>
<tr><td>Changement d'organisme certificateur</td><td>Procédure de transfert : le nouveau certificateur obtient les éléments du précédent ; le certificat transféré conserve la date d'échéance initiale</td></tr>
<tr><td>Refus ou retrait de certification</td><td>Une nouvelle demande ne peut être déposée qu'après un délai de trois mois ; l'organisme doit démontrer que les non-conformités ont été traitées</td></tr>
<tr><td>Organisme multi-sites</td><td>Échantillonnage des sites selon une formule fixée par l'arrêté ; le système qualité doit être unique et piloté par une fonction centrale</td></tr>
<tr><td>Réclamation contre un organisme certifié</td><td>Le certificateur peut réaliser un audit complémentaire et, le cas échéant, suspendre la certification</td></tr>
</table>

<h3>Le calendrier type d'Atelier Sésame Formation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Période</th><th>Étape</th></tr>
<tr><td>Mois 1 à 3</td><td>Autodiagnostic sur les 33 indicateurs, mise à niveau des documents (chapitre 3), choix du certificateur</td></tr>
<tr><td>Mois 4</td><td>Signature du contrat de certification, réception du plan d'audit</td></tr>
<tr><td>Mois 5</td><td>Audit initial ; traitement des éventuelles non-conformités ; décision</td></tr>
<tr><td>Mois 5 + 14 à 22 mois</td><td>Audit de surveillance, à préparer trois mois à l'avance</td></tr>
<tr><td>Avant la fin de la 3e année</td><td>Audit de renouvellement, programmé plusieurs mois avant l'échéance</td></tr>
</table>

<blockquote><strong>À retenir.</strong> La certification est délivrée par un organisme certificateur accrédité (Cofrac ou équivalent européen) ou par une instance de labellisation reconnue par France compétences (article L.6316-2). Le cycle comprend un audit initial (date proposée sous trente jours après le contrat et les pièces), un certificat de trois ans, un audit de surveillance entre le 14e et le 22e mois, principalement à distance, et un audit de renouvellement sur site avant l'échéance. Le certificateur ne peut pas être aussi le conseil de l'organisme.</blockquote>
`,
      },
      {
        title: "4.6 – Les non-conformités mineures et majeures : comprendre, prévenir, traiter",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Distinguer une non-conformité mineure d'une non-conformité majeure et en connaître les conséquences.</li>
<li>Connaître les délais de traitement fixés par l'arrêté relatif aux modalités d'audit.</li>
<li>Rédiger un plan d'actions correctives efficace.</li>
</ul>

<h3>Deux niveaux d'écart</h3>
<p>Le guide de lecture distingue deux niveaux de non-conformité. Une <strong>non-conformité mineure</strong> correspond à une prise en compte partielle d'un indicateur, qui ne remet pas en cause la qualité de la prestation. Une <strong>non-conformité majeure</strong> correspond à la non-prise en compte ou à une prise en compte partielle de l'exigence qui remet en cause la qualité de la prestation délivrée.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Exemple de constat</th><th>Niveau probable</th><th>Pourquoi</th></tr>
<tr><td>La fiche programme ne mentionne pas les délais d'accès, tous les autres items de l'indicateur 1 sont présents</td><td>Mineure</td><td>Prise en compte partielle sans atteinte à la qualité de la formation</td></tr>
<tr><td>Aucune analyse des besoins n'est réalisée ni tracée (indicateur 4)</td><td>Majeure</td><td>Indicateur ne pouvant donner lieu qu'à une non-conformité majeure</td></tr>
<tr><td>Les évaluations finales existent mais ne sont pas archivées pour deux stagiaires sur dix (indicateur 11)</td><td>Majeure (l'indicateur 11 ne peut donner lieu qu'à une majeure), d'où l'importance d'un archivage complet</td><td>Le processus est en place mais la démonstration est incomplète</td></tr>
<tr><td>Les questionnaires de satisfaction sont collectés mais aucun questionnaire n'est adressé aux entreprises clientes (indicateur 30)</td><td>Mineure</td><td>Recueil partiel des appréciations des parties prenantes</td></tr>
<tr><td>Le contrat de sous-traitance de Paul RENAUD ne mentionne aucune exigence qualité (indicateur 27)</td><td>Majeure</td><td>Indicateur ne pouvant donner lieu qu'à une non-conformité majeure</td></tr>
</table>

<h3>Les indicateurs « majeure uniquement »</h3>
<p>L'arrêté relatif aux modalités d'audit, dans sa rédaction consultée en 2026, prévoit que les indicateurs <strong>4, 5, 6, 7, 10, 11, 14, 15, 16, 20, 21, 22, 26, 27, 29, 31 et 32</strong> ne peuvent donner lieu qu'à des non-conformités majeures. Les autres indicateurs peuvent être pondérés et donner lieu à des non-conformités mineures ou majeures. En pratique, pour une action de formation non certifiante comme celles d'Atelier Sésame, les indicateurs à sécuriser en priorité sont donc : 4 (besoins), 5 (objectifs), 6 (contenus et modalités), 10 (adaptation), 11 (évaluation), 21 (compétences des intervenants), 22 (développement des compétences), 26 (handicap), 27 (sous-traitance et portage), 31 (réclamations et aléas) et 32 (amélioration continue et analyse des risques).</p>
<p>L'arrêté prévoit en outre que l'existence d'au moins <strong>cinq non-conformités mineures</strong> non levées au moment de la prise de décision constitue une non-conformité majeure.</p>

<h3>Les délais de traitement</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type</th><th>Ce que doit faire l'organisme</th><th>Délai</th><th>Conséquence si rien n'est fait</th></tr>
<tr><td>Mineure</td><td>Adresser un plan d'actions au certificateur dans le délai fixé par celui-ci, puis le mettre en œuvre</td><td>Mise en œuvre dans un délai de six mois ; vérification lors de l'audit suivant</td><td>Une non-conformité mineure non levée lors de l'audit suivant devient majeure</td></tr>
<tr><td>Majeure</td><td>Mettre en œuvre des actions correctives et en apporter la preuve</td><td>Trois mois ; le certificateur vérifie dans le mois qui suit</td><td>Audit initial : refus de certification. Audit de surveillance ou de renouvellement : suspension, puis retrait ou non-renouvellement si la non-conformité n'est pas levée dans les trois mois suivant la notification de la suspension</td></tr>
</table>
<p>La vérification du traitement peut donner lieu à un audit complémentaire, à distance ou sur site, généralement facturé. Pendant une suspension, l'organisme ne peut plus se prévaloir de la certification : un financeur peut refuser de financer de nouvelles actions. Une non-conformité majeure à l'audit de surveillance est donc un risque économique sérieux.</p>

<h3>Rédiger un plan d'actions correctives</h3>
<p>Un plan d'actions efficace traite la cause, pas seulement le symptôme. Il comporte, pour chaque non-conformité :</p>
<ol>
<li>le constat de l'auditeur, recopié tel quel ;</li>
<li>l'analyse de la cause (pourquoi l'écart s'est-il produit ?) ;</li>
<li>la correction immédiate (ce que l'on corrige tout de suite sur le cas constaté) ;</li>
<li>l'action corrective (ce que l'on change dans l'organisation pour que l'écart ne se reproduise pas) ;</li>
<li>le responsable et l'échéance ;</li>
<li>la preuve de réalisation et la vérification de l'efficacité.</li>
</ol>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Constat</th><th>Cause</th><th>Correction</th><th>Action corrective</th><th>Responsable / échéance</th><th>Preuve</th></tr>
<tr><td>Indicateur 1 : délais d'accès absents des fiches programmes</td><td>Modèle de fiche ancien, sans cette rubrique</td><td>Ajout des délais d'accès sur les six fiches en ligne</td><td>Mise à jour du modèle de fiche et ajout d'une ligne « délais d'accès » à la liste de contrôle de publication</td><td>Inès MARCHAND, sous quinze jours</td><td>Fiches datées, nouveau modèle, liste de contrôle</td></tr>
<tr><td>Indicateur 30 : pas de recueil des appréciations des entreprises</td><td>Le questionnaire n'existait que pour les stagiaires</td><td>Envoi d'un questionnaire aux trois entreprises clientes de l'année</td><td>Questionnaire entreprise intégré à la procédure de clôture de chaque action intra ; synthèse annuelle</td><td>Inès MARCHAND, sous un mois</td><td>Questionnaires envoyés et reçus, procédure mise à jour</td></tr>
</table>
<p>L'erreur la plus fréquente est de ne traiter que la correction : corriger la fiche concernée sans changer le modèle, si bien que la prochaine fiche reproduit l'écart. L'auditeur de surveillance le verra.</p>

<h3>Prévenir plutôt que guérir : l'audit blanc</h3>
<p>Un audit blanc consiste à se mettre à la place de l'auditeur, indicateur par indicateur, avec un regard extérieur si possible (un pair, un consultant, un réseau d'organismes). Il se prépare avec le guide de lecture : pour chaque indicateur applicable, on formule la question que poserait l'auditeur, on rassemble la preuve, on évalue la démonstration (conforme, mineure, majeure) et on note les actions à mener. Inès a réalisé le sien avec une autre dirigeante d'organisme rencontrée dans un réseau professionnel : chacune a audité l'autre pendant une demi-journée. Cet échange a révélé onze écarts, dont trois qui auraient été majeurs (indicateurs 22, 27 et 32).</p>

<blockquote><strong>À retenir.</strong> Une non-conformité mineure est une prise en compte partielle, une majeure une absence de prise en compte ou une prise en compte partielle qui remet en cause la qualité. Dix-sept indicateurs ne peuvent donner lieu qu'à une majeure (4, 5, 6, 7, 10, 11, 14, 15, 16, 20, 21, 22, 26, 27, 29, 31, 32) et cinq mineures non levées valent une majeure. Délais : six mois pour mettre en œuvre le plan d'actions d'une mineure, trois mois pour lever une majeure, sous peine de refus, de suspension puis de retrait.</blockquote>
`,
      },
      {
        title: "4.7 – Construire un système de preuves proportionné à un petit organisme",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Réaliser un autodiagnostic sur les indicateurs applicables.</li>
<li>Organiser les preuves de façon simple, durable et facile à présenter.</li>
<li>Construire les quelques procédures et outils qui couvrent l'essentiel du référentiel, sans excès documentaire.</li>
</ul>

<h3>Le principe de proportionnalité</h3>
<p>Le référentiel s'applique de la même manière à un organisme de cinq cents salariés et à une entreprise individuelle. Mais le guide de lecture rappelle que les éléments de preuve sont des exemples et que la démonstration s'adapte à la taille et à l'activité du prestataire. Une formatrice indépendante n'a pas besoin d'un organigramme de vingt cases pour l'indicateur 18 : il lui suffit de montrer qu'elle assure elle-même les fonctions pédagogiques, administratives et commerciales, et comment elle coordonne ses intervenants externes. L'objectif n'est pas de produire des documents pour l'auditeur, mais de formaliser ce qui est réellement fait, et de le faire réellement.</p>
<p>Deux pièges opposés guettent les petits organismes : <strong>l'absence de traces</strong> (« je le fais, mais je ne l'écris pas ») et <strong>l'inflation documentaire</strong> (des classeurs de procédures achetées toutes faites, que personne n'applique). Le second est souvent plus dangereux : l'auditeur demande la preuve que la procédure affichée est appliquée, et l'écart entre le document et la réalité devient lui-même une non-conformité.</p>

<h3>Étape 1 : l'autodiagnostic</h3>
<p>L'autodiagnostic se fait dans un tableau à six colonnes, une ligne par indicateur :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Applicable ?</th><th>Ce que je fais aujourd'hui</th><th>Preuves disponibles</th><th>Écart estimé</th><th>Action et échéance</th></tr>
<tr><td>1</td><td>Oui</td><td>Fiches programmes sur le site</td><td>Six fiches en ligne</td><td>Délais d'accès et date de mise à jour absents</td><td>Mettre à jour le modèle, d'ici la fin du mois</td></tr>
<tr><td>3</td><td>Non : aucune prestation certifiante</td><td>–</td><td>Justification écrite</td><td>–</td><td>–</td></tr>
<tr><td>22</td><td>Oui</td><td>Je me forme régulièrement, sans plan</td><td>Deux attestations de formation</td><td>Pas de plan, pas de recensement des besoins</td><td>Rédiger un plan annuel de développement des compétences</td></tr>
<tr><td>27</td><td>Oui : sous-traitance et futur portage salarial</td><td>Contrat simple avec Paul RENAUD</td><td>Contrat sans clause qualité</td><td>Exigences qualité absentes, portage non prévu</td><td>Réécrire les contrats et créer un registre des intervenants externes</td></tr>
<tr><td>32</td><td>Oui</td><td>J'améliore au fil des retours</td><td>Aucune trace</td><td>Pas de plan d'amélioration, pas d'analyse des risques</td><td>Créer le plan d'amélioration et la cartographie des risques</td></tr>
</table>

<h3>Étape 2 : une architecture documentaire simple</h3>
<p>Inès organise son système qualité en trois niveaux, dans un espace de stockage sauvegardé :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Niveau</th><th>Contenu</th><th>Exemples</th></tr>
<tr><td>1. Système</td><td>Les documents qui décrivent le fonctionnement de l'organisme ; mis à jour au moins une fois par an</td><td>Présentation de l'organisme, tableau de correspondance indicateurs / preuves, procédures, modèles, plan d'amélioration et analyse des risques, tableaux de veille, registre des réclamations et aléas, registre des intervenants externes, plan de développement des compétences</td></tr>
<tr><td>2. Offre</td><td>Un dossier par formation</td><td>Fiche programme versionnée, déroulé pédagogique, supports, outils d'évaluation, matrice d'alignement, historique des modifications</td></tr>
<tr><td>3. Réalisation</td><td>Un dossier par session et par stagiaire</td><td>Dossiers stagiaires (section 3.7), émargements, évaluations, questionnaires, bilan de session</td></tr>
</table>
<p>Le document clé est le <strong>tableau de correspondance indicateurs / preuves</strong> : pour chaque indicateur applicable, il indique où se trouvent les preuves. Le jour de l'audit, il permet de répondre à chaque question en ouvrant le bon document en quelques secondes.</p>

<h3>Étape 3 : les procédures et outils indispensables</h3>
<p>Pour un organisme de la taille d'Atelier Sésame Formation, une quinzaine d'outils couvrent l'essentiel :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Outil</th><th>Indicateurs principalement couverts</th></tr>
<tr><td>Modèle de fiche programme et procédure de mise à jour</td><td>1, 2, 3 le cas échéant</td></tr>
<tr><td>Questionnaire de recueil des besoins et test de positionnement</td><td>4, 8</td></tr>
<tr><td>Modèle de déroulé pédagogique et matrice d'alignement</td><td>5, 6</td></tr>
<tr><td>Convocation et livret d'accueil (avec règlement intérieur)</td><td>9</td></tr>
<tr><td>Journal de session et procédure de suivi des absences</td><td>10, 12</td></tr>
<tr><td>Grilles d'évaluation et modèle d'attestation de fin de formation</td><td>11</td></tr>
<tr><td>Fiche de vérification des locaux et du matériel avant session</td><td>17</td></tr>
<tr><td>Grille de sélection et d'évaluation des formateurs, plan de développement des compétences</td><td>21, 22</td></tr>
<tr><td>Tableau de veille (légale, métiers, pédagogique, handicap) avec colonne « décision prise »</td><td>23, 24, 25, 26</td></tr>
<tr><td>Annuaire des partenaires handicap et procédure d'accueil</td><td>26</td></tr>
<tr><td>Contrat type de sous-traitance et de portage avec clauses qualité, registre des intervenants externes</td><td>27</td></tr>
<tr><td>Questionnaires d'appréciation (stagiaires à chaud et à froid, entreprises, formateurs)</td><td>30</td></tr>
<tr><td>Procédure et registre des réclamations, difficultés et aléas</td><td>31</td></tr>
<tr><td>Plan d'amélioration continue et analyse des risques qualité</td><td>32</td></tr>
</table>

<h3>Le cas du nouvel entrant</h3>
<p>Un organisme qui débute n'a pas d'historique : pas de résultats à publier, pas de veille déjà exploitée, pas de plan d'amélioration nourri par des retours. Pour les indicateurs 2, 3, 11, 13, 14, 19, 22, 24, 25, 26 et 32, l'arrêté relatif aux modalités d'audit prévoit qu'à l'audit initial, l'auditeur vérifie que le processus est formalisé ; la mise en œuvre est contrôlée à l'audit de surveillance. Concrètement, un nouvel entrant présente par exemple :</p>
<ul>
<li>pour l'indicateur 2 : la liste des indicateurs de résultats qu'il publiera, leur mode de calcul et leur fréquence de mise à jour, ainsi que l'emplacement prévu sur le site ;</li>
<li>pour l'indicateur 11 : les grilles et épreuves d'évaluation prêtes à l'emploi et le modèle d'attestation ;</li>
<li>pour les indicateurs 24 et 25 : les sources de veille identifiées, l'organisation (fréquence, outil) et le format de la trace ;</li>
<li>pour l'indicateur 26 : la référente handicap désignée et l'annuaire des partenaires ;</li>
<li>pour l'indicateur 32 : le modèle de plan d'amélioration, la façon dont il sera alimenté et une première analyse des risques.</li>
</ul>
<p>Pour tous les autres indicateurs applicables, le nouvel entrant doit démontrer la conformité dès l'audit initial, au besoin sur la base des premières actions réalisées ou des documents prêts à l'emploi. Attention : un organisme qui a déjà réalisé des formations depuis plus d'un an n'est pas un nouvel entrant pour la catégorie concernée, même s'il demande la certification pour la première fois. C'est le cas d'Atelier Sésame Formation, qui forme depuis plusieurs années : Inès devra présenter des preuves de mise en œuvre sur l'ensemble des indicateurs applicables.</p>

<h3>Faire vivre le système</h3>
<p>Un système qualité vit au rythme de l'activité. Inès a fixé un calendrier simple :</p>
<ul>
<li><strong>à chaque session</strong> : dossier complet, bilan de session de dix lignes, mise à jour du registre des réclamations et aléas si nécessaire ;</li>
<li><strong>chaque mois</strong> : une heure de veille, consignée dans le tableau de veille avec les décisions prises ;</li>
<li><strong>chaque trimestre</strong> : revue du plan d'amélioration et de l'analyse des risques ;</li>
<li><strong>chaque année, en janvier</strong> : calcul et publication des indicateurs de résultats, revue des fiches programmes, bilan avec les intervenants externes, mise à jour du plan de développement des compétences.</li>
</ul>

<blockquote><strong>À retenir.</strong> La démonstration est proportionnée à la taille de l'organisme : on formalise ce que l'on fait réellement, sans inflation documentaire. Un autodiagnostic indicateur par indicateur, une architecture en trois niveaux (système, offre, réalisation), un tableau de correspondance indicateurs / preuves et une quinzaine d'outils couvrent l'essentiel. Le nouvel entrant démontre des processus formalisés pour onze indicateurs ; un organisme déjà actif doit prouver la mise en œuvre partout.</blockquote>
`,
      },
      {
        title: "4.8 – Vivre l'audit et faire vivre la certification",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Se préparer concrètement au jour de l'audit.</li>
<li>Adopter une posture efficace face à l'auditeur.</li>
<li>Utiliser correctement la certification et préparer la surveillance.</li>
</ul>

<h3>Avant l'audit : la liste de contrôle</h3>
<ul>
<li>Le plan d'audit est relu ; les personnes à rencontrer sont disponibles (pour un audit à distance, la connexion, la caméra et le partage d'écran ont été testés).</li>
<li>Le tableau de correspondance indicateurs / preuves est à jour et les liens fonctionnent.</li>
<li>Les justifications des indicateurs non applicables sont rédigées.</li>
<li>Plusieurs dossiers de stagiaires complets, de périodes et de formations différentes, sont prêts à être consultés ; l'auditeur choisira lui-même les dossiers à examiner.</li>
<li>Les documents publics (site, fiches) ont été relus le matin même : une fiche non datée ou un lien cassé se voit immédiatement.</li>
<li>Les intervenants externes ont été prévenus qu'ils pourraient être interrogés.</li>
</ul>

<h3>Pendant l'audit : la bonne posture</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>À faire</th><th>À éviter</th></tr>
<tr><td>Répondre précisément à la question posée, puis montrer la preuve</td><td>Faire de longs discours sans document</td></tr>
<tr><td>Expliquer comment les choses se passent réellement</td><td>Réciter une procédure que l'on n'applique pas</td></tr>
<tr><td>Reconnaître un écart et expliquer ce qui est prévu pour le corriger</td><td>Nier l'évidence, se justifier ou créer un document pendant l'audit</td></tr>
<tr><td>Demander une reformulation si la question n'est pas claire</td><td>Répondre à côté par crainte de paraître hésitant</td></tr>
<tr><td>Prendre des notes sur les constats et les pistes de progrès</td><td>Contester chaque remarque sur le moment ; les désaccords se traitent par écrit selon la procédure du certificateur</td></tr>
</table>
<p>L'auditeur n'est ni un contrôleur fiscal ni un consultant : il vérifie, sur échantillon, que les exigences sont satisfaites. Il ne peut pas conseiller l'organisme sur la façon de se mettre en conformité, mais il peut formuler des constats et des pistes de progrès. Une attitude ouverte et transparente rend l'audit plus fluide.</p>

<h3>La méthode de l'auditeur : le parcours d'un bénéficiaire</h3>
<p>Les auditeurs utilisent souvent la méthode du « fil conducteur » : ils choisissent un stagiaire et remontent son parcours. « Comment Leïla BENSAÏD a-t-elle connu votre offre ? Que contenait la fiche programme à ce moment-là ? Montrez-moi l'analyse de son besoin, son positionnement, son contrat, sa convocation, ses émargements, ses évaluations, son attestation, son questionnaire de satisfaction. A-t-elle eu un besoin d'adaptation ? Une difficulté pendant la formation ? Qu'avez-vous fait de son questionnaire ? » En dix minutes, ce parcours touche une quinzaine d'indicateurs. Un dossier stagiaire complet et ordonné (section 3.7) est la meilleure préparation possible.</p>

<h3>Après l'audit</h3>
<ol>
<li><strong>Lecture du rapport</strong> : vérifier l'exactitude des constats ; signaler rapidement une erreur factuelle.</li>
<li><strong>Plan d'actions</strong> : pour chaque non-conformité, rédiger et transmettre le plan d'actions dans le délai fixé (section 4.6).</li>
<li><strong>Décision et certificat</strong> : à réception, vérifier les mentions (raison sociale, SIREN, catégories d'actions, dates de validité).</li>
<li><strong>Mise à jour de la liste publique</strong> : la certification apparaît dans la liste publique des organismes de formation ; vérifier que l'information est exacte.</li>
<li><strong>Communication</strong> : utiliser le logo Qualiopi selon le règlement d'usage et la charte graphique, accompagné de la mention des catégories d'actions certifiées, uniquement sur les supports qui concernent ces catégories.</li>
</ol>

<h3>Communiquer sans tromper</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Formulation</th><th>Correcte ?</th><th>Commentaire</th></tr>
<tr><td>« Organisme certifié Qualiopi au titre de la catégorie : actions de formation »</td><td>Oui</td><td>Formulation exacte, à associer au logo</td></tr>
<tr><td>« Formation certifiée Qualiopi »</td><td>Non</td><td>Qualiopi certifie l'organisme, pas la formation</td></tr>
<tr><td>« Formation certifiante Qualiopi »</td><td>Non</td><td>Confusion avec les certifications professionnelles (RNCP, répertoire spécifique)</td></tr>
<tr><td>« Formation éligible au CPF grâce à Qualiopi »</td><td>Non</td><td>L'éligibilité au CPF dépend d'une certification professionnelle enregistrée, pas de Qualiopi seul</td></tr>
<tr><td>« Organisme agréé par l'État »</td><td>Non</td><td>Ni la déclaration d'activité ni Qualiopi ne valent agrément</td></tr>
<tr><td>« Certification Qualiopi en cours »</td><td>À éviter</td><td>Formule ambiguë qui peut laisser croire à une certification acquise ; n'utilisez jamais le logo avant la décision</td></tr>
</table>

<h3>Faire vivre la certification jusqu'au renouvellement</h3>
<p>Après l'obtention, trois risques guettent l'organisme : l'oubli (on relâche l'effort et la surveillance révèle des dossiers incomplets), le changement non maîtrisé (nouvelle formation, nouveau formateur, nouveau lieu, nouvelle catégorie d'actions, sans mise à jour du système) et l'évolution des règles (comme le décret n° 2026-728). Le tableau de veille légale (indicateur 23) permet de repérer ces évolutions et de les traduire en actions : en septembre 2026, Inès a inscrit dans son tableau « Décret n° 2026-728 du 1er août 2026 : 33 indicateurs au 1er novembre 2026 ; décisions : réécrire les contrats des intervenants externes (indicateur 27, portage salarial), ajouter une analyse des risques au plan d'amélioration (indicateur 32), indicateur 33 non applicable. »</p>

<blockquote><strong>À retenir.</strong> L'audit se prépare avec une liste de contrôle, un tableau de correspondance et des dossiers de stagiaires complets ; l'auditeur suit souvent le parcours d'un bénéficiaire. Pendant l'audit, on répond précisément, preuve à l'appui, et l'on reconnaît les écarts. Après l'audit, on traite les non-conformités dans les délais, on vérifie le certificat et l'on communique avec exactitude : un organisme certifié pour une catégorie d'actions, jamais une « formation certifiée Qualiopi ».</blockquote>
`,
      },
      {
        title: "4.9 – Quiz de fin de chapitre",
        content: `
<p>Pour chaque question, une seule réponse est correcte. Le corrigé figure après chaque question.</p>

<h4>Question 1 – Atelier Sésame Formation ne forme que des particuliers qui paient eux-mêmes. Est-elle tenue d'être certifiée Qualiopi ?</h4>
<ol type="A">
<li>Oui, tout organisme déclaré doit être certifié</li>
<li>Non : l'obligation ne concerne que les prestataires financés par les fonds visés à l'article L.6316-1 (OPCO, Transitions Pro, État, régions, Caisse des Dépôts, France Travail, Agefiph)</li>
<li>Oui, dès qu'elle a plus de dix stagiaires par an</li>
<li>Non, sauf si elle est en entreprise individuelle</li>
</ol>
<p><strong>Réponse : B.</strong> La certification conditionne l'accès aux fonds publics et mutualisés, pas l'exercice de l'activité.</p>

<h4>Question 2 – Combien le référentiel national qualité compte-t-il de critères et d'indicateurs pour un audit réalisé le 15 décembre 2026 ?</h4>
<ol type="A">
<li>7 critères, 32 indicateurs</li>
<li>7 critères, 33 indicateurs</li>
<li>8 critères, 33 indicateurs</li>
<li>6 critères, 30 indicateurs</li>
</ol>
<p><strong>Réponse : B.</strong> Le décret n° 2026-728 du 1er août 2026, en vigueur le 1er novembre 2026, porte le référentiel à 33 indicateurs ; les sept critères sont inchangés.</p>

<h4>Question 3 – Quelle modification le décret n° 2026-728 apporte-t-il à l'indicateur 27 ?</h4>
<ol type="A">
<li>Il le supprime</li>
<li>Il l'étend au portage salarial, avec traçabilité des exigences dans les contrats</li>
<li>Il le réserve aux CFA</li>
<li>Il interdit la sous-traitance</li>
</ol>
<p><strong>Réponse : B.</strong> Lorsque le prestataire recourt à la sous-traitance ou au portage salarial, il s'assure du respect du référentiel et en assure la traçabilité dans les contrats.</p>

<h4>Question 4 – Que doit désormais comporter la démarche de l'indicateur 32 ?</h4>
<ol type="A">
<li>Uniquement un questionnaire de satisfaction</li>
<li>Une démarche d'amélioration continue fondée sur les appréciations et les réclamations, complétée par une analyse des risques sur la qualité des formations délivrées</li>
<li>Un audit interne annuel par un cabinet extérieur</li>
<li>Un rapport financier</li>
</ol>
<p><strong>Réponse : B.</strong> L'analyse des risques est l'ajout de 2026 ; elle s'applique à tous les organismes.</p>

<h4>Question 5 – L'indicateur 33 concerne :</h4>
<ol type="A">
<li>Tous les organismes de formation</li>
<li>Les seuls organismes réalisant des bilans de compétences</li>
<li>Les CFA, avec un dispositif d'évaluation des contenus et des enseignements par les apprenants distinct de la satisfaction générale</li>
<li>Les organismes de plus de onze salariés</li>
</ol>
<p><strong>Réponse : C.</strong> C'est un indicateur spécifique aux actions de formation par apprentissage.</p>

<h4>Question 6 – Pour une formation non certifiante, quels indicateurs sont non applicables pour ce motif ?</h4>
<ol type="A">
<li>1, 2 et 4</li>
<li>3, 7 et 16</li>
<li>11, 30 et 32</li>
<li>21, 22 et 23</li>
</ol>
<p><strong>Réponse : B.</strong> Les indicateurs 3, 7 et 16 ne s'appliquent qu'aux prestations conduisant à une certification professionnelle.</p>

<h4>Question 7 – Quand a lieu l'audit de surveillance ?</h4>
<ol type="A">
<li>Six mois après la certification</li>
<li>Entre le 14e et le 22e mois suivant l'obtention de la certification</li>
<li>Uniquement en cas de réclamation</li>
<li>Au bout de trois ans</li>
</ol>
<p><strong>Réponse : B.</strong> Il se déroule en principe à distance et vérifie que le référentiel continue d'être appliqué ; pour un nouvel entrant, il contrôle la mise en œuvre de tous les indicateurs applicables.</p>

<h4>Question 8 – Lors d'un audit de surveillance, une non-conformité majeure est relevée. Que se passe-t-il si l'organisme ne la lève pas dans les trois mois ?</h4>
<ol type="A">
<li>Rien jusqu'au renouvellement</li>
<li>Elle est transformée en mineure</li>
<li>La certification est suspendue, puis retirée si la non-conformité n'est pas levée dans les trois mois suivant la notification de la suspension</li>
<li>L'organisme paie une amende au certificateur</li>
</ol>
<p><strong>Réponse : C.</strong> C'est le mécanisme prévu par l'arrêté relatif aux modalités d'audit.</p>

<h4>Question 9 – Combien de non-conformités mineures non levées au moment de la décision constituent une non-conformité majeure ?</h4>
<ol type="A">
<li>Deux</li>
<li>Trois</li>
<li>Cinq</li>
<li>Dix</li>
</ol>
<p><strong>Réponse : C.</strong> L'arrêté prévoit qu'au moins cinq non-conformités mineures non levées à la prise de décision constituent une non-conformité majeure.</p>

<h4>Question 10 – Laquelle de ces formulations est correcte sur le site d'un organisme certifié pour les actions de formation ?</h4>
<ol type="A">
<li>« Nos formations sont certifiées Qualiopi »</li>
<li>« Organisme agréé Qualiopi par l'État »</li>
<li>« Organisme certifié Qualiopi au titre de la catégorie : actions de formation », avec le logo conforme</li>
<li>« Formations certifiantes Qualiopi éligibles au CPF »</li>
</ol>
<p><strong>Réponse : C.</strong> La certification porte sur l'organisme et sur des catégories d'actions ; le logo s'utilise selon le règlement d'usage.</p>
`,
      },
      {
        title: "4.10 – Cas pratique corrigé : l'audit blanc d'Atelier Sésame Formation",
        content: `
<h3>Contexte (fictif)</h3>
<p>Inès MARCHAND a signé en novembre 2026 un contrat avec un organisme certificateur accrédité ; l'audit initial (actions de formation) est prévu en février 2027 et portera donc sur le référentiel à 33 indicateurs. Atelier Sésame Formation forme depuis quatre ans ; elle n'est pas un nouvel entrant. Avant l'audit, Inès organise un audit blanc avec une consœur. Voici les constats relevés (tous fictifs) :</p>
<ol>
<li>Les fiches programmes sont complètes, sauf la rubrique « délais d'accès », absente, et la date de mise à jour, absente sur deux fiches sur six.</li>
<li>Le site affiche « 98 % de satisfaction » sans période ni effectif.</li>
<li>Les questionnaires de recueil des besoins existent pour les particuliers, mais pas pour les salariés envoyés par des entreprises : aucune trace d'échange avec l'employeur.</li>
<li>Les évaluations finales sont réalisées, mais les attestations indiquent seulement « a suivi la formation avec assiduité », sans résultats.</li>
<li>Le contrat de Paul RENAUD (sous-traitant) ne contient aucune exigence qualité ; le second formateur interviendra en 2027 en portage salarial, sans contrat prévu à ce stade.</li>
<li>Inès se forme chaque année (attestations disponibles), mais rien n'est planifié.</li>
<li>Une réclamation a été reçue par mail en 2026 (supports illisibles) : la stagiaire a reçu une réponse, mais il n'existe ni registre ni procédure.</li>
<li>Aucun plan d'amélioration n'existe ; aucune analyse des risques.</li>
<li>Le site affiche déjà « Certifié Qualiopi » avec le logo, « pour rassurer les clients ».</li>
</ol>

<h3>Consigne</h3>
<ol>
<li>Pour chaque constat, indiquez l'indicateur concerné et le niveau de non-conformité probable (mineure ou majeure) si rien n'est fait avant l'audit.</li>
<li>Proposez, pour les constats 3, 5 et 8, une action corrective qui traite la cause.</li>
<li>Rédigez trois risques de l'analyse des risques demandée par l'indicateur 32, avec leur cotation et leur mesure de maîtrise.</li>
<li>Indiquez ce qu'Inès doit faire immédiatement à propos du constat 9.</li>
<li>Établissez la liste des indicateurs non applicables avec leur justification.</li>
</ol>

<h3>Corrigé</h3>

<h4>1. Qualification des constats</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Constat</th><th>Indicateur</th><th>Niveau probable</th><th>Commentaire</th></tr>
<tr><td>1. Délais d'accès et dates de mise à jour manquants</td><td>1</td><td>Mineure</td><td>Information partielle ; à corriger avant l'audit sur toutes les fiches</td></tr>
<tr><td>2. Taux de satisfaction sans période ni effectif</td><td>2</td><td>Mineure</td><td>Indicateur non vérifiable ; ajouter période, effectif, mode de calcul, fréquence de mise à jour, et idéalement un taux d'atteinte des objectifs</td></tr>
<tr><td>3. Pas d'analyse des besoins avec l'employeur</td><td>4</td><td>Majeure</td><td>Indicateur « majeure uniquement » ; l'analyse doit se faire en lien avec l'entreprise</td></tr>
<tr><td>4. Attestations sans résultats d'évaluation</td><td>11 (et pratique de l'attestation)</td><td>Majeure possible</td><td>Les évaluations existent : il faut démontrer l'exploitation des résultats et les reporter sur l'attestation ; l'indicateur 11 ne peut donner lieu qu'à une majeure</td></tr>
<tr><td>5. Sous-traitance sans clause qualité, portage non contractualisé</td><td>27</td><td>Majeure</td><td>Indicateur « majeure uniquement » ; depuis le 1er novembre 2026, le portage salarial est expressément visé</td></tr>
<tr><td>6. Formation de la dirigeante non planifiée</td><td>22</td><td>Majeure possible</td><td>Indicateur « majeure uniquement » ; les attestations prouvent une démarche réelle, il manque le recensement des besoins et la planification</td></tr>
<tr><td>7. Réclamation traitée sans procédure ni registre</td><td>31</td><td>Majeure possible</td><td>Indicateur « majeure uniquement » ; le traitement réel est un point fort, mais les modalités doivent être formalisées et tracées</td></tr>
<tr><td>8. Ni plan d'amélioration ni analyse des risques</td><td>32</td><td>Majeure</td><td>Indicateur « majeure uniquement » ; Inès n'étant pas nouvel entrant, la mise en œuvre doit être démontrée</td></tr>
<tr><td>9. Logo Qualiopi affiché sans certification</td><td>Règlement d'usage de la marque ; information du public (indicateur 1)</td><td>Grave</td><td>Pratique commerciale trompeuse ; risque pour la certification elle-même</td></tr>
</table>

<h4>2. Actions correctives</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Constat</th><th>Cause</th><th>Action corrective</th><th>Preuve</th></tr>
<tr><td>3</td><td>Le processus d'inscription a été conçu pour les particuliers uniquement</td><td>Créer une fiche de cadrage « entreprise » (entretien avec le responsable, objectifs attendus, situation de travail du salarié) et l'intégrer obligatoirement au processus avant tout devis ; compléter le questionnaire salarié</td><td>Fiche de cadrage, procédure d'inscription mise à jour, fiches remplies pour les sessions de décembre 2026 et janvier 2027</td></tr>
<tr><td>5</td><td>Contrats rédigés avant la démarche qualité, sans veille sur le décret de 2026</td><td>Réécrire le contrat type de sous-traitance et créer un contrat type pour le portage salarial (engagement au respect du référentiel, outils imposés, transmission des pièces, participation aux appréciations, droit de contrôle, bilan annuel) ; créer le registre des intervenants externes</td><td>Contrats signés avec Paul RENAUD et avec la société de portage, registre, premier bilan de collaboration</td></tr>
<tr><td>8</td><td>Améliorations réalisées au fil de l'eau, jamais consignées</td><td>Créer un plan d'amélioration unique alimenté par les questionnaires, les réclamations, les bilans de session et l'audit blanc ; le compléter par une cartographie des risques ; revue trimestrielle inscrite au calendrier</td><td>Plan daté avec actions, responsables, échéances et suivi ; cartographie des risques ; compte rendu de la première revue</td></tr>
</table>

<h4>3. Extrait de l'analyse des risques (indicateur 32)</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Risque sur la qualité</th><th>Probabilité (1 à 4)</th><th>Gravité (1 à 4)</th><th>Criticité</th><th>Mesure de maîtrise</th><th>Suivi</th></tr>
<tr><td>Indisponibilité soudaine de la formatrice (seule à animer la plupart des sessions)</td><td>2</td><td>4</td><td>8</td><td>Vivier de deux formateurs remplaçants sous contrat type, déroulés et supports partagés, règle de report communiquée aux stagiaires</td><td>Revue trimestrielle ; test d'un remplacement par an</td></tr>
<tr><td>Groupe trop hétérogène qui empêche l'atteinte des objectifs</td><td>3</td><td>3</td><td>9</td><td>Positionnement systématique avant contrat, exercices différenciés prévus dans chaque déroulé</td><td>Taux d'atteinte des objectifs par session</td></tr>
<tr><td>Erreur dans un document contractuel (contrat de particulier non conforme)</td><td>2</td><td>3</td><td>6</td><td>Modèles validés et versionnés, liste de contrôle avant envoi, veille légale mensuelle</td><td>Contrôle de cinq contrats par trimestre</td></tr>
</table>
<p>La criticité est ici le produit de la probabilité et de la gravité ; les risques dont la criticité est la plus élevée sont traités en priorité. La grille de cotation est un choix de l'organisme ; ce qui compte est de l'appliquer de façon cohérente et de suivre l'efficacité des mesures.</p>

<h4>4. Constat 9 : action immédiate</h4>
<p>Retirer immédiatement le logo et la mention « Certifié Qualiopi » de tous les supports (site, signature électronique, plaquettes, réseaux sociaux). Le logo ne pourra être utilisé qu'après la décision de certification, conformément au règlement d'usage, avec la mention de la catégorie certifiée. En attendant, Inès peut écrire, de façon exacte, qu'elle s'est engagée dans une démarche qualité, sans laisser croire à une certification acquise.</p>

<h4>5. Indicateurs non applicables</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateurs</th><th>Justification</th></tr>
<tr><td>3, 7, 16</td><td>Aucune prestation ne conduit à une certification professionnelle (formations non certifiantes)</td></tr>
<tr><td>13, 14, 15, 20, 29, 33</td><td>Aucune action de formation par apprentissage ; certification demandée pour la seule catégorie « actions de formation »</td></tr>
<tr><td>28</td><td>Les formations ne comportent pas de période de formation en situation de travail</td></tr>
</table>
<p>L'indicateur 27 n'est <strong>pas</strong> non applicable : Inès recourt à la sous-traitance et bientôt au portage salarial. Restent donc 23 indicateurs à démontrer : 1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 30, 31 et 32.</p>

<h4>Erreurs fréquentes relevées lors de la correction</h4>
<ul>
<li>Considérer Atelier Sésame comme nouvel entrant parce qu'elle demande la certification pour la première fois.</li>
<li>Déclarer l'indicateur 27 non applicable au motif que Paul RENAUD « est indépendant ».</li>
<li>Oublier le portage salarial, ajouté à l'indicateur 27 par le décret de 2026.</li>
<li>Se contenter de corriger l'attestation d'un stagiaire sans changer le modèle.</li>
<li>Laisser le logo en ligne « puisque l'audit est déjà programmé ».</li>
</ul>

<blockquote><strong>À retenir.</strong> L'audit blanc transforme le référentiel en plan d'action concret : qualifier chaque écart, en traiter la cause, prioriser les indicateurs qui ne peuvent donner lieu qu'à une non-conformité majeure, justifier les non-applicabilités et ne jamais communiquer sur une certification non obtenue. Avec le référentiel 2026, l'analyse des risques (indicateur 32) et la contractualisation de la sous-traitance et du portage salarial (indicateur 27) sont des priorités pour tous les organismes.</blockquote>
`,
      },
    ],
  },
];
