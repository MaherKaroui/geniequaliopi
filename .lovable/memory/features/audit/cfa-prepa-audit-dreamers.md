---
name: CFA Prépa Audit Dreamers
description: Pack spécial CFA (Book + Feuille de route + Guide audit) reproduisant la matrice Dreamers Team V9 nouvel entrant
type: feature
---
Pack "Prépa audit Qualiopi CFA" déclenché si `typesActions` inclut `apprentissage` :
- `src/lib/qualiopiReferenceCFA.ts` : référentiel V9 des 32 indicateurs (niveau attendu, script "ce qu'il faut dire", preuves, nouvel entrant, pondération NC mineure/majeure, vigilance).
- `src/lib/bookQualiopiCFA.ts` : Book PDF/DOC bleu/orange ("CFA · NOUVEL ENTRANT") avec 32 fiches indicateurs croisées avec catalog réel.
- `src/lib/feuilleRouteQualiopiCFA.ts` : XLSX 7 colonnes au format Dreamers Team (Critère / N° / Indicateur / Niveau V9 / Ce qu'il faut dire / Documents / Vigilance). Les 8 indicateurs CFA spécifiques (13,14,15,16,20,27,28,32) sont en orange (#FED7AA).
- `src/lib/guideAuditCFA.ts` : Guide DOCX/HTML "Quoi dire à l'auditeur" par indicateur.
- `src/lib/templatesCFAGapsAudit.ts` : 18 générateurs comblant les gaps de preuves identifiés (grille compétences alternance nominative, QCM 14 missions, attestation livret SST, convention certificateur, PV de session générique, inventaire moyens, fiches de poste, CR réunion pédagogique, guide assistance FOAD, lettres de mission mobilité/handicap, grille recrutement + évaluation formateur, entretien pro annuel, fiche de veille consolidée, annuaire partenaires handicap, annuaire entreprises partenaires, CR coconstruction branche, questionnaires satisfaction entreprise/financeur, tableau relances, plan insertion/ruptures).
- 3 boutons UI dans `DocumentGenerator.tsx` (carte orange "PRÉPA AUDIT QUALIOPI CFA"), visible seulement si CFA.
- Indicateurs nouvel entrant : 2, 3, 11, 13, 14, 19, 22, 24, 25, 26, 32 (formalisation auditée à l'initial, mise en œuvre à la surveillance).
