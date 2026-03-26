import { CourseChapter } from "./courseContent";

export function getWebmarketingChapters(): CourseChapter[] {
  return [
    {
      title: "Chapitre 1 – Fondamentaux du webmarketing et stratégie digitale",
      description: "Comprendre l'écosystème digital, définir ses objectifs et élaborer une stratégie webmarketing cohérente.",
      sections: [
        {
          title: "1.1 – L'écosystème du marketing digital",
          content: `<h3>L'écosystème du marketing digital en 2026</h3>
<p>Le marketing digital regroupe l'ensemble des techniques marketing utilisées sur les supports et canaux digitaux. Il constitue aujourd'hui le levier de croissance principal pour la majorité des entreprises.</p>
<h4>Les piliers du marketing digital</h4>
<ul>
<li><strong>SEO (Search Engine Optimization)</strong> : référencement naturel pour apparaître dans les résultats de recherche Google</li>
<li><strong>SEA (Search Engine Advertising)</strong> : publicité payante sur les moteurs de recherche (Google Ads)</li>
<li><strong>SMO (Social Media Optimization)</strong> : optimisation de la présence sur les réseaux sociaux</li>
<li><strong>SMA (Social Media Advertising)</strong> : publicité payante sur les réseaux sociaux (Meta Ads, LinkedIn Ads)</li>
<li><strong>Content Marketing</strong> : création et diffusion de contenus à valeur ajoutée</li>
<li><strong>Email Marketing</strong> : communication directe par email (newsletters, automation)</li>
<li><strong>Marketing d'influence</strong> : collaboration avec des créateurs de contenu</li>
</ul>
<h4>Chiffres clés du digital en France (2025-2026)</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Valeur</th></tr>
<tr><td>Utilisateurs Internet en France</td><td>93% de la population</td></tr>
<tr><td>Utilisateurs actifs réseaux sociaux</td><td>52 millions</td></tr>
<tr><td>Temps moyen quotidien sur les réseaux</td><td>1h46</td></tr>
<tr><td>Part du e-commerce dans le commerce de détail</td><td>15,4%</td></tr>
<tr><td>Budget marketing digital moyen PME</td><td>5-15% du CA</td></tr>
</table>`
        },
        {
          title: "1.2 – Audit digital et analyse de marché",
          content: `<h3>Réaliser un audit digital complet</h3>
<p>Avant de définir une stratégie, il est indispensable d'analyser sa situation actuelle et celle de ses concurrents.</p>
<h4>Les étapes de l'audit digital</h4>
<ol>
<li><strong>Audit de présence</strong> : site web, réseaux sociaux, annuaires, avis clients</li>
<li><strong>Audit technique</strong> : vitesse du site, responsive design, UX/UI, sécurité</li>
<li><strong>Audit SEO</strong> : positionnement mots-clés, backlinks, contenu existant</li>
<li><strong>Audit concurrentiel</strong> : benchmarking des 3-5 principaux concurrents</li>
<li><strong>Audit e-réputation</strong> : avis Google, réseaux sociaux, forums</li>
</ol>
<h4>Outils d'audit recommandés</h4>
<ul>
<li><strong>SEMrush / Ubersuggest</strong> : analyse SEO et concurrentielle</li>
<li><strong>Google PageSpeed Insights</strong> : performance technique du site</li>
<li><strong>SimilarWeb</strong> : analyse du trafic concurrent</li>
<li><strong>Google Search Console</strong> : données de positionnement</li>
<li><strong>BuzzSumo</strong> : analyse des contenus performants</li>
</ul>
<h4>Analyse SWOT digitale</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Forces</th><th>Faiblesses</th></tr>
<tr><td>Expertise métier reconnue, base clients existante, contenu de qualité</td><td>Faible présence sur les réseaux, site web non optimisé, manque de régularité</td></tr>
<tr><th>Opportunités</th><th>Menaces</th></tr>
<tr><td>Marché en croissance, nouveaux formats (vidéo courte, IA), niches peu concurrentielles</td><td>Concurrence accrue, changements d'algorithmes, saturation de certains canaux</td></tr>
</table>`
        },
        {
          title: "1.3 – Personas et parcours client digital",
          content: `<h3>Construire ses buyer personas</h3>
<p>Un <strong>buyer persona</strong> est une représentation semi-fictive de votre client idéal, basée sur des données réelles et des hypothèses éclairées.</p>
<h4>Fiche persona type</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Exemple</th></tr>
<tr><td>Prénom fictif</td><td>Sophie, 38 ans</td></tr>
<tr><td>Profession</td><td>Responsable marketing PME</td></tr>
<tr><td>Objectifs</td><td>Augmenter la visibilité de son entreprise, générer des leads</td></tr>
<tr><td>Freins</td><td>Manque de temps, budget limité, peu de compétences techniques</td></tr>
<tr><td>Canaux préférés</td><td>LinkedIn, Instagram, newsletters</td></tr>
<tr><td>Type de contenu apprécié</td><td>Articles pratiques, tutoriels vidéo, études de cas</td></tr>
<tr><td>Critères de décision</td><td>ROI prouvé, témoignages clients, accompagnement personnalisé</td></tr>
</table>
<h4>Le parcours client digital (Customer Journey)</h4>
<ol>
<li><strong>Découverte (Awareness)</strong> : le prospect identifie un besoin → SEO, réseaux sociaux, publicité</li>
<li><strong>Considération (Consideration)</strong> : il compare les solutions → contenu éducatif, avis, cas clients</li>
<li><strong>Décision (Decision)</strong> : il choisit une solution → landing page, offre, appel à l'action</li>
<li><strong>Fidélisation (Retention)</strong> : il devient ambassadeur → email, communauté, programme de fidélité</li>
</ol>`
        },
        {
          title: "1.4 – Plan de communication digitale",
          content: `<h3>Élaborer son plan de communication digitale</h3>
<h4>Les composantes du plan</h4>
<ol>
<li><strong>Objectifs SMART</strong> : Spécifiques, Mesurables, Atteignables, Réalistes, Temporels</li>
<li><strong>Cibles</strong> : personas définis, segmentation</li>
<li><strong>Messages clés</strong> : proposition de valeur, USP (Unique Selling Proposition)</li>
<li><strong>Canaux</strong> : choix des plateformes selon les cibles</li>
<li><strong>Planning</strong> : calendrier éditorial et rythme de publication</li>
<li><strong>Budget</strong> : répartition entre organique et payant</li>
<li><strong>KPI</strong> : indicateurs de mesure par objectif</li>
</ol>
<h4>Exemple d'objectifs SMART</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Objectif</th><th>SMART</th></tr>
<tr><td>Augmenter le trafic du site</td><td>+30% de visiteurs uniques en 6 mois via le SEO et les réseaux sociaux</td></tr>
<tr><td>Générer des leads</td><td>50 leads qualifiés/mois via la landing page d'ici 3 mois</td></tr>
<tr><td>Développer la communauté</td><td>Atteindre 2 000 abonnés LinkedIn en 6 mois avec un taux d'engagement de 4%</td></tr>
<tr><td>Augmenter les ventes</td><td>+20% de CA e-commerce au T2 via les campagnes Meta Ads</td></tr>
</table>`
        }
      ]
    },
    {
      title: "Chapitre 2 – Rédaction web et référencement SEO",
      description: "Maîtriser les techniques de rédaction optimisée pour le web et le référencement naturel.",
      sections: [
        {
          title: "2.1 – Les fondamentaux du SEO",
          content: `<h3>Comprendre le référencement naturel</h3>
<p>Le SEO (Search Engine Optimization) est l'art d'optimiser un site web pour apparaître dans les premiers résultats des moteurs de recherche, principalement Google.</p>
<h4>Les 3 piliers du SEO</h4>
<ol>
<li><strong>SEO Technique</strong> : vitesse de chargement, mobile-first, architecture du site, balisage HTML, sitemap, robots.txt</li>
<li><strong>SEO On-page</strong> : contenu, mots-clés, balises title/meta, structure Hn, maillage interne, images optimisées</li>
<li><strong>SEO Off-page</strong> : backlinks, autorité de domaine, mentions, réseaux sociaux</li>
</ol>
<h4>Recherche de mots-clés</h4>
<p>La recherche de mots-clés est la première étape de toute stratégie SEO :</p>
<ul>
<li><strong>Mots-clés principaux</strong> : termes génériques à fort volume (ex: "formation marketing digital")</li>
<li><strong>Mots-clés longue traîne</strong> : expressions plus spécifiques à moindre concurrence (ex: "formation marketing digital pour entrepreneurs débutants")</li>
<li><strong>Mots-clés d'intention</strong> : informationnelle, transactionnelle, navigationnelle</li>
</ul>
<h4>Outils de recherche de mots-clés</h4>
<ul>
<li>Google Keyword Planner (gratuit)</li>
<li>Ubersuggest (freemium)</li>
<li>Answer The Public (gratuit)</li>
<li>SEMrush / Ahrefs (payant)</li>
<li>Google Trends (gratuit)</li>
<li>Also Asked (gratuit)</li>
</ul>`
        },
        {
          title: "2.2 – Techniques de rédaction web",
          content: `<h3>Rédiger pour le web</h3>
<p>La rédaction web obéit à des règles spécifiques liées au comportement des internautes (lecture en F, scanning) et aux exigences des moteurs de recherche.</p>
<h4>La méthode de la pyramide inversée</h4>
<ol>
<li>Information essentielle en premier (qui, quoi, quand, où, pourquoi)</li>
<li>Développement et détails</li>
<li>Informations complémentaires</li>
</ol>
<h4>Structure optimale d'un article SEO</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Règle</th><th>Exemple</th></tr>
<tr><td>Titre (H1)</td><td>Inclure le mot-clé principal, &lt; 60 caractères</td><td>"10 stratégies de marketing digital pour les PME en 2026"</td></tr>
<tr><td>Méta-description</td><td>150-160 caractères, incitative, mot-clé</td><td>"Découvrez les 10 stratégies marketing digital incontournables pour booster votre PME en 2026. Guide pratique et actionnable."</td></tr>
<tr><td>Introduction</td><td>Accroche + promesse + mot-clé dans les 100 premiers mots</td><td>Question ou statistique frappante</td></tr>
<tr><td>Sous-titres (H2, H3)</td><td>Hiérarchie logique, mots-clés secondaires</td><td>H2: "Stratégie n°1 : Le content marketing"</td></tr>
<tr><td>Paragraphes</td><td>Courts (3-4 lignes), une idée par paragraphe</td><td>Phrases de 15-20 mots max</td></tr>
<tr><td>Maillage interne</td><td>2-5 liens vers d'autres pages du site</td><td>Ancre textuelle descriptive</td></tr>
<tr><td>Call-to-Action</td><td>Clair, visible, incitatif</td><td>"Téléchargez notre guide gratuit"</td></tr>
</table>
<h4>Exercice pratique</h4>
<p><strong>Consigne :</strong> Rédigez un article de 800 mots optimisé SEO sur le thème "Comment développer sa visibilité sur LinkedIn en 2026". Appliquez la structure apprise : titre H1, méta-description, sous-titres H2/H3, maillage interne simulé, et CTA final.</p>`
        },
        {
          title: "2.3 – Optimisation SEO avancée",
          content: `<h3>Optimisation avancée du contenu</h3>
<h4>Le cocon sémantique</h4>
<p>Le cocon sémantique est une méthode d'organisation du contenu qui consiste à créer des grappes thématiques (topic clusters) liées entre elles par un maillage interne cohérent.</p>
<ul>
<li><strong>Page pilier (Pillar page)</strong> : contenu long et exhaustif sur un sujet principal</li>
<li><strong>Pages satellites (Cluster content)</strong> : articles détaillés sur des sous-thèmes</li>
<li><strong>Maillage interne</strong> : liens bidirectionnels entre pilier et satellites</li>
</ul>
<h4>Optimisation des images</h4>
<ul>
<li>Nommer les fichiers avec des mots-clés (ex: strategie-marketing-digital-2026.jpg)</li>
<li>Renseigner l'attribut ALT avec une description pertinente</li>
<li>Compresser les images (WebP, TinyPNG)</li>
<li>Utiliser le lazy loading</li>
</ul>
<h4>Schema Markup (données structurées)</h4>
<p>Les données structurées (Schema.org) permettent d'enrichir l'affichage de vos résultats dans Google (rich snippets) :</p>
<ul>
<li>FAQ Schema : pour les pages avec questions fréquentes</li>
<li>HowTo Schema : pour les tutoriels étape par étape</li>
<li>Article Schema : pour les articles de blog</li>
<li>LocalBusiness Schema : pour les entreprises locales</li>
</ul>`
        }
      ]
    },
    {
      title: "Chapitre 3 – Création de contenus visuels et vidéo",
      description: "Concevoir des visuels professionnels et des vidéos courtes adaptés à chaque plateforme.",
      sections: [
        {
          title: "3.1 – Design graphique pour les réseaux sociaux",
          content: `<h3>Créer des visuels professionnels</h3>
<h4>Les formats par plateforme</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Plateforme</th><th>Format post</th><th>Format story/reel</th><th>Spécificités</th></tr>
<tr><td>Instagram</td><td>1080x1080 (carré) ou 1080x1350 (portrait)</td><td>1080x1920</td><td>Privilégier les carrousels et Reels</td></tr>
<tr><td>Facebook</td><td>1200x630</td><td>1080x1920</td><td>Visuels avec peu de texte (&lt;20%)</td></tr>
<tr><td>LinkedIn</td><td>1200x627 ou 1080x1080</td><td>N/A</td><td>Infographies et carrousels PDF</td></tr>
<tr><td>TikTok</td><td>N/A</td><td>1080x1920</td><td>100% vidéo, format vertical</td></tr>
<tr><td>Pinterest</td><td>1000x1500</td><td>1080x1920</td><td>Format portrait obligatoire</td></tr>
</table>
<h4>Principes de design</h4>
<ul>
<li><strong>Hiérarchie visuelle</strong> : titre &gt; sous-titre &gt; corps &gt; CTA</li>
<li><strong>Règle des tiers</strong> : placer les éléments clés aux intersections</li>
<li><strong>Contraste</strong> : assurer la lisibilité sur mobile</li>
<li><strong>Cohérence</strong> : respecter la charte graphique sur tous les supports</li>
<li><strong>Simplicité</strong> : un message par visuel</li>
</ul>
<h4>Outils de création visuelle</h4>
<ul>
<li><strong>Canva Pro</strong> : outil n°1 pour la création de visuels professionnels</li>
<li><strong>Adobe Express</strong> : alternative Adobe simplifiée</li>
<li><strong>Figma</strong> : design collaboratif avancé</li>
<li><strong>Remove.bg</strong> : suppression de fond automatique</li>
<li><strong>Unsplash / Pexels</strong> : banques d'images libres de droits</li>
</ul>`
        },
        {
          title: "3.2 – Production vidéo courte",
          content: `<h3>Maîtriser la vidéo courte (Reels, TikTok, Shorts)</h3>
<p>La vidéo courte est le format le plus engageant sur les réseaux sociaux en 2026, avec un taux d'engagement 2 à 3 fois supérieur aux posts statiques.</p>
<h4>Les types de vidéos courtes performantes</h4>
<ol>
<li><strong>Tutoriel express</strong> : "Comment faire X en 60 secondes"</li>
<li><strong>Avant/Après</strong> : transformation visuelle</li>
<li><strong>Coulisses (Behind the scenes)</strong> : authenticité et proximité</li>
<li><strong>Témoignage client</strong> : preuve sociale</li>
<li><strong>Tendance / Challenge</strong> : surfer sur les trends</li>
<li><strong>Storytelling</strong> : raconter une histoire en 30-90 secondes</li>
</ol>
<h4>Structure d'une vidéo courte efficace</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Timing</th><th>Élément</th><th>Objectif</th></tr>
<tr><td>0-3 secondes</td><td>Hook / Accroche</td><td>Capter l'attention immédiatement</td></tr>
<tr><td>3-25 secondes</td><td>Contenu / Valeur</td><td>Délivrer l'information ou le divertissement</td></tr>
<tr><td>25-30 secondes</td><td>CTA / Conclusion</td><td>Inciter à l'action (suivre, commenter, partager)</td></tr>
</table>
<h4>Outils de montage recommandés</h4>
<ul>
<li><strong>CapCut</strong> : montage vidéo gratuit avec templates tendance</li>
<li><strong>InShot</strong> : montage simple sur smartphone</li>
<li><strong>Descript</strong> : montage par transcription (édition texte = édition vidéo)</li>
<li><strong>Opus Clip</strong> : découpage automatique de vidéos longues en shorts (IA)</li>
</ul>`
        },
        {
          title: "3.3 – Charte graphique digitale",
          content: `<h3>Créer sa charte graphique digitale</h3>
<p>La charte graphique garantit la cohérence visuelle de tous vos supports de communication.</p>
<h4>Éléments de la charte graphique digitale</h4>
<ol>
<li><strong>Logo</strong> : versions couleur, N&B, monochrome, favicon</li>
<li><strong>Palette de couleurs</strong> : couleur principale, secondaire, accent, neutres (codes HEX et RGB)</li>
<li><strong>Typographies</strong> : police titre, police corps, police accent (Google Fonts recommandées)</li>
<li><strong>Iconographie</strong> : style d'icônes, style photographique</li>
<li><strong>Templates</strong> : modèles de posts, stories, bannières</li>
<li><strong>Tonalité</strong> : style rédactionnel, émojis autorisés, hashtags récurrents</li>
</ol>
<h4>Exercice pratique</h4>
<p><strong>Consigne :</strong> Créez votre charte graphique digitale sur Canva comprenant : logo, palette de 5 couleurs, 2 typographies, 3 templates de posts Instagram et 1 template de story. Exportez le tout en PDF.</p>`
        }
      ]
    },
    {
      title: "Chapitre 4 – Réseaux sociaux et community management",
      description: "Gérer efficacement sa présence sur les réseaux sociaux et animer une communauté engagée.",
      sections: [
        {
          title: "4.1 – Stratégie réseaux sociaux par plateforme",
          content: `<h3>Choisir et maîtriser ses plateformes</h3>
<h4>Comparatif des plateformes en 2026</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Plateforme</th><th>Audience principale</th><th>Format star</th><th>Idéal pour</th></tr>
<tr><td>LinkedIn</td><td>Professionnels 25-55 ans</td><td>Carrousel, article, vidéo native</td><td>B2B, personal branding, recrutement</td></tr>
<tr><td>Instagram</td><td>18-45 ans</td><td>Reels, carrousel, stories</td><td>B2C, lifestyle, e-commerce, image de marque</td></tr>
<tr><td>Facebook</td><td>30-65 ans</td><td>Vidéo, groupe, événement</td><td>Communauté locale, publicité ciblée</td></tr>
<tr><td>TikTok</td><td>16-35 ans</td><td>Vidéo courte verticale</td><td>Viralité, notoriété, génération Z</td></tr>
<tr><td>YouTube</td><td>Toutes tranches</td><td>Vidéo longue, Shorts</td><td>SEO vidéo, tutoriels, contenu evergreen</td></tr>
<tr><td>Pinterest</td><td>25-45 ans (70% femmes)</td><td>Épingle visuelle</td><td>Inspiration, déco, mode, recettes</td></tr>
</table>
<h4>Fréquence de publication recommandée</h4>
<ul>
<li><strong>LinkedIn</strong> : 3-5 posts/semaine</li>
<li><strong>Instagram</strong> : 4-7 posts/semaine + stories quotidiennes</li>
<li><strong>Facebook</strong> : 3-5 posts/semaine</li>
<li><strong>TikTok</strong> : 1-3 vidéos/jour (idéal) ou 5-7/semaine</li>
<li><strong>YouTube</strong> : 1-2 vidéos/semaine + 3-5 Shorts</li>
</ul>`
        },
        {
          title: "4.2 – Calendrier éditorial et planification",
          content: `<h3>Organiser sa production de contenu</h3>
<h4>Le calendrier éditorial</h4>
<p>Le calendrier éditorial est un outil de planification qui organise la création et la publication de contenus sur une période donnée.</p>
<h4>Modèle de calendrier éditorial hebdomadaire</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Jour</th><th>Plateforme</th><th>Type de contenu</th><th>Thème</th><th>Objectif</th></tr>
<tr><td>Lundi</td><td>LinkedIn</td><td>Carrousel</td><td>Conseil professionnel</td><td>Autorité / Expertise</td></tr>
<tr><td>Mardi</td><td>Instagram</td><td>Reels</td><td>Tutoriel rapide</td><td>Engagement</td></tr>
<tr><td>Mercredi</td><td>Blog + LinkedIn</td><td>Article</td><td>SEO / Expertise</td><td>Trafic site</td></tr>
<tr><td>Jeudi</td><td>Instagram</td><td>Carrousel</td><td>Étude de cas</td><td>Preuve sociale</td></tr>
<tr><td>Vendredi</td><td>LinkedIn + Instagram</td><td>Post + Story</td><td>Coulisses / Humain</td><td>Proximité</td></tr>
</table>
<h4>Outils de planification</h4>
<ul>
<li><strong>Meta Business Suite</strong> : Facebook + Instagram (gratuit)</li>
<li><strong>Buffer</strong> : multi-plateformes, interface simple</li>
<li><strong>Hootsuite</strong> : solution complète entreprise</li>
<li><strong>Later</strong> : spécialisé Instagram + TikTok</li>
<li><strong>Notion / Trello</strong> : gestion de projet éditorial</li>
</ul>`
        },
        {
          title: "4.3 – Animation de communauté et engagement",
          content: `<h3>Animer sa communauté</h3>
<h4>Les règles d'or du community management</h4>
<ol>
<li><strong>Réactivité</strong> : répondre aux commentaires et messages dans les 2 heures</li>
<li><strong>Authenticité</strong> : montrer les humains derrière la marque</li>
<li><strong>Valeur</strong> : chaque post doit apporter quelque chose (information, inspiration, divertissement)</li>
<li><strong>Régularité</strong> : publier de manière constante et prévisible</li>
<li><strong>Interaction</strong> : poser des questions, créer des sondages, encourager le UGC</li>
</ol>
<h4>Techniques pour augmenter l'engagement</h4>
<ul>
<li><strong>Les hooks d'accroche</strong> : "La plupart des gens font cette erreur...", "Voici ce que personne ne vous dit sur..."</li>
<li><strong>Le storytelling</strong> : raconter des histoires personnelles ou de clients</li>
<li><strong>Les carrousels éducatifs</strong> : "Swipe pour apprendre" (taux d'enregistrement élevé)</li>
<li><strong>Les sondages et quiz</strong> : interaction directe avec l'audience</li>
<li><strong>Le UGC (User Generated Content)</strong> : contenu créé par les clients/abonnés</li>
</ul>
<h4>Gestion de la e-réputation</h4>
<ul>
<li>Configurer des alertes Google sur le nom de l'entreprise</li>
<li>Répondre systématiquement aux avis (positifs et négatifs)</li>
<li>Préparer un protocole de gestion de crise (bad buzz)</li>
<li>Utiliser des outils de veille : Mention, Brand24, Google Alerts</li>
</ul>`
        }
      ]
    },
    {
      title: "Chapitre 5 – Publicité en ligne et acquisition",
      description: "Concevoir et déployer des campagnes publicitaires performantes sur les plateformes digitales.",
      sections: [
        {
          title: "5.1 – Facebook Ads et Instagram Ads (Meta Ads)",
          content: `<h3>Maîtriser la publicité Meta</h3>
<h4>Structure d'une campagne Meta Ads</h4>
<ol>
<li><strong>Campagne</strong> : objectif (notoriété, trafic, leads, conversions, ventes)</li>
<li><strong>Ensemble de publicités</strong> : ciblage, budget, placement, planning</li>
<li><strong>Publicité</strong> : visuel, texte, CTA, landing page</li>
</ol>
<h4>Types de ciblage</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type</th><th>Description</th><th>Utilisation</th></tr>
<tr><td>Par centres d'intérêt</td><td>Cibler selon les intérêts déclarés</td><td>Prospection froide</td></tr>
<tr><td>Lookalike (similaire)</td><td>Audience similaire à vos clients</td><td>Expansion d'audience</td></tr>
<tr><td>Retargeting</td><td>Personnes ayant visité votre site</td><td>Conversion</td></tr>
<tr><td>Custom Audience</td><td>Liste de clients ou contacts</td><td>Fidélisation, upsell</td></tr>
</table>
<h4>Budget et optimisation</h4>
<ul>
<li><strong>Budget de test</strong> : 5-10€/jour par ensemble de publicités pendant 3-5 jours</li>
<li><strong>A/B Testing</strong> : tester 2-3 visuels et 2-3 textes simultanément</li>
<li><strong>Pixel Meta</strong> : installer le pixel de conversion sur le site web</li>
<li><strong>ROAS cible</strong> : viser un retour sur investissement publicitaire de 3x minimum</li>
</ul>`
        },
        {
          title: "5.2 – Google Ads",
          content: `<h3>Introduction à Google Ads</h3>
<h4>Les types de campagnes Google Ads</h4>
<ul>
<li><strong>Search (Recherche)</strong> : annonces textuelles dans les résultats Google</li>
<li><strong>Display</strong> : bannières visuelles sur les sites partenaires</li>
<li><strong>Shopping</strong> : fiches produits pour le e-commerce</li>
<li><strong>Performance Max</strong> : campagne automatisée multi-canaux (IA Google)</li>
<li><strong>YouTube Ads</strong> : publicité vidéo avant/pendant les vidéos</li>
</ul>
<h4>Structure d'une annonce Search</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Caractères max</th><th>Bonnes pratiques</th></tr>
<tr><td>Titre 1</td><td>30</td><td>Inclure le mot-clé principal</td></tr>
<tr><td>Titre 2</td><td>30</td><td>Proposition de valeur ou avantage</td></tr>
<tr><td>Titre 3</td><td>30</td><td>CTA ou offre spéciale</td></tr>
<tr><td>Description 1</td><td>90</td><td>Développer l'offre, inclure des preuves</td></tr>
<tr><td>Description 2</td><td>90</td><td>Détails supplémentaires et CTA</td></tr>
<tr><td>URL affichée</td><td>15+15</td><td>Chemin pertinent (ex: /formation/webmarketing)</td></tr>
</table>`
        },
        {
          title: "5.3 – Email marketing et tunnel de vente",
          content: `<h3>Construire un tunnel de vente digital</h3>
<h4>Les étapes du tunnel de vente</h4>
<ol>
<li><strong>Trafic</strong> : attirer des visiteurs (SEO, publicité, réseaux sociaux)</li>
<li><strong>Lead Magnet</strong> : offrir un contenu gratuit en échange d'un email (ebook, checklist, webinar)</li>
<li><strong>Landing Page</strong> : page de capture optimisée pour la conversion</li>
<li><strong>Séquence email</strong> : nurturing automatisé (5-7 emails sur 2-3 semaines)</li>
<li><strong>Offre</strong> : proposition commerciale ciblée</li>
<li><strong>Conversion</strong> : achat ou prise de rendez-vous</li>
<li><strong>Fidélisation</strong> : suivi post-achat et upsell</li>
</ol>
<h4>Séquence email type (7 emails)</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Jour</th><th>Objet</th><th>Contenu</th></tr>
<tr><td>J+0</td><td>Bienvenue + Lead Magnet</td><td>Livraison du contenu gratuit, présentation</td></tr>
<tr><td>J+2</td><td>Valeur ajoutée #1</td><td>Conseil actionnable en lien avec le lead magnet</td></tr>
<tr><td>J+4</td><td>Étude de cas</td><td>Résultats d'un client / témoignage</td></tr>
<tr><td>J+7</td><td>Valeur ajoutée #2</td><td>Erreur fréquente à éviter</td></tr>
<tr><td>J+9</td><td>Transition vers l'offre</td><td>Introduction du problème que résout votre service</td></tr>
<tr><td>J+11</td><td>Présentation de l'offre</td><td>Détails, bénéfices, prix, CTA</td></tr>
<tr><td>J+14</td><td>Dernier rappel</td><td>Urgence, FAQ, lien de prise de rendez-vous</td></tr>
</table>
<h4>Plateformes d'emailing recommandées</h4>
<ul>
<li><strong>Brevo (ex-Sendinblue)</strong> : solution française, RGPD-friendly, gratuit jusqu'à 300 emails/jour</li>
<li><strong>Mailchimp</strong> : interface intuitive, gratuit jusqu'à 500 contacts</li>
<li><strong>ConvertKit</strong> : idéal pour les créateurs de contenu</li>
<li><strong>ActiveCampaign</strong> : automation avancée pour les PME</li>
</ul>`
        }
      ]
    },
    {
      title: "Chapitre 6 – Analytics, performance et optimisation continue",
      description: "Mesurer, analyser et optimiser les résultats de sa stratégie webmarketing.",
      sections: [
        {
          title: "6.1 – Google Analytics 4 (GA4)",
          content: `<h3>Maîtriser Google Analytics 4</h3>
<h4>Les métriques essentielles</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Métrique</th><th>Définition</th><th>KPI cible</th></tr>
<tr><td>Utilisateurs actifs</td><td>Visiteurs uniques sur la période</td><td>Croissance mensuelle +10%</td></tr>
<tr><td>Sessions</td><td>Nombre de visites</td><td>Indicateur de volume</td></tr>
<tr><td>Taux de rebond</td><td>% de visiteurs quittant après 1 page</td><td>&lt; 60%</td></tr>
<tr><td>Durée moyenne de session</td><td>Temps passé sur le site</td><td>&gt; 2 minutes</td></tr>
<tr><td>Taux de conversion</td><td>% de visiteurs réalisant l'objectif</td><td>2-5% (moyenne e-commerce)</td></tr>
<tr><td>Sources de trafic</td><td>Origine des visiteurs (organique, social, payant, direct)</td><td>Diversification des sources</td></tr>
</table>
<h4>Paramètres UTM</h4>
<p>Les paramètres UTM permettent de tracer l'origine exacte du trafic :</p>
<ul>
<li><code>utm_source</code> : plateforme (facebook, linkedin, newsletter)</li>
<li><code>utm_medium</code> : canal (social, email, cpc)</li>
<li><code>utm_campaign</code> : nom de la campagne</li>
<li><code>utm_content</code> : variante (pour A/B test)</li>
</ul>
<p><strong>Exemple :</strong> <code>https://monsite.fr/formation?utm_source=linkedin&utm_medium=social&utm_campaign=lancement-formation-webmarketing</code></p>`
        },
        {
          title: "6.2 – Tableaux de bord et reporting",
          content: `<h3>Créer des rapports de performance</h3>
<h4>Modèle de rapport mensuel de performance</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Catégorie</th><th>KPI</th><th>Mois N-1</th><th>Mois N</th><th>Évolution</th><th>Objectif</th></tr>
<tr><td>Site web</td><td>Visiteurs uniques</td><td>1 200</td><td>1 450</td><td>+20,8%</td><td>1 500</td></tr>
<tr><td>Site web</td><td>Taux de conversion</td><td>2,1%</td><td>2,8%</td><td>+0,7 pt</td><td>3%</td></tr>
<tr><td>Réseaux sociaux</td><td>Abonnés totaux</td><td>850</td><td>1 120</td><td>+31,8%</td><td>1 500</td></tr>
<tr><td>Réseaux sociaux</td><td>Taux d'engagement</td><td>3,2%</td><td>4,1%</td><td>+0,9 pt</td><td>4%</td></tr>
<tr><td>Email</td><td>Taux d'ouverture</td><td>22%</td><td>28%</td><td>+6 pt</td><td>25%</td></tr>
<tr><td>Email</td><td>Taux de clic</td><td>3,5%</td><td>4,2%</td><td>+0,7 pt</td><td>5%</td></tr>
<tr><td>Publicité</td><td>Coût par lead</td><td>12€</td><td>9€</td><td>-25%</td><td>&lt; 10€</td></tr>
<tr><td>Publicité</td><td>ROAS</td><td>2,8x</td><td>3,5x</td><td>+25%</td><td>3x</td></tr>
</table>
<h4>Recommandations d'optimisation</h4>
<p>À l'issue de chaque rapport mensuel, formulez 3 à 5 recommandations d'optimisation basées sur les données analysées, en priorisant les actions à fort impact.</p>`
        },
        {
          title: "6.3 – Veille digitale et tendances",
          content: `<h3>Rester à jour dans un environnement en évolution permanente</h3>
<h4>Sources de veille recommandées</h4>
<ul>
<li><strong>Blogs spécialisés</strong> : Blog du Modérateur, Siècle Digital, Social Media Today, HubSpot Blog</li>
<li><strong>Newsletters</strong> : La Growth Machine, Marketing Examples, Morning Brew</li>
<li><strong>Podcasts</strong> : Marketing Mania, Le Gratin, The Digital Marketing Podcast</li>
<li><strong>Chaînes YouTube</strong> : Neil Patel, Gary Vaynerchuk, Danilo Duchesnes</li>
<li><strong>Outils</strong> : Google Trends, Feedly, Twitter/X listes thématiques</li>
</ul>
<h4>Tendances webmarketing 2026</h4>
<ol>
<li><strong>IA et automatisation</strong> : ChatGPT, génération de contenu, chatbots conversationnels</li>
<li><strong>Vidéo courte</strong> : formats &lt; 60 secondes dominants sur toutes les plateformes</li>
<li><strong>Social commerce</strong> : achat directement depuis les réseaux sociaux</li>
<li><strong>Personal branding</strong> : les individus deviennent des marques médias</li>
<li><strong>Zero-click content</strong> : contenu qui apporte de la valeur sans nécessiter de clic</li>
<li><strong>Authenticité et UGC</strong> : contenu brut et authentique plus performant que le contenu polishé</li>
<li><strong>Privacy-first</strong> : fin des cookies tiers, first-party data</li>
</ol>
<h4>Auto-évaluation finale</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Compétence</th><th>Non acquis</th><th>En cours</th><th>Acquis</th><th>Maîtrisé</th></tr>
<tr><td>Stratégie webmarketing</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Rédaction web / SEO</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Création visuelle</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Community management</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Publicité en ligne</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Email marketing / Tunnel de vente</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Analytics et reporting</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
</table>`
        }
      ]
    }
  ];
}
