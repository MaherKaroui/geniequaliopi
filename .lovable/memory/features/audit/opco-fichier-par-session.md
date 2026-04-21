---
name: OPCO un fichier par stagiaire dans dossier de session (B9, C11, C12)
description: Téléchargement OPCO Mobilités - les documents B9 (calendrier), C11 (temps connexion) et C12 (exercices) génèrent 1 fichier PDF PAR STAGIAIRE dans un sous-dossier de session, regroupés par dates communes
type: feature
---
Pour les 3 documents OPCO Mobilités groupés par session (B9 Calendrier, C11 Temps de connexion, C12 Exercices) :

- **Constante** `PER_SESSION_DOCS = new Set(["B9", "C11", "C12"])` dans `src/pages/OPCOMobilites.tsx`.
- **Helper** `groupStagiairesBySession()` regroupe les stagiaires par couple `(dateDebutFormation, dateFinFormation)` (priorité dates individuelles > dates globales formation).
- **Helper** `generateAutoBlobForSession(doc, sessionStagiaires)` appelle `generateDocumentById` avec les stagiaires passés en paramètre.
- **Helper** `formatSessionSuffix(g, idx)` produit le suffixe de dossier `Session_{idx+1}_{YYYY-MM-DD}_au_{YYYY-MM-DD}`.

**Structure ZIP** (téléchargement individuel ET export global) :
- 1 dossier par session (nommé `Session_X_{date_debut}_au_{date_fin}`).
- À l'intérieur : **1 PDF PAR STAGIAIRE** (suffixé `Prenom_Nom`).
- Pour B9 et C11 : ajout d'une trame vierge par session dans le même dossier.
- Pour B9 : Excel calendrier consolidé multi-onglets ajouté à la racine du ZIP (téléchargement individuel) ou du sous-dossier (export global).

**Téléchargement individuel** (`handleDownloadSingle`) : ZIP avec arborescence ci-dessus.

**Export ZIP global** (`handleExportFullZip`) : sous-dossier dédié `{folder}/{code}_{label}/` contenant l'arborescence par session.

**Fonctions sources inchangées** : `genCalendrierFormationOPCO`, `genTempsConnexionOPCO`, `genExercicesOPCO` dans `src/lib/documentGenerator.ts`.
