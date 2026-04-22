---
name: Bilan à froid vide si formation non terminée
description: Le bilan de satisfaction à froid (CODE 58bis / IND 30 / OPCO C10) reste vide tant que la formation n'est pas terminée
type: logic
---
Le bilan à froid est administré 3 à 6 mois APRÈS la fin de la formation. Tant que la formation n'est pas terminée pour un stagiaire (`isStagiaireFormationTerminee(s, f)` retourne `false`), le document `genBilanFroidStagiaire` (src/lib/eyGenerators.ts) doit produire :
- Tableau de questions avec cases vides (aucun X)
- Bandeau de statut "⏳ Formation en cours — bilan à froid à administrer 3 à 6 mois après la fin (date)"
- Zone commentaires "— en attente du retour bénéficiaire —"
- Signatures vides

Ce template est partagé : EY (CODE 58bis), AF/CFA IND 30, OPCO Mobilités C10. Cohérent avec la règle générale "formation non terminée = preuves post-formation laissées vides".
