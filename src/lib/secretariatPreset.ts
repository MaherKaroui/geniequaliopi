/**
 * Preset complet "Secrétariat" (70 h).
 * Formation, organisme, stagiaires + seeder qui pré-remplit les caches IA (contenu,
 * évaluation, veille) pour que tous les documents soient générés sans appel IA.
 */
import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import type { AIContentPack } from "./aiContentPack";
import type { AIEvalPack } from "./aiEvalPack";
import type { AIVeillePack } from "./aiVeillePack";
import { setCachedContentPack } from "./aiContentPack";
import { setCachedPack as setCachedEvalPack } from "./aiEvalPack";
import { setCachedVeillePack } from "./aiVeillePack";
import type { PaieModuleExercises } from "./paiePreset";

// ---------------------------------------------------------------------------
// Organisme
// ---------------------------------------------------------------------------
export const SECRETARIAT_ORG: OrganismeInfo = {
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
  domainesFormation: "Secrétariat, assistanat administratif, bureautique, communication écrite, accueil, organisation, archivage",
  typesActions: ["actions-formation"],
  certifications: "Qualiopi",
  outilsUtilises: "Word, Excel, Outlook, Teams, OneDrive, Yousign, Zeendoc (démo), plateforme e-learning",
  version: "1",
  dateMaj: new Date().toISOString().slice(0, 10),
};

// ---------------------------------------------------------------------------
// Formation (70 h — non certifiante)
// ---------------------------------------------------------------------------
export const FORMATION_SECRETARIAT: FormationInfo = {
  intitule: "Secrétariat — Formation opérationnelle (70 h)",
  objectifs:
    "Acquérir toutes les compétences opérationnelles pour tenir un poste de secrétaire / assistant(e) administratif(ve) en TPE, PME ou grande structure.\nÀ l'issue de la formation, le/la stagiaire sera capable de :\n- Adopter la posture professionnelle attendue (discrétion, fiabilité, anticipation).\n- Rédiger sans faute courriers, emails, notes et comptes rendus.\n- Maîtriser Word, Excel, Outlook et Teams au niveau attendu d'un(e) assistant(e).\n- Assurer un accueil physique et téléphonique de qualité, y compris en anglais.\n- Gérer un plan de classement, une GED et respecter le RGPD documentaire.\n- Préparer efficacement une recherche d'emploi et un entretien d'embauche.",
  prerequis:
    "Bonne maîtrise du français écrit. Aucun prérequis bureautique avancé. Motivation pour un métier de service et de rigueur.",
  duree: "70 heures (sur 3 semaines, alternance présentiel + distanciel)",
  modalites: "présentiel",
  tarif: "1 950 € TTC (éligible CPF, paiement en 3 fois possible)",
  programme:
    "Module 1 (14 h) — Métier, posture et environnement du secrétariat : rôle, missions, éthique, confidentialité, RGPD.\nModule 2 (14 h) — Communication écrite professionnelle : courriers, emails, notes, comptes rendus.\nModule 3 (14 h) — Bureautique et outils modernes : Word, Excel, Outlook, Teams, OneDrive, signature électronique.\nModule 4 (14 h) — Accueil physique, téléphonique et gestion des relations (avec bases d'anglais professionnel).\nModule 5 (14 h) — Organisation, classement, archivage, RGPD documentaire et préparation à l'emploi.",
  methodesEvaluation:
    "Test de positionnement à l'entrée (QCM 10 questions), 1 exercice pratique par module + 5 QCM par module, cas pratique intermédiaire (traitement d'un dossier client complet), test de positionnement final (QCM 10 questions), évaluation finale sur 5 exercices pratiques (courrier client, note de service, compte rendu, tableau Excel de suivi, mise en situation d'accueil), attestation de fin de formation, questionnaire de satisfaction à chaud et à froid.",
  moyensPedagogiques:
    "Postes individuels équipés Microsoft 365 (Word, Excel, Outlook, Teams), casques audio pour mises en situation téléphoniques, supports de cours numériques 40 pages, fiches mémo (formules Excel, formules de politesse, méthode ERIC), cas pratiques réels anonymisés, plateforme e-learning avec QCM d'entraînement, salle IZIBUSINESS 75017 Paris.",
  publicVise:
    "Personnes en reconversion vers les métiers du tertiaire administratif, secrétaires souhaitant actualiser leurs compétences, assistant(e)s administratif(ve)s en poste, demandeurs d'emploi ciblant les métiers de l'accueil et de l'assistanat.",
  delaiAcces: "14 jours minimum entre la validation de l'inscription et le démarrage",
  dateDebut: "2026-04-13",
  dateFin: "2026-05-01",
  lieu: "IZIBUSINESS — 6 rue d'Armaillé, 75017 PARIS (présentiel) + classe virtuelle Google Meet",
  nombreParticipants: "6",
  formateur: "NADINE DENDANI",
};

// ---------------------------------------------------------------------------
// Stagiaires (6 profils cohérents avec le secrétariat)
// ---------------------------------------------------------------------------
export const STAGIAIRES_SECRETARIAT: StagiaireInfo[] = [
  { civilite: "Mme", nom: "MOREAU", prenom: "Élodie", email: "elodie.moreau.pro@gmail.com", telephone: "06 74 12 33 88", entreprise: "", poste: "Employée polyvalente en reconversion", dateNaissance: "1989-05-14", adresse: "22 rue de la République", codePostal: "94200", commune: "IVRY-SUR-SEINE", dateDebutFormation: "2026-04-13", dateFinFormation: "2026-05-01", tarifFormation: "1950" },
  { civilite: "Mme", nom: "DIALLO", prenom: "Aïssatou", email: "a.diallo.assistant@outlook.fr", telephone: "07 82 44 61 09", entreprise: "Cabinet dentaire Dr Blanchard (5 salariés)", poste: "Assistante dentaire – souhaite évoluer sur l'accueil et l'administratif", dateNaissance: "1993-11-02", adresse: "8 rue des Lilas", codePostal: "93100", commune: "MONTREUIL", dateDebutFormation: "2026-04-13", dateFinFormation: "2026-05-01", tarifFormation: "1950" },
  { civilite: "M.", nom: "GARCIA", prenom: "Julien", email: "julien.garcia75@gmail.com", telephone: "06 55 21 78 44", entreprise: "", poste: "Ex-vendeur boutique, reconversion vers l'assistanat administratif", dateNaissance: "1986-03-27", adresse: "15 boulevard Voltaire", codePostal: "75011", commune: "PARIS", dateDebutFormation: "2026-04-13", dateFinFormation: "2026-05-01", tarifFormation: "1950" },
  { civilite: "Mme", nom: "CHEN", prenom: "Linh", email: "linh.chen.assist@gmail.com", telephone: "07 61 08 22 55", entreprise: "TPE web GreenPixel (7 salariés)", poste: "Office manager junior – prise de poste récente", dateNaissance: "1995-08-19", adresse: "3 rue de Belleville", codePostal: "75020", commune: "PARIS", dateDebutFormation: "2026-04-13", dateFinFormation: "2026-05-01", tarifFormation: "1950" },
  { civilite: "Mme", nom: "LEBLANC", prenom: "Sophie", email: "sophie.leblanc.rh@outlook.fr", telephone: "06 88 47 15 32", entreprise: "", poste: "Demandeur d'emploi – projet assistant(e) de direction", dateNaissance: "1984-01-08", adresse: "17 avenue du Général-Leclerc", codePostal: "92100", commune: "BOULOGNE-BILLANCOURT", dateDebutFormation: "2026-04-13", dateFinFormation: "2026-05-01", tarifFormation: "1950" },
  { civilite: "Mme", nom: "NKONGO", prenom: "Grâce", email: "grace.nkongo.pro@gmail.com", telephone: "07 71 33 90 21", entreprise: "Association ADEPS Solidarité (11 salariés)", poste: "Secrétaire associative – actualisation des compétences bureautiques et RGPD", dateNaissance: "1991-07-24", adresse: "6 rue Émile Zola", codePostal: "93300", commune: "AUBERVILLIERS", dateDebutFormation: "2026-04-13", dateFinFormation: "2026-05-01", tarifFormation: "1950" },
];

