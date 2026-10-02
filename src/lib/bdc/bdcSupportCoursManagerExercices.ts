/**
 * Support de cours Manager (suite) — chapitres 14 à 17 :
 * exercices d'application, corrigés complets, registre de veille, lexique et sources.
 */

const T = (rows: string[][], head: string[]) =>
  [`| ${head.join(" | ")} |`, `|${head.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");

const ch14 = `
## Chapitre 14 — Exercices d'application

Les exercices se font entre les séances ; ils sont repris avec le consultant. Chaque exercice indique la
compétence travaillée (référentiel du chapitre 2) et la phase du bilan où il est utilisé.

### Exercice 1 — Rendre des objectifs SMART (C3, C8 · investigation)

Reformulez en objectifs SMART :
- a) « Il faut améliorer la satisfaction client. »
- b) « L'équipe doit être plus polyvalente. »
- c) « Réduire les erreurs de saisie. »

### Exercice 2 — Diagnostiquer l'autonomie et choisir son style (C5 · investigation)

Pour chaque situation, indiquez le niveau d'autonomie (1 à 4) et le style de management adapté.
- a) Yanis, arrivé il y a 3 semaines, très enthousiaste, découvre le logiciel de facturation.
- b) Hélène, 15 ans d'ancienneté, experte, très investie, doit préparer le budget formation qu'elle a déjà préparé deux fois.
- c) Marc, compétent, mais démobilisé depuis le refus de sa demande de mutation.
- d) Inès, en poste depuis 4 mois, qui a commis deux erreurs sur les relances clients et se dit découragée.

### Exercice 3 — Préparer un recadrage avec la méthode DESC (C4, C5 · investigation)

Un technicien rend ses comptes rendus d'intervention avec 3 à 5 jours de retard depuis un mois, ce qui
bloque la facturation. Rédigez les quatre temps de l'entretien.

### Exercice 4 — Choisir un mode de gestion de conflit (C4, C5 · investigation)

Indiquez le mode le plus adapté (compétition, collaboration, compromis, évitement, accommodation) et justifiez :
- a) Un collaborateur refuse de porter ses équipements de protection.
- b) Deux collègues ne s'entendent pas sur le partage des congés d'été ; il reste 6 semaines.
- c) Une remarque agacée d'un collègue en fin de journée très chargée, sans précédent.
- d) Deux services doivent concevoir ensemble une nouvelle procédure qui engage leurs deux métiers.

### Exercice 5 — Prioriser et déléguer (C2, C5 · investigation)

Classez ces 8 tâches dans la matrice d'Eisenhower et indiquez ce que vous faites de chacune :
- Tâche 1 : panne bloquante chez un client important.
- Tâche 2 : préparer les entretiens professionnels du trimestre.
- Tâche 3 : répondre à un sondage interne facultatif.
- Tâche 4 : valider les congés de la semaine prochaine.
- Tâche 5 : mettre à jour la procédure d'accueil des nouveaux.
- Tâche 6 : trier d'anciens courriels.
- Tâche 7 : envoyer le reporting hebdomadaire demandé pour ce soir.
- Tâche 8 : former un collaborateur à une tâche que vous faites seul(e).

### Exercice 6 — Conduire un changement (C6 · investigation)

Votre équipe de 8 personnes passe dans 2 mois d'un fichier partagé à un logiciel de suivi des demandes.
Deux personnes expérimentées sont hostiles. Construisez le plan d'accompagnement (annonce, étapes,
traitement des résistances, indicateurs de réussite).

### Exercice 7 — Réagir à un signalement (cadre légal, C10 · investigation)

Une collaboratrice vous rapporte que, depuis plusieurs semaines, un collègue fait des remarques
dévalorisantes sur son travail devant les autres et l'exclut des échanges. Que faites-vous, dans quel ordre ?

### Exercice 8 — Construire un tableau de bord (C8 · investigation)

