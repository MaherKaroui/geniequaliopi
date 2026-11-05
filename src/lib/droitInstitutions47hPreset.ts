/**
 * Preset complet « Enseignement : fondamentaux du droit et des institutions » — formation professionnelle
 * NON certifiante (autres formations professionnelles), évaluation interne uniquement.
 * Données de l'organisme (bilan pédagogique et financier 2025 et contrat de formation) :
 * 47 heures, 100 % à distance en classe virtuelle (Google Meet / Zoom), formateur unique,
 * tarif 3 667 € (TVA non applicable, art. 261-4-4° a du CGI), aucun prérequis juridique (français B2
 * recommandé), délai d'accès de 14 jours après validation de la préinscription et réception du dossier complet.
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - 6 modules (C1 à C6 = modules 1 à 6 : 8 h, 8 h, 8 h, 8 h, 8 h, 7 h)
 *  - cas pratiques FICTIFS (personnes et situations fictives : Camille, la commune de Valmont-sur-Seine,
 *    l'entreprise Atelier Valmontais)
 *  - AUCUN stagiaire pré-importé
 *  - Pack contenu : analyse des besoins, 10 mises en situation corrigées et 6 QCM de 10 questions,
 *    un par compétence
 *  - Pack évaluation : QCM de positionnement de début (10 questions), QCM de fin (12 questions),
 *    cas pratique intermédiaire, évaluation finale interne
 *  - Pack veille (réglementaire / métier / technologique)
 * Droit français en vigueur au 1er novembre 2026. Attestation de fin de formation et certificat de
 * réalisation. Le support de cours (6 chapitres) est dans `droitInstitutions47h/` ; les réponses
 * propres à chaque stagiaire dans `droitInstitutions47hHumanized.ts`. Aucune donnée de satisfaction n'est pré-remplie.
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
export const FORMATION_DRI47: FormationInfo = {
  intitule: "Enseignement : fondamentaux du droit et des institutions",
  codeRNCP: "",
  objectifs:
    "Formation professionnelle non certifiante. Objectif général : acquérir les bases du droit et du fonctionnement des institutions françaises et européennes, pour comprendre d'où vient une règle, qui la fait, qui l'applique et devant quel juge la contester.\nÀ l'issue de la formation, le stagiaire sera capable de :\n- C1 — Expliquer ce qu'est une règle de droit, identifier ses sources et les situer dans la hiérarchie des normes.\n- C2 — Distinguer les branches du droit (public, privé, droit de l'Union européenne, droit international) et qualifier une situation juridique simple.\n- C3 — Décrire l'organisation des pouvoirs sous la Constitution de la Ve République et le rôle de chaque institution.\n- C4 — Expliquer le fonctionnement des institutions politiques et territoriales, les droits du citoyen et la protection des libertés fondamentales.\n- C5 — Articuler l'ordre juridique interne avec le droit de l'Union européenne et les traités internationaux.\n- C6 — Identifier la juridiction compétente pour un litige et les voies de recours ouvertes.",
  prerequis: "Aucun prérequis juridique. Un niveau de français B2 est recommandé pour la lecture de textes juridiques.",
  duree: "47 heures",
  dureeSaisiePrioritaire: true,
  modalites: "distanciel",
  tarif: "3 667 € (TVA non applicable, art. 261-4-4° a du CGI)",
  programme:
    "Module 1 — Fondements du droit, sources et hiérarchie des normes (C1, 8 h) : QCM de positionnement ; notion de règle de droit, droit objectif et droits subjectifs ; sources du droit (Constitution, traités, loi, règlement, jurisprudence, coutume, doctrine) ; pyramide de Kelsen et bloc de constitutionnalité (Constitution de 1958, Déclaration des droits de l'homme et du citoyen de 1789, Préambule de 1946, Charte de l'environnement de 2004, principes fondamentaux reconnus par les lois de la République) ; contrôle de constitutionnalité et de conventionnalité ; domaine de la loi et du règlement (articles 34 et 37), ordonnances (article 38) ; publication au Journal officiel, entrée en vigueur, non-rétroactivité ; recherche sur Légifrance ; mises en situation 1 et 2 ; QCM C1.\nModule 2 — Les branches du droit (C2, 8 h) : droit public (constitutionnel, administratif, finances publiques, fiscal) et droit privé (civil, commercial, travail), droit pénal et procédure ; droit de l'Union européenne (primaire et dérivé : règlement, directive, décision) et droit international ; personnes physiques et morales, capacité ; contrat, responsabilité civile (article 1240 du Code civil) et preuve ; mises en situation 3 et 4 ; QCM C2.\nModule 3 — La Constitution de la Ve République (C3, 8 h) : genèse de 1958, séparation des pouvoirs, régime parlementaire rationalisé ; Président de la République (articles 5, 8, 11, 12, 16, 19), quinquennat et élection au suffrage universel direct ; Gouvernement (articles 20, 21, 49) ; Parlement (Assemblée nationale et Sénat, navette, commission mixte paritaire, dernier mot de l'Assemblée nationale) ; cohabitation ; Conseil constitutionnel, contrôle a priori et question prioritaire de constitutionnalité ; révision de la Constitution (article 89) ; mises en situation 5 et 6 ; QCM C3 ; cas pratique intermédiaire.\nModule 4 — Institutions politiques et territoriales, citoyenneté et libertés fondamentales (C4, 8 h) : élections et modes de scrutin, référendum ; collectivités territoriales, décentralisation et déconcentration, préfet, libre administration ; citoyenneté, nationalité, citoyenneté européenne, droits et devoirs ; libertés fondamentales, laïcité, Défenseur des droits, référé-liberté ; mises en situation 7 et 8 ; QCM C4.\nModule 5 — Ordre interne, droit de l'Union européenne et traités internationaux (C5, 8 h) : construction européenne de la CECA au traité de Lisbonne ; traité sur l'Union européenne, traité sur le fonctionnement de l'Union européenne et Charte des droits fondamentaux ; institutions de l'Union et procédure législative ordinaire ; primauté et effet direct ; article 55 de la Constitution, jurisprudences Jacques Vabre et Nicolo ; Conseil de l'Europe et Convention européenne des droits de l'homme ; ONU ; ratification des traités ; mise en situation 9 ; QCM C5.\nModule 6 — Organisation juridictionnelle (C6, 7 h) : dualité des ordres de juridiction et Tribunal des conflits ; ordre judiciaire (juridictions civiles et pénales, cour d'appel, Cour de cassation) ; ordre administratif (tribunal administratif, cour administrative d'appel, Conseil d'État) ; voies de recours ; procès équitable, aide juridictionnelle, avocats et magistrats ; mise en situation 10 ; QCM C6 ; évaluation finale interne ; bilan de la formation.",
  methodesEvaluation:
    "Positionnement à l'entrée : QCM de positionnement de 10 questions (corrigé et expliqué) et 10 questions ouvertes, comparés à l'évaluation de fin pour mesurer la progression ; 10 mises en situation corrigées sur des cas pratiques fictifs ; un QCM de 10 questions à la fin de chaque module (C1 à C6) ; cas pratique intermédiaire à la fin du module 3 ; évaluation finale interne à la fin du module 6 (QCM de fin de 12 questions, cas pratiques de qualification et d'orientation vers la juridiction compétente) ; test de positionnement de fin. Évaluation à chaud (questionnaire de satisfaction en fin de formation) et évaluation à froid. Formation non certifiante : attestation de fin de formation mentionnant les objectifs et le niveau d'acquisition, et certificat de réalisation.",
  moyensPedagogiques:
    "Formation entièrement à distance, en classe virtuelle synchrone (Google Meet / Zoom) animée par un formateur unique. Apports structurés appuyés sur un support de cours en 6 chapitres, lecture guidée de textes officiels (Constitution, Code civil, traités, décisions de justice) sur Légifrance et EUR-Lex, schémas (hiérarchie des normes, organisation des pouvoirs, organisation juridictionnelle), cas pratiques fictifs (personnes et situations fictives : Camille, la commune de Valmont-sur-Seine, l'entreprise Atelier Valmontais), QCM corrigés. Partage d'écran, tableau blanc et documents partagés ; supports transmis au format numérique. Le stagiaire dispose d'un ordinateur avec webcam, micro et connexion internet ; un test technique est proposé avant la première séance.",
  publicVise:
    "Toute personne (salarié, particulier) souhaitant acquérir les bases du droit et du fonctionnement des institutions françaises et européennes. Formation individuelle, en classe virtuelle.",
  delaiAcces: "14 jours après validation de la préinscription et réception du dossier complet.",
  dateDebut: "2025-12-22",
  dateFin: "2025-12-30",
  lieu: "Google Meet / Zoom",
  nombreParticipants: "1",
  formateur: "",
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Comprendre ce qu'est une règle de droit et la différence entre droit objectif et droits subjectifs.",
  "Savoir situer un texte dans la hiérarchie des normes et vérifier qu'il est en vigueur.",
  "Distinguer droit public et droit privé, et qualifier une situation simple de la vie courante ou professionnelle.",
  "Connaître les bases du contrat et de la responsabilité civile.",
  "Comprendre qui fait quoi sous la Ve République : Président, Gouvernement, Parlement, Conseil constitutionnel.",
  "Suivre le parcours d'une loi, de son dépôt à sa publication au Journal officiel.",
  "Comprendre le rôle de la commune, du département, de la région et du préfet.",
  "Connaître ses droits de citoyen et les moyens de protéger les libertés fondamentales.",
  "Comprendre la place du droit de l'Union européenne et de la Convention européenne des droits de l'homme.",
  "Savoir vers quelle juridiction se tourner et quelles voies de recours existent.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins est conduite avant l'entrée en formation (entretien individuel et questionnaire préalable) puis à l'ouverture du module 1 : QCM de positionnement de 10 questions sur les notions clés de la formation, comparé à l'évaluation de fin pour mesurer la progression, et 10 questions ouvertes sur la représentation que le stagiaire se fait du droit et des institutions. La formation est suivie individuellement, à distance, en classe virtuelle ; le stagiaire peut être salarié ou particulier, sans formation juridique préalable.</p>
<ul>
  <li><strong>Comprendre les règles et leurs sources (C1, C2)</strong> : savoir d'où vient une règle, la retrouver sur Légifrance, la situer dans la hiérarchie des normes et qualifier une situation simple.</li>
  <li><strong>Comprendre les institutions (C3, C4)</strong> : identifier le rôle de chaque pouvoir sous la Ve République, des collectivités territoriales et des autorités qui protègent les libertés.</li>
  <li><strong>Articuler les ordres juridiques et s'orienter (C5, C6)</strong> : comprendre la place du droit de l'Union européenne et des traités, et savoir vers quelle juridiction se tourner.</li>
</ul>
<p>Les cas pratiques reposent sur des personnes et situations fictives (Camille, la commune de Valmont-sur-Seine, l'entreprise Atelier Valmontais) ; ils sont ensuite rapprochés des situations que le stagiaire rencontre dans sa vie professionnelle ou personnelle.</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Rythme individuel</strong> : formation suivie seul avec le formateur ; les notions non acquises au positionnement sont reprises en priorité et des exemples sont choisis dans l'environnement du stagiaire (entreprise, association, collectivité, vie quotidienne).</li>
  <li><strong>Lecture des textes</strong> : lecture accompagnée des premiers articles de loi et décisions de justice, glossaire tenu tout au long de la formation, méthode de recherche sur Légifrance et EUR-Lex montrée en partage d'écran.</li>
  <li><strong>Classe virtuelle</strong> : test technique avant la première séance, pauses régulières, supports envoyés à l'avance, enregistrement des schémas de synthèse.</li>
  <li><strong>Niveau de français</strong> : vocabulaire juridique expliqué systématiquement ; reformulation des consignes des cas pratiques si nécessaire.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au démarrage, supports adaptés sur demande (police agrandie, format numérique annotable), aménagement de la durée des évaluations sur demande.</li>
</ul>`;

/** 10 mises en situation corrigées (C1 à C6), cas pratiques fictifs. */
export const DRI47_EXERCICES: AIContentExercise[] = [
  {
    titre: "Exercice 1 — C1 : situer des textes dans la hiérarchie des normes",
    consigne:
      "Personnes et situations fictives. Camille, assistante administrative à la mairie de Valmont-sur-Seine (commune fictive), doit classer les textes suivants pour une note interne : la Constitution du 4 octobre 1958 ; la Déclaration des droits de l'homme et du citoyen de 1789 ; la Convention européenne des droits de l'homme ; un règlement de l'Union européenne ; une loi votée par le Parlement ; un décret du Premier ministre ; un arrêté municipal du maire de Valmont-sur-Seine. 1. Classez ces textes du plus élevé au moins élevé dans la hiérarchie des normes et justifiez. 2. Expliquez ce qu'est le bloc de constitutionnalité et citez ses composantes. 3. Un administré soutient que l'arrêté municipal est contraire au décret : quel principe invoque-t-il ? 4. Quel est l'apport de la décision du Conseil constitutionnel du 16 juillet 1971 ?",
    reponseAttendue:
      "Classement : bloc de constitutionnalité (Constitution de 1958 et DDHC de 1789) ; traités et droit de l'Union européenne (Convention européenne des droits de l'homme, règlement européen), supérieurs aux lois selon l'article 55 de la Constitution ; loi ; décret ; arrêté municipal.\nBloc de constitutionnalité : Constitution de 1958, DDHC de 1789, Préambule de la Constitution de 1946, Charte de l'environnement de 2004, principes fondamentaux reconnus par les lois de la République.\nPrincipe de légalité et respect de la hiérarchie des normes : une norme inférieure doit respecter la norme supérieure ; l'arrêté contraire au décret est illégal et peut être annulé par le juge administratif.\nDécision 71-44 DC du 16 juillet 1971 (liberté d'association) : le Conseil constitutionnel contrôle la loi au regard du Préambule de 1958, qui renvoie à la DDHC et au Préambule de 1946 ; naissance du bloc de constitutionnalité.",
    points: 20,
  },
  {
    titre: "Exercice 2 — C1 : domaine de la loi, publication, entrée en vigueur et non-rétroactivité",
    consigne:
      "Personnes et situations fictives. L'entreprise fictive Atelier Valmontais s'interroge sur trois textes. 1. Un texte fixe les règles concernant les droits civiques et la détermination des crimes et délits : relève-t-il de la loi ou du règlement ? Citez l'article de la Constitution. 2. Un autre texte fixe les modalités pratiques d'un formulaire administratif : de quel domaine relève-t-il ? 3. Le Gouvernement souhaite intervenir rapidement dans le domaine de la loi : quel mécanisme peut-il utiliser et à quelles conditions ? 4. Une loi est publiée au Journal officiel sans date d'entrée en vigueur : à quelle date s'applique-t-elle ? 5. La nouvelle loi peut-elle sanctionner pénalement des faits commis avant sa publication ? 6. Indiquez comment vérifier sur Légifrance la version en vigueur d'un article.",
    reponseAttendue:
      "Droits civiques et détermination des crimes et délits : domaine de la loi, article 34 de la Constitution.\nModalités pratiques d'un formulaire : domaine réglementaire, article 37 (tout ce qui ne relève pas de la loi a un caractère réglementaire) ; décret ou arrêté.\nOrdonnances de l'article 38 : loi d'habilitation pour un délai limité, adoption en Conseil des ministres après avis du Conseil d'État, projet de loi de ratification déposé avant la date fixée ; ratification expresse.\nEntrée en vigueur : à la date fixée par le texte ou, à défaut, le lendemain de sa publication au Journal officiel (article 1er du Code civil), sauf mesures d'application nécessaires.\nNon-rétroactivité : la loi ne dispose que pour l'avenir (article 2 du Code civil) ; en matière pénale, la non-rétroactivité de la loi plus sévère a valeur constitutionnelle (article 8 de la DDHC).\nLégifrance : rechercher le code et l'article, vérifier la mention « version en vigueur » et la date, consulter les versions antérieures.",
    points: 20,
  },
  {
    titre: "Exercice 3 — C2 : qualifier une situation et identifier la branche du droit",
    consigne:
      "Personnes et situations fictives. Rattachez chacune des situations suivantes à une branche du droit (droit public ou droit privé, puis sous-branche) et justifiez : 1. Camille conteste le refus de permis de construire du maire de Valmont-sur-Seine. 2. Atelier Valmontais n'a pas été payé par un client professionnel. 3. Un salarié d'Atelier Valmontais conteste son licenciement. 4. Un automobiliste est poursuivi pour un délit routier. 5. Le Parlement vote le budget de l'État. 6. Une société conteste le montant de son impôt sur les sociétés. 7. Un règlement de l'Union européenne s'applique à Atelier Valmontais pour la protection des données de ses clients. 8. Expliquez pourquoi le droit pénal est souvent présenté comme une branche mixte.",
    reponseAttendue:
      "1. Droit public, droit administratif (acte d'une autorité administrative).\n2. Droit privé, droit commercial (relations entre commerçants).\n3. Droit privé, droit du travail (relation salarié-employeur).\n4. Droit pénal (infraction : contravention, délit ou crime selon la gravité).\n5. Droit public, finances publiques et droit constitutionnel (loi de finances).\n6. Droit public, droit fiscal.\n7. Droit de l'Union européenne dérivé : le règlement est obligatoire dans tous ses éléments et directement applicable dans tous les États membres (article 288 du TFUE).\n8. Le droit pénal protège l'intérêt général, la poursuite est conduite par le ministère public au nom de la société, mais il est appliqué par les juridictions de l'ordre judiciaire et protège aussi les personnes privées : il emprunte au droit public et au droit privé.",
    points: 20,
  },
  {
    titre: "Exercice 4 — C2 : personnes, contrat, responsabilité civile et preuve",
    consigne:
      "Personnes et situations fictives. Camille, 17 ans au moment des faits, a commandé un ordinateur auprès d'Atelier Valmontais, société à responsabilité limitée. Plus tard, en livrant un meuble, un salarié d'Atelier Valmontais endommage la voiture d'un voisin. 1. Atelier Valmontais est-elle une personne ? De quel type ? 2. Camille pouvait-elle contracter seule ? Quelles sont les conditions de validité d'un contrat ? 3. Une fois le contrat valablement formé, quelle est sa force pour les parties ? 4. Sur quel fondement le voisin peut-il obtenir réparation, et contre qui ? 5. Qui doit prouver quoi ?",
    reponseAttendue:
      "Atelier Valmontais est une personne morale de droit privé, titulaire de droits et d'obligations, avec un patrimoine propre ; Camille est une personne physique.\nCapacité : le mineur non émancipé est en principe incapable de contracter, mais il peut accomplir seul les actes courants autorisés par la loi ou l'usage ; un achat important peut être contesté. Conditions de validité (article 1128 du Code civil) : consentement des parties, capacité de contracter, contenu licite et certain.\nForce obligatoire : les contrats légalement formés tiennent lieu de loi à ceux qui les ont faits (article 1103 du Code civil).\nResponsabilité civile : tout fait quelconque de l'homme qui cause à autrui un dommage oblige celui par la faute duquel il est arrivé à le réparer (article 1240) ; l'employeur répond en outre du dommage causé par son salarié dans ses fonctions (responsabilité du commettant du fait de son préposé). Conditions : un fait générateur, un dommage, un lien de causalité.\nPreuve : celui qui réclame l'exécution d'une obligation doit la prouver (article 1353 du Code civil) ; le voisin prouve le dommage et le lien avec la livraison.",
    points: 20,
  },
  {
    titre: "Exercice 5 — C3 : Président de la République, Gouvernement et cohabitation",
    consigne:
      "Situations fictives inspirées des règles de la Constitution. 1. Le Président de la République souhaite nommer un nouveau Premier ministre : sur quel article s'appuie-t-il ? 2. Il veut dissoudre l'Assemblée nationale : quel article, quelles limites ? 3. Il veut soumettre un projet de loi au référendum : quel article ? 4. Certains de ses actes doivent être contresignés : lesquels et pourquoi ? 5. Expliquez ce qu'est une cohabitation et citez les trois périodes de cohabitation de la Ve République. 6. Combien de mandats consécutifs le Président peut-il exercer et depuis quand ?",
    reponseAttendue:
      "Nomination du Premier ministre : article 8 ; le Président met fin à ses fonctions sur la présentation de la démission du Gouvernement.\nDissolution : article 12, après consultation du Premier ministre et des présidents des assemblées ; élections dans les 20 à 40 jours ; pas de nouvelle dissolution dans l'année qui suit ces élections.\nRéférendum : article 11, sur proposition du Gouvernement ou sur proposition conjointe des deux assemblées.\nContreseing : article 19 ; les actes du Président sont contresignés par le Premier ministre et, le cas échéant, les ministres responsables, sauf les pouvoirs propres (notamment articles 8 alinéa 1er, 11, 12, 16, 18, 54, 56, 61) ; le contreseing transfère la responsabilité politique au Gouvernement, responsable devant l'Assemblée nationale.\nCohabitation : Président et majorité de l'Assemblée nationale de bords politiques opposés ; le Premier ministre est issu de la majorité parlementaire ; 1986-1988, 1993-1995, 1997-2002.\nMandats : nul ne peut exercer plus de deux mandats consécutifs (article 6, révision de 2008) ; quinquennat depuis le référendum de 2000.",
    points: 20,
  },
  {
    titre: "Exercice 6 — C3 : procédure législative, article 49 et question prioritaire de constitutionnalité",
    consigne:
      "Situations fictives. 1. Décrivez le parcours d'un projet de loi depuis son dépôt jusqu'à sa promulgation (navette, commission mixte paritaire, dernier mot). 2. Le Gouvernement engage sa responsabilité sur le vote d'un texte : quelles sont les règles de l'article 49 alinéa 3 et sa limite depuis 2008 ? 3. Comment une motion de censure est-elle adoptée ? 4. Avant la promulgation, soixante députés estiment la loi contraire à la Constitution : que peuvent-ils faire ? 5. Deux ans plus tard, lors d'un procès, Camille estime qu'une disposition de cette loi porte atteinte à ses droits et libertés : quelle procédure, quels filtres, quel effet d'une décision d'inconstitutionnalité ?",
    reponseAttendue:
      "Parcours : dépôt (projet du Gouvernement ou proposition de parlementaires), examen en commission puis en séance dans chaque assemblée, navette jusqu'à adoption en termes identiques ; en cas de désaccord, commission mixte paritaire de sept députés et sept sénateurs ; à défaut d'accord, le Gouvernement peut demander à l'Assemblée nationale de statuer définitivement (article 45) ; promulgation par le Président dans les quinze jours (article 10) et publication au Journal officiel.\nArticle 49 alinéa 3 : le Premier ministre, après délibération du Conseil des ministres, engage la responsabilité du Gouvernement sur le vote d'un texte ; le texte est considéré comme adopté sauf si une motion de censure est votée ; depuis 2008, possible pour les projets de loi de finances et de financement de la sécurité sociale et pour un seul autre texte par session.\nMotion de censure (article 49 alinéa 2) : signée par au moins un dixième des députés, adoptée à la majorité absolue des membres de l'Assemblée ; seuls les votes favorables sont recensés.\nContrôle a priori (article 61) : saisine du Conseil constitutionnel par soixante députés ou soixante sénateurs, avant la promulgation.\nQuestion prioritaire de constitutionnalité (article 61-1, depuis le 1er mars 2010) : soulevée devant le juge, transmise à la Cour de cassation ou au Conseil d'État, qui filtrent, puis renvoi au Conseil constitutionnel ; disposition déclarée inconstitutionnelle abrogée à compter de la publication de la décision ou d'une date ultérieure fixée (article 62).",
    points: 20,
  },
  {
    titre: "Exercice 7 — C4 : collectivités territoriales, décentralisation et contrôle du préfet",
    consigne:
      "Personnes et situations fictives. Le conseil municipal de Valmont-sur-Seine, commune fictive, adopte une délibération ; le département et la région cofinancent un projet de gymnase. 1. Citez les catégories de collectivités territoriales prévues par l'article 72 de la Constitution. 2. Distinguez décentralisation et déconcentration, avec un exemple pour chacune. 3. Que signifie le principe de libre administration des collectivités territoriales ? 4. Le préfet estime la délibération illégale : que peut-il faire ? 5. Quels sont les grands repères historiques de la décentralisation ? 6. Qui élit le maire ?",
    reponseAttendue:
      "Article 72 : communes, départements, régions, collectivités à statut particulier et collectivités d'outre-mer régies par l'article 74 ; toute autre collectivité est créée par la loi.\nDécentralisation : transfert de compétences de l'État à des collectivités dotées de la personnalité morale et d'organes élus (exemple : la région et les lycées). Déconcentration : répartition des pouvoirs au sein de l'État, au profit de ses représentants locaux (exemple : le préfet de département).\nLibre administration : les collectivités s'administrent librement par des conseils élus, dans les conditions prévues par la loi ; elles disposent d'un pouvoir réglementaire pour exercer leurs compétences.\nPréfet : représentant de l'État, il assure le contrôle administratif et le respect des lois (article 72) ; contrôle de légalité a posteriori : il défère l'acte qu'il estime illégal au tribunal administratif (déféré préfectoral), il ne l'annule pas lui-même.\nRepères : lois de 1982 (suppression de la tutelle a priori), révision constitutionnelle de 2003 (organisation décentralisée de la République inscrite à l'article 1er), réforme des régions de 2015.\nLe maire est élu par le conseil municipal parmi ses membres, eux-mêmes élus au suffrage universel direct.",
    points: 20,
  },
  {
    titre: "Exercice 8 — C4 : citoyenneté, libertés fondamentales, laïcité et recours",
    consigne:
      "Personnes et situations fictives. 1. Camille, de nationalité française, et son voisin, de nationalité italienne, vivent à Valmont-sur-Seine : à quelles élections chacun peut-il voter ? 2. Le maire interdit par arrêté, du jour au lendemain, une réunion publique d'une association sans motif d'ordre public sérieux : quelle liberté est en cause et quel recours d'urgence permet d'obtenir une décision rapide ? 3. Un agent de la mairie souhaite porter un signe religieux ostensible dans l'exercice de ses fonctions ; un usager de la mairie aussi : que dit le principe de laïcité ? 4. Camille s'estime victime d'une discrimination dans l'accès à un service public : vers quelle autorité peut-elle se tourner gratuitement ?",
    reponseAttendue:
      "Vote : Camille, citoyenne française majeure inscrite sur les listes électorales, vote à toutes les élections ; le voisin, citoyen de l'Union européenne, peut voter et être candidat aux élections municipales et européennes (citoyenneté européenne, article 20 du TFUE, article 88-3 de la Constitution), pas aux élections nationales.\nLiberté de réunion et d'expression ; référé-liberté (article L. 521-2 du Code de justice administrative) : le juge des référés ordonne toute mesure nécessaire à la sauvegarde d'une liberté fondamentale à laquelle l'administration porte une atteinte grave et manifestement illégale, il se prononce dans un délai de 48 heures ; une condition d'urgence est requise.\nLaïcité : la République est laïque (article 1er de la Constitution ; loi du 9 décembre 1905 : liberté de conscience, libre exercice des cultes, séparation des Églises et de l'État). L'agent public est soumis à une obligation de neutralité ; l'usager conserve sa liberté de manifester ses convictions, dans les limites prévues par la loi et l'ordre public.\nDéfenseur des droits (article 71-1 de la Constitution) : saisine gratuite, compétent notamment pour les relations avec les services publics et la lutte contre les discriminations.",
    points: 20,
  },
  {
    titre: "Exercice 9 — C5 : droit de l'Union européenne, primauté et Convention européenne des droits de l'homme",
    consigne:
      "Personnes et situations fictives. Atelier Valmontais doit appliquer un règlement de l'Union européenne et attend la transposition d'une directive. 1. Quelle différence entre un règlement et une directive ? 2. Une loi française postérieure est contraire au règlement : quelle norme le juge français applique-t-il ? Citez les arrêts fondateurs de la Cour de justice et des juridictions françaises. 3. Quelle institution de l'Union propose les textes, lesquelles les adoptent dans la procédure législative ordinaire ? 4. Camille veut contester la durée excessive d'un procès devant « la Cour européenne » : de quelle cour s'agit-il, de quelle organisation dépend-elle et à quelle condition peut-elle la saisir ? 5. Comment la France ratifie-t-elle un traité ?",
    reponseAttendue:
      "Règlement : portée générale, obligatoire dans tous ses éléments, directement applicable dans tout État membre. Directive : lie les États quant au résultat à atteindre, en laissant le choix de la forme et des moyens ; elle doit être transposée (article 288 du TFUE).\nPrimauté du droit de l'Union : le juge écarte la loi contraire, même postérieure ; Van Gend en Loos (1963, effet direct), Costa contre ENEL (1964, primauté) ; article 55 de la Constitution ; Cour de cassation, Jacques Vabre (1975) ; Conseil d'État, Nicolo (1989).\nProcédure législative ordinaire : proposition de la Commission européenne, adoption conjointe par le Parlement européen et le Conseil de l'Union européenne (article 294 du TFUE).\nCour européenne des droits de l'homme, à Strasbourg, juridiction du Conseil de l'Europe (organisation distincte de l'Union européenne) ; elle applique la Convention européenne des droits de l'homme, dont l'article 6 garantit le jugement dans un délai raisonnable ; saisine après épuisement des voies de recours internes.\nRatification : le Président négocie et ratifie les traités (article 52) ; certains traités ne peuvent être ratifiés qu'en vertu d'une loi (article 53) ; si le Conseil constitutionnel juge un engagement contraire à la Constitution, la ratification suppose une révision (article 54).",
    points: 20,
  },
  {
    titre: "Exercice 10 — C6 : identifier la juridiction compétente et la voie de recours",
    consigne:
      "Personnes et situations fictives. Pour chaque situation, indiquez l'ordre de juridiction, la juridiction compétente en premier ressort et la voie de recours contre sa décision : 1. Un salarié d'Atelier Valmontais conteste son licenciement. 2. Camille conteste un refus de permis de construire du maire de Valmont-sur-Seine. 3. Un litige de 8 000 euros oppose Camille à son bailleur. 4. Un automobiliste est poursuivi pour une contravention, puis un autre pour un délit. 5. Une personne est accusée d'un crime puni de quinze ans de réclusion criminelle. 6. Un litige entre deux sociétés commerciales. 7. Les deux ordres se déclarent incompétents : qui tranche ? 8. Camille n'a pas les moyens de payer un avocat : quelle aide existe ?",
    reponseAttendue:
      "1. Ordre judiciaire, conseil de prud'hommes ; appel devant la chambre sociale de la cour d'appel, puis pourvoi en cassation.\n2. Ordre administratif, tribunal administratif (recours pour excès de pouvoir, en principe dans les deux mois) ; appel devant la cour administrative d'appel, puis pourvoi devant le Conseil d'État.\n3. Ordre judiciaire, tribunal judiciaire (juridiction de droit commun depuis le 1er janvier 2020) ; appel devant la cour d'appel, pourvoi devant la Cour de cassation.\n4. Contravention : tribunal de police ; délit : tribunal correctionnel ; appel devant la chambre des appels correctionnels de la cour d'appel.\n5. Crime puni de quinze ans : cour criminelle départementale (magistrats professionnels) ; la cour d'assises, avec des jurés citoyens, juge notamment les crimes punis de plus de vingt ans et les crimes en récidive ; appel devant la cour d'assises d'appel.\n6. Tribunal de commerce, composé de juges élus issus du monde économique (tribunal des activités économiques dans les juridictions de l'expérimentation) ; appel devant la cour d'appel.\n7. Tribunal des conflits (rétabli par la loi du 24 mai 1872 ; arrêt Blanco du 8 février 1873).\n8. Aide juridictionnelle (loi du 10 juillet 1991), sous conditions de ressources : prise en charge totale ou partielle des frais d'avocat et de procédure. Rappel : opposition contre une décision rendue par défaut ; la Cour de cassation et le Conseil d'État jugent en droit, pas les faits.",
    points: 20,
  },
];

