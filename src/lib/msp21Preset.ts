/**
 * Preset complet « Techniques de maquillage semi-permanent (RS6459) – 21 h »
 * — formation professionnelle continue CERTIFIANTE préparant la certification « Techniques de maquillage
 * semi-permanent » enregistrée au Répertoire spécifique sous le code RS6459 (France Compétences) :
 * professionnels de l'esthétique et de la beauté, financement CPF possible, présentiel, groupe de 1 à 3.
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - Formation 21 h (3 jours de 7 h) : J1 accueil, positionnement, cadre réglementaire, C1 à C5 ;
 *    J2 C6 et C7 (sourcils, technique manuelle puis électrique), cas pratique intermédiaire ;
 *    J3 C8 à C11, évaluation de fin de formation, bilan. Le passage devant le jury de certification
 *    (3 professionnels externes) a lieu selon le calendrier du certificateur.
 *  - AUCUN stagiaire pré-importé
 *  - Pack contenu : analyse des besoins, 10 mises en situation corrigées (diagnostic de départ puis
 *    C1 à C11) et 11 QCM de 10 questions, un par compétence
 *  - Pack évaluation : QCM de positionnement début / fin, cas intermédiaire, évaluation de fin de formation
 *  - Pack veille (réglementaire / métier / technologique)
 * Fil rouge : Institut Ligne & Teint, institut de beauté FICTIF à Argenteuil (Val-d'Oise), gérante fictive
 * Nadia FERRAND ; clientes fictives ; les prix des prestations du fil rouge sont fictifs.
 */
import type { FormationInfo } from "@/types/qualiopi";
import type { AIContentPack, AIContentExercise } from "./aiContentPack";
import type { AIEvalPack, AIQCMQuestion } from "./aiEvalPack";
import type { AIVeillePack } from "./aiVeillePack";
import { setCachedContentPack } from "./aiContentPack";
import { setCachedPack as setCachedEvalPack } from "./aiEvalPack";
import { setCachedVeillePack } from "./aiVeillePack";