Équipe de service client (6 personnes). Données du mois : 2 400 demandes reçues, 2 160 traitées dans le
délai de 24 h, 96 réclamations, 18 jours d'absence pour 132 jours théoriques travaillés.
- a) Calculez le taux de traitement dans le délai, le taux de réclamation et le taux d'absentéisme.
- b) Proposez 5 indicateurs avec cible et fréquence.

### Exercice 9 — Transformer des feedbacks (C4 · investigation)

Réécrivez de façon factuelle et utile :
- a) « Tu n'es pas assez impliqué. »
- b) « Super boulot ! »
- c) « Ton rapport est confus. »
- d) « Tu as un problème d'attitude en réunion. »

### Exercice 10 — Objectiver une décision (C10 · investigation)

Grille de recrutement d'un assistant : « présentation soignée, bon feeling, jeune et dynamique, disponible
le soir, habite près du site, maîtrise d'Excel ». Repérez les critères problématiques et proposez une grille conforme.

### Exercice 11 — Raconter une réussite managériale avec la méthode STAR (C1 à C10 · investigation)

Choisissez une situation où vous avez fait avancer un collectif (même sans titre de manager) et décrivez :
Situation, Tâche, Actions, Résultat. Identifiez ensuite les compétences du référentiel mobilisées.

### Exercice 12 — Préparer l'enquête métier (projet · investigation)

Rédigez 10 questions à poser à un manager en poste pour vérifier la réalité du métier.

### Exercice 13 — Construire le plan d'action (projet · conclusion)

À partir de votre auto-évaluation, construisez un plan d'action à 6 mois : objectifs, actions, ressources,
échéances, indicateurs de réussite, scénario alternatif.
`;

const ch15 = `
## Chapitre 15 — Corrigés des exercices

> Les corrigés donnent une réponse de référence ; d'autres réponses sont recevables si elles respectent
> les principes du chapitre correspondant. Les exercices 11 et 13 sont corrigés sur le cas fil rouge.

### Corrigé 1 — Objectifs SMART

- a) « Porter le taux de clients satisfaits ou très satisfaits de 78 % à 85 % (enquête trimestrielle) d'ici le 30 juin, en rappelant sous 48 h chaque client insatisfait. »
- b) « D'ici le 31 décembre, chaque membre de l'équipe maîtrise au moins deux postes en plus du sien (niveau 3 de la grille de polyvalence), grâce à 6 binômes de formation croisée. »
- c) « Ramener le taux d'erreurs de saisie relevées au contrôle mensuel de 4 % à moins de 1,5 % d'ici fin mars, par une double vérification des dossiers de plus de 5 000 €. »

**Points de vigilance** : un indicateur chiffré, une valeur de départ, une cible, une échéance, un moyen.

### Corrigé 2 — Autonomie et style

${T(
  [
    ["a) Yanis", "Autonomie 1 (peu compétent, motivé)", "Directif : montrer, expliquer étape par étape, contrôler souvent, encourager"],
    ["b) Hélène", "Autonomie 4 (compétente, motivée)", "Délégatif : confier le résultat et l'échéance, un point d'étape"],
    ["c) Marc", "Autonomie 3 (compétent, motivation variable)", "Participatif : écouter sa déception, l'associer aux décisions, lui confier un sujet valorisant"],
    ["d) Inès", "Autonomie 2 (compétence partielle, découragée)", "Persuasif : expliquer le pourquoi, analyser les erreurs sans blâmer, accompagner, valoriser les progrès"],
  ],
  ["Situation", "Diagnostic", "Style et actions"],
)}

### Corrigé 3 — Recadrage DESC