// ---------------------------------------------------------------------------
// QCM par compétence (10 questions par compétence)
// Format lu par le générateur d'exercices : « 1) … A) …   B) … » + « 1-B  2-C … ».
// Aucune parenthèse fermante après A, B, C ou D dans les énoncés ni dans les propositions.
// ---------------------------------------------------------------------------
type Q = [question: string, options: string[], correct: number];
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

const VF = ["Vrai", "Faux"];

const QCM_C1: Q[] = [
  ["Qu'est-ce qui caractérise une règle de droit ?", ["Elle est générale, abstraite et assortie d'une sanction étatique", "Elle ne concerne qu'une personne nommément désignée", "Elle relève uniquement de la morale", "Elle s'applique seulement si chacun l'accepte"], 0],
  ["Le droit objectif désigne :", ["Les prérogatives reconnues à une personne", "L'ensemble des règles qui régissent la vie en société", "Les décisions rendues par un seul tribunal", "Les opinions des professeurs de droit"], 1],
  ["Quel texte se trouve au sommet de la hiérarchie des normes en droit interne ?", ["La loi", "Le décret", "La Constitution", "L'arrêté préfectoral"], 2],
  ["Lequel de ces textes ne fait pas partie du bloc de constitutionnalité ?", ["La Déclaration des droits de l'homme et du citoyen de 1789", "Le Préambule de la Constitution de 1946", "La Charte de l'environnement de 2004", "Le Code civil"], 3],
  ["Quel article de la Constitution fixe le domaine de la loi ?", ["L'article 34", "L'article 37", "L'article 55", "L'article 89"], 0],
  ["Par quel mécanisme le Gouvernement peut-il, avec l'autorisation du Parlement, prendre des mesures relevant normalement de la loi ?", ["Le décret simple", "L'ordonnance de l'article 38", "La circulaire", "Le référendum local"], 1],
  ["Sauf disposition contraire, quand une loi publiée au Journal officiel entre-t-elle en vigueur ?", ["Le jour de son vote", "Un mois après sa publication", "Le lendemain de sa publication", "Le 1er janvier suivant"], 2],
  ["Vrai ou faux : une loi pénale plus sévère peut s'appliquer à des faits commis avant son entrée en vigueur.", VF, 1],
  ["Quel nom donne-t-on au contrôle de la conformité d'une loi à un traité international ?", ["Le contrôle de conventionnalité", "Le contrôle de constitutionnalité", "Le contrôle de légalité", "Le contrôle budgétaire"], 0],
  ["Sur quel site officiel consulte-t-on gratuitement la version en vigueur des codes et des lois ?", ["Un forum juridique", "Légifrance", "Un réseau social", "Le site d'un cabinet d'avocats"], 1],
];

