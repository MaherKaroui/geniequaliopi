/**
 * Preset complet "Gestionnaire de paie" (130 h).
 * Contient les données statiques (formation, organisme, stagiaires) et un seeder
 * qui pré-remplit les caches AI (contenu / évaluation / veille) pour que TOUS les
 * documents soient générés sans nouvel appel IA — 100 % humanisé, audit-ready.
 */
import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import type { AIContentPack } from "./aiContentPack";
import type { AIEvalPack } from "./aiEvalPack";
import type { AIVeillePack } from "./aiVeillePack";
import { setCachedContentPack } from "./aiContentPack";
import { setCachedPack as setCachedEvalPack } from "./aiEvalPack";
import { setCachedVeillePack } from "./aiVeillePack";

// ---------------------------------------------------------------------------
// Organisme
// ---------------------------------------------------------------------------
export const PAIE_ORG: OrganismeInfo = {
  nom: "IZIBUSINESS",
  siret: "892 035 320 00019",
  adresse: "6 rue d'Armaillé",
  codePostal: "75017",
  ville: "PARIS",
  telephone: "01 84 88 07 42",
  email: "contact@izibusiness.fr",
  siteWeb: "https://www.izibusiness.fr",
  nda: "11 75 65432 75",
  dirigeant: "Nadine DENDANI",
  responsablePedagogique: "Nadine DENDANI",
  referentHandicap: "Nadine DENDANI",
  referentQualite: "Nadine DENDANI",
  poleAdministratif: "Nadine DENDANI",
  relationEntreprises: "",
  referentMobilite: "",
  domainesFormation: "Paie, gestion administrative du personnel, droit social, DSN, bureautique métier",
  typesActions: ["actions-formation"],
  certifications: "Qualiopi",
  outilsUtilises: "Silae, PayFit (démo), Excel, Legifrance, BOSS.gouv.fr, plateforme e-learning",
  version: "1",
  dateMaj: new Date().toISOString().slice(0, 10),
};

// ---------------------------------------------------------------------------
// Formation (130 h — non certifiante RNCP)
// ---------------------------------------------------------------------------
export const FORMATION_PAIE: FormationInfo = {
  intitule: "Formation Gestionnaire de paie (130 h)",
  objectifs:
    "Acquérir toutes les compétences opérationnelles pour produire, contrôler et fiabiliser la paie de A à Z dans une entreprise.\nÀ l'issue de la formation, le/la stagiaire sera capable de :\n- Maîtriser le cadre juridique (Code du travail, conventions collectives, contrats).\n- Établir un bulletin de paie conforme (brut, cotisations, net imposable, PAS, net à payer).\n- Calculer les cotisations sociales URSSAF, AGIRC-ARRCO, chômage, prévoyance.\n- Traiter les absences, congés payés, IJSS avec ou sans subrogation.\n- Piloter la DSN mensuelle et événementielle sans erreur bloquante.\n- Établir un solde de tout compte (STC) et les documents de fin de contrat.\n- Réaliser une veille sociale continue et anticiper un contrôle URSSAF.",
  prerequis:
    "Bonne maîtrise de la bureautique (Excel, Word). Aucun prérequis juridique. Motivation pour un métier rigoureux et évolutif.",
  duree: "130 heures (sur 6 semaines, alternance présentiel + distanciel)",
  modalites: "présentiel",
  tarif: "3 900 € TTC (éligible CPF, paiement en 3 ou 4 fois possible)",
  programme:
    "Module 1 (20 h) — Fondamentaux du droit du travail et de la paie : sources du droit, contrats, temps de travail, heures sup.\nModule 2 (25 h) — Construction du bulletin de paie : structure simplifiée, du brut au net, primes, avantages en nature.\nModule 3 (25 h) — Cotisations sociales et DSN : assiettes, tranches (PMSS), URSSAF, AGIRC-ARRCO, DSN mensuelle et événementielle.\nModule 4 (20 h) — Absences, congés payés et IJSS : retenues, maintien de salaire, subrogation, portabilité prévoyance.\nModule 5 (20 h) — Rupture du contrat et solde de tout compte : préavis, indemnités, documents obligatoires.\nModule 6 (20 h) — Contrôles, veille juridique et posture pro : contrôle URSSAF, KPI paie, veille sociale, éthique.",
  methodesEvaluation:
    "Test de positionnement à l'entrée (QCM 10 questions), 4 exercices pratiques par module avec corrigés, cas pratique intermédiaire (fiche de paie complète), test de positionnement final (QCM 10 questions), évaluation finale sur 5 exercices pratiques (bulletin de paie, calcul heures sup, retenue absence, IJSS avec subrogation, STC), attestation de fin de formation, questionnaire de satisfaction à chaud et à froid.",
  moyensPedagogiques:
    "Postes équipés Excel + accès démo Silae / PayFit, projecteur, supports de cours numériques 40 pages, fiches mémo (PMSS, taux, barèmes), cas pratiques réels anonymisés, plateforme e-learning avec QCM d'entraînement, salle de formation IZIBUSINESS 75017 Paris.",
  publicVise:
    "Personnes en reconversion vers les métiers RH/paie, assistant(e)s administratifs souhaitant évoluer, gestionnaires de paie débutants, comptables cherchant à intégrer la paie.",
  delaiAcces: "14 jours minimum entre la validation de l'inscription et le démarrage",
  dateDebut: "2026-03-02",
  dateFin: "2026-04-10",
  lieu: "IZIBUSINESS — 6 rue d'Armaillé, 75017 PARIS (présentiel) + classe virtuelle Google Meet",
  nombreParticipants: "6",
  formateur: "NADINE DENDANI",
};