- **Décrire** : « Sur les quatre dernières semaines, tes comptes rendus ont été remis 3 à 5 jours après l'intervention ; la règle est le jour même. »
- **Exprimer l'impact** : « La facturation de 14 interventions a été décalée ; le service comptable a dû relancer deux clients et notre trésorerie en pâtit. »
- **Spécifier** : « J'ai besoin que chaque compte rendu soit saisi avant 18 h le jour de l'intervention. Qu'est-ce qui te freine aujourd'hui ? » (écouter : outil inadapté ? charge ? oubli ?)
- **Conclure** : « On convient que tu saisis sur la tablette en fin d'intervention ; je vérifie chaque vendredi pendant un mois et on refait le point le 15. »

**Erreurs à éviter** : généraliser (« toujours »), juger la personne (« tu es négligent »), recadrer en public, oublier la date de suivi.

### Corrigé 4 — Modes de gestion de conflit

- a) **Compétition** : la sécurité n'est pas négociable ; rappel ferme de la règle, l'écoute porte sur les causes (équipement inconfortable ?).
- b) **Collaboration** (ou compromis si le temps manque) : il reste du temps, l'enjeu compte pour les deux ; on cherche une solution qui respecte les deux besoins (alternance, critères connus de tous).
- c) **Évitement** temporaire : fait isolé, tension passagère ; on laisse retomber et on reste attentif. Si cela se répète, on en parle.
- d) **Collaboration** : enjeu important pour les deux services, solution durable recherchée.

### Corrigé 5 — Matrice d'Eisenhower

${T(
  [
    ["1. Panne bloquante client", "Urgent et important", "Faire ou piloter soi-même immédiatement"],
    ["7. Reporting de ce soir", "Urgent et important", "Faire aujourd'hui (puis le faire préparer par un collaborateur les semaines suivantes)"],
    ["2. Préparer les entretiens professionnels", "Important non urgent", "Planifier des créneaux dans l'agenda"],
    ["5. Procédure d'accueil", "Important non urgent", "Planifier ou déléguer à un collaborateur expérimenté"],
    ["8. Former un collaborateur", "Important non urgent", "Planifier : c'est ce qui libérera du temps ensuite"],
    ["4. Valider les congés", "Urgent peu important", "Traiter rapidement ou déléguer la préparation"],
    ["3. Sondage facultatif", "Ni urgent ni important", "Reporter ou ne pas faire"],
    ["6. Trier les courriels anciens", "Ni urgent ni important", "Abandonner ou regrouper sur un créneau libre"],
  ],
  ["Tâche", "Quadrant", "Décision"],
)}

### Corrigé 6 — Plan de conduite du changement

${T(
  [
    ["Semaine 1", "Annonce en réunion : pourquoi (perte d'information, doublons, absence de suivi), ce qui change, ce qui ne change pas, calendrier", "Tous"],
    ["Semaine 1-2", "Entretiens individuels avec les deux personnes hostiles : écouter leurs craintes (perte d'expertise ? surcharge ?)", "Manager"],
    ["Semaine 2", "Proposer aux deux personnes expérimentées de paramétrer les catégories et de tester l'outil en premier (relais)", "Manager + 2 relais"],
    ["Semaine 3-4", "Formation de 2 h par groupe de 4, guide d'une page, foire aux questions partagée", "Relais"],
    ["Semaine 5-6", "Double fonctionnement limité ; point quotidien de 10 min sur les difficultés", "Équipe"],
    ["Semaine 7", "Bascule complète ; arrêt du fichier partagé", "Manager"],
    ["Semaine 8 et +", "Rétrospective, ajustements, valorisation des premiers résultats", "Équipe"],
  ],
  ["Quand", "Action", "Qui"],
)}

