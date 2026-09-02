/**
 * Support de cours — CQP Opérateur vitrage (RNCP36223), 90 h.
 * Contenu intégralement statique (aucun appel réseau).
 */
import type { CourseChapter } from "./courseContent";

export function getVitrageChapters(): CourseChapter[] {
  return [
    {
      title: "Chapitre 1 — Le métier d'opérateur vitrage et le CQP",
      description: "Positionnement du métier, contenu du CQP Opérateur vitrage (RNCP36223) et organisation du poste de travail.",
      sections: [
        {
          title: "1.1 Le métier et son environnement",
          content: `<p>L'opérateur vitrage intervient sur l'ensemble des vitrages d'un véhicule léger : pare-brise, lunette arrière, glaces latérales, custodes, toits vitrés. Son activité couvre trois familles d'opérations : le <strong>remplacement d'un vitrage collé</strong>, le <strong>remplacement d'un vitrage amovible</strong> et la <strong>réparation d'un impact</strong>. Il exerce en centre spécialisé, en carrosserie, en concession ou en intervention mobile chez le client.</p>
<p>Le métier a profondément changé en dix ans. Le pare-brise n'est plus une simple protection contre le vent : il est <strong>collé structurellement</strong> à la caisse, participe à sa rigidité, sert d'appui à l'airbag passager et supporte désormais les capteurs des systèmes d'aide à la conduite. Une pose mal exécutée n'est pas un défaut esthétique : c'est un défaut de sécurité.</p>
<p>Les interlocuteurs de l'opérateur sont le client, l'assureur (garantie bris de glace), le constructeur (procédures) et le fabricant de colle (temps de mise en œuvre). Chacun impose ses règles, et l'opérateur en est le garant sur le terrain.</p>`,
        },
        {
          title: "1.2 Le CQP Opérateur vitrage (RNCP36223)",
          content: `<p>Le CQP Opérateur vitrage est un certificat de qualification professionnelle de la <strong>branche des services de l'automobile</strong>, délivré par l'ANFA et enregistré au Répertoire national des certifications professionnelles sous le code <strong>RNCP36223</strong> (niveau 3).</p>
<p>Il est structuré en <strong>trois blocs de compétences</strong> :</p>
<ul>
<li><strong>BC01 — Remplacement des vitrages</strong> : dépose et repose des vitrages inamovibles collés et des vitrages amovibles, préparation, collage, contrôle.</li>
<li><strong>BC02 — Réparation d'un impact</strong> : diagnostic de réparabilité et réparation à la résine.</li>
<li><strong>BC03 — Accueil de la clientèle et relation de service</strong> : recueil du besoin, restitution du véhicule, dossier assurance, proposition de services.</li>
</ul>
<p>Le CQP est reconnu par la <strong>Convention collective nationale des services de l'automobile</strong> et ouvre l'accès à l'échelon 3 de la grille de classification. Il constitue la première marche d'un parcours qui peut se poursuivre vers le CQP Technicien vitrage puis vers les spécialisations ADAS.</p>`,
        },
        {
          title: "1.3 Organisation du poste de travail (5S)",
          content: `<p>La qualité d'une pose se joue avant le premier geste. L'organisation du poste repose sur la méthode <strong>5S</strong> :</p>
<ul>
<li><strong>Supprimer</strong> l'inutile de la zone d'intervention (cartons, pièces déposées, chiffons usagés).</li>
<li><strong>Situer</strong> l'outillage : ventouses, lames, pistolet, cales et primaire à portée de main, dans le même ordre à chaque intervention.</li>
<li><strong>Scintiller</strong> : sol propre et dégagé, aucun éclat de verre au sol, éclairage suffisant pour contrôler un cordon.</li>
<li><strong>Standardiser</strong> : une gamme de pose écrite, la même pour tous les opérateurs de l'atelier.</li>
<li><strong>Suivre</strong> : contrôle du respect de la gamme et de la traçabilité sur l'ordre de réparation.</li>
</ul>
<p>Le chevalet de dépose est positionné <em>avant</em> l'extraction du vitrage : on ne cherche jamais un support avec un pare-brise dans les mains.</p>`,
        },
        {
          title: "1.4 Traçabilité de l'intervention",
          content: `<p>Toute intervention laisse une trace écrite. Sur l'ordre de réparation figurent au minimum : l'identification du véhicule (VIN, immatriculation, kilométrage), la <strong>référence du vitrage posé</strong>, le <strong>numéro de lot et la date de péremption de la colle</strong>, les conditions de température et d'hygrométrie, l'heure de fin de pose, le <strong>temps de sécurité au décollage</strong> applicable et l'heure de restitution annoncée, le <strong>procès-verbal de calibrage ADAS</strong> le cas échéant, ainsi que les consignes remises au client.</p>
<p>Cette traçabilité protège trois personnes : le client (preuve de la conformité), l'atelier (défense en cas de litige) et l'opérateur (démonstration du respect des procédures).</p>`,
        },
      ],
    },
    {
      title: "Chapitre 2 — Technologie du vitrage automobile",
      description: "Verre feuilleté et trempé, fonctions intégrées, marquage et identification de la référence.",
      sections: [
        {
          title: "2.1 Verre feuilleté et verre trempé",
          content: `<p>Le <strong>verre feuilleté</strong> est constitué de deux feuilles de verre assemblées par un film intercalaire en <strong>PVB</strong> (polyvinyl butyral). En cas de choc, le verre se fissure mais les morceaux restent collés au film : la protection des occupants est assurée et le vitrage reste en place. C'est pour cette raison que le pare-brise est obligatoirement feuilleté, et que la réparation à la résine est possible : on répare la couche externe, le film restant intact.</p>
<p>Le <strong>verre trempé</strong> subit un traitement thermique qui multiplie sa résistance. En cas de casse, il se fragmente en petits morceaux peu coupants. Il est utilisé traditionnellement pour les glaces latérales et la lunette arrière. Un verre trempé ne se répare jamais et ne se recoupe jamais après trempe.</p>`,
        },
        {
          title: "2.2 Fonctions intégrées au vitrage",
          content: `<p>Un pare-brise moderne intègre de multiples fonctions, qui déterminent sa référence et son prix :</p>
<ul>
<li><strong>Athermique</strong> : couche réfléchissant le rayonnement infrarouge, limitant l'échauffement de l'habitacle.</li>
<li><strong>Acoustique</strong> : film PVB spécifique atténuant les bruits aérodynamiques.</li>
<li><strong>Chauffant</strong> : résistances intégrées pour le dégivrage rapide ou zone chauffante en pied d'essuie-glaces.</li>
<li><strong>Zone capteurs</strong> : sérigraphie et fenêtre optique dédiées à la caméra ADAS et au capteur de pluie/luminosité.</li>
<li><strong>Head-up display</strong> : film spécifique évitant la double image de l'affichage tête haute.</li>
<li><strong>Antenne intégrée</strong>, <strong>détecteur d'humidité</strong>, <strong>vitrage teinté en partie haute</strong>.</li>
</ul>
<p>Poser un vitrage sans la bonne fonction, c'est priver le client d'un équipement qu'il a payé et, dans le cas d'un head-up display ou d'une caméra, rendre le système inexploitable.</p>`,
        },
        {
          title: "2.3 Marquage et homologation",
          content: `<p>Chaque vitrage porte un marquage sérigraphié comportant la marque du fabricant, le type de vitrage, la marque d'homologation internationale (règlement ONU R43 pour les vitrages de sécurité), le numéro d'homologation et divers pictogrammes propres au fabricant.</p>
<p>Lire ce marquage permet de vérifier que la pièce déposée et la pièce neuve appartiennent bien au même type et que le vitrage est homologué pour un usage routier. Un vitrage non homologué expose le véhicule à une contre-visite au contrôle technique et engage la responsabilité de l'atelier.</p>`,
        },
        {
          title: "2.4 Identifier la bonne référence à partir du VIN",
          content: `<p>Le <strong>VIN</strong> (numéro d'identification du véhicule, 17 caractères) est le point de départ de toute commande. Il permet de retrouver la version exacte, la date de fabrication et surtout les options montées en usine.</p>
<p>Méthode : relever le VIN sur le véhicule (bas de pare-brise, montant de porte, carte grise), interroger le catalogue fournisseur, puis <strong>confirmer visuellement les options sur le véhicule</strong> : présence d'une caméra derrière le rétroviseur, d'un capteur de pluie, d'une zone chauffante, d'un affichage tête haute. Le catalogue peut proposer plusieurs références pour un même VIN : c'est le contrôle visuel qui tranche.</p>
<p>À réception, contrôler la pièce <strong>avant de déposer l'ancienne</strong> : référence, absence de rayure ou d'éclat, présence des accessoires (support de rétroviseur, joint périphérique, sérigraphie de la zone capteur). Découvrir une erreur de référence après dépose immobilise le véhicule et détruit la relation client.</p>`,
        },
      ],
    },
    {
      title: "Chapitre 3 — Outillage, produits et systèmes de collage",
      description: "Outils de dépose, chimie du collage polyuréthane, temps de flash-off et temps de sécurité au décollage.",
      sections: [
        {
          title: "3.1 L'outillage de dépose",
          content: `<p><strong>Système à fil</strong> (fil acier ou fibre) : découpe le cordon par sciage. Peu agressif pour la carrosserie et la planche de bord, adapté aux véhicules récents et aux interventions mobiles. Nécessite un point d'entrée et une bonne coordination.</p>
<p><strong>Lame oscillante</strong> : rapide sur les cordons durs et épais, mais demande une maîtrise du guidage pour ne pas rayer la tôle ni entamer la planche de bord.</p>
<p><strong>Couteau à cordon</strong> : outil manuel, précis, utile en zones d'accès difficile.</p>
<p><strong>Ventouses</strong> simples pour le maintien, <strong>doubles</strong> pour la manutention à deux. Toujours contrôler la tenue de la ventouse (surface propre et sèche) avant de soulever.</p>
<p><strong>Pistolet à cartouche</strong> pneumatique ou électrique : indispensable pour maintenir un débit régulier sur tout le pourtour et obtenir un cordon homogène.</p>`,
        },
        {
          title: "3.2 La chaîne des produits",
          content: `<p>Le collage d'un pare-brise est une chaîne : chaque produit prépare le suivant, et sauter une étape compromet l'ensemble.</p>
<ol>
<li><strong>Nettoyant</strong> : élimine poussières, graisses et résidus. Toujours en un seul sens, avec un chiffon propre et non pelucheux.</li>
<li><strong>Activateur</strong> : prépare chimiquement la surface (verre nu, plastique) à recevoir le primaire ou la colle.</li>
<li><strong>Primaire</strong> : appliqué sur la sérigraphie du vitrage neuf, il assure l'adhérence et protège le cordon des UV. Le primaire anticorrosion, lui, traite les zones de tôle mise à nu.</li>
<li><strong>Colle polyuréthane monocomposant</strong> : polymérise avec l'humidité de l'air. C'est elle qui reprend les efforts structurels.</li>
</ol>
<p>Chaque produit possède une <strong>date de péremption</strong> et un délai d'utilisation après ouverture. Une cartouche périmée ne polymérise pas correctement : elle doit être écartée, sans exception.</p>`,
        },
        {
          title: "3.3 Temps de flash-off",
          content: `<p>Le <strong>temps de flash-off</strong> est le délai à respecter entre l'application d'un produit (activateur, primaire) et l'étape suivante. Il permet l'évaporation des solvants et la formation de la couche d'accroche.</p>
<p>Trop court : la colle est appliquée sur un primaire encore humide, l'adhérence est compromise. Trop long : dans certains cas le primaire est « dépassé » et il faut recommencer la préparation.</p>
<p>La valeur exacte figure sur la <strong>fiche technique du produit utilisé</strong> et varie selon la température. Elle ne se devine pas et ne se transmet pas oralement d'un collègue à l'autre.</p>`,
        },
        {
          title: "3.4 Le temps de sécurité au décollage (SDAT)",
          content: `<p>Le <strong>temps de sécurité au décollage</strong> est le délai minimal entre la fin de la pose et la remise en circulation du véhicule. Il est fixé par le <strong>fabricant de la colle</strong>, jamais par l'atelier et jamais par le client.</p>
<p>Il dépend de trois facteurs : le produit utilisé, la <strong>température</strong> (de l'air, du support et de la cartouche) et l'<strong>hygrométrie</strong> (la colle polyuréthane monocomposant polymérise grâce à l'humidité de l'air). Par temps froid et sec, le délai s'allonge fortement.</p>
<p>Justification technique : avant polymérisation suffisante, le collage n'a pas atteint la résistance nécessaire pour maintenir le pare-brise en cas de choc, alors même qu'il participe à la rigidité de la caisse et sert d'appui au déploiement de l'airbag passager.</p>
<p><strong>Pratique professionnelle</strong> : lire la fiche technique, relever température et hygrométrie réelles, inscrire le SDAT et l'heure de restitution sur l'ordre de réparation, et annoncer cette heure au client <em>dès le devis</em>. Aucune dérogation, même sur insistance.</p>`,
        },
      ],
    },
    {
      title: "Chapitre 4 — Dépose et repose d'un vitrage collé",
      description: "Gamme complète de l'intervention, de la protection du véhicule à l'essai d'étanchéité.",
      sections: [
        {
          title: "4.1 Préparation et dépose des périphériques",
          content: `<p>Protection systématique : housses de sièges, tapis de sol, bâche sur la planche de bord et sur les ailes. Un client juge d'abord la propreté de sa voiture.</p>
<p>Dépose des périphériques : essuie-glaces (repérer la position des bras <strong>avant</strong> dépose), grille d'auvent, baguettes et garnitures, rétroviseur intérieur et son cache. Les connecteurs de la caméra et du capteur de pluie se débranchent en agissant sur le verrou, jamais en tirant sur le faisceau.</p>
<p>Les agrafes cassées se remplacent : une garniture qui vibre après intervention est un défaut visible pour le client.</p>`,
        },
        {
          title: "4.2 Découpe et extraction",
          content: `<p>Choix de la méthode selon l'accès, l'épaisseur du cordon et la fragilité des garnitures. Point d'entrée créé au poinçon ou à la lame, puis découpe régulière sur tout le pourtour en protégeant la tôle et la planche de bord.</p>
<p>Extraction <strong>à deux</strong>, à la ventouse double, mouvement lent et synchronisé, dépose immédiate sur le chevalet préparé. En intervention mobile seul, l'usage d'un système de dépose spécifique est indispensable : porter un pare-brise seul est la première cause de casse et de lombalgie du métier.</p>`,
        },
        {
          title: "4.3 Préparation de la baie et du vitrage",
          content: `<p><strong>Ravoir</strong> : raser le cordon en laissant un résidu régulier de <strong>1 à 2 mm</strong>. Ce résidu est le meilleur support d'accroche pour la colle neuve, qui adhère mieux sur elle-même que sur la peinture. On ne recherche jamais la mise à nu ; si le cordon résiste, on change de lame plutôt que d'augmenter la pression.</p>
<p><strong>Contrôle de la corrosion</strong> : toute trace de rouille est traitée avant pose (élimination mécanique, dégraissage, primaire anticorrosion, temps de séchage respecté). Coller sur une tôle corrodée, c'est programmer un décollement et une infiltration.</p>
<p><strong>Préparation du vitrage neuf</strong> : nettoyage, activateur, primaire sur la sérigraphie, respect du flash-off. On ne touche jamais la zone encollée avec les doigts après application du primaire.</p>`,
        },
        {
          title: "4.4 Encollage, pose et contrôles",
          content: `<p><strong>Cordon</strong> : section triangulaire, hauteur et largeur régulières, déposé <strong>en un seul tenant</strong>, avec une jonction propre de fin de cordon. Un cordon interrompu crée un point d'entrée d'eau et un point faible structurel.</p>
<p><strong>Pose</strong> : positionnement sur les cales de centrage, descente maîtrisée à deux, puis pression uniforme répartie sur tout le pourtour. Contrôle immédiat des jeux et de l'affleurement : après quelques minutes, la correction devient impossible.</p>
<p><strong>Contrôles finaux</strong> : remontage complet, reconnexion des capteurs, calibrage ADAS si nécessaire, essai d'étanchéité à l'eau, examen visuel du cordon apparent, nettoyage intérieur et extérieur, renseignement de l'ordre de réparation.</p>
<p><strong>Consignes remises au client</strong> : respecter le SDAT, ne pas laver au jet haute pression pendant 48 heures, entrouvrir une vitre lors de la fermeture des portes les premières heures, ne pas retirer les adhésifs de maintien avant 24 heures.</p>`,
        },
      ],
    },
    {
      title: "Chapitre 5 — Vitrages amovibles et lève-vitres",
      description: "Glaces latérales, custodes, lunettes, mécanismes de lève-vitre et remise en service.",
      sections: [
        {
          title: "5.1 Dépose de la garniture de porte",
          content: `<p>Repérer et retirer les vis (souvent masquées sous des caches ou dans la poignée), déclipser la garniture à l'aide d'outils plastiques pour ne pas marquer les panneaux, débrancher les connecteurs des commandes et du haut-parleur.</p>
<p>Le <strong>pare-vapeur</strong> (film étanche collé au mastic butyle) se décolle avec précaution : il doit être reposé en état, c'est lui qui empêche l'eau qui circule dans la porte d'atteindre l'habitacle. Un pare-vapeur mal reposé se traduit par des moquettes humides et une odeur persistante.</p>`,
        },
        {
          title: "5.2 Remplacement de la glace",
          content: `<p><strong>Aspiration complète</strong> du caisson de porte et des coulisses : un seul éclat de verre trempé restant raye la glace neuve dès la première descente. Cette étape n'est jamais optionnelle.</p>
<p>Mise en place de la glace dans les pinces du lève-vitre, positionnement et serrage au couple préconisé. Vérification du bon engagement de la glace dans les coulisses avant tout essai motorisé.</p>`,
        },
        {
          title: "5.3 Réglages et réinitialisation",
          content: `<p>Réglages à effectuer : <strong>parallélisme</strong> de la glace dans les coulisses, <strong>affleurement</strong> par rapport au joint et à la carrosserie, <strong>butées</strong> de course haute et basse.</p>
<p><strong>Réinitialisation de l'anti-pincement</strong> : après débranchement ou remplacement, le calculateur a perdu ses points de référence. La procédure classique consiste à effectuer une montée complète maintenue quelques secondes, puis une descente complète maintenue ; certains constructeurs imposent un apprentissage par outil de diagnostic. Sans réinitialisation, la vitre redescend seule ou le mode impulsion ne fonctionne plus.</p>`,
        },
        {
          title: "5.4 Lunette arrière et custodes",
          content: `<p>La lunette arrière est fréquemment <strong>chauffante</strong> : les cosses d'alimentation du réseau chauffant doivent être débranchées avec précaution et reconnectées après pose, puis testées. Une lunette peut également intégrer une antenne.</p>
<p>Les custodes et vitrages latéraux fixes sont souvent collés selon la même logique que le pare-brise, avec le même exigence de préparation. Après toute intervention, essuyer le réseau chauffant uniquement dans le sens des pistes : un frottement transversal peut les couper.</p>`,
        },
      ],
    },
    {
      title: "Chapitre 6 — Systèmes d'aide à la conduite (ADAS)",
      description: "Repérage des équipements, calibrage statique et dynamique, responsabilités et traçabilité.",
      sections: [
        {
          title: "6.1 Quels systèmes dépendent du pare-brise ?",
          content: `<p>La caméra frontale placée derrière le rétroviseur intérieur alimente plusieurs fonctions : <strong>freinage d'urgence automatique</strong>, <strong>alerte et maintien dans la voie</strong>, <strong>reconnaissance des panneaux</strong>, <strong>commutation automatique des feux</strong>, parfois <strong>régulateur adaptatif</strong> en fusion avec un radar.</p>
<p>Sont également liés au vitrage : le capteur de pluie et de luminosité, le détecteur d'humidité et, sur certains modèles, l'affichage tête haute.</p>`,
        },
        {
          title: "6.2 Pourquoi le calibrage est obligatoire",
          content: `<p>Le remplacement du pare-brise modifie de quelques dixièmes de millimètre la position et l'inclinaison de la caméra. À plusieurs dizaines de mètres, cet écart devient une erreur de plusieurs mètres sur la position perçue d'un obstacle ou d'un marquage.</p>
<p>Conséquences d'une absence de calibrage : systèmes inopérants au moment où ils seraient utiles, déclenchements intempestifs (freinage d'urgence sans raison), voyants de défaut, <strong>responsabilité de l'atelier engagée</strong> en cas de sinistre et refus possible de prise en charge par l'assureur.</p>`,
        },
        {
          title: "6.3 Calibrage statique et dynamique",
          content: `<p><strong>Calibrage statique</strong> : réalisé en atelier, sur une aire plane et dégagée, avec des mires positionnées à des distances et hauteurs imposées par le constructeur, véhicule à hauteur de caisse et pression de pneus conformes, outil de diagnostic connecté.</p>
<p><strong>Calibrage dynamique</strong> : réalisé sur route, à vitesse imposée, sur un trajet avec marquage au sol lisible et luminosité suffisante, avec l'outil de diagnostic en fonctionnement.</p>
<p>Certains constructeurs imposent les deux, dans un ordre précis. La procédure applicable est celle du constructeur du véhicule, consultable dans la documentation technique : elle prime sur toute habitude d'atelier.</p>`,
        },
        {
          title: "6.4 Le procès-verbal de calibrage",
          content: `<p>Le calibrage se prouve. Le procès-verbal mentionne : identification du véhicule (VIN, immatriculation, kilométrage), date et heure, référence du vitrage posé, type de calibrage réalisé, outil et version logicielle utilisés, résultat « calibrage validé », nom et visa du technicien.</p>
<p>Un exemplaire est remis au client avec la facture, un exemplaire est archivé au dossier de l'atelier. C'est cette pièce qui protège l'entreprise en cas de contestation ultérieure.</p>`,
        },
      ],
    },
    {
      title: "Chapitre 7 — Diagnostic et réparation d'un impact",
      description: "Typologie des dommages, critères cumulatifs de réparabilité, cycle complet de réparation à la résine.",
      sections: [
        {
          title: "7.1 Typologie des dommages",
          content: `<p>On distingue notamment l'<strong>étoile</strong> (branches rayonnantes autour du point d'impact), l'<strong>œil de bœuf</strong> (cône circulaire), la <strong>combinaison</strong> des deux, la <strong>ligne de fissure</strong> et la <strong>fissure longue</strong>.</p>
<p>Un impact évolue : les variations de température (dégivrage brutal, chauffage sur pare-brise gelé, soleil direct), les vibrations et les passages sur nids-de-poule font progresser les branches. C'est pourquoi une réparation rapide vaut mieux qu'un remplacement tardif : elle stoppe l'évolution.</p>`,
        },
        {
          title: "7.2 Les critères de réparabilité",
          content: `<p>Les critères sont <strong>cumulatifs</strong> : un seul critère d'exclusion impose le remplacement.</p>
<ol>
<li>Taille du dommage dans les limites admises par la procédure de réparation.</li>
<li>Localisation <strong>hors du champ de vision direct du conducteur</strong>.</li>
<li>Distance suffisante au bord du vitrage (zone de collage, contraintes maximales).</li>
<li>Absence de fissure ramifiée ou évolutive.</li>
<li>Hors zone de la caméra ADAS et des capteurs.</li>
<li>Film PVB intact, face interne non endommagée.</li>
<li>Impact propre, sec, non déjà réparé et pas trop ancien.</li>
</ol>
<p><strong>Règle du doute</strong> : dans le doute, on ne répare pas. Une réparation qui repart en fissure coûte plus cher à l'atelier, en image comme en argent, qu'un remplacement assumé dès le départ.</p>
<p>Méthode : nettoyer, mesurer au gabarit, observer les deux faces en lumière rasante, photographier avec un repère de taille, décider, tracer la décision et son motif sur l'ordre de réparation.</p>`,
        },
        {
          title: "7.3 Le cycle de réparation à la résine",
          content: `<ol>
<li>Conditions : vitrage sec, à température modérée, jamais en plein soleil ni gelé. Sécher l'impact si nécessaire.</li>
<li>Nettoyage de la zone et <strong>ouverture du point d'impact</strong> pour créer le passage de la résine.</li>
<li>Mise en place de l'injecteur, <strong>parfaitement centré</strong>, sur son support à ventouses.</li>
<li><strong>Cycles alternés vide / pression</strong> : le vide extrait l'air emprisonné dans les branches, la pression y fait pénétrer la résine.</li>
<li><strong>Critère d'arrêt</strong> : la disparition complète de l'effet miroir dans toutes les branches. C'est le seul critère objectif.</li>
<li>Polymérisation à la lampe UV.</li>
<li>Résine de finition en goutte, recouverte du film, nouveau passage UV.</li>
<li>Arasage à la lame maintenue bien à plat, puis polissage.</li>
<li>Contrôle qualité des deux faces en lumière rasante, photographies avant / après.</li>
</ol>`,
        },
        {
          title: "7.4 Informer le client sur le résultat",
          content: `<p>Une réparation réussie <strong>stoppe l'évolution</strong> de la fissure et <strong>restaure la résistance</strong> du vitrage, mais elle laisse une <strong>trace résiduelle visible</strong>. Le résultat esthétique n'est jamais garanti à 100 % : la transparence retrouvée dépend de la nature du dommage et de son ancienneté.</p>
<p>Cette information est donnée <strong>avant</strong> l'intervention, jamais après. Un client prévenu accepte une trace ; un client non prévenu la vit comme une malfaçon.</p>`,
        },
      ],
    },
    {
      title: "Chapitre 8 — Accueil client, assurance et relation de service",
      description: "Recueil du besoin, annonce d'un diagnostic, circuit assurance, prestation additionnelle et réclamation.",
      sections: [
        {
          title: "8.1 Accueillir et recueillir le besoin",
          content: `<p>La trame d'accueil : saluer et se présenter, écouter sans interrompre, <strong>reformuler</strong> pour vérifier la compréhension, recueillir les informations (circonstances et date du sinistre, contrat d'assurance, contraintes de mobilité du client), puis réaliser l'<strong>examen contradictoire du véhicule avec le client</strong> : état général, dommages préexistants, kilométrage, photographies datées.</p>
<p>Cet examen contradictoire est un acte de protection mutuelle : il évite les contestations sur une rayure qui existait déjà.</p>`,
        },
        {
          title: "8.2 Annoncer un diagnostic, y compris négatif",
          content: `<p>Séquence : <strong>montrer</strong> physiquement le dommage, <strong>nommer</strong> le critère bloquant en langage simple, <strong>expliquer la conséquence</strong> concrète, <strong>proposer immédiatement la solution</strong> avec délai, durée d'immobilisation, temps de sécurité au décollage et prix.</p>
<p>Exemple : « Votre impact est à trois centimètres du bord. C'est la zone où le pare-brise est collé à la carrosserie et où il travaille le plus : une résine ne tiendrait pas et la fissure repartirait. Je vous propose un remplacement demain matin, votre véhicule sera disponible en fin de matinée. »</p>
<p>Jamais de refus sans explication, jamais de jargon non traduit, jamais de décision annoncée avant d'avoir montré le dommage.</p>`,
        },
        {
          title: "8.3 Le circuit assurance",
          content: `<p><strong>Garantie bris de glace</strong> : garantie généralement incluse dans les contrats tous risques et souvent proposée en option sur les contrats au tiers. Elle couvre le remplacement ou la réparation du vitrage.</p>
<p><strong>Franchise</strong> : part contractuelle restant à la charge de l'assuré. Elle est prévue au contrat, l'atelier ne la fixe pas et ne peut pas la « faire sauter ». Une franchise est souvent réduite, voire nulle, en cas de réparation d'impact plutôt que de remplacement : c'est un argument honnête à donner au client.</p>
<p><strong>Cession de créance</strong> : mécanisme par lequel l'assuré cède à l'atelier sa créance sur l'assureur. Le client ne règle alors que sa franchise, l'atelier se faisant payer directement par l'assureur. Pièces à recueillir : carte grise, attestation d'assurance, permis, déclaration de sinistre.</p>
<p>Posture : rester factuel, montrer la ligne du contrat, ne jamais critiquer l'assureur devant le client.</p>`,
        },
        {
          title: "8.4 Prestation additionnelle et réclamation",
          content: `<p><strong>Prestation additionnelle</strong> — méthode en cinq temps : partir d'un <strong>constat réel</strong> fait sur le véhicule, le montrer au client, expliquer le <strong>bénéfice pour lui</strong>, annoncer clairement le prix et l'impact sur l'immobilisation, laisser choisir et <strong>accepter le refus</strong> sans insistance.</p>
<p>Interdits : proposer sans constat, présenter une option comme obligatoire, insister après un refus, lier la prestation à la prise en charge assurance.</p>
<p><strong>Réclamation</strong> : écouter jusqu'au bout sans se justifier, reformuler le grief, constater les faits sur le véhicule, annoncer ce que l'on va faire et sous quel délai, tenir l'engagement et rappeler le client. Une réclamation bien traitée fidélise davantage qu'une intervention sans incident.</p>`,
        },
      ],
    },
  ];
}
