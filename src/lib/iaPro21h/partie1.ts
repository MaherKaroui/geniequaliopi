import type { CourseChapter } from "../courseContent";

export const IAP21_PARTIE1: CourseChapter[] = [
  {
    title: "Chapitre 1 – Organisation de la formation et fondamentaux de l'intelligence artificielle générative (C1)",
    description: "Découvrir l'organisation des trois jours de formation en présentiel, les objectifs C1 à C5 et les modalités d'évaluation interne, puis comprendre ce qu'est l'intelligence artificielle générative : son histoire, l'apprentissage automatique, les réseaux de neurones et les grands modèles de langage, les notions de tokens, de fenêtre de contexte et de génération probabiliste, la multimodalité, les IA connectées au web, les hallucinations, les biais et les limites, le panorama des outils et les cas d'usage concrets d'une TPE/PME du bâtiment, avec l'entreprise fictive Thermia Rénov qui sert de fil rouge à tout le support.",
    sections: [
      {
        title: "1.1 – Organisation de la formation, objectifs et modalités d'évaluation",
        content: `
<h3>La formation en bref</h3>
<p>La formation « Intelligence artificielle : intégrer les outils d'IA dans son activité professionnelle – 21 h » s'adresse aux salariés et aux dirigeants de TPE et de PME, en particulier du bâtiment et de la rénovation énergétique : commerciaux, assistants administratifs, conducteurs de travaux, chargés d'affaires, dirigeants. Elle poursuit un objectif simple : vous rendre capable d'<strong>utiliser les outils d'intelligence artificielle générative de façon utile, fiable et responsable</strong> dans votre travail quotidien, pour gagner du temps sur les tâches répétitives (mails, comptes rendus, synthèses, publications) sans jamais renoncer à votre jugement professionnel ni exposer les données de vos clients.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Contenu</th></tr>
<tr><td>Intitulé</td><td>Intelligence artificielle : intégrer les outils d'IA dans son activité professionnelle – 21 h</td></tr>
<tr><td>Nature</td><td>Action de formation professionnelle continue, <strong>non certifiante</strong> : elle ne prépare à aucun diplôme, titre ou certificat enregistré et ne donne lieu à aucun examen officiel</td></tr>
<tr><td>Public visé</td><td>Salariés et dirigeants de TPE/PME, notamment du bâtiment et de la rénovation énergétique (commerciaux, assistants administratifs, conducteurs de travaux, chargés d'affaires, dirigeants)</td></tr>
<tr><td>Prérequis</td><td>Utilisation courante d'un ordinateur, d'un navigateur Internet et d'une messagerie ; maîtrise du français écrit. Aucune connaissance technique en informatique ou en IA n'est requise</td></tr>
<tr><td>Durée</td><td>21 heures, soit 3 jours de 7 heures (9 h – 12 h 30 et 13 h 30 – 17 h)</td></tr>
<tr><td>Session de référence</td><td>Du lundi 28 septembre 2026 au mercredi 30 septembre 2026</td></tr>
<tr><td>Modalité</td><td>Présentiel, en salle (locaux de l'organisme ou de l'entreprise cliente) ; un poste informatique connecté à Internet par stagiaire ; émargement papier par demi-journée</td></tr>
<tr><td>Effectif</td><td>Groupe de 4 à 8 personnes, pour permettre un accompagnement individuel pendant les ateliers</td></tr>
<tr><td>Financement habituel</td><td>Plan de développement des compétences de l'entreprise employeur, avec prise en charge possible par son opérateur de compétences (OPCO) selon ses critères</td></tr>
<tr><td>Fil rouge</td><td>Thermia Rénov, PME fictive de rénovation énergétique présentée en section 1.7</td></tr>
<tr><td>Document remis</td><td>Attestation de fin de formation</td></tr>
</table>
<h3>Les objectifs de la formation</h3>
<p>À l'issue des trois jours, vous serez capable de :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Compétence</th><th>Intitulé</th><th>Ce que vous saurez faire concrètement</th></tr>
<tr><td>C1</td><td>Comprendre le fonctionnement, les possibilités et les limites de l'IA générative</td><td>Expliquer avec vos mots ce qu'est un grand modèle de langage, pourquoi il peut se tromper avec aplomb, ce que signifient tokens, contexte et date de connaissance ; distinguer un assistant conversationnel d'un moteur de réponse connecté au web ; choisir un outil adapté à une tâche.</td></tr>
<tr><td>C2</td><td>Rédiger des requêtes (prompts) efficaces et améliorer les réponses par itération</td><td>Structurer une demande (rôle, contexte, tâche, format, contraintes), fournir des exemples, découper un travail en étapes, faire critiquer et reformuler une réponse, constituer une bibliothèque de prompts et paramétrer un assistant personnalisé.</td></tr>
<tr><td>C3</td><td>Produire et vérifier des contenus professionnels avec l'IA</td><td>Rédiger des mails clients, courriers, comptes rendus, synthèses, FAQ, publications et visuels ; vérifier les faits, les chiffres, les sources, le ton et les mentions obligatoires, sans jamais laisser passer une promesse commerciale inventée.</td></tr>
<tr><td>C4</td><td>Intégrer l'IA dans ses processus de travail et automatiser des tâches simples</td><td>Cartographier vos tâches, repérer celles où l'IA apporte un gain réel, utiliser l'IA dans la suite bureautique, le tableur et les réunions, mettre en place une automatisation simple sans programmation et mesurer le temps gagné.</td></tr>
<tr><td>C5</td><td>Utiliser l'IA de façon responsable et conforme à la réglementation</td><td>Protéger les données personnelles et les informations confidentielles, appliquer les recommandations de la CNIL et les principes du règlement européen sur l'IA, respecter le droit d'auteur, informer vos clients, rédiger une charte d'usage interne.</td></tr>
</table>
<h3>Le déroulé des trois jours</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Jour</th><th>Matin (9 h – 12 h 30)</th><th>Après-midi (13 h 30 – 17 h)</th><th>Compétences travaillées</th></tr>
<tr><td>Jour 1 – lundi 28/09/2026</td><td>Accueil, présentation du formateur et des participants, analyse des besoins, QCM de positionnement ; fondamentaux de l'IA générative, limites, panorama des outils</td><td>Les bases de la requête efficace : structure, exemples, étapes ; ateliers sur des cas Thermia Rénov</td><td>C1 puis C2</td></tr>
<tr><td>Jour 2 – mardi 29/09/2026</td><td>Requêtes avancées : itération, critique, bibliothèque de prompts, assistants personnalisés ; production de contenus écrits (mails, courriers, comptes rendus)</td><td>Synthèses de documents, FAQ, publications et visuels, tableaux et données ; méthodes de vérification</td><td>C2 avancé et C3</td></tr>
<tr><td>Jour 3 – mercredi 30/09/2026</td><td>Intégrer l'IA dans ses processus : cartographie des tâches, IA dans la suite bureautique, réunions, automatisations simples, mesure du temps gagné</td><td>Conformité et charte d'usage ; évaluation finale (mise en situation complète et QCM de fin), bilan, plan d'action individuel, questionnaire de satisfaction à chaud</td><td>C4, C5 et synthèse</td></tr>
</table>
<p>Vous signez la feuille d'émargement <strong>à chaque demi-journée</strong> : c'est la preuve de votre présence, exigée par l'organisme, par votre employeur et, le cas échéant, par l'OPCO qui finance la formation. Une demi-journée non signée ne peut pas être justifiée.</p>
<h3>Les modalités d'évaluation : une évaluation interne, sans certification</h3>
<p>Cette formation n'est <strong>pas certifiante</strong> : elle ne débouche sur aucun diplôme ni aucun titre. L'organisme évalue néanmoins vos acquis tout au long du parcours, pour deux raisons : vous permettre de mesurer vos progrès et adapter l'accompagnement, et pouvoir indiquer sur l'attestation de fin de formation les résultats de l'évaluation des acquis, comme le prévoit l'article L. 6353-1 du code du travail.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Moment</th><th>Outil</th><th>Objectif</th></tr>
<tr><td>Avant ou au début du jour 1</td><td>Questionnaire d'analyse des besoins et <strong>QCM de positionnement</strong></td><td>Connaître vos usages actuels (ou l'absence d'usage), vos attentes, vos craintes et votre niveau de départ sur les cinq compétences ; adapter les exemples à vos métiers.</td></tr>
<tr><td>Pendant chaque journée</td><td><strong>Ateliers pratiques</strong> sur poste informatique, à partir de cas Thermia Rénov ou de vos propres tâches anonymisées</td><td>Vérifier que vous savez appliquer les méthodes, pas seulement les connaître ; le formateur relit vos requêtes et vos productions et vous fait un retour individualisé.</td></tr>
<tr><td>À la fin de chaque compétence</td><td><strong>QCM par compétence</strong> et quiz corrigés du support</td><td>Contrôler les connaissances indispensables : fonctionnement, limites, méthodes, règles de confidentialité.</td></tr>
<tr><td>Jour 3 après-midi</td><td><strong>Évaluation finale</strong> : mise en situation complète (traiter un dossier de bout en bout avec l'IA, de la requête à la vérification et à la diffusion conforme), observée avec une grille, et QCM de fin de formation</td><td>Mesurer l'atteinte des objectifs et comparer avec le positionnement de départ.</td></tr>
<tr><td>Fin de formation</td><td>Questionnaire de satisfaction à chaud ; questionnaire à froid quelques semaines plus tard</td><td>Améliorer la formation ; mesurer la mise en pratique réelle dans votre entreprise.</td></tr>
</table>
<p>À la fin du parcours, une <strong>attestation de fin de formation</strong> vous est remise. Elle précise les objectifs, la nature et la durée de l'action ainsi que les résultats de l'évaluation des acquis. Ce n'est pas un diplôme : c'est la preuve que vous avez suivi la formation et le reflet de ce que vous avez démontré pendant les évaluations.</p>
<h3>Comment utiliser ce support</h3>
<p>Ce support est volontairement plus détaillé que les séances : il sert de référence pendant la formation et, surtout, après, lorsque vous serez seul devant votre écran avec une tâche à accomplir. Chaque chapitre se termine par un <strong>quiz corrigé</strong> et un <strong>cas pratique corrigé</strong> tiré du fil rouge Thermia Rénov. Les outils d'IA évoluent très vite : noms des offres, fonctions disponibles, paramètres de confidentialité changent parfois plusieurs fois par an. Le support donne des principes stables et vous indique quoi vérifier ; prenez l'habitude de noter la date à laquelle vous avez constaté une fonctionnalité ou une condition d'utilisation.</p>
<blockquote><strong>Bonne pratique :</strong> tenez pendant les trois jours un « carnet de requêtes » en trois colonnes : la tâche (ce que je voulais obtenir), la requête qui a bien fonctionné, ce que j'ai dû vérifier ou corriger. Ce carnet deviendra le point de départ de votre bibliothèque de prompts personnelle et de votre plan d'action du jour 3.</blockquote>
<h3>Les règles du jeu en salle</h3>
<ul>
<li><strong>Confidentialité</strong> : pendant les ateliers, vous ne saisissez dans les outils d'IA <strong>aucune donnée réelle de client</strong> (nom, adresse, téléphone, revenus, photos de domicile identifiables) ni aucune information confidentielle de votre entreprise. On travaille sur le fil rouge fictif ou sur des documents anonymisés.</li>
<li><strong>Comptes et outils</strong> : utilisez les comptes prévus pour la formation ou ceux autorisés par votre employeur ; ne créez pas de compte professionnel sur un service sans y avoir été autorisé.</li>
<li><strong>Droit à l'erreur</strong> : une requête ratée est un excellent support d'apprentissage. On compare, on améliore, on recommence.</li>
<li><strong>Esprit critique</strong> : une réponse de l'IA n'est jamais une source. Si une information semble importante, on la vérifie à une source fiable avant de la retenir.</li>
<li><strong>Ponctualité et émargement</strong> : signature à chaque demi-journée ; téléphones en silencieux pendant les apports.</li>
</ul>
<blockquote><strong>À retenir</strong><br />Formation de 21 heures en présentiel sur trois jours (du 28 au 30 septembre 2026 pour la session de référence), en groupe de 4 à 8 personnes, un poste par stagiaire, organisée autour de cinq compétences (C1 à C5). Évaluation interne continue : positionnement, ateliers, QCM par compétence, évaluation finale. Formation non certifiante : une attestation de fin de formation mentionnant les résultats de l'évaluation des acquis vous est remise. En atelier, jamais de données réelles de clients dans les outils d'IA.</blockquote>
`,
      },
      {
        title: "1.2 – Une brève histoire de l'intelligence artificielle et ses notions de base",
        content: `
<h3>Qu'appelle-t-on « intelligence artificielle » ?</h3>
<p>L'expression <strong>intelligence artificielle</strong> désigne l'ensemble des techniques qui permettent à une machine de réaliser des tâches que l'on associe habituellement à l'intelligence humaine : comprendre un texte, reconnaître une image, traduire, résumer, planifier, répondre à une question, rédiger. Ce n'est pas une technologie unique mais une famille de méthodes très différentes, apparues à des époques successives. L'IA que vous utiliserez pendant cette formation, l'<strong>IA générative</strong>, n'en est qu'une branche récente : celle qui <strong>produit</strong> des contenus nouveaux (textes, images, sons, vidéos, code) à partir d'une demande formulée en langage courant.</p>
<p>Il est utile de garder en tête une distinction simple :</p>
<ul>
<li>une <strong>IA « classique » ou prédictive</strong> classe, détecte ou prévoit : le filtre anti-spam de votre messagerie, la reconnaissance des plaques d'immatriculation, la détection de fraude bancaire, la prévision de consommation d'énergie ;</li>
<li>une <strong>IA générative</strong> crée : elle rédige un mail, propose un plan de compte rendu, génère une illustration, transcrit et résume une réunion.</li>
</ul>
<h3>Les grandes étapes</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Période</th><th>Étape</th><th>Ce qu'il faut en retenir</th></tr>
<tr><td>1950</td><td>Alan Turing publie un article sur la possibilité de machines « pensantes » et propose un test d'imitation</td><td>La question de l'intelligence des machines est posée dès les débuts de l'informatique.</td></tr>
<tr><td>1956</td><td>Conférence de Dartmouth (États-Unis), où l'expression « intelligence artificielle » s'impose</td><td>Naissance du domaine de recherche ; optimisme très fort, rapidement déçu.</td></tr>
<tr><td>Années 1970-1980</td><td>Systèmes experts : des règles « si… alors… » écrites à la main par des spécialistes</td><td>Efficaces sur des problèmes étroits, coûteux à maintenir ; périodes de désintérêt appelées « hivers de l'IA ».</td></tr>
<tr><td>Années 1990-2000</td><td>Essor de l'apprentissage automatique ; en 1997, un ordinateur bat le champion du monde d'échecs</td><td>On ne programme plus toutes les règles : la machine apprend à partir de données.</td></tr>
<tr><td>Années 2010</td><td>Apprentissage profond (réseaux de neurones à nombreuses couches), grâce à la puissance de calcul et aux grandes masses de données ; progrès spectaculaires en reconnaissance d'images et de la parole</td><td>Les assistants vocaux, la traduction automatique et la reconnaissance faciale deviennent courants.</td></tr>
<tr><td>2017</td><td>Publication par des chercheurs de Google de l'architecture « Transformer »</td><td>Base technique de presque tous les grands modèles de langage actuels.</td></tr>
<tr><td>Fin 2022</td><td>Mise à disposition du grand public de ChatGPT par OpenAI</td><td>L'IA générative devient accessible à tous, en langage courant, sans compétence technique.</td></tr>
<tr><td>Depuis 2023</td><td>Multiplication des outils (Copilot, Gemini, Claude, Le Chat de Mistral AI, Perplexity…), intégration dans les logiciels de bureautique, images, voix, vidéo ; adoption du règlement européen sur l'IA en 2024</td><td>L'IA s'intègre dans les outils de travail ordinaires et devient un sujet de conformité pour les entreprises.</td></tr>
</table>
<h3>L'apprentissage automatique</h3>
<p>L'<strong>apprentissage automatique</strong> (en anglais <em>machine learning</em>) est une approche où, au lieu d'écrire toutes les règles, on fournit à un programme un grand nombre d'exemples et on le laisse ajuster lui-même ses paramètres pour reproduire ce que montrent les exemples. Une comparaison du bâtiment aide à comprendre : un apprenti qui a vu poser des centaines de fenêtres finit par « sentir » une pose correcte sans pouvoir énoncer toutes les règles qu'il applique. Le programme fait quelque chose de comparable, de façon purement statistique.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type d'apprentissage</th><th>Principe</th><th>Exemple</th></tr>
<tr><td>Supervisé</td><td>On fournit des exemples accompagnés de la bonne réponse</td><td>Des milliers de mails étiquetés « spam » ou « légitime » pour apprendre à filtrer.</td></tr>
<tr><td>Non supervisé</td><td>On fournit des données sans réponse ; le programme cherche des regroupements</td><td>Regrouper des clients selon leurs habitudes de consommation.</td></tr>
<tr><td>Par renforcement</td><td>Le programme essaie, reçoit une récompense ou une pénalité, et s'améliore</td><td>Un programme qui apprend à jouer à un jeu ; une partie de l'ajustement des assistants conversationnels à partir d'évaluations humaines.</td></tr>
<tr><td>Auto-supervisé</td><td>Le programme se fabrique ses propres exercices à partir des données brutes, par exemple deviner le mot masqué ou le mot suivant d'une phrase</td><td>C'est ainsi que sont pré-entraînés les grands modèles de langage.</td></tr>
</table>
<h3>Les réseaux de neurones</h3>
<p>Un <strong>réseau de neurones artificiels</strong> est un modèle mathématique très librement inspiré du cerveau. Il est composé de couches de petites unités de calcul (les « neurones ») reliées entre elles par des connexions dotées d'un poids. Chaque unité reçoit des nombres, les combine selon ces poids et transmet le résultat à la couche suivante. Pendant l'<strong>entraînement</strong>, on compare la sortie du réseau à la sortie attendue et on corrige légèrement les poids, des milliards de fois. On parle d'<strong>apprentissage profond</strong> quand le réseau comporte de nombreuses couches.</p>
<p>Deux idées sont à retenir pour un usage professionnel :</p>
<ul>
<li>le « savoir » d'un réseau n'est pas stocké comme dans une base de données, sous forme de fiches que l'on pourrait consulter : il est diffus dans des milliards de paramètres numériques. C'est pourquoi un modèle ne peut pas toujours « citer » d'où vient une information ;</li>
<li>le réseau reproduit les régularités de ses données d'entraînement, y compris leurs erreurs et leurs déséquilibres. C'est l'origine des <strong>biais</strong> étudiés en section 1.5.</li>
</ul>
<h3>Ce que l'IA générative n'est pas</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Idée reçue</th><th>Ce qu'il en est</th></tr>
<tr><td>« L'IA comprend ce qu'elle dit. »</td><td>Elle manipule des régularités statistiques du langage de façon remarquablement efficace ; elle n'a ni intention, ni expérience du monde, ni conscience. Elle peut produire un texte juste sans « savoir » qu'il est juste, et un texte faux avec la même assurance.</td></tr>
<tr><td>« L'IA cherche la réponse dans une base. »</td><td>Un modèle de langage seul ne consulte rien : il génère. Seuls les outils connectés à un moteur de recherche ou à vos documents vont chercher des informations (voir section 1.4).</td></tr>
<tr><td>« L'IA est neutre. »</td><td>Elle reflète les données et les choix de ceux qui l'ont conçue et ajustée.</td></tr>
<tr><td>« L'IA va remplacer mon métier. »</td><td>Elle transforme surtout des <strong>tâches</strong> : premier jet d'un mail, mise en forme d'un compte rendu, synthèse d'un document. Le conseil, la relation client, le jugement technique et la responsabilité restent humains.</td></tr>
<tr><td>« Il faut savoir programmer. »</td><td>Non : on s'adresse aux outils d'IA générative en langage courant. La compétence clé est de savoir formuler une demande et vérifier un résultat.</td></tr>
</table>
<blockquote><strong>Bonne pratique :</strong> pour expliquer l'IA générative à un collègue réticent, utilisez l'image d'un « stagiaire très rapide, très cultivé, parfois distrait et qui n'avoue jamais qu'il ne sait pas ». On lui confie volontiers un premier jet, jamais une décision ni un document envoyé sans relecture.</blockquote>
<blockquote><strong>À retenir</strong><br />L'intelligence artificielle est une famille de techniques ancienne (années 1950) ; l'IA générative, qui crée des contenus, s'est diffusée auprès du grand public à partir de fin 2022. Elle repose sur l'apprentissage automatique et sur des réseaux de neurones profonds entraînés sur d'immenses volumes de données. Son « savoir » est statistique et diffus : elle peut se tromper avec assurance et reproduit les biais de ses données.</blockquote>
`,
      },
      {
        title: "1.3 – Les grands modèles de langage : tokens, fenêtre de contexte et génération probabiliste",
        content: `
<h3>Un grand modèle de langage, qu'est-ce que c'est ?</h3>
<p>Un <strong>grand modèle de langage</strong> (en anglais <em>large language model</em>, abrégé LLM) est un réseau de neurones de très grande taille, entraîné sur d'énormes quantités de textes (pages web publiques, livres, articles, documentation, code informatique…), avec un objectif d'apparence modeste : <strong>prédire la suite la plus plausible d'un texte</strong>. À force de s'exercer à cette prédiction sur des volumes gigantesques, le modèle acquiert une capacité étonnante à manier la grammaire, le vocabulaire, les styles, les raisonnements courants et une grande quantité de connaissances générales.</p>
<p>Un assistant conversationnel comme ChatGPT, Copilot, Gemini, Claude ou Le Chat se construit en trois grandes étapes :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Ce qui se passe</th><th>Conséquence pour vous</th></tr>
<tr><td>1. Pré-entraînement</td><td>Le modèle apprend à prédire le mot suivant sur des milliards de pages de textes</td><td>Il « connaît » beaucoup de choses, mais seulement jusqu'à une certaine date et avec les déséquilibres des textes d'origine.</td></tr>
<tr><td>2. Ajustement aux instructions</td><td>On l'entraîne sur des exemples de questions et de bonnes réponses rédigées par des humains</td><td>Il sait suivre une consigne (« résume », « rédige un mail », « fais un tableau »).</td></tr>
<tr><td>3. Alignement par retours humains</td><td>Des évaluateurs comparent des réponses ; le modèle est ajusté pour préférer les plus utiles, honnêtes et sûres</td><td>Il adopte un ton serviable, refuse certaines demandes, mais peut aussi chercher à « faire plaisir » plutôt qu'à être exact.</td></tr>
</table>
<h3>Les tokens : l'unité de travail du modèle</h3>
<p>Le modèle ne lit pas les mots comme nous : il découpe le texte en <strong>tokens</strong> (on dit parfois « jetons »), c'est-à-dire en morceaux qui peuvent être un mot entier, une partie de mot, un signe de ponctuation ou un espace. Par exemple, un mot courant comme « devis » peut correspondre à un seul token, alors qu'un mot long ou rare comme « thermodynamique » sera découpé en plusieurs morceaux. En ordre de grandeur, un texte français comporte un peu plus de tokens que de mots.</p>
<p>Pourquoi est-ce utile de le savoir ?</p>
<ul>
<li>les <strong>limites</strong> des outils (longueur maximale d'un document, longueur d'une réponse, quotas des offres gratuites) sont souvent exprimées en tokens ;</li>
<li>les offres professionnelles et les interfaces de programmation sont souvent <strong>facturées au token</strong> ;</li>
<li>le découpage explique certaines faiblesses : le modèle compte mal les lettres d'un mot, peut se tromper sur des calculs exacts ou sur des références composées de chiffres et de lettres (numéros de devis, références de produits), qu'il « voit » en morceaux.</li>
</ul>
<h3>La fenêtre de contexte : la mémoire de travail de la conversation</h3>
<p>La <strong>fenêtre de contexte</strong> est la quantité maximale de texte (en tokens) que le modèle peut prendre en compte en même temps : vos consignes, les documents joints, l'historique de la conversation et la réponse en cours de rédaction. Selon les outils et les offres, elle va de quelques dizaines de pages à plusieurs centaines de pages, et elle a beaucoup augmenté ces dernières années.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Ce qu'il faut savoir</th><th>Conséquence pratique</th></tr>
<tr><td>Au-delà de la fenêtre, les éléments les plus anciens de la conversation ne sont plus pris en compte (ou sont résumés automatiquement)</td><td>Dans une très longue conversation, l'outil peut « oublier » une consigne donnée au début : rappelez les consignes importantes ou ouvrez une nouvelle conversation.</td></tr>
<tr><td>Même à l'intérieur de la fenêtre, l'attention du modèle n'est pas uniforme</td><td>Une information noyée au milieu d'un long document peut être négligée : demandez explicitement de traiter la partie qui vous intéresse.</td></tr>
<tr><td>Chaque nouvelle conversation repart en principe de zéro</td><td>Sauf si l'outil propose une fonction de mémoire ou de projet (voir chapitre 2), il ne se souvient pas de ce que vous lui avez dit hier.</td></tr>
<tr><td>Tout ce que vous mettez dans le contexte est transmis au fournisseur du service</td><td>C'est un enjeu de confidentialité majeur : ne joignez pas un document contenant des données personnelles de clients sans y être autorisé et sans paramétrage adapté (voir C5).</td></tr>
</table>
<h3>La génération probabiliste : pourquoi deux réponses ne sont jamais identiques</h3>
<p>Pour produire une réponse, le modèle calcule, à chaque étape, une <strong>probabilité</strong> pour chacun des tokens possibles qui pourraient venir ensuite, en choisit un, l'ajoute au texte, puis recommence, token après token. Le choix n'est pas toujours le plus probable : une part de hasard contrôlée (souvent appelée « température ») rend le texte plus naturel et plus varié.</p>
<p>Imaginons la phrase « Le chantier de Mme Ferrand démarrera… ». Le modèle peut estimer très probables les suites « lundi », « la semaine prochaine », « dès réception de l'acompte ». Aucune ne repose sur une information réelle sur ce chantier : ce sont simplement des suites <strong>plausibles</strong>. C'est la clé de compréhension de presque toutes les limites de l'IA générative.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Propriété</th><th>Avantage</th><th>Risque</th></tr>
<tr><td>Le modèle produit ce qui est plausible</td><td>Textes fluides, bien construits, adaptés au style demandé</td><td>Plausible ne veut pas dire vrai : invention de dates, de chiffres, de références.</td></tr>
<tr><td>Une part de hasard dans le choix des mots</td><td>Plusieurs formulations à comparer ; créativité pour un slogan ou une publication</td><td>Pas de reproductibilité parfaite : la même requête peut donner un résultat meilleur ou moins bon.</td></tr>
<tr><td>Le modèle s'appuie sur tout le contexte</td><td>Plus votre demande est précise et documentée, meilleure est la réponse</td><td>Une demande floue produit une réponse générique ; une erreur dans vos données est reprise sans discussion.</td></tr>
</table>
<h3>La date de connaissance</h3>
<p>Un modèle est entraîné sur des données collectées jusqu'à une certaine date, appelée <strong>date de connaissance</strong> ou date de coupure. Tout ce qui s'est passé après lui est inconnu, sauf si l'outil est connecté à une recherche web ou si vous lui fournissez l'information. Dans un secteur comme la rénovation énergétique, où les règles des aides, les seuils et les procédures changent fréquemment, c'est un piège majeur : le modèle peut décrire avec assurance un dispositif tel qu'il existait il y a un ou deux ans.</p>
<blockquote><strong>Bonne pratique :</strong> dès qu'une réponse dépend d'une règle, d'un montant, d'un taux ou d'une date, posez-vous la question : « l'outil peut-il connaître la version en vigueur aujourd'hui ? ». Si la réponse n'est pas un oui certain, vérifiez à la source officielle (service-public.fr, france-renov.gouv.fr, legifrance.gouv.fr, site de l'organisme concerné) et notez la date de votre vérification.</blockquote>
<h3>Les modèles qui « raisonnent »</h3>
<p>Certains outils proposent des modes dits « de raisonnement » ou « de réflexion approfondie » : le modèle produit d'abord, souvent de façon masquée, une suite d'étapes intermédiaires avant de rédiger sa réponse. Ces modes améliorent les résultats sur les problèmes à plusieurs étapes (calculs, planification, analyse d'un document complexe), au prix d'un temps de réponse plus long. Ils restent des modèles probabilistes : ils peuvent toujours se tromper, et un raisonnement bien présenté n'est pas une preuve.</p>
<blockquote><strong>À retenir</strong><br />Un grand modèle de langage prédit, token après token, la suite la plus plausible d'un texte. Les tokens sont l'unité de calcul et de facturation ; la fenêtre de contexte est la mémoire de travail de la conversation, au-delà de laquelle des éléments sont oubliés. La génération est probabiliste : plausible ne veut pas dire vrai, et deux réponses à la même question diffèrent. Le modèle ignore tout ce qui est postérieur à sa date de connaissance, sauf s'il est connecté au web ou si vous lui fournissez l'information.</blockquote>
`,
      },
      {
        title: "1.4 – La multimodalité et les IA connectées au web ou à vos documents",
        content: `
<h3>La multimodalité : texte, image, son, vidéo</h3>
<p>Les premiers assistants ne traitaient que du texte. La plupart des outils actuels sont <strong>multimodaux</strong> : ils acceptent en entrée et produisent en sortie plusieurs types de contenus. Les fonctions exactes dépendent de l'outil et de l'offre souscrite ; elles évoluent souvent.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Modalité</th><th>Ce que l'IA peut faire</th><th>Exemple dans une entreprise du bâtiment</th><th>Vigilance</th></tr>
<tr><td>Image en entrée</td><td>Décrire une photo, lire un document scanné, extraire un tableau d'une capture d'écran</td><td>Transformer la photo d'une fiche de relevé manuscrite en tableau ; décrire les éléments visibles sur une photo de chaufferie</td><td>L'IA peut mal lire un chiffre ou une plaque signalétique ; elle ne remplace jamais un diagnostic sur place. Une photo de domicile peut contenir des données personnelles.</td></tr>
<tr><td>Image en sortie</td><td>Générer une illustration, un visuel, une affiche à partir d'une description</td><td>Visuel d'ambiance pour une publication sur les économies d'énergie</td><td>Ne jamais présenter une image générée comme une photo réelle d'un chantier ; respecter les droits et la transparence (voir C3 et C5).</td></tr>
<tr><td>Voix et audio</td><td>Dicter, converser à voix haute, transcrire une réunion, lire un texte</td><td>Le conducteur de travaux dicte ses observations en voiture et obtient un compte rendu structuré</td><td>Informer les participants d'un enregistrement ; vérifier les noms propres et les chiffres de la transcription.</td></tr>
<tr><td>Documents</td><td>Lire un PDF, un tableur, une présentation ; en faire la synthèse ou répondre à des questions</td><td>Résumer un cahier des charges de 40 pages ; comparer deux devis fournisseurs anonymisés</td><td>Vérifier que la synthèse n'oublie pas une clause importante ; confidentialité des documents transmis.</td></tr>
<tr><td>Vidéo</td><td>Générer de courtes vidéos, analyser une vidéo selon les outils</td><td>Courte animation expliquant le principe d'une pompe à chaleur</td><td>Contenus à signaler comme générés ; qualité technique à contrôler par un professionnel.</td></tr>
</table>
<h3>Trois façons pour une IA d'obtenir de l'information</h3>
<p>Pour bien utiliser un outil, il faut savoir d'où vient ce qu'il vous répond. On distingue trois situations :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Fonctionnement</th><th>Fiabilité</th><th>Usage recommandé</th></tr>
<tr><td><strong>Modèle seul</strong></td><td>La réponse est générée à partir de ce que le modèle a appris pendant l'entraînement</td><td>Bonne pour la langue, la reformulation, la structure ; faible pour les faits précis, récents ou locaux</td><td>Rédaction, reformulation, plans, idées, mise en forme.</td></tr>
<tr><td><strong>IA connectée au web</strong></td><td>L'outil lance des recherches sur Internet, lit quelques pages et rédige une réponse en citant ses sources (c'est le principe de Perplexity, et des fonctions de recherche de ChatGPT, Copilot, Gemini, Claude ou Le Chat)</td><td>Meilleure pour l'actualité, mais dépend de la qualité des pages trouvées ; l'outil peut mal résumer une source ou citer une source qui ne dit pas ce qu'il affirme</td><td>Veille, recherche de premières pistes ; toujours ouvrir et lire les sources citées.</td></tr>
<tr><td><strong>IA connectée à vos documents</strong></td><td>L'outil s'appuie sur des documents que vous fournissez ou auxquels il a accès (fichiers joints, dossier d'un projet, documents de l'entreprise dans Microsoft 365 ou Google Workspace). On parle parfois de « génération augmentée par la recherche »</td><td>Bonne si les documents sont à jour et pertinents ; l'outil peut encore mélanger ce qu'il lit et ce qu'il « sait »</td><td>Questions sur vos procédures, synthèse de vos documents, réponses fondées sur vos propres textes.</td></tr>
</table>
<h3>Bien utiliser une IA connectée au web</h3>
<ol>
<li><strong>Demandez explicitement des sources</strong> et privilégiez les sources officielles : « Réponds en t'appuyant en priorité sur des sites officiels (service-public.fr, sites des ministères, de l'ADEME, de l'Anah) et cite chaque source avec son lien. »</li>
<li><strong>Ouvrez les liens</strong> : vérifiez que la page existe, qu'elle est à jour (date de publication ou de mise à jour) et qu'elle dit bien ce que l'outil lui attribue.</li>
<li><strong>Méfiez-vous des sources commerciales</strong> déguisées en information (comparateurs, sites d'entreprises qui vendent les travaux concernés) et des pages anciennes bien référencées.</li>
<li><strong>Datez votre recherche</strong> : notez dans votre document la date à laquelle l'information a été vérifiée.</li>
</ol>
<h3>Exemple : une question sur une aide à la rénovation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Requête</th><th>Ce qui risque de se passer</th></tr>
<tr><td>Sans recherche web : « Quel est le montant de l'aide pour une pompe à chaleur air/eau ? »</td><td>L'outil répond avec assurance un montant qui correspond peut-être à un barème ancien, sans préciser les conditions de revenus ni la date.</td></tr>
<tr><td>Avec recherche web et consigne précise : « Recherche sur les sites officiels les conditions actuelles des aides publiques pour l'installation d'une pompe à chaleur air/eau par un propriétaire occupant. Cite chaque source avec son lien et sa date. Signale ce qui dépend des revenus du ménage. Si tu ne trouves pas d'information officielle récente, dis-le. »</td><td>L'outil propose une synthèse sourcée ; il reste à ouvrir les sources, vérifier, et simuler le cas réel du client sur l'outil officiel. La réponse de l'IA n'est jamais transmise telle quelle au client.</td></tr>
</table>
<blockquote><strong>Bonne pratique :</strong> chez Thermia Rénov, toute information réglementaire ou financière utilisée dans un document client doit pouvoir être reliée à une source officielle consultée par un salarié, avec la date de consultation. L'IA aide à chercher et à rédiger ; elle ne fait jamais foi.</blockquote>
<h3>Les agents : quand l'IA agit à votre place</h3>
<p>Une évolution récente consiste à confier à l'IA non plus seulement une réponse, mais une <strong>suite d'actions</strong> : chercher plusieurs pages, remplir un tableau, préparer un brouillon de mail, naviguer sur un site, enchaîner des étapes. On parle d'<strong>agents</strong>. Ces fonctions peuvent faire gagner du temps, mais elles augmentent les risques : une action erronée (mail envoyé, fichier modifié) est plus grave qu'une réponse erronée. En entreprise, la règle de prudence est de garder une <strong>validation humaine avant toute action qui engage</strong> (envoi, paiement, suppression, publication). Les automatisations simples sont étudiées en C4.</p>
<blockquote><strong>À retenir</strong><br />Les outils actuels sont multimodaux : ils lisent et produisent texte, images, voix, documents, parfois vidéo. Une IA peut répondre à partir de son seul entraînement, d'une recherche web ou de vos documents : il faut toujours savoir dans quelle situation on se trouve. Une IA connectée au web cite des sources qu'il faut ouvrir et vérifier. Toute action automatisée qui engage l'entreprise doit être validée par un humain.</blockquote>
`,
      },
      {
        title: "1.5 – Hallucinations, biais et limites de l'IA générative",
        content: `
<h3>Les hallucinations : quand l'IA invente avec assurance</h3>
<p>On appelle <strong>hallucination</strong> une réponse fausse ou inventée présentée comme vraie : une date, un chiffre, une référence de texte de loi, une citation, un nom de produit, un article de presse ou même une source qui n'existent pas. Ce n'est pas un « bug » occasionnel : c'est une conséquence directe de la génération probabiliste vue en section 1.3. Le modèle produit ce qui est plausible ; lorsqu'il ne dispose pas de l'information, il ne « se tait » pas spontanément, il complète.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type d'hallucination</th><th>Exemple dans le fil rouge</th><th>Risque pour l'entreprise</th></tr>
<tr><td>Chiffre inventé</td><td>« Une pompe à chaleur permet en moyenne de réduire la facture de 70 %. »</td><td>Promesse commerciale non justifiée ; pratique commerciale trompeuse si elle est reprise devant un client.</td></tr>
<tr><td>Référence juridique fausse ou périmée</td><td>Un numéro d'article, un décret ou un seuil d'aide cité de façon précise mais erroné</td><td>Information inexacte dans un courrier ou un devis ; perte de crédibilité, litige.</td></tr>
<tr><td>Source inexistante</td><td>Un lien vers une page qui n'existe pas, une « étude de l'ADEME » introuvable</td><td>Citation d'une source fictive dans une publication.</td></tr>
<tr><td>Fait plausible mais faux sur votre entreprise</td><td>Le texte d'une page de présentation affirme que l'entreprise existe « depuis plus de 20 ans » ou détient une qualification qu'elle n'a pas</td><td>Information trompeuse sur l'entreprise, très grave pour une entreprise dont les qualifications conditionnent les aides des clients.</td></tr>
<tr><td>Erreur de calcul ou de lecture</td><td>Un total de devis faux, une surface mal reprise depuis une photo de relevé</td><td>Erreur de chiffrage, dossier incohérent.</td></tr>
<tr><td>Résumé infidèle</td><td>La synthèse d'un compte rendu oublie une réserve ou inverse une décision</td><td>Mauvaise information transmise au client ou à l'équipe.</td></tr>
</table>
<h3>Comment réduire les hallucinations</h3>
<ul>
<li><strong>Fournir l'information</strong> plutôt que la demander : collez le texte de référence, les données du chantier, la procédure de l'entreprise, et demandez à l'IA de travailler <em>uniquement</em> à partir de ces éléments.</li>
<li><strong>Autoriser l'ignorance</strong> : « Si une information manque, écris [À COMPLÉTER] au lieu de l'inventer. » Cette simple phrase change beaucoup le comportement des outils.</li>
<li><strong>Exiger des sources</strong> pour toute affirmation factuelle et les vérifier.</li>
<li><strong>Faire vérifier par l'IA elle-même</strong>, en seconde passe : « Relis ta réponse et liste toutes les affirmations factuelles qui nécessitent une vérification. » Utile, mais insuffisant : la vérification finale reste humaine.</li>
<li><strong>Ne jamais déléguer un calcul qui engage</strong> sans le refaire ou le faire faire par un tableur.</li>
</ul>
<h3>Les biais</h3>
<p>Un <strong>biais</strong> est une déformation systématique des réponses. Les modèles apprennent sur des textes produits par des humains, dans certaines langues, à certaines époques : ils en héritent les déséquilibres et les stéréotypes, que l'ajustement ne corrige qu'en partie.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Biais</th><th>Manifestation</th><th>Parade</th></tr>
<tr><td>Stéréotypes</td><td>Une image générée de « conducteur de travaux » ne montre que des hommes ; un exemple de « client âgé » est présenté comme peu au fait du numérique</td><td>Préciser la diversité attendue ; relire les contenus sous l'angle de l'égalité de traitement.</td></tr>
<tr><td>Biais culturel et géographique</td><td>Réponses calquées sur le contexte américain : réglementation, unités, usages commerciaux, ton</td><td>Préciser « en France », « droit français », « pour un client particulier en France » ; vérifier les références.</td></tr>
<tr><td>Biais de complaisance</td><td>L'IA approuve votre idée ou votre brouillon parce que la question l'y invite (« mon mail est bien, non ? »)</td><td>Demander une critique franche, des points faibles, des objections possibles.</td></tr>
<tr><td>Biais de confirmation de la question</td><td>Une question orientée (« pourquoi la PAC est-elle toujours la meilleure solution ? ») obtient une réponse orientée</td><td>Formuler des questions neutres et demander les avantages et les limites.</td></tr>
<tr><td>Biais de popularité</td><td>Les solutions, marques ou pratiques les plus présentes sur Internet sont surreprésentées</td><td>Demander plusieurs options, croiser avec l'avis de professionnels.</td></tr>
</table>
<h3>Les autres limites à connaître</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Limite</th><th>Ce que cela implique</th></tr>
<tr><td>Date de connaissance</td><td>Règles, prix, aides, actualité : à vérifier systématiquement.</td></tr>
<tr><td>Absence de connaissance de votre contexte</td><td>L'IA ignore vos tarifs, vos délais, vos qualifications, vos clients et vos habitudes, sauf si vous les lui donnez.</td></tr>
<tr><td>Calcul et logique</td><td>Les erreurs de calcul sont moins fréquentes qu'avant, surtout avec les modes de raisonnement, mais restent possibles ; pour un chiffrage, le tableur fait foi.</td></tr>
<tr><td>Variabilité</td><td>La même requête ne donne pas deux fois la même réponse ; une procédure fiable repose sur des gabarits testés et une relecture.</td></tr>
<tr><td>Expertise technique</td><td>L'IA peut expliquer le principe d'une isolation par l'extérieur ; elle ne peut pas juger l'état d'un mur ancien ni dimensionner une installation à la place d'un professionnel.</td></tr>
<tr><td>Responsabilité</td><td>L'IA n'est jamais responsable : c'est l'entreprise qui envoie le mail, signe le devis, publie le contenu. « C'est l'IA qui l'a écrit » n'est pas une excuse recevable, ni pour un client ni pour un contrôleur.</td></tr>
<tr><td>Confidentialité</td><td>Les contenus saisis sont transmis au fournisseur ; selon l'offre et le paramétrage, ils peuvent être conservés ou servir à améliorer les modèles (voir C5).</td></tr>
<tr><td>Impact environnemental</td><td>Chaque requête consomme de l'électricité et des ressources dans des centres de données ; les usages lourds (images, vidéos, très longs documents) sont les plus coûteux. Un usage sobre et utile est préférable à un usage systématique.</td></tr>
</table>
<h3>La règle des trois vérifications</h3>
<p>Avant d'utiliser un contenu produit par l'IA à l'extérieur de l'entreprise, appliquez trois contrôles :</p>
<ol>
<li><strong>Les faits</strong> : chaque chiffre, date, nom, référence, montant ou règle est-il exact et vérifié à une source fiable ?</li>
<li><strong>Le fond</strong> : le contenu correspond-il à ce que l'entreprise fait et s'engage réellement à faire ? Aucune promesse, aucune qualification, aucun délai n'a-t-il été inventé ?</li>
<li><strong>La forme</strong> : le ton est-il adapté au destinataire, le texte est-il clair, les mentions nécessaires sont-elles présentes, aucune donnée confidentielle ne figure-t-elle par erreur ?</li>
</ol>
<blockquote><strong>Bonne pratique :</strong> lorsque vous relisez un texte généré, surlignez mentalement tout ce qui est <em>précis</em> (nombres, dates, noms, engagements). C'est précisément là que se cachent les hallucinations : les phrases générales sont rarement fausses, les détails le sont souvent.</blockquote>
<blockquote><strong>À retenir</strong><br />L'IA générative peut halluciner : inventer chiffres, références, sources ou faits sur votre entreprise, avec la même assurance que lorsqu'elle a raison. Elle reproduit des biais (stéréotypes, contexte étranger, complaisance). Elle ignore votre contexte, n'est jamais responsable et ne remplace pas l'expertise technique. On réduit les risques en fournissant l'information, en autorisant l'IA à dire « je ne sais pas » et en appliquant systématiquement la règle des trois vérifications : faits, fond, forme.</blockquote>
`,
      },
      {
        title: "1.6 – Panorama des outils d'IA générative et de leurs usages",
        content: `
<h3>Une offre abondante et mouvante</h3>
<p>Le marché des outils d'IA générative évolue très vite : nouveaux modèles, nouvelles fonctions, changements de noms et d'offres, intégration dans des logiciels existants. Le tableau ci-dessous présente les principaux outils abordés dans la formation, sans classement ni recommandation commerciale. Les fonctions citées sont celles généralement disponibles ; elles varient selon la version (gratuite ou payante, individuelle ou entreprise) et dans le temps. <strong>Avant tout usage professionnel, vérifiez les conditions d'utilisation et le paramétrage de confidentialité de l'offre que vous utilisez.</strong></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Outil</th><th>Éditeur</th><th>Points forts habituels</th><th>Usages typiques en TPE/PME</th></tr>
<tr><td><strong>ChatGPT</strong></td><td>OpenAI (États-Unis)</td><td>Assistant polyvalent ; rédaction, analyse de fichiers, génération d'images, voix, recherche web, assistants personnalisés</td><td>Mails, courriers, reformulation, analyse d'un tableau, idées de publications.</td></tr>
<tr><td><strong>Microsoft Copilot</strong>, dont <strong>Copilot dans Microsoft 365</strong></td><td>Microsoft (États-Unis)</td><td>Intégration dans Windows, le navigateur Edge et, avec les offres adaptées, dans Word, Excel, PowerPoint, Outlook et Teams ; accès possible aux documents de l'entreprise dans l'environnement Microsoft 365 selon les droits de chacun</td><td>Résumer un fil de mails, préparer un brouillon dans Word, analyser un tableau Excel, compte rendu de réunion Teams.</td></tr>
<tr><td><strong>Google Gemini</strong></td><td>Google (États-Unis)</td><td>Assistant polyvalent ; intégration à Gmail, Docs, Sheets et Drive avec les offres Google Workspace adaptées ; recherche web</td><td>Entreprises qui travaillent dans l'environnement Google ; synthèse de documents, rédaction.</td></tr>
<tr><td><strong>Le Chat</strong></td><td>Mistral AI (France)</td><td>Assistant polyvalent d'un éditeur européen ; recherche web, analyse de documents, génération d'images selon les offres</td><td>Usages de rédaction et d'analyse ; intérêt pour les entreprises attentives à la localisation européenne de leur fournisseur (à vérifier selon l'offre).</td></tr>
<tr><td><strong>Claude</strong></td><td>Anthropic (États-Unis)</td><td>Assistant polyvalent ; bonne aisance sur les longs documents et la rédaction structurée ; projets regroupant consignes et documents</td><td>Synthèse de documents longs, rédaction de procédures, analyse de cahiers des charges.</td></tr>
<tr><td><strong>Perplexity</strong></td><td>Perplexity AI (États-Unis)</td><td>Moteur de réponse : recherche web systématique, réponses accompagnées de sources</td><td>Veille, recherche d'informations récentes, premières pistes sourcées à vérifier.</td></tr>
<tr><td><strong>Canva</strong> (fonctions IA)</td><td>Canva (Australie)</td><td>Création graphique avec fonctions d'IA : génération d'images, suggestions de textes, redimensionnement, modèles</td><td>Visuels pour les réseaux sociaux, affiches de salon, plaquettes.</td></tr>
<tr><td><strong>Power Automate, Zapier, Make</strong></td><td>Microsoft ; Zapier ; Make (Celonis)</td><td>Automatisation sans programmation (no-code) : enchaîner des actions entre applications, parfois avec une étape d'IA</td><td>Classer automatiquement les demandes du formulaire du site, créer une tâche à partir d'un mail, préparer un brouillon de réponse (étudié en C4).</td></tr>
</table>
<h3>Version gratuite, version payante, version entreprise : ce qui change</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Ce qu'il faut regarder</th></tr>
<tr><td>Usage des données</td><td>Vos conversations peuvent-elles servir à entraîner ou améliorer les modèles ? Peut-on désactiver cette option ? Les offres destinées aux entreprises prévoient généralement l'absence d'utilisation des données pour l'entraînement : <strong>à vérifier dans les conditions contractuelles</strong>.</td></tr>
<tr><td>Conservation et localisation</td><td>Combien de temps les conversations sont-elles conservées ? Où les données sont-elles hébergées ? Existe-t-il un accord de traitement des données conforme au RGPD ?</td></tr>
<tr><td>Administration</td><td>L'entreprise peut-elle gérer les comptes, retirer un accès au départ d'un salarié, définir des règles ?</td></tr>
<tr><td>Fonctions et limites</td><td>Modèles disponibles, taille des documents acceptés, nombre de requêtes, recherche web, génération d'images, intégrations.</td></tr>
<tr><td>Accès aux données de l'entreprise</td><td>Pour les outils intégrés à la messagerie et aux documents, l'IA voit ce que l'utilisateur peut voir : des droits d'accès mal réglés deviennent visibles très vite.</td></tr>
</table>
<blockquote><strong>Attention :</strong> utiliser son compte personnel gratuit pour traiter des documents de l'entreprise (« IA fantôme », ou <em>shadow AI</em>) est l'une des premières sources de fuite de données. La règle dans une entreprise doit être claire : quels outils sont autorisés, avec quels comptes, pour quelles données. C'est l'objet de la charte d'usage étudiée en C5.</blockquote>
<h3>Choisir le bon outil pour la bonne tâche</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Tâche</th><th>Type d'outil le plus adapté</th><th>Pourquoi</th></tr>
<tr><td>Rédiger ou reformuler un mail, un courrier</td><td>Assistant conversationnel, ou IA intégrée à la messagerie</td><td>Travail sur la langue ; pas besoin d'information extérieure si vous fournissez les éléments.</td></tr>
<tr><td>Résumer un long document interne</td><td>Assistant acceptant les documents, ou IA intégrée à l'environnement bureautique de l'entreprise</td><td>Le document est la source : moins d'hallucinations si la consigne l'impose.</td></tr>
<tr><td>Trouver une information récente</td><td>IA connectée au web (moteur de réponse, mode recherche)</td><td>Accès à des pages actuelles, sources citées à vérifier.</td></tr>
<tr><td>Créer un visuel pour une publication</td><td>Outil de création graphique avec IA, ou générateur d'images</td><td>Modèles adaptés aux formats des réseaux sociaux ; charte graphique.</td></tr>
<tr><td>Analyser un tableau de données</td><td>Assistant capable d'analyser des fichiers, ou IA intégrée au tableur</td><td>Calculs exécutés réellement sur les données plutôt qu'« imaginés » ; résultats à contrôler.</td></tr>
<tr><td>Faire un compte rendu de réunion</td><td>Fonction de transcription et de résumé de l'outil de visioconférence, ou dictée puis assistant</td><td>Gain de temps important ; consentement des participants et relecture nécessaires.</td></tr>
<tr><td>Automatiser une tâche répétitive entre deux logiciels</td><td>Outil d'automatisation no-code</td><td>Enchaînement fiable d'étapes, avec une validation humaine aux points sensibles.</td></tr>
</table>
<h3>Les critères de choix pour une TPE/PME</h3>
<ol>
<li><strong>L'environnement existant</strong> : une entreprise qui travaille sous Microsoft 365 aura souvent intérêt à regarder d'abord Copilot ; une entreprise sous Google Workspace, Gemini. L'intégration évite les copier-coller et les fuites.</li>
<li><strong>La confidentialité</strong> : conditions contractuelles, usage des données, hébergement, administration des comptes.</li>
<li><strong>Les besoins réels</strong> : partir des tâches (C4), pas de l'outil à la mode.</li>
<li><strong>La simplicité</strong> : un outil maîtrisé par toute l'équipe vaut mieux que cinq outils utilisés au hasard.</li>
<li><strong>Le coût</strong> : comparer le coût d'un abonnement au temps réellement gagné, mesuré sur quelques semaines d'essai.</li>
</ol>
<blockquote><strong>À retenir</strong><br />Les principaux outils (ChatGPT, Copilot, Gemini, Le Chat, Claude, Perplexity, Canva, outils d'automatisation) ont des points forts différents et évoluent sans cesse. On choisit un outil en fonction de la tâche, de l'environnement informatique de l'entreprise et des garanties de confidentialité de l'offre. Les versions gratuites et personnelles ne doivent pas servir à traiter des données de l'entreprise sans autorisation : vérifiez toujours les conditions d'utilisation et le paramétrage de confidentialité.</blockquote>
`,
      },
      {
        title: "1.7 – Cas d'usage en TPE/PME du bâtiment et fil rouge Thermia Rénov",
        content: `
<h3>Où l'IA générative apporte un gain dans une entreprise du bâtiment</h3>
<p>Dans une TPE ou une PME du bâtiment, le temps administratif pèse lourd : mails, relances, comptes rendus, mise en forme des devis, dossiers d'aides, publications, réponses aux questions récurrentes des clients. Ce sont précisément des tâches où l'IA générative est utile, à condition de rester dans son rôle d'<strong>assistant de premier jet et de mise en forme</strong>.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Métier</th><th>Cas d'usage pertinents</th><th>Ce qui reste humain</th></tr>
<tr><td>Dirigeant</td><td>Synthèse de documents longs (appel d'offres, contrat fournisseur), préparation d'une réunion d'équipe, rédaction d'une note interne, veille réglementaire avec sources, aide à la rédaction d'une charte</td><td>Décisions, arbitrages, engagement de l'entreprise, relation avec les partenaires.</td></tr>
<tr><td>Assistant administratif</td><td>Réponses types aux demandes de clients, relances de pièces manquantes, mise en forme de courriers, tableaux de suivi, résumé de fils de mails, FAQ</td><td>Exactitude des dossiers, vérification des pièces, contact humain avec les clients en difficulté.</td></tr>
<tr><td>Commercial</td><td>Préparation d'un rendez-vous, mail de suivi après visite, reformulation pédagogique d'une proposition, liste de questions de découverte, réponses aux objections fréquentes, idées de publications</td><td>Diagnostic des besoins, conseil, chiffrage, engagement commercial ; aucune promesse non vérifiée.</td></tr>
<tr><td>Conducteur de travaux</td><td>Compte rendu de chantier à partir de notes dictées, planning hebdomadaire mis en forme, mail d'information au client sur l'avancement, liste de points de contrôle</td><td>Constat sur le chantier, sécurité, décisions techniques, réserves.</td></tr>
<tr><td>Chargé d'affaires</td><td>Analyse d'un cahier des charges, tableau comparatif de devis fournisseurs, rédaction d'un mémoire technique à partir d'éléments fournis</td><td>Choix techniques, prix, responsabilité contractuelle.</td></tr>
</table>
<h3>Ce que l'IA ne doit pas faire dans ce secteur</h3>
<ul>
<li><strong>Annoncer des montants d'aides</strong> ou un reste à charge : seule une simulation sur les outils officiels, vérifiée par un salarié, le permet.</li>
<li><strong>Promettre des économies d'énergie</strong> chiffrées sans étude, ou un gain d'étiquette énergétique.</li>
<li><strong>Affirmer une qualification</strong>, une garantie, un délai ou un partenariat que l'entreprise n'a pas.</li>
<li><strong>Décider techniquement</strong> : dimensionner, choisir un isolant pour un mur ancien, valider la conformité d'une installation.</li>
<li><strong>Traiter des données personnelles</strong> de clients dans un outil non autorisé (identité, adresse, revenus, avis d'imposition, photos du domicile).</li>
<li><strong>Prospecter de manière interdite</strong> : l'IA ne doit pas servir à produire des campagnes de démarchage que la réglementation du secteur interdit.</li>
</ul>
<h3>Le fil rouge : Thermia Rénov</h3>
<p>Tout au long du support, les notions sont appliquées à <strong>Thermia Rénov</strong>, une entreprise <strong>fictive</strong> construite pour la formation. Les personnes, les clients et <strong>tous les chiffres</strong> du fil rouge sont inventés ; ce ne sont ni des statistiques sectorielles ni des résultats d'entreprises réelles. Ils servent à s'entraîner au raisonnement.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Données fictives</th></tr>
<tr><td>Raison sociale</td><td>Thermia Rénov, PME de travaux de rénovation énergétique</td></tr>
<tr><td>Implantation</td><td>Saint-Genis-Laval (Rhône), interventions dans la métropole de Lyon et les communes voisines</td></tr>
<tr><td>Effectif</td><td>14 salariés : la dirigeante, un commercial, une assistante administrative, un conducteur de travaux, des techniciens et poseurs</td></tr>
<tr><td>Activités</td><td>Pompes à chaleur, isolation des combles et des murs, chauffe-eau thermodynamiques, photovoltaïque</td></tr>
<tr><td>Outils informatiques</td><td>Messagerie et suite bureautique en ligne, un logiciel de devis et de facturation, un tableur de suivi des dossiers, une page sur deux réseaux sociaux, un formulaire de contact sur le site</td></tr>
<tr><td>Usage actuel de l'IA</td><td>Non encadré : certains salariés utilisent des comptes gratuits personnels, sans règle commune</td></tr>
</table>
<h3>Les personnages</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Personnage</th><th>Rôle</th><th>Ce qu'il apporte au fil rouge</th></tr>
<tr><td><strong>Sandrine MOREL</strong></td><td>Dirigeante et fondatrice</td><td>Veut gagner du temps sur l'administratif et la communication sans prendre de risque juridique ; c'est elle qui devra valider la charte d'usage de l'IA.</td></tr>
<tr><td><strong>Julie</strong></td><td>Assistante administrative</td><td>Gère les demandes entrantes, les relances de pièces, les dossiers d'aides et le suivi ; très demandeuse de modèles de mails et de tableaux.</td></tr>
<tr><td><strong>Karim</strong></td><td>Commercial</td><td>Enthousiaste et pressé ; utilise déjà ChatGPT sur son téléphone personnel, y compris, parfois, avec des informations de clients. Il fait les erreurs que la formation vous apprend à éviter.</td></tr>
<tr><td><strong>Thomas</strong></td><td>Conducteur de travaux</td><td>Sceptique ; passe ses soirées à rédiger des comptes rendus de chantier ; intéressé par la dictée et la transcription s'il peut faire confiance au résultat.</td></tr>
<tr><td><strong>M. et Mme Ferrand</strong></td><td>Clients fictifs, propriétaires occupants d'une maison des années 1970</td><td>Projet de remplacement d'une chaudière au fioul et d'isolation des combles ; servent de support aux mails, comptes rendus et synthèses.</td></tr>
</table>
<h3>Les objectifs de Thermia Rénov pour l'IA</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Objectif fixé par Sandrine MOREL</th><th>Compétence de la formation</th></tr>
<tr><td>Que chacun comprenne ce que l'IA peut et ne peut pas faire</td><td>C1</td></tr>
<tr><td>Disposer de requêtes et de modèles partagés pour les tâches répétitives</td><td>C2</td></tr>
<tr><td>Produire plus vite des mails, comptes rendus et publications fiables</td><td>C3</td></tr>
<tr><td>Identifier les trois ou quatre tâches où l'IA fait gagner le plus de temps et en automatiser une</td><td>C4</td></tr>
<tr><td>Ne jamais exposer les données des clients et rédiger une charte d'usage</td><td>C5</td></tr>
</table>
<blockquote><strong>Bonne pratique :</strong> avant d'utiliser l'IA sur une tâche réelle, posez-vous trois questions : « Est-ce que je fournis toute l'information nécessaire ? », « Les données que je vais saisir sont-elles autorisées dans cet outil ? », « Qui vérifiera le résultat avant qu'il sorte de l'entreprise ? ». Si l'une des réponses est floue, la tâche n'est pas prête à être confiée à l'IA.</blockquote>
<blockquote><strong>À retenir</strong><br />Dans une entreprise du bâtiment, l'IA générative est utile pour les premiers jets, la mise en forme, les synthèses, les modèles de mails et la communication. Elle ne doit ni annoncer des aides ou des économies, ni affirmer des qualifications, ni décider techniquement, ni traiter des données de clients dans un outil non autorisé. Thermia Rénov, PME fictive de 14 salariés à Saint-Genis-Laval, accompagne tout le support avec Sandrine MOREL, Julie, Karim et Thomas.</blockquote>
`,
      },
      {
        title: "1.8 – Quiz de fin de chapitre",
        content: `
<p>Répondez aux questions, puis consultez le corrigé.</p>
<ol>
<li><strong>La formation « Intelligence artificielle : intégrer les outils d'IA dans son activité professionnelle – 21 h » se conclut par :</strong><br />A. Un diplôme d'État<br />B. Un titre professionnel<br />C. Une attestation de fin de formation mentionnant les résultats de l'évaluation des acquis<br />D. Aucun document</li>
<li><strong>Un grand modèle de langage produit sa réponse :</strong><br />A. En recopiant une page web<br />B. En consultant une base de données de réponses validées<br />C. En prédisant, token après token, la suite la plus plausible du texte<br />D. En demandant à un opérateur humain</li>
<li><strong>Un « token » est :</strong><br />A. Un mot de passe<br />B. Un morceau de texte (mot, partie de mot, signe) utilisé comme unité de calcul par le modèle<br />C. Une image générée<br />D. Un abonnement payant</li>
<li><strong>La fenêtre de contexte correspond :</strong><br />A. À la taille de l'écran<br />B. À la quantité maximale de texte que le modèle peut prendre en compte en même temps dans une conversation<br />C. À la date de connaissance du modèle<br />D. Au nombre d'utilisateurs simultanés</li>
<li><strong>Pourquoi un assistant peut-il décrire une aide à la rénovation qui a changé ?</strong><br />A. Parce qu'il ment volontairement<br />B. Parce qu'il ne connaît que les données antérieures à sa date de connaissance s'il n'est pas connecté au web ou alimenté par des documents à jour<br />C. Parce que les aides ne changent jamais<br />D. Parce qu'il est connecté au site officiel</li>
<li><strong>Une « hallucination » est :</strong><br />A. Une panne du service<br />B. Une réponse fausse ou inventée présentée comme vraie<br />C. Une image floue<br />D. Un refus de répondre</li>
<li><strong>Quelle consigne réduit le plus le risque d'invention dans un mail client ?</strong><br />A. « Sois créatif »<br />B. « Écris [À COMPLÉTER] si une information manque, au lieu de l'inventer »<br />C. « Fais court »<br />D. « Utilise un ton chaleureux »</li>
<li><strong>Une IA connectée au web qui cite des sources :</strong><br />A. Est toujours exacte<br />B. Dispense de vérifier<br />C. Facilite la vérification, mais il faut ouvrir les sources et contrôler qu'elles disent bien ce qui est affirmé<br />D. Ne peut citer que des sources officielles</li>
<li><strong>Karim colle dans son compte gratuit personnel l'avis d'imposition d'un client pour « simuler les aides ». Cette pratique est :</strong><br />A. Acceptable si le résultat est bon<br />B. Acceptable s'il supprime la conversation ensuite<br />C. À proscrire : données personnelles sensibles dans un outil non autorisé, sans garantie de confidentialité<br />D. Obligatoire</li>
<li><strong>Parmi ces tâches, laquelle peut être confiée à l'IA comme premier jet, sous réserve de relecture ?</strong><br />A. Fixer le reste à charge d'un client<br />B. Mettre en forme un compte rendu de chantier à partir des notes du conducteur de travaux<br />C. Dimensionner une pompe à chaleur<br />D. Attester une qualification de l'entreprise</li>
</ol>
<h4>Corrigé</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>C</td><td>Aucun diplôme ni titre n'est délivré ; l'évaluation est interne et l'attestation précise les objectifs, la nature, la durée et les résultats de l'évaluation des acquis (article L. 6353-1 du code du travail).</td></tr>
<tr><td>2</td><td>C</td><td>La génération est probabiliste : le modèle produit la suite la plus plausible, ce qui explique sa fluidité comme ses erreurs.</td></tr>
<tr><td>3</td><td>B</td><td>Le token est l'unité de découpage du texte ; les limites et la facturation sont souvent exprimées en tokens.</td></tr>
<tr><td>4</td><td>B</td><td>Au-delà de la fenêtre, des éléments anciens de la conversation ne sont plus pris en compte.</td></tr>
<tr><td>5</td><td>B</td><td>La date de connaissance limite le modèle ; les règles évolutives se vérifient à la source officielle.</td></tr>
<tr><td>6</td><td>B</td><td>L'hallucination est une invention présentée avec assurance : chiffre, référence, source, fait.</td></tr>
<tr><td>7</td><td>B</td><td>Autoriser explicitement l'IA à signaler un manque évite qu'elle complète par de l'invention.</td></tr>
<tr><td>8</td><td>C</td><td>Les sources peuvent être mal résumées, anciennes ou commerciales : on les ouvre et on vérifie.</td></tr>
<tr><td>9</td><td>C</td><td>Un avis d'imposition contient des données personnelles et financières ; leur saisie dans un compte personnel non autorisé est une faute de confidentialité (voir C5). La simulation se fait sur l'outil officiel, avec le client.</td></tr>
<tr><td>10</td><td>B</td><td>La mise en forme à partir de notes fournies est un usage adapté ; les trois autres tâches engagent la responsabilité technique, financière ou juridique de l'entreprise.</td></tr>
</table>
`,
      },
      {
        title: "1.9 – Cas pratique : établir un premier diagnostic des usages de l'IA chez Thermia Rénov",
        content: `
<h3>Contexte</h3>
<p>Sandrine MOREL, dirigeante de Thermia Rénov, a constaté que plusieurs salariés utilisent déjà des outils d'IA « chacun dans son coin ». Avant d'organiser l'usage dans l'entreprise, elle a demandé à chacun de décrire en quelques lignes comment il s'en sert. Voici les réponses (fictives) qu'elle a reçues :</p>
<ul>
<li><strong>Karim (commercial)</strong> : « J'utilise ChatGPT sur mon téléphone perso. Je lui colle les infos du client (nom, adresse, revenus, photos de la maison) et je lui demande combien il aura d'aides et combien il va économiser. Je recopie la réponse dans mon mail. Ça va très vite. »</li>
<li><strong>Julie (assistante)</strong> : « Je n'ose pas trop. J'ai essayé une fois pour une relance de pièces manquantes, le mail était bien mais il parlait d'un délai de 15 jours que je n'avais jamais donné. »</li>
<li><strong>Thomas (conducteur de travaux)</strong> : « Je n'utilise pas. Je ne vois pas comment une machine peut savoir ce qui s'est passé sur mon chantier. Par contre je passe deux heures par semaine sur mes comptes rendus. »</li>
<li><strong>Sandrine (dirigeante)</strong> : « J'ai demandé à une IA de me rédiger le texte de présentation de l'entreprise pour le site. Il dit que nous avons 25 ans d'expérience et la qualification pour la géothermie. Nous avons été créés il y a 9 ans et nous ne faisons pas de géothermie. »</li>
</ul>
<h3>Consigne</h3>
<ol>
<li>Pour chaque témoignage, identifiez la ou les notions du chapitre en jeu (hallucination, date de connaissance, contexte, confidentialité, limites…).</li>
<li>Classez les usages décrits en trois catégories : à proscrire, à encadrer, à développer.</li>
<li>Expliquez à Thomas, en quelques phrases simples, comment l'IA peut l'aider sans « savoir » ce qui s'est passé sur son chantier.</li>
<li>Proposez cinq règles simples que Sandrine pourrait diffuser dès maintenant, en attendant la charte complète travaillée en C5.</li>
<li>Indiquez quel type d'outil (modèle seul, IA connectée au web, IA connectée aux documents, outil de transcription) convient à chacune des quatre situations.</li>
</ol>
<h3>Corrigé détaillé</h3>
<h4>1. Les notions en jeu</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Témoignage</th><th>Notions</th><th>Analyse</th></tr>
<tr><td>Karim</td><td>Confidentialité, hallucination, date de connaissance, responsabilité</td><td>Il saisit des données personnelles et financières de clients dans un compte personnel non autorisé. Il demande des montants d'aides et d'économies que l'outil ne peut pas connaître de façon fiable (règles récentes, situation réelle du client) : les chiffres obtenus sont au mieux approximatifs, au pire inventés. Les recopier dans un mail engage l'entreprise sur une information non vérifiée.</td></tr>
<tr><td>Julie</td><td>Hallucination, absence de contexte</td><td>Le délai de 15 jours est une invention plausible : l'outil a complété une information qu'il n'avait pas. Il fallait fournir le délai réel ou demander d'écrire [À COMPLÉTER]. Julie a eu le bon réflexe : relire et repérer le détail précis.</td></tr>
<tr><td>Thomas</td><td>Contexte, multimodalité (voix), rôle d'assistant de mise en forme</td><td>L'IA ne sait rien du chantier, mais elle peut mettre en forme ce que Thomas lui dit ou écrit. Son besoin (deux heures de comptes rendus par semaine) est un cas d'usage idéal.</td></tr>
<tr><td>Sandrine</td><td>Hallucination sur l'entreprise, absence de contexte, responsabilité</td><td>L'outil a produit un texte « typique » d'entreprise du secteur, avec une ancienneté et une qualification inventées. Publié, ce texte serait une information trompeuse, particulièrement grave sur une qualification qui conditionne les aides des clients.</td></tr>
</table>
<h4>2. Classement des usages</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Catégorie</th><th>Usages</th></tr>
<tr><td>À proscrire</td><td>Saisir des données personnelles de clients (identité, adresse, revenus, avis d'imposition, photos identifiables) dans un compte personnel ; faire calculer par l'IA des aides, un reste à charge ou des économies présentés ensuite au client ; publier un texte sur l'entreprise sans vérification des faits.</td></tr>
<tr><td>À encadrer</td><td>Rédaction de mails clients (avec les informations réelles fournies, relecture obligatoire) ; rédaction de la présentation de l'entreprise (à partir d'une fiche d'identité exacte fournie à l'outil, validation par la dirigeante).</td></tr>
<tr><td>À développer</td><td>Mise en forme des comptes rendus de chantier à partir des notes ou de la dictée de Thomas ; modèles de relance de pièces pour Julie ; préparation de rendez-vous par Karim sans données personnelles.</td></tr>
</table>
<h4>3. L'explication pour Thomas</h4>
<blockquote>« L'IA ne sait rien de ton chantier, et c'est normal. Ce qu'elle sait faire, c'est transformer tes notes en vrac, ou ce que tu lui dictes en sortant du chantier, en un compte rendu propre, toujours présenté de la même façon : avancement, points bloquants, décisions, actions à mener, prochaine intervention. Toi, tu apportes les faits ; elle s'occupe de la mise en forme. Tu relis en deux minutes et tu corriges si elle a mal compris un mot. Et tu ne lui donnes ni le nom ni l'adresse du client : « chantier Ferrand » ou une référence interne suffit. »</blockquote>
<h4>4. Cinq règles immédiates</h4>
<ol>
<li>Aucune donnée personnelle de client (nom complet, adresse, téléphone, revenus, documents fiscaux, photos identifiables) dans un outil d'IA tant que l'entreprise n'a pas choisi et paramétré un outil autorisé.</li>
<li>Aucun montant d'aide, de reste à charge ou d'économie produit par l'IA n'est transmis à un client : ces chiffres viennent des outils officiels et des études de l'entreprise.</li>
<li>Tout texte produit avec l'IA est relu par son auteur avant envoi ; tout ce qui est précis (chiffres, dates, délais, qualifications, engagements) est vérifié.</li>
<li>Quand une information manque, on demande à l'IA d'écrire [À COMPLÉTER] et on complète soi-même.</li>
<li>Les textes publics (site, réseaux sociaux, plaquettes) sont validés par la dirigeante.</li>
</ol>
<h4>5. Le type d'outil adapté</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Type d'outil</th></tr>
<tr><td>Karim : préparer un rendez-vous et un mail de suivi</td><td>Modèle seul, à partir d'éléments anonymisés fournis par Karim ; aucune recherche d'aides par l'IA. Pour une information réglementaire générale, IA connectée au web avec sources officielles, à vérifier.</td></tr>
<tr><td>Julie : relances de pièces</td><td>Modèle seul ou IA intégrée à la messagerie, avec un modèle de requête qui contient les délais et la liste réelle des pièces.</td></tr>
<tr><td>Thomas : comptes rendus</td><td>Dictée ou transcription, puis mise en forme par l'assistant selon un gabarit fixe.</td></tr>
<tr><td>Sandrine : présentation de l'entreprise</td><td>Modèle seul ou IA connectée aux documents, alimentée par une fiche d'identité exacte (date de création, activités, qualifications réelles, zone d'intervention).</td></tr>
</table>
<h3>Ce que le formateur évaluera</h3>
<p>Le formateur observera votre capacité à relier une situation concrète aux notions de fonctionnement de l'IA (génération probabiliste, contexte, date de connaissance), à repérer une hallucination et un risque de confidentialité, et à proposer des usages réalistes et encadrés. Ces critères figurent dans la grille de l'évaluation finale du jour 3.</p>
`,
      },
    ],
  },
  {
    title: "Chapitre 2 – Rédiger des requêtes efficaces et itérer (C2)",
    description: "Apprendre à formuler des requêtes (prompts) précises et reproductibles grâce à la structure Rôle / Contexte / Tâche / Format / Contraintes, à fournir des exemples, à décomposer un travail en étapes, à faire poser des questions par l'IA, à améliorer une réponse par itération et par critique, à éviter les erreurs fréquentes, puis à construire des requêtes adaptées aux métiers du bâtiment, une bibliothèque de prompts d'équipe, des gabarits réutilisables et des assistants personnalisés, avec de nombreux exemples avant / après tirés du fil rouge Thermia Rénov.",
    sections: [
      {
        title: "2.1 – Anatomie d'une requête efficace : Rôle, Contexte, Tâche, Format, Contraintes",
        content: `
<h3>Qu'est-ce qu'un prompt ?</h3>
<p>Le mot anglais <strong>prompt</strong>, que l'on traduit par « requête », « consigne » ou « instruction », désigne le texte que vous adressez à l'outil d'IA pour obtenir un résultat. Le terme est passé dans l'usage courant et nous l'employons dans ce support, de même que l'expression « rédiger un prompt ». La qualité de la réponse dépend très largement de la qualité de la requête : l'IA ne connaît ni votre entreprise, ni votre client, ni vos habitudes, ni ce que vous avez en tête. Tout ce que vous ne dites pas, elle le remplace par ce qui est le plus <em>probable</em>, c'est-à-dire par du générique (voir section 1.3).</p>
<p>Comparez :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Requête</th><th>Résultat typique</th></tr>
<tr><td>« Écris un mail pour un client. »</td><td>Un mail vague, de ton commercial standard, avec des formules toutes faites, des informations entre crochets ou, pire, des informations inventées.</td></tr>
<tr><td>« Tu es assistante administrative dans une PME de rénovation énergétique. Rédige un mail à un client particulier qui nous a envoyé son dossier pour une isolation des combles, mais sans son dernier avis d'imposition ni la photo de son compteur. Le mail doit lui demander ces deux pièces, lui expliquer en une phrase pourquoi elles sont nécessaires et lui indiquer qu'il peut les envoyer par retour de mail. Ton cordial et simple, vouvoiement, 120 mots maximum, sans aucun délai ni montant. Termine par la signature : Julie, Thermia Rénov. »</td><td>Un mail directement utilisable après relecture, adapté au destinataire, sans invention.</td></tr>
</table>
<h3>La structure en cinq briques</h3>
<p>Pour ne rien oublier, retenez la structure <strong>Rôle / Contexte / Tâche / Format / Contraintes</strong>. Toutes les briques ne sont pas nécessaires pour une demande très simple, mais plus la tâche est importante, plus elles comptent.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Brique</th><th>Question à se poser</th><th>Exemple (fil rouge)</th></tr>
<tr><td><strong>Rôle</strong></td><td>Quel point de vue, quelle expertise l'IA doit-elle adopter ?</td><td>« Tu es conducteur de travaux expérimenté dans une PME de rénovation énergétique. »</td></tr>
<tr><td><strong>Contexte</strong></td><td>Quelle est la situation ? Qui est le destinataire ? Qu'est-ce qui s'est passé avant ? Quelles informations l'IA doit-elle connaître ?</td><td>« Le chantier Ferrand (isolation des combles et pose d'une pompe à chaleur) a pris deux jours de retard car le fournisseur a livré l'unité extérieure le jeudi au lieu du mardi. Les clients sont des particuliers de plus de 60 ans, pas techniciens, plutôt inquiets. »</td></tr>
<tr><td><strong>Tâche</strong></td><td>Que doit faire l'IA, exactement ? Avec quel verbe d'action ?</td><td>« Rédige un mail qui informe les clients du décalage, explique la cause sans accabler le fournisseur et propose la nouvelle date de mise en service. »</td></tr>
<tr><td><strong>Format</strong></td><td>Sous quelle forme veut-on le résultat ? Longueur, structure, présentation ?</td><td>« Un objet de mail, puis un corps de 150 mots maximum en trois paragraphes courts. »</td></tr>
<tr><td><strong>Contraintes</strong></td><td>Quelles règles respecter ? Qu'est-ce qui est interdit ? Que faire si une information manque ?</td><td>« Vouvoiement, ton rassurant et professionnel, pas de jargon technique. N'invente aucune date : la nouvelle date est le lundi 12 octobre. Si une information te manque, écris [À COMPLÉTER]. »</td></tr>
</table>
<h3>Le rôle : utile, mais pas magique</h3>
<p>Attribuer un rôle (« tu es… ») oriente le vocabulaire, le niveau de détail et le point de vue. C'est utile, mais ce n'est pas une garantie de compétence : dire à l'IA qu'elle est « juriste expert » ne lui donne pas accès au droit en vigueur. Le rôle est particulièrement efficace pour :</p>
<ul>
<li>fixer un <strong>niveau de langage</strong> (« tu t'adresses à des particuliers non techniciens ») ;</li>
<li>imposer un <strong>point de vue critique</strong> (« tu es un client méfiant qui lit ce devis ») ;</li>
<li>adopter une <strong>posture métier</strong> (« tu es assistante administrative rigoureuse, qui ne promet jamais ce qu'elle ne sait pas »).</li>
</ul>
<h3>Le contexte : la brique la plus souvent oubliée</h3>
<p>Le contexte est ce qui transforme une réponse générique en réponse utile. Pensez à ce que vous expliqueriez à un collègue intérimaire qui arrive le matin même : qui est le client, ce qui a déjà été fait ou dit, ce qui pose problème, ce que l'on attend. Quelques repères :</p>
<ul>
<li>le <strong>destinataire</strong> : particulier, professionnel, fournisseur, collègue, élu, banque ; son niveau de connaissance ; son état d'esprit (pressé, mécontent, inquiet) ;</li>
<li>l'<strong>historique</strong> : premier contact, relance, réclamation, suite d'une visite ;</li>
<li>les <strong>faits</strong> : dates, éléments techniques, documents disponibles ;</li>
<li>l'<strong>objectif</strong> : informer, obtenir une pièce, rassurer, faire accepter un rendez-vous, s'excuser.</li>
</ul>
<blockquote><strong>Attention :</strong> le contexte ne doit pas contenir de données personnelles inutiles. « M. et Mme Ferrand, 12 rue des Lilas, revenus modestes » n'apporte rien de plus à la rédaction d'un mail que « des clients particuliers ». Pseudonymisez : « le client », « chantier F-0925 », « [NOM DU CLIENT] » que vous remplacerez au moment de l'envoi.</blockquote>
<h3>La tâche : un verbe d'action précis</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Verbe vague</th><th>Verbes précis</th></tr>
<tr><td>« Fais quelque chose avec ce texte »</td><td>Résume, reformule, simplifie, corrige l'orthographe sans changer le fond, traduis, raccourcis à 100 mots, transforme en tableau, extrais les dates, liste les actions, compare, critique.</td></tr>
<tr><td>« Aide-moi pour mon rendez-vous »</td><td>Propose dix questions de découverte, liste les objections probables et une réponse honnête à chacune, prépare un plan d'entretien en cinq étapes.</td></tr>
<tr><td>« Écris un post »</td><td>Rédige trois propositions de publication de 80 mots pour un réseau social professionnel, chacune avec une accroche différente.</td></tr>
</table>
<h3>Le format : décrire le résultat attendu</h3>
<p>Le format évite les réponses trop longues, mal organisées ou inutilisables. Précisez : la longueur (en mots, en lignes, en paragraphes), la structure (titres, liste à puces, tableau avec telles colonnes, étapes numérotées), le registre (vouvoiement, tutoiement interne), les éléments obligatoires (objet de mail, signature, date), le format de fichier si l'outil le permet (tableau à copier dans un tableur).</p>
<h3>Les contraintes : ce qui protège l'entreprise</h3>
<p>Les contraintes sont essentielles dans un secteur réglementé comme la rénovation énergétique. Formulez-les clairement, de préférence sous forme positive et négative :</p>
<ul>
<li>« Utilise uniquement les informations fournies ci-dessous. »</li>
<li>« N'invente aucun chiffre, aucun délai, aucun montant d'aide, aucune qualification. »</li>
<li>« Si une information manque, écris [À COMPLÉTER]. »</li>
<li>« Pas de superlatifs commerciaux (« le meilleur », « garanti », « gratuit »). »</li>
<li>« Vocabulaire accessible à un non-spécialiste ; explique tout terme technique en une phrase. »</li>
</ul>
<blockquote><strong>Bonne pratique :</strong> écrivez vos requêtes importantes dans un document de travail avant de les coller dans l'outil. Vous pourrez les relire, les corriger, les réutiliser et les partager. Une requête de dix lignes bien construite fait gagner plus de temps que dix allers-retours avec une requête d'une ligne.</blockquote>
<blockquote><strong>À retenir</strong><br />Une requête efficace précise le Rôle (point de vue), le Contexte (situation, destinataire, faits), la Tâche (verbe d'action précis), le Format (longueur, structure) et les Contraintes (ce qui est obligatoire ou interdit, quoi faire si une information manque). Le contexte est la brique la plus souvent oubliée et la plus utile ; il ne doit pas contenir de données personnelles inutiles. Dans un secteur réglementé, les contraintes « n'invente rien » et « [À COMPLÉTER] » sont indispensables.</blockquote>
`,
      },
      {
        title: "2.2 – Donner des exemples et décomposer un travail en étapes",
        content: `
<h3>Montrer plutôt que décrire : les exemples (few-shot)</h3>
<p>Il est souvent plus simple de <strong>montrer</strong> à l'IA ce que l'on veut que de le décrire. Fournir un ou plusieurs exemples du résultat attendu s'appelle, en anglais, le <em>few-shot prompting</em> (« requête avec quelques exemples »). Sans exemple, on parle de <em>zero-shot</em>. L'exemple transmet en une fois le ton, la longueur, la structure, le vocabulaire maison et le niveau de détail.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Sans exemple</th><th>Avec exemple</th></tr>
<tr><td>« Rédige un message de confirmation de rendez-vous pour un client, court et cordial. »</td><td>« Rédige un message de confirmation de rendez-vous sur le modèle ci-dessous, en gardant exactement la même structure et la même longueur.<br /><em>Exemple :</em> Bonjour Madame, nous vous confirmons la visite technique de Thomas, notre conducteur de travaux, le mardi 6 octobre à 14 h, à votre domicile, comme vous l'avez demandé. La visite dure environ une heure. Merci de prévoir l'accès aux combles et à la chaufferie. Pour tout changement, répondez simplement à ce message. Bien cordialement, Julie – Thermia Rénov.<br /><em>Nouveau cas :</em> visite de Karim, commercial, le jeudi 8 octobre à 10 h, premier rendez-vous de découverte, durée environ 1 h 30, prévoir les factures d'énergie des deux dernières années et le DPE s'il existe. »</td></tr>
</table>
<p>Le second message reproduit le ton maison, la mention « comme vous l'avez demandé » (importante dans un secteur où le démarchage non sollicité est interdit) et la structure habituelle de l'entreprise.</p>
<h3>Bien choisir ses exemples</h3>
<ul>
<li><strong>Un bon exemple vaut mieux que trois moyens</strong> : l'IA imite, y compris les défauts.</li>
<li><strong>Variez les exemples</strong> si vous en donnez plusieurs : sinon l'IA risque de recopier un détail propre à un seul cas (un prénom, une date).</li>
<li><strong>Séparez nettement</strong> l'exemple du nouveau cas, avec des intitulés (« Exemple : », « Nouveau cas : ») ou des guillemets.</li>
<li><strong>Anonymisez</strong> les exemples issus de vrais échanges avec des clients.</li>
<li><strong>Précisez ce qui doit être imité</strong> (« la structure et le ton ») et ce qui ne doit pas l'être (« pas le contenu technique »).</li>
</ul>
<h3>Les exemples pour classer ou extraire</h3>
<p>Les exemples sont aussi très efficaces pour des tâches de <strong>classement</strong> ou d'<strong>extraction</strong> :</p>
<blockquote>Classe chaque demande reçue sur le formulaire du site dans l'une des catégories : DEVIS, SAV, ADMINISTRATIF, AUTRE. Réponds uniquement par un tableau à deux colonnes (demande résumée en 10 mots ; catégorie).<br />Exemples :<br />« Ma pompe à chaleur fait un bruit anormal depuis hier » → SAV<br />« Je voudrais faire isoler mes combles, pouvez-vous passer ? » → DEVIS<br />« Je n'ai pas reçu ma facture de solde » → ADMINISTRATIF<br />Demandes à classer : [coller les demandes anonymisées]</blockquote>
<h3>Décomposer un travail complexe en étapes</h3>
<p>Une demande trop large (« fais-moi une plaquette commerciale complète ») produit un résultat moyen partout. Les outils donnent de bien meilleurs résultats lorsqu'on <strong>découpe la tâche</strong>, soit dans une même requête (« procède en trois étapes »), soit en plusieurs requêtes successives, en validant chaque étape.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Approche</th><th>Exemple</th><th>Quand l'utiliser</th></tr>
<tr><td>Étapes dans une même requête</td><td>« Étape 1 : lis le compte rendu et liste les décisions prises. Étape 2 : liste les actions à mener avec le responsable et l'échéance. Étape 3 : rédige un mail de synthèse de 150 mots au client, qui ne reprend que ce qui le concerne. »</td><td>Tâche de taille moyenne, étapes bien connues.</td></tr>
<tr><td>Requêtes successives (enchaînement)</td><td>Requête 1 : « Propose le plan d'une page FAQ sur l'isolation des combles. » Validation et correction du plan. Requête 2 : « Rédige les réponses des questions 1 à 4 du plan validé. » Requête 3 : « Rédige les réponses 5 à 8. »</td><td>Document long, besoin de contrôler l'orientation avant de produire.</td></tr>
<tr><td>Plan d'abord, contenu ensuite</td><td>« Avant de rédiger, propose-moi un plan en 5 parties et attends ma validation. »</td><td>Courrier délicat, note interne, présentation.</td></tr>
<tr><td>Analyse puis rédaction</td><td>« D'abord, résume en 5 points ce que le client reproche dans son mail. Ensuite seulement, propose une réponse. »</td><td>Réclamations, mails complexes : l'IA comprend avant de répondre.</td></tr>
</table>
<h3>Faire « réfléchir » avant de répondre</h3>
<p>Pour les tâches qui demandent un raisonnement (comparer deux offres de fournisseurs, vérifier la cohérence d'un planning, repérer les incohérences d'un document), demandez explicitement à l'IA de <strong>détailler son raisonnement</strong> ou de procéder méthodiquement : « Analyse point par point, puis conclus. » ou « Avant de répondre, liste les éléments que tu dois vérifier. » Les modes « raisonnement » de certains outils le font automatiquement. Dans tous les cas, un raisonnement bien présenté reste à contrôler : vérifiez les étapes, pas seulement la conclusion.</p>
<h3>Exemple complet : préparer un rendez-vous de découverte</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avant</th><th>Après</th></tr>
<tr><td>« Aide-moi à préparer mon rendez-vous chez un client pour une PAC. »</td><td>« Tu es un commercial expérimenté et rigoureux d'une PME de rénovation énergétique en France. Je rencontre jeudi des propriétaires occupants d'une maison des années 1970 chauffée au fioul, qui ont demandé un rendez-vous après avoir lu un article sur le remplacement des chaudières au fioul. Ils n'ont rien décidé.<br />Procède en trois étapes :<br />1. Liste les 12 questions de découverte à leur poser, classées par thème (logement, chauffage actuel, consommations, projet de vie, budget, attentes).<br />2. Liste les documents à leur demander.<br />3. Liste les 5 objections les plus probables et, pour chacune, une piste de réponse honnête.<br />Contraintes : pas de montant d'aide, pas de promesse d'économies chiffrées, aucune technique de pression ; rappelle que l'isolation est à étudier avant le dimensionnement du chauffage. Format : trois listes numérotées. »</td></tr>
</table>
<blockquote><strong>Bonne pratique :</strong> lorsque vous obtenez un excellent résultat, conservez-le : il deviendra l'exemple de vos futures requêtes. Une bibliothèque d'exemples validés (mails types, comptes rendus types, publications réussies) est le meilleur moyen de faire produire à l'IA des contenus « à la manière de l'entreprise ».</blockquote>
<blockquote><strong>À retenir</strong><br />Fournir un ou plusieurs exemples (few-shot) transmet ton, structure et longueur bien mieux qu'une description ; les exemples doivent être bons, variés, séparés du nouveau cas et anonymisés. Une tâche complexe se découpe en étapes, dans une même requête ou en requêtes successives validées au fur et à mesure. Demander un plan avant le contenu, ou une analyse avant la réponse, améliore nettement la qualité.</blockquote>
`,
      },
      {
        title: "2.3 – Faire poser des questions à l'IA, itérer et critiquer",
        content: `
<h3>Inverser les rôles : laisser l'IA vous interroger</h3>
<p>Lorsque vous ne savez pas exactement quelles informations fournir, demandez à l'IA de vous poser les questions nécessaires avant de produire quoi que ce soit. Cette technique évite les réponses génériques et vous oblige à clarifier votre besoin.</p>
<blockquote>« Je dois rédiger la page de présentation de notre entreprise pour notre site Internet. Avant de rédiger quoi que ce soit, pose-moi les questions dont tu as besoin pour écrire un texte exact et convaincant, une question à la fois, et attends ma réponse avant de passer à la suivante. Quand tu as assez d'informations, propose un plan. »</blockquote>
<p>Dans le cas de Sandrine MOREL (section 1.9), cette méthode aurait évité l'invention de l'ancienneté et de la qualification : l'IA aurait demandé la date de création, les activités et les qualifications réelles.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Variante</th><th>Formulation</th><th>Usage</th></tr>
<tr><td>Questions avant production</td><td>« Pose-moi d'abord les questions nécessaires. »</td><td>Textes de présentation, procédures, notes internes.</td></tr>
<tr><td>Liste des informations manquantes</td><td>« Liste les informations qui te manquent pour faire ce travail correctement. »</td><td>Quand vous voulez répondre en une seule fois.</td></tr>
<tr><td>Hypothèses explicites</td><td>« Si tu dois faire une hypothèse, signale-la clairement entre crochets. »</td><td>Brouillons rapides, plans d'action.</td></tr>
<tr><td>Reformulation de la demande</td><td>« Reformule ma demande en trois lignes pour vérifier que tu l'as comprise, puis attends ma validation. »</td><td>Demandes complexes ou ambiguës.</td></tr>
</table>
<h3>Itérer : la première réponse est un brouillon</h3>
<p>Avec l'IA générative, la première réponse est rarement la bonne. L'efficacité vient de l'<strong>itération</strong> : on lit, on repère ce qui ne va pas, on demande une correction ciblée. Une conversation est un espace de travail : l'outil garde en mémoire (dans la limite de la fenêtre de contexte) ce qui a été dit, ce qui permet d'affiner sans tout réécrire.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Ce qui ne va pas</th><th>Demande de correction efficace</th></tr>
<tr><td>Trop long</td><td>« Raccourcis à 100 mots en gardant les trois informations essentielles : la date, les pièces demandées, le contact. »</td></tr>
<tr><td>Trop commercial</td><td>« Retire tous les superlatifs et les formules publicitaires ; le ton doit être informatif et sobre. »</td></tr>
<tr><td>Trop technique</td><td>« Réécris pour un client qui ne connaît rien au chauffage ; remplace chaque terme technique par une explication simple. »</td></tr>
<tr><td>Ton inadapté</td><td>« Le client est mécontent : commence par reconnaître le désagrément, sans te justifier d'emblée. »</td></tr>
<tr><td>Information inventée</td><td>« Le délai de 15 jours n'existe pas : supprime-le et n'ajoute aucun délai. »</td></tr>
<tr><td>Structure confuse</td><td>« Réorganise en trois parties : ce qui a été fait, ce qui reste à faire, ce que nous attendons du client. »</td></tr>
<tr><td>Résultat correct mais banal</td><td>« Propose trois versions avec des accroches différentes : une centrée sur le confort, une sur la sérénité du chantier, une sur la simplicité des démarches. »</td></tr>
</table>
<blockquote><strong>Bonne pratique :</strong> soyez précis dans vos retours. « C'est pas terrible, refais » produit une autre réponse au hasard ; « le deuxième paragraphe est trop long et le ton de la conclusion trop familier » produit une amélioration ciblée. Corrigez une ou deux choses à la fois, pas dix.</blockquote>
<h3>Quand repartir de zéro ?</h3>
<p>Une conversation qui s'éternise accumule des consignes contradictoires et des éléments qui sortent de la fenêtre de contexte. Ouvrez une nouvelle conversation lorsque :</p>
<ul>
<li>l'outil revient sans cesse à une erreur que vous avez déjà corrigée ;</li>
<li>vous changez de sujet ou de client (aussi pour éviter de mélanger les informations) ;</li>
<li>la conversation est devenue très longue.</li>
</ul>
<p>Dans ce cas, reprenez la meilleure version obtenue et réécrivez une requête complète intégrant tout ce que vous avez appris pendant les échanges : c'est souvent ainsi que naissent les meilleurs gabarits.</p>
<h3>Faire critiquer : l'IA comme relecteur exigeant</h3>
<p>L'IA est aussi un bon <strong>relecteur</strong>, à condition de lui demander une critique explicite et de contrer son biais de complaisance (section 1.5). Quelques formulations utiles :</p>
<ul>
<li>« Relis ce mail comme un client méfiant qui a déjà été victime d'un démarchage abusif. Qu'est-ce qui pourrait l'inquiéter ou lui sembler commercial ? »</li>
<li>« Liste les trois faiblesses principales de ce texte, sans complaisance, puis propose une version corrigée. »</li>
<li>« Repère dans ce texte toutes les affirmations précises (chiffres, dates, engagements, qualifications) que je dois vérifier avant envoi. »</li>
<li>« Vérifie que ce compte rendu répond bien aux questions suivantes : qui fait quoi, pour quand, et qu'est-ce qui a été décidé. Signale ce qui manque. »</li>
<li>« Évalue ce texte sur une échelle de 1 à 5 pour la clarté, la politesse et la précision, en justifiant chaque note. »</li>
</ul>
<h3>L'auto-critique en deux temps</h3>
<p>Une technique efficace consiste à demander à l'IA de produire, puis de se critiquer, puis de s'améliorer, dans la même requête :</p>
<blockquote>« Rédige une réponse à ce mail de réclamation. Ensuite, relis ta réponse en te mettant à la place du client et liste ce qui pourrait l'agacer. Enfin, propose une version finale corrigée. N'affiche que la liste des points corrigés et la version finale. »</blockquote>
<p>Cette méthode améliore souvent le résultat, mais elle ne remplace pas votre relecture : l'IA peut passer à côté d'une erreur factuelle qu'elle a elle-même introduite.</p>
<h3>Comparer plusieurs versions ou plusieurs outils</h3>
<p>Pour un texte important (présentation de l'entreprise, courrier sensible), demandez deux ou trois versions et choisissez, ou combinez les meilleurs passages. Vous pouvez aussi soumettre la même requête à deux outils différents : les points où ils divergent sont souvent ceux qui méritent une vérification.</p>
<blockquote><strong>À retenir</strong><br />Demander à l'IA de poser ses questions avant de produire évite les réponses génériques et les inventions. La première réponse est un brouillon : on itère par des demandes de correction précises, une ou deux à la fois, et l'on repart d'une conversation neuve quand l'échange s'enlise. L'IA est un bon relecteur si on lui demande une critique explicite, sans complaisance ; la vérification finale reste humaine.</blockquote>
`,
      },
      {
        title: "2.4 – Les erreurs fréquentes et comment les corriger : exemples avant / après",
        content: `
<h3>Les dix erreurs les plus fréquentes</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Erreur</th><th>Conséquence</th><th>Correction</th></tr>
<tr><td>1. Requête trop courte, sans contexte</td><td>Réponse générique, à réécrire</td><td>Appliquer la structure Rôle / Contexte / Tâche / Format / Contraintes.</td></tr>
<tr><td>2. Demander des faits au lieu de les fournir</td><td>Hallucinations (délais, montants, références)</td><td>Fournir les informations et imposer « utilise uniquement ces éléments ».</td></tr>
<tr><td>3. Plusieurs tâches mélangées dans une phrase</td><td>Réponse incomplète ou confuse</td><td>Découper en étapes numérotées.</td></tr>
<tr><td>4. Question orientée</td><td>Réponse complaisante</td><td>Poser une question neutre ; demander avantages et limites.</td></tr>
<tr><td>5. Aucune indication de format</td><td>Texte trop long, mal structuré</td><td>Préciser longueur, structure, registre.</td></tr>
<tr><td>6. Aucune indication de destinataire</td><td>Ton et vocabulaire inadaptés</td><td>Décrire le destinataire, son niveau, son état d'esprit.</td></tr>
<tr><td>7. Données personnelles inutiles</td><td>Risque de confidentialité, sans gain de qualité</td><td>Pseudonymiser : « le client », « [NOM] », référence interne.</td></tr>
<tr><td>8. Consignes contradictoires</td><td>L'IA en applique une au hasard</td><td>Relire la requête : « court » et « très détaillé » ne vont pas ensemble.</td></tr>
<tr><td>9. Accepter la première réponse</td><td>Qualité moyenne, erreurs non repérées</td><td>Itérer, faire critiquer, relire.</td></tr>
<tr><td>10. Recopier sans vérifier</td><td>Erreur envoyée au client, engagement de l'entreprise</td><td>Règle des trois vérifications : faits, fond, forme (section 1.5).</td></tr>
</table>
<h3>Avant / après n° 1 : la relance de pièces (Julie)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avant</th><th>Après</th></tr>
<tr><td>« Fais une relance pour un client qui n'a pas envoyé ses papiers. »</td><td>« Tu es assistante administrative dans une PME de rénovation énergétique. Rédige une relance courtoise à un client particulier qui a signé un devis d'isolation des combles et qui ne nous a pas encore transmis deux pièces nécessaires au montage de son dossier d'aide : [PIÈCE 1] et [PIÈCE 2]. C'est la deuxième relance ; la première date du [DATE]. Explique en une phrase que sans ces pièces le dossier ne peut pas être déposé. Propose de l'aider par téléphone s'il a des difficultés. Vouvoiement, ton bienveillant, 110 mots maximum. N'invente aucun délai et aucune conséquence financière. Signature : Julie, Thermia Rénov. »</td></tr>
</table>
<p><strong>Ce qui change</strong> : rôle, situation précise, historique (deuxième relance), objectif, aide proposée, contraintes d'exactitude, champs à compléter entre crochets que Julie remplit au moment de l'envoi, sans donner l'identité du client à l'outil.</p>
<h3>Avant / après n° 2 : le compte rendu de chantier (Thomas)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avant</th><th>Après</th></tr>
<tr><td>« Fais un compte rendu de chantier. »</td><td>« Transforme mes notes ci-dessous en compte rendu de chantier, sans rien ajouter qui n'y figure pas.<br />Structure obligatoire : 1. Informations générales (chantier, date, présents) ; 2. Travaux réalisés ; 3. Points de vigilance et réserves ; 4. Décisions prises ; 5. Actions à mener (tableau : action, responsable, échéance) ; 6. Prochaine intervention.<br />Style : phrases courtes, factuelles, sans jugement. Si une rubrique est vide dans mes notes, écris « Néant ». Si une information est ambiguë, signale-la entre crochets avec un point d'interrogation.<br />Mes notes : chantier F-0925, mardi, présents moi + 2 poseurs + cliente. combles finis 30 cm soufflé, repère hauteur posé. trappe à reprendre ferme mal. PAC unité ext posée côté jardin, liaison faite, mise en service jeudi si électricien ok. cliente demande où mettre le ballon, on garde cellier. électricien à appeler (moi) avant mercredi. »</td></tr>
</table>
<p><strong>Ce qui change</strong> : un gabarit fixe et réutilisable, la règle « rien ajouter », le traitement des rubriques vides et des ambiguïtés. Le résultat est un compte rendu homogène d'un chantier à l'autre, que Thomas relit en deux minutes.</p>
<h3>Avant / après n° 3 : la publication sur un réseau social (Karim)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avant</th><th>Après</th></tr>
<tr><td>« Écris un post pour vendre des pompes à chaleur. »</td><td>« Tu es chargé de communication d'une PME de rénovation énergétique de la région lyonnaise. Rédige trois propositions de publication pour notre page professionnelle, sur le thème : « Pourquoi on isole avant de changer le chauffage ». Public : propriétaires de maisons individuelles. Objectif : informer et montrer notre sérieux, pas vendre. Chaque publication : 80 à 100 mots, une accroche différente, une question finale pour inviter à commenter. Contraintes : aucun chiffre d'économie, aucun montant d'aide, aucune promesse ; pas de termes « gratuit », « garanti », « le meilleur » ; pas d'émoticônes ; aucune incitation à nous contacter par message privé pour un devis immédiat. »</td></tr>
</table>
<p><strong>Ce qui change</strong> : un objectif d'information conforme à la déontologie du secteur, un public précis, trois versions à comparer, des contraintes qui écartent les promesses commerciales que l'IA a tendance à produire spontanément.</p>
<h3>Avant / après n° 4 : la synthèse d'un document (Sandrine MOREL)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avant</th><th>Après</th></tr>
<tr><td>« Résume ce document. »</td><td>« Je suis dirigeante d'une PME de 14 salariés. Voici les conditions générales d'un nouveau fournisseur de pompes à chaleur. Fais-en une synthèse d'une page pour m'aider à décider si je signe : 1. les engagements du fournisseur (délais de livraison, garanties, assistance) ; 2. nos engagements (minimums de commande, paiement, pénalités) ; 3. les clauses qui pourraient nous être défavorables ; 4. les questions à poser au fournisseur avant de signer. Cite pour chaque point l'article du document concerné. N'interprète pas au-delà du texte ; si une clause est ambiguë, dis-le. Rappelle en fin de synthèse que ce résumé ne remplace pas une lecture intégrale ni, si nécessaire, l'avis d'un conseil juridique. »</td></tr>
</table>
<p><strong>Ce qui change</strong> : un objectif de décision, une grille de lecture, l'obligation de citer l'article du document pour pouvoir vérifier, l'interdiction de surinterpréter. Avant de joindre le document, Sandrine vérifie qu'elle peut le transmettre à l'outil (confidentialité des conditions négociées, outil autorisé).</p>
<h3>Avant / après n° 5 : la question d'information</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avant</th><th>Après</th></tr>
<tr><td>« La PAC c'est mieux que la chaudière gaz, non ? »</td><td>« Pour une maison individuelle en France, compare de façon neutre une pompe à chaleur air/eau et une chaudière gaz à condensation selon les critères suivants : principe de fonctionnement, conditions pour que la solution soit pertinente, contraintes d'installation, entretien, points de vigilance. Présente un tableau. Ne donne aucun chiffre de coût ou d'économie. Signale les points qui dépendent de la réglementation en vigueur et qu'il faut vérifier. »</td></tr>
</table>
<p><strong>Ce qui change</strong> : une question neutre au lieu d'une question orientée, des critères explicites, l'exclusion des chiffres invérifiables, le signalement de ce qui doit être vérifié.</p>
<blockquote><strong>Bonne pratique :</strong> lorsque vous relisez une requête avant de l'envoyer, faites le test du « collègue intérimaire » : si un collègue arrivé le matin même recevait exactement ce texte, saurait-il quoi faire, pour qui, sous quelle forme, avec quelles limites ? Si non, l'IA non plus.</blockquote>
<blockquote><strong>À retenir</strong><br />Les erreurs les plus fréquentes sont l'absence de contexte, la demande de faits au lieu de leur fourniture, les tâches mélangées, les questions orientées, l'absence de format et de destinataire, les données personnelles inutiles, les consignes contradictoires, l'acceptation de la première réponse et la recopie sans vérification. Chaque « après » de cette section applique la même logique : situation précise, tâche claire, format décrit, contraintes d'exactitude, champs [À COMPLÉTER].</blockquote>
`,
      },
      {
        title: "2.5 – Des requêtes pour les métiers du bâtiment et de la rénovation énergétique",
        content: `
<p>Cette section rassemble des requêtes prêtes à adapter, classées par métier. Les éléments entre crochets sont à remplacer par vos informations, sans données personnelles inutiles. Chaque requête intègre les contraintes d'exactitude propres au secteur : aucun montant d'aide, aucune économie chiffrée, aucune qualification ni aucun délai non fournis.</p>
<h3>Pour le commercial</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Besoin</th><th>Requête type</th></tr>
<tr><td>Mail de suivi après une visite</td><td>« Tu es commercial d'une PME de rénovation énergétique. Rédige un mail de suivi après une visite de découverte chez des propriétaires occupants. Points abordés : [POINTS]. Prochaine étape : [ÉTAPE ET DATE]. Documents que nous attendons : [LISTE]. Rappelle qu'aucune décision n'est attendue avant la remise de notre proposition et qu'ils peuvent se renseigner auprès du service public France Rénov'. 150 mots maximum, vouvoiement, ton sobre. N'ajoute aucun chiffre. »</td></tr>
<tr><td>Expliquer simplement une solution technique</td><td>« Explique à un particulier non technicien, en 120 mots et avec une comparaison de la vie quotidienne, le principe de [SOLUTION]. Termine par deux questions qu'il pourrait se poser et une réponse honnête à chacune. Pas de chiffres. »</td></tr>
<tr><td>Préparer les réponses aux objections</td><td>« Liste les six objections les plus fréquentes d'un particulier face à un projet de [TRAVAUX] (prix, confiance, délais, nuisances, démarches, utilité). Pour chacune, propose une réponse honnête en deux phrases, sans pression ni promesse, qui invite à poser des questions. »</td></tr>
<tr><td>Reformuler une proposition commerciale</td><td>« Voici le texte de présentation de notre proposition. Réécris-le pour qu'un client de 70 ans le comprenne sans aide : phrases courtes, un terme technique expliqué à chaque fois, aucun changement sur le fond, les prix ou les engagements. Liste à la fin les passages que tu as modifiés. »</td></tr>
</table>
<h3>Pour l'assistant administratif</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Besoin</th><th>Requête type</th></tr>
<tr><td>Accusé de réception d'une demande</td><td>« Rédige un accusé de réception pour une demande reçue via le formulaire de notre site concernant [TYPE DE TRAVAUX]. Indique que la demande est bien reçue, que [PRÉNOM ET FONCTION] la recontactera [DÉLAI RÉEL INTERNE], et qu'il n'y a aucun engagement à ce stade. 80 mots, vouvoiement. »</td></tr>
<tr><td>Résumer un fil de mails</td><td>« Voici un échange de mails (noms remplacés). Fais un résumé en cinq lignes : demande initiale, réponses déjà données, point en suspens, prochaine action, qui doit agir. Ne déduis rien qui ne figure pas dans les mails. »</td></tr>
<tr><td>Créer un tableau de suivi</td><td>« Propose la structure d'un tableau de suivi des dossiers clients pour une PME de rénovation énergétique : colonnes, type de contenu de chaque colonne, valeurs possibles pour les colonnes de statut. Pas de colonne pour des données sensibles (revenus, numéro fiscal). Présente le résultat en tableau. »</td></tr>
<tr><td>Corriger un courrier</td><td>« Corrige l'orthographe, la grammaire et la ponctuation de ce courrier, sans modifier le fond ni le style. Présente d'abord la version corrigée, puis la liste des corrections. »</td></tr>
</table>
<h3>Pour le conducteur de travaux</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Besoin</th><th>Requête type</th></tr>
<tr><td>Compte rendu à partir d'une dictée</td><td>Gabarit de la section 2.4 (avant / après n° 2), appliqué à la transcription de la dictée.</td></tr>
<tr><td>Information au client sur l'avancement</td><td>« À partir de ce compte rendu interne, rédige un message au client qui ne reprend que ce qui le concerne : ce qui est fait, ce qui reste, la prochaine intervention, ce qu'on attend de lui. Aucun détail interne (noms des poseurs, problèmes de fournisseurs), aucun terme technique non expliqué, 120 mots. »</td></tr>
<tr><td>Liste de contrôle avant réception</td><td>« Propose une liste de points de contrôle à vérifier avec le client avant la réception de travaux de [TRAVAUX], sous forme de cases à cocher, regroupés par thème. Précise que la liste est indicative et doit être validée par le responsable technique selon les règles de l'art et les documents techniques applicables. »</td></tr>
<tr><td>Planning de la semaine</td><td>« Mets en forme ce planning brut en tableau (jour, chantier, équipe, tâches, matériel à prévoir) et signale les conflits apparents (même équipe à deux endroits, matériel manquant) : [PLANNING]. »</td></tr>
</table>
<h3>Pour le dirigeant</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Besoin</th><th>Requête type</th></tr>
<tr><td>Préparer une réunion d'équipe</td><td>« Prépare l'ordre du jour d'une réunion d'équipe d'une heure sur [THÈME], avec pour chaque point l'objectif, la durée et la question à trancher. Propose en fin de document trois questions ouvertes pour faire participer l'équipe. »</td></tr>
<tr><td>Note interne</td><td>« Rédige une note interne d'une page annonçant [DÉCISION] à une équipe de 14 personnes (bureau et chantier). Explique pourquoi, ce qui change concrètement pour chacun, à partir de quand, et à qui poser ses questions. Ton direct et respectueux. »</td></tr>
<tr><td>Veille réglementaire (avec recherche web)</td><td>« Recherche les évolutions récentes concernant [SUJET] pour les entreprises de rénovation énergétique en France. Appuie-toi en priorité sur les sites officiels. Pour chaque évolution : date, source avec lien, ce qui change, qui est concerné. Signale clairement les projets non encore adoptés. Si tu ne trouves rien de fiable, dis-le. »</td></tr>
<tr><td>Analyse d'un appel d'offres</td><td>« Voici le règlement de consultation et le cahier des charges d'un marché. Liste : les pièces à fournir, les dates limites, les critères de sélection et leur pondération, les exigences techniques, les points flous à clarifier. Cite la page ou l'article pour chaque élément. »</td></tr>
</table>
<h3>Le vocabulaire de consignes qui protège</h3>
<p>Quelques formules reviennent dans toutes ces requêtes. Elles valent la peine d'être apprises par cœur :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Formule</th><th>Effet</th></tr>
<tr><td>« Utilise uniquement les informations fournies. »</td><td>Limite les inventions.</td></tr>
<tr><td>« Si une information manque, écris [À COMPLÉTER]. »</td><td>Rend les manques visibles.</td></tr>
<tr><td>« N'ajoute aucun chiffre, montant, délai ou engagement. »</td><td>Évite les promesses commerciales non vérifiées.</td></tr>
<tr><td>« Signale ce qui doit être vérifié. »</td><td>Prépare votre relecture.</td></tr>
<tr><td>« Cite la source ou l'article du document. »</td><td>Permet de contrôler.</td></tr>
<tr><td>« Sans modifier le fond. »</td><td>Pour les corrections et reformulations.</td></tr>
<tr><td>« Pour un particulier non technicien. »</td><td>Adapte le vocabulaire.</td></tr>
</table>
<blockquote><strong>Bonne pratique :</strong> chez Thermia Rénov, toute requête destinée à produire un texte pour un client se termine par la même phrase de contrôle : « Liste après ton texte les affirmations précises que je dois vérifier avant envoi. » Cette liste sert de check-list de relecture.</blockquote>
<blockquote><strong>À retenir</strong><br />Chaque métier dispose de requêtes types : suivi de visite, explications et objections pour le commercial ; accusés de réception, résumés de mails et tableaux pour l'assistant ; comptes rendus, messages d'avancement et listes de contrôle pour le conducteur de travaux ; réunions, notes, veille et analyse d'appels d'offres pour le dirigeant. Toutes intègrent les contraintes du secteur : pas de montant d'aide, pas d'économie chiffrée, pas d'engagement non fourni, des champs à compléter et une liste de vérifications.</blockquote>
`,
      },
      {
        title: "2.6 – Construire une bibliothèque de prompts d'équipe et des gabarits réutilisables",
        content: `
<h3>Pourquoi une bibliothèque partagée ?</h3>
<p>Dans une entreprise, l'usage de l'IA reste souvent individuel : chacun réinvente ses requêtes, avec des résultats inégaux. Une <strong>bibliothèque de prompts d'équipe</strong> rassemble les requêtes testées et validées pour les tâches récurrentes. Elle apporte quatre bénéfices :</p>
<ul>
<li><strong>Gain de temps</strong> : on ne repart pas de zéro ;</li>
<li><strong>Homogénéité</strong> : les mails, comptes rendus et publications ont la même qualité et le même ton, quel que soit l'auteur ;</li>
<li><strong>Conformité</strong> : les contraintes de confidentialité et d'exactitude sont intégrées une fois pour toutes ;</li>
<li><strong>Transmission</strong> : un nouveau salarié dispose immédiatement des bonnes pratiques.</li>
</ul>
<h3>Le gabarit : une requête à trous</h3>
<p>Un <strong>gabarit</strong> est une requête dont les parties fixes (rôle, format, contraintes) sont rédigées une fois pour toutes, et dont les parties variables sont signalées par des champs entre crochets. Exemple :</p>
<blockquote><strong>GABARIT – MAIL D'INFORMATION CHANTIER (version 2)</strong><br />Tu es conducteur de travaux dans une PME de rénovation énergétique. Rédige un mail à un client particulier pour l'informer de [OBJET : retard / changement de date / intervention à prévoir].<br />Faits : [FAITS, SANS NOM NI ADRESSE].<br />Nouvelle date ou prochaine étape : [DATE].<br />Ce que nous attendons du client : [ACTION OU « RIEN »].<br />Format : objet du mail, puis 150 mots maximum en trois paragraphes.<br />Contraintes : vouvoiement ; ton rassurant et factuel ; pas de jargon ; reconnaître le désagrément s'il y en a un ; n'invente aucune date, aucune cause, aucun engagement ; si une information manque, écris [À COMPLÉTER]. Après le mail, liste les éléments à vérifier avant envoi.</blockquote>
<h3>Comment organiser la bibliothèque</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique de la fiche</th><th>Contenu</th><th>Exemple</th></tr>
<tr><td>Nom et numéro de version</td><td>Nom explicite, version, date</td><td>« Relance pièces dossier d'aide – v3 – 10/2026 »</td></tr>
<tr><td>Usage</td><td>Quand utiliser ce gabarit</td><td>Deuxième relance d'un client pour pièces manquantes</td></tr>
<tr><td>Outil(s) testé(s)</td><td>Outil(s) autorisé(s) avec lequel le gabarit a été validé</td><td>Outil validé par l'entreprise</td></tr>
<tr><td>Texte du gabarit</td><td>La requête complète, champs entre crochets</td><td>Voir ci-dessus</td></tr>
<tr><td>Données autorisées</td><td>Ce qu'on peut et ne peut pas saisir</td><td>Aucun nom, aucune adresse, aucun document fiscal ; références internes uniquement</td></tr>
<tr><td>Points de vérification</td><td>Ce que l'utilisateur doit contrôler avant usage</td><td>Liste des pièces conforme au dossier ; aucun délai inventé</td></tr>
<tr><td>Exemple de bon résultat</td><td>Une production validée, anonymisée</td><td>Mail type validé par la dirigeante</td></tr>
<tr><td>Propriétaire</td><td>Qui fait évoluer le gabarit</td><td>Julie</td></tr>
</table>
<h3>Où ranger la bibliothèque ?</h3>
<ul>
<li>Un <strong>document partagé</strong> dans l'espace de stockage de l'entreprise (traitement de texte ou tableur), avec un sommaire par métier : c'est la solution la plus simple pour une TPE ;</li>
<li>un <strong>espace de type wiki</strong> ou intranet si l'entreprise en dispose ;</li>
<li>les fonctions de <strong>projets ou d'assistants personnalisés</strong> des outils d'IA (section 2.7), pour les gabarits les plus utilisés.</li>
</ul>
<p>Quelle que soit la solution, la bibliothèque doit être <strong>accessible</strong> (tout le monde sait où elle est), <strong>vivante</strong> (on l'améliore) et <strong>maîtrisée</strong> (une personne la tient à jour et retire les versions obsolètes).</p>
<h3>Faire vivre la bibliothèque</h3>
<ol>
<li><strong>Partir des tâches réelles</strong> : recenser les dix tâches d'écriture les plus fréquentes de l'équipe (la cartographie complète est travaillée en C4).</li>
<li><strong>Tester</strong> chaque gabarit sur trois ou quatre cas différents, avec l'outil autorisé.</li>
<li><strong>Valider</strong> : le responsable (dirigeant ou référent) relit les résultats, en particulier pour les textes destinés aux clients.</li>
<li><strong>Publier</strong> dans la bibliothèque, avec la date et le numéro de version.</li>
<li><strong>Recueillir les retours</strong> : un gabarit qui oblige à beaucoup corriger doit être amélioré.</li>
<li><strong>Réviser</strong> régulièrement, notamment lorsque l'outil change ou qu'une règle du secteur évolue.</li>
</ol>
<h3>Le premier lot de gabarits de Thermia Rénov</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Gabarit</th><th>Utilisateur principal</th><th>Point de vigilance intégré</th></tr>
<tr><td>G1</td><td>Accusé de réception d'une demande du site</td><td>Julie</td><td>Mention « à votre demande » ; aucun engagement</td></tr>
<tr><td>G2</td><td>Relance de pièces manquantes</td><td>Julie</td><td>Aucun délai ni conséquence financière inventés</td></tr>
<tr><td>G3</td><td>Confirmation de rendez-vous</td><td>Julie, Karim</td><td>Rendez-vous demandé par le client ; documents à préparer</td></tr>
<tr><td>G4</td><td>Mail de suivi après visite</td><td>Karim</td><td>Aucun chiffre, renvoi possible vers France Rénov'</td></tr>
<tr><td>G5</td><td>Compte rendu de chantier</td><td>Thomas</td><td>Rien d'ajouté aux notes ; rubriques « Néant »</td></tr>
<tr><td>G6</td><td>Information au client sur l'avancement</td><td>Thomas</td><td>Pas de détail interne</td></tr>
<tr><td>G7</td><td>Publication pédagogique</td><td>Karim, Sandrine</td><td>Pas de promesse ni de termes interdits ; validation par la dirigeante</td></tr>
<tr><td>G8</td><td>Réponse à une réclamation</td><td>Sandrine</td><td>Reconnaissance du désagrément, aucun aveu de responsabilité non vérifié, validation obligatoire</td></tr>
</table>
<blockquote><strong>Bonne pratique :</strong> donnez à chaque gabarit un numéro et une version, et indiquez ce numéro dans votre carnet de requêtes lorsque vous l'utilisez. Vous saurez ainsi quels gabarits servent vraiment et lesquels doivent être améliorés : c'est aussi une première mesure du temps gagné, utile en C4.</blockquote>
<blockquote><strong>À retenir</strong><br />Une bibliothèque de prompts d'équipe rassemble des gabarits testés et validés pour les tâches récurrentes : elle fait gagner du temps, homogénéise la qualité, intègre la conformité et facilite l'intégration des nouveaux salariés. Chaque fiche précise l'usage, l'outil, le texte du gabarit, les données autorisées, les points de vérification, un exemple et un propriétaire. La bibliothèque doit être accessible, vivante et maîtrisée.</blockquote>
`,
      },
      {
        title: "2.7 – Assistants personnalisés, projets et instructions permanentes",
        content: `
<h3>De la requête ponctuelle à l'assistant configuré</h3>
<p>La plupart des outils proposent désormais des moyens de <strong>conserver des consignes</strong> d'une conversation à l'autre, sous des noms qui varient selon l'éditeur et l'offre : instructions personnalisées, mémoire, projets, espaces, assistants personnalisés (par exemple les GPT personnalisés dans ChatGPT, les « Gems » dans Gemini, les projets dans Claude, les agents ou assistants configurables dans Copilot ou Le Chat). Les fonctions disponibles et leur nom évoluent : vérifiez ce que propose l'offre utilisée par votre entreprise.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Fonction</th><th>Principe</th><th>Usage type</th></tr>
<tr><td><strong>Instructions personnalisées</strong></td><td>Des consignes générales appliquées à toutes vos conversations</td><td>« Je travaille dans une PME de rénovation énergétique en France. Réponds en français, avec le vouvoiement pour les textes destinés aux clients. N'invente jamais de chiffres. »</td></tr>
<tr><td><strong>Mémoire</strong></td><td>L'outil retient automatiquement certaines informations sur vous au fil des conversations</td><td>Pratique pour des préférences ; à surveiller : vérifiez ce qui est mémorisé et supprimez toute information sensible. Désactivable dans la plupart des outils.</td></tr>
<tr><td><strong>Projets ou espaces</strong></td><td>Un espace regroupant des conversations, des consignes et des documents de référence</td><td>Un projet « Comptes rendus de chantier » avec le gabarit et deux exemples validés.</td></tr>
<tr><td><strong>Assistant personnalisé</strong></td><td>Un assistant spécialisé, configuré une fois (nom, rôle, consignes, documents, parfois outils), que l'on peut éventuellement partager</td><td>Un assistant « Rédacteur de mails clients Thermia » utilisé par toute l'équipe.</td></tr>
</table>
<h3>Rédiger les instructions d'un assistant</h3>
<p>Les instructions d'un assistant personnalisé sont une requête permanente. Elles reprennent la structure Rôle / Contexte / Tâche / Format / Contraintes, en plus détaillé, et ajoutent la manière de réagir aux situations prévisibles.</p>
<blockquote><strong>ASSISTANT « COMPTES RENDUS DE CHANTIER » – INSTRUCTIONS (v1)</strong><br /><em>Rôle</em> : tu aides les conducteurs de travaux d'une PME de rénovation énergétique à transformer leurs notes ou leurs dictées en comptes rendus de chantier.<br /><em>Tâche</em> : à chaque message, tu reçois des notes brutes ; tu produis un compte rendu selon la structure obligatoire.<br /><em>Structure</em> : 1. Informations générales (référence du chantier, date, présents) ; 2. Travaux réalisés ; 3. Points de vigilance et réserves ; 4. Décisions prises ; 5. Actions à mener (tableau : action, responsable, échéance) ; 6. Prochaine intervention.<br /><em>Règles</em> : n'ajoute aucune information qui ne figure pas dans les notes ; écris « Néant » pour une rubrique vide ; signale entre crochets avec un point d'interrogation toute information ambiguë ; phrases courtes et factuelles ; ne donne aucun avis technique ; si les notes contiennent un nom complet, une adresse ou un numéro de téléphone de client, remplace-les par [CLIENT] et signale-le en fin de compte rendu.<br /><em>En fin de réponse</em> : liste les points à vérifier par le conducteur de travaux.</blockquote>
<h3>Les documents de référence</h3>
<p>Un assistant ou un projet peut s'appuyer sur des documents que vous lui fournissez : charte de rédaction, exemples validés, fiche d'identité de l'entreprise, procédure interne, FAQ. C'est un moyen puissant de réduire les hallucinations, à trois conditions :</p>
<ul>
<li>les documents doivent être <strong>à jour</strong> (une fiche d'identité qui mentionne une qualification expirée produira des textes faux) ;</li>
<li>ils ne doivent contenir <strong>aucune donnée personnelle</strong> ni information confidentielle non autorisée dans l'outil ;</li>
<li>il faut indiquer dans les instructions que ces documents <strong>priment</strong> sur les connaissances générales de l'outil : « En cas de contradiction, la fiche d'identité de l'entreprise fait foi. »</li>
</ul>
<h3>La fiche d'identité de l'entreprise : un document clé</h3>
<p>Le cas de Sandrine MOREL au chapitre 1 l'a montré : sans information exacte, l'IA invente une entreprise plausible. Une <strong>fiche d'identité</strong> d'une page, jointe aux projets et assistants qui produisent des textes externes, évite ce risque.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu de la fiche (Thermia Rénov, données fictives)</th></tr>
<tr><td>Présentation</td><td>PME de rénovation énergétique, Saint-Genis-Laval (Rhône), 14 salariés</td></tr>
<tr><td>Date de création</td><td>[DATE EXACTE, à reprendre de l'extrait d'immatriculation]</td></tr>
<tr><td>Activités réalisées</td><td>Pompes à chaleur, isolation des combles et des murs, chauffe-eau thermodynamiques, photovoltaïque</td></tr>
<tr><td>Activités non réalisées</td><td>Géothermie, chauffage au bois, toiture, menuiseries</td></tr>
<tr><td>Qualifications</td><td>[LISTE EXACTE ET DATES DE VALIDITÉ, mise à jour à chaque renouvellement]</td></tr>
<tr><td>Zone d'intervention</td><td>Métropole de Lyon et communes voisines</td></tr>
<tr><td>Politique commerciale</td><td>Aucun démarchage ; rendez-vous uniquement à la demande du client ; pas de signature au premier rendez-vous</td></tr>
<tr><td>Ton de communication</td><td>Sobre, pédagogique, vouvoiement, sans superlatifs</td></tr>
<tr><td>Formules interdites</td><td>« Gratuit », « garanti », « le meilleur », « agréé par l'État », tout montant d'aide ou d'économie</td></tr>
</table>
<h3>Partager un assistant dans l'équipe</h3>
<p>Selon les offres, un assistant peut être partagé avec les collègues ; dans les offres destinées aux entreprises, l'administrateur peut en contrôler la diffusion. Avant de partager :</p>
<ol>
<li>tester l'assistant sur plusieurs cas, y compris des cas pièges (notes incomplètes, information manquante, présence d'un nom de client) ;</li>
<li>vérifier que les documents joints peuvent être vus par toutes les personnes qui auront accès à l'assistant ;</li>
<li>indiquer un responsable et un numéro de version, comme pour la bibliothèque de prompts ;</li>
<li>rappeler que l'assistant ne dispense jamais de la relecture.</li>
</ol>
<blockquote><strong>Attention :</strong> un assistant personnalisé créé dans un compte personnel, avec des documents de l'entreprise, échappe au contrôle de l'entreprise : départ du salarié, partage public par erreur, conditions d'utilisation des données moins protectrices. Les assistants à usage professionnel se créent dans l'outil et sur le compte autorisés par l'entreprise.</blockquote>
<blockquote><strong>À retenir</strong><br />Instructions personnalisées, mémoire, projets et assistants personnalisés permettent de conserver des consignes et des documents de référence d'une conversation à l'autre. Les instructions d'un assistant sont une requête permanente détaillée qui prévoit les situations difficiles. Les documents de référence (fiche d'identité de l'entreprise, exemples validés) réduisent fortement les inventions, s'ils sont à jour et sans données personnelles. Un assistant professionnel se crée et se partage dans l'outil autorisé par l'entreprise, avec un responsable et une version.</blockquote>
`,
      },
      {
        title: "2.8 – Quiz de fin de chapitre",
        content: `
<p>Répondez aux questions, puis consultez le corrigé.</p>
<ol>
<li><strong>La structure de requête présentée dans ce chapitre comporte, dans l'ordre :</strong><br />A. Question, Réponse, Vérification<br />B. Rôle, Contexte, Tâche, Format, Contraintes<br />C. Titre, Introduction, Conclusion<br />D. Outil, Compte, Mot de passe</li>
<li><strong>La brique la plus souvent oubliée, et pourtant la plus utile, est :</strong><br />A. Le rôle<br />B. Le contexte<br />C. La politesse<br />D. La signature</li>
<li><strong>Fournir à l'IA un ou plusieurs exemples du résultat attendu s'appelle :</strong><br />A. L'itération<br />B. Le few-shot (requête avec exemples)<br />C. La mémoire<br />D. L'hallucination</li>
<li><strong>Pour rédiger la page de présentation de l'entreprise sans invention, la meilleure méthode est :</strong><br />A. « Écris notre page de présentation »<br />B. Demander à l'IA de poser d'abord ses questions, ou lui fournir une fiche d'identité exacte<br />C. Copier la page d'un concurrent<br />D. Demander un texte « très convaincant »</li>
<li><strong>Le premier résultat ne convient pas : il est trop long et le ton est trop commercial. La meilleure demande est :</strong><br />A. « Refais »<br />B. « C'est nul »<br />C. « Raccourcis à 100 mots et retire les superlatifs et les formules publicitaires »<br />D. Fermer l'outil</li>
<li><strong>Quand faut-il ouvrir une nouvelle conversation ?</strong><br />A. Jamais<br />B. Lorsque l'outil revient sans cesse à une erreur corrigée, que l'on change de sujet ou de client, ou que la conversation est très longue<br />C. À chaque phrase<br />D. Uniquement le lundi</li>
<li><strong>Pour contrer le biais de complaisance lors d'une relecture, on demande :</strong><br />A. « Mon texte est bien, non ? »<br />B. « Relis ce texte comme un client méfiant et liste ses trois principales faiblesses, sans complaisance »<br />C. « Félicite-moi »<br />D. « Ajoute des émoticônes »</li>
<li><strong>Dans un gabarit, les éléments entre crochets servent à :</strong><br />A. Décorer le texte<br />B. Signaler les parties variables à compléter, sans donner de données personnelles inutiles à l'outil<br />C. Masquer le texte à l'IA<br />D. Indiquer un lien Internet</li>
<li><strong>Une bibliothèque de prompts d'équipe doit être :</strong><br />A. Secrète et individuelle<br />B. Accessible, vivante (améliorée) et maîtrisée (un responsable, des versions)<br />C. Figée une fois pour toutes<br />D. Rédigée par l'IA sans relecture</li>
<li><strong>Karim crée, sur son compte gratuit personnel, un assistant personnalisé contenant les tarifs et la liste des clients de Thermia Rénov. Cette pratique est :</strong><br />A. Recommandée, car elle fait gagner du temps<br />B. À proscrire : les données de l'entreprise échappent à son contrôle ; un assistant professionnel se crée dans l'outil et le compte autorisés, sans données personnelles inutiles<br />C. Acceptable s'il ne le partage pas<br />D. Obligatoire</li>
</ol>
<h4>Corrigé</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>B</td><td>Rôle (point de vue), Contexte (situation, destinataire, faits), Tâche (verbe d'action), Format (longueur, structure), Contraintes (obligations, interdits, conduite à tenir si une information manque).</td></tr>
<tr><td>2</td><td>B</td><td>Sans contexte, l'IA remplace ce qu'elle ignore par du générique ou de l'invention.</td></tr>
<tr><td>3</td><td>B</td><td>L'exemple transmet ton, structure et longueur ; il doit être bon, séparé du nouveau cas et anonymisé.</td></tr>
<tr><td>4</td><td>B</td><td>Faire poser les questions ou fournir une fiche d'identité exacte évite l'invention de l'ancienneté, des activités ou des qualifications.</td></tr>
<tr><td>5</td><td>C</td><td>Une correction précise et ciblée produit une amélioration ; une demande vague produit un autre tirage au hasard.</td></tr>
<tr><td>6</td><td>B</td><td>Une conversation longue accumule des consignes contradictoires et dépasse la fenêtre de contexte ; changer de client dans une même conversation risque de mélanger les informations.</td></tr>
<tr><td>7</td><td>B</td><td>Une demande de critique explicite, avec un point de vue exigeant, contre la tendance de l'IA à approuver.</td></tr>
<tr><td>8</td><td>B</td><td>Les champs à compléter rendent le gabarit réutilisable et évitent de saisir l'identité du client dans l'outil.</td></tr>
<tr><td>9</td><td>B</td><td>Une bibliothèque utile est connue de tous, améliorée par les retours et tenue à jour par un responsable.</td></tr>
<tr><td>10</td><td>B</td><td>Données commerciales et personnelles hors du contrôle de l'entreprise, conditions d'utilisation moins protectrices : c'est un cas typique d'« IA fantôme » (voir C5).</td></tr>
</table>
`,
      },
      {
        title: "2.9 – Cas pratique : construire les premiers gabarits de Thermia Rénov",
        content: `
<h3>Contexte</h3>
<p>À l'issue du premier jour, Sandrine MOREL demande à l'équipe de produire trois gabarits pour la bibliothèque de prompts de Thermia Rénov. Julie a rédigé un premier jet de requête pour les accusés de réception, Karim un premier jet pour les mails de suivi après visite, et Thomas a simplement envoyé des notes de chantier en demandant « un truc pour faire mes CR ».</p>
<ul>
<li><strong>Requête de Julie</strong> : « Réponds à M. Ferrand (12 rue des Lilas, Saint-Genis-Laval, tél. 06…) qu'on a bien reçu sa demande et qu'on le rappelle vite. »</li>
<li><strong>Requête de Karim</strong> : « Fais un mail de suivi super vendeur après ma visite chez les Ferrand, dis-leur qu'avec les aides la PAC sera presque gratuite et qu'ils économiseront 60 % sur le chauffage, et qu'il faut signer avant la fin du mois. »</li>
<li><strong>Notes de Thomas</strong> : « chantier F-0925 jeudi. ballon posé cellier. mise en service PAC ok. reste réglages régulation lundi. client content. cuve fioul à neutraliser : entreprise spécialisée à appeler (Julie). »</li>
</ul>
<h3>Consigne</h3>
<ol>
<li>Analysez les deux requêtes de Julie et de Karim : listez leurs défauts au regard de la structure Rôle / Contexte / Tâche / Format / Contraintes et des règles du secteur.</li>
<li>Réécrivez la requête de Julie sous forme de gabarit réutilisable.</li>
<li>Réécrivez la requête de Karim sous forme de gabarit conforme.</li>
<li>Proposez à Thomas une requête qui transforme ses notes en compte rendu, puis montrez le compte rendu attendu.</li>
<li>Rédigez la fiche de bibliothèque de l'un des trois gabarits.</li>
</ol>
<h3>Corrigé détaillé</h3>
<h4>1. Analyse des requêtes</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Requête</th><th>Défauts</th></tr>
<tr><td>Julie</td><td>Données personnelles inutiles (nom, adresse, téléphone) saisies dans l'outil ; pas de rôle ni de format ; « vite » est vague et pousse l'IA à inventer un délai ; aucune contrainte ; non réutilisable.</td></tr>
<tr><td>Karim</td><td>« Super vendeur » oriente vers un ton de pression ; « presque gratuite » et « 60 % d'économies » sont des promesses non vérifiées, constitutives d'une pratique commerciale trompeuse si elles sont envoyées ; « signer avant la fin du mois » est une pression contraire à la charte de l'entreprise ; nom des clients inutile ; pas de format ni de contraintes. C'est exactement ce que l'IA ne doit jamais produire pour Thermia Rénov.</td></tr>
</table>
<h4>2. Gabarit G1 – Accusé de réception (réécriture de la requête de Julie)</h4>
<blockquote>Tu es assistante administrative dans une PME de rénovation énergétique. Rédige un accusé de réception pour une demande reçue sur le formulaire de notre site.<br />Objet de la demande : [TYPE DE TRAVAUX].<br />Personne qui recontactera le client : [PRÉNOM ET FONCTION].<br />Délai de recontact : [DÉLAI RÉEL INTERNE].<br />Format : objet du mail puis 80 mots maximum.<br />Contraintes : vouvoiement ; ton cordial et simple ; indique que la demande est bien reçue, qu'aucun engagement n'existe à ce stade et que nous le recontacterons à sa demande ; n'invente aucun délai, aucun prix, aucune aide ; si une information manque, écris [À COMPLÉTER]. Commence par « Bonjour [CIVILITÉ ET NOM] » sans compléter ce champ. Signature : [PRÉNOM], Thermia Rénov.</blockquote>
<p>Julie remplace les champs au moment de l'envoi, dans sa messagerie, sans avoir saisi l'identité du client dans l'outil d'IA.</p>
<h4>3. Gabarit G4 – Mail de suivi après visite (réécriture de la requête de Karim)</h4>
<blockquote>Tu es commercial d'une PME de rénovation énergétique, rigoureux et pédagogue. Rédige un mail de suivi après un rendez-vous de découverte chez des propriétaires occupants, qui l'avaient demandé.<br />Points abordés : [POINTS ABORDÉS].<br />Pistes de travaux que nous allons étudier : [PISTES].<br />Documents attendus : [LISTE].<br />Prochaine étape : [ÉTAPE ET DATE].<br />Format : objet du mail, puis 150 mots maximum en trois paragraphes : remerciement et rappel de l'objet, ce que nous allons étudier, prochaine étape et documents.<br />Contraintes : vouvoiement ; ton sobre et rassurant ; aucun montant d'aide, aucun reste à charge, aucune économie chiffrée, aucune date limite de signature, aucune formule du type « gratuit », « garanti » ; précise que les aides éventuelles seront simulées avec eux sur les outils officiels et qu'ils peuvent se renseigner auprès du service public France Rénov' ; si une information manque, écris [À COMPLÉTER]. Après le mail, liste les affirmations à vérifier avant envoi.</blockquote>
<p>Karim doit aussi comprendre pourquoi : une promesse d'économie ou de quasi-gratuité, même produite par l'IA, est envoyée sous la responsabilité de l'entreprise. Le formateur fera le lien avec C3 (vérification) et C5 (conformité).</p>
<h4>4. Requête pour Thomas et résultat attendu</h4>
<p>Thomas utilise le gabarit G5 (section 2.4, avant / après n° 2) ou l'assistant « Comptes rendus de chantier » (section 2.7), en collant ses notes. Résultat attendu :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu</th></tr>
<tr><td>1. Informations générales</td><td>Chantier F-0925 ; jeudi [DATE ?] ; présents : [À COMPLÉTER ?]</td></tr>
<tr><td>2. Travaux réalisés</td><td>Pose du ballon d'eau chaude dans le cellier. Mise en service de la pompe à chaleur effectuée.</td></tr>
<tr><td>3. Points de vigilance et réserves</td><td>Réglages de la régulation restant à faire. Cuve fioul à neutraliser.</td></tr>
<tr><td>4. Décisions prises</td><td>Néant</td></tr>
<tr><td>5. Actions à mener</td><td>Réglages de la régulation – [RESPONSABLE ?] – lundi ; appeler l'entreprise spécialisée pour la neutralisation de la cuve – Julie – [ÉCHÉANCE ?]</td></tr>
<tr><td>6. Prochaine intervention</td><td>Lundi : réglages de la régulation</td></tr>
<tr><td>Points à vérifier</td><td>Date exacte du jeudi ; personnes présentes ; responsable des réglages ; échéance pour l'appel de Julie. La mention « client content » n'est pas reprise : c'est une appréciation, à reformuler si Thomas souhaite l'indiquer (« le client n'a pas formulé de réserve »).</td></tr>
</table>
<p>On observe que l'IA, bien cadrée, n'invente ni date ni présents : elle les signale. C'est le comportement recherché.</p>
<h4>5. Fiche de bibliothèque (exemple pour G4)</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu</th></tr>
<tr><td>Nom et version</td><td>G4 – Mail de suivi après visite – v1 – 09/2026</td></tr>
<tr><td>Usage</td><td>Après chaque rendez-vous de découverte demandé par un client particulier</td></tr>
<tr><td>Outil testé</td><td>Outil autorisé par Thermia Rénov</td></tr>
<tr><td>Données autorisées</td><td>Aucun nom, aucune adresse, aucun revenu ; description du logement et des pistes de travaux sans élément identifiant</td></tr>
<tr><td>Points de vérification</td><td>Pistes conformes à la visite ; aucune donnée chiffrée ; date de la prochaine étape exacte ; mention France Rénov' présente</td></tr>
<tr><td>Exemple validé</td><td>Mail type relu et validé par Sandrine MOREL, anonymisé</td></tr>
<tr><td>Propriétaire</td><td>Karim, validation par Sandrine MOREL</td></tr>
</table>
<h3>Ce que le formateur évaluera</h3>
<p>Lors de l'atelier, le formateur observera votre capacité à structurer une requête complète, à transformer une demande ponctuelle en gabarit réutilisable, à intégrer les contraintes d'exactitude et de confidentialité, à itérer à partir d'un premier résultat et à documenter un gabarit pour l'équipe. Ces critères figurent dans la grille de l'évaluation finale du jour 3.</p>
`,
      },
    ],
  },
];
