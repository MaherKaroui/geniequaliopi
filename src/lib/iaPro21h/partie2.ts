import type { CourseChapter } from "../courseContent";

export const IAP21_PARTIE2: CourseChapter[] = [
  {
    title: "Chapitre 3 – Produire des contenus écrits professionnels avec l'IA (C3)",
    description:
      "Utiliser un assistant d'IA générative pour produire des écrits professionnels fiables et adaptés : mails clients et relances, réponses à réclamation, courriers, comptes rendus de chantier et de réunion, fiches procédures, FAQ, posts pour les réseaux sociaux et articles de site. Adapter le ton et le registre à la cible, intégrer les mentions obligatoires, proscrire toute promesse invérifiable (aides financières, économies d'énergie) et instaurer une relecture humaine systématique. Exemples avant/après tirés du fil rouge Thermia Rénov. Durée indicative : une demi-journée (jour 2, matin). Module C3 du programme.",
    sections: [
      {
        title: "3.1 – Écrire avec l'IA : méthode en cinq temps et règles de confidentialité",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Situer la place de l'IA dans la production d'un écrit professionnel : un assistant de rédaction, jamais l'auteur responsable du texte.</li>
<li>Appliquer une méthode en cinq temps (cadrer, fournir la matière, générer, retravailler, valider) à tout type d'écrit.</li>
<li>Préparer les informations à transmettre à l'outil sans exposer les données personnelles des clients ni les informations confidentielles de l'entreprise.</li>
</ul>

<h3>Ce que l'IA apporte réellement à l'écrit professionnel</h3>
<p>Dans une TPE ou une PME, une part importante du temps administratif et commercial est consacrée à l'écrit : répondre aux demandes, relancer, confirmer un rendez-vous, rédiger un compte rendu, expliquer une procédure à un nouveau salarié, alimenter le site ou la page de l'entreprise sur les réseaux sociaux. Ces écrits ont trois points communs : ils sont <strong>répétitifs</strong> dans leur structure, ils doivent être <strong>exacts</strong> sur le fond et ils engagent l'image (et parfois la responsabilité juridique) de l'entreprise.</p>
<p>Les assistants d'IA générative vus au chapitre 1 (ChatGPT, Microsoft Copilot, Google Gemini, Le Chat de Mistral AI, Claude) sont particulièrement efficaces sur la première dimension : ils produisent en quelques secondes un premier jet bien structuré, correctement orthographié, dans le ton demandé. Ils sont en revanche <strong>incapables de garantir la seconde</strong> : un grand modèle de langage prédit une suite de mots plausible, il ne « sait » pas si le chantier de M. Garnier est terminé, si la prime évoquée existe encore ou si la garantie annoncée figure dans vos conditions générales. La troisième dimension, la responsabilité, reste entièrement la vôtre : un mail envoyé au nom de Thermia Rénov engage Thermia Rénov, qu'il ait été rédigé à la main ou avec un outil.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>L'IA fait bien</th><th>L'IA fait mal ou ne peut pas faire</th></tr>
<tr><td>Structurer un texte (introduction, points, conclusion, formule de politesse)</td><td>Connaître les faits propres à votre entreprise, à vos clients, à vos chantiers</td></tr>
<tr><td>Corriger l'orthographe, la grammaire, la ponctuation</td><td>Garantir l'exactitude d'un montant, d'une date, d'un barème ou d'une règle</td></tr>
<tr><td>Adapter le ton (plus chaleureux, plus formel, plus concis)</td><td>Juger de l'opportunité commerciale ou relationnelle d'un message</td></tr>
<tr><td>Proposer plusieurs versions à comparer</td><td>Savoir ce qui a déjà été dit au client au téléphone ou sur le chantier</td></tr>
<tr><td>Reformuler un texte technique pour un non-spécialiste</td><td>Vérifier qu'une formulation ne constitue pas une promesse ou un engagement contractuel</td></tr>
<tr><td>Transformer des notes en vrac en texte rédigé</td><td>Prendre la responsabilité du contenu envoyé</td></tr>
</table>

<blockquote><strong>Rappel du fil rouge.</strong> Thermia Rénov est une PME <em>fictive</em> de rénovation énergétique installée à Saint-Genis-Laval (Rhône), de 14 salariés. Elle pose des pompes à chaleur, isole combles et murs, installe des chauffe-eau thermodynamiques. Sa dirigeante, Sandrine MOREL, souhaite que l'équipe gagne du temps sur l'écrit sans jamais exposer les données de ses clients. Julie, assistante administrative, gère les mails, relances et courriers ; Karim, commercial, rédige les propositions et les suivis ; Thomas, conducteur de travaux, produit les comptes rendus de chantier. Tous les noms de clients, chiffres et situations de ce chapitre sont fictifs et construits pour le cours.</blockquote>

<h3>La méthode en cinq temps</h3>
<p>Quel que soit l'écrit, vous gagnerez du temps et de la fiabilité en suivant toujours la même démarche. Elle prolonge la structure de requête Rôle / Contexte / Tâche / Format / Contraintes vue au chapitre 2.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Temps</th><th>Ce que vous faites</th><th>Question à se poser</th></tr>
<tr><td>1. Cadrer</td><td>Définir le destinataire, l'objectif du message, l'action attendue, le ton, la longueur, le canal (mail, courrier, SMS, post)</td><td>« Après avoir lu ce texte, que doit faire ou comprendre le destinataire ? »</td></tr>
<tr><td>2. Fournir la matière</td><td>Donner à l'outil les faits utiles, anonymisés : dates, étapes, éléments déjà convenus, points à ne pas aborder</td><td>« L'IA dispose-t-elle de tous les faits, et uniquement de faits vérifiés ? »</td></tr>
<tr><td>3. Générer</td><td>Lancer la requête, demander si besoin deux ou trois variantes</td><td>« Le premier jet respecte-t-il le cadrage ? »</td></tr>
<tr><td>4. Retravailler</td><td>Itérer : raccourcir, préciser, changer le ton, supprimer ce qui est inventé ou superflu</td><td>« Chaque phrase est-elle utile et exacte ? »</td></tr>
<tr><td>5. Valider</td><td>Relire intégralement, vérifier les faits, réintroduire les données personnelles, ajouter les mentions obligatoires, puis envoyer sous votre nom</td><td>« Suis-je prêt à signer chaque mot de ce texte ? »</td></tr>
</table>
<p>Le deuxième temps est le plus souvent négligé. Un assistant à qui l'on demande « Écris un mail de relance pour un devis de pompe à chaleur » <strong>comble les vides</strong> : il invente un montant, une date de validité, un argument (« profitez des aides exceptionnelles avant leur suppression ») ou une offre que l'entreprise n'a jamais faite. Plus la matière fournie est précise, moins l'outil a besoin d'inventer.</p>

<h3>Préparer la matière sans exposer les données</h3>
<p>Les règles de confidentialité sont détaillées au chapitre consacré à l'usage responsable (C5). Pour la production d'écrits, retenez dès maintenant quatre réflexes :</p>
<ol>
<li><strong>Pseudonymiser</strong> : remplacer le nom, l'adresse, le téléphone, le courriel du client par des repères neutres ([CLIENT], [ADRESSE], [DATE_RDV]). Vous les réintroduirez vous-même dans la version finale.</li>
<li><strong>Ne transmettre que le nécessaire</strong> : pour rédiger une relance, l'outil n'a besoin ni du revenu fiscal du foyer, ni de la composition familiale, ni du numéro de dossier d'aide.</li>
<li><strong>Utiliser l'environnement prévu par l'entreprise</strong> : compte professionnel, version dont les conditions d'utilisation et le paramétrage de confidentialité ont été vérifiés (par exemple l'historique et l'utilisation des conversations pour l'entraînement des modèles désactivés lorsque l'option existe), et non un compte personnel gratuit ouvert à la hâte.</li>
<li><strong>Ne jamais coller un document client complet</strong> (devis signé, avis d'imposition, pièce d'identité, échanges contenant des données de santé ou de situation sociale) dans un outil grand public.</li>
</ol>

<h4>Exemple Thermia Rénov – avant / après pseudonymisation</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avant (à proscrire)</th><th>Après (acceptable)</th></tr>
<tr><td>« Rédige un mail pour M. Pierre Garnier, 12 chemin des Vignes à Brignais, tél. 06…, à qui on a fait le devis n° 2026-118 de 14 300 € pour une PAC, il est en revenus modestes et sa femme est malade, il n'a pas répondu depuis trois semaines. »</td><td>« Rédige un mail de relance courtois pour [CLIENT], à qui nous avons remis il y a trois semaines un devis de pompe à chaleur air/eau, après une visite technique. Il n'a pas répondu. Objectif : proposer un échange téléphonique pour répondre à ses questions, sans pression. Ne cite aucun montant ni aucune aide. »</td></tr>
</table>
<p>La seconde requête est plus courte, plus sûre et produit un meilleur résultat, car elle précise l'objectif et les interdits.</p>

<blockquote><strong>Bonne pratique :</strong> créez dans votre bibliothèque de prompts (chapitre 2) une requête « socle » par type d'écrit, déjà pseudonymisée, avec des champs entre crochets à compléter. Julie, chez Thermia Rénov, dispose ainsi de sept requêtes socles : relance de devis, confirmation de rendez-vous, réponse à réclamation, demande de pièces, compte rendu, courrier de fin de chantier, réponse à un avis en ligne.</blockquote>

<h3>Qui signe, qui répond ?</h3>
<p>Un écrit produit avec l'aide de l'IA reste l'écrit de son expéditeur. Trois conséquences pratiques en découlent :</p>
<ul>
<li>Le texte est envoyé <strong>sous le nom d'une personne identifiée</strong> et avec la signature habituelle de l'entreprise.</li>
<li>Toute affirmation factuelle (date, montant, délai, garantie, caractéristique technique) est <strong>vérifiée dans les documents internes</strong> (devis, planning, contrat, notice) avant l'envoi.</li>
<li>En cas de doute sur une question juridique, technique ou financière posée par le client, la bonne réponse est souvent : « Je vérifie et je reviens vers vous », plutôt qu'une réponse générée qui semble assurée.</li>
</ul>

<blockquote><strong>À retenir.</strong> L'IA est un assistant de rédaction efficace pour structurer, reformuler et corriger, mais elle ne connaît ni vos clients, ni vos chantiers, ni la réalité de vos engagements. Appliquez toujours la méthode en cinq temps (cadrer, fournir la matière, générer, retravailler, valider), fournissez des faits vérifiés et pseudonymisés, précisez ce que le texte ne doit pas contenir, et relisez intégralement avant d'envoyer sous votre nom.</blockquote>
`,
      },
      {
        title: "3.2 – Mails clients, relances et réponses à réclamation",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Rédiger avec l'IA des mails clients clairs, courtois et orientés vers une action : confirmation, demande de pièces, information sur l'avancement.</li>
<li>Construire une relance efficace qui respecte la liberté de décision du client.</li>
<li>Répondre à une réclamation de manière professionnelle : accuser réception, reconnaître, expliquer, proposer, sans aveu inconsidéré ni promesse irréaliste.</li>
</ul>

<h3>La structure d'un bon mail professionnel</h3>
<p>Avant de demander quoi que ce soit à un assistant, rappelez-vous la structure attendue. Vous pourrez ainsi l'imposer dans la requête et contrôler le résultat.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Rôle</th><th>Erreur fréquente des textes générés</th></tr>
<tr><td>Objet</td><td>Permettre au destinataire de comprendre le sujet sans ouvrir le message</td><td>Objet absent ou trop vague (« Suite à notre échange »)</td></tr>
<tr><td>Formule d'appel</td><td>Adapter le registre (« Madame, », « Bonjour Madame Bertin, »)</td><td>Formule trop familière ou trop ampoulée</td></tr>
<tr><td>Phrase d'entrée</td><td>Rappeler le contexte en une ligne</td><td>Formules creuses (« J'espère que ce message vous trouve en pleine forme »)</td></tr>
<tr><td>Corps</td><td>Donner l'information utile, en paragraphes courts ou en liste</td><td>Texte trop long, répétitions, détails inventés</td></tr>
<tr><td>Action attendue</td><td>Dire clairement ce que l'on attend et dans quel délai</td><td>Action noyée dans le texte ou absente</td></tr>
<tr><td>Formule de politesse et signature</td><td>Clore et identifier l'expéditeur</td><td>Signature fictive, coordonnées inventées</td></tr>
</table>

<h3>Mail d'information et de demande de pièces</h3>
<p>Julie doit demander à un client les documents manquants pour finaliser le dossier administratif d'un chantier. Elle utilise sa requête socle :</p>
<blockquote><strong>Requête :</strong> Tu es assistante administrative dans une entreprise de rénovation énergétique. Rédige un mail court et bienveillant à [CLIENT], dont le chantier d'isolation des combles est programmé le [DATE_CHANTIER]. Il nous manque deux documents : [DOCUMENT_1] et [DOCUMENT_2]. Demande-les avant le [DATE_LIMITE], explique en une phrase qu'ils sont nécessaires pour constituer le dossier, propose de les envoyer en réponse au mail ou de les déposer à l'agence. Ton : cordial et simple. Longueur : moins de 120 mots. Ne mentionne aucun montant, aucune aide et aucune conséquence non précisée ici.</blockquote>
<p>Le résultat est relu, les crochets sont remplacés par les données réelles dans la messagerie, et non dans l'outil d'IA.</p>

<h3>La relance de devis</h3>
<p>La relance est l'écrit commercial le plus fréquent et le plus délicat : trop pressante, elle irrite ; trop timide, elle est inutile. Dans le secteur de la rénovation énergétique, durablement marqué par le démarchage agressif, une relance insistante ou alarmiste (« Dernier jour pour bénéficier des aides ! ») est à proscrire, à la fois pour des raisons d'image et parce qu'elle peut relever d'une pratique commerciale trompeuse ou agressive.</p>

<h4>Exemple Thermia Rénov – avant / après</h4>
<p><strong>Requête initiale de Karim (trop pauvre) :</strong> « Écris une relance pour un client qui n'a pas signé son devis de pompe à chaleur. »</p>
<p><strong>Résultat obtenu (extrait) :</strong></p>
<blockquote>« Cher client, nous revenons vers vous concernant notre devis. Nous vous rappelons que les aides de l'État pour les pompes à chaleur sont limitées dans le temps et pourraient diminuer dès le mois prochain. Grâce à notre solution, vous réaliserez jusqu'à 70 % d'économies sur votre facture de chauffage. Notre offre spéciale de remise de 10 % est valable jusqu'à vendredi. »</blockquote>
<p>Ce texte cumule quatre défauts graves : une urgence fabriquée sur les aides, une promesse chiffrée d'économies que personne n'a calculée pour ce logement, une remise qui n'existe pas et une formule d'appel impersonnelle. Envoyé tel quel, il exposerait l'entreprise à un litige et à une perte de confiance.</p>
<p><strong>Requête retravaillée :</strong></p>
<blockquote><strong>Requête :</strong> Tu es commercial dans une PME de rénovation énergétique qui privilégie le conseil et la transparence. Rédige un mail de relance pour [CLIENT], à qui j'ai présenté le [DATE] un devis de pompe à chaleur air/eau après une visite technique. Le client avait deux questions en suspens : le niveau sonore de l'unité extérieure et le délai d'intervention. Objectif : proposer un appel de 15 minutes ou un rendez-vous pour y répondre. Rappelle que le devis reste valable jusqu'au [DATE_VALIDITE] (date figurant sur le devis). Interdits : aucun pourcentage d'économie, aucune mention d'aide, aucune urgence, aucune remise. Ton : professionnel et chaleureux. 100 mots maximum. Propose deux objets de mail.</blockquote>
<p><strong>Résultat retravaillé et validé (après relecture) :</strong></p>
<blockquote><p>Objet : Votre projet de pompe à chaleur – vos deux questions</p>
<p>Bonjour Monsieur [NOM],</p>
<p>Lors de notre rendez-vous du [DATE], vous vous interrogiez sur le niveau sonore de l'unité extérieure et sur nos délais d'intervention. J'ai rassemblé les éléments pour vous répondre précisément.</p>
<p>Seriez-vous disponible pour un appel d'un quart d'heure cette semaine, ou préférez-vous que je repasse vous voir ? Pour mémoire, le devis reste valable jusqu'au [DATE_VALIDITE].</p>
<p>Je reste à votre disposition.<br/>Karim, conseiller – Thermia Rénov</p></blockquote>

<h3>Le calendrier de relance</h3>
<p>L'IA peut aussi aider à construire une séquence de relances cohérente, que l'on adapte ensuite :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Moment (indicatif)</th><th>Canal</th><th>Contenu</th></tr>
<tr><td>Le jour de la remise du devis</td><td>Mail</td><td>Envoi du devis, récapitulatif en trois points, rappel des prochaines étapes</td></tr>
<tr><td>Une semaine après</td><td>Téléphone, puis mail de suivi</td><td>Réponse aux questions, sans pression</td></tr>
<tr><td>Deux à trois semaines après</td><td>Mail</td><td>Relance utile : information complémentaire, proposition de rendez-vous</td></tr>
<tr><td>Avant la fin de validité du devis</td><td>Mail</td><td>Information factuelle sur la date de validité, porte ouverte</td></tr>
<tr><td>Absence de réponse</td><td>Mail de clôture</td><td>Remerciement, proposition de revenir vers l'entreprise plus tard ; fin des relances</td></tr>
</table>

<h3>Répondre à une réclamation</h3>
<p>La réponse à une réclamation est un écrit à fort enjeu. Le client est mécontent, parfois en colère ; un mot maladroit peut transformer un incident en litige ou en avis négatif durable. L'IA est utile pour <strong>désamorcer l'émotion</strong> dans la rédaction (la vôtre comme celle du client) et pour structurer la réponse, à condition de respecter une méthode.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Contenu</th><th>Exemple de formulation</th></tr>
<tr><td>1. Accuser réception</td><td>Remercier d'avoir signalé le problème</td><td>« Je vous remercie de nous avoir fait part de votre mécontentement. »</td></tr>
<tr><td>2. Reconnaître le ressenti</td><td>Montrer que l'on a compris, sans reconnaître une faute non établie</td><td>« Je comprends que la présence de gravats après le départ de l'équipe vous ait contrariée. »</td></tr>
<tr><td>3. Exposer les faits vérifiés</td><td>Ce que l'entreprise a constaté ou va vérifier</td><td>« Thomas, notre conducteur de travaux, a fait le point avec l'équipe ce matin. »</td></tr>
<tr><td>4. Proposer une solution concrète</td><td>Action, date, interlocuteur</td><td>« Une équipe passera jeudi [DATE] entre 8 h et 10 h pour terminer le nettoyage. »</td></tr>
<tr><td>5. Conclure</td><td>Rester disponible, donner un contact direct</td><td>« Je reste joignable au [TÉLÉPHONE_AGENCE] pour tout complément. »</td></tr>
</table>

<h4>Exemple Thermia Rénov – la réclamation de Mme Bertin (fictive)</h4>
<p>Mme Bertin écrit : « Votre équipe a laissé des chutes d'isolant dans mon garage et une trace sur le mur de l'entrée. Je suis très déçue, on m'avait promis un chantier propre. Je vais laisser un avis sur internet. » Julie prépare la réponse avec l'IA en précisant : les faits constatés par Thomas (chutes d'isolant confirmées, trace non encore vue), la solution validée par Sandrine MOREL (passage d'une équipe le jeudi, constat de la trace sur place et reprise si elle est due au chantier), le ton (empathique, sobre, sans formule toute faite) et un interdit explicite : <em>ne pas reconnaître de dommage non constaté, ne pas proposer de geste commercial non validé, ne pas évoquer l'avis en ligne de manière défensive</em>.</p>
<p><strong>Premier jet généré (extrait problématique) :</strong> « Nous vous présentons nos plus sincères excuses pour les dégâts causés à votre domicile. Afin de nous faire pardonner, nous vous offrons une remise de 15 % sur votre facture. Nous vous prions de ne pas publier d'avis négatif. »</p>
<p>Ce premier jet reconnaît des « dégâts » non constatés, invente un geste commercial et demande de renoncer à un avis, ce qui est maladroit et peut être perçu comme une pression. Après itération (« Supprime la remise, ne parle pas de l'avis, distingue ce qui est constaté de ce qui sera vérifié »), Julie obtient un texte qu'elle relit, complète et fait valider par la dirigeante avant envoi.</p>

<blockquote><strong>Bonne pratique :</strong> pour une réclamation, demandez à l'IA de produire d'abord une <em>analyse</em> du message du client (faits allégués, émotions exprimées, demandes explicites et implicites) avant la réponse. Cette étape vous aide à ne rien oublier et à répondre à la vraie demande. Faites valider par un responsable toute réponse qui engage l'entreprise (geste commercial, reprise de travaux, reconnaissance de responsabilité).</blockquote>

<h3>Réponse aux avis en ligne</h3>
<p>Les réponses publiques aux avis (positifs comme négatifs) sont lues par les futurs clients. L'IA aide à varier les formulations et à garder un ton constant. Règles : remercier, personnaliser (un détail réel du chantier, sans donnée personnelle), répondre sur le fond sans polémiquer, inviter à poursuivre l'échange en privé pour un litige, ne jamais révéler d'information sur le client. Et naturellement, ne jamais rédiger de faux avis, avec ou sans IA : c'est une pratique commerciale trompeuse.</p>

<blockquote><strong>À retenir.</strong> Un mail professionnel a un objet clair, une entrée courte, une information utile et une action attendue. Pour une relance, fournissez à l'IA les questions réelles du client et interdisez explicitement les pourcentages d'économie, les aides, les urgences et les remises non décidées. Pour une réclamation, suivez la séquence accuser réception, reconnaître le ressenti, exposer les faits vérifiés, proposer une solution datée, conclure ; faites valider tout engagement par un responsable.</blockquote>
`,
      },
      {
        title: "3.3 – Courriers et comptes rendus de chantier et de réunion",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Rédiger avec l'IA des courriers professionnels conformes aux usages (information d'un retard, courrier de fin de chantier, réponse à une contestation).</li>
<li>Transformer des notes de chantier ou de réunion, dictées ou prises en vrac, en compte rendu structuré, fidèle et exploitable.</li>
<li>Repérer et corriger les ajouts, interprétations et omissions introduits par l'outil.</li>
</ul>

<h3>Le courrier professionnel : un écrit plus formel et plus engageant</h3>
<p>Le courrier (papier ou PDF joint à un mail) conserve un rôle important dans le bâtiment : information d'un client sur un retard, courrier de fin de chantier accompagnant les documents remis, réponse à une contestation de facture, échanges avec un syndic ou un bailleur. Il obéit à des usages de présentation que les assistants connaissent bien : coordonnées de l'expéditeur et du destinataire, lieu et date, objet, références, formule d'appel, corps, formule de politesse, signature.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type de courrier</th><th>Ce que l'IA peut faire</th><th>Ce que vous devez apporter et vérifier</th></tr>
<tr><td>Information d'un retard de chantier</td><td>Formuler l'information avec tact, proposer une structure</td><td>Cause réelle du retard, nouvelle date réaliste validée par le conducteur de travaux, conséquences éventuelles prévues au contrat</td></tr>
<tr><td>Courrier de fin de chantier</td><td>Rédiger un remerciement, lister les documents remis</td><td>Liste exacte des documents (procès-verbal de réception, notices, attestations, garanties), contacts du service après-vente</td></tr>
<tr><td>Réponse à une contestation de facture</td><td>Organiser les arguments, garder un ton neutre</td><td>Références du devis signé, avenants, faits datés ; validation par la direction avant envoi</td></tr>
<tr><td>Courrier à un syndic de copropriété</td><td>Adopter le registre attendu, structurer la demande</td><td>Exactitude des références (immeuble, résolution d'assemblée générale, devis), destinataire correct</td></tr>
</table>
<p>Un courrier peut avoir une portée juridique (mise en demeure, réserve, contestation). Dans ce cas, l'IA peut aider à la clarté, mais elle ne remplace pas l'avis d'un professionnel du droit, et la dirigeante valide le texte. N'ajoutez jamais une référence à un article de loi proposée par l'outil sans l'avoir vérifiée sur une source officielle : les références juridiques inventées ou erronées font partie des hallucinations les plus fréquentes.</p>

<h4>Exemple Thermia Rénov – courrier d'information d'un retard</h4>
<p>Le fournisseur de Thermia Rénov a livré une unité extérieure endommagée ; le chantier de la famille Rey (fictive), prévu le lundi, est décalé. Thomas confirme une nouvelle date dix jours plus tard. Julie formule la requête : rôle (assistante d'une PME de rénovation), faits (livraison du matériel endommagée, chantier décalé, nouvelle date [DATE] confirmée), objectif (informer, rassurer, s'excuser pour la gêne), contraintes (pas de mise en cause nommée du fournisseur, pas de compensation non validée, une page maximum, formule de politesse classique).</p>
<p><strong>Point de vigilance relevé à la relecture :</strong> l'outil avait ajouté « Ce décalage n'aura aucune incidence sur le montant de vos aides. » Cette phrase, rassurante, n'est fondée sur rien : Julie la supprime. Si la question se pose réellement (par exemple pour un délai de réalisation prévu par un dispositif d'aide), elle est traitée par la personne compétente après vérification.</p>

<h3>Le compte rendu de chantier</h3>
<p>Thomas visite chaque jour deux ou trois chantiers. Il prenait jusqu'ici ses notes sur un carnet et rédigeait le soir des comptes rendus incomplets. Avec un assistant d'IA installé sur son téléphone professionnel, il dicte ses observations sur place, puis demande une mise en forme. Le gain de temps est réel, mais la fidélité doit être contrôlée : un compte rendu de chantier peut servir de preuve en cas de désaccord.</p>
<h4>Les rubriques d'un compte rendu de chantier</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu</th></tr>
<tr><td>En-tête</td><td>Chantier (référence interne), date, heure, rédacteur, personnes présentes</td></tr>
<tr><td>Avancement</td><td>Travaux réalisés depuis la dernière visite, par lot ou par poste</td></tr>
<tr><td>Constats</td><td>Observations factuelles, photos référencées</td></tr>
<tr><td>Points bloquants et réserves</td><td>Problèmes rencontrés, non-conformités, éléments à reprendre</td></tr>
<tr><td>Décisions et actions</td><td>Qui fait quoi, pour quand</td></tr>
<tr><td>Sécurité</td><td>Points relevés (balisage, échafaudage, équipements de protection)</td></tr>
<tr><td>Prochaine visite</td><td>Date et objet</td></tr>
</table>

<h4>Exemple Thermia Rénov – avant / après</h4>
<p><strong>Notes dictées par Thomas (transcription brute, pseudonymisée) :</strong></p>
<blockquote>« Chantier R-27, mardi, avec Paulo et Steve. Combles faits à quatre-vingts pour cent, reste la partie au-dessus du garage, trappe trop petite il faut la recouper demain. Gaine VMC écrasée côté nord, à remplacer, prévenir le client. Rehausse autour du conduit de cheminée posée. Balisage OK. Client absent. Finir jeudi normalement. »</blockquote>
<p><strong>Requête :</strong> « Tu es conducteur de travaux. À partir des notes ci-dessous, rédige un compte rendu de chantier selon les rubriques : en-tête, avancement, constats, points bloquants, actions (qui / quoi / quand), sécurité, prochaine visite. Règle absolue : n'ajoute aucune information absente des notes ; si une rubrique n'est pas renseignée, écris « non renseigné ». Signale entre crochets les points à préciser. »</p>
<p><strong>Résultat (extrait) :</strong></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu généré</th></tr>
<tr><td>Avancement</td><td>Isolation des combles réalisée à environ 80 %. Reste : zone située au-dessus du garage. Rehausse autour du conduit de cheminée posée.</td></tr>
<tr><td>Points bloquants</td><td>Trappe d'accès trop étroite : recoupe prévue demain. Gaine de ventilation (VMC) écrasée côté nord : à remplacer.</td></tr>
<tr><td>Actions</td><td>Recoupe de la trappe : équipe [à préciser], [date de demain]. Remplacement de la gaine : [responsable et date à préciser]. Information du client sur la gaine : [responsable à préciser].</td></tr>
<tr><td>Sécurité</td><td>Balisage conforme.</td></tr>
<tr><td>Prochaine visite</td><td>Fin prévue jeudi [à confirmer].</td></tr>
</table>
<p>Grâce à la consigne « n'ajoute aucune information » et aux crochets, le compte rendu reste fidèle. Sans cette consigne, un premier essai avait inventé « isolant soufflé de 32 cm conforme » et « client informé », deux affirmations absentes des notes et potentiellement fausses.</p>

<blockquote><strong>Bonne pratique :</strong> relisez le compte rendu en le comparant ligne à ligne avec vos notes, en traquant trois types d'écart : les <em>ajouts</em> (faits inventés), les <em>interprétations</em> (une observation transformée en jugement : « malfaçon » au lieu de « gaine écrasée ») et les <em>omissions</em> (un point bloquant disparu). Conservez vos notes d'origine avec le compte rendu.</blockquote>

<h3>Le compte rendu de réunion</h3>
<p>Pour les réunions internes (réunion d'équipe du lundi, point commercial) ou externes (réunion de chantier avec un maître d'œuvre, rendez-vous avec un syndic), deux usages coexistent :</p>
<ul>
<li><strong>À partir de notes</strong> prises pendant la réunion, comme pour le chantier.</li>
<li><strong>À partir d'une transcription automatique</strong> : les outils de visioconférence et certains assistants (par exemple Copilot dans Teams, selon la licence de l'entreprise) peuvent transcrire et résumer une réunion. Ce point est approfondi au chapitre consacré à l'intégration dans les processus (C4). Retenez dès maintenant que l'enregistrement ou la transcription d'une réunion suppose d'en <strong>informer les participants</strong> au préalable, et que la transcription peut mal attribuer une parole ou déformer un chiffre.</li>
</ul>
<h4>Structure recommandée d'un compte rendu de réunion</h4>
<ol>
<li>Objet, date, participants, excusés, rédacteur.</li>
<li>Ordre du jour.</li>
<li>Pour chaque point : synthèse des échanges, décisions prises, points en suspens.</li>
<li>Tableau des actions : action, responsable, échéance.</li>
<li>Date de la prochaine réunion.</li>
</ol>
<p>Demandez explicitement à l'outil de <strong>distinguer les décisions des simples propositions</strong> : c'est la confusion la plus fréquente. « Karim propose de relancer les devis de septembre » n'est pas « Il est décidé que Karim relance les devis de septembre ».</p>

<h4>Exemple Thermia Rénov – réunion d'équipe du lundi</h4>
<p>Sandrine MOREL anime chaque lundi une réunion de trente minutes. Julie prend des notes rapides et demande à l'IA un compte rendu structuré, avec un tableau des actions. Elle ajoute à sa requête socle trois consignes : « Utilise uniquement les prénoms et les rôles », « Ne reformule pas les chiffres : recopie-les tels quels », « Termine par la liste des points sans responsable ou sans échéance ». Cette dernière consigne transforme l'outil en assistant de pilotage : il signale ce que la réunion n'a pas tranché.</p>

<h3>Le procès-verbal et les documents contractuels</h3>
<p>Certains documents ont une valeur contractuelle forte : procès-verbal de réception des travaux, réserves, avenants. L'IA peut aider à rédiger la description d'une réserve de manière claire et précise, mais le document lui-même est établi sur le modèle de l'entreprise, rempli à partir des constats réels et signé par les parties. Ne laissez jamais un outil « compléter » un procès-verbal.</p>

<blockquote><strong>À retenir.</strong> Le courrier est plus formel et plus engageant que le mail : l'IA aide à la présentation et au ton, mais les faits, dates et références doivent être vérifiés et validés, sans référence juridique non contrôlée. Pour un compte rendu de chantier ou de réunion, imposez à l'outil de ne rien ajouter, de signaler les manques entre crochets et de distinguer décisions et propositions ; comparez ensuite ligne à ligne avec vos notes et conservez-les.</blockquote>
`,
      },
      {
        title: "3.4 – Fiches procédures, modes opératoires et FAQ",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Formaliser avec l'IA une procédure interne à partir de la pratique réelle d'un salarié.</li>
<li>Rédiger une FAQ (foire aux questions) destinée aux clients ou aux salariés, à partir de questions réellement posées.</li>
<li>Garantir que les contenus formalisés restent exacts, à jour et validés par la personne compétente.</li>
</ul>

<h3>Pourquoi formaliser les procédures avec l'IA</h3>
<p>Dans une PME de 14 salariés, beaucoup de savoir-faire reposent sur une ou deux personnes : Julie sait constituer un dossier client complet, Thomas sait préparer un chantier, Sandrine MOREL sait à qui s'adresser pour chaque litige. En cas d'absence, de départ ou d'arrivée d'un nouveau salarié, ce savoir se perd ou se transmet mal. Formaliser ces pratiques en fiches procédures est utile mais chronophage ; c'est précisément le type de tâche où l'IA fait gagner du temps : elle transforme une explication orale ou des notes en un document structuré, numéroté, homogène.</p>

<h3>La méthode : de l'entretien à la fiche</h3>
<ol>
<li><strong>Recueillir la pratique réelle</strong> : demander à la personne qui maîtrise la tâche de la décrire, à l'oral (dictée) ou par écrit, sans souci de forme. Pour aider, l'IA peut d'abord produire une liste de questions à poser : « Quelles questions dois-je poser à une assistante pour formaliser la procédure d'ouverture d'un dossier client ? »</li>
<li><strong>Structurer avec l'IA</strong> selon un gabarit commun à toutes les fiches de l'entreprise.</li>
<li><strong>Faire relire par la personne qui réalise la tâche</strong> : elle corrige les étapes mal comprises, ajoute les cas particuliers.</li>
<li><strong>Faire valider par le responsable</strong>, dater, numéroter (version) et diffuser.</li>
<li><strong>Réviser</strong> à date fixe ou à chaque changement (nouvel outil, nouvelle règle).</li>
</ol>

<h4>Gabarit de fiche procédure</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu</th></tr>
<tr><td>Titre et référence</td><td>Intitulé, numéro, version, date, rédacteur, validateur</td></tr>
<tr><td>Objet et champ d'application</td><td>À quoi sert la procédure, dans quels cas elle s'applique</td></tr>
<tr><td>Acteurs</td><td>Qui fait quoi (rôles, pas seulement des noms)</td></tr>
<tr><td>Déclencheur</td><td>L'événement qui lance la procédure</td></tr>
<tr><td>Étapes numérotées</td><td>Verbe d'action, outil, document, délai</td></tr>
<tr><td>Points de contrôle</td><td>Vérifications indispensables avant de passer à l'étape suivante</td></tr>
<tr><td>Cas particuliers</td><td>Exceptions et conduite à tenir</td></tr>
<tr><td>Documents et outils associés</td><td>Modèles, logiciels, dossiers partagés</td></tr>
<tr><td>Historique des versions</td><td>Date et nature des modifications</td></tr>
</table>

<h4>Exemple Thermia Rénov – avant / après</h4>
<p><strong>Explication de Julie (dictée, extrait) :</strong> « Quand un devis est signé, je crée le dossier dans le logiciel, je mets le devis signé dedans, j'envoie le mail de confirmation, je regarde s'il manque des papiers, Thomas me donne une date, j'envoie le mail avec la date, et je mets dans le planning partagé. S'il y a un acompte je vérifie qu'il est arrivé avant de commander le matériel. »</p>
<p><strong>Fiche générée puis relue (extrait) :</strong></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Étape</th><th>Acteur</th><th>Outil / document</th><th>Point de contrôle</th></tr>
<tr><td>1</td><td>Créer le dossier client dans le logiciel de gestion</td><td>Assistante administrative</td><td>Logiciel de gestion</td><td>Référence du dossier conforme à la nomenclature</td></tr>
<tr><td>2</td><td>Enregistrer le devis signé dans le dossier</td><td>Assistante administrative</td><td>Devis signé (PDF)</td><td>Signature et date présentes</td></tr>
<tr><td>3</td><td>Envoyer le mail de confirmation de commande</td><td>Assistante administrative</td><td>Modèle de mail M-02</td><td>Coordonnées vérifiées</td></tr>
<tr><td>4</td><td>Vérifier les pièces du dossier et demander les manquantes</td><td>Assistante administrative</td><td>Liste des pièces, modèle M-05</td><td>Liste complète</td></tr>
<tr><td>5</td><td>Vérifier la réception de l'acompte, s'il est prévu, avant toute commande de matériel</td><td>Assistante administrative</td><td>Relevé bancaire</td><td>Acompte encaissé</td></tr>
<tr><td>6</td><td>Obtenir une date d'intervention</td><td>Conducteur de travaux</td><td>Planning</td><td>Date compatible avec la livraison du matériel</td></tr>
<tr><td>7</td><td>Informer le client de la date et l'inscrire au planning partagé</td><td>Assistante administrative</td><td>Modèle M-03, planning partagé</td><td>Date confirmée par le client</td></tr>
</table>
<p>À la relecture, Julie a corrigé un point : l'outil avait placé la vérification de l'acompte après la commande du matériel, contrairement à la pratique réelle. Il avait aussi ajouté une étape « Envoyer le dossier de demande d'aide à l'organisme » que Julie ne réalise pas elle-même : elle l'a remplacée par un renvoi vers la procédure spécifique, rédigée par la personne compétente.</p>

<blockquote><strong>Bonne pratique :</strong> demandez à l'IA, après la génération, de lister les « questions à poser au rédacteur pour compléter la procédure » (cas particuliers, délais, que faire si…). Cette liste fait souvent apparaître les angles morts d'une pratique jamais formalisée.</blockquote>

<h3>Le mode opératoire : la procédure vue du poste de travail</h3>
<p>La fiche procédure décrit un enchaînement d'étapes entre plusieurs acteurs ; le mode opératoire détaille <strong>comment réaliser une tâche précise</strong> à un poste (par exemple « Préparer le kit de mise en service d'une pompe à chaleur » ou « Archiver un dossier client clôturé »). L'IA peut proposer une rédaction à l'impératif, en étapes courtes, avec les points de sécurité en tête. Pour les modes opératoires techniques, la source fait foi : notice du fabricant, règles de l'art, consignes de sécurité de l'entreprise. L'outil ne doit ni inventer une valeur de réglage, ni « simplifier » une consigne de sécurité.</p>

<h3>La FAQ : partir des vraies questions</h3>
<p>Une FAQ utile répond aux questions <strong>réellement posées</strong> par les clients ou les salariés, et non aux questions que l'entreprise aimerait qu'on lui pose. L'IA intervient à trois moments :</p>
<ul>
<li><strong>Regrouper</strong> les questions recueillies (mails, appels, rendez-vous), pseudonymisées, en thèmes, et éliminer les doublons.</li>
<li><strong>Rédiger</strong> des réponses courtes et claires à partir des éléments fournis par l'entreprise.</li>
<li><strong>Reformuler</strong> pour un public non spécialiste.</li>
</ul>
<p>Le contenu des réponses provient de l'entreprise (ses pratiques, ses délais, ses garanties) ou de sources officielles vérifiées, jamais de la seule « connaissance » de l'outil.</p>

<h4>Exemple Thermia Rénov – une question de la FAQ client</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Version générée sans matière</th><th>Version validée</th></tr>
<tr><td><strong>Combien vais-je économiser avec une pompe à chaleur ?</strong><br/>Une pompe à chaleur permet d'économiser jusqu'à 75 % sur votre facture de chauffage et se rembourse en moins de 5 ans grâce aux aides de l'État.</td><td><strong>Combien vais-je économiser avec une pompe à chaleur ?</strong><br/>Les économies dépendent de votre logement (isolation, surface, émetteurs), de votre énergie actuelle, de vos usages et du prix des énergies. Nous ne pouvons pas annoncer de chiffre général. Lors de la visite technique, nous établissons une estimation pour votre logement, en précisant ses hypothèses. Pour un avis indépendant, vous pouvez aussi consulter un conseiller du service public France Rénov'.</td></tr>
</table>
<p>La version générée sans matière contient une promesse chiffrée invérifiable et une affirmation sur les aides qui peut être fausse ; la version validée est honnête, utile et oriente vers une source indépendante. C'est aussi un argument commercial : elle inspire confiance.</p>

<h3>FAQ interne et assistant personnalisé</h3>
<p>Une FAQ interne (questions des salariés sur les outils, les congés, les procédures) peut servir de base de connaissance à un assistant personnalisé (chapitre 2), si l'outil choisi par l'entreprise le permet et si les documents ne contiennent pas de données sensibles. L'assistant ne sera fiable que si la base est exacte et à jour : désignez un responsable de sa mise à jour et indiquez dans chaque fiche sa date de dernière révision.</p>

<blockquote><strong>À retenir.</strong> L'IA accélère la formalisation des savoir-faire : recueillez la pratique réelle, structurez-la selon un gabarit commun, faites-la relire par la personne qui réalise la tâche, validez, versionnez et révisez. Une FAQ part des vraies questions et ses réponses s'appuient sur les informations de l'entreprise et des sources officielles vérifiées, jamais sur des chiffres généraux inventés par l'outil.</blockquote>
`,
      },
      {
        title: "3.5 – Posts pour les réseaux sociaux et articles de site",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Utiliser l'IA pour planifier et rédiger des publications adaptées à chaque réseau social.</li>
<li>Rédiger un article de site utile, structuré et lisible, sans contenu générique ni affirmation non vérifiée.</li>
<li>Préserver l'authenticité de la communication de l'entreprise : faits réels, chantiers réels, voix propre.</li>
</ul>

<h3>Ce que l'IA change dans la communication d'une PME</h3>
<p>Beaucoup de TPE et PME du bâtiment savent qu'elles devraient publier régulièrement, mais manquent de temps et d'idées. Sandrine MOREL publiait trois fois par an sur la page de Thermia Rénov. L'IA lève deux freins : le syndrome de la page blanche (proposer des idées, un calendrier, des accroches) et le temps de rédaction (un premier jet en quelques secondes). Elle crée en revanche un risque nouveau : celui d'une communication <strong>générique</strong>, identique à celle de centaines d'entreprises qui utilisent les mêmes outils avec les mêmes requêtes, voire <strong>trompeuse</strong> si elle reprend sans contrôle des chiffres et des promesses.</p>
<p>La règle d'or : <strong>l'IA met en forme, l'entreprise fournit la substance</strong>. Une photo réelle d'un chantier terminé, un témoignage authentique recueilli avec l'accord du client, une astuce concrète de Thomas sur l'entretien d'une pompe à chaleur valent mieux que dix textes généraux sur « la transition énergétique ».</p>

<h3>Construire un calendrier éditorial avec l'IA</h3>
<blockquote><strong>Requête :</strong> Tu es chargé de communication pour une PME de rénovation énergétique de 14 salariés dans le Rhône, qui veut être perçue comme sérieuse, pédagogique et proche de ses clients. Propose un calendrier de publications pour les trois prochains mois, à raison d'une publication par semaine, sur une page professionnelle et un réseau grand public. Pour chaque semaine : thème, type de contenu (conseil, coulisses, réalisation, question fréquente, équipe), idée de visuel réel à prendre par l'équipe. Contraintes : pas de chiffres d'économies, pas d'annonce sur les aides financières, pas de promotion de prix.</blockquote>
<p>Le calendrier obtenu sert de base de discussion en réunion d'équipe : on conserve les idées réalistes, on écarte celles qui ne correspondent pas à l'activité, on désigne qui prend les photos.</p>

<h3>Adapter le contenu à chaque réseau</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Réseau (exemples)</th><th>Public et usage</th><th>Format conseillé</th><th>Requête type</th></tr>
<tr><td>Réseau professionnel (LinkedIn)</td><td>Partenaires, prescripteurs, syndics, entreprises, futurs salariés</td><td>Texte de 600 à 1 200 caractères, ton expert et sobre, une idée par publication</td><td>« Rédige une publication professionnelle à partir de ce retour d'expérience… »</td></tr>
<tr><td>Réseau grand public (Facebook)</td><td>Particuliers du secteur géographique</td><td>Texte court, ton chaleureux, photo réelle, question ouverte</td><td>« Rédige un texte court et convivial pour présenter ce chantier terminé… »</td></tr>
<tr><td>Réseau visuel (Instagram)</td><td>Public plus jeune, inspiration</td><td>Visuel avant/après, légende brève, quelques mots-clés</td><td>« Propose trois légendes de moins de 200 caractères pour cette photo… »</td></tr>
<tr><td>Fiche d'établissement en ligne</td><td>Personnes qui cherchent un artisan près de chez elles</td><td>Actualité courte, informations pratiques exactes</td><td>« Rédige une actualité de 300 caractères annonçant… »</td></tr>
</table>
<p>Demandez toujours plusieurs variantes et choisissez celle qui ressemble le plus à la manière dont l'entreprise s'exprime. Supprimez les emojis en excès, les points d'exclamation multiples, les formules toutes faites (« Vous rêvez d'un intérieur douillet ? ») et les mots-clés hors sujet.</p>

<h4>Exemple Thermia Rénov – avant / après</h4>
<p><strong>Requête initiale :</strong> « Fais un post Facebook sur nos pompes à chaleur. »</p>
<p><strong>Résultat (extrait) :</strong></p>
<blockquote>« Marre des factures qui explosent ? Avec nos pompes à chaleur dernière génération, divisez votre facture par 3 ! Profitez des aides de l'État jusqu'à 90 % du montant des travaux. Installation en 24 h, satisfaction garantie. Contactez-nous vite, offre limitée ! »</blockquote>
<p>Ce texte, typique d'une requête sans matière, enchaîne les promesses invérifiables (facture divisée par trois, aides jusqu'à 90 %), une garantie non définie, un délai irréaliste et une urgence artificielle. Il ressemble aux messages de démarchage dont le public se méfie.</p>
<p><strong>Requête retravaillée :</strong> « Rédige un texte court et chaleureux pour notre page Facebook, présentant un chantier terminé : remplacement d'une chaudière fioul par une pompe à chaleur air/eau dans une maison des années 1970 à Brignais (le client a donné son accord pour la photo de l'unité extérieure, sans son nom ni son adresse). Ce que le client nous a dit à la fin du chantier : « On n'a plus à surveiller la cuve et la maison est plus agréable. » Mentionne que l'équipe a aussi retiré l'ancienne cuve. Invite les lecteurs à poser leurs questions en commentaire. Pas de chiffre d'économie, pas d'aide, pas de promotion. 80 mots maximum. »</p>
<p><strong>Résultat validé :</strong></p>
<blockquote>« Chantier terminé à Brignais ! Dans cette maison des années 1970, notre équipe a remplacé l'ancienne chaudière fioul par une pompe à chaleur air/eau, et retiré la cuve. Le mot de nos clients à la fin du chantier : « On n'a plus à surveiller la cuve et la maison est plus agréable. » Merci à eux pour leur confiance. Vous vous posez des questions sur ce type de projet ? Posez-les en commentaire, Thomas, notre conducteur de travaux, vous répondra. »</blockquote>

