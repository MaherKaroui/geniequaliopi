// Référentiel national qualité — 7 critères, 33 indicateurs
// Décret n° 2026-728 du 1er août 2026 (JORF du 4 août 2026), en vigueur le 1er novembre 2026.
// Niveaux attendus : guide de lecture V9 du 08/01/2024 (pas de V10 publiée au 30/09/2026).

export interface IndicateurReference {
  numero: number;
  critere: number;
  type: "commun" | "specifique";
  applicableActions: string[]; // "OF", "CFA", "CBC", "VAE"
  intitule: string;
  niveauAttendu: string;
  questionsPreuves: string[];
}

export const INDICATEURS_REFERENCE: IndicateurReference[] = [
  // CRITÈRE 1 – INFORMATION DU PUBLIC
  {
    numero: 1, critere: 1, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire diffuse une information accessible au public, détaillée et vérifiable sur les prestations proposées : prérequis, objectifs, durée, modalités et délais d'accès, tarifs, contacts, méthodes mobilisées et modalités d'évaluation, accessibilité aux personnes handicapées.",
    niveauAttendu: "Donner une information accessible, exhaustive (c'est-à-dire sur l'intégralité des items mentionnés), datée et actualisée.",
    questionsPreuves: [
      "Les 10 items sont accessibles sur le site internet, le catalogue et les fiches formation.",
      "Si l'organisme a déjà été certifié : utilisation du logo Qualiopi conforme à la charte graphique.",
    ],
  },
  {
    numero: 2, critere: 1, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire diffuse des indicateurs de résultats adaptés à la nature des prestations mises en œuvre et des publics accueillis.",
    niveauAttendu: "Donner une information chiffrée sur le niveau de performance et d'accomplissement de la prestation.",
    questionsPreuves: [
      "Les indicateurs retenus (dont au moins une information chiffrée).",
      "Sources de calculs.",
      "Fréquence de mise à jour.",
      "Supports sur lesquels figurent les indicateurs de résultats.",
    ],
  },
  {
    numero: 3, critere: 1, type: "specifique",
    applicableActions: ["OF", "CFA", "VAE"],
    intitule: "Lorsque le prestataire met en œuvre des prestations conduisant à une certification professionnelle, il informe sur les taux d'obtention des certifications préparées, les possibilités de valider un/ou des blocs de compétences, ainsi que sur les équivalences, passerelles, suites de parcours et les débouchés.",
    niveauAttendu: "Donner une information chiffrée sur les taux d'obtention des certifications et les débouchés.",
    questionsPreuves: [
      "Taux d'obtention, blocs de compétences.",
      "Équivalences, passerelles, suites de parcours.",
    ],
  },
  // CRITÈRE 2 – OBJECTIFS DES PRESTATIONS
  {
    numero: 4, critere: 2, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire analyse le besoin du bénéficiaire en lien avec l'entreprise et/ou le financeur concerné(s).",
    niveauAttendu: "Démontrer comment le besoin du bénéficiaire est analysé en fonction de la finalité de la prestation.",
    questionsPreuves: [
      "Quand et comment les besoins des bénéficiaires sont-ils recueillis et analysés ?",
      "Lister et montrer les preuves (questionnaires, mails, preuve d'analyse).",
    ],
  },
  {
    numero: 5, critere: 2, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire définit les objectifs opérationnels et évaluables de la prestation.",
    niveauAttendu: "Démontrer que les objectifs sont opérationnels et évaluables.",
    questionsPreuves: [
      "Comment sont-ils définis ?",
      "Comment s'assure-t-on qu'ils sont opérationnels ? Peuvent-ils être précédés de la mention « être capable de » ?",
      "Comment sont-ils évalués ?",
    ],
  },
  {
    numero: 6, critere: 2, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire établit les contenus et les modalités de mise en œuvre de la prestation, adaptés aux objectifs définis et aux publics bénéficiaires.",
    niveauAttendu: "Démontrer que les contenus et modalités de mise en œuvre des prestations sont adaptés aux objectifs définis en fonction des bénéficiaires.",
    questionsPreuves: [
      "Existe-t-il des déroulés pédagogiques ?",
      "Quels liens sont faits avec les objectifs de formation ?",
      "Les besoins des bénéficiaires recueillis à l'indicateur 4 sont-ils bien pris en compte ?",
    ],
  },
  {
    numero: 7, critere: 2, type: "specifique",
    applicableActions: ["OF", "CFA"],
    intitule: "Lorsque le prestataire met en œuvre des prestations conduisant à une certification professionnelle, il s'assure de l'adéquation du ou des contenus de la prestation aux exigences de la certification visée.",
    niveauAttendu: "Démontrer l'adéquation du contenu de la prestation aux exigences de la certification visée.",
    questionsPreuves: [
      "Comment est assurée l'adéquation entre le contenu et la certification ?",
    ],
  },
  {
    numero: 8, critere: 2, type: "specifique",
    applicableActions: ["OF", "CFA"],
    intitule: "Le prestataire détermine les procédures de positionnement et d'évaluation des acquis à l'entrée de la prestation.",
    niveauAttendu: "Démontrer la mise en œuvre des procédures de positionnement et d'évaluation des acquis à l'entrée de la prestation adaptée aux publics et modalités de formations.",
    questionsPreuves: [
      "Quels sont les prérequis ? Comment sont-ils évalués ? À quel moment ?",
      "Quels outils sont utilisés ?",
      "Que prévoit la procédure quand les prérequis ne sont pas remplis ?",
    ],
  },
  // CRITÈRE 3 – ACCOMPAGNEMENT
  {
    numero: 9, critere: 3, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire informe les publics bénéficiaires des conditions de déroulement de la prestation.",
    niveauAttendu: "Les modalités d'accueil et les conditions de déroulement de la prestation sont formalisées et diffusées.",
    questionsPreuves: [
      "Quels sont les éléments transmis aux stagiaires suite à leur inscription ? Quand ? Par quels moyens ?",
    ],
  },
  {
    numero: 10, critere: 3, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire met en œuvre et adapte la prestation, l'accompagnement et le suivi aux publics bénéficiaires.",
    niveauAttendu: "La prestation est adaptée aux situations et profils des bénéficiaires : contenus, accompagnement, suivi (durées, emplois du temps, adaptation des rythmes).",
    questionsPreuves: [
      "Quelles sont les preuves de réalisation des formations ?",
      "Comment les formations sont-elles adaptées en fonction des profils des stagiaires ?",
      "De quelle façon les stagiaires sont-ils accompagnés durant la formation et suivis après ?",
    ],
  },
  {
    numero: 11, critere: 3, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire évalue l'atteinte par les publics bénéficiaires des objectifs de la prestation.",
    niveauAttendu: "Démontrer qu'un processus d'évaluation existe, est formalisé et mis en œuvre. Il permet d'apprécier l'atteinte des objectifs.",
    questionsPreuves: [
      "À quel moment les stagiaires sont-ils évalués ?",
      "Quels outils d'évaluation des compétences acquises ont été mis en place ?",
    ],
  },
  {
    numero: 12, critere: 3, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire décrit et met en œuvre les mesures pour favoriser l'engagement des bénéficiaires et prévenir les ruptures de parcours.",
    niveauAttendu: "Démontrer que des mesures formalisées existent et sont mises en œuvre.",
    questionsPreuves: [
      "Quelles actions sont mises en place pour maintenir l'engagement des bénéficiaires ?",
      "En cas d'absence d'un stagiaire, quelles sont les actions prévues ?",
    ],
  },
  {
    numero: 13, critere: 3, type: "specifique",
    applicableActions: ["CFA"],
    intitule: "Pour les formations en alternance, le prestataire, en lien avec l'entreprise, anticipe avec l'apprenant les missions confiées, à court, moyen et long terme, et assure la coordination et la progressivité des apprentissages réalisés en centre de formation et en entreprise.",
    niveauAttendu: "Démontrer que les principes de la pédagogie de l'alternance sont mis en œuvre par un processus formalisé d'articulation itérative entre le centre et l'entreprise. Nouvel entrant : processus formalisé ; mise en œuvre vérifiée à l'audit de surveillance.",
    questionsPreuves: [
      "Comment les missions confiées à l'apprenant sont-elles anticipées avec l'entreprise (court, moyen et long terme) ?",
      "Quels outils assurent la coordination centre / entreprise (livret d'apprentissage, visites, fiches de liaison) ?",
      "Comment la progressivité des apprentissages est-elle suivie ?",
    ],
  },
  {
    numero: 14, critere: 3, type: "specifique",
    applicableActions: ["CFA"],
    intitule: "Le prestataire met en œuvre un accompagnement socio-professionnel, éducatif et relatif à l'exercice de la citoyenneté. Il dispose d'une procédure de traitement sans délai des situations de rupture liées à des difficultés, violences ou discriminations subies par l'apprenant en formation ou dans l'entreprise d'accueil.",
    niveauAttendu: "Démontrer que l'accompagnement socio-professionnel, éducatif et citoyen est formalisé et mis en œuvre (missions des CFA, art. L.6231-2 du Code du travail), et qu'une procédure de traitement sans délai des situations de rupture existe. Nouvel entrant : dispositif formalisé ; mise en œuvre vérifiée à la surveillance.",
    questionsPreuves: [
      "Quelles actions d'accompagnement social, éducatif et citoyen sont proposées (logement, transport, santé, aides financières) ?",
      "Quelle procédure permet de traiter sans délai une rupture liée à des difficultés, des violences ou des discriminations ?",
      "Qui est l'interlocuteur de l'apprenant et comment est-il joignable ?",
    ],
  },
  {
    numero: 15, critere: 3, type: "specifique",
    applicableActions: ["CFA"],
    intitule: "Le prestataire informe les apprentis de leurs droits et devoirs en tant qu'apprentis et salariés ainsi que des règles applicables en matière de santé et de sécurité en milieu professionnel, de manière renforcée lorsqu'ils sont mineurs. Il les informe des dispositifs d'accompagnement, de prévention et de signalement des situations de violences, de harcèlement moral ou sexuel, d'agissements sexistes et de discriminations, ainsi que des interlocuteurs susceptibles de les accompagner. Il communique les coordonnées du médiateur de l'apprentissage et veille à signaler les dysfonctionnements à l'inspection du travail.",
    niveauAttendu: "Démontrer que chaque apprenti a reçu une information complète et traçable : droits et devoirs d'apprenti et de salarié, santé et sécurité (renforcée pour les mineurs), dispositifs de prévention et de signalement des violences, harcèlement, agissements sexistes et discriminations, coordonnées du médiateur de l'apprentissage.",
    questionsPreuves: [
      "Quel support informe l'apprenti de ses droits et devoirs et des règles de santé-sécurité ? Comment la remise est-elle tracée ?",
      "Quelles mesures renforcées s'appliquent aux apprentis mineurs ?",
      "Où figurent le dispositif de signalement, les interlocuteurs et les coordonnées du médiateur de l'apprentissage ?",
    ],
  },
  {
    numero: 16, critere: 3, type: "specifique",
    applicableActions: ["OF", "CFA", "VAE"],
    intitule: "Lorsque le prestataire met en œuvre des formations conduisant à une certification professionnelle, il s'assure que les conditions de présentation des bénéficiaires à la certification respectent les exigences formelles de l'autorité de certification.",
    niveauAttendu: "Démontrer le respect des exigences formelles de l'autorité de certification (habilitation ou convention, règlement d'examen, inscription aux sessions, aménagements pour les personnes en situation de handicap).",
    questionsPreuves: [
      "Quelles sont les exigences du certificateur et comment sont-elles respectées ?",
      "Comment les candidats sont-ils inscrits et informés des modalités de certification ?",
    ],
  },
  // CRITÈRE 4 – MOYENS PÉDAGOGIQUES, TECHNIQUES ET D'ENCADREMENT
  {
    numero: 17, critere: 4, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire met à disposition ou s'assure de la mise à disposition des moyens humains et techniques adaptés et d'un environnement approprié (conditions, locaux, équipements, plateaux techniques…).",
    niveauAttendu: "Démontrer que les locaux, les équipements et les moyens humains sont en adéquation avec les objectifs des prestations. Bilan de compétences : garantir la confidentialité des échanges.",
    questionsPreuves: [
      "Comment l'organisme s'assure-t-il que les moyens humains, logistiques et techniques sont adéquats ?",
      "Moyens humains, moyens techniques, environnement : lister et montrer les preuves.",
    ],
  },
  {
    numero: 18, critere: 4, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire mobilise et coordonne les différents intervenants internes et/ou externes (pédagogiques, administratifs, logistiques, commerciaux…).",
    niveauAttendu: "Démontrer l'existence d'une coordination des fonctions nécessaires à la prestation. Un indépendant peut assurer seul l'ensemble des fonctions.",
    questionsPreuves: [
      "Quelles sont les pratiques pour coordonner les prestations entre les différents intervenants ?",
      "Qui sont les référents pédagogique, administratif et handicap ?",
    ],
  },
  {
    numero: 19, critere: 4, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire met à disposition du bénéficiaire des ressources pédagogiques et permet à celui-ci de se les approprier.",
    niveauAttendu: "Démontrer que les ressources pédagogiques sont cohérentes avec les objectifs, actualisées et disponibles, et que des dispositions permettent au bénéficiaire de se les approprier. Formation à distance : assistance technique et pédagogique (art. D.6313-3-1).",
    questionsPreuves: [
      "Comment sont gérées et actualisées les ressources pédagogiques ?",
      "Quelles dispositions permettent aux bénéficiaires de se les approprier ?",
      "Existe-t-il des supports adaptés aux personnes en situation de handicap ?",
    ],
  },
  {
    numero: 20, critere: 4, type: "specifique",
    applicableActions: ["CFA"],
    intitule: "Le prestataire dispose d'un personnel dédié à l'appui à la mobilité nationale et internationale, d'un référent handicap et d'un conseil de perfectionnement. Il s'assure de la qualité du pilotage de la formation, de la participation des apprentis, formateurs et entreprises à sa gouvernance. Lorsque la proportion d'heures d'enseignement réalisées par des intervenants permanents est inférieure à un seuil fixé par arrêté du ministre chargé de la formation professionnelle, le prestataire s'assure de la mise en œuvre de modalités renforcées de supervision pédagogique et de contrôle de la qualité des interventions.",
    niveauAttendu: "Présenter : la personne dédiée à la mobilité et ses actions ; le référent handicap et ses actions ; la composition du conseil de perfectionnement et son dernier procès-verbal ; la participation des apprentis, formateurs et entreprises à la gouvernance ; la part d'heures assurées par des intervenants permanents et, sous le seuil, les modalités renforcées de supervision.",
    questionsPreuves: [
      "Qui sont le référent mobilité et le référent handicap ? Quelles actions ont-ils conduites ?",
      "Qui compose le conseil de perfectionnement ? Quand s'est-il réuni ?",
      "Quelle est la part d'heures assurées par des intervenants permanents ? Quelle supervision pédagogique en découle ?",
    ],
  },
  // CRITÈRE 5 – QUALIFICATION ET DÉVELOPPEMENT DES COMPÉTENCES DES PERSONNELS
  {
    numero: 21, critere: 5, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire détermine, mobilise et évalue les compétences des différents intervenants internes et/ou externes, adaptées aux prestations.",
    niveauAttendu: "Démontrer que les compétences requises pour réaliser les prestations ont été définies en amont et sont adaptées. La maîtrise de ces compétences fait par ailleurs l'objet d'une évaluation par le prestataire.",
    questionsPreuves: [
      "Comment est assurée la compétence des intervenants et son adéquation avec les objectifs ?",
      "Quel est le processus de recrutement et d'évaluation des intervenants ?",
      "Pour les sous-traitants, comment sont-ils sélectionnés ?",
    ],
  },
  {
    numero: 22, critere: 5, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire entretient et développe les compétences de ses salariés, adaptées aux prestations qu'il délivre.",
    niveauAttendu: "Démontrer la mobilisation des leviers de formation et de professionnalisation (plan de développement des compétences, entretiens professionnels). Un indépendant démontre sa propre démarche de formation continue. Nouvel entrant : vérifié à l'audit de surveillance.",
    questionsPreuves: [
      "Quel est le plan de développement des compétences ?",
      "Des entretiens professionnels sont-ils réalisés ?",
      "Comment les besoins de formation sont-ils recensés ?",
    ],
  },
  // CRITÈRE 6 – INSCRIPTION ET INVESTISSEMENT DANS L'ENVIRONNEMENT PROFESSIONNEL
  {
    numero: 23, critere: 6, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire réalise une veille légale et réglementaire sur le champ de la formation professionnelle et en exploite les enseignements.",
    niveauAttendu: "Démontrer la mise en place d'une veille légale et réglementaire, sa prise en compte par le prestataire et sa communication en interne.",
    questionsPreuves: [
      "Comment fonctionne la veille réglementaire ? Quelles sources ?",
      "À quelle fréquence cette veille est-elle effectuée ?",
      "Comment sont exploités les éléments recueillis ?",
    ],
  },
  {
    numero: 24, critere: 6, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire réalise une veille sur les évolutions des compétences, des métiers et des emplois dans ses secteurs d'intervention et en exploite les enseignements.",
    niveauAttendu: "Démontrer la mise en place d'une veille sur les thèmes de l'indicateur et son impact éventuel sur les prestations. Nouvel entrant : veille en place ; exploitation vérifiée à la surveillance.",
    questionsPreuves: [
      "Par quels moyens sont suivies les évolutions dans les secteurs d'intervention ?",
      "Comment cette veille fait-elle évoluer l'offre ?",
    ],
  },
  {
    numero: 25, critere: 6, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire réalise une veille sur les innovations pédagogiques et technologiques permettant une évolution de ses prestations et en exploite les enseignements.",
    niveauAttendu: "Démontrer la mise en place d'une veille sur les thèmes de l'indicateur et son impact éventuel sur les prestations. Nouvel entrant : veille en place ; exploitation vérifiée à la surveillance.",
    questionsPreuves: [
      "Quelle veille, quels supports et quels réseaux sont mobilisés pour faire évoluer les outils et méthodes ?",
      "A-t-elle donné lieu à des actions au sein de l'organisme ?",
    ],
  },
  {
    numero: 26, critere: 6, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire mobilise les expertises, outils et réseaux nécessaires pour accueillir, accompagner/former ou orienter les publics en situation de handicap.",
    niveauAttendu: "Démontrer l'identification d'un réseau de partenaires, experts et acteurs du champ du handicap, mobilisable par les personnels. Nouvel entrant : réseau identifié.",
    questionsPreuves: [
      "Quelles dispositions existent pour l'accueil adapté des personnes en situation de handicap ?",
      "Qui est le référent handicap ? Quelles sont ses missions ?",
      "Liste des experts et contacts établis.",
    ],
  },
  {
    numero: 27, critere: 6, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Lorsque le prestataire fait appel à la sous-traitance ou au portage salarial, il s'assure du respect de la conformité au présent référentiel et en assure la traçabilité dans les contrats de sous-traitance.",
    niveauAttendu: "Démontrer les dispositions mises en place pour vérifier le respect du référentiel par le sous-traitant ou le salarié porté (sélection, contrat, charte, pilotage, contrôle) et leur traçabilité dans chaque contrat. Sans recours à la sous-traitance ni au portage salarial : l'indicateur est non applicable, ce qui doit être déclaré.",
    questionsPreuves: [
      "Le prestataire fait-il appel à la sous-traitance ou au portage salarial ?",
      "Comment les exigences du référentiel sont-elles transmises et contrôlées ?",
      "Chaque contrat de sous-traitance ou de portage mentionne-t-il ces exigences ?",
    ],
  },
  {
    numero: 28, critere: 6, type: "specifique",
    applicableActions: ["OF", "CFA"],
    intitule: "Lorsque les prestations dispensées au bénéficiaire comprennent des périodes de formation en situation de travail, le prestataire mobilise son réseau de partenaires socio-économiques pour co-construire l'ingénierie de formation et favoriser l'accueil en entreprise.",
    niveauAttendu: "Démontrer l'existence d'un réseau de partenaires socio-économiques mobilisé pour co-construire l'ingénierie et favoriser l'accueil en entreprise. Sans période en situation de travail : non applicable.",
    questionsPreuves: [
      "Quels partenaires socio-économiques sont mobilisés ?",
      "Comment ont-ils contribué à l'ingénierie et à l'accueil en entreprise ?",
    ],
  },
  {
    numero: 29, critere: 6, type: "specifique",
    applicableActions: ["CFA"],
    intitule: "Le prestataire développe des actions qui concourent à l'insertion professionnelle ou la poursuite d'étude par la voie de l'apprentissage ou par toute autre voie permettant de développer leurs connaissances et leurs compétences.",
    niveauAttendu: "Démontrer la mise en œuvre d'actions favorisant l'insertion professionnelle ou la poursuite d'études (aide à la recherche d'employeur, préparation aux entretiens, suivi des sortants).",
    questionsPreuves: [
      "Quelles actions d'insertion ou de poursuite d'études sont menées ?",
      "Comment les sortants sont-ils suivis ?",
    ],
  },
  // CRITÈRE 7 – RECUEIL ET PRISE EN COMPTE DES APPRÉCIATIONS ET DES RÉCLAMATIONS
  {
    numero: 30, critere: 7, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire recueille les appréciations des parties prenantes : bénéficiaires, financeurs, équipes pédagogiques et entreprises concernées.",
    niveauAttendu: "Démontrer la sollicitation des appréciations de chaque partie prenante à une fréquence pertinente, avec des dispositifs de relance et une libre expression.",
    questionsPreuves: [
      "Comment est effectuée la collecte des appréciations pour chaque partie prenante ?",
      "Les résultats sont-ils synthétisés ? À quelle fréquence sont-ils analysés ?",
      "Quel est le système de relance ?",
    ],
  },
  {
    numero: 31, critere: 7, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire met en œuvre des modalités de traitement des difficultés rencontrées par les parties prenantes, des réclamations exprimées par ces dernières ainsi que des aléas survenus en cours de prestation.",
    niveauAttendu: "Démontrer la mise en place de modalités de traitement des aléas, difficultés et réclamations (accusé de réception, réponse, registre, suivi).",
    questionsPreuves: [
      "Quel dispositif permet de traiter les aléas, difficultés et réclamations ?",
      "Quelles réclamations ont été reçues et comment ont-elles été traitées ?",
    ],
  },
  {
    numero: 32, critere: 7, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire met en place une démarche d'amélioration continue à partir de l'analyse des appréciations et des réclamations, ainsi qu'une analyse des risques sur la qualité des formations délivrées.",
    niveauAttendu: "Démontrer la mise en place d'une démarche d'amélioration continue alimentée par l'analyse des appréciations et des réclamations, et d'une analyse des risques sur la qualité des prestations (cartographie, cotation, mesures de maîtrise, suivi). Nouvel entrant : démarche formalisée.",
    questionsPreuves: [
      "Quelles actions d'amélioration ont été décidées à partir des appréciations et réclamations ?",
      "Quels risques sur la qualité des formations ont été identifiés et cotés ? Quelles mesures de maîtrise ?",
      "Comment s'assure-t-on que les actions sont mises en œuvre et efficaces ?",
    ],
  },
  {
    numero: 33, critere: 7, type: "specifique",
    applicableActions: ["CFA"],
    intitule: "Le prestataire met en place un dispositif d'évaluation des contenus et des enseignements par les apprenants, distinct du recueil général de satisfaction, dont les résultats sont partagés avec les équipes pédagogiques et donnent lieu à la formalisation d'une démarche d'amélioration continue, dont il mesure périodiquement l'efficacité.",
    niveauAttendu: "Démontrer un dispositif d'évaluation des contenus et des enseignements par les apprenants, distinct du questionnaire de satisfaction ; le partage des résultats avec l'équipe pédagogique (compte rendu) ; le plan d'amélioration qui en découle et la mesure périodique de son efficacité.",
    questionsPreuves: [
      "Quel outil permet aux apprenants d'évaluer les contenus et les enseignements, distinct du questionnaire de satisfaction ?",
      "Comment les résultats sont-ils partagés avec les équipes pédagogiques ?",
      "Quelles améliorations en ont découlé et comment leur efficacité est-elle mesurée ?",
    ],
  },
];

export const CRITERES_TITLES: Record<number, string> = {
  1: "Les conditions d'information du public sur les prestations proposées, les délais pour y accéder et les résultats obtenus",
  2: "L'identification précise des objectifs des prestations proposées et l'adaptation de ces prestations aux publics bénéficiaires",
  3: "L'adaptation aux publics bénéficiaires des prestations et des modalités d'accueil, d'accompagnement, de suivi et d'évaluation",
  4: "L'adéquation des moyens pédagogiques, techniques et d'encadrement aux prestations mises en œuvre",
  5: "La qualification et le développement des connaissances et compétences des personnels chargés de mettre en œuvre les prestations",
  6: "L'inscription et l'investissement du prestataire dans son environnement professionnel",
  7: "Le recueil et la prise en compte des appréciations et des réclamations formulées par les parties prenantes aux prestations délivrées",
};
