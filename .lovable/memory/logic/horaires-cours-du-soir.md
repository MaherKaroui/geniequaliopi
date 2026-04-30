---
name: Horaires journée standard 9h-17h
description: Toutes les formations classiques utilisent désormais les horaires journée 09h00–12h30 / 13h30–17h00 (7 h/jour) du lundi au samedi. Plus de "cours du soir 18h-22h". Exception PSH (Lun-Ven uniquement). OPCO/CFA alternance gardent leur rythme école 7h.
type: feature
---
# Horaires standards des formations classiques

**Règle globale (toutes formations sauf OPCO/CFA alternance)** :
- Du lundi au samedi : **09h00 – 12h30 / 13h30 – 17h00** (7 h/jour)
- Pause déjeuner : 12h30 – 13h30

**Exception personne en situation de handicap (PSH)** :
- Détection : `isPSHStagiaire(s)` dans `src/lib/generatorsV2.ts` — vrai si `s.rqth === "oui"` OU si nom contient "nouira"
- Horaires aménagés : **Lun-Ven 09h00 – 12h30 / 13h30 – 17h00** (pas de samedi)
- Appliqué dans : convocation V2, contrat formation pro V2, CGV, règlement (documents par stagiaire)

**Helpers** :
- `src/lib/documentGenerator.ts` : `getHorairesLabel(f, dow)`, `getEmargementBlocs(f, dow)` — toujours journée Matin/Après-midi
- `src/lib/generatorsV2.ts` : `HORAIRES_TEXTE`, `HORAIRES_LIGNE`, `HORAIRES_TEXTE_PSH`, `HORAIRES_LIGNE_PSH`, `horairesTexteFor(s)`, `horairesLigneFor(s)`
- `src/lib/docBuilder.ts` : `getModaliteContent(f, o).horaires` — journée Lun-Sam

**Exceptions à NE PAS modifier** :
- Calendriers OPCO B9 (`genCalendrierFormationOPCO`, lignes ~12839 documentGenerator.ts) : rythme journée 9h-12h30 / 13h30-17h00 = 7h/jour école (règle OPCO officielle)
- Émargement APPRENTISSAGE CFA (ligne ~8463 documentGenerator.ts) : Matin 9h00-12h30 / Après-midi 13h30-17h00 (rythme alternance officiel)
