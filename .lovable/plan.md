## Analyse des 3 fichiers Dreamers Team

Les 3 fichiers (MEMO PDF, GUIDE DOCX, FEUILLE DE ROUTE XLSX) décrivent la **même** matrice : pour chacun des **32 indicateurs Qualiopi V9**, ils donnent :
1. Le niveau attendu par l'auditeur (avec mention NOUVEL ENTRANT / pondérable / NC majeure)
2. Le script "Ce qu'il faut dire"
3. La liste des **documents à présenter** (preuves)
4. Les points de vigilance

C'est un dossier de **préparation à l'audit initial Qualiopi CFA pour nouvel entrant** — exactement le périmètre que doit couvrir automatiquement notre générateur CFA.

## Gap analyse — Couverture actuelle vs documents requis

J'ai croisé la liste des preuves listées dans les 3 fichiers avec les générateurs CFA actuels (`templatesCFA.ts`, `templatesCFA14Missions.ts`, `templatesCFAOfficiels.ts`, `documentGenerator.ts`).

### ✅ Déjà couverts (~85%)
Fiche formation, plaquette, procédure d'inscription, CGV, livret d'accueil, indicateurs résultats, fiche RNCP, grille entretien candidat, procédure besoins, fiche besoins PSH, programme, synopsis, REAC, test positionnement, livret apprentissage, suivi entreprise, outils suivi alternance Excel, droits/devoirs, règles SST, livret SST, mesures engagement, prévention abandons, guide entretien abandons, logs connexion, suivi public/PFMP, ressources citoyenneté (PDFs), webinaires, aides sociales, ateliers CV/entretien, plan 14 missions, plan mixité F/H, conv. mobilité Erasmus, attestation MA, coopération CFA/entreprise, conseil perfectionnement, sous-traitance, charte qualité formateur, mandat Qualiopi, plan dev compétences, veilles, réseau handicap, réseau socio-éco, bilan chaud/froid, questionnaires satisfaction, registre réclamations, amélioration continue.

### ❌ Documents manquants ou à compléter (gaps réels)

**Critère 1**
- **IND 2** : capture de la page web publiant les indicateurs + lien InserJeunes pré-rempli (existe partiellement pour NTC seulement, à étendre à tout CFA et générer la capture preuve).
- **IND 3** : tableau croisé compétences/programme normalisé (existe mais à fiabiliser pour tout RNCP CFA).

**Critère 3**
- **IND 13** : **Grille de compétences alternance** dédiée (visite tuteur). Existe en partiel dans le livret, mais pas en document autonome au nom du stagiaire.
- **IND 14** : **QCM "Connaître les 14 missions du CFA"** rempli par l'apprenti (preuve d'appropriation, pas seulement le plan).
- **IND 15** : **Attestation de remise du livret SST** signée (preuve nominative).
- **IND 16** : **Convention/habilitation certificateur** + **PV de session** type (existe pour NTC, à généraliser).

**Critère 4**
- **IND 17** : **Inventaire daté des moyens** (matériel, licences, locaux) — pas de template autonome.
- **IND 18** : **Organigramme + fiches de poste + CR réunion équipe pédagogique** datés (organigramme OK, fiches de poste et CR manquent).
- **IND 19** : **Guide d'assistance technique et pédagogique FOAD** (art. D.6313-3-1) — manquant.
- **IND 20** : **Lettre de mission Référent mobilité** + **lettre de mission Référent handicap** + **PV conseil de perfectionnement** (le conseil de perf existe, les 2 lettres de mission manquent).

**Critère 5**
- **IND 21** : **Grille de recrutement formateur** + **procédure de sélection** + **grille d'évaluation pédagogique formateur** — manquants en autonomes.
- **IND 22** : **Entretien professionnel annuel** des intervenants (template à dédier CFA).

**Critère 6**
- **IND 23/24/25** : **Fiche de veille consolidée CFA** (réglementaire/métiers/pédagogique) — existe pour AF, à dupliquer en version CFA avec exploitation.
- **IND 26** : **Procédure d'accueil PSH spécifique CFA** + **annuaire partenaires handicap apprentissage** (Agefiph alternance, missions handicap OPCO, etc.).
- **IND 28** : **Annuaire entreprises partenaires** signé + **CR coconstruction ingénierie avec une branche pro** — manquant.

**Critère 7**
- **IND 29** : **Questionnaire satisfaction commanditaire (entreprise/MA)** et **questionnaire financeur (OPCO)** distincts du questionnaire apprenant — actuellement fusionnés.
- **IND 30** : **Tableau de relances des appréciations** daté — manquant en autonome.
- **IND 32** : **Plan d'action insertion / réduction des ruptures** spécifique CFA (existe en générique amélioration continue, à dédier).

