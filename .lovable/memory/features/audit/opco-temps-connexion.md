---
name: OPCO temps de connexion par session
description: Document C11 OPCO Mobilités - Relevé temps de connexion groupé par session (mêmes dates), une session par page, uniquement jours école écoulés, respecte rythme alternance
type: feature
---
Le document **C11 — Temps de Connexion** du dossier OPCO Mobilités (template `temps_connexion_opco`, généré par `genTempsConnexionOPCO` dans `src/lib/documentGenerator.ts`) :
- Groupe les stagiaires par couple (date début, date fin) → une **session = un groupe partageant les mêmes dates** (priorité dates individuelles stagiaire > dates globales formation).
- **Une session par page PDF** : saut de page `<div class="page-break-before" style="page-break-before:always;break-before:page;height:0px;overflow:hidden">` avant chaque session sauf la première.
- Suit le **rythme d'alternance** parsé dans `f.rythmeAlternance` (défaut : 1 sem école / 3 sem entreprise) avec `computeWeekShift` (prolonge l'école si 1ʳᵉ semaine partielle <3 jours).
- Démarre **toujours par une semaine école**.
- Affiche uniquement les **jours école PASSÉS** (`d <= today`). Jours école futurs = exclus. Jours entreprise = exclus (ne sont pas relevés en LMS).
- Si la formation n'est pas encore terminée (`isStagiaireFormationTerminee` retourne false), le document est partiel et indique "Formation en cours" + jours futurs ajoutés au fur et à mesure.
- Si **aucun jour école écoulé** : message "Aucun jour en centre de formation écoulé à ce jour".
- Pour chaque jour : Date, Jour, IP simulée (déterministe via seed), Connexion matin (08-09h), Déconnexion midi (12-13h), Reconnexion (13-14h), Déconnexion soir (16-17h), Durée totale, Statut "Connecté".
- Total par stagiaire : volume attendu = nbJoursÉcoleÉcoulés × 7h, taux de présence calculé sur ce volume.
- Pour chaque session : tableau par stagiaire (chaque stagiaire a son propre relevé dans la session).
