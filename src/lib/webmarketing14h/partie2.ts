import type { CourseChapter } from "../courseContent";

export const WM14_PARTIE2: CourseChapter[] = [
  {
    title: "Chapitre 4 – C3 Élaborer le plan d'action webmarketing",
    description:
      "Décliner la stratégie webmarketing en un plan d'action opérationnel : actions par levier digital, rétroplanning et diagramme de Gantt, budget par action, accessibilité numérique des supports, introduction à l'email marketing et à Google Ads. Durée indicative : 2 heures. Module C3 du programme de formation.",
    sections: [
      {
        title: "4.1 – Du plan stratégique au plan d'action",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Distinguer clairement la stratégie (le « quoi » et le « pourquoi ») du plan d'action (le « qui fait quoi, quand, avec quels moyens »).</li>
<li>Savoir transformer un objectif SMART et un positionnement en une liste d'actions concrètes, chiffrées et datées.</li>
<li>Construire une fiche action standard réutilisable pour toutes les actions du plan.</li>
</ul>

<h3>Pourquoi un plan d'action ?</h3>
<p>Les chapitres précédents ont permis de fixer des <strong>objectifs webmarketing</strong> (compétence C1) et de définir une <strong>stratégie</strong> : cibles, personas, positionnement, message, choix des leviers (compétence C2). Une stratégie, même excellente, ne produit aucun résultat tant qu'elle n'est pas traduite en tâches exécutables. Dans une TPE, le risque principal n'est pas de mal choisir ses leviers mais de <strong>ne pas tenir dans la durée</strong> : le dirigeant est absorbé par la production, les publications s'arrêtent après trois semaines, la newsletter n'est envoyée qu'une fois, la campagne publicitaire tourne sans que personne ne regarde les résultats.</p>
<p>Le plan d'action répond à ce risque. C'est un document de pilotage qui précise, pour chaque action :</p>
<ul>
<li><strong>ce qui doit être fait</strong> (livrable précis et vérifiable) ;</li>
<li><strong>à quel objectif</strong> l'action contribue (lien explicite avec la stratégie) ;</li>
<li><strong>qui</strong> en est responsable (une seule personne, même si plusieurs y contribuent) ;</li>
<li><strong>quand</strong> elle démarre et se termine, et ce dont elle dépend ;</li>
<li><strong>combien</strong> elle coûte en argent et en temps interne ;</li>
<li><strong>comment</strong> on saura qu'elle a fonctionné (indicateur et valeur cible).</li>
</ul>

<h3>La chaîne logique : objectif → stratégie → levier → action → indicateur</h3>
<p>Chaque action du plan doit pouvoir être « remontée » jusqu'à un objectif. Si une action ne se rattache à aucun objectif, elle est soit inutile, soit le signe d'un objectif oublié. Inversement, un objectif sans action associée ne sera jamais atteint. Le tableau ci-dessous illustre cette chaîne sur l'entreprise fil rouge.</p>

<blockquote><strong>Rappel du fil rouge.</strong> Maison Lenoir est une boulangerie-pâtisserie artisanale nantaise de 6 salariés. Elle souhaite (1) développer la commande en ligne avec retrait en boutique (click &amp; collect) et (2) lancer une activité traiteur B2B (petits-déjeuners, plateaux, buffets) auprès des entreprises du quartier. Les chiffres du chapitre sont <em>des exemples pédagogiques</em> construits pour le cours, pas des données réelles de marché.</blockquote>

<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Objectif (exemple)</th><th>Choix stratégique</th><th>Levier</th><th>Action</th><th>Indicateur</th></tr>
<tr><td>Atteindre 120 commandes en ligne (click &amp; collect) par mois au 6e mois du plan (avril 2027)</td><td>Faire de la commande en ligne le réflexe des clients réguliers du quartier</td><td>Site + Google Business Profile</td><td>Mettre en ligne un module de commande avec créneaux de retrait et un lien « Commander » sur la fiche Google</td><td>Nombre de commandes/semaine ; taux de conversion du module</td></tr>
<tr><td>Idem</td><td>Idem</td><td>Email</td><td>Collecter les adresses en boutique et en ligne (avec consentement) et envoyer une lettre bimensuelle avec les nouveautés à commander</td><td>Nombre d'inscrits ; taux de clic ; commandes attribuées</td></tr>
<tr><td>Recevoir 25 demandes de devis traiteur B2B par mois dès le 4e mois (février 2027)</td><td>Se positionner comme le traiteur artisanal de proximité, réactif, pour les réunions et événements internes</td><td>Landing page + SEA</td><td>Créer une page « Traiteur entreprises Nantes » avec formulaire de devis et la pousser par une campagne Google Ads Search locale</td><td>Demandes de devis ; coût par demande (≤ 88 €) ; taux de signature</td></tr>
<tr><td>Atteindre 300 avis Google à 12 mois (environ 210 aujourd'hui, note 4,6)</td><td>Rassurer localement et renforcer la visibilité dans Google Maps</td><td>Google Business Profile</td><td>Solliciter un avis auprès de tous les clients (QR code en caisse, email après commande, carte dans les livraisons traiteur) et répondre à chaque avis</td><td>Nombre d'avis ; note moyenne ; taux de réponse</td></tr>
<tr><td>Idem</td><td>Idem</td><td>LinkedIn + partenariats</td><td>Publier une fois par semaine sur la page LinkedIn et conclure 3 partenariats (espace de coworking, association de commerçants, gestionnaire d'immeuble de bureaux)</td><td>Nombre de partenariats actifs ; demandes issues des partenaires</td></tr>
</table>

<h3>Méthode pas à pas pour passer de la stratégie au plan</h3>
<ol>
<li><strong>Repartir des objectifs chiffrés</strong> validés au chapitre 1 et les recopier en tête du plan. Ils sont la référence de toutes les décisions d'arbitrage.</li>
<li><strong>Lister les leviers retenus</strong> lors de la conception de la stratégie et, pour chacun, rappeler en une phrase son rôle dans le parcours client : faire connaître (notoriété), faire venir (trafic), convaincre (conversion), fidéliser.</li>
<li><strong>Faire un inventaire brut des actions possibles</strong> par levier (remue-méninges, sans filtre). Pour Maison Lenoir, on obtient facilement 30 à 40 idées.</li>
<li><strong>Prioriser</strong> avec une matrice impact / effort (voir ci-dessous). Une TPE ne peut pas tout faire : on retient en général une dizaine à une quinzaine d'actions sur six mois.</li>
<li><strong>Détailler chaque action retenue</strong> dans une fiche action (modèle ci-dessous).</li>
<li><strong>Ordonnancer</strong> : identifier les dépendances (on ne lance pas une campagne vers une page qui n'existe pas), placer les actions dans le temps (rétroplanning, section 4.3).</li>
<li><strong>Chiffrer</strong> : budget externe et temps interne (section 4.4), et vérifier la compatibilité avec l'enveloppe disponible.</li>
<li><strong>Intégrer l'accessibilité</strong> comme critère de qualité de chaque livrable (section 4.5), et non comme une action à part ajoutée à la fin.</li>
<li><strong>Définir les rituels de suivi</strong> : point hebdomadaire de 15 minutes, revue mensuelle des indicateurs, ajustement trimestriel du plan (ce pilotage est approfondi dans le chapitre consacré à la compétence C6).</li>
</ol>

<h3>Prioriser : la matrice impact / effort</h3>
<p>Chaque idée est notée de 1 à 3 sur deux axes : l'<strong>impact attendu</strong> sur les objectifs, et l'<strong>effort</strong> nécessaire (argent, temps, compétences). On obtient quatre familles :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th></th><th>Effort faible</th><th>Effort élevé</th></tr>
<tr><th>Impact élevé</th><td><strong>Gains rapides</strong> : à faire en premier. Ex. : compléter la fiche Google Business Profile, ajouter le lien de commande, répondre aux avis.</td><td><strong>Projets structurants</strong> : à planifier. Ex. : module click &amp; collect, landing page traiteur, campagne Google Ads.</td></tr>
<tr><th>Impact faible</th><td><strong>Bonus</strong> : à faire si le temps le permet. Ex. : story Instagram quotidienne du four.</td><td><strong>À écarter</strong> pour l'instant. Ex. : application mobile dédiée, chaîne YouTube de recettes.</td></tr>
</table>

<h3>Le modèle de fiche action</h3>
<p>La fiche action est l'unité de base du plan. Elle tient sur une demi-page et peut être tenue dans un tableur ou un outil de gestion de tâches (Trello, Notion, Asana, Airtable, Google Sheets…). Exemple rempli :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu (exemple Maison Lenoir)</th></tr>
<tr><td>Code et intitulé</td><td>A-05 – Landing page « Traiteur pour entreprises à Nantes »</td></tr>
<tr><td>Objectif rattaché</td><td>O2 – 25 demandes de devis B2B par mois dès le 4e mois (février 2027)</td></tr>
<tr><td>Cible / persona</td><td>Office manager ou assistante de direction d'une PME du quartier, organisant 2 à 4 réunions avec collation par mois</td></tr>
<tr><td>Description</td><td>Page unique : promesse, 3 formules (petit-déjeuner, plateau déjeuner, cocktail), prix indicatifs, zone et délais de livraison, photos, avis, formulaire de devis court (5 champs), numéro cliquable</td></tr>
<tr><td>Livrable vérifiable</td><td>Page en ligne, formulaire testé, conversion « demande de devis » mesurée, contrôle d'accessibilité passé</td></tr>
<tr><td>Responsable</td><td>Claire Lenoir (co-gérante) ; rédaction avec l'appui d'un freelance</td></tr>
<tr><td>Dates</td><td>Début 02/11/2026 ; mise en ligne au plus tard le 11/12/2026</td></tr>
<tr><td>Dépendances</td><td>Grille tarifaire traiteur validée (A-03) ; séance photo (A-04)</td></tr>
<tr><td>Budget</td><td>900 € HT (freelance) + 8 h de temps interne</td></tr>
<tr><td>Indicateurs et cibles</td><td>Taux de conversion visite → demande de devis ≥ 4 % ; contribution aux 25 demandes de devis mensuelles visées à partir de février 2027</td></tr>
<tr><td>Risques</td><td>Retard sur la grille tarifaire ; photos non disponibles → prévoir des photos provisoires réalisées en interne</td></tr>
</table>

<h3>Les erreurs fréquentes</h3>
<ul>
<li><strong>Confondre actions et intentions</strong> : « être plus présent sur Instagram » n'est pas une action ; « publier 3 posts par semaine selon le calendrier éditorial, le lundi, mercredi et vendredi » en est une.</li>
<li><strong>Tout lancer en même temps</strong> : on dilue l'énergie et on ne sait plus quelle action produit quel résultat.</li>
<li><strong>Oublier le temps interne</strong> : pour une TPE, c'est souvent la ressource la plus rare, bien plus que le budget.</li>
<li><strong>Nommer une équipe comme responsable</strong> : « l'équipe » n'est responsable de rien ; il faut un nom.</li>
<li><strong>Ne pas prévoir d'indicateur</strong> au moment où l'on conçoit l'action : on découvre ensuite que la mesure n'a pas été installée (balise de conversion absente, lien non suivi, pas de code promo dédié).</li>
<li><strong>Traiter l'accessibilité à la fin</strong> : corriger après coup coûte plus cher que de bien faire dès la conception.</li>
</ul>

<blockquote><strong>À retenir.</strong> Le plan d'action traduit la stratégie en tâches datées, chiffrées, attribuées et mesurables. Chaque action se rattache à un objectif, possède un responsable unique, un livrable vérifiable, un budget (argent + temps) et un indicateur. On priorise avec la matrice impact / effort et l'on commence par les gains rapides avant d'engager les projets structurants.</blockquote>
`,
      },
      {
        title: "4.2 – Les actions à prévoir par levier digital",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Connaître, pour chaque levier digital, les actions types, les prérequis et les indicateurs associés.</li>
<li>Sélectionner les actions pertinentes pour une TPE/PME selon ses objectifs et ses moyens.</li>
<li>Articuler les leviers entre eux dans un parcours client cohérent.</li>
</ul>

<h3>Panorama : les leviers et leur rôle</h3>
<p>On distingue classiquement les médias <strong>détenus</strong> (site, newsletter, comptes sociaux : l'entreprise en maîtrise le contenu), <strong>payants</strong> (publicité en ligne : on achète de la visibilité) et <strong>gagnés</strong> (avis clients, partages, articles de presse, recommandations : la visibilité est accordée par des tiers). Un plan équilibré combine les trois : les médias détenus constituent le socle, les médias payants accélèrent, les médias gagnés crédibilisent.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Levier</th><th>Rôle principal</th><th>Délai d'effet</th><th>Coût dominant</th></tr>
<tr><td>Site / landing pages</td><td>Convertir (commande, devis, contact)</td><td>Immédiat dès qu'il y a du trafic</td><td>Création puis maintenance</td></tr>
<tr><td>SEO (référencement naturel)</td><td>Attirer un trafic qualifié et durable</td><td>Plusieurs semaines à plusieurs mois</td><td>Temps (contenus, technique)</td></tr>
<tr><td>SEA (Google Ads)</td><td>Capter une demande existante, tout de suite</td><td>Immédiat ; s'arrête quand on coupe le budget</td><td>Budget média</td></tr>
<tr><td>Réseaux sociaux (organique et publicité)</td><td>Notoriété, préférence, communauté</td><td>Progressif</td><td>Temps de création ; budget média pour la publicité</td></tr>
<tr><td>Email marketing</td><td>Fidéliser, faire revenir, relancer</td><td>Rapide une fois la base constituée</td><td>Constitution de la base ; outil</td></tr>
<tr><td>Contenus</td><td>Nourrir tous les autres leviers</td><td>Progressif</td><td>Temps, éventuellement photographe / rédacteur</td></tr>
<tr><td>Avis clients et Google Business Profile</td><td>Visibilité locale et réassurance</td><td>Rapide pour la fiche ; cumulatif pour les avis</td><td>Temps (service gratuit)</td></tr>
<tr><td>Partenariats</td><td>Accéder à une audience déjà constituée</td><td>Variable</td><td>Temps relationnel ; contreparties</td></tr>
</table>

<h3>1. Site web et landing pages</h3>
<p>Le site est la destination vers laquelle convergent la plupart des autres leviers. Une <strong>landing page</strong> (page d'atterrissage) est une page conçue pour une seule cible et une seule action attendue : elle supprime les distractions (menu réduit, pas de liens hors sujet) et concentre l'argumentaire sur la conversion.</p>
<h4>Actions types</h4>
<ul>
<li>Mettre en place un parcours de commande en ligne (module de click &amp; collect intégré au site ou solution spécialisée) avec choix du créneau de retrait, paiement en ligne ou en boutique, confirmation par email.</li>
<li>Créer une landing page par offre ou par cible (ex. : « Traiteur entreprises », « Commande de gâteaux d'anniversaire », « Galette des rois à commander »).</li>
<li>Rendre visibles les éléments de réassurance : avis, labels, photos réelles, engagements (fait maison, farines locales), mentions de délais et de zone de livraison.</li>
<li>Optimiser la vitesse et l'affichage mobile : une large part des recherches locales se fait sur smartphone.</li>
<li>Installer la mesure : outil d'analyse d'audience (Google Analytics 4, Matomo…), conversions définies (commande, demande de devis, clic sur le téléphone), bandeau de gestion des cookies conforme.</li>
</ul>
<h4>Anatomie d'une landing page efficace (exemple traiteur B2B)</h4>
<ol>
<li><strong>Titre-promesse</strong> orienté bénéfice : « Petits-déjeuners et plateaux-repas artisanaux livrés dans vos bureaux à Nantes ».</li>
<li><strong>Sous-titre de preuve</strong> : « Commande la veille avant 16 h, livraison à partir de 7 h 30 dans un rayon de 3 km ».</li>
<li><strong>Bouton d'action</strong> visible sans défiler : « Demander un devis ».</li>
<li><strong>Offres</strong> présentées en 3 formules avec prix indicatifs « à partir de ».</li>
<li><strong>Réassurance</strong> : avis d'entreprises clientes (réels et vérifiables), photos, engagement qualité.</li>
<li><strong>Questions fréquentes</strong> : délais, allergènes, facturation, minimum de commande.</li>
<li><strong>Formulaire court</strong> : nom, entreprise, email professionnel, date, nombre de personnes ; mention d'information RGPD et lien vers la politique de confidentialité.</li>
</ol>
<h4>Obligations à ne pas oublier</h4>
<ul>
<li><strong>Mentions légales</strong> (identité de l'éditeur, hébergeur), <strong>politique de confidentialité</strong>, <strong>conditions générales de vente</strong> dès lors que l'on vend en ligne, information sur les <strong>allergènes</strong> des denrées proposées à la vente à distance.</li>
<li><strong>Cookies</strong> : selon les lignes directrices et recommandations de la CNIL, les traceurs non strictement nécessaires (publicité, mesure d'audience non exemptée) ne sont déposés qu'après consentement ; refuser doit être aussi simple qu'accepter (un bouton « Tout refuser » au même niveau que « Tout accepter »).</li>
<li><strong>Droit de rétractation</strong> : le code de la consommation prévoit une exception au droit de rétractation pour les biens susceptibles de se détériorer ou de se périmer rapidement ; il faut néanmoins l'indiquer clairement dans les CGV.</li>
</ul>

<h3>2. SEO (référencement naturel)</h3>
<p>Le SEO est traité en profondeur dans le chapitre consacré à la compétence C4. Dans le plan d'action, on se contente d'identifier les <strong>actions SEO prioritaires et leur calendrier</strong>, en particulier le SEO local, déterminant pour un commerce de proximité.</p>
<ul>
<li>Audit technique de base (indexation, balises title et meta description, vitesse, version mobile, données structurées de type « Bakery » / « LocalBusiness »).</li>
<li>Pages optimisées sur les requêtes d'intention locale : « boulangerie [quartier] Nantes », « traiteur petit-déjeuner entreprise Nantes », « galette des rois à commander Nantes ».</li>
<li>Calendrier de contenus saisonniers publié <strong>avant</strong> les pics de recherche (la page « galette des rois » doit être en ligne et indexée bien avant janvier).</li>
<li>Cohérence du nom, de l'adresse et du téléphone (NAP) sur le site, la fiche Google, les annuaires et les réseaux sociaux.</li>
<li>Obtention de liens locaux : association de commerçants, presse locale, partenaires.</li>
</ul>

<h3>3. SEA (publicité sur les moteurs de recherche)</h3>
<p>Le SEA permet d'apparaître immédiatement sur des requêtes précises, en payant au clic. Pour Maison Lenoir, son intérêt est de <strong>tester rapidement</strong> l'appétence pour le service traiteur B2B, sans attendre les effets du SEO. Les actions types : créer le compte et la structure de campagne, paramétrer la mesure des conversions, rédiger les annonces, fixer un budget de test, analyser les termes de recherche chaque semaine. L'introduction à Google Ads fait l'objet de la section 4.7.</p>

<h3>4. Réseaux sociaux</h3>
<p>Le détail des stratégies sociales relève du chapitre consacré à la compétence C5. Dans le plan d'action, on précise par réseau : la cible, la ligne éditoriale, la fréquence, les formats, le responsable, et l'éventuel budget publicitaire.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Réseau</th><th>Cible Maison Lenoir</th><th>Actions (exemple)</th><th>Fréquence</th></tr>
<tr><td>Instagram</td><td>Particuliers du quartier, 25-50 ans (compte d'environ 1 900 abonnés)</td><td>Photos et vidéos courtes des fournées, coulisses, produit de la semaine à commander en ligne ; stories avec lien de commande</td><td>3 publications/semaine + stories</td></tr>
<tr><td>Facebook</td><td>Particuliers, familles, groupes de quartier</td><td>Relais des publications, événements (galette, fête des mères), publicité locale ciblée sur un rayon autour de la boutique</td><td>2 publications/semaine</td></tr>
<tr><td>LinkedIn</td><td>Office managers, dirigeants de PME du quartier</td><td>Page entreprise + profil de la co-gérante : témoignages clients traiteur, coulisses de production, offres pour les séminaires</td><td>1 publication/semaine</td></tr>
</table>
<p>Erreur fréquente : ouvrir un compte sur chaque réseau « pour être présent ». Mieux vaut deux réseaux bien tenus que quatre comptes abandonnés, qui donnent une image de commerce inactif.</p>

<h3>5. Email marketing</h3>
<p>L'email reste le levier le plus maîtrisé par l'entreprise : la base de contacts lui appartient, contrairement aux abonnés d'un réseau social dont la visibilité dépend d'algorithmes. Les actions types sont la constitution de la base (dans le respect du RGPD), la création d'un gabarit, la lettre d'information régulière, les scénarios automatisés (bienvenue, post-achat, relance de devis). L'introduction complète figure en section 4.6.</p>

<h3>6. Contenus</h3>
<p>Les contenus alimentent tous les leviers : un même reportage photo sert au site, à la fiche Google, à Instagram, à la newsletter et aux annonces. La bonne pratique est de <strong>produire par lots</strong> et de <strong>décliner</strong> (principe « créer une fois, publier plusieurs fois »).</p>
<ul>
<li><strong>Banque de photos et de vidéos</strong> : une demi-journée de prise de vue professionnelle par saison, complétée par des prises de vue au smartphone en production.</li>
<li><strong>Calendrier éditorial</strong> calé sur la saisonnalité de la boulangerie : rentrée, Toussaint, fêtes de fin d'année, galette des rois (janvier), Chandeleur, Saint-Valentin, Pâques, fête des mères, été.</li>
<li><strong>Contenus experts</strong> : articles ou vidéos courtes (« Comment nous préparons notre levain », « Organiser un petit-déjeuner d'équipe pour 20 personnes »), utiles au SEO et à la crédibilité.</li>
<li><strong>Contenus B2B</strong> : plaquette traiteur en PDF accessible, cas client, grille tarifaire.</li>
</ul>

<h3>7. Avis clients et Google Business Profile</h3>
<p>Pour un commerce local, la fiche <strong>Google Business Profile</strong> (anciennement Google My Business) est souvent la première vitrine : elle apparaît dans les résultats de recherche locaux et dans Google Maps. C'est généralement l'action au meilleur rapport impact / effort du plan.</p>
<h4>Actions types</h4>
<ul>
<li>Revendiquer et vérifier la fiche ; renseigner les catégories (principale « Boulangerie », secondaires pertinentes comme « Pâtisserie » ou « Traiteur »), les horaires y compris les horaires exceptionnels des jours fériés, les attributs, la description, la zone desservie pour la livraison B2B.</li>
<li>Ajouter le lien de commande en ligne et les produits phares avec photos.</li>
<li>Publier régulièrement des posts (nouveautés, offres saisonnières, événements).</li>
<li>Solliciter des avis de façon systématique : QR code en caisse, email post-commande, carte glissée dans les commandes traiteur.</li>
<li>Répondre à <strong>tous</strong> les avis, positifs comme négatifs, dans un délai court, de façon personnalisée et courtoise.</li>
</ul>
<h4>Cadre légal et règles des plateformes</h4>
<ul>
<li>Le code de la consommation interdit les pratiques commerciales trompeuses, dont la publication ou la commande de faux avis ; les professionnels qui publient eux-mêmes des avis doivent informer sur les modalités de contrôle et de publication de ces avis.</li>
<li>Les règles de Google interdisent notamment d'offrir une contrepartie en échange d'un avis et de ne solliciter que les clients satisfaits (pratique dite de « review gating »). On sollicite <strong>tous</strong> les clients, sans condition.</li>
<li>Un avis négatif ne se supprime pas à la demande ; on peut le signaler s'il enfreint les règles de la plateforme et, surtout, y répondre de façon factuelle.</li>
</ul>
<h4>Modèle de réponse à un avis négatif</h4>
<blockquote>« Bonjour Madame X, merci d'avoir pris le temps de nous écrire. Nous sommes désolés que votre commande de samedi n'ait pas été prête à l'heure du créneau choisi : c'est exactement ce que nous voulons éviter. Nous avons revu notre organisation du samedi matin pour préparer les commandes en ligne la veille au soir. Nous serions heureux de vous accueillir à nouveau ; n'hésitez pas à nous appeler en boutique. Claire, Maison Lenoir. »</blockquote>

<h3>8. Partenariats</h3>
<p>Les partenariats permettent d'atteindre une audience déjà constituée, avec la recommandation implicite du partenaire. Ils sont particulièrement adaptés au B2B local.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Partenaire potentiel</th><th>Intérêt pour Maison Lenoir</th><th>Contrepartie possible</th></tr>
<tr><td>Espace de coworking du quartier</td><td>Accès à de nombreuses petites entreprises et indépendants ; événements réguliers</td><td>Tarif préférentiel pour les événements du coworking ; dégustation offerte lors d'un afterwork</td></tr>
<tr><td>Association de commerçants / club d'entreprises</td><td>Réseau local, visibilité dans les communications de l'association</td><td>Cotisation ; participation aux actions collectives</td></tr>
<tr><td>Gestionnaire d'immeuble de bureaux</td><td>Communication auprès des locataires (affichage, intranet)</td><td>Offre de bienvenue pour les nouveaux locataires</td></tr>
<tr><td>Fleuriste ou caviste voisin</td><td>Offres combinées pour les événements (cocktail + fleurs)</td><td>Recommandation croisée, liens réciproques entre sites</td></tr>
<tr><td>Plateformes de commande ou de livraison</td><td>Visibilité supplémentaire</td><td>Commission sur les ventes : à comparer avec la marge</td></tr>
</table>
<p>Chaque partenariat fait l'objet d'une fiche action avec un objectif mesurable (ex. : nombre de demandes de devis identifiées par un code « COWORK ») et d'un accord écrit simple précisant les engagements de chacun.</p>

<h3>Articuler les leviers : l'exemple d'un parcours</h3>
<ol>
<li>Une office manager cherche « petit déjeuner réunion livraison Nantes » sur Google ; elle voit l'annonce Google Ads de Maison Lenoir et la fiche Google (note de 4,6 sur environ 210 avis).</li>
<li>Elle arrive sur la landing page traiteur, télécharge la plaquette, mais ne demande pas de devis tout de suite.</li>
<li>Elle s'inscrit à la lettre « Offres entreprises » ; elle reçoit un email de bienvenue avec la grille tarifaire.</li>
<li>Elle voit une publication LinkedIn présentant un séminaire réussi avec le buffet Maison Lenoir.</li>
<li>Elle demande un devis ; le scénario automatisé la relance à J+3 si le devis n'est pas signé.</li>
<li>Après la prestation, un email l'invite à laisser un avis Google ; elle devient cliente récurrente.</li>
</ol>
<p>Aucun levier, pris isolément, n'aurait suffi : c'est la cohérence d'ensemble qui convertit.</p>

<h3>Check-list de sélection des actions</h3>
<ul>
<li>L'action se rattache-t-elle à un objectif chiffré ?</li>
<li>Les prérequis existent-ils (page d'atterrissage, mesure, contenus, base de contacts) ?</li>
<li>Avons-nous les compétences en interne, ou faut-il un prestataire ?</li>
<li>Le temps interne nécessaire est-il réaliste au regard de la production ?</li>
<li>L'action est-elle conforme au RGPD, aux règles cookies et aux règles de la plateforme ?</li>
<li>Le livrable est-il accessible aux personnes en situation de handicap ?</li>
<li>Saurons-nous mesurer son effet ?</li>
</ul>

<blockquote><strong>À retenir.</strong> Chaque levier a un rôle distinct dans le parcours client : le site convertit, le SEO et le SEA attirent, les réseaux sociaux créent la préférence, l'email fidélise, les contenus nourrissent l'ensemble, les avis et la fiche Google rassurent localement, les partenariats ouvrent des audiences. Pour une TPE locale, la fiche Google Business Profile et les avis clients sont généralement les gains rapides à traiter en premier.</blockquote>
`,
      },
      {
        title: "4.3 – Rétroplanning et diagramme de Gantt",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Construire un rétroplanning à partir d'une date butoir.</li>
<li>Représenter le plan sous forme de diagramme de Gantt et identifier le chemin critique.</li>
<li>Intégrer la saisonnalité de l'activité et les capacités de l'équipe.</li>
</ul>

<h3>Définitions</h3>
<ul>
<li><strong>Rétroplanning</strong> : planning construit à rebours, en partant d'une date butoir non négociable (lancement, événement, pic saisonnier) et en remontant le temps pour positionner chaque tâche en fonction de sa durée et de ses dépendances.</li>
<li><strong>Diagramme de Gantt</strong> : représentation graphique d'un planning où chaque tâche est une barre horizontale positionnée sur une échelle de temps ; il fait apparaître les durées, les chevauchements et les dépendances.</li>
<li><strong>Jalon</strong> : événement ponctuel marquant une étape (mise en ligne, lancement de campagne, revue de résultats). Il n'a pas de durée.</li>
<li><strong>Dépendance</strong> : lien entre deux tâches ; le cas le plus courant est « fin → début » (B ne peut commencer que lorsque A est terminée).</li>
<li><strong>Chemin critique</strong> : suite de tâches dépendantes dont la durée totale détermine la date de fin ; tout retard sur l'une d'elles retarde l'ensemble du projet.</li>
<li><strong>Marge</strong> : temps dont une tâche peut glisser sans retarder la date de fin.</li>
</ul>

<h3>Méthode du rétroplanning en 6 étapes</h3>
<ol>
<li><strong>Fixer les dates butoirs</strong>. Pour Maison Lenoir (exemple) : le click &amp; collect doit être opérationnel avant les commandes de fêtes de fin d'année (jalon J1 : 1er décembre 2026) ; l'offre traiteur doit être en ligne mi-décembre pour être indexée et prête à la reprise des réunions (jalon J2 : 11 décembre 2026) ; la commande en ligne des galettes doit ouvrir fin décembre (jalon J3 : 28 décembre 2026).</li>
<li><strong>Lister les tâches</strong> nécessaires pour atteindre chaque jalon.</li>
<li><strong>Estimer les durées</strong> de façon réaliste, en tenant compte de la disponibilité réelle des personnes (une co-gérante qui consacre 4 h par semaine au webmarketing ne peut pas « faire le site en 3 jours »).</li>
<li><strong>Identifier les dépendances</strong>.</li>
<li><strong>Remonter le temps</strong> depuis chaque jalon pour fixer les dates de début au plus tard.</li>
<li><strong>Ajouter des marges de sécurité</strong> (en pratique 20 à 30 % sur les tâches dépendant d'un prestataire ou d'une validation externe) et vérifier la charge de travail semaine par semaine.</li>
</ol>

<h3>Exemple : rétroplanning du jalon J1 « click &amp; collect opérationnel le 1er décembre 2026 »</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Tâche</th><th>Durée</th><th>Dépend de</th><th>Début au plus tard</th><th>Fin au plus tard</th></tr>
<tr><td>Choix de la solution de commande en ligne (comparatif de 3 offres)</td><td>1 semaine</td><td>–</td><td>12/10/2026</td><td>16/10/2026</td></tr>
<tr><td>Définition du catalogue en ligne (produits, prix, allergènes, créneaux)</td><td>2 semaines</td><td>Choix solution</td><td>19/10/2026</td><td>30/10/2026</td></tr>
<tr><td>Séance photo produits</td><td>1 jour (+ 1 semaine de retouche)</td><td>Catalogue</td><td>02/11/2026</td><td>06/11/2026</td></tr>
<tr><td>Paramétrage du module et des paiements</td><td>2 semaines</td><td>Catalogue, photos</td><td>09/11/2026</td><td>20/11/2026</td></tr>
<tr><td>Tests (commandes fictives, accessibilité, mobile) et formation de l'équipe en boutique</td><td>1 semaine</td><td>Paramétrage</td><td>23/11/2026</td><td>27/11/2026</td></tr>
<tr><td><strong>Jalon J1 – Ouverture</strong></td><td>–</td><td>Tests</td><td>01/12/2026</td><td>01/12/2026</td></tr>
</table>
<p>On constate qu'il faut démarrer dès la mi-octobre : un lancement décidé fin novembre serait déjà trop tard pour les fêtes. C'est tout l'intérêt du rétroplanning.</p>

<h3>Le diagramme de Gantt du plan (exemple sur 7 mois)</h3>
<p>Le tableau suivant représente un Gantt simplifié. Chaque « ■ » correspond à un mois d'activité de la tâche ; « ◆ » marque un jalon. Dans un outil (tableur, logiciel de planification, outil de gestion de projet en ligne), on travaillerait à la semaine.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Code – Action</th><th>Resp.</th><th>Oct.</th><th>Nov.</th><th>Déc.</th><th>Janv.</th><th>Févr.</th><th>Mars</th><th>Avr.</th></tr>
<tr><td>A-01 Fiche Google Business Profile complète + collecte d'avis</td><td>Claire</td><td>■</td><td>■</td><td>■</td><td>■</td><td>■</td><td>■</td><td>■</td></tr>
<tr><td>A-02 Module click &amp; collect</td><td>Claire</td><td>■</td><td>■</td><td>◆</td><td></td><td></td><td></td><td></td></tr>
<tr><td>A-03 Grille tarifaire traiteur</td><td>Paul (chef pâtissier)</td><td>■</td><td>■</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>A-04 Séance photo</td><td>Claire</td><td></td><td>■</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>A-05 Landing page traiteur</td><td>Freelance / Claire</td><td></td><td>■</td><td>■ ◆</td><td></td><td></td><td></td><td></td></tr>
<tr><td>A-06 Audit et corrections d'accessibilité du site</td><td>Freelance</td><td></td><td>■</td><td>■</td><td></td><td></td><td></td><td></td></tr>
<tr><td>A-07 Mise en place de l'outil d'emailing, formulaires et scénarios</td><td>Claire</td><td></td><td>■</td><td>■</td><td></td><td></td><td></td><td></td></tr>
<tr><td>A-08 Newsletter particuliers (bimensuelle)</td><td>Claire</td><td></td><td></td><td>■</td><td>■</td><td>■</td><td>■</td><td>■</td></tr>
<tr><td>A-09 Google Ads Search traiteur (test puis optimisation)</td><td>Claire + freelance</td><td></td><td></td><td></td><td>■ ◆</td><td>■</td><td>■</td><td>■</td></tr>
<tr><td>A-10 Calendrier éditorial Instagram/Facebook</td><td>Léa (vendeuse)</td><td></td><td>■</td><td>■</td><td>■</td><td>■</td><td>■</td><td>■</td></tr>
<tr><td>A-11 Page LinkedIn + publications B2B</td><td>Claire</td><td></td><td></td><td>■</td><td>■</td><td>■</td><td>■</td><td>■</td></tr>
<tr><td>A-12 Opération galette des rois (page, posts, emailing)</td><td>Équipe, pilotée par Léa</td><td></td><td></td><td>■</td><td>■</td><td></td><td></td><td></td></tr>
<tr><td>A-13 Partenariats (coworking, association, immeuble)</td><td>Claire</td><td></td><td></td><td></td><td>■</td><td>■</td><td>■</td><td></td></tr>
<tr><td>A-14 Revue trimestrielle du plan</td><td>Gérants</td><td></td><td></td><td></td><td>◆</td><td></td><td></td><td>◆</td></tr>
</table>

<h3>Lire et exploiter le Gantt</h3>
<ul>
<li><strong>Chemin critique</strong> de l'exemple : A-03 grille tarifaire → A-04 photos → A-05 landing page → A-09 campagne Google Ads. Un retard sur la grille tarifaire décale toute l'offre traiteur ; c'est donc la tâche à surveiller en priorité.</li>
<li><strong>Pics de charge</strong> : novembre et décembre concentrent beaucoup d'actions alors que l'activité en boutique est la plus forte de l'année. Solutions : avancer ce qui peut l'être en octobre, confier la landing page et l'accessibilité à un prestataire, reporter LinkedIn à décembre.</li>
<li><strong>Saisonnalité</strong> : la campagne Google Ads traiteur démarre en janvier, quand les entreprises reprennent leurs réunions et organisent leurs vœux ; lancer en décembre aurait surtout capté des demandes pour des fêtes déjà organisées.</li>
<li><strong>Jalons de revue</strong> : la revue de janvier permet de vérifier les premiers résultats du click &amp; collect avant d'engager pleinement le budget publicitaire.</li>
</ul>

<h3>Outils possibles</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Outil</th><th>Avantages</th><th>Limites</th></tr>
<tr><td>Tableur (Excel, Google Sheets, LibreOffice Calc)</td><td>Gratuit ou déjà disponible, souple, partageable</td><td>Dépendances non gérées automatiquement</td></tr>
<tr><td>Outils de gestion de projet en ligne (vues chronologiques de Trello, Asana, Notion, Monday, Airtable…)</td><td>Collaboration, notifications, vue tableau et vue calendrier</td><td>Abonnement selon les fonctionnalités ; temps de prise en main</td></tr>
<tr><td>Logiciels de planification dédiés (GanttProject, Microsoft Project…)</td><td>Dépendances, chemin critique et charges calculés</td><td>Souvent surdimensionnés pour une TPE</td></tr>
</table>
<p>Pour l'accessibilité du document lui-même : un Gantt fondé uniquement sur la couleur n'est pas lisible par tous. On ajoute un symbole ou un texte dans les cases et une légende textuelle (voir section 4.5).</p>

<h3>Le calendrier éditorial, déclinaison opérationnelle du Gantt</h3>
<p>Le Gantt donne la vue d'ensemble ; le calendrier éditorial détaille, semaine par semaine, les contenus à publier sur chaque canal. Exemple pour la semaine du 4 janvier 2027 :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Jour</th><th>Canal</th><th>Contenu</th><th>Objectif</th><th>Statut</th></tr>
<tr><td>Lundi</td><td>Instagram + Facebook</td><td>Vidéo courte sous-titrée : le feuilletage de la galette</td><td>Notoriété, renvoi vers la commande</td><td>Prêt</td></tr>
<tr><td>Mardi</td><td>Email particuliers</td><td>« Réservez votre galette pour le week-end : 3 tailles, retrait en 2 minutes »</td><td>Commandes click &amp; collect</td><td>Programmé</td></tr>
<tr><td>Mercredi</td><td>LinkedIn</td><td>« Galette des rois au bureau : nos formules pour 8 à 40 personnes »</td><td>Demandes de devis B2B</td><td>À rédiger</td></tr>
<tr><td>Jeudi</td><td>Google Business Profile</td><td>Post « Offre » galette + lien de commande</td><td>Visibilité locale</td><td>Prêt</td></tr>
<tr><td>Vendredi</td><td>Stories Instagram</td><td>Coulisses de la production de nuit, sondage « frangipane ou brioche ? »</td><td>Engagement</td><td>À tourner</td></tr>
</table>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Planifier « au plus juste » sans marge : le moindre aléa (prestataire indisponible, validation tardive) fait rater le jalon.</li>
<li>Ignorer la saisonnalité métier : programmer une refonte de site en décembre dans une boulangerie.</li>
<li>Faire un Gantt une fois et ne plus jamais le mettre à jour : c'est un outil vivant, revu chaque semaine.</li>
<li>Oublier les délais externes : vérification d'une fiche Google, examen des annonces, propagation DNS lors de l'authentification du domaine d'envoi des emails, délais d'impression.</li>
</ul>

<blockquote><strong>À retenir.</strong> Le rétroplanning part des dates butoirs (souvent dictées par la saisonnalité) et remonte le temps. Le diagramme de Gantt visualise durées, dépendances et jalons ; il révèle le chemin critique et les pics de charge. On prévoit des marges, on lisse la charge de l'équipe et on met le Gantt à jour chaque semaine. Le calendrier éditorial en est la déclinaison opérationnelle.</blockquote>
`,
      },
      {
        title: "4.4 – Budgéter chaque action",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Identifier toutes les composantes du coût d'une action webmarketing, y compris le temps interne.</li>
<li>Construire un budget par action et un budget global, avec une réserve pour imprévus.</li>
<li>Relier le budget aux résultats attendus : coût par acquisition, seuil de rentabilité, retour sur investissement.</li>
</ul>

<h3>Les composantes du coût</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Composante</th><th>Exemples</th><th>Nature</th></tr>
<tr><td>Achat média</td><td>Budget Google Ads, publicité Meta (Facebook/Instagram), publicité LinkedIn</td><td>Variable, pilotable au jour le jour</td></tr>
<tr><td>Outils et abonnements</td><td>Module de commande en ligne, outil d'emailing, outil de planification des publications, nom de domaine, hébergement</td><td>Récurrent (mensuel ou annuel)</td></tr>
<tr><td>Prestations externes</td><td>Freelance web, photographe, rédacteur, audit d'accessibilité, agence</td><td>Ponctuel, sur devis</td></tr>
<tr><td>Production physique</td><td>Impression de plaquettes, cartes QR code pour les avis, signalétique en boutique</td><td>Ponctuel</td></tr>
<tr><td>Temps interne</td><td>Heures consacrées par le dirigeant et les salariés</td><td>Coût caché mais réel</td></tr>
<tr><td>Commissions</td><td>Frais de transaction des paiements en ligne, commissions de plateformes de commande ou de livraison</td><td>Proportionnel aux ventes</td></tr>
</table>
<p>Les prix des outils et des prestations évoluent souvent et varient selon les offres : <strong>tout montant d'outil doit être vérifié sur la grille tarifaire en vigueur au moment du chiffrage</strong>, et le devis du prestataire sert de référence.</p>

<h3>Exemple de budget par action (Maison Lenoir, 6 mois, montants HT, hypothèses pédagogiques)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Action</th><th>Poste</th><th>Calcul</th><th>Montant</th></tr>
<tr><td>A-02 Click &amp; collect</td><td>Abonnement au module de commande (hypothèse)</td><td>6 mois × 49 €</td><td>294 €</td></tr>
<tr><td>A-04 Séance photo</td><td>Photographe, ½ journée</td><td>Devis</td><td>450 €</td></tr>
<tr><td>A-05 Landing page traiteur</td><td>Freelance</td><td>Devis</td><td>900 €</td></tr>
<tr><td>A-06 Accessibilité</td><td>Audit rapide + corrections</td><td>Devis</td><td>600 €</td></tr>
<tr><td>A-07/A-08 Email</td><td>Outil d'emailing, offre payante d'entrée de gamme (hypothèse)</td><td>6 mois × 25 €</td><td>150 €</td></tr>
<tr><td>A-09 Google Ads</td><td>Budget média (janvier à avril)</td><td>4 mois × 1 000 €</td><td>4 000 €</td></tr>
<tr><td>A-10 Social</td><td>Publicité locale Facebook/Instagram</td><td>6 mois × 250 €</td><td>1 500 €</td></tr>
<tr><td>A-03 Supports</td><td>Plaquette traiteur, cartes QR avis, impression</td><td>Devis imprimeur</td><td>350 €</td></tr>
<tr><td>A-13 Partenariats</td><td>Dégustations lors d'événements partenaires</td><td>Estimation</td><td>300 €</td></tr>
<tr><td><strong>Sous-total dépenses externes</strong></td><td></td><td></td><td><strong>8 544 €</strong></td></tr>
<tr><td>Réserve pour imprévus</td><td></td><td>≈ 12 % du sous-total</td><td>1 056 €</td></tr>
<tr><td><strong>Budget décaissé prévisionnel sur 6 mois</strong></td><td></td><td></td><td><strong>9 600 €</strong></td></tr>
<tr><td>Temps interne valorisé</td><td>Co-gérante et vendeuse</td><td>6 h 30/semaine × 26 semaines × 35 €/h (coût horaire estimé, comme au chapitre 3)</td><td>5 900 €</td></tr>
<tr><td><strong>Coût complet du plan</strong></td><td></td><td></td><td><strong>15 500 €</strong></td></tr>
</table>
<p>Ces 9 600 € HT correspondent à la première moitié du budget webmarketing de l'année 1 fixé à 19 200 € HT lors de la définition de la stratégie (exemple fil rouge) ; le second semestre pourra être réajusté après la revue d'avril selon les leviers qui auront fait leurs preuves.</p>

<h3>Relier le budget aux résultats</h3>
<h4>Les indicateurs économiques clés</h4>
<ul>
<li><strong>CPC</strong> (coût par clic) = dépense ÷ nombre de clics.</li>
<li><strong>CPL</strong> (coût par lead, ici par demande de devis) = dépense ÷ nombre de demandes.</li>
<li><strong>CPA</strong> (coût par acquisition) = dépense ÷ nombre de ventes ou de nouveaux clients.</li>
<li><strong>ROAS</strong> (retour sur dépense publicitaire) = chiffre d'affaires attribué ÷ dépense publicitaire.</li>
<li><strong>ROI</strong> = (marge générée − coût de l'action) ÷ coût de l'action.</li>
<li><strong>Valeur vie client</strong> (CLV ou LTV) : marge totale générée par un client sur la durée de la relation. En B2B récurrent, elle justifie un coût d'acquisition bien supérieur à la marge de la première commande.</li>
</ul>
<h4>Exemple de raisonnement : combien peut-on payer pour acquérir un client traiteur ?</h4>
<ol>
<li>Hypothèse : une entreprise cliente commande en moyenne 2 prestations par mois de 180 € HT, pendant 12 mois, soit 4 320 € HT de chiffre d'affaires annuel.</li>
<li>Hypothèse de marge sur coût des matières et emballages : 60 %, soit une marge de 2 592 € par client et par an (avant coûts de main-d'œuvre de production et de livraison, à intégrer dans une analyse plus fine).</li>
<li>La stratégie a fixé un <strong>coût d'acquisition client (CAC) maximal</strong> d'environ 220 € par entreprise cliente, soit environ 8,5 % de cette marge annuelle : le repère est cohérent.</li>
<li>Avec un taux de signature supposé de 40 % des devis, le <strong>coût maximal par demande de devis</strong> est de 220 × 40 % ≈ 88 € ; avec un taux de conversion supposé de 4 % des visites de la landing page en demandes de devis, le <strong>CPC maximal</strong> soutenable est d'environ 88 × 4 % ≈ 3,50 €.</li>
<li>Avec un budget Google Ads de 1 000 € par mois, un CPC moyen supposé de 2,00 € donne 500 clics ; un taux de demande de devis de 4 % donne 20 demandes, soit environ 50 € par demande (sous le plafond de 88 €) ; un taux de signature de 40 % donne 8 nouveaux clients, soit un CAC d'environ 125 € (sous le plafond de 220 €). Le levier est rentable <em>si ces hypothèses se vérifient</em> : c'est précisément ce que la phase de test doit établir.</li>
</ol>

<h4>Seuil de rentabilité du plan</h4>
<p>Le coût complet du plan sur six mois est de 15 500 € (exemple). Avec une marge hypothétique de 60 % sur le chiffre d'affaires additionnel, le plan est « remboursé » à partir d'environ 15 500 ÷ 0,60 ≈ 25 800 € de chiffre d'affaires additionnel sur la période. Pour Maison Lenoir, cela représente par exemple une montée en charge de la commande en ligne de 20 à 120 commandes par mois (environ 420 commandes cumulées à 24 € de panier moyen, soit ≈ 10 100 €) et environ 15 700 € de chiffre d'affaires traiteur additionnel, à comparer aux 31 k€ HT de chiffre d'affaires traiteur actuel. Attention : une partie des commandes en ligne peut être le fait de clients qui seraient venus de toute façon en boutique ; seul le chiffre d'affaires réellement additionnel doit entrer dans le calcul. L'objectif est ambitieux mais atteignable, et c'est précisément ce type de raisonnement, qui confronte les dépenses aux résultats attendus, que le formateur attend dans votre projet final.</p>

<h3>Méthodes d'allocation du budget</h3>
<ul>
<li><strong>Pourcentage du chiffre d'affaires</strong> : simple, mais ne tient pas compte des objectifs ; les repères sectoriels qui circulent (quelques pour cent du chiffre d'affaires) sont des ordres de grandeur grossiers, pas des normes.</li>
<li><strong>Par objectif et par tâche</strong> (méthode recommandée) : on chiffre ce qu'il faut faire pour atteindre l'objectif, puis on arbitre.</li>
<li><strong>Test and learn</strong> : on alloue un budget de test limité à chaque levier payant, puis on renforce ce qui fonctionne et on coupe le reste. Une pratique courante consiste à réserver une part du budget (par exemple 10 à 20 %) à des expérimentations.</li>
</ul>

<h3>Financements et aides</h3>
<p>Certaines dépenses de transformation numérique peuvent être accompagnées par des dispositifs publics ou consulaires (diagnostics numériques proposés par les CCI et les chambres de métiers et de l'artisanat, programmes régionaux). Les dispositifs changent régulièrement : il faut vérifier auprès de la chambre consulaire ou de la Région les aides en vigueur au moment du projet, sans les intégrer au budget tant qu'elles ne sont pas accordées.</p>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Oublier les coûts récurrents (abonnements qui courent après la fin du projet).</li>
<li>Ne pas valoriser le temps interne, et sous-estimer de ce fait le coût réel.</li>
<li>Répartir le budget publicitaire uniformément sur l'année au lieu de le concentrer sur les périodes à fort potentiel.</li>
<li>Confondre chiffre d'affaires et marge dans le calcul du ROI.</li>
<li>Juger un levier sur un mois de données insuffisantes : il faut un volume minimal de clics et de conversions avant de conclure.</li>
</ul>

<blockquote><strong>À retenir.</strong> Un budget webmarketing complet additionne achat média, outils, prestations, production, commissions et temps interne, avec une réserve pour imprévus. On le relie aux résultats par le coût par acquisition, la valeur vie client et le seuil de rentabilité. Les montants d'outils se vérifient toujours sur les grilles tarifaires en vigueur ; les hypothèses de conversion se valident par des tests.</blockquote>
`,
      },
      {
        title: "4.5 – Intégrer l'accessibilité numérique dans chaque levier",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Comprendre ce qu'est l'accessibilité numérique et pourquoi elle concerne tout projet webmarketing.</li>
<li>Connaître le cadre de référence au 7 octobre 2026 : acte européen sur l'accessibilité (EAA), RGAA 4.1, WCAG 2.1 et 2.2.</li>
<li>Appliquer les bonnes pratiques concrètes sur le site, les emails, les publications sociales, les vidéos et les documents.</li>
</ul>

<h3>Définition et enjeux</h3>
<p>L'<strong>accessibilité numérique</strong> consiste à rendre les sites, applications, documents et contenus utilisables par toutes et tous, y compris les personnes en situation de handicap : handicap visuel (cécité, malvoyance, daltonisme), auditif (surdité, malentendance), moteur (difficulté à utiliser une souris ou un écran tactile), cognitif ou psychique (troubles de l'attention, de la mémoire, dyslexie…). Elle bénéficie aussi aux personnes âgées, aux personnes temporairement empêchées (bras dans le plâtre), ou en situation contraignante (vidéo regardée sans le son dans les transports, écran consulté en plein soleil).</p>
<p>Ces personnes utilisent des <strong>technologies d'assistance</strong> : lecteurs d'écran (NVDA, JAWS, VoiceOver, TalkBack) qui vocalisent ou transcrivent en braille le contenu, loupes logicielles, navigation au clavier seul, commande vocale, contacteurs. Un contenu est accessible lorsque ces outils peuvent le restituer correctement.</p>
<p>Pour une entreprise, l'accessibilité est à la fois :</p>
<ul>
<li>une <strong>question d'inclusion</strong> et d'image ;</li>
<li>une <strong>opportunité commerciale</strong> : une part non négligeable de la population vit avec un handicap ou une incapacité, et la population vieillit ; un site inaccessible, c'est un client qui ne peut pas commander ;</li>
<li>un <strong>facteur de qualité</strong> : les bonnes pratiques d'accessibilité (structure de titres, textes alternatifs, libellés clairs) améliorent aussi l'ergonomie générale et sont cohérentes avec les bonnes pratiques SEO ;</li>
<li>une <strong>obligation légale</strong> pour un nombre croissant d'acteurs.</li>
</ul>

<h3>Le cadre de référence</h3>
<h4>Les WCAG (Web Content Accessibility Guidelines)</h4>
<p>Les WCAG sont les règles internationales publiées par le W3C (consortium qui normalise le web). Elles reposent sur quatre principes : le contenu doit être <strong>perceptible</strong>, <strong>utilisable</strong>, <strong>compréhensible</strong> et <strong>robuste</strong>. Chaque critère de succès a un niveau : A (minimum), AA (niveau visé par les réglementations), AAA (niveau renforcé). La version 2.1 date de 2018 ; la version <strong>2.2</strong>, publiée en octobre 2023, ajoute notamment des critères sur la visibilité du focus clavier, la taille minimale des cibles cliquables, l'aide cohérente, la saisie redondante et l'authentification accessible. Le niveau de référence attendu en pratique est <strong>WCAG 2.1 AA</strong>, la version 2.2 AA étant la cible recommandée pour tout nouveau projet.</p>
<h4>La norme européenne EN 301 549</h4>
<p>Norme harmonisée d'accessibilité des produits et services TIC ; pour le web, elle reprend les critères WCAG 2.1 de niveaux A et AA.</p>
<h4>Le RGAA 4.1 (Référentiel général d'amélioration de l'accessibilité)</h4>
<p>Le RGAA est la méthode française de vérification de la conformité. Dans sa version 4.1 (mise à jour 4.1.2 publiée en 2023), il comprend <strong>106 critères</strong> répartis en <strong>13 thématiques</strong> (images, cadres, couleurs, multimédia, tableaux, liens, scripts, éléments obligatoires, structuration de l'information, présentation de l'information, formulaires, navigation, consultation), avec des tests précis pour chaque critère. Il est obligatoire pour les organismes publics et pour les entreprises dépassant un seuil de chiffre d'affaires fixé par décret (250 millions d'euros), qui doivent notamment publier une déclaration d'accessibilité. Pour toutes les autres entreprises, c'est une excellente grille de travail.</p>
<h4>L'acte européen sur l'accessibilité (European Accessibility Act, EAA)</h4>
<p>La directive (UE) 2019/882, transposée en droit français (notamment par la loi n° 2023-171 du 9 mars 2023 et ses textes d'application), s'applique depuis le <strong>28 juin 2025</strong>. Elle impose des exigences d'accessibilité à une liste de produits et de services, parmi lesquels les <strong>services de commerce électronique</strong> (vente de produits ou de services en ligne aux consommateurs), les services bancaires aux consommateurs, les livres numériques, certains services de transport et de communications électroniques.</p>
<p>Points essentiels pour une TPE/PME :</p>
<ul>
<li>Les <strong>microentreprises</strong> qui fournissent des <strong>services</strong> (moins de 10 personnes et chiffre d'affaires annuel ou total de bilan n'excédant pas 2 millions d'euros) sont <strong>exemptées</strong> des obligations relatives aux services. Maison Lenoir, avec 6 salariés et 780 k€ HT de chiffre d'affaires (données de l'exemple), relève a priori de cette exemption : pour elle, l'accessibilité n'est pas une obligation légale mais une bonne pratique et une attente de ses clients B2B, dont certains conduisent leur propre politique handicap ou RSE et apprécient des fournisseurs aux supports accessibles.</li>
<li>Une PME de 10 salariés ou plus qui vend en ligne aux particuliers est en revanche concernée : son site marchand et son parcours de commande doivent respecter les exigences d'accessibilité, et elle doit fournir des informations sur l'accessibilité de son service (généralement dans une page dédiée ou les conditions générales).</li>
<li>Des périodes transitoires et des exceptions (charge disproportionnée, modification fondamentale du service) existent ; elles doivent être documentées et justifiées, elles ne se présument pas.</li>
</ul>
<p>Même exemptée, une microentreprise a intérêt à appliquer les bonnes pratiques : ses clients, eux, ne sont pas exemptés de leurs difficultés, et une croissance au-delà des seuils rendrait les obligations applicables. Le texte exact des obligations et des sanctions doit être vérifié sur les sources officielles (Légifrance, site du Gouvernement dédié à l'accessibilité numérique) au moment du projet.</p>

<h3>Les bonnes pratiques essentielles, levier par levier</h3>
<h4>Site web et landing pages</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Bonne pratique</th><th>Pourquoi</th><th>Exemple Maison Lenoir</th></tr>
<tr><td>Texte alternatif pertinent sur les images porteuses d'information ; alternative vide pour les images décoratives</td><td>Le lecteur d'écran lit l'alternative ; une image décorative ne doit pas encombrer la lecture</td><td>Photo d'un plateau traiteur : « Plateau petit-déjeuner pour 10 personnes : mini-viennoiseries, pain au levain, confitures maison » ; motif décoratif en fond : alternative vide</td></tr>
<tr><td>Contrastes suffisants : au moins 4,5:1 pour le texte courant, 3:1 pour le grand texte et pour les composants d'interface</td><td>Lisibilité pour les personnes malvoyantes et en plein soleil</td><td>Remplacer le texte beige clair sur fond crème par un brun foncé ; vérifier avec un outil de contraste</td></tr>
<tr><td>Ne pas transmettre une information par la couleur seule</td><td>Daltonisme</td><td>Créneau de retrait complet : afficher « Complet » en plus de la couleur grise</td></tr>
<tr><td>Hiérarchie de titres logique (un titre principal, puis sous-titres)</td><td>Navigation par titres au lecteur d'écran ; compréhension de la structure</td><td>Titre principal « Commander en click &amp; collect », sous-titres « Pains », « Viennoiseries », « Pâtisseries »</td></tr>
<tr><td>Navigation complète au clavier, avec focus visible</td><td>Personnes ne pouvant pas utiliser la souris</td><td>Tester tout le parcours de commande avec la touche Tabulation : choix produit, créneau, paiement</td></tr>
<tr><td>Formulaires : chaque champ a une étiquette visible et associée, erreurs explicites</td><td>Le lecteur d'écran doit annoncer le champ ; l'utilisateur doit comprendre comment corriger</td><td>« Adresse email professionnelle (obligatoire) » ; message d'erreur « Le format attendu est nom@entreprise.fr »</td></tr>
<tr><td>Liens explicites</td><td>Les liens sont souvent lus hors contexte</td><td>« Télécharger la plaquette traiteur (PDF, 1 Mo) » plutôt que « Cliquez ici »</td></tr>
<tr><td>Cibles tactiles suffisamment grandes et espacées (WCAG 2.2 : au moins 24 × 24 pixels CSS, sauf exceptions)</td><td>Troubles moteurs, usage mobile</td><td>Boutons « + » et « − » de quantité agrandis dans le panier</td></tr>
<tr><td>Langue de la page déclarée ; texte redimensionnable sans perte de contenu</td><td>Prononciation correcte par la synthèse vocale ; zoom</td><td>Page déclarée en français ; affichage testé à 200 %</td></tr>
<tr><td>Pas de limite de temps non maîtrisable, pas de contenu qui clignote</td><td>Troubles cognitifs, épilepsie photosensible</td><td>Panier conservé au-delà de quelques minutes ; carrousel avec bouton pause, ou pas de carrousel</td></tr>
<tr><td>Bandeau cookies accessible</td><td>Le premier élément rencontré ne doit pas bloquer la navigation</td><td>Boutons « Tout accepter », « Tout refuser », « Personnaliser » atteignables au clavier et lisibles</td></tr>
</table>

<h4>Vidéos et contenus audio</h4>
<ul>
<li><strong>Sous-titres</strong> synchronisés pour toute vidéo comportant de la parole ; ils servent aussi aux nombreuses personnes qui regardent les vidéos sans le son sur les réseaux sociaux. Préférer des sous-titres activables (fichier de sous-titres) ou, à défaut, incrustés et relus : les sous-titres automatiques contiennent des erreurs.</li>
<li><strong>Transcription textuelle</strong> pour les contenus audio (podcast, interview).</li>
<li><strong>Audiodescription</strong> ou description textuelle lorsque l'information est uniquement visuelle (ex. : vidéo de recette sans commentaire : ajouter les étapes en texte dans la description).</li>
<li>Pas de lecture automatique avec le son ; commandes du lecteur accessibles au clavier.</li>
</ul>

<h4>Publications sur les réseaux sociaux</h4>
<ul>
<li>Renseigner le <strong>texte alternatif</strong> des images : Instagram, Facebook, LinkedIn et X proposent un champ dédié dans les paramètres avancés ou à l'ajout de l'image.</li>
<li>Écrire les hashtags en <strong>« CamelCase »</strong> (#GaletteDesRois plutôt que #galettedesrois) pour qu'ils soient correctement lus par les lecteurs d'écran.</li>
<li>Limiter les émojis et les placer en fin de phrase : chaque émoji est vocalisé par son nom (« visage souriant avec yeux en cœur »).</li>
<li>Ne pas écrire de texte avec des caractères « fantaisie » (polices Unicode stylisées), illisibles par les synthèses vocales.</li>
<li>Ne pas mettre l'information essentielle uniquement dans l'image (prix, date, horaires) : la répéter dans le texte de la publication.</li>
<li>Sous-titrer les vidéos et reels ; vérifier le contraste du texte incrusté.</li>
</ul>

<h4>Emails</h4>
<ul>
<li>Déclarer la langue du message et utiliser une vraie structure (titres, paragraphes) plutôt qu'un email constitué d'une seule grande image.</li>
<li>Textes alternatifs sur les images ; le message doit rester compréhensible si les images sont bloquées.</li>
<li>Taille de texte confortable (souvent recommandée autour de 14 à 16 pixels minimum), contrastes suffisants, interlignage aéré.</li>
<li>Boutons d'action en texte réel (et non en image), libellés explicites (« Commander ma galette »).</li>
<li>Tableaux de mise en page déclarés comme tels (rôle « présentation ») pour ne pas être annoncés comme des tableaux de données ; la plupart des outils d'emailing le gèrent dans leurs gabarits récents, à vérifier.</li>
<li>Prévoir une version texte et un lien « Voir la version en ligne ».</li>
<li>Lien de désinscription visible et lisible.</li>
</ul>

<h4>Documents téléchargeables (PDF, plaquettes)</h4>
<ul>
<li>Produire le PDF depuis un document structuré (styles de titres, textes alternatifs, ordre de lecture) et vérifier avec le vérificateur d'accessibilité du logiciel ; un PDF « scanné » est inaccessible.</li>
<li>Proposer l'information essentielle aussi en HTML sur la page (ex. : les formules traiteur et les prix).</li>
</ul>

<h3>Méthode : intégrer l'accessibilité au plan d'action</h3>
<ol>
<li><strong>Diagnostic</strong> : test rapide des pages clés avec des outils automatiques gratuits (extensions de navigateur d'audit, contrôleurs de contraste) complété par des tests manuels (clavier seul, zoom 200 %, lecteur d'écran gratuit comme NVDA ou VoiceOver). Les outils automatiques ne détectent qu'une partie des problèmes : le test manuel est indispensable.</li>
<li><strong>Priorisation</strong> : corriger d'abord ce qui bloque un parcours essentiel (commande, demande de devis, contact).</li>
<li><strong>Critère d'acceptation</strong> : ajouter dans chaque fiche action une ligne « Accessibilité » avec les points à vérifier avant mise en ligne.</li>
<li><strong>Clause dans les devis</strong> des prestataires : « Livrables conformes aux critères WCAG 2.1 niveau AA (cible WCAG 2.2 AA), vérifiés selon la méthode RGAA ; corrections à la charge du prestataire en cas de non-conformité constatée ».</li>
<li><strong>Charte éditoriale accessible</strong> pour les personnes qui publient (alternative des images, hashtags, sous-titres, émojis).</li>
<li><strong>Information des utilisateurs</strong> : page « Accessibilité » indiquant l'état de conformité, les points connus non conformes et un moyen de contact pour obtenir l'information autrement (téléphone, email).</li>
<li><strong>Contrôle périodique</strong> : à chaque évolution importante du site et au moins une fois par an.</li>
</ol>

<h3>Check-list accessibilité avant chaque mise en ligne</h3>
<ul>
<li>Toutes les images informatives ont une alternative pertinente ; les images décoratives une alternative vide.</li>
<li>Les contrastes texte / fond atteignent 4,5:1 (3:1 pour le grand texte).</li>
<li>Aucune information n'est transmise par la couleur seule.</li>
<li>Le parcours complet est réalisable au clavier, le focus est visible.</li>
<li>Les champs de formulaire ont une étiquette ; les erreurs sont explicites.</li>
<li>Les vidéos sont sous-titrées ; les contenus audio transcrits.</li>
<li>Les liens et boutons ont un intitulé compréhensible hors contexte.</li>
<li>La page reste lisible à 200 % de zoom et sur mobile.</li>
<li>Les publications sociales ont un texte alternatif, des hashtags en CamelCase, peu d'émojis.</li>
<li>Les emails restent compréhensibles sans les images.</li>
</ul>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Croire qu'une « surcouche » ou un widget d'accessibilité ajouté au site suffit à le rendre conforme : ces outils ne corrigent pas le code source et peuvent même gêner les utilisateurs de technologies d'assistance.</li>
<li>Remplir les textes alternatifs avec des mots-clés SEO (« boulangerie Nantes pain Nantes ») au lieu de décrire l'image.</li>
<li>Mettre tout le contenu d'une affiche promotionnelle dans une image, sans texte.</li>
<li>Se fier aux sous-titres automatiques sans relecture.</li>
<li>Traiter l'accessibilité comme un projet ponctuel plutôt que comme une exigence de qualité permanente.</li>
</ul>

<blockquote><strong>À retenir.</strong> L'accessibilité numérique rend les contenus utilisables par les personnes en situation de handicap et améliore la qualité pour tous. Les WCAG (niveau AA, version 2.1 au minimum, 2.2 recommandée) sont la référence internationale ; le RGAA 4.1 (106 critères) en est la méthode française ; l'acte européen sur l'accessibilité s'applique depuis le 28 juin 2025 aux services de commerce électronique, avec une exemption pour les microentreprises de services. On l'intègre dans chaque fiche action : textes alternatifs, contrastes, clavier, formulaires, sous-titres, emails et publications accessibles.</blockquote>
`,
      },
      {
        title: "4.6 – Introduction à l'email marketing",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Constituer une base de contacts conforme au RGPD et aux règles de la CNIL, en B2C et en B2B.</li>
<li>Segmenter la base et concevoir des campagnes et des scénarios automatisés.</li>
<li>Comprendre la délivrabilité (SPF, DKIM, DMARC, exigences des grandes messageries) et suivre les bons indicateurs.</li>
</ul>

<h3>Les grandes familles d'emails</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type</th><th>Définition</th><th>Exemple Maison Lenoir</th></tr>
<tr><td>Newsletter (lettre d'information)</td><td>Envoi régulier de contenus et d'actualités à une liste d'abonnés</td><td>Lettre bimensuelle « Ce qui sort du four » : produit de saison, recette, lien de commande</td></tr>
<tr><td>Campagne promotionnelle</td><td>Envoi ponctuel lié à une offre ou à un temps fort</td><td>« La galette des rois se commande en ligne dès le 28 décembre »</td></tr>
<tr><td>Email transactionnel</td><td>Message déclenché par une action du client, nécessaire à l'exécution du service</td><td>Confirmation de commande, rappel du créneau de retrait, envoi du devis</td></tr>
<tr><td>Scénario automatisé (automation)</td><td>Suite d'emails déclenchés par un événement ou un comportement, selon des règles prédéfinies</td><td>Bienvenue après inscription ; demande d'avis après commande ; relance de devis non signé</td></tr>
</table>
<p>Les emails transactionnels ne doivent pas être détournés en messages publicitaires : une confirmation de commande peut contenir une information complémentaire discrète, mais la prospection relève des règles de la section suivante.</p>

<h3>Le cadre juridique : RGPD, code des postes et des communications électroniques, CNIL</h3>
<h4>Prospection auprès des particuliers (B2C)</h4>
<ul>
<li>Principe : <strong>consentement préalable</strong> de la personne (article L. 34-5 du code des postes et des communications électroniques). Le consentement doit être libre, spécifique, éclairé et univoque : case <strong>non pré-cochée</strong>, distincte de l'acceptation des CGV.</li>
<li>Exception : la personne est <strong>déjà cliente</strong> et la prospection porte sur des <strong>produits ou services analogues</strong> fournis par la même entreprise ; elle doit avoir été informée et mise en mesure de s'opposer, gratuitement et simplement, lors de la collecte de son adresse, puis dans chaque message.</li>
<li>Exemple : un client qui commande en click &amp; collect peut recevoir des emails sur les produits de la boulangerie s'il a été informé et n'a pas coché « Je ne souhaite pas recevoir d'offres » ; mais l'adresse d'un simple visiteur ayant participé à un jeu concours ne peut être utilisée pour la prospection que s'il y a consenti.</li>
</ul>
<h4>Prospection auprès des professionnels (B2B)</h4>
<ul>
<li>Principe : <strong>information préalable et droit d'opposition</strong> ; le consentement n'est pas exigé, la base légale étant généralement l'intérêt légitime.</li>
<li>Condition : l'objet du message doit être <strong>en rapport avec la fonction</strong> de la personne dans son entreprise (proposer une offre traiteur à une office manager ou à un responsable des services généraux : oui ; à un comptable pour son usage personnel : non).</li>
<li>Chaque message comporte un moyen simple de se désinscrire.</li>
<li>Les adresses génériques (contact@, accueil@) ne sont pas des données personnelles et ne relèvent pas de ces règles, mais l'entreprise reste soumise aux règles de loyauté.</li>
</ul>
<h4>Obligations communes</h4>
<ul>
<li>Identifier clairement l'expéditeur et l'objet commercial du message.</li>
<li>Un <strong>lien de désinscription</strong> fonctionnel dans chaque email ; la demande est traitée rapidement et sans frais.</li>
<li>Informer les personnes lors de la collecte (finalités, durée de conservation, droits, contact) et tenir à jour le registre des traitements.</li>
<li>Durée de conservation : la CNIL recommande de ne pas conserver les données d'un prospect au-delà de 3 ans à compter de la collecte ou du dernier contact émanant de lui ; au terme, on le relance pour savoir s'il souhaite rester inscrit, sinon on supprime.</li>
<li>Conserver la <strong>preuve du consentement</strong> (date, source, texte présenté).</li>
<li>Encadrer le prestataire d'emailing (contrat de sous-traitance au sens du RGPD) et vérifier où sont hébergées les données.</li>
<li><strong>Interdit</strong> : acheter ou louer des fichiers d'adresses de particuliers sans s'assurer d'un consentement valable pour une transmission à des partenaires, ou utiliser des adresses récupérées sur internet.</li>
</ul>

<h3>Constituer sa base de contacts</h3>
<h4>Les points de collecte (exemple Maison Lenoir)</h4>
<ul>
<li>Formulaire d'inscription sur le site (pied de page, page de commande), avec case de consentement non pré-cochée et promesse claire (« 2 emails par mois : nouveautés et offres de saison, désinscription en un clic »).</li>
<li>Parcours de commande click &amp; collect : case d'opposition (clients) conformément à l'exception « produits analogues ».</li>
<li>Boutique : QR code sur le comptoir renvoyant vers le formulaire en ligne (plus sûr qu'une feuille papier pour la preuve du consentement).</li>
<li>Landing page traiteur : inscription à la lettre « Offres entreprises » distincte.</li>
<li>Salons, afterworks de partenaires : collecte de cartes de visite (B2B), suivie d'un premier email d'information avec possibilité de s'opposer.</li>
</ul>
<h4>Bonnes pratiques</h4>
<ul>
<li><strong>Double opt-in</strong> (confirmation de l'inscription par un clic dans un premier email) : non obligatoire en France, mais recommandé pour éviter les adresses erronées et prouver le consentement.</li>
<li>Collecter le minimum de données : email, prénom, et éventuellement préférences (particulier / entreprise, produits favoris). Une date d'anniversaire n'est utile que si l'on a réellement prévu un usage.</li>
<li>Hygiène de la base : supprimer les adresses en erreur permanente, traiter les plaintes, relancer puis retirer les inactifs.</li>
</ul>

<h3>Segmenter la base</h3>
<p>La segmentation consiste à découper la base en groupes homogènes pour leur adresser des messages pertinents. Un email pertinent est plus ouvert, plus cliqué, et génère moins de désinscriptions et de signalements comme spam.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Segments (exemple)</th><th>Usage</th></tr>
<tr><td>Type de contact</td><td>Particuliers / Entreprises</td><td>Deux lettres distinctes ; cadre juridique différent</td></tr>
<tr><td>Statut</td><td>Abonnés non clients / clients click &amp; collect / clients traiteur</td><td>Message de conversion pour les uns, de fidélisation pour les autres</td></tr>
<tr><td>Récence et fréquence d'achat</td><td>Commande dans les 30 derniers jours / 31-90 jours / plus de 90 jours</td><td>Scénario de réactivation des clients inactifs</td></tr>
<tr><td>Préférences déclarées</td><td>Pains spéciaux / pâtisserie / sans lactose…</td><td>Contenus et offres ciblés</td></tr>
<tr><td>Comportement email</td><td>Actifs (clic récent) / inactifs</td><td>Préserver la délivrabilité en ciblant d'abord les actifs</td></tr>
</table>

<h3>Choisir un outil d'emailing</h3>
<p>Les solutions d'emailing (dites aussi ESP, Email Service Providers) permettent de gérer les listes, de créer les messages avec un éditeur visuel, d'envoyer, d'automatiser et de mesurer. Parmi les plus utilisées par les TPE/PME figurent <strong>Brevo</strong> (ex-Sendinblue, entreprise française), <strong>Mailchimp</strong>, ou encore Sarbacane, MailerLite, Klaviyo (orienté e-commerce). Critères de choix :</p>
<ul>
<li>Hébergement des données et conformité RGPD (contrat de sous-traitance, localisation des serveurs, transferts hors Union européenne encadrés).</li>
<li>Modèle tarifaire : au nombre de contacts ou au volume d'envois ; les offres gratuites existent mais sont limitées en contacts, en envois et en fonctionnalités, et leurs plafonds évoluent : se référer à la grille en vigueur.</li>
<li>Fonctionnalités d'automatisation, de segmentation, de formulaires, d'intégration avec le site ou le module de commande.</li>
<li>Qualité de délivrabilité et accompagnement pour l'authentification du domaine.</li>
<li>Gabarits responsives et accessibles, interface en français, support.</li>
</ul>

<h3>Rédiger un email efficace</h3>
<ol>
<li><strong>Nom d'expéditeur</strong> reconnaissable : « Claire – Maison Lenoir ».</li>
<li><strong>Objet</strong> court, concret, honnête : « Votre galette réservée en 2 minutes » ; éviter les majuscules et les points d'exclamation à répétition.</li>
<li><strong>Pré-en-tête</strong> (texte d'aperçu) qui complète l'objet : « Frangipane, pomme ou brioche : retrait dès 7 h ».</li>
<li><strong>Un message principal</strong> et <strong>un appel à l'action principal</strong>, visible sans défiler.</li>
<li>Contenu utile au-delà de la promotion : recette, coulisses, conseil de conservation.</li>
<li>Pied d'email : coordonnées, lien de désinscription, raison de la réception (« Vous recevez cet email car vous êtes inscrit à la lettre de Maison Lenoir »).</li>
<li>Test sur plusieurs messageries et sur mobile, relecture, vérification des liens et des paramètres de suivi (UTM) avant envoi.</li>
</ol>

<h3>Délivrabilité : arriver en boîte de réception</h3>
<p>La <strong>délivrabilité</strong> est la capacité d'un email à atteindre la boîte de réception plutôt que le dossier « indésirables ». Elle dépend de l'authentification technique, de la réputation de l'expéditeur (domaine et serveurs d'envoi) et de l'engagement des destinataires.</p>
<h4>Les trois protocoles d'authentification</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Protocole</th><th>Rôle</th><th>Mise en œuvre</th></tr>
<tr><td><strong>SPF</strong> (Sender Policy Framework)</td><td>Déclare quels serveurs sont autorisés à envoyer des emails pour le domaine</td><td>Enregistrement DNS de type TXT sur le domaine, incluant les serveurs de l'outil d'emailing et de la messagerie habituelle</td></tr>
<tr><td><strong>DKIM</strong> (DomainKeys Identified Mail)</td><td>Signe cryptographiquement chaque message pour prouver qu'il n'a pas été altéré et qu'il provient bien du domaine</td><td>Clé publique publiée dans le DNS, fournie par l'outil d'emailing</td></tr>
<tr><td><strong>DMARC</strong> (Domain-based Message Authentication, Reporting and Conformance)</td><td>Indique aux messageries quoi faire si SPF/DKIM échouent ou ne sont pas alignés avec le domaine visible de l'expéditeur, et permet de recevoir des rapports</td><td>Enregistrement TXT « _dmarc » ; politique p=none (observation) au départ, puis p=quarantine ou p=reject une fois les envois maîtrisés</td></tr>
</table>
<p>Ces enregistrements se paramètrent dans l'interface du fournisseur du nom de domaine ; l'outil d'emailing fournit les valeurs exactes à copier. Prévoir un délai de propagation et un test.</p>
<h4>Les exigences de Gmail et Yahoo depuis février 2024</h4>
<p>Google et Yahoo ont annoncé des règles renforcées applicables à partir de février 2024 :</p>
<ul>
<li>Pour <strong>tous les expéditeurs</strong> : authentification SPF ou DKIM, enregistrements DNS valides, connexion chiffrée (TLS), taux de signalement comme spam maintenu bas (Google recommande de rester sous 0,1 % et fixe un seuil à ne jamais atteindre de 0,3 %).</li>
<li>Pour les <strong>expéditeurs en volume</strong> (Google retient le seuil d'environ 5 000 messages par jour vers des adresses Gmail) : SPF <strong>et</strong> DKIM, un enregistrement <strong>DMARC</strong> (au minimum p=none), alignement du domaine de l'adresse d'expédition avec SPF ou DKIM, et pour les messages marketing une <strong>désinscription en un clic</strong> (en-tête dédié) en plus du lien visible, avec traitement des désinscriptions sous deux jours.</li>
</ul>
<p>Microsoft a annoncé des exigences comparables pour les expéditeurs en volume vers ses messageries grand public (Outlook.com, Hotmail) à partir de 2025. Même si Maison Lenoir est loin de ces volumes, appliquer SPF, DKIM et DMARC est devenu le standard : c'est une action à prévoir dès la mise en place de l'outil.</p>
<h4>Autres bonnes pratiques de délivrabilité</h4>
<ul>
<li>Envoyer depuis le domaine de l'entreprise (contact@maisonlenoir.fr) et non depuis une adresse de messagerie gratuite.</li>
<li>Monter progressivement en volume sur un nouveau domaine ou un nouvel outil.</li>
<li>N'envoyer qu'à des personnes qui l'ont accepté, à un rythme annoncé.</li>
<li>Retirer les adresses en erreur et les inactifs de longue date.</li>
<li>Équilibrer texte et images, éviter les raccourcisseurs de liens douteux.</li>
</ul>

<h3>Les scénarios automatisés</h3>
<p>Un scénario se définit par un <strong>déclencheur</strong>, des <strong>conditions</strong>, des <strong>délais</strong> et des <strong>actions</strong>. Exemples pour Maison Lenoir :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Scénario</th><th>Déclencheur</th><th>Séquence</th><th>Objectif</th></tr>
<tr><td>Bienvenue particuliers</td><td>Inscription confirmée</td><td>J0 : présentation de la maison, best-sellers, lien de commande ; J+7 : « comment marche le click &amp; collect » ; J+14 : invitation à suivre Instagram</td><td>Première commande</td></tr>
<tr><td>Après la première commande</td><td>Première commande retirée (si le module de commande est relié à l'outil d'emailing)</td><td>J+1 : remerciement + demande d'avis Google (à tous les clients, sans condition) ; J+10 : suggestion d'un produit complémentaire</td><td>Avis et deuxième commande</td></tr>
<tr><td>Relance de devis traiteur</td><td>Devis envoyé, statut « non signé »</td><td>J+3 : email personnel de Claire (« des questions sur le devis ? ») ; J+10 : rappel avec un témoignage client ; arrêt si signature</td><td>Signature</td></tr>
<tr><td>Bienvenue entreprise</td><td>Signature du premier devis</td><td>J+1 : remerciement + contact direct ; après la prestation : questionnaire de satisfaction ; M+1 : formules récurrentes (abonnement petit-déjeuner mensuel)</td><td>Récurrence</td></tr>
<tr><td>Réactivation</td><td>Aucune commande depuis 90 jours</td><td>Email « Vous nous manquez » avec la nouveauté du moment ; sans clic à J+30 : demande de confirmation d'abonnement ; sans réponse : retrait de la liste active</td><td>Réactivation et hygiène de la base</td></tr>
</table>
<p>Vérifier, avant de concevoir un scénario, que les données nécessaires remontent effectivement dans l'outil (intégration du module de commande, statut du devis) : sinon le scénario reste théorique.</p>

<h3>Les indicateurs à suivre</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Calcul</th><th>Lecture</th></tr>
<tr><td>Taux de délivrance</td><td>Emails délivrés ÷ emails envoyés</td><td>Qualité de la base (erreurs) ; ne garantit pas l'arrivée en boîte de réception</td></tr>
<tr><td>Taux de rebond (hard / soft)</td><td>Erreurs ÷ envoyés</td><td>Hard bounce : adresse invalide, à supprimer ; soft bounce : erreur temporaire</td></tr>
<tr><td>Taux d'ouverture</td><td>Ouvertures uniques ÷ délivrés</td><td>Indicateur devenu peu fiable depuis que certaines messageries (notamment Apple Mail avec sa protection de la confidentialité) préchargent les emails : à utiliser avec prudence, en tendance</td></tr>
<tr><td>Taux de clic</td><td>Cliqueurs uniques ÷ délivrés</td><td>Indicateur d'engagement le plus fiable</td></tr>
<tr><td>Taux de réactivité</td><td>Cliqueurs ÷ ouvreurs</td><td>Pertinence du contenu</td></tr>
<tr><td>Taux de conversion</td><td>Commandes ou demandes de devis attribuées ÷ délivrés (ou ÷ cliqueurs)</td><td>Contribution aux objectifs ; nécessite des liens suivis (UTM) et un outil d'analyse</td></tr>
<tr><td>Taux de désinscription et de plainte</td><td>Désinscriptions (plaintes) ÷ délivrés</td><td>Pression marketing ou pertinence insuffisante ; les plaintes dégradent fortement la réputation</td></tr>
</table>
<p>Les « taux moyens du marché » publiés par les éditeurs varient fortement selon le secteur, la taille de la base et la méthode de calcul : on compare surtout ses propres résultats d'une campagne à l'autre, et l'on teste (test A/B sur l'objet, l'heure d'envoi, l'appel à l'action) pour progresser.</p>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Importer dans l'outil tous les contacts du téléphone ou de la messagerie sans base légale.</li>
<li>Pré-cocher la case d'inscription, ou la fusionner avec l'acceptation des CGV.</li>
<li>Envoyer la même lettre aux particuliers et aux entreprises.</li>
<li>Oublier l'authentification du domaine et finir en indésirables.</li>
<li>Juger une campagne au seul taux d'ouverture.</li>
<li>Lancer une newsletter sans calendrier éditorial et l'abandonner au troisième numéro.</li>
</ul>

<blockquote><strong>À retenir.</strong> L'email marketing repose sur une base conforme : consentement préalable en B2C (sauf clients pour des produits analogues), information et droit d'opposition en B2B avec un message en rapport avec la fonction, désinscription simple partout. On segmente, on automatise les moments clés (bienvenue, après-achat, relance de devis, réactivation), on authentifie son domaine (SPF, DKIM, DMARC) conformément aux exigences des grandes messageries, et l'on pilote surtout par les clics et les conversions.</blockquote>
`,
      },
      {
        title: "4.7 – Introduction à Google Ads",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Comprendre le fonctionnement de l'enchère Google Ads et la structure d'un compte.</li>
<li>Choisir des mots-clés, des types de correspondance et une stratégie d'enchères adaptés à un petit budget.</li>
<li>Mettre en place la mesure des conversions dans le respect du consentement (Consent Mode v2) et piloter une phase de test.</li>
</ul>

<h3>Principe de fonctionnement</h3>
<p><strong>Google Ads</strong> est la régie publicitaire de Google. Sur le Réseau de Recherche, l'annonceur choisit des <strong>mots-clés</strong> ; lorsqu'un internaute tape une requête correspondante, une <strong>enchère</strong> se déclenche entre les annonceurs éligibles. L'annonceur ne paie que lorsque l'internaute clique (paiement au clic, CPC). La position et l'affichage de l'annonce dépendent de son <strong>classement</strong> (Ad Rank), calculé à partir notamment de l'enchère, de la qualité de l'annonce et de la page de destination, des seuils minimaux, du contexte de la recherche (lieu, appareil, moment) et de l'impact attendu des composants. Conséquence importante pour une TPE : <strong>une annonce de grande qualité peut être mieux placée qu'une annonce concurrente qui enchérit plus</strong>, et le coût réel du clic est généralement inférieur à l'enchère maximale fixée.</p>
<p>Au-delà du Réseau de Recherche, Google Ads permet de diffuser sur le Réseau Display (sites partenaires), YouTube, Gmail, Discover et Google Maps, selon le type de campagne.</p>

<h3>La structure d'un compte</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Niveau</th><th>Ce qui s'y règle</th><th>Exemple Maison Lenoir</th></tr>
<tr><td>Compte</td><td>Facturation, utilisateurs et droits, suivi des conversions, vérification de l'annonceur</td><td>Compte Maison Lenoir, accès administrateur Claire, accès standard au freelance</td></tr>
<tr><td>Campagne</td><td>Objectif, type (Search, Performance Max, Display, Vidéo…), budget quotidien, zone géographique, langue, calendrier de diffusion, stratégie d'enchères</td><td>« Search – Traiteur entreprises – Nantes » : 33 € par jour (environ 1 000 € par mois), rayon de 3 km autour de la boutique, du lundi au vendredi de 7 h à 18 h</td></tr>
<tr><td>Groupe d'annonces</td><td>Un thème homogène : liste de mots-clés proches et annonces correspondantes</td><td>« Petit-déjeuner entreprise », « Plateaux-repas », « Buffet et cocktail »</td></tr>
<tr><td>Mots-clés et annonces</td><td>Les requêtes ciblées ; les textes affichés ; l'URL de destination</td><td>« petit déjeuner entreprise nantes » → landing page traiteur, ancre « Petit-déjeuner »</td></tr>
<tr><td>Composants (assets)</td><td>Informations complémentaires affichées avec l'annonce, au niveau du compte, de la campagne ou du groupe</td><td>Liens vers « Formules », « Devis », « Avis clients » ; numéro d'appel ; adresse</td></tr>
</table>
<p>Règle d'or : <strong>un groupe d'annonces = une intention</strong>. Si l'annonce doit parler de petits-déjeuners, les mots-clés du groupe ne parlent que de petits-déjeuners et l'URL renvoie vers la partie correspondante de la page.</p>

<h3>Les mots-clés et les types de correspondance</h3>
<p>Le type de correspondance détermine l'éventail des requêtes pour lesquelles un mot-clé peut déclencher l'annonce.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type</th><th>Notation</th><th>Déclenchement</th><th>Exemple pour « traiteur entreprise nantes »</th></tr>
<tr><td>Requête large</td><td>traiteur entreprise nantes</td><td>Requêtes liées au sens du mot-clé, y compris sans les mots exacts ; s'appuie sur des signaux contextuels. Portée maximale, contrôle minimal</td><td>Peut déclencher « repas séminaire Saint-Herblain », « buffet mariage Nantes »</td></tr>
<tr><td>Expression exacte</td><td>"traiteur entreprise nantes"</td><td>Requêtes qui incluent le sens du mot-clé, éventuellement avec des mots avant ou après</td><td>« meilleur traiteur entreprise nantes centre »</td></tr>
<tr><td>Mot clé exact</td><td>[traiteur entreprise nantes]</td><td>Requêtes ayant le même sens ou la même intention que le mot-clé</td><td>« traiteur pour entreprise à nantes »</td></tr>
<tr><td>Mots-clés à exclure (négatifs)</td><td>-recette, -emploi</td><td>Empêchent la diffusion sur les requêtes contenant ces termes</td><td>Exclure « recette », « emploi », « recrutement », « formation », « CAP », « gratuit », « mariage »</td></tr>
</table>
<p>Conseil pour un petit budget : commencer avec l'<strong>expression exacte</strong> et le <strong>mot clé exact</strong>, une liste de mots-clés à exclure dès le lancement, puis consulter chaque semaine le <strong>rapport sur les termes de recherche</strong> pour ajouter des mots-clés pertinents et exclure les requêtes hors sujet. La requête large s'envisage plutôt avec une stratégie d'enchères axée sur les conversions et un suivi des conversions fiable.</p>
<p>L'<strong>Outil de planification des mots clés</strong> (dans Google Ads) aide à trouver des idées et donne des fourchettes de volumes de recherche et d'enchères estimées ; pour des requêtes très locales, les volumes sont faibles et les estimations peu précises.</p>

<h4>Exemple de structure de mots-clés (campagne traiteur)</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Groupe d'annonces</th><th>Mots-clés (exemples)</th><th>Destination</th></tr>
<tr><td>Petit-déjeuner entreprise</td><td>"petit déjeuner entreprise nantes" ; "livraison petit déjeuner bureau" ; [petit déjeuner séminaire nantes]</td><td>Landing page traiteur, section Petit-déjeuner</td></tr>
<tr><td>Plateaux-repas</td><td>"plateau repas entreprise nantes" ; "plateau repas livraison nantes" ; [plateaux repas bureau nantes]</td><td>Section Plateaux-repas</td></tr>
<tr><td>Buffet et cocktail</td><td>"buffet entreprise nantes" ; "traiteur cocktail entreprise" ; [traiteur pot de départ nantes]</td><td>Section Cocktail</td></tr>
</table>

<h3>Les annonces</h3>
<p>Le format standard du Réseau de Recherche est l'<strong>annonce responsive</strong> : on fournit jusqu'à <strong>15 titres</strong> (30 caractères maximum chacun) et jusqu'à <strong>4 descriptions</strong> (90 caractères maximum), et Google assemble automatiquement les combinaisons les plus performantes. On peut épingler un élément à une position lorsqu'il doit toujours apparaître (par exemple une mention obligatoire), au prix d'une moindre flexibilité.</p>
<h4>Exemple d'éléments pour le groupe « Petit-déjeuner entreprise »</h4>
<ul>
<li>Titres : « Petit-déjeuner d'entreprise » ; « Livré à vos bureaux à Nantes » ; « Viennoiseries artisanales » ; « Commande la veille avant 16 h » ; « Devis en 24 h ouvrées » ; « Boulangerie Maison Lenoir »…</li>
<li>Descriptions : « Viennoiseries, pains au levain et jus pressés, préparés le matin même dans notre fournil nantais. » ; « Formules de 8 à 60 personnes, livraison dès 7 h 30 dans un rayon de 3 km. Demandez votre devis. »</li>
<li>Chemin d'affichage : maisonlenoir.fr/traiteur/petit-dejeuner.</li>
</ul>
<p>Les promesses doivent être exactes (délais, zone, prix « à partir de ») : une annonce trompeuse expose à un refus de la plateforme et aux règles sur les pratiques commerciales trompeuses.</p>

<h3>Les composants (anciennement « extensions »)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Composant</th><th>Usage</th><th>Exemple</th></tr>
<tr><td>Liens annexes (sitelinks)</td><td>Liens supplémentaires vers d'autres pages</td><td>« Nos formules », « Demander un devis », « Avis clients », « Allergènes »</td></tr>
<tr><td>Accroches</td><td>Courts arguments non cliquables</td><td>« Fait maison », « Livraison dès 7 h 30 », « Facture entreprise »</td></tr>
<tr><td>Extraits de site structurés</td><td>Liste de valeurs sous un en-tête prédéfini</td><td>Types : petit-déjeuner, plateau-repas, cocktail, buffet</td></tr>
<tr><td>Appel</td><td>Numéro de téléphone cliquable sur mobile</td><td>Numéro de la boutique, aux horaires d'ouverture</td></tr>
<tr><td>Lieu</td><td>Adresse et itinéraire, via l'association de la fiche Google Business Profile</td><td>Adresse de la boutique</td></tr>
<tr><td>Image, prix, promotion, formulaire pour prospects</td><td>Selon l'éligibilité du compte et de la campagne</td><td>Photo d'un plateau ; « Plateau-repas à partir de … € »</td></tr>
</table>
<p>Les composants améliorent la visibilité de l'annonce et entrent dans le calcul du classement : il est recommandé d'en renseigner plusieurs dès le lancement.</p>

<h3>Le niveau de qualité (Quality Score)</h3>
<p>Le <strong>niveau de qualité</strong> est une note de 1 à 10, attribuée par mot-clé, qui sert d'outil de diagnostic. Il repose sur trois composantes, chacune évaluée « inférieure à la moyenne », « dans la moyenne » ou « supérieure à la moyenne » :</p>
<ol>
<li><strong>Taux de clics attendu</strong> : probabilité que l'annonce soit cliquée.</li>
<li><strong>Pertinence de l'annonce</strong> : correspondance entre le mot-clé et le message de l'annonce.</li>
<li><strong>Expérience sur la page de destination</strong> : pertinence, clarté, rapidité et facilité d'utilisation de la page, notamment sur mobile.</li>
</ol>
<p>Leviers d'amélioration : groupes d'annonces resserrés, mots-clés repris dans les titres, page de destination qui répond exactement à la promesse, page rapide et accessible. On voit ici la cohérence avec la section 4.5 : une page accessible et claire est aussi une meilleure page de destination.</p>

<h3>Les stratégies d'enchères</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Stratégie</th><th>Principe</th><th>Quand l'utiliser</th></tr>
<tr><td>CPC manuel</td><td>L'annonceur fixe lui-même l'enchère maximale par mot-clé</td><td>Contrôle fin, mais demande du temps et de l'expertise</td></tr>
<tr><td>Maximiser les clics</td><td>Google cherche le maximum de clics dans le budget ; possibilité de plafonner le CPC</td><td>Phase de démarrage, pour générer du trafic et des données</td></tr>
<tr><td>Maximiser les conversions (avec CPA cible facultatif)</td><td>Enchères automatiques visant le plus de conversions possible, éventuellement à un coût par action cible</td><td>Dès que le suivi des conversions est fiable et que le volume de conversions est suffisant</td></tr>
<tr><td>Maximiser la valeur de conversion (avec ROAS cible facultatif)</td><td>Vise la valeur totale des conversions</td><td>Commerce en ligne avec des valeurs de commande transmises</td></tr>
<tr><td>Taux d'impressions cible</td><td>Vise un pourcentage d'apparition (par exemple en haut de page)</td><td>Notoriété, protection de la marque</td></tr>
</table>
<p>Les stratégies automatiques ont besoin de données : avec très peu de conversions par mois, elles apprennent lentement. Pour Maison Lenoir, on commence par « Maximiser les clics » avec un CPC maximal plafonné, puis on bascule vers « Maximiser les conversions » lorsque les demandes de devis sont mesurées de façon fiable et en nombre suffisant.</p>

<h3>Le budget et sa logique de dépense</h3>
<ul>
<li>Le budget se fixe par <strong>jour en moyenne</strong> au niveau de la campagne. Google peut dépenser jusqu'à <strong>deux fois</strong> le budget quotidien certains jours de forte demande, mais ne facture pas, sur un mois, plus que le budget quotidien multiplié par le nombre moyen de jours dans un mois (environ 30,4).</li>
<li>Exemple : 10 € par jour → au maximum environ 304 € facturés sur le mois.</li>
<li><strong>Budget de test</strong> : il doit être suffisant pour obtenir un volume de clics interprétable. Un raisonnement simple pour Maison Lenoir : avec un CPC supposé de 1,50 à 2,50 € (sous le plafond de 3,50 € fixé par la stratégie), 1 000 € par mois donnent environ 400 à 650 clics, ce qui permet d'observer une quinzaine à une vingtaine de demandes de devis si le taux de conversion supposé de 4 % se vérifie, et de juger la pertinence des requêtes. On fixe une durée de test (6 à 8 semaines par exemple) et des critères de décision avant de lancer.</li>
</ul>

<h3>Performance Max</h3>
<p><strong>Performance Max</strong> est un type de campagne fondé sur un objectif de conversion, qui diffuse les annonces sur l'ensemble des canaux de Google (Recherche, Display, YouTube, Gmail, Discover, Maps) à partir de <strong>groupes d'éléments</strong> (textes, images, vidéos, logos) et de <strong>signaux d'audience</strong> fournis par l'annonceur. L'algorithme décide des emplacements, des combinaisons et des enchères. Les anciennes campagnes « locales » ont été intégrées à Performance Max, qui peut viser des objectifs de visites en magasin.</p>
<ul>
<li><strong>Atouts</strong> : couverture large, création automatique de combinaisons, intérêt pour les objectifs de ventes ou de visites lorsque les conversions sont bien mesurées.</li>
<li><strong>Limites pour une TPE</strong> : moins de contrôle et de transparence que le Search (même si Google a progressivement ajouté des options de rapport et d'exclusion, à vérifier dans l'interface au moment du paramétrage), besoin de bons visuels et de vidéos, besoin d'un volume de conversions pour bien apprendre, risque de dépenser sur des requêtes de marque déjà acquises.</li>
<li><strong>Recommandation pour Maison Lenoir</strong> : démarrer par une campagne Search sur des requêtes à forte intention ; envisager Performance Max dans un second temps, avec un suivi des conversions fiable et des éléments créatifs de qualité.</li>
</ul>
<p>Pour les très petites structures, Google propose aussi des campagnes simplifiées (dites intelligentes) au paramétrage guidé, au prix d'un contrôle encore plus réduit.</p>

<h3>Mesurer les conversions</h3>
<p>Sans suivi des conversions, on ne sait pas si les clics produisent des résultats, et les stratégies d'enchères automatiques n'ont pas de signal à optimiser.</p>
<ul>
<li><strong>Définir les conversions</strong> : pour Maison Lenoir, « demande de devis envoyée » (principale), « clic sur le numéro de téléphone » et « appel depuis l'annonce » (secondaires), « commande click &amp; collect » (pour d'autres campagnes).</li>
<li><strong>Installer le suivi</strong> : balise Google (directement ou via Google Tag Manager), ou import des conversions depuis Google Analytics 4.</li>
<li><strong>Conversions améliorées</strong> : transmettent de façon hachée des données saisies par l'utilisateur (comme l'email du formulaire) pour améliorer la mesure ; elles nécessitent une information des utilisateurs et une base légale adaptée.</li>
<li><strong>Conversions hors ligne</strong> : pour le B2B, on peut importer dans Google Ads les devis effectivement signés (en conservant l'identifiant de clic), afin d'optimiser vers les vrais clients plutôt que vers les simples demandes.</li>
</ul>

<h3>Consentement et Consent Mode v2</h3>
<p>Les balises publicitaires et de mesure déposent ou lisent des traceurs : en France, elles ne peuvent fonctionner qu'après le consentement de l'internaute, recueilli par une <strong>plateforme de gestion du consentement</strong> (CMP, le bandeau cookies), avec un refus aussi simple que l'acceptation.</p>
<p>Le <strong>mode Consentement de Google (Consent Mode)</strong> permet aux balises Google d'adapter leur comportement au choix exprimé dans la CMP. Sa version 2, attendue par Google pour les utilisateurs de l'Espace économique européen depuis mars 2024, transmet quatre signaux :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Paramètre</th><th>Signification</th></tr>
<tr><td>ad_storage</td><td>Autorise ou non le stockage lié à la publicité (cookies publicitaires)</td></tr>
<tr><td>analytics_storage</td><td>Autorise ou non le stockage lié à la mesure d'audience</td></tr>
<tr><td>ad_user_data</td><td>Autorise ou non l'envoi à Google de données utilisateur à des fins publicitaires (paramètre ajouté par la v2)</td></tr>
<tr><td>ad_personalization</td><td>Autorise ou non la personnalisation des annonces, dont le remarketing (paramètre ajouté par la v2)</td></tr>
</table>
<ul>
<li><strong>Mode basique</strong> : les balises Google ne se chargent pas tant que l'utilisateur n'a pas consenti ; aucune donnée n'est transmise en cas de refus. C'est la mise en œuvre la plus prudente.</li>
<li><strong>Mode avancé</strong> : les balises se chargent et, en cas de refus, envoient des signaux sans cookies (« pings ») permettant à Google de modéliser les conversions. Ce mode doit être examiné au regard des recommandations de la CNIL avant d'être retenu.</li>
<li>Sans signaux de consentement v2, les fonctions de mesure, d'audience et de remarketing de Google Ads sont limitées pour les utilisateurs européens.</li>
<li>En pratique : choisir une CMP compatible avec le Consent Mode (Google publie une liste de CMP partenaires), la paramétrer avec « Tout refuser » au premier niveau, tester que les balises respectent le refus, documenter le choix.</li>
</ul>

<h3>Lancer et piloter une campagne de test : méthode pas à pas</h3>
<ol>
<li>Vérifier les prérequis : landing page en ligne, rapide, accessible ; formulaire testé ; CMP et Consent Mode en place ; conversion « demande de devis » remontée dans Google Ads.</li>
<li>Créer la campagne Search : zone géographique (rayon autour de la boutique ; option de ciblage des personnes présentes ou régulièrement présentes dans la zone), langue, calendrier (jours et heures d'ouverture des bureaux), budget de 10 € par jour.</li>
<li>Créer 2 à 3 groupes d'annonces thématiques, 5 à 15 mots-clés chacun en expression exacte et mot clé exact, une liste de mots-clés à exclure.</li>
<li>Rédiger une annonce responsive par groupe avec un maximum de titres et descriptions variés ; ajouter les composants.</li>
<li>Stratégie de démarrage : « Maximiser les clics » avec CPC maximal plafonné.</li>
<li>Chaque semaine : analyser les termes de recherche, exclure le hors-sujet, contrôler le CPC, le taux de clics, les conversions et le coût par conversion.</li>
<li>Après 6 à 8 semaines : décision selon les critères fixés au départ (par exemple : coût par demande de devis inférieur à 88 € et coût d'acquisition client inférieur à 220 € → on poursuit et on passe à « Maximiser les conversions » ; sinon on corrige la page, l'offre ou les mots-clés, ou l'on réalloue le budget).</li>
</ol>

<h3>Tableau de bord de la campagne (exemple, chiffres fictifs)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Semaines 1-4</th><th>Semaines 5-8</th><th>Lecture</th></tr>
<tr><td>Impressions</td><td>9 500</td><td>10 400</td><td>Visibilité en légère hausse</td></tr>
<tr><td>Clics</td><td>420</td><td>510</td><td>Taux de clics en hausse après réécriture des titres</td></tr>
<tr><td>CPC moyen</td><td>2,35 €</td><td>1,95 €</td><td>Baisse liée à l'amélioration du niveau de qualité et aux exclusions ; toujours sous le plafond de 3,50 €</td></tr>
<tr><td>Coût</td><td>987 €</td><td>995 €</td><td>Dans le budget</td></tr>
<tr><td>Demandes de devis</td><td>11</td><td>19</td><td>Formulaire raccourci en semaine 4</td></tr>
<tr><td>Coût par demande</td><td>90 €</td><td>52 €</td><td>Au-dessus du plafond de 88 € au départ, nettement en dessous ensuite</td></tr>
<tr><td>Devis signés</td><td>4</td><td>8</td><td>CAC de 247 € puis de 124 € : le plafond de 220 € est respecté en deuxième période</td></tr>
</table>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Envoyer les clics vers la page d'accueil plutôt que vers une page dédiée.</li>
<li>Lancer sans suivi des conversions ou sans bandeau de consentement conforme.</li>
<li>Utiliser la requête large avec un petit budget et sans mots-clés à exclure : le budget part sur des requêtes hors sujet.</li>
<li>Accepter toutes les « recommandations » automatiques sans les analyser, notamment celles qui augmentent le budget ou élargissent la correspondance.</li>
<li>Laisser le réseau Display activé dans une campagne Search sans l'avoir décidé.</li>
<li>Juger la campagne au bout de quelques jours, ou la laisser tourner des mois sans la regarder.</li>
</ul>

<blockquote><strong>À retenir.</strong> Google Ads fonctionne par enchères au clic où la qualité compte autant que le prix. Un compte se structure en campagnes (budget, zone, enchères), groupes d'annonces thématiques et mots-clés ; on démarre en expression exacte et mot clé exact avec des mots-clés à exclure, des annonces responsives et des composants. Le niveau de qualité dépend du taux de clics attendu, de la pertinence de l'annonce et de la page de destination. On mesure les conversions dans le respect du consentement (Consent Mode v2), on teste avec un budget et des critères de décision définis, et l'on réserve Performance Max aux comptes disposant de conversions fiables.</blockquote>
`,
      },
      {
        title: "4.8 – Quiz de fin de chapitre",
        content: `
<p>Pour chaque question, une seule réponse est correcte. Le corrigé figure après chaque question.</p>

<h4>Question 1 – Quelle rubrique n'est PAS indispensable dans une fiche action ?</h4>
<ol type="A">
<li>Le responsable unique de l'action</li>
<li>L'indicateur de résultat et sa valeur cible</li>
<li>Le logo de chaque outil utilisé</li>
<li>Le budget en argent et en temps interne</li>
</ol>
<p><strong>Réponse : C.</strong> Une fiche action précise l'objectif rattaché, le livrable, le responsable, les dates, les dépendances, le budget et l'indicateur. Les logos des outils n'apportent rien au pilotage.</p>

<h4>Question 2 – Dans un diagramme de Gantt, le chemin critique est…</h4>
<ol type="A">
<li>la liste des tâches les plus coûteuses</li>
<li>la suite de tâches dépendantes dont tout retard décale la date de fin du projet</li>
<li>l'ensemble des tâches confiées au dirigeant</li>
<li>la période de l'année où l'activité est la plus forte</li>
</ol>
<p><strong>Réponse : B.</strong> Le chemin critique détermine la durée totale ; les tâches qui le composent n'ont pas de marge et sont à surveiller en priorité.</p>

<h4>Question 3 – Depuis quelle date l'acte européen sur l'accessibilité (EAA) s'applique-t-il, et qui est exempté pour les services ?</h4>
<ol type="A">
<li>Depuis le 1er janvier 2024 ; aucune entreprise</li>
<li>Depuis le 28 juin 2025 ; les microentreprises de moins de 10 personnes dont le chiffre d'affaires ou le total de bilan n'excède pas 2 M€</li>
<li>Depuis le 28 juin 2025 ; toutes les entreprises de moins de 250 salariés</li>
<li>Il ne s'appliquera qu'en 2030 ; les commerces alimentaires</li>
</ol>
<p><strong>Réponse : B.</strong> L'EAA s'applique depuis le 28 juin 2025, notamment aux services de commerce électronique ; les microentreprises fournissant des services sont exemptées de ces obligations.</p>

<h4>Question 4 – Quel ratio de contraste minimal les WCAG (niveau AA) exigent-elles pour le texte courant ?</h4>
<ol type="A">
<li>2:1</li>
<li>3:1</li>
<li>4,5:1</li>
<li>7:1</li>
</ol>
<p><strong>Réponse : C.</strong> 4,5:1 pour le texte courant ; 3:1 pour le grand texte et les composants d'interface ; 7:1 correspond au niveau AAA.</p>

<h4>Question 5 – Pour une publication Instagram accessible, quelle pratique est recommandée ?</h4>
<ol type="A">
<li>Écrire les hashtags en minuscules collées (#galettedesrois)</li>
<li>Mettre le prix et les horaires uniquement dans l'image</li>
<li>Renseigner le texte alternatif et écrire les hashtags en CamelCase (#GaletteDesRois)</li>
<li>Utiliser des polices Unicode stylisées pour attirer l'attention</li>
</ol>
<p><strong>Réponse : C.</strong> Le CamelCase permet une lecture correcte par les lecteurs d'écran ; le texte alternatif décrit l'image ; l'information essentielle doit figurer dans le texte.</p>

<h4>Question 6 – Maison Lenoir souhaite envoyer une offre traiteur par email à l'office manager d'une PME, dont elle a obtenu la carte de visite lors d'un afterwork. Que dit la règle ?</h4>
<ol type="A">
<li>Il faut obligatoirement un consentement préalable écrit</li>
<li>C'est interdit en toutes circonstances</li>
<li>C'est possible si la personne est informée, que l'offre est en rapport avec sa fonction et qu'elle peut s'opposer simplement à tout moment</li>
<li>C'est possible sans lien de désinscription puisqu'il s'agit d'un professionnel</li>
</ol>
<p><strong>Réponse : C.</strong> En B2B, la prospection repose sur l'information préalable et le droit d'opposition, avec un message en lien avec la fonction ; un moyen de désinscription simple est toujours requis.</p>

<h4>Question 7 – Quel enregistrement DNS indique aux messageries ce qu'elles doivent faire des emails qui échouent aux contrôles d'authentification ?</h4>
<ol type="A">
<li>SPF</li>
<li>DKIM</li>
<li>DMARC</li>
<li>MX</li>
</ol>
<p><strong>Réponse : C.</strong> SPF liste les serveurs autorisés, DKIM signe les messages, DMARC fixe la politique (none, quarantine, reject) et organise les rapports ; MX désigne les serveurs de réception.</p>

<h4>Question 8 – Quelles sont les trois composantes du niveau de qualité Google Ads ?</h4>
<ol type="A">
<li>Budget, enchère, ancienneté du compte</li>
<li>Taux de clics attendu, pertinence de l'annonce, expérience sur la page de destination</li>
<li>Nombre de mots-clés, nombre d'annonces, nombre de composants</li>
<li>Taux d'ouverture, taux de clic, taux de conversion</li>
</ol>
<p><strong>Réponse : B.</strong> Le niveau de qualité (1 à 10) est un diagnostic par mot-clé fondé sur ces trois composantes.</p>

<h4>Question 9 – Une campagne a un budget quotidien de 10 €. Quel est, sur un mois, le montant maximal facturé dans le fonctionnement standard de Google Ads ?</h4>
<ol type="A">
<li>10 €</li>
<li>Environ 304 €</li>
<li>600 €</li>
<li>Aucun plafond</li>
</ol>
<p><strong>Réponse : B.</strong> La dépense peut atteindre le double du budget quotidien certains jours, mais la facturation mensuelle ne dépasse pas le budget quotidien multiplié par 30,4 environ.</p>

<h4>Question 10 – Que permet le Consent Mode v2 de Google ?</h4>
<ol type="A">
<li>Se dispenser de bandeau cookies</li>
<li>Transmettre aux balises Google le choix de l'internaute (dont les signaux ad_user_data et ad_personalization) pour qu'elles adaptent leur fonctionnement</li>
<li>Collecter automatiquement le consentement à la prospection par email</li>
<li>Augmenter le niveau de qualité des annonces</li>
</ol>
<p><strong>Réponse : B.</strong> Le Consent Mode ne remplace pas la CMP : il relaie le choix exprimé dans le bandeau aux balises Google. La v2 ajoute les paramètres ad_user_data et ad_personalization.</p>
`,
      },
      {
        title: "4.9 – Cas pratique : décliner la stratégie en plan d'action accessible",
        content: `
<h3>Consigne</h3>
<p>Vous accompagnez Maison Lenoir (ou, si vous le préférez, votre propre entreprise, en transposant chaque étape). À partir des objectifs et de la stratégie définis dans les chapitres précédents, élaborez le plan d'action webmarketing pour les six prochains mois. Votre production comprend :</p>
<ol>
<li>un tableau de rattachement objectifs → leviers → actions (au moins 8 actions, dont au moins une par levier retenu) ;</li>
<li>deux fiches actions détaillées, dont l'une porte sur l'email marketing et l'autre sur Google Ads ;</li>
<li>un rétroplanning daté vers un jalon saisonnier de votre choix et un diagramme de Gantt sur 6 mois, avec responsables et jalons ;</li>
<li>un budget par action, avec réserve pour imprévus et valorisation du temps interne, et un calcul de seuil de rentabilité ou de CPA maximal acceptable ;</li>
<li>les fonctionnalités et vérifications d'accessibilité intégrées à chaque livrable (site, emails, réseaux sociaux, vidéos, documents) ;</li>
<li>la conformité : base légale de la prospection email (B2C et B2B), gestion du consentement aux cookies.</li>
</ol>
<p>Durée conseillée : à réaliser pendant le temps de travail personnel ; restitution courte devant le groupe. Les données chiffrées que vous inventez pour l'exercice doivent être présentées comme des hypothèses.</p>

<h3>Corrigé détaillé (proposition pour Maison Lenoir)</h3>
<h4>1. Rattachement objectifs → actions</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Objectif (hypothèse)</th><th>Levier</th><th>Actions</th></tr>
<tr><td rowspan="5">O1 – 120 commandes en ligne par mois au 6e mois (avril 2027) ; O3 – 300 avis Google à 12 mois</td><td>Site</td><td>A-02 Module click &amp; collect avec créneaux ; A-06 Audit et corrections d'accessibilité</td></tr>
<tr><td>Google Business Profile / avis</td><td>A-01 Fiche complète, lien de commande, collecte d'avis par QR code et email</td></tr>
<tr><td>Email</td><td>A-07 Outil, formulaires, scénarios ; A-08 Newsletter bimensuelle</td></tr>
<tr><td>Réseaux sociaux</td><td>A-10 Calendrier éditorial Instagram/Facebook + publicité locale</td></tr>
<tr><td>Contenus</td><td>A-04 Séance photo ; A-12 Opération galette des rois</td></tr>
<tr><td rowspan="4">O2 – 25 demandes de devis B2B par mois dès le 4e mois (février 2027)</td><td>Offre</td><td>A-03 Grille tarifaire et plaquette traiteur accessible</td></tr>
<tr><td>Site</td><td>A-05 Landing page traiteur avec formulaire de devis</td></tr>
<tr><td>SEA</td><td>A-09 Campagne Google Ads Search traiteur</td></tr>
<tr><td>LinkedIn / partenariats</td><td>A-11 Page LinkedIn ; A-13 Trois partenariats locaux</td></tr>
</table>

<h4>2. Fiche action email (A-07/A-08)</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu</th></tr>
<tr><td>Objectif</td><td>O1 – 120 commandes en ligne par mois au 6e mois (et O2 pour la liste entreprises)</td></tr>
<tr><td>Description</td><td>Mise en place d'un outil d'emailing ; authentification du domaine (SPF, DKIM, DMARC en p=none puis durcissement) ; deux listes (Particuliers, Entreprises) ; formulaires sur le site et QR code en boutique ; gabarit accessible ; scénarios « bienvenue », « après première commande », « relance de devis », « réactivation » ; newsletter bimensuelle</td></tr>
<tr><td>Base légale</td><td>Particuliers : consentement (case non pré-cochée, double opt-in) ou exception clients pour produits analogues avec possibilité d'opposition ; entreprises : information et droit d'opposition, message en rapport avec la fonction ; désinscription en un clic dans chaque message ; conservation 3 ans après le dernier contact pour les prospects</td></tr>
<tr><td>Accessibilité</td><td>Langue déclarée, textes alternatifs, pas d'email tout-image, contraste ≥ 4,5:1, bouton en texte réel, version texte</td></tr>
<tr><td>Responsable / dates</td><td>Claire ; mise en place du 16/11 au 11/12/2026 ; premier envoi le 15/12/2026</td></tr>
<tr><td>Budget</td><td>150 € d'abonnement sur 6 mois (hypothèse à vérifier sur la grille tarifaire) + 12 h de mise en place + 2 h par envoi</td></tr>
<tr><td>Indicateurs</td><td>400 inscrits particuliers et 80 contacts entreprises fin mars (hypothèse) ; taux de clic suivi en tendance ; commandes attribuées via liens suivis ; taux de plainte très bas</td></tr>
</table>

<h4>3. Fiche action Google Ads (A-09)</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu</th></tr>
<tr><td>Objectif</td><td>O2 – contribuer aux 25 demandes de devis B2B par mois visées dès février 2027, à moins de 88 € par demande</td></tr>
<tr><td>Prérequis</td><td>Landing page A-05 en ligne ; conversion « demande de devis » et appels suivis ; CMP avec « Tout refuser » au premier niveau ; Consent Mode v2 en mode basique</td></tr>
<tr><td>Structure</td><td>1 campagne Search, rayon 3 km, du lundi au vendredi 7 h – 18 h ; 3 groupes (Petit-déjeuner, Plateaux-repas, Buffet/cocktail) ; mots-clés en expression exacte et mot clé exact ; liste de mots-clés à exclure ; 1 annonce responsive par groupe ; composants liens annexes, accroches, appel, lieu</td></tr>
<tr><td>Enchères / budget</td><td>« Maximiser les clics » avec CPC maximal plafonné à 3,50 € pendant le test, puis « Maximiser les conversions » ; 33 € par jour (environ 1 000 € par mois), de janvier à avril</td></tr>
<tr><td>Calendrier</td><td>Paramétrage du 4 au 8/01/2027 ; test du 11/01 au 05/03/2027 ; revue de décision le 08/03/2027</td></tr>
<tr><td>Critères de décision</td><td>Poursuite si coût par demande ≤ 88 € et coût d'acquisition client ≤ 220 € ; sinon correction de la page ou de l'offre, ou réallocation vers LinkedIn et les partenariats</td></tr>
</table>

<h4>4. Rétroplanning et Gantt</h4>
<p>Le jalon choisi est l'ouverture de la commande en ligne des galettes le 28/12/2026. Rétroplanning : page produit et paramétrage des galettes dans le module au plus tard le 18/12 (2 jours de travail) ; photos et textes au plus tard le 11/12 ; décision de la gamme et des prix au plus tard le 4/12 ; publications programmées du 28/12 au 15/01 ; email aux particuliers le 29/12 et le 5/01 ; post LinkedIn « galette au bureau » le 6/01. Le Gantt sur 6 mois reprend celui de la section 4.3, avec le chemin critique traiteur (grille tarifaire → photos → landing page → Google Ads), le lissage des tâches hors de la période des fêtes, et deux jalons de revue (mi-janvier et fin avril). Pour être accessible, le Gantt utilise des symboles et une légende, et non la seule couleur.</p>

<h4>5. Budget et rentabilité</h4>
<p>Reprise du budget de la section 4.4 : 8 544 € de dépenses externes, 1 056 € de réserve, 9 600 € décaissés sur 6 mois (moitié du budget annuel de 19 200 € HT), 5 900 € de temps interne valorisé, soit 15 500 € de coût complet (hypothèses). Seuil de rentabilité à environ 25 800 € de chiffre d'affaires additionnel avec une marge sur coût matières supposée de 60 %. Repères de pilotage hérités de la stratégie : CAC maximal d'environ 220 €, coût maximal par demande de devis d'environ 88 €, CPC maximal d'environ 3,50 €, à comparer aux valeurs observées pendant le test.</p>

<h4>6. Accessibilité intégrée</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Livrable</th><th>Fonctionnalités et vérifications</th></tr>
<tr><td>Module click &amp; collect</td><td>Parcours au clavier, focus visible, étiquettes de champs, créneaux complets signalés en texte, cibles tactiles d'au moins 24 × 24 pixels, messages d'erreur explicites, contraste vérifié</td></tr>
<tr><td>Landing page traiteur</td><td>Titres hiérarchisés, alternatives des photos de plateaux, formules et prix en HTML, plaquette PDF balisée, liens explicites</td></tr>
<tr><td>Emails</td><td>Langue, alternatives, bouton texte, version texte, lien de désinscription visible</td></tr>
<tr><td>Réseaux sociaux</td><td>Textes alternatifs, hashtags en CamelCase, émojis en fin de texte, informations clés dans le texte, vidéos sous-titrées et relues</td></tr>
<tr><td>Bandeau cookies</td><td>Atteignable au clavier, boutons de même niveau « Tout accepter » / « Tout refuser »</td></tr>
<tr><td>Information</td><td>Page « Accessibilité » : état de conformité, points connus, contact pour une alternative (téléphone, email)</td></tr>
</table>
<p>Commentaire attendu : avec 6 salariés et 780 k€ HT de chiffre d'affaires (exemple), Maison Lenoir relève a priori de l'exemption de l'EAA accordée aux microentreprises prestataires de services ; l'accessibilité n'est donc pas pour elle une obligation légale. Elle applique néanmoins les bonnes pratiques WCAG 2.1 AA (cible 2.2 AA) parce que ses clients en ont besoin, que ses clients B2B y sont de plus en plus attentifs, que cela améliore la conversion et le référencement, et qu'une croissance au-delà des seuils la rendrait soumise aux obligations.</p>

<h4>Points de vigilance relevés lors de la correction</h4>
<ul>
<li>Des actions sans indicateur ou sans responsable nominatif.</li>
<li>Un calendrier qui ignore la saisonnalité (campagne B2B lancée pendant les fêtes).</li>
<li>Un budget sans temps interne ni réserve.</li>
<li>Une prospection email B2C fondée sur un fichier sans consentement.</li>
<li>Une accessibilité réduite à une ligne générale (« le site sera accessible ») sans fonctionnalités concrètes.</li>
<li>Des statistiques de marché citées sans source : préférer des hypothèses explicitement présentées comme telles.</li>
</ul>

<h3>Ce que le formateur évaluera dans le projet final</h3>
<p>Le projet final de la formation consiste à élaborer un projet webmarketing pour votre propre entreprise, présenté sous forme d'un dossier écrit puis d'une présentation orale au formateur ; cette évaluation interne conditionne la délivrance de l'attestation de fin de formation. Pour la partie « plan d'action », le formateur vérifiera que : chaque action découle d'un objectif et d'un choix stratégique clairement rappelés ; les actions couvrent les leviers retenus et précisent livrable, responsable, dates, budget et indicateur ; un planning lisible (rétroplanning, Gantt) tient compte de vos contraintes réelles d'activité et de saisonnalité ; le budget est réaliste, complet et relié aux résultats attendus ; des fonctionnalités d'accessibilité concrètes sont intégrées à vos supports (site, emails, réseaux sociaux, vidéos, documents) ; vos actions email et publicitaires respectent le RGPD et les règles sur les cookies. À l'oral, soyez prêt à justifier vos priorités et vos arbitrages (« pourquoi cette action avant celle-ci ? », « que ferez-vous si le coût par demande dépasse votre seuil ? »), à distinguer clairement vos hypothèses de vos données réelles et à montrer comment vous suivrez et ajusterez le plan.</p>

<blockquote><strong>À retenir.</strong> Un bon plan d'action est cohérent (chaque action sert un objectif), réaliste (temps, budget, saisonnalité), mesurable (indicateurs installés dès le départ), conforme (RGPD, cookies, règles des plateformes) et accessible (fonctionnalités concrètes dans chaque livrable). C'est ce que vous démontrerez dans votre projet final.</blockquote>
`,
      },
    ],
  },
];