**Indicateurs de réussite** : 100 % des demandes saisies dans l'outil à la semaine 8 ; délai moyen de
traitement connu chaque semaine ; aucune demande perdue ; satisfaction de l'équipe sur l'outil ≥ 3/4 à 3 mois.
**Traitement des résistances** : on ne négocie pas le « quoi » (l'outil), on négocie le « comment »
(paramétrage, rythme, formation) et on donne un rôle valorisant aux personnes expérimentées.

### Corrigé 7 — Signalement

1. **Écouter et prendre au sérieux**, dans un lieu confidentiel ; remercier pour la confiance ; ne pas minimiser.
2. **Recueillir les faits** : dates, propos, témoins, écrits ; proposer à la personne de les consigner.
3. **Protéger** : mesures immédiates si nécessaire (organisation du travail), vigilance sur la santé (médecine du travail).
4. **Alerter sans délai** selon la procédure interne : responsable RH, référent harcèlement s'il existe, direction ; le CSE peut être saisi.
5. **Ne pas mener seul une confrontation** ni une « médiation » entre les deux : des agissements répétés dégradant les conditions de travail peuvent relever du harcèlement moral (art. L1152-1) ; l'employeur doit enquêter et faire cesser (obligation de sécurité, art. L4121-1).
6. **Assurer le suivi** auprès de la personne et garantir l'absence de représailles.

### Corrigé 8 — Tableau de bord

- a) Taux de traitement dans le délai = 2 160 / 2 400 = **90 %**.
Taux de réclamation = 96 / 2 400 = **4 %**.
Taux d'absentéisme = 18 / 132 = **13,6 %** (à analyser : niveau élevé, signal possible de charge ou de climat).

- b) Proposition :

${T(
  [
    ["Taux de traitement sous 24 h", "≥ 95 %", "Hebdomadaire"],
    ["Taux de réclamation", "≤ 3 %", "Mensuelle"],
    ["Satisfaction client (enquête)", "≥ 85 % satisfaits", "Trimestrielle"],
    ["Taux d'absentéisme", "≤ 5 %", "Mensuelle"],
    ["Entretiens professionnels réalisés à échéance", "100 %", "Semestrielle"],
  ],
  ["Indicateur", "Cible", "Fréquence"],
)}

### Corrigé 9 — Feedbacks

- a) « Lors des trois dernières réunions, tu n'as proposé aucune idée sur le projet d'accueil alors que tu connais bien le sujet. J'aimerais t'entendre : qu'est-ce qui t'en empêche ? »
- b) « Ton tableau de suivi a permis de repérer les 12 dossiers en retard en une matinée ; on a pu rappeler tous les clients avant vendredi. Merci. »
- c) « Dans ton rapport, les conclusions sont en page 7 et les chiffres ne sont pas sourcés ; la direction n'a pas pu décider. Mets la recommandation en première page et une source sous chaque tableau. »
- d) « Hier, tu as coupé la parole à Léo à quatre reprises et levé les yeux au ciel pendant sa présentation. Cela a mis fin aux échanges. J'attends que chacun puisse terminer son intervention. »

### Corrigé 10 — Grille objective

**Critères problématiques** : « jeune » (âge, critère discriminatoire, art. L1132-1) ; « bon feeling » et
« présentation soignée » (subjectifs, porte ouverte aux biais) ; « habite près du site » (lieu de résidence,
critère discriminatoire) ; « disponible le soir » (à justifier par le poste, sinon risque de discrimination
indirecte liée à la situation de famille).

**Grille conforme** :

${T(
  [
    ["Maîtrise d'Excel (tableaux, filtres, formules simples)", "Test pratique de 20 minutes", "/5"],
    ["Rédaction de courriels professionnels", "Exercice écrit", "/5"],
    ["Organisation et gestion des priorités", "Mise en situation", "/5"],
    ["Relation avec les interlocuteurs internes", "Questions comportementales (méthode STAR)", "/5"],
    ["Horaires du poste (9 h - 17 h, exceptionnellement 18 h en clôture)", "Information donnée à tous, question identique", "Oui / non"],
  ],
  ["Critère lié au poste", "Moyen d'évaluation", "Cotation"],
)}

### Corrigé 11 — Récit STAR (cas fil rouge)

