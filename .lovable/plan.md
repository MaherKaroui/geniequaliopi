# Refonte BDC Qualiopi — trame NT Conseils

## Objectif
Remplacer intégralement le module Bilan de Compétences actuel par la structure exacte du dossier `AUDIT NT CONSEILS` que vous avez envoyé : 54 documents répartis sur 14 indicateurs, générés automatiquement, personnalisés par bénéficiaire, et datés intelligemment (jamais la date d'aujourd'hui — toujours calculés à partir des dates réelles du bilan).

## Périmètre — 54 documents par dossier

| Indicateur | Documents |
|---|---|
| **1** Information du public | Process général, Présentation BDC, Présentation BDC v2, Cadre légal, Calendrier annuel (xlsx) |
| **2** Indicateurs résultats | Indicateurs de résultats |
| **4** Analyse du besoin | Process analyse, Mail type handicap |
| **5** Objectifs | Outil préparatoire |
| **8** Positionnement | Test positionnement, Mail test positionnement |
| **9** Conditions déroulement | CGV, Règlement intérieur, Engagements déontologiques, Droit à l'image, Informations périphériques (présentiel), Certificat de réalisation, Mail début prestation, Mail envoi convention, Mail envoi certificat |
| **10** Adaptation | Convention prestation, Fiche pédagogique, Entretien intermédiaire, Adaptation accompagnement, Suivi adaptation (docx + xlsx) |
| **12** Engagement / abandons | Process abandons, Guide entretien abandons |
| **18** Coordination | Organigramme, Annuaire contacts |
| **21** Compétences intervenants | Process recrutement, Entretien recrutement, Entretien annuel x2, Fiches de poste (comptable x2, resp. administratif x2, commercial, communication, veille) |
| **23/24/25** Veilles | Process veilles (consolidé) |
| **26** Handicap | Process formations handicap x2, Partenaires nationaux, Contacts AGEFIPH (pdf statique), Contacts & suivi handicap (xlsx) |
| **27** Sous-traitance | Process sous-traitance, Contrat sous-traitance, Charte formateurs, Quiz Qualiopi |
| **30** Satisfaction | Process satisfaction, Questionnaire interne, entreprise, financeur |
| **31** Dysfonctionnements | Tableau dysfonctionnements (xlsx) |

## Logique d'automatisation

- **Personnalisation par bénéficiaire** : chaque doc nominatif (positionnement, convention, fiche pédagogique, entretien intermédiaire, certificat, satisfaction…) est généré pour chaque bénéficiaire du formulaire, en respectant la mémoire `bdc-personalization` (réponses variées par projet : CAP esthétique / CAP mécanique / NTC / autre).
- **Vocabulaire BDC** systématiquement : bénéficiaire, consultant, bilan (jamais stagiaire / formateur / formation).
- **Datage intelligent** (jamais `new Date()` brut) :
  - Convention, CGV, RI, engagements, droit image → **J-14 jours ouvrés** avant `dateDebutBilan` du bénéficiaire.
  - Test positionnement, mail début → `dateDebutBilan`.
  - Entretien intermédiaire → **mi-parcours** entre dateDebut et dateFin.
  - Certificat réalisation, satisfaction à chaud, fiche pédagogique finale → `dateFinBilan`.
  - Si `dateFinBilan` est **future** (bilan en cours) → certificat, satisfaction, fiche pédagogique finale = trames vides.
  - Process / organigramme / fiches de poste / veilles / annuaire / partenaires handicap / tableaux → datés à la **version organisme** (`org.dateMaj` ou 1er janvier de l'année du bilan).
- **Téléphone vide** → omis (mémoire existante).

## Implémentation technique

1. **Nouveau fichier** `src/lib/bdc/bdcNTConseils.ts` : générateur principal, fonction `generateBDCNTConseilsZip(org, formation, beneficiaires)` qui retourne un Blob ZIP avec l'arborescence exacte (`Indicateur N/...`).
2. **Templates** dans `src/lib/bdc/templates/` : un fichier par document (54 fichiers compacts, fonctions `(org, beneficiaire, dates) => htmlString`). Conversion HTML → DOCX via `html-to-docx` (déjà utilisé dans le projet) et XLSX via `xlsxGenerator` + `htmlToXlsx`.
3. **Branchement UI** : dans `DocumentGenerator.tsx`, quand le type d'action = "Bilan de compétences", le bouton "Télécharger tout" appelle `generateBDCNTConseilsZip` au lieu du pipeline générique. Suppression du catalogue BDC actuel (anciens documents BDC retirés de `getCatalog` / `getCatalogCFA` quand action = BDC).
4. **Fichiers supprimés** : `src/lib/templatesAF.ts` entrées BDC obsolètes, anciens mappings BDC dans `documentGenerator.ts` (uniquement les blocs BDC, le reste — CFA, AF, VAE, OPCO — reste intact).
5. **Nomenclature ZIP** : `BDC_{NomOrganisme}_{NomBeneficiaire}.zip` par bénéficiaire OU un seul ZIP global `BDC_{Organisme}_{Date}.zip` contenant tous les bénéficiaires dans des sous-dossiers — à confirmer ci-dessous.

## Question avant de lancer

Avant de coder ces 54 templates, j'ai besoin de confirmer **un** point :

**Structure du ZIP final** : voulez-vous
- (A) **un seul ZIP** par organisme avec tous les bénéficiaires regroupés (les docs individuels dans des sous-dossiers `Bénéficiaire - Prénom NOM/Indicateur N/...`, les docs collectifs à la racine sous `Indicateur N/...`) — **identique à la structure NT Conseils que vous avez envoyée**, ou
- (B) **un ZIP par bénéficiaire**, chacun avec sa propre arborescence complète des 14 indicateurs ?

Le dossier que vous m'avez envoyé est mono-bénéficiaire (structure A appliquée à 1 personne). Je pars sur **(A)** par défaut si vous validez le plan tel quel — dites-moi si vous préférez (B).