### 📦 Transversal manquant
- Un **"Book Qualiopi CFA"** dédié (équivalent du Book actuel mais avec les 32 indicateurs adaptés CFA, la mention nouvel entrant, et la pondération NC mineure/majeure par indicateur — comme le MEMO PDF).
- Une **"Feuille de route Qualiopi CFA"** au format exact du XLSX Dreamers Team (7 colonnes : Critère, N°, Indicateur, Niveau attendu V9, Ce qu'il faut dire, Documents à présenter, Vigilance) — actuellement la feuille de route existante ne contient pas les colonnes "Niveau attendu V9" ni "Ce qu'il faut dire".
- Un **Guide DOCX "Quoi dire à l'auditeur"** par indicateur (équivalent du DOCX Dreamers Team) — n'existe pas du tout aujourd'hui.

## Plan d'implémentation

### Étape 1 — Référentiel central CFA V9
Créer `src/lib/qualiopiReferenceCFA.ts` contenant pour les 32 indicateurs : niveau attendu V9, statut "nouvel entrant", pondération (NC mineure/majeure), script "ce qu'il faut dire", liste preuves attendues. Source : les 3 fichiers Dreamers Team.

### Étape 2 — Générateurs manquants (18 documents)
Ajouter dans `src/lib/templatesCFA14Missions.ts` (ou nouveau `templatesCFAGapsAudit.ts`) :
- `grille_competences_alternance_cfa` (IND 13)
- `qcm_14_missions_apprenti_cfa` (IND 14)
- `attestation_remise_livret_sst_cfa` (IND 15)
- `convention_certificateur_cfa`, `pv_session_cfa_generique` (IND 16)
- `inventaire_moyens_cfa` (IND 17)
- `fiches_poste_cfa`, `cr_reunion_pedagogique_cfa` (IND 18)
- `guide_assistance_foad_cfa` (IND 19)
- `lettre_mission_referent_mobilite_cfa`, `lettre_mission_referent_handicap_cfa` (IND 20)
- `grille_recrutement_formateur_cfa`, `grille_evaluation_pedagogique_cfa` (IND 21)
- `entretien_professionnel_annuel_cfa` (IND 22)
- `fiche_veille_consolidee_cfa` (IND 23/24/25)
- `annuaire_partenaires_handicap_cfa` (IND 26)
- `annuaire_entreprises_partenaires_cfa`, `cr_coconstruction_branche_cfa` (IND 28)
- `questionnaire_satisfaction_entreprise_ma_cfa`, `questionnaire_satisfaction_financeur_cfa` (IND 29)
- `tableau_relances_appreciations_cfa` (IND 30)
- `plan_insertion_reduction_ruptures_cfa` (IND 32)

Tous brandés, datés (long français), avec footer org/SIRET/NDA conformément à `mem://style/document-footer`.

### Étape 3 — Catalog CFA enrichi
Dans `documentGenerator.ts` (`getFullCatalog`) ajouter chaque nouvelle entrée avec son couple `(critere, indicateur)` correct, conditionnée à `isCFA = typesActions.includes('apprentissage')`.

### Étape 4 — 3 livrables "prépa audit CFA"
Nouveaux générateurs alignés sur les 3 fichiers Dreamers Team :
1. `src/lib/bookQualiopiCFA.ts` → Book PDF CFA (MEMO + GUIDE fusionnés, 32 fiches indicateurs avec script + preuves + vigilance + statut nouvel entrant).
2. `src/lib/feuilleRouteQualiopiCFA.ts` → XLSX 7 colonnes au format exact Dreamers Team, alimenté par le catalog CFA réel.
3. `src/lib/guideAuditCFA.ts` → DOCX/HTML "Quoi dire à l'auditeur" par indicateur.

### Étape 5 — UI
Dans `DocumentGenerator.tsx`, ajouter à côté de "Book Qualiopi" et "Feuille de route Excel" :
- bouton **"Book Qualiopi CFA"** (visible uniquement si `isCFA`)
- bouton **"Feuille de route CFA (Excel)"**
- bouton **"Guide audit CFA (Quoi dire)"**

### Étape 6 — Mémoires
Mettre à jour `mem://index.md` avec un pointeur `features/audit/cfa-prepa-audit-dreamers` documentant ce pack.

## Périmètre

- ✅ Tout-frontend / data — pas de backend.
- ✅ Tous les documents existants restent intacts.
- ✅ Aucune dépendance externe ajoutée (xlsx et html-to-docx déjà présents).
- ⚠ Charge : ~18 nouveaux générateurs + 3 packs + référentiel + UI. Reste contenue car les templates sont courts (1-3 pages) et suivent les patterns existants.

Souhaitez-vous que j'avance sur tout le plan, ou que je commence d'abord par les 3 livrables transversaux (Book CFA + Feuille de route CFA + Guide audit CFA) qui couvrent immédiatement 100% des indicateurs au format Dreamers Team, puis les 18 documents manquants dans une seconde itération ?
