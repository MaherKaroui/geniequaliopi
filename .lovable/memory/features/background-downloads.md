---
name: Background download jobs system
description: Système global de jobs de téléchargement (ZIP/PDF) qui survit à la navigation entre pages
type: feature
---
Les téléchargements longs (ZIP complet OPCO, dossier Qualiopi, sélection EY) tournent dans `BackgroundJobsProvider` (`src/lib/backgroundJobs.tsx`) monté au niveau App. Ils survivent au démontage des composants : l'utilisateur peut quitter la page, naviguer ailleurs, le job continue et déclenche le téléchargement à la fin.

- Provider monté dans `src/App.tsx` au-dessus de `<Routes>`.
- Hook `useBackgroundJobs()` expose `runJob({ label, fileName, run })` + `hasActive` + liste de jobs.
- `BackgroundJobsBar` (widget flottant en bas-droite) affiche tous les jobs actifs/terminés sur toutes les pages avec barre de progression et bouton "Télécharger à nouveau".
- `runJob` retourne immédiatement, le `run` async est détaché ; le blob retourné est sauvé via `file-saver` automatiquement (`autoDownload` true par défaut).
- Snapshot obligatoire des données dans la closure (`namingCtx`, `mergedStagiaires`, etc.) avant `runJob` pour éviter de capturer des refs qui changeront.
- `beforeunload` actif tant qu'au moins un job tourne pour avertir avant fermeture d'onglet.

Pages branchées :
- `OPCOMobilites.tsx` → `handleExportFullZip` + `handleDownloadSingle` (par doc)
- `DocumentGenerator.tsx` → `handleDownloadAll` (Dossier Qualiopi complet)
- `ControleEDOF.tsx` → `downloadSelectedZip` (sélection EY)
