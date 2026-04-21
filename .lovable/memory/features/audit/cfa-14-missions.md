---
name: CFA 14 missions coverage
description: Catalogue 14 missions L6231-2 regroupé visuellement dans un sous-dossier 14_MISSIONS_CFA dans IND 10
type: feature
---
Le catalogue CFA couvre les 14 missions de l'Art. L6231-2 du Code du Travail.
Tous les documents sont regroupés dans un sous-dossier dédié `14_MISSIONS_CFA/Mission_X_…` à l'intérieur de IND 10 (et IND 30 pour la Mission 8) lors de l'export ZIP.

Mécanisme :
- Champ optionnel `params.folder` ajouté sur chaque entrée `DocEntry` dans `docCatalog.ts`
- Helper `getDocBasePath(doc)` dans `DocumentGenerator.tsx` qui retourne `CT{c}_IND_{i}/{folder}` quand `folder` est présent, sinon `CT{c}_IND_{i}` standard
- Utilisé dans les 3 fonctions ZIP : `handleDownloadAll`, `handleDownloadCritere`, `handleDownloadIndicateur`

Sous-dossiers générés dans `CT3_IND_10/14_MISSIONS_CFA/` :
- `Mission_1_Handicap` (livret référent, eval AGEFIPH, types handicap)
- `Mission_3_Cooperation_CFA_Entreprise`
- `Mission_4_Activites_Citoyennes` (citoyennes, culturelles, sportives)
- `Mission_5_Rupture_Contrat`
- `Mission_6_Mixite_Egalite_FH` (plan + aides régionales : ARA, équipement, santé psy, Imagine R)
- `Mission_9_Mobilite_Erasmus` (convention + procédure + diversité)
- `Mission_10_Mobilite_Nationale`
- `Mission_11_Aide_Recherche_Employeur` (procédure + tableau candidats)
- `Mission_13_Formation_Maitre_Apprentissage` (attestation + accompagnement post-formation)

Mission 8 (insertion pro) reste rattachée à `CT7_IND_30/14_MISSIONS_CFA/Mission_8_Insertion_Professionnelle/`.

Libellés affichés en UI préfixés par `📁 14 MISSIONS / Mission X – …` pour identification visuelle.