const QCM_C2: Q[] = [
  ["Laquelle de ces matières relève du droit public ?", ["Le droit civil", "Le droit commercial", "Le droit administratif", "Le droit du travail"], 2],
  ["Le droit du travail régit principalement :", ["Les relations entre l'État et les collectivités", "Les relations entre employeurs et salariés de droit privé", "Les relations entre États", "Le budget de l'État"], 1],
  ["Pourquoi le droit pénal est-il souvent qualifié de branche mixte ?", ["Il protège l'intérêt général tout en étant appliqué par les juridictions judiciaires", "Il ne s'applique qu'aux étrangers", "Il est rédigé par l'Union européenne", "Il ne prévoit aucune sanction"], 0],
  ["Quel acte de l'Union européenne est obligatoire dans tous ses éléments et directement applicable dans tous les États membres ?", ["La directive", "La recommandation", "L'avis", "Le règlement"], 3],
  ["Une directive de l'Union européenne :", ["Lie l'État quant au résultat à atteindre et doit être transposée", "S'applique sans aucune mesure nationale dans tous les cas", "N'a aucune valeur juridique", "Ne concerne que la Commission"], 0],
  ["Une société par actions simplifiée est :", ["Une personne physique", "Une personne morale de droit privé", "Une personne morale de droit public", "Un simple groupement sans personnalité juridique"], 1],
  ["Quelles sont les conditions de validité d'un contrat selon l'article 1128 du Code civil ?", ["Un écrit signé devant notaire", "Le consentement, la capacité et un contenu licite et certain", "Un prix supérieur à 1 500 euros", "L'accord d'un juge"], 1],
  ["L'article 1240 du Code civil fonde :", ["La responsabilité pénale", "La responsabilité civile pour faute", "Le droit de grève", "Le contrôle de constitutionnalité"], 1],
  ["Vrai ou faux : en principe, celui qui réclame l'exécution d'une obligation doit la prouver.", VF, 0],
  ["Les infractions pénales sont classées, selon leur gravité, en :", ["Contraventions, délits et crimes", "Fautes légères et fautes lourdes", "Litiges civils et commerciaux", "Actes réglementaires et individuels"], 0],
];

