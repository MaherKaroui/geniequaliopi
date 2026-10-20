import type { CourseChapter } from "../courseContent";

export const GSC35_PARTIE3: CourseChapter[] = [
  {
    title: "Chapitre 5 – Financer et commercialiser son offre de formation (C4)",
    description:
      "Identifier les sources de financement d'une action de formation (particulier à ses frais, entreprise et plan de développement des compétences, OPCO, France Travail et aide individuelle à la formation, Régions, Agefiph, fonds d'assurance formation des non-salariés) et leurs conditions, dont la certification Qualiopi ; comprendre le compte personnel de formation comme une perspective réservée aux offres certifiantes (RNCP, RS) référencées sur EDOF, avec la participation forfaitaire du titulaire et les plafonds de prise en charge en vigueur en 2026 ; calculer un coût de revient et fixer un prix ; définir un positionnement ; construire un site internet comportant les mentions obligatoires ; prospecter dans le respect des règles (consentement, interdiction du démarchage pour le CPF) ; passer du premier contact au devis avec des pratiques commerciales loyales. Durée indicative : une demi-journée. Fil rouge : Atelier Sésame Formation, organisme de formation fictif créé par Inès MARCHAND à Massy (Essonne).",
    sections: [
      {
        title: "5.1 – Panorama des financements de la formation professionnelle : qui paie quoi ?",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Distinguer les grandes familles de financeurs d'une action de formation.</li>
<li>Associer à chaque financeur le document contractuel attendu et les conditions d'accès.</li>
<li>Repérer les financements qui exigent la certification Qualiopi de l'organisme.</li>
<li>Situer la formation « Gérer son centre de formation » dans ce paysage : une formation non certifiante, financée aujourd'hui par des particuliers à leurs propres frais.</li>
</ul>

<h3>1. Pourquoi commencer par le financement ?</h3>
<p>Une offre de formation n'existe commercialement que si quelqu'un est en mesure de la payer. Avant même de rédiger une plaquette, le dirigeant d'un organisme de formation doit savoir <strong>qui achète</strong> (le stagiaire lui-même, son employeur, un financeur public ou paritaire), <strong>selon quelles règles</strong> (pièces exigées, délais de dépôt, plafonds horaires, certification qualité), et <strong>à quel moment l'argent arrive</strong> (avant, pendant ou après la formation). Ces trois questions conditionnent la rédaction des documents contractuels, la trésorerie et même le contenu de l'offre : une formation conçue pour des particuliers ne se vend pas comme une formation conçue pour des entreprises.</p>
<p>Le système français distingue l'<strong>acheteur</strong> (celui qui signe la convention ou le contrat et règle la facture) du <strong>financeur</strong> (celui qui prend en charge tout ou partie du coût). Ils peuvent se confondre (un particulier qui paie sa formation) ou être distincts (une entreprise signe la convention, son opérateur de compétences rembourse une partie des frais). Cette distinction se retrouve d'ailleurs dans le bilan pédagogique et financier, dont le cadre C ventile les produits de l'organisme selon leur origine (chapitre 6).</p>

<h3>2. Les grandes familles de financeurs</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Financeur</th><th>Public concerné</th><th>Document contractuel</th><th>Certification Qualiopi exigée ?</th></tr>
<tr><td>Le particulier, à ses propres frais</td><td>Toute personne qui finance elle-même sa formation (porteur de projet, salarié hors temps de travail, retraité, personne en reconversion)</td><td>Contrat de formation professionnelle avec une personne physique (art. L. 6353-3 à L. 6353-7 du Code du travail)</td><td>Non, au titre de la loi ; c'est en revanche un argument de confiance</td></tr>
<tr><td>L'entreprise, sur ses fonds propres</td><td>Salariés, dans le cadre du plan de développement des compétences</td><td>Convention de formation (art. L. 6353-1 et L. 6353-2) ou bon de commande et facture valant convention</td><td>Non, si l'entreprise paie seule</td></tr>
<tr><td>L'opérateur de compétences (OPCO)</td><td>Salariés des entreprises adhérentes, avec une priorité pour les entreprises de moins de 50 salariés ; alternance</td><td>Convention avec l'entreprise, accord de prise en charge de l'OPCO</td><td>Oui (art. L. 6316-1)</td></tr>
<tr><td>La Caisse des Dépôts, au titre du compte personnel de formation (CPF)</td><td>Titulaires d'un CPF, pour des formations éligibles (certifiantes notamment)</td><td>Inscription et validation sur Mon Compte Formation, via l'espace des organismes EDOF</td><td>Oui, avec des conditions de référencement supplémentaires (section 5.3)</td></tr>
<tr><td>France Travail</td><td>Demandeurs d'emploi (aide individuelle à la formation, achats de formations collectives)</td><td>Devis puis accord de France Travail ; marché public pour les achats collectifs</td><td>Oui</td></tr>
<tr><td>La Région</td><td>Demandeurs d'emploi, jeunes, publics prioritaires définis par chaque Région</td><td>Marché public, subvention ou aide individuelle selon les dispositifs régionaux</td><td>Oui</td></tr>
<tr><td>L'Agefiph (et le FIPHFP pour les employeurs publics)</td><td>Personnes en situation de handicap, en complément d'autres financements</td><td>Selon l'aide mobilisée</td><td>Oui lorsqu'il s'agit de fonds publics ou mutualisés</td></tr>
<tr><td>Les fonds d'assurance formation des non-salariés (FAF)</td><td>Travailleurs indépendants, professions libérales, artisans, selon leur activité et leur affiliation</td><td>Demande de prise en charge auprès du FAF compétent</td><td>Oui</td></tr>
<tr><td>Les employeurs publics</td><td>Agents publics</td><td>Bon de commande, marché public</td><td>Selon les règles de l'employeur</td></tr>
</table>

<h3>3. La règle qui structure tout : Qualiopi pour les fonds publics et mutualisés</h3>
<p>Depuis le 1er janvier 2022, l'article <strong>L. 6316-1 du Code du travail</strong> réserve les financements des opérateurs de compétences, de la commission mentionnée à l'article L. 6323-17-6 (transitions professionnelles), de l'État, des Régions, de la Caisse des Dépôts, de France Travail et de l'Agefiph aux prestataires certifiés sur la base du référentiel national qualité. En pratique, cela signifie :</p>
<ul>
<li>qu'un organisme <strong>non certifié</strong> peut parfaitement exercer et facturer des formations à des particuliers et à des entreprises qui paient sur leurs fonds propres ;</li>
<li>qu'il ne peut pas être payé par un OPCO, par la Caisse des Dépôts au titre du CPF, par France Travail ou par la Région, même si l'entreprise ou le stagiaire le souhaite ;</li>
<li>que la certification ne porte que sur les catégories d'actions pour lesquelles elle a été délivrée (actions de formation, bilans de compétences, VAE, apprentissage).</li>
</ul>
<p>La certification Qualiopi a été étudiée au chapitre 4. Retenons ici sa conséquence commerciale : elle ouvre l'accès aux financements mutualisés et publics, mais elle ne rend pas, à elle seule, une formation éligible à un dispositif. Chaque financeur conserve ses propres critères (publics prioritaires, plafonds, durée minimale, caractère certifiant).</p>

<h3>4. Où se situe la formation « Gérer son centre de formation – 35 h » ?</h3>
<p>La formation suivie en ce moment est une <strong>action de formation professionnelle continue non certifiante</strong> : elle ne prépare à aucune certification enregistrée au répertoire national des certifications professionnelles (RNCP) ni au répertoire spécifique (RS). Elle se déclare dans le bilan pédagogique et financier à la ligne « autres formations professionnelles » du cadre F-3. Elle est aujourd'hui achetée par des <strong>particuliers à leurs propres frais</strong>, au moyen d'un contrat de formation professionnelle conclu avec une personne physique, au prix de 1 575 euros net par stagiaire pour 35 heures.</p>
<p>Elle pourrait également être achetée par une entreprise pour l'un de ses salariés (par exemple le responsable d'un service formation interne), sur ses fonds propres ou, si l'organisme est certifié Qualiopi, avec une prise en charge de son OPCO selon les critères de celui-ci. En revanche, elle <strong>n'est pas éligible au CPF</strong>, faute de certification visée : le CPF sera présenté en section 5.3 uniquement comme une perspective pour les organismes qui proposent, ou proposeront, des formations certifiantes.</p>

<h3>5. Fil rouge : la situation d'Atelier Sésame Formation</h3>
<p>Inès MARCHAND dirige Atelier Sésame Formation, entreprise individuelle fictive installée à Massy. Elle propose deux familles de formations : la bureautique (traitement de texte, tableur) et l'accueil physique et téléphonique. Au cours de l'exercice écoulé, ses produits se répartissent ainsi (chiffres fictifs) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Origine des produits</th><th>Montant hors taxes</th><th>Part</th></tr>
<tr><td>Particuliers à leurs propres frais (11 contrats)</td><td>9 900 €</td><td>41 %</td></tr>
<tr><td>Entreprises sur fonds propres (4 conventions)</td><td>11 200 €</td><td>46 %</td></tr>
<tr><td>Sous-traitance pour un autre organisme de formation</td><td>3 150 €</td><td>13 %</td></tr>
<tr><td><strong>Total</strong></td><td><strong>24 250 €</strong></td><td><strong>100 %</strong></td></tr>
</table>
<p>Aucun produit ne vient d'un OPCO, de France Travail ou de la Région : Atelier Sésame Formation n'est pas encore certifiée Qualiopi. Deux entreprises clientes ont pourtant demandé si « leur OPCO pouvait payer » ; Inès a dû répondre que non. Ce constat est à l'origine de son projet de certification et de diversification : il ne s'agit pas d'abandonner les particuliers, qui constituent une clientèle fidèle, mais d'ouvrir d'autres portes.</p>
<blockquote><strong>Bonne pratique :</strong> tenez dès le premier mois un tableau des produits ventilés selon les lignes du cadre C du bilan pédagogique et financier. Vous suivrez ainsi la dépendance de votre organisme à un financeur et vous gagnerez un temps précieux au moment de la déclaration annuelle.</blockquote>
<blockquote><strong>À retenir :</strong> le financement d'une formation dépend de l'acheteur, du financeur et de leurs règles. Les particuliers et les entreprises sur fonds propres peuvent acheter les formations d'un organisme non certifié ; les OPCO, la Caisse des Dépôts, France Travail, les Régions et l'Agefiph exigent la certification Qualiopi (art. L. 6316-1) et appliquent en outre leurs propres critères.</blockquote>
`,
      },
      {
        title: "5.2 – Le financement par le particulier et par l'entreprise : contrats, échéanciers et prise en charge par l'OPCO",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Appliquer les règles protectrices du contrat de formation conclu avec une personne physique : rétractation, interdiction de paiement anticipé, acompte limité.</li>
<li>Proposer un échéancier de paiement conforme et adapté au budget d'un particulier.</li>
<li>Vendre une formation à une entreprise et l'accompagner dans une demande de prise en charge auprès de son OPCO.</li>
<li>Anticiper les délais et les pièces qui conditionnent le paiement.</li>
</ul>

<h3>1. Le particulier qui finance lui-même sa formation</h3>
<p>Lorsqu'une personne physique entreprend une formation à titre individuel et à ses frais, le Code du travail impose la conclusion d'un <strong>contrat de formation professionnelle</strong> avant l'inscription définitive et tout règlement de frais (art. L. 6353-3). Le chapitre 3 a détaillé son contenu ; rappelons ici les règles qui ont une incidence directe sur le financement et l'encaissement.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Règle</th><th>Article</th><th>Conséquence pratique</th></tr>
<tr><td>Le contrat précise notamment la nature, la durée, l'objet de l'action, l'effectif, le niveau de connaissances préalables requis, les conditions de déroulement, les diplômes, titres ou références des formateurs, les modalités de paiement et les conditions financières en cas de cessation anticipée ou d'abandon</td><td>L. 6353-4</td><td>Le prix, l'échéancier et les règles d'abandon doivent figurer dans le contrat lui-même, pas seulement dans des conditions générales non signées.</td></tr>
<tr><td>Le stagiaire dispose d'un délai de dix jours à compter de la signature pour se rétracter, par lettre recommandée avec avis de réception</td><td>L. 6353-5</td><td>Prévoir dans le planning commercial une signature au moins dix jours avant le début de la formation.</td></tr>
<tr><td>Aucune somme ne peut être exigée avant l'expiration du délai de rétractation ; à son expiration, le stagiaire ne peut être tenu de verser plus de 30 % du prix ; le solde donne lieu à un échelonnement au fur et à mesure du déroulement de l'action</td><td>L. 6353-6</td><td>Pas d'encaissement à la signature, pas de chèque « de réservation » encaissé, un acompte plafonné à 30 %, un solde réparti pendant la formation.</td></tr>
<tr><td>Si, par suite de force majeure dûment reconnue, le stagiaire est empêché de suivre la formation, il peut rompre le contrat ; seules les prestations effectivement dispensées sont alors dues, au prorata de leur valeur prévue</td><td>L. 6353-7</td><td>La clause d'abandon du contrat doit respecter cette règle ; les dédits ne peuvent viser que les autres cas d'abandon.</td></tr>
</table>
<p>Pour la formation de 35 heures au prix de 1 575 euros, un échéancier conforme peut prendre la forme suivante : un acompte de 472,50 euros (30 %) demandé après l'expiration du délai de rétractation, puis le solde de 1 102,50 euros réparti pendant la semaine de formation (par exemple 551,25 euros le mercredi et 551,25 euros le vendredi). Rien n'interdit de proposer un échéancier plus souple, étalé après la formation, si l'organisme l'accepte : la loi fixe un maximum exigible, pas un minimum.</p>
<blockquote><strong>Point de vigilance :</strong> lorsque le contrat est conclu à distance (par exemple par signature électronique après un échange en visioconférence) ou hors établissement, les règles du Code de la consommation relatives à l'information précontractuelle et au droit de rétractation du consommateur peuvent également trouver à s'appliquer. Faites relire votre trame de contrat par un professionnel du droit pour articuler les deux régimes.</blockquote>

<h3>2. Aider le particulier à boucler son budget, sans promesse hasardeuse</h3>
<p>Le particulier qui paie de sa poche compare, hésite et pose des questions précises : « Puis-je payer en plusieurs fois ? », « Existe-t-il une aide ? », « Est-ce que mon CPF peut servir ? ». Le rôle de l'organisme est de répondre exactement, sans promettre un financement qu'il ne maîtrise pas.</p>
<ul>
<li><strong>Paiement échelonné :</strong> présentez-le clairement dans le devis et le contrat, sans frais cachés.</li>
<li><strong>Demandeur d'emploi :</strong> orientez la personne vers son conseiller France Travail, seul compétent pour apprécier une aide individuelle ; précisez qu'une telle aide suppose en tout état de cause un organisme certifié Qualiopi.</li>
<li><strong>Travailleur indépendant :</strong> indiquez que le fonds d'assurance formation dont il relève peut, selon ses propres critères, prendre en charge certaines formations d'organismes certifiés, et qu'il lui appartient de vérifier ces critères avant de s'inscrire.</li>
<li><strong>CPF :</strong> répondez sans ambiguïté que cette formation, non certifiante, n'est pas éligible.</li>
</ul>

<h3>3. L'entreprise qui forme ses salariés : le plan de développement des compétences</h3>
<p>L'employeur assure l'adaptation de ses salariés à leur poste de travail et veille au maintien de leur capacité à occuper un emploi (art. L. 6321-1). Les actions qu'il organise pour cela relèvent du <strong>plan de développement des compétences</strong>. Lorsqu'une formation est obligatoire pour l'exercice d'une activité ou d'une fonction, elle constitue un temps de travail effectif et donne lieu au maintien de la rémunération (art. L. 6321-2).</p>
<p>Pour l'organisme de formation, la vente à une entreprise suit un circuit différent de celui du particulier :</p>
<ol>
<li>recueil du besoin auprès de l'employeur (et, idéalement, du salarié) ;</li>
<li>proposition commerciale et devis ;</li>
<li>signature d'une <strong>convention de formation</strong> entre l'acheteur et l'organisme (art. L. 6353-1 et L. 6353-2), qui précise l'intitulé, les objectifs, le programme, les dates, la durée, les modalités, le prix et l'effectif ;</li>
<li>le cas échéant, demande de prise en charge à l'OPCO par l'entreprise ;</li>
<li>réalisation, émargement, attestation de fin de formation remise au salarié, certificat de réalisation pour le financeur ;</li>
<li>facturation à l'entreprise ou, en cas de subrogation, directement à l'OPCO.</li>
</ol>

<h3>4. La prise en charge par l'OPCO</h3>
<p>Chaque entreprise relève d'un opérateur de compétences déterminé par sa convention collective ou son activité. Les OPCO financent notamment, sur les fonds mutualisés, le plan de développement des compétences des entreprises de moins de cinquante salariés, ainsi que l'alternance. Les règles concrètes (plafonds horaires, budgets annuels par entreprise, thèmes prioritaires, pièces à fournir) sont fixées par chaque OPCO et évoluent chaque année : elles se consultent sur le site de l'OPCO concerné.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Qui agit ?</th><th>Bonne pratique pour l'organisme</th></tr>
<tr><td>Identifier l'OPCO de l'entreprise</td><td>L'entreprise</td><td>Poser la question dès le premier échange ; ne jamais deviner.</td></tr>
<tr><td>Déposer la demande de prise en charge</td><td>L'entreprise, sur l'espace en ligne de l'OPCO, généralement avant le début de la formation</td><td>Fournir rapidement devis, programme et convention ; vérifier le délai de dépôt imposé par l'OPCO.</td></tr>
<tr><td>Recevoir l'accord de prise en charge</td><td>L'OPCO</td><td>Lire le montant accordé : il peut être inférieur au prix ; le reste est dû par l'entreprise.</td></tr>
<tr><td>Choisir la subrogation de paiement</td><td>L'entreprise, si l'OPCO la propose</td><td>Avec la subrogation, l'organisme facture l'OPCO directement ; prévoir un délai de paiement plus long.</td></tr>
<tr><td>Justifier la réalisation</td><td>L'organisme</td><td>Émargements par demi-journée, certificat de réalisation, facture conforme : sans ces pièces, pas de paiement.</td></tr>
</table>
<blockquote><strong>Exemple fil rouge :</strong> la Société Vergers de l'Yvette, entreprise fictive de 18 salariés, souhaite former deux assistantes à l'accueil téléphonique. Tant qu'Atelier Sésame Formation n'est pas certifiée, Inès propose une convention payée sur les fonds propres de l'entreprise, au même prix, et indique honnêtement que l'OPCO ne pourra pas intervenir. Elle note la demande dans son tableau de suivi : ce client sera recontacté après l'obtention de la certification.</blockquote>

<h3>5. Comparer les deux circuits</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Particulier à ses frais</th><th>Entreprise (fonds propres ou OPCO)</th></tr>
<tr><td>Document</td><td>Contrat de formation professionnelle (L. 6353-3)</td><td>Convention de formation (L. 6353-1, L. 6353-2)</td></tr>
<tr><td>Délai de rétractation légal</td><td>10 jours à compter de la signature</td><td>Pas de délai légal propre à la formation ; conditions d'annulation fixées par la convention et les CGV</td></tr>
<tr><td>Encaissement</td><td>Rien avant la fin du délai ; acompte au plus 30 % ; solde échelonné</td><td>Selon la convention ; délais de paiement du Code de commerce</td></tr>
<tr><td>Cycle de vente</td><td>Court, émotionnel, sensible au prix</td><td>Plus long, plusieurs interlocuteurs, sensible au retour sur investissement</td></tr>
<tr><td>Risque principal</td><td>Abandon, impayé partiel</td><td>Refus ou prise en charge partielle de l'OPCO, retard de paiement</td></tr>
</table>
<blockquote><strong>À retenir :</strong> avec un particulier, le contrat de formation professionnelle impose dix jours de rétractation, aucun paiement avant leur expiration, un acompte d'au plus 30 % et un solde échelonné. Avec une entreprise, la convention est la règle ; l'OPCO ne finance que les organismes certifiés, selon ses propres critères, et sur présentation de pièces justificatives de la réalisation.</blockquote>
`,
      },
      {
        title: "5.3 – Le compte personnel de formation : une perspective réservée aux offres certifiantes",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Comprendre le fonctionnement du compte personnel de formation (CPF) et le rôle de la Caisse des Dépôts.</li>
<li>Connaître les catégories de formations éligibles et les conditions de référencement d'un organisme sur EDOF.</li>
<li>Connaître la participation forfaitaire du titulaire et les plafonds de prise en charge applicables en 2026.</li>
<li>Expliquer clairement à un prospect pourquoi la formation « Gérer son centre de formation » n'est pas éligible, et ce qu'il faudrait faire pour proposer un jour une offre éligible.</li>
</ul>

<h3>1. Le CPF en quelques mots</h3>
<p>Le compte personnel de formation est ouvert à toute personne d'au moins seize ans qui entre sur le marché du travail ; il est alimenté en euros chaque année d'activité, dans la limite d'un plafond. Son titulaire le mobilise de sa propre initiative, sur la plateforme Mon Compte Formation gérée par la <strong>Caisse des Dépôts</strong>. L'organisme de formation, lui, publie son offre et gère les dossiers de ses stagiaires dans l'espace dédié aux organismes, appelé <strong>EDOF</strong> (espace des organismes de formation).</p>
<p>Le CPF n'est donc pas un financement que l'organisme « demande » pour un client : c'est le titulaire qui choisit une formation figurant au catalogue de la plateforme, s'y inscrit et valide sa commande. L'organisme accepte ou refuse la demande, réalise la formation, puis déclare sa réalisation pour être payé par la Caisse des Dépôts.</p>

<h3>2. Les formations éligibles</h3>
<p>L'article L. 6323-6 du Code du travail fixe la liste des actions éligibles. On y trouve principalement :</p>
<ul>
<li>les actions de formation sanctionnées par une certification enregistrée au <strong>RNCP</strong> (diplômes, titres à finalité professionnelle, certificats de qualification professionnelle enregistrés) ;</li>
<li>les actions sanctionnées par une certification ou une habilitation enregistrée au <strong>répertoire spécifique (RS)</strong> ;</li>
<li>les actions permettant d'obtenir une partie identifiée de certification professionnelle (bloc de compétences) ;</li>
<li>les actions d'accompagnement à la validation des acquis de l'expérience et les bilans de compétences ;</li>
<li>la préparation de certaines épreuves du permis de conduire ;</li>
<li>d'autres catégories prévues par le texte, dans les conditions qu'il fixe.</li>
</ul>
<p>Une formation qui ne débouche sur aucune certification enregistrée, comme celle que vous suivez, ne figure pas dans cette liste. Son programme peut être excellent et son organisme certifié Qualiopi : elle reste inéligible au CPF.</p>

<h3>3. Les conditions pour qu'un organisme vende des formations via le CPF</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Condition</th><th>Contenu</th></tr>
<tr><td>Déclaration d'activité</td><td>Disposer d'un numéro de déclaration d'activité en cours de validité (chapitre 2).</td></tr>
<tr><td>Certification Qualiopi</td><td>Être certifié au titre de la catégorie « actions de formation » (ou de la catégorie correspondant à la prestation : bilan de compétences, VAE), conformément à l'article L. 6316-1.</td></tr>
<tr><td>Droit de préparer la certification</td><td>Pour une certification dont il n'est pas lui-même le certificateur, être habilité par le certificateur (organisme ou ministère) à préparer ses candidats ou à organiser l'évaluation, selon les termes de leur accord.</td></tr>
<tr><td>Référencement sur EDOF</td><td>Créer son compte, accepter les conditions générales d'utilisation de la plateforme fixées par la Caisse des Dépôts, publier des actions conformes, respecter les règles de gestion des dossiers.</td></tr>
<tr><td>Respect des règles commerciales</td><td>Notamment l'interdiction du démarchage des titulaires du CPF (art. L. 6323-8-1, section 5.7).</td></tr>
</table>
<p>La Caisse des Dépôts contrôle le respect de ces conditions. La loi n° 2022-1587 du 19 décembre 2022 visant à lutter contre la fraude au compte personnel de formation lui a donné des moyens supplémentaires, notamment la possibilité de déréférencer un organisme qui ne respecte pas ses obligations, après mise en demeure.</p>

<h3>4. Ce que paie le titulaire : la participation forfaitaire</h3>
<p>Depuis le 2 mai 2024, le titulaire qui mobilise son CPF verse une <strong>participation forfaitaire</strong> obligatoire, parfois appelée « reste à charge ». Son montant a été fixé à 100 euros à sa création, puis revalorisé chaque année : il était de 103,20 euros au 1er janvier 2026. Le <strong>décret n° 2026-234 du 30 mars 2026</strong> l'a porté à <strong>150 euros</strong> pour les demandes d'inscription déposées à compter du 2 avril 2026.</p>
<p>Cette participation n'est pas due, notamment, par les demandeurs d'emploi, ni lorsque la formation bénéficie d'un abondement de l'employeur. Les règles d'exonération sont précisées sur le site officiel Mon Compte Formation ; ce sont elles qu'il faut citer à un prospect, et non des souvenirs ou des articles de presse.</p>

<h3>5. Les plafonds de prise en charge institués en 2026</h3>
<p>Le <strong>décret n° 2026-127 du 24 février 2026</strong> a instauré des plafonds de prise en charge par le CPF pour certaines catégories d'actions, applicables depuis le 26 février 2026 : notamment 1 500 euros pour les formations visant une certification enregistrée au répertoire spécifique (la certification CléA étant exclue de ce plafond) et 1 600 euros pour les bilans de compétences. Les formations visant une certification enregistrée au RNCP ne sont pas concernées par ce plafond. Au-delà du plafond, la différence doit être financée autrement : par le titulaire, par un abondement de l'employeur ou par un autre cofinanceur.</p>
<blockquote><strong>Point de vigilance :</strong> les montants et les plafonds du CPF ont changé plusieurs fois en peu de temps. Avant tout document commercial, vérifiez-les sur moncompteformation.gouv.fr et sur Légifrance, et datez l'information (« montant en vigueur au … »).</blockquote>

<h3>6. Le déroulement d'un dossier CPF, vu de l'organisme</h3>
<ol>
<li>Publication de l'action dans EDOF : intitulé, certification visée, programme, prix, sessions, lieu, modalités.</li>
<li>Demande d'inscription du titulaire sur Mon Compte Formation.</li>
<li>Réponse de l'organisme, dans le délai prévu par les conditions générales, avec une proposition de commande.</li>
<li>Validation de la commande par le titulaire et paiement de la participation forfaitaire si elle est due ; un délai minimal sépare la validation du début de la formation, fixé par les conditions générales de la plateforme.</li>
<li>Entrée en formation déclarée par l'organisme, réalisation, sortie déclarée.</li>
<li>Déclaration de service fait et facturation à la Caisse des Dépôts, sur la base du taux de réalisation.</li>
</ol>

<h3>7. Expliquer l'inéligibilité à un prospect</h3>
<p>Un porteur de projet demande à Inès MARCHAND s'il peut financer la formation « Gérer son centre de formation » avec son CPF. Une réponse loyale et utile pourrait être :</p>
<blockquote>« Non, cette formation n'est pas éligible au CPF : le CPF finance des formations qui préparent une certification enregistrée par France Compétences, et celle-ci n'en prépare aucune. Elle se termine par une évaluation des acquis et une attestation de fin de formation. Vous pouvez la régler à titre personnel en plusieurs fois : l'acompte ne peut pas dépasser 30 % du prix et rien n'est encaissé pendant les dix jours de rétractation. Si votre employeur vous la propose, il peut aussi la financer dans le cadre de son plan de développement des compétences. »</blockquote>

<h3>8. Et demain : rendre une offre éligible ?</h3>
<p>Un organisme qui souhaite proposer des formations éligibles au CPF dispose de deux voies principales :</p>
<ul>
<li><strong>Préparer une certification existante</strong> enregistrée au RNCP ou au RS, en obtenant l'habilitation du certificateur. C'est la voie la plus rapide, mais l'organisme dépend des exigences et du calendrier de ce certificateur.</li>
<li><strong>Créer sa propre certification</strong> et la faire enregistrer par France Compétences au répertoire spécifique ou au RNCP. C'est un projet lourd : référentiel d'activités, de compétences et d'évaluation, preuves de besoin du marché, dossier d'enregistrement, et, pour le RNCP, résultats d'insertion des titulaires sur plusieurs promotions.</li>
</ul>
<p>Dans les deux cas, la certification Qualiopi et le référencement sur EDOF restent nécessaires. Pour Atelier Sésame Formation, une perspective réaliste à moyen terme serait de préparer, en bureautique, une certification déjà enregistrée au répertoire spécifique, après avoir obtenu la certification Qualiopi.</p>
<blockquote><strong>À retenir :</strong> le CPF ne finance que des actions éligibles au sens de l'article L. 6323-6, essentiellement certifiantes, proposées par des organismes certifiés Qualiopi et référencés sur EDOF. Le titulaire verse une participation forfaitaire de 150 euros pour les demandes déposées depuis le 2 avril 2026, sauf exonération, et des plafonds s'appliquent depuis le 26 février 2026 à certaines catégories. La formation « Gérer son centre de formation », non certifiante, n'est pas éligible : le CPF n'est ici qu'une perspective.</blockquote>
`,
      },
      {
        title: "5.4 – Calculer son coût de revient et fixer son prix",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Distinguer charges fixes, charges variables, charges directes et charges indirectes d'une session de formation.</li>
<li>Calculer le coût de revient d'une session et le coût par stagiaire et par heure.</li>
<li>Déterminer le seuil de rentabilité d'une session en nombre de stagiaires.</li>
<li>Fixer un prix cohérent avec les coûts, le marché et le public visé.</li>
</ul>

<h3>1. Pourquoi tant d'organismes de formation vendent à perte</h3>
<p>Beaucoup de formateurs qui créent leur organisme fixent leur prix « au feeling », en regardant les tarifs affichés par d'autres organismes, ou en divisant par sept un tarif journalier qui leur paraît raisonnable. Ils oublient alors une grande partie de leurs coûts : le temps de préparation, l'accueil et le suivi administratif, les supports, la salle, l'assurance, le logiciel de gestion, l'expert-comptable, la certification Qualiopi, la prospection et, surtout, leur propre rémunération. Résultat : une activité qui « tourne » mais qui ne permet pas de vivre.</p>
<p>Le calcul du coût de revient n'est pas un exercice comptable réservé aux grandes structures. C'est un outil de décision qui répond à trois questions : combien me coûte réellement une session ? À partir de combien de stagiaires une session devient-elle rentable ? Quel prix minimal ne dois-je jamais descendre ?</p>

<h3>2. Les catégories de charges</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Catégorie</th><th>Définition</th><th>Exemples dans un organisme de formation</th></tr>
<tr><td>Charges directes variables</td><td>Elles dépendent du nombre de stagiaires</td><td>Supports imprimés, fournitures, pauses et boissons, licences de logiciels par apprenant, frais de plateforme par inscrit</td></tr>
<tr><td>Charges directes fixes de la session</td><td>Elles sont engagées pour la session, quel que soit le nombre de stagiaires</td><td>Rémunération du formateur, location de salle, déplacement du formateur, préparation spécifique</td></tr>
<tr><td>Charges indirectes (frais de structure)</td><td>Elles concernent l'ensemble de l'activité et doivent être réparties entre les sessions</td><td>Loyer et charges des locaux, assurance responsabilité civile professionnelle, expert-comptable, logiciel de gestion, site internet, téléphone, audit Qualiopi, veille, prospection, temps administratif de la dirigeante</td></tr>
</table>
<p>Pour répartir les charges indirectes, la méthode la plus simple consiste à estimer le <strong>nombre de jours de formation vendus dans l'année</strong> et à diviser le total des frais de structure par ce nombre. On obtient un coût de structure par jour de formation, à ajouter à chaque session.</p>

<h3>3. Exemple chiffré : une session de 35 heures chez Atelier Sésame Formation</h3>
<p>Inès MARCHAND veut vérifier si le prix de 1 575 euros par stagiaire, pratiqué par d'autres organismes pour une formation de cinq jours comparable, est viable pour elle. Les chiffres suivants sont fictifs.</p>
<p><strong>Hypothèses annuelles :</strong> frais de structure de 14 000 euros par an (loyer et charges de la salle, assurance, comptabilité, logiciels, site, audit de certification lissé, déplacements commerciaux) ; 70 jours de formation vendus par an. Le coût de structure par jour est donc de 14 000 / 70 = 200 euros.</p>
<p><strong>Hypothèses de la session (5 jours) :</strong> la session est animée par Inès elle-même ; elle se fixe une rémunération cible de 350 euros par jour de face-à-face, qui couvre aussi la préparation et le suivi (soit 1 750 euros) ; supports et fournitures : 25 euros par stagiaire ; pauses : 6 euros par stagiaire et par jour, soit 30 euros par stagiaire.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Poste</th><th>Calcul</th><th>Montant</th></tr>
<tr><td>Rémunération de la formatrice (charge directe fixe)</td><td>5 jours × 350 €</td><td>1 750 €</td></tr>
<tr><td>Quote-part de frais de structure (charge indirecte)</td><td>5 jours × 200 €</td><td>1 000 €</td></tr>
<tr><td><strong>Total des charges fixes de la session</strong></td><td></td><td><strong>2 750 €</strong></td></tr>
<tr><td>Charges variables par stagiaire</td><td>25 € + 30 €</td><td>55 € par stagiaire</td></tr>
</table>
<p>Le <strong>coût de revient de la session</strong> dépend du nombre de stagiaires :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Stagiaires</th><th>Coût total de la session</th><th>Coût par stagiaire</th><th>Chiffre d'affaires à 1 575 €</th><th>Résultat de la session</th></tr>
<tr><td>2</td><td>2 750 + 2 × 55 = 2 860 €</td><td>1 430 €</td><td>3 150 €</td><td>+ 290 €</td></tr>
<tr><td>4</td><td>2 750 + 4 × 55 = 2 970 €</td><td>742,50 €</td><td>6 300 €</td><td>+ 3 330 €</td></tr>
<tr><td>6</td><td>2 750 + 6 × 55 = 3 080 €</td><td>513,33 €</td><td>9 450 €</td><td>+ 6 370 €</td></tr>
<tr><td>8</td><td>2 750 + 8 × 55 = 3 190 €</td><td>398,75 €</td><td>12 600 €</td><td>+ 9 410 €</td></tr>
</table>

<h3>4. Le seuil de rentabilité d'une session</h3>
<p>Chaque stagiaire apporte une <strong>marge sur coût variable</strong> égale au prix moins les charges variables : 1 575 – 55 = 1 520 euros. Le seuil de rentabilité, exprimé en nombre de stagiaires, est le nombre minimal de stagiaires qui couvre les charges fixes de la session :</p>
<p style="text-align:center"><strong>Seuil = charges fixes de la session / marge sur coût variable par stagiaire = 2 750 / 1 520 ≈ 1,8, soit 2 stagiaires.</strong></p>
<p>Avec deux stagiaires, la session couvre ses coûts, y compris la rémunération cible d'Inès et sa quote-part de frais de structure. Le groupe minimal de quatre personnes annoncé dans le programme n'est donc pas une contrainte financière : c'est un choix pédagogique (échanges entre pairs, travaux en sous-groupes). Ce raisonnement permet aussi de décider sereinement du maintien ou du report d'une session faiblement remplie, selon des règles annoncées dans les conditions générales.</p>

<h3>5. Les indicateurs à connaître</h3>
<ul>
<li><strong>Prix par heure-stagiaire :</strong> 1 575 / 35 = 45 euros. C'est l'unité de comparaison habituelle des financeurs et des acheteurs.</li>
<li><strong>Chiffre d'affaires par jour de formation :</strong> avec 6 stagiaires, 9 450 / 5 = 1 890 euros par jour.</li>
<li><strong>Taux de remplissage :</strong> nombre de stagiaires / capacité maximale (ici 8). Avec 6 stagiaires, 75 %.</li>
<li><strong>Coût de revient par heure-stagiaire :</strong> avec 6 stagiaires, 3 080 / (6 × 35) ≈ 14,67 euros.</li>
</ul>

<h3>6. Du coût au prix : les trois approches</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Approche</th><th>Question posée</th><th>Limite</th></tr>
<tr><td>Par les coûts</td><td>Quel prix couvre mes coûts et ma marge, pour un remplissage réaliste ?</td><td>Ignore ce que le client est prêt à payer.</td></tr>
<tr><td>Par le marché</td><td>Quels sont les prix pratiqués pour des formations comparables (durée, public, modalités, certification ou non) ?</td><td>Risque de copier un prix qui ne couvre pas ses propres coûts.</td></tr>
<tr><td>Par la valeur perçue</td><td>Que gagne le client grâce à la formation (temps, sécurité juridique, chiffre d'affaires) ?</td><td>Suppose une offre clairement différenciée et des preuves (résultats, témoignages).</td></tr>
</table>
<p>Le bon prix se situe à l'intersection des trois : au-dessus du coût de revient pour un remplissage prudent, dans la fourchette du marché pour une prestation comparable, et justifié par une valeur que le client comprend. Pour un public de particuliers qui paient eux-mêmes, la sensibilité au prix est forte : l'échelonnement, la clarté de ce qui est inclus (supports, modèles de documents, suivi après la formation) et l'absence de frais annexes comptent souvent autant que le montant.</p>

<h3>7. Points de vigilance</h3>
<ul>
<li><strong>Prix net ou hors taxes :</strong> si l'organisme bénéficie de l'exonération de TVA de l'article 261-4-4° a du CGI (chapitre 6), le prix affiché est un prix net, sans TVA. Il faut l'indiquer clairement (« prix net, exonéré de TVA »).</li>
<li><strong>Égalité de traitement :</strong> pratiquer des prix différents selon le financeur pour une même prestation expose l'organisme à des difficultés lors d'un contrôle ; si des tarifs différenciés existent (particulier, entreprise, intra), ils doivent être publiés et justifiés par des prestations différentes.</li>
<li><strong>Révision annuelle :</strong> recalculez vos coûts chaque année, à partir des comptes de l'exercice clos.</li>
</ul>
<blockquote><strong>Bonne pratique :</strong> construisez un petit tableur de coût de revient avec, en entrée, le nombre de jours, la rémunération du formateur, les frais de structure par jour, les charges variables et le prix ; en sortie, le coût par stagiaire, le résultat et le seuil de rentabilité. Vous l'utiliserez pour chaque nouvelle formation et pour chaque devis intra-entreprise.</blockquote>
<blockquote><strong>À retenir :</strong> le coût de revient d'une session additionne les charges directes fixes, une quote-part des frais de structure et les charges variables par stagiaire. Le seuil de rentabilité se calcule en divisant les charges fixes par la marge sur coût variable d'un stagiaire. Le prix se fixe ensuite en croisant coûts, marché et valeur perçue, et s'affiche net de taxe en cas d'exonération de TVA.</blockquote>
`,
      },
      {
        title: "5.5 – Définir son positionnement et construire son offre commerciale",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Segmenter ses clients potentiels et choisir des cibles prioritaires.</li>
<li>Analyser la concurrence de manière factuelle.</li>
<li>Formuler une proposition de valeur claire et vérifiable.</li>
<li>Organiser un catalogue cohérent, du programme publié à l'offre sur mesure.</li>
</ul>

<h3>1. Le positionnement : savoir pour qui l'on travaille</h3>
<p>Un petit organisme de formation ne peut pas être « le spécialiste de tout ». Le positionnement consiste à choisir <strong>des publics</strong>, <strong>des besoins</strong> et <strong>une manière de faire</strong> qui le distinguent, puis à le dire de façon cohérente sur tous ses supports. Un positionnement flou produit des messages flous (« formations de qualité pour tous ») qui ne convainquent personne ; un positionnement précis permet de choisir ses canaux de prospection, ses partenaires et même ses formateurs.</p>

<h3>2. Segmenter ses clients</h3>
<p>La segmentation regroupe les clients qui ont des besoins, des modes d'achat et des financements semblables. Pour Atelier Sésame Formation, Inès a identifié quatre segments :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Segment</th><th>Besoin principal</th><th>Qui décide et qui paie ?</th><th>Canal privilégié</th></tr>
<tr><td>Particuliers en reconversion vers les métiers administratifs</td><td>Acquérir rapidement des compétences bureautiques reconnues par les recruteurs</td><td>La personne elle-même, sur ses fonds</td><td>Site internet, recommandations, réseaux d'accompagnement locaux</td></tr>
<tr><td>TPE et PME du nord de l'Essonne</td><td>Rendre l'accueil plus professionnel, gagner du temps sur les tableurs</td><td>Le dirigeant ; paiement sur fonds propres, puis OPCO une fois l'organisme certifié</td><td>Prospection directe, réseaux d'entreprises, clubs locaux</td></tr>
<tr><td>Autres organismes de formation</td><td>Disposer d'une formatrice qualifiée en sous-traitance</td><td>Le donneur d'ordre</td><td>Réseau professionnel, plateformes de mise en relation</td></tr>
<tr><td>Structures d'accueil du public (associations, collectivités)</td><td>Former les agents ou bénévoles à l'accueil</td><td>Le responsable de la structure ; règles d'achat public le cas échéant</td><td>Réponse à des consultations, réseau</td></tr>
</table>
<p>Inès décide de concentrer ses efforts commerciaux sur les deux premiers segments, qui représentent déjà 87 % de ses produits (section 5.1), tout en conservant la sous-traitance comme complément.</p>

<h3>3. Construire un portrait de client</h3>
<p>Pour chaque segment prioritaire, rédigez un portrait (souvent appelé « persona ») : situation, objectifs, freins, questions qu'il se pose, critères de choix. Exemple pour le premier segment :</p>
<blockquote><strong>Leïla BENSAÏD</strong> (personnage fictif), 38 ans, ancienne vendeuse en magasin, souhaite devenir assistante administrative. Elle a peu utilisé le tableur et craint de « ne pas suivre ». Elle finance elle-même sa formation et compare trois organismes. Ses questions : « Combien de personnes dans le groupe ? », « Puis-je payer en plusieurs fois ? », « Qu'est-ce que j'aurai à la fin ? », « Est-ce que je pourrai revenir poser des questions après ? ». Ses critères : la proximité, la taille du groupe, la clarté du prix, les avis d'anciens stagiaires.</blockquote>
<p>Ce portrait guide directement la rédaction du programme (prérequis rassurants, positionnement à l'entrée), de la page du site (réponses aux questions fréquentes) et du discours téléphonique.</p>

<h3>4. Analyser la concurrence sans la copier</h3>
<p>L'analyse concurrentielle consiste à repérer quatre à six offres comparables (même public, même durée, même zone ou même modalité) et à les décrire selon des critères identiques. Restez factuel : vous comparez des informations publiques, pas des rumeurs.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Ce qu'il faut relever</th></tr>
<tr><td>Contenu</td><td>Objectifs, programme, durée, part de pratique</td></tr>
<tr><td>Modalités</td><td>Présentiel, distanciel, mixte ; taille des groupes ; lieu ; horaires</td></tr>
<tr><td>Prix</td><td>Prix affiché, net ou hors taxes, prix par heure, conditions de paiement</td></tr>
<tr><td>Preuves</td><td>Certification qualité, indicateurs de résultats publiés, avis</td></tr>
<tr><td>Services associés</td><td>Suivi après la formation, ressources, accompagnement individuel</td></tr>
<tr><td>Accessibilité</td><td>Informations sur l'accueil des personnes en situation de handicap, référent identifié</td></tr>
</table>
<p>L'objectif n'est pas d'aligner son offre sur la moyenne, mais de trouver ce que l'on fait mieux, ou autrement, pour ses cibles prioritaires.</p>

<h3>5. Formuler une proposition de valeur</h3>
<p>La proposition de valeur répond en une ou deux phrases à la question du client : « Pourquoi vous plutôt qu'un autre ? ». Elle doit être <strong>précise</strong>, <strong>vérifiable</strong> et <strong>tenue</strong> : toute promesse non tenue devient une réclamation, et toute affirmation invérifiable peut constituer une pratique commerciale trompeuse.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>À éviter</th><th>Pourquoi</th><th>Formulation conforme</th></tr>
<tr><td>« La meilleure formation bureautique de l'Essonne »</td><td>Invérifiable</td><td>« Groupes de 4 à 8 personnes, exercices tirés de situations de bureau réelles »</td></tr>
<tr><td>« 100 % de retour à l'emploi »</td><td>Résultat non maîtrisé par l'organisme, chiffre non étayé</td><td>« Taux de satisfaction des stagiaires 2025 : à publier une fois mesuré, avec la méthode et l'effectif »</td></tr>
<tr><td>« Formation 100 % financée »</td><td>Dépend du financeur et de la situation de la personne ; faux pour un particulier à ses frais</td><td>« Paiement possible en plusieurs fois ; prise en charge par l'employeur possible selon les règles de son plan de développement des compétences »</td></tr>
<tr><td>« Formation agréée par l'État »</td><td>L'enregistrement de la déclaration d'activité ne vaut pas agrément de l'État (art. L. 6352-12)</td><td>« Déclaration d'activité enregistrée sous le numéro … Cet enregistrement ne vaut pas agrément de l'État. » (formule de l'article L. 6352-12)</td></tr>
</table>

<h3>6. Organiser son catalogue</h3>
<p>Un catalogue lisible distingue généralement trois formats :</p>
<ul>
<li><strong>Les formations inter-entreprises</strong>, à dates fixes, ouvertes à des stagiaires de structures différentes et à des particuliers ; leur programme est publié avec toutes les informations exigées (objectifs, prérequis, durée, modalités, délais d'accès, tarifs, contacts, accessibilité).</li>
<li><strong>Les formations intra-entreprise</strong>, réalisées pour le personnel d'un seul client, à partir du programme catalogue adapté après analyse du besoin ; le devis et la convention précisent les adaptations.</li>
<li><strong>Les parcours sur mesure</strong>, conçus pour un besoin spécifique ; ils exigent une analyse du besoin formalisée et un programme dédié.</li>
</ul>
<p>Chaque fiche du catalogue doit rester exacte : un programme publié qui ne correspond plus à ce qui est réellement dispensé est une source de non-conformité lors d'un audit Qualiopi et de litiges avec les clients.</p>
<blockquote><strong>Bonne pratique :</strong> numérotez et datez chaque version de programme (par exemple « V1 du 05/01/2026 ») et conservez les versions antérieures. Vous pourrez ainsi prouver quel programme a été remis à quel client, à quelle date.</blockquote>
<blockquote><strong>À retenir :</strong> le positionnement repose sur des segments prioritaires, des portraits de clients, une analyse factuelle de la concurrence et une proposition de valeur précise, vérifiable et tenue. Le catalogue distingue inter, intra et sur mesure, et chaque programme publié doit correspondre à ce qui est réellement réalisé.</blockquote>
`,
      },
      {
        title: "5.6 – Le site internet de l'organisme et ses mentions obligatoires",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Recenser les mentions légales et réglementaires qu'un site d'organisme de formation doit comporter.</li>
<li>Présenter correctement le numéro de déclaration d'activité et, le cas échéant, la certification Qualiopi.</li>
<li>Publier des fiches de formation complètes et exactes.</li>
<li>Respecter les règles relatives aux données personnelles et aux traceurs (cookies).</li>
</ul>

<h3>1. Le site, première vitrine et premier document de preuve</h3>
<p>Pour la plupart des prospects, le site internet est le premier contact avec l'organisme. C'est aussi un document que lisent les auditeurs Qualiopi (information du public, indicateurs 1 à 3 du référentiel), les agents de contrôle et, le cas échéant, les services de la protection des consommateurs. Il doit donc être à la fois commercial et rigoureusement exact.</p>

<h3>2. Les mentions légales</h3>
<p>La loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN) impose aux éditeurs de sites professionnels de permettre leur identification. Pour une entreprise individuelle comme Atelier Sésame Formation, la page « Mentions légales » comporte au minimum :</p>
<ul>
<li>les nom et prénom de l'entrepreneur, le nom commercial s'il existe, l'adresse de l'établissement, l'adresse électronique et le numéro de téléphone ;</li>
<li>le numéro d'identification de l'entreprise (SIREN ou SIRET) et, le cas échéant, l'immatriculation au registre national des entreprises ;</li>
<li>le cas échéant, le numéro individuel d'identification à la TVA ;</li>
<li>le nom du directeur de la publication ;</li>
<li>le nom, la dénomination ou la raison sociale, l'adresse et le numéro de téléphone de l'hébergeur du site.</li>
</ul>
<p>Pour une société, s'ajoutent la forme juridique, la dénomination sociale, le montant du capital social et l'adresse du siège.</p>

<h3>3. Le numéro de déclaration d'activité : une formule imposée</h3>
<p>L'article <strong>L. 6352-12 du Code du travail</strong> encadre la manière dont un organisme fait état de sa déclaration d'activité dans sa publicité : lorsque la publicité en fait mention, elle doit l'être « sous la seule forme » suivante :</p>
<blockquote>« Enregistrée sous le numéro … Cet enregistrement ne vaut pas agrément de l'État. »</blockquote>
<p>Il est d'usage de préciser à quoi se rapporte le numéro (« Déclaration d'activité enregistrée sous le numéro … ») ; l'essentiel est de reprendre la formule légale sans l'enjoliver ni l'abréger.</p>
<p>La phrase « Cet enregistrement ne vaut pas agrément de l'État » est essentielle : le numéro de déclaration d'activité atteste d'un enregistrement administratif, pas d'une reconnaissance de la qualité des formations. Toute formule laissant croire à un agrément (« organisme agréé », « formation reconnue par l'État ») est à proscrire.</p>

<h3>4. La certification Qualiopi : un usage encadré de la marque</h3>
<p>Seul un organisme certifié peut utiliser la marque Qualiopi, et uniquement pendant la validité de son certificat. Son usage est encadré par la charte d'usage de la marque publiée par le ministère chargé de la formation professionnelle. En pratique, l'organisme certifié :</p>
<ul>
<li>reproduit le logo sans le modifier ;</li>
<li>indique, à proximité du logo, la ou les catégories d'actions au titre desquelles la certification a été délivrée (par exemple : « La certification qualité a été délivrée au titre de la catégorie d'action suivante : actions de formation ») ;</li>
<li>ne laisse pas penser qu'une catégorie non certifiée (par exemple les bilans de compétences) est couverte ;</li>
<li>retire le logo dès que le certificat n'est plus valide.</li>
</ul>
<p>Atelier Sésame Formation n'étant pas encore certifiée, son site ne doit comporter <strong>ni le logo Qualiopi, ni une formule du type « en cours de certification »</strong> qui pourrait induire le prospect en erreur. Elle pourra en revanche indiquer, de façon neutre, ses engagements qualité (programme publié, évaluation, recueil des appréciations, traitement des réclamations).</p>

<h3>5. Les fiches de formation</h3>
<p>Chaque formation proposée doit faire l'objet d'une fiche complète. Le référentiel national qualité (indicateur 1) attend une information accessible au public, détaillée et vérifiable : prérequis, objectifs, durée, modalités et délais d'accès, tarifs, contacts, méthodes mobilisées, modalités d'évaluation, accessibilité aux personnes en situation de handicap. Pour la formation de référence, la fiche pourrait se présenter ainsi :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu</th></tr>
<tr><td>Intitulé</td><td>Gérer son centre de formation – 35 h</td></tr>
<tr><td>Public</td><td>Porteurs de projet de création d'un organisme de formation, formateurs indépendants, dirigeants et responsables de petits organismes</td></tr>
<tr><td>Prérequis</td><td>Avoir un projet ou une activité de formation, même débutante ; maîtrise du français écrit ; usage courant d'un ordinateur et d'une messagerie</td></tr>
<tr><td>Objectifs</td><td>Les six compétences C1 à C6, formulées en termes opérationnels</td></tr>
<tr><td>Durée et rythme</td><td>35 heures, 5 jours de 7 heures (9 h – 12 h 30, 13 h 30 – 17 h)</td></tr>
<tr><td>Modalités</td><td>Présentiel, groupe de 4 à 8 personnes</td></tr>
<tr><td>Délais d'accès</td><td>Inscription possible jusqu'à une date à préciser avant le début de la session, sous réserve du délai de rétractation de dix jours pour les particuliers</td></tr>
<tr><td>Tarif</td><td>1 575 € net par stagiaire (préciser le régime de TVA de l'organisme)</td></tr>
<tr><td>Évaluation et sanction</td><td>Évaluation des acquis (quiz, cas pratiques, projet final) ; attestation de fin de formation. Formation non certifiante.</td></tr>
<tr><td>Financement</td><td>Financement personnel, paiement échelonné possible ; financement par l'employeur possible. Formation non éligible au CPF.</td></tr>
<tr><td>Accessibilité</td><td>Coordonnées du référent handicap, conditions d'accès des locaux, adaptations possibles après entretien</td></tr>
<tr><td>Contact</td><td>Téléphone et adresse électronique de l'organisme</td></tr>
</table>

<h3>6. Les indicateurs de résultats</h3>
<p>Le référentiel national qualité demande de diffuser des indicateurs de résultats adaptés à la nature des prestations et des publics (indicateur 2), par exemple le taux de satisfaction des stagiaires, le taux de réalisation complète ou le taux d'abandon. Publiez-les avec leur méthode de calcul, leur période et l'effectif concerné (« Taux de satisfaction : 92 % – 13 répondants sur 13 stagiaires – année 2025 », chiffres à remplacer par les vôtres). Un nouvel organisme, qui ne dispose pas encore de résultats, l'indique simplement et publie ses premiers chiffres dès qu'il les a.</p>

<h3>7. Conditions générales, prix et médiation</h3>
<ul>
<li><strong>Conditions générales de vente :</strong> elles doivent être accessibles avant la commande ; pour les clients professionnels, le Code de commerce impose de les communiquer à tout acheteur qui en fait la demande (art. L. 441-1).</li>
<li><strong>Information sur les prix :</strong> le Code de la consommation impose d'informer le consommateur sur les prix ; le prix affiché doit être le prix effectivement payé (net de taxe en cas d'exonération de TVA, toutes taxes comprises sinon), frais compris.</li>
<li><strong>Médiation de la consommation :</strong> tout professionnel qui contracte avec des consommateurs doit leur garantir le recours effectif et gratuit à un médiateur de la consommation (art. L. 612-1 du Code de la consommation) et en communiquer les coordonnées, notamment sur son site et dans ses conditions générales. Un organisme qui vend à des particuliers est concerné.</li>
</ul>

<h3>8. Données personnelles et traceurs</h3>
<p>Dès qu'un site comporte un formulaire de contact ou de préinscription, il collecte des données personnelles. Il doit comporter une <strong>politique de confidentialité</strong> (identité du responsable, finalités, bases légales, destinataires, durées de conservation, droits des personnes, coordonnées pour les exercer, droit d'introduire une réclamation auprès de la CNIL). Le formulaire ne collecte que les données nécessaires (minimisation) et renvoie vers cette politique.</p>
<p>Les traceurs (cookies de mesure d'audience, réseaux sociaux, publicité) non strictement nécessaires au fonctionnement du site ne peuvent être déposés qu'après le consentement de l'internaute, recueilli par un bandeau qui permet de refuser aussi facilement que d'accepter, conformément aux lignes directrices et recommandations de la CNIL. Certains outils de mesure d'audience paramétrés de façon à ne produire que des statistiques anonymes peuvent être exemptés de consentement, dans les conditions définies par la CNIL. Le RGPD est développé au chapitre 6.</p>

<h3>9. Liste de contrôle du site d'Atelier Sésame Formation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Présent ?</th><th>Action</th></tr>
<tr><td>Mentions légales complètes (éditeur, SIRET, directrice de publication, hébergeur)</td><td>Partiel : hébergeur manquant</td><td>Compléter</td></tr>
<tr><td>Numéro de déclaration d'activité avec la formule de l'article L. 6352-12</td><td>Non : mention « organisme agréé »</td><td>Remplacer par la formule légale</td></tr>
<tr><td>Fiches de formation complètes</td><td>Partiel : délais d'accès et accessibilité absents</td><td>Compléter chaque fiche</td></tr>
<tr><td>Indicateurs de résultats</td><td>Non</td><td>Publier le taux de satisfaction 2025 avec méthode et effectif</td></tr>
<tr><td>CGV et médiateur de la consommation</td><td>CGV présentes, médiateur absent</td><td>Adhérer à un dispositif de médiation et l'indiquer</td></tr>
<tr><td>Politique de confidentialité et bandeau de consentement</td><td>Politique absente, cookies déposés sans consentement</td><td>Rédiger la politique ; paramétrer le bandeau</td></tr>
</table>
<blockquote><strong>À retenir :</strong> le site d'un organisme de formation comporte les mentions légales de la LCEN, la formule imposée par l'article L. 6352-12 pour le numéro de déclaration d'activité, des fiches de formation complètes et exactes, des indicateurs de résultats datés, les CGV, les coordonnées d'un médiateur de la consommation lorsqu'il vend à des particuliers, une politique de confidentialité et un bandeau de consentement aux traceurs. Le logo Qualiopi n'apparaît que si l'organisme est certifié, avec la catégorie d'actions concernée.</blockquote>
`,
      },
      {
        title: "5.7 – Prospecter dans le respect des règles : réseaux sociaux, courriels, téléphone et interdiction du démarchage pour le CPF",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Choisir des canaux de prospection adaptés à chaque segment de clientèle.</li>
<li>Appliquer les règles de la prospection par courrier électronique envers les professionnels et les particuliers.</li>
<li>Connaître le régime du démarchage téléphonique depuis le 11 août 2026.</li>
<li>Connaître l'interdiction de la prospection commerciale des titulaires du CPF et ses sanctions.</li>
</ul>

<h3>1. Les canaux de prospection d'un petit organisme</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Canal</th><th>Intérêt</th><th>Points d'attention</th></tr>
<tr><td>Recommandation et bouche-à-oreille</td><td>Le canal le plus efficace pour les particuliers et les TPE</td><td>Le susciter : demander l'autorisation de citer un client, proposer un témoignage écrit validé</td></tr>
<tr><td>Réseaux professionnels locaux (clubs d'entreprises, chambres consulaires, associations de créateurs)</td><td>Rencontres directes avec des dirigeants</td><td>Demande du temps ; préparer une présentation courte et un support</td></tr>
<tr><td>Partenariats avec les acteurs de l'accompagnement (structures d'aide à la création, missions locales, associations)</td><td>Orientation de publics qualifiés</td><td>Rester indépendant : l'orientation appartient au prescripteur ; aucune contrepartie financière par stagiaire orienté</td></tr>
<tr><td>Site internet et référencement naturel</td><td>Visibilité durable auprès de ceux qui cherchent une formation</td><td>Contenus utiles et exacts, fiches complètes, mise à jour régulière</td></tr>
<tr><td>Réseaux sociaux</td><td>Notoriété, preuve d'expertise, contact avec des professionnels</td><td>Publication régulière, droit à l'image des stagiaires, pas de démarchage CPF</td></tr>
<tr><td>Courriels de prospection</td><td>Faible coût, ciblage possible des professionnels</td><td>Règles distinctes selon que le destinataire est un professionnel ou un particulier</td></tr>
<tr><td>Téléphone</td><td>Échange direct</td><td>Consentement préalable des consommateurs depuis le 11 août 2026 ; interdiction absolue pour le CPF</td></tr>
<tr><td>Salons, forums de l'emploi et de la formation</td><td>Contacts nombreux, en face à face</td><td>Coût de stand ; recueillir les coordonnées avec une information claire</td></tr>
</table>

<h3>2. Les réseaux sociaux : montrer son expertise</h3>
<p>Pour un organisme de formation, les réseaux sociaux servent moins à « vendre » qu'à démontrer une expertise et à entretenir une relation. Quelques principes :</p>
<ul>
<li><strong>Publier des contenus utiles :</strong> une astuce de tableur, une erreur fréquente dans un accueil téléphonique, une information réglementaire vérifiée et datée.</li>
<li><strong>Montrer les coulisses :</strong> préparation d'une session, salle, outils, sans jamais diffuser l'image d'un stagiaire sans son autorisation écrite, précise et révocable.</li>
<li><strong>Publier des témoignages vérifiables :</strong> avec l'accord écrit de leur auteur, sans les retoucher pour les rendre plus flatteurs ; ne jamais inventer d'avis.</li>
<li><strong>Répondre aux messages</strong> avec la même rigueur qu'à un courriel : le message privé reçu par un prospect qui a pris contact est une réponse à sa demande, pas une prospection.</li>
</ul>

<h3>3. La prospection par courrier électronique</h3>
<p>Les règles diffèrent selon le destinataire, en application de l'article L. 34-5 du Code des postes et des communications électroniques et du RGPD, telles que les explique la CNIL :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Destinataire</th><th>Règle</th><th>Exemple</th></tr>
<tr><td>Particulier (consommateur)</td><td>Consentement préalable, libre, spécifique et éclairé ; exception pour un client existant sollicité pour des produits ou services analogues, s'il a été informé et mis en mesure de s'opposer lors de la collecte</td><td>Une ancienne stagiaire qui a accepté de recevoir la lettre d'information peut recevoir l'annonce des nouvelles sessions</td></tr>
<tr><td>Professionnel</td><td>Prospection possible sans consentement préalable si le message est en rapport avec la profession de la personne, si elle a été informée de l'utilisation de son adresse et mise en mesure de s'y opposer</td><td>Un courriel à la gérante d'une PME pour lui présenter une formation à l'accueil téléphonique</td></tr>
<tr><td>Tous</td><td>Identification claire de l'expéditeur, objet en rapport avec le contenu, lien de désinscription simple et gratuit dans chaque message, prise en compte immédiate des oppositions</td><td>Lien « Ne plus recevoir nos messages » en bas de chaque courriel</td></tr>
</table>
<p>L'achat de fichiers d'adresses est risqué : l'organisme qui les utilise doit pouvoir démontrer que les personnes ont été informées et ont consenti, ou ne se sont pas opposées, selon le cas. En pratique, mieux vaut construire son propre fichier, à partir des personnes qui ont pris contact ou se sont inscrites à une lettre d'information.</p>

<h3>4. Le démarchage téléphonique depuis le 11 août 2026</h3>
<p>L'article 13 de la <strong>loi n° 2025-594 du 30 juin 2025</strong> contre toutes les fraudes aux aides publiques a réécrit l'article L. 223-1 du Code de la consommation. Depuis le <strong>11 août 2026</strong>, le démarchage téléphonique des consommateurs repose sur leur <strong>consentement préalable</strong> : un professionnel ne peut plus appeler un consommateur à des fins de prospection commerciale sans son accord exprès, libre, spécifique, éclairé, univoque et révocable, dont il doit pouvoir apporter la preuve. Le régime antérieur fondé sur l'opposition (liste Bloctel) a pris fin à cette date. Des exceptions subsistent, notamment pour les sollicitations en rapport avec un contrat en cours. Le non-respect de ces règles est sanctionné par une amende administrative.</p>
<p>Pour un organisme de formation, la conséquence est simple : on n'appelle un particulier que s'il l'a demandé (demande de rappel cochée sur le formulaire du site, appel convenu lors d'un échange) ou dans le cadre d'un contrat en cours. La prospection téléphonique de professionnels, pour des offres en rapport avec leur activité, relève d'un régime distinct ; elle doit rester loyale et respecter le droit d'opposition.</p>

<h3>5. L'interdiction de la prospection des titulaires du CPF</h3>
<p>La <strong>loi n° 2022-1587 du 19 décembre 2022</strong> visant à lutter contre la fraude au compte personnel de formation et à interdire le démarchage de ses titulaires a créé l'article <strong>L. 6323-8-1 du Code du travail</strong>. Il interdit toute prospection commerciale des titulaires du CPF, par téléphone, par message d'un service de communications interpersonnelles (SMS, messageries), par courrier électronique ou sur un service de réseau social en ligne, lorsqu'elle vise à collecter leurs données personnelles (notamment le montant de leurs droits ou leurs données d'identification) ou à conclure des contrats portant sur des actions financées par le CPF. Seules échappent à l'interdiction les sollicitations intervenant dans le cadre d'une action de formation en cours et ayant un lien direct avec elle.</p>
<p>Le même article interdit de proposer des ventes, offres promotionnelles ou avantages incitatifs liés à l'inscription à une formation financée par le CPF. Les manquements sont passibles d'une <strong>amende administrative pouvant atteindre 75 000 euros pour une personne physique et 375 000 euros pour une personne morale</strong>, prononcée selon les procédures du Code de la consommation. La Caisse des Dépôts peut en outre déréférencer l'organisme.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Autorisé ?</th><th>Pourquoi</th></tr>
<tr><td>Un organisme publie sur son site et ses réseaux une page présentant sa formation certifiante éligible au CPF</td><td>Oui</td><td>Publicité non ciblée ; c'est la personne qui vient vers l'offre.</td></tr>
<tr><td>Un organisme appelle des particuliers pour « vérifier le montant de leurs droits CPF »</td><td>Non</td><td>Prospection visant à collecter des données sur les droits : interdite.</td></tr>
<tr><td>Un organisme envoie un SMS proposant une tablette offerte pour toute inscription via le CPF</td><td>Non</td><td>Prospection interdite et avantage incitatif interdit.</td></tr>
<tr><td>Pendant une formation en cours, la formatrice informe le stagiaire des modalités d'évaluation de la certification qu'il prépare</td><td>Oui</td><td>Sollicitation en lien direct avec l'action en cours.</td></tr>
</table>
<p>Ces règles ne concernent pas directement la formation « Gérer son centre de formation », qui n'est pas éligible au CPF. Elles seront en revanche décisives pour tout organisme qui proposera un jour des formations certifiantes : un futur dirigeant d'organisme doit les connaître avant de concevoir sa stratégie commerciale.</p>

<h3>6. Le plan de prospection d'Atelier Sésame Formation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Action</th><th>Cible</th><th>Fréquence</th><th>Indicateur</th></tr>
<tr><td>Publication d'un conseil pratique sur un réseau professionnel</td><td>TPE, PME, particuliers</td><td>Une par semaine</td><td>Nombre de prises de contact générées</td></tr>
<tr><td>Participation au club d'entreprises local</td><td>Dirigeants de TPE</td><td>Une réunion par mois</td><td>Rendez-vous obtenus</td></tr>
<tr><td>Courriel de présentation de la formation « Accueil téléphonique » aux entreprises du fichier constitué légalement</td><td>Dirigeants de PME</td><td>Une campagne par trimestre</td><td>Taux de réponse, désinscriptions</td></tr>
<tr><td>Lettre d'information aux anciens stagiaires ayant consenti</td><td>Particuliers</td><td>Une par trimestre</td><td>Réinscriptions, recommandations</td></tr>
<tr><td>Rencontre avec deux structures d'accompagnement à la reconversion</td><td>Prescripteurs</td><td>Une fois par semestre</td><td>Orientations reçues</td></tr>
</table>
<blockquote><strong>À retenir :</strong> la prospection d'un organisme de formation s'appuie d'abord sur la recommandation, les réseaux locaux, les partenariats et des contenus utiles. Les courriels de prospection supposent le consentement des particuliers et l'information des professionnels ; le démarchage téléphonique des consommateurs suppose leur consentement préalable depuis le 11 août 2026 ; et toute prospection des titulaires du CPF est interdite par l'article L. 6323-8-1, sous peine d'amendes pouvant atteindre 75 000 euros (personne physique) et 375 000 euros (personne morale).</blockquote>
`,
      },
      {
        title: "5.8 – Du premier contact au devis : un processus commercial loyal et tracé",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Structurer le traitement d'une demande, du premier contact à l'inscription.</li>
<li>Rédiger un devis complet et cohérent avec le programme et le contrat.</li>
<li>Suivre ses opportunités commerciales dans un tableau simple.</li>
<li>Repérer et éviter les pratiques commerciales trompeuses ou agressives.</li>
</ul>

<h3>1. Le processus commercial en sept étapes</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Objectif</th><th>Trace conservée</th></tr>
<tr><td>1. Prise de contact</td><td>Accuser réception rapidement, qualifier la demande (qui ? pour qui ? quand ? quel financement ?)</td><td>Ligne dans le tableau de suivi, date de la demande</td></tr>
<tr><td>2. Entretien d'analyse du besoin</td><td>Comprendre la situation, les objectifs, les prérequis, les contraintes (dates, accessibilité)</td><td>Fiche d'analyse du besoin datée</td></tr>
<tr><td>3. Envoi de l'information</td><td>Programme, conditions générales, règlement intérieur ou lien vers le site</td><td>Courriel d'envoi conservé</td></tr>
<tr><td>4. Devis</td><td>Formaliser l'offre : prestation, dates, prix, conditions</td><td>Devis numéroté et daté</td></tr>
<tr><td>5. Relance</td><td>Répondre aux questions, lever les freins, sans pression</td><td>Date et contenu de la relance</td></tr>
<tr><td>6. Contractualisation</td><td>Contrat de formation (particulier) ou convention (entreprise)</td><td>Document signé, date de signature</td></tr>
<tr><td>7. Positionnement et convocation</td><td>Vérifier les prérequis, adapter si nécessaire, convoquer</td><td>Test ou entretien de positionnement, convocation</td></tr>
</table>
<p>Ce processus n'est pas seulement commercial : chaque trace conservée constitue une preuve pour l'audit Qualiopi (analyse du besoin, information du bénéficiaire, positionnement) et pour un éventuel contrôle.</p>

<h3>2. Le devis</h3>
<p>Le devis est une proposition écrite qui engage l'organisme pendant sa durée de validité. Aucun texte n'impose une liste unique de mentions pour un devis de formation entre professionnels, mais un devis complet évite les malentendus et prépare la convention ou le contrat. Il comporte :</p>
<ul>
<li>l'identification de l'organisme (nom, adresse, SIRET, numéro de déclaration d'activité) et du client ;</li>
<li>un numéro et une date, ainsi qu'une durée de validité ;</li>
<li>l'intitulé exact de la formation, la référence et la version du programme joint ;</li>
<li>les dates, horaires, durée en heures, lieu, modalités (présentiel, distanciel), effectif ;</li>
<li>le prix unitaire et total, la mention du régime de TVA (« exonération de TVA, article 261-4-4° a du CGI » si l'organisme bénéficie de l'attestation) ;</li>
<li>les conditions de paiement et, pour un particulier, le rappel du délai de rétractation et du plafond d'acompte de 30 % ;</li>
<li>les conditions d'annulation et de report, ou le renvoi aux conditions générales jointes ;</li>
<li>la mention de ce qui est inclus (supports, pauses, suivi) et de ce qui ne l'est pas (repas, déplacements).</li>
</ul>
<p>Pour un particulier, le devis ne remplace pas le contrat de formation professionnelle : il le prépare. C'est le contrat signé qui fait courir le délai de rétractation de dix jours.</p>

<h3>3. Exemple de devis fil rouge</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th colspan="2">Atelier Sésame Formation – Devis n° D-2026-041 du 12/10/2026 – valable 30 jours</th></tr>
<tr><td>Client</td><td>Leïla BENSAÏD, particulier, finançant sa formation à titre personnel</td></tr>
<tr><td>Formation</td><td>Tableur – niveau initiation, programme V2 du 05/01/2026 joint</td></tr>
<tr><td>Dates et durée</td><td>Session de 3 jours, 21 heures, en présentiel à Massy, groupe de 4 à 8 personnes</td></tr>
<tr><td>Prix</td><td>945 € net – exonération de TVA, article 261-4-4° a du CGI (chiffres fictifs)</td></tr>
<tr><td>Paiement</td><td>Aucun paiement avant l'expiration du délai de rétractation de 10 jours suivant la signature du contrat ; acompte de 30 % (283,50 €) à l'expiration de ce délai ; solde de 661,50 € le dernier jour de la formation</td></tr>
<tr><td>Inclus</td><td>Supports, fichiers d'exercices, pauses, accès à une séance de questions-réponses à distance un mois après la formation</td></tr>
<tr><td>Annulation</td><td>Selon le contrat de formation professionnelle et les conditions générales jointes ; en cas de force majeure dûment reconnue, seules les prestations effectivement dispensées sont dues au prorata</td></tr>
</table>

<h3>4. Le tableau de suivi commercial</h3>
<p>Un simple tableur suffit pour piloter l'activité commerciale d'un petit organisme. Chaque ligne correspond à une opportunité :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Date</th><th>Contact</th><th>Segment</th><th>Formation</th><th>Financement</th><th>Étape</th><th>Montant</th><th>Prochaine action</th></tr>
<tr><td>02/10/2026</td><td>Société Vergers de l'Yvette</td><td>PME</td><td>Accueil téléphonique, intra</td><td>Fonds propres</td><td>Devis envoyé</td><td>2 100 €</td><td>Relance le 16/10</td></tr>
<tr><td>08/10/2026</td><td>Leïla BENSAÏD</td><td>Particulier</td><td>Tableur initiation</td><td>Personnel</td><td>Devis envoyé</td><td>945 €</td><td>Rappel convenu le 15/10</td></tr>
<tr><td>10/10/2026</td><td>Organisme partenaire</td><td>Sous-traitance</td><td>Bureautique</td><td>Donneur d'ordre</td><td>Négociation</td><td>1 260 €</td><td>Contrat de sous-traitance à rédiger</td></tr>
</table>
<p>Trois indicateurs suffisent pour commencer : le nombre de demandes reçues par mois, le taux de transformation (devis signés / devis envoyés) et le délai moyen entre la demande et la signature.</p>

<h3>5. Les pratiques commerciales interdites</h3>
<p>Le Code de la consommation interdit les <strong>pratiques commerciales déloyales</strong>, parmi lesquelles les pratiques <strong>trompeuses</strong> (art. L. 121-2 et suivants) et <strong>agressives</strong> (art. L. 121-6 et suivants). Dans le secteur de la formation, elles prennent souvent les formes suivantes :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Pratique</th><th>Pourquoi elle est trompeuse ou agressive</th></tr>
<tr><td>Affirmer qu'une formation non certifiante « donne un diplôme » ou « est reconnue par l'État »</td><td>Information fausse sur les caractéristiques essentielles de la prestation</td></tr>
<tr><td>Annoncer un financement « garanti » ou « gratuit »</td><td>L'organisme ne décide pas du financement ; un particulier qui paie lui-même n'est jamais en formation « gratuite »</td></tr>
<tr><td>Publier des avis inventés ou sélectionner uniquement les avis positifs en laissant croire à l'exhaustivité</td><td>Faux témoignages, information trompeuse sur la satisfaction</td></tr>
<tr><td>Afficher un logo de certification non détenue ou une catégorie non certifiée</td><td>Usage trompeur d'un signe de qualité</td></tr>
<tr><td>Faire pression pour une signature immédiate (« dernière place, l'offre expire ce soir ») alors que c'est faux</td><td>Pratique agressive ou trompeuse sur la disponibilité</td></tr>
<tr><td>Promettre un emploi ou un chiffre d'affaires à l'issue de la formation</td><td>Résultat que l'organisme ne maîtrise pas</td></tr>
</table>

<h3>6. Répondre à une objection avec loyauté</h3>
<p>Lors de la relance, la Société Vergers de l'Yvette objecte : « Votre concurrent nous dit que, chez lui, l'OPCO paiera tout. » Une réponse loyale :</p>
<blockquote>« Je ne peux pas vous parler des conditions d'un autre organisme. Ce que je peux vous dire, c'est que les OPCO ne financent que les organismes certifiés Qualiopi, selon leurs propres critères et leur budget, et que leur accord est donné à l'entreprise, généralement avant la formation. Atelier Sésame Formation n'est pas encore certifiée : si vous retenez notre proposition, elle sera financée sur vos fonds propres. Je vous recontacterai dès que notre certification sera obtenue, si vous le souhaitez. »</blockquote>
<blockquote><strong>À retenir :</strong> un processus commercial structuré (contact, analyse du besoin, information, devis, relance, contractualisation, positionnement) produit des traces utiles à la qualité et au contrôle. Le devis est complet et cohérent avec le programme et le contrat ; le suivi commercial tient dans un tableau ; et toute promesse invérifiable, tout faux avis ou toute pression indue constitue une pratique commerciale déloyale.</blockquote>
`,
      },
      {
        title: "5.9 – Quiz de fin de chapitre",
        content: `
<p>Répondez aux dix questions, puis consultez le corrigé. Une seule réponse est correcte par question.</p>

<h4>Question 1</h4>
<p>Un organisme de formation non certifié Qualiopi peut-il être payé par l'OPCO d'une entreprise cliente ?</p>
<ul>
<li>A. Oui, si l'entreprise compte moins de cinquante salariés</li>
<li>B. Oui, si la formation dure plus de 14 heures</li>
<li>C. Non : l'article L. 6316-1 réserve les fonds des OPCO aux prestataires certifiés</li>
<li>D. Oui, à condition de le préciser dans la convention</li>
</ul>

<h4>Question 2</h4>
<p>Un particulier signe le lundi 2 novembre son contrat de formation professionnelle. Que pouvez-vous lui demander ce jour-là ?</p>
<ul>
<li>A. Un acompte de 30 %</li>
<li>B. Rien : aucune somme ne peut être exigée avant l'expiration du délai de rétractation de dix jours</li>
<li>C. La totalité du prix, remboursable s'il se rétracte</li>
<li>D. Un chèque de caution encaissé</li>
</ul>

<h4>Question 3</h4>
<p>Pour une formation à 1 575 euros vendue à un particulier, quel est le montant maximal exigible à l'expiration du délai de rétractation ?</p>
<ul>
<li>A. 157,50 euros</li>
<li>B. 472,50 euros</li>
<li>C. 787,50 euros</li>
<li>D. 1 575 euros</li>
</ul>

<h4>Question 4</h4>
<p>Pourquoi la formation « Gérer son centre de formation – 35 h » n'est-elle pas éligible au CPF ?</p>
<ul>
<li>A. Parce qu'elle se déroule en présentiel</li>
<li>B. Parce qu'elle dure moins de 70 heures</li>
<li>C. Parce qu'elle ne prépare aucune certification enregistrée au RNCP ou au répertoire spécifique</li>
<li>D. Parce que son prix dépasse un plafond</li>
</ul>

<h4>Question 5</h4>
<p>Quel est le montant de la participation forfaitaire due par un salarié qui dépose, en octobre 2026, une demande d'inscription à une formation éligible au CPF, sans abondement de son employeur ?</p>
<ul>
<li>A. Aucune participation n'est due</li>
<li>B. 100 euros</li>
<li>C. 103,20 euros</li>
<li>D. 150 euros</li>
</ul>

<h4>Question 6</h4>
<p>Une session a des charges fixes de 2 750 euros ; chaque stagiaire paie 1 575 euros et génère 55 euros de charges variables. Quel est le seuil de rentabilité ?</p>
<ul>
<li>A. 1 stagiaire</li>
<li>B. 2 stagiaires</li>
<li>C. 4 stagiaires</li>
<li>D. 6 stagiaires</li>
</ul>

<h4>Question 7</h4>
<p>Quelle formule doit figurer dans une publicité qui mentionne la déclaration d'activité de l'organisme ?</p>
<ul>
<li>A. « Organisme agréé par la DREETS »</li>
<li>B. « Enregistrée sous le numéro … Cet enregistrement ne vaut pas agrément de l'État. »</li>
<li>C. « Formation reconnue par l'État »</li>
<li>D. Aucune : le numéro suffit</li>
</ul>

<h4>Question 8</h4>
<p>Depuis le 11 août 2026, à quelle condition un organisme peut-il appeler un particulier pour lui proposer une formation ?</p>
<ul>
<li>A. Si son numéro n'est pas inscrit sur une liste d'opposition</li>
<li>B. S'il a donné son consentement préalable, ou dans le cadre d'un contrat en cours</li>
<li>C. S'il appelle entre 10 h et 13 h</li>
<li>D. Sans condition, s'il s'agit d'une formation non éligible au CPF</li>
</ul>

<h4>Question 9</h4>
<p>Un organisme envoie des SMS à des inconnus pour « vérifier leurs droits CPF ». Quelle est la sanction encourue par une société ?</p>
<ul>
<li>A. Un simple avertissement de la Caisse des Dépôts</li>
<li>B. Une amende administrative pouvant atteindre 375 000 euros, et un déréférencement possible</li>
<li>C. Aucune, si les SMS sont envoyés le week-end</li>
<li>D. Une amende de 1 500 euros</li>
</ul>

<h4>Question 10</h4>
<p>Laquelle de ces formulations commerciales est acceptable pour un organisme non certifié qui vend à des particuliers ?</p>
<ul>
<li>A. « Formation 100 % financée »</li>
<li>B. « Organisme en cours de certification Qualiopi » accompagné du logo</li>
<li>C. « Paiement en plusieurs fois ; aucun paiement pendant le délai de rétractation de dix jours »</li>
<li>D. « Diplôme remis en fin de formation »</li>
</ul>

<h3>Corrigé et explications</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>C</td><td>Depuis le 1er janvier 2022, les fonds des OPCO, de l'État, des Régions, de la Caisse des Dépôts, de France Travail et de l'Agefiph sont réservés aux prestataires certifiés (art. L. 6316-1). L'entreprise peut en revanche payer sur ses fonds propres.</td></tr>
<tr><td>2</td><td>B</td><td>Article L. 6353-6 : aucune somme ne peut être exigée avant l'expiration du délai de rétractation de dix jours prévu à l'article L. 6353-5.</td></tr>
<tr><td>3</td><td>B</td><td>À l'expiration du délai de rétractation, le stagiaire ne peut être tenu de verser plus de 30 % du prix : 1 575 × 0,30 = 472,50 euros. Le solde est échelonné pendant la formation.</td></tr>
<tr><td>4</td><td>C</td><td>Le CPF finance les actions éligibles de l'article L. 6323-6, essentiellement certifiantes. Une formation non certifiante n'y figure pas, quelles que soient sa durée et sa modalité.</td></tr>
<tr><td>5</td><td>D</td><td>Le décret n° 2026-234 du 30 mars 2026 a porté la participation forfaitaire à 150 euros pour les demandes déposées à compter du 2 avril 2026 ; elle n'est pas due notamment en cas d'abondement de l'employeur ou pour les demandeurs d'emploi.</td></tr>
<tr><td>6</td><td>B</td><td>Marge sur coût variable par stagiaire : 1 575 – 55 = 1 520 euros ; 2 750 / 1 520 ≈ 1,8, arrondi à 2 stagiaires.</td></tr>
<tr><td>7</td><td>B</td><td>C'est la seule forme autorisée par l'article L. 6352-12. Les autres formulations laissent croire à un agrément qui n'existe pas.</td></tr>
<tr><td>8</td><td>B</td><td>L'article L. 223-1 du Code de la consommation, réécrit par la loi n° 2025-594 du 30 juin 2025, subordonne le démarchage téléphonique des consommateurs à leur consentement préalable depuis le 11 août 2026, sous réserve d'exceptions comme le contrat en cours.</td></tr>
<tr><td>9</td><td>B</td><td>Article L. 6323-8-1 : amende administrative jusqu'à 75 000 euros pour une personne physique et 375 000 euros pour une personne morale ; la Caisse des Dépôts peut déréférencer l'organisme.</td></tr>
<tr><td>10</td><td>C</td><td>C'est une information exacte et conforme aux articles L. 6353-5 et L. 6353-6. Les autres formulations sont trompeuses (financement, certification, diplôme).</td></tr>
</table>
<p><strong>Barème indicatif :</strong> 9 ou 10 bonnes réponses : notions maîtrisées ; 6 à 8 : relire les sections correspondant aux erreurs ; moins de 6 : reprendre le chapitre avant le cas pratique.</p>
`,
      },
      {
        title: "5.10 – Cas pratique : bâtir le plan de financement et de commercialisation d'Atelier Sésame Formation",
        content: `
<h3>Consigne</h3>
<p>Inès MARCHAND, dirigeante d'<strong>Atelier Sésame Formation</strong> (organisme fictif, entreprise individuelle à Massy), vous demande de l'aider à préparer son plan de financement et de commercialisation pour l'année à venir. Tous les chiffres sont fictifs.</p>
<p><strong>Situation :</strong></p>
<ul>
<li>L'organisme n'est pas encore certifié Qualiopi ; l'audit initial est envisagé dans six mois. Il bénéficie de l'attestation d'exonération de TVA pour ses actions de formation continue.</li>
<li>Produits de l'exercice écoulé : 24 250 euros, dont 41 % de particuliers à leurs frais, 46 % d'entreprises sur fonds propres et 13 % de sous-traitance (section 5.1).</li>
<li>Inès veut lancer une nouvelle formation inter-entreprises « Accueil physique et téléphonique » de 3 jours (21 heures), en présentiel à Massy, pour 4 à 8 personnes. Elle l'animera elle-même avec une rémunération cible de 350 euros par jour. Frais de structure : 200 euros par jour de formation. Charges variables : 20 euros de supports et 18 euros de pauses par stagiaire.</li>
<li>Les formations comparables relevées dans un rayon de 30 km sont vendues entre 750 et 1 050 euros pour 3 jours.</li>
<li>Son site affiche « Organisme agréé n° 11 91 … », le logo Qualiopi « en cours », et la phrase « Vos formations financées à 100 % ! ».</li>
<li>Paul RENAUD, formateur indépendant qui travaille parfois pour elle, lui suggère d'« acheter un fichier de numéros de particuliers et de les appeler pour leur parler de leur CPF ».</li>
<li>La Société Vergers de l'Yvette (18 salariés) souhaite former deux assistantes à l'accueil et demande si son OPCO peut payer.</li>
</ul>
<p><strong>Travail demandé :</strong></p>
<ol>
<li>Calculez le coût de revient de la nouvelle session pour 4, 6 et 8 stagiaires, son seuil de rentabilité, et proposez un prix argumenté.</li>
<li>Établissez, pour chaque segment de clientèle, les financements mobilisables aujourd'hui et après la certification.</li>
<li>Proposez un échéancier de paiement conforme pour un particulier.</li>
<li>Corrigez les trois mentions problématiques du site.</li>
<li>Répondez par écrit à la suggestion de Paul RENAUD.</li>
<li>Rédigez la réponse à la Société Vergers de l'Yvette.</li>
<li>Construisez un plan d'actions commerciales sur six mois, avec des indicateurs.</li>
</ol>

<h3>Corrigé</h3>

<h4>1. Coût de revient, seuil de rentabilité et prix</h4>
<p><strong>Charges fixes de la session :</strong> rémunération de la formatrice 3 × 350 = 1 050 euros ; frais de structure 3 × 200 = 600 euros ; total 1 650 euros. <strong>Charges variables :</strong> 20 + 18 = 38 euros par stagiaire.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Stagiaires</th><th>Coût total</th><th>Coût par stagiaire</th><th>Coût par heure-stagiaire</th></tr>
<tr><td>4</td><td>1 650 + 4 × 38 = 1 802 €</td><td>450,50 €</td><td>21,45 €</td></tr>
<tr><td>6</td><td>1 650 + 6 × 38 = 1 878 €</td><td>313 €</td><td>14,90 €</td></tr>
<tr><td>8</td><td>1 650 + 8 × 38 = 1 954 €</td><td>244,25 €</td><td>11,63 €</td></tr>
</table>
<p><strong>Prix proposé :</strong> 900 euros net par stagiaire (soit environ 42,86 euros par heure-stagiaire), au milieu de la fourchette du marché (750 – 1 050 euros). Ce prix se justifie par la petite taille du groupe, les mises en situation enregistrées puis analysées avec l'accord des stagiaires, et la séance de suivi à distance un mois après la formation.</p>
<p><strong>Seuil de rentabilité :</strong> marge sur coût variable par stagiaire = 900 – 38 = 862 euros ; 1 650 / 862 ≈ 1,9, soit 2 stagiaires. Le minimum pédagogique de 4 personnes garantit donc une marge confortable (avec 4 stagiaires : 3 600 – 1 802 = 1 798 euros de résultat).</p>
<p>Le prix sera affiché « 900 € net – exonération de TVA, article 261-4-4° a du CGI ». Le même tarif s'appliquera aux particuliers et aux entreprises en inter ; un tarif intra distinct, calculé par session, sera publié.</p>

<h4>2. Financements mobilisables par segment</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Segment</th><th>Aujourd'hui (non certifiée)</th><th>Après certification Qualiopi (actions de formation)</th></tr>
<tr><td>Particuliers à leurs frais</td><td>Financement personnel, paiement échelonné</td><td>Idem ; pour un demandeur d'emploi, une aide de France Travail peut être sollicitée par la personne auprès de son conseiller, selon les critères de France Travail</td></tr>
<tr><td>TPE et PME</td><td>Fonds propres de l'entreprise (convention)</td><td>Fonds propres, ou prise en charge partielle par l'OPCO selon ses critères, sur demande de l'entreprise</td></tr>
<tr><td>Travailleurs indépendants</td><td>Financement personnel</td><td>Demande possible auprès du fonds d'assurance formation dont ils relèvent, selon ses critères</td></tr>
<tr><td>Autres organismes (sous-traitance)</td><td>Contrat de sous-traitance</td><td>Idem ; la certification de l'organisme sous-traitant peut être exigée par le donneur d'ordre</td></tr>
<tr><td>CPF</td><td>Non</td><td>Toujours non pour ces formations non certifiantes ; perspective seulement si l'organisme prépare un jour une certification enregistrée (par exemple au RS, en bureautique), avec habilitation du certificateur et référencement EDOF</td></tr>
</table>

<h4>3. Échéancier pour un particulier (formation à 900 euros)</h4>
<ul>
<li>Signature du contrat au plus tard 15 jours avant le début, afin que le délai de rétractation de dix jours soit écoulé.</li>
<li>Aucun paiement pendant le délai de rétractation.</li>
<li>Acompte de 270 euros (30 %) à l'expiration du délai.</li>
<li>Solde de 630 euros échelonné : 315 euros le premier jour de la formation, 315 euros le dernier jour.</li>
<li>Mention dans le contrat de la règle de la force majeure (seules les prestations effectivement dispensées sont dues au prorata) et des conditions financières en cas d'abandon pour un autre motif.</li>
</ul>

<h4>4. Correction des mentions du site</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Mention actuelle</th><th>Problème</th><th>Correction</th></tr>
<tr><td>« Organisme agréé n° 11 91 … »</td><td>Laisse croire à un agrément ; ne respecte pas la forme imposée par l'article L. 6352-12</td><td>« Déclaration d'activité enregistrée sous le numéro 11 91 … Cet enregistrement ne vaut pas agrément de l'État. »</td></tr>
<tr><td>Logo Qualiopi « en cours »</td><td>Usage de la marque sans certificat ; pratique trompeuse</td><td>Retrait du logo ; présentation neutre des engagements qualité ; le logo sera ajouté après la délivrance du certificat, avec la catégorie « actions de formation »</td></tr>
<tr><td>« Vos formations financées à 100 % ! »</td><td>Faux pour les particuliers à leurs frais ; l'organisme ne décide pas des financements</td><td>« Paiement possible en plusieurs fois. Entreprises : financement dans le cadre de votre plan de développement des compétences. Nos formations ne sont pas éligibles au CPF. »</td></tr>
</table>
<p>À l'occasion de cette révision, Inès complète aussi les mentions légales (hébergeur), ajoute les coordonnées de son médiateur de la consommation et met en place un bandeau de consentement aux traceurs.</p>

<h4>5. Réponse à Paul RENAUD</h4>
<blockquote>
<p>Bonjour Paul,</p>
<p>Merci pour ta suggestion, mais nous ne la mettrons pas en œuvre, pour trois raisons.</p>
<p>D'abord, nos formations ne sont pas éligibles au CPF : en parler à des particuliers serait trompeur. Ensuite, toute prospection des titulaires du CPF par téléphone, SMS, courriel ou réseaux sociaux est interdite par l'article L. 6323-8-1 du Code du travail, avec des amendes pouvant atteindre 75 000 euros pour une personne physique et 375 000 euros pour une société. Enfin, depuis le 11 août 2026, on ne peut plus appeler un particulier pour lui vendre une prestation sans son consentement préalable : un fichier acheté ne nous apporterait aucune garantie à ce sujet.</p>
<p>Je préfère que nous misions sur les recommandations de nos anciens stagiaires, sur le club d'entreprises et sur nos partenaires de l'accompagnement à la reconversion. Ton aide serait précieuse pour rédiger quelques conseils pratiques à publier chaque semaine.</p>
<p>Inès</p>
</blockquote>

<h4>6. Réponse à la Société Vergers de l'Yvette</h4>
<blockquote>
<p>Madame,</p>
<p>Je vous remercie de votre intérêt pour notre formation « Accueil physique et téléphonique ». Les opérateurs de compétences ne peuvent financer que des organismes certifiés Qualiopi ; Atelier Sésame Formation prépare cette certification mais ne l'a pas encore obtenue. Votre OPCO ne pourra donc pas prendre en charge cette session.</p>
<p>Je vous propose deux possibilités : inscrire vos deux assistantes à la session inter-entreprises du mois de décembre, au prix de 900 euros net par personne (exonération de TVA, article 261-4-4° a du CGI), financée sur votre budget de formation, ou attendre l'obtention de notre certification pour que vous puissiez déposer une demande auprès de votre OPCO, qui l'examinera selon ses propres critères. Dans les deux cas, je vous propose un entretien de quinze minutes pour préciser vos attentes et adapter les mises en situation à votre activité.</p>
<p>Je reste à votre disposition.</p>
<p>Inès MARCHAND, Atelier Sésame Formation</p>
</blockquote>

<h4>7. Plan d'actions commerciales sur six mois</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Mois</th><th>Actions</th><th>Indicateur et cible</th></tr>
<tr><td>1</td><td>Correction du site et des fiches ; publication des indicateurs de résultats 2025 ; tableau de suivi commercial</td><td>Site conforme à la liste de contrôle : 100 %</td></tr>
<tr><td>1 à 6</td><td>Un conseil pratique publié chaque semaine sur un réseau professionnel</td><td>24 publications ; au moins 2 prises de contact par mois</td></tr>
<tr><td>2</td><td>Lettre d'information aux anciens stagiaires ayant consenti ; demande de témoignages écrits</td><td>5 témoignages autorisés</td></tr>
<tr><td>2 à 6</td><td>Participation mensuelle au club d'entreprises ; courriel trimestriel aux PME du fichier constitué légalement</td><td>6 rendez-vous ; 3 conventions signées</td></tr>
<tr><td>3</td><td>Rencontre avec deux structures d'accompagnement à la reconversion</td><td>Orientations reçues suivies dans le tableau</td></tr>
<tr><td>4</td><td>Première session « Accueil physique et téléphonique »</td><td>Au moins 4 stagiaires ; satisfaction mesurée</td></tr>
<tr><td>6</td><td>Audit initial Qualiopi ; recontact des entreprises qui attendaient la certification</td><td>Certificat obtenu ; demandes OPCO déposées par les entreprises intéressées</td></tr>
</table>
<p>Indicateurs de pilotage suivis chaque mois : nombre de demandes, taux de transformation des devis, taux de remplissage des sessions, répartition des produits par origine (pour réduire la dépendance à un seul segment).</p>
<blockquote><strong>À retenir :</strong> un plan de financement et de commercialisation crédible part du coût de revient, fixe un prix cohérent avec le marché, distingue ce qui est possible aujourd'hui de ce que la certification permettra demain, respecte strictement les règles applicables aux particuliers (rétractation, acompte), corrige toute communication trompeuse, refuse les pratiques de prospection interdites et se pilote avec quelques indicateurs simples.</blockquote>
`,
      },
    ],
  },
  {
    title: "Chapitre 6 – Assurer la gestion administrative et financière de l'organisme (C5)",
    description:
      "Organiser le parcours administratif d'un stagiaire, du devis à la facture (contrat ou convention, convocation, émargement, attestation de fin de formation, certificat de réalisation) ; émettre des factures comportant les mentions obligatoires et appliquer les délais de paiement ; maîtriser l'exonération de TVA de l'article 261-4-4° a du CGI et ses conditions ; anticiper la facturation électronique ; piloter la trésorerie avec un tableau de bord ; s'assurer et s'outiller ; lire et remplir, cadre par cadre, le bilan pédagogique et financier (cadres A à H du formulaire Cerfa 10443) et le transmettre dans les délais sur Mon Activité Formation ; archiver les pièces pendant les durées requises ; appliquer le RGPD (registre des traitements, information des personnes, durées de conservation, sécurité, violations). Durée indicative : une demi-journée. Fil rouge : Atelier Sésame Formation, organisme de formation fictif créé par Inès MARCHAND à Massy (Essonne).",
    sections: [
      {
        title: "6.1 – Le parcours administratif d'un stagiaire : du devis à la facture",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Recenser les documents qui jalonnent le parcours d'un stagiaire et leur fondement.</li>
<li>Distinguer l'attestation de fin de formation et le certificat de réalisation.</li>
<li>Organiser l'émargement de manière à prouver l'assiduité.</li>
<li>Constituer un dossier stagiaire complet, prêt pour un audit ou un contrôle.</li>
</ul>

<h3>1. Pourquoi formaliser le parcours administratif ?</h3>
<p>La gestion administrative d'un organisme de formation n'est pas une formalité : elle constitue <strong>la preuve de la réalité des actions</strong>. Lors d'un contrôle de l'État (services régionaux de contrôle de la DREETS) ou d'un financeur, l'organisme doit être en mesure de justifier l'exécution des actions qu'il a facturées. À défaut, les sommes perçues peuvent devoir être remboursées, et des sanctions financières s'ajoutent dans les cas prévus par le Code du travail (articles L. 6362-1 et suivants). L'auditeur Qualiopi, lui, vérifie les mêmes pièces sous l'angle de la qualité.</p>
<p>Un parcours bien formalisé apporte aussi un confort quotidien : moins d'oublis, moins de relances, des stagiaires informés et une facturation qui part à temps.</p>

<h3>2. Les étapes et les documents</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Document</th><th>Fondement ou utilité</th><th>Particulier à ses frais</th><th>Entreprise</th></tr>
<tr><td>1. Demande et analyse du besoin</td><td>Fiche d'analyse du besoin</td><td>Référentiel national qualité (critère 2) ; adaptation de l'offre</td><td>Oui</td><td>Oui, avec l'employeur et si possible le salarié</td></tr>
<tr><td>2. Proposition</td><td>Devis, programme, conditions générales</td><td>Information préalable</td><td>Oui</td><td>Oui</td></tr>
<tr><td>3. Contractualisation</td><td>Contrat de formation professionnelle ou convention de formation</td><td>Art. L. 6353-3 à L. 6353-7 (particulier) ; L. 6353-1 et L. 6353-2 (entreprise)</td><td>Contrat, rétractation de 10 jours</td><td>Convention</td></tr>
<tr><td>4. Positionnement</td><td>Test ou entretien de positionnement</td><td>Vérification des prérequis, adaptation du parcours</td><td>Oui</td><td>Oui</td></tr>
<tr><td>5. Information avant l'entrée</td><td>Convocation, règlement intérieur, informations pratiques (horaires, lieu, accès, référent handicap)</td><td>Art. L. 6353-8 : remise du programme, des informations relatives aux formateurs, aux horaires, aux modalités d'évaluation, aux contacts, ainsi que du règlement intérieur, avant l'inscription définitive</td><td>Oui</td><td>Oui</td></tr>
<tr><td>6. Réalisation</td><td>Feuilles d'émargement par demi-journée, signées par le stagiaire et le formateur</td><td>Preuve de l'assiduité</td><td>Oui</td><td>Oui</td></tr>
<tr><td>7. Évaluation</td><td>Évaluations des acquis (quiz, cas pratiques, projet), grille de résultats</td><td>Mesure de l'atteinte des objectifs</td><td>Oui</td><td>Oui</td></tr>
<tr><td>8. Fin de formation</td><td>Attestation de fin de formation</td><td>Art. L. 6353-1 : remise au stagiaire d'une attestation mentionnant les objectifs, la nature et la durée de l'action et les résultats de l'évaluation des acquis</td><td>Oui</td><td>Oui</td></tr>
<tr><td>9. Justification au financeur</td><td>Certificat de réalisation</td><td>Modèle fixé par arrêté, exigé par les financeurs publics et mutualisés</td><td>Non nécessaire</td><td>Si OPCO ou autre financeur</td></tr>
<tr><td>10. Facturation</td><td>Facture</td><td>Code de commerce et CGI (section 6.2)</td><td>Facture ou note</td><td>Facture</td></tr>
<tr><td>11. Appréciation</td><td>Questionnaire de satisfaction à chaud, éventuellement à froid</td><td>Référentiel national qualité (critère 7)</td><td>Oui</td><td>Oui, stagiaire et employeur</td></tr>
</table>

<h3>3. Attestation de fin de formation et certificat de réalisation</h3>
<p>Ces deux documents sont souvent confondus. Ils n'ont pourtant ni le même destinataire ni le même objet.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Attestation de fin de formation</th><th>Certificat de réalisation</th></tr>
<tr><td>Destinataire</td><td>Le stagiaire</td><td>Le financeur (OPCO, Caisse des Dépôts, France Travail…)</td></tr>
<tr><td>Objet</td><td>Informer le stagiaire de ce qu'il a suivi et des résultats de l'évaluation de ses acquis</td><td>Justifier la réalisation de l'action pour obtenir le paiement</td></tr>
<tr><td>Contenu</td><td>Objectifs, nature, durée de l'action, résultats de l'évaluation des acquis</td><td>Identification de l'organisme, du stagiaire, de l'action, nature de l'action, durée réalisée (en heures), signature du dispensateur</td></tr>
<tr><td>Fondement</td><td>Art. L. 6353-1 du Code du travail</td><td>Modèle établi par arrêté du ministre chargé de la formation professionnelle</td></tr>
</table>
<p>Pour une formation non certifiante comme « Gérer son centre de formation », l'attestation de fin de formation est le document de sanction remis au stagiaire. Elle ne doit pas être intitulée « diplôme » ni « certificat » : elle atteste d'une formation suivie et de résultats d'évaluation interne.</p>

<h3>4. L'émargement, pièce maîtresse</h3>
<p>Les feuilles d'émargement prouvent la présence. Quelques règles de bon sens, que les contrôleurs et les auditeurs vérifient :</p>
<ul>
<li>une signature par stagiaire et <strong>par demi-journée</strong>, au moment de la séance et non en fin de semaine ;</li>
<li>la signature du formateur sur chaque feuille ;</li>
<li>l'intitulé de la formation, la date, les horaires et le lieu ;</li>
<li>une case barrée ou la mention « absent » en cas d'absence, jamais un espace laissé vide ;</li>
<li>pour la formation à distance, des preuves équivalentes (relevés de connexion, travaux remis, émargement électronique horodaté) ;</li>
<li>aucune signature « rattrapée » après coup : une absence justifiée se documente, elle ne se dissimule pas.</li>
</ul>
<p>L'émargement électronique est admis, à condition que l'outil garantisse l'identification du signataire, l'horodatage et l'intégrité des données.</p>

<h3>5. Le dossier stagiaire type</h3>
<p>Pour chaque stagiaire, Atelier Sésame Formation tient un dossier numérique nommé « Année_Formation_NOM_Prénom », qui contient dans l'ordre :</p>
<ol>
<li>la fiche d'analyse du besoin et le test de positionnement ;</li>
<li>le devis et le contrat signé (ou la convention et, le cas échéant, l'accord de prise en charge) ;</li>
<li>la preuve d'envoi de la convocation, du programme et du règlement intérieur ;</li>
<li>les feuilles d'émargement de la session (ou l'extrait le concernant) ;</li>
<li>les évaluations des acquis et la grille de résultats ;</li>
<li>l'attestation de fin de formation (copie) et, si nécessaire, le certificat de réalisation ;</li>
<li>la ou les factures et la preuve des encaissements ;</li>
<li>le questionnaire de satisfaction ;</li>
<li>le cas échéant, les échanges relatifs à une adaptation (situation de handicap, aménagement d'horaires), à une réclamation ou à un abandon.</li>
</ol>

<h3>6. Le calendrier administratif d'une session</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Quand ?</th><th>Quoi ?</th></tr>
<tr><td>J – 30 à J – 15</td><td>Signature des contrats et conventions ; pour les particuliers, signature au moins dix jours avant le début pour que le délai de rétractation soit expiré</td></tr>
<tr><td>J – 10 à J – 7</td><td>Positionnement ; envoi des convocations, du programme, du règlement intérieur ; encaissement des acomptes des particuliers dont le délai est expiré</td></tr>
<tr><td>J – 2</td><td>Préparation des feuilles d'émargement, des supports, de la salle ; vérification des aménagements prévus</td></tr>
<tr><td>Pendant la session</td><td>Émargement par demi-journée ; encaissements échelonnés prévus au contrat</td></tr>
<tr><td>Dernier jour</td><td>Évaluation finale, questionnaire de satisfaction, remise des attestations</td></tr>
<tr><td>J + 1 à J + 7</td><td>Facturation ; certificats de réalisation ; classement des dossiers</td></tr>
<tr><td>J + 30 à J + 90</td><td>Relances des impayés ; questionnaire à froid si prévu ; analyse des appréciations</td></tr>
</table>
<blockquote><strong>Bonne pratique :</strong> transformez ce calendrier en liste de contrôle imprimée ou en modèle de tâches dans votre outil de gestion, et cochez chaque étape pour chaque session.</blockquote>
<blockquote><strong>À retenir :</strong> le parcours administratif va de l'analyse du besoin à la facture et à l'appréciation. Chaque étape laisse une trace : contrat ou convention, informations remises avant l'entrée (art. L. 6353-8), émargements par demi-journée, attestation de fin de formation remise au stagiaire (art. L. 6353-1), certificat de réalisation pour le financeur, facture. Ces traces prouvent la réalité de l'action.</blockquote>
`,
      },
      {
        title: "6.2 – Facturer : mentions obligatoires, délais de paiement et facturation électronique",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Rédiger une facture comportant toutes les mentions obligatoires.</li>
<li>Appliquer les règles de numérotation, d'acompte et d'avoir.</li>
<li>Connaître les délais de paiement et les pénalités de retard entre professionnels.</li>
<li>Anticiper la généralisation de la facturation électronique.</li>
</ul>

<h3>1. À qui facture-t-on ?</h3>
<p>La facture est adressée à celui qui doit payer : le stagiaire particulier, l'entreprise cliente ou, en cas de subrogation de paiement, l'OPCO pour la part qu'il prend en charge (le reste étant facturé à l'entreprise). Entre professionnels, l'émission d'une facture est obligatoire dès la réalisation de la prestation (art. L. 441-9 du Code de commerce). Pour un particulier, une note doit être délivrée pour toute prestation de services d'un montant supérieur à 25 euros TTC et, en dessous, si le client la demande ; dans la pratique, les organismes de formation émettent une facture dans tous les cas, ce qui facilite la comptabilité et le suivi des encaissements.</p>

<h3>2. Les mentions obligatoires</h3>
<p>Les mentions résultent principalement de l'article L. 441-9 du Code de commerce et de l'article 242 nonies A de l'annexe II au Code général des impôts. Pour un organisme de formation, on retiendra :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Mention</th><th>Précision</th></tr>
<tr><td>Date d'émission</td><td>Date à laquelle la facture est établie</td></tr>
<tr><td>Numéro unique</td><td>Fondé sur une séquence chronologique continue, sans rupture ; des séries distinctes sont possibles si elles sont justifiées (par exemple F-2026-001, F-2026-002…)</td></tr>
<tr><td>Identité du prestataire</td><td>Nom ou dénomination, adresse ; pour un entrepreneur individuel, nom et prénom précédés ou suivis de la mention « entrepreneur individuel » ou « EI » ; numéro SIREN ou SIRET ; forme juridique et capital pour une société</td></tr>
<tr><td>Numéro de TVA intracommunautaire</td><td>S'il a été attribué</td></tr>
<tr><td>Identité du client</td><td>Nom ou dénomination, adresse de facturation</td></tr>
<tr><td>Date de la prestation</td><td>Dates de la formation (ou date d'achèvement)</td></tr>
<tr><td>Désignation précise</td><td>Intitulé de la formation, durée en heures, dates, lieu, nom du stagiaire ou nombre de stagiaires</td></tr>
<tr><td>Prix unitaire et quantité</td><td>Prix hors taxes, ou net en cas d'exonération ; réductions éventuelles</td></tr>
<tr><td>Régime de TVA</td><td>Taux et montant de TVA si la prestation est taxable ; à défaut, la mention de l'exonération et de son fondement : « Exonération de TVA, article 261-4-4° a du CGI » ; ou, pour une entreprise en franchise en base, « TVA non applicable, article 293 B du CGI »</td></tr>
<tr><td>Montant total à payer</td><td>Hors taxes, TVA, toutes taxes comprises ; ou montant net</td></tr>
<tr><td>Date d'échéance</td><td>Date à laquelle le paiement doit intervenir</td></tr>
<tr><td>Conditions d'escompte</td><td>En cas de paiement anticipé, ou mention de l'absence d'escompte</td></tr>
<tr><td>Pénalités de retard et indemnité forfaitaire</td><td>Entre professionnels : taux des pénalités de retard et mention de l'indemnité forfaitaire pour frais de recouvrement de 40 euros (art. D. 441-5 du Code de commerce)</td></tr>
</table>
<p>La réforme de la facturation électronique ajoute progressivement de nouvelles mentions (notamment le numéro SIREN du client, la catégorie de l'opération – ici une prestation de services – et, le cas échéant, l'option pour le paiement de la TVA d'après les débits). Vérifiez avec votre expert-comptable ou votre logiciel la date à laquelle elles s'appliquent à votre organisme.</p>

<h3>3. Exemple de facture fil rouge</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th colspan="2">Facture n° F-2026-087 du 21/12/2026</th></tr>
<tr><td>Prestataire</td><td>Inès MARCHAND EI – Atelier Sésame Formation, adresse à Massy, SIRET (fictif), déclaration d'activité enregistrée sous le numéro (fictif)</td></tr>
<tr><td>Client</td><td>Société Vergers de l'Yvette, adresse de facturation, SIREN (fictif)</td></tr>
<tr><td>Prestation</td><td>Formation « Accueil physique et téléphonique » – 21 heures – du 16/12 au 18/12/2026 – Massy – 2 stagiaires (noms indiqués en annexe)</td></tr>
<tr><td>Prix</td><td>2 × 900 € = 1 800 € net</td></tr>
<tr><td>TVA</td><td>Exonération de TVA, article 261-4-4° a du CGI</td></tr>
<tr><td>Total à payer</td><td>1 800 €</td></tr>
<tr><td>Échéance</td><td>30 jours à compter de la date d'exécution de la prestation, soit le 17/01/2027 ; pas d'escompte pour paiement anticipé</td></tr>
<tr><td>Retard</td><td>Pénalités au taux prévu par les conditions générales ; indemnité forfaitaire pour frais de recouvrement : 40 €</td></tr>
</table>
<p>Remarque : la facture est datée après la fin de la prestation. Si l'organisme souhaite encaisser une partie du prix avant la formation, il émet une facture d'acompte ; la facture définitive, établie à l'issue de la prestation, rappelle l'acompte reçu et indique le solde restant dû.</p>

<h3>4. Acomptes, avoirs et annulations</h3>
<ul>
<li><strong>Acompte :</strong> il donne lieu à une facture d'acompte ; la facture finale rappelle l'acompte versé et indique le solde. Pour un particulier, l'acompte respecte l'article L. 6353-6 (rien avant la fin du délai de rétractation, 30 % au plus).</li>
<li><strong>Erreur sur une facture :</strong> on ne modifie ni ne supprime une facture émise ; on émet un <strong>avoir</strong> qui l'annule totalement ou partiellement, puis une nouvelle facture si nécessaire.</li>
<li><strong>Annulation tardive par une entreprise :</strong> le dédit prévu par la convention est facturé comme une indemnité, distincte du prix de la formation. Il ne doit pas être présenté comme une formation réalisée, et il ne peut pas être mis à la charge d'un OPCO.</li>
<li><strong>Abandon d'un particulier :</strong> on applique les clauses du contrat, dans le respect de l'article L. 6353-7 en cas de force majeure.</li>
</ul>

<h3>5. Délais de paiement entre professionnels</h3>
<p>L'article <strong>L. 441-10 du Code de commerce</strong> fixe les règles suivantes :</p>
<ul>
<li>à défaut de stipulation contraire, le délai de paiement est de <strong>trente jours</strong> après la date d'exécution de la prestation ;</li>
<li>le délai convenu entre les parties ne peut dépasser <strong>soixante jours</strong> à compter de la date d'émission de la facture (ou, si cela est expressément stipulé et ne constitue pas un abus manifeste, quarante-cinq jours fin de mois) ;</li>
<li>les pénalités de retard sont exigibles sans qu'un rappel soit nécessaire ; à défaut de taux prévu, il s'agit du taux de la Banque centrale européenne majoré de dix points ; le taux contractuel ne peut être inférieur à trois fois le taux d'intérêt légal ;</li>
<li>tout professionnel en retard de paiement est de plein droit débiteur d'une indemnité forfaitaire pour frais de recouvrement de quarante euros.</li>
</ul>
<p>Ces règles ne s'appliquent pas aux particuliers, pour lesquels l'échéancier est fixé par le contrat de formation, dans le respect du Code du travail. Les délais de paiement des OPCO et des autres financeurs dépendent de leurs procédures ; ils peuvent être plus longs que ceux d'une entreprise et doivent être anticipés dans le plan de trésorerie.</p>

<h3>6. La facturation électronique</h3>
<p>La réforme de la facturation électronique entre les entreprises assujetties à la TVA établies en France se déploie selon le calendrier suivant :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Date</th><th>Obligation</th></tr>
<tr><td>1er septembre 2026</td><td>Toutes les entreprises doivent être en mesure de <strong>recevoir</strong> des factures électroniques ; les grandes entreprises et les entreprises de taille intermédiaire doivent les <strong>émettre</strong> et transmettre les données de transaction (e-reporting)</td></tr>
<tr><td>1er septembre 2027</td><td>Les PME et les microentreprises doivent à leur tour <strong>émettre</strong> des factures électroniques et transmettre leurs données</td></tr>
</table>
<p>La réception, l'émission et la transmission passent par une plateforme agréée, choisie par l'entreprise. Pour un organisme de formation dont les prestations sont exonérées de TVA au titre de l'article 261-4-4° a du CGI, la question de l'émission de factures électroniques pour ces prestations fait l'objet de précisions de l'administration fiscale, selon lesquelles ces opérations exonérées seraient en dehors du champ de l'obligation d'émission. En revanche, l'organisme reste concerné par l'obligation de <strong>réception</strong> pour les factures de ses fournisseurs, et ses éventuelles opérations taxables (conseil, vente d'ouvrages) suivent le droit commun. Faites valider votre situation par votre expert-comptable, et choisissez dès maintenant une plateforme de réception.</p>
<blockquote><strong>Bonne pratique :</strong> utilisez un logiciel de facturation qui numérote automatiquement les factures, empêche leur modification après émission, génère les avoirs et conserve un historique. Un tableur modifiable à volonté n'offre pas ces garanties.</blockquote>
<blockquote><strong>À retenir :</strong> la facture comporte les mentions du Code de commerce et du CGI, dont le fondement de l'exonération de TVA, et, pour un entrepreneur individuel, la mention « EI ». Une facture émise ne se corrige que par un avoir. Entre professionnels, le délai de paiement est de trente jours par défaut et de soixante jours au plus ; les pénalités de retard et l'indemnité de 40 euros sont dues de plein droit. Toutes les entreprises doivent pouvoir recevoir des factures électroniques depuis le 1er septembre 2026.</blockquote>
`,
      },
      {
        title: "6.3 – L'exonération de TVA de la formation professionnelle continue",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Connaître le fondement et le champ de l'exonération de TVA de la formation professionnelle continue.</li>
<li>Savoir comment obtenir l'attestation qui conditionne l'exonération.</li>
<li>Distinguer les prestations exonérées et les prestations taxables d'un même organisme.</li>
<li>Mesurer les conséquences de l'exonération (pas de récupération de TVA, taxe sur les salaires) et la comparer à la franchise en base.</li>
</ul>

<h3>1. Le texte</h3>
<p>L'article <strong>261, 4, 4°, a du Code général des impôts</strong> exonère de TVA les prestations de services et les livraisons de biens qui leur sont étroitement liées, effectuées dans le cadre de la formation professionnelle continue, telle qu'elle est définie par les dispositions législatives et réglementaires qui la régissent, lorsqu'elles sont assurées soit par des personnes morales de droit public, soit par des personnes de droit privé <strong>titulaires d'une attestation</strong> délivrée par l'autorité administrative compétente reconnaissant qu'elles remplissent les conditions fixées pour exercer leur activité dans le cadre de la formation professionnelle continue.</p>
<p>Les conditions de délivrance et de validité de cette attestation sont précisées aux articles 202 A à 202 D de l'annexe II au CGI.</p>

<h3>2. Obtenir l'attestation</h3>
<ul>
<li>L'attestation est délivrée par le service régional de contrôle de la formation professionnelle de la <strong>DREETS</strong> dont relève l'organisme (en Île-de-France, la DRIEETS).</li>
<li>La demande se fait au moyen du formulaire n° 3511-SD, selon les modalités indiquées par les services de la DREETS ; elle suppose que l'organisme dispose d'une déclaration d'activité.</li>
<li>L'exonération s'applique aux opérations réalisées à compter de la date fixée par l'attestation ; sans attestation, les prestations de formation d'un organisme de droit privé sont soumises à la TVA dans les conditions de droit commun (sauf franchise en base).</li>
<li>L'exonération n'est pas automatique avec le numéro de déclaration d'activité : ce sont deux démarches distinctes, même si elles sont souvent faites au même moment.</li>
</ul>

<h3>3. Le champ de l'exonération</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Prestation</th><th>Traitement</th><th>Commentaire</th></tr>
<tr><td>Formation « Gérer son centre de formation – 35 h » vendue à un particulier ou à une entreprise</td><td>Exonérée (si attestation)</td><td>Action de formation professionnelle continue</td></tr>
<tr><td>Supports de cours remis aux stagiaires pendant la formation</td><td>Exonérés</td><td>Livraisons de biens étroitement liées à la formation</td></tr>
<tr><td>Formation réalisée en sous-traitance pour un autre organisme</td><td>Exonérée (si attestation)</td><td>Toujours une prestation de formation continue</td></tr>
<tr><td>Mission de conseil pour aider une entreprise à organiser son service formation</td><td>Taxable</td><td>Prestation de conseil, pas de formation</td></tr>
<tr><td>Vente d'un guide pratique à des personnes qui ne suivent pas la formation</td><td>Taxable</td><td>Vente de biens non liée à une action de formation</td></tr>
<tr><td>Location de la salle à une association</td><td>Selon le régime de la location</td><td>Activité distincte</td></tr>
</table>
<p>Un organisme qui réalise à la fois des prestations exonérées et des prestations taxables doit les distinguer en comptabilité et sur ses factures.</p>

<h3>4. Le cas des formateurs indépendants</h3>
<p>Le CGI prévoit également, à l'article 261, 4, 4°, b, une exonération pour les cours ou leçons dispensés par des personnes physiques <strong>rémunérées directement par leurs élèves</strong>. Cette exonération ne couvre pas le formateur indépendant qui facture un organisme de formation donneur d'ordre : pour bénéficier de l'exonération de TVA sur ses prestations de formation en sous-traitance, il doit lui-même disposer d'une déclaration d'activité et de l'attestation prévue au 4°, a, ou relever de la franchise en base. Lorsqu'un organisme recrute un formateur indépendant comme Paul RENAUD, il vérifie donc le régime de TVA indiqué sur ses factures.</p>

<h3>5. Les conséquences de l'exonération</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Conséquence</th><th>Explication</th></tr>
<tr><td>Prix affiché net</td><td>Le client ne paie pas de TVA : c'est un avantage commercial auprès des particuliers et des structures qui ne récupèrent pas la TVA.</td></tr>
<tr><td>Pas de récupération de la TVA sur les achats</td><td>La TVA payée sur les dépenses liées aux prestations exonérées (matériel, logiciels, loyer soumis à TVA) n'est pas déductible ; elle constitue une charge. Elle doit être intégrée au coût de revient.</td></tr>
<tr><td>Taxe sur les salaires</td><td>Les employeurs qui ne sont pas soumis à la TVA sur au moins 90 % de leur chiffre d'affaires sont en principe redevables de la taxe sur les salaires (art. 231 du CGI). Un organisme sans salarié n'est pas concerné ; dès la première embauche, il faut l'anticiper avec l'expert-comptable.</td></tr>
<tr><td>Mention obligatoire</td><td>Chaque facture de formation porte la mention « Exonération de TVA, article 261-4-4° a du CGI ».</td></tr>
</table>

<h3>6. Exonération ou franchise en base ?</h3>
<p>Une entreprise dont le chiffre d'affaires reste inférieur aux seuils fixés par l'article 293 B du CGI peut bénéficier de la <strong>franchise en base de TVA</strong> : elle ne facture pas de TVA et porte la mention « TVA non applicable, article 293 B du CGI ». Les seuils ont fait l'objet de débats et de projets de réforme répétés ces dernières années : consultez leur montant en vigueur sur impots.gouv.fr avant de vous y référer.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Exonération (261-4-4° a)</th><th>Franchise en base (293 B)</th></tr>
<tr><td>Condition</td><td>Attestation de la DREETS ; activité de formation professionnelle continue</td><td>Chiffre d'affaires sous les seuils</td></tr>
<tr><td>Prestations couvertes</td><td>Uniquement les formations et les biens étroitement liés</td><td>Toutes les opérations de l'entreprise, tant que les seuils sont respectés</td></tr>
<tr><td>Durée</td><td>Indépendante du chiffre d'affaires</td><td>Perdue en cas de dépassement des seuils</td></tr>
<tr><td>Intérêt</td><td>Stable pour un organisme en croissance</td><td>Simple pour une activité mixte et modeste</td></tr>
</table>
<p>Pour Atelier Sésame Formation, dont l'activité est quasi exclusivement de la formation et qui envisage de se développer, l'exonération de l'article 261-4-4° a est la solution la plus stable. Si Inès développe un jour une activité de conseil, celle-ci relèvera de la franchise en base tant que les seuils sont respectés, puis de la TVA de droit commun.</p>
<blockquote><strong>Point de vigilance :</strong> la fiscalité est un domaine où l'erreur coûte cher (rappels de TVA, pénalités). Faites valider votre régime par un expert-comptable lors de la création et à chaque changement d'activité.</blockquote>
<blockquote><strong>À retenir :</strong> les actions de formation professionnelle continue d'un organisme de droit privé sont exonérées de TVA si celui-ci est titulaire de l'attestation délivrée par la DREETS (art. 261-4-4° a du CGI ; art. 202 A à 202 D de l'annexe II ; formulaire 3511-SD). L'exonération ne couvre que la formation et les biens étroitement liés ; elle interdit la récupération de la TVA sur les achats correspondants et peut rendre l'employeur redevable de la taxe sur les salaires.</blockquote>
`,
      },
      {
        title: "6.4 – Trésorerie, tableau de bord, assurance et outils de gestion",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Construire un plan de trésorerie mensuel adapté aux rythmes d'encaissement de la formation.</li>
<li>Choisir les indicateurs d'un tableau de bord de gestion.</li>
<li>Évaluer ses besoins d'assurance.</li>
<li>Choisir des outils de gestion proportionnés à la taille de l'organisme.</li>
</ul>

<h3>1. Pourquoi la trésorerie est le point faible des petits organismes</h3>
<p>Un organisme de formation peut être rentable et manquer d'argent. Les charges tombent avant les encaissements : la préparation, les supports, la location d'une salle, l'audit de certification se paient avant la session, alors que les particuliers paient par échéances (rien avant la fin du délai de rétractation, 30 % au plus ensuite) et que les entreprises et surtout les financeurs paient après la formation, sur justificatifs. Le décalage peut atteindre plusieurs mois lorsqu'une pièce manque.</p>

<h3>2. Le plan de trésorerie</h3>
<p>Le plan de trésorerie prévoit, mois par mois, les encaissements et les décaissements, et le solde de trésorerie qui en résulte. Il se construit à partir du planning des sessions et des conditions de paiement de chaque client. Exemple simplifié pour Atelier Sésame Formation (chiffres fictifs) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th></th><th>Octobre</th><th>Novembre</th><th>Décembre</th><th>Janvier</th></tr>
<tr><td>Trésorerie de début de mois</td><td>3 200 €</td><td>2 150 €</td><td>4 330 €</td><td>3 060 €</td></tr>
<tr><td>Encaissements particuliers (acomptes et soldes)</td><td>1 260 €</td><td>3 780 €</td><td>900 €</td><td>2 520 €</td></tr>
<tr><td>Encaissements entreprises</td><td>1 400 €</td><td>2 100 €</td><td>0 €</td><td>1 800 €</td></tr>
<tr><td>Sous-traitance reçue</td><td>0 €</td><td>0 €</td><td>1 260 €</td><td>0 €</td></tr>
<tr><td><strong>Total encaissements</strong></td><td>2 660 €</td><td>5 880 €</td><td>2 160 €</td><td>4 320 €</td></tr>
<tr><td>Charges de structure (loyer, assurance, logiciels, comptabilité)</td><td>1 160 €</td><td>1 160 €</td><td>1 160 €</td><td>1 160 €</td></tr>
<tr><td>Rémunération de la dirigeante (prélèvements)</td><td>1 800 €</td><td>1 800 €</td><td>1 800 €</td><td>1 800 €</td></tr>
<tr><td>Formateurs indépendants</td><td>0 €</td><td>420 €</td><td>0 €</td><td>840 €</td></tr>
<tr><td>Cotisations sociales et impôts</td><td>750 €</td><td>320 €</td><td>470 €</td><td>750 €</td></tr>
<tr><td><strong>Total décaissements</strong></td><td>3 710 €</td><td>3 700 €</td><td>3 430 €</td><td>4 550 €</td></tr>
<tr><td><strong>Trésorerie de fin de mois</strong></td><td>2 150 €</td><td>4 330 €</td><td>3 060 €</td><td>2 830 €</td></tr>
</table>
<p>Le plan révèle les mois tendus et permet d'agir à temps : avancer la signature de contrats, relancer un impayé, décaler un achat, négocier un délai, constituer une réserve de précaution correspondant à deux ou trois mois de charges fixes.</p>

<h3>3. Le tableau de bord de gestion</h3>
<p>Le tableau de bord rassemble, chaque mois, une dizaine d'indicateurs qui permettent au dirigeant de piloter. Il complète les indicateurs qualité du chapitre 7.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Domaine</th><th>Indicateur</th><th>Mode de calcul</th><th>Utilité</th></tr>
<tr><td>Activité</td><td>Nombre de sessions réalisées ; heures-stagiaires</td><td>Somme des heures suivies par chaque stagiaire</td><td>Prépare le BPF (cadre F)</td></tr>
<tr><td>Activité</td><td>Taux de remplissage</td><td>Stagiaires / capacité maximale</td><td>Décider du maintien des sessions, ajuster le calendrier</td></tr>
<tr><td>Commercial</td><td>Taux de transformation des devis</td><td>Devis signés / devis émis</td><td>Évaluer l'efficacité commerciale</td></tr>
<tr><td>Financier</td><td>Chiffre d'affaires par origine</td><td>Ventilation selon les lignes du cadre C du BPF</td><td>Mesurer la dépendance à un financeur</td></tr>
<tr><td>Financier</td><td>Marge par session</td><td>Chiffre d'affaires – coût de revient</td><td>Repérer les formations non rentables</td></tr>
<tr><td>Financier</td><td>Encours clients et retards</td><td>Factures émises non payées, dont échues</td><td>Relancer à temps</td></tr>
<tr><td>Trésorerie</td><td>Trésorerie disponible et prévisionnelle à trois mois</td><td>Plan de trésorerie</td><td>Anticiper les tensions</td></tr>
<tr><td>Qualité</td><td>Satisfaction, abandons, réclamations</td><td>Questionnaires, registre des réclamations</td><td>Amélioration continue</td></tr>
</table>

<h3>4. L'assurance</h3>
<p>Aucun texte du Code du travail n'impose de manière générale à un organisme de formation de souscrire une assurance de responsabilité civile professionnelle. Elle est pourtant indispensable dans les faits :</p>
<ul>
<li>elle couvre les dommages causés aux stagiaires ou aux tiers à l'occasion de la formation (chute dans les locaux, matériel endommagé) et, selon les contrats, les conséquences d'une faute professionnelle (conseil erroné) ;</li>
<li>de nombreux clients, donneurs d'ordre en sous-traitance et bailleurs demandent une attestation d'assurance ;</li>
<li>certaines activités réglementées imposent des assurances spécifiques ; vérifiez la réglementation de votre secteur.</li>
</ul>
<p>Complétez si nécessaire par une assurance des locaux (multirisque) et du matériel, et vérifiez que vos formateurs indépendants sont eux-mêmes assurés. Lisez les exclusions et les plafonds de garantie, et conservez les attestations annuelles.</p>

<h3>5. Les outils de gestion</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Besoin</th><th>Outil minimal</th><th>Outil plus intégré</th><th>Point de vigilance</th></tr>
<tr><td>Devis et factures</td><td>Logiciel de facturation conforme</td><td>Logiciel de gestion d'organisme de formation intégrant devis, conventions et factures</td><td>Numérotation continue, inaltérabilité, compatibilité avec la facturation électronique</td></tr>
<tr><td>Suivi des stagiaires et des documents</td><td>Arborescence de dossiers normalisée et tableur de suivi</td><td>Logiciel de gestion avec génération des conventions, convocations, attestations et certificats</td><td>Exactitude des modèles ; données personnelles</td></tr>
<tr><td>Émargement</td><td>Feuilles papier par demi-journée</td><td>Émargement électronique horodaté</td><td>Identification du signataire, horodatage, intégrité</td></tr>
<tr><td>Signature des contrats</td><td>Signature manuscrite</td><td>Signature électronique</td><td>Une signature électronique fiable est admise comme preuve (art. 1366 et 1367 du Code civil ; règlement européen eIDAS n° 910/2014)</td></tr>
<tr><td>Évaluations et satisfaction</td><td>Questionnaires papier saisis dans un tableur</td><td>Formulaires en ligne</td><td>Hébergement et paramétrage conformes au RGPD</td></tr>
<tr><td>Comptabilité</td><td>Expert-comptable et logiciel de tenue</td><td>Synchronisation bancaire</td><td>Ventilation des produits selon le cadre C du BPF</td></tr>
</table>
<blockquote><strong>Bonne pratique :</strong> avant d'acheter un logiciel, listez vos documents réels (devis, contrat, convention, convocation, émargement, attestation, certificat, facture, questionnaire) et vérifiez que l'outil les produit conformément aux textes, sans vous obliger à corriger chaque document à la main.</blockquote>
<blockquote><strong>À retenir :</strong> un plan de trésorerie mensuel, construit à partir du planning et des conditions de paiement, protège l'organisme des décalages d'encaissement. Un tableau de bord d'une dizaine d'indicateurs (activité, commercial, financier, trésorerie, qualité) suffit pour piloter. L'assurance de responsabilité civile professionnelle n'est pas imposée de manière générale mais elle est indispensable dans les faits, et les outils de gestion se choisissent à partir des documents à produire.</blockquote>
`,
      },
      {
        title: "6.5 – Le bilan pédagogique et financier : lecture détaillée, cadre par cadre",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Connaître le fondement juridique du bilan pédagogique et financier (BPF) et la période qu'il couvre.</li>
<li>Comprendre le contenu de chaque cadre du formulaire, de A à H.</li>
<li>Savoir où déclarer chaque type de produit, de stagiaire et d'intervenant.</li>
<li>Repérer les contrôles de cohérence entre les cadres.</li>
</ul>

<h3>1. Le fondement et la période couverte</h3>
<p>Tout prestataire qui réalise des actions de formation, des bilans de compétences, des actions de VAE ou des actions de formation par apprentissage adresse chaque année à l'autorité administrative un <strong>bilan pédagogique et financier</strong> retraçant son activité (art. <strong>L. 6352-11</strong> du Code du travail). Le contenu et les modalités sont précisés aux articles <strong>R. 6352-22 à R. 6352-24</strong>. Le bilan porte sur l'activité réalisée au cours du <strong>dernier exercice comptable clos</strong>.</p>
<p>Le formulaire officiel est le Cerfa n° 10443, accompagné d'une notice (Cerfa n° 50199) qu'il faut lire attentivement avant de remplir le bilan. En pratique, la saisie se fait directement en ligne sur <strong>Mon Activité Formation</strong>, qui reprend les mêmes cadres. Tous les montants sont déclarés <strong>hors taxes</strong>, arrondis à l'euro.</p>

<h3>2. Vue d'ensemble des cadres</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Cadre</th><th>Intitulé</th><th>Nature</th></tr>
<tr><td>A</td><td>Identification de l'organisme de formation</td><td>Identification</td></tr>
<tr><td>B</td><td>Caractéristiques de l'organisme (exercice comptable)</td><td>Identification</td></tr>
<tr><td>C</td><td>Bilan financier hors taxes : origine des produits de l'organisme</td><td>Bilan financier</td></tr>
<tr><td>D</td><td>Bilan financier hors taxes : charges de l'organisme</td><td>Bilan financier</td></tr>
<tr><td>E</td><td>Personnes dispensant des heures de formation</td><td>Bilan pédagogique</td></tr>
<tr><td>F</td><td>Bilan pédagogique : stagiaires bénéficiant d'une formation dispensée par l'organisme et apprentis (F-1 à F-4)</td><td>Bilan pédagogique</td></tr>
<tr><td>G</td><td>Bilan pédagogique : stagiaires dont la formation a été confiée à votre organisme par un autre organisme de formation</td><td>Bilan pédagogique</td></tr>
<tr><td>H</td><td>Personne ayant la qualité de dirigeant</td><td>Signature</td></tr>
</table>

<h3>3. Cadres A et B : l'identification</h3>
<p>Le <strong>cadre A</strong> reprend le numéro de déclaration d'activité, la forme juridique, le numéro SIRET, le code NAF, le nom ou la dénomination, l'adresse, le téléphone et l'adresse électronique de contact. L'organisme indique s'il accepte que son adresse soit rendue publique : les informations du BPF alimentent en effet la liste publique des organismes de formation.</p>
<p>Le <strong>cadre B</strong> indique les dates de début et de fin de l'exercice comptable sur lequel porte le bilan. Pour une entreprise individuelle dont l'exercice correspond à l'année civile, il s'agit du 1er janvier au 31 décembre de l'année précédente. Pour un premier exercice, les dates sont celles du premier exercice comptable clos, qui peut être plus court ou plus long que douze mois.</p>

<h3>4. Cadre C : l'origine des produits</h3>
<p>Le cadre C ventile tous les produits réalisés au titre de la formation professionnelle selon <strong>leur origine</strong>, c'est-à-dire selon celui qui a payé. Ses lignes sont les suivantes :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Ligne</th><th>Produits provenant…</th><th>Exemples</th></tr>
<tr><td>1</td><td>des entreprises pour la formation de leurs salariés</td><td>Convention payée par une entreprise sur ses fonds propres</td></tr>
<tr><td>2 (a à h)</td><td>des organismes gestionnaires des fonds de la formation professionnelle, pour des actions dispensées dans le cadre : a) des contrats d'apprentissage ; b) des contrats de professionnalisation ; c) de la promotion ou de la reconversion par alternance ; d) des congés individuels de formation et des projets de transition professionnelle ; e) du compte personnel de formation ; f) des dispositifs spécifiques pour les personnes en recherche d'emploi ; g) des dispositifs spécifiques pour les travailleurs non-salariés ; h) du plan de développement des compétences ou d'autres dispositifs</td><td>Paiements des OPCO, de la Caisse des Dépôts au titre du CPF, des fonds d'assurance formation des non-salariés. La ligne 2 est le total des lignes a à h.</td></tr>
<tr><td>3</td><td>des pouvoirs publics pour la formation de leurs agents (État, collectivités territoriales, établissements publics à caractère administratif)</td><td>Formation d'agents d'une mairie</td></tr>
<tr><td>4 à 8</td><td>des pouvoirs publics pour la formation de publics spécifiques : instances européennes (4), État (5), conseils régionaux (6), Pôle emploi, devenu France Travail (7), autres ressources publiques (8)</td><td>Marché régional de formation de demandeurs d'emploi ; aide individuelle de France Travail</td></tr>
<tr><td>9</td><td>de contrats conclus avec des personnes à titre individuel et à leurs frais</td><td>Contrats de formation professionnelle avec des particuliers</td></tr>
<tr><td>10</td><td>de contrats conclus avec d'autres organismes de formation (y compris CFA)</td><td>Prestations réalisées en sous-traitance pour un autre organisme</td></tr>
<tr><td>11</td><td>Autres produits au titre de la formation professionnelle</td><td>Produits de formation qui n'entrent dans aucune autre ligne</td></tr>
<tr><td>Total</td><td>Total des produits réalisés au titre de la formation professionnelle (lignes 1 à 11)</td><td></td></tr>
<tr><td>%</td><td>Part du chiffre d'affaires global réalisée dans le domaine de la formation professionnelle</td><td>100 % pour un organisme qui ne fait que de la formation</td></tr>
</table>
<p>Pour la formation « Gérer son centre de formation », achetée par des particuliers à leurs propres frais, les produits se déclarent à la <strong>ligne 9</strong>. Une entreprise qui paie la formation d'un salarié sur ses fonds propres relève de la ligne 1 ; si son OPCO paie l'organisme en subrogation, la part de l'OPCO relève de la ligne 2 (h, pour le plan de développement des compétences) et le reste à charge de l'entreprise de la ligne 1.</p>

<h3>5. Cadre D : les charges</h3>
<p>Le cadre D indique le <strong>total des charges de l'organisme liées à l'activité de formation</strong>, dont deux sous-totaux : les <strong>salaires des formateurs</strong> et les <strong>achats de prestations de formation et honoraires de formation</strong> (formateurs indépendants, sous-traitance). Les montants proviennent de la comptabilité ; pour un organisme qui exerce d'autres activités, il faut isoler la part des charges qui se rapporte à la formation selon une clé de répartition cohérente et documentée.</p>
<p>Dans une entreprise individuelle, la rémunération de l'entrepreneur n'est pas un salaire : elle n'apparaît pas dans la ligne « salaires des formateurs ».</p>

<h3>6. Cadre E : les personnes qui dispensent les heures</h3>
<p>Le cadre E distingue deux lignes, avec pour chacune le <strong>nombre de personnes</strong> et le <strong>nombre d'heures de formation dispensées</strong> (heures d'animation, et non heures suivies par les stagiaires) :</p>
<ul>
<li>les <strong>personnes de votre organisme</strong> dispensant des heures de formation (dirigeant formateur, salariés formateurs) ;</li>
<li>les <strong>personnes extérieures à votre organisme</strong> dispensant des heures de formation dans le cadre de contrats de sous-traitance (formateurs indépendants, autres organismes).</li>
</ul>

<h3>7. Cadre F : le bilan pédagogique</h3>
<p>Les cadres F-1, F-3 et F-4 décrivent les stagiaires et apprentis correspondant aux produits des lignes 1 à 9 et 11 du cadre C, que les actions aient été réalisées directement ou confiées à un autre organisme. Chaque cadre indique le <strong>nombre de stagiaires</strong> et le <strong>nombre total d'heures de formation suivies</strong> (heures-stagiaires).</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Cadre</th><th>Contenu</th><th>Lignes</th></tr>
<tr><td>F-1 Type de stagiaires</td><td>Qui sont les stagiaires ?</td><td>a) salariés d'employeurs privés hors apprentis ; b) apprentis ; c) personnes en recherche d'emploi ; d) particuliers à leurs propres frais ; e) autres stagiaires ; total ; dont stagiaires et apprentis ayant suivi une action en tout ou partie à distance</td></tr>
<tr><td>F-2 Dont activité sous-traitée</td><td>Parmi eux, ceux dont l'action a été confiée par votre organisme à un autre organisme</td><td>Une ligne : nombre et heures</td></tr>
<tr><td>F-3 Objectif général des prestations</td><td>Que visent les prestations ?</td><td>a) formations visant une certification enregistrée au RNCP, avec la ventilation par niveau (6 à 8, 5, 4, 3, 2, CQP sans niveau) ; b) formations visant une certification ou une habilitation enregistrée au répertoire spécifique ; c) formations visant un CQP non enregistré ; d) autres formations professionnelles ; e) bilans de compétences ; f) actions d'accompagnement à la VAE ; total</td></tr>
<tr><td>F-4 Spécialités de formation</td><td>Dans quels domaines ?</td><td>Les cinq principales spécialités de formation, indiquées en clair avec leur code de la nomenclature des spécialités de formation (NSF), puis les autres spécialités ; total</td></tr>
</table>
<p>La formation « Gérer son centre de formation » se déclare en F-1 ligne d (particuliers à leurs propres frais), en F-3 ligne d (<strong>autres formations professionnelles</strong>, puisqu'elle ne vise aucune certification) et en F-4 sous la spécialité <strong>100 – Formations générales</strong>.</p>
<blockquote><strong>Contrôle de cohérence essentiel :</strong> les totaux de F-1, F-3 et F-4 portent sur la même population. Ils doivent être <strong>identiques</strong>, en nombre de stagiaires comme en heures. Un écart entre ces trois totaux est l'anomalie la plus fréquente des BPF.</blockquote>

<h3>8. Cadre G : la sous-traitance reçue</h3>
<p>Les stagiaires dont la formation a été confiée à votre organisme par un autre organisme de formation <strong>ne figurent pas dans le cadre F</strong>. Ils sont déclarés dans le cadre G (nombre de stagiaires et heures suivies), et les produits correspondants à la ligne 10 du cadre C. C'est le donneur d'ordre, qui a contracté avec le client, qui déclare ces stagiaires dans son propre cadre F (et dans son cadre F-2). Cette règle évite que les mêmes stagiaires soient comptés deux fois dans les statistiques nationales.</p>

<h3>9. Cadre H : le dirigeant</h3>
<p>Le cadre H identifie la personne ayant la qualité de dirigeant (nom, prénom, qualité), ainsi que le signataire, le lieu, la date et ses coordonnées. La transmission en ligne vaut engagement de l'exactitude des informations déclarées.</p>

<h3>10. Les correspondances entre cadres</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Si vous déclarez…</th><th>… vous devez retrouver</th></tr>
<tr><td>Un produit en ligne 9 du cadre C (particuliers)</td><td>Des stagiaires en F-1 ligne d</td></tr>
<tr><td>Un produit en ligne 1 du cadre C (entreprises)</td><td>Des stagiaires en F-1 ligne a, en principe</td></tr>
<tr><td>Un produit en ligne 10 du cadre C (sous-traitance reçue)</td><td>Des stagiaires en cadre G, et aucun en cadre F au titre de ces actions</td></tr>
<tr><td>Des stagiaires en F-2 (sous-traitance donnée)</td><td>Des personnes extérieures en cadre E et, en principe, des achats de prestations ou honoraires en cadre D</td></tr>
<tr><td>Des formateurs salariés en cadre E</td><td>Des salaires de formateurs en cadre D</td></tr>
<tr><td>Un total de stagiaires en F-1</td><td>Le même total en F-3 et en F-4</td></tr>
</table>
<blockquote><strong>À retenir :</strong> le BPF (art. L. 6352-11 ; R. 6352-22 à R. 6352-24) retrace l'activité du dernier exercice comptable clos. Le cadre C ventile les produits hors taxes selon leur origine (ligne 9 pour les particuliers à leurs frais, ligne 10 pour la sous-traitance reçue) ; le cadre D présente les charges ; le cadre E les intervenants et leurs heures d'animation ; le cadre F les stagiaires et leurs heures suivies, avec des totaux F-1, F-3 et F-4 identiques ; le cadre G la sous-traitance reçue ; le cadre H le dirigeant. Une formation non certifiante se déclare en F-3 ligne d, « autres formations professionnelles ».</blockquote>
`,
      },
      {
        title: "6.6 – Transmettre le BPF dans les délais : calendrier, caducité et exemple complet",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Connaître la date limite de transmission du BPF et la pratique du report annuel.</li>
<li>Mesurer les conséquences d'une absence de transmission ou d'un bilan sans activité.</li>
<li>Préparer le BPF tout au long de l'année.</li>
<li>Remplir un BPF complet à partir des données d'un exercice.</li>
</ul>

<h3>1. La date limite</h3>
<p>Le Code du travail fixe la date de transmission du BPF <strong>au 30 avril</strong> de chaque année (art. R. 6352-23). Chaque année, le ministère chargé de la formation professionnelle a toutefois accordé un report : pour la campagne 2026, portant sur l'exercice 2025, la transmission était ouverte sur Mon Activité Formation du 1er avril au <strong>31 mai 2026</strong>. Le report n'est pas acquis d'avance : la date applicable doit être vérifiée chaque année sur le site du ministère du Travail ou de la DREETS.</p>
<p>La transmission se fait exclusivement en ligne, sur <strong>Mon Activité Formation</strong> (monactiviteformation.emploi.gouv.fr), avec le compte de l'organisme. L'accusé de transmission délivré par l'application constitue la preuve du dépôt : il faut le télécharger et le conserver.</p>

<h3>2. La caducité de la déclaration d'activité</h3>
<p>L'article <strong>L. 6351-6 du Code du travail</strong> prévoit que la déclaration d'activité devient <strong>caduque</strong> :</p>
<ul>
<li>lorsque le bilan pédagogique et financier ne fait apparaître <strong>aucune activité de formation</strong> ;</li>
<li>lorsque ce bilan <strong>n'a pas été adressé</strong> à l'autorité administrative.</li>
</ul>
<p>La caducité fait perdre le numéro de déclaration d'activité : l'organisme ne figure plus sur la liste publique, ne peut plus se prévaloir de sa déclaration et doit, pour reprendre son activité, déposer une nouvelle déclaration. Les conséquences en chaîne sont lourdes : impossibilité d'être payé par les financeurs publics et mutualisés, perte de la base de l'attestation d'exonération de TVA, difficultés avec les clients et les donneurs d'ordre, et remise en cause de la certification Qualiopi, qui suppose un numéro de déclaration d'activité valide.</p>
<blockquote><strong>Point de vigilance :</strong> un organisme qui a obtenu sa déclaration d'activité mais n'a réalisé aucune action au cours de son premier exercice doit être conscient qu'un BPF sans activité entraîne la caducité. Il doit anticiper cette situation, notamment en vérifiant les dates de son premier exercice comptable.</blockquote>

<h3>3. Préparer le BPF toute l'année</h3>
<p>Un BPF se remplit en une heure lorsqu'il est préparé ; il peut prendre plusieurs jours lorsqu'il faut reconstituer l'année à partir des factures et des feuilles d'émargement. La préparation tient en trois habitudes :</p>
<ol>
<li><strong>Coder chaque facture</strong> selon la ligne du cadre C correspondante (1, 2h, 9, 10…).</li>
<li><strong>Tenir un registre des sessions</strong> : formation, dates, heures, formateur (interne ou externe), pour chaque stagiaire son type (F-1), l'objectif (F-3) et la spécialité NSF (F-4), et les heures réellement suivies (déduction faite des absences).</li>
<li><strong>Rapprocher chaque trimestre</strong> le registre et la comptabilité, pour corriger les écarts au fil de l'eau.</li>
</ol>

<h3>4. Exemple complet : le BPF d'Atelier Sésame Formation pour l'exercice 2025</h3>
<p>Les données suivantes sont fictives. Exercice comptable : du 1er janvier au 31 décembre 2025.</p>
<p><strong>Activité de l'exercice :</strong></p>
<ul>
<li>3 sessions inter « Tableur – initiation » de 21 heures, animées par Inès, suivies par 11 particuliers à leurs frais (4 + 4 + 3), à 900 euros : 9 900 euros.</li>
<li>4 sessions intra de 14 heures pour des entreprises, à 2 800 euros chacune, sur leurs fonds propres : 11 200 euros. Deux sessions « Accueil téléphonique » (3 salariés chacune) et une session « Tableur » (2 salariés) ont été animées par Inès ; une session « Tableur » (2 salariés) a été confiée à Paul RENAUD, formateur indépendant déclaré, dans le cadre d'un contrat de sous-traitance (700 euros d'honoraires).</li>
<li>1 session de 21 heures animée par Inès pour le compte d'un autre organisme de formation, pour 6 stagiaires : 3 150 euros.</li>
<li>Toutes les heures prévues ont été suivies (aucune absence, pour simplifier).</li>
<li>Total des charges liées à la formation : 16 400 euros, dont 700 euros d'honoraires de formation.</li>
</ul>

<h4>Cadre C – Origine des produits</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Ligne</th><th>Libellé</th><th>Montant HT</th></tr>
<tr><td>1</td><td>Entreprises pour la formation de leurs salariés</td><td>11 200 €</td></tr>
<tr><td>2</td><td>Organismes gestionnaires des fonds de la formation (a à h)</td><td>0 €</td></tr>
<tr><td>3 à 8</td><td>Pouvoirs publics</td><td>0 €</td></tr>
<tr><td>9</td><td>Contrats conclus avec des personnes à titre individuel et à leurs frais</td><td>9 900 €</td></tr>
<tr><td>10</td><td>Contrats conclus avec d'autres organismes de formation</td><td>3 150 €</td></tr>
<tr><td>11</td><td>Autres produits</td><td>0 €</td></tr>
<tr><td><strong>Total</strong></td><td>Lignes 1 à 11</td><td><strong>24 250 €</strong></td></tr>
<tr><td>%</td><td>Part du chiffre d'affaires global réalisée en formation</td><td>100 %</td></tr>
</table>

<h4>Cadre D – Charges</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Libellé</th><th>Montant HT</th></tr>
<tr><td>Total des charges liées à l'activité de formation</td><td>16 400 €</td></tr>
<tr><td>dont salaires des formateurs</td><td>0 € (Inès est entrepreneur individuel, sans salarié)</td></tr>
<tr><td>dont achats de prestations de formation et honoraires de formation</td><td>700 €</td></tr>
</table>

<h4>Cadre E – Personnes dispensant des heures de formation</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Ligne</th><th>Nombre</th><th>Heures dispensées</th></tr>
<tr><td>Personnes de l'organisme</td><td>1</td><td>3 × 21 h + 3 × 14 h + 21 h = 126 h</td></tr>
<tr><td>Personnes extérieures (sous-traitance)</td><td>1</td><td>14 h</td></tr>
</table>
<p>Les heures d'Inès comprennent ici la session réalisée pour un autre organisme ; reportez-vous à la notice en vigueur pour le traitement exact des heures relevant du cadre G.</p>

<h4>Cadre F-1 – Type de stagiaires</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Ligne</th><th>Stagiaires</th><th>Heures-stagiaires</th></tr>
<tr><td>a) Salariés d'employeurs privés hors apprentis</td><td>10</td><td>10 × 14 h = 140 h</td></tr>
<tr><td>b) Apprentis</td><td>0</td><td>0</td></tr>
<tr><td>c) Personnes en recherche d'emploi</td><td>0</td><td>0</td></tr>
<tr><td>d) Particuliers à leurs propres frais</td><td>11</td><td>11 × 21 h = 231 h</td></tr>
<tr><td>e) Autres stagiaires</td><td>0</td><td>0</td></tr>
<tr><td><strong>Total</strong></td><td><strong>21</strong></td><td><strong>371 h</strong></td></tr>
<tr><td>dont à distance</td><td>0</td><td>0</td></tr>
</table>

<h4>Cadre F-2 – Dont activité sous-traitée</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Ligne</th><th>Stagiaires</th><th>Heures-stagiaires</th></tr>
<tr><td>Stagiaires dont l'action a été confiée à un autre organisme</td><td>2</td><td>2 × 14 h = 28 h</td></tr>
</table>

<h4>Cadre F-3 – Objectif général des prestations</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Ligne</th><th>Stagiaires</th><th>Heures-stagiaires</th></tr>
<tr><td>a) RNCP / b) RS / c) CQP non enregistré</td><td>0</td><td>0</td></tr>
<tr><td>d) Autres formations professionnelles</td><td>21</td><td>371 h</td></tr>
<tr><td>e) Bilans de compétences / f) VAE</td><td>0</td><td>0</td></tr>
<tr><td><strong>Total</strong></td><td><strong>21</strong></td><td><strong>371 h</strong></td></tr>
</table>

<h4>Cadre F-4 – Spécialités de formation</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Spécialité (code NSF)</th><th>Stagiaires</th><th>Heures-stagiaires</th></tr>
<tr><td>324 – Secrétariat, bureautique</td><td>15 (11 particuliers + 4 salariés)</td><td>231 h + 56 h = 287 h</td></tr>
<tr><td>334 – Accueil, hôtellerie, tourisme</td><td>6</td><td>84 h</td></tr>
<tr><td><strong>Total</strong></td><td><strong>21</strong></td><td><strong>371 h</strong></td></tr>
</table>

<h4>Cadre G – Formations confiées par un autre organisme</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Ligne</th><th>Stagiaires</th><th>Heures-stagiaires</th></tr>
<tr><td>Formations confiées à votre organisme par un autre organisme de formation</td><td>6</td><td>6 × 21 h = 126 h</td></tr>
</table>

<h4>Vérifications avant transmission</h4>
<ul>
<li>Total C = 11 200 + 9 900 + 3 150 = 24 250 euros : conforme à la comptabilité.</li>
<li>Totaux F-1 = F-3 = F-4 = 21 stagiaires et 371 heures : cohérents.</li>
<li>Les 6 stagiaires de la sous-traitance reçue figurent en G et non en F ; leurs produits en ligne 10.</li>
<li>Les 2 stagiaires confiés à Paul RENAUD figurent en F (ils sont clients d'Atelier Sésame Formation) et en F-2 ; Paul figure en E (personne extérieure) ; ses honoraires en D.</li>
<li>Lorsque la formation « Gérer son centre de formation » sera proposée, ses stagiaires particuliers s'ajouteront en C-9, F-1 d, F-3 d et F-4 sous le code 100.</li>
</ul>

<h3>5. Après la transmission</h3>
<ul>
<li>Télécharger et archiver l'accusé de transmission et la version PDF du bilan.</li>
<li>Conserver les pièces qui justifient chaque chiffre (registre des sessions, factures, émargements) : elles seront demandées en cas de contrôle.</li>
<li>En cas d'erreur découverte après la transmission, se rapprocher du service régional de contrôle de la DREETS pour connaître la procédure de rectification.</li>
<li>Utiliser le BPF comme outil de pilotage : évolution du nombre de stagiaires, des heures, de la répartition des produits.</li>
</ul>
<blockquote><strong>À retenir :</strong> le BPF est dû chaque année, en principe avant le 30 avril (art. R. 6352-23), avec un report accordé chaque année jusqu'ici (31 mai en 2026), exclusivement sur Mon Activité Formation. Sans BPF, ou avec un BPF sans activité, la déclaration d'activité devient caduque (art. L. 6351-6). Un BPF se prépare toute l'année, en codant les factures et en tenant un registre des sessions.</blockquote>
`,
      },
      {
        title: "6.7 – Archiver et conserver les pièces : quoi, combien de temps, comment",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Recenser les pièces qu'un organisme de formation doit conserver.</li>
<li>Connaître les principales durées légales de conservation et leur fondement.</li>
<li>Organiser un archivage fiable, papier ou numérique.</li>
<li>Concilier les obligations de conservation et le principe de limitation des durées du RGPD.</li>
</ul>

<h3>1. Pourquoi conserver ?</h3>
<p>L'organisme conserve ses pièces pour trois raisons : <strong>répondre à ses obligations comptables et fiscales</strong>, <strong>prouver la réalité et la qualité de ses actions</strong> lors d'un contrôle de l'État, d'un contrôle d'un financeur ou d'un audit Qualiopi, et <strong>se défendre en cas de litige</strong> avec un client ou un stagiaire. Une pièce perdue est une preuve perdue : en cas de contrôle, c'est à l'organisme de justifier la réalité des actions et des dépenses.</p>

<h3>2. Les durées de référence</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Pièce</th><th>Durée</th><th>Fondement</th></tr>
<tr><td>Livres et documents comptables, pièces justificatives (factures émises et reçues, relevés bancaires)</td><td>10 ans à compter de la clôture de l'exercice</td><td>Art. L. 123-22 du Code de commerce</td></tr>
<tr><td>Documents sur lesquels l'administration fiscale peut exercer son droit de contrôle</td><td>6 ans, en règle générale, à compter de la dernière opération mentionnée</td><td>Art. L. 102 B du Livre des procédures fiscales</td></tr>
<tr><td>Contrats et conventions (particuliers et entreprises)</td><td>5 ans au moins, durée de la prescription de droit commun ; conserver plus longtemps lorsqu'ils servent de pièces justificatives comptables</td><td>Art. 2224 du Code civil ; art. L. 123-22 du Code de commerce</td></tr>
<tr><td>Contrat conclu par voie électronique avec un consommateur, d'un montant égal ou supérieur au seuil réglementaire</td><td>10 ans à compter de la conclusion ou de la livraison, avec accès garanti au client</td><td>Art. L. 213-1 et D. 213-1 et suivants du Code de la consommation</td></tr>
<tr><td>Feuilles d'émargement, évaluations, attestations, certificats de réalisation</td><td>Aucune durée unique fixée par un texte : les conserver au moins aussi longtemps que les factures qu'ils justifient (10 ans est une durée prudente) et selon les exigences propres à chaque financeur</td><td>Preuve de la réalité des actions</td></tr>
<tr><td>Preuves du référentiel national qualité (analyses de besoin, appréciations, réclamations, veille, actions d'amélioration)</td><td>Au moins sur l'ensemble du cycle de certification de trois ans, pour l'audit de surveillance et l'audit de renouvellement</td><td>Exigence d'audit</td></tr>
<tr><td>BPF transmis et accusés de transmission</td><td>Durée prudente identique à celle des pièces comptables</td><td>Preuve de la transmission (art. L. 6351-6)</td></tr>
<tr><td>Bulletins de paie (double conservé par l'employeur)</td><td>5 ans</td><td>Art. L. 3243-4 du Code du travail</td></tr>
<tr><td>Données de prospects n'ayant jamais été clients</td><td>3 ans à compter du dernier contact émanant du prospect</td><td>Recommandation de la CNIL (référentiel relatif à la gestion commerciale)</td></tr>
</table>
<blockquote><strong>Point de vigilance :</strong> les financeurs (OPCO, Caisse des Dépôts, Régions, France Travail) fixent dans leurs conditions générales ou leurs conventions des obligations de conservation et de présentation des pièces. Lisez-les : elles peuvent être plus longues que les durées ci-dessus.</blockquote>

<h3>3. Conservation et RGPD : pas de contradiction</h3>
<p>Le RGPD impose de ne pas conserver les données personnelles plus longtemps que nécessaire au regard des finalités (principe de limitation de la conservation). Il ne s'oppose pas aux durées légales : lorsqu'un texte impose de conserver une facture dix ans, cette obligation légale justifie la conservation. La CNIL distingue trois temps :</p>
<ul>
<li>la <strong>base active</strong>, pendant la relation (formation en cours, suivi après formation) : accès par les personnes qui en ont besoin ;</li>
<li>l'<strong>archivage intermédiaire</strong>, après la fin de la relation, pour répondre aux obligations légales et aux besoins de preuve : accès restreint à quelques personnes habilitées ;</li>
<li>la <strong>suppression</strong> (ou l'anonymisation) à l'issue de la durée retenue.</li>
</ul>
<p>Concrètement, le dossier d'une stagiaire de 2026 reste dans l'espace « Sessions en cours » pendant la formation et les quelques mois qui suivent, puis passe dans un espace « Archives 2026 » accessible à la seule dirigeante, puis est supprimé à l'issue de la durée prévue dans le tableau de conservation, à l'exception des pièces qui doivent rester en comptabilité.</p>

<h3>4. Organiser l'archivage</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Principe</th><th>Mise en œuvre</th></tr>
<tr><td>Une arborescence unique et stable</td><td>Année / Session / Stagiaire, plus des dossiers transversaux (Qualité, Comptabilité, BPF, Contrats formateurs)</td></tr>
<tr><td>Des noms de fichiers normalisés</td><td>« 2026-11-16_GSC35_Emargement_J1.pdf », « 2026_GSC35_BENSAID_Leila_Attestation.pdf »</td></tr>
<tr><td>Des formats durables</td><td>PDF pour les documents définitifs ; numérisation lisible des pièces papier signées</td></tr>
<tr><td>Une sauvegarde</td><td>Au moins une copie sur un support distinct ou un service de sauvegarde, testée régulièrement</td></tr>
<tr><td>Un accès maîtrisé</td><td>Droits limités, mots de passe robustes, double authentification sur les services en ligne</td></tr>
<tr><td>Un tableau de conservation</td><td>Pour chaque type de pièce : durée, point de départ, lieu, responsable, mode de destruction</td></tr>
<tr><td>Une purge annuelle</td><td>Chaque mois de janvier, suppression des pièces arrivées au terme de leur durée de conservation, tracée dans le tableau</td></tr>
</table>
<p>La numérisation des pièces papier est possible ; pour les pièces dont l'original peut avoir une valeur probante particulière (contrats signés à la main), conservez l'original tant que le litige est possible, ou recourez à un procédé de numérisation fidèle et à une signature électronique dès la conclusion.</p>
<blockquote><strong>Bonne pratique :</strong> placez à la racine de vos archives un fichier « Lisez-moi » qui décrit l'arborescence, les règles de nommage et le tableau de conservation. Un remplaçant ou un auditeur doit pouvoir retrouver une pièce en moins de deux minutes.</blockquote>
<blockquote><strong>À retenir :</strong> les pièces comptables se conservent dix ans (art. L. 123-22 du Code de commerce), les documents fiscaux six ans en règle générale (art. L. 102 B du LPF), les contrats au moins cinq ans (prescription de droit commun). Les pièces qui prouvent la réalité des actions se conservent au moins aussi longtemps que les factures qu'elles justifient. Le RGPD n'interdit pas ces durées : il impose de les définir, de restreindre l'accès aux archives et de supprimer à leur terme.</blockquote>
`,
      },
      {
        title: "6.8 – Le RGPD dans un organisme de formation : registre, information, durées, sécurité",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Recenser les traitements de données personnelles d'un organisme de formation et leurs bases légales.</li>
<li>Tenir un registre des activités de traitement.</li>
<li>Informer les stagiaires, les clients et les prospects.</li>
<li>Protéger les données, encadrer les sous-traitants et réagir à une violation.</li>
</ul>

<h3>1. Un organisme de formation traite beaucoup de données personnelles</h3>
<p>Le règlement (UE) 2016/679 du 27 avril 2016, dit <strong>RGPD</strong>, s'applique à tout traitement de données relatives à une personne physique identifiée ou identifiable. Un organisme de formation, même individuel, en traite quotidiennement : identité et coordonnées des stagiaires, situation professionnelle, résultats d'évaluation, signatures, informations sur un handicap ou une restriction médicale, données bancaires, coordonnées des contacts dans les entreprises clientes, données des formateurs, données des prospects.</p>

<h3>2. Les grands principes</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Principe (art. 5)</th><th>Application dans l'organisme</th></tr>
<tr><td>Licéité, loyauté, transparence</td><td>Chaque traitement repose sur une base légale et les personnes sont informées</td></tr>
<tr><td>Limitation des finalités</td><td>Les données d'inscription servent à gérer la formation, pas à alimenter une liste de prospection sans information</td></tr>
<tr><td>Minimisation</td><td>Ne demander que ce qui est nécessaire : pas de date de naissance ou de numéro de sécurité sociale si aucune obligation ne l'impose</td></tr>
<tr><td>Exactitude</td><td>Corriger les données erronées</td></tr>
<tr><td>Limitation de la conservation</td><td>Durées définies et appliquées (section 6.7)</td></tr>
<tr><td>Intégrité et confidentialité</td><td>Sécurité adaptée aux risques</td></tr>
<tr><td>Responsabilité</td><td>L'organisme doit pouvoir démontrer sa conformité : registre, procédures, preuves</td></tr>
</table>

<h3>3. Les traitements et leurs bases légales</h3>
<p>Tout traitement doit reposer sur l'une des bases légales de l'article 6 du RGPD. Pour un organisme de formation :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Traitement</th><th>Finalité</th><th>Base légale</th><th>Durée indicative</th></tr>
<tr><td>Gestion des inscriptions et des parcours</td><td>Exécuter le contrat ou la convention, organiser la formation, évaluer, délivrer l'attestation</td><td>Exécution du contrat (particulier) ; intérêt légitime ou exécution du contrat conclu avec l'employeur (salarié)</td><td>Durée de la relation, puis archivage (section 6.7)</td></tr>
<tr><td>Obligations administratives (BPF, contrôle, comptabilité)</td><td>Respecter le Code du travail, le Code de commerce, le CGI</td><td>Obligation légale</td><td>Durées légales</td></tr>
<tr><td>Démarche qualité (satisfaction, réclamations)</td><td>Améliorer les prestations, répondre au référentiel national qualité</td><td>Intérêt légitime</td><td>Cycle de certification</td></tr>
<tr><td>Accueil des personnes en situation de handicap</td><td>Mettre en place des adaptations</td><td>Donnée de santé : traitement soumis aux conditions de l'article 9 ; en pratique, consentement explicite de la personne, avec des informations limitées au strict nécessaire</td><td>Durée de la formation, puis suppression des éléments non nécessaires à la preuve de l'adaptation</td></tr>
<tr><td>Prospection et lettre d'information</td><td>Faire connaître l'offre</td><td>Consentement (particuliers) ; intérêt légitime (professionnels, clients pour des services analogues)</td><td>3 ans après le dernier contact du prospect</td></tr>
<tr><td>Gestion des formateurs</td><td>Contractualiser, vérifier les compétences, payer</td><td>Exécution du contrat ; obligation légale</td><td>Durée du contrat puis prescription et durées comptables</td></tr>
</table>

<h3>4. Le registre des activités de traitement</h3>
<p>L'article <strong>30 du RGPD</strong> impose au responsable de traitement de tenir un registre des activités de traitement. Les structures de moins de 250 salariés en sont dispensées, sauf notamment si le traitement n'est pas occasionnel ou porte sur des données sensibles : un organisme de formation, qui traite en permanence les données de ses stagiaires et parfois des données de santé, doit donc en pratique le tenir. La CNIL propose un modèle simplifié. Pour chaque traitement, le registre indique :</p>
<ul>
<li>le nom et les coordonnées du responsable de traitement ;</li>
<li>la finalité du traitement ;</li>
<li>les catégories de personnes concernées et de données traitées ;</li>
<li>les catégories de destinataires (formateurs, financeurs, expert-comptable, éditeurs de logiciels) ;</li>
<li>les éventuels transferts hors de l'Union européenne ;</li>
<li>les durées de conservation ;</li>
<li>une description générale des mesures de sécurité.</li>
</ul>

<h3>5. Informer les personnes</h3>
<p>L'article <strong>13 du RGPD</strong> impose d'informer les personnes au moment de la collecte : identité du responsable, finalités, bases légales, destinataires, durées de conservation, droits, droit d'introduire une réclamation auprès de la CNIL, caractère obligatoire ou facultatif des réponses. Dans un organisme de formation, cette information figure :</p>
<ul>
<li>sur le formulaire de contact ou de préinscription du site (mention courte et lien vers la politique de confidentialité) ;</li>
<li>dans le contrat de formation, la convention ou les conditions générales ;</li>
<li>dans le livret d'accueil ou le règlement intérieur remis au stagiaire ;</li>
<li>sur les questionnaires de positionnement et de satisfaction.</li>
</ul>

<h3>6. Les droits des personnes</h3>
<p>Les personnes disposent notamment d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité, dans les conditions des articles 15 à 22 du RGPD. L'organisme y répond dans un délai d'<strong>un mois</strong> à compter de la réception de la demande, délai qui peut être prolongé de deux mois compte tenu de la complexité et du nombre de demandes, en informant la personne (art. 12). Un droit d'effacement ne fait pas disparaître une facture : les données nécessaires au respect d'une obligation légale sont conservées, et la personne en est informée.</p>

<h3>7. La sécurité et les sous-traitants</h3>
<ul>
<li><strong>Sécurité (art. 32) :</strong> mots de passe robustes et distincts, double authentification, mises à jour, chiffrement des ordinateurs portables, sauvegardes, verrouillage des armoires contenant des dossiers papier, envoi des documents nominatifs par des moyens sécurisés.</li>
<li><strong>Sous-traitants (art. 28) :</strong> l'éditeur du logiciel de gestion, l'hébergeur du site, la plateforme d'émargement, l'outil de questionnaires et l'expert-comptable traitent des données pour le compte de l'organisme. Le contrat qui les lie doit comporter les clauses de l'article 28 (instructions, confidentialité, sécurité, sort des données en fin de contrat, aide au respect des droits).</li>
<li><strong>Formateurs indépendants :</strong> ils accèdent aux données des stagiaires de leurs sessions ; le contrat de sous-traitance précise leurs obligations de confidentialité et l'usage limité des données.</li>
<li><strong>Transferts hors de l'Union européenne :</strong> certains outils en ligne hébergent des données hors de l'Union ; vérifiez les garanties prévues avant de les adopter.</li>
</ul>

<h3>8. Réagir à une violation de données</h3>
<p>Une violation de données est une perte de confidentialité, d'intégrité ou de disponibilité : ordinateur volé, courriel contenant les résultats de tout le groupe envoyé au mauvais destinataire, compte piraté. L'organisme :</p>
<ol>
<li>contient l'incident (changer les mots de passe, demander la suppression du courriel, bloquer l'accès) ;</li>
<li>évalue le risque pour les personnes ;</li>
<li>notifie la violation à la <strong>CNIL dans les 72 heures</strong> après en avoir pris connaissance, sauf si elle n'est pas susceptible d'engendrer un risque pour les droits et libertés des personnes (art. 33) ;</li>
<li>informe les personnes concernées dans les meilleurs délais si le risque est élevé (art. 34) ;</li>
<li>consigne toute violation, même non notifiée, dans un registre interne des violations.</li>
</ol>
<p>Un organisme de formation de petite taille n'est en principe pas tenu de désigner un délégué à la protection des données, sauf si ses activités relèvent des cas prévus à l'article 37 ; il désigne néanmoins en interne une personne chargée de ces questions (ici, Inès MARCHAND). Les manquements au RGPD peuvent être sanctionnés par la CNIL, qui dispose d'un pouvoir d'amende (art. 83).</p>
<blockquote><strong>Exemple fil rouge :</strong> Leïla BENSAÏD signale, lors de son inscription, un trouble de l'audition qui nécessite de s'asseoir près de la formatrice et de disposer des consignes par écrit. Inès note uniquement « placement proche de la formatrice, consignes écrites » dans la fiche d'adaptation, avec l'accord écrit de Leïla, sans mention du diagnostic. Cette fiche n'est accessible qu'à Inès et au formateur de la session.</blockquote>
<blockquote><strong>À retenir :</strong> un organisme de formation tient en pratique un registre des traitements (art. 30), informe les personnes à la collecte (art. 13), fonde chaque traitement sur une base légale (art. 6), traite les données de santé avec la plus grande retenue (art. 9), applique des durées de conservation, répond aux demandes dans le délai d'un mois (art. 12), sécurise les données (art. 32), encadre ses sous-traitants (art. 28) et notifie les violations à la CNIL dans les 72 heures lorsqu'elles présentent un risque (art. 33).</blockquote>
`,
      },
      {
        title: "6.9 – Quiz de fin de chapitre",
        content: `
<p>Répondez aux dix questions, puis consultez le corrigé. Une seule réponse est correcte par question.</p>

<h4>Question 1</h4>
<p>Quel document l'organisme remet-il au stagiaire à l'issue de la formation, en application de l'article L. 6353-1 du Code du travail ?</p>
<ul>
<li>A. Un diplôme</li>
<li>B. Une attestation mentionnant les objectifs, la nature et la durée de l'action et les résultats de l'évaluation des acquis</li>
<li>C. Le certificat de réalisation destiné au financeur</li>
<li>D. La feuille d'émargement originale</li>
</ul>

<h4>Question 2</h4>
<p>Quelle mention doit figurer sur la facture d'un organisme titulaire de l'attestation d'exonération de TVA ?</p>
<ul>
<li>A. « TVA à 20 % incluse »</li>
<li>B. « Exonération de TVA, article 261-4-4° a du CGI »</li>
<li>C. « TVA non récupérable »</li>
<li>D. Aucune mention</li>
</ul>

<h4>Question 3</h4>
<p>Vous découvrez une erreur de montant sur une facture déjà envoyée à une entreprise. Que faites-vous ?</p>
<ul>
<li>A. Vous modifiez la facture et la renvoyez avec le même numéro</li>
<li>B. Vous supprimez la facture de votre logiciel</li>
<li>C. Vous émettez un avoir, puis une nouvelle facture</li>
<li>D. Vous attendez le contrôle fiscal</li>
</ul>

<h4>Question 4</h4>
<p>Entre professionnels, en l'absence de clause contraire, quel est le délai de paiement ?</p>
<ul>
<li>A. 15 jours après la date d'exécution de la prestation</li>
<li>B. 30 jours après la date d'exécution de la prestation</li>
<li>C. 60 jours fin de mois</li>
<li>D. 90 jours après la facture</li>
</ul>

<h4>Question 5</h4>
<p>Dans quel cadre et à quelle ligne du BPF déclare-t-on les produits des contrats conclus avec des particuliers qui financent eux-mêmes leur formation ?</p>
<ul>
<li>A. Cadre C, ligne 1</li>
<li>B. Cadre C, ligne 2e</li>
<li>C. Cadre C, ligne 9</li>
<li>D. Cadre C, ligne 10</li>
</ul>

<h4>Question 6</h4>
<p>Où déclare-t-on, dans le cadre F-3, la formation non certifiante « Gérer son centre de formation » ?</p>
<ul>
<li>A. Ligne a (RNCP)</li>
<li>B. Ligne b (répertoire spécifique)</li>
<li>C. Ligne d (autres formations professionnelles)</li>
<li>D. Elle n'est pas déclarée</li>
</ul>

<h4>Question 7</h4>
<p>Un organisme a réalisé une formation pour le compte d'un autre organisme de formation. Où déclare-t-il ces stagiaires ?</p>
<ul>
<li>A. En F-1 et F-3</li>
<li>B. En F-2</li>
<li>C. En cadre G, avec les produits en ligne 10 du cadre C</li>
<li>D. Nulle part</li>
</ul>

<h4>Question 8</h4>
<p>Que se passe-t-il si le BPF n'est pas transmis ?</p>
<ul>
<li>A. Rien, s'il est transmis l'année suivante</li>
<li>B. La déclaration d'activité devient caduque (art. L. 6351-6)</li>
<li>C. Une simple majoration de 10 %</li>
<li>D. La certification Qualiopi est automatiquement renouvelée</li>
</ul>

<h4>Question 9</h4>
<p>Combien de temps faut-il conserver les pièces comptables, dont les factures ?</p>
<ul>
<li>A. 2 ans</li>
<li>B. 3 ans</li>
<li>C. 5 ans</li>
<li>D. 10 ans à compter de la clôture de l'exercice</li>
</ul>

<h4>Question 10</h4>
<p>Un courriel contenant les résultats d'évaluation de tout un groupe a été envoyé à une mauvaise adresse extérieure. Dans quel délai faut-il, le cas échéant, notifier la CNIL ?</p>
<ul>
<li>A. 24 heures</li>
<li>B. 72 heures après en avoir pris connaissance</li>
<li>C. 15 jours</li>
<li>D. Un mois</li>
</ul>

<h3>Corrigé et explications</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>B</td><td>L'attestation de fin de formation est remise au stagiaire ; le certificat de réalisation est destiné au financeur. Une formation non certifiante ne donne lieu à aucun diplôme.</td></tr>
<tr><td>2</td><td>B</td><td>La facture d'une opération exonérée mentionne la disposition qui justifie l'exonération.</td></tr>
<tr><td>3</td><td>C</td><td>Une facture émise ne se modifie pas et ne se supprime pas ; la numérotation doit rester continue. L'avoir annule tout ou partie de la facture.</td></tr>
<tr><td>4</td><td>B</td><td>Article L. 441-10 du Code de commerce : trente jours après la date d'exécution de la prestation, à défaut de stipulation contraire ; le délai convenu ne peut dépasser soixante jours à compter de l'émission de la facture.</td></tr>
<tr><td>5</td><td>C</td><td>Ligne 9 : contrats conclus avec des personnes à titre individuel et à leurs frais. La ligne 1 concerne les entreprises, la ligne 2e le CPF, la ligne 10 la sous-traitance reçue.</td></tr>
<tr><td>6</td><td>C</td><td>Faute de certification visée, la formation relève des « autres formations professionnelles ».</td></tr>
<tr><td>7</td><td>C</td><td>Les stagiaires confiés par un autre organisme figurent en cadre G et non en cadre F ; c'est le donneur d'ordre qui les déclare en F.</td></tr>
<tr><td>8</td><td>B</td><td>L'article L. 6351-6 prévoit la caducité de la déclaration lorsque le BPF n'a pas été adressé ou ne fait apparaître aucune activité.</td></tr>
<tr><td>9</td><td>D</td><td>Article L. 123-22 du Code de commerce : dix ans.</td></tr>
<tr><td>10</td><td>B</td><td>Article 33 du RGPD : notification à la CNIL dans les 72 heures, sauf absence de risque ; information des personnes si le risque est élevé ; inscription au registre des violations dans tous les cas.</td></tr>
</table>
<p><strong>Barème indicatif :</strong> 9 ou 10 bonnes réponses : notions maîtrisées ; 6 à 8 : relire les sections correspondant aux erreurs ; moins de 6 : reprendre le chapitre avant le cas pratique.</p>
`,
      },
      {
        title: "6.10 – Cas pratique : remettre en ordre la gestion administrative et financière d'Atelier Sésame Formation",
        content: `
<h3>Consigne</h3>
<p>Nous sommes en mars. Inès MARCHAND prépare l'audit initial Qualiopi d'<strong>Atelier Sésame Formation</strong> et vous demande un diagnostic de sa gestion administrative et financière. Tous les chiffres sont fictifs.</p>
<p><strong>Constats :</strong></p>
<ul>
<li>Les feuilles d'émargement de deux sessions de l'automne ont été signées par les stagiaires le dernier jour, pour toute la semaine.</li>
<li>Les attestations remises en fin de formation sont intitulées « Diplôme de compétence en bureautique ».</li>
<li>Une facture de 1 400 euros adressée à une entreprise comporte une erreur ; Inès l'a modifiée et renvoyée sous le même numéro. Ses factures ne portent ni la mention « EI », ni la mention de l'exonération de TVA, ni les pénalités de retard.</li>
<li>Une entreprise cliente doit 2 800 euros depuis 75 jours ; aucune relance n'a été faite.</li>
<li>Le BPF de l'exercice précédent n'a pas encore été préparé ; Inès pensait « avoir jusqu'à l'été ».</li>
<li>Les données d'activité de l'exercice sont les suivantes : 9 particuliers à leurs frais en formation « Tableur » de 21 heures (8 100 euros) ; 2 sessions intra de 14 heures pour des entreprises sur fonds propres, avec 4 salariés au total (5 600 euros), animées par Inès ; une session de 14 heures réalisée pour un autre organisme de formation, avec 5 stagiaires (1 400 euros).</li>
<li>Les dossiers des stagiaires sont dans la messagerie d'Inès et sur une clé USB ; aucune sauvegarde n'existe.</li>
<li>Le formulaire d'inscription du site demande la date de naissance, le numéro de sécurité sociale et « vos problèmes de santé éventuels ». Il n'existe ni registre des traitements, ni politique de confidentialité.</li>
<li>Paul RENAUD a reçu par courriel, sur son adresse personnelle, le tableau de toutes les inscriptions de l'année.</li>
</ul>
<p><strong>Travail demandé :</strong></p>
<ol>
<li>Classez les constats par niveau de risque et proposez une action corrective pour chacun.</li>
<li>Corrigez le traitement de la facture erronée et rédigez le modèle de facture conforme.</li>
<li>Rédigez la relance de l'impayé.</li>
<li>Indiquez la date limite de transmission du BPF et les conséquences d'un défaut de transmission ; remplissez les cadres C, F-1, F-3, F-4 et G.</li>
<li>Proposez une organisation de l'archivage et un tableau de conservation.</li>
<li>Proposez la mise en conformité RGPD (formulaire, registre, incident Paul RENAUD).</li>
</ol>

<h3>Corrigé</h3>

<h4>1. Diagnostic et actions correctives</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Constat</th><th>Risque</th><th>Action corrective</th></tr>
<tr><td>BPF non préparé, date limite méconnue</td><td>Très élevé : caducité de la déclaration d'activité</td><td>Préparer le BPF immédiatement et le transmettre dès l'ouverture de la campagne sur Mon Activité Formation (point 4)</td></tr>
<tr><td>Émargements signés en fin de semaine</td><td>Élevé : preuve d'assiduité fragile, non-conformité en audit et en contrôle</td><td>Émargement par demi-journée à partir de la prochaine session ; pour le passé, ne rien réécrire ni antidater ; conserver les feuilles telles quelles et documenter, si nécessaire, la présence par d'autres pièces existantes (travaux remis, évaluations datées)</td></tr>
<tr><td>Attestations intitulées « Diplôme »</td><td>Élevé : information trompeuse sur une formation non certifiante</td><td>Nouveau modèle « Attestation de fin de formation » conforme à l'article L. 6353-1 ; information des stagiaires concernés et remise d'une attestation correctement intitulée</td></tr>
<tr><td>Facture modifiée sous le même numéro ; mentions manquantes</td><td>Élevé : irrégularité comptable et fiscale</td><td>Avoir puis nouvelle facture ; nouveau modèle de facture (point 2) ; logiciel de facturation conforme</td></tr>
<tr><td>Impayé de 75 jours sans relance</td><td>Moyen à élevé : trésorerie</td><td>Relance immédiate (point 3) ; procédure de relance à 7, 15 et 30 jours après échéance</td></tr>
<tr><td>Dossiers dans la messagerie et sur une clé USB sans sauvegarde</td><td>Élevé : perte de preuves, violation de données en cas de perte de la clé</td><td>Arborescence normalisée sur un espace sécurisé, sauvegarde, tableau de conservation (point 5)</td></tr>
<tr><td>Formulaire excessif, absence de registre et de politique de confidentialité</td><td>Élevé : non-conformité au RGPD, données de santé collectées sans nécessité</td><td>Refonte du formulaire, registre, politique (point 6)</td></tr>
<tr><td>Tableau des inscriptions envoyé à Paul RENAUD</td><td>Moyen : divulgation de données au-delà du besoin</td><td>Traitement de l'incident (point 6)</td></tr>
</table>

<h4>2. Facture erronée et modèle conforme</h4>
<p><strong>Traitement :</strong> Inès émet un avoir n° A-2026-003 qui annule intégralement la facture initiale (avec son numéro d'origine), puis une nouvelle facture, avec le numéro suivant de la séquence, au montant correct. Elle informe l'entreprise par écrit et lui demande de ne pas tenir compte de la version modifiée.</p>
<p><strong>Modèle de facture conforme :</strong></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu</th></tr>
<tr><td>En-tête</td><td>Inès MARCHAND EI – Atelier Sésame Formation, adresse, SIRET, déclaration d'activité enregistrée sous le numéro …</td></tr>
<tr><td>Numéro et date</td><td>F-AAAA-NNN, séquence continue ; date d'émission</td></tr>
<tr><td>Client</td><td>Dénomination, adresse, SIREN</td></tr>
<tr><td>Prestation</td><td>Intitulé, dates, durée en heures, lieu, stagiaires</td></tr>
<tr><td>Montants</td><td>Prix unitaire, quantité, total net</td></tr>
<tr><td>TVA</td><td>« Exonération de TVA, article 261-4-4° a du CGI »</td></tr>
<tr><td>Paiement</td><td>Date d'échéance ; moyens de paiement ; absence d'escompte pour paiement anticipé</td></tr>
<tr><td>Retard</td><td>Taux des pénalités de retard ; indemnité forfaitaire pour frais de recouvrement de 40 euros (clients professionnels)</td></tr>
<tr><td>Acompte</td><td>Le cas échéant, rappel de l'acompte déjà facturé et solde restant dû</td></tr>
</table>

<h4>3. Relance de l'impayé</h4>
<blockquote>
<p>Objet : Facture n° F-2025-064 du … – échue depuis le …</p>
<p>Madame, Monsieur,</p>
<p>Sauf erreur de notre part, la facture n° F-2025-064 d'un montant de 2 800 euros, relative à la formation « Accueil téléphonique » réalisée pour vos équipes les … et …, arrivée à échéance le …, reste à ce jour impayée. Vous la trouverez à nouveau en pièce jointe.</p>
<p>Nous vous remercions de bien vouloir procéder à son règlement dans les meilleurs délais. Conformément à nos conditions générales et à l'article L. 441-10 du Code de commerce, des pénalités de retard et une indemnité forfaitaire pour frais de recouvrement de 40 euros sont applicables. Si le règlement a été effectué entre-temps, nous vous prions de ne pas tenir compte de ce message.</p>
<p>Nous restons à votre disposition pour toute question.</p>
<p>Inès MARCHAND, Atelier Sésame Formation</p>
</blockquote>

<h4>4. Le BPF</h4>
<p><strong>Date limite et conséquences :</strong> la date réglementaire est le 30 avril (art. R. 6352-23). Un report a été accordé chaque année jusqu'ici (jusqu'au 31 mai en 2026), mais il n'est pas garanti : Inès doit vérifier la date de la campagne en cours et viser la transmission en avril. Sans transmission, la déclaration d'activité devient caduque (art. L. 6351-6), ce qui remettrait en cause l'audit Qualiopi, l'exonération de TVA et la relation avec les clients. Elle n'a donc certainement pas « jusqu'à l'été ».</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Cadre</th><th>Ligne</th><th>Valeur</th></tr>
<tr><td>C</td><td>1 – Entreprises</td><td>5 600 €</td></tr>
<tr><td>C</td><td>9 – Particuliers à leurs frais</td><td>8 100 €</td></tr>
<tr><td>C</td><td>10 – Autres organismes de formation</td><td>1 400 €</td></tr>
<tr><td>C</td><td>Total</td><td>15 100 €</td></tr>
<tr><td>F-1</td><td>a – Salariés d'employeurs privés</td><td>4 stagiaires ; 4 × 14 h = 56 h</td></tr>
<tr><td>F-1</td><td>d – Particuliers à leurs propres frais</td><td>9 stagiaires ; 9 × 21 h = 189 h</td></tr>
<tr><td>F-1</td><td>Total</td><td>13 stagiaires ; 245 h</td></tr>
<tr><td>F-2</td><td>Activité sous-traitée</td><td>0</td></tr>
<tr><td>F-3</td><td>d – Autres formations professionnelles</td><td>13 stagiaires ; 245 h</td></tr>
<tr><td>F-4</td><td>Spécialités</td><td>324 – Secrétariat, bureautique : 9 stagiaires, 189 h ; 334 – Accueil, hôtellerie, tourisme : 4 stagiaires, 56 h ; total 13 stagiaires, 245 h (en supposant que les deux sessions intra portaient sur l'accueil)</td></tr>
<tr><td>G</td><td>Formations confiées par un autre organisme</td><td>5 stagiaires ; 5 × 14 h = 70 h</td></tr>
</table>
<p>Contrôle : totaux F-1 = F-3 = F-4 = 13 stagiaires et 245 heures ; les 5 stagiaires de la sous-traitance reçue sont en G, pas en F. Les cadres A, B, D, E et H sont complétés à partir de la comptabilité et du registre des sessions. Une fois la transmission faite, Inès télécharge et archive l'accusé de transmission.</p>

<h4>5. Archivage et tableau de conservation</h4>
<ul>
<li>Création d'un espace de stockage professionnel sécurisé (double authentification), avec l'arborescence « Année / Session / Stagiaire » et les dossiers transversaux « Comptabilité », « BPF », « Qualité », « Formateurs ».</li>
<li>Transfert des pièces de la messagerie et de la clé USB, puis effacement sécurisé de la clé.</li>
<li>Sauvegarde automatique sur un second support, testée chaque trimestre.</li>
<li>Tableau de conservation : pièces comptables et factures, 10 ans ; contrats et conventions, au moins 5 ans et la durée des pièces comptables lorsqu'ils les justifient ; émargements, évaluations, attestations, 10 ans par prudence ; preuves qualité, au moins le cycle de certification ; prospects, 3 ans après le dernier contact ; purge annuelle en janvier.</li>
</ul>

<h4>6. Mise en conformité RGPD</h4>
<ul>
<li><strong>Formulaire :</strong> suppression de la date de naissance et du numéro de sécurité sociale, qui ne sont pas nécessaires ; remplacement de « vos problèmes de santé éventuels » par « Avez-vous besoin d'un aménagement pour suivre la formation ? Si oui, notre référent handicap vous contactera », sans recueil d'information médicale dans le formulaire ; mention d'information et lien vers la politique de confidentialité.</li>
<li><strong>Registre :</strong> fiches pour la gestion des inscriptions et des parcours, les obligations administratives, la démarche qualité, l'accueil des personnes en situation de handicap, la prospection, la gestion des formateurs, avec finalités, bases légales, destinataires, durées et mesures de sécurité.</li>
<li><strong>Politique de confidentialité</strong> publiée sur le site et rappelée dans les contrats et le livret d'accueil.</li>
<li><strong>Incident Paul RENAUD :</strong> demander à Paul de supprimer le fichier de sa messagerie personnelle et de le confirmer par écrit ; évaluer le risque (données d'identité et de contact, pas de données sensibles, destinataire de confiance tenu à la confidentialité) ; en l'absence de risque pour les personnes, pas de notification à la CNIL, mais inscription dans le registre des violations ; à l'avenir, transmettre à chaque formateur la seule liste de sa session, via l'espace sécurisé, et ajouter une clause de confidentialité et de protection des données à son contrat de sous-traitance.</li>
</ul>
<blockquote><strong>À retenir :</strong> la gestion administrative et financière se remet en ordre par priorité de risque : d'abord ce qui menace l'existence de l'organisme (BPF et caducité), puis la preuve des actions (émargements, attestations, archives), la régularité comptable (factures, avoirs), la trésorerie (relances) et la protection des données (formulaire, registre, incidents). On ne réécrit jamais le passé : on corrige pour l'avenir et on documente.</blockquote>
`,
      },
    ],
  },
];
