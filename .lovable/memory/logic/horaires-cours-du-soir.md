---
name: Horaires journée standard 9h-17h Lun-Ven
description: Toutes les formations classiques utilisent désormais les horaires journée 09h00–12h30 / 13h30–17h00 (7 h/jour) du lundi au vendredi. Plus de samedi sauf exception massage (postpartum/prénatal). OPCO/CFA alternance gardent leur rythme école 7h.
type: feature
---
# Horaires standards des formations classiques

**Règle globale (toutes formations sauf OPCO/CFA alternance et exceptions massage)** :
- Du lundi au vendredi : **09h00 – 12h30 / 13h30 – 17h00** (7 h/jour)
- Pause déjeuner : 12h30 – 13h30
- Pas de cours le samedi ni le dimanche

**Exceptions samedi inclus** :
- Détectées via `formationIncludesSaturday(f)` dans `src/lib/sampleData.ts`
- Concerne : massage postpartum / prénatal (formations intensives 6 jours)
- ECSR/VTC : `includeSat = true` également (cf. `isECSRFormation`)

**Exception personne en situation de handicap (PSH)** :
- Détection : `isPSHStagiaire(s)` dans `src/lib/generatorsV2.ts`
- Horaires aménagés : Lun-Ven 09h00 – 12h30 / 13h30 – 17h00 (déjà identique au standard)

**Helpers** :
- `src/lib/documentGenerator.ts` : `getHorairesLabel(f, dow)`, `getEmargementBlocs(f, dow)` — toujours journée Matin/Après-midi
- `src/lib/generatorsV2.ts` : `HORAIRES_TEXTE`, `HORAIRES_LIGNE`, `HORAIRES_TEXTE_PSH`, `HORAIRES_LIGNE_PSH`
- `src/lib/docBuilder.ts` : `getModaliteContent(f, o).horaires` — journée Lun-Ven

**Exceptions à NE PAS modifier** :
- Calendriers OPCO B9 : rythme école 7h/jour
- Émargement APPRENTISSAGE CFA : alternance officielle