const QCM_C3: Q[] = [
  ["À quelle date la Constitution de la Ve République a-t-elle été promulguée ?", ["Le 4 octobre 1958", "Le 14 juillet 1789", "Le 27 octobre 1946", "Le 6 novembre 1962"], 0],
  ["Quel penseur est associé à la théorie de la séparation des pouvoirs ?", ["Rousseau", "Montesquieu", "Voltaire", "Kelsen"], 1],
  ["Depuis la révision de 1962, le Président de la République est élu :", ["Par le Parlement réuni en Congrès", "Par un collège de grands électeurs", "Au suffrage universel direct", "Par le Conseil constitutionnel"], 2],
  ["Quel article permet au Président de la République de dissoudre l'Assemblée nationale ?", ["L'article 16", "L'article 11", "L'article 49", "L'article 12"], 3],
  ["Selon l'article 20 de la Constitution, qui détermine et conduit la politique de la Nation ?", ["Le Gouvernement", "Le Sénat", "Le Conseil constitutionnel", "Le Conseil d'État"], 0],
  ["Combien de députés compte l'Assemblée nationale ?", ["348", "577", "720", "925"], 1],
  ["En cas de désaccord persistant entre les deux assemblées, qui peut avoir le dernier mot à la demande du Gouvernement ?", ["Le Sénat", "Le Conseil constitutionnel", "L'Assemblée nationale", "Le Président de la République"], 2],
  ["Depuis la révision de 2008, en dehors des textes budgétaires, l'article 49 alinéa 3 peut être utilisé pour :", ["Un nombre illimité de textes", "Aucun texte", "Deux textes par an", "Un seul autre texte par session"], 3],
  ["Depuis 2010, la question prioritaire de constitutionnalité permet :", ["À un justiciable de contester, lors d'un procès, une loi déjà en vigueur portant atteinte aux droits et libertés", "Au Président de dissoudre le Sénat", "Aux maires de contester un traité", "À la Commission européenne d'annuler une loi"], 0],
  ["Vrai ou faux : les anciens Présidents de la République sont membres de droit et à vie du Conseil constitutionnel.", VF, 0],
];

