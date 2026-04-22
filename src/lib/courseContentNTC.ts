import { CourseChapter } from "./courseContent";

/**
 * Support de cours NTC (Négociateur Technico-Commercial - RNCP39063)
 * Contenu réécrit à partir des supports officiels :
 * - COURS VEILLE CONCURRENTIELLE
 * - PROSPECTION A DISTANCE ET PHYSIQUEMENT ET CONCEVOIR UNE SOLUTION
 * - Cours Marché et la veille
 * - NTC environnement éco juridique et sociétale entreprise
 * - Veille concurrentielle (PPTX)
 * - PLAN ACTION COMMERCIAL
 * - CALCUL COMMERCIAL
 * - Chapitre TP NTC : Cycle de vie d'un produit
 */
export function getNTCChapters(): CourseChapter[] {
  return [
    {
      title: "Chapitre 1 – L'environnement économique, juridique et sociétal de l'entreprise",
      description: "Comprendre l'environnement dans lequel évolue l'entreprise et ses interactions avec ses parties prenantes.",
      sections: [
        {
          title: "1.1 – Définition de l'entreprise et de son environnement",
          content: `<h3>L'entreprise selon l'INSEE</h3>
<p>D'après l'INSEE, l'entreprise est une <strong>« unité économique, juridiquement autonome dont la fonction principale est de produire des biens ou des services pour le marché »</strong>. Autrement dit, il y a entreprise dès que des personnes mobilisent leur talent et leur énergie, rassemblent des moyens matériels et de l'argent pour apporter un produit ou un service à des clients.</p>
<h4>L'entreprise et son environnement</h4>
<p>L'entreprise ne vit pas en autarcie ; son existence est conditionnée par ses liens et relations avec le milieu dans lequel s'insère son activité. Par définition, l'environnement est <strong>l'ensemble des facteurs sociologiques, économiques, juridiques, techniques</strong> qui entourent l'entreprise et qui ont un effet sur celle-ci.</p>
<p>L'environnement peut être source d'<strong>opportunité</strong> (toute mutation qui améliore la position concurrentielle de l'entreprise) ou de <strong>menace</strong> (toute transformation susceptible de remettre en cause cette position).</p>
<p>Depuis quelques années, l'environnement est de plus en plus fluctuant ; le sens et l'amplitude des changements sont de plus en plus imprévisibles. D'où l'importance de la <strong>flexibilité</strong> et de la <strong>réactivité</strong>.</p>`
        },
        {
          title: "1.2 – L'analyse PESTEL",
          content: `<h3>Les six dimensions de l'environnement (PESTEL)</h3>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr><th style="background:#1e3a7b;color:white">Légal</th><th style="background:#1e3a7b;color:white">Politique</th><th style="background:#1e3a7b;color:white">Économique</th></tr>
<tr><td>• Lois sur les monopoles<br>• Droit du travail<br>• Législation sur la santé<br>• Normes de sécurité</td><td>• Stabilité gouvernementale<br>• Politique fiscale<br>• Commerce extérieur<br>• Protection sociale</td><td>• Cycles économiques<br>• Évolution du PNB<br>• Taux d'intérêt<br>• Politique monétaire<br>• Inflation, chômage<br>• Revenu disponible</td></tr>
<tr><th style="background:#1e3a7b;color:white">Écologique</th><th style="background:#1e3a7b;color:white">Technologique</th><th style="background:#1e3a7b;color:white">Socioculturel</th></tr>
<tr><td>• Lois sur la protection de l'environnement<br>• Retraitement des déchets<br>• Consommation d'énergie</td><td>• Dépenses publiques de R&amp;D<br>• Investissements technologiques<br>• Nouvelles découvertes<br>• Vitesse des transferts technologiques<br>• Taux d'obsolescence</td><td>• Démographie<br>• Distribution des revenus<br>• Mobilité sociale<br>• Modes de vie<br>• Loisir et travail<br>• Consumérisme<br>• Niveau d'éducation</td></tr>
</table>`
        },
        {
          title: "1.3 – Micro, méso et macro-environnement",
          content: `<h3>Trois cercles d'influence</h3>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr><th>Micro-environnement</th><th>Méso-environnement</th><th>Macro-environnement</th></tr>
<tr><td>Clients, fournisseurs, concurrents</td><td>État, groupes de pression</td><td>Environnement juridique, technologique, socio-culturel</td></tr>
<tr><td><em>Acteurs qui influencent l'entreprise mais l'entreprise a aussi une influence sur eux.</em></td><td><em>Acteurs qui ont une influence directe alors que l'entreprise n'a quasi pas d'influence sur eux.</em></td><td><em>Facteurs qui influencent l'entreprise mais que celle-ci peut difficilement influencer.</em></td></tr>
</table>
<h4>Les parties prenantes de l'entreprise</h4>
<ul>
<li><strong>Les fournisseurs</strong> : ils permettent à l'entreprise d'obtenir les matières premières nécessaires à sa production.</li>
<li><strong>Les salariés</strong> : ils proposent à l'entreprise leur force de travail contre une rémunération (facteur travail).</li>
<li><strong>Les clients</strong> : ils constituent la <strong>demande</strong> et consomment les produits de l'entreprise.</li>
<li><strong>Les banques</strong> : elles assurent le financement de l'activité et la gestion des moyens de paiement.</li>
<li><strong>Les concurrents</strong> : ils conditionnent la rivalité entre acteurs sur le secteur.</li>
<li><strong>L'État</strong> : il conditionne les choix de l'entreprise via la réglementation, les contrôles ou la pression fiscale.</li>
<li><strong>Les groupes de pression</strong> : associations de consommateurs, ONG, syndicats, organisations professionnelles.</li>
</ul>`
        },
        {
          title: "1.4 – L'environnement juridique de l'entreprise",
          content: `<h3>Le cadre légal d'activité</h3>
<p>L'environnement juridique d'une entreprise fait référence à <strong>l'ensemble des lois, règlements, normes et pratiques légales</strong> qui régissent ses activités, aux niveaux national, régional et international.</p>
<h4>Droit des affaires</h4>
<p>Lois qui régissent la création, le fonctionnement et la dissolution des entreprises : formes juridiques (SA, SARL, etc.), obligations fiscales, contrats commerciaux, propriété intellectuelle, concurrence.</p>
<h4>Droit du travail</h4>
<p>Définit les droits et obligations des employeurs et employés : contrats de travail, conditions de travail, droits syndicaux, santé et sécurité au travail, procédures de licenciement.</p>
<h4>Droit fiscal</h4>
<p>Lois relatives à la fiscalité des entreprises : impôt sur les sociétés, TVA, taxes locales, incitations fiscales.</p>
<h4>Droit de la consommation et de la concurrence</h4>
<p>Protection du consommateur, pratiques commerciales loyales, lutte contre les ententes et abus de position dominante.</p>`
        }
      ]
    },
    {
      title: "Chapitre 2 – Le marché de l'entreprise",
      description: "Analyser le marché : acteurs, indicateurs, structures et types de demande.",
      sections: [
        {
          title: "2.1 – La notion de marché et ses acteurs",
          content: `<h3>Qu'est-ce qu'un marché ?</h3>
<p>Le marché permet de mesurer le périmètre dans lequel s'inscrit l'activité d'une entreprise. C'est un <strong>lieu de rencontre entre une offre</strong> (producteurs) <strong>et une demande</strong> (consommateurs).</p>
<p>Il peut être tiré par l'émergence de besoins chez les consommateurs ou par l'émergence de nouveaux produits et concepts du fait des producteurs.</p>
<h4>Les acteurs du marché</h4>
<ul>
<li><strong>Les offreurs</strong> : producteurs, distributeurs, prestataires de services qui proposent des biens et services.</li>
<li><strong>Les demandeurs</strong> : consommateurs (B to C), entreprises (B to B), administrations (B to G).</li>
</ul>`
        },
        {
          title: "2.2 – Les indicateurs du marché",
          content: `<h3>Mesurer un marché en valeur et en volume</h3>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr><th>Indicateur</th><th>Définition</th><th>Calcul / illustration</th></tr>
<tr><td><strong>Volume du marché</strong></td><td>Quantités vendues sur la période</td><td>Σ unités vendues par tous les offreurs</td></tr>
<tr><td><strong>Valeur du marché</strong></td><td>Chiffre d'affaires global du marché</td><td>Σ (Quantité × Prix de vente)</td></tr>
<tr><td><strong>Part de marché en volume</strong></td><td>Poids de l'entreprise sur le marché</td><td>(Ventes entreprise / Ventes totales) × 100</td></tr>
<tr><td><strong>Part de marché en valeur</strong></td><td>Poids financier de l'entreprise</td><td>(CA entreprise / CA total marché) × 100</td></tr>
<tr><td><strong>Taux d'occupation du marché</strong></td><td>Niveau de pénétration auprès de la cible</td><td>(Clients réels / Cible potentielle) × 100</td></tr>
</table>`
        },
        {
          title: "2.3 – Les structures de marché",
          content: `<h3>Trois types de structures selon le nombre d'offreurs</h3>
<ul>
<li><strong>Monopole</strong> : un seul offreur sur le marché (ex. SNCF historique pour le transport ferroviaire de voyageurs).</li>
<li><strong>Oligopole</strong> : un petit nombre d'offreurs se partagent le marché (ex. opérateurs téléphoniques).</li>
<li><strong>Marché atomisé (concurrence pure et parfaite)</strong> : un grand nombre d'offreurs et de demandeurs (ex. boulangerie de quartier).</li>
</ul>
<h4>Les formes de concurrence</h4>
<ul>
<li><strong>La concurrence directe</strong> : ensemble des entreprises proposant un produit ou service similaire.</li>
<li><strong>La concurrence indirecte ou secondaire</strong> : entreprises proposant un produit différent mais répondant au même besoin (ex. train vs avion).</li>
</ul>`
        },
        {
          title: "2.4 – L'analyse de la demande",
          content: `<h3>Comprendre les types de clientèle et la demande</h3>
<h4>Les types de clientèle</h4>
<ul>
<li><strong>Clients actuels</strong> : ils achètent déjà nos produits.</li>
<li><strong>Clients de la concurrence</strong> : ils achètent des produits similaires chez nos concurrents.</li>
<li><strong>Non-consommateurs relatifs</strong> : ils n'achètent pas mais pourraient le faire (cible à conquérir).</li>
<li><strong>Non-consommateurs absolus</strong> : ils n'achèteront jamais (hors cible).</li>
</ul>
<h4>Demande quantitative et qualitative</h4>
<p>La <strong>demande quantitative</strong> mesure les volumes (nombre d'acheteurs, quantités achetées). La <strong>demande qualitative</strong> analyse les motivations, freins, attentes et comportements.</p>
<h4>Le comportement d'achat</h4>
<p>Cinq facteurs influencent le comportement d'achat :</p>
<ul>
<li><strong>Personnels</strong> : âge, profession, revenu, style de vie.</li>
<li><strong>Psychologiques</strong> : motivations, perceptions, attitudes.</li>
<li><strong>Sociaux</strong> : recommandations, tendances, normes sociales.</li>
<li><strong>Culturels</strong> : valeurs, traditions, sous-cultures.</li>
<li><strong>Situationnels</strong> : contexte d'achat, urgence, environnement.</li>
</ul>`
        }
      ]
    },
    {
      title: "Chapitre 3 – La veille commerciale et concurrentielle",
      description: "Mettre en place un dispositif de veille pour anticiper les évolutions du marché.",
      sections: [
        {
          title: "3.1 – Définition et enjeux de la veille concurrentielle",
          content: `<h3>Qu'est-ce que la veille concurrentielle ?</h3>
<p>La <strong>veille concurrentielle</strong> est un outil d'anticipation stratégique très performant. Elle consiste à surveiller de manière automatisée les actions et produits de la concurrence. Elle permet d'adopter une stratégie de démarcation grâce à une analyse de l'écosystème entrepreneurial.</p>
<p>Elle se définit comme <strong>l'ensemble des actions visant à surveiller la stratégie utilisée par la concurrence</strong> : actualité des produits, stratégie de communication, pratiques commerciales, données et statistiques publiques.</p>
<h4>La veille commerciale</h4>
<p>La veille commerciale consiste à effectuer une surveillance accrue du marché dans un intérêt purement commercial. Elle permet de mieux connaître <strong>la concurrence, les clients et les prospects</strong>, et met en avant les faiblesses et les opportunités à exploiter.</p>
<h4>Les objectifs de la veille</h4>
<ol>
<li><strong>Prévoir les changements</strong> du secteur d'activité</li>
<li><strong>Détecter des menaces</strong> directes et indirectes</li>
<li><strong>Anticiper les opportunités</strong> et tendances émergentes</li>
<li><strong>Détecter des leads</strong> qualifiés</li>
<li><strong>Mieux connaître ses prospects</strong> pour les transformer en clients</li>
<li><strong>Suivre ses clients</strong> et leur environnement pour mieux les fidéliser</li>
</ol>`
        },
        {
          title: "3.2 – Les types de veille",
          content: `<h3>Huit types de veille à organiser</h3>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr><th>Type de veille</th><th>Objet de la surveillance</th></tr>
<tr><td><strong>Veille concurrentielle</strong></td><td>Stratégies, produits et communication des concurrents</td></tr>
<tr><td><strong>Veille commerciale</strong></td><td>Clients, prospects, fournisseurs, marchés</td></tr>
<tr><td><strong>Veille technologique</strong></td><td>Innovations, brevets, R&amp;D du secteur</td></tr>
<tr><td><strong>Veille juridique</strong></td><td>Évolutions législatives et réglementaires</td></tr>
<tr><td><strong>Veille sociétale</strong></td><td>Évolutions sociales, démographiques, culturelles</td></tr>
<tr><td><strong>Veille sur le marché</strong></td><td>Tendances macroéconomiques et sectorielles</td></tr>
<tr><td><strong>Veille e-réputation</strong></td><td>Image de l'entreprise sur Internet et les réseaux sociaux</td></tr>
<tr><td><strong>Veille d'opinion</strong></td><td>Avis clients, perceptions du public</td></tr>
</table>`
        },
        {
          title: "3.3 – Les cinq étapes de la veille",
          content: `<h3>Une démarche structurée en 5 étapes</h3>
<ol>
<li><strong>Étape 1 — Expression du besoin</strong> : définir précisément ce que l'on cherche, pourquoi et pour qui. Élaborer un plan de veille.</li>
<li><strong>Étape 2 — Recherche des sources</strong> : identifier les sources d'information pertinentes (presse, sites web, réseaux sociaux, salons, bases de données).</li>
<li><strong>Étape 3 — Collecte des informations</strong> : mettre en place des outils de capture (alertes Google, flux RSS, réseaux sociaux).</li>
<li><strong>Étape 4 — Traitement, analyse et exploitation</strong> : trier, filtrer, vérifier la fiabilité, croiser les sources, produire des synthèses.</li>
<li><strong>Étape 5 — Diffusion et protection de l'information</strong> : partager les résultats aux bonnes personnes, sécuriser les données sensibles.</li>
</ol>`
        },
        {
          title: "3.4 – Sources d'information et qualité",
          content: `<h3>Typologie de l'information</h3>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr><th>Information interne</th><td>Données issues de l'entreprise (CRM, ventes, comptabilité)</td></tr>
<tr><th>Information externe</th><td>Données provenant de sources hors entreprise</td></tr>
<tr><th>Information primaire</th><td>Brute, directement collectée (enquêtes, entretiens)</td></tr>
<tr><th>Information secondaire</th><td>Déjà traitée et publiée (études, rapports)</td></tr>
<tr><th>Information formelle</th><td>Documents officiels (presse, rapports, sites institutionnels)</td></tr>
<tr><th>Information informelle</th><td>Conversations, salons, réseaux personnels</td></tr>
</table>
<h4>Les quatre qualités d'une bonne information</h4>
<ul>
<li><strong>Pertinence</strong> : elle correspond au besoin exprimé.</li>
<li><strong>Actualité</strong> : elle est récente et à jour.</li>
<li><strong>Fiabilité</strong> : la source est crédible et vérifiable.</li>
<li><strong>Accessibilité</strong> : elle peut être obtenue dans un délai et un coût raisonnables.</li>
</ul>
<h4>Sources formelles et informelles</h4>
<ul>
<li><strong>Sources formelles</strong> : télévision, radio, presse spécialisée, organismes statistiques (INSEE, Eurostat), bases professionnelles.</li>
<li><strong>Sources informelles</strong> : salons et congrès, sources internes aux entreprises concurrentes, réseaux personnels.</li>
</ul>`
        },
        {
          title: "3.5 – Outils de veille : alertes Google et réseaux sociaux",
          content: `<h3>Créer une alerte Google en 5 étapes</h3>
<ol>
<li><strong>Écrire les mots-clés</strong> à surveiller (utiliser les guillemets pour les expressions exactes).</li>
<li><strong>Choisir la fréquence</strong> : en temps réel, une fois par jour, une fois par semaine.</li>
<li><strong>Définir la ou les sources</strong> : actualités, blogs, vidéos, livres, discussions.</li>
<li><strong>Choisir sa langue</strong> et la région géographique.</li>
<li><strong>Définir le nombre de résultats</strong> et l'adresse e-mail de réception.</li>
</ol>
<h4>Collecter l'information sur les réseaux sociaux</h4>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr><th>Réseau</th><th>Usage en veille</th></tr>
<tr><td><strong>LinkedIn</strong></td><td>Veille B2B, suivi de comptes d'entreprises, groupes professionnels, recrutement</td></tr>
<tr><td><strong>Twitter / X</strong></td><td>Veille en temps réel, hashtags sectoriels, comptes d'influenceurs</td></tr>
<tr><td><strong>Facebook</strong></td><td>Pages et groupes, perception client, communautés locales</td></tr>
<tr><td><strong>Instagram</strong></td><td>Tendances visuelles, mode, lifestyle, communication de marque</td></tr>
<tr><td><strong>TikTok</strong></td><td>Tendances émergentes, cibles jeunes, viralité</td></tr>
</table>`
        }
      ]
    },
    {
      title: "Chapitre 4 – Diagnostic stratégique : SWOT, PESTEL et 5 forces de Porter",
      description: "Maîtriser les outils du diagnostic stratégique externe et interne.",
      sections: [
        {
          title: "4.1 – L'analyse PESTEL",
          content: `<h3>Six dimensions pour le diagnostic externe</h3>
<p>La méthode <strong>PESTEL</strong> (Politique, Économique, Socioculturel, Technologique, Écologique, Légal) est un outil de diagnostic stratégique qui permet de comprendre les influences externes pouvant impacter l'activité en termes d'opportunités ou de menaces.</p>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr><th>Dimension</th><th>Exemples concrets</th></tr>
<tr><td><strong>Politique</strong></td><td>Stabilité gouvernementale, politique fiscale, accords commerciaux, guerre, dictature, facilitation à la création d'entreprise</td></tr>
<tr><td><strong>Économique</strong></td><td>PIB, inflation, taux d'intérêt, pouvoir d'achat, marchés saturés</td></tr>
<tr><td><strong>Socioculturel</strong></td><td>Habitudes de consommation, budget par foyer, tendances, démographie</td></tr>
<tr><td><strong>Technologique</strong></td><td>Ressources technologiques, niveau d'expertise, brevets, recherches</td></tr>
<tr><td><strong>Écologique</strong></td><td>Lois sur l'environnement, climat, ressources naturelles, économie circulaire</td></tr>
<tr><td><strong>Légal</strong></td><td>Code du travail, lois liées à l'activité, permis et autorisations</td></tr>
</table>`
        },
        {
          title: "4.2 – La matrice SWOT",
          content: `<h3>Croiser interne et externe</h3>
<p>L'analyse SWOT se déroule en deux temps :</p>
<ol>
<li><strong>Analyse de l'environnement interne</strong> : identification des <strong>Forces</strong> et <strong>Faiblesses</strong> de l'entreprise.</li>
<li><strong>Analyse de l'environnement externe</strong> : identification des <strong>Opportunités</strong> et <strong>Menaces</strong>.</li>
</ol>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%">
<tr><th style="background:#22c55e;color:white">Forces (Strengths)</th><th style="background:#ef4444;color:white">Faiblesses (Weaknesses)</th></tr>
<tr><td>Avantages concurrentiels, ressources distinctives, savoir-faire, notoriété, fidélité client.</td><td>Initiatives moins performantes, points à améliorer, manque de ressources, dépendance fournisseur.</td></tr>
<tr><th style="background:#3b82f6;color:white">Opportunités (Opportunities)</th><th style="background:#f59e0b;color:white">Menaces (Threats)</th></tr>
<tr><td>Nouvelles tendances, marchés émergents, évolutions réglementaires favorables.</td><td>Nouveau concurrent, évolution défavorable de la réglementation, crise économique.</td></tr>
</table>
<h4>Questions pour identifier ses faiblesses</h4>
<ul>
<li>Quelles initiatives sont moins performantes et pourquoi ?</li>
<li>Sur quels points pouvons-nous nous améliorer ?</li>
<li>Quelles ressources nous manquent pour de meilleurs résultats ?</li>
</ul>`
        },
        {
          title: "4.3 – Les 5 forces de Porter",
          content: `<h3>Évaluer l'attractivité d'un marché</h3>
<p>Le modèle de Michael Porter identifie cinq forces qui structurent l'intensité concurrentielle d'un secteur :</p>
<ol>
<li><strong>La concurrence sur le marché</strong> : intensité de la rivalité entre acteurs en place.</li>
<li><strong>La menace liée à l'arrivée de nouveaux concurrents</strong> sur le marché.</li>
<li><strong>Le pouvoir de négociation des fournisseurs</strong> : capacité à imposer prix et conditions.</li>
<li><strong>Le pouvoir de négociation des clients</strong> : capacité à exiger baisse de prix ou meilleure qualité.</li>
<li><strong>La menace des produits de substitution</strong> : alternatives qui couvrent le même besoin.</li>
</ol>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%">
<tr><td colspan="3" style="text-align:center;background:#f3f4f6"><strong>Nouveaux entrants</strong></td></tr>
<tr><td style="text-align:center;background:#f3f4f6"><strong>Pouvoir des fournisseurs</strong></td><td style="text-align:center;background:#1e3a7b;color:white"><strong>Concurrence directe</strong></td><td style="text-align:center;background:#f3f4f6"><strong>Pouvoir des clients</strong></td></tr>
<tr><td colspan="3" style="text-align:center;background:#f3f4f6"><strong>Produits de substitution</strong></td></tr>
</table>`
        },
        {
          title: "4.4 – Stratégies génériques de Porter",
          content: `<h3>Trois stratégies pour se positionner</h3>
<h4>1. La stratégie de domination par les coûts</h4>
<p>L'entreprise cherche à proposer ses produits au prix le plus bas du marché en optimisant ses coûts de production. Exemples : Lidl, Ryanair, Décathlon.</p>
<h4>2. La stratégie de différenciation</h4>
<p>L'entreprise propose une offre <strong>perçue comme unique</strong> par le client (qualité supérieure, design, service, image). Deux formes :</p>
<ul>
<li><strong>Différenciation vers le haut</strong> (sophistication) : Apple, Mercedes.</li>
<li><strong>Différenciation vers le bas</strong> (épuration) : Easyjet, Ikea.</li>
</ul>
<h4>3. La stratégie de concentration (focalisation / niche)</h4>
<p>L'entreprise se concentre sur un segment de marché très spécifique. Exemples : enseigne de mode pour femmes de forte corpulence, boutique spécialisée dans le thé ou le chocolat.</p>
<h4>La stratégie de pénétration</h4>
<p>Stratégie de prix bas à l'introduction d'un produit pour gagner rapidement des parts de marché.</p>`
        }
      ]
    },
    {
      title: "Chapitre 5 – Marketing stratégique : segmentation, ciblage, positionnement",
      description: "Construire une stratégie marketing cohérente avec le marché et les cibles.",
      sections: [
        {
          title: "5.1 – La segmentation du marché",
          content: `<h3>Découper le marché en groupes homogènes</h3>
<p>La segmentation consiste à diviser le marché en sous-ensembles homogènes (segments) selon différents critères :</p>
<ol>
<li><strong>Critères géographiques</strong> : pays, région, zone urbaine/rurale, climat.</li>
<li><strong>Critères sociodémographiques</strong> : âge, sexe, revenu, profession, taille de la famille.</li>
<li><strong>Critères psychographiques</strong> : style de vie, valeurs, personnalité, opinions.</li>
<li><strong>Critères comportementaux</strong> : fréquence d'achat, fidélité, avantages recherchés.</li>
<li><strong>Critères liés à l'acte d'achat</strong> : moment de l'achat, attitude vis-à-vis du produit, occasion.</li>
</ol>`
        },
        {
          title: "5.2 – Le ciblage : choisir ses segments prioritaires",
          content: `<h3>Trois stratégies marketing</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%">
<tr><th>Stratégie</th><th>Principe</th><th>Exemple</th></tr>
<tr><td><strong>Marketing indifférencié (de masse)</strong></td><td>Une offre unique pour tous les segments</td><td>Coca-Cola Original</td></tr>
<tr><td><strong>Marketing différencié</strong></td><td>Une offre adaptée à chaque segment</td><td>Renault (Twingo, Clio, Mégane, Talisman)</td></tr>
<tr><td><strong>Marketing concentré (niche)</strong></td><td>Une seule offre pour un seul segment</td><td>Ferrari, Rolls-Royce</td></tr>
</table>`
        },
        {
          title: "5.3 – Le positionnement",
          content: `<h3>Imposer une image distinctive</h3>
<p>Le positionnement est <strong>la place que l'entreprise souhaite occuper dans l'esprit du consommateur</strong> par rapport aux concurrents.</p>
<h4>Les axes de positionnement</h4>
<ul>
<li><strong>Par le prix</strong> : low-cost (Lidl) vs premium (Hermès).</li>
<li><strong>Par la qualité</strong> : standard vs haut de gamme.</li>
<li><strong>Par l'usage</strong> : produit pratique, ludique, professionnel.</li>
<li><strong>Par les valeurs</strong> : écologique, équitable, local.</li>
<li><strong>Par l'image</strong> : jeune, élégant, sportif.</li>
</ul>
<h4>Un bon positionnement doit être</h4>
<ul>
<li><strong>Attractif</strong> pour la cible visée</li>
<li><strong>Distinctif</strong> par rapport aux concurrents</li>
<li><strong>Crédible</strong> compte tenu des compétences de l'entreprise</li>
<li><strong>Durable</strong> dans le temps</li>
</ul>`
        },
        {
          title: "5.4 – Le mix marketing : les 5 P",
          content: `<h3>Les leviers d'action de la politique commerciale</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%">
<tr><th>P</th><th>Domaine</th><th>Variables clés</th></tr>
<tr><td><strong>Product</strong></td><td>Politique de produit</td><td>Caractéristiques, gamme, marque, packaging, qualité</td></tr>
<tr><td><strong>Price</strong></td><td>Politique de prix</td><td>Tarif, remises, conditions de paiement, écrémage / pénétration</td></tr>
<tr><td><strong>Place</strong></td><td>Politique de distribution</td><td>Canaux de vente, points de vente, logistique, e-commerce</td></tr>
<tr><td><strong>Promotion</strong></td><td>Politique de communication</td><td>Publicité, promotion des ventes, relations publiques, digital</td></tr>
<tr><td><strong>People</strong></td><td>Politique humaine</td><td>Force de vente, relation client, formation des équipes</td></tr>
</table>`
        }
      ]
    },
    {
      title: "Chapitre 6 – Politique produit et cycle de vie",
      description: "Comprendre les dimensions d'un produit et piloter son cycle de vie.",
      sections: [
        {
          title: "6.1 – Les dimensions d'un produit",
          content: `<h3>Trois dimensions complémentaires</h3>
<ul>
<li><strong>Dimension matérielle</strong> : caractéristiques physiques, composition, design, packaging.</li>
<li><strong>Dimension fonctionnelle</strong> : usage, performance, services associés (garantie, SAV, livraison).</li>
<li><strong>Dimension d'image</strong> : perception, valeurs véhiculées, statut social, marque.</li>
</ul>
<h4>La politique de gamme</h4>
<ul>
<li><strong>Largeur</strong> : nombre de lignes de produits.</li>
<li><strong>Profondeur</strong> : nombre de références par ligne.</li>
<li><strong>Cohérence</strong> : lien entre les différentes lignes (technologie, distribution, usage).</li>
</ul>`
        },
        {
          title: "6.2 – Le cycle de vie d'un produit (marketing)",
          content: `<h3>Quatre phases successives</h3>
<p>Le cycle de vie d'un produit correspond à sa <strong>durée totale de disponibilité sur le marché : depuis son lancement jusqu'à son retrait</strong>. Identifier la phase permet d'adapter la stratégie commerciale.</p>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%">
<tr><th>Phase</th><th>Caractéristiques</th><th>Stratégie marketing</th></tr>
<tr><td><strong>1. Lancement</strong></td><td>Ventes faibles, coûts élevés, peu de concurrence, perte ou faible bénéfice</td><td>Notoriété, communication intense, distribution sélective, prix d'écrémage ou de pénétration</td></tr>
<tr><td><strong>2. Croissance</strong></td><td>Ventes en forte hausse, baisse des coûts unitaires, arrivée de concurrents</td><td>Élargir la distribution, fidéliser, préférence à la marque, ajustement des prix</td></tr>
<tr><td><strong>3. Maturité</strong></td><td>Ventes stables au plus haut, marché saturé, concurrence intense, marges élevées</td><td>Différenciation, fidélisation, expérience client, optimisation des coûts, défense des parts</td></tr>
<tr><td><strong>4. Déclin</strong></td><td>Baisse des ventes, retrait progressif, arrivée de produits de substitution</td><td>Retrait du marché, relance par innovation, ciblage de niches</td></tr>
</table>`
        },
        {
          title: "6.3 – Détail des phases",
          content: `<h3>Phase 1 — Le développement et le lancement</h3>
<p><strong>Développement :</strong> transformer les idées en concepts commercialisables, solliciter les investisseurs, créer des prototypes, tester, planifier le lancement, créer le plan marketing, publier des teasers.</p>
<p><strong>Lancement :</strong> moment où le public découvre le produit. Utiliser les canaux pour cibler les audiences idéales, fournir des informations claires (caractéristiques, prix, date). Sauf produits phares (PlayStation, iPhone), les ventes initiales sont modestes et la dynamique s'installe lentement.</p>
<h3>Phase 2 — La croissance</h3>
<p>La confiance des consommateurs s'installe, la demande et les bénéfices augmentent ensemble. <strong>Danger :</strong> il suffit qu'une marque prouve qu'un marché existe pour que des concurrents s'y lancent. Il faut communiquer sur les ajustements apportés et l'amélioration de l'expérience client.</p>
<h3>Phase 3 — La maturité</h3>
<p>Les ventes progressent à un rythme lent mais régulier, l'offre et la demande sont à l'équilibre. La concurrence menace la part de marché. C'est la <strong>phase la plus rentable</strong> : ventes maintenues, coûts de fabrication maîtrisés. Les leviers : expérience client, gestion de la relation client, fidélisation.</p>
<h3>Phase 4 — Le déclin</h3>
<p>Les produits sont dépassés, la popularité chute. Un long déclin est néfaste pour la rentabilité et l'image. L'entreprise peut éviter ce résultat grâce à une marque solide ou en retirant le produit pour en lancer une nouvelle version. À terme, l'entreprise retire le produit du marché.</p>`
        },
        {
          title: "6.4 – Cycle de vie en développement durable (ACV)",
          content: `<h3>Analyse du cycle de vie : naissance, vie, mort</h3>
<p>L'<strong>Analyse du Cycle de Vie (ACV)</strong>, normalisée par les normes ISO 14040 à 14043 depuis 1994, évalue l'impact environnemental d'un produit à toutes les étapes : <strong>avant la fabrication</strong> (approvisionnement), <strong>pendant la fabrication</strong> et <strong>jusqu'à la consommation</strong> et l'élimination.</p>
<h4>Les trois grandes étapes de la vie d'un produit</h4>
<ol>
<li><strong>La naissance</strong> (production et distribution)</li>
<li><strong>La vie</strong> (utilisation par l'acquéreur)</li>
<li><strong>La mort</strong> (valorisation ou élimination)</li>
</ol>
<h4>Naissance — Production et distribution</h4>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr><th>Étape</th><th>Ressources consommées</th><th>Impacts environnementaux</th></tr>
<tr><td>Extraction des matières premières</td><td>Énergie, eau, matières premières</td><td>Épuisement des ressources, pollution</td></tr>
<tr><td>Fabrication</td><td>Énergie, eau, produits dangereux</td><td>Pollution, émissions de CO₂</td></tr>
<tr><td>Emballage</td><td>Pétrole, produits synthétiques, énergie, eau</td><td>Pollution, déchets</td></tr>
<tr><td>Transport et distribution</td><td>Carburant</td><td>Émission de CO₂, pollution de l'air</td></tr>
</table>
<h4>Vie — Utilisation</h4>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr><th>Étape</th><th>Ressources consommées</th><th>Impacts environnementaux</th></tr>
<tr><td>Transport</td><td>Carburant</td><td>Émissions de CO₂</td></tr>
<tr><td>Utilisation</td><td>Énergie, eau, matières premières, produits dangereux</td><td>Pollution, émissions de CO₂</td></tr>
<tr><td>Entretien</td><td>Énergie, eau, produits dangereux</td><td>Pollution, impact climat</td></tr>
</table>
<h4>Mort — Valorisation ou élimination</h4>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr><th>Étape</th><th>Ressources consommées</th><th>Impacts environnementaux</th></tr>
<tr><td>Valorisation (recyclage, réutilisation)</td><td>Énergie, eau, matières premières</td><td>Impact climat, émissions toxiques</td></tr>
<tr><td>Élimination (incinération, enfouissement)</td><td>Énergie</td><td>Pollution de l'air, émissions toxiques</td></tr>
</table>
<h4>L'éco-conception</h4>
<p>L'éco-conception consiste à <strong>améliorer l'impact environnemental d'un bien ou d'un service tout au long de sa chaîne de valeur</strong> : choix des matières, optimisation énergétique, durabilité, recyclabilité.</p>`
        }
      ]
    },
    {
      title: "Chapitre 7 – Politique de marque",
      description: "Construire et gérer une marque commerciale et juridique.",
      sections: [
        {
          title: "7.1 – Les qualités d'une marque",
          content: `<h3>Qualités commerciales et juridiques</h3>
<h4>Qualités commerciales</h4>
<ul>
<li><strong>Mémorisable</strong> : facile à retenir et à prononcer.</li>
<li><strong>Évocatrice</strong> : suggère les bénéfices du produit.</li>
<li><strong>Distinctive</strong> : se différencie de la concurrence.</li>
<li><strong>Déclinable</strong> à l'international (sens, prononciation).</li>
</ul>
<h4>Qualités juridiques</h4>
<ul>
<li><strong>Disponible</strong> : pas déjà déposée pour la même classe de produits.</li>
<li><strong>Distinctive</strong> au sens du droit (pas de termes génériques).</li>
<li><strong>Licite</strong> : non contraire aux bonnes mœurs et à l'ordre public.</li>
<li><strong>Non déceptive</strong> : ne trompe pas le consommateur.</li>
</ul>
<h4>Le rôle de la marque</h4>
<ul>
<li>Identifier le produit et son origine.</li>
<li>Garantir une qualité constante.</li>
<li>Différencier de la concurrence.</li>
<li>Créer un attachement émotionnel.</li>
<li>Valoriser le patrimoine de l'entreprise.</li>
</ul>`
        },
        {
          title: "7.2 – Les stratégies de marque",
          content: `<h3>Huit stratégies à connaître</h3>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr><th>Stratégie</th><th>Principe</th><th>Exemple</th></tr>
<tr><td><strong>Marque globale</strong></td><td>Une seule marque pour tous les produits</td><td>Sony, Samsung</td></tr>
<tr><td><strong>Marque ombrelle</strong></td><td>Une marque mère couvre plusieurs catégories</td><td>Nestlé, Yamaha</td></tr>
<tr><td><strong>Marque caution (mère + fille)</strong></td><td>Marque produit appuyée par marque mère</td><td>Nestlé Nesquik, Danone Activia</td></tr>
<tr><td><strong>Marque de gamme</strong></td><td>Une marque pour une gamme de produits liés</td><td>L'Oréal Studio Line</td></tr>
<tr><td><strong>Marque produit</strong></td><td>Une marque par produit</td><td>Procter &amp; Gamble (Ariel, Pampers)</td></tr>
<tr><td><strong>Marque enseigne</strong></td><td>La marque est aussi l'enseigne</td><td>Décathlon, Carrefour</td></tr>
<tr><td><strong>Marque propre (MDD)</strong></td><td>Marque de distributeur</td><td>Carrefour, Marque Repère (E.Leclerc)</td></tr>
<tr><td><strong>Marque premier prix</strong></td><td>Marque économique</td><td>Eco+, Top Budget</td></tr>
</table>`
        }
      ]
    },
    {
      title: "Chapitre 8 – Élaboration d'un plan de prospection",
      description: "Définir objectifs, cibles et plan d'action commerciale.",
      sections: [
        {
          title: "8.1 – Les objectifs et les cibles de la prospection",
          content: `<h3>Pourquoi prospecter ?</h3>
<ol>
<li><strong>Diversifier votre portefeuille client</strong> pour réduire la dépendance à quelques gros clients.</li>
<li><strong>Développer rapidement votre société</strong> en conquérant de nouveaux marchés.</li>
<li><strong>Assurer la pérennité de votre entreprise</strong> en compensant l'attrition naturelle (5 à 20 % de clients perdus chaque année).</li>
</ol>
<h4>Définir sa cible</h4>
<p>Pour définir efficacement la cible, il faut identifier de nombreuses caractéristiques :</p>
<ul>
<li>L'âge, le sexe, le domaine de travail, la profession exercée, le revenu.</li>
<li>Les habitudes de consommation, le mode de vie.</li>
<li>En B2B : taille de l'entreprise, secteur d'activité, code NAF, zone géographique, décisionnaire.</li>
</ul>`
        },
        {
          title: "8.2 – La création et la gestion d'un fichier prospects",
          content: `<h3>Trois moyens d'obtenir un fichier</h3>
<h4>a) La création d'un fichier prospects</h4>
<p>L'entreprise constitue elle-même son fichier à partir : du fichier client existant, de salons professionnels, de cartes de visite récoltées, de formulaires sur le site web, de prospection terrain et téléphonique.</p>
<h4>b) La location d'un fichier</h4>
<p>L'entreprise loue un fichier à une société spécialisée (ex. Manageo, Kompass) pour une utilisation ponctuelle. Coût modéré, mais le fichier doit être restitué.</p>
<h4>c) L'achat d'un fichier</h4>
<p>L'entreprise peut acheter un fichier de prospects, moyennant un prix élevé, auprès de sociétés spécialisées comme <strong>Kompass</strong>. Le fichier devient propriété de l'entreprise.</p>
<h4>La structuration et la qualification des fichiers</h4>
<ul>
<li><strong>Structuration</strong> : classer par secteur, taille, zone géographique, score de qualification.</li>
<li><strong>Qualification</strong> : vérifier la fiabilité des données (téléphone, email), identifier le décisionnaire, qualifier le besoin et le potentiel d'achat.</li>
</ul>`
        },
        {
          title: "8.3 – La typologie des prospects",
          content: `<h3>Classer ses prospects pour mieux prioriser</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%">
<tr><th>Type de prospect</th><th>Caractéristiques</th><th>Action commerciale</th></tr>
<tr><td><strong>Prospects froids</strong></td><td>Pas de besoin identifié à court terme</td><td>Nurturing, contenus, newsletter</td></tr>
<tr><td><strong>Prospects tièdes</strong></td><td>Besoin identifié, projet à moyen terme</td><td>Relances ciblées, démonstration</td></tr>
<tr><td><strong>Prospects chauds</strong></td><td>Réagissent positivement, projet d'achat immédiat</td><td>Rendez-vous, devis, closing</td></tr>
</table>
<h4>L'évaluation du coût de la prospection</h4>
<p>Coût d'acquisition d'un prospect = (Investissement total en prospection) / (Nombre de prospects qualifiés générés). À comparer à la valeur vie client (LTV).</p>`
        },
        {
          title: "8.4 – Le Plan d'Action Commercial (PAC)",
          content: `<h3>Structurer son action commerciale annuelle</h3>
<p>Le Plan d'Action Commercial (PAC) est le document de référence qui formalise les actions commerciales sur une période donnée (généralement un an).</p>
<h4>Les rubriques d'un PAC</h4>
<ol>
<li><strong>Diagnostic</strong> : bilan de l'année écoulée, analyse SWOT.</li>
<li><strong>Objectifs SMART</strong> : Spécifiques, Mesurables, Atteignables, Réalistes, Temporels.</li>
<li><strong>Cibles</strong> : segments prioritaires, comptes clés, prospects stratégiques.</li>
<li><strong>Stratégie commerciale</strong> : positionnement, mix marketing, axes de différenciation.</li>
<li><strong>Plan d'actions</strong> : actions terrain, digital, événementiel, partenariats.</li>
<li><strong>Moyens</strong> : équipe, budget, outils CRM, supports commerciaux.</li>
<li><strong>Planning</strong> : rétro-planning trimestriel et mensuel.</li>
<li><strong>Tableau de bord</strong> : KPI suivis (CA, marge, nombre de RDV, taux de conversion).</li>
</ol>`
        }
      ]
    },
    {
      title: "Chapitre 9 – Prospection à distance : e-mailing et téléphone",
      description: "Maîtriser les techniques de prospection digitale et téléphonique.",
      sections: [
        {
          title: "9.1 – L'e-mailing de prospection",
          content: `<h3>Objectifs de l'e-mail de prospection</h3>
<ul>
<li>Susciter l'intérêt et obtenir un rendez-vous.</li>
<li>Présenter une offre nouvelle.</li>
<li>Relancer un prospect inactif.</li>
<li>Inviter à un événement (webinaire, salon).</li>
</ul>
<h4>Les règles de fond</h4>
<ul>
<li><strong>Personnalisation</strong> : nom, prénom, contexte de l'entreprise du destinataire.</li>
<li><strong>Bénéfice clair</strong> dès les premières lignes (« What's in it for me ? »).</li>
<li><strong>Call-to-action unique</strong> : un seul objectif par e-mail.</li>
<li><strong>Concision</strong> : 100 à 150 mots maximum pour la prospection à froid.</li>
</ul>
<h4>Les règles de forme</h4>
<ul>
<li><strong>Objet accrocheur</strong> de 6 à 10 mots, sans MAJUSCULES ni emojis excessifs.</li>
<li><strong>Mise en page aérée</strong> : paragraphes courts, listes à puces.</li>
<li><strong>Signature professionnelle</strong> : nom, fonction, téléphone, lien LinkedIn.</li>
<li><strong>Compatibilité mobile</strong> : 70 % des e-mails sont lus sur mobile.</li>
</ul>
<h4>Les règles juridiques (RGPD)</h4>
<ul>
<li><strong>B2C</strong> : consentement préalable obligatoire (opt-in).</li>
<li><strong>B2B</strong> : intérêt légitime, mais le destinataire doit pouvoir se désabonner facilement.</li>
<li><strong>Mentions obligatoires</strong> : identité de l'expéditeur, lien de désinscription, finalité de la collecte.</li>
</ul>`
        },
        {
          title: "9.2 – Indicateurs d'évaluation d'une campagne d'e-mailing",
          content: `<h3>Suivre la performance de ses envois</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%">
<tr><th>Indicateur</th><th>Formule</th><th>Bon niveau (B2B)</th></tr>
<tr><td><strong>Taux de délivrabilité</strong></td><td>(E-mails délivrés / E-mails envoyés) × 100</td><td>&gt; 95 %</td></tr>
<tr><td><strong>Taux de rebond (bounce)</strong></td><td>(E-mails non délivrés / E-mails envoyés) × 100</td><td>&lt; 3 %</td></tr>
<tr><td><strong>Taux d'ouverture</strong></td><td>(E-mails ouverts / E-mails délivrés) × 100</td><td>20 à 30 %</td></tr>
<tr><td><strong>Taux de clics (CTR)</strong></td><td>(Clics / E-mails délivrés) × 100</td><td>2 à 5 %</td></tr>
<tr><td><strong>Taux de conversion</strong></td><td>(Conversions / E-mails délivrés) × 100</td><td>0,5 à 2 %</td></tr>
<tr><td><strong>Taux de désinscription</strong></td><td>(Désinscriptions / E-mails délivrés) × 100</td><td>&lt; 0,5 %</td></tr>
</table>`
        },
        {
          title: "9.3 – Le guide d'entretien téléphonique (GET) et la méthode CROC",
          content: `<h3>Construire un guide d'entretien téléphonique</h3>
<h4>Les quatre étapes d'un appel de prospection</h4>
<ol>
<li><strong>a) Contact</strong> : prise de contact, présentation, vérification de l'identité de l'interlocuteur.</li>
<li><strong>b) Raison de l'appel</strong> : phrase d'accroche présentant le bénéfice.</li>
<li><strong>c) Objet de l'appel</strong> : développer brièvement, qualifier le besoin, argumenter.</li>
<li><strong>d) Conclusion</strong> : prise de rendez-vous ou engagement, reformulation, remerciement.</li>
</ol>
<h4>La méthode CROC</h4>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%">
<tr><th>Étape</th><th>Contenu</th><th>Exemple</th></tr>
<tr><td><strong>C - Contact</strong></td><td>Saluer, se présenter, identifier l'interlocuteur</td><td>« Bonjour, Sophie Martin de la société X, je souhaiterais parler à M. Dupont. »</td></tr>
<tr><td><strong>R - Raison</strong></td><td>Expliquer le motif de l'appel</td><td>« Je vous appelle car nous accompagnons les PME de votre secteur sur... »</td></tr>
<tr><td><strong>O - Objectif</strong></td><td>Annoncer ce que l'on attend</td><td>« Je souhaiterais convenir d'un rendez-vous de 30 minutes. »</td></tr>
<tr><td><strong>C - Conclusion</strong></td><td>Confirmer, reformuler, remercier</td><td>« Nous sommes donc d'accord pour mardi 14h. Je vous envoie un mail de confirmation. »</td></tr>
</table>`
        },
        {
          title: "9.4 – Le traitement des objections",
          content: `<h3>Méthode CRAC pour traiter une objection</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%">
<tr><th>Étape</th><th>Action</th><th>Exemple de phrase</th></tr>
<tr><td><strong>C - Creuser</strong></td><td>Comprendre l'objection en profondeur</td><td>« Quand vous dites trop cher, par rapport à quoi exactement ? »</td></tr>
<tr><td><strong>R - Reformuler</strong></td><td>Montrer qu'on a compris</td><td>« Si je comprends bien, votre préoccupation est… »</td></tr>
<tr><td><strong>A - Argumenter</strong></td><td>Apporter une réponse adaptée</td><td>« Notre solution permet justement de... »</td></tr>
<tr><td><strong>C - Contrôler</strong></td><td>Vérifier la levée de l'objection</td><td>« Cela répond-il à votre interrogation ? »</td></tr>
</table>
<h4>Objections courantes et réponses types</h4>
<ul>
<li><strong>« C'est trop cher »</strong> → décomposer le prix, valoriser le ROI, comparer au coût de l'inaction.</li>
<li><strong>« Je n'ai pas le temps »</strong> → proposer un format court (15 min), un appel à un horaire choisi.</li>
<li><strong>« Nous avons déjà un fournisseur »</strong> → reconnaître, demander ce qui pourrait améliorer la situation actuelle.</li>
<li><strong>« Envoyez-moi une plaquette »</strong> → demander quelles infos précises sont attendues, fixer un point de suivi.</li>
</ul>`
        },
        {
          title: "9.5 – Indicateurs de prospection téléphonique",
          content: `<h3>Évaluer l'efficacité de la prospection téléphonique</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%">
<tr><th>Indicateur</th><th>Formule</th></tr>
<tr><td><strong>Taux de validité du fichier</strong></td><td>(Numéros valides / Numéros appelés) × 100</td></tr>
<tr><td><strong>Taux d'appels argumentés</strong></td><td>(Appels argumentés / Appels aboutis) × 100</td></tr>
<tr><td><strong>Taux de conversion en RDV</strong></td><td>(RDV obtenus / Appels argumentés) × 100</td></tr>
<tr><td><strong>Taux de transformation</strong></td><td>(Ventes / RDV honorés) × 100</td></tr>
</table>`
        }
      ]
    },
    {
      title: "Chapitre 10 – Prospection physique et terrain",
      description: "Réussir la prise de contact en face à face et la prospection terrain.",
      sections: [
        {
          title: "10.1 – La prise de contact en face à face : la règle des 4×20",
          content: `<h3>Les 20 premières secondes décident</h3>
<table border="1" cellpadding="10" cellspacing="0" style="width:100%">
<tr><th>Les 20 premières secondes</th><td>Première impression visuelle et émotionnelle. Le client juge en quelques secondes.</td></tr>
<tr><th>Les 20 premiers gestes / pas</th><td>Posture droite, démarche assurée, poignée de main ferme, attitude ouverte.</td></tr>
<tr><th>Les 20 premiers mots</th><td>Salutation claire, présentation, sourire dans la voix, vouvoiement.</td></tr>
<tr><th>Les 20 centimètres du visage</th><td>Contact visuel franc, sourire sincère, expression bienveillante.</td></tr>
</table>`
        },
        {
          title: "10.2 – L'évaluation de la prospection terrain",
          content: `<h3>Indicateurs de la prospection terrain</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%">
<tr><th>Indicateur</th><th>Formule / Calcul</th></tr>
<tr><td><strong>Effort de prospection</strong></td><td>Nombre de visites réalisées sur la période</td></tr>
<tr><td><strong>Taux de visite réalisé</strong></td><td>(Visites réalisées / Visites planifiées) × 100</td></tr>
<tr><td><strong>Nombre de prospects visités</strong></td><td>Décompte direct (hors clients existants)</td></tr>
<tr><td><strong>Nombre de RDV obtenus</strong></td><td>Issu des visites prospection à froid</td></tr>
<tr><td><strong>Taux de transformation</strong></td><td>(Ventes / Visites réalisées) × 100</td></tr>
</table>`
        },
        {
          title: "10.3 – La prise de contact en e-relation",
          content: `<h3>Vente inbound et stratégie inbound marketing</h3>
<p>L'<strong>inbound marketing</strong> consiste à attirer le client à soi par un contenu utile, plutôt qu'à aller le chercher (outbound). Le prospect entre en contact de lui-même via le site, les réseaux sociaux ou un téléchargement.</p>
<h4>Étapes de la stratégie inbound</h4>
<ol>
<li><strong>Attirer</strong> : SEO, blog, réseaux sociaux, vidéos.</li>
<li><strong>Convertir</strong> : formulaire, livre blanc, démo gratuite, lead magnet.</li>
<li><strong>Conclure</strong> : nurturing par e-mail, appel commercial qualifié.</li>
<li><strong>Fidéliser</strong> : contenus exclusifs, communauté, programme client.</li>
</ol>
<h4>Indicateurs de la prospection digitale</h4>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%">
<tr><th>Indicateur</th><th>Définition</th></tr>
<tr><td><strong>Taux d'engagement</strong></td><td>(Interactions / Impressions) × 100</td></tr>
<tr><td><strong>Taux de conversation</strong></td><td>Visiteurs ayant initié un échange / Visiteurs totaux</td></tr>
<tr><td><strong>Taux de conversion visiteur → MQL</strong></td><td>(Marketing Qualified Leads / Visiteurs) × 100</td></tr>
<tr><td><strong>Taux de conversion MQL → SQL</strong></td><td>(Sales Qualified Leads / MQL) × 100</td></tr>
<tr><td><strong>Taux de conversion SQL → RDV</strong></td><td>(RDV obtenus / SQL) × 100</td></tr>
</table>`
        }
      ]
    },
    {
      title: "Chapitre 11 – Tableau de bord commercial",
      description: "Construire et exploiter un tableau de bord pour piloter la performance.",
      sections: [
        {
          title: "11.1 – Construire un tableau de bord",
          content: `<h3>Méthodologie de construction</h3>
<ol>
<li><strong>Choix des activités</strong> à piloter : prospection, vente, fidélisation, marge.</li>
<li><strong>Choix des indicateurs</strong> pertinents pour chaque activité (3 à 5 KPI maximum par axe).</li>
<li><strong>Définition des cibles</strong> et seuils d'alerte.</li>
<li><strong>Choix de la fréquence</strong> de mise à jour : quotidien, hebdomadaire, mensuel.</li>
<li><strong>Décisions et plan d'action</strong> en fonction des écarts constatés.</li>
</ol>
<h4>Les types de tableau de bord</h4>
<ul>
<li><strong>Tableau de bord de résultats</strong> : CA, marge, nombre de commandes, panier moyen.</li>
<li><strong>Tableau de bord de l'équipe commerciale</strong> : visites, appels, RDV, taux de transformation par commercial.</li>
<li><strong>Tableau de bord d'activité</strong> : pipeline, prévisionnel, état des prospects par étape.</li>
</ul>`
        },
        {
          title: "11.2 – Indicateurs clés à analyser",
          content: `<h3>Les résultats à suivre</h3>
<ul>
<li>Nombre de visiteurs (site, point de vente)</li>
<li>Nombre d'engagements (interactions sociales, ouvertures e-mail)</li>
<li>Nombre de suiveurs (abonnés, communauté)</li>
<li>Nombre de MQL (Marketing Qualified Leads)</li>
<li>Nombre de SQL (Sales Qualified Leads)</li>
<li>Nombre de rendez-vous obtenus</li>
<li>Chiffre d'affaires</li>
<li>Nombre de commandes</li>
<li>Taux de marge</li>
</ul>
<h4>Les ratios à calculer</h4>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%">
<tr><th>Ratio</th><th>Formule</th></tr>
<tr><td><strong>Taux de marge brute</strong></td><td>((Prix de vente HT − Coût d'achat HT) / Prix de vente HT) × 100</td></tr>
<tr><td><strong>Taux de marque</strong></td><td>((Prix de vente HT − Coût d'achat HT) / Coût d'achat HT) × 100</td></tr>
<tr><td><strong>Panier moyen</strong></td><td>CA / Nombre de tickets de vente</td></tr>
<tr><td><strong>Indice de fréquentation</strong></td><td>Nombre de tickets / Nombre de visiteurs</td></tr>
<tr><td><strong>Taux de fidélité</strong></td><td>(Clients récurrents / Total clients) × 100</td></tr>
</table>`
        },
        {
          title: "11.3 – Calculs commerciaux essentiels",
          content: `<h3>Les calculs incontournables du commercial</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%">
<tr><th>Notion</th><th>Formule</th></tr>
<tr><td><strong>Prix HT depuis TTC</strong></td><td>Prix HT = Prix TTC / (1 + taux TVA)</td></tr>
<tr><td><strong>Prix TTC depuis HT</strong></td><td>Prix TTC = Prix HT × (1 + taux TVA)</td></tr>
<tr><td><strong>TVA collectée</strong></td><td>TVA = Prix HT × taux TVA</td></tr>
<tr><td><strong>Coefficient multiplicateur</strong></td><td>Coef = Prix de vente TTC / Coût d'achat HT</td></tr>
<tr><td><strong>Remise</strong></td><td>Montant remise = Prix initial × taux remise</td></tr>
<tr><td><strong>Escompte</strong></td><td>Réduction pour paiement comptant : Net = Brut × (1 − taux)</td></tr>
<tr><td><strong>Variation en %</strong></td><td>((Valeur N − Valeur N-1) / Valeur N-1) × 100</td></tr>
</table>
<h4>Exemple : calcul de marge</h4>
<p>Un produit acheté <strong>40 € HT</strong> et revendu <strong>60 € HT</strong> :</p>
<ul>
<li>Marge brute unitaire = 60 − 40 = <strong>20 €</strong></li>
<li>Taux de marge = (20 / 60) × 100 = <strong>33,33 %</strong></li>
<li>Taux de marque = (20 / 40) × 100 = <strong>50 %</strong></li>
<li>Coefficient multiplicateur (avec TVA 20 %) = 72 / 40 = <strong>1,8</strong></li>
</ul>`
        }
      ]
    },
    {
      title: "Chapitre 12 – Protection des données et RGPD",
      description: "Maîtriser les obligations légales liées au traitement des données clients.",
      sections: [
        {
          title: "12.1 – Le cadre légal de la protection des données",
          content: `<h3>Les sources légales</h3>
<ul>
<li><strong>La loi Informatique et Libertés du 6 janvier 1978</strong> : premier texte fondateur en France, instituant la CNIL.</li>
<li><strong>Le RGPD (Règlement Général sur la Protection des Données)</strong> : applicable depuis le 25 mai 2018 dans toute l'Union européenne.</li>
<li><strong>La loi du 20 juin 2018</strong> : adaptation française du RGPD.</li>
</ul>
<h4>Les principes fondamentaux du RGPD</h4>
<ul>
<li><strong>Licéité, loyauté, transparence</strong> : la collecte doit être légale et expliquée à la personne concernée.</li>
<li><strong>Limitation des finalités</strong> : usage des données strictement aligné sur l'objectif annoncé.</li>
<li><strong>Minimisation des données</strong> : ne collecter que ce qui est strictement nécessaire.</li>
<li><strong>Exactitude</strong> : maintenir les données à jour.</li>
<li><strong>Limitation de conservation</strong> : durée définie en fonction de la finalité.</li>
<li><strong>Intégrité et confidentialité</strong> : sécuriser les données contre l'accès non autorisé.</li>
</ul>`
        },
        {
          title: "12.2 – Protéger les données personnelles dans son fichier prospects",
          content: `<h3>Les bonnes pratiques</h3>
<ol>
<li><strong>Définir les objectifs du fichier</strong> : à quoi servent les données ? Pour combien de temps ?</li>
<li><strong>Vérifier la pertinence des données</strong> collectées (pas de données superflues).</li>
<li><strong>Limiter la conservation</strong> des données (3 ans après le dernier contact pour la prospection B2B/B2C en France).</li>
<li><strong>Respecter l'usage des fichiers</strong> : pas de revente, pas de transfert hors UE sans cadre.</li>
<li><strong>Respecter les droits des individus</strong> : droit d'accès, de rectification, d'opposition, à l'effacement, à la portabilité.</li>
<li><strong>Obligations de sécurité et confidentialité</strong> : mots de passe, chiffrement, accès limités, sauvegardes.</li>
</ol>
<h4>Les droits des personnes concernées</h4>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr><th>Droit</th><th>Contenu</th></tr>
<tr><td><strong>Droit d'accès</strong></td><td>Savoir si ses données sont traitées et y accéder</td></tr>
<tr><td><strong>Droit de rectification</strong></td><td>Corriger des données inexactes ou incomplètes</td></tr>
<tr><td><strong>Droit à l'effacement</strong></td><td>Demander la suppression (« droit à l'oubli »)</td></tr>
<tr><td><strong>Droit à la limitation</strong></td><td>Geler temporairement le traitement</td></tr>
<tr><td><strong>Droit à la portabilité</strong></td><td>Récupérer ses données dans un format structuré</td></tr>
<tr><td><strong>Droit d'opposition</strong></td><td>S'opposer à un traitement (notamment prospection)</td></tr>
</table>
<h4>Sanctions en cas de manquement</h4>
<p>Les sanctions du RGPD peuvent atteindre <strong>20 millions d'euros</strong> ou <strong>4 % du chiffre d'affaires mondial annuel</strong> de l'entreprise (le montant le plus élevé étant retenu).</p>`
        }
      ]
    }
  ];
}
