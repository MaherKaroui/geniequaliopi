import type { CourseChapter } from "../courseContent";

export const IAP21_PARTIE3: CourseChapter[] = [
  {
    title: "Chapitre 5 – Intégrer l'IA dans ses processus et automatiser des tâches simples (C4)",
    description:
      "Cartographier ses tâches et choisir, à l'aide d'une matrice gain/risque, celles où l'IA apporte un réel bénéfice ; découvrir les fonctions d'IA intégrées aux outils bureautiques (Copilot dans Word, Excel, Outlook et Teams, selon les licences) ; utiliser l'IA dans un tableur pour écrire des formules, analyser et contrôler des données ; transcrire une réunion et en tirer un compte rendu en respectant le consentement des participants ; créer des assistants personnalisés ; mettre en place une automatisation no-code simple (Power Automate, Zapier, Make) ; mesurer le temps réellement gagné ; accompagner le changement dans une PME et bâtir son plan d'action individuel. Durée indicative : 3 h 30 (matinée du jour 3). Fil rouge : Thermia Rénov, PME fictive de rénovation énergétique à Saint-Genis-Laval (Rhône).",
    sections: [
      {
        title: "5.1 – Cartographier ses tâches et choisir où l'IA apporte un gain : la matrice gain/risque",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Recenser de manière méthodique les tâches de son poste de travail.</li>
<li>Repérer les tâches pour lesquelles l'IA générative peut apporter un gain de temps ou de qualité.</li>
<li>Évaluer le risque associé à chaque tâche (données sensibles, conséquences d'une erreur, image de l'entreprise).</li>
<li>Classer les tâches dans une matrice gain/risque et choisir par où commencer.</li>
</ul>

<h3>1. Partir du travail réel, pas de l'outil</h3>
<p>L'erreur la plus fréquente, lorsqu'une entreprise découvre l'IA générative, consiste à partir de l'outil (« Nous avons un abonnement, que pouvons-nous en faire ? ») au lieu de partir du travail (« Quelles tâches nous prennent du temps, nous fatiguent ou produisent des erreurs ? »). La première approche produit des usages anecdotiques, vite abandonnés. La seconde produit des gains mesurables, parce que l'IA est placée là où elle soulage réellement les équipes.</p>
<p>Avant d'intégrer l'IA dans un processus, il faut donc <strong>cartographier ses tâches</strong> : faire la liste de ce que l'on fait réellement au cours d'une semaine ordinaire, avec une estimation du temps passé, de la fréquence et des difficultés rencontrées. Cet exercice, simple en apparence, réserve souvent des surprises : des tâches jugées secondaires (relances, mise en forme, recherche d'informations dans des courriels anciens) occupent parfois plusieurs heures par semaine.</p>

<h3>2. La fiche de cartographie des tâches</h3>
<p>Pour chaque tâche récurrente, notez les informations suivantes. Une demi-heure suffit pour un premier inventaire, qui sera affiné au fil des semaines.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Question à se poser</th><th>Exemple (Julie, assistante administrative de Thermia Rénov)</th></tr>
<tr><td>Tâche</td><td>Que fais-je exactement ? (verbe d'action + objet)</td><td>Rédiger les courriers de relance des devis non signés.</td></tr>
<tr><td>Fréquence</td><td>Combien de fois par semaine ou par mois ?</td><td>Environ 15 courriers par semaine.</td></tr>
<tr><td>Temps unitaire</td><td>Combien de minutes à chaque fois ?</td><td>8 minutes (retrouver le devis, adapter le texte, relire).</td></tr>
<tr><td>Temps total</td><td>Fréquence × temps unitaire</td><td>2 heures par semaine.</td></tr>
<tr><td>Nature</td><td>Rédiger, résumer, chercher, calculer, classer, transformer, vérifier, décider ?</td><td>Rédiger, adapter un modèle.</td></tr>
<tr><td>Données utilisées</td><td>Quelles informations la tâche mobilise-t-elle ? Sont-elles personnelles, confidentielles ?</td><td>Nom et adresse du client, montant du devis, nature des travaux : données personnelles.</td></tr>
<tr><td>Conséquence d'une erreur</td><td>Que se passe-t-il si le résultat est faux ?</td><td>Client relancé à tort ou avec un mauvais montant : mécontentement, perte de crédibilité.</td></tr>
<tr><td>Irritants</td><td>Qu'est-ce qui est pénible, lent ou source d'oublis ?</td><td>Texte toujours identique, risque d'oublier des relances.</td></tr>
</table>
<p>Tous les chiffres de cet exemple sont fictifs. Dans votre propre entreprise, une estimation honnête suffit : l'objectif n'est pas la précision au chronomètre, mais la vue d'ensemble.</p>

<h3>3. Les tâches où l'IA générative est utile</h3>
<p>Les chapitres précédents ont montré ce que l'IA générative fait bien et ce qu'elle fait mal. On peut en tirer une grille de lecture des tâches :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type de tâche</th><th>Apport possible de l'IA</th><th>Points de vigilance</th></tr>
<tr><td>Rédiger un premier jet (courriel, courrier, publication, fiche)</td><td>Gain de temps important sur la page blanche et la mise en forme.</td><td>Relecture obligatoire, ton, exactitude des informations, aucune promesse inventée.</td></tr>
<tr><td>Résumer un document long ou un fil de courriels</td><td>Lecture accélérée, repérage des points clés.</td><td>Risque d'omission ou de déformation : revenir au texte source pour les points importants.</td></tr>
<tr><td>Reformuler, traduire, adapter un texte à un public</td><td>Très efficace, notamment pour simplifier un vocabulaire technique.</td><td>Vérifier que le sens n'a pas changé, en particulier sur les points techniques et contractuels.</td></tr>
<tr><td>Structurer des idées, préparer un plan, une réunion</td><td>Aide à ne rien oublier, propose des angles.</td><td>Les propositions restent génériques si le contexte n'est pas fourni.</td></tr>
<tr><td>Écrire une formule de tableur, une macro simple</td><td>Gain réel pour les personnes peu à l'aise avec les formules.</td><td>Tester la formule sur des cas connus avant de l'utiliser.</td></tr>
<tr><td>Calculer, compter, chiffrer</td><td>Faible : le modèle de langage n'est pas une calculatrice fiable.</td><td>Faire calculer par le tableur, pas par le texte généré.</td></tr>
<tr><td>Décider (accorder un rabais, sélectionner un candidat, valider un devis)</td><td>Aucun : la décision reste humaine.</td><td>L'IA peut préparer les éléments, jamais trancher à la place de la personne responsable.</td></tr>
<tr><td>Fournir une information réglementaire ou chiffrée</td><td>Faible sans source : risque d'hallucination.</td><td>Toujours vérifier sur une source officielle.</td></tr>
</table>

<h3>4. Évaluer le risque d'une tâche</h3>
<p>Le gain n'est qu'une moitié de l'analyse. Une tâche peut être très chronophage et pourtant mal adaptée à l'IA, parce que l'erreur y coûte cher ou parce qu'elle mobilise des données qui ne doivent pas sortir de l'entreprise. Trois critères permettent d'évaluer le risque :</p>
<ul>
<li><strong>La sensibilité des données</strong> : la tâche nécessite-t-elle de saisir des données personnelles (nom, adresse, téléphone, situation fiscale ou familiale d'un client), des informations confidentielles (prix de revient, marges, offres en cours) ou des documents couverts par le secret des affaires ? Le chapitre 6 détaille les règles applicables.</li>
<li><strong>La gravité d'une erreur</strong> : une erreur dans une publication de réseau social se corrige ; une erreur dans un devis, un courrier contractuel ou une information sur les aides publiques peut engager l'entreprise.</li>
<li><strong>L'exposition</strong> : le résultat reste-t-il interne (note de travail) ou est-il envoyé à un client, publié, transmis à un partenaire ?</li>
</ul>
<p>On peut noter chaque critère de 1 (faible) à 3 (élevé) et retenir la note la plus forte comme niveau de risque de la tâche : un seul critère élevé suffit à rendre la tâche délicate.</p>

<h3>5. La matrice gain/risque</h3>
<p>En croisant le gain potentiel (temps économisé, qualité améliorée) et le risque, on obtient quatre zones :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th></th><th>Risque faible</th><th>Risque élevé</th></tr>
<tr><td><strong>Gain élevé</strong></td><td><strong>Zone 1 – À lancer en priorité.</strong> Exemples : premier jet des publications de réseaux sociaux, reformulation de textes techniques pour le site internet, préparation de l'ordre du jour des réunions d'équipe, modèles de courriels génériques.</td><td><strong>Zone 2 – À encadrer.</strong> Exemples : relances de devis, comptes rendus de chantier, réponses aux réclamations. Possible avec des règles : données anonymisées ou outil professionnel paramétré, relecture systématique, validation par un responsable.</td></tr>
<tr><td><strong>Gain faible</strong></td><td><strong>Zone 3 – Selon les envies.</strong> Exemples : trouver un titre pour une note interne, reformuler une phrase. Utile, mais pas prioritaire dans le plan d'action.</td><td><strong>Zone 4 – À éviter.</strong> Exemples : faire calculer un montant d'aide par le chatbot, confier une décision de recrutement, saisir le dossier complet d'un client dans un outil grand public.</td></tr>
</table>
<blockquote><strong>Bonne pratique :</strong> commencez par deux ou trois tâches de la zone 1. Elles permettent d'apprendre l'outil sans danger et de montrer rapidement des résultats à l'équipe. Les tâches de la zone 2 viennent ensuite, une fois les règles de la charte d'usage (chapitre 6) établies.</blockquote>

<h3>6. Application au fil rouge : la cartographie de Thermia Rénov</h3>
<p>Lors d'une réunion d'une heure, Sandrine MOREL, dirigeante de Thermia Rénov, a demandé à chacun de lister cinq tâches récurrentes. Voici un extrait du résultat (chiffres fictifs) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Personne</th><th>Tâche</th><th>Temps hebdomadaire estimé</th><th>Gain IA</th><th>Risque</th><th>Zone</th></tr>
<tr><td>Julie</td><td>Rédiger les relances de devis</td><td>2 h</td><td>Élevé</td><td>Élevé (données clients)</td><td>2</td></tr>
<tr><td>Julie</td><td>Mettre en forme les comptes rendus de réunion d'équipe</td><td>1 h 30</td><td>Élevé</td><td>Faible</td><td>1</td></tr>
<tr><td>Karim</td><td>Rédiger les textes de présentation des solutions (PAC, isolation) pour les propositions</td><td>2 h</td><td>Élevé</td><td>Moyen (exactitude technique)</td><td>1 avec relecture technique</td></tr>
<tr><td>Karim</td><td>Estimer les aides publiques du client</td><td>1 h 30</td><td>Faible (risque d'erreur)</td><td>Élevé</td><td>4 : rester sur les simulateurs officiels</td></tr>
<tr><td>Thomas</td><td>Rédiger les comptes rendus de visite de chantier</td><td>3 h</td><td>Élevé</td><td>Moyen (noms, adresses, réserves)</td><td>2</td></tr>
<tr><td>Thomas</td><td>Chercher une information dans les notices des fabricants</td><td>1 h</td><td>Moyen</td><td>Faible (documents publics)</td><td>1</td></tr>
<tr><td>Sandrine</td><td>Rédiger les publications LinkedIn de l'entreprise</td><td>1 h</td><td>Élevé</td><td>Faible</td><td>1</td></tr>
<tr><td>Sandrine</td><td>Préparer les entretiens annuels</td><td>Saisonnier</td><td>Moyen</td><td>Élevé (données salariés)</td><td>2, uniquement pour la trame, sans données nominatives</td></tr>
</table>
<p>Sandrine décide de lancer trois usages de la zone 1 dès la semaine suivante (comptes rendus de réunion d'équipe, textes de présentation des solutions, publications) et de traiter les tâches de la zone 2 après l'adoption de la charte d'usage.</p>

<h3>7. Exercice d'application</h3>
<ol>
<li>Listez dix tâches récurrentes de votre poste, avec leur fréquence et leur temps unitaire.</li>
<li>Pour chacune, évaluez le gain potentiel de l'IA (faible, moyen, élevé) en vous appuyant sur le tableau du point 3.</li>
<li>Évaluez le risque selon les trois critères : sensibilité des données, gravité d'une erreur, exposition.</li>
<li>Placez vos tâches dans la matrice et choisissez deux tâches de la zone 1 à tester dès la semaine prochaine.</li>
</ol>
<blockquote><strong>À retenir :</strong> l'intégration de l'IA commence par une cartographie honnête des tâches. La matrice gain/risque oriente vers les usages rentables et sans danger, signale ceux qui exigent des règles et écarte ceux qui doivent rester humains.</blockquote>
`,
      },
      {
        title: "5.2 – L'IA intégrée aux outils bureautiques : Copilot dans Word, Excel, Outlook et Teams",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Distinguer un assistant conversationnel « séparé » d'une IA intégrée aux logiciels de bureautique.</li>
<li>Connaître les principales fonctions annoncées de Copilot dans Microsoft 365 et de ses équivalents.</li>
<li>Comprendre les conditions d'accès (licences, comptes professionnels, paramétrage par l'administrateur).</li>
<li>Utiliser ces fonctions avec méthode et esprit critique.</li>
</ul>

<h3>1. Deux façons d'utiliser l'IA au bureau</h3>
<p>Jusqu'ici, la formation a surtout utilisé des assistants conversationnels dans un navigateur : on ouvre ChatGPT, Le Chat, Gemini, Claude ou Copilot, on écrit une requête, on copie le résultat. Les éditeurs de logiciels de bureautique intègrent désormais l'IA <strong>directement dans les applications</strong> : traitement de texte, tableur, messagerie, visioconférence. L'IA travaille alors sur le document ouvert, sans copier-coller.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Assistant conversationnel séparé</th><th>IA intégrée à la suite bureautique</th></tr>
<tr><td>Accès</td><td>Site ou application dédiée, compte personnel ou professionnel.</td><td>Bouton ou volet dans Word, Excel, Outlook, Teams (ou Docs, Sheets, Gmail, Meet chez Google).</td></tr>
<tr><td>Contexte</td><td>Uniquement ce que vous collez ou joignez.</td><td>Le document ouvert et, selon les licences et réglages, d'autres contenus auxquels vous avez déjà accès (courriels, fichiers partagés, réunions).</td></tr>
<tr><td>Confidentialité</td><td>Dépend du type de compte et des réglages (chapitre 6).</td><td>Dans les offres entreprise, les données restent en principe dans l'environnement de l'organisation, selon les engagements contractuels de l'éditeur, à vérifier.</td></tr>
<tr><td>Coût</td><td>Versions gratuites et payantes.</td><td>Souvent une licence complémentaire par utilisateur, en plus de l'abonnement bureautique.</td></tr>
</table>

<h3>2. Une précaution préalable : fonctions, licences et versions</h3>
<p>Les fonctions d'IA des suites bureautiques évoluent très vite : les noms changent, des fonctions apparaissent en préversion, d'autres sont réservées à certaines offres ou à certains pays. Les descriptions de cette section sont donc <strong>indicatives</strong>. Avant d'en parler à vos collègues ou de bâtir un processus dessus, vérifiez :</p>
<ul>
<li>le <strong>type de licence</strong> dont vous disposez (une version gratuite de Copilot accessible avec un compte, une offre professionnelle, une licence Copilot pour Microsoft 365 attribuée par l'administrateur) ;</li>
<li>les <strong>réglages de l'administrateur</strong> de votre organisation, qui peut activer ou désactiver certaines fonctions ;</li>
<li>les <strong>conditions d'utilisation et engagements de confidentialité</strong> en vigueur pour votre offre ;</li>
<li>les <strong>prérequis techniques</strong> : certaines fonctions ne fonctionnent que sur des fichiers enregistrés dans l'espace en ligne de l'entreprise (OneDrive, SharePoint), ou avec des données mises sous forme de tableau dans Excel.</li>
</ul>

<h3>3. Copilot dans Word</h3>
<p>Dans le traitement de texte, l'IA intégrée propose généralement de :</p>
<ul>
<li><strong>rédiger un brouillon</strong> à partir d'une consigne, éventuellement en s'appuyant sur d'autres fichiers que vous désignez ;</li>
<li><strong>réécrire</strong> un passage sélectionné (plus court, plus formel, plus simple) ;</li>
<li><strong>résumer</strong> un document long et répondre à des questions sur son contenu ;</li>
<li><strong>transformer</strong> du texte en tableau, ou proposer une structure de document.</li>
</ul>
<p><strong>Exemple Thermia Rénov :</strong> Karim ouvre le modèle de proposition commerciale et demande : « À partir de la fiche technique jointe, rédige un paragraphe de 120 mots expliquant à un particulier le fonctionnement d'une pompe à chaleur air/eau, sans jargon et sans chiffre de performance. » Il relit, corrige un terme technique impropre, et insère le paragraphe dans sa bibliothèque de textes validés.</p>

<h3>4. Copilot dans Excel</h3>
<p>Dans le tableur, les fonctions annoncées portent sur :</p>
<ul>
<li>la <strong>suggestion de formules</strong> et de colonnes calculées à partir d'une demande en langage courant ;</li>
<li>la <strong>mise en évidence</strong> de données (valeurs les plus élevées, anomalies), le tri et le filtrage ;</li>
<li>la <strong>création de graphiques</strong> et de tableaux croisés dynamiques ;</li>
<li>l'<strong>explication</strong> d'une formule existante.</li>
</ul>
<p>La section 5.3 développe l'usage de l'IA dans un tableur, y compris avec un assistant conversationnel séparé.</p>

<h3>5. Copilot dans Outlook</h3>
<p>Dans la messagerie, les usages les plus courants sont :</p>
<ul>
<li><strong>résumer un long fil de discussion</strong> pour en dégager les décisions et les questions en suspens ;</li>
<li><strong>proposer un brouillon de réponse</strong>, avec un ton et une longueur à choisir ;</li>
<li><strong>donner des conseils de rédaction</strong> sur un courriel (clarté, ton, formule de politesse).</li>
</ul>
<p><strong>Point de vigilance :</strong> un brouillon de réponse généré à partir d'un fil de courriels peut reprendre des affirmations du client sans les vérifier, ou formuler des engagements (« nous interviendrons la semaine prochaine ») que personne n'a validés. Relisez chaque phrase comme si vous l'aviez écrite vous-même : c'est vous qui l'envoyez.</p>

<h3>6. Copilot dans Teams</h3>
<p>Dans la visioconférence, l'IA peut, selon les licences et à condition que la transcription soit activée :</p>
<ul>
<li>produire un <strong>résumé de réunion</strong> avec les points abordés et les actions décidées ;</li>
<li>répondre à des questions pendant ou après la réunion (« Qu'a-t-on décidé sur le planning du chantier ? ») ;</li>
<li>résumer les échanges d'une conversation de groupe.</li>
</ul>
<p>La transcription et l'enregistrement des réunions posent des questions particulières d'information et de consentement des participants, traitées en section 5.4.</p>

<h3>7. Les équivalents chez d'autres éditeurs</h3>
<p>La logique est comparable chez d'autres éditeurs : Google intègre Gemini dans Gmail, Docs, Sheets et Meet selon les offres Google Workspace ; d'autres outils de messagerie, de prise de notes ou de gestion de projet proposent leurs propres fonctions d'IA. Pour une PME, le choix dépend d'abord de la suite bureautique déjà utilisée : il est rarement pertinent de changer d'environnement pour une fonction d'IA.</p>

<h3>8. Méthode d'utilisation des IA intégrées</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Ce qu'il faut faire</th></tr>
<tr><td>1. Formuler une demande complète</td><td>Les règles du prompt vues au chapitre 3 s'appliquent : contexte, tâche, format, contraintes. « Résume » donne un résultat moyen ; « Résume ce fil en cinq points, puis liste les questions du client restées sans réponse » donne un résultat utile.</td></tr>
<tr><td>2. Désigner les bonnes sources</td><td>Indiquez quel document ou quel fil utiliser. Une IA qui « cherche partout » peut mélanger des versions anciennes et récentes.</td></tr>
<tr><td>3. Vérifier</td><td>Contrôlez les chiffres, les dates, les noms et les engagements par rapport au document source.</td></tr>
<tr><td>4. Personnaliser</td><td>Ajoutez ce que seule une personne de l'entreprise sait : l'historique avec ce client, la contrainte du chantier, le ton maison.</td></tr>
<tr><td>5. Garder une trace</td><td>Pour les documents importants, conservez la version validée et notez qu'elle a été préparée avec l'aide de l'IA si la charte de l'entreprise le prévoit.</td></tr>
</table>
<blockquote><strong>Bonne pratique :</strong> une IA intégrée accède à ce que vous pouvez déjà consulter. Si les droits d'accès aux dossiers partagés de l'entreprise sont trop larges (par exemple, un dossier « RH » ouvert à tous), l'IA peut faire remonter des informations à des personnes qui ne devraient pas les voir. Avant de déployer ce type d'outil, faites vérifier les droits d'accès des dossiers partagés.</blockquote>
<blockquote><strong>À retenir :</strong> Copilot et ses équivalents font gagner du temps parce qu'ils travaillent directement sur vos documents. Les fonctions varient selon les licences et évoluent souvent : vérifiez ce dont vous disposez réellement, maîtrisez les droits d'accès, et relisez tout ce qui sort de l'entreprise.</blockquote>
`,
      },
      {
        title: "5.3 – L'IA dans un tableur : écrire des formules, analyser et contrôler des données",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Faire écrire et expliquer une formule de tableur par une IA.</li>
<li>Préparer une analyse de données (tri, regroupement, tableau croisé, graphique) avec l'aide de l'IA.</li>
<li>Contrôler systématiquement les résultats produits.</li>
<li>Protéger les données lorsque le tableau contient des informations personnelles ou confidentielles.</li>
</ul>

<h3>1. Ce que l'IA apporte dans un tableur</h3>
<p>Beaucoup de salariés de PME utilisent un tableur au quotidien sans maîtriser les fonctions avancées : recherche dans une autre feuille, conditions imbriquées, sommes sous conditions, tableaux croisés dynamiques. L'IA générative change la donne : il suffit de décrire le résultat voulu en français pour obtenir la formule, accompagnée d'une explication. C'est l'un des usages où le gain est le plus net, à condition de respecter une règle : <strong>c'est le tableur qui calcule, pas le modèle de langage</strong>. L'IA écrit la formule ; le tableur l'exécute sur les vraies données ; vous vérifiez le résultat.</p>

<h3>2. Décrire sa demande : la structure du tableau d'abord</h3>
<p>Une IA ne voit pas votre fichier si vous utilisez un assistant séparé. Pour obtenir une formule juste, décrivez la structure du tableau : noms des colonnes, lettres de colonnes, première ligne de données, type de contenu, version du tableur (Excel en français, Google Sheets, LibreOffice Calc) et séparateur utilisé. Dans les versions françaises, les fonctions sont traduites (SI, SOMME.SI.ENS, RECHERCHEX) et les arguments sont séparés par des points-virgules.</p>
<p><strong>Exemple de requête (Julie, suivi des devis) :</strong></p>
<blockquote>Je travaille dans Excel en français. Ma feuille « Devis » contient : A = numéro de devis, B = date d'envoi, C = commercial, D = type de travaux (PAC, isolation, menuiseries), E = montant HT, F = statut (Envoyé, Signé, Perdu). Les données commencent ligne 2 et vont jusqu'à la ligne 300. Donne-moi une formule pour calculer le montant total HT des devis signés par Karim pour les travaux de type PAC. Explique la formule argument par argument.</blockquote>
<p>Réponse attendue (à tester) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Formule proposée</th><th>Explication</th></tr>
<tr><td>=SOMME.SI.ENS(E2:E300;C2:C300;"Karim";D2:D300;"PAC";F2:F300;"Signé")</td><td>Additionne les montants de la colonne E pour les lignes où le commercial est Karim, le type de travaux PAC et le statut Signé.</td></tr>
</table>

<h3>3. Les demandes les plus utiles au quotidien</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Besoin</th><th>Exemple de demande</th><th>Fonctions souvent proposées</th></tr>
<tr><td>Compter sous conditions</td><td>« Combien de devis sont au statut Envoyé depuis plus de 30 jours ? »</td><td>NB.SI.ENS, AUJOURDHUI</td></tr>
<tr><td>Rechercher une valeur</td><td>« Récupère dans la feuille Clients la commune correspondant au numéro de client. »</td><td>RECHERCHEX, ou RECHERCHEV dans les versions anciennes</td></tr>
<tr><td>Classer automatiquement</td><td>« Affiche "À relancer" si le devis est Envoyé depuis plus de 15 jours, sinon rien. »</td><td>SI, ET, AUJOURDHUI</td></tr>
<tr><td>Nettoyer des données</td><td>« Mets les noms de communes en majuscules et supprime les espaces en trop. »</td><td>MAJUSCULE, SUPPRESPACE</td></tr>
<tr><td>Calculer un délai</td><td>« Calcule le nombre de jours ouvrés entre la signature et le début du chantier. »</td><td>NB.JOURS.OUVRES</td></tr>
<tr><td>Synthétiser</td><td>« Comment faire un tableau croisé du chiffre d'affaires signé par mois et par type de travaux ? »</td><td>Procédure pas à pas du tableau croisé dynamique</td></tr>
<tr><td>Comprendre une formule héritée</td><td>« Explique-moi cette formule trouvée dans le fichier de suivi de chantier. »</td><td>Explication argument par argument</td></tr>
</table>

<h3>4. Analyser des données avec l'IA</h3>
<p>Au-delà des formules, l'IA peut aider à <strong>interpréter</strong> un tableau : repérer des tendances, proposer des graphiques adaptés, formuler des hypothèses. Deux façons de procéder :</p>
<ul>
<li><strong>Avec l'IA intégrée au tableur</strong> (Copilot dans Excel, Gemini dans Sheets, selon licences) : elle travaille directement sur le fichier, dans l'environnement de l'entreprise.</li>
<li><strong>Avec un assistant séparé</strong> auquel on joint un fichier : certaines offres analysent les fichiers en exécutant du code de calcul. Cette méthode impose de vérifier très attentivement ce que contient le fichier avant de l'envoyer.</li>
</ul>
<p>Dans les deux cas, l'IA peut produire une interprétation séduisante mais fausse : confondre corrélation et cause, ignorer des lignes, mal lire un format de date. Toute conclusion doit être vérifiée par un calcul simple dans le tableur.</p>

<h3>5. Protéger les données du tableau</h3>
<p>Un fichier de suivi commercial contient souvent des noms, adresses, numéros de téléphone et montants. Avant de le soumettre à un assistant séparé, appliquez les règles suivantes :</p>
<ol>
<li><strong>Ne transmettez que la structure</strong> lorsque vous demandez une formule : noms des colonnes et deux ou trois lignes d'exemple inventées suffisent.</li>
<li><strong>Pseudonymisez ou supprimez</strong> les colonnes identifiantes (nom, adresse, téléphone, courriel) si une analyse sur données réelles est nécessaire ; remplacez les noms par des codes (Client 001, Client 002).</li>
<li><strong>Agrégez</strong> autant que possible : un tableau « chiffre d'affaires par mois et par type de travaux » ne contient plus de données personnelles.</li>
<li><strong>Utilisez un outil professionnel paramétré</strong> lorsque l'analyse porte sur des données réelles sensibles, conformément à la charte de l'entreprise.</li>
</ol>
<blockquote><strong>Bonne pratique :</strong> créez une copie « anonymisée » du fichier pour vos échanges avec l'IA, et gardez le fichier original dans l'espace de l'entreprise. Ne travaillez jamais sur l'unique exemplaire d'un fichier important : une formule mal appliquée peut écraser des données.</blockquote>

<h3>6. Contrôler une formule ou une analyse</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Contrôle</th><th>Comment faire</th></tr>
<tr><td>Test sur un cas connu</td><td>Appliquez la formule à quelques lignes dont vous connaissez le résultat (calcul à la main ou filtre manuel).</td></tr>
<tr><td>Vérification des plages</td><td>Assurez-vous que les plages couvrent toutes les lignes (pas seulement les 300 premières si le tableau en compte 450) et que les références absolues ($) sont correctes lors de la recopie.</td></tr>
<tr><td>Cas limites</td><td>Que se passe-t-il avec une cellule vide, un statut mal orthographié (« signé » sans majuscule, « Signé » avec un espace) ?</td></tr>
<tr><td>Cohérence d'ensemble</td><td>Le total obtenu est-il plausible ? Le nombre de devis signés plus perdus plus envoyés correspond-il au nombre total de devis ?</td></tr>
<tr><td>Compréhension</td><td>Demandez à l'IA d'expliquer la formule ; si vous ne la comprenez pas, ne l'utilisez pas dans un fichier partagé.</td></tr>
</table>

<h3>7. Exemple complet : le tableau de relance de Julie</h3>
<p>Julie veut que son fichier de suivi signale automatiquement les devis à relancer. Avec l'aide de l'IA, elle ajoute trois colonnes (données fictives) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Colonne ajoutée</th><th>Formule (ligne 2)</th><th>Résultat</th></tr>
<tr><td>G – Ancienneté (jours)</td><td>=SI(B2="";"";AUJOURDHUI()-B2)</td><td>Nombre de jours depuis l'envoi du devis.</td></tr>
<tr><td>H – À relancer</td><td>=SI(ET(F2="Envoyé";G2&gt;=15);"À relancer";"")</td><td>Signale les devis envoyés depuis au moins 15 jours.</td></tr>
<tr><td>I – Priorité</td><td>=SI(H2="";"";SI(E2&gt;=10000;"Haute";"Normale"))</td><td>Priorise les devis d'au moins 10 000 € HT.</td></tr>
</table>
<p>Julie teste les formules sur dix devis dont elle connaît le statut, ajoute une mise en forme conditionnelle sur la colonne H et un filtre. Elle constate qu'un devis au statut « envoyé » (en minuscules) n'est pas détecté par la comparaison avec « Envoyé » : la fonction de comparaison du tableur n'est pas toujours sensible à la casse, mais une espace en trop suffit à fausser le test. Elle ajoute donc une liste déroulante (validation des données) sur la colonne F pour éviter les fautes de saisie. Le temps de préparation des relances passe d'environ 30 minutes à 5 minutes par semaine (estimation fictive).</p>
<blockquote><strong>À retenir :</strong> l'IA écrit et explique les formules, le tableur calcule, vous contrôlez. Décrivez la structure du tableau plutôt que d'envoyer les données, pseudonymisez ou agrégez si vous devez partager des données réelles, et testez toujours une formule sur des cas connus.</blockquote>
`,
      },
      {
        title: "5.4 – Transcrire une réunion et produire un compte rendu, avec le consentement des participants",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Connaître les outils de transcription et de résumé de réunion.</li>
<li>Respecter les obligations d'information et de consentement des participants.</li>
<li>Transformer une transcription brute en compte rendu fiable et utile.</li>
<li>Adapter la méthode aux réunions de chantier et aux rendez-vous clients.</li>
</ul>

<h3>1. Un usage à fort gain</h3>
<p>Rédiger un compte rendu de réunion est une tâche chronophage, souvent repoussée, et dont la qualité dépend de la mémoire et des notes de la personne qui s'en charge. Les outils de transcription automatique convertissent la parole en texte ; l'IA générative transforme ensuite ce texte en compte rendu structuré : participants, points abordés, décisions, actions avec responsables et échéances. Le gain de temps peut être important, mais cet usage touche directement à la vie privée des personnes enregistrées : il doit être <strong>encadré</strong>.</p>

<h3>2. Les outils disponibles</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type d'outil</th><th>Exemples</th><th>Remarques</th></tr>
<tr><td>Transcription intégrée à la visioconférence</td><td>Transcription et résumé dans Teams (avec Copilot selon licences), fonctions équivalentes dans Google Meet ou d'autres solutions.</td><td>Les participants sont en principe avertis par un bandeau à l'écran ; les données restent dans l'environnement de l'organisation selon l'offre.</td></tr>
<tr><td>Dictée et transcription d'un fichier audio</td><td>Fonction de dictée ou de transcription de Word, applications de dictaphone des téléphones, assistants acceptant des fichiers audio.</td><td>Vérifier où le fichier audio est envoyé et conservé.</td></tr>
<tr><td>Assistants de réunion tiers</td><td>Applications qui « rejoignent » la réunion pour prendre des notes.</td><td>Vigilance particulière : lieu d'hébergement, durée de conservation, réutilisation des données ; certaines se connectent automatiquement à toutes les réunions du calendrier.</td></tr>
<tr><td>Résumé à partir de notes</td><td>N'importe quel assistant conversationnel à partir de vos notes manuscrites ou dictées.</td><td>Solution la plus simple et la moins intrusive : pas d'enregistrement des voix.</td></tr>
</table>

<h3>3. Le cadre : information, consentement et finalité</h3>
<p>La voix d'une personne et ses propos enregistrés sont des <strong>données personnelles</strong> au sens du RGPD. Enregistrer et transcrire une réunion est donc un traitement de données qui doit respecter quelques principes simples (chapitre 6) :</p>
<ul>
<li><strong>Informer</strong> les participants avant le début de l'enregistrement ou de la transcription : qui enregistre, pourquoi, qui aura accès au contenu, combien de temps il sera conservé.</li>
<li><strong>Recueillir l'accord</strong> des participants, en particulier des personnes extérieures à l'entreprise (clients, fournisseurs, sous-traitants), et leur laisser une vraie possibilité de refuser, sans conséquence pour eux.</li>
<li><strong>Limiter la finalité</strong> : un enregistrement réalisé pour rédiger un compte rendu ne doit pas servir à évaluer la performance d'un salarié.</li>
<li><strong>Limiter la conservation</strong> : supprimer l'enregistrement audio et la transcription brute une fois le compte rendu validé, sauf raison particulière.</li>
</ul>
<p>Enregistrer une conversation à l'insu des personnes concernées est à proscrire : au-delà des règles de protection des données, le code pénal sanctionne l'enregistrement sans consentement de paroles prononcées à titre privé ou confidentiel. En pratique, l'entreprise s'interdit tout enregistrement non annoncé.</p>
<blockquote><strong>Bonne pratique :</strong> annoncez la transcription en début de réunion par une phrase simple, par exemple : « Pour rédiger le compte rendu, je propose d'activer la transcription automatique. Elle sera supprimée une fois le compte rendu validé. Est-ce que tout le monde est d'accord ? » Si une personne refuse, prenez des notes à la main.</blockquote>

<h3>4. Cas particulier des rendez-vous clients</h3>
<p>Chez un particulier, lors d'une visite technique ou d'un rendez-vous commercial, l'enregistrement est délicat : le client est chez lui, il évoque parfois sa situation familiale, financière ou de santé (par exemple pour expliquer un besoin d'adaptation du logement). Thermia Rénov a fait le choix suivant : <strong>pas d'enregistrement des rendez-vous chez les particuliers</strong>. Karim et Thomas dictent leurs notes dans la voiture, après le rendez-vous, en ne citant que les informations techniques utiles (surface, type de chauffage existant, contraintes d'accès), puis utilisent l'IA pour les mettre en forme. Le nom du client n'est ajouté qu'au moment de l'enregistrement dans le dossier de l'entreprise.</p>

<h3>5. De la transcription au compte rendu : la méthode</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Action</th><th>Point de contrôle</th></tr>
<tr><td>1. Préparer</td><td>Diffuser un ordre du jour ; prévoir qui valide le compte rendu.</td><td>L'ordre du jour sert de plan au compte rendu.</td></tr>
<tr><td>2. Informer et recueillir l'accord</td><td>Annoncer la transcription, expliquer la conservation.</td><td>Accord de chacun, alternative en cas de refus.</td></tr>
<tr><td>3. Transcrire</td><td>Activer la transcription ou dicter ses notes.</td><td>Qualité du son ; noms propres et termes techniques souvent mal transcrits.</td></tr>
<tr><td>4. Générer le compte rendu</td><td>Utiliser une requête structurée (voir ci-dessous).</td><td>Outil conforme à la charte, en particulier pour les réunions contenant des informations confidentielles.</td></tr>
<tr><td>5. Vérifier</td><td>Relire en confrontant aux notes et à la mémoire des participants.</td><td>Décisions, chiffres, dates, responsables, absence de propos inventés ou attribués à la mauvaise personne.</td></tr>
<tr><td>6. Valider et diffuser</td><td>Faire valider par l'animateur de la réunion, puis diffuser.</td><td>Diffusion limitée aux personnes concernées.</td></tr>
<tr><td>7. Supprimer</td><td>Effacer l'audio et la transcription brute.</td><td>Conservation du seul compte rendu validé.</td></tr>
</table>

<h3>6. Une requête type pour le compte rendu</h3>
<blockquote>Tu es assistant de direction dans une PME de rénovation énergétique. À partir de la transcription ci-dessous, rédige le compte rendu de la réunion de chantier. Structure : 1. Participants (fonctions uniquement) ; 2. Points abordés (une ligne par point) ; 3. Décisions prises ; 4. Actions (tableau : action, responsable, échéance) ; 5. Points en suspens. Contraintes : n'invente aucune information ; si une échéance ou un responsable n'est pas mentionné, écris « à préciser » ; ne reprends pas les propos personnels sans lien avec le chantier ; style neutre et factuel ; 300 mots maximum hors tableau.</blockquote>
<p>Les consignes « n'invente aucune information » et « écris à préciser » sont essentielles : sans elles, l'IA a tendance à compléter les trous de manière plausible, par exemple en attribuant une échéance qui n'a jamais été fixée.</p>

<h3>7. Les erreurs typiques à repérer</h3>
<ul>
<li><strong>Noms propres et termes techniques déformés</strong> : « pompe à chaleur air-eau » transcrit en « pompe à chaleur à reau », nom d'un fournisseur méconnaissable.</li>
<li><strong>Attribution erronée</strong> : une phrase prononcée par le client attribuée au conducteur de travaux.</li>
<li><strong>Décision inventée</strong> : une option simplement évoquée présentée comme décidée.</li>
<li><strong>Chiffres modifiés</strong> : « quarante » compris comme « quatorze ».</li>
<li><strong>Omissions</strong> : une réserve importante mentionnée rapidement en fin de réunion absente du résumé.</li>
</ul>

<h3>8. Application : la réunion d'équipe du lundi chez Thermia Rénov</h3>
<p>Chaque lundi, Sandrine réunit l'équipe pendant 45 minutes pour faire le point sur les chantiers de la semaine. Julie rédigeait jusqu'ici le compte rendu en une heure et demie environ (estimation fictive). Désormais, la réunion se tient dans une salle équipée ; la transcription est annoncée et acceptée par tous en début de séance ; Julie génère le compte rendu avec l'outil professionnel de l'entreprise à l'aide de la requête type, le relit en quinze minutes avec ses notes, le fait valider par Sandrine et supprime la transcription. Le compte rendu est diffusé avant midi, au lieu du lendemain.</p>
<blockquote><strong>À retenir :</strong> la transcription et le résumé automatique font gagner beaucoup de temps, mais ils portent sur des données personnelles. Informez, obtenez l'accord, limitez la finalité et la conservation, refusez l'enregistrement chez les particuliers lorsqu'il n'est pas indispensable, et vérifiez chaque décision et chaque chiffre avant de diffuser.</blockquote>
`,
      },
      {
        title: "5.5 – Créer des assistants personnalisés pour les tâches répétitives",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Comprendre ce qu'est un assistant personnalisé et à quoi il sert.</li>
<li>Rédiger les instructions permanentes d'un assistant.</li>
<li>Choisir les documents de référence à lui fournir, sans y placer de données sensibles.</li>
<li>Tester, partager et maintenir un assistant au sein d'une équipe.</li>
</ul>

<h3>1. Du prompt ponctuel à l'assistant permanent</h3>
<p>Au chapitre 3, vous avez construit une bibliothèque de prompts : des requêtes éprouvées que l'on copie et adapte. Lorsque la même requête revient plusieurs fois par semaine, il devient intéressant de la transformer en <strong>assistant personnalisé</strong> : une version de l'assistant conversationnel dotée d'instructions permanentes, éventuellement de documents de référence, que l'on ouvre directement pour une tâche précise. Selon les éditeurs, ces assistants portent des noms différents (GPT personnalisés dans ChatGPT, agents dans Copilot, Gems dans Gemini, agents dans Le Chat, projets dans Claude) et leur disponibilité dépend de l'offre souscrite.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Prompt de la bibliothèque</th><th>Assistant personnalisé</th></tr>
<tr><td>À copier-coller à chaque fois.</td><td>Instructions enregistrées une fois pour toutes.</td></tr>
<tr><td>Le contexte de l'entreprise est à rappeler à chaque requête.</td><td>Le contexte (activité, ton, règles) est intégré aux instructions.</td></tr>
<tr><td>Pas de documents de référence permanents.</td><td>Possibilité de joindre des documents de référence (charte éditoriale, fiches produits, modèles).</td></tr>
<tr><td>Usage individuel.</td><td>Partage possible avec l'équipe, selon l'offre.</td></tr>
</table>

<h3>2. Les usages pertinents dans une PME</h3>
<ul>
<li><strong>Assistant « courriels clients »</strong> : rédige des réponses dans le ton de l'entreprise, avec les formules de politesse habituelles et la signature type, en s'interdisant toute promesse de délai ou de prix.</li>
<li><strong>Assistant « publications »</strong> : propose des publications pour les réseaux sociaux selon la ligne éditoriale (sujets, longueur, ton, mots à éviter).</li>
<li><strong>Assistant « comptes rendus de chantier »</strong> : met en forme les notes dictées du conducteur de travaux selon le modèle de l'entreprise.</li>
<li><strong>Assistant « vulgarisation technique »</strong> : explique simplement une solution technique à un particulier à partir des fiches de l'entreprise.</li>
<li><strong>Assistant « relecture »</strong> : vérifie l'orthographe, la clarté et la présence des mentions attendues dans un courrier.</li>
</ul>

<h3>3. Rédiger les instructions de l'assistant</h3>
<p>Les instructions d'un assistant reprennent la structure Rôle / Contexte / Tâche / Format / Contraintes, mais de façon durable. Elles doivent prévoir les cas difficiles : que faire si une information manque, si la demande sort du périmètre, si l'utilisateur colle des données sensibles ?</p>
<p><strong>Modèle d'instructions – Assistant « Réponses clients » de Thermia Rénov :</strong></p>
<blockquote>
<p><strong>Rôle :</strong> tu es l'assistant de rédaction de Thermia Rénov, PME de rénovation énergétique (pompes à chaleur, isolation, menuiseries) dans le Rhône.</p>
<p><strong>Tâche :</strong> à partir du message d'un client et des éléments fournis par le salarié, tu proposes un projet de réponse par courriel.</p>
<p><strong>Ton :</strong> vouvoiement, courtois, clair, sans jargon ; phrases courtes ; pas de formule commerciale excessive.</p>
<p><strong>Format :</strong> objet du courriel ; corps de 150 mots maximum ; formule de politesse « Bien cordialement » ; signature : [Prénom NOM] – Thermia Rénov.</p>
<p><strong>Règles impératives :</strong> 1. N'invente jamais de délai, de prix, de montant d'aide, de garantie ou de caractéristique technique : si l'information n'est pas fournie, écris [À COMPLÉTER]. 2. N'affirme jamais qu'un client bénéficiera d'une aide : renvoie vers l'étude personnalisée et les sources officielles. 3. Si le message contient une réclamation, propose un rappel téléphonique et n'admets aucune responsabilité : signale au salarié que la réponse doit être validée par la direction. 4. Si l'utilisateur te transmet des données personnelles non nécessaires (numéro de téléphone, situation de santé ou financière), rappelle-lui de les retirer. 5. Termine toujours par la liste des points à vérifier avant envoi.</p>
</blockquote>
<p>La règle 5 est particulièrement utile : elle oblige l'assistant à signaler lui-même les zones à vérifier, ce qui facilite la relecture humaine.</p>

<h3>4. Les documents de référence</h3>
<p>Un assistant devient réellement utile lorsqu'il s'appuie sur des documents propres à l'entreprise. Choisissez-les avec soin :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Documents adaptés</th><th>Documents à exclure</th></tr>
<tr><td>Charte éditoriale, ton et vocabulaire de l'entreprise.</td><td>Fichiers clients, listes de prospects, devis nominatifs.</td></tr>
<tr><td>Présentation publique de l'entreprise et de ses solutions.</td><td>Tarifs internes, marges, prix de revient, conditions fournisseurs.</td></tr>
<tr><td>Modèles de courriers vierges.</td><td>Documents des salariés (paie, entretiens, arrêts de travail).</td></tr>
<tr><td>Fiches techniques publiques des fabricants.</td><td>Dossiers de réponse à appel d'offres en cours, documents couverts par un accord de confidentialité.</td></tr>
<tr><td>Foire aux questions validée par la direction.</td><td>Informations réglementaires non datées ou non vérifiées (elles seraient reprises comme vraies).</td></tr>
</table>
<blockquote><strong>Bonne pratique :</strong> datez chaque document de référence et désignez un responsable de sa mise à jour. Un assistant qui s'appuie sur une fiche d'aides publiques périmée produira, avec assurance, des réponses fausses.</blockquote>

<h3>5. Tester l'assistant avant de le partager</h3>
<p>Avant de proposer l'assistant à l'équipe, testez-le sur une série de cas, y compris des cas pièges :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Cas de test</th><th>Comportement attendu</th></tr>
<tr><td>Demande simple de rendez-vous</td><td>Réponse courte, proposition de créneaux [À COMPLÉTER].</td></tr>
<tr><td>Client qui demande « combien vais-je toucher d'aides ? »</td><td>Aucun montant ; explication de l'étude personnalisée et renvoi aux sources officielles.</td></tr>
<tr><td>Réclamation pour un bruit de pompe à chaleur</td><td>Proposition de rappel ; aucune reconnaissance de responsabilité ; alerte « validation direction ».</td></tr>
<tr><td>Message contenant le numéro de téléphone et la situation de santé du client</td><td>Rappel de retirer les données non nécessaires.</td></tr>
<tr><td>Demande hors sujet (« écris un poème »)</td><td>Rappel poli du périmètre de l'assistant.</td></tr>
</table>
<p>Corrigez les instructions jusqu'à ce que les cinq tests soient satisfaisants, puis notez la date de validation.</p>

<h3>6. Partager et maintenir</h3>
<ul>
<li><strong>Partage</strong> : dans une offre professionnelle, partagez l'assistant au sein de l'espace de l'entreprise plutôt que par un lien public. Vérifiez qui peut voir les instructions et les documents joints.</li>
<li><strong>Propriété</strong> : un assistant créé avec le compte personnel d'un salarié disparaît ou reste inaccessible lorsqu'il quitte l'entreprise. Les assistants utiles à l'équipe doivent être créés avec un compte de l'entreprise.</li>
<li><strong>Maintenance</strong> : revoyez les instructions et les documents tous les trimestres, ou dès qu'une règle change (nouvelle offre, nouvelle signature, évolution réglementaire).</li>
<li><strong>Retour d'expérience</strong> : demandez aux utilisateurs de signaler les réponses inadaptées ; chaque signalement améliore les instructions.</li>
</ul>

<h3>7. Les limites à garder en tête</h3>
<p>Un assistant personnalisé reste un modèle de langage : il peut ignorer une instruction, mal interpréter un document de référence ou produire une erreur avec assurance. Les instructions réduisent le risque ; elles ne le suppriment pas. La relecture humaine reste obligatoire avant tout envoi à un client.</p>
<blockquote><strong>À retenir :</strong> un assistant personnalisé transforme un bon prompt récurrent en outil d'équipe. Rédigez des instructions complètes qui prévoient les cas difficiles, joignez des documents de référence publics et datés, testez avec des cas pièges, créez-le avec un compte de l'entreprise et entretenez-le dans la durée.</blockquote>
`,
      },
      {
        title: "5.6 – Automatiser des tâches simples sans programmer : Power Automate, Zapier, Make",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Comprendre le principe d'une automatisation « déclencheur – actions ».</li>
<li>Connaître les principaux outils d'automatisation sans code et leurs différences d'usage.</li>
<li>Construire pas à pas une automatisation simple adaptée à une PME.</li>
<li>Identifier les risques d'une automatisation et les moyens de les maîtriser.</li>
</ul>

<h3>1. Automatisation et IA : deux notions différentes</h3>
<p>Une <strong>automatisation</strong> enchaîne des actions de manière systématique, selon des règles fixées à l'avance : « quand un formulaire est rempli, ajouter une ligne dans le tableau et envoyer un courriel ». Elle ne réfléchit pas : elle exécute. L'<strong>IA générative</strong>, elle, produit un contenu nouveau à partir d'une consigne. Les deux se combinent : une automatisation peut comporter une étape d'IA (résumer un message, proposer une catégorie, rédiger un brouillon), mais beaucoup d'automatisations utiles n'en ont pas besoin. Avant d'ajouter de l'IA dans une chaîne automatique, demandez-vous si une règle simple ne suffit pas : une règle est prévisible, une IA ne l'est jamais totalement.</p>

<h3>2. Le principe : un déclencheur, des actions</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Définition</th><th>Exemples</th></tr>
<tr><td>Déclencheur</td><td>L'événement qui lance l'automatisation.</td><td>Réception d'un courriel, envoi d'un formulaire, ajout d'un fichier dans un dossier, heure programmée, nouvelle ligne dans un tableau.</td></tr>
<tr><td>Condition (facultative)</td><td>Un filtre qui décide si la suite doit s'exécuter.</td><td>Seulement si l'objet contient « demande de devis » ; seulement si le montant dépasse 10 000 €.</td></tr>
<tr><td>Actions</td><td>Ce que l'automatisation fait.</td><td>Créer une ligne, envoyer un courriel, créer une tâche, publier un message dans un canal d'équipe, enregistrer une pièce jointe.</td></tr>
<tr><td>Connecteurs</td><td>Les liens avec les applications utilisées.</td><td>Messagerie, tableur, agenda, stockage de fichiers, outil de gestion commerciale.</td></tr>
</table>

<h3>3. Les principaux outils sans code</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Outil</th><th>Atouts</th><th>À vérifier</th></tr>
<tr><td>Power Automate (Microsoft)</td><td>Intégration naturelle avec Outlook, Excel, Teams, SharePoint et OneDrive ; certaines fonctions incluses dans des abonnements Microsoft 365.</td><td>Connecteurs disponibles selon la licence ; droits accordés par l'administrateur.</td></tr>
<tr><td>Zapier</td><td>Très grand nombre d'applications connectées ; prise en main rapide.</td><td>Limites de la version gratuite (nombre de tâches, d'étapes) ; lieu d'hébergement des données.</td></tr>
<tr><td>Make</td><td>Représentation visuelle des scénarios, adaptée aux enchaînements complexes.</td><td>Courbe d'apprentissage un peu plus longue ; limites selon l'offre.</td></tr>
</table>
<p>Les offres, les limites et les tarifs évoluent : consultez les conditions en vigueur et les engagements de confidentialité de chaque outil avant de lui confier des données de l'entreprise. Les outils d'automatisation accèdent à vos comptes (messagerie, fichiers) : un accès mal configuré peut exposer beaucoup de données.</p>

<h3>4. Exemple pas à pas : traiter automatiquement les demandes de devis du site internet</h3>
<p><strong>Situation (fictive) :</strong> le site de Thermia Rénov comporte un formulaire « Demande de devis ». Chaque demande arrive par courriel dans la boîte « contact ». Julie la recopie à la main dans le fichier de suivi, répond au client pour accuser réception et prévient Karim. Elle traite environ vingt demandes par semaine, à raison de sept minutes chacune, et il lui arrive d'en oublier une le vendredi soir.</p>
<p><strong>Objectif :</strong> automatiser l'enregistrement, l'accusé de réception et l'information du commercial, sans aucune étape d'IA sur les données du client.</p>
<p>L'exemple ci-dessous utilise Power Automate, puisque l'entreprise travaille avec Microsoft 365 ; la logique est identique avec Zapier ou Make. Les noms exacts des menus peuvent varier selon les versions.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Ce que l'on fait</th><th>Conseil</th></tr>
<tr><td>0. Préparer</td><td>Créer dans Excel (enregistré sur l'espace partagé de l'entreprise) un tableau nommé « Demandes » avec les colonnes : Date, Nom, Commune, Type de travaux, Message, Statut, Commercial.</td><td>Mettre les données « sous forme de tableau » : c'est indispensable pour que l'automatisation y ajoute des lignes.</td></tr>
<tr><td>1. Créer le flux</td><td>Dans Power Automate, choisir « Créer », puis un flux automatisé déclenché par un événement.</td><td>Donner un nom explicite : « Demandes de devis site – enregistrement et accusé de réception ».</td></tr>
<tr><td>2. Déclencheur</td><td>Choisir le déclencheur « Lors de l'arrivée d'un nouveau courrier électronique » (Outlook) sur la boîte « contact ».</td><td>Ajouter un filtre sur l'objet : « Demande de devis ». Les autres courriels ne déclencheront rien.</td></tr>
<tr><td>3. Extraire les informations</td><td>Le formulaire du site envoie un courriel toujours structuré de la même façon (« Nom : … », « Commune : … »). Utiliser les fonctions de traitement de texte de l'outil pour récupérer chaque champ, ou mieux, faire envoyer les réponses du formulaire directement vers le tableau si le site le permet.</td><td>Plus la source est structurée, plus l'automatisation est fiable. Un formulaire bien conçu vaut mieux qu'une IA chargée de « deviner » les champs.</td></tr>
<tr><td>4. Ajouter une ligne</td><td>Action Excel « Ajouter une ligne dans un tableau » : sélectionner le fichier, le tableau « Demandes », puis associer chaque colonne à l'information extraite ; Statut = « Nouvelle ».</td><td>Vérifier le format de la date.</td></tr>
<tr><td>5. Accusé de réception</td><td>Action « Envoyer un courrier électronique » au demandeur, avec un texte fixe validé par Sandrine : remerciement, délai de rappel indicatif annoncé par l'entreprise, rappel des droits sur les données (lien vers la politique de confidentialité).</td><td>Le texte est écrit une fois, relu, et ne varie pas : aucun risque d'engagement inventé.</td></tr>
<tr><td>6. Informer le commercial</td><td>Action « Publier un message » dans le canal Teams « Commercial », ou création d'une tâche pour Karim, avec le type de travaux et la commune (sans copier tout le message).</td><td>Ne diffuser que le minimum nécessaire dans le canal.</td></tr>
<tr><td>7. Tester</td><td>Envoyer trois demandes fictives depuis le formulaire, dont une avec un champ vide et une avec un accent ou une apostrophe dans le nom.</td><td>Les tests se font avec une adresse de test, jamais en écrivant à de vrais clients.</td></tr>
<tr><td>8. Surveiller</td><td>Activer les notifications d'échec du flux ; consulter l'historique d'exécution chaque semaine pendant le premier mois.</td><td>Désigner une personne responsable du flux et une procédure manuelle de secours.</td></tr>
<tr><td>9. Documenter</td><td>Rédiger une fiche d'une page : objectif, déclencheur, actions, comptes utilisés, responsable, date de mise en service.</td><td>Sans documentation, personne ne saura réparer le flux en l'absence de son créateur.</td></tr>
</table>
<p><strong>Résultat (estimation fictive) :</strong> le temps de Julie consacré à l'enregistrement des demandes passe de 2 h 20 à environ 20 minutes par semaine (contrôle du tableau et des cas particuliers). Le client reçoit un accusé de réception immédiat, et aucune demande n'est plus oubliée.</p>

<h3>5. Et si l'on ajoutait une étape d'IA ?</h3>
<p>Sandrine se demande s'il serait utile d'ajouter une étape d'IA pour « classer automatiquement la demande et rédiger une réponse personnalisée ». Analyse :</p>
<ul>
<li>Le <strong>classement</strong> par type de travaux est déjà assuré par une liste déroulante du formulaire : aucune IA n'est nécessaire.</li>
<li>Une <strong>réponse personnalisée générée automatiquement et envoyée sans relecture</strong> présente un risque élevé (engagement de délai, information erronée sur les aides) : elle relève de la zone 4 de la matrice.</li>
<li>Une étape d'IA pourrait en revanche préparer un <strong>brouillon</strong> de réponse enregistré dans les brouillons de Karim, qu'il relit avant envoi, à condition d'utiliser un service d'IA couvert par les engagements de confidentialité de l'offre professionnelle de l'entreprise.</li>
</ul>
<blockquote><strong>Bonne pratique :</strong> dans une chaîne automatique, toute étape d'IA dont le résultat part vers l'extérieur doit passer par une validation humaine. Les envois automatiques doivent reposer sur des textes fixes et validés.</blockquote>

<h3>6. Les risques d'une automatisation et leur maîtrise</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Risque</th><th>Exemple</th><th>Mesure</th></tr>
<tr><td>Panne silencieuse</td><td>Le mot de passe de la messagerie change : le flux s'arrête sans que personne ne le voie.</td><td>Notifications d'échec, vérification hebdomadaire, procédure manuelle de secours.</td></tr>
<tr><td>Boucle ou envoi en masse</td><td>L'accusé de réception déclenche lui-même le flux, qui envoie des dizaines de courriels.</td><td>Filtres précis, tests, limite d'exécutions.</td></tr>
<tr><td>Données exposées</td><td>Un message client complet publié dans un canal ouvert à toute l'équipe.</td><td>Ne transmettre que le minimum nécessaire.</td></tr>
<tr><td>Dépendance à une personne</td><td>Le flux a été créé avec le compte personnel d'un salarié qui quitte l'entreprise.</td><td>Comptes de l'entreprise, documentation, responsable désigné.</td></tr>
<tr><td>Accès trop larges</td><td>L'outil d'automatisation a accès à toute la messagerie et à tous les fichiers.</td><td>Accorder les seuls accès nécessaires ; revoir régulièrement les connexions autorisées.</td></tr>
</table>

<h3>7. Autres idées d'automatisations simples</h3>
<ul>
<li>Enregistrer automatiquement les pièces jointes des factures fournisseurs dans le dossier comptable du mois.</li>
<li>Envoyer chaque lundi matin à Karim la liste des devis à relancer (filtre sur la colonne « À relancer » de la section 5.3).</li>
<li>Créer une tâche de suivi trois mois après la fin d'un chantier pour le contrôle de satisfaction.</li>
<li>Prévenir Thomas par message lorsqu'un client confirme une date de visite technique dans l'agenda partagé.</li>
</ul>
<blockquote><strong>À retenir :</strong> une automatisation, c'est un déclencheur, éventuellement une condition, puis des actions. Commencez par des flux simples et sans IA, à partir de sources structurées ; testez avec des données fictives ; surveillez, documentez et confiez la responsabilité du flux à une personne identifiée. Une étape d'IA dont le résultat sort de l'entreprise exige une validation humaine.</blockquote>
`,
      },
      {
        title: "5.7 – Mesurer le temps gagné et la qualité obtenue",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Établir une mesure de référence avant d'introduire l'IA.</li>
<li>Mesurer le temps réellement gagné, y compris le temps de vérification.</li>
<li>Évaluer la qualité des productions, pas seulement la vitesse.</li>
<li>Présenter un bilan simple et honnête à la direction.</li>
</ul>

<h3>1. Pourquoi mesurer ?</h3>
<p>Sans mesure, le jugement sur l'IA repose sur des impressions : enthousiasme des uns, scepticisme des autres. La mesure permet de décider objectivement de poursuivre, d'étendre ou d'abandonner un usage, de justifier un abonnement professionnel et de repérer les usages qui font perdre du temps. Elle n'a pas besoin d'être sophistiquée : un tableau tenu pendant deux à quatre semaines suffit.</p>

<h3>2. Le piège du temps « brut »</h3>
<p>Un courriel généré en dix secondes n'a pas coûté dix secondes. Il faut compter :</p>
<ul>
<li>le temps de <strong>préparation</strong> de la requête (rassembler le contexte, anonymiser) ;</li>
<li>le temps de <strong>génération et d'itération</strong> (deuxième ou troisième version) ;</li>
<li>le temps de <strong>vérification</strong> (faits, chiffres, ton) ;</li>
<li>le temps de <strong>correction</strong> des erreurs découvertes, parfois après envoi ;</li>
<li>le temps d'<strong>apprentissage</strong> et de maintenance (assistants, automatisations).</li>
</ul>
<p>Le temps gagné se calcule donc ainsi : <strong>temps de la méthode habituelle – (préparation + génération + vérification + correction)</strong>. Il arrive que le résultat soit nul ou négatif : c'est une information précieuse.</p>

<h3>3. Établir la référence</h3>
<p>Avant de changer de méthode, chronométrez la tâche à trois ou quatre reprises avec la méthode habituelle, ou utilisez une estimation prudente issue de la cartographie (section 5.1). Notez aussi un indicateur de qualité : nombre de corrections demandées par le responsable, erreurs relevées, délai de diffusion, retours des clients.</p>

<h3>4. Le tableau de mesure</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Date</th><th>Tâche</th><th>Temps habituel (référence)</th><th>Temps avec IA, vérification comprise</th><th>Gain</th><th>Qualité (1 à 4)</th><th>Erreurs détectées</th><th>Commentaire</th></tr>
<tr><td>05/10</td><td>Compte rendu réunion d'équipe</td><td>90 min</td><td>25 min</td><td>65 min</td><td>4</td><td>1 nom mal transcrit</td><td>Requête type efficace.</td></tr>
<tr><td>06/10</td><td>Publication LinkedIn</td><td>45 min</td><td>20 min</td><td>25 min</td><td>3</td><td>1 chiffre non sourcé retiré</td><td>Ton trop enthousiaste, à corriger dans l'assistant.</td></tr>
<tr><td>07/10</td><td>Synthèse d'un cahier des charges de 40 pages</td><td>60 min</td><td>35 min</td><td>25 min</td><td>3</td><td>1 exigence omise</td><td>Relecture ciblée indispensable.</td></tr>
<tr><td>08/10</td><td>Calcul d'un plan de financement</td><td>30 min</td><td>45 min</td><td>– 15 min</td><td>2</td><td>Erreur de calcul</td><td>À abandonner : faire avec le tableur.</td></tr>
</table>
<p>Données fictives, établies pour l'exercice. L'échelle de qualité peut être la suivante : 1 = inutilisable, 2 = à reprendre largement, 3 = utilisable après corrections mineures, 4 = utilisable en l'état après vérification.</p>

<h3>5. Indicateurs complémentaires</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Ce qu'il mesure</th><th>Exemple de lecture</th></tr>
<tr><td>Temps gagné hebdomadaire par personne</td><td>Le gain réel, vérification comprise.</td><td>« Julie gagne environ 2 heures par semaine sur les comptes rendus et les demandes de devis. »</td></tr>
<tr><td>Délai de traitement</td><td>La rapidité de service au client ou à l'équipe.</td><td>« Le compte rendu est diffusé le jour même au lieu du lendemain. »</td></tr>
<tr><td>Taux d'erreurs</td><td>Les erreurs relevées après vérification et, surtout, après envoi.</td><td>« Aucune erreur parvenue à un client sur le mois. »</td></tr>
<tr><td>Taux d'adoption</td><td>Le nombre de personnes qui utilisent réellement les outils.</td><td>« 9 salariés sur 14 utilisent au moins un usage chaque semaine. »</td></tr>
<tr><td>Satisfaction des utilisateurs</td><td>Le ressenti de l'équipe (charge mentale, intérêt du travail).</td><td>« Les relances sont moins pénibles ; la rédaction des publications reste jugée peu utile. »</td></tr>
<tr><td>Incidents de conformité</td><td>Les manquements à la charte (données saisies à tort, contenu non relu).</td><td>« Un incident : un devis nominatif collé dans un outil grand public, signalé et traité. »</td></tr>
</table>

<h3>6. Que faire du temps gagné ?</h3>
<p>Le temps gagné n'a de valeur que s'il est réinvesti. Il est utile de décider à l'avance, avec l'équipe, à quoi il servira : rappeler les clients plus vite, mieux préparer les visites techniques, se former, réduire les heures supplémentaires, améliorer le suivi après chantier. Présenter l'IA comme un moyen de « faire plus avec moins de personnes » suscite des résistances légitimes ; la présenter comme un moyen de se débarrasser des tâches ingrates pour se consacrer au cœur du métier favorise l'adhésion, à condition que ce soit vrai.</p>

<h3>7. Présenter un bilan</h3>
<p>Au bout d'un mois, un bilan d'une page suffit :</p>
<ol>
<li>Les usages testés et le nombre de personnes concernées.</li>
<li>Le temps gagné par usage, vérification comprise, avec la méthode de mesure.</li>
<li>Les effets sur la qualité et les incidents éventuels.</li>
<li>Les usages à poursuivre, à étendre, à modifier ou à abandonner.</li>
<li>Les besoins : licences, formation, mise à jour de la charte.</li>
</ol>
<blockquote><strong>Bonne pratique :</strong> présentez aussi les usages qui n'ont pas fonctionné. Un bilan qui ne montre que des succès n'est pas crédible, et l'abandon d'un usage inefficace est un bon résultat.</blockquote>
<blockquote><strong>À retenir :</strong> mesurez avant et après, en comptant le temps de préparation, de vérification et de correction. Suivez la qualité autant que la vitesse, décidez à quoi servira le temps gagné et présentez un bilan honnête qui inclut les échecs.</blockquote>
`,
      },
      {
        title: "5.8 – Conduire le changement dans une PME et bâtir son plan d'action individuel",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Comprendre les freins et les leviers de l'adoption de l'IA dans une petite entreprise.</li>
<li>Organiser un déploiement progressif : pilotes, référents, partage des pratiques.</li>
<li>Associer les salariés et leurs représentants, le cas échéant.</li>
<li>Rédiger son plan d'action individuel pour les semaines suivant la formation.</li>
</ul>

<h3>1. Les freins les plus fréquents</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Frein</th><th>Ce qu'il exprime</th><th>Réponse adaptée</th></tr>
<tr><td>« L'IA va nous remplacer. »</td><td>Une inquiétude sur l'emploi et la valeur de son travail.</td><td>Expliquer clairement les objectifs de la direction ; montrer que l'IA prend en charge des tâches, pas des métiers ; associer les salariés au choix des usages.</td></tr>
<tr><td>« Je n'ai pas le temps d'apprendre. »</td><td>Une charge de travail déjà élevée.</td><td>Prévoir du temps dédié ; commencer par un usage qui fait gagner du temps dès la première semaine.</td></tr>
<tr><td>« Ça raconte n'importe quoi. »</td><td>Une mauvaise première expérience, souvent avec une requête trop vague.</td><td>Montrer la méthode du prompt et la vérification ; reconnaître les limites réelles.</td></tr>
<tr><td>« On n'a pas le droit. »</td><td>Une incertitude sur les règles (données, confidentialité).</td><td>Adopter une charte claire qui dit ce qui est permis et ce qui est interdit (chapitre 6).</td></tr>
<tr><td>« Ce n'est pas pour moi. »</td><td>Un manque de confiance face au numérique.</td><td>Accompagnement individuel par un référent ; binômes ; valorisation des petits progrès.</td></tr>
</table>

<h3>2. Les leviers de l'adoption</h3>
<ul>
<li><strong>Un sens partagé</strong> : la dirigeante explique pourquoi l'entreprise s'intéresse à l'IA (gagner du temps sur l'administratif, répondre plus vite aux clients, mieux protéger les données) et ce qu'elle ne fera pas (décider à la place des salariés, surveiller leur travail).</li>
<li><strong>Des usages concrets</strong> issus de la cartographie, choisis avec les personnes concernées.</li>
<li><strong>Un cadre clair</strong> : la charte d'usage, les outils autorisés, les comptes professionnels.</li>
<li><strong>Des référents</strong> : une ou deux personnes volontaires, formées, qui aident leurs collègues et font remonter les difficultés.</li>
<li><strong>Le partage des pratiques</strong> : bibliothèque de prompts commune, courte démonstration en réunion d'équipe, retour d'expérience mensuel.</li>
<li><strong>Le droit à l'erreur</strong>, assorti d'une obligation de signaler les incidents (donnée saisie à tort, contenu erroné envoyé) pour pouvoir les corriger.</li>
</ul>

<h3>3. Un déploiement en quatre temps</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Phase</th><th>Durée indicative</th><th>Contenu</th><th>Livrable</th></tr>
<tr><td>1. Cadrage</td><td>2 semaines</td><td>Cartographie des tâches, choix des outils et des comptes, rédaction de la charte.</td><td>Matrice gain/risque, charte validée.</td></tr>
<tr><td>2. Pilote</td><td>4 semaines</td><td>Deux ou trois usages de la zone 1 testés par des volontaires, avec mesure.</td><td>Tableau de mesure, bilan du pilote.</td></tr>
<tr><td>3. Extension</td><td>2 à 3 mois</td><td>Extension aux autres salariés, usages de la zone 2 encadrés, premières automatisations.</td><td>Bibliothèque de prompts, assistants partagés, fiches d'automatisation.</td></tr>
<tr><td>4. Ancrage</td><td>En continu</td><td>Revue trimestrielle des usages, de la charte et des outils ; intégration aux nouvelles embauches.</td><td>Bilan trimestriel, charte mise à jour.</td></tr>
</table>

<h3>4. Le dialogue social</h3>
<p>Dans une entreprise dotée d'un comité social et économique, l'introduction de nouvelles technologies susceptibles de modifier les conditions de travail fait partie des sujets sur lesquels les représentants du personnel doivent être informés et, le cas échéant, consultés. Les modalités dépendent de l'effectif et de l'ampleur du projet : renseignez-vous auprès de votre conseil ou de votre organisation professionnelle. Même en l'absence d'obligation, associer l'équipe dès le cadrage est la meilleure garantie d'adoption. Par ailleurs, un outil qui permettrait de contrôler l'activité des salariés exige leur information préalable : l'IA ne doit pas devenir un outil de surveillance déguisé.</p>

<h3>5. Le cas de Thermia Rénov</h3>
<p>Sandrine a présenté le projet en réunion d'équipe en trois messages : « Nous voulons gagner du temps sur l'administratif et les écrits, pas réduire l'équipe. Nous allons définir ensemble ce qui est autorisé, pour protéger nos clients. Personne n'est obligé d'être expert : Julie et Karim seront les référents. » Le pilote porte sur les comptes rendus de réunion, les textes de présentation des solutions et le traitement des demandes de devis. Thomas, d'abord réticent (« sur un chantier, je n'ai pas le temps de taper des prompts »), adopte finalement la dictée de ses notes dans la voiture et leur mise en forme par un assistant personnalisé : c'est l'usage qui lui fait gagner le plus de temps.</p>

<h3>6. Le plan d'action individuel</h3>
<p>La formation se termine par la rédaction de votre plan d'action individuel. Il traduit ce que vous avez appris en engagements concrets, datés et mesurables, pour les semaines qui suivent. Il sera relu avec le formateur lors du bilan de fin de formation.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>À compléter</th><th>Exemple (Karim, commercial)</th></tr>
<tr><td>Mes trois usages prioritaires</td><td>Issus de votre matrice gain/risque (zone 1 de préférence).</td><td>1. Textes de présentation des solutions ; 2. Préparation des rendez-vous à partir des notes de visite (sans nom du client) ; 3. Synthèse des cahiers des charges des appels d'offres publics.</td></tr>
<tr><td>Outil et compte utilisés</td><td>Outil autorisé par l'entreprise, compte professionnel.</td><td>Offre professionnelle choisie par l'entreprise, compte Thermia Rénov.</td></tr>
<tr><td>Ressources à construire</td><td>Prompts, assistant, modèle, automatisation.</td><td>Assistant « vulgarisation technique » ; cinq prompts dans la bibliothèque commune.</td></tr>
<tr><td>Règles que je m'applique</td><td>Données interdites, vérifications systématiques.</td><td>Aucun nom, adresse ou situation financière de client ; aucun montant d'aide sans simulateur officiel ; relecture avant envoi.</td></tr>
<tr><td>Indicateur de réussite</td><td>Ce que vous mesurerez.</td><td>Temps de préparation d'une proposition : de 2 h à 1 h 15, vérification comprise.</td></tr>
<tr><td>Échéances</td><td>Dates de démarrage et de bilan.</td><td>Démarrage le 05/10/2026 ; bilan au 06/11/2026 avec Sandrine.</td></tr>
<tr><td>Besoins</td><td>Ce dont vous avez besoin (accès, temps, accompagnement).</td><td>Accès à l'offre professionnelle ; une heure avec Julie pour créer l'assistant.</td></tr>
<tr><td>Obstacles prévisibles et parade</td><td>Ce qui pourrait vous empêcher d'avancer.</td><td>Période chargée de fin d'année : bloquer 30 minutes chaque vendredi.</td></tr>
</table>
<blockquote><strong>Bonne pratique :</strong> limitez-vous à trois usages. Un plan d'action trop ambitieux est abandonné au bout de quinze jours ; un plan modeste et tenu installe de nouvelles habitudes et donne envie d'aller plus loin.</blockquote>
<blockquote><strong>À retenir :</strong> l'adoption de l'IA dans une PME repose sur un sens clairement expliqué, des usages choisis avec les personnes concernées, un cadre sûr, des référents et un déploiement progressif. Chaque stagiaire repart avec un plan d'action individuel limité, daté et mesurable.</blockquote>
`,
      },
      {
        title: "5.9 – Quiz de fin de chapitre",
        content: `
<p>Répondez aux dix questions, puis consultez le corrigé. Une seule réponse est correcte par question.</p>

<h4>Question 1</h4>
<p>Par quoi faut-il commencer pour intégrer l'IA dans ses processus de travail ?</p>
<ul>
<li>A. Souscrire l'abonnement le plus complet possible</li>
<li>B. Cartographier ses tâches réelles, avec leur fréquence, leur durée et les données qu'elles mobilisent</li>
<li>C. Automatiser immédiatement toutes les réponses aux clients</li>
<li>D. Demander à l'IA quelles tâches elle peut faire à votre place</li>
</ul>

<h4>Question 2</h4>
<p>Dans la matrice gain/risque, où se situe la rédaction du premier jet d'une publication pour les réseaux sociaux de l'entreprise ?</p>
<ul>
<li>A. Gain élevé, risque faible : à lancer en priorité</li>
<li>B. Gain faible, risque élevé : à éviter</li>
<li>C. Gain élevé, risque élevé : interdit</li>
<li>D. Elle ne peut pas être évaluée</li>
</ul>

<h4>Question 3</h4>
<p>Que doit-on vérifier avant de présenter à ses collègues une fonction de Copilot dans Microsoft 365 ?</p>
<ul>
<li>A. Rien, toutes les fonctions sont disponibles pour tous les utilisateurs</li>
<li>B. Uniquement la couleur de l'icône</li>
<li>C. La licence dont on dispose, les réglages de l'administrateur et les conditions de confidentialité de l'offre</li>
<li>D. L'avis des utilisateurs sur les forums</li>
</ul>

<h4>Question 4</h4>
<p>Vous demandez à une IA une formule de tableur. Quelle est la bonne démarche ?</p>
<ul>
<li>A. Copier tout le fichier client dans l'assistant pour qu'il calcule le résultat</li>
<li>B. Décrire la structure du tableau, obtenir la formule, la faire calculer par le tableur et la tester sur des cas connus</li>
<li>C. Demander directement le total à l'IA et le recopier</li>
<li>D. Utiliser la formule sans la tester si l'IA affirme qu'elle est juste</li>
</ul>

<h4>Question 5</h4>
<p>Avant d'activer la transcription automatique d'une réunion avec un fournisseur, que devez-vous faire ?</p>
<ul>
<li>A. Rien, la transcription est un simple outil de prise de notes</li>
<li>B. Activer la transcription discrètement pour ne pas gêner les échanges</li>
<li>C. Informer les participants de la finalité, de l'accès et de la durée de conservation, et recueillir leur accord</li>
<li>D. Prévenir uniquement les salariés de l'entreprise</li>
</ul>

<h4>Question 6</h4>
<p>Pourquoi ajoute-t-on la consigne « si une information manque, écris à préciser » dans une requête de compte rendu ?</p>
<ul>
<li>A. Pour allonger le compte rendu</li>
<li>B. Pour éviter que l'IA comble les trous par des informations plausibles mais inventées</li>
<li>C. Parce que l'IA ne sait pas écrire de dates</li>
<li>D. Pour respecter une obligation légale</li>
</ul>

<h4>Question 7</h4>
<p>Quel document peut être joint sans difficulté à un assistant personnalisé « réponses clients » ?</p>
<ul>
<li>A. Le fichier des clients avec leurs coordonnées</li>
<li>B. La grille des marges de l'entreprise</li>
<li>C. La charte éditoriale et la foire aux questions validée par la direction, datées</li>
<li>D. Les comptes rendus d'entretiens annuels des salariés</li>
</ul>

<h4>Question 8</h4>
<p>Dans une automatisation no-code, qu'appelle-t-on le déclencheur ?</p>
<ul>
<li>A. L'événement qui lance l'enchaînement d'actions, par exemple la réception d'un courriel</li>
<li>B. La personne qui a créé l'automatisation</li>
<li>C. Le message d'erreur envoyé en cas de panne</li>
<li>D. L'étape d'IA obligatoire de tout scénario</li>
</ul>

<h4>Question 9</h4>
<p>Un courriel généré par l'IA a pris 10 secondes, sa vérification 6 minutes et sa correction 3 minutes ; la méthode habituelle prend 12 minutes. Quel est le temps gagné ?</p>
<ul>
<li>A. Environ 12 minutes</li>
<li>B. Environ 3 minutes</li>
<li>C. Environ 9 minutes</li>
<li>D. Aucun calcul n'est possible</li>
</ul>

<h4>Question 10</h4>
<p>Quel élément caractérise un bon plan d'action individuel après la formation ?</p>
<ul>
<li>A. Il recense au moins quinze usages pour ne rien oublier</li>
<li>B. Il se limite à quelques usages prioritaires, avec des règles, un indicateur de réussite et des échéances datées</li>
<li>C. Il ne comporte aucune date pour laisser de la souplesse</li>
<li>D. Il est rédigé par l'IA sans relecture</li>
</ul>

<h3>Corrigé et explications</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>B</td><td>On part du travail réel, pas de l'outil : la cartographie permet de repérer les tâches où l'IA apporte un gain, et celles qui mobilisent des données sensibles.</td></tr>
<tr><td>2</td><td>A</td><td>Le premier jet d'une publication fait gagner du temps, ne nécessite pas de données personnelles et sera relu avant publication : c'est un usage de la zone 1.</td></tr>
<tr><td>3</td><td>C</td><td>Les fonctions de Copilot dépendent des licences, des réglages de l'administrateur et évoluent souvent ; les engagements de confidentialité varient selon l'offre.</td></tr>
<tr><td>4</td><td>B</td><td>L'IA écrit la formule, le tableur calcule, l'utilisateur contrôle. Copier un fichier client dans un assistant expose des données personnelles, et un modèle de langage n'est pas une calculatrice fiable.</td></tr>
<tr><td>5</td><td>C</td><td>La voix et les propos des participants sont des données personnelles ; les personnes extérieures doivent être informées et pouvoir refuser. Un enregistrement à l'insu des personnes est à proscrire.</td></tr>
<tr><td>6</td><td>B</td><td>Sans cette consigne, l'IA tend à compléter les informations manquantes de façon plausible (échéance, responsable), ce qui produit un compte rendu faux.</td></tr>
<tr><td>7</td><td>C</td><td>Les documents de référence doivent être publics ou validés, datés, et ne contenir ni données personnelles ni informations confidentielles.</td></tr>
<tr><td>8</td><td>A</td><td>Le déclencheur est l'événement qui lance l'automatisation ; viennent ensuite d'éventuelles conditions, puis les actions. Une étape d'IA n'est jamais obligatoire.</td></tr>
<tr><td>9</td><td>B</td><td>12 min – (10 s + 6 min + 3 min) ≈ 3 minutes. Le temps de vérification et de correction doit toujours être compté.</td></tr>
<tr><td>10</td><td>B</td><td>Un plan modeste, daté et mesurable est tenu ; un plan trop ambitieux est abandonné.</td></tr>
</table>
<p><strong>Barème indicatif :</strong> 9 ou 10 bonnes réponses : notions maîtrisées ; 6 à 8 : relire les sections correspondant aux erreurs ; moins de 6 : reprendre le chapitre avant le cas pratique.</p>
`,
      },
      {
        title: "5.10 – Cas pratique : bâtir le plan d'intégration de l'IA du pôle administratif et commercial de Thermia Rénov",
        content: `
<h3>Consigne</h3>
<p>Sandrine MOREL, dirigeante de <strong>Thermia Rénov</strong> (PME fictive de 14 salariés à Saint-Genis-Laval), vous confie la préparation du plan d'intégration de l'IA pour le pôle administratif et commercial. Tous les chiffres sont fictifs.</p>
<p><strong>Situation :</strong></p>
<ul>
<li>L'entreprise utilise Microsoft 365 (Outlook, Word, Excel, Teams). Aucune licence Copilot pour Microsoft 365 n'a été attribuée à ce jour ; certains salariés utilisent des assistants conversationnels gratuits avec leur compte personnel.</li>
<li>Julie (assistante administrative) consacre chaque semaine : 2 h 20 à recopier les demandes de devis du site dans le fichier de suivi et à y répondre ; 2 h aux relances de devis ; 1 h 30 au compte rendu de la réunion du lundi.</li>
<li>Karim (commercial) consacre 2 h par semaine à rédiger les textes de présentation des solutions dans ses propositions et 1 h 30 à « estimer les aides » de ses clients. Il a récemment collé un devis complet, avec le nom et l'adresse d'un client, dans un assistant gratuit pour « l'améliorer ».</li>
<li>Thomas (conducteur de travaux) consacre 3 h par semaine aux comptes rendus de visite de chantier ; il souhaite enregistrer ses échanges avec les clients pour « gagner du temps ».</li>
<li>Deux salariés de l'atelier ont exprimé la crainte que « l'IA serve à supprimer des postes ».</li>
</ul>
<p><strong>Travail demandé :</strong></p>
<ol>
<li>Classez les tâches décrites dans une matrice gain/risque et justifiez chaque classement.</li>
<li>Choisissez les trois usages du pilote et précisez, pour chacun, l'outil, la méthode et les précautions.</li>
<li>Décrivez pas à pas l'automatisation des demandes de devis du site.</li>
<li>Répondez à la demande de Thomas d'enregistrer ses échanges avec les clients.</li>
<li>Proposez le traitement de l'incident de Karim et la règle à en tirer.</li>
<li>Construisez le tableau de mesure du pilote et estimez le gain hebdomadaire attendu.</li>
<li>Rédigez le message de Sandrine à l'équipe pour lancer le projet en répondant aux inquiétudes exprimées.</li>
</ol>

<h3>Corrigé</h3>

<h4>1. Matrice gain/risque</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Tâche</th><th>Gain</th><th>Risque</th><th>Zone</th><th>Justification</th></tr>
<tr><td>Enregistrer et accuser réception des demandes de devis</td><td>Élevé</td><td>Faible si automatisation sans IA et texte fixe</td><td>1</td><td>Tâche répétitive, source structurée (formulaire), aucun contenu généré : une automatisation simple suffit.</td></tr>
<tr><td>Compte rendu de la réunion du lundi</td><td>Élevé</td><td>Faible (réunion interne, transcription annoncée)</td><td>1</td><td>Gain net, contenu interne, relecture par Julie et validation par Sandrine.</td></tr>
<tr><td>Textes de présentation des solutions</td><td>Élevé</td><td>Moyen (exactitude technique)</td><td>1 avec relecture technique</td><td>Textes génériques sans données client, réutilisables une fois validés par Thomas.</td></tr>
<tr><td>Relances de devis</td><td>Élevé</td><td>Élevé (données clients, montants)</td><td>2</td><td>À encadrer : modèle de relance rédigé avec l'IA, sans données réelles ; personnalisation dans Outlook ; liste des devis à relancer produite par le tableur.</td></tr>
<tr><td>Comptes rendus de visite de chantier</td><td>Élevé</td><td>Moyen à élevé (noms, adresses, réserves)</td><td>2</td><td>Dictée des notes techniques sans nom du client, mise en forme par un assistant, ajout des données nominatives dans le dossier de l'entreprise.</td></tr>
<tr><td>Estimer les aides des clients</td><td>Faible</td><td>Élevé</td><td>4</td><td>Risque d'hallucination sur des montants et des conditions qui évoluent ; erreur engageant l'entreprise : simulateurs et sources officielles uniquement.</td></tr>
<tr><td>Enregistrer les échanges avec les clients chez eux</td><td>Moyen</td><td>Élevé (vie privée, consentement)</td><td>4</td><td>Voir la réponse au point 4.</td></tr>
</table>

<h4>2. Les trois usages du pilote</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Usage</th><th>Outil</th><th>Méthode</th><th>Précautions</th></tr>
<tr><td>Automatisation des demandes de devis</td><td>Power Automate, inclus selon l'abonnement Microsoft 365 (à vérifier)</td><td>Flux « nouveau courriel – ligne dans le tableau – accusé de réception fixe – message au commercial » (point 3).</td><td>Aucune étape d'IA ; texte d'accusé de réception validé ; tests avec une adresse de test ; responsable du flux : Julie.</td></tr>
<tr><td>Compte rendu de la réunion du lundi</td><td>Outil de l'offre professionnelle retenue par l'entreprise (transcription Teams ou assistant professionnel)</td><td>Transcription annoncée, requête type de la section 5.4, relecture, validation, suppression de la transcription.</td><td>Accord de tous en début de réunion ; notes manuscrites si refus ; aucun propos personnel repris.</td></tr>
<tr><td>Bibliothèque de textes de présentation des solutions</td><td>Assistant conversationnel en compte professionnel, ou Word avec Copilot si une licence est attribuée</td><td>Génération à partir des fiches techniques publiques ; relecture technique par Thomas ; enregistrement dans un document « Textes validés » daté.</td><td>Aucune donnée client ; aucun chiffre de performance ou d'économie non sourcé ; aucune mention d'aide garantie.</td></tr>
</table>
<p>Préalable au pilote : choisir une offre professionnelle avec des engagements de confidentialité adaptés, créer des comptes au nom de l'entreprise et faire adopter une charte d'usage (chapitre 6). Les comptes personnels gratuits ne doivent plus être utilisés pour le travail.</p>

<h4>3. Automatisation des demandes de devis, pas à pas</h4>
<ol>
<li>Créer dans Excel, sur l'espace partagé de l'entreprise, un tableau « Demandes » : Date, Nom, Commune, Type de travaux, Message, Statut, Commercial.</li>
<li>Vérifier que le formulaire du site envoie un courriel structuré à objet constant (« Demande de devis ») et propose une liste déroulante pour le type de travaux.</li>
<li>Créer un flux automatisé déclenché par l'arrivée d'un courriel dans la boîte « contact », avec un filtre sur l'objet.</li>
<li>Extraire les champs du courriel et ajouter une ligne au tableau, statut « Nouvelle ».</li>
<li>Envoyer au demandeur un accusé de réception au texte fixe validé par Sandrine, avec le lien vers la politique de confidentialité.</li>
<li>Publier dans le canal « Commercial » un message limité au type de travaux et à la commune, avec un lien vers la ligne du tableau.</li>
<li>Tester avec trois demandes fictives (dont un champ vide et un nom avec apostrophe) envoyées depuis une adresse de test.</li>
<li>Activer les alertes d'échec, prévoir une procédure manuelle de secours et rédiger la fiche de documentation du flux.</li>
</ol>

<h4>4. Réponse à Thomas</h4>
<p>« Thomas, je comprends l'objectif, mais nous n'enregistrerons pas les échanges chez les clients. Ils sont chez eux, ils parlent parfois de leur situation personnelle, et un enregistrement suppose leur information et leur accord explicites ; un enregistrement à leur insu est exclu. Je te propose plutôt de dicter tes notes techniques après la visite, sans citer le nom du client, puis d'utiliser l'assistant « comptes rendus de chantier » pour les mettre en forme. Tu ajoutes le nom et l'adresse dans le dossier du client sur notre espace. On mesure le temps gagné pendant un mois. »</p>

<h4>5. Traitement de l'incident de Karim</h4>
<ul>
<li><strong>Analyse :</strong> un devis nominatif contient des données personnelles du client (nom, adresse, nature des travaux, montant) et des informations commerciales de l'entreprise. Le coller dans un assistant gratuit avec un compte personnel revient à transmettre ces données à un service dont les conditions n'ont pas été validées par l'entreprise.</li>
<li><strong>Actions immédiates :</strong> supprimer la conversation dans l'historique de l'outil, vérifier les réglages du compte (utilisation des conversations pour l'entraînement), informer Sandrine, consigner l'incident dans le registre interne. Sandrine apprécie, au regard du RGPD, si l'incident constitue une violation de données devant être notifiée ; elle peut s'appuyer sur les ressources de la CNIL.</li>
<li><strong>Règle à en tirer (charte) :</strong> aucune donnée identifiante de client dans un outil grand public non paramétré ; pour améliorer un texte de devis, travailler sur un texte anonymisé (« Client A, commune X ») ou dans l'outil professionnel autorisé.</li>
<li><strong>Posture :</strong> l'incident est traité sans sanction, car Karim l'a signalé de bonne foi ; il illustre la nécessité de la charte et de la formation.</li>
</ul>

<h4>6. Tableau de mesure du pilote et gain attendu</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Usage</th><th>Temps habituel / semaine</th><th>Temps estimé avec l'outil, vérification comprise</th><th>Gain estimé / semaine</th><th>Indicateur de qualité</th></tr>
<tr><td>Demandes de devis (Julie)</td><td>2 h 20</td><td>20 min</td><td>2 h</td><td>Nombre de demandes oubliées ; délai d'accusé de réception.</td></tr>
<tr><td>Compte rendu du lundi (Julie)</td><td>1 h 30</td><td>25 min</td><td>1 h 05</td><td>Corrections demandées par Sandrine ; diffusion le jour même.</td></tr>
<tr><td>Textes de présentation (Karim)</td><td>2 h</td><td>45 min les premières semaines, puis moins grâce à la bibliothèque</td><td>1 h 15</td><td>Corrections techniques de Thomas ; retours clients.</td></tr>
<tr><td><strong>Total</strong></td><td>5 h 50</td><td>1 h 30</td><td><strong>4 h 20</strong></td><td>Incidents de conformité : objectif 0.</td></tr>
</table>
<p>Ces estimations seront remplacées par des mesures réelles pendant les quatre semaines du pilote, en comptant le temps de préparation, de vérification et de correction. Le temps consacré à « estimer les aides » n'est pas transféré à l'IA : il reste sur les outils officiels.</p>

<h4>7. Message de Sandrine à l'équipe</h4>
<blockquote>
<p>Bonjour à tous,</p>
<p>Comme annoncé, nous allons tester l'intelligence artificielle sur quelques tâches administratives et d'écriture. Je veux être claire sur trois points.</p>
<p>1. <strong>Il ne s'agit pas de supprimer des postes.</strong> L'objectif est de passer moins de temps à recopier, mettre en forme et relancer, pour en consacrer davantage à nos clients et à nos chantiers. Les métiers de l'atelier et du chantier ne sont pas concernés par ce test.</p>
<p>2. <strong>Nous protégeons nos clients.</strong> Une charte d'usage sera adoptée avant le test : elle dira quels outils utiliser, avec quels comptes, et quelles informations ne doivent jamais y être saisies. Les comptes personnels gratuits ne doivent plus servir pour le travail.</p>
<p>3. <strong>Personne ne sera laissé seul.</strong> Julie et Karim sont référents ; nous ferons un point d'un quart d'heure en réunion du lundi chaque semaine, et un bilan complet dans un mois, y compris sur ce qui n'aura pas marché.</p>
<p>Vos questions et vos idées sont les bienvenues, en réunion ou directement auprès de moi.</p>
<p>Sandrine</p>
</blockquote>
<blockquote><strong>À retenir :</strong> un plan d'intégration crédible part de la cartographie, lance d'abord des usages à fort gain et faible risque, automatise sans IA ce qui peut l'être par des règles, écarte les usages dangereux (aides, enregistrement chez les clients), traite les incidents sans les cacher, mesure honnêtement et explique le projet à toute l'équipe.</blockquote>
`,
      },
    ],
  },
  {
    title: "Chapitre 6 – Utiliser l'IA de façon responsable et conforme (C5)",
    description:
      "Appliquer le RGPD aux usages de l'IA générative (données personnelles, bases légales, minimisation, interdiction de saisir des données clients identifiantes dans un outil grand public non paramétré) ; protéger le secret des affaires ; paramétrer la confidentialité des outils et choisir une offre professionnelle ; connaître les recommandations de la CNIL ; comprendre le règlement européen sur l'IA (UE) 2024/1689, son calendrier d'application, l'obligation de maîtrise de l'IA (article 4) et les obligations de transparence (article 50) ; respecter le droit d'auteur ; être transparent vis-à-vis des clients ; prévenir les biais et les discriminations ; tenir compte de l'impact environnemental ; rédiger une charte d'usage de l'IA. Durée indicative : 2 h 30 (après-midi du jour 3, avant l'évaluation finale). Fil rouge : Thermia Rénov, PME fictive de rénovation énergétique à Saint-Genis-Laval (Rhône).",
    sections: [
      {
        title: "6.1 – Le RGPD appliqué à l'IA générative : données personnelles, bases légales, minimisation",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Reconnaître une donnée personnelle et une donnée sensible dans les situations de travail courantes.</li>
<li>Connaître les grands principes du RGPD et les bases légales d'un traitement.</li>
<li>Appliquer le principe de minimisation aux requêtes adressées à une IA.</li>
<li>Savoir ce qu'il ne faut jamais saisir dans un outil grand public non paramétré.</li>
</ul>

<h3>1. Rappel : qu'est-ce qu'une donnée personnelle ?</h3>
<p>Le règlement général sur la protection des données (RGPD, règlement (UE) 2016/679), applicable depuis le 25 mai 2018 et complété en France par la loi « Informatique et Libertés », protège les <strong>données personnelles</strong> : toute information se rapportant à une personne physique identifiée ou identifiable, directement (nom, photo) ou indirectement (adresse, numéro de téléphone, numéro de dossier, combinaison d'informations permettant de retrouver la personne).</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Catégorie</th><th>Exemples dans une entreprise de rénovation</th></tr>
<tr><td>Données d'identification</td><td>Nom, prénom, adresse du chantier, téléphone, courriel, photo de la façade avec le numéro de rue.</td></tr>
<tr><td>Données économiques et financières</td><td>Revenus déclarés pour une demande d'aide, avis d'imposition, plan de financement, coordonnées bancaires.</td></tr>
<tr><td>Données de vie personnelle</td><td>Composition du foyer, situation de propriétaire ou de locataire, habitudes de chauffage, horaires de présence.</td></tr>
<tr><td>Données sensibles (régime renforcé)</td><td>Données de santé (par exemple un handicap justifiant une adaptation du logement), opinions, convictions religieuses, appartenance syndicale, données biométriques.</td></tr>
<tr><td>Données des salariés</td><td>Évaluations, arrêts de travail, rémunérations, sanctions, candidatures.</td></tr>
</table>
<p>Une donnée « pseudonymisée » (le nom remplacé par un code, mais la correspondance conservée quelque part) reste une donnée personnelle. Seule une donnée réellement <strong>anonymisée</strong>, c'est-à-dire qui ne permet plus du tout de retrouver la personne, sort du champ du RGPD. Attention : un texte sans nom mais contenant une adresse précise, une situation familiale et un montant de travaux permet souvent d'identifier quelqu'un.</p>

<h3>2. Les principes du RGPD utiles au quotidien</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Principe</th><th>Signification</th><th>Application à l'IA générative</th></tr>
<tr><td>Finalité</td><td>Les données sont collectées pour un objectif déterminé et légitime.</td><td>Les données collectées pour établir un devis ne peuvent pas être réutilisées librement pour un autre objectif (par exemple, entraîner un outil ou profiler le client).</td></tr>
<tr><td>Minimisation</td><td>Seules les données nécessaires sont traitées.</td><td>Ne saisir dans une requête que les informations indispensables à la tâche ; le nom du client est presque toujours inutile.</td></tr>
<tr><td>Exactitude</td><td>Les données doivent être exactes et tenues à jour.</td><td>Un résumé ou une fiche client produits par l'IA peuvent contenir des erreurs : vérifier avant de les enregistrer dans le dossier.</td></tr>
<tr><td>Limitation de la conservation</td><td>Les données ne sont pas conservées plus longtemps que nécessaire.</td><td>Supprimer les historiques de conversation et les transcriptions devenus inutiles.</td></tr>
<tr><td>Sécurité et confidentialité</td><td>Les données sont protégées contre l'accès non autorisé et la perte.</td><td>Utiliser des outils et des comptes validés par l'entreprise, avec authentification sécurisée.</td></tr>
<tr><td>Transparence</td><td>Les personnes sont informées de l'utilisation de leurs données.</td><td>La politique de confidentialité de l'entreprise doit refléter les traitements réalisés, y compris avec des prestataires d'IA.</td></tr>
<tr><td>Responsabilité</td><td>L'entreprise doit pouvoir démontrer sa conformité.</td><td>Charte d'usage, registre des traitements, contrats avec les fournisseurs, formation des salariés.</td></tr>
</table>

<h3>3. Les bases légales</h3>
<p>Tout traitement de données personnelles doit reposer sur l'une des six bases légales prévues par l'article 6 du RGPD. Pour une PME, les plus courantes sont :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Base légale</th><th>Exemple</th></tr>
<tr><td>Exécution d'un contrat ou de mesures précontractuelles</td><td>Utiliser l'adresse du client pour établir son devis et réaliser le chantier.</td></tr>
<tr><td>Obligation légale</td><td>Conserver les factures pendant la durée exigée par la réglementation comptable.</td></tr>
<tr><td>Intérêt légitime</td><td>Organiser le suivi de satisfaction des clients après chantier, sous réserve de ne pas porter une atteinte excessive à leurs droits.</td></tr>
<tr><td>Consentement</td><td>Envoyer une lettre d'information commerciale par courriel à des particuliers ; publier la photo d'un chantier permettant d'identifier une maison.</td></tr>
<tr><td>Sauvegarde des intérêts vitaux, mission d'intérêt public</td><td>Rarement pertinentes pour une PME.</td></tr>
</table>
<p>Lorsqu'un salarié colle des données d'un client dans un outil d'IA, il réalise une opération de traitement, et souvent une <strong>transmission à un prestataire</strong>. Cette opération doit être compatible avec la finalité initiale, couverte par un contrat avec le fournisseur lorsque celui-ci agit comme sous-traitant (article 28 du RGPD) et, si le fournisseur traite les données hors de l'Union européenne, encadrée par les garanties prévues pour les transferts. Ces vérifications relèvent de l'entreprise, pas du salarié pris isolément : c'est pourquoi la charte désigne les outils autorisés.</p>

<h3>4. La règle d'or : rien d'identifiant dans un outil grand public non paramétré</h3>
<p>Les versions gratuites ou grand public des assistants conversationnels sont utilisées avec un compte personnel, selon des conditions générales qui peuvent prévoir la réutilisation des conversations pour améliorer les modèles, une conservation des échanges et un examen éventuel par du personnel du fournisseur. L'entreprise n'a, dans ce cas, ni contrat de sous-traitance ni maîtrise du paramétrage. La règle est donc simple :</p>
<blockquote><strong>Bonne pratique :</strong> ne saisissez jamais de données clients identifiantes (nom, adresse, téléphone, courriel, revenus, avis d'imposition, situation familiale ou de santé), ni de données de salariés, dans un outil d'IA grand public non paramétré par l'entreprise. Anonymisez, ou utilisez l'outil professionnel autorisé par la charte.</blockquote>

<h3>5. Anonymiser une requête : méthode pratique</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Requête à risque</th><th>Requête minimisée</th></tr>
<tr><td>« Rédige un courriel à M. Jean-Pierre Durand, 12 rue des Lilas à Saint-Genis-Laval, qui a 2 800 € de revenus mensuels et dont la femme est en fauteuil roulant, pour lui proposer notre PAC à 14 500 €. »</td><td>« Rédige un courriel de proposition pour un client particulier, propriétaire d'une maison des années 1970, qui envisage une pompe à chaleur air/eau. Ton rassurant, 150 mots, pas de montant d'aide. Laisse [NOM] et [MONTANT] à compléter. »</td></tr>
<tr><td>« Résume l'entretien annuel de Thomas, voici le compte rendu complet. »</td><td>Ne pas utiliser d'outil grand public ; si l'entreprise dispose d'un outil professionnel autorisé pour ce type de document, demander d'abord l'accord de la direction et se limiter à la mise en forme.</td></tr>
<tr><td>Photo d'un avis d'imposition pour « calculer l'éligibilité aux aides »</td><td>Jamais. Utiliser les simulateurs officiels avec le client.</td></tr>
</table>
<p>Méthode en trois questions avant chaque requête : 1. De quelles informations l'IA a-t-elle réellement besoin ? 2. Une personne pourrait-elle être reconnue à partir de ce que je saisis ? 3. Cet outil est-il autorisé pour ce type de données ?</p>

<h3>6. Les droits des personnes et les décisions automatisées</h3>
<p>Les personnes disposent de droits (accès, rectification, effacement, opposition, limitation, portabilité selon les cas). L'entreprise doit pouvoir y répondre, y compris pour des données traitées avec un outil d'IA : une raison de plus pour savoir où les données sont allées. Par ailleurs, le RGPD encadre strictement les décisions fondées exclusivement sur un traitement automatisé produisant des effets juridiques ou significatifs pour la personne (article 22) : refuser un client, fixer un prix individualisé ou écarter un candidat ne doit pas être décidé par une IA sans intervention humaine réelle.</p>
<blockquote><strong>À retenir :</strong> la voix, le nom, l'adresse, la situation financière ou familiale d'un client sont des données personnelles. Appliquez la minimisation à chaque requête, n'utilisez que les outils autorisés, ne saisissez jamais de données identifiantes dans un outil grand public non paramétré et gardez toujours la décision humaine.</blockquote>
`,
      },
      {
        title: "6.2 – Secret des affaires et confidentialité des informations de l'entreprise",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Identifier les informations de l'entreprise qui doivent rester confidentielles.</li>
<li>Comprendre la protection juridique du secret des affaires et ses conditions.</li>
<li>Respecter les engagements de confidentialité pris envers des clients ou des partenaires.</li>
</ul>

<h3>1. Ce qui est en jeu</h3>
<p>Le RGPD protège les personnes ; mais une entreprise possède aussi des informations précieuses qui ne concernent personne en particulier : prix de revient, marges, conditions obtenues auprès des fournisseurs, méthodes de chiffrage, fichiers de prescripteurs, offres remises dans un appel d'offres en cours, projets de développement. Leur divulgation, même involontaire, peut profiter à un concurrent ou affaiblir l'entreprise dans une négociation.</p>

<h3>2. La protection du secret des affaires</h3>
<p>La loi n° 2018-670 du 30 juillet 2018, qui a transposé une directive européenne, protège au titre du <strong>secret des affaires</strong> (articles L. 151-1 et suivants du code de commerce) toute information qui remplit trois conditions :</p>
<ol>
<li>elle n'est pas généralement connue ou aisément accessible pour les personnes du secteur ;</li>
<li>elle a une valeur commerciale, effective ou potentielle, du fait de son caractère secret ;</li>
<li>elle fait l'objet de <strong>mesures de protection raisonnables</strong> de la part de son détenteur.</li>
</ol>
<p>La troisième condition est déterminante : une entreprise qui laisse ses salariés copier librement ses grilles de prix dans des outils en ligne non maîtrisés aura plus de mal à démontrer qu'elle protégeait ces informations. La charte d'usage de l'IA, les mentions de confidentialité sur les documents et le choix d'outils paramétrés font partie de ces mesures raisonnables.</p>

<h3>3. Les informations à protéger chez Thermia Rénov</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Niveau</th><th>Exemples</th><th>Usage avec l'IA</th></tr>
<tr><td><strong>Public</strong></td><td>Site internet, plaquette, publications, fiches techniques des fabricants.</td><td>Libre, avec vérification des contenus produits.</td></tr>
<tr><td><strong>Interne</strong></td><td>Procédures, modèles de courriers, organisation des équipes, planning général.</td><td>Outil professionnel autorisé ; pas d'outil grand public avec un compte personnel.</td></tr>
<tr><td><strong>Confidentiel</strong></td><td>Prix de revient, marges, remises fournisseurs, offres en cours, résultats financiers, données de clients et de salariés.</td><td>Outil professionnel autorisé uniquement, pour des usages prévus par la charte, et après minimisation.</td></tr>
<tr><td><strong>Secret ou sous engagement</strong></td><td>Documents reçus sous accord de confidentialité, pièces d'un litige, projet de cession ou d'acquisition.</td><td>Aucun usage avec un outil d'IA sans accord préalable de la direction.</td></tr>
</table>

<h3>4. Les engagements contractuels</h3>
<p>L'entreprise reçoit parfois des informations soumises à confidentialité : cahier des charges d'un maître d'ouvrage privé, plans d'un bâtiment tertiaire, dossier d'un appel d'offres comportant une clause de confidentialité, accord signé avec un partenaire. Avant de résumer ces documents avec une IA, vérifiez que l'engagement pris le permet : transmettre un document confidentiel à un prestataire non autorisé peut constituer une violation du contrat, quelle que soit la qualité de l'outil.</p>

<h3>5. Les autres risques de fuite</h3>
<ul>
<li><strong>Partage de conversations</strong> : certains outils permettent de créer un lien de partage d'une conversation ; ce lien peut être transmis, voire indexé s'il est public.</li>
<li><strong>Extensions de navigateur et applications tierces</strong> « boostées à l'IA », qui lisent le contenu des pages ou des courriels.</li>
<li><strong>Assistants de réunion</strong> qui se connectent automatiquement à l'agenda (section 5.4).</li>
<li><strong>Fichiers joints</strong> contenant des onglets masqués, des commentaires ou des métadonnées (auteur, historique des modifications).</li>
<li><strong>Captures d'écran</strong> sur lesquelles apparaissent d'autres onglets, des courriels ou des notifications.</li>
</ul>
<blockquote><strong>Bonne pratique :</strong> avant de joindre un fichier à une IA, ouvrez-le et regardez ce qu'il contient vraiment : onglets masqués, colonnes cachées, commentaires, historique. En cas de doute, créez un nouveau fichier ne contenant que les données nécessaires.</blockquote>
<blockquote><strong>À retenir :</strong> le secret des affaires ne protège que les informations que l'entreprise protège elle-même. Classez vos informations, réservez les données confidentielles aux outils autorisés, respectez les engagements de confidentialité pris envers les clients et partenaires, et méfiez-vous des fuites indirectes.</blockquote>
`,
      },
      {
        title: "6.3 – Paramétrer la confidentialité, choisir une offre professionnelle et suivre les recommandations de la CNIL",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Connaître les principaux réglages de confidentialité des assistants conversationnels.</li>
<li>Distinguer offres grand public et offres professionnelles du point de vue de la protection des données.</li>
<li>Établir une grille de choix d'un outil pour l'entreprise.</li>
<li>Savoir où trouver les recommandations de la CNIL.</li>
</ul>

<h3>1. Les réglages à connaître</h3>
<p>Les menus et les intitulés changent d'un outil à l'autre et d'une version à l'autre ; les réglages suivants existent toutefois, sous une forme ou une autre, dans la plupart des assistants. Vérifiez-les dans les paramètres de votre compte et dans la documentation officielle de l'éditeur.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Réglage</th><th>Ce qu'il contrôle</th><th>Recommandation</th></tr>
<tr><td>Utilisation des conversations pour améliorer les modèles</td><td>Si vos échanges peuvent servir à l'entraînement des modèles de l'éditeur.</td><td>Désactiver lorsque c'est possible ; dans les offres professionnelles, vérifier que l'exclusion est prévue par contrat.</td></tr>
<tr><td>Historique des conversations</td><td>La conservation de vos échanges dans le compte.</td><td>Supprimer régulièrement les conversations devenues inutiles ; utiliser les modes « temporaires » quand ils existent.</td></tr>
<tr><td>Mémoire</td><td>La capacité de l'assistant à retenir des informations d'une conversation à l'autre.</td><td>Consulter et purger ce qui a été mémorisé ; ne pas laisser l'outil retenir des informations sur des clients.</td></tr>
<tr><td>Liens de partage</td><td>La création de liens publics vers une conversation.</td><td>Ne pas partager de conversation contenant des informations internes ; supprimer les liens inutiles.</td></tr>
<tr><td>Connecteurs et applications</td><td>L'accès de l'assistant à votre messagerie, vos fichiers, votre agenda.</td><td>N'activer que les connexions nécessaires et autorisées par l'entreprise.</td></tr>
<tr><td>Sécurité du compte</td><td>Mot de passe, double authentification.</td><td>Activer la double authentification ; ne jamais partager un compte entre collègues.</td></tr>
</table>
<p>Même désactivée, l'utilisation pour l'entraînement n'empêche pas toujours une conservation temporaire des échanges par l'éditeur, par exemple à des fins de sécurité ou de lutte contre les abus. Lisez la politique de confidentialité pour savoir ce qu'il en est.</p>

<h3>2. Offres grand public et offres professionnelles</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Offre grand public (gratuite ou payante individuelle)</th><th>Offre professionnelle ou entreprise</th></tr>
<tr><td>Titulaire du compte</td><td>Le salarié, à titre personnel.</td><td>L'entreprise, qui gère les comptes de ses utilisateurs.</td></tr>
<tr><td>Contrat</td><td>Conditions générales acceptées individuellement.</td><td>Contrat d'entreprise, souvent accompagné d'un accord de traitement des données (sous-traitance au sens du RGPD).</td></tr>
<tr><td>Entraînement sur les données</td><td>Selon les réglages et les conditions.</td><td>En principe exclu par contrat : à vérifier dans les engagements de l'éditeur.</td></tr>
<tr><td>Administration</td><td>Aucune : l'entreprise ne voit rien et ne peut rien paramétrer.</td><td>Console d'administration, gestion des accès, désactivation de fonctions, journalisation selon les offres.</td></tr>
<tr><td>Départ d'un salarié</td><td>Les conversations et assistants restent sur son compte personnel.</td><td>L'entreprise désactive le compte et conserve la maîtrise des contenus.</td></tr>
<tr><td>Localisation des données</td><td>Souvent hors de l'Union européenne, selon l'éditeur.</td><td>Options d'hébergement ou de traitement dans l'Union européenne proposées par certains éditeurs : à vérifier.</td></tr>
</table>

<h3>3. Grille de choix d'un outil pour la PME</h3>
<ol>
<li><strong>Besoin</strong> : quels usages de la cartographie l'outil doit-il couvrir ? Faut-il une intégration à la suite bureautique ?</li>
<li><strong>Contrat et données</strong> : existe-t-il un accord de traitement des données ? Les données sont-elles exclues de l'entraînement ? Où sont-elles traitées et conservées, et combien de temps ?</li>
<li><strong>Administration</strong> : l'entreprise peut-elle créer et supprimer les comptes, désactiver des fonctions, partager des assistants en interne ?</li>
<li><strong>Sécurité</strong> : authentification forte, gestion des droits, engagements de sécurité publiés par l'éditeur.</li>
<li><strong>Coût et réversibilité</strong> : abonnement par utilisateur, possibilité d'exporter ses contenus, durée d'engagement.</li>
<li><strong>Accompagnement</strong> : documentation en français, assistance, interlocuteur.</li>
</ol>
<p>L'offre la plus connue n'est pas forcément la plus adaptée. Une PME déjà équipée de Microsoft 365 regardera naturellement Copilot ; une entreprise sous Google Workspace, Gemini ; d'autres éditeurs, dont l'éditeur français Mistral AI avec Le Chat, ou Anthropic avec Claude, proposent également des offres pour les entreprises. Le choix se fait sur les critères ci-dessus, documents contractuels à l'appui.</p>

<h3>4. Les recommandations de la CNIL</h3>
<p>La Commission nationale de l'informatique et des libertés (CNIL), autorité française de protection des données, publie sur son site (cnil.fr) des contenus consacrés à l'intelligence artificielle : fiches pratiques et recommandations sur le développement et l'utilisation des systèmes d'IA au regard du RGPD, guides pour les entreprises, outils d'auto-évaluation, ainsi que des ressources générales destinées aux TPE et PME (sécurité des données, registre des traitements, gestion des violations de données). Ces contenus sont régulièrement enrichis : consultez-les directement plutôt que de vous fier à un résumé, qui peut être daté.</p>
<p>Parmi les messages constants de la CNIL que l'on peut retenir pour un usage en entreprise :</p>
<ul>
<li>définir la finalité de l'usage de l'IA avant de choisir l'outil ;</li>
<li>appliquer la minimisation et éviter de saisir des données personnelles lorsque ce n'est pas nécessaire ;</li>
<li>vérifier les conditions du fournisseur et encadrer la relation par un contrat ;</li>
<li>informer les personnes concernées et leur permettre d'exercer leurs droits ;</li>
<li>sécuriser les accès et former les utilisateurs ;</li>
<li>mener, lorsque le traitement présente un risque élevé pour les personnes, une analyse d'impact relative à la protection des données (AIPD).</li>
</ul>
<blockquote><strong>Bonne pratique :</strong> désignez dans l'entreprise une personne chargée de suivre les publications de la CNIL et des éditeurs d'outils (une consultation par trimestre suffit) et de proposer, si nécessaire, une mise à jour de la charte d'usage.</blockquote>
<blockquote><strong>À retenir :</strong> paramétrez vos outils (entraînement, historique, mémoire, partage, connecteurs, double authentification), préférez une offre professionnelle gérée par l'entreprise et couverte par un contrat, choisissez l'outil sur des critères documentés et appuyez-vous sur les ressources officielles de la CNIL.</blockquote>
`,
      },
      {
        title: "6.4 – Le règlement européen sur l'IA (UE) 2024/1689 : logique, niveaux de risque et calendrier",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Comprendre l'objet et la logique du règlement européen sur l'intelligence artificielle.</li>
<li>Distinguer les rôles de fournisseur et de déployeur.</li>
<li>Connaître les niveaux de risque et les pratiques interdites.</li>
<li>Connaître le calendrier d'application et l'état des propositions de modification.</li>
</ul>

<h3>1. Un règlement fondé sur les risques</h3>
<p>Le <strong>règlement (UE) 2024/1689</strong> du Parlement européen et du Conseil du 13 juin 2024, souvent appelé « AI Act » ou « règlement sur l'IA », établit des règles harmonisées pour la mise sur le marché et l'utilisation des systèmes d'intelligence artificielle dans l'Union européenne. Il est directement applicable dans tous les États membres, sans transposition. Sa logique est <strong>proportionnée au risque</strong> : plus un système d'IA peut porter atteinte à la santé, à la sécurité ou aux droits fondamentaux, plus les obligations sont lourdes. Il s'ajoute au RGPD, qui continue de s'appliquer à toutes les données personnelles.</p>

<h3>2. Qui est concerné : fournisseur et déployeur</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rôle</th><th>Définition simplifiée</th><th>Exemple</th></tr>
<tr><td>Fournisseur</td><td>Celui qui développe un système ou un modèle d'IA et le met sur le marché ou en service sous son nom.</td><td>L'éditeur d'un assistant conversationnel, d'un logiciel de tri de candidatures.</td></tr>
<tr><td>Déployeur</td><td>Celui qui utilise un système d'IA sous sa propre autorité dans un cadre professionnel.</td><td>Thermia Rénov lorsqu'elle utilise un assistant conversationnel, Copilot ou un outil de transcription pour son activité.</td></tr>
</table>
<p>Une PME qui utilise des outils d'IA du marché est, dans la grande majorité des cas, <strong>déployeur</strong>. Ses obligations sont plus légères que celles des fournisseurs, mais elles existent : maîtrise de l'IA (article 4), transparence dans certains cas (article 50), et obligations renforcées si elle utilise un système à haut risque.</p>

<h3>3. Les quatre niveaux de risque</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Niveau</th><th>Exemples</th><th>Régime</th></tr>
<tr><td><strong>Risque inacceptable</strong></td><td>Notation sociale des personnes, manipulation exploitant les vulnérabilités, reconnaissance des émotions sur le lieu de travail (sauf raisons médicales ou de sécurité), certaines formes de catégorisation biométrique ou d'identification biométrique à distance.</td><td>Pratiques <strong>interdites</strong> (article 5).</td></tr>
<tr><td><strong>Haut risque</strong></td><td>Systèmes utilisés notamment pour le recrutement et la gestion des travailleurs, l'accès à l'éducation et à la formation, l'évaluation de la solvabilité des personnes, certains services essentiels, ou intégrés à des produits soumis à une réglementation de sécurité.</td><td>Obligations lourdes pour les fournisseurs (gestion des risques, documentation, qualité des données) et obligations pour les déployeurs (utilisation conforme à la notice, contrôle humain, surveillance, information des personnes concernées).</td></tr>
<tr><td><strong>Risque spécifique de transparence</strong></td><td>Assistants conversationnels, contenus générés ou manipulés (textes, images, sons, vidéos), hypertrucages.</td><td>Obligations d'information (article 50, section 6.5).</td></tr>
<tr><td><strong>Risque minimal</strong></td><td>Filtres anti-indésirables, correcteurs orthographiques, la plupart des usages bureautiques.</td><td>Pas d'obligation spécifique au-delà de la maîtrise de l'IA ; codes de conduite volontaires.</td></tr>
</table>
<p>Le règlement prévoit aussi des obligations propres aux <strong>modèles d'IA à usage général</strong> (les grands modèles sur lesquels reposent les assistants conversationnels) : documentation technique, informations aux intégrateurs, politique de respect du droit d'auteur, résumé des données d'entraînement, et obligations renforcées pour les modèles présentant un risque systémique. Elles pèsent sur les fournisseurs de ces modèles, pas sur les entreprises utilisatrices.</p>
<blockquote><strong>Bonne pratique :</strong> un outil d'aide au tri de candidatures ou d'évaluation des salariés peut relever du haut risque. Avant d'en acquérir un, même intégré à un logiciel de gestion, interrogez le fournisseur sur sa conformité au règlement et prévoyez un contrôle humain réel de chaque décision.</blockquote>

<h3>4. Le calendrier d'application</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Date</th><th>Ce qui s'applique</th></tr>
<tr><td>1er août 2024</td><td>Entrée en vigueur du règlement.</td></tr>
<tr><td>2 février 2025</td><td>Interdiction des pratiques à risque inacceptable (article 5) et obligation de maîtrise de l'IA (« AI literacy », article 4).</td></tr>
<tr><td>2 août 2025</td><td>Obligations applicables aux modèles d'IA à usage général ; mise en place de la gouvernance et des règles relatives aux sanctions.</td></tr>
<tr><td>2 août 2026</td><td>Obligations de transparence (article 50) et application de la plupart des autres dispositions, notamment celles concernant les systèmes à haut risque mentionnés à l'annexe III.</td></tr>
<tr><td>2 août 2027</td><td>Obligations relatives aux systèmes à haut risque intégrés à des produits relevant de la législation d'harmonisation de l'Union (annexe I).</td></tr>
</table>

<h3>5. Une proposition de report à suivre</h3>
<p>Fin 2025, la Commission européenne a présenté un ensemble de propositions de simplification de la réglementation numérique, désigné sous le nom d'« omnibus numérique ». Il comprend notamment une <strong>proposition</strong> visant à décaler certaines échéances applicables aux systèmes d'IA à haut risque, en les liant à la disponibilité des normes et outils d'accompagnement. Il s'agit d'une proposition, qui doit être examinée et adoptée par le Parlement européen et le Conseil : son contenu peut évoluer et son adoption ne doit pas être tenue pour acquise. <strong>Avant de vous appuyer sur une date, vérifiez l'état d'avancement de ce texte</strong> sur les sources officielles (site de la Commission européenne, Journal officiel de l'Union européenne, site de la CNIL ou des autorités nationales compétentes).</p>
<p>Pour une PME utilisatrice d'outils courants, ce débat a une portée limitée : l'obligation de maîtrise de l'IA s'applique déjà depuis le 2 février 2025, et les obligations de transparence relèvent d'un calendrier distinct de celui des systèmes à haut risque.</p>

<h3>6. Sanctions et contrôle</h3>
<p>Le règlement prévoit des amendes administratives graduées selon la gravité du manquement, dont les plafonds les plus élevés (jusqu'à 35 millions d'euros ou 7 % du chiffre d'affaires annuel mondial) concernent les pratiques interdites ; des plafonds plus modérés sont prévus pour les PME. Chaque État membre désigne ses autorités de surveillance du marché. Au-delà des sanctions, le principal risque pour une PME est commercial : perte de confiance d'un client, d'un donneur d'ordre ou d'un partenaire qui exige des garanties.</p>
<blockquote><strong>À retenir :</strong> le règlement (UE) 2024/1689 classe les usages selon leur risque. Une PME qui utilise des outils du marché est généralement déployeur : elle doit assurer la maîtrise de l'IA de ses équipes (depuis le 2 février 2025), respecter les obligations de transparence (à partir du 2 août 2026) et redoubler de prudence avec les usages à haut risque, comme le recrutement. La proposition de report de certaines échéances est une proposition : vérifiez son état avant de vous y fier.</blockquote>
`,
      },
      {
        title: "6.5 – Maîtrise de l'IA (article 4), obligations de transparence (article 50) et transparence vis-à-vis des clients",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Comprendre l'obligation de maîtrise de l'IA et la manière d'y répondre dans une PME.</li>
<li>Connaître les obligations de transparence de l'article 50 du règlement.</li>
<li>Définir une politique de transparence envers les clients, au-delà des obligations strictes.</li>
</ul>

<h3>1. L'obligation de maîtrise de l'IA (article 4)</h3>
<p>Depuis le <strong>2 février 2025</strong>, l'article 4 du règlement (UE) 2024/1689 impose aux fournisseurs et aux déployeurs de systèmes d'IA de prendre des mesures pour garantir, dans toute la mesure du possible, un <strong>niveau suffisant de maîtrise de l'IA</strong> de leur personnel et des autres personnes qui utilisent ces systèmes pour leur compte. Ce niveau s'apprécie en fonction des connaissances techniques, de l'expérience, de l'éducation et de la formation des personnes, ainsi que du contexte d'utilisation et des personnes concernées par les systèmes.</p>
<p>Concrètement, la maîtrise de l'IA recouvre la capacité à utiliser les outils de manière éclairée, à comprendre leurs possibilités et leurs limites, et à mesurer les risques et préjudices possibles. Le règlement n'impose ni format, ni durée, ni diplôme : il appartient à l'entreprise de proportionner ses mesures à ses usages.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Mesure</th><th>Exemple pour une PME</th></tr>
<tr><td>Recenser les usages</td><td>Cartographie des outils et des usages (section 5.1).</td></tr>
<tr><td>Former selon les rôles</td><td>Formation des utilisateurs réguliers ; sensibilisation courte pour les autres salariés ; formation plus poussée des référents.</td></tr>
<tr><td>Fixer des règles</td><td>Charte d'usage de l'IA (section 6.8).</td></tr>
<tr><td>Accompagner dans la durée</td><td>Référents, partage des pratiques, mise à jour annuelle.</td></tr>
<tr><td>Garder une trace</td><td>Feuilles d'émargement, attestations de fin de formation, charte signée, comptes rendus des sessions de sensibilisation.</td></tr>
</table>
<p>La proposition « omnibus numérique » évoquée en section 6.4 envisage également de modifier la portée de cette obligation. Là encore, il s'agit d'une proposition dont l'état doit être vérifié : en l'état du texte en vigueur, l'obligation s'applique, et elle correspond de toute façon à une bonne pratique de gestion.</p>

<h3>2. Les obligations de transparence (article 50)</h3>
<p>L'article 50 du règlement, applicable à partir du <strong>2 août 2026</strong>, prévoit plusieurs obligations d'information, réparties entre fournisseurs et déployeurs :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Qui est tenu ?</th><th>Obligation</th></tr>
<tr><td>Système d'IA destiné à interagir directement avec des personnes (assistant conversationnel, agent vocal)</td><td>Fournisseur</td><td>Concevoir le système pour que les personnes soient informées qu'elles interagissent avec une IA, sauf si c'est évident.</td></tr>
<tr><td>Contenus de synthèse (texte, image, son, vidéo) générés par un système d'IA</td><td>Fournisseur</td><td>Marquer les contenus de manière lisible par machine pour permettre de détecter qu'ils ont été générés ou manipulés artificiellement.</td></tr>
<tr><td>Système de reconnaissance des émotions ou de catégorisation biométrique</td><td>Déployeur</td><td>Informer les personnes exposées.</td></tr>
<tr><td>Hypertrucage (« deepfake ») : image, son ou vidéo ressemblant à des personnes, lieux ou événements réels et pouvant passer pour authentique</td><td>Déployeur</td><td>Indiquer que le contenu a été généré ou manipulé artificiellement (avec des aménagements pour les œuvres manifestement artistiques, satiriques ou fictionnelles).</td></tr>
<tr><td>Texte généré ou manipulé publié pour informer le public sur des questions d'intérêt public</td><td>Déployeur</td><td>Indiquer que le texte a été généré ou manipulé artificiellement, sauf s'il a fait l'objet d'un contrôle humain ou éditorial et qu'une personne en assume la responsabilité éditoriale.</td></tr>
</table>
<p>Pour Thermia Rénov, les cas concrets sont les suivants : un agent conversationnel installé sur le site internet doit se présenter comme tel (le fournisseur de l'outil doit le prévoir, l'entreprise doit veiller à ne pas le masquer) ; une vidéo publicitaire montrant un faux client témoignant, générée par IA, serait un hypertrucage à signaler, et surtout une pratique commerciale trompeuse à proscrire ; une image de maison rénovée générée par IA ne doit pas être présentée comme une réalisation de l'entreprise.</p>

<h3>3. La transparence vis-à-vis des clients : au-delà du strict minimum</h3>
<p>Les obligations du règlement ne couvrent pas tous les cas. Un courriel rédigé avec l'aide de l'IA puis relu et envoyé par un salarié n'a pas à porter de mention particulière. Mais la confiance des clients, essentielle dans un secteur marqué par la méfiance, invite à aller plus loin sur certains points :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Pratique recommandée</th></tr>
<tr><td>Agent conversationnel sur le site</td><td>Message d'accueil clair : « Je suis un assistant automatique. Pour un devis ou une question sur votre dossier, un conseiller vous rappellera. » Possibilité permanente de joindre un humain.</td></tr>
<tr><td>Visuels générés par IA dans une publication</td><td>Mention « Illustration générée par IA » ; jamais présentés comme des photos de chantiers réels.</td></tr>
<tr><td>Faux avis ou faux témoignages</td><td>Interdits dans tous les cas : ce sont des pratiques commerciales trompeuses, qu'ils soient rédigés par une IA ou par une personne.</td></tr>
<tr><td>Comptes rendus et documents remis au client</td><td>Relus et signés par le salarié responsable, qui en assume le contenu.</td></tr>
<tr><td>Question directe d'un client (« C'est une IA qui m'a répondu ? »)</td><td>Répondre honnêtement : « J'ai utilisé un outil pour préparer la réponse, je l'ai vérifiée et j'en suis responsable. »</td></tr>
<tr><td>Données du client</td><td>Politique de confidentialité à jour, mentionnant le recours à des prestataires techniques ; aucune donnée du client utilisée pour autre chose que son dossier.</td></tr>
</table>
<blockquote><strong>Bonne pratique :</strong> le principe directeur est simple : le client ne doit jamais être trompé sur ce qu'il voit (une image de synthèse n'est pas une réalisation), sur qui lui parle (un agent automatique n'est pas un conseiller) ni sur qui est responsable (c'est toujours l'entreprise).</blockquote>
<blockquote><strong>À retenir :</strong> l'obligation de maîtrise de l'IA (article 4) s'applique depuis le 2 février 2025 et se traduit par la formation, des règles et un accompagnement proportionnés aux usages. Les obligations de transparence (article 50) s'appliquent à partir du 2 août 2026 : agents conversationnels identifiés, hypertrucages signalés. Avec les clients, la transparence est aussi une question de confiance.</blockquote>
`,
      },
      {
        title: "6.6 – Droit d'auteur, droit à l'image et contenus générés",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Savoir si un contenu généré par IA est protégé et à qui il appartient.</li>
<li>Éviter de reproduire des œuvres protégées ou des signes distinctifs d'autrui.</li>
<li>Respecter le droit à l'image des personnes et la propriété des photos de chantier.</li>
</ul>

<h3>1. Un contenu généré par IA est-il protégé ?</h3>
<p>En droit français, le code de la propriété intellectuelle protège les « œuvres de l'esprit » ; la jurisprudence exige qu'elles soient <strong>originales</strong>, c'est-à-dire qu'elles portent l'empreinte de la personnalité de leur auteur, qui est une personne physique. Un contenu produit de manière autonome par une IA, à partir d'une simple consigne, ne remplit en principe pas cette condition. La situation est différente lorsque la personne fait des choix créatifs significatifs (sélection, arrangement, retouche, réécriture) : la part humaine peut alors être protégée. Le sujet fait l'objet de débats et d'évolutions ; en pratique, l'entreprise doit retenir qu'<strong>elle ne peut pas compter sur une protection automatique</strong> de ses contenus générés, et que les conditions d'utilisation des outils, qui attribuent souvent les résultats à l'utilisateur, ne créent pas un droit d'auteur qui n'existerait pas.</p>

<h3>2. Le risque de reproduire une œuvre protégée</h3>
<p>Les modèles ont été entraînés sur de très grandes quantités de contenus, dont des œuvres protégées. Ils peuvent parfois produire un texte, une image ou une mélodie très proches d'une œuvre existante. Si l'entreprise publie ce contenu, c'est elle qui risque une action en contrefaçon. Quelques précautions :</p>
<ul>
<li>ne pas demander de reproduire ou d'imiter une œuvre identifiable, un personnage protégé, le style reconnaissable d'un illustrateur ou d'un photographe vivant ;</li>
<li>ne pas générer de logos, slogans ou visuels reprenant des marques d'autrui (marques de fabricants, logos de dispositifs publics) ;</li>
<li>pour un logo ou une identité visuelle de l'entreprise, faire appel à un professionnel ou retravailler fortement le résultat, et vérifier l'antériorité auprès des bases de marques ;</li>
<li>vérifier les conditions de l'outil : certains éditeurs proposent des engagements contractuels de garantie dans leurs offres professionnelles, dont la portée doit être lue attentivement ;</li>
<li>ne pas soumettre à l'IA des contenus protégés d'autrui (un article de presse complet, un livre, un guide payant) pour les réécrire et les publier.</li>
</ul>

<h3>3. Les données d'entraînement et l'« opposition »</h3>
<p>Le droit européen permet, sous conditions, la fouille de textes et de données à des fins d'entraînement, mais permet aussi aux titulaires de droits de s'y opposer de manière appropriée, par exemple par des moyens lisibles par machine sur leur site internet. Le règlement sur l'IA impose aux fournisseurs de modèles à usage général de mettre en place une politique de respect du droit d'auteur. Une entreprise qui ne souhaite pas que les contenus de son site servent à l'entraînement peut se renseigner auprès de son prestataire web sur les moyens d'exprimer cette opposition.</p>

<h3>4. Droit à l'image et photos de chantier</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Règle pratique</th></tr>
<tr><td>Photo d'un salarié ou d'un client</td><td>Accord écrit de la personne pour une publication ; ne pas modifier son image avec l'IA sans son accord.</td></tr>
<tr><td>Photo d'une maison reconnaissable</td><td>Accord du propriétaire, surtout si l'adresse peut être déduite ; flouter le numéro de rue et la plaque du véhicule.</td></tr>
<tr><td>Création d'une « fausse personne » (client, technicien) par IA</td><td>À proscrire dans un témoignage ou une publicité : tromperie du consommateur.</td></tr>
<tr><td>Amélioration d'une photo réelle par IA (lumière, cadrage)</td><td>Acceptable si le résultat reste fidèle à la réalisation ; ne pas ajouter d'équipements ou de finitions qui n'existent pas.</td></tr>
<tr><td>Voix ou visage d'une personne réelle imités par IA</td><td>Interdit sans son accord ; en outre, hypertrucage soumis à transparence.</td></tr>
</table>
<blockquote><strong>Bonne pratique :</strong> tenez un petit registre des visuels publiés : origine (photo de chantier, banque d'images sous licence, image générée), accords obtenus et date de publication. Il vous permettra de répondre à toute réclamation.</blockquote>
<blockquote><strong>À retenir :</strong> un contenu généré par IA n'est pas automatiquement protégé ; il peut en revanche reproduire une œuvre protégée et exposer l'entreprise. N'imitez ni œuvres, ni marques, ni styles identifiables, respectez le droit à l'image et ne présentez jamais un visuel généré comme une réalisation réelle.</blockquote>
`,
      },
      {
        title: "6.7 – Biais, discrimination et impact environnemental",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Comprendre d'où viennent les biais des systèmes d'IA et comment ils se manifestent.</li>
<li>Prévenir les discriminations dans les usages professionnels, notamment en recrutement et en relation client.</li>
<li>Prendre en compte l'impact environnemental de l'IA et adopter des usages sobres.</li>
</ul>

<h3>1. D'où viennent les biais ?</h3>
<p>Un modèle de langage reproduit les régularités des données sur lesquelles il a été entraîné. Si ces données associent plus souvent certains métiers à un sexe, certaines origines à certains stéréotypes, certaines classes d'âge à une moindre aisance numérique, le modèle tend à reproduire ces associations, parfois de façon subtile. Les éditeurs ajoutent des mécanismes de correction, mais aucun ne supprime totalement les biais.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Manifestation</th><th>Exemple</th></tr>
<tr><td>Stéréotypes dans les textes</td><td>Une offre d'emploi de « conducteur de travaux » rédigée systématiquement au masculin, avec un vocabulaire genré.</td></tr>
<tr><td>Stéréotypes dans les images</td><td>Une demande d'image « équipe de chantier » produisant uniquement des hommes jeunes ; « assistante administrative » uniquement des femmes.</td></tr>
<tr><td>Traitement inégal</td><td>Des réponses plus ou moins favorables selon le prénom ou la commune cités dans la requête.</td></tr>
<tr><td>Biais culturels et linguistiques</td><td>Des références et des exemples moins pertinents pour le contexte français, ou un français moins bien maîtrisé que l'anglais sur certains sujets techniques.</td></tr>
<tr><td>Biais de confirmation</td><td>L'IA tend à aller dans le sens de la question posée : « Pourquoi ce client est-il de mauvaise foi ? » produit des arguments à charge.</td></tr>
</table>

<h3>2. Le cadre de la non-discrimination</h3>
<p>Le code pénal (article 225-1) définit la discrimination comme toute distinction opérée entre les personnes sur le fondement de critères qu'il énumère, notamment l'origine, le sexe, la situation de famille, l'âge, le handicap, l'état de santé, le lieu de résidence ou l'apparence physique ; le code du travail interdit également les discriminations à toutes les étapes de la vie professionnelle, dès le recrutement. L'utilisation d'une IA ne change rien à la responsabilité : si une décision discriminatoire est prise sur la base d'un résultat produit par un outil, c'est l'entreprise qui en répond.</p>

<h3>3. Les usages à risque et les précautions</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Usage</th><th>Risque</th><th>Précaution</th></tr>
<tr><td>Rédiger une offre d'emploi</td><td>Formulations genrées ou excluantes.</td><td>Demander une rédaction inclusive et neutre ; relire au regard des critères de discrimination.</td></tr>
<tr><td>Trier ou résumer des candidatures</td><td>Traitement inégal, décision automatisée, système susceptible de relever du haut risque.</td><td>Ne pas confier le tri à un assistant conversationnel ; décision humaine fondée sur des critères objectifs et liés au poste ; pas de candidatures nominatives dans un outil grand public.</td></tr>
<tr><td>Prioriser des prospects ou des clients</td><td>Exclusion de certaines communes ou de certains profils sur des critères discriminatoires.</td><td>Critères objectifs et explicables (type de logement, besoin exprimé), jamais l'origine supposée, l'âge ou le lieu de résidence en tant que tel.</td></tr>
<tr><td>Générer des visuels de l'équipe ou des clients</td><td>Représentations stéréotypées.</td><td>Préciser la diversité souhaitée dans la requête, ou préférer les vraies photos de l'équipe avec son accord.</td></tr>
<tr><td>Analyser une réclamation</td><td>Biais de confirmation.</td><td>Formuler des questions neutres : « Quels sont les éléments factuels de cette réclamation et les points à vérifier ? »</td></tr>
</table>
<blockquote><strong>Bonne pratique :</strong> pour tester un biais, posez la même requête en ne changeant qu'un élément (un prénom féminin ou masculin, une commune ou une autre, un âge) et comparez les réponses. Si elles diffèrent sans raison objective, ne les utilisez pas pour décider.</blockquote>

<h3>4. L'impact environnemental de l'IA</h3>
<p>L'IA générative repose sur des centres de données qui consomment de l'électricité, de l'eau pour le refroidissement et des ressources pour la fabrication des équipements. L'entraînement des grands modèles est très consommateur, mais l'usage quotidien, multiplié par des centaines de millions d'utilisateurs, pèse aussi. Les estimations publiées par les chercheurs et les éditeurs varient fortement selon les méthodes et les modèles : il serait hasardeux d'avancer un chiffre précis. On peut en revanche retenir des ordres de grandeur relatifs largement admis : la génération d'images, et plus encore de vidéos, demande nettement plus de calcul qu'une courte réponse textuelle ; les modèles les plus puissants et les fonctions de « raisonnement » approfondi consomment davantage que les modèles légers.</p>
<p>Pour une entreprise du secteur de la rénovation énergétique, dont le métier est de réduire les consommations, la cohérence entre le discours et les pratiques compte aussi pour l'image.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Usage sobre</th><th>En pratique</th></tr>
<tr><td>Utiliser l'IA quand elle apporte un gain réel</td><td>Ne pas l'utiliser pour une recherche simple qu'un moteur de recherche ou un document interne résout.</td></tr>
<tr><td>Bien formuler du premier coup</td><td>Une requête complète évite cinq itérations.</td></tr>
<tr><td>Choisir le bon modèle</td><td>Un modèle léger suffit pour reformuler un courriel ; réserver les modèles avancés aux tâches complexes.</td></tr>
<tr><td>Limiter les générations d'images et de vidéos</td><td>Ne pas générer vingt variantes « pour voir » ; réutiliser les visuels validés.</td></tr>
<tr><td>Réutiliser</td><td>Bibliothèque de prompts, textes validés, modèles : ce qui a été produit une fois n'a pas besoin d'être régénéré.</td></tr>
</table>
<blockquote><strong>À retenir :</strong> les IA reproduisent les biais de leurs données ; l'entreprise reste responsable de toute discrimination. Gardez les décisions sur les personnes humaines et fondées sur des critères objectifs, testez les biais et formulez des questions neutres. Utilisez l'IA avec sobriété, là où elle apporte un réel gain.</blockquote>
`,
      },
      {
        title: "6.8 – Rédiger une charte d'usage de l'IA : modèle complet pour Thermia Rénov",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Comprendre le rôle d'une charte d'usage de l'IA dans une PME.</li>
<li>Connaître la méthode d'élaboration et de diffusion d'une charte.</li>
<li>Disposer d'un modèle complet, adaptable à sa propre entreprise.</li>
</ul>

<h3>1. Pourquoi une charte ?</h3>
<p>La charte d'usage de l'IA rassemble en quelques pages les règles que l'entreprise se donne. Elle répond à plusieurs besoins à la fois : sécuriser les salariés, qui savent ce qu'ils peuvent faire ; protéger les clients et les informations de l'entreprise ; démontrer des mesures de protection raisonnables (secret des affaires) et la responsabilité de l'entreprise (RGPD) ; contribuer à l'obligation de maîtrise de l'IA (article 4 du règlement européen).</p>

<h3>2. Méthode d'élaboration</h3>
<ol>
<li><strong>Partir des usages réels</strong> : cartographie et matrice gain/risque (chapitre 5).</li>
<li><strong>Associer l'équipe</strong> : un groupe de travail court (dirigeant, référents, un représentant de chaque métier) ; information et, le cas échéant, consultation des représentants du personnel.</li>
<li><strong>Rédiger simple</strong> : des règles concrètes, des exemples, un tableau « autorisé / à encadrer / interdit » ; quatre à six pages au maximum.</li>
<li><strong>Choisir le mode d'adoption</strong> : la valeur juridique d'une charte dépend de la manière dont elle est adoptée (simple guide de bonnes pratiques, note de service, annexe au règlement intérieur lorsque l'entreprise en dispose). Si l'entreprise souhaite pouvoir s'appuyer sur la charte en cas de manquement, il est prudent de faire valider le mode d'adoption par un conseil.</li>
<li><strong>Diffuser et expliquer</strong> : présentation en réunion, remise contre signature d'un accusé de réception, intégration au livret d'accueil des nouveaux salariés.</li>
<li><strong>Réviser</strong> : au moins une fois par an, et à chaque changement d'outil ou de réglementation.</li>
</ol>

<h3>3. Modèle de charte d'usage de l'IA – Thermia Rénov</h3>
<p><em>Entreprise fictive. Ce modèle est un exemple pédagogique, à adapter à la situation de chaque entreprise.</em></p>

<h4>Préambule</h4>
<p>Thermia Rénov utilise des outils d'intelligence artificielle pour gagner du temps sur les tâches d'écriture, de mise en forme et d'organisation, afin de consacrer davantage de temps à ses clients et à la qualité de ses chantiers. Ces outils ne remplacent ni le jugement, ni la responsabilité des salariés. La présente charte fixe les règles qui permettent de les utiliser en protégeant nos clients, nos salariés et nos informations, dans le respect du RGPD et du règlement européen sur l'intelligence artificielle (UE) 2024/1689.</p>

<h4>Article 1 – Objet et champ d'application</h4>
<p>La charte s'applique à tous les salariés de Thermia Rénov, ainsi qu'aux stagiaires, alternants et intérimaires, pour tout usage d'un outil d'intelligence artificielle dans le cadre de leur activité professionnelle, quel que soit l'appareil utilisé (ordinateur de l'entreprise, téléphone professionnel ou personnel). Elle concerne les assistants conversationnels, les fonctions d'IA intégrées aux logiciels, les outils de transcription, de génération d'images et d'automatisation.</p>

<h4>Article 2 – Principes</h4>
<ol>
<li><strong>Responsabilité humaine</strong> : la personne qui utilise un contenu produit avec l'IA en est responsable comme si elle l'avait rédigé elle-même.</li>
<li><strong>Vérification</strong> : tout contenu destiné à l'extérieur est relu et vérifié avant envoi ou publication.</li>
<li><strong>Protection des données</strong> : aucune donnée identifiante de client ou de salarié n'est saisie dans un outil non autorisé.</li>
<li><strong>Loyauté</strong> : l'IA n'est jamais utilisée pour tromper un client, un partenaire ou un collègue.</li>
<li><strong>Décision humaine</strong> : aucune décision concernant une personne (client, candidat, salarié) n'est prise par une IA.</li>
<li><strong>Sobriété</strong> : l'IA est utilisée lorsqu'elle apporte un gain réel.</li>
</ol>

<h4>Article 3 – Outils autorisés et comptes</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Outil</th><th>Compte</th><th>Usages autorisés</th></tr>
<tr><td>[Assistant conversationnel retenu par l'entreprise], offre professionnelle</td><td>Compte Thermia Rénov nominatif, double authentification</td><td>Tous les usages prévus à l'article 4, y compris sur des données internes et confidentielles minimisées.</td></tr>
<tr><td>Fonctions d'IA de Microsoft 365 (selon licences attribuées)</td><td>Compte Microsoft 365 de l'entreprise</td><td>Rédaction, synthèse, comptes rendus, tableur, sur les documents de l'entreprise.</td></tr>
<tr><td>Power Automate</td><td>Compte de l'entreprise</td><td>Automatisations validées par la direction et documentées.</td></tr>
<tr><td>Fonctions d'IA de l'outil de création graphique de l'entreprise</td><td>Compte de l'entreprise</td><td>Visuels pour les publications, dans le respect de l'article 7.</td></tr>
<tr><td>Assistants grand public (comptes gratuits ou personnels)</td><td>—</td><td>Uniquement pour des contenus publics ou totalement anonymisés (niveau « vert » de l'article 4). Interdits pour toute autre donnée.</td></tr>
</table>
<p>L'installation d'extensions de navigateur, d'applications ou d'assistants de réunion utilisant l'IA, et la connexion d'un outil d'IA à la messagerie ou aux fichiers de l'entreprise, sont soumises à l'accord préalable de la direction. Les réglages de confidentialité des comptes sont paramétrés par le référent (utilisation pour l'entraînement désactivée lorsque l'option existe, historique, mémoire, partage).</p>

<h4>Article 4 – Données : ce qui peut être saisi</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Niveau</th><th>Exemples</th><th>Règle</th></tr>
<tr><td><strong>Vert</strong> – Public ou anonymisé</td><td>Fiches techniques des fabricants, textes du site, modèles vierges, situations décrites sans élément permettant d'identifier une personne.</td><td>Tout outil autorisé, y compris grand public.</td></tr>
<tr><td><strong>Orange</strong> – Interne ou confidentiel, minimisé</td><td>Notes de visite technique sans nom ni adresse, procédures, planning général, données chiffrées agrégées, comptes rendus de réunion interne.</td><td>Outils professionnels de l'entreprise uniquement, après suppression des éléments non nécessaires.</td></tr>
<tr><td><strong>Rouge</strong> – Interdit</td><td>Nom, adresse, téléphone, courriel des clients associés à leur dossier ; revenus, avis d'imposition, situation familiale ou de santé ; coordonnées bancaires ; données des salariés (paie, évaluations, arrêts, candidatures) ; prix de revient et marges détaillées ; documents reçus sous accord de confidentialité ; mots de passe et codes d'accès.</td><td>Aucun outil d'IA, sauf autorisation écrite de la direction pour un usage précis dans un outil professionnel couvert par un contrat adapté.</td></tr>
</table>
<p>En cas de doute sur le niveau d'une information, le salarié la traite comme « rouge » et interroge le référent.</p>

<h4>Article 5 – Vérification et validation</h4>
<ul>
<li>Les faits, chiffres, dates, références réglementaires et noms sont vérifiés sur la source (document interne, site officiel).</li>
<li>Aucune information sur les aides publiques n'est communiquée à un client sur la base d'une réponse d'IA : seuls les simulateurs et sources officiels, avec leur date de consultation, sont utilisés.</li>
<li>Aucun engagement de prix, de délai, de performance ou de garantie n'est envoyé s'il n'a pas été validé selon les délégations habituelles.</li>
<li>Les réponses à des réclamations et les courriers à portée contractuelle sont validés par la direction.</li>
<li>Les textes de référence (présentation des solutions, foire aux questions) sont validés techniquement par le conducteur de travaux et datés.</li>
</ul>

<h4>Article 6 – Transparence</h4>
<ul>
<li>Tout agent conversationnel mis à disposition des clients se présente comme un assistant automatique et propose le contact d'un conseiller.</li>
<li>Les visuels générés par IA sont signalés comme tels et ne sont jamais présentés comme des réalisations de l'entreprise.</li>
<li>Aucun faux avis, faux témoignage ou faux portrait de client ou de salarié n'est produit.</li>
<li>Tout contenu imitant la voix, le visage ou l'apparence d'une personne réelle est interdit sans son accord écrit et, s'il est diffusé, signalé comme généré artificiellement.</li>
<li>Un salarié interrogé par un client sur l'usage de l'IA répond honnêtement.</li>
</ul>

<h4>Article 7 – Propriété intellectuelle et image</h4>
<ul>
<li>Il est interdit de demander à une IA de reproduire ou d'imiter une œuvre, une marque, un logo ou le style reconnaissable d'un créateur.</li>
<li>Les contenus protégés de tiers (articles, guides payants, ouvrages) ne sont pas soumis à l'IA pour être réécrits et publiés.</li>
<li>Les photos de personnes et de maisons reconnaissables ne sont publiées ou retouchées qu'avec l'accord des intéressés ; les retouches restent fidèles à la réalité.</li>
<li>Le registre des visuels publiés est tenu par la personne chargée de la communication.</li>
</ul>

<h4>Article 8 – Réunions, enregistrements et transcriptions</h4>
<ul>
<li>Toute transcription ou tout enregistrement est annoncé en début de réunion, avec sa finalité et sa durée de conservation ; l'accord des participants est recueilli et un refus est respecté.</li>
<li>Les rendez-vous chez les particuliers ne sont pas enregistrés.</li>
<li>Les enregistrements et transcriptions brutes sont supprimés dès validation du compte rendu.</li>
<li>Les transcriptions ne sont jamais utilisées pour évaluer un salarié.</li>
</ul>

<h4>Article 9 – Automatisations et assistants personnalisés</h4>
<ul>
<li>Toute automatisation est validée par la direction, créée avec un compte de l'entreprise, testée avec des données fictives, documentée et confiée à un responsable nommé.</li>
<li>Aucun message généré par IA n'est envoyé automatiquement à un client sans relecture humaine ; les envois automatiques reposent sur des textes fixes validés.</li>
<li>Les assistants personnalisés partagés sont créés avec un compte de l'entreprise ; leurs documents de référence sont publics ou internes, datés, et ne contiennent aucune donnée de niveau rouge.</li>
</ul>

<h4>Article 10 – Décisions concernant les personnes et non-discrimination</h4>
<ul>
<li>L'IA ne trie pas les candidatures, n'évalue pas les salariés et ne sélectionne pas les clients.</li>
<li>Les offres d'emploi et les communications sont rédigées de manière inclusive et relues au regard des critères de discrimination.</li>
<li>L'acquisition de tout outil d'IA destiné au recrutement ou à la gestion du personnel fait l'objet d'une analyse préalable par la direction.</li>
</ul>

<h4>Article 11 – Sobriété</h4>
<p>Les salariés privilégient les requêtes complètes, les modèles adaptés à la tâche, la réutilisation des contenus validés, et limitent les générations d'images et de vidéos aux besoins réels.</p>

<h4>Article 12 – Incidents</h4>
<p>Toute saisie de données de niveau rouge dans un outil non autorisé, tout contenu erroné envoyé à un client et tout comportement anormal d'un outil ou d'une automatisation sont signalés sans délai au référent et à la direction. Le salarié supprime la conversation concernée si possible. La direction apprécie si l'incident constitue une violation de données personnelles devant être notifiée à la CNIL, dans les conditions et délais prévus par le RGPD, et le consigne dans le registre des incidents. Un signalement de bonne foi n'est pas sanctionné : il permet de corriger rapidement.</p>

<h4>Article 13 – Formation et maîtrise de l'IA</h4>
<p>Conformément à l'article 4 du règlement (UE) 2024/1689, Thermia Rénov veille à ce que chaque utilisateur dispose d'un niveau suffisant de maîtrise de l'IA : formation des utilisateurs réguliers, sensibilisation de tous les salariés lors de l'accueil et lors de chaque mise à jour de la charte, accompagnement par les référents. Les actions réalisées sont tracées.</p>

<h4>Article 14 – Gouvernance</h4>
<ul>
<li><strong>Responsable de la charte</strong> : Sandrine MOREL, dirigeante.</li>
<li><strong>Référents IA</strong> : Julie (outils, paramétrages, automatisations) et Karim (usages commerciaux, bibliothèque de prompts).</li>
<li><strong>Registre des outils et des usages</strong> : tenu par Julie, il recense les outils autorisés, les comptes, les automatisations et les assistants partagés.</li>
<li><strong>Revue</strong> : un point mensuel de quinze minutes en réunion d'équipe pendant la première année ; une révision complète de la charte chaque année et à chaque évolution réglementaire ou changement d'outil.</li>
</ul>

<h4>Article 15 – Respect de la charte</h4>
<p>Le non-respect de la charte peut exposer l'entreprise et ses clients à des risques importants. Les manquements sont traités selon les règles applicables dans l'entreprise, en fonction de leur gravité et du mode d'adoption de la présente charte.</p>

<h4>Article 16 – Entrée en vigueur et accusé de réception</h4>
<p>La charte entre en vigueur le [date d'adoption]. Chaque salarié en reçoit un exemplaire et en accuse réception.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Nom et prénom</th><th>Fonction</th><th>Date</th><th>Signature</th></tr>
<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
</table>
<p><strong>Annexe – Les dix réflexes (à afficher près des postes) :</strong> 1. Je pars de la tâche, pas de l'outil. 2. J'utilise un outil et un compte autorisés. 3. Je ne saisis aucune donnée rouge. 4. Je minimise ce que je saisis. 5. Je vérifie faits, chiffres et sources. 6. Je n'envoie aucun engagement non validé. 7. Je ne trompe jamais un client. 8. J'annonce toute transcription. 9. Je garde la décision. 10. Je signale tout incident.</p>
<blockquote><strong>Bonne pratique :</strong> une charte n'est utile que si elle est connue et appliquée. Présentez-la avec des exemples tirés du quotidien de l'entreprise, affichez les dix réflexes, et revenez dessus à chaque incident ou question.</blockquote>
<blockquote><strong>À retenir :</strong> une charte d'usage de l'IA efficace part des usages réels, classe les données en vert, orange et rouge, désigne les outils et les comptes autorisés, fixe les règles de vérification, de transparence, de propriété intellectuelle et de décision humaine, organise le signalement des incidents et la formation, et prévoit sa propre révision.</blockquote>
`,
      },
      {
        title: "6.9 – Quiz de fin de chapitre",
        content: `
<p>Répondez aux dix questions, puis consultez le corrigé. Une seule réponse est correcte par question.</p>

<h4>Question 1</h4>
<p>Laquelle de ces informations n'est pas une donnée personnelle ?</p>
<ul>
<li>A. L'adresse du chantier d'un particulier</li>
<li>B. Le montant des revenus d'un client indiqué pour une demande d'aide</li>
<li>C. Le chiffre d'affaires mensuel global de l'entreprise, tous clients confondus</li>
<li>D. La voix d'un participant enregistrée lors d'une réunion</li>
</ul>

<h4>Question 2</h4>
<p>Que signifie le principe de minimisation appliqué à une requête adressée à une IA ?</p>
<ul>
<li>A. Écrire des requêtes les plus courtes possibles</li>
<li>B. Ne saisir que les informations strictement nécessaires à la tâche</li>
<li>C. Utiliser le modèle le moins puissant</li>
<li>D. Supprimer la réponse après lecture</li>
</ul>

<h4>Question 3</h4>
<p>Karim veut faire améliorer un devis contenant le nom, l'adresse et le plan de financement d'un client. Que doit-il faire ?</p>
<ul>
<li>A. Le coller dans un assistant gratuit avec son compte personnel</li>
<li>B. Le photographier et l'envoyer à l'IA depuis son téléphone</li>
<li>C. Retirer les éléments identifiants et financiers, ou utiliser l'outil professionnel autorisé selon la charte</li>
<li>D. Demander au client de le faire lui-même</li>
</ul>

<h4>Question 4</h4>
<p>Pour qu'une information soit protégée au titre du secret des affaires, quelle condition dépend directement du comportement de l'entreprise ?</p>
<ul>
<li>A. Qu'elle soit rédigée en français</li>
<li>B. Qu'elle fasse l'objet de mesures de protection raisonnables</li>
<li>C. Qu'elle soit déposée auprès d'un office de propriété industrielle</li>
<li>D. Qu'elle ait été produite sans IA</li>
</ul>

<h4>Question 5</h4>
<p>Quelle est la principale différence entre une offre grand public et une offre professionnelle d'assistant d'IA ?</p>
<ul>
<li>A. L'offre professionnelle est toujours gratuite</li>
<li>B. L'offre professionnelle est gérée par l'entreprise et généralement couverte par un contrat encadrant le traitement des données</li>
<li>C. L'offre grand public ne produit jamais d'erreur</li>
<li>D. Il n'y a aucune différence en matière de données</li>
</ul>

<h4>Question 6</h4>
<p>Depuis quelle date l'obligation de maîtrise de l'IA (article 4 du règlement (UE) 2024/1689) s'applique-t-elle ?</p>
<ul>
<li>A. 1er août 2024</li>
<li>B. 2 février 2025</li>
<li>C. 2 août 2026</li>
<li>D. 2 août 2027</li>
</ul>

<h4>Question 7</h4>
<p>À partir de quelle date s'appliquent les obligations de transparence de l'article 50 ?</p>
<ul>
<li>A. 2 février 2025</li>
<li>B. 2 août 2025</li>
<li>C. 2 août 2026</li>
<li>D. Elles ne s'appliqueront jamais aux entreprises</li>
</ul>

<h4>Question 8</h4>
<p>Fin 2025, la Commission européenne a présenté l'« omnibus numérique ». Comment faut-il le considérer ?</p>
<ul>
<li>A. Comme un texte adopté qui supprime le règlement sur l'IA</li>
<li>B. Comme une proposition, notamment de report de certaines échéances des systèmes à haut risque, dont il faut vérifier l'état d'adoption</li>
<li>C. Comme une recommandation de la CNIL</li>
<li>D. Comme un texte sans rapport avec l'IA</li>
</ul>

<h4>Question 9</h4>
<p>Sandrine veut illustrer une publication avec l'image d'une maison rénovée générée par IA. Quelle pratique est correcte ?</p>
<ul>
<li>A. La présenter comme la dernière réalisation de l'entreprise</li>
<li>B. L'accompagner d'un faux témoignage de client</li>
<li>C. La signaler comme illustration générée par IA, sans la présenter comme une réalisation réelle</li>
<li>D. Ajouter le logo d'un fabricant pour la rendre crédible</li>
</ul>

<h4>Question 10</h4>
<p>Pourquoi est-il déconseillé de confier le tri des candidatures à un assistant conversationnel ?</p>
<ul>
<li>A. Parce qu'il est trop lent</li>
<li>B. Parce qu'il peut reproduire des biais discriminatoires, que la décision doit rester humaine et que ce type d'usage peut relever du haut risque</li>
<li>C. Parce que les candidatures ne contiennent jamais de données personnelles</li>
<li>D. Parce que la loi interdit d'utiliser un ordinateur pour recruter</li>
</ul>

<h3>Corrigé et explications</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>C</td><td>Un chiffre d'affaires global ne permet d'identifier personne : ce n'est pas une donnée personnelle (c'est en revanche une information confidentielle). L'adresse, les revenus et la voix se rapportent à des personnes identifiables.</td></tr>
<tr><td>2</td><td>B</td><td>La minimisation consiste à ne traiter que les données nécessaires à la finalité : le nom du client est presque toujours inutile pour rédiger ou améliorer un texte.</td></tr>
<tr><td>3</td><td>C</td><td>Aucune donnée identifiante ou financière de client dans un outil grand public non paramétré : on anonymise, ou on utilise l'outil professionnel autorisé.</td></tr>
<tr><td>4</td><td>B</td><td>Le secret des affaires suppose une information peu accessible, ayant une valeur commerciale et faisant l'objet de mesures de protection raisonnables : la charte d'usage en fait partie.</td></tr>
<tr><td>5</td><td>B</td><td>L'offre professionnelle est administrée par l'entreprise et généralement accompagnée d'un accord de traitement des données ; ses engagements (entraînement, localisation, conservation) doivent néanmoins être vérifiés.</td></tr>
<tr><td>6</td><td>B</td><td>Les interdictions de l'article 5 et l'obligation de maîtrise de l'IA de l'article 4 s'appliquent depuis le 2 février 2025.</td></tr>
<tr><td>7</td><td>C</td><td>Les obligations de transparence de l'article 50 et la plupart des autres dispositions s'appliquent à partir du 2 août 2026.</td></tr>
<tr><td>8</td><td>B</td><td>L'omnibus numérique est une proposition de la Commission ; elle doit être adoptée par le Parlement européen et le Conseil, et son contenu peut évoluer.</td></tr>
<tr><td>9</td><td>C</td><td>Présenter une image générée comme une réalisation, inventer un témoignage ou utiliser la marque d'un tiers serait trompeur. La mention de l'origine du visuel préserve la confiance.</td></tr>
<tr><td>10</td><td>B</td><td>Les biais des modèles exposent à la discrimination, le RGPD encadre les décisions automatisées et les systèmes d'IA utilisés pour le recrutement figurent parmi les usages à haut risque du règlement.</td></tr>
</table>
<p><strong>Barème indicatif :</strong> 9 ou 10 bonnes réponses : notions maîtrisées ; 6 à 8 : relire les sections correspondant aux erreurs ; moins de 6 : reprendre le chapitre avant le cas pratique.</p>
`,
      },
      {
        title: "6.10 – Cas pratique : mettre en conformité les usages de l'IA chez Thermia Rénov",
        content: `
<h3>Consigne</h3>
<p>Sandrine MOREL, dirigeante de <strong>Thermia Rénov</strong> (PME fictive), vous demande d'analyser six situations relevées au cours du dernier mois, puis de proposer un plan de mise en conformité. Toutes les situations et tous les chiffres sont fictifs.</p>
<ol>
<li><strong>Situation A</strong> – Julie a collé dans un assistant gratuit, avec son compte personnel, la réclamation complète d'une cliente (nom, adresse, numéro de téléphone, mention d'une maladie qui l'oblige à rester chez elle) pour obtenir un projet de réponse.</li>
<li><strong>Situation B</strong> – Karim souhaite installer sur le site un agent conversationnel qui « indique à chaque visiteur le montant des aides auxquelles il a droit » et qui se présenterait sous le prénom « Léa, votre conseillère ».</li>
<li><strong>Situation C</strong> – Un prestataire propose de produire une vidéo publicitaire dans laquelle un couple de clients satisfaits, entièrement généré par IA, témoigne de ses économies de chauffage.</li>
<li><strong>Situation D</strong> – Thomas a activé un assistant de réunion tiers qui s'est connecté automatiquement à une réunion de chantier en visioconférence avec deux sous-traitants, sans qu'ils en soient avertis.</li>
<li><strong>Situation E</strong> – Pour recruter un conducteur de travaux, Sandrine envisage de demander à une IA de classer les quarante candidatures reçues et de ne recevoir que les cinq premières.</li>
<li><strong>Situation F</strong> – Un bailleur social, client important, demande par écrit à Thermia Rénov comment elle « encadre l'usage de l'IA au regard du règlement européen » et si les données de ses locataires ont été saisies dans des outils d'IA.</li>
</ol>
<p><strong>Travail demandé :</strong></p>
<ol>
<li>Pour chaque situation, identifiez les règles en jeu (RGPD, secret des affaires, règlement (UE) 2024/1689, droit de la consommation, non-discrimination, droit à l'image) et proposez la conduite à tenir.</li>
<li>Établissez un plan de mise en conformité sur trois mois.</li>
<li>Rédigez la réponse au bailleur social (situation F).</li>
</ol>

<h3>Corrigé</h3>

<h4>1. Analyse des situations</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Règles en jeu</th><th>Analyse</th><th>Conduite à tenir</th></tr>
<tr><td>A – Réclamation collée dans un outil gratuit</td><td>RGPD (minimisation, sécurité, transmission à un prestataire non encadré) ; donnée de santé, catégorie particulière à protection renforcée.</td><td>Des données identifiantes et une donnée de santé ont été transmises à un service non autorisé, sans contrat. C'est un incident à traiter.</td><td>Supprimer la conversation ; vérifier les réglages du compte ; signaler à la direction ; consigner l'incident ; la direction apprécie s'il s'agit d'une violation de données à notifier à la CNIL, au regard du risque pour la cliente. Rappeler la règle : niveau rouge, jamais dans un outil grand public. Pour la suite, rédiger la réponse à partir d'un résumé anonymisé (« cliente mécontente d'un retard de chantier »), dans l'outil professionnel, et faire valider par la direction.</td></tr>
<tr><td>B – Agent conversationnel « Léa » sur les aides</td><td>Règlement sur l'IA, article 50 (information des personnes interagissant avec une IA, à partir du 2 août 2026) ; droit de la consommation (pratiques commerciales trompeuses) ; RGPD si des données sont collectées.</td><td>Un agent qui se présente comme une conseillère humaine trompe le visiteur ; annoncer un montant d'aide « auquel il a droit » expose à des informations fausses présentées comme certaines, dans un secteur très surveillé.</td><td>Refuser le projet en l'état. Alternative : un assistant clairement identifié comme automatique, limité aux questions générales (prestations, zone d'intervention, prise de rendez-vous), qui renvoie vers les simulateurs et sources officiels pour les aides et propose le rappel d'un conseiller. Vérifier le contrat du fournisseur et la politique de confidentialité ; tester avec des questions pièges.</td></tr>
<tr><td>C – Faux témoignage vidéo généré par IA</td><td>Droit de la consommation (faux témoignage = pratique commerciale trompeuse) ; règlement sur l'IA (hypertrucage, obligation de signalement) ; droit à l'image si des visages réels sont utilisés.</td><td>Même signalé comme généré, un faux témoignage de clients reste trompeur : il présente comme vécue une expérience qui n'existe pas, avec des économies non démontrées.</td><td>Refuser. Alternative : vrais témoignages de clients ayant donné leur accord écrit, ou vidéo explicative sans personnage fictif présenté comme client ; toute illustration générée est signalée comme telle.</td></tr>
<tr><td>D – Assistant de réunion tiers non annoncé</td><td>RGPD (information des personnes, finalité, sous-traitance) ; secret des affaires et confidentialité des échanges ; risques liés à l'enregistrement de paroles sans consentement.</td><td>Les sous-traitants n'ont pas été informés ; l'outil, non autorisé, a accès à l'agenda et aux contenus des réunions ; les échanges (prix, planning, difficultés) sont confidentiels.</td><td>Déconnecter l'outil de l'agenda et révoquer ses accès ; demander la suppression des enregistrements chez le prestataire ; informer les sous-traitants et s'excuser ; à l'avenir, n'utiliser que la transcription de l'outil professionnel, annoncée et acceptée en début de réunion (article 8 de la charte).</td></tr>
<tr><td>E – Classement des candidatures par IA</td><td>Non-discrimination (code du travail, code pénal) ; RGPD (décision fondée exclusivement sur un traitement automatisé, minimisation, information des candidats) ; règlement sur l'IA (systèmes de recrutement classés à haut risque).</td><td>Le classement par un assistant conversationnel n'est ni explicable ni contrôlé ; il peut reproduire des biais (âge, sexe, origine supposée du nom) ; écarter trente-cinq candidats sans examen humain serait une décision automatisée.</td><td>Ne pas le faire. L'IA peut aider à rédiger une offre d'emploi inclusive et une grille d'évaluation fondée sur des critères objectifs liés au poste ; la lecture et la sélection des candidatures restent humaines. Aucune candidature nominative dans un outil grand public.</td></tr>
<tr><td>F – Question du bailleur social</td><td>RGPD (le bailleur peut être responsable de traitement pour les données de ses locataires, Thermia Rénov agissant alors pour son compte) ; obligations contractuelles de confidentialité ; règlement sur l'IA (maîtrise de l'IA, transparence).</td><td>Un client professionnel attend des garanties écrites. La réponse doit être exacte : ne rien affirmer que l'entreprise ne peut démontrer.</td><td>Vérifier d'abord, auprès de chaque salarié concerné et dans le registre des usages, si des données de locataires ont été saisies dans un outil d'IA ; puis répondre factuellement (point 3), en joignant la charte.</td></tr>
</table>

<h4>2. Plan de mise en conformité sur trois mois</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Période</th><th>Actions</th><th>Responsable</th><th>Livrable</th></tr>
<tr><td>Semaines 1 et 2</td><td>Traiter les incidents A et D (suppression, signalement, analyse du risque, information des personnes concernées si nécessaire) ; geler les projets B, C et E ; recenser tous les outils et comptes utilisés, y compris personnels.</td><td>Sandrine, Julie</td><td>Registre des incidents ; registre des outils et des usages.</td></tr>
<tr><td>Semaines 3 et 4</td><td>Choisir une offre professionnelle (grille de la section 6.3), vérifier le contrat et l'accord de traitement des données ; créer les comptes de l'entreprise ; paramétrer la confidentialité ; supprimer les accès des outils non autorisés.</td><td>Sandrine, Julie</td><td>Comptes professionnels actifs ; fiche de paramétrage.</td></tr>
<tr><td>Semaines 5 et 6</td><td>Rédiger la charte d'usage avec le groupe de travail ; choisir son mode d'adoption ; mettre à jour la politique de confidentialité du site et le registre des traitements.</td><td>Sandrine, Julie, Karim, Thomas</td><td>Charte adoptée ; politique de confidentialité à jour.</td></tr>
<tr><td>Semaines 7 et 8</td><td>Présenter la charte à toute l'équipe, recueillir les accusés de réception ; sensibilisation d'une heure pour les salariés qui n'ont pas suivi la formation ; afficher les dix réflexes.</td><td>Sandrine, référents</td><td>Feuilles d'émargement ; accusés de réception (traçabilité de la maîtrise de l'IA).</td></tr>
<tr><td>Semaines 9 à 12</td><td>Relancer les usages du pilote dans le cadre de la charte ; projet B revu (assistant identifié, sans montant d'aide) ; premier bilan mensuel ; vérification de l'état de la proposition « omnibus numérique » et des publications de la CNIL.</td><td>Référents</td><td>Bilan du premier mois ; note de veille réglementaire datée.</td></tr>
</table>

<h4>3. Réponse au bailleur social</h4>
<blockquote>
<p>Objet : Encadrement de l'usage de l'intelligence artificielle chez Thermia Rénov</p>
<p>Madame, Monsieur,</p>
<p>Nous vous remercions de votre question, qui rejoint nos propres préoccupations.</p>
<p>Thermia Rénov utilise des outils d'intelligence artificielle pour des tâches de rédaction, de mise en forme et d'organisation interne. Ces usages sont encadrés par une charte d'usage adoptée le [date], dont vous trouverez une copie jointe. Elle prévoit notamment que seuls des outils professionnels, administrés par l'entreprise et couverts par un contrat encadrant le traitement des données, peuvent être utilisés pour des informations internes, et qu'aucune donnée identifiante de client, de locataire ou de salarié ne peut être saisie dans un outil d'IA, sauf autorisation écrite de la direction pour un usage précis.</p>
<p>S'agissant des données de vos locataires, nous avons procédé à une vérification auprès des salariés intervenant sur vos chantiers : [indiquer le résultat exact de la vérification, par exemple « aucune donnée relative à vos locataires n'a été saisie dans un outil d'intelligence artificielle »]. Les comptes rendus de chantier vous concernant sont rédigés à partir de notes techniques ne comportant pas d'identité de locataire.</p>
<p>Conformément au règlement (UE) 2024/1689, nos salariés utilisateurs ont été formés à l'usage de ces outils, et l'ensemble de l'équipe a été sensibilisé aux règles de la charte. Aucun outil d'IA n'intervient dans une décision concernant vos locataires ni dans nos échanges avec eux sans intervention humaine.</p>
<p>Nous restons à votre disposition pour en échanger et, si vous le souhaitez, pour intégrer ces engagements à nos documents contractuels.</p>
<p>Nous vous prions d'agréer, Madame, Monsieur, l'expression de nos salutations distinguées.</p>
<p>Sandrine MOREL, dirigeante – Thermia Rénov</p>
</blockquote>
<p><strong>Points de vigilance sur ce courrier :</strong> le passage entre crochets ne doit être complété qu'après une vérification réelle ; si des données ont été saisies, il faut le dire, expliquer les mesures prises et, le cas échéant, organiser avec le bailleur la gestion de l'incident. Les affirmations sur la formation et la charte doivent correspondre à des actions effectivement réalisées et tracées.</p>
<blockquote><strong>À retenir :</strong> la conformité des usages de l'IA se construit en traitant les incidents sans les cacher, en refusant les usages trompeurs ou discriminatoires, en choisissant des outils professionnels encadrés par contrat, en adoptant une charte connue de tous, en traçant la formation et en répondant aux clients avec des engagements exacts et vérifiables.</blockquote>
`,
      },
    ],
  },
];
