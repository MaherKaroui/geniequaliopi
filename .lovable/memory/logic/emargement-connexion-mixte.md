---
name: Émargement & temps de connexion en mixte / formation non terminée
description: Logique de remplissage des feuilles d'émargement et rapports de connexion selon modalité mixte et statut de complétion
type: logic
---
Pour les feuilles d'émargement (AF + CFA) et les rapports/temps de connexion :

1. **Modalité mixte** (`isMixte(f)`) : alternance Présentiel / Distanciel jour par jour (index pair = Présentiel, impair = Distanciel via `getDayModalite`). Les jours présentiel sont étiquetés "(Présentiel)" et les distanciel "(Distanciel)" dans la colonne Date.

2. **Rapports/temps de connexion en mixte** : seuls les jours en distanciel sont reportés. Les jours présentiel sont sautés (pas de connexion LMS attendue).

3. **Formation non terminée** (date du jour < dernier jour) : pour chaque jour futur :
   - Émargement : nom et signature affichés à blanc avec mention "— en attente —"
   - Rapport connexion : ligne "—" avec statut "⏳ À venir"
   - Récapitulatif : taux affiché "X% (en cours)" et statut "⏳ Formation en cours"

4. **Rythme alternance CFA** : l'index global du jour (`wi * 5 + d`) est utilisé pour l'alternance modalité dans les feuilles CFA hebdomadaires.

Helpers : `isFrLongDayPast(dayStr)` (parse "lundi 4 novembre 2024"), `getDayModalite(f, dayIdx)`, `isStagiaireFormationTerminee(s, f)`.