<h3>Témoignages, photos et accord des clients</h3>
<ul>
<li>Un témoignage est publié avec l'<strong>accord écrit</strong> du client, idéalement sur un formulaire qui précise les supports et la durée de diffusion ; il doit être authentique : l'IA peut corriger l'orthographe d'une citation avec l'accord de son auteur, pas l'enjoliver.</li>
<li>Une photo de chantier ne doit pas permettre d'identifier le domicile (numéro de rue, plaque, visage) sans accord.</li>
<li>Les publications réalisées en partenariat avec une marque (fabricant, distributeur) ou contre un avantage doivent faire apparaître clairement leur caractère commercial.</li>
</ul>

<h3>L'article de site : utile, structuré, vérifié</h3>
<p>Un article de site (rubrique « Conseils » ou « Actualités ») vise à répondre à une question que se posent les clients potentiels et à démontrer la compétence de l'entreprise. Les moteurs de recherche valorisent de plus en plus les contenus qui apportent une expérience et une expertise réelles, et pénalisent les textes produits en masse sans valeur ajoutée. Un article entièrement généré, sans relecture ni apport propre, est donc doublement contre-productif.</p>
<h4>Méthode en six étapes</h4>
<ol>
<li><strong>Choisir une question réelle</strong> (issue de la FAQ, section 3.4) : « Faut-il isoler avant d'installer une pompe à chaleur ? »</li>
<li><strong>Faire produire un plan</strong> par l'IA, puis l'amender : titres, sous-titres, idée principale de chaque partie.</li>
<li><strong>Apporter la matière propre</strong> : l'expérience de Thomas, un exemple de chantier anonymisé, les points de vigilance que l'équipe constate.</li>
<li><strong>Faire rédiger</strong> partie par partie, en imposant un niveau de langue accessible et des paragraphes courts.</li>
<li><strong>Vérifier chaque affirmation factuelle</strong> sur une source primaire (chapitre 4) et citer cette source dans l'article lorsqu'il s'agit d'une règle ou d'un dispositif public.</li>
<li><strong>Relire, titrer, illustrer, dater</strong> : un article sur un sujet réglementaire doit indiquer sa date de mise à jour.</li>
</ol>

