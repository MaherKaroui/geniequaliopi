import type { CourseChapter } from "../courseContent";

export const WM14_PARTIE4: CourseChapter[] = [
  {
    title: "Chapitre 6 – C5 Mettre en œuvre la communication sur les réseaux sociaux",
    description:
      "4 h – Construire et déployer une stratégie social media adaptée à une TPE/PME : choix des réseaux, ligne éditoriale, formats, outils, modération, publicité sociale, suivi des résultats, collaboration avec des influenceurs dans le cadre de la loi du 9 juin 2023 et accessibilité des publications. Compétence C5 du programme.",
    sections: [
      {
        title: "6.1 – Introduction au web social : ce qui a changé pour une TPE/PME",
        content: `<h3>Du site vitrine à la conversation permanente</h3>
<p>Le « web social » désigne l'ensemble des plateformes où les contenus sont produits, partagés, commentés et recommandés par les utilisateurs eux-mêmes : réseaux sociaux, messageries, plateformes vidéo, forums et sites d'avis. Pour une entreprise, la conséquence est simple : on ne parle plus <em>à</em> ses clients, on parle <em>avec</em> eux, en public, et les autres clients assistent à l'échange.</p>
<p>Trois mécanismes structurent aujourd'hui ces plateformes :</p>
<ul>
<li><strong>L'algorithme de recommandation</strong> : la plupart des fils (Instagram, Facebook, TikTok, YouTube, LinkedIn) ne sont plus strictement chronologiques. Les plateformes indiquent elles-mêmes que la distribution d'un contenu dépend notamment de l'intérêt qu'il suscite (temps de visionnage, partages, enregistrements, commentaires). Un abonné ne voit donc pas tout ce que publie une page.</li>
<li><strong>La découverte par le contenu plutôt que par l'abonnement</strong> : les formats vidéo courts (Reels, TikTok, Shorts) sont largement proposés à des personnes qui ne suivent pas le compte. C'est une opportunité pour une petite marque : un bon contenu peut toucher bien au-delà de sa communauté.</li>
<li><strong>La conversation privée</strong> : une part importante des échanges commerciaux bascule en messagerie (Messenger, Direct Instagram, WhatsApp). Une question « vous livrez le samedi ? » arrive en message privé, pas en commentaire.</li>
</ul>
<h3>Ce que les réseaux sociaux peuvent – et ne peuvent pas – faire pour une TPE</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Les réseaux sociaux sont efficaces pour…</th><th>Ils sont peu efficaces pour…</th></tr>
<tr><td>Faire connaître une offre dans une zone de chalandise (notoriété locale)</td><td>Remplacer un site web ou une fiche d'établissement Google (on ne maîtrise ni l'algorithme ni la pérennité du compte)</td></tr>
<tr><td>Donner une personnalité à la marque (coulisses, savoir-faire, équipe)</td><td>Vendre immédiatement sans offre claire ni lien vers une page de commande</td></tr>
<tr><td>Entretenir la relation et faire revenir les clients</td><td>Produire des résultats durables avec des publications irrégulières</td></tr>
<tr><td>Recueillir des avis, des idées, des retours produits</td><td>Corriger une mauvaise expérience client (le problème est en amont)</td></tr>
<tr><td>Prospecter en B2B (LinkedIn, social selling)</td><td>Toucher une cible qui n'utilise pas la plateforme choisie</td></tr>
</table>
<h3>L'entreprise fil rouge : Maison Lenoir</h3>
<p>Rappel du cas : <strong>Maison Lenoir</strong> est une boulangerie-pâtisserie artisanale nantaise de 6 salariés. Elle développe deux axes : le <strong>click &amp; collect</strong> (commande en ligne, retrait en boutique) et une <strong>offre traiteur B2B</strong> (petits-déjeuners, plateaux et buffets pour les entreprises et associations de l'agglomération). Dans les exemples qui suivent, les chiffres sont <em>des hypothèses pédagogiques</em> construites pour l'exercice, pas des données de marché.</p>
<p>Situation de départ retenue pour l'exemple (mêmes données fictives que dans les chapitres précédents) :</p>
<ul>
<li>Chiffre d'affaires de 780 k€ HT, dont 31 k€ seulement pour le traiteur.</li>
<li>Note Google de 4,6 sur environ 210 avis.</li>
<li>Page Facebook créée il y a plusieurs années, environ 1 400 abonnés, publications irrégulières (une à deux par mois).</li>
<li>Compte Instagram d'environ 1 900 abonnés, alimenté au gré des envies, sans calendrier ni lien de commande.</li>
<li>Aucune présence LinkedIn de l'entreprise ; la gérante, Claire Lenoir, a un profil peu renseigné.</li>
<li>Aucun suivi des clics vers le module de click &amp; collect.</li>
</ul>
<p>Le diagnostic : la marque existe en ligne mais ne pilote rien. L'enjeu du chapitre est de transformer cette présence subie en dispositif piloté, cohérent avec les objectifs fixés en C1 et la stratégie définie en C2.</p>
<h3>Le lien avec les autres compétences</h3>
<p>La compétence C5 ne se travaille pas isolément. Vos actions social media doivent découler :</p>
<ul>
<li>des <strong>objectifs SMART</strong> définis en C1 (dans l'exemple : 120 commandes en ligne par mois au 6e mois, 25 demandes de devis B2B par mois dès le 4e mois, 300 avis Google à 12 mois) ;</li>
<li>des <strong>personas et du positionnement</strong> retenus en C2 ;</li>
<li>du <strong>plan d'action et du budget</strong> élaborés en C3 ;</li>
<li>et qu'elles soient <strong>mesurées</strong> par le dispositif de pilotage C6.</li>
</ul>
<blockquote><strong>À retenir</strong> – Les réseaux sociaux sont un canal de notoriété, de relation et de conversion indirecte. Ils ne remplacent ni le site ni la fiche Google, et leur distribution dépend d'algorithmes qui récompensent l'intérêt suscité. Une TPE réussit sur les réseaux quand chaque action est reliée à un objectif mesurable.</blockquote>`,
      },
      {
        title: "6.2 – Les grandes étapes d'une stratégie social media",
        content: `<h3>La démarche en huit étapes</h3>
<p>Une stratégie social media n'est pas une liste de publications. C'est une démarche qui part des objectifs de l'entreprise et revient vers eux par la mesure. La méthode ci-dessous est celle que nous recommandons pour votre dossier projet de fin de formation.</p>
<ol>
<li><strong>Audit de l'existant</strong> : recenser les comptes (y compris les comptes oubliés ou créés par d'anciens salariés), les accès administrateurs, les abonnés, la fréquence de publication, les contenus qui ont le mieux fonctionné, les avis et mentions de la marque.</li>
<li><strong>Objectifs social media</strong> : décliner les objectifs C1 en objectifs propres aux réseaux (notoriété, engagement, trafic, leads, ventes, recrutement, service client).</li>
<li><strong>Cibles</strong> : reprendre les personas et préciser leurs usages sociaux (plateformes, moments de connexion, formats consommés).</li>
<li><strong>Choix des plateformes</strong> : sélectionner un nombre limité de réseaux en fonction des cibles et des ressources (voir 6.3).</li>
<li><strong>Ligne éditoriale</strong> : ton, thèmes, piliers de contenu, formats, règles graphiques.</li>
<li><strong>Plan d'action et calendrier</strong> : qui publie quoi, quand, avec quels moyens, quel budget publicitaire.</li>
<li><strong>Animation et modération</strong> : réponses, gestion des avis et des crises, charte de modération.</li>
<li><strong>Mesure et ajustement</strong> : indicateurs, revue mensuelle, décisions.</li>
</ol>
<h3>Étape 1 en pratique : la grille d'audit</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Point d'audit</th><th>Question à se poser</th><th>Constat Maison Lenoir (exemple)</th></tr>
<tr><td>Propriété des comptes</td><td>Qui est administrateur ? Les accès sont-ils liés à une adresse de l'entreprise ?</td><td>Page Facebook administrée par un ancien apprenti et la gérante : à régulariser via le Business Manager (portefeuille Meta Business)</td></tr>
<tr><td>Cohérence de l'identité</td><td>Même nom, même logo, même description, mêmes horaires partout ?</td><td>Horaires Facebook obsolètes, Instagram sans lien vers la commande</td></tr>
<tr><td>Activité</td><td>Fréquence de publication sur les 3 derniers mois ?</td><td>4 publications Facebook en 3 mois, 9 sur Instagram</td></tr>
<tr><td>Performance</td><td>Quels contenus ont généré le plus de réactions, partages, messages ?</td><td>Les vidéos de façonnage du pain et la galette des rois</td></tr>
<tr><td>Relation client</td><td>Délai de réponse aux messages ? Avis sans réponse ?</td><td>11 messages sans réponse, 3 avis négatifs Google non traités</td></tr>
<tr><td>Concurrence</td><td>Que font 3 à 5 concurrents ou établissements comparables ?</td><td>Deux boulangeries voisines publient des Reels réguliers ; un traiteur B2B nantais est actif sur LinkedIn</td></tr>
</table>
<h3>Étape 2 : relier objectifs C1 et objectifs social media</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Objectif d'entreprise (C1)</th><th>Objectif social media</th><th>Indicateur</th></tr>
<tr><td>Atteindre 120 commandes en ligne par mois au 6e mois</td><td>Générer du trafic qualifié vers la page de commande</td><td>Clics sur le lien (UTM), sessions GA4 issues des réseaux, commandes attribuées</td></tr>
<tr><td>Recevoir 25 demandes de devis traiteur B2B par mois dès le 4e mois</td><td>Rendre l'offre traiteur visible auprès des décideurs locaux et obtenir des demandes de devis</td><td>Visites de la page traiteur depuis LinkedIn, demandes de devis, rendez-vous obtenus, coût par devis (repère maximal : 88 €)</td></tr>
<tr><td>Passer de 210 à 300 avis Google à 12 mois en conservant une note d'au moins 4,6</td><td>Développer l'engagement et inciter les clients satisfaits à témoigner</td><td>Taux d'engagement, messages reçus, avis obtenus, taux de réponse aux avis</td></tr>
<tr><td>Recruter un(e) apprenti(e) pâtissier(ère)</td><td>Valoriser la marque employeur</td><td>Candidatures reçues via les réseaux</td></tr>
</table>
<h3>Erreurs fréquentes</h3>
<ul>
<li>Commencer par « il faut être sur TikTok » au lieu de commencer par les objectifs et les cibles.</li>
<li>Ouvrir cinq comptes et n'en animer aucun correctement.</li>
<li>Oublier l'étape d'audit des accès : un compte dont l'entreprise n'est pas administratrice est un risque (perte du compte au départ d'un salarié ou d'un prestataire).</li>
<li>Ne fixer que des objectifs de « vanité » (nombre d'abonnés) sans lien avec le chiffre d'affaires.</li>
<li>Ne pas prévoir le temps humain : une stratégie social media sans ressource identifiée n'est pas un plan d'action.</li>
</ul>
<blockquote><strong>À retenir</strong> – Audit, objectifs, cibles, plateformes, ligne éditoriale, plan d'action, animation, mesure : cette boucle doit apparaître dans votre dossier projet. Le point clé est la cohérence entre l'objectif d'entreprise, l'action sociale et l'indicateur choisi.</blockquote>`,
      },
      {
        title: "6.3 – Sélectionner les réseaux selon sa cible et ses ressources",
        content: `<h3>Le principe : peu de réseaux, bien tenus</h3>
<p>Pour une TPE, la contrainte principale n'est pas l'accès aux plateformes (gratuit) mais le <strong>temps de production</strong>. Mieux vaut deux réseaux animés chaque semaine que cinq réseaux abandonnés. Le choix se fait sur trois critères :</p>
<ol>
<li><strong>Présence de la cible</strong> : où se trouvent réellement vos personas ? Les études d'usage (par exemple les baromètres publiés chaque année par des organismes comme Médiamétrie, l'Arcep et l'Arcom, ou le rapport international « Digital » de We Are Social et Meltwater) donnent des tendances par âge, mais rien ne remplace l'observation de votre propre clientèle : demandez-la en caisse, dans un questionnaire, à la livraison.</li>
<li><strong>Adéquation avec l'objectif</strong> : un réseau visuel et local pour la notoriété de proximité ; un réseau professionnel pour la prospection B2B ; une messagerie pour le service client.</li>
<li><strong>Capacité de production</strong> : la vidéo courte demande des tournages réguliers ; LinkedIn demande de l'écrit et une implication personnelle du dirigeant ; YouTube demande des contenus plus longs et mieux préparés.</li>
</ol>
<h3>La matrice de sélection</h3>
<p>Notez chaque réseau de 1 à 5 sur chaque critère, pondérez, puis retenez les deux ou trois meilleurs scores. Exemple pour Maison Lenoir (notes et pondérations indicatives, fixées par l'équipe) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Réseau</th><th>Présence cible particuliers (x3)</th><th>Présence cible B2B (x3)</th><th>Adéquation objectifs (x2)</th><th>Faisabilité interne (x2)</th><th>Score /50</th><th>Décision</th></tr>
<tr><td>Instagram</td><td>5</td><td>2</td><td>5</td><td>4</td><td>15+6+10+8 = 39</td><td>Prioritaire</td></tr>
<tr><td>Facebook</td><td>4</td><td>2</td><td>4</td><td>5</td><td>12+6+8+10 = 36</td><td>Prioritaire (communauté existante, événements, groupes de quartier)</td></tr>
<tr><td>LinkedIn</td><td>1</td><td>5</td><td>5</td><td>3</td><td>3+15+10+6 = 34</td><td>Prioritaire pour le traiteur B2B</td></tr>
<tr><td>TikTok</td><td>4</td><td>1</td><td>3</td><td>2</td><td>12+3+6+4 = 25</td><td>Différé : test en recyclant les Reels</td></tr>
<tr><td>Pinterest</td><td>3</td><td>1</td><td>2</td><td>3</td><td>9+3+4+6 = 22</td><td>Non retenu</td></tr>
<tr><td>YouTube</td><td>3</td><td>1</td><td>2</td><td>1</td><td>9+3+4+2 = 18</td><td>Non retenu (Shorts éventuellement plus tard)</td></tr>
<tr><td>WhatsApp Business</td><td>4</td><td>3</td><td>3</td><td>4</td><td>12+9+6+8 = 35</td><td>Retenu comme canal de service client, pas comme canal éditorial</td></tr>
</table>
<p>La décision finale de l'exemple : <strong>Instagram + Facebook</strong> pour le click &amp; collect et la clientèle locale, <strong>LinkedIn</strong> (page entreprise + profil de la gérante) pour le traiteur B2B, <strong>WhatsApp Business</strong> pour répondre aux questions et confirmer les commandes traiteur. TikTok est mis en attente avec un critère de réévaluation à six mois.</p>
<h3>Ne pas oublier les plateformes « non sociales » à fort impact local</h3>
<p>La <strong>fiche d'établissement Google</strong> (Google Business Profile) n'est pas un réseau social au sens strict, mais elle publie des actualités, reçoit des avis, des photos et des questions. Pour un commerce de proximité, elle est souvent l'un des premiers points de contact. Elle relève à la fois du référencement local (C4) et de l'e-réputation (6.8). Il en va de même pour les plateformes d'avis sectorielles.</p>
<h3>Check-list de décision</h3>
<ul>
<li>J'ai vérifié la présence réelle de mes personas (enquête clients, observation, statistiques existantes).</li>
<li>Chaque réseau retenu sert au moins un objectif chiffré.</li>
<li>J'ai estimé le temps hebdomadaire nécessaire par réseau et il est compatible avec les ressources disponibles.</li>
<li>J'ai prévu un critère de réévaluation pour les réseaux non retenus.</li>
<li>Les comptes sont créés au nom de l'entreprise, avec au moins deux administrateurs internes.</li>
</ul>
<blockquote><strong>À retenir</strong> – Le bon réseau est celui où se trouve votre cible, qui sert votre objectif et que vous pouvez animer durablement. Une matrice pondérée, même simple, rend votre choix argumenté et défendable devant votre direction, vos associés ou votre prestataire.</blockquote>`,
      },
      {
        title: "6.4 – Les réseaux grand public : usages et bonnes pratiques",
        content: `<p>Les fonctionnalités des plateformes évoluent très vite (durées maximales des vidéos, formats publicitaires, outils de création). Les éléments ci-dessous décrivent les usages stables ; vérifiez toujours les paramètres exacts dans les centres d'aide officiels au moment de mettre en œuvre.</p>
<h3>Facebook</h3>
<ul>
<li><strong>Usage</strong> : réseau généraliste, très utilisé pour la vie locale (groupes de quartier, événements, associations). La <strong>Page</strong> est l'outil de l'entreprise ; elle donne accès aux statistiques et à la publicité.</li>
<li><strong>Atouts pour une TPE</strong> : événements (dégustation, journée portes ouvertes), avis/recommandations, bouton d'action (« Commander », « Envoyer un message », lien vers le site), Messenger.</li>
<li><strong>Bonnes pratiques</strong> : informations pratiques à jour (horaires, adresse, lien de commande) ; publication de vidéos courtes (Reels) ; partage modéré dans les groupes locaux en respectant leurs règles.</li>
<li><strong>Exemple Maison Lenoir</strong> : un événement Facebook « Atelier galette des rois en famille » chaque mois de janvier, relayé dans deux groupes de quartier avec l'accord de leurs administrateurs.</li>
</ul>
<h3>Instagram</h3>
<ul>
<li><strong>Usage</strong> : réseau visuel ; formats publication (photo ou carrousel), Reels (vidéo verticale), Stories (contenus éphémères de 24 heures, sauf mise « à la une »), Lives, messages directs.</li>
<li><strong>Compte professionnel</strong> : passer en compte professionnel (entreprise ou créateur) pour accéder aux statistiques, aux boutons de contact et à la publicité. Le relier à la Page Facebook dans l'espace Meta Business.</li>
<li><strong>Bonnes pratiques</strong> : biographie claire (qui, où, quoi, lien de commande) ; Stories « à la une » organisées (Commander, Traiteur, Horaires, Avis) ; Reels montrant le geste artisanal ; légendes utiles avec appel à l'action.</li>
<li><strong>Exemple</strong> : Reel de 20 secondes « De la pâte à la vitrine : notre croissant au beurre AOP » avec en légende « Réservez vos viennoiseries du dimanche jusqu'au samedi 18 h – lien en bio ».</li>
</ul>
<h3>TikTok</h3>
<ul>
<li><strong>Usage</strong> : vidéo verticale courte à forte logique de découverte ; une marque peut toucher des personnes qui ne la suivent pas. Ton spontané, tendances sonores, formats « coulisses » et pédagogiques.</li>
<li><strong>Points d'attention</strong> : rythme de publication élevé pour être régulièrement distribué ; usage des musiques soumis à des règles de droits (les comptes professionnels disposent d'une bibliothèque de sons libres pour un usage commercial) ; public plus jeune en moyenne.</li>
<li><strong>Stratégie de test pour une TPE</strong> : recycler les Reels Instagram (sans filigrane d'une autre plateforme), mesurer sur 8 à 12 semaines, décider.</li>
</ul>
<h3>YouTube et YouTube Shorts</h3>
<ul>
<li><strong>Usage</strong> : plateforme vidéo et moteur de recherche à part entière ; contenus « evergreen » (tutoriels, recettes, présentations de savoir-faire) qui continuent d'être vus longtemps après publication. Shorts : format vertical court.</li>
<li><strong>Intérêt</strong> : référencement des vidéos dans YouTube et dans Google, intégration sur le site, contenu réutilisable en salon ou en rendez-vous commercial.</li>
<li><strong>Exemple</strong> : une vidéo « Comment réchauffer une viennoiserie sans la dessécher » ou une présentation de 2 minutes de l'offre traiteur, intégrée à la page traiteur du site.</li>
</ul>
<h3>Pinterest</h3>
<ul>
<li><strong>Usage</strong> : moteur de recherche visuel d'inspiration (recettes, décoration, mariage, événements). Les épingles renvoient vers des sites et ont une durée de vie longue.</li>
<li><strong>Pertinent si</strong> : l'offre se prête à l'inspiration et à la planification (pièces montées, gâteaux d'anniversaire, buffets d'événements) et si le site contient des pages vers lesquelles renvoyer.</li>
</ul>
<h3>Snapchat</h3>
<ul>
<li><strong>Usage</strong> : messagerie visuelle éphémère très utilisée par les jeunes publics ; fonctionnalités de carte (Snap Map) et de profils publics pour les entreprises.</li>
<li><strong>Pertinent si</strong> : la cible est jeune et locale (par exemple un snack étudiant). Pour Maison Lenoir, non prioritaire.</li>
</ul>
<h3>WhatsApp Business et les Chaînes</h3>
<ul>
<li><strong>WhatsApp Business</strong> (application gratuite distincte de WhatsApp) : profil d'entreprise avec horaires et adresse, catalogue de produits, réponses rapides, message d'absence et de bienvenue, étiquettes pour organiser les conversations.</li>
<li><strong>Chaînes WhatsApp</strong> : diffusion à sens unique vers des abonnés qui ont choisi de suivre la chaîne. Utile pour annoncer le produit du jour ou une ouverture exceptionnelle.</li>
<li><strong>Points d'attention</strong> : n'ajoutez pas de contacts à une liste de diffusion sans leur accord ; le RGPD s'applique aux numéros de téléphone collectés ; les messages promotionnels doivent rester à la demande du client.</li>
<li><strong>Exemple</strong> : les clients traiteur reçoivent la confirmation de leur commande et la photo du plateau préparé ; une chaîne « Maison Lenoir – le pain du jour » est ouverte à titre de test.</li>
</ul>
<h3>Tableau de synthèse</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Plateforme</th><th>Formats phares</th><th>Objectifs typiques</th><th>Effort de production</th></tr>
<tr><td>Facebook</td><td>Publications, Reels, événements, Messenger</td><td>Notoriété locale, communauté, événements</td><td>Moyen</td></tr>
<tr><td>Instagram</td><td>Reels, carrousels, Stories, Lives</td><td>Notoriété, image de marque, trafic</td><td>Moyen à élevé</td></tr>
<tr><td>TikTok</td><td>Vidéo verticale courte, Lives</td><td>Découverte, notoriété</td><td>Élevé</td></tr>
<tr><td>YouTube</td><td>Vidéos longues, Shorts</td><td>Référencement, pédagogie, preuve</td><td>Élevé</td></tr>
<tr><td>Pinterest</td><td>Épingles, tableaux</td><td>Inspiration, trafic durable</td><td>Faible à moyen</td></tr>
<tr><td>Snapchat</td><td>Snaps, Stories, profil public</td><td>Proximité jeune public</td><td>Moyen</td></tr>
<tr><td>WhatsApp Business</td><td>Messages, catalogue, Chaînes</td><td>Service client, fidélisation</td><td>Faible (mais réactivité exigée)</td></tr>
</table>
<blockquote><strong>À retenir</strong> – Chaque plateforme a sa grammaire : vidéo verticale courte pour la découverte, carrousels et Stories pour la relation, événements pour le local, messagerie pour le service. Les durées et fonctionnalités évoluent : citez-les dans votre dossier projet en indiquant la date de vérification.</blockquote>`,
      },
      {
        title: "6.5 – Les réseaux professionnels : LinkedIn, page entreprise, profil dirigeant et social selling",
        content: `<h3>Pourquoi LinkedIn pour une TPE qui vend aussi en B2B</h3>
<p>LinkedIn est le principal réseau social professionnel. Pour l'offre traiteur B2B de Maison Lenoir, il permet d'atteindre les personnes qui décident ou prescrivent l'achat : office managers, assistantes de direction, responsables RH, dirigeants de PME, responsables d'associations et de collectivités. On y travaille deux leviers complémentaires : la <strong>page entreprise</strong> et le <strong>profil du dirigeant</strong>.</p>
<h3>La page entreprise</h3>
<ul>
<li><strong>Éléments à renseigner</strong> : logo, bannière, description orientée client (« Petits-déjeuners et buffets artisanaux pour vos réunions à Nantes et alentours »), site web, secteur, taille, localisation, bouton personnalisé (par exemple « Visiter le site » vers la page traiteur).</li>
<li><strong>Contenus adaptés</strong> : réalisations (« buffet de 60 personnes pour l'assemblée générale d'une association »), coulisses de production, engagements (farines locales, gestion des invendus), recrutement.</li>
<li><strong>Limite</strong> : une page entreprise de petite taille a généralement une portée organique modeste. Elle sert de vitrine crédible ; la prospection passe surtout par les personnes.</li>
</ul>
<h3>Le profil du dirigeant : le vrai levier</h3>
<p>Sur LinkedIn, on fait affaire avec des personnes. Le profil de Claire Lenoir doit être pensé comme une page de vente discrète :</p>
<ol>
<li><strong>Photo</strong> professionnelle et souriante, bannière évoquant l'offre traiteur.</li>
<li><strong>Titre</strong> orienté bénéfice : « Gérante de Maison Lenoir – Boulangerie artisanale | Petits-déjeuners et buffets pour vos équipes à Nantes ».</li>
<li><strong>Infos</strong> : qui elle est, ce qu'elle propose, à qui, comment la contacter.</li>
<li><strong>Section « Sélection »</strong> (contenus mis en avant) : la plaquette traiteur, une réalisation, une recommandation client.</li>
<li><strong>Expérience</strong> détaillée et <strong>recommandations</strong> de clients satisfaits.</li>
</ol>
<h3>Le social selling : méthode pas à pas</h3>
<p>Le social selling consiste à utiliser les réseaux sociaux pour identifier, comprendre et engager des prospects, puis à créer une relation de confiance avant toute proposition commerciale. LinkedIn propose un indicateur de suivi, le <strong>Social Selling Index (SSI)</strong>, consultable par chaque membre ; il est utile comme repère de progression personnelle mais ne remplace pas les indicateurs commerciaux.</p>
<ol>
<li><strong>Définir la cible</strong> : entreprises de 20 à 250 salariés dans un rayon de 15 km ; fonctions : office manager, RH, assistanat de direction, dirigeant.</li>
<li><strong>Construire une liste</strong> : recherche LinkedIn par fonction et localisation ; liste de 100 comptes prioritaires dans un tableur (nom, entreprise, fonction, date du premier contact, statut).</li>
<li><strong>Observer avant de contacter</strong> : suivre les entreprises, réagir avec pertinence à leurs publications (événements, recrutements, séminaires).</li>
<li><strong>Invitation personnalisée</strong> : courte, sans argumentaire commercial. Exemple : « Bonjour Julie, j'ai vu que votre équipe s'installait dans les nouveaux bureaux de l'île de Nantes. Je dirige une boulangerie artisanale à deux pas et serais ravie d'échanger avec vous ici. Claire »</li>
<li><strong>Apporter de la valeur</strong> : publier régulièrement (une à deux fois par semaine) des contenus utiles : « 5 idées de petits-déjeuners pour un séminaire réussi », « comment calculer les quantités d'un buffet ».</li>
<li><strong>Proposer au bon moment</strong> : quand un signal apparaît (événement annoncé, question en commentaire, visite du profil), proposer un échange ou un échantillon de dégustation.</li>
<li><strong>Suivre</strong> : taux d'acceptation des invitations, réponses, rendez-vous, devis, signatures.</li>
</ol>
<h3>Exemple chiffré de suivi (hypothèses pédagogiques)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape (sur 3 mois)</th><th>Volume</th><th>Taux</th></tr>
<tr><td>Invitations envoyées</td><td>120</td><td>–</td></tr>
<tr><td>Invitations acceptées</td><td>54</td><td>45 % des invitations</td></tr>
<tr><td>Conversations engagées</td><td>18</td><td>33 % des connexions</td></tr>
<tr><td>Dégustations / rendez-vous</td><td>7</td><td>39 % des conversations</td></tr>
<tr><td>Devis envoyés</td><td>5</td><td>71 % des rendez-vous</td></tr>
<tr><td>Clients signés</td><td>2</td><td>40 % des devis</td></tr>
</table>
<p>Lecture : le maillon faible est ici le passage de la connexion à la conversation. L'action corrective consiste à améliorer la pertinence des premiers échanges (réagir aux actualités du prospect) plutôt qu'à envoyer davantage d'invitations.</p>
<h3>Règles de conduite</h3>
<ul>
<li>Pas de message commercial automatique dès l'acceptation de l'invitation : c'est la pratique la plus rejetée.</li>
<li>Respecter les conditions d'utilisation de LinkedIn : les outils d'automatisation non autorisés peuvent entraîner des restrictions de compte.</li>
<li>Respecter le RGPD : une prospection B2B par e-mail est possible sur la base de l'intérêt légitime si le message est en rapport avec la fonction de la personne et qu'elle peut s'y opposer facilement (doctrine de la CNIL) ; ne pas extraire massivement les données des profils.</li>
<li>Les autres réseaux professionnels (par exemple les plateformes d'événements d'affaires locaux, les réseaux de dirigeants, les clubs d'entreprises) complètent utilement LinkedIn en présentiel.</li>
</ul>
<blockquote><strong>À retenir</strong> – La page entreprise donne la crédibilité ; le profil du dirigeant crée la relation. Le social selling est une démarche de relation progressive (cibler, observer, se connecter, apporter de la valeur, proposer) qui se mesure étape par étape, comme un tunnel commercial.</blockquote>`,
      },
      {
        title: "6.6 – Ligne éditoriale, calendrier et formats (Reels, carrousels, Stories, Lives)",
        content: `<h3>La ligne éditoriale : la charte de ce que l'on publie</h3>
<p>La ligne éditoriale définit <strong>ce dont la marque parle, comment et pourquoi</strong>. Elle garantit la cohérence quand plusieurs personnes publient et évite la question quotidienne « qu'est-ce qu'on poste aujourd'hui ? ». Elle tient sur deux pages et comprend :</p>
<ol>
<li><strong>Le positionnement</strong> repris de C2 : « La boulangerie artisanale de quartier qui fait tout sur place, avec des farines de la région ».</li>
<li><strong>Le ton</strong> : chaleureux, fier du métier, pédagogique, jamais condescendant ; tutoiement ou vouvoiement (choix explicite : vouvoiement sur LinkedIn, tutoiement léger accepté sur Instagram).</li>
<li><strong>Les piliers de contenu</strong> (3 à 5 thèmes récurrents).</li>
<li><strong>Les formats</strong> par plateforme.</li>
<li><strong>Les règles graphiques</strong> : couleurs, typographies, cadrages, logo, gabarits.</li>
<li><strong>Les sujets interdits ou sensibles</strong> : politique, dénigrement des concurrents, photos de clients sans autorisation, allégations de santé non justifiées.</li>
</ol>
<h3>Les piliers de contenu de Maison Lenoir (exemple)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Pilier</th><th>Objectif</th><th>Exemples de contenus</th><th>Part du calendrier</th></tr>
<tr><td>Savoir-faire</td><td>Notoriété, différenciation</td><td>Façonnage, cuisson, lamination de la pâte feuilletée, choix des farines</td><td>30 %</td></tr>
<tr><td>Offre et commande</td><td>Trafic, conversion click &amp; collect</td><td>Produit de la semaine, rappel « commandez avant 18 h », nouveautés saisonnières</td><td>25 %</td></tr>
<tr><td>Traiteur pour les pros</td><td>Leads B2B</td><td>Réalisations, plateaux types, témoignages clients, conseils d'organisation</td><td>20 %</td></tr>
<tr><td>L'équipe et le quartier</td><td>Attachement, marque employeur</td><td>Portrait d'un salarié, partenariat avec le club de sport voisin, événements</td><td>15 %</td></tr>
<tr><td>Communauté</td><td>Engagement</td><td>Sondages en Story, repartage de photos clients (avec accord), jeu-concours</td><td>10 %</td></tr>
</table>
<h3>Les formats et leur rôle</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Format</th><th>Rôle principal</th><th>Conseils de production</th></tr>
<tr><td>Reel / vidéo verticale courte</td><td>Découverte par de nouveaux publics</td><td>Accroche visuelle dès les premières secondes ; sous-titres ; un seul message ; format 9:16 ; bon éclairage naturel</td></tr>
<tr><td>Carrousel</td><td>Pédagogie, enregistrements, partage</td><td>Première image = promesse (« 5 erreurs qui ratent une pâte à choux ») ; une idée par visuel ; dernière image = appel à l'action</td></tr>
<tr><td>Story</td><td>Relation avec les abonnés, urgence, coulisses</td><td>Stickers (sondage, question, lien, compte à rebours) ; rythme quotidien possible ; mise à la une des Stories utiles</td></tr>
<tr><td>Live</td><td>Proximité, interaction en temps réel</td><td>Annoncer à l'avance ; trame préparée ; un modérateur pour les questions ; rediffusion à valoriser</td></tr>
<tr><td>Publication photo</td><td>Vitrine produit</td><td>Lumière naturelle, fond neutre, légende avec information pratique</td></tr>
<tr><td>Article / document LinkedIn</td><td>Expertise B2B</td><td>Conseils concrets, preuve (cas client), appel à l'échange</td></tr>
</table>
<h3>Construire le calendrier éditorial</h3>
<ol>
<li><strong>Lister les temps forts</strong> de l'année : Épiphanie (galettes), Chandeleur, Saint-Valentin, Pâques, fête des mères et des pères, rentrée, séminaires d'automne, fêtes de fin d'année (bûches, buffets d'entreprise), événements locaux nantais.</li>
<li><strong>Fixer un rythme soutenable</strong> : par exemple 3 publications par semaine sur Instagram (dont 2 Reels), Stories 4 jours sur 7, 2 publications Facebook (souvent les mêmes contenus adaptés), 1 publication de la page LinkedIn + 1 publication du profil de la gérante.</li>
<li><strong>Répartir les piliers</strong> selon les pourcentages ci-dessus.</li>
<li><strong>Anticiper la production</strong> : demi-journée de tournage mensuelle, banque de rushes, gabarits.</li>
<li><strong>Préparer les campagnes</strong> 4 à 6 semaines avant le temps fort (exemple : les commandes de bûches se préparent dès novembre).</li>
</ol>
<h4>Extrait de calendrier (semaine type de novembre)</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Jour</th><th>Plateforme</th><th>Format</th><th>Pilier</th><th>Sujet</th><th>Appel à l'action</th><th>Responsable</th></tr>
<tr><td>Lundi</td><td>LinkedIn (profil Claire)</td><td>Texte + photo</td><td>Traiteur</td><td>« Votre séminaire de décembre : 3 erreurs à éviter sur le buffet »</td><td>Demander la plaquette en message</td><td>Claire</td></tr>
<tr><td>Mardi</td><td>Instagram + Facebook</td><td>Reel</td><td>Savoir-faire</td><td>Le tourage du croissant en 20 secondes</td><td>Réserver pour le week-end (lien en bio)</td><td>Léa (vendeuse)</td></tr>
<tr><td>Mercredi</td><td>Instagram</td><td>Story sondage</td><td>Communauté</td><td>« Bûche : plutôt praliné ou fruits rouges ? »</td><td>Voter</td><td>Léa</td></tr>
<tr><td>Jeudi</td><td>LinkedIn (page)</td><td>Carrousel PDF</td><td>Traiteur</td><td>Nos plateaux de fin d'année</td><td>Demander un devis</td><td>Claire</td></tr>
<tr><td>Vendredi</td><td>Instagram + Facebook</td><td>Carrousel</td><td>Offre</td><td>Les bûches 2026 : ouverture des précommandes</td><td>Précommander en click &amp; collect</td><td>Léa</td></tr>
<tr><td>Samedi</td><td>Instagram</td><td>Stories</td><td>Équipe</td><td>Coulisses du samedi matin</td><td>–</td><td>Équipe</td></tr>
</table>
<h3>Erreurs fréquentes</h3>
<ul>
<li>Publier uniquement des photos de produits : la marque devient un catalogue sans personnalité.</li>
<li>Copier-coller le même texte sur toutes les plateformes sans adaptation du format ni du ton.</li>
<li>Oublier l'appel à l'action ou l'information pratique (où, quand, comment commander).</li>
<li>Publier des photos de clients ou de salariés sans autorisation écrite (droit à l'image).</li>
<li>Utiliser des musiques ou visuels protégés sans droit d'usage commercial.</li>
</ul>
<blockquote><strong>À retenir</strong> – La ligne éditoriale fixe le ton, les piliers et les formats ; le calendrier les transforme en actions datées et attribuées. Un rythme modeste mais tenu vaut mieux qu'un rythme ambitieux abandonné au bout de trois semaines.</blockquote>`,
      },
      {
        title: "6.7 – Les outils : Meta Business Suite, Canva, planificateurs et organisation",
        content: `<h3>Meta Business Suite et le portefeuille business</h3>
<p>Meta Business Suite est l'outil gratuit de Meta pour gérer ensemble une Page Facebook et un compte Instagram professionnel. Fonctions principales :</p>
<ul>
<li><strong>Planificateur</strong> : créer et programmer publications, Reels et Stories sur les deux plateformes ;</li>
<li><strong>Boîte de réception unifiée</strong> : messages Messenger, Direct Instagram, commentaires, avec réponses enregistrées et réponses automatiques aux questions fréquentes ;</li>
<li><strong>Statistiques</strong> : couverture, interactions, évolution de l'audience, performance des contenus ;</li>
<li><strong>Gestion des accès</strong> : via les paramètres de l'entreprise (portefeuille business), attribuer des accès partiels aux salariés ou à un prestataire sans partager de mot de passe.</li>
</ul>
<p>Pour Maison Lenoir, la première action concrète est de créer le portefeuille business au nom de l'entreprise, d'y rattacher la Page et le compte Instagram, et de donner deux accès administrateurs (gérante + adjoint) et un accès limité à la vendeuse qui publie.</p>
<h3>Canva et les outils de création</h3>
<ul>
<li><strong>Canva</strong> : outil de conception en ligne (version gratuite et versions payantes) permettant de créer visuels, carrousels, Stories, vidéos courtes et documents à partir de modèles. Les versions payantes ajoutent notamment un kit de marque (couleurs, logos, polices) et des fonctions de redimensionnement.</li>
<li><strong>Éditeurs vidéo mobiles</strong> : les applications natives (éditeur des Reels, CapCut, outils intégrés aux smartphones) suffisent à un montage court de qualité.</li>
<li><strong>Bonnes pratiques</strong> : créer 5 à 8 gabarits maison (citation client, produit de la semaine, carrousel conseil, annonce d'événement, portrait d'équipe) pour gagner du temps et rester cohérent.</li>
<li><strong>Droits</strong> : vérifier la licence des éléments utilisés (images, musiques, polices) pour un usage commercial ; ne pas déposer comme marque un logo réalisé à partir de modèles non exclusifs sans vérifier les conditions.</li>
</ul>
<h3>Les planificateurs multi-réseaux</h3>
<p>Des outils comme Hootsuite, Agorapulse, Buffer, Later ou Swello (liste non exhaustive, offres et tarifs à vérifier) permettent de programmer sur plusieurs réseaux, dont LinkedIn, de centraliser les messages et de produire des rapports. LinkedIn permet aussi de programmer nativement une publication depuis la page ou le profil.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Besoin</th><th>Solution gratuite</th><th>Quand passer à un outil payant</th></tr>
<tr><td>Programmer Facebook + Instagram</td><td>Meta Business Suite</td><td>Rarement nécessaire pour une TPE</td></tr>
<tr><td>Programmer LinkedIn</td><td>Programmation native LinkedIn</td><td>Si plusieurs profils et pages à coordonner</td></tr>
<tr><td>Centraliser tous les messages et commentaires</td><td>Meta Business Suite (FB + IG)</td><td>Si plus de 3 réseaux actifs ou plusieurs personnes à la modération</td></tr>
<tr><td>Rapport mensuel consolidé</td><td>Tableur alimenté à la main, Looker Studio</td><td>Si le temps de consolidation dépasse 1 à 2 h par mois</td></tr>
<tr><td>Création de visuels</td><td>Canva gratuit</td><td>Besoin d'un kit de marque partagé et de redimensionnement</td></tr>
</table>
<h3>Organisation interne : qui fait quoi</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Tâche</th><th>Responsable (exemple)</th><th>Temps hebdomadaire estimé</th></tr>
<tr><td>Tournage et photos</td><td>Léa + boulanger pendant la production</td><td>1 h</td></tr>
<tr><td>Montage et visuels</td><td>Léa</td><td>1 h 30</td></tr>
<tr><td>Programmation</td><td>Léa</td><td>30 min</td></tr>
<tr><td>Réponses aux messages et commentaires</td><td>Léa (quotidien) / Claire (B2B)</td><td>1 h 30</td></tr>
<tr><td>LinkedIn et social selling</td><td>Claire</td><td>2 h</td></tr>
<tr><td>Analyse mensuelle</td><td>Claire</td><td>1 h par mois</td></tr>
</table>
<p>Total indicatif : environ 6 h 30 par semaine. Ce temps doit être valorisé dans le budget (voir chapitre 7, mise en correspondance ressources/résultats).</p>
<h3>Outils d'intelligence artificielle générative</h3>
<p>Les assistants d'IA générative peuvent aider à rédiger des premières versions de légendes, à proposer des idées de sujets ou à reformuler. Règles de prudence : relire systématiquement, vérifier toute information factuelle, ne pas y saisir de données personnelles de clients, et respecter les obligations de transparence lorsque des images sont générées par IA dans un contexte d'influence commerciale (voir 6.11).</p>
<blockquote><strong>À retenir</strong> – Un outil gratuit bien utilisé (Meta Business Suite, programmation native LinkedIn, Canva) suffit souvent à une TPE. L'essentiel est la gestion des accès au nom de l'entreprise, des gabarits réutilisables et une répartition claire du temps.</blockquote>`,
      },
      {
        title: "6.8 – Modération, gestion des avis et e-réputation",
        content: `<h3>Définitions</h3>
<p>L'<strong>e-réputation</strong> est l'image d'une entreprise telle qu'elle se forme en ligne : avis clients, commentaires, mentions sur les réseaux, articles, résultats de recherche sur son nom. La <strong>modération</strong> est l'ensemble des actions pour animer et réguler les échanges sur les espaces que l'entreprise gère : répondre, masquer, supprimer, signaler, bloquer.</p>
<h3>La charte de modération</h3>
<p>Publiée sur la page (ou au moins formalisée en interne), elle précise ce qui sera supprimé ou masqué : propos injurieux, discriminatoires, diffamatoires, spam, données personnelles publiées, contenus illicites. Elle protège l'entreprise : on ne supprime pas une critique parce qu'elle dérange, on supprime ce qui enfreint la charte.</p>
<h3>Méthode de réponse à un avis ou commentaire négatif</h3>
<ol>
<li><strong>Répondre vite</strong> (idéalement sous 24 à 48 h ouvrées) et publiquement.</li>
<li><strong>Remercier</strong> pour le retour, sans ironie.</li>
<li><strong>Reconnaître</strong> le ressenti ou le problème, sans se justifier longuement.</li>
<li><strong>Expliquer</strong> brièvement ce qui s'est passé si c'est utile, et ce qui est fait pour éviter que cela se reproduise.</li>
<li><strong>Proposer de poursuivre en privé</strong> (message, téléphone) pour une solution concrète.</li>
<li><strong>Clore</strong> publiquement si une solution a été trouvée.</li>
</ol>
<h4>Exemple</h4>
<p>Avis Google : « Commande click &amp; collect pas prête à l'heure, 15 minutes d'attente. Déçu. »</p>
<p>Réponse : « Bonjour Thomas, merci d'avoir pris le temps de nous écrire et toutes nos excuses pour cette attente. Samedi matin, une fournée a pris du retard et nous aurions dû vous prévenir par SMS. Depuis, nous envoyons un message dès qu'une commande risque d'être décalée. Nous serions heureux de vous offrir votre prochaine viennoiserie : pouvez-vous nous écrire à bonjour@… ? L'équipe Maison Lenoir. »</p>
<h3>Situations particulières</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Conduite à tenir</th></tr>
<tr><td>Avis manifestement faux (personne inconnue, jamais venue)</td><td>Répondre sobrement, puis signaler l'avis via la procédure de la plateforme ; conserver les preuves</td></tr>
<tr><td>Commentaire injurieux ou diffamatoire</td><td>Masquer ou supprimer conformément à la charte ; capture d'écran ; signalement ; en cas de gravité, conseil juridique</td></tr>
<tr><td>Troll répétitif</td><td>Ne pas alimenter l'échange ; une réponse factuelle, puis modération selon la charte</td></tr>
<tr><td>Question sur un allergène</td><td>Réponse précise et vérifiée ; renvoyer vers l'information allergènes disponible en boutique ; ne jamais improviser</td></tr>
<tr><td>Bad buzz (problème d'hygiène allégué, rumeur)</td><td>Activer la cellule de crise (gérante + 1 personne) ; vérifier les faits ; message unique, factuel et rapide ; suspendre les publications programmées promotionnelles</td></tr>
</table>
<h3>Le cadre juridique des avis</h3>
<ul>
<li>Il est interdit de rédiger de faux avis ou d'en commander : c'est une pratique commerciale trompeuse.</li>
<li>Les plateformes qui publient des avis doivent informer sur leurs modalités de contrôle (obligations issues du Code de la consommation).</li>
<li>Inciter à laisser un avis est possible ; conditionner un avantage à un avis <em>positif</em> ne l'est pas.</li>
</ul>
<h3>La veille d'e-réputation</h3>
<ul>
<li>Alertes Google sur le nom de l'entreprise et de la gérante.</li>
<li>Notifications de mentions et d'identifications sur Instagram, Facebook, LinkedIn.</li>
<li>Contrôle hebdomadaire des avis (Google, plateformes de livraison si utilisées).</li>
<li>Recherche mensuelle du nom de la marque dans les moteurs de recherche.</li>
<li>Indicateurs suivis : note moyenne, nombre d'avis, taux de réponse, délai moyen de réponse.</li>
</ul>
<blockquote><strong>À retenir</strong> – Une charte de modération écrite, une méthode de réponse en six temps et une veille simple suffisent à protéger la réputation d'une TPE. Un avis négatif bien traité devient une preuve de sérieux pour les futurs clients.</blockquote>`,
      },
      {
        title: "6.9 – Introduction à la publicité sociale : Meta Ads et LinkedIn Ads",
        content: `<h3>Pourquoi payer quand la publication est gratuite ?</h3>
<p>La portée organique d'une page d'entreprise est limitée. La publicité sociale permet de toucher une audience précise, au bon moment, avec un budget maîtrisé. Elle complète la stratégie organique : on sponsorise les contenus qui ont déjà prouvé leur intérêt, ou on crée des campagnes pour un objectif précis (précommandes de bûches, demandes de devis traiteur).</p>
<h3>Meta Ads (Facebook et Instagram)</h3>
<p>Les campagnes se créent dans le <strong>Gestionnaire de publicités</strong> (Ads Manager). La structure comporte trois niveaux :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Niveau</th><th>Ce qu'on y règle</th><th>Exemple Maison Lenoir</th></tr>
<tr><td>Campagne</td><td>L'objectif (notoriété, trafic, interactions, prospects, promotion de l'application, ventes)</td><td>Trafic vers la page de précommande des bûches</td></tr>
<tr><td>Ensemble de publicités</td><td>Audience, emplacements, budget, calendrier, optimisation</td><td>Personnes de 25 à 65 ans dans un rayon de 5 km autour de la boutique ; budget 10 € / jour pendant 14 jours</td></tr>
<tr><td>Publicité</td><td>Le visuel ou la vidéo, le texte, le bouton, le lien (avec UTM)</td><td>Reel « nos 4 bûches de l'année » + bouton « Commander »</td></tr>
</table>
<ul>
<li><strong>Booster une publication</strong> depuis la Page ou Instagram est la version simplifiée : rapide, mais avec moins d'options de ciblage et d'optimisation.</li>
<li><strong>Mesure</strong> : le <strong>pixel Meta</strong> et l'<strong>API Conversions</strong> permettent de mesurer les actions sur le site (par exemple une commande). Leur installation doit respecter le consentement aux cookies recueilli sur le site.</li>
<li><strong>Audiences</strong> : audiences personnalisées (visiteurs du site, personnes ayant interagi avec la page, fichier clients importé avec une base légale appropriée), audiences similaires, ciblage géographique et par centres d'intérêt. Les options de ciblage détaillé évoluent régulièrement ; Meta pousse des campagnes automatisées (gamme Advantage+).</li>
</ul>
<h3>LinkedIn Ads</h3>
<p>Les campagnes se gèrent dans le <strong>Campaign Manager</strong>. Leur force est le ciblage professionnel : fonction, ancienneté, secteur, taille d'entreprise, localisation, liste d'entreprises importée.</p>
<ul>
<li><strong>Formats courants</strong> : contenu sponsorisé (image, vidéo, carrousel, document), publicités par message, publicités textuelles, formulaires de génération de prospects intégrés (Lead Gen Forms).</li>
<li><strong>Coûts</strong> : les coûts par clic sont généralement nettement plus élevés que sur Meta, et des budgets minimums s'appliquent ; LinkedIn Ads se justifie quand la valeur d'un client B2B est élevée.</li>
<li><strong>Calcul d'opportunité pour Maison Lenoir (hypothèses)</strong> : un client traiteur régulier représente environ 300 € HT par mois, soit 3 600 € HT par an. Les repères fixés lors de la stratégie sont un CPC maximal d'environ 3,50 €, un coût par devis maximal d'environ 88 € et un coût d'acquisition client (CAC) maximal d'environ 220 €. Si une campagne de 600 € génère 8 demandes de devis (75 € par devis) et 3 clients (200 € par client), elle respecte les repères ; si elle ne génère que 2 devis (300 € par devis), elle est à arrêter ou à retravailler.</li>
</ul>
<h3>Méthode pour une première campagne</h3>
<ol>
<li>Définir un objectif unique et un indicateur (exemple : 40 précommandes de bûches attribuées).</li>
<li>Préparer la page d'arrivée (claire, mobile, rapide, commande en 3 clics) et le lien UTM.</li>
<li>Choisir un contenu ayant déjà bien fonctionné en organique.</li>
<li>Fixer un budget test (par exemple 150 à 300 € sur deux semaines) et une audience géographique cohérente avec la zone de retrait.</li>
<li>Créer deux variantes de publicité (deux accroches ou deux visuels).</li>
<li>Laisser tourner quelques jours avant de modifier, puis couper la variante la moins performante.</li>
<li>Bilan : coût par clic, coût par commande, chiffre d'affaires généré, ROAS (voir chapitre 7).</li>
</ol>
<h3>Obligations à respecter</h3>
<ul>
<li>Les publicités doivent respecter les règles publicitaires des plateformes et le droit de la consommation (prix, conditions des offres, jeux-concours).</li>
<li>Les plateformes en ligne rendent accessibles des informations sur les publicités diffusées (bibliothèque publicitaire Meta, obligations de transparence du règlement européen sur les services numériques) : la publicité est publique et consultable, y compris par les concurrents.</li>
<li>Le ciblage fondé sur des données sensibles et le ciblage publicitaire des mineurs à partir de leur profilage sont interdits par le règlement européen sur les services numériques.</li>
</ul>
<blockquote><strong>À retenir</strong> – La publicité sociale amplifie ce qui fonctionne déjà. Meta Ads convient au local et au grand public avec de petits budgets ; LinkedIn Ads au B2B à forte valeur client. Une campagne se prépare (objectif, page d'arrivée, UTM) et se juge sur le coût par résultat, pas sur les « j'aime ».</blockquote>`,
      },
      {
        title: "6.10 – Suivre ses actions : indicateurs natifs et paramètres UTM",
        content: `<h3>Les statistiques natives des plateformes</h3>
<p>Chaque plateforme fournit ses propres statistiques (Meta Business Suite, statistiques Instagram, analytics de la page LinkedIn, analytics TikTok et YouTube). Les noms varient et évoluent ; Meta, par exemple, met désormais en avant la métrique « vues » dans ses rapports. Les notions à maîtriser :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Définition</th><th>Ce qu'il mesure</th></tr>
<tr><td>Couverture (portée)</td><td>Nombre de comptes uniques ayant vu le contenu</td><td>Notoriété</td></tr>
<tr><td>Impressions / vues</td><td>Nombre total d'affichages (une personne peut compter plusieurs fois)</td><td>Exposition</td></tr>
<tr><td>Interactions</td><td>Réactions, commentaires, partages, enregistrements</td><td>Intérêt</td></tr>
<tr><td>Taux d'engagement</td><td>Interactions ÷ couverture (ou ÷ abonnés, selon la convention choisie) × 100</td><td>Qualité du contenu</td></tr>
<tr><td>Enregistrements et partages</td><td>Indicateurs d'intérêt fort</td><td>Valeur perçue du contenu</td></tr>
<tr><td>Durée de visionnage / taux de rétention</td><td>Temps moyen ou part de la vidéo regardée</td><td>Capacité de l'accroche et du rythme</td></tr>
<tr><td>Clics sur le lien</td><td>Clics vers le site, la bio, un bouton</td><td>Trafic généré</td></tr>
<tr><td>Abonnés gagnés</td><td>Nouveaux abonnés sur la période</td><td>Croissance de la communauté</td></tr>
<tr><td>Messages reçus, délai de réponse</td><td>Volume de conversations</td><td>Relation et service client</td></tr>
</table>
<p><strong>Attention à la convention de calcul</strong> : le taux d'engagement n'a pas de définition universelle. Indiquez toujours votre formule dans vos tableaux de bord et gardez-la constante dans le temps.</p>
<h3>Exemple de calcul</h3>
<p>Reel « tourage du croissant » : couverture 4 200 comptes ; 180 « j'aime », 22 commentaires, 35 partages, 61 enregistrements. Interactions = 298. Taux d'engagement sur la couverture = 298 ÷ 4 200 × 100 ≈ 7,1 %. Carrousel « bûches » : couverture 1 800, interactions 74, taux ≈ 4,1 %, mais 96 clics sur le lien de précommande. Conclusion : le Reel fait connaître, le carrousel fait agir. Les deux sont utiles et se jugent sur des indicateurs différents.</p>
<h3>Les paramètres UTM : relier les réseaux aux résultats sur le site</h3>
<p>Les statistiques natives s'arrêtent au clic. Pour savoir ce que font les visiteurs ensuite (commande, demande de devis), on ajoute aux liens des <strong>paramètres UTM</strong>, lus par Google Analytics 4 (et par la plupart des outils d'analyse).</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Paramètre</th><th>Rôle</th><th>Exemple</th></tr>
<tr><td>utm_source</td><td>La plateforme d'origine</td><td>instagram, facebook, linkedin, newsletter</td></tr>
<tr><td>utm_medium</td><td>Le type de canal</td><td>social (organique), paid_social (payant), email</td></tr>
<tr><td>utm_campaign</td><td>La campagne</td><td>buches_2026, traiteur_seminaires_t4</td></tr>
<tr><td>utm_content</td><td>La variante ou l'emplacement</td><td>reel_tourage, bio, story_lien</td></tr>
<tr><td>utm_term</td><td>Le mot-clé (surtout recherche payante)</td><td>facultatif</td></tr>
</table>
<p>Exemple de lien : https://www.maisonlenoir-exemple.fr/commander?utm_source=instagram&amp;utm_medium=social&amp;utm_campaign=buches_2026&amp;utm_content=bio</p>
<h4>Règles de nommage</h4>
<ul>
<li>Tout en minuscules (les valeurs sont sensibles à la casse : « Instagram » et « instagram » seraient deux sources différentes).</li>
<li>Pas d'espaces ni d'accents ; tirets bas comme séparateurs.</li>
<li>Un fichier de référence partagé (tableur) listant toutes les valeurs autorisées.</li>
<li>Utiliser un générateur d'URL de campagne (Google en propose un gratuitement) et éventuellement un raccourcisseur de lien.</li>
<li>Ne jamais mettre d'UTM sur les liens internes du site : cela fausse l'attribution des sessions.</li>
<li>Pour respecter le regroupement par canaux par défaut de GA4, utiliser des valeurs de medium reconnues (par exemple « social », « paid_social » ou « cpc », « email ») : vérifiez la documentation GA4 sur les groupes de canaux par défaut.</li>
</ul>
<h3>Où lire les résultats</h3>
<p>Dans GA4 : rapport <em>Acquisition &gt; Acquisition de trafic</em>, avec la dimension « Source/support de la session » ou « Campagne de la session », croisée avec les événements clés (commande, demande de devis). Le chapitre 7 détaille ce paramétrage.</p>
<blockquote><strong>À retenir</strong> – Les statistiques natives mesurent l'audience et l'intérêt ; les UTM relient les réseaux aux actions sur le site. Sans UTM, impossible de prouver qu'Instagram a généré des commandes. Nommez-les de façon stricte et documentée.</blockquote>`,
      },
      {
        title: "6.11 – Communiquer avec les influenceurs : méthode et cadre légal (loi du 9 juin 2023)",
        content: `<h3>Pourquoi l'influence, même pour une boulangerie ?</h3>
<p>Un créateur de contenu dispose d'une audience qui lui fait confiance. Pour une TPE locale, la <strong>micro-influence</strong> (créateurs ayant une audience modeste mais engagée et souvent locale) est généralement plus pertinente que les comptes très suivis : audience géographiquement ciblée, coût accessible, relation plus authentique. Les seuils de « micro » ou « nano » influence varient selon les sources ; retenez l'idée plutôt qu'un chiffre.</p>
<h3>Méthode en sept étapes</h3>
<ol>
<li><strong>Objectif</strong> : notoriété locale du click &amp; collect ? Lancement d'un produit ? Visibilité de l'offre traiteur auprès des entrepreneurs ?</li>
<li><strong>Identification</strong> : créateurs nantais (gastronomie, sorties, famille, vie locale) ; recherche par hashtags et lieux ; repérer ceux qui mentionnent déjà spontanément la boutique.</li>
<li><strong>Qualification</strong> : cohérence avec les valeurs de la marque, audience réellement locale (demander les statistiques d'audience), qualité des commentaires, absence de signes d'abonnés achetés, historique de transparence sur les partenariats, contenus passés compatibles avec l'image de la marque.</li>
<li><strong>Prise de contact</strong> personnalisée.</li>
<li><strong>Brief</strong> écrit.</li>
<li><strong>Contrat</strong> écrit, obligatoire au-delà d'un seuil (voir ci-dessous) et recommandé dans tous les cas.</li>
<li><strong>Suivi</strong> : code promo ou lien UTM dédié, statistiques fournies par le créateur, bilan.</li>
</ol>
<h3>Le brief : contenu type</h3>
<ul>
<li>Présentation de la marque et de l'objectif de la collaboration.</li>
<li>Message clé (un seul) et informations pratiques obligatoires (adresse, modalités de commande, dates).</li>
<li>Livrables : nombre et format des contenus (exemple : 1 Reel + 3 Stories), dates de publication.</li>
<li>Liberté créative laissée au créateur et éléments à éviter.</li>
<li>Mentions obligatoires de transparence.</li>
<li>Lien UTM et code promo éventuel.</li>
<li>Processus de validation (délai de relecture, nombre d'allers-retours).</li>
<li>Indicateurs attendus et date de remise des statistiques.</li>
</ul>
<h3>Le cadre légal : loi n° 2023-451 du 9 juin 2023</h3>
<p>La loi visant à encadrer l'influence commerciale et à lutter contre les dérives des influenceurs sur les réseaux sociaux définit l'influence commerciale comme l'activité de personnes qui, à titre onéreux (rémunération ou avantage en nature), mobilisent leur notoriété auprès de leur audience pour communiquer des contenus visant à faire la promotion de biens, services ou causes. Les principales obligations, dont le contenu a été ajusté depuis (notamment par une ordonnance de novembre 2024 pour l'articuler avec le droit européen), sont les suivantes – vérifiez la version en vigueur sur Légifrance avant tout contrat :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Obligation</th><th>Contenu</th></tr>
<tr><td>Transparence</td><td>Le caractère commercial doit être indiqué de façon claire, lisible et identifiable par la mention <strong>« Publicité »</strong> ou <strong>« Collaboration commerciale »</strong>, quel que soit le format, pendant toute la durée de la promotion (pas seulement dans une liste de hashtags en fin de texte)</td></tr>
<tr><td>Images retouchées ou générées</td><td>Mentions « Image retouchée » ou « Image virtuelle » lorsque l'apparence d'un visage ou d'une silhouette a été modifiée par retouche ou lorsque l'image est produite par intelligence artificielle, selon les conditions prévues par le texte</td></tr>
<tr><td>Contrat écrit</td><td>Obligatoire entre l'annonceur (ou son mandataire) et l'influenceur lorsque la rémunération ou la valeur des avantages en nature dépasse un seuil fixé par décret (fixé à 1 000 € HT par le décret d'application, à vérifier au moment de la signature) ; il précise notamment l'identité des parties, les missions, la rémunération, les droits de propriété intellectuelle, le droit applicable</td></tr>
<tr><td>Responsabilité</td><td>L'annonceur et l'influenceur (et l'agent éventuel) sont solidairement responsables des dommages causés aux tiers dans l'exécution du contrat d'influence</td></tr>
<tr><td>Promotions interdites</td><td>Notamment : actes et interventions à visée esthétique (chirurgie, injections…), abstention thérapeutique, produits de nicotine, certains produits et services financiers (dont crypto-actifs hors acteurs autorisés), abonnements à des pronostics sportifs, animaux non domestiques sauf exceptions ; restrictions encadrées pour les jeux d'argent et de hasard (plateformes excluant les mineurs) ; l'alcool reste soumis à la loi Évin</td></tr>
<tr><td>Mineurs</td><td>Les enfants influenceurs relèvent d'un régime spécifique de protection (loi du 19 octobre 2020) ; ne pas faire de collaboration avec un mineur sans en maîtriser les règles</td></tr>
<tr><td>Sanctions</td><td>Les manquements relèvent notamment des pratiques commerciales trompeuses ; certaines infractions sont passibles de peines allant jusqu'à deux ans d'emprisonnement et 300 000 € d'amende ; la DGCCRF contrôle et publie des résultats d'enquêtes sur le secteur</td></tr>
</table>
<p>La DGCCRF et le ministère de l'Économie mettent à disposition un <strong>guide de bonne conduite</strong> des influenceurs et créateurs de contenu : c'est la référence pratique à joindre au brief.</p>
<h3>Exemple Maison Lenoir</h3>
<p>Collaboration avec une créatrice nantaise « sorties et gourmandises » : un Reel et trois Stories autour du lancement de la galette frangipane-pistache, en échange d'une rémunération de 250 € HT et de produits offerts d'une valeur de 60 € HT. Total 310 € HT : sous le seuil du contrat écrit obligatoire, mais Maison Lenoir signe tout de même une convention simple (livrables, dates, mention « Collaboration commerciale », droits de réutilisation du Reel sur ses propres comptes pendant 12 mois, code promo GALETTE10). Bilan mesuré : vues, clics UTM, utilisations du code, ventes de galettes sur les deux semaines.</p>
<h3>Erreurs fréquentes</h3>
<ul>
<li>Offrir des produits « sans engagement » mais exiger une publication : c'est un avantage en nature, la mention reste obligatoire.</li>
<li>Repartager le contenu du créateur dans une publicité sans avoir négocié les droits.</li>
<li>Choisir un créateur sur son nombre d'abonnés sans vérifier la localisation de son audience.</li>
<li>Ne pas prévoir de code ou de lien dédié : impossible d'évaluer le retour.</li>
</ul>
<blockquote><strong>À retenir</strong> – La micro-influence locale est un levier accessible pour une TPE. Elle se prépare (objectif, qualification, brief) et se formalise : mention « Publicité » ou « Collaboration commerciale », contrat écrit au-delà du seuil réglementaire, respect des promotions interdites, responsabilité partagée avec le créateur.</blockquote>`,
      },
      {
        title: "6.12 – Rendre ses publications accessibles",
        content: `<h3>Pourquoi l'accessibilité concerne aussi les réseaux sociaux</h3>
<p>Une partie de vos clients vit avec un handicap visuel, auditif, cognitif ou moteur, de façon permanente ou temporaire. D'autres consultent les réseaux sans le son, en plein soleil ou d'une main. Rendre un contenu accessible, c'est élargir son audience et améliorer la compréhension pour tous. Le cadre légal (RGAA pour les services publics et, depuis le 28 juin 2025, les exigences issues de l'acte européen sur l'accessibilité pour certains produits et services, avec une exemption pour les microentreprises prestataires de services) vise surtout les sites et services numériques ; pour les publications sociales, il s'agit avant tout de bonnes pratiques, qui améliorent la qualité perçue de la marque.</p>
<h3>Check-list d'accessibilité d'une publication</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Bonne pratique</th><th>Exemple Maison Lenoir</th></tr>
<tr><td>Images</td><td>Rédiger un texte alternatif (Instagram, Facebook, LinkedIn le permettent) décrivant l'information utile de l'image</td><td>« Plateau traiteur de 12 mini-sandwichs au pain de mie maison, garnis de saumon, poulet et légumes grillés »</td></tr>
<tr><td>Vidéos</td><td>Sous-titres systématiques (sous-titrage automatique à relire et corriger) ; information importante aussi dite à l'oral et écrite</td><td>Reel avec sous-titres relus ; prix et date affichés et prononcés</td></tr>
<tr><td>Texte dans l'image</td><td>Éviter de mettre l'information uniquement dans l'image ; la reprendre dans la légende</td><td>« Précommande des bûches jusqu'au 20 décembre » répété en légende</td></tr>
<tr><td>Contrastes</td><td>Texte foncé sur fond clair (ou l'inverse) suffisamment contrasté ; vérifier avec un outil de contraste</td><td>Brun foncé sur crème plutôt que doré sur blanc</td></tr>
<tr><td>Hashtags</td><td>Majuscule à chaque mot (#BoulangerieNantes) pour la lecture par les lecteurs d'écran</td><td>#MaisonLenoir #ClickAndCollect</td></tr>
<tr><td>Émojis</td><td>En nombre limité, en fin de phrase, jamais à la place des mots (ils sont lus à voix haute par les lecteurs d'écran)</td><td>Un émoji par paragraphe au maximum</td></tr>
<tr><td>Langage</td><td>Phrases courtes, information principale en premier, éviter les abréviations obscures</td><td>« Commandez avant samedi 18 h, retrait dimanche dès 7 h 30 »</td></tr>
<tr><td>Effets visuels</td><td>Éviter les clignotements rapides et les textes animés trop vite</td><td>Transitions simples</td></tr>
<tr><td>Liens</td><td>Indiquer où mène le lien</td><td>« Lien vers la page de commande en bio »</td></tr>
</table>
<h3>Et la page d'arrivée ?</h3>
<p>Une publication accessible qui renvoie vers une page de commande inaccessible (boutons sans libellé, formulaire impossible au clavier) perd son effet. Vérifiez au minimum : navigation au clavier, libellés de champs, contraste, textes alternatifs, taille des zones cliquables sur mobile.</p>
<blockquote><strong>À retenir</strong> – Texte alternatif, sous-titres, information reprise en légende, contrastes, hashtags en majuscules à chaque mot et émojis mesurés : six réflexes qui rendent vos publications lisibles par tous et que vous pouvez inscrire dans votre ligne éditoriale comme critère qualité.</blockquote>`,
      },
      {
        title: "6.13 – Quiz de fin de chapitre 6",
        content: `<p>Répondez aux dix questions, puis consultez le corrigé.</p>
<h4>Question 1 – Maison Lenoir dispose de 6 h par semaine pour les réseaux sociaux. Quelle décision est la plus pertinente ?</h4>
<ul><li>A. Ouvrir des comptes sur les sept principaux réseaux pour maximiser la visibilité</li><li>B. Retenir deux ou trois réseaux en fonction des cibles et animer ceux-ci régulièrement</li><li>C. Se concentrer uniquement sur TikTok car c'est le réseau qui progresse le plus</li><li>D. Publier uniquement de la publicité payante</li></ul>
<h4>Question 2 – Pour prospecter des clients traiteur B2B, le levier le plus efficace sur LinkedIn est généralement :</h4>
<ul><li>A. La page entreprise seule</li><li>B. Le profil du dirigeant associé à une démarche de social selling</li><li>C. L'envoi automatique d'un message commercial à chaque nouvelle connexion</li><li>D. L'achat de listes de contacts</li></ul>
<h4>Question 3 – Quel format est le plus adapté pour toucher des personnes qui ne suivent pas encore le compte ?</h4>
<ul><li>A. La Story</li><li>B. La vidéo verticale courte (Reel)</li><li>C. La photo de profil</li><li>D. Le message privé</li></ul>
<h4>Question 4 – Que signifie utm_medium=paid_social dans un lien ?</h4>
<ul><li>A. Le nom de la campagne</li><li>B. La plateforme d'origine</li><li>C. Le type de canal : réseau social payant</li><li>D. Le mot-clé acheté</li></ul>
<h4>Question 5 – Un Reel obtient une couverture de 5 000 comptes et 350 interactions. Son taux d'engagement calculé sur la couverture est de :</h4>
<ul><li>A. 0,7 %</li><li>B. 3,5 %</li><li>C. 7 %</li><li>D. 14 %</li></ul>
<h4>Question 6 – Selon la loi du 9 juin 2023, comment signaler un contenu d'influence commerciale ?</h4>
<ul><li>A. Par le hashtag #sp en fin de légende</li><li>B. Par la mention « Publicité » ou « Collaboration commerciale », claire, lisible et identifiable</li><li>C. Aucune mention n'est nécessaire si le créateur est rémunéré en produits</li><li>D. Uniquement dans la biographie du créateur</li></ul>
<h4>Question 7 – Au-delà de quel critère le contrat écrit d'influence devient-il obligatoire ?</h4>
<ul><li>A. Dès 10 000 abonnés chez le créateur</li><li>B. Dès que la rémunération ou la valeur des avantages en nature dépasse un seuil fixé par décret</li><li>C. Uniquement pour les publicités télévisées</li><li>D. Jamais, il est seulement recommandé</li></ul>
<h4>Question 8 – Un client laisse un avis négatif justifié sur un retard de commande. La meilleure réponse :</h4>
<ul><li>A. Supprimer l'avis</li><li>B. Ne pas répondre pour ne pas lui donner de visibilité</li><li>C. Répondre publiquement, reconnaître, expliquer la mesure corrective, proposer de poursuivre en privé</li><li>D. Demander à des proches de publier des avis positifs pour le noyer</li></ul>
<h4>Question 9 – Lequel de ces gestes améliore l'accessibilité d'une publication Instagram ?</h4>
<ul><li>A. Remplacer les mots par des émojis</li><li>B. Rédiger un texte alternatif et sous-titrer les vidéos</li><li>C. Écrire les hashtags tout en minuscules et collés</li><li>D. Mettre toutes les informations dans l'image uniquement</li></ul>
<h4>Question 10 – Pourquoi LinkedIn Ads peut-il être rentable pour le traiteur B2B malgré des coûts par clic élevés ?</h4>
<ul><li>A. Parce que les clics sont gratuits pour les TPE</li><li>B. Parce que la valeur annuelle d'un client B2B peut couvrir largement un coût d'acquisition élevé</li><li>C. Parce que LinkedIn garantit un nombre de clients</li><li>D. Parce que la publicité LinkedIn n'a pas besoin de page d'arrivée</li></ul>
<h3>Corrigé et explications</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>B</td><td>La contrainte d'une TPE est le temps. Peu de réseaux, choisis selon les cibles et les objectifs, animés régulièrement (6.3).</td></tr>
<tr><td>2</td><td>B</td><td>Sur LinkedIn, la relation passe par les personnes ; la page entreprise apporte la crédibilité. Le message commercial automatique (C) est contre-productif ; l'achat de listes (D) pose des problèmes RGPD.</td></tr>
<tr><td>3</td><td>B</td><td>Les vidéos verticales courtes sont largement recommandées à des non-abonnés ; les Stories touchent surtout les abonnés existants.</td></tr>
<tr><td>4</td><td>C</td><td>utm_medium décrit le type de canal ; utm_source la plateforme ; utm_campaign la campagne ; utm_term le mot-clé.</td></tr>
<tr><td>5</td><td>C</td><td>350 ÷ 5 000 × 100 = 7 %. Précisez toujours la base de calcul (couverture ou abonnés).</td></tr>
<tr><td>6</td><td>B</td><td>La loi impose la mention « Publicité » ou « Collaboration commerciale » de façon claire, lisible et identifiable pendant toute la durée de la promotion ; un hashtag ambigu ne suffit pas, et les avantages en nature sont concernés.</td></tr>
<tr><td>7</td><td>B</td><td>Le seuil dépend de la rémunération ou de la valeur des avantages, fixé par décret (1 000 € HT à la date du décret d'application) ; le nombre d'abonnés n'est pas le critère.</td></tr>
<tr><td>8</td><td>C</td><td>Supprimer un avis légitime ou noyer sous de faux avis est déloyal et, pour les faux avis, illégal. Une réponse constructive rassure les futurs clients.</td></tr>
<tr><td>9</td><td>B</td><td>Texte alternatif et sous-titres rendent le contenu perceptible par tous. Les hashtags doivent avoir une majuscule à chaque mot ; les émojis ne remplacent pas les mots.</td></tr>
<tr><td>10</td><td>B</td><td>On compare le coût d'acquisition à la valeur du client (marge sur la durée de la relation), pas au coût par clic isolé.</td></tr>
</table>
<blockquote><strong>À retenir</strong> – Si vous avez moins de 7 bonnes réponses, relisez les sections 6.3 (choix des réseaux), 6.10 (indicateurs et UTM) et 6.11 (influence).</blockquote>`,
      },
      {
        title: "6.14 – Cas pratique : bâtir le plan d'action réseaux sociaux de Maison Lenoir",
        content: `<h3>Consigne</h3>
<p>Vous accompagnez Claire Lenoir. Les objectifs fixés en C1 sont (exemple) :</p>
<ul>
<li>O1 : atteindre 120 commandes en ligne (click &amp; collect) par mois au 6e mois (plan démarré en janvier) ;</li>
<li>O2 : recevoir 25 demandes de devis traiteur B2B par mois dès le 4e mois ;</li>
<li>O3 : passer de 210 à 300 avis Google à 12 mois en conservant une note d'au moins 4,6.</li>
</ul>
<p>Ressources : 6 h 30 par semaine (Léa et Claire) ; sur le budget webmarketing de l'an 1 (19 200 € HT, qui couvre aussi le site, le référencement, la publicité sur les moteurs et les outils), une enveloppe de 1 800 € HT est réservée aux réseaux sociaux (publicité et influence) pour les six premiers mois ; un smartphone récent ; Canva gratuit. Repères économiques : CAC maximal d'environ 220 €, coût par devis maximal d'environ 88 €, CPC maximal d'environ 3,50 €. Situation de départ : voir 6.1.</p>
<p>Travail demandé :</p>
<ol>
<li>Choisir et justifier les réseaux retenus.</li>
<li>Définir la ligne éditoriale (ton, 4 à 5 piliers, formats).</li>
<li>Établir un plan d'action sur six mois (actions, calendrier, responsables, budget).</li>
<li>Prévoir la modération et la gestion de l'e-réputation.</li>
<li>Proposer une action d'influence conforme à la loi.</li>
<li>Définir les indicateurs de suivi et le plan de marquage UTM.</li>
</ol>
<h3>Corrigé détaillé</h3>
<h4>1. Choix des réseaux</h4>
<p>Retenus : Instagram et Facebook (O1, clientèle locale de 25 à 65 ans, communauté existante, publicité géolocalisée à petit budget) ; LinkedIn page + profil de Claire (O2, décideurs B2B) ; WhatsApp Business (service client et confirmations traiteur). Non retenus à ce stade : TikTok (réévaluation en juillet en recyclant les Reels), YouTube, Pinterest, Snapchat. Justification par la matrice pondérée (6.3) et la capacité de 6 h 30 par semaine.</p>
<h4>2. Ligne éditoriale</h4>
<p>Ton chaleureux, fier du métier, pédagogique. Piliers : Savoir-faire 30 %, Offre et commande 25 %, Traiteur pro 20 %, Équipe et quartier 15 %, Communauté 10 %. Formats : Reels (2 par semaine), carrousels (1 par semaine), Stories (4 jours sur 7), LinkedIn (2 publications par semaine dont 1 du profil de Claire). Règles : information pratique et lien dans chaque publication « Offre » ; texte alternatif et sous-titres systématiques ; autorisations écrites de droit à l'image pour l'équipe.</p>
<h4>3. Plan d'action sur six mois</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Mois</th><th>Actions</th><th>Responsable</th><th>Budget</th><th>Objectif visé</th></tr>
<tr><td>Janvier</td><td>Régularisation des accès (portefeuille business), passage Instagram en compte professionnel, mise à jour des biographies et horaires, gabarits Canva, campagne Meta « galettes » géolocalisée 5 km</td><td>Claire / Léa</td><td>300 €</td><td>O1, O3</td></tr>
<tr><td>Février</td><td>Optimisation du profil LinkedIn de Claire, page entreprise, liste de 100 prospects, Reels Chandeleur et Saint-Valentin</td><td>Claire</td><td>0 €</td><td>O1, O2</td></tr>
<tr><td>Mars</td><td>Collaboration micro-influence (galette ou nouveauté de printemps), code promo dédié ; social selling (20 invitations/semaine)</td><td>Claire</td><td>310 € (rémunération + produits)</td><td>O1, O2</td></tr>
<tr><td>Avril</td><td>Campagne Meta « précommandes de Pâques » ; carrousel « offre petits-déjeuners d'équipe » sponsorisé sur LinkedIn auprès d'une audience locale de fonctions RH et office management (test)</td><td>Léa / Claire</td><td>350 € Meta + 450 € LinkedIn</td><td>O1, O2</td></tr>
<tr><td>Mai</td><td>Live Instagram « atelier tarte aux fraises », jeu-concours conforme (règlement), relance des devis B2B</td><td>Léa</td><td>90 € (lots)</td><td>O1, O2</td></tr>
<tr><td>Juin</td><td>Campagne Meta « fête des pères » ; bilan semestriel et décision TikTok</td><td>Claire</td><td>300 €</td><td>O1</td></tr>
<tr><td colspan="3"><strong>Total</strong></td><td><strong>1 800 €</strong></td><td></td></tr>
</table>
<h4>4. Modération et e-réputation</h4>
<ul>
<li>Charte de modération publiée dans la section « À propos » de la Page.</li>
<li>Réponse aux messages sous 24 h ouvrées (réponses enregistrées dans Meta Business Suite pour les questions fréquentes : horaires, allergènes, délais de commande).</li>
<li>Réponse à 100 % des avis Google sous 48 h, avec la méthode en six temps.</li>
<li>Après chaque commande traiteur, message WhatsApp de remerciement invitant à laisser un avis (sans contrepartie).</li>
<li>Veille : alertes sur « Maison Lenoir Nantes », contrôle hebdomadaire des mentions.</li>
</ul>
<h4>5. Action d'influence</h4>
<p>Créatrice nantaise qualifiée (audience majoritairement en Loire-Atlantique d'après les statistiques transmises), convention écrite même sous le seuil réglementaire, mention « Collaboration commerciale » visible dans le Reel et chaque Story, aucun produit interdit, droits de réutilisation négociés, code GALETTE10 et lien UTM dédiés.</p>
<h4>6. Indicateurs et UTM</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Objectif</th><th>Indicateurs</th><th>Source</th><th>Cible à 6 mois (exemple)</th></tr>
<tr><td>O1</td><td>Clics vers la page de commande, sessions et commandes attribuées aux réseaux (UTM), coût par commande des campagnes</td><td>Statistiques natives, GA4, module de commande</td><td>Au moins 36 des 120 commandes mensuelles (30 %) issues des réseaux au 6e mois ; coût par commande payante inférieur à 4 €</td></tr>
<tr><td>O2</td><td>Invitations acceptées, conversations, rendez-vous, demandes de devis, signatures, coût par devis</td><td>Tableur social selling, CRM simple</td><td>Au moins 8 des 25 devis mensuels issus de LinkedIn dès le 4e mois ; coût par devis inférieur ou égal à 88 € ; CAC inférieur ou égal à 220 €</td></tr>
<tr><td>O3</td><td>Nombre d'avis, note moyenne, taux et délai de réponse</td><td>Fiche Google, Meta Business Suite</td><td>Environ 7 à 8 nouveaux avis par mois pour atteindre 300 à 12 mois ; note supérieure ou égale à 4,6 ; 100 % de réponses</td></tr>
<tr><td>Transverse</td><td>Couverture, taux d'engagement (formule sur la couverture), abonnés</td><td>Statistiques natives</td><td>Engagement moyen des Reels supérieur ou égal à 5 %</td></tr>
</table>
<p>Plan de marquage : utm_source = instagram | facebook | linkedin | whatsapp | influence ; utm_medium = social | paid_social ; utm_campaign = galettes_2027, paques_2027, traiteur_s1_2027, etc. ; utm_content = bio | reel_nomdusujet | story | carrousel. Fichier de référence partagé.</p>
<h3>Critères d'évaluation du cas</h3>
<ul>
<li>Chaque action est reliée à un objectif (O1, O2 ou O3).</li>
<li>Le choix des réseaux est argumenté (cible, objectif, ressources).</li>
<li>Le budget est réparti et totalisé, le temps humain est estimé.</li>
<li>Les obligations légales (influence, jeux-concours, droit à l'image, RGPD) sont prises en compte.</li>
<li>Les indicateurs sont mesurables et la source de chaque donnée est précisée.</li>
</ul>
<blockquote><strong>À retenir</strong> – Ce cas pratique est le modèle de la partie C5 de votre dossier projet de fin de formation : choix argumenté, ligne éditoriale, plan daté et budgété, modération, influence conforme, indicateurs reliés aux objectifs.</blockquote>`,
      },
    ],
  },
  {
    title: "Chapitre 7 – C6 Élaborer un dispositif de pilotage",
    description:
      "1 h – Mesurer l'audience et les résultats des actions webmarketing (GA4, Search Console, statistiques des réseaux, emailing), choisir des KPI par objectif et par étape du tunnel, calculer coût d'acquisition, ROI, ROAS et taux de conversion, construire un tableau de bord et organiser une revue mensuelle avec plan d'amélioration. Compétence C6 du programme.",
    sections: [
      {
        title: "7.1 – Pourquoi un dispositif de pilotage : mesurer pour décider",
        content: `<h3>Mesurer n'est pas collectionner des chiffres</h3>
<p>Un dispositif de pilotage est l'ensemble organisé des <strong>outils de mesure</strong>, des <strong>indicateurs</strong>, du <strong>tableau de bord</strong> et des <strong>rituels de décision</strong> qui permettent de savoir si les actions webmarketing atteignent les objectifs fixés, et de les ajuster. Sa finalité n'est pas de produire un rapport, mais de répondre régulièrement à trois questions :</p>
<ol>
<li><strong>Où en sommes-nous</strong> par rapport aux objectifs (C1) ?</li>
<li><strong>Qu'est-ce qui fonctionne et qu'est-ce qui ne fonctionne pas</strong>, et pourquoi ?</li>
<li><strong>Que décidons-nous</strong> pour le mois suivant (continuer, arrêter, renforcer, tester) ?</li>
</ol>
<h3>Les quatre couches du dispositif</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Couche</th><th>Contenu</th><th>Exemple Maison Lenoir</th></tr>
<tr><td>1. Collecte</td><td>Outils qui enregistrent les données</td><td>GA4 sur le site, Search Console, Meta Business Suite, statistiques LinkedIn, outil d'emailing, module de click &amp; collect, tableur de suivi B2B</td></tr>
<tr><td>2. Indicateurs</td><td>Sélection des mesures utiles, avec formule et cible</td><td>Commandes click &amp; collect par semaine, taux de conversion de la page de commande, coût par commande, demandes de devis traiteur</td></tr>
<tr><td>3. Restitution</td><td>Tableau de bord lisible</td><td>Une page Looker Studio ou un onglet de tableur, mis à jour chaque mois</td></tr>
<tr><td>4. Décision</td><td>Revue périodique et plan d'amélioration</td><td>Revue mensuelle de 45 minutes, premier lundi du mois, entre Claire et Léa</td></tr>
</table>
<h3>Les conditions de fiabilité</h3>
<ul>
<li><strong>Des objectifs chiffrés au départ</strong> : on ne peut pas piloter « plus de visibilité ».</li>
<li><strong>Un point de référence</strong> (situation initiale) : sans chiffre de départ, aucune progression n'est démontrable.</li>
<li><strong>Un marquage propre</strong> : événements GA4 configurés, liens UTM systématiques, consentement géré.</li>
<li><strong>Des définitions stables</strong> : une même formule de calcul d'un mois sur l'autre.</li>
<li><strong>Un responsable</strong> : une personne nommée met à jour le tableau de bord.</li>
</ul>
<blockquote><strong>À retenir</strong> – Le pilotage relie des données à des décisions : collecte, indicateurs, restitution, décision. Sans objectifs chiffrés, point de départ et responsable, le meilleur outil ne produit que des chiffres.</blockquote>`,
      },
      {
        title: "7.2 – Google Analytics 4 : événements, événements clés, sources de trafic et Consent Mode v2",
        content: `<h3>GA4, l'outil de référence gratuit</h3>
<p>Universal Analytics, l'ancienne version de Google Analytics, a cessé de collecter des données en 2023 puis ses propriétés ont été supprimées. L'outil actuel est <strong>Google Analytics 4 (GA4)</strong>. Son modèle repose entièrement sur des <strong>événements</strong> : chaque interaction (page vue, défilement, clic, envoi de formulaire, achat) est un événement assorti de paramètres.</p>
<h3>Les types d'événements</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type</th><th>Principe</th><th>Exemples</th></tr>
<tr><td>Collectés automatiquement</td><td>Enregistrés dès l'installation de la balise</td><td>first_visit, session_start, page_view (selon configuration)</td></tr>
<tr><td>Mesures améliorées</td><td>Activables dans les paramètres du flux de données</td><td>scroll, click (liens sortants), file_download, form_start, form_submit, video_start</td></tr>
<tr><td>Recommandés</td><td>Noms et paramètres proposés par Google pour des cas courants</td><td>generate_lead, sign_up, begin_checkout, purchase (avec value et currency)</td></tr>
<tr><td>Personnalisés</td><td>Créés pour un besoin spécifique</td><td>clic_telephone, telechargement_plaquette_traiteur</td></tr>
</table>
<h3>Les événements clés (anciennement « conversions »)</h3>
<p>Depuis 2024, GA4 appelle <strong>événements clés</strong> les événements qui comptent pour l'entreprise ; le terme « conversion » est réservé à leur usage dans Google Ads. On marque un événement comme clé dans l'administration de la propriété, rubrique d'affichage des données (le chemin exact peut évoluer).</p>
<p>Pour Maison Lenoir, trois événements clés sont retenus :</p>
<ul>
<li><strong>purchase</strong> : commande click &amp; collect validée (avec montant), transmise par le module de commande ou via Google Tag Manager ;</li>
<li><strong>generate_lead</strong> : envoi du formulaire de demande de devis traiteur ;</li>
<li><strong>clic_telephone</strong> : clic sur le numéro depuis mobile (appel pour commande traiteur).</li>
</ul>
<h3>Les sources de trafic</h3>
<p>GA4 classe les sessions dans des <strong>groupes de canaux par défaut</strong> (Organic Search, Paid Search, Direct, Referral, Organic Social, Paid Social, Email, etc.) à partir de la source et du support. D'où l'importance des UTM (chapitre 6.10) : un lien Instagram sans UTM ouvert depuis l'application peut être mal attribué. Rapports utiles :</p>
<ul>
<li><em>Acquisition &gt; Acquisition de trafic</em> : sessions par canal, source/support, campagne, avec événements clés et taux d'événement clé ;</li>
<li><em>Engagement &gt; Pages et écrans</em> : pages les plus vues, temps d'engagement ;</li>
<li><em>Explorations</em> : entonnoirs personnalisés (par exemple : page produit &gt; panier &gt; commande) ;</li>
<li><em>Publicité &gt; Attribution</em> : comparaison des modèles d'attribution (le modèle par défaut est fondé sur les données lorsque le volume le permet).</li>
</ul>
<h3>Paramétrages de base à ne pas oublier</h3>
<ol>
<li>Fuseau horaire et devise (Europe/Paris, EUR).</li>
<li>Durée de conservation des données des explorations : 2 mois par défaut, passer à 14 mois (maximum de la version gratuite).</li>
<li>Exclusion du trafic interne (adresse IP de la boutique) et déclaration des domaines de paiement comme référents indésirables si le paiement passe par un site tiers.</li>
<li>Association avec la Search Console et, si utilisé, Google Ads.</li>
<li>Vérification en temps réel (rapport « Temps réel » et mode DebugView) après chaque modification.</li>
</ol>
<h3>Consentement et Consent Mode v2</h3>
<p>En France, le dépôt de traceurs non strictement nécessaires (mesure d'audience non exemptée, publicité) suppose le <strong>consentement préalable</strong> de l'internaute, recueilli par un bandeau conforme aux recommandations de la CNIL (accepter et refuser aussi simples l'un que l'autre). Certains outils de mesure d'audience peuvent être exemptés de consentement s'ils sont configurés selon les conditions fixées par la CNIL ; GA4, dans sa configuration standard, ne relève pas de cette exemption.</p>
<p>Le <strong>Consent Mode v2</strong> de Google transmet aux balises Google l'état du consentement via quatre paramètres : <strong>ad_storage</strong>, <strong>analytics_storage</strong>, <strong>ad_user_data</strong> et <strong>ad_personalization</strong> (ces deux derniers ajoutés en 2024). Google l'exige pour utiliser certaines fonctions publicitaires et de mesure avec des utilisateurs de l'Espace économique européen. Deux modes :</p>
<ul>
<li><strong>Basique</strong> : les balises ne se chargent pas tant que l'utilisateur n'a pas consenti ;</li>
<li><strong>Avancé</strong> : les balises se chargent et envoient, en l'absence de consentement, des signaux sans cookie qui permettent à Google une modélisation statistique des comportements non observés.</li>
</ul>
<p>Conséquence pratique : <strong>GA4 ne voit pas tous les visiteurs</strong>. Les chiffres doivent être lus comme des tendances, et les ventes réelles se vérifient dans le module de commande. Utilisez une plateforme de gestion du consentement (CMP) compatible avec le Consent Mode v2 et vérifiez son paramétrage.</p>
<h3>Erreurs fréquentes</h3>
<ul>
<li>Installer GA4 sans définir d'événement clé : on mesure des visites, pas des résultats.</li>
<li>Comparer les chiffres GA4 et les ventes réelles sans tenir compte du consentement refusé et des bloqueurs.</li>
<li>Oublier d'allonger la durée de conservation des données.</li>
<li>Laisser le trafic interne fausser les petites audiences.</li>
</ul>
<blockquote><strong>À retenir</strong> – GA4 mesure des événements ; ceux qui comptent sont marqués comme événements clés. Les sources de trafic se lisent par canal et par UTM. Le consentement (Consent Mode v2, CMP conforme CNIL) conditionne la collecte : GA4 donne des tendances, le module de vente donne les chiffres réels.</blockquote>`,
      },
      {
        title: "7.3 – Search Console, statistiques des réseaux et emailing",
        content: `<h3>Google Search Console : la visibilité dans le moteur</h3>
<p>La Search Console, gratuite, montre comment Google voit le site. Elle complète GA4 : GA4 mesure ce que font les visiteurs <em>sur</em> le site ; la Search Console mesure ce qui se passe <em>avant</em> le clic, dans les résultats de recherche.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rapport</th><th>Indicateurs</th><th>Usage pour Maison Lenoir</th></tr>
<tr><td>Performances (résultats de recherche)</td><td>Clics, impressions, CTR moyen, position moyenne, par requête et par page</td><td>Suivre « boulangerie nantes », « traiteur petit déjeuner entreprise nantes », « galette des rois nantes »</td></tr>
<tr><td>Indexation des pages</td><td>Pages indexées et non indexées, avec motifs</td><td>Vérifier que la page traiteur est indexée</td></tr>
<tr><td>Signaux Web essentiels (Core Web Vitals)</td><td>LCP, INP, CLS sur données réelles d'usage, si le trafic est suffisant</td><td>Contrôler la vitesse sur mobile de la page de commande</td></tr>
<tr><td>Sitemaps</td><td>Soumission et état du plan du site</td><td>Soumettre le sitemap après une refonte</td></tr>
</table>
<p>Lecture type : si les impressions augmentent mais que le CTR baisse, le titre ou la méta-description ne donnent pas envie de cliquer ; si la position s'améliore mais pas les clics, la requête a peu de volume.</p>
<h3>Statistiques des réseaux sociaux</h3>
<p>Reprenez les indicateurs du chapitre 6.10 et sélectionnez-en peu : couverture, taux d'engagement (formule constante), clics sur lien, abonnés gagnés, messages reçus, délai de réponse. Exportez-les chaque mois (Meta Business Suite et LinkedIn permettent des exports) ou recopiez-les dans le tableur : l'historique disponible dans les outils natifs est limité, d'où l'intérêt de l'archivage mensuel.</p>
<h3>Emailing</h3>
<p>Pour la newsletter mensuelle de Maison Lenoir (envoyée aux clients ayant donné leur accord lors de la création de leur compte de commande) et les relances B2B, les indicateurs utiles sont :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Formule</th><th>Remarque</th></tr>
<tr><td>Taux de délivrabilité</td><td>E-mails délivrés ÷ e-mails envoyés</td><td>Une baisse signale une base mal entretenue ou un problème d'authentification du domaine (SPF, DKIM, DMARC)</td></tr>
<tr><td>Taux d'ouverture</td><td>Ouvertures uniques ÷ délivrés</td><td>Indicateur peu fiable depuis les protections de confidentialité de certaines messageries (notamment Apple Mail Privacy Protection, introduite en 2021), qui peuvent gonfler les ouvertures</td></tr>
<tr><td>Taux de clic</td><td>Cliqueurs uniques ÷ délivrés</td><td>Indicateur principal d'intérêt</td></tr>
<tr><td>Taux de réactivité</td><td>Cliqueurs uniques ÷ ouvreurs uniques</td><td>Qualité du contenu une fois l'e-mail ouvert</td></tr>
<tr><td>Taux de désinscription</td><td>Désinscrits ÷ délivrés</td><td>Une hausse signale une fréquence ou un ciblage inadaptés</td></tr>
<tr><td>Commandes attribuées</td><td>Événements clés GA4 avec utm_medium=email</td><td>Lien direct avec l'objectif de vente</td></tr>
</table>
<p>Exemple (hypothèses) : newsletter de décembre envoyée à 820 contacts, 806 délivrés, 97 cliqueurs uniques (taux de clic 12 %), 4 désinscriptions (0,5 %), 31 précommandes de bûches attribuées via UTM.</p>
<h3>Autres sources à ne pas oublier</h3>
<ul>
<li><strong>Fiche d'établissement Google</strong> : vues, demandes d'itinéraire, appels, clics vers le site.</li>
<li><strong>Module de click &amp; collect</strong> : nombre de commandes, panier moyen, clients récurrents – c'est la source de vérité des ventes.</li>
<li><strong>Tableur de suivi B2B</strong> : demandes de devis, devis envoyés, signés, chiffre d'affaires.</li>
</ul>
<blockquote><strong>À retenir</strong> – Search Console pour la visibilité avant le clic, GA4 pour le comportement après le clic, statistiques natives pour les réseaux, outil d'emailing pour les campagnes, outil de vente pour les résultats réels. Le taux de clic est plus fiable que le taux d'ouverture.</blockquote>`,
      },
      {
        title: "7.4 – Choisir ses KPI par objectif et par étape du tunnel",
        content: `<h3>Indicateur ou KPI ?</h3>
<p>Un <strong>indicateur</strong> est une mesure. Un <strong>KPI</strong> (indicateur clé de performance) est un indicateur retenu parce qu'il dit si un objectif est atteint. Un tableau de bord de TPE contient en général 8 à 12 KPI, pas davantage.</p>
<h3>Le tunnel de conversion comme grille de lecture</h3>
<p>On classe les KPI selon l'étape du parcours client. Le modèle ci-dessous, inspiré de modèles largement diffusés (de type « See-Think-Do-Care » ou « AARRR »), est adapté à Maison Lenoir :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Question</th><th>KPI click &amp; collect</th><th>KPI traiteur B2B</th></tr>
<tr><td>Visibilité</td><td>Nous voit-on ?</td><td>Couverture des réseaux, impressions Search Console, vues de la fiche Google</td><td>Impressions LinkedIn, vues du profil de Claire</td></tr>
<tr><td>Intérêt</td><td>S'intéresse-t-on à nous ?</td><td>Taux d'engagement, sessions sur le site, sessions engagées</td><td>Visites de la page traiteur, invitations acceptées</td></tr>
<tr><td>Conversion</td><td>Passe-t-on à l'action ?</td><td>Commandes, taux de conversion de la page de commande, panier moyen</td><td>Demandes de devis, taux de transformation devis → commande</td></tr>
<tr><td>Fidélisation</td><td>Revient-on ?</td><td>Part de clients ayant commandé au moins deux fois, désinscriptions newsletter</td><td>Clients réguliers, fréquence de commande</td></tr>
<tr><td>Recommandation</td><td>Parle-t-on de nous ?</td><td>Note moyenne et nombre d'avis, mentions</td><td>Recommandations LinkedIn, clients apportés par un client</td></tr>
</table>
<h3>Méthode de sélection en cinq questions</h3>
<ol>
<li>Ce KPI est-il <strong>relié à un objectif C1</strong> ?</li>
<li>Peut-on le <strong>mesurer de façon fiable</strong> avec nos outils ?</li>
<li>Peut-on <strong>agir dessus</strong> (si le chiffre baisse, savons-nous quoi faire) ?</li>
<li>A-t-il une <strong>valeur de départ et une cible</strong> datée ?</li>
<li>Est-il <strong>compris</strong> par la personne qui doit décider ?</li>
</ol>
<h3>La fiche indicateur</h3>
<p>Chaque KPI fait l'objet d'une fiche d'une ligne :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>KPI</th><th>Formule</th><th>Source</th><th>Fréquence</th><th>Départ</th><th>Cible</th><th>Responsable</th></tr>
<tr><td>Commandes en ligne / mois</td><td>Nombre de commandes click &amp; collect validées</td><td>Module de commande</td><td>Hebdomadaire et mensuelle</td><td>35</td><td>120 au 6e mois</td><td>Léa</td></tr>
<tr><td>Taux de conversion page commande</td><td>Commandes ÷ sessions ayant vu la page de commande</td><td>GA4 (exploration entonnoir)</td><td>Mensuelle</td><td>2,5 %</td><td>4 %</td><td>Claire</td></tr>
<tr><td>Demandes de devis traiteur / mois</td><td>Événements generate_lead + demandes par téléphone/messagerie</td><td>GA4 + tableur</td><td>Mensuelle</td><td>4</td><td>25 dès le 4e mois</td><td>Claire</td></tr>
<tr><td>Coût par devis</td><td>Coûts des actions B2B (dont temps valorisé) ÷ devis reçus</td><td>Tableur</td><td>Mensuelle</td><td>–</td><td>≤ 88 €</td><td>Claire</td></tr>
<tr><td>CAC traiteur</td><td>Coûts des actions B2B ÷ nouveaux clients</td><td>Tableur</td><td>Trimestrielle</td><td>–</td><td>≤ 220 €</td><td>Claire</td></tr>
<tr><td>CPC des campagnes payantes</td><td>Dépense ÷ clics</td><td>Plateformes publicitaires</td><td>Par campagne</td><td>–</td><td>≤ 3,50 €</td><td>Claire</td></tr>
<tr><td>Coût par commande (campagnes Meta)</td><td>Dépense ÷ commandes attribuées</td><td>Gestionnaire de publicités + GA4</td><td>Par campagne</td><td>–</td><td>&lt; 4 €</td><td>Claire</td></tr>
<tr><td>Avis Google (cumul) et note</td><td>Nombre total d'avis ; moyenne</td><td>Fiche Google</td><td>Mensuelle</td><td>210 ; 4,6</td><td>300 à 12 mois ; ≥ 4,6</td><td>Léa</td></tr>
</table>
<p>Les valeurs de départ et cibles sont des hypothèses de l'exemple pédagogique.</p>
<h3>Erreurs fréquentes</h3>
<ul>
<li>Piloter avec des indicateurs de vanité (abonnés, « j'aime ») déconnectés du chiffre d'affaires.</li>
<li>Choisir 40 indicateurs : plus personne ne lit le tableau.</li>
<li>Ne suivre que la conversion : on ne comprend pas où le tunnel fuit.</li>
<li>Changer de formule en cours de route.</li>
</ul>
<blockquote><strong>À retenir</strong> – Un KPI est relié à un objectif, mesurable, actionnable, daté et compris. Le tunnel (visibilité, intérêt, conversion, fidélisation, recommandation) permet de repérer l'étape qui bloque.</blockquote>`,
      },
      {
        title: "7.5 – Coût d'acquisition, ROI, ROAS et taux de conversion",
        content: `<h3>Les formules essentielles</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Formule</th><th>Interprétation</th></tr>
<tr><td>Taux de conversion</td><td>Nombre de conversions ÷ nombre de visites (ou de sessions, de clics) × 100</td><td>Efficacité d'une page ou d'un parcours ; toujours préciser le dénominateur</td></tr>
<tr><td>Coût par clic (CPC)</td><td>Dépense publicitaire ÷ clics</td><td>Coût du trafic</td></tr>
<tr><td>Coût par lead (CPL)</td><td>Dépense ÷ nombre de prospects (demandes de devis)</td><td>Coût d'un contact qualifié</td></tr>
<tr><td>Coût d'acquisition client (CAC)</td><td>Coûts marketing et commerciaux de la période (dépenses + temps valorisé + outils) ÷ nouveaux clients acquis</td><td>Ce que coûte un nouveau client</td></tr>
<tr><td>ROAS</td><td>Chiffre d'affaires attribué à la publicité ÷ dépense publicitaire</td><td>Rendement brut d'une campagne ; un ROAS de 4 signifie 4 € de CA pour 1 € dépensé</td></tr>
<tr><td>ROI</td><td>(Marge générée − coût de l'action) ÷ coût de l'action × 100</td><td>Rentabilité réelle ; se calcule sur la marge, pas sur le CA</td></tr>
<tr><td>Valeur vie client (CLV, simplifiée)</td><td>Panier moyen × fréquence d'achat annuelle × durée de relation estimée × taux de marge</td><td>Plafond raisonnable du coût d'acquisition</td></tr>
</table>
<h3>Exemple chiffré 1 : campagne Meta « bûches » (hypothèses)</h3>
<ul>
<li>Dépense : 300 € ; clics sur le lien : 1 250 ; CPC = 300 ÷ 1 250 = 0,24 €.</li>
<li>Sessions sur la page de commande issues de la campagne (GA4, UTM) : 1 040 ; commandes attribuées : 62 ; taux de conversion = 62 ÷ 1 040 × 100 ≈ 6 %.</li>
<li>Panier moyen : 36 € HT (le taux de TVA applicable dépend des produits et du mode de vente : à vérifier avec l'expert-comptable) ; CA HT attribué ≈ 62 × 36 = 2 232 €.</li>
<li>ROAS = 2 232 ÷ 300 ≈ 7,4.</li>
<li>Marge sur coût des matières supposée de 65 % : marge ≈ 1 451 €. ROI = (1 451 − 300) ÷ 300 × 100 ≈ 384 %.</li>
<li>Coût par commande = 300 ÷ 62 ≈ 4,84 € : au-dessus de la cible de 4 €, mais acceptable vu le panier élevé des bûches. Décision : reconduire en ciblant aussi les clients existants (audience personnalisée).</li>
</ul>
<p><strong>Limite</strong> : une partie de ces clients aurait peut-être commandé sans la publicité. L'attribution n'est pas une preuve de causalité ; comparer avec la même période de l'année précédente ou tester une zone sans publicité affine l'analyse.</p>
<h3>Exemple chiffré 2 : coût d'acquisition d'un client traiteur (hypothèses)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Poste (sur 6 mois)</th><th>Montant</th></tr>
<tr><td>LinkedIn Ads</td><td>450 €</td></tr>
<tr><td>Temps de Claire sur LinkedIn et le social selling : 2 h × 26 semaines = 52 h valorisées à 35 € de coût horaire</td><td>1 820 €</td></tr>
<tr><td>Dégustations offertes (matières + temps)</td><td>280 €</td></tr>
<tr><td>Impression de plaquettes</td><td>90 €</td></tr>
<tr><td><strong>Total</strong></td><td><strong>2 640 €</strong></td></tr>
</table>
<p>Résultats du semestre attribués à ces actions : 30 demandes de devis et 12 nouveaux clients réguliers.</p>
<ul>
<li>Coût par devis = 2 640 ÷ 30 = 88 € : exactement le repère maximal fixé dans la stratégie (environ 88 €). Aucune marge de manœuvre : la moindre dérive doit déclencher une action.</li>
<li>CAC = 2 640 ÷ 12 = 220 € : également au plafond (environ 220 €).</li>
<li>Taux de transformation devis → client = 12 ÷ 30 = 40 % ; c'est cette hypothèse qui relie les deux repères (88 € ÷ 40 % = 220 €).</li>
<li>Chiffre d'affaires annuel moyen par client : 3 600 € HT ; marge supposée de 55 % : 1 980 € par an, soit 165 € par mois. Le coût d'acquisition est couvert en moins de deux mois de relation (220 ÷ 165 ≈ 1,3).</li>
</ul>
<p>Observation importante : sans valoriser le temps de Claire, le CAC apparaîtrait à 68 € ((450 + 280 + 90) ÷ 12). Le temps humain est souvent le premier coût d'une TPE : l'ignorer fausse les décisions.</p>
<h3>Exemple 3 : diagnostic par le taux de conversion</h3>
<p>En mars, les sessions sur la page de commande augmentent de 40 % mais les commandes de 5 % seulement : le taux de conversion chute de 3,1 % à 2,3 %. Exploration GA4 en entonnoir : forte sortie à l'étape « choix du créneau de retrait ». Cause trouvée : créneaux du dimanche complets dès le jeudi. Action : ouverture de créneaux supplémentaires et affichage du prochain créneau disponible. Le pilotage a permis de détecter un problème opérationnel, pas marketing.</p>
<blockquote><strong>À retenir</strong> – ROAS = CA ÷ dépense publicitaire ; ROI = (marge − coût) ÷ coût. Le CAC inclut le temps humain valorisé et se compare à la valeur du client. Précisez toujours le dénominateur d'un taux de conversion et gardez en tête les limites de l'attribution.</blockquote>`,
      },
      {
        title: "7.6 – Construire le tableau de bord : Looker Studio ou tableur",
        content: `<h3>Les principes d'un bon tableau de bord</h3>
<ul>
<li><strong>Une page</strong> lisible en deux minutes, avec le détail accessible en dessous ou dans des onglets.</li>
<li><strong>Organisé par objectif</strong> (O1 click &amp; collect, O2 traiteur B2B, O3 réputation), puis par étape du tunnel.</li>
<li><strong>Comparaisons</strong> : valeur du mois, mois précédent, cible, même mois l'année précédente si disponible.</li>
<li><strong>Codes visuels sobres</strong> : une mention « atteint / en retard / alerte » plutôt qu'une multitude de couleurs.</li>
<li><strong>Commentaire</strong> : trois lignes d'analyse et les décisions prises.</li>
</ul>
<h3>Option 1 : Looker Studio</h3>
<p>Looker Studio (anciennement Data Studio) est l'outil gratuit de Google pour créer des rapports à partir de sources de données. Il dispose de connecteurs Google pour GA4, Search Console, Google Ads et Google Sheets ; d'autres sources (Meta, LinkedIn) passent par des connecteurs partenaires, souvent payants, ou par un Google Sheets alimenté manuellement.</p>
<ol>
<li>Créer un rapport et ajouter la source GA4 de la propriété du site.</li>
<li>Ajouter la source Search Console (données d'impressions par site ou par URL).</li>
<li>Créer un Google Sheets « Données manuelles » (commandes réelles, réseaux sociaux, B2B, avis) et l'ajouter comme source.</li>
<li>Insérer des fiches de score (scorecards) avec comparaison à la période précédente.</li>
<li>Ajouter une courbe hebdomadaire des commandes et un tableau des sessions par canal avec les événements clés.</li>
<li>Ajouter un sélecteur de période et partager le rapport en lecture à Claire et Léa.</li>
</ol>
<h3>Option 2 : le tableur</h3>
<p>Pour une TPE, un tableur bien structuré suffit souvent. Structure recommandée :</p>
<ul>
<li>Onglet <strong>Saisie</strong> : une ligne par mois, une colonne par indicateur brut (sessions, commandes, dépenses, etc.).</li>
<li>Onglet <strong>Calculs</strong> : taux, coûts unitaires, ROAS, évolutions.</li>
<li>Onglet <strong>Tableau de bord</strong> : synthèse, graphiques, commentaire.</li>
<li>Onglet <strong>Définitions</strong> : formule, source et responsable de chaque indicateur.</li>
</ul>
<h3>Exemple de tableau de bord mensuel (avril, hypothèses)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Objectif</th><th>KPI</th><th>Mars</th><th>Avril</th><th>Cible</th><th>Statut</th></tr>
<tr><td>O1</td><td>Commandes en ligne / mois</td><td>62</td><td>81</td><td>120 au 6e mois (juin)</td><td>En progrès, à accélérer</td></tr>
<tr><td>O1</td><td>Taux de conversion page commande</td><td>2,3 %</td><td>3,4 %</td><td>4 %</td><td>En progrès</td></tr>
<tr><td>O1</td><td>Part des commandes issues des réseaux (UTM)</td><td>24 %</td><td>29 %</td><td>30 %</td><td>Presque atteint</td></tr>
<tr><td>O1</td><td>Coût par commande Meta</td><td>–</td><td>4,10 €</td><td>&lt; 4 €</td><td>Légèrement au-dessus</td></tr>
<tr><td>O2</td><td>Demandes de devis traiteur / mois</td><td>14</td><td>19</td><td>25 dès le 4e mois (avril)</td><td>En retard</td></tr>
<tr><td>O2</td><td>Coût par devis</td><td>97 €</td><td>92 €</td><td>≤ 88 €</td><td>Au-dessus du repère</td></tr>
<tr><td>O2</td><td>CPC des campagnes payantes (moteurs et LinkedIn)</td><td>3,30 €</td><td>3,10 €</td><td>≤ 3,50 €</td><td>Conforme</td></tr>
<tr><td>O3</td><td>Avis Google (cumul) ; note</td><td>228 ; 4,6</td><td>237 ; 4,6</td><td>300 à 12 mois ; ≥ 4,6</td><td>Légèrement sous la trajectoire (240 attendus, 7,5 avis/mois)</td></tr>
<tr><td>Budget</td><td>Dépenses cumulées / budget an 1 (19 200 € HT)</td><td>4 950 €</td><td>6 700 €</td><td>6 400 € au prorata de 4 mois</td><td>Léger dépassement</td></tr>
<tr><td>Transverse</td><td>Taux d'engagement moyen Reels</td><td>5,8 %</td><td>6,4 %</td><td>≥ 5 %</td><td>Atteint</td></tr>
</table>
<p><em>Commentaire d'avril</em> : la correction des créneaux de retrait a relevé le taux de conversion, mais il faudra environ 20 commandes supplémentaires par mois en mai et juin pour atteindre 120. Le B2B progresse mais reste sous les 25 devis attendus dès ce 4e mois, avec un coût par devis supérieur au repère de 88 € : les demandes viennent surtout du social selling, pas de la publicité LinkedIn (1 demande pour 450 €). Décisions : ne pas reconduire LinkedIn Ads au trimestre suivant, renforcer les dégustations auprès des prospects chauds, et réallouer l'enveloppe pour revenir dans la trajectoire du budget annuel.</p>
<blockquote><strong>À retenir</strong> – Un tableau de bord tient sur une page, s'organise par objectif, compare au mois précédent et à la cible, et se termine par un commentaire et des décisions. Looker Studio automatise les sources Google ; un tableur structuré suffit souvent pour démarrer.</blockquote>`,
      },
      {
        title: "7.7 – Ressources mobilisées et résultats, revue mensuelle et plan d'amélioration",
        content: `<h3>Mettre en correspondance ressources et résultats</h3>
<p>Le pilotage ne regarde pas seulement les résultats : il les rapporte aux <strong>ressources consommées</strong> (temps, budget, outils, prestataires). C'est ce qui permet d'arbitrer entre les actions.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Action (trimestre, hypothèses)</th><th>Temps interne</th><th>Coût du temps (35 €/h)</th><th>Budget externe</th><th>Coût total</th><th>Résultat</th><th>Coût par résultat</th></tr>
<tr><td>Reels et Stories (organique)</td><td>40 h</td><td>1 400 €</td><td>0 €</td><td>1 400 €</td><td>78 commandes attribuées</td><td>17,9 € / commande</td></tr>
<tr><td>Campagnes Meta</td><td>6 h</td><td>210 €</td><td>650 €</td><td>860 €</td><td>164 commandes attribuées</td><td>5,2 € / commande</td></tr>
<tr><td>Newsletter mensuelle</td><td>6 h</td><td>210 €</td><td>45 € (outil)</td><td>255 €</td><td>71 commandes attribuées</td><td>3,6 € / commande</td></tr>
<tr><td>Social selling LinkedIn</td><td>26 h</td><td>910 €</td><td>0 €</td><td>910 €</td><td>9 demandes de devis</td><td>101 € / demande</td></tr>
<tr><td>LinkedIn Ads</td><td>4 h</td><td>140 €</td><td>450 €</td><td>590 €</td><td>1 demande de devis</td><td>590 € / demande</td></tr>
</table>
<p>Lecture : l'organique coûte cher en temps par commande directe, mais il nourrit aussi la notoriété et les audiences utilisées par la publicité ; on ne le supprime pas, on le rationalise (tournages groupés). La newsletter est l'action la plus efficiente : on la renforce (deux envois par mois en période de fêtes). LinkedIn Ads est arrêté au profit du social selling. Comparés au repère de coût par devis (environ 88 €), le social selling (101 €) est à optimiser et LinkedIn Ads (590 €) est hors de toute rentabilité.</p>
<h3>La revue mensuelle : déroulé en 45 minutes</h3>
<ol>
<li><strong>5 min</strong> – Mise à jour vérifiée du tableau de bord (préparée la veille par le responsable).</li>
<li><strong>10 min</strong> – Lecture des KPI par objectif : écarts à la cible.</li>
<li><strong>15 min</strong> – Analyse des causes des deux plus grands écarts (positifs ou négatifs) : qu'est-ce qui explique ce chiffre ?</li>
<li><strong>10 min</strong> – Décisions : continuer, arrêter, renforcer, tester. Une décision = un responsable + une échéance.</li>
<li><strong>5 min</strong> – Mise à jour du plan d'amélioration et du calendrier éditorial.</li>
</ol>
<h3>Le plan d'amélioration</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Constat</th><th>Cause identifiée</th><th>Action</th><th>Responsable</th><th>Échéance</th><th>Indicateur de vérification</th></tr>
<tr><td>Abandons à l'étape « créneau »</td><td>Créneaux du dimanche saturés</td><td>Ajouter 2 créneaux et afficher le prochain disponible</td><td>Claire</td><td>15 mars</td><td>Taux de conversion page commande</td></tr>
<tr><td>LinkedIn Ads : 1 demande pour 450 €</td><td>Audience trop large, offre peu différenciée</td><td>Arrêt ; réaffectation du budget aux dégustations</td><td>Claire</td><td>1er avril</td><td>Demandes de devis / mois</td></tr>
<tr><td>Stories peu vues le week-end</td><td>Publication trop tôt le matin</td><td>Test de publication à 11 h pendant 4 semaines</td><td>Léa</td><td>30 avril</td><td>Vues moyennes des Stories</td></tr>
</table>
<h3>Les tests : une démarche simple</h3>
<p>Changer une seule variable à la fois (heure, accroche, visuel, offre), sur une durée définie, avec un indicateur décidé à l'avance. Noter le résultat même s'il est négatif : un test raté évite de refaire la même erreur.</p>
<blockquote><strong>À retenir</strong> – Rapporter chaque résultat aux ressources consommées (temps valorisé + budget) permet d'arbitrer. La revue mensuelle de 45 minutes transforme le tableau de bord en décisions, consignées dans un plan d'amélioration avec responsable, échéance et indicateur de vérification.</blockquote>`,
      },
      {
        title: "7.8 – Quiz de fin de chapitre 7",
        content: `<p>Répondez aux dix questions, puis consultez le corrigé.</p>
<h4>Question 1 – Quel outil remplace Universal Analytics ?</h4>
<ul><li>A. Google Tag Manager</li><li>B. Google Analytics 4</li><li>C. Search Console</li><li>D. Looker Studio</li></ul>
<h4>Question 2 – Dans GA4, comment appelle-t-on désormais un événement marqué comme important pour l'entreprise ?</h4>
<ul><li>A. Un objectif</li><li>B. Un événement clé</li><li>C. Une transaction</li><li>D. Un segment</li></ul>
<h4>Question 3 – Le Consent Mode v2 comprend notamment les paramètres :</h4>
<ul><li>A. ad_user_data et ad_personalization, en plus d'ad_storage et analytics_storage</li><li>B. utm_source et utm_medium</li><li>C. page_view et scroll</li><li>D. LCP et CLS</li></ul>
<h4>Question 4 – Quel outil indique le nombre d'impressions et la position moyenne d'une page dans les résultats Google ?</h4>
<ul><li>A. GA4</li><li>B. Meta Business Suite</li><li>C. Google Search Console</li><li>D. L'outil d'emailing</li></ul>
<h4>Question 5 – Une campagne coûte 400 € et génère 2 000 € de chiffre d'affaires attribué. Le ROAS est de :</h4>
<ul><li>A. 0,2</li><li>B. 5</li><li>C. 400 %</li><li>D. 1 600 €</li></ul>
<h4>Question 6 – Même campagne, marge de 60 % sur le CA. Le ROI est de :</h4>
<ul><li>A. 500 %</li><li>B. 300 %</li><li>C. 200 %</li><li>D. 60 %</li></ul>
<h4>Question 7 – Pourquoi le taux d'ouverture des e-mails doit-il être interprété avec prudence ?</h4>
<ul><li>A. Parce qu'il n'est plus calculé par aucun outil</li><li>B. Parce que certaines protections de confidentialité des messageries peuvent fausser la mesure des ouvertures</li><li>C. Parce qu'il est interdit par le RGPD</li><li>D. Parce qu'il est toujours égal au taux de clic</li></ul>
<h4>Question 8 – Pour calculer un coût d'acquisition client réaliste dans une TPE, il faut :</h4>
<ul><li>A. Ne compter que les dépenses publicitaires</li><li>B. Inclure aussi le temps interne valorisé et les outils</li><li>C. Diviser le CA par le nombre de clients</li><li>D. Utiliser le nombre d'abonnés</li></ul>
<h4>Question 9 – Quel indicateur est un « indicateur de vanité » s'il est suivi seul ?</h4>
<ul><li>A. Le nombre de commandes</li><li>B. Le coût par demande de devis</li><li>C. Le nombre d'abonnés</li><li>D. Le taux de conversion de la page de commande</li></ul>
<h4>Question 10 – Lors de la revue mensuelle, une décision bien formulée comporte :</h4>
<ul><li>A. Un constat uniquement</li><li>B. Une action, un responsable, une échéance et un indicateur de vérification</li><li>C. Un nouveau logo</li><li>D. Le changement de tous les indicateurs</li></ul>
<h3>Corrigé et explications</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>B</td><td>Universal Analytics a cessé de collecter les données en 2023 ; GA4 est l'outil actuel. Tag Manager est un gestionnaire de balises, Looker Studio un outil de restitution.</td></tr>
<tr><td>2</td><td>B</td><td>Depuis 2024, GA4 parle d'« événements clés » ; « conversion » est réservé à Google Ads.</td></tr>
<tr><td>3</td><td>A</td><td>Les quatre paramètres de consentement sont ad_storage, analytics_storage, ad_user_data et ad_personalization.</td></tr>
<tr><td>4</td><td>C</td><td>La Search Console mesure la présence dans les résultats de recherche (avant le clic).</td></tr>
<tr><td>5</td><td>B</td><td>ROAS = 2 000 ÷ 400 = 5 (5 € de CA pour 1 € dépensé).</td></tr>
<tr><td>6</td><td>C</td><td>Marge = 2 000 × 60 % = 1 200 € ; ROI = (1 200 − 400) ÷ 400 × 100 = 200 %.</td></tr>
<tr><td>7</td><td>B</td><td>Des dispositifs comme Apple Mail Privacy Protection préchargent les contenus et peuvent gonfler les ouvertures ; le taux de clic est plus fiable.</td></tr>
<tr><td>8</td><td>B</td><td>Le temps du dirigeant et des salariés est souvent le premier coût ; l'omettre sous-estime fortement le CAC.</td></tr>
<tr><td>9</td><td>C</td><td>Le nombre d'abonnés ne dit rien du chiffre d'affaires s'il n'est pas relié à des indicateurs de conversion.</td></tr>
<tr><td>10</td><td>B</td><td>Une décision n'existe que si elle est attribuée, datée et vérifiable.</td></tr>
</table>
<blockquote><strong>À retenir</strong> – Si vous avez moins de 7 bonnes réponses, reprenez les sections 7.2 (GA4 et consentement) et 7.5 (formules).</blockquote>`,
      },
      {
        title: "7.9 – Cas pratique : définir les indicateurs de performance de Maison Lenoir",
        content: `<h3>Consigne</h3>
<p>À partir des objectifs O1 (120 commandes en ligne par mois au 6e mois), O2 (25 demandes de devis B2B par mois dès le 4e mois) et O3 (300 avis Google à 12 mois, note ≥ 4,6), du budget de l'an 1 (19 200 € HT), des repères économiques (CAC ≤ 220 €, coût par devis ≤ 88 €, CPC ≤ 3,50 €) et du plan d'action réseaux sociaux du chapitre 6 :</p>
<ol>
<li>Lister les outils de collecte nécessaires et les paramétrages indispensables.</li>
<li>Proposer 8 à 10 KPI répartis par objectif et par étape du tunnel, avec formule, source, fréquence et cible.</li>
<li>Calculer, à partir des données du trimestre ci-dessous, le taux de conversion, le coût par commande, le ROAS et le ROI de la campagne Meta, ainsi que le CAC B2B.</li>
<li>Rédiger le commentaire de la revue trimestrielle et trois actions d'amélioration.</li>
</ol>
<p><strong>Données du trimestre (hypothèses)</strong> : campagne Meta : dépense 650 €, 2 600 clics, 2 150 sessions sur la page de commande, 164 commandes attribuées, panier moyen 26 € HT, marge 65 %. B2B : 450 € LinkedIn Ads (180 clics), 30 h de Claire valorisées à 35 €/h, 280 € de dégustations ; 22 demandes de devis attribuées à ces actions, 8 nouveaux clients réguliers.</p>
<h3>Corrigé détaillé</h3>
<h4>1. Outils et paramétrages</h4>
<ul>
<li>GA4 avec événements clés purchase (avec valeur), generate_lead, clic_telephone ; conservation des données à 14 mois ; trafic interne exclu ; association Search Console.</li>
<li>CMP conforme aux recommandations de la CNIL avec Consent Mode v2 ; vérification que les balises respectent les choix de l'utilisateur.</li>
<li>Plan de marquage UTM documenté (chapitre 6.10).</li>
<li>Search Console vérifiée, sitemap soumis.</li>
<li>Exports mensuels Meta Business Suite et statistiques LinkedIn.</li>
<li>Tableur de suivi B2B (prospect, étape, date, montant).</li>
<li>Extraction mensuelle du module de click &amp; collect (source de vérité des ventes).</li>
</ul>
<h4>2. KPI proposés</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Objectif / étape</th><th>KPI</th><th>Formule</th><th>Source</th><th>Fréquence</th><th>Cible</th></tr>
<tr><td>O1 – Visibilité</td><td>Couverture mensuelle Instagram + Facebook</td><td>Somme des couvertures par plateforme</td><td>Meta Business Suite</td><td>Mensuelle</td><td>+ 30 % en 6 mois</td></tr>
<tr><td>O1 – Intérêt</td><td>Sessions sur la page de commande</td><td>Sessions ayant vu la page</td><td>GA4</td><td>Mensuelle</td><td>2 500 / mois</td></tr>
<tr><td>O1 – Conversion</td><td>Commandes en ligne / mois</td><td>Commandes validées</td><td>Module de commande</td><td>Hebdomadaire et mensuelle</td><td>120 au 6e mois</td></tr>
<tr><td>O1 – Conversion</td><td>Taux de conversion page commande</td><td>Commandes ÷ sessions page commande</td><td>GA4</td><td>Mensuelle</td><td>4 %</td></tr>
<tr><td>O1 – Efficience</td><td>Coût par commande Meta</td><td>Dépense ÷ commandes attribuées</td><td>Ads Manager + GA4</td><td>Par campagne</td><td>&lt; 4 €</td></tr>
<tr><td>O1 – Fidélisation</td><td>Part de clients récurrents</td><td>Clients ≥ 2 commandes ÷ clients du mois</td><td>Module de commande</td><td>Mensuelle</td><td>40 %</td></tr>
<tr><td>O2 – Intérêt</td><td>Conversations engagées LinkedIn</td><td>Nombre</td><td>Tableur B2B</td><td>Mensuelle</td><td>8 / mois</td></tr>
<tr><td>O2 – Conversion</td><td>Demandes de devis</td><td>generate_lead + demandes directes</td><td>GA4 + tableur</td><td>Mensuelle</td><td>25 / mois dès le 4e mois</td></tr>
<tr><td>O2 – Efficience</td><td>Coût par devis et CAC B2B</td><td>Coûts totaux (dont temps) ÷ devis ; ÷ nouveaux clients</td><td>Tableur</td><td>Mensuelle / trimestrielle</td><td>≤ 88 € ; ≤ 220 €</td></tr>
<tr><td>O3 – Recommandation</td><td>Avis Google (cumul), note et taux de réponse</td><td>Total des avis ; moyenne ; avis répondus ÷ avis reçus</td><td>Fiche Google</td><td>Mensuelle</td><td>300 à 12 mois ; ≥ 4,6 ; 100 %</td></tr>
</table>
<h4>3. Calculs</h4>
<ul>
<li>CPC = 650 ÷ 2 600 = 0,25 €.</li>
<li>Taux de conversion de la page de commande (trafic de la campagne) = 164 ÷ 2 150 × 100 ≈ 7,6 %.</li>
<li>Coût par commande = 650 ÷ 164 ≈ 3,96 € : cible de 4 € tout juste atteinte.</li>
<li>CA HT attribué = 164 × 26 = 4 264 € ; ROAS = 4 264 ÷ 650 ≈ 6,6.</li>
<li>Marge = 4 264 × 65 % ≈ 2 772 € ; ROI = (2 772 − 650) ÷ 650 × 100 ≈ 326 %.</li>
<li>Coûts B2B = 450 + 30 × 35 + 280 = 450 + 1 050 + 280 = 1 780 €.</li>
<li>Coût par devis = 1 780 ÷ 22 ≈ 81 € : sous le repère de 88 €.</li>
<li>CAC B2B = 1 780 ÷ 8 = 222,50 € : très légèrement au-dessus du repère d'environ 220 €.</li>
<li>CPC LinkedIn Ads = 450 ÷ 180 = 2,50 € : sous le plafond de 3,50 €.</li>
</ul>
<h4>4. Commentaire de revue et actions</h4>
<blockquote>« Trimestre positif sur O1 : la campagne Meta est rentable (ROAS 6,6, ROI d'environ 326 % sur la marge) et le coût par commande atteint la cible. Le taux de conversion du trafic payant (7,6 %) est supérieur à celui du site dans son ensemble, ce qui confirme la pertinence du ciblage géographique. Sur O2, le coût par devis (81 €) respecte le repère de 88 € mais le CAC (222,50 €) touche le plafond de 220 € : le taux de transformation des devis (8 sur 22, soit 36 %) est le levier à travailler, avant toute hausse de budget. O3 est à suivre mois par mois pour tenir le rythme d'environ 7 à 8 nouveaux avis. Limites : attribution au dernier clic et consentement partiel ; les chiffres GA4 sont des tendances, recoupées avec le module de commande. »</blockquote>
<ol>
<li>Reconduire Meta Ads en ajoutant une audience de clients existants (fichier clients collecté avec une base légale appropriée) ; responsable Claire ; prochaine campagne ; indicateur : coût par commande.</li>
<li>Arrêter LinkedIn Ads et réaffecter 450 € aux dégustations chez les prospects chauds ; responsable Claire ; trimestre suivant ; indicateur : demandes de devis.</li>
<li>Tester l'envoi de la newsletter le jeudi à 17 h contre le mardi à 10 h pendant deux mois ; responsable Léa ; indicateur : taux de clic et commandes attribuées.</li>
</ol>
<h3>Critères d'évaluation</h3>
<ul>
<li>Les KPI couvrent les trois objectifs et plusieurs étapes du tunnel.</li>
<li>Chaque KPI a une formule, une source, une fréquence et une cible.</li>
<li>Les calculs sont justes et le temps interne est intégré au CAC.</li>
<li>Le commentaire mentionne les limites de la mesure.</li>
<li>Les actions sont attribuées, datées et vérifiables.</li>
</ul>
<blockquote><strong>À retenir</strong> – Ce cas constitue le modèle de la partie C6 de votre dossier projet : outils, KPI documentés, calculs, lecture critique et plan d'amélioration.</blockquote>`,
      },
    ],
  },
  {
    title: "Chapitre 8 – Projet final : construire et présenter son plan webmarketing",
    description:
      "1 h – Évaluation interne de fin de formation : finaliser un dossier projet webmarketing portant sur sa propre entreprise et couvrant les compétences C1 à C6, puis le présenter oralement au formateur et au groupe en fin de deuxième journée. Plan type, attendus, grilles d'évaluation et d'autoévaluation, exemple commenté, plan des 90 jours, aménagements et attestation de fin de formation.",
    sections: [
      {
        title: "8.1 – Le projet final : principe, déroulé et calendrier",
        content: `<h3>Ce que l'on vous demande</h3>
<p>La formation « Développer son activité avec le webmarketing » se conclut par un <strong>projet final</strong> qui sert d'évaluation interne des acquis. Il comporte deux éléments :</p>
<ol>
<li>un <strong>dossier projet webmarketing</strong> portant sur <strong>votre propre entreprise</strong> (ou celle qui vous emploie), couvrant les six compétences travaillées : C1 objectifs, C2 stratégie, C3 plan d'action, C4 référencement naturel, C5 réseaux sociaux, C6 dispositif de pilotage ;</li>
<li>une <strong>présentation orale de 20 minutes</strong> devant le formateur et le groupe, en fin de deuxième journée, suivie d'échanges. Si le groupe est nombreux, le formateur peut ramener la présentation à <strong>10 minutes</strong> par participant pour que chacun puisse présenter ; il l'annonce dès le début de la formation.</li>
</ol>
<p>L'objectif n'est pas de produire un document parfait, mais un <strong>plan réaliste, chiffré et directement applicable</strong> dès la fin de la formation. C'est votre feuille de route des mois à venir.</p>
<h3>Un dossier construit au fil des deux jours</h3>
<p>La formation dure 14 heures sur deux jours (C1 : 1 h ; C2 : 1 h ; C3 : 2 h ; C4 : 4 h ; C5 : 4 h ; C6 : 1 h ; projet final : 1 h). Le temps de la séquence « projet final » ne suffit pas à rédiger un dossier : celui-ci se construit donc <strong>progressivement</strong>, en appliquant à votre entreprise chaque cas pratique réalisé sur Maison Lenoir.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Moment</th><th>Ce que vous produisez pour votre dossier</th><th>Format conseillé</th></tr>
<tr><td>Jour 1 – après C1</td><td>Diagnostic de départ et 3 objectifs SMART chiffrés</td><td>1 page</td></tr>
<tr><td>Jour 1 – après C2</td><td>Cibles (1 à 3 personas), positionnement, choix des leviers</td><td>1 à 2 pages</td></tr>
<tr><td>Jour 1 – après C3</td><td>Plan d'action daté, budget, ressources humaines</td><td>1 tableau</td></tr>
<tr><td>Jour 1 – après C4</td><td>Mots-clés prioritaires, actions sur le site et la fiche d'établissement</td><td>1 page + 1 tableau</td></tr>
<tr><td>Jour 2 – après C5</td><td>Plan d'action réseaux sociaux (réseaux retenus, ligne éditoriale, calendrier type)</td><td>1 à 2 pages</td></tr>
<tr><td>Jour 2 – après C6</td><td>KPI, tableau de bord, rituel de revue</td><td>1 tableau</td></tr>
<tr><td>Jour 2 – séquence projet final</td><td>Mise en forme de la synthèse, préparation de la présentation, passage à l'oral</td><td>Dossier de 8 à 15 pages + support de 8 à 12 diapositives</td></tr>
</table>
<h3>Le déroulé de la séquence finale</h3>
<ol>
<li>Rappel des consignes et de la grille d'évaluation par le formateur.</li>
<li>Dernières finitions et autoévaluation à l'aide de la grille de la section 8.5.</li>
<li>Présentations successives, chacune suivie d'échanges avec le formateur et le groupe.</li>
<li>Retour individuel du formateur (oral pendant la séance, puis écrit dans le compte rendu d'évaluation).</li>
<li>Bilan de la formation, questionnaire de satisfaction, remise des documents de fin de formation (voir 8.11).</li>
</ol>
<h3>Si vous n'avez pas toutes les données de votre entreprise</h3>
<p>C'est fréquent : chiffre d'affaires par canal inconnu, aucune statistique web, pas d'historique. Dans ce cas, <strong>n'inventez pas</strong> : indiquez « donnée non disponible », expliquez comment vous allez l'obtenir (installation de GA4, extraction de la caisse, enquête clients) et posez une hypothèse clairement signalée comme telle. Un dossier honnête sur ses limites est plus crédible qu'un dossier rempli de chiffres invérifiables.</p>
<h3>Confidentialité</h3>
<p>Vous présentez devant d'autres participants, parfois d'entreprises proches de la vôtre. Vous pouvez arrondir ou exprimer en pourcentage les données sensibles (marge, chiffre d'affaires, noms de clients). Les échanges en séance restent dans le cadre de la formation.</p>
<blockquote><strong>À retenir</strong> – Le projet final est un plan webmarketing réel pour votre entreprise, construit pas à pas pendant les deux jours, puis présenté en 20 minutes (10 minutes si le groupe est nombreux). Il est évalué par le formateur et doit être utilisable dès le lendemain.</blockquote>`,
      },
      {
        title: "8.2 – Plan type du dossier projet couvrant C1 à C6",
        content: `<p>Le plan ci-dessous est recommandé ; vous pouvez l'adapter si la logique de votre entreprise l'exige, à condition que les six compétences soient visibles.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Partie</th><th>Contenu</th><th>Compétence</th><th>Volume indicatif</th></tr>
<tr><td>Page de garde</td><td>Nom de l'entreprise, nom du participant, fonction, date</td><td>–</td><td>1 page</td></tr>
<tr><td>Synthèse</td><td>Le projet en 10 lignes : situation, objectifs, leviers, budget, résultats attendus</td><td>Toutes</td><td>½ page</td></tr>
<tr><td>1. Présentation et diagnostic</td><td>Activité, clients, concurrence, présence en ligne actuelle, forces et faiblesses (SWOT synthétique), données de départ</td><td>C1</td><td>1 à 2 pages</td></tr>
<tr><td>2. Objectifs webmarketing</td><td>Objectifs SMART reliés aux enjeux de l'entreprise, avec valeur de départ et échéance</td><td>C1</td><td>½ à 1 page</td></tr>
<tr><td>3. Stratégie</td><td>Cibles et personas, parcours client, positionnement et proposition de valeur, choix argumenté des leviers (site, SEO, SEA, réseaux, emailing, partenariats…)</td><td>C2</td><td>1 à 2 pages</td></tr>
<tr><td>4. Plan d'action</td><td>Actions, calendrier, responsables, budget, ressources internes et externes, priorisation</td><td>C3</td><td>1 à 2 pages</td></tr>
<tr><td>5. Référencement naturel</td><td>Mots-clés, optimisations techniques et éditoriales, référencement local, netlinking raisonné</td><td>C4</td><td>1 à 2 pages</td></tr>
<tr><td>6. Réseaux sociaux</td><td>Réseaux retenus, ligne éditoriale, calendrier type, modération, publicité sociale, influence éventuelle, accessibilité</td><td>C5</td><td>1 à 2 pages</td></tr>
<tr><td>7. Pilotage</td><td>KPI par objectif, outils de mesure, tableau de bord, rituel de revue, plan d'amélioration</td><td>C6</td><td>1 page</td></tr>
<tr><td>8. Plan des 90 jours</td><td>Ce que vous ferez concrètement dans les trois mois suivant la formation</td><td>Toutes</td><td>½ page</td></tr>
<tr><td>Annexes</td><td>Captures d'écran de l'existant, calendrier éditorial, maquette de tableau de bord, plan de marquage UTM</td><td>–</td><td>Libre</td></tr>
</table>
<h3>Le fil rouge de cohérence</h3>
<p>Le dossier est jugé avant tout sur sa <strong>cohérence verticale</strong> : chaque objectif (C1) doit se retrouver dans la stratégie (C2), être servi par des actions (C3, C4, C5) et mesuré par au moins un KPI (C6). Un tableau de traçabilité en fin de dossier le démontre en un coup d'œil :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Objectif</th><th>Levier stratégique</th><th>Actions principales</th><th>KPI</th></tr>
<tr><td>O1 – 120 commandes en ligne / mois au 6e mois</td><td>Visibilité locale + simplification de la commande</td><td>Refonte de la page de commande, SEO local, Reels, campagnes Meta géolocalisées, newsletter</td><td>Commandes / mois, taux de conversion, coût par commande</td></tr>
<tr><td>O2 – 25 devis B2B / mois dès le 4e mois</td><td>Crédibilité auprès des décideurs locaux</td><td>Page traiteur optimisée, Google Ads sur requêtes traiteur, LinkedIn (profil de Claire, social selling), dégustations</td><td>Devis / mois, coût par devis, CAC, CPC</td></tr>
<tr><td>O3 – 300 avis Google à 12 mois</td><td>Preuve sociale</td><td>Sollicitation systématique après commande, réponse à 100 % des avis</td><td>Nombre d'avis, note, taux de réponse</td></tr>
</table>
<p>(Exemple Maison Lenoir ; vous remplacez par vos propres objectifs.)</p>
<blockquote><strong>À retenir</strong> – Un plan en huit parties, une synthèse d'une demi-page en tête, un tableau de traçabilité objectifs → leviers → actions → KPI en fin de dossier : c'est la colonne vertébrale qui rend votre projet lisible et convaincant.</blockquote>`,
      },
      {
        title: "8.3 – Les attendus par compétence",
        content: `<p>Pour chaque compétence, le tableau indique ce que le formateur s'attend à trouver dans votre dossier et les erreurs qui reviennent le plus souvent.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Compétence</th><th>Attendus</th><th>Erreurs fréquentes</th></tr>
<tr><td>C1 – Définir les objectifs webmarketing</td><td>Diagnostic factuel de l'existant ; enjeux de l'entreprise ; 2 à 4 objectifs SMART avec valeur de départ, cible et échéance ; lien explicite avec le chiffre d'affaires ou la marge</td><td>Objectifs vagues (« être plus visible ») ; absence de point de départ ; trop d'objectifs ; objectifs sans lien avec l'activité</td></tr>
<tr><td>C2 – Concevoir la stratégie</td><td>Personas fondés sur des observations réelles ; parcours client ; proposition de valeur différenciante ; choix des leviers argumenté au regard des cibles et des ressources</td><td>Personas caricaturaux ; liste de tous les leviers possibles sans arbitrage ; positionnement identique à celui des concurrents</td></tr>
<tr><td>C3 – Élaborer le plan d'action</td><td>Actions datées, attribuées, budgétées ; temps interne estimé ; priorisation (impact/effort) ; budget total cohérent avec la taille de l'entreprise</td><td>Pas de responsable ; budget absent ou irréaliste ; temps humain oublié ; tout lancé en même temps</td></tr>
<tr><td>C4 – Référencement naturel</td><td>Mots-clés choisis selon l'intention de recherche ; optimisations de pages identifiées ; référencement local (fiche d'établissement, cohérence des coordonnées) ; contenus prévus ; vérification technique de base</td><td>Mots-clés trop génériques ; promesses de positionnement garanties ; achat de liens de mauvaise qualité ; oubli du local</td></tr>
<tr><td>C5 – Réseaux sociaux</td><td>Réseaux retenus et justifiés ; ligne éditoriale ; calendrier type ; règles de modération ; publicité sociale chiffrée si prévue ; respect du cadre légal (influence, jeux-concours, droit à l'image) ; accessibilité</td><td>Présence sur tous les réseaux ; contenus uniquement promotionnels ; absence d'appel à l'action ; pas de mention de la loi de 2023 en cas d'influence</td></tr>
<tr><td>C6 – Dispositif de pilotage</td><td>KPI reliés aux objectifs avec formule, source, fréquence, cible ; outils configurés (GA4, Search Console, statistiques natives, UTM) ; gestion du consentement ; tableau de bord ; revue périodique ; calculs CAC, ROAS, ROI</td><td>Indicateurs de vanité ; aucun lien entre ressources et résultats ; tableau de bord sans décisions ; confusion ROI/ROAS</td></tr>
</table>
<h3>Les attendus transversaux</h3>
<ul>
<li><strong>Réalisme</strong> : un plan compatible avec le temps et le budget réellement disponibles.</li>
<li><strong>Exactitude</strong> : outils cités avec leurs fonctions réelles et à jour (GA4 et non Universal Analytics, par exemple) ; règles juridiques correctement énoncées.</li>
<li><strong>Honnêteté sur les données</strong> : distinction claire entre données réelles, estimations et hypothèses.</li>
<li><strong>Clarté</strong> : tableaux plutôt que longs paragraphes, vocabulaire défini.</li>
</ul>
<blockquote><strong>À retenir</strong> – Pour chaque compétence, montrez une décision argumentée et chiffrée, pas une liste de possibilités. Le formateur cherche la logique de choix autant que le contenu.</blockquote>`,
      },
      {
        title: "8.4 – La grille d'évaluation du formateur",
        content: `<p>Le formateur évalue le dossier et la présentation avec la grille suivante. Chaque critère est apprécié sur quatre niveaux : <strong>non acquis</strong>, <strong>en cours d'acquisition</strong>, <strong>acquis</strong>, <strong>maîtrisé</strong>. Le résultat figure sur l'attestation de fin de formation (voir 8.11).</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Compétence</th><th>Critère observable</th><th>Acquis si…</th><th>Maîtrisé si…</th></tr>
<tr><td>C1</td><td>Diagnostic et objectifs</td><td>Au moins 2 objectifs SMART avec point de départ et échéance</td><td>Objectifs reliés à un impact économique chiffré (CA, marge) et hiérarchisés</td></tr>
<tr><td>C2</td><td>Stratégie</td><td>Cibles décrites et leviers choisis en fonction d'elles</td><td>Choix argumentés y compris les leviers écartés, positionnement différenciant étayé</td></tr>
<tr><td>C3</td><td>Plan d'action</td><td>Actions datées avec responsables et budget</td><td>Priorisation explicite, temps interne valorisé, scénario de repli si le budget est réduit</td></tr>
<tr><td>C4</td><td>Référencement naturel</td><td>Mots-clés pertinents et actions d'optimisation identifiées</td><td>Plan éditorial relié aux intentions de recherche, référencement local traité, contrôle via Search Console prévu</td></tr>
<tr><td>C5</td><td>Réseaux sociaux</td><td>Réseaux justifiés, ligne éditoriale et calendrier type</td><td>Modération, publicité, conformité légale et accessibilité intégrées, indicateurs par réseau</td></tr>
<tr><td>C6</td><td>Pilotage</td><td>KPI reliés aux objectifs avec sources</td><td>Tableau de bord, calculs CAC/ROAS/ROI justes, rituel de revue et plan d'amélioration</td></tr>
<tr><td>Transversal</td><td>Cohérence d'ensemble</td><td>Chaque objectif est servi par des actions</td><td>Tableau de traçabilité complet, aucune action « orpheline »</td></tr>
<tr><td>Oral</td><td>Présentation et échanges</td><td>Temps respecté, propos clair, réponses aux questions</td><td>Argumentation précise, prise de recul sur les limites, intégration des suggestions du groupe</td></tr>
</table>
<h3>Ce qui se passe si un critère n'est pas acquis</h3>
<p>L'évaluation est formative : le formateur indique précisément ce qui manque et comment le compléter. Selon les modalités prévues par l'organisme, vous pouvez transmettre une version complétée du dossier dans un délai convenu. Dans tous les cas, l'attestation reflète fidèlement le niveau atteint.</p>
<blockquote><strong>À retenir</strong> – Huit critères, quatre niveaux. Le niveau « acquis » demande un plan complet et cohérent ; le niveau « maîtrisé » demande en plus des arbitrages argumentés, des calculs justes et une vraie prise de recul.</blockquote>`,
      },
      {
        title: "8.5 – La grille d'autoévaluation",
        content: `<p>Avant la présentation, relisez votre dossier avec cette grille. Cochez mentalement « oui », « partiellement » ou « non » ; tout « non » est à corriger en priorité.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Question</th><th>Compétence</th></tr>
<tr><td>1</td><td>Mon diagnostic s'appuie-t-il sur des données réelles (ou signale-t-il clairement leur absence) ?</td><td>C1</td></tr>
<tr><td>2</td><td>Chacun de mes objectifs a-t-il une valeur de départ, une cible chiffrée et une échéance ?</td><td>C1</td></tr>
<tr><td>3</td><td>Mes personas sont-ils fondés sur des observations de vrais clients ?</td><td>C2</td></tr>
<tr><td>4</td><td>Ai-je expliqué pourquoi j'écarte certains leviers ?</td><td>C2</td></tr>
<tr><td>5</td><td>Chaque action a-t-elle un responsable, une date et un coût (y compris en temps) ?</td><td>C3</td></tr>
<tr><td>6</td><td>Le budget total est-il compatible avec ma trésorerie et mon chiffre d'affaires ?</td><td>C3</td></tr>
<tr><td>7</td><td>Mes mots-clés correspondent-ils à ce que mes clients tapent réellement, avec une intention claire ?</td><td>C4</td></tr>
<tr><td>8</td><td>Ma fiche d'établissement Google et mes coordonnées sont-elles traitées ?</td><td>C4</td></tr>
<tr><td>9</td><td>Ai-je limité le nombre de réseaux à ce que je peux animer, et justifié ce choix ?</td><td>C5</td></tr>
<tr><td>10</td><td>Ma ligne éditoriale comporte-t-elle des piliers, des formats et des appels à l'action ?</td><td>C5</td></tr>
<tr><td>11</td><td>Ai-je prévu la modération, les obligations légales et l'accessibilité ?</td><td>C5</td></tr>
<tr><td>12</td><td>Chaque objectif est-il mesuré par au moins un KPI avec formule et source ?</td><td>C6</td></tr>
<tr><td>13</td><td>Mes outils de mesure sont-ils correctement nommés et configurables (GA4, Search Console, UTM, consentement) ?</td><td>C6</td></tr>
<tr><td>14</td><td>Mes calculs (CAC, ROAS, ROI, taux de conversion) sont-ils justes et expliqués ?</td><td>C6</td></tr>
<tr><td>15</td><td>Mon tableau de traçabilité objectifs → actions → KPI est-il complet ?</td><td>Transversal</td></tr>
<tr><td>16</td><td>Mon plan des 90 jours est-il concret et daté ?</td><td>Transversal</td></tr>
<tr><td>17</td><td>Ai-je répété ma présentation en respectant le temps imparti ?</td><td>Oral</td></tr>
</table>
<blockquote><strong>À retenir</strong> – Dix-sept questions, dix minutes de relecture : la grille d'autoévaluation repère les oublis les plus fréquents avant que le formateur ne les relève.</blockquote>`,
      },
      {
        title: "8.6 – Conseils de rédaction du dossier",
        content: `<h3>Écrire pour être lu vite</h3>
<ul>
<li><strong>Commencez par la synthèse</strong>, rédigée en dernier : le lecteur doit comprendre le projet en une minute.</li>
<li><strong>Une idée par paragraphe</strong>, phrases courtes, verbes d'action (« nous lancerons », « Claire publiera »).</li>
<li><strong>Tableaux</strong> pour le plan d'action, le budget, les KPI, le calendrier éditorial.</li>
<li><strong>Titres numérotés</strong> qui suivent le plan type.</li>
<li><strong>Chiffres sourcés</strong> : « source : caisse 2025 », « source : GA4, janvier–mars », « hypothèse ».</li>
</ul>
<h3>Argumenter</h3>
<p>Utilisez le schéma <strong>constat → décision → justification → indicateur</strong>. Exemple : « Constat : 70 % de nos clients de semaine travaillent dans les bureaux voisins (enquête en caisse, 120 réponses). Décision : nous créons une offre petit-déjeuner d'équipe promue sur LinkedIn. Justification : c'est le réseau où se trouvent les office managers qui commandent pour leurs équipes. Indicateur : demandes de devis par mois. »</p>
<h3>Exactitude et vocabulaire</h3>
<ul>
<li>Définissez une fois les sigles (KPI, CAC, ROAS, SEO, SEA, UTM).</li>
<li>Vérifiez le nom et les fonctions actuels des outils : les plateformes changent souvent d'interface et de terminologie (par exemple « événements clés » dans GA4).</li>
<li>Pour le juridique (RGPD, cookies, influence, jeux-concours), citez le texte ou l'autorité (CNIL, DGCCRF) plutôt que des formules approximatives.</li>
<li>Ne présentez jamais une estimation comme un fait. Une hypothèse annoncée est une force ; une donnée inventée est une faiblesse.</li>
</ul>
<h3>Mise en forme</h3>
<ul>
<li>Police lisible, taille suffisante, interlignage aéré, contraste élevé.</li>
<li>Captures d'écran recadrées et légendées (en masquant les données personnelles).</li>
<li>Pagination et sommaire.</li>
<li>Format PDF pour l'envoi, nom de fichier explicite (« Projet_webmarketing_NomEntreprise_NomPrenom.pdf »).</li>
</ul>
<h3>Les sept erreurs qui coûtent le plus</h3>
<ol>
<li>Recopier le cours au lieu de l'appliquer à son entreprise.</li>
<li>Des objectifs sans chiffre de départ.</li>
<li>Un plan d'action sans budget ni responsable.</li>
<li>Des KPI qui ne mesurent pas les objectifs.</li>
<li>Des incohérences de chiffres entre les parties (un budget de 19 200 € en C3 et de 15 000 € en synthèse, par exemple).</li>
<li>Des outils obsolètes ou des fonctionnalités imaginaires.</li>
<li>Un dossier trop long : au-delà de 15 pages hors annexes, l'essentiel se dilue.</li>
</ol>
<blockquote><strong>À retenir</strong> – Synthèse en tête, tableaux, chiffres sourcés, schéma constat → décision → justification → indicateur, cohérence des chiffres d'une partie à l'autre : ce sont les marques d'un dossier professionnel.</blockquote>`,
      },
      {
        title: "8.7 – La présentation orale : structure en 20 minutes (ou 10) et support",
        content: `<h3>Structure en 20 minutes</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Séquence</th><th>Durée</th><th>Contenu</th><th>Diapositives</th></tr>
<tr><td>Ouverture</td><td>1 min 30</td><td>Qui vous êtes, votre entreprise en une phrase, l'enjeu principal</td><td>1</td></tr>
<tr><td>Diagnostic et objectifs (C1)</td><td>3 min</td><td>Situation chiffrée, 2 à 4 objectifs SMART</td><td>2</td></tr>
<tr><td>Stratégie (C2)</td><td>3 min</td><td>Cibles, positionnement, leviers retenus et écartés</td><td>1 à 2</td></tr>
<tr><td>Plan d'action et budget (C3)</td><td>3 min</td><td>Calendrier synthétique, budget, ressources</td><td>1 à 2</td></tr>
<tr><td>SEO et réseaux sociaux (C4, C5)</td><td>5 min</td><td>Actions clés, exemples concrets (une publication type, une page optimisée)</td><td>2 à 3</td></tr>
<tr><td>Pilotage (C6)</td><td>2 min 30</td><td>KPI, maquette de tableau de bord, rituel de revue</td><td>1</td></tr>
<tr><td>Conclusion et 90 jours</td><td>2 min</td><td>Les trois premières actions, ce dont vous avez besoin, vos points de vigilance</td><td>1</td></tr>
</table>
<p>Les échanges avec le formateur et le groupe suivent la présentation.</p>
<h3>Version en 10 minutes (groupe nombreux)</h3>
<ol>
<li>1 min – Entreprise et enjeu.</li>
<li>2 min – Objectifs SMART.</li>
<li>2 min – Stratégie et budget.</li>
<li>3 min – Les trois actions phares (dont au moins une SEO et une réseaux sociaux).</li>
<li>1 min 30 – KPI et tableau de bord.</li>
<li>30 s – Première action des 90 jours.</li>
</ol>
<p>Dans cette version, le dossier écrit porte le détail ; l'oral montre la logique et les choix.</p>
<h3>Le support (8 à 12 diapositives)</h3>
<ul>
<li>Un titre qui affirme un message (« La commande en ligne doit tripler en six mois ») plutôt qu'un intitulé neutre (« Objectifs »).</li>
<li>Un visuel ou un tableau par diapositive ; peu de texte, grande taille de police, contraste élevé.</li>
<li>Des chiffres cohérents avec le dossier.</li>
<li>Une diapositive de secours en annexe pour les questions attendues (détail du budget, calcul du CAC).</li>
</ul>
<h3>Réussir sa présentation en salle</h3>
<ul>
<li>Tester son support sur le vidéoprojecteur pendant la pause qui précède ; fermer les notifications.</li>
<li>Envoyer le support au formateur avant la séance et l'avoir aussi sur une clé USB en cas de problème technique.</li>
<li>Regarder le groupe, parler posément, annoncer les transitions (« Je passe maintenant au pilotage »).</li>
<li>Prévoir un chronomètre visible.</li>
<li>Répéter au moins deux fois à voix haute en se chronométrant.</li>
</ul>
<blockquote><strong>À retenir</strong> – Vingt minutes structurées en sept séquences (dix minutes en six temps si le groupe est nombreux), 8 à 12 diapositives à message, chiffres identiques à ceux du dossier, répétition chronométrée et test technique la veille.</blockquote>`,
      },
      {
        title: "8.8 – Les questions fréquentes lors des échanges et pistes de réponse",
        content: `<p>Les échanges qui suivent la présentation ne sont pas un piège : ils permettent de vérifier que vous maîtrisez votre plan et de l'enrichir avec les idées du groupe. Voici les questions qui reviennent le plus souvent et la manière d'y répondre.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Ce qui est vérifié</th><th>Piste de réponse</th></tr>
<tr><td>« Pourquoi cet objectif chiffré et pas un autre ? »</td><td>Réalisme de C1</td><td>Expliquer le calcul : point de départ, capacité de production, panier moyen, ce que l'objectif représente en chiffre d'affaires</td></tr>
<tr><td>« Pourquoi pas TikTok (ou tel autre réseau) ? »</td><td>Arbitrage C2/C5</td><td>Présence de la cible, temps disponible, critère et date de réévaluation</td></tr>
<tr><td>« Qui va réaliser concrètement ces actions ? »</td><td>Faisabilité C3</td><td>Nommer les personnes, le temps hebdomadaire, ce qui sera externalisé</td></tr>
<tr><td>« Que faites-vous si le budget est réduit de moitié ? »</td><td>Priorisation C3</td><td>Indiquer les deux actions conservées en priorité et pourquoi (meilleur ratio impact/coût)</td></tr>
<tr><td>« Comment savez-vous que vos clients tapent ce mot-clé ? »</td><td>Méthode C4</td><td>Outil utilisé (Search Console, outil de planification des mots-clés, suggestions du moteur), intention de recherche</td></tr>
<tr><td>« Comment allez-vous savoir si Instagram vous apporte des ventes ? »</td><td>Mesure C5/C6</td><td>Liens UTM, événements clés GA4, code promo, recoupement avec le module de vente</td></tr>
<tr><td>« Et si vous travaillez avec une influenceuse ? »</td><td>Cadre légal C5</td><td>Mention « Publicité » ou « Collaboration commerciale », contrat écrit au-delà du seuil réglementaire, produits interdits, responsabilité solidaire</td></tr>
<tr><td>« Quelle différence entre votre ROAS et votre ROI ? »</td><td>Maîtrise C6</td><td>ROAS = CA ÷ dépense publicitaire ; ROI = (marge − coût) ÷ coût ; donner son propre chiffre</td></tr>
<tr><td>« Vos chiffres GA4 sont-ils fiables ? »</td><td>Recul C6</td><td>Consentement partiel, Consent Mode v2, bloqueurs : GA4 donne des tendances, la caisse ou le module de vente donne la réalité</td></tr>
<tr><td>« Quel est le plus grand risque de votre plan ? »</td><td>Prise de recul</td><td>Nommer un risque réel (temps, saisonnalité, capacité de production) et la mesure prévue</td></tr>
</table>
<h3>Méthode de réponse</h3>
<ol>
<li>Écouter la question jusqu'au bout ; la reformuler si elle est ambiguë.</li>
<li>Répondre d'abord en une phrase, puis justifier avec un chiffre ou un exemple.</li>
<li>Si vous ne savez pas : le dire, puis indiquer comment vous trouveriez la réponse. C'est une réponse professionnelle.</li>
<li>Noter les suggestions utiles : elles enrichissent votre plan des 90 jours.</li>
</ol>
<blockquote><strong>À retenir</strong> – Les questions portent sur le réalisme, les arbitrages, la mesure et le cadre légal. Préparez une réponse courte et chiffrée à chacune des dix questions ci-dessus : vous couvrirez l'essentiel des échanges.</blockquote>`,
      },
      {
        title: "8.9 – Exemple commenté : la synthèse du projet Maison Lenoir",
        content: `<p>Voici la synthèse qu'aurait pu rédiger Claire Lenoir en tête de son dossier, suivie des commentaires du formateur. Tous les chiffres sont ceux de l'exemple fictif utilisé depuis le début de la formation.</p>
<h3>La synthèse</h3>
<blockquote>
<p><strong>Maison Lenoir</strong>, boulangerie-pâtisserie artisanale nantaise de 6 salariés, réalise 780 k€ HT de chiffre d'affaires, dont seulement 31 k€ en traiteur. La clientèle de quartier est fidèle (note Google de 4,6 sur environ 210 avis), mais la vente en ligne et le traiteur pour les entreprises restent embryonnaires, et la présence numérique n'est pas pilotée (Instagram d'environ 1 900 abonnés sans lien de commande, aucune mesure des résultats).</p>
<p><strong>Objectifs</strong> : 120 commandes en ligne par mois au 6e mois ; 25 demandes de devis traiteur B2B par mois dès le 4e mois ; 300 avis Google à 12 mois.</p>
<p><strong>Stratégie</strong> : devenir la référence artisanale de proximité pour la commande anticipée des particuliers et pour les petits-déjeuners et buffets des entreprises du quartier. Leviers retenus : site et page de commande optimisés, référencement local, Instagram et Facebook, LinkedIn (profil de la gérante et page), Google Ads sur les requêtes traiteur, newsletter. Leviers écartés à ce stade : TikTok (réévaluation à six mois), marketplaces de livraison (commissions incompatibles avec nos marges).</p>
<p><strong>Moyens</strong> : budget de l'an 1 de 19 200 € HT et environ 6 h 30 de temps interne par semaine. Repères de rentabilité : CPC maximal d'environ 3,50 €, coût par devis maximal d'environ 88 €, CAC maximal d'environ 220 €.</p>
<p><strong>Pilotage</strong> : tableau de bord mensuel (GA4, Search Console, statistiques natives, module de commande, tableur B2B), revue de 45 minutes le premier lundi du mois.</p>
</blockquote>
<h3>Exemple de répartition du budget de l'an 1 (illustration)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Poste</th><th>Montant HT</th><th>Objectifs servis</th></tr>
<tr><td>Site, page de commande, référencement naturel</td><td>6 000 €</td><td>O1, O2</td></tr>
<tr><td>Google Ads (requêtes traiteur et commande)</td><td>4 800 €</td><td>O2, O1</td></tr>
<tr><td>Publicité Meta (Facebook, Instagram)</td><td>3 000 €</td><td>O1</td></tr>
<tr><td>Actions B2B (LinkedIn, dégustations, plaquettes)</td><td>2 400 €</td><td>O2</td></tr>
<tr><td>Influence locale</td><td>900 €</td><td>O1</td></tr>
<tr><td>Outils (emailing, gestion du consentement, création graphique)</td><td>1 300 €</td><td>Toutes</td></tr>
<tr><td>Réserve pour tests</td><td>800 €</td><td>Toutes</td></tr>
<tr><td><strong>Total</strong></td><td><strong>19 200 €</strong></td><td></td></tr>
</table>
<h3>Les commentaires du formateur</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Point</th><th>Commentaire</th><th>Appréciation</th></tr>
<tr><td>Diagnostic</td><td>Chiffré et honnête ; il manque la part actuelle du chiffre d'affaires réalisée en ligne, à extraire du module de commande</td><td>Acquis</td></tr>
<tr><td>Objectifs</td><td>Trois objectifs SMART, datés, reliés aux deux axes de développement ; il serait utile de traduire O1 et O2 en chiffre d'affaires attendu</td><td>Acquis</td></tr>
<tr><td>Stratégie</td><td>Leviers écartés argumentés (TikTok, marketplaces) : signe d'un vrai arbitrage</td><td>Maîtrisé</td></tr>
<tr><td>Budget</td><td>Total cohérent et réparti par objectif ; le temps interne de 6 h 30 par semaine devrait aussi être valorisé (environ 10 700 € par an à 35 €/h sur 47 semaines, comme au chapitre 3) pour calculer des CAC complets</td><td>Acquis</td></tr>
<tr><td>Repères de rentabilité</td><td>Cohérents entre eux : avec un taux de transformation des devis de 40 %, 88 € par devis correspondent à 220 € par client</td><td>Maîtrisé</td></tr>
<tr><td>Pilotage</td><td>Sources identifiées et rituel défini ; préciser le traitement du consentement et la limite des données GA4</td><td>Acquis</td></tr>
<tr><td>Risque non traité</td><td>La capacité de production du fournil pour absorber 120 commandes et 25 devis par mois n'est pas évoquée : à ajouter</td><td>Point de vigilance</td></tr>
</table>
<h3>Ce qu'il faut retenir de l'exemple</h3>
<ul>
<li>La synthèse tient en une demi-page et contient tous les chiffres clés.</li>
<li>Les leviers écartés sont aussi importants que les leviers retenus.</li>
<li>Les repères économiques (CPC, coût par devis, CAC) transforment le plan en outil de décision.</li>
<li>Le formateur valorise la cohérence et pointe les angles morts (capacité de production, temps interne).</li>
</ul>
<blockquote><strong>À retenir</strong> – Une bonne synthèse donne en une demi-page la situation, les objectifs, la stratégie, les moyens et le pilotage, avec des chiffres cohérents d'une partie à l'autre. Les commentaires montrent que l'on attend des arbitrages et une prise de recul, pas l'exhaustivité.</blockquote>`,
      },
      {
        title: "8.10 – Le plan d'action des 90 jours après la formation",
        content: `<h3>Pourquoi 90 jours</h3>
<p>Trois mois, c'est assez pour obtenir des premiers résultats mesurables et assez court pour garder l'élan de la formation. Le plan des 90 jours découpe votre dossier en actions hebdomadaires. Il est volontairement limité : <strong>trois priorités</strong>, pas davantage.</p>
<h3>Méthode</h3>
<ol>
<li>Choisir les trois actions au meilleur rapport impact/effort dans votre plan d'action.</li>
<li>Les découper en tâches d'une à deux heures.</li>
<li>Les répartir sur 12 semaines dans votre agenda (bloquer des créneaux fixes).</li>
<li>Fixer un indicateur et un point d'étape à J+30, J+60 et J+90.</li>
<li>Prévoir ce qui sera abandonné ou reporté pour libérer du temps.</li>
</ol>
<h3>Exemple Maison Lenoir</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Période</th><th>Actions</th><th>Responsable</th><th>Indicateur de contrôle</th></tr>
<tr><td>Semaines 1 à 2</td><td>Régulariser les accès (portefeuille Meta, fiche Google, LinkedIn) ; installer GA4 avec les événements clés ; mettre en place la gestion du consentement ; créer le plan de marquage UTM</td><td>Claire (+ prestataire web)</td><td>Événements clés visibles dans GA4 ; accès tous détenus par l'entreprise</td></tr>
<tr><td>Semaines 3 à 4</td><td>Optimiser la page de commande et la page traiteur (titres, contenus, formulaire de devis) ; mettre à jour la fiche d'établissement</td><td>Claire</td><td>Pages indexées (Search Console) ; formulaire testé</td></tr>
<tr><td>J+30</td><td>Premier tableau de bord ; première revue mensuelle</td><td>Claire et Léa</td><td>Valeurs de départ renseignées pour tous les KPI</td></tr>
<tr><td>Semaines 5 à 8</td><td>Lancer le calendrier éditorial (2 Reels et 1 carrousel par semaine) ; optimiser le profil LinkedIn de Claire ; constituer la liste de 100 prospects ; sollicitation des avis après chaque commande</td><td>Léa / Claire</td><td>Commandes en ligne, invitations acceptées, nouveaux avis</td></tr>
<tr><td>J+60</td><td>Deuxième revue ; première campagne Meta géolocalisée ; lancement Google Ads sur les requêtes traiteur avec plafond de CPC</td><td>Claire</td><td>CPC ≤ 3,50 € ; coût par commande</td></tr>
<tr><td>Semaines 9 à 12</td><td>Dégustations chez les prospects chauds ; newsletter mensuelle ; ajustements issus des revues</td><td>Claire / Léa</td><td>Devis / mois ; coût par devis ≤ 88 €</td></tr>
<tr><td>J+90</td><td>Bilan trimestriel : objectifs, budget consommé (prorata de 19 200 €), décisions pour le trimestre suivant</td><td>Claire</td><td>Trajectoire vers 25 devis / mois au 4e mois et 120 commandes / mois au 6e mois</td></tr>
</table>
<h3>Les pièges des 90 jours</h3>
<ul>
<li>Vouloir tout lancer la première semaine, puis tout abandonner faute de temps.</li>
<li>Repousser l'installation de la mesure : sans valeurs de départ, aucun progrès ne sera démontrable.</li>
<li>Ne pas bloquer de créneaux dans l'agenda : le quotidien de l'entreprise reprend toujours le dessus.</li>
<li>Rester seul : partagez votre plan avec un associé, un salarié ou un pair rencontré pendant la formation qui vous demandera des nouvelles à J+30.</li>
</ul>
<blockquote><strong>À retenir</strong> – Trois priorités, douze semaines, trois points d'étape. Commencez par la mesure et les accès, puis les pages qui convertissent, puis l'animation et la publicité. C'est ce plan qui fait passer la formation du dossier à l'action.</blockquote>`,
      },
      {
        title: "8.11 – Aménagements pour les personnes en situation de handicap et attestation de fin de formation",
        content: `<h3>Les aménagements possibles</h3>
<p>Toute personne en situation de handicap, reconnue ou non, ou rencontrant une difficulté temporaire (santé, trouble des apprentissages) peut bénéficier d'aménagements pour suivre la formation et réaliser le projet final dans des conditions équitables. La démarche passe par le <strong>référent handicap</strong> de l'organisme de formation, dont les coordonnées figurent dans les documents remis à l'inscription.</p>
<h4>Comment faire</h4>
<ol>
<li>Prendre contact avec le référent handicap <strong>le plus tôt possible</strong>, idéalement avant l'entrée en formation (le besoin peut aussi apparaître en cours de route).</li>
<li>Décrire les difficultés rencontrées et les besoins, sans obligation de communiquer un diagnostic médical.</li>
<li>Convenir ensemble des adaptations, consignées par écrit et transmises au formateur.</li>
<li>Faire un point en cours de formation pour vérifier qu'elles conviennent.</li>
</ol>
<h4>Exemples d'adaptations pour le projet final</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Besoin</th><th>Adaptations possibles</th></tr>
<tr><td>Fatigabilité, besoin de temps supplémentaire</td><td>Temps de présentation ou d'échange allongé, pauses, présentation à un autre moment de la journée</td></tr>
<tr><td>Trouble des apprentissages (dyslexie, dyspraxie…)</td><td>Consignes écrites remises à l'avance, police adaptée, délai supplémentaire pour le dossier, tolérance orthographique, utilisation d'outils de dictée</td></tr>
<tr><td>Déficience auditive</td><td>Supports écrits remis à l'avance, placement face au formateur, transcription, interprète en langue des signes si nécessaire, questions également posées par écrit dans la messagerie</td></tr>
<tr><td>Déficience visuelle</td><td>Supports compatibles avec les lecteurs d'écran, agrandissement, description orale des visuels, présentation sans support projeté</td></tr>
<tr><td>Anxiété à l'oral, trouble psychique</td><td>Présentation au formateur seul, présentation enregistrée à l'avance suivie d'un échange court, ordre de passage choisi</td></tr>
<tr><td>Handicap moteur</td><td>Outils de saisie adaptés, temps aménagé, accompagnement technique pour le partage d'écran</td></tr>
</table>
<p>Lorsque l'adaptation dépasse les moyens de l'organisme, le référent peut mobiliser des partenaires spécialisés, notamment les dispositifs de l'Agefiph (pour le secteur privé) et ses ressources dédiées à la formation. Les aménagements visent l'égalité des conditions : ils ne modifient pas les compétences évaluées.</p>
<h3>L'attestation de fin de formation</h3>
<p>Conformément à l'article L. 6353-1 du Code du travail, l'organisme remet à chaque participant, à l'issue de la formation, une <strong>attestation</strong> mentionnant les objectifs, la nature et la durée de l'action ainsi que les <strong>résultats de l'évaluation des acquis</strong>. Pour cette formation, elle indique :</p>
<ul>
<li>l'intitulé « Développer son activité avec le webmarketing », les dates et la durée (14 heures en présentiel) ;</li>
<li>les objectifs et les compétences travaillées (C1 à C6) ;</li>
<li>le niveau atteint pour chaque compétence selon la grille d'évaluation du formateur (non acquis, en cours d'acquisition, acquis, maîtrisé).</li>
</ul>
<p>Cette formation n'est pas certifiante : l'attestation atteste du suivi de la formation et des acquis évalués, elle ne constitue pas un diplôme ni une certification professionnelle. Un <strong>certificat de réalisation</strong> peut par ailleurs être établi à destination du financeur (entreprise, opérateur de compétences), sur la base des émargements et des connexions aux classes virtuelles.</p>
<h3>Après la formation</h3>
<ul>
<li>Le questionnaire de satisfaction de fin de formation, puis un questionnaire à froid quelques semaines plus tard, permettent à l'organisme d'améliorer le programme : vos retours sont utiles.</li>
<li>Conservez votre dossier projet, votre plan des 90 jours et les modèles de tableaux (calendrier éditorial, plan de marquage UTM, tableau de bord) : ce sont vos outils de travail.</li>
</ul>
<blockquote><strong>À retenir</strong> – Les aménagements se demandent au référent handicap le plus tôt possible et garantissent des conditions équitables sans changer ce qui est évalué. À l'issue de la formation, l'attestation prévue par l'article L. 6353-1 du Code du travail indique les objectifs, la nature, la durée et les résultats de l'évaluation de vos acquis.</blockquote>`,
      },
    ],
  },
];
