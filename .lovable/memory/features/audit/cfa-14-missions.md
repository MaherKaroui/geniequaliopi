---
name: CFA 14 missions coverage
description: Catalogue COMPLET des 14 missions L6231-2 regroupé visuellement dans le sous-dossier 14_MISSIONS_CFA dans IND 10
type: feature
---
Le catalogue CFA couvre les **14 missions complètes** de l'Art. L6231-2 (et L6231-3 pour Mission 14) du Code du Travail.
Tous les documents sont regroupés dans un sous-dossier dédié `14_MISSIONS_CFA/Mission_X_…` à l'intérieur de IND 10 (et IND 30 pour la Mission 8) lors de l'export ZIP.

Mécanisme :
- Champ optionnel `params.folder` ajouté sur chaque entrée `DocEntry` dans `docCatalog.ts`
- Helper `getDocBasePath(doc)` dans `DocumentGenerator.tsx` qui retourne `CT{c}_IND_{i}/{folder}` quand `folder` est présent, sinon `CT{c}_IND_{i}` standard
- Utilisé dans les 3 fonctions ZIP : `handleDownloadAll`, `handleDownloadCritere`, `handleDownloadIndicateur`

Sous-dossiers générés dans `CT3_IND_10/14_MISSIONS_CFA/` :
- `Mission_1_Handicap` (livret référent, eval AGEFIPH, types handicap)
- `Mission_2_Mixite_Metiers` (plan d'actions mixité dans les métiers préparés)
- `Mission_3_Cooperation_CFA_Entreprise`
- `Mission_4_Activites_Citoyennes` (citoyennes, culturelles, sportives)
- `Mission_5_Rupture_Contrat`
- `Mission_6_Mixite_Egalite_FH` (plan + aides régionales : ARA, équipement, santé psy, Imagine R)
- `Mission_7_Accompagnement_Educatif_Social` (procédure accompagnement éducatif/social/pro)
- `Mission_9_Mobilite_Erasmus` (convention + procédure + diversité)
- `Mission_10_Mobilite_Nationale`
- `Mission_11_Aide_Recherche_Employeur` (procédure + tableau candidats)
- `Mission_12_Accueil_Tout_Moment` (procédure d'accueil permanent)
- `Mission_13_Formation_Maitre_Apprentissage` (attestation + accompagnement post-formation)
- `Mission_14_Conseil_Perfectionnement` (compte-rendu annuel L6231-3 / R6233-1)

Mission 8 (insertion pro) reste rattachée à `CT7_IND_30/14_MISSIONS_CFA/Mission_8_Insertion_Professionnelle/`.

Templates dédiés dans `src/lib/templatesCFA14Missions.ts` :
- `genPlanMixiteMetiersCFA` (Mission 2)
- `genProcedureAccompagnementEducatifSocialCFA` (Mission 7)
- `genProcedureAccueilToutMomentCFA` (Mission 12)
- `genConseilPerfectionnementCFA` (Mission 14)

Libellés affichés en UI préfixés par `📁 14 MISSIONS / Mission X – …` pour identification visuelle.

**Exercices (QCM) par mission, par stagiaire** :
- Template `qcm_mission_cfa` (dans `templatesCFA14Missions.ts` → `genQCMMissionCFA`) génère pour chaque mission un QCM de 10 questions thématiquement dédiées (handicap, mixité, coopération CFA/entreprise, citoyenneté, rupture, égalité F/H, accompagnement éducatif, insertion, Erasmus+, mobilité nationale, recherche d'employeur, accueil permanent, formation MA, conseil de perfectionnement).
- 1 entrée catalogue par mission × par stagiaire (`cfa_qcm_missionX_si`), placée dans le sous-dossier `14_MISSIONS_CFA/Mission_X_…`.
- Réponses stagiaire générées de façon déterministe (~80% de bonnes réponses), avec corrigé en vert et résultat /20.
- Mission 8 (insertion) reste en CT7 IND 30 ; toutes les autres en CT3 IND 10.
