/**
 * Preset complet "TP GOTRM" (Gestionnaire des Opérations de Transport Routier de Marchandises).
 * Titre Professionnel TP-01329, RNCP40990, niveau 5.
 * Seeder qui pré-remplit les caches IA (contenu, évaluation, veille) pour que tous les
 * documents Qualiopi/OPCO soient générés sans appel IA, avec réponses stagiaires humanisées.
 */
import type { AIContentPack } from "./aiContentPack";
import type { AIEvalPack } from "./aiEvalPack";
import type { AIVeillePack } from "./aiVeillePack";
import { setCachedContentPack } from "./aiContentPack";
import { setCachedPack as setCachedEvalPack } from "./aiEvalPack";
import { setCachedVeillePack } from "./aiVeillePack";
import type { PaieModuleExercises } from "./paiePreset";

// ---------------------------------------------------------------------------
// Deux titres cibles (les caches sont indexés par intitulé — on seed les deux)
// ---------------------------------------------------------------------------
const TITLES = [
  "TP Gestionnaire des Opérations de Transport Routier de Marchandises (GOTRM)",
  "HEXAGONE FORMATION – TP GOTRM (Session intensive 5 jours)",
];

// ---------------------------------------------------------------------------
// Content pack — Besoins humanisés + ressources
// ---------------------------------------------------------------------------
const GOTRM_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: [
      "Franchement moi ce que je veux c'est décrocher le titre pro pour pouvoir monter ma boîte de transport, ça fait 4 ans que je roule et je vois bien que les patrons qui gèrent bien leur exploitation font la différence.",
      "Ce qui me pose vraiment problème c'est le calcul du PRK, mon chef me demande de sortir des devis mais je bloque sur les coûts fixes/variables, du coup je mets trop de temps et parfois je me plante sur la marge.",
      "Honnêtement le règlement 561/2006 sur les temps de conduite je le connais côté conducteur, mais côté exploitant faire les plans de marche pour 15 chauffeurs sans dépasser 90 h sur 2 semaines je maîtrise pas encore.",
      "Mon objectif c'est de passer chef d'exploitation, ma direction m'a proposé le poste mais faut que je valide le titre pour être crédible auprès des conducteurs qui ont tous 20 ans de bahut derrière eux.",
      "Ce que j'attends c'est concret sur les TMS, on utilise Akanea au bureau mais on m'a jamais montré comment sortir un plan de tournée propre avec optimisation kilométrique, je fais tout à la main sur Excel.",
      "Moi mon vrai souci c'est les litiges CMR, quand un client m'appelle parce que sa palette est cassée à l'arrivée je sais pas quoi lui répondre, à combien je dois l'indemniser, quels délais, j'improvise à chaque fois.",
      "J'aimerais bien comprendre les bourses de fret parce qu'on paie B2Pweb 350 € par mois mais on l'utilise à moitié, alors qu'on a 25 % de retours à vide sur nos tractions Marseille-Paris.",
      "Le contrôle des sous-traitants je le fais pas bien, on a été redressé l'année dernière par l'URSSAF pour du travail dissimulé sur un affrété espagnol, faut vraiment que je monte en compétence sur la vigilance.",
      "Ce que je veux vraiment c'est apprendre à sortir un tableau de bord d'exploitation propre avec les bons indicateurs, parce que la direction me demande un reporting mensuel et je bricole une feuille Excel qui parle à personne.",
      "Mon besoin c'est aussi de bien préparer le dossier de la MSP et l'entretien technique, je connais mon métier mais à l'oral face à un jury je vais être tétanisé si je m'entraîne pas avant.",
    ],
    syntheseHtml:
      "10 stagiaires sur 10 visent le TP-01329 (niveau 5) pour un projet d'évolution : passage exploitant ou chef d'exploitation (7/10), création d'entreprise transport (2/10), reconversion (1/10).<br>8 sur 10 identifient le <strong>calcul du PRK et la tarification</strong> comme leur point faible n° 1.<br>7 sur 10 citent la <strong>réglementation RSE / plans de marche</strong> comme un chantier à sécuriser côté exploitant.<br>6 sur 10 sont en difficulté sur les <strong>litiges CMR et la gestion des réserves</strong>.<br>5 sur 10 souhaitent monter en compétence sur les <strong>TMS et l'optimisation des tournées</strong>.<br>4 sur 10 ont subi ou craignent un <strong>redressement URSSAF</strong> lié au contrôle des sous-traitants.<br>10 sur 10 attendent de la <strong>pratique</strong> : cas réels, mises en situation, dossier de MSP travaillé pas à pas.",
    adaptationsHtml:
      "• Alternance 60 % cas pratiques / 40 % apports, systématiquement sur données réelles anonymisées.<br>• Feuille Excel PRK fournie et retravaillée module par module (véhicule, conducteur, structure, indexation gazole).<br>• Simulation TMS pédagogique (Akanea démo) avec construction complète d'un plan de tournée sur 3 jours.<br>• Atelier « litige CMR » sur 5 cas types (retard, avarie, manquant, refus, expertise contradictoire).<br>• Grille de contrôle sous-traitant remise (checklist Kbis, licence, RC, URSSAF vigilance).<br>• Tableau de bord exploitation Excel modélisé et personnalisé par chaque stagiaire sur les données de son entreprise.<br>• MSP blanche complète en fin de parcours (10 h en 2 jours + entretien technique 1 h + questionnement 30 min).<br>• Coaching individuel sur le document support du questionnement (8 à 12 pages) — 3 relectures formateur.",
  },
  chapters: [], // Servi par getGOTRMChapters (courseContent.ts)
  exercises: [
    { titre: "Calcul de PRK et proposition tarifaire", consigne: "Construisez le PRK d'un ensemble semi-remorque bâchée 40 t (base 90 000 km/an) puis établissez la proposition tarifaire pour un trajet Paris (75) → Lyon (69), 460 km simple, retour à vide, marge cible 10 %.", reponseAttendue: "Coûts fixes annuels : amortissement (18 000 €) + conducteur charges incluses (55 000 €) + assurances (6 500 €) + structure (9 000 €) = 88 500 €. Coûts variables : gazole (30 L/100 × 1,55 € = 0,465 €/km) + entretien pneus (0,085 €) + péages (0,15 €). PRK total ≈ 1,67 €/km. Trajet 460 km AR facturé équivalent 460 × coefficient retour vide 1,5 = 690 km facturables. Base = 690 × 1,67 = 1 152 €. Marge 10 % → prix HT 1 270 €. Indexation gazole mensuelle CNR mentionnée. Validité 15 jours. TVA 20 % → 1 524 € TTC.", points: 5 },
    { titre: "Plan de marche RSE conforme", consigne: "Un conducteur doit assurer une navette Paris → Marseille (780 km, environ 9 h de conduite) avec chargement à 6 h et livraison le lendemain avant 12 h. Rédigez le plan de marche conforme au règlement 561/2006 et détaillez le calcul des repos.", reponseAttendue: "Départ Paris 06h00. Conduite 4h30 → arrivée Auxerre 10h30. Pause 45 min (fractionnable 15 + 30). Reprise 11h15. Conduite 4h30 → arrivée Valence 15h45. Pause 45 min. Reprise 16h30. Conduite max 1 h ce jour (total 9 h atteint) → arrivée Montélimar 17h30. Repos journalier 11 h consécutives (17h30 → 04h30). Reprise 04h30. Conduite 3 h → arrivée Marseille 07h30. Livraison créneau 08h00-12h00 OK. Contrôles : 9 h/jour respectés, pause 45 min après 4h30 respectée, repos 11 h respecté. Chronotachygraphe téléchargé à retour dépôt.", points: 5 },
    { titre: "Contrat sous-traitance — clauses critiques", consigne: "Vous devez sous-traiter une ligne quotidienne Roissy → Nantes à un confrère (2 rotations/jour, 5 jours/semaine, 42 semaines/an). Détaillez les 8 clauses contractuelles critiques à négocier et les contrôles préalables à effectuer.", reponseAttendue: "Contrôles préalables : (1) licence communautaire en cours ; (2) attestation capacité professionnelle ; (3) attestation URSSAF vigilance L8222-1 (obligatoire, à renouveler tous les 6 mois) ; (4) RC transporteur + marchandises ; (5) Kbis < 3 mois. Clauses : (1) Volume 420 rotations/an ± 15 % ; (2) Prix unitaire 380 €/rotation ; (3) Indexation gazole mensuelle formule CNR longue distance ; (4) Facturation mensuelle, paiement 30 j fin de mois LME ; (5) KPI OTIF ≥ 97 %, pénalité 15 €/rotation en dessous ; (6) Durée 12 mois tacite reconduction préavis 3 mois ; (7) Sous-traitance de second rang interdite sans accord écrit ; (8) Assurance ad valorem si demande client. Signature en 2 exemplaires, référence contrat-type décret 2017-1740.", points: 4 },
    { titre: "Traitement d'un litige CMR — avarie apparente", consigne: "À la livraison, le destinataire signe le CMR avec la mention « 3 palettes filmées, 2 cartons écrasés, contenu à vérifier ». Marchandise = pièces automobiles, valeur déclarée en facture 8 500 €, poids palettes concernées 480 kg. Détaillez le traitement complet du dossier.", reponseAttendue: "1) Réserves apparentes portées sur CMR au moment de la livraison → recevables sans LRAR (art. 30 CMR). 2) Conducteur prend photos, remonte info exploitant sous 2 h. 3) Ouverture dossier litige au bureau. 4) Accusé réception au client sous 48 h. 5) Demande devis réparation ou expertise. 6) Calcul indemnisation CMR : plafond 8,33 DTS/kg = 480 × 8,33 × ~1,20 €/DTS ≈ 4 800 €. Si valeur déclarée à l'expédition supérieure et surprime payée : indemnisation à hauteur de la valeur déclarée jusqu'à 8 500 €. Sinon plafond 4 800 €. 7) Déclaration à l'assureur marchandises. 8) Proposition transaction amiable au client (indemnisation + geste commercial). 9) Clôture dossier < 15 j, mise à jour tableau litiges pour calcul taux annuel < 1 %.", points: 5 },
    { titre: "Tableau de bord d'exploitation — 5 KPI et plan d'action", consigne: "Analysez ces 5 KPI mensuels d'une flotte de 12 véhicules et proposez un plan d'action priorisé : Taux retour vide 22 % (cible 15 %), OTIF 94 % (cible 96 %), Consommation 32 L/100 (cible 30), Taux litiges 1,4 % (cible <1 %), DSO 62 j (cible 50 j).", reponseAttendue: "Priorité 1 (impact marge fort) — Retour vide 22 % : mettre en place abonnement bourse fret B2Pweb + Teleroute, brief conducteurs pour proposer capacité au retour, objectif -5 pts en 3 mois → +45 k€ marge annuelle. Priorité 2 — DSO 62 j : audit chaîne facturation (retard émission ?), relances J+7, J+15, J+30 systématisées, encaissement CB pour petits clients, objectif -10 j en 4 mois. Priorité 3 — OTIF 94 % : analyse Pareto des 20 % de retards responsables de 80 % des cas, plan spécifique (revoir plages horaires, buffer 15 min). Priorité 4 — Consommation 32 L : formation éco-conduite (économie 5-8 %), coaching individuel top consommateurs, changement pneus basse résistance. Priorité 5 — Litiges 1,4 % : cause racine analyse (calage marchandise ? formation manutention ?), revue emballage avec chargeur principal.", points: 5 },
    { titre: "Simulation entretien technique du titre TP-01329", consigne: "Vous êtes tiré au sort sur le sujet : « Vous êtes exploitant, un client stratégique menace de partir chez un concurrent moins cher de 8 %. Comment réagissez-vous ? » — Structurez votre réponse en 5 min (introduction, analyse, propositions, arbitrage, conclusion).", reponseAttendue: "Intro (30s) : reformulation du contexte et enjeu (perte de CA X k€/an, image, effet domino). Analyse (1min30) : rapport marge/CA du client, positionnement concurrentiel (prix vs qualité), historique relation, éléments de valeur ajoutée (délais, SAV, digitalisation). Propositions (1min30) : 3 leviers = (1) baisse ciblée 3 % contre engagement volume + durée 24 mois, (2) refonte du plan de tournée avec optimisation retours pour absorber la baisse, (3) offre de service premium (visibilité temps réel Shippeo, reporting mensuel, KAM dédié) justifiant l'écart tarifaire. Arbitrage (1min) : ne pas s'aligner à -8 % (destructeur de marge et signal marché), viser -3 % + valeur ajoutée + verrouillage contractuel. Conclusion (30s) : rendez-vous décideur direction, préparation dossier chiffré, décision sous 15 jours pour éviter attrition.", points: 4 },
  ],
  ressources: {
    supportsHtml:
      `<p>• Support de cours PDF 60 pages : les 3 BLOCS / CCP du titre TP-01329, complet.<br>• Fiches mémo 1 page : PRK, RSE (561/2006 + AETR), CMR (plafond 8,33 DTS/kg), ADR (9 classes), contrat-type sous-traitance, indices CNR.<br>• Modèles Word : proposition commerciale transport, contrat sous-traitance, lettre de réserve CMR, note de service RPS, procédure litige.<br>• Modèles Excel : PRK paramétrable, plan de marche RSE, tableau de bord 10 KPI, calcul indexation gazole CNR, suivi litiges.<br>• Trame du document support du questionnement (8 à 12 pages) commentée.<br>• Annales de sessions TP-01329 : 3 sujets de MSP + 20 sujets d'entretien technique + grille jury.</p>`,
    outilsHtml:
      `<p>• Postes individuels avec Word®, Excel®, accès Internet.<br>• TMS pédagogique Akanea Transport (version démo).<br>• Simulateur de bourse de fret B2Pweb (compte formation).<br>• Logiciel d'optimisation de tournée PTV Route Optimizer (démo).<br>• Documentation à jour : Code des transports, Convention CMR, contrats-types DGITM, CCN transports routiers (IDCC 0016), indices CNR mensuels.<br>• Chronotachygraphe pédagogique + cartes conducteur factices pour analyse des données.</p>`,
    ressourcesComplHtml:
      `<p>• <strong>Site officiel :</strong> <a href="https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000023086525/" style="color:hsl(220,60%,50%)">Legifrance — Code des transports</a>.<br>• <strong>Site officiel :</strong> <a href="https://www.ecologie.gouv.fr/transport-routier-marchandises" style="color:hsl(220,60%,50%)">Ministère chargé des Transports — TRM</a>.<br>• <strong>Site officiel :</strong> <a href="https://www.cnr.fr/" style="color:hsl(220,60%,50%)">Comité National Routier (indices, études PRK)</a>.<br>• <strong>Fédération :</strong> <a href="https://www.fntr.fr/" style="color:hsl(220,60%,50%)">FNTR — Fédération Nationale des Transports Routiers</a>.<br>• <strong>Fédération :</strong> <a href="https://www.otre.org/" style="color:hsl(220,60%,50%)">OTRE — Organisation des Transporteurs Routiers Européens</a>.<br>• <strong>Formation continue obligatoire :</strong> <a href="https://www.aft-dev.com/" style="color:hsl(220,60%,50%)">AFTRAL / PROMOTRANS</a>.<br>• <strong>Livre :</strong> « Le contrat de transport routier de marchandises » — Éditions LexisNexis 2025.<br>• <strong>Livre :</strong> « Gestion et exploitation transport » — Éditions Celse 2024.<br>• Glossaire : PRK, OTIF, CMR, TIR, ADR, ATP, RSE, AETR, DTS, hub-and-spoke, groupage, dégroupage, camionnage, traction.</p>`,
    videos: [
      { title: "Le métier d'exploitant transport routier — fiche métier", description: "Missions, journée type, compétences, salaires et perspectives d'évolution (source AFT).", url: "https://www.youtube.com/results?search_query=exploitant+transport+routier+m%C3%A9tier+afttrp" },
      { title: "Règlement 561/2006 — Temps de conduite et repos", description: "Décryptage complet : 9h/jour, pause 45 min, repos 11h, hebdo 45h, bi-hebdo 90h.", url: "https://www.youtube.com/results?search_query=r%C3%A8glement+561+2006+temps+conduite+repos" },
      { title: "Calcul du PRK — méthode et fichier Excel", description: "Construire son PRK étape par étape, coûts fixes/variables/km.", url: "https://www.youtube.com/results?search_query=calcul+PRK+transport+routier+excel" },
      { title: "Convention CMR — indemnisation avarie et retard", description: "Plafond 8,33 DTS/kg, déclaration d'intérêt spécial, réserves à la livraison.", url: "https://www.youtube.com/results?search_query=convention+CMR+indemnisation+avarie" },
      { title: "TMS Akanea Transport — démo exploitation", description: "Présentation complète du TMS leader en France : commande, planning, facturation.", url: "https://www.youtube.com/results?search_query=akanea+transport+d%C3%A9mo+TMS" },
      { title: "Bourse de fret B2Pweb — utiliser pour réduire les retours à vide", description: "Publier une capacité, prendre un fret, négocier.", url: "https://www.youtube.com/results?search_query=b2pweb+bourse+fret+tutoriel" },
      { title: "Contrôle sous-traitants transport — obligations donneur d'ordre", description: "Vigilance URSSAF L8222-1, licence, capacité, RC, sanctions en cas de manquement.", url: "https://www.youtube.com/results?search_query=contr%C3%B4le+sous+traitant+transport+urssaf+vigilance" },
      { title: "Titre professionnel GOTRM — présentation session d'examen", description: "MSP 10h, entretien technique 1h, questionnement 30 min, entretien final 30 min.", url: "https://www.youtube.com/results?search_query=titre+professionnel+GOTRM+session+examen" },
      { title: "Optimisation de tournée avec PTV Route Optimizer", description: "Réduire les kilomètres à vide et le temps de conduite grâce à l'algorithme.", url: "https://www.youtube.com/results?search_query=PTV+route+optimizer+tourn%C3%A9e" },
      { title: "Indices CNR — indexation gazole et longue distance", description: "Comprendre les indices publiés mensuellement et les intégrer aux contrats.", url: "https://www.youtube.com/results?search_query=indices+CNR+indexation+gazole" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Eval pack — QCM positionnement (10+10) + exercice intermédiaire + éval finale (5 exos)
// ---------------------------------------------------------------------------
const q = (question: string, options: string[], correctIndex: number) => ({ question, options, correctIndex });

const GOTRM_EVAL_PACK: AIEvalPack = {
  qcmDebut: [
    q("Un exploitant transport doit obligatoirement contrôler avant la 1re mission d'un sous-traitant :", ["Uniquement son Kbis", "Uniquement l'assurance RC", "Licence communautaire, capacité pro, RC, Kbis et attestation URSSAF vigilance", "Rien : c'est au client final"], 2),
    q("La durée maximale de conduite journalière prévue par le règlement (CE) 561/2006 est :", ["8 h", "9 h (10 h max 2 fois par semaine)", "11 h", "13 h"], 1),
    q("La pause obligatoire après 4 h 30 de conduite est de :", ["15 min", "30 min", "45 min (fractionnable 15 + 30)", "1 h"], 2),
    q("Le PRK signifie :", ["Poids Réel Kilométrique", "Prix de Revient Kilométrique", "Plan de Roulage Kilométrique", "Péage Routier Kilométrique"], 1),
    q("Le plafond d'indemnisation CMR pour une marchandise avariée est de :", ["1 DTS/kg", "8,33 DTS/kg", "20 €/kg", "Valeur de la marchandise sans plafond"], 1),
    q("Le repos hebdomadaire normal prévu par le règlement 561/2006 est de :", ["24 h", "36 h", "45 h consécutives", "48 h"], 2),
    q("Un retour à vide idéal en TRM se situe en dessous de :", ["5 %", "15 %", "30 %", "50 %"], 1),
    q("Le contrat-type sous-traitance transport applicable à défaut d'écrit est fixé par :", ["Le Code civil", "Le décret n° 2017-1740 du 26/12/2017", "La CCN 3085", "Le Code de commerce"], 1),
    q("L'indice de référence pour l'indexation gazole des contrats transport est publié par :", ["L'INSEE", "Le CNR (Comité National Routier)", "L'URSSAF", "La FNTR seule"], 1),
    q("L'attestation de capacité professionnelle transport routier > 3,5 t s'obtient notamment par :", ["Le permis C", "Le titre professionnel TP-01329 GOTRM (équivalence)", "Le brevet des collèges", "Aucune équivalence n'existe"], 1),
  ],
  qcmFin: [
    q("En cas de sous-traitance, la responsabilité solidaire du donneur d'ordre en matière de travail dissimulé est fondée sur :", ["Le Code de la route", "L'art. L8222-1 du Code du travail", "Le Code pénal", "La CCN 3085"], 1),
    q("Sur un semi-remorque bâchée 40 t roulant 90 000 km/an, un PRK réaliste se situe autour de :", ["0,80 €/km", "1,20 €/km", "1,65 €/km", "3 €/km"], 2),
    q("Pour dénoncer un dommage non apparent découvert à la livraison, le destinataire dispose de :", ["24 h", "48 h", "7 jours à compter de la livraison (LRAR)", "1 mois"], 2),
    q("La déclaration d'intérêt spécial à la livraison sert à :", ["Réduire le coût du transport", "Dépasser le plafond CMR d'indemnisation en cas de retard", "Éviter la TVA", "Réserver un créneau"], 1),
    q("Un taux de service (OTIF) contractuel typique en trafic régulier est de :", ["70 %", "85 %", "96 à 98 %", "100 % obligatoire"], 2),
    q("La CCN transports routiers (IDCC 0016) classe le conducteur longue distance sur :", ["Un forfait jours", "Une durée équivalente 43 h/semaine (39 h + coupures)", "Un salaire au km uniquement", "35 h strictes"], 1),
    q("Un chronotachygraphe intelligent 2e génération est obligatoire sur les véhicules neufs immatriculés depuis :", ["2015", "2019", "Août 2023", "2030"], 2),
    q("Le taux de retour à vide de la flotte moyenne française TRM était en 2024 d'environ :", ["5 %", "10 %", "20 %", "40 %"], 2),
    q("Une pénalité contractuelle disproportionnée peut être :", ["Toujours appliquée intégralement", "Réduite par le juge (art. 1231-5 C. civ.) si manifestement excessive", "Ignorée sans risque", "Doublée par le juge"], 1),
    q("La MSP (Mise en Situation Professionnelle) du TP GOTRM dure au total :", ["2 h", "5 h", "10 h en deux parties sur deux jours", "20 h"], 2),
  ],
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire — Dossier client complet (tarification + affectation + suivi)",
    contexte:
      "Vous êtes exploitant chez TRANSNORD SAS (15 semi-remorques). Le 12 mai 2026, la SAS AGROVERT (négoce fruits et légumes) vous appelle pour organiser une livraison urgente : 22 palettes (14 t), Rungis (94) → Toulouse (31), enlèvement 05h00 le 13/05, livraison H+24. Votre flotte est saturée. Vous devez tarifer, décider affectation vs affrètement, sécuriser le sous-traitant, planifier et gérer la livraison.",
    questions: [
      { question: "Établissez la tarification complète de la prestation (base + surcharges + total HT/TTC).", reponseAttendue: "Distance Rungis-Toulouse ≈ 680 km. PRK 1,67 €/km. Base : 680 × 1,67 = 1 135 €. Coefficient urgence (H+24 fixe) +8 % → 1 226 €. Chargement en centre Rungis (attente probable) surcharge 60 €. Retour à vide (Toulouse-Paris pas de fret retour identifié) coefficient 1,4 sur base → total 1 630 €. Marge cible 10 % → prix HT 1 795 €. Indexation gazole mensuelle CNR mentionnée. TVA 20 % → 2 154 € TTC. Validité offre 24 h.", points: 4 },
      { question: "Justifiez le choix affrètement vs interne et détaillez le contrôle du sous-traitant retenu.", reponseAttendue: "Flotte saturée → affrètement obligatoire. Consultation de 3 confrères + bourse B2Pweb. Choix TRANSPYRÉNÉES (offre 1 480 € HT). Contrôles avant confirmation : (1) licence communautaire (extranet DREAL) ; (2) attestation capacité pro du gestionnaire ; (3) RC transporteur + marchandises 500 k€ ; (4) Kbis < 3 mois ; (5) attestation URSSAF vigilance L8222-1 (art. obligatoire, à conserver 5 ans). Émission contrat sous-traitance ponctuel référence décret 2017-1740, prix 1 480 €, OTIF 100 % attendu, pénalité 200 € si retard > 2 h. Marge dossier : 1 795 − 1 480 = 315 € (17,5 %).", points: 4 },
      { question: "Rédigez le plan de marche du sous-traitant (RSE 561/2006).", reponseAttendue: "Départ dépôt sous-traitant Villeneuve 04h00, positionnement Rungis 05h00. Chargement 05h00-05h45. Départ Rungis 06h00. Conduite 4h30 → Orléans 10h30. Pause 45 min. Reprise 11h15. Conduite 4h30 → Cahors 15h45 (limite 9 h atteinte). Pause 45 min. Reprise 16h30. Conduite 1 h → Montauban 17h30 (9 h + 1 h = utilisation 10 h autorisée 2×/semaine si nécessaire) OU repos journalier immédiat. Solution retenue : coupure Cahors 15h45, repos 11 h → 02h45. Reprise 02h45. Conduite 2 h → Toulouse 04h45. Livraison créneau 05h00. Marge sur H+24 respectée. Chronotachygraphe conforme.", points: 4 },
      { question: "Décrivez le suivi en temps réel et la clôture du dossier (documents + facturation).", reponseAttendue: "Suivi : géolocalisation TMS avec alertes à J-1 chargement + départ + arrivée hub + livraison. Ping client à 3 étapes clés. À la livraison : récupération CMR signé (photo si scan), vérification réserves éventuelles (aucune ici). Enregistrement bon de livraison dans TMS. Clôture : contrôle facture sous-traitant (1 480 € HT conforme + gazole indexé), rapprochement avec commande, mise en règlement 30 j fin de mois. Facturation client AGROVERT sous 48 h (1 795 € HT), CMR joint. Mise à jour KPI dossier (OTIF 100 %, marge 17,5 %, litige 0). Archivage dossier /Clients/AGROVERT/2026-05-13_Rungis_Toulouse/ (CMR, contrat sous-traitance, facture client, facture ST, échanges mails).", points: 4 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale — 5 cas pratiques d'exploitation (blanche MSP TP-01329)",
    exercices: [
      { titre: "Étude tarifaire d'un trafic régulier (5 rotations/semaine)", consigne: "AGROVERT vous demande maintenant de contractualiser 5 rotations Rungis-Toulouse par semaine, 46 semaines/an. Établissez la tarification annualisée, la marge attendue et proposez la clause d'indexation gazole.", reponseAttendue: "230 rotations/an × 1 795 € HT = 412 850 € CA. Coût sous-traité 230 × 1 480 = 340 400 €. Marge brute 72 450 € (17,5 %). Négociation : prix unitaire baisse à 1 720 € contre engagement volume + durée 24 mois, avec sous-traitant renégocié à 1 400 €. Nouveau CA 395 600 €, coût 322 000 €, marge 73 600 € (18,6 %). Clause indexation gazole formule : Prix révisé = Prix base × [1 + a × (I_gazole_m − I_gazole_base) / I_gazole_base] avec a = 0,26 (part gazole dans le PRK). Indice CNR longue distance publié mensuellement. Application 1er du mois M+1.", points: 5 },
      { titre: "Gestion d'un litige CMR — retard avec conséquences client", consigne: "Sur un transport Paris-Marseille (prix 850 € HT), la livraison a 26 h de retard. Le destinataire (usine automobile) déclare un préjudice arrêt de chaîne de 12 500 €. Aucune déclaration d'intérêt spécial n'avait été faite. Traitez le dossier.", reponseAttendue: "1) Droit CMR : indemnisation retard plafonnée au prix du transport (art. 23-5 CMR) = 850 € maximum. 2) L'absence de déclaration d'intérêt spécial à la livraison bloque toute demande au-delà. 3) Réponse client : reconnaissance du retard, courrier officiel, proposition d'indemnisation 850 € + geste commercial 25 % sur prochaine facture. 4) Analyse cause racine : panne conducteur ? aléa route ? erreur planning ? 5) Action corrective : buffer 1 h dans plans de marche Paris-Marseille, coaching éco-conduite pour anticiper embouteillages. 6) Suivi indicateur : ajouter au tableau litiges (impact taux < 1 %). 7) Conseil au commercial : proposer à ce client sensible une déclaration d'intérêt spécial systématique (surprime 1 à 2 %) pour sécuriser sa production.", points: 5 },
      { titre: "Mise en situation manageriale — accompagnement d'un conducteur en surconsommation", consigne: "Un conducteur récent (6 mois d'ancienneté) consomme 34 L/100 (moyenne équipe 30 L). Détaillez la démarche managériale à mener sur 3 mois pour le remettre à la moyenne.", reponseAttendue: "Semaine 1 : entretien individuel bienveillant, présentation données chiffrées (relevés télématique), écoute (formation initiale reçue ? habitudes ?). Semaine 2 : coaching en cabine 1 journée par formateur éco-conduite interne ou externe (AFTRAL). Semaines 3-4 : suivi hebdomadaire personnel, feedback rapide, félicitations sur progrès. Mois 2 : point mensuel, comparaison avec équipe, plan d'actions ciblé (anticipation freinage, régulateur, choix rapports). Mois 3 : bilan, si progression positive → intégration au plan de formation FCO. Si stagnation → analyse psychologique (fatigue, stress, motivation), décision de repositionnement éventuel. Impact attendu : passage à 30-31 L/100 en 3 mois, économie 40 L × 220 j × 1,55 € = 13 640 € / an. Traçabilité : compte rendu entretiens dans dossier RH, indicateur consommation dans grille annuelle.", points: 4 },
      { titre: "Analyse d'un tableau de bord — 3 alertes à traiter en priorité", consigne: "Vous recevez le tableau mensuel : OTIF 92 % (cible 96), taux litiges 1,8 % (cible <1), retour à vide 24 % (cible 15), DSO 71 j (cible 50), marge globale 6,8 % (cible 12). Analysez et priorisez.", reponseAttendue: "Situation critique : 5 KPI sur 5 hors cible, marge presque divisée par 2. Priorité 1 (financier immédiat) — DSO 71 j : audit facturation (délais émission ?), mise en place relances automatiques J+7/+15/+30, encaissement carte pour petits clients, escompte 1 % à 10 j. Objectif -15 j en 2 mois. Priorité 2 (marge) — Retour vide 24 % : abonnement B2Pweb + brief conducteurs (proposer capacité retour), négocier fret retour avec chargeurs Sud → Nord. Objectif -6 pts en 3 mois → +40 k€/an. Priorité 3 (image + revenus) — OTIF 92 % et litiges 1,8 % : Pareto des 20 % de causes responsables de 80 % des cas, plan spécifique (calage, plans marche buffered, formation manutention). Réunion mensuelle direction : engagements + points hebdo pour piloter. Escalade nécessaire si dégradation confirmée sur M+1.", points: 5 },
      { titre: "Simulation entretien final — Éthique et posture professionnelle", consigne: "Un chargeur vous propose un accord verbal : accepter un dépassement systématique de 2 h de conduite par jour contre une prime de 200 €/rotation. Que répondez-vous et pourquoi ? Structurez comme en entretien final (2 min).", reponseAttendue: "Refus ferme et structuré. Raisons : (1) Non-respect du règlement (CE) 561/2006 : infraction pénale (art. L3315-4 Code des transports), amende jusqu'à 30 000 € et 1 an de prison pour l'employeur, retrait de licence communautaire possible. (2) Risque sécurité conducteur : fatigue augmente le risque accident × 5 après 10 h de conduite (données ONISR). (3) Responsabilité pénale personnelle exploitant : co-auteur ou complice, condamnation possible à titre individuel. (4) Risque assurantiel : refus de garantie en cas de sinistre avec dépassement RSE. (5) Éthique métier : notre licence, notre réputation et l'intégrité de nos conducteurs valent plus qu'une prime. Alternative proposée au chargeur : revoir les créneaux d'enlèvement (avancer 1 h), organiser une relève conducteur intermédiaire, ou tarifer une seconde équipe. Attitude : ferme, argumentée, orientée solution — jamais dans le rapport de force stérile.", points: 5 },
    ],
  },
};

// ---------------------------------------------------------------------------
// Veille pack — réglementaire + métier + technologique
// ---------------------------------------------------------------------------
const GOTRM_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    { lien: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049694000", titreLien: "Arrêté du 03/06/2025", titre: "Nouvel arrêté du 03/06/2025 encadrant le titre TP-01329 GOTRM (JO du 14/06/2025)", date: "Juin 2025", commentaire: "Refonte du référentiel : 3 CCP au lieu de 4, MSP portée à 10 h en 2 parties sur 2 jours, document support du questionnement recadré à 8-12 pages / 10 000-17 000 caractères.", exploitation: "Preuve : arrêté publié au JO. Action : refonte complète du parcours pédagogique et de la MSP blanche." },
    { lien: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000037858893", titreLien: "Décret n° 2017-1740", titre: "Contrat-type sous-traitance transport (décret n° 2017-1740 du 26/12/2017) — application constante", date: "Toujours en vigueur", commentaire: "S'applique de plein droit à défaut d'écrit. Fixe prix planchers, indexation gazole obligatoire, clauses de responsabilité. Utilisé comme référence dans 95 % des contentieux DGCCRF sous-traitance transport 2024.", exploitation: "Preuve : texte + arrêts DGCCRF. Action : fourniture d'un modèle conforme à chaque stagiaire, atelier dédié BLOC 2." },
    { lien: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32020R1054", titreLien: "Paquet Mobilité — règlement (UE) 2020/1054", titre: "Paquet Mobilité I — application complète depuis 2022, contrôles renforcés 2025", date: "Février 2025", commentaire: "Retour du véhicule tous les 8 semaines au pays d'établissement, repos hebdomadaire de 45 h hors cabine, cabotage 3 opérations/7 jours puis carence 4 j. Contrôles routiers ELA/DIRECCTE intensifiés avec sanctions immédiates.", exploitation: "Preuve : règlement + guide DGITM. Action : intégration au BLOC 1 (RSE) et au BLOC 2 (trafics internationaux)." },
    { lien: "https://www.cnr.fr/publications/enquetes-longue-distance", titreLien: "CNR — enquêtes coûts", titre: "Publication des coûts de référence longue distance CNR 2025", date: "Trimestriel 2025", commentaire: "Le CNR publie chaque trimestre les coûts moyens détaillés (véhicule, conducteur, carburant, péages). Base 2025 : PRK moyen longue distance semi-remorque = 1,74 €/km (+3,2 % vs 2024).", exploitation: "Preuve : études CNR. Action : mise à jour de la feuille Excel PRK stagiaire à chaque trimestre." },
    { lien: "https://www.ecologie.gouv.fr/decarbonation-transport-routier-marchandises", titreLien: "Ministère — décarbonation TRM", titre: "Feuille de route décarbonation TRM 2030 — obligations progressives", date: "Novembre 2025", commentaire: "Objectif -30 % émissions TRM d'ici 2030. Aides à l'achat de véhicules bas carbone (électrique, hydrogène, biogaz). Reporting CO2 obligatoire pour toute prestation vendue depuis janvier 2025 (loi Climat & Résilience).", exploitation: "Preuve : décret + guides Ademe. Action : intégration au BLOC 3 (tableau de bord environnemental) et aux propositions commerciales." },
  ],
  metier: [
    { lien: "https://www.aft-dev.com/observatoire", titreLien: "AFT — Observatoire", titre: "10 400 recrutements d'exploitants transport prévus en 2026 (AFT)", date: "Janvier 2026", commentaire: "Tension record sur le poste : 4 recrutements pour 1 candidat qualifié. Salaire médian exploitant 34 000 €, chef d'exploitation 48 000 €, directeur d'exploitation 65-80 000 €.", exploitation: "Preuve : rapport AFT. Action : orientation carrière et négociation salariale abordées en BLOC 3." },
    { lien: "https://www.fntr.fr/", titreLien: "FNTR — actualités", titre: "Baromètre FNTR 2026 : rentabilité TRM sous pression (marge nette moyenne 1,8 %)", date: "Février 2026", commentaire: "La fédération alerte : marge nette 1,8 % en 2025 vs 3,2 % en 2020. Rôle stratégique de l'exploitant pour piloter la marge (taux retour vide, litiges, contrats indexés).", exploitation: "Preuve : baromètre FNTR. Action : cas pratiques BLOC 3 sur pilotage marge." },
    { lien: "https://www.otre.org/", titreLien: "OTRE", titre: "Étude OTRE 2025 : 78 % des dirigeants TRM prévoient un plan de digitalisation exploitation", date: "Décembre 2025", commentaire: "Passage massif au TMS et à la géolocalisation temps réel, pilotage KPI en dashboard. Compétences digitales de l'exploitant devenues critiques.", exploitation: "Preuve : étude OTRE. Action : atelier TMS pédagogique renforcé en BLOC 1 et 2." },
    { lien: "https://www.francetravail.fr/candidat/decouvrir-le-marche-du-travail/statistiques-du-marche-du-travail.html", titreLien: "France Travail — fiche ROME N1301", titre: "Exploitant transport : offres +18 % en 2025 vs 2024", date: "Janvier 2026", commentaire: "45 200 offres publiées en 2025, principalement Île-de-France, Rhône-Alpes, Hauts-de-France. Titre professionnel exigé dans 62 % des offres.", exploitation: "Preuve : stats France Travail. Action : préparation candidature BLOC 3 (CV + entretien)." },
    { lien: "https://www.transportinfo.fr/", titreLien: "Transport Info — presse professionnelle", titre: "Consolidation du secteur : 4 800 fusions-acquisitions TRM en 2025", date: "Novembre 2025", commentaire: "Le secteur se consolide, les indépendants (1-5 véhicules) rejoignent des groupements ou sont rachetés. Impact sur l'exploitant : évolution vers des postes multi-sites, pilotage à distance.", exploitation: "Preuve : presse spécialisée. Action : culture métier BLOC 3." },
  ],
  technologique: [
    { lien: "https://www.akanea.com/transport/", titreLien: "Akanea Transport", titre: "TMS Akanea — nouvelle version 2026 avec IA prédictive", date: "Janvier 2026", commentaire: "Suggestion automatique de plans de tournée optimisés, prédiction des aléas (embouteillages, pannes, retards fournisseur), génération automatique de comptes rendus d'exploitation.", exploitation: "Preuve : documentation éditeur. Action : démo Akanea en BLOC 1 sur cas réels." },
    { lien: "https://shippeo.com/", titreLien: "Shippeo — visibilité", titre: "Shippeo devient la référence européenne de la visibilité temps réel transport", date: "Octobre 2025", commentaire: "Plateforme connectée à plus de 800 000 véhicules européens, ETA (Estimated Time of Arrival) prédictif à ±15 min. Argument commercial fort pour un exploitant vendeur.", exploitation: "Preuve : cas clients Shippeo. Action : intégration au SAV BLOC 2." },
    { lien: "https://www.b2pweb.com/", titreLien: "B2Pweb — bourse de fret", titre: "B2Pweb dépasse 12 M d'offres de fret publiées en 2025 (+22 %)", date: "Décembre 2025", commentaire: "Bourse de fret leader en France : opportunité massive pour réduire les retours à vide. Abonnement 250 à 500 € par mois, ROI généralement < 3 mois.", exploitation: "Preuve : chiffres B2Pweb. Action : atelier bourse de fret BLOC 2." },
    { lien: "https://www.ptvgroup.com/fr/", titreLien: "PTV Group — optimisation", titre: "PTV Route Optimizer : gain moyen constaté 18 % km parcourus", date: "Novembre 2025", commentaire: "Cas clients PTV : réduction moyenne 18 % km parcourus, 12 % consommation, 15 % émissions CO2. Investissement en licence rentabilisé en 4 à 8 mois selon flotte.", exploitation: "Preuve : livre blanc PTV. Action : démo PTV BLOC 3." },
    { lien: "https://www.chorus-pro.gouv.fr/", titreLien: "Chorus Pro / facturation électronique", titre: "Facturation électronique obligatoire progressive 2026-2027", date: "Septembre 2025", commentaire: "Toutes les entreprises devront recevoir des factures électroniques dès septembre 2026, émission obligatoire selon taille. Impact fort sur les process facturation exploitation.", exploitation: "Preuve : décret + guides DGFiP. Action : atelier facturation numérique BLOC 3." },
  ],
};

// ---------------------------------------------------------------------------
// Exercices par BLOC (3 BLOCS × 5 QCM + 1 exercice pratique)
// Réutilise le format PaieModuleExercises pour compatibilité avec les générateurs.
// ---------------------------------------------------------------------------
const mq = (question: string, options: string[], correctIndex: number) => ({ question, options, correctIndex });

export const GOTRM_MODULE_EXERCISES: PaieModuleExercises[] = [
  {
    moduleTitre: "BLOC 1 / CCP1 — Concevoir et piloter des prestations de transport",
    qcm: [
      mq("Le PRK d'un semi-remorque 40 t roulant 90 000 km/an se situe généralement autour de :", ["0,80 €", "1,20 €", "1,65 €", "3 €"], 2),
      mq("Le règlement (CE) 561/2006 fixe la conduite journalière maximale à :", ["8 h", "9 h (10 h max 2×/sem)", "11 h", "13 h"], 1),
      mq("La pause obligatoire après 4 h 30 est de :", ["15 min", "30 min", "45 min", "1 h"], 2),
      mq("Le contrôle URSSAF vigilance L8222-1 d'un sous-traitant doit être renouvelé :", ["Jamais", "Tous les 6 mois", "Tous les 5 ans", "Une seule fois avant le 1er contrat"], 1),
      mq("La réserve d'un dommage non apparent à la livraison doit être notifiée par LRAR sous :", ["24 h", "48 h", "7 jours", "1 mois"], 2),
    ],
    exercice: {
      titre: "Étude tarifaire complète — Paris → Lyon 460 km simple",
      consigne: "Construisez le PRK de votre ensemble semi-bâchée et proposez le tarif HT/TTC pour un aller Paris-Lyon 460 km, retour à vide, marge 10 %, avec indexation gazole.",
      reponseAttendue: "PRK 1,67 €/km. Base 460 × 1,67 = 768 €. Coefficient retour vide 1,5 → 1 152 €. Marge 10 % → 1 270 € HT. TVA 20 % → 1 524 € TTC. Indexation gazole formule CNR longue distance appliquée mensuellement (a = 0,26 × variation indice). Validité offre 15 j. Conditions paiement 30 j fin de mois LME.",
      points: 5,
    },
  },
  {
    moduleTitre: "BLOC 2 / CCP2 — Piloter les trafics réguliers sous sous-traitance",
    qcm: [
      mq("Le contrat-type sous-traitance transport applicable à défaut d'écrit est le décret :", ["2010-1113", "2017-1740", "2020-604", "Aucun"], 1),
      mq("Le plafond CMR pour une marchandise avariée est de :", ["1 DTS/kg", "8,33 DTS/kg", "20 €/kg", "Illimité"], 1),
      mq("En messagerie, un taux de remplissage cible pour être rentable est :", [">50 %", ">65 %", ">85 %", ">99 %"], 2),
      mq("La géolocalisation temps réel de type Shippeo apporte principalement :", ["Une réduction de la TVA", "Une visibilité client et un ETA prédictif", "Une exonération de RSE", "Un remplacement du chronotachygraphe"], 1),
      mq("Le service après-vente vise un délai moyen de traitement d'un litige :", ["<3 j", "<15 j", "<3 mois", "<1 an"], 1),
    ],
    exercice: {
      titre: "Litige CMR — marchandise avariée",
      consigne: "Un destinataire signe le CMR avec réserve « 2 palettes filmées, cartons écrasés ». Marchandise = pièces auto, 480 kg concernés, valeur facture 8 500 €. Détaillez le traitement du dossier de A à Z.",
      reponseAttendue: "1) Réserve apparente sur CMR = recevable sans LRAR. 2) Conducteur prend photos, remonte info < 2 h. 3) Ouverture dossier, AR client < 48 h. 4) Devis / expertise. 5) Indemnisation CMR plafond 8,33 DTS/kg × 480 = ~4 800 €. Sauf déclaration valeur supérieure préalable payée → indemnisation jusqu'à 8 500 €. 6) Déclaration assureur marchandises. 7) Transaction amiable + geste commercial. 8) Clôture < 15 j, mise à jour tableau litiges.",
      points: 5,
    },
  },
  {
    moduleTitre: "BLOC 3 / CCP3 — Optimiser l'ensemble des moyens",
    qcm: [
      mq("Un taux de retour à vide cible en TRM se situe en dessous de :", ["5 %", "15 %", "30 %", "50 %"], 1),
      mq("OTIF signifie :", ["On Time In Full", "Optimisation Transport International France", "Ordre de Transport Interne Fixe", "Outil Technique Info Flotte"], 0),
      mq("La roue de Deming (PDCA) signifie :", ["Plan-Do-Check-Act", "Priorité-Décision-Contrôle-Application", "Planification-Devis-Contrat-Achat", "Aucune"], 0),
      mq("Une consommation cible d'un semi-remorque bâchée 40 t est de :", ["<20 L/100", "<30 L/100", "<45 L/100", "<60 L/100"], 1),
      mq("La MSP du titre TP-01329 dure au total :", ["2 h", "5 h", "10 h sur 2 jours", "35 h"], 2),
    ],
    exercice: {
      titre: "Tableau de bord — plan d'actions priorisé",
      consigne: "Analysez 5 KPI (OTIF 92 %, litiges 1,8 %, retour vide 24 %, DSO 71 j, marge 6,8 %) et proposez un plan d'actions priorisé sur 90 jours avec impact chiffré attendu.",
      reponseAttendue: "P1 DSO : audit + relances J+7/+15/+30 + escompte 1 % à 10 j → -15 j en 2 mois (impact trésorerie +80 k€). P2 Retour vide : B2Pweb + brief conducteurs → -6 pts en 3 mois (+40 k€/an marge). P3 OTIF/litiges : Pareto causes, plans marche buffered, formation manutention → OTIF +4 pts. P4 Marge : renégociation top 5 clients avec indexation gazole. P5 Réunion mensuelle direction, points hebdo pilotage.",
      points: 5,
    },
  },
];

// ---------------------------------------------------------------------------
// Seeder — hydrate les caches pour les DEUX titres GOTRM
// ---------------------------------------------------------------------------
export function seedGOTRMAICaches(): void {
  TITLES.forEach((intitule) => {
    const f = { intitule } as any;
    setCachedContentPack(f, GOTRM_CONTENT_PACK);
    setCachedEvalPack(f, GOTRM_EVAL_PACK);
    setCachedVeillePack(f, GOTRM_VEILLE_PACK);
  });
}
