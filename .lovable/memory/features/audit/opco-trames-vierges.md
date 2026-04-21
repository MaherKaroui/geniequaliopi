---
name: OPCO trames vierges B9 et C11
description: ZIP OPCO B9 (calendrier) et C11 (temps connexion) inclut une trame vierge (sans nom stagiaire / sans valeurs) en plus du PDF rempli, 1 trame par session
type: feature
---
Pour les documents OPCO Mobilités B9 et C11, chaque ZIP de téléchargement contient désormais 2 PDF par session :

1. **PDF rempli** : `{label}_{Session_X_dates}.pdf` — données réelles
2. **PDF trame vierge** : `{label}_(Trame_vierge)_{Session_X_dates}.pdf` — structure prête à compléter manuellement

**Templates ajoutés dans `documentGenerator.ts`** :
- `calendrier_formation_opco_vierge` → `genCalendrierFormationOPCOVierge` : reprend le calendrier complet mais remplace les noms stagiaires par "À compléter".
- `temps_connexion_opco_vierge` → `genTempsConnexionOPCOVierge` : tableau structurel (colonnes Date/Jour/Nom/IP/Horaires/Durée) avec dates école pré-remplies, toutes les autres cellules vides.

**Helper dans `OPCOMobilites.tsx`** : `generateViergeBlobForSession(docCode, sessionStagiaires)` génère le PDF vierge pour une session donnée. Appelé dans `handleDownloadSingle` et `handleExportFullZip` immédiatement après le PDF rempli, dans le même sous-dossier session.
