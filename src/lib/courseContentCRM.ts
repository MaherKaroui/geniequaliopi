import { CourseChapter } from "./courseContent";

export function getCRMChapters(): CourseChapter[] {
  return [
    {
      title: "Chapitre 1 – Introduction aux CRM et choix de l'outil",
      description: "Comprendre les enjeux de la gestion de la relation client et choisir le CRM adapté à son activité.",
      sections: [
        {
          title: "1.1 – Qu'est-ce qu'un CRM ?",
          content: `<h3>Le CRM : outil central de la relation client</h3>
<p>Un <strong>CRM (Customer Relationship Management)</strong> est un logiciel qui centralise toutes les interactions entre une entreprise et ses clients ou prospects. Il permet de suivre l'ensemble du cycle de vie client : de la prospection à la fidélisation.</p>
<h4>Les fonctionnalités clés d'un CRM</h4>
<ul>
<li><strong>Gestion des contacts</strong> : centralisation des fiches clients/prospects avec historique complet</li>
<li><strong>Pipeline de vente</strong> : suivi visuel des opportunités commerciales par étapes</li>
<li><strong>Suivi des interactions</strong> : emails, appels, réunions, notes horodatées</li>
<li><strong>Tableaux de bord</strong> : reporting commercial en temps réel</li>
<li><strong>Automatisation</strong> : workflows, relances automatiques, scoring</li>
<li><strong>Segmentation</strong> : tri et filtrage des contacts par critères</li>
</ul>
<h4>Pourquoi adopter un CRM ?</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Sans CRM</th><th>Avec CRM</th></tr>
<tr><td>Contacts éparpillés (Excel, carnets, emails)</td><td>Base centralisée et partagée</td></tr>
<tr><td>Oubli de relances et suivis</td><td>Rappels automatiques et tâches planifiées</td></tr>
<tr><td>Aucune visibilité sur le pipeline</td><td>Vue d'ensemble du tunnel de vente</td></tr>
<tr><td>Pas de données sur la performance</td><td>KPI et rapports en temps réel</td></tr>
<tr><td>Perte d'informations quand un collaborateur part</td><td>Historique client préservé</td></tr>
</table>`
        },
        {
          title: "1.2 – Panorama des solutions CRM",
          content: `<h3>Comparer les principaux CRM du marché</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>CRM</th><th>Cible</th><th>Prix</th><th>Points forts</th><th>Limites</th></tr>
<tr><td><strong>HubSpot CRM</strong></td><td>TPE/PME, startups</td><td>Gratuit (base) à 1 600€/mois</td><td>Gratuit et complet, interface intuitive, écosystème marketing intégré</td><td>Coûteux en version avancée</td></tr>
<tr><td><strong>Pipedrive</strong></td><td>Équipes commerciales</td><td>14-99€/mois/utilisateur</td><td>Pipeline visuel, simplicité, orienté vente</td><td>Moins de fonctions marketing</td></tr>
<tr><td><strong>Salesforce</strong></td><td>ETI/Grands comptes</td><td>25-300€/mois/utilisateur</td><td>Ultra-personnalisable, écosystème riche</td><td>Complexe, courbe d'apprentissage</td></tr>
<tr><td><strong>Zoho CRM</strong></td><td>TPE/PME</td><td>14-52€/mois/utilisateur</td><td>Bon rapport qualité/prix, suite Zoho</td><td>Interface moins moderne</td></tr>
<tr><td><strong>Brevo (ex-Sendinblue)</strong></td><td>TPE, e-commerce</td><td>Gratuit à 65€/mois</td><td>CRM + email marketing intégré, français, RGPD</td><td>CRM basique vs concurrents</td></tr>
<tr><td><strong>Notion / Airtable</strong></td><td>Freelances, micro-entreprises</td><td>Gratuit à 20€/mois</td><td>Flexible, personnalisable</td><td>Pas un vrai CRM, pas d'automation native</td></tr>
</table>
<h4>Critères de choix d'un CRM</h4>
<ol>
<li><strong>Taille de l'entreprise</strong> et nombre d'utilisateurs</li>
<li><strong>Budget</strong> : gratuit vs payant, coûts cachés</li>
<li><strong>Fonctionnalités essentielles</strong> : pipeline, email, automation, reporting</li>
<li><strong>Intégrations</strong> : compatibilité avec vos outils existants</li>
<li><strong>Facilité d'utilisation</strong> : courbe d'apprentissage, interface</li>
<li><strong>Conformité RGPD</strong> : hébergement des données, DPA</li>
</ol>`
        },
        {
          title: "1.3 – Configuration initiale du CRM",
          content: `<h3>Mettre en place son CRM pas à pas</h3>
<h4>Étapes de configuration (exemple HubSpot)</h4>
<ol>
<li><strong>Création du compte</strong> : inscription, paramètres de l'entreprise, fuseau horaire, devise</li>
<li><strong>Personnalisation des propriétés</strong> : champs personnalisés (secteur, source, budget...)</li>
<li><strong>Configuration du pipeline</strong> : définition des étapes de vente adaptées à votre processus</li>
<li><strong>Import des contacts</strong> : migration depuis Excel/CSV, déduplication</li>
<li><strong>Connexion email</strong> : synchronisation boîte mail pour suivi automatique</li>
<li><strong>Paramétrage des utilisateurs</strong> : rôles, permissions, équipes</li>
<li><strong>Installation du tracking</strong> : code de suivi sur le site web</li>
</ol>
<h4>Pipeline de vente type</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Description</th><th>Actions</th><th>Taux de conversion moyen</th></tr>
<tr><td>1. Nouveau lead</td><td>Contact entrant non qualifié</td><td>Premier contact sous 24h</td><td>100%</td></tr>
<tr><td>2. Qualifié</td><td>Besoin identifié, budget confirmé</td><td>Appel de découverte</td><td>60%</td></tr>
<tr><td>3. Proposition envoyée</td><td>Devis ou proposition commerciale</td><td>Envoi offre personnalisée</td><td>40%</td></tr>
<tr><td>4. Négociation</td><td>Échanges sur les conditions</td><td>Ajustements, relances</td><td>25%</td></tr>
<tr><td>5. Gagné</td><td>Contrat signé</td><td>Onboarding client</td><td>15-20%</td></tr>
<tr><td>5b. Perdu</td><td>Opportunité non concrétisée</td><td>Analyse des raisons, nurturing</td><td>–</td></tr>
</table>
<h4>Exercice pratique</h4>
<p><strong>Consigne :</strong> Créez un compte HubSpot CRM gratuit. Configurez votre pipeline de vente avec 5 étapes adaptées à votre activité. Importez 10 contacts fictifs depuis un fichier CSV fourni. Créez 3 propriétés personnalisées pertinentes pour votre secteur.</p>`
        }
      ]
    },
    {
      title: "Chapitre 2 – Gestion des contacts et segmentation",
      description: "Structurer sa base de données clients, segmenter efficacement et exploiter les données pour la prospection.",
      sections: [
        {
          title: "2.1 – Structuration de la base de données",
          content: `<h3>Organiser ses données clients</h3>
<h4>Les types d'enregistrements dans un CRM</h4>
<ul>
<li><strong>Contacts</strong> : personnes physiques (nom, email, téléphone, fonction)</li>
<li><strong>Entreprises</strong> : organisations (raison sociale, secteur, taille, CA)</li>
<li><strong>Deals/Opportunités</strong> : affaires en cours avec montant et probabilité</li>
<li><strong>Activités</strong> : tâches, appels, réunions, emails liés</li>
<li><strong>Tickets</strong> : demandes de support client</li>
</ul>
<h4>Bonnes pratiques de saisie</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Règle</th><th>Exemple bon</th><th>Exemple mauvais</th></tr>
<tr><td>Nom/Prénom séparés</td><td>Prénom: Marie | Nom: Dupont</td><td>Nom: Marie Dupont</td></tr>
<tr><td>Email professionnel</td><td>m.dupont@entreprise.fr</td><td>mariedupont@gmail.com (perso)</td></tr>
<tr><td>Téléphone standardisé</td><td>+33 6 12 34 56 78</td><td>06.12.34.56.78</td></tr>
<tr><td>Source du contact</td><td>Salon professionnel Mars 2024</td><td>(vide)</td></tr>
<tr><td>Tags/étiquettes</td><td>prospect-chaud, secteur-retail</td><td>(aucun tag)</td></tr>
</table>
<h4>Import et nettoyage de données</h4>
<ol>
<li>Exporter les contacts existants (Excel, Google Contacts, ancien CRM)</li>
<li>Nettoyer : supprimer les doublons, corriger les erreurs, standardiser les formats</li>
<li>Enrichir : ajouter les informations manquantes (LinkedIn, site web)</li>
<li>Mapper les colonnes : faire correspondre vos colonnes aux champs CRM</li>
<li>Importer par lots et vérifier</li>
</ol>`
        },
        {
          title: "2.2 – Segmentation avancée",
          content: `<h3>Segmenter pour mieux cibler</h3>
<p>La segmentation consiste à diviser sa base de contacts en groupes homogènes pour personnaliser la communication et les actions commerciales.</p>
<h4>Critères de segmentation</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type</th><th>Critères</th><th>Exemples</th></tr>
<tr><td><strong>Démographique</strong></td><td>Âge, genre, localisation, fonction</td><td>Dirigeants de PME en Île-de-France</td></tr>
<tr><td><strong>Firmographique</strong></td><td>Secteur, taille, CA, nombre de salariés</td><td>E-commerce, 10-50 salariés</td></tr>
<tr><td><strong>Comportemental</strong></td><td>Actions réalisées, pages visitées, emails ouverts</td><td>A ouvert 3+ emails ce mois</td></tr>
<tr><td><strong>Par stade</strong></td><td>Position dans le tunnel de vente</td><td>Prospects qualifiés non contactés</td></tr>
<tr><td><strong>Par valeur</strong></td><td>Panier moyen, fréquence d'achat, LTV</td><td>Clients à fort potentiel (>5K€/an)</td></tr>
</table>
<h4>Listes et vues filtrées</h4>
<ul>
<li><strong>Listes statiques</strong> : liste figée (ex: participants au salon X)</li>
<li><strong>Listes dynamiques</strong> : mise à jour automatique selon critères (ex: tous les prospects non contactés depuis 30 jours)</li>
<li><strong>Vues sauvegardées</strong> : filtres pré-enregistrés pour un accès rapide</li>
</ul>
<h4>Exercice pratique</h4>
<p><strong>Consigne :</strong> Dans votre CRM, créez 5 segments pertinents pour votre activité : 1 liste statique (événement passé), 3 listes dynamiques (prospects chauds, clients inactifs, leads à relancer), 1 vue filtrée personnalisée.</p>`
        },
        {
          title: "2.3 – Scoring et qualification des leads",
          content: `<h3>Le lead scoring : prioriser ses prospects</h3>
<p>Le <strong>lead scoring</strong> attribue un score numérique à chaque contact en fonction de critères définis, permettant de prioriser les actions commerciales.</p>
<h4>Modèle de scoring</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Action / Critère</th><th>Points</th></tr>
<tr><td>Visite de la page tarifs</td><td>+15</td></tr>
<tr><td>Téléchargement d'un lead magnet</td><td>+10</td></tr>
<tr><td>Ouverture d'un email</td><td>+3</td></tr>
<tr><td>Clic dans un email</td><td>+5</td></tr>
<tr><td>Demande de devis / formulaire de contact</td><td>+25</td></tr>
<tr><td>Participation à un webinar</td><td>+20</td></tr>
<tr><td>Inactif depuis 90 jours</td><td>-20</td></tr>
<tr><td>Désinscription newsletter</td><td>-30</td></tr>
</table>
<h4>Seuils de qualification</h4>
<ul>
<li><strong>0-20 points</strong> : Lead froid → nurturing automatisé</li>
<li><strong>21-50 points</strong> : Lead tiède → surveillance + contenu ciblé</li>
<li><strong>51-80 points</strong> : Lead chaud → contact commercial</li>
<li><strong>80+ points</strong> : Lead très chaud → appel prioritaire sous 24h</li>
</ul>`
        }
      ]
    },
    {
      title: "Chapitre 3 – Suivi commercial et reporting",
      description: "Gérer les opportunités, suivre la performance commerciale et produire des rapports d'activité.",
      sections: [
        {
          title: "3.1 – Gestion des opportunités commerciales",
          content: `<h3>Suivre ses deals de A à Z</h3>
<h4>Cycle de vie d'une opportunité</h4>
<ol>
<li><strong>Création</strong> : associer un contact, un montant estimé et une date de clôture prévisionnelle</li>
<li><strong>Qualification</strong> : confirmer le besoin, le budget et le décideur (méthode BANT)</li>
<li><strong>Proposition</strong> : rédiger et envoyer le devis/proposition</li>
<li><strong>Négociation</strong> : ajustements, objections, conditions</li>
<li><strong>Clôture</strong> : gagné (signature) ou perdu (analyse des raisons)</li>
</ol>
<h4>La méthode BANT</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Question clé</th></tr>
<tr><td><strong>B</strong>udget</td><td>Le prospect a-t-il le budget pour cette solution ?</td></tr>
<tr><td><strong>A</strong>uthority (Autorité)</td><td>Est-il le décideur ou un influenceur ?</td></tr>
<tr><td><strong>N</strong>eed (Besoin)</td><td>Le besoin est-il clairement identifié et prioritaire ?</td></tr>
<tr><td><strong>T</strong>imeline (Délai)</td><td>Quel est le calendrier de décision ?</td></tr>
</table>
<h4>Bonnes pratiques de suivi</h4>
<ul>
<li>Mettre à jour le CRM après chaque interaction</li>
<li>Planifier systématiquement la prochaine action</li>
<li>Documenter les objections et les arguments utilisés</li>
<li>Analyser les deals perdus pour identifier les axes d'amélioration</li>
</ul>`
        },
        {
          title: "3.2 – Tableaux de bord et KPI commerciaux",
          content: `<h3>Piloter son activité avec les bons indicateurs</h3>
<h4>KPI commerciaux essentiels</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>KPI</th><th>Formule</th><th>Objectif type</th></tr>
<tr><td>Taux de conversion global</td><td>Deals gagnés / Total deals × 100</td><td>15-25%</td></tr>
<tr><td>Valeur moyenne des deals</td><td>CA total / Nombre de deals gagnés</td><td>Variable par secteur</td></tr>
<tr><td>Cycle de vente moyen</td><td>Durée moyenne de la création à la clôture</td><td>< 30 jours (TPE/PME)</td></tr>
<tr><td>Taux d'activité</td><td>Nombre d'actions commerciales / semaine</td><td>≥ 20 actions/semaine</td></tr>
<tr><td>Pipeline coverage</td><td>Valeur du pipeline / Objectif CA × 100</td><td>≥ 300%</td></tr>
<tr><td>Taux de rétention</td><td>Clients conservés / Clients totaux × 100</td><td>> 85%</td></tr>
</table>
<h4>Construction d'un tableau de bord</h4>
<p>Un bon tableau de bord commercial comprend :</p>
<ol>
<li><strong>Vue pipeline</strong> : nombre et valeur des deals par étape</li>
<li><strong>Performance individuelle</strong> : activités et résultats par commercial</li>
<li><strong>Tendances</strong> : évolution mensuelle du CA et du nombre de deals</li>
<li><strong>Prévisions</strong> : CA prévisionnel pondéré par probabilité</li>
<li><strong>Alertes</strong> : deals bloqués, relances en retard, objectifs en danger</li>
</ol>`
        },
        {
          title: "3.3 – Rapports d'activité et prévisions",
          content: `<h3>Produire des rapports exploitables</h3>
<h4>Types de rapports CRM</h4>
<ul>
<li><strong>Rapport d'activité hebdomadaire</strong> : appels, emails, réunions, deals créés/clôturés</li>
<li><strong>Rapport de performance mensuel</strong> : CA, taux de conversion, pipeline, prévisions</li>
<li><strong>Rapport de segmentation</strong> : performance par segment client, source, secteur</li>
<li><strong>Rapport de satisfaction</strong> : NPS, tickets support, taux de résolution</li>
</ul>
<h4>Modèle de rapport mensuel</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Objectif</th><th>Réalisé</th><th>Écart</th><th>Action corrective</th></tr>
<tr><td>Nouveaux leads générés</td><td>50</td><td>42</td><td>-16%</td><td>Renforcer les campagnes LinkedIn Ads</td></tr>
<tr><td>Deals créés</td><td>15</td><td>18</td><td>+20%</td><td>Maintenir le rythme</td></tr>
<tr><td>Deals gagnés</td><td>5</td><td>4</td><td>-20%</td><td>Travailler les techniques de closing</td></tr>
<tr><td>CA signé</td><td>25 000€</td><td>22 500€</td><td>-10%</td><td>Focus sur les deals à forte valeur</td></tr>
<tr><td>Taux de conversion</td><td>20%</td><td>22%</td><td>+2 pt</td><td>RAS - bon résultat</td></tr>
</table>
<h4>Exercice pratique</h4>
<p><strong>Consigne :</strong> Configurez dans votre CRM un tableau de bord avec 5 KPI essentiels. Générez un rapport d'activité sur les 30 derniers jours et rédigez 3 recommandations d'optimisation basées sur les données.</p>`
        }
      ]
    },
    {
      title: "Chapitre 4 – Automations marketing : fondamentaux",
      description: "Comprendre les principes de l'automation et mettre en place ses premiers workflows automatisés.",
      sections: [
        {
          title: "4.1 – Principes de l'automation marketing",
          content: `<h3>Qu'est-ce que l'automation marketing ?</h3>
<p>L'<strong>automation marketing</strong> consiste à automatiser des actions marketing répétitives grâce à des logiciels, en définissant des règles : « Si [déclencheur], alors [action] ».</p>
<h4>Les bénéfices de l'automation</h4>
<ul>
<li><strong>Gain de temps</strong> : automatiser les tâches répétitives (relances, emails de bienvenue)</li>
<li><strong>Personnalisation à grande échelle</strong> : contenu adapté au comportement de chaque contact</li>
<li><strong>Réactivité</strong> : actions déclenchées en temps réel (formulaire → email immédiat)</li>
<li><strong>Cohérence</strong> : même qualité de suivi pour chaque prospect</li>
<li><strong>Mesurabilité</strong> : chaque étape est traçable et optimisable</li>
</ul>
<h4>Anatomie d'un workflow</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Composant</th><th>Description</th><th>Exemple</th></tr>
<tr><td><strong>Déclencheur (Trigger)</strong></td><td>Événement qui lance le workflow</td><td>Formulaire soumis, email ouvert, date atteinte</td></tr>
<tr><td><strong>Condition (If/Then)</strong></td><td>Branchement selon un critère</td><td>Si email ouvert → branche A, sinon → branche B</td></tr>
<tr><td><strong>Action</strong></td><td>Tâche automatisée</td><td>Envoyer email, créer tâche, modifier propriété</td></tr>
<tr><td><strong>Délai</strong></td><td>Temps d'attente entre les étapes</td><td>Attendre 2 jours, attendre jusqu'à lundi 9h</td></tr>
<tr><td><strong>Objectif</strong></td><td>Condition de sortie du workflow</td><td>Contact devenu client → sortie</td></tr>
</table>`
        },
        {
          title: "4.2 – Outils d'automation",
          content: `<h3>Panorama des outils d'automation</h3>
<h4>Comparatif des solutions</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Outil</th><th>Type</th><th>Prix</th><th>Points forts</th></tr>
<tr><td><strong>HubSpot Workflows</strong></td><td>CRM + Automation</td><td>Inclus dès Pro (800€/mois)</td><td>Intégré au CRM, puissant, visuel</td></tr>
<tr><td><strong>Brevo Automation</strong></td><td>Email + Automation</td><td>Gratuit à 65€/mois</td><td>Français, RGPD, email + SMS</td></tr>
<tr><td><strong>ActiveCampaign</strong></td><td>Email + CRM + Automation</td><td>29-149€/mois</td><td>Automation très avancée</td></tr>
<tr><td><strong>Make (ex-Integromat)</strong></td><td>Connecteur multi-apps</td><td>Gratuit à 29€/mois</td><td>Connecte 1000+ apps, très flexible</td></tr>
<tr><td><strong>Zapier</strong></td><td>Connecteur multi-apps</td><td>Gratuit à 49€/mois</td><td>Simple, 5000+ intégrations</td></tr>
<tr><td><strong>n8n</strong></td><td>Connecteur open source</td><td>Gratuit (self-hosted) à 20€/mois</td><td>Open source, très personnalisable</td></tr>
</table>
<h4>Choisir entre CRM natif et connecteur externe</h4>
<ul>
<li><strong>Automation CRM native</strong> (HubSpot, Brevo) : idéale pour les workflows liés au parcours client (nurturing, scoring, relances)</li>
<li><strong>Connecteurs (Make, Zapier)</strong> : idéaux pour connecter des outils hétérogènes (formulaire Typeform → CRM → Slack → Google Sheets)</li>
<li><strong>Approche hybride</strong> : combiner les deux pour une couverture complète</li>
</ul>`
        },
        {
          title: "4.3 – Premiers workflows essentiels",
          content: `<h3>Les 5 workflows indispensables pour démarrer</h3>
<h4>1. Email de bienvenue</h4>
<p><strong>Déclencheur :</strong> Nouveau contact créé via formulaire<br>
<strong>Actions :</strong> Email de bienvenue immédiat → Attendre 2 jours → Email de présentation des services → Attendre 3 jours → Email avec témoignages clients</p>

<h4>2. Lead nurturing</h4>
<p><strong>Déclencheur :</strong> Téléchargement d'un lead magnet<br>
<strong>Actions :</strong> Email de livraison → Séquence de 5 emails sur 2 semaines → Si score > 50 → Notification au commercial</p>

<h4>3. Relance des deals inactifs</h4>
<p><strong>Déclencheur :</strong> Deal sans activité depuis 14 jours<br>
<strong>Actions :</strong> Notification au commercial → Attendre 3 jours → Si toujours inactif → Email de relance automatique au prospect</p>

<h4>4. Onboarding nouveau client</h4>
<p><strong>Déclencheur :</strong> Deal marqué "Gagné"<br>
<strong>Actions :</strong> Email de bienvenue client → Créer tâche "Appel de kickoff" → Attendre 7 jours → Email de suivi satisfaction</p>

<h4>5. Demande d'avis / NPS</h4>
<p><strong>Déclencheur :</strong> 30 jours après la première commande<br>
<strong>Actions :</strong> Email avec questionnaire NPS → Si score ≥ 9 → Demande de témoignage → Si score ≤ 6 → Notification support</p>

<h4>Exercice pratique</h4>
<p><strong>Consigne :</strong> Configurez le workflow "Email de bienvenue" dans HubSpot ou Brevo. Créez 3 emails avec un délai de 2 jours entre chaque. Testez le workflow en vous inscrivant vous-même via le formulaire.</p>`
        }
      ]
    },
    {
      title: "Chapitre 5 – Email marketing automatisé et acquisition",
      description: "Créer des séquences email performantes, segmenter ses envois et optimiser ses campagnes.",
      sections: [
        {
          title: "5.1 – Création de séquences email",
          content: `<h3>L'art de l'email marketing automatisé</h3>
<h4>Types de séquences email</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type</th><th>Objectif</th><th>Durée</th><th>Nombre d'emails</th></tr>
<tr><td>Bienvenue</td><td>Accueillir, présenter la marque</td><td>1 semaine</td><td>3-4</td></tr>
<tr><td>Nurturing</td><td>Éduquer, créer la confiance</td><td>2-4 semaines</td><td>5-7</td></tr>
<tr><td>Vente</td><td>Convertir un prospect en client</td><td>1-2 semaines</td><td>4-6</td></tr>
<tr><td>Onboarding</td><td>Accompagner le nouveau client</td><td>1 mois</td><td>5-8</td></tr>
<tr><td>Réactivation</td><td>Réengager les contacts inactifs</td><td>2 semaines</td><td>3-4</td></tr>
<tr><td>Abandon de panier</td><td>Récupérer les ventes perdues</td><td>3 jours</td><td>3</td></tr>
</table>
<h4>Anatomie d'un email performant</h4>
<ul>
<li><strong>Objet</strong> : 30-50 caractères, curiosité ou bénéfice clair, personnalisation ({prénom})</li>
<li><strong>Preheader</strong> : complément de l'objet visible en aperçu</li>
<li><strong>Corps</strong> : court (150-300 mots), une seule idée, structuré en blocs</li>
<li><strong>CTA</strong> : un seul bouton d'action, texte actionnable ("Réservez votre place")</li>
<li><strong>Signature</strong> : humaine, avec photo et coordonnées</li>
</ul>
<h4>Métriques email à suivre</h4>
<ul>
<li><strong>Taux d'ouverture</strong> : objectif > 25% (B2B), > 20% (B2C)</li>
<li><strong>Taux de clic</strong> : objectif > 3%</li>
<li><strong>Taux de désinscription</strong> : < 0,5% par envoi</li>
<li><strong>Taux de conversion</strong> : variable selon l'objectif</li>
</ul>`
        },
        {
          title: "5.2 – Personnalisation et A/B testing",
          content: `<h3>Personnaliser pour mieux convertir</h3>
<h4>Niveaux de personnalisation</h4>
<ol>
<li><strong>Basique</strong> : prénom, nom de l'entreprise dans l'email</li>
<li><strong>Contextuel</strong> : contenu adapté au segment (secteur, fonction, stade)</li>
<li><strong>Comportemental</strong> : basé sur les actions (pages visitées, produits consultés)</li>
<li><strong>Prédictif</strong> : recommandations basées sur le scoring et l'historique</li>
</ol>
<h4>Guide A/B Testing</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément testé</th><th>Variante A</th><th>Variante B</th><th>Métrique</th></tr>
<tr><td>Objet</td><td>"Bonjour {prénom}, votre guide est prêt"</td><td>"🎁 Votre guide marketing offert"</td><td>Taux d'ouverture</td></tr>
<tr><td>CTA</td><td>Bouton bleu "En savoir plus"</td><td>Bouton orange "Je m'inscris"</td><td>Taux de clic</td></tr>
<tr><td>Heure d'envoi</td><td>Mardi 9h</td><td>Jeudi 14h</td><td>Taux d'ouverture</td></tr>
<tr><td>Longueur</td><td>Email court (100 mots)</td><td>Email détaillé (300 mots)</td><td>Taux de clic</td></tr>
</table>
<h4>Règles de l'A/B testing</h4>
<ul>
<li>Tester <strong>un seul élément à la fois</strong></li>
<li>Échantillon minimum : <strong>1 000 contacts par variante</strong></li>
<li>Durée du test : <strong>minimum 24-48 heures</strong></li>
<li>Automatiser le déploiement du gagnant</li>
</ul>`
        },
        {
          title: "5.3 – Conformité RGPD et délivrabilité",
          content: `<h3>Respecter le RGPD et optimiser la délivrabilité</h3>
<h4>Obligations RGPD pour l'email marketing</h4>
<ul>
<li><strong>Consentement explicite</strong> : opt-in clair et non pré-coché</li>
<li><strong>Double opt-in</strong> : recommandé (email de confirmation)</li>
<li><strong>Lien de désinscription</strong> : obligatoire dans chaque email</li>
<li><strong>Identification de l'expéditeur</strong> : nom et adresse de l'entreprise</li>
<li><strong>Droit d'accès et de suppression</strong> : pouvoir répondre aux demandes sous 30 jours</li>
<li><strong>Registre de traitement</strong> : documenter les finalités et les bases légales</li>
</ul>
<h4>Optimiser la délivrabilité</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Facteur</th><th>Action</th></tr>
<tr><td>Authentification</td><td>Configurer SPF, DKIM et DMARC</td></tr>
<tr><td>Réputation</td><td>Commencer par de petits volumes, monter progressivement</td></tr>
<tr><td>Liste propre</td><td>Supprimer les hard bounces, désinscrits et inactifs</td></tr>
<tr><td>Contenu</td><td>Éviter les spam words, ratio texte/image équilibré</td></tr>
<tr><td>Engagement</td><td>Envoyer à des contacts engagés en priorité</td></tr>
</table>`
        }
      ]
    },
    {
      title: "Chapitre 6 – Automations avancées, intégrations et projet final",
      description: "Maîtriser les automations multi-canal, connecter ses outils et mettre en pratique sur un cas réel.",
      sections: [
        {
          title: "6.1 – Automations multi-canal et intégrations",
          content: `<h3>Connecter ses outils pour une automation complète</h3>
<h4>Architecture d'un écosystème automatisé</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Couche</th><th>Outils</th><th>Rôle</th></tr>
<tr><td>Acquisition</td><td>Site web, landing pages, formulaires, réseaux sociaux</td><td>Capturer les leads</td></tr>
<tr><td>CRM</td><td>HubSpot, Pipedrive, Zoho</td><td>Centraliser les données</td></tr>
<tr><td>Automation email</td><td>Brevo, ActiveCampaign, Mailchimp</td><td>Nurturing et conversion</td></tr>
<tr><td>Connecteurs</td><td>Make, Zapier, n8n</td><td>Lier les outils entre eux</td></tr>
<tr><td>Communication</td><td>Slack, Teams</td><td>Notifications internes</td></tr>
<tr><td>Facturation</td><td>Stripe, Pennylane, QuickBooks</td><td>Automatiser la facturation</td></tr>
<tr><td>Support</td><td>Zendesk, Crisp, Intercom</td><td>Gérer le support client</td></tr>
</table>
<h4>Exemples de scénarios Make/Zapier</h4>
<ol>
<li><strong>Formulaire → CRM → Slack</strong> : nouveau lead Typeform → création contact HubSpot → notification Slack au commercial</li>
<li><strong>Calendrier → CRM → Email</strong> : RDV Calendly confirmé → mise à jour CRM → email de confirmation personnalisé</li>
<li><strong>Paiement → CRM → Onboarding</strong> : paiement Stripe → deal marqué "Gagné" → séquence onboarding déclenchée</li>
<li><strong>Avis Google → Tableau de bord</strong> : nouvel avis Google → ajout Google Sheets → notification si avis négatif</li>
</ol>`
        },
        {
          title: "6.2 – Analyse, optimisation et RGPD",
          content: `<h3>Optimiser ses automations dans la durée</h3>
<h4>KPI des automations</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>KPI</th><th>Mesure</th><th>Objectif</th></tr>
<tr><td>Taux de complétion du workflow</td><td>Contacts ayant terminé / contacts entrés × 100</td><td>> 60%</td></tr>
<tr><td>Taux de conversion du workflow</td><td>Contacts convertis / contacts entrés × 100</td><td>> 5%</td></tr>
<tr><td>Temps moyen dans le workflow</td><td>Durée moyenne avant conversion ou sortie</td><td>Variable</td></tr>
<tr><td>Taux de sortie par étape</td><td>Contacts sortis à chaque étape</td><td>Identifier les points de friction</td></tr>
<tr><td>ROI de l'automation</td><td>(CA généré - Coût outils) / Coût outils × 100</td><td>> 300%</td></tr>
</table>
<h4>Checklist de conformité RGPD pour les automations</h4>
<ul>
<li>☐ Consentement collecté avant toute automation</li>
<li>☐ Finalité du traitement documentée</li>
<li>☐ Durée de conservation des données définie</li>
<li>☐ Sous-traitants (outils) conformes RGPD (DPA signé)</li>
<li>☐ Droit de désinscription facile et effectif</li>
<li>☐ Registre des traitements à jour</li>
<li>☐ Politique de confidentialité accessible</li>
</ul>`
        },
        {
          title: "6.3 – Projet final : mise en place complète",
          content: `<h3>Projet final évalué</h3>
<h4>Cahier des charges du projet</h4>
<p>Mettre en place un <strong>système CRM + automation complet</strong> pour un cas réel ou simulé :</p>
<ol>
<li><strong>Configuration CRM</strong> : pipeline de vente, propriétés personnalisées, import de 20+ contacts</li>
<li><strong>Segmentation</strong> : 3 listes dynamiques, 1 modèle de scoring</li>
<li><strong>Tableau de bord</strong> : 5 KPI avec objectifs</li>
<li><strong>3 workflows automatisés</strong> : bienvenue, nurturing, relance</li>
<li><strong>Séquence email</strong> : 5 emails avec personnalisation et CTA</li>
<li><strong>Intégration</strong> : connexion d'au moins 2 outils via Make ou Zapier</li>
<li><strong>Conformité</strong> : documentation RGPD (registre, politique, opt-in)</li>
</ol>
<h4>Grille d'évaluation</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Pondération</th><th>Non acquis</th><th>En cours</th><th>Acquis</th><th>Maîtrisé</th></tr>
<tr><td>Configuration CRM</td><td>20%</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Qualité de la segmentation</td><td>15%</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Pertinence des workflows</td><td>20%</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Qualité des emails</td><td>15%</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Intégrations fonctionnelles</td><td>10%</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Reporting et KPI</td><td>10%</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Conformité RGPD</td><td>10%</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
</table>
<h4>Auto-évaluation finale</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Compétence</th><th>Non acquis</th><th>En cours</th><th>Acquis</th><th>Maîtrisé</th></tr>
<tr><td>Choisir et configurer un CRM</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Gérer une base de contacts structurée</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Segmenter et qualifier des leads</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Créer des workflows automatisés</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Concevoir des séquences email</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Connecter des outils via Make/Zapier</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Analyser les performances CRM</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Respecter le RGPD</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
</table>`
        }
      ]
    }
  ];
}
