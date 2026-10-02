/**
 * Support de cours — Indicateur 19
 * Bilan de compétences « Manager » : ressources remises au bénéficiaire pour évaluer
 * et développer ses compétences managériales (10 familles de compétences).
 *
 * Contenu complet : cadre du bilan, référentiel, évaluation des besoins (trame + réponses
 * du cas fil rouge), test de positionnement corrigé, apports par compétence,
 * 13 exercices et leurs corrigés, registre de veille, lexique.
 */
import type { BdcDocDef } from "./bdcTemplatesBC";
import { fmtDateFR } from "./bdcModel";
import { CHAPITRES_MANAGER_EXERCICES, SOMMAIRE_MANAGER_EXERCICES } from "./bdcSupportCoursManagerExercices";

const PB = `\n<div style="page-break-after:always"></div>\n`;

const T = (rows: string[][], head: string[]) =>
  [`| ${head.join(" | ")} |`, `|${head.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");

/** Les dix familles de compétences évaluées dans un bilan orienté management. */
export const COMPETENCES_MANAGER: { code: string; nom: string; observe: string; indicateurs: string; outil: string }[] = [
  { code: "C1", nom: "Compétences techniques et métier", observe: "Maîtrise des outils, des processus et du secteur qui fonde la crédibilité auprès de l'équipe", indicateurs: "Capacité à expliquer un processus, à arbitrer une question technique, à former un nouvel arrivant", outil: "Portefeuille de compétences, récit STAR" },
  { code: "C2", nom: "Compétences transversales", observe: "Analyse, organisation du temps, polyvalence, priorisation, adaptation", indicateurs: "Hiérarchisation des urgences, tenue des délais, recul face aux imprévus", outil: "Exercice de priorisation (matrice d'Eisenhower)" },
  { code: "C3", nom: "Gestion de projet", observe: "Planifier, suivre, ajuster et conduire un projet jusqu'à son terme", indicateurs: "Objectifs formulés, jalons posés, risques anticipés, bilan de fin de projet", outil: "Étude de cas projet, rétroplanning" },
  { code: "C4", nom: "Compétences comportementales", observe: "Écoute, empathie, motivation, communication positive, intelligence émotionnelle", indicateurs: "Reformulation, gestion de ses émotions, qualité du feedback donné", outil: "Test de personnalité, mise en situation d'entretien" },
  { code: "C5", nom: "Management d'équipe", observe: "Répartir les rôles, faire grandir les collaborateurs, prévenir les conflits", indicateurs: "Délégation adaptée au niveau d'autonomie, entretiens conduits, climat d'équipe", outil: "Diagnostic de leadership situationnel" },
  { code: "C6", nom: "Gestion du changement", observe: "Accompagner l'équipe dans une transformation, communiquer, tenir dans la durée", indicateurs: "Résistances repérées et traitées, plan de communication, résilience personnelle", outil: "Cas de conduite du changement" },
  { code: "C7", nom: "Culture d'entreprise", observe: "Porter les valeurs, créer un climat bienveillant, reconnaître le travail", indicateurs: "Rituels d'équipe, signes de reconnaissance, cohérence discours / actes", outil: "Questionnaire de valeurs" },
  { code: "C8", nom: "Compétences stratégiques", observe: "Anticiper, traduire la stratégie en objectifs, repérer les leviers de performance", indicateurs: "Objectifs reliés à la stratégie, indicateurs pertinents, vision à 1-3 ans", outil: "Analyse SWOT de son service" },
  { code: "C9", nom: "Innovation et agilité", observe: "Ajuster les méthodes, encourager l'expérimentation, améliorer en continu", indicateurs: "Idées testées, rétrospectives tenues, erreurs exploitées", outil: "Exercice PDCA / rétrospective" },
  { code: "C10", nom: "Diversité et inclusion", observe: "Équité de traitement, tolérance, prévention des discriminations", indicateurs: "Critères objectifs de décision, attention aux biais, aménagements proposés", outil: "Analyse d'une grille de recrutement" },
];

const ch1 = `
## Chapitre 1 — Le bilan de compétences orienté management

### 1.1 Pourquoi un bilan centré sur le management

Le passage à l'encadrement est l'une des transitions professionnelles les plus exigeantes : l'expert qui
réussissait par sa technicité doit désormais réussir **par les autres**. Le bilan de compétences permet de
vérifier, avant ou pendant cette transition, trois points :

1. **Le vouloir** : l'envie réelle d'encadrer (et non une promotion subie ou la seule recherche de statut).
2. **Le savoir et le savoir-faire** : les compétences managériales déjà acquises, souvent sans le savoir.
3. **Le pouvoir** : les conditions concrètes (organisation, temps, soutien de la hiérarchie, vie personnelle).

### 1.2 Le cadre légal

Le bilan de compétences est défini par le Code du travail (art. L6313-1 et L6313-4). Il a pour objet de
permettre au bénéficiaire d'analyser ses compétences professionnelles et personnelles, ses aptitudes et ses
motivations afin de définir un projet professionnel et, le cas échéant, un projet de formation.

${T(
  [
    ["Phase préliminaire", "Analyser la demande et le besoin, choisir le format, définir les modalités", "R6313-4"],
    ["Phase d'investigation", "Construire ou confirmer le projet, en vérifier la pertinence, élaborer des alternatives", "R6313-4"],
    ["Phase de conclusion", "S'approprier les résultats, recenser les conditions de réussite, prévoir les étapes", "R6313-4"],
    ["Consentement", "Le bilan ne peut être réalisé qu'avec le consentement du bénéficiaire ; un refus n'est pas une faute", "L6313-4"],
    ["Confidentialité", "Le document de synthèse est la propriété du bénéficiaire ; il ne peut être communiqué à un tiers qu'avec son accord", "R6313-7"],
  ],
  ["Élément", "Contenu", "Référence"],
)}

### 1.3 Le déroulement retenu pour ce bilan

| Étape | Contenu | Durée indicative |
|---|---|---|
| Entretien préalable | Information, vérification de l'adéquation du bilan à la demande | 1 h (gratuit, hors bilan) |
| Phase 1 — préliminaire | Analyse du besoin, test de positionnement managérial, objectifs | 3 h |
| Phase 2 — investigation | Portefeuille de compétences, 10 familles de compétences, tests, enquête métier | 14 h (dont travail personnel) |
| Phase 3 — conclusion | Projet, plan de développement, document de synthèse | 4 h |
| Entretien de suivi à 6 mois | Point sur la mise en œuvre du plan d'action | 1 h (inclus, hors durée) |

> **Repère** : la formule orientée potentiel managérial s'étend en général sur une vingtaine d'heures,
> réparties sur 6 à 12 semaines pour laisser le temps du travail personnel et de l'enquête métier.
`;

const ch2 = `
## Chapitre 2 — Le référentiel des dix compétences du manager

Le bilan évalue le manager sur dix familles de compétences. Aucune n'est « innée » : chacune s'observe dans
des situations concrètes et peut se développer. Le tableau ci-dessous sert de fil conducteur à toute la
phase d'investigation.

${T(
  COMPETENCES_MANAGER.map((c) => [c.code, `**${c.nom}**`, c.observe, c.indicateurs, c.outil]),
  ["Code", "Compétence", "Ce que l'on observe", "Indicateurs de maîtrise", "Outil du bilan"],
)}

### 2.1 Lecture du référentiel

- **C1 à C3** relèvent du **pilotage de l'activité** : ce que le manager fait produire et comment il l'organise.
- **C4, C5 et C7** relèvent du **pilotage des personnes** : comment il fait travailler ensemble et fait grandir.
- **C6, C8 et C9** relèvent de la **projection** : comment il anticipe et fait évoluer le collectif.
- **C10** est **transversale** : l'équité conditionne la légitimité de toutes les autres.

### 2.2 Les quatre niveaux de maîtrise utilisés

${T(
  [
    ["1 — Découverte", "Je connais la notion, je ne l'ai pas encore pratiquée", "Ex. : je sais ce qu'est un entretien professionnel"],
    ["2 — Application guidée", "Je l'ai pratiquée avec appui ou dans un cadre simple", "Ex. : j'ai conduit un entretien avec une trame fournie"],
    ["3 — Maîtrise", "Je la pratique seul(e) et je l'adapte aux situations", "Ex. : j'adapte l'entretien au profil du collaborateur"],
    ["4 — Expertise", "Je la transmets et je l'améliore", "Ex. : j'ai formé d'autres managers à l'entretien"],
  ],
  ["Niveau", "Définition", "Illustration"],
)}
`;

const ch3 = `
## Chapitre 3 — Évaluation des besoins (phase préliminaire)

L'analyse du besoin se fait **en entretien**, à partir de la trame ci-dessous. Elle n'évalue pas des acquis :
elle clarifie la demande, le contexte et les attentes, et permet de vérifier que le bilan est la bonne réponse.

### 3.1 Trame d'entretien d'analyse du besoin

1. Quelle est votre situation professionnelle actuelle (poste, ancienneté, périmètre, encadrement éventuel) ?
2. Qu'est-ce qui vous amène à demander un bilan de compétences maintenant ?
3. Quelle place le management occupe-t-il dans votre projet (prise de poste, évolution, remise en question, sortie de l'encadrement) ?
4. Avez-vous déjà encadré, même de façon informelle (tutorat, référent, chef de projet, intérim) ?
5. Quelles situations managériales vous paraissent les plus faciles ? Les plus difficiles ?
6. Quelles sont vos attentes concrètes à la fin du bilan ?
7. Quelles contraintes devons-nous prendre en compte (temps, santé, mobilité, vie familiale, handicap) ?
8. Comment le bilan est-il financé et votre employeur est-il informé ?
9. De quelles modalités avez-vous besoin (distanciel, horaires, rythme, aménagements) ?
10. Sur une échelle de 1 à 10, quelle est votre motivation à vous engager dans ce bilan ?

### 3.2 Réponses du cas fil rouge

> **Cas pédagogique fictif** — « Mme L. », 37 ans, technicienne support informatique depuis 9 ans, désignée
> référente d'une équipe de 5 personnes depuis 8 mois sans titre officiel. Ce cas sert d'exemple de
> remplissage ; il ne décrit aucun bénéficiaire réel.

${T(
  [
    ["1. Situation", "Technicienne support niveau 2, 9 ans d'ancienneté, référente de fait d'une équipe de 5 depuis 8 mois (planning, montée en compétence des nouveaux, point hebdomadaire)."],
    ["2. Déclencheur", "Un poste de responsable d'équipe va s'ouvrir ; ma hiérarchie m'encourage à candidater mais je ne sais pas si j'en ai envie ni si j'en suis capable."],
    ["3. Place du management", "Central : je veux savoir si je deviens manager ou si je reste experte technique."],
    ["4. Expérience d'encadrement", "Informelle : tutorat de 3 nouveaux arrivants, animation du point hebdomadaire, gestion du planning des astreintes."],
    ["5. Facile / difficile", "Facile : expliquer, organiser, dépanner. Difficile : dire non, recadrer un collègue plus ancien, arbitrer entre deux personnes."],
    ["6. Attentes", "Une décision argumentée (candidater ou non), une vision claire de mes points forts et de mes manques, un plan de formation si je me lance."],
    ["7. Contraintes", "Deux enfants en bas âge : pas de séance après 18 h. Pas de contrainte de santé déclarée."],
    ["8. Financement", "CPF, à titre personnel ; l'employeur n'est pas informé à ce stade (choix de la bénéficiaire)."],
    ["9. Modalités", "Distanciel en visioconférence, séances de 2 h le mardi ou le jeudi entre 9 h et 12 h."],
    ["10. Motivation", "8/10."],
  ],
  ["Question", "Réponse recueillie"],
)}

### 3.3 Analyse du besoin par le consultant (exemple rédigé)

**Demande explicite** : décider de candidater ou non à un poste de responsable d'équipe.

**Besoin sous-jacent** : sortir d'une situation de « manager sans le titre » qui crée de l'inconfort,
objectiver ses compétences managériales et identifier ses zones de difficulté (assertivité, recadrage).

**Adéquation au bilan** : oui — la demande porte sur un projet professionnel et ses conditions de réussite ;
elle ne relève ni d'une formation seule, ni d'un coaching de performance.

**Objectifs du bilan validés avec la bénéficiaire** :

1. Évaluer ses compétences sur les dix familles du référentiel.
2. Confronter le poste de responsable d'équipe à la réalité (enquête auprès de deux managers).
3. Construire un projet principal et une alternative (filière d'expertise).
4. Établir un plan de développement à 6 mois.

**Points d'attention** : confidentialité vis-à-vis de l'employeur ; créneaux du matin uniquement.
`;

const ch4 = `
## Chapitre 4 — Test de positionnement managérial

Vingt situations, une seule réponse par question. Le test ne note pas la personne : il repère les
réflexes managériaux et sert de point de départ à l'entretien. La grille de correction suit.

**1. Un collaborateur expérimenté et motivé découvre une tâche nouvelle pour lui. Vous :**  
A. le laissez faire seul · B. lui expliquez précisément comment faire et suivez de près · C. lui demandez comment il compte s'y prendre et validez ensemble · D. confiez la tâche à quelqu'un d'autre

**2. Un objectif SMART est un objectif :**  
A. ambitieux et motivant · B. spécifique, mesurable, atteignable, réaliste, temporellement défini · C. fixé par la direction · D. simple et rapide

**3. Deux collègues s'opposent sur une méthode de travail devant l'équipe. Votre premier réflexe :**  
A. trancher immédiatement · B. les recevoir ensemble, à part, pour faire exprimer les faits et les besoins · C. attendre que cela passe · D. en parler à la direction

**4. Un collaborateur arrive en retard pour la troisième fois en deux semaines. Vous :**  
A. ne dites rien pour préserver le climat · B. faites une remarque en réunion · C. organisez un entretien individuel factuel · D. envoyez un avertissement écrit

**5. L'entretien professionnel porte principalement sur :**  
A. l'évaluation des résultats annuels · B. les perspectives d'évolution, notamment en qualifications et en emploi · C. la rémunération · D. la discipline

**6. Face à un changement imposé que vous désapprouvez, vous :**  
A. le critiquez devant l'équipe · B. faites remonter vos réserves à votre hiérarchie et portez la décision une fois prise · C. ne l'appliquez pas · D. laissez l'équipe s'organiser

**7. Déléguer une tâche, c'est :**  
A. s'en débarrasser · B. confier un résultat attendu, les moyens et le niveau de contrôle · C. la donner au plus disponible · D. la faire refaire ensuite

**8. Un collaborateur vous confie qu'il subit des propos humiliants d'un collègue. Vous :**  
A. lui conseillez de régler cela entre eux · B. prenez la situation au sérieux, recueillez les faits et alertez selon la procédure interne · C. attendez d'avoir d'autres signalements · D. en parlez en réunion d'équipe

**9. Le feedback le plus utile est :**  
A. général et bienveillant · B. factuel, centré sur un comportement observable et son impact · C. donné une fois par an · D. donné par écrit uniquement

**10. Un indicateur de pilotage pertinent est :**  
A. le plus grand nombre possible d'indicateurs · B. un indicateur relié à un objectif, mesurable et suivi régulièrement · C. un indicateur choisi par chaque collaborateur · D. un indicateur financier uniquement

**11. Votre équipe a commis une erreur coûteuse. Vous :**  
A. cherchez le responsable · B. analysez les causes avec l'équipe et mettez en place une action corrective · C. cachez l'erreur · D. reprenez vous-même le travail

**12. Pour recruter, vous privilégiez :**  
A. le feeling de l'entretien · B. une grille de critères définis à l'avance et appliqués à tous les candidats · C. les recommandations · D. les candidats qui vous ressemblent

**13. La matrice d'Eisenhower classe les tâches selon :**  
A. leur coût · B. leur urgence et leur importance · C. leur durée · D. leur auteur

**14. Un collaborateur peu motivé mais compétent a besoin surtout :**  
A. de consignes détaillées · B. d'écoute, d'encouragement et de participation aux décisions · C. de contrôle renforcé · D. d'être laissé seul

**15. La courbe du changement décrit en général successivement :**  
A. adhésion puis refus · B. choc, déni, résistance, exploration, engagement · C. enthousiasme constant · D. indifférence

**16. Vous devez annoncer une réorganisation. Vous :**  
A. envoyez un courriel · B. l'annoncez en réunion en expliquant le pourquoi, puis recevez chacun individuellement · C. laissez la direction l'annoncer · D. attendez les questions

**17. Une rétrospective d'équipe sert à :**  
A. désigner les fautifs · B. identifier ce qui a fonctionné, ce qui doit changer, et décider d'actions · C. présenter les résultats à la direction · D. remplacer l'entretien annuel

**18. Le manager a, envers la santé de son équipe :**  
A. aucune responsabilité · B. un rôle de prévention et d'alerte, en relais de l'obligation de sécurité de l'employeur · C. une responsabilité uniquement si un accident survient · D. un rôle réservé aux RH

**19. Pour fixer une priorité entre deux demandes urgentes de deux directeurs, vous :**  
A. traitez celle du plus haut placé · B. clarifiez les enjeux et faites arbitrer en transparence si nécessaire · C. faites les deux à moitié · D. refusez les deux

**20. Ce qui fonde le plus durablement la légitimité d'un manager :**  
A. son titre · B. la cohérence entre ce qu'il dit et ce qu'il fait · C. son ancienneté · D. sa proximité amicale avec l'équipe

### 4.1 Grille de correction

${T(
  [
    ["1", "C", "C5", "Personne compétente sur un sujet nouveau : on co-construit, on ne laisse pas seul."],
    ["2", "B", "C3", "Définition de l'acronyme SMART."],
    ["3", "B", "C4/C5", "On traite le désaccord à part, on sépare faits, opinions et besoins."],
    ["4", "C", "C5", "Entretien individuel factuel : ni silence, ni humiliation publique, ni sanction d'emblée."],
    ["5", "B", "Cadre légal", "Code du travail, art. L6315-1 : l'entretien professionnel n'est pas l'évaluation."],
    ["6", "B", "C6", "Loyauté critique : remonter ses réserves, puis porter la décision."],
    ["7", "B", "C5", "La délégation porte sur un résultat, avec des moyens et un niveau de suivi."],
    ["8", "B", "Cadre légal / C10", "Harcèlement moral (art. L1152-1) et obligation de sécurité (art. L4121-1) : on agit."],
    ["9", "B", "C4", "Feedback factuel : fait, impact, attente."],
    ["10", "B", "C8", "Peu d'indicateurs, reliés aux objectifs, suivis régulièrement."],
    ["11", "B", "C9", "Culture de l'erreur apprenante : causes puis actions correctives."],
    ["12", "B", "C10", "Critères objectifs identiques pour tous : prévention des discriminations (art. L1132-1)."],
    ["13", "B", "C2", "Urgent / important."],
    ["14", "B", "C5", "Style participatif pour un collaborateur compétent peu motivé."],
    ["15", "B", "C6", "Courbe du changement inspirée des travaux d'E. Kübler-Ross."],
    ["16", "B", "C6", "Annonce collective expliquée puis échanges individuels."],
    ["17", "B", "C9", "Amélioration continue, sans recherche de coupable."],
    ["18", "B", "Cadre légal", "Le manager relaie l'obligation de sécurité de l'employeur (art. L4121-1)."],
    ["19", "B", "C2/C8", "Clarifier les enjeux, faire arbitrer de façon transparente."],
    ["20", "B", "C7", "Exemplarité et cohérence."],
  ],
  ["Question", "Réponse", "Compétence", "Justification"],
)}

### 4.2 Interprétation

${T(
  [
    ["17 à 20 bonnes réponses", "Réflexes managériaux solides ; le bilan se concentre sur la posture, les valeurs et le projet."],
    ["12 à 16", "Bases présentes ; repérer les familles où se concentrent les erreurs et les travailler en investigation."],
    ["7 à 11", "Réflexes encore experts plutôt que managériaux ; prévoir des apports et une enquête métier approfondie."],
    ["0 à 6", "Découverte du rôle ; vérifier la motivation réelle et envisager une montée progressive (référent, tuteur)."],
  ],
  ["Score", "Lecture"],
)}

**Résultat du cas fil rouge** : 15/20. Erreurs aux questions 3, 4, 8, 12 et 19 → zones de travail : régulation
des tensions, recadrage, cadre légal, arbitrage et objectivation des décisions.
`;

const ch5 = `
## Chapitre 5 — Auto-évaluation des dix compétences

Coter chaque compétence de 1 à 4 (chapitre 2), puis citer **une situation vécue** qui justifie la note.
Le consultant confronte ensuite l'auto-évaluation aux preuves (récits STAR, enquête, tests).

${T(
  COMPETENCES_MANAGER.map((c) => [c.code, c.nom, "1 · 2 · 3 · 4", "…………………………"]),
  ["Code", "Compétence", "Niveau", "Situation qui le prouve"],
)}

### 5.1 Exemple rempli (cas fil rouge)

${T(
  [
    ["C1", "4", "Référente technique de l'équipe ; rédaction de 12 procédures de résolution d'incidents."],
    ["C2", "3", "Gestion du planning d'astreinte de 5 personnes sans trou de couverture depuis 8 mois."],
    ["C3", "2", "Migration d'un outil de tickets menée avec appui de la cheffe de service."],
    ["C4", "3", "Écoute reconnue ; difficulté à exprimer un désaccord (évitement)."],
    ["C5", "2", "Tutorat de 3 arrivants réussi ; jamais conduit d'entretien de recadrage."],
    ["C6", "2", "A relayé le changement d'outil ; résistances d'un collègue non traitées."],
    ["C7", "3", "A instauré un point hebdomadaire et un tour de « réussites de la semaine »."],
    ["C8", "1", "Ne connaît pas les objectifs annuels du service au-delà de son équipe."],
    ["C9", "3", "A proposé et testé une base de connaissances partagée."],
    ["C10", "2", "Sensible au sujet, n'a jamais utilisé de grille objective de décision."],
  ],
  ["Code", "Niveau", "Situation"],
)}

**Lecture du consultant** : profil « pilotage des personnes » prometteur (C4, C7, C9), ancré dans une forte
légitimité technique (C1). Les écarts portent sur l'assertivité (C4/C5), la vision stratégique (C8) et le
cadre légal. Ces écarts sont **réductibles par la formation et la pratique** : ils ne contredisent pas le projet.
`;

const ch6 = `
## Chapitre 6 — Manager l'équipe : styles, délégation, entretiens

### 6.1 Le leadership situationnel

Le style de management efficace dépend du **niveau d'autonomie** du collaborateur sur une tâche donnée,
c'est-à-dire de la combinaison de sa **compétence** et de sa **motivation** (modèle de P. Hersey et K. Blanchard).

${T(
  [
    ["Autonomie 1", "Peu compétent, motivé (débutant enthousiaste)", "Directif", "Expliquer quoi, comment, quand ; contrôler souvent"],
    ["Autonomie 2", "Peu compétent, démotivé", "Persuasif", "Expliquer le pourquoi, encourager, rester présent"],
    ["Autonomie 3", "Compétent, motivation variable", "Participatif", "Écouter, associer aux décisions, valoriser"],
    ["Autonomie 4", "Compétent et motivé", "Délégatif", "Confier le résultat, faire des points d'étape espacés"],
  ],
  ["Niveau", "Profil", "Style adapté", "Comportements du manager"],
)}

> Le même collaborateur peut être en autonomie 4 sur une tâche et 1 sur une autre : on diagnostique **par tâche**.

### 6.2 Déléguer en cinq points

1. **Quoi** : le résultat attendu, décrit de façon vérifiable.
2. **Pourquoi** : l'enjeu, pour donner du sens.
3. **Avec quoi** : moyens, budget, accès, interlocuteurs.
4. **Jusqu'où** : marges de décision (ce que la personne décide seule, ce qu'elle soumet).
5. **Quand et comment on se revoit** : points d'étape proportionnés au niveau d'autonomie.

### 6.3 Les entretiens du manager

${T(
  [
    ["Entretien annuel d'évaluation", "Bilan des objectifs de l'année, fixation des objectifs suivants", "Pratique d'entreprise (non obligatoire légalement)"],
    ["Entretien professionnel", "Perspectives d'évolution, notamment en qualifications et en emploi ; ne porte pas sur l'évaluation du travail", "Obligatoire — art. L6315-1 (vérifier la périodicité en vigueur)"],
    ["Entretien de recadrage", "Écart entre attendu et réalisé, rappel de la règle, engagement", "Pratique managériale"],
    ["Entretien de retour (absence longue)", "Reprise, adaptation du poste", "Pratique et, pour certaines absences, obligation d'entretien professionnel"],
  ],
  ["Entretien", "Objet", "Cadre"],
)}

### 6.4 Méthode DESC pour un recadrage

- **D**écrire les faits, sans jugement : « Tu es arrivé à 9 h 40 lundi, mercredi et ce matin. »
- **E**xprimer l'impact : « Les appels de 9 h ont été pris par deux personnes au lieu de trois. »
- **S**pécifier l'attendu : « J'ai besoin que tu sois à ton poste à 9 h. Qu'est-ce qui t'en empêche ? »
- **C**onclure sur les conséquences et l'engagement : « On fait le point dans deux semaines. »
`;

const ch7 = `
## Chapitre 7 — Piloter l'activité : objectifs, priorités, projets

### 7.1 Formuler un objectif SMART

${T(
  [
    ["S — Spécifique", "Porte sur un résultat précis", "Réduire le délai de traitement des tickets de niveau 1"],
    ["M — Mesurable", "Un indicateur et une valeur cible", "Délai moyen ramené de 26 h à 18 h"],
    ["A — Atteignable", "Accessible avec les moyens donnés", "Avec la nouvelle base de connaissances"],
    ["R — Réaliste / pertinent", "Relié aux enjeux du service", "Engagement de service client à 24 h"],
    ["T — Temporellement défini", "Une échéance", "Au 31 mars"],
  ],
  ["Critère", "Signification", "Exemple"],
)}

### 7.2 Prioriser : la matrice d'Eisenhower

${T(
  [
    ["Urgent et important", "Faire soi-même, maintenant"],
    ["Important, non urgent", "Planifier (c'est là que se joue le développement de l'équipe)"],
    ["Urgent, non important", "Déléguer"],
    ["Ni urgent ni important", "Abandonner ou reporter"],
  ],
  ["Quadrant", "Décision"],
)}

### 7.3 Conduire un projet

- **Cadrer** : objectif, périmètre, livrables, budget, parties prenantes.
- **Planifier** : découpage en tâches, jalons, rétroplanning, matrice des rôles (qui réalise, qui valide, qui est consulté, qui est informé).
- **Anticiper les risques** : probabilité × impact, actions préventives.
- **Suivre** : points d'avancement courts, indicateurs d'avancement, gestion des écarts.
- **Clôturer** : livraison, bilan de projet, capitalisation des enseignements.

### 7.4 Le tableau de bord du manager

Cinq à huit indicateurs suffisent : **production** (volumes, délais), **qualité** (taux de conformité,
réclamations), **ressources** (absentéisme, charge), **climat** (baromètre, turn-over), **développement**
(entretiens réalisés, formations suivies). Chaque indicateur a une cible, une fréquence et un responsable.
`;

const ch8 = `
## Chapitre 8 — Communiquer, réguler les tensions et les conflits

### 8.1 L'écoute active

Questions ouvertes, reformulation, silence, synthèse. La reformulation vérifie la compréhension et montre
la considération : « Si je comprends bien, ce qui te pèse, c'est moins la charge que le manque de visibilité ? »

### 8.2 Le feedback

Un feedback utile est **factuel** (un comportement observé), **situé** (quand, où), **relié à un impact** et
**tourné vers l'avenir**. Il est aussi fréquent pour reconnaître que pour corriger.

### 8.3 Les cinq modes de gestion des conflits (modèle de Thomas-Kilmann)

${T(
  [
    ["Compétition", "Fort pour soi, faible pour l'autre", "Urgence, sécurité, règle non négociable"],
    ["Collaboration", "Fort pour soi et pour l'autre", "Enjeu important des deux côtés, temps disponible"],
    ["Compromis", "Moyen / moyen", "Solution provisoire, enjeux équilibrés"],
    ["Évitement", "Faible / faible", "Sujet mineur, besoin de laisser retomber la tension"],
    ["Accommodation", "Faible pour soi, fort pour l'autre", "Préserver la relation, on s'est trompé"],
  ],
  ["Mode", "Orientation", "Quand l'utiliser"],
)}

### 8.4 Médiation managériale en quatre temps

1. Recevoir chaque partie séparément : faits, ressentis, besoins.
2. Réunir les parties avec des règles (écoute, pas d'interruption, respect).
3. Faire émerger des solutions proposées par les intéressés.
4. Formaliser l'accord et fixer un point de suivi. Si la situation relève d'un harcèlement ou d'une
   discrimination, la médiation ne suffit pas : on applique la procédure d'alerte interne.
`;

const ch9 = `
## Chapitre 9 — Conduire le changement

### 9.1 Les réactions au changement

Le changement imposé suit souvent une courbe : **choc**, **déni**, **résistance** (colère, marchandage),
**exploration**, **engagement**. Le rôle du manager change à chaque étape : informer, écouter, rassurer,
impliquer, valoriser.

### 9.2 Les huit étapes de J. Kotter, version manager de proximité

${T(
  [
    ["1", "Créer le sentiment d'urgence", "Expliquer pourquoi on ne peut pas rester comme avant"],
    ["2", "Former une coalition", "S'appuyer sur 1 ou 2 relais respectés dans l'équipe"],
    ["3", "Construire une vision", "Décrire concrètement la situation cible"],
    ["4", "Communiquer la vision", "Réunion, échanges individuels, foire aux questions"],
    ["5", "Lever les obstacles", "Formation, outils, temps dégagé"],
    ["6", "Obtenir des victoires rapides", "Montrer un premier résultat en quelques semaines"],
    ["7", "Consolider", "Ajuster, ne pas crier victoire trop tôt"],
    ["8", "Ancrer dans la culture", "Intégrer aux procédures, aux rituels, aux entretiens"],
  ],
  ["Étape", "Principe", "Traduction concrète"],
)}

### 9.3 Les résistances : les comprendre avant de les traiter

Une résistance est une information : peur de perdre une compétence, un statut, un confort, une relation ;
manque d'information ; désaccord sur le fond. On écoute, on distingue ce qui est négociable (le comment)
de ce qui ne l'est pas (le quoi), on implique les résistants dans la recherche de solutions.
`;

const ch10 = `
## Chapitre 10 — Le cadre légal de l'encadrement

${T(
  [
    ["Obligation de sécurité", "L'employeur prend les mesures nécessaires pour assurer la sécurité et protéger la santé physique et mentale des travailleurs ; le manager en est le relais de terrain", "Art. L4121-1 et L4121-2"],
    ["Harcèlement moral", "Aucun salarié ne doit subir des agissements répétés ayant pour objet ou pour effet une dégradation de ses conditions de travail", "Art. L1152-1"],
    ["Harcèlement sexuel et agissements sexistes", "Interdits ; l'employeur doit prévenir, faire cesser et sanctionner", "Art. L1153-1, L1142-2-1"],
    ["Non-discrimination", "Aucune décision (recrutement, formation, promotion, rémunération) fondée sur un critère prohibé", "Art. L1132-1"],
    ["Entretien professionnel", "Entretien consacré aux perspectives d'évolution professionnelle ; dispositif réformé — vérifier la rédaction en vigueur", "Art. L6315-1"],
    ["Droit à la déconnexion", "Modalités définies par accord ou charte dans les entreprises concernées", "Art. L2242-17"],
    ["Pouvoir disciplinaire", "Procédure encadrée ; le manager signale et documente, la sanction relève de l'employeur", "Art. L1331-1 et suivants"],
  ],
  ["Thème", "Ce qu'il faut retenir", "Code du travail"],
)}

> **Réflexe** : face à un signalement de harcèlement, de violence ou de discrimination, le manager ne
> « règle pas cela entre eux » : il prend au sérieux, protège, recueille les faits et alerte selon la
> procédure de l'entreprise (RH, référent harcèlement, CSE).

### 10.1 Les risques psychosociaux

Six familles de facteurs sont généralement retenues : intensité et temps de travail, exigences
émotionnelles, manque d'autonomie, rapports sociaux dégradés, conflits de valeurs, insécurité de la
situation de travail. Le manager agit sur l'organisation (charge, clarté des rôles, reconnaissance) bien
plus que sur les personnes.
`;

const ch11 = `
## Chapitre 11 — Culture d'entreprise, inclusion et qualité de vie au travail

### 11.1 Porter la culture

Le manager traduit les valeurs en comportements observables : comment on accueille un nouvel arrivant,
comment on traite une erreur, comment on prend une décision. La **reconnaissance** est quotidienne :
remercier précisément, rendre visible le travail de l'équipe auprès de la direction, confier des
responsabilités.

### 11.2 Diversité et inclusion : décider sur des critères

- Définir les critères **avant** de rencontrer les candidats ou d'arbitrer une promotion.
- Appliquer la même grille à tous, documenter la décision.
- Repérer ses biais : effet de halo, biais de similarité, biais de confirmation, effet de première impression.
- Proposer des aménagements raisonnables (handicap, parentalité, religion dans le respect du règlement intérieur).

### 11.3 Qualité de vie et des conditions de travail

Rituels courts et utiles, charge régulée, droit à l'erreur, clarté des rôles, espaces de discussion sur
le travail. Un baromètre simple (3 questions mensuelles) permet de suivre le climat.
`;

const ch12 = `
## Chapitre 12 — Stratégie, innovation et agilité

### 12.1 Relier son équipe à la stratégie

Partir des objectifs de l'entreprise, en déduire la contribution du service, puis les objectifs de l'équipe.
L'analyse **SWOT** du service (forces, faiblesses, opportunités, menaces) aide à choisir les leviers.

### 12.2 L'amélioration continue : la roue PDCA

**Planifier** (objectif, action), **Déployer** (tester à petite échelle), **Contrôler** (mesurer l'effet),
**Ajuster** (généraliser ou corriger). Chaque cycle est court.

### 12.3 La rétrospective d'équipe

Toutes les 2 à 6 semaines, 45 minutes : ce qui a bien fonctionné, ce qui a freiné, ce que l'on essaie
la prochaine fois (une ou deux actions maximum, avec un responsable).
`;

const ch13 = `
## Chapitre 13 — Construire son projet managérial

### 13.1 Trois scénarios à comparer

${T(
  [
    ["Prendre un poste de manager", "Envie d'encadrer confirmée, compétences relationnelles présentes", "Former aux fondamentaux, se faire accompagner la première année"],
    ["Monter en responsabilité progressivement", "Envie présente, écarts importants", "Rôle de référent / tuteur / chef de projet, puis candidature"],
    ["Filière d'expertise", "Plaisir dans le contenu plus que dans l'animation", "Viser un poste d'expert, de formateur interne, d'architecte"],
  ],
  ["Scénario", "Indices favorables", "Conditions de réussite"],
)}

### 13.2 L'enquête métier

Rencontrer au moins deux managers en poste (dont un récemment promu). Préparer les questions (exercice 12),
prendre des notes, comparer les réponses à ses attentes et à son auto-évaluation.

### 13.3 Financer le bilan et la suite

${T(
  [
    ["Compte personnel de formation (CPF)", "Le bilan est éligible ; le bénéficiaire peut le mobiliser sans informer son employeur s'il a lieu hors temps de travail"],
    ["Plan de développement des compétences", "À l'initiative de l'employeur, avec le consentement du salarié ; convention tripartite"],
    ["Financement personnel", "Contrat de prestation avec le bénéficiaire, délai de rétractation"],
    ["Suite du projet", "CPF pour une formation certifiante, plan de développement, accompagnement à la prise de poste"],
  ],
  ["Financement", "Points clés"],
)}
`;

const SOMMAIRE = `
## Sommaire

1. Le bilan de compétences orienté management
2. Le référentiel des dix compétences du manager
3. Évaluation des besoins (trame et réponses du cas fil rouge)
4. Test de positionnement managérial et corrigé
5. Auto-évaluation des dix compétences
6. Manager l'équipe : styles, délégation, entretiens
7. Piloter l'activité : objectifs, priorités, projets
8. Communiquer, réguler les tensions et les conflits
9. Conduire le changement
10. Le cadre légal de l'encadrement
11. Culture d'entreprise, inclusion et qualité de vie au travail
12. Stratégie, innovation et agilité
13. Construire son projet managérial
${SOMMAIRE_MANAGER_EXERCICES}
`;

export const supportCoursManager: BdcDocDef = {
  nom: "Indicateur 19 - Support de cours Manager - compétences managériales",
  indicateur: 19,
  parBeneficiaire: false,
  build: (ctx) => {
    const { organisme: o, prestation: p } = ctx;
    const chapitres = [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10, ch11, ch12, ch13, ...CHAPITRES_MANAGER_EXERCICES];
    return [
      `# Support de cours — Bilan de compétences « Manager »\n`,
      `_Ressource pédagogique remise dans le cadre du bilan de compétences — Indicateur 19._\n`,
      `**Organisme** : ${o.raisonSociale} — SIRET ${o.siret}  `,
      `**Consultant référent** : ${p.consultant.nom}  `,
      `**Version** : 1 — ${fmtDateFR(o.dateMaj || p.dateDebut)}  `,
      `**Volume** : ${chapitres.length} chapitres — test de positionnement, 13 exercices et corrigés, registre de veille`,
      "",
      `Ce support accompagne l'évaluation et le développement des compétences managériales. Il présente le
référentiel des dix familles de compétences évaluées, les outils utilisés à chaque phase, des apports
synthétiques sur chaque compétence, des exercices corrigés et les sources de veille mobilisées. Il constitue
une ressource de travail personnel entre les séances ; les exemples de réponses portent sur un cas
pédagogique fictif et ne décrivent aucun bénéficiaire réel.`,
      SOMMAIRE,
      PB,
      chapitres.join(PB),
    ].join("\n");
  },
};
