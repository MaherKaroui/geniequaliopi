---
name: Cohérence besoins/évaluations avec la formation
description: L'analyse des besoins et les questions ouvertes des tests de positionnement génèrent du contenu cohérent avec les objectifs et le programme réels de la formation, même pour les formations non répertoriées.
type: feature
---
Pour garantir que les réponses d'évaluation des besoins, les questions ouvertes et les exercices soient toujours cohérents avec la formation effective :

### 1. Analyse des besoins (`genAnalyseBesoins` dans `documentGenerator.ts`)
Les domaines reconnus (FLE, massage, anglais, IA, marketing, CRM, bureautique, management, esthétique, secrétariat médical, NTC, VTC) ont des besoins/synthèse/adaptations dédiés.

**Fallback dynamique** : pour toute autre formation, le système :
- Parse `f.objectifs` (split sur `\n`, `.`, `;`) et `f.programme` (split sur `\n`)
- Nettoie chaque ligne (retire puces, numérotation, "Jour X – ", "À l'issue...")
- Dédoublonne via Set sur les 40 premiers caractères
- Utilise les 10 premiers topics comme besoins (préfixés par verbes d'action variés : Maîtriser, Acquérir, Développer, etc.)
- Génère synthèse `• N stagiaires expriment le besoin : <topic>` avec proportions 0.85/0.75/0.65/0.55/0.45
- Adaptations contextualisées (mises en situation, exercices sur topic principal, supports spécifiques à l'intitulé)

### 2. Questions ouvertes (`getQuestionsOuvertes` dans `evalContent.ts`)
**Signature étendue** : `getQuestionsOuvertes(intitule, objectifs?, programme?)`.

Quand pas de match dans `QUESTIONS_OUVERTES[key]` : génère 5 questions dynamiques début + 5 fin via `generateDynamicQuestions()`. Pour chaque topic extrait des objectifs/programme :
- **Début** : variantes "Quelles sont vos connaissances actuelles concernant : X ?", "Comment aborderiez-vous : X ?", etc.
- **Fin** : variantes "Expliquez ce que vous avez appris sur : X.", "Comment allez-vous appliquer : X ?", etc.
- `reponseAttendue` mentionne explicitement le topic et l'intitulé de la formation pour guider la notation IA.

Les questions dynamiques sont préfixées aux questions par défaut, et `ensureMinimumQuestions` complète à 10 minimum sans doublons.

### 3. Appels mis à jour
- `genTestPositionnementTrame(o, f, type)` → passe `f.objectifs, f.programme`
- `genTestPositionnementIndividuel(o, f, s, ...)` → idem
- `genTestPositionnementStagiaire` (interne) → idem

Résultat : même pour une formation custom (générée par IA ou saisie manuellement), les besoins exprimés et les questions de positionnement portent sur les compétences réelles de la formation.
