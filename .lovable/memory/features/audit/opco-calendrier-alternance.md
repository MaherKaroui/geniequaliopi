---
name: OPCO calendar - alternance rhythm
description: Calendrier OPCO B9 suit le rythme alternance (1 sem école / 3 sem entreprise par défaut), démarre TOUJOURS par école, 7h/jour
type: feature
---
Le Calendrier de formation OPCO Mobilités (B9) suit obligatoirement le rythme d'alternance défini dans `f.rythmeAlternance` (formulaire Formation).
- Format parsé : "X sem ... Y sem ..." (ex: "1 semaine CFA / 3 semaines entreprise"). Défaut : 1 école / 3 entreprise.
- Le calendrier démarre TOUJOURS par une semaine en centre de formation (école), peu importe la date de début (semaine ISO).
- Tous les jours ouvrés de la période (date de début → fin) sont listés, avec un type "École" (fond bleu) ou "Entreprise" (fond orange).
- Les jours école : horaires 09h-12h30 / 13h30-17h00 = 7 h/jour. Les jours entreprise : horaires "—", volume "—".
- Le volume centre = nbJoursÉcole × 7 (et non la durée formation totale).
- PDF : `genCalendrierFormationOPCO` dans `src/lib/documentGenerator.ts`. Excel : `generateExcelCalendrierOPCO` dans `src/lib/xlsxGenerator.ts` (un onglet par session + onglet consolidé).
- Priorité dates individuelles stagiaire > dates globales formation, regroupement par couple (debut, fin).