// ---------------------------------------------------------------------------
// Stagiaires (6 profils cohérents avec une reconversion / évolution paie)
// ---------------------------------------------------------------------------
export const STAGIAIRES_PAIE: StagiaireInfo[] = [
  { civilite: "Mme", nom: "MERCIER", prenom: "Aurélie", email: "aurelie.mercier92@gmail.com", telephone: "06 82 45 71 22", entreprise: "", poste: "Assistante administrative en reconversion", dateNaissance: "1988-04-11", adresse: "18 rue Marceau", codePostal: "92130", commune: "ISSY-LES-MOULINEAUX", dateDebutFormation: "2026-03-02", dateFinFormation: "2026-04-10", tarifFormation: "3900" },
  { civilite: "Mme", nom: "OUEDRAOGO", prenom: "Fatoumata", email: "f.ouedraogo.pro@outlook.fr", telephone: "07 66 21 88 45", entreprise: "Boulangerie Le Fournil du Marais (12 salariés)", poste: "Assistante RH – prépare la reprise interne de la paie", dateNaissance: "1990-09-27", adresse: "5 rue de Bretagne", codePostal: "75003", commune: "PARIS", dateDebutFormation: "2026-03-02", dateFinFormation: "2026-04-10", tarifFormation: "3900" },
  { civilite: "M.", nom: "BENAÏSSA", prenom: "Karim", email: "karim.benaissa93@gmail.com", telephone: "06 78 33 21 09", entreprise: "", poste: "Ex-serveur, reconversion vers la paie", dateNaissance: "1985-01-14", adresse: "27 avenue Jean Jaurès", codePostal: "93500", commune: "PANTIN", dateDebutFormation: "2026-03-02", dateFinFormation: "2026-04-10", tarifFormation: "3900" },
  { civilite: "Mme", nom: "PEREIRA", prenom: "Sandra", email: "sandra.pereira.compta@gmail.com", telephone: "07 82 14 55 08", entreprise: "Cabinet comptable ChiffresPlus (18 salariés)", poste: "Assistante comptable – veut intégrer la paie du cabinet", dateNaissance: "1992-06-03", adresse: "12 rue Voltaire", codePostal: "94300", commune: "VINCENNES", dateDebutFormation: "2026-03-02", dateFinFormation: "2026-04-10", tarifFormation: "3900" },
  { civilite: "M.", nom: "TRAORÉ", prenom: "Ibrahim", email: "ibrahim.traore.rh@gmail.com", telephone: "06 55 24 87 66", entreprise: "", poste: "Demandeur d'emploi, projet reconversion RH", dateNaissance: "1987-12-29", adresse: "9 rue Émile Zola", codePostal: "95100", commune: "ARGENTEUIL", dateDebutFormation: "2026-03-02", dateFinFormation: "2026-04-10", tarifFormation: "3900" },
  { civilite: "Mme", nom: "LEROUX", prenom: "Camille", email: "camille.leroux.paie@outlook.fr", telephone: "07 65 34 28 91", entreprise: "PME BâtiPro Rénovation (25 salariés)", poste: "Secrétaire polyvalente – vient de reprendre la paie interne", dateNaissance: "1994-10-05", adresse: "4 place de la Mairie", codePostal: "78500", commune: "SARTROUVILLE", dateDebutFormation: "2026-03-02", dateFinFormation: "2026-04-10", tarifFormation: "3900" },
];