<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément de l'article</th><th>Rôle de l'IA</th><th>Rôle de l'entreprise</th></tr>
<tr><td>Titre et chapô</td><td>Proposer cinq titres et deux chapôs</td><td>Choisir, vérifier que le titre ne promet rien d'excessif</td></tr>
<tr><td>Plan</td><td>Proposer une structure logique</td><td>Ajouter ce que l'équipe sait de terrain</td></tr>
<tr><td>Corps du texte</td><td>Rédiger à partir de la matière fournie</td><td>Vérifier, corriger, personnaliser</td></tr>
<tr><td>Encadré « À retenir »</td><td>Résumer en trois points</td><td>Valider</td></tr>
<tr><td>Sources</td><td>Ne pas lui faire confiance pour les citer</td><td>Retrouver et citer les sources officielles consultées</td></tr>
<tr><td>Description pour les moteurs de recherche</td><td>Proposer une description de 150 caractères</td><td>Valider</td></tr>
</table>

<blockquote><strong>Bonne pratique :</strong> constituez une « fiche identité éditoriale » de l'entreprise (valeurs, ton, mots à employer et à éviter, interdits, exemples de textes réussis) et collez-la au début de chaque requête de communication, ou intégrez-la dans un assistant personnalisé. Vos contenus gagneront en cohérence et ressembleront davantage à votre entreprise qu'à un texte standard.</blockquote>

<h3>Faut-il indiquer qu'un texte a été rédigé avec l'IA ?</h3>
<p>Pour un post ou un article rédigé avec l'aide de l'IA puis relu, corrigé et assumé par l'entreprise, il n'existe pas aujourd'hui d'obligation générale d'affichage. Les obligations de transparence du règlement européen sur l'IA, applicables à partir du 2 août 2026, visent notamment les contenus de synthèse susceptibles d'induire en erreur (images, sons ou vidéos réalistes de type « hypertrucage ») et les textes générés publiés pour informer le public sur des questions d'intérêt général sans relecture ni responsabilité éditoriale humaine ; leur portée exacte est détaillée au chapitre consacré à la conformité (C5), et les lignes directrices de la Commission sont à suivre. Indépendamment du droit, la transparence vis-à-vis des clients est une question de confiance : la charte interne de l'entreprise peut prévoir une règle simple.</p>

