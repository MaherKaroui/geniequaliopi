---
name: Refonte conformité BDC (audit blanc 92 écarts)
description: Socle BDC — source unique de vérité, anti-fabrication, validation bloquante V01-V23, templates obligatoires, vocabulaire BC, droit à jour.
type: feature
---
Architecture du module Bilan de compétences (ne pas contourner) :

- `src/lib/bdc/bdcModel.ts` — SOURCE UNIQUE DE VÉRITÉ (Organisme / Beneficiaire / Prestation). Aucune valeur en dur dans un template. `formatDuree()` est la SEULE fonction qui écrit la phrase de durée. Dérivations : NDA (`mentionNDA`), TVA exonérée 261-4-4°a (`formatPrix`), tribunal et région depuis le code postal, contrat tripartite (employeur, 10 j d'acceptation) vs bipartite (14 j de rétractation, CPF 4 j ouvrés).
- `src/lib/bdc/bdcCompliance.ts` — anti-fabrication (aucun verbatim, réponse de questionnaire, test, entretien généré : champs vides + filigrane), statuts RENSEIGNE / NON_APPLICABLE / SOLLICITE_SANS_REPONSE, règle CPF, détecteur de duplication (>40 caractères identiques entre bénéficiaires = blocage), dictionnaire vocabulaire BC, mentions abrogées (CIF, OPCA, FONGECIF, DIF, Pôle emploi, Datadock, plan de formation, attestation de présence, R6322-*), corrections orthographe et résidus Markdown.
- `src/lib/bdc/bdcTemplatesBC.ts` — pièces obligatoires : document de synthèse R6313-8, feuilles d'émargement par séance, satisfaction à chaud/à froid (échelle continue 1 à 5), accord de conservation/destruction, autorisation de transmission, réclamation et médiation, livret d'accueil, planning signé, infos distanciel, fiches de poste réelles, process handicap, tableau d'amélioration continue, clauses BC (confidentialité, propriété du document de synthèse au bénéficiaire, conflit d'intérêts, RGPD, harcèlement).
- `src/lib/bdc/bdcValidation.ts` — V01→V23 bloquantes + alertes + couverture (indicateurs 3, 7, 13, 14, 15, 20, 29 non applicables en BC).
- `src/components/BdcControleCoherence.tsx` — écran obligatoire avant export ZIP BDC.

Règle : durée BC ≤ 24 h, séquençage contraint aux 3 phases (préliminaire / investigation / conclusion), séances calées sur les jours disponibles du bénéficiaire.
