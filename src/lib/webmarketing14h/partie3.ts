import type { CourseChapter } from "../courseContent";

export const WM14_PARTIE3: CourseChapter[] = [
  {
    title: "Chapitre 5 – C4 Mettre en œuvre le référencement naturel du site",
    description:
      "Comprendre le fonctionnement des moteurs de recherche, réaliser un audit sémantique, optimiser la technique et le contenu d'un site, piloter son indexation, construire une stratégie de netlinking éthique, développer sa visibilité locale et suivre ses résultats avec la Search Console et GA4 – à l'heure des réponses générées par l'IA. Durée indicative : 4 heures. Fil rouge : Maison Lenoir, boulangerie-pâtisserie artisanale à Nantes.",
    sections: [
      {
        title: "5.1 – Introduction au référencement naturel",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Situer le référencement naturel (SEO) parmi les leviers d'acquisition du webmarketing.</li>
<li>Comprendre les trois étapes du fonctionnement d'un moteur de recherche : exploration, indexation, classement.</li>
<li>Connaître les principes de qualité que Google met en avant : contenu utile, fiable et centré sur l'utilisateur, notion d'E-E-A-T.</li>
<li>Présenter l'entreprise fil rouge du chapitre et ses enjeux de visibilité.</li>
</ul>

<h3>1. Qu'est-ce que le référencement naturel ?</h3>
<p>Le <strong>référencement naturel</strong> (en anglais <em>Search Engine Optimization</em>, SEO) regroupe l'ensemble des actions qui visent à améliorer la visibilité d'un site dans les <strong>résultats non payants</strong> des moteurs de recherche (Google, Bing, et les moteurs qui s'appuient sur leurs index). On le distingue :</p>
<ul>
<li>du <strong>référencement payant</strong> (SEA, <em>Search Engine Advertising</em>) : annonces achetées, par exemple via Google Ads ou Microsoft Advertising, qui apparaissent avec la mention « Sponsorisé » ;</li>
<li>du <strong>référencement local</strong>, qui est une branche du SEO consacrée aux recherches à dimension géographique (« boulangerie près de moi », « traiteur Nantes ») et qui s'appuie fortement sur la fiche <strong>Google Business Profile</strong> ;</li>
<li>du <strong>SMO</strong> (<em>Social Media Optimization</em>), qui concerne la visibilité sur les réseaux sociaux.</li>
</ul>
<p>Le SEO présente trois caractéristiques qu'un dirigeant de TPE/PME doit avoir en tête avant de s'y engager :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Caractéristique</th><th>Conséquence pour l'entreprise</th></tr>
<tr><td>Le clic est gratuit</td><td>Pas de coût par clic, mais un coût réel en temps (rédaction, technique) ou en prestation (agence, freelance).</td></tr>
<tr><td>Les effets sont progressifs</td><td>Il faut compter plusieurs semaines à plusieurs mois avant de constater un effet durable ; le SEO ne remplace pas une campagne payante quand on a besoin de résultats immédiats (ouverture, lancement saisonnier).</td></tr>
<tr><td>Les résultats ne sont jamais garantis</td><td>Personne ne peut « garantir la première place sur Google » : les algorithmes évoluent, les concurrents agissent, les pages de résultats changent de forme. Une promesse de ce type doit alerter.</td></tr>
<tr><td>Les acquis sont cumulatifs</td><td>Un contenu utile, bien structuré et bien relié continue d'attirer des visites longtemps après sa publication, à condition d'être entretenu.</td></tr>
</table>

<h3>2. Comment fonctionne un moteur de recherche</h3>
<p>Google décrit lui-même son fonctionnement en trois étapes, dans sa documentation destinée aux propriétaires de sites (Google Search Central). Les comprendre permet de diagnostiquer pourquoi une page n'apparaît pas.</p>
<h4>Étape 1 – L'exploration (crawl)</h4>
<p>Des robots, appelés <em>crawlers</em> (pour Google : <strong>Googlebot</strong>), parcourent le web en suivant les liens d'une page à l'autre et en lisant les plans de site (sitemaps XML) qui leur sont soumis. Ils téléchargent le code des pages, puis Google effectue un <strong>rendu</strong> de la page (exécution du JavaScript, comme le ferait un navigateur) pour voir le contenu final.</p>
<p>Ce qui peut bloquer l'exploration : une page qu'aucun lien ne pointe (« page orpheline »), une interdiction dans le fichier <code>robots.txt</code>, un serveur lent ou en erreur, un contenu qui n'apparaît qu'après une action de l'utilisateur (clic, connexion), des liens qui ne sont pas de vrais liens HTML <code>&lt;a href&gt;</code>.</p>
<h4>Étape 2 – L'indexation</h4>
<p>Google analyse le contenu de la page (textes, balises, images, données structurées), détermine de quoi elle parle, repère si elle est en double avec d'autres pages (et choisit alors une page <strong>canonique</strong>), puis décide de la stocker ou non dans son <strong>index</strong>. <strong>Toutes les pages explorées ne sont pas indexées</strong> : une page jugée de faible qualité, dupliquée ou marquée <code>noindex</code> peut être écartée.</p>
<h4>Étape 3 – Le classement et la présentation des résultats</h4>
<p>Lorsqu'un internaute tape une requête, le moteur sélectionne dans son index les pages les plus pertinentes et les ordonne. Google indique s'appuyer sur de nombreux facteurs, dont il ne publie ni la liste exhaustive ni la pondération : le sens de la requête, la pertinence du contenu, sa qualité, l'expérience offerte par la page, le contexte de l'internaute (localisation, langue, appareil). La page de résultats (SERP, <em>Search Engine Results Page</em>) contient aujourd'hui bien plus que dix liens bleus : annonces, pack local avec carte, images, vidéos, blocs « Autres questions posées », extraits optimisés et, selon les pays et les requêtes, des <strong>aperçus générés par IA</strong> (AI Overviews, voir section 5.9).</p>

<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Question à se poser</th><th>Où le vérifier</th></tr>
<tr><td>Exploration</td><td>Les robots peuvent-ils accéder à ma page ?</td><td>Rapport robots.txt et outil d'inspection d'URL de la Search Console ; journaux du serveur pour les sites plus importants.</td></tr>
<tr><td>Indexation</td><td>Ma page est-elle dans l'index ? Sinon, pourquoi ?</td><td>Rapport « Pages » (indexation) et inspection d'URL de la Search Console.</td></tr>
<tr><td>Classement</td><td>Sur quelles requêtes ma page apparaît-elle, à quelle position, avec quel taux de clic ?</td><td>Rapport « Performances » de la Search Console, outils de suivi de positions.</td></tr>
</table>

<h3>3. Les principes de qualité mis en avant par Google</h3>
<h4>Le contenu utile, fiable et centré sur l'utilisateur</h4>
<p>Google publie des recommandations intitulées en substance « créer du contenu utile, fiable et axé sur l'utilisateur ». L'idée centrale : les systèmes de classement cherchent à valoriser les contenus créés <strong>d'abord pour aider les personnes</strong>, et non pour manipuler le classement. Depuis la mise à jour principale de mars 2024, Google a indiqué que l'évaluation du caractère utile des contenus était intégrée à ses systèmes de classement principaux, et non plus à un système séparé.</p>
<p>Google propose des questions d'auto-évaluation, que l'on peut reformuler ainsi pour une TPE :</p>
<ul>
<li>Le contenu apporte-t-il une information, une analyse ou une expérience <strong>originale</strong>, que l'on ne trouve pas simplement en recopiant d'autres sites ?</li>
<li>Un visiteur qui arrive sur la page repart-il en ayant obtenu ce qu'il cherchait ?</li>
<li>Le contenu montre-t-il une expertise réelle ou une expérience de première main (avoir fait, avoir utilisé, avoir vécu) ?</li>
<li>Le contenu a-t-il été produit en masse dans le seul but d'attirer des visites sur de nombreuses requêtes ? (Si oui, c'est un signal négatif.)</li>
<li>Qui a créé le contenu, comment et pourquoi ? Ces informations sont-elles claires pour le lecteur ?</li>
</ul>
<h4>La notion d'E-E-A-T</h4>
<p><strong>E-E-A-T</strong> signifie <em>Experience, Expertise, Authoritativeness, Trustworthiness</em> : expérience, expertise, autorité et fiabilité. Le premier « E » (expérience) a été ajouté en décembre 2022. La notion figure dans les <strong>consignes destinées aux évaluateurs de la qualité</strong> (<em>Search Quality Rater Guidelines</em>) : des évaluateurs humains notent des résultats pour aider Google à mesurer la qualité de ses algorithmes. Leurs notes ne modifient pas directement le classement d'un site.</p>
<blockquote><strong>Point de vigilance :</strong> E-E-A-T n'est pas un « score » ni un facteur de classement unique que l'on pourrait mesurer. C'est un cadre de lecture de la qualité. Google précise que la <strong>fiabilité</strong> (<em>Trust</em>) est la dimension la plus importante, et que les exigences sont plus élevées pour les sujets pouvant affecter la santé, la sécurité financière ou le bien-être des personnes (sujets dits YMYL, <em>Your Money or Your Life</em>).</blockquote>
<p>Traduction concrète pour une TPE :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Dimension</th><th>Signaux concrets que l'on peut donner</th><th>Exemple Maison Lenoir</th></tr>
<tr><td>Expérience</td><td>Photos et récits de première main, démonstration du savoir-faire.</td><td>Article montrant les étapes du levain maison, photos réelles du fournil (pas de banque d'images).</td></tr>
<tr><td>Expertise</td><td>Contenu signé, qualifications mentionnées, précision technique.</td><td>Page « Notre équipe » présentant le parcours des boulangers et pâtissiers.</td></tr>
<tr><td>Autorité</td><td>Mentions et liens depuis des sources reconnues du domaine ou du territoire.</td><td>Article de la presse locale, partenariat cité par un producteur régional.</td></tr>
<tr><td>Fiabilité</td><td>Mentions légales complètes, coordonnées exactes, CGV, prix clairs, HTTPS, avis authentiques, informations allergènes.</td><td>Adresse, téléphone et horaires identiques partout ; informations sur les allergènes à jour sur les fiches produits.</td></tr>
</table>

<h3>4. Les grandes familles de leviers SEO</h3>
<p>On présente classiquement le SEO en trois piliers, auxquels s'ajoute aujourd'hui la dimension locale pour les commerces de proximité :</p>
<ol>
<li><strong>La technique</strong> : permettre aux robots d'explorer et d'indexer le site, offrir une bonne expérience (vitesse, mobile, sécurité). Sections 5.3 et 5.4.</li>
<li><strong>Le contenu</strong> : répondre aux recherches des internautes avec des pages pertinentes, bien structurées et bien reliées entre elles. Sections 5.2 et 5.5.</li>
<li><strong>La popularité</strong> : obtenir des liens et des mentions depuis d'autres sites (netlinking). Section 5.7.</li>
<li><strong>Le local</strong> : fiche Google Business Profile, cohérence des coordonnées, avis clients. Section 5.6.</li>
</ol>
<p>Un plan SEO efficace pour une TPE traite ces piliers <strong>dans l'ordre</strong> : inutile d'acheter des liens ou de publier des articles si le site n'est pas indexable, et inutile d'optimiser la technique si les pages ne répondent à aucune recherche réelle.</p>

<h3>5. Présentation de l'entreprise fil rouge : Maison Lenoir</h3>
<p>Tout au long de ce chapitre, nous appliquons la méthode à une entreprise fictive mais réaliste :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Description</th></tr>
<tr><td>Activité</td><td>Boulangerie-pâtisserie artisanale à Nantes, levain naturel, farines de meuniers régionaux, pâtisseries de saison.</td></tr>
<tr><td>Équipe</td><td>6 salariés : la dirigeante (gestion, commercial), 2 boulangers, 1 pâtissier, 2 vendeuses dont une chargée des réseaux sociaux quelques heures par semaine.</td></tr>
<tr><td>Site actuel</td><td>Site vitrine réalisé avec un CMS courant, module de <strong>click &amp; collect</strong> (commande en ligne, retrait en boutique), page « Traiteur entreprises » peu détaillée.</td></tr>
<tr><td>Offre B2B</td><td>Plateaux petit-déjeuner, buffets salés et sucrés, viennoiseries pour réunions et séminaires d'entreprises nantaises.</td></tr>
<tr><td>Objectifs de développement</td><td>Augmenter les commandes click &amp; collect (gâteaux d'anniversaire, galettes en janvier, bûches en décembre) et développer le chiffre d'affaires traiteur B2B.</td></tr>
<tr><td>Chiffres clés (données fictives de l'exemple)</td><td>Chiffre d'affaires de 780 k€ HT, dont 31 k€ HT pour le traiteur ; note Google de 4,6 sur environ 210 avis ; environ 1 900 abonnés sur Instagram.</td></tr>
<tr><td>Objectifs du projet webmarketing (rappel des chapitres précédents)</td><td>25 demandes de devis B2B par mois dès le 4e mois ; 120 commandes en ligne par mois au 6e mois ; 300 avis Google à 12 mois ; budget webmarketing de l'année 1 : 19 200 € HT, tous leviers confondus.</td></tr>
<tr><td>Situation SEO de départ (constat d'exemple)</td><td>Le site apparaît sur le nom de la boutique mais très peu sur les requêtes génériques ; la fiche Google Business Profile existe mais est incomplète ; les pages produits ont des titres génériques (« Produit 12 ») ; aucune page ne cible « traiteur entreprise Nantes ».</td></tr>
</table>
<p>La question que se pose la dirigeante est celle de tout dirigeant de TPE : <em>« Par quoi commencer, avec peu de temps et un budget limité, pour que le site m'apporte réellement des clients ? »</em> Ce chapitre y répond étape par étape, jusqu'au plan d'action du cas pratique final.</p>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Confondre « être indexé » et « être bien positionné » : une page peut être dans l'index sans jamais apparaître en première page.</li>
<li>Se juger sur sa propre recherche Google : les résultats sont personnalisés (localisation, historique). Il faut s'appuyer sur la Search Console ou un outil de suivi neutre.</li>
<li>Viser uniquement des mots-clés très génériques (« boulangerie ») au lieu de requêtes précises et locales.</li>
<li>Croire qu'un site est « référencé » une fois pour toutes : le SEO demande un entretien régulier.</li>
</ul>
<blockquote><strong>À retenir :</strong> le SEO vise la visibilité dans les résultats non payants. Un moteur explore, indexe puis classe les pages. Google valorise les contenus utiles, fiables et créés pour les personnes ; E-E-A-T est un cadre de lecture de la qualité, pas un score. Pour une TPE, on traite d'abord l'indexabilité, puis la pertinence du contenu, puis la popularité, sans oublier le local.</blockquote>
`,
      },
      {
        title: "5.2 – L'audit sémantique",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Identifier les requêtes réellement tapées par les clients cibles.</li>
<li>Qualifier chaque mot-clé par son intention de recherche, son potentiel et sa difficulté.</li>
<li>Utiliser les outils gratuits et payants de recherche de mots-clés en connaissant leurs limites.</li>
<li>Construire une matrice « mot-clé → page cible » sans cannibalisation.</li>
</ul>

<h3>1. Définition et finalité</h3>
<p>L'<strong>audit sémantique</strong> consiste à recenser le vocabulaire utilisé par les internautes pour rechercher les produits, services ou informations liés à l'activité, puis à vérifier si le site possède une page pertinente pour chaque groupe de requêtes. Il répond à trois questions :</p>
<ol>
<li><strong>Que cherchent nos clients ?</strong> (requêtes, formulations, questions)</li>
<li><strong>Dans quel but ?</strong> (intention de recherche)</li>
<li><strong>Quelle page de notre site doit y répondre ?</strong> (page existante à optimiser, page à créer, ou requête à abandonner)</li>
</ol>
<p>C'est la fondation de toute la stratégie éditoriale : sans audit sémantique, on rédige au hasard.</p>

<h3>2. L'intention de recherche</h3>
<p>Une même thématique peut cacher des besoins très différents. On distingue généralement quatre grandes intentions :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Intention</th><th>Ce que veut l'internaute</th><th>Exemple de requête</th><th>Type de page adaptée</th></tr>
<tr><td>Informationnelle</td><td>Apprendre, comprendre</td><td>« différence pain au levain et pain à la levure »</td><td>Article de blog, guide, FAQ</td></tr>
<tr><td>Navigationnelle</td><td>Accéder à un site ou une marque précise</td><td>« maison lenoir nantes horaires »</td><td>Page d'accueil, page contact, fiche Google Business Profile</td></tr>
<tr><td>Commerciale (comparaison)</td><td>Comparer avant de choisir</td><td>« meilleure galette des rois nantes », « traiteur petit déjeuner entreprise avis »</td><td>Page de catégorie détaillée, page offre avec références et avis</td></tr>
<tr><td>Transactionnelle</td><td>Acheter, commander, réserver</td><td>« commander gâteau anniversaire nantes »</td><td>Fiche produit click &amp; collect, page de commande, formulaire de devis</td></tr>
</table>
<p><strong>Méthode pratique pour identifier l'intention :</strong> tapez la requête dans Google (en navigation privée) et observez la première page. Si elle est remplie de fiches produits, l'intention est transactionnelle ; si ce sont des articles, elle est informationnelle ; si un pack local avec carte apparaît, la requête a une dimension locale. <strong>La SERP vous dit quel type de page Google juge adapté</strong> : il est rarement efficace d'aller à contre-courant (par exemple, positionner une fiche produit sur une requête où Google ne montre que des guides).</p>

<h3>3. Longue traîne et tête de traîne</h3>
<p>On distingue :</p>
<ul>
<li>les requêtes de <strong>tête de traîne</strong> : courtes, génériques, très recherchées et très concurrentielles (« boulangerie », « traiteur ») ;</li>
<li>les requêtes de <strong>longue traîne</strong> : plus longues, plus précises, recherchées individuellement moins souvent mais nombreuses, avec une intention plus claire (« plateau petit déjeuner livraison entreprise nantes », « gâteau sans gluten sur commande nantes »).</li>
</ul>
<p>Pour une TPE, la longue traîne est souvent la meilleure porte d'entrée : la concurrence y est moindre, l'intention est plus précise, et l'internaute est souvent plus proche de l'achat. L'objectif n'est pas de créer une page par variante (ce serait du contenu de masse sans valeur), mais de construire des pages complètes qui couvrent un <strong>groupe de requêtes proches</strong>.</p>

<h3>4. Les outils de recherche de mots-clés</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Outil</th><th>Accès</th><th>Ce qu'il apporte</th><th>Limites à connaître</th></tr>
<tr><td><strong>Google Keyword Planner</strong> (Planificateur de mots-clés)</td><td>Gratuit, nécessite un compte Google Ads</td><td>Idées de mots-clés, estimations de volumes mensuels, niveau de concurrence publicitaire, ciblage par zone géographique.</td><td>Conçu pour la publicité ; sans campagne active, les volumes sont souvent affichés par tranches larges ; la « concurrence » concerne les annonceurs, pas le SEO.</td></tr>
<tr><td><strong>Google Search Console</strong></td><td>Gratuit, après validation de la propriété du site</td><td>Les requêtes <strong>réelles</strong> sur lesquelles le site est déjà apparu, avec impressions, clics, CTR et position moyenne.</td><td>Ne montre que les requêtes où le site apparaît déjà ; certaines requêtes rares sont masquées pour des raisons de confidentialité.</td></tr>
<tr><td><strong>Ubersuggest</strong></td><td>Version gratuite limitée, offres payantes</td><td>Idées de mots-clés, volumes estimés, difficulté estimée, mots-clés des concurrents.</td><td>Données estimées par l'éditeur ; quota de recherches limité en gratuit.</td></tr>
<tr><td><strong>Semrush</strong></td><td>Payant (essai et accès gratuit limité)</td><td>Bases de mots-clés par pays, difficulté, analyse des concurrents, suivi de positions, audit technique.</td><td>Coût significatif pour une TPE ; volumes estimés, surtout fragiles sur des requêtes locales à faible volume.</td></tr>
<tr><td><strong>AnswerThePublic</strong></td><td>Gratuit limité, offres payantes</td><td>Les <strong>questions</strong> et formulations associées à un thème (comment, pourquoi, quel, avec, sans…), issues des suggestions de recherche.</td><td>Peu d'indications de volume en gratuit ; à utiliser pour trouver des angles éditoriaux.</td></tr>
<tr><td>Saisie semi-automatique de Google, bloc « Autres questions posées », « Recherches associées »</td><td>Gratuit</td><td>Formulations réelles et questions fréquentes, directement dans la SERP.</td><td>Pas de volume ; résultats influencés par la localisation.</td></tr>
<tr><td>Google Trends</td><td>Gratuit</td><td>Saisonnalité et évolution relative de l'intérêt pour un terme.</td><td>Indices relatifs (0 à 100), pas de volumes absolus.</td></tr>
</table>
<blockquote><strong>Règle d'or :</strong> tous les volumes de recherche affichés par les outils sont des <strong>estimations</strong>. Ils servent à comparer des requêtes entre elles et à prioriser, pas à prévoir un chiffre d'affaires. Sur des requêtes locales (une ville, un quartier), les volumes sont faibles et les écarts entre outils peuvent être importants.</blockquote>

<h3>5. Méthode pas à pas de l'audit sémantique</h3>
<ol>
<li><strong>Lister les produits, services et cibles</strong> : partez de l'offre (pains, viennoiseries, pâtisseries, gâteaux sur commande, traiteur entreprises) et des clients (particuliers du quartier, familles pour les anniversaires, assistantes de direction et office managers pour le B2B).</li>
<li><strong>Interroger le terrain</strong> : demandez à l'équipe de vente les questions que posent les clients au comptoir et au téléphone (« faites-vous des gâteaux sans lactose ? », « livrez-vous les entreprises ? »). Ce sont des requêtes potentielles.</li>
<li><strong>Récolter les requêtes existantes</strong> dans la Search Console (rapport Performances, onglet Requêtes, sur 16 mois si l'historique existe).</li>
<li><strong>Élargir</strong> avec le Planificateur de mots-clés, Ubersuggest ou Semrush, la saisie semi-automatique et AnswerThePublic.</li>
<li><strong>Observer les concurrents</strong> : quelles pages positionnent-ils sur vos requêtes cibles ? Quel type de contenu, quelle profondeur ?</li>
<li><strong>Nettoyer et regrouper</strong> les requêtes par thème (cluster) : une page cible par groupe d'intention identique.</li>
<li><strong>Qualifier</strong> chaque groupe : intention, volume estimé, saisonnalité, difficulté, valeur business (est-ce que cette requête peut amener une commande ?).</li>
<li><strong>Affecter une page cible</strong> : page existante à optimiser, page à créer, ou requête écartée.</li>
<li><strong>Prioriser</strong> : valeur business élevée + difficulté accessible + page existante = action rapide.</li>
</ol>

<h3>6. Exemple : matrice d'audit sémantique de Maison Lenoir</h3>
<p><em>Les volumes ci-dessous sont des estimations d'exemple à visée pédagogique, ordres de grandeur fictifs. Dans un vrai projet, ils sont relevés dans les outils à la date de l'audit, avec mention de la source.</em></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Groupe de requêtes</th><th>Requête principale</th><th>Variantes / longue traîne</th><th>Intention</th><th>Volume mensuel (estimation d'exemple)</th><th>Saisonnalité</th><th>Page cible</th><th>Action</th></tr>
<tr><td>Boulangerie locale</td><td>boulangerie artisanale nantes</td><td>boulangerie levain nantes, boulangerie [quartier] nantes</td><td>Navigationnelle / locale</td><td>Quelques centaines</td><td>Stable</td><td>Accueil + fiche Google Business Profile</td><td>Optimiser</td></tr>
<tr><td>Gâteaux sur commande</td><td>gâteau anniversaire sur commande nantes</td><td>commander gâteau anniversaire nantes, gâteau personnalisé nantes</td><td>Transactionnelle</td><td>Une à quelques centaines</td><td>Stable</td><td>Catégorie click &amp; collect « Gâteaux d'anniversaire »</td><td>Optimiser (renommer, enrichir)</td></tr>
<tr><td>Galette des rois</td><td>galette des rois nantes</td><td>commander galette des rois nantes, galette frangipane artisanale</td><td>Transactionnelle</td><td>Pic fort en janvier</td><td>Très saisonnière</td><td>Page saisonnière permanente « Galette des rois »</td><td>Créer, réactiver chaque année à la même URL</td></tr>
<tr><td>Bûches de Noël</td><td>bûche de noël artisanale nantes</td><td>commander bûche nantes, bûche pâtissière</td><td>Transactionnelle</td><td>Pic en décembre</td><td>Très saisonnière</td><td>Page saisonnière « Bûches de Noël »</td><td>Créer</td></tr>
<tr><td>Traiteur B2B</td><td>traiteur entreprise nantes</td><td>plateau petit déjeuner entreprise nantes, buffet séminaire nantes, viennoiseries réunion livraison</td><td>Commerciale / transactionnelle</td><td>Quelques dizaines à centaines</td><td>Rentrée et fin d'année plus fortes</td><td>Page « Traiteur entreprises » + sous-pages par formule</td><td>Refondre et créer</td></tr>
<tr><td>Sans gluten / allergènes</td><td>gâteau sans gluten nantes</td><td>pâtisserie sans lactose nantes</td><td>Transactionnelle</td><td>Quelques dizaines</td><td>Stable</td><td>Page dédiée seulement si l'offre existe vraiment et que les engagements de fabrication sont tenus</td><td>À valider avec la production</td></tr>
<tr><td>Pain au levain (information)</td><td>pain au levain bienfaits</td><td>différence levain levure, comment conserver pain au levain</td><td>Informationnelle</td><td>Plusieurs milliers (national)</td><td>Stable</td><td>Article de conseil « Bien conserver son pain au levain »</td><td>Créer (notoriété, E-E-A-T), lien vers la boutique</td></tr>
<tr><td>Recette maison</td><td>recette pain maison facile</td><td>—</td><td>Informationnelle</td><td>Très élevé (national)</td><td>Stable</td><td>Aucune</td><td>Écarter : concurrence de grands sites de recettes, faible lien avec l'achat local</td></tr>
</table>
<p>Lecture de la matrice : les priorités de Maison Lenoir sont les groupes à forte valeur business (gâteaux sur commande, saisonniers, traiteur B2B) ; l'article sur le levain sert la notoriété et la crédibilité ; la requête « recette pain maison » est abandonnée malgré son volume, car elle ne correspond ni à la cible locale ni à un acte d'achat.</p>

<h3>7. Éviter la cannibalisation</h3>
<p>On parle de <strong>cannibalisation</strong> lorsque plusieurs pages d'un même site visent la même intention : elles se concurrencent, et le moteur peut alterner entre elles ou n'en retenir aucune de façon stable. Signe typique dans la Search Console : pour une même requête, plusieurs URL du site apparaissent alternativement. Remède : <strong>une intention = une page de référence</strong> ; fusionner les pages redondantes (avec redirection 301 de l'ancienne vers la nouvelle) ou différencier clairement leurs angles.</p>

<h3>Check-list de l'audit sémantique</h3>
<ul>
<li>Liste de l'offre et des cibles établie avec l'équipe.</li>
<li>Requêtes de la Search Console exportées et analysées.</li>
<li>Requêtes complémentaires trouvées avec au moins deux outils, sources et dates notées.</li>
<li>SERP observée pour chaque requête principale (type de pages, présence d'un pack local).</li>
<li>Requêtes regroupées par intention ; une page cible unique par groupe.</li>
<li>Priorisation justifiée (valeur business, difficulté, effort).</li>
</ul>
<h3>Erreurs fréquentes</h3>
<ul>
<li>Choisir les mots-clés uniquement sur le volume, sans regarder l'intention ni la valeur business.</li>
<li>Présenter les volumes d'un outil comme des chiffres exacts dans un rapport.</li>
<li>Oublier la saisonnalité (une page « galette » créée fin janvier arrive trop tard).</li>
<li>Créer une page par variante de mot-clé (« boulangerie nantes centre », « boulangerie centre nantes »…) : contenu dupliqué et sans valeur.</li>
</ul>
<blockquote><strong>À retenir :</strong> l'audit sémantique relie les recherches réelles des clients aux pages du site. Chaque groupe de requêtes est qualifié par son intention, sa saisonnalité, une estimation de volume et sa valeur business, puis affecté à une page cible unique. Les volumes des outils sont des estimations : on les cite avec leur source et leur date.</blockquote>
`,
      },
      {
        title: "5.3 – Les facteurs clés de l'optimisation technique",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Vérifier que le site est explorable, indexable et sécurisé.</li>
<li>Comprendre et mesurer les Core Web Vitals (LCP, INP, CLS).</li>
<li>Maîtriser les fondamentaux : mobile-first, HTTPS, URL, robots.txt, balise canonique, redirections, données structurées.</li>
<li>Savoir dialoguer avec un prestataire technique ou un éditeur de CMS.</li>
</ul>

<h3>1. L'indexation mobile-first</h3>
<p>Google explore et indexe les sites principalement avec un robot qui simule un smartphone (<strong>Googlebot pour smartphone</strong>) : c'est l'<strong>indexation mobile-first</strong>. Conséquence directe : <strong>c'est la version mobile de votre site qui compte</strong>. Si un contenu, un lien ou une donnée structurée n'existe que sur la version ordinateur, il risque de ne pas être pris en compte.</p>
<p>À vérifier :</p>
<ul>
<li>Le site est <strong>responsive</strong> (une seule URL, mise en page adaptée à l'écran) : c'est la configuration recommandée par Google.</li>
<li>Le contenu principal, les titres, les liens internes et les données structurées sont identiques sur mobile et sur ordinateur.</li>
<li>Les boutons sont assez grands pour être touchés au doigt, le texte est lisible sans zoom, aucune fenêtre surgissante n'empêche d'accéder au contenu.</li>
</ul>
<p>Pour Maison Lenoir, c'est essentiel : une grande partie des recherches « boulangerie près de moi » se font sur smartphone, souvent dans la rue.</p>

<h3>2. Les Core Web Vitals</h3>
<p>Les <strong>Core Web Vitals</strong> (signaux web essentiels) sont trois indicateurs définis par Google pour mesurer l'expérience réelle des utilisateurs. Ils font partie des signaux d'« expérience sur la page » pris en compte par les systèmes de classement. Google précise toutefois qu'une bonne expérience ne compense pas un contenu peu pertinent : à pertinence comparable, elle peut faire la différence.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Ce qu'il mesure</th><th>Seuil « Bon »</th><th>Seuil « Mauvais »</th><th>Causes fréquentes de mauvais résultat</th></tr>
<tr><td><strong>LCP</strong> – <em>Largest Contentful Paint</em></td><td>Temps d'affichage du plus grand élément visible (souvent l'image principale ou le gros titre) : la vitesse de chargement perçue.</td><td>≤ 2,5 s</td><td>&gt; 4 s</td><td>Image d'en-tête trop lourde, serveur lent, polices et scripts bloquants.</td></tr>
<tr><td><strong>INP</strong> – <em>Interaction to Next Paint</em></td><td>Réactivité : délai entre une interaction (clic, toucher, frappe) et la mise à jour visible de la page, sur l'ensemble des interactions de la visite.</td><td>≤ 200 ms</td><td>&gt; 500 ms</td><td>JavaScript trop lourd, nombreux scripts tiers (chat, pixels publicitaires, widgets).</td></tr>
<tr><td><strong>CLS</strong> – <em>Cumulative Layout Shift</em></td><td>Stabilité visuelle : décalages inattendus de la mise en page pendant le chargement.</td><td>≤ 0,1</td><td>&gt; 0,25</td><td>Images sans dimensions déclarées, bandeaux insérés en haut de page, polices qui changent la taille du texte.</td></tr>
</table>
<p><strong>Évolution importante :</strong> l'INP a remplacé le FID (<em>First Input Delay</em>) comme Core Web Vital le <strong>12 mars 2024</strong>. Le FID ne mesurait que le délai de la première interaction ; l'INP évalue la réactivité sur toute la visite. Un support ou un prestataire qui parle encore du FID n'est pas à jour.</p>
<p>Les seuils s'appliquent au <strong>75e centile</strong> des visites : une page est jugée « bonne » si au moins 75 % des chargements atteignent le seuil.</p>
<h4>Données de terrain et données de laboratoire</h4>
<ul>
<li><strong>Données de terrain</strong> : mesurées chez de vrais visiteurs (rapport sur l'expérience utilisateur de Chrome, dit CrUX). Ce sont celles qu'utilise Google. Elles apparaissent dans PageSpeed Insights et dans le rapport « Signaux web essentiels » de la Search Console, à condition que le site ait assez de trafic.</li>
<li><strong>Données de laboratoire</strong> : simulées par un outil (Lighthouse, intégré à Chrome et à PageSpeed Insights). Utiles pour diagnostiquer et tester une correction, mais elles ne reflètent pas toujours l'expérience réelle. Lighthouse ne mesure pas l'INP directement (il n'y a pas d'utilisateur qui interagit) ; il fournit des indicateurs voisins comme le <em>Total Blocking Time</em>.</li>
</ul>
<h4>Leviers d'amélioration accessibles à une TPE</h4>
<ol>
<li><strong>Images</strong> : redimensionner à la taille d'affichage, compresser, utiliser des formats modernes (WebP, AVIF) si le CMS le permet, déclarer largeur et hauteur ; activer le chargement différé (<em>lazy loading</em>) pour les images situées plus bas dans la page, <strong>mais jamais pour l'image principale</strong> du haut de page, qui est souvent l'élément LCP.</li>
<li><strong>Hébergement</strong> : un hébergement d'entrée de gamme surchargé ralentit tout ; activer le cache et, si besoin, un réseau de diffusion de contenu (CDN).</li>
<li><strong>Scripts tiers</strong> : faire l'inventaire (widgets, pixels, chat, carrousels) et supprimer ce qui ne sert pas.</li>
<li><strong>Extensions et thème du CMS</strong> : chaque extension ajoute du code ; un thème léger vaut mieux qu'un thème « tout-en-un ».</li>
<li><strong>Bandeau de consentement aux cookies</strong> : le choisir pour qu'il ne décale pas la page (CLS) et ne bloque pas l'affichage.</li>
</ol>

<h3>3. La sécurité : HTTPS</h3>
<p>Le protocole <strong>HTTPS</strong> chiffre les échanges entre le navigateur et le serveur. Google l'a annoncé comme signal de classement (léger) dès 2014, et les navigateurs signalent les pages non sécurisées. Pour un site qui prend des commandes en click &amp; collect, c'est une exigence de base de confiance. Points de contrôle :</p>
<ul>
<li>certificat valide et renouvelé automatiquement (beaucoup d'hébergeurs proposent des certificats gratuits) ;</li>
<li>toutes les URL en <code>http://</code> redirigées en 301 vers leur équivalent <code>https://</code> ;</li>
<li>pas de « contenu mixte » (images ou scripts encore appelés en http) ;</li>
<li>une seule version de référence du domaine (avec ou sans « www »), l'autre étant redirigée.</li>
</ul>

<h3>4. Les URL et l'architecture du site</h3>
<p>Une bonne URL est <strong>lisible, courte, descriptive et stable</strong>. Google recommande une structure d'URL simple, avec des mots compréhensibles et des tirets pour séparer les mots.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>À éviter</th><th>Préférable</th></tr>
<tr><td>maisonlenoir.fr/index.php?id_product=12&amp;cat=4</td><td>maisonlenoir.fr/commander/gateaux-anniversaire/</td></tr>
<tr><td>maisonlenoir.fr/page-3/</td><td>maisonlenoir.fr/traiteur-entreprises/plateaux-petit-dejeuner/</td></tr>
<tr><td>maisonlenoir.fr/galette-2026/ (change chaque année)</td><td>maisonlenoir.fr/galette-des-rois/ (même URL réactivée chaque année, conserve son historique)</td></tr>
</table>
<p>L'architecture doit permettre d'atteindre toute page importante en <strong>peu de clics depuis l'accueil</strong> et refléter la logique de l'offre. Proposition pour Maison Lenoir :</p>
<ul>
<li>Accueil
<ul>
<li>La boulangerie (savoir-faire, équipe, farines et producteurs)</li>
<li>Commander en click &amp; collect
<ul><li>Pains spéciaux</li><li>Gâteaux d'anniversaire</li><li>Pâtisseries</li><li>Saisonniers : galette des rois, bûches de Noël (pages permanentes)</li></ul></li>
<li>Traiteur entreprises
<ul><li>Plateaux petit-déjeuner</li><li>Buffets et cocktails</li><li>Demande de devis</li></ul></li>
<li>Conseils (articles)</li>
<li>Infos pratiques et contact (adresse, horaires, accès, allergènes)</li>
</ul></li>
</ul>

<h3>5. Le fichier robots.txt</h3>
<p>Le fichier <code>robots.txt</code>, placé à la racine du domaine (<code>https://www.maisonlenoir.fr/robots.txt</code>), indique aux robots les zones qu'ils <strong>ne doivent pas explorer</strong>. Exemple adapté à un site avec panier :</p>
<blockquote><code>User-agent: *</code><br><code>Disallow: /panier/</code><br><code>Disallow: /mon-compte/</code><br><code>Sitemap: https://www.maisonlenoir.fr/sitemap.xml</code></blockquote>
<p><strong>Confusion à ne pas faire :</strong> <code>robots.txt</code> bloque l'<em>exploration</em>, pas l'<em>indexation</em>. Une URL bloquée peut tout de même apparaître dans les résultats (sans description) si d'autres pages pointent vers elle. Pour empêcher l'indexation d'une page, il faut la laisser explorable et y placer une balise <code>&lt;meta name="robots" content="noindex"&gt;</code> (ou l'en-tête HTTP équivalent). Si la page est bloquée par robots.txt, le robot ne verra jamais la balise noindex.</p>
<p>Erreur catastrophique classique : un site mis en ligne avec la consigne <code>Disallow: /</code> héritée de la phase de développement, ou la case « Demander aux moteurs de recherche de ne pas indexer ce site » restée cochée dans le CMS. À vérifier à chaque mise en ligne ou refonte.</p>

<h3>6. Le sitemap XML</h3>
<p>Le <strong>plan de site XML</strong> liste les URL que l'on souhaite voir explorées et indexées. La plupart des CMS le génèrent automatiquement. Bonnes pratiques :</p>
<ul>
<li>n'y inclure que des URL <strong>canoniques, indexables, en réponse 200</strong> (pas de pages redirigées, en erreur ou en noindex) ;</li>
<li>renseigner la date de dernière modification (<code>lastmod</code>) seulement si elle est exacte : Google indique l'utiliser lorsqu'elle est fiable, et ignorer les champs <code>priority</code> et <code>changefreq</code> ;</li>
<li>respecter les limites du protocole : 50 000 URL et 50 Mo (non compressé) par fichier, au-delà on utilise un index de sitemaps ;</li>
<li>le déclarer dans <code>robots.txt</code> et le soumettre dans la Search Console et dans Bing Webmaster Tools (section 5.4).</li>
</ul>

<h3>7. Les contenus dupliqués et la balise canonique</h3>
<p>Un même contenu peut être accessible par plusieurs URL : avec et sans paramètres de tri, avec et sans barre oblique finale, version imprimable, produit présent dans deux catégories… La balise <code>&lt;link rel="canonical" href="…"&gt;</code> indique l'URL de référence que l'on souhaite voir indexée. Points clés :</p>
<ul>
<li>la canonique est une <strong>indication forte, pas un ordre</strong> : Google peut choisir une autre URL canonique si les signaux sont contradictoires (liens internes, sitemap, redirections) ;</li>
<li>chaque page indexable peut porter une canonique vers elle-même (auto-référente) ;</li>
<li>le contenu dupliqué interne n'entraîne pas de « pénalité » en soi, mais il dilue les signaux et gaspille l'exploration ;</li>
<li>dans la Search Console, l'inspection d'URL indique la « canonique déclarée par l'utilisateur » et la « canonique sélectionnée par Google » : un écart est un signal à analyser.</li>
</ul>

<h3>8. Les codes de réponse et les redirections</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Code</th><th>Signification</th><th>Usage SEO</th></tr>
<tr><td>200</td><td>Page trouvée</td><td>État normal d'une page indexable.</td></tr>
<tr><td>301 (ou 308)</td><td>Redirection permanente</td><td>Page déplacée définitivement : transmet les signaux vers la nouvelle URL. À utiliser lors d'une refonte, d'un changement d'URL, d'un passage en HTTPS.</td></tr>
<tr><td>302 (ou 307)</td><td>Redirection temporaire</td><td>Indisponibilité passagère ; l'ancienne URL reste la référence. À ne pas utiliser pour un déménagement définitif.</td></tr>
<tr><td>404</td><td>Page introuvable</td><td>Normal pour une page qui n'a jamais existé ; à corriger si des liens internes ou externes y mènent.</td></tr>
<tr><td>410</td><td>Page supprimée définitivement</td><td>Signale clairement une suppression volontaire.</td></tr>
<tr><td>5xx</td><td>Erreur serveur</td><td>À traiter en priorité : des erreurs répétées freinent l'exploration.</td></tr>
</table>
<p><strong>Méthode de refonte sans perte de trafic :</strong> (1) exporter toutes les URL existantes (sitemap, Search Console, outil d'exploration) ; (2) construire un tableau de correspondance ancienne URL → nouvelle URL la plus proche en contenu ; (3) mettre en place des redirections 301 <strong>directes</strong> (pas de chaînes A → B → C) ; (4) mettre à jour les liens internes pour qu'ils pointent directement vers les nouvelles URL ; (5) soumettre le nouveau sitemap ; (6) surveiller le rapport d'indexation et les erreurs 404 pendant plusieurs semaines. Rediriger toutes les anciennes pages vers l'accueil est une mauvaise pratique : Google peut les traiter comme des erreurs 404 « soft ».</p>

<h3>9. Les données structurées schema.org</h3>
<p>Les <strong>données structurées</strong> décrivent le contenu d'une page dans un vocabulaire standardisé (<strong>schema.org</strong>), compréhensible par les machines. Google recommande le format <strong>JSON-LD</strong>. Elles peuvent rendre une page éligible à des <strong>résultats enrichis</strong> (prix et disponibilité d'un produit, fil d'Ariane, etc.), sans aucune garantie d'affichage.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type schema.org</th><th>Page concernée chez Maison Lenoir</th><th>Informations décrites</th></tr>
<tr><td><code>Bakery</code> (sous-type de <code>LocalBusiness</code>)</td><td>Accueil ou page contact</td><td>Nom, adresse, téléphone, horaires, coordonnées géographiques, URL, image.</td></tr>
<tr><td><code>Product</code> avec <code>Offer</code></td><td>Fiches produits click &amp; collect</td><td>Nom, description, image, prix, devise, disponibilité.</td></tr>
<tr><td><code>BreadcrumbList</code></td><td>Toutes les pages profondes</td><td>Fil d'Ariane (Accueil &gt; Commander &gt; Gâteaux d'anniversaire).</td></tr>
<tr><td><code>Organization</code></td><td>Accueil</td><td>Nom, logo, coordonnées, profils sociaux officiels.</td></tr>
<tr><td><code>Article</code></td><td>Articles de conseils</td><td>Titre, auteur, date de publication et de mise à jour.</td></tr>
</table>
<p>Règles à respecter :</p>
<ul>
<li>les données structurées doivent <strong>décrire le contenu visible</strong> de la page (pas de prix ou d'avis qui n'apparaissent pas à l'écran) ;</li>
<li>les avis qu'une entreprise publie elle-même sur sa propre page à propos d'elle-même (<code>LocalBusiness</code>, <code>Organization</code>) ne donnent pas droit aux étoiles dans les résultats Google ;</li>
<li>Google a réduit l'affichage de certains résultats enrichis : depuis 2023, les résultats enrichis FAQ sont réservés à des sites gouvernementaux et de santé faisant autorité, et ceux de type « HowTo » ne sont plus affichés. Baliser une FAQ reste possible mais ne produira pas d'affichage enrichi pour une boulangerie ;</li>
<li>valider avec le <strong>Test des résultats enrichis</strong> de Google et le validateur de schema.org (<em>Schema Markup Validator</em>), puis suivre les rapports « Améliorations » de la Search Console.</li>
</ul>

<h3>10. Autres points techniques à contrôler</h3>
<ul>
<li><strong>Liens explorables</strong> : utiliser de vrais liens <code>&lt;a href="…"&gt;</code> ; un menu construit uniquement avec des actions JavaScript peut ne pas être suivi.</li>
<li><strong>Contenu rendu en JavaScript</strong> : Google sait exécuter le JavaScript, mais avec un délai et des risques ; vérifier avec l'inspection d'URL (« Afficher la page explorée ») que le contenu important est bien visible.</li>
<li><strong>Pagination et filtres</strong> du catalogue : éviter que les combinaisons de filtres génèrent des milliers d'URL indexables.</li>
<li><strong>Langue</strong> : attribut <code>lang="fr"</code> ; balises <code>hreflang</code> seulement en cas de versions linguistiques.</li>
<li><strong>Accessibilité</strong> : textes alternatifs, contrastes, titres hiérarchisés ; elle sert les utilisateurs et rejoint souvent les bonnes pratiques SEO.</li>
</ul>

<h3>Check-list technique (à faire au moins une fois par an et à chaque refonte)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Point de contrôle</th><th>Outil</th><th>Constat Maison Lenoir (exemple)</th><th>Action</th></tr>
<tr><td>Site responsive et contenu identique mobile/ordinateur</td><td>Test sur smartphone, inspection d'URL</td><td>Conforme</td><td>—</td></tr>
<tr><td>Core Web Vitals</td><td>PageSpeed Insights, rapport Search Console</td><td>LCP lent sur mobile (photo d'accueil très lourde)</td><td>Compresser et redimensionner, retirer le lazy loading de l'image principale</td></tr>
<tr><td>HTTPS et version unique du domaine</td><td>Navigateur, outil d'exploration</td><td>Version sans www accessible sans redirection</td><td>Redirection 301 vers la version www</td></tr>
<tr><td>robots.txt</td><td>Rapport robots.txt de la Search Console</td><td>Conforme, sitemap non déclaré</td><td>Ajouter la ligne Sitemap</td></tr>
<tr><td>Sitemap XML</td><td>Rapport Sitemaps</td><td>Contient des pages de panier</td><td>Exclure panier et compte client</td></tr>
<tr><td>URL lisibles</td><td>Exploration du site</td><td>Fiches produits en ?id=</td><td>Activer les URL « propres » du CMS + redirections 301</td></tr>
<tr><td>Données structurées</td><td>Test des résultats enrichis</td><td>Aucune</td><td>Ajouter Bakery, Product, BreadcrumbList</td></tr>
<tr><td>Erreurs 404 et redirections en chaîne</td><td>Outil d'exploration (ex. Screaming Frog, version gratuite limitée à 500 URL), Search Console</td><td>Anciennes pages « promo » en 404</td><td>Rediriger vers la catégorie la plus proche</td></tr>
</table>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Oublier la consigne de non-indexation après la mise en ligne d'un site.</li>
<li>Utiliser robots.txt pour « désindexer » une page.</li>
<li>Viser un score Lighthouse de 100 au détriment de priorités plus utiles ; c'est l'expérience réelle (données de terrain) qui compte.</li>
<li>Changer les URL lors d'une refonte sans plan de redirection.</li>
<li>Copier un balisage schema.org trouvé en ligne sans l'adapter (horaires faux, adresse d'un autre commerce).</li>
</ul>
<blockquote><strong>À retenir :</strong> la technique conditionne tout le reste. Google indexe la version mobile ; les Core Web Vitals sont le LCP (≤ 2,5 s), l'INP (≤ 200 ms, qui a remplacé le FID le 12 mars 2024) et le CLS (≤ 0,1). HTTPS, URL lisibles, robots.txt maîtrisé (il bloque l'exploration, pas l'indexation), sitemap propre, canoniques cohérentes, redirections 301 directes et données structurées fidèles au contenu visible forment le socle.</blockquote>
`,
      },
      {
        title: "5.4 – La soumission et le suivi de l'indexation d'un site",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Créer et valider une propriété dans Google Search Console et dans Bing Webmaster Tools.</li>
<li>Soumettre un sitemap et demander l'indexation d'une page.</li>
<li>Lire le rapport d'indexation des pages et traiter les principaux statuts.</li>
<li>Utiliser l'outil d'inspection d'URL pour diagnostiquer une page.</li>
</ul>

<h3>1. Google Search Console : mise en place</h3>
<p>La <strong>Google Search Console</strong> est l'outil gratuit de Google qui permet de voir son site « du point de vue de Google » : indexation, requêtes, erreurs, sécurité, actions manuelles. C'est l'outil n° 1 du SEO d'une TPE.</p>
<h4>Étapes de création</h4>
<ol>
<li>Se connecter avec un compte Google <strong>de l'entreprise</strong> (pas le compte personnel d'un prestataire : l'entreprise doit rester propriétaire de ses données ; on ajoute ensuite le prestataire comme utilisateur).</li>
<li>Ajouter une propriété. Deux types existent :
<ul>
<li><strong>Propriété de domaine</strong> (<code>maisonlenoir.fr</code>) : couvre toutes les variantes (http/https, avec ou sans www, sous-domaines). Validation par un enregistrement DNS chez le registraire du nom de domaine. C'est l'option recommandée.</li>
<li><strong>Propriété avec préfixe d'URL</strong> (<code>https://www.maisonlenoir.fr/</code>) : ne couvre que ce préfixe exact. Validation possible par fichier HTML, balise meta, Google Analytics ou Google Tag Manager.</li>
</ul></li>
<li>Valider la propriété (les données commencent à s'accumuler à partir de ce moment ; l'historique antérieur n'est pas récupérable).</li>
<li>Soumettre le sitemap XML (menu « Sitemaps »).</li>
<li>Ajouter les utilisateurs nécessaires avec le bon niveau d'autorisation (propriétaire, utilisateur avec accès total ou restreint).</li>
<li>Associer la Search Console à Google Analytics 4 pour croiser les données (section 5.8).</li>
</ol>

<h3>2. Les principaux rapports de la Search Console</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rapport</th><th>Ce qu'il montre</th><th>Fréquence de consultation conseillée pour une TPE</th></tr>
<tr><td>Performances (résultats de recherche)</td><td>Clics, impressions, taux de clic (CTR) et position moyenne, par requête, page, pays, appareil, apparence dans les résultats et date ; historique de 16 mois.</td><td>Mensuelle (hebdomadaire en période saisonnière).</td></tr>
<tr><td>Inspection de l'URL</td><td>État d'indexation d'une URL précise, canonique retenue, dernière exploration, rendu, données structurées détectées ; test en direct ; demande d'indexation.</td><td>À chaque création ou modification importante de page.</td></tr>
<tr><td>Pages (indexation)</td><td>Nombre de pages indexées et non indexées, avec le motif de non-indexation.</td><td>Mensuelle.</td></tr>
<tr><td>Sitemaps</td><td>Sitemaps soumis, date de lecture, nombre d'URL découvertes.</td><td>Après chaque modification de structure.</td></tr>
<tr><td>Signaux web essentiels</td><td>URL classées « Bonne », « À améliorer », « Mauvaise » pour LCP, INP, CLS (données de terrain), mobile et ordinateur.</td><td>Trimestrielle, et après une modification technique.</td></tr>
<tr><td>HTTPS</td><td>Pages servies ou non en HTTPS.</td><td>Trimestrielle.</td></tr>
<tr><td>Améliorations (selon le balisage détecté)</td><td>Validité des données structurées : fils d'Ariane, extraits de produits, etc.</td><td>Après ajout ou modification de balisage.</td></tr>
<tr><td>Liens</td><td>Principaux sites qui font des liens vers le vôtre, pages les plus liées, textes d'ancrage, liens internes.</td><td>Trimestrielle.</td></tr>
<tr><td>Sécurité et actions manuelles</td><td>Problèmes de sécurité (piratage, logiciels malveillants) et sanctions manuelles appliquées par l'équipe de Google.</td><td>Dès réception d'une alerte e-mail, sinon trimestrielle.</td></tr>
<tr><td>Paramètres &gt; Statistiques sur l'exploration</td><td>Volume d'exploration, temps de réponse du serveur, codes de réponse.</td><td>En cas de problème de performance ou d'indexation.</td></tr>
</table>

<h3>3. L'outil d'inspection d'URL pas à pas</h3>
<ol>
<li>Coller l'URL complète dans la barre de recherche en haut de la Search Console.</li>
<li>Lire le verdict : « L'URL est sur Google » ou « L'URL n'est pas sur Google », avec le détail (découverte, exploration, indexation).</li>
<li>Vérifier la <strong>canonique déclarée</strong> et la <strong>canonique sélectionnée par Google</strong>.</li>
<li>Cliquer sur « Tester l'URL en direct » après une correction, pour voir si Google peut maintenant explorer et indexer la page.</li>
<li>Utiliser « Afficher la page testée » (capture, code HTML rendu) pour vérifier que le contenu chargé en JavaScript est bien visible.</li>
<li>Cliquer sur « <strong>Demander une indexation</strong> » pour une page nouvelle ou fortement modifiée.</li>
</ol>
<blockquote><strong>Attention :</strong> demander l'indexation ne garantit ni l'indexation ni un délai. Le nombre de demandes est limité par un quota. Soumettre plusieurs fois la même URL n'accélère rien. Pour de nombreuses pages, c'est le sitemap et le maillage interne qui font le travail.</blockquote>

<h3>4. Lire le rapport d'indexation des pages</h3>
<p>Le rapport « Pages » classe les URL connues de Google en <strong>indexées</strong> et <strong>non indexées</strong>, avec un motif. Une page non indexée n'est pas forcément un problème : les pages redirigées, les pages en noindex volontaire ou les doublons correctement canonisés doivent légitimement être non indexés. Il faut se concentrer sur les <strong>pages importantes</strong> qui ne sont pas indexées.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Motif affiché (formulation courante)</th><th>Signification</th><th>Action</th></tr>
<tr><td>Exclue par la balise « noindex »</td><td>La page demande à ne pas être indexée.</td><td>Normal si voulu (mentions légales, panier) ; sinon retirer la balise.</td></tr>
<tr><td>Bloquée par le fichier robots.txt</td><td>Exploration interdite.</td><td>Vérifier si c'est volontaire ; corriger robots.txt sinon.</td></tr>
<tr><td>Page avec redirection</td><td>L'URL redirige vers une autre.</td><td>Normal ; vérifier que les liens internes et le sitemap pointent vers l'URL finale.</td></tr>
<tr><td>Introuvable (404)</td><td>La page n'existe pas.</td><td>Rediriger en 301 si une page équivalente existe ; sinon laisser en 404 et corriger les liens.</td></tr>
<tr><td>Soft 404</td><td>La page répond 200 mais ressemble à une page vide ou d'erreur.</td><td>Enrichir le contenu ou renvoyer un vrai code 404/410.</td></tr>
<tr><td>Autre page avec balise canonique correcte</td><td>Doublon dont la canonique pointe ailleurs.</td><td>Normal.</td></tr>
<tr><td>Page en double sans URL canonique sélectionnée par l'utilisateur</td><td>Google a trouvé des doublons et a choisi lui-même.</td><td>Ajouter des canoniques cohérentes.</td></tr>
<tr><td>Explorée, actuellement non indexée</td><td>Google a vu la page mais ne l'a pas retenue.</td><td>Souvent un problème de qualité ou de valeur ajoutée : enrichir, fusionner les pages faibles, renforcer les liens internes.</td></tr>
<tr><td>Détectée, actuellement non indexée</td><td>Google connaît l'URL mais ne l'a pas encore explorée.</td><td>Améliorer le maillage interne, vérifier les performances du serveur ; patience pour un site récent.</td></tr>
<tr><td>Erreur de serveur (5xx)</td><td>Le serveur n'a pas répondu correctement.</td><td>Contacter l'hébergeur, en priorité.</td></tr>
</table>
<p>Après correction d'un problème, le bouton « <strong>Valider la correction</strong> » demande à Google de revérifier les URL concernées ; la validation peut prendre plusieurs jours à plusieurs semaines.</p>

<h3>5. Vérifications complémentaires</h3>
<ul>
<li>L'opérateur <code>site:maisonlenoir.fr</code> dans Google donne un aperçu des pages indexées, mais le nombre affiché est approximatif : pour un suivi fiable, c'est la Search Console qui fait foi.</li>
<li>Tester l'affichage d'une page précise : rechercher son titre exact entre guillemets.</li>
</ul>

<h3>6. Bing Webmaster Tools et IndexNow</h3>
<p><strong>Bing Webmaster Tools</strong> est l'équivalent proposé par Microsoft pour le moteur Bing. Il est utile pour trois raisons : Bing a ses propres utilisateurs (notamment via les navigateurs et systèmes de Microsoft) ; l'index de Bing alimente d'autres services, dont l'assistant Microsoft Copilot ; l'outil fournit des diagnostics complémentaires (audit de site, mots-clés, liens). La mise en place est rapide : il est possible d'<strong>importer ses sites depuis la Search Console</strong>, ce qui évite une nouvelle validation.</p>
<p>Bing prend en charge le protocole <strong>IndexNow</strong>, qui permet à un site de notifier instantanément les moteurs participants de l'ajout, de la modification ou de la suppression d'une URL. Plusieurs CMS et extensions SEO l'intègrent. À savoir : <strong>Google n'utilise pas IndexNow</strong> ; pour Google, on reste sur le sitemap, le maillage et l'inspection d'URL.</p>

<h3>7. Procédure type pour Maison Lenoir : lancer la page « Galette des rois »</h3>
<ol>
<li>Mi-novembre : publier (ou réactiver) la page à l'URL permanente <code>/galette-des-rois/</code>, avec contenu à jour (parfums, tailles, prix, dates de retrait).</li>
<li>Ajouter des liens vers cette page depuis l'accueil et depuis la catégorie « Pâtisseries ».</li>
<li>Vérifier que la page figure dans le sitemap.</li>
<li>Inspecter l'URL dans la Search Console, tester en direct, demander l'indexation.</li>
<li>Notifier Bing (IndexNow si l'extension est active, sinon soumission d'URL dans Bing Webmaster Tools).</li>
<li>Contrôler une à deux semaines plus tard le statut d'indexation et les premières impressions dans le rapport Performances.</li>
<li>Après l'Épiphanie : ne pas supprimer la page ; la laisser en ligne avec un message « Revenez début janvier » et un lien vers les pâtisseries du moment, pour conserver son historique et ses liens.</li>
</ol>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Laisser le prestataire seul propriétaire de la Search Console : en cas de séparation, l'entreprise perd l'accès à son historique.</li>
<li>S'alarmer du nombre de pages « non indexées » sans regarder si ce sont des pages qui devaient l'être.</li>
<li>Multiplier les demandes d'indexation au lieu de corriger la cause (contenu faible, page orpheline).</li>
<li>Ignorer les e-mails d'alerte de la Search Console (problèmes de sécurité, actions manuelles).</li>
</ul>
<blockquote><strong>À retenir :</strong> la Search Console est l'outil central : propriété de domaine validée par DNS, sitemap soumis, inspection d'URL pour chaque page importante, lecture régulière du rapport d'indexation en se concentrant sur les pages stratégiques. Bing Webmaster Tools complète le dispositif et prend en charge IndexNow, que Google n'utilise pas. Demander l'indexation n'est jamais une garantie.</blockquote>
`,
      },
      {
        title: "5.5 – L'optimisation éditoriale",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Rédiger des balises title et des méta-descriptions efficaces.</li>
<li>Structurer une page avec des intertitres Hn cohérents.</li>
<li>Optimiser les images (nom de fichier, texte alternatif, poids).</li>
<li>Produire un contenu utile qui répond à l'intention et démontre l'expérience.</li>
<li>Construire un maillage interne qui guide l'internaute et les robots.</li>
</ul>

<h3>1. La balise title</h3>
<p>La balise <code>&lt;title&gt;</code> définit le titre de la page. Elle sert de source principale au lien bleu affiché dans les résultats (Google peut toutefois le réécrire s'il le juge peu représentatif) et constitue un élément important pour comprendre le sujet de la page.</p>
<p><strong>Bonnes pratiques :</strong></p>
<ul>
<li>un title <strong>unique</strong> par page, descriptif et précis ;</li>
<li>la requête principale placée de préférence en début, formulée naturellement ;</li>
<li>une longueur raisonnable : il n'existe pas de limite officielle, mais l'affichage est tronqué au-delà d'une certaine largeur en pixels ; viser environ 50 à 60 caractères est une règle pratique courante ;</li>
<li>le nom de la marque en fin de title, séparé par un tiret ou une barre verticale ;</li>
<li>pas de répétition de mots-clés (« Boulangerie Nantes boulangerie artisanale Nantes boulanger Nantes ») : c'est du bourrage de mots-clés, contraire aux règles anti-spam de Google.</li>
</ul>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Page</th><th>Title actuel</th><th>Title proposé</th></tr>
<tr><td>Accueil</td><td>Accueil</td><td>Boulangerie-pâtisserie artisanale au levain à Nantes | Maison Lenoir</td></tr>
<tr><td>Catégorie gâteaux</td><td>Produits – Catégorie 4</td><td>Gâteau d'anniversaire sur commande à Nantes | Maison Lenoir</td></tr>
<tr><td>Traiteur</td><td>Nos services</td><td>Traiteur pour entreprises à Nantes : petit-déjeuner, buffets | Maison Lenoir</td></tr>
<tr><td>Galette</td><td>Galette 2026</td><td>Galette des rois artisanale à commander à Nantes | Maison Lenoir</td></tr>
</table>

<h3>2. La méta-description</h3>
<p>La balise <code>&lt;meta name="description"&gt;</code> résume la page. Google a indiqué qu'elle <strong>n'est pas un facteur de classement</strong> ; elle peut en revanche être reprise comme extrait sous le lien et influencer le <strong>taux de clic</strong>. Google la remplace souvent par un extrait du texte de la page qu'il juge plus adapté à la requête.</p>
<ul>
<li>Une description unique par page, qui résume l'offre et donne envie de cliquer.</li>
<li>Des éléments concrets : bénéfice, preuve, appel à l'action (« Commandez en ligne, retrait en boutique dès le lendemain »).</li>
<li>Une longueur qui reste lisible dans l'extrait (de l'ordre de 150 caractères en pratique).</li>
</ul>
<p>Exemple pour la page traiteur : « Plateaux petit-déjeuner, viennoiseries et buffets faits maison pour vos réunions et séminaires à Nantes. Devis sous 24 h, livraison possible. » <em>(À n'écrire que si le délai de devis et la livraison sont réellement assurés.)</em></p>
<p>La balise <code>meta keywords</code> est ignorée par Google depuis de nombreuses années : inutile de la remplir.</p>

<h3>3. La structure Hn</h3>
<p>Les balises de titres <code>&lt;h1&gt;</code> à <code>&lt;h6&gt;</code> hiérarchisent le contenu, comme le plan d'un rapport. Elles aident le lecteur à parcourir la page et les moteurs à en comprendre l'organisation.</p>
<ul>
<li>Un <strong>h1</strong> clair qui annonce le sujet de la page (un seul h1 est la pratique la plus lisible, même si Google n'en fait pas une règle stricte).</li>
<li>Des <strong>h2</strong> pour les grandes parties, des <strong>h3</strong> pour les sous-parties, sans sauter de niveau sans raison.</li>
<li>Des intertitres <strong>informatifs</strong>, qui reprennent les questions des clients, plutôt que des intertitres décoratifs (« Bienvenue », « Découvrez »).</li>
<li>Ne pas utiliser les balises Hn pour la seule mise en forme (gros caractères) : c'est le rôle des styles.</li>
</ul>
<h4>Exemple : plan de la page « Traiteur entreprises »</h4>
<ul>
<li>h1 : Traiteur pour entreprises à Nantes : petit-déjeuners, buffets et pauses gourmandes</li>
<li>h2 : Nos formules pour vos réunions et séminaires
<ul><li>h3 : Plateaux petit-déjeuner</li><li>h3 : Buffets salés et sucrés</li><li>h3 : Pauses café et goûters d'équipe</li></ul></li>
<li>h2 : Comment commander ? (délais, quantités minimales, devis)</li>
<li>h2 : Livraison ou retrait : zones et horaires</li>
<li>h2 : Allergènes et régimes particuliers</li>
<li>h2 : Ils nous ont fait confiance (références clients autorisées, avis)</li>
<li>h2 : Questions fréquentes</li>
<li>h2 : Demander un devis (formulaire)</li>
</ul>

<h3>4. Le contenu : répondre à l'intention et démontrer l'expérience</h3>
<p>Un contenu performant n'est pas un texte « optimisé » truffé de mots-clés : c'est la <strong>meilleure réponse disponible</strong> à la question de l'internaute. Méthode de rédaction :</p>
<ol>
<li><strong>Partir de l'intention</strong> identifiée dans l'audit sémantique : l'internaute veut-il commander, comparer, comprendre ?</li>
<li><strong>Lister les questions</strong> auxquelles la page doit répondre (issues du comptoir, d'AnswerThePublic, des « Autres questions posées »).</li>
<li><strong>Apporter de l'information concrète et vérifiable</strong> : prix, délais, tailles, nombre de parts, ingrédients, zone de livraison, modalités de paiement.</li>
<li><strong>Montrer l'expérience de première main</strong> : photos réelles, explication du savoir-faire, nom de l'artisan, anecdotes de fabrication.</li>
<li><strong>Utiliser le vocabulaire du champ sémantique</strong> naturellement : pour la galette, « frangipane », « pâte feuilletée », « fève », « couronne », « parts » viennent d'eux-mêmes si le texte est complet.</li>
<li><strong>Faciliter l'action</strong> : bouton de commande visible, formulaire de devis court, coordonnées.</li>
<li><strong>Dater et mettre à jour</strong> : prix et offres changent ; un contenu périmé dégrade la confiance.</li>
</ol>
<h4>Contenu et intelligence artificielle générative</h4>
<p>Google indique que l'utilisation de l'IA pour produire du contenu n'est pas interdite en soi : ce qui compte, c'est la qualité et l'utilité du résultat. En revanche, la <strong>production de contenus en masse</strong> (par IA ou autrement) dans le but principal de manipuler le classement relève de ses règles contre le spam (abus de contenu à grande échelle, ou <em>scaled content abuse</em>). Pour une TPE, l'IA peut aider à structurer un plan ou reformuler, mais l'information, l'expérience et la vérification doivent venir de l'entreprise. Une fiche produit générée sans relecture avec des ingrédients inventés est un risque commercial et réglementaire (allergènes).</p>

<h3>5. Optimiser les images</h3>
<ul>
<li><strong>Nom de fichier</strong> descriptif : <code>galette-frangipane-maison-lenoir.webp</code> plutôt que <code>IMG_4587.jpg</code>.</li>
<li><strong>Attribut alt</strong> (texte alternatif) : décrit l'image pour les personnes malvoyantes utilisant un lecteur d'écran et pour les moteurs. Il doit être descriptif et naturel : « Galette des rois frangipane de 6 parts sur un plateau en bois ». Un alt vide (<code>alt=""</code>) convient aux images purement décoratives. Pas de liste de mots-clés.</li>
<li><strong>Poids et dimensions</strong> : voir les Core Web Vitals (section 5.3).</li>
<li><strong>Photos originales</strong> : elles soutiennent l'expérience (E-E-A-T) et se distinguent dans Google Images, contrairement aux photos de banque d'images utilisées par des centaines de sites.</li>
</ul>

<h3>6. Le maillage interne</h3>
<p>Le <strong>maillage interne</strong> désigne les liens entre les pages d'un même site. Il remplit trois fonctions : permettre aux robots de découvrir les pages, indiquer leur importance relative (une page très liée est perçue comme importante) et guider l'internaute vers la conversion.</p>
<h4>Règles pratiques</h4>
<ul>
<li>Chaque page importante reçoit des liens depuis plusieurs autres pages, dont au moins une proche de l'accueil.</li>
<li>Les <strong>textes d'ancrage</strong> (le texte cliquable) décrivent la page de destination : « nos plateaux petit-déjeuner pour entreprises » plutôt que « cliquez ici ».</li>
<li>Les articles de conseils renvoient vers les pages commerciales correspondantes (l'article sur la conservation du pain au levain renvoie vers la page « Pains spéciaux » du click &amp; collect).</li>
<li>Le fil d'Ariane renforce la structure et apparaît parfois dans les résultats.</li>
<li>Aucune page orpheline : toute page publiée doit être accessible par au moins un lien.</li>
</ul>
<h4>Schéma de cocon simplifié pour le pôle traiteur de Maison Lenoir</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Page</th><th>Reçoit des liens de</th><th>Envoie des liens vers</th></tr>
<tr><td>Traiteur entreprises (page pilier)</td><td>Accueil, menu principal, pied de page, articles B2B</td><td>Chaque formule, demande de devis, page allergènes</td></tr>
<tr><td>Plateaux petit-déjeuner</td><td>Page pilier, article « Organiser un petit-déjeuner d'équipe »</td><td>Page pilier, devis, buffets (formule complémentaire)</td></tr>
<tr><td>Buffets salés et sucrés</td><td>Page pilier, article « Combien de pièces prévoir par personne pour un buffet ? »</td><td>Page pilier, devis</td></tr>
<tr><td>Article « Organiser un petit-déjeuner d'équipe »</td><td>Page Conseils, page pilier</td><td>Plateaux petit-déjeuner, devis</td></tr>
</table>

<h3>7. Mettre à jour plutôt que multiplier</h3>
<p>Pour une petite structure, il est souvent plus rentable d'<strong>améliorer les pages existantes</strong> (celles qui reçoivent déjà des impressions dans la Search Console) que de publier sans cesse de nouveaux contenus. Repérer dans le rapport Performances les pages qui ont beaucoup d'impressions, une position moyenne entre 5 et 20 et un faible taux de clic : ce sont les meilleures candidates à une réécriture du title, de la description et à un enrichissement du contenu.</p>

<h3>Check-list éditoriale avant publication d'une page</h3>
<ul>
<li>L'intention de la requête cible est identifiée et la page y répond dès le premier écran.</li>
<li>Title unique, descriptif, avec la requête principale et la marque.</li>
<li>Méta-description unique et incitative, fidèle au contenu.</li>
<li>Un h1 explicite, des h2/h3 informatifs.</li>
<li>Informations pratiques exactes : prix, délais, zone, allergènes, contact.</li>
<li>Images originales, compressées, avec un alt descriptif.</li>
<li>Au moins deux liens internes entrants et des liens sortants vers les pages utiles.</li>
<li>URL courte et lisible.</li>
<li>Auteur ou responsable identifiable, date de mise à jour si pertinent.</li>
<li>Relecture orthographique et vérification des affirmations.</li>
</ul>
<h3>Erreurs fréquentes</h3>
<ul>
<li>Titles identiques sur toutes les pages (souvent le nom de l'entreprise seul).</li>
<li>Textes très courts sur les pages commerciales (« Contactez-nous pour un devis ») qui ne répondent à aucune question.</li>
<li>Bourrage de mots-clés et textes écrits « pour Google », illisibles.</li>
<li>Copier la description d'un fournisseur ou d'un concurrent.</li>
<li>Ancres de liens internes toutes identiques ou non descriptives.</li>
</ul>
<blockquote><strong>À retenir :</strong> l'optimisation éditoriale combine des balises bien rédigées (title unique et descriptif, méta-description incitative qui n'influence que le clic, Hn hiérarchisés, alt descriptifs) et un contenu réellement utile, concret et incarné. Le maillage interne relie les contenus d'information aux pages qui convertissent. Améliorer l'existant est souvent plus rentable que publier davantage.</blockquote>
`,
      },
      {
        title: "5.6 – Le référencement local : Google Business Profile, NAP et avis",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Comprendre comment Google classe les résultats locaux.</li>
<li>Créer, valider et optimiser une fiche Google Business Profile.</li>
<li>Assurer la cohérence des coordonnées (NAP) sur le web.</li>
<li>Collecter et gérer les avis clients dans le respect des règles.</li>
</ul>

<h3>1. Pourquoi le local est prioritaire pour un commerce de proximité</h3>
<p>Pour une requête à intention locale (« boulangerie », « pâtissier près de moi », « traiteur Nantes »), Google affiche souvent un <strong>pack local</strong> : une carte et une liste de quelques établissements issus de <strong>Google Business Profile</strong> (anciennement Google My Business), puis les résultats web classiques. Ces fiches apparaissent aussi dans Google Maps. Pour Maison Lenoir, la fiche est souvent le premier contact avec un client : horaires, itinéraire, appel, photos, avis.</p>
<p>Google indique que le classement local repose principalement sur trois critères :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Définition (selon Google)</th><th>Ce que l'entreprise peut faire</th></tr>
<tr><td>Pertinence</td><td>Adéquation entre la fiche et la recherche.</td><td>Choisir les bonnes catégories, compléter tous les champs, décrire précisément les produits et services.</td></tr>
<tr><td>Distance</td><td>Éloignement entre l'établissement et le lieu de la recherche (ou le lieu indiqué dans la requête).</td><td>Aucune action possible sur la distance elle-même ; indiquer l'adresse exacte.</td></tr>
<tr><td>Notoriété (<em>prominence</em>)</td><td>Degré de connaissance de l'établissement : avis (nombre et notes), liens, articles, présence dans des annuaires ; la position dans les résultats web joue aussi.</td><td>Obtenir des avis authentiques, des mentions locales, un site bien référencé.</td></tr>
</table>
<p>Google précise qu'il n'est pas possible de payer pour améliorer son classement local naturel.</p>

<h3>2. Créer et optimiser la fiche Google Business Profile</h3>
<h4>Création et validation</h4>
<ol>
<li>Rechercher l'établissement sur Google Maps : une fiche existe peut-être déjà (créée par Google ou un utilisateur) ; il faut alors la <strong>revendiquer</strong> plutôt que d'en créer une seconde.</li>
<li>Créer ou revendiquer la fiche avec un compte Google de l'entreprise.</li>
<li>Valider la fiche selon la méthode proposée par Google (par exemple vidéo, téléphone, SMS, e-mail ou courrier, selon les cas). La fiche n'est pleinement publiée et modifiable qu'après validation.</li>
<li>Ajouter les autres gestionnaires avec les rôles adaptés (propriétaire, gérant).</li>
</ol>
<h4>Optimisation : check-list de la fiche</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Bonne pratique</th><th>Exemple Maison Lenoir</th></tr>
<tr><td>Nom</td><td>Le nom réel de l'enseigne, tel qu'il figure sur la devanture. Ajouter des mots-clés au nom est contraire aux consignes de Google et peut entraîner la suspension de la fiche.</td><td>« Maison Lenoir » et non « Maison Lenoir Boulangerie Pâtisserie Traiteur Nantes Pas Cher ».</td></tr>
<tr><td>Catégorie principale</td><td>La plus représentative de l'activité.</td><td>Boulangerie.</td></tr>
<tr><td>Catégories secondaires</td><td>Activités réelles complémentaires.</td><td>Pâtisserie ; traiteur (si l'activité est effective).</td></tr>
<tr><td>Adresse et zone</td><td>Adresse exacte, identique au site.</td><td>Adresse de la boutique ; zone de livraison B2B indiquée si service de livraison.</td></tr>
<tr><td>Horaires</td><td>Horaires normaux et <strong>horaires exceptionnels</strong> (jours fériés, fermeture annuelle).</td><td>Horaires spécifiques du 24 et 31 décembre, de l'Épiphanie si ouverture exceptionnelle.</td></tr>
<tr><td>Téléphone et site web</td><td>Numéro joignable ; lien vers la page la plus pertinente.</td><td>Lien vers l'accueil ; lien de commande vers le click &amp; collect si le champ est proposé.</td></tr>
<tr><td>Description</td><td>Présentation factuelle de l'établissement et de l'offre, sans liens ni promotions.</td><td>Levain naturel, farines régionales, gâteaux sur commande, offre traiteur entreprises.</td></tr>
<tr><td>Produits et services</td><td>Renseigner les principaux produits/services avec photo et prix si possible.</td><td>Galette, bûches, gâteaux d'anniversaire, plateaux petit-déjeuner.</td></tr>
<tr><td>Attributs</td><td>Cocher les attributs exacts proposés par Google (accessibilité, modes de paiement, retrait…).</td><td>Retrait en magasin, accès en fauteuil roulant si c'est le cas.</td></tr>
<tr><td>Photos</td><td>Photos réelles et récentes : devanture (pour être reconnu dans la rue), intérieur, produits, équipe.</td><td>Ajout de photos à chaque saison.</td></tr>
<tr><td>Posts (actualités, offres, événements)</td><td>Publications courtes pour signaler une nouveauté.</td><td>« Les commandes de galettes sont ouvertes » début décembre.</td></tr>
<tr><td>Questions-réponses et messages</td><td>Selon les fonctionnalités disponibles au moment de la consultation, surveiller et répondre.</td><td>Réponse aux questions sur les allergènes et délais.</td></tr>
</table>
<p>Les fonctionnalités de Google Business Profile évoluent régulièrement (certaines sont ajoutées, d'autres retirées) : vérifiez toujours l'interface et l'aide officielle au moment de la mise en œuvre.</p>

<h3>3. La cohérence NAP</h3>
<p><strong>NAP</strong> signifie <em>Name, Address, Phone</em> : nom, adresse, téléphone. Ces informations doivent être <strong>strictement identiques</strong> partout où l'entreprise est citée : site (pied de page, page contact, données structurées <code>Bakery</code>), fiche Google, Bing Places, Apple Business Connect (Plans d'Apple), Pages Jaunes, réseaux sociaux, plateformes de livraison, annuaires locaux et professionnels. Des coordonnées incohérentes (ancien numéro, « rue » abrégée différemment, ancienne adresse après un déménagement) brouillent les signaux et, surtout, <strong>perdent des clients</strong>.</p>
<p><strong>Méthode :</strong> (1) rédiger une fiche d'identité de référence (nom, adresse normalisée, téléphone, horaires, URL) ; (2) rechercher l'entreprise par nom et par numéro de téléphone pour lister les citations existantes ; (3) corriger ou revendiquer chaque fiche ; (4) consigner les accès dans un tableau partagé ; (5) mettre à jour toutes les fiches à chaque changement (horaires d'été, nouveau numéro).</p>

<h3>4. Les avis clients</h3>
<p>Les avis jouent à la fois sur la notoriété locale et sur la décision d'achat. Ils doivent être gérés avec rigueur, car le cadre est strict.</p>
<h4>Ce qui est autorisé et recommandé</h4>
<ul>
<li>Demander un avis à <strong>tous</strong> les clients, sans sélectionner seulement les satisfaits : carte au comptoir avec QR code renvoyant vers le lien d'avis de la fiche, e-mail de confirmation de commande click &amp; collect, message après une prestation traiteur.</li>
<li>Répondre à <strong>tous</strong> les avis, positifs comme négatifs, de façon personnalisée, courtoise et factuelle.</li>
<li>Utiliser les avis négatifs comme source d'amélioration et répondre en proposant une solution.</li>
<li>Signaler à Google les avis qui enfreignent ses règles (contenus haineux, hors sujet, conflit d'intérêts).</li>
</ul>
<h4>Ce qui est interdit</h4>
<ul>
<li><strong>Acheter</strong> des avis ou en faire rédiger par des proches, des salariés ou des prestataires.</li>
<li>Offrir une <strong>contrepartie</strong> (réduction, cadeau) en échange d'un avis : les règles de Google sur les contenus des fiches interdisent les avis incités.</li>
<li>Rédiger de faux avis négatifs sur des concurrents.</li>
<li>Filtrer la demande d'avis pour ne solliciter que les clients satisfaits (pratique dite de <em>review gating</em>, contraire aux règles de Google).</li>
</ul>
<p>En France, publier ou faire publier de faux avis de consommateurs constitue une <strong>pratique commerciale trompeuse</strong> au regard du Code de la consommation, et les professionnels qui affichent des avis doivent informer sur les modalités de contrôle de ces avis (s'ils sont vérifiés ou non). La DGCCRF contrôle ces pratiques. Google peut de son côté supprimer les avis frauduleux et restreindre une fiche.</p>
<h4>Exemple de réponse à un avis négatif</h4>
<blockquote>« Bonjour Madame, merci d'avoir pris le temps de nous écrire. Nous sommes désolés que votre gâteau d'anniversaire n'ait pas été prêt à l'heure convenue samedi : ce n'est pas le service que nous voulons offrir. Nous avons revu notre planning des retraits du week-end. Pouvez-vous nous contacter au numéro de la boutique pour que nous trouvions ensemble un geste ? Claire, Maison Lenoir. »</blockquote>
<p>Remarque : le geste commercial est proposé pour réparer un préjudice, sans condition liée à la modification ou à la suppression de l'avis.</p>

<h3>5. Le contenu local sur le site</h3>
<ul>
<li>Une page « Infos pratiques » complète : adresse, plan d'accès, stationnement, transports en commun proches, horaires, téléphone.</li>
<li>Des mentions naturelles de la ville et du quartier dans les pages commerciales, sans répétition artificielle.</li>
<li>Pour une entreprise multi-sites, une page par établissement avec un contenu propre ; à l'inverse, créer des « pages villes » pour des communes où l'on n'a ni établissement ni service réel relève des pages satellites (<em>doorway pages</em>) sanctionnées par Google.</li>
</ul>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Fiche créée par un ancien prestataire ou un ancien gérant, inaccessible.</li>
<li>Horaires des jours fériés non mis à jour : clients devant une porte fermée et avis négatifs.</li>
<li>Mots-clés ajoutés au nom de l'établissement.</li>
<li>Avis laissés sans réponse pendant des mois.</li>
<li>Coordonnées différentes entre le site, la fiche et les annuaires.</li>
</ul>
<blockquote><strong>À retenir :</strong> le classement local repose sur la pertinence, la distance et la notoriété. Une fiche Google Business Profile validée, complète, au nom réel de l'enseigne et tenue à jour, des coordonnées NAP identiques partout et une gestion honnête et régulière des avis sont les leviers prioritaires d'un commerce de proximité. Les avis achetés, incités ou faux sont interdits par Google et sanctionnés par le droit de la consommation.</blockquote>
`,
      },
      {
        title: "5.7 – Mettre en place une stratégie de netlinking",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Comprendre le rôle des liens entrants (backlinks) dans le référencement.</li>
<li>Distinguer un netlinking éthique des pratiques sanctionnées par Google.</li>
<li>Construire un plan d'acquisition de liens réaliste pour une TPE locale.</li>
<li>Suivre et assainir son profil de liens.</li>
</ul>

<h3>1. Pourquoi les liens comptent</h3>
<p>Un <strong>lien entrant</strong> (ou <em>backlink</em>) est un lien placé sur un autre site et qui pointe vers le vôtre. Historiquement, Google a fondé son classement sur l'idée qu'un lien est une forme de recommandation (algorithme PageRank). Les liens restent aujourd'hui l'un des signaux utilisés par Google pour découvrir des pages et évaluer leur importance, parmi de nombreux autres signaux. Leur effet dépend de la <strong>qualité</strong> et de la <strong>pertinence</strong> du site qui fait le lien, bien plus que de leur nombre.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère d'un bon lien</th><th>Question à se poser</th></tr>
<tr><td>Pertinence thématique ou géographique</td><td>Le site qui fait le lien parle-t-il de gastronomie, de commerce local, de Nantes, d'entreprises de la région ?</td></tr>
<tr><td>Qualité du site source</td><td>Est-ce un vrai site, avec un vrai public, des contenus éditoriaux, une activité régulière ?</td></tr>
<tr><td>Contexte éditorial</td><td>Le lien est-il placé dans un contenu qui a un sens pour le lecteur, et pas dans une liste de centaines de liens ?</td></tr>
<tr><td>Trafic potentiel</td><td>Des lecteurs réels cliqueront-ils sur ce lien ? (Un lien qui apporte des visites a de la valeur même indépendamment du SEO.)</td></tr>
<tr><td>Naturel de l'ancre</td><td>Le texte du lien est-il varié et naturel (nom de la marque, URL, description), et non une requête commerciale répétée à l'identique ?</td></tr>
</table>

<h3>2. Les attributs de liens</h3>
<p>Google demande de qualifier certains liens à l'aide d'attributs placés dans la balise <code>&lt;a&gt;</code> :</p>
<ul>
<li><code>rel="sponsored"</code> : lien publicitaire, sponsorisé ou rémunéré (y compris en nature) ;</li>
<li><code>rel="ugc"</code> : lien dans un contenu généré par les utilisateurs (commentaires, forums) ;</li>
<li><code>rel="nofollow"</code> : demande générique de ne pas associer le site au lien.</li>
</ul>
<p>Depuis 2019, Google traite ces attributs comme des <strong>indications</strong> et non plus comme des ordres absolus. Un lien en nofollow ou sponsored n'est pas inutile : il peut apporter du trafic et de la notoriété.</p>

<h3>3. Netlinking éthique ou pratiques sanctionnées</h3>
<p>Les <strong>règles de Google concernant le spam</strong> (Google Search Essentials) qualifient de « spam de liens » toute pratique visant à manipuler le classement par des liens. Le non-respect peut entraîner une baisse de classement par les systèmes automatiques (Google a développé un système nommé SpamBrain pour détecter le spam, y compris de liens) ou une <strong>action manuelle</strong>, visible dans la Search Console.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Pratiques éthiques (à privilégier)</th><th>Pratiques contraires aux règles de Google (à proscrire)</th></tr>
<tr><td>Obtenir des articles dans la presse locale ou spécialisée grâce à une vraie actualité</td><td>Acheter ou vendre des liens qui transmettent du PageRank (sans attribut sponsored/nofollow)</td></tr>
<tr><td>Être cité par ses partenaires réels : fournisseurs, producteurs, clients B2B, associations</td><td>Échanges de liens excessifs (« je te fais un lien si tu m'en fais un ») organisés à grande échelle</td></tr>
<tr><td>S'inscrire dans des annuaires pertinents et de qualité (chambre de métiers, annuaires de commerçants, office de tourisme si éligible)</td><td>Inscriptions automatisées dans des centaines d'annuaires ou de sites de faible qualité</td></tr>
<tr><td>Créer des contenus qui méritent d'être cités (guide, étude locale menée réellement, événement)</td><td>Réseaux de sites créés uniquement pour faire des liens (PBN, <em>private blog networks</em>)</td></tr>
<tr><td>Sponsoriser un événement local, avec un lien qualifié en sponsored</td><td>Articles invités publiés en masse avec des ancres optimisées</td></tr>
<tr><td>Participer à la vie locale : marchés, salons professionnels, associations de quartier</td><td>Liens cachés, liens dans des widgets ou thèmes distribués, commentaires et forums spammés</td></tr>
</table>
<p>Google a également précisé en 2024 ses règles contre certaines pratiques comme l'<strong>abus de réputation de site</strong> (publication de contenus de tiers sur un site réputé pour profiter de son autorité) et l'<strong>abus de domaines expirés</strong> (racheter un domaine expiré pour profiter de ses anciens liens avec un contenu sans rapport). Les offres qui promettent « 1 000 backlinks pour 50 € » relèvent clairement des pratiques à risque.</p>
<blockquote><strong>Point de vigilance légal et éthique :</strong> un article rédigé contre rémunération doit aussi respecter le droit de la publicité : le lecteur doit pouvoir identifier qu'il s'agit d'un contenu commercial. Le qualificatif sponsored côté technique et la mention claire côté lecteur vont ensemble.</blockquote>

<h3>4. Méthode : construire un plan de netlinking local</h3>
<ol>
<li><strong>Faire l'état des lieux</strong> : rapport « Liens » de la Search Console (sites les plus liés, ancres), complété si besoin par un outil tiers (Semrush, Ahrefs, Majestic, Ubersuggest) qui donne des estimations.</li>
<li><strong>Analyser les concurrents</strong> qui se classent bien sur les requêtes cibles : d'où viennent leurs liens ? Lesquels sont accessibles à Maison Lenoir (même annuaire, même presse, même réseau) ?</li>
<li><strong>Cartographier les relations existantes</strong> : fournisseurs, clients B2B, partenaires, associations, organismes professionnels. Ce sont les liens les plus naturels et les plus faciles à obtenir.</li>
<li><strong>Créer des « raisons de parler de vous »</strong> : actualité réelle (nouvelle recette, partenariat avec un producteur local, participation à un concours professionnel, atelier découverte, action solidaire).</li>
<li><strong>Contacter de façon personnalisée</strong> : un message court, qui explique l'intérêt pour le lecteur du site contacté.</li>
<li><strong>Diriger les liens vers les bonnes pages</strong> : l'accueil pour les citations générales, la page traiteur pour les partenaires B2B, une page saisonnière pour un article de presse sur les galettes.</li>
<li><strong>Suivre</strong> les liens obtenus dans un tableau (date, site, page de destination, ancre, attribut, statut).</li>
</ol>
<h4>Exemple de plan de netlinking sur 6 mois pour Maison Lenoir</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Action</th><th>Source visée</th><th>Page de destination</th><th>Effort</th><th>Échéance</th></tr>
<tr><td>Demander une mention avec lien sur la page « Où trouver nos farines » du meunier partenaire</td><td>Site du fournisseur</td><td>Accueil ou page « Nos farines »</td><td>Faible</td><td>Mois 1</td></tr>
<tr><td>Compléter les fiches dans les annuaires professionnels et locaux pertinents (chambre de métiers, association de commerçants du quartier)</td><td>Annuaires de qualité</td><td>Accueil</td><td>Faible</td><td>Mois 1</td></tr>
<tr><td>Proposer à 3 clients B2B satisfaits de citer Maison Lenoir dans leur actualité (petit-déjeuner d'accueil, séminaire)</td><td>Sites ou pages actualités des clients</td><td>Traiteur entreprises</td><td>Moyen</td><td>Mois 2-3</td></tr>
<tr><td>Communiqué à la presse locale pour une actualité réelle (ex. lancement d'une galette avec un producteur régional)</td><td>Presse quotidienne régionale, médias en ligne nantais, blogs gastronomiques locaux</td><td>Page saisonnière Galette</td><td>Moyen</td><td>Mois 3 (décembre)</td></tr>
<tr><td>Publier un guide utile et citable : « Organiser un petit-déjeuner d'entreprise : quantités par personne et organisation »</td><td>Blogs RH, office managers, réseaux d'entreprises</td><td>Article guide, puis lien interne vers le traiteur</td><td>Élevé</td><td>Mois 4</td></tr>
<tr><td>Sponsoriser une course ou un événement associatif du quartier</td><td>Site de l'événement (lien sponsored)</td><td>Accueil</td><td>Moyen (coût)</td><td>Mois 5-6</td></tr>
</table>

<h3>5. Surveiller et assainir son profil de liens</h3>
<ul>
<li>Consulter le rapport « Liens » de la Search Console chaque trimestre.</li>
<li>Vérifier l'absence d'action manuelle (rubrique « Sécurité et actions manuelles »).</li>
<li>Les liens de mauvaise qualité qui apparaissent spontanément sont généralement ignorés par Google : il n'est pas nécessaire de s'en inquiéter dans la plupart des cas.</li>
<li>L'<strong>outil de désaveu</strong> de liens existe toujours, mais Google le réserve aux situations où un site a un nombre important de liens artificiels (achetés par un ancien prestataire, par exemple) et a reçu ou risque une action manuelle. Mal utilisé, il peut nuire au site.</li>
</ul>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Acheter un « pack de backlinks » sans connaître les sites sources.</li>
<li>Utiliser toujours la même ancre commerciale (« traiteur entreprise Nantes ») sur tous les liens.</li>
<li>Négliger les relations existantes, qui sont la source de liens la plus naturelle pour une TPE.</li>
<li>Faire tous les liens vers l'accueil alors que les pages commerciales en ont besoin.</li>
<li>Désavouer des liens par précaution sans raison sérieuse.</li>
</ul>
<blockquote><strong>À retenir :</strong> les liens restent un signal de popularité, mais leur valeur dépend de la qualité, de la pertinence et du contexte. Un netlinking éthique s'appuie sur les relations réelles de l'entreprise, la presse locale, des annuaires de qualité et des contenus utiles. L'achat de liens, les réseaux de sites et les échanges massifs sont contraires aux règles de Google et peuvent entraîner une action manuelle. Les liens rémunérés doivent être qualifiés en sponsored.</blockquote>
`,
      },
      {
        title: "5.8 – Mettre en place le suivi de son référencement",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Définir des indicateurs SEO reliés aux objectifs de l'entreprise.</li>
<li>Exploiter le rapport Performances de la Search Console.</li>
<li>Mesurer le trafic organique et les conversions dans Google Analytics 4.</li>
<li>Mettre en place un suivi de positions et un tableau de bord mensuel.</li>
</ul>

<h3>1. Partir des objectifs, pas des outils</h3>
<p>Le suivi SEO doit répondre à la question du dirigeant : <em>« Le référencement m'apporte-t-il des clients ? »</em> On organise donc les indicateurs en trois niveaux :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Niveau</th><th>Indicateurs</th><th>Source</th></tr>
<tr><td>Visibilité</td><td>Impressions, position moyenne, nombre de requêtes sur lesquelles le site apparaît, pages indexées, présence dans le pack local</td><td>Search Console, outil de suivi de positions, statistiques Google Business Profile</td></tr>
<tr><td>Trafic</td><td>Clics depuis Google, taux de clic (CTR), sessions issues de la recherche organique, pages d'entrée</td><td>Search Console, GA4</td></tr>
<tr><td>Résultats business</td><td>Commandes click &amp; collect, demandes de devis traiteur, appels et demandes d'itinéraire depuis la fiche, chiffre d'affaires attribué</td><td>GA4 (événements clés), back-office du site, statistiques Google Business Profile, cahier de prise de commandes</td></tr>
</table>

<h3>2. Exploiter le rapport Performances de la Search Console</h3>
<h4>Les quatre métriques</h4>
<ul>
<li><strong>Clics</strong> : nombre de clics vers le site depuis les résultats Google.</li>
<li><strong>Impressions</strong> : nombre de fois où un lien vers le site est apparu dans les résultats consultés.</li>
<li><strong>CTR</strong> : clics ÷ impressions.</li>
<li><strong>Position moyenne</strong> : position moyenne du résultat le plus haut du site. C'est une moyenne sur toutes les requêtes et tous les contextes : elle se lit en tendance et par requête, jamais seule.</li>
</ul>
<h4>Analyses utiles pas à pas</h4>
<ol>
<li><strong>Comparer deux périodes</strong> (filtre Date &gt; Comparer) : mois sur mois, ou année sur année pour neutraliser la saisonnalité (indispensable pour une boulangerie : comparer décembre à décembre).</li>
<li><strong>Filtrer les requêtes de marque</strong> (contenant « lenoir ») et hors marque : la progression du hors-marque mesure réellement l'effet du SEO sur de nouveaux clients.</li>
<li><strong>Trier les pages par impressions</strong> et repérer celles avec un CTR faible : réécrire title et méta-description.</li>
<li><strong>Repérer les requêtes en position 5 à 20</strong> : ce sont des opportunités proches de la première page.</li>
<li><strong>Filtrer par appareil</strong> (mobile/ordinateur) et par pays.</li>
<li><strong>Exporter</strong> les données (Google Sheets, Excel) pour le tableau de bord.</li>
</ol>
<p>Les données de la Search Console sont conservées <strong>16 mois</strong> : exporter régulièrement pour garder un historique plus long.</p>

<h3>3. Google Analytics 4 : mesurer le trafic organique et les conversions</h3>
<p><strong>Google Analytics 4 (GA4)</strong> mesure ce que font les visiteurs une fois sur le site. Pour le SEO :</p>
<ul>
<li>Rapport <strong>Acquisition &gt; Acquisition de trafic</strong> : le groupe de canaux par défaut distingue notamment <em>Organic Search</em> (recherche naturelle), <em>Paid Search</em>, <em>Direct</em>, <em>Organic Social</em>, <em>Referral</em>.</li>
<li><strong>Événements clés</strong> (dénomination GA4 de ce qu'on appelait « conversions » ; Google a renommé ce terme en 2024) : à configurer pour les actions qui comptent (achat ou commande click &amp; collect validée, envoi du formulaire de devis, clic sur le numéro de téléphone).</li>
<li><strong>Pages de destination</strong> : quelles pages font entrer les visiteurs organiques et quelles sont leurs performances.</li>
<li><strong>Association Search Console – GA4</strong> : une fois les deux outils associés (dans l'administration de GA4), des rapports Search Console sont disponibles dans GA4, ce qui permet de rapprocher requêtes et comportements. Cette collection de rapports doit parfois être publiée dans la bibliothèque de rapports pour apparaître dans le menu.</li>
</ul>
<blockquote><strong>Cadre réglementaire :</strong> en France, la mesure d'audience avec GA4 nécessite en principe le recueil du consentement de l'internaute (bandeau cookies conforme aux recommandations de la CNIL). Une partie des visiteurs refusant les cookies, GA4 sous-estime le trafic réel ; la Search Console, qui mesure côté Google, n'est pas affectée de la même façon. C'est une raison supplémentaire de croiser les sources plutôt que d'en attendre des chiffres identiques.</blockquote>

<h3>4. Le suivi de positions</h3>
<p>Un <strong>outil de suivi de positions</strong> (module de Semrush, d'Ubersuggest, ou autres outils spécialisés) relève à intervalle régulier la position du site sur une liste de mots-clés définie, pour une localisation et un appareil donnés. Intérêts : suivre précisément les requêtes stratégiques, se comparer à des concurrents, observer l'effet d'une mise à jour.</p>
<p>Précautions :</p>
<ul>
<li>pour le local, paramétrer la <strong>ville</strong> (Nantes), car les résultats varient fortement selon le lieu ;</li>
<li>une position est un instantané : regarder les tendances sur plusieurs semaines ;</li>
<li>une bonne position ne signifie pas des clics si la SERP est occupée par des annonces, un pack local ou une réponse générée par IA : croiser avec les clics de la Search Console ;</li>
<li>Google publie plusieurs <strong>mises à jour principales</strong> (<em>core updates</em>) par an, annoncées sur son tableau de bord de l'état de la recherche (Google Search Status Dashboard) : en cas de variation brutale, vérifier d'abord si une mise à jour est en cours avant de modifier le site dans l'urgence.</li>
</ul>

<h3>5. Le suivi local</h3>
<p>Les <strong>statistiques de Google Business Profile</strong> (rubrique « Performances » de la fiche) indiquent notamment le nombre de vues de la fiche, les recherches qui l'ont fait apparaître, les appels, les demandes d'itinéraire et les clics vers le site. Pour suivre précisément les visites issues de la fiche dans GA4, on peut ajouter des <strong>paramètres UTM</strong> au lien du site renseigné dans la fiche (par exemple <code>?utm_source=google&amp;utm_medium=organic&amp;utm_campaign=fiche-gbp</code>).</p>

<h3>6. Le tableau de bord mensuel de Maison Lenoir</h3>
<p><em>Les valeurs cibles sont à fixer à partir de la situation réelle relevée au départ (état initial) et des objectifs du projet ; les chiffres cités sont les données fictives de l'exemple.</em></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Source</th><th>État initial</th><th>Cible à 6 mois</th><th>Mois en cours</th><th>Commentaire / action</th></tr>
<tr><td>Clics organiques hors marque</td><td>Search Console</td><td>À relever</td><td>Progression fixée selon l'état initial</td><td></td><td></td></tr>
<tr><td>Impressions sur le groupe « traiteur entreprise »</td><td>Search Console (filtre requêtes)</td><td>À relever</td><td>À fixer</td><td></td><td></td></tr>
<tr><td>Position des 10 requêtes prioritaires (Nantes, mobile)</td><td>Outil de suivi de positions</td><td>À relever</td><td>À fixer par requête</td><td></td><td></td></tr>
<tr><td>Pages stratégiques indexées</td><td>Search Console – inspection d'URL</td><td>À relever</td><td>100 % des pages stratégiques</td><td></td><td></td></tr>
<tr><td>Sessions Organic Search</td><td>GA4</td><td>À relever</td><td>À fixer</td><td></td><td></td></tr>
<tr><td>Commandes click &amp; collect issues de la recherche organique</td><td>GA4 (événement clé) + back-office</td><td>À relever</td><td>Part organique de l'objectif global de 120 commandes en ligne par mois au 6e mois</td><td></td><td></td></tr>
<tr><td>Demandes de devis traiteur</td><td>GA4 (événement clé) + boîte mail</td><td>À relever</td><td>Contribution à l'objectif global de 25 devis B2B par mois dès le 4e mois</td><td></td><td></td></tr>
<tr><td>Appels et itinéraires depuis la fiche</td><td>Google Business Profile</td><td>À relever</td><td>À fixer</td><td></td><td></td></tr>
<tr><td>Nombre d'avis reçus / note / taux de réponse</td><td>Google Business Profile</td><td>Environ 210 avis, note 4,6</td><td>Trajectoire vers 300 avis à 12 mois ; réponse à 100 % des avis sous une semaine</td><td></td><td></td></tr>
<tr><td>Core Web Vitals mobile (URL « Bonne »)</td><td>Search Console</td><td>À relever</td><td>Toutes les URL en « Bonne »</td><td></td><td></td></tr>
</table>
<h4>Rituel de suivi recommandé</h4>
<ul>
<li><strong>Chaque semaine</strong> (15 minutes) : avis à traiter, alertes de la Search Console, fiche à jour.</li>
<li><strong>Chaque mois</strong> (1 heure) : remplissage du tableau de bord, 3 actions correctives décidées.</li>
<li><strong>Chaque trimestre</strong> : revue des liens, des Core Web Vitals, de l'audit sémantique (nouvelles requêtes apparues).</li>
<li><strong>Chaque année</strong> : audit technique complet et révision du plan d'action.</li>
</ul>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Ne suivre que des positions, sans mesurer les clics ni les commandes.</li>
<li>Comparer décembre à novembre sans tenir compte de la saisonnalité.</li>
<li>Attendre des chiffres identiques entre GA4 et la Search Console : les deux outils ne mesurent pas la même chose (clics côté Google contre sessions mesurées sur le site après consentement).</li>
<li>Ne pas configurer d'événements clés : impossible alors de relier le SEO au chiffre d'affaires.</li>
<li>Réagir dans l'urgence à une baisse ponctuelle.</li>
</ul>
<blockquote><strong>À retenir :</strong> on suit la visibilité (impressions, positions), le trafic (clics, sessions organiques) et surtout les résultats (commandes, devis, appels). La Search Console mesure ce qui se passe dans Google, GA4 ce qui se passe sur le site, Google Business Profile ce qui se passe sur la fiche. Un tableau de bord mensuel, avec un état initial et des cibles, transforme ces données en décisions.</blockquote>
`,
      },
      {
        title: "5.9 – Le référencement à l'heure des réponses générées par l'IA",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Comprendre ce que sont les AI Overviews de Google et leurs effets possibles sur le trafic.</li>
<li>Savoir comment les assistants conversationnels utilisent le web.</li>
<li>Adopter une posture prudente et fondée sur des principes durables face à un domaine en évolution rapide.</li>
</ul>

<h3>1. Les AI Overviews (aperçus générés par IA)</h3>
<p>Google affiche, pour certaines requêtes, un <strong>aperçu généré par intelligence artificielle</strong> (<em>AI Overview</em>) en haut de la page de résultats : une synthèse rédigée par un modèle de Google, accompagnée de liens vers les pages utilisées comme sources. Lancée aux États-Unis en mai 2024, la fonctionnalité a ensuite été étendue à d'autres pays et langues selon un calendrier propre à chaque marché. Google a également introduit un mode de recherche conversationnel (« AI Mode ») dans certains pays. <strong>La disponibilité de ces fonctionnalités en France et en français, et leur forme, évoluent : vérifiez-les sur vos propres requêtes au moment où vous travaillez.</strong></p>
<p>Ce que Google indique dans sa documentation destinée aux propriétaires de sites :</p>
<ul>
<li>il n'existe <strong>pas d'exigence technique supplémentaire</strong> ni de balisage spécial pour apparaître comme source d'un aperçu IA : une page doit être indexée et éligible à l'affichage d'un extrait dans les résultats classiques ;</li>
<li>les bonnes pratiques SEO habituelles (contenu utile, technique saine, données structurées fidèles au contenu visible) restent valables ;</li>
<li>les clics et impressions issus de ces fonctionnalités sont comptabilisés dans le rapport <strong>Performances</strong> de la Search Console (type de recherche « Web »), sans y être isolés dans un filtre dédié ;</li>
<li>les contrôles d'aperçu existants (<code>nosnippet</code>, <code>data-nosnippet</code>, <code>max-snippet</code>) permettent de limiter l'utilisation du contenu d'une page dans les extraits, y compris ces aperçus, au risque de réduire sa visibilité.</li>
</ul>

<h3>2. Effet sur le trafic : ce que l'on sait et ce que l'on ne sait pas</h3>
<p>Plusieurs études menées par des éditeurs d'outils et des médias ont fait état d'une <strong>baisse du taux de clic</strong> vers les sites sur les requêtes où un aperçu IA est affiché, l'internaute trouvant une partie de la réponse directement dans la page de résultats. Google, de son côté, affirme que les liens présents dans les aperçus reçoivent des clics de qualité. Les résultats varient beaucoup selon le type de requête, le secteur et la méthodologie : <strong>aucun chiffre général ne doit être transposé tel quel à votre activité</strong>.</p>
<p>Lecture pratique pour une TPE locale :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type de requête</th><th>Exposition probable à une réponse générée</th><th>Conséquence pour Maison Lenoir</th></tr>
<tr><td>Informationnelle générale (« différence levain levure »)</td><td>Forte : la réponse peut être synthétisée</td><td>Moins de clics possibles sur les articles de conseils ; leur rôle de crédibilité et de source reste utile.</td></tr>
<tr><td>Locale et transactionnelle (« commander bûche Nantes »)</td><td>Le pack local, les fiches et les pages commerciales restent déterminants</td><td>Priorité maintenue sur la fiche Google Business Profile, les avis et les pages produits.</td></tr>
<tr><td>Commerciale B2B (« traiteur séminaire Nantes avis »)</td><td>Variable</td><td>Pages traiteur riches en informations vérifiables (formules, délais, références) pour pouvoir être citées.</td></tr>
</table>
<p>D'où l'importance, dans le suivi (section 5.8), de mesurer les <strong>impressions</strong> et les <strong>résultats business</strong>, et pas seulement les clics : une baisse de CTR à impressions stables peut traduire un changement de la SERP plutôt qu'une perte de positionnement.</p>

<h3>3. Les assistants conversationnels et leurs robots</h3>
<p>Des assistants comme ChatGPT, Microsoft Copilot, Perplexity ou Gemini peuvent effectuer des recherches sur le web pour répondre et citer leurs sources. Ils s'appuient sur leurs propres robots d'exploration et/ou sur des index de moteurs de recherche ; Microsoft Copilot s'appuie notamment sur Bing. Quelques repères vérifiables :</p>
<ul>
<li>les éditeurs publient le nom de leurs robots (par exemple <code>GPTBot</code> et <code>OAI-SearchBot</code> pour OpenAI, <code>PerplexityBot</code> pour Perplexity), que l'on peut autoriser ou bloquer dans <code>robots.txt</code>, avec des effets distincts selon le robot (entraînement des modèles ou recherche) décrits dans leur documentation ;</li>
<li>Google propose le jeton <code>Google-Extended</code>, qui permet de refuser l'utilisation du contenu pour l'entraînement et l'ancrage de ses modèles Gemini ; selon Google, il n'a pas d'effet sur l'exploration, l'indexation ni le classement dans la recherche Google, et ne concerne pas les AI Overviews, qui relèvent de la recherche ;</li>
<li>des propositions comme le fichier <code>llms.txt</code> circulent ; à la date de rédaction, Google n'indique pas l'utiliser, et il ne constitue pas un standard reconnu de façon générale.</li>
</ul>

<h3>4. Ce qu'il est raisonnable de faire</h3>
<p>Le domaine évolue très vite et de nombreuses promesses (« GEO », « référencement garanti dans ChatGPT ») ne reposent sur aucune documentation officielle. Une posture prudente consiste à miser sur ce qui sert à la fois les moteurs classiques, les réponses générées et les clients :</p>
<ol>
<li><strong>Rester indexable et bien référencé dans Google et Bing</strong> : c'est la base sur laquelle s'appuient de nombreux assistants.</li>
<li><strong>Publier des informations factuelles, précises et à jour</strong> : prix, délais, horaires, zone de livraison, allergènes, formules ; un assistant ne peut pas citer une information qui n'existe pas sur le site.</li>
<li><strong>Structurer clairement</strong> : questions-réponses lisibles, intertitres explicites, tableaux simples, données structurées fidèles.</li>
<li><strong>Soigner la cohérence de l'entité</strong> : mêmes nom, adresse, téléphone et description sur le site, la fiche, les annuaires et les réseaux.</li>
<li><strong>Développer la notoriété réelle</strong> : avis, presse locale, mentions par des partenaires ; ces signaux nourrissent aussi les réponses.</li>
<li><strong>Décider en connaissance de cause</strong> d'autoriser ou non certains robots d'IA dans robots.txt, en sachant qu'un blocage peut réduire la présence dans les réponses de l'assistant concerné.</li>
<li><strong>Observer</strong> : tester régulièrement quelques questions types (« où commander une bûche artisanale à Nantes ? ») dans les principaux assistants, noter si et comment l'entreprise apparaît, et repérer le trafic issu de ces services dans GA4 (sources de type <em>referral</em>).</li>
</ol>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Payer pour des promesses de « positionnement dans les IA » sans méthode vérifiable.</li>
<li>Bloquer tous les robots par principe, ou au contraire tous les autoriser sans réflexion.</li>
<li>Abandonner les contenus informatifs alors qu'ils servent la crédibilité et peuvent être cités comme sources.</li>
<li>Présenter dans un dossier des chiffres d'impact de l'IA sur le trafic sans source précise ni date.</li>
</ul>
<blockquote><strong>À retenir :</strong> les AI Overviews et les assistants modifient la page de résultats et peuvent réduire certains clics, surtout sur les requêtes informationnelles. Google n'exige aucun balisage spécial : les fondamentaux du SEO restent la meilleure préparation. Pour une TPE locale, la fiche Google Business Profile, des informations factuelles à jour et une notoriété réelle restent prioritaires. Sur ce sujet mouvant, on s'en tient à la documentation officielle et on teste soi-même.</blockquote>
`,
      },
      {
        title: "5.10 – Ce que le formateur évaluera dans le projet final",
        content: `
<h3>Rappel des modalités d'évaluation</h3>
<p>L'évaluation de la formation est <strong>interne</strong>. Chaque participant construit un <strong>projet webmarketing pour sa propre entreprise</strong>, présenté sous la forme d'un <strong>dossier écrit</strong> puis d'une <strong>présentation orale au formateur</strong>. La formation est sanctionnée par une <strong>attestation de fin de formation</strong>. Le volet « référencement naturel » du projet reprend la démarche de ce chapitre.</p>

<h3>Ce que le formateur attend pour le volet référencement naturel</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Attendu</th><th>Ce qui est observé</th><th>Écueil à éviter</th></tr>
<tr><td>Un diagnostic de départ</td><td>État initial réel : pages indexées, requêtes et clics de la Search Console, état de la fiche Google Business Profile, Core Web Vitals, principaux constats techniques et éditoriaux.</td><td>Un diagnostic générique, qui pourrait s'appliquer à n'importe quelle entreprise.</td></tr>
<tr><td>Un audit sémantique argumenté</td><td>Tableau de mots-clés avec intention, estimation de volume (source et date citées), saisonnalité, page cible et priorité.</td><td>Une liste de mots-clés sans intention ni page cible ; des volumes présentés comme exacts.</td></tr>
<tr><td>Des optimisations techniques priorisées</td><td>Actions concrètes et réalistes (images, HTTPS, sitemap, redirections, données structurées), avec la justification de chaque priorité.</td><td>Une liste exhaustive non hiérarchisée, ou des notions obsolètes (FID, balise meta keywords).</td></tr>
<tr><td>Une stratégie éditoriale</td><td>Pages à optimiser ou à créer, exemples de title, méta-description et plan Hn, maillage interne.</td><td>Des textes « écrits pour Google », du bourrage de mots-clés.</td></tr>
<tr><td>Une stratégie de popularité et locale conforme</td><td>Sources de liens réalistes et éthiques, plan de collecte d'avis conforme aux règles, cohérence NAP.</td><td>Achat de liens, avis incités ou rédigés par l'entourage.</td></tr>
<tr><td>Un dispositif de suivi</td><td>Indicateurs de visibilité, de trafic et de résultats, sources, cibles et fréquence de revue.</td><td>Ne suivre que des positions.</td></tr>
<tr><td>Un plan d'action réaliste</td><td>Calendrier, responsables, temps ou budget, cohérence avec la taille de l'entreprise et avec les autres leviers du projet (publicité, réseaux sociaux, e-mailing).</td><td>Un plan irréalisable avec les ressources de l'entreprise.</td></tr>
<tr><td>Une présentation orale claire</td><td>Capacité à expliquer ses choix, à justifier les priorités, à répondre aux questions sur le fonctionnement des moteurs et sur les risques.</td><td>Réciter des définitions sans les relier au projet.</td></tr>
</table>
<h3>Conseils pour le dossier et la présentation</h3>
<ul>
<li>Utiliser les <strong>données réelles</strong> de votre entreprise ; si un outil n'est pas encore installé (Search Console, GA4), l'indiquer et prévoir sa mise en place comme première action, plutôt que d'inventer des chiffres.</li>
<li>Citer la source et la date de chaque donnée (outil, période).</li>
<li>Montrer une ou deux pages « avant / après » (title, méta-description, plan Hn) : c'est très parlant à l'oral.</li>
<li>Relier chaque action à un objectif commercial du projet.</li>
</ul>
<blockquote><strong>À retenir :</strong> le formateur évalue une démarche complète et cohérente appliquée à votre entreprise : diagnostic réel, audit sémantique argumenté, actions techniques, éditoriales, locales et de popularité priorisées et conformes aux règles, suivi mesurable et plan d'action réaliste, puis votre capacité à justifier ces choix à l'oral.</blockquote>
`,
      },
      {
        title: "5.11 – Quiz de fin de chapitre",
        content: `
<p>Répondez aux dix questions, puis consultez le corrigé. Une seule réponse est correcte par question.</p>

<h4>Question 1</h4>
<p>Dans quel ordre un moteur de recherche traite-t-il une page ?</p>
<ul>
<li>A. Classement, exploration, indexation</li>
<li>B. Exploration, indexation, classement</li>
<li>C. Indexation, exploration, classement</li>
<li>D. Soumission du sitemap, classement, indexation</li>
</ul>

<h4>Question 2</h4>
<p>Quel indicateur a remplacé le FID parmi les Core Web Vitals en mars 2024 ?</p>
<ul>
<li>A. LCP</li>
<li>B. CLS</li>
<li>C. INP</li>
<li>D. TTFB</li>
</ul>

<h4>Question 3</h4>
<p>Vous voulez qu'une page de remerciement après commande n'apparaisse pas dans Google. Que faites-vous ?</p>
<ul>
<li>A. Je la bloque dans robots.txt</li>
<li>B. Je la laisse explorable et j'y ajoute une balise meta robots noindex</li>
<li>C. Je la retire du sitemap, cela suffit</li>
<li>D. Je mets une balise canonique vers l'accueil</li>
</ul>

<h4>Question 4</h4>
<p>La requête « commander gâteau anniversaire nantes » relève principalement d'une intention :</p>
<ul>
<li>A. informationnelle</li>
<li>B. navigationnelle</li>
<li>C. transactionnelle</li>
<li>D. de marque</li>
</ul>

<h4>Question 5</h4>
<p>Quelle affirmation sur la méta-description est exacte ?</p>
<ul>
<li>A. C'est un facteur de classement majeur</li>
<li>B. Elle n'influence pas le classement mais peut améliorer le taux de clic, et Google peut la réécrire</li>
<li>C. Elle doit contenir au moins cinq fois le mot-clé principal</li>
<li>D. Elle est inutile depuis l'arrivée des AI Overviews</li>
</ul>

<h4>Question 6</h4>
<p>Quel est le nom correct à indiquer sur la fiche Google Business Profile de Maison Lenoir ?</p>
<ul>
<li>A. Maison Lenoir</li>
<li>B. Maison Lenoir – Meilleure boulangerie de Nantes</li>
<li>C. Boulangerie Pâtisserie Traiteur Nantes Maison Lenoir</li>
<li>D. Maison Lenoir Galette Bûche Nantes</li>
</ul>

<h4>Question 7</h4>
<p>Laquelle de ces pratiques est conforme aux règles de Google sur les avis ?</p>
<ul>
<li>A. Offrir un croissant en échange d'un avis 5 étoiles</li>
<li>B. Demander aux salariés de laisser un avis</li>
<li>C. Envoyer une demande d'avis à tous les clients après leur commande, et répondre à tous les avis</li>
<li>D. N'envoyer la demande d'avis qu'aux clients qui se sont déclarés satisfaits</li>
</ul>

<h4>Question 8</h4>
<p>Un partenaire vous propose un lien sur son blog contre paiement. Quelle est la bonne pratique ?</p>
<ul>
<li>A. Accepter, à condition que l'ancre soit « traiteur entreprise Nantes »</li>
<li>B. Accepter uniquement si le lien est qualifié en rel="sponsored" (ou nofollow) et le contenu identifiable comme commercial</li>
<li>C. Accepter, Google ne peut pas savoir qu'il est payé</li>
<li>D. Refuser tout lien, même gratuit, venant d'un partenaire</li>
</ul>

<h4>Question 9</h4>
<p>Dans la Search Console, une page importante a le statut « Explorée, actuellement non indexée ». Quelle est la première piste ?</p>
<ul>
<li>A. Demander l'indexation dix fois de suite</li>
<li>B. Améliorer la qualité et la valeur ajoutée du contenu et renforcer les liens internes vers la page</li>
<li>C. Bloquer la page dans robots.txt puis la débloquer</li>
<li>D. Acheter des liens vers la page</li>
</ul>

<h4>Question 10</h4>
<p>À propos des AI Overviews de Google, quelle affirmation est conforme à la documentation de Google ?</p>
<ul>
<li>A. Il faut ajouter un balisage schema.org spécial « AIOverview » pour y apparaître</li>
<li>B. Il faut bloquer Google-Extended pour en être exclu du classement</li>
<li>C. Aucune exigence technique supplémentaire n'est requise : la page doit être indexée et éligible à un extrait ; les données apparaissent dans le rapport Performances</li>
<li>D. Seuls les sites qui paient Google Ads peuvent y être cités</li>
</ul>

<h3>Corrigé et explications</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>B</td><td>Les robots explorent (crawl) les pages, Google les analyse et décide de les indexer, puis les classe au moment de la requête. Le sitemap aide à la découverte mais n'est pas une étape obligatoire.</td></tr>
<tr><td>2</td><td>C</td><td>L'INP (Interaction to Next Paint) a remplacé le FID le 12 mars 2024. Il mesure la réactivité sur l'ensemble des interactions de la visite ; seuil « Bon » : 200 ms ou moins.</td></tr>
<tr><td>3</td><td>B</td><td>robots.txt bloque l'exploration, pas l'indexation : bloquée, la page pourrait rester indexée et le robot ne lirait jamais la consigne noindex. Le retrait du sitemap ne suffit pas, et une canonique vers l'accueil serait incohérente.</td></tr>
<tr><td>4</td><td>C</td><td>« Commander » exprime un acte d'achat ; la page cible est la catégorie click &amp; collect « Gâteaux d'anniversaire ».</td></tr>
<tr><td>5</td><td>B</td><td>Google indique que la méta-description n'est pas un facteur de classement ; elle sert l'extrait affiché et donc le taux de clic, et Google la remplace souvent par un extrait de la page.</td></tr>
<tr><td>6</td><td>A</td><td>Les consignes de Google imposent le nom réel de l'enseigne. Ajouter des mots-clés ou des slogans est interdit et peut entraîner la suspension de la fiche.</td></tr>
<tr><td>7</td><td>C</td><td>Les avis incités, les avis de salariés (conflit d'intérêts) et la sélection des seuls clients satisfaits (review gating) sont contraires aux règles de Google ; les faux avis sont en outre une pratique commerciale trompeuse.</td></tr>
<tr><td>8</td><td>B</td><td>Un lien rémunéré qui transmet du PageRank relève du spam de liens. Qualifié en sponsored (ou nofollow) et identifié comme commercial pour le lecteur, il est acceptable et peut apporter du trafic.</td></tr>
<tr><td>9</td><td>B</td><td>Ce statut signale le plus souvent une valeur jugée insuffisante ou une page peu reliée. Les demandes répétées n'accélèrent rien ; l'achat de liens est contraire aux règles.</td></tr>
<tr><td>10</td><td>C</td><td>Google indique qu'aucun balisage spécial n'est nécessaire ; les pages doivent être indexées et éligibles à un extrait. Google-Extended concerne l'utilisation des contenus par Gemini, pas le classement dans la recherche.</td></tr>
</table>
<p><strong>Barème indicatif :</strong> 9 ou 10 bonnes réponses : notions maîtrisées ; 6 à 8 : relire les sections correspondant aux erreurs ; moins de 6 : reprendre le chapitre avant le cas pratique.</p>
`,
      },
      {
        title: "5.12 – Cas pratique : proposer un plan d'action dédié au référencement naturel",
        content: `
<h3>Consigne</h3>
<p>La dirigeante de <strong>Maison Lenoir</strong> vous confie la mission de proposer un <strong>plan d'action de référencement naturel sur 6 mois</strong>, à démarrer en octobre. Ressources disponibles : la dirigeante peut consacrer environ 2 heures par semaine au projet, la vendeuse chargée des réseaux sociaux 2 heures par semaine ; un budget limité permet de faire appel ponctuellement au prestataire qui a créé le site (quelques jours de travail technique au total).</p>
<p><strong>Éléments de contexte :</strong></p>
<ul>
<li>Chiffres clés (fictifs) : 780 k€ HT de chiffre d'affaires dont 31 k€ HT de traiteur ; note Google 4,6 sur environ 210 avis ; environ 1 900 abonnés Instagram. Objectifs du projet : 25 devis B2B par mois dès le 4e mois, 120 commandes en ligne par mois au 6e mois, 300 avis à 12 mois, pour un budget webmarketing annuel de 19 200 € HT tous leviers confondus.</li>
<li>Le site apparaît sur le nom de l'enseigne, mais très peu sur les requêtes génériques.</li>
<li>La Search Console a été installée par le prestataire sur son propre compte ; la dirigeante n'y a pas accès.</li>
<li>GA4 est installé mais aucun événement clé n'est configuré.</li>
<li>La fiche Google Business Profile existe : nom correct, catégorie « Boulangerie » seule, horaires des jours fériés non renseignés, 10 photos anciennes, des avis sans réponse.</li>
<li>PageSpeed Insights signale un LCP mauvais sur mobile (image d'accueil très lourde).</li>
<li>Les fiches produits ont des titles génériques et des URL en <code>?id=</code>.</li>
<li>La page « Traiteur entreprises » contient trois lignes de texte et un numéro de téléphone.</li>
<li>Il n'existe aucune page pour la galette des rois ni pour les bûches.</li>
<li>Le meunier partenaire et deux clients B2B fidèles ont des sites internet.</li>
</ul>
<p><strong>Travail demandé :</strong></p>
<ol>
<li>Rédigez un diagnostic synthétique en distinguant technique, contenu, local et popularité.</li>
<li>Établissez un extrait d'audit sémantique (au moins 6 groupes de requêtes) avec intention, page cible et priorité.</li>
<li>Proposez un plan d'action chronologique sur 6 mois (action, responsable, échéance, indicateur).</li>
<li>Rédigez le title, la méta-description et le plan Hn de la page « Traiteur entreprises ».</li>
<li>Définissez les indicateurs de suivi et la fréquence de revue.</li>
<li>Identifiez les risques et les pratiques à éviter.</li>
</ol>

<h3>Corrigé détaillé</h3>
<h4>1. Diagnostic synthétique</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Pilier</th><th>Points forts</th><th>Points faibles</th><th>Enjeu</th></tr>
<tr><td>Pilotage</td><td>Outils installés (Search Console, GA4)</td><td>Pas d'accès propriétaire à la Search Console ; aucun événement clé dans GA4</td><td>Impossible de mesurer quoi que ce soit : à régler en premier.</td></tr>
<tr><td>Technique</td><td>Site responsive, HTTPS (à confirmer)</td><td>LCP mauvais sur mobile ; URL produits en ?id= ; titles génériques</td><td>Expérience mobile dégradée sur une cible très mobile ; pages produits peu compréhensibles.</td></tr>
<tr><td>Contenu</td><td>Offre réelle riche et différenciante (levain, farines régionales, traiteur)</td><td>Page traiteur indigente ; pas de pages saisonnières ; pas de contenus de conseil</td><td>Le site ne répond pas aux requêtes à plus forte valeur (B2B, saisonniers).</td></tr>
<tr><td>Local</td><td>Fiche existante au nom correct</td><td>Catégories incomplètes, horaires exceptionnels absents, photos anciennes, avis sans réponse</td><td>Levier le plus rapide pour un commerce de proximité.</td></tr>
<tr><td>Popularité</td><td>Relations réelles (meunier, clients B2B)</td><td>Peu de liens entrants connus</td><td>Liens naturels et pertinents faciles à obtenir.</td></tr>
</table>

<h4>2. Extrait d'audit sémantique</h4>
<p><em>Volumes : à relever dans le Planificateur de mots-clés et un second outil à la date de l'audit ; les priorités ci-dessous reposent sur l'intention et la valeur business.</em></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Groupe de requêtes</th><th>Intention</th><th>Page cible</th><th>Priorité</th><th>Justification</th></tr>
<tr><td>traiteur entreprise nantes, plateau petit déjeuner entreprise nantes</td><td>Commerciale / transactionnelle</td><td>Traiteur entreprises (refonte) + sous-pages formules</td><td>1</td><td>Panier moyen élevé, objectif de développement prioritaire, page existante à enrichir.</td></tr>
<tr><td>bûche de noël artisanale nantes</td><td>Transactionnelle saisonnière</td><td>Nouvelle page permanente « Bûches de Noël »</td><td>1</td><td>Pic de décembre : la page doit être en ligne et indexée dès début novembre.</td></tr>
<tr><td>galette des rois nantes</td><td>Transactionnelle saisonnière</td><td>Nouvelle page permanente « Galette des rois »</td><td>1</td><td>Pic de janvier : publication début décembre au plus tard.</td></tr>
<tr><td>gâteau anniversaire sur commande nantes</td><td>Transactionnelle</td><td>Catégorie click &amp; collect « Gâteaux d'anniversaire »</td><td>2</td><td>Demande toute l'année ; page existante à optimiser.</td></tr>
<tr><td>boulangerie artisanale nantes, boulangerie levain nantes</td><td>Locale</td><td>Accueil + fiche Google Business Profile</td><td>2</td><td>Le pack local est déterminant ; travail surtout sur la fiche.</td></tr>
<tr><td>combien de viennoiseries par personne réunion, organiser petit déjeuner entreprise</td><td>Informationnelle</td><td>Article guide relié à la page traiteur</td><td>3</td><td>Attire les décideurs B2B en amont, contenu citable pour le netlinking.</td></tr>
<tr><td>conserver pain au levain</td><td>Informationnelle</td><td>Article de conseil</td><td>3</td><td>Crédibilité et expérience ; exposé aux réponses générées par IA, donc non prioritaire.</td></tr>
</table>

<h4>3. Plan d'action sur 6 mois</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Période</th><th>Action</th><th>Responsable</th><th>Indicateur de réalisation</th></tr>
<tr><td>Octobre – semaine 1</td><td>Obtenir l'accès propriétaire à la Search Console (le prestataire ajoute la dirigeante comme propriétaire, ou nouvelle propriété de domaine validée par DNS) ; associer la Search Console à GA4 ; ouvrir Bing Webmaster Tools par import</td><td>Dirigeante + prestataire</td><td>Accès propriétaire effectif</td></tr>
<tr><td>Octobre – semaine 1</td><td>Configurer les événements clés GA4 : commande click &amp; collect validée, envoi du formulaire de devis, clic sur le téléphone</td><td>Prestataire</td><td>Événements visibles dans GA4</td></tr>
<tr><td>Octobre – semaine 2</td><td>Relever l'état initial (tableau de bord section 5.8) et finaliser l'audit sémantique avec volumes sourcés</td><td>Dirigeante</td><td>Tableau de bord rempli</td></tr>
<tr><td>Octobre</td><td>Fiche Google Business Profile : catégories secondaires réelles (pâtisserie, traiteur), horaires exceptionnels de fin d'année, 15 photos récentes, produits, réponse à tous les avis en attente</td><td>Vendeuse réseaux sociaux, validation dirigeante</td><td>Fiche complète, 100 % des avis répondus</td></tr>
<tr><td>Octobre</td><td>Mettre en place la demande d'avis : carte QR code au comptoir, lien dans l'e-mail de confirmation click &amp; collect, message après prestation traiteur ; règle de réponse sous une semaine</td><td>Vendeuse</td><td>Dispositif en place</td></tr>
<tr><td>Octobre – novembre</td><td>Technique : optimiser l'image d'accueil et les images produits, retirer le lazy loading de l'image principale ; activer les URL lisibles avec redirections 301 ; nettoyer le sitemap ; ajouter les données structurées Bakery, Product, BreadcrumbList</td><td>Prestataire</td><td>LCP mobile amélioré (données de terrain à suivre sur 28 jours) ; test des résultats enrichis valide</td></tr>
<tr><td>Novembre – début</td><td>Créer la page permanente « Bûches de Noël » (photos réelles, parfums, tailles, prix, dates de retrait), liens depuis l'accueil, inspection d'URL et demande d'indexation</td><td>Dirigeante + pâtissier pour le contenu</td><td>Page indexée</td></tr>
<tr><td>Novembre</td><td>Refondre la page « Traiteur entreprises » et créer les sous-pages formules (voir point 4) ; formulaire de devis court</td><td>Dirigeante, intégration prestataire</td><td>Pages publiées et indexées</td></tr>
<tr><td>Novembre</td><td>Réécrire les titles et méta-descriptions de toutes les catégories et des 20 produits principaux</td><td>Dirigeante</td><td>Titles uniques à 100 %</td></tr>
<tr><td>Début décembre</td><td>Créer la page permanente « Galette des rois » ; post Google Business Profile « commandes ouvertes » ; communiqué à la presse locale si actualité réelle (ex. galette avec un producteur régional)</td><td>Dirigeante, vendeuse</td><td>Page indexée ; retombées presse suivies</td></tr>
<tr><td>Décembre</td><td>Netlinking relationnel : lien depuis le site du meunier, citations par les deux clients B2B, annuaires professionnels pertinents ; vérifier la cohérence NAP partout</td><td>Dirigeante</td><td>Liens obtenus consignés dans le tableau de suivi</td></tr>
<tr><td>Janvier</td><td>Publier l'article guide « Organiser un petit-déjeuner d'entreprise » relié aux pages traiteur ; le proposer à des réseaux d'entreprises locaux</td><td>Dirigeante</td><td>Article publié, liens internes en place</td></tr>
<tr><td>Février</td><td>Bilan à 4-5 mois : comparer l'état initial, identifier les pages en position 5 à 20 à renforcer, décider des actions du semestre suivant (article levain, page gâteaux sans gluten si offre validée)</td><td>Dirigeante</td><td>Bilan rédigé, nouveau plan</td></tr>
<tr><td>Chaque mois</td><td>Tableau de bord, 3 actions correctives ; chaque semaine : avis et alertes</td><td>Dirigeante, vendeuse</td><td>Tableau à jour</td></tr>
</table>
<p><strong>Logique de priorisation :</strong> d'abord la mesure (sans elle, aucun bilan possible), puis les leviers rapides et à fort impact pour un commerce local (fiche, avis), ensuite la technique qui conditionne l'expérience mobile, puis les pages à forte valeur dans l'ordre du calendrier commercial (bûches avant galettes), enfin la popularité et les contenus d'information.</p>

<h4>4. Page « Traiteur entreprises »</h4>
<ul>
<li><strong>URL :</strong> <code>/traiteur-entreprises/</code></li>
<li><strong>Title :</strong> Traiteur pour entreprises à Nantes : petit-déjeuner, buffets | Maison Lenoir</li>
<li><strong>Méta-description :</strong> Plateaux petit-déjeuner, viennoiseries et buffets faits maison pour vos réunions et séminaires à Nantes. Formules, délais et devis en ligne. <em>(Mentionner la livraison et un délai de réponse seulement s'ils sont réellement assurés.)</em></li>
<li><strong>h1 :</strong> Traiteur pour entreprises à Nantes : petit-déjeuners, buffets et pauses gourmandes</li>
<li><strong>h2 :</strong> Nos formules pour vos réunions et séminaires (h3 : Plateaux petit-déjeuner ; Buffets salés et sucrés ; Pauses café et goûters)</li>
<li><strong>h2 :</strong> Comment commander : délais, quantités minimales, devis</li>
<li><strong>h2 :</strong> Livraison ou retrait</li>
<li><strong>h2 :</strong> Allergènes et régimes particuliers</li>
<li><strong>h2 :</strong> Ils nous font confiance (avec l'accord des clients cités)</li>
<li><strong>h2 :</strong> Questions fréquentes</li>
<li><strong>h2 :</strong> Demander un devis</li>
<li><strong>Maillage :</strong> liens depuis l'accueil, le menu, le pied de page et l'article guide ; liens vers chaque formule et vers le formulaire.</li>
<li><strong>Preuves :</strong> photos réelles de plateaux, présentation de l'équipe, avis de clients B2B authentiques.</li>
</ul>

<h4>5. Indicateurs et fréquence de revue</h4>
<ul>
<li><strong>Visibilité :</strong> impressions hors marque et sur les groupes traiteur et saisonniers (Search Console, comparaison année sur année dès que l'historique le permet) ; positions des 10 requêtes prioritaires paramétrées sur Nantes et mobile.</li>
<li><strong>Trafic :</strong> clics hors marque, sessions Organic Search, pages d'entrée (Search Console, GA4).</li>
<li><strong>Résultats :</strong> commandes click &amp; collect et demandes de devis issues de la recherche organique (événements clés GA4 recoupés avec le back-office) ; appels, itinéraires et clics depuis la fiche (statistiques Google Business Profile, lien UTM).</li>
<li><strong>Qualité :</strong> pages stratégiques indexées, URL « Bonne » en Core Web Vitals mobile, taux de réponse aux avis.</li>
<li><strong>Fréquence :</strong> hebdomadaire (avis, alertes), mensuelle (tableau de bord), trimestrielle (liens, technique), bilan à 6 mois.</li>
</ul>

<h4>6. Risques et pratiques à éviter</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Risque</th><th>Prévention</th></tr>
<tr><td>Perte de trafic lors du passage aux URL lisibles</td><td>Tableau de correspondance et redirections 301 directes, mise à jour des liens internes, suivi du rapport d'indexation et des 404.</td></tr>
<tr><td>Pages saisonnières publiées trop tard</td><td>Calendrier éditorial calé sur les pics de demande ; URL permanentes réactivées chaque année.</td></tr>
<tr><td>Manque de temps de l'équipe</td><td>Actions découpées en tâches de moins de 2 heures, rituels courts, prestataire mobilisé sur la technique uniquement.</td></tr>
<tr><td>Tentation de raccourcis</td><td>Pas d'achat de liens ni d'avis, pas de mots-clés dans le nom de la fiche, pas de pages satellites par quartier, pas de contenus générés en masse sans relecture.</td></tr>
<tr><td>Informations erronées (allergènes, prix, délais)</td><td>Validation de chaque fiche par le responsable de production ; date de mise à jour.</td></tr>
<tr><td>Dépendance au prestataire</td><td>Comptes Search Console, GA4, Google Business Profile et Bing au nom de l'entreprise ; accès du prestataire en tant qu'utilisateur.</td></tr>
<tr><td>Évolution de la page de résultats (aperçus IA)</td><td>Suivi des impressions et des résultats business, pas seulement des clics ; priorité aux pages commerciales et locales.</td></tr>
</table>
<blockquote><strong>À retenir :</strong> un plan d'action SEO crédible part d'un diagnostic réel, s'appuie sur un audit sémantique relié aux objectifs commerciaux, ordonne les actions selon leur impact, leur effort et le calendrier de l'activité, attribue chaque action à un responsable avec un indicateur, et se pilote dans la durée avec la Search Console, GA4 et Google Business Profile, dans le respect des règles des moteurs et du droit de la consommation.</blockquote>
`,
      },
    ],
  },
];
