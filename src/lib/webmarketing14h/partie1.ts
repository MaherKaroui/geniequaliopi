import type { CourseChapter } from "../courseContent";

export const WM14_PARTIE1: CourseChapter[] = [
  {
    title: "Chapitre 1 – Le webmarketing au service du développement d'une TPE/PME et la démarche de la formation",
    description: "Comprendre ce que recouvre le webmarketing, situer les principaux leviers dans le parcours client, connaître le cadre réglementaire de base, puis découvrir l'organisation de la formation, le projet webmarketing de fin de formation et la méthode de travail du projet fil rouge Maison Lenoir.",
    sections: [
      {
        title: "1.1 – Le webmarketing : définitions et données clés",
        content: `
<h3>Définir le webmarketing</h3>
<p>Le <strong>webmarketing</strong> (ou marketing digital appliqué au web) désigne l'ensemble des actions marketing menées sur Internet pour <strong>attirer</strong> des visiteurs qualifiés, les <strong>convertir</strong> en prospects puis en clients, et les <strong>fidéliser</strong>. Il mobilise le site Internet de l'entreprise, les moteurs de recherche, les réseaux sociaux, l'emailing, les plateformes publicitaires, les places de marché et les outils de mesure d'audience.</p>
<p>On distingue souvent trois notions voisines :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Notion</th><th>Périmètre</th><th>Exemple pour une TPE</th></tr>
<tr><td>Marketing</td><td>Démarche globale : comprendre le marché, définir l'offre, le prix, la distribution et la communication (les « 4P »).</td><td>Décider de lancer une gamme de plateaux traiteur pour les entreprises.</td></tr>
<tr><td>Marketing digital</td><td>Toutes les actions marketing utilisant des technologies numériques : web, applications mobiles, SMS, écrans connectés, CRM.</td><td>Envoyer un SMS de rappel la veille d'un retrait de commande.</td></tr>
<tr><td>Webmarketing</td><td>Sous-ensemble du marketing digital centré sur Internet : site, référencement, publicité en ligne, réseaux sociaux, email.</td><td>Faire apparaître le site en tête de Google sur « traiteur petit-déjeuner entreprise Nantes ».</td></tr>
</table>
<h3>Pourquoi le webmarketing est devenu incontournable pour une TPE/PME</h3>
<p>Le webmarketing n'est pas réservé aux grandes marques. Pour une petite entreprise, il présente quatre atouts majeurs :</p>
<ul>
<li><strong>La recherche d'informations passe par Internet</strong>, y compris pour des achats réalisés en magasin : horaires, avis clients, carte des produits, itinéraire. Un commerce invisible en ligne perd des clients qui ne franchiront jamais sa porte.</li>
<li><strong>Le coût d'entrée est modulable</strong> : on peut commencer avec des leviers gratuits (fiche d'établissement Google, publications sur les réseaux sociaux, référencement naturel) puis ajouter de la publicité payante en contrôlant le budget au jour près.</li>
<li><strong>Tout se mesure</strong> : nombre de visites, appels, demandes de devis, commandes. On peut donc piloter ses actions et arrêter ce qui ne fonctionne pas.</li>
<li><strong>Le ciblage est fin</strong> : zone géographique, centres d'intérêt, fonction professionnelle, moment de la journée. Une boulangerie peut ne s'adresser qu'aux habitants situés dans un rayon de quelques kilomètres.</li>
</ul>
<h3>Quelques ordres de grandeur (à actualiser avant toute utilisation)</h3>
<p>Les chiffres du numérique évoluent chaque année. Dans un dossier professionnel (plan marketing, demande de financement, projet de fin de formation), il faut toujours <strong>citer la source et l'année</strong> et privilégier les publications officielles ou reconnues. Les ordres de grandeur suivants sont stables d'une édition à l'autre :</p>
<ul>
<li>Selon les baromètres annuels de <strong>Médiamétrie</strong>, la très grande majorité des Français de 15 ans et plus utilisent Internet, et le smartphone est devenu le premier écran de connexion.</li>
<li>Selon les bilans annuels de la <strong>Fevad</strong> (Fédération du e-commerce et de la vente à distance), les ventes en ligne en France (produits et services) dépassent largement les 150 milliards d'euros par an et continuent de progresser, avec un nombre de transactions en hausse régulière.</li>
<li>Selon les rapports <strong>DataReportal</strong> (« Digital France »), le nombre d'identités d'utilisateurs de réseaux sociaux en France se compte en dizaines de millions, et le temps quotidien passé en ligne se mesure en heures.</li>
</ul>
<blockquote><strong>Bonne pratique :</strong> avant de rédiger votre projet, téléchargez la dernière édition de ces baromètres et reportez les chiffres exacts avec leur date. Un banquier, un associé ou un formateur accorde du crédit à un chiffre sourcé ; un chiffre invérifiable affaiblit tout le dossier.</blockquote>
<h3>Les tendances structurantes au 2e semestre 2026</h3>
<ul>
<li><strong>Recherche et intelligence artificielle</strong> : Google affiche sur certaines requêtes des <em>AI Overviews</em>, des réponses de synthèse générées par IA avec des liens vers les sources. Les sites doivent produire des contenus fiables, précis et structurés pour rester cités et visités.</li>
<li><strong>Fin des cookies tiers comme socle du ciblage</strong> : le consentement de l'internaute conditionne la mesure et la publicité personnalisée. Les données « first party » (collectées directement par l'entreprise, avec son accord) prennent de la valeur.</li>
<li><strong>Mesure de l'audience</strong> : Google Analytics 4 est la seule version de Google Analytics en service, Universal Analytics ayant cessé de traiter les données en 2023. Le <em>Consent Mode v2</em> permet de transmettre à Google l'état du consentement de chaque visiteur.</li>
<li><strong>Vidéo courte et contenus authentiques</strong> sur les réseaux sociaux : formats verticaux, coulisses, savoir-faire.</li>
<li><strong>Accessibilité numérique</strong> : l'<em>European Accessibility Act</em> s'applique depuis le 28 juin 2025 à de nombreux services numériques, dont le commerce électronique.</li>
</ul>
<h3>Le webmarketing au service d'un projet de développement</h3>
<p>Dans cette formation, le webmarketing n'est pas une fin en soi : il sert un <strong>projet de développement d'activité</strong> (nouveau produit, nouvelle cible, nouveau canal de vente, nouvelle zone). Toute action doit donc pouvoir se relier à un objectif business : chiffre d'affaires, nombre de clients, panier moyen, notoriété locale, fidélisation.</p>
<blockquote><strong>À retenir</strong><br />Le webmarketing regroupe les actions menées sur Internet pour attirer, convertir et fidéliser. Il est accessible aux TPE car modulable et mesurable. Les chiffres de marché se citent avec leur source et leur année. Chaque action doit servir un objectif de développement clairement identifié.</blockquote>
`,
      },
      {
        title: "1.2 – Panorama des leviers webmarketing",
        content: `
<h3>La classification « owned, paid, earned »</h3>
<p>Une manière simple de classer les leviers consiste à distinguer qui contrôle le média :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Catégorie</th><th>Définition</th><th>Exemples</th><th>Coût principal</th></tr>
<tr><td><strong>Owned media</strong> (médias détenus)</td><td>Supports dont l'entreprise est propriétaire ou qu'elle administre.</td><td>Site Internet, blog, fichier clients, newsletter, comptes de réseaux sociaux, fiche d'établissement Google.</td><td>Temps de production, outils, hébergement.</td></tr>
<tr><td><strong>Paid media</strong> (médias achetés)</td><td>Espaces publicitaires achetés.</td><td>Google Ads, publicité Meta (Facebook, Instagram), LinkedIn Ads, display, commissions de places de marché.</td><td>Budget média + temps de pilotage.</td></tr>
<tr><td><strong>Earned media</strong> (médias gagnés)</td><td>Visibilité obtenue grâce aux autres.</td><td>Avis clients, partages, articles de presse locale, liens entrants, recommandations, mentions par des créateurs de contenu.</td><td>Qualité du service, relations presse, animation de communauté.</td></tr>
</table>
<h3>Les leviers un par un</h3>
<h4>1. Le site Internet : le socle</h4>
<p>Le site est le point de convergence de la plupart des leviers. Il doit être rapide, lisible sur smartphone, accessible, sécurisé (HTTPS) et doté de mentions légales et d'une politique de confidentialité. Pour Maison Lenoir, le site devra accueillir un module de commande en ligne avec retrait en boutique (« click and collect ») et une page dédiée à l'offre traiteur entreprises avec formulaire de devis.</p>
<h4>2. Le référencement naturel (SEO)</h4>
<p>Optimiser le site pour apparaître gratuitement dans les résultats de Google et des autres moteurs. Effets lents (plusieurs mois) mais durables. Il inclut le <strong>référencement local</strong> (fiche d'établissement Google, avis, cohérence du nom, de l'adresse et du téléphone).</p>
<h4>3. Le référencement payant (SEA)</h4>
<p>Acheter de la visibilité sur les moteurs, essentiellement via Google Ads (campagnes sur le Réseau de Recherche, Performance Max, etc.) et Microsoft Advertising. Paiement au clic, effet immédiat, s'arrête quand le budget s'arrête.</p>
<h4>4. Les réseaux sociaux (social media)</h4>
<p>Présence organique (publications, stories, vidéos, animation de communauté) et publicité sociale (social ads) ciblée. Grand public : Instagram, Facebook, TikTok, YouTube, Pinterest. Professionnel : LinkedIn principalement.</p>
<h4>5. L'emailing et le marketing automation</h4>
<p>Newsletters, emails de bienvenue, relances de panier, offres anniversaire, séquences de prospection B2B. Levier très rentable sur une base de contacts qualifiée et consentante.</p>
<h4>6. Les plateformes et places de marché</h4>
<p>Plateformes de livraison de repas, applications anti-gaspillage, annuaires spécialisés, places de marché B2B. Elles apportent du volume mais prennent une commission et gardent souvent la relation client.</p>
<h4>7. L'influence et les partenariats</h4>
<p>Collaboration avec des créateurs de contenu locaux, des blogs culinaires, des associations d'entreprises. Encadrée par la loi du 9 juin 2023 sur l'influence commerciale.</p>
<h4>8. Le display et le retargeting</h4>
<p>Bannières et vidéos sur des sites partenaires, reciblage des visiteurs ayant déjà consulté le site (sous réserve de leur consentement aux traceurs publicitaires).</p>
<h4>9. Le marketing de contenu</h4>
<p>Produire des contenus utiles (recettes, guides, coulisses, études de cas clients) qui alimentent à la fois le SEO, les réseaux sociaux et l'emailing.</p>
<h3>Tableau de synthèse des leviers</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Levier</th><th>Délai d'effet</th><th>Coût d'entrée</th><th>Compétence requise</th><th>Rôle dominant dans le parcours</th></tr>
<tr><td>SEO</td><td>3 à 12 mois</td><td>Faible en argent, élevé en temps</td><td>Moyenne à élevée</td><td>Découverte et considération</td></tr>
<tr><td>Référencement local</td><td>Quelques semaines</td><td>Très faible</td><td>Faible</td><td>Découverte de proximité, décision</td></tr>
<tr><td>SEA (Google Ads)</td><td>Immédiat</td><td>Budget média à prévoir</td><td>Moyenne</td><td>Décision, achat</td></tr>
<tr><td>Réseaux sociaux organiques</td><td>Plusieurs mois</td><td>Faible en argent, élevé en temps</td><td>Faible à moyenne</td><td>Notoriété, fidélisation</td></tr>
<tr><td>Social ads</td><td>Immédiat</td><td>Budget média modulable</td><td>Moyenne</td><td>Notoriété, considération, reciblage</td></tr>
<tr><td>Emailing</td><td>Immédiat sur base existante</td><td>Faible</td><td>Faible à moyenne</td><td>Conversion, fidélisation</td></tr>
<tr><td>Plateformes / marketplaces</td><td>Rapide</td><td>Commission sur ventes</td><td>Faible</td><td>Achat</td></tr>
<tr><td>Influence</td><td>Ponctuel</td><td>Produits offerts à rémunération</td><td>Moyenne (cadre légal)</td><td>Notoriété, preuve sociale</td></tr>
</table>
<h3>Erreurs fréquentes</h3>
<ul>
<li>Vouloir être présent partout : mieux vaut deux ou trois leviers bien tenus que sept leviers abandonnés au bout de deux mois.</li>
<li>Investir en publicité avant d'avoir un site capable de convertir (lent, pas de bouton de commande, pas de numéro cliquable).</li>
<li>Confondre levier et outil : « faire du Canva » n'est pas un levier ; publier sur Instagram pour toucher les 25-45 ans du quartier, si.</li>
</ul>
<blockquote><strong>À retenir</strong><br />Les leviers se classent en médias détenus, achetés et gagnés. Le site est le socle ; SEO, SEA, réseaux sociaux, email, plateformes et influence s'y raccordent. Chaque levier a son délai d'effet, son coût et sa place dans le parcours client : c'est ce qui guidera vos choix au chapitre 3.</blockquote>
`,
      },
      {
        title: "1.3 – Le parcours client digital",
        content: `
<h3>Pourquoi raisonner en parcours</h3>
<p>Un client ne passe pas directement de l'ignorance à l'achat. Il découvre, compare, hésite, achète, puis revient (ou non). Chaque levier webmarketing joue un rôle différent selon l'étape. Raisonner en parcours évite deux erreurs : ne faire que de la notoriété sans jamais déclencher l'achat, ou ne faire que de la conversion sans jamais alimenter le haut de l'entonnoir.</p>
<h3>Trois modèles utiles</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Modèle</th><th>Étapes</th><th>Intérêt</th></tr>
<tr><td><strong>AIDA</strong></td><td>Attention, Intérêt, Désir, Action</td><td>Structurer un message publicitaire ou une page de vente.</td></tr>
<tr><td><strong>Entonnoir de conversion (funnel)</strong></td><td>Haut (TOFU : découverte), milieu (MOFU : considération), bas (BOFU : décision), puis fidélisation</td><td>Répartir les actions et les budgets, mesurer les taux de passage.</td></tr>
<tr><td><strong>See – Think – Do – Care</strong></td><td>Voir, réfléchir, agir, prendre soin (clients existants)</td><td>Associer à chaque étape une intention de l'internaute et un indicateur.</td></tr>
</table>
<h3>Le parcours B2C de Maison Lenoir : commande d'un entremets d'anniversaire</h3>
<ol>
<li><strong>Déclencheur</strong> : Camille, 34 ans, habite le quartier, prépare l'anniversaire de sa fille pour samedi.</li>
<li><strong>Découverte</strong> : elle tape « gâteau anniversaire sur commande Nantes » sur son smartphone. Elle voit le pack local de Google (carte + trois établissements) et une annonce Google Ads.</li>
<li><strong>Considération</strong> : elle compare les notes et les photos des fiches d'établissement, consulte le compte Instagram de Maison Lenoir.</li>
<li><strong>Décision</strong> : elle va sur le site, choisit un entremets 8 parts, sélectionne un créneau de retrait, paie en ligne.</li>
<li><strong>Expérience</strong> : retrait sans attente, gâteau conforme aux photos.</li>
<li><strong>Fidélisation</strong> : elle reçoit (si elle y a consenti) une newsletter mensuelle et une offre le mois suivant ; elle laisse un avis Google après un email de remerciement.</li>
</ol>
<h3>Le parcours B2B : commande d'un petit-déjeuner de séminaire</h3>
<p>Le parcours professionnel est plus long, implique plusieurs personnes et repose davantage sur la confiance :</p>
<ol>
<li><strong>Besoin</strong> : l'assistante de direction d'un cabinet d'expertise comptable de 40 personnes organise un séminaire trimestriel.</li>
<li><strong>Recherche</strong> : requête « traiteur petit déjeuner entreprise Nantes », recommandation d'un collègue, publication LinkedIn vue dans son fil.</li>
<li><strong>Évaluation</strong> : consultation de la page « Entreprises » (formules, prix indicatifs, délais, zone de livraison, allergènes, références clients).</li>
<li><strong>Demande de devis</strong> via formulaire ou téléphone ; réponse attendue en moins de 24 heures.</li>
<li><strong>Validation interne</strong> par le responsable, bon de commande, facture avec conditions de paiement.</li>
<li><strong>Récurrence</strong> : si la prestation est réussie, commande régulière ; relance avant le séminaire suivant.</li>
</ol>
<h3>Associer leviers, contenus et indicateurs à chaque étape</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Leviers prioritaires (Maison Lenoir)</th><th>Contenus</th><th>Indicateurs</th></tr>
<tr><td>Découverte</td><td>Référencement local, Instagram, social ads géociblées</td><td>Vidéos de fabrication, photos des vitrines</td><td>Impressions, portée, vues de la fiche Google</td></tr>
<tr><td>Considération</td><td>SEO, page traiteur, LinkedIn</td><td>Cartes des formules, avis, références</td><td>Sessions, temps d'engagement, pages vues</td></tr>
<tr><td>Décision</td><td>Google Ads sur requêtes transactionnelles, site de commande</td><td>Page produit claire, réassurance, créneaux</td><td>Taux de conversion, commandes, demandes de devis</td></tr>
<tr><td>Fidélisation</td><td>Emailing, programme de fidélité, réseaux sociaux</td><td>Newsletter, offres saisonnières, rappel séminaire</td><td>Taux de réachat, taux d'ouverture, avis laissés</td></tr>
</table>
<h3>Le « ROPO » et le magasin physique</h3>
<p>Pour un commerce de proximité, une grande partie des ventes influencées par le web se fait en boutique : c'est l'effet <strong>ROPO</strong> (<em>Research Online, Purchase Offline</em>). Il faut donc mesurer aussi les actions hors ligne : demandes d'itinéraire et appels depuis la fiche Google, code promo spécifique cité en caisse, question « comment nous avez-vous connus ? » posée lors des commandes traiteur.</p>
<blockquote><strong>À retenir</strong><br />Chaque étape du parcours (découverte, considération, décision, fidélisation) appelle des leviers, des contenus et des indicateurs différents. Le parcours B2B est plus long et plus rationnel que le parcours B2C. Pour un commerce local, le web influence aussi les ventes en boutique : mesurez-les.</blockquote>
`,
      },
      {
        title: "1.4 – Le cadre réglementaire à connaître dès le départ",
        content: `
<p>Un plan webmarketing qui ignore le droit expose l'entreprise à des sanctions (CNIL, DGCCRF) et à une perte de confiance. Votre projet de fin de formation devra identifier les règles applicables à chaque action. Voici le socle ; les chapitres suivants détaillent chaque règle au moment où elle s'applique.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Texte</th><th>Ce qu'il impose</th><th>Application Maison Lenoir</th></tr>
<tr><td><strong>RGPD</strong> (règlement européen 2016/679) et loi Informatique et Libertés, contrôlés par la <strong>CNIL</strong></td><td>Base légale pour chaque traitement, information des personnes, minimisation des données, durées de conservation, sécurité, droits d'accès, de rectification, d'effacement et d'opposition.</td><td>Formulaire de commande : ne collecter que le nécessaire ; politique de confidentialité ; registre des traitements.</td></tr>
<tr><td><strong>Prospection électronique</strong> (Code des postes et des communications électroniques, article L34-5)</td><td>B2C : consentement préalable, sauf pour les clients existants recevant des offres de produits ou services analogues et ayant pu s'y opposer. B2B : possible sans consentement préalable si le message est en rapport avec la fonction du destinataire, avec information et droit d'opposition. Dans tous les cas : lien de désinscription simple et gratuit.</td><td>Case à cocher non pré-cochée pour la newsletter ; prospection des entreprises sur des adresses professionnelles avec lien de désinscription.</td></tr>
<tr><td><strong>Directive ePrivacy</strong> et lignes directrices de la CNIL sur les cookies</td><td>Consentement préalable aux traceurs non essentiels (publicité, mesure non exemptée) ; refuser doit être aussi simple qu'accepter ; consentement documenté et retirable.</td><td>Bandeau avec boutons « Tout accepter » et « Tout refuser » de même niveau ; Consent Mode v2 configuré pour Google.</td></tr>
<tr><td><strong>LCEN</strong> (loi pour la confiance dans l'économie numérique) et Code de la consommation</td><td>Mentions légales, conditions générales de vente, informations précontractuelles, prix TTC, droit de rétractation (avec exceptions, notamment pour les denrées périssables).</td><td>CGV de la vente en ligne et CGV traiteur B2B distinctes.</td></tr>
<tr><td><strong>European Accessibility Act</strong> (directive 2019/882), applicable depuis le 28 juin 2025 ; référentiels <strong>RGAA 4.1</strong> et <strong>WCAG 2.1/2.2 niveau AA</strong></td><td>Les services de commerce électronique doivent être accessibles aux personnes en situation de handicap. Les microentreprises prestataires de services (moins de 10 salariés et chiffre d'affaires ou bilan annuel n'excédant pas 2 millions d'euros) sont exemptées de ces obligations pour leurs services.</td><td>Avec 6 salariés, Maison Lenoir relève a priori de l'exemption, mais l'accessibilité reste une bonne pratique, un atout commercial et une attente de certains clients B2B ; elle sera traitée au chapitre consacré au plan d'action.</td></tr>
<tr><td><strong>Digital Services Act</strong> (règlement 2022/2065)</td><td>Obligations des plateformes en ligne : transparence de la publicité, signalement des contenus illicites, interdiction de la publicité ciblée fondée sur des données sensibles ou visant les mineurs.</td><td>L'entreprise en bénéficie comme annonceur et utilisatrice (transparence des annonces, possibilité de signaler un faux avis).</td></tr>
<tr><td><strong>Loi n° 2023-451 du 9 juin 2023</strong> sur l'influence commerciale</td><td>Mention claire « Publicité » ou « Collaboration commerciale » sur les contenus sponsorisés ; promotion de certains produits et services interdite ; contrat écrit au-delà de certains seuils ; responsabilité solidaire de l'annonceur.</td><td>Toute collaboration avec un créateur de contenu nantais sera contractualisée et signalée.</td></tr>
</table>
<h3>Check-list de conformité minimale avant de lancer une action</h3>
<ul>
<li>Mentions légales et politique de confidentialité à jour et accessibles depuis toutes les pages.</li>
<li>Bandeau cookies conforme (refus aussi simple qu'acceptation, pas de traceur déposé avant le choix).</li>
<li>Formulaires : finalité expliquée, champs minimaux, case d'abonnement non pré-cochée.</li>
<li>Fichier de contacts : origine connue, base légale identifiée, liste d'opposition tenue à jour.</li>
<li>Publicité et partenariats : caractère commercial identifiable.</li>
<li>Accessibilité : contrastes, textes alternatifs, navigation au clavier, formulaires étiquetés.</li>
</ul>
<blockquote><strong>À retenir</strong><br />RGPD, règles de prospection, cookies, LCEN, accessibilité, DSA et loi influenceurs forment le socle juridique du webmarketing. Dans votre projet, montrez pour chaque action la règle applicable et la mesure prise : c'est un marqueur de professionnalisme.</blockquote>
`,
      },
      {
        title: "1.5 – Organisation de la formation, projet fil rouge et évaluation de fin de formation",
        content: `
<h3>La formation en bref</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Contenu</th></tr>
<tr><td>Intitulé</td><td>Développer son activité avec le webmarketing</td></tr>
<tr><td>Nature</td><td>Action de formation professionnelle continue</td></tr>
<tr><td>Public visé</td><td>Dirigeants de TPE/PME et collaborateurs directs</td></tr>
<tr><td>Durée</td><td>14 heures, soit 2 jours</td></tr>
<tr><td>Fil conducteur</td><td>Un projet de développement d'activité réel, construit pas à pas pour votre propre entreprise</td></tr>
<tr><td>Évaluation de fin de formation</td><td>Évaluation interne : projet webmarketing pour votre entreprise, présenté sous la forme d'un dossier écrit et d'une présentation orale au formateur</td></tr>
<tr><td>Document remis</td><td>Attestation de fin de formation</td></tr>
</table>
<h3>Les six modules et leur contribution au projet final</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Module</th><th>Intitulé</th><th>Durée</th><th>Ce que votre dossier final devra contenir</th></tr>
<tr><td>C1</td><td>Définir les objectifs webmarketing de l'entreprise</td><td>1 h</td><td>Diagnostic, positionnement, cible, objectifs SMART reliés au projet de développement.</td></tr>
<tr><td>C2</td><td>Concevoir la stratégie webmarketing</td><td>1 h</td><td>Choix argumenté des leviers selon marché, cible et budget ; budget chiffré.</td></tr>
<tr><td>C3</td><td>Élaborer le plan d'action webmarketing</td><td>2 h</td><td>Actions par levier, planning, prise en compte de l'accessibilité, emailing et Google Ads.</td></tr>
<tr><td>C4</td><td>Mettre en œuvre le référencement naturel du site</td><td>4 h</td><td>Audit sémantique, optimisations technique et éditoriale, indexation, netlinking, suivi.</td></tr>
<tr><td>C5</td><td>Mettre en œuvre la communication sur les réseaux sociaux</td><td>4 h</td><td>Stratégie social media, choix des réseaux, ligne éditoriale, influence, suivi.</td></tr>
<tr><td>C6</td><td>Élaborer un dispositif de pilotage</td><td>1 h</td><td>Indicateurs, tableau de bord, rapprochement ressources / résultats.</td></tr>
<tr><td>Projet final</td><td>Présentation du projet webmarketing au formateur</td><td>1 h</td><td>Dossier écrit remis et présentation orale de votre projet.</td></tr>
</table>
<p>Ce support de cours est volontairement plus détaillé que les séances : il sert de référence pour approfondir chaque notion et pour construire votre projet après la formation.</p>
<p>Chaque module se termine par un quiz d'autoévaluation et un cas pratique. Le cas pratique est conçu pour être réalisé sur <strong>votre</strong> entreprise : en fin de parcours, l'assemblage de vos cas pratiques constitue l'essentiel de votre dossier final.</p>
<h3>Le dossier écrit : une structure recommandée</h3>
<ol>
<li><strong>Page de garde et sommaire</strong>.</li>
<li><strong>Présentation de l'entreprise et du projet de développement</strong> : activité, chiffres clés, situation digitale actuelle, enjeu.</li>
<li><strong>Diagnostic et objectifs</strong> (module C1) : analyse interne/externe, positionnement, cible et personas, objectifs SMART.</li>
<li><strong>Stratégie</strong> (C2) : leviers retenus et écartés avec justification, budget.</li>
<li><strong>Plan d'action</strong> (C3) : actions détaillées, planning, accessibilité, email, Google Ads.</li>
<li><strong>Plan de référencement naturel</strong> (C4).</li>
<li><strong>Plan réseaux sociaux</strong> (C5).</li>
<li><strong>Pilotage</strong> (C6) : indicateurs, tableau de bord, analyse coûts / résultats.</li>
<li><strong>Conclusion</strong> : synthèse, risques, prochaines étapes.</li>
<li><strong>Annexes</strong> : captures, extraits d'outils, calendrier éditorial, maquettes.</li>
</ol>
<p>Le volume attendu et la date de remise sont précisés par le formateur ; un dossier concis, chiffré et directement applicable vaut mieux qu'un long document théorique.</p>
<h3>La présentation orale au formateur</h3>
<p>Le formateur a lu votre dossier : la présentation n'est pas une lecture du document mais un échange sur votre projet. Organisation indicative, à adapter selon les consignes données en formation :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Séquence</th><th>Contenu</th></tr>
<tr><td>Présentation</td><td>Contexte, projet, objectifs, stratégie, actions phares, pilotage. Un support court (une dizaine de diapositives au maximum).</td></tr>
<tr><td>Échange avec le formateur</td><td>Justification des choix, mises en situation (« si le budget était divisé par deux ? »), points réglementaires, lecture d'indicateurs, conseils pour la mise en œuvre.</td></tr>
</table>
<h3>Ce que le formateur évaluera dans le projet final (transversal à tous les modules)</h3>
<ul>
<li><strong>Cohérence</strong> : les objectifs découlent du diagnostic, les leviers découlent des objectifs et de la cible, le budget correspond aux actions, les indicateurs mesurent les objectifs.</li>
<li><strong>Réalisme</strong> : un budget et un temps compatibles avec une TPE ; un planning tenable.</li>
<li><strong>Argumentation</strong> : chaque choix est justifié, y compris les leviers écartés.</li>
<li><strong>Exactitude</strong> : vocabulaire juste, outils réels et à jour (GA4, Search Console, Core Web Vitals avec INP), sources citées.</li>
<li><strong>Conformité</strong> : RGPD, cookies, accessibilité, transparence publicitaire.</li>
<li><strong>Applicabilité</strong> : le plan peut être lancé dès le retour en entreprise, avec des premières actions clairement identifiées.</li>
</ul>
<h3>Erreurs fréquentes dans les projets finaux</h3>
<ul>
<li>Un dossier catalogue qui décrit les leviers en général sans les appliquer à l'entreprise.</li>
<li>Des objectifs non chiffrés (« améliorer la visibilité »).</li>
<li>Un budget absent ou sans lien avec les actions.</li>
<li>Des chiffres de marché sans source.</li>
<li>Une présentation trop longue qui ne laisse pas de place à l'échange.</li>
</ul>
<blockquote><strong>À retenir</strong><br />La formation « Développer son activité avec le webmarketing » compte six modules et un temps de présentation du projet final (14 heures, soit 2 jours). Les cas pratiques réalisés sur votre entreprise s'assemblent en un projet webmarketing final, présenté par écrit et à l'oral au formateur ; une attestation de fin de formation vous est remise. Le fil conducteur attendu est la cohérence entre diagnostic, objectifs, stratégie, actions, budget et indicateurs.</blockquote>
`,
      },
      {
        title: "1.6 – Méthode du projet fil rouge : Maison Lenoir",
        content: `
<h3>Présentation de l'entreprise fil rouge</h3>
<p>Tout au long du support, nous appliquons les notions à une entreprise <strong>fictive</strong> construite pour l'exercice. Les chiffres ci-dessous sont des <strong>données d'exemple</strong>, non des statistiques sectorielles.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Données d'exemple</th></tr>
<tr><td>Raison sociale</td><td>Maison Lenoir, boulangerie-pâtisserie artisanale</td></tr>
<tr><td>Localisation</td><td>Nantes, quartier résidentiel avec bureaux à proximité</td></tr>
<tr><td>Effectif</td><td>6 salariés (2 boulangers, 1 pâtissier, 1 apprenti, 2 vendeuses) + les deux dirigeants, Paul et Sophie Lenoir</td></tr>
<tr><td>Chiffre d'affaires annuel</td><td>780 000 euros HT, dont environ 4 % issus de commandes traiteur passées par téléphone</td></tr>
<tr><td>Présence digitale actuelle</td><td>Site vitrine de 5 pages créé il y a six ans, non adapté au mobile, sans commande en ligne ; fiche d'établissement Google avec une note de 4,6 sur 5 et environ 210 avis ; compte Instagram d'environ 1 900 abonnés alimenté irrégulièrement ; page Facebook peu active ; aucun fichier email structuré</td></tr>
<tr><td>Projet de développement</td><td>1) Lancer la commande en ligne avec retrait en boutique (gâteaux, viennoiseries en volume, pains spéciaux) ; 2) développer une activité traiteur B2B (petits-déjeuners, pauses, cocktails sucrés et salés) auprès des entreprises de l'agglomération nantaise</td></tr>
<tr><td>Ressources</td><td>Sophie consacre environ 4 heures par semaine au marketing ; budget webmarketing envisagé de l'ordre de 1 500 euros par mois la première année (à confirmer au chapitre 3)</td></tr>
</table>
<h3>La démarche en sept étapes</h3>
<ol>
<li><strong>Diagnostiquer</strong> la situation (chapitre 2) : forces, faiblesses, concurrence, audience actuelle.</li>
<li><strong>Positionner et cibler</strong> (chapitre 2) : proposition de valeur, segments, personas.</li>
<li><strong>Fixer des objectifs SMART</strong> (chapitre 2).</li>
<li><strong>Choisir les leviers et le budget</strong> (chapitre 3).</li>
<li><strong>Planifier les actions</strong> (plan d'action, emailing, Google Ads, accessibilité).</li>
<li><strong>Déployer</strong> les volets SEO et réseaux sociaux.</li>
<li><strong>Piloter</strong> : indicateurs, tableau de bord, ajustements.</li>
</ol>
<h3>Transposer la démarche à votre propre projet</h3>
<p>Pendant la formation, vous travaillez sur <strong>votre</strong> entreprise (ou celle qui vous emploie). Constituez dès maintenant un dossier de travail :</p>
<ul>
<li>Chiffres clés de l'entreprise (chiffre d'affaires, panier moyen, marge brute, nombre de clients) : demandez-les à l'expert-comptable si besoin.</li>
<li>Accès aux outils : Google Analytics 4, Google Search Console, fiche d'établissement Google, statistiques des réseaux sociaux, outil d'emailing.</li>
<li>Captures d'écran datées de la situation de départ (elles serviront de « point zéro »).</li>
<li>Liste de 3 à 5 concurrents directs et indirects.</li>
<li>Témoignages ou retours clients existants.</li>
</ul>
<h3>Planifier la construction de votre projet au fil des modules</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Travail</th><th>Livrable intermédiaire</th></tr>
<tr><td>Avant le module C1</td><td>Collecte des données, captures de la situation de départ</td><td>Dossier de travail complet</td></tr>
<tr><td>Module C1</td><td>Diagnostic, positionnement, cible, objectifs (C1)</td><td>Partie « Diagnostic et objectifs » rédigée</td></tr>
<tr><td>Modules C2 et C3</td><td>Stratégie et budget (C2), plan d'action (C3)</td><td>Parties « Stratégie » et « Plan d'action » rédigées</td></tr>
<tr><td>Module C4</td><td>Plan SEO (C4)</td><td>Plan SEO rédigé avec annexes</td></tr>
<tr><td>Module C5</td><td>Plan réseaux sociaux (C5)</td><td>Plan réseaux sociaux rédigé</td></tr>
<tr><td>Module C6</td><td>Pilotage (C6), introduction, conclusion</td><td>Dossier complet en premier jet</td></tr>
<tr><td>Après le module C6</td><td>Relecture de cohérence, vérification des sources et des calculs, mise en page</td><td>Version finale</td></tr>
<tr><td>Fin de formation</td><td>Remise du dossier ; préparation du support de présentation orale</td><td>Dossier remis au formateur</td></tr>
</table>
<blockquote><strong>Conseil :</strong> tenez un tableau de cohérence à quatre colonnes (objectif / levier / action / indicateur). Chaque ligne doit être complète ; une ligne sans indicateur ou un objectif sans action signale une faille à corriger avant de présenter votre projet.</blockquote>
<blockquote><strong>À retenir</strong><br />Maison Lenoir, boulangerie nantaise de 6 salariés, sert d'exemple tout au long du support : commande en ligne et traiteur B2B. Ses chiffres sont fictifs. Pour votre projet de fin de formation, appliquez la même démarche en sept étapes à votre entreprise en avançant module par module.</blockquote>
`,
      },
      {
        title: "1.7 – Quiz de fin de chapitre",
        content: `
<p>Répondez aux questions, puis consultez le corrigé.</p>
<ol>
<li><strong>Le webmarketing se définit comme :</strong><br />A. La création d'un site Internet<br />B. L'ensemble des actions marketing menées sur Internet pour attirer, convertir et fidéliser<br />C. La publicité sur les réseaux sociaux uniquement<br />D. L'envoi de SMS promotionnels</li>
<li><strong>Une fiche d'établissement Google et des avis clients relèvent principalement :</strong><br />A. Du paid media<br />B. Des owned et earned media<br />C. Du display<br />D. De l'affiliation</li>
<li><strong>Quel levier a l'effet le plus immédiat ?</strong><br />A. Le SEO<br />B. Le netlinking<br />C. Google Ads<br />D. Le marketing de contenu</li>
<li><strong>L'effet ROPO désigne :</strong><br />A. Un indicateur de retour sur investissement publicitaire<br />B. Le fait de s'informer en ligne puis d'acheter en magasin<br />C. Une norme d'accessibilité<br />D. Un format publicitaire de Google</li>
<li><strong>En prospection par email auprès de particuliers, la règle générale est :</strong><br />A. Aucune formalité<br />B. Le consentement préalable, sauf exception des clients existants pour des produits ou services analogues<br />C. Un simple lien de désinscription suffit toujours<br />D. Une déclaration préalable à la CNIL</li>
<li><strong>Selon la CNIL, sur un bandeau cookies :</strong><br />A. Le refus peut être caché dans les paramètres<br />B. Le refus doit être aussi simple que l'acceptation<br />C. Les cookies publicitaires peuvent être déposés avant le choix<br />D. Le silence vaut acceptation</li>
<li><strong>Depuis quand l'European Accessibility Act s'applique-t-il ?</strong><br />A. 1er janvier 2024<br />B. 28 juin 2025<br />C. 1er janvier 2026<br />D. 1er janvier 2027</li>
<li><strong>L'évaluation de fin de la formation « Développer son activité avec le webmarketing » repose sur :</strong><br />A. Un QCM de 100 questions<br />B. Un projet webmarketing pour sa propre entreprise : dossier écrit et présentation orale au formateur<br />C. Un examen sur table sans document<br />D. Aucune évaluation</li>
<li><strong>Quelle version de Google Analytics faut-il utiliser en 2026 ?</strong><br />A. Universal Analytics<br />B. Google Analytics 4<br />C. Google Analytics Classic<br />D. Aucune, Google Analytics a fermé</li>
<li><strong>La qualité la plus attendue d'un projet webmarketing est :</strong><br />A. Sa longueur<br />B. Le nombre de leviers cités<br />C. La cohérence entre diagnostic, objectifs, leviers, budget et indicateurs<br />D. L'usage d'un vocabulaire anglais</li>
</ol>
<h4>Corrigé</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>B</td><td>Le webmarketing couvre toute la chaîne attirer – convertir – fidéliser sur Internet ; les autres réponses ne sont que des outils ou des canaux.</td></tr>
<tr><td>2</td><td>B</td><td>La fiche est administrée par l'entreprise (owned) ; les avis sont produits par les clients (earned).</td></tr>
<tr><td>3</td><td>C</td><td>Une campagne Google Ads diffuse dès sa validation ; SEO, netlinking et contenu demandent des mois.</td></tr>
<tr><td>4</td><td>B</td><td><em>Research Online, Purchase Offline</em> : décisif pour les commerces de proximité.</td></tr>
<tr><td>5</td><td>B</td><td>Article L34-5 du CPCE : consentement préalable en B2C, exception pour les clients existants (produits analogues, opposition possible).</td></tr>
<tr><td>6</td><td>B</td><td>Les lignes directrices de la CNIL exigent un refus aussi simple que l'acceptation et aucun traceur non essentiel avant le choix.</td></tr>
<tr><td>7</td><td>B</td><td>La directive 2019/882 s'applique depuis le 28 juin 2025, avec une exemption pour les microentreprises prestataires de services.</td></tr>
<tr><td>8</td><td>B</td><td>Le projet final assemble les cas pratiques réalisés sur votre entreprise ; il donne lieu à une attestation de fin de formation.</td></tr>
<tr><td>9</td><td>B</td><td>Universal Analytics a cessé de traiter les données en 2023 ; GA4 est la version en service.</td></tr>
<tr><td>10</td><td>C</td><td>Un projet solide montre que chaque élément découle du précédent et que tout est mesurable.</td></tr>
</table>
`,
      },
      {
        title: "1.8 – Cas pratique : cartographier la situation digitale et le parcours client",
        content: `
<h3>Consigne</h3>
<p>Pour votre entreprise (ou, à défaut, pour Maison Lenoir), réalisez :</p>
<ol>
<li>Une fiche d'identité synthétique (activité, effectif, chiffre d'affaires, clientèle, projet de développement).</li>
<li>L'inventaire de la présence digitale actuelle, classé en owned, paid et earned media, avec un indicateur de départ pour chaque support.</li>
<li>Le parcours client type (B2C et/ou B2B) en quatre étapes avec, pour chacune, le point de contact actuel et le point faible observé.</li>
<li>Les trois règles juridiques qui s'appliqueront le plus directement à votre projet.</li>
</ol>
<h3>Corrigé détaillé (Maison Lenoir)</h3>
<h4>1. Fiche d'identité</h4>
<p>Boulangerie-pâtisserie artisanale nantaise, 6 salariés, 780 000 euros HT de chiffre d'affaires (données d'exemple). Clientèle de proximité (habitants, actifs du quartier). Projet : commande en ligne avec retrait en boutique et développement d'une offre traiteur B2B.</p>
<h4>2. Inventaire de la présence digitale</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Catégorie</th><th>Support</th><th>Indicateur de départ (exemple)</th><th>Constat</th></tr>
<tr><td>Owned</td><td>Site vitrine</td><td>Environ 900 sessions par mois (à relever dans GA4)</td><td>Non adapté au mobile, pas de commande en ligne, pas de page traiteur</td></tr>
<tr><td>Owned</td><td>Fiche d'établissement Google</td><td>Vues et actions mensuelles relevées dans les statistiques de la fiche</td><td>Photos anciennes, catégories secondaires non renseignées</td></tr>
<tr><td>Owned</td><td>Instagram</td><td>1 900 abonnés, 3 publications par mois en moyenne</td><td>Irrégularité, peu de vidéos</td></tr>
<tr><td>Owned</td><td>Fichier clients</td><td>Aucun fichier structuré</td><td>Impossible de relancer les clients traiteur</td></tr>
<tr><td>Paid</td><td>Aucun</td><td>0 euro</td><td>Pas de visibilité sur les requêtes « traiteur entreprise »</td></tr>
<tr><td>Earned</td><td>Avis Google</td><td>4,6/5, environ 210 avis</td><td>Atout fort ; réponses aux avis irrégulières</td></tr>
</table>
<h4>3. Parcours client B2B et points faibles</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Point de contact actuel</th><th>Point faible</th></tr>
<tr><td>Découverte</td><td>Bouche-à-oreille uniquement</td><td>Invisible sur Google et LinkedIn pour les requêtes professionnelles</td></tr>
<tr><td>Considération</td><td>Aucune page dédiée</td><td>Pas de formules, de prix indicatifs ni de références</td></tr>
<tr><td>Décision</td><td>Appel téléphonique en boutique</td><td>Appels perdus aux heures d'affluence, pas de devis écrit rapide</td></tr>
<tr><td>Fidélisation</td><td>Aucune</td><td>Aucune relance avant les événements récurrents des clients</td></tr>
</table>
<h4>4. Règles juridiques prioritaires</h4>
<ul>
<li><strong>RGPD</strong> : collecte des coordonnées lors des commandes en ligne et des devis (information, minimisation, conservation).</li>
<li><strong>Prospection électronique</strong> : B2C sur consentement (newsletter), B2B possible sur intérêt légitime pour des offres en rapport avec la fonction des destinataires (office managers, assistants de direction), avec désinscription.</li>
<li><strong>Cookies</strong> : bandeau conforme et Consent Mode v2 avant toute campagne Google Ads avec suivi des conversions.</li>
</ul>
<h3>Ce que le formateur évaluera dans le projet final</h3>
<p>Ce travail constitue la partie « présentation de l'entreprise et du projet » de votre dossier final. Le formateur attend une situation de départ <strong>chiffrée et datée</strong>, qui servira de référence pour les objectifs (C1) et pour le pilotage (C6). Lors de la présentation orale, soyez capable de résumer en une minute l'entreprise, son projet et son principal frein digital.</p>
`,
      },
    ],
  },
  {
    title: "Chapitre 2 – C1 Définir les objectifs webmarketing de l'entreprise",
    description: "Réaliser le diagnostic de départ, préciser le positionnement de l'entreprise, caractériser la cible webmarketing (segments, personas B2C et B2B) et traduire le projet de développement en objectifs SMART mesurables, conformément au module C1 de la formation.",
    sections: [
      {
        title: "2.1 – Le diagnostic de départ : situation interne, marché et concurrence",
        content: `
<h3>Pourquoi commencer par un diagnostic</h3>
<p>Un objectif ne se fixe pas « dans l'absolu » : il dépend de ce que l'entreprise sait faire, des moyens dont elle dispose, de la demande existante et de la concurrence. Le diagnostic évite de viser trop haut (objectif décourageant) ou trop bas (objectif sans intérêt). Il fournit aussi la <strong>situation de référence</strong> à partir de laquelle on mesurera les progrès.</p>
<h3>Étape 1 – Les données clés de l'entreprise</h3>
<p>Rassemblez les chiffres qui permettront de relier le webmarketing aux résultats économiques :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Donnée</th><th>Où la trouver</th><th>Maison Lenoir (exemple)</th></tr>
<tr><td>Chiffre d'affaires par activité</td><td>Comptabilité, caisse</td><td>780 000 euros HT, dont environ 31 000 euros de traiteur</td></tr>
<tr><td>Panier moyen</td><td>Logiciel de caisse</td><td>Boutique : 8,50 euros ; commande gâteau : 38 euros ; traiteur B2B : 290 euros</td></tr>
<tr><td>Taux de marge brute par activité</td><td>Expert-comptable, fiches techniques</td><td>Environ 65 % sur la pâtisserie, 55 % sur le traiteur (après matières et emballages)</td></tr>
<tr><td>Nombre de clients actifs</td><td>Caisse, fichier traiteur</td><td>Environ 25 clients traiteur différents sur 12 mois</td></tr>
<tr><td>Capacité de production disponible</td><td>Responsable de fabrication</td><td>Le laboratoire peut absorber jusqu'à 15 commandes traiteur par semaine sans embauche</td></tr>
<tr><td>Temps disponible pour le marketing</td><td>Dirigeants</td><td>4 heures par semaine</td></tr>
</table>
<p>La capacité de production est souvent oubliée : générer 40 demandes de devis par semaine ne sert à rien si l'atelier ne peut en honorer que 15.</p>
<h3>Étape 2 – L'audit de la présence digitale</h3>
<ul>
<li><strong>Site</strong> : trafic et sources (Google Analytics 4 : rapport « Acquisition de trafic »), requêtes et pages qui apparaissent dans Google (Google Search Console : rapport « Performances »), compatibilité mobile, vitesse (PageSpeed Insights, qui affiche les Core Web Vitals : LCP, INP, CLS), présence de mentions légales et d'un bandeau cookies conforme.</li>
<li><strong>Fiche d'établissement Google</strong> : catégories, horaires, photos, avis et réponses, statistiques (recherches, appels, itinéraires, clics vers le site).</li>
<li><strong>Réseaux sociaux</strong> : abonnés, fréquence de publication, taux d'engagement, types de contenus qui fonctionnent.</li>
<li><strong>Bases de contacts</strong> : nombre, origine, consentement, segmentation.</li>
<li><strong>Réputation</strong> : note moyenne, thèmes récurrents des avis positifs et négatifs.</li>
</ul>
<h3>Étape 3 – L'analyse du marché (PESTEL simplifié)</h3>
<p>Pour une TPE, inutile d'écrire un PESTEL de dix pages ; retenez les facteurs qui ont un impact réel sur le projet :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Facteur</th><th>Exemple pour Maison Lenoir</th><th>Impact sur le projet</th></tr>
<tr><td>Politique / légal</td><td>Information sur les allergènes obligatoire, y compris pour la vente à distance ; règles RGPD et cookies</td><td>Fiches produits complètes ; conformité du site de commande</td></tr>
<tr><td>Économique</td><td>Hausse du coût des matières premières et de l'énergie ; budgets événementiels des entreprises surveillés</td><td>Formules traiteur à plusieurs niveaux de prix</td></tr>
<tr><td>Socioculturel</td><td>Attrait pour l'artisanat, le local et le fait-maison ; habitude de commander en ligne</td><td>Mise en avant du savoir-faire et du sourcing local</td></tr>
<tr><td>Technologique</td><td>Solutions de commande en ligne clés en main ; recherche sur mobile ; réponses IA dans les moteurs</td><td>Site rapide sur mobile, informations structurées</td></tr>
<tr><td>Écologique</td><td>Lutte contre le gaspillage, emballages, réglementation sur la vaisselle jetable</td><td>Contenants réutilisables ou consignés pour le traiteur</td></tr>
</table>
<h3>Étape 4 – L'analyse concurrentielle (benchmark)</h3>
<p>Identifiez trois types de concurrents : directs (autres boulangeries artisanales proposant du traiteur), indirects (traiteurs spécialisés, grandes surfaces, plateformes de livraison) et substituts (salariés qui apportent eux-mêmes viennoiseries). Comparez-les sur des critères observables :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Concurrent A (traiteur spécialisé)</th><th>Concurrent B (boulangerie avec commande en ligne)</th><th>Maison Lenoir</th></tr>
<tr><td>Offre B2B visible sur le site</td><td>Oui, catalogue complet</td><td>Non</td><td>Non</td></tr>
<tr><td>Commande en ligne</td><td>Devis en ligne</td><td>Oui, retrait en boutique</td><td>Non</td></tr>
<tr><td>Position sur « traiteur petit déjeuner entreprise Nantes »</td><td>Première page</td><td>Absente</td><td>Absente</td></tr>
<tr><td>Note Google</td><td>4,3</td><td>4,4</td><td>4,6</td></tr>
<tr><td>Présence LinkedIn</td><td>Page active</td><td>Aucune</td><td>Aucune</td></tr>
<tr><td>Positionnement prix</td><td>Élevé</td><td>Moyen</td><td>Moyen-haut</td></tr>
</table>
<p><em>Ces observations sont fictives ; dans votre projet, réalisez le benchmark réel avec des captures d'écran datées.</em></p>
<h3>Étape 5 – La synthèse SWOT</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Forces</th><th>Faiblesses</th></tr>
<tr><td>Qualité reconnue (4,6/5) ; savoir-faire pâtisserie ; capacité de production disponible ; emplacement proche de bureaux</td><td>Site obsolète et non mobile ; aucune offre B2B formalisée ; pas de fichier clients ; temps marketing limité</td></tr>
<tr><th>Opportunités</th><th>Menaces</th></tr>
<tr><td>Demande des entreprises pour des prestations locales et artisanales ; habitude de la commande en ligne ; peu de boulangeries visibles en B2B</td><td>Traiteurs spécialisés bien référencés ; plateformes de livraison ; tension sur les coûts</td></tr>
</table>
<h3>Erreurs fréquentes</h3>
<ul>
<li>Un SWOT qui mélange interne et externe (« concurrence forte » n'est pas une faiblesse mais une menace).</li>
<li>Un diagnostic sans chiffres de départ, ce qui rend impossible la mesure des progrès.</li>
<li>Un benchmark limité aux concurrents directs, en oubliant les solutions de substitution.</li>
</ul>
<blockquote><strong>À retenir</strong><br />Le diagnostic réunit les données économiques de l'entreprise, l'audit de sa présence digitale, l'analyse du marché et de la concurrence, puis les synthétise dans un SWOT. Il fixe le « point zéro » chiffré et daté de votre projet.</blockquote>
`,
      },
      {
        title: "2.2 – Préciser son positionnement",
        content: `
<h3>Définition</h3>
<p>Le <strong>positionnement</strong> est la place que l'entreprise veut occuper dans l'esprit de sa cible par rapport à ses concurrents. Il répond à la question : « Pourquoi un client devrait-il nous choisir plutôt qu'un autre ? ». En webmarketing, il conditionne les mots-clés visés, le ton des publications, les visuels, les arguments des annonces et le niveau de prix affiché.</p>
<h3>Les trois composantes d'un positionnement</h3>
<ul>
<li><strong>Identification</strong> : à quelle catégorie appartient l'offre (boulangerie-pâtisserie artisanale proposant un service traiteur) ?</li>
<li><strong>Différenciation</strong> : qu'est-ce qui la distingue (fabrication maison sur place, farines locales, pâtissier issu de la gastronomie, réactivité de proximité) ?</li>
<li><strong>Crédibilité</strong> : quelles preuves (avis clients, labels, ancienneté, références, photos du laboratoire) ?</li>
</ul>
<h3>Méthode pas à pas</h3>
<ol>
<li><strong>Lister les attentes de la cible</strong> par ordre d'importance. Pour un office manager : fiabilité de la livraison, qualité, rapport qualité-prix, facilité de commande, facturation simple, options végétariennes et sans allergènes.</li>
<li><strong>Évaluer chaque concurrent</strong> sur ces attentes (note de 1 à 5).</li>
<li><strong>Repérer l'espace libre</strong> : une attente importante mal couverte par les concurrents et que l'entreprise sait satisfaire.</li>
<li><strong>Rédiger la proposition de valeur</strong> en une phrase.</li>
<li><strong>Tester</strong> la phrase auprès de quelques clients et ajuster.</li>
</ol>
<h3>La carte de positionnement</h3>
<p>On place les concurrents sur deux axes choisis parmi les critères décisifs. Pour l'offre traiteur B2B de Maison Lenoir, axes « niveau artisanal perçu » (faible à fort) et « facilité de commande » (faible à forte) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th></th><th>Facilité de commande faible</th><th>Facilité de commande forte</th></tr>
<tr><td><strong>Artisanal fort</strong></td><td>Boulangeries de quartier commandées par téléphone (dont Maison Lenoir aujourd'hui)</td><td><strong>Espace visé par Maison Lenoir</strong> : artisanal et commande en ligne simple avec devis rapide</td></tr>
<tr><td><strong>Artisanal faible</strong></td><td>Rayons traiteur de grandes surfaces</td><td>Plateformes et traiteurs industriels avec catalogue en ligne</td></tr>
</table>
<h3>La proposition de valeur</h3>
<p>Formule type : « Pour [cible], qui [besoin], [marque] est [catégorie] qui [bénéfice principal], contrairement à [alternative], grâce à [preuve]. »</p>
<blockquote><strong>Maison Lenoir – offre B2B :</strong> « Pour les entreprises nantaises qui veulent accueillir leurs équipes et leurs clients avec des produits de qualité, Maison Lenoir est la boulangerie-pâtisserie artisanale qui livre des petits-déjeuners et des pauses faits maison, commandés en ligne en quelques minutes, contrairement aux plateaux industriels, grâce à un laboratoire sur place et des farines de meuniers régionaux. »</blockquote>
<blockquote><strong>Maison Lenoir – offre B2C :</strong> « Vos gâteaux et viennoiseries d'artisan, réservés en ligne et prêts à l'heure choisie, sans file d'attente. »</blockquote>
<h3>Traduire le positionnement en éléments webmarketing</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Traduction concrète</th></tr>
<tr><td>Mots-clés</td><td>« traiteur artisanal entreprise Nantes », « petit déjeuner séminaire Nantes », « gâteau sur commande Nantes »</td></tr>
<tr><td>Ton éditorial</td><td>Chaleureux, expert, transparent sur la fabrication</td></tr>
<tr><td>Visuels</td><td>Photos réelles du laboratoire et des produits, pas de banques d'images</td></tr>
<tr><td>Preuves</td><td>Avis Google intégrés, logos de clients (avec leur accord), origine des farines</td></tr>
<tr><td>Prix</td><td>Formules affichées « à partir de », positionnement moyen-haut assumé</td></tr>
</table>
<h3>Erreurs fréquentes</h3>
<ul>
<li>Un positionnement « qualité et prix bas » : contradictoire et non crédible pour un artisan.</li>
<li>Une différenciation invisible pour le client (« nous sommes passionnés » : tous les concurrents le disent).</li>
<li>Un positionnement différent selon les canaux (luxueux sur Instagram, discount sur les annonces).</li>
</ul>
<blockquote><strong>À retenir</strong><br />Le positionnement combine identification, différenciation et crédibilité. Il se construit à partir des attentes de la cible et de l'analyse concurrentielle, se résume dans une proposition de valeur et se décline dans les mots-clés, le ton, les visuels, les preuves et les prix.</blockquote>
`,
      },
      {
        title: "2.3 – Définir les caractéristiques de sa cible webmarketing",
        content: `
<h3>Cible, segment, persona : les distinctions</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Notion</th><th>Définition</th><th>Exemple</th></tr>
<tr><td>Marché</td><td>Ensemble des acheteurs potentiels d'une catégorie de produits.</td><td>Les acheteurs de prestations de restauration pour événements d'entreprise dans l'agglomération nantaise.</td></tr>
<tr><td>Segment</td><td>Groupe homogène au sein du marché, partageant des besoins et des comportements.</td><td>PME et cabinets de services de 20 à 250 salariés situés à moins de 8 km de la boutique.</td></tr>
<tr><td>Cible</td><td>Segment(s) que l'entreprise choisit de prioriser.</td><td>Cible principale B2B : ces PME ; cible principale B2C : familles et actifs du quartier.</td></tr>
<tr><td>Persona</td><td>Portrait représentatif et semi-fictif d'un client type, construit à partir de données réelles.</td><td>« Claire, office manager » ; « Camille, mère de famille active ».</td></tr>
</table>
<h3>Les critères de segmentation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type de critère</th><th>B2C</th><th>B2B</th></tr>
<tr><td>Géographique</td><td>Quartier, rayon de trajet, ville</td><td>Zone de livraison, zones d'activités</td></tr>
<tr><td>Sociodémographique / firmographique</td><td>Âge, composition du foyer, catégorie socioprofessionnelle</td><td>Secteur d'activité, effectif, nombre de sites</td></tr>
<tr><td>Comportemental</td><td>Fréquence d'achat, occasions (anniversaires, fêtes), sensibilité au prix</td><td>Fréquence des événements, processus d'achat, budget alloué</td></tr>
<tr><td>Psychographique</td><td>Valeurs (local, artisanal, durable), style de vie</td><td>Culture d'entreprise, politique RSE</td></tr>
<tr><td>Digital</td><td>Réseaux utilisés, usage du mobile, habitude de commande en ligne</td><td>Recherche sur Google, présence sur LinkedIn, place des achats en ligne</td></tr>
</table>
<h3>Estimer le potentiel d'une cible (sans inventer de chiffres)</h3>
<p>Pour justifier un objectif, il est utile d'estimer la taille de la cible. Méthode :</p>
<ol>
<li>Compter les entreprises correspondant aux critères à partir de sources publiques (annuaire des entreprises de l'État, données INSEE sur les établissements, base SIRENE filtrée par commune, code NAF et tranche d'effectif).</li>
<li>Appliquer des hypothèses explicites, présentées comme telles.</li>
<li>Comparer avec la capacité de production.</li>
</ol>
<p><strong>Exemple Maison Lenoir (hypothèses de travail) :</strong> supposons qu'un filtrage de la base SIRENE fasse ressortir environ 600 établissements de 20 salariés et plus dans la zone de livraison. Si 10 % organisent au moins un événement par trimestre avec petit-déjeuner ou pause, et si Maison Lenoir peut capter 15 % de ces établissements à 18 mois, on obtient environ 9 clients récurrents, soit 36 commandes par an supplémentaires, compatibles avec la capacité de 15 commandes par semaine. Ce raisonnement montre, chiffres à l'appui, que l'objectif est <strong>atteignable</strong> ; les pourcentages doivent être discutés et prudents.</p>
<h3>Construire un persona en 6 rubriques</h3>
<ol>
<li><strong>Identité</strong> : prénom, âge, fonction, entreprise ou situation familiale.</li>
<li><strong>Objectifs</strong> : ce qu'il cherche à accomplir.</li>
<li><strong>Freins et irritants</strong> : ce qui l'empêche d'acheter ou l'agace.</li>
<li><strong>Critères de choix</strong>.</li>
<li><strong>Comportement digital</strong> : où il s'informe, à quel moment, sur quel appareil.</li>
<li><strong>Message clé</strong> et leviers pour l'atteindre.</li>
</ol>
<h4>Persona B2B : Claire, 38 ans, office manager</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu</th></tr>
<tr><td>Identité</td><td>Office manager dans un cabinet d'expertise comptable de 45 salariés, quartier d'affaires nantais</td></tr>
<tr><td>Objectifs</td><td>Organiser des séminaires et des accueils clients réussis sans y passer de temps</td></tr>
<tr><td>Freins</td><td>Peur d'un retard de livraison, devis qui tardent, prestataires injoignables, gestion des allergies</td></tr>
<tr><td>Critères</td><td>Fiabilité, qualité, prix par personne, facture conforme, options végétariennes</td></tr>
<tr><td>Comportement digital</td><td>Recherche Google sur ordinateur au bureau ; LinkedIn quelques fois par semaine ; lit ses emails professionnels le matin</td></tr>
<tr><td>Message clé</td><td>« Petit-déjeuner artisanal livré à l'heure, devis en 24 h, allergènes indiqués »</td></tr>
<tr><td>Leviers</td><td>SEO et Google Ads sur requêtes traiteur, page B2B, LinkedIn, emailing de relance trimestriel</td></tr>
</table>
<h4>Persona B2C : Camille, 34 ans, mère de famille active</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu</th></tr>
<tr><td>Identité</td><td>Cadre, deux enfants, habite à 10 minutes à pied</td></tr>
<tr><td>Objectifs</td><td>Réussir les anniversaires et repas de famille sans stress</td></tr>
<tr><td>Freins</td><td>File d'attente le samedi, crainte que le gâteau ne soit plus disponible</td></tr>
<tr><td>Critères</td><td>Qualité, esthétique, créneau de retrait garanti</td></tr>
<tr><td>Comportement digital</td><td>Smartphone, Instagram le soir, recherche Google « près de moi »</td></tr>
<tr><td>Message clé</td><td>« Réservez votre entremets en ligne, retirez-le sans attendre »</td></tr>
<tr><td>Leviers</td><td>Fiche Google, Instagram, newsletter avec consentement</td></tr>
</table>
<h3>Sources pour alimenter vos personas</h3>
<ul>
<li>Entretiens avec 5 à 8 clients réels (15 minutes suffisent).</li>
<li>Questions posées par les clients en boutique et au téléphone.</li>
<li>Données démographiques de GA4 et des statistiques des réseaux sociaux (si le consentement le permet).</li>
<li>Requêtes de la Search Console et suggestions de recherche de Google.</li>
<li>Avis clients (les vôtres et ceux des concurrents).</li>
</ul>
<h3>Erreurs fréquentes</h3>
<ul>
<li>« Notre cible, c'est tout le monde » : impossible de choisir des leviers ou des messages.</li>
<li>Des personas inventés sans aucun échange avec des clients.</li>
<li>Oublier l'acheteur réel en B2B : l'utilisateur (les salariés qui mangent) n'est pas le décideur (office manager, direction).</li>
</ul>
<blockquote><strong>À retenir</strong><br />Segmentez selon des critères géographiques, socio-démographiques ou firmographiques, comportementaux, psychographiques et digitaux. Choisissez une cible prioritaire, estimez son potentiel avec des sources publiques et des hypothèses explicites, puis incarnez-la dans des personas construits à partir de vrais clients.</blockquote>
`,
      },
      {
        title: "2.4 – Se fixer des objectifs SMART",
        content: `
<h3>La pyramide des objectifs</h3>
<p>Les objectifs webmarketing ne sont pas isolés : ils découlent des objectifs de l'entreprise.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Niveau</th><th>Question</th><th>Exemple Maison Lenoir</th></tr>
<tr><td>Objectif business</td><td>Que veut obtenir l'entreprise ?</td><td>Porter le chiffre d'affaires traiteur B2B de 31 000 à 60 000 euros HT sur les 12 mois suivant le lancement</td></tr>
<tr><td>Objectif marketing</td><td>Quel comportement client faut-il obtenir ?</td><td>Passer de 25 à 50 clients entreprises actifs, avec un panier moyen de 300 euros</td></tr>
<tr><td>Objectif webmarketing</td><td>Quelle contribution du web ?</td><td>Générer 25 demandes de devis qualifiées par mois via le site à partir du 4e mois</td></tr>
<tr><td>Objectifs opérationnels par levier</td><td>Quels résultats intermédiaires ?</td><td>Page traiteur dans le top 5 Google sur 5 requêtes cibles à 9 mois ; 400 abonnés à la page LinkedIn à 12 mois</td></tr>
</table>
<h3>Les cinq critères SMART</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Lettre</th><th>Critère</th><th>Question de contrôle</th><th>Contre-exemple</th><th>Exemple conforme</th></tr>
<tr><td>S</td><td>Spécifique</td><td>Que mesure-t-on précisément, sur quelle cible, quelle offre ?</td><td>« Développer le traiteur »</td><td>« Demandes de devis traiteur B2B reçues via le formulaire du site »</td></tr>
<tr><td>M</td><td>Mesurable</td><td>Avec quel indicateur et quel outil ?</td><td>« Plus de visibilité »</td><td>« Nombre d'événements generate_lead dans GA4, recoupé avec la boîte mail »</td></tr>
<tr><td>A</td><td>Atteignable (et accepté)</td><td>Les moyens, la capacité et le marché le permettent-ils ?</td><td>« 200 devis par mois » avec une capacité de 15 commandes par semaine</td><td>« 25 devis par mois », cohérent avec un taux de transformation de 40 % et la capacité</td></tr>
<tr><td>R</td><td>Réaliste / pertinent</td><td>Contribue-t-il à l'objectif business ?</td><td>« 10 000 abonnés TikTok »</td><td>Objectif relié au chiffre d'affaires traiteur</td></tr>
<tr><td>T</td><td>Temporellement défini</td><td>Pour quand ? avec quels jalons ?</td><td>« À terme »</td><td>« À partir du 4e mois après la mise en ligne, mesuré mensuellement »</td></tr>
</table>
<h3>Méthode pas à pas : du chiffre d'affaires aux visites nécessaires</h3>
<p>Le calcul « à rebours » permet de vérifier qu'un objectif est atteignable et de dimensionner les leviers. Exemple pour le traiteur B2B (hypothèses de travail) :</p>
<ol>
<li>Chiffre d'affaires supplémentaire visé : 60 000 − 31 000 = 29 000 euros HT sur 12 mois.</li>
<li>Panier moyen : 300 euros, donc environ 97 commandes supplémentaires, soit 8 par mois en moyenne (en tenant compte de la montée en charge, viser 10 à 12 par mois en régime de croisière).</li>
<li>Taux de transformation devis → commande estimé à 40 % : il faut environ 25 à 30 demandes de devis par mois.</li>
<li>Taux de conversion visite de la page traiteur → demande de devis estimé à 4 % (hypothèse à vérifier après lancement) : il faut environ 650 à 750 visites qualifiées par mois sur la page traiteur.</li>
<li>Ces visites seront apportées par le SEO (à moyen terme), Google Ads (immédiatement), LinkedIn et l'emailing : ce calcul alimente directement le chapitre 3.</li>
</ol>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape de l'entonnoir</th><th>Volume mensuel cible</th><th>Taux de passage (hypothèse)</th></tr>
<tr><td>Visites de la page traiteur</td><td>700</td><td>—</td></tr>
<tr><td>Demandes de devis</td><td>28</td><td>4 %</td></tr>
<tr><td>Commandes</td><td>11</td><td>40 %</td></tr>
<tr><td>Chiffre d'affaires</td><td>3 300 euros HT</td><td>panier 300 euros</td></tr>
</table>
<h3>Objectifs SMART complets de Maison Lenoir</h3>
<ol>
<li><strong>Commande en ligne B2C</strong> : atteindre 120 commandes en ligne avec retrait en boutique par mois, pour un panier moyen d'au moins 30 euros, au 6e mois après la mise en ligne du module (mi-2027), mesuré par les commandes enregistrées dans la solution de commande et l'événement purchase de GA4.</li>
<li><strong>Traiteur B2B</strong> : générer 25 demandes de devis qualifiées par mois via le site à partir du 4e mois après le lancement de la page entreprises, et maintenir ce niveau jusqu'au 12e mois.</li>
<li><strong>Notoriété locale</strong> : porter le nombre d'avis Google de 210 à 300 en 12 mois en conservant une note d'au moins 4,5.</li>
<li><strong>Fidélisation</strong> : constituer une base de 1 500 contacts B2C consentants et 300 contacts B2B en 12 mois, avec un taux d'ouverture moyen des newsletters supérieur à 30 % (à interpréter avec prudence, voir ci-dessous).</li>
</ol>
<blockquote><strong>Point de vigilance sur les indicateurs email :</strong> certaines messageries préchargent les images des emails, ce qui gonfle artificiellement les taux d'ouverture. Privilégiez le taux de clic et les conversions comme indicateurs principaux.</blockquote>
<h3>Objectifs de résultats, de moyens et KPI</h3>
<ul>
<li><strong>Objectif de résultat</strong> : ce que l'on veut obtenir (25 devis par mois).</li>
<li><strong>Objectif de moyens</strong> : ce que l'on s'engage à faire (publier 2 articles par mois, 3 publications LinkedIn par semaine). Utile pour piloter le travail, il ne remplace pas l'objectif de résultat.</li>
<li><strong>KPI</strong> (<em>Key Performance Indicator</em>) : indicateur choisi pour suivre l'atteinte d'un objectif. Chaque objectif SMART a au moins un KPI ; le détail du tableau de bord relève de la compétence C6.</li>
</ul>
<h3>Erreurs fréquentes</h3>
<ul>
<li>Fixer uniquement des objectifs de vanité (abonnés, likes) sans lien avec le chiffre d'affaires.</li>
<li>Oublier la situation de départ : « + 50 % » ne veut rien dire sans base.</li>
<li>Fixer trop d'objectifs : 3 à 5 objectifs principaux suffisent pour une TPE.</li>
<li>Ne pas vérifier la mesurabilité : un objectif de devis sans suivi de conversion configuré dans GA4 est invérifiable.</li>
</ul>
<blockquote><strong>À retenir</strong><br />Les objectifs webmarketing découlent des objectifs business. Ils sont Spécifiques, Mesurables, Atteignables, Réalistes et Temporellement définis. Le calcul à rebours (chiffre d'affaires, commandes, devis, visites) prouve leur faisabilité et prépare le choix des leviers.</blockquote>
`,
      },
      {
        title: "2.5 – Quiz de fin de chapitre",
        content: `
<ol>
<li><strong>Dans un SWOT, « des traiteurs spécialisés bien référencés sur Google » est :</strong><br />A. Une force<br />B. Une faiblesse<br />C. Une opportunité<br />D. Une menace</li>
<li><strong>Quel outil indique les requêtes pour lesquelles un site apparaît dans Google ?</strong><br />A. Google Search Console<br />B. Google Business Profile<br />C. Canva<br />D. Google Tag Manager</li>
<li><strong>Les trois composantes d'un positionnement sont :</strong><br />A. Prix, produit, place<br />B. Identification, différenciation, crédibilité<br />C. Attention, intérêt, action<br />D. Notoriété, image, fidélité</li>
<li><strong>Un persona est :</strong><br />A. Un client réel nommément désigné<br />B. Un portrait type semi-fictif construit à partir de données réelles<br />C. Une catégorie statistique de l'INSEE<br />D. Un influenceur</li>
<li><strong>En B2B, pour le traiteur de Maison Lenoir, le décideur est le plus souvent :</strong><br />A. Le salarié qui mange les viennoiseries<br />B. L'office manager ou l'assistante de direction<br />C. Le livreur<br />D. Le fournisseur de farine</li>
<li><strong>Lequel de ces objectifs est SMART ?</strong><br />A. Améliorer notre image sur Internet<br />B. Avoir beaucoup plus de clients en 2027<br />C. Générer 25 demandes de devis traiteur par mois via le site à partir du 4e mois après lancement<br />D. Être numéro un sur Google</li>
<li><strong>Le « A » de SMART impose notamment de vérifier :</strong><br />A. Que l'objectif est rédigé en anglais<br />B. Que les moyens, le marché et la capacité de production permettent de l'atteindre<br />C. Que l'objectif est ambitieux à plus de 100 %<br />D. Que l'objectif est validé par Google</li>
<li><strong>Avec 28 devis par mois et un taux de transformation de 40 %, on obtient environ :</strong><br />A. 7 commandes<br />B. 11 commandes<br />C. 18 commandes<br />D. 40 commandes</li>
<li><strong>Pourquoi le taux d'ouverture des emails doit-il être interprété avec prudence ?</strong><br />A. Il est interdit par le RGPD<br />B. Certaines messageries préchargent les images et gonflent artificiellement les ouvertures<br />C. Il n'est jamais mesurable<br />D. Il dépend de la note Google</li>
<li><strong>Pour estimer le nombre d'entreprises cibles dans une zone, une source fiable est :</strong><br />A. Un chiffre trouvé sur un forum<br />B. La base SIRENE / l'annuaire des entreprises, filtrés par commune, code NAF et effectif<br />C. Le nombre d'abonnés Instagram du concurrent<br />D. Une estimation au hasard</li>
</ol>
<h4>Corrigé</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>D</td><td>Facteur externe défavorable : menace.</td></tr>
<tr><td>2</td><td>A</td><td>Le rapport « Performances » de la Search Console liste requêtes, impressions, clics et positions moyennes.</td></tr>
<tr><td>3</td><td>B</td><td>Les « 4P » relèvent du marketing mix ; AIDA d'un modèle de message.</td></tr>
<tr><td>4</td><td>B</td><td>Le persona est un archétype fondé sur des entretiens et des données.</td></tr>
<tr><td>5</td><td>B</td><td>En B2B, l'utilisateur n'est pas toujours l'acheteur : le message doit viser le décideur.</td></tr>
<tr><td>6</td><td>C</td><td>Spécifique, mesurable, atteignable, relié au business et daté ; les autres sont vagues.</td></tr>
<tr><td>7</td><td>B</td><td>Un objectif inatteignable démotive et fausse le pilotage.</td></tr>
<tr><td>8</td><td>B</td><td>28 × 0,40 = 11,2.</td></tr>
<tr><td>9</td><td>B</td><td>Le préchargement automatique des images rend l'ouverture peu fiable ; le clic est plus solide.</td></tr>
<tr><td>10</td><td>B</td><td>Les données publiques officielles se citent et se vérifient.</td></tr>
</table>
`,
      },
      {
        title: "2.6 – Cas pratique C1 : positionnement, cible et objectifs SMART",
        content: `
<h3>Consigne</h3>
<p>À partir de votre entreprise (ou de Maison Lenoir), produisez :</p>
<ol>
<li>Un SWOT de quatre éléments au moins par case, chacun appuyé sur un fait observable.</li>
<li>Une proposition de valeur pour l'offre au cœur de votre projet de développement.</li>
<li>Un persona principal complet (6 rubriques) et un persona secondaire résumé.</li>
<li>Un objectif business et trois objectifs webmarketing SMART, avec le calcul à rebours justifiant au moins l'un d'eux.</li>
<li>Pour chaque objectif : le KPI, la valeur de départ, l'outil de mesure.</li>
</ol>
<h3>Corrigé détaillé (Maison Lenoir)</h3>
<h4>1. SWOT</h4>
<p>Voir la section 2.1. Points d'attention dans la correction : « site non adapté au mobile » est bien une faiblesse (interne), « habitude de commande en ligne des consommateurs » une opportunité (externe). Chaque élément est appuyé par un fait (note Google relevée, test PageSpeed Insights, benchmark daté).</p>
<h4>2. Proposition de valeur</h4>
<p>« Pour les entreprises nantaises qui veulent accueillir leurs équipes et leurs clients avec des produits de qualité, Maison Lenoir livre des petits-déjeuners et pauses artisanaux, commandés en ligne en quelques minutes avec devis sous 24 h, grâce à un laboratoire sur place. »</p>
<h4>3. Personas</h4>
<p>Persona principal : Claire, office manager (section 2.3). Persona secondaire : Camille, mère de famille active, pour la commande en ligne B2C. La correction vérifie que le comportement digital du persona débouche sur des leviers cohérents (Claire : Google sur ordinateur et LinkedIn ; Camille : smartphone, Instagram, fiche Google).</p>
<h4>4. Objectifs</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Objectif</th><th>KPI</th><th>Départ</th><th>Cible</th><th>Échéance</th><th>Outil</th></tr>
<tr><td>Business : CA traiteur B2B</td><td>CA HT traiteur sur 12 mois glissants</td><td>31 000 euros</td><td>60 000 euros</td><td>12 mois après lancement</td><td>Comptabilité / caisse</td></tr>
<tr><td>Webmarketing 1 : devis B2B</td><td>Demandes de devis qualifiées par mois</td><td>0 (aucun formulaire)</td><td>25</td><td>À partir du 4e mois</td><td>GA4 (événement de conversion) + boîte mail</td></tr>
<tr><td>Webmarketing 2 : commandes B2C en ligne</td><td>Commandes en ligne par mois</td><td>0</td><td>120, panier ≥ 30 euros</td><td>6e mois</td><td>Solution de commande + GA4</td></tr>
<tr><td>Webmarketing 3 : réputation</td><td>Nombre d'avis Google et note</td><td>210 avis, 4,6</td><td>300 avis, note ≥ 4,5</td><td>12 mois</td><td>Fiche d'établissement Google</td></tr>
</table>
<h4>5. Calcul à rebours (objectif 1)</h4>
<p>29 000 euros de CA supplémentaire ÷ 300 euros de panier ≈ 97 commandes par an ≈ 8 à 11 par mois en régime de croisière ; avec 40 % de transformation, 25 à 28 devis par mois ; avec 4 % de conversion de la page traiteur, environ 650 à 700 visites qualifiées par mois. Capacité vérifiée : 11 commandes par mois restent très en dessous du plafond de 15 par semaine.</p>
<h3>Critères d'autocorrection</h3>
<ul>
<li>Chaque objectif comporte une valeur de départ, une cible chiffrée et une échéance.</li>
<li>Au moins un objectif est relié au chiffre d'affaires.</li>
<li>Les taux utilisés dans le calcul sont présentés comme des hypothèses et seront vérifiés.</li>
<li>Les KPI sont mesurables avec des outils réellement disponibles et configurés.</li>
</ul>
<h3>Ce que le formateur évaluera dans le projet final (module C1)</h3>
<p>Dans le <strong>dossier écrit</strong>, la partie « Diagnostic et objectifs » doit présenter : le diagnostic synthétique (avec sources et dates), le positionnement et la proposition de valeur, la cible et au moins un persona, puis les objectifs SMART dans un tableau avec KPI, valeurs de départ et échéances. Le formateur vérifiera que les objectifs découlent du diagnostic et servent le projet de développement.</p>
<p>Lors de la <strong>présentation orale</strong>, attendez-vous à des questions comme : « Comment avez-vous fixé ce chiffre de 25 devis ? », « Que ferez-vous si le taux de transformation n'est que de 20 % ? », « Pourquoi cette cible plutôt que les particuliers ? ». Le calcul à rebours et les hypothèses explicites sont vos meilleurs arguments.</p>
`,
      },
    ],
  },
  {
    title: "Chapitre 3 – C2 Concevoir la stratégie webmarketing de l'entreprise",
    description: "Connaître les avantages et les inconvénients des principaux leviers d'acquisition, construire un budget webmarketing réaliste et choisir les leviers les plus adaptés au marché, à la cible et aux moyens de l'entreprise, conformément au module C2 de la formation.",
    sections: [
      {
        title: "3.1 – Les principaux leviers d'acquisition : avantages et inconvénients",
        content: `
<h3>Acquisition, conversion, fidélisation</h3>
<p>Un <strong>levier d'acquisition</strong> amène de nouveaux visiteurs ou prospects. La stratégie webmarketing combine des leviers d'acquisition, des dispositifs de <strong>conversion</strong> (site, page de commande, formulaire de devis) et des leviers de <strong>fidélisation</strong> (email, réseaux sociaux, programme de fidélité). Ce chapitre présente les leviers et leur logique de choix ; leur mise en œuvre détaillée (plan d'action, emailing, Google Ads, SEO, réseaux sociaux) est traitée dans les chapitres suivants.</p>
<h3>1. Le référencement naturel (SEO)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avantages</th><th>Inconvénients</th></tr>
<tr><td>Trafic sans coût par clic ; visiteurs à l'intention forte (ils cherchent la solution) ; effet durable ; crédibilité des résultats naturels ; bénéfice cumulatif des contenus</td><td>Délai de plusieurs mois ; résultats non garantis ; dépendance aux évolutions de Google ; besoin de compétences et de temps ; concurrence forte sur les requêtes génériques ; part de clics réduite sur certaines requêtes par les annonces, le pack local et les AI Overviews</td></tr>
</table>
<p><strong>Pour qui ?</strong> Toute entreprise dont les clients cherchent ses produits sur Google. Pour Maison Lenoir : indispensable sur les requêtes locales (« boulangerie », « gâteau sur commande », « traiteur entreprise » + Nantes).</p>
<h3>2. Le référencement local (fiche d'établissement Google et annuaires)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avantages</th><th>Inconvénients</th></tr>
<tr><td>Gratuit ; visibilité dans Google Maps et le pack local ; appels et itinéraires directs ; avis clients comme preuve sociale</td><td>Exposition aux avis négatifs (et parfois abusifs) ; nécessite des mises à jour régulières (horaires, photos, posts) ; concurrence de proximité</td></tr>
</table>
<p><strong>Pour qui ?</strong> Tout commerce ou service de proximité. C'est souvent le levier au meilleur rapport effort / résultat pour une TPE locale.</p>
<h3>3. Le référencement payant (SEA)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avantages</th><th>Inconvénients</th></tr>
<tr><td>Visibilité immédiate ; ciblage par mot-clé, zone, horaire, appareil ; budget plafonné au jour ; mesure précise des conversions ; utile pour tester une offre ou un message</td><td>Coût par clic qui peut être élevé sur les requêtes concurrentielles ; trafic qui s'arrête avec le budget ; risque de gaspillage sans compétences (mots-clés trop larges, requêtes non pertinentes) ; mesure dépendante du consentement aux cookies (Consent Mode v2)</td></tr>
</table>
<p><strong>À connaître :</strong> les campagnes <em>Performance Max</em> diffusent sur l'ensemble des inventaires de Google (Recherche, YouTube, Display, Discover, Gmail, Maps) à partir d'objectifs de conversion ; elles demandent un suivi de conversion fiable et laissent moins de contrôle à l'annonceur. Pour une TPE qui débute, une campagne sur le Réseau de Recherche ciblée sur quelques requêtes transactionnelles est généralement plus lisible.</p>
<h3>4. Les réseaux sociaux organiques</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avantages</th><th>Inconvénients</th></tr>
<tr><td>Gratuit en budget média ; relation directe et humaine ; idéal pour montrer le savoir-faire ; preuve sociale ; fidélisation</td><td>Portée organique limitée et dépendante des algorithmes ; chronophage (création, modération) ; résultats commerciaux indirects ; nécessite régularité</td></tr>
</table>
<h3>5. La publicité sur les réseaux sociaux (social ads)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avantages</th><th>Inconvénients</th></tr>
<tr><td>Ciblage géographique et par centres d'intérêt (Meta) ou par fonction et secteur (LinkedIn) ; formats visuels ; budgets modulables ; création de notoriété rapide</td><td>Intention d'achat plus faible que sur Google ; coûts élevés sur LinkedIn ; fatigue publicitaire ; ciblage personnalisé limité par le consentement et, pour les mineurs, interdit par le DSA</td></tr>
</table>
<h3>6. L'emailing</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avantages</th><th>Inconvénients</th></tr>
<tr><td>Coût très faible par contact ; canal détenu (pas de dépendance à un algorithme) ; excellent pour la fidélisation et la relance ; personnalisation et automatisation possibles</td><td>Nécessite une base de contacts constituée légalement ; délivrabilité à surveiller (authentification du domaine, réputation d'envoi) ; risque de lassitude et de désinscriptions</td></tr>
</table>
<h3>7. Les plateformes et places de marché</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avantages</th><th>Inconvénients</th></tr>
<tr><td>Accès immédiat à une audience existante ; logistique parfois incluse ; mise en place rapide</td><td>Commissions qui réduisent fortement la marge ; relation client et données conservées par la plateforme ; dépendance aux conditions de la plateforme ; image de marque diluée</td></tr>
</table>
<h3>8. L'influence et les partenariats</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avantages</th><th>Inconvénients</th></tr>
<tr><td>Recommandation perçue comme authentique ; accès à une communauté locale ; contenus réutilisables</td><td>Résultats difficiles à mesurer ; risque d'image ; obligations de la loi du 9 juin 2023 (mention « Publicité » ou « Collaboration commerciale », contrat écrit selon les seuils, responsabilité de l'annonceur)</td></tr>
</table>
<h3>9. Le display et le retargeting</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avantages</th><th>Inconvénients</th></tr>
<tr><td>Rappel de la marque aux visiteurs ayant manifesté un intérêt ; formats visuels ; coût par impression bas</td><td>Taux de clic faible ; audiences de reciblage réduites par le refus des cookies ; risque d'agacer ; peu adapté aux très petits volumes de trafic</td></tr>
</table>
<h3>Synthèse comparative</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Levier</th><th>Rapidité</th><th>Coût monétaire</th><th>Temps interne</th><th>Durabilité</th><th>Mesurabilité</th></tr>
<tr><td>SEO</td><td>Faible</td><td>Faible à moyen</td><td>Élevé</td><td>Forte</td><td>Bonne</td></tr>
<tr><td>Local (fiche Google)</td><td>Moyenne</td><td>Nul</td><td>Faible</td><td>Forte</td><td>Bonne</td></tr>
<tr><td>SEA</td><td>Forte</td><td>Moyen à élevé</td><td>Moyen</td><td>Nulle à l'arrêt</td><td>Très bonne</td></tr>
<tr><td>Social organique</td><td>Faible</td><td>Faible</td><td>Élevé</td><td>Moyenne</td><td>Moyenne</td></tr>
<tr><td>Social ads</td><td>Forte</td><td>Moyen</td><td>Moyen</td><td>Faible</td><td>Bonne</td></tr>
<tr><td>Emailing</td><td>Forte (sur base existante)</td><td>Faible</td><td>Moyen</td><td>Forte</td><td>Très bonne</td></tr>
<tr><td>Plateformes</td><td>Forte</td><td>Commission</td><td>Faible</td><td>Dépendante</td><td>Bonne</td></tr>
<tr><td>Influence</td><td>Moyenne</td><td>Variable</td><td>Moyen</td><td>Faible</td><td>Difficile</td></tr>
</table>
<blockquote><strong>À retenir</strong><br />Aucun levier n'est bon ou mauvais dans l'absolu. Chacun se caractérise par sa rapidité, son coût, le temps qu'il exige, sa durabilité et sa mesurabilité. La stratégie consiste à combiner un ou deux leviers rapides (SEA, email, social ads) avec des leviers durables (SEO, local, contenu).</blockquote>
`,
      },
      {
        title: "3.2 – Mettre en place un budget webmarketing",
        content: `
<h3>Ce que comprend un budget webmarketing</h3>
<p>Un budget complet ne se limite pas à l'achat d'espace. Il comporte cinq postes :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Poste</th><th>Exemples</th><th>Nature</th></tr>
<tr><td>Investissements de départ</td><td>Refonte du site, module de commande en ligne, photos professionnelles, charte graphique</td><td>Ponctuel (amortissable)</td></tr>
<tr><td>Outils et abonnements</td><td>Hébergement, nom de domaine, solution de commande, outil d'emailing, outil de gestion du consentement, outil de planification des réseaux sociaux</td><td>Récurrent fixe</td></tr>
<tr><td>Budget média</td><td>Google Ads, Meta Ads, LinkedIn Ads</td><td>Récurrent variable, pilotable</td></tr>
<tr><td>Prestations externes</td><td>Agence ou freelance SEO, rédaction, création de vidéos, paramétrage GA4</td><td>Ponctuel ou récurrent</td></tr>
<tr><td>Temps interne</td><td>Heures des dirigeants et salariés consacrées au marketing</td><td>Coût caché à valoriser</td></tr>
</table>
<h3>Trois méthodes pour fixer l'enveloppe</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Méthode</th><th>Principe</th><th>Avantage</th><th>Limite</th></tr>
<tr><td>Pourcentage du chiffre d'affaires</td><td>Consacrer une part du CA (actuel ou visé) au marketing</td><td>Simple, maîtrisé</td><td>Ne tient pas compte des objectifs ; inverse la logique (on dépense moins quand on vend moins)</td></tr>
<tr><td>Alignement sur la concurrence</td><td>Estimer l'effort des concurrents et s'y aligner</td><td>Évite d'être distancé</td><td>Données difficiles à obtenir ; les objectifs ne sont pas les mêmes</td></tr>
<tr><td><strong>Objectif-tâche</strong></td><td>Partir des objectifs, lister les actions nécessaires et les chiffrer</td><td>Cohérence objectifs / moyens ; argumentaire solide face à un associé, un banquier ou un prestataire</td><td>Demande des hypothèses de coût et de conversion</td></tr>
</table>
<p>En pratique, on combine : la méthode objectif-tâche construit le budget, le pourcentage du CA vérifie qu'il reste soutenable.</p>
<h3>Les indicateurs économiques indispensables</h3>
<ul>
<li><strong>CPC</strong> (coût par clic) = dépense ÷ nombre de clics.</li>
<li><strong>CPL</strong> (coût par lead, ici par demande de devis) = dépense ÷ nombre de demandes.</li>
<li><strong>CAC</strong> (coût d'acquisition client) = dépenses d'acquisition ÷ nouveaux clients.</li>
<li><strong>ROAS</strong> (<em>Return On Ad Spend</em>) = chiffre d'affaires généré ÷ dépense publicitaire.</li>
<li><strong>ROI</strong> = (marge générée − coût total) ÷ coût total.</li>
<li><strong>Valeur vie client (CLV)</strong> = panier moyen × fréquence d'achat × durée de la relation × taux de marge.</li>
</ul>
<h3>Calculer le coût d'acquisition maximal acceptable</h3>
<p>Exemple Maison Lenoir, traiteur B2B (hypothèses de travail) : panier moyen 300 euros HT, marge brute 55 %, soit 165 euros de marge par commande. Un client entreprise satisfait commande en moyenne 4 fois par an : marge annuelle par client = 660 euros. Si Maison Lenoir accepte de consacrer un tiers de la marge de la première année à l'acquisition, le <strong>CAC maximal</strong> est d'environ 220 euros. Avec 40 % de transformation des devis, cela autorise un <strong>CPL maximal</strong> d'environ 88 euros, et avec 4 % de conversion de la page, un <strong>CPC maximal</strong> d'environ 3,50 euros. Si les estimations de Google Ads (outil de planification des mots-clés) indiquent des CPC supérieurs, il faudra améliorer la conversion de la page ou privilégier d'autres leviers.</p>
<p>Pour la commande en ligne B2C : panier 30 euros, marge 65 %, soit 19,50 euros par commande. Le CAC acceptable est faible : la publicité payante n'est rentable que si le client recommande plusieurs fois. On privilégiera donc la fiche Google, Instagram, la boutique elle-même (affichage, QR code vers le site) et l'emailing de fidélisation.</p>
<h3>Le budget de Maison Lenoir pour la première année</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Poste</th><th>Détail (estimations d'exemple, à remplacer par des devis réels)</th><th>Montant annuel HT</th></tr>
<tr><td>Refonte du site avec commande en ligne et page entreprises</td><td>Prestataire, site accessible et optimisé mobile</td><td>4 500 euros</td></tr>
<tr><td>Photos et vidéos professionnelles</td><td>Une demi-journée de shooting produits et laboratoire</td><td>800 euros</td></tr>
<tr><td>Outils</td><td>Solution de commande, hébergement, emailing, gestion du consentement, planification réseaux sociaux</td><td>1 800 euros</td></tr>
<tr><td>Google Ads</td><td>Campagne Recherche traiteur B2B : 400 euros par mois ; campagnes saisonnières B2C (fêtes) : 600 euros par an</td><td>5 400 euros</td></tr>
<tr><td>Social ads</td><td>Meta géociblé (lancement de la commande en ligne, fêtes) et test LinkedIn</td><td>2 400 euros</td></tr>
<tr><td>Accompagnement SEO et rédaction</td><td>Audit initial et 2 contenus par mois la première année</td><td>2 800 euros</td></tr>
<tr><td>Partenariats et influence locale</td><td>Produits offerts et une collaboration rémunérée encadrée par contrat</td><td>600 euros</td></tr>
<tr><td>Réserve d'ajustement (environ 5 %)</td><td>Renforcer le levier le plus performant</td><td>900 euros</td></tr>
<tr><td><strong>Total décaissé</strong></td><td></td><td><strong>19 200 euros</strong> (soit 1 600 euros par mois en moyenne)</td></tr>
<tr><td>Temps interne valorisé</td><td>6 h 30 par semaine × 47 semaines × 35 euros (coût horaire estimé)</td><td>Environ 10 700 euros</td></tr>
</table>
<h3>Vérifications de cohérence</h3>
<ul>
<li><strong>Soutenabilité</strong> : 19 200 euros représentent environ 2,5 % du CA actuel (780 000 euros), dont 5 300 euros d'investissement ponctuel la première année.</li>
<li><strong>Rentabilité visée</strong> : si l'objectif traiteur est atteint (29 000 euros de CA supplémentaire à 55 % de marge, soit environ 16 000 euros de marge) et que la commande en ligne génère 120 commandes par mois en régime de croisière, la marge additionnelle couvre le budget dès la deuxième année, une fois l'investissement initial absorbé. Ce calcul repose sur des hypothèses à suivre mensuellement.</li>
<li><strong>Phasage</strong> : les dépenses publicitaires démarrent seulement quand le site, le suivi des conversions (GA4 avec Consent Mode v2) et la page entreprises sont prêts.</li>
</ul>
<h3>Erreurs fréquentes</h3>
<ul>
<li>Oublier le temps interne ou les abonnements, ce qui rend le budget irréaliste.</li>
<li>Budgéter de la publicité sans calculer le CPC ou le CAC acceptable.</li>
<li>Répartir le budget à parts égales entre tous les leviers « pour être juste ».</li>
<li>Ne prévoir aucune réserve pour réallouer vers ce qui fonctionne.</li>
</ul>
<blockquote><strong>À retenir</strong><br />Un budget webmarketing réunit investissements, outils, média, prestations et temps interne. Construisez-le par la méthode objectif-tâche, vérifiez-le par le pourcentage du CA, et calculez le coût d'acquisition maximal à partir du panier moyen, de la marge et de la récurrence.</blockquote>
`,
      },
      {
        title: "3.3 – Choisir les leviers selon le marché, la cible et le budget",
        content: `
<h3>Les cinq questions qui orientent le choix</h3>
<ol>
<li><strong>La demande existe-t-elle déjà ?</strong> Si les clients cherchent activement la solution (requêtes Google), privilégier les leviers de recherche (SEO, SEA, local). Si l'offre est nouvelle et peu recherchée, il faut créer la demande (réseaux sociaux, publicité ciblée, contenu).</li>
<li><strong>Où se trouve la cible ?</strong> Le comportement digital des personas désigne les canaux (Claire : Google et LinkedIn ; Camille : Instagram, Google Maps).</li>
<li><strong>Quel est le cycle d'achat ?</strong> Achat d'impulsion ou à court délai : leviers immédiats. Achat réfléchi et récurrent (B2B) : contenus de réassurance, relances email, relation.</li>
<li><strong>Quel est le budget et la marge par client ?</strong> Faible marge unitaire et faible récurrence : leviers gratuits ou peu coûteux. Forte valeur vie client : les leviers payants se justifient.</li>
<li><strong>Quelles sont les ressources internes ?</strong> Temps, compétences, capacité à produire du contenu, appétence de l'équipe.</li>
</ol>
<h3>Mesurer la demande existante</h3>
<ul>
<li><strong>Planificateur de mots-clés de Google Ads</strong> : volumes de recherche mensuels (en fourchettes pour les comptes sans dépense active) et estimation des enchères.</li>
<li><strong>Google Trends</strong> : saisonnalité (par exemple les pics de recherche autour des fêtes de fin d'année et de l'Épiphanie pour les galettes).</li>
<li><strong>Google Search Console</strong> : requêtes sur lesquelles le site apparaît déjà.</li>
<li><strong>Suggestions de recherche et rubrique « Autres questions posées »</strong> de Google.</li>
</ul>
<h3>La grille de scoring des leviers</h3>
<p>Notez chaque levier de 1 à 5 sur des critères pondérés selon vos priorités. Exemple Maison Lenoir (notes et pondérations proposées par l'entreprise, à discuter) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Levier</th><th>Adéquation cible (×3)</th><th>Contribution aux objectifs (×3)</th><th>Coût compatible (×2)</th><th>Temps / compétences (×2)</th><th>Rapidité (×1)</th><th>Score /55</th></tr>
<tr><td>Fiche Google et avis</td><td>5</td><td>4</td><td>5</td><td>5</td><td>4</td><td><strong>51</strong></td></tr>
<tr><td>SEO (site + contenus)</td><td>5</td><td>5</td><td>4</td><td>3</td><td>1</td><td><strong>45</strong></td></tr>
<tr><td>Google Ads Recherche (B2B)</td><td>5</td><td>5</td><td>3</td><td>3</td><td>5</td><td><strong>47</strong></td></tr>
<tr><td>Instagram organique</td><td>4</td><td>3</td><td>5</td><td>3</td><td>2</td><td><strong>39</strong></td></tr>
<tr><td>LinkedIn (page + profil dirigeant)</td><td>4</td><td>4</td><td>5</td><td>3</td><td>2</td><td><strong>42</strong></td></tr>
<tr><td>Emailing</td><td>4</td><td>4</td><td>5</td><td>4</td><td>3</td><td><strong>45</strong></td></tr>
<tr><td>Meta Ads géociblées</td><td>4</td><td>3</td><td>3</td><td>3</td><td>5</td><td><strong>38</strong></td></tr>
<tr><td>Plateformes de livraison</td><td>3</td><td>2</td><td>2</td><td>4</td><td>5</td><td><strong>32</strong></td></tr>
<tr><td>TikTok</td><td>2</td><td>2</td><td>4</td><td>2</td><td>2</td><td><strong>26</strong></td></tr>
<tr><td>Display / retargeting</td><td>2</td><td>2</td><td>3</td><td>3</td><td>4</td><td><strong>29</strong></td></tr>
</table>
<p><em>Calcul : score = 3 × adéquation + 3 × contribution + 2 × coût + 2 × temps + 1 × rapidité. Exemple pour la fiche Google : 15 + 12 + 10 + 10 + 4 = 51.</em></p>
<h3>Lecture de la grille et décisions</h3>
<ul>
<li><strong>Leviers retenus (cœur de stratégie)</strong> : fiche Google et avis, Google Ads Recherche pour le B2B, SEO, emailing, LinkedIn.</li>
<li><strong>Leviers d'appoint</strong> : Instagram organique (savoir-faire, fidélisation B2C) et Meta Ads ponctuelles autour du lancement de la commande en ligne et des fêtes.</li>
<li><strong>Leviers écartés à ce stade, avec justification</strong> : plateformes de livraison (commissions incompatibles avec la marge B2C, perte de la relation client) ; TikTok (cible prioritaire peu présente, temps de production vidéo insuffisant) ; display / retargeting (trafic trop faible pour constituer des audiences utiles). Ils pourront être réévalués à 12 mois.</li>
</ul>
<h3>Adapter la stratégie au contexte : quatre situations types</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Contexte</th><th>Leviers à privilégier</th><th>Exemple</th></tr>
<tr><td>Commerce local, petit budget, demande existante</td><td>Fiche Google, SEO local, réseaux sociaux de proximité, email</td><td>Boutique Maison Lenoir</td></tr>
<tr><td>B2B à forte valeur client, demande existante</td><td>SEA sur requêtes précises, SEO, LinkedIn, email de relance</td><td>Traiteur entreprises</td></tr>
<tr><td>Offre nouvelle, demande à créer</td><td>Social ads, contenus vidéo, influence, relations presse</td><td>Lancement d'un concept inédit</td></tr>
<tr><td>E-commerce national, marges correctes</td><td>SEA (dont Performance Max), SEO, email automation, retargeting</td><td>Vente de biscuits expédiés partout en France</td></tr>
</table>
<h3>Erreurs fréquentes</h3>
<ul>
<li>Choisir un réseau social parce qu'il est à la mode et non parce que la cible y est.</li>
<li>Ne retenir que des leviers lents alors que les objectifs sont à 4 mois.</li>
<li>Ne pas expliquer les leviers écartés : on ne sait pas si l'option a été étudiée.</li>
</ul>
<blockquote><strong>À retenir</strong><br />Le choix des leviers découle de la demande existante, du comportement de la cible, du cycle d'achat, de la marge par client et des ressources. Une grille de scoring pondérée rend le choix objectif et argumentable ; expliquez autant les leviers écartés que les leviers retenus.</blockquote>
`,
      },
      {
        title: "3.4 – Formaliser la stratégie : le document de synthèse",
        content: `
<h3>La stratégie en une page</h3>
<p>Avant de détailler le plan d'action, résumez la stratégie dans un document d'une page que l'équipe, un prestataire ou un partenaire financier peuvent comprendre en deux minutes.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Maison Lenoir</th></tr>
<tr><td>Projet de développement</td><td>Commande en ligne avec retrait en boutique ; activité traiteur B2B</td></tr>
<tr><td>Positionnement</td><td>L'artisan de quartier, aussi simple à commander qu'un service en ligne</td></tr>
<tr><td>Cibles</td><td>Prioritaire : PME et cabinets de 20 à 250 salariés dans la zone de livraison (persona Claire). Secondaire : familles et actifs du quartier (persona Camille)</td></tr>
<tr><td>Objectifs SMART</td><td>25 devis B2B par mois dès le 4e mois ; 120 commandes en ligne par mois au 6e mois ; 300 avis Google à 12 mois ; 1 500 contacts B2C et 300 contacts B2B consentants ou légitimement prospectables</td></tr>
<tr><td>Leviers cœur</td><td>Fiche Google, SEO, Google Ads Recherche, emailing, LinkedIn</td></tr>
<tr><td>Leviers d'appoint</td><td>Instagram, Meta Ads saisonnières, partenariats locaux</td></tr>
<tr><td>Budget</td><td>19 200 euros HT la première année + environ 4 h par semaine de temps interne</td></tr>
<tr><td>Conditions préalables</td><td>Site refondu (mobile, accessible, rapide), suivi des conversions dans GA4, bandeau cookies conforme avec Consent Mode v2, Search Console vérifiée</td></tr>
<tr><td>Indicateurs clés</td><td>Demandes de devis, commandes en ligne, CPL, CAC, ROAS, avis</td></tr>
</table>
<h3>Le phasage stratégique</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Phase</th><th>Période</th><th>Priorités</th></tr>
<tr><td>Fondations</td><td>Mois 1 à 3</td><td>Refonte du site, page entreprises, module de commande, mesure et consentement, optimisation de la fiche Google, création de la page LinkedIn</td></tr>
<tr><td>Lancement</td><td>Mois 3 à 4</td><td>Annonce aux clients en boutique, campagne Google Ads B2B, social ads de lancement, première newsletter</td></tr>
<tr><td>Croissance</td><td>Mois 4 à 9</td><td>Contenus SEO réguliers, prospection B2B par email, collecte d'avis, ajustement des campagnes</td></tr>
<tr><td>Optimisation</td><td>Mois 9 à 12</td><td>Réallocation du budget vers les leviers les plus rentables, fidélisation, bilan et objectifs de l'année 2</td></tr>
</table>
<h3>Anticiper les risques</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Risque</th><th>Probabilité</th><th>Mesure préventive ou corrective</th></tr>
<tr><td>Retard de la refonte du site</td><td>Moyenne</td><td>Cahier des charges précis, pénalités ou jalons dans le contrat, lancement de la page entreprises en priorité</td></tr>
<tr><td>CPC supérieurs au maximum acceptable</td><td>Moyenne</td><td>Mots-clés plus précis, exclusions, amélioration du taux de conversion de la page, report du budget sur LinkedIn et email</td></tr>
<tr><td>Afflux de commandes au-delà de la capacité</td><td>Faible</td><td>Plafond de commandes par créneau dans la solution de commande, délai de prévenance pour le traiteur</td></tr>
<tr><td>Manque de temps pour publier</td><td>Forte</td><td>Calendrier éditorial, création de contenus par lots, délégation partielle</td></tr>
<tr><td>Avis négatifs</td><td>Moyenne</td><td>Procédure de réponse sous 48 h, traitement du problème en interne</td></tr>
</table>
<h3>Check-list de validation de la stratégie</h3>
<ul>
<li>Chaque objectif SMART est servi par au moins un levier.</li>
<li>Chaque levier retenu est justifié par la cible et les objectifs ; chaque levier écarté a une raison.</li>
<li>Le budget couvre tous les postes, y compris le temps interne.</li>
<li>Le CAC maximal acceptable est calculé et comparé aux coûts attendus.</li>
<li>Les prérequis techniques et juridiques sont identifiés avant toute dépense média.</li>
<li>Les risques principaux ont une réponse.</li>
</ul>
<blockquote><strong>À retenir</strong><br />La stratégie se résume en une page : projet, positionnement, cibles, objectifs, leviers, budget, prérequis et indicateurs. Elle se phase dans le temps et anticipe les risques. C'est elle que le plan d'action (compétence C3) va décliner en actions concrètes.</blockquote>
`,
      },
      {
        title: "3.5 – Quiz de fin de chapitre",
        content: `
<ol>
<li><strong>Quel levier offre le trafic le plus durable sans coût par clic ?</strong><br />A. Google Ads<br />B. Le SEO<br />C. Les Meta Ads<br />D. Le display</li>
<li><strong>Une campagne Performance Max :</strong><br />A. Diffuse uniquement sur YouTube<br />B. Diffuse sur l'ensemble des inventaires de Google à partir d'objectifs de conversion<br />C. Est un outil de référencement naturel<br />D. Remplace Google Analytics</li>
<li><strong>Principal inconvénient des plateformes de livraison pour une boulangerie :</strong><br />A. Elles sont interdites en France<br />B. Les commissions réduisent la marge et la relation client reste à la plateforme<br />C. Elles n'ont aucune audience<br />D. Elles imposent le SEO</li>
<li><strong>La méthode de budgétisation la plus cohérente avec les objectifs est :</strong><br />A. Le pourcentage du CA<br />B. L'alignement sur la concurrence<br />C. La méthode objectif-tâche<br />D. Le budget de l'année précédente</li>
<li><strong>Le ROAS se calcule ainsi :</strong><br />A. Clics ÷ impressions<br />B. Chiffre d'affaires généré ÷ dépense publicitaire<br />C. Dépense ÷ nombre de clients<br />D. Marge ÷ chiffre d'affaires</li>
<li><strong>Avec un CAC maximal de 220 euros et 40 % de transformation des devis, le CPL maximal est d'environ :</strong><br />A. 40 euros<br />B. 88 euros<br />C. 220 euros<br />D. 550 euros</li>
<li><strong>Pourquoi le temps interne doit-il figurer dans le budget ?</strong><br />A. Pour obtenir une subvention<br />B. Parce que c'est un coût réel qui conditionne la faisabilité des actions<br />C. Parce que la loi l'impose<br />D. Il ne doit pas y figurer</li>
<li><strong>Si l'offre est totalement nouvelle et peu recherchée sur Google, on privilégie :</strong><br />A. Uniquement le SEO<br />B. Des leviers qui créent la demande : social ads, contenus, influence<br />C. Le retargeting seul<br />D. Aucune action</li>
<li><strong>Une grille de scoring des leviers sert à :</strong><br />A. Remplacer les objectifs SMART<br />B. Objectiver et argumenter le choix des leviers<br />C. Calculer la TVA<br />D. Mesurer le trafic du site</li>
<li><strong>Avant de lancer des campagnes Google Ads avec suivi des conversions dans l'Espace économique européen, il faut notamment :</strong><br />A. Supprimer le bandeau cookies<br />B. Un bandeau de consentement conforme et le Consent Mode v2<br />C. Désactiver GA4<br />D. Acheter des avis</li>
</ol>
<h4>Corrigé</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>B</td><td>Les positions naturelles se maintiennent sans payer chaque clic, contrairement aux leviers payants.</td></tr>
<tr><td>2</td><td>B</td><td>Performance Max couvre Recherche, YouTube, Display, Discover, Gmail et Maps.</td></tr>
<tr><td>3</td><td>B</td><td>La commission pèse sur une marge unitaire déjà faible, et les données clients restent à la plateforme.</td></tr>
<tr><td>4</td><td>C</td><td>On part des objectifs pour chiffrer les actions nécessaires.</td></tr>
<tr><td>5</td><td>B</td><td><em>Return On Ad Spend</em> : 2 000 euros de CA pour 500 euros dépensés donne un ROAS de 4.</td></tr>
<tr><td>6</td><td>B</td><td>220 × 0,40 = 88 euros : on peut payer 88 euros par devis si 4 devis sur 10 deviennent clients.</td></tr>
<tr><td>7</td><td>B</td><td>Une stratégie qui exige plus d'heures que l'équipe n'en dispose ne sera pas exécutée.</td></tr>
<tr><td>8</td><td>B</td><td>Sans recherche existante, les leviers de recherche ont peu de volume à capter.</td></tr>
<tr><td>9</td><td>B</td><td>La grille pondérée rend la décision transparente et défendable devant l'équipe, un associé ou un prestataire.</td></tr>
<tr><td>10</td><td>B</td><td>Google exige la transmission des signaux de consentement (Consent Mode v2) pour les fonctions de mesure et de personnalisation dans l'EEE, et la CNIL impose un consentement valable.</td></tr>
</table>
`,
      },
      {
        title: "3.6 – Cas pratique C2 : concevoir sa stratégie et son budget",
        content: `
<h3>Consigne</h3>
<p>À partir des objectifs SMART définis au chapitre 2, produisez :</p>
<ol>
<li>Une grille de scoring d'au moins 7 leviers, avec pondérations justifiées.</li>
<li>La liste des leviers retenus (cœur et appoint) et des leviers écartés, chacun avec une justification en une phrase.</li>
<li>Le calcul du coût d'acquisition client maximal pour votre offre principale.</li>
<li>Un budget annuel détaillé par poste (investissements, outils, média, prestations, temps interne) avec vérification de soutenabilité.</li>
<li>Une stratégie en une page et un phasage en quatre périodes.</li>
</ol>
<h3>Corrigé détaillé (Maison Lenoir)</h3>
<h4>1 et 2. Grille et décisions</h4>
<p>Reprendre la grille de la section 3.3. Leviers cœur : fiche Google (51), Google Ads Recherche B2B (47), SEO (45), emailing (45), LinkedIn (42). Leviers d'appoint : Instagram (39), Meta Ads (38). Écartés : plateformes de livraison (32) pour des raisons de marge et de relation client ; display (29) faute de trafic suffisant ; TikTok (26) faute d'adéquation avec la cible prioritaire et de temps de production.</p>
<p>Justification des pondérations : l'adéquation à la cible et la contribution aux objectifs pèsent triple car ce sont elles qui garantissent le résultat ; le coût et le temps pèsent double car les ressources sont limitées ; la rapidité pèse simple car l'horizon des objectifs (4 à 12 mois) laisse le temps aux leviers durables.</p>
<h4>3. CAC maximal (traiteur B2B)</h4>
<p>Marge par commande : 300 × 55 % = 165 euros ; 4 commandes par an : 660 euros de marge annuelle par client ; un tiers consacré à l'acquisition : CAC maximal ≈ 220 euros ; CPL maximal ≈ 88 euros (40 % de transformation) ; CPC maximal ≈ 3,50 euros (4 % de conversion). Conclusion : Google Ads est retenu sur des requêtes précises à forte intention, avec contrôle mensuel du CPL.</p>
<h4>4. Budget</h4>
<p>Voir le tableau de la section 3.2 : 19 200 euros HT décaissés la première année, dont 5 300 euros d'investissements ponctuels, plus environ 10 700 euros de temps interne valorisé. Soutenabilité : environ 2,5 % du CA actuel. Réserve d'ajustement de 900 euros pour renforcer le levier le plus performant après trois mois de mesure.</p>
<h4>5. Stratégie en une page et phasage</h4>
<p>Voir la section 3.4. Le correcteur vérifie que les dépenses média ne démarrent qu'après la phase « Fondations » (site, mesure, consentement), que chaque objectif est servi par un levier et que les indicateurs de pilotage sont annoncés.</p>
<h3>Erreurs relevées fréquemment dans les copies</h3>
<ul>
<li>Budget publicitaire posé « au feeling » sans calcul de CAC ni de CPC acceptable.</li>
<li>Leviers retenus sans lien avec les personas.</li>
<li>Absence des coûts d'outils et du temps interne.</li>
<li>Stratégie qui démarre la publicité avant d'avoir un site capable de convertir et de mesurer.</li>
</ul>
<h3>Ce que le formateur évaluera dans le projet final (module C2)</h3>
<p>Dans le <strong>dossier écrit</strong>, la partie « Stratégie » présente : l'analyse des leviers possibles avec leurs avantages et inconvénients appliqués à l'entreprise, la grille ou le raisonnement de choix, les leviers retenus et écartés avec leurs justifications, et un budget chiffré et cohérent avec les objectifs de la partie C1. Le formateur appréciera un raisonnement économique (marge, CAC, ROAS) même simple.</p>
<p>Lors de la <strong>présentation orale</strong>, préparez des réponses aux questions de mise en situation : « Si votre budget était réduit de moitié, quels leviers garderiez-vous ? » (réponse attendue : les leviers gratuits ou à meilleur score — fiche Google, SEO, email, LinkedIn — et une campagne Google Ads réduite aux requêtes les plus rentables) ; « Pourquoi ne pas utiliser les plateformes de livraison ? » ; « Comment saurez-vous au bout de trois mois si Google Ads est rentable ? » (comparaison du CPL réel au CPL maximal de 88 euros).</p>
`,
      },
    ],
  },
];