// ---------------------------------------------------------------------------
// Formation
// ---------------------------------------------------------------------------
export const FORMATION_MSP21: FormationInfo = {
  intitule: "Techniques de maquillage semi-permanent (RS6459) – 21 h",
  codeRNCP: "RS6459",
  objectifs:
    "Formation certifiante préparant la certification « Techniques de maquillage semi-permanent » enregistrée au Répertoire spécifique de France Compétences sous le code RS6459. Objectif général : réaliser en sécurité, dans le respect des règles d'hygiène et de salubrité et de la réglementation applicable au tatouage par effraction cutanée, des prestations de maquillage semi-permanent (dermopigmentation) des sourcils, des yeux, des lèvres et des joues, en technique manuelle et en technique électrique, de l'entretien conseil jusqu'au suivi post-prestation.\nÀ l'issue de la formation, le/la stagiaire sera capable de :\n- C1 — Identifier les besoins de la cliente : conduite de l'entretien conseil, questions ouvertes, écoute et reformulation, attentes, motivations, habitudes de vie, analyse morphologique du visage, repérage des attentes irréalistes, validation des besoins sur la fiche cliente.\n- C2 — Réaliser une évaluation personnalisée de la peau de la cliente, personnaliser son offre commerciale et remettre les documents légaux : type et état de la peau, phototype, contre-indications et précautions avec renvoi vers l'avis médical, offre et devis personnalisés, information préalable sur les risques et les précautions (arrêté du 3 décembre 2008), consentement éclairé écrit, fiche cliente conforme au RGPD, autorisation écrite pour les photos, règle applicable aux mineures.\n- C3 — Préparer son poste de travail, en tenant compte d'une éventuelle situation de handicap (la sienne ou celle de la cliente) et respecter les règles d'hygiène : bonnes pratiques de l'arrêté du 11 mars 2009, hygiène des mains, matériel stérile à usage unique, protection du dermographe, désinfection des surfaces, DASRI, traçabilité des lots, ergonomie et adaptation du poste à une situation de handicap.\n- C4 — Préparer la zone à traiter (sourcils, eye-liner, lèvres, taches de rousseur…) : démaquillage, antisepsie cutanée, mesures et symétrie, dessin préparatoire, validation du tracé par la cliente, photos avant avec son accord.\n- C5 — Sélectionner les pigments adaptés au phototype de la cliente en appliquant les règles de colorimétrie : phototypes de Fitzpatrick I à VI, carnation et sous-ton, cercle chromatique, couleurs complémentaires et neutralisation, pigments organiques et inorganiques, virage des couleurs, conformité des pigments (REACH, règlement (UE) 2020/2081, étiquetage, numéro de lot).\n- C6 — Sélectionner le dermographe, la taille des aiguilles et la vitesse d'effraction en fonction de la zone à traiter et de l'effet attendu, et adapter son mouvement et sa pression sur la zone : dermographes rotatifs et à cartouches, configurations d'aiguilles, profondeur jusqu'à la jonction dermo-épidermique, vitesse, angle, tension de la peau, mouvement et pression, entraînement sur peau latex 3D.\n- C7 — Réaliser une correction ou un embellissement des sourcils : visagisme, technique manuelle (microblading poil à poil), technique électrique (ombré, poudré, combiné), correction d'un ancien maquillage viré.\n- C8 — Réaliser un embellissement des yeux en dessinant un eye-liner : ras de cils, trait fin, trait étiré, sécurité de la zone oculaire.\n- C9 — Réaliser une correction ou un embellissement des lèvres : contour, remplissage, effet « lip blush », neutralisation des lèvres foncées.\n- C10 — Créer des taches de rousseur : répartition naturelle, choix de la couleur, de la taille et de la densité.\n- C11 — Procéder aux soins post-prestation et communiquer les bonnes pratiques : soins immédiats, cicatrisation, consignes écrites, retouche après cicatrisation complète, suivi, gestion des complications et des réclamations.",
  prerequis:
    "Expérience professionnelle dans le secteur de l'esthétique et de la beauté (indépendant ou salarié). La formation aux conditions d'hygiène et de salubrité de 21 h (arrêté du 12 décembre 2008), obligatoire pour exercer le maquillage permanent, est exigée pour valider la certification RS6459 : l'attestation est à fournir à l'inscription ou la formation est à suivre auprès d'un organisme habilité avant l'épreuve de certification.",
  duree: "21 heures (3 jours de 7 h)",
  modalites: "présentiel",
  tarif: "2 097 € par stagiaire",
  programme:
    "JOUR 1 — ACCUEIL ET POSITIONNEMENT · CADRE RÉGLEMENTAIRE · C1 À C5 : DE L'ENTRETIEN CONSEIL AU CHOIX DES PIGMENTS (7 h)\nMatin : accueil, présentation des objectifs, du déroulé et des modalités de la certification RS6459, analyse des besoins, test de positionnement. Cadre réglementaire et sanitaire de la dermopigmentation : Code de la santé publique (articles R1311-1 à R1311-13), déclaration de l'activité auprès de l'ARS, formation hygiène et salubrité obligatoire, arrêtés du 3 décembre 2008 et du 11 mars 2009, règle applicable aux mineures, produits de tatouage et règlement (UE) 2020/2081. C1 : entretien conseil, besoins, attentes, morphologie, motivations. C2 : évaluation de la peau, contre-indications et avis médical, offre personnalisée et devis, documents légaux (information préalable, consentement éclairé, fiche cliente, photos et droit à l'image). Mises en situation : diagnostic de départ ; entretien conseil et documents légaux pour Mme Laura VIDAL.\nAprès-midi : C3 : poste de travail, chaîne d'hygiène, asepsie, matériel stérile à usage unique, DASRI, traçabilité, ergonomie et adaptation du poste à une situation de handicap (cas de Mme Yasmine BELKACEM). C4 : démaquillage, antisepsie, mesures et symétrie, dessin préparatoire, validation par la cliente. C5 : phototypes de Fitzpatrick I à VI, carnation et sous-ton, cercle chromatique, complémentaires et neutralisation, pigments organiques et inorganiques, virage des couleurs. Mises en situation : préparer son poste et appliquer la chaîne d'hygiène ; préparer la zone et choisir les pigments (cas de Mme Martine LEROY).\n\nJOUR 2 — C6 : DERMOGRAPHE ET AIGUILLES · C7 : SOURCILS EN TECHNIQUE MANUELLE ET ÉLECTRIQUE · CAS PRATIQUE INTERMÉDIAIRE (7 h)\nMatin : C6 : dermographes rotatifs et à cartouches, types et configurations d'aiguilles, vitesse et profondeur d'effraction, angle, tension de la peau, mouvement et pression, réglages par zone ; entraînement sur peau latex 3D. C7 : morphologie et visagisme des sourcils, technique manuelle (microblading poil à poil) sur latex. Mise en situation : choisir et régler le dermographe et les aiguilles.\nAprès-midi : C7 suite : technique électrique (ombré, poudré, combiné), correction d'un ancien maquillage viré ; réalisation sur modèle volontaire. Mise en situation : correction ou embellissement des sourcils. Cas pratique intermédiaire en fin de journée.\n\nJOUR 3 — C8 EYE-LINER · C9 LÈVRES · C10 TACHES DE ROUSSEUR · C11 SOINS POST-PRESTATION · ÉVALUATION DE FIN DE FORMATION (7 h)\nMatin : C8 : eye-liner ras de cils, trait fin, trait étiré, sécurité de la zone oculaire. C9 : contour, remplissage, effet « lip blush », neutralisation des lèvres foncées. C10 : répartition naturelle, couleur, taille et densité des taches de rousseur. Entraînement sur peau latex 3D puis sur modèle selon les modèles disponibles. Mises en situation : eye-liner en sécurité ; lèvres ; taches de rousseur.\nAprès-midi : C11 : soins post-prestation, cicatrisation, consignes écrites, retouche après cicatrisation complète, suivi, gestion des complications et des réclamations. Mise en situation : soins post-prestation, retouche et bonnes pratiques. Évaluation de fin de formation : QCM et études de cas, mise en situation professionnelle (une prestation en technique manuelle et une prestation en technique électrique) observée avec grille d'évaluation par compétence. Bilan, questionnaire de satisfaction à chaud, information sur le passage devant le jury de certification, organisé selon le calendrier du certificateur.",
  methodesEvaluation:
    "Analyse des besoins et test de positionnement à l'entrée (10 questions ouvertes + QCM 10 questions), mises en situation tout au long de la formation (10 mises en situation corrigées : diagnostic de départ puis C1 à C11), un QCM de 10 questions par compétence (11 QCM), cas pratique intermédiaire à la fin du jour 2, test de positionnement de fin (10 questions ouvertes + QCM 10 questions). Évaluation de fin de formation le jour 3 : QCM et études de cas, mise en situation professionnelle sur peau latex 3D et sur modèle (une prestation en technique manuelle et une prestation en technique électrique) observée par la formatrice avec grille d'évaluation par compétence. Évaluation certificative selon les modalités officielles de la certification RS6459 : QCM et études de cas ; cas pratiques en mise en situation professionnelle sur peau latex 3D et sur modèle ; mise en situation professionnelle devant un jury de 3 professionnels du secteur de l'esthétique, experts en maquillage semi-permanent, externes à l'organisme certificateur, avec réalisation de 2 prestations (technique manuelle et technique électrique), selon le calendrier du certificateur. Le certificat est délivré par le certificateur. Attestation de fin de formation mentionnant les objectifs, la nature, la durée et les résultats de l'évaluation des acquis. Questionnaires de satisfaction à chaud et à froid.",
  moyensPedagogiques:
    "Formation en présentiel dans une salle de dermopigmentation conforme aux bonnes pratiques d'hygiène et de salubrité de l'arrêté du 11 mars 2009 (zone de soins distincte, surfaces lessivables, point d'eau, produits de désinfection) : fauteuil ou table de soin réglable en hauteur, éclairage adapté avec lampe loupe, dermographes rotatifs et à cartouches, aiguilles et cartouches stériles à usage unique, lames de microblading stériles à usage unique, protections à usage unique du dermographe et de son cordon, gants, champs stériles, antiseptique cutané, pigments conformes au règlement REACH avec numéros de lot tracés, peaux latex 3D d'entraînement, modèles volontaires informés, collecteurs pour objets piquants-coupants et filière DASRI ; vidéoprojecteur ; support de cours remis à chaque stagiaire, cahier d'exercices et corrigés, modèles de documents (fiche cliente, information préalable, consentement éclairé, autorisation photo, devis, fiche de consignes post-prestation, fiche de traçabilité) ; travail sur le cas fil rouge Institut Ligne & Teint (institut fictif) ; feuilles d'émargement signées par demi-journée. Groupe de 1 à 3 stagiaires pour un suivi individualisé de chaque geste technique.",
  publicVise:
    "Professionnels de l'esthétique et de la beauté, indépendants ou salariés, exerçant ou souhaitant exercer le maquillage semi-permanent en institut, centre esthétique, spa ou salon de coiffure. Financement possible par le CPF, la certification étant enregistrée au Répertoire spécifique (RS6459), ou par tout autre financeur selon ses critères.",
  delaiAcces: "11 jours ouvrés minimum après la demande d'inscription sur Mon Compte Formation, sous réserve de places disponibles.",
  dateDebut: "2025-03-19",
  dateFin: "2025-03-21",
  lieu: "",
  nombreParticipants: "3",
  formateur: "",
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Maîtriser le cadre réglementaire du maquillage permanent : déclaration à l'ARS, formation hygiène et salubrité, arrêtés applicables, règle pour les mineures.",
  "Conduire un entretien conseil qui fait émerger les vraies attentes de la cliente et écarte les demandes irréalistes.",
  "Repérer les contre-indications et les situations qui exigent un avis médical préalable, sans jamais se substituer au médecin.",
  "Disposer de documents légaux fiables : information préalable, consentement éclairé, fiche cliente conforme au RGPD, autorisation photo.",
  "Organiser un poste de travail conforme à la chaîne d'hygiène, avec une filière DASRI et une traçabilité des lots, adapté à une situation de handicap.",
  "Choisir les pigments selon le phototype et le sous-ton, et savoir neutraliser un ancien maquillage viré.",
  "Régler le dermographe et choisir les aiguilles selon la zone, et maîtriser la profondeur d'effraction pour éviter migration et virage.",
  "Réaliser des sourcils naturels en technique manuelle et en technique électrique, puis corriger un ancien travail.",
  "Étendre son offre à l'eye-liner, aux lèvres et aux taches de rousseur en toute sécurité.",
  "Assurer les soins post-prestation, la retouche, le suivi et la gestion des réclamations, et se préparer aux épreuves de la certification RS6459.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins conduite avec chaque stagiaire avant l'entrée en formation (entretien préalable, vérification des prérequis et de l'attestation hygiène et salubrité, test de positionnement) fait apparaître un petit groupe de professionnelles de l'esthétique, indépendantes ou salariées, aux expériences variées : certaines pratiquent déjà la restructuration des sourcils au crayon ou au henné, d'autres ont été initiées à une technique de dermopigmentation sans cadre complet. Trois besoins sont partagés par l'ensemble du groupe.</p>
<ul>
  <li><strong>Sécuriser la pratique (C2, C3, C11)</strong> : les obligations réglementaires (déclaration à l'ARS, information préalable, consentement, DASRI, traçabilité des lots) sont connues de façon partielle ; les contre-indications et les situations relevant d'un avis médical sont mal identifiées.</li>
  <li><strong>Fiabiliser le résultat (C4, C5, C6)</strong> : la symétrie, le choix des pigments selon le phototype et la maîtrise de la profondeur d'effraction sont les principales sources d'appréhension ; le risque de virage des couleurs est cité par toutes.</li>
  <li><strong>Élargir l'offre (C1, C7 à C10)</strong> : au-delà des sourcils, les stagiaires souhaitent proposer l'eye-liner, les lèvres et les taches de rousseur, en technique manuelle et en technique électrique, avec un entretien conseil structuré.</li>
</ul>
<p>Les stagiaires attendent en complément un entraînement intensif sur peau latex 3D avant toute réalisation sur modèle, des modèles de documents directement utilisables dans leur institut et une préparation concrète aux épreuves de la certification RS6459 (QCM, études de cas, prestations devant jury en technique manuelle et en technique électrique).</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Débutantes en dermopigmentation</strong> : progression systématique du dessin sur papier à la peau latex 3D, puis au modèle seulement lorsque le geste est jugé sûr par la formatrice ; temps d'entraînement supplémentaire sur latex pour le microblading et l'ombré.</li>
  <li><strong>Stagiaires déjà initiées</strong> : travail approfondi sur les corrections (ancien maquillage viré, asymétries), la neutralisation des lèvres foncées et les configurations d'aiguilles.</li>
  <li><strong>Modèles volontaires</strong> : recrutés et informés à l'avance, entretien et vérification des contre-indications avant la séance, information préalable et consentement éclairé signés, autorisation photo distincte et facultative ; en l'absence de modèle adapté à une zone, la réalisation se fait sur peau latex 3D.</li>
  <li><strong>Petit groupe de 1 à 3</strong> : une formatrice pour l'ensemble du groupe, correction individuelle de chaque geste, grille de progression par compétence tenue à jour chaque demi-journée.</li>
  <li><strong>Préparation à la certification</strong> : QCM et études de cas sur le modèle des épreuves, prestation manuelle et prestation électrique observées avec grille le jour 3, information sur le calendrier du jury fixé par le certificateur.</li>
  <li><strong>Accessibilité et handicap</strong> : référent handicap présenté dès l'entretien préalable, adaptation du poste (hauteur de la table ou du fauteuil, appuis, éclairage, temps de pause), supports remis à l'avance et en version numérique, temps majoré pour les épreuves internes ; demande d'aménagement des épreuves de certification transmise au certificateur.</li>
</ul>`;

/** 10 mises en situation (diagnostic de départ puis C1 à C11), corrigés formatrice. */
export const MSP21_EXERCICES: AIContentExercise[] = [
  {
    titre: "Exercice 1 — Diagnostic de départ : mon expérience, mes pratiques et mes objectifs en maquillage semi-permanent",
    consigne:
      "Pour votre activité (ou, à défaut, celle de Nadia FERRAND, gérante de l'Institut Ligne & Teint, institut de beauté fictif à Argenteuil qui ouvre un espace de dermopigmentation) : 1. Décrivez votre parcours dans l'esthétique et les prestations du regard et du visage que vous réalisez déjà (restructuration des sourcils, teinture, maquillage). 2. Indiquez les techniques de dermopigmentation que vous avez déjà pratiquées ou observées, et sur quel support (papier, latex, modèle). 3. Faites le point sur votre situation réglementaire : attestation de formation hygiène et salubrité, déclaration de l'activité auprès de l'ARS, filière DASRI, assurance. 4. Évaluez de 1 à 4 votre aisance sur chacune des compétences C1 à C11. 5. Concluez par 3 forces, 3 points de vigilance et 3 objectifs pour les trois jours de formation, puis pour la certification RS6459.",
    reponseAttendue:
      "Parcours décrit de façon concrète (statut, années d'expérience, prestations réalisées, clientèle) et relié au projet de dermopigmentation.\nTechniques déjà pratiquées distinguées des techniques seulement observées ; support précisé ; aucune surestimation du niveau.\nSituation réglementaire exacte : la formation aux conditions d'hygiène et de salubrité (21 h, arrêté du 12 décembre 2008) est obligatoire pour exercer et pour valider la certification ; l'activité doit être déclarée auprès du directeur général de l'ARS ; les DASRI exigent un collecteur pour objets piquants-coupants, une convention avec un prestataire de collecte et des bordereaux de suivi ; les points manquants sont listés avec une échéance.\nAutoévaluation C1 à C11 cohérente avec l'expérience décrite.\nForces, points de vigilance et objectifs tirés des constats, reliés aux compétences et aux épreuves de la certification (QCM et études de cas, cas pratiques sur latex et modèle, 2 prestations devant jury).\nBarème : parcours 4, techniques 3, situation réglementaire 5, autoévaluation 4, conclusion 4.",
    points: 20,
  },
  {
    titre: "Exercice 2 — C1 et C2 : entretien conseil, évaluation de la peau et documents légaux",
    consigne:
      "Mme Laura VIDAL, 34 ans, cliente fictive de l'Institut Ligne & Teint, phototype II à sous-ton froid, a des sourcils clairsemés et asymétriques après des années d'épilation excessive ; elle veut « un effet naturel, pas des sourcils dessinés ». 1. Préparez la trame de l'entretien conseil : 8 questions ouvertes (attentes, motivations, habitudes de vie, soins de peau, exposition au soleil, sport, antécédents) et vos reformulations. 2. Réalisez l'évaluation de la peau et l'analyse morphologique, et indiquez la technique que vous proposez. 3. Listez les contre-indications et précautions à vérifier et la conduite à tenir pour chacune. 4. Rédigez l'offre personnalisée et le devis (prix fictifs), retouche comprise ou non. 5. Listez les documents à remettre et à faire signer, et précisez la règle applicable si la cliente était mineure.",
    reponseAttendue:
      "Entretien : questions ouvertes et non orientées (« Que souhaitez-vous changer ? », « Comment vous maquillez-vous aujourd'hui ? », « Que représenterait pour vous un résultat réussi ? »), questions sur le soleil, la piscine, les soins exfoliants, les traitements en cours ; reformulation qui valide la demande d'effet naturel ; attentes notées sur la fiche cliente.\nÉvaluation : type de peau (grasse, sèche, mixte), épaisseur, sensibilité, cicatrices, pilosité restante, phototype II et sous-ton froid ; morphologie (écartement des yeux, forme du visage, point de départ, arche, fin du sourcil) ; proposition argumentée du microblading poil à poil, éventuellement combiné, avec explication des limites.\nContre-indications et précautions : grossesse et allaitement, traitement anticoagulant, diabète non équilibré, troubles de la cicatrisation et tendance aux chéloïdes, affection cutanée active sur la zone, traitement par isotrétinoïne, chimiothérapie ou radiothérapie en cours, allergies connues, injections esthétiques récentes sur la zone ; conduite : report de la prestation et avis médical préalable, sans jamais poser de diagnostic.\nOffre : prestation, technique, nombre de séances, retouche après cicatrisation complète, prix fictifs, conditions d'annulation, durée de validité du devis.\nDocuments : information préalable écrite sur les risques et les précautions à respecter après la réalisation (arrêté du 3 décembre 2008, affichage et document remis), consentement éclairé signé avant la prestation, fiche cliente (données de santé = données sensibles au sens du RGPD : consentement, conservation limitée, sécurité), autorisation écrite et distincte pour les photos avant et après ; mineure : interdiction sans le consentement écrit d'une personne titulaire de l'autorité parentale ou du tuteur.\nBarème : entretien 5, évaluation et technique 4, contre-indications 4, offre 3, documents 4.",
    points: 20,
  },
  {
    titre: "Exercice 3 — C3 : préparer son poste de travail et appliquer la chaîne d'hygiène",
    consigne:
      "Nadia FERRAND aménage la cabine de dermopigmentation de l'Institut Ligne & Teint. La prochaine cliente, Mme Yasmine BELKACEM, 38 ans, se déplace en fauteuil roulant. 1. Décrivez l'aménagement de la cabine conforme aux bonnes pratiques (zone propre et zone sale, surfaces, point d'eau, rangement du matériel stérile). 2. Rédigez la chaîne d'hygiène pas à pas, de l'arrivée de la cliente à la remise en état du poste. 3. Indiquez le circuit des DASRI et les documents à conserver. 4. Décrivez la fiche de traçabilité à compléter pour chaque prestation. 5. Adaptez le poste et le déroulé à Mme BELKACEM, puis indiquez comment une praticienne elle-même en situation de handicap pourrait adapter son poste.",
    reponseAttendue:
      "Aménagement conforme à l'arrêté du 11 mars 2009 : cabine dédiée, surfaces lisses et lessivables, point d'eau avec distributeur de savon et essuie-mains à usage unique, séparation entre matériel propre ou stérile et déchets, stockage du matériel stérile à l'abri, au sec et dans son emballage.\nChaîne d'hygiène : tenue propre, cheveux attachés ; hygiène des mains par friction hydroalcoolique sur mains propres ; désinfection des surfaces et du fauteuil ; pose d'un champ à usage unique ; ouverture devant la cliente des aiguilles, cartouches ou lames de microblading stériles à usage unique ; protection à usage unique du dermographe et de son cordon ; gants à usage unique changés dès qu'ils sont contaminés ; antisepsie de la peau ; pigment déposé dans des godets à usage unique ; après la prestation, élimination immédiate des objets piquants-coupants, retrait des protections, désinfection de toutes les surfaces avant la cliente suivante.\nDASRI : tri à la source, collecteur pour objets piquants-coupants, convention avec un prestataire de collecte, bordereaux de suivi conservés.\nTraçabilité : date, cliente, zone, numéros de lot des pigments et des aiguilles ou cartouches, réglages utilisés, consignes remises.\nHandicap : accès et espace de circulation suffisants, table ou fauteuil réglable, prestation possible dans le fauteuil de la cliente si la position et l'éclairage le permettent ou transfert seulement s'il est souhaité et sécurisé, temps de pause prévu, consentement sur chaque manipulation ; pour la praticienne : hauteur de travail et siège adaptés, appuis pour les avant-bras, organisation du matériel à portée de main, durées de séance ajustées.\nBarème : aménagement 4, chaîne d'hygiène 6, DASRI 3, traçabilité 3, handicap 4.",
    points: 20,
  },
  {
    titre: "Exercice 4 — C4 et C5 : préparer la zone et choisir les pigments selon le phototype",
    consigne:
      "Mme Martine LEROY, 63 ans, cliente fictive, porte un ancien maquillage permanent des sourcils qui a viré au gris-bleu ; elle souhaite retrouver une couleur brun doux. 1. Décrivez la préparation de la zone : démaquillage, antisepsie, mesures et symétrie, dessin préparatoire, validation. 2. Analysez l'ancien pigment (couleur, densité, netteté, profondeur probable) et expliquez la cause possible du virage. 3. Expliquez, à l'aide du cercle chromatique, comment neutraliser le gris-bleu, puis choisissez le pigment final selon son phototype et son sous-ton. 4. Indiquez les vérifications de conformité du pigment avant usage. 5. Précisez les limites de la correction et ce que vous direz à la cliente.",
    reponseAttendue:
      "Préparation : démaquillage et nettoyage, antisepsie cutanée, repérage des points de départ, d'arche et de fin à l'aide d'un compas ou d'un fil de mesure, dessin préparatoire au crayon, contrôle de la symétrie, validation par la cliente dans un miroir, photo avant avec son autorisation écrite.\nAnalyse : teinte grise ou bleutée, densité et contours de l'ancien travail ; virage souvent lié à une effraction trop profonde et à un pigment trop froid ou trop chargé en noir, qui évolue avec le temps et le soleil.\nNeutralisation : la couleur complémentaire du bleu est l'orangé ; un correcteur à dominante chaude, choisi en quantité maîtrisée, neutralise le gris-bleu ; puis pigment brun adapté à la carnation et au sous-ton, sans dominante froide ; test de couleur sur la peau sans effraction.\nConformité : étiquette portant la mention « Mélange destiné à être utilisé dans des tatouages ou des maquillages permanents », liste des ingrédients, numéro de lot, conformité au règlement REACH et à la restriction du règlement (UE) 2020/2081 applicable depuis le 4 janvier 2022, pigments Blue 15:3 et Green 7 restreints depuis le 4 janvier 2023 ; lot reporté sur la fiche de traçabilité.\nLimites : résultat progressif en plusieurs séances espacées après cicatrisation complète, ancien pigment très dense ou très foncé parfois impossible à couvrir de façon satisfaisante, aucun résultat garanti ; explication claire et notée sur la fiche.\nBarème : préparation 5, analyse 3, neutralisation et choix 6, conformité 3, limites 3.",
    points: 20,
  },
  {
    titre: "Exercice 5 — C6 : choisir et régler le dermographe et les aiguilles",
    consigne:
      "Préparez pour l'Institut Ligne & Teint la fiche de réglages des quatre prestations du fil rouge : sourcils poudrés (électrique), eye-liner ras de cils de Mme Sophie MARCHAND, neutralisation et contour des lèvres de Mme Aïcha DIALLO, taches de rousseur de Mme Clara NGUYEN. Pour chacune : 1. type de dermographe et de cartouche ou d'aiguille (configuration, finesse) ; 2. vitesse et profondeur visée ; 3. angle, tension de la peau, mouvement et pression ; 4. signes d'une effraction trop profonde ou trop superficielle et correction à apporter. 5. Décrivez le protocole d'entraînement sur peau latex 3D avant la réalisation sur modèle.",
    reponseAttendue:
      "Matériel : dermographe rotatif ou à cartouches, cartouches stériles à usage unique avec membrane de protection ; configurations adaptées : aiguille fine en ligne ou à pointe unique pour l'eye-liner et les contours, configurations plus larges ou en grappe pour l'ombré, le poudré et le remplissage des lèvres, pointe fine pour les taches de rousseur ; choix justifié par la zone et l'effet attendu, selon les préconisations du fabricant.\nProfondeur : dans l'épiderme jusqu'à la jonction dermo-épidermique, jamais au-delà ; vitesse adaptée à la zone et à l'épaisseur de peau, plus douce sur les zones fines (paupière, lèvres).\nGeste : angle constant, tension de la peau avec la main libre pour offrir une surface stable, mouvements réguliers (pendulaire ou en petits cercles pour le poudré, trait continu et maîtrisé pour l'eye-liner, effraction ponctuelle pour les taches de rousseur), pression légère et constante.\nDiagnostic : trop profond = saignement marqué, migration, flou, virage bleuté à la cicatrisation ; trop superficiel = pigment qui ne tient pas, résultat irrégulier après cicatrisation ; correction de l'angle, de la vitesse, de la pression ou de la configuration.\nEntraînement : exercices de lignes, de dégradés et de points sur latex, test de chaque réglage, contrôle par la formatrice, passage au modèle uniquement après validation du geste.\nBarème : matériel 5, profondeur et vitesse 4, geste 4, diagnostic 4, entraînement 3.",
    points: 20,
  },
  {
    titre: "Exercice 6 — C7 : réaliser la correction ou l'embellissement des sourcils",
    consigne:
      "1. Pour Mme Laura VIDAL (phototype II, sous-ton froid, sourcils clairsemés et asymétriques), réalisez sur peau latex 3D puis, si la formatrice le valide, sur modèle, un embellissement en technique manuelle (microblading poil à poil). 2. Réalisez sur latex un sourcil en technique électrique (ombré ou poudré) et un sourcil combiné. 3. Pour Mme Martine LEROY, présentez le plan de correction de son ancien maquillage viré au gris-bleu. 4. Décrivez les contrôles réalisés pendant la prestation. 5. Préparez les explications données à chaque cliente sur l'évolution du résultat et la retouche.",
    reponseAttendue:
      "Microblading : dessin préparatoire validé, lame stérile à usage unique, traits fins dans la direction naturelle de pousse des poils, densité progressive, respect des repères morphologiques ; pigment brun adapté au phototype II et au sous-ton froid, sans dominante grise ; dépôt du pigment et contrôle de la régularité.\nTechnique électrique : ombré ou poudré en dégradé de densité, plus léger au début du sourcil ; combiné : traits manuels à l'avant et ombré électrique sur le corps et la queue ; choix argumenté selon le type de peau (peau grasse à pores dilatés : technique électrique souvent préférée au microblading).\nCorrection : neutralisation du gris-bleu par un correcteur à dominante chaude, recoloration en brun, séances espacées après cicatrisation complète, limites expliquées.\nContrôles : nettoyage régulier de la zone, vérification de l'homogénéité, de la symétrie et de la profondeur, confort et réactions de la cliente, respect permanent de la chaîne d'hygiène.\nExplications : résultat plus intense juste après la séance, puis atténuation pendant la cicatrisation de plusieurs semaines (environ 4 à 6), retouche après cicatrisation complète, tenue de plusieurs années avec atténuation progressive, variable selon la peau, le soleil et les soins.\nBarème : microblading 6, électrique et combiné 5, correction 3, contrôles 3, explications 3.",
    points: 20,
  },
  {
    titre: "Exercice 7 — C8 : réaliser un eye-liner en sécurité",
    consigne:
      "Mme Sophie MARCHAND, 52 ans, cliente fictive, porte des lentilles et est presbyte ; elle souhaite un trait d'eye-liner ras de cils. 1. Listez les vérifications préalables propres à la zone oculaire. 2. Décrivez l'installation de la cliente et la préparation de la zone. 3. Présentez les trois styles possibles (ras de cils, trait fin, trait étiré) et justifiez votre choix pour Mme MARCHAND. 4. Décrivez la réalisation sur peau latex 3D puis sur modèle, en précisant les règles de sécurité. 5. Rédigez les consignes post-prestation spécifiques à l'eye-liner.",
    reponseAttendue:
      "Vérifications : infection oculaire ou chirurgie récente des yeux, affections des paupières, allergies connues, traitement en cours ; avis médical préalable en cas de doute ; retrait des lentilles avant la prestation ; aucun produit anesthésiant relevant du médicament prescrit, injecté ou fourni par la praticienne, toute question renvoyée vers le médecin ou le pharmacien de la cliente.\nInstallation : cliente allongée, tête stable, éclairage adapté ; démaquillage doux, antisepsie adaptée au contour de l'œil ; dessin ou repères validés avec un miroir grossissant ou ses lunettes, compte tenu de sa presbytie.\nStyles : ras de cils (pigmentation fine au plus près de la ligne ciliaire, effet de densité des cils), trait fin, trait étiré prolongé vers l'extérieur selon la forme de l'œil ; ras de cils retenu car demandé, discret et adapté à une paupière mature.\nRéalisation : aiguille fine adaptée, vitesse modérée, paupière délicatement tendue, appui stable de la main, gestes lents et maîtrisés, cliente informée de ne pas bouger, pauses régulières, nettoyage doux sans pression sur l'œil ; entraînement préalable sur latex validé.\nConsignes : ne pas frotter ni maquiller la zone pendant la cicatrisation, ne pas remettre les lentilles avant que l'œil soit calme, suivre les soins indiqués, éviter piscine, sauna et soleil direct ; léger œdème transitoire possible ; consulter un médecin en cas de douleur, d'écoulement ou de rougeur persistante ; consignes remises par écrit.\nBarème : vérifications 5, installation 3, styles 3, réalisation et sécurité 6, consignes 3.",
    points: 20,
  },
  {
    titre: "Exercice 8 — C9 : réaliser la correction ou l'embellissement des lèvres",
    consigne:
      "Mme Aïcha DIALLO, 41 ans, cliente fictive, phototype V, présente des lèvres à pigmentation inégale et un contour flou. 1. Listez les précautions et contre-indications propres aux lèvres. 2. Analysez la couleur naturelle de ses lèvres et choisissez la stratégie de neutralisation puis la couleur finale, à l'aide du cercle chromatique. 3. Décrivez le tracé du contour et le choix entre contour seul, remplissage et effet « lip blush ». 4. Décrivez la réalisation sur peau latex 3D puis sur modèle. 5. Rédigez les consignes post-prestation spécifiques aux lèvres et expliquez l'évolution de la couleur.",
    reponseAttendue:
      "Précautions : antécédents d'herpès labial (avis médical, traitement préventif éventuel prescrit par le médecin), injections esthétiques récentes sur la zone, allergies connues, grossesse et allaitement, troubles de la cicatrisation, affection active ; avis médical préalable en cas de doute ; aucun anesthésiant relevant du médicament fourni par la praticienne.\nCouleur : zones foncées à dominante bleutée ou violacée ; neutralisation préalable par un pigment chaud adapté (complémentaire de la dominante froide), puis couleur choisie selon le sous-ton et le souhait de la cliente ; tests de couleur ; risque de virage plus élevé sur les phototypes foncés expliqué.\nContour : respect du bord naturel et de la symétrie, correction légère seulement si elle est validée par la cliente ; contour seul pour redéfinir, remplissage pour unifier la couleur, « lip blush » pour un effet de couleur diffuse et naturelle.\nRéalisation : aiguille adaptée, mouvements doux, tension adaptée de la lèvre, passages progressifs, contrôle régulier de l'homogénéité, chaîne d'hygiène complète.\nConsignes : appliquer le soin conseillé, ne pas mordiller ni arracher les peaux, éviter le soleil, les aliments très épicés ou très chauds au début, la piscine et le sauna ; couleur plus intense juste après la séance, qui s'atténue et s'unifie pendant la cicatrisation ; retouche après cicatrisation complète ; consignes écrites.\nBarème : précautions 4, couleur 6, contour 3, réalisation 4, consignes 3.",
    points: 20,
  },
  {
    titre: "Exercice 9 — C10 : créer des taches de rousseur naturelles",
    consigne:
      "Mme Clara NGUYEN, 27 ans, cliente fictive, phototype III, souhaite des taches de rousseur discrètes. 1. Décrivez la répartition naturelle des taches de rousseur et la zone que vous proposez. 2. Choisissez la ou les couleurs, la taille et la densité. 3. Décrivez le repérage, la validation et la réalisation sur peau latex 3D puis sur modèle. 4. Indiquez les erreurs à éviter et leurs conséquences. 5. Expliquez à la cliente l'évolution et l'entretien du résultat.",
    reponseAttendue:
      "Répartition : irrégulière, plus dense sur le nez et le haut des pommettes, qui s'éclaircit vers l'extérieur ; tailles et intensités variées ; zone validée avec la cliente.\nCouleurs : brun clair à brun moyen adapté à la carnation de phototype III, légèrement plus foncé que la peau, éventuellement deux nuances ; petites tailles variées ; densité discrète au départ, complétée si besoin à la retouche.\nRéalisation : points au crayon validés par la cliente dans un miroir, photo avant autorisée, dermographe avec pointe fine et effraction ponctuelle maîtrisée, profondeur jusqu'à la jonction dermo-épidermique sans la dépasser, contrôle régulier de l'aspect naturel ; entraînement préalable sur latex.\nErreurs : répartition en grille régulière ou taches identiques (effet artificiel), couleur trop foncée ou trop froide, effraction trop profonde (tache floue ou bleutée), densité excessive dès la première séance ; contre-indication : affection cutanée active sur la zone.\nÉvolution : atténuation progressive sur plusieurs années, variable selon la peau, le soleil et les soins ; protection solaire recommandée ; retouche après cicatrisation complète.\nBarème : répartition 4, couleurs et densité 4, réalisation 6, erreurs 3, évolution 3.",
    points: 20,
  },
  {
    titre: "Exercice 10 — C11 : soins post-prestation, retouche et bonnes pratiques",
    consigne:
      "Nadia FERRAND veut un protocole de suivi commun à toutes les prestations de l'Institut Ligne & Teint. 1. Décrivez les soins immédiats en fin de séance. 2. Rédigez la fiche de consignes post-prestation remise à la cliente. 3. Décrivez les étapes de la cicatrisation et le moment de la retouche. 4. Indiquez la conduite à tenir face à une rougeur persistante, une suspicion d'infection ou de réaction allergique. 5. Une cliente fictive se plaint d'un résultat asymétrique trois semaines après sa séance : décrivez votre gestion de la réclamation et ce que vous consignez sur sa fiche.",
    reponseAttendue:
      "Soins immédiats : nettoyage doux de la zone, application du soin conseillé, photo après avec autorisation, vérification du confort de la cliente, remise des consignes écrites et explication orale.\nFiche de consignes : conformément à l'information préalable prévue par l'arrêté du 3 décembre 2008, précautions à respecter après la réalisation : ne pas gratter ni arracher les croûtes, ne pas maquiller la zone, éviter le soleil, la piscine, le sauna et le hammam pendant la cicatrisation, appliquer uniquement le soin conseillé, coordonnées de l'institut, signes qui doivent conduire à consulter un médecin.\nCicatrisation : couleur intense puis atténuation, desquamation, cicatrisation de plusieurs semaines (environ 4 à 6) ; retouche après cicatrisation complète ; tenue de plusieurs années avec atténuation progressive, variable selon la peau, le soleil et les soins.\nComplications : orienter la cliente vers un médecin, ne pas poser de diagnostic ni délivrer de médicament, noter les numéros de lot du pigment et des aiguilles, signaler l'effet indésirable à l'ANSM, suspendre l'usage du lot si nécessaire.\nRéclamation : écoute sans contester, rappel que la cicatrisation n'est pas forcément terminée, observation et photo avec accord, comparaison avec le dessin validé, proposition d'une solution lors de la retouche, réponse écrite si besoin ; fiche complétée (date, constat, solution, suite) et conservée de façon sécurisée et limitée dans le temps (RGPD).\nBarème : soins immédiats 3, consignes 5, cicatrisation et retouche 4, complications 4, réclamation 4.",
    points: 20,
  },
];

// ---------------------------------------------------------------------------
// QCM par compétence (10 questions chacun)
// Format lu par le générateur d'exercices : « 1) … A) …   B) …   C) …   D) … » + « 1-B  2-C … ».
// Aucune parenthèse fermante après A, B, C ou D dans les énoncés (le parseur s'en servirait).
// ---------------------------------------------------------------------------
type Q = [question: string, options: [string, string, string, string], correct: 0 | 1 | 2 | 3];
const LETTRES = ["A", "B", "C", "D"] as const;

function qcmExercice(titre: string, questions: Q[]): AIContentExercise {
  const consigne =
    `Cochez la bonne réponse pour chacune des ${questions.length} questions :\n\n` +
    questions
      .map(([q, opts], i) => `${i + 1}) ${q}\n  ${opts.map((o, oi) => `${LETTRES[oi]}) ${o}`).join("   ")}`)
      .join("\n\n");
  const reponseAttendue = questions.map(([, , c], i) => `${i + 1}-${LETTRES[c]}`).join("  ");
  return { titre, consigne, reponseAttendue, points: questions.length };
}

const QCM_C1: Q[] = [
  ["L'entretien conseil sert d'abord à :", ["Vendre la prestation la plus chère", "Comprendre les attentes, les motivations et les habitudes de la cliente", "Choisir la couleur du fauteuil", "Remplir la facture"], 1],
  ["Une question ouverte permet :", ["De laisser la cliente exprimer librement ses attentes", "D'obtenir uniquement oui ou non", "De raccourcir l'entretien", "D'éviter l'écoute"], 0],
  ["Reformuler la demande de la cliente sert à :", ["La contredire", "Gagner du temps", "Vérifier que l'on a bien compris ses attentes", "Fixer le prix"], 2],
  ["L'analyse morphologique du visage permet :", ["De choisir le numéro de lot", "De remplir le bordereau DASRI", "De fixer la durée de cicatrisation", "D'adapter la forme proposée aux proportions du visage"], 3],
  ["Face à une cliente qui attend un résultat irréaliste, la professionnelle :", ["Explique les limites de la technique et propose une solution réaliste", "Promet le résultat demandé", "Refuse sans explication", "Augmente le prix"], 0],
  ["Parmi les habitudes de vie à questionner figurent :", ["Le nom de son employeur", "L'exposition au soleil, la piscine et les soins de peau", "Son revenu", "Ses opinions"], 1],
  ["Mme Laura VIDAL veut un effet naturel sur des sourcils clairsemés ; la technique souvent la plus adaptée est :", ["Un tracé plein très foncé", "Un eye-liner", "Le microblading poil à poil", "Des taches de rousseur"], 2],
  ["Pour une cliente porteuse d'un ancien maquillage permanent, il faut d'abord :", ["Repasser directement par-dessus", "Ignorer l'ancien travail", "Utiliser un pigment noir", "Observer la couleur, la densité et l'état de l'ancien pigment"], 3],
  ["Faire exprimer les motivations de la cliente permet notamment :", ["De repérer une demande influencée ou un besoin de réassurance", "De calculer la TVA", "De choisir l'aiguille", "De supprimer l'entretien"], 0],
  ["À l'issue de l'entretien, les besoins de la cliente sont :", ["Oubliés", "Notés sur la fiche cliente et validés avec elle", "Publiés sur les réseaux sociaux", "Transmis à l'ARS"], 1],
];

const QCM_C2: Q[] = [
  ["L'information préalable des clientes sur les risques et les précautions après réalisation est prévue par :", ["L'arrêté du 11 mars 2009", "L'arrêté du 3 décembre 2008", "Le règlement REACH", "Le règlement 2020/2081"], 1],
  ["Une cliente enceinte demande une prestation :", ["La prestation est reportée, avec renvoi vers l'avis de son médecin", "La prestation est réalisée sans précaution", "Il suffit d'utiliser un pigment clair", "La praticienne fournit un anesthésiant"], 0],
  ["Avant une prestation des lèvres chez une cliente ayant des antécédents d'herpès labial :", ["Rien de particulier n'est prévu", "On choisit un pigment plus foncé", "On demande un avis médical, avec un traitement préventif éventuel prescrit par le médecin", "La praticienne délivre un antiviral"], 2],
  ["La réalisation d'un maquillage permanent sur une mineure est :", ["Libre", "Interdite dans tous les cas", "Possible avec une simple pièce d'identité", "Interdite sans le consentement écrit d'une personne titulaire de l'autorité parentale ou du tuteur"], 3],
  ["Les données de santé notées sur la fiche cliente sont au sens du RGPD :", ["Des données sensibles à protéger", "Des données publiques", "Des données sans valeur", "Des données commerciales librement utilisables"], 0],
  ["Pour publier les photos avant et après d'une cliente, il faut :", ["Rien, elles appartiennent à l'institut", "Son autorisation écrite", "Les publier sans son prénom", "Attendre un an"], 1],
  ["L'offre personnalisée remise à la cliente précise :", ["Uniquement le prix", "Le nom des autres clientes", "La prestation, la technique, le prix, la retouche et les conditions", "Rien, elle est orale"], 2],
  ["Le consentement éclairé est recueilli :", ["Après la prestation", "Oralement uniquement", "Seulement pour le prix", "Par écrit, après information complète et avant la prestation"], 3],
  ["Une cliente sous traitement anticoagulant :", ["Nécessite un avis médical préalable", "Ne présente aucune précaution", "Aura une meilleure tenue", "Impose un pigment noir"], 0],
  ["L'évaluation de la peau porte notamment sur :", ["La couleur des yeux seulement", "Le type de peau, son épaisseur, sa sensibilité, les cicatrices et le phototype", "La taille de la cliente", "Sa profession"], 1],
];

const QCM_C3: Q[] = [
  ["L'hygiène des mains avant de mettre les gants repose sur :", ["Un rinçage à l'eau froide", "Une friction hydroalcoolique sur mains propres", "Aucune précaution", "Une crème hydratante"], 1],
  ["Aiguilles, cartouches et lames de microblading sont :", ["Stériles et à usage unique", "Réutilisables après rinçage", "Stérilisées à l'eau bouillante", "Partagées entre deux clientes le même jour"], 0],
  ["Une aiguille usagée est jetée :", ["Dans la poubelle ordinaire", "Dans un sac plastique fermé", "Dans un collecteur pour objets piquants-coupants", "Dans le lavabo"], 2],
  ["L'élimination des DASRI suppose :", ["Le dépôt avec les ordures ménagères", "Le brûlage sur place", "La remise à la cliente", "Une convention avec un prestataire de collecte et des bordereaux de suivi"], 3],
  ["Les bonnes pratiques d'hygiène et de salubrité du tatouage par effraction cutanée sont fixées par :", ["L'arrêté du 11 mars 2009", "L'arrêté du 3 décembre 2008", "Le règlement 2020/2081", "Le RGPD"], 0],
  ["Le dermographe et son cordon sont :", ["Laissés nus", "Protégés par une protection à usage unique changée à chaque cliente", "Rincés à l'eau", "Désinfectés une fois par mois"], 1],
  ["Les surfaces de travail sont désinfectées :", ["Une fois par semaine", "Jamais", "Entre chaque cliente", "Seulement si elles semblent sales"], 2],
  ["Pour accueillir Mme Yasmine BELKACEM, qui utilise un fauteuil roulant, on prévoit :", ["De refuser la prestation", "Un transfert imposé", "Une prestation debout", "L'accès, l'espace de circulation, une hauteur de travail adaptée et un transfert seulement s'il est souhaité"], 3],
  ["La traçabilité d'une prestation comprend :", ["Les numéros de lot des pigments et des aiguilles sur la fiche cliente", "Seulement le prénom de la cliente", "Aucune information", "Le seul montant payé"], 0],
  ["La formation aux conditions d'hygiène et de salubrité est :", ["Facultative", "Obligatoire pour exercer, avec un contenu fixé par l'arrêté du 12 décembre 2008", "Remplacée par un diplôme de coiffure", "Réservée aux médecins"], 1],
];

const QCM_C4: Q[] = [
  ["La première étape de la préparation de la zone est :", ["Piquer directement", "Démaquiller et nettoyer la zone", "Appliquer le pigment", "Encaisser la prestation"], 1],
  ["Avant toute effraction, la peau reçoit :", ["Une antisepsie cutanée", "Du parfum", "De l'eau du robinet", "Une crème grasse"], 0],
  ["Le dessin préparatoire sert à :", ["Remplacer la prestation", "Décorer la cabine", "Visualiser et valider la forme et l'emplacement avant toute effraction", "Choisir le prix"], 2],
  ["La symétrie des sourcils se contrôle :", ["À l'œil seul", "En copiant une photo de célébrité", "Avec le même gabarit pour toutes", "Avec des mesures au compas ou au fil et des repères morphologiques"], 3],
  ["Le dessin est validé :", ["Par la cliente dans un miroir avant de commencer", "Par la praticienne seule", "Après la prestation", "Jamais"], 0],
  ["Pour les lèvres, le tracé préparatoire :", ["Est inutile", "Délimite le contour en respectant la symétrie et le bord naturel", "Agrandit toujours les lèvres", "Est fait au pigment noir"], 1],
  ["Pour un eye-liner, la cliente est installée :", ["Debout", "Assise, les yeux grands ouverts", "Allongée, lentilles retirées, paupière délicatement tendue", "Avec ses lentilles"], 2],
  ["Pour des taches de rousseur, la préparation consiste à :", ["Tracer une grille régulière", "Dessiner une seule tache", "Couvrir tout le visage", "Repérer avec la cliente des points de répartition irrégulière et naturelle"], 3],
  ["Si la cliente n'est pas satisfaite du dessin :", ["On corrige le dessin jusqu'à sa validation", "On commence quand même", "On facture un supplément", "On annule la fiche"], 0],
  ["La photo avant la prestation :", ["Est inutile", "Est prise avec l'autorisation de la cliente pour le suivi", "Est publiée immédiatement", "Est remplacée par la photo après"], 1],
];

const QCM_C5: Q[] = [
  ["La classification des phototypes utilisée en dermopigmentation est celle de :", ["Pantone", "Fitzpatrick, de I à VI", "Glogau", "Munsell"], 1],
  ["Pour neutraliser un sourcil viré au gris-bleu, on utilise :", ["Un correcteur à dominante chaude, orangée, complémentaire du bleu", "Un pigment noir", "Un pigment bleu", "Un pigment blanc"], 0],
  ["Sur le cercle chromatique, la couleur complémentaire du rouge est :", ["Le bleu", "Le jaune", "Le vert", "Le violet"], 2],
  ["Un sous-ton froid se reconnaît à des reflets :", ["Dorés", "Orangés", "Cuivrés", "Rosés ou bleutés"], 3],
  ["Un virage vers le bleu ou le gris peut provenir :", ["D'une effraction trop profonde et d'un pigment trop froid ou trop chargé en noir", "D'une effraction trop superficielle seulement", "De la couleur des cheveux", "De la retouche"], 0],
  ["On distingue principalement les pigments :", ["Liquides et solides", "Organiques et inorganiques", "Sucrés et salés", "Mats et brillants"], 1],
  ["Pour des lèvres foncées de phototype V, on prévoit :", ["Un rouge vif direct", "Un pigment noir", "Une neutralisation préalable par un pigment chaud adapté, puis la couleur choisie", "Aucun pigment possible"], 2],
  ["L'étiquette d'un pigment conforme porte :", ["Aucune mention", "Seulement un prix", "Une marque manuscrite", "La mention « Mélange destiné à être utilisé dans des tatouages ou des maquillages permanents », les ingrédients et le numéro de lot"], 3],
  ["La restriction des substances dangereuses dans les encres de tatouage et de maquillage permanent s'applique depuis le 4 janvier 2022 en vertu du :", ["Règlement 2020/2081", "RGPD", "Arrêté du 11 mars 2009", "Code du travail"], 0],
  ["Les pigments Blue 15:3 et Green 7 sont restreints depuis le :", ["4 janvier 2021", "4 janvier 2023", "1er janvier 2020", "21 décembre 2026"], 1],
];

const QCM_C6: Q[] = [
  ["En maquillage semi-permanent, l'effraction vise :", ["L'hypoderme", "L'épiderme jusqu'à la jonction dermo-épidermique", "Le muscle", "La surface, sans effraction"], 1],
  ["Une effraction trop profonde entraîne :", ["Migration, flou et virage bleuté", "Une meilleure tenue garantie", "Une couleur plus claire et plus nette", "Aucun effet"], 0],
  ["Une effraction trop superficielle entraîne :", ["Une migration", "Une brûlure", "Une mauvaise tenue du pigment", "Un virage bleu"], 2],
  ["Le microblading est :", ["Une technique électrique", "Une technique au dermographe rotatif", "Une technique laser", "Une technique manuelle avec une lame stérile"], 3],
  ["L'ombré et le poudré sont réalisés :", ["En technique électrique, au dermographe", "En technique manuelle exclusivement", "Au scalpel", "Au laser"], 0],
  ["Tendre la peau sert à :", ["Faire mal", "Offrir une surface stable et régulière à l'effraction", "Raccourcir la séance", "Remplacer l'antisepsie"], 1],
  ["La configuration de l'aiguille ou de la cartouche est choisie :", ["Au hasard", "Identique pour toutes les zones", "Selon la zone et l'effet attendu", "Selon la couleur du pigment seulement"], 2],
  ["La vitesse et la pression sont :", ["Toujours maximales", "Fixes quelle que soit la zone", "Indépendantes de la peau", "Adaptées à la zone, à l'épaisseur de peau et à l'effet attendu"], 3],
  ["Sur une zone fine comme la paupière, on privilégie :", ["Des mouvements maîtrisés, une pression légère et une aiguille fine", "Une pression forte", "Une lame de microblading", "Une configuration large et rapide"], 0],
  ["Un nouveau réglage est d'abord testé :", ["Sur la peau de la cliente", "Sur peau latex 3D", "Sans test", "Sur une collègue sans précaution"], 1],
];

const QCM_C7: Q[] = [
  ["Le visagisme des sourcils repose sur trois repères :", ["Le prix, la durée, la couleur", "Le début, le point le plus haut de l'arche et la fin du sourcil", "La couleur des yeux, des cheveux et des lèvres", "La hauteur du front seulement"], 1],
  ["Pour des sourcils clairsemés et un effet naturel, on propose souvent :", ["Le microblading poil à poil", "Un tracé plein noir", "Un poudré très dense", "Des taches de rousseur"], 0],
  ["Sur une peau très grasse à pores dilatés, on préfère souvent :", ["Le microblading", "Une lame plus profonde", "La technique électrique poudrée", "Aucune technique"], 2],
  ["Pour corriger l'ancien maquillage viré au gris-bleu de Mme Martine LEROY, on :", ["Repasse en noir", "Ignore l'ancien travail", "Utilise un pigment bleu", "Neutralise avec un correcteur chaud puis recolore en brun"], 3],
  ["Un sourcil combiné associe :", ["Des traits manuels et un ombré électrique", "Deux pigments noirs", "Un sourcil et un eye-liner", "Deux séances le même jour"], 0],
  ["Les traits de microblading suivent :", ["Une ligne droite horizontale", "La direction naturelle de pousse des poils", "Le hasard", "Une direction verticale"], 1],
  ["Pendant la prestation, la praticienne :", ["Ne contrôle rien", "Contrôle seulement à la fin", "Nettoie régulièrement et vérifie homogénéité, profondeur et symétrie", "Laisse la cliente contrôler seule"], 2],
  ["Un effet ombré se caractérise par :", ["Des traits nets poil à poil", "Une ligne noire", "Des taches", "Un dégradé de densité, plus léger au début du sourcil"], 3],
  ["L'épreuve pratique devant le jury de certification comporte :", ["Une prestation en technique manuelle et une prestation en technique électrique", "Uniquement un QCM", "Une seule prestation", "Trois prestations des lèvres"], 0],
  ["Après la première séance de sourcils :", ["Le résultat est définitif", "Une retouche est prévue après cicatrisation complète", "La retouche a lieu le lendemain", "Aucune retouche n'est possible"], 1],
];

const QCM_C8: Q[] = [
  ["Un eye-liner ras de cils consiste à :", ["Tracer un trait épais étiré", "Pigmenter finement au plus près de la ligne ciliaire", "Réaliser une ombre à paupières", "Tracer un trait sous le sourcil"], 1],
  ["Mme Sophie MARCHAND porte des lentilles ; avant la prestation, elle doit :", ["Retirer ses lentilles", "Les garder", "En mettre une seconde paire", "Mettre des lunettes de soleil"], 0],
  ["Avant un eye-liner, demande un avis médical préalable :", ["Des cheveux colorés", "Une peau grasse", "Une infection oculaire ou une chirurgie récente des yeux", "Le port de lunettes"], 2],
  ["Concernant les produits anesthésiants relevant du médicament, la praticienne :", ["En injecte", "En prescrit", "En fournit", "N'en prescrit, n'en injecte et n'en fournit aucun et renvoie vers le médecin ou le pharmacien"], 3],
  ["Un trait étiré est :", ["Un prolongement vers l'extérieur adapté à la forme de l'œil", "Un trait au coin interne", "Un trait vertical", "Une tache"], 0],
  ["La sécurité de la zone oculaire impose :", ["Des mouvements rapides", "Des gestes lents et maîtrisés, un appui stable de la main et une cliente informée de ne pas bouger", "Une cliente debout", "Une aiguille large"], 1],
  ["La couleur d'un eye-liner est choisie :", ["Toujours rouge", "Toujours bleu", "Selon la carnation, les cheveux et le souhait de la cliente", "Au hasard"], 2],
  ["Pour une cliente presbyte, la validation du tracé se fait :", ["Sans miroir", "Après la prestation", "Par téléphone", "Avec un miroir grossissant ou ses lunettes"], 3],
  ["Après un eye-liner, la cliente :", ["Ne frotte pas et ne maquille pas la zone pendant la cicatrisation", "Applique du mascara aussitôt", "Va à la piscine le soir même", "Remet ses lentilles aussitôt"], 0],
  ["Un léger œdème après la séance :", ["Est un signe grave", "Est une réaction transitoire à surveiller ; on consulte en cas de douleur ou d'écoulement", "Impose de repasser", "Doit être déclaré à l'ARS"], 1],
];

const QCM_C9: Q[] = [
  ["L'effet « lip blush » correspond à :", ["Un contour noir", "Une couleur diffuse et naturelle sur l'ensemble des lèvres", "Un gommage", "Une exfoliation"], 1],
  ["Des antécédents d'herpès labial conduisent à :", ["Un avis médical, avec un traitement préventif éventuel prescrit par le médecin", "Aucune précaution", "Un pigment plus foncé", "La délivrance d'un antiviral par la praticienne"], 0],
  ["Le contour des lèvres :", ["Dépasse largement le bord naturel", "Est toujours noir", "Respecte le bord naturel et la symétrie, avec une correction légère validée par la cliente", "Ignore les asymétries"], 2],
  ["Pour des lèvres foncées, on commence par :", ["Un rose froid direct", "Un pigment noir", "Un pigment blanc", "Une neutralisation par un pigment chaud adapté"], 3],
  ["Le remplissage consiste à :", ["Pigmenter la surface des lèvres pour unifier la couleur", "Tracer seulement le contour", "Réaliser un eye-liner", "Gommer les lèvres"], 0],
  ["La zone des lèvres, fragile, demande :", ["Une pression forte", "Des mouvements doux et une tension adaptée", "Aucune antisepsie", "Une lame de microblading"], 1],
  ["Juste après la séance, la couleur des lèvres est :", ["Définitive", "Plus claire que le résultat final", "Plus intense qu'après cicatrisation", "Invisible"], 2],
  ["Pendant la cicatrisation des lèvres, la cliente :", ["Mordille ses lèvres", "S'expose au soleil", "Gomme ses lèvres", "N'arrache pas les peaux et applique le soin conseillé"], 3],
  ["Des injections esthétiques récentes sur la zone :", ["Doivent être signalées et conduisent à un avis médical préalable", "N'ont aucune incidence", "Améliorent la tenue", "Imposent un pigment différent"], 0],
  ["Sur un phototype V, le choix de la couleur des lèvres :", ["Ne demande aucune précaution", "Tient compte du sous-ton et du risque de virage, avec des tests de couleur", "Est toujours rouge", "Est toujours noir"], 1],
];

const QCM_C10: Q[] = [
  ["Une répartition naturelle de taches de rousseur est :", ["Une grille régulière", "Irrégulière, plus dense sur le nez et les pommettes, avec des tailles variées", "Des taches toutes identiques", "Limitée au front"], 1],
  ["Pour Mme Clara NGUYEN, phototype III, on choisit une couleur :", ["Brun clair à moyen, légèrement plus foncée que sa peau", "Noire", "Rouge", "Bleue"], 0],
  ["La taille des taches de rousseur est :", ["Grande", "Identique pour toutes", "Petite et variée", "Unique"], 2],
  ["Les taches de rousseur se réalisent :", ["À la lame de microblading", "Au laser", "Au stylo-feutre", "Au dermographe, par effraction ponctuelle maîtrisée"], 3],
  ["L'emplacement des taches est validé :", ["Par des points au crayon que la cliente valide dans un miroir", "Après la prestation", "Sans validation", "Par une autre cliente"], 0],
  ["Une effraction trop profonde donne :", ["Un meilleur résultat", "Une tache floue ou bleutée", "Une tache plus petite", "Une tache invisible"], 1],
  ["La densité recommandée lors de la première séance est :", ["Maximale", "Couvrant tout le visage", "Discrète, à compléter éventuellement à la retouche", "Sans importance"], 2],
  ["Contre-indique la réalisation sur la zone :", ["Un léger hâle", "Des cheveux roux", "Le port de lunettes", "Une affection cutanée active"], 3],
  ["Avec le temps, les taches de rousseur pigmentées :", ["S'atténuent progressivement sur plusieurs années, selon la peau, le soleil et les soins", "Restent définitives et identiques", "Disparaissent en une semaine", "Foncent toujours"], 0],
  ["Pour préserver le résultat, on recommande :", ["Aucune précaution", "Une protection solaire", "Les cabines UV", "Un gommage quotidien"], 1],
];

const QCM_C11: Q[] = [
  ["La cicatrisation après une séance de maquillage semi-permanent dure :", ["24 heures", "Plusieurs semaines, environ 4 à 6", "Un an", "Elle est immédiate"], 1],
  ["La retouche est réalisée :", ["Après cicatrisation complète", "Le lendemain", "Pendant la cicatrisation", "Jamais"], 0],
  ["Les consignes post-prestation sont :", ["Seulement orales", "Inutiles", "Remises par écrit à la cliente", "Envoyées un an après"], 2],
  ["En cas de suspicion d'infection, la praticienne :", ["Conseille de continuer les soins sans rien dire", "Repasse sur la zone", "Applique un autre pigment", "Oriente la cliente vers un médecin"], 3],
  ["Face à une réclamation, la praticienne :", ["Écoute, constate, propose une solution et consigne les échanges", "Ignore la cliente", "Supprime son avis en ligne", "Accuse la cliente"], 0],
  ["La tenue d'un maquillage semi-permanent est :", ["Définitive", "De plusieurs années avec une atténuation progressive variable", "D'un mois", "Fonction du prix payé"], 1],
  ["Après la prestation, la fiche cliente est :", ["Détruite", "Publiée", "Complétée et conservée de façon sécurisée et limitée dans le temps", "Remise à un autre institut"], 2],
  ["Pendant la cicatrisation, la cliente évite :", ["De boire de l'eau", "De dormir", "De se laver les mains", "De gratter la zone, le soleil, la piscine, le sauna et le maquillage sur la zone"], 3],
  ["Le suivi de la cliente comprend :", ["Un rendez-vous de retouche planifié et des photos de suivi autorisées", "Aucun contact", "Un contact seulement en cas de plainte", "Des messages publicitaires quotidiens"], 0],
  ["En cas de réaction allergique suspectée après la prestation, la praticienne :", ["La cache", "Oriente vers un médecin, note le numéro de lot du pigment et signale l'effet indésirable à l'ANSM", "Prescrit un médicament", "Repasse avec un autre pigment"], 1],
];

export const MSP21_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM C1 — Identifier les besoins de la cliente", QCM_C1),
  qcmExercice("QCM C2 — Réaliser une évaluation personnalisée de la peau de la cliente, personnaliser son offre commerciale et remettre les documents légaux", QCM_C2),
  qcmExercice("QCM C3 — Préparer son poste de travail, en tenant compte d'une éventuelle situation de handicap (la sienne ou celle de la cliente) et respecter les règles d'hygiène", QCM_C3),
  qcmExercice("QCM C4 — Préparer la zone à traiter (sourcils, eye-liner, lèvres, taches de rousseur…)", QCM_C4),
  qcmExercice("QCM C5 — Sélectionner les pigments adaptés au phototype de la cliente en appliquant les règles de colorimétrie", QCM_C5),
  qcmExercice("QCM C6 — Sélectionner le dermographe, la taille des aiguilles et la vitesse d'effraction en fonction de la zone à traiter et de l'effet attendu, et adapter son mouvement et sa pression sur la zone", QCM_C6),
  qcmExercice("QCM C7 — Réaliser une correction ou un embellissement des sourcils", QCM_C7),
  qcmExercice("QCM C8 — Réaliser un embellissement des yeux en dessinant un eye-liner", QCM_C8),
  qcmExercice("QCM C9 — Réaliser une correction ou un embellissement des lèvres", QCM_C9),
  qcmExercice("QCM C10 — Créer des taches de rousseur", QCM_C10),
  qcmExercice("QCM C11 — Procéder aux soins post-prestation et communiquer les bonnes pratiques", QCM_C11),
];

/**
 * Ordre volontaire : les 10 mises en situation d'abord (diagnostic puis C1 à C11), alignées sur les
 * 10 questions de positionnement ; les 11 QCM ensuite.
 */
export const MSP21_EXERCICES_COMPLETS: AIContentExercise[] = [...MSP21_EXERCICES, ...MSP21_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Techniques de maquillage semi-permanent (RS6459) »</strong> : cadre réglementaire et sanitaire, compétences C1 à C11, modalités de la certification ; fiches techniques par zone (sourcils, eye-liner, lèvres, taches de rousseur) ; fil rouge Institut Ligne & Teint (institut fictif).</li>
  <li><strong>Cahier d'exercices</strong> : test de positionnement, 10 mises en situation professionnelles (diagnostic de départ puis C1 à C11) ; <strong>corrigés formatrice</strong> remis après correction.</li>
  <li><strong>11 QCM de 10 questions</strong>, un par compétence (C1 à C11), corrigés en séance.</li>
  <li><strong>Grille d'évaluation des prestations</strong> (technique manuelle et technique électrique) et grille d'autoévaluation, critères par compétence, sur le modèle des épreuves de la certification.</li>
  <li><strong>Modèles de documents</strong> : fiche cliente, document d'information préalable sur les risques et les précautions, consentement éclairé, autorisation photo, devis, fiche de consignes post-prestation, fiche de traçabilité des lots, check-list d'hygiène du poste.</li>
  <li><strong>Planches de colorimétrie</strong> : cercle chromatique, phototypes de Fitzpatrick I à VI, sous-tons, tableaux de neutralisation.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Salle de dermopigmentation</strong> conforme à l'arrêté du 11 mars 2009 : fauteuil ou table réglable, éclairage adapté avec lampe loupe, point d'eau, surfaces lessivables.</li>
  <li><strong>Matériel technique</strong> : dermographes rotatifs et à cartouches, aiguilles et cartouches stériles à usage unique, lames de microblading stériles à usage unique, protections à usage unique du dermographe et du cordon, godets, gants, champs, antiseptique cutané.</li>
  <li><strong>Pigments</strong> conformes au règlement REACH et au règlement (UE) 2020/2081, étiquetés, numéros de lot reportés sur les fiches de traçabilité.</li>
  <li><strong>Supports d'entraînement</strong> : peaux latex 3D (sourcils, yeux, lèvres, visage), papier de dessin, compas et fil de mesure ; modèles volontaires informés.</li>
  <li><strong>Gestion des déchets</strong> : collecteurs pour objets piquants-coupants, filière DASRI avec convention et bordereaux de suivi.</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>Légifrance</strong> : <a href="https://www.legifrance.gouv.fr/">https://www.legifrance.gouv.fr/</a> — Code de la santé publique (articles R1311-1 à R1311-13), arrêtés du 3 décembre 2008, du 12 décembre 2008 et du 11 mars 2009.</li>
  <li><strong>France Compétences — fiche RS6459</strong> : <a href="https://www.francecompetences.fr/recherche/rs/6459/">https://www.francecompetences.fr/recherche/rs/6459/</a> — compétences attestées, modalités d'évaluation et certificateurs de la certification « Techniques de maquillage semi-permanent ».</li>
  <li><strong>ANSM</strong> : <a href="https://ansm.sante.fr/">https://ansm.sante.fr/</a> — surveillance des produits de tatouage et signalement des effets indésirables.</li>
  <li><strong>ECHA</strong> : <a href="https://echa.europa.eu/">https://echa.europa.eu/</a> — règlement REACH et restriction des substances dangereuses dans les encres de tatouage et de maquillage permanent.</li>
  <li><strong>Règlement (UE) 2020/2081</strong> : <a href="https://eur-lex.europa.eu/eli/reg/2020/2081/oj">https://eur-lex.europa.eu/eli/reg/2020/2081/oj</a> — texte officiel de la restriction applicable aux encres de tatouage et de maquillage permanent.</li>
  <li><strong>Agences régionales de santé</strong> : <a href="https://www.ars.sante.fr/">https://www.ars.sante.fr/</a> — déclaration de l'activité de tatouage et de maquillage permanent.</li>
  <li><strong>CNIL</strong> : <a href="https://www.cnil.fr/">https://www.cnil.fr/</a> — RGPD, données de santé et tenue d'un fichier clients.</li>
</ul>`;

const MSP21_VIDEOS = [
  { title: "Microblading : le geste poil à poil", description: "Direction des traits, densité et tension de la peau.", url: "https://www.youtube.com/results?search_query=microblading+sourcils+poil+%C3%A0+poil+technique" },
  { title: "Sourcils poudrés au dermographe", description: "Ombré, poudré et dégradé de densité.", url: "https://www.youtube.com/results?search_query=sourcils+poudr%C3%A9s+dermographe+maquillage+semi-permanent" },
  { title: "Colorimétrie en dermopigmentation", description: "Phototypes, sous-tons et neutralisation.", url: "https://www.youtube.com/results?search_query=colorim%C3%A9trie+dermopigmentation+neutralisation+pigments" },
  { title: "Visagisme des sourcils", description: "Repères morphologiques et symétrie.", url: "https://www.youtube.com/results?search_query=visagisme+sourcils+mesure+sym%C3%A9trie+maquillage+permanent" },
  { title: "Eye-liner ras de cils", description: "Installation, sécurité de la zone oculaire et geste.", url: "https://www.youtube.com/results?search_query=eye-liner+ras+de+cils+maquillage+semi-permanent" },
  { title: "Lèvres : contour, remplissage et lip blush", description: "Neutralisation des lèvres foncées et choix de la couleur.", url: "https://www.youtube.com/results?search_query=lip+blush+l%C3%A8vres+maquillage+semi-permanent+neutralisation" },
  { title: "Taches de rousseur en dermopigmentation", description: "Répartition naturelle, couleur et taille.", url: "https://www.youtube.com/results?search_query=taches+de+rousseur+maquillage+semi-permanent+freckles" },
  { title: "Hygiène et salubrité en tatouage et maquillage permanent", description: "Chaîne d'hygiène, matériel stérile et DASRI.", url: "https://www.youtube.com/results?search_query=hygi%C3%A8ne+salubrit%C3%A9+tatouage+maquillage+permanent+DASRI" },
  { title: "Soins post-prestation et cicatrisation", description: "Consignes à remettre et étapes de la cicatrisation.", url: "https://www.youtube.com/results?search_query=cicatrisation+soins+apr%C3%A8s+maquillage+semi-permanent" },
  { title: "Encres de tatouage : la restriction européenne", description: "Règlement REACH et substances restreintes.", url: "https://echa.europa.eu/" },
];

export const MSP21_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: MSP21_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: MSP21_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement début / fin
// ---------------------------------------------------------------------------
export const MSP21_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "Le maquillage permanent est, au sens du Code de la santé publique :", options: ["Une technique de tatouage par effraction cutanée", "Un simple maquillage cosmétique", "Un acte de coiffure", "Un soin sans effraction"], correctIndex: 0 },
  { question: "Pour exercer le maquillage permanent, il faut notamment :", options: ["Un diplôme de médecine", "Avoir suivi la formation aux conditions d'hygiène et de salubrité et déclarer l'activité à l'ARS", "Aucune formation", "Une simple inscription sur un réseau social"], correctIndex: 1 },
  { question: "Le microblading est une technique :", options: ["Électrique", "Laser", "Manuelle", "Chimique"], correctIndex: 2 },
  { question: "Les aiguilles utilisées pour une prestation sont :", options: ["Réutilisables", "Désinfectées à l'alcool entre deux clientes", "Rincées à l'eau", "Stériles et à usage unique"], correctIndex: 3 },
  { question: "Avant la prestation, la cliente reçoit :", options: ["Une information sur les risques et les précautions à respecter après la réalisation", "Uniquement la facture", "Aucun document", "Un bon de réduction"], correctIndex: 0 },
  { question: "Le phototype d'une cliente désigne :", options: ["Sa couleur de cheveux", "La réaction de sa peau au soleil et sa carnation", "Son groupe sanguin", "La forme de son visage"], correctIndex: 1 },
  { question: "Une aiguille usagée est éliminée :", options: ["Dans la poubelle ordinaire", "Dans un sac en papier", "Dans un collecteur pour objets piquants-coupants de la filière DASRI", "Dans les toilettes"], correctIndex: 2 },
  { question: "Après une séance, la retouche se fait :", options: ["Le lendemain", "Pendant la séance suivante d'épilation", "Jamais", "Après cicatrisation complète"], correctIndex: 3 },
  { question: "Une cliente enceinte souhaite une prestation : la praticienne", options: ["Reporte la prestation et la renvoie vers l'avis de son médecin", "Réalise la prestation normalement", "Utilise un pigment plus clair", "Lui fournit un anesthésiant"], correctIndex: 0 },
  { question: "Les pigments de maquillage permanent vendus dans l'Union européenne doivent respecter :", options: ["Aucune règle", "Le règlement REACH et la restriction du règlement (UE) 2020/2081", "Seulement le Code de la route", "Le règlement sur l'intelligence artificielle"], correctIndex: 1 },
];

