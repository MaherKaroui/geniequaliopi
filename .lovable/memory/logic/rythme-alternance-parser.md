---
name: Rythme alternance parser - hour-based
description: Parser de rythme d'alternance CFA supporte 3 formats : semaines, jours, et heures (ex 910h CFA / 280h entreprise). Le format heures calcule un cycle d'alternance simplifié à partir du ratio CFA/Entreprise.
type: feature
---
Le parseur `parseRythmeAlternance` dans `src/lib/documentGenerator.ts` supporte 3 formats de rythme :

1. **Semaines** : "1 semaine CFA / 3 semaines entreprise" → `{cfaWeeks: 1, entrepriseWeeks: 3}`
2. **Jours** (alternance dans la même semaine) : "2 jours CFA / 3 jours entreprise" → `isDayBasedRythme=true`, `getCFADaysPerWeek=2`
3. **Heures** : "910h CFA / 280h entreprise" → `isHourBasedRythme=true`

### Format heures - calcul du cycle
À partir du ratio CFA:Entreprise, le système simplifie en un petit cycle réaliste :
- ratio ≥ 3.5 → 4 sem CFA / 1 sem entreprise
- ratio ≥ 2.5 → 3 sem CFA / 1 sem entreprise (ex: 910/280 = 3.25)
- ratio ≥ 1.5 → 2 sem CFA / 1 sem entreprise
- ratio ≥ 0.85 → 1/1
- ratio ≥ 0.4 → 1/2
- ratio > 0 → 1/3

### Calcul des semaines totales CFA (heures)
`getCFAWeekDates` : pour le format heures, `totalCFAWeeks = ceil(cfaHours / 35)` (ex: 910h → 26 semaines CFA), puis distribué selon le cycle calculé. Pour le mode jours, `cycleLength=1`. Pour heures et semaines, cycle classique `cfaPerCycle + entrepriseWeeks`.

### Helpers exportés
- `parseRythmeAlternance(rythme)` → `{cfaWeeks, entrepriseWeeks}`
- `isHourBasedRythme(rythme)` → boolean
- `isDayBasedRythme(rythme)` → boolean
- `getCFADaysPerWeek(rythme)` → nombre de jours CFA/semaine

Tous les calendriers et documents CFA (calendrier annuel, émargement, synopsis, planning Excel) utilisent ces helpers pour rester cohérents.