// ---------------------------------------------------------------------------
// Content pack
// ---------------------------------------------------------------------------
const SECRETARIAT_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: [
      "Honnêtement mon objectif c'est de reprendre confiance en moi côté pro, ça fait 6 ans que je suis maman à la maison et je veux retrouver un poste de secrétaire mais je sais que le métier a évolué.",
      "Ce qu'il me manque vraiment c'est la maîtrise d'Excel, je sais faire un tableau mais dès qu'on me parle de tableau croisé dynamique je suis perdue.",
      "Je voudrais gagner en aisance à l'oral au téléphone, surtout avec les clients qui râlent, parce que là je bloque et je passe l'appel à ma collègue.",
      "Franchement mon problème c'est l'orthographe, j'ai peur d'envoyer un email avec une faute au directeur, du coup je relis 10 fois et je perds un temps fou.",
      "Ce que j'attends c'est concret : apprendre à faire un vrai compte rendu de réunion propre, parce que là je note tout et personne comprend rien à mes CR.",
      "Mon objectif c'est de décrocher un poste d'office manager dans une startup, il paraît qu'il y a beaucoup d'offres mais faut savoir jongler entre RH, admin et accueil.",
      "Je veux comprendre le RGPD parce qu'on me demande de faire attention aux données mais personne m'a jamais expliqué concrètement ce que je peux faire ou pas.",
      "Mon vrai besoin c'est Outlook, on m'a mis en délégation de l'agenda de la directrice et je gère mal, du coup y a des conflits de RDV et c'est la cata.",
      "Je voudrais me perfectionner sur les courriers officiels, savoir écrire une lettre de rappel de facture ou une note de service, parce que là je copie-colle d'anciens courriers et c'est jamais adapté.",
      "Ce qui m'intéresse vraiment c'est la partie accueil physique, je bosse dans un cabinet dentaire et je veux vraiment que les patients se sentent bien accueillis dès l'entrée.",
    ],
    syntheseHtml:
      "6 stagiaires sur 6 sont en reconversion, prise de poste récente ou évolution vers un poste d'assistant(e) / secrétaire / office manager.<br>4 sur 6 travaillent déjà dans une TPE/PME/association et cherchent à professionnaliser leurs pratiques bureautiques.<br>5 sur 6 citent Excel comme point faible majeur (« dès qu'on me parle de TCD je suis perdue »).<br>4 sur 6 identifient la communication écrite (orthographe, courriers, CR) comme un frein direct à leur productivité et leur confiance.<br>3 sur 6 mentionnent la gestion des appels difficiles et le filtrage comme un axe prioritaire.<br>6 sur 6 attendent du concret, du terrain, des cas pratiques, pas de la théorie.<br>Tous soulignent l'importance de la posture pro (discrétion, RGPD, fiabilité) qu'on ne leur a jamais formalisée jusqu'ici.",
    adaptationsHtml:
      "• Alternance 70 % pratique / 30 % théorie sur cas réels anonymisés (mails clients, CR de réunion, tableaux de suivi).<br>• Chaque module Excel commence par un besoin métier avant d'ouvrir le tableur (pas d'exercice hors contexte).<br>• Module Communication écrite en atelier progressif (correction collective, mode révision Word) avec grille d'auto-évaluation orthographe.<br>• Fiche mémo « 1 page » par thème (formules Excel courantes, formules de politesse, méthode ERIC, durées d'archivage).<br>• Session dédiée aux mises en situation d'accueil physique/téléphonique en binôme avec enregistrement et débriefing.<br>• Corrigés systématiquement remis, y compris pour les exercices non traités en séance, pour permettre la révision autonome.<br>• Simulation d'entretien d'embauche filmée en Module 5 avec restitution individuelle par le formateur.",
  },
  chapters: [], // Servi par getSecretariatChapters (courseContent.ts).
  exercises: [
    { titre: "Rédiger un email de relance de facture impayée", consigne: "Rédigez un email professionnel de relance pour la facture n° 2026-0142 de 1 850 € HT échue depuis 21 jours, adressée à M. Dubois, DAF de la société CLIENT SA. Ton ferme mais courtois, engagement de suite à donner.", reponseAttendue: "Objet : Relance facture n° 2026-0142 – 1 850 € HT échue depuis 21 jours\n\nMonsieur Dubois,\n\nSauf erreur de notre part, la facture n° 2026-0142 d'un montant de 1 850 € HT, émise le 15 février 2026 et échue le 17 mars 2026, ne nous est pas parvenue à ce jour.\n\nJe vous serais reconnaissante de bien vouloir procéder à son règlement dans les meilleurs délais, ou de me signaler tout élément justifiant ce retard.\n\nUn duplicata est joint à ce message pour faciliter le traitement.\n\nJe reste à votre disposition pour tout complément d'information et vous prie d'agréer, Monsieur Dubois, l'expression de mes salutations distinguées.\n\n[Signature normalisée]", points: 4 },
    { titre: "Compte rendu de réunion synthétique", consigne: "Rédigez le CR synthétique de la réunion du 15 mars 2026 (10h-11h30) : présents (5 personnes nommées librement), objet (validation du budget marketing Q2), 3 décisions prises et 3 actions attribuées avec échéance.", reponseAttendue: "COMPTE RENDU DE RÉUNION — Validation budget marketing Q2\nDate : 15 mars 2026, 10h-11h30 | Rédacteur : [Prénom NOM]\nPrésents : M. Martin (DG), Mme Dupont (DAF), M. Laurent (Dir. Marketing), Mme Chen (Chef de projet), Mme Karim (Community Manager)\nExcusés : —\n\nOrdre du jour\n1. Revue Q1\n2. Budget Q2\n3. Priorités campagnes\n\nDécisions\n• Budget Q2 validé à 45 000 € HT (+8 % vs Q1).\n• Campagne LinkedIn Ads maintenue jusqu'à fin juin.\n• Nouveau prestataire vidéo retenu : agence PIXEL PROD (devis signé sous 15 j).\n\nActions\n| Qui  | Quoi                                             | Quand      |\n| M. Laurent | Envoyer le brief à PIXEL PROD              | 22/03/2026 |\n| Mme Karim  | Planifier les publications LinkedIn Avril  | 25/03/2026 |\n| Mme Dupont | Ouvrir le bon de commande à 45 000 €       | 18/03/2026 |\n\nProchaine réunion : 12 avril 2026 à 10h — Salle Alfred.", points: 5 },
    { titre: "Tableau Excel de suivi des notes de frais", consigne: "Décrivez la structure d'un tableau Excel de suivi des notes de frais mensuelles pour 8 collaborateurs, incluant colonnes, formules, mises en forme conditionnelles et TCD synthétique.", reponseAttendue: "Colonnes : Date | Collaborateur | Motif | Montant HT | TVA (auto = HT × 20 %) | TTC (auto = HT + TVA) | Justificatif OK (O/N) | Validé par | Date remboursement.\nFormule TVA : =B2*20% | Formule TTC : =B2+C2 | Contrôle : =SI(ET(F2>500;G2=\"N\");\"⚠ À justifier\";\"OK\").\nMise en forme conditionnelle : ligne en rouge si Justificatif=N ET Montant>500 €, en orange si Date remboursement vide et Date > 30 jours.\nTCD en bas : lignes = Collaborateur, valeurs = Somme de TTC ; filtre = mois. Feuille protégée par mot de passe sauf colonnes de saisie.", points: 5 },
    { titre: "Mise en situation d'accueil téléphonique difficile", consigne: "Un client mécontent appelle car sa commande, promise pour aujourd'hui, n'est pas livrée. Appliquez la méthode ERIC (Écouter, Reformuler, Informer, Conclure) et détaillez chaque étape avec les phrases exactes.", reponseAttendue: "1. É — Décrocher avant la 3e sonnerie : « [Entreprise], [Prénom] à votre écoute, bonjour. » Laisser le client s'exprimer sans interrompre, prendre notes précises.\n2. R — Reformuler pour valider la compréhension : « Si je comprends bien, votre commande n° 4587 devait vous être livrée ce matin et vous ne l'avez toujours pas reçue, ce qui vous bloque pour votre présentation de 14h — c'est bien cela ? »\n3. I — Informer avec un engagement réaliste : « Je vais immédiatement contacter notre service logistique pour vérifier où en est votre livraison. Je vous rappelle sous une heure maximum avec une réponse précise. »\n4. C — Conclure et remercier : « Je note votre numéro pour vous rappeler au [numéro], et vous remercie de votre patience. À très vite, Monsieur X. »\nActions post-appel : transmettre le dossier en interne avec l'heure de l'engagement, rappeler avant l'échéance annoncée même si l'info n'est pas encore complète.", points: 4 },
    { titre: "Note de service — mise en place du télétravail", consigne: "Rédigez une note de service annonçant la mise en place du télétravail à raison de 2 jours par semaine à partir du 1er mai 2026, précisant les modalités et le cadre de validation.", reponseAttendue: "NOTE DE SERVICE N° 2026-05 — TÉLÉTRAVAIL\nÉmetteur : Direction des Ressources Humaines\nDestinataires : L'ensemble des collaborateurs\nDate : 15 avril 2026\nObjet : Mise en place du télétravail à raison de 2 jours par semaine à compter du 1er mai 2026.\n\nAprès consultation du CSE et signature de la charte télétravail (jointe), la Direction met en place le télétravail à raison de 2 jours par semaine pour l'ensemble des collaborateurs éligibles.\n\nModalités :\n• Éligibilité : contrat en cours depuis plus de 6 mois, poste compatible.\n• Choix des jours : accord bilatéral collaborateur / manager, en veillant à conserver 50 % minimum de l'équipe sur site chaque jour.\n• Équipement : ordinateur portable fourni ; indemnité forfaitaire télétravail de 25 € / mois.\n• Retour au présentiel exceptionnel : possible sur demande managériale, avec préavis de 48 h.\n\nApplication : 1er mai 2026.\n\nSignature : Nadine DENDANI, Directrice des Ressources Humaines.", points: 4 },
    { titre: "Plan de classement électronique d'un service RH", consigne: "Proposez un plan de classement électronique complet pour la GED d'un service RH de PME (35 salariés), en incluant les durées de conservation légales et un principe de nommage des fichiers.", reponseAttendue: "Racine : /RH\n  /01_Contrats_de_travail (5 ans après départ)\n    /2024 /2025 /2026\n  /02_Bulletins_de_paie (5 ans, 50 ans conseillé)\n    /Par_annee /Par_salarie\n  /03_Formations (5 ans)\n    /Plan_de_developpement /Conventions /Attestations\n  /04_Absences_Conges (5 ans)\n  /05_Instances_representatives (durée mandat + 5 ans)\n    /CSE /Elections /PV\n  /06_Recrutement (2 ans candidatures non retenues, sauf accord)\n  /07_Confidentiels_RGPD (accès restreint DRH)\n    /Sanctions /Ruptures /Contentieux\n  /08_Archives (au-delà des durées de conservation actives)\nNommage : AAAA-MM-JJ_TYPE_NOMDOSSIER_vX.ext (ex : 2026-03-15_Contrat_MartinP_v2.pdf).\nAccès : lecture seule pour l'équipe RH, écriture DRH + secrétariat, dossier 07 restreint DRH uniquement.", points: 4 },
  ],
  ressources: {
    supportsHtml:
      `<p>• Support de cours PDF 40 pages : métier, communication écrite, bureautique, accueil, organisation.<br>• Fiches mémo 1 page par thème (formules Excel courantes, formules de politesse, méthode ERIC, matrice d'Eisenhower, durées légales d'archivage).<br>• Modèles Word : courrier administratif, note de service, compte rendu, convocation, attestation.<br>• Modèles Excel : suivi notes de frais, planning multi-collaborateurs, tableau de bord d'accueil, budget de service.<br>• Trames d'emails professionnels (relance client, réponse insatisfaction, invitation réunion, réponse candidat).<br>• QCM d'entraînement Bureautique et Rédaction professionnelle — 60 questions.</p>`,
    outilsHtml:
      `<p>• Postes individuels équipés Microsoft 365 (Word, Excel, Outlook, Teams, OneDrive).<br>• Casques audio et téléphones pour mises en situation.<br>• Vidéoprojecteur et paperboard pour les démonstrations en direct.<br>• Accès plateforme e-learning avec QCM auto-corrigés et vidéos courtes (3-5 min) par notion.<br>• Accès démo Yousign (signature électronique) et Zeendoc (GED).<br>• Simulateur Projet Voltaire pour l'entraînement orthographique individualisé.</p>`,
    
    ressourcesComplHtml:
      `<p>• <strong>Site officiel :</strong> <a href="https://www.francetravail.fr/candidat/decouvrir-le-marche-du-travail.html" style="color:hsl(220,60%,50%)">France Travail — fiche ROME M1607</a> — le métier de secrétaire.<br>• <strong>Site officiel :</strong> <a href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees" style="color:hsl(220,60%,50%)">CNIL — RGPD</a> — pratiques applicables au secrétariat.<br>• <strong>Site officiel :</strong> <a href="https://www.service-public.fr/professionnels-entreprises/vosdroits/F31221" style="color:hsl(220,60%,50%)">service-public.fr — Durées de conservation des documents</a>.<br>• <strong>Site officiel :</strong> <a href="https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006177833/" style="color:hsl(220,60%,50%)">Legifrance — Code du travail (loyauté, confidentialité)</a>.<br>• <strong>Outil :</strong> <a href="https://www.projet-voltaire.fr/" style="color:hsl(220,60%,50%)">Projet Voltaire</a> — entraînement orthographique de référence.<br>• <strong>Livre :</strong> « Le guide du secrétariat moderne » (Éditions Vuibert 2025).<br>• <strong>Livre :</strong> « L'assistant(e) de direction efficace » (Éditions Eyrolles).<br>• <strong>Livre :</strong> « Getting Things Done » de David Allen (méthode GTD).<br>• Glossaire : GED, RGPD, CC/CCI, TCD, publipostage, signature électronique, méthode ERIC, matrice Eisenhower.</p>`,
    videos: [
      { title: "Formation complète Word pour débutants — Toutes les bases", description: "Toutes les bases de Microsoft Word en une vidéo complète : styles, table des matières, publipostage.", url: "https://www.youtube.com/results?search_query=formation+word+d%C3%A9butant+secr%C3%A9tariat" },
      { title: "Excel — Les 10 formules incontournables pour un(e) assistant(e)", description: "SOMME, SI, RECHERCHEV, NB.SI, SOMME.SI, DATE, GAUCHE, DROITE, CONCAT, TCD.", url: "https://www.youtube.com/results?search_query=excel+formules+assistant+secr%C3%A9taire" },
      { title: "Outlook — Maîtriser sa boîte mail et sa délégation d'agenda", description: "Règles automatiques, catégories, délégation, réponse automatique, recherche avancée.", url: "https://www.youtube.com/results?search_query=outlook+d%C3%A9l%C3%A9gation+agenda+secr%C3%A9taire" },
      { title: "Accueil téléphonique — Les 4 règles d'or et la méthode ERIC", description: "Décrocher, phrase d'accueil, écoute active, prise de message, gestion d'un appel difficile.", url: "https://www.youtube.com/results?search_query=accueil+t%C3%A9l%C3%A9phonique+professionnel+ERIC" },
      { title: "Rédiger un email professionnel sans faute — 10 règles", description: "Objet, structure, formules d'appel/politesse, CC/CCI, signature, relecture.", url: "https://www.youtube.com/results?search_query=email+professionnel+sans+faute" },
      { title: "Compte rendu de réunion — La méthode pour ne rien oublier", description: "Prise de notes, structure décision/action/échéance, format synthétique.", url: "https://www.youtube.com/results?search_query=compte+rendu+r%C3%A9union+m%C3%A9thode" },
      { title: "RGPD au bureau — Ce qu'un(e) secrétaire doit absolument savoir", description: "Traitement des données, envois sécurisés, durées de conservation, sanctions CNIL.", url: "https://www.youtube.com/results?search_query=RGPD+secr%C3%A9taire+bureau" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Eval pack (QCM positionnement + exercice intermédiaire + évaluation finale)
// ---------------------------------------------------------------------------
const q = (question: string, options: string[], correctIndex: number) => ({ question, options, correctIndex });

const SECRETARIAT_EVAL_PACK: AIEvalPack = {
  qcmDebut: [
    q("La formule de politesse la plus adaptée à un courrier professionnel adressé à un client est :", ["Cordialement", "Amicalement", "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.", "Bien à vous"], 2),
    q("Dans un email professionnel, la mention CCI signifie :", ["Copie Confidentielle Immédiate", "Copie Carbone Invisible", "Courrier Confidentiel Interne", "Certification Correspondance Interne"], 1),
    q("Le raccourci clavier Ctrl+S sert à :", ["Imprimer", "Sélectionner tout", "Enregistrer", "Supprimer"], 2),
    q("Un tableau croisé dynamique (TCD) permet de :", ["Créer un graphique 3D", "Résumer et analyser rapidement de grandes quantités de données", "Envoyer un email de masse", "Verrouiller une feuille de calcul"], 1),
    q("Sur Outlook, une « délégation d'agenda » permet de :", ["Partager son mot de passe", "Donner à un collègue le droit de gérer votre agenda depuis son propre Outlook", "Supprimer l'agenda d'un collègue", "Bloquer un rendez-vous"], 1),
    q("Le RGPD concerne :", ["Uniquement les grandes entreprises", "La protection des données personnelles de toute personne physique dans l'UE", "Les factures fournisseurs", "Les contrats commerciaux uniquement"], 1),
    q("La durée légale minimale de conservation des contrats de travail après le départ du salarié est de :", ["1 an", "3 ans", "5 ans", "10 ans"], 2),
    q("La méthode ERIC pour l'accueil téléphonique signifie :", ["Écouter, Répondre, Interroger, Conclure", "Écouter, Reformuler, Informer, Conclure", "Enregistrer, Rappeler, Insister, Contrôler", "Écrire, Recevoir, Informer, Classer"], 1),
    q("Un compte rendu synthétique de réunion doit toujours inclure :", ["Le verbatim de tous les échanges", "Les décisions, les actions attribuées et les échéances", "Uniquement la liste des présents", "Uniquement le prochain rendez-vous"], 1),
    q("Le mode « révision » dans Word sert à :", ["Verrouiller le document", "Suivre les modifications et commentaires apportés au document", "Compter les mots", "Créer un sommaire"], 1),
  ],
  qcmFin: [
    q("La formule Excel =RECHERCHEV(\"Dupont\";A2:C100;3;FAUX) renvoie :", ["La 3e cellule contenant Dupont", "La valeur de la 3e colonne de la ligne où « Dupont » apparaît dans la 1re colonne", "La 3e feuille du classeur", "Le nombre d'occurrences de Dupont"], 1),
    q("Sur Outlook, si votre manager veut que vous répondiez à ses emails à sa place, la pratique conforme est :", ["Qu'il/elle vous donne son mot de passe", "De configurer une délégation officielle Outlook avec droits « Envoyer au nom de »", "De transférer manuellement chaque email", "D'installer Outlook sur son poste personnel"], 1),
    q("Une signature électronique simple (Yousign, DocuSign) a une valeur légale :", ["Aucune", "Équivalente à la signature manuscrite (art. 1367 Code civil)", "Uniquement pour les factures", "Uniquement en interne à l'entreprise"], 1),
    q("La durée légale de conservation des factures est de :", ["3 ans", "5 ans", "6 ans", "10 ans"], 3),
    q("Un(e) secrétaire à qui un tiers demande le salaire d'un collègue doit :", ["Le communiquer par courtoisie", "Refuser poliment et rediriger vers les RH", "Demander l'accord du collègue", "Consulter le manager"], 1),
    q("Face à un client mécontent au téléphone, la 1re chose à faire est :", ["Se justifier", "Écouter jusqu'au bout sans interrompre, puis reformuler", "Passer l'appel au manager", "Raccrocher poliment"], 1),
    q("La règle recommandée pour la longueur d'une phrase à l'écrit professionnel est :", ["Pas plus de 5 mots", "Autour de 15 à 20 mots maximum", "Pas plus de 40 mots", "Aucune règle"], 1),
    q("Dans un plan de classement électronique, la meilleure pratique de nommage de fichier est :", ["Un nom court en majuscules", "AAAA-MM-JJ_TYPE_NOMDOSSIER_vX.ext", "Le prénom du créateur", "Le numéro de facture uniquement"], 1),
    q("La règle des 2 minutes (méthode GTD) consiste à :", ["Ne travailler que 2 minutes sur une tâche", "Faire immédiatement toute tâche qui prend moins de 2 minutes", "Attendre 2 minutes avant de répondre à un email", "Faire une pause toutes les 2 minutes"], 1),
    q("La CNIL peut sanctionner un manquement RGPD grave jusqu'à :", ["10 000 €", "150 000 €", "4 % du chiffre d'affaires annuel mondial", "1 % du chiffre d'affaires France"], 2),
  ],
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire — Traitement d'un dossier client complet",
    contexte:
      "Vous êtes l'assistant(e) administratif(ve) d'un cabinet d'expertise comptable. Le 14 mars 2026, un nouveau client (M. Bernard LEGRAND, gérant de la SARL PROPREVERT, 12 salariés, secteur nettoyage) souhaite être pris en charge. Il vous appelle à 10h30 pour prendre rendez-vous avec l'expert-comptable, vous demande de préparer un dossier d'ouverture et vous transmet ses éléments par email dans la journée. Vous devez tout coordonner d'ici vendredi 20 mars.",
    questions: [
      { question: "Rédigez la trace écrite de l'appel téléphonique reçu (fiche de prise de message).", reponseAttendue: "FICHE DE PRISE DE MESSAGE — 14/03/2026 10h32\nAppelant : M. Bernard LEGRAND, gérant SARL PROPREVERT\nCoordonnées : 06 XX XX XX XX / b.legrand@proprevert.fr\nObjet : Prise en charge par le cabinet — RDV souhaité avec l'expert-comptable (M. Durand) avant fin mars.\nURGENT : Non, mais souhait de finalisation avant l'arrêté trimestriel.\nActions à faire : (1) proposer 3 créneaux à M. LEGRAND par email d'ici demain 12h, (2) préparer le dossier d'ouverture client, (3) inscrire dans Outlook après validation. Rappel programmé : 14/03 à 15h par email si pas de retour.", points: 4 },
      { question: "Rédigez l'email de proposition de créneaux et de demande de pièces (courrier professionnel).", reponseAttendue: "Objet : Prise en charge PROPREVERT — proposition de rendez-vous et pièces à préparer\n\nMonsieur LEGRAND,\n\nSuite à notre échange téléphonique de ce matin, je vous confirme la bonne prise en compte de votre demande de prise en charge par notre cabinet.\n\nM. Durand, expert-comptable, vous propose l'un des trois créneaux suivants pour un premier rendez-vous :\n• jeudi 19 mars 2026, 14h30\n• vendredi 20 mars 2026, 10h00\n• lundi 23 mars 2026, 9h30\n\nMerci de bien vouloir m'indiquer votre préférence par retour d'email d'ici demain midi.\n\nAfin de préparer au mieux cet entretien, je vous saurais gré de nous transmettre :\n• Extrait Kbis de moins de 3 mois,\n• Statuts à jour de la SARL,\n• Derniers bilans (3 exercices),\n• Situation de trésorerie récente,\n• Convention collective applicable,\n• Registre du personnel.\n\nCes documents peuvent être transmis via notre espace client sécurisé (lien joint) ou par courrier signé.\n\nJe reste à votre disposition et vous prie d'agréer, Monsieur LEGRAND, l'expression de mes salutations distinguées.\n\n[Signature]", points: 4 },
      { question: "Décrivez le classement du dossier dans la GED du cabinet.", reponseAttendue: "Création dossier /Clients/2026/PROPREVERT_SARL_2026-03/ contenant sous-dossiers : /01_Kbis_Statuts, /02_Bilans, /03_Convention_collective, /04_Registre_personnel, /05_Correspondance, /06_RGPD_Consentements. Chaque fichier nommé selon AAAA-MM-JJ_TYPE_NOMCLIENT_vX.ext (ex : 2026-03-14_Kbis_PROPREVERT_v1.pdf). Droits d'accès : lecture pour l'équipe cabinet, écriture assistant(e) + expert-comptable, dossier 06 accessible uniquement à l'expert-comptable et au correspondant RGPD. Journalisation activée.", points: 4 },
      { question: "Détaillez la préparation logistique du RDV et le suivi post-RDV.", reponseAttendue: "Préparation : (1) inscrire le RDV dans Outlook avec délégation acceptée par l'expert-comptable, ajouter M. LEGRAND en participant, joindre l'ODJ et la liste des pièces attendues ; (2) réserver la salle de réunion « Alfred » avec vidéoprojecteur ; (3) préparer un dossier physique de courtoisie (plaquette cabinet + tasse + eau) ; (4) imprimer la fiche client vierge à compléter durant le RDV ; (5) envoyer un rappel à J-2 par email. Post-RDV : (1) rédiger le compte rendu synthétique dans les 24 h ; (2) créer les tâches Outlook des actions décidées ; (3) planifier les relances de pièces manquantes ; (4) archiver le CR dans /05_Correspondance ; (5) demander au client la signature électronique de la lettre de mission via Yousign.", points: 4 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale — 5 cas pratiques (IND 11)",
    exercices: [
      { titre: "Courrier client — refus courtois d'une remise commerciale", consigne: "Rédigez un courrier professionnel à Mme Vasseur, dirigeante d'une PME cliente, qui demande une remise exceptionnelle de 20 %. Refus argumenté mais préservation de la relation.", reponseAttendue: "En-tête + Objet : Votre demande de remise exceptionnelle — Réponse du [date]. Madame Vasseur, Nous avons bien reçu votre demande de remise exceptionnelle de 20 % sur votre prestation en cours. Nous vous en remercions et comprenons parfaitement l'attention portée à la maîtrise de vos coûts. Après étude, nous ne sommes pas en mesure de vous accorder une remise de cette ampleur, dans la mesure où nos tarifs intègrent déjà des conditions préférentielles liées à notre partenariat de longue date. Toutefois, soucieux de préserver la qualité de notre relation, nous vous proposons : • un paiement en 3 fois sans frais du solde de la prestation, • un report de facturation à 60 jours, • un audit gratuit de vos processus internes (valeur 1 200 € HT). Nous restons à votre disposition pour en discuter au téléphone si vous le souhaitez. Je vous prie d'agréer, Madame Vasseur, l'expression de mes salutations distinguées. [Signature]", points: 4 },
      { titre: "Note de service — nouvelle politique de télétravail", consigne: "Rédigez une note de service annonçant la mise en place de 2 jours de télétravail hebdomadaires à partir du 1er juin 2026.", reponseAttendue: "NOTE DE SERVICE N° 2026-05 — TÉLÉTRAVAIL. Émetteur : DRH. Destinataires : ensemble du personnel. Date : 15 mai 2026. Objet : Mise en place du télétravail à raison de 2 jours par semaine à compter du 1er juin 2026. Après consultation du CSE et signature d'une charte télétravail (jointe), la Direction met en place le télétravail à raison de 2 jours hebdomadaires. Éligibilité : contrat en cours depuis 6 mois minimum, poste compatible. Choix des jours : bilatéral avec le manager, présence minimale de 50 % de l'équipe sur site chaque jour. Équipement : ordinateur portable fourni, indemnité forfaitaire de 25 €/mois. Application : 1er juin 2026. Signature : Nadine DENDANI, DRH.", points: 4 },
      { titre: "Compte rendu de réunion synthétique", consigne: "Rédigez le CR de la réunion du 20 mai 2026 (14h-15h30) : validation d'un nouveau prestataire de nettoyage. 5 participants, 3 décisions, 3 actions attribuées avec échéances.", reponseAttendue: "COMPTE RENDU DE RÉUNION — Nouveau prestataire nettoyage. Date : 20/05/2026 14h-15h30 | Rédacteur : [Prénom NOM]. Présents : M. Martin (DG), Mme Dupont (DAF), M. Laurent (Services généraux), Mme Chen (RH), Mme Karim (Assistante). Excusés : —. Ordre du jour : 1) Revue des 3 offres, 2) Choix du prestataire, 3) Modalités de bascule. Décisions : • Prestataire retenu : PROPREVERT SARL (offre 18 240 € HT/an). • Contrat signé pour 2 ans reconductible. • Bascule effective au 1er juillet 2026. Actions : | Qui | Quoi | Quand | | M. Laurent | Envoyer le contrat à PROPREVERT pour signature | 25/05/2026 | | Mme Karim | Prévenir l'ancien prestataire par courrier recommandé | 27/05/2026 | | Mme Chen | Communiquer au personnel via note de service | 15/06/2026 |. Prochaine réunion : 15 juin 2026 à 14h — Salle Alfred.", points: 5 },
      { titre: "Tableau Excel — suivi des demandes de RDV clients", consigne: "Décrivez un tableau Excel de suivi de 40 demandes de RDV clients mensuelles : colonnes, formules, mises en forme conditionnelles et TCD.", reponseAttendue: "Colonnes : Date demande | Client | Contact | Motif | Créneau proposé | Statut (En attente / Confirmé / Refusé) | Date RDV | Consultant | Compte rendu envoyé (O/N). Formule statut : =SI(F2=\"Confirmé\";\"✓\";SI(F2=\"Refusé\";\"✗\";\"⏳\")). Mise en forme conditionnelle : ligne en jaune si Statut=En attente et Date demande > 5 jours ; en vert si Confirmé ; en rouge si Refusé. TCD en bas : lignes = Consultant, valeurs = NB de RDV Confirmés ; filtre = mois. Feuille protégée sauf colonnes de saisie. Sauvegarde OneDrive automatique.", points: 5 },
      { titre: "Mise en situation d'accueil — client mécontent + relance interne", consigne: "Un client vous appelle à 10h, mécontent qu'aucune réponse n'ait été apportée à son email envoyé la semaine dernière. Il menace de partir à la concurrence. Détaillez votre traitement de l'appel (méthode ERIC) puis les actions internes qui suivent.", reponseAttendue: "1. É — « [Entreprise], [Prénom] à votre écoute, bonjour. » Écouter jusqu'au bout sans interrompre. 2. R — « Si je comprends bien, vous nous avez adressé un email le 12 mai concernant [objet], vous n'avez pas eu de retour et vous êtes en difficulté pour [conséquence] — c'est bien cela ? » 3. I — « Je vous prie d'excuser ce délai qui n'est pas conforme à nos engagements. Je vais immédiatement identifier ce qui a bloqué et vous rappelle avant 14h aujourd'hui avec une réponse précise. » 4. C — « Puis-je vous rappeler au [numéro] à 14h ? Je vous remercie de votre patience, à tout à l'heure. » Actions internes : (i) vérifier immédiatement dans Outlook si l'email a bien été reçu ; (ii) le retrouver et identifier le destinataire initial ; (iii) contacter le collaborateur en interne pour comprendre le blocage ; (iv) proposer une action corrective (réponse rapide, geste commercial) ; (v) rappeler le client avant 14h même sans réponse complète, en donnant un nouveau délai réaliste ; (vi) tracer l'incident dans le tableau de suivi qualité ; (vii) rédiger un email de synthèse au manager pour transparence.", points: 5 },
    ],
  },
};

// ---------------------------------------------------------------------------
// Veille pack (réglementaire + métier + technologique)
// ---------------------------------------------------------------------------
const SECRETARIAT_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    { lien: "https://www.cnil.fr/fr/reglement-europeen-protection-donnees", titreLien: "CNIL — RGPD", titre: "Renforcement des sanctions CNIL pour manquement RGPD (2025-2026)", date: "Janvier 2026", commentaire: "La CNIL a prononcé 42 sanctions en 2025 pour un montant total record de 87 M€, avec un focus particulier sur la mauvaise gestion des données RH et bureautique (envois emails en clair, absence de purge).", exploitation: "Preuve : synthèse CNIL téléchargée. Action : intégré au Module 1 (RGPD) et Module 5 (archivage), fiche mémo remise aux stagiaires." },
    { lien: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006177833/", titreLien: "Legifrance — obligation de loyauté", titre: "Jurisprudence confirmée sur la confidentialité du/de la secrétaire (Cass. soc. 2024)", date: "Novembre 2024", commentaire: "La Cour de cassation confirme qu'une secrétaire ayant transmis à un tiers des informations confidentielles à son employeur commet une faute grave justifiant un licenciement immédiat sans indemnité.", exploitation: "Preuve : arrêt de la Cour de cassation. Action : cas pratique éthique en Module 1." },
    { lien: "https://www.service-public.fr/professionnels-entreprises/vosdroits/F31221", titreLien: "Service-Public — durées de conservation", titre: "Mise à jour 2025 des durées légales de conservation des documents professionnels", date: "Février 2025", commentaire: "Actualisation des durées légales pour les documents commerciaux (10 ans), fiscaux (6 ans), sociaux (5 ans) et de santé au travail (40 ans pour les fiches d'exposition amiante).", exploitation: "Preuve : fiche service-public.fr. Action : fiche mémo « Archivage » remise en Module 5." },
    { lien: "https://www.economie.gouv.fr/entreprises/facture-electronique-obligatoire", titreLien: "Ministère de l'Économie — facture électronique", titre: "Généralisation obligatoire de la facture électronique (2026-2027)", date: "Septembre 2025", commentaire: "À compter de septembre 2026, toutes les entreprises devront pouvoir recevoir des factures électroniques via une plateforme certifiée (PDP). L'émission devient obligatoire progressivement à partir de 2027 selon la taille.", exploitation: "Preuve : décret publié. Action : session dédiée en Module 3 (bureautique) sur les outils de dématérialisation." },
    { lien: "https://www.travail-emploi.gouv.fr/le-teletravail", titreLien: "Ministère du Travail — télétravail", titre: "Charte télétravail devenue obligatoire pour les accords collectifs 2026", date: "Décembre 2025", commentaire: "Toute mise en place ou évolution du télétravail doit désormais donner lieu à une charte signée et consultée par le CSE. Impact direct sur la rédaction des notes de service et courriers RH.", exploitation: "Preuve : décret + modèle de charte. Action : atelier Module 2 sur la note de service télétravail." },
  ],
  metier: [
    { lien: "https://www.francetravail.fr/candidat/decouvrir-le-marche-du-travail.html", titreLien: "France Travail — fiche ROME M1607", titre: "Le métier de secrétaire toujours dans le top 10 des recrutements TPE-PME", date: "Janvier 2026", commentaire: "450 000 postes en France, 65 000 offres publiées en 2025, salaire médian 26 k€ brut / 28-32 k€ pour office manager. Île-de-France, PACA et AURA en tête.", exploitation: "Preuve : statistiques France Travail. Action : orientation carrière en Module 5, préparation entretien." },
    { lien: "https://www.projet-voltaire.fr/", titreLien: "Projet Voltaire — baromètre orthographe", titre: "Baromètre 2025 : 87 % des recruteurs écartent une candidature pour une faute majeure", date: "Novembre 2025", commentaire: "Étude Projet Voltaire menée auprès de 800 recruteurs : l'orthographe reste le 1er critère éliminatoire à la lecture d'un CV ou d'un email de candidature.", exploitation: "Preuve : synthèse baromètre. Action : entraînement Projet Voltaire intégré au Module 2 (communication écrite)." },
    { lien: "https://www.andrh.fr/", titreLien: "ANDRH — publications", titre: "L'office manager, poste stratégique dans 78 % des startups en 2026", date: "Février 2026", commentaire: "L'ANDRH publie une étude sur l'évolution du poste : de secrétariat pur vers un rôle transversal (RH admin, finance légère, événementiel, culture d'entreprise).", exploitation: "Preuve : publication ANDRH. Action : Module 5 orientation carrière, pitch office manager." },
    { lien: "https://www.harvard-business-review.fr/", titreLien: "Harvard Business Review", titre: "L'accueil physique reste déterminant : décision en 7 secondes", date: "Octobre 2025", commentaire: "L'étude HBR confirme qu'un visiteur se forge un avis sur l'entreprise dans les 7 premières secondes de son arrivée à l'accueil. La formation à l'accueil reste un ROI élevé.", exploitation: "Preuve : article HBR. Action : atelier mises en situation Module 4." },
    { lien: "https://www.editions-tissot.fr/", titreLien: "Éditions Tissot — actualités RH", titre: "Modernisation des conventions collectives : impact sur les fiches de poste secrétariat", date: "Décembre 2025", commentaire: "Plusieurs conventions collectives (SYNTEC, cabinets d'avocats, PME cabinets comptables) actualisent leurs classifications, avec une revalorisation des postes d'assistant(e) technique.", exploitation: "Preuve : grilles conventionnelles. Action : intégration au support de cours Module 1." },
  ],
  technologique: [
    { lien: "https://www.microsoft.com/fr-fr/microsoft-365/", titreLien: "Microsoft 365 — nouveautés", titre: "Copilot Microsoft 365 devient un assistant standard en 2026", date: "Janvier 2026", commentaire: "Microsoft généralise Copilot dans Word, Excel, Outlook et Teams. Le/la secrétaire doit apprendre à s'appuyer sur l'IA (résumé de réunion, aide à la rédaction) tout en gardant l'esprit critique.", exploitation: "Preuve : documentation Microsoft. Action : démonstration Copilot en Module 3 (bureautique)." },
    { lien: "https://yousign.com/fr/blog", titreLien: "Yousign — blog", titre: "La signature électronique se généralise dans les TPE-PME françaises", date: "Novembre 2025", commentaire: "Yousign publie une étude : 62 % des TPE-PME ont adopté la signature électronique en 2025 (contre 34 % en 2022). Réduction du délai moyen de signature de 5,3 j à 1,4 j.", exploitation: "Preuve : étude Yousign. Action : atelier signature électronique en Module 3." },
    { lien: "https://www.cnil.fr/fr/messagerie-electronique-professionnelle", titreLien: "CNIL — messagerie professionnelle", titre: "Chiffrement obligatoire pour les envois de données sensibles par email", date: "Juin 2025", commentaire: "La CNIL rappelle que l'envoi d'un bulletin de paie, d'un contrat ou d'un document RH en pièce jointe non chiffrée peut constituer une violation RGPD.", exploitation: "Preuve : recommandation CNIL. Action : Module 5 démonstration Outlook chiffré + coffre-fort numérique." },
    { lien: "https://www.zeendoc.com/", titreLien: "Zeendoc — GED", titre: "Adoption massive de la GED dans les cabinets comptables et cabinets d'avocats", date: "Octobre 2025", commentaire: "Selon Zeendoc, 71 % des cabinets sont équipés d'une GED en 2025 (contre 42 % en 2021). Le/la secrétaire devient administrateur/administratrice fonctionnel(le) de la GED.", exploitation: "Preuve : étude Zeendoc. Action : démonstration Zeendoc en Module 5." },
    { lien: "https://www.microsoft.com/fr-fr/microsoft-teams", titreLien: "Microsoft Teams — évolutions", titre: "Teams intègre transcription automatique et sous-titrage en direct FR/EN", date: "Décembre 2025", commentaire: "Nouvelle version Teams : transcription en direct puis résumé automatique de réunion. Gain de temps massif pour la rédaction des CR — mais nécessite un contrôle humain systématique.", exploitation: "Preuve : documentation Microsoft. Action : démo en Module 3 + limites en Module 2 (rédaction du CR final)." },
  ],
};

// ---------------------------------------------------------------------------
// Exercices par module (5 modules × 5 QCM + 1 exercice pratique)
// Réutilise le format PaieModuleExercises pour compatibilité avec les générateurs.
// ---------------------------------------------------------------------------
const mq = (question: string, options: string[], correctIndex: number) => ({ question, options, correctIndex });

export const SECRETARIAT_MODULE_EXERCISES: PaieModuleExercises[] = [
  {
    moduleTitre: "Module 1 — Métier, posture et environnement du secrétariat",
    qcm: [
      mq("La qualité N° 1 attendue d'un(e) secrétaire est :", ["La vitesse de frappe", "La discrétion", "La maîtrise de l'anglais", "L'ancienneté"], 1),
      mq("Le manquement à la confidentialité peut constituer :", ["Un simple avertissement", "Une faute grave justifiant un licenciement", "Une négociation salariale", "Un motif de mutation"], 1),
      mq("La CNIL est l'autorité qui contrôle :", ["Les impôts", "La protection des données personnelles", "Le droit du travail", "Les factures"], 1),
      mq("Le/la secrétaire est soumis(e) à l'obligation de loyauté prévue :", ["Au Code pénal", "À l'article L1222-1 du Code du travail", "Au Code civil", "Nulle part"], 1),
      mq("Un document confidentiel oublié à l'imprimante doit être :", ["Lu par curiosité professionnelle", "Récupéré et remis à son destinataire sans être lu", "Jeté à la poubelle", "Publié en interne"], 1),
    ],
    exercice: {
      titre: "Gestion d'une demande d'accès inappropriée",
      consigne: "Un collaborateur d'un autre service vous demande le compte rendu du COMEX de la semaine dernière. Il n'est pas dans la liste de diffusion officielle. Rédigez votre réponse écrite (email court) et détaillez les 3 principes que vous appliquez.",
      reponseAttendue: "Réponse email : « Bonjour [Prénom], le compte rendu du COMEX est diffusé uniquement à la liste validée par la Direction. Si tu penses devoir y avoir accès dans le cadre de ton poste, je te suggère de faire la demande directement à [Secrétaire général / DG] qui pourra ajouter ton nom à la liste si c'est pertinent. Bien à toi, [Signature]. » 3 principes : (1) on ne transmet jamais un document confidentiel sans validation explicite du bon niveau hiérarchique ; (2) on redirige poliment vers la personne légitime à valider ; (3) on trace la demande (email conservé) au cas où le sujet remonte.",
      points: 4,
    },
  },
  {
    moduleTitre: "Module 2 — Communication écrite professionnelle",
    qcm: [
      mq("La formule d'appel adaptée à un courrier officiel commence par :", ["Salut", "Cher", "Madame, Monsieur,", "Coucou"], 2),
      mq("Un email professionnel doit toujours contenir :", ["Un objet vague", "Un objet clair et explicite", "Aucun objet", "Un objet en majuscules"], 1),
      mq("La règle idéale de longueur d'une phrase à l'écrit pro est :", ["5 mots max", "15 à 20 mots max", "40 mots min", "Aucune règle"], 1),
      mq("Un compte rendu synthétique doit obligatoirement lister :", ["Uniquement les blagues faites en réunion", "Les décisions, actions attribuées et échéances", "Uniquement les présents", "Uniquement le prochain RDV"], 1),
      mq("La note de service se distingue de la note d'information car elle :", ["Est plus longue", "A une valeur contraignante (obligatoire)", "Est facultative", "Ne concerne que la Direction"], 1),
    ],
    exercice: {
      titre: "Email de relance de facture impayée",
      consigne: "Rédigez un email de relance à M. Dubois, DAF de CLIENT SA, pour la facture n° 2026-0142 (1 850 € HT) échue depuis 21 jours. Ton ferme mais courtois.",
      reponseAttendue: "Objet : Relance facture n° 2026-0142 — 1 850 € HT échue depuis 21 jours. Monsieur Dubois, Sauf erreur de notre part, la facture n° 2026-0142 d'un montant de 1 850 € HT, émise le 15 février 2026 et échue le 17 mars 2026, ne nous est pas parvenue à ce jour. Je vous serais reconnaissante de bien vouloir procéder à son règlement dans les meilleurs délais, ou de me signaler tout élément justifiant ce retard. Un duplicata est joint à ce message pour faciliter le traitement. Je reste à votre disposition pour tout complément d'information et vous prie d'agréer, Monsieur Dubois, l'expression de mes salutations distinguées. [Signature normalisée]",
      points: 5,
    },
  },
  {
    moduleTitre: "Module 3 — Bureautique et outils modernes",
    qcm: [
      mq("Sur Word, un style (Titre 1, Titre 2…) permet notamment :", ["De colorier le fond", "De générer une table des matières automatique", "De verrouiller le fichier", "De compter les mots"], 1),
      mq("La formule Excel =SI(A1>100;\"OUI\";\"NON\") renvoie :", ["Toujours OUI", "OUI si A1 est supérieur à 100, sinon NON", "NON toujours", "Une erreur"], 1),
      mq("Une délégation d'agenda Outlook conforme consiste à :", ["Partager son mot de passe", "Ajouter la personne comme délégué avec droits « Envoyer au nom de »", "Transférer manuellement chaque événement", "Imprimer l'agenda"], 1),
      mq("Un TCD (tableau croisé dynamique) sert à :", ["Colorier un tableau", "Résumer et analyser rapidement de grandes quantités de données", "Envoyer un email", "Verrouiller Excel"], 1),
      mq("La signature électronique simple (Yousign, DocuSign) a une valeur légale :", ["Nulle", "Équivalente à la signature manuscrite (art. 1367 Code civil)", "Uniquement en interne", "Uniquement pour les factures"], 1),
    ],
    exercice: {
      titre: "Tableau Excel — suivi des notes de frais",
      consigne: "Décrivez la structure complète d'un tableau Excel de suivi des notes de frais pour 8 collaborateurs : colonnes, formules, mises en forme conditionnelles, TCD et protection.",
      reponseAttendue: "Colonnes : Date | Collaborateur | Motif | Montant HT | TVA (=B2*20%) | TTC (=B2+C2) | Justificatif OK (O/N) | Validé par | Date remboursement. Contrôle : =SI(ET(D2>500;F2=\"N\");\"⚠ À justifier\";\"OK\"). Mise en forme conditionnelle : ligne en rouge si Montant>500 € et Justificatif=N ; en orange si Date remboursement vide et Date > 30 j. TCD en bas : lignes = Collaborateur, valeurs = Somme de TTC, filtre = mois. Feuille protégée par mot de passe sauf colonnes de saisie. Sauvegarde automatique OneDrive.",
      points: 5,
    },
  },
  {
    moduleTitre: "Module 4 — Accueil physique, téléphonique et gestion des relations",
    qcm: [
      mq("Un visiteur se forge son opinion sur l'entreprise en :", ["30 minutes", "7 secondes", "1 journée", "1 semaine"], 1),
      mq("On décroche idéalement le téléphone avant la :", ["1re sonnerie", "3e sonnerie", "10e sonnerie", "Jamais avant 1 minute"], 1),
      mq("La méthode ERIC signifie :", ["Écouter, Reformuler, Informer, Conclure", "Écrire, Rappeler, Insister, Contrôler", "Envoyer, Recevoir, Interroger, Clore", "Écouter, Répondre, Interrompre, Conclure"], 0),
      mq("Face à un client mécontent, la 1re action est :", ["Se justifier", "Écouter sans interrompre puis reformuler", "Raccrocher", "Passer l'appel au manager"], 1),
      mq("Le niveau d'anglais attendu par 65 % des offres secrétariat Île-de-France est :", ["A1", "A2", "B1 (utilisateur indépendant)", "C2"], 2),
    ],
    exercice: {
      titre: "Mise en situation — appel d'un client mécontent (méthode ERIC)",
      consigne: "Un client vous appelle furieux car sa commande n'est pas livrée alors qu'il en a besoin pour une présentation dans 4 h. Détaillez votre traitement pas à pas avec les phrases exactes puis les actions internes qui suivent.",
      reponseAttendue: "1. Décrocher : « [Entreprise], [Prénom] à votre écoute, bonjour. » 2. Écouter sans interrompre, prendre notes précises. 3. Reformuler : « Si je comprends bien, votre commande n° [X] devait vous être livrée ce matin et vous ne l'avez toujours pas reçue, ce qui vous bloque pour votre présentation de 14h — c'est bien cela ? » 4. S'excuser : « Je comprends votre inquiétude, je vais faire vérifier immédiatement. » 5. Engagement : « Je vous rappelle sous 30 minutes avec une réponse précise. » 6. Conclure : « Puis-je vous rappeler au [numéro] ? Je vous remercie de votre patience. » Actions post-appel (dans les 5 min) : (i) transmettre par email au service logistique avec l'heure d'engagement ; (ii) tracer dans le tableau de suivi qualité ; (iii) rappeler avant l'échéance même sans info complète, quitte à donner un nouveau délai ; (iv) informer le manager si le problème dépasse le cadre.",
      points: 5,
    },
  },
  {
    moduleTitre: "Module 5 — Organisation, classement, archivage et emploi",
    qcm: [
      mq("La matrice d'Eisenhower croise :", ["Coût et bénéfice", "Urgence et importance", "Difficulté et durée", "Nom et prénom"], 1),
      mq("La règle des 2 minutes (GTD) consiste à :", ["Ne travailler que 2 minutes", "Faire immédiatement toute tâche < 2 min", "Faire une pause toutes les 2 min", "Répondre en 2 min max"], 1),
      mq("La durée légale de conservation des contrats de travail après départ est de :", ["1 an", "3 ans", "5 ans", "10 ans"], 2),
      mq("La durée de conservation des factures (Code de commerce) est de :", ["3 ans", "5 ans", "6 ans", "10 ans"], 3),
      mq("Un plan de classement fiable repose sur :", ["Une seule logique par niveau, une nomenclature stable, un responsable identifié", "Aucune règle stricte", "L'ordre d'arrivée", "Le prénom du créateur"], 0),
    ],
    exercice: {
      titre: "Plan de classement électronique complet — service RH PME",
      consigne: "Proposez un plan de classement complet pour la GED du service RH d'une PME de 35 salariés, avec sous-dossiers, durées de conservation, principe de nommage des fichiers et gestion des droits d'accès.",
      reponseAttendue: "Racine : /RH. Sous-dossiers : /01_Contrats_de_travail (conservation 5 ans après départ) → /2024 /2025 /2026 ; /02_Bulletins_de_paie (5 ans légal, 50 ans conseillé dématérialisé) ; /03_Formations (5 ans) → /Plan /Conventions /Attestations ; /04_Absences_Conges (5 ans) ; /05_Instances_representatives (durée mandat + 5 ans) → /CSE /Elections /PV ; /06_Recrutement (2 ans candidatures non retenues) ; /07_Confidentiels_RGPD (accès restreint DRH) → /Sanctions /Ruptures /Contentieux ; /08_Archives (au-delà des durées actives). Nommage : AAAA-MM-JJ_TYPE_NOMDOSSIER_vX.ext (ex : 2026-03-15_Contrat_MartinP_v2.pdf). Droits : lecture pour équipe RH, écriture DRH + assistant(e), dossier 07 restreint DRH uniquement. Journalisation activée + purge automatique paramétrée selon durées légales. Sauvegarde OneDrive/SharePoint quotidienne.",
      points: 5,
    },
  },
];

// ---------------------------------------------------------------------------
// Seeder : pré-remplit tous les caches AI pour la formation Secrétariat.
// ---------------------------------------------------------------------------
export function seedSecretariatAICaches(): void {
  try {
    setCachedContentPack(FORMATION_SECRETARIAT, SECRETARIAT_CONTENT_PACK);
    setCachedEvalPack(FORMATION_SECRETARIAT, SECRETARIAT_EVAL_PACK);
    setCachedVeillePack(FORMATION_SECRETARIAT, SECRETARIAT_VEILLE_PACK);
  } catch {
    /* sessionStorage indisponible : ignoré */
  }
}
