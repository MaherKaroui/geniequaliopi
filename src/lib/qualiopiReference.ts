// Official RNQ reference data for all 32 indicators
// Matching the Reltim PDF structure exactly

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
    applicableActions: ["OF", "CFA"],
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
    applicableActions: ["OF", "CFA"],
    intitule: "Pour les formations certifiantes, le prestataire met en œuvre des modalités de certification conformes aux exigences de la certification visée.",
    niveauAttendu: "Démontrer que les modalités de certification sont conformes aux exigences.",
    questionsPreuves: [
      "Modalités de certification.",
      "Règlement d'examen.",
    ],
  },
  {
    numero: 14, critere: 3, type: "specifique",
    applicableActions: ["CFA"],
    intitule: "Le prestataire met en œuvre un accompagnement socio-professionnel, éducatif et relatif à l'exercice de la citoyenneté.",
    niveauAttendu: "Démontrer la mise en œuvre d'un accompagnement socio-professionnel adapté.",
    questionsPreuves: [
      "Accompagnement socio-professionnel.",
      "Suivi éducatif.",
    ],
  },
  // CRITÈRE 4 – MOYENS PÉDAGOGIQUES
  {
    numero: 15, critere: 4, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire met à disposition ou s'assure de la mise à disposition des moyens humains et techniques adaptés et d'un environnement approprié.",
    niveauAttendu: "Démontrer que les locaux, les équipements, les moyens humains sont en adéquation avec la ou les prestation(s).",
    questionsPreuves: [
      "Comment l'organisme s'assure que les moyens humains, logistiques et techniques sont adéquats ?",
      "Moyens humains : lister et montrer les preuves.",
      "Moyens techniques : lister et montrer les preuves.",
      "Environnement approprié : lister et montrer les preuves.",
    ],
  },
  {
    numero: 16, critere: 4, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire mobilise et coordonne les différents intervenants internes et/ou externes.",
    niveauAttendu: "Démontrer l'existence d'une coordination des fonctions nécessaires à la prestation.",
    questionsPreuves: [
      "Quelles sont les pratiques pour coordonner les prestations entre les différents intervenants ?",
      "Qui sont les référents pédagogiques ? Référent administratif ? Référent handicap ?",
    ],
  },
  {
    numero: 17, critere: 4, type: "specifique",
    applicableActions: ["OF", "CFA"],
    intitule: "Le prestataire met à disposition du bénéficiaire des ressources pédagogiques et permet à celui-ci de se les approprier.",
    niveauAttendu: "Démontrer que les ressources pédagogiques existent, sont actualisées et disponibles.",
    questionsPreuves: [
      "Comment sont gérées les ressources pédagogiques ?",
      "Quelles dispositions ont été mises en place pour que les acteurs puissent s'approprier les ressources ?",
      "Existe-t-il des supports spécifiques pour les PSH ?",
    ],
  },
  {
    numero: 18, critere: 4, type: "specifique",
    applicableActions: ["CFA"],
    intitule: "Le prestataire dispose d'un personnel dédié à l'appui à la mobilité nationale et internationale.",
    niveauAttendu: "Démontrer l'existence de dispositifs d'appui à la mobilité.",
    questionsPreuves: [
      "Référent mobilité.",
      "Dispositifs d'appui.",
    ],
  },
  // CRITÈRE 5 – FORMATEURS
  {
    numero: 19, critere: 5, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire met à disposition du bénéficiaire des ressources pédagogiques et permet à celui-ci de se les approprier.",
    niveauAttendu: "Démontrer que les ressources pédagogiques existent, sont actualisées et disponibles.",
    questionsPreuves: [
      "Comment sont gérées les ressources pédagogiques ?",
    ],
  },
  {
    numero: 20, critere: 5, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire entretient et développe les compétences de ses salariés, adaptées aux prestations qu'il délivre.",
    niveauAttendu: "Démontrer l'existence d'un plan de développement des compétences pour l'ensemble de son personnel.",
    questionsPreuves: [
      "Quels sont les plans de développement de compétence des salariés ?",
      "Y a-t-il des entretiens individuels ?",
      "Comment les besoins en formations sont-ils relevés ?",
    ],
  },
  {
    numero: 21, critere: 5, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire détermine, mobilise et évalue les compétences des différents intervenants internes et/ou externes, adaptées aux prestations.",
    niveauAttendu: "Démontrer que les compétences requises pour réaliser les prestations ont été définies en amont et sont adaptées. La maîtrise de ces compétences fait par ailleurs l'objet d'une évaluation par le prestataire.",
    questionsPreuves: [
      "Comment est assurée la compétence des formateurs et son adéquation avec les objectifs ?",
      "Quelles sont les logiques de polyvalence ?",
      "Quel est le processus de recrutement des formateurs ?",
      "Pour les sous-traitants, comment sont-ils habilités ?",
    ],
  },
  {
    numero: 22, critere: 5, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire entretient et développe les compétences de ses salariés, adaptées aux prestations qu'il délivre.",
    niveauAttendu: "Démontrer l'existence d'un plan de développement des compétences pour l'ensemble de son personnel.",
    questionsPreuves: [
      "Plans de développement.",
      "Entretiens individuels.",
    ],
  },
  // CRITÈRE 6 – VEILLE
  {
    numero: 23, critere: 6, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire réalise une veille légale et réglementaire sur le champ de la formation professionnelle et en exploite les enseignements.",
    niveauAttendu: "Démontrer la mise en place d'une veille légale et réglementaire et son exploitation.",
    questionsPreuves: [
      "Comment fonctionne la veille réglementaire ?",
      "Comment sont connus les textes applicables ?",
      "À quelle fréquence cette veille est-elle effectuée ?",
      "Comment sont exploités les éléments recueillis ?",
    ],
  },
  {
    numero: 24, critere: 6, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire réalise une veille sur les évolutions des compétences, des métiers et des emplois dans ses secteurs d'intervention et en exploite les enseignements.",
    niveauAttendu: "Démontrer la mise en place d'une veille sur les thèmes de l'indicateur et son impact éventuel sur les prestations.",
    questionsPreuves: [
      "Par quels moyens sont suivies les évolutions dans les secteurs ?",
      "À quelle fréquence cette veille est-elle effectuée ?",
      "Comment cette veille contribue-t-elle à votre offre ?",
    ],
  },
  {
    numero: 25, critere: 6, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire réalise une veille sur les innovations pédagogiques et technologiques permettant une évolution de ses prestations et en exploite les enseignements.",
    niveauAttendu: "Démontrer la mise en place d'une veille sur les thèmes de l'indicateur et son impact éventuel sur les prestations.",
    questionsPreuves: [
      "Quelle veille, quels supports et quels réseaux sont mobilisés pour adapter les outils et méthodes pédagogiques ?",
      "A-t-elle donné lieu à des actions au sein de votre organisme ?",
    ],
  },
  {
    numero: 26, critere: 6, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire mobilise les expertises, outils et réseaux nécessaires pour accueillir, accompagner/former ou orienter les publics en situation de handicap.",
    niveauAttendu: "Démontrer la mise en place d'un réseau de partenaires/experts/acteurs du champ du handicap, mobilisable par les personnels.",
    questionsPreuves: [
      "Quelles dispositions existent au sein de l'organisme pour l'accueil adapté aux PSH ?",
      "Y a-t-il un référent handicap ? Quelles sont ses missions ?",
      "Liste des experts et contacts établis.",
    ],
  },
  // CRITÈRE 7 – AMÉLIORATION CONTINUE
  {
    numero: 27, critere: 7, type: "specifique",
    applicableActions: ["OF", "CFA"],
    intitule: "Lorsque le prestataire fait appel à la sous-traitance ou au portage salarial, il s'assure du respect de la conformité au présent référentiel.",
    niveauAttendu: "Démontrer les dispositions mises en place pour vérifier le respect de la conformité au présent référentiel par le sous-traitant.",
    questionsPreuves: [
      "Comment sont transférées aux sous-traitants les exigences Qualiopi ?",
      "Existe-t-il des contrats pour chaque sous-traitant ?",
      "Existe-t-il une charte qualité ?",
    ],
  },
  {
    numero: 28, critere: 7, type: "specifique",
    applicableActions: ["CFA"],
    intitule: "Le prestataire coopère avec son environnement socio-économique.",
    niveauAttendu: "Démontrer l'existence de coopérations avec l'environnement socio-économique.",
    questionsPreuves: [
      "Partenariats avec les entreprises.",
      "Actions en lien avec le territoire.",
    ],
  },
  {
    numero: 29, critere: 7, type: "specifique",
    applicableActions: ["CFA"],
    intitule: "Le prestataire met en place des actions de conseil et de promotion de la formation par apprentissage.",
    niveauAttendu: "Démontrer les actions mises en place.",
    questionsPreuves: [
      "Actions de promotion.",
      "Conseil auprès des entreprises.",
    ],
  },
  {
    numero: 30, critere: 7, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire recueille les appréciations des parties prenantes : bénéficiaires, financeurs, équipes pédagogiques et entreprises concernées.",
    niveauAttendu: "Démontrer la mise en place d'un système de collecte des appréciations à une fréquence pertinente, incluant des dispositifs de relance et permettant une libre expression.",
    questionsPreuves: [
      "Comment est effectuée la collecte des appréciations pour toutes les parties prenantes ?",
      "Ces enquêtes sont-elles systématiques pour chaque formation ?",
      "Les résultats sont-ils synthétisés ? À quelle fréquence sont-ils analysés ?",
      "Quel est votre système de relance ?",
    ],
  },
  {
    numero: 31, critere: 7, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire met en œuvre des modalités de traitement des difficultés rencontrées par les parties prenantes, des réclamations exprimées par ces dernières, des aléas survenus en cours de prestation.",
    niveauAttendu: "Démontrer la mise en place de modalités de traitement des aléas, difficultés et réclamations.",
    questionsPreuves: [
      "Quel dispositif a été mis en place pour le traitement des aléas, difficultés et réclamations ?",
      "Quels sont les derniers aléas/réclamations relevés ? Comment ont-ils été traités ?",
      "À quelle fréquence sont-ils analysés ?",
    ],
  },
  {
    numero: 32, critere: 7, type: "commun",
    applicableActions: ["OF", "CFA", "CBC", "VAE"],
    intitule: "Le prestataire met en œuvre des mesures d'amélioration à partir de l'analyse des appréciations et des réclamations.",
    niveauAttendu: "Démontrer la mise en place d'une démarche d'amélioration continue.",
    questionsPreuves: [
      "Suite à l'analyse des aléas et réclamations, quels plans d'actions ont été mis en place ?",
      "Comment s'assure-t-on que les actions sont mises en œuvre ?",
      "Sous quelle forme le tableau d'amélioration continue existe-t-il ?",
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