const QCM_C4: Q[] = [
  ["Comment les députés sont-ils élus ?", ["À la proportionnelle nationale", "Au scrutin uninominal majoritaire à deux tours", "Par les conseillers municipaux", "Par tirage au sort"], 1],
  ["Les sénateurs sont élus :", ["Au suffrage universel direct", "Au suffrage universel indirect", "Par l'Assemblée nationale", "Par le Président de la République"], 1],
  ["Laquelle de ces entités n'est pas une collectivité territoriale ?", ["La commune", "Le département", "La région", "La préfecture"], 3],
  ["La déconcentration consiste à :", ["Confier des pouvoirs de décision à des représentants locaux de l'État", "Transférer des compétences à des collectivités élues", "Supprimer les communes", "Créer de nouveaux États"], 0],
  ["Depuis quelle révision constitutionnelle l'article 1er précise-t-il que l'organisation de la République est décentralisée ?", ["1962", "2003", "2008", "2024"], 1],
  ["Que fait le préfet face à un acte d'une collectivité qu'il estime illégal ?", ["Il l'annule lui-même", "Il le défère au tribunal administratif", "Il saisit le Conseil constitutionnel", "Il dissout le conseil municipal"], 1],
  ["Un citoyen d'un autre État de l'Union européenne résidant en France peut voter :", ["À toutes les élections", "Aux élections municipales et européennes", "À l'élection présidentielle uniquement", "À aucune élection"], 1],
  ["Quelle loi a posé la séparation des Églises et de l'État ?", ["La loi du 9 décembre 1905", "La loi du 2 mars 1982", "La loi du 10 juillet 1991", "La loi du 4 août 1789"], 0],
  ["Quelle autorité constitutionnelle indépendante peut être saisie gratuitement en cas de discrimination ?", ["Le Défenseur des droits", "Le Conseil d'État", "Le préfet", "Le Sénat"], 0],
  ["Le référé-liberté permet au juge administratif de statuer en principe dans un délai de :", ["48 heures", "Deux mois", "Un an", "Quinze jours"], 0],
];

const QCM_C5: Q[] = [
  ["Quel traité a créé la Communauté européenne du charbon et de l'acier en 1951 ?", ["Le traité de Paris", "Le traité de Rome", "Le traité de Maastricht", "Le traité de Lisbonne"], 0],
  ["Depuis quelle date le traité de Lisbonne est-il en vigueur ?", ["1er janvier 1993", "1er décembre 2009", "1er mai 2004", "1er janvier 2002"], 1],
  ["Quelle institution de l'Union européenne détient en principe l'initiative législative ?", ["Le Parlement européen", "La Cour de justice", "La Commission européenne", "La Banque centrale européenne"], 2],
  ["Dans la procédure législative ordinaire, le texte est adopté par :", ["La Commission seule", "La Cour de justice", "Le Conseil européen seul", "Le Parlement européen et le Conseil de l'Union européenne"], 3],
  ["Quel arrêt de la Cour de justice de 1964 a consacré la primauté du droit communautaire ?", ["Costa contre ENEL", "Van Gend en Loos", "Blanco", "Nicolo"], 0],
  ["Selon l'article 55 de la Constitution, les traités régulièrement ratifiés ont :", ["Une autorité inférieure à celle des décrets", "Une autorité supérieure à celle des lois, sous réserve de réciprocité", "Une valeur supérieure à la Constitution", "Aucune valeur en droit interne"], 1],
  ["Par quel arrêt de 1989 le Conseil d'État a-t-il accepté de faire prévaloir un traité sur une loi postérieure ?", ["Jacques Vabre", "Costa contre ENEL", "Nicolo", "Blanco"], 2],
  ["Vrai ou faux : la Cour européenne des droits de l'homme est une institution de l'Union européenne.", VF, 1],
  ["Avant de saisir la Cour européenne des droits de l'homme, un requérant doit en principe :", ["Avoir épuisé les voies de recours internes", "Obtenir l'accord du Président de la République", "Être ressortissant d'un État de l'Union européenne", "Passer par la Commission européenne"], 0],
  ["Quel article de la Constitution prévoit la participation de la République à l'Union européenne ?", ["L'article 16", "L'article 88-1", "L'article 49", "L'article 72"], 1],
];