<blockquote><strong>À retenir.</strong> En communication, l'IA met en forme et l'entreprise fournit la substance : chantiers réels, photos et témoignages autorisés, savoir-faire de l'équipe. Adaptez le format à chaque réseau, demandez plusieurs variantes, supprimez les formules toutes faites et les promesses. Un article de site part d'une question réelle, s'appuie sur l'expérience de l'équipe, vérifie chaque affirmation sur une source primaire et indique sa date de mise à jour.</blockquote>
`,
      },
      {
        title: "3.6 – Adapter le ton, le registre et le message à la cible",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Identifier les paramètres d'un message adapté : destinataire, relation, niveau d'expertise, état émotionnel, canal.</li>
<li>Formuler des consignes de ton précises plutôt que des adjectifs vagues.</li>
<li>Décliner un même contenu pour plusieurs cibles (particulier, syndic, partenaire, salarié) avec l'IA.</li>
</ul>

<h3>Le ton n'est pas un détail</h3>
<p>Le même message (« le chantier commence lundi ») ne s'écrit pas de la même manière à un particulier inquiet, à un gestionnaire de copropriété qui suit vingt immeubles ou à un sous-traitant. Le ton conditionne la compréhension, la confiance et l'action. Les assistants d'IA excellent dans l'adaptation de ton, à condition de leur donner des consignes <strong>précises</strong> : « professionnel » ou « sympathique » sont des mots trop vagues, qui produisent des textes convenus.</p>

<h3>Les cinq paramètres de la cible</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Paramètre</th><th>Question</th><th>Effet sur le texte</th></tr>
<tr><td>Relation</td><td>Premier contact, client fidèle, partenaire, collègue ?</td><td>Formule d'appel, vouvoiement ou tutoiement, degré de familiarité</td></tr>
<tr><td>Expertise</td><td>Le destinataire connaît-il le vocabulaire technique ?</td><td>Termes techniques expliqués, simplifiés ou conservés</td></tr>
<tr><td>État émotionnel</td><td>Inquiet, mécontent, pressé, enthousiaste ?</td><td>Empathie, sobriété, rassurance factuelle</td></tr>
<tr><td>Besoin</td><td>Que cherche-t-il : une information, une décision, une garantie ?</td><td>Ordre des informations, niveau de détail</td></tr>
<tr><td>Canal et contexte de lecture</td><td>Lecture sur téléphone, impression, transfert en interne ?</td><td>Longueur, mise en forme, autonomie du texte</td></tr>
</table>

<h3>Des consignes de ton précises</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Consigne vague</th><th>Consigne précise</th></tr>
<tr><td>« Ton professionnel »</td><td>« Vouvoiement, phrases courtes, pas de jargon, pas d'exclamation, une seule formule de politesse à la fin »</td></tr>
<tr><td>« Ton sympathique »</td><td>« Chaleureux mais sobre : remercier une fois, une touche personnelle liée au chantier, pas de superlatifs »</td></tr>
<tr><td>« Simplifie »</td><td>« Écris pour une personne qui n'a jamais entendu parler de pompe à chaleur ; explique chaque terme technique en une phrase ; 8 à 15 mots par phrase »</td></tr>
<tr><td>« Sois rassurant »</td><td>« Rassure par des faits (étapes, interlocuteur, délais confirmés), jamais par des promesses ou des garanties non prévues au contrat »</td></tr>
<tr><td>« Ferme »</td><td>« Neutre et factuel : rappeler les engagements du devis signé, la date, ce qui est attendu ; aucune formule agressive, aucune menace »</td></tr>
</table>
<p>Vous pouvez aussi fournir un <strong>exemple de texte</strong> dont vous appréciez le ton (un mail réussi de Julie, anonymisé) et demander : « Rédige dans le même style que cet exemple. » C'est souvent plus efficace qu'une longue description.</p>

<h3>Une information, quatre cibles</h3>
<p>Thermia Rénov doit annoncer le début de travaux d'isolation des combles dans une résidence de huit logements (fictive), décidés en assemblée générale. Julie demande à l'IA quatre déclinaisons d'un même contenu de base, puis les relit.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Cible</th><th>Consignes données</th><th>Extrait du texte validé</th></tr>
<tr><td>Gestionnaire du syndic</td><td>Formel, concis, références précises, informations utiles pour transmettre aux copropriétaires</td><td>« Madame, conformément à la résolution adoptée lors de l'assemblée générale du [DATE], nos équipes interviendront du [DATE_DÉBUT] au [DATE_FIN] pour l'isolation des combles de la résidence [NOM]. Vous trouverez ci-joint l'avis d'intervention à afficher dans le hall. »</td></tr>
<tr><td>Résidents (affichage)</td><td>Simple, pratique, lisible en 20 secondes</td><td>« Travaux d'isolation des combles du [DATE_DÉBUT] au [DATE_FIN], de 8 h à 17 h. Un accès aux combles par la cage d'escalier B sera nécessaire. Merci de votre compréhension. Contact : [TÉLÉPHONE_AGENCE]. »</td></tr>
<tr><td>Équipe de pose</td><td>Interne, opérationnel, liste</td><td>« Chantier [RÉF] – début [DATE_DÉBUT] 8 h. Accès combles : trappe cage B, clé chez le gardien. Stationnement : deux places réservées côté rue. Balisage obligatoire du palier. »</td></tr>
<tr><td>Publication sur la page de l'entreprise (après la fin du chantier, avec l'accord du syndic)</td><td>Valoriser le chantier sans identifier la résidence</td><td>« Mission accomplie pour l'isolation des combles d'une petite copropriété de l'ouest lyonnais, en coordination avec le syndic et les résidents. Merci à tous pour leur accueil. »</td></tr>
</table>

<h3>Lisibilité et accessibilité</h3>
<p>Une partie de vos destinataires lit difficilement : personnes âgées, personnes maîtrisant mal le français, personnes en situation de handicap, lecteurs pressés sur téléphone. Les principes du « Facile à lire et à comprendre » (phrases courtes, une idée par phrase, mots courants, informations importantes en premier) peuvent être demandés à l'IA : « Réécris ce courrier pour qu'il soit compréhensible par une personne qui lit difficilement le français. » Relisez ensuite pour vérifier que la simplification n'a rien supprimé d'important (date, document à fournir, droit du client).</p>

<h3>Écrire dans une autre langue</h3>
<p>Les assistants traduisent et rédigent dans de nombreuses langues avec un bon niveau. Pour un client non francophone, une traduction générée peut faciliter l'échange, à deux conditions : faire relire un document important par une personne qui maîtrise la langue lorsque c'est possible, et conserver la version française comme version de référence pour tout document contractuel (devis, contrat, procès-verbal).</p>

<blockquote><strong>Bonne pratique :</strong> demandez à l'outil de jouer le rôle du destinataire avant l'envoi : « Tu es [cible]. Lis ce message et dis-moi ce que tu comprends, ce qui t'inquiète et ce qui te manque. » Cette relecture critique simulée, vue au chapitre 2, fait apparaître les ambiguïtés et les tournures maladroites.</blockquote>

<h3>Les excès de style à corriger</h3>
<p>Les textes générés présentent des tics reconnaissables, qui nuisent à leur crédibilité lorsqu'ils s'accumulent :</p>
<ul>
<li>superlatifs et adjectifs creux (« solution innovante et performante », « accompagnement sur mesure ») ;</li>
<li>formules d'introduction ou de conclusion convenues (« Dans un monde en constante évolution… », « N'hésitez surtout pas… ») ;</li>
<li>énumérations systématiques par trois ;</li>
<li>anglicismes ou tournures traduites (« adresser un problème » pour « traiter un problème ») ;</li>
<li>longueur excessive : un mail de 250 mots là où 80 suffisent.</li>
</ul>
<p>Une consigne finale efficace : « Supprime toutes les phrases qui n'apportent pas d'information au destinataire. »</p>

<blockquote><strong>À retenir.</strong> Adapter un message, c'est tenir compte de la relation, de l'expertise, de l'état émotionnel, du besoin et du canal du destinataire. Remplacez les adjectifs vagues par des consignes précises ou par un exemple de texte de référence, déclinez un même contenu pour chaque cible, simplifiez sans rien perdre d'essentiel et faites relire le message par l'outil dans le rôle du destinataire avant de l'envoyer.</blockquote>
`,
      },
      {
        title: "3.7 – Mentions obligatoires, promesses invérifiables et relecture humaine systématique",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Identifier les mentions qu'un écrit professionnel doit comporter selon sa nature, et vérifier leur présence dans un texte généré.</li>
<li>Repérer et supprimer les promesses invérifiables, en particulier sur les aides financières et les économies d'énergie.</li>
<li>Mettre en place une relecture humaine systématique, outillée par une liste de contrôle.</li>
</ul>

<h3>Pourquoi l'IA « oublie » les mentions et « ajoute » des promesses</h3>
<p>Un grand modèle de langage produit le texte le plus probable compte tenu de ce qu'il a lu pendant son entraînement. Or une grande partie des textes commerciaux disponibles sur internet sont publicitaires : ils mettent en avant des bénéfices spectaculaires et relèguent les conditions en petits caractères, quand ils ne les omettent pas. L'outil reproduit donc spontanément ce style. Par ailleurs, il ignore vos obligations particulières (qualification RGE et ses domaines, assurance, conditions générales de vente) et la date de ses connaissances peut être antérieure à la dernière modification d'un dispositif. Résultat : <strong>les mentions nécessaires manquent et les promesses abondent</strong>. C'est à vous de rétablir l'équilibre.</p>

<h3>Les mentions à vérifier selon le type d'écrit</h3>
<p>Les règles précises dépendent de la nature du document et évoluent ; le tableau ci-dessous donne les points de vigilance essentiels. En cas de doute, référez-vous aux sources officielles (service-public.fr pour les entreprises, site de la DGCCRF, site de la CNIL) ou à votre conseil habituel.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type d'écrit</th><th>Points de vigilance</th></tr>
<tr><td>Tout écrit professionnel</td><td>Identification claire de l'entreprise et de l'expéditeur, coordonnées exactes, exactitude des informations</td></tr>
<tr><td>Mail de prospection</td><td>Identification de l'expéditeur, objet non trompeur, moyen simple de s'opposer à la réception de nouveaux messages ; envers des particuliers, la prospection par courriel suppose en principe leur consentement préalable, sauf exceptions encadrées (voir les recommandations de la CNIL) ; information sur le traitement des données personnelles</td></tr>
<tr><td>Devis, facture (rédigés dans le logiciel de l'entreprise, jamais par l'IA)</td><td>Mentions légales du devis et de la facture, assurance professionnelle obligatoire pour les travaux concernés (assureur, couverture géographique), qualification affichée exacte et limitée aux domaines réellement couverts, durée de validité, conditions de paiement</td></tr>
<tr><td>Contrat conclu à distance ou hors établissement</td><td>Information sur le droit de rétractation et formulaire associé, selon les règles du Code de la consommation</td></tr>
<tr><td>Publication commerciale, article de site</td><td>Identification de l'annonceur, caractère commercial apparent d'un contenu sponsorisé ou réalisé en partenariat, conditions d'une offre clairement indiquées, absence d'allégation trompeuse</td></tr>
<tr><td>Allégation environnementale (« écologique », « neutre en carbone »)</td><td>Allégation précise, justifiable et proportionnée ; les allégations générales non étayées sont à proscrire</td></tr>
<tr><td>Site internet</td><td>Mentions légales, politique de confidentialité, informations sur le médiateur de la consommation pour les relations avec les particuliers</td></tr>
</table>

<blockquote><strong>Bonne pratique :</strong> ne demandez pas à l'IA de « rédiger les mentions légales » de vos devis ou de vos conditions générales. Ces textes engagent l'entreprise : ils sont établis une fois pour toutes avec un professionnel ou à partir des sources officielles, puis intégrés dans vos modèles. L'IA peut en revanche vous aider à <em>vérifier</em> qu'un texte qu'elle a produit ne contredit pas vos conditions générales, si vous les lui fournissez.</blockquote>

<h3>Les promesses invérifiables : la ligne rouge</h3>
<p>Dans la rénovation énergétique, deux sujets concentrent les dérives : les <strong>aides financières</strong> et les <strong>économies d'énergie</strong>. Ce sont aussi les sujets sur lesquels les autorités de contrôle et les associations de consommateurs sont les plus attentives, après des années de fraudes et de démarchage abusif (le démarchage téléphonique pour les travaux de rénovation énergétique est d'ailleurs interdit). Une pratique commerciale est trompeuse lorsqu'elle repose sur des allégations fausses ou de nature à induire en erreur, notamment sur les caractéristiques, le prix ou les avantages d'un produit ou d'un service : une promesse générée par l'IA et publiée par l'entreprise est une promesse de l'entreprise.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Formulation à proscrire</th><th>Pourquoi</th><th>Formulation acceptable</th></tr>
<tr><td>« Jusqu'à 90 % de vos travaux financés par l'État »</td><td>Montant dépendant des revenus, du logement, du dispositif et des barèmes en vigueur ; effet d'appel trompeur</td><td>« Selon votre situation, des aides publiques peuvent réduire le coût de vos travaux. Nous vous aidons à identifier les dispositifs auxquels vous pourriez prétendre, sous réserve d'éligibilité. »</td></tr>
<tr><td>« Divisez votre facture par trois »</td><td>Résultat non calculé, dépendant du logement, des usages, du prix des énergies</td><td>« Lors de la visite technique, nous estimons les économies possibles pour votre logement et vous en présentons les hypothèses. »</td></tr>
<tr><td>« Isolation à 1 euro », « travaux gratuits »</td><td>Dispositifs de ce type supprimés ou modifiés ; formule historiquement associée aux fraudes</td><td>À ne pas utiliser</td></tr>
<tr><td>« Agréé par l'État », « partenaire officiel France Rénov' »</td><td>Laisse croire à une mission de service public ; France Rénov' est un service public indépendant des entreprises</td><td>« Entreprise qualifiée RGE pour [domaines exacts] » et, si utile, « Pour un conseil neutre, contactez France Rénov' »</td></tr>
<tr><td>« Aides garanties », « prime assurée »</td><td>L'attribution relève de l'organisme qui instruit le dossier</td><td>« Le montant définitif est fixé par l'organisme instructeur. »</td></tr>
<tr><td>« Dernière chance avant la fin des aides »</td><td>Urgence artificielle, souvent fausse</td><td>Information datée et sourcée si un changement officiel est réellement annoncé</td></tr>
<tr><td>« Rentabilisé en 4 ans »</td><td>Temps de retour dépendant de nombreuses hypothèses</td><td>Temps de retour calculé pour le projet, avec ses hypothèses, présenté comme une estimation</td></tr>
</table>

<h4>Exemple Thermia Rénov – la consigne permanente</h4>
<p>Sandrine MOREL a fait ajouter dans toutes les requêtes socles de l'entreprise le paragraphe suivant, que chacun colle en fin de requête :</p>
<blockquote>« Contraintes permanentes : n'invente aucun fait, chiffre, date, prix ou délai. N'annonce aucun montant ni pourcentage d'aide, aucune économie chiffrée, aucun temps de retour, aucune garantie non mentionnée ici. N'emploie pas les mots « gratuit », « garanti », « officiel », « agréé ». Si une information manque, écris [À COMPLÉTER]. »</blockquote>
<p>Cette consigne réduit fortement les dérives, sans les supprimer : la relecture reste indispensable.</p>

<h3>La relecture humaine systématique</h3>
<p>Aucun écrit généré ne part sans avoir été relu en entier par une personne qui en connaît le sujet. Le niveau de contrôle se proportionne à l'enjeu :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Niveau</th><th>Exemples</th><th>Contrôle</th></tr>
<tr><td>Faible enjeu</td><td>Mail interne, confirmation de rendez-vous, note pour soi</td><td>Relecture par l'auteur</td></tr>
<tr><td>Enjeu moyen</td><td>Mail client, relance, compte rendu de chantier, post</td><td>Relecture par l'auteur avec la liste de contrôle ; vérification des faits dans les documents internes</td></tr>
<tr><td>Enjeu fort</td><td>Réponse à réclamation, courrier contestant une facture, article de site sur un sujet réglementaire, communication sur les aides</td><td>Relecture par l'auteur puis validation par un responsable ; vérification des sources primaires</td></tr>
</table>

<h4>Liste de contrôle avant envoi</h4>
<ol>
<li><strong>Destinataire et objectif</strong> : le texte répond-il au besoin réel du destinataire ? L'action attendue est-elle claire ?</li>
<li><strong>Faits</strong> : chaque nom, date, montant, délai, référence a-t-il été vérifié dans un document interne ou une source primaire ?</li>
<li><strong>Ajouts</strong> : le texte contient-il une information que je n'ai pas fournie à l'outil ? Si oui, est-elle exacte et utile, ou faut-il la supprimer ?</li>
<li><strong>Promesses</strong> : aucune aide, économie, garantie, remise ou délai non validé ?</li>
<li><strong>Mentions</strong> : les mentions nécessaires au type d'écrit sont-elles présentes ?</li>
<li><strong>Données personnelles</strong> : les crochets ont-ils été remplacés dans la messagerie, et seulement là ? Aucune information superflue sur le client ?</li>
<li><strong>Ton</strong> : adapté à la cible ? Pas de formule creuse, d'excès d'exclamations, d'anglicisme ?</li>
<li><strong>Forme</strong> : orthographe, mise en page, pièces jointes, signature ?</li>
</ol>

<blockquote><strong>Bonne pratique :</strong> imprimez la liste de contrôle ou épinglez-la à côté de votre écran pendant les premières semaines. Au bout d'un mois, elle devient un réflexe. Chez Thermia Rénov, chaque salarié note pendant deux semaines les erreurs trouvées à la relecture ; la synthèse, présentée en réunion d'équipe, a permis d'améliorer les requêtes socles.</blockquote>

<blockquote><strong>À retenir.</strong> L'IA reproduit le style publicitaire dominant : elle oublie les mentions nécessaires et ajoute des promesses. Vérifiez les mentions propres à chaque type d'écrit, laissez les devis, factures et conditions générales à vos modèles validés, proscrivez toute promesse sur les aides et les économies d'énergie, intégrez une consigne permanente dans vos requêtes et relisez systématiquement avec une liste de contrôle, avec validation par un responsable pour les écrits à fort enjeu.</blockquote>
`,
      },
      {
        title: "3.8 – Quiz de fin de chapitre",
        content: `
<p>Pour chaque question, une seule réponse est correcte. Le corrigé figure après chaque question.</p>

<h4>Question 1 – Dans la méthode en cinq temps, quelle étape est la plus souvent négligée et provoque le plus d'inventions de la part de l'outil ?</h4>
<ol type="A">
<li>Le choix de l'outil</li>
<li>La fourniture de la matière (faits vérifiés et pseudonymisés)</li>
<li>La mise en page finale</li>
<li>Le choix de la formule de politesse</li>
</ol>
<p><strong>Réponse : B.</strong> Lorsqu'il manque des faits, l'outil comble les vides par des éléments plausibles mais inventés (montants, dates, offres). Plus la matière fournie est précise, moins il invente.</p>

<h4>Question 2 – Julie veut rédiger une relance avec un assistant d'IA grand public. Quelle requête respecte les règles de confidentialité ?</h4>
<ol type="A">
<li>Elle colle le devis complet signé, avec le nom et l'adresse du client</li>
<li>Elle indique le nom du client et ses revenus pour personnaliser le mail</li>
<li>Elle décrit la situation avec des repères neutres ([CLIENT], [DATE]) et réintroduit les données dans sa messagerie</li>
<li>Elle transmet le numéro de téléphone du client pour que l'outil prépare aussi un SMS</li>
</ol>
<p><strong>Réponse : C.</strong> La pseudonymisation et la minimisation des données transmises sont les réflexes de base. Les données réelles sont réintroduites dans l'outil de messagerie, pas dans l'assistant.</p>

<h4>Question 3 – Une relance générée contient la phrase : « Profitez des aides avant leur suppression le mois prochain. » Que faites-vous ?</h4>
<ol type="A">
<li>Vous la conservez, elle crée une urgence utile</li>
<li>Vous la supprimez, sauf si un changement officiel daté est réellement annoncé et vérifié sur une source primaire</li>
<li>Vous la remplacez par « Les aides vont sûrement baisser »</li>
<li>Vous ajoutez un pourcentage d'aide pour la rendre plus précise</li>
</ol>
<p><strong>Réponse : B.</strong> Une urgence fabriquée sur les aides est trompeuse et nuit à la confiance. Seule une information vérifiée, datée et sourcée peut être communiquée.</p>

<h4>Question 4 – Dans une réponse à réclamation, quelle séquence est recommandée ?</h4>
<ol type="A">
<li>Se justifier, rappeler les conditions générales, clore</li>
<li>Accuser réception, reconnaître le ressenti, exposer les faits vérifiés, proposer une solution datée, conclure</li>
<li>Présenter des excuses pour tous les dommages allégués et offrir une remise</li>
<li>Demander au client de retirer son avis en ligne</li>
</ol>
<p><strong>Réponse : B.</strong> Reconnaître le ressenti n'est pas reconnaître une faute non établie ; tout geste commercial est validé par un responsable ; on ne fait pas pression sur un avis.</p>

<h4>Question 5 – Thomas fait mettre en forme ses notes de chantier. Quelle consigne réduit le plus le risque d'erreur ?</h4>
<ol type="A">
<li>« Rédige un compte rendu professionnel et complet »</li>
<li>« N'ajoute aucune information absente des notes ; signale entre crochets ce qui est à préciser »</li>
<li>« Complète avec les valeurs habituelles pour ce type de chantier »</li>
<li>« Rends le texte plus rassurant pour le client »</li>
</ol>
<p><strong>Réponse : B.</strong> Sans cette consigne, l'outil peut inventer des faits (épaisseur d'isolant, client informé). Un compte rendu peut servir de preuve : il doit rester fidèle aux constats.</p>

<h4>Question 6 – Dans un compte rendu de réunion, quelle confusion l'outil commet-il le plus souvent ?</h4>
<ol type="A">
<li>Confondre les prénoms des participants</li>
<li>Présenter une simple proposition comme une décision prise</li>
<li>Oublier la date de la réunion</li>
<li>Écrire au passé</li>
</ol>
<p><strong>Réponse : B.</strong> Il faut demander explicitement de distinguer décisions, propositions et points en suspens, et vérifier ce point à la relecture.</p>

<h4>Question 7 – Une réponse de FAQ générée indique : « Une pompe à chaleur permet d'économiser jusqu'à 75 % sur votre facture. » Quelle est la meilleure correction ?</h4>
<ol type="A">
<li>Remplacer 75 % par 50 % pour être plus prudent</li>
<li>Ajouter « selon une étude récente »</li>
<li>Expliquer que les économies dépendent du logement et des usages, qu'elles sont estimées lors de la visite technique avec leurs hypothèses, et orienter si besoin vers un conseil indépendant</li>
<li>Supprimer la question de la FAQ</li>
</ol>
<p><strong>Réponse : C.</strong> Un chiffre général non sourcé, même réduit, reste une promesse invérifiable ; attribuer une affirmation à une « étude » non identifiée aggrave le problème.</p>

<h4>Question 8 – Pour une publication présentant un chantier terminé, que faut-il obtenir du client ?</h4>
<ol type="A">
<li>Rien, si son nom n'apparaît pas</li>
<li>Son accord, de préférence écrit, pour la photo et le témoignage, en évitant tout élément permettant d'identifier son domicile sans accord</li>
<li>Seulement un avis positif en ligne</li>
<li>Une attestation sur l'honneur de satisfaction</li>
</ol>
<p><strong>Réponse : B.</strong> Le témoignage doit être authentique et autorisé ; la photo ne doit pas exposer l'adresse ou l'identité du client sans son accord.</p>

<h4>Question 9 – Laquelle de ces consignes de ton est la plus efficace ?</h4>
<ol type="A">
<li>« Sois professionnel »</li>
<li>« Sois sympa »</li>
<li>« Vouvoiement, phrases courtes, pas de jargon, rassurer par des faits (étapes, interlocuteur, délais confirmés), aucune promesse »</li>
<li>« Écris comme un expert »</li>
</ol>
<p><strong>Réponse : C.</strong> Une consigne de ton précise, qui décrit des caractéristiques observables du texte, produit un résultat plus juste qu'un adjectif vague. Un exemple de texte de référence est également très efficace.</p>

<h4>Question 10 – Qui est responsable d'un mail envoyé au client après avoir été rédigé avec un assistant d'IA ?</h4>
<ol type="A">
<li>L'éditeur de l'outil d'IA</li>
<li>Personne, puisque le texte a été généré automatiquement</li>
<li>L'expéditeur et l'entreprise au nom de laquelle il est envoyé</li>
<li>Le client, s'il ne conteste pas le contenu</li>
</ol>
<p><strong>Réponse : C.</strong> L'outil est un assistant : l'écrit engage son expéditeur et l'entreprise, d'où la relecture systématique et la validation des écrits à fort enjeu.</p>
`,
      },
      {
        title: "3.9 – Cas pratique corrigé : une matinée d'écrits chez Thermia Rénov",
        content: `