- **Situation** : départ simultané de deux techniciens ; arrivée de trois nouveaux en six semaines ; délais de traitement en hausse.
- **Tâche** : en tant que référente, rendre les nouveaux autonomes sur les incidents courants en un mois.
- **Actions** : parcours d'intégration de 4 semaines, 12 fiches de résolution rédigées, binômes, point de 15 minutes chaque vendredi, grille de progression partagée.
- **Résultat** : les trois arrivants autonomes sur 80 % des incidents en 5 semaines ; délai moyen revenu sous 24 h au bout de 2 mois.

**Compétences mobilisées** : C1 (expertise), C2 (organisation), C3 (projet d'intégration), C5 (développement
des collaborateurs), C7 (rituel et reconnaissance), C9 (base de connaissances). **Compétence absente** :
aucun arbitrage difficile ni recadrage — confirme l'axe de travail C4/C5 (assertivité).

### Corrigé 12 — Questions d'enquête métier

1. Comment se répartit votre semaine entre production, animation d'équipe, réunions et reporting ?
2. Qu'est-ce qui vous a le plus surpris lors de votre prise de poste ?
3. Quelle situation managériale a été la plus difficile, et comment l'avez-vous traitée ?
4. Comment gérez-vous un collaborateur qui était votre collègue avant ?
5. De quelles marges de décision disposez-vous réellement (budget, recrutement, organisation) ?
6. Quel soutien recevez-vous de votre hiérarchie et des RH ?
7. Quelles formations vous ont été les plus utiles ?
8. Quelle part de technique avez-vous conservée, et vous manque-t-elle ?
9. Comment protégez-vous votre équilibre personnel ?
10. Que conseilleriez-vous à quelqu'un qui hésite à devenir manager ?

### Corrigé 13 — Plan d'action à 6 mois (cas fil rouge)

**Projet principal** : candidater au poste de responsable d'équipe support. **Alternative** : poste d'experte
technique référente avec un rôle de formatrice interne.

${T(
  [
    ["Assertivité et recadrage (C4/C5)", "Formation de 2 jours « conduire les entretiens difficiles » ; 2 mises en situation avec le consultant", "Mois 1-2", "CPF ou plan de développement", "Un entretien de recadrage conduit avec la trame DESC"],
    ["Cadre légal (C10)", "Module « fondamentaux du droit pour les managers » ; lecture du règlement intérieur et de la procédure d'alerte", "Mois 2", "Ressources internes", "Quiz cadre légal ≥ 8/10"],
    ["Vision stratégique (C8)", "Entretien avec la cheffe de service sur les objectifs annuels ; SWOT de l'équipe", "Mois 2-3", "Temps de travail", "SWOT présenté à la cheffe de service"],
    ["Pilotage (C3/C8)", "Construire le tableau de bord de l'équipe (5 indicateurs)", "Mois 3", "Outil existant", "Tableau de bord mis à jour chaque semaine"],
    ["Candidature", "Dossier de candidature interne appuyé sur 3 récits STAR", "Mois 4", "—", "Entretien de sélection obtenu"],
    ["Prise de poste", "Accompagnement des 100 premiers jours (co-développement entre pairs)", "Mois 5-6", "Plan de développement", "Bilan avec la hiérarchie à 3 mois"],
  ],
  ["Axe", "Action", "Échéance", "Ressource / financement", "Indicateur de réussite"],
)}

**Condition de réussite** : séances de formation le matin (contrainte familiale) ; point au suivi à 6 mois.
`;

const ch16 = `
## Chapitre 16 — Registre de veille mobilisé dans le bilan

Les veilles ci-dessous alimentent le contenu du bilan (indicateurs 23, 24 et 25). Chaque source est
consultée à la mise à jour du support ; la date de consultation et l'exploitation sont tracées dans les
registres de veille de l'organisme.