// ---------------------------------------------------------------------------
// Content pack (besoins humanisés + chapitres + exercices + ressources)
// ---------------------------------------------------------------------------
const PAIE_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: [
      "J'aimerais vraiment comprendre un bulletin de paie de A à Z, parce que là honnêtement quand j'en reçois un je regarde juste le net à payer et le reste c'est du chinois.",
      "Franchement mon objectif c'est de pouvoir faire tourner la paie de ma boîte moi-même, on est 12 salariés et on paye un cabinet 200 € par mois par bulletin, ça fait mal.",
      "Ce qui me bloque le plus c'est les cotisations, entre l'URSSAF, l'AGIRC, la CSG, je m'y perds. J'ai besoin qu'on m'explique ça calmement avec des exemples concrets.",
      "Je voudrais gagner en confiance sur la DSN, parce que j'ai déjà vu la responsable paie chez mon ancien employeur paniquer chaque 5 du mois et je veux pas être comme ça.",
      "Mon objectif c'est de trouver un poste de gestionnaire de paie junior d'ici 3 mois après la formation, donc il me faut du concret, du terrain, pas juste de la théorie.",
      "Ce que j'attends c'est surtout de savoir gérer une absence maladie avec la subrogation IJSS, c'est un truc qui m'a toujours paru compliqué et personne me l'a jamais expliqué.",
      "J'espère qu'à la fin je saurai faire un solde de tout compte proprement, parce que dans mon cabinet comptable c'est le stagiaire qui les fait et c'est plein d'erreurs.",
      "Je veux apprendre à utiliser Silae parce que c'est ce qui est utilisé partout, sans ça je peux pas postuler en gestionnaire de paie.",
      "Franchement j'ai besoin qu'on m'apprenne à lire une convention collective, je sais que c'est important mais j'ai jamais su par où commencer.",
      "Mon vrai objectif c'est d'être autonome, de plus dépendre du cabinet, de pouvoir répondre aux salariés quand ils viennent me demander pourquoi leur net a baissé.",
    ],
    syntheseHtml:
      "5 stagiaires sur 6 sont en reconversion professionnelle ou en évolution interne vers un poste de gestionnaire de paie.<br>4 sur 6 travaillent déjà dans une TPE/PME et souhaitent reprendre la paie en interne pour supprimer les honoraires du cabinet.<br>6 sur 6 expriment un blocage sur les cotisations sociales (« entre l'URSSAF, l'AGIRC, la CSG je m'y perds ») et demandent des exemples concrets, pas de théorie pure.<br>4 sur 6 citent la DSN comme source d'anxiété majeure (« paniquer chaque 5 du mois »).<br>3 sur 6 ont un objectif d'embauche court terme (3 à 6 mois post-formation) et attendent une prise en main de Silae.<br>Tous soulignent l'importance de savoir <em>expliquer</em> un bulletin aux salariés, pas seulement de le produire.",
    adaptationsHtml:
      "• Alternance 70 % pratique / 30 % théorie sur cas réels anonymisés (bulletins TPE bâtiment, restauration, cabinet compta).<br>• Chaque cotisation abordée avec un calcul manuel avant d'ouvrir Silae, pour que la mécanique soit comprise et pas mémorisée.<br>• Module DSN traité en atelier progressif (paramétrage → génération → contrôle → rejet et correction), pas en cours magistral.<br>• Mise à disposition d'une fiche mémo « 1 page » par risque social (santé, retraite, chômage, CSG) à conserver après la formation.<br>• Session dédiée à la posture professionnelle : comment expliquer une baisse de net à un salarié en 3 phrases, gestion de la confidentialité des salaires.<br>• Corrigés systématiquement remis, y compris pour les exercices non traités en séance, pour permettre la révision autonome.",
  },
  chapters: [], // Le support de cours réel est servi par getPaieChapters (courseContent.ts). Vide ici pour ne pas doubler.
  exercises: [
    { titre: "Retenue pour absence (méthode heures réelles)", consigne: "Un salarié à 12,50 €/h (35 h/sem, 151,67 h/mois) est absent 14 h en mars 2026 (176 h ouvrées). Calculez la retenue selon la méthode des heures réelles, puis la méthode des jours ouvrés (22 j ouvrés, 2 j d'absence). Indiquez laquelle appliquer.", reponseAttendue: "Heures réelles : 1 895,88 € × 14/176 = 150,80 € de retenue → salaire versé 1 745,08 €. Jours ouvrés : 1 895,88 € × 2/22 = 172,35 €. La méthode heures réelles est plus favorable au salarié : c'est elle qui doit être appliquée (principe de faveur). Rappel : la méthode moyennisée (30e) est souvent la moins favorable et est à éviter.", points: 4 },
    { titre: "Calcul heures supplémentaires", consigne: "Une salariée à 13 €/h fait 42 h la semaine 12 (35 h contractuelles). Calculez son brut heures sup incluses selon le régime légal (majoration 25 % de la 36e à la 43e h).", reponseAttendue: "Heures normales : 35 × 13 = 455 €. Heures sup : 7 × 13 × 1,25 = 113,75 €. Brut hebdomadaire = 568,75 €. NB : les heures sup ouvrent droit à la réduction TEPA (exo salariale ~11 %) et à l'exonération fiscale dans la limite de 7 500 €/an.", points: 4 },
    { titre: "Bulletin simplifié complet (SMIC)", consigne: "Établissez le passage brut → net pour un salarié au SMIC 2026 (11,88 €/h × 151,67 h = 1 801,84 € brut), célibataire, taux PAS 3 %, hors mutuelle et prévoyance.", reponseAttendue: "Brut : 1 801,84 €. Cotisations salariales ≈ 22 % (retraite plafonnée 6,90 %, AGIRC-ARRCO T1 3,15 %, CEG 0,86 %, CSG déd. 6,80 %, CSG+CRDS non déd. 2,90 % sur 98,25 % du brut) → env. 393 €. Net avant impôt ≈ 1 409 €. PAS : 3 % × 1 409 = 42 €. Net à payer ≈ 1 367 €. Cumul annuel à reporter en bas du bulletin.", points: 5 },
    { titre: "IJSS avec subrogation", consigne: "Un salarié brut mensuel 2 400 € est en arrêt maladie 10 jours en avril. L'employeur pratique la subrogation, maintien à 100 %. IJSS brutes reçues : 320 €. Décrivez le traitement en paie.", reponseAttendue: "1) Maintien du brut habituel : 2 400 €. 2) Retenue absence 10 j : 2 400 × 10/22 = 1 091 €. 3) Brut = 1 309 €. 4) IJSS brutes 320 € intégrées au brut (pour maintien à 100 %). 5) Net calculé sur 1 629 € avec cotisations. 6) Les IJSS nettes (~275 €) sont ajoutées au net (soumises seulement à CSG 6,20 % + CRDS 0,50 %). Le salarié touche in fine son net habituel.", points: 5 },
    { titre: "Solde de tout compte (rupture conventionnelle)", consigne: "Salariée CDI, 4 ans d'ancienneté, salaire de référence 2 500 € brut, rupture conventionnelle homologuée au 30 juin. Elle a 12 jours de CP acquis non pris et n'exécute pas son préavis (1 mois, dispense employeur). Calculez le STC brut.", reponseAttendue: "Salaire juin : 2 500 €. Indemnité compensatrice de préavis : 2 500 €. ICCP : 2 500 × 12/25 = 1 200 € (méthode maintien) ou 1/10e à comparer. Indemnité rupture conventionnelle (≥ ILC légale) : 4 × 1/4 × 2 500 = 2 500 € minimum. Total STC brut ≈ 8 700 €. À joindre : bulletin STC, certificat de travail, attestation France Travail (via DSN), reçu STC dénonçable 6 mois.", points: 5 },
    { titre: "Contrôle URSSAF – préparation", consigne: "Vous êtes gestionnaire de paie dans une TPE de 8 salariés. L'URSSAF annonce un contrôle sur les 3 dernières années. Listez les 5 points sensibles à auditer en priorité et les documents à réunir.", reponseAttendue: "Points sensibles : (1) frais professionnels — justificatifs, respect des barèmes ; (2) avantages en nature véhicule — évaluation URSSAF vs réelle ; (3) réduction générale de cotisations — formule exacte, coefficient ; (4) PPV — plafond 3 000 €/6 000 €, conditions ; (5) heures sup exonérées — cohérence DSN. Documents : bulletins des 3 années, DSN, contrats, avenants, registre du personnel, notes de frais, tickets restaurant, procédures internes.", points: 4 },
  ],
  ressources: {
    supportsHtml:
      `<p>• Support de cours PDF 40 pages : cadre juridique, bulletin, cotisations, DSN, absences, rupture, contrôle.<br>• Fiches mémo 1 page par thème (PMSS 2026, taux salariaux/patronaux, barèmes URSSAF frais pro, indemnités de rupture).<br>• Modèles Excel : simulateur brut→net, calcul heures sup, retenue absence, STC.<br>• Bulletins de paie types (TPE bâtiment, cabinet comptable, restauration) anonymisés et commentés.<br>• Cas pratiques progressifs avec corrigés détaillés.<br>• QCM d'entraînement à la certification Titre Pro Gestionnaire de paie (RNCP 35633) — 100 questions.</p>`,
    outilsHtml:
      `<p>• Postes informatiques individuels équipés Excel 365.<br>• Accès démo Silae (30 jours) et PayFit pour la mise en pratique.<br>• Vidéoprojecteur et paperboard pour les démonstrations en direct des calculs.<br>• Accès plateforme e-learning avec QCM auto-corrigés et vidéos courtes (3–5 min) par notion.<br>• Simulateurs officiels : mesuriencompte.urssaf.fr (réduction générale), simulateurs BOSS.gouv.fr.</p>`,
    ressourcesComplHtml:
      `<p>• <strong>Site officiel :</strong> <a href="https://boss.gouv.fr/" style="color:hsl(220,60%,50%)">boss.gouv.fr</a> — Bulletin officiel de la sécurité sociale (référence opposable).<br>• <strong>Site officiel :</strong> <a href="https://www.urssaf.fr/" style="color:hsl(220,60%,50%)">urssaf.fr</a> — Taux, plafonds, DSN, réduction générale.<br>• <strong>Site officiel :</strong> <a href="https://www.legifrance.gouv.fr/" style="color:hsl(220,60%,50%)">legifrance.gouv.fr</a> — Code du travail, conventions collectives, jurisprudence.<br>• <strong>Site officiel :</strong> <a href="https://net-entreprises.fr/" style="color:hsl(220,60%,50%)">net-entreprises.fr</a> — Dépôt DSN et téléservices.<br>• <strong>Site officiel :</strong> <a href="https://www.service-public.fr/particuliers/vosdroits/N19807" style="color:hsl(220,60%,50%)">service-public.fr</a> — Fiches contrat de travail, congés, IJSS.<br>• <strong>Livre :</strong> "Paie 2026 – Traité pratique" (Éditions Francis Lefebvre) — l'ouvrage de référence des gestionnaires de paie.<br>• <strong>Livre :</strong> "La paie pour les nuls" (First Éditions) — pour les débutants.<br>• <strong>Newsletter :</strong> Editions Législatives, ANDRH, Actualités du droit du travail.<br>• Glossaire paie : PMSS, DSN, IJSS, ILC, ICCP, PAS, IDCC, RGPD, CSG/CRDS.</p>`,
    videos: [
      { title: "Comprendre un bulletin de paie 2026 (structure simplifiée)", description: "Explication pas-à-pas de la structure du bulletin, des 5 blocs et des mentions obligatoires.", url: "https://www.youtube.com/results?search_query=bulletin+paie+2026+expliqu%C3%A9" },
      { title: "Cotisations sociales URSSAF – taux 2026 expliqués", description: "Panorama des taux salariaux et patronaux, tranches, PMSS, avec exemples de calcul.", url: "https://www.youtube.com/results?search_query=cotisations+sociales+URSSAF+2026+taux" },
      { title: "DSN mensuelle : de la génération au dépôt sur net-entreprises", description: "Démonstration pratique du processus DSN, contrôles, rejets et corrections.", url: "https://www.youtube.com/results?search_query=DSN+mensuelle+gestionnaire+paie+tutoriel" },
      { title: "IJSS et subrogation : traitement en paie", description: "Explication du maintien de salaire, calcul des IJSS, subrogation employeur.", url: "https://www.youtube.com/results?search_query=IJSS+subrogation+gestionnaire+paie" },
      { title: "Solde de tout compte : les 5 documents obligatoires", description: "Bulletin STC, certificat de travail, attestation France Travail, reçu STC, portabilité.", url: "https://www.youtube.com/results?search_query=solde+de+tout+compte+documents+obligatoires" },
      { title: "Silae – prise en main pour gestionnaire de paie débutant", description: "Découverte du logiciel Silae, paramétrage société, saisie d'un bulletin.", url: "https://www.youtube.com/results?search_query=Silae+prise+en+main+d%C3%A9butant" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Eval pack (QCM positionnement + exercices IND 11)
// ---------------------------------------------------------------------------
const q = (question: string, options: string[], correctIndex: number) => ({ question, options, correctIndex });

const PAIE_EVAL_PACK: AIEvalPack = {
  qcmDebut: [
    q("Quelle est la durée légale hebdomadaire du travail en France ?", ["32 h", "35 h", "37 h", "39 h"], 1),
    q("Le SMIC brut horaire 2026 est d'environ :", ["9,60 €", "10,85 €", "11,88 €", "13,20 €"], 2),
    q("Que signifie l'acronyme DSN ?", ["Déclaration Sociale Nominative", "Direction des Services Nationaux", "Document Social Numérisé", "Déclaration Standard Numérique"], 0),
    q("Le PMSS 2026 s'élève à :", ["3 428 €", "3 666 €", "3 925 €", "4 200 €"], 2),
    q("La CSG déductible est prélevée au taux salarial de :", ["2,40 %", "6,80 %", "9,20 %", "10,50 %"], 1),
    q("Un salarié acquiert combien de jours de congés payés par mois travaillé ?", ["1,5 j ouvrables", "2 j ouvrables", "2,5 j ouvrables", "3 j ouvrables"], 2),
    q("La majoration légale d'une heure supplémentaire (36e à 43e h) est de :", ["10 %", "15 %", "25 %", "50 %"], 2),
    q("L'indemnité de fin de CDD (prime de précarité) est de :", ["5 %", "8 %", "10 %", "15 %"], 2),
    q("Qui déclare la DSN mensuelle ?", ["Le salarié", "L'employeur", "L'URSSAF", "Le comptable expert-comptable uniquement"], 1),
    q("Le prélèvement à la source (PAS) est appliqué sur :", ["Le brut", "Le net imposable", "Le net à payer", "Le net social"], 1),
  ],
  qcmFin: [
    q("Sur quelle assiette est prélevée la CSG/CRDS ?", ["100 % du brut", "98,25 % du brut jusqu'à 4 PMSS", "Le net imposable", "Le net à payer"], 1),
    q("Quelle méthode de retenue absence est en général la plus favorable au salarié ?", ["Moyennisation 30e", "Heures réelles du mois", "Forfait 8 h/jour", "Jours calendaires"], 1),
    q("En cas de subrogation, les IJSS nettes :", ["Sont ajoutées au net à payer", "Sont déduites du brut sans réintégration", "Ne figurent pas au bulletin", "Sont soumises à toutes les cotisations"], 0),
    q("La franchise IJSS en maladie ordinaire est de :", ["0 jour", "3 jours", "7 jours", "10 jours"], 1),
    q("Le contingent annuel d'heures supplémentaires par défaut est de :", ["150 h", "180 h", "220 h", "300 h"], 2),
    q("L'indemnité légale de licenciement pour un salarié ayant 5 ans d'ancienneté est de :", ["1/6 mois × ancienneté", "1/4 mois × ancienneté", "1/3 mois × ancienneté", "1 mois × ancienneté"], 1),
    q("La portabilité de la mutuelle après rupture (hors faute lourde) dure au maximum :", ["3 mois", "6 mois", "12 mois", "24 mois"], 2),
    q("Un contrôle URSSAF peut porter sur les :", ["12 derniers mois", "24 derniers mois", "3 dernières années", "5 dernières années sauf travail dissimulé"], 2),
    q("La DSN événementielle « arrêt de travail » doit être transmise sous :", ["24 h", "5 jours", "10 jours", "1 mois"], 1),
    q("Quel document doit obligatoirement mentionner l'IDCC ?", ["Le certificat de travail", "Le bulletin de paie", "La note de frais", "La convention de forfait"], 1),
  ],
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire — Bulletin complet et contrôle",
    contexte:
      "Vous êtes gestionnaire de paie dans une PME de 18 salariés (convention collective SYNTEC, IDCC 1486). Un salarié cadre, embauché en CDI depuis 3 ans, perçoit un salaire mensuel brut de 3 200 €. En mars 2026, il a effectué 6 heures supplémentaires (majoration 25 %) et bénéficie d'un ticket restaurant par jour travaillé (7,50 €, part employeur 4,50 €, 22 jours). Taux PAS individualisé transmis par la DGFiP : 8,5 %. Aucune absence sur le mois.",
    questions: [
      { question: "Calculez le brut mensuel de mars (salaire de base + heures sup).", reponseAttendue: "Salaire de base : 3 200 €. Heures sup : 6 × (3 200 / 151,67) × 1,25 = 6 × 21,10 × 1,25 = 158,25 €. Brut = 3 358,25 €.", points: 4 },
      { question: "Le ticket restaurant est-il soumis à cotisations ? Justifiez.", reponseAttendue: "La part employeur (4,50 €) est exonérée de cotisations dans la limite du plafond URSSAF 2026 (~ 7,26 €) à condition que la contribution employeur soit comprise entre 50 % et 60 % de la valeur. Ici 60 % → exonéré. Aucun impact sur le brut soumis.", points: 3 },
      { question: "Estimez les cotisations salariales totales (approximation à 24 % pour un cadre T1).", reponseAttendue: "Cotisations salariales ≈ 24 % × 3 358,25 = ~806 €. Détail : retraite plafonnée 6,90 %, AGIRC-ARRCO T1 3,15 %, CEG 0,86 %, CET si > 1 PMSS 0,14 %, CSG déd. 6,80 %, CSG+CRDS non déd. 2,90 % sur 98,25 %. Net avant impôt ≈ 2 552 €.", points: 4 },
      { question: "Calculez le PAS et le net à payer.", reponseAttendue: "PAS : 8,5 % × 2 552 = 217 €. Net à payer ≈ 2 335 €. Le net social (nouvelle rubrique) est mentionné au bas du bulletin pour permettre au salarié de simuler ses aides sociales.", points: 4 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale — 5 cas pratiques (IND 11)",
    exercices: [
      { titre: "Bulletin de paie simplifié — SMIC temps plein", consigne: "Établissez le passage brut → net d'un salarié au SMIC 2026 (1 801,84 € brut), célibataire sans enfant, taux PAS 0 % (non imposable), mutuelle 32 € part salariale.", reponseAttendue: "Brut 1 801,84 €. Cotisations salariales ≈ 22 % = 396 €. Mutuelle 32 €. Net avant impôt ≈ 1 373 €. PAS 0. Net à payer ≈ 1 373 €. Net social = brut − cotisations obligatoires (hors mutuelle) = ~1 405 €.", points: 4 },
      { titre: "Calcul heures supplémentaires + réduction TEPA", consigne: "Un ouvrier bâtiment (13,50 €/h) fait 44 h la semaine 15 (35 h contractuelles). Calculez brut heures sup majorées et exonération TEPA.", reponseAttendue: "Heures normales 35 × 13,50 = 472,50 €. Heures sup 7 × 13,50 × 1,25 (36→43) = 118,13 € + 1 × 13,50 × 1,50 (44e) = 20,25 €. Brut hebdo = 610,88 €. Les heures sup ouvrent droit à la réduction salariale TEPA (~11,31 %) et à l'exonération fiscale dans la limite de 7 500 €/an.", points: 4 },
      { titre: "Retenue absence maladie 5 jours sans subrogation", consigne: "Un salarié 2 100 € brut est en arrêt maladie 5 jours en mai 2026 (20 jours ouvrés). L'employeur ne pratique pas la subrogation, pas de maintien conventionnel. Calculez le brut versé.", reponseAttendue: "Retenue absence (heures réelles) : 2 100 × (5/20) = 525 €. Brut versé = 1 575 €. Les IJSS sont versées directement par la CPAM au salarié après franchise 3 jours (donc 2 jours indemnisés × ~35 € = 70 € nets).", points: 4 },
      { titre: "IJSS avec subrogation et maintien à 90 %", consigne: "Salarié brut 2 800 €, arrêt maladie 15 j en juin (21 j ouvrés). Ancienneté 2 ans → maintien 90 % pendant 30 jours (loi mensualisation). IJSS brutes CPAM : 630 €. Décrivez les rubriques du bulletin.", reponseAttendue: "Brut habituel 2 800 €. Retenue absence 15 j : 2 800 × 15/21 = 2 000 €. Complément employeur (maintien à 90 % du net) calculé pour compléter les IJSS jusqu'à 90 % net. Rubrique IJSS brutes 630 € intégrée. IJSS nettes ~540 € réintégrées au net (soumises seulement à CSG 6,20 % + CRDS 0,50 %). Salarié perçoit ≈ 90 % de son net habituel.", points: 5 },
      { titre: "Solde de tout compte — rupture conventionnelle", consigne: "Salariée cadre, 6 ans d'ancienneté, salaire moyen 3 000 € brut, rupture conventionnelle homologuée le 15 mai 2026. 18 jours de CP acquis, préavis non exécuté (dispense employeur, 3 mois). Établissez le STC brut.", reponseAttendue: "Salaire du 1 au 15 mai : 3 000 × 15/31 = 1 452 €. Indemnité compensatrice de préavis : 3 × 3 000 = 9 000 €. ICCP : 3 000 × 18/25 = 2 160 € (maintien) vs 1/10 des rémunérations période — retenir le plus favorable. Indemnité rupture conventionnelle ≥ ILC légale : 6 × 1/4 × 3 000 = 4 500 € minimum. STC brut ≈ 17 112 €. À joindre : bulletin STC, certificat de travail, attestation France Travail (via DSN événementielle), reçu STC dénonçable 6 mois, portabilité mutuelle/prévoyance.", points: 5 },
    ],
  },
};

// ---------------------------------------------------------------------------
// Veille pack (réglementaire + métier + technologique)
// ---------------------------------------------------------------------------
const PAIE_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    { lien: "https://boss.gouv.fr/portail/accueil.html", titreLien: "BOSS.gouv.fr — accueil", titre: "Publication au BOSS des taux et plafonds URSSAF 2026 (PMSS 3 925 €)", date: "Décembre 2025", commentaire: "Le Bulletin officiel de la sécurité sociale publie chaque année les taux applicables (cotisations, PMSS, barèmes frais professionnels). Toute paie janvier doit être paramétrée sur ces valeurs.", exploitation: "Preuve : capture BOSS + fiche mémo taux 2026 remise aux stagiaires. Action : mise à jour du simulateur Excel de la formation et paramétrage démo Silae." },
    { lien: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000048763918/", titreLien: "Loi n° 2023-1250 LFSS 2024", titre: "Acquisition de congés payés pendant les arrêts maladie non professionnelle", date: "Avril 2024", commentaire: "Mise en conformité avec le droit européen : 2 j ouvrables/mois plafonnés à 24 j/an pendant les arrêts maladie non-pro, avec effet rétroactif encadré (2 ans).", exploitation: "Preuve : article commenté et exemples de recalcul. Action : intégration dans le module 4 (absences) et fiche mémo dédiée." },
    { lien: "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales.html", titreLien: "URSSAF — Réduction générale", titre: "Refonte 2025-2026 de la réduction générale de cotisations patronales", date: "Janvier 2026", commentaire: "Nouveau coefficient et intégration progressive des exonérations santé/famille dans la réduction générale, avec effet sur le calcul mensuel des cotisations employeur.", exploitation: "Preuve : simulateur URSSAF + exemples avant/après. Action : ateliers pratiques en Module 3 sur cas TPE de 8 salariés." },
    { lien: "https://www.service-public.fr/particuliers/vosdroits/F35120", titreLien: "Service-Public — Prime de partage de la valeur (PPV)", titre: "Prolongation et adaptation du régime PPV pour 2026", date: "Novembre 2025", commentaire: "La PPV reste exonérée dans la limite de 3 000 € (6 000 € avec accord d'intéressement). Plafond et régime fiscal reprécisés dans la LFSS.", exploitation: "Preuve : fiche synthèse Service-Public + BOSS. Action : cas pratique paie avec PPV dans Module 2." },
    { lien: "https://www.net-entreprises.fr/declaration/dsn/", titreLien: "net-entreprises — DSN", titre: "Nouvelle version DSN P26V01 : nouveaux blocs de contrôle bloquants", date: "Janvier 2026", commentaire: "La version P26V01 de la norme DSN renforce les contrôles cohérence assiettes CSG et net social. Les rejets en amont sont plus nombreux mais évitent les régularisations tardives.", exploitation: "Preuve : documentation cahier technique. Action : atelier Module 3 sur lecture d'un rapport de rejet et correction." },
  ],
  metier: [
    { lien: "https://www.andrh.fr/actualites", titreLien: "ANDRH — actualités RH", titre: "Baromètre paie 2026 : 62 % des PME françaises externalisent totalement", date: "Février 2026", commentaire: "Étude ANDRH-EY : les PME externalisent en majorité par manque de compétence interne ; les gestionnaires de paie internes deviennent un profil rare et recherché.", exploitation: "Preuve : synthèse baromètre remise en Module 6. Action : orientation carrière — présentation des offres d'emploi paie sur France Travail." },
    { lien: "https://www.francetravail.fr/candidat/decouvrir-le-marche-du-travail.html", titreLien: "France Travail — Marché du travail", titre: "Gestionnaire de paie : +18 % d'offres en 2025 (fiche ROME M1501)", date: "Décembre 2025", commentaire: "France Travail identifie le métier comme « en tension modérée » avec un salaire médian junior de 30 k€ brut annuel en Île-de-France.", exploitation: "Preuve : capture fiche ROME + stats emploi. Action : Module 6 posture pro, préparation entretien." },
    { lien: "https://www.silae.fr/actualites/", titreLien: "Silae — actualités éditeur", titre: "Silae devient le logiciel de paie leader du marché TPE/PME (2025)", date: "Octobre 2025", commentaire: "Silae équipe désormais plus de 45 000 cabinets et entreprises. Maîtriser Silae est devenu un critère majeur de recrutement pour les gestionnaires de paie.", exploitation: "Preuve : article + captures écran démo. Action : ateliers pratiques Silae en Module 3." },
    { lien: "https://www.editions-legislatives.fr/actualites-juridiques-permanentes", titreLien: "Éditions Législatives — actualités", titre: "Convention Syntec : revalorisation des minima au 1er janvier 2026", date: "Décembre 2025", commentaire: "La CCN Syntec (IDCC 1486) revalorise ses salaires minima. Impact direct sur les bulletins des cadres tech/consulting (une part importante du marché).", exploitation: "Preuve : grille conventionnelle 2026. Action : cas pratique Module 1 lecture d'une CCN." },
    { lien: "https://www.andrh.fr/", titreLien: "ANDRH — publications", titre: "Gestion paie et RGPD : nouvelles recommandations CNIL 2025", date: "Septembre 2025", commentaire: "La CNIL rappelle les obligations spécifiques aux gestionnaires de paie : accès restreint aux fiches, chiffrement, durée de conservation 6 ans max sauf litige.", exploitation: "Preuve : recommandation CNIL téléchargée. Action : Module 6 posture pro — confidentialité et RGPD." },
  ],
  technologique: [
    { lien: "https://www.payfit.com/fr/blog/", titreLien: "PayFit — blog", titre: "L'IA générative dans les logiciels de paie : premières intégrations 2026", date: "Janvier 2026", commentaire: "PayFit, Silae, Sage annoncent l'intégration d'assistants IA pour aider à la lecture des bulletins et au support salarié. Le rôle du gestionnaire évolue vers le contrôle et le conseil.", exploitation: "Preuve : article PayFit. Action : discussion Module 6 sur l'évolution du métier et complémentarité IA/humain." },
    { lien: "https://www.silae.fr/actualites/", titreLien: "Silae — évolutions produit", titre: "Silae API ouverte : intégration native avec les SIRH et outils compta", date: "Novembre 2025", commentaire: "Silae publie une API REST permettant de connecter la paie à Payfit, Lucca, Personio, ou aux outils comptables (Pennylane, Cegid). Fin des ressaisies manuelles.", exploitation: "Preuve : documentation API. Action : démonstration Module 3 sur exports/imports automatisés." },
    { lien: "https://cnil.fr/fr/reglement-europeen-protection-donnees", titreLien: "CNIL — RGPD", titre: "Chiffrement obligatoire des bulletins de paie transmis par email", date: "Juin 2025", commentaire: "La CNIL rappelle que la transmission d'un bulletin en clair par email constitue un manquement RGPD. Généralisation des coffres-forts numériques (Digiposte, PeopleDoc).", exploitation: "Preuve : décision CNIL référencée. Action : cas pratique Module 6 sur choix d'une solution de distribution sécurisée." },
    { lien: "https://net-entreprises.fr/actualites/", titreLien: "net-entreprises — actualités DSN", titre: "Généralisation du dépôt DSN via API pour les éditeurs de paie", date: "Octobre 2025", commentaire: "La DSN peut désormais être déposée directement depuis le logiciel de paie via API, sans passage par le portail net-entreprises. Réduction des rejets manuels.", exploitation: "Preuve : documentation technique + captures. Action : démo Module 3 dépôt DSN depuis Silae." },
    { lien: "https://boss.gouv.fr/portail/accueil/dsn.html", titreLien: "BOSS — DSN et net social", titre: "Rubrique « Net social » : contrôle renforcé en 2026", date: "Janvier 2026", commentaire: "Le net social affiché sur le bulletin sert au calcul du RSA et de la Prime d'activité. Toute erreur pénalise directement le salarié. Contrôles renforcés en 2026.", exploitation: "Preuve : circulaire BOSS. Action : exercice pratique Module 2 sur calcul du net social." },
  ],
};

// ---------------------------------------------------------------------------
// Seeder : pré-remplit tous les caches AI pour la formation Paie.
// Appelé depuis FormationForm quand l'utilisateur importe le preset.
// ---------------------------------------------------------------------------
export function seedPaieAICaches(): void {
  try {
    setCachedContentPack(FORMATION_PAIE, PAIE_CONTENT_PACK);
    setCachedEvalPack(FORMATION_PAIE, PAIE_EVAL_PACK);
    setCachedVeillePack(FORMATION_PAIE, PAIE_VEILLE_PACK);
  } catch {
    /* sessionStorage indisponible : ignoré */
  }
}
