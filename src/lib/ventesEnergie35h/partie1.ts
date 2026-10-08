import type { CourseChapter } from "../courseContent";

export const TVTE_PARTIE1: CourseChapter[] = [
  {
    title: "Chapitre 1 – Le marché des travaux énergétiques, ses solutions techniques et l'organisation de la formation",
    description: "Découvrir l'organisation des cinq jours de formation en présentiel, les objectifs et les modalités d'évaluation interne, puis comprendre les enjeux de la transition énergétique, le diagnostic de performance énergétique et l'audit énergétique, les principaux gestes techniques de rénovation expliqués pour un commercial, le label RGE et l'entreprise fictive Thermia Rénov qui sert de fil rouge à tout le support.",
    sections: [
      {
        title: "1.1 – Organisation de la formation, objectifs et modalités d'évaluation",
        content: `
<h3>La formation en bref</h3>
<p>La formation « Techniques de vente dans le secteur des travaux énergétiques » s'adresse aux personnes qui vendent, conseillent ou chiffrent des travaux de rénovation énergétique : commerciaux, conseillers en rénovation énergétique, technico-commerciaux, chargés d'affaires et assistants commerciaux d'entreprises du bâtiment et du génie climatique. Elle a un objectif simple : vous rendre capable de <strong>vendre mieux et plus honnêtement</strong> des travaux qui engagent fortement le client, sur un marché très réglementé et marqué par des pratiques frauduleuses qu'il faut savoir reconnaître et dont il faut se démarquer.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Contenu</th></tr>
<tr><td>Intitulé</td><td>Techniques de vente dans le secteur des travaux énergétiques</td></tr>
<tr><td>Nature</td><td>Action de formation professionnelle continue, <strong>non certifiante</strong> (elle ne prépare à aucun diplôme, titre ou certificat enregistré)</td></tr>
<tr><td>Public visé</td><td>Salariés d'entreprises de travaux énergétiques en contact avec la clientèle : commerciaux, conseillers en rénovation énergétique, technico-commerciaux</td></tr>
<tr><td>Prérequis</td><td>Maîtriser la lecture et l'écriture du français ; une première expérience de la relation client est un atout mais n'est pas exigée</td></tr>
<tr><td>Durée</td><td>35 heures, soit 5 jours de 7 heures</td></tr>
<tr><td>Modalité</td><td>Présentiel, en salle (dans les locaux de l'organisme ou de l'entreprise cliente) ; émargement papier par demi-journée</td></tr>
<tr><td>Financement habituel</td><td>Plan de développement des compétences de l'entreprise employeur, avec prise en charge possible par son opérateur de compétences (OPCO) selon ses critères</td></tr>
<tr><td>Fil rouge</td><td>Thermia Rénov, entreprise fictive de rénovation énergétique présentée en section 1.7</td></tr>
<tr><td>Document remis</td><td>Attestation de fin de formation</td></tr>
</table>
<h3>Les objectifs de la formation</h3>
<p>À l'issue des cinq jours, vous serez capable de :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Compétence</th><th>Intitulé</th><th>Ce que vous saurez faire concrètement</th></tr>
<tr><td>C1</td><td>Situer l'offre de travaux énergétiques dans son cadre technique et réglementaire</td><td>Expliquer simplement un DPE, un audit énergétique et les principaux gestes de travaux ; présenter les aides financières sans promettre de montants invérifiables ; respecter les règles de la vente à domicile et l'interdiction du démarchage téléphonique.</td></tr>
<tr><td>C2</td><td>Identifier les besoins et attentes des clients particuliers et professionnels</td><td>Conduire un entretien de découverte, pratiquer l'écoute active, repérer les motivations d'achat (méthode SONCAS), réaliser ou préparer une visite technique, tenir compte du type de logement ou de bâtiment tertiaire.</td></tr>
<tr><td>C3</td><td>Élaborer un argumentaire et une proposition commerciale adaptée</td><td>Construire un argumentaire CAP / BAC, chiffrer un reste à charge et un temps de retour prudents, établir un devis conforme.</td></tr>
<tr><td>C4</td><td>Négocier et traiter les objections</td><td>Répondre aux objections sur le prix, la confiance, les délais, les aides et la technique avec des méthodes structurées.</td></tr>
<tr><td>C5</td><td>Prospecter et développer un portefeuille client dans le respect de la réglementation</td><td>Développer des prescripteurs, des partenariats, la recommandation et la présence en ligne, sans recourir au démarchage téléphonique interdit dans ce secteur.</td></tr>
<tr><td>C6</td><td>Conclure la vente et fidéliser</td><td>Conclure sans pression, faire signer un contrat conforme (contrat hors établissement, droit de rétractation), suivre le chantier, la réception et la satisfaction, susciter la recommandation.</td></tr>
</table>
<h3>Le déroulé des cinq jours</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Jour</th><th>Matin (3 h 30)</th><th>Après-midi (3 h 30)</th><th>Compétences travaillées</th></tr>
<tr><td>Jour 1</td><td>Accueil, présentation des objectifs, QCM de positionnement ; marché et enjeux de la rénovation énergétique ; DPE, audit, gestes techniques</td><td>Aides financières, cadre juridique de la vente, éthique ; quiz et cas pratique Thermia Rénov</td><td>C1</td></tr>
<tr><td>Jour 2</td><td>Les attentes des clients particuliers et professionnels ; écoute active, questionnement, SONCAS</td><td>Visite technique, typologies de logements et de bâtiments tertiaires, décret tertiaire ; jeux de rôle de découverte</td><td>C2</td></tr>
<tr><td>Jour 3</td><td>Argumentation CAP / BAC, bénéfices économiques et écologiques</td><td>Chiffrage du reste à charge, temps de retour, devis conforme ; présentation d'une proposition en jeu de rôle</td><td>C3</td></tr>
<tr><td>Jour 4</td><td>Négociation et traitement des objections (méthodes ACCEPT, CRAC, reformulation)</td><td>Prospection conforme : prescripteurs, partenariats, salons, parrainage, réseaux sociaux, RGPD</td><td>C4 et C5</td></tr>
<tr><td>Jour 5</td><td>Conclusion de la vente, signature conforme, suivi de chantier et fidélisation</td><td>Évaluation finale (mise en situation complète et QCM), coaching personnalisé, bilan de la formation</td><td>C6 et synthèse</td></tr>
</table>
<p>Les horaires précis (par exemple 9 h – 12 h 30 et 13 h 30 – 17 h) figurent sur la convocation. Vous signez la feuille d'émargement <strong>à chaque demi-journée</strong> : c'est la preuve de votre présence, exigée par l'organisme, par votre employeur et, le cas échéant, par l'OPCO qui finance la formation.</p>
<h3>Les modalités d'évaluation : une évaluation interne, sans certification</h3>
<p>Cette formation n'est <strong>pas certifiante</strong> : elle ne donne lieu à aucun examen officiel et à aucun diplôme. L'organisme évalue néanmoins vos acquis tout au long du parcours, pour deux raisons : vous permettre de mesurer vos progrès et adapter l'accompagnement du formateur, et pouvoir indiquer sur l'attestation de fin de formation les résultats de l'évaluation des acquis, comme le prévoit l'article L. 6353-1 du code du travail.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Moment</th><th>Outil</th><th>Objectif</th></tr>
<tr><td>Avant ou au début du jour 1</td><td>Questionnaire d'analyse des besoins et <strong>QCM de positionnement</strong></td><td>Connaître votre expérience, vos attentes et votre niveau de départ sur les six compétences ; adapter les exemples et les jeux de rôle.</td></tr>
<tr><td>Pendant chaque journée</td><td><strong>Mises en situation</strong> (jeux de rôle commercial / client), études de cas Thermia Rénov, exercices de calcul</td><td>Vérifier que vous savez appliquer les méthodes, pas seulement les réciter ; le formateur donne un retour individualisé.</td></tr>
<tr><td>À la fin de chaque compétence</td><td><strong>QCM par compétence</strong> et quiz corrigés du support</td><td>Contrôler les connaissances indispensables (réglementation, technique, méthodes).</td></tr>
<tr><td>Jour 5</td><td><strong>Évaluation finale</strong> : mise en situation de vente complète (de la découverte à la conclusion) observée avec une grille, et QCM de fin de formation</td><td>Mesurer l'atteinte des objectifs et comparer avec le positionnement de départ.</td></tr>
<tr><td>Fin de formation</td><td>Questionnaire de satisfaction à chaud ; questionnaire à froid quelques semaines plus tard</td><td>Améliorer la formation ; mesurer la mise en pratique dans votre entreprise.</td></tr>
</table>
<p>À la fin du parcours, une <strong>attestation de fin de formation</strong> vous est remise. Elle précise les objectifs, la nature et la durée de l'action ainsi que les résultats de l'évaluation des acquis. Ce n'est pas un diplôme : c'est la preuve que vous avez suivi la formation et le reflet de ce que vous avez démontré pendant les évaluations.</p>
<h3>Comment utiliser ce support</h3>
<p>Ce support est volontairement plus détaillé que les séances : il sert de référence pendant la formation et, surtout, après, lorsque vous serez face à un client. Chaque chapitre se termine par un <strong>quiz corrigé</strong> et un <strong>cas pratique corrigé</strong> tiré du fil rouge Thermia Rénov. Les règles des aides financières évoluent souvent, parfois plusieurs fois par an : le support donne les principes stables et vous indique où vérifier les barèmes en vigueur. Prenez l'habitude de noter la date de chaque vérification.</p>
<blockquote><strong>Bonne pratique :</strong> tenez pendant les cinq jours un « carnet de terrain » avec trois colonnes : ce que je fais déjà bien, ce que je vais changer dès lundi, ce que je dois vérifier dans mon entreprise (procédure, document, outil). Il nourrira le coaching personnalisé du jour 5.</blockquote>
<h3>Les règles du jeu en salle</h3>
<ul>
<li><strong>Confidentialité</strong> : les situations clients évoquées en formation restent dans la salle ; anonymisez les noms et adresses.</li>
<li><strong>Droit à l'erreur</strong> : les jeux de rôle servent à se tromper sans conséquence. Mieux vaut rater une conclusion devant le groupe que devant M. et Mme Ferrand.</li>
<li><strong>Exactitude</strong> : en cas de doute sur une règle, on note la question et on vérifie à la source officielle plutôt que de répéter une rumeur du terrain.</li>
<li><strong>Ponctualité et émargement</strong> : une demi-journée non signée est une demi-journée qui n'existe pas pour le financeur.</li>
</ul>
<blockquote><strong>À retenir</strong><br />Formation de 35 heures en présentiel sur cinq jours, organisée autour de six compétences (C1 à C6). Évaluation interne continue : positionnement, mises en situation, QCM par compétence, évaluation finale. Formation non certifiante : une attestation de fin de formation mentionnant les résultats de l'évaluation des acquis vous est remise.</blockquote>
`,
      },
      {
        title: "1.2 – Les enjeux de la transition énergétique et le marché de la rénovation",
        content: `
<h3>Pourquoi la rénovation énergétique est devenue une priorité nationale</h3>
<p>Le bâtiment (logements et bureaux, commerces, écoles, hôpitaux…) est l'un des tout premiers postes de consommation d'énergie en France : les publications de l'ADEME et du ministère chargé de l'énergie le situent régulièrement autour de 45 % de l'énergie finale consommée, et il représente une part importante des émissions de gaz à effet de serre, principalement à cause du chauffage au fioul et au gaz. <em>Ces ordres de grandeur sont à actualiser avec la dernière édition des chiffres clés de l'énergie publiée par le ministère avant toute utilisation devant un client.</em></p>
<p>La France s'est fixé l'objectif de la <strong>neutralité carbone en 2050</strong>, décliné dans la Stratégie nationale bas-carbone (SNBC). Pour le bâtiment, cela suppose deux mouvements simultanés :</p>
<ul>
<li><strong>Consommer moins</strong> : mieux isoler l'enveloppe (toiture, murs, planchers, menuiseries), mieux ventiler, mieux réguler ;</li>
<li><strong>Consommer mieux</strong> : remplacer les chaudières au fioul et, progressivement, au gaz par des équipements utilisant des énergies renouvelables ou de récupération (pompes à chaleur, solaire, bois performant, réseaux de chaleur).</li>
</ul>
<h3>Les grands textes qui structurent le marché</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Texte</th><th>Ce qu'il change pour vos clients</th></tr>
<tr><td>Loi n° 2015-992 du 17 août 2015 relative à la transition énergétique pour la croissance verte</td><td>Fixe des objectifs de réduction de la consommation et de rénovation du parc ; pose le principe d'un parc rénové aux normes « bâtiment basse consommation » à l'horizon 2050.</td></tr>
<tr><td>Loi n° 2018-1021 du 23 novembre 2018 (loi ÉLAN) et décret n° 2019-771 du 23 juillet 2019, dit « décret tertiaire »</td><td>Impose aux bâtiments tertiaires d'au moins 1 000 m² une réduction progressive de leur consommation (objectifs de -40 % en 2030, -50 % en 2040 et -60 % en 2050 par rapport à une année de référence), avec déclaration annuelle sur la plateforme OPERAT de l'ADEME.</td></tr>
<tr><td>Loi n° 2021-1104 du 22 août 2021, dite « Climat et résilience »</td><td>Rend le DPE pleinement opposable, intègre la performance énergétique dans la définition du logement décent avec un calendrier d'interdiction progressive de location des logements les plus énergivores, gèle les loyers des logements classés F et G, crée l'audit énergétique réglementaire lors de la vente de certaines maisons et immeubles.</td></tr>
<tr><td>Loi n° 2020-901 du 24 juillet 2020 et loi n° 2025-594 du 30 juin 2025 contre toutes les fraudes aux aides publiques</td><td>Encadrent strictement la prospection commerciale dans le secteur (interdiction du démarchage téléphonique, puis par SMS, courriel et réseaux sociaux) et renforcent la lutte contre la fraude aux aides. Détail au chapitre 2.</td></tr>
</table>
<h3>Le calendrier « logement décent » : un levier commercial puissant… à manier avec rigueur</h3>
<p>Depuis la loi Climat et résilience, un logement mis en location doit respecter un niveau minimal de performance énergétique. Le calendrier prévu par la loi est le suivant :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Date</th><th>Logements ne pouvant plus être proposés à la location (nouveaux baux, renouvellements, reconductions)</th></tr>
<tr><td>1er janvier 2025</td><td>Logements classés G</td></tr>
<tr><td>1er janvier 2028</td><td>Logements classés F</td></tr>
<tr><td>1er janvier 2034</td><td>Logements classés E</td></tr>
</table>
<p>Ce calendrier concerne surtout les <strong>propriétaires bailleurs</strong>. Il peut faire l'objet d'aménagements législatifs (des propositions de modification sont régulièrement débattues, notamment pour les copropriétés) : vérifiez toujours l'état du droit sur service-public.fr avant de l'évoquer. Ne l'utilisez jamais comme argument de peur auprès d'un propriétaire occupant, qui n'est pas concerné par l'interdiction de louer.</p>
<blockquote><strong>Attention :</strong> les messages du type « votre logement sera interdit en 2028 si vous ne faites rien » adressés à un propriétaire qui habite sa maison sont faux et constituent une pratique commerciale trompeuse. C'est précisément le type d'arguments utilisés par les entreprises frauduleuses.</blockquote>
<h3>Les acteurs du marché</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Acteur</th><th>Rôle</th><th>Relation avec le commercial</th></tr>
<tr><td>France Rénov'</td><td>Service public de la rénovation de l'habitat, piloté par l'Agence nationale de l'habitat (Anah), avec un réseau d'espaces conseil sur tout le territoire et le site france-renov.gouv.fr</td><td>Source officielle d'information ; vos clients s'y renseignent souvent. Partenaire, jamais concurrent : orienter un client vers France Rénov' renforce votre crédibilité.</td></tr>
<tr><td>Anah</td><td>Instruit et verse MaPrimeRénov', agrée les opérateurs Mon Accompagnateur Rénov', contrôle les dossiers</td><td>Contrôle la qualité et la sincérité des dossiers que vous contribuez à monter.</td></tr>
<tr><td>ADEME</td><td>Agence de la transition écologique : études, observatoire des DPE, guides grand public</td><td>Fournit des données et guides fiables à citer.</td></tr>
<tr><td>Fournisseurs d'énergie dits « obligés » et délégataires</td><td>Financent les primes CEE</td><td>Partenaires de votre entreprise pour les primes ; leurs conditions doivent être respectées avant la signature.</td></tr>
<tr><td>Organismes de qualification (Qualibat, Qualit'EnR, Qualifelec…)</td><td>Délivrent les qualifications portant la mention RGE</td><td>Conditionnent l'accès de vos clients aux aides.</td></tr>
<tr><td>DGCCRF</td><td>Protection économique des consommateurs, contrôle des pratiques commerciales</td><td>Contrôle vos méthodes de vente, vos devis et vos contrats.</td></tr>
<tr><td>Banques et établissements de crédit</td><td>Éco-prêt à taux zéro, prêts travaux, prêt avance rénovation</td><td>Partenaires pour le financement du reste à charge.</td></tr>
<tr><td>Diagnostiqueurs certifiés et auditeurs</td><td>Réalisent les DPE et audits énergétiques</td><td>Prescripteurs potentiels ; leurs documents fondent vos propositions.</td></tr>
</table>
<h3>Un marché porteur mais abîmé par la fraude</h3>
<p>Le marché de la rénovation énergétique bénéficie de fonds publics importants et d'une demande soutenue par la hausse durable du prix des énergies. Il a aussi attiré des acteurs malhonnêtes : démarchage agressif, offres « à 1 euro », usurpation de l'identité d'organismes publics, travaux bâclés, dossiers d'aides falsifiés. Les pouvoirs publics ont réagi par des contrôles renforcés et par des lois successives. Conséquence directe pour vous : <strong>la confiance est devenue le premier enjeu commercial</strong>. Un client qui a déjà été démarché de façon insistante arrive méfiant. Votre professionnalisme, votre transparence et votre conformité sont des arguments de vente à part entière.</p>
<h3>Ce que le client particulier attend vraiment</h3>
<ul>
<li><strong>Payer moins</strong> de chauffage et d'eau chaude, et se protéger contre les hausses futures ;</li>
<li><strong>Gagner en confort</strong> : ne plus avoir froid l'hiver ni trop chaud l'été, supprimer les courants d'air et l'humidité ;</li>
<li><strong>Être rassuré</strong> sur la fiabilité de l'entreprise, la qualité des travaux, l'obtention réelle des aides ;</li>
<li><strong>Valoriser son bien</strong> (meilleure étiquette énergétique à la revente) ;</li>
<li><strong>Agir pour l'environnement</strong>, motivation réelle mais rarement suffisante seule.</li>
</ul>
<h3>Ce que le client professionnel attend</h3>
<ul>
<li>Respecter ses obligations (décret tertiaire, réglementation sur l'automatisation des systèmes de chauffage et climatisation de certains bâtiments) ;</li>
<li>Maîtriser ses charges et sécuriser son budget d'investissement ;</li>
<li>Ne pas perturber l'activité pendant les travaux ;</li>
<li>Disposer de données de suivi et de justificatifs pour son reporting.</li>
</ul>
<blockquote><strong>À retenir</strong><br />La rénovation énergétique répond à un objectif national de neutralité carbone en 2050 et s'appuie sur des lois structurantes (transition énergétique, ÉLAN et décret tertiaire, Climat et résilience, lois anti-démarchage et anti-fraude). Le marché est porteur mais marqué par la fraude : votre conformité et votre transparence sont des arguments commerciaux. Toute donnée chiffrée citée à un client doit être sourcée et à jour.</blockquote>
`,
      },
      {
        title: "1.3 – Le DPE, les étiquettes énergie et l'audit énergétique",
        content: `
<h3>Le diagnostic de performance énergétique (DPE)</h3>
<p>Le <strong>DPE</strong> est un document réglementaire, établi par un diagnostiqueur certifié, qui évalue la consommation d'énergie et les émissions de gaz à effet de serre d'un logement dans des conditions d'usage conventionnelles. Il est obligatoire lors de la vente et de la mise en location d'un logement. Depuis le 1er juillet 2021, sa méthode de calcul est unifiée (méthode « 3CL ») et il est <strong>opposable</strong> : l'acquéreur ou le locataire peut se retourner contre le vendeur ou le bailleur si le DPE est erroné. Il est valable 10 ans (les DPE réalisés avec les anciennes méthodes ont des durées de validité plus courtes, fixées par les textes de transition).</p>
<h3>Lire une étiquette DPE</h3>
<p>Le DPE classe le logement de A (très performant) à G (très énergivore) selon <strong>un double seuil</strong> : la consommation d'énergie primaire par mètre carré et par an, et les émissions de gaz à effet de serre. La classe retenue est la plus mauvaise des deux. Les seuils de consommation d'énergie primaire utilisés pour les logements sont les suivants (pour un logement de taille standard ; des ajustements existent pour les petites surfaces) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Classe</th><th>Consommation d'énergie primaire (kWh/m²/an)</th><th>Perception pour le client</th></tr>
<tr><td>A</td><td>Moins de 70</td><td>Logement très performant</td></tr>
<tr><td>B</td><td>De 70 à 110</td><td>Logement performant (niveau visé par une rénovation globale de qualité)</td></tr>
<tr><td>C</td><td>De 110 à 180</td><td>Bon niveau</td></tr>
<tr><td>D</td><td>De 180 à 250</td><td>Niveau moyen du parc</td></tr>
<tr><td>E</td><td>De 250 à 330</td><td>Logement énergivore</td></tr>
<tr><td>F</td><td>De 330 à 420</td><td>« Passoire thermique »</td></tr>
<tr><td>G</td><td>Plus de 420</td><td>« Passoire thermique », la plus énergivore</td></tr>
</table>
<p><em>Ces seuils sont ceux de l'arrêté encadrant le DPE ; vérifiez-les sur le site de l'ADEME ou du ministère, car la méthode est régulièrement ajustée.</em></p>
<h3>Énergie primaire, énergie finale : l'explication à donner au client</h3>
<p>L'<strong>énergie finale</strong> est celle que le client paie (les kWh de sa facture). L'<strong>énergie primaire</strong> tient compte de l'énergie nécessaire pour produire et acheminer cette énergie. Pour l'électricité, on applique un coefficient de conversion. Depuis le 1er janvier 2026, ce coefficient est passé de 2,3 à <strong>1,9</strong> (arrêté du 13 août 2025) : à logement identique, un logement chauffé à l'électricité peut donc obtenir une meilleure étiquette qu'avant. Les DPE en cours de validité ne sont pas à refaire ; une attestation actualisant l'étiquette peut être obtenue sur le site de l'ADEME.</p>
<blockquote><strong>Conséquence commerciale :</strong> ne promettez jamais un « gain de deux classes » à partir d'une estimation de comptoir. Le gain d'étiquette dépend du calcul réglementaire refait après travaux, des coefficients en vigueur et de l'état réel du logement. Parlez d'objectif, appuyé sur une étude ou un audit, jamais de garantie.</blockquote>
<h3>Ce que contient un DPE et comment l'exploiter en rendez-vous</h3>
<ul>
<li><strong>Les caractéristiques du logement</strong> : surface, année de construction, type de chauffage et d'eau chaude, ventilation, isolation connue ;</li>
<li><strong>L'estimation des coûts annuels d'énergie</strong>, exprimée en fourchette : utile pour ouvrir la discussion, sans la confondre avec la facture réelle du client ;</li>
<li><strong>La répartition des déperditions</strong> (murs, toiture, planchers, menuiseries, ponts thermiques, renouvellement d'air) : c'est la partie la plus utile pour le commercial, car elle montre où passe la chaleur ;</li>
<li><strong>Des recommandations de travaux</strong> en un ou plusieurs bouquets, avec l'étiquette visée.</li>
</ul>
<p>En rendez-vous, demandez toujours à voir le DPE (ou l'audit) et les factures d'énergie des deux ou trois dernières années. Comparez la consommation conventionnelle du DPE aux consommations réelles : un écart important s'explique par le mode de vie (température de consigne, occupation, nombre d'occupants) et doit vous rendre prudent dans vos estimations d'économies.</p>
<h3>L'audit énergétique</h3>
<p>L'<strong>audit énergétique</strong> va plus loin que le DPE : il analyse le logement en détail et propose des <strong>scénarios de travaux chiffrés</strong> permettant d'atteindre une meilleure classe, en général un parcours en une seule étape et un parcours en plusieurs étapes. On distingue :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type d'audit</th><th>Quand</th><th>Points clés</th></tr>
<tr><td><strong>Audit énergétique réglementaire</strong> lors de la vente</td><td>Vente d'une maison individuelle ou d'un immeuble en monopropriété classé F ou G (depuis le 1er avril 2023), puis E (depuis le 1er janvier 2025) ; extension prévue aux classes D au 1er janvier 2034</td><td>Remis à l'acquéreur ; présente des propositions de travaux en étapes, dont la première au moins doit traiter les postes prioritaires ; valable 5 ans.</td></tr>
<tr><td><strong>Audit énergétique « incitatif »</strong> dans le cadre des aides</td><td>Avant une rénovation d'ampleur aidée, ou à la demande du propriétaire</td><td>Sert de base au projet de travaux ; dans le parcours accompagné de MaPrimeRénov', il est réalisé dans le cadre de l'accompagnement (voir chapitre 2).</td></tr>
<tr><td>Audit des bâtiments tertiaires</td><td>Démarche volontaire ou obligatoire pour certaines grandes entreprises (audit énergétique d'entreprise), et outil de pilotage du décret tertiaire</td><td>Couvre bâtiments, procédés et usages ; utile pour hiérarchiser les investissements.</td></tr>
</table>
<p>L'audit doit être réalisé par un professionnel qualifié (bureau d'études ou entreprise disposant de la qualification adéquate, architecte ou diagnostiqueur répondant aux conditions fixées par les textes). Un commercial ne réalise pas d'audit : il <strong>s'appuie</strong> sur un audit pour construire une proposition cohérente.</p>
<h3>Les notions techniques à savoir expliquer en une phrase</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Notion</th><th>Explication simple pour un client</th></tr>
<tr><td>Déperditions</td><td>La chaleur que la maison perd par les murs, le toit, le sol, les fenêtres et l'air renouvelé.</td></tr>
<tr><td>Pont thermique</td><td>Un endroit où l'isolation est interrompue (jonction mur / plancher, tableau de fenêtre) et par où la chaleur s'échappe plus vite.</td></tr>
<tr><td>Étanchéité à l'air</td><td>Les fuites d'air non maîtrisées (courants d'air) qui font perdre de la chaleur ; à distinguer de la ventilation, qui est volontaire et nécessaire.</td></tr>
<tr><td>Résistance thermique R</td><td>La capacité d'un isolant posé à freiner la chaleur ; plus R est élevé, mieux c'est. Elle s'exprime en m².K/W.</td></tr>
<tr><td>Conductivité lambda (λ)</td><td>La performance intrinsèque d'un matériau ; plus lambda est faible, plus le matériau est isolant à épaisseur égale.</td></tr>
<tr><td>Rendement / COP</td><td>Le rapport entre l'énergie fournie et l'énergie consommée par l'équipement.</td></tr>
<tr><td>Confort d'été</td><td>La capacité du logement à rester frais l'été sans climatisation : isolation, protections solaires, inertie, ventilation nocturne.</td></tr>
</table>
<h3>Erreurs fréquentes en rendez-vous</h3>
<ul>
<li>Confondre la facture estimée du DPE avec la facture réelle et promettre des économies calculées sur la mauvaise base.</li>
<li>Présenter le DPE comme une obligation de travaux : le DPE informe, il n'oblige pas un propriétaire occupant à rénover.</li>
<li>Annoncer une étiquette après travaux sans étude : seule une nouvelle évaluation réglementaire le permet.</li>
<li>Critiquer le travail du diagnostiqueur devant le client sans éléments : signalez une incohérence avec tact et proposez une vérification.</li>
</ul>
<blockquote><strong>À retenir</strong><br />Le DPE classe un logement de A à G selon la consommation d'énergie primaire et les émissions de gaz à effet de serre ; il est opposable et valable 10 ans ; le coefficient de l'électricité est de 1,9 depuis le 1er janvier 2026. L'audit énergétique propose des scénarios de travaux chiffrés ; il est obligatoire à la vente de certaines maisons et monopropriétés classées E, F ou G. Le commercial lit ces documents, s'en sert pour construire sa proposition, et ne promet jamais un résultat qui n'a pas été calculé.</blockquote>
`,
      },
      {
        title: "1.4 – Les gestes sur l'enveloppe : isolation, menuiseries et ventilation",
        content: `
<p>Cette section et la suivante ne font pas de vous un technicien. Elles vous donnent le vocabulaire et la logique nécessaires pour <strong>comprendre ce que vous vendez</strong>, répondre aux questions courantes, repérer les situations où il faut faire intervenir un technicien et éviter les promesses impossibles. Règle d'or : <strong>on traite d'abord l'enveloppe, puis on dimensionne les équipements</strong>. Une pompe à chaleur installée dans une maison mal isolée sera surdimensionnée, plus chère, et le client sera déçu.</p>
<h3>Par où la chaleur s'échappe-t-elle ?</h3>
<p>Dans une maison individuelle ancienne non isolée, la répartition des déperditions varie selon la forme du bâtiment, mais l'ADEME présente classiquement l'ordre de grandeur suivant : la toiture est souvent le premier poste (de l'ordre de 25 à 30 %), suivie des murs (20 à 25 %), du renouvellement d'air et des fuites (20 à 25 %), des fenêtres (10 à 15 %), des planchers bas (7 à 10 %) et des ponts thermiques. <em>Ces fourchettes sont indicatives ; pour un logement donné, la référence est le DPE ou l'audit.</em></p>
<h3>L'isolation de la toiture</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Configuration</th><th>Technique courante</th><th>Points d'attention à connaître</th></tr>
<tr><td>Combles perdus (non aménagés, accessibles)</td><td>Isolant en vrac soufflé (laine minérale, ouate de cellulose) ou en rouleaux</td><td>Travaux rapides et parmi les plus rentables ; repérer les spots encastrés, conduits de fumée et boîtiers électriques à protéger ; prévoir un repère de hauteur et un accès conservé.</td></tr>
<tr><td>Combles aménagés (rampants)</td><td>Panneaux ou rouleaux entre et sous chevrons, avec membrane d'étanchéité à l'air / pare-vapeur</td><td>Perte de quelques centimètres de hauteur ; continuité de la membrane essentielle pour éviter la condensation.</td></tr>
<tr><td>Toiture par l'extérieur (sarking)</td><td>Panneaux posés sur les chevrons lors d'une réfection de couverture</td><td>Pertinent quand la toiture doit de toute façon être refaite ; nécessite souvent une déclaration préalable en mairie.</td></tr>
<tr><td>Toiture-terrasse</td><td>Isolation sur ou sous l'étanchéité</td><td>Relève souvent d'un professionnel de l'étanchéité.</td></tr>
</table>
<p>Les aides exigent des performances minimales, exprimées en résistance thermique R (par exemple pour les combles perdus, les fiches d'opérations standardisées des CEE fixent un R minimal élevé — voir la fiche BAR-EN-101 en vigueur). Vérifiez les seuils exacts dans les textes applicables le jour du devis : le devis doit mentionner la marque, la référence, l'épaisseur et la résistance thermique de l'isolant.</p>
<h3>L'isolation des murs</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Technique</th><th>Avantages</th><th>Limites</th></tr>
<tr><td><strong>Isolation thermique par l'extérieur (ITE)</strong> : isolant fixé sur la façade, recouvert d'un enduit ou d'un bardage</td><td>Traite la plupart des ponts thermiques ; pas de perte de surface habitable ; travaux sans quitter le logement ; rénove la façade.</td><td>Coût élevé ; autorisation d'urbanisme (déclaration préalable) ; contraintes en copropriété (vote en assemblée générale) et en secteur protégé ; reprise des appuis de fenêtres, descentes d'eau pluviale.</td></tr>
<tr><td><strong>Isolation thermique par l'intérieur (ITI)</strong> : doublage collé ou sur ossature</td><td>Coût plus faible ; possible pièce par pièce ; pas d'autorisation d'urbanisme en principe.</td><td>Perte de surface habitable ; ponts thermiques aux planchers et refends ; déménagement des pièces ; reprise de l'électricité et des finitions.</td></tr>
<tr><td>Isolation répartie (murs en matériaux isolants)</td><td>Rare en rénovation</td><td>Concerne surtout la construction neuve.</td></tr>
</table>
<p>Sur les murs anciens (pierre, pisé, brique pleine), le choix des matériaux doit respecter la gestion de l'humidité du mur (matériaux « perspirants ») : c'est un sujet de technicien, mais le commercial doit savoir le signaler et ne jamais imposer une solution standard sur un bâti ancien sans étude.</p>
<h3>L'isolation des planchers bas</h3>
<p>Lorsque la maison est sur un sous-sol non chauffé, un vide sanitaire ou un garage, l'isolation en sous-face du plancher (panneaux fixés ou projetés) est un geste simple qui améliore nettement le confort (fin de la sensation de « pieds froids »). Vérifiez la hauteur disponible et l'accessibilité.</p>
<h3>Les menuiseries extérieures</h3>
<p>Remplacer des fenêtres en simple vitrage par des menuiseries performantes améliore le confort, l'acoustique et la sécurité. Deux indicateurs sont à connaître :</p>
<ul>
<li><strong>Uw</strong> : coefficient de transmission thermique de la fenêtre complète (en W/m².K) — plus il est bas, plus la fenêtre isole ;</li>
<li><strong>Sw</strong> : facteur solaire, la part de l'énergie du soleil qui traverse la fenêtre — utile en hiver, à maîtriser en été.</li>
</ul>
<p>Le gain énergétique d'un changement de fenêtres est souvent <strong>plus modeste</strong> que ne l'imaginent les clients, car les fenêtres représentent une part limitée des déperditions. Le commercial honnête le dit, tout en valorisant les autres bénéfices (confort, bruit, sécurité, entretien). Point de vigilance technique : remplacer des fenêtres anciennes très perméables par des fenêtres étanches sans traiter la ventilation peut créer de la condensation et des moisissures.</p>
<h3>La ventilation : indispensable dans un logement rénové</h3>
<p>Un logement isolé et étanche doit être <strong>correctement ventilé</strong> pour évacuer l'humidité et les polluants intérieurs. C'est un argument de santé autant que d'énergie.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Système</th><th>Principe</th><th>Argument client</th></tr>
<tr><td>VMC simple flux autoréglable</td><td>Extraction d'air à débit constant dans les pièces humides, entrées d'air dans les pièces de vie</td><td>Solution économique, mais débit indépendant des besoins.</td></tr>
<tr><td>VMC simple flux hygroréglable (type A ou B)</td><td>Débit ajusté selon l'humidité ; en type B, les entrées d'air sont aussi modulées</td><td>Moins de chaleur perdue que l'autoréglable, bon compromis en rénovation.</td></tr>
<tr><td>VMC double flux</td><td>Air extrait et air neuf passent dans un échangeur : la chaleur de l'air sortant préchauffe l'air entrant</td><td>Récupère une grande partie de la chaleur, air filtré ; intéressante dans un logement très étanche ; installation plus lourde (gaines, place) et entretien des filtres indispensable.</td></tr>
<tr><td>Ventilation mécanique répartie / insufflation</td><td>Solutions adaptées à certains logements existants difficiles à équiper</td><td>À étudier au cas par cas.</td></tr>
</table>
<p>Questions de découverte utiles : y a-t-il des traces de moisissures ou de condensation ? Les entrées d'air ont-elles été bouchées ? Le logement a-t-il déjà une VMC, de quand date-t-elle, est-elle entretenue ?</p>
<h3>Le bon ordre des travaux</h3>
<ol>
<li>Diagnostiquer (DPE, audit, visite technique) ;</li>
<li>Réduire les besoins : toiture, murs, planchers, menuiseries, étanchéité à l'air ;</li>
<li>Assurer la qualité de l'air : ventilation adaptée ;</li>
<li>Produire la chaleur et l'eau chaude efficacement, avec un équipement dimensionné sur les besoins après isolation ;</li>
<li>Produire de l'énergie renouvelable sur place (solaire), si pertinent ;</li>
<li>Réguler et suivre les consommations.</li>
</ol>
<p>Lorsque le client ne peut pas tout faire en une fois, la rénovation par étapes doit suivre un ordre logique et éviter les travaux qui en compromettent d'autres (par exemple, poser des fenêtres neuves sans anticiper une future isolation par l'extérieur, ce qui créera un pont thermique au niveau des tableaux).</p>
<blockquote><strong>À retenir</strong><br />On isole avant de changer le chauffage. La toiture est souvent le premier poste de déperdition et les combles perdus un geste très rentable. L'ITE traite les ponts thermiques mais coûte plus cher et demande des autorisations ; l'ITI est plus accessible mais réduit la surface. Les fenêtres apportent surtout du confort. Tout logement rénové doit être correctement ventilé. Les performances (R, Uw, Sw) figurent sur le devis et doivent respecter les seuils des aides en vigueur.</blockquote>
`,
      },
      {
        title: "1.5 – Les équipements : pompes à chaleur, eau chaude, solaire et régulation",
        content: `
<h3>Les pompes à chaleur (PAC)</h3>
<p>Une pompe à chaleur prélève des calories gratuites dans l'environnement (air extérieur, sol, eau) et les restitue dans le logement grâce à un circuit frigorifique entraîné par un compresseur électrique. Pour 1 kWh d'électricité consommé, elle restitue plusieurs kWh de chaleur : c'est ce qui fait son intérêt économique et environnemental.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type</th><th>Fonctionnement</th><th>Pour quel client</th><th>Points de vigilance</th></tr>
<tr><td><strong>PAC air/eau</strong></td><td>Capte la chaleur de l'air extérieur et chauffe l'eau du circuit de chauffage (radiateurs, plancher chauffant), souvent aussi l'eau chaude sanitaire</td><td>Maison équipée d'un chauffage central (fioul, gaz, électrique à accumulation hydraulique) ; remplacement d'une chaudière fioul</td><td>Compatibilité des émetteurs (radiateurs anciens dimensionnés pour une eau très chaude) ; performance qui baisse par grand froid ; emplacement et bruit de l'unité extérieure.</td></tr>
<tr><td><strong>PAC air/air</strong></td><td>Capte la chaleur de l'air extérieur et souffle de l'air chaud (ou froid en mode réversible) par des unités intérieures</td><td>Logement chauffé par convecteurs électriques, besoin de rafraîchissement</td><td>Ne produit pas d'eau chaude ; il s'agit d'une climatisation réversible ; elle n'est en principe pas financée par MaPrimeRénov' (vérifier les règles en vigueur et les éventuelles primes CEE).</td></tr>
<tr><td><strong>PAC géothermique</strong> (sol/eau, eau/eau)</td><td>Capte la chaleur du sol (capteurs horizontaux ou sondes verticales) ou d'une nappe</td><td>Terrain adapté, projet à long terme</td><td>Performance stable toute l'année, mais coût et travaux de forage importants ; réglementation des forages ; étude de sol.</td></tr>
<tr><td><strong>PAC hybride</strong></td><td>Associe une PAC et une chaudière d'appoint, le système choisissant l'énergie la plus pertinente</td><td>Logements où une PAC seule serait difficile à dimensionner</td><td>Les solutions avec appoint fossile ont été progressivement exclues de plusieurs aides (exclusion de MaPrimeRénov' par geste annoncée au 1er septembre 2026) : vérifier systématiquement l'éligibilité avant de les proposer.</td></tr>
</table>
<h3>Les indicateurs de performance à connaître</h3>
<ul>
<li><strong>COP</strong> (coefficient de performance) : rapport entre la chaleur restituée et l'électricité consommée, mesuré dans des conditions d'essai précises (température extérieure et température d'eau). Un COP de 4 signifie 4 kWh de chaleur pour 1 kWh d'électricité <em>dans ces conditions-là</em>.</li>
<li><strong>SCOP</strong> (COP saisonnier) : performance moyenne sur une saison de chauffe, plus représentative de la réalité.</li>
<li><strong>ETAS</strong> (efficacité énergétique saisonnière, en %) : indicateur réglementaire européen utilisé par les aides pour fixer des seuils d'éligibilité.</li>
</ul>
<blockquote><strong>Erreur à ne pas commettre :</strong> présenter le COP catalogue comme le rendement réel de l'installation chez le client (« vous diviserez votre facture par quatre »). La performance réelle dépend du climat local, de la température d'eau nécessaire aux radiateurs, de l'isolation et de la qualité de l'installation. Utilisez le SCOP, une étude de dimensionnement et des hypothèses prudentes.</blockquote>
<h3>Le dimensionnement : la clé d'une PAC réussie</h3>
<p>Une PAC se dimensionne à partir des <strong>déperditions du logement</strong> calculées pour la température extérieure de base de la commune (la température la plus froide de référence). Une PAC sous-dimensionnée fera fonctionner l'appoint électrique en permanence ; une PAC surdimensionnée coûtera plus cher, fonctionnera en cycles courts et s'usera plus vite. Le commercial ne fait pas le calcul lui-même, mais il doit :</p>
<ul>
<li>collecter les informations nécessaires (surface, hauteur sous plafond, isolation, type et nombre d'émetteurs, consommations réelles, température de confort souhaitée) ;</li>
<li>ne jamais vendre une puissance « au mètre carré » sans étude ;</li>
<li>signaler si des travaux d'isolation sont prévus, car ils réduiront les besoins.</li>
</ul>
<h3>Les autres points techniques qui deviennent des arguments ou des objections</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Sujet</th><th>Ce que le commercial doit savoir</th></tr>
<tr><td>Bruit de l'unité extérieure</td><td>Choix de l'emplacement (éloignement des fenêtres des voisins, des chambres), supports antivibratiles ; le bruit de voisinage est encadré par le code de la santé publique. Un client inquiet du bruit doit recevoir une réponse précise, pas un « ça ne fait pas de bruit ».</td></tr>
<tr><td>Fluides frigorigènes</td><td>Leur manipulation est réservée aux entreprises titulaires d'une attestation de capacité ; les fluides ont un impact climatique en cas de fuite, d'où l'importance de l'installation et de l'entretien.</td></tr>
<tr><td>Entretien</td><td>Un entretien périodique des PAC est obligatoire (fréquence fixée par la réglementation selon la puissance) ; proposez un contrat d'entretien, c'est aussi un outil de fidélisation.</td></tr>
<tr><td>Urbanisme</td><td>L'unité extérieure peut nécessiter une déclaration préalable selon la commune, notamment en secteur protégé ou en façade sur rue ; en copropriété, l'accord de l'assemblée générale est généralement requis.</td></tr>
<tr><td>Puissance électrique</td><td>Vérifier l'abonnement et l'installation électrique ; une augmentation de puissance souscrite peut être nécessaire.</td></tr>
<tr><td>Dépose de l'ancienne chaudière et de la cuve fioul</td><td>Neutralisation et évacuation de la cuve par un professionnel ; à prévoir au devis.</td></tr>
</table>
<h3>L'eau chaude sanitaire</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Équipement</th><th>Principe</th><th>Argument et vigilance</th></tr>
<tr><td><strong>Chauffe-eau thermodynamique (CET)</strong></td><td>Petite pompe à chaleur couplée à un ballon (souvent 200 à 270 litres) ; capte la chaleur de l'air ambiant d'un local non chauffé, de l'air extérieur ou de l'air extrait</td><td>Consomme nettement moins d'électricité qu'un ballon électrique classique ; demande un emplacement adapté (volume du local, bruit, rejet d'air frais) ; vérifier l'éligibilité aux aides, qui a évolué (retrait annoncé du parcours MaPrimeRénov' par geste au 1er septembre 2026 ; primes CEE à vérifier).</td></tr>
<tr><td><strong>Chauffe-eau solaire individuel (CESI)</strong></td><td>Capteurs solaires thermiques en toiture chauffant un ballon, avec appoint</td><td>Couvre une part importante des besoins annuels selon l'ensoleillement ; demande une orientation et une inclinaison favorables ; entretien du circuit.</td></tr>
<tr><td><strong>Système solaire combiné (SSC)</strong></td><td>Capteurs solaires assurant eau chaude et une partie du chauffage</td><td>Investissement plus important ; pertinent avec un plancher chauffant basse température.</td></tr>
<tr><td>Production par la PAC air/eau</td><td>Ballon intégré ou séparé chauffé par la PAC</td><td>Simplicité d'un seul équipement ; dimensionner le ballon selon le nombre d'occupants.</td></tr>
</table>
<h3>Le solaire photovoltaïque en autoconsommation</h3>
<p>Les panneaux photovoltaïques produisent de l'<strong>électricité</strong> (à ne pas confondre avec le solaire thermique, qui produit de la chaleur). En autoconsommation, le client consomme directement une partie de sa production et peut injecter le surplus sur le réseau, vendu dans le cadre de l'obligation d'achat ou à un acheteur de son choix.</p>
<ul>
<li><strong>Rentabilité</strong> : elle dépend du taux d'autoconsommation (part de la production réellement consommée sur place), donc des habitudes du foyer (présence en journée, programmation des usages, PAC, CET, véhicule électrique). Les tarifs d'achat du surplus et la prime à l'autoconsommation sont fixés par arrêté et ont fortement évolué en 2025 : vérifiez-les le jour du devis et ne promettez jamais qu'une installation « s'autofinance » ou « ne coûte rien ».</li>
<li><strong>Démarches</strong> : déclaration préalable de travaux en mairie, demande de raccordement auprès du gestionnaire de réseau (Enedis dans la plupart des communes), attestation de conformité électrique (Consuel) ; vérification de la charpente et de l'assurance.</li>
<li><strong>Aides</strong> : le photovoltaïque n'est pas financé par MaPrimeRénov' ; il bénéficie de dispositifs propres (prime à l'autoconsommation, tarifs d'achat, fiscalité spécifique) dont les conditions changent souvent.</li>
<li><strong>Vigilance fraude</strong> : le photovoltaïque est l'un des secteurs où les offres trompeuses (« panneaux gratuits », « financés par l'État ») et les crédits affectés abusifs ont été les plus nombreux. Votre transparence sur le coût, le crédit éventuel et la production estimée est votre meilleur argument.</li>
</ul>
<h3>Le bois-énergie</h3>
<p>Poêles à bûches ou à granulés, chaudières biomasse : ils remplacent efficacement une chaudière fioul dans certaines situations (accès au combustible, place de stockage, conduit de fumée). Les performances exigées (rendement, émissions de particules, label type Flamme Verte) et l'éligibilité aux aides évoluent : plusieurs équipements bois ont été retirés en 2026 du parcours MaPrimeRénov' par geste. Thermia Rénov ne pose pas ces équipements ; si un client en parle, orientez-le vers un professionnel qualifié du domaine plutôt que d'improviser.</p>
<h3>Régulation et pilotage</h3>
<p>La régulation (thermostat d'ambiance, programmation, robinets thermostatiques, sondes extérieures, pilotage à distance) permet de chauffer juste ce qu'il faut, quand il faut. Une réglementation de 2023 a rendu progressivement obligatoire l'équipement des systèmes de chauffage en dispositifs de régulation automatique de la température, selon un calendrier s'étendant jusqu'en 2027 : vérifiez les conditions exactes avant d'en parler comme d'une obligation. C'est un geste peu coûteux, souvent oublié, qui renforce l'efficacité des autres travaux.</p>
<h3>Tableau de synthèse pour le commercial</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation du client</th><th>Piste à étudier (après diagnostic)</th><th>Question à poser absolument</th></tr>
<tr><td>Maison des années 1970, chaudière fioul, combles non isolés</td><td>Isolation des combles, puis PAC air/eau dimensionnée sur les besoins réduits ; CET ou ballon sur la PAC</td><td>« Quels sont vos projets dans la maison pour les dix prochaines années ? »</td></tr>
<tr><td>Appartement en copropriété chauffé par convecteurs</td><td>Gestes privatifs (fenêtres, régulation, chauffe-eau) ; travaux sur parties communes via la copropriété</td><td>« Un audit ou un projet de travaux est-il en discussion en assemblée générale ? »</td></tr>
<tr><td>Maison récente bien isolée, forte consommation électrique en journée</td><td>Photovoltaïque en autoconsommation, CET</td><td>« À quels moments de la journée consommez-vous le plus ? »</td></tr>
<tr><td>Bureaux tertiaires de plus de 1 000 m²</td><td>Audit, plan d'actions décret tertiaire, régulation, éclairage, PAC, isolation</td><td>« Où en êtes-vous de vos déclarations sur OPERAT ? »</td></tr>
</table>
<blockquote><strong>À retenir</strong><br />La PAC air/eau remplace un chauffage central ; la PAC air/air est une climatisation réversible ; la géothermie est performante mais lourde. Le SCOP et l'ETAS sont plus pertinents que le COP catalogue. Toute PAC se dimensionne sur les déperditions après isolation. Le CET et le solaire thermique traitent l'eau chaude ; le photovoltaïque produit de l'électricité et sa rentabilité dépend de l'autoconsommation. L'éligibilité des équipements aux aides change souvent : vérifiez-la à chaque devis.</blockquote>
`,
      },
      {
        title: "1.6 – Le label RGE, les qualifications et la sous-traitance",
        content: `
<h3>Ce que signifie RGE</h3>
<p><strong>RGE</strong> signifie « Reconnu garant de l'environnement ». Ce n'est pas un label délivré en tant que tel par l'État : c'est une <strong>mention</strong> attachée à des qualifications ou certifications délivrées par des organismes accrédités, pour un <strong>domaine de travaux précis</strong>. Une entreprise peut être RGE pour l'isolation des combles et ne pas l'être pour les pompes à chaleur.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Organisme</th><th>Exemples de qualifications</th><th>Domaines</th></tr>
<tr><td>Qualibat</td><td>Qualifications « efficacité énergétique » par corps d'état, rénovation énergétique globale</td><td>Isolation, menuiseries, ventilation, chauffage, offre globale</td></tr>
<tr><td>Qualit'EnR</td><td>QualiPAC, QualiPV, QualiSol, Qualibois</td><td>Pompes à chaleur et chauffe-eau thermodynamiques, photovoltaïque, solaire thermique, bois-énergie</td></tr>
<tr><td>Qualifelec</td><td>Qualifications électricité avec mention RGE</td><td>Équipements électriques, photovoltaïque, régulation, IRVE selon les cas</td></tr>
<tr><td>Certibat et autres organismes</td><td>Certifications de rénovation globale</td><td>Offre de rénovation performante</td></tr>
</table>
<p>Les intitulés et la liste des qualifications évoluent ; la référence reste l'annuaire officiel des professionnels RGE accessible depuis france-renov.gouv.fr.</p>
<h3>Comment s'obtient et se conserve la mention RGE</h3>
<ul>
<li>Désignation d'un <strong>référent technique</strong> ayant suivi une formation spécifique et validé ses connaissances ;</li>
<li>Présentation de références de chantiers et des attestations d'assurance (responsabilité civile et décennale) ;</li>
<li><strong>Audits de chantier</strong> réalisés par l'organisme de qualification pendant la durée de validité ;</li>
<li>Qualification délivrée pour une durée limitée avec un suivi régulier ; elle peut être suspendue ou retirée en cas de manquement.</li>
</ul>
<h3>L'écoconditionnalité des aides</h3>
<p>Le principe d'<strong>écoconditionnalité</strong> lie l'accès des particuliers aux principales aides (MaPrimeRénov', primes CEE, éco-prêt à taux zéro) au recours à une entreprise RGE <strong>dans le domaine des travaux réalisés</strong>. Concrètement : si l'entreprise n'est pas RGE pour le geste concerné à la date du devis et des travaux, le client perd l'aide. C'est un point qui engage directement votre responsabilité commerciale.</p>
<blockquote><strong>Réflexe professionnel :</strong> avant chaque devis, vérifiez que la qualification RGE de votre entreprise couvre bien le geste, qu'elle est en cours de validité et qu'elle le restera jusqu'à la fin des travaux. Remettez au client l'attestation de qualification et invitez-le à la vérifier lui-même dans l'annuaire officiel.</blockquote>
<h3>Ce que la loi du 30 juin 2025 a ajouté</h3>
<p>La loi n° 2025-594 du 30 juin 2025 contre toutes les fraudes aux aides publiques a renforcé le dispositif :</p>
<ul>
<li><strong>Information sur le label</strong> : le professionnel doit indiquer au consommateur, avant la conclusion du contrat et sur un support durable, s'il détient ou non le label pour chaque catégorie de travaux proposés ; le manquement est sanctionné, et la loi prévoit la nullité du contrat (article L. 224-114 du code de la consommation, tel que présenté par l'ANIL).</li>
<li><strong>Sous-traitance</strong> : le consommateur doit être informé avant la conclusion du contrat de l'identité des sous-traitants et de leur situation au regard du label ; pour les travaux financés par certaines aides (MaPrimeRénov', CEE, éco-PTZ…), la sous-traitance est limitée à deux rangs depuis le 1er janvier 2026 ; à compter du 1er janvier 2027, l'entreprise qui facture doit elle-même être titulaire du label RGE, même si elle sous-traite à une entreprise RGE.</li>
<li><strong>Suspension du label</strong> : en cas de pratiques commerciales trompeuses ou agressives, d'abus de faiblesse ou de non-conformités constatées lors des contrôles, le label peut être suspendu, et des interdictions temporaires d'obtenir un nouveau label sont prévues.</li>
</ul>
<p><em>Les modalités d'application de ces mesures dépendent de décrets et arrêtés ; consultez la fiche de l'ANIL ou de service-public.fr consacrée à cette loi pour connaître leur état d'entrée en vigueur à la date de votre rendez-vous.</em></p>
<h3>Les assurances de l'entreprise</h3>
<p>Le client doit pouvoir identifier l'assurance de l'entreprise. Pour les travaux de bâtiment, les artisans et entreprises soumis à l'assurance de responsabilité décennale doivent indiquer sur leurs devis et factures l'assurance souscrite, les coordonnées de l'assureur et la couverture géographique du contrat. Les garanties légales dues au maître d'ouvrage sont à connaître :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Garantie</th><th>Durée à compter de la réception</th><th>Ce qu'elle couvre</th></tr>
<tr><td>Garantie de parfait achèvement</td><td>1 an</td><td>Réparation de tous les désordres signalés à la réception (réserves) ou dans l'année.</td></tr>
<tr><td>Garantie biennale (de bon fonctionnement)</td><td>2 ans minimum</td><td>Éléments d'équipement dissociables du bâti (par exemple certains équipements techniques).</td></tr>
<tr><td>Garantie décennale</td><td>10 ans</td><td>Dommages compromettant la solidité de l'ouvrage ou le rendant impropre à sa destination.</td></tr>
</table>
<p>Ces garanties découlent des articles 1792 et suivants du code civil. La <strong>réception des travaux</strong> (étudiée au chapitre consacré à la conclusion et au suivi) est donc un moment juridique essentiel, pas une formalité.</p>
<h3>Les autres signes de qualité utiles en rendez-vous</h3>
<ul>
<li>Certifications produits (marquage CE, certifications d'isolants et d'équipements, labels de performance) ;</li>
<li>Adhésion à une fédération professionnelle et à un médiateur de la consommation (obligatoire pour tout professionnel vendant aux particuliers) ;</li>
<li>Avis clients vérifiables, références de chantiers proches, possibilité de visiter une installation.</li>
</ul>
<h3>Erreurs fréquentes</h3>
<ul>
<li>Affirmer « nous sommes RGE » sans préciser pour quels travaux.</li>
<li>Confier un chantier à un sous-traitant sans vérifier sa qualification et sans en informer le client.</li>
<li>Utiliser le logo d'un organisme de qualification pour un domaine non couvert : c'est une pratique trompeuse.</li>
<li>Oublier que la qualification doit être valide pendant toute la durée des travaux, pas seulement le jour du devis.</li>
</ul>
<blockquote><strong>À retenir</strong><br />RGE est une mention attachée à des qualifications délivrées par domaine de travaux (Qualibat, Qualit'EnR, Qualifelec…). Elle conditionne l'accès du client aux principales aides. Depuis la loi du 30 juin 2025, l'information sur le label et sur les sous-traitants est obligatoire avant la signature, la sous-traitance aidée est limitée à deux rangs depuis 2026 et l'entreprise qui facture devra être RGE à partir de 2027. Les assurances et les garanties légales font partie des informations à donner au client.</blockquote>
`,
      },
      {
        title: "1.7 – Le fil rouge de la formation : Thermia Rénov",
        content: `
<h3>Une entreprise fictive pour s'entraîner</h3>
<p>Tout au long du support, les notions sont appliquées à <strong>Thermia Rénov</strong>, une entreprise <strong>fictive</strong> construite pour la formation. Les personnes, les clients et <strong>tous les chiffres</strong> du fil rouge sont inventés ; ce ne sont ni des statistiques sectorielles ni des barèmes officiels. Ils servent à s'entraîner au raisonnement, pas à être recopiés devant un client.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Données fictives</th></tr>
<tr><td>Raison sociale</td><td>Thermia Rénov, SAS de travaux de rénovation énergétique</td></tr>
<tr><td>Implantation</td><td>Saint-Genis-Laval (Rhône), interventions dans la métropole de Lyon et les communes voisines</td></tr>
<tr><td>Effectif</td><td>14 salariés : direction, 1 directrice commerciale, 3 conseillers commerciaux, 1 assistante administrative chargée des dossiers d'aides, 1 conducteur de travaux, 7 techniciens et poseurs</td></tr>
<tr><td>Activités</td><td>Pompes à chaleur air/eau, isolation des combles et des murs, chauffe-eau thermodynamiques, photovoltaïque en autoconsommation</td></tr>
<tr><td>Qualifications</td><td>Mention RGE pour chacun de ces domaines (qualifications à vérifier dans l'annuaire officiel, comme pour toute entreprise réelle)</td></tr>
<tr><td>Clientèle</td><td>Environ 80 % de particuliers (propriétaires occupants surtout), 20 % de professionnels (bureaux, commerces, SCI)</td></tr>
<tr><td>Politique commerciale</td><td>Aucun démarchage téléphonique, par SMS ou par courriel non sollicité ; contacts issus du site Internet, des recommandations, des partenaires prescripteurs et des salons ; visites à domicile uniquement sur rendez-vous demandé par le client</td></tr>
</table>
<h3>Les personnages</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Personnage</th><th>Rôle</th><th>Ce qu'il apporte au fil rouge</th></tr>
<tr><td><strong>Nadia</strong></td><td>Directrice commerciale, quinze ans d'expérience dans le génie climatique</td><td>Exigeante sur la conformité et la qualité de la relation client ; elle a construit la charte éthique de l'entreprise après avoir vu des concurrents disparaître à la suite de contrôles.</td></tr>
<tr><td><strong>Karim</strong></td><td>Conseiller commercial débutant, arrivé il y a quatre mois d'un poste de vendeur en magasin de bricolage</td><td>Très à l'aise dans le contact, encore fragile sur la technique et la réglementation ; il fait les erreurs que la formation vous apprend à éviter.</td></tr>
<tr><td><strong>M. et Mme Ferrand</strong></td><td>Propriétaires occupants d'une maison de 1978 (115 m², deux niveaux), chaudière fioul de plus de 25 ans, combles perdus faiblement isolés, DPE classé F</td><td>Projet type de rénovation d'une maison individuelle : aides, reste à charge, choix entre parcours par geste et rénovation d'ampleur.</td></tr>
<tr><td><strong>Mme Lopez</strong></td><td>Propriétaire d'un appartement de 68 m² dans une copropriété des années 1960, chauffage électrique</td><td>Limites des travaux privatifs, rôle de la copropriété, attentes de confort et d'économies.</td></tr>
<tr><td><strong>SCI Les Tilleuls</strong></td><td>Propriétaire d'un immeuble de bureaux de 1 200 m² loué à plusieurs entreprises</td><td>Vente B2B, décret tertiaire, décision collective, temps de retour sur investissement.</td></tr>
</table>
<h3>La journée type d'un conseiller Thermia Rénov</h3>
<ol>
<li>Réception des demandes entrantes (formulaire du site, appels de clients ayant sollicité un rappel, recommandations) et qualification par l'assistante ;</li>
<li>Préparation du rendez-vous : lecture du DPE ou de l'audit transmis, vue aérienne de la toiture, vérification de l'éligibilité probable aux aides ;</li>
<li>Rendez-vous de découverte et visite technique au domicile du client, à sa demande ;</li>
<li>Étude au bureau avec le conducteur de travaux, chiffrage, simulation des aides sur les outils officiels ;</li>
<li>Second rendez-vous de présentation de la proposition, avec remise des documents d'information ;</li>
<li>Après la signature éventuelle : respect du délai de rétractation, montage des dossiers d'aides avec le client, planification du chantier ;</li>
<li>Suivi du chantier, réception, enquête de satisfaction, demande d'avis et de recommandation.</li>
</ol>
<h3>La charte commerciale de Thermia Rénov (extrait)</h3>
<blockquote>1. Nous ne sollicitons jamais un particulier par téléphone, SMS, courriel ou réseaux sociaux pour lui proposer des travaux de rénovation énergétique.<br />2. Nous n'affirmons jamais être mandatés par l'État, l'Anah, France Rénov' ou une collectivité.<br />3. Nous ne promettons aucun montant d'aide qui n'a pas été simulé sur un outil officiel, et nous présentons toujours le reste à charge réel.<br />4. Nous remettons à chaque client nos attestations RGE et d'assurance et l'identité de nos éventuels sous-traitants.<br />5. Nous ne faisons signer aucun contrat lors d'un premier rendez-vous de découverte et nous ne percevons aucun paiement pendant les délais prévus par la loi.<br />6. Nous orientons le client vers France Rénov' chaque fois que son projet le justifie.</blockquote>
<p>Cette charte est plus exigeante que la loi sur certains points (pas de signature au premier rendez-vous par exemple) : c'est un choix d'entreprise qui sert la confiance et réduit les rétractations et les litiges.</p>
<h3>Comment le fil rouge est utilisé dans le support</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Chapitre</th><th>Situation travaillée</th></tr>
<tr><td>Chapitres 1 et 2 (C1)</td><td>Karim prépare le dossier des Ferrand : lecture du DPE, gestes pertinents, aides envisageables, règles de la vente à domicile.</td></tr>
<tr><td>Chapitre C2</td><td>Entretien de découverte avec les Ferrand et Mme Lopez ; visite technique ; premier contact avec la SCI Les Tilleuls.</td></tr>
<tr><td>Chapitre C3</td><td>Argumentaire, chiffrage du reste à charge, devis conforme pour les Ferrand ; proposition pour la SCI.</td></tr>
<tr><td>Chapitre C4</td><td>Objections des Ferrand (« c'est trop cher », « on nous a déjà arnaqués ») et de la SCI.</td></tr>
<tr><td>Chapitre C5</td><td>Plan de prospection conforme de Thermia Rénov.</td></tr>
<tr><td>Chapitre C6</td><td>Signature, rétractation, chantier, réception, fidélisation.</td></tr>
</table>
<blockquote><strong>À retenir</strong><br />Thermia Rénov est une SAS fictive de rénovation énergétique, qualifiée RGE, de 14 salariés, basée à Saint-Genis-Laval. Nadia, Karim, les Ferrand, Mme Lopez et la SCI Les Tilleuls accompagnent tout le support. Tous les chiffres du fil rouge sont fictifs. La charte commerciale de l'entreprise résume la posture attendue : aucun démarchage interdit, aucune promesse non vérifiée, transparence totale.</blockquote>
`,
      },
      {
        title: "1.8 – Quiz de fin de chapitre",
        content: `
<p>Répondez aux questions, puis consultez le corrigé.</p>
<ol>
<li><strong>La formation « Techniques de vente dans le secteur des travaux énergétiques » se conclut par :</strong><br />A. Un diplôme d'État<br />B. Une certification inscrite à un répertoire national<br />C. Une attestation de fin de formation mentionnant les résultats de l'évaluation des acquis<br />D. Aucun document</li>
<li><strong>La classe DPE d'un logement est déterminée par :</strong><br />A. La seule consommation d'énergie finale<br />B. La plus mauvaise des deux classes obtenues pour la consommation d'énergie primaire et les émissions de gaz à effet de serre<br />C. Le montant des factures du client<br />D. L'âge du logement</li>
<li><strong>Depuis le 1er janvier 2026, le coefficient de conversion de l'électricité en énergie primaire utilisé pour le DPE est de :</strong><br />A. 2,58<br />B. 2,3<br />C. 1,9<br />D. 1</li>
<li><strong>Un logement classé G ne peut plus faire l'objet d'un nouveau bail depuis :</strong><br />A. Le 1er janvier 2023<br />B. Le 1er janvier 2025<br />C. Le 1er janvier 2028<br />D. Le 1er janvier 2034</li>
<li><strong>M. Ferrand habite sa maison classée F. Karim lui dit qu'elle sera « interdite en 2028 ». Cette affirmation est :</strong><br />A. Exacte<br />B. Inexacte : le calendrier concerne la mise en location, pas l'occupation par le propriétaire<br />C. Exacte seulement s'il vend<br />D. Exacte seulement en copropriété</li>
<li><strong>Dans l'ordre logique d'une rénovation, on traite en priorité :</strong><br />A. Le système de chauffage<br />B. L'enveloppe (isolation, menuiseries, étanchéité à l'air)<br />C. Le photovoltaïque<br />D. La décoration</li>
<li><strong>Une PAC air/air :</strong><br />A. Chauffe l'eau des radiateurs<br />B. Produit l'eau chaude sanitaire<br />C. Est une climatisation réversible qui souffle de l'air chaud ou froid<br />D. Capte la chaleur du sol</li>
<li><strong>Pour estimer la performance réelle d'une PAC sur une saison, l'indicateur le plus pertinent est :</strong><br />A. Le COP catalogue à +7 °C<br />B. Le SCOP ou l'ETAS<br />C. La puissance électrique<br />D. Le poids de l'unité extérieure</li>
<li><strong>La mention RGE :</strong><br />A. Couvre automatiquement tous les travaux de l'entreprise<br />B. Est attachée à une qualification pour un domaine de travaux précis<br />C. Est délivrée à vie<br />D. N'a aucun lien avec les aides</li>
<li><strong>Depuis le 1er janvier 2026, pour les travaux financés par certaines aides publiques, la sous-traitance est limitée à :</strong><br />A. Un rang<br />B. Deux rangs<br />C. Trois rangs<br />D. Aucune limite</li>
</ol>
<h4>Corrigé</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>C</td><td>La formation est non certifiante ; l'évaluation est interne et l'attestation précise les objectifs, la nature, la durée et les résultats de l'évaluation des acquis (article L. 6353-1 du code du travail).</td></tr>
<tr><td>2</td><td>B</td><td>Double seuil : énergie primaire et gaz à effet de serre ; la classe retenue est la plus défavorable.</td></tr>
<tr><td>3</td><td>C</td><td>Arrêté du 13 août 2025, applicable aux DPE et audits réalisés à partir du 1er janvier 2026 (le coefficient était auparavant de 2,3).</td></tr>
<tr><td>4</td><td>B</td><td>Calendrier de la loi Climat et résilience : G en 2025, F en 2028, E en 2034, sous réserve d'évolutions législatives à vérifier.</td></tr>
<tr><td>5</td><td>B</td><td>L'interdiction vise la mise en location. Présenter le contraire à un propriétaire occupant est une pratique commerciale trompeuse.</td></tr>
<tr><td>6</td><td>B</td><td>On réduit d'abord les besoins, puis on dimensionne les équipements sur les besoins réduits.</td></tr>
<tr><td>7</td><td>C</td><td>La PAC air/air ne produit ni eau de chauffage ni eau chaude sanitaire ; elle est en principe exclue de MaPrimeRénov'.</td></tr>
<tr><td>8</td><td>B</td><td>Le COP est mesuré dans des conditions d'essai ponctuelles ; SCOP et ETAS reflètent une saison entière.</td></tr>
<tr><td>9</td><td>B</td><td>La qualification est délivrée par domaine, pour une durée limitée, avec des audits de chantier ; elle conditionne l'accès aux aides.</td></tr>
<tr><td>10</td><td>B</td><td>Mesure de la loi n° 2025-594 du 30 juin 2025 ; à partir du 1er janvier 2027, l'entreprise qui facture devra aussi être RGE.</td></tr>
</table>
`,
      },
      {
        title: "1.9 – Cas pratique : préparer le premier rendez-vous chez M. et Mme Ferrand",
        content: `
<h3>Contexte</h3>
<p>M. et Mme Ferrand, 61 et 58 ans, ont rempli le formulaire du site de Thermia Rénov après avoir lu un article de France Rénov' sur le remplacement des chaudières au fioul. Ils ont demandé à être rappelés pour fixer un rendez-vous. Leur maison de 1978 (115 m² habitables sur deux niveaux, Rhône) est chauffée par une chaudière fioul de 1997 alimentant des radiateurs en fonte au rez-de-chaussée et en acier à l'étage. L'eau chaude est produite par la chaudière. Les combles perdus ont reçu 8 cm de laine de verre à la construction. Les fenêtres sont en double vitrage de 1995. Il n'y a pas de VMC, seulement des grilles d'aération. Leur DPE, réalisé l'an dernier lors d'un projet de vente finalement abandonné, classe la maison en F. Ils consomment environ 2 300 litres de fioul par an (données fictives).</p>
<p>Karim prépare le rendez-vous. Il a noté dans le CRM : « Clients chauds, PAC à vendre, leur dire que la maison sera interdite s'ils ne font rien et qu'avec les aides tout sera presque gratuit. Signature dès le premier rendez-vous si possible. »</p>
<h3>Consigne</h3>
<ol>
<li>Relevez les erreurs de Karim dans sa note et expliquez pourquoi chacune est problématique.</li>
<li>Listez les documents et informations à demander aux Ferrand avant ou pendant le rendez-vous.</li>
<li>À partir des informations disponibles, identifiez les gestes de travaux à étudier et l'ordre logique dans lequel les présenter.</li>
<li>Rédigez trois phrases simples que Karim pourra utiliser pour expliquer le DPE aux Ferrand.</li>
<li>Indiquez les vérifications internes à faire chez Thermia Rénov avant d'envoyer Karim au rendez-vous.</li>
</ol>
<h3>Corrigé détaillé</h3>
<h4>1. Les erreurs de la note de Karim</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Erreur</th><th>Pourquoi c'est un problème</th></tr>
<tr><td>« PAC à vendre » avant tout diagnostic</td><td>On ne choisit pas la solution avant d'avoir compris le besoin et le logement. Avec des combles quasi non isolés, une PAC dimensionnée sur l'état actuel serait surdimensionnée ; l'ordre logique commence par l'enveloppe.</td></tr>
<tr><td>« La maison sera interdite »</td><td>Faux : le calendrier de décence énergétique concerne la location. Les Ferrand sont propriétaires occupants. C'est une pratique commerciale trompeuse, typique des entreprises frauduleuses.</td></tr>
<tr><td>« Tout sera presque gratuit »</td><td>Aucune simulation n'a été faite ; les aides dépendent des revenus, du parcours choisi, des gestes et des règles en vigueur. Promettre la quasi-gratuité expose à un litige et ruine la confiance quand le reste à charge réel apparaît.</td></tr>
<tr><td>« Signature dès le premier rendez-vous »</td><td>Contraire à la charte de Thermia Rénov ; pression incompatible avec une décision de cette importance ; augmente le risque de rétractation et de plainte. La signature viendra après la présentation d'une proposition étudiée.</td></tr>
<tr><td>« Clients chauds »</td><td>Pas une erreur juridique, mais un biais : les Ferrand se renseignent. Ils attendent du conseil, pas de la pression.</td></tr>
</table>
<h4>2. Documents et informations à demander</h4>
<ul>
<li>Le DPE complet (pas seulement l'étiquette), et s'il existe l'audit énergétique réalisé lors du projet de vente ;</li>
<li>Les factures de fioul et d'électricité des deux ou trois dernières années ;</li>
<li>Le dernier avis d'imposition (uniquement au moment de la simulation des aides, avec l'accord du client, et sans en conserver de copie au-delà du nécessaire) ;</li>
<li>Les plans ou au moins les surfaces par niveau ; l'âge et l'état des radiateurs ; l'existence d'un projet de travaux (toiture, façade) ;</li>
<li>Leurs attentes : confort, économies, durée de projet dans la maison, budget, contraintes (bruit, esthétique, encombrement).</li>
</ul>
<h4>3. Gestes à étudier et ordre logique</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Ordre</th><th>Geste</th><th>Justification</th></tr>
<tr><td>1</td><td>Isolation des combles perdus (renforcement)</td><td>8 cm d'isolant ancien : la toiture est probablement le premier poste de déperdition ; geste simple et rentable.</td></tr>
<tr><td>2</td><td>Étude de l'isolation des murs et du plancher bas</td><td>Maison de 1978 : murs probablement peu isolés ; à examiner selon le DPE et le budget, éventuellement dans une rénovation d'ampleur.</td></tr>
<tr><td>3</td><td>Ventilation</td><td>Pas de VMC : indispensable dès que l'on améliore l'étanchéité.</td></tr>
<tr><td>4</td><td>Remplacement de la chaudière fioul par une PAC air/eau</td><td>Dimensionnée après isolation ; vérifier la compatibilité des radiateurs fonte et acier (température d'eau nécessaire) ; dépose et neutralisation de la cuve.</td></tr>
<tr><td>5</td><td>Eau chaude sanitaire</td><td>Par la PAC (ballon) ou par un CET selon la configuration.</td></tr>
</table>
<p>Karim présentera deux scénarios à étudier : un scénario par étapes et un scénario de rénovation d'ampleur, dont l'intérêt sera évalué au chapitre 2 au regard des aides.</p>
<h4>4. Trois phrases pour expliquer le DPE</h4>
<ul>
<li>« Votre DPE classe la maison en F : cela veut dire qu'elle consomme beaucoup d'énergie pour se chauffer par rapport à une maison récente, ce qui ne vous oblige à rien tant que vous l'habitez. »</li>
<li>« Le document montre par où passe la chaleur ; chez vous, la toiture et le renouvellement d'air sont des pistes à vérifier en priorité. »</li>
<li>« Les montants de facture du DPE sont des estimations dans des conditions standard ; pour parler de vos économies, nous partirons de vos vraies factures. »</li>
</ul>
<h4>5. Vérifications internes avant le rendez-vous</h4>
<ul>
<li>Qualifications RGE de Thermia Rénov valides pour l'isolation des combles, les PAC et la ventilation (si ce domaine est couvert), jusqu'à la date prévisible des travaux ;</li>
<li>Attestations d'assurance décennale à jour, à remettre au client ;</li>
<li>Règles d'aides en vigueur à la date du rendez-vous (france-renov.gouv.fr, service-public.fr) ;</li>
<li>Documentation à remettre : plaquette, charte, liste des sous-traitants éventuels, information sur France Rénov' ;</li>
<li>Rendez-vous confirmé par écrit, à la demande des clients (preuve qu'il ne s'agit pas d'un démarchage).</li>
</ul>
<h3>Ce que le formateur évaluera</h3>
<p>Lors de la mise en situation, le formateur observera votre capacité à préparer un rendez-vous sans préjuger de la solution, à expliquer un DPE en termes simples et exacts, à proposer un ordre de travaux cohérent et à écarter toute affirmation trompeuse. Ces critères figurent dans la grille de l'évaluation finale du jour 5.</p>
`,
      },
    ],
  },
  {
    title: "Chapitre 2 – Les aides financières et le cadre juridique de la vente de travaux énergétiques (C1)",
    description: "Présenter avec exactitude les aides à la rénovation énergétique (MaPrimeRénov' par geste et accompagné avec Mon Accompagnateur Rénov', certificats d'économies d'énergie, éco-prêt à taux zéro, TVA à taux réduit, aides locales), calculer un reste à charge prudent, puis maîtriser le cadre juridique de la vente : lutte contre la fraude, interdiction du démarchage, contrat hors établissement et droit de rétractation, obligations d'information, mentions du devis et éthique commerciale.",
    sections: [
      {
        title: "2.1 – Panorama des aides et MaPrimeRénov'",
        content: `
<h3>Une règle d'or avant tout : vérifier, simuler, dater</h3>
<p>Les aides à la rénovation énergétique sont nombreuses, cumulables sous conditions et <strong>modifiées très souvent</strong> : lois de finances annuelles, décrets, arrêtés, ouverture ou suspension temporaire de guichets, nouvelles fiches CEE. En 2025 et 2026, MaPrimeRénov' a ainsi connu une suspension temporaire du dépôt des dossiers de rénovation d'ampleur, puis plusieurs resserrements de la liste des gestes financés. Un commercial qui « connaît les aides par cœur » se trompe donc tôt ou tard. Le bon réflexe est différent :</p>
<ol>
<li><strong>Vérifier</strong> les règles en vigueur sur les sources officielles : france-renov.gouv.fr, maprimerenov.gouv.fr, service-public.fr, anah.gouv.fr, ecologie.gouv.fr (pour les CEE), impots.gouv.fr (pour la TVA) ;</li>
<li><strong>Simuler</strong> avec le client, sur un outil officiel (le simulateur de France Rénov' notamment) ou avec les données exactes de ses revenus ;</li>
<li><strong>Dater</strong> et tracer : la simulation remise au client indique sa date et précise qu'elle constitue une estimation, l'octroi définitif relevant de l'organisme instructeur.</li>
</ol>
<blockquote><strong>Barèmes :</strong> ce support ne reproduit volontairement aucun montant d'aide ni aucun plafond de ressources, car ces chiffres changent. Pour chaque dispositif, le barème en vigueur est à vérifier sur france-renov.gouv.fr ou service-public.fr le jour de la proposition.</blockquote>
<h3>Vue d'ensemble des dispositifs</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Dispositif</th><th>Nature</th><th>Financé / géré par</th><th>Condition clé pour le commercial</th></tr>
<tr><td>MaPrimeRénov' (par geste, parcours accompagné, copropriété)</td><td>Subvention</td><td>État, instruite et versée par l'Anah</td><td>Demande déposée <strong>avant</strong> le début des travaux ; entreprise RGE ; conditions de logement et de ressources.</td></tr>
<tr><td>Certificats d'économies d'énergie (primes CEE, « Coup de pouce »)</td><td>Prime ou remise</td><td>Fournisseurs d'énergie dits « obligés » et leurs délégataires</td><td>Offre de prime formalisée <strong>avant la signature du devis</strong> ; entreprise RGE ; respect de la fiche d'opération.</td></tr>
<tr><td>Éco-prêt à taux zéro (éco-PTZ)</td><td>Prêt sans intérêts</td><td>Banques ayant signé une convention avec l'État</td><td>Entreprise RGE ; résidence principale ; dossier accepté par la banque.</td></tr>
<tr><td>TVA à 5,5 %</td><td>Taux réduit appliqué directement sur la facture</td><td>Administration fiscale</td><td>Travaux d'amélioration de la qualité énergétique éligibles dans un logement achevé depuis plus de deux ans.</td></tr>
<tr><td>Aides locales</td><td>Subventions, primes, prêts</td><td>Régions, départements, métropoles, communes</td><td>Conditions propres à chaque collectivité ; souvent dépôt préalable obligatoire.</td></tr>
<tr><td>Autres dispositifs</td><td>Prêt avance rénovation, aides de caisses de retraite ou d'Action Logement selon les périodes, exonérations de taxe foncière décidées localement</td><td>Variables</td><td>À vérifier au cas par cas ; ne jamais les présenter comme acquis.</td></tr>
</table>
<p>Rappel : le crédit d'impôt pour la transition énergétique (CITE) <strong>n'existe plus</strong> ; il a été remplacé par MaPrimeRénov'. Un client qui en parle a des informations anciennes : corrigez avec tact.</p>
<h3>France Rénov' : le premier réflexe à conseiller</h3>
<p>France Rénov' est le service public de la rénovation de l'habitat. Ses conseillers, présents dans des espaces conseil sur tout le territoire, informent <strong>gratuitement et de manière neutre</strong> les ménages sur les travaux, les aides et les démarches. Pour certains parcours, un contact préalable avec France Rénov' est même devenu une étape obligatoire. Orienter vos clients vers France Rénov' n'est pas une perte de temps : c'est un gage de sérieux, et la loi du 30 juin 2025 impose désormais de faire figurer une mention de France Rénov' sur les supports de promotion des offres de rénovation énergétique (article L. 122-26 du code de la consommation, tel que présenté par l'ANIL).</p>
<h3>MaPrimeRénov' : les principes stables</h3>
<ul>
<li><strong>Bénéficiaires</strong> : principalement les propriétaires occupants ; les propriétaires bailleurs sous conditions (engagement de location) ; les copropriétés via MaPrimeRénov' Copropriété pour les parties communes.</li>
<li><strong>Logement</strong> : résidence principale, achevée depuis un nombre minimal d'années fixé par les textes (en règle générale au moins 15 ans, avec des exceptions ponctuelles) ; occupée au moins huit mois par an.</li>
<li><strong>Revenus</strong> : les ménages sont répartis en quatre catégories selon leur revenu fiscal de référence et la composition du foyer, avec des plafonds différents en Île-de-France et dans les autres régions : très modestes (souvent appelés « bleu »), modestes (« jaune »), intermédiaires (« violet ») et supérieurs (« rose »). Les plafonds sont révisés chaque année.</li>
<li><strong>Calendrier</strong> : la demande est déposée par le ménage (ou son mandataire) sur maprimerenov.gouv.fr <strong>avant le commencement des travaux</strong>, sur la base de devis ; l'aide est versée après les travaux, sur facture, sauf avance prévue pour certains ménages.</li>
<li><strong>Entreprise</strong> : titulaire de la qualification RGE pour les travaux concernés.</li>
<li><strong>Contrôles</strong> : l'Anah peut contrôler le dossier et le chantier, avant ou après le versement ; une fausse déclaration entraîne le retrait et le remboursement de l'aide, voire des poursuites.</li>
</ul>
<h3>Les deux parcours pour une maison individuelle</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Parcours par geste</th><th>Parcours accompagné (rénovation d'ampleur)</th></tr>
<tr><td>Logique</td><td>Financement forfaitaire d'un ou plusieurs gestes isolés</td><td>Financement d'un projet global permettant un gain énergétique important, en pourcentage du montant des travaux dans la limite d'un plafond</td></tr>
<tr><td>Ménages éligibles</td><td>Selon les catégories de revenus fixées pour l'année (certaines catégories en sont exclues)</td><td>Toutes catégories, avec des taux de financement décroissants selon les revenus</td></tr>
<tr><td>Travaux</td><td>Liste limitative de gestes, fortement resserrée en 2026 : l'isolation des murs en a été retirée au 1er janvier 2026, et une réforme applicable au 1er septembre 2026 a retiré d'autres gestes (notamment isolation des combles et toitures, menuiseries, ventilation, chauffe-eau thermodynamiques et solaires, certains appareils au bois) et exclu les systèmes avec appoint fossile ; les PAC air/eau et géothermiques y restent selon les informations publiées à cette date</td><td>Bouquet de travaux défini à partir d'un audit, comportant notamment des gestes d'isolation, avec un objectif de gain d'au moins deux classes de DPE ; conditions sur l'étiquette de départ et sur l'abandon des énergies fossiles après travaux, à vérifier</td></tr>
<tr><td>Accompagnement</td><td>Non obligatoire</td><td><strong>Obligatoire</strong> par un opérateur agréé Mon Accompagnateur Rénov'</td></tr>
<tr><td>Audit</td><td>Non obligatoire</td><td>Obligatoire, intégré à l'accompagnement</td></tr>
<tr><td>Intérêt pour le client</td><td>Simplicité, rapidité, petit budget</td><td>Gain de confort et de valeur important, financement plus élevé, accompagnement de bout en bout</td></tr>
</table>
<p><em>La liste des gestes éligibles, les conditions d'entrée et les taux changent : ce tableau présente la logique des deux parcours et l'état des informations publiques au 2e semestre 2026 ; vérifiez systématiquement la liste en vigueur sur france-renov.gouv.fr avant tout rendez-vous.</em></p>
<h3>Mon Accompagnateur Rénov'</h3>
<p><strong>Mon Accompagnateur Rénov'</strong> est un opérateur (structure publique, bureau d'études, architecte, opérateur de l'habitat…) <strong>agréé par l'Anah</strong>, obligatoire dans le parcours accompagné. Il accompagne le ménage de l'évaluation de son logement à la fin des travaux :</p>
<ul>
<li>visite du logement et réalisation (ou appui sur) l'audit énergétique ;</li>
<li>définition du projet de travaux et du plan de financement ;</li>
<li>aide à la lecture et à la comparaison des devis, sans choisir l'entreprise à la place du ménage ;</li>
<li>aide au montage du dossier d'aides ;</li>
<li>visite de fin de travaux et vérification de leur cohérence avec le projet.</li>
</ul>
<p>Le dispositif repose sur l'<strong>indépendance</strong> de l'accompagnateur vis-à-vis des entreprises qui réalisent les travaux. La loi du 30 juin 2025 a renforcé les contrôles : l'agrément peut être suspendu à titre conservatoire, et l'Anah peut prononcer des sanctions financières. Pour vous, commercial, cela signifie :</p>
<ul>
<li>ne jamais présenter votre entreprise comme « l'accompagnateur » du client si elle n'est pas agréée et indépendante ;</li>
<li>ne jamais orienter un client vers un accompagnateur avec lequel vous auriez un arrangement commercial ;</li>
<li>collaborer de façon transparente : fournir des devis précis, répondre aux questions techniques de l'accompagnateur, respecter le projet validé.</li>
</ul>
<blockquote><strong>Exemple fil rouge (fictif) :</strong> les Ferrand hésitent entre un parcours par geste (PAC air/eau seule) et une rénovation d'ampleur. Karim explique les deux logiques, remet la liste des espaces France Rénov' et la liste des accompagnateurs agréés du département, et propose de chiffrer les travaux une fois le projet défini avec l'accompagnateur choisi par les Ferrand. Nadia valide : Thermia Rénov ne se substitue jamais à l'accompagnateur.</blockquote>
<h3>MaPrimeRénov' Copropriété et cas des bailleurs</h3>
<p>Pour Mme Lopez, propriétaire en copropriété, deux niveaux coexistent : les travaux sur les <strong>parties communes</strong> (isolation des façades et de la toiture, chaufferie collective) relèvent de la copropriété, votés en assemblée générale et pouvant être aidés par MaPrimeRénov' Copropriété ; les travaux sur les <strong>parties privatives</strong> (fenêtres, équipements individuels) relèvent du copropriétaire, sous réserve du règlement de copropriété et des autorisations nécessaires. Les propriétaires bailleurs peuvent bénéficier de certaines aides sous condition d'engagement de location ; leur fiscalité (régime réel, déficit foncier) est à voir avec leur conseiller fiscal.</p>
<blockquote><strong>À retenir</strong><br />Les aides changent souvent : vérifier, simuler sur un outil officiel, dater. MaPrimeRénov' est versée par l'Anah après travaux, sur une demande déposée avant leur début, avec une entreprise RGE. Le parcours par geste a été fortement resserré en 2026 ; le parcours accompagné finance une rénovation d'ampleur avec un gain d'au moins deux classes et un Mon Accompagnateur Rénov' agréé et indépendant. Orienter le client vers France Rénov' est un gage de sérieux.</blockquote>
`,
      },
      {
        title: "2.2 – CEE, éco-PTZ, TVA à taux réduit et aides locales",
        content: `
<h3>Les certificats d'économies d'énergie (CEE)</h3>
<p>Le dispositif des CEE oblige les fournisseurs d'énergie (électricité, gaz, fioul, carburants…), appelés <strong>« obligés »</strong>, à réaliser ou faire réaliser des économies d'énergie. Ils financent donc des travaux chez les ménages et les entreprises, sous forme de <strong>primes</strong>, de remises sur facture ou de bons d'achat. Ils peuvent agir directement ou via des <strong>délégataires</strong> et des partenaires (enseignes, plateformes, installateurs).</p>
<ul>
<li><strong>Périodes</strong> : le dispositif fonctionne par périodes pluriannuelles. La sixième période court du 1er janvier 2026 au 31 décembre 2030 (décret n° 2025-1048 du 30 octobre 2025), avec une obligation annuelle en hausse et une part réservée aux ménages en situation de précarité énergétique.</li>
<li><strong>Fiches d'opérations standardisées</strong> : chaque type de travaux (isolation des combles, PAC, chauffe-eau thermodynamique, etc.) fait l'objet d'une fiche fixant les exigences techniques et le volume d'économies forfaitaire. Les primes « Coup de pouce » sont des bonifications temporaires sur certains gestes.</li>
<li><strong>Montant</strong> : librement fixé par l'obligé ou le délégataire, il varie d'un acteur à l'autre et dans le temps. Il dépend aussi de la situation de revenus du ménage (précarité) et de la zone climatique.</li>
</ul>
<h3>Le « rôle actif et incitatif » : la règle que les commerciaux oublient</h3>
<p>Pour qu'une prime CEE soit valable, l'obligé (ou son délégataire) doit avoir joué un <strong>rôle actif et incitatif</strong> dans la décision du client, ce qui se traduit concrètement par un engagement formalisé (offre de prime acceptée) <strong>antérieur à la signature du devis</strong>. Un devis signé avant cette formalisation fait perdre la prime au client.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Ce qui se passe</th><th>Erreur à éviter</th></tr>
<tr><td>1. Choix du partenaire CEE</td><td>Le client accepte l'offre de prime d'un obligé ou d'un délégataire (souvent proposée par l'entreprise de travaux, partenaire d'un délégataire)</td><td>Ne pas informer le client qu'il peut comparer les offres.</td></tr>
<tr><td>2. Signature du devis</td><td>Après l'engagement CEE ; le devis respecte les exigences de la fiche</td><td>Signer le devis avant l'offre de prime.</td></tr>
<tr><td>3. Travaux</td><td>Réalisés par l'entreprise RGE</td><td>Poser un produit ne respectant pas la performance exigée.</td></tr>
<tr><td>4. Facture et attestation sur l'honneur</td><td>Le client et l'entreprise signent l'attestation après travaux</td><td>Faire signer l'attestation avant la fin des travaux ou avec des informations inexactes.</td></tr>
<tr><td>5. Contrôle éventuel</td><td>Contrôles sur site ou par contact du bénéficiaire, renforcés sur certains gestes</td><td>Considérer le dossier clos au versement de la prime.</td></tr>
</table>
<p>Dans le parcours accompagné de MaPrimeRénov', les règles de cumul et de valorisation des CEE sont propres au dispositif : vérifiez-les avec l'accompagnateur avant de faire figurer une prime CEE dans le plan de financement.</p>
<h3>L'éco-prêt à taux zéro (éco-PTZ)</h3>
<p>L'éco-PTZ est un <strong>prêt sans intérêts</strong>, accordé sans condition de ressources par les banques ayant passé une convention avec l'État, pour financer des travaux de rénovation énergétique d'une résidence principale.</p>
<ul>
<li><strong>Logement</strong> : résidence principale (occupée par le propriétaire ou mise en location), achevée depuis plus de deux ans à la date de début des travaux ;</li>
<li><strong>Travaux</strong> : réalisés par une entreprise RGE, dans une liste d'actions éligibles, ou dans le cadre d'une rénovation atteignant une performance globale minimale ; il existe aussi un éco-PTZ couplé à MaPrimeRénov' et un éco-PTZ copropriété ;</li>
<li><strong>Montant et durée</strong> : plafonnés selon le nombre et la nature des actions financées, avec un plafond le plus élevé (jusqu'à 50 000 euros selon les règles publiées) pour les rénovations les plus performantes ; durée de remboursement maximale variable selon le cas ;</li>
<li><strong>Calendrier</strong> : dispositif prolongé à plusieurs reprises ; la date limite d'émission des offres de prêt et les montants sont à vérifier sur service-public.fr ;</li>
<li><strong>Décision</strong> : la banque reste libre d'accorder ou non le prêt selon la capacité de remboursement du client.</li>
</ul>
<p>L'éco-PTZ est particulièrement utile pour financer le <strong>reste à charge</strong> et pour les gestes qui ne sont plus financés par MaPrimeRénov' par geste, à condition qu'ils restent éligibles au prêt. Ne présentez jamais l'éco-PTZ comme acquis : vous n'êtes pas banquier et ne pouvez pas promettre un accord de crédit.</p>
<h3>Le prêt avance rénovation</h3>
<p>Le <strong>prêt avance rénovation</strong> est un prêt hypothécaire destiné en priorité aux ménages aux revenus modestes, notamment les personnes âgées : le capital et, selon les cas, les intérêts sont remboursés lors de la vente du logement ou de la succession. Il permet de financer le reste à charge sans mensualités. Seules certaines banques le distribuent ; c'est un produit à évoquer avec prudence, en orientant vers le conseiller France Rénov' ou la banque.</p>
<h3>La TVA à taux réduit</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Taux</th><th>Travaux concernés (principe)</th><th>Texte</th></tr>
<tr><td><strong>5,5 %</strong></td><td>Travaux d'amélioration de la qualité énergétique (isolation, équipements de chauffage et d'eau chaude utilisant des énergies renouvelables, etc.) respectant des caractéristiques techniques minimales, ainsi que les travaux induits qui leur sont indissociablement liés, dans des locaux à usage d'habitation achevés depuis plus de deux ans</td><td>Article 278-0 bis A du code général des impôts</td></tr>
<tr><td>10 %</td><td>Autres travaux d'amélioration, de transformation, d'aménagement et d'entretien des logements achevés depuis plus de deux ans, hors exceptions</td><td>Article 279-0 bis du code général des impôts</td></tr>
<tr><td>20 %</td><td>Taux normal : constructions neuves, locaux non affectés à l'habitation, certains équipements exclus</td><td>Droit commun</td></tr>
</table>
<p>Le taux réduit est appliqué directement par l'entreprise sur sa facture. Le client doit certifier que les conditions sont réunies (âge et usage du logement, nature des travaux) selon les modalités prévues par l'administration fiscale (attestation ou mention sur le devis ou la facture, selon les règles en vigueur, à vérifier sur impots.gouv.fr). Point de vigilance : un même devis peut comporter plusieurs taux (par exemple 5,5 % pour l'isolation et 10 % pour des travaux de finition non indissociables). L'entreprise qui applique à tort un taux réduit s'expose à un redressement.</p>
<p>Pour le photovoltaïque, les règles de TVA sont spécifiques (conditions de puissance et de caractéristiques fixées par la loi de finances) : vérifiez-les à chaque devis.</p>
<h3>Les aides locales</h3>
<p>Régions, départements, métropoles, intercommunalités et communes proposent souvent leurs propres aides : primes complémentaires à MaPrimeRénov', aides à l'audit, bonus pour matériaux biosourcés, prêts bonifiés, accompagnement renforcé, exonération temporaire de taxe foncière votée par la commune pour certains logements rénovés. Par exemple, la Métropole de Lyon, territoire d'intervention de Thermia Rénov, a développé un dispositif d'aide à la rénovation des logements (Écoréno'v) : ses conditions, comme celles de toute aide locale, sont à vérifier sur le site de la collectivité.</p>
<ul>
<li>Consultez le simulateur de France Rénov', qui intègre une partie des aides locales, et l'espace conseil France Rénov' du territoire ;</li>
<li>Vérifiez si la demande doit être déposée <strong>avant</strong> la signature du devis ou le début des travaux ;</li>
<li>Vérifiez les règles de cumul avec les aides nationales ;</li>
<li>Gardez une veille : les budgets locaux sont parfois épuisés en cours d'année.</li>
</ul>
<h3>Et pour les professionnels (B2B) ?</h3>
<p>MaPrimeRénov' et l'éco-PTZ concernent les logements. Pour la SCI Les Tilleuls et les clients tertiaires, les leviers sont différents : primes CEE sur des fiches tertiaires, aides de l'ADEME ou des régions selon les appels à projets, dispositifs fiscaux d'amortissement, financement par tiers investisseur ou contrat de performance énergétique. Le raisonnement se fait en <strong>coût global</strong> et en temps de retour, en intégrant l'obligation du décret tertiaire.</p>
<blockquote><strong>À retenir</strong><br />Les CEE sont financés par les fournisseurs d'énergie (sixième période 2026-2030) et exigent un engagement de prime antérieur à la signature du devis. L'éco-PTZ est un prêt sans intérêts, sans condition de ressources, accordé par la banque. La TVA à 5,5 % s'applique aux travaux d'amélioration énergétique éligibles dans un logement de plus de deux ans (article 278-0 bis A du CGI). Les aides locales complètent le plan de financement. Aucun montant n'est promis : tout est simulé et vérifié.</blockquote>
`,
      },
      {
        title: "2.3 – Cumul des aides, reste à charge et présentation du plan de financement",
        content: `
<h3>Les règles générales de cumul</h3>
<p>Les aides peuvent en principe se cumuler, mais dans certaines limites :</p>
<ul>
<li><strong>Écrêtement</strong> : pour MaPrimeRénov', le total des aides publiques et des primes CEE perçues pour les mêmes travaux ne peut pas dépasser un pourcentage de la dépense éligible, plus élevé pour les ménages aux revenus les plus modestes. Si le cumul dépasse ce plafond, MaPrimeRénov' est réduite d'autant. Les pourcentages sont fixés par les textes et à vérifier sur france-renov.gouv.fr.</li>
<li><strong>Plafonds de dépenses</strong> : chaque aide ne finance la dépense que dans la limite d'un plafond (par geste ou par projet).</li>
<li><strong>Interdictions de double financement</strong> : certaines aides ne peuvent pas financer les mêmes postes ; dans le parcours accompagné, les règles de cumul sont propres au dispositif.</li>
<li><strong>Calendrier</strong> : chaque aide a sa propre chronologie (avant devis, avant travaux, après travaux). Un oubli de calendrier fait perdre l'aide.</li>
</ul>
<h3>La chronologie type d'un dossier aidé</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Action</th><th>Qui</th></tr>
<tr><td>1</td><td>Information, conseil France Rénov', éventuel accompagnateur</td><td>Client (sur conseil du commercial)</td></tr>
<tr><td>2</td><td>Visite technique, étude, simulation des aides sur outil officiel</td><td>Entreprise et client</td></tr>
<tr><td>3</td><td>Engagement CEE (offre de prime acceptée)</td><td>Client et obligé / délégataire</td></tr>
<tr><td>4</td><td>Devis détaillé conforme, remise des informations précontractuelles</td><td>Entreprise</td></tr>
<tr><td>5</td><td>Dépôt de la demande MaPrimeRénov' et des aides locales (avant travaux)</td><td>Client ou son mandataire déclaré</td></tr>
<tr><td>6</td><td>Signature du contrat, délai de rétractation, demande d'éco-PTZ à la banque</td><td>Client, entreprise, banque</td></tr>
<tr><td>7</td><td>Travaux après accord (ou au minimum après dépôt, selon les règles de l'aide)</td><td>Entreprise</td></tr>
<tr><td>8</td><td>Réception, facture, attestations, demande de paiement des aides</td><td>Entreprise et client</td></tr>
<tr><td>9</td><td>Versement des aides, contrôles éventuels</td><td>Organismes</td></tr>
</table>
<p>La bonne pratique la plus sûre consiste à attendre l'<strong>accord écrit</strong> de MaPrimeRénov' avant de démarrer les travaux, même lorsque les textes autorisent le démarrage après le simple dépôt : en cas de refus, le client n'est pas exposé.</p>
<h3>Calculer un reste à charge honnête</h3>
<p>Le <strong>reste à charge</strong> est la somme que le client paiera réellement, après déduction des aides. La formule est simple ; c'est la rigueur des hypothèses qui fait la différence :</p>
<blockquote>Reste à charge = coût total TTC des travaux – aides dont l'obtention est raisonnablement attendue (MaPrimeRénov' + prime CEE + aides locales)</blockquote>
<p>Règles de présentation :</p>
<ul>
<li>Partir du <strong>TTC</strong>, avec le bon taux de TVA ;</li>
<li>Ne retenir que des aides <strong>simulées</strong> à partir des revenus réels du ménage et des règles en vigueur ;</li>
<li>Distinguer le reste à charge (ce que coûte le projet) du <strong>besoin de trésorerie</strong> (ce que le client doit avancer avant le versement des aides) ;</li>
<li>Présenter séparément le <strong>financement</strong> du reste à charge (épargne, éco-PTZ, prêt travaux) ;</li>
<li>Indiquer par écrit que les aides sont des estimations, sous réserve d'acceptation par les organismes.</li>
</ul>
<h3>Exemple chiffré (données entièrement fictives)</h3>
<p>Les montants ci-dessous sont <strong>inventés pour l'exercice</strong> et ne correspondent à aucun barème réel. Ils servent uniquement à s'entraîner à la présentation d'un plan de financement.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Poste</th><th>Montant fictif</th></tr>
<tr><td>Isolation des combles perdus (TVA 5,5 %)</td><td>3 200 euros TTC</td></tr>
<tr><td>PAC air/eau avec ballon d'eau chaude, dépose de la chaudière et neutralisation de la cuve (TVA 5,5 %)</td><td>16 800 euros TTC</td></tr>
<tr><td><strong>Total des travaux</strong></td><td><strong>20 000 euros TTC</strong></td></tr>
<tr><td>Aide A issue de la simulation officielle (hypothèse fictive)</td><td>- 5 000 euros</td></tr>
<tr><td>Prime CEE proposée par le délégataire (hypothèse fictive)</td><td>- 3 500 euros</td></tr>
<tr><td>Aide locale (hypothèse fictive)</td><td>- 1 000 euros</td></tr>
<tr><td><strong>Reste à charge estimé</strong></td><td><strong>10 500 euros</strong></td></tr>
<tr><td>Besoin de trésorerie avant versement des aides (hors prime CEE déduite sur facture dans cet exemple)</td><td>16 500 euros, dont 6 000 euros remboursés au versement des aides</td></tr>
</table>
<h3>Estimer les économies et le temps de retour avec prudence</h3>
<p>Le <strong>temps de retour simple</strong> se calcule ainsi : reste à charge divisé par l'économie annuelle estimée. Pour l'économie annuelle, partez des consommations réelles (factures), appliquez un gain prudent issu d'une étude ou de l'audit, et valorisez-le au prix actuel de l'énergie, en précisant que ce prix peut évoluer à la hausse comme à la baisse.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Bonne pratique</th><th>Mauvaise pratique</th></tr>
<tr><td>« Sur la base de vos factures et de l'étude, l'économie estimée se situe entre X et Y euros par an, au prix actuel de l'énergie. »</td><td>« Vous allez diviser votre facture par quatre. »</td></tr>
<tr><td>Présenter une fourchette et les hypothèses (température de consigne, occupation, prix de l'énergie)</td><td>Présenter un chiffre unique sans hypothèse</td></tr>
<tr><td>Intégrer l'entretien annuel et l'éventuelle hausse d'abonnement électrique</td><td>Oublier les coûts nouveaux</td></tr>
<tr><td>Mentionner les bénéfices non financiers (confort, valeur du bien, santé)</td><td>Tout ramener à la rentabilité</td></tr>
</table>
<p>Avec les chiffres fictifs ci-dessus, si l'économie annuelle prudente est estimée entre 1 300 et 1 600 euros, le temps de retour simple se situe entre 10 500 / 1 600 ≈ 6,6 ans et 10 500 / 1 300 ≈ 8,1 ans. On le présente comme une estimation, jamais comme une garantie.</p>
<h3>Le mandat administratif et financier</h3>
<p>Le client peut confier à un tiers (souvent l'entreprise ou un mandataire spécialisé) le montage de son dossier MaPrimeRénov', voire la perception de l'aide, par un <strong>mandat</strong> déclaré dans son espace personnel. Ce mandat doit être explicite, compris par le client et conforme aux règles de l'Anah. Le client doit créer lui-même son compte et garder la maîtrise de ses identifiants : ne demandez jamais ses identifiants FranceConnect ou ses mots de passe.</p>
<blockquote><strong>À retenir</strong><br />Les aides se cumulent dans la limite de plafonds et d'un écrêtement. Chaque aide a son calendrier : engagement CEE avant la signature du devis, demande MaPrimeRénov' avant les travaux. Le reste à charge part du TTC et ne retient que des aides simulées ; il se distingue du besoin de trésorerie. Économies et temps de retour se présentent en fourchettes prudentes avec leurs hypothèses.</blockquote>
`,
      },
      {
        title: "2.4 – Lutte contre la fraude et interdiction du démarchage",
        content: `
<h3>Pourquoi le législateur est intervenu</h3>
<p>Le secteur de la rénovation énergétique a été l'un des plus touchés par les pratiques frauduleuses : appels incessants promettant une « isolation à 1 euro » ou des « panneaux solaires gratuits », faux conseillers se présentant comme mandatés par l'État, travaux non conformes ou jamais réalisés, dossiers d'aides montés à l'insu des ménages, crédits affectés imposés à des personnes vulnérables. Les associations de consommateurs, la DGCCRF et l'Anah ont multiplié les alertes. Le législateur a répondu par deux lois majeures qu'un commercial du secteur doit connaître précisément.</p>
<h3>La loi n° 2020-901 du 24 juillet 2020 : la fin du démarchage téléphonique</h3>
<p>La loi n° 2020-901 du 24 juillet 2020 visant à encadrer le démarchage téléphonique et à lutter contre les appels frauduleux a inséré dans l'article L. 223-1 du code de la consommation une <strong>interdiction</strong> de la prospection commerciale par téléphone de consommateurs en vue de la vente d'équipements ou de la réalisation de travaux pour des logements visant à réaliser des économies d'énergie ou à produire des énergies renouvelables. Seule exception : les sollicitations intervenant dans le cadre de l'exécution d'un <strong>contrat en cours</strong>.</p>
<p>Concrètement, une entreprise de rénovation énergétique ne peut pas appeler un particulier qui ne l'a pas sollicitée pour lui proposer une isolation, une PAC ou des panneaux solaires, que ce particulier soit ou non inscrit sur la liste d'opposition Bloctel. L'interdiction vaut aussi lorsque l'appel est passé par un centre d'appels sous-traitant ou un « apporteur d'affaires » : l'entreprise qui en bénéficie ne peut pas s'abriter derrière son prestataire.</p>
<h3>La loi n° 2025-594 du 30 juin 2025 contre toutes les fraudes aux aides publiques</h3>
<p>Publiée au Journal officiel du 1er juillet 2025, cette loi a étendu et renforcé le dispositif. Selon les synthèses publiées par l'ANIL et les ministères :</p>
<ul>
<li><strong>Extension des canaux interdits</strong> : l'interdiction de la prospection en rénovation énergétique ne se limite plus au téléphone ; elle couvre aussi les messages envoyés par SMS et services de messagerie, par courrier électronique et par les réseaux sociaux.</li>
<li><strong>Extension des travaux concernés</strong> : à compter du 11 août 2026, l'interdiction s'étend aux travaux d'adaptation du logement à la perte d'autonomie (vieillissement, handicap).</li>
<li><strong>Consentement préalable</strong> : à compter du 11 août 2026, le démarchage téléphonique des consommateurs, tous secteurs confondus, repose sur un principe de consentement préalable, qui remplace la logique d'opposition (Bloctel) ; ce point concerne les autres activités de l'entreprise et sera repris dans le chapitre consacré à la prospection.</li>
<li><strong>Sanctions</strong> : amende administrative pouvant atteindre 75 000 euros pour une personne physique et 375 000 euros pour une personne morale en cas de démarchage interdit ; peines aggravées en cas d'abus de faiblesse.</li>
<li><strong>Obligations nouvelles</strong> : information sur le label RGE et sur les sous-traitants avant le contrat, mention de France Rénov' sur les supports publicitaires, limitation de la sous-traitance, pouvoirs renforcés de l'Anah et de la DGCCRF (suspension du label RGE ou de l'agrément Mon Accompagnateur Rénov').</li>
</ul>
<p>Le code de la consommation prévoit en outre que les contrats conclus à la suite d'un démarchage téléphonique illicite peuvent être frappés de <strong>nullité</strong>. Plusieurs mesures de la loi de 2025 dépendent de textes d'application : vérifiez leur entrée en vigueur sur service-public.fr ou sur le site de l'ANIL.</p>
<h3>Ce qui reste possible… et ce qui ne l'est pas</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Autorisé ?</th><th>Commentaire</th></tr>
<tr><td>Appeler un particulier qui a rempli le formulaire du site en demandant à être rappelé</td><td>Oui</td><td>Ce n'est pas de la prospection non sollicitée ; conservez la preuve de la demande (date, contenu, consentement au rappel).</td></tr>
<tr><td>Appeler un client dont le contrat est en cours (chantier, contrat d'entretien) pour organiser l'intervention</td><td>Oui</td><td>Exception de l'exécution d'un contrat en cours ; ne pas en profiter pour vendre d'autres travaux sans lien.</td></tr>
<tr><td>Appeler des particuliers issus d'un fichier acheté pour proposer une PAC</td><td>Non</td><td>Démarchage interdit, quel que soit le fichier.</td></tr>
<tr><td>Envoyer un SMS « Votre logement est éligible à une aide de l'État » à des numéros non clients</td><td>Non</td><td>Prospection interdite par SMS ; de plus, message trompeur.</td></tr>
<tr><td>Publier sur la page de l'entreprise une vidéo de chantier et un lien vers le formulaire de contact</td><td>Oui</td><td>Communication publicitaire ouverte, non ciblée individuellement ; la mention de France Rénov' doit figurer sur les supports de promotion selon les règles en vigueur.</td></tr>
<tr><td>Envoyer des messages privés non sollicités à des particuliers sur un réseau social pour proposer des travaux</td><td>Non</td><td>Prospection par réseau social visée par la loi de 2025.</td></tr>
<tr><td>Accueillir des visiteurs sur un stand de salon</td><td>Oui</td><td>Le client vient à vous ; règles spécifiques des contrats conclus en foire et salon (section 2.5).</td></tr>
<tr><td>Contacter par téléphone le gestionnaire d'une SCI propriétaire de bureaux</td><td>À analyser</td><td>La prospection B2B obéit à d'autres règles ; l'interdiction protège les consommateurs. Vérifiez néanmoins la qualité du contact (une SCI familiale peut être assimilée à un non-professionnel) et respectez le RGPD.</td></tr>
</table>
<p>Le démarchage physique (porte-à-porte) fait l'objet de débats et de propositions d'interdiction récurrentes ; dans tous les cas, il relève du régime protecteur des contrats hors établissement et des sanctions des pratiques agressives. La charte de Thermia Rénov l'exclut purement et simplement : l'entreprise ne se rend au domicile d'un particulier que sur sa demande.</p>
<h3>Les pratiques commerciales interdites</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Pratique</th><th>Fondement</th><th>Exemples dans le secteur</th></tr>
<tr><td>Pratique commerciale trompeuse</td><td>Articles L. 121-2 et suivants du code de la consommation</td><td>Se présenter comme mandaté par l'État, l'Anah ou France Rénov' ; promettre des aides non vérifiées ; annoncer une interdiction d'habiter ; afficher une qualification RGE inexistante ; présenter un crédit comme une aide.</td></tr>
<tr><td>Pratique commerciale agressive</td><td>Articles L. 121-6 et suivants</td><td>Sollicitations répétées et non souhaitées, refus de quitter le domicile, pression psychologique (« l'offre expire ce soir »).</td></tr>
<tr><td>Abus de faiblesse</td><td>Article L. 121-8 et suivants</td><td>Faire souscrire un engagement à une personne âgée, malade ou isolée qui n'est pas en mesure d'apprécier la portée de son engagement.</td></tr>
<tr><td>Escroquerie et fraude aux aides</td><td>Code pénal et textes propres aux aides</td><td>Fausses factures, travaux fictifs, dossiers montés sans l'accord du ménage, usage des identifiants du client.</td></tr>
</table>
<p>Ces infractions engagent la responsabilité de l'entreprise <strong>et</strong> celle du commercial qui les commet. Les sanctions peuvent être pénales, administratives (amendes de la DGCCRF), professionnelles (perte du label RGE, exclusion des dispositifs d'aides) et civiles (nullité du contrat, dommages et intérêts).</p>
<h3>Aider le client à reconnaître une fraude</h3>
<p>Expliquer au client les signaux d'alerte est un excellent moyen de bâtir la confiance. Thermia Rénov remet à chaque prospect une fiche « Les bons réflexes » reprenant les conseils diffusés par France Rénov' et la DGCCRF :</p>
<ul>
<li>Aucun organisme public ne démarche les particuliers pour leur vendre des travaux ;</li>
<li>Se méfier des offres « à 1 euro », « gratuites » ou « financées à 100 % » ;</li>
<li>Vérifier la qualification RGE dans l'annuaire officiel et l'existence de l'entreprise (numéro SIREN, adresse réelle, avis) ;</li>
<li>Ne jamais communiquer ses identifiants (FranceConnect, impôts, espace MaPrimeRénov') ;</li>
<li>Ne rien signer le jour même et comparer plusieurs devis ;</li>
<li>Ne pas payer pendant les sept jours suivant la signature d'un contrat conclu à domicile (section 2.5) ;</li>
<li>Contacter un conseiller France Rénov' en cas de doute et signaler les pratiques suspectes sur SignalConso.</li>
</ul>
<blockquote><strong>Exemple fil rouge (fictif) :</strong> Mme Lopez raconte à Karim qu'un « conseiller de l'État » l'a appelée la semaine précédente pour lui proposer une « isolation gratuite ». Karim lui explique calmement qu'aucun organisme public ne fait ce type d'appel, que ce démarchage est interdit et qu'elle peut le signaler sur SignalConso. Il ne dénigre aucune entreprise nommément, mais remet la fiche « Les bons réflexes ». Mme Lopez déclare plus tard que c'est ce moment qui l'a décidée à faire confiance à Thermia Rénov.</blockquote>
<blockquote><strong>À retenir</strong><br />Depuis la loi n° 2020-901 du 24 juillet 2020 (article L. 223-1 du code de la consommation), le démarchage téléphonique en rénovation énergétique est interdit, sauf contrat en cours. La loi n° 2025-594 du 30 juin 2025 a étendu l'interdiction aux SMS, courriels et réseaux sociaux, alourdi les sanctions et créé de nouvelles obligations d'information. Les pratiques trompeuses, agressives et l'abus de faiblesse sont sanctionnés. Expliquer au client comment reconnaître une fraude est un argument de confiance.</blockquote>
`,
      },
      {
        title: "2.5 – Le contrat hors établissement et le droit de rétractation",
        content: `
<h3>Qu'est-ce qu'un contrat hors établissement ?</h3>
<p>Le code de la consommation (article L. 221-1) qualifie de <strong>contrat hors établissement</strong> notamment le contrat conclu entre un professionnel et un consommateur en leur présence physique simultanée dans un lieu qui n'est pas celui où le professionnel exerce habituellement son activité, y compris lorsque c'est le consommateur qui a sollicité la visite. C'est le cas typique du contrat signé au domicile du client après une visite technique. Est aussi concerné le contrat conclu dans les locaux du professionnel immédiatement après que le consommateur a été sollicité personnellement et individuellement dans un autre lieu.</p>
<p>Le fait que le client ait lui-même demandé le rendez-vous <strong>ne change rien</strong> : le contrat signé chez lui reste un contrat hors établissement, avec toutes les protections qui s'y attachent.</p>
<h3>Les informations à donner avant la signature</h3>
<p>Avant que le consommateur soit lié, le professionnel doit lui communiquer, de manière lisible et compréhensible, les informations précontractuelles prévues par les articles L. 111-1 et L. 221-5 du code de la consommation. Pour un contrat hors établissement, elles sont fournies <strong>sur papier</strong> ou, si le consommateur l'accepte, sur un autre support durable (article L. 221-8).</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Information</th><th>Application aux travaux énergétiques</th></tr>
<tr><td>Caractéristiques essentielles du bien ou du service</td><td>Description précise des travaux, marques, références et performances des matériaux et équipements</td></tr>
<tr><td>Prix total TTC et modalités de paiement</td><td>Détail par poste, taux de TVA, échéancier, acompte éventuel</td></tr>
<tr><td>Date ou délai d'exécution</td><td>Période prévisionnelle des travaux et durée du chantier</td></tr>
<tr><td>Identité et coordonnées du professionnel</td><td>Raison sociale, adresse, numéro d'immatriculation, téléphone, courriel</td></tr>
<tr><td>Garanties légales et commerciales, service après-vente</td><td>Garanties de parfait achèvement, biennale, décennale, garanties fabricant</td></tr>
<tr><td>Droit de rétractation</td><td>Conditions, délai, modalités d'exercice et <strong>formulaire type de rétractation</strong></td></tr>
<tr><td>Médiation de la consommation</td><td>Coordonnées du médiateur dont relève l'entreprise</td></tr>
<tr><td>Informations propres au secteur</td><td>Label RGE détenu ou non pour chaque catégorie de travaux, identité et label des sous-traitants (loi du 30 juin 2025)</td></tr>
</table>
<h3>Le contrat lui-même</h3>
<p>Le professionnel remet au consommateur un <strong>exemplaire du contrat</strong> daté, sur papier signé par les parties ou, avec son accord, sur un autre support durable (article L. 221-9). Le contrat comprend toutes les informations précontractuelles et est accompagné du <strong>formulaire de rétractation</strong>. Le consentement exprès du consommateur pour toute demande d'exécution anticipée doit figurer sur ce document ou être recueilli sur un support durable.</p>
<h3>Le droit de rétractation : 14 jours</h3>
<p>Le consommateur dispose d'un délai de <strong>14 jours</strong> pour exercer son droit de rétractation, <strong>sans avoir à motiver sa décision</strong> ni à supporter d'autres coûts que ceux prévus par la loi (article L. 221-18 du code de la consommation).</p>
<ul>
<li><strong>Point de départ</strong> : pour un contrat de prestation de services, le délai court à compter du jour de la conclusion du contrat ; pour un contrat de vente de biens, à compter de la réception du bien. Les contrats de travaux incluant la fourniture et la pose d'équipements soulèvent des questions de qualification : la pratique prudente consiste à faire valider la règle appliquée par le service juridique de l'entreprise et à toujours retenir la solution la plus protectrice pour le client en cas de doute.</li>
<li><strong>Fin du délai</strong> : lorsque le délai expire un samedi, un dimanche ou un jour férié ou chômé, il est prolongé jusqu'au premier jour ouvrable suivant (article L. 221-19).</li>
<li><strong>Information omise</strong> : si les informations sur le droit de rétractation n'ont pas été fournies, le délai est prolongé de douze mois à compter de l'expiration du délai initial (article L. 221-20).</li>
<li><strong>Exercice</strong> : le consommateur informe le professionnel de sa décision par le formulaire ou par toute déclaration dénuée d'ambiguïté.</li>
<li><strong>Remboursement</strong> : le professionnel rembourse toutes les sommes versées au plus tard dans les 14 jours suivant la date à laquelle il est informé de la décision (article L. 221-24).</li>
</ul>
<h3>Aucun paiement pendant sept jours</h3>
<p>Pour les contrats hors établissement, le professionnel ne peut recevoir <strong>aucun paiement ni aucune contrepartie</strong>, sous quelque forme que ce soit, de la part du consommateur avant l'expiration d'un délai de <strong>sept jours</strong> à compter de la conclusion du contrat (article L. 221-10 du code de la consommation), sous réserve d'exceptions limitées prévues par ce texte. Sont donc proscrits pendant ce délai : chèque d'acompte, même non encaissé, autorisation de prélèvement, paiement par carte, remise d'espèces.</p>
<blockquote><strong>Politique de Thermia Rénov (plus protectrice) :</strong> aucun acompte n'est demandé avant la fin du délai de rétractation de 14 jours. Le client n'a ainsi jamais à « récupérer » une somme s'il change d'avis.</blockquote>
<h3>Exécution avant la fin du délai</h3>
<p>Si le client souhaite que les travaux commencent avant la fin du délai de rétractation (par exemple une panne de chaudière en plein hiver), il doit en faire la <strong>demande expresse</strong> sur un support durable (article L. 221-25). S'il se rétracte ensuite, il paie un montant proportionnel au service déjà fourni. Ne suggérez jamais cette demande pour « gagner du temps » : elle doit venir d'un besoin réel du client et être tracée. Les travaux d'entretien ou de réparation à réaliser en urgence au domicile du consommateur et expressément sollicités par lui font l'objet d'une exception au droit de rétractation dans la limite des pièces et travaux strictement nécessaires (article L. 221-28) : une rénovation énergétique programmée n'entre pas dans ce cas.</p>
<h3>Le cas des foires et salons</h3>
<p>Un contrat conclu sur un stand de foire ou de salon n'est pas un contrat hors établissement et <strong>n'ouvre pas</strong> en principe de droit de rétractation. En contrepartie, le professionnel doit en informer clairement le consommateur, par un affichage visible sur le stand et par une mention dans le contrat (article L. 224-59). En revanche, lorsque l'achat est financé par un <strong>crédit affecté</strong>, le consommateur bénéficie du droit de rétractation propre au crédit, et l'annulation du crédit entraîne celle du contrat de vente.</p>
<h3>Le crédit affecté</h3>
<p>Lorsque les travaux sont financés par un crédit à la consommation lié au contrat (crédit affecté), le client dispose d'un délai de rétractation de 14 jours sur le crédit ; si le crédit n'est pas accordé ou si le client se rétracte, le contrat de travaux est résolu de plein droit. Le commercial doit présenter le crédit comme tel (taux, coût total, mensualités), jamais comme une « aide » ou un « financement de l'État ». C'est un point systématiquement contrôlé par la DGCCRF.</p>
<h3>Chronologie d'une signature conforme (exemple fictif)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Date (fictive)</th><th>Événement</th></tr>
<tr><td>Jeudi 15 octobre 2026</td><td>Signature du contrat de travaux au domicile des Ferrand, remise d'un exemplaire papier et du formulaire de rétractation</td></tr>
<tr><td>Du 16 au 22 octobre 2026</td><td>Aucun paiement possible (délai de sept jours de l'article L. 221-10)</td></tr>
<tr><td>Jeudi 29 octobre 2026</td><td>Dernier jour du délai de rétractation de 14 jours, si l'on retient le point de départ à la conclusion du contrat</td></tr>
<tr><td>À partir du 30 octobre 2026</td><td>Acompte éventuel selon la politique de Thermia Rénov ; planification du chantier, sous réserve de l'accord des aides</td></tr>
</table>
<blockquote><strong>À retenir</strong><br />Un contrat signé au domicile du client est un contrat hors établissement, même si le client a demandé le rendez-vous. Informations précontractuelles sur papier, exemplaire du contrat daté et formulaire de rétractation sont obligatoires. Le client dispose de 14 jours pour se rétracter sans motif (article L. 221-18) ; aucun paiement ne peut être reçu avant sept jours (article L. 221-10). L'oubli de l'information prolonge le délai de douze mois. En salon, pas de rétractation sauf crédit affecté, mais affichage obligatoire.</blockquote>
`,
      },
      {
        title: "2.6 – Le devis et les obligations d'information propres au secteur",
        content: `
<h3>Le devis : un document commercial et juridique</h3>
<p>Dans la rénovation énergétique, le devis n'est pas qu'une proposition de prix. Il sert de base au dépôt des aides (MaPrimeRénov', aides locales), au contrôle CEE, à la demande d'éco-PTZ, à l'application du taux de TVA, et en cas de litige, à la preuve de ce qui a été convenu. Un devis imprécis peut faire perdre une aide au client ou exposer l'entreprise à une sanction.</p>
<h3>Les mentions à faire figurer</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu attendu</th></tr>
<tr><td>Identification de l'entreprise</td><td>Raison sociale, forme juridique, adresse du siège, numéro SIREN / SIRET, numéro d'immatriculation, numéro de TVA intracommunautaire, coordonnées</td></tr>
<tr><td>Identification du client et du chantier</td><td>Nom, adresse du client, adresse des travaux si différente</td></tr>
<tr><td>Date et durée de validité</td><td>Date d'établissement et durée de validité de l'offre</td></tr>
<tr><td>Description détaillée des travaux</td><td>Pour chaque poste : nature des travaux, quantité (m², nombre d'unités), prix unitaire, prix total ; marque, référence et caractéristiques de performance (résistance thermique R et épaisseur de l'isolant, ETAS / SCOP et puissance de la PAC, Uw et Sw des menuiseries, volume et COP du CET…), telles qu'exigées par les aides</td></tr>
<tr><td>Main-d'œuvre, fournitures, frais annexes</td><td>Dépose, évacuation et gestion des déchets (la loi AGEC de 2020 impose de préciser les modalités de gestion et d'enlèvement des déchets de chantier), déplacement, mise en service</td></tr>
<tr><td>Prix</td><td>Total HT, taux et montant de TVA par taux applicable, total TTC</td></tr>
<tr><td>Délai et conditions d'exécution</td><td>Date prévisionnelle de début, durée, conditions particulières (accès, électricité, autorisation d'urbanisme)</td></tr>
<tr><td>Conditions de paiement</td><td>Acompte, échéancier, respect du délai de sept jours en contrat hors établissement</td></tr>
<tr><td>Qualification RGE</td><td>Nom de l'organisme, numéro et domaine de la qualification, validité ; information sur l'absence de label pour une catégorie de travaux le cas échéant</td></tr>
<tr><td>Sous-traitance</td><td>Identité des sous-traitants éventuels et leur situation au regard du label</td></tr>
<tr><td>Assurance</td><td>Assurance de responsabilité décennale : assureur, coordonnées, couverture géographique</td></tr>
<tr><td>Médiateur de la consommation</td><td>Coordonnées du médiateur</td></tr>
<tr><td>Aides</td><td>Présentées <strong>à part</strong>, comme estimations sous réserve d'acceptation, avec la date de simulation ; prime CEE avec l'identité de l'obligé ou du délégataire</td></tr>
<tr><td>Rétractation</td><td>Pour un contrat conclu hors établissement : conditions, délai, formulaire</td></tr>
<tr><td>Acceptation</td><td>Date, signature du client précédée de la mention manuscrite ou électronique d'acceptation</td></tr>
</table>
<p>Chaque aide peut exiger des mentions supplémentaires (par exemple, une mention relative au rôle de l'accompagnateur, ou des caractéristiques techniques précises imposées par une fiche CEE). L'assistante chargée des dossiers d'aides de Thermia Rénov tient une check-list à jour par aide et par geste ; c'est une pratique à reproduire dans votre entreprise.</p>
<h3>Les erreurs qui coûtent cher</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Erreur</th><th>Conséquence</th></tr>
<tr><td>Isolant décrit comme « laine minérale 30 cm » sans référence ni résistance thermique</td><td>Dossier d'aide refusé ou contrôle défavorable</td></tr>
<tr><td>Aides déduites du total TTC sans être identifiées comme des estimations</td><td>Le client croit à un prix « net » garanti ; litige en cas de refus de l'aide</td></tr>
<tr><td>Devis daté avant l'offre de prime CEE</td><td>Perte de la prime pour le client</td></tr>
<tr><td>Taux de TVA à 5,5 % appliqué à un poste non éligible</td><td>Redressement fiscal pour l'entreprise</td></tr>
<tr><td>Absence de mention RGE ou de sous-traitant</td><td>Sanction et nullité possible du contrat selon la loi de 2025</td></tr>
<tr><td>Acompte demandé à la signature à domicile</td><td>Infraction à l'article L. 221-10 du code de la consommation</td></tr>
</table>
<h3>La publicité et les supports de communication</h3>
<ul>
<li>La publicité ne doit pas être trompeuse : pas de « travaux gratuits », pas d'usage de logos officiels laissant croire à un partenariat avec l'État, pas d'affichage de prix « après aides » sans préciser les conditions ;</li>
<li>Les supports de promotion d'offres de rénovation énergétique doivent comporter une mention de France Rénov' selon les modalités fixées par les textes issus de la loi de 2025 ;</li>
<li>Les avis clients publiés doivent être authentiques, et l'entreprise doit indiquer si elle les contrôle (règles sur les avis en ligne du code de la consommation) ;</li>
<li>Les simulations d'économies sur le site ou en plaquette doivent préciser leurs hypothèses.</li>
</ul>
<h3>La protection des données personnelles</h3>
<p>Pour monter un dossier d'aides, l'entreprise manipule des données sensibles pour le client : revenus, avis d'imposition, composition du foyer, coordonnées bancaires. Le RGPD impose de ne collecter que le nécessaire, d'informer le client de l'usage de ses données, de les sécuriser et de ne pas les conserver au-delà de la durée utile. Ne photographiez jamais un avis d'imposition avec votre téléphone personnel ; utilisez les outils de l'entreprise prévus à cet effet.</p>
<blockquote><strong>À retenir</strong><br />Le devis détaille chaque poste avec les références et performances exigées par les aides, distingue les taux de TVA, mentionne la qualification RGE, l'assurance décennale, le médiateur, les sous-traitants et la gestion des déchets. Les aides y figurent à part, comme estimations datées. La publicité ne doit jamais être trompeuse et mentionne France Rénov'. Les données du client sont protégées conformément au RGPD.</blockquote>
`,
      },
      {
        title: "2.7 – L'éthique commerciale dans la vente de travaux énergétiques",
        content: `
<h3>Pourquoi l'éthique est un sujet commercial</h3>
<p>L'éthique n'est pas un supplément d'âme. Dans un secteur où la confiance a été abîmée, elle a des effets directs sur la performance commerciale : moins de rétractations, moins d'impayés et de litiges, plus de recommandations, meilleure note en ligne, relations sereines avec les prescripteurs (accompagnateurs, conseillers France Rénov', architectes, agences immobilières), dossiers d'aides acceptés. Une entreprise sanctionnée perd souvent son label RGE et, avec lui, l'essentiel de son activité.</p>
<h3>Le devoir de conseil du professionnel</h3>
<p>Le professionnel du bâtiment est tenu, vis-à-vis de son client non professionnel, d'un <strong>devoir de conseil</strong> : il doit l'informer sur l'adéquation des travaux à ses besoins, les contraintes techniques, les risques et les limites de la solution proposée. Concrètement, cela signifie :</p>
<ul>
<li>déconseiller une solution inadaptée, même si elle est rentable pour l'entreprise (par exemple une PAC dans une maison non isolée sans plan d'isolation) ;</li>
<li>signaler les travaux préalables nécessaires (électricité, ventilation, renforcement de charpente) ;</li>
<li>expliquer les conditions d'usage et d'entretien ;</li>
<li>conserver la trace écrite des conseils donnés et des choix du client.</li>
</ul>
<h3>Les sept principes de la vente responsable chez Thermia Rénov</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Principe</th><th>Traduction concrète</th></tr>
<tr><td>1. Le besoin avant le produit</td><td>Pas de solution présentée avant la découverte et la visite technique.</td></tr>
<tr><td>2. La vérité sur les chiffres</td><td>Aides simulées, économies en fourchette, reste à charge et coût du crédit affichés clairement.</td></tr>
<tr><td>3. Le temps de la décision</td><td>Pas de signature au premier rendez-vous ; pas d'offre « valable aujourd'hui seulement ».</td></tr>
<tr><td>4. Le respect de la vulnérabilité</td><td>Si le client semble ne pas comprendre, être sous influence ou en situation de fragilité, proposer la présence d'un proche, reporter, ou renoncer.</td></tr>
<tr><td>5. La transparence sur l'entreprise</td><td>RGE, assurances, sous-traitants, partenaires CEE, rémunération éventuelle d'apporteurs d'affaires.</td></tr>
<tr><td>6. L'orientation vers le service public</td><td>Encourager le contact avec France Rénov' et le choix libre de l'accompagnateur.</td></tr>
<tr><td>7. La responsabilité après la signature</td><td>Suivi du chantier, réception soignée, traitement rapide des réserves, accompagnement jusqu'au versement des aides.</td></tr>
</table>
<h3>Les situations délicates et la bonne réponse</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Réponse professionnelle</th></tr>
<tr><td>Le client demande « de quoi passer au-dessus du plafond » ou de majorer une facture pour toucher plus d'aides</td><td>Refuser clairement : c'est une fraude, qui engage aussi le client. Expliquer les risques (remboursement, poursuites).</td></tr>
<tr><td>Votre responsable vous demande d'atteindre vos objectifs « quoi qu'il en coûte » en fin de mois</td><td>Rappeler la charte et les risques pour l'entreprise ; alerter la direction si la pression conduit à des pratiques non conformes.</td></tr>
<tr><td>Un client âgé, seul, semble confus et veut signer tout de suite</td><td>Ne pas faire signer ; proposer un nouveau rendez-vous en présence d'un proche ; noter la situation.</td></tr>
<tr><td>Le client vous montre le devis d'un concurrent manifestement trompeur</td><td>Ne pas dénigrer nommément ; expliquer objectivement les points à vérifier ; l'orienter vers France Rénov' et SignalConso s'il y a des indices de fraude.</td></tr>
<tr><td>La solution la plus adaptée n'est pas proposée par votre entreprise</td><td>Le dire ; recommander de consulter un professionnel du domaine ; votre crédibilité en sortira renforcée.</td></tr>
</table>
<h3>Éthique et rémunération variable</h3>
<p>Les commerciaux du secteur sont souvent rémunérés en partie à la commission. Ce n'est pas un problème en soi, mais le système doit être conçu pour ne pas encourager les dérives : commission versée après la fin du délai de rétractation, voire après la réception sans réserve, prise en compte de la satisfaction client et des taux d'annulation, absence de prime sur la vente de crédit. Si vous encadrez une équipe, c'est un levier puissant de conformité.</p>
<blockquote><strong>Exemple fil rouge (fictif) :</strong> lors d'un rendez-vous, M. Ferrand demande à Karim s'il peut « gonfler un peu la surface des combles » sur le devis pour obtenir davantage de prime. Karim répond : « Je comprends que vous cherchiez à réduire le reste à charge, mais je ne peux pas indiquer une surface fausse : ce serait une fraude, avec un risque de remboursement et de poursuites pour vous comme pour nous. En revanche, je peux vous montrer comment l'éco-PTZ peut étaler le reste à charge sans intérêts. » La relation de confiance en sort renforcée.</blockquote>
<blockquote><strong>À retenir</strong><br />L'éthique commerciale est un facteur de performance durable dans un secteur marqué par la fraude. Le devoir de conseil impose de déconseiller une solution inadaptée et de tracer les conseils donnés. Le besoin avant le produit, la vérité sur les chiffres, le temps de la décision, le respect de la vulnérabilité et la transparence guident chaque rendez-vous. Refuser une demande frauduleuse, c'est protéger le client et l'entreprise.</blockquote>
`,
      },
      {
        title: "2.8 – Quiz de fin de chapitre",
        content: `
<p>Répondez aux questions, puis consultez le corrigé.</p>
<ol>
<li><strong>La demande MaPrimeRénov' doit être déposée :</strong><br />A. Après la fin des travaux<br />B. Avant le commencement des travaux<br />C. Dans l'année qui suit la facture<br />D. Uniquement par l'entreprise, sans le client</li>
<li><strong>Dans le parcours accompagné de MaPrimeRénov', l'intervention d'un Mon Accompagnateur Rénov' agréé est :</strong><br />A. Facultative<br />B. Obligatoire<br />C. Réservée aux copropriétés<br />D. Assurée obligatoirement par l'entreprise de travaux</li>
<li><strong>Pour qu'une prime CEE soit valable, l'engagement de l'obligé ou du délégataire doit intervenir :</strong><br />A. Après la réception des travaux<br />B. Avant la signature du devis<br />C. Au moment du paiement du solde<br />D. À n'importe quel moment</li>
<li><strong>Le taux de TVA applicable aux travaux d'amélioration de la qualité énergétique éligibles dans un logement achevé depuis plus de deux ans est de :</strong><br />A. 20 %<br />B. 10 %<br />C. 5,5 %<br />D. 2,1 %</li>
<li><strong>L'éco-prêt à taux zéro :</strong><br />A. Est réservé aux ménages très modestes<br />B. Est accordé sans condition de ressources, sous réserve de l'accord de la banque<br />C. Est versé par l'Anah<br />D. Ne nécessite pas d'entreprise RGE</li>
<li><strong>Le démarchage téléphonique de particuliers pour des travaux de rénovation énergétique est interdit, sauf :</strong><br />A. Si le particulier n'est pas inscrit sur Bloctel<br />B. Si l'appel est passé par un sous-traitant<br />C. Dans le cadre de l'exécution d'un contrat en cours<br />D. Le samedi matin</li>
<li><strong>Depuis la loi n° 2025-594 du 30 juin 2025, l'interdiction de prospection en rénovation énergétique couvre aussi :</strong><br />A. Les SMS, courriels et réseaux sociaux<br />B. Uniquement les courriers postaux<br />C. Les salons professionnels<br />D. Les publicités à la télévision</li>
<li><strong>Un contrat signé au domicile du client, qui avait lui-même demandé le rendez-vous, est :</strong><br />A. Un contrat conclu en établissement<br />B. Un contrat hors établissement ouvrant droit à rétractation<br />C. Un contrat sans droit de rétractation car le client a sollicité la visite<br />D. Un contrat à distance</li>
<li><strong>En contrat hors établissement, le professionnel ne peut recevoir aucun paiement avant :</strong><br />A. 3 jours<br />B. 7 jours à compter de la conclusion du contrat<br />C. 30 jours<br />D. La fin des travaux</li>
<li><strong>Si l'information sur le droit de rétractation n'a pas été fournie, le délai de rétractation est :</strong><br />A. Supprimé<br />B. Inchangé<br />C. Prolongé de douze mois<br />D. Réduit à 7 jours</li>
</ol>
<h4>Corrigé</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>B</td><td>La demande se fait avant le début des travaux ; la prudence recommande même d'attendre l'accord écrit. Le client peut être aidé par un mandataire déclaré.</td></tr>
<tr><td>2</td><td>B</td><td>L'accompagnement par un opérateur agréé par l'Anah, indépendant des entreprises de travaux, est obligatoire dans le parcours accompagné.</td></tr>
<tr><td>3</td><td>B</td><td>C'est le « rôle actif et incitatif » de l'obligé : un devis signé avant l'offre de prime fait perdre la prime.</td></tr>
<tr><td>4</td><td>C</td><td>Article 278-0 bis A du code général des impôts ; les autres travaux d'amélioration relèvent en principe du taux de 10 %.</td></tr>
<tr><td>5</td><td>B</td><td>Pas de condition de ressources, mais une entreprise RGE et l'accord de la banque, libre d'apprécier la capacité de remboursement.</td></tr>
<tr><td>6</td><td>C</td><td>Article L. 223-1 du code de la consommation, issu de la loi n° 2020-901 du 24 juillet 2020 : l'inscription ou non sur Bloctel est indifférente ; le recours à un sous-traitant ne change rien.</td></tr>
<tr><td>7</td><td>A</td><td>La loi de 2025 a étendu l'interdiction aux SMS et messageries, aux courriels et aux réseaux sociaux.</td></tr>
<tr><td>8</td><td>B</td><td>La sollicitation de la visite par le client ne fait pas disparaître la qualification de contrat hors établissement (article L. 221-1) ni le droit de rétractation de 14 jours (article L. 221-18).</td></tr>
<tr><td>9</td><td>B</td><td>Article L. 221-10 du code de la consommation : ni acompte, ni chèque même non encaissé, ni autorisation de prélèvement pendant sept jours.</td></tr>
<tr><td>10</td><td>C</td><td>Article L. 221-20 du code de la consommation : le délai est prolongé de douze mois à compter de l'expiration du délai initial.</td></tr>
</table>
`,
      },
      {
        title: "2.9 – Cas pratique : sécuriser la proposition et la signature chez M. et Mme Ferrand",
        content: `
<h3>Contexte</h3>
<p>Après la visite technique, les Ferrand ont pris contact avec l'espace conseil France Rénov' et choisi, pour l'instant, une première étape : renforcement de l'isolation des combles perdus et remplacement de la chaudière fioul par une PAC air/eau avec production d'eau chaude. Karim prépare le second rendez-vous et soumet à Nadia le brouillon suivant (toutes les données sont fictives).</p>
<blockquote><strong>Brouillon de Karim</strong><br />Devis n° 2026-118 du 12 octobre 2026<br />« Isolation combles laine minérale 30 cm – 85 m² : 3 200 € »<br />« Pompe à chaleur 12 kW avec ballon, pose comprise : 16 800 € »<br />« Total : 20 000 € – Aides de l'État : 10 000 € – <strong>Votre prix : 10 000 €</strong> »<br />« Offre valable jusqu'au 15 octobre. Acompte de 30 % à la signature. »<br />« Prime CEE : à faire après le chantier. »<br />Note : « Faire signer jeudi 15 octobre chez eux. Si besoin, M. Ferrand voulait qu'on mette 100 m² de combles pour avoir plus d'aide, voir avec Nadia. »</blockquote>
<h3>Consigne</h3>
<ol>
<li>Identifiez toutes les non-conformités et maladresses du brouillon.</li>
<li>Réécrivez la structure du devis et du plan de financement de manière conforme.</li>
<li>Établissez la chronologie conforme entre le 12 octobre et le début des travaux, en tenant compte des aides, de la signature à domicile et de la politique de Thermia Rénov.</li>
<li>Rédigez la réponse de Karim à la demande de M. Ferrand concernant la surface des combles.</li>
<li>Listez les documents que Karim doit remettre le jour de la signature.</li>
</ol>
<h3>Corrigé détaillé</h3>
<h4>1. Non-conformités et maladresses</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément du brouillon</th><th>Problème</th></tr>
<tr><td>« Laine minérale 30 cm » sans marque, référence ni résistance thermique</td><td>Les aides exigent la référence et la performance (R) de l'isolant ; le dossier risque d'être refusé.</td></tr>
<tr><td>« Pompe à chaleur 12 kW » sans marque, référence, ETAS / SCOP ni note de dimensionnement</td><td>Même problème ; de plus la puissance doit résulter d'une étude réalisée en tenant compte de l'isolation des combles.</td></tr>
<tr><td>Pas de détail des postes (dépose de la chaudière, neutralisation de la cuve, déchets, mise en service)</td><td>Information incomplète ; gestion des déchets à préciser ; risque de suppléments contestés.</td></tr>
<tr><td>Pas de HT, de taux de TVA ni de TTC</td><td>Mentions obligatoires du prix absentes ; impossible de vérifier l'application du taux de 5,5 %.</td></tr>
<tr><td>« Aides de l'État : 10 000 € – Votre prix : 10 000 € »</td><td>Montant non simulé, aides non détaillées, présentées comme une remise acquise : pratique potentiellement trompeuse. Les aides doivent figurer à part, détaillées et datées, comme estimations sous réserve d'acceptation.</td></tr>
<tr><td>« Offre valable jusqu'au 15 octobre »</td><td>Durée de validité de trois jours : pression contraire à la charte de l'entreprise et au temps de décision nécessaire.</td></tr>
<tr><td>« Acompte de 30 % à la signature »</td><td>Interdit pour un contrat hors établissement avant sept jours (article L. 221-10) ; contraire à la politique de Thermia Rénov (pas d'acompte avant la fin du délai de 14 jours).</td></tr>
<tr><td>« Prime CEE : à faire après le chantier »</td><td>Erreur grave : l'engagement CEE doit précéder la signature du devis ; sinon la prime est perdue.</td></tr>
<tr><td>Absence de mentions RGE, assurance décennale, médiateur, sous-traitants, rétractation</td><td>Obligations d'information non respectées ; nullité possible du contrat en l'absence d'information sur le label selon la loi de 2025.</td></tr>
<tr><td>Proposition de déclarer 100 m² au lieu de 85 m²</td><td>Fraude aux aides ; à refuser sans discussion.</td></tr>
</table>
<h4>2. Structure conforme du devis et du plan de financement</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Partie</th><th>Contenu</th></tr>
<tr><td>En-tête</td><td>Identité complète de Thermia Rénov (SAS, siège à Saint-Genis-Laval, SIRET, numéro de TVA), qualification RGE par domaine avec organisme et numéro, assurance décennale (assureur, couverture), médiateur ; identité et adresse des Ferrand ; date et durée de validité raisonnable (par exemple un mois, conformément à la politique de l'entreprise)</td></tr>
<tr><td>Poste 1 – Isolation des combles perdus</td><td>Surface mesurée : 85 m² ; isolant (marque, référence), épaisseur, résistance thermique conforme aux exigences en vigueur ; protection des spots et conduits ; repère de hauteur ; prix unitaire, total HT, TVA 5,5 %</td></tr>
<tr><td>Poste 2 – PAC air/eau</td><td>Marque, référence, puissance issue de la note de dimensionnement, ETAS / SCOP, ballon d'eau chaude (volume), emplacement de l'unité extérieure, raccordement hydraulique et électrique, mise en service ; TVA 5,5 %</td></tr>
<tr><td>Poste 3 – Travaux annexes</td><td>Dépose de la chaudière, neutralisation et évacuation de la cuve fioul, gestion des déchets ; taux de TVA applicable à chaque poste</td></tr>
<tr><td>Totaux</td><td>Total HT, TVA par taux, total TTC</td></tr>
<tr><td>Conditions</td><td>Délai prévisionnel, conditions de paiement (aucun paiement avant l'expiration des délais légaux ; acompte éventuel après le délai de rétractation), sous-traitance (« aucun sous-traitant » ou identité et label)</td></tr>
<tr><td>Annexe « Plan de financement estimatif »</td><td>Aides détaillées une par une (MaPrimeRénov' simulée sur l'outil officiel à la date indiquée, prime CEE avec nom du délégataire et offre acceptée, aide locale), mention « estimations sous réserve d'acceptation par les organismes », reste à charge estimé, besoin de trésorerie, financement envisagé (épargne, éco-PTZ sous réserve d'accord bancaire)</td></tr>
<tr><td>Annexe « Rétractation »</td><td>Information sur le droit de rétractation de 14 jours et formulaire type</td></tr>
</table>
<h4>3. Chronologie conforme</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Date (fictive)</th><th>Étape</th></tr>
<tr><td>12 octobre 2026</td><td>Finalisation de l'étude ; simulation des aides avec les Ferrand ; présentation de l'offre de prime CEE du délégataire partenaire, que les Ferrand acceptent (ou comparent avec d'autres offres)</td></tr>
<tr><td>15 octobre 2026</td><td>Second rendez-vous, à la demande des Ferrand : remise des informations précontractuelles sur papier ; si les Ferrand sont prêts, signature du contrat et remise d'un exemplaire daté avec le formulaire de rétractation ; aucun paiement</td></tr>
<tr><td>Dans les jours suivants</td><td>Dépôt par les Ferrand (ou leur mandataire déclaré) de la demande MaPrimeRénov' et de l'aide locale ; demande d'éco-PTZ à leur banque s'ils le souhaitent</td></tr>
<tr><td>Jusqu'au 29 octobre 2026</td><td>Délai de rétractation de 14 jours (point de départ retenu : conclusion du contrat) ; aucun paiement avant le 23 octobre au plus tôt selon la loi, aucun acompte avant le 30 octobre selon la politique de Thermia Rénov</td></tr>
<tr><td>Après accord écrit des aides</td><td>Planification du chantier ; travaux ; réception ; facture ; attestation CEE signée après travaux ; demandes de versement</td></tr>
</table>
<h4>4. Réponse de Karim à M. Ferrand</h4>
<blockquote>« Monsieur Ferrand, je comprends votre souhait de réduire le reste à charge. Je ne peux pas indiquer 100 m² alors que nous avons mesuré 85 m² : les aides sont contrôlées, parfois sur place, et une fausse déclaration vous obligerait à rembourser l'aide, avec des risques de poursuites pour vous comme pour nous. Ce que je peux faire, c'est vérifier avec vous toutes les aides auxquelles vous avez réellement droit, et vous montrer comment l'éco-prêt à taux zéro permettrait d'étaler le reste à charge sans intérêts, si votre banque l'accepte. »</blockquote>
<h4>5. Documents à remettre le jour de la signature</h4>
<ul>
<li>Informations précontractuelles et devis détaillé conforme, sur papier ;</li>
<li>Exemplaire du contrat daté et signé, avec le formulaire de rétractation ;</li>
<li>Attestations de qualification RGE et d'assurance décennale ;</li>
<li>Information sur la sous-traitance (absence ou identité et label des sous-traitants) ;</li>
<li>Plan de financement estimatif daté, avec la simulation des aides ;</li>
<li>Offre de prime CEE acceptée, antérieure au devis signé ;</li>
<li>Coordonnées du médiateur de la consommation et de l'espace conseil France Rénov' ;</li>
<li>Fiche « Les bons réflexes » et charte commerciale de Thermia Rénov.</li>
</ul>
<h3>Ce que le formateur évaluera</h3>
<p>Dans la mise en situation correspondante et lors de l'évaluation finale, le formateur vérifiera que vous savez présenter les aides comme des estimations vérifiées et datées, respecter la chronologie des aides (CEE avant devis, MaPrimeRénov' avant travaux), conclure un contrat hors établissement conforme (information, formulaire, rétractation, absence de paiement) et refuser fermement mais courtoisement toute demande frauduleuse. Ces éléments constituent le socle de la compétence C1 et conditionnent la réussite des compétences suivantes.</p>
`,
      },
    ],
  },
];
