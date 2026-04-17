---
name: OPCO Mobilités audit module
description: Module dédié /opco-mobilites avec 25 documents (sections A/B/C), nomenclature stricte OPCO et export ZIP
type: feature
---
Le module OPCO Mobilités (/opco-mobilites) gère un contrôle de service fait OPCO :
- 25 documents répartis en 3 sections : A. Conformité légale (9 docs), B. Capacité pédagogique (8 docs), C. Service apprenant (8 docs, par apprenti).
- Catalogue : `src/lib/opcoMobilitesCatalog.ts`. Helper de nommage : `src/lib/opcoNaming.ts`.
- Nomenclature stricte imposée OPCO : `{anneeControle}_{Etablissement}_{Pièce}_{AAAA.MM.JJ}.{ext}` ; arborescence ZIP : `OPCO_Mobilites_{annee}_{etab}/{annee}_{etab}/{section}/...`.
- 4 documents en upload manuel obligatoire (K-Bis, Qualiopi, Assurance RC, BPF) — les 21 autres sont auto-générés via templates Qualiopi/CFA existants.
- Champs spécifiques OPCO : `refDossier` (ex 202604140414_1_49428) et `anneeControle`, persistés en sessionStorage (clés opco_*).
- Export ZIP complet inclut les manquants sous forme de placeholder TXT pour signaler à l'utilisateur ce qu'il reste à fournir.
