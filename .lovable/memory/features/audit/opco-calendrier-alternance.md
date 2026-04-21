---
name: OPCO calendar - alternance rhythm
description: Calendrier OPCO B9 suit le rythme alternance (1 sem école / 3 sem entreprise par défaut), démarre TOUJOURS par école, 7h/jour, prolonge 1ʳᵉ semaine partielle, daté 7 jours ouvrés avant le démarrage
type: feature
---
Le Calendrier de formation OPCO Mobilités (B9) suit obligatoirement le rythme d'alternance défini dans `f.rythmeAlternance` (formulaire Formation).
- Format parsé : "X sem ... Y sem ..." (ex: "1 semaine CFA / 3 semaines entreprise"). Défaut : 1 école / 3 entreprise.
- Le calendrier démarre TOUJOURS par une semaine en centre de formation (école), peu importe la date de début (semaine ISO).
- **Première semaine partielle** : si la formation démarre en milieu de semaine et qu'il reste <3 jours ouvrés (ex: démarrage jeudi/vendredi), la semaine suivante reste également école pour garantir une vraie semaine pleine. Implémenté via `computeWeekShift` qui retourne 1 si <3 jours restants → décale le cycle d'alternance d'1 semaine.
- Tous les jours ouvrés de la période (date de début → fin) sont listés, avec un type "École" (fond bleu) ou "Entreprise" (fond orange).
- Les jours école : horaires 09h-12h30 / 13h30-17h00 = 7 h/jour. Les jours entreprise : horaires "—", volume "—".
- Le volume centre = nbJoursÉcole × 7 (et non la durée formation totale).
- **Date d'envoi du calendrier** : calculée par session = date de début de session − 7 jours ouvrés (hors week-end ET jours fériés français via `subtractBusinessDays` dans `docBuilder.ts`). Affichée par session sous le bandeau Période. Le pied de page "Fait à ... le ..." utilise la date d'envoi la plus précoce parmi toutes les sessions (priorité aux dates individuelles stagiaire). Plus de date du jour de génération.
- PDF : `genCalendrierFormationOPCO` dans `src/lib/documentGenerator.ts` — saut de page entre chaque session. Excel : `generateExcelCalendrierOPCO` dans `src/lib/xlsxGenerator.ts` (un onglet par session + onglet consolidé).
- Priorité dates individuelles stagiaire > dates globales formation, regroupement par couple (debut, fin).