${T(
  [
    ["Légale", "Code du travail — bilan de compétences (L6313-1, L6313-4, R6313-4 à R6313-8)", "legifrance.gouv.fr", "Cadre des trois phases, consentement, confidentialité de la synthèse (chapitre 1)"],
    ["Légale", "Code du travail — entretien professionnel (L6315-1), réformé dans le cadre de la transposition de l'accord national interprofessionnel sur les parcours professionnels", "legifrance.gouv.fr", "Vérification de la périodicité et du contenu en vigueur avant chaque mise à jour (chapitre 6)"],
    ["Légale", "Obligation de sécurité, harcèlement, discrimination (L4121-1, L1152-1, L1153-1, L1132-1)", "legifrance.gouv.fr ; inrs.fr", "Chapitre 10, exercices 7 et 10"],
    ["Légale", "Compte personnel de formation — éligibilité du bilan de compétences", "moncompteformation.gouv.fr", "Information financement (chapitre 13)"],
    ["Métiers", "Études sur les cadres et le management (attentes, management hybride, charge du manager intermédiaire)", "apec.fr", "Enquête métier, confrontation du projet (chapitre 13)"],
    ["Métiers", "Fiches métiers et données sur l'encadrement (répertoire ROME)", "francetravail.fr", "Exploration des postes de manager visés"],
    ["Métiers", "Certifications en management inscrites au RNCP et au RS", "francecompetences.fr", "Vérification des formations proposées dans le plan d'action"],
    ["Métiers", "Qualité de vie et des conditions de travail, prévention des risques psychosociaux", "anact.fr ; inrs.fr", "Chapitres 10 et 11"],
    ["Pédagogique", "Outils d'évaluation des compétences et de positionnement à distance", "Centre Inffo — centre-inffo.fr", "Choix des outils du bilan en distanciel"],
    ["Pédagogique", "Co-développement professionnel et accompagnement des managers", "Publications professionnelles RH (veille documentaire)", "Recommandation de suites au bilan (corrigé 13)"],
  ],
  ["Type", "Objet", "Source", "Exploitation dans le bilan"],
)}
`;

const ch17 = `
## Chapitre 17 — Lexique et sources

${T(
  [
    ["Autonomie (niveau d')", "Combinaison de la compétence et de la motivation d'une personne sur une tâche donnée"],
    ["DESC", "Méthode de message assertif : Décrire, Exprimer, Spécifier, Conclure"],
    ["Délégation", "Fait de confier un résultat, avec moyens et marges de décision, en conservant la responsabilité finale"],
    ["Document de synthèse", "Document remis au bénéficiaire en fin de bilan ; il lui appartient (art. R6313-7)"],
    ["Feedback", "Retour factuel sur un comportement observé et son impact"],
    ["Matrice d'Eisenhower", "Outil de priorisation selon l'urgence et l'importance"],
    ["PDCA", "Cycle d'amélioration continue : planifier, déployer, contrôler, ajuster"],
    ["RPS", "Risques psychosociaux : risques pour la santé mentale, physique et sociale liés au travail"],
    ["Rétrospective", "Réunion périodique d'amélioration du fonctionnement de l'équipe"],
    ["SMART", "Spécifique, Mesurable, Atteignable, Réaliste, Temporellement défini"],
    ["STAR", "Méthode de récit d'expérience : Situation, Tâche, Actions, Résultat"],
    ["SWOT", "Forces, faiblesses, opportunités, menaces"],
  ],
  ["Terme", "Définition"],
)}

**Pour aller plus loin** : modèle du leadership situationnel (P. Hersey, K. Blanchard) ; modèle de gestion
des conflits (K. Thomas, R. Kilmann) ; conduite du changement (J. Kotter) ; ressources en ligne de
l'INRS, de l'ANACT, de l'APEC, de France Travail et de France Compétences.
`;

export const CHAPITRES_MANAGER_EXERCICES = [ch14, ch15, ch16, ch17];

export const SOMMAIRE_MANAGER_EXERCICES = `14. Exercices d'application (13 exercices)
15. Corrigés des exercices
16. Registre de veille mobilisé dans le bilan
17. Lexique et sources`;