const QCM_C6: Q[] = [
  ["Quelle juridiction règle les conflits de compétence entre l'ordre judiciaire et l'ordre administratif ?", ["Le Conseil constitutionnel", "La Cour de cassation", "Le Tribunal des conflits", "Le Conseil d'État"], 2],
  ["Depuis le 1er janvier 2020, quelle juridiction est la juridiction civile de droit commun en première instance ?", ["Le tribunal d'instance", "Le tribunal judiciaire", "Le tribunal de grande instance", "La cour d'appel"], 1],
  ["Quelle juridiction est compétente pour un litige individuel entre un salarié et son employeur de droit privé ?", ["Le tribunal administratif", "Le conseil de prud'hommes", "Le tribunal de police", "Le Conseil d'État"], 1],
  ["Quelle juridiction juge les délits ?", ["Le tribunal de police", "Le tribunal correctionnel", "La cour d'assises", "Le tribunal administratif"], 1],
  ["Quelle juridiction statue en cassation dans l'ordre administratif ?", ["La cour administrative d'appel", "Le Conseil d'État", "La Cour de cassation", "Le Tribunal des conflits"], 1],
  ["Quel arrêt du Tribunal des conflits de 1873 est associé à la responsabilité de l'administration ?", ["Nicolo", "Jacques Vabre", "Blanco", "Costa contre ENEL"], 2],
  ["Le recours pour excès de pouvoir vise à :", ["Obtenir l'annulation d'un acte administratif illégal", "Obtenir des dommages et intérêts d'un particulier", "Faire juger un crime", "Contester une décision du Conseil constitutionnel"], 0],
  ["Vrai ou faux : la Cour de cassation rejuge les faits de l'affaire comme une cour d'appel.", VF, 1],
  ["Quel article de la Convention européenne des droits de l'homme garantit le droit à un procès équitable ?", ["L'article 2", "L'article 6", "L'article 10", "L'article 14"], 1],
  ["Les magistrats du parquet :", ["Représentent la société et requièrent l'application de la loi", "Sont inamovibles et tranchent les litiges", "Sont élus par les justiciables", "Siègent uniquement au Conseil d'État"], 0],
];

export const DRI47_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM C1 — Fondements du droit, sources et hiérarchie des normes", QCM_C1),
  qcmExercice("QCM C2 — Les branches du droit", QCM_C2),
  qcmExercice("QCM C3 — La Constitution de la Ve République", QCM_C3),
  qcmExercice("QCM C4 — Institutions politiques et territoriales, citoyenneté et libertés", QCM_C4),
  qcmExercice("QCM C5 — Ordre interne, droit de l'Union européenne et traités", QCM_C5),
  qcmExercice("QCM C6 — Organisation juridictionnelle", QCM_C6),
];

/**
 * Ordre volontaire : les 10 mises en situation d'abord (C1 à C6), alignées sur les 10 questions de
 * positionnement et sur les copies de `droitInstitutions47hHumanized.ts` ; les 6 QCM ensuite.
 */
