---
name: Remplissage IZILearn
description: Documents IZILearn remplis comme Qualiopi, connexions enregistrées et emplacements de signature stagiaire
type: feature
---
Les documents de l'espace IZILearn se remplissent automatiquement comme la génération Qualiopi / rapide :

1. **Feuilles d'émargement** : mêmes tableaux partagés (`attendanceDayTable`). Jours passés remplis avec le nom du stagiaire + « Signé X.Nom » (ou l'image de signature réutilisable) et le formateur + « Signé X.Nom » (ou sa signature capturée via le bouton « Signature formateur », rôle `formateur` dans `documentSignature.ts`, clé par organisme/session/nom) ; jours futurs marqués « — en attente — ». Les signatures de créneau enregistrées dans IZILearn (horodatées, par slot) restent prioritaires et ne sont jamais remplacées. La signature formateur remplit aussi les cases « Le formateur » des autres documents.

2. **Relevés de temps de connexion** : mêmes sept colonnes Qualiopi (`connectionDayTable`). Connexions réellement relevées prioritaires ; jours passés sans relevé remplis avec les horaires réalistes de `buildRealisticConnectionDay` (seed déterministe par stagiaire/jour, statut « Présent(e) ») ; jours futurs « — / ⏳ À venir ». Récapitulatif `connectionSummary` avec total, taux et statut comme Qualiopi.

3. Les réponses et résultats importés (besoins, positionnement, bilans, examen final) restent prioritaires ; les contenus futurs ou non échus restent vierges.

Helpers : `buildRealisticConnectionDay`, `isFrLongDayPast`, `getDayModalite` (exportés de `documentGenerator.ts`), `plannedSessionDay` dans `src/lib/izilearn/trames.ts`.
