---
name: OPCO calendar - alternance rhythm
description: Calendrier OPCO B9 suit le rythme alternance (1 sem école / 3 sem entreprise par défaut), démarre TOUJOURS par école, 7h/jour, daté 7 jours ouvrés avant le démarrage. Pas de colonne "Volume" ni ligne "Volume centre" par session.
type: feature
---
Le Calendrier de formation OPCO Mobilités (B9) suit obligatoirement le rythme d'alternance défini dans `f.rythmeAlternance` (formulaire Formation).
- Format parsé : "X sem ... Y sem ..." (ex: "1 semaine CFA / 3 semaines entreprise"). Défaut : 1 école / 3 entreprise.
- Le calendrier démarre TOUJOURS par une semaine en centre de formation (école).
- **Première semaine partielle** : si la formation démarre en milieu de semaine et qu'il reste <3 jours ouvrés, la semaine suivante reste également école (via `computeWeekShift`).
- Tous les jours ouvrés sont listés, type "École" (fond bleu) ou "Entreprise" (fond orange).
- Jours école : horaires 09h-12h30 / 13h30-17h00 = 7 h/jour. Jours entreprise : horaires "—".
- **Pas de colonne "Volume"** dans le tableau journalier. Pas de ligne "Volume centre : Xh sur Y jours" dans l'en-tête de session (uniquement "Période / Rythme / Jours école").
- **Date d'envoi du calendrier** : par session = date début − 7 jours ouvrés (hors WE + jours fériés FR via `subtractBusinessDays`). Affichée par session.
- **Pied de page "Fait à ... le ..."** : utilise la date d'envoi la plus précoce parmi toutes les sessions ; si aucune, fallback = aujourd'hui − 7 jours ouvrés (jamais la date du jour de génération).
- PDF : `genCalendrierFormationOPCO` dans `src/lib/documentGenerator.ts` — saut de page entre sessions. Excel : `generateExcelCalendrierOPCO`.
- Priorité dates individuelles stagiaire > dates globales formation, regroupement par couple (debut, fin).
