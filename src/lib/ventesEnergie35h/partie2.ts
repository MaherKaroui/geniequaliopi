import type { CourseChapter } from "../courseContent";

export const TVTE_PARTIE2: CourseChapter[] = [
  {
    title: "Chapitre 3 – Identifier les besoins et attentes des clients particuliers et professionnels (C2)",
    description:
      "Conduire une découverte complète et structurée auprès d'un client particulier ou professionnel : préparation du rendez-vous, prise de contact, questionnement en entonnoir, écoute active et reformulation, motivations d'achat (SONCAS), profil du foyer et catégorie de revenus, visite technique et relevés, lecture d'un DPE, spécificités des copropriétés et du tertiaire (décret tertiaire / dispositif Éco Énergie Tertiaire), fiche de découverte type. Durée indicative : une journée (jour 2 de la formation). Module C2 du programme.",
    sections: [
      {
        title: "3.1 – Préparer le rendez-vous et réussir la prise de contact",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Comprendre pourquoi la découverte est l'étape qui conditionne toute la suite de la vente de travaux énergétiques.</li>
<li>Préparer un rendez-vous de manière méthodique : informations à collecter en amont, documents à demander, matériel à emporter.</li>
<li>Réussir les premières minutes de l'entretien : présentation, cadrage, recueil de l'accord du client sur le déroulé.</li>
</ul>

<h3>Pourquoi la découverte est décisive dans les travaux énergétiques</h3>
<p>Dans la plupart des métiers de la vente, une découverte bâclée fait perdre une vente. Dans la rénovation énergétique, elle peut produire bien pire : une installation <strong>mal dimensionnée</strong> (une pompe à chaleur trop puissante qui fonctionne par cycles courts, ou trop faible qui laisse la résistance d'appoint tourner tout l'hiver), un client qui attendait 70 % d'économies et en obtient 30 %, un dossier d'aide refusé parce qu'un document manquait, un litige, un avis négatif, voire une mise en cause de la qualification RGE de l'entreprise après un contrôle. Le conseiller qui « vend une PAC » sans avoir compris le logement, les habitants, leurs revenus et leurs priorités prend un risque commercial, technique, juridique et réputationnel.</p>
<p>À l'inverse, une découverte rigoureuse produit trois bénéfices immédiats :</p>
<ul>
<li><strong>Une proposition juste</strong> : la solution recommandée répond au vrai problème du client (souvent le confort ou la facture, parfois une contrainte réglementaire ou patrimoniale), et non à ce que l'entreprise a en stock.</li>
<li><strong>Un argumentaire personnalisé</strong> : au chapitre 4, vous construirez vos arguments à partir des mots, des chiffres et des motivations recueillis pendant la découverte. Sans découverte, l'argumentaire est générique, donc peu convaincant.</li>
<li><strong>Une relation de confiance</strong> : dans un secteur durablement marqué par les fraudes et le démarchage agressif (ce qui a conduit le législateur à interdire le démarchage téléphonique pour la rénovation énergétique, voir chapitre consacré à la prospection), le client attend d'abord d'être écouté et non « travaillé ».</li>
</ul>

<blockquote><strong>Rappel du fil rouge.</strong> Thermia Rénov est une SAS <em>fictive</em> de travaux de rénovation énergétique qualifiée RGE, de 14 salariés, installée à Saint-Genis-Laval (Rhône). Elle pose des pompes à chaleur air/eau, isole les combles et les murs, installe des chauffe-eau thermodynamiques et du photovoltaïque en autoconsommation. Nadia est directrice commerciale ; Karim, conseiller commercial débutant, prépare cette semaine son rendez-vous chez M. et Mme Ferrand, propriétaires d'une maison de 1978 chauffée au fioul et classée F au DPE. Tous les chiffres du fil rouge sont fictifs et construits pour le cours.</blockquote>

<h3>D'où vient le rendez-vous ? Qualifier la demande avant de se déplacer</h3>
<p>Un rendez-vous de découverte naît d'une demande entrante (formulaire du site, appel du client, recommandation d'un client satisfait, salon, partenaire prescripteur, Espace Conseil France Rénov'…). Avant de se déplacer, le conseiller procède à une <strong>pré-qualification</strong> par téléphone ou par courriel, à l'initiative du client ou en réponse à sa demande. Son but n'est pas de vendre, mais de vérifier que le déplacement est utile pour les deux parties et de le préparer.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Information à recueillir</th><th>Pourquoi</th><th>Exemple Ferrand (fictif)</th></tr>
<tr><td>Origine de la demande et projet exprimé</td><td>Comprendre le déclencheur et la maturité du projet</td><td>Recommandation d'un voisin client de Thermia Rénov ; « on voudrait se débarrasser du fioul »</td></tr>
<tr><td>Statut d'occupation (propriétaire occupant, bailleur, locataire, copropriétaire)</td><td>Conditionne le décideur et l'accès aux aides</td><td>Propriétaires occupants, résidence principale</td></tr>
<tr><td>Type de bien, année de construction, surface approximative</td><td>Premier ordre de grandeur technique ; éligibilité de nombreux dispositifs liée à l'ancienneté du logement</td><td>Maison individuelle de 1978, environ 120 m² habitables, sous-sol semi-enterré</td></tr>
<tr><td>Mode de chauffage et de production d'eau chaude actuels</td><td>Identifier les solutions envisageables</td><td>Chaudière fioul de 1998, ballon d'eau chaude couplé</td></tr>
<tr><td>Documents disponibles</td><td>Gagner du temps et fiabiliser la découverte</td><td>DPE de 2024 réalisé lors d'un projet de refinancement ; factures de fioul ; dernier avis d'imposition</td></tr>
<tr><td>Personnes présentes au rendez-vous</td><td>Rencontrer tous les décideurs</td><td>Les deux conjoints, un samedi matin</td></tr>
<tr><td>Contraintes connues (budget, calendrier, copropriété, bâtiment classé, lotissement)</td><td>Anticiper les obstacles</td><td>Souhait d'en finir avant l'hiver suivant ; règlement de lotissement à vérifier pour l'unité extérieure</td></tr>
</table>

<h3>La check-list de préparation</h3>
<p>Nadia impose à toute l'équipe de Thermia Rénov une préparation en dix points, réalisée la veille du rendez-vous :</p>
<ol>
<li><strong>Relire la demande</strong> et les notes de pré-qualification ; noter les mots exacts utilisés par le client.</li>
<li><strong>Situer le bien</strong> : vue aérienne (orientation de la toiture, ombrages, mitoyenneté, emplacement possible de l'unité extérieure), zone climatique, altitude. Le Rhône relève de la zone climatique H1c dans la réglementation thermique ; la température extérieure de base sert au dimensionnement du chauffage.</li>
<li><strong>Consulter les documents d'urbanisme</strong> si un projet visible est envisagé (photovoltaïque en toiture, isolation des murs par l'extérieur, unité extérieure en façade) : plan local d'urbanisme, éventuel périmètre de protection des monuments historiques, règlement de lotissement. Une déclaration préalable de travaux peut être nécessaire.</li>
<li><strong>Analyser le DPE</strong> si le client l'a transmis (voir section 3.5) : étiquette, consommations, postes de déperdition, recommandations de travaux.</li>
<li><strong>Préparer les questions</strong> clés à partir de la fiche de découverte (section 3.7), sans en faire un interrogatoire.</li>
<li><strong>Préparer le matériel</strong> : mètre laser, télémètre, thermomètre et hygromètre, appareil photo, lampe, éventuellement caméra thermique (en saison de chauffe), échelle pour l'accès aux combles, chaussures de protection.</li>
<li><strong>Préparer les supports</strong> : plaquette de l'entreprise, attestation de qualification RGE à jour, attestation d'assurance décennale, références de chantiers similaires (avec accord des clients), fiche d'information sur les aides renvoyant aux sources officielles.</li>
<li><strong>Vérifier son agenda</strong> : prévoir 1 h 30 à 2 h pour une maison (découverte + visite technique), davantage pour un immeuble ou un bâtiment tertiaire.</li>
<li><strong>Confirmer le rendez-vous</strong> la veille, en rappelant l'heure, la durée, les personnes attendues et les documents à préparer.</li>
<li><strong>Fixer son objectif de rendez-vous</strong> : en rénovation énergétique, l'objectif d'un premier rendez-vous est rarement la signature. C'est le plus souvent un diagnostic partagé et l'accord du client pour recevoir une proposition chiffrée à une date convenue.</li>
</ol>

<h3>Les documents à demander au client</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Document</th><th>Utilité</th></tr>
<tr><td>Diagnostic de performance énergétique (DPE) ou audit énergétique</td><td>Étiquette, consommations, recommandations ; point de départ des scénarios de travaux</td></tr>
<tr><td>Factures d'énergie des deux ou trois dernières années (fioul, gaz, électricité, bois)</td><td>Consommations réelles, à comparer aux consommations conventionnelles du DPE</td></tr>
<tr><td>Dernier avis d'imposition (revenu fiscal de référence)</td><td>Déterminer la catégorie de revenus pour les aides ; le client reste libre de ne pas le montrer au premier rendez-vous</td></tr>
<tr><td>Plans, permis de construire, factures de travaux antérieurs</td><td>Connaître la composition des parois et l'historique (isolation déjà réalisée, changement de fenêtres)</td></tr>
<tr><td>Contrat d'entretien de la chaudière, dernier certificat de ramonage</td><td>État de l'installation existante</td></tr>
<tr><td>Pour une copropriété : règlement de copropriété, procès-verbaux d'assemblée générale, DPE collectif, plan pluriannuel de travaux</td><td>Savoir ce qui relève des parties privatives et des parties communes et ce qui a déjà été décidé</td></tr>
<tr><td>Pour un bâtiment tertiaire : déclarations sur la plateforme OPERAT, factures, bail, surface de plancher par activité</td><td>Situer le bâtiment face au décret tertiaire</td></tr>
</table>

<h3>Les premières minutes : la prise de contact</h3>
<p>Le client se forme une opinion très vite : ponctualité, tenue, véhicule propre et identifié, présentation claire. Dans un secteur où des escrocs se sont présentés comme « mandatés par l'État » ou « envoyés par la mairie », la transparence sur l'identité de l'entreprise est un impératif, pas une formalité.</p>
<h4>La règle des « 4 × 20 »</h4>
<p>Une règle mnémotechnique bien connue des commerciaux rappelle que les vingt premières secondes, les vingt premiers gestes, les vingt premiers mots et les vingt centimètres du visage (sourire, regard) donnent le ton. C'est un repère pédagogique, pas une loi scientifique ; il rappelle simplement que la première impression se travaille.</p>
<h4>Les quatre temps de la prise de contact</h4>
<ol>
<li><strong>Se présenter</strong> : nom, fonction, entreprise. « Bonjour Madame, bonjour Monsieur, je suis Karim B., conseiller chez Thermia Rénov, entreprise de rénovation énergétique qualifiée RGE installée à Saint-Genis-Laval. » Remettre une carte de visite.</li>
<li><strong>Rappeler l'origine du rendez-vous</strong> : « Vous nous avez contactés sur la recommandation de M. Garnier, votre voisin, au sujet de votre chauffage au fioul. »</li>
<li><strong>Proposer un déroulé et une durée</strong> (le « contrat d'entretien ») : « Je vous propose qu'on prenne d'abord vingt à trente minutes pour que vous m'expliquiez votre situation et vos attentes ; ensuite je ferai le tour de la maison pour les relevés techniques, chaufferie et combles compris ; puis on fera le point ensemble sur les pistes possibles. Je ne vous remettrai pas de devis aujourd'hui : je reviendrai vers vous avec une proposition chiffrée et argumentée. Cela vous convient-il ? »</li>
<li><strong>Obtenir l'accord</strong> : la question finale engage le client dans l'échange et le rassure. Elle désamorce la crainte d'une signature arrachée.</li>
</ol>
<p>Ce cadrage a une vertu supplémentaire : en annonçant qu'aucun devis ne sera remis le jour même, le conseiller se distingue des pratiques de vente « en un coup » qui ont nourri la méfiance du public, et il se donne le temps de dimensionner correctement l'installation.</p>

<h3>Particularités de la prise de contact en B2B</h3>
<ul>
<li><strong>Copropriété</strong> : le premier interlocuteur est souvent le syndic ou le président du conseil syndical ; il faut comprendre d'emblée qui décide (l'assemblée générale) et à quelle échéance (date de la prochaine AG, délais de convocation).</li>
<li><strong>Tertiaire</strong> : l'interlocuteur peut être un gérant de SCI, un directeur administratif et financier, un responsable des services généraux, un « energy manager ». On se présente avec une proposition de valeur adaptée (maîtrise des charges, conformité au décret tertiaire, image), et l'on vérifie qui d'autre participe à la décision.</li>
<li><strong>Durée</strong> : le premier rendez-vous professionnel est souvent plus court et plus factuel ; il débouche sur une visite technique planifiée avec le responsable technique du site.</li>
</ul>

<h3>Erreurs fréquentes lors de la préparation et de la prise de contact</h3>
<ul>
<li>Arriver sans avoir regardé le bien sur une vue aérienne : on découvre sur place une toiture orientée au nord pour un projet photovoltaïque.</li>
<li>Commencer par présenter l'entreprise pendant quinze minutes : le client veut parler de sa maison.</li>
<li>Rencontrer un seul des deux conjoints et découvrir plus tard que l'autre décide.</li>
<li>Promettre au téléphone un montant d'aide (« vous aurez droit à 10 000 € ») avant toute vérification : c'est faux dans la majorité des cas et c'est le meilleur moyen de perdre la confiance.</li>
<li>Oublier de demander les documents : le second rendez-vous est alors consacré à ce qui aurait dû être fait au premier.</li>
</ul>

<blockquote><strong>À retenir.</strong> La découverte conditionne la justesse technique de la solution, la pertinence de l'argumentaire et la confiance du client. On pré-qualifie la demande avant de se déplacer, on prépare le rendez-vous avec méthode (vue aérienne, urbanisme, DPE, documents, matériel, supports) et on ouvre l'entretien par une présentation transparente, le rappel de l'origine du rendez-vous et un déroulé accepté par le client. L'objectif d'un premier rendez-vous est un diagnostic partagé, pas une signature.</blockquote>
`,
      },
      {
        title: "3.2 – Conduire la découverte : questionnement et technique de l'entonnoir",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Maîtriser les différents types de questions et savoir quand les utiliser.</li>
<li>Conduire une découverte selon la technique de l'entonnoir, du général au particulier.</li>
<li>Explorer de manière systématique les cinq dimensions d'un projet de rénovation énergétique : les personnes, le logement, les usages, le projet et les moyens.</li>
</ul>

<h3>Les types de questions</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type</th><th>Définition</th><th>Exemple en rénovation énergétique</th><th>Usage</th></tr>
<tr><td>Question ouverte</td><td>Laisse le client répondre librement, avec ses mots</td><td>« Qu'est-ce qui vous a amenés à nous contacter maintenant ? » ; « Comment se passe l'hiver dans cette maison ? »</td><td>Ouvrir un thème, faire émerger les motivations et les émotions</td></tr>
<tr><td>Question fermée</td><td>Appelle une réponse courte : oui/non ou une information précise</td><td>« La chaudière a-t-elle plus de quinze ans ? » ; « Combien de litres de fioul avez-vous commandés l'an dernier ? »</td><td>Vérifier, chiffrer, conclure un thème</td></tr>
<tr><td>Question alternative</td><td>Propose un choix entre plusieurs options</td><td>« Vous préférez que les travaux aient lieu avant l'hiver, ou au printemps ? »</td><td>Faire préciser une préférence, avancer vers la décision</td></tr>
<tr><td>Question relais (ou rebond)</td><td>Reprend un mot du client pour l'inviter à développer</td><td>« Vous dites que la chambre du fond est "glaciale" ? »</td><td>Approfondir sans orienter</td></tr>
<tr><td>Question miroir</td><td>Répète simplement la fin de la phrase du client, sur un ton interrogatif</td><td>Client : « On en a assez du fioul. » Conseiller : « Assez du fioul ? »</td><td>Faire préciser une émotion ou un motif</td></tr>
<tr><td>Question d'implication</td><td>Fait mesurer au client les conséquences d'un problème</td><td>« Si le prix du fioul remontait comme en 2022, qu'est-ce que cela représenterait pour votre budget ? »</td><td>Faire prendre conscience de l'enjeu (à utiliser avec tact, sans dramatiser)</td></tr>
<tr><td>Question de contrôle</td><td>Vérifie la compréhension mutuelle</td><td>« Si je résume bien, votre priorité est d'abord le confort à l'étage, puis la facture : c'est bien cela ? »</td><td>Clore une étape, valider une reformulation</td></tr>
</table>
<p>À proscrire : la <strong>question orientée</strong> (« Vous ne voudriez pas continuer à payer autant de fioul, n'est-ce pas ? »), qui manipule au lieu de découvrir, et l'<strong>enchaînement de questions fermées</strong>, qui transforme l'entretien en interrogatoire.</p>

<h3>La technique de l'entonnoir</h3>
<p>L'entonnoir consiste à partir de questions <strong>ouvertes et larges</strong>, qui laissent le client exprimer sa situation et ses priorités, pour aller progressivement vers des questions <strong>précises et fermées</strong>, qui chiffrent et vérifient. On termine chaque thème par une reformulation et une question de contrôle.</p>
<ol>
<li><strong>Haut de l'entonnoir (ouvert)</strong> : « Parlez-moi de votre maison et de la façon dont vous y vivez. »</li>
<li><strong>Approfondissement (relais, miroir)</strong> : « Vous dites que l'étage est difficile à chauffer : dans quelles pièces, à quels moments ? »</li>
<li><strong>Précision (fermées, chiffrées)</strong> : « Quelle température affichez-vous au thermostat ? Combien de litres de fioul par an ? »</li>
<li><strong>Vérification (contrôle)</strong> : « Donc, en résumé… c'est bien ça ? »</li>
</ol>
<p>L'entonnoir s'applique à chaque grand thème de la découverte. L'erreur fréquente du débutant est de commencer par le bas de l'entonnoir (« Quelle est la puissance de votre chaudière ? »), ce qui donne des informations techniques mais aucune motivation.</p>

<h3>Les cinq dimensions à explorer</h3>
<h4>1. Les personnes</h4>
<ul>
<li>Composition du foyer, âges, présence en journée (télétravail, retraite, enfants en bas âge), projets de vie (départ des enfants, accueil d'un parent, revente à moyen terme).</li>
<li>Qui décide, qui finance, qui sera présent pendant les travaux.</li>
<li>Sensibilités particulières : santé (asthme, allergies), personnes âgées sensibles au froid ou à la chaleur, attachement à la maison.</li>
</ul>
<h4>2. Le logement</h4>
<ul>
<li>Année de construction, surface, nombre de niveaux, mitoyenneté, sous-sol, combles (perdus ou aménagés).</li>
<li>Travaux déjà réalisés : fenêtres, isolation, chaudière, ventilation.</li>
<li>Points faibles ressentis : pièces froides, condensation, moisissures, courants d'air, surchauffe l'été.</li>
</ul>
<h4>3. Les usages et les consommations</h4>
<ul>
<li>Températures de consigne, programmation, chauffage d'appoint (poêle, radiateurs électriques), pièces fermées l'hiver.</li>
<li>Consommations réelles (factures) et dépenses annuelles ; eau chaude sanitaire (nombre de douches, bains).</li>
<li>Équipements électriques importants (véhicule électrique, piscine, climatisation) : utiles pour un projet photovoltaïque.</li>
</ul>
<h4>4. Le projet</h4>
<ul>
<li>Déclencheur : panne, prix de l'énergie, inconfort, vente ou location à venir, obligation réglementaire, conseil d'un proche, information sur les aides.</li>
<li>Ce que le client a déjà fait : devis d'autres entreprises, rendez-vous avec un conseiller France Rénov', simulation sur le site officiel des aides.</li>
<li>Calendrier souhaité, contraintes (vacances, naissance, travail à domicile).</li>
<li>Critères de choix de l'entreprise : prix, proximité, garanties, recommandations, service après-vente.</li>
</ul>
<h4>5. Les moyens</h4>
<ul>
<li>Budget envisagé, épargne mobilisable, recours possible à un prêt (éco-prêt à taux zéro, prêt avance mutation, prêt bancaire).</li>
<li>Revenus du foyer, pour situer la catégorie au regard des aides (voir section 3.4).</li>
<li>Délais de financement : certaines aides sont versées après les travaux, ce qui suppose une avance de trésorerie ou un dispositif d'avance.</li>
</ul>

<h3>Exemple de séquence (extrait du rendez-vous de Karim chez les Ferrand, dialogue fictif)</h3>
<blockquote>
<p><strong>Karim</strong> : Qu'est-ce qui vous a décidés à vous lancer maintenant ?</p>
<p><strong>Mme Ferrand</strong> : L'hiver dernier, on a commandé deux fois du fioul, et la deuxième livraison nous a fait mal. Et puis la chaudière a 27 ans, le chauffagiste nous a dit qu'elle tenait encore, mais pour combien de temps…</p>
<p><strong>Karim</strong> : Deux livraisons… cela représente combien sur l'année, à peu près ?</p>
<p><strong>M. Ferrand</strong> : Autour de 2 200 litres. Je l'ai noté, je vous montrerai les factures.</p>
<p><strong>Karim</strong> : Merci, ce sera très utile. Et côté confort, comment se passe l'hiver dans la maison ?</p>
<p><strong>Mme Ferrand</strong> : En bas, ça va. Mais les chambres à l'étage sont froides, surtout celle du fond, côté nord. Notre fille vient avec les petits à Noël, on met un radiateur électrique.</p>
<p><strong>Karim</strong> : Les chambres de l'étage sont froides, en particulier celle du fond. Les combles au-dessus ont-ils été isolés à un moment ?</p>
<p><strong>M. Ferrand</strong> : Il y a de la laine de verre d'origine, une dizaine de centimètres je pense. On n'y est pas monté depuis longtemps.</p>
<p><strong>Karim</strong> : Je regarderai tout à l'heure, si vous m'y autorisez. Si je résume : vous voulez sortir du fioul, à la fois parce que la facture pèse et parce que la chaudière vieillit, et vous aimeriez que l'étage soit enfin confortable, notamment quand la famille vient. C'est bien cela ?</p>
<p><strong>Mme Ferrand</strong> : Exactement.</p>
</blockquote>
<p>On observe la progression : question ouverte sur le déclencheur, question miroir (« Deux livraisons… »), question fermée chiffrée, question ouverte sur le confort, reformulation, question fermée technique, puis synthèse et question de contrôle.</p>

<h3>Le bon ratio de parole</h3>
<p>Pendant la découverte, le client doit parler nettement plus que le conseiller. Un repère couramment utilisé en formation commerciale est de viser environ deux tiers du temps de parole pour le client. Il ne s'agit pas d'une norme mesurée mais d'un objectif d'attitude : si vous parlez plus que votre client pendant la découverte, vous êtes déjà en train d'argumenter.</p>

<h3>Prendre des notes</h3>
<ul>
<li>Demander l'autorisation : « Vous permettez que je prenne quelques notes pour ne rien oublier ? »</li>
<li>Noter les <strong>mots exacts</strong> du client (« la chambre glaciale », « le fioul nous a fait mal ») : ils seront réutilisés dans l'argumentaire.</li>
<li>Utiliser la fiche de découverte (section 3.7) comme guide, sans la suivre ligne à ligne devant le client.</li>
<li>Si une tablette ou un logiciel est utilisé, garder le contact visuel et ne pas taper pendant que le client exprime une émotion.</li>
</ul>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Poser des questions dont on n'écoute pas la réponse, parce qu'on prépare déjà son argument.</li>
<li>Interrompre le client pour corriger une information technique (« Non, une PAC ne fonctionne pas comme ça… ») : on le fera plus tard, avec pédagogie.</li>
<li>Négliger les questions sur les personnes et le projet pour se concentrer sur la technique.</li>
<li>Ne pas chiffrer : sans consommation ni dépense annuelle, il sera impossible de calculer une économie et un temps de retour crédibles au chapitre 4.</li>
<li>Oublier de demander ce que le client a déjà fait (autres devis, conseiller France Rénov') : on ignore alors la concurrence et les informations dont il dispose.</li>
</ul>

<blockquote><strong>À retenir.</strong> La découverte suit l'entonnoir : des questions ouvertes pour faire émerger la situation et les motivations, des questions relais et miroir pour approfondir, des questions fermées pour chiffrer et vérifier, une reformulation et une question de contrôle pour clore chaque thème. On explore systématiquement les personnes, le logement, les usages et consommations, le projet et les moyens. Le client parle plus que le conseiller, et ses mots exacts sont notés.</blockquote>
`,
      },
      {
        title: "3.3 – Écoute active, reformulation et motivations d'achat (SONCAS)",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Pratiquer l'écoute active : attitudes, relances, silences, observation du non-verbal.</li>
<li>Maîtriser les différentes formes de reformulation et savoir les utiliser au bon moment.</li>
<li>Identifier les motivations d'achat dominantes d'un client grâce à la grille SONCAS (et sa variante SONCASE) et en déduire les leviers de l'argumentaire.</li>
</ul>

<h3>L'écoute active</h3>
<p>L'écoute active, notion popularisée par le psychologue Carl Rogers, consiste à écouter l'autre avec une attention réelle, sans jugement, en cherchant à comprendre son point de vue et en lui montrant qu'il est compris. En vente, elle permet de recueillir une information plus riche et plus sincère, et elle installe la confiance.</p>
<h4>Les comportements de l'écoute active</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Comportement</th><th>Ce que cela signifie concrètement</th></tr>
<tr><td>Disponibilité</td><td>Téléphone en silencieux, regard tourné vers le client, posture ouverte ; on ne regarde pas sa montre</td></tr>
<tr><td>Relances verbales et non verbales</td><td>Hochements de tête, « je vois », « d'accord », « et ensuite ? »</td></tr>
<tr><td>Silence</td><td>Laisser quelques secondes après une réponse : le client complète souvent par l'information la plus importante</td></tr>
<tr><td>Non-jugement</td><td>Ne pas commenter les choix passés (« Ah, vous avez mis du simple vitrage en 2005 ? ») ; le client se fermerait</td></tr>
<tr><td>Empathie</td><td>Reconnaître le vécu (« Avoir froid dans sa propre maison, c'est usant ») sans en rajouter</td></tr>
<tr><td>Observation</td><td>Repérer le non-verbal : un regard échangé entre conjoints à l'évocation du budget, une hésitation, un enthousiasme</td></tr>
<tr><td>Prise de notes</td><td>Noter les mots du client ; l'écrit montre aussi que l'on prend sa parole au sérieux</td></tr>
</table>

<h3>La reformulation</h3>
<p>Reformuler, c'est redire avec d'autres mots, ou avec les mots du client, ce que l'on a compris, pour le vérifier et pour le montrer. Une bonne reformulation se termine presque toujours par une question de contrôle.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Forme</th><th>Principe</th><th>Exemple</th></tr>
<tr><td>Reformulation-écho</td><td>Reprendre les mots du client</td><td>« La chambre du fond est glaciale. »</td></tr>
<tr><td>Reformulation-synthèse</td><td>Résumer plusieurs éléments en une phrase</td><td>« Si je résume : sortir du fioul, gagner en confort à l'étage et maîtriser le budget. C'est bien ça ? »</td></tr>
<tr><td>Reformulation-clarification</td><td>Mettre en mots ce que le client exprime de manière confuse</td><td>« Si je comprends bien, ce qui vous inquiète, ce n'est pas tant le montant des travaux que d'avoir à avancer l'argent avant de toucher les aides ? »</td></tr>
<tr><td>Reformulation-inversion</td><td>Présenter la même idée sous un autre angle</td><td>« Autrement dit, vous ne voulez pas d'une solution qui vous oblige à refaire des travaux dans cinq ans. »</td></tr>
<tr><td>Reformulation-chiffrée</td><td>Traduire en chiffres</td><td>« 2 200 litres par an, au prix de votre dernière livraison, cela fait environ 2 500 € par an pour le chauffage et l'eau chaude. »</td></tr>
</table>
<p>Les moments clés de la reformulation : à la fin de chaque thème de l'entonnoir, avant de passer à la visite technique, et en clôture de rendez-vous (synthèse complète validée par le client). Cette synthèse validée devient la première page de la proposition commerciale (chapitre 4).</p>

<h3>Les motivations d'achat : la grille SONCAS</h3>
<p>La grille SONCAS est un outil classique de la vente en France pour identifier les leviers psychologiques qui motivent un achat. Chaque client combine plusieurs motivations, mais une ou deux dominent souvent. On ajoute fréquemment une septième lettre, <strong>E</strong> comme <strong>Environnement</strong> (grille SONCASE), particulièrement pertinente dans la rénovation énergétique.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Motivation</th><th>Ce que recherche le client</th><th>Indices dans le discours</th><th>Leviers d'argumentation dans les travaux énergétiques</th></tr>
<tr><td><strong>S – Sécurité</strong></td><td>Être rassuré, éviter les risques, les arnaques, les pannes</td><td>« On a entendu tellement d'histoires… », « Et si ça tombe en panne ? », questions sur les garanties</td><td>Qualification RGE vérifiable, assurance décennale, garanties fabricant, contrat d'entretien, références locales, absence de paiement anticipé, transparence sur les aides</td></tr>
<tr><td><strong>O – Orgueil</strong></td><td>Être valorisé, avoir un logement exemplaire, être reconnu comme avisé</td><td>« On veut ce qui se fait de mieux », « Mon beau-frère a mis une PAC… »</td><td>Performance, étiquette DPE améliorée, maison « parmi les plus performantes du quartier », choix réfléchi et responsable</td></tr>
<tr><td><strong>N – Nouveauté</strong></td><td>Technologie récente, innovation, pilotage connecté</td><td>Questions sur les applications, la domotique, les dernières générations d'appareils</td><td>Régulation connectée, suivi de production photovoltaïque, fluides frigorigènes récents, pilotage à distance</td></tr>
<tr><td><strong>C – Confort</strong></td><td>Simplicité, bien-être, tranquillité</td><td>« On a froid à l'étage », « On ne veut plus s'occuper des livraisons de fioul », « On ne veut pas de travaux interminables »</td><td>Chaleur homogène, fin des livraisons et de l'odeur du fioul, confort d'été, chantier court et propre, interlocuteur unique</td></tr>
<tr><td><strong>A – Argent</strong></td><td>Dépenser moins, bien investir, obtenir des aides</td><td>Questions sur le prix, les aides, les économies, comparaison de devis</td><td>Économies annuelles estimées, reste à charge après aides, temps de retour, financement (éco-PTZ), valeur du bien</td></tr>
<tr><td><strong>S – Sympathie</strong></td><td>Relation humaine, confiance dans la personne</td><td>Conversation personnelle, intérêt pour le conseiller, recommandation d'un proche</td><td>Disponibilité, entreprise locale, suivi par le même interlocuteur, écoute</td></tr>
<tr><td><strong>E – Environnement</strong></td><td>Réduire son empreinte carbone, agir pour le climat, transmettre</td><td>« On veut faire notre part », « pour les petits-enfants »</td><td>Réduction des émissions de gaz à effet de serre, sortie des énergies fossiles, production d'électricité renouvelable</td></tr>
</table>

<h3>Repérer et confirmer la motivation dominante</h3>
<ol>
<li><strong>Écouter les indices</strong> : mots récurrents, questions posées spontanément, émotions.</li>
<li><strong>Formuler une hypothèse</strong> : chez les Ferrand, « fioul nous a fait mal » (A), « chambres froides, les petits-enfants » (C, et une dimension affective), « pour combien de temps » (S).</li>
<li><strong>Vérifier par une question</strong> : « Parmi tout ce dont nous avons parlé, qu'est-ce qui compte le plus pour vous : la facture, le confort, ou la tranquillité d'esprit sur la durée ? »</li>
<li><strong>Hiérarchiser</strong> : les Ferrand répondent « le confort d'abord, mais il faut que ce soit raisonnable financièrement ». Motivation dominante : Confort ; secondaires : Argent et Sécurité.</li>
</ol>
<p>Cette hiérarchie détermine l'ordre des arguments au chapitre 4 : on ouvrira sur le confort (chaleur homogène, étage enfin habitable l'hiver), on poursuivra sur la maîtrise du budget, on terminera sur les garanties.</p>

<h3>Limites et précautions</h3>
<ul>
<li>SONCAS est une <strong>grille de lecture</strong>, pas une étiquette : un client n'est pas « un A ». Ses motivations peuvent évoluer pendant l'entretien.</li>
<li>Les deux membres d'un couple, ou les différents décideurs d'une entreprise, ont souvent des motivations différentes ; il faut toutes les identifier (voir aussi section 3.6 pour le B2B).</li>
<li>Utiliser les motivations pour <strong>adapter</strong> la présentation d'une solution utile au client, jamais pour vendre une solution inadaptée. Jouer sur la peur (« Votre chaudière peut exploser ») est contraire à la déontologie et peut constituer une pratique commerciale trompeuse ou agressive au sens du code de la consommation.</li>
</ul>

<h3>Les freins : la face cachée des motivations</h3>
<p>À chaque motivation correspond un frein potentiel, qu'il faut repérer dès la découverte pour le traiter (le traitement des objections fait l'objet d'un chapitre spécifique) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Motivation</th><th>Frein associé</th><th>Question de découverte pour le faire émerger</th></tr>
<tr><td>Sécurité</td><td>Peur de l'arnaque, peur que la technologie ne fonctionne pas</td><td>« Qu'est-ce qui vous ferait hésiter à vous lancer ? »</td></tr>
<tr><td>Argent</td><td>Peur du coût, de l'avance de trésorerie, des aides non versées</td><td>« Comment envisagez-vous le financement : épargne, prêt, les deux ? »</td></tr>
<tr><td>Confort</td><td>Peur du chantier (bruit, poussière, durée), du bruit de l'unité extérieure</td><td>« Y a-t-il des contraintes pendant les travaux ? »</td></tr>
<tr><td>Orgueil</td><td>Crainte de faire un mauvais choix devant l'entourage</td><td>« Avez-vous des proches qui ont réalisé ce type de travaux ? Qu'en disent-ils ? »</td></tr>
<tr><td>Environnement</td><td>Doute sur le bilan écologique réel (fluides frigorigènes, fabrication des panneaux)</td><td>« Qu'est-ce qui est important pour vous côté environnement ? »</td></tr>
</table>

<blockquote><strong>À retenir.</strong> L'écoute active (disponibilité, relances, silences, non-jugement, empathie, observation) permet de recueillir une information sincère. La reformulation, sous ses différentes formes, vérifie la compréhension et se conclut par une question de contrôle ; la synthèse finale validée par le client ouvre la proposition commerciale. La grille SONCAS (ou SONCASE) aide à repérer les motivations dominantes et leurs freins, pour ordonner l'argumentaire, jamais pour manipuler.</blockquote>
`,
      },
      {
        title: "3.4 – Le profil du foyer : confort, facture, valeur verte, santé et revenus",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Identifier les attentes typiques d'un foyer qui envisage des travaux énergétiques : confort d'hiver et d'été, maîtrise de la facture, valeur patrimoniale, santé et qualité de l'air.</li>
<li>Situer un foyer dans les catégories de revenus utilisées pour les aides publiques, sans inventer de barème.</li>
<li>Repérer les situations particulières : précarité énergétique, propriétaire bailleur, vente prochaine, résidence secondaire.</li>
</ul>

<h3>Les grandes familles d'attentes</h3>
<h4>1. Le confort thermique d'hiver</h4>
<p>C'est très souvent l'attente première, même lorsque le client parle d'abord d'argent. Le confort ne dépend pas seulement de la température de l'air : il dépend aussi de la <strong>température des parois</strong> (un mur froid « rayonne » du froid même si l'air est à 20 °C), des <strong>courants d'air</strong>, de l'<strong>homogénéité</strong> entre les pièces et entre le bas et le haut des pièces, et de l'<strong>humidité</strong>. C'est pourquoi un changement de générateur seul (remplacer la chaudière par une PAC) ne règle pas toujours l'inconfort d'une pièce sous des combles mal isolés : la découverte doit faire émerger ces nuances pour proposer la bonne combinaison de travaux.</p>
<p>Questions utiles : « Quelles pièces sont les plus inconfortables ? », « Ressentez-vous des courants d'air ? », « Avez-vous des traces de condensation sur les fenêtres ou de moisissures dans les angles ? », « À quelle température chauffez-vous ? ».</p>
<h4>2. Le confort d'été</h4>
<p>Les vagues de chaleur se multiplient ; une maison mal isolée sous toiture devient étouffante l'été. Le confort d'été est désormais un argument majeur pour l'isolation des combles et des toitures (avec des isolants à forte inertie ou un déphasage suffisant), pour les protections solaires et, le cas échéant, pour une pompe à chaleur réversible. Le DPE actuel comporte d'ailleurs un indicateur de confort d'été.</p>
<h4>3. La maîtrise de la facture</h4>
<ul>
<li>Recueillir les <strong>consommations réelles</strong> (litres de fioul, kWh de gaz ou d'électricité) et les <strong>dépenses</strong> sur deux ou trois ans : les prix ont beaucoup varié ces dernières années, une seule année est trompeuse.</li>
<li>Distinguer chauffage, eau chaude et autres usages (cuisson, électroménager), quand c'est possible.</li>
<li>Ne jamais promettre une économie « garantie » : la consommation dépend du climat de l'année, du comportement des occupants et de l'évolution des prix. On parle d'<strong>estimation</strong> fondée sur des hypothèses explicites.</li>
</ul>
<h4>4. La valeur patrimoniale (« valeur verte »)</h4>
<p>On appelle valeur verte l'écart de prix observé, à caractéristiques comparables, entre des logements selon leur étiquette énergétique. Les notaires de France publient régulièrement des études sur ce sujet ; les écarts observés varient selon les régions, les types de biens et les périodes. On peut citer ces études en renvoyant à leur source, sans promettre une plus-value chiffrée sur un bien donné.</p>
<p>La valeur patrimoniale est aussi <strong>réglementaire</strong> :</p>
<ul>
<li>Pour les <strong>propriétaires bailleurs</strong>, la loi Climat et résilience du 22 août 2021 a introduit un niveau de performance minimal pour qu'un logement soit qualifié de décent : les logements classés G ne peuvent plus être proposés à la location (nouveaux baux, renouvellements, reconductions) depuis le 1er janvier 2025, les logements F à compter de 2028 et les logements E à compter de 2034, selon le calendrier fixé par la loi (dates à vérifier sur service-public.fr en cas d'évolution).</li>
<li>Pour la <strong>vente</strong> d'une maison individuelle ou d'un immeuble en monopropriété, un <strong>audit énergétique</strong> réglementaire est exigé lorsque le bien est classé F ou G (depuis le 1er avril 2023) ou E (depuis le 1er janvier 2025) ; il doit être remis dès la première visite.</li>
</ul>
<p>Un client qui envisage de vendre ou de louer son bien a donc des motivations spécifiques : gagner une ou plusieurs classes au DPE, pouvoir continuer à louer, vendre plus facilement.</p>
<h4>5. La santé et la qualité de l'air intérieur</h4>
<ul>
<li>Humidité, condensation et moisissures sont des signaux à relever : ils traduisent souvent une ventilation insuffisante, parfois aggravée par des travaux d'étanchéité (changement de fenêtres sans ventilation adaptée).</li>
<li>Toute isolation renforcée doit s'accompagner d'une réflexion sur la <strong>ventilation</strong> (VMC simple ou double flux) : c'est un point de vigilance technique et un argument de santé.</li>
<li>Personnes vulnérables (enfants en bas âge, personnes âgées, malades chroniques) : le froid et les fortes chaleurs ont des effets sur la santé ; le conseiller ne pose pas de diagnostic médical mais prend en compte ces attentes.</li>
<li>Combustion : les anciens appareils à combustion et les cuves de fioul présentent des contraintes (odeurs, entretien, risque de fuite) ; il convient de rester factuel et de ne pas dramatiser.</li>
</ul>
<h4>6. La simplicité et l'autonomie</h4>
<p>Fin des commandes de fioul, fin du ramonage, pilotage simple, interlocuteur unique, prise en charge du dossier d'aides : ces attentes « de service » pèsent beaucoup, notamment chez les clients âgés.</p>

<h3>Les revenus du foyer et les catégories utilisées par les aides</h3>
<p>Les principales aides publiques à la rénovation des logements modulent leur montant selon les <strong>revenus du foyer</strong>. Pour MaPrimeRénov', le foyer est classé dans l'une de quatre catégories, désignées par une couleur, en fonction de son <strong>revenu fiscal de référence</strong> (figurant sur l'avis d'imposition) et du <strong>nombre de personnes</strong> composant le ménage, avec des plafonds différents en Île-de-France et dans les autres régions :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Catégorie</th><th>Couleur</th><th>Principe</th></tr>
<tr><td>Revenus très modestes</td><td>Bleu</td><td>Taux d'aide les plus élevés</td></tr>
<tr><td>Revenus modestes</td><td>Jaune</td><td>Taux d'aide élevés</td></tr>
<tr><td>Revenus intermédiaires</td><td>Violet</td><td>Taux d'aide intermédiaires</td></tr>
<tr><td>Revenus supérieurs</td><td>Rose</td><td>Aides les plus faibles ; certaines aides ou certains parcours leur sont fermés</td></tr>
</table>
<p><strong>Les plafonds de revenus, les taux, les plafonds de dépenses et les gestes éligibles évoluent chaque année</strong>, parfois en cours d'année. À titre d'exemple, les règles 2026 ont restreint le parcours « par geste » (certains travaux, comme l'isolation des murs, n'y sont plus finançables depuis le 1er janvier 2026 selon les annonces officielles) et réservé le parcours accompagné de rénovation d'ampleur aux logements les moins performants. Le conseiller ne mémorise donc pas des barèmes : il sait <strong>où les vérifier</strong> (france-renov.gouv.fr, simulateur officiel « Mes Aides Réno », service-public.fr, site de l'Anah) et il le dit au client.</p>

<h4>Comment aborder les revenus avec tact</h4>
<ul>
<li>Expliquer pourquoi la question est posée : « Les aides de l'État dépendent du revenu fiscal de référence et de la taille du foyer. Pour vous donner une estimation sérieuse, j'aurais besoin de savoir dans quelle tranche vous vous situez. Vous pouvez aussi le vérifier vous-mêmes sur le simulateur officiel. »</li>
<li>Proposer de situer le foyer dans une tranche plutôt que de demander le chiffre exact si le client hésite ; lui montrer le tableau officiel en vigueur et le laisser se placer.</li>
<li>Ne pas photographier l'avis d'imposition sans nécessité ; si un document est conservé pour constituer un dossier, informer le client de l'usage et de la durée de conservation (RGPD).</li>
<li>Ne jamais affirmer une catégorie ni un montant d'aide sans vérification : l'erreur se paie en confiance perdue, voire en litige.</li>
</ul>

<h3>Les autres paramètres qui conditionnent les aides</h3>
<p>Sans entrer dans les barèmes, le conseiller vérifie systématiquement les paramètres d'éligibilité stables d'un dispositif à l'autre :</p>
<ul>
<li><strong>Statut</strong> : propriétaire occupant, propriétaire bailleur (avec engagement de location), syndicat de copropriétaires, locataire (accès limité).</li>
<li><strong>Usage</strong> : résidence principale (la plupart des aides), résidence secondaire (accès très restreint).</li>
<li><strong>Ancienneté du logement</strong> : la plupart des dispositifs exigent un logement achevé depuis au moins quinze ans (MaPrimeRénov') ou deux ans (taux réduit de TVA, certains éco-PTZ) ; conditions à vérifier pour chaque aide.</li>
<li><strong>Étiquette DPE</strong> et gain de classes visé, pour les parcours de rénovation d'ampleur.</li>
<li><strong>Entreprise RGE</strong> dans le domaine des travaux réalisés.</li>
<li><strong>Chronologie</strong> : de nombreuses aides exigent que la demande soit déposée (voire acceptée) avant le début des travaux, ou, pour les certificats d'économies d'énergie, que l'offre de prime ait été acceptée avant la signature du devis.</li>
<li><strong>Accompagnement</strong> : passage par un conseiller France Rénov' et, pour la rénovation d'ampleur, recours obligatoire à un <strong>Accompagnateur Rénov'</strong> agréé.</li>
</ul>

<h3>Repérer la précarité énergétique</h3>
<p>Un ménage est en précarité énergétique lorsqu'il éprouve des difficultés à disposer de l'énergie nécessaire à la satisfaction de ses besoins élémentaires en raison de l'inadaptation de ses ressources ou de ses conditions d'habitat (définition issue de la loi du 12 juillet 2010, dite Grenelle 2). Signaux : pièces non chauffées, recours au chèque énergie, impayés, chauffage d'appoint coûteux. Face à ces situations, le conseiller a une responsabilité particulière :</p>
<ul>
<li>orienter vers l'Espace Conseil France Rénov' local et les dispositifs d'accompagnement renforcé ;</li>
<li>ne jamais proposer de travaux dont le reste à charge ou le financement mettrait le foyer en difficulté ;</li>
<li>vérifier la compréhension réelle de l'engagement (et respecter scrupuleusement les règles de la vente hors établissement, vues au chapitre consacré à la conclusion).</li>
</ul>

<h3>Portrait de foyer : les Ferrand (fictif)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Dimension</th><th>Ce que Karim a recueilli</th><th>Conséquence pour la proposition</th></tr>
<tr><td>Personnes</td><td>Couple de 63 et 61 ans, M. Ferrand retraité, Mme Ferrand à mi-temps ; enfants partis ; petits-enfants accueillis pendant les vacances</td><td>Présence en journée : chauffage sollicité toute la journée ; projet de rester dans la maison</td></tr>
<tr><td>Confort</td><td>Étage froid, chambre nord « glaciale », séjour correct ; étage étouffant en juillet</td><td>Combles à vérifier en priorité ; argument confort d'été</td></tr>
<tr><td>Facture</td><td>Environ 2 200 L de fioul par an (chauffage + eau chaude) ; entretien annuel de la chaudière ; 2 livraisons l'hiver dernier</td><td>Calcul d'économie possible au chapitre 4</td></tr>
<tr><td>Valeur patrimoniale</td><td>Pas de vente prévue ; souhait de transmettre un bien « en bon état »</td><td>Argument secondaire</td></tr>
<tr><td>Santé</td><td>Un peu de condensation sur les fenêtres de la salle de bains ; pas de VMC (entrées d'air et grilles hautes d'origine)</td><td>Ventilation à étudier si l'on isole</td></tr>
<tr><td>Revenus</td><td>Les clients se situent, d'après le tableau officiel consulté avec eux, dans la catégorie « revenus modestes » (jaune) — information déclarative à confirmer par l'avis d'imposition lors du montage du dossier</td><td>Éligibilité aux principales aides à vérifier pour chaque geste</td></tr>
<tr><td>Motivations</td><td>Confort (dominante), Argent, Sécurité</td><td>Ordre de l'argumentaire</td></tr>
</table>

<blockquote><strong>À retenir.</strong> Les attentes d'un foyer combinent confort d'hiver et d'été, maîtrise de la facture, valeur patrimoniale (y compris les obligations liées au DPE pour la location et la vente), santé et simplicité. Les aides dépendent des revenus (quatre catégories de couleur pour MaPrimeRénov'), du statut, de l'usage, de l'ancienneté du logement, du recours à une entreprise RGE et de la chronologie du dossier : le conseiller connaît ces principes et vérifie toujours les barèmes en vigueur sur les sources officielles. Les situations de précarité énergétique appellent une vigilance particulière.</blockquote>
`,
      },
      {
        title: "3.5 – La visite technique, les relevés et la lecture d'un DPE",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Conduire une visite technique complète d'une maison individuelle et savoir quels relevés effectuer.</li>
<li>Lire et exploiter un diagnostic de performance énergétique (DPE) : étiquettes, consommations, déperditions, recommandations.</li>
<li>Comprendre la différence entre DPE, audit énergétique et étude thermique, et connaître les évolutions récentes du DPE.</li>
</ul>

<h3>Pourquoi une visite technique ?</h3>
<p>La visite technique transforme une impression en données. Elle sert à dimensionner les équipements, à vérifier la faisabilité (accès, emplacement, réseau électrique, évacuation des condensats, structure de la charpente), à repérer les risques (amiante possible dans des bâtiments construits avant le 1er juillet 1997, humidité, conduits) et à chiffrer précisément. Plusieurs dispositifs d'aide exigent qu'une <strong>visite préalable</strong> ait été réalisée par l'entreprise avant l'établissement du devis, et que la date de cette visite figure sur le devis : il faut donc la tracer (date, intervenant, compte rendu, photos).</p>
<p>La visite est aussi un moment commercial : en montant dans les combles avec le client, en lui montrant l'isolant tassé ou la gaine non calorifugée, le conseiller construit une <strong>compréhension partagée</strong> du problème, bien plus convaincante qu'un discours.</p>

<h3>Le parcours de visite d'une maison individuelle</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Zone</th><th>Relevés et observations</th><th>Pour quelle solution</th></tr>
<tr><td>Extérieur</td><td>Orientation des façades et de la toiture, ombrages, mitoyenneté, matériaux de façade, état de la toiture, emplacement possible de l'unité extérieure (distance aux limites de propriété et aux fenêtres des voisins, socle, évacuation des condensats), accès pour les engins</td><td>PAC, isolation par l'extérieur, photovoltaïque</td></tr>
<tr><td>Combles</td><td>Type (perdus, aménagés, rampants), accès (trappe), surface, nature et épaisseur de l'isolant existant, état (tassé, humide, souillé), présence de spots encastrés, de conduits de fumée, de gaines électriques, de pare-vapeur ; état de la charpente</td><td>Isolation des combles et rampants</td></tr>
<tr><td>Murs</td><td>Composition (parpaing, brique, pierre, béton), épaisseur, isolation intérieure existante, pathologies (fissures, salpêtre)</td><td>Isolation par l'intérieur ou l'extérieur</td></tr>
<tr><td>Planchers bas</td><td>Sous-sol ou vide sanitaire, hauteur disponible, réseaux en sous-face</td><td>Isolation du plancher bas</td></tr>
<tr><td>Menuiseries</td><td>Type de vitrage, état des joints, volets, entrées d'air</td><td>Remplacement des fenêtres, ventilation</td></tr>
<tr><td>Chaufferie</td><td>Générateur (énergie, marque, année, puissance), plaque signalétique, conduit, cuve de fioul (volume, emplacement, état), ballon d'eau chaude (volume), circulateur, vase d'expansion, régulation</td><td>PAC, chauffe-eau thermodynamique, neutralisation de la cuve</td></tr>
<tr><td>Émetteurs</td><td>Type (radiateurs fonte, acier, plancher chauffant), nombre, dimensions, état ; température de départ nécessaire</td><td>Choix basse ou haute température de la PAC</td></tr>
<tr><td>Ventilation</td><td>Présence et type de VMC, grilles, bouches, débit apparent, traces de condensation</td><td>VMC simple ou double flux</td></tr>
<tr><td>Électricité</td><td>Puissance souscrite (compteur), type de tableau, place disponible, monophasé/triphasé, état général</td><td>PAC, photovoltaïque, recharge de véhicule</td></tr>
<tr><td>Eau chaude</td><td>Volume, emplacement, distance aux points de puisage, besoins du foyer</td><td>Chauffe-eau thermodynamique, ballon de la PAC</td></tr>
</table>

<h3>Le dimensionnement : ce que le commercial doit savoir</h3>
<p>Le dimensionnement d'une pompe à chaleur est une étape technique qui relève du technicien ou du bureau d'études de l'entreprise, mais le commercial doit en comprendre la logique pour ne pas promettre l'impossible :</p>
<ul>
<li>La puissance nécessaire dépend des <strong>déperditions</strong> du logement à la <strong>température extérieure de base</strong> du lieu (température minimale de référence, fonction de la zone climatique et de l'altitude) : on calcule les pertes par les parois et par le renouvellement d'air. Une méthode rapide utilise un coefficient global de déperdition multiplié par le volume chauffé et par l'écart de température ; une méthode pièce par pièce est plus fiable.</li>
<li>Les <strong>consommations réelles</strong> recueillies en découverte permettent de contrôler la cohérence du calcul : 2 200 L de fioul correspondent à environ 22 000 kWh d'énergie contenue (ordre de grandeur courant : environ 10 kWh par litre de fioul), dont une partie seulement est utile compte tenu du rendement de la chaudière.</li>
<li>Si l'on prévoit d'isoler, il faut <strong>dimensionner la PAC après isolation</strong> (ou prévoir l'ordre des travaux) : une PAC calculée sur les déperditions actuelles sera surdimensionnée une fois les combles isolés.</li>
<li>Les <strong>émetteurs</strong> conditionnent la température de départ : des radiateurs en fonte dimensionnés pour une chaudière à 70-80 °C peuvent nécessiter une PAC « haute température » ou, mieux, une baisse des besoins par l'isolation permettant de fonctionner à plus basse température, ce qui améliore le rendement saisonnier.</li>
<li>Le <strong>bruit</strong> de l'unité extérieure et son implantation doivent respecter la réglementation sur les bruits de voisinage ; c'est une cause fréquente de litiges.</li>
</ul>

<h3>Lire un DPE</h3>
<h4>Ce qu'est le DPE</h4>
<p>Le diagnostic de performance énergétique renseigne sur la performance d'un logement ou d'un bâtiment en évaluant sa consommation d'énergie et ses émissions de gaz à effet de serre. Depuis la réforme du 1er juillet 2021, il repose sur une méthode de calcul unifiée (dite 3CL-DPE 2021) fondée sur les caractéristiques du bâti et des équipements, et non plus sur les factures ; il est devenu <strong>opposable</strong> (le propriétaire peut engager la responsabilité du vendeur ou du bailleur sur ses informations). Il est valable dix ans, sous réserve des règles transitoires applicables aux DPE réalisés avant la réforme.</p>
<h4>Les deux étiquettes et le double seuil</h4>
<ul>
<li>L'<strong>étiquette énergie</strong> (de A à G) est déterminée selon un <strong>double seuil</strong> : la consommation d'énergie primaire (en kWh/m²/an) et les émissions de gaz à effet de serre (en kg CO<sub>2</sub>/m²/an). La classe retenue est la plus défavorable des deux.</li>
<li>L'<strong>étiquette climat</strong> (de A à G) reflète les seules émissions de gaz à effet de serre.</li>
<li>Pour un logement chauffé au fioul, ce sont souvent les <strong>émissions</strong> qui dégradent la classe : sortir du fioul fait gagner beaucoup sur l'étiquette climat et, par le double seuil, sur l'étiquette énergie.</li>
</ul>
<h4>Énergie primaire et énergie finale</h4>
<p>L'<strong>énergie finale</strong> est celle que l'on paie (les kWh du compteur, les litres de fioul) ; l'<strong>énergie primaire</strong> tient compte de l'énergie nécessaire pour produire et acheminer l'énergie finale. Pour l'électricité, un coefficient de conversion s'applique : il a été abaissé de 2,3 à <strong>1,9</strong> au 1er janvier 2026 (arrêté du 13 août 2025). Conséquence : à consommation égale, un logement chauffé à l'électricité affiche une consommation d'énergie primaire plus faible qu'auparavant, ce qui peut lui faire gagner une classe. Les DPE antérieurs peuvent être actualisés par une attestation téléchargeable gratuitement sur l'observatoire DPE de l'ADEME, sans nouveau passage du diagnostiqueur. Pour le commercial, deux conséquences : vérifier la date et la version du DPE du client, et ne pas comparer sans précaution des étiquettes calculées avec des coefficients différents.</p>
<h4>Les rubriques utiles au commercial</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique du DPE</th><th>Ce qu'on y trouve</th><th>Comment l'exploiter</th></tr>
<tr><td>Étiquettes et consommations</td><td>Classe énergie et climat, consommation en énergie primaire et finale, estimation des dépenses annuelles (fourchette)</td><td>Situer le logement ; comparer avec les consommations réelles (factures) pour repérer les écarts liés aux usages</td></tr>
<tr><td>Répartition des déperditions</td><td>Part des pertes par les murs, la toiture, les planchers bas, les fenêtres, la ventilation, les ponts thermiques</td><td>Hiérarchiser les travaux d'isolation ; argument visuel puissant pour le client</td></tr>
<tr><td>Description du logement et des équipements</td><td>Hypothèses retenues par le diagnostiqueur (isolation présumée, type de chauffage…)</td><td>Vérifier sur place : une isolation « inconnue » ou mal saisie fausse le diagnostic</td></tr>
<tr><td>Confort d'été</td><td>Indicateur qualitatif et facteurs d'amélioration</td><td>Argument isolation de toiture, protections solaires</td></tr>
<tr><td>Recommandations de travaux</td><td>Un ou plusieurs bouquets de travaux par étapes, avec l'étiquette visée et une estimation de coût</td><td>Point de départ, à adapter ; ne pas les recopier sans visite</td></tr>
<tr><td>Identifiant ADEME</td><td>Numéro à 13 caractères permettant de retrouver le DPE dans la base de l'observatoire</td><td>Vérifier l'authenticité et la validité du document</td></tr>
</table>

<h3>DPE, audit énergétique, étude thermique : ne pas confondre</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Document</th><th>Objet</th><th>Quand</th></tr>
<tr><td>DPE</td><td>Étiquette et estimation conventionnelle ; recommandations générales</td><td>Vente, location, construction ; souvent exigé pour certaines aides</td></tr>
<tr><td>Audit énergétique réglementaire</td><td>Analyse plus poussée proposant des scénarios de travaux chiffrés, dont un parcours permettant d'atteindre au moins la classe B (ou à défaut un gain de classes défini par les textes) en une ou plusieurs étapes</td><td>Vente des maisons et immeubles en monopropriété classés E, F ou G ; base de nombreux projets de rénovation d'ampleur</td></tr>
<tr><td>Étude thermique / note de dimensionnement</td><td>Calcul des déperditions pièce par pièce, dimensionnement des équipements</td><td>Réalisée par l'entreprise ou un bureau d'études avant devis</td></tr>
</table>

<h3>Exemple : le DPE des Ferrand (données fictives)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Valeur (fictive)</th><th>Lecture de Karim</th></tr>
<tr><td>Date et identifiant</td><td>Mars 2024, identifiant ADEME vérifié sur l'observatoire</td><td>Méthode 2021, valide jusqu'en 2034 ; coefficient électricité de l'époque (2,3) sans effet ici car chauffage fioul</td></tr>
<tr><td>Étiquette énergie / climat</td><td>F / F</td><td>Classe imposée à la fois par la consommation et les émissions</td></tr>
<tr><td>Déperditions</td><td>Toiture 28 %, murs 24 %, renouvellement d'air 18 %, menuiseries 13 %, plancher bas 10 %, ponts thermiques 7 %</td><td>La toiture est le premier poste : cohérent avec l'étage froid ; isolant d'origine d'environ 10 cm constaté sur place</td></tr>
<tr><td>Chauffage</td><td>Chaudière fioul standard de 1998, radiateurs acier</td><td>Remplacement prioritaire ; vérifier la température de départ nécessaire</td></tr>
<tr><td>Recommandations</td><td>Étape 1 : isolation des combles + PAC air/eau ; étape 2 : isolation des murs + VMC</td><td>Base de la proposition, à confirmer par la visite et le dimensionnement</td></tr>
</table>
<p>La comparaison avec la réalité : le DPE estime une dépense annuelle dans une fourchette ; les Ferrand dépensent un peu plus que le haut de la fourchette, parce qu'ils sont présents toute la journée et chauffent à 21 °C. Karim le note : l'estimation d'économies devra partir des consommations réelles et non du seul DPE.</p>

<h3>Sécurité pendant la visite</h3>
<ul>
<li>Ne pas marcher sur le plafond entre les solives dans des combles perdus ; utiliser une planche ou rester sur la trappe.</li>
<li>Se méfier des matériaux pouvant contenir de l'amiante dans les bâtiments dont le permis de construire est antérieur au 1er juillet 1997 (plaques, conduits, dalles) : ne pas les manipuler ; un repérage avant travaux pourra être nécessaire.</li>
<li>Ne pas intervenir sur l'installation électrique ou de chauffage : on observe, on photographie, on note.</li>
</ul>

<h3>Le compte rendu de visite</h3>
<p>Dans les 48 heures, le conseiller formalise un compte rendu daté (date de la visite, intervenant, relevés, photos, schéma simple, points de vigilance, hypothèses de dimensionnement, documents reçus et manquants). Ce document sert au technicien, au chiffrage, au dossier d'aides et, en cas de litige, de preuve de la visite préalable.</p>

<blockquote><strong>À retenir.</strong> La visite technique fournit les données de dimensionnement et de faisabilité, trace la visite préalable exigée par plusieurs dispositifs et construit avec le client une compréhension partagée du problème. On parcourt l'extérieur, les combles, les parois, les menuiseries, la chaufferie, les émetteurs, la ventilation et l'électricité. Le DPE (méthode 2021, double seuil énergie/climat, coefficient de l'électricité abaissé à 1,9 au 1er janvier 2026) se lit en confrontant ses hypothèses à la réalité ; la répartition des déperditions aide à hiérarchiser les travaux.</blockquote>
`,
      },
      {
        title: "3.6 – Les clients professionnels : copropriétés, syndics et bâtiments tertiaires",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Comprendre le fonctionnement de la décision en copropriété et le rôle du syndic, du conseil syndical et de l'assemblée générale.</li>
<li>Connaître les obligations du décret tertiaire (dispositif Éco Énergie Tertiaire) et savoir les utiliser en découverte.</li>
<li>Identifier les décideurs multiples d'une organisation et adapter la découverte à chacun.</li>
</ul>

<h3>B2C et B2B : ce qui change</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Particulier (B2C)</th><th>Professionnel ou copropriété (B2B)</th></tr>
<tr><td>Décideurs</td><td>Un foyer, souvent un couple</td><td>Plusieurs acteurs : assemblée générale, gérant, direction financière, services techniques, locataires</td></tr>
<tr><td>Cycle de vente</td><td>Quelques semaines</td><td>Plusieurs mois, rythmé par les AG, les budgets, les appels d'offres</td></tr>
<tr><td>Motivations</td><td>Confort, facture, sécurité, environnement</td><td>Charges, conformité réglementaire, valeur de l'actif, image (RSE), continuité d'activité</td></tr>
<tr><td>Financement</td><td>Épargne, aides aux ménages, éco-PTZ</td><td>Budget de travaux, fonds travaux de la copropriété, aides spécifiques, certificats d'économies d'énergie, prêts collectifs, contrats de performance énergétique</td></tr>
<tr><td>Formalisme</td><td>Devis, contrat hors établissement le cas échéant</td><td>Cahier des charges, consultation de plusieurs entreprises, vote ou validation interne, contrat avec conditions particulières</td></tr>
<tr><td>Cadre consommateur</td><td>Code de la consommation pleinement applicable</td><td>Pas de protection du consommateur pour une société, sauf cas particuliers (certains petits professionnels hors champ de leur activité principale bénéficient de règles protectrices pour les contrats hors établissement ; à vérifier au cas par cas)</td></tr>
</table>

<h3>La copropriété</h3>
<h4>Qui fait quoi</h4>
<ul>
<li>Le <strong>syndicat des copropriétaires</strong> (l'ensemble des copropriétaires) est la personne morale qui décide, en <strong>assemblée générale</strong>.</li>
<li>Le <strong>syndic</strong> (professionnel ou bénévole) exécute les décisions, gère l'immeuble, met en concurrence les entreprises pour les marchés au-delà d'un montant fixé par l'AG, et inscrit les projets à l'ordre du jour.</li>
<li>Le <strong>conseil syndical</strong> assiste et contrôle le syndic ; il est souvent le moteur d'un projet de rénovation et l'interlocuteur à convaincre en premier.</li>
<li>Chaque <strong>copropriétaire</strong> décide seul pour ses parties privatives, dans le respect du règlement de copropriété (et sous réserve d'autorisation de l'AG pour les travaux affectant les parties communes ou l'aspect extérieur).</li>
</ul>
<h4>Les outils de planification</h4>
<ul>
<li><strong>DPE collectif</strong> : rendu progressivement obligatoire pour les immeubles en copropriété selon leur taille (calendrier issu de la loi Climat et résilience, achevé en 2026 pour les plus petites copropriétés).</li>
<li><strong>Projet de plan pluriannuel de travaux (PPT)</strong> : obligatoire pour les copropriétés de plus de quinze ans, selon un calendrier progressif en fonction du nombre de lots (les plus grandes d'abord, depuis 2023, toutes depuis 2025). Il identifie les travaux nécessaires sur dix ans, dont les travaux de performance énergétique, et alimente le fonds travaux.</li>
<li><strong>Diagnostic technique global</strong> : outil d'état des lieux pouvant servir de base au PPT.</li>
</ul>
<p>En découverte, le conseiller demande ces documents : un projet inscrit au PPT a beaucoup plus de chances d'être voté.</p>
<h4>La décision en assemblée générale</h4>
<p>Les travaux d'économie d'énergie ou de réduction des émissions de gaz à effet de serre portant sur les parties communes relèvent, selon la loi du 10 juillet 1965, de la <strong>majorité absolue des voix de tous les copropriétaires</strong> (article 25), avec la possibilité d'un second vote immédiat à la majorité simple lorsque le projet a recueilli au moins le tiers des voix (passerelle de l'article 25-1). Ces règles sont à vérifier avec le syndic pour chaque projet. Conséquences pratiques : il faut connaître la date de la prochaine AG, le délai pour inscrire une résolution, et fournir au syndic des devis et une note explicative <strong>avant</strong> l'envoi de la convocation.</p>
<h4>Les aides spécifiques</h4>
<p>Les copropriétés peuvent bénéficier d'aides dédiées (notamment MaPrimeRénov' Copropriété, sous condition de gain énergétique minimal et d'accompagnement par un assistant à maîtrise d'ouvrage), cumulables avec des primes individuelles pour certains copropriétaires selon leurs revenus. Les conditions évoluent : vérifier sur le site de l'Anah et france-renov.gouv.fr.</p>
<h4>Le cas de Mme Lopez (fictif)</h4>
<p>Mme Lopez est propriétaire occupante d'un T3 de 68 m² au 4e étage d'une copropriété de 1972 (32 lots) à Oullins. Chauffage collectif au gaz, eau chaude individuelle par cumulus électrique, logement classé E. Elle contacte Thermia Rénov pour « faire baisser ses charges ». La découverte de Karim doit distinguer :</p>
<ul>
<li>ce qu'elle peut faire seule dans ses parties privatives (remplacer le cumulus par un chauffe-eau thermodynamique si la configuration le permet — emplacement, volume d'air, prise d'air et rejet — ; robinets thermostatiques et répartiteurs de frais de chauffage si l'immeuble en est équipé ou doit l'être) ;</li>
<li>ce qui relève de la copropriété (isolation de la toiture-terrasse, des façades, remplacement de la chaufferie collective), pour lequel Mme Lopez peut devenir l'<strong>ambassadrice</strong> du projet auprès du conseil syndical ;</li>
<li>les motivations : Argent (charges), Confort (appartement exposé au sud, très chaud l'été), Sécurité (crainte des appels de fonds).</li>
</ul>

<h3>Le tertiaire et le décret tertiaire</h3>
<h4>Le cadre</h4>
<p>Le dispositif Éco Énergie Tertiaire, issu de la loi ELAN du 23 novembre 2018 (article L. 174-1 du code de la construction et de l'habitation) et du <strong>décret n° 2019-771 du 23 juillet 2019</strong>, dit « décret tertiaire », impose une réduction progressive de la consommation d'énergie finale des bâtiments, parties de bâtiments ou ensembles de bâtiments hébergeant des activités tertiaires sur une surface de plancher cumulée <strong>supérieure ou égale à 1 000 m²</strong>.</p>
<h4>Les objectifs</h4>
<p>Deux modes de fixation de l'objectif sont possibles, au choix de l'assujetti :</p>
<ul>
<li><strong>Objectif en valeur relative</strong> : réduction de la consommation d'énergie finale d'au moins <strong>40 % en 2030, 50 % en 2040 et 60 % en 2050</strong> par rapport à une année de référence choisie entre 2010 et 2019 (consommation réelle d'une année pleine d'exploitation) ;</li>
<li><strong>Objectif en valeur absolue</strong> : atteindre un niveau de consommation fixé par arrêté pour chaque catégorie d'activité, tenant compte des performances des bâtiments neufs de la catégorie.</li>
</ul>
<p>Les objectifs peuvent être <strong>modulés</strong> sous conditions (contraintes techniques, architecturales ou patrimoniales, changement d'activité, coût manifestement disproportionné des actions), sur la base d'un dossier technique.</p>
<h4>Les obligations déclaratives et les sanctions</h4>
<ul>
<li>Les propriétaires et, le cas échéant, les preneurs à bail déclarent chaque année leurs consommations sur la plateforme numérique <strong>OPERAT</strong> gérée par l'ADEME (échéance annuelle fixée au 30 septembre pour les consommations de l'année précédente, à vérifier sur le site de la plateforme).</li>
<li>Les obligations pèsent conjointement sur le propriétaire et le locataire, chacun pour ce qui le concerne (les actions sur le bâti et les équipements communs relevant plutôt du propriétaire, celles sur les usages et équipements propres plutôt du locataire), dans les conditions prévues par le bail.</li>
<li>En cas de manquement, le préfet peut mettre en demeure ; le défaut de programme d'actions peut donner lieu à une publication (principe du « name and shame ») et à une amende administrative pouvant aller jusqu'à 1 500 € pour une personne physique et 7 500 € pour une personne morale.</li>
</ul>
<p>Autre texte à connaître pour les bâtiments tertiaires : le décret dit « BACS » (décret n° 2020-887 du 20 juillet 2020 modifié) impose l'installation de systèmes d'automatisation et de contrôle (GTB) dans les bâtiments tertiaires dont les systèmes de chauffage ou de climatisation dépassent certains seuils de puissance, selon un calendrier qui a été modifié à plusieurs reprises : seuils et échéances à vérifier sur legifrance.gouv.fr avant d'en parler au client.</p>
<h4>Utiliser le décret tertiaire en découverte</h4>
<p>Le décret tertiaire n'est pas un argument de peur : c'est un <strong>cadre de projet</strong>. Les questions clés :</p>
<ol>
<li>« Quelle est la surface de plancher à usage tertiaire du bâtiment, et qui l'occupe ? » (assujettissement)</li>
<li>« Vos consommations ont-elles été déclarées sur OPERAT ? Quelle année de référence avez-vous retenue ? » (situation)</li>
<li>« Où en êtes-vous par rapport à l'objectif de 2030 ? » (écart à combler)</li>
<li>« Quelles actions avez-vous déjà engagées : éclairage, régulation, équipements, isolation ? » (historique)</li>
<li>« Comment se répartissent les charges et les travaux entre vous et vos locataires ? » (bail, annexe environnementale le cas échéant)</li>
<li>« Quels sont vos critères de décision : temps de retour, budget annuel, image, confort des occupants ? » (motivations)</li>
</ol>

<h4>Le cas de la SCI Les Tilleuls (fictif)</h4>
<p>La SCI Les Tilleuls possède à Écully un immeuble de bureaux de 1 200 m² construit en 1992, loué à trois entreprises. Chauffage par chaudières gaz de 2006, climatisation par splits dans certaines pièces, toiture-terrasse peu isolée, éclairage partiellement rénové. Le gérant, M. Royer, a déclaré les consommations sur OPERAT avec 2019 comme année de référence. Il veut « savoir quoi faire pour 2030 sans plomber la rentabilité ». En découverte, Nadia identifie :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Acteur</th><th>Rôle dans la décision</th><th>Attentes</th></tr>
<tr><td>M. Royer, gérant de la SCI</td><td>Décideur final</td><td>Rentabilité de l'actif, conformité, valeur à la revente, attractivité locative</td></tr>
<tr><td>Associés de la SCI</td><td>Approuvent les investissements importants selon les statuts</td><td>Rendement, risque</td></tr>
<tr><td>Expert-comptable</td><td>Prescripteur, conseille sur le financement et l'amortissement</td><td>Lisibilité financière</td></tr>
<tr><td>Locataires (trois entreprises)</td><td>Utilisateurs ; cofinancent certaines actions selon le bail ; subissent les travaux</td><td>Confort, charges, continuité d'activité</td></tr>
<tr><td>Société de maintenance</td><td>Prescripteur technique, connaît les installations</td><td>Maintenabilité, maintien de son contrat</td></tr>
</table>

<h3>La cartographie des décideurs (B2B)</h3>
<p>Dans toute vente B2B, on identifie les rôles suivants, une même personne pouvant en cumuler plusieurs :</p>
<ul>
<li><strong>Décideur</strong> : signe ou fait voter (gérant, AG, direction générale).</li>
<li><strong>Prescripteur</strong> : recommande une solution ou une entreprise (bureau d'études, mainteneur, conseil syndical, expert-comptable).</li>
<li><strong>Utilisateur</strong> : vit avec la solution (occupants, locataires).</li>
<li><strong>Acheteur / financier</strong> : négocie et contrôle le budget.</li>
<li><strong>Filtre</strong> : contrôle l'accès à l'information ou aux décideurs (assistant, gestionnaire de syndic).</li>
<li><strong>Opposant potentiel</strong> : celui qui a intérêt au statu quo (copropriétaire hostile à tout appel de fonds, prestataire en place).</li>
</ul>
<p>Pour chaque rôle, le conseiller note la motivation dominante (SONCAS) et le niveau d'adhésion au projet. Une proposition qui ne répond qu'aux attentes du décideur et ignore les utilisateurs ou les prescripteurs échoue souvent au moment du vote ou de la validation.</p>

<blockquote><strong>À retenir.</strong> En B2B, la décision est collective et le cycle long. En copropriété, l'AG décide (travaux d'économie d'énergie à la majorité de l'article 25, avec passerelle de l'article 25-1), le syndic exécute, le conseil syndical porte souvent le projet ; DPE collectif et plan pluriannuel de travaux sont des points d'appui. Dans le tertiaire, le décret n° 2019-771 impose aux bâtiments de 1 000 m² et plus des réductions de consommation de 40 % en 2030, 50 % en 2040 et 60 % en 2050 (ou l'atteinte de valeurs absolues), avec déclaration annuelle sur OPERAT. On cartographie les décideurs et leurs motivations avant de proposer.</blockquote>
`,
      },
      {
        title: "3.7 – La fiche de découverte type et les erreurs fréquentes",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Disposer d'une fiche de découverte complète, utilisable en B2C comme en B2B.</li>
<li>Savoir clôturer un rendez-vous de découverte : synthèse, prochaines étapes, engagement réciproque.</li>
<li>Connaître les erreurs les plus fréquentes et les moyens de les éviter.</li>
</ul>

<h3>À quoi sert une fiche de découverte ?</h3>
<p>La fiche de découverte est un <strong>guide</strong>, pas un questionnaire à lire au client. Elle garantit qu'aucune information indispensable n'est oubliée, elle permet à un collègue (technicien, chargé de dossier d'aides) de reprendre le dossier, et elle constitue la mémoire de la relation dans le logiciel de gestion de la relation client. Chez Thermia Rénov, la fiche est remplie pendant ou juste après le rendez-vous, et validée par Nadia pour les premiers dossiers de Karim.</p>

<h3>Modèle de fiche de découverte – particulier</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Informations à recueillir</th></tr>
<tr><td>1. Contact et origine</td><td>Noms, coordonnées, date du rendez-vous, personnes présentes, origine de la demande (recommandation, site, salon, partenaire), consentement pour les communications ultérieures</td></tr>
<tr><td>2. Foyer</td><td>Composition, âges, présence en journée, projets de vie (rester, vendre, louer, transmettre), personnes vulnérables</td></tr>
<tr><td>3. Statut et usage</td><td>Propriétaire occupant / bailleur / copropriétaire ; résidence principale ou secondaire ; date d'acquisition</td></tr>
<tr><td>4. Logement</td><td>Type, année d'achèvement, surface habitable, niveaux, mitoyenneté, sous-sol, combles ; travaux antérieurs ; urbanisme (lotissement, périmètre protégé)</td></tr>
<tr><td>5. Équipements</td><td>Chauffage (énergie, âge, puissance), émetteurs, eau chaude, ventilation, électricité (puissance souscrite, mono/tri), climatisation</td></tr>
<tr><td>6. Consommations</td><td>Consommations et dépenses sur deux à trois ans par énergie ; températures de consigne ; appoints</td></tr>
<tr><td>7. DPE / audit</td><td>Date, identifiant ADEME, classes énergie et climat, principaux postes de déperdition, recommandations</td></tr>
<tr><td>8. Ressenti</td><td>Pièces inconfortables (hiver, été), humidité, bruit, odeurs ; mots exacts du client</td></tr>
<tr><td>9. Projet</td><td>Déclencheur, travaux envisagés par le client, calendrier, contraintes, autres devis, contact avec France Rénov' ou un Accompagnateur Rénov'</td></tr>
<tr><td>10. Motivations</td><td>SONCAS(E) : motivation dominante et secondaires, pour chaque décideur ; freins exprimés</td></tr>
<tr><td>11. Moyens</td><td>Catégorie de revenus déclarée (à confirmer), budget envisagé, financement (épargne, éco-PTZ, prêt), capacité d'avance de trésorerie</td></tr>
<tr><td>12. Visite technique</td><td>Date, intervenant, relevés, photos, points de vigilance, documents manquants</td></tr>
<tr><td>13. Synthèse validée</td><td>Reformulation acceptée par le client (3 à 5 lignes)</td></tr>
<tr><td>14. Prochaines étapes</td><td>Date de remise de la proposition, documents à fournir par chacun, mode de présentation (rendez-vous, visioconférence)</td></tr>
</table>

<h3>Compléments pour un client professionnel</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Informations à recueillir</th></tr>
<tr><td>Organisation</td><td>Raison sociale, SIREN, forme (SCI, société d'exploitation, syndicat de copropriétaires), activité, nombre d'occupants</td></tr>
<tr><td>Bâtiment</td><td>Surface de plancher par activité, horaires d'occupation, propriétaire / locataires, bail (répartition des charges et des travaux)</td></tr>
<tr><td>Réglementation</td><td>Assujettissement au décret tertiaire, déclarations OPERAT, année de référence, objectif choisi (relatif ou absolu) ; situation au regard des systèmes d'automatisation (BACS) ; pour une copropriété : DPE collectif, PPT, fonds travaux</td></tr>
<tr><td>Décision</td><td>Cartographie des décideurs, processus (AG, conseil d'administration, comité d'investissement), calendrier (date de l'AG, budget annuel), critères de choix, mise en concurrence</td></tr>
<tr><td>Contraintes d'exploitation</td><td>Continuité d'activité, horaires possibles pour les travaux, sécurité des occupants, accès</td></tr>
<tr><td>Indicateurs attendus</td><td>Temps de retour, réduction des charges, gain en kWh et en pourcentage vers l'objectif 2030, image</td></tr>
</table>

<h3>Clôturer le rendez-vous de découverte</h3>
<ol>
<li><strong>Synthèse globale</strong> : reprendre la situation, les attentes hiérarchisées, les constats de la visite.</li>
<li><strong>Validation</strong> : « Ai-je bien compris ? Ai-je oublié quelque chose d'important pour vous ? »</li>
<li><strong>Annonce des pistes</strong>, sans chiffrage hâtif : « Je vois deux scénarios à étudier : un projet en deux étapes, combles puis chauffage, et un projet global plus ambitieux. Je vais faire faire le dimensionnement et je vous présenterai les deux, avec les aides auxquelles vous pourriez prétendre, vérifiées sur les barèmes en vigueur. »</li>
<li><strong>Engagement réciproque</strong> : date du prochain rendez-vous, présence des deux décideurs, documents à envoyer par le client (factures, avis d'imposition s'il l'accepte), ce que l'entreprise fournira.</li>
<li><strong>Conseil désintéressé</strong> : recommander au client, si ce n'est pas fait, de prendre rendez-vous avec un conseiller France Rénov' (service public gratuit et indépendant). Loin de faire perdre la vente, ce conseil renforce la crédibilité et, pour certains parcours, il est désormais un préalable.</li>
<li><strong>Remerciement</strong> et courriel de confirmation dans la journée, reprenant la synthèse et les prochaines étapes.</li>
</ol>

<h3>Les dix erreurs les plus fréquentes en découverte</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Erreur</th><th>Conséquence</th><th>Bonne pratique</th></tr>
<tr><td>1. Argumenter avant d'avoir découvert</td><td>Proposition générique, client sur la défensive</td><td>Respecter l'ordre : découvrir, reformuler, puis proposer</td></tr>
<tr><td>2. Ne pas rencontrer tous les décideurs</td><td>Objection imprévue, décision repoussée</td><td>Demander dès la prise de rendez-vous qui participera à la décision</td></tr>
<tr><td>3. Se fier au seul DPE</td><td>Économies surestimées ou sous-estimées</td><td>Croiser DPE, factures et visite</td></tr>
<tr><td>4. Promettre un montant d'aide</td><td>Perte de confiance, litige</td><td>Annoncer une estimation, vérifiée sur les sources officielles, sous réserve d'éligibilité</td></tr>
<tr><td>5. Oublier la ventilation</td><td>Humidité, moisissures après isolation</td><td>Traiter systématiquement isolation et ventilation ensemble</td></tr>
<tr><td>6. Dimensionner sur la situation avant isolation</td><td>PAC surdimensionnée</td><td>Penser l'ordre des travaux et dimensionner sur l'état final visé</td></tr>
<tr><td>7. Ignorer l'urbanisme et le voisinage</td><td>Refus de déclaration préalable, conflit de voisinage (bruit)</td><td>Vérifier PLU, lotissement, distances</td></tr>
<tr><td>8. Ne pas tracer la visite préalable</td><td>Dossier d'aide refusé</td><td>Compte rendu daté, photos, date sur le devis</td></tr>
<tr><td>9. Confondre copropriétaire et copropriété</td><td>Proposer des travaux que l'occupant ne peut pas décider seul</td><td>Distinguer parties privatives et parties communes</td></tr>
<tr><td>10. Négliger la précarité ou la vulnérabilité</td><td>Engagement inadapté, risque juridique et éthique</td><td>Orienter vers France Rénov', proportionner le projet aux moyens</td></tr>
</table>

<h3>Auto-évaluation du conseiller après le rendez-vous</h3>
<ul>
<li>Le client a-t-il parlé plus que moi ?</li>
<li>Puis-je citer ses trois attentes principales, dans ses mots ?</li>
<li>Ai-je chiffré les consommations et dépenses actuelles ?</li>
<li>Ai-je identifié tous les décideurs et leur motivation dominante ?</li>
<li>Ai-je recueilli les données nécessaires au dimensionnement et aux aides ?</li>
<li>Le client sait-il exactement ce qui va se passer ensuite ?</li>
</ul>

<blockquote><strong>À retenir.</strong> La fiche de découverte structure le recueil d'informations (contact, foyer, statut, logement, équipements, consommations, DPE, ressenti, projet, motivations, moyens, visite, synthèse, prochaines étapes) et se complète en B2B par l'organisation, le bâtiment, la réglementation et le processus de décision. Le rendez-vous se clôt par une synthèse validée, l'annonce des pistes sans chiffrage hâtif, un engagement réciproque et une confirmation écrite. Les erreurs les plus coûteuses : argumenter trop tôt, promettre des aides, oublier la ventilation, ne pas tracer la visite préalable.</blockquote>
`,
      },
      {
        title: "3.8 – Quiz de fin de chapitre",
        content: `
<p>Pour chaque question, une seule réponse est correcte. Le corrigé figure après chaque question.</p>

<h4>Question 1 – Quel est l'objectif le plus réaliste d'un premier rendez-vous de découverte chez un particulier pour un projet de pompe à chaleur ?</h4>
<ol type="A">
<li>Faire signer un devis le jour même pour bloquer le client</li>
<li>Établir un diagnostic partagé et obtenir l'accord du client pour une proposition chiffrée à une date convenue</li>
<li>Présenter le catalogue complet de l'entreprise</li>
<li>Remplir le dossier d'aide en ligne avec le client</li>
</ol>
<p><strong>Réponse : B.</strong> Le premier rendez-vous sert à comprendre la situation, réaliser la visite technique et convenir de la suite. Une proposition sérieuse suppose un dimensionnement et une vérification des aides.</p>

<h4>Question 2 – Dans la technique de l'entonnoir, par quel type de questions commence-t-on ?</h4>
<ol type="A">
<li>Des questions fermées et chiffrées</li>
<li>Des questions alternatives</li>
<li>Des questions ouvertes et larges</li>
<li>Des questions orientées</li>
</ol>
<p><strong>Réponse : C.</strong> On part de questions ouvertes pour faire émerger la situation et les motivations, puis on précise avec des questions relais et fermées, avant de reformuler et de contrôler.</p>

<h4>Question 3 – Le client dit : « On en a assez du fioul. » Le conseiller répond : « Assez du fioul ? » Il s'agit d'une…</h4>
<ol type="A">
<li>question miroir</li>
<li>question d'implication</li>
<li>reformulation-synthèse</li>
<li>question alternative</li>
</ol>
<p><strong>Réponse : A.</strong> La question miroir reprend les derniers mots du client sur un ton interrogatif pour l'inviter à développer.</p>

<h4>Question 4 – Dans la grille SONCAS, un client qui pose de nombreuses questions sur la qualification RGE, l'assurance décennale et les arnaques exprime surtout une motivation de…</h4>
<ol type="A">
<li>Nouveauté</li>
<li>Sécurité</li>
<li>Orgueil</li>
<li>Sympathie</li>
</ol>
<p><strong>Réponse : B.</strong> La recherche de garanties et la crainte des risques relèvent de la motivation Sécurité.</p>

<h4>Question 5 – Pour MaPrimeRénov', la catégorie de revenus d'un foyer est déterminée par…</h4>
<ol type="A">
<li>le salaire net mensuel du demandeur principal</li>
<li>le revenu fiscal de référence et le nombre de personnes du ménage, avec des plafonds distincts en Île-de-France</li>
<li>la valeur du logement</li>
<li>l'étiquette DPE du logement</li>
</ol>
<p><strong>Réponse : B.</strong> Quatre catégories (bleu, jaune, violet, rose) sont définies selon le revenu fiscal de référence et la composition du ménage ; les plafonds en vigueur se vérifient sur les sources officielles.</p>

<h4>Question 6 – Comment est déterminée l'étiquette énergie du DPE depuis la réforme de 2021 ?</h4>
<ol type="A">
<li>Uniquement d'après les factures des trois dernières années</li>
<li>Selon un double seuil (énergie primaire et émissions de gaz à effet de serre), la classe la plus défavorable étant retenue</li>
<li>Uniquement d'après les émissions de CO<sub>2</sub></li>
<li>D'après l'âge du logement</li>
</ol>
<p><strong>Réponse : B.</strong> La méthode 3CL-DPE 2021 calcule consommation et émissions ; la classe énergie est la plus défavorable des deux seuils.</p>

<h4>Question 7 – Qu'a changé l'arrêté du 13 août 2025 pour le DPE au 1er janvier 2026 ?</h4>
<ol type="A">
<li>Il a supprimé l'étiquette climat</li>
<li>Il a abaissé le coefficient de conversion de l'électricité en énergie primaire de 2,3 à 1,9</li>
<li>Il a rendu le DPE valable cinq ans au lieu de dix</li>
<li>Il a interdit la location des logements classés D</li>
</ol>
<p><strong>Réponse : B.</strong> Ce changement améliore l'étiquette des logements chauffés à l'électricité ; les DPE antérieurs peuvent être actualisés par une attestation gratuite sur l'observatoire de l'ADEME.</p>

<h4>Question 8 – À partir de quelle surface de plancher à usage tertiaire un bâtiment est-il assujetti au décret tertiaire ?</h4>
<ol type="A">
<li>500 m²</li>
<li>1 000 m²</li>
<li>2 000 m²</li>
<li>5 000 m²</li>
</ol>
<p><strong>Réponse : B.</strong> Le décret n° 2019-771 vise les bâtiments, parties ou ensembles de bâtiments dont la surface de plancher tertiaire cumulée est supérieure ou égale à 1 000 m².</p>

<h4>Question 9 – Quels sont les objectifs de réduction de la consommation d'énergie finale du décret tertiaire en valeur relative ?</h4>
<ol type="A">
<li>−20 % en 2030, −30 % en 2040, −40 % en 2050</li>
<li>−40 % en 2030, −50 % en 2040, −60 % en 2050, par rapport à une année de référence entre 2010 et 2019</li>
<li>−50 % en 2030 par rapport à 2020</li>
<li>−60 % en 2030 par rapport à 1990</li>
</ol>
<p><strong>Réponse : B.</strong> L'assujetti peut aussi choisir l'objectif en valeur absolue fixé par arrêté pour sa catégorie d'activité. Les consommations sont déclarées chaque année sur OPERAT.</p>

<h4>Question 10 – Mme Lopez, copropriétaire, souhaite faire isoler les façades de son immeuble. Que doit faire le conseiller ?</h4>
<ol type="A">
<li>Lui faire signer un devis pour l'ensemble des façades</li>
<li>Lui expliquer que ces travaux portent sur les parties communes et relèvent d'une décision de l'assemblée générale, et l'aider à porter le projet auprès du conseil syndical et du syndic</li>
<li>Lui conseiller d'isoler uniquement la portion de façade correspondant à son appartement sans en parler</li>
<li>Refuser le projet</li>
</ol>
<p><strong>Réponse : B.</strong> Les façades sont des parties communes : la décision appartient à l'AG (travaux d'économie d'énergie à la majorité de l'article 25, avec passerelle de l'article 25-1). Mme Lopez peut décider seule des travaux dans ses parties privatives.</p>
`,
      },
      {
        title: "3.9 – Cas pratique corrigé : la découverte chez M. et Mme Ferrand",
        content: `
<h3>Contexte (fictif)</h3>
<p>Karim, conseiller chez Thermia Rénov, se rend chez M. et Mme Ferrand à Brignais (Rhône), un samedi à 9 h 30. Les éléments recueillis en pré-qualification et au cours du rendez-vous sont les suivants (tous fictifs) :</p>
<ul>
<li>Maison individuelle de 1978, 120 m² habitables sur deux niveaux, sous-sol semi-enterré non chauffé, combles perdus au-dessus de l'étage (environ 65 m²), murs en parpaing de 20 cm avec doublage d'origine (polystyrène de 2 à 3 cm), fenêtres en double vitrage de 2004.</li>
<li>Chaudière fioul de 1998 (puissance nominale 28 kW), radiateurs acier, ballon d'eau chaude de 150 L couplé à la chaudière, cuve de fioul de 3 000 L au sous-sol.</li>
<li>Consommation : environ 2 200 L de fioul par an ; deux livraisons l'hiver dernier.</li>
<li>DPE de mars 2024 : classe F (énergie et climat) ; déperditions principales : toiture 28 %, murs 24 %, renouvellement d'air 18 %.</li>
<li>Couple de 63 et 61 ans ; M. Ferrand retraité, Mme Ferrand à mi-temps ; petits-enfants accueillis pendant les vacances.</li>
<li>Ressenti : étage froid, chambre nord « glaciale », étage étouffant en été ; condensation dans la salle de bains.</li>
<li>Les clients se situent, d'après le tableau officiel en vigueur consulté avec eux, dans la catégorie « revenus modestes » ; ils disposent d'environ 8 000 € d'épargne mobilisable et n'excluent pas un prêt.</li>
<li>Ils ont reçu, deux mois plus tôt, un devis d'une autre entreprise pour une PAC de 16 kW, remis le jour même du rendez-vous, avec une « aide garantie » de 11 000 € inscrite à la main ; ce devis les a inquiétés.</li>
</ul>

<h3>Consigne</h3>
<ol>
<li>Rédigez la prise de contact de Karim (présentation, rappel de l'origine, déroulé proposé).</li>
<li>Proposez six questions de découverte en respectant la technique de l'entonnoir, sur le thème du confort et des consommations.</li>
<li>Identifiez les motivations SONCAS(E) dominantes et secondaires, avec les indices qui les révèlent, ainsi que les freins.</li>
<li>Listez les relevés de la visite technique indispensables à ce projet.</li>
<li>Rédigez la reformulation-synthèse de fin de rendez-vous et les prochaines étapes.</li>
<li>Relevez les points de vigilance soulevés par le devis concurrent.</li>
</ol>
<p>Durée conseillée : 45 minutes en sous-groupes, puis jeu de rôle de 10 minutes (un conseiller, deux clients, un observateur muni de la grille d'auto-évaluation de la section 3.7).</p>

<h3>Corrigé détaillé</h3>
<h4>1. Prise de contact</h4>
<blockquote>« Bonjour Madame, bonjour Monsieur. Je suis Karim B., conseiller chez Thermia Rénov, une entreprise de rénovation énergétique de Saint-Genis-Laval, qualifiée RGE ; voici ma carte. Vous nous avez contactés sur la recommandation de M. Garnier, votre voisin, au sujet de votre chauffage au fioul. Je vous propose de commencer par une vingtaine de minutes d'échange pour que vous m'expliquiez votre situation et ce que vous attendez ; ensuite je ferai le tour de la maison, chaufferie et combles compris, pour les relevés techniques ; enfin nous ferons le point ensemble. Je ne vous remettrai pas de devis aujourd'hui : il faut d'abord dimensionner correctement l'installation. Je reviendrai vers vous avec une proposition détaillée. Cela vous convient-il ? »</blockquote>

<h4>2. Questions en entonnoir</h4>
<ol>
<li>(Ouverte) « Comment se passe l'hiver dans votre maison ? »</li>
<li>(Relais) « Vous dites que la chambre du fond est glaciale : à quels moments le ressentez-vous le plus ? »</li>
<li>(Ouverte) « Et l'été, comment cela se passe-t-il à l'étage ? »</li>
<li>(Fermée) « À quelle température réglez-vous le thermostat, et le chauffage fonctionne-t-il toute la journée ? »</li>
<li>(Fermée chiffrée) « Combien de litres de fioul avez-vous commandés sur les deux ou trois dernières années, et pour quel montant ? »</li>
<li>(Contrôle) « Si je résume : l'étage est inconfortable en hiver comme en été, vous chauffez à 21 °C toute la journée et vous consommez environ 2 200 litres par an. C'est bien cela ? »</li>
</ol>

<h4>3. Motivations et freins</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Motivation</th><th>Rang</th><th>Indices</th></tr>
<tr><td>Confort</td><td>Dominante</td><td>« Chambre glaciale », radiateur d'appoint pour les petits-enfants, étage étouffant l'été ; fin des livraisons de fioul</td></tr>
<tr><td>Argent</td><td>Secondaire</td><td>« La deuxième livraison nous a fait mal » ; épargne limitée ; questions sur les aides</td></tr>
<tr><td>Sécurité</td><td>Secondaire</td><td>Âge de la chaudière (« pour combien de temps ») ; inquiétude après le devis concurrent</td></tr>
<tr><td>Sympathie</td><td>Présente</td><td>Recommandation du voisin</td></tr>
<tr><td>Environnement</td><td>Faible à vérifier</td><td>Non exprimée spontanément ; à sonder par une question ouverte</td></tr>
</table>
<p>Freins : peur de l'arnaque (devis concurrent), avance de trésorerie (épargne de 8 000 €), crainte du bruit de l'unité extérieure (maison proche de la limite de propriété, à vérifier), crainte d'un chantier long.</p>

<h4>4. Relevés techniques indispensables</h4>
<ul>
<li>Combles : accès, surface (environ 65 m²), nature et épaisseur réelle de l'isolant, état, présence de spots, conduits et gaines, pare-vapeur, charpente.</li>
<li>Murs : composition, doublage, état ; façade nord.</li>
<li>Chaufferie : plaque signalétique de la chaudière, ballon, cuve (neutralisation ou dépose à prévoir), circuit hydraulique, place disponible pour le module hydraulique ou le ballon de la PAC.</li>
<li>Émetteurs : nombre et dimensions des radiateurs par pièce, pour déterminer la température de départ nécessaire après isolation.</li>
<li>Extérieur : emplacement de l'unité extérieure (distance aux limites et aux fenêtres voisines, socle, évacuation des condensats, liaisons frigorifiques ou hydrauliques), règlement de lotissement.</li>
<li>Électricité : puissance souscrite, tableau, place disponible, monophasé ou triphasé.</li>
<li>Ventilation : absence de VMC, entrées d'air, condensation en salle de bains ; possibilité de passage de gaines dans les combles.</li>
<li>Photos datées de chaque point, compte rendu de visite daté (preuve de la visite préalable).</li>
</ul>

<h4>5. Synthèse et prochaines étapes</h4>
<blockquote>« Si je résume notre matinée : votre priorité est d'avoir enfin un étage confortable, l'hiver comme l'été, notamment quand vos petits-enfants viennent ; vous voulez aussi sortir du fioul pour maîtriser votre budget et ne plus dépendre des livraisons, avec une solution fiable dans la durée. Dans les combles, nous avons vu ensemble que l'isolant d'origine est tassé, une dizaine de centimètres au mieux : c'est cohérent avec le DPE, qui place la toiture en premier poste de pertes. Je vais faire dimensionner deux scénarios : le premier en commençant par les combles et la pompe à chaleur, dimensionnée après isolation ; le second, plus global, ajoutant les murs et la ventilation, pour viser un saut de plusieurs classes au DPE. Pour chacun, je vous présenterai le coût, les aides auxquelles vous pourriez prétendre, vérifiées sur les barèmes en vigueur, le reste à charge et une estimation d'économies à partir de vos consommations réelles. Est-ce que cela vous convient ? Je vous propose de nous revoir samedi 24 à 10 h, tous les deux. D'ici là, pourriez-vous m'envoyer les factures de fioul de 2023 à 2025 et, si vous l'acceptez, votre dernier avis d'imposition ? Je vous conseille aussi de prendre rendez-vous avec le conseiller France Rénov' de votre secteur : c'est gratuit et indépendant, et c'est utile pour le parcours d'aides. »</blockquote>
<p>Karim envoie le jour même un courriel reprenant cette synthèse, la liste des documents attendus et la date du rendez-vous.</p>

<h4>6. Points de vigilance sur le devis concurrent</h4>
<ul>
<li><strong>Puissance de 16 kW</strong> annoncée sans visite détaillée ni isolation préalable : risque de surdimensionnement si les combles sont isolés, avec fonctionnement en cycles courts et usure prématurée. Karim ne dénigre pas le concurrent ; il explique sa méthode (dimensionnement après isolation, calcul des déperditions).</li>
<li><strong>« Aide garantie » de 11 000 €</strong> : aucune entreprise ne peut garantir un montant d'aide publique, qui dépend de l'éligibilité, des barèmes en vigueur et de l'instruction du dossier. C'est un signal d'alerte à signaler calmement aux clients.</li>
<li><strong>Devis remis le jour même</strong> : à vérifier, la présence de la date de visite préalable, de la qualification RGE (numéro, organisme, domaine), des caractéristiques techniques et de l'attestation d'assurance décennale (voir chapitre 4). Si le contrat a été conclu au domicile, rappeler aux clients leurs droits (délai de rétractation, traité au chapitre consacré à la conclusion de la vente).</li>
<li>Conseiller aux clients de faire vérifier tout devis par un conseiller France Rénov'.</li>
</ul>

<h4>Points de vigilance relevés lors de la correction</h4>
<ul>
<li>Des questions fermées dès le début de l'entretien (« Quelle est la puissance de votre chaudière ? »).</li>
<li>Une synthèse qui oublie le confort d'été ou la ventilation.</li>
<li>Un montant d'aide annoncé pendant la découverte.</li>
<li>Un dénigrement du concurrent (« c'est une arnaque ») au lieu d'une explication factuelle.</li>
<li>L'absence de date et de présence des deux décideurs pour le rendez-vous suivant.</li>
</ul>

<blockquote><strong>À retenir.</strong> Une découverte réussie chez les Ferrand repose sur une prise de contact transparente, un questionnement en entonnoir, l'identification du confort comme motivation dominante, des relevés techniques complets et tracés, une synthèse validée qui annonce des scénarios sans chiffrage hâtif et des prochaines étapes précises. Face à un devis concurrent douteux, on reste factuel, on explique sa méthode et l'on oriente vers le conseil public indépendant.</blockquote>
`,
      },
    ],
  },
  {
    title: "Chapitre 4 – Élaborer un argumentaire et une proposition commerciale adaptée (C3)",
    description:
      "Transformer la découverte en une proposition commerciale convaincante, honnête et conforme : méthodes CAP et BAC, argumentaires par solution (pompe à chaleur, isolation, chauffe-eau thermodynamique, photovoltaïque, ventilation), bénéfices économiques et écologiques, chiffrage pédagogique du reste à charge et du temps de retour, scénarios par geste et de rénovation d'ampleur, devis conforme et mentions obligatoires, présentation de la proposition et supports d'aide à la vente. Durée indicative : une journée (jour 3 de la formation). Module C3 du programme.",
    sections: [
      {
        title: "4.1 – De la découverte à la recommandation : construire une solution sur mesure",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Passer méthodiquement des besoins recueillis à une recommandation technique et commerciale.</li>
<li>Hiérarchiser les travaux selon une logique de performance (« l'enveloppe d'abord ») tout en tenant compte des priorités et des moyens du client.</li>
<li>Structurer une proposition commerciale en rubriques qui répondent aux questions du client.</li>
</ul>

<h3>La logique de recommandation</h3>
<p>Une proposition commerciale n'est pas un catalogue : c'est la <strong>réponse argumentée à une situation</strong>. Elle découle directement de la fiche de découverte (chapitre 3) et doit permettre au client de retrouver, noir sur blanc, ce qu'il a exprimé. La démarche suit cinq étapes :</p>
<ol>
<li><strong>Rappeler la situation et les attentes</strong> hiérarchisées, avec les mots du client (synthèse validée en fin de découverte).</li>
<li><strong>Poser le diagnostic</strong> : où sont les pertes, quels équipements sont en fin de vie, quelles contraintes (urbanisme, copropriété, réglementation).</li>
<li><strong>Construire des scénarios</strong> : en général deux ou trois, du plus simple au plus ambitieux, chacun cohérent techniquement.</li>
<li><strong>Chiffrer chaque scénario</strong> : coût TTC, aides estimées (vérifiées sur les sources officielles), reste à charge, économies estimées, effet sur l'étiquette DPE, financement possible.</li>
<li><strong>Recommander</strong> : le conseiller assume une recommandation, justifiée par les priorités du client, tout en lui laissant le choix.</li>
</ol>

<h3>La hiérarchie technique : « l'enveloppe d'abord », mais pas à n'importe quel prix</h3>
<p>Le principe de bon sens, porté par les acteurs publics de la rénovation, consiste à <strong>réduire les besoins avant d'optimiser la production</strong> : isoler et traiter l'étanchéité à l'air et la ventilation, puis installer un système de chauffage dimensionné sur des besoins réduits, enfin produire de l'énergie renouvelable. Cette logique évite les surdimensionnements et les travaux « verrous » (un geste qui rend un autre plus difficile ou plus coûteux par la suite).</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Ordre logique</th><th>Travaux</th><th>Pourquoi</th></tr>
<tr><td>1. Réduire les besoins</td><td>Isolation de la toiture, des murs, des planchers bas ; menuiseries ; traitement des ponts thermiques et de l'étanchéité à l'air</td><td>Gains durables ; confort des parois ; condition d'un bon dimensionnement</td></tr>
<tr><td>2. Assurer la qualité de l'air</td><td>Ventilation mécanique adaptée</td><td>Indispensable dès que l'on rend le logement plus étanche</td></tr>
<tr><td>3. Produire efficacement</td><td>Pompe à chaleur, chauffe-eau thermodynamique, chauffage au bois performant, raccordement à un réseau de chaleur</td><td>Sortir des énergies fossiles ; rendements élevés</td></tr>
<tr><td>4. Produire localement</td><td>Photovoltaïque en autoconsommation, solaire thermique</td><td>Réduire la part d'énergie achetée</td></tr>
<tr><td>5. Piloter</td><td>Régulation, programmation, suivi des consommations</td><td>Maintenir la performance dans le temps</td></tr>
</table>
<p>Dans la réalité, les priorités du client et ses moyens peuvent conduire à un autre ordre : une chaudière en panne en plein hiver impose de traiter d'abord le chauffage. Le rôle du conseiller est alors d'<strong>expliquer les conséquences</strong> (dimensionnement sur l'état actuel, possibilité de baisser la température d'eau après isolation) et de proposer un <strong>plan par étapes cohérent</strong>, plutôt que de refuser ou d'imposer.</p>

<h3>La structure type d'une proposition commerciale</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu</th><th>Question du client à laquelle elle répond</th></tr>
<tr><td>1. Votre projet</td><td>Synthèse de la découverte, attentes hiérarchisées</td><td>« M'a-t-on compris ? »</td></tr>
<tr><td>2. Notre diagnostic</td><td>Constats de la visite, extrait du DPE, photos commentées, schéma des déperditions</td><td>« Quel est vraiment le problème ? »</td></tr>
<tr><td>3. Nos solutions</td><td>Deux ou trois scénarios, avec pour chacun les travaux, les équipements, les performances</td><td>« Que me proposez-vous ? »</td></tr>
<tr><td>4. Ce que vous y gagnez</td><td>Bénéfices de confort, économiques, patrimoniaux, environnementaux, présentés selon les motivations du client</td><td>« Qu'est-ce que ça change pour moi ? »</td></tr>
<tr><td>5. Le budget</td><td>Coût TTC, aides estimées, reste à charge, financement, temps de retour, avec hypothèses explicites</td><td>« Combien cela me coûte vraiment ? »</td></tr>
<tr><td>6. Nos garanties</td><td>Qualification RGE, assurance décennale, garanties légales et fabricant, entretien, service après-vente</td><td>« Puis-je avoir confiance ? »</td></tr>
<tr><td>7. Le déroulement</td><td>Démarches d'aides, calendrier, durée du chantier, réception, mise en service</td><td>« Comment cela va-t-il se passer ? »</td></tr>
<tr><td>8. Notre recommandation et les prochaines étapes</td><td>Scénario recommandé, justification, validité de l'offre, démarches à engager</td><td>« Que dois-je faire maintenant ? »</td></tr>
<tr><td>Annexes</td><td>Devis détaillés et conformes, attestations RGE et décennale, fiches techniques, références</td><td>« Est-ce sérieux et vérifiable ? »</td></tr>
</table>

<h3>Personnaliser : les mots du client et ses motivations</h3>
<p>Chaque rubrique reprend les éléments de la découverte. Comparez :</p>
<ul>
<li><em>Version générique</em> : « Notre pompe à chaleur air/eau vous permettra de réaliser d'importantes économies. »</li>
<li><em>Version personnalisée</em> : « Vous nous avez dit que la chambre du fond était "glaciale" quand vos petits-enfants viennent à Noël. En isolant les combles avant d'installer la pompe à chaleur, toutes les chambres de l'étage seront chauffées de façon homogène, sans radiateur d'appoint. »</li>
</ul>
<p>La seconde version prouve l'écoute, parle du bénéfice concret et respecte la motivation dominante (Confort). C'est l'objet des méthodes CAP et BAC présentées en section 4.2.</p>

<h3>L'honnêteté comme principe commercial</h3>
<p>Dans un secteur où la confiance a été abîmée, la proposition doit être irréprochable :</p>
<ul>
<li>Présenter les économies comme des <strong>estimations</strong>, avec leurs hypothèses (consommations de référence, prix des énergies, performance saisonnière des équipements).</li>
<li>Présenter les aides comme <strong>estimées et sous réserve d'éligibilité</strong>, en citant la source (barème en vigueur sur france-renov.gouv.fr, simulateur officiel, offre de prime CEE de l'obligé ou de son délégataire).</li>
<li>Signaler les <strong>limites</strong> de chaque solution (bruit de l'unité extérieure, encombrement du ballon, entretien obligatoire, dépendance au prix de l'électricité, production photovoltaïque variable selon la saison).</li>
<li>Ne jamais recourir à des allégations trompeuses : le code de la consommation sanctionne les pratiques commerciales trompeuses, notamment les allégations fausses sur les caractéristiques d'un produit, les résultats attendus ou l'existence d'un agrément public. Se présenter comme « partenaire de l'État » ou « mandaté par l'Anah » est interdit.</li>
</ul>

<blockquote><strong>À retenir.</strong> La proposition commerciale est la réponse argumentée à la situation découverte : rappel du projet, diagnostic, scénarios, bénéfices, budget, garanties, déroulement, recommandation et annexes. Elle suit la logique « réduire les besoins, ventiler, produire efficacement, produire localement, piloter », tout en s'adaptant aux urgences et aux moyens du client par un plan par étapes cohérent. Elle est personnalisée avec les mots du client et rigoureusement honnête sur les économies, les aides et les limites des solutions.</blockquote>
`,
      },
      {
        title: "4.2 – Les méthodes CAP et BAC pour construire ses arguments",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Distinguer caractéristique, avantage, bénéfice et preuve.</li>
<li>Construire des arguments selon les méthodes CAP et BAC.</li>
<li>Adapter un même argument aux différentes motivations SONCAS(E).</li>
</ul>

<h3>Les briques d'un argument</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Brique</th><th>Définition</th><th>Exemple (PAC air/eau)</th></tr>
<tr><td><strong>Caractéristique</strong></td><td>Fait objectif et vérifiable sur le produit ou le service</td><td>Coefficient de performance saisonnier (SCOP) indiqué par le fabricant ; efficacité énergétique saisonnière (ETAS) en pourcentage ; régulation selon la température extérieure</td></tr>
<tr><td><strong>Avantage</strong></td><td>Ce que la caractéristique permet de faire, en général</td><td>Produit plusieurs kWh de chaleur pour un kWh d'électricité consommé ; adapte la température de l'eau à la météo</td></tr>
<tr><td><strong>Bénéfice</strong></td><td>Ce que l'avantage apporte à <em>ce</em> client, en lien avec sa motivation</td><td>« Vous chaufferez toute la maison, étage compris, pour une dépense annuelle estimée nettement inférieure à votre budget fioul actuel, sans commander de fioul. »</td></tr>
<tr><td><strong>Preuve</strong></td><td>Élément qui rend l'argument crédible</td><td>Fiche technique et étiquette énergie du produit, certification, calcul détaillé sur les consommations du client, témoignage d'un client voisin, visite d'une installation</td></tr>
</table>

<h3>La méthode CAP : Caractéristique – Avantage – Preuve</h3>
<p>La méthode CAP part du produit pour arriver à la preuve. Elle convient aux clients techniques ou rationnels, qui veulent comprendre « comment ça marche » avant d'être convaincus, et aux interlocuteurs B2B (services techniques, bureaux d'études).</p>
<blockquote><strong>Exemple CAP (isolation des combles).</strong> « Nous soufflerons de la ouate de cellulose sur environ 35 centimètres d'épaisseur, pour une résistance thermique de 7 m².K/W (<em>caractéristique</em>). Cela divise très fortement les pertes par la toiture, qui représentent le premier poste de déperdition de votre maison selon votre DPE, et grâce à la densité de cet isolant, la chaleur d'été pénètre plus lentement (<em>avantage</em>). Voici la fiche technique du produit, avec sa certification de performance, et la photo de vos combles actuels où l'isolant d'origine ne dépasse pas 10 centimètres (<em>preuve</em>). »</blockquote>

<h3>La méthode BAC : Bénéfice – Avantage – Caractéristique</h3>
<p>La méthode BAC inverse l'ordre : on <strong>commence par le bénéfice</strong> qui parle au client, puis on explique comment (avantage) et grâce à quoi (caractéristique). Elle convient à la majorité des particuliers, qui achètent un résultat (le confort, une facture plus légère) et non une technologie. On la complète volontiers par une preuve.</p>
<blockquote><strong>Exemple BAC (même isolation, pour les Ferrand).</strong> « Vos chambres à l'étage seront enfin confortables, l'hiver comme l'été, y compris celle du fond quand vos petits-enfants viennent (<em>bénéfice</em>). C'est parce que nous allons supprimer l'essentiel des pertes par le toit, qui sont aujourd'hui les plus importantes de la maison, et ralentir l'entrée de la chaleur l'été (<em>avantage</em>), en soufflant environ 35 centimètres de ouate de cellulose, soit une résistance thermique de 7 (<em>caractéristique</em>). D'ailleurs, M. Garnier, votre voisin, a fait faire les mêmes travaux l'an dernier : vous pouvez lui demander ce qu'il en pense (<em>preuve</em>). »</blockquote>

<h3>CAP ou BAC : comment choisir ?</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Méthode à privilégier</th></tr>
<tr><td>Particulier peu technique, motivation Confort ou Argent</td><td>BAC</td></tr>
<tr><td>Client ingénieur, technicien, passionné de technique (motivation Nouveauté)</td><td>CAP, puis bénéfice</td></tr>
<tr><td>Responsable technique d'un bâtiment tertiaire, bureau d'études</td><td>CAP</td></tr>
<tr><td>Gérant de SCI, directeur financier, assemblée générale de copropriété</td><td>BAC, avec des bénéfices chiffrés (charges, temps de retour, conformité)</td></tr>
</table>
<p>Dans tous les cas, un argument sans <strong>bénéfice personnalisé</strong> n'est pas un argument : c'est une fiche technique récitée.</p>

<h3>Un argument par motivation : la déclinaison SONCAS(E)</h3>
<p>Un même produit se présente différemment selon la motivation dominante. Exemple avec le <strong>chauffe-eau thermodynamique</strong> :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Motivation</th><th>Bénéfice mis en avant</th></tr>
<tr><td>Sécurité</td><td>« Un équipement installé par une entreprise RGE, avec garantie fabricant et contrôle à la mise en service ; vous gardez une résistance d'appoint pour ne jamais manquer d'eau chaude. »</td></tr>
<tr><td>Orgueil</td><td>« Vous faites un choix d'équipement performant, parmi les mieux classés sur l'étiquette énergie de sa catégorie. »</td></tr>
<tr><td>Nouveauté</td><td>« Pilotage depuis votre téléphone, programmation sur les heures creuses ou sur votre production solaire. »</td></tr>
<tr><td>Confort</td><td>« De l'eau chaude en quantité pour toute la famille, même quand les petits-enfants sont là. »</td></tr>
<tr><td>Argent</td><td>« Une consommation d'électricité pour l'eau chaude nettement réduite par rapport à un cumulus classique ; estimation détaillée sur vos usages. »</td></tr>
<tr><td>Sympathie</td><td>« Je serai votre interlocuteur du devis à la mise en service, et notre technicien passera vous montrer le réglage. »</td></tr>
<tr><td>Environnement</td><td>« Une grande partie de l'énergie utilisée est puisée dans l'air ambiant : moins d'électricité consommée, moins d'émissions. »</td></tr>
</table>

<h3>Les preuves : la crédibilité de l'argumentaire</h3>
<ul>
<li><strong>Preuves documentaires</strong> : fiches techniques, étiquettes énergie, certifications des produits (par exemple certifications de performance des isolants ou des pompes à chaleur), attestation de qualification RGE, attestation d'assurance décennale.</li>
<li><strong>Preuves chiffrées</strong> : calcul fondé sur les consommations réelles du client, avec hypothèses explicites.</li>
<li><strong>Preuves sociales</strong> : témoignages de clients (avec leur accord), avis vérifiés, visites de chantiers terminés, photos de réalisations.</li>
<li><strong>Preuves par la démonstration</strong> : image thermique du logement en hiver, mesure sonore d'une unité extérieure en fonctionnement, simulateur de production photovoltaïque public (par exemple l'outil européen PVGIS).</li>
<li><strong>Preuves institutionnelles</strong> : renvoi aux sites officiels (france-renov.gouv.fr, ADEME) pour les aides et les ordres de grandeur. Attention : on ne se prévaut jamais d'un « agrément de l'État » qu'on n'a pas ; la qualification RGE est délivrée par des organismes de qualification, ce n'est pas un partenariat avec l'État.</li>
</ul>

<h3>Les mots qui comptent</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>À éviter</th><th>À préférer</th><th>Pourquoi</th></tr>
<tr><td>« Vous allez économiser 70 % »</td><td>« Selon nos hypothèses, détaillées ici, l'économie estimée est de l'ordre de… »</td><td>Honnêteté, opposabilité</td></tr>
<tr><td>« L'État vous offre… », « travaux gratuits »</td><td>« Vous pourriez bénéficier d'aides, estimées à… sous réserve d'éligibilité »</td><td>Pratique trompeuse ; les offres « à 1 € » ont alimenté la fraude</td></tr>
<tr><td>« Il faut signer aujourd'hui, l'aide s'arrête demain »</td><td>« Les barèmes évoluent ; voici les règles en vigueur à ce jour et la source pour les vérifier »</td><td>Pression contraire à la déontologie, voire pratique agressive</td></tr>
<tr><td>« Notre PAC est la meilleure »</td><td>« Ce modèle répond à vos besoins pour ces raisons… »</td><td>Argument non prouvé</td></tr>
<tr><td>Jargon (« ETAS », « Up », « COP à +7/+35 ») sans explication</td><td>Expliquer simplement, puis citer le chiffre</td><td>Compréhension du client</td></tr>
</table>

<blockquote><strong>À retenir.</strong> Un argument articule caractéristique, avantage, bénéfice personnalisé et preuve. La méthode CAP (Caractéristique, Avantage, Preuve) convient aux interlocuteurs techniques ; la méthode BAC (Bénéfice, Avantage, Caractéristique) convient à la plupart des particuliers et aux décideurs financiers. On adapte le bénéfice à la motivation dominante (SONCASE), on apporte des preuves documentaires, chiffrées, sociales ou démonstratives, et l'on bannit les promesses chiffrées sans hypothèses et les allégations trompeuses.</blockquote>
`,
      },
      {
        title: "4.3 – Argumentaires par solution : PAC, isolation, chauffe-eau thermodynamique, photovoltaïque, ventilation",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Connaître, pour chaque solution posée par Thermia Rénov, les arguments clés, les preuves et les limites à signaler honnêtement.</li>
<li>Savoir présenter les critères de performance qui conditionnent l'éligibilité aux aides, sans en mémoriser les seuils.</li>
<li>Associer les solutions entre elles dans une logique de bouquet.</li>
</ul>
<p>Les fiches ci-dessous sont des <strong>trames</strong> : chaque argument doit être personnalisé avec les données de la découverte. Les seuils de performance exigés pour les aides (résistance thermique minimale, efficacité énergétique saisonnière, etc.) sont fixés par les textes relatifs à chaque aide et aux fiches d'opérations standardisées des certificats d'économies d'énergie ; ils évoluent et se vérifient au moment du devis.</p>

<h3>1. La pompe à chaleur air/eau</h3>
<h4>Principe à expliquer simplement</h4>
<p>La PAC capte les calories de l'air extérieur, même froid, et les transfère à l'eau du circuit de chauffage grâce à un fluide frigorigène et à un compresseur. Elle restitue plusieurs fois plus d'énergie thermique qu'elle ne consomme d'électricité : c'est ce qu'exprime le coefficient de performance (COP) mesuré dans des conditions données, et, sur une saison entière, le SCOP. L'efficacité énergétique saisonnière (ETAS, en %) est l'indicateur réglementaire européen qui figure notamment sur l'étiquette énergie et sert de critère d'éligibilité aux aides.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Arguments (bénéfices)</th><th>Preuves</th><th>Limites à signaler</th></tr>
<tr><td>Sortie des énergies fossiles (fioul, gaz) ; fin des livraisons, de la cuve et du ramonage ; chauffage et éventuellement eau chaude ; dépense annuelle estimée inférieure au fioul selon les hypothèses ; forte amélioration de l'étiquette climat du DPE ; réutilisation des radiateurs existants si la température de départ le permet</td><td>Étiquette énergie et fiche technique ; note de dimensionnement ; calcul d'économie sur les consommations réelles ; références de chantiers</td><td>Performance qui baisse quand il fait très froid et quand la température d'eau demandée est élevée ; bruit de l'unité extérieure (implantation à soigner) ; entretien et contrôle d'étanchéité du circuit frigorigène selon la réglementation applicable ; dépendance au prix de l'électricité ; coût d'investissement élevé</td></tr>
</table>
<p><strong>Point de vigilance réglementaire</strong> : depuis le 1er juillet 2022, il n'est plus possible d'installer une chaudière neuve fonctionnant au fioul (ou à un autre combustible fortement émetteur) dans les bâtiments, sauf exceptions prévues par le décret n° 2022-8 du 5 janvier 2022 ; l'entretien et la réparation des chaudières existantes restent autorisés. C'est un argument factuel (on ne remplacera pas une chaudière fioul par une chaudière fioul neuve), pas une obligation de remplacement : il ne faut jamais laisser croire au client que sa chaudière actuelle est « interdite ».</p>
<p><strong>Point de vigilance sur la cuve</strong> : une cuve de fioul hors d'usage doit être vidée, dégazée et nettoyée, puis neutralisée ou déposée par un professionnel ; prévoir ce poste dans le devis.</p>

<h3>2. L'isolation des combles et des rampants</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Arguments (bénéfices)</th><th>Preuves</th><th>Limites à signaler</th></tr>
<tr><td>Premier poste de pertes dans de nombreuses maisons ; confort d'hiver immédiat à l'étage ; confort d'été amélioré (selon l'isolant et l'épaisseur) ; travaux rapides (souvent une journée pour des combles perdus) ; coût modéré au regard du gain ; permet de réduire la puissance de la PAC</td><td>Répartition des déperditions du DPE ; photos des combles ; fiche technique et certification de l'isolant ; résistance thermique R (en m².K/W) visée</td><td>Accessibilité des combles ; nécessité de traiter les spots encastrés, les conduits de fumée (écart au feu) et les boîtiers électriques ; pare-vapeur selon les cas ; ventilation à vérifier ; tassement de certains isolants en vrac (prévoir une surépaisseur conforme aux règles de l'art)</td></tr>
</table>
<p><strong>Rappel déontologique</strong> : les offres d'isolation « à 1 € » ont été à l'origine de nombreux travaux bâclés et de fraudes ; les règles des certificats d'économies d'énergie ont été durcies et des contrôles renforcés. Le conseiller présente un prix réel, des aides estimées et un reste à charge, sans slogans.</p>

<h3>3. L'isolation des murs</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Solution</th><th>Arguments</th><th>Limites</th></tr>
<tr><td>Isolation par l'extérieur (ITE)</td><td>Traite la plupart des ponts thermiques ; ne réduit pas la surface habitable ; travaux sans entrer dans le logement ; rénovation de la façade en même temps ; préserve l'inertie des murs (confort d'été)</td><td>Coût élevé ; déclaration préalable en mairie, contraintes d'urbanisme (aspect extérieur, alignement, périmètres protégés) ; échafaudage ; traitement des appuis de fenêtres et des débords de toiture</td></tr>
<tr><td>Isolation par l'intérieur (ITI)</td><td>Coût plus modéré ; possible pièce par pièce ; pas de démarche d'urbanisme en général</td><td>Perte de surface ; dépose et repose des équipements (radiateurs, prises) ; ponts thermiques aux planchers et refends ; logement occupé pendant les travaux</td></tr>
</table>
<p>Les conditions d'aide applicables à l'isolation des murs ont changé en 2026 (exclusion de ce geste du parcours MaPrimeRénov' par geste selon les annonces officielles, maintien dans le cadre de la rénovation d'ampleur et, le cas échéant, des certificats d'économies d'énergie) : vérifier systématiquement les règles en vigueur avant de présenter un plan de financement.</p>

<h3>4. Le chauffe-eau thermodynamique</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Arguments (bénéfices)</th><th>Preuves</th><th>Limites à signaler</th></tr>
<tr><td>Réduit fortement la consommation d'électricité pour l'eau chaude par rapport à un cumulus à résistance ; solution simple en remplacement d'un ballon ; possible en appartement selon la configuration ; peut fonctionner sur les heures creuses ou sur la production solaire</td><td>COP mesuré selon la norme du produit ; étiquette énergie ; estimation sur les besoins du foyer</td><td>Encombrement (hauteur, volume) ; bruit ; besoin d'un volume d'air suffisant ou de gaines vers l'extérieur ; refroidit la pièce où il est installé s'il prélève l'air ambiant (intéressant dans un garage ou une buanderie, moins dans une pièce chauffée)</td></tr>
</table>

<h3>5. Le photovoltaïque en autoconsommation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Arguments (bénéfices)</th><th>Preuves</th><th>Limites à signaler</th></tr>
<tr><td>Produire une partie de son électricité, en particulier en journée ; réduire la part achetée ; valoriser le surplus (vente du surplus selon le dispositif en vigueur) ; complémentarité avec une PAC ou un chauffe-eau thermodynamique programmé en journée, un véhicule électrique, une présence en journée (retraités, télétravail)</td><td>Simulation de production (outil PVGIS ou logiciel du fabricant) tenant compte de l'orientation, de l'inclinaison et des ombrages ; estimation du taux d'autoconsommation selon le profil de consommation</td><td>Production faible en hiver, quand la PAC consomme le plus : le photovoltaïque ne « chauffe » pas la maison l'hiver ; rentabilité très dépendante du taux d'autoconsommation et des conditions de rachat du surplus, qui ont évolué récemment ; démarches d'urbanisme (déclaration préalable) et de raccordement ; état de la toiture à vérifier</td></tr>
</table>
<p>Les conditions financières (prime à l'autoconsommation, tarif de rachat du surplus, taux de TVA applicable selon la puissance et les critères de l'installation) ont été modifiées à plusieurs reprises depuis 2024. Le conseiller les vérifie au jour du devis sur les sources officielles (Commission de régulation de l'énergie, service-public.fr, impots.gouv.fr) et ne présente <strong>jamais</strong> un temps de retour fondé sur des conditions obsolètes.</p>

<h3>6. La ventilation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Solution</th><th>Arguments</th><th>Limites</th></tr>
<tr><td>VMC simple flux (autoréglable ou hygroréglable)</td><td>Évacue l'humidité et les polluants ; protège le bâti après isolation ; coût modéré ; l'hygroréglable module les débits selon l'humidité et limite les pertes</td><td>Entrées d'air sur les menuiseries ; bruit si mal posée ; entretien des bouches</td></tr>
<tr><td>VMC double flux</td><td>Récupère une grande partie de la chaleur de l'air extrait ; air neuf filtré ; confort (pas d'air froid par les entrées d'air)</td><td>Coût plus élevé ; réseaux de gaines à loger ; étanchéité à l'air du logement nécessaire pour être efficace ; entretien régulier des filtres</td></tr>
</table>
<p>Argument clé : <strong>« On isole, donc on ventile. »</strong> La ventilation n'est pas une option commerciale ; c'est une condition de la santé des occupants et de la durabilité des travaux.</p>

<h3>Combiner les solutions : les bouquets cohérents</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Bouquet cohérent</th><th>Logique</th></tr>
<tr><td>Maison des années 1970 au fioul, combles peu isolés (Ferrand)</td><td>Combles + PAC air/eau dimensionnée après isolation + VMC hygroréglable ; étape 2 : murs</td><td>Réduire, ventiler, puis produire ; prépare une rénovation d'ampleur</td></tr>
<tr><td>Appartement en copropriété avec chauffage collectif (Lopez)</td><td>Chauffe-eau thermodynamique (si possible) + conseils de régulation ; portage d'un projet collectif auprès du conseil syndical</td><td>Agir sur les parties privatives, préparer le collectif</td></tr>
<tr><td>Bureaux tertiaires de 1 200 m² au gaz (SCI Les Tilleuls)</td><td>Isolation de la toiture-terrasse + PAC + régulation / GTB + photovoltaïque en autoconsommation</td><td>Trajectoire décret tertiaire, consommation de journée favorable à l'autoconsommation</td></tr>
<tr><td>Maison récente, bien isolée, chauffage électrique direct</td><td>Chauffe-eau thermodynamique + photovoltaïque ; éventuellement PAC air/air</td><td>Les besoins de chauffage sont déjà faibles</td></tr>
</table>

<blockquote><strong>À retenir.</strong> Chaque solution a ses bénéfices, ses preuves et ses limites, que le conseiller présente honnêtement. La PAC permet de sortir des énergies fossiles mais doit être dimensionnée sur des besoins réduits et implantée avec soin ; l'isolation de la toiture est souvent le geste au meilleur rapport gain/coût ; les murs se traitent par l'extérieur ou par l'intérieur selon le contexte ; le chauffe-eau thermodynamique et le photovoltaïque se raisonnent selon les usages ; la ventilation accompagne toujours l'isolation. Les seuils de performance et les conditions financières se vérifient au jour du devis.</blockquote>
`,
      },
      {
        title: "4.4 – Bénéfices économiques et écologiques : chiffrer le reste à charge et le temps de retour",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Construire un plan de financement lisible : coût TTC, aides estimées, reste à charge, financement.</li>
<li>Estimer une économie annuelle à partir des consommations réelles, avec des hypothèses explicites, et en déduire un temps de retour.</li>
<li>Présenter un bénéfice environnemental chiffré en ordre de grandeur, à partir de facteurs d'émission sourcés.</li>
<li>Tester la sensibilité du calcul aux hypothèses, pour ne jamais présenter un résultat unique comme une certitude.</li>
</ul>

<blockquote><strong>Avertissement.</strong> Tous les prix, montants d'aides et hypothèses de cette section sont <em>fictifs</em> et construits pour l'exercice autour de Thermia Rénov. Dans la réalité, les aides se calculent avec le barème en vigueur, à vérifier sur france-renov.gouv.fr et service-public.fr (simulateur officiel « Mes Aides Réno ») et, pour les certificats d'économies d'énergie, sur l'offre écrite de l'obligé ou de son délégataire ; les prix des énergies se vérifient sur les sources officielles du moment.</blockquote>

<h3>Le vocabulaire du chiffrage</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Terme</th><th>Définition</th></tr>
<tr><td>Coût TTC</td><td>Montant total du devis, taxes comprises (le taux réduit de TVA de 5,5 % s'applique, sous conditions, aux travaux d'amélioration de la qualité énergétique des logements achevés depuis plus de deux ans, ainsi qu'aux travaux induits et indissociables)</td></tr>
<tr><td>Aides estimées</td><td>Montants auxquels le client pourrait prétendre, sous réserve d'éligibilité et d'instruction : MaPrimeRénov', primes CEE, aides locales (Région, Métropole, commune), etc.</td></tr>
<tr><td>Reste à charge</td><td>Coût TTC − aides estimées ; c'est ce que le client finance (épargne, prêt)</td></tr>
<tr><td>Économie annuelle estimée</td><td>Différence entre la dépense énergétique annuelle avant et après travaux (énergie, abonnements, entretien), selon des hypothèses explicites</td></tr>
<tr><td>Temps de retour brut (simple)</td><td>Reste à charge ÷ économie annuelle estimée ; nombre d'années nécessaires pour « rembourser » l'investissement par les économies, sans actualisation ni évolution des prix</td></tr>
<tr><td>Effort mensuel net</td><td>Mensualité d'emprunt − économie mensuelle estimée ; indicateur très parlant lorsque les travaux sont financés à crédit</td></tr>
</table>

<h3>Étape 1 – Partir des consommations réelles</h3>
<p>Reprenons les Ferrand (données fictives) : 2 200 L de fioul par an pour le chauffage et l'eau chaude.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Poste</th><th>Calcul (hypothèses)</th><th>Résultat</th></tr>
<tr><td>Énergie contenue dans le fioul</td><td>2 200 L × 10 kWh/L (ordre de grandeur usuel du pouvoir calorifique du fioul domestique)</td><td>≈ 22 000 kWh</td></tr>
<tr><td>Besoins utiles (chaleur réellement fournie)</td><td>22 000 kWh × 75 % (rendement saisonnier supposé d'une chaudière de 1998)</td><td>≈ 16 500 kWh</td></tr>
<tr><td>Dépense de fioul</td><td>2 200 L × 1,15 €/L (prix moyen supposé)</td><td>≈ 2 530 €/an</td></tr>
<tr><td>Entretien chaudière et ramonage</td><td>Hypothèse</td><td>≈ 180 €/an</td></tr>
<tr><td><strong>Dépense annuelle actuelle</strong></td><td></td><td><strong>≈ 2 710 €/an</strong></td></tr>
</table>

<h3>Étape 2 – Estimer la situation après travaux (scénario 1 : combles + PAC + VMC)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Poste</th><th>Calcul (hypothèses)</th><th>Résultat</th></tr>
<tr><td>Besoins utiles après isolation des combles</td><td>16 500 kWh × (1 − 20 %) ; réduction supposée, cohérente avec la part de la toiture dans les déperditions, en tenant compte de l'eau chaude qui n'est pas concernée</td><td>≈ 13 200 kWh</td></tr>
<tr><td>Électricité consommée par la PAC</td><td>13 200 kWh ÷ 3,0 (performance saisonnière supposée avec des radiateurs acier, chauffage et eau chaude confondus)</td><td>≈ 4 400 kWh</td></tr>
<tr><td>Dépense d'électricité de la PAC</td><td>4 400 kWh × 0,20 €/kWh (prix moyen supposé, toutes taxes)</td><td>≈ 880 €/an</td></tr>
<tr><td>Hausse de l'abonnement électrique (augmentation de puissance souscrite)</td><td>Hypothèse</td><td>≈ 60 €/an</td></tr>
<tr><td>Entretien de la PAC</td><td>Hypothèse (contrat d'entretien)</td><td>≈ 200 €/an</td></tr>
<tr><td><strong>Dépense annuelle après travaux</strong></td><td></td><td><strong>≈ 1 140 €/an</strong></td></tr>
<tr><td><strong>Économie annuelle estimée</strong></td><td>2 710 − 1 140</td><td><strong>≈ 1 570 €/an</strong></td></tr>
</table>
<p>La consommation électrique de la VMC (quelques dizaines d'euros par an) est négligée ici par simplification ; dans une proposition réelle, on l'intègre.</p>

<h3>Étape 3 – Le plan de financement</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Poste (prix fictifs Thermia Rénov)</th><th>Montant TTC</th></tr>
<tr><td>Isolation des combles perdus, 65 m², R = 7 m².K/W, y compris protection des spots et rehausse de trappe</td><td>2 080 €</td></tr>
<tr><td>PAC air/eau de 11 kW avec ballon d'eau chaude de 200 L, régulation, mise en service, neutralisation de la cuve de fioul et dépose de la chaudière</td><td>15 900 €</td></tr>
<tr><td>VMC simple flux hygroréglable, fourniture et pose</td><td>1 900 €</td></tr>
<tr><td><strong>Total TTC</strong></td><td><strong>19 880 €</strong></td></tr>
<tr><td>Aide A – MaPrimeRénov' par geste estimée (montant fictif de l'exercice ; en réalité : forfaits du barème en vigueur selon la catégorie de revenus et le geste, à vérifier)</td><td>− 6 500 €</td></tr>
<tr><td>Aide B – Prime CEE estimée (montant fictif ; en réalité : offre écrite d'un obligé ou délégataire, acceptée avant la signature du devis)</td><td>− 3 200 €</td></tr>
<tr><td><strong>Reste à charge estimé</strong></td><td><strong>10 180 €</strong></td></tr>
</table>
<p><strong>Temps de retour brut</strong> : 10 180 € ÷ 1 570 €/an ≈ <strong>6,5 ans</strong>.</p>
<p><strong>Financement</strong> : les Ferrand disposent de 8 000 € d'épargne. Plusieurs options peuvent être présentées, sans conseil en crédit au-delà de ce que permet le statut de l'entreprise (l'éco-PTZ est distribué par les banques ; le conseiller oriente et informe) :</p>
<ul>
<li>épargne pour l'avance de trésorerie, puis remboursement partiel à la réception des aides ;</li>
<li><strong>éco-prêt à taux zéro</strong> : prêt sans intérêts accordé par une banque partenaire, sous conditions (résidence principale, ancienneté du logement, entreprise RGE), dont le montant maximal dépend du nombre et de la nature des travaux (jusqu'à 50 000 € pour une rénovation globale performante, selon les règles en vigueur à vérifier sur service-public.fr) ;</li>
<li>recours éventuel à un mandataire ou à une avance pour certaines aides, selon les dispositifs.</li>
</ul>
<p><strong>Effort mensuel net</strong> (illustration) : un éco-PTZ de 10 000 € sur 15 ans représente environ 56 €/mois (sans intérêts) ; l'économie mensuelle estimée est d'environ 1 570 ÷ 12 ≈ 130 €. L'opération dégage donc, selon ces hypothèses, environ 74 € de trésorerie par mois dès la première année. Présentation à privilégier pour un client à motivation Argent, en rappelant que les économies restent des estimations.</p>

<h3>Étape 4 – Tester la sensibilité</h3>
<p>Le temps de retour dépend fortement des prix de l'énergie et de la performance réelle. Présenter une fourchette protège le client et le conseiller.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Hypothèse modifiée</th><th>Économie annuelle</th><th>Temps de retour brut</th></tr>
<tr><td>Hypothèses de base</td><td>≈ 1 570 €</td><td>≈ 6,5 ans</td></tr>
<tr><td>Fioul à 0,95 €/L au lieu de 1,15 €/L</td><td>≈ 1 130 €</td><td>≈ 9 ans</td></tr>
<tr><td>Électricité à 0,25 €/kWh au lieu de 0,20 €/kWh</td><td>≈ 1 350 €</td><td>≈ 7,5 ans</td></tr>
<tr><td>Performance saisonnière de 2,6 au lieu de 3,0 (radiateurs exigeant une eau plus chaude)</td><td>≈ 1 430 €</td><td>≈ 7 ans</td></tr>
<tr><td>Aides non obtenues (inéligibilité découverte tardivement)</td><td>≈ 1 570 €</td><td>≈ 12,7 ans</td></tr>
</table>
<p>Lecture : même dans les hypothèses défavorables sur les prix, l'opération reste rentable sur la durée de vie d'une PAC bien entretenue ; en revanche, la perte des aides change radicalement l'équation, d'où l'importance de sécuriser l'éligibilité <strong>avant</strong> la signature et de respecter la chronologie des dossiers.</p>

<h3>Le bénéfice écologique</h3>
<p>On présente un ordre de grandeur des émissions évitées en multipliant les consommations par des <strong>facteurs d'émission</strong> issus de la Base Empreinte de l'ADEME (valeurs à vérifier dans la base au moment du calcul et à citer comme source) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Calcul (facteurs indicatifs)</th><th>Émissions annuelles</th></tr>
<tr><td>Avant : fioul</td><td>22 000 kWh × environ 0,32 kg CO<sub>2</sub>e/kWh</td><td>≈ 7 t CO<sub>2</sub>e</td></tr>
<tr><td>Après : électricité de la PAC</td><td>4 400 kWh × environ 0,08 kg CO<sub>2</sub>e/kWh (facteur de l'électricité pour l'usage chauffage)</td><td>≈ 0,35 t CO<sub>2</sub>e</td></tr>
<tr><td><strong>Émissions évitées</strong></td><td></td><td><strong>≈ 6,7 t CO<sub>2</sub>e par an</strong></td></tr>
</table>
<p>Pour rendre ce chiffre parlant, on peut le comparer à des repères publiés par l'ADEME (par exemple via ses simulateurs grand public d'empreinte carbone), en citant la source. Autres bénéfices écologiques : fin du stockage de fioul (risque de pollution des sols en cas de fuite), baisse de la consommation d'énergie finale, amélioration de l'étiquette climat du DPE. Les limites doivent être mentionnées si le client est sensible au sujet : fluides frigorigènes à gaz à effet de serre (d'où l'importance de l'étanchéité du circuit et de sa récupération en fin de vie), énergie grise des équipements.</p>

<h3>Le bénéfice patrimonial</h3>
<p>Le scénario 1 améliore fortement l'étiquette climat ; l'effet sur l'étiquette énergie se calcule par une simulation conforme à la méthode du DPE (par un diagnostiqueur ou un auditeur), jamais « au jugé ». Si le client envisage de vendre ou de louer, cette simulation devient un argument central.</p>

<h3>Le B2B : coût global et indicateurs financiers</h3>
<p>Pour un décideur professionnel, on complète le temps de retour brut par :</p>
<ul>
<li>le <strong>coût global</strong> sur une période (investissement + énergie + maintenance + renouvellement) comparé entre scénarios ;</li>
<li>la <strong>valeur actuelle nette</strong> ou le <strong>taux de rentabilité interne</strong>, si l'interlocuteur raisonne ainsi (direction financière, expert-comptable) ;</li>
<li>la <strong>contribution à l'objectif réglementaire</strong> (pour le décret tertiaire : kWh d'énergie finale économisés et pourcentage de l'objectif 2030 atteint) ;</li>
<li>les effets sur les <strong>charges refacturées</strong> aux locataires et sur l'attractivité locative.</li>
</ul>

<blockquote><strong>À retenir.</strong> Le chiffrage part des consommations réelles, explicite chaque hypothèse (prix des énergies, rendements, performance saisonnière, réduction des besoins), présente le coût TTC, les aides estimées sous réserve d'éligibilité, le reste à charge, le financement et le temps de retour brut, puis teste la sensibilité. Le bénéfice écologique s'exprime en ordre de grandeur avec des facteurs d'émission sourcés (Base Empreinte de l'ADEME). En B2B, on ajoute le coût global, les indicateurs financiers et la contribution aux objectifs réglementaires.</blockquote>
`,
      },
      {
        title: "4.5 – Scénarios de rénovation : par geste ou rénovation d'ampleur",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Distinguer les travaux par geste, les bouquets de travaux et la rénovation d'ampleur (ou globale).</li>
<li>Connaître les principes du parcours accompagné et le rôle de l'Accompagnateur Rénov'.</li>
<li>Présenter au client des scénarios comparables et l'aider à choisir.</li>
</ul>

<h3>Trois approches</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Approche</th><th>Définition</th><th>Avantages</th><th>Inconvénients</th></tr>
<tr><td>Par geste</td><td>Un seul poste de travaux (ex. : PAC, ou combles)</td><td>Investissement limité, décision rapide, réponse à une urgence</td><td>Gain limité ; risque d'incohérence (PAC surdimensionnée, isolation sans ventilation) ; travaux verrous</td></tr>
<tr><td>Bouquet / par étapes</td><td>Plusieurs gestes coordonnés, éventuellement étalés dans le temps selon un plan</td><td>Cohérence technique, effort financier étalé</td><td>Nécessite un plan d'ensemble dès le départ ; aides parfois moins favorables que la rénovation d'ampleur</td></tr>
<tr><td>Rénovation d'ampleur (globale)</td><td>Ensemble de travaux visant un saut de performance important (gain de plusieurs classes DPE), conçu à partir d'un audit</td><td>Gain énergétique et de confort maximal, valeur patrimoniale, aides proportionnellement plus élevées pour de nombreux ménages</td><td>Investissement élevé, démarches plus longues, chantier plus lourd</td></tr>
</table>

<h3>Le parcours accompagné de rénovation d'ampleur : les principes</h3>
<p>Le dispositif MaPrimeRénov' comporte un parcours dit « accompagné » pour les rénovations d'ampleur des logements. Ses principes structurants, stables depuis plusieurs années, sont les suivants (les modalités précises — classes de départ éligibles, gain minimal, taux, plafonds de dépenses, écrêtement, règles de cumul — sont à vérifier sur france-renov.gouv.fr au moment du projet) :</p>
<ul>
<li><strong>Un audit énergétique</strong> préalable, qui définit les scénarios de travaux et les gains attendus.</li>
<li><strong>Un gain d'au moins deux classes</strong> au DPE, avec des aides croissantes selon le nombre de classes gagnées.</li>
<li><strong>Un Accompagnateur Rénov' obligatoire</strong> (structure agréée, indépendante des entreprises de travaux, avec des règles d'incompatibilité), qui accompagne le ménage de l'audit à la fin des travaux : aide à la définition du projet, au choix des entreprises, au plan de financement, au suivi du chantier. Une partie de sa prestation peut être prise en charge.</li>
<li><strong>Des aides proportionnelles aux dépenses</strong>, dans la limite de plafonds, selon la catégorie de revenus.</li>
<li><strong>Un passage préalable</strong> par un conseiller France Rénov' (rendez-vous obligatoire avant le dépôt, selon les règles 2026).</li>
<li><strong>Des conditions récentes de recentrage</strong> : en 2026, le parcours est réservé aux logements les moins performants (classes E, F et G selon les annonces officielles), et l'aide est conditionnée à la sortie des énergies fossiles pour le chauffage dans certaines configurations (par exemple l'exclusion annoncée des maisons conservant un chauffage au gaz après travaux, à compter d'une date à vérifier).</li>
</ul>
<p>Pour le conseiller d'une entreprise de travaux, deux conséquences : il ne peut pas <strong>être</strong> l'Accompagnateur Rénov' de son client, et il doit savoir <strong>travailler avec</strong> lui (répondre à ses demandes de devis détaillés, respecter le scénario de l'audit, transmettre les documents).</p>

<h3>Les scénarios proposés aux Ferrand (données fictives)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th></th><th>Scénario 1 – Étape 1 d'un plan</th><th>Scénario 2 – Rénovation d'ampleur</th></tr>
<tr><td>Travaux</td><td>Combles + PAC air/eau + VMC hygroréglable</td><td>Combles + isolation des murs par l'extérieur + PAC air/eau dimensionnée sur des besoins très réduits + VMC + remplacement de la porte d'entrée et des fenêtres de l'étage</td></tr>
<tr><td>Coût TTC (fictif)</td><td>19 880 €</td><td>≈ 52 000 € (hors prestation de l'Accompagnateur Rénov')</td></tr>
<tr><td>Étiquette visée (à confirmer par l'audit)</td><td>Amélioration de l'étiquette climat ; gain sur l'étiquette énergie à simuler</td><td>F → C (hypothèse de l'audit)</td></tr>
<tr><td>Aides</td><td>Aides par geste estimées (fictif : 9 700 €)</td><td>Aide de la rénovation d'ampleur selon la catégorie et le gain de classes, dans la limite des plafonds (montant à calculer avec le barème en vigueur ; hypothèse de l'exercice : 27 000 €)</td></tr>
<tr><td>Reste à charge (fictif)</td><td>10 180 €</td><td>≈ 25 000 €</td></tr>
<tr><td>Économie estimée</td><td>≈ 1 570 €/an</td><td>≈ 2 000 €/an (besoins de chauffage fortement réduits)</td></tr>
<tr><td>Confort</td><td>Étage nettement amélioré ; murs encore froids au toucher côté nord</td><td>Confort homogène, parois chaudes, confort d'été amélioré</td></tr>
<tr><td>Démarches</td><td>Simples ; chantier d'environ une semaine</td><td>Audit, Accompagnateur Rénov', déclaration préalable pour l'ITE, chantier de plusieurs semaines</td></tr>
<tr><td>Financement</td><td>Épargne + éventuel petit éco-PTZ</td><td>Éco-PTZ plus important, éventuellement prêt avance mutation</td></tr>
</table>

<h3>Aider le client à choisir</h3>
<ol>
<li><strong>Revenir aux priorités</strong> : pour les Ferrand, le confort à l'étage est la priorité ; les deux scénarios y répondent, le second plus complètement.</li>
<li><strong>Comparer l'effort</strong> : reste à charge, effort mensuel, durée et lourdeur du chantier.</li>
<li><strong>Éviter les travaux verrous</strong> : si le scénario 1 est retenu, prévoir dès maintenant une PAC compatible avec une future baisse des besoins (plage de modulation), et des combles traités de façon compatible avec une future isolation des murs.</li>
<li><strong>Être transparent sur l'avenir des aides</strong> : les dispositifs évoluent ; le conseiller présente les règles en vigueur, sans prédire leur évolution ni s'en servir comme moyen de pression.</li>
<li><strong>Recommander</strong> : Karim recommande le scénario 2 si les Ferrand acceptent la durée des démarches et le financement, en les orientant vers un Accompagnateur Rénov' ; à défaut, le scénario 1, conçu comme la première étape d'un plan.</li>
</ol>

<h3>Les scénarios en copropriété et en tertiaire</h3>
<ul>
<li><strong>Copropriété</strong> : on raisonne en programme de travaux collectifs (souvent issu du PPT ou d'un audit), avec des aides collectives et des quotes-parts par lot. Le conseiller doit fournir une présentation par lot (« pour un T3 de 68 m², la quote-part estimée est de… ») : c'est l'information qui fait voter.</li>
<li><strong>Tertiaire</strong> : on construit une trajectoire vers 2030, 2040 et 2050, en combinant actions immédiates à faible coût (régulation, programmation, éclairage) et investissements lourds (isolation, production de chaleur), avec un tableau de contribution de chaque action à l'objectif.</li>
</ul>

<blockquote><strong>À retenir.</strong> On distingue travaux par geste, bouquets par étapes et rénovation d'ampleur. Le parcours accompagné repose sur un audit, un gain d'au moins deux classes, un Accompagnateur Rénov' indépendant obligatoire et des aides proportionnelles aux dépenses sous plafonds ; ses conditions (classes éligibles, sortie des énergies fossiles, rendez-vous France Rénov') ont été resserrées en 2026 et se vérifient à chaque projet. Le conseiller présente des scénarios comparables, évite les travaux verrous et assume une recommandation fondée sur les priorités du client.</blockquote>
`,
      },
      {
        title: "4.6 – Le devis conforme : mentions obligatoires, RGE, aides et garanties",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Connaître les mentions qu'un devis de travaux de rénovation énergétique doit comporter, au titre du droit commun, du code de la consommation, des assurances et des dispositifs d'aide.</li>
<li>Présenter correctement les aides et le reste à charge sur un devis.</li>
<li>Expliquer au client les garanties légales attachées aux travaux.</li>
</ul>

<h3>Pourquoi le devis est-il si important ?</h3>
<p>Le devis est à la fois un <strong>document commercial</strong> (il doit être clair et convaincant), un <strong>document contractuel</strong> (une fois signé, il engage les deux parties sur le prix et le contenu des travaux), une <strong>pièce justificative</strong> des dossiers d'aide (un devis incomplet fait échouer le dossier) et une <strong>preuve</strong> en cas de litige. Un devis non conforme peut coûter l'aide au client et la confiance à l'entreprise.</p>

<h3>Les mentions générales</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Catégorie</th><th>Mentions</th></tr>
<tr><td>Identification de l'entreprise</td><td>Dénomination, forme juridique, capital, adresse du siège, numéro SIREN et immatriculation (RCS ou registre national des entreprises), numéro de TVA intracommunautaire, coordonnées</td></tr>
<tr><td>Identification du client et du chantier</td><td>Nom, adresse du client, adresse du lieu des travaux si différente</td></tr>
<tr><td>Dates</td><td>Date d'établissement du devis, durée de validité de l'offre, date de la visite préalable lorsque le dispositif d'aide l'exige</td></tr>
<tr><td>Description des travaux</td><td>Nature et localisation précise des travaux, quantités (m², nombre d'appareils), prix unitaires, marques et références des équipements et matériaux, caractéristiques de performance (résistance thermique R de l'isolant, efficacité énergétique saisonnière et puissance de la PAC, etc.), surfaces isolées</td></tr>
<tr><td>Décomposition du prix</td><td>Distinction de la fourniture et de la main-d'œuvre, frais de déplacement, dépose et évacuation de l'ancien équipement, prestations annexes (neutralisation de cuve, mise en service)</td></tr>
<tr><td>Déchets de chantier</td><td>Depuis la loi n° 2020-105 du 10 février 2020 relative à la lutte contre le gaspillage et à l'économie circulaire (loi AGEC), le devis de travaux de construction, de rénovation ou de démolition doit mentionner l'estimation de la quantité de déchets, leurs modalités de gestion et d'enlèvement, les points de collecte prévus et les coûts associés</td></tr>
<tr><td>Prix et TVA</td><td>Montants HT, taux de TVA applicable (5,5 %, 10 % ou 20 % selon la nature des travaux et du logement), montant TTC ; pour le taux réduit, le justificatif exigé par l'administration fiscale (règles et formalisme à vérifier sur impots.gouv.fr)</td></tr>
<tr><td>Conditions</td><td>Délai d'exécution ou date de début et de fin des travaux, modalités de paiement (acomptes, échéancier), conditions de révision éventuelle</td></tr>
<tr><td>Informations consommateur</td><td>Informations précontractuelles du code de la consommation (caractéristiques essentielles, prix, délai, garanties, coordonnées du médiateur de la consommation) ; pour un contrat conclu hors établissement, informations sur le droit de rétractation et formulaire type (traité au chapitre consacré à la conclusion)</td></tr>
<tr><td>Signature</td><td>Mention manuscrite ou électronique d'acceptation (« Bon pour accord »), date et signature du client</td></tr>
</table>

<h3>Les mentions liées à la qualification RGE et aux aides</h3>
<ul>
<li><strong>Qualification RGE</strong> : numéro de qualification ou de certificat, nom de l'organisme qualificateur, <strong>domaine de travaux</strong> concerné (une qualification pour les pompes à chaleur ne couvre pas l'isolation des combles) et date de validité. On vérifie que la qualification couvre chaque poste du devis, y compris pour un éventuel sous-traitant, dont l'identité et la qualification doivent alors apparaître.</li>
<li><strong>Caractéristiques techniques exigées</strong> par chaque aide (seuils de performance), reprises précisément pour permettre l'instruction.</li>
<li><strong>Date de la visite préalable</strong> lorsque le dispositif l'exige.</li>
<li><strong>Certificats d'économies d'énergie</strong> : la prime doit avoir un rôle « actif et incitatif » ; l'engagement de l'obligé ou de son délégataire (proposition de prime) doit intervenir et être accepté avant la signature du devis. Le devis ou un document associé fait apparaître la contribution et son montant, selon le cadre prévu par la réglementation des CEE.</li>
<li><strong>Présentation des aides</strong> : sur le devis ou dans le plan de financement joint, on fait apparaître clairement le montant TTC, chaque aide <strong>estimée</strong> (avec son nom et la mention « sous réserve d'éligibilité et d'acceptation du dossier ») et le reste à charge estimé. Lorsque l'entreprise est mandataire pour percevoir une aide, ou en fait l'avance, le mandat et ses conséquences doivent être explicites.</li>
</ul>
<blockquote><strong>Exemple de présentation (Ferrand, scénario 1, montants fictifs).</strong><br>Total TTC : 19 880 €<br>Aide MaPrimeRénov' estimée (sous réserve d'éligibilité et d'accord de l'Anah) : 6 500 €<br>Prime CEE proposée par [nom de l'obligé ou délégataire], selon offre acceptée le [date] : 3 200 €<br>Reste à charge estimé : 10 180 €<br><em>Les aides ne sont définitivement acquises qu'après instruction et versement par les organismes concernés.</em></blockquote>

<h3>L'assurance et les garanties</h3>
<h4>L'assurance décennale sur le devis</h4>
<p>Les entrepreneurs soumis à l'obligation d'assurance de responsabilité décennale doivent indiquer sur leurs devis et factures l'assurance souscrite au titre de leur activité, les coordonnées de l'assureur et la couverture géographique du contrat (article 22-2 de la loi n° 96-603 du 5 juillet 1996, issu de la loi du 18 juin 2014), et l'attestation d'assurance doit être jointe aux devis et factures (article L. 243-2 du code des assurances). Le client peut ainsi vérifier que les travaux réalisés sont bien couverts.</p>
<h4>Les garanties légales à expliquer au client</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Garantie</th><th>Durée (à compter de la réception)</th><th>Ce qu'elle couvre</th><th>Fondement</th></tr>
<tr><td>Garantie de parfait achèvement</td><td>1 an</td><td>Réparation de tous les désordres signalés à la réception (réserves) ou notifiés dans l'année</td><td>Article 1792-6 du code civil</td></tr>
<tr><td>Garantie biennale de bon fonctionnement</td><td>2 ans minimum</td><td>Éléments d'équipement dissociables de l'ouvrage (pouvant être démontés sans détériorer l'ouvrage)</td><td>Article 1792-3 du code civil</td></tr>
<tr><td>Garantie décennale</td><td>10 ans</td><td>Dommages compromettant la solidité de l'ouvrage ou le rendant impropre à sa destination, y compris ceux affectant un élément d'équipement indissociable</td><td>Articles 1792 et 2270 (désormais 1792-4-1) du code civil</td></tr>
</table>
<p>S'y ajoutent les <strong>garanties commerciales</strong> des fabricants (pièces, compresseur…), souvent conditionnées à l'entretien par un professionnel, et le <strong>contrat d'entretien</strong> proposé par l'entreprise. La question de savoir si un équipement (une PAC, par exemple) relève de la garantie biennale ou décennale dépend de la nature du désordre et de l'ouvrage, et a donné lieu à une jurisprudence évolutive : le conseiller s'abstient d'affirmations catégoriques et renvoie aux attestations d'assurance.</p>

<h3>Check-list de contrôle avant remise du devis</h3>
<ul>
<li>Toutes les mentions générales sont présentes et exactes.</li>
<li>La qualification RGE couvre chaque domaine de travaux et est en cours de validité.</li>
<li>Les caractéristiques techniques satisfont les seuils de l'aide visée (vérifiés dans les textes en vigueur).</li>
<li>La date de la visite préalable figure, si elle est exigée.</li>
<li>L'offre CEE a été acceptée par le client <strong>avant</strong> la signature prévue du devis.</li>
<li>Les aides sont présentées comme estimées, avec leur source, et le reste à charge est lisible.</li>
<li>L'attestation d'assurance décennale est jointe et la mention d'assurance figure sur le devis.</li>
<li>Les déchets de chantier sont traités conformément à la loi AGEC.</li>
<li>Le taux de TVA est justifié.</li>
<li>Les informations précontractuelles et, si le contrat est conclu hors établissement, les informations sur la rétractation et le formulaire type sont joints.</li>
</ul>

<blockquote><strong>À retenir.</strong> Un devis conforme identifie l'entreprise, le client et le chantier, décrit précisément les travaux avec quantités, prix unitaires, marques, références et performances, distingue fourniture et main-d'œuvre, traite les déchets (loi AGEC), précise TVA, délais et paiement, comporte la qualification RGE par domaine, la date de visite préalable si elle est exigée, les aides estimées et le reste à charge, la mention d'assurance décennale et l'attestation jointe. Le conseiller sait expliquer les garanties de parfait achèvement (1 an), de bon fonctionnement (2 ans) et décennale (10 ans).</blockquote>
`,
      },
      {
        title: "4.7 – Présenter la proposition et utiliser les supports d'aide à la vente",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Préparer et conduire le rendez-vous de présentation de la proposition.</li>
<li>Choisir et utiliser des supports d'aide à la vente honnêtes et efficaces.</li>
<li>Recueillir les réactions du client et préparer la suite (objections, décision).</li>
</ul>

<h3>Présenter plutôt qu'envoyer</h3>
<p>Une proposition de travaux énergétiques envoyée par courriel sans explication est souvent mal comprise : le client regarde le total TTC, le compare à un autre devis moins détaillé et décide sur le prix. Présenter la proposition en face à face (ou en visioconférence, écran partagé) permet de reconstruire le raisonnement, de répondre aux questions et de vérifier l'adhésion. La proposition écrite est remise <strong>à la fin</strong> de la présentation, ou envoyée juste après, pour que le client puisse la relire tranquillement.</p>

<h3>Le déroulé d'un rendez-vous de présentation (environ 1 heure)</h3>
<ol>
<li><strong>Accueil et cadrage</strong> (5 min) : rappel de l'objectif du rendez-vous, du déroulé et de la durée ; vérification que tous les décideurs sont présents.</li>
<li><strong>Rappel du projet</strong> (5 min) : synthèse de la découverte, avec les mots du client ; question de contrôle (« Est-ce toujours d'actualité ? Quelque chose a-t-il changé ? »).</li>
<li><strong>Diagnostic</strong> (10 min) : photos de la visite, déperditions du DPE, constats ; on fait réagir le client.</li>
<li><strong>Scénarios</strong> (15 min) : présentation de chaque scénario selon la méthode BAC, bénéfices dans l'ordre des motivations du client.</li>
<li><strong>Budget</strong> (10 min) : plan de financement, aides estimées et sources, reste à charge, économies estimées, temps de retour, sensibilité, effort mensuel.</li>
<li><strong>Garanties et déroulement</strong> (5 min) : qualification RGE, assurance, garanties, entretien, calendrier, démarches d'aides et chronologie à respecter.</li>
<li><strong>Recommandation</strong> (5 min) : le scénario recommandé et pourquoi.</li>
<li><strong>Recueil des réactions et suite</strong> (5 min) : « Qu'en pensez-vous ? », « Qu'est-ce qui vous plaît, qu'est-ce qui vous fait hésiter ? » ; remise de la proposition ; accord sur la prochaine étape (délai de réflexion, offre CEE à accepter, rendez-vous avec l'Accompagnateur Rénov', nouveau point).</li>
</ol>
<p>Les objections qui apparaissent à cette étape (« c'est cher », « on a un devis moins cher », « et si les aides ne viennent pas ? ») sont traitées selon les méthodes vues au chapitre consacré à la négociation. À ce stade, on les <strong>accueille</strong> et on les <strong>note</strong> : elles sont des signaux d'intérêt.</p>

<h3>La règle des trois scénarios</h3>
<p>Présenter deux ou trois scénarios plutôt qu'une seule offre transforme la question « oui ou non ? » en « lequel ? ». Pour que ce choix soit loyal :</p>
<ul>
<li>chaque scénario doit être <strong>techniquement cohérent</strong> et réellement réalisable ;</li>
<li>le scénario le plus simple ne doit pas être volontairement dégradé pour faire paraître les autres plus attractifs ;</li>
<li>le conseiller explique les différences de manière comparable (même présentation, mêmes hypothèses).</li>
</ul>

<h3>Les supports d'aide à la vente</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Support</th><th>Usage</th><th>Bonnes pratiques</th></tr>
<tr><td>Proposition commerciale personnalisée (document de 6 à 12 pages + devis)</td><td>Support principal de la présentation et de la décision</td><td>Structure de la section 4.1 ; photos du logement ; aucune page générique non adaptée ; hypothèses explicites</td></tr>
<tr><td>Plaquette de l'entreprise</td><td>Présenter l'entreprise, ses métiers, ses références</td><td>Informations vérifiables (qualifications, ancienneté, effectif) ; pas de logos d'organismes publics laissant croire à un partenariat</td></tr>
<tr><td>Fiches solutions</td><td>Expliquer simplement une technologie (PAC, isolation, chauffe-eau thermodynamique, photovoltaïque)</td><td>Schémas clairs, avantages et limites, entretien</td></tr>
<tr><td>Simulateur de chiffrage (tableur ou logiciel)</td><td>Calculer économies, reste à charge et temps de retour devant le client</td><td>Hypothèses visibles et modifiables ; source des prix de l'énergie ; barèmes d'aides tenus à jour ou renvoi au simulateur officiel</td></tr>
<tr><td>Images thermiques</td><td>Montrer les déperditions</td><td>Réalisées en saison de chauffe, avec un écart de température suffisant ; interprétation prudente</td></tr>
<tr><td>Échantillons, maquettes, matériels de démonstration</td><td>Rendre concret (isolant, coupe de mur, régulation)</td><td>Propres, représentatifs du produit réellement posé</td></tr>
<tr><td>Témoignages et références</td><td>Preuve sociale</td><td>Avec l'accord écrit des clients ; avis authentiques ; possibilité de visiter une installation</td></tr>
<tr><td>Liens vers les sources officielles</td><td>Crédibiliser les informations sur les aides et la réglementation</td><td>france-renov.gouv.fr, service-public.fr, ADEME ; le client peut vérifier lui-même</td></tr>
<tr><td>Tablette et application de visite</td><td>Fiche de découverte, photos, relevés, signature électronique</td><td>Ne pas laisser l'écran prendre le dessus sur la relation ; respect du RGPD pour les données collectées</td></tr>
</table>

<h3>Les supports en B2B</h3>
<ul>
<li><strong>Note de synthèse</strong> d'une à deux pages pour le décideur (gérant, conseil syndical), en tête du dossier : enjeu, scénarios, budget, gains, recommandation.</li>
<li><strong>Trajectoire réglementaire</strong> : graphique ou tableau montrant la consommation de référence, la situation actuelle, l'effet de chaque action et les objectifs 2030, 2040 et 2050.</li>
<li><strong>Projet de résolution</strong> et note explicative pour l'assemblée générale d'une copropriété, avec quotes-parts par lot (en lien avec le syndic, qui reste maître de la convocation).</li>
<li><strong>Planning de chantier</strong> compatible avec l'occupation (travaux en site occupé, horaires, sécurité).</li>
</ul>

<h3>Après la présentation</h3>
<ul>
<li>Envoyer dans la journée un courriel récapitulatif : proposition en pièce jointe, réponses aux questions posées, prochaines étapes, date de validité de l'offre.</li>
<li>Respecter le délai de réflexion demandé par le client ; convenir d'un point à une date précise plutôt que de relancer au hasard.</li>
<li>Tenir la fiche client à jour dans le logiciel de gestion de la relation client : réactions, objections, probabilité, prochaine action.</li>
<li>Ne jamais exercer de pression (« l'offre expire ce soir », « il ne reste qu'une PAC en stock ») : outre le risque juridique, c'est contraire à l'image de sérieux que l'entreprise doit construire.</li>
</ul>

<blockquote><strong>À retenir.</strong> On présente la proposition plutôt que de l'envoyer : rappel du projet, diagnostic, scénarios en méthode BAC, budget transparent, garanties, recommandation, recueil des réactions et prochaine étape. Deux ou trois scénarios cohérents et comparables permettent un choix loyal. Les supports (proposition personnalisée, fiches solutions, simulateur aux hypothèses visibles, images thermiques, références authentiques, liens vers les sources officielles) servent la compréhension du client et ne doivent jamais suggérer un partenariat public inexistant. En B2B, on ajoute une note de synthèse, une trajectoire réglementaire et des documents prêts pour l'instance de décision.</blockquote>
`,
      },
      {
        title: "4.8 – Quiz de fin de chapitre",
        content: `
<p>Pour chaque question, une seule réponse est correcte. Le corrigé figure après chaque question.</p>

<h4>Question 1 – Dans la méthode BAC, par quoi commence-t-on l'argument ?</h4>
<ol type="A">
<li>La caractéristique technique</li>
<li>Le bénéfice pour le client</li>
<li>La preuve</li>
<li>Le prix</li>
</ol>
<p><strong>Réponse : B.</strong> BAC signifie Bénéfice, Avantage, Caractéristique : on part de ce que la solution apporte au client, puis on explique comment et grâce à quoi.</p>

<h4>Question 2 – Pour quel interlocuteur la méthode CAP est-elle généralement la plus adaptée ?</h4>
<ol type="A">
<li>Un particulier peu technique dont la motivation dominante est le confort</li>
<li>Le responsable technique d'un bâtiment tertiaire</li>
<li>Un enfant du client</li>
<li>Un client pressé qui ne veut connaître que le prix</li>
</ol>
<p><strong>Réponse : B.</strong> La méthode CAP (Caractéristique, Avantage, Preuve) part du produit : elle convient aux interlocuteurs techniques, qui veulent comprendre avant d'être convaincus.</p>

<h4>Question 3 – Le coût TTC d'un projet est de 19 880 €, les aides estimées de 9 700 € et l'économie annuelle estimée de 1 570 €. Quel est le temps de retour brut ?</h4>
<ol type="A">
<li>Environ 2,7 ans</li>
<li>Environ 6,5 ans</li>
<li>Environ 12,7 ans</li>
<li>Environ 19 ans</li>
</ol>
<p><strong>Réponse : B.</strong> Reste à charge : 19 880 − 9 700 = 10 180 € ; 10 180 ÷ 1 570 ≈ 6,5 ans. 12,7 ans correspondrait au calcul sans aides.</p>

<h4>Question 4 – Comment présenter correctement une aide sur un devis ?</h4>
<ol type="A">
<li>« Aide garantie par l'État : 11 000 € »</li>
<li>« Travaux à 1 € »</li>
<li>« Aide estimée, sous réserve d'éligibilité et d'acceptation du dossier », avec le nom de l'aide et le reste à charge estimé</li>
<li>Ne pas en parler du tout</li>
</ol>
<p><strong>Réponse : C.</strong> Aucune entreprise ne peut garantir une aide publique ; on présente un montant estimé, sa source et le reste à charge estimé.</p>

<h4>Question 5 – Pour les certificats d'économies d'énergie, à quel moment l'offre de prime doit-elle être acceptée par le client ?</h4>
<ol type="A">
<li>Après la fin des travaux</li>
<li>Avant la signature du devis, pour respecter le rôle « actif et incitatif » de la prime</li>
<li>Au moment du paiement du solde</li>
<li>À n'importe quel moment dans les deux ans</li>
</ol>
<p><strong>Réponse : B.</strong> L'incitation doit précéder l'engagement de l'opération : l'offre de l'obligé ou de son délégataire est acceptée avant la signature du devis.</p>

<h4>Question 6 – Quelle information relative à l'assurance doit figurer sur le devis d'une entreprise soumise à l'assurance décennale ?</h4>
<ol type="A">
<li>Aucune, l'assurance ne concerne que l'entreprise</li>
<li>L'assurance souscrite, les coordonnées de l'assureur et la couverture géographique du contrat, avec l'attestation jointe</li>
<li>Le montant de la prime d'assurance payée par l'entreprise</li>
<li>Le nom du salarié qui a souscrit le contrat</li>
</ol>
<p><strong>Réponse : B.</strong> Les devis et factures mentionnent l'assurance professionnelle obligatoire, l'assureur et la couverture géographique, et l'attestation d'assurance y est jointe.</p>

<h4>Question 7 – Quelle est la durée de la garantie de parfait achèvement ?</h4>
<ol type="A">
<li>6 mois</li>
<li>1 an à compter de la réception</li>
<li>2 ans à compter de la signature du devis</li>
<li>10 ans</li>
</ol>
<p><strong>Réponse : B.</strong> Article 1792-6 du code civil : un an à compter de la réception. La garantie de bon fonctionnement est d'au moins deux ans, la décennale de dix ans.</p>

<h4>Question 8 – Depuis la loi AGEC, que doit mentionner un devis de travaux de rénovation au sujet des déchets ?</h4>
<ol type="A">
<li>Rien</li>
<li>Uniquement le nom de la déchetterie la plus proche</li>
<li>L'estimation de la quantité de déchets, leurs modalités de gestion et d'enlèvement, les points de collecte prévus et les coûts associés</li>
<li>La composition chimique des matériaux déposés</li>
</ol>
<p><strong>Réponse : C.</strong> La loi n° 2020-105 du 10 février 2020 impose ces mentions sur les devis de travaux de construction, de rénovation et de démolition.</p>

<h4>Question 9 – Quel est le rôle de l'Accompagnateur Rénov' dans une rénovation d'ampleur aidée ?</h4>
<ol type="A">
<li>Il réalise les travaux à la place de l'entreprise</li>
<li>Il accompagne obligatoirement le ménage, de manière indépendante des entreprises de travaux, de l'audit à la fin du chantier</li>
<li>Il fixe le prix des travaux</li>
<li>Il est facultatif et payé par l'entreprise de travaux</li>
</ol>
<p><strong>Réponse : B.</strong> L'accompagnement est obligatoire dans le parcours de rénovation d'ampleur ; l'Accompagnateur Rénov' est agréé et indépendant. L'entreprise de travaux travaille avec lui mais ne peut pas en tenir le rôle pour son propre client.</p>

<h4>Question 10 – Un client hésite entre un scénario par geste et une rénovation d'ampleur. Quelle attitude est la plus professionnelle ?</h4>
<ol type="A">
<li>Dégrader volontairement le scénario par geste pour qu'il choisisse le plus cher</li>
<li>Lui annoncer que les aides vont disparaître le mois prochain pour le presser</li>
<li>Présenter des scénarios cohérents et comparables, revenir à ses priorités et à ses moyens, éviter les travaux verrous et assumer une recommandation argumentée</li>
<li>Le laisser choisir seul sans donner d'avis</li>
</ol>
<p><strong>Réponse : C.</strong> Le conseiller éclaire le choix avec des données comparables et une recommandation justifiée, sans manipulation ni pression.</p>
`,
      },
      {
        title: "4.9 – Cas pratique corrigé : la proposition commerciale pour la SCI Les Tilleuls",
        content: `
<h3>Contexte (fictif)</h3>
<p>La SCI Les Tilleuls possède à Écully (Rhône) un immeuble de bureaux de 1 200 m² de surface de plancher, construit en 1992, sur deux niveaux, loué à trois entreprises occupant les locaux du lundi au vendredi de 8 h à 19 h. Le gérant, M. Royer, a déclaré les consommations sur OPERAT et retenu <strong>2019</strong> comme année de référence. Nadia, directrice commerciale de Thermia Rénov, a conduit la découverte et la visite technique avec le responsable de la société de maintenance. Données (toutes fictives) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Valeur</th></tr>
<tr><td>Consommation d'énergie finale 2019 (référence)</td><td>260 000 kWh (gaz 150 000 ; électricité 110 000)</td></tr>
<tr><td>Consommation 2025</td><td>245 000 kWh (gaz 145 000 ; électricité 100 000, après un remplacement partiel de l'éclairage par des LED)</td></tr>
<tr><td>Chauffage</td><td>Deux chaudières gaz de 2006, rendement saisonnier estimé à 90 % ; régulation sommaire, chauffage les week-ends</td></tr>
<tr><td>Rafraîchissement</td><td>Splits individuels dans certains bureaux</td></tr>
<tr><td>Toiture</td><td>Toiture-terrasse de 400 m², faiblement isolée, étanchéité à refaire d'ici trois ans ; bonne exposition, sans ombrage</td></tr>
<tr><td>Prix supposés des énergies (HT)</td><td>Gaz : 0,09 €/kWh ; électricité : 0,18 €/kWh</td></tr>
<tr><td>Décideurs</td><td>M. Royer (gérant), deux associés, expert-comptable (prescripteur), trois locataires (utilisateurs, charges refacturées selon les baux), société de maintenance (prescripteur technique)</td></tr>
<tr><td>Motivations de M. Royer</td><td>Argent (rentabilité de l'actif), Sécurité (conformité au décret tertiaire, valeur à la revente), Orgueil secondaire (image auprès des locataires)</td></tr>
</table>

<h3>Consigne</h3>
<ol>
<li>Calculez l'objectif de consommation 2030 en valeur relative et l'économie restant à réaliser par rapport à 2025.</li>
<li>Construisez une trajectoire d'actions chiffrée (kWh et euros) avec les hypothèses fournies ci-dessous, et vérifiez qu'elle atteint l'objectif 2030.</li>
<li>Rédigez deux arguments, l'un en méthode BAC pour M. Royer, l'autre en méthode CAP pour la société de maintenance.</li>
<li>Proposez la structure de la proposition commerciale et la liste des pièces à joindre.</li>
<li>Listez les mentions indispensables du devis et les points de vigilance réglementaires.</li>
</ol>
<p>Hypothèses techniques fournies par le bureau d'études de Thermia Rénov (fictives) :</p>
<ul>
<li>Action A – Régulation, programmation (réduit en dehors des heures d'occupation) et gestion technique du bâtiment avec un partenaire spécialisé : −15 % sur le gaz, −8 000 kWh d'électricité (climatisation et ventilation pilotées) ; coût 25 000 € HT.</li>
<li>Action B – Isolation de la toiture-terrasse lors de la réfection de l'étanchéité (400 m²) : −15 % sur le chauffage restant ; coût de l'isolation 38 000 € HT (l'étanchéité, nécessaire de toute façon, n'est pas comptée).</li>
<li>Action C – Remplacement des chaudières gaz par une PAC air/eau de 100 kW, performance saisonnière supposée de 3 : coût 90 000 € HT ; le remplacement des chaudières gaz, en fin de vie, aurait coûté environ 45 000 € HT.</li>
<li>Action D – Photovoltaïque en autoconsommation de 36 kWc en toiture : production estimée 45 000 kWh/an, dont 38 000 kWh autoconsommés (occupation de journée) ; surplus valorisé à 0,05 €/kWh (hypothèse) ; coût 50 000 € HT.</li>
<li>Primes CEE estimées (fictives, à confirmer par une offre écrite d'un obligé) : A 6 000 €, B 9 000 €, C 20 000 €.</li>
</ul>

<h3>Corrigé détaillé</h3>
<h4>1. Objectif 2030</h4>
<p>Objectif en valeur relative : −40 % par rapport à 2019, soit 260 000 × 0,60 = <strong>156 000 kWh</strong> d'énergie finale. Par rapport à 2025 (245 000 kWh), il reste <strong>89 000 kWh</strong> à économiser. Pour mémoire, l'objectif 2040 (−50 %) correspond à 130 000 kWh et l'objectif 2050 (−60 %) à 104 000 kWh. M. Royer pourrait aussi examiner l'objectif en valeur absolue applicable à la catégorie « bureaux » (arrêté en vigueur, valeur à consulter sur OPERAT) et retenir le plus atteignable.</p>

<h4>2. Trajectoire chiffrée</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Gaz (kWh)</th><th>Électricité (kWh)</th><th>Total (kWh)</th><th>Économie annuelle (€ HT)</th></tr>
<tr><td>Situation 2025</td><td>145 000</td><td>100 000</td><td>245 000</td><td>–</td></tr>
<tr><td>Après A (gaz −15 % ; électricité −8 000)</td><td>123 250</td><td>92 000</td><td>215 250</td><td>21 750 × 0,09 + 8 000 × 0,18 ≈ 3 400 €</td></tr>
<tr><td>Après B (chauffage −15 %)</td><td>≈ 104 800</td><td>92 000</td><td>≈ 196 800</td><td>18 450 × 0,09 ≈ 1 660 €</td></tr>
<tr><td>Après C (PAC : besoins utiles 104 800 × 0,90 ≈ 94 300 kWh ; électricité 94 300 ÷ 3 ≈ 31 400 kWh)</td><td>0</td><td>≈ 123 400</td><td>≈ 123 400</td><td>104 800 × 0,09 − 31 400 × 0,18 ≈ 9 430 − 5 650 ≈ 3 780 €</td></tr>
</table>
<p>Avec A, B et C, la consommation d'énergie finale passe à environ 123 400 kWh, soit une réduction d'environ <strong>52,5 %</strong> par rapport à 2019 : l'objectif 2030 (156 000 kWh) est atteint et l'objectif 2040 (130 000 kWh) l'est également selon ces hypothèses. Remarque : avec A et B seules (196 800 kWh), l'objectif 2030 n'est pas atteint ; la sortie du gaz est donc structurante.</p>
<p>Action D (photovoltaïque) : 38 000 kWh autoconsommés × 0,18 + 7 000 kWh de surplus × 0,05 ≈ 6 840 + 350 ≈ <strong>7 190 € par an</strong> de gain. Sa prise en compte dans le calcul réglementaire OPERAT obéit aux règles de l'arrêté « méthode » relatives aux énergies renouvelables produites et autoconsommées sur site : Nadia la présente donc d'abord comme un levier économique, et fait vérifier sa prise en compte réglementaire avant de l'intégrer à la trajectoire.</p>

<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Action</th><th>Coût HT</th><th>Prime CEE estimée (fictive)</th><th>Investissement net</th><th>Économie annuelle</th><th>Temps de retour brut</th></tr>
<tr><td>A – Régulation / GTB</td><td>25 000 €</td><td>6 000 €</td><td>19 000 €</td><td>≈ 3 400 €</td><td>≈ 5,6 ans</td></tr>
<tr><td>B – Isolation toiture-terrasse</td><td>38 000 €</td><td>9 000 €</td><td>29 000 €</td><td>≈ 1 660 €</td><td>≈ 17,5 ans (à relativiser : confort d'été, mutualisation avec la réfection d'étanchéité, valeur de l'actif)</td></tr>
<tr><td>C – PAC (coût différentiel par rapport au remplacement à l'identique : 90 000 − 45 000)</td><td>45 000 € (différentiel)</td><td>20 000 €</td><td>25 000 €</td><td>≈ 3 780 €</td><td>≈ 6,6 ans</td></tr>
<tr><td>D – Photovoltaïque 36 kWc</td><td>50 000 €</td><td>–</td><td>50 000 €</td><td>≈ 7 190 €</td><td>≈ 7 ans (hors éventuelles aides à vérifier)</td></tr>
</table>
<p>Recommandation de phasage : <strong>2027</strong> – A (gain rapide) et B (au moment de la réfection d'étanchéité, ce qui évite de défaire une étanchéité neuve), puis D sur la toiture rénovée ; <strong>2028</strong> – C, au moment où les chaudières arrivent en fin de vie, avec une PAC dimensionnée sur les besoins réduits par A et B. Ce phasage illustre la logique « réduire, puis produire » et sécurise l'objectif 2030 avec une marge.</p>

<h4>3. Arguments</h4>
<blockquote><strong>BAC pour M. Royer.</strong> « Vous sécurisez la conformité de votre immeuble à l'objectif 2030 du décret tertiaire, avec une marge, tout en réduisant les charges de vos locataires d'environ 8 800 € par an à terme hors photovoltaïque, ce qui renforce l'attractivité et la valeur de votre actif (<em>bénéfice</em>). C'est possible parce que nous traitons d'abord les gaspillages et la toiture, puis remplaçons vos chaudières en fin de vie par une pompe à chaleur dimensionnée sur des besoins réduits, ce qui fait baisser votre consommation d'environ 52 % par rapport à 2019 (<em>avantage</em>), grâce à une régulation centralisée, une isolation posée lors de la réfection d'étanchéité déjà prévue et une PAC de 100 kW (<em>caractéristique</em>). Le tableau de trajectoire, calculé sur vos déclarations OPERAT, est en page 4 (<em>preuve</em>). »</blockquote>
<blockquote><strong>CAP pour la société de maintenance.</strong> « La PAC air/eau de 100 kW fonctionne avec une loi d'eau pilotée par la GTB et une température de départ abaissée grâce à l'isolation de la toiture (<em>caractéristique</em>). Elle travaille ainsi dans sa meilleure plage de rendement, avec moins de cycles courts, et la GTB vous remonte les alarmes à distance (<em>avantage</em>). La note de dimensionnement, les courbes de performance du fabricant et le plan d'implantation, compatible avec l'accès de maintenance que vous nous avez indiqué, sont joints (<em>preuve</em>). »</blockquote>

<h4>4. Structure de la proposition et pièces jointes</h4>
<ol>
<li>Note de synthèse (une page) : enjeu réglementaire, trajectoire, investissement net, gains, recommandation de phasage.</li>
<li>Votre situation : surfaces, occupation, consommations 2019 et 2025, objectifs 2030-2040-2050.</li>
<li>Diagnostic : constats de la visite, photos, répartition des consommations.</li>
<li>Plan d'actions A à D : description, performances, effets en kWh et en euros.</li>
<li>Trajectoire réglementaire : tableau et graphique.</li>
<li>Budget : coûts, primes CEE estimées et conditions (offre à accepter avant signature), investissement net, temps de retour, sensibilité aux prix de l'énergie.</li>
<li>Organisation des travaux en site occupé : phasage, horaires, sécurité, information des locataires.</li>
<li>Garanties, maintenance, suivi des consommations et accompagnement pour les déclarations OPERAT.</li>
<li>Recommandation et prochaines étapes : présentation aux associés, échange avec l'expert-comptable, information des locataires (répartition des charges et travaux selon les baux), calendrier.</li>
</ol>
<p>Pièces jointes : devis détaillés par action, attestations de qualification (RGE et autres qualifications pertinentes, y compris celles du partenaire GTB), attestation d'assurance décennale, fiches techniques, note de dimensionnement, simulation de production photovoltaïque (outil PVGIS ou logiciel du fabricant), références de chantiers tertiaires comparables.</p>

<h4>5. Mentions du devis et vigilance réglementaire</h4>
<ul>
<li>Mentions générales (identification, description détaillée avec marques, références et performances, quantités, prix unitaires, fourniture et main-d'œuvre distinguées, gestion des déchets selon la loi AGEC, HT/TVA/TTC, délais, conditions de paiement, validité).</li>
<li>Mention de l'assurance décennale et attestation jointe ; qualification par domaine pour chaque lot, y compris pour le partenaire GTB s'il intervient en sous-traitance.</li>
<li>Primes CEE : offre de l'obligé ou du délégataire acceptée avant la signature de chaque devis ; respect des exigences des fiches d'opérations standardisées tertiaires applicables (à identifier pour chaque action).</li>
<li>Démarches d'urbanisme : déclaration préalable pour le photovoltaïque et, le cas échéant, pour l'unité extérieure de la PAC ; démarches de raccordement.</li>
<li>Vérification de l'obligation d'installer un système d'automatisation et de contrôle (décret BACS) selon la puissance des installations après travaux, seuils et échéances à confirmer sur legifrance.gouv.fr.</li>
<li>Rappel : les règles de protection du consommateur (contrat hors établissement, rétractation) ne s'appliquent en principe pas à une SCI agissant pour les besoins de son activité ; les conditions particulières du contrat sont négociées entre professionnels.</li>
</ul>

<h4>Points de vigilance relevés lors de la correction</h4>
<ul>
<li>Un objectif calculé par rapport à 2025 au lieu de l'année de référence 2019.</li>
<li>Un photovoltaïque intégré sans vérification dans la trajectoire réglementaire.</li>
<li>Une isolation de toiture proposée indépendamment de la réfection d'étanchéité, ce qui obligerait à refaire les travaux.</li>
<li>Une PAC dimensionnée sur les besoins actuels, sans tenir compte des actions A et B.</li>
<li>Des primes CEE présentées comme acquises.</li>
<li>L'oubli des locataires (répartition des charges et des travaux selon les baux, continuité d'activité).</li>
</ul>

<blockquote><strong>À retenir.</strong> Pour un client tertiaire, la proposition part de l'objectif réglementaire (−40 % en 2030 par rapport à l'année de référence), construit une trajectoire d'actions chiffrée en kWh et en euros, phase les travaux selon la logique « réduire, puis produire » et les échéances techniques (étanchéité, fin de vie des chaudières), adapte les arguments à chaque décideur (BAC pour le gérant, CAP pour le technicien) et s'appuie sur des devis conformes et des aides présentées comme estimées. Tous les chiffres de ce cas sont fictifs.</blockquote>
`,
      },
    ],
  },
];