<h3>Contexte (fictif)</h3>
<p>Un mardi matin, Julie, assistante administrative chez Thermia Rénov, doit traiter quatre écrits avant midi. Sandrine MOREL lui demande de les produire avec l'assistant d'IA de l'entreprise (compte professionnel, paramètres de confidentialité vérifiés) et de lui présenter ses requêtes et ses corrections. Les éléments disponibles sont les suivants (tous fictifs) :</p>
<ul>
<li><strong>Écrit 1 – Réclamation.</strong> Mme Lambert écrit : « Votre technicien devait venir hier entre 8 h et 10 h pour l'entretien annuel de ma pompe à chaleur. J'ai posé une demi-journée de congé et personne n'est venu, sans prévenir. C'est inadmissible. » Vérification faite : le technicien était bloqué sur une panne urgente et le message d'annulation n'a pas été envoyé, par erreur. Sandrine MOREL valide un nouveau créneau prioritaire au choix de la cliente (jeudi 8 h ou vendredi 14 h) et la gratuité de cette visite d'entretien.</li>
<li><strong>Écrit 2 – Relance.</strong> M. Da Silva a reçu il y a quinze jours un devis d'isolation des murs par l'extérieur, après visite technique. Il avait demandé si le chantier nécessitait une déclaration préalable en mairie. Karim a vérifié : oui, une déclaration préalable est nécessaire, et l'entreprise peut l'aider à constituer le dossier. Le devis est valable jusqu'au [DATE_VALIDITE].</li>
<li><strong>Écrit 3 – Compte rendu.</strong> Notes de la réunion d'équipe de la veille : « Planning octobre : 9 chantiers, Thomas manque une équipe semaine 43. Karim propose de décaler le chantier C-12. Sandrine décide d'appeler l'intérimaire habituel. Nouvelle règle : photo avant/après obligatoire pour chaque chantier, Thomas. Julie : relancer les trois dossiers incomplets avant vendredi. Formation sécurité nacelle : date à trouver. »</li>
<li><strong>Écrit 4 – Publication.</strong> Thermia Rénov a terminé la semaine dernière l'isolation des combles d'une école maternelle d'une commune voisine, pendant les vacances scolaires. La mairie a donné son accord pour une publication avec une photo des combles (sans enfants, sans façade identifiable).</li>
</ul>

<h3>Consigne</h3>
<ol>
<li>Pour l'écrit 1, rédigez la requête complète (rôle, contexte, tâche, format, contraintes), puis le texte final du mail.</li>
<li>Pour l'écrit 2, rédigez la requête et indiquez trois éléments que la relecture doit vérifier en priorité.</li>
<li>Pour l'écrit 3, rédigez la requête et présentez le tableau des actions attendu.</li>
<li>Pour l'écrit 4, rédigez la requête et proposez un texte pour une page professionnelle.</li>
<li>Indiquez, pour chacun des quatre écrits, le niveau d'enjeu et le niveau de contrôle avant envoi.</li>
</ol>

<h3>Corrigé</h3>

<h4>1. Réclamation de Mme Lambert</h4>
<p><strong>Requête proposée :</strong></p>
<blockquote>« Tu es assistante administrative dans une PME de rénovation énergétique attachée à la qualité de service. Contexte : une cliente, [CLIENTE], attendait hier entre 8 h et 10 h notre technicien pour l'entretien annuel de sa pompe à chaleur ; il n'est pas venu, retenu par une panne urgente, et le message d'annulation ne lui a pas été envoyé par erreur de notre part. Elle avait posé une demi-journée de congé et elle est mécontente. Tâche : rédige une réponse par mail. Contenu : reconnaître clairement notre erreur de communication, présenter des excuses sincères, expliquer brièvement la cause sans se justifier longuement, proposer deux créneaux prioritaires (jeudi 8 h ou vendredi 14 h) au choix de la cliente, annoncer que cette visite d'entretien ne lui sera pas facturée. Format : objet + mail de 120 mots maximum, vouvoiement, signature [PRÉNOM] – Thermia Rénov. Contraintes : aucun autre geste commercial, pas de formule creuse, n'invente aucun fait. »</blockquote>
<p><strong>Texte final validé :</strong></p>
<blockquote><p>Objet : Votre rendez-vous d'entretien d'hier – nos excuses et deux créneaux prioritaires</p>
<p>Madame [NOM],</p>
<p>Vous avez attendu hier matin notre technicien, qui n'est pas venu : il a été retenu par une panne urgente et, par erreur de notre part, vous n'avez pas été prévenue. Nous vous présentons nos sincères excuses pour la demi-journée que vous avez perdue.</p>
<p>Nous vous proposons un créneau prioritaire, jeudi à 8 h ou vendredi à 14 h, selon votre préférence. Cette visite d'entretien ne vous sera pas facturée.</p>
<p>Il vous suffit de répondre à ce mail ou de m'appeler au [TÉLÉPHONE_AGENCE].</p>
<p>Avec nos excuses renouvelées,<br/>[PRÉNOM] – Thermia Rénov</p></blockquote>
<p><strong>Commentaire :</strong> ici, la faute est établie (absence de prévenance) : la reconnaître est juste et apaise la relation. Le geste (gratuité) a été validé par la dirigeante ; l'outil n'en ajoute pas d'autre.</p>

<h4>2. Relance de M. Da Silva</h4>
<p><strong>Requête proposée :</strong></p>
<blockquote>« Tu es commercial dans une PME de rénovation énergétique qui privilégie le conseil. Contexte : il y a quinze jours, j'ai remis à [CLIENT] un devis d'isolation des murs par l'extérieur après une visite technique. Il m'avait demandé si une déclaration préalable en mairie était nécessaire. Réponse vérifiée : oui ; nous pouvons l'aider à constituer le dossier. Tâche : rédige un mail qui répond à sa question et propose un échange. Format : objet + 100 mots maximum. Contraintes : rappeler que le devis est valable jusqu'au [DATE_VALIDITE] ; aucune mention d'aide, d'économie chiffrée, d'urgence ou de remise ; n'invente aucun délai d'instruction. »</blockquote>
<p><strong>Trois vérifications prioritaires à la relecture :</strong></p>
<ol>
<li>L'outil n'a pas ajouté de délai d'instruction de la déclaration préalable ni de règle d'urbanisme non vérifiée (par exemple sur un secteur protégé) : si le client demande un délai, on le vérifie sur une source officielle et auprès de la mairie.</li>
<li>La date de validité correspond à celle figurant sur le devis.</li>
<li>Aucune promesse (aides, économies, « démarches prises en charge intégralement ») ne s'est glissée dans le texte ; l'aide proposée est formulée exactement comme convenu (« nous pouvons vous aider à constituer le dossier »).</li>
</ol>

<h4>3. Compte rendu de la réunion d'équipe</h4>
<p><strong>Requête proposée :</strong> « Mets en forme ce compte rendu de réunion d'équipe : participants, points abordés, décisions, propositions, tableau des actions (action / responsable / échéance), points sans responsable ou sans échéance. Utilise uniquement les prénoms. Distingue strictement décisions et propositions. N'ajoute aucune information ; recopie les chiffres tels quels ; écris [À PRÉCISER] pour toute information manquante. »</p>
<p><strong>Tableau des actions attendu :</strong></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Action</th><th>Responsable</th><th>Échéance</th></tr>
<tr><td>Appeler l'intérimaire habituel pour renforcer le planning de la semaine 43</td><td>Sandrine</td><td>[À PRÉCISER]</td></tr>
<tr><td>Mettre en place la photo avant/après obligatoire pour chaque chantier</td><td>Thomas</td><td>[À PRÉCISER]</td></tr>
<tr><td>Relancer les trois dossiers incomplets</td><td>Julie</td><td>Vendredi</td></tr>
<tr><td>Trouver une date pour la formation sécurité nacelle</td><td>[À PRÉCISER]</td><td>[À PRÉCISER]</td></tr>
</table>
<p><strong>Points de vigilance :</strong> le décalage du chantier C-12 est une <em>proposition</em> de Karim, non une décision ; il ne figure pas dans le tableau des actions mais dans la rubrique « propositions ». La date de la formation et son responsable apparaissent comme points sans responsable : c'est une information utile pour la prochaine réunion.</p>

<h4>4. Publication sur l'isolation de l'école maternelle</h4>
<p><strong>Requête proposée :</strong> « Rédige une publication pour la page professionnelle d'une PME de rénovation énergétique. Fait : nous avons terminé la semaine dernière l'isolation des combles d'une école maternelle d'une commune voisine, pendant les vacances scolaires, pour ne pas perturber l'accueil des enfants. La mairie a donné son accord pour cette publication. Ton : sobre, fier sans excès, reconnaissant envers la commune. 700 caractères maximum. Interdits : chiffre d'économie, pourcentage, allégation environnementale générale (« écologique », « neutre en carbone »), nom d'agent municipal. Propose deux versions. »</p>
<p><strong>Texte proposé :</strong></p>
<blockquote>« Pendant les vacances scolaires, notre équipe a réalisé l'isolation des combles d'une école maternelle d'une commune voisine. Intervenir pendant la fermeture de l'établissement nous a permis de travailler en toute sécurité, sans perturber l'accueil des enfants. Merci à la commune pour sa confiance et aux services techniques pour leur coordination. Améliorer le confort des bâtiments qui accueillent les plus jeunes, c'est un chantier qui a du sens pour toute l'équipe de Thermia Rénov. »</blockquote>
<p>Le nom de la commune n'est mentionné que si la mairie l'a expressément accepté ; le texte ne contient aucune promesse chiffrée.</p>

