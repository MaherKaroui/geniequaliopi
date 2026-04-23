---
name: Test positionnement fin vide si formation non terminée
description: Le test de positionnement de fin (C6 OPCO, ai_test_positionnement_fin) reste en trame vierge tant que la formation du stagiaire n'est pas terminée
type: feature
---
Pour le pack d'évaluation IA (OPCO C6), le sous-template `ai_test_positionnement_fin` (`genAITestPositionnement` mode "fin") génère une **trame vierge** si `isStagiaireFormationTerminee(s, f)` est faux :
- Aucune réponse stagiaire, aucune bonne réponse, aucun score, aucune appréciation.
- Tableau affiché avec questions + options proposées (A/B/C/D) et colonnes "À compléter" / "—".
- Date remplacée par "À compléter en fin de formation".
- Bandeau orange "Trame vierge" en tête.
- Score et appréciation laissés en pointillés (à remplir manuellement).
Le test de positionnement de DÉBUT reste toujours rempli (forcément passé).
