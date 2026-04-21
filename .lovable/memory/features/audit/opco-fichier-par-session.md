---
name: OPCO un fichier par session (B9, C11, C12)
description: Téléchargement OPCO Mobilités - les documents B9 (calendrier), C11 (temps connexion) et C12 (exercices) génèrent 1 fichier PDF par session dans un ZIP, suffixé par les dates de session
type: feature
---
Pour les 3 documents OPCO Mobilités groupés par session (B9 Calendrier, C11 Temps de connexion, C12 Exercices) :

- **Constante** `PER_SESSION_DOCS = new Set(["B9", "C11", "C12"])` dans `src/pages/OPCOMobilites.tsx`.
- **Helper** `groupStagiairesBySession()` regroupe les stagiaires par couple `(dateDebutFormation, dateFinFormation)` (priorité dates individuelles > dates globales formation).
- **Helper** `generateAutoBlobForSession(doc, sessionStagiaires)` appelle `generateDocumentById` avec UNIQUEMENT les stagiaires de la session → le PDF généré ne contient qu'1 session.
- **Helper** `formatSessionSuffix(g, idx)` produit le suffixe de fichier `Session_{idx+1}_{YYYY-MM-DD}_au_{YYYY-MM-DD}`.

**Téléchargement individuel** (`handleDownloadSingle`) :
- Si doc ∈ PER_SESSION_DOCS → ZIP avec 1 PDF par session, nommé `{nom_doc}_{Session_X_dates}.pdf`.
- Pour B9 : on ajoute aussi le calendrier Excel multi-onglets consolidé.

**Export ZIP global** (`handleExportFullZip`) :
- Crée un sous-dossier dédié `{folder}/{code}_{label}/` pour chaque doc PER_SESSION.
- 1 PDF par session dans ce sous-dossier.
- B9 : Excel consolidé ajouté dans le même sous-dossier.

**Fonctions sources inchangées** : `genCalendrierFormationOPCO`, `genTempsConnexionOPCO`, `genExercicesOPCO` dans `src/lib/documentGenerator.ts` continuent de gérer la pagination "1 session par page" si on leur passe plusieurs stagiaires (utile pour preview unique).
