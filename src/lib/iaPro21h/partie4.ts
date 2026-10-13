import type { CourseChapter } from "../courseContent";

export const IAP21_PARTIE4: CourseChapter[] = [
  {
    title: "Chapitre 7 – Évaluation finale, bilan et plan d'action",
    description:
      "Jour 3, fin d'après-midi, en présentiel (émargement papier de la demi-journée). Évaluation finale interne : mise en situation complète sur le cas Thermia Rénov couvrant les compétences C1 à C5, puis QCM de fin de formation ; consignes, sujet et dossier documentaire, grille d'observation par compétence avec critères et niveaux, corrigé commenté d'une copie de référence. Révision synthétique sous forme de fiches mémo, autoévaluation, plan d'action individuel à 30, 60 et 90 jours, questionnaires de satisfaction à chaud et à froid, attestation de fin de formation.",
    sections: [
      {
        title: "7.1 – L'évaluation finale : objectifs, déroulé et règles du jeu",
        content: `<h3>Pourquoi une évaluation finale ?</h3>
<p>Au terme des trois journées, il s'agit de vérifier, de manière objective et traçable, que chaque stagiaire est capable de <strong>mobiliser les cinq compétences</strong> travaillées pendant la formation dans une situation proche de son quotidien professionnel. L'évaluation finale n'est pas un examen au sens scolaire : elle ne délivre ni diplôme ni titre. Elle sert trois objectifs :</p>
<ul>
<li><strong>Mesurer les acquis</strong> de chaque stagiaire, compétence par compétence, au regard des objectifs annoncés dans le programme ;</li>
<li><strong>Alimenter l'attestation de fin de formation</strong>, qui mentionne les objectifs, la nature, la durée de l'action et les résultats de l'évaluation des acquis (article L. 6353-1 du code du travail) ;</li>
<li><strong>Préparer l'après-formation</strong> : les écarts constatés deviennent les priorités du plan d'action individuel à 30, 60 et 90 jours.</li>
</ul>
<p>Comme tout au long des trois jours, l'évaluation s'appuie sur le fil rouge <strong>Thermia Rénov</strong>, PME <em>fictive</em> de rénovation énergétique installée à Saint-Genis-Laval (Rhône), qui emploie 14 salariés. Sa dirigeante, <strong>Sandrine MOREL</strong>, souhaite généraliser l'usage de l'IA générative pour gagner du temps sur les devis, les mails clients, les comptes rendus de chantier, les publications sur les réseaux sociaux et la veille, <strong>sans jamais exposer les données de ses clients</strong>. Vous retrouverez <strong>Julie</strong> (assistante administrative), <strong>Karim</strong> (commercial) et <strong>Thomas</strong> (conducteur de travaux). <em>Tous les noms, chiffres et documents du cas sont fictifs.</em></p>
<h3>Le déroulé de la fin d'après-midi</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Horaire indicatif</th><th>Séquence</th><th>Modalité</th><th>Production attendue</th></tr>
<tr><td>15 h 00 – 15 h 05</td><td>Lancement : rappel des consignes, distribution du sujet et du dossier documentaire</td><td>Collectif</td><td>Questions de compréhension uniquement</td></tr>
<tr><td>15 h 05 – 16 h 05</td><td>Mise en situation complète Thermia Rénov (cinq tâches, C1 à C5)</td><td>Individuel, sur poste connecté</td><td>Un document de rendu unique (traitement de texte), avec les prompts utilisés et les réponses retenues</td></tr>
<tr><td>16 h 05 – 16 h 25</td><td>QCM de fin de formation (20 questions)</td><td>Individuel, papier ou formulaire en ligne, sans IA</td><td>Feuille de réponses</td></tr>
<tr><td>16 h 25 – 16 h 40</td><td>Correction collective du QCM, retours individuels rapides sur la mise en situation</td><td>Collectif puis individuel</td><td>Grille d'observation complétée par le formateur</td></tr>
<tr><td>16 h 40 – 16 h 55</td><td>Autoévaluation, plan d'action à 30/60/90 jours</td><td>Individuel</td><td>Fiche d'autoévaluation et plan d'action</td></tr>
<tr><td>16 h 55 – 17 h 00</td><td>Questionnaire de satisfaction à chaud, signature de la feuille d'émargement de la demi-journée</td><td>Individuel</td><td>Questionnaire rempli, émargement signé</td></tr>
</table>
<p>L'horaire est indicatif : si la séquence C5 du début d'après-midi a pris plus de temps, le formateur réduit d'abord la correction collective du QCM (qui peut être remise par écrit), jamais la durée de la mise en situation.</p>
<h3>Les règles du jeu</h3>
<ol>
<li><strong>L'IA est autorisée</strong> pendant la mise en situation, et même attendue : on évalue votre capacité à l'utiliser correctement, pas à vous en passer. Vous utilisez l'outil que vous avez pratiqué pendant la formation (ChatGPT, Microsoft Copilot, Google Gemini, Le Chat de Mistral AI, Claude ou Perplexity), dans sa version proposée par l'organisme ou par votre entreprise.</li>
<li><strong>L'IA est interdite pendant le QCM</strong>, qui vérifie vos connaissances personnelles.</li>
<li><strong>Vous conservez vos prompts</strong> : chaque production doit être accompagnée du ou des prompts utilisés et, le cas échéant, des relances. Une bonne réponse obtenue par un prompt que vous ne savez pas expliquer ne démontre pas la compétence C2.</li>
<li><strong>Aucune donnée réelle</strong> : le dossier documentaire ne contient que des données fictives. Vous les traitez pourtant comme si elles étaient réelles, c'est-à-dire en appliquant les règles de confidentialité vues en C5 (anonymisation avant saisie dans un outil grand public, notamment). Ce point est observé.</li>
<li><strong>Vous êtes responsable du résultat</strong> : tout contenu rendu est réputé relu et validé par vous. Une erreur laissée par l'IA dans un document rendu est comptée comme votre erreur, exactement comme elle le serait dans un mail envoyé à un vrai client.</li>
</ol>
<h3>Ce qui est évalué, et comment</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Compétence</th><th>Tâche de la mise en situation</th><th>Questions du QCM</th></tr>
<tr><td>C1 – Comprendre le fonctionnement, les possibilités et les limites de l'IA générative</td><td>Tâche 1 : note de recommandation à la dirigeante</td><td>Questions 1 à 4</td></tr>
<tr><td>C2 – Rédiger des requêtes efficaces et améliorer les réponses par itération</td><td>Tâche 2 : prompt structuré et itérations pour une réponse client (observé aussi dans toutes les tâches)</td><td>Questions 5 à 8</td></tr>
<tr><td>C3 – Produire et vérifier des contenus professionnels</td><td>Tâche 3 : compte rendu de chantier, publication et contrôle d'un texte produit par l'IA</td><td>Questions 9 à 12</td></tr>
<tr><td>C4 – Intégrer l'IA dans ses processus et automatiser des tâches simples</td><td>Tâche 4 : cartographie des tâches de Julie et proposition d'automatisation</td><td>Questions 13 à 16</td></tr>
<tr><td>C5 – Utiliser l'IA de façon responsable et conforme</td><td>Tâche 5 : analyse de situations à risque et règles de charte (observé aussi dans toutes les tâches)</td><td>Questions 17 à 20</td></tr>
</table>
<p>Chaque compétence est positionnée sur quatre niveaux (non acquis, en cours d'acquisition, acquis, maîtrisé) à partir de la grille d'observation (section 7.4) et du score au QCM. Une compétence est déclarée <strong>acquise</strong> lorsque le niveau « acquis » est atteint dans la grille et qu'au moins trois questions sur quatre du QCM correspondant sont justes. Les deux sources se complètent : la mise en situation mesure le savoir-faire, le QCM vérifie les connaissances qui le sous-tendent.</p>
<h3>Adaptations et égalité de traitement</h3>
<p>Les adaptations prévues lors de l'analyse des besoins (temps majoré, police agrandie, lecteur d'écran, sujet remis à l'avance en version numérique, pause supplémentaire) sont appliquées sans qu'il soit nécessaire de les redemander. Le référent handicap de l'organisme est informé en amont. Un stagiaire qui n'a pas pu suivre une demi-journée (absence justifiée) passe l'évaluation complète ; le formateur note l'absence dans son compte rendu et propose, si nécessaire, un temps de rattrapage ciblé.</p>
<blockquote><strong>Bonne pratique</strong> – Avant de démarrer, ouvrez une nouvelle conversation dans votre outil d'IA, vérifiez que l'historique et l'utilisation de vos échanges pour l'entraînement des modèles sont paramétrés comme vu en C5, et créez votre document de rendu avec un titre par tâche. Ces deux minutes de préparation font partie de la compétence C4 : organiser son poste avant de produire.</blockquote>`,
      },
      {
        title: "7.2 – Le sujet complet de la mise en situation Thermia Rénov",
        content: `<h3>Contexte remis au stagiaire</h3>
<p><em>Vous venez de rejoindre Thermia Rénov (entreprise fictive) comme « référent IA » à temps partiel, en plus de votre poste habituel. Sandrine MOREL, la dirigeante, vous confie ce lundi une série de demandes avant la réunion d'équipe de jeudi. L'entreprise dispose d'abonnements professionnels à un assistant conversationnel et à Microsoft 365 ; les salariés utilisent aussi, sur leur téléphone, des versions gratuites d'outils grand public. Aucune charte d'usage n'existe encore. Vous disposez de 60 minutes pour traiter les cinq tâches ci-dessous. Le dossier documentaire (annexes A à E, section 7.3) contient toutes les informations nécessaires.</em></p>
<h3>Consignes générales</h3>
<ul>
<li>Rendez <strong>un seul document</strong> intitulé « Évaluation finale – [vos initiales] », structuré en cinq parties (Tâche 1 à Tâche 5).</li>
<li>Pour chaque tâche utilisant l'IA, copiez <strong>le prompt initial</strong>, <strong>les relances</strong> et <strong>la version finale retenue</strong>, puis indiquez en deux ou trois lignes ce que vous avez vérifié ou corrigé.</li>
<li>Répartition conseillée du temps : tâche 1 = 8 min ; tâche 2 = 12 min ; tâche 3 = 18 min ; tâche 4 = 12 min ; tâche 5 = 10 min.</li>
<li>Une tâche non terminée est évaluée sur ce qui est rendu : mieux vaut cinq tâches traitées correctement à 80 % qu'une tâche parfaite et quatre absentes.</li>
</ul>
<h3>Tâche 1 – Comprendre et choisir (C1) – 8 minutes</h3>
<p>Sandrine MOREL vous écrit : « Karim dit que l'IA "sait tout" et qu'on peut lui demander directement le montant des aides pour chaque client. Thomas pense au contraire que c'est un gadget. Faites-moi une note de 10 à 15 lignes pour que je tranche jeudi. »</p>
<p>Rédigez, <strong>sans obligation d'utiliser l'IA</strong>, une note qui :</p>
<ol>
<li>explique simplement comment un grand modèle de langage produit une réponse (en évitant le jargon) ;</li>
<li>cite au moins <strong>trois limites</strong> concrètes et les relie à une situation de Thermia Rénov ;</li>
<li>indique, pour les trois besoins de l'annexe A, quel <strong>type d'outil</strong> vous paraît le plus adapté (assistant conversationnel, assistant intégré à la bureautique, outil connecté au web avec sources, outil de création visuelle, outil d'automatisation) et pourquoi ;</li>
<li>conclut par une recommandation nuancée.</li>
</ol>
<h3>Tâche 2 – Rédiger un prompt et itérer (C2) – 12 minutes</h3>
<p>Mme Ferrand (cliente fictive) a envoyé le mail de l'annexe B : elle se plaint d'un retard de chantier et d'un manque d'information. Karim vous demande de l'aider à préparer une réponse.</p>
<ol>
<li>Rédigez un <strong>prompt structuré</strong> (rôle, contexte, tâche, format, contraintes) pour obtenir un projet de réponse. Le prompt ne doit contenir <strong>aucune donnée personnelle inutile</strong>.</li>
<li>Soumettez-le, puis effectuez <strong>au moins deux itérations</strong> d'amélioration (par exemple : ajuster le ton, raccourcir, ajouter une proposition concrète, demander à l'IA de critiquer sa propre réponse).</li>
<li>Expliquez en trois lignes ce que chaque itération a apporté.</li>
<li>Rendez la réponse finale, prête à être relue par Karim, avec les éléments à compléter signalés entre crochets.</li>
</ol>
<h3>Tâche 3 – Produire et vérifier des contenus (C3) – 18 minutes</h3>
<p><strong>3 a.</strong> À partir des notes brutes de Thomas (annexe C), faites produire par l'IA un <strong>compte rendu de visite de chantier</strong> structuré (participants, constats, réserves, actions, responsables, échéances). Vérifiez-le contre les notes : aucune information ne doit être ajoutée, perdue ou modifiée.</p>
<p><strong>3 b.</strong> Faites produire une <strong>publication pour le réseau social professionnel</strong> de l'entreprise valorisant ce chantier (100 à 150 mots), <strong>sans identifier le client</strong> ni son adresse.</p>
<p><strong>3 c.</strong> L'annexe D reproduit un texte produit par une IA pour la page « Aides » du site internet. <strong>Relevez au moins cinq problèmes</strong> (erreurs factuelles possibles, promesses commerciales, chiffres invérifiables, mentions manquantes, ton) et proposez une version corrigée prudente.</p>
<h3>Tâche 4 – Intégrer l'IA dans un processus (C4) – 12 minutes</h3>
<p>L'annexe E décrit une semaine type de Julie, l'assistante administrative.</p>
<ol>
<li>Classez ses tâches en trois catégories : <em>l'IA peut aider</em>, <em>l'automatisation peut aider</em>, <em>à garder entièrement humain</em>, en justifiant brièvement.</li>
<li>Choisissez <strong>une</strong> tâche répétitive et décrivez une automatisation simple sans code (déclencheur, étapes, outil envisagé parmi Power Automate, Zapier ou Make, point de contrôle humain).</li>
<li>Estimez le <strong>temps gagné</strong> par semaine (hypothèse chiffrée et explicitée) et indiquez comment vous le mesurerez réellement après un mois.</li>
</ol>
<h3>Tâche 5 – Agir de façon responsable et conforme (C5) – 10 minutes</h3>
<p>Analysez les quatre situations suivantes (fictives). Pour chacune : identifiez le risque, la règle concernée (RGPD, confidentialité, règlement européen sur l'IA, droit d'auteur, transparence) et la bonne pratique.</p>
<ol>
<li>Julie a collé dans un assistant gratuit, sur son téléphone personnel, le tableau des impayés comprenant noms, adresses et montants dus, pour « faire une relance groupée ».</li>
<li>Karim veut publier sur le site un témoignage client « réécrit par l'IA pour qu'il soit plus vendeur », signé du prénom d'une vraie cliente.</li>
<li>Thomas souhaite utiliser, pour la plaquette commerciale, une image générée « dans le style » d'un illustrateur connu, trouvée sur un forum.</li>
<li>Sandrine MOREL envisage d'installer sur le site un agent conversationnel qui répond aux prospects, sans indiquer qu'il s'agit d'une IA.</li>
</ol>
<p>Terminez en proposant <strong>cinq règles</strong> courtes pour la future charte d'usage de l'IA de Thermia Rénov.</p>
<blockquote><strong>Bonne pratique</strong> – Lisez le sujet en entier avant de commencer et repérez les mots qui fixent les exigences : « aucune donnée personnelle inutile », « sans identifier le client », « au moins deux itérations », « hypothèse explicitée ». Ce sont les critères que le formateur observera en priorité.</blockquote>`,
      },
      {
        title: "7.3 – Le dossier documentaire (annexes A à E)",
        content: `<p>Le dossier documentaire est remis au format papier et au format numérique (fichier texte que l'on peut copier). <em>Toutes les données sont fictives.</em> Elles comportent volontairement des données personnelles et des pièges, afin d'observer les réflexes du stagiaire.</p>
<h3>Annexe A – Trois besoins exprimés par l'équipe</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Besoin</th><th>Exprimé par</th><th>Détail</th></tr>
<tr><td>A1</td><td>Karim</td><td>« Je veux connaître les évolutions récentes des aides à la rénovation énergétique pour les particuliers, avec les textes officiels, avant mes rendez-vous. »</td></tr>
<tr><td>A2</td><td>Julie</td><td>« Je passe beaucoup de temps à reprendre les mêmes mails et courriers dans Outlook et Word. »</td></tr>
<tr><td>A3</td><td>Sandrine MOREL</td><td>« Je voudrais des visuels propres pour nos publications, aux couleurs de l'entreprise, sans faire appel à une agence pour chaque post. »</td></tr>
</table>
<h3>Annexe B – Mail de Mme Ferrand (fictif)</h3>
<p><em>Objet : Chantier – toujours rien !</em><br>
« Bonjour, nous avions signé en juin pour l'isolation des combles et la pompe à chaleur de notre maison au 12 [adresse fictive] à Brignais. On nous avait dit que tout serait fini mi-septembre. Nous sommes fin septembre, l'isolation est faite mais la pompe à chaleur n'est toujours pas posée et personne ne nous appelle. Mon mari a 78 ans et il commence à faire froid le soir. Mon numéro : 06 00 00 00 00 [fictif]. Je commence à me demander si on n'aurait pas dû choisir une autre entreprise. Cordialement, Mme Ferrand. »</p>
<p><strong>Information interne (non connue de la cliente)</strong> : le fournisseur a livré l'unité extérieure avec dix jours de retard ; la pose est désormais planifiée la semaine suivante, sous réserve de confirmation par Thomas. Aucun geste commercial n'a été validé par la direction.</p>
<h3>Annexe C – Notes brutes de Thomas après la visite de chantier (fictives)</h3>
<p>« Visite mardi 29/09 9 h chantier Ferrand Brignais. Présents moi, Yanis (poseur), M. Ferrand. Isolation combles OK, épaisseur contrôlée, repérage trappe OK. Reste : 1) PAC pas posée, unité ext. livrée hier, pose prévue lundi 05/10 si Yanis dispo (à confirmer jeudi) ; 2) évacuation condensats à prévoir côté garage, M. Ferrand d'accord ; 3) petite tache plafond chambre 2 suite passage, à reprendre peinture – réserve ; 4) M. Ferrand demande si on reprend la cuve fioul, pas prévu au devis, faire chiffrage. Prochaine visite après pose. Photos dans le dossier partagé. »</p>
<h3>Annexe D – Texte produit par une IA pour la page « Aides » du site (fictif)</h3>
<p>« Grâce à Thermia Rénov, obtenez jusqu'à 90 % de vos travaux remboursés ! Nos experts vous garantissent l'obtention de MaPrimeRénov' en moins de 15 jours. Selon une étude récente, 97 % des Français ayant fait isoler leurs combles ont divisé leur facture par trois. L'éco-prêt à taux zéro est accessible à tous, sans condition. Profitez-en vite, ces aides disparaissent à la fin du mois ! Nous sommes l'entreprise la mieux notée de la région lyonnaise. Contactez-nous pour un devis gratuit et sans engagement. »</p>
<h3>Annexe E – Semaine type de Julie (fictive)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Tâche</th><th>Fréquence</th><th>Temps estimé par Julie</th></tr>
<tr><td>Saisir les demandes de devis arrivées par le formulaire du site dans le tableau de suivi</td><td>Environ 15 par semaine</td><td>5 min par demande</td></tr>
<tr><td>Envoyer l'accusé de réception au prospect</td><td>Environ 15 par semaine</td><td>3 min par mail</td></tr>
<tr><td>Relancer les devis non signés à 10 jours</td><td>Environ 10 par semaine</td><td>5 min par relance</td></tr>
<tr><td>Mettre en forme les comptes rendus de chantier dictés par Thomas</td><td>3 par semaine</td><td>20 min chacun</td></tr>
<tr><td>Répondre au téléphone aux clients mécontents</td><td>Variable</td><td>1 h par semaine</td></tr>
<tr><td>Préparer les dossiers d'aides (pièces justificatives, vérification de complétude)</td><td>4 par semaine</td><td>45 min chacun</td></tr>
<tr><td>Classer les factures fournisseurs et les rapprocher des commandes</td><td>Environ 30 par semaine</td><td>2 min par facture</td></tr>
<tr><td>Préparer l'ordre du jour de la réunion d'équipe du lundi</td><td>1 par semaine</td><td>20 min</td></tr>
</table>
<blockquote><strong>Bonne pratique</strong> – Avant de copier un élément du dossier dans un outil d'IA, demandez-vous systématiquement : « Ai-je besoin de cette donnée pour obtenir la réponse ? » Le nom, l'adresse, le numéro de téléphone et l'âge de M. Ferrand ne sont pas nécessaires pour rédiger une réponse empathique : on les remplace par [Client], [adresse] ou on les supprime.</blockquote>`,
      },
      {
        title: "7.4 – La grille d'observation par compétence (C1 à C5)",
        content: `<h3>Les quatre niveaux</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Niveau</th><th>Libellé</th><th>Description générale</th></tr>
<tr><td>0</td><td>Non acquis</td><td>Le critère n'est pas observé, ou la production comporte une erreur qui la rendrait inutilisable ou dangereuse en situation réelle.</td></tr>
<tr><td>1</td><td>En cours d'acquisition</td><td>Le critère est partiellement observé ; la production nécessiterait une reprise importante avant usage.</td></tr>
<tr><td>2</td><td>Acquis</td><td>Le critère est observé ; la production est utilisable après une relecture ordinaire.</td></tr>
<tr><td>3</td><td>Maîtrisé</td><td>Le critère est observé avec aisance ; le stagiaire justifie ses choix, anticipe les risques et propose des améliorations.</td></tr>
</table>
<p>Pour chaque compétence, le formateur note chacun des critères de 0 à 3. Le niveau de la compétence correspond au <strong>niveau atteint par la majorité des critères</strong>, sous réserve des points rédhibitoires : un point rédhibitoire constaté plafonne la compétence au niveau 1, quel que soit le reste.</p>
<h3>C1 – Comprendre le fonctionnement, les possibilités et les limites de l'IA générative</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Indicateur observable (niveau 2 « acquis »)</th><th>Ce qui fait passer au niveau 3</th></tr>
<tr><td>C1.1 Fonctionnement</td><td>Explique que le modèle prédit la suite la plus probable d'un texte à partir de ce qu'il a appris, sans « savoir » ni vérifier</td><td>Évoque le contexte (fenêtre), la date de connaissance et la différence entre un modèle seul et un outil connecté au web</td></tr>
<tr><td>C1.2 Limites</td><td>Cite au moins trois limites pertinentes (hallucinations, date de connaissance, biais, absence de sources, variabilité des réponses)</td><td>Relie chaque limite à une conséquence concrète pour Thermia Rénov (montant d'aide erroné, réglementation dépassée)</td></tr>
<tr><td>C1.3 Choix d'outil</td><td>Associe un type d'outil adapté à chacun des trois besoins de l'annexe A</td><td>Justifie par des critères (sources, intégration, confidentialité, coût d'apprentissage) et signale ce qu'il faut vérifier dans les conditions d'utilisation</td></tr>
<tr><td>C1.4 Jugement</td><td>Formule une recommandation nuancée, ni « l'IA sait tout » ni « gadget »</td><td>Propose un test encadré, avec des usages pilotes et un point d'étape</td></tr>
</table>
<p><strong>Point rédhibitoire C1</strong> : affirmer que l'IA peut fournir de façon fiable le montant des aides d'un client sans vérification sur une source officielle.</p>
<h3>C2 – Rédiger des requêtes efficaces et améliorer les réponses par itération</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Indicateur observable (niveau 2)</th><th>Ce qui fait passer au niveau 3</th></tr>
<tr><td>C2.1 Structure</td><td>Le prompt contient au moins rôle, contexte, tâche, format et une contrainte</td><td>Ajoute un exemple de ton, une longueur cible, le destinataire et ce qu'il ne faut pas faire</td></tr>
<tr><td>C2.2 Données</td><td>Le prompt ne contient pas de données personnelles inutiles (nom, adresse, téléphone, âge)</td><td>Utilise des repères entre crochets réutilisables et explique son choix</td></tr>
<tr><td>C2.3 Itération</td><td>Au moins deux relances ciblées, dont l'apport est expliqué</td><td>Utilise une relance de critique (« relève les faiblesses de ta réponse ») ou de comparaison de deux versions</td></tr>
<tr><td>C2.4 Réutilisation</td><td>Le prompt final est compréhensible par un collègue</td><td>Propose de l'enregistrer dans la bibliothèque de prompts de l'entreprise ou dans un assistant personnalisé</td></tr>
</table>
<p><strong>Point rédhibitoire C2</strong> : copier intégralement le mail de la cliente, coordonnées comprises, dans un outil grand public sans paramétrage de confidentialité.</p>
<h3>C3 – Produire et vérifier des contenus professionnels avec l'IA</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Indicateur observable (niveau 2)</th><th>Ce qui fait passer au niveau 3</th></tr>
<tr><td>C3.1 Fidélité</td><td>Le compte rendu reprend les quatre points des notes sans ajout ni perte ; la date « à confirmer » reste conditionnelle</td><td>Signale explicitement les informations manquantes (heure de fin, confirmation de Yanis) au lieu de les inventer</td></tr>
<tr><td>C3.2 Adaptation</td><td>La publication respecte la longueur, le ton professionnel et n'identifie pas le client</td><td>Ajoute un appel à l'action sobre et propose un visuel adapté sans photo identifiante</td></tr>
<tr><td>C3.3 Vérification</td><td>Relève au moins cinq problèmes dans l'annexe D</td><td>Relève sept problèmes ou plus et indique pour chacun la source officielle à consulter</td></tr>
<tr><td>C3.4 Correction</td><td>La version corrigée ne contient plus de promesse, de chiffre invérifiable ni d'urgence artificielle</td><td>La version corrigée renvoie vers les informations officielles et précise que l'éligibilité est étudiée au cas par cas</td></tr>
</table>
<p><strong>Point rédhibitoire C3</strong> : laisser dans un contenu destiné aux clients une promesse d'obtention d'aide, un délai garanti ou une statistique inventée.</p>
<h3>C4 – Intégrer l'IA dans ses processus de travail et automatiser des tâches simples</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Indicateur observable (niveau 2)</th><th>Ce qui fait passer au niveau 3</th></tr>
<tr><td>C4.1 Cartographie</td><td>Les huit tâches sont classées de manière défendable</td><td>Le classement distingue l'aide à la rédaction, l'automatisation et la relation humaine, avec un critère explicite (répétitivité, enjeu, données)</td></tr>
<tr><td>C4.2 Automatisation</td><td>Décrit un déclencheur, des étapes et un outil plausibles</td><td>Prévoit un point de validation humaine, la gestion des erreurs et la protection des données transférées</td></tr>
<tr><td>C4.3 Mesure</td><td>Donne une estimation chiffrée du temps gagné avec son hypothèse</td><td>Propose une méthode de mesure réelle (relevé avant/après sur quatre semaines) et un indicateur de qualité</td></tr>
<tr><td>C4.4 Outils intégrés</td><td>Mentionne au moins un usage pertinent d'un assistant intégré (Copilot dans Outlook, Word, Excel ou Teams, ou équivalent)</td><td>Distingue ce qui relève de l'assistant intégré et ce qui relève d'un flux automatisé</td></tr>
</table>
<p><strong>Point rédhibitoire C4</strong> : proposer d'automatiser l'envoi aux clients de contenus générés par l'IA sans aucune relecture humaine.</p>
<h3>C5 – Utiliser l'IA de façon responsable et conforme à la réglementation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Indicateur observable (niveau 2)</th><th>Ce qui fait passer au niveau 3</th></tr>
<tr><td>C5.1 Données personnelles</td><td>Identifie le risque RGPD de la situation 1 et propose une alternative (outil professionnel paramétré, anonymisation, publipostage classique)</td><td>Mentionne la minimisation, la sécurité et le rôle du fournisseur comme sous-traitant</td></tr>
<tr><td>C5.2 Loyauté et transparence</td><td>Refuse le faux témoignage (situation 2) et exige l'information des utilisateurs de l'agent conversationnel (situation 4)</td><td>Relie la situation 4 aux obligations de transparence du règlement européen sur l'IA et la situation 2 aux pratiques commerciales trompeuses</td></tr>
<tr><td>C5.3 Droit d'auteur</td><td>Identifie le risque de la situation 3 et propose une alternative (visuel original, banque d'images sous licence, vérification des conditions de l'outil)</td><td>Explique l'incertitude sur la protection des contenus générés et la nécessité de tracer l'origine des visuels</td></tr>
<tr><td>C5.4 Charte</td><td>Propose cinq règles claires et applicables</td><td>Les règles couvrent données, vérification, transparence, outils autorisés et responsabilité, avec un référent désigné</td></tr>
</table>
<p><strong>Point rédhibitoire C5</strong> : juger acceptable l'une des quatre situations sans réserve.</p>
<h3>La fiche de synthèse du formateur</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Compétence</th><th>Niveau mise en situation (0 à 3)</th><th>Score QCM (sur 4)</th><th>Résultat</th><th>Commentaire et priorité du plan d'action</th></tr>
<tr><td>C1</td><td> </td><td> </td><td>Acquise / En cours / Non acquise</td><td> </td></tr>
<tr><td>C2</td><td> </td><td> </td><td>Acquise / En cours / Non acquise</td><td> </td></tr>
<tr><td>C3</td><td> </td><td> </td><td>Acquise / En cours / Non acquise</td><td> </td></tr>
<tr><td>C4</td><td> </td><td> </td><td>Acquise / En cours / Non acquise</td><td> </td></tr>
<tr><td>C5</td><td> </td><td> </td><td>Acquise / En cours / Non acquise</td><td> </td></tr>
</table>
<blockquote><strong>Bonne pratique</strong> – Le formateur complète la grille pendant la mise en situation, en notant des faits observés (« a supprimé le téléphone de la cliente avant saisie », « a laissé "pose le 05/10" sans réserve ») plutôt que des impressions. Ces faits nourrissent le retour individuel et rendent l'évaluation contestable sur pièces, donc équitable.</blockquote>`,
      },
      {
        title: "7.5 – Corrigé commenté d'une copie de référence",
        content: `<p>La copie ci-dessous a été <strong>rédigée par le formateur</strong> pour servir de référence ; elle correspond au niveau « acquis » à « maîtrisé ». Les commentaires en italique expliquent ce que le formateur observe. D'autres réponses sont recevables dès lors qu'elles respectent les critères de la grille.</p>
<h3>Tâche 1 – Note à Sandrine MOREL</h3>
<p>« <em>Objet : l'IA générative chez Thermia Rénov – ce qu'elle sait faire, ce qu'elle ne sait pas faire.</em><br>
Un assistant comme ChatGPT, Copilot, Gemini, Le Chat ou Claude ne "sait" rien au sens où nous l'entendons : il a appris, sur une très grande quantité de textes, à prédire la suite la plus probable d'une phrase. Il produit donc des textes fluides et souvent justes, mais il ne vérifie pas ce qu'il écrit. Trois limites nous concernent directement : 1) il peut inventer un chiffre ou une règle avec assurance (hallucination), par exemple un montant d'aide ou une condition d'éligibilité ; 2) ses connaissances s'arrêtent à une date et les barèmes d'aides changent souvent ; 3) il reproduit des biais et un ton parfois trop commercial. Il ne doit donc jamais donner seul le montant d'une aide à un client : ce montant se vérifie sur les sources officielles, au cas par cas. Pour le besoin de Karim (A1), un outil connecté au web qui cite ses sources, comme Perplexity ou le mode recherche d'un assistant, est adapté, à condition d'ouvrir les sources et de privilégier les sites publics. Pour Julie (A2), l'assistant intégré à Outlook et Word (Copilot dans Microsoft 365) est le plus pertinent, car il travaille dans nos outils, sous nos paramètres professionnels. Pour vos visuels (A3), les fonctions IA de Canva, avec un kit de marque, conviennent. Ma recommandation : ni gadget ni oracle, l'IA est un assistant de premier jet. Je propose un pilote de six semaines sur ces trois usages, avec une charte simple et un bilan chiffré. »</p>
<p><em>Commentaire : C1.1 niveau 3 (explication sans jargon, notion de prédiction et d'absence de vérification) ; C1.2 niveau 3 (trois limites reliées à l'entreprise) ; C1.3 niveau 2 à 3 (types d'outils adaptés, mention des paramètres professionnels ; il manque le rappel de vérifier les conditions d'utilisation de Canva) ; C1.4 niveau 3 (pilote encadré). Le point rédhibitoire est explicitement évité.</em></p>
<h3>Tâche 2 – Prompt et itérations</h3>
<p><strong>Prompt initial</strong> : « Tu es assistant du service client d'une PME de rénovation énergétique. Contexte : une cliente nous écrit, mécontente ; son chantier (isolation des combles terminée, pompe à chaleur pas encore posée) a pris environ deux semaines de retard par rapport à l'annonce faite à la signature et elle n'a pas été informée. Son conjoint est une personne âgée et il commence à faire froid. Cause interne : livraison tardive de l'unité extérieure par le fournisseur ; pose envisagée la semaine prochaine, date à confirmer. Tâche : rédige un projet de réponse par mail. Format : objet + 120 à 160 mots, vouvoiement. Contraintes : reconnaître le manque d'information sans se défausser sur le fournisseur, ne donner aucune date ferme, ne proposer aucun geste commercial, proposer un appel du conducteur de travaux, signaler entre crochets ce que nous devons compléter. »</p>
<p><em>Commentaire : rôle, contexte, tâche, format et contraintes sont présents (C2.1 niveau 3). Le nom, l'adresse, le téléphone et l'âge exact ont été retirés ; seule l'information utile (« personne âgée », « il fait froid ») est conservée pour adapter le ton (C2.2 niveau 3).</em></p>
<p><strong>Itération 1</strong> : « Ta réponse est trop longue et le premier paragraphe est trop formel. Commence par reconnaître le désagrément en une phrase, puis donne l'information, puis l'action. »<br>
<strong>Itération 2</strong> : « Relis ta réponse comme le ferait la cliente et relève ce qui pourrait l'agacer ou l'inquiéter. Corrige ensuite. » <em>(L'IA signale que « dans les meilleurs délais » sonne creux ; la version suivante propose un créneau d'appel concret.)</em><br>
<strong>Itération 3</strong> : « Ajoute une phrase proposant, si elle le souhaite, une solution de chauffage d'appoint en attendant, sans engagement financier de notre part, formulée comme une question. »</p>
<p><strong>Apport des itérations</strong> : la première a corrigé la structure et la longueur, la deuxième a fait apparaître une formule creuse grâce à l'autocritique, la troisième a ajouté une attention concrète tout en respectant l'absence de geste commercial non validé.</p>
<p><strong>Réponse finale</strong> : « <em>Objet : Votre chantier – point sur la pose de votre pompe à chaleur</em><br>
Madame [Nom], vous avez raison : nous aurions dû vous prévenir du décalage, et je vous prie de nous en excuser. L'isolation de vos combles est terminée ; la pose de la pompe à chaleur a été retardée par une livraison tardive du matériel, désormais reçu. Notre conducteur de travaux, [Prénom], vous appellera [jour et heure à confirmer] pour vous proposer une date de pose ferme. Si vous le souhaitez d'ici là, il pourra aussi faire le point avec vous sur le confort de votre logement les soirs de froid. Nous restons à votre disposition au [numéro du standard]. Bien cordialement, Karim, Thermia Rénov. »</p>
<p><em>Commentaire : C2.3 niveau 3 (autocritique utilisée). C2.4 niveau 2 : la copie aurait gagné à proposer d'enregistrer ce prompt dans la bibliothèque de l'entreprise comme modèle « réclamation retard ». La réponse ne contient ni date ferme, ni geste commercial, ni accusation du fournisseur : elle est envoyable après complétion des crochets.</em></p>
<h3>Tâche 3 – Compte rendu, publication et vérification</h3>
<p><strong>3 a. Compte rendu (extrait)</strong> : « Visite de chantier du mardi 29/09, 9 h – Participants : Thomas (conducteur de travaux), Yanis (poseur), le client. Constats : isolation des combles conforme (épaisseur contrôlée, repérage de la trappe réalisé). Points ouverts : 1) pose de la PAC prévue le lundi 05/10, <strong>sous réserve de confirmation de la disponibilité du poseur jeudi</strong> – responsable : Thomas ; 2) évacuation des condensats côté garage, accord du client – à intégrer à la pose ; 3) réserve : tache au plafond de la chambre 2, reprise de peinture à planifier – responsable : [à désigner] ; 4) demande du client concernant la reprise de la cuve à fioul, non prévue au devis – chiffrage à établir – responsable : [à désigner], échéance : [à fixer]. Prochaine visite : après la pose. Photos : dossier partagé du chantier. »</p>
<p><em>Commentaire : C3.1 niveau 3. Lors du premier jet, l'IA avait écrit « pose confirmée le 05/10 » et « la cuve sera reprise » : la copie a corrigé ces deux glissements, qui auraient constitué un engagement non pris. Les responsables non mentionnés dans les notes sont signalés entre crochets au lieu d'être inventés. Le nom du client a été remplacé par « le client » avant saisie.</em></p>
<p><strong>3 b. Publication</strong> : « Isolation des combles terminée cette semaine pour une maison des années 70 de l'ouest lyonnais : épaisseur contrôlée, trappe d'accès repérée, et une pompe à chaleur air/eau qui prendra le relais dans les prochains jours. Isoler avant de changer de chauffage, c'est réduire les besoins avant de produire la chaleur : la logique que nous appliquons sur chaque projet. Merci à notre équipe de pose pour la qualité du travail et à nos clients pour leur confiance. Vous avez un projet de rénovation énergétique ? Parlons-en : nous étudions chaque situation au cas par cas. » <em>(environ 100 mots)</em></p>
<p><em>Commentaire : C3.2 niveau 3 : ni nom, ni commune précise, ni photo de la façade ; aucune promesse chiffrée. La copie suggère un visuel de l'isolant en place, sans élément identifiant.</em></p>
<p><strong>3 c. Problèmes relevés dans l'annexe D</strong> :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Passage</th><th>Problème</th><th>Correction ou vérification</th></tr>
<tr><td>1</td><td>« jusqu'à 90 % de vos travaux remboursés »</td><td>Chiffre non sourcé, présenté comme une promesse ; les aides dépendent des ressources, du logement et des travaux</td><td>Supprimer ; renvoyer aux sites officiels et à une étude personnalisée</td></tr>
<tr><td>2</td><td>« Grâce à Thermia Rénov, obtenez »</td><td>L'entreprise n'attribue pas les aides publiques</td><td>Préciser que les aides sont attribuées par les organismes publics compétents</td></tr>
<tr><td>3</td><td>« vous garantissent l'obtention […] en moins de 15 jours »</td><td>Garantie d'obtention et délai que l'entreprise ne maîtrise pas : pratique commerciale trompeuse</td><td>Supprimer toute garantie ; « nous vous accompagnons dans le montage du dossier »</td></tr>
<tr><td>4</td><td>« Selon une étude récente, 97 % … divisé leur facture par trois »</td><td>Statistique invérifiable, probablement inventée par l'IA (aucune source)</td><td>Supprimer, ou remplacer par une donnée issue d'une source publique identifiée</td></tr>
<tr><td>5</td><td>« L'éco-prêt à taux zéro est accessible à tous, sans condition »</td><td>Généralisation inexacte : le dispositif a des conditions</td><td>« soumis à conditions, à vérifier auprès d'une banque partenaire et sur service-public »</td></tr>
<tr><td>6</td><td>« ces aides disparaissent à la fin du mois »</td><td>Urgence artificielle, non vérifiée</td><td>Supprimer</td></tr>
<tr><td>7</td><td>« la mieux notée de la région lyonnaise »</td><td>Allégation comparative non justifiée</td><td>Supprimer ou citer une source vérifiable et datée</td></tr>
<tr><td>8</td><td>Ensemble du texte</td><td>Ton racoleur, points d'exclamation, absence de date de mise à jour</td><td>Ton informatif, mention « informations à jour au [date] »</td></tr>
</table>
<p><strong>Version corrigée</strong> : « Plusieurs aides publiques peuvent réduire le coût de vos travaux de rénovation énergétique (par exemple MaPrimeRénov', les certificats d'économies d'énergie ou l'éco-prêt à taux zéro). Elles sont attribuées par les organismes compétents, selon des conditions qui dépendent notamment de vos ressources, de votre logement et des travaux envisagés. Nous étudions votre situation au cas par cas et vous accompagnons dans la constitution de votre dossier ; le montant définitif n'est connu qu'après décision de l'organisme. Pour une information officielle et à jour, consultez le site service-public ou un conseiller du réseau public France Rénov'. Informations à jour au [date]. »</p>
<p><em>Commentaire : C3.3 niveau 3 (huit problèmes), C3.4 niveau 3. Point de vigilance : la copie ne réaffirme aucune condition précise des aides qu'elle n'aurait pas vérifiée.</em></p>
<h3>Tâche 4 – Processus de Julie</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Tâche</th><th>Catégorie</th><th>Justification</th></tr>
<tr><td>Saisie des demandes de devis</td><td>Automatisation</td><td>Données structurées issues d'un formulaire, répétitif, sans jugement</td></tr>
<tr><td>Accusé de réception</td><td>Automatisation</td><td>Message standard déclenché par la demande</td></tr>
<tr><td>Relances à 10 jours</td><td>IA + automatisation, avec validation</td><td>Rappel automatique ; texte personnalisé proposé par l'IA, relu avant envoi</td></tr>
<tr><td>Mise en forme des comptes rendus</td><td>IA</td><td>Structuration d'un texte dicté ; relecture par Thomas</td></tr>
<tr><td>Clients mécontents au téléphone</td><td>Humain</td><td>Relation, écoute, enjeu commercial ; l'IA peut aider seulement à préparer une réponse écrite ensuite</td></tr>
<tr><td>Dossiers d'aides</td><td>Humain, avec liste de contrôle</td><td>Enjeu financier et données sensibles ; une check-list peut être produite avec l'IA, mais la vérification reste humaine</td></tr>
<tr><td>Factures fournisseurs</td><td>Automatisation partielle</td><td>Classement automatique possible ; rapprochement à contrôler</td></tr>
<tr><td>Ordre du jour du lundi</td><td>IA</td><td>Premier jet à partir des points remontés dans la semaine</td></tr>
</table>
<p><strong>Automatisation proposée</strong> : déclencheur = nouvelle réponse au formulaire de demande de devis ; étape 1 = ajout d'une ligne dans le tableau de suivi (Excel en ligne ou liste partagée) ; étape 2 = envoi d'un accusé de réception standard, rédigé une fois et validé par la direction ; étape 3 = notification à Karim ; étape 4 = rappel à Julie à J+10 si le statut n'est pas « signé ». Outil envisagé : Power Automate, déjà inclus dans l'environnement Microsoft 365 de l'entreprise (à vérifier selon l'abonnement). Point de contrôle humain : Julie vérifie chaque matin les lignes créées ; aucun texte généré par l'IA n'est envoyé sans relecture. Les données ne quittent pas l'environnement professionnel.</p>
<p><strong>Temps gagné estimé</strong> : saisie 15 × 5 min + accusés 15 × 3 min = 120 min par semaine, dont on retient prudemment 80 % automatisables, soit environ 1 h 35 par semaine (hypothèse : 15 demandes hebdomadaires, contrôle quotidien de 5 min déduit). <strong>Mesure</strong> : Julie relève pendant quatre semaines le temps passé sur ces tâches avant et après la mise en place, ainsi que le nombre d'erreurs de saisie.</p>
<p><em>Commentaire : C4.1 à C4.3 niveau 3. C4.4 niveau 2 : l'usage de Copilot dans Word pour les comptes rendus aurait pu être cité explicitement.</em></p>
<h3>Tâche 5 – Situations à risque et charte</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Risque et règle</th><th>Bonne pratique</th></tr>
<tr><td>1. Tableau des impayés dans un outil gratuit sur téléphone personnel</td><td>Transfert de données personnelles (et financières) vers un service non maîtrisé : non-respect des principes du RGPD (minimisation, sécurité), absence de contrat avec le fournisseur ; atteinte possible à la confidentialité</td><td>Ne jamais saisir ces données ; publipostage depuis l'outil de gestion, ou modèle de relance rédigé avec l'IA sans aucune donnée, puis fusion dans l'outil interne</td></tr>
<tr><td>2. Témoignage réécrit et signé d'une vraie cliente</td><td>Faux avis ou avis déformé : pratique commerciale trompeuse ; atteinte aux droits de la personne</td><td>Publier le témoignage authentique avec son accord écrit ; on peut corriger l'orthographe avec son accord, pas inventer</td></tr>
<tr><td>3. Image « dans le style » d'un illustrateur, trouvée sur un forum</td><td>Origine et droits inconnus, risque de contrefaçon et d'atteinte à l'image de l'artiste ; protection incertaine des contenus générés</td><td>Créer un visuel original avec un outil dont les conditions autorisent l'usage commercial, ou utiliser une banque d'images sous licence ; tracer l'origine</td></tr>
<tr><td>4. Agent conversationnel non signalé</td><td>Obligation d'informer les personnes qu'elles interagissent avec une IA (transparence, article 50 du règlement européen sur l'IA, applicable à partir du 02/08/2026) ; information RGPD des prospects</td><td>Mention claire dès le début de l'échange, possibilité de joindre un humain, mention d'information sur les données</td></tr>
</table>
<p><strong>Cinq règles proposées pour la charte</strong> : 1) Seuls les outils listés par la direction, en version professionnelle paramétrée, sont utilisés pour le travail. 2) Aucune donnée personnelle de client ni information confidentielle n'est saisie sans anonymisation préalable. 3) Tout contenu produit avec l'IA est relu et vérifié par son auteur avant envoi ou publication ; chiffres, aides et règles sont contrôlés sur une source officielle. 4) Nous indiquons à nos clients quand ils échangent avec une IA, et nous ne publions jamais de faux avis ni de visuel d'origine inconnue. 5) Un référent IA tient le registre des usages et fait le point chaque trimestre.</p>
<p><em>Commentaire : C5.1 à C5.4 niveau 3. La copie présente l'échéance du 02/08/2026 comme applicable et ne s'appuie pas sur la proposition de report de la Commission, qui concerne d'autres obligations et dont l'état doit être vérifié.</em></p>
<blockquote><strong>Bonne pratique</strong> – Comparez votre copie à cette référence critère par critère, pas mot à mot. Notez pour chaque tâche un point fort et un point à travailler : ce sont les deux lignes qui alimenteront votre plan d'action individuel.</blockquote>`,
      },
      {
        title: "7.6 – Le QCM de fin de formation et son corrigé",
        content: `<h3>Consignes</h3>
<p>Vingt questions, une seule bonne réponse par question, 20 minutes, sans document ni outil d'IA. Chaque bonne réponse vaut un point. Le QCM est construit sur le même modèle que le QCM de positionnement du jour 1, ce qui permet de mesurer la progression.</p>
<h3>Questions</h3>
<ol>
<li><strong>Un grand modèle de langage produit une réponse :</strong> A. en recherchant la réponse exacte dans une base de données ; B. en prédisant, mot après mot, la suite la plus probable du texte ; C. en consultant systématiquement internet ; D. en appliquant des règles écrites par des juristes.</li>
<li><strong>Une « hallucination » est :</strong> A. une panne de l'outil ; B. un refus de répondre ; C. une image générée ; D. une réponse fausse présentée avec assurance.</li>
<li><strong>Pourquoi un assistant peut-il ignorer un changement récent de réglementation ?</strong> A. Parce qu'il est censuré ; B. parce que ses connaissances s'arrêtent à une date d'entraînement, sauf s'il consulte le web ; C. parce que la réglementation est secrète ; D. parce qu'il ne lit que l'anglais.</li>
<li><strong>Un outil « connecté au web » qui cite ses sources :</strong> A. ne se trompe jamais ; B. dispense de lire les sources ; C. permet de vérifier plus facilement, à condition d'ouvrir les sources ; D. est interdit en entreprise.</li>
<li><strong>Quel ensemble décrit une structure de prompt complète ?</strong> A. Rôle, contexte, tâche, format, contraintes ; B. titre, date, signature ; C. question, réponse, merci ; D. mot-clé, synonyme, traduction.</li>
<li><strong>La réponse obtenue est trop générale. Le meilleur réflexe :</strong> A. abandonner l'outil ; B. reposer exactement la même question ; C. préciser le contexte, le destinataire et le format attendu ; D. écrire en majuscules.</li>
<li><strong>Donner un exemple de ce que l'on attend dans le prompt sert à :</strong> A. allonger inutilement la demande ; B. contourner les règles de l'outil ; C. rien, l'IA l'ignore ; D. guider le ton, la forme et le niveau de détail.</li>
<li><strong>Un assistant personnalisé (instructions enregistrées) est utile pour :</strong> A. stocker les données clients ; B. remplacer la relecture ; C. réutiliser un cadre de travail récurrent sans tout réécrire ; D. publier automatiquement.</li>
<li><strong>Avant d'envoyer un mail rédigé avec l'IA, vous devez :</strong> A. vérifier les faits, les chiffres, le ton et les engagements pris ; B. ajouter « rédigé par IA » en objet ; C. l'envoyer à toute l'équipe ; D. rien si l'outil est payant.</li>
<li><strong>Pour résumer un long document, la bonne pratique est :</strong> A. faire confiance au résumé ; B. résumer le résumé ; C. vérifier que les points clés et les chiffres du résumé figurent bien dans le document ; D. supprimer le document.</li>
<li><strong>Une statistique précise apparaît dans un texte généré, sans source :</strong> A. on la garde si elle est plausible ; B. on l'arrondit ; C. on la met en gras ; D. on la supprime ou on la remplace par une donnée issue d'une source identifiée.</li>
<li><strong>Une publication sur un chantier client doit :</strong> A. ne pas permettre d'identifier le client sans son accord ; B. citer le nom du client pour la crédibilité ; C. contenir l'adresse exacte ; D. promettre un montant d'aide.</li>
<li><strong>La première étape pour intégrer l'IA dans son travail est :</strong> A. acheter tous les abonnements ; B. tout automatiser ; C. cartographier ses tâches et repérer celles qui sont répétitives ou rédactionnelles ; D. attendre une obligation légale.</li>
<li><strong>Dans un flux automatisé sans code, un point de contrôle humain sert à :</strong> A. éviter qu'une erreur ou un contenu non validé parte vers un client ; B. ralentir le processus ; C. remplacer la sauvegarde ; D. respecter un format de fichier.</li>
<li><strong>Pour mesurer le gain d'une automatisation :</strong> A. on se fie à l'impression ; B. on compte le nombre de prompts ; C. on demande à l'IA ; D. on relève le temps passé avant et après, sur une période définie, et on suit la qualité.</li>
<li><strong>Un assistant intégré à la messagerie et au traitement de texte de l'entreprise :</strong> A. s'utilise sans aucun paramétrage ; B. travaille dans l'environnement professionnel, selon les droits et paramètres définis par l'entreprise ; C. publie sur les réseaux sociaux ; D. n'a aucune limite.</li>
<li><strong>Saisir la liste nominative des clients dans un outil d'IA grand public non paramétré :</strong> A. est sans risque ; B. est obligatoire ; C. expose des données personnelles à un traitement non maîtrisé, contraire aux principes du RGPD ; D. est autorisé si on supprime ensuite la conversation.</li>
<li><strong>L'obligation de « maîtrise de l'IA » (article 4 du règlement européen sur l'IA) s'applique depuis :</strong> A. le 01/01/2024 ; B. le 02/02/2025 ; C. le 02/08/2027 ; D. elle n'existe pas.</li>
<li><strong>Un client échange avec un agent conversationnel sur votre site. Vous devez :</strong> A. ne rien dire ; B. lui faire signer un contrat ; C. lui interdire de poser des questions ; D. l'informer qu'il interagit avec une IA.</li>
<li><strong>Une charte d'usage de l'IA en entreprise sert à :</strong> A. fixer des règles claires (outils autorisés, données, vérification, transparence, responsabilités) ; B. interdire toute IA ; C. remplacer le règlement intérieur ; D. choisir le fournisseur le moins cher.</li>
</ol>
<h3>Corrigé</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Q</th><th>Réponse</th><th>Explication et compétence</th></tr>
<tr><td>1</td><td>B</td><td>Le modèle calcule la suite la plus probable à partir de ce qu'il a appris (C1).</td></tr>
<tr><td>2</td><td>D</td><td>L'hallucination est une réponse fausse mais fluide et assurée : d'où la vérification systématique (C1).</td></tr>
<tr><td>3</td><td>B</td><td>Date de connaissance : sans accès au web, le modèle ignore ce qui est postérieur à son entraînement (C1).</td></tr>
<tr><td>4</td><td>C</td><td>Les sources citées facilitent la vérification, à condition de les lire et d'en évaluer la fiabilité (C1).</td></tr>
<tr><td>5</td><td>A</td><td>Rôle, contexte, tâche, format, contraintes : la structure travaillée le jour 1 (C2).</td></tr>
<tr><td>6</td><td>C</td><td>On itère en précisant ce qui manque (C2).</td></tr>
<tr><td>7</td><td>D</td><td>L'exemple est l'un des leviers les plus efficaces pour obtenir le bon ton et le bon format (C2).</td></tr>
<tr><td>8</td><td>C</td><td>Les instructions enregistrées évitent de réécrire le cadre ; elles ne doivent pas contenir de données sensibles (C2).</td></tr>
<tr><td>9</td><td>A</td><td>L'auteur reste responsable du contenu envoyé (C3).</td></tr>
<tr><td>10</td><td>C</td><td>Un résumé peut omettre ou déformer : contrôle par sondage des points clés (C3).</td></tr>
<tr><td>11</td><td>D</td><td>Pas de chiffre sans source (C3).</td></tr>
<tr><td>12</td><td>A</td><td>Respect de la vie privée et du droit à l'image ; accord préalable indispensable (C3, C5).</td></tr>
<tr><td>13</td><td>C</td><td>Cartographier avant d'outiller (C4).</td></tr>
<tr><td>14</td><td>A</td><td>Le contrôle humain évite la diffusion d'erreurs (C4).</td></tr>
<tr><td>15</td><td>D</td><td>Mesure avant/après sur une période définie, quantité et qualité (C4).</td></tr>
<tr><td>16</td><td>B</td><td>L'assistant intégré respecte les droits d'accès de l'utilisateur : ce qui impose de bien gérer les partages de fichiers (C4).</td></tr>
<tr><td>17</td><td>C</td><td>Minimisation et sécurité des données ; absence de garanties contractuelles (C5).</td></tr>
<tr><td>18</td><td>B</td><td>Interdictions et obligation de maîtrise de l'IA applicables depuis le 02/02/2025 (C5).</td></tr>
<tr><td>19</td><td>D</td><td>Obligation de transparence prévue par le règlement européen sur l'IA, à partir du 02/08/2026 (C5).</td></tr>
<tr><td>20</td><td>A</td><td>La charte encadre l'usage sans l'interdire (C5).</td></tr>
</table>
<h3>Lecture des résultats</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Score global</th><th>Interprétation</th><th>Suite conseillée</th></tr>
<tr><td>17 à 20</td><td>Connaissances solides sur l'ensemble des compétences</td><td>Plan d'action orienté vers le déploiement et le partage avec l'équipe</td></tr>
<tr><td>13 à 16</td><td>Bonnes bases, une ou deux compétences à consolider</td><td>Reprendre les fiches mémo des compétences où au moins deux erreurs ont été commises</td></tr>
<tr><td>Moins de 13</td><td>Bases à consolider</td><td>Exercices d'entraînement du chapitre 8, accompagnement du manager et point avec le formateur à 30 jours</td></tr>
</table>
<blockquote><strong>Bonne pratique</strong> – Comparez votre score à celui du QCM de positionnement du jour 1, compétence par compétence. La progression compte autant que le score final : elle est reportée dans le bilan individuel et sert de base au questionnaire à froid.</blockquote>`,
      },
      {
        title: "7.7 – Révision synthétique : les fiches mémo C1 à C5",
        content: `<p>Les cinq fiches ci-dessous condensent l'essentiel de chaque compétence. Elles sont remises en fin de journée, au format papier et numérique, et constituent le support de révision à relire avant chaque étape du plan d'action.</p>
<h3>Fiche mémo C1 – Comprendre l'IA générative</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Notion</th><th>À retenir en une phrase</th></tr>
<tr><td>Intelligence artificielle</td><td>Ensemble de techniques permettant à une machine de réaliser des tâches qui semblent demander de l'intelligence (reconnaître, classer, prédire, produire).</td></tr>
<tr><td>Apprentissage automatique</td><td>La machine apprend des régularités à partir d'exemples au lieu de suivre des règles écrites à la main.</td></tr>
<tr><td>Grand modèle de langage</td><td>Modèle entraîné sur d'immenses volumes de textes pour prédire la suite la plus probable ; il produit du texte, il ne « sait » pas.</td></tr>
<tr><td>Token</td><td>Morceau de mot traité par le modèle ; la longueur des échanges se mesure en tokens.</td></tr>
<tr><td>Contexte</td><td>Ce que le modèle « voit » pendant l'échange (votre prompt, l'historique, les documents joints) ; au-delà de sa capacité, il oublie le début.</td></tr>
<tr><td>Hallucination</td><td>Réponse fausse mais assurée : chiffres, références, règles inventées.</td></tr>
<tr><td>Biais</td><td>Reproduction des déséquilibres présents dans les données d'entraînement (stéréotypes, point de vue dominant).</td></tr>
<tr><td>Date de connaissance</td><td>Le modèle ignore ce qui s'est passé après son entraînement, sauf s'il consulte le web.</td></tr>
<tr><td>Multimodal</td><td>Capacité à traiter texte, image, son ou document dans un même échange.</td></tr>
<tr><td>Panorama des outils</td><td>Assistants conversationnels (ChatGPT, Copilot, Gemini, Le Chat, Claude), recherche avec sources (Perplexity), création visuelle (fonctions IA de Canva), automatisation (Power Automate, Zapier, Make). Toujours vérifier conditions d'utilisation et paramètres de confidentialité.</td></tr>
</table>
<p><strong>Trois réflexes C1</strong> : 1) ce que l'IA écrit est une proposition, pas une vérité ; 2) plus l'enjeu est élevé (aides, prix, droit, sécurité), plus la vérification doit être forte ; 3) choisir l'outil selon le besoin et selon l'endroit où vont les données.</p>
<h3>Fiche mémo C2 – Rédiger des prompts efficaces</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Question à se poser</th><th>Exemple Thermia Rénov</th></tr>
<tr><td>Rôle</td><td>Quel expert doit répondre ?</td><td>« Tu es assistant commercial d'une PME de rénovation énergétique. »</td></tr>
<tr><td>Contexte</td><td>Que doit-il savoir pour bien répondre ?</td><td>Situation, destinataire, historique, enjeu</td></tr>
<tr><td>Tâche</td><td>Que doit-il produire exactement ?</td><td>« Rédige un projet de relance de devis. »</td></tr>
<tr><td>Format</td><td>Sous quelle forme ?</td><td>Objet + 120 mots, tableau, liste à puces, trois variantes</td></tr>
<tr><td>Contraintes</td><td>Que doit-il éviter ou respecter ?</td><td>Vouvoiement, pas de promesse de délai, pas de remise, éléments à compléter entre crochets</td></tr>
</table>
<p><strong>Techniques d'amélioration</strong> : donner un exemple ; demander de procéder par étapes ; faire poser des questions avant de répondre (« Avant de rédiger, pose-moi les questions dont tu as besoin ») ; demander une autocritique ; comparer deux versions ; reformuler pour un autre public ; enregistrer les meilleurs prompts dans une bibliothèque partagée ou dans un assistant personnalisé.</p>
<p><strong>Trois réflexes C2</strong> : 1) un prompt précis évite trois relances ; 2) on itère sur ce qui ne va pas, on ne repose pas la même question ; 3) jamais de donnée personnelle inutile dans un prompt.</p>
<h3>Fiche mémo C3 – Produire et vérifier</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type de contenu</th><th>Point de vigilance principal</th></tr>
<tr><td>Mail ou courrier client</td><td>Engagements (dates, prix, gestes) uniquement s'ils sont validés ; ton adapté ; mentions utiles</td></tr>
<tr><td>Compte rendu</td><td>Fidélité aux notes : rien d'ajouté, rien de perdu, conditionnel conservé</td></tr>
<tr><td>Synthèse de document</td><td>Contrôle des chiffres et des points clés dans le document source</td></tr>
<tr><td>FAQ, page web</td><td>Informations réglementaires et aides vérifiées sur sources officielles, datées</td></tr>
<tr><td>Publication sur les réseaux sociaux</td><td>Pas de donnée identifiante sans accord, pas de promesse, pas d'urgence artificielle</td></tr>
<tr><td>Visuel</td><td>Droits d'usage, absence de personne réelle reconnaissable sans accord, cohérence avec la charte graphique</td></tr>
<tr><td>Tableau, données</td><td>Formules et calculs recontrôlés sur un échantillon ; unités et périodes vérifiées</td></tr>
</table>
<p><strong>La méthode de vérification en quatre passages</strong> : 1) <em>faits</em> (noms, dates, références) ; 2) <em>chiffres</em> (montants, pourcentages, calculs) ; 3) <em>sources</em> (ouvertes, officielles, datées) ; 4) <em>ton et engagements</em> (ce que le texte promet au nom de l'entreprise).</p>
<h3>Fiche mémo C4 – Intégrer et automatiser</h3>
<ol>
<li><strong>Cartographier</strong> ses tâches sur une semaine : fréquence, durée, données manipulées, enjeu.</li>
<li><strong>Choisir</strong> : rédaction et reformulation → assistant ; tâches répétitives à données structurées → automatisation ; relation et décision → humain.</li>
<li><strong>Utiliser les outils déjà là</strong> : Copilot dans Outlook (résumés de fils, brouillons), Word (premier jet, reformulation), Excel (formules, analyses), Teams (transcription et compte rendu de réunion, avec information des participants).</li>
<li><strong>Automatiser simplement</strong> : déclencheur → étapes → contrôle humain → journal des erreurs (Power Automate, Zapier, Make).</li>
<li><strong>Mesurer</strong> : temps avant/après sur quatre semaines, qualité (erreurs, retours clients), satisfaction de l'équipe.</li>
</ol>
<p><strong>Trois réflexes C4</strong> : 1) commencer petit, sur une tâche fréquente et peu risquée ; 2) toujours un contrôle humain avant ce qui part chez le client ; 3) un gain non mesuré n'existe pas.</p>
<h3>Fiche mémo C5 – Responsabilité et conformité</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Thème</th><th>À retenir</th></tr>
<tr><td>RGPD</td><td>Minimiser les données, préférer des outils professionnels avec engagements contractuels, anonymiser, informer les personnes ; consulter les recommandations de la CNIL sur l'IA.</td></tr>
<tr><td>Confidentialité et secret des affaires</td><td>Prix, marges, devis, contrats, stratégie : jamais dans un outil non maîtrisé.</td></tr>
<tr><td>Règlement européen sur l'IA (UE) 2024/1689</td><td>Entré en vigueur le 01/08/2024 ; interdictions et obligation de maîtrise de l'IA (article 4) depuis le 02/02/2025 ; obligations des modèles d'IA à usage général depuis le 02/08/2025 ; transparence (article 50) et la plupart des autres obligations à partir du 02/08/2026. La Commission a proposé fin 2025 (« omnibus numérique ») de décaler certaines échéances relatives aux systèmes à haut risque : proposition dont il faut vérifier l'état d'avancement.</td></tr>
<tr><td>Droit d'auteur</td><td>Ne pas reproduire d'œuvre protégée ; vérifier les conditions d'usage commercial des outils ; tracer l'origine des visuels ; la protection des contenus générés sans apport humain est incertaine.</td></tr>
<tr><td>Transparence</td><td>Informer les clients lorsqu'ils échangent avec une IA ; ne jamais présenter un contenu généré comme un témoignage ou un avis réel.</td></tr>
<tr><td>Charte interne</td><td>Outils autorisés, données interdites, vérification, transparence, référent, registre des usages.</td></tr>
<tr><td>Impact environnemental</td><td>Les traitements consomment énergie et ressources : utiliser l'IA quand elle apporte un vrai gain, éviter les générations inutiles.</td></tr>
<tr><td>Éthique et biais</td><td>Relire avec un regard critique, notamment pour tout ce qui concerne des personnes (recrutement, évaluation, sélection).</td></tr>
</table>
<blockquote><strong>Bonne pratique</strong> – Affichez près de votre poste la ligne « Trois réflexes » de chaque fiche. Les quinze réflexes tiennent sur une demi-page et couvrent l'essentiel de ce qui protège l'entreprise et ses clients au quotidien.</blockquote>`,
      },
      {
        title: "7.8 – Autoévaluation et plan d'action individuel à 30, 60 et 90 jours",
        content: `<h3>L'autoévaluation</h3>
<p>Avant de recevoir le retour du formateur, chaque stagiaire se positionne lui-même. L'écart entre autoévaluation et évaluation est souvent riche d'enseignements : une personne qui se surestime sur C5 a besoin d'exemples concrets de risques ; une personne qui se sous-estime sur C2 a surtout besoin de pratiquer pour prendre confiance.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Je suis capable de…</th><th>Pas encore</th><th>Avec de l'aide</th><th>Seul(e)</th><th>Je peux l'expliquer à un collègue</th></tr>
<tr><td>Expliquer simplement comment fonctionne un assistant d'IA générative et pourquoi il peut se tromper (C1)</td><td> </td><td> </td><td> </td><td> </td></tr>
<tr><td>Choisir un type d'outil adapté à un besoin donné (C1)</td><td> </td><td> </td><td> </td><td> </td></tr>
<tr><td>Rédiger un prompt structuré rôle / contexte / tâche / format / contraintes (C2)</td><td> </td><td> </td><td> </td><td> </td></tr>
<tr><td>Améliorer une réponse en deux ou trois relances ciblées (C2)</td><td> </td><td> </td><td> </td><td> </td></tr>
<tr><td>Produire un mail, un compte rendu ou une publication exploitable (C3)</td><td> </td><td> </td><td> </td><td> </td></tr>
<tr><td>Vérifier faits, chiffres, sources et engagements avant envoi (C3)</td><td> </td><td> </td><td> </td><td> </td></tr>
<tr><td>Repérer dans mon travail les tâches où l'IA ou l'automatisation font gagner du temps (C4)</td><td> </td><td> </td><td> </td><td> </td></tr>
<tr><td>Décrire une automatisation simple avec un contrôle humain (C4)</td><td> </td><td> </td><td> </td><td> </td></tr>
<tr><td>Identifier les données que je ne dois pas saisir et anonymiser (C5)</td><td> </td><td> </td><td> </td><td> </td></tr>
<tr><td>Expliquer les grandes obligations du RGPD et du règlement européen sur l'IA qui me concernent (C5)</td><td> </td><td> </td><td> </td><td> </td></tr>
</table>
<p>Trois questions ouvertes complètent la grille : <em>Quel usage de l'IA vais-je mettre en place dès la semaine prochaine ? Qu'est-ce qui pourrait m'en empêcher ? De qui ai-je besoin ?</em></p>
<h3>Le retour individuel du formateur</h3>
<p>En cinq minutes par stagiaire, le formateur restitue la fiche de synthèse : niveau par compétence, deux points forts appuyés sur des faits observés, un ou deux axes de progrès formulés comme des actions (« anonymiser systématiquement avant saisie », « conserver le conditionnel des notes de chantier »). Il valide ensuite avec le stagiaire les priorités du plan d'action.</p>
<h3>Le plan d'action individuel</h3>
<p>Le plan d'action transforme la formation en changements visibles dans le travail. Il est construit selon la règle « peu d'actions, précises, mesurables ». Il est rédigé par le stagiaire, relu par le formateur et, avec l'accord du stagiaire, transmis à son responsable pour le suivi.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Échéance</th><th>Objectif</th><th>Actions concrètes</th><th>Indicateur</th><th>Appui</th></tr>
<tr><td>30 jours</td><td>Installer un premier usage régulier</td><td>Paramétrer son outil professionnel (confidentialité, historique) ; utiliser l'IA pour un type de tâche précis au moins trois fois par semaine ; créer ses cinq premiers prompts réutilisables</td><td>Nombre d'utilisations notées ; cinq prompts enregistrés</td><td>Fiches mémo C1 à C3, bibliothèque du chapitre 8</td></tr>
<tr><td>60 jours</td><td>Fiabiliser et mesurer</td><td>Appliquer la check-list de vérification avant envoi à chaque contenu ; mesurer le temps passé avant/après sur une tâche ; partager un retour d'expérience en réunion d'équipe</td><td>Temps gagné estimé par semaine ; zéro contenu envoyé sans relecture</td><td>Check-lists du chapitre 8, manager</td></tr>
<tr><td>90 jours</td><td>Étendre et encadrer</td><td>Mettre en place une automatisation simple avec contrôle humain, ou un assistant personnalisé ; contribuer au registre des usages et à la charte</td><td>Une automatisation ou un assistant en service ; inscription au registre</td><td>Référent IA, modèles de charte et de registre du chapitre 8</td></tr>
</table>
<h3>Exemple : le plan d'action de Julie (fictif)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Échéance</th><th>Actions</th><th>Indicateur</th></tr>
<tr><td>30 jours</td><td>Utiliser Copilot dans Outlook pour les premiers jets de réponses récurrentes ; enregistrer les modèles « accusé de réception », « relance de pièces manquantes », « confirmation de rendez-vous »</td><td>Trois modèles enregistrés ; usage quotidien</td></tr>
<tr><td>60 jours</td><td>Mettre en forme les comptes rendus de Thomas avec l'IA, en appliquant la vérification de fidélité ; relever le temps passé</td><td>Temps par compte rendu (objectif : passer de 20 à environ 10 minutes, à vérifier par la mesure)</td></tr>
<tr><td>90 jours</td><td>Déployer avec la direction l'automatisation « demande de devis → tableau de suivi → accusé de réception → rappel à J+10 »</td><td>Flux en service, contrôle quotidien, journal des anomalies</td></tr>
</table>
<h3>Le suivi après la formation</h3>
<p>Le stagiaire fait le point sur son plan d'action avec son responsable à chaque échéance. Le questionnaire à froid (section 7.9), envoyé environ trois mois après la fin de la session, reprend explicitement les actions prévues afin de mesurer le transfert en situation de travail.</p>
<blockquote><strong>Bonne pratique</strong> – Inscrivez dès aujourd'hui dans votre agenda trois rendez-vous avec vous-même, à 30, 60 et 90 jours, avec le lien vers votre plan d'action. Un plan sans date de revue reste une intention.</blockquote>`,
      },
      {
        title: "7.9 – Satisfaction à chaud et à froid, attestation de fin de formation et clôture",
        content: `<h3>Le questionnaire de satisfaction à chaud</h3>
<p>Rempli en fin de journée, avant le départ, il recueille l'appréciation immédiate des stagiaires. Il est anonyme si le stagiaire le souhaite et prend environ cinq minutes.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Échelle ou forme de réponse</th></tr>
<tr><td>Les objectifs annoncés ont-ils été atteints ?</td><td>1 (pas du tout) à 5 (totalement)</td></tr>
<tr><td>Le contenu correspond-il à vos besoins professionnels ?</td><td>1 à 5</td></tr>
<tr><td>Les exemples et le cas Thermia Rénov étaient-ils proches de votre réalité ?</td><td>1 à 5</td></tr>
<tr><td>L'équilibre entre apports et pratique sur poste était-il adapté ?</td><td>1 à 5</td></tr>
<tr><td>La durée (21 heures sur trois jours) était-elle adaptée ?</td><td>Trop courte / adaptée / trop longue</td></tr>
<tr><td>Comment évaluez-vous l'animation du formateur ?</td><td>1 à 5</td></tr>
<tr><td>Les conditions matérielles (salle, postes, connexion) étaient-elles satisfaisantes ?</td><td>1 à 5</td></tr>
<tr><td>Vous sentez-vous capable d'utiliser l'IA de façon sûre dans votre travail ?</td><td>1 à 5</td></tr>
<tr><td>Recommanderiez-vous cette formation à un collègue ?</td><td>Oui / non / peut-être</td></tr>
<tr><td>Ce que vous avez le plus apprécié ; ce qui pourrait être amélioré</td><td>Texte libre</td></tr>
</table>
<h3>Le questionnaire à froid</h3>
<p>Envoyé environ trois mois après la session, il mesure ce que la formation a réellement changé dans le travail. Un questionnaire court, adressé au stagiaire et, si l'entreprise le souhaite, à son responsable, obtient de meilleurs taux de réponse.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question au stagiaire</th><th>Forme</th></tr>
<tr><td>Utilisez-vous un outil d'IA dans votre travail ? À quelle fréquence ?</td><td>Jamais / mensuelle / hebdomadaire / quotidienne</td></tr>
<tr><td>Pour quelles tâches ?</td><td>Choix multiples (mails, comptes rendus, synthèses, publications, visuels, tableaux, veille, automatisation, autre)</td></tr>
<tr><td>Quelles actions de votre plan à 30, 60 et 90 jours avez-vous réalisées ?</td><td>Réalisée / en cours / abandonnée, avec motif</td></tr>
<tr><td>Estimez-vous gagner du temps ? Combien par semaine, approximativement ?</td><td>Fourchettes</td></tr>
<tr><td>Appliquez-vous la vérification avant envoi et les règles de confidentialité ?</td><td>Toujours / souvent / rarement</td></tr>
<tr><td>Une charte d'usage de l'IA existe-t-elle désormais dans votre entreprise ?</td><td>Oui / en cours / non</td></tr>
<tr><td>Quels besoins complémentaires identifiez-vous ?</td><td>Texte libre</td></tr>
</table>
<p>Les résultats à chaud et à froid sont analysés par l'organisme de formation, partagés avec le formateur et utilisés pour améliorer le programme, les exemples et les supports. Les réclamations éventuelles suivent la procédure de l'organisme, communiquée dans le livret d'accueil.</p>
<h3>L'attestation de fin de formation</h3>
<p>À l'issue de la formation, l'organisme remet à chaque stagiaire une <strong>attestation de fin de formation</strong> mentionnant les objectifs, la nature et la durée de l'action ainsi que les résultats de l'évaluation des acquis (article L. 6353-1 du code du travail). Cette action de formation ne conduit à aucun diplôme ni titre : l'attestation atteste de la participation et des acquis évalués, compétence par compétence.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique de l'attestation</th><th>Contenu</th></tr>
<tr><td>Organisme de formation</td><td>Raison sociale, adresse, numéro de déclaration d'activité</td></tr>
<tr><td>Stagiaire</td><td>Nom, prénom, entreprise</td></tr>
<tr><td>Intitulé</td><td>« Intelligence artificielle : intégrer les outils d'IA dans son activité professionnelle – 21 h »</td></tr>
<tr><td>Nature de l'action</td><td>Action de formation professionnelle continue (article L. 6313-1 du code du travail)</td></tr>
<tr><td>Dates, durée et modalité</td><td>Du [date de début] au [date de fin], 21 heures, en présentiel ; durée effectivement suivie d'après les feuilles d'émargement</td></tr>
<tr><td>Objectifs</td><td>Les cinq compétences C1 à C5</td></tr>
<tr><td>Résultats de l'évaluation des acquis</td><td>Pour chaque compétence : acquise / en cours d'acquisition / non acquise</td></tr>
<tr><td>Fait à, le, signature</td><td>Responsable de l'organisme de formation</td></tr>
</table>
<h3>La clôture administrative de la session</h3>
<ol>
<li>Vérifier que les feuilles d'émargement des six demi-journées sont complètes et signées par les stagiaires et le formateur ; signaler toute absence.</li>
<li>Archiver les productions de l'évaluation finale, les grilles d'observation, les QCM de positionnement et de fin, les autoévaluations et les plans d'action.</li>
<li>Remettre ou transmettre les attestations de fin de formation ; adresser à l'entreprise les documents nécessaires à la prise en charge éventuelle par son opérateur de compétences, selon ses critères.</li>
<li>Saisir les résultats de satisfaction à chaud ; programmer l'envoi du questionnaire à froid.</li>
<li>Rédiger le bilan de session du formateur : points forts, difficultés, adaptations réalisées, propositions d'amélioration.</li>
</ol>
<blockquote><strong>Bonne pratique</strong> – Ne quittez pas la salle sans avoir vérifié trois choses : la feuille d'émargement de la demi-journée est signée, votre plan d'action est enregistré là où vous le retrouverez, et vous savez à qui vous adresser en cas de question après la formation.</blockquote>`,
      },
    ],
  },
  {
    title: "Chapitre 8 – Boîte à outils et ressources",
    description:
      "Ressources de référence utilisées pendant les trois jours et à conserver après la formation (elles ne s'ajoutent pas aux 21 heures). Bibliothèque de 42 prompts commentés classés par métier (dirigeant, commercial, assistant(e) administratif(ve), conducteur de travaux, communication), modèles prêts à adapter (charte d'usage de l'IA, registre des usages, check-list de vérification avant envoi, check-list confidentialité), glossaire de plus de 50 termes, ressources officielles (CNIL, Commission européenne, Légifrance, service-public, ANSSI) et exercices d'entraînement supplémentaires corrigés.",
    sections: [
      {
        title: "8.1 – Mode d'emploi de la bibliothèque et prompts du dirigeant",
        content: `<h3>Comment utiliser cette bibliothèque</h3>
<p>Les prompts qui suivent ont été construits et testés pendant la formation sur le cas <strong>Thermia Rénov</strong> (entreprise fictive). Ce sont des <strong>points de départ</strong>, pas des formules magiques : ils donnent de bons résultats parce qu'ils respectent la structure rôle / contexte / tâche / format / contraintes vue en C2, mais ils doivent être adaptés à votre situation.</p>
<ul>
<li><strong>Les crochets</strong> [ ] signalent ce que vous devez remplacer. Ne remplacez jamais un crochet par une donnée personnelle de client si vous travaillez dans un outil grand public : utilisez « le client », « la cliente », « [Client A] ».</li>
<li><strong>Les commentaires</strong> expliquent pourquoi le prompt fonctionne et ce qu'il faut vérifier dans la réponse.</li>
<li><strong>L'outil</strong> : sauf mention contraire, les prompts fonctionnent dans tous les assistants conversationnels présentés (ChatGPT, Microsoft Copilot, Google Gemini, Le Chat de Mistral AI, Claude). Les prompts de veille fonctionnent mieux avec un outil qui cite ses sources (Perplexity ou mode recherche d'un assistant).</li>
<li><strong>La relance</strong> : si la première réponse ne convient pas, utilisez l'une des relances génériques ci-dessous plutôt que de tout réécrire.</li>
</ul>
<h3>Cinq relances génériques à garder sous la main</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Relance</th></tr>
<tr><td>Réponse trop longue ou trop vague</td><td>« Réduis de moitié et garde uniquement ce qui est utile pour [destinataire]. »</td></tr>
<tr><td>Ton inadapté</td><td>« Reprends avec un ton [plus chaleureux / plus ferme / plus neutre], sans formule toute faite. »</td></tr>
<tr><td>Doute sur la qualité</td><td>« Relis ta réponse de manière critique : liste ses faiblesses, les affirmations à vérifier, puis propose une version corrigée. »</td></tr>
<tr><td>Manque d'information</td><td>« Avant de répondre, pose-moi les questions dont tu as besoin pour faire un travail précis. »</td></tr>
<tr><td>Besoin de choisir</td><td>« Propose trois versions différentes, puis indique laquelle tu recommandes et pourquoi. »</td></tr>
</table>
<h3>Prompts du dirigeant (P01 à P08)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Usage</th><th>Prompt</th><th>Commentaire</th></tr>
<tr><td>P01</td><td>Préparer une réunion d'équipe</td><td>« Tu es conseiller en organisation d'une PME du bâtiment de 14 salariés. Voici les points remontés cette semaine : [liste anonymisée]. Propose un ordre du jour de réunion de 45 minutes, avec pour chaque point l'objectif (informer, décider, résoudre), la durée et la personne qui l'introduit. Termine par trois questions à poser à l'équipe. »</td><td>Le classement informer / décider / résoudre évite les réunions qui débattent de tout. Vérifier que la durée totale tient dans le temps prévu.</td></tr>
<tr><td>P02</td><td>Analyser une offre de fournisseur</td><td>« Tu es acheteur expérimenté. Je colle ci-dessous les conditions commerciales d'un fournisseur, sans son nom. Résume en dix lignes : prix, délais, pénalités, garanties, conditions de résiliation. Liste ensuite les clauses qui me paraissent défavorables et les questions à poser avant de signer. Ne donne pas d'avis juridique définitif. »</td><td>Retirer le nom et les coordonnées du fournisseur si l'outil n'est pas professionnel. L'IA aide à lire, pas à décider : pour un enjeu important, consulter un conseil.</td></tr>
<tr><td>P03</td><td>Rédiger une note de cadrage</td><td>« Aide-moi à rédiger une note de cadrage d'une page pour le projet suivant : [objectif]. Structure : contexte, objectif mesurable, périmètre (inclus / exclu), étapes, responsables, risques, indicateurs. Pose-moi d'abord les cinq questions indispensables. »</td><td>La demande de questions préalables évite une note générique. Réutilisable pour tout projet interne.</td></tr>
<tr><td>P04</td><td>Préparer un entretien annuel</td><td>« Tu es responsable des ressources humaines d'une PME. Propose une trame d'entretien annuel pour un poste de [fonction], avec des questions ouvertes sur le bilan de l'année, les compétences, la formation et les souhaits d'évolution. Le ton doit être bienveillant et factuel. Ne propose aucune notation automatique. »</td><td>Aucune donnée sur le salarié n'est saisie. L'IA ne doit jamais évaluer une personne à la place du manager (enjeu de biais et d'éthique).</td></tr>
<tr><td>P05</td><td>Simuler un rendez-vous difficile</td><td>« Joue le rôle d'un banquier prudent à qui je présente une demande de financement d'un véhicule utilitaire pour mon entreprise. Pose-moi une question à la fois, relance si ma réponse est floue, puis donne-moi à la fin trois conseils pour mieux présenter mon dossier. »</td><td>Le jeu de rôle prépare aux objections. Ne pas saisir de chiffres confidentiels réels dans un outil grand public : utiliser des ordres de grandeur.</td></tr>
<tr><td>P06</td><td>Comparer des options</td><td>« Je dois choisir entre trois options pour [décision]. Option A : [description], option B : [description], option C : [description]. Construis un tableau avec critères (coût, délai, risques, impact sur l'équipe, réversibilité), note chaque option de 1 à 5 en justifiant, puis indique les informations qui manquent pour décider. »</td><td>La dernière consigne est essentielle : elle fait apparaître les angles morts. La décision reste celle du dirigeant.</td></tr>
<tr><td>P07</td><td>Préparer la charte d'usage de l'IA</td><td>« Tu es juriste spécialisé dans le numérique. Propose le plan d'une charte d'usage de l'IA générative pour une PME de 14 salariés de la rénovation énergétique, couvrant : outils autorisés, données interdites, vérification, transparence envers les clients, droit d'auteur, rôle du référent, sanctions, mise à jour. Pour chaque rubrique, propose deux règles concrètes. Signale les points à faire valider par un professionnel du droit. »</td><td>À compléter avec le modèle de charte de la section 8.6. Une charte opposable aux salariés suit les règles applicables (par exemple une annexe au règlement intérieur) : à vérifier avec un conseil.</td></tr>
<tr><td>P08</td><td>Faire de la veille réglementaire</td><td>« Recherche les évolutions récentes concernant [sujet : par exemple les aides à la rénovation énergétique des particuliers]. Cite uniquement des sources officielles (sites publics, Journal officiel, Légifrance, sites ministériels) avec leur date. Présente un tableau : date, évolution, source, impact possible pour une PME de travaux. Indique clairement ce que tu n'as pas pu vérifier. »</td><td>À utiliser avec un outil qui cite ses sources. Ouvrir chaque lien, vérifier la date et le texte : un résumé de source peut être inexact.</td></tr>
</table>
<blockquote><strong>Bonne pratique</strong> – Enregistrez vos prompts favoris, adaptés à votre entreprise, dans un document partagé ou dans un assistant personnalisé, avec la date de dernière modification et le nom de leur auteur. Une bibliothèque vivante, relue chaque trimestre, vaut mieux qu'une liste figée.</blockquote>`,
      },
      {
        title: "8.2 – Prompts du commercial",
        content: `<p>Ces prompts accompagnent le cycle de vente : préparation, découverte, proposition, relance, objections, suivi. Rappel essentiel : <strong>aucun montant d'aide, délai ou prix ne doit être communiqué au client sur la seule base d'une réponse de l'IA</strong>.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Usage</th><th>Prompt</th><th>Commentaire</th></tr>
<tr><td>P09</td><td>Préparer un rendez-vous de découverte</td><td>« Tu es commercial expérimenté en rénovation énergétique. Je rencontre un particulier propriétaire d'une maison des années [décennie], chauffée au [énergie], qui veut [objectif exprimé]. Prépare une liste de douze questions ouvertes pour comprendre son logement, ses usages, son budget, ses contraintes et ses décideurs, classées par thème. »</td><td>Aucune donnée identifiante. La liste sert de guide, pas de questionnaire à dérouler mécaniquement.</td></tr>
<tr><td>P10</td><td>Synthétiser un rendez-vous</td><td>« Voici mes notes de rendez-vous, anonymisées : [notes]. Rédige une synthèse structurée : situation, besoins exprimés, contraintes, décideurs, prochaines étapes. Signale les informations manquantes au lieu de les supposer. »</td><td>La dernière phrase limite les hallucinations. Relire en comparant aux notes.</td></tr>
<tr><td>P11</td><td>Mail de suite de rendez-vous</td><td>« Rédige un mail de suite de rendez-vous à un prospect particulier : remerciement, rappel de ses trois besoins principaux [liste], prochaines étapes [étapes], pièces à préparer [liste]. 150 mots maximum, vouvoiement, ton chaleureux et professionnel. Aucune promesse de délai ni de montant d'aide. »</td><td>Les contraintes négatives sont aussi importantes que les consignes positives.</td></tr>
<tr><td>P12</td><td>Relance de devis</td><td>« Propose trois versions d'un mail de relance pour un devis envoyé il y a [nombre] jours : une version courte, une version qui rappelle la valeur du projet pour le client, une version qui propose un échange téléphonique. Pas de pression, pas de fausse urgence, pas de remise. »</td><td>Choisir et personnaliser une version. Les trois variantes aident à trouver le bon ton selon le client.</td></tr>
<tr><td>P13</td><td>Traiter une objection</td><td>« Un client me dit : "[objection, par exemple : c'est trop cher par rapport à un autre devis]". Propose une méthode de traitement en quatre temps (écouter, reformuler, répondre, vérifier) avec des exemples de phrases, en restant honnête : pas de dénigrement du concurrent, pas d'argument non vérifiable. »</td><td>L'IA propose des formulations ; le commercial vérifie que chaque argument correspond à la réalité de l'offre.</td></tr>
<tr><td>P14</td><td>Expliquer simplement une solution technique</td><td>« Explique à un particulier sans connaissance technique, en 120 mots, le principe de [solution, par exemple : une pompe à chaleur air/eau], ses avantages et ses contraintes (entretien, bruit de l'unité extérieure, place nécessaire). Utilise une comparaison du quotidien. Ne donne aucun chiffre de performance. »</td><td>Interdire les chiffres évite les performances inventées. Les chiffres réels viennent de la fiche technique du fabricant.</td></tr>
<tr><td>P15</td><td>Préparer un argumentaire</td><td>« À partir des caractéristiques suivantes de notre offre [liste réelle], construis un tableau caractéristique / avantage / bénéfice pour le client / preuve disponible. Laisse la colonne preuve vide si tu n'en connais pas. »</td><td>La colonne preuve oblige à distinguer argument vérifié et argument supposé.</td></tr>
<tr><td>P16</td><td>Jeu de rôle d'entraînement</td><td>« Joue le rôle d'un client hésitant qui a déjà reçu deux devis pour [travaux]. Pose-moi des objections réalistes, une à la fois. À la fin, évalue ma façon de répondre selon trois critères : écoute, clarté, honnêteté. »</td><td>Excellent entraînement entre deux rendez-vous. L'évaluation de l'IA est indicative.</td></tr>
<tr><td>P17</td><td>Analyser son portefeuille</td><td>« Voici un tableau anonymisé de mes devis du trimestre (colonnes : référence, type de travaux, montant, date, statut). Calcule le taux de signature par type de travaux et le délai moyen entre envoi et signature, puis propose trois pistes d'amélioration. Montre tes calculs. »</td><td>« Montre tes calculs » permet de contrôler. Dans Excel, Copilot peut produire les mêmes analyses directement dans le fichier.</td></tr>
</table>
<blockquote><strong>Bonne pratique</strong> – Gardez une colonne « vérifié par » dans vos modèles d'argumentaire : chaque affirmation technique ou financière doit renvoyer à une fiche fabricant, à un texte officiel ou à une donnée interne, jamais à une simple réponse de l'IA.</blockquote>`,
      },
      {
        title: "8.3 – Prompts de l'assistant(e) administratif(ve)",
        content: `<p>Les tâches administratives se prêtent particulièrement bien à l'IA (rédaction répétitive, mise en forme, synthèse) et à l'automatisation. Elles manipulent aussi beaucoup de données personnelles : la règle d'anonymisation s'applique à chaque prompt.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Usage</th><th>Prompt</th><th>Commentaire</th></tr>
<tr><td>P18</td><td>Créer des modèles de mails</td><td>« Rédige cinq modèles de mails courts pour une PME de travaux : accusé de réception d'une demande de devis, demande de pièces manquantes, confirmation de rendez-vous, report de rendez-vous, remerciement après chantier. Pour chacun : objet, corps de 60 à 90 mots, champs variables entre crochets. »</td><td>Une fois validés par la direction, ces modèles peuvent alimenter une automatisation ou des modèles Outlook.</td></tr>
<tr><td>P19</td><td>Reformuler un courrier</td><td>« Reformule ce courrier pour qu'il soit plus clair et plus court, sans changer son sens ni ses engagements : [texte anonymisé]. Signale toute phrase ambiguë. »</td><td>« Sans changer ses engagements » protège contre les glissements de sens. Comparer ligne à ligne.</td></tr>
<tr><td>P20</td><td>Mettre en forme un compte rendu dicté</td><td>« Voici la transcription d'une note dictée par un conducteur de travaux : [texte, sans nom de client]. Mets-la en forme en compte rendu : date, participants (fonctions), constats, réserves, actions avec responsable et échéance. N'ajoute rien qui ne soit pas dans la note ; signale les informations manquantes entre crochets. »</td><td>Le prompt utilisé lors de l'évaluation finale. Vérifier en priorité dates, conditions et responsables.</td></tr>
<tr><td>P21</td><td>Construire une liste de contrôle</td><td>« Construis une liste de contrôle pour vérifier la complétude d'un dossier de [type de dossier] à partir de la liste officielle des pièces que je te colle : [liste copiée de la source officielle]. Présente-la sous forme de cases à cocher, avec une colonne observation. »</td><td>On fournit la liste officielle à l'IA plutôt que de lui demander de la deviner : la source reste maîtrisée.</td></tr>
<tr><td>P22</td><td>Écrire une formule de tableur</td><td>« Dans Excel, la colonne B contient des dates d'envoi de devis et la colonne C le statut ("signé", "en attente", "perdu"). Écris une formule qui affiche "À relancer" en colonne D si le devis est en attente depuis plus de 10 jours, sinon rien. Explique la formule pas à pas. »</td><td>Tester la formule sur quelques lignes dont on connaît le résultat attendu. Copilot dans Excel peut l'insérer directement.</td></tr>
<tr><td>P23</td><td>Résumer un long fil de mails</td><td>« Résume ce fil de mails en cinq points : demande initiale, réponses apportées, points en suspens, décisions prises, prochaine action et responsable. [fil anonymisé] »</td><td>Dans Outlook, Copilot réalise ce résumé sans copier-coller. Vérifier les décisions dans le fil original.</td></tr>
<tr><td>P24</td><td>Préparer un planning</td><td>« Voici les contraintes de la semaine : [rendez-vous, disponibilités, déplacements]. Propose un planning du lundi au vendredi sous forme de tableau, en signalant les conflits et les journées surchargées. »</td><td>L'IA est utile pour faire apparaître les conflits ; l'arbitrage reste humain.</td></tr>
<tr><td>P25</td><td>Rédiger une procédure interne</td><td>« Rédige une procédure interne d'une page pour [tâche, par exemple : l'enregistrement d'une réclamation client] : objectif, déclencheur, étapes numérotées, responsable de chaque étape, délai, document à archiver. Langage simple, phrases courtes. »</td><td>Base utile pour la qualité interne ; faire valider par les personnes qui réalisent la tâche.</td></tr>
<tr><td>P26</td><td>Préparer une réponse délicate</td><td>« Un client conteste une facture pour le motif suivant : [motif, sans données personnelles]. Rédige une réponse courtoise et factuelle qui accuse réception, indique que la demande est étudiée et précise le délai de réponse [délai validé]. Ne reconnais aucune erreur et ne propose aucun avoir à ce stade. »</td><td>Les décisions (avoir, geste commercial) appartiennent à la direction ; l'IA prépare seulement la forme.</td></tr>
</table>
<blockquote><strong>Bonne pratique</strong> – Pour les tâches administratives répétitives, travaillez en deux temps : l'IA vous aide une fois à concevoir un excellent modèle, puis vous réutilisez ce modèle validé, sans repasser par l'IA ni lui confier les données réelles. Gain de temps maximal, risque minimal.</blockquote>`,
      },
      {
        title: "8.4 – Prompts du conducteur de travaux",
        content: `<p>Le conducteur de travaux produit beaucoup d'écrits sous contrainte de temps : comptes rendus, plannings, consignes, échanges avec les fournisseurs et les sous-traitants. L'IA l'aide à structurer et à formuler ; <strong>elle ne remplace jamais les règles de l'art, les notices des fabricants ni les règles de sécurité</strong>.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Usage</th><th>Prompt</th><th>Commentaire</th></tr>
<tr><td>P27</td><td>Compte rendu de chantier à partir d'une dictée</td><td>« Tu es conducteur de travaux. À partir de cette dictée [texte sans nom ni adresse du client], rédige un compte rendu de visite : constats, réserves numérotées, actions (qui, quoi, quand), points à confirmer. Garde au conditionnel tout ce qui n'est pas confirmé. »</td><td>La consigne sur le conditionnel évite qu'une date « possible » devienne une date « confirmée » auprès du client.</td></tr>
<tr><td>P28</td><td>Préparer un planning de chantier</td><td>« Propose un planning prévisionnel sous forme de tableau pour un chantier comprenant [lots et durées estimées par l'équipe]. Respecte les enchaînements suivants : [contraintes]. Indique le chemin critique et les points d'attente (livraisons, validations). »</td><td>Les durées viennent de l'équipe, pas de l'IA. L'outil aide à ordonner et à repérer les dépendances.</td></tr>
<tr><td>P29</td><td>Mail à un fournisseur en retard</td><td>« Rédige un mail ferme et courtois à un fournisseur dont la livraison prévue le [date] n'est pas arrivée. Rappelle la commande [référence interne], l'impact sur le chantier, demande une date ferme sous 48 heures et une solution de remplacement si besoin. 120 mots. »</td><td>Vérifier les références et les conditions contractuelles avant envoi ; ne pas évoquer de pénalités non prévues au contrat.</td></tr>
<tr><td>P30</td><td>Consigne pour une équipe de pose</td><td>« Rédige une fiche consigne d'une page pour l'équipe de pose d'un chantier de [type de travaux] : horaires, accès, protections à mettre en place chez le client, points de vigilance, contacts, gestion des déchets. Style direct, liste à puces. Les règles de sécurité seront ajoutées à partir de notre document unique. »</td><td>Les règles de sécurité ne doivent pas être inventées par l'IA : elles viennent du document unique d'évaluation des risques et des consignes de l'entreprise.</td></tr>
<tr><td>P31</td><td>Expliquer un décalage au client</td><td>« Rédige un message court pour informer un client particulier qu'une étape de son chantier est décalée en raison de [cause]. Explique, rassure sans promettre, indique la prochaine étape et la personne à contacter. 80 à 100 mots. »</td><td>Réutilise l'apprentissage de la tâche 2 de l'évaluation finale. Faire relire par le commercial si un engagement a été pris à la signature.</td></tr>
<tr><td>P32</td><td>Lister les réserves de réception</td><td>« À partir de ces observations de fin de chantier [liste], rédige une liste de réserves claire et numérotée, chacune avec : localisation, description objective, action corrective, délai proposé. Aucun jugement de valeur. »</td><td>La formulation objective facilite l'accord avec le client. Les délais proposés sont validés par l'entreprise.</td></tr>
<tr><td>P33</td><td>Analyser les retours de chantier</td><td>« Voici les réserves et incidents relevés sur nos dix derniers chantiers, anonymisés : [liste]. Regroupe-les par cause (approvisionnement, coordination, exécution, information client), indique les plus fréquents et propose trois actions préventives. »</td><td>Exploitation utile pour l'amélioration continue. Vérifier que le regroupement correspond à la réalité vécue par l'équipe.</td></tr>
<tr><td>P34</td><td>Préparer une réunion de chantier</td><td>« Prépare l'ordre du jour d'une réunion de chantier avec [intervenants, par fonction] : avancement par lot, points bloquants [liste], décisions attendues, sécurité, prochaines échéances. Ajoute un tableau vide de suivi des actions. »</td><td>Avec Teams, la transcription et le résumé de la réunion peuvent ensuite être produits par Copilot, après information des participants.</td></tr>
</table>
<blockquote><strong>Bonne pratique</strong> – Pour un compte rendu, faites toujours le test des « trois points » : relisez la version de l'IA en cherchant une date, un engagement et une quantité. Si l'un d'eux diffère de vos notes, corrigez avant tout envoi.</blockquote>`,
      },
      {
        title: "8.5 – Prompts de la communication",
        content: `<p>Publications, newsletters, pages du site, visuels : l'IA accélère la production, mais la communication engage l'image de l'entreprise et est encadrée (pratiques commerciales, droit à l'image, droit d'auteur, transparence). Les prompts ci-dessous intègrent ces contraintes.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Usage</th><th>Prompt</th><th>Commentaire</th></tr>
<tr><td>P35</td><td>Calendrier éditorial</td><td>« Tu es chargé de communication d'une PME de rénovation énergétique. Propose un calendrier éditorial de huit semaines pour le réseau social professionnel de l'entreprise : une publication par semaine, alternant conseils pratiques, coulisses de l'équipe, chantiers terminés (sans identifier les clients) et informations utiles. Pour chaque semaine : thème, accroche, visuel suggéré. »</td><td>Un plan d'ensemble évite les publications improvisées. Adapter aux saisons et à l'actualité vérifiée.</td></tr>
<tr><td>P36</td><td>Rédiger une publication</td><td>« Rédige une publication de 100 à 150 mots sur [thème]. Ton professionnel et accessible, une seule idée forte, un appel à l'action sobre. Pas de chiffre sans source, pas de promesse d'économies, pas d'urgence artificielle, pas plus de deux émojis. »</td><td>Contraintes reprises de la tâche 3 de l'évaluation. On peut aussi interdire tout émoji selon la charte de l'entreprise.</td></tr>
<tr><td>P37</td><td>Décliner un contenu sur plusieurs supports</td><td>« À partir de ce texte validé [texte], propose : une version courte pour le réseau social professionnel, une version pour la newsletter (200 mots), un encadré pour le site (80 mots). Ne change aucune information. »</td><td>Une seule validation de fond, plusieurs formats. Vérifier que les versions courtes n'ont pas simplifié jusqu'à l'erreur.</td></tr>
<tr><td>P38</td><td>Visuel avec un outil de création</td><td>« Crée un visuel carré pour une publication sur l'isolation des combles : photo d'illustration d'un isolant en place dans des combles, sans personne reconnaissable, couleurs [codes de la charte], texte court "[accroche]" lisible sur mobile. »</td><td>Dans Canva, utiliser le kit de marque. Vérifier les conditions d'usage commercial des images générées et la lisibilité du texte.</td></tr>
<tr><td>P39</td><td>Rédiger une FAQ</td><td>« Rédige une FAQ de huit questions que se posent les particuliers avant des travaux de [type]. Réponses de 50 mots maximum. Pour toute question portant sur les aides, la réglementation ou les délais, rédige une réponse générale qui renvoie aux sources officielles, sans montant ni condition précise. »</td><td>La FAQ est relue par un commercial et par la direction. Indiquer la date de mise à jour sur la page.</td></tr>
<tr><td>P40</td><td>Améliorer une page du site</td><td>« Voici le texte de notre page [nom de la page]. Propose une version plus claire et mieux structurée (titres, paragraphes courts), adaptée à une lecture sur mobile. Liste séparément les affirmations qui devraient être justifiées ou supprimées. »</td><td>La liste séparée des affirmations à justifier transforme l'IA en relecteur critique (voir l'annexe D de l'évaluation).</td></tr>
<tr><td>P41</td><td>Répondre à un avis en ligne</td><td>« Un client a laissé l'avis suivant, que je résume sans nom : [résumé]. Rédige une réponse publique de 60 à 80 mots : remerciement ou regret selon le cas, reconnaissance factuelle, proposition d'échange en privé, aucune donnée personnelle, aucune polémique. »</td><td>Ne jamais publier de faux avis ni faire rédiger des avis par l'IA. Répondre aux avis réels, avec mesure.</td></tr>
<tr><td>P42</td><td>Préparer une newsletter</td><td>« Propose le plan d'une newsletter trimestrielle pour nos clients : édito de la dirigeante, conseil d'entretien de saison, réalisation du trimestre (anonymisée), rappel des démarches utiles avec lien vers les sources officielles, contact. Rédige l'édito en 120 mots, ton chaleureux. »</td><td>Pour l'envoi, respecter les règles applicables à la prospection par voie électronique et le consentement des destinataires ; ne transmettre à l'IA aucune liste de contacts.</td></tr>
</table>
<blockquote><strong>Bonne pratique</strong> – Avant de publier un contenu produit avec l'IA, posez-vous la question : « Pourrais-je justifier chaque phrase devant un client mécontent ? » Si une phrase ne passe pas ce test, elle ne passe pas la publication.</blockquote>`,
      },
      {
        title: "8.6 – Modèles prêts à adapter : charte, registre et check-lists",
        content: `<p>Les quatre modèles ci-dessous sont proposés à titre d'exemple, sur la base du cas Thermia Rénov. Ils doivent être adaptés à chaque entreprise et, pour la charte, validés selon les règles internes applicables (consultation éventuelle des représentants du personnel, articulation avec le règlement intérieur) : à vérifier avec un conseil.</p>
<h3>Modèle 1 – Charte d'usage de l'IA générative</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Article</th><th>Contenu type</th></tr>
<tr><td>1. Objet</td><td>La présente charte fixe les règles d'utilisation des outils d'intelligence artificielle générative par les salariés de [entreprise] dans le cadre de leur travail. Elle vise à tirer parti de ces outils tout en protégeant les clients, les salariés et l'entreprise.</td></tr>
<tr><td>2. Outils autorisés</td><td>Seuls les outils listés en annexe, dans leur version professionnelle paramétrée par l'entreprise, sont utilisés pour le travail. L'utilisation d'un compte personnel ou d'une version gratuite pour des données de l'entreprise est interdite. La liste est tenue à jour par le référent IA.</td></tr>
<tr><td>3. Données interdites</td><td>Ne sont jamais saisis dans un outil d'IA, sauf outil expressément autorisé pour cet usage : les données personnelles des clients, prospects et salariés (nom, adresse, téléphone, courriel, situation financière, santé) ; les prix d'achat, marges, devis et contrats non anonymisés ; les identifiants et mots de passe ; toute information couverte par une obligation de confidentialité.</td></tr>
<tr><td>4. Anonymisation</td><td>Lorsque l'usage le permet, les informations sont anonymisées avant saisie (remplacement par [Client], [montant], [adresse]).</td></tr>
<tr><td>5. Vérification</td><td>L'utilisateur reste responsable de tout contenu produit avec l'IA. Avant tout envoi ou publication, il applique la check-list de vérification : faits, chiffres, sources, ton, engagements. Les montants d'aides, les règles et les délais sont toujours vérifiés sur une source officielle ou interne.</td></tr>
<tr><td>6. Transparence</td><td>Les clients sont informés lorsqu'ils échangent avec un système d'IA. Aucun témoignage, avis ou image de personne réelle n'est généré ou modifié par l'IA pour être présenté comme authentique.</td></tr>
<tr><td>7. Propriété intellectuelle</td><td>Il est interdit de demander à l'IA de reproduire une œuvre protégée ou d'imiter le style d'un auteur identifié à des fins commerciales. L'origine des visuels publiés est tracée (outil, date, auteur de la demande).</td></tr>
<tr><td>8. Décisions concernant les personnes</td><td>L'IA n'est jamais utilisée seule pour évaluer, sélectionner ou sanctionner une personne (recrutement, évaluation, attribution d'un avantage).</td></tr>
<tr><td>9. Sobriété</td><td>L'IA est utilisée lorsqu'elle apporte un gain réel ; on évite les générations répétées inutiles, notamment d'images et de vidéos.</td></tr>
<tr><td>10. Référent et registre</td><td>Un référent IA est désigné : [nom, fonction]. Il tient le registre des usages, recueille les questions et incidents, organise la sensibilisation des salariés (maîtrise de l'IA) et propose la mise à jour de la charte au moins une fois par an.</td></tr>
<tr><td>11. Incidents</td><td>Toute saisie de données interdite, tout contenu erroné envoyé à un client ou tout comportement anormal d'un outil est signalé sans délai au référent, qui informe la direction et, le cas échéant, le responsable des données personnelles.</td></tr>
<tr><td>12. Entrée en vigueur</td><td>La charte entre en vigueur le [date]. Elle est remise à chaque salarié, qui atteste en avoir pris connaissance.</td></tr>
</table>
<h3>Modèle 2 – Registre des usages de l'IA</h3>
<p>Le registre recense les usages autorisés dans l'entreprise. Il aide à répondre aux questions des clients et des partenaires, à suivre les risques et à démontrer les actions de maîtrise de l'IA. Il complète, sans le remplacer, le registre des traitements de données personnelles prévu par le RGPD lorsque l'usage concerne de telles données.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Usage</th><th>Service / utilisateurs</th><th>Outil et version</th><th>Données saisies</th><th>Données personnelles ?</th><th>Contrôle humain</th><th>Risques et mesures</th><th>Date de validation / revue</th></tr>
<tr><td>1</td><td>Premiers jets de mails clients récurrents</td><td>Administration, commerce</td><td>Assistant intégré à la messagerie professionnelle</td><td>Texte des échanges dans l'environnement de l'entreprise</td><td>Oui (dans l'environnement professionnel)</td><td>Relecture avant envoi</td><td>Erreur d'engagement → check-list avant envoi</td><td>[date] / [date + 6 mois]</td></tr>
<tr><td>2</td><td>Mise en forme des comptes rendus de chantier</td><td>Travaux, administration</td><td>[outil]</td><td>Notes dictées anonymisées</td><td>Non (anonymisation)</td><td>Relecture par le conducteur de travaux</td><td>Glissement de sens → test des trois points</td><td>[date] / [date]</td></tr>
<tr><td>3</td><td>Visuels pour les réseaux sociaux</td><td>Communication</td><td>Fonctions IA d'un outil de création graphique</td><td>Consignes de création</td><td>Non</td><td>Validation par la direction</td><td>Droits d'usage → vérification des conditions, traçabilité</td><td>[date] / [date]</td></tr>
<tr><td>4</td><td>Veille réglementaire</td><td>Direction, commerce</td><td>Outil de recherche citant ses sources</td><td>Questions générales</td><td>Non</td><td>Lecture des sources officielles</td><td>Information dépassée → vérification de la date</td><td>[date] / [date]</td></tr>
</table>
<h3>Modèle 3 – Check-list de vérification avant envoi ou publication</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Point de contrôle</th><th>Oui / Non / Sans objet</th></tr>
<tr><td>1</td><td>Les noms, dates, références et quantités correspondent à mes sources (notes, devis, dossier).</td><td> </td></tr>
<tr><td>2</td><td>Les chiffres et calculs ont été vérifiés ; aucun chiffre n'est présent sans source.</td><td> </td></tr>
<tr><td>3</td><td>Les montants d'aides, règles et délais ont été vérifiés sur une source officielle ou interne datée, ou ont été retirés.</td><td> </td></tr>
<tr><td>4</td><td>Le texte ne contient aucune promesse, garantie ou geste commercial non validé.</td><td> </td></tr>
<tr><td>5</td><td>Le texte ne contient ni urgence artificielle, ni allégation comparative non justifiée.</td><td> </td></tr>
<tr><td>6</td><td>Le ton est adapté au destinataire et à la situation ; vouvoiement respecté.</td><td> </td></tr>
<tr><td>7</td><td>Les éléments entre crochets ont tous été complétés ou supprimés.</td><td> </td></tr>
<tr><td>8</td><td>Aucune donnée personnelle n'est diffusée sans nécessité ni accord (publication, copie à des tiers).</td><td> </td></tr>
<tr><td>9</td><td>Les visuels sont d'origine connue et utilisables à des fins commerciales.</td><td> </td></tr>
<tr><td>10</td><td>Les mentions utiles sont présentes (coordonnées, date de mise à jour, information sur l'usage d'une IA si nécessaire).</td><td> </td></tr>
<tr><td>11</td><td>J'ai relu le texte en entier, à tête reposée si l'enjeu est important.</td><td> </td></tr>
<tr><td>12</td><td>Je suis capable de justifier chaque phrase si le destinataire me pose la question.</td><td> </td></tr>
</table>
<h3>Modèle 4 – Check-list confidentialité avant saisie</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Question</th><th>Si la réponse est « non »</th></tr>
<tr><td>1</td><td>L'outil fait-il partie de la liste des outils autorisés par l'entreprise ?</td><td>Ne pas l'utiliser pour des données de l'entreprise.</td></tr>
<tr><td>2</td><td>Suis-je connecté avec mon compte professionnel, et non personnel ?</td><td>Changer de compte.</td></tr>
<tr><td>3</td><td>Les paramètres de confidentialité (historique, utilisation des échanges pour l'entraînement) sont-ils conformes à la consigne de l'entreprise ?</td><td>Ajuster les paramètres ou demander au référent.</td></tr>
<tr><td>4</td><td>Ai-je retiré les noms, adresses, téléphones, courriels et numéros de dossier qui ne sont pas indispensables ?</td><td>Anonymiser avant saisie.</td></tr>
<tr><td>5</td><td>Ai-je retiré les prix d'achat, marges, conditions négociées et informations stratégiques ?</td><td>Remplacer par des ordres de grandeur ou des repères.</td></tr>
<tr><td>6</td><td>Le document joint (PDF, tableur) ne contient-il pas d'onglets, de commentaires ou de métadonnées confidentiels ?</td><td>Nettoyer le document ou n'en copier qu'un extrait.</td></tr>
<tr><td>7</td><td>Les données concernent-elles des personnes vulnérables, la santé ou la situation financière ?</td><td>Ne pas saisir ; demander l'avis du référent.</td></tr>
<tr><td>8</td><td>Le partage des fichiers dans l'environnement professionnel est-il correctement restreint (un assistant intégré accède à ce à quoi j'ai accès) ?</td><td>Vérifier les droits de partage.</td></tr>
<tr><td>9</td><td>Puis-je obtenir le même résultat sans aucune donnée réelle (modèle générique) ?</td><td>Si oui, préférer cette solution.</td></tr>
<tr><td>10</td><td>En cas d'erreur de saisie, sais-je qui prévenir ?</td><td>Contacter le référent IA (article 11 de la charte).</td></tr>
</table>
<blockquote><strong>Bonne pratique</strong> – Imprimez les deux check-lists au format d'une demi-page et placez-les à côté de l'écran pendant les premières semaines. Au bout d'un mois, les questions deviennent des réflexes et la vérification ne prend plus qu'une minute.</blockquote>`,
      },
      {
        title: "8.7 – Glossaire de l'intelligence artificielle au travail",
        content: `<p>Le glossaire reprend, par ordre alphabétique, les termes employés pendant la formation. Les termes anglais d'usage courant sont signalés et traduits.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Terme</th><th>Définition</th></tr>
<tr><td>Agent (agent d'IA)</td><td>Système d'IA capable d'enchaîner plusieurs actions de manière autonome (rechercher, ouvrir un document, remplir un formulaire) pour atteindre un objectif fixé. Exige un contrôle humain renforcé.</td></tr>
<tr><td>Agent conversationnel</td><td>Programme qui dialogue avec un utilisateur en langage naturel (en anglais <em>chatbot</em>).</td></tr>
<tr><td>AI Act</td><td>Nom usuel du règlement (UE) 2024/1689 établissant des règles harmonisées concernant l'intelligence artificielle (règlement européen sur l'IA).</td></tr>
<tr><td>Algorithme</td><td>Suite finie d'instructions permettant de résoudre un problème ou de réaliser une tâche.</td></tr>
<tr><td>Analyse d'impact relative à la protection des données (AIPD)</td><td>Étude prévue par le RGPD pour les traitements susceptibles d'engendrer un risque élevé pour les personnes ; la CNIL publie des outils et des listes de traitements concernés.</td></tr>
<tr><td>Anonymisation</td><td>Traitement rendant impossible, de manière irréversible, l'identification d'une personne. À distinguer de la pseudonymisation.</td></tr>
<tr><td>API</td><td>Interface de programmation permettant à deux logiciels d'échanger des données ; base des automatisations entre outils.</td></tr>
<tr><td>Apprentissage automatique</td><td>Branche de l'IA dans laquelle un système apprend des régularités à partir de données (en anglais <em>machine learning</em>).</td></tr>
<tr><td>Apprentissage profond</td><td>Apprentissage automatique reposant sur des réseaux de neurones à nombreuses couches (en anglais <em>deep learning</em>).</td></tr>
<tr><td>Assistant intégré</td><td>Fonction d'IA intégrée à un logiciel de travail (messagerie, traitement de texte, tableur), comme Copilot dans Microsoft 365.</td></tr>
<tr><td>Assistant personnalisé</td><td>Assistant configuré avec des instructions permanentes, voire des documents de référence, pour une tâche récurrente.</td></tr>
<tr><td>Automatisation sans code</td><td>Création de flux entre applications par assemblage visuel de déclencheurs et d'actions, sans programmation (en anglais <em>no-code</em>) : Power Automate, Zapier, Make.</td></tr>
<tr><td>Biais</td><td>Écart systématique dans les résultats d'un système, souvent hérité des données d'entraînement, pouvant conduire à des stéréotypes ou à des discriminations.</td></tr>
<tr><td>Bureau de l'IA</td><td>Service de la Commission européenne chargé notamment de la mise en œuvre du règlement européen sur l'IA pour les modèles d'IA à usage général (en anglais <em>AI Office</em>).</td></tr>
<tr><td>Charte d'usage</td><td>Document interne fixant les règles d'utilisation des outils d'IA dans l'entreprise.</td></tr>
<tr><td>CNIL</td><td>Commission nationale de l'informatique et des libertés, autorité française de protection des données personnelles.</td></tr>
<tr><td>Contexte (fenêtre de contexte)</td><td>Quantité d'informations, mesurée en tokens, que le modèle peut prendre en compte dans un échange.</td></tr>
<tr><td>Déclencheur</td><td>Événement qui lance une automatisation (réception d'un mail, nouvelle ligne dans un tableau, formulaire rempli).</td></tr>
<tr><td>Date de connaissance</td><td>Date au-delà de laquelle le modèle n'a pas appris d'informations (en anglais <em>knowledge cutoff</em>).</td></tr>
<tr><td>Deepfake (hypertrucage)</td><td>Contenu image, audio ou vidéo généré ou manipulé pour faire croire à une scène réelle ; soumis à des obligations de transparence.</td></tr>
<tr><td>Donnée personnelle</td><td>Toute information se rapportant à une personne physique identifiée ou identifiable, directement ou indirectement.</td></tr>
<tr><td>Données d'entraînement</td><td>Ensemble des données utilisées pour faire apprendre un modèle.</td></tr>
<tr><td>Droit d'auteur</td><td>Ensemble des droits dont dispose l'auteur d'une œuvre originale ; encadre la reproduction d'œuvres et pose la question de la protection des contenus générés.</td></tr>
<tr><td>Fournisseur</td><td>Au sens du règlement européen sur l'IA, acteur qui développe un système ou un modèle d'IA et le met sur le marché sous son nom.</td></tr>
<tr><td>Déployeur</td><td>Au sens du règlement européen sur l'IA, personne ou organisation qui utilise un système d'IA sous sa propre autorité dans un cadre professionnel ; une PME qui utilise un assistant est généralement déployeur.</td></tr>
<tr><td>Génération augmentée par récupération</td><td>Technique qui fournit au modèle des documents pertinents au moment de la question pour fonder sa réponse (en anglais <em>RAG</em>).</td></tr>
<tr><td>Grand modèle de langage</td><td>Modèle d'IA entraîné sur de très grands volumes de textes pour produire du langage (en anglais <em>LLM</em>).</td></tr>
<tr><td>Hallucination</td><td>Production d'une information fausse, présentée de manière plausible et assurée.</td></tr>
<tr><td>IA générative</td><td>IA capable de produire des contenus nouveaux (texte, image, son, vidéo, code) à partir d'une consigne.</td></tr>
<tr><td>Inférence</td><td>Phase d'utilisation d'un modèle entraîné pour produire une réponse.</td></tr>
<tr><td>Instructions système</td><td>Consignes permanentes données à un assistant, qui s'appliquent à tous les échanges.</td></tr>
<tr><td>Intelligence artificielle</td><td>Ensemble de techniques permettant à une machine de réaliser des tâches associées à l'intelligence humaine.</td></tr>
<tr><td>Itération</td><td>Amélioration progressive d'une réponse par des relances successives et ciblées.</td></tr>
<tr><td>Maîtrise de l'IA</td><td>Compétences, connaissances et compréhension permettant d'utiliser l'IA en connaissance de cause ; les fournisseurs et déployeurs doivent prendre des mesures pour l'assurer (article 4 du règlement européen sur l'IA, en anglais <em>AI literacy</em>).</td></tr>
<tr><td>Minimisation</td><td>Principe du RGPD : ne traiter que les données adéquates, pertinentes et limitées à ce qui est nécessaire.</td></tr>
<tr><td>Modèle d'IA à usage général</td><td>Modèle capable d'exécuter un large éventail de tâches et pouvant être intégré dans de nombreux systèmes ; ses fournisseurs ont des obligations depuis le 02/08/2025.</td></tr>
<tr><td>Modèle de fondation</td><td>Modèle de grande taille entraîné sur des données variées, adaptable à de nombreuses tâches.</td></tr>
<tr><td>Multimodal</td><td>Qui traite plusieurs types de contenus (texte, image, son, vidéo) dans un même échange.</td></tr>
<tr><td>Omnibus numérique</td><td>Ensemble de propositions présentées par la Commission européenne fin 2025 pour simplifier plusieurs textes numériques, dont certaines échéances du règlement sur l'IA ; à suivre, son adoption devant être vérifiée.</td></tr>
<tr><td>Open source (modèle ouvert)</td><td>Modèle dont les paramètres sont publiés et réutilisables selon une licence ; le degré d'ouverture varie.</td></tr>
<tr><td>Paramètres</td><td>Valeurs internes ajustées pendant l'entraînement ; leur nombre donne une idée de la taille du modèle.</td></tr>
<tr><td>Pratique commerciale trompeuse</td><td>Pratique qui induit le consommateur en erreur (fausse allégation, faux avis, fausse urgence) ; interdite par le code de la consommation.</td></tr>
<tr><td>Prompt (requête)</td><td>Consigne rédigée par l'utilisateur pour obtenir une réponse d'un outil d'IA.</td></tr>
<tr><td>Pseudonymisation</td><td>Remplacement des données identifiantes par un pseudonyme ; la personne reste identifiable avec une information complémentaire : les données restent personnelles.</td></tr>
<tr><td>Registre des usages</td><td>Tableau interne recensant les usages de l'IA autorisés, les outils, les données et les contrôles.</td></tr>
<tr><td>Registre des traitements</td><td>Document prévu par le RGPD recensant les traitements de données personnelles d'un organisme.</td></tr>
<tr><td>RGPD</td><td>Règlement (UE) 2016/679 relatif à la protection des données personnelles, applicable depuis le 25/05/2018.</td></tr>
<tr><td>Secret des affaires</td><td>Protection des informations à valeur commerciale, non publiques, faisant l'objet de mesures de protection raisonnables.</td></tr>
<tr><td>Sous-traitant (RGPD)</td><td>Organisme qui traite des données personnelles pour le compte d'un responsable de traitement ; un contrat doit encadrer cette relation.</td></tr>
<tr><td>Responsable de traitement</td><td>Organisme qui détermine les finalités et les moyens d'un traitement de données personnelles.</td></tr>
<tr><td>Système d'IA à haut risque</td><td>Catégorie du règlement européen sur l'IA (par exemple certains usages en recrutement ou pour l'accès à des services essentiels) soumise à des exigences renforcées.</td></tr>
<tr><td>Température</td><td>Réglage qui influence le caractère plus prévisible ou plus créatif des réponses d'un modèle.</td></tr>
<tr><td>Token</td><td>Unité de texte (fragment de mot, mot, ponctuation) traitée par un modèle de langage.</td></tr>
<tr><td>Transcription</td><td>Conversion automatique de la parole en texte, par exemple pour produire un compte rendu de réunion ; les participants doivent en être informés.</td></tr>
<tr><td>Transparence (obligation de)</td><td>Obligation d'informer les personnes qu'elles interagissent avec une IA ou qu'un contenu a été généré ou manipulé artificiellement (article 50 du règlement européen sur l'IA, à partir du 02/08/2026).</td></tr>
<tr><td>Vérification des faits</td><td>Contrôle de l'exactitude d'une information à partir de sources fiables et datées.</td></tr>
</table>
<blockquote><strong>Bonne pratique</strong> – Quand un terme technique apparaît dans une réponse de l'IA ou dans un document fournisseur et que vous ne pouvez pas l'expliquer à un collègue en une phrase, cherchez-le ici ou demandez à l'IA de l'expliquer « à un non-spécialiste, avec un exemple », puis vérifiez la définition sur une source fiable.</blockquote>`,
      },
      {
        title: "8.8 – Ressources officielles",
        content: `<p>Les ressources ci-dessous sont publiées par des autorités publiques françaises et européennes. Elles évoluent régulièrement : consultez-les directement sur les sites indiqués (adresses principales des sites, sans lien profond susceptible de changer) et vérifiez toujours la date de mise à jour des pages.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Source</th><th>Site</th><th>Ce que vous y trouverez</th><th>Pour quelle compétence</th></tr>
<tr><td>CNIL – Commission nationale de l'informatique et des libertés</td><td>cnil.fr</td><td>Recommandations et fiches pratiques consacrées à l'intelligence artificielle et aux données personnelles ; guides du RGPD pour les TPE et PME ; modèle de registre des traitements ; outils d'analyse d'impact</td><td>C5</td></tr>
<tr><td>Commission européenne</td><td>commission.europa.eu et digital-strategy.ec.europa.eu</td><td>Présentation du règlement européen sur l'IA, calendrier d'application, travaux du Bureau de l'IA, lignes directrices et questions-réponses, propositions de simplification (« omnibus numérique ») et leur état d'avancement</td><td>C5</td></tr>
<tr><td>EUR-Lex</td><td>eur-lex.europa.eu</td><td>Texte officiel du règlement (UE) 2024/1689 et du règlement (UE) 2016/679 (RGPD), dans toutes les langues de l'Union</td><td>C5</td></tr>
<tr><td>Légifrance</td><td>legifrance.gouv.fr</td><td>Textes français en vigueur : code du travail (formation professionnelle, attestation de fin de formation), code de la consommation (pratiques commerciales trompeuses), code de la propriété intellectuelle, loi Informatique et Libertés</td><td>C3, C5</td></tr>
<tr><td>Service-public</td><td>service-public.fr et entreprendre.service-public.fr</td><td>Fiches pratiques pour les particuliers et les entreprises : aides à la rénovation énergétique, obligations des professionnels, protection des données, droits des consommateurs</td><td>C3, C5</td></tr>
<tr><td>ANSSI – Agence nationale de la sécurité des systèmes d'information</td><td>cyber.gouv.fr</td><td>Recommandations de sécurité pour l'usage et le déploiement de systèmes d'IA générative ; guide d'hygiène informatique ; bonnes pratiques pour les TPE et PME</td><td>C4, C5</td></tr>
<tr><td>Cybermalveillance.gouv.fr</td><td>cybermalveillance.gouv.fr</td><td>Dispositif national d'assistance aux victimes d'actes de cybermalveillance ; fiches réflexes (hameçonnage, mots de passe, fraude au faux dirigeant, y compris par voix ou vidéo synthétiques)</td><td>C5</td></tr>
<tr><td>France Rénov'</td><td>france-renov.gouv.fr</td><td>Service public de la rénovation de l'habitat : informations officielles sur les aides, à utiliser pour vérifier tout contenu produit par l'IA sur ce sujet</td><td>C3</td></tr>
</table>
<h3>Comment utiliser ces ressources avec l'IA</h3>
<ol>
<li><strong>Partir de la source</strong> : pour une question réglementaire, ouvrez d'abord la page officielle, puis demandez éventuellement à l'IA de vous aider à la comprendre en collant l'extrait concerné.</li>
<li><strong>Toujours dater</strong> : notez la date de consultation de la source dans vos documents (« informations vérifiées le [date] sur [site] »).</li>
<li><strong>Distinguer texte en vigueur et proposition</strong> : une proposition de la Commission européenne n'est pas une règle applicable tant qu'elle n'a pas été adoptée et publiée au Journal officiel de l'Union européenne.</li>
<li><strong>Se méfier des sites imitant les sites publics</strong> : vérifiez que l'adresse se termine par « .gouv.fr » pour les sites de l'État français, ou par « europa.eu » pour les institutions européennes.</li>
</ol>
<h3>Repères de calendrier du règlement européen sur l'IA</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Date</th><th>Étape</th></tr>
<tr><td>01/08/2024</td><td>Entrée en vigueur du règlement (UE) 2024/1689</td></tr>
<tr><td>02/02/2025</td><td>Application des interdictions de certaines pratiques et de l'obligation de maîtrise de l'IA (article 4)</td></tr>
<tr><td>02/08/2025</td><td>Application des obligations relatives aux modèles d'IA à usage général et des règles de gouvernance</td></tr>
<tr><td>02/08/2026</td><td>Application des obligations de transparence (article 50) et de la plupart des autres dispositions</td></tr>
<tr><td>Fin 2025</td><td>Proposition de la Commission (« omnibus numérique ») visant notamment à décaler certaines échéances relatives aux systèmes à haut risque : proposition dont l'état d'adoption doit être vérifié sur les sites de la Commission et d'EUR-Lex</td></tr>
</table>
<blockquote><strong>Bonne pratique</strong> – Ajoutez ces sites aux favoris de votre navigateur dans un dossier « Sources officielles » et prenez l'habitude d'y vérifier toute information réglementaire produite par l'IA. Trente secondes de vérification évitent une erreur envoyée à un client.</blockquote>`,
      },
      {
        title: "8.9 – Exercices d'entraînement supplémentaires corrigés",
        content: `<p>Ces neuf exercices permettent de s'entraîner après la formation, seul ou en binôme. Ils s'appuient sur le cas Thermia Rénov (fictif). Prévoyez 10 à 20 minutes par exercice. Les corrigés proposent une réponse type ; d'autres réponses sont possibles si elles respectent les principes travaillés.</p>
<h3>Exercice 1 – Repérer les limites (C1)</h3>
<p><strong>Énoncé</strong> : Karim demande à un assistant non connecté au web : « Quelles sont les nouvelles aides pour les pompes à chaleur cette année ? » L'outil répond avec assurance en citant des montants. Listez trois raisons de se méfier de cette réponse et la démarche à suivre.</p>
<p><strong>Corrigé</strong> : 1) date de connaissance : l'outil peut ignorer les évolutions postérieures à son entraînement ; 2) risque d'hallucination : des montants précis peuvent être inventés ; 3) absence de source : rien ne permet de contrôler. Démarche : utiliser un outil qui cite ses sources ou consulter directement les sites officiels (service-public, France Rénov'), vérifier la date des informations et ne communiquer au client que des éléments vérifiés, en précisant que l'éligibilité est étudiée au cas par cas.</p>
<h3>Exercice 2 – Améliorer un prompt faible (C2)</h3>
<p><strong>Énoncé</strong> : améliorez le prompt « Écris un mail pour un client. »</p>
<p><strong>Corrigé</strong> : « Tu es assistante administrative d'une PME de rénovation énergétique. Contexte : un client particulier a demandé un devis pour l'isolation de ses combles il y a trois jours ; il manque une photo de ses combles et sa dernière facture de chauffage pour finaliser. Tâche : rédige un mail de demande de pièces. Format : objet + 80 mots, vouvoiement. Contraintes : ton aimable, liste à puces pour les pièces, indiquer comment les envoyer, aucune donnée personnelle, nom à compléter entre crochets. » Le prompt amélioré précise rôle, contexte, tâche, format et contraintes : la réponse sera directement exploitable.</p>
<h3>Exercice 3 – Itérer avec méthode (C2)</h3>
<p><strong>Énoncé</strong> : la réponse obtenue à l'exercice 2 est correcte mais froide et trop longue. Rédigez deux relances successives.</p>
<p><strong>Corrigé</strong> : relance 1 : « Raccourcis à 60 mots et rends le ton plus chaleureux, comme si tu parlais à un client que tu connais déjà, tout en gardant le vouvoiement. » Relance 2 : « Relis ta réponse du point de vue du client : est-il clair sur ce qu'il doit faire et comment ? Corrige si besoin et ajoute une phrase indiquant ce qui se passera une fois les pièces reçues. » La première relance agit sur la forme, la seconde sur la compréhension par le destinataire.</p>
<h3>Exercice 4 – Vérifier une synthèse (C3)</h3>
<p><strong>Énoncé</strong> : Sandrine MOREL a fait résumer par l'IA un contrat de location de véhicules utilitaires de 12 pages. Le résumé indique « durée 36 mois, résiliation possible à tout moment sans frais ». Que faites-vous ?</p>
<p><strong>Corrigé</strong> : la mention « résiliation à tout moment sans frais » est inhabituelle pour un contrat de location longue durée : elle doit être vérifiée dans le contrat. Rechercher la clause de résiliation dans le document original (recherche par mot-clé « résiliation », « indemnité », « durée »), comparer avec le résumé et corriger. Plus généralement, contrôler dans la source chaque chiffre, durée et condition financière d'un résumé avant de s'en servir pour décider.</p>
<h3>Exercice 5 – Produire une publication conforme (C3)</h3>
<p><strong>Énoncé</strong> : corrigez la publication suivante proposée par l'IA : « Encore un chantier réussi chez M. et Mme Ferrand à Brignais ! Grâce à nous, ils vont économiser 70 % sur leur chauffage. Appelez vite, les aides baissent le mois prochain ! »</p>
<p><strong>Corrigé</strong> : problèmes : identification du client sans accord, chiffre d'économie non justifié, urgence artificielle non vérifiée, ton racoleur. Version corrigée : « Chantier terminé cette semaine dans l'ouest lyonnais : isolation des combles et installation d'une pompe à chaleur air/eau dans une maison des années 70. Réduire les besoins avant de changer de chauffage : c'est la démarche que nous proposons à chaque client. Un projet de rénovation ? Parlons-en, nous étudions chaque situation au cas par cas. »</p>
<h3>Exercice 6 – Choisir quoi automatiser (C4)</h3>
<p><strong>Énoncé</strong> : Thomas reçoit chaque soir par mail les photos de chantier de ses équipes et les classe à la main dans les dossiers partagés (environ 20 minutes par jour). Proposez une automatisation et ses limites.</p>
<p><strong>Corrigé</strong> : déclencheur : réception d'un mail contenant des pièces jointes, provenant d'une adresse d'équipe, avec la référence du chantier dans l'objet (règle à imposer aux équipes) ; action : enregistrement des pièces jointes dans le dossier du chantier correspondant ; action : notification récapitulative à Thomas. Outil : Power Automate (dans un environnement Microsoft 365), Zapier ou Make selon les outils de l'entreprise. Limites : si l'objet est mal saisi, les photos vont dans un dossier « à classer » contrôlé chaque jour ; les photos peuvent montrer des personnes ou l'intérieur du domicile des clients : accès au dossier restreint. Gain estimé : environ 1 h 15 par semaine sur cinq jours, si l'on compte 5 minutes de contrôle quotidien, à mesurer sur quatre semaines.</p>
<h3>Exercice 7 – Mesurer un gain de temps (C4)</h3>
<p><strong>Énoncé</strong> : Julie pense « gagner beaucoup de temps » avec Copilot dans Outlook. Proposez une méthode pour le démontrer à la direction.</p>
<p><strong>Corrigé</strong> : choisir deux ou trois tâches précises (réponses récurrentes, résumés de fils) ; relever pendant deux semaines, sans l'outil, le nombre de tâches et le temps passé ; relever la même chose pendant deux semaines avec l'outil ; comparer le temps moyen par tâche ; suivre en parallèle un indicateur de qualité (corrections demandées, erreurs, retours clients). Présenter le résultat sous forme de tableau, en précisant les limites (période courte, tâches variables).</p>
<h3>Exercice 8 – Analyser une situation à risque (C5)</h3>
<p><strong>Énoncé</strong> : pour gagner du temps, Karim photographie la fiche d'imposition d'un client et l'envoie à un assistant grand public pour « calculer ses aides ». Analysez.</p>
<p><strong>Corrigé</strong> : la fiche d'imposition contient des données personnelles et financières ; leur transmission à un outil non autorisé et non paramétré méconnaît les principes de minimisation et de sécurité du RGPD et la charte de l'entreprise ; le calcul obtenu peut en outre être faux (hallucination, barèmes dépassés). Bonne pratique : ne pas transmettre la pièce ; utiliser les simulateurs et informations des sites officiels ; signaler l'incident au référent IA (la donnée a déjà été saisie), supprimer la conversation et l'image, et documenter l'incident.</p>
<h3>Exercice 9 – Informer de l'usage de l'IA (C5)</h3>
<p><strong>Énoncé</strong> : Thermia Rénov installe sur son site un agent conversationnel qui répond aux questions fréquentes. Rédigez le message d'accueil.</p>
<p><strong>Corrigé</strong> : « Bonjour, je suis l'assistant virtuel de Thermia Rénov, un programme d'intelligence artificielle. Je peux répondre à vos questions générales sur nos travaux et nos démarches. Je ne remplace pas un conseiller et je ne peux pas vous indiquer le montant de vos aides : pour une étude personnalisée, laissez vos coordonnées et un membre de l'équipe vous rappellera. Merci de ne pas saisir d'informations personnelles sensibles. [Lien vers l'information sur les données personnelles]. » Le message respecte l'obligation d'informer l'utilisateur qu'il échange avec une IA, fixe les limites de l'outil et protège les données.</p>
<blockquote><strong>Bonne pratique</strong> – Refaites un exercice par semaine pendant les deux mois qui suivent la formation, en remplaçant le cas Thermia Rénov par une situation réelle de votre travail (anonymisée). C'est la manière la plus sûre de transformer ce que vous avez appris en habitude professionnelle.</blockquote>`,
      },
    ],
  },
];