export const MSP21_QCM_FIN: AIQCMQuestion[] = [
  { question: "La profondeur d'effraction visée est :", options: ["L'épiderme jusqu'à la jonction dermo-épidermique", "L'hypoderme", "Le muscle", "La surface sans effraction"], correctIndex: 0 },
  { question: "Le texte qui fixe les bonnes pratiques d'hygiène et de salubrité du tatouage par effraction cutanée est :", options: ["L'arrêté du 3 décembre 2008", "L'arrêté du 11 mars 2009", "Le règlement (UE) 2020/2081", "Le RGPD"], correctIndex: 1 },
  { question: "Pour neutraliser un ancien sourcil viré au gris-bleu, on utilise :", options: ["Un pigment noir", "Un pigment bleu", "Un correcteur à dominante chaude, orangée", "Un pigment blanc"], correctIndex: 2 },
  { question: "La réalisation sur une mineure est interdite :", options: ["Dans tous les cas", "Seulement le dimanche", "Jamais", "Sans le consentement écrit d'une personne titulaire de l'autorité parentale ou du tuteur"], correctIndex: 3 },
  { question: "Les pigments Blue 15:3 et Green 7 sont restreints depuis le :", options: ["4 janvier 2023", "4 janvier 2022", "11 mars 2009", "21 décembre 2026"], correctIndex: 0 },
  { question: "Avant une prestation des lèvres chez une cliente sujette à l'herpès labial :", options: ["Aucune précaution n'est nécessaire", "Un avis médical est demandé, avec un traitement préventif éventuel prescrit par le médecin", "La praticienne délivre un antiviral", "On choisit un pigment plus foncé"], correctIndex: 1 },
  { question: "Un sourcil combiné associe :", options: ["Deux couleurs noires", "Un sourcil et un eye-liner", "Des traits manuels et un ombré électrique", "Deux séances le même jour"], correctIndex: 2 },
  { question: "La traçabilité d'une prestation impose de noter sur la fiche cliente :", options: ["La météo du jour", "Le nom des autres clientes", "Le seul prix payé", "Les numéros de lot des pigments et des aiguilles"], correctIndex: 3 },
  { question: "L'épreuve devant le jury de la certification RS6459 comporte :", options: ["Deux prestations, l'une en technique manuelle, l'autre en technique électrique", "Uniquement un entretien oral", "Une prestation sur papier", "Trois prestations sur peau latex uniquement"], correctIndex: 0 },
  { question: "Les photos avant et après d'une cliente peuvent être publiées :", options: ["Librement", "Avec son autorisation écrite", "Si son visage est recadré", "Après un an"], correctIndex: 1 },
];

