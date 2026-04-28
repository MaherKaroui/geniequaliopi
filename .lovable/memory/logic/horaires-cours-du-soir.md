---
name: Horaires cours du soir + exception PSH
description: Toutes les convocations/contrats/règlements/séquences pédagogiques classiques utilisent les horaires cours du soir 18h-22h (Lun-Ven) + Samedi 9h-12h30 / 13h30-17h30. Exception PSH (Nouira Bilel ou RQTH=oui) : 9h-12h30 / 13h30-17h. Les calendriers OPCO/CFA en alternance gardent leur rythme journée 7h école.
type: feature
---
# Horaires standards des formations classiques

**Règle globale (toutes formations sauf OPCO/CFA alternance)** :
- Lundi au vendredi : **18h00 – 22h00** (cours du soir, 4h)
- Samedi : **09h00 – 12h30 / 13h30 – 17h30** (7h30)

**Exception personne en situation de handicap (PSH)** :
- Détection : `isPSHStagiaire(s)` dans `src/lib/generatorsV2.ts` — vrai si `s.rqth === "oui"` OU si nom contient "nouira"
- Horaires aménagés : **Lun-Ven 09h00 – 12h30 / 13h30 – 17h00** (journée classique, pas de samedi imposé)
- Appliqué dans : convocation V2, contrat formation pro V2, CGV, règlement (documents par stagiaire)

**Helpers** :
- `src/lib/documentGenerator.ts` : `getHorairesLabel(f, dow)`, `getEmargementBlocs(f, dow)` — toujours soir/samedi
- `src/lib/generatorsV2.ts` : `HORAIRES_TEXTE`, `HORAIRES_LIGNE`, `HORAIRES_TEXTE_PSH`, `HORAIRES_LIGNE_PSH`, `horairesTexteFor(s)`, `horairesLigneFor(s)`
- `src/lib/docBuilder.ts` : `getModaliteContent(f, o).horaires` — soir/samedi

**Exceptions à NE PAS modifier** :
- Calendriers OPCO B9 (`genCalendrierFormationOPCO`, lignes ~12839 documentGenerator.ts) : rythme journée 9h-12h30 / 13h30-17h00 = 7h/jour école (règle OPCO officielle, voir mémoire `opco-calendrier-alternance`)
- Émargement APPRENTISSAGE CFA (ligne ~8463 documentGenerator.ts) : Matin 9h00-12h30 / Après-midi 13h30-17h00 (rythme alternance officiel)