<h4>5. Niveaux d'enjeu et de contrôle</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Écrit</th><th>Enjeu</th><th>Contrôle avant envoi</th></tr>
<tr><td>1. Réclamation</td><td>Fort (relation client, geste commercial)</td><td>Relecture par Julie avec la liste de contrôle, validation par Sandrine MOREL</td></tr>
<tr><td>2. Relance</td><td>Moyen (information réglementaire)</td><td>Relecture par Karim, vérification de la réponse sur l'urbanisme</td></tr>
<tr><td>3. Compte rendu interne</td><td>Faible à moyen</td><td>Relecture par Julie, comparaison avec les notes</td></tr>
<tr><td>4. Publication</td><td>Moyen (image publique, accord d'un tiers)</td><td>Relecture, vérification de l'accord de la mairie et de la photo, validation par la dirigeante</td></tr>
</table>

<h4>Erreurs fréquentes relevées lors de la correction</h4>
<ul>
<li>Une réponse à réclamation qui se justifie longuement (« nos techniciens sont très sollicités en cette saison… ») au lieu de reconnaître simplement l'erreur.</li>
<li>Un geste commercial supplémentaire inventé par l'outil (remise sur le prochain entretien) et conservé par inadvertance.</li>
<li>Un délai d'instruction de la déclaration préalable ajouté par l'outil sans vérification.</li>
<li>La proposition de Karim transformée en décision dans le compte rendu.</li>
<li>Une publication mentionnant des « économies importantes pour la commune », affirmation non étayée.</li>
</ul>

<blockquote><strong>À retenir.</strong> Une matinée d'écrits avec l'IA se gagne par des requêtes complètes (faits vérifiés, objectif, format, interdits), une relecture qui traque les ajouts, les promesses et les confusions, et un contrôle proportionné à l'enjeu. L'outil fait gagner du temps sur la forme ; la justesse du fond, les engagements et la responsabilité restent humains.</blockquote>
`,
      },
    ],
  },
  {
    title: "Chapitre 4 – Synthétiser, analyser, créer des visuels et vérifier (C3)",
    description:
      "Exploiter l'IA pour traiter l'information et produire des supports visuels, en gardant la maîtrise de la fiabilité : synthèse de documents longs (CCTP, notices techniques, textes réglementaires), extraction d'informations, comparaison de devis fournisseurs, tableaux et données (avec prudence sur les calculs), génération et retouche d'images (fonctions IA de Canva, générateurs d'images, droits et mentions), méthode de vérification des faits, des chiffres et des sources (sources primaires, IA connectées au web, citations), détection des hallucinations et grille qualité d'un contenu généré. Fil rouge Thermia Rénov. Durée indicative : une demi-journée (jour 2, après-midi). Module C3 du programme.",
    sections: [
      {
        title: "4.1 – Synthétiser des documents longs : CCTP, notices techniques, textes réglementaires",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Utiliser l'IA pour résumer un document long en fonction d'un objectif précis et d'un lecteur identifié.</li>
<li>Connaître les limites techniques de la synthèse automatique (taille du contexte, pertes, déformations) et les contourner.</li>
<li>Contrôler une synthèse en exigeant des renvois au document source.</li>
</ul>

<h3>Le besoin : trop de pages, pas assez de temps</h3>
<p>Une PME du bâtiment reçoit chaque semaine des documents longs : cahier des clauses techniques particulières (CCTP) d'un appel d'offres ou d'un maître d'œuvre, notice d'installation de 80 pages d'une pompe à chaleur, guide d'application d'un dispositif d'aide, fiche d'opération standardisée, conditions générales d'un fournisseur, compte rendu d'assemblée générale d'une copropriété. Personne n'a le temps de tout lire en détail, et pourtant une clause manquée peut coûter cher : une exigence de performance non prévue au devis, une pénalité de retard, une condition d'installation non respectée qui fait perdre la garantie du fabricant.</p>
<p>Les assistants d'IA permettent de déposer un document (PDF, Word) ou d'en coller le texte, puis de demander une synthèse. Les versions professionnelles de plusieurs outils et Copilot dans Microsoft 365 peuvent traiter des documents directement depuis l'espace de travail de l'entreprise. Le gain est considérable, à condition de comprendre ce que fait l'outil.</p>

<h3>Ce qui se passe quand l'IA « lit » un document</h3>
<ul>
<li><strong>Le contexte est limité</strong> (chapitre 1) : au-delà d'une certaine taille, le document est tronqué, découpé ou seulement partiellement exploité, selon l'outil. Certains outils ne le signalent pas clairement.</li>
<li><strong>La mise en forme peut être perdue</strong> : tableaux, plans, schémas, notes de bas de page et documents scannés sont parfois mal lus. Un PDF image (scan) sans reconnaissance de texte peut être ignoré ou mal interprété.</li>
<li><strong>Résumer, c'est choisir</strong> : l'outil retient ce qui lui paraît important statistiquement, pas forcément ce qui l'est pour vous. Une exception en bas de page ou une condition particulière peut disparaître.</li>
<li><strong>Le risque de mélange</strong> : l'outil peut compléter la synthèse avec ses connaissances générales (par exemple une règle « habituelle » qui ne figure pas dans le document) sans le signaler.</li>
</ul>

<h3>La méthode de synthèse fiable</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Consigne type</th></tr>
<tr><td>1. Définir l'objectif et le lecteur</td><td>« Je suis conducteur de travaux ; je dois savoir ce que ce CCTP impose pour le lot isolation, afin de vérifier notre devis. »</td></tr>
<tr><td>2. Vérifier la lecture</td><td>« Indique le nombre de pages et les titres des parties que tu as pu lire. »</td></tr>
<tr><td>3. Demander une synthèse structurée</td><td>« Résume en rubriques : exigences techniques, matériaux imposés, performances attendues, contrôles et essais, documents à fournir, délais, pénalités. »</td></tr>
<tr><td>4. Exiger des renvois</td><td>« Pour chaque point, indique l'article ou la page du document. Si une information n'est pas dans le document, écris « non trouvé dans le document » ; n'utilise pas tes connaissances générales. »</td></tr>
<tr><td>5. Faire ressortir les risques</td><td>« Liste les clauses inhabituelles, contraignantes ou ambiguës. »</td></tr>
<tr><td>6. Contrôler</td><td>Vérifier dans le document source chaque point important, en particulier les chiffres et les obligations</td></tr>
</table>
<p>Pour un document très long, procédez <strong>par parties</strong> : synthèse chapitre par chapitre, puis synthèse des synthèses. Vous limitez ainsi les pertes liées à la taille du contexte.</p>

<h4>Exemple Thermia Rénov – le CCTP du gymnase (fictif)</h4>
<p>Thermia Rénov répond à une consultation d'une commune pour l'isolation de la toiture d'un gymnase. Le CCTP fait 46 pages. Thomas demande une synthèse pour le lot « isolation thermique » avec renvois aux articles. La synthèse fait apparaître : la résistance thermique minimale exigée (article 3.2.1), l'obligation de fournir les fiches techniques et les avis techniques des produits avant commande (article 2.4), un essai d'étanchéité à l'air non prévu dans le devis initial (article 5.3) et une pénalité par jour de retard (article 7.1). Thomas vérifie chacun de ces articles dans le document : trois sont exacts, mais le montant de la pénalité cité par l'outil ne correspond pas à celui du CCTP, qui renvoie en réalité au cahier des clauses administratives particulières (CCAP), document distinct. Sans vérification, l'erreur serait passée dans l'analyse de risque.</p>

<blockquote><strong>Bonne pratique :</strong> la synthèse sert à <em>orienter</em> votre lecture, pas à la remplacer. Utilisez-la pour savoir où regarder, puis lisez vous-même intégralement les passages qui engagent l'entreprise (exigences techniques, pénalités, garanties, conditions d'exclusion).</blockquote>

<h3>Synthétiser une notice technique</h3>
<p>Pour une notice d'installation, l'objectif est opérationnel : « Quelles sont les distances minimales d'implantation de l'unité extérieure, les exigences électriques, les conditions de mise en service et les opérations d'entretien obligatoires pour conserver la garantie ? » Demandez un tableau avec les valeurs et les pages, puis vérifiez chaque valeur dans la notice. Une valeur de réglage ou une distance de sécurité ne doit jamais être reprise de la synthèse sans contrôle : en cas d'erreur, la responsabilité de l'installateur est engagée.</p>

<h3>Synthétiser un texte réglementaire ou un guide officiel</h3>
<p>Pour un texte réglementaire (décret, arrêté) ou un guide d'un dispositif public, la synthèse aide à comprendre la structure et les grandes règles. Trois précautions :</p>
<ol>
<li><strong>Partir du texte officiel</strong> téléchargé sur le site de référence (Légifrance pour les textes, site officiel du dispositif pour les guides), et non de la mémoire de l'outil ou d'un article de blog.</li>
<li><strong>Vérifier la version et la date</strong> : les dispositifs d'aide à la rénovation changent fréquemment ; un guide de l'année précédente peut être périmé.</li>
<li><strong>Demander la distinction</strong> entre ce que dit le texte et l'interprétation de l'outil, et faire valider toute conclusion qui engage l'entreprise par la personne compétente.</li>
</ol>

<h3>Synthèse d'une série de documents</h3>
<p>L'IA peut aussi rapprocher plusieurs documents : « À partir de ces trois comptes rendus de réunion de chantier, liste les réserves encore ouvertes et la date de leur première mention. » C'est très utile pour le suivi, mais l'exhaustivité doit être contrôlée : demandez explicitement la source (document et date) de chaque élément.</p>

<blockquote><strong>À retenir.</strong> L'IA résume vite mais choisit, peut tronquer un document long, mal lire les tableaux et les scans, et mélanger le contenu du document avec ses connaissances générales. Fixez l'objectif et le lecteur, vérifiez ce qui a été lu, imposez une synthèse structurée avec renvois aux articles ou aux pages et l'interdiction d'utiliser des connaissances extérieures, traitez les documents longs par parties et vérifiez dans la source chaque point qui engage l'entreprise.</blockquote>
`,
      },
      {
        title: "4.2 – Extraire et structurer des informations",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Utiliser l'IA pour extraire des informations précises d'un texte non structuré (mails, comptes rendus, fiches techniques) et les ranger dans un tableau.</li>
<li>Définir à l'avance la grille d'extraction pour obtenir des résultats homogènes et contrôlables.</li>
<li>Contrôler l'exhaustivité et l'exactitude d'une extraction.</li>
</ul>

<h3>Extraire plutôt que résumer</h3>
<p>Résumer, c'est condenser un texte ; extraire, c'est aller chercher des informations <strong>définies à l'avance</strong> et les ranger dans des cases. L'extraction est souvent plus utile et plus fiable que la synthèse, parce que vous savez exactement ce que vous attendez et que chaque case peut être vérifiée. Exemples dans une PME de rénovation :</p>
<ul>
<li>relever, dans vingt mails de demande de devis reçus par le formulaire du site, le type de travaux, la commune, le type de logement et le délai souhaité ;</li>
<li>extraire des fiches techniques de trois isolants leur conductivité thermique, leur épaisseur, leur réaction au feu et leur conditionnement ;</li>
<li>lister, dans un compte rendu d'assemblée générale de copropriété, les résolutions adoptées concernant les travaux, avec le vote et le budget ;</li>
<li>repérer, dans les conditions générales d'un fournisseur, les délais de réclamation, les conditions de retour et les pénalités.</li>
</ul>

<h3>Construire la grille d'extraction</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Principe</th><th>Mise en œuvre</th></tr>
<tr><td>Définir les colonnes</td><td>Lister précisément les informations attendues, avec leur unité (mm, W/m.K, jours, euros HT)</td></tr>
<tr><td>Prévoir le cas « absent »</td><td>Imposer une valeur standard : « non indiqué » ; interdire de déduire ou d'estimer</td></tr>
<tr><td>Garder la trace</td><td>Ajouter une colonne « source » (document, page, phrase citée)</td></tr>
<tr><td>Normaliser</td><td>Préciser le format des dates (JJ/MM/AAAA), des montants, des communes</td></tr>
<tr><td>Séparer extraction et interprétation</td><td>D'abord le tableau factuel, ensuite seulement l'analyse</td></tr>
</table>

<h4>Exemple Thermia Rénov – trier les demandes entrantes</h4>
<p>Le lundi, Julie trouve dans la boîte de contact une quinzaine de demandes arrivées par le formulaire du site. Elle les copie, après avoir retiré noms, téléphones et adresses électroniques (elle conserve un numéro d'ordre pour retrouver chaque demande), et utilise la requête suivante :</p>
<blockquote><strong>Requête :</strong> Voici 15 demandes de clients numérotées. Pour chacune, remplis un tableau avec les colonnes : N°, type de travaux demandé, commune, type de logement (maison / appartement / local professionnel / non indiqué), année de construction (si indiquée), délai souhaité, question particulière posée, citation exacte de la phrase qui justifie le type de travaux. N'invente rien : écris « non indiqué » si l'information n'apparaît pas. Ensuite, et séparément, propose un classement par priorité selon le critère : délai le plus court d'abord.</blockquote>
<p>Le tableau permet à Karim de préparer ses appels de qualification. Julie vérifie trois lignes au hasard en relisant la demande d'origine, et systématiquement toutes les lignes où l'outil a renseigné une année de construction ou un délai (informations souvent « devinées »).</p>

<h3>Extraire des données techniques</h3>
<p>Pour des fiches techniques de produits, l'extraction automatique est utile mais délicate : les valeurs figurent dans des tableaux parfois mal lus, les unités varient, plusieurs références coexistent sur une même fiche. Exigez une <strong>citation de la page</strong>, contrôlez toutes les valeurs qui servent au dimensionnement ou à la conformité, et méfiez-vous des valeurs « arrondies » ou « harmonisées » par l'outil.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Produit (fictif)</th><th>Conductivité thermique</th><th>Épaisseur</th><th>Réaction au feu</th><th>Source</th><th>Contrôle</th></tr>
<tr><td>Isolant A</td><td>0,032 W/m.K</td><td>200 mm</td><td>A1</td><td>Fiche A, p. 2</td><td>Vérifié</td></tr>
<tr><td>Isolant B</td><td>0,038 W/m.K</td><td>180 mm</td><td>non indiqué</td><td>Fiche B, p. 1</td><td>Vérifié ; demander l'information au fournisseur</td></tr>
<tr><td>Isolant C</td><td>0,035 W/m.K</td><td>200 mm</td><td>E</td><td>Fiche C, p. 3</td><td>Erreur : la fiche indique 0,036 ; corrigé</td></tr>
</table>

<h3>Transformer un texte en liste d'actions ou en planning</h3>
<p>Autre usage fréquent : extraire d'une longue chaîne de mails « qui doit faire quoi, et pour quand ». Demandez un tableau action / responsable / échéance / mail d'origine (date et expéditeur). C'est particulièrement utile au retour de congés, mais vérifiez les échéances : l'outil peut confondre une date évoquée avec une date convenue.</p>

<blockquote><strong>Bonne pratique :</strong> lorsque vous répétez la même extraction chaque semaine, enregistrez la grille dans votre bibliothèque de prompts ou dans un assistant personnalisé. Au chapitre consacré à l'automatisation (C4), vous verrez comment ce type d'extraction peut alimenter automatiquement un tableur, avec toujours une étape de contrôle humain.</blockquote>

<h3>Limites et données personnelles</h3>
<p>Une extraction porte souvent sur des données de clients. Appliquez la minimisation : retirez les identifiants avant de soumettre les textes à un outil grand public, ou utilisez l'environnement professionnel prévu par l'entreprise et validé pour ce traitement. Ne demandez jamais à l'outil d'extraire ou de déduire des informations sensibles (santé, situation sociale, opinions) qui ne sont pas nécessaires à votre besoin.</p>

<blockquote><strong>À retenir.</strong> L'extraction cherche des informations définies à l'avance et les range dans une grille : colonnes et unités précises, valeur imposée pour les informations absentes, colonne « source », séparation entre faits extraits et analyse. Contrôlez par sondage les lignes simples et systématiquement les valeurs qui servent à décider, dimensionner ou s'engager, et minimisez les données personnelles transmises.</blockquote>
`,
      },
      {
        title: "4.3 – Comparer des devis et des offres fournisseurs",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Utiliser l'IA pour mettre en regard plusieurs offres fournisseurs sur des critères homogènes.</li>
<li>Repérer les écarts de périmètre, les options cachées et les conditions qui modifient le coût réel.</li>
<li>Garder la décision d'achat et la vérification des montants sous contrôle humain.</li>
</ul>

<h3>Pourquoi comparer avec l'IA</h3>
<p>Thermia Rénov achète régulièrement du matériel (pompes à chaleur, isolants, ballons thermodynamiques), loue des équipements (nacelle, échafaudage) et sous-traite certaines prestations (évacuation de déchets, raccordement électrique). Les offres reçues ne sont jamais présentées de la même manière : unités différentes, options incluses ou non, frais de livraison séparés, délais exprimés en jours ouvrés ou calendaires, conditions de paiement variables. Comparer « à la main » prend du temps et expose à l'erreur classique : retenir l'offre la moins chère en apparence, qui ne couvre pas le même périmètre.</p>
<p>L'IA est efficace pour <strong>normaliser</strong> la présentation des offres et faire apparaître les différences. Elle n'est pas fiable pour <strong>calculer</strong> les totaux (section 4.4) ni pour <strong>décider</strong> à votre place.</p>

<h3>La méthode en quatre temps</h3>
<ol>
<li><strong>Définir les critères</strong> avant de lire les offres : prix unitaire HT, quantité, frais annexes, délai de livraison, garantie, conditions de paiement, service après-vente, conformité aux exigences techniques (par exemple celles du CCTP, section 4.1).</li>
<li><strong>Faire extraire</strong> chaque offre dans un tableau commun, avec la mention « non indiqué » pour les informations absentes et la référence de la ligne ou de la page.</li>
<li><strong>Faire repérer les écarts</strong> : « Liste les différences de périmètre entre les offres (ce qui est inclus dans l'une et pas dans l'autre), les conditions particulières et les points à clarifier auprès des fournisseurs. »</li>
<li><strong>Recalculer et décider</strong> : les totaux sont recalculés dans un tableur ou vérifiés sur les offres elles-mêmes ; la décision reste celle de la personne habilitée.</li>
</ol>

<h4>Exemple Thermia Rénov – trois offres de location de nacelle (fictives)</h4>
<p>Thomas doit louer une nacelle pour deux semaines. Il dépose les trois offres (PDF) dans l'assistant et demande un tableau comparatif, puis la liste des écarts de périmètre.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Loueur 1</th><th>Loueur 2</th><th>Loueur 3</th></tr>
<tr><td>Tarif location</td><td>95 € HT / jour</td><td>420 € HT / semaine</td><td>88 € HT / jour</td></tr>
<tr><td>Transport aller-retour</td><td>Inclus</td><td>180 € HT</td><td>150 € HT</td></tr>
<tr><td>Assurance casse / vol</td><td>Incluse</td><td>Option, 10 % du loyer</td><td>non indiqué</td></tr>
<tr><td>Jours facturés</td><td>Jours ouvrés</td><td>Semaine complète</td><td>Jours calendaires</td></tr>
<tr><td>Énergie</td><td>Batterie chargée</td><td>non indiqué</td><td>Carburant à la charge du locataire</td></tr>
<tr><td>Source</td><td>Offre 1, p. 1</td><td>Offre 2, p. 1-2</td><td>Offre 3, p. 1</td></tr>
</table>
<p><strong>Écarts relevés par l'outil :</strong> le loueur 3, moins cher par jour, facture en jours calendaires (week-ends compris), ne précise pas l'assurance et fait payer le carburant ; le loueur 2 facture l'assurance en option. <strong>Points à clarifier :</strong> l'assurance du loueur 3 et l'énergie du loueur 2.</p>
<p>L'outil avait aussi proposé un « coût total sur deux semaines » pour chaque offre. Thomas l'a refait dans le tableur : un des trois totaux était faux (l'outil avait compté 10 jours calendaires pour le loueur 3 au lieu de 14). C'est l'illustration directe de la règle de la section suivante.</p>

<blockquote><strong>Bonne pratique :</strong> demandez systématiquement à l'outil la liste des « questions à poser aux fournisseurs avant de décider ». Une offre moins chère qui laisse trois questions sans réponse n'est pas encore comparable aux autres.</blockquote>

<h3>Comparer pour le client : une prudence supplémentaire</h3>
<p>Un client peut demander à Karim de l'aider à comparer le devis de Thermia Rénov avec celui d'un concurrent. Il est tentant de déposer le devis concurrent dans l'outil. Deux précautions : ce document contient des données personnelles du client et des informations commerciales d'un tiers, il ne doit donc être transmis qu'à un outil adapté et avec l'accord du client ; et la comparaison doit rester factuelle et loyale (périmètre, performances, garanties), sans dénigrement. L'IA aide à structurer la comparaison ; elle ne doit pas produire un argumentaire dévalorisant.</p>

<h3>Ce que l'IA ne voit pas dans une offre</h3>
<ul>
<li>La fiabilité réelle du fournisseur, son historique avec l'entreprise, la qualité de son service après-vente.</li>
<li>Les conditions négociées oralement ou par ailleurs (accord-cadre, remise annuelle).</li>
<li>La disponibilité réelle du matériel au moment de la commande.</li>
<li>Les contraintes du chantier qui rendent un critère décisif (une nacelle électrique imposée en site occupé, par exemple).</li>
</ul>

<blockquote><strong>À retenir.</strong> L'IA normalise des offres hétérogènes et fait ressortir les écarts de périmètre et les points à clarifier. Définissez vos critères avant de lire les offres, faites extraire chaque offre avec ses références, recalculez les totaux dans un tableur et gardez la décision humaine, en tenant compte de ce que l'outil ne voit pas : fiabilité du fournisseur, accords existants, contraintes du chantier.</blockquote>
`,
      },
      {
        title: "4.4 – Tableaux, données et calculs : utiliser l'IA avec prudence",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Comprendre pourquoi un modèle de langage n'est pas fiable pour le calcul et comment contourner cette limite.</li>
<li>Utiliser l'IA pour concevoir un tableau, écrire une formule de tableur ou analyser un fichier de données.</li>
<li>Vérifier un résultat chiffré par des contrôles simples.</li>
</ul>

<h3>Pourquoi l'IA se trompe en calcul</h3>
<p>Un grand modèle de langage prédit des suites de tokens (chapitre 1). Lorsqu'il écrit « 14 × 88 = 1 232 », il ne calcule pas comme une calculatrice : il produit la suite la plus probable. Sur des opérations simples et fréquentes, le résultat est souvent juste ; sur des additions de longues colonnes, des pourcentages enchaînés, des arrondis ou des conversions d'unités, les erreurs sont fréquentes, et elles sont présentées avec la même assurance qu'un résultat exact. Par ailleurs, l'outil peut <strong>mal lire</strong> un tableau (décaler une colonne, confondre HT et TTC) ou <strong>inventer</strong> une valeur manquante pour terminer un calcul.</p>
<p>Certains assistants disposent d'une fonction d'analyse de données qui exécute réellement du code de calcul sur un fichier déposé : les opérations sont alors beaucoup plus fiables, mais la lecture du fichier, le choix des colonnes et l'interprétation restent à vérifier. Lorsqu'un outil utilise cette fonction, il le signale généralement (affichage du code ou d'une étape d'analyse).</p>

<h3>Les trois bons usages</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Usage</th><th>Exemple</th><th>Fiabilité</th></tr>
<tr><td>Concevoir la structure d'un tableau</td><td>« Propose les colonnes d'un tableau de suivi des chantiers : référence, client (pseudonyme), type de travaux, date de début, date de fin, montant HT, état d'avancement, réserves. »</td><td>Bonne ; à adapter à votre organisation</td></tr>
<tr><td>Écrire et expliquer une formule de tableur</td><td>« Dans Excel, écris une formule qui calcule le nombre de jours ouvrés entre la date de début en C2 et la date de fin en D2. Explique-la. »</td><td>Bonne ; tester la formule sur des cas connus</td></tr>
<tr><td>Analyser un fichier avec une fonction d'analyse qui exécute du code, ou Copilot dans Excel</td><td>« À partir de ce fichier, calcule le chiffre d'affaires HT par type de travaux et par mois, et présente un graphique. »</td><td>Correcte si le calcul est réellement exécuté ; vérifier les totaux</td></tr>
</table>
<p>À l'inverse, ne demandez pas à un assistant conversationnel de « faire le total » d'une liste collée dans la conversation pour reprendre le résultat dans un devis, une facture ou un tableau de bord sans vérification.</p>

<h4>Exemple Thermia Rénov – le tableau de suivi des devis</h4>
<p>Sandrine MOREL veut suivre le taux de transformation des devis. Elle demande à l'IA la structure d'un tableau et les formules :</p>
<blockquote><strong>Requête :</strong> Je suis dirigeante d'une PME. J'ai un tableau Excel avec en colonne A la référence du devis, B la date d'envoi, C le commercial, D le type de travaux, E le montant HT, F le statut (« signé », « refusé », « en attente »). Donne-moi les formules pour calculer, pour chaque commercial, le nombre de devis envoyés, le nombre de devis signés, le taux de transformation et le montant HT signé. Explique chaque formule et indique comment vérifier le résultat.</blockquote>
<p>L'outil propose des formules de type NB.SI.ENS et SOMME.SI.ENS. Sandrine les teste d'abord sur un petit échantillon de dix lignes dont elle connaît le résultat, avant de les appliquer au fichier complet. Elle découvre ainsi que deux devis portaient le statut « Signé » avec une majuscule et une espace en fin de cellule : la formule ne les comptait pas. L'IA l'aide ensuite à nettoyer la colonne.</p>

<h3>Les contrôles simples d'un résultat chiffré</h3>
<ol>
<li><strong>Ordre de grandeur</strong> : le résultat est-il plausible ? Un chiffre d'affaires mensuel de 4 millions d'euros pour une entreprise de 14 salariés doit alerter.</li>
<li><strong>Recalcul indépendant</strong> : refaire le calcul dans un tableur ou avec une calculatrice, au moins pour les totaux.</li>
<li><strong>Cas test</strong> : appliquer la formule à un cas dont on connaît la réponse.</li>
<li><strong>Cohérence des totaux</strong> : la somme des parties est-elle égale au total ? Les pourcentages font-ils 100 % ?</li>
<li><strong>Unités et taxes</strong> : HT ou TTC ? jours ouvrés ou calendaires ? kWh ou MWh ?</li>
<li><strong>Données d'entrée</strong> : toutes les lignes ont-elles été prises en compte ? Aucune valeur n'a-t-elle été inventée pour combler un manque ?</li>
</ol>

<blockquote><strong>Bonne pratique :</strong> pour tout chiffre qui sort de l'entreprise (devis, facture, estimation d'économies, réponse à un appel d'offres), la règle chez Thermia Rénov est simple : « Le calcul se fait dans l'outil métier ou le tableur, jamais dans la conversation. » L'IA peut aider à construire l'outil de calcul ; elle n'en est pas la source.</blockquote>

<h3>Graphiques et visualisation</h3>
<p>L'IA peut proposer le type de graphique adapté (histogramme pour comparer des catégories, courbe pour une évolution, éviter les camemberts à dix parts) et le produire à partir d'un fichier. Vérifiez les axes, les unités, l'échelle (un axe qui ne part pas de zéro peut exagérer une évolution) et le titre. Un graphique présenté à un client ou à un partenaire doit indiquer la source des données et leur période.</p>

<h3>Données de l'entreprise et confidentialité</h3>
<p>Un fichier de chiffre d'affaires, de marges ou de clients est une information confidentielle, et souvent personnelle. Avant de le déposer dans un outil, vérifiez que l'environnement est celui prévu par l'entreprise (par exemple Copilot dans Microsoft 365 avec le compte professionnel, si l'entreprise l'a déployé et paramétré), retirez les colonnes inutiles à l'analyse (noms, adresses, téléphones) et ne conservez que ce qui est nécessaire.</p>

<blockquote><strong>À retenir.</strong> Un modèle de langage n'est pas une calculatrice : il peut se tromper sur un total avec assurance, mal lire un tableau ou inventer une valeur. Utilisez l'IA pour structurer vos tableaux, écrire et expliquer des formules, et analyser des fichiers avec une fonction qui exécute réellement le calcul ; contrôlez toujours ordre de grandeur, recalcul, cas test, cohérence, unités et données d'entrée. Tout chiffre qui sort de l'entreprise est calculé dans l'outil métier.</blockquote>
`,
      },
      {
        title: "4.5 – Générer et retoucher des images : Canva, générateurs d'images, droits et mentions",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Connaître les principales fonctions de création et de retouche d'images par IA accessibles à une PME.</li>
<li>Rédiger une requête d'image efficace et retoucher un visuel existant.</li>
<li>Respecter les règles de droit d'auteur, de droit à l'image, de marques et de transparence, et ne jamais présenter une image générée comme une réalisation réelle.</li>
</ul>

<h3>Les outils disponibles</h3>
<p>Les fonctions de génération et de retouche d'images se sont intégrées aux outils du quotidien. Leur nom commercial change souvent ; retenez les fonctions plutôt que les appellations, et vérifiez pour chaque outil les conditions d'utilisation (usage commercial autorisé, propriété des images produites, utilisation de vos fichiers).</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Outil</th><th>Fonctions utiles</th><th>Usage type en PME</th></tr>
<tr><td>Canva (fonctions IA)</td><td>Génération d'images à partir d'un texte, suppression ou remplacement d'arrière-plan, effacement ou modification d'une zone, agrandissement d'une image, déclinaison d'un visuel en plusieurs formats, suggestions de mise en page et de textes</td><td>Visuels pour les réseaux sociaux, affiches, plaquettes, présentations, avec les couleurs et le logo de l'entreprise</td></tr>
<tr><td>Assistants conversationnels avec génération d'images (ChatGPT, Microsoft Copilot, Google Gemini, Le Chat de Mistral AI)</td><td>Création d'illustrations à partir d'une description, modifications successives par dialogue</td><td>Illustration d'un article, schéma simple, pictogrammes, image d'ambiance</td></tr>
<tr><td>Fonctions IA des outils bureautiques et photo</td><td>Retouche de photo (luminosité, recadrage, effacement d'un objet), génération d'images dans un document ou une présentation</td><td>Amélioration des photos de chantier, illustration d'un support de réunion</td></tr>
</table>

<h3>Rédiger une requête d'image</h3>
<p>Une requête d'image efficace décrit, dans cet ordre : le <strong>sujet</strong>, le <strong>contexte ou décor</strong>, le <strong>style</strong> (photographie réaliste, illustration plate, dessin technique, aquarelle), la <strong>composition</strong> (cadrage, point de vue, espace libre pour un texte), la <strong>lumière et les couleurs</strong>, le <strong>format</strong> (carré, vertical, bannière) et les <strong>exclusions</strong> (pas de texte dans l'image, pas de logo, pas de personne reconnaissable).</p>
<h4>Exemple Thermia Rénov – avant / après</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Requête initiale</th><th>Requête retravaillée</th></tr>
<tr><td>« Une image de pompe à chaleur. »</td><td>« Illustration plate et sobre, style pictogramme, montrant une maison individuelle stylisée avec, à côté, une unité extérieure de pompe à chaleur ; flèches simples indiquant que la chaleur est captée dans l'air extérieur et transmise à l'intérieur ; palette bleu marine et vert sauge sur fond blanc ; format carré ; grand espace libre en haut pour un titre ; aucun texte, aucune marque, aucun logo, aucune personne. »</td></tr>
</table>
<p>La première requête produit une image aléatoire, parfois une machine imaginaire avec un logo inventé. La seconde produit une illustration pédagogique cohérente avec la charte de l'entreprise. Les textes inclus dans une image générée sont encore souvent déformés : ajoutez le texte ensuite, dans Canva ou dans votre outil de mise en page.</p>

<h3>Retoucher une photo réelle</h3>
<p>Les photos de chantier prises au téléphone sont souvent sombres, mal cadrées ou encombrées. La retouche par IA permet d'éclaircir, de redresser, de recadrer, d'effacer un élément gênant (une poubelle, une plaque d'immatriculation, un numéro de rue). Une limite s'impose : la retouche ne doit pas <strong>modifier la réalité de la prestation</strong>. Effacer un seau oublié sur une photo de combles isolés est acceptable ; effacer une gaine écrasée, « compléter » une isolation inachevée ou ajouter une unité extérieure plus esthétique ne l'est pas.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Retouche acceptable</th><th>Retouche à proscrire</th></tr>
<tr><td>Luminosité, contraste, recadrage, redressement</td><td>Modifier l'ouvrage réalisé (ajouter, supprimer, embellir un élément de la prestation)</td></tr>
<tr><td>Effacer un élément sans lien avec la prestation (déchet, outil, véhicule)</td><td>Créer un « avant/après » à partir d'une seule photo ou d'images générées</td></tr>
<tr><td>Flouter un visage, une plaque, une adresse</td><td>Insérer des personnes, un logo ou un label qui n'étaient pas présents</td></tr>
</table>

<h3>Ne jamais présenter une image générée comme une réalisation</h3>
<p>Une image générée d'une maison rénovée, publiée avec la légende « Notre dernière réalisation », trompe le public : c'est une pratique commerciale trompeuse. De même, une image générée montrant des « clients satisfaits » ou une « équipe » qui n'existe pas. Les images générées peuvent illustrer un propos général (un article sur le fonctionnement d'une pompe à chaleur), à condition de ne pas laisser croire qu'il s'agit d'un chantier, d'un client ou d'un salarié réels.</p>

<blockquote><strong>Bonne pratique :</strong> chez Thermia Rénov, la règle est écrite dans la charte : « Réalisations = photos réelles uniquement. Illustrations générées = sujets généraux, mention « Illustration générée par IA » lorsque l'image est réaliste. » Les photos réelles de chantier sont classées dans un dossier partagé, avec l'accord des clients lorsque c'est nécessaire.</blockquote>

<h3>Droits d'auteur, droit à l'image, marques</h3>
<ul>
<li><strong>Droit d'auteur sur l'image générée</strong> : en droit français, la protection suppose une création originale portant l'empreinte de la personnalité d'un auteur humain ; une image produite par un outil à partir d'une simple requête a peu de chances d'être protégée. Conséquence pratique : vous pouvez l'utiliser selon les conditions de l'outil, mais vous ne pourrez pas forcément empêcher d'autres de la réutiliser.</li>
<li><strong>Droits des tiers</strong> : les conditions des outils ne garantissent généralement pas qu'une image générée ne ressemble pas à une œuvre protégée. Évitez les requêtes « à la manière de » un artiste ou un illustrateur identifié, et toute reproduction de personnages, d'œuvres ou de photographies connues.</li>
<li><strong>Marques et logos</strong> : n'insérez pas la marque d'un fabricant sans autorisation ; ne générez jamais de faux logo de label ou de qualification. Les logos officiels (qualification RGE, par exemple) s'utilisent selon les règles de l'organisme qui les délivre et seulement si l'entreprise y a droit.</li>
<li><strong>Droit à l'image des personnes</strong> : ne générez ni ne retouchez l'image d'une personne réelle (salarié, client) sans son accord ; ne créez pas d'image réaliste d'une personne réelle dans une situation qu'elle n'a pas vécue.</li>
<li><strong>Vos fichiers</strong> : en déposant une photo dans un outil, vérifiez ce que l'éditeur peut en faire (conservation, amélioration des modèles) ; évitez de déposer des photos montrant l'intérieur d'un domicile identifiable.</li>
</ul>

<h3>Transparence et marquage</h3>
<p>Le règlement européen sur l'IA prévoit, avec des obligations applicables à partir du 2 août 2026, que les fournisseurs d'outils marquent techniquement les contenus générés (métadonnées, filigranes invisibles) et que les utilisateurs professionnels qui diffusent des images, sons ou vidéos réalistes générés ou manipulés (« hypertrucages ») le signalent clairement. Certains outils ajoutent déjà des métadonnées d'origine ou un filigrane. Ne les supprimez pas. Pour une illustration réaliste diffusée par l'entreprise, la mention « Image générée par IA » est une bonne pratique dès maintenant. Les modalités détaillées sont présentées au chapitre consacré à la conformité (C5).</p>

<blockquote><strong>À retenir.</strong> Canva et les assistants permettent de créer et de retoucher des visuels rapidement : décrivez sujet, style, composition, couleurs, format et exclusions, et ajoutez les textes après coup. Une retouche ne modifie jamais la réalité de la prestation, et une image générée n'est jamais présentée comme un chantier, un client ou un salarié réels. Respectez les droits des tiers, les marques, les labels et le droit à l'image, conservez les marquages d'origine et signalez les images réalistes générées.</blockquote>
`,
      },
      {
        title: "4.6 – Vérifier les faits, les chiffres et les sources",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Appliquer une méthode de vérification adaptée à chaque type d'affirmation (fait, chiffre, règle, citation).</li>
<li>Distinguer sources primaires, sources secondaires et réponses d'IA, et privilégier les sources primaires.</li>
<li>Utiliser à bon escient les IA connectées au web (Perplexity, modes de recherche des assistants) et contrôler les citations qu'elles fournissent.</li>
</ul>

<h3>Pourquoi vérifier, même quand la réponse « a l'air juste »</h3>
<p>La qualité rédactionnelle d'une réponse d'IA crée une impression de fiabilité : phrases fluides, vocabulaire précis, ton assuré. Or cette qualité de forme ne dit rien de l'exactitude du fond. Vous l'avez vu au chapitre 1 : le modèle peut avoir une date de connaissance dépassée, confondre deux dispositifs, mélanger des règles de plusieurs pays, ou inventer purement et simplement un chiffre ou une référence. Dans la rénovation énergétique, où les dispositifs d'aide, les barèmes, les seuils et les obligations évoluent fréquemment, cette vérification n'est pas une option.</p>

<h3>La hiérarchie des sources</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Niveau</th><th>Définition</th><th>Exemples</th><th>Usage</th></tr>
<tr><td>Source primaire</td><td>Le texte ou la donnée d'origine, publié par l'autorité ou l'organisme compétent</td><td>Légifrance (lois, décrets, arrêtés), Journal officiel de l'Union européenne, sites officiels des dispositifs d'aide et de France Rénov', service-public.fr, sites de la CNIL et de la DGCCRF, notice et fiche technique du fabricant, documents contractuels</td><td>Seule référence pour une règle, un barème, une obligation, une caractéristique technique</td></tr>
<tr><td>Source secondaire fiable</td><td>Analyse ou présentation par un acteur identifié et compétent</td><td>Organisations professionnelles, chambres consulaires, presse spécialisée, agences publiques</td><td>Comprendre, se repérer ; remonter ensuite à la source primaire</td></tr>
<tr><td>Source secondaire incertaine</td><td>Auteur non identifié, intérêt commercial, date absente</td><td>Blogs commerciaux, forums, vidéos, publications sur les réseaux</td><td>À ne pas utiliser comme preuve</td></tr>
<tr><td>Réponse d'IA</td><td>Texte généré, avec ou sans sources affichées</td><td>Tout assistant</td><td>Point de départ, jamais une source</td></tr>
</table>

<h3>Une méthode par type d'affirmation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type d'affirmation</th><th>Comment vérifier</th></tr>
<tr><td>Fait propre à l'entreprise (date de chantier, contenu d'un devis, échange avec un client)</td><td>Document interne : planning, devis signé, mail, compte rendu</td></tr>
<tr><td>Règle juridique ou obligation</td><td>Texte officiel en vigueur (version et date d'application), fiche officielle ; en cas de doute, avis d'un professionnel</td></tr>
<tr><td>Barème, montant, plafond d'aide</td><td>Site officiel du dispositif, à la date du jour ; jamais de chiffre repris d'une réponse d'IA</td></tr>
<tr><td>Caractéristique technique</td><td>Fiche technique et notice du fabricant, documents techniques de référence</td></tr>
<tr><td>Statistique, chiffre de marché</td><td>Publication d'origine (organisme statistique, agence publique), avec sa date et son périmètre ; à défaut, ne pas citer</td></tr>
<tr><td>Citation d'une personne ou d'un texte</td><td>Retrouver la citation exacte dans le document d'origine</td></tr>
</table>

<h3>Les IA connectées au web</h3>
<p>Perplexity, ainsi que les modes de recherche de ChatGPT, de Copilot, de Gemini, de Le Chat ou de Claude, consultent des pages web au moment de la question et affichent des liens. C'est un progrès important : la réponse peut être plus récente et vous disposez d'un point d'entrée vers les sources. Mais ces outils restent des modèles de langage qui <strong>résument</strong> les pages trouvées. Les erreurs observées sont de plusieurs types :</p>
<ul>
<li>la source citée existe mais <strong>ne dit pas</strong> ce que la réponse lui attribue ;</li>
<li>la source est <strong>ancienne</strong> (article d'il y a deux ans sur un dispositif modifié depuis) ;</li>
<li>la source est un <strong>site commercial</strong> ou un comparateur, et non l'organisme officiel ;</li>
<li>le chiffre de la réponse provient d'une <strong>autre page</strong> que celle citée, ou d'un mélange de plusieurs ;</li>
<li>le lien est <strong>inaccessible ou inventé</strong> (plus rare avec les outils connectés, mais possible).</li>
</ul>
<p>La bonne pratique consiste à <strong>ouvrir les liens</strong>, à vérifier que l'information figure bien dans la page, à contrôler la date et l'auteur de la page, puis à remonter si nécessaire jusqu'au texte officiel.</p>

<h4>Exemple Thermia Rénov – vérifier une information sur une aide</h4>
<p>Karim prépare un article de site sur les aides à l'installation d'une pompe à chaleur. Il interroge un assistant connecté au web, qui lui répond avec un montant forfaitaire par catégorie de revenus et trois liens. En ouvrant les liens, il constate : le premier est un site d'installateur concurrent ; le deuxième, un article de presse de l'année précédente ; le troisième, le site officiel, qui présente un barème différent de celui de la réponse, mis à jour depuis. Karim retient la source officielle, cite sa page et sa date de consultation dans l'article, et choisit de ne pas publier de montants : il renvoie vers le simulateur et le site officiels, ainsi que vers France Rénov', ce qui évite que l'article soit faux à la prochaine modification du barème.</p>

<blockquote><strong>Bonne pratique :</strong> pour toute information réglementaire ou financière utilisée à l'extérieur de l'entreprise, notez dans le document de travail la source primaire, l'adresse de la page et la date de consultation. En cas de question d'un client ou d'un contrôle, vous saurez d'où vient l'information et à quelle date elle était exacte.</blockquote>

<h3>Faire travailler l'IA pour la vérification</h3>
<p>L'IA peut aussi aider à vérifier, à condition de lui fournir la source : « Voici le texte officiel [collé ou déposé]. Mon brouillon affirme les trois points suivants. Pour chacun, indique s'il est conforme au texte, en citant le passage exact, ou s'il n'y figure pas. » Elle peut également lister les affirmations vérifiables d'un texte : « Liste toutes les affirmations factuelles de ce texte (chiffres, dates, règles, noms) qu'il faut vérifier avant publication. » Cette liste devient votre feuille de route de vérification.</p>

<blockquote><strong>À retenir.</strong> La fluidité d'une réponse ne prouve pas son exactitude. Vérifiez chaque affirmation selon sa nature : documents internes pour les faits de l'entreprise, sources primaires pour les règles, barèmes et caractéristiques techniques, publication d'origine pour une statistique. Les IA connectées au web donnent des pistes : ouvrez les liens, contrôlez que l'information y figure, sa date et son auteur, remontez au texte officiel et notez la source et la date de consultation.</blockquote>
`,
      },
      {
        title: "4.7 – Détecter les hallucinations et évaluer la qualité d'un contenu généré",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Reconnaître les signaux d'alerte d'une hallucination dans un texte généré.</li>
<li>Mettre en œuvre des techniques simples de détection et de réduction des hallucinations.</li>
<li>Évaluer un contenu généré avec une grille qualité commune à l'équipe.</li>
</ul>

<h3>Rappel : qu'est-ce qu'une hallucination ?</h3>
<p>On appelle hallucination une information produite par un modèle d'IA qui est fausse ou sans fondement, mais présentée comme exacte. Elle découle du fonctionnement même du modèle (chapitre 1) : il génère la suite la plus probable, pas la suite vraie. Les hallucinations ne sont pas des « pannes » rares : elles se produisent régulièrement, surtout lorsque la question porte sur des informations précises, peu fréquentes, récentes ou propres à une organisation.</p>

<h3>Les signaux d'alerte</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Signal</th><th>Exemple</th></tr>
<tr><td>Précision excessive sans source</td><td>« Selon une étude de 2024, 68,4 % des propriétaires… »</td></tr>
<tr><td>Référence juridique très précise</td><td>« Conformément à l'article L. [numéro précis] du Code de… » : une référence numérotée est à vérifier systématiquement</td></tr>
<tr><td>Nom propre inattendu</td><td>Un organisme, un dispositif, un label, un logiciel dont vous n'avez jamais entendu parler</td></tr>
<tr><td>Information propre à votre entreprise que vous n'avez pas fournie</td><td>« Comme convenu lors de notre visite du 12 mars… »</td></tr>
<tr><td>Citation entre guillemets</td><td>Une phrase attribuée à une personne ou à un texte</td></tr>
<tr><td>Réponse à une question impossible</td><td>Un « barème 2027 » détaillé alors qu'il n'est pas publié</td></tr>
<tr><td>Incohérence interne</td><td>Deux montants différents pour la même chose dans le même texte</td></tr>
<tr><td>Changement de réponse à la reformulation</td><td>Une autre valeur lorsque vous reposez la question autrement</td></tr>
</table>

<h3>Les techniques de détection et de réduction</h3>
<ol>
<li><strong>Fournir la source</strong> et demander de répondre uniquement à partir d'elle (sections 4.1 et 4.6).</li>
<li><strong>Autoriser l'ignorance</strong> : « Si tu ne sais pas ou si l'information n'est pas dans le document, dis-le. » Sans cette autorisation, l'outil a tendance à répondre quand même.</li>
<li><strong>Demander le niveau de certitude et les hypothèses</strong> : « Distingue ce qui est certain, ce qui est probable et ce qui est à vérifier. »</li>
<li><strong>Reposer la question autrement</strong> ou dans une nouvelle conversation : une réponse instable est suspecte.</li>
<li><strong>Croiser deux outils</strong> : une concordance n'est pas une preuve (ils peuvent partager la même erreur), mais une discordance est un signal fort.</li>
<li><strong>Demander une autocritique</strong> : « Relis ta réponse et liste les affirmations qui pourraient être inexactes ou périmées. »</li>
<li><strong>Vérifier les affirmations listées</strong> selon la méthode de la section 4.6.</li>
</ol>

<h4>Exemple Thermia Rénov – la fausse référence</h4>
<p>Julie demande à un assistant de rédiger une réponse à un client qui conteste des frais de déplacement. La réponse générée cite un article précis du Code de commerce, avec son numéro, présenté comme autorisant « expressément » la facturation des frais de déplacement. Julie, alertée par la précision de la référence, vérifie sur Légifrance : l'article cité ne dit rien de tel. Elle supprime la mention et fonde la réponse sur ce qui fait foi entre les parties : les frais de déplacement figurent sur le devis signé par le client. La réponse est plus simple, plus juste et plus convaincante.</p>

<blockquote><strong>Bonne pratique :</strong> adoptez la règle « zéro référence non vérifiée » : aucun numéro d'article, aucun nom de dispositif, aucune statistique, aucune citation ne sort de l'entreprise sans avoir été contrôlé sur sa source. Si la vérification est impossible dans le temps disponible, reformulez sans la référence.</blockquote>

<h3>La grille qualité d'un contenu généré</h3>
<p>Pour harmoniser les pratiques, Thermia Rénov utilise une grille commune, inspirée des critères vus dans ce chapitre et le précédent. Elle sert à l'auto-contrôle, à la validation par un responsable et, en formation, à l'évaluation des productions.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Question de contrôle</th><th>Conforme / à corriger</th></tr>
<tr><td>1. Pertinence</td><td>Le contenu répond-il à l'objectif et au besoin du destinataire ?</td><td></td></tr>
<tr><td>2. Exactitude des faits</td><td>Chaque fait, date, nom est-il vérifié dans un document interne ou une source primaire ?</td><td></td></tr>
<tr><td>3. Exactitude des chiffres</td><td>Chaque chiffre est-il recalculé ou sourcé, avec la bonne unité (HT/TTC, période) ?</td><td></td></tr>
<tr><td>4. Sources</td><td>Les sources sont-elles primaires, à jour, identifiées et, si utile, citées ?</td><td></td></tr>
<tr><td>5. Absence d'invention</td><td>Aucun élément non fourni et non vérifié (référence, citation, engagement) ?</td><td></td></tr>
<tr><td>6. Absence de promesse invérifiable</td><td>Aucune promesse sur les aides, les économies, les délais, les garanties ?</td><td></td></tr>
<tr><td>7. Mentions et conformité</td><td>Mentions nécessaires présentes, droits respectés (images, témoignages, marques), transparence assurée ?</td><td></td></tr>
<tr><td>8. Confidentialité</td><td>Aucune donnée personnelle ou confidentielle superflue, ni dans le contenu ni dans les requêtes ?</td><td></td></tr>
<tr><td>9. Ton et lisibilité</td><td>Registre adapté à la cible, phrases claires, pas de formules creuses ?</td><td></td></tr>
<tr><td>10. Responsabilité</td><td>Le contenu est-il relu en entier et assumé par une personne identifiée ; validé par un responsable si l'enjeu est fort ?</td><td></td></tr>
</table>
<p>Un contenu n'est publiable ou envoyable que si les dix critères sont conformes. Les critères 2, 3, 5 et 6 sont éliminatoires : un seul écart impose une correction avant toute diffusion.</p>

<h3>Mesurer pour progresser</h3>
<p>Tenir pendant quelques semaines un relevé des écarts détectés par la grille (type d'écart, outil utilisé, type d'écrit) permet de repérer les situations à risque et d'améliorer les requêtes socles. C'est aussi une donnée utile pour le plan d'action individuel de fin de formation et pour mesurer le gain réel de l'IA, en temps comme en qualité (chapitre consacré à l'intégration, C4).</p>

<blockquote><strong>À retenir.</strong> Les hallucinations sont fréquentes et se reconnaissent à des signaux : précision sans source, référence juridique pointue, nom inconnu, fait non fourni, citation, réponse instable. Réduisez-les en fournissant la source, en autorisant l'outil à dire qu'il ne sait pas, en demandant certitudes et hypothèses, en reformulant et en croisant. Évaluez tout contenu avec la grille qualité en dix critères, dont quatre éliminatoires : faits, chiffres, absence d'invention, absence de promesse invérifiable.</blockquote>
`,
      },
      {
        title: "4.8 – Quiz de fin de chapitre",
        content: `
<p>Pour chaque question, une seule réponse est correcte. Le corrigé figure après chaque question.</p>

<h4>Question 1 – Vous demandez la synthèse d'un CCTP de 46 pages. Quelle consigne améliore le plus la fiabilité du résultat ?</h4>
<ol type="A">
<li>« Fais un résumé court »</li>
<li>« Pour chaque point, indique l'article ou la page ; si une information n'est pas dans le document, écris « non trouvé dans le document » ; n'utilise pas tes connaissances générales »</li>
<li>« Résume comme un expert du bâtiment »</li>
<li>« Complète avec les exigences habituelles pour ce type de chantier »</li>
</ol>
<p><strong>Réponse : B.</strong> Les renvois permettent de vérifier chaque point dans la source et l'interdiction des connaissances extérieures limite les mélanges. La synthèse oriente la lecture des clauses qui engagent l'entreprise, elle ne la remplace pas.</p>

<h4>Question 2 – Quelle est la principale différence entre résumer et extraire ?</h4>
<ol type="A">
<li>Il n'y en a pas</li>
<li>L'extraction recherche des informations définies à l'avance et les range dans une grille contrôlable</li>
<li>L'extraction produit toujours un texte plus long</li>
<li>Le résumé est toujours plus fiable</li>
</ol>
<p><strong>Réponse : B.</strong> Avec une grille (colonnes, unités, valeur « non indiqué », colonne source), chaque case peut être vérifiée, ce qui rend l'extraction plus fiable qu'une synthèse libre.</p>

<h4>Question 3 – Un assistant compare trois offres de location et propose un coût total pour chacune. Que faites-vous des totaux ?</h4>
<ol type="A">
<li>Vous les reprenez tels quels dans votre bon de commande</li>
<li>Vous les recalculez dans un tableur ou les vérifiez sur les offres, en contrôlant les unités (jours ouvrés ou calendaires, HT ou TTC)</li>
<li>Vous demandez à un deuxième assistant de confirmer</li>
<li>Vous retenez l'offre au total le plus bas sans autre vérification</li>
</ol>
<p><strong>Réponse : B.</strong> Un modèle de langage n'est pas une calculatrice ; il peut aussi mal interpréter une unité. La décision d'achat tient compte d'autres éléments que le prix (périmètre, assurance, fiabilité du fournisseur).</p>

<h4>Question 4 – Quel est le meilleur usage de l'IA pour un tableau de suivi des devis ?</h4>
<ol type="A">
<li>Coller la liste des devis dans la conversation et lui demander le total à reporter dans le bilan</li>
<li>Lui demander la structure du tableau et les formules de tableur, puis les tester sur un échantillon dont on connaît le résultat</li>
<li>Lui demander d'estimer le chiffre d'affaires de l'année</li>
<li>Lui confier le fichier client complet avec les coordonnées</li>
</ol>
<p><strong>Réponse : B.</strong> L'IA est fiable pour concevoir et expliquer des formules ; le calcul est exécuté par le tableur et contrôlé par un cas test.</p>

<h4>Question 5 – Pour illustrer la publication « Notre dernière réalisation », que pouvez-vous utiliser ?</h4>
<ol type="A">
<li>Une image générée par IA d'une belle maison rénovée</li>
<li>Une photo réelle du chantier, éventuellement éclaircie, recadrée et débarrassée d'un élément sans lien avec la prestation</li>
<li>Une photo réelle sur laquelle on a effacé un défaut de l'ouvrage</li>
<li>Une photo d'un autre chantier trouvée sur internet</li>
</ol>
<p><strong>Réponse : B.</strong> Une réalisation s'illustre par une photo réelle ; la retouche ne doit pas modifier la prestation. Présenter une image générée ou empruntée comme une réalisation est trompeur.</p>

<h4>Question 6 – Quelle requête d'image est la plus efficace pour un visuel pédagogique ?</h4>
<ol type="A">
<li>« Une pompe à chaleur »</li>
<li>« Une image professionnelle et moderne »</li>
<li>Une description du sujet, du style, de la composition, des couleurs, du format et des exclusions (pas de texte, pas de logo, pas de personne)</li>
<li>« Une image dans le style d'un illustrateur célèbre »</li>
</ol>
<p><strong>Réponse : C.</strong> Une requête structurée produit un visuel cohérent avec la charte. Les imitations du style d'un artiste identifié exposent à un risque vis-à-vis des droits des tiers, et les textes s'ajoutent après la génération.</p>

<h4>Question 7 – Laquelle de ces sources est une source primaire pour connaître le barème en vigueur d'une aide à la rénovation ?</h4>
<ol type="A">
<li>La réponse d'un assistant connecté au web</li>
<li>Le blog d'un installateur</li>
<li>Le site officiel du dispositif, consulté à la date du jour</li>
<li>Un article de presse de l'année précédente</li>
</ol>
<p><strong>Réponse : C.</strong> Seule la source officielle à jour fait foi. Les autres peuvent servir de piste, à condition de remonter à la source primaire.</p>

<h4>Question 8 – Un outil connecté au web affiche trois liens à l'appui de sa réponse. Que devez-vous faire ?</h4>
<ol type="A">
<li>Rien, la présence de liens prouve l'exactitude</li>
<li>Ouvrir les liens, vérifier que l'information y figure, contrôler la date et l'auteur, remonter au texte officiel si nécessaire</li>
<li>Copier les liens dans votre document sans les ouvrir</li>
<li>Retenir uniquement le premier lien</li>
</ol>
<p><strong>Réponse : B.</strong> La source citée peut ne pas dire ce que la réponse lui attribue, être ancienne ou commerciale. On note la source primaire retenue et la date de consultation.</p>

<h4>Question 9 – Lequel de ces éléments est un signal d'alerte typique d'une hallucination ?</h4>
<ol type="A">
<li>Une réponse qui indique « je ne sais pas »</li>
<li>Une statistique très précise sans source, ou un numéro d'article de loi inattendu</li>
<li>Une réponse courte</li>
<li>Une réponse qui pose une question de clarification</li>
</ol>
<p><strong>Réponse : B.</strong> La précision sans source et les références juridiques pointues sont des signaux classiques. Autoriser l'outil à dire qu'il ne sait pas réduit au contraire le risque.</p>

<h4>Question 10 – Dans la grille qualité de Thermia Rénov, quels critères sont éliminatoires ?</h4>
<ol type="A">
<li>Le ton et la longueur</li>
<li>L'exactitude des faits, l'exactitude des chiffres, l'absence d'invention et l'absence de promesse invérifiable</li>
<li>La mise en page et la présence d'un visuel</li>
<li>Le nombre de sources citées</li>
</ol>
<p><strong>Réponse : B.</strong> Un seul écart sur ces quatre critères impose une correction avant toute diffusion. Les autres critères sont tout aussi nécessaires pour qu'un contenu soit publiable, mais ces quatre-là touchent directement à la loyauté et à la responsabilité de l'entreprise.</p>
`,
      },
      {
        title: "4.9 – Cas pratique corrigé : le dossier de réponse au gymnase de la commune",
        content: `
<h3>Contexte (fictif)</h3>
<p>Thermia Rénov prépare sa réponse à la consultation d'une commune voisine pour l'isolation de la toiture d'un gymnase (voir section 4.1). Sandrine MOREL confie le dossier à Thomas et Karim, avec l'aide de Julie, et leur demande d'utiliser l'IA pour gagner du temps, en respectant la charte de l'entreprise. Ils disposent de :</p>
<ul>
<li>le CCTP (46 pages) et le CCAP (18 pages) de la consultation ;</li>
<li>trois offres de fournisseurs d'isolant, présentées différemment ;</li>
<li>un brouillon de mémoire technique généré la veille par un collègue avec un assistant, à partir de la seule requête « Rédige un mémoire technique pour l'isolation de la toiture d'un gymnase » ;</li>
<li>des photos réelles de deux chantiers similaires réalisés par l'entreprise, avec l'accord des maîtres d'ouvrage ;</li>
<li>la demande de la commune de joindre une « illustration du phasage des travaux ».</li>
</ul>
<p>Extrait du brouillon de mémoire technique :</p>
<blockquote>« Thermia Rénov, forte de plus de 20 ans d'expérience et de 500 chantiers de toitures de bâtiments publics, garantit une réduction de 40 % des consommations de chauffage du gymnase. Nos équipes agréées interviennent conformément aux DTU en vigueur et au décret n° [numéro précis cité par l'outil] de 2024. Nous utilisons exclusivement un isolant biosourcé neutre en carbone. Le chantier sera réalisé en 10 jours. »</blockquote>

<h3>Consigne</h3>
<ol>
<li>Proposez la requête de synthèse du CCTP et du CCAP, et indiquez comment contrôler le résultat.</li>
<li>Proposez une démarche pour comparer les trois offres d'isolant.</li>
<li>Relevez dans l'extrait du brouillon toutes les affirmations à vérifier ou à supprimer, en justifiant, et indiquez comment le mémoire doit être réécrit.</li>
<li>Indiquez comment produire l'illustration du phasage et quelles photos utiliser.</li>
<li>Appliquez la grille qualité au mémoire technique final : quels critères demandent une attention particulière ?</li>
</ol>

<h3>Corrigé</h3>

<h4>1. Synthèse du CCTP et du CCAP</h4>
<p><strong>Requête proposée (pour chaque document, séparément) :</strong></p>
<blockquote>« Je suis conducteur de travaux et je prépare une réponse à une consultation pour l'isolation de la toiture d'un gymnase. Commence par m'indiquer le nombre de pages et les titres des parties que tu as pu lire. Puis présente, sous forme de tableau, les exigences du document : exigences techniques et performances, matériaux imposés ou interdits, documents à fournir (avec la candidature et avant travaux), contrôles et essais, délais et phasage, pénalités, conditions particulières (site occupé, horaires, sécurité). Pour chaque ligne, cite l'article. Si une rubrique n'est pas traitée dans le document, écris « non trouvé dans le document ». N'utilise aucune connaissance extérieure. Termine par la liste des clauses inhabituelles, contraignantes ou ambiguës. »</blockquote>
<p><strong>Contrôle :</strong> vérifier dans le document chaque ligne qui engage l'entreprise (performances, essais, délais, pénalités, documents), en lisant intégralement les articles cités ; traiter le CCAP séparément, car les pénalités et délais y figurent généralement ; contrôler que le nombre de pages lues correspond au document ; noter les questions à poser à l'acheteur public dans le délai prévu par la consultation.</p>

<h4>2. Comparaison des offres d'isolant</h4>
<ol>
<li>Définir les critères à partir du CCTP : performance thermique exigée, réaction au feu, documents techniques demandés, conditionnement, délai de livraison, prix unitaire HT, frais de livraison, conditions de paiement.</li>
<li>Faire extraire chaque offre dans un tableau commun avec la page de référence et la valeur « non indiqué » pour les informations absentes.</li>
<li>Faire lister les écarts de périmètre et les questions à poser aux fournisseurs.</li>
<li>Vérifier sur les fiches techniques les valeurs qui conditionnent la conformité au CCTP.</li>
<li>Recalculer le coût de chaque offre dans le tableur de chiffrage de l'entreprise ; la décision revient à Thomas et Sandrine MOREL.</li>
</ol>

<h4>3. Analyse de l'extrait du brouillon</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Affirmation</th><th>Problème</th><th>Traitement</th></tr>
<tr><td>« Plus de 20 ans d'expérience et 500 chantiers de toitures de bâtiments publics »</td><td>Chiffres inventés par l'outil, qui ne connaît pas l'entreprise</td><td>Remplacer par les références réelles et vérifiables de l'entreprise (chantiers similaires, avec l'accord des maîtres d'ouvrage)</td></tr>
<tr><td>« Garantit une réduction de 40 % des consommations »</td><td>Promesse chiffrée non calculée, engageante, invérifiable à ce stade</td><td>Supprimer ; si le CCTP demande une performance, présenter la performance de l'isolant proposé (résistance thermique) conforme à l'exigence, avec sa source</td></tr>
<tr><td>« Équipes agréées »</td><td>Qualification non précisée, peut-être inexacte</td><td>Mentionner uniquement les qualifications et habilitations réellement détenues, avec leur domaine et les justificatifs demandés par la consultation</td></tr>
<tr><td>« Conformément aux DTU en vigueur »</td><td>Formule générique : l'outil ne connaît ni la toiture ni le procédé retenu</td><td>Vérifier la référence applicable avec Thomas, à partir du CCTP et des documents techniques de référence ; ne conserver que les références vérifiées et pertinentes</td></tr>
<tr><td>« Décret n° … de 2024 »</td><td>Numéro précis de texte, typique d'une hallucination ; aucun lien établi avec le marché</td><td>Vérifier sur Légifrance ; à défaut de pertinence avérée, supprimer</td></tr>
<tr><td>« Isolant biosourcé neutre en carbone »</td><td>Allégation environnementale générale non étayée ; le choix de l'isolant n'est pas encore arrêté</td><td>Décrire l'isolant retenu par ses caractéristiques vérifiables (nature, performances, fiche technique, données environnementales du fabricant si demandées)</td></tr>
<tr><td>« Chantier réalisé en 10 jours »</td><td>Délai inventé, peut contredire le phasage ou le délai du CCAP</td><td>Établir le planning avec Thomas en fonction du phasage imposé et des contraintes du site</td></tr>
</table>
<p><strong>Réécriture du mémoire :</strong> repartir d'une structure générée (présentation de l'entreprise, compréhension du besoin, méthodologie, moyens humains et matériels, phasage, sécurité, gestion des déchets, contrôles qualité, références) mais rédiger chaque partie à partir de la <strong>matière réelle</strong> fournie par Thomas et Karim : moyens réels, références réelles, méthodologie réelle, réponses point par point aux exigences du CCTP. L'IA aide à structurer, reformuler et vérifier la cohérence avec le CCTP (« Pour chaque exigence du tableau, indique si le mémoire y répond et à quel paragraphe »).</p>

<h4>4. Illustration du phasage et photos</h4>
<ul>
<li><strong>Illustration du phasage :</strong> un schéma réalisé dans Canva ou dans un outil de présentation, à partir du planning validé par Thomas : zones de la toiture numérotées, ordre d'intervention, emprise du chantier, accès et zones interdites au public. L'IA peut proposer une mise en page ou générer un fond schématique de bâtiment, mais le contenu (zones, dates, accès) provient du planning réel ; les textes sont ajoutés dans l'outil de mise en page. Si un élément visuel réaliste est généré, il est signalé comme illustration.</li>
<li><strong>Photos :</strong> uniquement les photos réelles des deux chantiers similaires, avec l'accord des maîtres d'ouvrage, légendées (type de travaux, année), éventuellement éclaircies ou recadrées, sans modification de l'ouvrage. Aucune image générée ne doit être présentée comme une référence de l'entreprise.</li>
</ul>

<h4>5. Grille qualité appliquée au mémoire final</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Attention particulière</th></tr>
<tr><td>Pertinence</td><td>Réponse à chaque exigence du CCTP, dans l'ordre attendu par l'acheteur</td></tr>
<tr><td>Exactitude des faits (éliminatoire)</td><td>Références, moyens, qualifications : uniquement le réel, justifiable</td></tr>
<tr><td>Exactitude des chiffres (éliminatoire)</td><td>Performances des produits issues des fiches techniques, délais issus du planning, montants issus du chiffrage</td></tr>
<tr><td>Sources</td><td>Références techniques et réglementaires vérifiées sur les sources primaires</td></tr>
<tr><td>Absence d'invention (éliminatoire)</td><td>Suppression du décret non vérifié et de toute affirmation non fournie</td></tr>
<tr><td>Absence de promesse invérifiable (éliminatoire)</td><td>Pas de pourcentage d'économie garanti ni d'allégation environnementale générale</td></tr>
<tr><td>Mentions et conformité</td><td>Pièces demandées par la consultation, droits sur les photos, illustrations signalées</td></tr>
<tr><td>Confidentialité</td><td>Les documents de la consultation et les prix ont été traités dans l'environnement professionnel prévu ; aucune donnée d'un autre client exposée</td></tr>
<tr><td>Ton et lisibilité</td><td>Ton factuel et précis, sans superlatifs</td></tr>
<tr><td>Responsabilité</td><td>Relecture intégrale par Thomas et Karim, validation et signature par Sandrine MOREL</td></tr>
</table>

<h4>Erreurs fréquentes relevées lors de la correction</h4>
<ul>
<li>Conserver les « 20 ans d'expérience » parce que « ça sonne bien ».</li>
<li>Remplacer « 40 % » par « environ 30 % » au lieu de supprimer la promesse.</li>
<li>Vérifier les DTU mais oublier le décret cité.</li>
<li>Ne pas traiter le CCAP, et donc manquer les pénalités et le délai réel.</li>
<li>Illustrer les références par une image générée d'un gymnase rénové.</li>
</ul>

<blockquote><strong>À retenir.</strong> Sur un dossier à fort enjeu, l'IA accélère la lecture, la comparaison, la structuration et la mise en forme, mais chaque élément qui engage l'entreprise doit provenir de la réalité vérifiée : documents de la consultation lus intégralement sur les clauses clés, fiches techniques, planning et chiffrage internes, références réelles. Les promesses, chiffres et références générés sans matière sont supprimés, les visuels respectent la réalité, et la grille qualité est appliquée avant validation par la direction.</blockquote>
`,
      },
    ],
  },
];