export const MSP21_EVAL_PACK: AIEvalPack = {
  qcmDebut: MSP21_QCM_DEBUT,
  qcmFin: MSP21_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin du jour 2) — l'embellissement des sourcils de Mme Laura VIDAL",
    contexte:
      "Cas fictif. Mme Laura VIDAL, 34 ans, phototype II à sous-ton froid, se présente à l'Institut Ligne & Teint pour des sourcils clairsemés et asymétriques après des années d'épilation excessive ; elle souhaite un effet naturel. Elle signale lors de l'entretien qu'elle pratique la natation deux fois par semaine et qu'elle a eu des injections esthétiques sur le front récemment.",
    questions: [
      { question: "Quelles informations de l'entretien demandent une précaution et quelle conduite adoptez-vous ?", reponseAttendue: "Les injections esthétiques récentes sur la zone : signaler et demander un avis médical préalable avant toute prestation, sans poser de diagnostic, quitte à reporter. La natation : informer la cliente qu'il faudra éviter la piscine pendant la cicatrisation et planifier la séance en conséquence. Vérifier les autres contre-indications (grossesse, anticoagulants, troubles de la cicatrisation, affection cutanée, allergies) et noter les réponses sur la fiche cliente.", points: 5 },
      { question: "Quelle technique et quel pigment proposez-vous ? Justifiez.", reponseAttendue: "Microblading poil à poil, éventuellement combiné avec un ombré léger sur la queue du sourcil, pour un effet naturel sur des sourcils clairsemés ; pigment brun adapté au phototype II et au sous-ton froid, sans dominante grise ou trop chargée en noir pour limiter le risque de virage ; test de couleur sans effraction ; pigment étiqueté avec son numéro de lot.", points: 5 },
      { question: "Décrivez la préparation de la zone et du poste.", reponseAttendue: "Poste désinfecté, hygiène des mains, champ et matériel stériles à usage unique ouverts devant la cliente, lame de microblading stérile, protection du matériel, gants ; démaquillage, antisepsie, mesures au compas ou au fil (départ, arche, fin), dessin préparatoire, contrôle de la symétrie, validation par la cliente dans un miroir, photo avant avec autorisation écrite.", points: 5 },
      { question: "Quels documents et quelles explications remettez-vous à la cliente avant et après la séance ?", reponseAttendue: "Avant : information préalable écrite sur les risques et les précautions à respecter après la réalisation (arrêté du 3 décembre 2008), consentement éclairé signé, devis, autorisation photo distincte. Après : consignes écrites (ne pas gratter, ne pas maquiller la zone, éviter soleil, piscine et sauna), cicatrisation de plusieurs semaines (environ 4 à 6), retouche après cicatrisation complète, tenue de plusieurs années avec atténuation progressive ; numéros de lot reportés sur la fiche.", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation de fin de formation — QCM et études de cas, mise en situation professionnelle observée avec grille (jour 3)",
    exercices: [
      {
        titre: "Partie 1 — QCM et étude de cas : besoins, évaluation de la peau et documents légaux (C1, C2)",
        consigne: "À partir du dossier fictif tiré au sort (une cliente de l'Institut Ligne & Teint), répondez au QCM de fin puis présentez la trame d'entretien, l'évaluation de la peau, les contre-indications et précautions, l'offre personnalisée et les documents légaux à remettre.",
        reponseAttendue: "Besoins identifiés par des questions ouvertes et reformulés, morphologie analysée ; peau, phototype et contre-indications évalués avec renvoi vers l'avis médical quand il le faut ; offre et devis cohérents ; information préalable, consentement éclairé, fiche cliente conforme au RGPD, autorisation photo et règle applicable aux mineures exactes. Critères de la grille : pertinence de l'entretien, sécurité, exactitude réglementaire.",
        points: 20,
      },
      {
        titre: "Partie 2 — Étude de cas : poste de travail, hygiène et préparation de la zone (C3, C4)",
        consigne: "Pour la cliente du dossier, présentez l'installation du poste (y compris l'adaptation à une situation de handicap si le dossier le prévoit), la chaîne d'hygiène, le circuit des DASRI, la traçabilité, puis préparez la zone à traiter.",
        reponseAttendue: "Chaîne d'hygiène complète et dans l'ordre, matériel stérile à usage unique, protection du dermographe, désinfection des surfaces, DASRI conformes, lots tracés ; poste adapté ; démaquillage, antisepsie, mesures, dessin préparatoire validé par la cliente. Critères de la grille : conformité à l'arrêté du 11 mars 2009, précision du tracé, adaptation.",
        points: 20,
      },
      {
        titre: "Partie 3 — Étude de cas : colorimétrie et choix du matériel (C5, C6)",
        consigne: "Pour Mme Martine LEROY (ancien maquillage des sourcils viré au gris-bleu) et Mme Aïcha DIALLO (lèvres foncées de phototype V), choisissez la stratégie de neutralisation et les pigments, puis le dermographe, la configuration d'aiguille, la vitesse, la profondeur et le geste.",
        reponseAttendue: "Neutralisations justifiées par le cercle chromatique (correcteur chaud sur le gris-bleu, pigment chaud adapté avant la couleur des lèvres), pigments conformes et tracés ; réglages adaptés à la zone ; profondeur jusqu'à la jonction dermo-épidermique ; conséquences d'une effraction trop profonde ou trop superficielle expliquées. Critères de la grille : justesse colorimétrique, cohérence des réglages.",
        points: 20,
      },
      {
        titre: "Partie 4 — Cas pratiques sur peau latex 3D : eye-liner, lèvres et taches de rousseur (C8, C9, C10)",
        consigne: "Réalisez sur peau latex 3D un eye-liner ras de cils, un contour avec remplissage des lèvres et une zone de taches de rousseur, en verbalisant les règles de sécurité propres à chaque zone.",
        reponseAttendue: "Eye-liner fin et régulier au ras des cils, sécurité de la zone oculaire maîtrisée ; contour symétrique respectant le bord naturel, remplissage homogène ; taches de rousseur de répartition irrégulière, tailles variées, couleur adaptée. Critères de la grille : précision, régularité, sécurité, rendu naturel.",
        points: 20,
      },
      {
        titre: "Partie 5 — Mise en situation professionnelle : prestation en technique manuelle (C7)",
        consigne: "Réalisez sur modèle volontaire, ou à défaut sur peau latex 3D, un embellissement des sourcils en microblading, de l'accueil à la remise des consignes, observé par la formatrice avec la grille d'évaluation.",
        reponseAttendue: "Dessin validé, traits fins dans la direction de pousse, densité et symétrie maîtrisées, profondeur régulière, pigment adapté, chaîne d'hygiène respectée de bout en bout. Critères de la grille : rendu, maîtrise du geste, hygiène, relation avec la cliente.",
        points: 20,
      },
      {
        titre: "Partie 6 — Mise en situation professionnelle : prestation en technique électrique et soins post-prestation (C7, C11)",
        consigne: "Réalisez sur modèle volontaire, ou à défaut sur peau latex 3D, un sourcil ombré ou poudré au dermographe, puis effectuez les soins post-prestation, remettez et expliquez les consignes écrites et planifiez la retouche. Le passage devant le jury de certification de 3 professionnels externes, avec 2 prestations (technique manuelle et technique électrique), a lieu selon le calendrier du certificateur.",
        reponseAttendue: "Dégradé de densité régulier, réglages adaptés, profondeur maîtrisée ; soins immédiats, consignes écrites complètes, cicatrisation et retouche expliquées, conduite à tenir en cas de complication (orientation vers un médecin, numéros de lot, signalement à l'ANSM), fiche cliente complétée. Critères de la grille : rendu, maîtrise du geste, qualité du suivi.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const MSP21_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — Code de la santé publique",
      titre: "Tatouage par effraction cutanée et maquillage permanent : articles R1311-1 à R1311-13 du Code de la santé publique",
      date: "Janvier 2025",
      commentaire: "Relecture des dispositions applicables aux techniques de tatouage par effraction cutanée, y compris le maquillage permanent : déclaration de l'activité auprès du directeur général de l'ARS, formation aux conditions d'hygiène et de salubrité obligatoire, règle applicable aux mineures (consentement écrit d'une personne titulaire de l'autorité parentale ou du tuteur).",
      exploitation: "Preuve : fiche mémo datée archivée au dossier Qualiopi. Action : mise à jour de la séquence « cadre réglementaire » du jour 1 et des corrigés des exercices 1 et 2.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — arrêtés de 2008 et 2009",
      titre: "Arrêtés du 3 décembre 2008, du 12 décembre 2008 et du 11 mars 2009 : information préalable, formation hygiène et salubrité, bonnes pratiques",
      date: "Février 2025",
      commentaire: "Vérification de la version en vigueur des trois arrêtés : information préalable des clientes sur les risques et les précautions après réalisation (affichage et document remis), contenu de la formation hygiène et salubrité de 21 h, bonnes pratiques d'hygiène et de salubrité du poste de travail.",
      exploitation: "Preuve : extraits archivés. Action : actualisation des modèles d'information préalable et de consignes post-prestation, de l'exercice 3 et du QCM C3.",
    },
    {
      lien: "https://eur-lex.europa.eu/eli/reg/2020/2081/oj",
      titreLien: "EUR-Lex — règlement (UE) 2020/2081",
      titre: "Encres de tatouage et de maquillage permanent : restriction REACH applicable depuis le 4 janvier 2022",
      date: "Mars 2025",
      commentaire: "Le règlement (UE) 2020/2081 modifie l'annexe XVII du règlement REACH (CE) n° 1907/2006 et restreint les substances dangereuses dans les mélanges destinés aux tatouages et aux maquillages permanents depuis le 4 janvier 2022 ; les pigments Blue 15:3 et Green 7 sont restreints depuis le 4 janvier 2023 ; étiquetage obligatoire (mention dédiée, ingrédients, numéro de lot).",
      exploitation: "Preuve : note de veille datée. Action : contrôle des étiquettes des pigments du stock pédagogique, mise à jour de l'exercice 4 et du QCM C5.",
    },
    {
      lien: "https://ansm.sante.fr/",
      titreLien: "ANSM",
      titre: "Produits de tatouage : surveillance du marché et signalement des effets indésirables",
      date: "Avril 2025",
      commentaire: "Suivi des informations de l'ANSM sur les produits de tatouage, définis par le Code de la santé publique (articles L513-10-1 et suivants) : surveillance, retraits éventuels de lots, modalités de signalement des effets indésirables par les professionnelles.",
      exploitation: "Preuve : journal de veille. Action : mise à jour de la conduite à tenir en cas de complication (exercice 10, QCM C11).",
    },
    {
      lien: "https://www.francecompetences.fr/recherche/rs/6459/",
      titreLien: "France Compétences — fiche RS6459",
      titre: "Certification RS6459 « Techniques de maquillage semi-permanent » : échéance d'enregistrement au 21/12/2026",
      date: "Mai 2025",
      commentaire: "La certification est enregistrée au Répertoire spécifique jusqu'au 21/12/2026 (dernière délivrance possible au 21/06/2027). Le renouvellement de l'enregistrement par les certificateurs est à surveiller, ainsi que toute évolution des compétences attestées ou des modalités d'évaluation.",
      exploitation: "Preuve : capture datée de la fiche. Action : vérification à chaque session de l'état de la fiche ; information des stagiaires sur le calendrier ; alerte de la direction pour anticiper une éventuelle bascule vers une nouvelle fiche.",
    },
  ],
  metier: [
    {
      lien: "https://www.francecompetences.fr/recherche/rs/6459/",
      titreLien: "France Compétences — fiche RS6459",
      titre: "Compétences attestées et modalités d'évaluation : alignement du programme",
      date: "Juin 2025",
      commentaire: "Relecture des 11 compétences et des modalités d'évaluation (QCM et études de cas, cas pratiques sur peau latex 3D et sur modèle, jury de 3 professionnels externes, 2 prestations en technique manuelle et électrique) pour vérifier l'alignement du programme et des grilles.",
      exploitation: "Preuve : tableau de correspondance compétences / séquences daté. Action : ajustement des grilles d'évaluation de la partie 5 et de la partie 6 de l'évaluation de fin de formation.",
    },
    {
      lien: "https://www.ars.sante.fr/",
      titreLien: "Agences régionales de santé",
      titre: "Déclaration de l'activité de tatouage et de maquillage permanent auprès de l'ARS",
      date: "Juillet 2025",
      commentaire: "Suivi des modalités de déclaration de l'activité auprès du directeur général de l'ARS, utile aux stagiaires qui ouvrent leur espace de dermopigmentation, comme Nadia FERRAND dans le fil rouge.",
      exploitation: "Preuve : note de veille. Action : mise à jour de la check-list d'installation remise en fin de formation.",
    },
    {
      lien: "https://www.cnil.fr/",
      titreLien: "CNIL",
      titre: "Fichier clients et données de santé en institut de beauté",
      date: "Août 2025",
      commentaire: "Rappel des règles du RGPD applicables à la fiche cliente : données de santé considérées comme sensibles, consentement, information, conservation limitée, sécurité ; droit à l'image pour les photos avant et après.",
      exploitation: "Preuve : extrait archivé. Action : actualisation du modèle de fiche cliente et de l'autorisation photo, exercice 2.",
    },
  ],
  technologique: [
    {
      lien: "https://echa.europa.eu/",
      titreLien: "ECHA",
      titre: "Pigments conformes et alternatives aux pigments restreints",
      date: "Septembre 2025",
      commentaire: "Suivi des informations de l'Agence européenne des produits chimiques sur la restriction des encres de tatouage et de maquillage permanent, utile pour comprendre l'évolution des gammes de pigments proposées par les fabricants depuis 2022 et 2023.",
      exploitation: "Preuve : synthèse archivée. Action : mise à jour des planches de colorimétrie et du chapitre C5.",
    },
    {
      lien: "https://ansm.sante.fr/",
      titreLien: "ANSM",
      titre: "Matériel et produits : informations de sécurité",
      date: "Octobre 2025",
      commentaire: "Veille sur les informations de sécurité publiées concernant les produits de tatouage ; vérification systématique des numéros de lot du stock pédagogique en cas d'alerte.",
      exploitation: "Preuve : journal de veille. Action : rappel de la procédure de traçabilité dans l'exercice 3.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — DASRI",
      titre: "Gestion des déchets d'activités de soins à risques infectieux (articles R1335-1 et suivants du CSP)",
      date: "Novembre 2025",
      commentaire: "Relecture des règles de tri à la source, de conditionnement dans un collecteur pour objets piquants-coupants, de convention avec un prestataire de collecte et de tenue des bordereaux de suivi.",
      exploitation: "Preuve : extrait archivé. Action : mise à jour de la check-list d'hygiène du poste et du QCM C3.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedMSP21AICaches(f: FormationInfo = FORMATION_MSP21): void {
  try {
    setCachedContentPack(f, MSP21_CONTENT_PACK);
    setCachedEvalPack(f, MSP21_EVAL_PACK);
    setCachedVeillePack(f, MSP21_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
