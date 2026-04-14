/**
 * Contenu pédagogique spécifique à la formation "Réaliser des soins socio-esthétiques" (RS5992).
 * Basé sur le référentiel de compétences officiel et le programme GENIUS FORM.
 */
import { CourseChapter } from "./courseContent";

export function getSocioEsthetiqueChapters(): CourseChapter[] {
  return [
    {
      title: "Module 1 – Analyse de la situation et diagnostic socio-esthétique",
      description: "Comprendre le contexte d'intervention et élaborer un diagnostic adapté (C1)",
      sections: [
        {
          title: "1.1 – Contextes d'intervention en socio-esthétique",
          content: `La socio-esthétique intervient dans des contextes variés auprès de publics fragilisés :\n\n• <strong>Oncologie</strong> : accompagnement des patients atteints de cancer (effets secondaires des traitements : alopécie, modifications cutanées, fatigue)\n• <strong>Gériatrie</strong> : accompagnement des personnes âgées en EHPAD ou à domicile (perte d'autonomie, isolement, vieillissement cutané)\n• <strong>Handicap</strong> : intervention auprès de personnes en situation de handicap physique, psychique ou sensoriel\n• <strong>Insertion sociale et professionnelle</strong> : accompagnement de personnes en précarité, demandeurs d'asile, femmes victimes de violences\n• <strong>Psychiatrie</strong> : travail avec des patients souffrant de troubles psychiques\n\nL'intervenant socio-esthétique doit systématiquement prendre en compte :\n- Le <strong>projet d'établissement</strong> ou associatif\n- Le <strong>projet d'accompagnement</strong> ou de soin de la personne\n- Les recommandations de l'<strong>équipe pluridisciplinaire</strong>`,
        },
        {
          title: "1.2 – Diagnostic socio-esthétique global",
          content: `Le diagnostic socio-esthétique est une analyse multidimensionnelle de la personne :\n\n<strong>Dimension physique</strong>\n• État cutané : type de peau, pathologies, cicatrices, brûlures, escarres\n• État des phanères : cheveux, ongles, pilosité\n• Tensions musculaires, douleurs, mobilité réduite\n• Traitements médicaux en cours et leurs effets secondaires\n\n<strong>Dimension psychologique</strong>\n• Image de soi et estime de soi\n• Schéma corporel (conscience et acceptation du corps)\n• Rapport au toucher (crainte, refus, besoin)\n• État émotionnel (anxiété, dépression, repli sur soi)\n\n<strong>Dimension sociale</strong>\n• Communication verbale et non-verbale\n• Liens sociaux et familiaux\n• Niveau d'autonomie\n• Contexte de vie (institution, domicile, rue)\n\nL'objectif est de définir des <strong>objectifs d'accompagnement socio-esthétique</strong> adaptés et réalistes.`,
        },
        {
          title: "1.3 – Élaboration de la démarche d'intervention",
          content: `La démarche d'intervention socio-esthétique suit un processus structuré :\n\n1. <strong>Recueil d'informations</strong> : dossier de la personne, échanges avec l'équipe, observation\n2. <strong>Analyse de la situation</strong> : identification des problématiques, des ressources et des contraintes\n3. <strong>Définition des objectifs</strong> : objectifs à court et moyen terme, hiérarchisation\n4. <strong>Choix des interventions</strong> : soins individuels, ateliers collectifs, fréquence\n5. <strong>Planification</strong> : calendrier, durée des séances, matériel nécessaire\n\n<em>Exemple</em> : Pour une personne atteinte d'un cancer du sein sous chimiothérapie :\n- Objectif 1 : Restaurer le confort cutané (soins hydratants adaptés)\n- Objectif 2 : Accompagner la perte capillaire (conseil en prothèse capillaire, turbans)\n- Objectif 3 : Revaloriser l'image de soi (atelier maquillage correcteur)\n- Objectif 4 : Favoriser la détente (massages adaptés)`,
        },
      ],
    },
    {
      title: "Module 2 – Protocole de soins et relation d'aide",
      description: "Élaborer un protocole personnalisé et établir la relation de confiance (C2-C3-C4)",
      sections: [
        {
          title: "2.1 – Élaboration du protocole de soins",
          content: `Le protocole de soins socio-esthétiques est un document personnalisé qui décrit :\n\n<strong>Éléments du protocole</strong>\n• Soins retenus et justification (en lien avec le diagnostic)\n• Produits sélectionnés (dermo-cosmétiques adaptés aux peaux fragilisées)\n• Durée et fréquence des séances\n• Précautions et contre-indications\n• Critères d'évaluation de l'efficacité\n\n<strong>Adaptation du protocole</strong>\nLe protocole doit être adapté en fonction de :\n- L'état de santé du jour (fatigue, douleur, moral)\n- L'évolution des traitements médicaux\n- Les retours de la personne et de l'équipe soignante\n- La progression observée\n\n<strong>Contre-indications à connaître</strong>\n- Zones irradiées (radiothérapie en cours)\n- Peau lésée, plaies ouvertes, escarres\n- Infections cutanées\n- Allergies connues aux produits cosmétiques\n- Troubles de la coagulation (pour les massages)\n- Refus de la personne`,
        },
        {
          title: "2.2 – Accueil bienveillant et communication adaptée",
          content: `L'accueil est le fondement de la relation socio-esthétique :\n\n<strong>Communication verbale adaptée</strong>\n• Se présenter clairement (nom, fonction, objet de la visite)\n• Utiliser un langage simple et accessible\n• Adapter le vocabulaire au public (éviter le jargon médical)\n• Reformuler pour vérifier la compréhension\n• Laisser des silences (ne pas combler à tout prix)\n\n<strong>Communication non-verbale</strong>\n• Regard bienveillant (contact visuel sans insistance)\n• Posture ouverte et accueillante\n• Distance respectueuse (proxémie adaptée)\n• Gestes doux et prévenants\n• Expression faciale empathique\n\n<strong>Écoute active</strong>\n• Reformulation : « Si je comprends bien, vous ressentez... »\n• Questions ouvertes : « Comment vous sentez-vous aujourd'hui ? »\n• Validation des émotions : « Je comprends que cela puisse être difficile »\n• Respect du rythme de la personne`,
        },
        {
          title: "2.3 – Consentement éclairé",
          content: `Le consentement est un <strong>droit fondamental</strong> de la personne accompagnée :\n\n<strong>Étapes du recueil du consentement</strong>\n1. Expliquer clairement le soin proposé (en quoi il consiste, ses bénéfices)\n2. Informer sur la durée, les zones du corps concernées\n3. Expliquer les produits utilisés\n4. Demander explicitement l'accord : « Êtes-vous d'accord pour que nous procédions ? »\n5. Vérifier la compréhension\n6. Rappeler le droit de refuser ou d'interrompre à tout moment\n\n<strong>Cas particuliers</strong>\n• Personnes sous tutelle/curatelle : accord du tuteur nécessaire\n• Personnes avec troubles cognitifs : adaptation de l'explication, observation des réactions non-verbales\n• Mineurs : accord des responsables légaux\n• Personnes non francophones : utilisation de supports visuels, recours à un interprète`,
        },
      ],
    },
    {
      title: "Module 3 – Soins d'entretien corporel et d'embellissement",
      description: "Réaliser des soins adaptés aux peaux fragilisées (C5)",
      sections: [
        {
          title: "3.1 – Hygiène et sécurité en socio-esthétique",
          content: `Les règles d'hygiène sont primordiales dans le contexte médico-social :\n\n<strong>Hygiène des mains</strong>\n• Lavage antiseptique avant et après chaque soin\n• Port de gants si nécessaire (plaies, dermatoses)\n• Utilisation de solutions hydro-alcooliques\n\n<strong>Hygiène du matériel</strong>\n• Désinfection systématique du matériel entre chaque personne\n• Utilisation de matériel à usage unique quand possible\n• Stockage hygiénique des produits\n\n<strong>Hygiène de l'espace</strong>\n• Préparation de l'espace de soin (propreté, rangement, ambiance)\n• Température adaptée (confort du patient)\n• Éclairage doux et non agressif\n\n<strong>Ergonomie</strong>\n• Installation confortable de la personne (coussins, cales)\n• Posture du praticien (prévention des TMS)\n• Accessibilité du matériel`,
        },
        {
          title: "3.2 – Soins cutanés adaptés",
          content: `Les soins cutanés en socio-esthétique requièrent des adaptations spécifiques :\n\n<strong>Peaux fragilisées par les traitements médicaux</strong>\n• Chimiothérapie : sécheresse extrême, hypersensibilité, rougeurs diffuses\n  → Produits sans parfum, sans alcool, hypoallergéniques\n  → Hydratation intensive (baumes riches, céramides)\n• Radiothérapie : brûlures localisées, desquamation\n  → Interdiction de toucher les zones irradiées pendant le traitement\n  → Soins apaisants post-traitement (aloe vera, calendula)\n\n<strong>Peaux âgées</strong>\n• Peau amincie, fragile, déshydratée\n• Troubles circulatoires (jambes lourdes, œdèmes)\n  → Gestes très doux, pressions légères\n  → Produits nourrissants et protecteurs\n\n<strong>Beauté des ongles</strong>\n• Ongles fragilisés par les traitements (striés, cassants, dédoublés)\n  → Lime douce, vernis durcisseur, soins cuticules sans coupe\n  → Vernis à base aqueuse si chimiothérapie en cours`,
        },
        {
          title: "3.3 – Produits dermo-cosmétiques spécifiques",
          content: `La sélection des produits est cruciale en socio-esthétique :\n\n<strong>Critères de sélection</strong>\n• Formulation hypoallergénique et testée dermatologiquement\n• Sans parfum ou faiblement parfumé\n• Sans alcool, sans paraben, sans colorant\n• pH physiologique (5,5)\n• Textures adaptées (fluides pour peaux grasses, baumes pour peaux sèches)\n\n<strong>Familles de produits</strong>\n• <strong>Nettoyants</strong> : eaux micellaires douces, laits démaquillants\n• <strong>Hydratants</strong> : crèmes riches aux céramides, acide hyaluronique\n• <strong>Apaisants</strong> : formules au calendula, aloe vera, beurre de karité\n• <strong>Protecteurs</strong> : crèmes barrières, écrans solaires SPF50+\n• <strong>Maquillage</strong> : produits correcteurs, fonds de teint couvrants hypoallergéniques\n\n<strong>Précautions</strong>\n• Toujours vérifier la date de péremption\n• Réaliser un test cutané 24h avant si doute allergique\n• Ne jamais utiliser de produits personnels du praticien\n• Traçabilité des produits utilisés (lot, date)`,
        },
      ],
    },
    {
      title: "Module 4 – Massages de bien-être adaptés",
      description: "Pratiquer des massages contenants et relaxants pour publics fragilisés (C6)",
      sections: [
        {
          title: "4.1 – Principes du massage socio-esthétique",
          content: `Le massage socio-esthétique se distingue du massage esthétique classique :\n\n<strong>Objectifs spécifiques</strong>\n• Apporter détente et relaxation\n• Restaurer le rapport au toucher\n• Diminuer les tensions et le stress\n• Favoriser la conscience corporelle\n• Créer un moment de bien-être et de répit\n\n<strong>Principes fondamentaux</strong>\n• <strong>Contenance</strong> : les gestes enveloppent et rassurent\n• <strong>Adaptation</strong> : intensité, rythme et zones modulés en permanence\n• <strong>Respect</strong> : de la pudeur, des « limitations corporelles », du refus\n• <strong>Observation</strong> : vigilance constante aux réactions physiques et émotionnelles\n\n<strong>Contre-indications du massage</strong>\n• Thrombose veineuse, phlébite\n• Infections cutanées\n• Fractures non consolidées\n• Zones tumorales actives\n• Fièvre\n• Refus de la personne`,
        },
        {
          title: "4.2 – Techniques de massage adaptées",
          content: `<strong>Gestuelle de base</strong>\n• Effleurages : gestes lents, superficiels, enveloppants\n• Pressions glissées : modérées, en direction du cœur\n• Pétrissages légers : uniquement si la personne le tolère\n• Mobilisations douces : rotations articulaires passives\n• Percussions : très rarement utilisées (réservées aux personnes résistantes)\n\n<strong>Adaptations par public</strong>\n\n<em>Patient en oncologie</em>\n• Pression très légère (grade 1-2 sur 5)\n• Éviter les zones de cathéter, de port-à-cath, d'injection\n• Séances courtes (20-30 min max)\n• Huiles neutres sans huile essentielle\n\n<em>Personne âgée en EHPAD</em>\n• Pression modérée mais enveloppante\n• Attention aux ecchymoses (peau amincie)\n• Massage des mains et des pieds très apprécié\n• Durée adaptée à la fatigue (15-45 min)\n\n<em>Personne en situation de handicap</em>\n• Adaptation au fauteuil si nécessaire\n• Communication par le toucher si trouble de la parole\n• Respect du rythme propre de la personne`,
        },
        {
          title: "4.3 – Installation et environnement",
          content: `<strong>Préparation de l'espace</strong>\n• Température : 22-24°C (les personnes fragilisées se refroidissent vite)\n• Éclairage : tamisé, indirect\n• Musique : douce, sans paroles (ou silence si préféré)\n• Draps et serviettes : propres, doux, préchauffés si possible\n\n<strong>Installation de la personne</strong>\n• Position adaptée à la pathologie (décubitus dorsal, latéral, assis)\n• Cales et coussins pour le confort\n• Couverture des zones non massées\n• Respect de la pudeur (serviettes de protection)\n\n<strong>Produits de massage</strong>\n• Huiles végétales neutres : amande douce, jojoba, abricot\n• Éviter les huiles essentielles (risque allergique, interaction médicamenteuse)\n• Crèmes de massage hypoallergéniques\n• Réchauffer le produit dans les mains avant application`,
        },
      ],
    },
    {
      title: "Module 5 – Conseil en image et auto-soin",
      description: "Accompagner la personne dans la revalorisation de son image (C7-C8)",
      sections: [
        {
          title: "5.1 – Maquillage correcteur",
          content: `Le maquillage correcteur est un outil puissant de revalorisation de l'image de soi :\n\n<strong>Corrections courantes en socio-esthétique</strong>\n• Cernes et poches (fatigue liée aux traitements) : correcteur orangé + anti-cernes\n• Rougeurs diffuses : base verte + fond de teint couvrant\n• Cicatrices : technique du camouflage (produits couvrants type Dermacolor, Dermablend)\n• Sourcils absents (chimiothérapie) : reconstruction au crayon/poudre\n• Teint terne : blush léger, enlumineur discret\n\n<strong>Méthode de conseil</strong>\n1. Observer le visage dans sa globalité (morphologie, teint, particularités)\n2. Identifier les attentes de la personne (pas ce que NOUS pensons qu'il faut corriger)\n3. Proposer un résultat naturel et réaliste\n4. Montrer les gestes en expliquant chaque étape\n5. Faire reproduire par la personne (auto-maquillage)\n6. Valider avec la personne : « Vous sentez-vous bien comme cela ? »`,
        },
        {
          title: "5.2 – Prothèses et accessoires",
          content: `<strong>Prothèses capillaires</strong>\n• Perruques : essayage, conseil sur la coupe et la couleur (fidèle à l'image d'avant ou nouvelle image ?)\n• Turbans et foulards : techniques de nouage, association avec accessoires\n• Casquettes et chapeaux : alternatives décontractées\n• Prise en charge sécurité sociale (prescription médicale nécessaire)\n\n<strong>Prothèses mammaires externes</strong>\n• Conseil sur le choix (forme, poids, matière)\n• Adaptation aux sous-vêtements et maillots de bain\n• Orientation vers les distributeurs agréés\n\n<strong>Conseil en image globale</strong>\n• Couleurs flatteuses selon le teint (colorimétrie adaptée)\n• Vêtements adaptés à la morphologie modifiée\n• Accessoires pour détourner le regard (bijoux, écharpes)\n• Posture et attitude : se tenir droit, sourire, regarder dans les yeux`,
        },
        {
          title: "5.3 – Transmission de l'auto-soin",
          content: `L'auto-soin est l'objectif ultime de la socio-esthétique : rendre la personne autonome.\n\n<strong>Principes pédagogiques</strong>\n• Montrer d'abord, puis guider la personne\n• Décomposer les gestes en étapes simples\n• Utiliser des supports visuels (fiches illustrées, photos)\n• Répéter autant que nécessaire (patience)\n• Vérifier l'appropriation (la personne refait seule)\n\n<strong>Auto-soins à enseigner</strong>\n• Auto-hydratation quotidienne du visage et du corps\n• Auto-massage des mains et des pieds\n• Auto-maquillage correcteur basique (3-4 produits max)\n• Soins des ongles simples\n• Routine capillaire adaptée\n\n<strong>Outils de suivi</strong>\n• Fiche de soins personnalisée (gestes + produits)\n• Kit de produits adaptés (mini-formats)\n• Photos avant/après (avec accord de la personne)\n• Rendez-vous de suivi à planifier`,
        },
      ],
    },
    {
      title: "Module 6 – Évaluation, transmission et ateliers collectifs",
      description: "Évaluer les interventions, transmettre à l'équipe et concevoir des ateliers (C9-C10-C11)",
      sections: [
        {
          title: "6.1 – Évaluation de l'intervention socio-esthétique",
          content: `<strong>Critères d'évaluation</strong>\n• Bien-être ressenti par la personne (échelle visuelle analogique, questionnaire simple)\n• Observation pendant le soin (détente, sourire, communication)\n• Retour verbal de la personne : « Comment vous sentez-vous après le soin ? »\n• Évolution sur plusieurs séances (amélioration de l'image de soi, autonomie)\n\n<strong>Outils d'évaluation</strong>\n• Grille d'observation standardisée\n• Questionnaire de satisfaction simplifié\n• Journal de bord du praticien\n• Photos avec consentement (évolution cutanée, apprentissage maquillage)\n\n<strong>Identification des améliorations</strong>\n• Ajuster le protocole si les objectifs ne sont pas atteints\n• Modifier les produits si réaction cutanée\n• Changer d'approche si la personne est réticente\n• Proposer d'autres soins si les besoins ont évolué`,
        },
        {
          title: "6.2 – Transmission à l'équipe pluridisciplinaire",
          content: `La transmission est essentielle dans le cadre institutionnel :\n\n<strong>Informations à transmettre</strong>\n• Soins réalisés, produits utilisés\n• Réactions observées (physiques, émotionnelles)\n• Progrès constatés (autonomie, image de soi, communication)\n• Difficultés rencontrées (refus, douleur, réactions cutanées)\n• Recommandations pour l'équipe (hydratation entre les séances, etc.)\n\n<strong>Supports de transmission</strong>\n• Compte rendu écrit dans le dossier de la personne\n• Transmission orale lors des réunions d'équipe\n• Fiche de suivi socio-esthétique dédiée\n\n<strong>Interlocuteurs</strong>\n• Médecins et infirmiers (aspects médicaux, contre-indications)\n• Aides-soignants (relais pour l'hygiène quotidienne)\n• Psychologues (impact émotionnel des soins)\n• Animateurs (coordination des ateliers)\n• Direction (bilan d'activité, projets)`,
        },
        {
          title: "6.3 – Conception et animation d'ateliers collectifs",
          content: `Les ateliers collectifs sont un vecteur de lien social et d'autonomie :\n\n<strong>Étapes de conception</strong>\n1. <strong>Identification du public</strong> : pathologies, capacités, attentes\n2. <strong>Choix de la thématique</strong> : mise en beauté, auto-soin, relaxation, conseil en image\n3. <strong>Définition des objectifs</strong> : créer du lien ? développer l'autonomie ? détente ?\n4. <strong>Planification du déroulé</strong> : accueil, présentation, démonstration, pratique, échange, clôture\n5. <strong>Préparation du matériel</strong> : produits individuels, miroirs, serviettes, fiches\n\n<strong>Animation</strong>\n• Groupe de 4 à 8 personnes maximum\n• Durée : 1h à 1h30\n• Créer un cadre sécurisant (règles de confidentialité, bienveillance)\n• Adapter en temps réel (fatigue, émotions)\n• Favoriser les échanges entre participants\n\n<strong>Exemples d'ateliers</strong>\n• « Prendre soin de ses mains » (soin + vernis + massage)\n• « Mise en beauté express » (auto-maquillage en 5 minutes)\n• « Relaxation et bien-être » (auto-massage, respirations)\n• « Bien dans sa peau » (soins hydratants, conseils personnalisés)`,
        },
      ],
    },
  ];
}

export const YOUTUBE_SOCIO_ESTHETIQUE = [
  { title: "La socio-esthétique : un métier de cœur", url: "https://www.youtube.com/watch?v=example1", description: "Présentation du métier de socio-esthéticienne et témoignages" },
  { title: "Maquillage correcteur en oncologie", url: "https://www.youtube.com/watch?v=example2", description: "Techniques de maquillage adapté pendant les traitements anti-cancéreux" },
  { title: "Massage adapté en EHPAD", url: "https://www.youtube.com/watch?v=example3", description: "Démonstration de massage de bien-être pour les résidents âgés" },
  { title: "Protocole d'hygiène en milieu hospitalier", url: "https://www.youtube.com/watch?v=example4", description: "Les règles d'hygiène spécifiques au soin esthétique en établissement de santé" },
  { title: "Atelier socio-esthétique : créer du lien social", url: "https://www.youtube.com/watch?v=example5", description: "Comment concevoir et animer un atelier bien-être en structure médico-sociale" },
];
