import type { CourseChapter } from "../courseContent";

export const ARH41366_PARTIE4: CourseChapter[] = [
  {
    title: "Chapitre 7 – CP4 : Contribuer aux opérations liées à la gestion des emplois et carrières",
    description: "Ce chapitre couvre la quatrième compétence professionnelle du titre (CP4), première compétence du CCP2 « Contribuer au développement des ressources humaines ». Il présente la gestion des emplois et des parcours professionnels (GEPP, ex-GPEC) : ses enjeux, l'obligation de négocier dans les entreprises d'au moins 300 salariés, la démarche (cartographie des emplois, référentiels emplois-compétences, fiches de poste, métiers sensibles) et ses outils. Il détaille ensuite les deux grands entretiens RH : l'entretien professionnel, profondément réformé par la loi du 24 octobre 2025 qui l'a transformé en « entretien de parcours professionnel » (premier entretien dans l'année de l'embauche, puis tous les 4 ans, état des lieux à 8 ans, abondement correctif de 3 000 € dans les entreprises d'au moins 50 salariés), et l'entretien annuel d'évaluation. Vous apprendrez à planifier une campagne d'entretiens (rétroplanning, convocations, supports, relances, tableau de suivi, taux de réalisation), à concevoir les supports, à préparer et conduire un entretien avec neutralité, à exploiter les comptes rendus pour alimenter le plan de développement des compétences, la mobilité interne et les transitions professionnelles (CEP, PTP, bilan de compétences, VAE, période de reconversion), en tenant compte des salariés expérimentés et des salariés en situation de handicap. Le chapitre se termine par la communication interne et externe, la confidentialité et le RGPD, avec l'entreprise fil rouge ALTÉA SERVICES.",
    sections: [
      {
        title: "7.1 – La CP4 dans le référentiel et les enjeux de la gestion des emplois et des parcours professionnels (GEPP)",
        content: `
<h3>Ce que le référentiel attend de l'assistant RH</h3>
<p>Le référentiel emploi activités compétences (REAC) du titre professionnel Assistant ressources humaines décrit ainsi la CP4 : « Dans le respect de la législation en vigueur et des règles de confidentialité, contribuer à la gestion opérationnelle et prévisionnelle du personnel, avec les managers, les collaborateurs RH et les IRP. Planifier les entretiens professionnels et d'évaluation du personnel, en assurer le suivi et les exploiter en fonction des objectifs de l'entreprise (évolution de carrière, transition professionnelle des salariés…). Diffuser les informations aux interlocuteurs concernés dans le respect du cadre légal et dans la forme convenue. En fonction de consignes, actualiser les outils RH tels que les référentiels d'emplois et de compétences ou les fiches de postes. »</p>
<p>Le mot-clé est <strong>« contribuer »</strong> : l'assistant RH ne fixe pas la politique de gestion des carrières, il en assure la <strong>mise en œuvre opérationnelle</strong> (planning, supports, suivi, synthèses, mise à jour des outils) sous la responsabilité du responsable RH. Le contexte de mise en œuvre précisé par le REAC est celui d'une démarche de gestion prévisionnelle de l'emploi et des compétences, éventuellement avec l'appui d'un cabinet conseil ou d'un organisme agréé par l'État chargé d'accompagner la formation professionnelle (en pratique l'OPCO).</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère de performance (REAC)</th><th>Ce que l'évaluateur vérifie concrètement</th></tr>
<tr><td>Les règles de confidentialité sont respectées</td><td>Comptes rendus d'entretien rangés dans un espace à accès restreint ; synthèses anonymisées ou agrégées avant diffusion ; aucune donnée de santé, aucun jugement personnel dans les documents diffusés</td></tr>
<tr><td>Les entretiens sont exploités en fonction des objectifs donnés</td><td>La synthèse répond à la question posée (besoins de formation, souhaits de mobilité, risques de départ…) ; elle propose des actions et des priorités chiffrées</td></tr>
<tr><td>La collecte, l'analyse et la diffusion des informations sont fiables et respectent le cadre légal</td><td>Données vérifiées (dates, effectifs, taux) ; périodicités légales respectées ; information du CSE et des salariés conforme ; finalités RGPD définies</td></tr>
</table>
<p>Les savoir-faire listés par le REAC structurent ce chapitre : assurer une veille sur la législation en matière de gestion des emplois et carrières ; établir un planning relatif aux différents entretiens ; participer à l'élaboration des supports d'entretien ; contribuer à la mise en œuvre d'actions de communication ; planifier les opérations et en assurer le suivi ; faciliter l'expression des besoins des collaborateurs ; communiquer en interne (managers, personnel, collaborateurs RH, IRP) et en externe (cabinet conseil, organisme agréé) ; faire preuve de neutralité, de souplesse et de rigueur ; respecter les règles de confidentialité ; préparer et conduire un entretien ; connaître la législation en matière de gestion des emplois et carrières et la protection des données personnelles (CNIL et RGPD).</p>

<h3>De la GPEC à la GEPP</h3>
<p>La <strong>gestion prévisionnelle des emplois et des compétences (GPEC)</strong> est née d'une logique d'anticipation : rapprocher les besoins futurs de l'entreprise en emplois et compétences des ressources dont elle dispose, et réduire l'écart par des actions RH (formation, mobilité, recrutement, évolution de l'organisation). Les ordonnances du 22 septembre 2017 ont renommé la négociation obligatoire correspondante en <strong>négociation sur la gestion des emplois et des parcours professionnels (GEPP)</strong>. Le changement de nom n'est pas cosmétique : il met l'accent sur le <strong>parcours</strong> de chaque salarié (évolution, mobilité, transitions) et plus seulement sur la prévision des effectifs.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Enjeu</th><th>Pour l'entreprise</th><th>Pour le salarié</th></tr>
<tr><td>Anticipation</td><td>Prévoir les départs (retraite, mobilité), les métiers en tension, l'impact des évolutions techniques (robotisation, numérique, IA), réglementaires et environnementales</td><td>Connaître les évolutions de son métier avant de les subir</td></tr>
<tr><td>Compétences</td><td>Disposer des compétences au bon moment, sécuriser les savoir-faire critiques, organiser la transmission</td><td>Maintenir et développer son employabilité</td></tr>
<tr><td>Fidélisation et attractivité</td><td>Réduire le turnover, valoriser la marque employeur par des parcours lisibles</td><td>Disposer de perspectives d'évolution claires</td></tr>
<tr><td>Dialogue social</td><td>Partager le diagnostic avec le CSE et les organisations syndicales, prévenir les restructurations brutales</td><td>Être informé, pouvoir être accompagné</td></tr>
<tr><td>Conformité</td><td>Respecter les obligations d'adaptation au poste et de maintien de la capacité à occuper un emploi (art. L6321-1), d'entretien de parcours professionnel, de négociation</td><td>Bénéficier des droits attachés (entretiens, formation, abondements)</td></tr>
</table>

<h3>Les obligations légales qui encadrent la GEPP</h3>
<ul>
<li><strong>Obligation d'adaptation et d'employabilité (art. L6321-1)</strong> : toute entreprise, quelle que soit sa taille, assure l'adaptation des salariés à leur poste de travail et veille au maintien de leur capacité à occuper un emploi, au regard notamment de l'évolution des emplois, des technologies et des organisations. Le manquement peut être sanctionné par des dommages-intérêts (par exemple lorsqu'un salarié est licencié après des années sans aucune formation).</li>
<li><strong>Négociation GEPP (art. L2242-2 et L2242-20)</strong> : dans les entreprises et groupes d'au moins <strong>300 salariés</strong> (et les entreprises de dimension communautaire comportant au moins un établissement de 150 salariés en France), l'employeur engage au moins une fois tous les <strong>trois ans</strong> (périodicité adaptable par accord, dans la limite de quatre ans) une négociation sur la gestion des emplois et des parcours professionnels. Elle porte notamment sur la mise en place d'un dispositif de GEPP et de mesures d'accompagnement (formation, abondement du CPF, VAE, bilan de compétences, accompagnement de la mobilité), les grandes orientations à trois ans de la formation professionnelle, les perspectives de recours aux différents contrats de travail, au temps partiel et aux stages, les conditions de la mobilité professionnelle ou géographique interne, l'information des sous-traitants sur les orientations stratégiques, le déroulement de carrière des salariés exerçant des responsabilités syndicales. La loi du 24 octobre 2025 transposant les accords nationaux interprofessionnels sur l'emploi des salariés expérimentés a intégré à cette négociation l'<strong>emploi, le travail et l'amélioration des conditions de travail des salariés expérimentés</strong> (à vérifier sur Légifrance pour la rédaction exacte de l'article L2242-20 en vigueur).</li>
<li><strong>Consultation du CSE sur les orientations stratégiques (art. L2312-24)</strong> : dans les entreprises d'au moins 50 salariés, le CSE est consulté chaque année sur les orientations stratégiques et leurs conséquences sur l'activité, l'emploi, l'évolution des métiers et des compétences, l'organisation du travail, le recours à la sous-traitance, à l'intérim et aux contrats temporaires. Cette consultation porte aussi sur la GEPP et les orientations de la formation professionnelle. La base de données économiques, sociales et environnementales (BDESE) sert de support.</li>
<li><strong>Entretien de parcours professionnel (art. L6315-1)</strong> : obligatoire dans toutes les entreprises, quel que soit l'effectif (voir section 7.3).</li>
</ul>
<blockquote><strong>ALTÉA SERVICES – situation de départ.</strong> Avec 148 salariés, ALTÉA SERVICES n'est pas soumise à la négociation GEPP obligatoire (seuil de 300). En revanche, elle doit consulter son CSE chaque année sur les orientations stratégiques et la politique sociale, organiser les entretiens de parcours professionnel de tous ses salariés et, étant au-dessus de 50 salariés, elle est exposée à l'abondement correctif de 3 000 € en cas de manquement constaté lors de l'état des lieux. Nathalie ROUSSEL, responsable RH, a décidé de lancer une démarche GEPP volontaire : la direction prévoit la reprise de deux marchés de nettoyage hospitalier, l'arrivée d'autolaveuses autoportées et le départ à la retraite de trois chefs d'équipe dans les trois ans. L'apprenti assistant RH est chargé d'en assurer la partie opérationnelle.</blockquote>

<h3>Les acteurs de la gestion des emplois et carrières</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Acteur</th><th>Rôle</th><th>Ce que l'assistant RH lui apporte</th></tr>
<tr><td>Direction générale</td><td>Fixe la stratégie, valide les orientations et le budget</td><td>Tableaux de synthèse, indicateurs</td></tr>
<tr><td>Responsable RH</td><td>Pilote la démarche, arbitre, négocie, présente au CSE</td><td>Planning, supports, suivi, données fiables, premières analyses</td></tr>
<tr><td>Managers (chefs de site, chefs d'équipe)</td><td>Conduisent les entretiens, évaluent, identifient les besoins</td><td>Guides, convocations, relances, aide méthodologique</td></tr>
<tr><td>Salariés</td><td>Expriment leurs souhaits, préparent leurs entretiens, sont acteurs de leur parcours</td><td>Information claire sur leurs droits et les dispositifs, documents de préparation</td></tr>
<tr><td>CSE (IRP)</td><td>Est informé et consulté (orientations stratégiques, politique sociale, plan de développement des compétences, méthodes d'évaluation)</td><td>Données agrégées et anonymisées</td></tr>
<tr><td>Partenaires externes</td><td>OPCO (financement, appui technique, diagnostics), cabinet conseil, opérateurs du conseil en évolution professionnelle, Transitions Pro, Cap emploi, service de prévention et de santé au travail</td><td>Dossiers de demande, prises de contact, suivi administratif</td></tr>
</table>
<h4>Veille juridique : une compétence à part entière</h4>
<p>Le REAC demande d'« assurer une veille sur la législation en matière de gestion des emplois et carrières ». L'actualité 2025-2026 en montre l'importance : la loi du 24 octobre 2025 a modifié l'entretien professionnel, créé la période de reconversion (qui remplace la Pro-A et les Transitions collectives depuis le 1er février 2026) et renforcé les obligations relatives aux salariés expérimentés. Sources fiables à suivre : Légifrance (textes officiels), travail-emploi.gouv.fr (questions-réponses du ministère), service-public.fr, le site de l'OPCO de la branche, centre-inffo.fr (formation professionnelle), cnil.fr (RGPD), les éditeurs juridiques spécialisés. Bonne pratique : tenir un <strong>tableau de veille</strong> (date, source, texte, résumé, impact pour l'entreprise, action à mener, responsable).</p>
`
      },
      {
        title: "7.2 – La démarche GEPP et ses outils : cartographie des emplois, référentiels, fiches de poste, métiers sensibles",
        content: `
<h3>Les étapes d'une démarche GEPP</h3>
<ol>
<li><strong>Cadrer</strong> : objectifs (anticiper des départs, accompagner une évolution technique, préparer une reprise de marché), périmètre (toute l'entreprise ou un métier), calendrier, acteurs, information du CSE.</li>
<li><strong>Faire l'état des lieux de l'existant (diagnostic quantitatif)</strong> : pyramide des âges et des anciennetés, effectifs par emploi, par site, par catégorie, par sexe, types de contrats, turnover, départs prévisibles (retraites), absentéisme, inaptitudes.</li>
<li><strong>Décrire les emplois et les compétences (diagnostic qualitatif)</strong> : cartographie des emplois, fiches de poste, référentiel emplois-compétences.</li>
<li><strong>Identifier les besoins futurs</strong> : évolution des activités, des techniques, de la réglementation ; emplois en croissance, stables, en décroissance ; compétences nouvelles.</li>
<li><strong>Analyser les écarts</strong> entre ressources actuelles et besoins futurs, en quantité (effectifs) et en qualité (compétences).</li>
<li><strong>Définir un plan d'action</strong> : formation, mobilité interne, recrutement, tutorat et transmission, reconversion, aménagement des postes, organisation du travail.</li>
<li><strong>Mettre en œuvre et suivre</strong> : indicateurs, revue annuelle, mise à jour des outils.</li>
</ol>

<h3>La cartographie des emplois</h3>
<p>La cartographie représente l'ensemble des emplois de l'entreprise, regroupés en <strong>familles professionnelles</strong> (ou filières), avec pour chaque emploi l'effectif et, idéalement, des informations sur son évolution. Elle distingue le <strong>poste</strong> (situation de travail individuelle : agent de propreté sur le site de la clinique X, de 6 h à 10 h) et l'<strong>emploi</strong> (regroupement de postes suffisamment proches pour être occupés par une même personne : agent de propreté). Le <strong>métier</strong> est encore plus large (ensemble d'emplois partageant un cœur de compétences, souvent rattachés à un code ROME).</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Famille professionnelle</th><th>Emploi</th><th>Effectif ALTÉA</th><th>Dont 55 ans et plus</th><th>Tendance à 3 ans</th></tr>
<tr><td rowspan="4">Exploitation propreté</td><td>Agent de propreté</td><td>98</td><td>21</td><td>En croissance (marchés hospitaliers)</td></tr>
<tr><td>Agent machiniste (autolaveuse, monobrosse)</td><td>12</td><td>2</td><td>En forte croissance (mécanisation)</td></tr>
<tr><td>Chef d'équipe</td><td>10</td><td>4</td><td>Stable, 3 départs en retraite à remplacer</td></tr>
<tr><td>Chef de site / inspecteur</td><td>6</td><td>1</td><td>Stable</td></tr>
<tr><td rowspan="2">Services associés</td><td>Agent d'accueil / services aux occupants</td><td>8</td><td>1</td><td>Stable</td></tr>
<tr><td>Agent de maintenance multiservices</td><td>4</td><td>1</td><td>En croissance</td></tr>
<tr><td rowspan="3">Fonctions support</td><td>Assistant(e) d'exploitation / planning</td><td>4</td><td>0</td><td>Stable, évolution numérique du planning</td></tr>
<tr><td>Comptabilité, RH, paie</td><td>4</td><td>1</td><td>Stable</td></tr>
<tr><td>Commercial, direction</td><td>2</td><td>0</td><td>Stable</td></tr>
<tr><td colspan="2"><strong>Total</strong></td><td><strong>148</strong></td><td><strong>31</strong></td><td></td></tr>
</table>

<h3>Le référentiel emplois-compétences</h3>
<p>Le référentiel décrit, pour chaque emploi, les <strong>activités</strong> et les <strong>compétences</strong> requises, généralement classées en savoirs (connaissances), savoir-faire (techniques et organisationnels) et savoir-être professionnels (comportements observables en situation de travail). Chaque compétence est associée à une <strong>échelle de maîtrise</strong> qui permet de comparer le niveau requis et le niveau constaté lors des entretiens.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Niveau</th><th>Libellé</th><th>Définition opérationnelle</th></tr>
<tr><td>1</td><td>Notions</td><td>Connaît la compétence, l'exerce avec l'aide d'un collègue ou d'un tuteur</td></tr>
<tr><td>2</td><td>Application</td><td>L'exerce seul dans les situations courantes, en appliquant les procédures</td></tr>
<tr><td>3</td><td>Maîtrise</td><td>L'exerce seul dans les situations courantes et inhabituelles, sait résoudre les difficultés</td></tr>
<tr><td>4</td><td>Expertise</td><td>Fait évoluer les pratiques, forme et accompagne les autres</td></tr>
</table>
<p><strong>Extrait du référentiel ALTÉA – emploi « Agent machiniste »</strong></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Bloc d'activités</th><th>Compétence</th><th>Niveau requis</th></tr>
<tr><td rowspan="3">Préparer l'intervention</td><td>Lire et appliquer un cahier des charges et un protocole de nettoyage</td><td>3</td></tr>
<tr><td>Choisir et doser les produits selon les fiches techniques et fiches de données de sécurité</td><td>3</td></tr>
<tr><td>Contrôler l'état et la sécurité d'une machine avant utilisation</td><td>3</td></tr>
<tr><td rowspan="3">Réaliser le nettoyage mécanisé</td><td>Conduire une autolaveuse autoportée en respectant les règles de circulation et la coactivité</td><td>3</td></tr>
<tr><td>Réaliser un décapage et une remise en état de sols</td><td>2</td></tr>
<tr><td>Appliquer les protocoles d'hygiène en milieu sensible (bionettoyage)</td><td>2</td></tr>
<tr><td rowspan="2">Assurer la qualité et la relation client</td><td>Renseigner les documents de traçabilité</td><td>2</td></tr>
<tr><td>Adopter un comportement professionnel avec les occupants des locaux</td><td>3</td></tr>
</table>
<p><strong>Rôle de l'assistant RH :</strong> en fonction des consignes, il <strong>actualise</strong> le référentiel (nouvelles compétences après l'arrivée d'un matériel, nouvelle réglementation), en recueillant l'information auprès des managers et des titulaires des postes, en contrôlant la cohérence (même vocabulaire, verbes d'action, niveaux réalistes) et en gérant les versions (date, numéro de version, validation par la responsable RH).</p>

<h3>La fiche de poste : contenu et mise à jour</h3>
<p>La fiche de poste décrit un poste réel : sa raison d'être, ses missions, ses activités, ses relations, ses conditions d'exercice et les compétences requises. Elle sert à l'intégration, à l'évaluation, à la formation, à la classification conventionnelle, au document unique d'évaluation des risques, et en cas de litige sur le contenu des fonctions. Elle se distingue du <strong>profil de poste</strong>, qui décrit la personne recherchée (voir chapitre 8).</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Exemple – Chef d'équipe propreté, ALTÉA SERVICES</th></tr>
<tr><td>Intitulé, code interne, classification</td><td>Chef d'équipe – EXP-CE – classification selon la grille de la CCN des entreprises de propreté (IDCC 3043)</td></tr>
<tr><td>Rattachement hiérarchique</td><td>Chef de site</td></tr>
<tr><td>Raison d'être du poste</td><td>Organiser et contrôler le travail d'une équipe de 8 à 15 agents pour garantir la qualité de prestation attendue par le client, dans le respect des règles de sécurité</td></tr>
<tr><td>Missions principales</td><td>1. Répartir le travail et assurer le remplacement des absents ; 2. Former les nouveaux agents aux protocoles ; 3. Contrôler la qualité et renseigner les grilles de contrôle ; 4. Gérer les stocks de produits et de matériel ; 5. Relayer les consignes de sécurité et remonter les incidents ; 6. Participer aux réunions avec le client</td></tr>
<tr><td>Relations</td><td>Internes : agents, chef de site, planning, RH ; externes : client, occupants des locaux</td></tr>
<tr><td>Conditions d'exercice</td><td>Horaires décalés (début 6 h), déplacements entre sites du Val-de-Marne, port des EPI</td></tr>
<tr><td>Moyens</td><td>Téléphone professionnel, application de contrôle qualité, véhicule de service</td></tr>
<tr><td>Compétences requises</td><td>Renvoi au référentiel emplois-compétences, emploi « Chef d'équipe »</td></tr>
<tr><td>Indicateurs de réussite</td><td>Taux de conformité des contrôles qualité, taux de réclamations client, respect des plannings</td></tr>
<tr><td>Version</td><td>V3 du 15/01/2027 – rédigée par l'assistant RH, validée par N. ROUSSEL et le chef de site</td></tr>
</table>
<p><strong>Procédure d'actualisation d'une fiche de poste :</strong> 1) recueillir les changements (entretien avec le titulaire et le manager, observation, comptes rendus d'entretiens annuels) ; 2) rédiger avec des verbes d'action à l'infinitif (organiser, contrôler, renseigner) ; 3) faire valider par le manager puis le RH ; 4) dater et numéroter ; 5) diffuser au titulaire et classer dans le dossier emploi ; 6) archiver l'ancienne version. Une modification substantielle des fonctions peut constituer une modification du contrat de travail nécessitant l'accord du salarié : en cas de doute, l'assistant RH alerte la responsable RH.</p>

<h3>Les métiers sensibles</h3>
<p>Un métier est dit <strong>sensible</strong> lorsqu'il présente un risque pour l'entreprise ou pour les salariés qui l'occupent. On distingue habituellement :</p>
<ul>
<li>les <strong>métiers en décroissance ou menacés</strong> (activité en recul, automatisation) : les titulaires doivent être accompagnés vers d'autres emplois ;</li>
<li>les <strong>métiers stratégiques ou critiques</strong> : savoir-faire rare, difficile à recruter, indispensable à l'activité ;</li>
<li>les <strong>métiers en tension</strong> : difficultés de recrutement sur le marché du travail ;</li>
<li>les <strong>métiers exposés à l'usure professionnelle</strong> (contraintes physiques, horaires décalés) : risque d'inaptitude, nécessité de prévoir des passerelles.</li>
</ul>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Emploi ALTÉA</th><th>Type de sensibilité</th><th>Indice</th><th>Action GEPP envisagée</th></tr>
<tr><td>Chef d'équipe</td><td>Critique + départs</td><td>3 départs en retraite sur 10 en 3 ans</td><td>Repérer les agents à potentiel lors des entretiens, parcours de formation au management d'équipe, tutorat par les partants</td></tr>
<tr><td>Agent machiniste</td><td>En tension, en croissance</td><td>Arrivée de 4 autolaveuses autoportées</td><td>Formation interne d'agents volontaires à la conduite des machines, recrutement</td></tr>
<tr><td>Agent de propreté (postes physiques)</td><td>Usure professionnelle</td><td>21 agents de 55 ans et plus, restrictions médicales en hausse</td><td>Aménagements avec le service de prévention et de santé au travail, passerelles vers l'accueil ou le contrôle qualité</td></tr>
</table>

<h3>Les outils de la GEPP : synthèse</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Outil</th><th>Utilité</th><th>Mise à jour</th></tr>
<tr><td>Pyramide des âges et des anciennetés</td><td>Anticiper les départs, repérer les déséquilibres</td><td>Annuelle (extraction SIRH)</td></tr>
<tr><td>Cartographie des emplois</td><td>Vision d'ensemble des emplois et des effectifs</td><td>Annuelle</td></tr>
<tr><td>Référentiel emplois-compétences</td><td>Langage commun, base des entretiens et de la formation</td><td>À chaque évolution d'un emploi</td></tr>
<tr><td>Fiches de poste</td><td>Contenu réel des postes</td><td>À chaque changement, au moins tous les 2 à 3 ans</td></tr>
<tr><td>Comptes rendus d'entretiens</td><td>Recueillir souhaits et besoins individuels</td><td>À chaque campagne</td></tr>
<tr><td>Matrice des compétences (tableau croisé salariés × compétences)</td><td>Visualiser la polyvalence et les compétences rares</td><td>Après chaque campagne et chaque formation</td></tr>
<tr><td>Plan de succession / revue des talents</td><td>Identifier des remplaçants potentiels pour les postes clés</td><td>Annuelle</td></tr>
<tr><td>Aires de mobilité / passerelles</td><td>Montrer les emplois accessibles depuis un emploi donné</td><td>À chaque révision du référentiel</td></tr>
<tr><td>Plan de développement des compétences</td><td>Traduire les besoins en actions de formation</td><td>Annuelle</td></tr>
</table>
<p><strong>Mise en pratique.</strong> À partir de l'extraction Lucca des 148 salariés (date de naissance, date d'entrée, emploi, site), construisez dans Excel la pyramide des âges par tranches de 5 ans (tableau croisé dynamique, graphique à barres opposées femmes/hommes), puis calculez le nombre de salariés qui atteindront 62 ans dans les trois prochaines années par emploi. Rappel RGPD : l'extraction est enregistrée dans le dossier RH à accès restreint et supprimée une fois l'analyse terminée.</p>
`
      },
      {
        title: "7.3 – L'entretien professionnel devenu « entretien de parcours professionnel » (réforme de 2025)",
        content: `
<h3>Une réforme récente à connaître parfaitement</h3>
<p>L'entretien professionnel a été créé par la loi du 5 mars 2014 et codifié à l'<strong>article L6315-1 du Code du travail</strong>. Jusqu'en 2025, il devait avoir lieu tous les <strong>2 ans</strong>, avec un état des lieux récapitulatif tous les <strong>6 ans</strong>. La <strong>loi du 24 octobre 2025</strong>, qui transpose les accords nationaux interprofessionnels de novembre 2024 en faveur de l'emploi des salariés expérimentés, a profondément réformé le dispositif, rebaptisé <strong>« entretien de parcours professionnel »</strong> (EPP). Les principales règles, d'après les sources consultées (legisocial.fr, editions-tissot.fr, réponses du ministère du Travail), sont résumées ci-dessous. <strong>Avant toute mise en œuvre, vérifiez la rédaction en vigueur des articles L6315-1 et suivants sur Légifrance et les questions-réponses du ministère du Travail</strong> : certaines modalités font l'objet de précisions administratives successives.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Point</th><th>Droit antérieur (jusqu'au 25/10/2025)</th><th>Droit issu de la loi du 24/10/2025</th></tr>
<tr><td>Nom</td><td>Entretien professionnel</td><td>Entretien de parcours professionnel</td></tr>
<tr><td>Premier entretien</td><td>Tous les 2 ans à compter de l'embauche</td><td>Au cours de la <strong>première année</strong> suivant l'embauche (le salarié en est informé à l'embauche)</td></tr>
<tr><td>Périodicité</td><td>Tous les 2 ans</td><td><strong>Tous les 4 ans</strong> (un accord collectif peut prévoir une autre périodicité, sans dépasser 4 ans)</td></tr>
<tr><td>État des lieux récapitulatif</td><td>Tous les 6 ans</td><td><strong>Tous les 8 ans</strong> (selon le ministère : dans les 7 ans suivant le premier entretien, puis tous les 8 ans)</td></tr>
<tr><td>Entretiens liés à l'âge</td><td>Non prévus spécifiquement</td><td><strong>Entretien de mi-carrière</strong> dans les 2 mois suivant la visite médicale de mi-carrière (autour de 45 ans) ; entretien abordant la <strong>fin de carrière</strong> dans les 2 ans précédant les 60 ans (aménagements, temps partiel, retraite progressive)</td></tr>
<tr><td>Retour de certaines absences</td><td>Entretien systématiquement proposé</td><td>Maintenu, sauf si le salarié a bénéficié d'un entretien dans les 12 mois précédant sa reprise</td></tr>
<tr><td>Abondement correctif (entreprises ≥ 50 salariés)</td><td>3 000 € si, sur 6 ans, absence des entretiens biennaux <em>et</em> d'au moins une formation non obligatoire</td><td>3 000 € si, sur 8 ans, le salarié n'a pas bénéficié des entretiens prévus <em>et</em> d'au moins une action de formation (conditions à vérifier dans la version en vigueur)</td></tr>
<tr><td>Entrée en vigueur</td><td>—</td><td>26 octobre 2025 ; les entreprises couvertes par un accord collectif sur l'entretien professionnel avaient jusqu'au <strong>1er octobre 2026</strong> pour le mettre en conformité, faute de quoi les clauses contraires ne s'appliquent plus</td></tr>
</table>
<blockquote><strong>Transition entre les deux régimes</strong> (précisions du ministère du Travail rapportées par les éditeurs juridiques) : pour les salariés déjà en poste, le nouveau délai de 4 ans court à compter du <strong>dernier entretien réalisé</strong>. Exemple : un salarié reçu en décembre 2023, qui devait être revu en décembre 2025 sous l'ancien régime, peut l'être en décembre 2027. Si vous n'êtes pas certain du régime applicable à un salarié, tracez son historique d'entretiens et faites valider la date cible par la responsable RH. Les supports de cours, les sites d'éditeurs et les modèles antérieurs à fin 2025 mentionnent encore « tous les 2 ans / 6 ans » : c'est un exemple concret de l'intérêt de la veille juridique.</blockquote>

<h3>Les salariés concernés</h3>
<p>Tous les salariés, quels que soient l'effectif de l'entreprise, la nature du contrat (CDI, CDD, temps partiel, apprentissage) et l'ancienneté, sont concernés. En pratique, un CDD court peut s'achever avant l'échéance de l'entretien ; un apprenti embauché pour 12 mois doit en être informé à l'embauche et bénéficier d'un entretien dans l'année suivant son embauche selon la nouvelle règle (point à valider dans le calendrier de campagne).</p>
<h4>Le retour de certaines absences</h4>
<p>L'entretien est proposé systématiquement au salarié qui reprend son activité à l'issue de : congé de maternité, congé de naissance (selon la rédaction en vigueur), congé parental d'éducation, congé de proche aidant, congé d'adoption, congé sabbatique, période de mobilité volontaire sécurisée, période d'activité à temps partiel au titre du congé parental, arrêt longue maladie, mandat syndical. Il peut avoir lieu, à l'initiative du salarié, avant la reprise. Il n'est pas obligatoire si le salarié a bénéficié d'un entretien au cours des 12 mois précédant la reprise.</p>

<h3>Le contenu de l'entretien de parcours professionnel</h3>
<p>L'entretien est consacré aux <strong>perspectives d'évolution professionnelle</strong> du salarié, notamment en termes de qualifications et d'emploi. Il <strong>ne porte pas sur l'évaluation du travail du salarié</strong>. Selon les sources consultées, la réforme a précisé les thèmes à aborder : les compétences du salarié et les qualifications mobilisées dans son emploi ainsi que leur évolution possible ; sa situation et son parcours professionnel au regard des évolutions des métiers et des perspectives d'emploi dans l'entreprise ; ses besoins de formation ; ses souhaits d'évolution professionnelle (mobilité interne ou externe, reconversion, projet de transition) ; l'activation du compte personnel de formation, les abondements que l'employeur est susceptible de financer et le conseil en évolution professionnelle. L'entretien donne lieu à la <strong>rédaction d'un document</strong> dont une copie est remise au salarié.</p>
<h4>L'entretien de mi-carrière et l'entretien précédant les 60 ans</h4>
<ul>
<li><strong>Mi-carrière</strong> : il se tient dans les 2 mois suivant la visite médicale de mi-carrière (organisée par le service de prévention et de santé au travail, généralement l'année des 45 ans). Il aborde notamment l'adaptation des missions et du poste, la prévention de l'usure professionnelle, les besoins de formation et les souhaits de mobilité ou de reconversion. <strong>L'employeur n'a pas accès aux données de santé</strong> issues de la visite médicale : seules les préconisations transmises par le médecin du travail dans les formes prévues peuvent être prises en compte.</li>
<li><strong>Avant 60 ans</strong> : l'entretien organisé dans les deux années précédant le 60e anniversaire aborde également les conditions de maintien dans l'emploi et les possibilités d'aménagement de fin de carrière (temps partiel, retraite progressive, transmission des savoirs, tutorat).</li>
</ul>

<h3>L'état des lieux récapitulatif et l'abondement correctif</h3>
<p>L'état des lieux est un entretien de parcours professionnel « renforcé » : il fait le bilan du parcours sur la période de référence (désormais 8 ans) et permet de vérifier que le salarié a bénéficié des entretiens prévus et d'actions de formation (le droit antérieur ajoutait l'acquisition d'éléments de certification et une progression salariale ou professionnelle comme critères de vérification). Il donne lieu à un document écrit remis au salarié.</p>
<p>Dans les entreprises d'<strong>au moins 50 salariés</strong>, lorsque le salarié n'a pas bénéficié des entretiens prévus et d'au moins une action de formation (autre que celles conditionnant l'exercice d'une activité ou d'une fonction en application de dispositions légales et réglementaires, selon la rédaction antérieure), l'employeur doit verser un <strong>abondement correctif de 3 000 €</strong> sur le CPF du salarié, via la Caisse des dépôts. Le versement intervient selon le calendrier fixé par décret (antérieurement, au plus tard le dernier jour du trimestre civil suivant l'entretien d'état des lieux) ; à défaut, l'employeur s'expose à une pénalité au moins égale au double du montant dû, recouvrée par l'administration. Un accord collectif d'entreprise ou de branche peut définir d'autres modalités d'appréciation du parcours.</p>
<blockquote><strong>Attention aux formations obligatoires.</strong> Les formations imposées par la réglementation pour exercer un poste (habilitation électrique, CACES, formations sécurité réglementaires) ne suffisent pas à remplir l'obligation telle qu'elle était rédigée avant la réforme. Vérifiez la rédaction en vigueur. Chez ALTÉA, une formation « bionettoyage en milieu hospitalier » choisie dans le cadre du plan de développement des compétences est une formation non obligatoire ; une formation à la conduite d'autolaveuse imposée pour des raisons de sécurité doit être analysée au cas par cas.</blockquote>

<h3>Entretien de parcours professionnel et entretien annuel d'évaluation : ne pas confondre</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Entretien de parcours professionnel</th><th>Entretien annuel d'évaluation</th></tr>
<tr><td>Fondement</td><td>Obligation légale (art. L6315-1)</td><td>Pratique de management, non obligatoire légalement (sauf accord collectif ou usage) ; encadrée par les art. L1222-2 à L1222-4</td></tr>
<tr><td>Objet</td><td>Perspectives d'évolution, qualification, emploi, formation, parcours</td><td>Bilan de l'année, atteinte des objectifs, évaluation des compétences, fixation d'objectifs</td></tr>
<tr><td>Périodicité</td><td>Première année, puis tous les 4 ans, état des lieux à 8 ans, mi-carrière, avant 60 ans, retours d'absence</td><td>En général annuelle</td></tr>
<tr><td>Évaluation du travail</td><td><strong>Exclue</strong></td><td>Au cœur de l'entretien</td></tr>
<tr><td>Sanction en cas d'absence</td><td>Abondement correctif de 3 000 € (≥ 50 salariés) ; risque contentieux</td><td>Pas de sanction légale spécifique</td></tr>
<tr><td>Document</td><td>Écrit obligatoire, copie remise au salarié</td><td>Compte rendu recommandé (preuve, traçabilité)</td></tr>
</table>
<p>Les deux entretiens peuvent être organisés le même jour, l'un après l'autre, à condition d'être <strong>clairement distincts</strong> : deux parties séparées, deux supports ou deux rubriques identifiées, et la partie « parcours professionnel » ne doit pas comporter d'évaluation. C'est une pratique fréquente qui limite la charge des managers ; elle exige des supports bien conçus (voir section 7.6).</p>

<h3>Information du salarié et preuve</h3>
<ul>
<li>À l'embauche : information écrite du droit à l'entretien de parcours professionnel (clause du contrat, livret d'accueil, courrier).</li>
<li>Avant l'entretien : convocation précisant la date, l'heure, le lieu ou le lien de visioconférence, l'objet de l'entretien, et transmission du document de préparation ; un délai raisonnable de préparation est une bonne pratique (8 à 15 jours).</li>
<li>Après l'entretien : document écrit signé (ou validé électroniquement dans le SIRH) par les deux parties, copie remise au salarié ; archivage dans le dossier du salarié ou le module entretiens du SIRH.</li>
<li>Tableau de suivi nominatif : date d'embauche, date du dernier entretien, date d'échéance, entretien réalisé ou non, formations suivies. C'est ce tableau qui permet de démontrer le respect de l'obligation lors de l'état des lieux.</li>
</ul>
<p><strong>Mise en pratique ALTÉA.</strong> Dans Lucca, Nathalie ROUSSEL vous demande de vérifier les 148 dossiers : pour chaque salarié, indiquez la date du dernier entretien professionnel, calculez la nouvelle date d'échéance à 4 ans à compter de ce dernier entretien, repérez les salariés embauchés depuis moins d'un an qui doivent bénéficier de leur premier entretien, ceux qui atteindront 45 ans ou entreront dans les deux années précédant leurs 60 ans en 2027, et les salariés de retour de congé parental ou de longue maladie. Formule Excel indicative pour l'échéance : =MOIS.DECALER(date_dernier_entretien;48).</p>
`
      },
      {
        title: "7.4 – L'entretien annuel d'évaluation : objectifs, critères objectifs et cadre juridique",
        content: `
<h3>Finalités de l'entretien annuel d'évaluation</h3>
<p>L'entretien annuel d'évaluation (EAE) est un échange formalisé entre le salarié et son responsable hiérarchique direct. Il permet de faire le <strong>bilan de l'année écoulée</strong> (missions, résultats, difficultés, compétences mises en œuvre), de <strong>fixer les objectifs</strong> de l'année à venir, d'identifier les <strong>besoins de développement</strong> et de renforcer le dialogue managérial. Il alimente des décisions RH (formation, mobilité, parfois rémunération variable ou promotion) : il doit donc reposer sur des critères objectifs et vérifiables.</p>

<h3>Le cadre juridique</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Règle</th><th>Contenu</th></tr>
<tr><td>Pouvoir de direction</td><td>L'employeur peut évaluer le travail de ses salariés ; la jurisprudence reconnaît ce droit, sous réserve du respect des règles ci-dessous</td></tr>
<tr><td>Art. L1222-2</td><td>Les informations demandées au salarié ne peuvent avoir comme finalité que d'apprécier ses aptitudes professionnelles et doivent présenter un lien direct et nécessaire avec cette évaluation ; le salarié est tenu d'y répondre de bonne foi</td></tr>
<tr><td>Art. L1222-3</td><td>Le salarié est expressément informé, préalablement à leur mise en œuvre, des méthodes et techniques d'évaluation professionnelles ; les résultats obtenus sont confidentiels ; les méthodes et techniques doivent être pertinentes au regard de la finalité poursuivie</td></tr>
<tr><td>Art. L1222-4</td><td>Aucune information concernant personnellement un salarié ne peut être collectée par un dispositif qui n'a pas été porté préalablement à sa connaissance</td></tr>
<tr><td>CSE (art. L2312-38 et consultations sur les conditions de travail)</td><td>Le CSE est informé et consulté, préalablement à la décision de mise en œuvre, sur les moyens ou techniques permettant un contrôle de l'activité des salariés ; la mise en place ou la modification substantielle d'un dispositif d'évaluation pouvant affecter les conditions de travail ou la santé (pression liée aux objectifs, critères comportementaux) relève aussi de sa consultation</td></tr>
<tr><td>Non-discrimination (art. L1132-1)</td><td>Aucune mesure en matière de formation, de promotion, de rémunération ou d'évaluation ne peut être fondée sur un critère discriminatoire (âge, sexe, état de santé, grossesse, activité syndicale…) ; l'exercice d'un mandat ou un congé (maternité, parental) ne doit pas pénaliser l'évaluation</td></tr>
<tr><td>Santé et dignité</td><td>Les méthodes d'évaluation ne doivent pas porter atteinte à la santé ou à la dignité ; la jurisprudence a sanctionné des systèmes de classement fondés sur des quotas forcés ou des critères comportementaux trop vagues</td></tr>
<tr><td>RGPD</td><td>Traitement de données personnelles : finalité déterminée, minimisation, information des salariés, durée de conservation limitée, sécurité et droit d'accès (le salarié peut obtenir communication des données le concernant, y compris ses évaluations)</td></tr>
</table>

<h3>Construire des objectifs et des critères objectifs</h3>
<p>Un objectif bien formulé est <strong>SMART</strong> : spécifique, mesurable, atteignable, réaliste (ou pertinent), temporellement défini. Les critères d'évaluation des compétences et comportements doivent être <strong>observables</strong> dans le travail, liés au poste (fiche de poste, référentiel), et illustrés par des faits.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Formulation à éviter</th><th>Pourquoi</th><th>Formulation correcte</th></tr>
<tr><td>« Être plus motivé »</td><td>Jugement subjectif, non mesurable</td><td>« Proposer au moins deux améliorations du protocole de nettoyage du site d'ici le 30 juin »</td></tr>
<tr><td>« Améliorer la qualité »</td><td>Pas de seuil ni d'échéance</td><td>« Atteindre 95 % de conformité aux contrôles qualité mensuels du site de la clinique sur le second semestre »</td></tr>
<tr><td>« Avoir un bon état d'esprit »</td><td>Critère de personnalité, risque discriminatoire</td><td>« Transmettre les consignes à l'équipe lors du briefing quotidien et vérifier leur application »</td></tr>
<tr><td>« Être disponible le soir »</td><td>Peut entrer en conflit avec la vie familiale, les horaires contractuels</td><td>« Respecter le planning contractuel et prévenir le planning au moins 48 h à l'avance en cas d'empêchement prévisible »</td></tr>
</table>
<h4>Échelle d'appréciation</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Niveau</th><th>Libellé</th><th>Repère</th></tr>
<tr><td>A</td><td>Dépasse les attentes</td><td>Objectif dépassé ou compétence exercée au-delà du niveau requis, de façon régulière</td></tr>
<tr><td>B</td><td>Atteint les attentes</td><td>Objectif atteint, compétence au niveau requis</td></tr>
<tr><td>C</td><td>Partiellement atteint</td><td>Résultat en progression, écart identifié, plan d'action à prévoir</td></tr>
<tr><td>D</td><td>Non atteint</td><td>Écart important ; causes à analyser (moyens, formation, organisation) avant toute conclusion</td></tr>
<tr><td>NE</td><td>Non évaluable</td><td>Absence prolongée, prise de poste récente, objectif devenu sans objet</td></tr>
</table>
<p>Une appréciation C ou D doit être <strong>étayée par des faits datés</strong> et accompagnée d'un plan d'action (formation, accompagnement, moyens). Un salarié absent une partie de l'année (congé de maternité, arrêt maladie) ne doit pas être pénalisé pour des objectifs qu'il n'a pas pu réaliser : les objectifs sont proratisés ou neutralisés (« NE »).</p>

<h3>Déroulé type d'un entretien annuel</h3>
<ol>
<li><strong>Accueil</strong> (5 min) : rappel de l'objet, de la durée, du déroulé et de la confidentialité.</li>
<li><strong>Bilan de l'année</strong> (15 à 20 min) : le salarié s'exprime d'abord (auto-évaluation), puis le manager ; faits marquants, réussites, difficultés.</li>
<li><strong>Évaluation des objectifs</strong> (10 à 15 min) : objectif par objectif, résultat constaté, appréciation, commentaires.</li>
<li><strong>Évaluation des compétences</strong> (10 min) : à partir du référentiel de l'emploi.</li>
<li><strong>Objectifs de l'année suivante</strong> (10 min) : 3 à 5 objectifs SMART et les moyens associés.</li>
<li><strong>Besoins de développement</strong> (5 min) : formation, accompagnement — à distinguer des souhaits d'évolution, qui relèvent de l'entretien de parcours professionnel.</li>
<li><strong>Conclusion</strong> (5 min) : synthèse, commentaires du salarié, signatures, remise d'une copie.</li>
</ol>
<blockquote><strong>ALTÉA SERVICES.</strong> Les entretiens annuels des 148 salariés sont conduits par les 10 chefs d'équipe (pour les agents), les 6 chefs de site (pour les chefs d'équipe et les machinistes) et la direction (pour les fonctions support). Le module « Entretiens » de Lucca héberge les formulaires ; les agents qui n'ont pas d'adresse électronique professionnelle reçoivent un support papier de préparation et signent le compte rendu sur tablette ou sur papier, numérisé ensuite par l'assistant RH. Le CSE a été informé et consulté sur la grille d'évaluation lors de sa mise en place.</blockquote>
<h3>Les dérives à prévenir</h3>
<ul>
<li><strong>Effet de halo</strong> : une qualité ou un défaut marquant contamine toute l'évaluation.</li>
<li><strong>Effet de récence</strong> : seuls les faits des dernières semaines sont pris en compte — d'où l'intérêt d'un carnet de faits tenu tout au long de l'année.</li>
<li><strong>Tendance centrale</strong> : tout le monde reçoit « B » pour éviter les discussions.</li>
<li><strong>Indulgence ou sévérité systématique</strong> selon les évaluateurs, qui rend les résultats incomparables entre équipes : l'assistant RH peut le repérer en comparant la distribution des appréciations par manager.</li>
<li><strong>Stéréotypes</strong> (âge, sexe, origine, temps partiel) : ils exposent à un risque de discrimination.</li>
</ul>
`
      },
      {
        title: "7.5 – Planifier et piloter la campagne d'entretiens : rétroplanning, convocations, relances, tableau de suivi",
        content: `
<h3>La campagne d'entretiens : un projet à piloter</h3>
<p>La campagne d'entretiens mobilise tous les managers et tous les salariés sur une période limitée. Le rôle de l'assistant RH est d'en garantir l'organisation : calendrier, supports, information, convocations, relances, collecte et contrôle des comptes rendus, indicateurs. Le REAC parle d'« établir un planning relatif aux différents entretiens » et de « planifier les opérations et en assurer le suivi » en « respectant les délais ».</p>

<h3>Le rétroplanning de la campagne ALTÉA 2027</h3>
<p>Le rétroplanning part de la date de fin imposée (ici, la remise des synthèses à la direction le 15 avril 2027, avant la préparation du plan de développement des compétences présenté au CSE) et remonte le temps tâche par tâche.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Semaine</th><th>Tâche</th><th>Responsable</th><th>Livrable</th></tr>
<tr><td>S-12 (début décembre 2026)</td><td>Bilan de la campagne précédente, mise à jour des supports selon la réforme de l'entretien de parcours professionnel, validation par la responsable RH</td><td>Assistant RH / N. ROUSSEL</td><td>Supports V2027</td></tr>
<tr><td>S-10</td><td>Extraction de la population concernée : échéances EPP (première année, 4 ans, état des lieux, mi-carrière, avant 60 ans, retours d'absence), population EAE</td><td>Assistant RH</td><td>Liste nominative contrôlée</td></tr>
<tr><td>S-9</td><td>Information-consultation du CSE si les supports ou méthodes d'évaluation changent ; information du CSE sur le calendrier</td><td>N. ROUSSEL</td><td>Ordre du jour, note d'information</td></tr>
<tr><td>S-8</td><td>Paramétrage de la campagne dans Lucca (formulaires, populations, évaluateurs, dates)</td><td>Assistant RH</td><td>Campagne paramétrée et testée</td></tr>
<tr><td>S-7</td><td>Réunion de lancement avec les managers + guide du manager ; session de formation de 2 h pour les nouveaux chefs d'équipe</td><td>N. ROUSSEL / assistant RH</td><td>Support de réunion, guide</td></tr>
<tr><td>S-6</td><td>Communication à tous les salariés (note, affichage sur sites, message dans l'application) ; envoi des documents de préparation</td><td>Assistant RH</td><td>Note d'information</td></tr>
<tr><td>S-6 à S-5</td><td>Les managers fixent les rendez-vous ; l'assistant RH contrôle que chaque salarié a une date</td><td>Managers</td><td>Planning des entretiens</td></tr>
<tr><td>S-5 à S-1 (6 semaines de mi-janvier à fin février)</td><td>Conduite des entretiens ; relances hebdomadaires ; traitement des cas particuliers (absences, refus de signer)</td><td>Managers / assistant RH</td><td>Comptes rendus signés</td></tr>
<tr><td>S+1 à S+2</td><td>Contrôle qualité des comptes rendus (complétude, signatures, absence de mentions inappropriées)</td><td>Assistant RH</td><td>Liste des anomalies corrigées</td></tr>
<tr><td>S+3 à S+5</td><td>Exploitation : synthèse des besoins de formation et souhaits d'évolution</td><td>Assistant RH</td><td>Synthèse et tableaux</td></tr>
<tr><td>S+6 (15 avril 2027)</td><td>Présentation à la direction ; intégration dans le projet de plan de développement des compétences</td><td>N. ROUSSEL</td><td>Note de synthèse</td></tr>
</table>
<p><strong>Calcul de la charge :</strong> 148 entretiens annuels × 1 h + environ 40 entretiens de parcours professionnel × 45 min (selon les échéances) = environ 178 heures d'entretiens réparties entre 17 évaluateurs, soit en moyenne 10 à 11 heures par manager sur 6 semaines. Les chefs d'équipe ayant chacun 8 à 15 agents, l'assistant RH vérifie qu'aucun n'a plus de 3 entretiens par jour et que les entretiens sont placés sur le temps de travail des agents (ceux qui travaillent en horaires décalés 6 h - 9 h ou 18 h - 21 h sont reçus sur ces plages ; le temps d'entretien est du temps de travail effectif).</p>

<h3>La convocation</h3>
<p><strong>Modèle de convocation à l'entretien de parcours professionnel</strong></p>
<blockquote>
<p>Objet : Votre entretien de parcours professionnel</p>
<p>Madame, Monsieur,</p>
<p>Conformément à l'article L6315-1 du Code du travail, nous vous proposons votre entretien de parcours professionnel le <strong>[date] à [heure]</strong>, [lieu ou lien de visioconférence], avec [nom et fonction de la personne qui conduira l'entretien]. Sa durée prévue est d'environ 45 minutes ; il se déroule sur votre temps de travail.</p>
<p>Cet entretien est consacré à vos perspectives d'évolution professionnelle, notamment en termes de qualification et d'emploi : vos compétences, votre parcours, vos souhaits d'évolution, vos besoins de formation. Il ne porte pas sur l'évaluation de votre travail. Vous y recevrez également des informations sur l'activation de votre compte personnel de formation, les abondements que l'entreprise peut financer et le conseil en évolution professionnelle.</p>
<p>Pour vous y préparer, vous trouverez ci-joint un document de préparation, que vous êtes libre de compléter ou non et qui reste votre propriété. Un compte rendu écrit sera établi à l'issue de l'entretien et une copie vous sera remise.</p>
<p>Si cette date ne vous convient pas, merci de contacter [nom, téléphone] avant le [date].</p>
<p>Le service des ressources humaines</p>
</blockquote>
<p>Pour l'entretien annuel d'évaluation, la convocation précise en plus les méthodes et critères d'évaluation (art. L1222-3) et joint la fiche de poste et les objectifs de l'année.</p>

<h3>Les relances</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Moment</th><th>Destinataire</th><th>Message</th></tr>
<tr><td>J+10 après le lancement</td><td>Managers n'ayant pas fixé tous leurs rendez-vous</td><td>Rappel courtois avec la liste nominative des salariés sans date</td></tr>
<tr><td>Chaque lundi pendant la campagne</td><td>Tous les managers</td><td>État d'avancement de leur équipe (réalisés / planifiés / non planifiés) et taux global</td></tr>
<tr><td>Mi-campagne</td><td>Responsable RH</td><td>Tableau des retards ; la responsable RH relance les managers concernés</td></tr>
<tr><td>J-7 avant la clôture</td><td>Managers et salariés n'ayant pas signé</td><td>Rappel de la date limite, procédure en cas de désaccord (commentaire du salarié)</td></tr>
</table>
<p>Un salarié n'est pas obligé de signer s'il est en désaccord : il peut ajouter ses commentaires. Le refus de signer est mentionné sur le compte rendu (« Le salarié n'a pas souhaité signer le compte rendu ») et une copie lui est remise contre récépissé ou par courrier, ce qui prouve que l'entretien a eu lieu. Pour un salarié absent pendant toute la campagne (arrêt maladie), l'entretien est reporté et l'échéance suivie dans le tableau.</p>

<h3>Le tableau de suivi de la campagne</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Matricule</th><th>Nom</th><th>Site</th><th>Évaluateur</th><th>Type(s) d'entretien</th><th>Date prévue</th><th>Date réalisée</th><th>CR signé</th><th>Besoin formation</th><th>Souhait mobilité</th><th>Statut</th></tr>
<tr><td>0142</td><td>Sandrine MOREAU</td><td>Clinique des Lilas</td><td>F. DIALLO</td><td>EAE + EPP (4 ans)</td><td>18/01/2027</td><td>18/01/2027</td><td>Oui</td><td>Bionettoyage</td><td>Chef d'équipe</td><td>Clos</td></tr>
<tr><td>0087</td><td>Rachid HAMOUDI</td><td>Tour Horizon</td><td>F. DIALLO</td><td>EAE + EPP mi-carrière</td><td>20/01/2027</td><td>—</td><td>—</td><td>—</td><td>—</td><td>Reporté (absence)</td></tr>
<tr><td>0203</td><td>Inès CARVALHO</td><td>Siège</td><td>N. ROUSSEL</td><td>EPP première année</td><td>25/01/2027</td><td>25/01/2027</td><td>Non (en attente)</td><td>Excel avancé</td><td>Non</td><td>Relance</td></tr>
</table>
<h4>Indicateurs de pilotage</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Formule</th><th>Exemple ALTÉA</th></tr>
<tr><td>Taux de planification</td><td>Entretiens planifiés / entretiens à réaliser × 100</td><td>171 / 188 = 91,0 %</td></tr>
<tr><td>Taux de réalisation</td><td>Entretiens réalisés / entretiens à réaliser × 100</td><td>179 / 188 = 95,2 % en fin de campagne</td></tr>
<tr><td>Taux de réalisation EPP dans les délais légaux</td><td>EPP réalisés avant l'échéance / EPP échus × 100</td><td>À viser : 100 %</td></tr>
<tr><td>Taux de comptes rendus signés</td><td>CR signés / entretiens réalisés × 100</td><td>174 / 179 = 97,2 %</td></tr>
<tr><td>Délai moyen de retour des CR</td><td>Somme des (date de retour − date d'entretien) / nombre de CR</td><td>4,3 jours</td></tr>
<tr><td>Taux d'expression d'un besoin de formation</td><td>Salariés exprimant au moins un besoin / entretiens réalisés × 100</td><td>À calculer lors de l'exploitation</td></tr>
</table>
<p>Ces indicateurs se construisent facilement dans Excel avec NB.SI.ENS (par exemple =NB.SI.ENS(Statut;"Clos";Site;"Clinique des Lilas")) et un tableau croisé dynamique par évaluateur. Ils sont présentés sans données individuelles au CSE.</p>
`
      },
      {
        title: "7.6 – Concevoir les supports, préparer et conduire un entretien avec neutralité",
        content: `
<h3>Les supports d'entretien : principes de conception</h3>
<p>Le REAC demande de « participer à l'élaboration des supports d'entretien ». Un bon support : suit le déroulé de l'entretien ; distingue nettement l'entretien de parcours professionnel et l'entretien d'évaluation ; utilise le vocabulaire du référentiel emplois-compétences ; prévoit des zones de commentaires pour le salarié ; ne collecte que des informations utiles (minimisation RGPD) ; ne comporte <strong>aucune rubrique sur la santé, la vie privée, la situation familiale, les opinions</strong> ; se termine par un espace de signatures et la mention de la remise d'une copie.</p>

<h3>Modèle 1 – Document de préparation remis au salarié (entretien de parcours professionnel)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th colspan="2">ALTÉA SERVICES – Préparer mon entretien de parcours professionnel (document personnel, non transmis sauf si vous le souhaitez)</th></tr>
<tr><td>Mon parcours</td><td>Quels postes ai-je occupés, dans l'entreprise et avant ? Quelles formations ai-je suivies depuis mon dernier entretien ? Quels diplômes, titres ou certificats ai-je obtenus ?</td></tr>
<tr><td>Mes compétences</td><td>Ce que je sais bien faire dans mon emploi ; ce que je fais en plus de ma fiche de poste ; ce qui m'est plus difficile</td></tr>
<tr><td>Mon emploi aujourd'hui</td><td>Ce qui a changé dans mon travail (matériel, sites, méthodes) ; ce qui pourrait encore changer</td></tr>
<tr><td>Mes souhaits</td><td>Rester dans mon emploi en me perfectionnant ; évoluer vers un autre emploi (lequel ?) ; changer de site ou d'horaires ; me reconvertir ; autre projet</td></tr>
<tr><td>Mes besoins</td><td>Formations, accompagnement, information sur un dispositif (CPF, VAE, bilan de compétences, conseil en évolution professionnelle, période de reconversion)</td></tr>
<tr><td>Mes questions</td><td>Ce que je veux demander pendant l'entretien</td></tr>
</table>

<h3>Modèle 2 – Compte rendu d'entretien de parcours professionnel</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th colspan="2">ALTÉA SERVICES – Compte rendu d'entretien de parcours professionnel (art. L6315-1 du Code du travail)</th></tr>
<tr><td>Salarié</td><td>Nom, prénom, matricule, emploi, site, date d'entrée</td></tr>
<tr><td>Entretien conduit par</td><td>Nom, fonction</td></tr>
<tr><td>Date et type</td><td>☐ Première année suivant l'embauche ☐ Périodique (4 ans) ☐ État des lieux récapitulatif ☐ Mi-carrière ☐ Avant 60 ans ☐ Retour d'absence (préciser le congé)</td></tr>
<tr><td>1. Parcours depuis le dernier entretien</td><td>Postes occupés, formations suivies (intitulé, date, durée), certifications obtenues, évolutions de classification ou de rémunération</td></tr>
<tr><td>2. Compétences et qualifications</td><td>Compétences mobilisées dans l'emploi, compétences à développer, évolution possible des qualifications</td></tr>
<tr><td>3. Évolution de l'emploi et perspectives dans l'entreprise</td><td>Évolutions prévisibles du métier (informations données par le manager)</td></tr>
<tr><td>4. Souhaits d'évolution du salarié</td><td>☐ Maintien et perfectionnement dans l'emploi ☐ Évolution interne vers : … ☐ Mobilité géographique ☐ Reconversion ☐ Projet externe ☐ Pas de souhait exprimé — Commentaire libre</td></tr>
<tr><td>5. Besoins de formation identifiés</td><td>Intitulé, objectif, priorité (1 à 3), modalité envisagée (plan de développement des compétences, CPF, VAE, période de reconversion)</td></tr>
<tr><td>6. Information délivrée</td><td>☐ Activation du CPF (moncompteformation.gouv.fr) ☐ Abondements que l'employeur est susceptible de financer ☐ Conseil en évolution professionnelle (opérateurs, gratuité) ☐ VAE ☐ Bilan de compétences ☐ Projet de transition professionnelle</td></tr>
<tr><td>7. Suites envisagées</td><td>Actions, responsable, échéance</td></tr>
<tr><td>8. État des lieux (le cas échéant)</td><td>Entretiens réalisés sur la période (dates) ; actions de formation suivies ; conclusion : obligations remplies ☐ oui ☐ non → abondement correctif à verser (entreprise ≥ 50 salariés)</td></tr>
<tr><td>Commentaires du salarié</td><td>Zone libre</td></tr>
<tr><td>Signatures</td><td>Salarié / responsable de l'entretien — Une copie a été remise au salarié le …</td></tr>
</table>

<h3>Modèle 3 – Compte rendu d'entretien annuel d'évaluation (extrait)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Objectif N</th><th>Indicateur</th><th>Résultat constaté</th><th>Appréciation (A/B/C/D/NE)</th><th>Commentaire du manager</th><th>Commentaire du salarié</th></tr>
<tr><td>Atteindre 95 % de conformité aux contrôles qualité sur le site</td><td>Moyenne des contrôles mensuels</td><td>96,4 %</td><td>A</td><td>Résultat régulier sur 10 mois</td><td></td></tr>
<tr><td>Former les 2 nouveaux agents aux protocoles du bloc opératoire</td><td>Grille de validation signée</td><td>1 sur 2 (second agent arrivé en novembre)</td><td>B</td><td>Formation en cours, pas d'écart imputable</td><td></td></tr>
</table>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Compétence (référentiel)</th><th>Niveau requis</th><th>Niveau constaté</th><th>Faits observés</th></tr>
<tr><td>Organiser le travail de l'équipe et gérer les remplacements</td><td>3</td><td>3</td><td>Aucune zone non traitée malgré 14 absences remplacées</td></tr>
<tr><td>Renseigner les documents de traçabilité</td><td>3</td><td>2</td><td>Feuilles de traçabilité incomplètes à deux reprises (mars, septembre)</td></tr>
</table>
<p>Suivent : objectifs N+1 (3 à 5, SMART, avec moyens), besoins de développement, commentaires généraux, signatures.</p>

<h3>Préparer un entretien</h3>
<p>Selon sa délégation, l'assistant RH peut conduire lui-même certains entretiens de parcours professionnel (salariés des fonctions support, retours de congé), ou préparer ceux des managers. Check-list de préparation :</p>
<ul>
<li>relire le dossier : fiche de poste, compte rendu du dernier entretien, formations suivies (historique du plan et du CPF déclaré), demandes antérieures ;</li>
<li>vérifier le type d'entretien et les obligations associées (état des lieux, mi-carrière) ;</li>
<li>réunir l'information sur les évolutions des emplois et les postes ouverts en interne ;</li>
<li>préparer la documentation sur les dispositifs (CPF, CEP, VAE, bilan de compétences, période de reconversion, PTP) ;</li>
<li>réserver un lieu calme et confidentiel (pas de bureau vitré ouvert, pas d'interruptions, téléphone en silencieux) ou un lien de visioconférence sécurisé ;</li>
<li>prévoir le temps : 45 min à 1 h, plus 15 min de rédaction.</li>
</ul>

<h3>Conduire l'entretien : posture et techniques</h3>
<p>Le REAC attend de l'assistant RH qu'il fasse « preuve de neutralité, de souplesse et de rigueur dans les échanges » et qu'il sache « faciliter l'expression des besoins des collaborateurs ».</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Technique</th><th>Définition</th><th>Exemple</th></tr>
<tr><td>Question ouverte</td><td>Laisse la personne s'exprimer librement</td><td>« Comment voyez-vous votre travail évoluer dans les prochaines années ? »</td></tr>
<tr><td>Question fermée</td><td>Appelle une réponse courte ; utile pour vérifier une information</td><td>« Avez-vous déjà utilisé votre CPF ? »</td></tr>
<tr><td>Question de relance</td><td>Approfondit une réponse</td><td>« Qu'est-ce qui vous attire dans le poste de chef d'équipe ? »</td></tr>
<tr><td>Reformulation-reflet</td><td>Reprendre avec ses mots ce que la personne a dit pour vérifier la compréhension</td><td>« Si je vous comprends bien, vous aimeriez encadrer une équipe mais vous craignez les horaires du matin ? »</td></tr>
<tr><td>Reformulation-synthèse</td><td>Résumer plusieurs éléments avant de passer à la suite</td><td>« Nous avons vu trois points : votre intérêt pour les machines, la formation au CACES souhaitée, et un souhait de rester sur le Val-de-Marne. »</td></tr>
<tr><td>Silence</td><td>Laisser le temps de réfléchir</td><td>Attendre quelques secondes après une question importante</td></tr>
<tr><td>Écoute active</td><td>Signes d'attention verbaux et non verbaux, prise de notes discrète</td><td>Regard, hochements de tête, « d'accord », « je vois »</td></tr>
</table>
<h4>Ce qu'il faut éviter</h4>
<ul>
<li>Juger, conseiller trop vite ou orienter les réponses (« Vous ne pensez pas que ce serait mieux de… ? »).</li>
<li>Promettre une formation, une promotion ou une augmentation : l'entretien recueille des souhaits ; la décision appartient à l'entreprise, après arbitrage. Formule adaptée : « Je note votre souhait ; il sera étudié lors de la préparation du plan de développement des compétences, et vous aurez une réponse d'ici juin. »</li>
<li>Poser des questions sur la vie privée, la santé, les projets familiaux, l'âge de départ en retraite envisagé de manière intrusive. À l'entretien précédant les 60 ans, les possibilités d'aménagement de fin de carrière sont présentées, le salarié reste libre de s'exprimer.</li>
<li>Mélanger évaluation et parcours dans l'entretien de parcours professionnel.</li>
<li>Rédiger des appréciations sur la personnalité (« caractère difficile ») plutôt que des faits.</li>
</ul>
<h4>Gérer les situations délicates</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Attitude recommandée</th></tr>
<tr><td>Le salarié n'exprime aucun souhait</td><td>Le respecter, proposer des pistes concrètes (exemples d'évolutions, information CPF), noter « pas de souhait exprimé à ce jour »</td></tr>
<tr><td>Le salarié évoque un problème de santé</td><td>Ne pas l'inscrire dans le compte rendu ; l'orienter vers le service de prévention et de santé au travail (visite à la demande du salarié)</td></tr>
<tr><td>Le salarié exprime un conflit avec son manager</td><td>Écouter, ne pas prendre parti, proposer d'en parler à la responsable RH ; si des faits de harcèlement sont évoqués, alerter immédiatement la responsable RH selon la procédure interne</td></tr>
<tr><td>Le salarié est en colère contre l'entreprise</td><td>Laisser s'exprimer, reformuler, recentrer sur l'objet de l'entretien, proposer un autre échange si nécessaire</td></tr>
<tr><td>Barrière de la langue (fréquent dans la propreté)</td><td>Phrases courtes, supports illustrés, possibilité d'être accompagné d'un collègue interprète choisi par le salarié avec son accord, vérification de la compréhension par la reformulation</td></tr>
</table>
`
      },
      {
        title: "7.7 – Exploiter les entretiens : synthèse, plan de développement des compétences, mobilité, transitions professionnelles, seniors et handicap",
        content: `
<h3>De l'entretien individuel à la décision collective</h3>
<p>Le critère de performance « les entretiens sont exploités en fonction des objectifs donnés » signifie que l'assistant RH doit transformer des dizaines de comptes rendus en <strong>informations utiles à la décision</strong>. La méthode :</p>
<ol>
<li><strong>Clarifier l'objectif de l'exploitation</strong> fixé par la responsable RH (ex. : préparer le plan de développement des compétences 2027 ; identifier des successeurs aux chefs d'équipe ; repérer les salariés exposés à l'usure professionnelle).</li>
<li><strong>Extraire</strong> les données des comptes rendus (export Lucca) dans un tableau : une ligne par salarié, une colonne par information codifiée.</li>
<li><strong>Codifier</strong> les réponses libres en catégories homogènes (ex. « formation autolaveuse », « CACES » et « conduite machine » → « Mécanisation – conduite d'engins de nettoyage »).</li>
<li><strong>Contrôler</strong> la fiabilité : doublons, comptes rendus manquants, incohérences (souhait de formation non mentionné dans la rubrique formation).</li>
<li><strong>Analyser</strong> : fréquences, croisements (par emploi, par site, par tranche d'âge, par sexe), comparaison avec les besoins de l'entreprise (GEPP).</li>
<li><strong>Restituer</strong> : note de synthèse avec tableaux agrégés, constats, propositions d'actions priorisées et chiffrées.</li>
</ol>

<h3>Exemple de synthèse ALTÉA – campagne 2027 (179 entretiens réalisés)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Besoin de formation exprimé (catégorie)</th><th>Nombre de salariés</th><th>Dont demandés par le manager</th><th>Lien avec les orientations GEPP</th><th>Priorité proposée</th></tr>
<tr><td>Bionettoyage en milieu hospitalier</td><td>34</td><td>30</td><td>Reprise des marchés hospitaliers</td><td>1</td></tr>
<tr><td>Conduite d'autolaveuse autoportée</td><td>19</td><td>8</td><td>Mécanisation</td><td>1</td></tr>
<tr><td>Management d'équipe / fonction de chef d'équipe</td><td>11</td><td>4</td><td>Remplacement de 3 chefs d'équipe</td><td>1</td></tr>
<tr><td>Français à visée professionnelle (lecture des protocoles)</td><td>15</td><td>12</td><td>Sécurité et qualité</td><td>2</td></tr>
<tr><td>Gestes et postures / prévention des TMS</td><td>22</td><td>18</td><td>Usure professionnelle</td><td>2</td></tr>
<tr><td>Bureautique (Excel)</td><td>6</td><td>2</td><td>Fonctions support</td><td>3</td></tr>
</table>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Souhait d'évolution</th><th>Nombre</th><th>%</th></tr>
<tr><td>Maintien et perfectionnement dans l'emploi</td><td>121</td><td>67,6 %</td></tr>
<tr><td>Évolution vers chef d'équipe</td><td>11</td><td>6,1 %</td></tr>
<tr><td>Évolution vers agent machiniste</td><td>14</td><td>7,8 %</td></tr>
<tr><td>Changement de site ou d'horaires</td><td>17</td><td>9,5 %</td></tr>
<tr><td>Reconversion / projet externe</td><td>7</td><td>3,9 %</td></tr>
<tr><td>Pas de souhait exprimé</td><td>9</td><td>5,0 %</td></tr>
<tr><td><strong>Total</strong></td><td><strong>179</strong></td><td><strong>100 %</strong></td></tr>
</table>
<p>Les tableaux diffusés à la direction ou au CSE sont <strong>agrégés</strong>. Lorsqu'un effectif est très faible (par exemple 2 personnes dans une catégorie sur un petit site), le croisement peut permettre d'identifier les personnes : on regroupe alors les catégories. Les listes nominatives ne sont communiquées qu'aux personnes qui en ont besoin pour agir (responsable RH, manager concerné pour son équipe).</p>

<h3>Alimenter le plan de développement des compétences</h3>
<p>Le plan de développement des compétences (PDC) regroupe les actions de formation décidées par l'employeur (voir CP6). L'exploitation des entretiens fournit sa matière première : pour chaque besoin retenu, l'assistant RH prépare une fiche « action » (objectif, public, effectif, durée, modalité, organisme ou formation interne, coût estimé, financement possible, période). Les demandes non retenues reçoivent une réponse motivée, et le salarié est informé des autres voies possibles (CPF, CEP, VAE). Rappel : le CSE est consulté sur la politique sociale, qui inclut la formation et le plan de développement des compétences (dans les entreprises d'au moins 50 salariés).</p>

<h3>Mobilité interne et promotion</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type de mobilité</th><th>Exemple ALTÉA</th><th>Point de vigilance juridique</th></tr>
<tr><td>Horizontale (même niveau, autre emploi)</td><td>Agent de propreté → agent d'accueil</td><td>Changement des fonctions : vérifier s'il s'agit d'un simple changement des conditions de travail ou d'une modification du contrat (accord écrit, avenant)</td></tr>
<tr><td>Verticale (promotion)</td><td>Agent machiniste → chef d'équipe</td><td>Avenant (classification, rémunération, fonctions) ; une période probatoire peut être prévue, distincte de la période d'essai, avec retour au poste antérieur si elle n'est pas concluante</td></tr>
<tr><td>Géographique</td><td>Changement de site dans le Val-de-Marne</td><td>Clause de mobilité éventuelle (zone géographique précise) ; dans la propreté, la mutation de site est fréquente : analyser le contrat et la convention collective</td></tr>
<tr><td>Changement d'horaires</td><td>Passage d'un poste du matin à un poste de journée</td><td>Passage jour/nuit ou modification de la répartition pour un temps partiel : règles spécifiques ; demander conseil à la responsable RH</td></tr>
</table>
<p><strong>Procédure de mobilité interne (bourse de l'emploi) :</strong> publication interne des postes vacants avant ou en même temps que la diffusion externe ; candidature du salarié (information du manager selon la procédure interne) ; entretien avec le manager recruteur et le RH ; réponse motivée ; si acceptation, avenant au contrat, plan d'intégration dans le nouveau poste et formation d'adaptation ; mise à jour du SIRH, de la fiche de poste et des organigrammes.</p>

<h3>Les transitions professionnelles : les dispositifs à présenter</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Dispositif</th><th>Principe</th><th>Points clés</th></tr>
<tr><td>Conseil en évolution professionnelle (CEP) – art. L6111-6</td><td>Accompagnement gratuit et confidentiel pour faire le point sur sa situation et construire un projet</td><td>Opérateurs : France Travail, APEC (cadres), Cap emploi (personnes en situation de handicap), missions locales (jeunes) ; pour les salariés du privé, opérateurs régionaux sélectionnés par France compétences. L'employeur n'est pas informé de la démarche du salarié</td></tr>
<tr><td>Projet de transition professionnelle (PTP) – art. L6323-17-1 et suivants</td><td>Formation certifiante pour changer de métier, avec maintien de la rémunération selon les règles fixées, financée par l'association Transitions Pro de la région (ATpro)</td><td>Condition d'ancienneté (en principe 24 mois d'activité salariée dont 12 dans l'entreprise, avec des exceptions) ; demande d'autorisation d'absence à l'employeur dans des délais fixés selon la durée de la formation ; l'employeur peut reporter mais pas refuser si les conditions sont remplies ; positionnement préalable obligatoire</td></tr>
<tr><td>Bilan de compétences – art. L6313-4</td><td>Analyser ses compétences, aptitudes et motivations pour définir un projet professionnel</td><td>Trois phases (préliminaire, investigation, conclusion) ; résultats destinés au seul bénéficiaire ; finançable par le CPF ou par l'employeur (plan, avec l'accord du salarié) ; organisme certifié Qualiopi</td></tr>
<tr><td>Validation des acquis de l'expérience (VAE)</td><td>Obtenir tout ou partie d'une certification enregistrée au RNCP grâce à l'expérience</td><td>Réformée par la loi du 21 décembre 2022 (service public France VAE, accompagnement) ; congé VAE pour se présenter aux épreuves et suivre l'accompagnement, dans la limite fixée par le Code du travail (48 heures depuis la réforme, à vérifier) ; financement CPF, OPCO, employeur</td></tr>
<tr><td>Période de reconversion (depuis le 1er février 2026)</td><td>Créée par la loi du 24 octobre 2025, elle <strong>remplace la reconversion ou promotion par alternance (Pro-A) et les Transitions collectives</strong></td><td>Ouverte à tous les salariés ; formation qualifiante (certification RNCP ou certificat de qualification professionnelle) d'une durée d'au moins 150 heures et dans la limite de 450 heures sur 12 mois selon les sources consultées ; mobilité interne ou externe (contrat suspendu auprès d'une entreprise d'accueil) ; accord écrit employeur-salarié ; financement par l'OPCO selon les niveaux fixés par la branche ou par décret. Les modalités précises sont à vérifier auprès de l'OPCO et dans les décrets de janvier 2026</td></tr>
<tr><td>CPF</td><td>Droits individuels en euros (500 € par an, plafond 5 000 € ; 800 € et 8 000 € pour les salariés peu qualifiés ou bénéficiaires de l'obligation d'emploi)</td><td>Mobilisable hors temps de travail sans accord de l'employeur ; sur le temps de travail avec accord ; participation forfaitaire du titulaire depuis le 2 mai 2024 (montant revalorisé annuellement, à vérifier sur service-public.fr ; exonérations notamment en cas d'abondement de l'employeur et pour les demandeurs d'emploi). Un apprenti acquiert des droits mais sa formation d'apprentissage est financée par l'OPCO, pas par le CPF</td></tr>
</table>
<blockquote><strong>Pro-A : un exemple de veille.</strong> Jusqu'au 31 janvier 2026, la reconversion ou promotion par alternance (Pro-A) permettait à des salariés en CDI dont la qualification était inférieure à la licence de suivre une formation en alternance financée par l'OPCO. Depuis le 1er février 2026, elle est remplacée par la période de reconversion, plus largement ouverte. Les dossiers Pro-A engagés avant cette date suivent les règles transitoires fixées par les textes : renseignez-vous auprès de l'OPCO.</blockquote>

<h3>Les salariés expérimentés (seniors)</h3>
<p>La loi du 24 octobre 2025 a renforcé la prise en compte de l'emploi des salariés expérimentés : intégration de leur emploi et de leurs conditions de travail dans la négociation GEPP des entreprises d'au moins 300 salariés, entretien de mi-carrière et entretien précédant les 60 ans, mesures sur la retraite progressive et le temps partiel de fin de carrière, création d'un contrat de valorisation de l'expérience à titre expérimental pour l'embauche de demandeurs d'emploi âgés (conditions à vérifier sur travail-emploi.gouv.fr). Pour l'assistant RH, cela se traduit par :</p>
<ul>
<li>des indicateurs de suivi (part des 55 ans et plus dans l'effectif, dans les recrutements, dans les formations) ;</li>
<li>une attention à la <strong>non-discrimination liée à l'âge</strong> dans l'accès à la formation et à la mobilité ;</li>
<li>la valorisation de la transmission des savoirs (tutorat, binômes intergénérationnels) ;</li>
<li>l'information sur les dispositifs de fin de carrière (retraite progressive, temps partiel), sans pression sur la décision de départ ;</li>
<li>la prévention de l'usure professionnelle, en lien avec le service de prévention et de santé au travail.</li>
</ul>

<h3>Les salariés en situation de handicap : RQTH et maintien dans l'emploi</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Notion</th><th>Contenu</th></tr>
<tr><td>Obligation d'emploi des travailleurs handicapés (OETH)</td><td>Toute entreprise d'au moins 20 salariés doit employer des bénéficiaires de l'obligation d'emploi dans la proportion de 6 % de son effectif ; déclaration annuelle via la DSN ; à défaut, contribution versée à l'Urssaf (art. L5212-1 et suivants)</td></tr>
<tr><td>Bénéficiaires</td><td>Notamment les titulaires de la reconnaissance de la qualité de travailleur handicapé (RQTH) délivrée par la MDPH, les titulaires d'une pension d'invalidité, d'une rente AT/MP avec incapacité d'au moins 10 %, de la carte mobilité inclusion mention invalidité, de l'allocation aux adultes handicapés (liste de l'art. L5212-13)</td></tr>
<tr><td>Confidentialité</td><td>Le salarié n'est jamais obligé de déclarer sa RQTH ; il choisit de la transmettre pour bénéficier d'aménagements ; l'information est conservée de façon confidentielle et ne figure pas dans les comptes rendus d'entretien</td></tr>
<tr><td>Mesures appropriées (art. L5213-6)</td><td>L'employeur prend les mesures appropriées pour permettre au travailleur handicapé d'accéder à un emploi, de le conserver, d'y progresser et d'accéder à la formation ; le refus de prendre ces mesures peut constituer une discrimination</td></tr>
<tr><td>Référent handicap</td><td>Obligatoire dans les entreprises d'au moins 250 salariés (art. L5213-6-1) ; recommandé en dessous</td></tr>
<tr><td>Acteurs du maintien dans l'emploi</td><td>Médecin du travail et service de prévention et de santé au travail (cellule de prévention de la désinsertion professionnelle), Cap emploi, Agefiph (aides financières, études d'aménagement), Assurance maladie, MDPH</td></tr>
<tr><td>Outils</td><td>Visite de pré-reprise (pour un arrêt de plus de 30 jours, à l'initiative notamment du salarié ou du médecin traitant), rendez-vous de liaison pendant l'arrêt, essai encadré, convention de rééducation professionnelle en entreprise, aménagement de poste et d'horaires, temps partiel thérapeutique</td></tr>
</table>
<p><strong>ALTÉA :</strong> un agent de propreté de 52 ans, titulaire d'une RQTH à la suite de troubles musculo-squelettiques, exprime lors de son entretien un souhait d'évolution vers le contrôle qualité. L'assistant RH ne note pas l'origine médicale dans le compte rendu ; il signale à la responsable RH la piste de mobilité et l'intérêt d'une étude d'aménagement avec le médecin du travail et Cap emploi.</p>
`
      },
      {
        title: "7.8 – Communiquer en interne et en externe, respecter la confidentialité et le RGPD",
        content: `
<h3>La communication interne</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Cible</th><th>Objectif</th><th>Supports</th><th>Ce qui est diffusé / ce qui ne l'est pas</th></tr>
<tr><td>Managers</td><td>Les mettre en capacité de conduire les entretiens et d'agir</td><td>Réunion de lancement, guide du manager, mémo sur la réforme EPP, tableaux de suivi de leur équipe</td><td>Diffusé : planning, avancement, synthèse de leur équipe ; non diffusé : comptes rendus d'autres équipes</td></tr>
<tr><td>Salariés</td><td>Informer de leurs droits, les inciter à préparer leur entretien</td><td>Note d'information, affichage sur les sites, message SIRH, document de préparation, FAQ</td><td>Diffusé : objet, calendrier, droits (CPF, CEP) ; non diffusé : toute donnée individuelle d'un autre salarié</td></tr>
<tr><td>CSE</td><td>Information et consultation (orientations stratégiques, politique sociale, méthodes d'évaluation)</td><td>BDESE, note de présentation, tableaux agrégés</td><td>Diffusé : données agrégées, anonymisées, indicateurs ; non diffusé : données nominatives</td></tr>
<tr><td>Direction</td><td>Décider</td><td>Note de synthèse, indicateurs, propositions chiffrées</td><td>Diffusé : synthèses et listes nominatives limitées au besoin d'agir (ex. candidats internes au poste de chef d'équipe)</td></tr>
</table>
<p><strong>Modèle de note d'information aux salariés</strong></p>
<blockquote>
<p>ALTÉA SERVICES – Note d'information RH n° 2027-02 – Campagne d'entretiens 2027</p>
<p>Du 18 janvier au 26 février 2027, chaque salarié sera reçu par son responsable pour son entretien annuel. Certains d'entre vous bénéficieront également de leur entretien de parcours professionnel, qui a remplacé l'entretien professionnel depuis la loi du 24 octobre 2025 : il est consacré à votre parcours, à vos compétences, à vos souhaits d'évolution et à vos besoins de formation, et ne porte pas sur l'évaluation de votre travail.</p>
<p>Votre responsable vous proposera une date. Les entretiens ont lieu sur le temps de travail. Un document de préparation vous sera remis ; un compte rendu écrit sera établi et vous en recevrez une copie.</p>
<p>Vos informations sont traitées de manière confidentielle par votre responsable et le service RH, dans le seul but de gérer votre parcours professionnel et votre formation. Elles sont conservées pendant la durée de votre contrat, puis archivées selon les durées légales. Vous pouvez y accéder et les faire rectifier en vous adressant au service RH ([contact]).</p>
<p>Questions : service RH, [téléphone, e-mail].</p>
</blockquote>

<h3>La communication externe</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Interlocuteur</th><th>Objet des échanges</th><th>Rôle de l'assistant RH</th></tr>
<tr><td>OPCO de la branche (pour la propreté : AKTO, à vérifier selon l'adhésion effective de l'entreprise)</td><td>Information sur les financements (plan de développement des compétences pour les entreprises de moins de 50 salariés, alternance, période de reconversion), appui technique (diagnostic RH, accompagnement GEPP pour les TPE-PME selon les offres de l'OPCO)</td><td>Prise de contact avec le conseiller, constitution des dossiers de demande de prise en charge, suivi des accords et des factures</td></tr>
<tr><td>Cabinet conseil</td><td>Accompagnement d'une démarche GEPP, construction d'un référentiel, formation des managers aux entretiens</td><td>Préparation du cahier des charges, transmission des données nécessaires (dans le cadre d'un contrat de sous-traitance conforme au RGPD, art. 28), organisation des réunions</td></tr>
<tr><td>Opérateurs du CEP, Transitions Pro, France VAE</td><td>Information des salariés sur les dispositifs</td><td>Diffusion des coordonnées, documentation ; le salarié reste seul maître de sa démarche</td></tr>
<tr><td>Service de prévention et de santé au travail, Cap emploi, Agefiph</td><td>Maintien dans l'emploi, aménagements</td><td>Mise en relation, constitution de dossiers d'aides, suivi</td></tr>
</table>
<p><strong>Modèle de courriel au conseiller OPCO</strong></p>
<blockquote>
<p>Objet : ALTÉA SERVICES (SIRET [n°], IDCC 3043) – Demande d'information sur le financement d'une période de reconversion et d'actions de formation</p>
<p>Madame, Monsieur,</p>
<p>Dans le cadre de notre démarche de gestion des emplois et des parcours professionnels, nous envisageons en 2027 : la formation de 6 agents de propreté à la fonction de chef d'équipe, dont 2 pourraient s'inscrire dans une période de reconversion visant un certificat de qualification professionnelle de la branche ; la formation de 19 salariés à la conduite d'autolaveuses autoportées.</p>
<p>Pourriez-vous nous indiquer les conditions et niveaux de prise en charge applicables, les pièces à fournir et les délais de dépôt ? Nous serions également intéressés par un rendez-vous pour présenter notre projet.</p>
<p>Je vous remercie par avance. Bien cordialement,</p>
<p>[Prénom NOM], assistant(e) ressources humaines, ALTÉA SERVICES, [téléphone]</p>
</blockquote>

<h3>Confidentialité</h3>
<ul>
<li>Les résultats des évaluations sont confidentiels (art. L1222-3) : accès limité au salarié, à son manager, au service RH et, le cas échéant, au N+2.</li>
<li>Les comptes rendus sont stockés dans le module SIRH à droits d'accès paramétrés, ou dans une armoire fermée à clé pour les originaux papier.</li>
<li>Aucune transmission par messagerie personnelle, aucun fichier nominatif sur une clé USB non chiffrée, aucun document laissé sur l'imprimante partagée.</li>
<li>L'assistant RH, qui a accès à des informations sensibles, est tenu à la discrétion (clause de confidentialité, charte informatique).</li>
</ul>

<h3>Le RGPD appliqué aux entretiens</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Principe (règlement (UE) 2016/679)</th><th>Application aux entretiens</th></tr>
<tr><td>Licéité et finalité déterminée</td><td>Finalités : gestion des carrières, de la formation, respect de l'obligation légale d'entretien de parcours professionnel (base légale : obligation légale) ; évaluation professionnelle (base : intérêt légitime ou exécution du contrat). Inscription au registre des activités de traitement</td></tr>
<tr><td>Minimisation</td><td>Seules les données utiles : pas de santé, de vie familiale, d'opinions, d'appartenance syndicale</td></tr>
<tr><td>Transparence</td><td>Information des salariés (note d'information, mention dans le support) sur les finalités, destinataires, durée de conservation, droits</td></tr>
<tr><td>Exactitude</td><td>Le salarié peut commenter et demander la rectification de données inexactes (pas de modification d'une appréciation managériale, mais ajout de ses observations)</td></tr>
<tr><td>Limitation de la conservation</td><td>Données de carrière conservées pendant la relation de travail ; après le départ, archivage intermédiaire selon les durées de prescription (la CNIL recommande de définir des durées précises ; les documents d'entretien de parcours professionnel servent de preuve en cas de contrôle de l'abondement correctif)</td></tr>
<tr><td>Sécurité</td><td>Droits d'accès, mots de passe, journalisation, sous-traitant SIRH lié par contrat (art. 28)</td></tr>
<tr><td>Droits des personnes</td><td>Accès (communication du compte rendu et des données d'évaluation), rectification, limitation ; délai de réponse d'un mois</td></tr>
<tr><td>Décision automatisée</td><td>Une évaluation ne peut pas reposer exclusivement sur un traitement automatisé (art. 22) ; attention aux outils de notation algorithmique</td></tr>
</table>
<blockquote><strong>Point de vigilance.</strong> Les commentaires rédigés par les managers sont des données personnelles communicables au salarié qui exerce son droit d'accès. Règle simple à transmettre aux managers : « n'écrivez rien que vous ne pourriez pas montrer au salarié ».</blockquote>
`
      },
      {
        title: "7.9 – Quiz du chapitre",
        content: `
<h3>Questions</h3>
<ol>
<li>Depuis la loi du 24 octobre 2025, quelle est la périodicité de droit commun de l'entretien de parcours professionnel ?<br/>a) Tous les ans — b) Tous les 2 ans — c) Tous les 4 ans — d) Tous les 6 ans</li>
<li>Quand doit avoir lieu le premier entretien de parcours professionnel d'un salarié nouvellement embauché ?<br/>a) Avant la fin de la période d'essai — b) Au cours de la première année suivant l'embauche — c) Au bout de 2 ans — d) Seulement s'il le demande</li>
<li>L'abondement correctif de 3 000 € sur le CPF concerne :<br/>a) Toutes les entreprises — b) Les entreprises d'au moins 11 salariés — c) Les entreprises d'au moins 50 salariés — d) Les entreprises d'au moins 300 salariés</li>
<li>La négociation obligatoire sur la GEPP s'impose :<br/>a) Dans toute entreprise dotée d'un CSE — b) Dans les entreprises et groupes d'au moins 300 salariés — c) Dans les entreprises d'au moins 1 000 salariés — d) Uniquement en cas de licenciement économique</li>
<li>Lequel de ces éléments ne doit pas figurer dans l'entretien de parcours professionnel ?<br/>a) Les besoins de formation — b) L'évaluation des résultats de l'année — c) L'information sur le CEP — d) Les souhaits de mobilité</li>
<li>Un salarié revient d'un congé parental d'éducation ; il a eu un entretien de parcours professionnel 8 mois avant sa reprise. L'employeur :<br/>a) Doit obligatoirement lui proposer un nouvel entretien — b) N'est pas tenu de lui en proposer un nouveau — c) Doit attendre 4 ans — d) Doit organiser un état des lieux</li>
<li>Selon l'article L1222-3, les méthodes d'évaluation professionnelle :<br/>a) Sont libres et secrètes — b) Doivent être portées préalablement à la connaissance du salarié et être pertinentes — c) Doivent être validées par l'inspection du travail — d) Ne concernent que les cadres</li>
<li>Quel objectif est correctement formulé ?<br/>a) « Être plus impliqué » — b) « Améliorer la qualité » — c) « Atteindre 95 % de conformité aux contrôles qualité du site au second semestre 2027 » — d) « Faire preuve de bonne volonté »</li>
<li>Depuis le 1er février 2026, la Pro-A est remplacée par :<br/>a) Le CPF de transition — b) La période de reconversion — c) Le congé individuel de formation — d) Le contrat de professionnalisation</li>
<li>Un salarié évoque, pendant son entretien, un problème de santé qui le gêne dans son travail. L'assistant RH :<br/>a) L'inscrit dans le compte rendu pour adapter le poste — b) Le transmet au manager — c) Ne l'inscrit pas et oriente le salarié vers le service de prévention et de santé au travail — d) Demande un certificat médical</li>
</ol>
<h3>Corrigé expliqué</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>c</td><td>La réforme a porté la périodicité de 2 à 4 ans ; un accord collectif peut prévoir une périodicité différente sans dépasser 4 ans. L'ancien régime (2 ans / 6 ans) se retrouve encore dans de nombreux documents : vérifier la date des sources.</td></tr>
<tr><td>2</td><td>b</td><td>Le salarié est informé à l'embauche qu'il bénéficiera d'un entretien au cours de la première année suivant son embauche.</td></tr>
<tr><td>3</td><td>c</td><td>L'abondement correctif s'applique dans les entreprises d'au moins 50 salariés, lorsque les conditions de l'état des lieux (entretiens et formation) ne sont pas remplies.</td></tr>
<tr><td>4</td><td>b</td><td>Art. L2242-2 : entreprises et groupes d'au moins 300 salariés (et entreprises de dimension communautaire avec au moins 150 salariés en France), au moins tous les 3 ans.</td></tr>
<tr><td>5</td><td>b</td><td>L'entretien de parcours professionnel ne porte pas sur l'évaluation du travail ; l'évaluation relève de l'entretien annuel.</td></tr>
<tr><td>6</td><td>b</td><td>L'entretien de retour d'absence n'est pas dû si le salarié a bénéficié d'un entretien dans les 12 mois précédant sa reprise.</td></tr>
<tr><td>7</td><td>b</td><td>Information préalable des salariés, pertinence des méthodes au regard de la finalité, confidentialité des résultats ; le CSE est par ailleurs consulté sur les dispositifs de contrôle de l'activité.</td></tr>
<tr><td>8</td><td>c</td><td>Objectif SMART : spécifique, mesurable (95 %), atteignable, réaliste, daté (second semestre 2027).</td></tr>
<tr><td>9</td><td>b</td><td>La loi du 24 octobre 2025 a créé la période de reconversion, entrée en vigueur le 1er février 2026, qui remplace la Pro-A et les Transitions collectives.</td></tr>
<tr><td>10</td><td>c</td><td>Les données de santé ne relèvent pas de l'entretien (minimisation RGPD, secret médical) ; seul le médecin du travail peut préconiser des aménagements.</td></tr>
</table>
`
      },
      {
        title: "7.10 – Cas pratique corrigé : organiser et exploiter la campagne d'entretiens 2027 d'ALTÉA SERVICES",
        content: `
<h3>Énoncé</h3>
<p>Vous êtes apprenti(e) assistant(e) RH chez ALTÉA SERVICES (148 salariés, propreté, Créteil). Nathalie ROUSSEL vous confie la campagne d'entretiens 2027. Vous disposez des informations suivantes :</p>
<ul>
<li>la campagne d'entretiens annuels concerne les 148 salariés ; les managers sont disponibles du 18 janvier au 26 février 2027 ; la synthèse doit être remise le 15 avril 2027 ;</li>
<li>extrait du fichier des entretiens de parcours professionnel :</li>
</ul>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Salarié</th><th>Emploi</th><th>Date d'embauche</th><th>Date de naissance</th><th>Dernier entretien professionnel</th><th>Situation</th></tr>
<tr><td>Lucie FERRAND</td><td>Agent de propreté</td><td>05/05/2026</td><td>12/03/1998</td><td>Aucun</td><td>Présente</td></tr>
<tr><td>Mamadou KONATÉ</td><td>Agent machiniste</td><td>01/09/2015</td><td>04/06/1981</td><td>15/02/2023</td><td>Présent ; visite de mi-carrière réalisée le 10/12/2026</td></tr>
<tr><td>Christine LEBRUN</td><td>Chef d'équipe</td><td>03/01/2011</td><td>21/09/1967</td><td>10/01/2025</td><td>Présente</td></tr>
<tr><td>Yasmina BELKACEM</td><td>Assistante d'exploitation</td><td>14/03/2022</td><td>02/02/1993</td><td>20/03/2024</td><td>Reprise le 04/01/2027 après un congé parental d'éducation d'un an</td></tr>
</table>
<ul>
<li>parmi les comptes rendus déjà rentrés, un chef d'équipe a écrit dans le compte rendu d'Ahmed SAÏDI : « Salarié souvent malade à cause de son dos, pas fiable, à surveiller » ;</li>
<li>le CSE demande, pour sa réunion d'avril, « la liste des salariés qui veulent quitter l'entreprise ».</li>
</ul>
<p><strong>Travail demandé :</strong> 1) Déterminez, pour chacun des 4 salariés, l'entretien de parcours professionnel à organiser pendant la campagne et justifiez. 2) Établissez le rétroplanning simplifié et les indicateurs de suivi. 3) Analysez le compte rendu d'Ahmed SAÏDI et proposez une conduite à tenir. 4) Répondez à la demande du CSE. 5) Proposez la structure de la note de synthèse à remettre le 15 avril.</p>

<h3>Corrigé</h3>
<h4>1) Entretiens de parcours professionnel à organiser</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Salarié</th><th>Analyse</th><th>Décision</th></tr>
<tr><td>Lucie FERRAND</td><td>Embauchée le 05/05/2026 : son premier entretien de parcours professionnel doit avoir lieu au cours de la première année suivant l'embauche, donc avant le 05/05/2027</td><td>EPP « première année » à programmer pendant la campagne (janvier-février 2027)</td></tr>
<tr><td>Mamadou KONATÉ</td><td>45 ans en 2026, visite médicale de mi-carrière réalisée le 10/12/2026 : l'entretien de mi-carrière doit se tenir dans les 2 mois suivant cette visite, soit avant le 10/02/2027. Par ailleurs, son dernier entretien date du 15/02/2023 : avec la règle des 4 ans calculée depuis le dernier entretien, l'échéance périodique serait le 15/02/2027</td><td>EPP de mi-carrière à programmer en priorité en janvier 2027 (il couvre aussi l'échéance périodique). Le compte rendu ne mentionne aucune donnée de santé ; seules les préconisations éventuellement transmises par le médecin du travail sont prises en compte</td></tr>
<tr><td>Christine LEBRUN</td><td>Née le 21/09/1967 : elle aura 60 ans le 21/09/2027 ; elle est donc dans les deux années précédant ses 60 ans. Dernier entretien le 10/01/2025</td><td>EPP abordant la fin de carrière (aménagements, temps partiel, retraite progressive, transmission des savoirs, tutorat d'un futur chef d'équipe), à programmer en 2027 avant ses 60 ans ; la campagne de janvier-février est l'occasion adaptée</td></tr>
<tr><td>Yasmina BELKACEM</td><td>Retour de congé parental le 04/01/2027 ; dernier entretien le 20/03/2024, soit plus de 12 mois avant la reprise</td><td>EPP de retour d'absence à proposer systématiquement à la reprise (début janvier 2027)</td></tr>
</table>
<p>Remarque : ces dates doivent être confirmées au regard de la rédaction en vigueur des articles L6315-1 et suivants et des éventuelles règles d'un accord collectif applicable. Le tableau de suivi conserve l'historique complet pour préparer les états des lieux à 8 ans.</p>

<h4>2) Rétroplanning simplifié et indicateurs</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Date</th><th>Action</th></tr>
<tr><td>Jusqu'au 4 décembre 2026</td><td>Mise à jour des supports (EPP réformé, rubriques mi-carrière et fin de carrière), validation par N. ROUSSEL</td></tr>
<tr><td>Semaine du 7 décembre</td><td>Liste des salariés concernés et types d'entretiens ; information du CSE sur le calendrier (et consultation si la grille d'évaluation est modifiée)</td></tr>
<tr><td>Semaine du 14 décembre</td><td>Paramétrage de Lucca, test</td></tr>
<tr><td>Début janvier 2027</td><td>Réunion managers, note d'information aux salariés, envoi des documents de préparation ; entretiens prioritaires (Y. BELKACEM à la reprise, M. KONATÉ avant le 10/02)</td></tr>
<tr><td>18 janvier – 26 février</td><td>Entretiens ; relance hebdomadaire chaque lundi</td></tr>
<tr><td>1er – 12 mars</td><td>Contrôle des comptes rendus, corrections, signatures manquantes</td></tr>
<tr><td>15 mars – 9 avril</td><td>Codification, analyse, rédaction de la synthèse</td></tr>
<tr><td>15 avril</td><td>Remise de la synthèse</td></tr>
</table>
<p>Indicateurs : taux de planification, taux de réalisation (global, par manager, par site), taux de réalisation des EPP dans les délais (objectif 100 %), taux de comptes rendus signés, délai moyen de retour des comptes rendus, nombre d'anomalies corrigées.</p>

<h4>3) Le compte rendu d'Ahmed SAÏDI</h4>
<p>La mention pose trois problèmes : elle contient une <strong>donnée de santé</strong> (« malade à cause de son dos »), qui n'a pas sa place dans un compte rendu d'entretien (minimisation RGPD, risque de discrimination fondée sur l'état de santé, art. L1132-1) ; elle formule des <strong>jugements de personne</strong> non étayés (« pas fiable », « à surveiller ») ; elle est communicable au salarié au titre de son droit d'accès. Conduite à tenir : ne pas diffuser le compte rendu ; informer Nathalie ROUSSEL ; le compte rendu est revu avec le manager qui reformule à partir de faits professionnels observables, s'il y en a (par exemple les retards constatés aux dates précises) ; le salarié en reçoit la version définitive. Si des difficultés de santé affectent le travail, la responsable RH peut organiser une visite auprès du médecin du travail (visite à la demande de l'employeur), qui seul se prononce sur l'aptitude et les aménagements. Enfin, l'assistant RH propose de rappeler à tous les managers les règles de rédaction dans le guide (« des faits, pas de jugements ; aucune donnée de santé »).</p>

<h4>4) La demande du CSE</h4>
<p>La liste nominative des salariés souhaitant quitter l'entreprise ne peut pas être transmise : il s'agit d'informations confidentielles recueillies dans le cadre d'entretiens individuels, sans finalité de communication au CSE, et leur diffusion pourrait porter préjudice aux salariés. En revanche, le CSE peut recevoir des <strong>données agrégées</strong> : par exemple « 7 salariés sur 179 (3,9 %) ont exprimé un projet de reconversion ou un projet externe », réparties par grande famille d'emplois si les effectifs le permettent sans réidentification, ainsi que les actions proposées (information CEP, bilans de compétences, période de reconversion). La réponse est préparée par l'assistant RH et validée par la responsable RH, qui la présente au CSE.</p>

<h4>5) Structure de la note de synthèse du 15 avril</h4>
<ol>
<li>Rappel du contexte et des objectifs de la campagne (dont les orientations GEPP : marchés hospitaliers, mécanisation, remplacement des chefs d'équipe).</li>
<li>Bilan quantitatif : entretiens réalisés, taux de réalisation, EPP réalisés dans les délais, anomalies.</li>
<li>Besoins de formation : tableau par catégorie, nombre de salariés, priorité, lien avec les orientations.</li>
<li>Souhaits d'évolution : tableau agrégé, viviers internes identifiés (11 candidats potentiels au poste de chef d'équipe, 14 à celui de machiniste).</li>
<li>Points d'attention : salariés exposés à l'usure professionnelle (en données agrégées), salariés en fin de carrière (transmission des savoirs), états des lieux à venir et risque d'abondement correctif.</li>
<li>Propositions d'actions priorisées et chiffrées : parcours chef d'équipe, formation machinistes, français à visée professionnelle, prévention des TMS, contacts OPCO.</li>
<li>Calendrier de mise en œuvre et indicateurs de suivi.</li>
<li>Annexes : méthode de codification, tableaux détaillés (sans données nominatives).</li>
</ol>
`
      }
    ]
  },
  {
    title: "Chapitre 8 – CP5 : Contribuer au processus de recrutement et d'intégration du personnel",
    description: "Ce chapitre couvre la cinquième compétence professionnelle du titre (CP5), évaluée à la fois dans la mise en situation professionnelle et lors de l'entretien technique de 20 minutes consacré aux CP1 et CP5. Il suit le processus de recrutement de bout en bout : analyse du besoin (remplacement, création, alternatives au recrutement externe), recueil auprès du manager avec une trame d'entretien de besoin, distinction entre fiche de poste et profil de poste, rédaction d'une offre d'emploi conforme (articles L1221-6 et L1132-1, critères de discrimination, mentions interdites, égalité femmes-hommes, langue française, transparence salariale issue de la directive (UE) 2023/970), choix des sources de recrutement et diffusion. Il outille ensuite la sélection : grille de présélection des CV cohérente avec le profil, préqualification téléphonique, guide d'entretien et grille d'évaluation, techniques de conduite d'entretien (questions ouvertes, méthode STAR), questions interdites, tests et mises en situation, synthèse pour la décision, réponses aux candidats, RGPD des candidats, gestion administrative, logistique et budgétaire du recrutement, promesse d'embauche et offre de contrat. Il se termine par l'intégration du nouveau collaborateur (pre-boarding, programme d'intégration avec acteurs, étapes et outils, livret d'accueil, tutorat, rapport d'étonnement, points de suivi), les indicateurs de recrutement et l'image employeur, avec des modèles prêts à l'emploi appliqués à ALTÉA SERVICES.",
    sections: [
      {
        title: "8.1 – La CP5 dans le référentiel, le processus de recrutement et l'analyse du besoin",
        content: `
<h3>Ce que le référentiel attend</h3>
<p>Le REAC décrit la CP5 ainsi : « Dans le respect de la législation en vigueur, des règles légales de non-discrimination, des règles de confidentialité et des valeurs de l'entreprise, contribuer au processus de recrutement jusqu'à l'intégration du nouveau collaborateur. À partir des consignes, rédiger le profil de poste et l'offre d'emploi puis les diffuser. Présélectionner les candidatures à l'aide d'une grille d'analyse. En fonction de sa délégation, conduire des entretiens. Assurer la gestion administrative et logistique du processus de recrutement. Établir le programme d'intégration du nouveau collaborateur et organiser son accueil avec le manager du service qui recrute. » La compétence s'exerce en lien avec le service qui recrute ou en partenariat avec un cabinet conseil ou une agence d'emploi.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère de performance</th><th>Traduction concrète</th></tr>
<tr><td>Le profil de poste est précis et synthétique</td><td>Une page ; critères hiérarchisés (indispensables / souhaités) ; exigences justifiées par le poste</td></tr>
<tr><td>La législation est respectée</td><td>Offre sans mention discriminatoire, questions d'entretien en lien direct avec le poste, information des candidats, RGPD, formalités d'embauche</td></tr>
<tr><td>La grille d'analyse est en cohérence avec le profil de poste</td><td>Chaque critère de la grille de présélection et de la grille d'entretien provient du profil ; pondération reflétant l'importance des critères</td></tr>
<tr><td>Le programme d'intégration prévoit les acteurs, les étapes et les outils nécessaires</td><td>Qui fait quoi, quand, avec quels supports, de l'avant-arrivée à la fin de la période d'essai</td></tr>
<tr><td>Les règles de confidentialité sont respectées</td><td>Candidatures accessibles aux seules personnes impliquées ; discrétion vis-à-vis des candidats en poste ailleurs ; conservation limitée</td></tr>
</table>
<blockquote><strong>À l'examen.</strong> L'entretien technique de 30 minutes comprend 10 minutes sur les choix opérés en mise en situation professionnelle et 20 minutes sur les compétences « Assurer la gestion administrative du personnel » et « Contribuer au processus de recrutement et d'intégration du personnel ». Le jury questionne le candidat sur sa méthode, la législation, les outils : maîtrisez les modèles de ce chapitre et sachez justifier chaque choix.</blockquote>

<h3>Le processus de recrutement en dix étapes</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Contenu</th><th>Rôle de l'assistant RH</th><th>Livrable</th></tr>
<tr><td>1. Analyse du besoin</td><td>Confirmer la nécessité de recruter et définir le besoin</td><td>Conduit l'entretien de besoin avec le manager, prépare la demande de validation</td><td>Demande de recrutement validée</td></tr>
<tr><td>2. Définition du poste et du profil</td><td>Fiche de poste, profil de poste</td><td>Rédige à partir des consignes et des descriptifs existants</td><td>Profil de poste</td></tr>
<tr><td>3. Rédaction de l'offre</td><td>Annonce conforme et attractive</td><td>Rédige, fait valider</td><td>Offre d'emploi</td></tr>
<tr><td>4. Sourcing et diffusion</td><td>Choix des canaux, publication</td><td>Publie, suit les retours</td><td>Plan de diffusion</td></tr>
<tr><td>5. Présélection</td><td>Tri des candidatures</td><td>Applique la grille, accuse réception</td><td>Grille de présélection remplie</td></tr>
<tr><td>6. Préqualification</td><td>Entretien téléphonique court</td><td>Conduit selon une trame</td><td>Fiches de préqualification</td></tr>
<tr><td>7. Entretiens et tests</td><td>Évaluation approfondie</td><td>Organise, conduit selon sa délégation</td><td>Grilles d'évaluation</td></tr>
<tr><td>8. Décision</td><td>Choix du candidat</td><td>Rédige les synthèses comparatives</td><td>Synthèse de décision</td></tr>
<tr><td>9. Proposition et formalités</td><td>Offre de contrat, contrat, DPAE, visite d'information et de prévention, réponses négatives</td><td>Prépare les documents, gère l'administratif</td><td>Contrat, DPAE, courriers</td></tr>
<tr><td>10. Intégration</td><td>Accueil et suivi jusqu'à la fin de la période d'essai</td><td>Établit le programme, coordonne</td><td>Programme d'intégration, livret d'accueil</td></tr>
</table>

<h3>Analyser le besoin : faut-il recruter ?</h3>
<p>Un recrutement est une décision coûteuse et engageante. Avant de diffuser une offre, l'assistant RH aide à vérifier l'origine du besoin et les alternatives.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Origine du besoin</th><th>Questions à poser</th></tr>
<tr><td>Remplacement définitif (démission, retraite, licenciement)</td><td>Le poste doit-il être remplacé à l'identique ? Ses missions ont-elles évolué ? Peut-on le redéployer ?</td></tr>
<tr><td>Remplacement temporaire (congé maternité, maladie, congé parental)</td><td>Quelle durée prévisible ? CDD de remplacement, intérim, redistribution provisoire des tâches ?</td></tr>
<tr><td>Création de poste (nouveau marché, nouvelle activité)</td><td>Le besoin est-il durable ? Le budget est-il validé ? Quelle date de démarrage ?</td></tr>
<tr><td>Accroissement temporaire d'activité</td><td>CDD pour accroissement temporaire, intérim, heures complémentaires des salariés à temps partiel (dans les limites légales et conventionnelles)</td></tr>
</table>
<h4>Les alternatives au recrutement externe</h4>
<ul>
<li><strong>Mobilité interne ou promotion</strong> : publier d'abord le poste en interne (bourse de l'emploi, lien avec les souhaits exprimés en entretien de parcours professionnel — voir chapitre 7).</li>
<li><strong>Réorganisation</strong> : répartition des tâches, polyvalence, changement d'horaires.</li>
<li><strong>Augmentation du temps de travail de salariés à temps partiel</strong> : les salariés à temps partiel bénéficient d'une priorité pour l'attribution d'un emploi à temps complet ou d'une augmentation de leur durée de travail dans leur catégorie professionnelle (art. L3123-3) — point très important dans la propreté où le temps partiel est fréquent.</li>
<li><strong>Formation d'un salarié</strong> pour occuper le poste (ex. un agent formé à la conduite d'autolaveuse).</li>
<li><strong>Recours externe sans embauche</strong> : travail temporaire (ETT), groupement d'employeurs, sous-traitance, prestation.</li>
<li><strong>Alternance</strong> : contrat d'apprentissage ou de professionnalisation pour former un futur collaborateur.</li>
</ul>
<blockquote><strong>Spécificité de la propreté : la reprise du personnel.</strong> Lorsqu'une entreprise de propreté succède à une autre sur un marché, la convention collective (accord de branche relatif à la garantie d'emploi et à la continuité du contrat de travail, dit « annexe 7 ») prévoit, sous conditions, le transfert d'une partie du personnel affecté au marché. Avant de recruter pour un nouveau marché, ALTÉA vérifie donc avec la responsable RH quels salariés de l'entreprise sortante seront repris : le besoin de recrutement externe en est réduit d'autant.</blockquote>

<h3>L'entretien de besoin avec le manager</h3>
<p>Le REAC attend de l'assistant RH qu'il sache « faciliter l'expression du besoin de recrutement » et « collecter des données auprès de collaborateurs ». Cet entretien de 30 à 45 minutes est structuré par une trame.</p>
<p><strong>Modèle – Trame d'entretien de besoin de recrutement</strong></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Thème</th><th>Questions</th><th>Réponses (exemple ALTÉA : chef d'équipe, site hospitalier)</th></tr>
<tr><td>Contexte</td><td>Pourquoi ce recrutement ? Depuis quand le besoin existe-t-il ? Quelles alternatives ont été envisagées ?</td><td>Reprise du marché du Centre hospitalier de Bonneuil au 1er avril 2027 ; 22 agents dont 14 repris de l'entreprise sortante ; pas de chef d'équipe repris ; aucun candidat interne prêt immédiatement (2 en formation)</td></tr>
<tr><td>Poste</td><td>Intitulé, rattachement, missions principales, activités, périmètre (effectif encadré, sites), indicateurs de réussite</td><td>Chef d'équipe, rattaché à la cheffe de site ; encadrement de 22 agents ; bionettoyage, contrôle qualité, relation avec le cadre hygiéniste</td></tr>
<tr><td>Conditions</td><td>Type de contrat, durée du travail, horaires, lieu, déplacements, date de prise de poste, classification et rémunération (fourchette validée)</td><td>CDI, temps plein 35 h, 6 h – 13 h 30 du lundi au vendredi, un samedi sur trois ; Bonneuil-sur-Marne ; prise de poste 22 mars 2027 ; classification et fourchette à valider par la direction</td></tr>
<tr><td>Compétences</td><td>Indispensables (sans lesquelles le candidat ne peut pas réussir) / souhaitées (plus) ; savoir-être professionnels observables</td><td>Indispensables : expérience d'encadrement d'équipe en propreté, maîtrise des protocoles de bionettoyage ; souhaitées : connaissance du milieu hospitalier, outils numériques de contrôle qualité</td></tr>
<tr><td>Formation, expérience</td><td>Diplôme réellement nécessaire ? Expérience minimale justifiée par le poste ?</td><td>Pas de diplôme exigé ; 2 ans d'encadrement ; un titre ou CQP de la branche est un plus</td></tr>
<tr><td>Environnement</td><td>Équipe, culture, contraintes, perspectives d'évolution</td><td>Équipe multiculturelle, exigences d'hygiène fortes, perspective d'évolution vers chef de site</td></tr>
<tr><td>Processus</td><td>Qui reçoit les candidats ? Combien d'étapes ? Disponibilités du manager ? Tests ? Budget annonces ?</td><td>Préqualification par l'assistant RH, entretien avec la cheffe de site et N. ROUSSEL, mise en situation sur site ; budget de diffusion à préciser</td></tr>
<tr><td>Calendrier</td><td>Date limite de décision, de prise de poste</td><td>Décision avant le 19 février 2027 (préavis éventuel du candidat)</td></tr>
</table>
<p><strong>Vigilance :</strong> si le manager exprime une préférence liée à un critère discriminatoire (« plutôt un homme, pour l'autorité », « pas trop âgé », « quelqu'un sans enfants pour les horaires »), l'assistant RH le recadre en revenant aux exigences du poste (« ce qui compte, c'est la capacité à encadrer une équipe et la disponibilité sur les horaires du poste ; ces critères s'appliquent à tous les candidats ») et alerte la responsable RH si nécessaire. La discrimination à l'embauche est un délit (art. 225-1 et 225-2 du Code pénal : jusqu'à 3 ans d'emprisonnement et 45 000 € d'amende pour une personne physique).</p>
`
      },
      {
        title: "8.2 – Fiche de poste et profil de poste : rédiger un profil précis et synthétique",
        content: `
<h3>Deux documents complémentaires</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Fiche de poste</th><th>Profil de poste</th></tr>
<tr><td>Décrit</td><td>Le poste : missions, activités, responsabilités, conditions</td><td>La personne recherchée : compétences, expérience, formation, qualités professionnelles</td></tr>
<tr><td>Usage</td><td>Organisation, évaluation, formation, classification, intégration</td><td>Recrutement : rédaction de l'offre, grilles de présélection et d'entretien</td></tr>
<tr><td>Durée de vie</td><td>Tant que le poste existe (mise à jour régulière)</td><td>Le temps du recrutement (adapté au contexte : équipe, marché du travail)</td></tr>
<tr><td>Question</td><td>« Que fait-on à ce poste ? »</td><td>« Qui peut réussir à ce poste ? »</td></tr>
</table>
<p>Le REAC demande de « rechercher et sélectionner des descriptifs de poste » : le profil s'appuie sur la fiche de poste interne, et peut être enrichi par des descriptifs externes (fiches métiers ROME de France Travail, fiches de la branche, référentiels de certification RNCP), à condition de les adapter à la réalité du poste.</p>

<h3>Construire le profil : hiérarchiser les critères</h3>
<ul>
<li><strong>Critères indispensables</strong> (éliminatoires) : peu nombreux (3 à 5), directement liés à des activités essentielles du poste. Exemple : expérience d'encadrement d'équipe.</li>
<li><strong>Critères souhaités</strong> (différenciants) : ils départagent les candidats qui remplissent les critères indispensables. Exemple : connaissance du milieu hospitalier.</li>
<li><strong>Critères exclus</strong> : tout ce qui n'a pas de lien direct et nécessaire avec le poste (art. L1221-6) et tout critère discriminatoire (art. L1132-1).</li>
</ul>
<p>Un diplôme n'est exigé que s'il est légalement requis (profession réglementée) ou réellement nécessaire. Une habilitation ou une autorisation de conduite (CACES, permis) peut être indispensable si le poste l'impose ; l'entreprise peut aussi prévoir de la faire passer après l'embauche.</p>

<h3>Modèle – Profil de poste (ALTÉA SERVICES)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th colspan="2">PROFIL DE POSTE – Chef d'équipe propreté H/F – Site hospitalier de Bonneuil-sur-Marne – Réf. REC-2027-004</th></tr>
<tr><td>Contexte</td><td>Reprise du marché de bionettoyage d'un centre hospitalier ; équipe de 22 agents ; prise de poste le 22 mars 2027</td></tr>
<tr><td>Rattachement</td><td>Cheffe de site</td></tr>
<tr><td>Missions clés</td><td>Organiser et répartir le travail de l'équipe ; garantir l'application des protocoles de bionettoyage ; contrôler la qualité et assurer la traçabilité ; former et accompagner les agents ; gérer les remplacements et les stocks ; assurer la relation quotidienne avec l'équipe d'hygiène de l'établissement</td></tr>
<tr><td>Compétences indispensables</td><td>1. Encadrer une équipe d'agents de propreté (au moins 2 ans d'expérience) ; 2. Appliquer et faire appliquer des protocoles de bionettoyage ; 3. Contrôler la qualité d'une prestation et renseigner des documents de traçabilité ; 4. Communiquer des consignes claires à une équipe</td></tr>
<tr><td>Compétences souhaitées</td><td>Connaissance du milieu hospitalier ou médico-social ; utilisation d'une application mobile de contrôle qualité ; formation de nouveaux agents</td></tr>
<tr><td>Savoir-être professionnels (observables)</td><td>Sens de l'organisation (planifier, anticiper les absences) ; rigueur (respect des protocoles) ; aisance relationnelle (gestion des tensions dans l'équipe, échanges avec le client)</td></tr>
<tr><td>Formation / certification</td><td>Pas de diplôme exigé ; CQP ou titre professionnel du secteur de la propreté apprécié</td></tr>
<tr><td>Conditions</td><td>CDI, 35 h, du lundi au vendredi 6 h – 13 h 30 et un samedi sur trois ; classification conventionnelle (CCN propreté, IDCC 3043) et fourchette de rémunération validées par la direction ; mutuelle, prime conventionnelle selon la CCN</td></tr>
<tr><td>Validé par</td><td>Cheffe de site et Nathalie ROUSSEL, le …</td></tr>
</table>
<p>Ce profil tient sur une page, hiérarchise les critères et ne comporte aucune exigence étrangère au poste : il répond au critère « précis et synthétique ». C'est de lui que dériveront l'offre (section 8.4), la grille de présélection (8.5) et la grille d'entretien (8.6).</p>
`
      },
      {
        title: "8.3 – Le cadre légal du recrutement : non-discrimination, égalité, offre d'emploi et transparence salariale",
        content: `
<h3>Les principes de l'article L1221-6 et suivants</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Article</th><th>Règle</th><th>Conséquence pratique</th></tr>
<tr><td>L1221-6</td><td>Les informations demandées au candidat, sous quelque forme que ce soit, ne peuvent avoir comme finalité que d'apprécier sa capacité à occuper l'emploi proposé ou ses aptitudes professionnelles ; elles doivent présenter un lien direct et nécessaire avec l'emploi ou les aptitudes. Le candidat est tenu d'y répondre de bonne foi</td><td>Pas de question sur la vie privée ; un candidat peut ne pas répondre à une question illicite (et même mentir sans que cela constitue une faute)</td></tr>
<tr><td>L1221-8</td><td>Le candidat est expressément informé, préalablement à leur mise en œuvre, des méthodes et techniques d'aide au recrutement utilisées ; les résultats sont confidentiels ; les méthodes doivent être pertinentes au regard de la finalité poursuivie</td><td>Annoncer les tests, mises en situation, entretiens collectifs ; ne pas utiliser de méthodes non fondées (graphologie, numérologie, astrologie, morphopsychologie)</td></tr>
<tr><td>L1221-9</td><td>Aucune information concernant personnellement un candidat ne peut être collectée par un dispositif qui n'a pas été porté préalablement à sa connaissance</td><td>Informer de toute vérification (appel à un ancien employeur avec l'accord du candidat, analyse des profils en ligne, outil d'analyse automatisée des CV)</td></tr>
<tr><td>L1221-7</td><td>Possibilité d'anonymiser les CV (dispositif facultatif depuis la loi de 2015)</td><td>Bonne pratique de lutte contre les discriminations</td></tr>
</table>

<h3>Les critères de discrimination (article L1132-1)</h3>
<p>Aucune personne ne peut être écartée d'une procédure de recrutement, ni d'un stage ou d'une période de formation, en raison de l'un des critères suivants :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critères liés à la personne</th><th>Critères liés à la situation</th><th>Critères liés aux opinions et activités</th></tr>
<tr><td>Origine ; sexe ; mœurs ; orientation sexuelle ; identité de genre ; âge ; caractéristiques génétiques ; appartenance ou non-appartenance, vraie ou supposée, à une ethnie, une nation ou une prétendue race ; apparence physique ; nom de famille ; état de santé ; perte d'autonomie ; handicap</td><td>Situation de famille ; grossesse ; particulière vulnérabilité résultant de la situation économique, apparente ou connue de l'auteur ; lieu de résidence ; domiciliation bancaire ; capacité à s'exprimer dans une langue autre que le français</td><td>Opinions politiques ; activités syndicales ou mutualistes ; exercice d'un mandat électif ; convictions religieuses ; qualité de lanceur d'alerte, de facilitateur ou de personne en lien avec un lanceur d'alerte</td></tr>
</table>
<p>Soit plus de vingt-cinq critères, qui s'appliquent à toutes les étapes : offre, tri, entretien, décision. Les <strong>différences de traitement</strong> ne sont admises que si elles répondent à une exigence professionnelle essentielle et déterminante, pour un objectif légitime et une exigence proportionnée (art. L1133-1), ou dans les cas prévus par la loi (art. L1133-2 à L1133-6 : par exemple mesures en faveur de l'emploi des jeunes, des seniors ou des personnes handicapées, ou mesures appropriées pour les personnes handicapées).</p>
<h4>Preuve et sanctions</h4>
<ul>
<li><strong>Aménagement de la charge de la preuve</strong> (art. L1134-1) : le candidat présente des éléments de fait laissant supposer l'existence d'une discrimination ; il incombe alors à l'employeur de prouver que sa décision est justifiée par des éléments objectifs étrangers à toute discrimination. D'où l'importance de <strong>conserver les grilles de présélection et d'évaluation</strong> qui justifient les décisions.</li>
<li><strong>Sanctions pénales</strong> : art. 225-1 et 225-2 du Code pénal (jusqu'à 3 ans d'emprisonnement et 45 000 € d'amende pour une personne physique ; amende quintuplée pour une personne morale).</li>
<li><strong>Acteurs</strong> : Défenseur des droits (saisine gratuite), inspection du travail, testing.</li>
</ul>

<h3>Égalité professionnelle femmes-hommes</h3>
<ul>
<li>Art. L1142-1 : nul ne peut mentionner ou faire mentionner dans une offre d'emploi le sexe ou la situation de famille du candidat recherché, refuser d'embaucher en raison du sexe, de la situation de famille ou de la grossesse, sauf exceptions liées à une exigence professionnelle essentielle (ex. : mannequins, artistes pour un rôle — liste réglementaire).</li>
<li>Art. L1225-1 et suivants : l'employeur ne doit pas prendre en considération l'état de grossesse pour refuser d'embaucher ; il lui est interdit de rechercher ou faire rechercher des informations sur l'état de grossesse ; la candidate n'est pas tenue de révéler son état.</li>
<li>Bonne pratique : mention « H/F » ou intitulé épicène, et écriture des intitulés aux deux genres (« chef ou cheffe d'équipe »).</li>
</ul>

<h3>Les règles propres à l'offre d'emploi (articles L5331-1 et suivants)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Règle</th><th>Contenu</th></tr>
<tr><td>Limite d'âge</td><td>Interdiction de fixer une limite d'âge supérieure dans une offre, sauf si elle est imposée par un texte législatif ou réglementaire</td></tr>
<tr><td>Allégations fausses ou trompeuses</td><td>Interdiction de publier une offre comportant des allégations fausses ou susceptibles d'induire en erreur, notamment sur l'existence, le caractère effectivement disponible, l'origine, la nature, la description de l'emploi, la rémunération et ses accessoires, le lieu de travail</td></tr>
<tr><td>Offre anonyme</td><td>Une offre peut ne pas mentionner le nom de l'employeur, mais celui-ci doit faire connaître son identité au directeur de la publication ou au diffuseur</td></tr>
<tr><td>Langue française</td><td>L'offre diffusée en France doit être rédigée en français ; des termes étrangers sont admis s'ils n'ont pas d'équivalent français ou si l'emploi est à exercer à l'étranger, avec une description en français (loi du 4 août 1994 dite « loi Toubon » et art. L5331-4)</td></tr>
<tr><td>Gratuité pour le candidat</td><td>Il est interdit de faire payer un candidat pour une offre d'emploi ou pour la procédure de recrutement</td></tr>
<tr><td>Date</td><td>L'offre publiée doit être datée (bonne pratique et exigence des diffuseurs) ; elle doit être retirée dès que le poste est pourvu</td></tr>
</table>
<h4>Mentions interdites ou à éviter : exemples</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Mention</th><th>Problème</th><th>Correction</th></tr>
<tr><td>« Jeune et dynamique »</td><td>Âge</td><td>« Vous aimez les environnements rythmés »</td></tr>
<tr><td>« Femme de ménage »</td><td>Sexe</td><td>« Agent ou agente de propreté H/F »</td></tr>
<tr><td>« Français langue maternelle »</td><td>Origine</td><td>« Maîtrise du français écrit et oral pour lire les protocoles et rédiger les comptes rendus » (si nécessaire au poste)</td></tr>
<tr><td>« Habitant de Créteil de préférence »</td><td>Lieu de résidence</td><td>« Poste basé à Créteil, prise de poste à 6 h »</td></tr>
<tr><td>« Bonne présentation exigée »</td><td>Apparence physique (formulation vague)</td><td>« Tenue de travail fournie et port obligatoire »</td></tr>
<tr><td>« Sans contrainte familiale »</td><td>Situation de famille</td><td>« Horaires : 6 h – 13 h 30, un samedi sur trois »</td></tr>
<tr><td>« Moins de 3 ans d'expérience »</td><td>Discrimination indirecte liée à l'âge</td><td>« Une première expérience d'encadrement est souhaitée »</td></tr>
<tr><td>« Photo obligatoire »</td><td>Peut fonder une discrimination (apparence, origine)</td><td>Ne pas demander de photo</td></tr>
</table>

<h3>La transparence salariale : directive (UE) 2023/970</h3>
<p>La directive du 10 mai 2023 visant à renforcer l'application du principe de l'égalité des rémunérations entre femmes et hommes par la transparence des rémunérations prévoit, au stade du recrutement :</p>
<ul>
<li>le droit des candidats de recevoir de l'employeur une information sur la <strong>rémunération initiale ou sa fourchette</strong>, fondée sur des critères objectifs non sexistes, et, le cas échéant, sur les dispositions de la convention collective applicables au poste, <strong>dans l'avis de vacance, avant l'entretien ou d'une autre manière</strong> permettant une négociation éclairée ;</li>
<li>l'<strong>interdiction de demander aux candidats l'historique de leur rémunération</strong> dans leurs emplois actuels ou précédents ;</li>
<li>l'obligation de veiller à ce que les avis de vacance et les intitulés de postes soient <strong>neutres du point de vue du genre</strong> et que les procédures de recrutement soient non discriminatoires.</li>
</ul>
<blockquote><strong>Où en est la France ?</strong> Le délai de transposition a expiré le <strong>7 juin 2026</strong>. Selon les informations disponibles à l'automne 2026, le projet de loi de transposition (qui prévoit notamment la refonte de l'index de l'égalité professionnelle) a été préparé au printemps 2026 mais son examen par le Parlement n'était pas achevé. Vérifiez l'état du droit sur Légifrance et travail-emploi.gouv.fr avant chaque recrutement. En pratique, ALTÉA applique déjà les principes de la directive : <strong>fourchette de rémunération indiquée dans chaque offre</strong>, aucune question sur le salaire antérieur (on peut en revanche demander les prétentions salariales), intitulés neutres.</blockquote>

<h3>Autres obligations à connaître</h3>
<ul>
<li><strong>Priorité de réembauche</strong> des salariés licenciés pour motif économique pendant un an s'ils en font la demande (art. L1233-45) ; priorités des salariés à temps partiel (art. L3123-3) et des salariés en CDD pour les postes en CDI (information sur les postes à pourvoir, art. L1242-17).</li>
<li><strong>Information du CSE</strong> sur les méthodes ou techniques d'aide au recrutement, avant leur utilisation (art. L2312-38).</li>
<li><strong>Vérification de l'autorisation de travail</strong> des candidats étrangers non ressortissants de l'UE/EEE/Suisse, auprès de la préfecture, au moins deux jours ouvrables avant l'embauche (art. L5221-8 et R5221-41).</li>
<li><strong>Interdiction de demander un extrait de casier judiciaire</strong> sauf pour les emplois où un texte le prévoit ou si la nature du poste le justifie strictement ; la CNIL recommande de se limiter à une présentation, sans conservation de copie.</li>
</ul>
`
      },
      {
        title: "8.4 – Rédiger l'offre d'emploi, valoriser la marque employeur, choisir les sources et diffuser",
        content: `
<h3>La structure d'une offre efficace</h3>
<ol>
<li><strong>Intitulé</strong> clair et recherché par les candidats (mots-clés réels du métier), suivi de « H/F ».</li>
<li><strong>L'entreprise</strong> : activité, taille, valeurs, ce qui la rend attractive (en 3 à 5 lignes).</li>
<li><strong>Le poste</strong> : contexte, missions principales (5 à 7 puces), environnement.</li>
<li><strong>Le profil</strong> : compétences indispensables puis souhaitées, sans exigence superflue.</li>
<li><strong>Les conditions</strong> : contrat, durée, horaires, lieu, date de prise de poste, <strong>rémunération (fourchette)</strong>, avantages.</li>
<li><strong>Le processus</strong> : étapes du recrutement, délai de réponse, modalités de candidature.</li>
<li><strong>Les mentions</strong> : engagement en faveur de la diversité et de l'accueil des personnes en situation de handicap, information RGPD (lien vers la politique de confidentialité).</li>
</ol>

<h3>Modèle – Offre d'emploi complète</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>CHEF OU CHEFFE D'ÉQUIPE PROPRETÉ – MILIEU HOSPITALIER (H/F) – CDI – BONNEUIL-SUR-MARNE (94)</th></tr>
<tr><td>
<p><strong>Qui sommes-nous ?</strong> ALTÉA SERVICES est une entreprise de propreté et de services aux entreprises implantée à Créteil depuis plus de vingt ans. Nos 148 collaborateurs interviennent chaque jour dans des bureaux, des établissements de santé et des sites industriels du Val-de-Marne. Notre engagement : des prestations de qualité, des équipes formées et un encadrement de proximité. Nous formons chaque année nos salariés et privilégions la promotion interne.</p>
<p><strong>Votre mission.</strong> Dans le cadre d'un nouveau marché de bionettoyage dans un centre hospitalier, vous encadrez une équipe de 22 agents et êtes le relais de la cheffe de site sur le terrain. À ce titre, vous :</p>
<ul>
<li>organisez et répartissez le travail quotidien et assurez les remplacements ;</li>
<li>garantissez l'application des protocoles de bionettoyage et des règles d'hygiène hospitalière ;</li>
<li>réalisez les contrôles qualité et assurez la traçabilité des prestations ;</li>
<li>accueillez, formez et accompagnez les agents ;</li>
<li>gérez les stocks de produits et de matériel ;</li>
<li>êtes l'interlocuteur quotidien de l'équipe d'hygiène de l'établissement.</li>
</ul>
<p><strong>Votre profil.</strong> Vous avez au moins deux ans d'expérience dans l'encadrement d'une équipe de propreté et maîtrisez les protocoles de bionettoyage. Vous savez transmettre des consignes claires et contrôler la qualité d'une prestation. Une expérience en milieu hospitalier ou médico-social, un CQP ou un titre professionnel du secteur seraient appréciés. Organisation, rigueur et aisance relationnelle sont les qualités qui vous permettront de réussir.</p>
<p><strong>Conditions.</strong> CDI à temps plein (35 h). Horaires : du lundi au vendredi de 6 h à 13 h 30 et un samedi sur trois. Prise de poste le 22 mars 2027. Rémunération : [fourchette brute annuelle ou mensuelle validée par la direction, selon la classification de la convention collective des entreprises de propreté et l'expérience]. Mutuelle d'entreprise, prise en charge de 50 % de l'abonnement de transport public, téléphone professionnel, formation à l'intégration.</p>
<p><strong>Processus de recrutement.</strong> 1) Échange téléphonique de 15 minutes avec le service RH ; 2) entretien avec la cheffe de site et la responsable RH ; 3) mise en situation de 30 minutes sur un site (contrôle qualité). Réponse sous 15 jours après l'entretien.</p>
<p><strong>Candidater.</strong> CV et, si vous le souhaitez, quelques lignes de motivation, via [plateforme / adresse recrutement@…] avant le 5 février 2027, référence REC-2027-004.</p>
<p>ALTÉA SERVICES s'engage en faveur de la diversité et de l'égalité professionnelle. Ce poste est ouvert à toutes et à tous, notamment aux personnes en situation de handicap ; des aménagements peuvent être prévus lors du processus de recrutement sur simple demande. Vos données sont traitées par ALTÉA SERVICES pour la gestion de votre candidature et conservées 2 ans au plus après le dernier contact (voir notre politique de confidentialité).</p>
<p><em>Offre publiée le 8 janvier 2027.</em></p>
</td></tr>
</table>
<h4>Contrôle de conformité avant publication</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Point de contrôle</th><th>OK ?</th></tr>
<tr><td>Intitulé neutre ou épicène, mention H/F</td><td>☐</td></tr>
<tr><td>Aucun des critères de l'article L1132-1, ni directement ni indirectement</td><td>☐</td></tr>
<tr><td>Pas de limite d'âge, pas de photo exigée, pas de condition de nationalité injustifiée</td><td>☐</td></tr>
<tr><td>Exigences en lien direct avec le poste (L1221-6), cohérentes avec le profil validé</td><td>☐</td></tr>
<tr><td>Informations exactes (contrat, lieu, horaires, rémunération) – pas d'allégation trompeuse</td><td>☐</td></tr>
<tr><td>Rédigée en français</td><td>☐</td></tr>
<tr><td>Fourchette de rémunération indiquée (directive 2023/970)</td><td>☐</td></tr>
<tr><td>Processus de recrutement et méthodes annoncés (L1221-8)</td><td>☐</td></tr>
<tr><td>Mention RGPD, date de publication</td><td>☐</td></tr>
<tr><td>Validation par le manager et la responsable RH</td><td>☐</td></tr>
</table>

<h3>Marque employeur et image de l'entreprise</h3>
<p>La <strong>marque employeur</strong> est l'image de l'entreprise en tant qu'employeur, auprès des candidats et des salariés. Le REAC demande de « communiquer une image positive de l'entreprise ». Elle se construit par des éléments concrets et vérifiables : conditions de travail réelles, parcours d'évolution (exemples de promotions internes), formation, ambiance d'équipe, engagement social et environnemental (produits écolabellisés, réduction de la pénibilité). Elle se perd vite : offres trompeuses, candidats sans réponse, avis négatifs sur les plateformes, accueil raté. Leviers simples pour ALTÉA : page carrière avec témoignages de salariés (avec leur accord écrit pour l'utilisation de leur image), réponses à tous les candidats, délais annoncés et tenus, accueil soigné des nouveaux.</p>

<h3>Choisir les sources de recrutement (sourcing)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Source</th><th>Atouts</th><th>Limites</th><th>Pertinence pour ALTÉA</th></tr>
<tr><td>France Travail (offres, CVthèque, méthode de recrutement par simulation, préparation opérationnelle à l'emploi)</td><td>Gratuit, large audience, accompagnement des entreprises, aides à l'embauche selon les publics</td><td>Volume parfois important de candidatures peu ciblées</td><td>Très forte pour les agents ; forte pour les chefs d'équipe</td></tr>
<tr><td>APEC</td><td>Spécialisée cadres et jeunes diplômés, gratuite pour la diffusion</td><td>Réservée aux postes cadres</td><td>Postes de responsable d'exploitation</td></tr>
<tr><td>Job boards généralistes (Indeed, HelloWork…) et sectoriels</td><td>Audience large, multidiffusion</td><td>Coût selon la formule, concurrence des offres</td><td>Forte</td></tr>
<tr><td>Plateformes de marque employeur (Welcome to the Jungle…)</td><td>Valorisation de la culture d'entreprise</td><td>Coût, cible plutôt fonctions support et cadres</td><td>Fonctions support</td></tr>
<tr><td>Réseaux sociaux professionnels (LinkedIn…) et réseaux sociaux</td><td>Approche directe, visibilité, partage par les salariés</td><td>Temps de gestion, respect du RGPD dans la recherche de profils</td><td>Encadrement, fonctions support</td></tr>
<tr><td>Cooptation</td><td>Candidats de confiance, intégration facilitée, coût faible (prime éventuelle)</td><td>Risque d'homogénéité de l'équipe et de discrimination indirecte : à combiner avec d'autres canaux</td><td>Très forte dans la propreté</td></tr>
<tr><td>Candidatures spontanées et CVthèque interne</td><td>Gratuit, candidats motivés</td><td>À gérer dans les règles du RGPD (durée de conservation, information)</td><td>Forte</td></tr>
<tr><td>Écoles, CFA, organismes de formation, forums</td><td>Alternants, jeunes diplômés</td><td>Calendrier scolaire</td><td>Alternance (titre professionnel agent de propreté et d'hygiène, CQP)</td></tr>
<tr><td>Cabinets de recrutement</td><td>Expertise, gain de temps, approche directe</td><td>Coût élevé (honoraires souvent calculés en pourcentage de la rémunération annuelle)</td><td>Postes d'encadrement supérieur</td></tr>
<tr><td>Entreprises de travail temporaire (ETT)</td><td>Réactivité, gestion administrative déléguée, possibilité de recruter après une mission</td><td>Coût, recours limité aux cas prévus par la loi (art. L1251-6)</td><td>Remplacements, pics d'activité</td></tr>
<tr><td>Cap emploi, structures d'insertion par l'activité économique</td><td>Candidats accompagnés, réponse à l'OETH et aux clauses sociales des marchés publics</td><td>Délai de mise en relation</td><td>Forte (marchés publics hospitaliers avec clauses d'insertion)</td></tr>
</table>
<h4>Plan de diffusion – REC-2027-004</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Canal</th><th>Date de publication</th><th>Durée</th><th>Coût</th><th>Responsable</th></tr>
<tr><td>Bourse interne (affichage sites + Lucca)</td><td>4 janvier 2027</td><td>1 semaine avant diffusion externe, puis en parallèle</td><td>0 €</td><td>Assistant RH</td></tr>
<tr><td>France Travail</td><td>8 janvier</td><td>4 semaines</td><td>0 €</td><td>Assistant RH</td></tr>
<tr><td>Indeed (offre sponsorisée)</td><td>8 janvier</td><td>3 semaines</td><td>Selon budget validé</td><td>Assistant RH</td></tr>
<tr><td>LinkedIn (page entreprise + partage par les managers)</td><td>8 janvier</td><td>—</td><td>0 €</td><td>Assistant RH / managers</td></tr>
<tr><td>Cooptation (message aux chefs d'équipe et chefs de site)</td><td>8 janvier</td><td>4 semaines</td><td>Prime de cooptation selon la politique interne</td><td>N. ROUSSEL</td></tr>
<tr><td>Cap emploi</td><td>8 janvier</td><td>4 semaines</td><td>0 €</td><td>Assistant RH</td></tr>
</table>
<p>Les candidatures sont centralisées dans un seul outil (module recrutement du SIRH, logiciel de suivi des candidatures ou tableau de suivi partagé à accès restreint), avec la source de chaque candidature pour mesurer l'efficacité des canaux.</p>
`
      },
      {
        title: "8.5 – Présélectionner les candidatures : grille d'analyse des CV et préqualification téléphonique",
        content: `
<h3>Principes de la présélection</h3>
<ul>
<li><strong>Cohérence</strong> : chaque critère de la grille provient du profil de poste ; pas de critère ajouté en cours de route.</li>
<li><strong>Égalité de traitement</strong> : la même grille pour tous les candidats, quel que soit le canal (y compris les candidatures internes et les cooptations).</li>
<li><strong>Traçabilité</strong> : la grille remplie justifie la décision (art. L1134-1 : l'employeur doit pouvoir prouver que sa décision repose sur des éléments objectifs).</li>
<li><strong>Neutralité</strong> : ne pas tenir compte de la photo, du nom, de l'adresse, de l'âge, de la situation familiale qui figureraient sur le CV ; idéalement, masquer ces éléments.</li>
</ul>

<h3>Modèle – Grille de présélection des CV (REC-2027-004)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère (issu du profil)</th><th>Type</th><th>Indicateurs dans le CV</th><th>Cotation</th><th>Pondération</th></tr>
<tr><td>C1 – Expérience d'encadrement d'une équipe de propreté</td><td>Indispensable</td><td>Intitulés de postes (chef d'équipe, responsable d'équipe), durée, taille de l'équipe</td><td>0 = aucune ; 1 = moins de 2 ans ; 2 = 2 à 5 ans ; 3 = plus de 5 ans</td><td>× 3</td></tr>
<tr><td>C2 – Maîtrise des protocoles de bionettoyage</td><td>Indispensable</td><td>Expérience en établissement de santé, en agroalimentaire, formations hygiène</td><td>0 = aucun indice ; 1 = indice indirect ; 2 = expérience mentionnée ; 3 = expérience significative + formation</td><td>× 3</td></tr>
<tr><td>C3 – Contrôle qualité et traçabilité</td><td>Indispensable</td><td>Mentions de contrôles, d'audits, d'outils qualité</td><td>0 à 3</td><td>× 2</td></tr>
<tr><td>C4 – Formation des agents</td><td>Souhaité</td><td>Accueil de nouveaux, tutorat</td><td>0 à 3</td><td>× 1</td></tr>
<tr><td>C5 – Connaissance du milieu hospitalier</td><td>Souhaité</td><td>Établissements de santé, EHPAD, cliniques</td><td>0 à 3</td><td>× 1</td></tr>
<tr><td>C6 – CQP / titre du secteur</td><td>Souhaité</td><td>Certification mentionnée</td><td>0 ou 3</td><td>× 1</td></tr>
</table>
<p><strong>Règle de décision :</strong> un 0 à un critère indispensable écarte la candidature ; au-delà, score maximal = 3×3 + 3×3 + 3×2 + 3 + 3 + 3 = 33 ; les candidatures à 20 points et plus sont retenues pour la préqualification ; entre 14 et 19, en réserve ; en dessous de 14, réponse négative.</p>
<h4>Application à quatre candidatures</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Candidat</th><th>C1 ×3</th><th>C2 ×3</th><th>C3 ×2</th><th>C4</th><th>C5</th><th>C6</th><th>Total</th><th>Décision</th></tr>
<tr><td>Candidat A</td><td>2 (6)</td><td>3 (9)</td><td>2 (4)</td><td>2</td><td>3</td><td>0</td><td>24</td><td>Préqualification</td></tr>
<tr><td>Candidat B</td><td>3 (9)</td><td>1 (3)</td><td>2 (4)</td><td>3</td><td>0</td><td>3</td><td>22</td><td>Préqualification</td></tr>
<tr><td>Candidat C</td><td>0</td><td>3 (9)</td><td>1 (2)</td><td>0</td><td>3</td><td>0</td><td>—</td><td>Écarté (critère indispensable C1 non rempli) ; à orienter vers un poste d'agent qualifié si intérêt</td></tr>
<tr><td>Candidat D</td><td>1 (3)</td><td>2 (6)</td><td>2 (4)</td><td>1</td><td>2</td><td>0</td><td>16</td><td>Réserve</td></tr>
</table>
<p>Remarque : la candidature C, écartée pour ce poste, peut correspondre à un autre besoin ; avec l'accord du candidat, elle est transmise au recrutement concerné. Les candidats sont désignés par des lettres dans les documents de travail diffusés : seule la base de candidatures contient les identités.</p>

<h3>Accuser réception</h3>
<p>Chaque candidature reçoit un accusé de réception (automatique ou manuel) précisant le délai de traitement. C'est un élément clé de l'image employeur.</p>
<blockquote>Objet : Votre candidature au poste de chef ou cheffe d'équipe propreté (réf. REC-2027-004)<br/>Bonjour [Prénom NOM], nous avons bien reçu votre candidature et vous en remercions. Elle sera étudiée avec attention ; nous reviendrons vers vous au plus tard le [date]. Vos données sont traitées par ALTÉA SERVICES pour le seul besoin de ce recrutement [lien vers l'information RGPD]. Le service RH d'ALTÉA SERVICES.</blockquote>

<h3>La préqualification téléphonique</h3>
<p>Entretien de 10 à 20 minutes destiné à vérifier les éléments essentiels avant de mobiliser le manager : intérêt réel pour le poste, compréhension des conditions (horaires, lieu, contrat), disponibilité, premiers éléments sur les compétences indispensables, prétentions salariales (sans demander le salaire antérieur), questions du candidat. Le candidat est prévenu (prise de rendez-vous par message ou appel court : « Avez-vous 15 minutes maintenant ou préférez-vous que je rappelle ? »).</p>
<p><strong>Modèle – Trame de préqualification</strong></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Questions / contenu</th><th>Notes</th></tr>
<tr><td>Présentation (1 min)</td><td>« Bonjour, [prénom, nom], assistant(e) RH chez ALTÉA SERVICES. Je vous appelle au sujet de votre candidature au poste de chef d'équipe sur un site hospitalier. Est-ce un bon moment ? »</td><td></td></tr>
<tr><td>Présentation du poste (2 min)</td><td>Missions principales, horaires (6 h – 13 h 30, un samedi sur trois), lieu (Bonneuil-sur-Marne), CDI, prise de poste le 22 mars, fourchette de rémunération</td><td></td></tr>
<tr><td>Motivation (2 min)</td><td>« Qu'est-ce qui vous intéresse dans ce poste ? »</td><td></td></tr>
<tr><td>Expérience d'encadrement (4 min)</td><td>« Pouvez-vous me décrire votre dernière expérience d'encadrement : combien de personnes, sur quel type de site, quelles responsabilités ? »</td><td></td></tr>
<tr><td>Bionettoyage (3 min)</td><td>« Quels protocoles de bionettoyage avez-vous appliqués ou fait appliquer ? Dans quel contexte ? »</td><td></td></tr>
<tr><td>Conditions (2 min)</td><td>« Les horaires et le lieu de travail sont-ils compatibles avec votre organisation ? » « À partir de quand seriez-vous disponible ? » « Quelles sont vos prétentions salariales pour ce poste ? »</td><td>Ne pas demander pourquoi (pas de question sur la vie familiale)</td></tr>
<tr><td>Questions du candidat, suite (2 min)</td><td>Répondre ; annoncer la suite et le délai</td><td></td></tr>
<tr><td>Conclusion de l'assistant RH</td><td>☐ Proposer un entretien ☐ Réserve ☐ Ne pas donner suite — motif lié aux critères du profil : …</td><td></td></tr>
</table>
`
      },
      {
        title: "8.6 – Conduire les entretiens de recrutement : guide d'entretien, grille d'évaluation, méthode STAR, questions interdites, tests et synthèse",
        content: `
<h3>Les différents formats d'entretien</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Format</th><th>Usage</th><th>Points de vigilance</th></tr>
<tr><td>Entretien individuel en face à face</td><td>Format de référence</td><td>Durée et structure identiques pour tous les candidats</td></tr>
<tr><td>Entretien en binôme (RH + manager)</td><td>Croiser les regards : le RH sur la motivation, les conditions, le savoir-être ; le manager sur la technique</td><td>Répartir les rôles à l'avance ; un seul pose les questions à la fois ; évaluer séparément avant d'échanger</td></tr>
<tr><td>Entretien en visioconférence</td><td>Premier entretien, candidats éloignés</td><td>Tester la connexion, prévoir une solution de repli (téléphone), lien sécurisé ; ne pas enregistrer sans information et accord</td></tr>
<tr><td>Entretien collectif / session d'information collective</td><td>Recrutements en nombre (agents)</td><td>Annoncer la méthode (L1221-8) ; laisser chacun s'exprimer</td></tr>
</table>

<h3>Le guide d'entretien</h3>
<p>Le guide structure l'entretien et garantit l'égalité de traitement : mêmes thèmes, mêmes questions principales, même durée pour tous. Il découle du profil de poste.</p>
<p><strong>Modèle – Guide d'entretien (chef d'équipe, 50 minutes)</strong></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Séquence</th><th>Durée</th><th>Objectif</th><th>Questions types</th></tr>
<tr><td>1. Accueil</td><td>5 min</td><td>Mettre à l'aise, présenter le déroulé</td><td>Présentation des interlocuteurs, du déroulé (« nous allons vous présenter le poste, puis échanger sur votre parcours et vos expériences ; vous aurez ensuite la parole ») et de la prise de notes</td></tr>
<tr><td>2. Présentation de l'entreprise et du poste</td><td>5 min</td><td>Informer</td><td>Activité, site, équipe, missions, conditions, rémunération, suite du processus</td></tr>
<tr><td>3. Parcours du candidat</td><td>10 min</td><td>Comprendre la trajectoire et la motivation</td><td>« Présentez-nous votre parcours en insistant sur ce qui vous prépare à ce poste. » « Qu'est-ce qui vous attire dans ce poste ? »</td></tr>
<tr><td>4. Compétences indispensables (questions comportementales, méthode STAR)</td><td>20 min</td><td>Vérifier C1 à C4 par des faits</td><td>C1 : « Racontez-nous une situation où vous avez dû réorganiser le travail de votre équipe en urgence. » C2 : « Décrivez une intervention de bionettoyage que vous avez supervisée : quel protocole, quelles étapes, quels contrôles ? » C3 : « Parlez-nous d'un contrôle qualité qui a révélé un problème : qu'avez-vous fait ? » C4 : « Comment avez-vous accueilli et formé le dernier agent arrivé dans votre équipe ? » Savoir-être : « Racontez une situation de tension dans votre équipe et la manière dont vous l'avez gérée. »</td></tr>
<tr><td>5. Mise en situation (cas court)</td><td>5 min</td><td>Observer le raisonnement</td><td>« À 5 h 45, trois agents sur 22 vous préviennent de leur absence ; le bloc opératoire doit être prêt à 7 h 30. Comment organisez-vous la matinée ? »</td></tr>
<tr><td>6. Questions du candidat</td><td>5 min</td><td>Évaluer l'intérêt, informer</td><td>« Quelles questions souhaitez-vous nous poser ? »</td></tr>
<tr><td>7. Conclusion</td><td>2 min</td><td>Annoncer la suite</td><td>Disponibilité, prochaine étape, délai de réponse, remerciements</td></tr>
</table>

<h3>Les techniques de conduite d'entretien</h3>
<h4>La méthode STAR</h4>
<p>Les questions comportementales partent du principe que les comportements passés sont de bons indicateurs des comportements futurs. La méthode STAR aide le recruteur à obtenir un exemple complet et vérifiable :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Lettre</th><th>Signification</th><th>Question de relance</th></tr>
<tr><td>S</td><td>Situation : contexte</td><td>« Où était-ce ? Quand ? Quelle était la configuration ? »</td></tr>
<tr><td>T</td><td>Tâche : objectif ou problème à résoudre</td><td>« Qu'est-ce qui était attendu de vous ? »</td></tr>
<tr><td>A</td><td>Action : ce que le candidat a fait personnellement</td><td>« Qu'avez-vous fait concrètement, vous ? »</td></tr>
<tr><td>R</td><td>Résultat : effets mesurables, enseignements</td><td>« Quel a été le résultat ? Que feriez-vous différemment ? »</td></tr>
</table>
<p>Attention au « nous » : le recruteur relance pour distinguer l'action personnelle du candidat de celle de l'équipe.</p>
<h4>Les types de questions</h4>
<ul>
<li><strong>Ouvertes</strong> (« Comment… ? », « Racontez… ») : majoritaires, elles font parler le candidat.</li>
<li><strong>Fermées</strong> : pour vérifier un fait (« Êtes-vous titulaire du permis B ? » si le poste l'exige).</li>
<li><strong>Situationnelles</strong> (« Que feriez-vous si… ? ») : utiles pour les débutants, moins fiables que les questions comportementales.</li>
<li><strong>À éviter</strong> : questions multiples, questions qui suggèrent la réponse (« Vous êtes rigoureux, n'est-ce pas ? »), questions pièges déstabilisantes sans lien avec le poste.</li>
</ul>
<h4>La posture du recruteur</h4>
<p>Le REAC attend une posture « neutre, constructive et bienveillante ». Le recruteur parle peu (règle indicative : 20 % du temps pour le recruteur, 80 % pour le candidat), écoute activement, reformule, prend des notes factuelles (pas de commentaire sur le physique, l'accent, la tenue), maîtrise le temps, et ne laisse transparaître ni enthousiasme ni désapprobation qui biaiseraient la suite. Il garde à l'esprit les biais cognitifs : <strong>première impression</strong> (décision prise dans les premières minutes), <strong>similarité</strong> (préférence pour qui nous ressemble), <strong>halo</strong>, <strong>contraste</strong> (jugement par comparaison avec le candidat précédent), <strong>confirmation</strong> (chercher ce qui confirme l'impression initiale). Remède : grille structurée, évaluation critère par critère, notation individuelle avant la discussion entre évaluateurs.</p>

<h3>Les questions interdites</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question interdite</th><th>Critère en cause</th><th>Alternative licite (si le besoin est réel)</th></tr>
<tr><td>« Êtes-vous mariée ? Avez-vous des enfants ? Comptez-vous en avoir ? »</td><td>Situation de famille, grossesse, sexe</td><td>« Les horaires sont 6 h – 13 h 30 et un samedi sur trois : sont-ils compatibles avec votre organisation ? »</td></tr>
<tr><td>« Quel âge avez-vous ? Quand pensez-vous partir à la retraite ? »</td><td>Âge</td><td>Aucune ; l'âge n'est demandé qu'au moment de l'embauche pour les formalités</td></tr>
<tr><td>« D'où venez-vous ? Quelle est votre religion ? »</td><td>Origine, convictions religieuses</td><td>Aucune ; si le poste exige une autorisation de travail, la vérification se fait sur pièces, pour tous les candidats concernés</td></tr>
<tr><td>« Êtes-vous syndiqué ? Quelle est votre opinion politique ? »</td><td>Activité syndicale, opinions</td><td>Aucune</td></tr>
<tr><td>« Avez-vous des problèmes de santé ? Êtes-vous souvent malade ? »</td><td>État de santé, handicap</td><td>L'aptitude relève du médecin du travail ; on peut demander si le candidat a besoin d'aménagements pour le processus de recrutement</td></tr>
<tr><td>« Combien gagniez-vous chez votre employeur actuel ? »</td><td>Interdite par la directive 2023/970 (historique de rémunération) ; à proscrire dès maintenant</td><td>« Quelles sont vos prétentions salariales pour ce poste ? »</td></tr>
<tr><td>« Où habitez-vous exactement ? »</td><td>Lieu de résidence</td><td>« Le poste démarre à 6 h à Bonneuil : est-ce compatible avec vos trajets ? »</td></tr>
</table>
<p>Si le candidat aborde spontanément un sujet personnel, le recruteur ne relance pas, ne le note pas et revient aux exigences du poste.</p>

<h3>Tests et mises en situation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Outil</th><th>Usage</th><th>Conditions de validité</th></tr>
<tr><td>Mise en situation professionnelle (sur site, en simulation)</td><td>Observer des savoir-faire réels (contrôle qualité d'un local, utilisation d'une machine, rédaction d'un compte rendu)</td><td>Annoncée (L1221-8), identique pour tous, grille d'observation, durée courte ; si elle se prolonge et constitue un travail productif, elle risque d'être requalifiée en travail effectif</td></tr>
<tr><td>Tests de connaissances (bureautique, réglementation)</td><td>Postes support</td><td>En lien direct avec le poste, résultats confidentiels communiqués au candidat sur demande</td></tr>
<tr><td>Méthode de recrutement par simulation (France Travail)</td><td>Évaluer des habiletés sans exiger d'expérience ou de diplôme</td><td>Exercices conçus par France Travail pour un poste donné ; favorise la diversité</td></tr>
<tr><td>Tests de personnalité</td><td>Plutôt pour des postes d'encadrement</td><td>Outils validés scientifiquement, administrés par des professionnels formés, restitution au candidat ; jamais seuls à fonder la décision</td></tr>
<tr><td>Méthodes non fondées scientifiquement</td><td>Graphologie, astrologie, numérologie, morphopsychologie</td><td>À proscrire : non pertinentes au sens de L1221-8 et risque de discrimination</td></tr>
</table>

<h3>Modèle – Grille d'évaluation d'entretien</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère (issu du profil)</th><th>Pondération</th><th>1 Insuffisant</th><th>2 Partiel</th><th>3 Conforme</th><th>4 Supérieur</th><th>Faits observés (exemples STAR)</th></tr>
<tr><td>C1 Encadrer une équipe</td><td>× 3</td><td>Aucun exemple concret</td><td>Exemples limités (petite équipe, ponctuel)</td><td>Exemples précis d'organisation et de remplacements</td><td>Exemples précis + résultats mesurés + gestion de situations complexes</td><td></td></tr>
<tr><td>C2 Protocoles de bionettoyage</td><td>× 3</td><td>Confusion entre nettoyage et désinfection</td><td>Connaissance générale</td><td>Décrit les étapes et les produits</td><td>Maîtrise + capacité à former et à contrôler</td><td></td></tr>
<tr><td>C3 Contrôle qualité et traçabilité</td><td>× 2</td><td>…</td><td>…</td><td>…</td><td>…</td><td></td></tr>
<tr><td>C4 Former les agents</td><td>× 1</td><td>…</td><td>…</td><td>…</td><td>…</td><td></td></tr>
<tr><td>Organisation (mise en situation)</td><td>× 2</td><td>Pas de priorisation</td><td>Priorisation partielle</td><td>Priorités claires, solution réaliste</td><td>Solution réaliste + communication au client et à la hiérarchie</td><td></td></tr>
<tr><td>Aisance relationnelle</td><td>× 1</td><td>…</td><td>…</td><td>…</td><td>…</td><td></td></tr>
<tr><td colspan="7">Total pondéré : … / 48 — Adéquation aux conditions (horaires, date) : oui / non — Avis : ☐ favorable ☐ réservé ☐ défavorable — Évaluateur : … Date : …</td></tr>
</table>

<h3>Rédiger la synthèse d'entretien pour la décision</h3>
<p>Le REAC demande de « rédiger une synthèse de l'entretien afin de faciliter la prise de décision ». Elle est factuelle, structurée, courte (une page par candidat) et permet la comparaison.</p>
<p><strong>Modèle de synthèse</strong></p>
<blockquote>
<p><strong>Candidat B – Poste REC-2027-004 – Entretien du 2 février 2027 (N. ROUSSEL, cheffe de site)</strong></p>
<p><strong>Points forts :</strong> 6 ans d'encadrement d'équipes de 10 à 25 agents sur des sites tertiaires ; exemple précis de réorganisation lors d'une grève des transports (aucune prestation manquée) ; a formé 12 nouveaux agents en 2025 ; titulaire d'un CQP de la branche.</p>
<p><strong>Points de vigilance :</strong> pas d'expérience en établissement de santé ; connaissance théorique des protocoles de bionettoyage (étapes citées correctement, pas de pratique) ; mise en situation : solution réaliste mais n'a pas prévu d'informer l'équipe d'hygiène de l'établissement.</p>
<p><strong>Conditions :</strong> horaires compatibles ; disponible le 15 mars ; prétentions dans la fourchette.</p>
<p><strong>Score :</strong> 37 / 48. <strong>Avis :</strong> favorable sous réserve d'une formation au bionettoyage en milieu hospitalier dès l'intégration (2 jours) et d'un accompagnement par la cheffe de site le premier mois.</p>
</blockquote>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Tableau comparatif</th><th>Candidat A</th><th>Candidat B</th><th>Candidat E</th></tr>
<tr><td>Score pondéré / 48</td><td>35</td><td>37</td><td>29</td></tr>
<tr><td>Critères indispensables tous ≥ 3</td><td>Oui</td><td>Non (C2 = 2)</td><td>Non</td></tr>
<tr><td>Disponibilité</td><td>1er mars</td><td>15 mars</td><td>1er avril (trop tard)</td></tr>
<tr><td>Besoin de formation</td><td>Faible</td><td>Bionettoyage</td><td>Encadrement</td></tr>
<tr><td>Recommandation</td><td colspan="3">Proposer le poste au candidat A (tous les critères indispensables atteints, disponible avant la prise de poste) ; candidat B en seconde position ; décision finale : cheffe de site et responsable RH</td></tr>
</table>
`
      },
      {
        title: "8.7 – Décision, réponses aux candidats, RGPD, gestion administrative et logistique, promesse d'embauche et offre de contrat",
        content: `
<h3>Répondre à tous les candidats</h3>
<p>Aucune règle du Code du travail n'impose expressément de motiver un refus, mais <strong>répondre à chaque candidat</strong> est une exigence d'image employeur et de respect. Le RGPD impose par ailleurs de l'informer du traitement de ses données et de la durée de conservation. Les réponses négatives sont courtoises, sans motif discriminatoire ni jugement personnel ; si un motif est donné, il porte sur les critères du poste.</p>
<p><strong>Modèle – Réponse négative après entretien</strong></p>
<blockquote>Objet : Votre candidature au poste de chef ou cheffe d'équipe propreté (réf. REC-2027-004)<br/>Bonjour [Prénom NOM], nous vous remercions pour le temps que vous nous avez consacré lors de notre entretien du [date]. Après examen de l'ensemble des candidatures, nous avons retenu un profil dont l'expérience en milieu hospitalier correspond plus directement aux exigences immédiates du poste. Votre parcours d'encadrement a retenu notre attention : sauf opposition de votre part, nous conserverons votre candidature pendant 2 ans au plus pour vous proposer un poste correspondant à votre profil. Vous pouvez à tout moment demander l'accès à vos données, leur rectification ou leur suppression auprès de [contact]. Nous vous souhaitons une pleine réussite dans vos projets. Le service RH d'ALTÉA SERVICES.</blockquote>
<p>Le candidat retenu est contacté par téléphone (offre orale), puis reçoit l'offre écrite. Les autres candidats ne reçoivent leur réponse négative qu'après l'acceptation écrite du candidat retenu, pour ne pas perdre une solution de repli, mais dans le délai annoncé.</p>

<h3>Le RGPD appliqué au recrutement</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Thème</th><th>Règle (référentiel CNIL relatif au recrutement et RGPD)</th></tr>
<tr><td>Finalité</td><td>Gestion des candidatures pour un poste ou pour des postes futurs ; données utilisées uniquement à cette fin</td></tr>
<tr><td>Données collectées</td><td>Limitées à ce qui est nécessaire pour apprécier les compétences : identité et coordonnées, CV, expérience, formation, évaluations ; pas de photo exigée, pas de numéro de sécurité sociale avant l'embauche, pas de données sensibles</td></tr>
<tr><td>Information du candidat</td><td>Identité du responsable de traitement, finalités, base légale, destinataires, durée de conservation, droits (accès, rectification, effacement, opposition, limitation), contact, droit de réclamation auprès de la CNIL ; à fournir dès la collecte (offre, formulaire, accusé de réception)</td></tr>
<tr><td>Durée de conservation</td><td>Candidat non retenu : la CNIL recommande de ne pas conserver les données plus de <strong>2 ans après le dernier contact</strong>, sauf opposition du candidat (qui peut demander la suppression immédiate) ; candidat retenu : les données sont versées dans le dossier du salarié</td></tr>
<tr><td>Destinataires</td><td>Personnes habilitées à intervenir dans le recrutement (RH, manager recruteur) ; prestataires (job board, logiciel, cabinet) liés par un contrat de sous-traitance</td></tr>
<tr><td>Recherches en ligne</td><td>Limitées aux réseaux professionnels et à des informations en lien avec le poste ; information préalable du candidat (L1221-9)</td></tr>
<tr><td>Références</td><td>Contact d'un ancien employeur uniquement avec l'accord du candidat ; questions limitées aux aptitudes professionnelles</td></tr>
<tr><td>Outils automatisés et IA</td><td>Information des candidats et du CSE ; pas de décision fondée exclusivement sur un traitement automatisé ; vérification de l'absence de biais. Le règlement européen sur l'intelligence artificielle classe les systèmes d'IA utilisés pour le recrutement et la sélection parmi les systèmes à haut risque, avec des obligations applicables selon un calendrier progressif (à vérifier)</td></tr>
<tr><td>Sécurité</td><td>Accès restreints, pas de CV imprimés laissés en libre accès, suppression des fichiers en double (messagerie, téléchargements)</td></tr>
</table>

<h3>La gestion administrative et logistique du recrutement</h3>
<h4>Le tableau de suivi des candidatures</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Réf.</th><th>Candidat</th><th>Source</th><th>Reçue le</th><th>AR envoyé</th><th>Score CV</th><th>Préqualif.</th><th>Entretien</th><th>Score</th><th>Décision</th><th>Réponse envoyée</th><th>Suppression prévue le</th></tr>
<tr><td>004-01</td><td>A</td><td>Indeed</td><td>09/01/2027</td><td>09/01</td><td>24</td><td>13/01 – OK</td><td>02/02</td><td>35</td><td>Retenu</td><td>05/02</td><td>Dossier salarié</td></tr>
<tr><td>004-02</td><td>B</td><td>Cooptation</td><td>10/01/2027</td><td>10/01</td><td>22</td><td>14/01 – OK</td><td>02/02</td><td>37</td><td>Réserve</td><td>08/02</td><td>08/02/2029</td></tr>
<tr><td>004-03</td><td>C</td><td>France Travail</td><td>11/01/2027</td><td>11/01</td><td>Écarté C1</td><td>—</td><td>—</td><td>—</td><td>Non retenu</td><td>18/01</td><td>18/01/2029</td></tr>
</table>
<h4>La logistique des entretiens</h4>
<ul>
<li>Planning des entretiens : créneaux bloqués dans l'agenda des évaluateurs, 15 minutes entre deux candidats pour la notation.</li>
<li>Convocation écrite : date, heure, adresse, accès (transports, parking), interlocuteurs, durée, déroulé (entretien, mise en situation), documents à apporter, contact en cas d'empêchement, possibilité de demander des aménagements (handicap).</li>
<li>Salle calme, accueil prévenu, badge visiteur, eau ; pour une mise en situation sur site, autorisation du client, EPI fournis, accompagnement.</li>
<li>Dossier de l'évaluateur : profil de poste, CV, fiche de préqualification, guide, grille vierge.</li>
<li>Remboursement des frais de déplacement des candidats : non obligatoire sauf engagement préalable de l'entreprise ; si l'entreprise s'y engage, l'indiquer dans la convocation.</li>
</ul>
<h4>Le coût du recrutement</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Poste de coût</th><th>Nature</th><th>Exemple de calcul</th></tr>
<tr><td>Coûts externes</td><td>Annonces payantes, cabinet, tests, frais de déplacement remboursés, prime de cooptation</td><td>Somme des factures</td></tr>
<tr><td>Coûts internes</td><td>Temps passé par le RH et les managers (rédaction, tri, préqualification, entretiens, administratif)</td><td>Heures × coût horaire chargé (ex. : 22 h RH + 8 h manager)</td></tr>
<tr><td>Coûts d'intégration</td><td>Formation initiale, temps du tuteur, équipement</td><td>À suivre séparément</td></tr>
<tr><td>Coût par recrutement</td><td>(Coûts externes + coûts internes) / nombre de recrutements réalisés</td><td>Indicateur suivi chaque année</td></tr>
</table>

<h3>Promesse d'embauche ou offre de contrat ?</h3>
<p>Depuis la réforme du droit des contrats (ordonnance du 10 février 2016, art. 1113 et suivants du Code civil) et deux arrêts de la Cour de cassation du 21 septembre 2017, on distingue :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Offre de contrat de travail</th><th>Promesse unilatérale de contrat de travail</th></tr>
<tr><td>Définition</td><td>Acte par lequel l'employeur propose un engagement précisant l'emploi, la rémunération et la date d'entrée en fonction, et exprime sa volonté d'être lié en cas d'acceptation</td><td>Contrat par lequel l'employeur accorde au candidat le droit d'opter pour la conclusion du contrat de travail, dont l'emploi, la rémunération et la date d'entrée en fonction sont déterminés, et pour la formation duquel ne manque que le consentement du bénéficiaire</td></tr>
<tr><td>Rétractation par l'employeur</td><td>Librement possible tant que l'offre n'est pas parvenue au candidat ; après, impossible avant l'expiration du délai fixé (ou d'un délai raisonnable) : la rétractation engage alors la responsabilité extracontractuelle de l'employeur (dommages-intérêts), mais le contrat n'est pas conclu</td><td>La révocation pendant le temps laissé au candidat pour opter n'empêche pas la formation du contrat : le contrat de travail est considéré comme conclu ; la rupture s'analyse en un licenciement sans cause réelle et sérieuse</td></tr>
<tr><td>Précaution</td><td>Fixer un délai de réponse (ex. 8 jours)</td><td>Ne s'engager qu'une fois la décision définitive</td></tr>
</table>
<p><strong>Modèle – Offre de contrat de travail</strong></p>
<blockquote>
<p>Objet : Proposition d'engagement – Chef ou cheffe d'équipe propreté</p>
<p>Madame, Monsieur [NOM], à la suite de nos entretiens, nous avons le plaisir de vous proposer de rejoindre ALTÉA SERVICES aux conditions suivantes : emploi de chef d'équipe, classification [niveau / échelon de la CCN des entreprises de propreté, IDCC 3043] ; contrat à durée indéterminée à temps plein (35 heures hebdomadaires) ; lieu de travail : site hospitalier de Bonneuil-sur-Marne ; rémunération brute mensuelle de [montant] € sur 12 mois ; date d'entrée en fonction : 22 mars 2027 ; période d'essai de [durée conforme au Code du travail et à la convention collective], renouvelable une fois dans les conditions prévues par la convention collective et sous réserve de votre accord écrit.</p>
<p>Cette proposition est valable jusqu'au [date, 8 jours]. Nous vous remercions de nous faire part de votre réponse par écrit avant cette date. Votre engagement définitif sera formalisé par un contrat de travail écrit.</p>
<p>Nathalie ROUSSEL, responsable des ressources humaines</p>
</blockquote>
<p><strong>Rappel sur la période d'essai</strong> (art. L1221-19 et suivants) : durée maximale initiale de 2 mois pour les ouvriers et employés, 3 mois pour les agents de maîtrise et techniciens, 4 mois pour les cadres ; renouvellement une fois si un accord de branche étendu le prévoit et si le contrat le stipule, avec l'accord exprès du salarié ; elle ne se présume pas et doit être fixée dans le contrat ou la lettre d'engagement ; vérifier les durées prévues par la convention collective applicable.</p>

<h3>Les formalités d'embauche (lien avec la CP1)</h3>
<ul>
<li>Déclaration préalable à l'embauche (DPAE) auprès de l'Urssaf via net-entreprises, au plus tôt 8 jours avant l'embauche et au plus tard avant la prise de poste.</li>
<li>Contrat de travail écrit (obligatoire pour un CDD et un temps partiel ; en pratique toujours) et remise des informations principales relatives à la relation de travail dans les délais prévus (art. R1221-34 et suivants).</li>
<li>Inscription au registre unique du personnel, visite d'information et de prévention (ou examen médical d'aptitude si poste à risque), adhésion à la mutuelle, informations sur la prévoyance, documents de paie (transmission à Karim BENSAÏD pour Silae).</li>
<li>Vérification de l'autorisation de travail le cas échéant.</li>
</ul>
`
      },
      {
        title: "8.8 – Intégrer le nouveau collaborateur : pre-boarding, programme d'intégration, livret d'accueil, tutorat, suivi, indicateurs et image employeur",
        content: `
<h3>Pourquoi soigner l'intégration</h3>
<p>Une part importante des ruptures de période d'essai et des démissions précoces s'explique par un accueil défaillant : poste non préparé, absence d'interlocuteur, informations contradictoires, sentiment d'isolement. L'intégration (ou <strong>onboarding</strong>) poursuit trois objectifs : rendre le nouveau collaborateur <strong>opérationnel</strong> rapidement, l'<strong>intégrer socialement</strong> dans l'équipe et l'entreprise, et le <strong>fidéliser</strong>. Elle commence dès l'acceptation de l'offre et se poursuit jusqu'à la fin de la période d'essai, voire au-delà.</p>

<h3>Le pre-boarding : entre l'acceptation et l'arrivée</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Action</th><th>Responsable</th><th>Échéance</th></tr>
<tr><td>Message de bienvenue et informations pratiques (date, heure, lieu, interlocuteur, tenue, documents à apporter)</td><td>Assistant RH</td><td>Dès l'acceptation</td></tr>
<tr><td>Collecte des pièces administratives (pièce d'identité, numéro de sécurité sociale, RIB, justificatifs de qualifications, titre de séjour le cas échéant) par un canal sécurisé</td><td>Assistant RH</td><td>J-15</td></tr>
<tr><td>Contrat, DPAE, inscription au registre du personnel, demande de visite d'information et de prévention</td><td>Assistant RH</td><td>Avant l'arrivée</td></tr>
<tr><td>Commande des équipements : tenue de travail et EPI aux bonnes tailles, téléphone, badge, accès aux applications (Lucca, application qualité)</td><td>Assistant RH / services généraux</td><td>J-10</td></tr>
<tr><td>Désignation du tuteur ou référent, information de l'équipe et du client</td><td>Manager</td><td>J-10</td></tr>
<tr><td>Envoi du livret d'accueil numérique, appel de courtoisie du manager</td><td>Assistant RH / manager</td><td>J-5</td></tr>
</table>

<h3>Modèle – Programme d'intégration (acteurs, étapes, outils)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Période</th><th>Étape / contenu</th><th>Acteurs</th><th>Outils</th></tr>
<tr><td>J1 matin (siège, Créteil)</td><td>Accueil, présentation d'ALTÉA (histoire, activités, organigramme, valeurs), formalités (signature du contrat si non signé, remise des équipements contre émargement), présentation du livret d'accueil, des règles (règlement intérieur, charte informatique), de la sécurité (consignes, document unique, droit d'alerte), des outils numériques</td><td>Assistant RH, responsable RH</td><td>Livret d'accueil, check-list J1, émargement de remise des EPI</td></tr>
<tr><td>J1 après-midi (site)</td><td>Présentation à la cheffe de site, à l'équipe, au client (équipe d'hygiène) ; visite du site, des locaux techniques, des circuits propre/sale</td><td>Cheffe de site, tuteur</td><td>Plan du site, cahier des charges du marché</td></tr>
<tr><td>Semaine 1</td><td>Travail en binôme avec le chef d'équipe d'un autre site (tuteur) ; formation aux protocoles de bionettoyage du site ; prise en main de l'application de contrôle qualité</td><td>Tuteur, formateur interne</td><td>Protocoles, grilles de contrôle, fiche de suivi d'intégration</td></tr>
<tr><td>J+7</td><td>Point d'étape n° 1 : premières impressions, questions, difficultés, besoins</td><td>Manager + assistant RH</td><td>Trame de point d'étape</td></tr>
<tr><td>Semaines 2 à 4</td><td>Prise en charge progressive de l'équipe (d'abord les plannings, puis les contrôles, puis l'animation des briefings) ; formation « bionettoyage en milieu hospitalier » (2 jours)</td><td>Manager, tuteur, organisme de formation</td><td>Plan de montée en compétences</td></tr>
<tr><td>J+30</td><td>Point d'étape n° 2 et remise du <strong>rapport d'étonnement</strong></td><td>Manager + responsable RH</td><td>Trame de rapport d'étonnement</td></tr>
<tr><td>Mois 2</td><td>Autonomie complète ; fixation des premiers objectifs</td><td>Manager</td><td>Fiche d'objectifs</td></tr>
<tr><td>Avant la fin de la période d'essai (en respectant le délai de prévenance de l'art. L1221-25)</td><td>Bilan de fin de période d'essai : évaluation des compétences du profil, décision (confirmation, renouvellement si prévu et accepté par écrit, ou rupture), information du salarié</td><td>Manager + responsable RH</td><td>Grille de bilan de période d'essai</td></tr>
<tr><td>Mois 6</td><td>Entretien de suivi ; questionnaire de satisfaction d'intégration ; rappel de l'entretien de parcours professionnel à réaliser dans la première année</td><td>Assistant RH</td><td>Questionnaire, tableau de suivi EPP</td></tr>
</table>

<h3>Le livret d'accueil</h3>
<p>Document remis à chaque nouvel arrivant (papier et numérique), régulièrement mis à jour (date de version). Sommaire type :</p>
<ol>
<li>Mot de bienvenue de la direction.</li>
<li>ALTÉA SERVICES en bref : histoire, activités, clients, chiffres clés, organigramme, valeurs.</li>
<li>Vos interlocuteurs : RH, paie, planning, manager, tuteur, CSE (élus), référent harcèlement sexuel et agissements sexistes désigné par le CSE, référent handicap s'il existe, service de prévention et de santé au travail.</li>
<li>Votre contrat et votre temps de travail : horaires, badgeage ou déclaration, absences (comment prévenir), congés (règles de pose dans Lucca), heures complémentaires ou supplémentaires.</li>
<li>Votre rémunération : bulletin de paie (lecture commentée), date de versement, mutuelle, prévoyance, remboursement transport, avantages du CSE.</li>
<li>Santé et sécurité : EPI, consignes, conduite à tenir en cas d'accident du travail, produits chimiques et fiches de données de sécurité, droit d'alerte et de retrait.</li>
<li>Vos droits et votre développement : entretiens (annuel, parcours professionnel), formation, CPF, mobilité interne.</li>
<li>Règles de vie : règlement intérieur (extraits essentiels, texte complet affiché et disponible), charte informatique, confidentialité chez les clients, tenue de travail.</li>
<li>Informations pratiques : accès, transports, restauration, numéros utiles.</li>
<li>Protection des données personnelles : traitements RH, droits, contact.</li>
</ol>
<p>Pour une population dont une partie ne maîtrise pas parfaitement l'écrit, ALTÉA prévoit une version illustrée (pictogrammes, photos des EPI), une présentation orale lors de l'accueil et une vérification de la compréhension des consignes de sécurité.</p>

<h3>Le tuteur ou référent</h3>
<p>Le tuteur est un salarié expérimenté, volontaire, désigné pour accompagner le nouvel arrivant : transmission des savoir-faire, réponses aux questions du quotidien, intégration dans l'équipe. Il dispose de temps dédié, d'une feuille de route (compétences à transmettre, calendrier) et participe aux points d'étape. Pour un apprenti ou un salarié en contrat de professionnalisation, un <strong>maître d'apprentissage</strong> ou un <strong>tuteur</strong> est obligatoire, avec des conditions de compétence fixées par les textes.</p>

<h3>Les points de suivi et le rapport d'étonnement</h3>
<p><strong>Trame de point d'étape (J+7, J+30)</strong> : Comment se passent vos premiers jours / semaines ? Ce qui correspond à ce que vous attendiez ; ce qui vous a surpris ; les informations ou outils qui vous manquent ; les difficultés rencontrées ; vos relations avec l'équipe, le tuteur, le client ; les compétences acquises / à acquérir (référence au profil) ; actions décidées (qui, quoi, quand). Le compte rendu est factuel et partagé avec le salarié.</p>
<p><strong>Le rapport d'étonnement</strong> est un document court rédigé par le nouvel arrivant, généralement après 3 à 6 semaines, qui recense son regard neuf sur l'entreprise : points positifs, surprises, incohérences, suggestions d'amélioration. Il valorise le collaborateur et apporte des idées à l'organisation. Règles : le présenter comme une démarche constructive, garantir l'absence de conséquence négative pour son auteur, en restituer les suites.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique du rapport d'étonnement</th><th>Exemple (chef d'équipe recruté)</th></tr>
<tr><td>Ce qui m'a positivement surpris</td><td>La qualité de l'accueil au siège, la disponibilité de la cheffe de site</td></tr>
<tr><td>Ce qui m'a étonné(e)</td><td>Les protocoles du site existent en trois versions différentes</td></tr>
<tr><td>Ce qui m'a manqué</td><td>Un accès à l'application qualité dès le premier jour</td></tr>
<tr><td>Mes suggestions</td><td>Un classeur unique des protocoles validés, daté ; un accès aux applications créé avant l'arrivée</td></tr>
</table>

<h3>Les indicateurs de recrutement et d'intégration</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Formule</th><th>Usage</th></tr>
<tr><td>Délai de recrutement (time to hire)</td><td>Date d'acceptation de l'offre − date de validation du besoin (en jours)</td><td>Réactivité du processus</td></tr>
<tr><td>Délai de pourvoi (time to fill)</td><td>Date d'arrivée − date de validation du besoin</td><td>Organisation des remplacements</td></tr>
<tr><td>Nombre de candidatures par offre et par source</td><td>Comptage par canal</td><td>Efficacité des canaux de sourcing</td></tr>
<tr><td>Taux de transformation</td><td>Candidats retenus en entretien / candidatures reçues ; recrutés / candidats reçus en entretien</td><td>Qualité du ciblage</td></tr>
<tr><td>Taux d'acceptation des offres</td><td>Offres acceptées / offres faites × 100</td><td>Attractivité (rémunération, conditions)</td></tr>
<tr><td>Coût par recrutement</td><td>(Coûts externes + internes) / recrutements</td><td>Budget</td></tr>
<tr><td>Taux de rupture de la période d'essai</td><td>Ruptures pendant la période d'essai (à l'initiative de l'employeur ou du salarié) / embauches × 100</td><td>Qualité du recrutement et de l'intégration</td></tr>
<tr><td>Taux de départ dans les 12 premiers mois</td><td>Départs de salariés ayant moins d'un an d'ancienneté / embauches de la période × 100</td><td>Fidélisation</td></tr>
<tr><td>Taux de recrutement interne</td><td>Postes pourvus en interne / postes pourvus × 100</td><td>Politique de mobilité (lien avec la CP4)</td></tr>
<tr><td>Satisfaction des recrues et des managers</td><td>Questionnaire à 3 ou 6 mois</td><td>Amélioration continue</td></tr>
<tr><td>Indicateurs de diversité</td><td>Répartition femmes-hommes, tranches d'âge, bénéficiaires de l'OETH parmi les candidats et les recrutés (en données agrégées)</td><td>Égalité, non-discrimination</td></tr>
</table>

<h3>Image employeur : les bonnes pratiques à retenir</h3>
<ul>
<li>Des offres exactes, attractives et transparentes sur la rémunération.</li>
<li>Une réponse à chaque candidat, dans le délai annoncé.</li>
<li>Des entretiens ponctuels, préparés, respectueux.</li>
<li>Une expérience candidat soignée (convocations claires, accueil, retour après les tests).</li>
<li>Un onboarding réussi, qui transforme les nouveaux salariés en ambassadeurs (cooptation, avis positifs).</li>
<li>Des salariés associés (témoignages, partage des offres), avec leur accord.</li>
<li>Une veille sur les avis publiés en ligne et des réponses professionnelles.</li>
</ul>
`
      },
      {
        title: "8.9 – Quiz du chapitre",
        content: `
<h3>Questions</h3>
<ol>
<li>Quel article du Code du travail impose que les informations demandées à un candidat présentent un lien direct et nécessaire avec l'emploi proposé ?<br/>a) L1132-1 — b) L1221-6 — c) L1221-19 — d) L6315-1</li>
<li>Laquelle de ces mentions peut figurer dans une offre d'emploi ?<br/>a) « Jeune diplômé de moins de 30 ans » — b) « Femme de ménage » — c) « Horaires : 6 h – 13 h 30, un samedi sur trois » — d) « Photo obligatoire »</li>
<li>Selon la directive (UE) 2023/970, l'employeur :<br/>a) Peut demander le salaire actuel du candidat — b) Doit informer le candidat de la rémunération initiale ou de sa fourchette — c) Doit publier les salaires de tous ses salariés — d) N'a aucune obligation au stade du recrutement</li>
<li>Un critère indispensable du profil de poste :<br/>a) Départage les candidats équivalents — b) Est directement lié à une activité essentielle du poste, et son absence écarte la candidature — c) Peut être ajouté en cours de tri — d) Concerne la personnalité du candidat</li>
<li>Dans la méthode STAR, le « A » désigne :<br/>a) L'attitude du candidat — b) L'action personnellement menée par le candidat — c) L'analyse du recruteur — d) L'avis du manager</li>
<li>Quelle question est licite en entretien ?<br/>a) « Avez-vous des enfants ? » — b) « Quelles sont vos prétentions salariales pour ce poste ? » — c) « Êtes-vous syndiqué ? » — d) « Combien gagnez-vous actuellement ? »</li>
<li>La CNIL recommande de conserver les données d'un candidat non retenu :<br/>a) 6 mois — b) 2 ans au plus après le dernier contact, sauf opposition — c) 5 ans — d) Indéfiniment</li>
<li>L'employeur révoque une promesse unilatérale de contrat de travail pendant le délai d'option du candidat. Conséquence :<br/>a) Aucune — b) Le contrat de travail est considéré comme conclu et la rupture s'analyse en licenciement sans cause réelle et sérieuse — c) Une simple amende — d) Le candidat doit rembourser ses frais</li>
<li>Le rapport d'étonnement est rédigé :<br/>a) Par le manager à la fin de la période d'essai — b) Par le nouvel arrivant, quelques semaines après son arrivée — c) Par le CSE — d) Par l'assistant RH avant l'arrivée</li>
<li>Le taux de rupture de la période d'essai mesure principalement :<br/>a) L'efficacité des canaux de diffusion — b) La qualité du recrutement et de l'intégration — c) Le coût des annonces — d) Le délai de recrutement</li>
</ol>
<h3>Corrigé expliqué</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>b</td><td>L1221-6 : finalité limitée à l'appréciation de la capacité à occuper l'emploi ; lien direct et nécessaire. L1132-1 liste les critères de discrimination ; L1221-19 concerne la période d'essai ; L6315-1 l'entretien de parcours professionnel.</td></tr>
<tr><td>2</td><td>c</td><td>Les horaires sont une condition objective du poste. a) discrimination par l'âge ; b) intitulé genré (L1142-1) ; d) la photo peut fonder une discrimination sur l'apparence ou l'origine.</td></tr>
<tr><td>3</td><td>b</td><td>La directive prévoit l'information sur la rémunération initiale ou sa fourchette et interdit de demander l'historique de rémunération. Transposition en cours en France à l'automne 2026 : vérifier l'état du droit.</td></tr>
<tr><td>4</td><td>b</td><td>Les critères indispensables sont peu nombreux, liés aux activités essentielles et éliminatoires ; les critères souhaités départagent. On ne modifie pas la grille en cours de tri (égalité de traitement).</td></tr>
<tr><td>5</td><td>b</td><td>Situation, Tâche, Action, Résultat : le recruteur fait préciser ce que le candidat a fait lui-même.</td></tr>
<tr><td>6</td><td>b</td><td>Les prétentions pour le poste sont licites ; les autres questions portent sur la situation familiale, l'activité syndicale ou l'historique de rémunération.</td></tr>
<tr><td>7</td><td>b</td><td>Recommandation de la CNIL : 2 ans au plus après le dernier contact, sauf opposition du candidat, qui peut demander la suppression à tout moment.</td></tr>
<tr><td>8</td><td>b</td><td>Cass. soc. 21 septembre 2017 : la révocation de la promesse pendant le délai d'option n'empêche pas la formation du contrat ; la rupture est un licenciement sans cause réelle et sérieuse. Pour une simple offre, la rétractation engage la responsabilité extracontractuelle.</td></tr>
<tr><td>9</td><td>b</td><td>Le nouvel arrivant porte un regard neuf sur l'organisation ; ses observations sont exploitées sans conséquence négative pour lui.</td></tr>
<tr><td>10</td><td>b</td><td>Une rupture de période d'essai révèle souvent une erreur de recrutement (profil, information sur le poste) ou une intégration insuffisante.</td></tr>
</table>
`
      },
      {
        title: "8.10 – Cas pratique corrigé : recruter et intégrer un(e) assistant(e) d'exploitation chez ALTÉA SERVICES",
        content: `
<h3>Énoncé</h3>
<p>Valentin GIRAUD, responsable d'exploitation d'ALTÉA SERVICES, vous transmet par courriel la demande suivante :</p>
<blockquote>« Mélanie COSTA, assistante d'exploitation, part le 30 avril (démission). Il me faut quelqu'un comme elle : une jeune femme dynamique, de préférence habitant Créteil, bac+2 minimum, qui gère les plannings des agents sur notre logiciel, prend les appels des clients et des agents absents à partir de 6 h 30, et prépare les relevés d'heures pour la paie. Mettez l'annonce en ligne dès demain. Je n'ai pas le temps de recevoir trop de monde : trois candidats maximum. »</blockquote>
<p>Informations complémentaires : la fiche de poste d'assistante d'exploitation date de 2021 ; deux agents de propreté ont exprimé lors de leurs entretiens de parcours professionnel un souhait d'évolution vers un poste administratif ; une salariée du service planning travaille à temps partiel (24 h) et souhaite un temps plein ; la direction valide une rémunération brute mensuelle comprise dans une fourchette fixée selon la classification conventionnelle ; horaires : 6 h 30 – 14 h du lundi au vendredi.</p>
<p><strong>Travail demandé :</strong> 1) Analysez la demande et identifiez les points problématiques. 2) Indiquez les alternatives à examiner avant un recrutement externe. 3) Rédigez le profil de poste. 4) Rédigez l'offre d'emploi. 5) Construisez la grille de présélection. 6) Proposez trois questions d'entretien STAR et deux questions à proscrire avec leur reformulation. 7) Établissez le programme d'intégration des trois premières semaines et les points de suivi.</p>

<h3>Corrigé</h3>
<h4>1) Analyse de la demande</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément de la demande</th><th>Problème</th><th>Traitement</th></tr>
<tr><td>« Une jeune femme »</td><td>Discrimination fondée sur l'âge et le sexe (L1132-1, L1142-1 ; art. 225-1 et 225-2 du Code pénal)</td><td>Supprimer ; recadrer avec le manager sur les exigences du poste ; informer la responsable RH</td></tr>
<tr><td>« Dynamique »</td><td>Terme connoté (âge), non observable</td><td>Remplacer par des compétences observables : réactivité dans la gestion des absences, gestion des priorités</td></tr>
<tr><td>« De préférence habitant Créteil »</td><td>Lieu de résidence : critère discriminatoire</td><td>Indiquer le lieu de travail et l'horaire de début (6 h 30) ; c'est au candidat d'apprécier la compatibilité</td></tr>
<tr><td>« Bac+2 minimum »</td><td>Exigence à justifier : le poste nécessite-t-il un diplôme ? Risque d'écarter des profils expérimentés ou internes</td><td>Remplacer par les compétences : maîtrise d'un logiciel de planification, du tableur, expérience en gestion de plannings ; diplôme « apprécié »</td></tr>
<tr><td>« Mettez l'annonce en ligne dès demain »</td><td>Pas d'analyse du besoin, fiche de poste de 2021 non actualisée, priorités internes ignorées</td><td>Proposer un entretien de besoin de 30 minutes, actualiser la fiche, examiner les candidatures internes</td></tr>
<tr><td>« Trois candidats maximum »</td><td>Contrainte acceptable, mais elle impose une présélection rigoureuse et une préqualification téléphonique</td><td>Grille de présélection + préqualification par l'assistant RH ; 3 entretiens avec le manager</td></tr>
</table>

<h4>2) Alternatives à examiner</h4>
<ul>
<li><strong>Priorité du salarié à temps partiel</strong> : la salariée du service planning à 24 h souhaite un temps plein ; elle bénéficie d'une priorité pour l'attribution d'un emploi à temps complet de sa catégorie professionnelle ou équivalent (art. L3123-3). Le poste doit lui être porté à sa connaissance et sa candidature examinée en priorité.</li>
<li><strong>Mobilité interne</strong> : les deux agents ayant exprimé un souhait d'évolution vers un poste administratif sont informés de la publication interne ; leur candidature est évaluée avec la même grille ; une formation d'adaptation (logiciel de planning) peut être envisagée.</li>
<li><strong>Remplacement de transition</strong> : si aucun candidat n'est en poste au 30 avril, intérim de courte durée ou répartition provisoire des tâches.</li>
<li><strong>Organisation</strong> : le départ est l'occasion de vérifier si le poste a évolué (outil de planification, préparation des éléments variables de paie avec Karim BENSAÏD).</li>
</ul>

<h4>3) Profil de poste</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th colspan="2">PROFIL DE POSTE – Assistant ou assistante d'exploitation (H/F) – Siège, Créteil – Réf. REC-2027-011</th></tr>
<tr><td>Contexte</td><td>Remplacement à la suite d'un départ au 30 avril ; prise de poste souhaitée le 19 avril (transmission de 2 semaines)</td></tr>
<tr><td>Rattachement</td><td>Responsable d'exploitation</td></tr>
<tr><td>Missions clés</td><td>Établir et mettre à jour les plannings des agents dans le logiciel de planification ; traiter les appels des agents (absences) et des clients dès 6 h 30 et organiser les remplacements ; préparer les relevés d'heures et les éléments variables transmis à la paie ; assurer le suivi administratif des sites (commandes, bons d'intervention)</td></tr>
<tr><td>Compétences indispensables</td><td>1. Construire et ajuster des plannings sous contrainte (absences, horaires, compétences) ; 2. Utiliser un tableur (filtres, tris, formules simples) et un logiciel métier ; 3. Gérer des appels en situation d'urgence avec calme et courtoisie ; 4. Saisir des données avec rigueur (relevés d'heures)</td></tr>
<tr><td>Compétences souhaitées</td><td>Connaissance du secteur de la propreté ou des services ; notions de temps de travail et d'éléments variables de paie ; expérience d'un logiciel de planification</td></tr>
<tr><td>Formation</td><td>Niveau baccalauréat ou expérience équivalente ; BTS du tertiaire apprécié</td></tr>
<tr><td>Conditions</td><td>CDI, 35 h, du lundi au vendredi de 6 h 30 à 14 h ; siège à Créteil ; rémunération dans la fourchette validée par la direction selon la classification de la CCN des entreprises de propreté</td></tr>
</table>

<h4>4) Offre d'emploi</h4>
<blockquote>
<p><strong>ASSISTANT OU ASSISTANTE D'EXPLOITATION – PLANNING (H/F) – CDI – CRÉTEIL (94)</strong></p>
<p>ALTÉA SERVICES, entreprise de propreté et de services aux entreprises (148 salariés, Val-de-Marne), recherche son assistant ou son assistante d'exploitation. Au cœur de l'organisation de nos équipes, vous êtes l'interlocuteur quotidien des agents et des clients.</p>
<p><strong>Vos missions :</strong> établir et mettre à jour les plannings de nos agents dans notre logiciel de planification ; répondre dès 6 h 30 aux appels des agents et des clients et organiser les remplacements en cas d'absence ; préparer les relevés d'heures et les éléments transmis au service paie ; assurer le suivi administratif des sites.</p>
<p><strong>Votre profil :</strong> vous savez construire un planning sous contrainte et réagir vite quand une absence survient ; vous utilisez couramment un tableur et apprenez facilement un logiciel métier ; vous êtes rigoureux ou rigoureuse dans la saisie des données ; vous restez calme et courtois au téléphone, y compris dans l'urgence. Une expérience dans la propreté ou les services, ou des notions de gestion des temps, seraient un plus. Niveau baccalauréat ou expérience équivalente.</p>
<p><strong>Conditions :</strong> CDI à temps plein, du lundi au vendredi de 6 h 30 à 14 h. Poste basé au siège à Créteil (accessible en transports en commun). Rémunération : [fourchette brute validée] selon expérience. Mutuelle, prise en charge de 50 % de l'abonnement de transport public. Prise de poste le 19 avril 2027 avec deux semaines de transmission.</p>
<p><strong>Processus :</strong> échange téléphonique de 15 minutes avec le service RH, puis entretien d'une heure avec le responsable d'exploitation, comprenant un exercice de planning de 20 minutes. Réponse sous 10 jours après l'entretien.</p>
<p>Candidature (CV, lettre facultative) via [canal], réf. REC-2027-011, avant le [date]. ALTÉA SERVICES s'engage pour la diversité ; ce poste est ouvert à toutes et à tous, y compris aux personnes en situation de handicap (aménagements possibles sur demande). Données traitées pour la gestion de votre candidature et conservées 2 ans au plus après le dernier contact. Offre publiée le [date].</p>
</blockquote>

<h4>5) Grille de présélection</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Type</th><th>Cotation (0 à 3)</th><th>Pondération</th></tr>
<tr><td>Plannings sous contrainte (expérience de planification d'équipes, d'agendas, de tournées)</td><td>Indispensable</td><td>0 aucune ; 1 ponctuelle ; 2 régulière ; 3 cœur de métier</td><td>× 3</td></tr>
<tr><td>Tableur et logiciel métier</td><td>Indispensable</td><td>0 à 3</td><td>× 2</td></tr>
<tr><td>Accueil téléphonique / gestion de l'urgence</td><td>Indispensable</td><td>0 à 3</td><td>× 2</td></tr>
<tr><td>Saisie rigoureuse de données (relevés, éléments variables)</td><td>Indispensable</td><td>0 à 3</td><td>× 2</td></tr>
<tr><td>Connaissance du secteur propreté / services</td><td>Souhaité</td><td>0 à 3</td><td>× 1</td></tr>
<tr><td>Notions de temps de travail et de paie</td><td>Souhaité</td><td>0 à 3</td><td>× 1</td></tr>
</table>
<p>Score maximal : 9 + 6 + 6 + 6 + 3 + 3 = 33. Un 0 à un critère indispensable écarte la candidature. Les candidatures internes (salariée à temps partiel prioritaire, agents) sont évaluées avec la même grille ; la salariée à temps partiel, prioritaire, est reçue en entretien si elle remplit les critères indispensables. Les 3 meilleurs profils après préqualification sont présentés au responsable d'exploitation, avec leur grille.</p>

<h4>6) Questions d'entretien</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Question STAR</th></tr>
<tr><td>Planning sous contrainte</td><td>« Racontez-moi une journée où plusieurs personnes étaient absentes en même temps : quelle était la situation, que deviez-vous garantir, qu'avez-vous fait, quel a été le résultat ? »</td></tr>
<tr><td>Gestion de l'urgence au téléphone</td><td>« Décrivez un appel difficile d'un client mécontent que vous avez traité : comment avez-vous réagi et comment cela s'est-il terminé ? »</td></tr>
<tr><td>Rigueur dans la saisie</td><td>« Parlez-moi d'une erreur de saisie que vous avez détectée (la vôtre ou celle d'un autre) : comment l'avez-vous repérée et corrigée, et qu'avez-vous mis en place ensuite ? »</td></tr>
</table>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question à proscrire</th><th>Reformulation licite</th></tr>
<tr><td>« Avez-vous des enfants à faire garder le matin ? »</td><td>« Le poste commence à 6 h 30 du lundi au vendredi : ces horaires sont-ils compatibles avec votre organisation ? »</td></tr>
<tr><td>« Combien gagnez-vous dans votre poste actuel ? »</td><td>« Quelles sont vos prétentions salariales pour ce poste ? » (la fourchette ayant été annoncée dans l'offre)</td></tr>
</table>

<h4>7) Programme d'intégration et points de suivi</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Moment</th><th>Contenu</th><th>Acteurs</th><th>Outils</th></tr>
<tr><td>Avant l'arrivée</td><td>Courriel de bienvenue, collecte des pièces, contrat, DPAE, création des accès (logiciel de planning, messagerie, Lucca), poste de travail et téléphone prêts, information de l'équipe</td><td>Assistant RH, informatique, responsable d'exploitation</td><td>Check-list pre-boarding</td></tr>
<tr><td>J1</td><td>Accueil RH (livret d'accueil, règlement intérieur, charte informatique, confidentialité des données des agents), présentation de l'équipe du siège, visite ; après-midi en binôme avec Mélanie COSTA</td><td>Assistant RH, responsable d'exploitation, Mélanie COSTA</td><td>Livret d'accueil, check-list J1</td></tr>
<tr><td>Semaine 1</td><td>Binôme : observation puis réalisation accompagnée des plannings ; liste des sites, des clients, des contacts ; procédure de gestion des absences ; visite de deux sites</td><td>Mélanie COSTA (passation), responsable d'exploitation</td><td>Dossier de passation, procédures écrites</td></tr>
<tr><td>J+7</td><td>Point d'étape n° 1</td><td>Responsable d'exploitation + assistant RH</td><td>Trame de point d'étape</td></tr>
<tr><td>Semaine 2</td><td>Prise en charge des plannings en autonomie avec supervision ; préparation des relevés d'heures avec Karim BENSAÏD (gestionnaire paie) : calendrier de paie, éléments variables, contrôles</td><td>Mélanie COSTA, Karim BENSAÏD</td><td>Calendrier de paie, modèle de relevé</td></tr>
<tr><td>Semaine 3</td><td>Autonomie complète (départ de Mélanie COSTA le 30 avril) ; un référent désigné pour les questions (responsable d'exploitation)</td><td>Responsable d'exploitation</td><td>Fiche de suivi d'intégration</td></tr>
<tr><td>J+30</td><td>Point d'étape n° 2, remise du rapport d'étonnement</td><td>Responsable d'exploitation + responsable RH</td><td>Trame de rapport d'étonnement</td></tr>
<tr><td>Avant la fin de la période d'essai (délai de prévenance respecté)</td><td>Bilan de période d'essai sur les critères du profil ; décision écrite</td><td>Responsable d'exploitation + responsable RH</td><td>Grille de bilan</td></tr>
<tr><td>Dans l'année suivant l'embauche</td><td>Premier entretien de parcours professionnel (réforme 2025)</td><td>Responsable d'exploitation ou RH</td><td>Tableau de suivi des EPP</td></tr>
</table>
<p><strong>Conclusion du cas.</strong> La réponse de l'assistant RH au responsable d'exploitation doit être diplomatique et argumentée : proposer un entretien de besoin rapide, expliquer que certaines mentions exposeraient l'entreprise à un risque pénal et d'image, présenter les candidatures internes prioritaires, et garantir que seuls trois candidats lui seront présentés grâce à la grille et à la préqualification. Cette démarche répond aux critères du référentiel : profil précis et synthétique, législation respectée, grille cohérente avec le profil, programme d'intégration prévoyant acteurs, étapes et outils, confidentialité.</p>
`
      }
    ]
  }
];
