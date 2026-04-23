---
name: OPCO trames vierges B9 et C11
description: ZIP OPCO B9 (calendrier) et C11 (temps connexion) inclut une trame TOTALEMENT vide (pas de dates, pas de noms, juste structure colonnes + lignes vides) en plus du PDF rempli
type: feature
---
Pour les documents OPCO Mobilités B9 et C11, chaque ZIP de téléchargement contient 2 PDF par session :

1. **PDF rempli** : `{label}_{Session_X_dates}.pdf` — données réelles
2. **PDF trame vierge** : `{label}_(Trame_vierge)_{Session_X_dates}.pdf` — structure complètement vide (aucune date, aucun nom, aucun tarif), prête à compléter manuellement

**Templates dans `documentGenerator.ts`** :
- `calendrier_formation_opco_vierge` → `genCalendrierFormationOPCOVierge` : génère un PDF avec table d'en-tête vide (Intitulé/Organisme/Lieu/Rythme/Formateur tous à `&nbsp;`), une seule "Session — À compléter" avec période `____________`, et un tableau de 30 lignes vides reprenant les colonnes (N°/Sem./Type/Date/Jour/Horaires matin/Horaires après-midi/Lieu).
- `temps_connexion_opco_vierge` → `genTempsConnexionOPCOVierge` : table d'en-tête vide, une seule session vierge, tableau de 25 lignes vides (Date/Jour/Nom apprenant/IP/Connexion matin/Déco midi/Reco/Déco soir/Durée/Statut).

Les trames vierges ne dépendent plus des stagiaires/dates fournis — elles sont totalement génériques.

**Helper dans `OPCOMobilites.tsx`** : `generateViergeBlobForSession(docCode, sessionStagiaires)` génère le PDF vierge pour une session donnée. Appelé dans `handleDownloadSingle` et `handleExportFullZip` immédiatement après le PDF rempli, dans le même sous-dossier session.
