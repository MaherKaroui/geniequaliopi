---
name: BDC – trame NT Conseils (51 docs + 5 trames)
description: Dossier Bilan de compétences entièrement aligné sur la trame NT Conseils ; remplace l'ancien catalogue BDC.
type: feature
---
Quand `typesActions` contient `bilans-competences`, le module BDC du projet bascule sur la trame NT Conseils :

- Source : `src/lib/bdc/bdcNTSource.ts` contient les 51 textes markdown extraits du dossier de référence (AUDIT NT CONSEILS, 14 indicateurs).
- Générateur : `src/lib/bdc/bdcNTConseilsZip.ts` (`buildBDCNTConseilsZip`) produit le ZIP final via `htmlToWordBlob` + JSZip.
- Structure ZIP :
  - Documents collectifs (process, organigrammes, veilles, sous-traitance, fiches de poste…) à la racine de `Indicateur N/`.
  - Documents nominatifs (test positionnement, CGV, RI, convention, fiche pédagogique, satisfaction interne…) dans `Bénéficiaire - Prénom NOM/Indicateur N/`.
  - Assets statiques (`/pdfs/bdc_nt/`) : Calendrier annuel.xlsx, Suivi adaptation.xlsx, Contacts handicap.xlsx, Contacts AGEFIPH.pdf, Tableau dysfonctionnements.xlsx.
- Substitutions automatiques sur le markdown source : `NT CONSEILS` → `org.nom`, adresse/SIRET/email/dates remplacés. `01/01/2026` → `org.dateMaj`.
- Datage intelligent : convention = J-14 jours ouvrés avant `dateDebutFormation`, mi-parcours = milieu de la formation, certificat = `dateFinFormation` (vide si bilan non terminé).
- Le bouton « Télécharger le dossier complet » de `DocumentGenerator.tsx` détecte `isBDCOrg` et appelle `buildBDCNTConseilsZip` au lieu de `buildFullDossierZip`.
- Le catalogue `docCatalog.ts` ne contient qu'une seule entrée BDC (`bdc_nt_dossier_complet`) ; tous les anciens documents BDC individuels ont été supprimés.

Liste des documents nominatifs (générés par bénéficiaire) dans `BDC_NT_PER_BENEFICIAIRE` :
Indicateur 4 (Mail handicap), 5 (Outil préparatoire), 8 (Test positionnement + mail), 9 (CGV, RI, Engagements déontologiques, Droit à l'image, Certificat réalisation, 3 mails), 10 (Convention, Fiche pédagogique, Entretien intermédiaire, Suivi adaptation), 30 (Questionnaire satisfaction interne).