export const DRI47_EXERCICES_COMPLETS: AIContentExercise[] = [...DRI47_EXERCICES, ...DRI47_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Enseignement : fondamentaux du droit et des institutions » (6 chapitres, un par module)</strong> : apports, schémas, extraits de textes officiels, cas pratiques fictifs corrigés et QCM de chaque module.</li>
  <li><strong>Schémas de synthèse</strong> : hiérarchie des normes, organisation des pouvoirs sous la Ve République, parcours d'une loi, collectivités territoriales, institutions de l'Union européenne, organisation juridictionnelle et voies de recours.</li>
  <li><strong>Glossaire juridique</strong> tenu tout au long de la formation (droit objectif, droits subjectifs, personne morale, promulgation, ratification, primauté, pourvoi…).</li>
  <li><strong>Fiches méthode</strong> : lire un article de loi, rechercher un texte sur Légifrance et EUR-Lex, lire une décision de justice, qualifier une situation et identifier la juridiction compétente.</li>
  <li><strong>Cas pratiques fictifs</strong> (personnes et situations fictives) : Camille, la commune de Valmont-sur-Seine, l'entreprise Atelier Valmontais.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Classe virtuelle Google Meet / Zoom</strong> : partage d'écran, tableau blanc, conversation écrite, documents partagés.</li>
  <li><strong>Équipement du stagiaire</strong> : ordinateur avec webcam et micro, connexion internet ; test technique proposé avant la première séance.</li>
  <li><strong>Bases de données publiques et gratuites</strong> : Légifrance, EUR-Lex, sites du Conseil constitutionnel, du Conseil d'État et de la Cour de cassation.</li>
  <li><strong>Supports numériques</strong> envoyés avant chaque module et conservés par le stagiaire.</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>Légifrance</strong> : <a href="https://www.legifrance.gouv.fr/">https://www.legifrance.gouv.fr/</a> — Constitution, codes, lois et décrets en vigueur, Journal officiel.</li>
  <li><strong>Conseil constitutionnel</strong> : <a href="https://www.conseil-constitutionnel.fr/">https://www.conseil-constitutionnel.fr/</a> — texte de la Constitution, décisions, questions prioritaires de constitutionnalité.</li>
  <li><strong>Vie-publique.fr</strong> : <a href="https://www.vie-publique.fr/">https://www.vie-publique.fr/</a> — fiches sur les institutions, les collectivités territoriales et la citoyenneté.</li>
  <li><strong>Service-public.fr</strong> : <a href="https://www.service-public.fr/">https://www.service-public.fr/</a> — démarches, droits du citoyen, aide juridictionnelle.</li>
  <li><strong>EUR-Lex</strong> : <a href="https://eur-lex.europa.eu/">https://eur-lex.europa.eu/</a> — traités, règlements et directives de l'Union européenne, arrêts de la Cour de justice.</li>
  <li><strong>Cour européenne des droits de l'homme</strong> : <a href="https://www.echr.coe.int/">https://www.echr.coe.int/</a> — Convention européenne des droits de l'homme et jurisprudence.</li>
  <li><strong>Conseil d'État</strong> : <a href="https://www.conseil-etat.fr/">https://www.conseil-etat.fr/</a> et <strong>Cour de cassation</strong> : <a href="https://www.courdecassation.fr/">https://www.courdecassation.fr/</a> — organisation des juridictions et décisions.</li>
</ul>`;

const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
export const DRI47_VIDEOS = [
  { title: "Qu'est-ce qu'une règle de droit ?", description: "Caractères de la règle de droit, droit objectif et droits subjectifs.", url: yt("qu'est-ce qu'une règle de droit introduction au droit") },
  { title: "La hiérarchie des normes", description: "Pyramide de Kelsen, bloc de constitutionnalité, contrôle de conventionnalité.", url: yt("hiérarchie des normes pyramide de Kelsen") },
  { title: "Droit public et droit privé", description: "Les grandes branches du droit et leurs sous-branches.", url: yt("différence droit public droit privé branches du droit") },
  { title: "La Constitution de la Ve République", description: "Genèse de 1958, séparation des pouvoirs, régime parlementaire rationalisé.", url: yt("Constitution Ve République 1958 explication") },
  { title: "Le Président de la République et le Gouvernement", description: "Pouvoirs propres, contreseing, article 49, cohabitation.", url: yt("pouvoirs du Président de la République Ve République") },
  { title: "Comment une loi est-elle votée ?", description: "Navette parlementaire, commission mixte paritaire, promulgation.", url: yt("procédure législative navette parlementaire") },
  { title: "La question prioritaire de constitutionnalité", description: "Saisine, filtres, effets des décisions du Conseil constitutionnel.", url: yt("question prioritaire de constitutionnalité QPC") },
  { title: "Les collectivités territoriales et la décentralisation", description: "Commune, département, région, rôle du préfet.", url: yt("collectivités territoriales décentralisation explication") },
  { title: "Les institutions de l'Union européenne", description: "Commission, Parlement européen, Conseil, Cour de justice.", url: yt("institutions de l'Union européenne expliquées") },
  { title: "L'organisation de la justice en France", description: "Ordre judiciaire, ordre administratif, Tribunal des conflits, voies de recours.", url: yt("organisation juridictionnelle française ordre judiciaire administratif") },
];

export const DRI47_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: DRI47_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: DRI47_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement de début (10 questions, une seule bonne réponse)
// et QCM de fin (12 questions sur l'ensemble des modules)
// ---------------------------------------------------------------------------
export const DRI47_POSITIONNEMENT_TITRE = "Positionnement — vos repères de départ en droit";
export const DRI47_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "Qu'est-ce qui distingue une règle de droit d'une règle de politesse ?", options: ["Elle est écrite en latin", "Elle est assortie d'une sanction prononcée par l'autorité publique", "Elle ne concerne que les juristes"], correctIndex: 1 },
  { question: "Quel texte est au sommet de l'ordre juridique interne français ?", options: ["La Constitution", "Le Code civil", "Le règlement intérieur d'une entreprise"], correctIndex: 0 },
  { question: "Le droit administratif appartient :", options: ["Au droit privé", "Au droit public", "Au droit international uniquement"], correctIndex: 1 },
  { question: "Qui nomme le Premier ministre ?", options: ["L'Assemblée nationale", "Le Sénat", "Le Président de la République"], correctIndex: 2 },
  { question: "Le Parlement français est composé :", options: ["De l'Assemblée nationale et du Sénat", "De l'Assemblée nationale et du Conseil d'État", "Du Sénat et du Conseil constitutionnel"], correctIndex: 0 },
  { question: "Qui contrôle la conformité des lois à la Constitution ?", options: ["La Cour de cassation", "Le Conseil constitutionnel", "Le préfet"], correctIndex: 1 },
  { question: "Le maire d'une commune est élu :", options: ["Par le conseil municipal", "Par le préfet", "Par le Sénat"], correctIndex: 0 },
  { question: "Combien d'États membres compte l'Union européenne ?", options: ["15", "46", "27"], correctIndex: 2 },
  { question: "La Cour européenne des droits de l'homme siège à :", options: ["Bruxelles", "Strasbourg", "Luxembourg"], correctIndex: 1 },
  { question: "Quelle juridiction juge un litige entre un administré et une administration ?", options: ["Le conseil de prud'hommes", "Le tribunal de commerce", "Le tribunal administratif"], correctIndex: 2 },
];

/** Explications du corrigé du positionnement, dans l'ordre des questions. */
export const DRI47_QCM_DEBUT_EXPLICATIONS: string[] = [
  "La règle de droit est générale, abstraite, obligatoire et sanctionnée par l'autorité publique (module 1).",
  "La Constitution du 4 octobre 1958 est au sommet de la hiérarchie des normes internes (module 1).",
  "Le droit administratif régit l'organisation et l'action de l'administration : il relève du droit public (module 2).",
  "Le Président de la République nomme le Premier ministre (article 8 de la Constitution) (module 3).",
  "Le Parlement comprend l'Assemblée nationale et le Sénat (article 24 de la Constitution) (module 3).",
  "Le Conseil constitutionnel contrôle la conformité des lois à la Constitution (articles 61 et 61-1) (module 3).",
  "Le maire est élu par le conseil municipal parmi ses membres (module 4).",
  "L'Union européenne compte 27 États membres ; le Conseil de l'Europe en compte 46 (module 5).",
  "La Cour européenne des droits de l'homme, juridiction du Conseil de l'Europe, siège à Strasbourg (module 5).",
  "Les litiges avec l'administration relèvent en principe de l'ordre administratif, d'abord du tribunal administratif (module 6).",
];

export const DRI47_QCM_FIN: AIQCMQuestion[] = [
  { question: "Parmi ces éléments, lequel n'est pas une source du droit ?", options: ["La loi", "La jurisprudence", "La coutume", "Une rumeur relayée sur un réseau social"], correctIndex: 3 },
  { question: "Selon l'article 37 de la Constitution, les matières autres que celles du domaine de la loi ont :", options: ["Un caractère réglementaire", "Un caractère constitutionnel", "Un caractère international", "Un caractère contractuel"], correctIndex: 0 },
  { question: "Quel principe interdit d'appliquer une loi pénale plus sévère à des faits antérieurs ?", options: ["La primauté", "La non-rétroactivité de la loi pénale plus sévère", "La libre administration", "Le contreseing"], correctIndex: 1 },
  { question: "Quel article du Code civil fonde la responsabilité civile pour faute ?", options: ["L'article 1103", "L'article 1128", "L'article 1240", "L'article 1353"], correctIndex: 2 },
  { question: "Selon l'article 288 du TFUE, la directive :", options: ["Est directement applicable sans transposition", "Lie les États quant au résultat à atteindre", "N'a aucune force obligatoire", "Ne vise que les particuliers"], correctIndex: 1 },
  { question: "Pendant une cohabitation :", options: ["Le Président et la majorité de l'Assemblée nationale sont de bords politiques opposés", "Le Sénat est dissous", "Le Président gouverne seul", "Le Parlement ne se réunit plus"], correctIndex: 0 },
  { question: "Depuis la révision de 2008, combien de mandats présidentiels consécutifs peut-on exercer au maximum ?", options: ["Un", "Deux", "Trois", "Sans limite"], correctIndex: 1 },
  { question: "Une motion de censure est adoptée si elle recueille :", options: ["La majorité des suffrages exprimés", "L'unanimité des députés", "La majorité absolue des membres de l'Assemblée nationale", "L'accord du Sénat"], correctIndex: 2 },
  { question: "Qui assure le contrôle de légalité des actes des collectivités territoriales ?", options: ["Le préfet, qui peut les déférer au tribunal administratif", "Le maire de la commune voisine", "Le Conseil constitutionnel", "La Commission européenne"], correctIndex: 0 },
  { question: "Quelle juridiction applique la Convention européenne des droits de l'homme en dernier lieu, après épuisement des recours internes ?", options: ["La Cour de justice de l'Union européenne", "La Cour européenne des droits de l'homme", "Le Conseil européen", "La Cour internationale de justice"], correctIndex: 1 },
  { question: "Quelle juridiction juge un crime puni de quinze ans de réclusion criminelle commis par un majeur, hors récidive ?", options: ["Le tribunal de police", "Le tribunal correctionnel", "Le conseil de prud'hommes", "La cour criminelle départementale"], correctIndex: 3 },
  { question: "Contre un jugement du tribunal administratif, la voie de recours ordinaire est en principe :", options: ["L'appel devant la cour administrative d'appel", "Le pourvoi devant la Cour de cassation", "La saisine du Tribunal des conflits", "La question prioritaire de constitutionnalité"], correctIndex: 0 },
];

export const DRI47_EVAL_PACK: AIEvalPack = {
  qcmDebut: DRI47_QCM_DEBUT,
  qcmFin: DRI47_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin du module 3) — la réforme du stationnement à Valmont-sur-Seine (personnes et situations fictives)",
    contexte:
      "Personnes et situations fictives. Le Gouvernement dépose un projet de loi sur le stationnement en ville ; le Sénat et l'Assemblée nationale ne s'accordent pas sur le texte. Faute de majorité, le Premier ministre envisage l'article 49 alinéa 3. Une fois la loi promulguée, un décret d'application est publié, puis le maire de Valmont-sur-Seine prend un arrêté fixant de nouveaux tarifs. Camille, qui habite la commune, estime que l'arrêté méconnaît le décret et que la loi elle-même porte atteinte à la liberté d'aller et venir.",
    questions: [
      { question: "Classez la loi, le décret et l'arrêté municipal dans la hiérarchie des normes et expliquez ce qu'implique ce classement.", reponseAttendue: "Loi, puis décret, puis arrêté municipal ; chaque norme doit respecter celles qui lui sont supérieures ; l'arrêté contraire au décret est illégal ; le décret relève du pouvoir réglementaire (article 37 ou décret d'application de la loi).", points: 5 },
      { question: "Comment le désaccord entre les deux assemblées peut-il être surmonté ?", reponseAttendue: "Navette, puis commission mixte paritaire de sept députés et sept sénateurs à l'initiative du Premier ministre ; en cas d'échec, nouvelle lecture et, à la demande du Gouvernement, dernier mot à l'Assemblée nationale (article 45).", points: 5 },
      { question: "Expliquez le mécanisme de l'article 49 alinéa 3 et sa limite.", reponseAttendue: "Engagement de la responsabilité du Gouvernement sur le texte après délibération du Conseil des ministres ; texte considéré comme adopté sauf motion de censure votée à la majorité absolue des membres de l'Assemblée ; depuis 2008, limité aux textes budgétaires et à un seul autre texte par session.", points: 5 },
      { question: "Quelles voies Camille peut-elle utiliser contre l'arrêté, puis contre la loi ?", reponseAttendue: "Contre l'arrêté : recours pour excès de pouvoir devant le tribunal administratif, en principe dans les deux mois ; possibilité de demander au préfet d'exercer son contrôle de légalité. Contre la loi déjà promulguée : question prioritaire de constitutionnalité soulevée à l'occasion d'un procès, filtrée par le Conseil d'État, puis examinée par le Conseil constitutionnel (article 61-1).", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale interne — QCM de fin et cas pratiques (module 6), grille d'acquisition des compétences C1 à C6",
    exercices: [
      {
        titre: "Partie 1 — QCM de fin : 12 questions sur les six modules (C1 à C6, 30 minutes)",
        consigne: "Répondez individuellement aux 12 questions du QCM de fin (sources du droit, domaine réglementaire, non-rétroactivité, responsabilité civile, directive, cohabitation, mandats présidentiels, motion de censure, contrôle de légalité, Cour européenne des droits de l'homme, juridictions pénales, voies de recours administratives). Correction commentée avec le formateur.",
        reponseAttendue: "Réponses attendues : une rumeur n'est pas une source du droit ; article 37 = domaine réglementaire ; non-rétroactivité de la loi pénale plus sévère ; article 1240 ; la directive lie quant au résultat ; cohabitation = Président et majorité de l'Assemblée opposés ; deux mandats consécutifs ; majorité absolue des membres ; préfet et déféré au tribunal administratif ; Cour européenne des droits de l'homme ; cour criminelle départementale ; appel devant la cour administrative d'appel.",
        points: 20,
      },
      {
        titre: "Partie 2 — Sources et hiérarchie des normes (C1, C2)",
        consigne: "Personnes et situations fictives. Atelier Valmontais reçoit un courrier citant un article du Code du travail, un décret et un règlement de l'Union européenne. Situez ces textes dans la hiérarchie des normes, rattachez chacun à une branche du droit et expliquez comment vérifier leur version en vigueur.",
        reponseAttendue: "Règlement de l'Union européenne au-dessus de la loi (article 55, primauté), partie législative du Code du travail, puis décret ; droit du travail (droit privé) et droit de l'Union européenne dérivé ; vérification sur Légifrance (version en vigueur, date) et sur EUR-Lex (texte consolidé).",
        points: 20,
      },
      {
        titre: "Partie 3 — Institutions de la Ve République (C3)",
        consigne: "Présentez en une page les rapports entre le Président de la République, le Gouvernement et le Parlement : nomination du Premier ministre, responsabilité du Gouvernement, dissolution, contreseing, rôle du Conseil constitutionnel.",
        reponseAttendue: "Article 8 (nomination), article 20 et 21 (rôle du Gouvernement et du Premier ministre), article 49 (responsabilité devant l'Assemblée nationale), article 12 (dissolution), article 19 (contreseing et pouvoirs propres), articles 61 et 61-1 (contrôle a priori et question prioritaire de constitutionnalité) ; régime parlementaire rationalisé et cas de la cohabitation.",
        points: 20,
      },
      {
        titre: "Partie 4 — Collectivités, citoyenneté et libertés ; droit européen (C4, C5)",
        consigne: "Personnes et situations fictives. Le maire de Valmont-sur-Seine interdit une manifestation sans motif d'ordre public ; un résident européen veut voter aux élections municipales ; une directive européenne n'est pas transposée à temps. Expliquez les règles applicables et les recours possibles.",
        reponseAttendue: "Atteinte à une liberté fondamentale : référé-liberté devant le juge administratif (article L. 521-2 du Code de justice administrative, 48 heures) ; contrôle de légalité du préfet ; citoyen de l'Union : vote aux municipales et européennes (article 20 du TFUE, article 88-3 de la Constitution) ; directive : obligation de transposition, la Commission peut engager un recours en manquement devant la Cour de justice de l'Union européenne ; primauté et effet direct sous conditions.",
        points: 20,
      },
      {
        titre: "Partie 5 — S'orienter dans l'organisation juridictionnelle (C6)",
        consigne: "Pour trois situations fictives (licenciement d'un salarié d'Atelier Valmontais, refus d'une aide sociale par le département, vol commis par un majeur), indiquez l'ordre de juridiction, la juridiction compétente, la voie de recours et un principe du procès équitable applicable.",
        reponseAttendue: "Licenciement : conseil de prud'hommes, appel devant la cour d'appel, pourvoi en cassation ; refus d'aide sociale : ordre administratif (tribunal administratif après recours préalable le cas échéant), appel devant la cour administrative d'appel, cassation devant le Conseil d'État ; vol, délit : tribunal correctionnel, appel devant la cour d'appel ; article 6 de la Convention européenne des droits de l'homme (tribunal indépendant et impartial, délai raisonnable, droits de la défense), aide juridictionnelle sous conditions de ressources.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const DRI47_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000037385728/",
      titreLien: "Légifrance — Code du travail, actions concourant au développement des compétences",
      titre: "Définition de l'action de formation et obligations de l'organisme",
      date: "Octobre 2026",
      commentaire: "Articles L. 6313-1 et suivants : l'action de formation est un parcours pédagogique permettant d'atteindre un objectif professionnel, qui peut être réalisé en tout ou partie à distance ; programme, contrat de formation, suivi de l'assiduité à distance, attestation de fin de formation et certificat de réalisation.",
      exploitation: "Preuve : fiche mémo archivée au dossier qualité. Action : vérification du contrat de formation, des relevés de connexion aux classes virtuelles et des documents de fin de formation.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — Journal officiel",
      titre: "Évolution du référentiel national qualité au 1er novembre 2026",
      date: "Novembre 2026",
      commentaire: "Le référentiel national qualité applicable aux organismes de formation évolue au 1er novembre 2026 ; suivi des indicateurs relatifs à l'analyse des besoins, au positionnement, à l'évaluation des acquis et à la satisfaction.",
      exploitation: "Preuve : note interne datée. Action : mise à jour de la procédure d'analyse des besoins et du QCM de positionnement de la formation.",
    },
    {
      lien: "https://www.conseil-constitutionnel.fr/",
      titreLien: "Conseil constitutionnel — décisions et texte de la Constitution",
      titre: "Mise à jour du contenu constitutionnel du support de cours",
      date: "Septembre 2026",
      commentaire: "Le texte de la Constitution en vigueur et les décisions récentes (contrôle a priori, questions prioritaires de constitutionnalité) sont vérifiés avant chaque session ; toute révision constitutionnelle est intégrée au module 3.",
      exploitation: "Preuve : date de vérification portée sur le support de cours. Action : relecture des articles cités (5, 8, 11, 12, 16, 19, 20, 21, 34, 37, 38, 45, 49, 55, 61, 61-1, 72, 88-1, 89).",
    },
    {
      lien: "https://www.service-public.fr/",
      titreLien: "Service-public.fr — droits et démarches",
      titre: "Accueil des personnes en situation de handicap en formation à distance",
      date: "Juillet 2026",
      commentaire: "Aménagements possibles en formation à distance : supports adaptés, sous-titrage, durée d'évaluation aménagée, rythme des classes virtuelles ; rôle du référent handicap.",
      exploitation: "Preuve : question systématique dans l'analyse des besoins. Action : procédure d'adaptation appliquée aux classes virtuelles et à l'évaluation finale.",
    },
  ],
  metier: [
    {
      lien: "https://www.vie-publique.fr/",
      titreLien: "Vie-publique.fr — institutions et collectivités",
      titre: "Actualité des institutions et des collectivités territoriales",
      date: "Octobre 2026",
      commentaire: "Les fiches de vie-publique.fr sur les institutions, les élections et les collectivités territoriales servent à vérifier les chiffres cités dans les modules 3 et 4 (nombre de députés et de sénateurs, modes de scrutin, compétences des collectivités).",
      exploitation: "Preuve : sélection de fiches ajoutée aux ressources. Action : contrôle des chiffres et des modes de scrutin avant chaque session.",
    },
    {
      lien: "https://www.courdecassation.fr/",
      titreLien: "Cour de cassation — organisation et jurisprudence",
      titre: "Évolutions de l'organisation juridictionnelle judiciaire",
      date: "Septembre 2026",
      commentaire: "Suivi de l'organisation de l'ordre judiciaire : tribunal judiciaire, cour criminelle départementale, expérimentation des tribunaux des activités économiques ; intégration des évolutions dans le module 6.",
      exploitation: "Preuve : schéma de l'organisation juridictionnelle daté. Action : mise à jour du schéma et du cas pratique d'orientation (mise en situation 10).",
    },
    {
      lien: "https://www.conseil-etat.fr/",
      titreLien: "Conseil d'État — juridiction administrative",
      titre: "Juridiction administrative et procédures d'urgence",
      date: "Août 2026",
      commentaire: "Présentation de la juridiction administrative (tribunaux administratifs, cours administratives d'appel, Conseil d'État) et des référés, utilisée pour les modules 4 et 6.",
      exploitation: "Preuve : fiche ressource déposée avec les supports. Action : vérification des délais de recours et du référé-liberté présentés en formation.",
    },
  ],
  technologique: [
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — recherche et versions des textes",
      titre: "Recherche juridique en ligne et versions en vigueur",
      date: "Octobre 2026",
      commentaire: "Les fonctionnalités de recherche de Légifrance (versions en vigueur, versions antérieures, liens entre textes) sont montrées en partage d'écran : la fiche méthode est mise à jour en cas d'évolution de l'interface.",
      exploitation: "Preuve : fiche méthode « Rechercher un texte sur Légifrance » datée. Action : démonstration en classe virtuelle au module 1.",
    },
    {
      lien: "https://eur-lex.europa.eu/",
      titreLien: "EUR-Lex — accès au droit de l'Union européenne",
      titre: "Textes consolidés et jurisprudence de l'Union européenne",
      date: "Septembre 2026",
      commentaire: "EUR-Lex donne accès aux traités, aux textes consolidés et aux arrêts de la Cour de justice : support de la mise en situation 9 et des recherches du module 5.",
      exploitation: "Preuve : fiche méthode « Lire un règlement et une directive sur EUR-Lex ». Action : exercice de recherche guidée au module 5.",
    },
    {
      lien: "https://www.service-public.fr/",
      titreLien: "Service-public.fr — protection des données personnelles",
      titre: "Données personnelles en classe virtuelle",
      date: "Août 2026",
      commentaire: "Classes virtuelles, relevés de connexion et résultats individuels du QCM de positionnement contiennent des données personnelles : information du stagiaire, finalité pédagogique, conservation limitée, conformément au règlement général sur la protection des données.",
      exploitation: "Preuve : mention d'information ajoutée au livret d'accueil. Action : aucun enregistrement des séances sans accord du stagiaire ; résultats communiqués au seul stagiaire et au formateur.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedDRI47AICaches(f: FormationInfo = FORMATION_DRI47): void {
  try {
    setCachedContentPack(f, DRI47_CONTENT_PACK);
    setCachedEvalPack(f, DRI47_EVAL_PACK);
    setCachedVeillePack(f, DRI47_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
