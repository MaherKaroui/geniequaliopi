import type { CourseChapter } from "../courseContent";

export const ARH41366_PARTIE5: CourseChapter[] = [
  {
    title: "Chapitre 9 – CP6 : contribuer à l'élaboration et au suivi du développement des compétences du personnel",
    description:
      "Bloc de compétences BC02 / CCP2 « Contribuer au développement des ressources humaines », compétence professionnelle n° 6 du titre ARH (49 h au CFA). Le chapitre suit le processus décrit par le REAC : recueillir les demandes de formation dans le cadre des axes de l'entreprise et du droit en vigueur, consulter les opérateurs de formation, renseigner les salariés sur les dispositifs, informer managers et personnels des actions retenues, gérer le traitement administratif, la logistique et le suivi budgétaire, puis s'assurer du retour qualitatif des actions. Il couvre le cadre légal issu de la loi du 5 septembre 2018 (obligations d'adaptation et de maintien dans l'emploi, plan de développement des compétences, formations obligatoires et non obligatoires, formation pendant ou hors temps de travail), les acteurs (France compétences, AKTO pour la branche de la propreté, Transitions Pro, CEP, Qualiopi), les dispositifs et financements (plan, CPF et participation forfaitaire, abondements, CPF de transition, période de reconversion qui remplace Pro-A et Transitions collectives depuis le 1er février 2026, contrat de professionnalisation, apprentissage, FNE-Formation), la contribution unique (CUFPA), le chiffrage détaillé d'un plan, la sélection des prestataires, le suivi des prises en charge OPCO, l'évaluation selon le modèle de Kirkpatrick, la consultation du CSE, la BDESE, la DPEF devenue rapport de durabilité (CSRD) et la QVCT. Fil rouge : ALTÉA SERVICES (148 salariés, IDCC 3043). Le chapitre se termine par un quiz de 10 questions corrigé et un cas pratique corrigé.",
    sections: [
      {
        title: "9.1 – Le cadre légal du développement des compétences",
        content: `<h3>Ce que le référentiel attend de l'assistant RH</h3>
<p>La fiche compétence n° 6 du REAC fixe quatre critères de performance qui serviront de fil conducteur à tout le chapitre :</p>
<ul>
<li><strong>Les cadres juridiques et conventionnels sont respectés</strong> : Code du travail (sixième partie, livre III), convention collective, accords d'entreprise.</li>
<li><strong>Les documents liés au développement des compétences sont renseignés de façon exhaustive</strong> : recueil des besoins, plan, conventions, convocations, feuilles d'émargement, demandes de prise en charge, attestations, évaluations.</li>
<li><strong>Les informations transmises sont fiables</strong> : un salarié mal renseigné sur ses droits CPF ou un manager à qui l'on annonce un financement qui n'existe pas, c'est une erreur professionnelle.</li>
<li><strong>Les règles de confidentialité sont respectées</strong> : un projet de reconversion, un bilan de compétences ou une formation liée à une inaptitude relèvent de la vie privée du salarié.</li>
</ul>
<p>Les savoirs associés sont explicitement listés : législation de la formation professionnelle continue, dispositifs et financements, BDES (aujourd'hui BDESE) et DPEF, qualité de vie au travail. Les savoir-faire : assurer une veille, établir les dossiers, calculer les coûts de formation, élaborer un questionnaire d'évaluation, planifier les actions et en assurer le suivi, sélectionner les actions et gérer la relation avec les prestataires et la branche professionnelle.</p>

<h3>La loi du 5 septembre 2018 « pour la liberté de choisir son avenir professionnel »</h3>
<p>La loi n° 2018-771 du 5 septembre 2018 a profondément réorganisé le système. Les points à retenir pour l'assistant RH :</p>
<ul>
<li>Le <strong>plan de formation</strong> devient le <strong>plan de développement des compétences</strong> ; les anciennes catégories (adaptation, développement des compétences) disparaissent au profit de la distinction formations obligatoires / non obligatoires.</li>
<li>Le <strong>CPF</strong> est monétisé : il est alimenté en euros et non plus en heures, et le salarié l'utilise directement via la plateforme Mon Compte Formation gérée par la Caisse des dépôts.</li>
<li>Les OPCA sont remplacés par onze <strong>OPCO</strong> (opérateurs de compétences), organisés par filières économiques.</li>
<li><strong>France compétences</strong> devient l'unique instance nationale de gouvernance et de régulation.</li>
<li>L'apprentissage est libéralisé : tout organisme peut ouvrir un CFA, le financement se fait au contrat (niveau de prise en charge, NPEC).</li>
<li>La définition de l'<strong>action de formation</strong> est élargie : « un parcours pédagogique permettant d'atteindre un objectif professionnel » (article L6313-2), qui peut être réalisé en tout ou partie à distance ou en situation de travail (AFEST).</li>
<li>La <strong>certification qualité</strong> unique (Qualiopi) devient obligatoire pour accéder aux fonds publics et mutualisés (article L6316-1).</li>
</ul>
<p>L'article L6313-1 énumère les quatre catégories d'actions concourant au développement des compétences : les actions de formation, les bilans de compétences, les actions permettant de faire valider les acquis de l'expérience (VAE) et les actions de formation par apprentissage.</p>

<h3>Les obligations de l'employeur : adaptation et maintien dans l'emploi</h3>
<p>L'article <strong>L6321-1</strong> du Code du travail pose deux obligations à la charge de tout employeur, quelle que soit sa taille :</p>
<ol>
<li><strong>Assurer l'adaptation des salariés à leur poste de travail</strong> : lorsqu'une nouvelle machine, un nouveau produit ou un nouveau logiciel est introduit, l'employeur doit former le salarié à son utilisation.</li>
<li><strong>Veiller au maintien de leur capacité à occuper un emploi</strong>, au regard notamment de l'évolution des emplois, des technologies et des organisations.</li>
</ol>
<p>Le même article précise que l'employeur <em>peut</em> proposer des formations qui participent au développement des compétences, y compris numériques, ainsi qu'à la lutte contre l'illettrisme. La jurisprudence sanctionne le manquement à l'obligation d'adaptation : un salarié resté de nombreuses années sans aucune formation peut obtenir des dommages et intérêts, et un licenciement pour insuffisance professionnelle peut être contesté si l'employeur n'a pas formé le salarié aux évolutions de son poste.</p>
<blockquote>Chez ALTÉA SERVICES, le passage aux autolaveuses autoportées sur le site d'un client logisticien impose de former les agents concernés à la conduite et à l'entretien de ces machines : c'est une formation d'adaptation au poste, à la charge de l'employeur, réalisée pendant le temps de travail.</blockquote>

<h3>Le plan de développement des compétences</h3>
<p>Le plan de développement des compétences recense l'ensemble des actions de formation, bilans, VAE et actions d'accompagnement mises en place par l'employeur au bénéfice de ses salariés. Il n'a pas de forme imposée par la loi : c'est un document de gestion interne. Son élaboration est en revanche encadrée :</p>
<ul>
<li>dans les entreprises d'au moins 50 salariés, le CSE est consulté sur la politique sociale, qui inclut la formation professionnelle (article L2312-26), et sur les orientations stratégiques, qui incluent les orientations de la formation (article L2312-24) ;</li>
<li>il doit intégrer les formations obligatoires (sécurité, habilitations, obligations conventionnelles) ;</li>
<li>il doit permettre d'honorer l'obligation d'adaptation et de maintien dans l'emploi ;</li>
<li>il doit tenir compte des entretiens professionnels (article L6315-1), qui recensent les besoins et projets des salariés.</li>
</ul>

<h3>Formations obligatoires et formations non obligatoires</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th></th><th>Formation obligatoire</th><th>Formation non obligatoire</th></tr>
<tr><td>Définition</td><td>Action qui conditionne l'exercice d'une activité ou d'une fonction en application d'une convention internationale ou de dispositions légales et réglementaires (article L6321-2)</td><td>Toute autre action du plan (adaptation non imposée par un texte, développement des compétences, préparation à une évolution)</td></tr>
<tr><td>Exemples ALTÉA</td><td>Formation à la sécurité à l'embauche (L4141-2), formation aux risques chimiques des produits utilisés, habilitation électrique pour les agents intervenant à proximité d'installations électriques, formation des membres du CSE en santé, sécurité et conditions de travail</td><td>Bureautique pour l'assistante d'exploitation, management pour les chefs d'équipe, anglais professionnel pour le responsable grands comptes</td></tr>
<tr><td>Temps</td><td>Temps de travail effectif, rémunération maintenue</td><td>En principe temps de travail effectif avec maintien de la rémunération ; peut se dérouler hors temps de travail dans les conditions de l'article L6321-6</td></tr>
</table>

<h3>Formation pendant ou hors temps de travail</h3>
<p>Par principe, toute formation suivie à l'initiative de l'employeur constitue du <strong>temps de travail effectif</strong> et donne lieu au maintien de la rémunération (article L6321-2). Le salarié en formation reste sous la subordination de l'employeur : refuser sans motif légitime de suivre une formation prévue pendant le temps de travail peut constituer une faute.</p>
<p>Les formations <strong>non obligatoires</strong> peuvent se dérouler en tout ou partie <strong>hors du temps de travail</strong> (article L6321-6) :</p>
<ul>
<li>soit dans la limite d'un plafond fixé par accord collectif d'entreprise ou, à défaut, de branche ;</li>
<li>soit, à défaut d'accord, dans la limite de <strong>30 heures par an et par salarié</strong> (ou 2 % du forfait pour les salariés en forfait jours ou heures sur l'année), avec l'<strong>accord écrit du salarié</strong>, qui peut être dénoncé.</li>
</ul>
<p>Le refus du salarié de participer à une formation hors temps de travail, ou la dénonciation de son accord, ne constitue ni une faute ni un motif de licenciement. Les heures suivies hors temps de travail ne sont pas rémunérées et ne donnent plus lieu, depuis 2019, au versement d'une allocation de formation ; le salarié reste couvert par la législation des accidents du travail pendant la formation.</p>

<h3>Le lien avec l'entretien professionnel</h3>
<p>L'entretien individuel consacré aux perspectives d'évolution (article L6315-1), traité au chapitre consacré à CP4, est la principale source individuelle de besoins. La loi du 24 octobre 2025, qui transpose les accords nationaux interprofessionnels sur l'emploi des salariés expérimentés, a transformé l'entretien professionnel en <strong>entretien de parcours professionnel</strong> :</p>
<ul>
<li>un premier entretien dans l'année qui suit l'embauche, puis un entretien tous les <strong>quatre ans</strong> ;</li>
<li>un <strong>état des lieux récapitulatif</strong> du parcours tous les <strong>huit ans</strong> ;</li>
<li>un entretien de <strong>mi-carrière</strong> autour de 45 ans et un entretien dans les deux années précédant les <strong>60 ans</strong>, qui aborde notamment les conditions de fin de carrière ;</li>
<li>dans les entreprises d'au moins 50 salariés, l'<strong>abondement correctif</strong> de 3 000 euros sur le CPF est maintenu lorsque le salarié n'a pas bénéficié, sur la période de l'état des lieux, des entretiens prévus et d'au moins une formation non obligatoire.</li>
</ul>
<p>L'assistant RH croise donc le tableau des entretiens et le tableau des formations suivies pour repérer les salariés exposés. <strong>Point de veille</strong> : les modalités précises (dispositions transitoires pour les entretiens réalisés sous l'ancien régime biennal, entretiens au retour de certaines absences, contenu obligatoire) sont à vérifier sur legifrance.gouv.fr dans la rédaction en vigueur de l'article L6315-1 avant toute campagne.</p>

<h3>La place de la convention collective : IDCC 3043</h3>
<p>ALTÉA SERVICES applique la convention collective nationale des entreprises de propreté et services associés (IDCC 3043). La branche négocie des accords sur la formation professionnelle (priorités, certifications de branche, éventuelles contributions conventionnelles, certifications éligibles à la période de reconversion). L'assistant RH ne doit jamais présumer du contenu de ces accords : il les consulte sur Légifrance (rubrique « Conventions collectives ») ou sur le site de l'OPCO de rattachement, et il vérifie leur date d'extension.</p>`,
      },
      {
        title: "9.2 – Les acteurs de la formation professionnelle",
        content: `<h3>Vue d'ensemble</h3>
<p>Pour orienter un salarié ou monter un dossier de financement, l'assistant RH doit savoir « qui fait quoi ». Le schéma ci-dessous se lit de haut en bas : l'État et les partenaires sociaux fixent les règles, France compétences régule et répartit, les opérateurs financent et conseillent, les organismes de formation réalisent.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Acteur</th><th>Rôle</th><th>Utilité concrète pour l'assistant RH</th></tr>
<tr><td>Ministère chargé de la formation professionnelle, DREETS</td><td>Fixe la réglementation, contrôle les organismes de formation, enregistre les déclarations d'activité, organise les sessions de titres professionnels</td><td>Vérifier qu'un organisme dispose d'un numéro de déclaration d'activité ; connaître le cadre des titres professionnels</td></tr>
<tr><td>France compétences</td><td>Instance nationale de régulation et de financement : répartit les fonds, fixe les recommandations sur les NPEC de l'apprentissage, tient le RNCP et le Répertoire spécifique (RS), désigne les opérateurs du conseil en évolution professionnelle des actifs occupés</td><td>Vérifier qu'une certification est active (code, date de fin), donc éligible au CPF</td></tr>
<tr><td>OPCO (11 opérateurs de compétences)</td><td>Financent l'alternance (apprentissage, contrat de professionnalisation) et la période de reconversion, le plan des entreprises de moins de 50 salariés, appuient techniquement les branches et les TPE-PME</td><td>Déposer les contrats d'apprentissage et de professionnalisation, demander les prises en charge, obtenir un appui-conseil</td></tr>
<tr><td>Caisse des dépôts</td><td>Gère le CPF et la plateforme Mon Compte Formation, y compris l'espace des employeurs et financeurs (EDEF) pour les abondements</td><td>Abonder le CPF d'un salarié dans le cadre d'un projet co-construit</td></tr>
<tr><td>Transitions Pro (associations régionales)</td><td>Instruisent et financent les projets de transition professionnelle (CPF de transition), attestent le caractère réel et sérieux des projets des démissionnaires</td><td>Orienter un salarié qui veut se reconvertir ; traiter sa demande d'absence</td></tr>
<tr><td>Opérateurs du CEP</td><td>Conseil en évolution professionnelle gratuit et confidentiel pour tout actif</td><td>Orienter un salarié qui s'interroge sur son projet, sans que l'employeur en soit informé</td></tr>
<tr><td>France Travail</td><td>Accompagne les demandeurs d'emploi, finance certaines formations préalables à l'embauche (POEI, AFPR)</td><td>Former un candidat avant son embauche sur un métier en tension</td></tr>
<tr><td>Régions</td><td>Financent la formation des demandeurs d'emploi, l'orientation, certaines aides à l'apprentissage</td><td>Repérer des actions collectives territoriales</td></tr>
<tr><td>Organismes de formation et CFA</td><td>Conçoivent et réalisent les actions ; doivent être certifiés Qualiopi pour accéder aux fonds publics et mutualisés</td><td>Prestataires à consulter, à comparer et à évaluer</td></tr>
<tr><td>CSE</td><td>Consulté sur les orientations stratégiques et la politique sociale, dont la formation</td><td>Préparer les informations de la BDESE et le bilan des actions</td></tr>
</table>

<h3>L'OPCO de rattachement d'ALTÉA SERVICES</h3>
<p>Le rattachement à un OPCO dépend de la <strong>branche professionnelle</strong>, donc de la convention collective appliquée. La branche de la propreté et des services associés (IDCC 3043) relève d'<strong>AKTO</strong>, l'opérateur de compétences des services à forte intensité de main-d'œuvre (qui regroupe notamment la propreté, le travail temporaire, l'hôtellerie-restauration et la sécurité privée). C'est donc auprès d'AKTO (akto.fr) qu'ALTÉA SERVICES dépose ses contrats d'alternance et ses demandes de prise en charge. Attention à ne pas confondre avec l'OPCO EP (entreprises de proximité), auquel sont rattachées d'autres branches de services.</p>
<p><strong>Méthode de vérification</strong> (à appliquer pour toute entreprise) : identifier l'IDCC sur les bulletins de paie ou dans la DSN, puis consulter la liste des branches adhérentes publiée par l'OPCO, ou le site du ministère chargé du travail qui récapitule les rattachements. En cas de doute (entreprise multi-activités, absence de convention), l'activité principale détermine le rattachement.</p>

<h3>France compétences en pratique</h3>
<p>Le site francecompetences.fr permet de rechercher une certification par son code (par exemple RNCP41366 pour le titre ARH). La fiche indique le certificateur, le niveau, les blocs de compétences, les voies d'accès, les dates d'enregistrement et de fin de validité. Une certification dont la date de fin est dépassée n'est plus éligible au CPF pour de nouvelles entrées : c'est le premier contrôle avant d'accepter un devis « certifiant ».</p>

<h3>Le conseil en évolution professionnelle (CEP)</h3>
<p>Le CEP (article L6111-6) est un service gratuit, accessible à tout actif, qui aide à faire le point, à formaliser un projet et à identifier les financements. Il est assuré pour les salariés par des opérateurs régionaux sélectionnés par France compétences, pour les demandeurs d'emploi par France Travail, et également par l'Apec pour les cadres et par les Cap emploi pour les personnes en situation de handicap. L'assistant RH oriente vers le CEP mais n'a pas accès aux échanges, qui restent confidentiels.</p>

<h3>Transitions Pro</h3>
<p>Les associations Transitions Pro, présentes dans chaque région, instruisent les demandes de <strong>projet de transition professionnelle</strong> (CPF de transition) : elles examinent la pertinence du projet, la cohérence de la formation et les perspectives d'emploi, puis prennent en charge les frais pédagogiques et la rémunération dans les conditions réglementaires. Elles attestent aussi le caractère réel et sérieux du projet professionnel d'un salarié démissionnaire qui souhaite bénéficier de l'assurance chômage.</p>

<h3>Qualiopi : ce que l'assistant RH doit vérifier</h3>
<p>Depuis le 1er janvier 2022, les organismes qui veulent bénéficier de fonds publics ou mutualisés (OPCO, CPF, Transitions Pro, État, régions, France Travail, Agefiph) doivent être certifiés sur la base du <strong>référentiel national qualité</strong> (article L6316-1). La certification est délivrée par un organisme certificateur accrédité par le COFRAC, pour une ou plusieurs catégories d'actions : actions de formation, bilans de compétences, VAE, apprentissage.</p>
<p>Le référentiel s'organise en 7 critères (information du public, conception des prestations, adaptation et suivi, moyens pédagogiques, qualification des intervenants, inscription dans l'environnement professionnel, recueil des appréciations et réclamations), déclinés en indicateurs. Une révision du référentiel a été publiée en 2026 (décret n° 2026-728) : vérifiez la liste à jour des indicateurs sur travail-emploi.gouv.fr. Les indicateurs utiles côté client sont notamment ceux qui imposent à l'organisme d'informer sur les prérequis, les objectifs, la durée, les modalités, les tarifs, les délais d'accès, l'accessibilité aux personnes handicapées, les résultats obtenus, et ceux qui imposent le recueil des appréciations des bénéficiaires.</p>
<p>Contrôles à réaliser sur un devis :</p>
<ol>
<li>Le certificat est-il en cours de validité ? (date de fin sur le certificat, et consultation de la liste publique)</li>
<li>Couvre-t-il la bonne catégorie ? (un organisme certifié pour les seules « actions de formation » ne peut pas être financé par fonds mutualisés pour un bilan de compétences)</li>
<li>Le numéro de déclaration d'activité (NDA) est-il actif ? (liste publique des organismes de formation sur data.gouv.fr)</li>
<li>Le numéro SIRET du devis correspond-il à celui de la déclaration ?</li>
</ol>
<blockquote>Point d'attention : la certification Qualiopi n'est pas obligatoire pour un organisme financé uniquement sur les fonds propres de l'entreprise. Mais ALTÉA SERVICES a choisi, dans sa politique achats, de n'acheter que des prestations certifiées : cela facilite les demandes de financement et sécurise la qualité.</blockquote>`,
      },
      {
        title: "9.3 – Dispositifs, financements et contribution unique (CUFPA)",
        content: `<h3>Panorama des dispositifs</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Dispositif</th><th>Initiative</th><th>Public</th><th>Financement</th><th>Rôle de l'assistant RH</th></tr>
<tr><td>Plan de développement des compétences</td><td>Employeur</td><td>Tous les salariés</td><td>Budget de l'entreprise ; OPCO pour les entreprises de moins de 50 salariés (fonds mutualisés, selon les priorités et plafonds fixés par l'OPCO)</td><td>Recueil, chiffrage, organisation, suivi</td></tr>
<tr><td>CPF</td><td>Salarié (éventuellement co-construit avec l'employeur)</td><td>Tout actif à partir de 16 ans</td><td>Droits du salarié ; abondements possibles (employeur, OPCO, France Travail, région...)</td><td>Informer, traiter la demande d'absence, abonder via l'EDEF</td></tr>
<tr><td>CPF de transition professionnelle</td><td>Salarié</td><td>Salarié justifiant de l'ancienneté requise</td><td>Transitions Pro</td><td>Traiter la demande d'autorisation d'absence, suivre l'absence</td></tr>
<tr><td>Période de reconversion (depuis le 1er février 2026, remplace Pro-A et Transitions collectives)</td><td>Employeur et salarié</td><td>Salariés souhaitant se reconvertir ou évoluer, en interne ou vers une autre entreprise</td><td>OPCO selon les règles et niveaux de prise en charge fixés (à confirmer auprès de l'OPCO)</td><td>Avenant ou convention, demande de prise en charge, suivi de l'alternance</td></tr>
<tr><td>Contrat de professionnalisation</td><td>Employeur et candidat</td><td>16-25 ans, demandeurs d'emploi de 26 ans et plus, bénéficiaires de minima sociaux (RSA, ASS, AAH), anciens titulaires d'un contrat aidé</td><td>OPCO (forfaits fixés par la branche)</td><td>Contrat, dépôt auprès de l'OPCO dans les 5 jours, tutorat</td></tr>
<tr><td>Contrat d'apprentissage</td><td>Employeur et apprenti</td><td>16 à 29 ans révolus (sans limite pour personnes handicapées, sportifs de haut niveau, projet de création ou reprise d'entreprise)</td><td>OPCO, sur la base du NPEC de la certification ; aide à l'embauche de l'État selon la réglementation en vigueur</td><td>Contrat Cerfa, dépôt à l'OPCO, maître d'apprentissage, suivi</td></tr>
<tr><td>FNE-Formation</td><td>Employeur</td><td>Salariés d'entreprises confrontées à des mutations ou difficultés (priorités fixées chaque année par l'État)</td><td>État, via l'OPCO</td><td>Vérifier l'éligibilité auprès de l'OPCO, constituer le dossier</td></tr>
<tr><td>Bilan de compétences, VAE</td><td>Salarié (ou employeur avec accord du salarié)</td><td>Tout actif</td><td>CPF, plan, Transitions Pro selon le cas</td><td>Informer, garantir la confidentialité</td></tr>
</table>

<h3>Le compte personnel de formation (CPF)</h3>
<ul>
<li><strong>Alimentation</strong> : pour un salarié ayant travaillé au moins à mi-temps sur l'année, 500 euros par an dans la limite d'un plafond de 5 000 euros ; pour un salarié n'ayant pas atteint un niveau de qualification de niveau 3 (CAP, BEP), 800 euros par an dans la limite de 8 000 euros (articles L6323-11 et R6323-1 et suivants). En dessous d'un mi-temps, l'alimentation est proratisée. L'alimentation est calculée à partir des données de la DSN.</li>
<li><strong>Formations éligibles</strong> : certifications enregistrées au RNCP ou au RS, VAE, bilans de compétences, permis de conduire B et poids lourds, actions de création ou reprise d'entreprise, et quelques autres catégories fixées par l'article L6323-6.</li>
<li><strong>Pendant le temps de travail</strong> : le salarié doit obtenir l'accord de l'employeur sur le contenu et le calendrier. Il présente sa demande au moins 60 jours avant le début de la formation si elle dure moins de six mois, 120 jours si elle dure six mois ou plus ; l'employeur dispose de 30 jours calendaires pour répondre, et son silence vaut acceptation (article R6323-4). Les heures suivies sur le temps de travail sont rémunérées.</li>
<li><strong>Hors temps de travail</strong> : aucune autorisation n'est nécessaire et l'employeur n'a pas à être informé.</li>
<li><strong>Participation forfaitaire</strong> : depuis le 2 mai 2024 (décret n° 2024-394 du 29 avril 2024), le titulaire qui mobilise son CPF acquitte une participation forfaitaire, fixée à 100 euros à sa création et indexée chaque année. Elle ne s'applique pas notamment aux demandeurs d'emploi ni lorsque le projet bénéficie d'un abondement de l'employeur. Le montant de l'année et la liste des exonérations sont à vérifier sur service-public.fr avant d'informer un salarié.</li>
</ul>

<h3>Les abondements</h3>
<p>Lorsque les droits du salarié sont insuffisants, d'autres financeurs peuvent compléter : l'employeur (abondement volontaire versé via l'EDEF de la Caisse des dépôts), l'OPCO, la branche, France Travail pour un demandeur d'emploi, la région, l'Agefiph pour un bénéficiaire de l'obligation d'emploi. Deux abondements sont obligatoires pour l'employeur : l'<strong>abondement correctif</strong> de 3 000 euros (entreprises d'au moins 50 salariés, défaut d'entretiens et de formation non obligatoire constaté lors de l'état des lieux récapitulatif, désormais tous les huit ans) et l'abondement en cas de licenciement d'un salarié ayant refusé une modification de son contrat dans le cadre d'un accord de performance collective, dans les conditions fixées par décret.</p>
<blockquote>Le « projet co-construit » : ALTÉA SERVICES peut proposer à un agent de propreté de préparer une certification de chef d'équipe en mobilisant son CPF, complété par un abondement de l'entreprise. Le salarié garde la main (c'est lui qui valide sa commande sur Mon Compte Formation), l'entreprise finance le reste à charge et l'éventuelle participation forfaitaire n'est alors pas due.</blockquote>

<h3>Le CPF de transition professionnelle</h3>
<p>Il permet à un salarié de s'absenter pour suivre une formation certifiante en vue de changer de métier. Conditions principales pour un salarié en CDI : justifier d'une ancienneté d'au moins 24 mois, consécutifs ou non, en qualité de salarié, dont 12 mois dans l'entreprise (des conditions particulières existent pour les CDD et pour les travailleurs handicapés ou licenciés pour inaptitude). Le salarié demande une autorisation d'absence à l'employeur au plus tard 120 jours avant le départ si la formation entraîne une interruption continue de six mois ou plus, 60 jours sinon ; l'employeur répond dans les 30 jours et ne peut que reporter l'absence, dans les limites réglementaires, pour des raisons de service ou de nombre de salariés simultanément absents. Le dossier de financement est ensuite déposé par le salarié auprès de Transitions Pro.</p>

<h3>La période de reconversion (ex-Pro-A et Transitions collectives)</h3>
<p>La loi du 24 octobre 2025 a fusionné la reconversion ou promotion par alternance (Pro-A) et le dispositif Transitions collectives en un dispositif unique, la <strong>période de reconversion</strong>, applicable depuis le 1er février 2026. Elle permet à un salarié d'acquérir une qualification en alternant formation et activité, soit pour évoluer dans son entreprise (reconversion interne), soit pour rejoindre une autre entreprise (reconversion externe). Repères communiqués à ce jour : une durée de formation comprise entre 150 et 450 heures sur une période de 12 mois, une prise en charge par l'OPCO selon des niveaux fixés par la branche ou par décret. Les conditions d'éligibilité, la forme de l'accord (avenant au contrat de travail ou convention), les certifications visées et les montants sont <strong>à confirmer auprès de l'OPCO</strong> (AKTO pour ALTÉA) et sur legifrance.gouv.fr avant toute information au salarié. Les avenants Pro-A conclus avant le 1er février 2026 restent en principe régis par les règles en vigueur à leur conclusion.</p>

<h3>Le contrat de professionnalisation et le contrat d'apprentissage</h3>
<p>Ces deux contrats de travail en alternance sont traités au chapitre consacré au recrutement (CP5). Côté CP6, on retient : le dépôt du contrat auprès de l'OPCO dans les 5 jours ouvrables suivant le début d'exécution ; la prise en charge des coûts pédagogiques par l'OPCO (au contrat, sur la base du NPEC pour l'apprentissage, selon des forfaits de branche pour le contrat de professionnalisation) ; la désignation d'un maître d'apprentissage ou d'un tuteur ; le suivi de l'assiduité au CFA ou à l'organisme. L'apprenti ne mobilise pas son CPF pour sa formation : le financement passe par l'OPCO. Les aides de l'État à l'embauche d'alternants ont été modifiées à plusieurs reprises depuis 2023 ; leur montant et leurs conditions s'apprécient à la date de conclusion du contrat (à vérifier sur travail-emploi.gouv.fr).</p>

<h3>Les aides selon l'effectif</h3>
<ul>
<li><strong>Moins de 50 salariés</strong> : l'OPCO peut financer les actions du plan de développement des compétences sur les fonds mutualisés de l'alternance et du plan (article L6332-1-3), dans la limite des priorités et des plafonds qu'il fixe. Il apporte aussi un service de proximité (diagnostic RH, appui à l'analyse des besoins).</li>
<li><strong>50 salariés et plus</strong> : le plan est financé sur fonds propres. L'entreprise peut néanmoins bénéficier des financements de l'alternance (apprentissage, professionnalisation), de la période de reconversion, du FNE-Formation selon les priorités de l'année, et des éventuelles contributions conventionnelles ou volontaires versées à l'OPCO.</li>
</ul>
<p>ALTÉA SERVICES (148 salariés) relève de la seconde catégorie : il ne faut donc pas promettre aux managers un remboursement du plan par AKTO au titre des fonds légaux mutualisés.</p>

<h3>La contribution unique à la formation professionnelle et à l'alternance (CUFPA)</h3>
<p>Tout employeur verse une contribution unique (article L6131-2) composée de :</p>
<ul>
<li>la <strong>contribution à la formation professionnelle</strong> (CFP) : 0,55 % de la masse salariale brute pour les entreprises de moins de 11 salariés, 1 % à partir de 11 salariés (article L6331-1 et suivants) ;</li>
<li>la <strong>taxe d'apprentissage</strong> : 0,68 % de la masse salariale (0,44 % dans les départements du Bas-Rhin, du Haut-Rhin et de la Moselle), dont une part principale de 0,59 % et un solde de 0,09 % que l'entreprise affecte à des formations initiales technologiques et professionnelles ou à des organismes habilités, via la plateforme SOLTéA de la Caisse des dépôts.</li>
</ul>
<p>S'y ajoutent, le cas échéant : la <strong>contribution CPF-CDD</strong> de 1 % du revenu d'activité des titulaires de CDD (hors exceptions prévues par l'article L6331-6), la <strong>contribution supplémentaire à l'apprentissage</strong> (CSA) pour les entreprises d'au moins 250 salariés qui n'atteignent pas le quota d'alternants, et les éventuelles contributions conventionnelles prévues par accord de branche. Depuis 2022, la CFP et la taxe d'apprentissage sont déclarées dans la DSN et recouvrées par l'Urssaf (ou la MSA), qui les reverse à la Caisse des dépôts et à France compétences.</p>

<h3>Exemple chiffré : contributions d'ALTÉA SERVICES</h3>
<p>Hypothèses de l'exercice : masse salariale brute annuelle 3 900 000 euros, dont 180 000 euros versés à des salariés en CDD soumis à la contribution CPF-CDD ; entreprise située dans le Val-de-Marne.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Contribution</th><th>Taux</th><th>Calcul</th><th>Montant</th></tr>
<tr><td>Contribution à la formation professionnelle</td><td>1 %</td><td>3 900 000 × 1 %</td><td>39 000 €</td></tr>
<tr><td>Taxe d'apprentissage – part principale</td><td>0,59 %</td><td>3 900 000 × 0,59 %</td><td>23 010 €</td></tr>
<tr><td>Taxe d'apprentissage – solde</td><td>0,09 %</td><td>3 900 000 × 0,09 %</td><td>3 510 €</td></tr>
<tr><td><strong>Sous-total CUFPA</strong></td><td><strong>1,68 %</strong></td><td>3 900 000 × 1,68 %</td><td><strong>65 520 €</strong></td></tr>
<tr><td>Contribution CPF-CDD</td><td>1 %</td><td>180 000 × 1 %</td><td>1 800 €</td></tr>
<tr><td><strong>Total</strong></td><td></td><td></td><td><strong>67 320 €</strong></td></tr>
</table>
<p>Ces contributions ne constituent pas un « droit de tirage » : elles financent le système (alternance, CPF, CEP, entreprises de moins de 50 salariés). Le budget du plan d'ALTÉA s'ajoute à ces contributions. ALTÉA (148 salariés) n'est pas redevable de la CSA, réservée aux entreprises d'au moins 250 salariés.</p>`,
      },
      {
        title: "9.4 – Recueillir les besoins et les demandes de formation",
        content: `<h3>Distinguer besoin, demande et obligation</h3>
<p>Le REAC demande de « recueillir les demandes de formation du personnel » <em>dans le cadre des axes et actions du développement des compétences</em>. Trois notions doivent être distinguées :</p>
<ul>
<li><strong>La demande</strong> : ce qu'un salarié ou un manager exprime (« je voudrais une formation Excel »). Elle peut être floue, mal ciblée ou ne pas correspondre au vrai problème.</li>
<li><strong>Le besoin</strong> : l'écart entre les compétences actuelles et les compétences requises, aujourd'hui ou demain, pour tenir le poste ou évoluer. Il se déduit d'une analyse (entretien, référentiel de compétences, incident, projet).</li>
<li><strong>L'obligation</strong> : la formation imposée par un texte (sécurité, habilitation, formation des élus, renouvellement d'un certificat).</li>
</ul>
<p>Le plan doit d'abord couvrir les obligations, ensuite les besoins liés aux axes stratégiques, enfin les demandes individuelles validées.</p>

<h3>Les sources de recueil</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Source</th><th>Ce qu'elle apporte</th><th>Comment l'exploiter chez ALTÉA</th></tr>
<tr><td>Orientations stratégiques de la direction</td><td>Les axes prioritaires (nouveaux marchés, nouvelles techniques, digitalisation, sécurité)</td><td>Note de cadrage de la direction générale : développement du marché des établissements de santé, réduction des accidents du travail, montée en compétences des chefs d'équipe</td></tr>
<tr><td>Entretiens de parcours professionnel et entretiens annuels</td><td>Souhaits d'évolution, besoins exprimés et validés par le manager</td><td>Export Lucca des rubriques « besoins de formation », consolidé par service</td></tr>
<tr><td>Demandes spontanées</td><td>Projets individuels (CPF co-construit, VAE, bilan)</td><td>Formulaire de demande sur l'intranet, visa du manager</td></tr>
<tr><td>Tableau des obligations</td><td>Formations à renouveler (SST, habilitations), nouveaux embauchés à former</td><td>Tableau de suivi des habilitations avec dates d'échéance</td></tr>
<tr><td>Indicateurs RH et santé-sécurité</td><td>Accidents du travail, absentéisme, turnover, non-qualité</td><td>Analyse des accidents liés aux produits chimiques et aux chutes</td></tr>
<tr><td>Document unique d'évaluation des risques (DUERP)</td><td>Risques identifiés appelant une action de formation</td><td>Risque chimique, troubles musculosquelettiques, travail isolé</td></tr>
<tr><td>CSE</td><td>Avis sur les orientations, remontées du terrain</td><td>Compte rendu de la réunion de consultation sur la politique sociale</td></tr>
<tr><td>Clients et exigences contractuelles</td><td>Exigences d'un cahier des charges client (protocoles en milieu de soins, habilitations)</td><td>Appel d'offres d'une clinique exigeant des agents formés au bionettoyage</td></tr>
</table>

<h3>La fiche de recueil des besoins</h3>
<p>La fiche (ou formulaire numérique) doit être identique pour tous, afin de permettre la consolidation. Contenu minimal :</p>
<ol>
<li>Identité du salarié, emploi, service, ancienneté, type de contrat.</li>
<li>Intitulé de la compétence à acquérir (et non seulement le titre d'un stage).</li>
<li>Origine du besoin : obligation réglementaire, adaptation au poste, évolution, projet personnel.</li>
<li>Objectif opérationnel : « à l'issue de la formation, le salarié sera capable de... ».</li>
<li>Priorité proposée par le manager (1 = indispensable dans l'année, 2 = souhaitable, 3 = report possible).</li>
<li>Modalité envisagée : intra, inter, distanciel, formation en situation de travail (AFEST), tutorat.</li>
<li>Période souhaitée et contraintes (saisonnalité de l'activité, remplacement nécessaire).</li>
<li>Financement envisagé : plan, CPF co-construit, période de reconversion, autre.</li>
<li>Visa du manager et date.</li>
</ol>

<h3>Conduire un entretien de recueil avec un manager</h3>
<p>Pour transformer une demande en besoin, l'assistant RH pose des questions ouvertes :</p>
<ul>
<li>« Quelle situation de travail pose problème aujourd'hui ? Pouvez-vous me donner un exemple récent ? »</li>
<li>« Qu'est-ce que le salarié devra savoir faire après la formation qu'il ne fait pas aujourd'hui ? »</li>
<li>« Combien de personnes sont concernées ? Ont-elles le même niveau ? »</li>
<li>« Une solution interne est-elle possible (tutorat, fiche réflexe, démonstration par un collègue) ? »</li>
<li>« À quel moment la formation gêne-t-elle le moins l'activité ? »</li>
<li>« Comment saurons-nous, dans trois mois, que la formation a été utile ? »</li>
</ul>
<p>La dernière question prépare l'évaluation à froid (voir 9.9) : on fixe dès le recueil un indicateur de résultat.</p>

<h3>Prioriser : la grille de décision</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Poids</th><th>Exemple de notation</th></tr>
<tr><td>Obligation légale ou conventionnelle</td><td>Éliminatoire (toujours retenue)</td><td>Formation à la sécurité, habilitation</td></tr>
<tr><td>Lien avec un axe stratégique</td><td>40 %</td><td>0 = aucun lien, 4 = lien direct</td></tr>
<tr><td>Impact sur la sécurité ou la qualité</td><td>30 %</td><td>0 à 4</td></tr>
<tr><td>Nombre de salariés concernés</td><td>15 %</td><td>0 à 4</td></tr>
<tr><td>Projet d'évolution individuel identifié en entretien de parcours professionnel</td><td>15 %</td><td>0 à 4 ; vigilance particulière pour les salariés sans formation non obligatoire depuis plusieurs années</td></tr>
</table>
<p>La grille n'a pas valeur juridique : c'est un outil d'aide à la décision que la responsable RH valide et que l'assistant RH applique de manière homogène. Elle permet de justifier un refus ou un report auprès d'un salarié de façon objective.</p>

<h3>Consolider</h3>
<p>Le tableau de consolidation reprend toutes les fiches, une ligne par salarié et par action. Il permet de regrouper les demandes identiques (pour négocier une session intra), de compter les salariés et les heures, et de repérer les salariés qui n'ont suivi aucune formation non obligatoire depuis longtemps. Il est construit dans le tableur avec des listes déroulantes (service, priorité, origine, modalité) pour éviter les saisies hétérogènes, et protégé : seuls les membres du service RH y ont accès.</p>

<h3>Confidentialité et non-discrimination</h3>
<p>Le recueil ne doit pas conduire à exclure un salarié en raison de son âge, de son état de santé, de son temps partiel, de sa grossesse ou de tout autre critère prohibé par l'article L1132-1 : la formation figure expressément parmi les domaines où la discrimination est interdite. Le tableau de consolidation ne mentionne jamais un motif médical : on écrit « reclassement interne » ou « adaptation de poste », pas « restriction médicale lombaire ». Les données sont conservées pendant une durée définie dans le registre des traitements RGPD de l'entreprise.</p>`,
      },
      {
        title: "9.5 – Construire et chiffrer le plan de développement des compétences",
        content: `<h3>De la liste des besoins au plan</h3>
<p>Le plan est la traduction opérationnelle et budgétaire des besoins retenus. Pour chaque action, il précise : l'intitulé, l'objectif, la catégorie (obligatoire / non obligatoire), le public et l'effectif, la durée, la modalité (intra, inter, distanciel, AFEST), la période, l'organisme pressenti, le coût prévisionnel et le mode de financement. Il peut être présenté par axe stratégique, par service ou par catégorie.</p>

<h3>Les trois familles de coûts</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Famille</th><th>Contenu</th><th>Source de la donnée</th></tr>
<tr><td>Coûts pédagogiques</td><td>Prix facturé par l'organisme (par jour, par groupe ou par participant), frais de certification ou d'examen, supports</td><td>Devis de l'organisme ; attention à la mention de la TVA (de nombreux organismes de formation professionnelle continue sont exonérés de TVA en application de l'article 261 du Code général des impôts, d'autres non)</td></tr>
<tr><td>Coûts salariaux</td><td>Rémunération maintenue pendant les heures de formation, majorée des cotisations patronales</td><td>Taux horaire brut issu de la paie × heures × coefficient de charges communiqué par le gestionnaire paie</td></tr>
<tr><td>Frais annexes</td><td>Déplacements, hébergement, repas, location de salle, remplacement du salarié absent</td><td>Barème interne de remboursement des frais, devis de location</td></tr>
</table>
<p>À ces coûts directs peuvent s'ajouter des coûts indirects (temps passé par le service RH, temps de tutorat). On ne les intègre que si la direction le demande, en indiquant clairement la méthode.</p>

<h3>Formules utiles</h3>
<ul>
<li>Coût salarial d'une action = nombre de participants × durée en heures × taux horaire brut × coefficient de charges.</li>
<li>Coût total d'une action = coûts pédagogiques + coûts salariaux + frais annexes.</li>
<li>Coût par heure-stagiaire = coût total ÷ (nombre de participants × durée).</li>
<li>Taux d'accès à la formation = nombre de salariés formés au moins une fois ÷ effectif × 100.</li>
<li>Effort de formation = dépenses de formation ÷ masse salariale × 100.</li>
<li>Seuil intra / inter = nombre de participants à partir duquel le prix intra (forfait groupe) devient inférieur à la somme des prix inter (par participant).</li>
</ul>

<h3>Exemple complet : plan prévisionnel 2027 d'ALTÉA SERVICES</h3>
<p>Hypothèses fournies par Karim BENSAÏD, gestionnaire paie : taux horaire brut moyen d'un agent de propreté 12,50 €, d'un chef d'équipe 15,00 €, de l'assistante d'exploitation 14,00 € ; coefficient de charges retenu pour l'exercice 1,30 (hypothèse pédagogique : en situation réelle, utilisez le coefficient calculé par la paie, qui dépend notamment des réductions de cotisations). Remboursement repas 16 € par jour à l'extérieur, transport selon frais réels déclarés. Devis hors taxes, organismes exonérés de TVA.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Action</th><th>Catégorie</th><th>Public</th><th>Durée</th><th>Coût pédagogique</th><th>Coût salarial</th><th>Frais annexes</th><th>Total</th></tr>
<tr><td>A. Prévention du risque chimique et dilution des produits (intra, 2 groupes)</td><td>Obligatoire (formation à la sécurité, L4141-2)</td><td>20 agents</td><td>7 h</td><td>2 × 950 = 1 900,00 €</td><td>20 × 7 × 12,50 × 1,30 = 2 275,00 €</td><td>Transport 20 × 10 = 200,00 €</td><td>4 375,00 €</td></tr>
<tr><td>B. Conduite et entretien des autolaveuses autoportées (inter)</td><td>Adaptation au poste</td><td>6 agents</td><td>7 h</td><td>6 × 280 = 1 680,00 €</td><td>6 × 7 × 12,50 × 1,30 = 682,50 €</td><td>Transport 6 × 18 = 108,00 €</td><td>2 470,50 €</td></tr>
<tr><td>C. Management de proximité (intra)</td><td>Non obligatoire (développement)</td><td>8 chefs d'équipe</td><td>21 h (3 jours)</td><td>3 × 1 250 = 3 750,00 €</td><td>8 × 21 × 15,00 × 1,30 = 3 276,00 €</td><td>Repas 8 × 3 × 16 = 384,00 €</td><td>7 410,00 €</td></tr>
<tr><td>D. Tableur perfectionnement (distanciel, inter)</td><td>Non obligatoire</td><td>1 assistante d'exploitation</td><td>14 h</td><td>590,00 €</td><td>1 × 14 × 14,00 × 1,30 = 254,80 €</td><td>0,00 €</td><td>844,80 €</td></tr>
<tr><td>E. Sauveteur secouriste du travail, formation initiale (inter)</td><td>Sécurité (organisation des premiers secours, articles R4224-15 et suivants)</td><td>4 agents</td><td>14 h (2 jours)</td><td>4 × 230 = 920,00 €</td><td>4 × 14 × 12,50 × 1,30 = 910,00 €</td><td>Repas 4 × 2 × 16 = 128,00 €</td><td>1 958,00 €</td></tr>
<tr><td colspan="4"><strong>Total</strong></td><td><strong>8 840,00 €</strong></td><td><strong>7 398,30 €</strong></td><td><strong>820,00 €</strong></td><td><strong>17 058,30 €</strong></td></tr>
</table>
<p>Vérification des totaux : coûts pédagogiques 1 900 + 1 680 + 3 750 + 590 + 920 = 8 840,00 € ; coûts salariaux 2 275 + 682,50 + 3 276 + 254,80 + 910 = 7 398,30 € ; frais annexes 200 + 108 + 384 + 0 + 128 = 820,00 € ; total général 8 840 + 7 398,30 + 820 = 17 058,30 €.</p>

<h3>Indicateurs du plan</h3>
<ul>
<li>Heures-stagiaires : 140 + 42 + 168 + 14 + 56 = 420 heures.</li>
<li>Coût moyen par heure-stagiaire : 17 058,30 ÷ 420 = 40,61 € (arrondi au centime).</li>
<li>Salariés formés (en supposant qu'aucun salarié ne suit deux actions) : 20 + 6 + 8 + 1 + 4 = 39, soit un taux d'accès de 39 ÷ 148 × 100 = 26,35 %.</li>
<li>Effort de formation hors contributions obligatoires : 17 058,30 ÷ 3 900 000 × 100 = 0,44 % de la masse salariale.</li>
<li>Budget alloué par la direction : 18 000 € ; marge disponible : 18 000 − 17 058,30 = 941,70 €.</li>
</ul>

<h3>Intra ou inter : calcul du seuil</h3>
<p>Pour l'action B, l'organisme propose aussi une session intra à 1 450 € la journée pour un groupe de 8 personnes maximum. Le prix inter est de 280 € par participant. Le seuil est atteint lorsque 280 × n ≥ 1 450, soit n ≥ 5,18 : à partir de 6 participants, la formule intra est moins chère (6 × 280 = 1 680 € contre 1 450 €, soit 230 € d'économie). L'intra suppose toutefois de disposer d'une machine et d'un local adaptés sur site : l'assistant RH vérifie ces conditions avec le responsable d'exploitation avant de recommander la formule. Si le site client accepte la session, le total de l'action B devient 1 450 + 682,50 + 0 (plus de transport) = 2 132,50 €.</p>

<h3>Planifier</h3>
<p>Le plan est ensuite traduit en calendrier : on évite les périodes de forte activité (pour la propreté, les remises en état estivales des établissements scolaires, les grands nettoyages de fin d'année), on étale les sessions pour ne pas désorganiser une même équipe, on anticipe les délais (une demande de prise en charge à l'OPCO doit précéder le début de l'action). Le calendrier prévisionnel est partagé avec les managers sous forme d'un planning mensuel.</p>`,
      },
      {
        title: "9.6 – Consulter les organismes de formation et sélectionner les actions",
        content: `<h3>Rédiger un cahier des charges</h3>
<p>Le cahier des charges est le document qui permet de comparer des offres sur une base identique. Pour une action intra, il est indispensable ; pour une action inter catalogue, une fiche de besoin suffit généralement. Structure recommandée :</p>
<ol>
<li><strong>Présentation de l'entreprise</strong> : activité, effectif, sites, convention collective, organisation du service concerné.</li>
<li><strong>Contexte et origine du besoin</strong> : pourquoi cette formation maintenant (projet, incident, exigence client).</li>
<li><strong>Public</strong> : nombre, emplois, niveau, hétérogénéité, éventuels besoins d'adaptation (situation de handicap, maîtrise de la langue française).</li>
<li><strong>Objectifs pédagogiques</strong> formulés en compétences observables.</li>
<li><strong>Contenu attendu</strong> et points incontournables.</li>
<li><strong>Modalités</strong> : durée maximale, présentiel ou distanciel, lieu, horaires compatibles avec l'activité (prise de poste tôt le matin pour les agents de propreté).</li>
<li><strong>Évaluation</strong> attendue : positionnement, évaluation des acquis, questionnaire de satisfaction, bilan au commanditaire.</li>
<li><strong>Exigences administratives</strong> : certificat Qualiopi en cours de validité, numéro de déclaration d'activité, programme détaillé, CV des intervenants, conditions générales, convention, feuilles d'émargement, certificat de réalisation.</li>
<li><strong>Calendrier</strong> de la consultation : date limite de réponse, date de choix, date de démarrage.</li>
<li><strong>Critères de sélection</strong> et leur pondération.</li>
</ol>

<h3>Identifier des organismes</h3>
<p>Sources : offres relayées par l'OPCO et la branche, liste publique des organismes de formation (data.gouv.fr), recommandations du réseau professionnel, organismes déjà évalués par l'entreprise, offre des CFA et des organismes publics. L'assistant RH consulte en principe au moins trois organismes pour une action significative et conserve la trace de la consultation.</p>

<h3>Les vérifications préalables</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Vérification</th><th>Où</th><th>Pourquoi</th></tr>
<tr><td>Numéro de déclaration d'activité (NDA)</td><td>Liste publique des organismes de formation (data.gouv.fr)</td><td>Un organisme qui réalise des actions de formation doit être déclaré (article L6351-1) ; la déclaration ne vaut pas agrément de l'État</td></tr>
<tr><td>Certificat Qualiopi</td><td>Certificat transmis par l'organisme, site du certificateur, liste publique (champ certification)</td><td>Condition d'accès aux fonds publics et mutualisés ; vérifier la catégorie et la date de fin</td></tr>
<tr><td>Certification visée (RNCP, RS)</td><td>francecompetences.fr</td><td>Fiche active, organisme habilité par le certificateur à préparer ou à faire passer la certification</td></tr>
<tr><td>Existence légale</td><td>annuaire-entreprises.data.gouv.fr</td><td>Entreprise active, SIRET identique sur le devis</td></tr>
<tr><td>Programme</td><td>Document transmis</td><td>Objectifs, prérequis, durée, modalités d'évaluation : informations dues par l'organisme (articles L6353-1 et L6353-8)</td></tr>
</table>

<h3>Comparer les devis : la grille pondérée</h3>
<p>Exemple pour l'action C (management de proximité, 8 chefs d'équipe, 3 jours). Les trois organismes sont fictifs.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère (pondération)</th><th>FORMAPRO MANAGEMENT</th><th>CAP ENCADREMENT</th><th>ATELIERS DU TERRAIN</th></tr>
<tr><td>Adéquation du programme au cahier des charges (30 %)</td><td>4/5</td><td>3/5</td><td>5/5</td></tr>
<tr><td>Expérience du secteur de la propreté (20 %)</td><td>2/5</td><td>3/5</td><td>5/5</td></tr>
<tr><td>Qualification des intervenants (15 %)</td><td>4/5</td><td>4/5</td><td>4/5</td></tr>
<tr><td>Modalités d'évaluation proposées (10 %)</td><td>3/5</td><td>4/5</td><td>4/5</td></tr>
<tr><td>Prix (25 %)</td><td>3 300 € → 5/5</td><td>3 600 € → 4/5</td><td>3 750 € → 4/5</td></tr>
<tr><td><strong>Note pondérée sur 5</strong></td><td>4×0,30 + 2×0,20 + 4×0,15 + 3×0,10 + 5×0,25 = <strong>3,75</strong></td><td>3×0,30 + 3×0,20 + 4×0,15 + 4×0,10 + 4×0,25 = <strong>3,50</strong></td><td>5×0,30 + 5×0,20 + 4×0,15 + 4×0,10 + 4×0,25 = <strong>4,50</strong></td></tr>
<tr><td>Qualiopi / NDA vérifiés</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
</table>
<p>Conclusion proposée à la responsable RH : retenir ATELIERS DU TERRAIN, mieux noté malgré un prix supérieur de 450 € au moins-disant, en raison de sa connaissance du secteur et de l'adéquation du programme. La décision appartient à la responsable RH ; l'assistant RH rédige une note de synthèse argumentée et archive la grille.</p>

<h3>Gérer la relation avec les prestataires</h3>
<ul>
<li>Confirmer par écrit les dates, le lieu, les horaires, la liste des participants (en ne transmettant que les données nécessaires : nom, prénom, emploi, éventuels besoins d'adaptation, sans motif).</li>
<li>Transmettre le cahier des charges et organiser un échange préparatoire entre le formateur et le manager pour les actions intra.</li>
<li>Exiger les documents de fin d'action : feuilles d'émargement signées par demi-journée, évaluations, certificat de réalisation, attestation de fin de formation.</li>
<li>Faire un bilan à l'issue de l'action (points forts, points d'amélioration) et l'archiver dans la fiche fournisseur : c'est la base des futures consultations.</li>
<li>Traiter les réclamations par écrit ; un organisme certifié Qualiopi doit disposer d'un dispositif de traitement des réclamations.</li>
</ul>

<h3>La relation avec la branche et l'OPCO</h3>
<p>Le REAC mentionne explicitement la relation avec la branche professionnelle. Pour ALTÉA, cela signifie : consulter les priorités de formation de la branche de la propreté et ses certifications professionnelles, suivre les informations publiées par AKTO (critères de prise en charge, actions collectives, calendrier), et solliciter le conseiller de l'OPCO pour les projets d'alternance ou de Pro-A.</p>`,
      },
      {
        title: "9.7 – Informer les managers et les salariés, organiser la logistique",
        content: `<h3>Informer les managers</h3>
<p>Une fois le plan validé, chaque manager reçoit la liste des actions qui concernent son équipe : intitulé, participants, dates, lieu, horaires. Il doit pouvoir organiser le remplacement des absents. L'information est transmise au moins un mois avant pour les actions intra, et dès la confirmation pour les inter. Le message rappelle le rôle attendu du manager : préparer le salarié avant la formation (entretien de pré-formation sur les objectifs), faciliter la mise en pratique après (entretien de retour à froid).</p>

<h3>Informer les salariés</h3>
<p>Le salarié est informé de façon individuelle, claire et vérifiable. Selon les cas :</p>
<ul>
<li><strong>Action du plan pendant le temps de travail</strong> : convocation écrite.</li>
<li><strong>Action non obligatoire hors temps de travail</strong> : proposition écrite et recueil de l'accord écrit du salarié, mentionnant le nombre d'heures et la possibilité de refuser.</li>
<li><strong>Demande refusée ou reportée</strong> : réponse écrite et motivée, avec, le cas échéant, l'information sur les dispositifs mobilisables à son initiative (CPF, CEP, projet de transition professionnelle).</li>
<li><strong>Demande d'information sur les dispositifs</strong> : réponse exacte et sourcée, renvoi vers moncompteformation.gouv.fr pour le solde CPF (l'employeur n'a pas accès au compte du salarié).</li>
</ul>

<h3>Modèle de convocation</h3>
<blockquote>
<p><strong>ALTÉA SERVICES – Service ressources humaines</strong><br>Créteil, le 4 janvier 2027</p>
<p>Objet : convocation à une action de formation</p>
<p>Madame Inès FERREIRA,</p>
<p>Dans le cadre du plan de développement des compétences 2027, vous êtes inscrite à la formation « Prévention du risque chimique et dilution des produits ».</p>
<ul>
<li>Date : jeudi 21 janvier 2027, de 8 h 30 à 12 h 00 et de 13 h 00 à 16 h 30 (7 heures)</li>
<li>Lieu : siège d'ALTÉA SERVICES, salle Marne, Créteil</li>
<li>Organisme : [nom de l'organisme retenu], formateur [nom]</li>
<li>Objectifs : identifier les pictogrammes de danger, lire une fiche de données de sécurité, respecter les dosages et les équipements de protection</li>
</ul>
<p>Cette formation se déroule pendant votre temps de travail et constitue du temps de travail effectif ; votre rémunération est maintenue. Votre responsable de site, M. Thomas GIRAUD, a organisé votre remplacement. Merci de vous munir de vos équipements de protection individuelle. Une feuille d'émargement vous sera présentée à chaque demi-journée.</p>
<p>Pour toute question : service RH, poste 214.</p>
<p>Nathalie ROUSSEL, responsable des ressources humaines</p>
</blockquote>

<h3>Les documents contractuels avec l'organisme</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Document</th><th>Base</th><th>Contenu</th></tr>
<tr><td>Programme de formation</td><td>Articles L6353-1 et L6353-8</td><td>Objectifs, prérequis, contenu, durée, moyens pédagogiques, modalités d'évaluation</td></tr>
<tr><td>Convention de formation</td><td>Articles L6353-1, L6353-2 et D6353-1</td><td>Conclue entre l'acheteur (ALTÉA) et l'organisme : intitulé, objectif et contenu de l'action, moyens prévus, durée et période de réalisation, modalités de déroulement, de suivi et de sanction, prix et modalités de règlement. Un bon de commande ou un devis signé peut en tenir lieu s'il comporte les mentions requises</td></tr>
<tr><td>Contrat de formation professionnelle</td><td>Articles L6353-3 et suivants</td><td>Uniquement lorsqu'une personne physique achète à titre individuel et à ses frais : délai de rétractation de 10 jours</td></tr>
<tr><td>Règlement intérieur de l'organisme</td><td>Article L6352-3</td><td>Porté à la connaissance du stagiaire avant l'entrée en formation</td></tr>
</table>

<h3>La logistique d'une session</h3>
<p>Liste de contrôle de l'assistant RH :</p>
<ul>
<li><strong>J − 30</strong> : convention signée et retournée, demande de prise en charge déposée si un financement externe est prévu, salle réservée (capacité, vidéoprojecteur, accessibilité), managers prévenus.</li>
<li><strong>J − 15</strong> : convocations envoyées, liste des participants transmise à l'organisme, besoins d'adaptation recueillis et transmis avec l'accord des intéressés.</li>
<li><strong>J − 7</strong> : relance des participants, vérification du matériel, commande des repas si prévue, préparation de la feuille d'émargement si l'organisme ne la fournit pas.</li>
<li><strong>Jour J</strong> : accueil, présentation du formateur, vérification des présences, gestion des absences imprévues (information du manager et de l'organisme).</li>
<li><strong>J + 7</strong> : récupération des émargements, des évaluations à chaud, des attestations ; mise à jour du tableau de suivi et du SIRH ; transmission des justificatifs au financeur.</li>
</ul>

<h3>Feuilles d'émargement et attestations</h3>
<p>La feuille d'émargement, signée par chaque stagiaire et par le formateur <strong>par demi-journée</strong>, est la preuve principale de l'assiduité exigée par les financeurs. En distanciel, l'organisme fournit des relevés de connexion, des attestations d'assiduité ou un émargement électronique. À la fin de l'action, l'organisme remet au stagiaire une <strong>attestation de fin de formation</strong> mentionnant les objectifs, la nature, la durée de l'action et les résultats de l'évaluation des acquis (article L6353-1), et au financeur un <strong>certificat de réalisation</strong>. L'assistant RH vérifie la cohérence des heures : un salarié noté absent l'après-midi ne peut pas figurer pour 7 heures sur le certificat.</p>

<h3>Mettre à jour les données individuelles</h3>
<p>Chaque formation suivie est enregistrée dans le SIRH (Lucca chez ALTÉA) : intitulé, dates, durée, organisme, catégorie, certification obtenue, date d'échéance pour les habilitations. Ce suivi alimente l'entretien de parcours professionnel, l'état des lieux récapitulatif à huit ans, le bilan formation présenté au CSE et la BDESE.</p>`,
      },
      {
        title: "9.8 – Suivi budgétaire et administratif, dossier de financement complet",
        content: `<h3>Le tableau de suivi du plan</h3>
<p>Le tableau de suivi est l'outil central de l'assistant RH. Il est tenu à jour chaque semaine et permet de répondre à tout moment à trois questions : qu'est-ce qui a été réalisé, combien cela a coûté, qu'est-ce qui reste à percevoir ou à payer. Colonnes recommandées :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Bloc</th><th>Colonnes</th></tr>
<tr><td>Identification</td><td>N° d'action, intitulé, axe du plan, catégorie (obligatoire / non obligatoire), organisme, SIRET, NDA, Qualiopi (oui / non, date de fin)</td></tr>
<tr><td>Participants</td><td>Nom, matricule, service, emploi, CSP, sexe et tranche d'âge (pour les indicateurs d'égalité d'accès), temps de travail</td></tr>
<tr><td>Calendrier</td><td>Dates prévues, dates réalisées, heures prévues, heures réalisées (d'après émargement), statut (prévue, confirmée, réalisée, annulée, reportée)</td></tr>
<tr><td>Budget</td><td>Coût pédagogique prévu / facturé, coût salarial, frais annexes, total prévu / réalisé, écart</td></tr>
<tr><td>Financement</td><td>Financeur, n° de dossier de prise en charge, montant accordé, subrogation (oui / non), montant perçu, date de versement</td></tr>
<tr><td>Pièces</td><td>Convention, convocation, émargement, attestation, certificat de réalisation, facture, évaluation à chaud, évaluation à froid (case cochée et lien vers le fichier)</td></tr>
</table>
<p>Un tableau de bord mensuel en découle : taux de réalisation du plan (actions réalisées ÷ actions prévues), consommation budgétaire (dépenses engagées ÷ budget), heures de formation par catégorie, taux d'accès par sexe et CSP, financements obtenus. Les écarts significatifs (plus de 10 % sur une ligne) sont signalés à la responsable RH avec une explication.</p>

<h3>La demande de prise en charge auprès de l'OPCO</h3>
<p>Lorsqu'une action est financée par l'OPCO (alternance, période de reconversion, actions collectives, plan pour les moins de 50 salariés, FNE-Formation), la règle d'or est de <strong>déposer la demande avant le début de l'action</strong>, sur l'espace en ligne de l'entreprise. Pièces habituellement demandées :</p>
<ul>
<li>programme détaillé de l'action ;</li>
<li>devis ou convention de formation signée ;</li>
<li>calendrier des sessions ;</li>
<li>liste des participants ;</li>
<li>pour l'alternance : contrat ou avenant, convention de formation avec le CFA ou l'organisme, désignation du maître d'apprentissage ou du tuteur.</li>
</ul>
<p>L'OPCO répond par un accord de prise en charge précisant le montant et les conditions. Si l'entreprise choisit la <strong>subrogation</strong>, l'organisme facture directement l'OPCO et l'entreprise ne paie que l'éventuel reste à charge : c'est plus simple pour la trésorerie, mais il faut transmettre à temps les pièces justificatives. Sans subrogation, l'entreprise paie l'organisme puis demande le remboursement à l'OPCO avec la facture acquittée et le certificat de réalisation.</p>

<h3>Contrôler les factures</h3>
<p>Avant de transmettre une facture au service comptable, l'assistant RH vérifie :</p>
<ol>
<li>la correspondance avec le devis ou la convention (prix unitaire, nombre de participants ou de jours) ;</li>
<li>les heures réellement suivies d'après les émargements (une absence non justifiée peut entraîner une prise en charge réduite par le financeur, selon ses conditions générales) ;</li>
<li>les mentions obligatoires de la facture (numéro, date, identification des parties, désignation précise, montant hors taxes, régime de TVA ou mention d'exonération) ;</li>
<li>l'absence de double facturation (OPCO et entreprise pour la même somme en cas de subrogation).</li>
</ol>

<h3>Dossier de financement complet : ALTÉA SERVICES, année 2027</h3>
<p>Nathalie ROUSSEL demande à l'apprenti(e) assistant(e) RH de préparer le dossier de financement de trois projets. Le tableau ci-dessous en est la version finalisée.</p>
<h4>Projet 1 – Contrat d'apprentissage de l'assistant(e) RH (titre ARH, RNCP41366)</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Contenu</th></tr>
<tr><td>Financeur</td><td>AKTO (branche propreté, IDCC 3043)</td></tr>
<tr><td>Base de financement</td><td>Niveau de prise en charge (NPEC) fixé pour le RNCP41366, versé au CFA ; aucun frais pour l'apprenti. Le CPF de l'apprenti n'est pas mobilisé</td></tr>
<tr><td>Pièces</td><td>Contrat d'apprentissage sur le formulaire Cerfa en vigueur, signé par l'employeur et l'apprenti (et le représentant légal si l'apprenti est mineur) ; convention de formation conclue avec le CFA, précisant la durée de 420 heures et le calendrier ; attestation de l'employeur sur les compétences du maître d'apprentissage</td></tr>
<tr><td>Délai</td><td>Transmission à l'OPCO au plus tard dans les 5 jours ouvrables suivant le début d'exécution du contrat (article L6224-1)</td></tr>
<tr><td>Aide de l'État</td><td>Aide à l'embauche d'un apprenti selon la réglementation applicable à la date de conclusion du contrat ; versée par l'Agence de services et de paiement après transmission du contrat et déclaration en DSN (montant à vérifier sur travail-emploi.gouv.fr)</td></tr>
<tr><td>Suivi</td><td>Relevés d'assiduité transmis par le CFA, entretiens tripartites, livret d'apprentissage, inscription à la session de validation du titre</td></tr>
</table>
<h4>Projet 2 – Évolution de M. Yanis MOREL, agent de propreté, vers un poste de chef d'équipe</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Analyse</th></tr>
<tr><td>Situation</td><td>CDI depuis 2019, qualification de niveau 3, projet exprimé en entretien de parcours professionnel, validé par son responsable de site</td></tr>
<tr><td>Piste 1 : période de reconversion interne</td><td>Dispositif applicable depuis le 1er février 2026 (il remplace Pro-A). Action à mener : vérifier auprès d'AKTO l'éligibilité du projet et de la certification visée, la durée de formation admise (repère : 150 à 450 heures sur 12 mois) et le niveau de prise en charge. Si le projet est éligible : formalisation de l'accord avec le salarié (avenant ou convention selon les règles en vigueur), désignation d'un tuteur, demande de prise en charge déposée avant le démarrage</td></tr>
<tr><td>Piste 2 : CPF co-construit</td><td>Si la certification visée est enregistrée au RNCP ou au RS et éligible au CPF : M. MOREL commande la formation sur Mon Compte Formation ; ALTÉA abonde le reste à charge via l'EDEF ; la formation se déroule pendant le temps de travail avec accord de l'employeur ; la participation forfaitaire n'est pas due en cas d'abondement de l'employeur (à vérifier au moment de la commande)</td></tr>
<tr><td>Piste 3 : plan de développement des compétences</td><td>Financement intégral par ALTÉA sur son budget, formation sur le temps de travail</td></tr>
<tr><td>Recommandation</td><td>Présenter les trois pistes chiffrées à la responsable RH ; la piste 1 est la plus favorable financièrement si la certification est éligible, la piste 2 associe le salarié et valorise ses droits, la piste 3 est la plus simple administrativement</td></tr>
</table>
<h4>Projet 3 – Plan 2027 (actions A à E chiffrées en 9.5)</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Contenu</th></tr>
<tr><td>Financement</td><td>Fonds propres d'ALTÉA (148 salariés : pas de financement du plan sur les fonds légaux mutualisés) ; interroger AKTO sur d'éventuelles actions collectives de branche ou sur l'éligibilité au FNE-Formation selon les priorités de l'année</td></tr>
<tr><td>Budget</td><td>17 058,30 € pour un budget alloué de 18 000 €</td></tr>
<tr><td>Pièces par action</td><td>Programme, convention, attestation Qualiopi et NDA vérifiés, convocations, émargements, attestations de fin de formation, factures, évaluations</td></tr>
<tr><td>Consultation</td><td>Information-consultation du CSE dans le cadre de la politique sociale (voir 9.10)</td></tr>
</table>

<h3>Archivage et conservation</h3>
<p>Les pièces sont classées par action et par exercice. Elles doivent pouvoir être produites en cas de contrôle d'un financeur, de contentieux (preuve de l'obligation d'adaptation) ou pour l'état des lieux récapitulatif du parcours. Les durées de conservation sont fixées par la politique d'archivage de l'entreprise, en cohérence avec les délais de prescription et le registre RGPD (référentiel « gestion du personnel » publié par la CNIL).</p>`,
      },
      {
        title: "9.9 – Évaluer les actions de formation : modèle de Kirkpatrick et questionnaires",
        content: `<h3>Pourquoi évaluer</h3>
<p>Le REAC demande de « s'assurer du retour qualitatif des actions de formation » et cite, parmi les savoir-faire, « élaborer un questionnaire d'évaluation de formation ». L'évaluation sert à vérifier que l'action a atteint son objectif, à améliorer le choix des prestataires, à justifier les dépenses auprès de la direction et du CSE, et à nourrir le prochain plan.</p>

<h3>Le modèle de Kirkpatrick : quatre niveaux</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Niveau</th><th>Question</th><th>Quand</th><th>Outil</th><th>Qui</th></tr>
<tr><td>1. Réaction</td><td>Les participants sont-ils satisfaits ?</td><td>À chaud, en fin de session</td><td>Questionnaire de satisfaction</td><td>Organisme et service RH</td></tr>
<tr><td>2. Apprentissage</td><td>Ont-ils acquis les connaissances et savoir-faire visés ?</td><td>En fin de formation</td><td>Quiz, mise en situation, évaluation certificative</td><td>Organisme</td></tr>
<tr><td>3. Comportement (transfert)</td><td>Appliquent-ils les acquis en situation de travail ?</td><td>À froid, 2 à 6 mois après</td><td>Questionnaire à froid, entretien manager, observation</td><td>Manager et service RH</td></tr>
<tr><td>4. Résultats</td><td>L'action a-t-elle produit l'effet attendu pour l'organisation ?</td><td>6 à 12 mois après</td><td>Indicateurs (accidents, non-qualité, réclamations clients, délais)</td><td>Direction et service RH</td></tr>
</table>
<p>Plus on monte dans les niveaux, plus l'évaluation est utile, mais plus elle est exigeante : il faut avoir défini l'indicateur dès le recueil du besoin (voir 9.4). Tous les niveaux ne sont pas nécessaires pour toutes les actions : une formation de 2 heures sur un logiciel n'appelle qu'un niveau 1 et un niveau 2 ; la formation au risque chimique d'ALTÉA mérite un suivi jusqu'au niveau 4 (évolution du nombre d'accidents et d'incidents liés aux produits).</p>

<h3>Construire un questionnaire à chaud</h3>
<p>Règles de construction : un questionnaire court (10 à 15 questions, 5 minutes), une échelle paire pour éviter la réponse neutre systématique, des questions fermées pour l'exploitation statistique et deux ou trois questions ouvertes pour le qualitatif, un vocabulaire accessible (une partie des agents d'ALTÉA maîtrise imparfaitement l'écrit : prévoir une version orale ou illustrée), l'anonymat lorsque c'est possible.</p>
<blockquote>
<p><strong>Questionnaire d'évaluation à chaud – « Prévention du risque chimique et dilution des produits »</strong></p>
<p>Échelle : 1 = pas du tout d'accord, 2 = plutôt pas d'accord, 3 = plutôt d'accord, 4 = tout à fait d'accord</p>
<ol>
<li>J'ai été informé(e) à l'avance des objectifs de la formation. 1 – 2 – 3 – 4</li>
<li>Les objectifs annoncés ont été atteints. 1 – 2 – 3 – 4</li>
<li>Le contenu correspond à ce que je fais au travail. 1 – 2 – 3 – 4</li>
<li>Le formateur s'est exprimé clairement. 1 – 2 – 3 – 4</li>
<li>Le formateur a répondu à mes questions. 1 – 2 – 3 – 4</li>
<li>Les exercices pratiques (lecture d'étiquettes, dosages) m'ont aidé(e). 1 – 2 – 3 – 4</li>
<li>La durée était adaptée. 1 – 2 – 3 – 4</li>
<li>Les conditions matérielles (salle, horaires) étaient satisfaisantes. 1 – 2 – 3 – 4</li>
<li>Je me sens capable de lire une fiche de données de sécurité. 1 – 2 – 3 – 4</li>
<li>Je me sens capable de doser un produit sans erreur. 1 – 2 – 3 – 4</li>
<li>Je recommanderais cette formation à un collègue. 1 – 2 – 3 – 4</li>
<li>Ce que je vais appliquer dès demain : ...</li>
<li>Ce qui m'a manqué : ...</li>
<li>Autres remarques : ...</li>
</ol>
</blockquote>

<h3>Construire un questionnaire à froid</h3>
<p>Le questionnaire à froid est adressé au participant <strong>et</strong> à son manager, trois mois après. Il porte sur l'application des acquis et les obstacles rencontrés.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question au salarié</th><th>Question au manager</th></tr>
<tr><td>Depuis la formation, avez-vous utilisé ce que vous avez appris ? (jamais, parfois, souvent, systématiquement)</td><td>Avez-vous constaté une évolution des pratiques du salarié ? (aucune, faible, nette, très nette)</td></tr>
<tr><td>Donnez un exemple de situation où la formation vous a servi.</td><td>Donnez un exemple observé.</td></tr>
<tr><td>Qu'est-ce qui vous empêche d'appliquer ce que vous avez appris ? (matériel, temps, consignes contradictoires, autre)</td><td>Quels freins identifiez-vous dans l'organisation ?</td></tr>
<tr><td>Avez-vous besoin d'un complément ?</td><td>Recommandez-vous un complément ou un accompagnement ?</td></tr>
</table>

<h3>Exploiter les résultats</h3>
<p>Pour chaque question fermée, on calcule le taux de satisfaction (part des réponses 3 et 4) et la moyenne. Exemple : sur 20 répondants à la question 2, 2 réponses « 2 », 9 réponses « 3 » et 9 réponses « 4 ». Taux de satisfaction = (9 + 9) ÷ 20 × 100 = 90 %. Moyenne = (2 × 2 + 9 × 3 + 9 × 4) ÷ 20 = (4 + 27 + 36) ÷ 20 = 3,35 sur 4. Les réponses ouvertes sont regroupées par thème. La synthèse, d'une page, est transmise à la responsable RH, au manager et à l'organisme ; elle est conservée dans la fiche fournisseur. Un taux de satisfaction inférieur au seuil fixé par l'entreprise (par exemple 75 %) déclenche un échange avec l'organisme avant toute nouvelle commande.</p>

<h3>Indicateurs annuels de la formation</h3>
<ul>
<li>Taux de réalisation du plan, nombre d'heures de formation, nombre de stagiaires.</li>
<li>Taux d'accès à la formation par sexe, catégorie professionnelle, tranche d'âge (contrôle de l'égalité d'accès).</li>
<li>Coût moyen par heure-stagiaire, effort de formation en pourcentage de la masse salariale.</li>
<li>Taux de satisfaction moyen à chaud, taux de transfert à froid.</li>
<li>Nombre de certifications obtenues, taux de réussite.</li>
<li>Nombre de salariés sans formation non obligatoire sur la période de l'état des lieux récapitulatif (exposition à l'abondement correctif).</li>
</ul>`,
      },
      {
        title: "9.10 – CSE, BDESE, DPEF/CSRD et qualité de vie et des conditions de travail",
        content: `<h3>Le CSE et la formation</h3>
<p>Dans les entreprises d'au moins 50 salariés, le CSE est consulté chaque année, sauf accord prévoyant une autre périodicité dans la limite de trois ans, sur trois thèmes (article L2312-17) :</p>
<ol>
<li>les <strong>orientations stratégiques</strong> de l'entreprise, y compris leurs conséquences sur la gestion prévisionnelle des emplois et des compétences et les orientations de la formation professionnelle (article L2312-24) ;</li>
<li>la <strong>situation économique et financière</strong> ;</li>
<li>la <strong>politique sociale</strong>, les conditions de travail et l'emploi, qui comprend notamment l'évolution de l'emploi, les qualifications, le <strong>programme pluriannuel de formation</strong>, les actions de formation envisagées par l'employeur, l'apprentissage, les conditions d'accueil en stage, l'égalité professionnelle (article L2312-26).</li>
</ol>
<p>À défaut d'accord, le CSE dispose d'un délai d'un mois pour rendre son avis à compter de la communication des informations (deux mois en cas d'intervention d'un expert), à l'issue duquel il est réputé avoir rendu un avis négatif (articles R2312-5 et R2312-6). Les informations sont mises à disposition dans la BDESE. Dans les entreprises d'au moins 300 salariés, le CSE doit en outre constituer une commission de la formation (article L2315-49) : ce n'est pas le cas d'ALTÉA (148 salariés).</p>
<p>Le rôle de l'assistant RH : préparer les données (bilan de l'année écoulée, plan prévisionnel, indicateurs d'accès par sexe et par catégorie), les mettre à jour dans la BDESE, préparer la présentation pour la réunion, puis consigner l'avis dans le tableau de suivi.</p>

<h3>La BDESE</h3>
<p>La base de données économiques, sociales et environnementales (articles L2312-18 et L2312-21, R2312-8 et R2312-9) rassemble les informations nécessaires aux consultations récurrentes. Obligatoire dans les entreprises d'au moins 50 salariés, elle est accessible en permanence aux membres du CSE et aux délégués syndicaux, qui sont tenus à une obligation de discrétion sur les informations présentées comme confidentielles. Son contenu peut être fixé par accord ; à défaut, il est défini par le Code du travail selon que l'entreprise a moins ou plus de 300 salariés. La loi Climat et résilience du 22 août 2021 y a ajouté les conséquences environnementales de l'activité.</p>
<p>Pour la formation, la BDESE comprend notamment les investissements en formation, les publics concernés, les dépenses, les heures, les dispositifs mobilisés, le nombre d'apprentis et de contrats de professionnalisation, ainsi que les indicateurs d'égalité professionnelle (accès à la formation selon le sexe). L'assistant RH alimente ces rubriques à partir du tableau de suivi et vérifie la cohérence avec la DSN et la paie.</p>

<h3>De la DPEF au rapport de durabilité (CSRD)</h3>
<p>Le REAC de 2020 cite la déclaration de performance extra-financière (DPEF). Depuis la transposition de la directive (UE) 2022/2464 dite CSRD par l'ordonnance n° 2023-1142 du 6 décembre 2023, la DPEF est progressivement remplacée par un <strong>rapport de durabilité</strong> établi selon les normes européennes ESRS, avec un volet social important (effectifs, formation et développement des compétences, santé et sécurité, égalité de traitement). La directive (UE) 2025/794 dite « stop-the-clock » a reporté de deux ans les obligations des vagues suivantes, et le paquet législatif « Omnibus » de simplification modifie les seuils d'assujettissement : les entreprises concernées et le calendrier sont à vérifier à la date de la mission. ALTÉA SERVICES, avec 148 salariés, n'est pas directement assujettie ; elle peut néanmoins recevoir de ses grands clients des questionnaires de durabilité portant sur la formation de ses salariés (chaîne de valeur), auxquels l'assistant RH contribue avec les indicateurs du plan.</p>

<h3>La qualité de vie et des conditions de travail (QVCT)</h3>
<p>Le REAC parle de « qualité de vie au travail » (QVT). L'accord national interprofessionnel du 9 décembre 2020 et la loi n° 2021-1018 du 2 août 2021 ont consacré la notion de <strong>qualité de vie et des conditions de travail</strong> (QVCT), qui associe la QVT à la prévention des risques et aux conditions de travail. Dans les entreprises où sont constituées une ou plusieurs sections syndicales d'organisations représentatives, l'employeur engage une négociation sur l'égalité professionnelle entre les femmes et les hommes et la qualité de vie et des conditions de travail (article L2242-1).</p>
<p>La formation est un levier de QVCT : formation des managers à la prévention des risques psychosociaux, prévention des troubles musculosquelettiques (gestes et postures, choix du matériel), accueil des nouveaux salariés, droit à la déconnexion pour les fonctions support, accès égal à la formation des salariés à temps partiel et en horaires décalés (très nombreux dans la propreté, où les prestations ont souvent lieu tôt le matin ou en soirée). L'Anact (anact.fr) publie des outils méthodologiques.</p>

<h3>Égalité professionnelle et transparence salariale</h3>
<p>L'accès à la formation est un indicateur de l'égalité professionnelle. Les entreprises d'au moins 50 salariés publient chaque année, au plus tard le 1er mars, leur index de l'égalité professionnelle. La directive (UE) 2023/970 du 10 mai 2023 sur la transparence des rémunérations devait être transposée au plus tard le 7 juin 2026 : elle renforce l'information des candidats et des salariés sur les rémunérations et les obligations de rapport sur les écarts. L'état de la transposition en droit français est à vérifier sur legifrance.gouv.fr et travail-emploi.gouv.fr avant toute communication.</p>

<h3>Exemple : préparer la consultation 2027 du CSE d'ALTÉA</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Document</th><th>Contenu</th><th>Responsable</th></tr>
<tr><td>Bilan 2026</td><td>Actions réalisées, heures, stagiaires par sexe et catégorie, dépenses, taux de satisfaction, certifications obtenues, alternants accueillis</td><td>Assistant RH, validé par Nathalie ROUSSEL</td></tr>
<tr><td>Plan prévisionnel 2027</td><td>Actions A à E, objectifs, publics, calendrier, budget, financements</td><td>Assistant RH</td></tr>
<tr><td>Orientations</td><td>Axes de la direction : marché santé, sécurité, encadrement de proximité</td><td>Direction</td></tr>
<tr><td>Mise à jour BDESE</td><td>Rubrique formation et égalité professionnelle</td><td>Assistant RH</td></tr>
<tr><td>Convocation et ordre du jour</td><td>Arrêtés conjointement par le président et le secrétaire du CSE, communiqués au moins 3 jours avant la réunion (article L2315-30)</td><td>Responsable RH</td></tr>
</table>`,
      },
      {
        title: "9.11 – Quiz du chapitre",
        content: `<h3>Dix questions</h3>
<p>Une seule bonne réponse par question.</p>
<ol>
<li>L'article L6321-1 du Code du travail impose à l'employeur :<br>a) De consacrer 1 % de la masse salariale au plan<br>b) D'assurer l'adaptation des salariés à leur poste et de veiller au maintien de leur capacité à occuper un emploi<br>c) De financer le CPF de chaque salarié<br>d) De proposer un bilan de compétences tous les cinq ans</li>
<li>Une formation qui conditionne l'exercice d'une activité en application d'un texte :<br>a) Peut se dérouler hors temps de travail sans accord du salarié<br>b) Constitue du temps de travail effectif avec maintien de la rémunération<br>c) Doit être financée par le CPF<br>d) N'a pas à figurer au plan</li>
<li>À défaut d'accord collectif, une formation non obligatoire peut se dérouler hors temps de travail dans la limite de :<br>a) 7 heures par an<br>b) 30 heures par an et par salarié, avec son accord écrit<br>c) 35 heures par mois<br>d) Aucune limite</li>
<li>L'OPCO de rattachement de la branche de la propreté (IDCC 3043) est :<br>a) L'OPCO EP<br>b) AKTO<br>c) L'Afdas<br>d) Constructys</li>
<li>Un salarié demande à suivre, sur son temps de travail, une formation CPF de 4 mois. Il doit présenter sa demande :<br>a) 15 jours avant<br>b) Au moins 60 jours avant le début<br>c) Au moins 120 jours avant le début<br>d) Il n'a pas besoin d'accord</li>
<li>Pour une entreprise de 148 salariés, la contribution à la formation professionnelle est de :<br>a) 0,55 % de la masse salariale<br>b) 1 % de la masse salariale<br>c) 1,68 % de la masse salariale<br>d) 0,68 % de la masse salariale</li>
<li>La certification Qualiopi est nécessaire :<br>a) Pour toute formation, même payée sur les fonds propres de l'entreprise<br>b) Pour qu'un organisme accède aux fonds publics et mutualisés (OPCO, CPF, État, régions...)<br>c) Uniquement pour les CFA<br>d) Uniquement pour les bilans de compétences</li>
<li>Le niveau 3 du modèle de Kirkpatrick mesure :<br>a) La satisfaction à chaud<br>b) Les connaissances acquises<br>c) Le transfert des acquis en situation de travail<br>d) Le retour sur investissement financier</li>
<li>Depuis le 1er février 2026, Pro-A et Transitions collectives sont remplacés par :<br>a) Le CPF de transition<br>b) La période de reconversion<br>c) Le contrat de professionnalisation<br>d) Le FNE-Formation</li>
<li>Le contrat d'apprentissage doit être transmis à l'OPCO :<br>a) Avant la signature<br>b) Au plus tard dans les 5 jours ouvrables suivant le début d'exécution<br>c) Dans le mois suivant la fin de la période d'essai<br>d) Avec la première DSN annuelle</li>
</ol>

<h3>Corrigé</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>b</td><td>Obligation d'adaptation et de maintien dans l'emploi, quelle que soit la taille de l'entreprise. Le 1 % est une contribution, pas un budget de plan imposé.</td></tr>
<tr><td>2</td><td>b</td><td>Article L6321-2 : formation obligatoire = temps de travail effectif et maintien de la rémunération.</td></tr>
<tr><td>3</td><td>b</td><td>Article L6321-6 : 30 heures par an et par salarié (ou 2 % du forfait), accord écrit du salarié, refus non fautif.</td></tr>
<tr><td>4</td><td>b</td><td>La branche de la propreté relève d'AKTO (services à forte intensité de main-d'œuvre), et non de l'OPCO EP.</td></tr>
<tr><td>5</td><td>b</td><td>Formation de moins de six mois : demande au moins 60 jours avant ; réponse de l'employeur sous 30 jours, silence valant acceptation.</td></tr>
<tr><td>6</td><td>b</td><td>1 % à partir de 11 salariés. 1,68 % correspond à la CUFPA (1 % + 0,68 % de taxe d'apprentissage).</td></tr>
<tr><td>7</td><td>b</td><td>Article L6316-1. Une entreprise peut acheter une formation à un organisme non certifié sur ses fonds propres.</td></tr>
<tr><td>8</td><td>c</td><td>Niveau 1 réaction, 2 apprentissage, 3 comportement (transfert), 4 résultats.</td></tr>
<tr><td>9</td><td>b</td><td>La loi du 24 octobre 2025 a créé la période de reconversion (repère : 150 à 450 heures sur 12 mois) ; conditions et prise en charge à confirmer auprès de l'OPCO. Le CPF de transition (projet de transition professionnelle) subsiste.</td></tr>
<tr><td>10</td><td>b</td><td>Article L6224-1 : l'employeur transmet le contrat à l'OPCO dans les 5 jours ouvrables suivant le début d'exécution.</td></tr>
</table>`,
      },
      {
        title: "9.12 – Cas pratique corrigé : la campagne formation 2027 d'ALTÉA SERVICES",
        content: `<h3>Énoncé</h3>
<p>Vous êtes l'apprenti(e) assistant(e) RH d'ALTÉA SERVICES. Le lundi 7 décembre 2026, Nathalie ROUSSEL vous transmet les éléments suivants et vous demande de les traiter avant vendredi.</p>
<ol>
<li><strong>Message de Mme Sabrina OUALI, agente de propreté depuis 2021</strong> : « Je voudrais faire une formation d'aide-soignante avec mon CPF. Elle dure 10 mois à temps plein. Est-ce que l'entreprise peut refuser ? Est-ce que je serai payée ? »</li>
<li><strong>Message de M. Thomas GIRAUD, responsable de site</strong> : « Je veux envoyer mes 6 agents à la formation autolaveuse un samedi pour ne pas gêner l'activité. Ce sera hors temps de travail, donc pas payé. Vous pouvez les convoquer ? »</li>
<li><strong>Données de satisfaction</strong> de la formation « Management de proximité » réalisée en novembre pour 8 chefs d'équipe : question « Les objectifs ont été atteints » : 1 réponse « 1 », 1 réponse « 2 », 4 réponses « 3 », 2 réponses « 4 ».</li>
<li><strong>Demande de la responsable RH</strong> : rédiger le message d'information au CSE accompagnant la mise à jour de la BDESE (rubrique formation).</li>
<li><strong>Question de M. Karim BENSAÏD</strong> : « Le cabinet comptable me demande à combien s'élève la CUFPA pour 2027 si la masse salariale prévisionnelle est de 4 050 000 €. »</li>
</ol>

<h3>Corrigé</h3>
<h4>1. Réponse à Mme OUALI</h4>
<p>La formation dure plus de six mois et se déroule à temps plein : un simple CPF pendant le temps de travail n'est pas adapté. Le dispositif pertinent est le <strong>projet de transition professionnelle (CPF de transition)</strong>.</p>
<ul>
<li>Conditions d'ancienneté : 24 mois d'activité salariée dont 12 dans l'entreprise. Mme OUALI, en poste depuis 2021, remplit la condition d'ancienneté dans l'entreprise (à vérifier dans le registre du personnel).</li>
<li>Demande d'autorisation d'absence à l'employeur : au plus tard 120 jours avant le début, puisque l'interruption continue dépasse six mois. L'employeur répond dans les 30 jours ; il ne peut pas refuser si les conditions sont réunies, mais peut reporter l'absence dans les cas et limites prévus par la réglementation.</li>
<li>Financement et rémunération : le dossier est déposé par la salariée auprès de Transitions Pro Île-de-France, qui décide de la prise en charge des frais pédagogiques et de la rémunération selon les règles réglementaires. Elle peut se faire aider gratuitement par un conseiller en évolution professionnelle (CEP).</li>
<li>Confidentialité : la demande ne doit pas circuler au-delà de la responsable RH et du manager direct pour l'organisation de l'absence.</li>
</ul>
<blockquote>Proposition de réponse : « Madame, votre projet de formation d'aide-soignante peut être financé dans le cadre d'un projet de transition professionnelle. Votre ancienneté vous permet d'y prétendre. Vous devez nous adresser votre demande d'autorisation d'absence au plus tard 120 jours avant le début de la formation ; nous vous répondrons sous 30 jours. Le financement de la formation et de votre rémunération est décidé par Transitions Pro Île-de-France, auprès de qui vous déposerez votre dossier. Un conseiller en évolution professionnelle peut vous accompagner gratuitement. Je reste à votre disposition pour toute question. »</blockquote>

<h4>2. Réponse à M. GIRAUD</h4>
<p>La formation à la conduite des autolaveuses est une <strong>formation d'adaptation au poste</strong> : elle relève de l'obligation de l'article L6321-1 et constitue du temps de travail effectif. Elle ne peut pas être imposée hors temps de travail sans rémunération. Si elle a lieu un samedi, ce temps est payé comme du temps de travail, en respectant la durée maximale, le repos hebdomadaire et, le cas échéant, les heures supplémentaires ou complémentaires (et les règles conventionnelles applicables aux agents à temps partiel). Proposition : organiser la session en intra sur le site client en semaine, de préférence sur un créneau de moindre activité, ce qui réduit aussi le coût (voir 9.5).</p>

<h4>3. Exploitation des résultats</h4>
<ul>
<li>Taux de satisfaction (réponses 3 et 4) : (4 + 2) ÷ 8 × 100 = 75 %.</li>
<li>Moyenne : (1 × 1 + 1 × 2 + 4 × 3 + 2 × 4) ÷ 8 = (1 + 2 + 12 + 8) ÷ 8 = 23 ÷ 8 = 2,875, soit 2,88 sur 4.</li>
<li>Analyse : 2 chefs d'équipe sur 8 estiment que les objectifs ne sont pas atteints. Avant de conclure, lire les commentaires ouverts, échanger avec l'organisme et programmer l'évaluation à froid (questionnaire au salarié et au manager à trois mois) pour vérifier le transfert.</li>
</ul>

<h4>4. Message au CSE</h4>
<blockquote>« Mesdames, Messieurs les membres du CSE, la rubrique « Formation » de la BDESE a été mise à jour le 9 décembre 2026. Elle comprend le bilan des actions réalisées en 2026 (heures, stagiaires par sexe et catégorie professionnelle, dépenses, satisfaction) ainsi que le projet de plan de développement des compétences 2027, en vue de la consultation sur la politique sociale inscrite à l'ordre du jour de la réunion du [date]. Les informations relatives aux rémunérations sont présentées comme confidentielles. Le service RH se tient à votre disposition. »</blockquote>

<h4>5. CUFPA 2027</h4>
<ul>
<li>Contribution à la formation professionnelle : 4 050 000 × 1 % = 40 500 €.</li>
<li>Taxe d'apprentissage : 4 050 000 × 0,68 % = 27 540 € (dont part principale 0,59 % = 23 895 € et solde 0,09 % = 3 645 €).</li>
<li>CUFPA : 40 500 + 27 540 = 68 040 € (soit 4 050 000 × 1,68 %).</li>
<li>À ajouter : la contribution CPF-CDD (1 % des rémunérations des CDD concernés) et les éventuelles contributions conventionnelles de branche, à vérifier.</li>
</ul>

<h3>Critères d'évaluation appliqués</h3>
<p>Cadre juridique respecté (dispositif adapté, délais exacts, refus du travail gratuit), informations fiables (calculs vérifiés, renvoi vers les sources), documents exhaustifs, confidentialité (projet personnel de Mme OUALI, données de rémunération).</p>`,
      },
    ],
  },
  {
    title: "Chapitre 10 – Préparer le titre professionnel ARH : dossier professionnel, épreuves et boîte à outils",
    description:
      "Module de préparation à la certification (35 h au CFA). Le chapitre décrit précisément le dispositif d'évaluation du titre professionnel Assistant ressources humaines (TP-01284, RNCP41366) tel que le fixe le référentiel d'évaluation : session de validation organisée dans un centre agréé par la DREETS, jury de professionnels, mise en situation professionnelle de 3 h 30 (étude de cas couvrant les six compétences, précédée de 15 minutes de prise en main, documentation et notes professionnelles autorisées), entretien technique de 30 minutes (10 minutes sur les choix de la mise en situation et 20 minutes sur CP1 et CP5), entretien final de 20 minutes avec le dossier professionnel, prise en compte des évaluations en cours de formation (ECF), épreuves des CCP séparés et capitalisation. Il guide la rédaction du dossier professionnel (structure officielle, exemples rédigés pour CP1 et CP5), propose un sujet blanc complet sur ALTÉA SERVICES avec un corrigé détaillé, des questions types pour les entretiens, puis une boîte à outils réutilisable en entreprise : check-lists (embauche, sortie, variables de paie, campagne d'entretiens, recrutement, plan de formation), calendrier social annuel, sources de veille officielles, glossaire de plus de 60 termes, et un quiz final transversal de 20 questions corrigées.",
    sections: [
      {
        title: "10.1 – La session de validation du titre professionnel",
        content: `<h3>Le cadre réglementaire</h3>
<p>Le titre professionnel est une certification du ministère chargé de l'emploi, régie par les articles R338-1 et suivants du Code de l'éducation et par l'arrêté du 22 décembre 2015 relatif aux conditions de délivrance du titre professionnel. Chaque titre est défini par trois documents : le <strong>REAC</strong> (référentiel emploi, activités et compétences), le <strong>RC</strong> (référentiel de certification) et le <strong>RE</strong> (référentiel d'évaluation). Pour le titre ARH (code TP-01284), le RE fixe les modalités ci-dessous ; c'est lui qui fait foi en cas de doute.</p>

<h3>Ce que le jury prend en compte</h3>
<p>Pour un candidat issu d'un parcours de formation, comme l'apprenti du CFA, le jury se prononce au vu de quatre éléments :</p>
<ol>
<li>la <strong>mise en situation professionnelle</strong>, complétée par l'entretien technique ;</li>
<li>le <strong>dossier professionnel</strong> (DP) et ses annexes éventuelles ;</li>
<li>les <strong>résultats des évaluations passées en cours de formation</strong> (ECF) ;</li>
<li>l'<strong>entretien final</strong>, destiné à vérifier le niveau de maîtrise des compétences requises pour l'exercice des activités du titre.</li>
</ol>

<h3>Le dispositif d'évaluation du titre ARH</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Modalité</th><th>Compétences évaluées</th><th>Durée</th><th>Organisation</th></tr>
<tr><td>Mise en situation professionnelle (MSP)</td><td>Les six compétences : CP1 gestion administrative du personnel, CP2 variables et paramètres de paie, CP3 indicateurs RH, CP4 gestion des emplois et carrières, CP5 recrutement et intégration, CP6 développement des compétences</td><td>3 h 30</td><td>Étude de cas en une seule épreuve. Ouverture des plis en deux temps : prise en main du poste (15 min, non comprises dans les 3 h 30), puis mise en situation. Accès à une documentation professionnelle papier, numérique ou par Internet ; possibilité d'imprimer ; notes professionnelles autorisées, sans échange entre candidats</td></tr>
<tr><td>Entretien technique</td><td>CP1 et CP5</td><td>30 min</td><td>Après l'évaluation de la MSP par le jury : 10 min sur les choix opérés lors de la MSP, 20 min sur les compétences CP1 et CP5, à partir d'un guide de questionnement</td></tr>
<tr><td>Questionnaire professionnel</td><td>Sans objet</td><td>—</td><td>—</td></tr>
<tr><td>Questionnement à partir de productions</td><td>Sans objet</td><td>—</td><td>—</td></tr>
<tr><td>Entretien final</td><td>Représentation du métier</td><td>20 min</td><td>Y compris l'échange sur le dossier professionnel</td></tr>
<tr><td colspan="2"><strong>Durée totale pour le candidat</strong></td><td colspan="2"><strong>4 h 20</strong> (le jury est présent 50 minutes auprès de chaque candidat : entretien technique et entretien final)</td></tr>
</table>
<p>Les compétences transversales (actualiser ses connaissances en GRH, mettre en œuvre des modes opératoires, maintenir son attention de façon continue) ne font pas l'objet d'une épreuve distincte : elles sont évaluées à travers les compétences professionnelles.</p>

<h3>Les acteurs de la session</h3>
<ul>
<li><strong>La DREETS</strong> (direction régionale de l'économie, de l'emploi, du travail et des solidarités) agrée les centres qui organisent les sessions, désigne et habilite les membres du jury, contrôle le déroulement et délivre le titre au nom du ministre.</li>
<li><strong>Le centre agréé</strong> (ici, le CFA ou le centre avec lequel il a passé convention) inscrit les candidats, prépare le plateau technique (postes informatiques, imprimante, accès Internet, logiciels bureautiques), surveille l'épreuve, transmet au jury le DP et les résultats des ECF, et désigne un responsable de session.</li>
<li><strong>Le jury</strong> est composé de professionnels du métier habilités, qui ne doivent pas avoir de lien avec le candidat (ni formateur, ni employeur, ni maître d'apprentissage). Il corrige la MSP à l'aide d'une grille, conduit les entretiens et délibère.</li>
</ul>

<h3>La convocation et le jour J</h3>
<p>Le candidat reçoit une convocation du centre indiquant la date, l'heure, le lieu et les documents à apporter. Préparez la veille :</p>
<ul>
<li>la convocation et une pièce d'identité en cours de validité ;</li>
<li>le dossier professionnel signé, sous la forme demandée par le centre ;</li>
<li>vos notes professionnelles : modèles de documents, tableaux de calcul, check-lists, fiches de synthèse réglementaires, sur papier ou sur clé USB (vérifiez avec le centre le support accepté) ;</li>
<li>de quoi écrire, une calculatrice si vous en avez l'habitude.</li>
</ul>
<p>Le téléphone et les objets connectés sont déposés et éteints auprès du surveillant pendant toute l'épreuve : le règlement de session le prévoit pour garantir l'absence de fraude. Toute fraude ou tentative entraîne l'exclusion de la session.</p>

<h3>Les résultats</h3>
<p>Le jury délibère à l'issue des épreuves au vu de l'ensemble des éléments. Trois issues sont possibles :</p>
<ul>
<li>le candidat obtient le <strong>titre complet</strong> ;</li>
<li>le candidat obtient un ou plusieurs <strong>CCP</strong> (certificats de compétences professionnelles) correspondant aux blocs dont les compétences sont validées : CCP1 « Assurer les missions opérationnelles de la gestion des ressources humaines » et/ou CCP2 « Contribuer au développement des ressources humaines » ;</li>
<li>le candidat n'obtient aucune certification.</li>
</ul>
<p>Le candidat qui n'a obtenu qu'une partie peut se représenter aux CCP manquants (voir 10.4). Les résultats sont notifiés par le centre ; le titre est délivré par le ministère chargé de l'emploi.</p>`,
      },
      {
        title: "10.2 – Le dossier professionnel : structure officielle et méthode de rédaction",
        content: `<h3>À quoi sert le dossier professionnel</h3>
<p>Le dossier professionnel (DP) est un document rédigé par le candidat, qui décrit des situations réelles dans lesquelles il a mis en œuvre les compétences du titre. Il est obligatoire : sans DP, le candidat ne peut pas se présenter. Le jury le lit avant ou pendant la session et s'en sert lors de l'entretien final. Le DP <strong>n'est pas noté</strong> en tant que tel, mais il influence fortement l'appréciation du jury : il prouve que les compétences ont été exercées en entreprise, au-delà de l'épreuve.</p>
<p>Le modèle officiel est téléchargeable sur le site du ministère chargé du travail (rubrique titres professionnels). Il doit être utilisé tel quel : on ne modifie ni l'ordre ni les intitulés des rubriques.</p>

<h3>La structure officielle</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu</th><th>Conseils</th></tr>
<tr><td>Page de garde</td><td>Nom de naissance, nom d'usage, prénom, adresse, titre professionnel visé, modalité d'accès (parcours de formation, VAE)</td><td>Intitulé exact : « Assistant ressources humaines » ; cocher « parcours de formation »</td></tr>
<tr><td>Présentation du dossier</td><td>Texte explicatif du ministère</td><td>À lire, ne pas modifier</td></tr>
<tr><td>Sommaire</td><td>Liste des activités-types et des exemples, avec pagination</td><td>Mettre à jour en dernier</td></tr>
<tr><td>Exemples de pratique professionnelle</td><td>Pour chaque activité-type (AT1 « Assurer les missions opérationnelles de la gestion des ressources humaines », AT2 « Contribuer au développement des ressources humaines »), un ou plusieurs exemples, chacun structuré en cinq rubriques : 1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions ; 2. Précisez les moyens utilisés ; 3. Avec qui avez-vous travaillé ? ; 4. Contexte (nom de l'entreprise, service, période d'exercice) ; 5. Informations complémentaires (facultatif)</td><td>Le CFA recommande un exemple par compétence professionnelle, soit six exemples, chacun de 1 à 3 pages</td></tr>
<tr><td>Titres, diplômes, CQP, attestations de formation</td><td>Liste des certifications et formations</td><td>Facultatif ; joindre les copies si demandé</td></tr>
<tr><td>Déclaration sur l'honneur</td><td>Le candidat certifie l'exactitude des informations et être l'auteur des réalisations</td><td>Datée et signée : sans signature, le dossier est incomplet</td></tr>
<tr><td>Documents illustrant la pratique professionnelle</td><td>Productions réelles : tableau de bord, offre d'emploi, programme d'intégration, questionnaire d'évaluation</td><td>Facultatif ; toujours anonymisés</td></tr>
<tr><td>Annexes</td><td>Uniquement si le référentiel de certification le prévoit</td><td>Pour le titre ARH, se conformer aux consignes du centre</td></tr>
</table>

<h3>Rédiger en « je »</h3>
<p>Le jury évalue <strong>vos</strong> compétences. Chaque exemple doit faire apparaître ce que vous avez fait personnellement, et pas ce que « le service » ou « nous » avons fait. Comparez :</p>
<ul>
<li>À éviter : « Le service RH a organisé la campagne d'entretiens annuels. »</li>
<li>À privilégier : « J'ai préparé le planning de la campagne d'entretiens des 42 salariés du site de Créteil, j'ai paramétré les formulaires dans Lucca, j'ai envoyé les invitations aux managers et j'ai relancé chaque semaine les entretiens non réalisés. »</li>
</ul>
<p>Utilisez des verbes d'action précis (j'ai vérifié, calculé, rédigé, saisi, transmis, contrôlé, alerté, archivé), des chiffres (nombre de salariés, de candidatures, délais), le vocabulaire du référentiel et le nom des outils réellement utilisés. Décrivez les difficultés rencontrées et la manière dont vous les avez résolues : c'est souvent la partie la plus convaincante.</p>

<h3>La méthode en six étapes</h3>
<ol>
<li><strong>Inventorier</strong> dès le premier mois en entreprise les situations vécues, dans un carnet de bord (date, tâche, outil, interlocuteurs, résultat).</li>
<li><strong>Choisir</strong> pour chaque compétence la situation la plus complète, la plus récente et la plus personnelle.</li>
<li><strong>Relire</strong> la fiche compétence du REAC pour vérifier que l'exemple couvre le processus décrit et les critères de performance.</li>
<li><strong>Rédiger</strong> les cinq rubriques, en commençant par la rubrique 1, la plus importante.</li>
<li><strong>Faire relire</strong> par le formateur (contenu) et par le maître d'apprentissage (exactitude et confidentialité).</li>
<li><strong>Finaliser</strong> : orthographe, pagination, sommaire, déclaration signée, documents anonymisés.</li>
</ol>

<h3>Les documents illustratifs</h3>
<p>Ils prouvent la réalité de vos réalisations. Bons exemples : une offre d'emploi que vous avez rédigée et publiée, une grille d'analyse de candidatures, un tableau de bord d'absentéisme avec graphique, une fiche de poste mise à jour, un questionnaire d'évaluation de formation. Règles impératives :</p>
<ul>
<li>anonymiser toutes les données personnelles des salariés et candidats (noms, numéros de sécurité sociale, adresses, salaires individuels, motifs d'absence) ;</li>
<li>obtenir l'accord de l'employeur pour tout document interne ;</li>
<li>ne joindre que des documents en lien direct avec l'exemple décrit ;</li>
<li>indiquer sous chaque document l'exemple qu'il illustre.</li>
</ul>

<h3>La déclaration sur l'honneur</h3>
<p>Elle prend la forme suivante dans le modèle officiel : « Je soussigné(e) [prénom et nom], déclare sur l'honneur que les renseignements fournis dans ce dossier sont exacts et que je suis l'auteur(e) des réalisations jointes. Fait à [lieu], le [date], pour faire valoir ce que de droit. » Suivie de la signature. Une fausse déclaration expose à l'annulation du titre et à des poursuites.</p>

<h3>Les erreurs fréquentes</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Erreur</th><th>Conséquence</th><th>Correction</th></tr>
<tr><td>Recopier le REAC ou un cours</td><td>Le jury ne voit pas de pratique réelle</td><td>Décrire une situation datée, avec des faits</td></tr>
<tr><td>Rédiger en « nous » ou « on »</td><td>Impossible d'identifier la contribution du candidat</td><td>« Je » systématique</td></tr>
<tr><td>Exemples trop généraux (« je gère l'administration du personnel »)</td><td>Pas de preuve de maîtrise</td><td>Une situation précise par exemple</td></tr>
<tr><td>Données personnelles non anonymisées</td><td>Manquement au RGPD et à la confidentialité, critère évalué dans chaque compétence</td><td>Initiales ou noms fictifs, montants globaux</td></tr>
<tr><td>Erreurs juridiques dans le récit (délai faux, document inexistant)</td><td>Le jury interroge et doute de la compétence</td><td>Faire relire, vérifier les sources</td></tr>
<tr><td>Activité-type oubliée</td><td>Dossier incomplet</td><td>Vérifier le sommaire : AT1 et AT2 représentées</td></tr>
<tr><td>Déclaration non signée</td><td>Dossier irrecevable en l'état</td><td>Signer et dater</td></tr>
<tr><td>Fautes d'orthographe nombreuses</td><td>Image professionnelle dégradée pour un métier de l'écrit</td><td>Relecture, correcteur, lecture à voix haute</td></tr>
</table>`,
      },
      {
        title: "10.3 – Deux exemples rédigés du dossier professionnel (CP1 et CP5)",
        content: `<h3>Exemple n° 1 – Activité-type 1, compétence CP1 : réaliser les formalités d'embauche d'une agente de propreté en CDI à temps partiel</h3>
<h4>1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions</h4>
<p>En février 2027, le responsable de site de la clinique de Saint-Maur, M. Thomas GIRAUD, a recruté Mme L. D. comme agente de propreté en CDI à temps partiel (24 heures par semaine) à compter du lundi 1er mars 2027. Ma responsable, Nathalie ROUSSEL, m'a confié l'ensemble des formalités d'embauche, qu'elle a validées avant envoi.</p>
<p>J'ai d'abord vérifié la complétude du dossier de la salariée : pièce d'identité, numéro de sécurité sociale, RIB, justificatif de domicile. La salariée, ressortissante d'un pays hors Union européenne, m'a présenté un titre de séjour autorisant à travailler : j'en ai demandé l'authentification à la préfecture au moins deux jours ouvrables avant l'embauche (article R5221-41), selon la procédure indiquée sur le site de l'administration, et j'ai conservé la demande et la réponse dans le dossier.</p>
<p>J'ai effectué la déclaration préalable à l'embauche (DPAE) sur net-entreprises le 24 février, soit dans les huit jours précédant l'embauche, et j'ai archivé l'accusé de réception. J'ai inscrit la salariée sur le registre unique du personnel dans Lucca, en renseignant les mentions obligatoires (nom, prénoms, nationalité, date de naissance, sexe, emploi, qualification, dates d'entrée, type de contrat, et la référence du titre autorisant à travailler).</p>
<p>J'ai rédigé le contrat de travail à partir du modèle de l'entreprise. S'agissant d'un temps partiel, j'ai vérifié la présence des mentions obligatoires de l'article L3123-6 : qualification, éléments de rémunération, durée hebdomadaire, répartition de la durée entre les jours de la semaine, cas dans lesquels cette répartition peut être modifiée, modalités de communication des horaires, limites des heures complémentaires. J'ai contrôlé la classification et le salaire minimum au regard de la grille de la convention collective de la propreté (IDCC 3043). J'ai fait relire le projet à Nathalie ROUSSEL, puis j'ai remis le contrat en deux exemplaires à la salariée le jour de son arrivée.</p>
<p>J'ai demandé au service de prévention et de santé au travail la visite d'information et de prévention, qui doit intervenir dans les trois mois suivant la prise de poste pour un salarié sans suivi renforcé, et j'ai noté l'échéance dans le tableau de suivi médical. J'ai remis à la salariée la notice d'information de la complémentaire santé et de la prévoyance et j'ai recueilli son bulletin d'affiliation. Enfin, j'ai transmis au cabinet comptable, via le formulaire d'entrée de Silae, les éléments nécessaires à la création du dossier de paie (date d'entrée, horaire contractuel, salaire de base, classification, affiliation).</p>
<p>Difficulté rencontrée : le RIB fourni était au nom d'un tiers. J'ai expliqué à la salariée que le salaire devait être versé sur un compte dont elle est titulaire ou cotitulaire et j'ai obtenu un nouveau RIB avant la clôture de la paie de mars.</p>
<h4>2. Précisez les moyens utilisés</h4>
<p>Net-entreprises (DPAE), SIRH Lucca (registre unique du personnel, dossier salarié), modèle de contrat de l'entreprise et convention collective consultée sur Légifrance, formulaire d'entrée Silae, check-list d'embauche du service RH, messagerie, armoire sécurisée pour les pièces papier.</p>
<h4>3. Avec qui avez-vous travaillé ?</h4>
<p>Nathalie ROUSSEL, responsable RH et maître d'apprentissage (validation du contrat), M. Thomas GIRAUD, responsable de site (horaires et date de prise de poste), Karim BENSAÏD, gestionnaire paie, et le cabinet comptable (création du dossier de paie), le service de prévention et de santé au travail, la salariée.</p>
<h4>4. Contexte</h4>
<p>ALTÉA SERVICES, Créteil – Service ressources humaines – Période d'exercice : du 15 février 2027 au 31 mars 2027.</p>
<h4>5. Informations complémentaires</h4>
<p>Document illustratif joint : check-list d'embauche complétée et anonymisée.</p>

<h3>Exemple n° 2 – Activité-type 2, compétence CP5 : contribuer au recrutement et à l'intégration d'un chef d'équipe</h3>
<h4>1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions</h4>
<p>En avril 2027, à la suite du départ en retraite d'un chef d'équipe du secteur santé, Nathalie ROUSSEL m'a demandé de prendre en charge le recrutement de son remplaçant, de la rédaction du profil jusqu'à l'intégration, sous sa supervision.</p>
<p>J'ai conduit un entretien de 30 minutes avec le responsable d'exploitation pour analyser le besoin : missions principales, encadrement de 12 agents sur 3 sites, horaires (prise de poste à 6 heures), compétences techniques (protocoles de bionettoyage), compétences relationnelles. J'ai mis à jour la fiche de poste et rédigé un profil de poste d'une page distinguant les critères indispensables (expérience d'encadrement d'au moins deux ans, connaissance des protocoles en milieu de soins) et les critères souhaités.</p>
<p>J'ai rédigé l'offre d'emploi en veillant à la non-discrimination : intitulé au masculin et au féminin, aucune mention d'âge, de sexe ou de situation de famille, critères liés uniquement au poste ; mention du salaire selon la grille conventionnelle et du lieu de travail. Je l'ai publiée sur Welcome to the Jungle, Indeed et France Travail. En trois semaines, j'ai reçu 47 candidatures.</p>
<p>J'ai construit une grille d'analyse des candidatures directement issue du profil (5 critères pondérés) et je l'ai appliquée à toutes les candidatures. J'ai retenu 9 candidats que j'ai contactés par téléphone pour un entretien de présélection de 15 minutes structuré par une trame commune ; 4 ont été proposés à Nathalie ROUSSEL et au responsable d'exploitation, qui ont mené les entretiens finaux, auxquels j'ai assisté en prenant des notes sur la grille d'entretien.</p>
<p>J'ai répondu par écrit à tous les candidats non retenus. J'ai informé les candidats de la conservation de leur dossier dans notre vivier pendant deux ans, sauf opposition de leur part, conformément aux recommandations de la CNIL, et j'ai supprimé les candidatures des personnes qui s'y sont opposées.</p>
<p>J'ai ensuite construit le programme d'intégration du nouveau chef d'équipe, M. E. K., arrivé le 7 juin : accueil par la responsable RH et remise du livret d'accueil le premier jour, présentation aux équipes des trois sites la première semaine, désignation d'un chef d'équipe expérimenté comme référent, formation sécurité et protocoles du client la deuxième semaine, point d'étape à un mois avec un rapport d'étonnement, entretien de fin de période d'essai avec le responsable d'exploitation. J'ai planifié chaque étape dans l'agenda des intervenants et j'ai suivi leur réalisation.</p>
<p>Difficulté rencontrée : le responsable d'exploitation souhaitait écarter un candidat « trop âgé pour les horaires du matin ». J'ai rappelé, avec l'appui de ma responsable, que l'âge est un critère discriminatoire prohibé par l'article L1132-1 et que la grille ne retenait que des critères liés au poste ; le candidat a été évalué comme les autres.</p>
<h4>2. Précisez les moyens utilisés</h4>
<p>Fiche de poste et profil de poste (traitement de texte), job boards et espace recruteur France Travail, tableur pour la grille d'analyse et le suivi des candidatures, trame d'entretien téléphonique, modèle de lettre de réponse, livret d'accueil, agenda partagé.</p>
<h4>3. Avec qui avez-vous travaillé ?</h4>
<p>Nathalie ROUSSEL (validation à chaque étape), le responsable d'exploitation (besoin, entretiens), le chef d'équipe référent, les candidats.</p>
<h4>4. Contexte</h4>
<p>ALTÉA SERVICES, Créteil – Service ressources humaines – Période d'exercice : du 6 avril 2027 au 15 juillet 2027.</p>
<h4>5. Informations complémentaires</h4>
<p>Documents illustratifs joints : offre d'emploi publiée, grille d'analyse vierge, programme d'intégration (anonymisé).</p>

<h3>Ce qui rend ces exemples convaincants</h3>
<ul>
<li>Chaque étape du processus du REAC est présente, dans l'ordre réel.</li>
<li>Le candidat cite les textes à bon escient, sans en faire un cours.</li>
<li>Les critères de performance apparaissent dans les faits : délais respectés, documents conformes, confidentialité, non-discrimination.</li>
<li>Les difficultés montrent l'autonomie et le respect des limites de ses attributions (validation par la responsable).</li>
<li>Les personnes sont désignées par leurs initiales, les documents sont anonymisés.</li>
</ul>`,
      },
      {
        title: "10.4 – Les ECF, les CCP séparés, la capitalisation et l'après-titre",
        content: `<h3>Les évaluations passées en cours de formation (ECF)</h3>
<p>Pour un candidat issu d'un parcours de formation, le jury dispose des résultats des ECF. Ce sont des évaluations organisées par le centre de formation pendant le parcours, sur la base des compétences du référentiel. Elles ne remplacent pas l'épreuve finale mais l'éclairent : un jury qui hésite sur une compétence consulte les résultats des ECF correspondantes.</p>
<p>Au CFA, les ECF sont organisées par CCP :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>ECF</th><th>Compétences</th><th>Forme</th><th>Moment indicatif</th></tr>
<tr><td>ECF 1</td><td>CP1 – Gestion administrative du personnel</td><td>Étude de cas écrite : dossier d'embauche, absence, rupture</td><td>Fin de la séquence CP1</td></tr>
<tr><td>ECF 2</td><td>CP2 – Variables et paramètres de paie</td><td>Collecte et contrôle de variables, vérification de bulletins</td><td>Fin de la séquence CP2</td></tr>
<tr><td>ECF 3</td><td>CP3 – Indicateurs RH</td><td>Construction d'un tableau de bord sur tableur et note d'analyse</td><td>Fin de la séquence CP3</td></tr>
<tr><td>ECF 4</td><td>CP4 – Gestion des emplois et carrières</td><td>Planification et exploitation d'une campagne d'entretiens</td><td>Fin de la séquence CP4</td></tr>
<tr><td>ECF 5</td><td>CP5 – Recrutement et intégration</td><td>Profil de poste, annonce, grille, programme d'intégration</td><td>Fin de la séquence CP5</td></tr>
<tr><td>ECF 6</td><td>CP6 – Développement des compétences</td><td>Plan chiffré, dossier de financement, questionnaire d'évaluation</td><td>Fin de la séquence CP6</td></tr>
</table>
<p>Les résultats sont consignés dans le livret d'évaluation transmis au jury. Un ECF non réussi peut faire l'objet d'une remédiation et d'une nouvelle évaluation selon les règles du centre.</p>

<h3>Les CCP et leurs épreuves séparées</h3>
<p>Le titre est composé de deux certificats de compétences professionnelles, qui correspondent aux blocs de compétences enregistrés au RNCP :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>CCP</th><th>Compétences</th><th>Épreuve en session CCP</th></tr>
<tr><td>CCP1 / BC01 – Assurer les missions opérationnelles de la gestion des ressources humaines</td><td>CP1, CP2, CP3</td><td>MSP de 2 h (étude de cas, 15 min de prise en main en plus) + entretien technique de 20 min portant sur CP1 = 2 h 20</td></tr>
<tr><td>CCP2 / BC02 – Contribuer au développement des ressources humaines</td><td>CP4, CP5, CP6</td><td>MSP de 2 h (étude de cas, 15 min de prise en main en plus) + entretien technique de 20 min (10 min sur les choix de la MSP, 10 min sur CP5) = 2 h 20</td></tr>
</table>
<p>Pour l'accès aux CCP, le jury se prononce au vu de la MSP et de l'entretien technique, du dossier professionnel et, pour un parcours de formation, des résultats des ECF. Il n'y a pas d'entretien final dans une session CCP.</p>

<h3>La capitalisation</h3>
<p>Un candidat qui a obtenu un seul CCP lors de la session du titre peut se présenter ultérieurement à une session du CCP manquant. Lorsqu'il a obtenu tous les CCP, il accède au titre par capitalisation : le jury examine alors le livret de certification au cours d'un entretien, qui se déroule en fin de session du dernier CCP. Si le titre a été révisé entre-temps, l'annexe du RE consacrée aux correspondances indique les équivalences entre les CCP de l'ancienne et de la nouvelle version (par exemple, pour le titre ARH, les CCP de la version de 2013 et de 2020). Les règles de validité et de délai applicables à un candidat donné sont à vérifier auprès du centre et de la DREETS.</p>

<h3>Et la VAE ?</h3>
<p>Le titre ARH est aussi accessible par la validation des acquis de l'expérience. Le candidat VAE passe la même épreuve, avec son dossier professionnel, mais sans ECF ; il peut utiliser son propre matériel informatique et ses logiciels. C'est une piste à connaître pour conseiller un salarié de l'entreprise qui exerce déjà des missions RH.</p>

<h3>Après le titre : emplois visés</h3>
<p>La fiche RNCP41366 cite notamment les emplois suivants : assistant ressources humaines, assistant formation, assistant recrutement, assistant RH et paie, gestionnaire des emplois et carrières, chargé des ressources humaines. Les codes ROME associés sont M1501 (assistanat en ressources humaines) et M1502 (développement des ressources humaines). L'assistant RH exerce dans tous les secteurs, au sein d'un service RH d'entreprise, d'une collectivité, d'une association, d'un cabinet de recrutement, d'une entreprise de travail temporaire ou d'un cabinet d'expertise comptable (services sociaux).</p>

<h3>Poursuivre ses études</h3>
<p>Le titre ARH est de niveau 5 (nomenclature de 2019). Après l'obtention, plusieurs voies existent :</p>
<ul>
<li>des certifications de niveau 6 en ressources humaines (licences professionnelles du domaine de la gestion des ressources humaines, bachelors et titres de chargé des ressources humaines enregistrés au RNCP) ;</li>
<li>des certifications de spécialisation en paie, très recherchées, si l'on souhaite approfondir CP2 ;</li>
<li>à terme, des masters en gestion des ressources humaines (niveau 7).</li>
</ul>
<p>Avant de s'inscrire, vérifiez sur francecompetences.fr que la certification visée est active, son niveau, ses prérequis et l'organisme habilité. L'apprentissage reste possible jusqu'à 29 ans révolus ; au-delà, le contrat de professionnalisation, la période de reconversion, le CPF ou le projet de transition professionnelle peuvent être mobilisés selon la situation.</p>`,
      },
      {
        title: "10.5 – Réussir la mise en situation professionnelle de 3 h 30",
        content: `<h3>Comment se présente l'épreuve</h3>
<p>La MSP est une étude de cas : le candidat reçoit un <strong>dossier candidat</strong> qui présente une entreprise fictive (activité, effectif, organisation, convention collective, outils) et une série de travaux à réaliser, comme s'il occupait le poste d'assistant RH. Une <strong>annexe au dossier candidat</strong>, distribuée au début de l'épreuve, contient les documents de travail (messages, tableaux de données, extraits de textes, modèles). Le RE précise que la distribution de cette annexe marque le début des 3 h 30.</p>
<p>Avant cela, les 15 minutes de prise en main du poste permettent de copier ses fichiers numériques (notes professionnelles) et de prendre connaissance du dossier candidat. Utilisez-les pleinement : c'est du temps de lecture « offert ».</p>

<h3>Les notes professionnelles : ce qui est autorisé et utile</h3>
<p>Le RE définit les notes professionnelles comme « les différents documents ou matrices utilisés en entreprise », qui peuvent avoir été créés pendant la formation. Elles sont autorisées sur papier ou en fichiers, sans échange entre candidats. Constituez dès maintenant un dossier structuré par compétence :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Compétence</th><th>Notes professionnelles conseillées</th></tr>
<tr><td>CP1</td><td>Check-lists d'embauche et de sortie, modèles de contrats (CDI, CDD, temps partiel), tableau des mentions obligatoires, tableau des délais (DPAE, transmission du CDD, documents de fin de contrat), tableau des congés pour événements familiaux, modèles de courriers</td></tr>
<tr><td>CP2</td><td>Tableau de collecte des variables, formules de calcul (heures supplémentaires et complémentaires, retenues pour absence, indemnité de fin de contrat, congés payés), grille de contrôle d'un bulletin</td></tr>
<tr><td>CP3</td><td>Classeur de tableur avec les formules des indicateurs (effectif moyen, absentéisme, turnover, taux d'accès à la formation, pyramide des âges), modèle de note de synthèse</td></tr>
<tr><td>CP4</td><td>Rétroplanning de campagne d'entretiens, modèle de message aux managers, grille de synthèse des comptes rendus, modèle de fiche de poste</td></tr>
<tr><td>CP5</td><td>Modèles de profil de poste, d'offre d'emploi, de grille d'analyse de CV, de trame d'entretien, de programme d'intégration, liste des critères discriminatoires</td></tr>
<tr><td>CP6</td><td>Tableau des dispositifs de formation, modèle de calcul du coût d'une action, modèle de questionnaire à chaud et à froid, tableau de suivi du plan</td></tr>
</table>
<p>Attention : des notes professionnelles ne sont utiles que si vous savez où chercher en quelques secondes. Nommez vos fichiers clairement (par exemple « CP2_calcul_HS_HC.xlsx ») et préparez une page d'index.</p>

<h3>Méthode de lecture du dossier candidat</h3>
<ol>
<li><strong>Lire la présentation de l'entreprise en entier</strong> pendant la prise en main : effectif (seuils de 11, 50, 250, 300 salariés), convention collective, organisation du service RH, outils, consignes générales (format des réponses, nommage des fichiers, impression).</li>
<li><strong>Survoler toute l'annexe</strong> dès sa distribution (5 minutes) : repérer le nombre de travaux, les documents associés, les indications de durée ou de barème éventuelles.</li>
<li><strong>Surligner les données</strong> utiles : dates, effectifs, montants, noms, délais. Un oubli de donnée est la première cause d'erreur de calcul.</li>
<li><strong>Repérer le destinataire</strong> de chaque production (responsable RH, manager, salarié, CSE, cabinet comptable) : le ton et le niveau de détail en dépendent.</li>
<li><strong>Identifier les pièges</strong> : document comportant des erreurs volontaires à corriger, consigne discriminatoire d'un manager, demande hors des attributions de l'assistant RH, données personnelles à protéger.</li>
</ol>

<h3>Gérer son temps</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Phase</th><th>Durée conseillée</th></tr>
<tr><td>Lecture globale de l'annexe et plan de travail</td><td>10 min</td></tr>
<tr><td>Travaux CP1 à CP6 (environ 30 min chacun, à ajuster au volume de chaque dossier)</td><td>3 h</td></tr>
<tr><td>Relecture, vérification des calculs, mise en forme, impression</td><td>20 min</td></tr>
</table>
<p>Règles d'or : commencer par les travaux que l'on maîtrise le mieux pour sécuriser des points ; ne jamais rester bloqué plus de 5 minutes sur un calcul (noter l'hypothèse et passer) ; réserver le temps d'impression, car une production non imprimée ou non enregistrée selon les consignes peut ne pas être corrigée.</p>

<h3>Rédiger des productions professionnelles</h3>
<ul>
<li>Un courriel : objet explicite, formule d'appel, message structuré, informations exactes, formule de politesse, signature avec fonction.</li>
<li>Une note : en-tête (destinataire, émetteur, date, objet), introduction d'une phrase, parties titrées, conclusion ou proposition.</li>
<li>Un tableau : titre, unités, totaux, source des données, formules visibles ou expliquées.</li>
<li>Une réponse juridique : règle + source (article ou convention) + application au cas + conséquence pratique.</li>
<li>Toujours : orthographe soignée, aucune donnée personnelle superflue, mention « confidentiel » quand c'est nécessaire.</li>
</ul>

<h3>Ce que le jury regarde</h3>
<p>Le jury applique les critères d'évaluation du RE : cadre juridique et conventionnel respecté, documents conformes et exhaustifs, informations fiables, échéances respectées, confidentialité, calculs exacts, analyse cohérente avec l'objectif, résultats exploitables par le destinataire. Il note aussi le respect des processus (compétence transversale « mettre en œuvre des modes opératoires ») et l'attention continue (absence d'erreurs d'inattention). Après la correction, l'entretien technique lui permet de vous demander de justifier vos choix : notez au brouillon les hypothèses que vous avez retenues.</p>`,
      },
      {
        title: "10.6 – Sujet blanc de mise en situation professionnelle : ALTÉA SERVICES",
        content: `<h3>Présentation</h3>
<p>Ce sujet blanc, conçu par le CFA, reproduit la forme d'une MSP du titre ARH. Il se traite en 3 h 30 avec vos notes professionnelles et un accès à Internet. Le corrigé figure en section 10.7.</p>

<h3>Dossier candidat</h3>
<p>ALTÉA SERVICES est une SAS de propreté et de services aux entreprises, dont le siège est à Créteil (94). Elle emploie 148 salariés : 112 agents de propreté, 12 chefs d'équipe, 10 agents de maîtrise, 9 employés administratifs (dont vous-même, en apprentissage) et 5 cadres ; 97 femmes et 51 hommes ; 72 salariés à temps partiel. Elle applique la convention collective nationale des entreprises de propreté et services associés (IDCC 3043). Un CSE est en place. Le service RH comprend Nathalie ROUSSEL, responsable RH, Karim BENSAÏD, gestionnaire paie (paie externalisée auprès d'un cabinet d'expertise comptable sur Silae), et vous-même, assistant(e) RH. Outils : SIRH Lucca, tableur, messagerie, net-entreprises.</p>
<p>Nous sommes le lundi 4 octobre 2027. Nathalie ROUSSEL est en déplacement toute la semaine et vous a laissé les travaux suivants.</p>
<p>Consigne générale : vos productions sont enregistrées dans un dossier à votre nom et imprimées. Lorsque la règle applicable dépend de la convention collective et que l'information ne figure pas dans le dossier, indiquez la règle légale et précisez qu'il faut vérifier la convention.</p>

<h3>Travail 1 – Gestion administrative (CP1) – durée conseillée 35 min</h3>
<p><strong>Document 1</strong> : message de M. Thomas GIRAUD, responsable de site : « Mme Fatou CAMARA, agente de propreté sur le site de la clinique, part en congé de maternité le 11 octobre. J'ai trouvé une remplaçante, Mme Awa DIOP, qui peut commencer le 11 octobre au matin. Voici le projet de contrat que j'ai préparé. »</p>
<p><strong>Document 2</strong> : projet de contrat rédigé par M. GIRAUD (extraits) : « Contrat à durée déterminée. Mme Awa DIOP est engagée à compter du 11 octobre 2027 en qualité d'agente de propreté, pour remplacer une salariée absente. Le contrat prendra fin au retour de la salariée remplacée. Période d'essai : un mois. Durée du travail : 24 heures par semaine, horaires selon les besoins du site. Le contrat sera signé à la fin de la première semaine. »</p>
<p><strong>Document 3</strong> : courriel de M. Jordan PETIT, chef d'équipe : « Je me marie le samedi 23 octobre. Combien de jours de congé ai-je droit et seront-ils payés ? »</p>
<p>Travaux demandés :</p>
<ol>
<li>Listez, dans l'ordre chronologique, les formalités à accomplir pour l'embauche de Mme DIOP, avec leurs délais.</li>
<li>Relevez les irrégularités du projet de contrat et proposez une rédaction corrigée des clauses concernées.</li>
<li>Rédigez la réponse à M. PETIT.</li>
</ol>

<h3>Travail 2 – Variables de paie (CP2) – durée conseillée 35 min</h3>
<p><strong>Document 4</strong> : éléments d'octobre 2027 remontés par les responsables de site.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Salarié</th><th>Contrat</th><th>Taux horaire brut</th><th>Événement</th></tr>
<tr><td>M. Lucas BERNARD</td><td>Temps plein, 35 h hebdomadaires (151,67 h mensuelles)</td><td>12,50 €</td><td>A travaillé 41 heures la semaine du 11 octobre (heures demandées par le chef de site)</td></tr>
<tr><td>Mme Inès FERREIRA</td><td>Temps partiel, 24 h hebdomadaires ; le contrat prévoit des heures complémentaires dans la limite du dixième de la durée contractuelle</td><td>12,50 €</td><td>A effectué 2 heures complémentaires la semaine du 18 octobre</td></tr>
<tr><td>M. Samir HADDAD</td><td>Temps plein, 35 h hebdomadaires</td><td>12,50 €</td><td>Absence injustifiée le mardi 19 octobre (7 heures prévues au planning)</td></tr>
<tr><td>Mme Claire MARTIN</td><td>Temps plein</td><td>—</td><td>Arrêt de travail pour maladie du 25 au 29 octobre, avis reçu le 26 octobre</td></tr>
</table>
<p>Travaux demandés :</p>
<ol>
<li>Calculez la rémunération des heures supplémentaires de M. BERNARD et des heures complémentaires de Mme FERREIRA, en indiquant les taux appliqués et leur source.</li>
<li>Calculez la retenue pour l'absence de M. HADDAD selon la méthode de l'horaire réel retenue par l'entreprise.</li>
<li>Indiquez les démarches à accomplir pour l'arrêt de travail de Mme MARTIN.</li>
<li>Présentez le tableau des variables à transmettre au cabinet comptable.</li>
</ol>

<h3>Travail 3 – Indicateurs RH (CP3) – durée conseillée 30 min</h3>
<p><strong>Document 5</strong> : données annuelles (1er octobre 2026 – 30 septembre 2027).</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Donnée</th><th>Valeur</th></tr>
<tr><td>Effectif moyen</td><td>148 salariés</td></tr>
<tr><td>Heures théoriques de travail sur la période</td><td>205 000 h</td></tr>
<tr><td>Heures d'absence pour maladie</td><td>9 840 h</td></tr>
<tr><td>Heures d'absence pour accident du travail et trajet</td><td>2 460 h</td></tr>
<tr><td>Heures d'absence injustifiée</td><td>410 h</td></tr>
<tr><td>Entrées (tous contrats, hors CDD de remplacement)</td><td>34</td></tr>
<tr><td>Sorties (tous contrats, hors CDD de remplacement)</td><td>30</td></tr>
<tr><td>Taux d'absentéisme de la période précédente</td><td>5,40 %</td></tr>
</table>
<p>Travaux demandés :</p>
<ol>
<li>Calculez le taux d'absentéisme global, la part de chaque motif, le taux de rotation (turnover) et le taux de départ.</li>
<li>Rédigez une note de synthèse de 15 lignes maximum à l'attention du directeur général, présentant les résultats et deux pistes d'action.</li>
</ol>

<h3>Travail 4 – Gestion des emplois et carrières (CP4) – durée conseillée 25 min</h3>
<p><strong>Document 6</strong> : extrait du suivi des entretiens de parcours professionnel.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Salarié</th><th>Date de naissance</th><th>Date d'embauche</th><th>Dernier entretien</th><th>Situation</th></tr>
<tr><td>Mme Nadia BOUZID</td><td>12/03/1982</td><td>15/10/2021</td><td>12/10/2025</td><td>Aucune formation depuis l'embauche ; souhaite devenir cheffe d'équipe</td></tr>
<tr><td>M. Hugo LEROY</td><td>05/06/1998</td><td>03/11/2026</td><td>Aucun</td><td>—</td></tr>
<tr><td>Mme Fatou CAMARA</td><td>22/01/1991</td><td>01/09/2022</td><td>20/09/2026</td><td>Départ en congé de maternité le 11/10/2027</td></tr>
<tr><td>M. Paul NGUYEN</td><td>14/02/1968</td><td>02/05/2019</td><td>10/05/2025</td><td>Formation SST suivie en 2024</td></tr>
</table>
<p>Travaux demandés :</p>
<ol>
<li>Pour chaque salarié, indiquez les entretiens de parcours professionnel à prévoir (périodique, mi-carrière, avant 60 ans), l'échéance de l'état des lieux récapitulatif et les points de vigilance.</li>
<li>Rédigez le message aux managers lançant la campagne d'entretiens de parcours professionnel du quatrième trimestre.</li>
</ol>

<h3>Travail 5 – Recrutement et intégration (CP5) – durée conseillée 35 min</h3>
<p><strong>Document 7</strong> : message du directeur d'exploitation : « Il me faut une assistante d'exploitation pour remplacer Sophie qui part en novembre. Une jeune femme dynamique de moins de 35 ans, sans enfant de préférence parce qu'il faut être disponible. CDI, temps plein, à Créteil. Elle gérera les plannings des agents, les commandes de produits, la relation avec les clients par téléphone et le suivi des absences avec les chefs d'équipe. Il faut maîtriser le tableur. »</p>
<p>Travaux demandés :</p>
<ol>
<li>Rédigez la réponse au directeur d'exploitation sur les critères mentionnés.</li>
<li>Rédigez le profil de poste et l'offre d'emploi.</li>
<li>Construisez la grille d'analyse des candidatures.</li>
<li>Proposez le programme d'intégration du premier mois.</li>
</ol>

<h3>Travail 6 – Développement des compétences (CP6) – durée conseillée 35 min</h3>
<p><strong>Document 8</strong> : demandes reçues.</p>
<ul>
<li>Les 6 agents affectés au nouveau marché d'un entrepôt logistique devront utiliser une autolaveuse autoportée à partir de janvier 2028. Devis reçu : 280 € HT par participant en inter (7 heures, organisme exonéré de TVA), ou 1 450 € la journée en intra (8 participants maximum).</li>
<li>Mme Nadia BOUZID souhaite préparer une certification de chef d'équipe et demande si elle peut utiliser son CPF « pendant ses heures ».</li>
<li>La direction demande un questionnaire d'évaluation à chaud pour toutes les formations.</li>
</ul>
<p>Données : taux horaire brut des agents 12,50 € ; coefficient de charges retenu par l'entreprise 1,30 ; frais de transport pour une formation à l'extérieur 18 € par agent.</p>
<p>Travaux demandés :</p>
<ol>
<li>Qualifiez la formation autolaveuse (catégorie, temps de travail) et comparez le coût total des deux formules.</li>
<li>Rédigez la réponse à Mme BOUZID.</li>
<li>Proposez un questionnaire d'évaluation à chaud de 10 questions maximum.</li>
</ol>`,
      },
      {
        title: "10.7 – Corrigé détaillé du sujet blanc",
        content: `<h3>Travail 1 – CP1</h3>
<h4>1. Formalités d'embauche de Mme DIOP, dans l'ordre</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Formalité</th><th>Délai</th><th>Source</th></tr>
<tr><td>Recueil des pièces (identité, sécurité sociale, RIB) ; si ressortissante d'un pays hors UE, vérification du titre autorisant à travailler auprès de la préfecture</td><td>Au moins 2 jours ouvrables avant l'embauche pour la vérification</td><td>R5221-41</td></tr>
<tr><td>Déclaration préalable à l'embauche (DPAE) sur net-entreprises</td><td>Au plus tôt 8 jours avant l'embauche, au plus tard avant la prise de poste le 11 octobre au matin</td><td>L1221-10, R1221-5</td></tr>
<tr><td>Inscription au registre unique du personnel</td><td>Au moment de l'embauche</td><td>L1221-13</td></tr>
<tr><td>Contrat écrit signé par les deux parties, remis à la salariée</td><td>Au plus tard dans les 2 jours ouvrables suivant l'embauche</td><td>L1242-12, L1242-13</td></tr>
<tr><td>Remise des informations sur la relation de travail (si non contenues dans le contrat) et des documents d'entreprise (règlement intérieur, notice complémentaire santé et prévoyance)</td><td>Selon les délais des articles R1221-34 et suivants</td><td>L1221-5-1</td></tr>
<tr><td>Visite d'information et de prévention</td><td>Dans les 3 mois suivant la prise de poste (hors suivi renforcé)</td><td>R4624-10</td></tr>
<tr><td>Transmission des éléments au cabinet de paie (entrée, horaire, classification, affiliations) ; déclaration de l'embauche dans la DSN du mois</td><td>Avant la clôture de la paie d'octobre</td><td>Procédure interne</td></tr>
<tr><td>Formation à la sécurité et accueil sur site</td><td>Dès l'embauche</td><td>L4141-2</td></tr>
</table>
<h4>2. Irrégularités du projet de contrat et corrections</h4>
<ul>
<li><strong>Motif imprécis</strong> : le CDD de remplacement doit mentionner le nom et la qualification de la salariée remplacée (article L1242-12). Correction : « pour remplacer Mme Fatou CAMARA, agente de propreté, [classification], absente pour congé de maternité ».</li>
<li><strong>Terme imprécis sans durée minimale</strong> : un CDD de remplacement peut ne pas comporter de terme précis, mais il doit alors comporter une durée minimale (article L1242-7). Correction : « Le contrat prendra fin au retour de Mme CAMARA. Il est conclu pour une durée minimale de [durée] » (par exemple jusqu'à la fin prévisible du congé légal de maternité).</li>
<li><strong>Période d'essai excessive</strong> : pour un CDD, la période d'essai est d'un jour par semaine dans la limite de 2 semaines si la durée initiale est au plus de 6 mois, et d'un mois au plus au-delà ; en l'absence de terme précis, elle se calcule sur la durée minimale (article L1242-10), sauf dispositions conventionnelles ou usages prévoyant des durées moindres. Correction : période d'essai calculée sur la durée minimale retenue (par exemple 2 semaines si la durée minimale est de 4 mois).</li>
<li><strong>Temps partiel incomplet</strong> : « horaires selon les besoins du site » ne respecte pas l'article L3123-6. Il faut la répartition de la durée entre les jours de la semaine, les cas et la nature des modifications possibles, les modalités de communication des horaires et les limites des heures complémentaires. La durée de 24 heures correspond à la durée minimale légale (article L3123-27), sauf dérogations prévues par la loi ou par accord de branche étendu : vérifier la convention.</li>
<li><strong>Signature tardive</strong> : un CDD signé après le délai de 2 jours ouvrables expose l'employeur à une indemnité (article L1245-1) ; un CDD non écrit est réputé à durée indéterminée. Le contrat doit être signé au plus tard le mercredi 13 octobre (le 11 étant un lundi), idéalement le jour même.</li>
<li><strong>Mentions manquantes</strong> : poste, classification et coefficient, rémunération, intitulé de la convention collective, caisse de retraite complémentaire et organisme de prévoyance (article L1242-12).</li>
<li>Rappel pour la fin du contrat : indemnité de fin de contrat de 10 % de la rémunération brute totale, sauf cas d'exclusion (notamment embauche en CDI à l'issue), et indemnité compensatrice de congés payés.</li>
</ul>
<h4>3. Réponse à M. PETIT</h4>
<blockquote>« Bonjour Monsieur PETIT, toutes nos félicitations. À l'occasion de votre mariage, vous bénéficiez d'un congé de 4 jours (article L3142-4 du Code du travail), sous réserve de dispositions plus favorables de la convention collective que je vérifie. Ce congé est rémunéré : il n'entraîne aucune retenue sur votre salaire et il est assimilé à du temps de travail effectif pour le calcul de vos congés payés. Il doit être pris au moment de l'événement : merci de nous indiquer les dates souhaitées et de transmettre ensuite une copie de l'acte ou du livret de famille. Cordialement. [Prénom NOM], assistant(e) RH. »</blockquote>

<h3>Travail 2 – CP2</h3>
<h4>1. Heures supplémentaires et complémentaires</h4>
<ul>
<li><strong>M. BERNARD</strong> : 41 − 35 = 6 heures supplémentaires dans la semaine. À défaut d'accord d'entreprise ou de branche fixant un autre taux (au minimum 10 %), les 8 premières heures supplémentaires sont majorées de 25 % (article L3121-36). Calcul : 6 × 12,50 × 1,25 = 93,75 €. Les heures supplémentaires s'imputent sur le contingent annuel et bénéficient de la réduction de cotisations salariales et de l'exonération d'impôt sur le revenu dans les limites légales (le cabinet l'applique ; vérifier les plafonds de l'année).</li>
<li><strong>Mme FERREIRA</strong> : 2 heures complémentaires, inférieures à la limite du dixième de 24 heures (2,4 heures). Majoration minimale de 10 % pour chacune des heures accomplies dans la limite du dixième (article L3123-29). Calcul : 2 × 12,50 × 1,10 = 27,50 €. Vérifier la convention, qui peut prévoir un taux supérieur.</li>
</ul>
<h4>2. Retenue pour absence de M. HADDAD</h4>
<p>Salaire de base : 12,50 × 151,67 = 1 895,88 €. Méthode de l'horaire réel (heures d'absence × taux horaire) : 7 × 12,50 = 87,50 €. Salaire de base après retenue : 1 895,88 − 87,50 = 1 808,38 €. L'absence injustifiée n'est pas rémunérée ; elle peut par ailleurs justifier une démarche disciplinaire décidée par la responsable RH, ce qui est hors du champ de la paie.</p>
<h4>3. Arrêt de travail de Mme MARTIN</h4>
<ul>
<li>Vérifier la réception de l'avis d'arrêt de travail (envoi par la salariée dans les 48 heures).</li>
<li>Effectuer le signalement d'arrêt de travail en DSN événementielle (attestation de salaire pour le versement des indemnités journalières) dans les 5 jours suivant la connaissance de l'arrêt, soit au plus tard le 31 octobre.</li>
<li>Transmettre les dates au cabinet pour la retenue d'absence et le calcul du complément employeur : maintien de salaire légal (article L1226-1) sous conditions d'ancienneté et après un délai de carence, ou dispositions conventionnelles plus favorables à vérifier ; préciser si l'entreprise pratique la subrogation.</li>
<li>Mettre à jour le compteur d'absence dans Lucca, sans indiquer de motif médical précis.</li>
</ul>
<h4>4. Tableau des variables transmis au cabinet</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Matricule / salarié</th><th>Rubrique</th><th>Quantité</th><th>Taux / base</th><th>Montant</th><th>Commentaire</th></tr>
<tr><td>M. BERNARD</td><td>Heures supplémentaires majorées à 25 %</td><td>6 h</td><td>12,50 × 1,25</td><td>93,75 €</td><td>Semaine du 11/10, validées par le chef de site</td></tr>
<tr><td>Mme FERREIRA</td><td>Heures complémentaires majorées à 10 %</td><td>2 h</td><td>12,50 × 1,10</td><td>27,50 €</td><td>Semaine du 18/10, dans la limite contractuelle</td></tr>
<tr><td>M. HADDAD</td><td>Absence injustifiée non rémunérée</td><td>7 h</td><td>12,50</td><td>− 87,50 €</td><td>Mardi 19/10</td></tr>
<tr><td>Mme MARTIN</td><td>Absence maladie</td><td>Du 25 au 29/10</td><td>Selon règles de maintien</td><td>À calculer par le cabinet</td><td>Signalement DSN effectué le [date]</td></tr>
<tr><td>Mme DIOP</td><td>Entrée</td><td>—</td><td>—</td><td>—</td><td>CDD de remplacement à compter du 11/10, 24 h</td></tr>
</table>
<p>Le fichier est transmis par un canal sécurisé, avec la date limite de transmission convenue avec le cabinet, et conservé dans le dossier de paie du mois.</p>

<h3>Travail 3 – CP3</h3>
<h4>1. Calculs</h4>
<ul>
<li>Heures d'absence totales : 9 840 + 2 460 + 410 = 12 710 h.</li>
<li>Taux d'absentéisme global : 12 710 ÷ 205 000 × 100 = 6,20 %.</li>
<li>Évolution : 6,20 − 5,40 = + 0,80 point, soit une hausse relative de 0,80 ÷ 5,40 × 100 = 14,8 %.</li>
<li>Part de la maladie : 9 840 ÷ 12 710 × 100 = 77,4 % ; accidents du travail et de trajet : 2 460 ÷ 12 710 × 100 = 19,4 % ; absences injustifiées : 410 ÷ 12 710 × 100 = 3,2 %. Total : 100 %.</li>
<li>Taux de rotation : ((34 + 30) ÷ 2) ÷ 148 × 100 = 32 ÷ 148 × 100 = 21,62 %.</li>
<li>Taux de départ : 30 ÷ 148 × 100 = 20,27 %.</li>
</ul>
<h4>2. Note de synthèse</h4>
<blockquote>
<p><strong>Note à l'attention de M. le directeur général</strong> – De : service RH – Date : 4 octobre 2027 – Objet : absentéisme et rotation du personnel, période d'octobre 2026 à septembre 2027.</p>
<p>Le taux d'absentéisme atteint 6,20 %, en hausse de 0,8 point par rapport à la période précédente (5,40 %). La maladie représente 77 % des heures d'absence, les accidents du travail et de trajet 19 %. Le taux de rotation s'établit à 21,6 % et le taux de départ à 20,3 % : environ un salarié sur cinq a quitté l'entreprise sur la période.</p>
<p>Deux pistes sont proposées : 1) analyser avec le CSE et le service de prévention et de santé au travail les accidents du travail par site et par cause, et renforcer la prévention (formation aux gestes et postures et au risque chimique, choix du matériel) ; 2) analyser les motifs de départ (entretiens de sortie) et renforcer l'intégration des nouveaux agents au cours des trois premiers mois.</p>
<p>Les données détaillées par site et par catégorie sont disponibles sur demande. Document confidentiel.</p>
</blockquote>

<h3>Travail 4 – CP4</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Salarié</th><th>Échéances</th><th>Vigilance</th></tr>
<tr><td>Mme BOUZID</td><td>Elle a 45 ans en 2027 : entretien de mi-carrière à organiser cette année. Entretien périodique suivant : 4 ans après celui du 12/10/2025, soit au plus tard octobre 2029, sous réserve des dispositions transitoires. État des lieux récapitulatif : 8 ans après l'embauche, soit octobre 2029</td><td>Aucune formation depuis l'embauche : dans une entreprise d'au moins 50 salariés, si à l'état des lieux elle n'a pas bénéficié des entretiens prévus et d'au moins une formation non obligatoire, l'abondement correctif de 3 000 € sur son CPF est dû. L'entretien de mi-carrière est l'occasion de construire son projet de cheffe d'équipe (CPF co-construit, période de reconversion interne)</td></tr>
<tr><td>M. LEROY</td><td>Embauché le 03/11/2026 : premier entretien de parcours professionnel dans l'année qui suit l'embauche, soit au plus tard le 03/11/2027</td><td>Aucun entretien réalisé : planifier en octobre, c'est la priorité de la campagne</td></tr>
<tr><td>Mme CAMARA</td><td>Dernier entretien 20/09/2026 ; entretien périodique suivant au plus tard en 2030. Vérifier dans l'article L6315-1 en vigueur si un entretien doit être proposé à son retour de congé de maternité (c'était le cas sous l'ancien régime)</td><td>Ne pas convoquer pendant le congé ; noter un rappel à la date de retour</td></tr>
<tr><td>M. NGUYEN</td><td>Il aura 60 ans le 14/02/2028 : entretien de fin de carrière, prévu dans les deux années précédant ses 60 ans, à organiser dès ce trimestre. État des lieux récapitulatif : 8 ans après l'embauche, soit mai 2027 (selon les dispositions transitoires, à vérifier)</td><td>L'entretien aborde l'aménagement de fin de carrière (temps partiel, retraite progressive, transmission des savoirs). Vérifier si l'état des lieux est dû et si la formation SST de 2024 compte comme formation non obligatoire dans son cas</td></tr>
</table>
<blockquote>« Objet : campagne d'entretiens de parcours professionnel – 4e trimestre 2027. Bonjour à tous, la campagne d'entretiens de parcours professionnel s'ouvre aujourd'hui et se termine le 10 décembre. Vous trouverez dans Lucca la liste des salariés de votre équipe concernés et le formulaire à utiliser. L'entretien de parcours professionnel porte sur les perspectives d'évolution professionnelle, notamment en termes de qualification et d'emploi ; il ne porte pas sur l'évaluation du travail. Il comporte des informations sur la VAE, le CPF, les abondements possibles et le conseil en évolution professionnelle. Merci de convoquer chaque salarié suffisamment à l'avance pour qu'il puisse préparer l'entretien et de remettre une copie du compte rendu au salarié. Je relancerai chaque vendredi les entretiens non planifiés. Les comptes rendus sont confidentiels. Je reste à votre disposition. »</blockquote>

<h3>Travail 5 – CP5</h3>
<h4>1. Réponse au directeur d'exploitation</h4>
<p>Les critères « jeune femme », « moins de 35 ans » et « sans enfant » sont discriminatoires (sexe, âge, situation de famille : article L1132-1) ; les mentionner dans une offre ou les utiliser pour sélectionner est interdit et pénalement sanctionné (article 225-2 du Code pénal). La disponibilité attendue doit être exprimée par les horaires du poste. Proposition : « Le poste est à temps plein, du lundi au vendredi, avec une amplitude de [horaires] ; nous retiendrons les candidats sur la base de leurs compétences et de leur disponibilité au regard de ces horaires. »</p>
<h4>2. Profil de poste et offre</h4>
<p><strong>Profil</strong> : assistant(e) d'exploitation, CDI temps plein, Créteil, rattaché(e) au directeur d'exploitation. Missions : élaborer et mettre à jour les plannings des agents ; gérer les commandes de produits et de matériel ; assurer la relation téléphonique avec les clients ; suivre les absences avec les chefs d'équipe et organiser les remplacements. Compétences indispensables : maîtrise du tableur, organisation, communication écrite et orale. Souhaitées : expérience en planification, connaissance du secteur de la propreté.</p>
<p><strong>Offre</strong> : « ALTÉA SERVICES, entreprise de propreté de 148 salariés à Créteil, recrute un(e) assistant(e) d'exploitation en CDI à temps plein. Vos missions : [liste]. Votre profil : vous maîtrisez le tableur, vous êtes organisé(e) et à l'aise au téléphone ; une première expérience en planification est appréciée. Rémunération selon la grille de la convention collective de la propreté, [montant ou fourchette]. Poste basé à Créteil, horaires [à préciser]. Candidature : [lien]. » L'offre est rédigée en français, datée, sans critère discriminatoire ; elle mentionne l'entreprise.</p>
<h4>3. Grille d'analyse des candidatures</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère (issu du profil)</th><th>Pondération</th><th>Indicateurs dans le CV et la lettre</th><th>Note 0 à 3</th></tr>
<tr><td>Maîtrise du tableur (indispensable)</td><td>30 %</td><td>Expérience d'utilisation, certification, missions décrites</td><td></td></tr>
<tr><td>Expérience en planification</td><td>25 %</td><td>Plannings, gestion d'équipes, logistique</td><td></td></tr>
<tr><td>Relation client téléphonique</td><td>20 %</td><td>Accueil, service client, gestion de réclamations</td><td></td></tr>
<tr><td>Gestion des achats et des commandes</td><td>15 %</td><td>Approvisionnement, suivi de stocks</td><td></td></tr>
<tr><td>Connaissance du secteur</td><td>10 %</td><td>Propreté, services, facility management</td><td></td></tr>
</table>
<p>La grille ne comporte aucun critère lié à l'âge, au sexe, à la situation de famille, à l'adresse ou à la photo. Elle est appliquée à toutes les candidatures et conservée pour justifier les choix.</p>
<h4>4. Programme d'intégration du premier mois</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Moment</th><th>Action</th><th>Acteur</th><th>Outil</th></tr>
<tr><td>Avant l'arrivée</td><td>Préparation du poste, des accès Lucca et de la messagerie, message de bienvenue</td><td>Assistant RH, service informatique</td><td>Check-list d'arrivée</td></tr>
<tr><td>Jour 1</td><td>Accueil, formalités, livret d'accueil, visite des locaux, présentation de l'équipe, formation sécurité</td><td>Responsable RH, directeur d'exploitation</td><td>Livret d'accueil</td></tr>
<tr><td>Semaine 1</td><td>Tuilage avec la titulaire sortante, découverte des outils de planification</td><td>Assistante d'exploitation sortante (référente)</td><td>Procédures écrites</td></tr>
<tr><td>Semaine 2</td><td>Visite de trois sites clients avec un chef d'équipe</td><td>Chef d'équipe</td><td>Planning de visites</td></tr>
<tr><td>Semaines 3 et 4</td><td>Prise en charge progressive des plannings, point hebdomadaire</td><td>Directeur d'exploitation</td><td>Fiche de suivi</td></tr>
<tr><td>Fin du mois 1</td><td>Point d'étape et rapport d'étonnement ; préparation du bilan de période d'essai</td><td>Responsable RH, directeur d'exploitation</td><td>Grille d'entretien</td></tr>
</table>

<h3>Travail 6 – CP6</h3>
<h4>1. Formation autolaveuse</h4>
<p>Il s'agit d'une formation d'<strong>adaptation au poste</strong> liée à l'introduction d'un nouvel équipement (obligation de l'article L6321-1) ; elle se déroule pendant le temps de travail, avec maintien de la rémunération.</p>
<ul>
<li>Coût salarial (identique dans les deux formules) : 6 × 7 × 12,50 × 1,30 = 682,50 €.</li>
<li>Formule inter : 6 × 280 = 1 680,00 € + 682,50 € + transport 6 × 18 = 108,00 € = <strong>2 470,50 €</strong>.</li>
<li>Formule intra : 1 450,00 € + 682,50 € + 0 € = <strong>2 132,50 €</strong>.</li>
<li>Économie de la formule intra : 2 470,50 − 2 132,50 = 338,00 €. Recommandation : intra sur le site de l'entrepôt, sous réserve de la disponibilité d'une machine et de l'accord du client, avant janvier 2028.</li>
</ul>
<h4>2. Réponse à Mme BOUZID</h4>
<blockquote>« Bonjour Madame BOUZID, vous pouvez mobiliser votre CPF pour une certification de chef d'équipe enregistrée au RNCP ou au répertoire spécifique. Si la formation se déroule pendant votre temps de travail, vous devez obtenir l'accord de l'entreprise sur le contenu et le calendrier : la demande doit nous parvenir au moins 60 jours avant le début de la formation (120 jours si elle dure six mois ou plus) ; nous vous répondrons dans un délai de 30 jours, l'absence de réponse valant acceptation. Vos heures de formation seront alors rémunérées. Votre projet correspondant à un besoin de l'entreprise, nous pouvons étudier avec la responsable RH un abondement de votre CPF par l'entreprise. Vous pouvez consulter vos droits sur moncompteformation.gouv.fr. Je vous propose un rendez-vous pour en parler. Cordialement. »</blockquote>
<h4>3. Questionnaire à chaud (exemple attendu)</h4>
<p>Échelle de 1 (pas du tout d'accord) à 4 (tout à fait d'accord) : 1. J'ai été informé(e) des objectifs avant la formation. 2. Les objectifs ont été atteints. 3. Le contenu correspond à mon travail. 4. Les explications du formateur étaient claires. 5. Les exercices pratiques étaient utiles. 6. La durée était adaptée. 7. L'organisation matérielle était satisfaisante. 8. Je me sens capable d'appliquer ce que j'ai appris. Questions ouvertes : 9. Ce que je vais appliquer dès demain. 10. Mes suggestions d'amélioration.</p>

<h3>Barème indicatif utilisé par le CFA pour l'entraînement</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Travail</th><th>Points clés attendus</th></tr>
<tr><td>CP1</td><td>DPAE avant l'embauche, délai de 2 jours ouvrables, nom et qualification de la personne remplacée, durée minimale, période d'essai correcte, mentions du temps partiel, congé de mariage de 4 jours rémunéré</td></tr>
<tr><td>CP2</td><td>93,75 € ; 27,50 € ; 87,50 € ; signalement DSN de l'arrêt dans les 5 jours ; tableau clair et exhaustif</td></tr>
<tr><td>CP3</td><td>6,20 % ; 77,4 / 19,4 / 3,2 % ; 21,62 % ; 20,27 % ; note adaptée au destinataire</td></tr>
<tr><td>CP4</td><td>Premier entretien de M. LEROY, mi-carrière de Mme BOUZID, entretien avant 60 ans de M. NGUYEN, abondement correctif repéré, message conforme</td></tr>
<tr><td>CP5</td><td>Refus argumenté des critères discriminatoires, profil précis, grille cohérente avec le profil, programme d'intégration avec acteurs, étapes et outils</td></tr>
<tr><td>CP6</td><td>Qualification correcte, 2 470,50 € / 2 132,50 €, réponse CPF exacte (délais, silence vaut acceptation), questionnaire exploitable</td></tr>
</table>`,
      },
      {
        title: "10.8 – L'entretien technique et l'entretien final",
        content: `<h3>L'entretien technique (30 minutes)</h3>
<p>Il se déroule après la correction de la MSP par le jury, en deux temps :</p>
<ul>
<li><strong>10 minutes sur les choix opérés lors de la mise en situation</strong> : le jury vous demande de clarifier une ambiguïté constatée à la correction ou d'étayer une analyse. Exemple : « Dans votre tableau de variables, pourquoi avez-vous appliqué une majoration de 25 % ? », « Votre note au directeur propose deux pistes : comment les mettriez-vous en œuvre ? ».</li>
<li><strong>20 minutes sur les compétences CP1 et CP5</strong>, à partir d'un guide de questionnement : le jury vous fait décrire votre pratique en gestion administrative du personnel et en recrutement-intégration.</li>
</ul>
<p>Le RE est explicite : l'entretien technique « ne peut en aucun cas se transformer en un oral technique ou de connaissances ». Le jury ne vous demandera pas de réciter des articles ; il veut comprendre comment vous procédez, comment vous vérifiez, ce que vous faites face à une difficulté. Répondez à partir de situations réelles, avec la méthode <strong>situation – action – résultat</strong>.</p>

<h3>Revenir sur sa MSP : comment s'y préparer</h3>
<ul>
<li>Pendant l'épreuve, notez au brouillon chaque hypothèse retenue (« convention non fournie : règle légale appliquée »).</li>
<li>Si vous découvrez une erreur pendant l'entretien, reconnaissez-la et corrigez-la calmement : c'est une preuve de la compétence transversale « maintenir son attention » et de votre honnêteté professionnelle.</li>
<li>Justifiez vos choix par la règle, la procédure ou l'objectif du destinataire.</li>
</ul>

<h3>Questions types sur CP1 et réponses attendues</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question du jury</th><th>Éléments de réponse attendus</th></tr>
<tr><td>« Décrivez-moi comment vous réalisez une embauche dans votre entreprise. »</td><td>Chronologie : pièces, vérification du titre de travail le cas échéant, DPAE avant la prise de poste, registre unique du personnel, contrat écrit (délai de 2 jours ouvrables pour un CDD), visite d'information et de prévention, affiliations, transmission à la paie, accueil et sécurité. Outils utilisés. Exemple réel</td></tr>
<tr><td>« Comment vous assurez-vous qu'un contrat est conforme ? »</td><td>Check-list des mentions obligatoires selon le type de contrat, vérification de la convention collective (classification, salaire minimum, période d'essai), relecture par la responsable, modèle validé</td></tr>
<tr><td>« Un salarié vous demande une information sur ses droits à congé pour un événement familial ; que faites-vous ? »</td><td>Vérification de la règle légale et conventionnelle, réponse écrite, sourcée, avec les justificatifs à fournir, mise à jour du SIRH</td></tr>
<tr><td>« Comment gérez-vous la sortie d'un salarié ? »</td><td>Identification du mode de rupture, calcul des délais (préavis), documents de fin de contrat (certificat de travail, attestation France Travail, solde de tout compte), information sur la portabilité de la complémentaire santé et de la prévoyance, restitution du matériel, DSN de fin de contrat, archivage</td></tr>
<tr><td>« Comment protégez-vous les données du personnel ? »</td><td>Accès limités dans le SIRH, armoires fermées, transmissions sécurisées, minimisation des données, durées de conservation, registre des traitements, pas de motif médical dans les tableaux partagés</td></tr>
<tr><td>« Quelles échéances administratives suivez-vous ? »</td><td>Fins de CDD et de périodes d'essai, visites médicales, titres de séjour, entretiens de parcours professionnel, DSN mensuelle, habilitations ; outil d'alerte (SIRH ou tableau avec mise en forme conditionnelle)</td></tr>
<tr><td>« Que faites-vous si un manager vous demande une information confidentielle sur un collègue ? »</td><td>Rappel de la règle, refus courtois, orientation vers la responsable RH, aucune transmission sans base légitime</td></tr>
</table>

<h3>Questions types sur CP5 et réponses attendues</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question du jury</th><th>Éléments de réponse attendus</th></tr>
<tr><td>« Comment construisez-vous un profil de poste ? »</td><td>Entretien avec le manager, analyse des missions à partir de la fiche de poste, distinction entre critères indispensables et souhaités, compétences techniques et comportementales, conditions d'exercice ; document précis et synthétique</td></tr>
<tr><td>« Comment rédigez-vous une offre conforme ? »</td><td>Intitulé neutre, en français, sans critère discriminatoire ni limite d'âge, informations sur l'entreprise, le poste, le profil, la rémunération et le lieu ; diffusion adaptée à la cible</td></tr>
<tr><td>« Comment faites-vous le tri des candidatures ? »</td><td>Grille d'analyse issue du profil, pondérée, appliquée à toutes les candidatures ; traçabilité des décisions ; réponse à tous les candidats</td></tr>
<tr><td>« Un manager vous demande d'écarter les candidats de plus de 50 ans ; que faites-vous ? »</td><td>Rappel de l'interdiction (article L1132-1, sanctions pénales), proposition de critères objectifs liés au poste, information de la responsable RH</td></tr>
<tr><td>« Que faites-vous des CV non retenus ? »</td><td>Information du candidat, conservation limitée (deux ans au plus dans un vivier, sauf opposition, selon les recommandations de la CNIL), suppression sécurisée</td></tr>
<tr><td>« Avez-vous conduit des entretiens ? Comment ? »</td><td>Préparation d'une trame commune, questions ouvertes et comportementales, questions interdites (vie privée sans lien avec le poste), prise de notes factuelles, restitution au manager</td></tr>
<tr><td>« Décrivez un programme d'intégration que vous avez construit. »</td><td>Acteurs (RH, manager, référent), étapes (avant l'arrivée, jour 1, première semaine, premier mois, fin de période d'essai), outils (livret d'accueil, planning, rapport d'étonnement, grille de suivi)</td></tr>
<tr><td>« Comment savez-vous qu'une intégration a réussi ? »</td><td>Points d'étape, rapport d'étonnement, confirmation de la période d'essai, indicateurs de turnover à 3 et 6 mois</td></tr>
</table>

<h3>L'entretien final (20 minutes)</h3>
<p>Selon le RE, son objectif est « d'évaluer la représentation que se fait le candidat de l'emploi et des comportements professionnels induits ». Le jury dispose de tout le dossier, dont le dossier professionnel. Il vérifie que vous avez une vision globale du métier, quel que soit le contexte d'exercice, et que vous vous êtes approprié la culture professionnelle.</p>

<h3>Questions types de l'entretien final</h3>
<ul>
<li>« Présentez-vous et présentez votre parcours en quelques minutes. » Préparez une présentation de 3 minutes : parcours, entreprise d'accueil, missions, ce que vous avez appris, projet.</li>
<li>« Comment définiriez-vous le rôle d'un assistant RH ? » Interface entre la direction, les managers et les salariés ; garant de la conformité administrative ; contributeur au développement des RH ; autonomie dans les limites de ses attributions.</li>
<li>« Quelles qualités sont indispensables dans ce métier ? » Discrétion, rigueur, sens du service, organisation, capacité à se tenir à jour, neutralité, aisance avec les outils numériques. Illustrez chacune d'un exemple.</li>
<li>« Que feriez-vous si vous découvriez une erreur de paie que vous avez commise ? » La signaler immédiatement, mesurer l'impact, proposer la correction (régularisation le mois suivant ou acompte), informer le salarié, analyser la cause pour éviter qu'elle se reproduise.</li>
<li>« Comment exerceriez-vous ce métier dans une entreprise de 20 salariés ? Dans un groupe de 5 000 salariés ? » Dans une petite structure : polyvalence, absence de CSE consulté sur les orientations (le CSE n'existe qu'à partir de 11 salariés et ses attributions étendues à partir de 50), interlocuteurs externes nombreux (expert-comptable, OPCO). Dans un grand groupe : spécialisation (paie, recrutement, formation), SIRH intégrés, procédures formalisées.</li>
<li>« Comment vous tenez-vous informé(e) ? » Sources officielles citées précisément (voir 10.10), lettres d'information, réseau, exemple d'évolution récente que vous avez intégrée dans votre pratique (participation forfaitaire au CPF, entretien de parcours professionnel, période de reconversion).</li>
<li>« Où vous voyez-vous dans trois ans ? » Projet réaliste et argumenté : spécialisation, poursuite d'études, évolution vers un poste de chargé RH.</li>
<li>« Que retenez-vous de votre dossier professionnel ? » Être capable de commenter chaque exemple, d'expliquer ce que vous feriez différemment aujourd'hui.</li>
</ul>

<h3>Attitude</h3>
<p>Tenue professionnelle, ponctualité, écoute de la question jusqu'au bout, réponses structurées, vocabulaire du métier, honnêteté quand on ne sait pas (« je ne l'ai pas pratiqué, mais je procéderais ainsi et je vérifierais dans telle source »). Ne critiquez jamais votre entreprise d'accueil ni vos collègues : parlez de situations et de solutions.</p>`,
      },
      {
        title: "10.9 – Boîte à outils : check-lists de l'assistant RH",
        content: `<h3>Mode d'emploi</h3>
<p>Ces check-lists sont des notes professionnelles autorisées à l'épreuve et des outils de travail quotidiens. Adaptez-les à votre entreprise (convention collective, logiciels, procédures internes) et datez chaque version : une check-list périmée est une source d'erreur.</p>

<h3>1. Check-list d'embauche</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Point de contrôle</th><th>Fait</th></tr>
<tr><td>Avant l'arrivée</td><td>Pièces reçues : identité, numéro de sécurité sociale, RIB au nom du salarié, coordonnées, diplômes ou habilitations exigés</td><td>☐</td></tr>
<tr><td></td><td>Ressortissant hors UE : titre autorisant à travailler vérifié auprès de la préfecture au moins 2 jours ouvrables avant</td><td>☐</td></tr>
<tr><td></td><td>DPAE effectuée (au plus tôt 8 jours avant, au plus tard avant la prise de poste), accusé archivé</td><td>☐</td></tr>
<tr><td></td><td>Contrat rédigé : type, motif (CDD), mentions obligatoires, convention collective, classification, rémunération, durée et horaires (temps partiel), période d'essai</td><td>☐</td></tr>
<tr><td></td><td>Poste de travail, badge, accès SIRH et messagerie, équipements de protection individuelle</td><td>☐</td></tr>
<tr><td>Jour 1</td><td>Inscription au registre unique du personnel</td><td>☐</td></tr>
<tr><td></td><td>Contrat signé (CDD : au plus tard dans les 2 jours ouvrables), un exemplaire remis</td><td>☐</td></tr>
<tr><td></td><td>Informations sur la relation de travail remises dans les délais, règlement intérieur, livret d'accueil, notices complémentaire santé et prévoyance</td><td>☐</td></tr>
<tr><td></td><td>Accueil sécurité et formation à la sécurité</td><td>☐</td></tr>
<tr><td>Premier mois</td><td>Visite d'information et de prévention demandée (dans les 3 mois ; avant l'affectation en cas de suivi individuel renforcé)</td><td>☐</td></tr>
<tr><td></td><td>Éléments transmis à la paie, affiliation mutuelle (ou dispense justifiée)</td><td>☐</td></tr>
<tr><td></td><td>Échéances saisies : fin de période d'essai, fin de CDD, premier entretien de parcours professionnel dans l'année</td><td>☐</td></tr>
</table>

<h3>2. Check-list de sortie</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Point de contrôle</th><th>Fait</th></tr>
<tr><td>Mode de rupture identifié et documenté (démission, licenciement, rupture conventionnelle homologuée, fin de CDD, départ ou mise à la retraite, rupture de période d'essai)</td><td>☐</td></tr>
<tr><td>Dates calculées : préavis (légal, conventionnel, contractuel), dispense éventuelle, dernier jour travaillé</td><td>☐</td></tr>
<tr><td>Éléments de solde transmis à la paie : congés payés restant dus, indemnités (licenciement, rupture conventionnelle, fin de contrat, compensatrice de préavis), heures à régulariser</td><td>☐</td></tr>
<tr><td>Documents remis : certificat de travail, attestation France Travail (transmise par voie dématérialisée), reçu pour solde de tout compte, état récapitulatif de l'épargne salariale le cas échéant</td><td>☐</td></tr>
<tr><td>Information sur la portabilité de la complémentaire santé et de la prévoyance</td><td>☐</td></tr>
<tr><td>Restitution du matériel, des badges et des accès informatiques ; désactivation des comptes</td><td>☐</td></tr>
<tr><td>Registre unique du personnel complété (date de sortie), DSN de fin de contrat</td><td>☐</td></tr>
<tr><td>Entretien de sortie proposé (motifs de départ, pour les indicateurs de turnover)</td><td>☐</td></tr>
<tr><td>Archivage du dossier selon les durées de conservation</td><td>☐</td></tr>
</table>

<h3>3. Check-list des variables de paie (mensuelle)</h3>
<ol>
<li>Calendrier : date limite de remontée des éléments par les managers, date de transmission au cabinet, date de contrôle des bulletins, date de paiement, date de dépôt de la DSN (le 5 du mois suivant pour les entreprises d'au moins 50 salariés, le 15 pour les autres, sous réserve des règles de décalage de paie).</li>
<li>Entrées et sorties du mois, changements de contrat (avenants, temps de travail, classification).</li>
<li>Heures supplémentaires et complémentaires validées par le manager, avec le taux de majoration applicable.</li>
<li>Absences : congés payés, RTT, maladie (avis reçus, signalements DSN effectués), accidents du travail, congés pour événements familiaux, absences injustifiées.</li>
<li>Primes et indemnités (conventionnelles, exceptionnelles), avantages en nature, remboursements de frais.</li>
<li>Acomptes, saisies sur salaire, prise en charge des transports.</li>
<li>Contrôle des bulletins : salaire de base conforme au contrat, minimum conventionnel respecté, variables reportées, net à payer cohérent avec le mois précédent (écarts expliqués).</li>
<li>Transmission sécurisée, archivage, confidentialité.</li>
</ol>

<h3>4. Check-list d'une campagne d'entretiens</h3>
<ol>
<li>Extraire la liste des salariés concernés : premier entretien de parcours professionnel dans l'année suivant l'embauche, entretiens périodiques (tous les quatre ans), entretien de mi-carrière (autour de 45 ans), entretien avant 60 ans, états des lieux récapitulatifs (tous les huit ans), entretiens annuels d'évaluation si l'entreprise en pratique.</li>
<li>Vérifier la rédaction en vigueur de l'article L6315-1 et les dispositions transitoires.</li>
<li>Préparer ou mettre à jour les supports dans le SIRH (rubriques obligatoires : perspectives d'évolution, informations sur la VAE, le CPF, les abondements, le CEP).</li>
<li>Informer les managers (calendrier, objectifs, distinction entretien d'évaluation / entretien de parcours professionnel) et les salariés.</li>
<li>Suivre l'avancement chaque semaine, relancer.</li>
<li>Vérifier qu'une copie du compte rendu est remise au salarié.</li>
<li>Exploiter les comptes rendus : besoins de formation, souhaits de mobilité, alertes ; synthèse anonymisée pour la direction.</li>
<li>Repérer les salariés exposés à l'abondement correctif (entreprises d'au moins 50 salariés).</li>
<li>Archiver les comptes rendus de manière confidentielle.</li>
</ol>

<h3>5. Check-list de recrutement</h3>
<ol>
<li>Besoin validé (création ou remplacement, budget, type de contrat).</li>
<li>Fiche de poste à jour et profil de poste rédigé avec le manager.</li>
<li>Offre rédigée en français, non discriminatoire, relue par la responsable RH.</li>
<li>Canaux de diffusion choisis (interne d'abord si la politique de mobilité le prévoit, job boards, France Travail, réseaux, cooptation).</li>
<li>Grille d'analyse construite avant la réception des candidatures.</li>
<li>Accusés de réception envoyés, information RGPD donnée aux candidats.</li>
<li>Présélection tracée, entretiens planifiés avec une trame commune.</li>
<li>Décision, promesse ou proposition d'embauche écrite, réponse à tous les candidats non retenus.</li>
<li>Lancement de la check-list d'embauche et du programme d'intégration.</li>
<li>Indicateurs : délai de recrutement, nombre de candidatures, source du candidat retenu, confirmation à l'issue de la période d'essai.</li>
</ol>

<h3>6. Check-list du plan de développement des compétences</h3>
<ol>
<li>Orientations de la direction recueillies, obligations réglementaires recensées (sécurité, habilitations à renouveler).</li>
<li>Besoins issus des entretiens consolidés, priorisés avec une grille.</li>
<li>Actions définies : objectif, public, durée, modalité, période.</li>
<li>Organismes consultés, NDA et Qualiopi vérifiés, devis comparés.</li>
<li>Plan chiffré : coûts pédagogiques, salariaux, annexes ; financements identifiés (OPCO, CPF co-construit, période de reconversion, FNE-Formation).</li>
<li>CSE consulté (politique sociale), BDESE mise à jour.</li>
<li>Conventions signées, demandes de prise en charge déposées avant le démarrage.</li>
<li>Convocations, logistique, émargements, attestations.</li>
<li>Factures contrôlées, remboursements suivis.</li>
<li>Évaluations à chaud et à froid exploitées, bilan annuel.</li>
</ol>`,
      },
      {
        title: "10.10 – Calendrier social annuel et sources de veille",
        content: `<h3>Le calendrier social de l'assistant RH</h3>
<p>Le calendrier ci-dessous rassemble les échéances récurrentes d'une entreprise comme ALTÉA SERVICES (148 salariés, CSE, convention collective de la propreté). Les dates exactes peuvent varier selon les accords d'entreprise, la convention collective et les évolutions réglementaires : vérifiez-les chaque année.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Période</th><th>Échéances et actions</th></tr>
<tr><td>Chaque mois</td><td>Collecte des variables de paie, contrôle des bulletins, DSN mensuelle (le 5 du mois suivant pour les entreprises d'au moins 50 salariés), suivi des fins de CDD et de périodes d'essai, tableau de bord RH, réunion du CSE (au moins une fois par mois dans les entreprises d'au moins 300 salariés, au moins tous les deux mois en dessous, sauf accord)</td></tr>
<tr><td>Janvier</td><td>Mise à jour des paramètres de paie (SMIC, plafond de la sécurité sociale, taux de cotisations) et des affichages obligatoires ; mise à jour du calendrier des jours fériés ; lancement ou poursuite des entretiens annuels ; démarrage du plan de développement des compétences de l'année</td></tr>
<tr><td>Février</td><td>Calcul des indicateurs de l'index de l'égalité professionnelle de l'année précédente</td></tr>
<tr><td>1er mars au plus tard</td><td>Publication de la note globale de l'index de l'égalité professionnelle et transmission à l'administration (egapro.travail.gouv.fr) et au CSE (entreprises d'au moins 50 salariés)</td></tr>
<tr><td>Mars – avril</td><td>Information des salariés sur la période de prise des congés payés (au moins deux mois avant son ouverture) ; préparation des déclarations annuelles intégrées à la DSN</td></tr>
<tr><td>DSN d'avril (exigible en mai)</td><td>Déclaration annuelle de l'obligation d'emploi des travailleurs handicapés (DOETH) et déclaration du solde de la taxe d'apprentissage au titre de l'année précédente (modalités à vérifier sur net-entreprises.fr et urssaf.fr)</td></tr>
<tr><td>Avril – mai</td><td>Communication de l'ordre et des dates de départ en congé (au moins un mois avant le départ) ; organisation des remplacements d'été</td></tr>
<tr><td>Mai – octobre</td><td>Période légale de prise du congé principal (du 1er mai au 31 octobre, sauf accord) ; campagne d'affectation du solde de la taxe d'apprentissage sur la plateforme SOLTéA (calendrier publié chaque année)</td></tr>
<tr><td>31 mai / 1er juin</td><td>Fin de la période de référence d'acquisition des congés payés (si l'entreprise applique la période légale), ouverture des nouveaux compteurs</td></tr>
<tr><td>Septembre – octobre</td><td>Recueil des besoins de formation, bilan du plan en cours ; mise à jour du document unique d'évaluation des risques (au moins annuelle dans les entreprises d'au moins 11 salariés)</td></tr>
<tr><td>Octobre – décembre</td><td>Campagne des entretiens de parcours professionnel (premiers entretiens, mi-carrière, avant 60 ans, entretiens périodiques, états des lieux) ; construction et chiffrage du plan de l'année suivante</td></tr>
<tr><td>Novembre – décembre</td><td>Mise à jour de la BDESE ; consultations récurrentes du CSE (orientations stratégiques, situation économique et financière, politique sociale) selon le calendrier fixé par accord ; négociations obligatoires en présence de délégués syndicaux (rémunération, égalité professionnelle et QVCT) ; bilan annuel des formations</td></tr>
<tr><td>Fin décembre</td><td>Vérification des compteurs (congés, RTT, heures), préparation des paramètres de janvier, archivage annuel</td></tr>
<tr><td>Tous les 4 ans (en principe)</td><td>Élections du CSE (durée des mandats fixée à quatre ans, sauf accord la réduisant entre deux et quatre ans) ; information du personnel sur l'organisation des élections, le premier tour devant se tenir au plus tard le 90e jour suivant cette information (article L2314-5)</td></tr>
</table>

<h3>Organiser sa veille</h3>
<p>La compétence transversale « actualiser ses connaissances en GRH » a un critère de performance exigeant : « appliquer la règlementation sociale ou de la formation, sans décalage ». Méthode recommandée :</p>
<ul>
<li>une plage fixe chaque semaine (30 minutes) consacrée à la veille ;</li>
<li>des abonnements aux lettres d'information des sites officiels ;</li>
<li>un tableau de veille : date, source, sujet, impact pour l'entreprise, action à mener, date d'effet, statut ;</li>
<li>une vérification systématique de la source primaire (texte publié au Journal officiel, article de code dans sa version en vigueur) avant d'appliquer une information lue dans la presse ;</li>
<li>un partage des évolutions avec la responsable RH et le gestionnaire paie.</li>
</ul>

<h3>Sources officielles</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Source</th><th>Adresse</th><th>Usage</th></tr>
<tr><td>Légifrance</td><td>https://www.legifrance.gouv.fr</td><td>Codes dans leur version en vigueur, Journal officiel, conventions collectives (recherche par IDCC), jurisprudence</td></tr>
<tr><td>Code du travail numérique</td><td>https://code.travail.gouv.fr</td><td>Réponses aux questions courantes, intégrant les conventions collectives</td></tr>
<tr><td>Ministère du Travail</td><td>https://travail-emploi.gouv.fr</td><td>Fiches pratiques, actualités, titres professionnels, apprentissage, Qualiopi</td></tr>
<tr><td>Service-public (entreprendre)</td><td>https://entreprendre.service-public.fr</td><td>Fiches employeur, montants et seuils à jour</td></tr>
<tr><td>Urssaf</td><td>https://www.urssaf.fr</td><td>Taux et plafonds de cotisations, contributions formation et apprentissage</td></tr>
<tr><td>BOSS</td><td>https://boss.gouv.fr</td><td>Bulletin officiel de la sécurité sociale : doctrine opposable sur les cotisations</td></tr>
<tr><td>net-entreprises</td><td>https://www.net-entreprises.fr</td><td>DPAE, DSN, documentation déclarative</td></tr>
<tr><td>France compétences</td><td>https://www.francecompetences.fr</td><td>RNCP, Répertoire spécifique, NPEC, rapports</td></tr>
<tr><td>Mon Compte Formation</td><td>https://www.moncompteformation.gouv.fr</td><td>CPF, espace employeurs et financeurs (abondements)</td></tr>
<tr><td>AKTO</td><td>https://www.akto.fr</td><td>OPCO de la branche de la propreté : alternance, prise en charge, période de reconversion</td></tr>
<tr><td>France Travail</td><td>https://www.francetravail.fr</td><td>Offres d'emploi, aides à l'embauche, attestations</td></tr>
<tr><td>CNIL</td><td>https://www.cnil.fr</td><td>RGPD appliqué aux RH : référentiel gestion du personnel, recrutement</td></tr>
<tr><td>Index égalité (Egapro)</td><td>https://egapro.travail.gouv.fr</td><td>Calcul et déclaration de l'index</td></tr>
<tr><td>INRS</td><td>https://www.inrs.fr</td><td>Santé et sécurité au travail, risque chimique, DUERP</td></tr>
<tr><td>Anact</td><td>https://www.anact.fr</td><td>Qualité de vie et des conditions de travail</td></tr>
<tr><td>Annuaire des entreprises</td><td>https://annuaire-entreprises.data.gouv.fr</td><td>Vérification d'un SIRET, d'une entreprise, d'un organisme de formation</td></tr>
<tr><td>data.gouv.fr</td><td>https://www.data.gouv.fr</td><td>Liste publique des organismes de formation (NDA, certification Qualiopi)</td></tr>
<tr><td>Défenseur des droits</td><td>https://www.defenseurdesdroits.fr</td><td>Non-discrimination dans le recrutement et l'emploi</td></tr>
</table>`,
      },
      {
        title: "10.11 – Glossaire RH",
        content: `<h3>Mode d'emploi</h3>
<p>Ce glossaire rassemble les termes que l'assistant RH utilise au quotidien et que le jury s'attend à entendre employés à bon escient. Les définitions sont volontairement opérationnelles ; pour l'application d'une règle, reportez-vous au texte en vigueur.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Terme</th><th>Définition</th></tr>
<tr><td>Abondement (CPF)</td><td>Somme ajoutée aux droits CPF d'un titulaire par un tiers (employeur, OPCO, France Travail, région...) pour financer une formation dont le coût dépasse ses droits.</td></tr>
<tr><td>Abondement correctif</td><td>Versement de 3 000 € sur le CPF d'un salarié, dû par l'employeur d'au moins 50 salariés lorsque le salarié n'a pas bénéficié, sur la période de l'état des lieux récapitulatif, des entretiens prévus et d'au moins une formation non obligatoire.</td></tr>
<tr><td>Absentéisme (taux d')</td><td>Heures d'absence rapportées aux heures théoriques de travail sur une période, en pourcentage ; on précise toujours les motifs inclus.</td></tr>
<tr><td>Accord de performance collective (APC)</td><td>Accord d'entreprise permettant d'aménager la durée du travail, la rémunération ou la mobilité pour répondre aux nécessités de fonctionnement de l'entreprise.</td></tr>
<tr><td>AFEST</td><td>Action de formation en situation de travail : parcours alternant mises en situation de travail et séquences réflexives, reconnu comme action de formation depuis 2018.</td></tr>
<tr><td>AKTO</td><td>Opérateur de compétences des services à forte intensité de main-d'œuvre, auquel est rattachée la branche de la propreté (IDCC 3043).</td></tr>
<tr><td>Alternance</td><td>Formation associant périodes en entreprise et périodes en centre de formation : contrat d'apprentissage, contrat de professionnalisation, période de reconversion.</td></tr>
<tr><td>Apprentissage (contrat d')</td><td>Contrat de travail conclu avec un jeune de 16 à 29 ans révolus (sauf exceptions), associant formation en CFA et emploi en entreprise, en vue d'une certification ; financé par l'OPCO sur la base du NPEC.</td></tr>
<tr><td>Attestation de fin de formation</td><td>Document remis par l'organisme au stagiaire, indiquant les objectifs, la nature, la durée de l'action et les résultats de l'évaluation des acquis.</td></tr>
<tr><td>Avenant</td><td>Document écrit modifiant un élément du contrat de travail avec l'accord des deux parties.</td></tr>
<tr><td>BDESE</td><td>Base de données économiques, sociales et environnementales, mise à disposition du CSE dans les entreprises d'au moins 50 salariés pour préparer les consultations.</td></tr>
<tr><td>Bilan de compétences</td><td>Prestation permettant à un actif d'analyser ses compétences, aptitudes et motivations pour définir un projet professionnel ; ses résultats appartiennent au bénéficiaire.</td></tr>
<tr><td>Bloc de compétences</td><td>Ensemble homogène et cohérent de compétences d'une certification, pouvant être évalué et validé séparément ; pour le titre ARH, chaque bloc correspond à un CCP.</td></tr>
<tr><td>CCP</td><td>Certificat de compétences professionnelles : partie d'un titre professionnel correspondant à une activité-type, capitalisable.</td></tr>
<tr><td>CDD</td><td>Contrat à durée déterminée, conclu par écrit pour un motif précis prévu par la loi (remplacement, accroissement temporaire d'activité, emploi saisonnier...), qui ne peut pourvoir durablement un emploi permanent.</td></tr>
<tr><td>CDI</td><td>Contrat à durée indéterminée, forme normale et générale de la relation de travail.</td></tr>
<tr><td>CEP</td><td>Conseil en évolution professionnelle : accompagnement gratuit et confidentiel de tout actif dans son projet professionnel.</td></tr>
<tr><td>Certificat de réalisation</td><td>Document établi par l'organisme de formation attestant la réalisation de l'action, exigé par les financeurs.</td></tr>
<tr><td>CFA</td><td>Centre de formation d'apprentis : organisme qui dispense la formation des apprentis, soumis à la certification Qualiopi au titre des actions de formation par apprentissage.</td></tr>
<tr><td>Classification</td><td>Positionnement d'un emploi dans la grille de la convention collective (niveau, échelon, coefficient), qui détermine notamment le salaire minimum conventionnel.</td></tr>
<tr><td>Contingent annuel d'heures supplémentaires</td><td>Volume d'heures supplémentaires pouvant être effectuées dans l'année sans contrepartie obligatoire en repos, fixé par accord ou, à défaut, par décret.</td></tr>
<tr><td>Convention collective</td><td>Accord négocié entre organisations d'employeurs et de salariés d'une branche, qui complète le Code du travail ; identifiée par son IDCC.</td></tr>
<tr><td>Convention de formation</td><td>Contrat conclu entre l'acheteur d'une formation et l'organisme, précisant notamment l'objet, la durée, l'effectif, les modalités et le prix.</td></tr>
<tr><td>CPF</td><td>Compte personnel de formation : droits en euros acquis par tout actif, mobilisables à son initiative pour des formations éligibles via Mon Compte Formation.</td></tr>
<tr><td>CPF de transition professionnelle</td><td>Dispositif permettant à un salarié de s'absenter pour suivre une formation certifiante en vue de changer de métier, financé par Transitions Pro (projet de transition professionnelle).</td></tr>
<tr><td>CSE</td><td>Comité social et économique : instance représentative du personnel obligatoire à partir de 11 salariés, dotée d'attributions étendues à partir de 50 salariés.</td></tr>
<tr><td>CSRD</td><td>Directive européenne sur la publication d'informations en matière de durabilité, qui remplace la DPEF par un rapport de durabilité pour les entreprises assujetties.</td></tr>
<tr><td>CUFPA</td><td>Contribution unique à la formation professionnelle et à l'alternance : contribution à la formation professionnelle et taxe d'apprentissage, recouvrées par l'Urssaf via la DSN.</td></tr>
<tr><td>DOETH</td><td>Déclaration annuelle de l'obligation d'emploi des travailleurs handicapés, effectuée par la DSN.</td></tr>
<tr><td>Dossier professionnel (DP)</td><td>Document rédigé par le candidat à un titre professionnel, décrivant des exemples de sa pratique pour chaque activité-type.</td></tr>
<tr><td>DPAE</td><td>Déclaration préalable à l'embauche, effectuée auprès de l'Urssaf avant toute prise de poste.</td></tr>
<tr><td>DPEF</td><td>Déclaration de performance extra-financière, progressivement remplacée par le rapport de durabilité issu de la CSRD.</td></tr>
<tr><td>DREETS</td><td>Direction régionale de l'économie, de l'emploi, du travail et des solidarités : services régionaux de l'État compétents notamment pour les titres professionnels et le contrôle de la formation professionnelle.</td></tr>
<tr><td>DSN</td><td>Déclaration sociale nominative : déclaration mensuelle unique, issue de la paie, transmettant les données sociales aux organismes, complétée par des signalements d'événements (arrêt de travail, fin de contrat).</td></tr>
<tr><td>DUERP</td><td>Document unique d'évaluation des risques professionnels, que tout employeur doit établir et mettre à jour.</td></tr>
<tr><td>ECF</td><td>Évaluation passée en cours de formation, dont les résultats sont transmis au jury du titre professionnel.</td></tr>
<tr><td>Effectif</td><td>Nombre de salariés calculé selon des règles précises (sécurité sociale, Code du travail) ; ses seuils (11, 50, 250, 300) déclenchent des obligations.</td></tr>
<tr><td>Entretien de parcours professionnel</td><td>Entretien consacré aux perspectives d'évolution du salarié, qui remplace l'entretien professionnel depuis la loi du 24 octobre 2025 : dans l'année suivant l'embauche, puis tous les quatre ans, avec un entretien de mi-carrière et un entretien avant 60 ans.</td></tr>
<tr><td>Entretien final</td><td>Épreuve de 20 minutes du titre ARH, avec le dossier professionnel, évaluant la représentation que le candidat se fait du métier.</td></tr>
<tr><td>Entretien technique</td><td>Épreuve de 30 minutes du titre ARH portant sur les choix de la MSP et sur CP1 et CP5.</td></tr>
<tr><td>État des lieux récapitulatif</td><td>Bilan du parcours professionnel du salarié, désormais tous les huit ans, vérifiant notamment les entretiens réalisés et les formations suivies.</td></tr>
<tr><td>Fiche de poste</td><td>Document décrivant les missions, activités, responsabilités, liens hiérarchiques et compétences attendues pour un poste.</td></tr>
<tr><td>FNE-Formation</td><td>Financement de l'État, mis en œuvre par les OPCO, pour la formation des salariés d'entreprises en mutation ou en difficulté, selon des priorités annuelles.</td></tr>
<tr><td>France compétences</td><td>Établissement public de régulation et de financement de la formation professionnelle et de l'apprentissage, qui tient le RNCP et le RS.</td></tr>
<tr><td>GEPP</td><td>Gestion des emplois et des parcours professionnels (anciennement GPEC) : démarche d'anticipation des besoins en emplois et en compétences, objet d'une négociation obligatoire dans les entreprises d'au moins 300 salariés.</td></tr>
<tr><td>Heures complémentaires</td><td>Heures effectuées par un salarié à temps partiel au-delà de sa durée contractuelle, dans les limites prévues par le contrat, et majorées.</td></tr>
<tr><td>Heures supplémentaires</td><td>Heures effectuées au-delà de la durée légale (35 heures par semaine) ou de la durée équivalente, à la demande ou avec l'accord de l'employeur, et majorées.</td></tr>
<tr><td>IDCC</td><td>Identifiant de convention collective : numéro attribué à chaque convention (3043 pour la propreté).</td></tr>
<tr><td>Index de l'égalité professionnelle</td><td>Note sur 100 calculée et publiée chaque année par les entreprises d'au moins 50 salariés pour mesurer les écarts entre les femmes et les hommes.</td></tr>
<tr><td>Intégration (onboarding)</td><td>Ensemble des actions d'accueil et d'accompagnement d'un nouveau salarié jusqu'à sa pleine autonomie.</td></tr>
<tr><td>Kirkpatrick (modèle de)</td><td>Modèle d'évaluation de la formation en quatre niveaux : réaction, apprentissage, comportement, résultats.</td></tr>
<tr><td>Masse salariale</td><td>Total des rémunérations brutes versées sur une période ; assiette de nombreuses contributions.</td></tr>
<tr><td>Mise en situation professionnelle (MSP)</td><td>Épreuve reconstituant une situation de travail représentative ; pour le titre ARH, étude de cas de 3 h 30.</td></tr>
<tr><td>NAO</td><td>Négociations annuelles (ou périodiques) obligatoires dans les entreprises dotées de délégués syndicaux : rémunération, égalité professionnelle et QVCT, GEPP.</td></tr>
<tr><td>NDA</td><td>Numéro de déclaration d'activité attribué à un organisme de formation par l'administration ; il ne vaut pas agrément.</td></tr>
<tr><td>NPEC</td><td>Niveau de prise en charge d'un contrat d'apprentissage ou de professionnalisation, fixé par certification.</td></tr>
<tr><td>OPCO</td><td>Opérateur de compétences : organisme agréé qui finance l'alternance et appuie les branches et les entreprises de moins de 50 salariés.</td></tr>
<tr><td>Période d'essai</td><td>Période au début du contrat permettant à chaque partie d'évaluer la relation de travail et de rompre plus facilement ; sa durée est encadrée par la loi et la convention.</td></tr>
<tr><td>Période de reconversion</td><td>Dispositif applicable depuis le 1er février 2026, qui remplace Pro-A et Transitions collectives, permettant à un salarié de se reconvertir ou d'évoluer par une formation en alternance (repère : 150 à 450 heures sur 12 mois, à confirmer auprès de l'OPCO).</td></tr>
<tr><td>Plan de développement des compétences</td><td>Ensemble des actions de formation, bilans et VAE mis en place par l'employeur pour ses salariés.</td></tr>
<tr><td>Portabilité</td><td>Maintien temporaire et gratuit des garanties de complémentaire santé et de prévoyance au profit de l'ancien salarié indemnisé par l'assurance chômage.</td></tr>
<tr><td>Profil de poste</td><td>Description des compétences, connaissances et qualités recherchées chez le candidat, dérivée de la fiche de poste.</td></tr>
<tr><td>Qualiopi</td><td>Marque de la certification qualité des prestataires d'actions concourant au développement des compétences, obligatoire pour accéder aux fonds publics et mutualisés.</td></tr>
<tr><td>QVCT</td><td>Qualité de vie et des conditions de travail : démarche associant conditions de travail, santé, organisation et dialogue social.</td></tr>
<tr><td>Rapport d'étonnement</td><td>Document dans lequel un nouvel arrivant consigne ses observations sur l'entreprise après quelques semaines.</td></tr>
<tr><td>Registre unique du personnel</td><td>Registre obligatoire où sont inscrits, dans l'ordre des embauches, tous les salariés de l'établissement.</td></tr>
<tr><td>RGPD</td><td>Règlement général sur la protection des données (règlement (UE) 2016/679), qui encadre le traitement des données personnelles des salariés et candidats.</td></tr>
<tr><td>RNCP</td><td>Répertoire national des certifications professionnelles, tenu par France compétences ; le titre ARH y est enregistré sous le n° 41366.</td></tr>
<tr><td>RS</td><td>Répertoire spécifique, qui recense les certifications et habilitations complémentaires (compétences transversales, réglementaires).</td></tr>
<tr><td>SIRH</td><td>Système d'information des ressources humaines (Lucca chez ALTÉA) : logiciel de gestion du personnel, des temps, des entretiens.</td></tr>
<tr><td>Solde de tout compte</td><td>Reçu inventoriant les sommes versées au salarié à la rupture du contrat ; il peut être dénoncé dans les six mois de sa signature.</td></tr>
<tr><td>Subrogation</td><td>Mécanisme par lequel un tiers est substitué au créancier : l'OPCO paie directement l'organisme de formation, ou l'employeur perçoit les indemnités journalières à la place du salarié dont il maintient le salaire.</td></tr>
<tr><td>Temps de travail effectif</td><td>Temps pendant lequel le salarié est à la disposition de l'employeur et se conforme à ses directives sans pouvoir vaquer à ses occupations personnelles.</td></tr>
<tr><td>Temps partiel</td><td>Durée de travail inférieure à la durée légale ou conventionnelle ; contrat écrit avec mentions obligatoires, durée minimale de 24 heures par semaine sauf dérogations.</td></tr>
<tr><td>Titre professionnel</td><td>Certification du ministère chargé de l'emploi, composée de CCP, attestant les compétences pour exercer un métier.</td></tr>
<tr><td>Transitions Pro</td><td>Associations paritaires régionales qui financent les projets de transition professionnelle.</td></tr>
<tr><td>Turnover (taux de rotation)</td><td>Indicateur du renouvellement du personnel : moyenne des entrées et des sorties rapportée à l'effectif moyen.</td></tr>
<tr><td>VAE</td><td>Validation des acquis de l'expérience : voie d'accès à une certification fondée sur l'expérience.</td></tr>
<tr><td>Visite d'information et de prévention</td><td>Visite réalisée par le service de prévention et de santé au travail après l'embauche, dans un délai de trois mois pour la plupart des salariés.</td></tr>
</table>`,
      },
      {
        title: "10.12 – Quiz final transversal (20 questions corrigées)",
        content: `<h3>Consignes</h3>
<p>Une seule bonne réponse par question. Temps conseillé : 25 minutes. Les questions couvrent les six compétences du titre.</p>
<ol>
<li>(CP1) La DPAE doit être effectuée :<br>a) Dans les 8 jours suivant l'embauche<br>b) Avant la prise de poste, au plus tôt dans les 8 jours qui la précèdent<br>c) Avec la première DSN<br>d) À la fin de la période d'essai</li>
<li>(CP1) Un CDD doit être transmis au salarié :<br>a) Le jour de la fin du contrat<br>b) Au plus tard dans les 2 jours ouvrables suivant l'embauche<br>c) Dans le mois<br>d) Aucun délai n'existe</li>
<li>(CP1) Un CDD de remplacement doit notamment mentionner :<br>a) L'âge du salarié remplacé<br>b) Le nom et la qualification de la personne remplacée<br>c) Le motif médical de l'absence<br>d) Le salaire de la personne remplacée</li>
<li>(CP1) Le congé légal pour le mariage du salarié est de :<br>a) 1 jour<br>b) 2 jours<br>c) 4 jours<br>d) 5 jours</li>
<li>(CP2) À défaut d'accord, les huit premières heures supplémentaires hebdomadaires sont majorées de :<br>a) 10 %<br>b) 25 %<br>c) 50 %<br>d) 100 %</li>
<li>(CP2) Les heures complémentaires d'un salarié à temps partiel, dans la limite du dixième de la durée contractuelle, sont majorées d'au moins :<br>a) 0 %<br>b) 10 %<br>c) 25 %<br>d) 50 %</li>
<li>(CP2) Le signalement d'un arrêt de travail en DSN est effectué :<br>a) Dans les 5 jours suivant la connaissance de l'arrêt<br>b) À la fin de l'arrêt<br>c) Avec la DSN annuelle<br>d) Il n'est pas nécessaire</li>
<li>(CP3) Une entreprise compte 12 710 heures d'absence pour 205 000 heures théoriques. Son taux d'absentéisme est :<br>a) 1,61 %<br>b) 6,20 %<br>c) 12,71 %<br>d) 16,13 %</li>
<li>(CP3) Le taux de rotation se calcule ainsi :<br>a) Sorties ÷ entrées<br>b) ((Entrées + sorties) ÷ 2) ÷ effectif moyen × 100<br>c) Entrées ÷ effectif × 100<br>d) Effectif final − effectif initial</li>
<li>(CP3) L'index de l'égalité professionnelle est publié chaque année au plus tard le :<br>a) 1er janvier<br>b) 1er mars<br>c) 30 juin<br>d) 31 décembre</li>
<li>(CP4) Depuis la loi du 24 octobre 2025, l'entretien de parcours professionnel a lieu, après le premier entretien :<br>a) Tous les ans<br>b) Tous les deux ans<br>c) Tous les quatre ans<br>d) Tous les six ans</li>
<li>(CP4) L'état des lieux récapitulatif du parcours a lieu désormais tous les :<br>a) 4 ans<br>b) 6 ans<br>c) 8 ans<br>d) 10 ans</li>
<li>(CP4) L'entretien de parcours professionnel :<br>a) Évalue les résultats du salarié<br>b) Porte sur les perspectives d'évolution professionnelle et comporte des informations sur la VAE, le CPF et le CEP<br>c) Est facultatif à partir de 50 salariés<br>d) Est réservé aux cadres</li>
<li>(CP5) Laquelle de ces mentions est interdite dans une offre d'emploi ?<br>a) « Maîtrise du tableur exigée »<br>b) « Poste à pourvoir à Créteil »<br>c) « Candidat de moins de 35 ans »<br>d) « Rémunération selon la grille conventionnelle »</li>
<li>(CP5) La grille d'analyse des candidatures doit être :<br>a) Construite après la lecture des CV<br>b) Cohérente avec le profil de poste et appliquée à tous les candidats<br>c) Différente pour chaque candidat<br>d) Communiquée aux candidats</li>
<li>(CP5) Un programme d'intégration doit prévoir :<br>a) Uniquement la remise du contrat<br>b) Les acteurs, les étapes et les outils<br>c) Uniquement une visite des locaux<br>d) La signature d'une clause de non-concurrence</li>
<li>(CP6) L'OPCO de rattachement d'ALTÉA SERVICES (IDCC 3043) est :<br>a) L'OPCO EP<br>b) AKTO<br>c) OPCO Atlas<br>d) Uniformation</li>
<li>(CP6) Une entreprise de 148 salariés :<br>a) Voit son plan financé par l'OPCO sur les fonds légaux mutualisés<br>b) Finance son plan sur fonds propres, mais peut mobiliser l'alternance et la période de reconversion<br>c) N'a pas d'obligation de formation<br>d) Ne paie pas de contribution formation</li>
<li>(CP6) Le niveau 4 du modèle de Kirkpatrick mesure :<br>a) La satisfaction<br>b) Les connaissances acquises<br>c) Le transfert au poste<br>d) Les résultats pour l'organisation</li>
<li>(Titre) La mise en situation professionnelle du titre ARH dure :<br>a) 2 h<br>b) 3 h 30, plus 15 minutes de prise en main du poste<br>c) 4 h 20<br>d) 1 h 30</li>
</ol>

<h3>Corrigé</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>b</td><td>Articles L1221-10 et R1221-5 : déclaration avant l'embauche, au plus tôt dans les 8 jours qui la précèdent.</td></tr>
<tr><td>2</td><td>b</td><td>Article L1242-13. Le non-respect expose à une indemnité ; l'absence d'écrit entraîne la requalification en CDI.</td></tr>
<tr><td>3</td><td>b</td><td>Article L1242-12. Le motif médical ne doit jamais figurer.</td></tr>
<tr><td>4</td><td>c</td><td>Article L3142-4, sous réserve de dispositions conventionnelles plus favorables.</td></tr>
<tr><td>5</td><td>b</td><td>Article L3121-36 ; un accord peut prévoir un taux différent, d'au moins 10 %.</td></tr>
<tr><td>6</td><td>b</td><td>Article L3123-29.</td></tr>
<tr><td>7</td><td>a</td><td>Le signalement permet le calcul des indemnités journalières.</td></tr>
<tr><td>8</td><td>b</td><td>12 710 ÷ 205 000 × 100 = 6,20 %.</td></tr>
<tr><td>9</td><td>b</td><td>Formule usuelle ; indiquer toujours la méthode retenue.</td></tr>
<tr><td>10</td><td>b</td><td>Entreprises d'au moins 50 salariés ; publication et déclaration au plus tard le 1er mars.</td></tr>
<tr><td>11</td><td>c</td><td>Premier entretien dans l'année suivant l'embauche, puis tous les quatre ans ; dispositions transitoires à vérifier.</td></tr>
<tr><td>12</td><td>c</td><td>L'état des lieux passe de six à huit ans ; l'abondement correctif de 3 000 € est maintenu dans les entreprises d'au moins 50 salariés.</td></tr>
<tr><td>13</td><td>b</td><td>Il ne porte pas sur l'évaluation du travail, qui relève de l'entretien annuel.</td></tr>
<tr><td>14</td><td>c</td><td>L'âge est un critère discriminatoire (article L1132-1).</td></tr>
<tr><td>15</td><td>b</td><td>Critère d'évaluation du RE : « la grille d'analyse est en cohérence avec le profil de poste ».</td></tr>
<tr><td>16</td><td>b</td><td>Critère d'évaluation du RE pour CP5.</td></tr>
<tr><td>17</td><td>b</td><td>La branche de la propreté relève d'AKTO.</td></tr>
<tr><td>18</td><td>b</td><td>Les fonds mutualisés du plan sont réservés aux entreprises de moins de 50 salariés.</td></tr>
<tr><td>19</td><td>d</td><td>Niveaux : 1 réaction, 2 apprentissage, 3 comportement, 4 résultats.</td></tr>
<tr><td>20</td><td>b</td><td>L'épreuve totale dure 4 h 20 : MSP 3 h 30, entretien technique 30 min, entretien final 20 min.</td></tr>
</table>
<p>Score de 16 ou plus : vous êtes prêt(e). Entre 12 et 15 : reprenez les chapitres correspondant à vos erreurs. Moins de 12 : planifiez une révision complète avec votre formateur avant la MSP blanche.</p>`,
      },
    ],
  },
];
