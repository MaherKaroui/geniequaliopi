---
name: OPCO un fichier par stagiaire dans dossier de session (B9, C11, C12)
description: Téléchargement OPCO Mobilités - B9 (calendrier) et C11 (temps connexion) génèrent 1 PDF par stagiaire par session. C12 (exercices) génère 1 PDF PAR SEMAINE ÉCOLE PASSÉE PAR STAGIAIRE (séparés)
type: feature
---
Pour les 3 documents OPCO Mobilités groupés par session (B9 Calendrier, C11 Temps de connexion, C12 Exercices) :

- **Constante** `PER_SESSION_DOCS = new Set(["B9", "C11", "C12"])` dans `src/pages/OPCOMobilites.tsx`.
- **Helper** `groupStagiairesBySession()` regroupe les stagiaires par couple `(dateDebutFormation, dateFinFormation)`.
- **Helper** `generateAutoBlobForSession(doc, sessionStagiaires)` pour B9 / C11.
- **Helper** `generateC12WeekBlob(stagiaire, weekIdx)` pour C12 (1 PDF mono-semaine mono-stagiaire).
- **Helper exporté** `getOpcoExerciceWeeks(f, sessionStagiaires)` (dans `src/lib/documentGenerator.ts`) renvoie les semaines école PASSÉES uniquement (`lastDay <= today`).

**Structure ZIP B9 / C11** :
- 1 dossier par session (`Session_X_{date_debut}_au_{date_fin}`).
- À l'intérieur : 1 PDF par stagiaire + 1 trame vierge.
- B9 : Excel calendrier consolidé multi-onglets ajouté à la racine du ZIP.

**Structure ZIP C12 (NOUVEAU)** :
- 1 dossier par session.
- 1 sous-dossier par stagiaire (`Prenom_Nom`).
- À l'intérieur : **1 PDF PAR SEMAINE ÉCOLE PASSÉE** nommé `Exercice_pratique_semaine_..._Semaine_NN_YYYY-MM-DD_Prenom_Nom_<date>.pdf`.
- Les semaines futures sont **ignorées** (pas de PDF généré).
- Pas de trame vierge pour C12.

**Templates** :
- `exercices_opco` (legacy, doc unique tout-en-un, conservé pour compatibilité).
- `exercices_opco_semaine` (nouveau, accepte `params.weekIdx` pour rendre une seule semaine).

**Mode single-week dans `genExercicesOPCO`** : quand `params.weekIdx` est fourni, le doc omet l'intro/le tableau récapitulatif et le titre de session, et ne rend que le bloc QCM de la semaine demandée pour les stagiaires fournis (1 dans ce cas).
