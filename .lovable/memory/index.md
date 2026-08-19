# Memory: index.md
Updated: just now

# Project Memory

## Core
Générateur Qualiopi (7 criteria, 32 indicators). Must produce realistic, audit-ready data.
Every generated document MUST be dated. Use long French dates (e.g., "4 novembre 2024").
Minimalist style. Blue/white alternating table rows. 'X' for auto grids, ☐/☒ for manual/Word.
Footers: Bold org name, SIRET, NDA, version/date. Never truncate.
Individual trainee data (dates, prices) ALWAYS overrides global data.
Omit empty optional fields entirely (no dashes or empty sections). Telephone: if empty, omit completely.
Unfinished training (latest end date not passed): final evaluations/tests must remain empty.

## Memories
- [project/context](mem://project/context) — Qualiopi generator for training compliance, 7 criteria, 32 indicators
- [style/aesthetic](mem://style/aesthetic) — Minimalist style, table row colors, checkbox characters
- [features/personalization-engine](mem://features/personalization-engine) — Trainee responses in target language for language courses
- [logic/document-dating](mem://logic/document-dating) — Date calculation rules (-14 work days, BDC/VAE variations)
- [logic/evaluation-scoring](mem://logic/evaluation-scoring) — Progression scoring (5-7 to 8-10) and realistic satisfaction patterns
- [logic/gender-adaptation](mem://logic/gender-adaptation) — Grammar and civility adaptation via regex for M./Mme
- [features/monitoring-veille-logic](mem://features/monitoring-veille-logic) — Domain-specific regulatory watch generation
- [project/curricula](mem://project/curricula) — Supported RNCPs and specialized content (NTC, CIP, etc.)
- [features/pdf-export-logic](mem://features/pdf-export-logic) — Pagination, header/footer spacing, max-heights
- [features/document-templates/liste-partenaires](mem://features/document-templates/liste-partenaires) — Partner list layout and stamp placement
- [features/training-plan/formation-plan-logic](mem://features/training-plan/formation-plan-logic) — CT5-IND 22 N+1 strategic paths based on specialty
- [features/document-templates/pedagogical-sequence](mem://features/document-templates/pedagogical-sequence) — AF - CT2 IND 5 8-column layout and specific hour distributions
- [project/file-naming-convention](mem://project/file-naming-convention) — Standardized file nomenclature and Qualiopi/EDOF folder structure
- [features/file-import-audit](mem://features/file-import-audit) — Mass rename/audit engine with Levenshtein distance
- [features/document-templates/cfa-apprenticeship-agreement](mem://features/document-templates/cfa-apprenticeship-agreement) — CFA CT3-IND 9 tripartite agreement logic
- [features/rncp-automation](mem://features/rncp-automation) — Auto-generation of IND 5 and exam PVs on RNCP insertion
- [features/document-templates/training-program-content](mem://features/document-templates/training-program-content) — IND 1 specific sections, trainers list, and fixed mentions
- [style/document-footer](mem://style/document-footer) — Mandatory legal footer content and versioning
- [logic/date-formatting](mem://logic/date-formatting) — Use long French format for dates
- [project/default-organization](mem://project/default-organization) — Default 'SELECT FORMATION' details
- [features/document-templates/organigramme](mem://features/document-templates/organigramme) — Dynamic quality and administrative roles extraction
- [features/document-templates/observation-grid](mem://features/document-templates/observation-grid) — Commercial title grids in JSON with realistic CRAC evaluations
- [logic/attendance-logic](mem://logic/attendance-logic) — 100% presence, morning/afternoon blocks, white bg
- [features/trainee-form/extended-fields](mem://features/trainee-form/extended-fields) — Trainee metadata (NIR, RQTH, Action ID) for EDOF/CFA
- [features/document-templates/cfa-recruitment-logic](mem://features/document-templates/cfa-recruitment-logic) — Recruitment docs, vertical checkboxes, dynamic mail templates
- [features/document-templates/cfa-synopsis-logic](mem://features/document-templates/cfa-synopsis-logic) — CFA alternate weeks calendar synced across all docs
- [logic/data-priority-rules](mem://logic/data-priority-rules) — Individual dates overwrite global dates for audits
- [features/document-templates/cfa-exercise-content](mem://features/document-templates/cfa-exercise-content) — Authentic exercise scenarios mapped to RNCP blocks
- [logic/exercise-dating](mem://logic/exercise-dating) — Exercise dating (CFA Tue/Thu, RS last day, blank if future)
- [features/edof-import-logic](mem://features/edof-import-logic) — EDOF Excel parsing and metadata normalization
- [features/document-templates/needs-assessment](mem://features/document-templates/needs-assessment) — IND 11 individual dates and contextual responses
- [features/document-templates/performance-dashboard](mem://features/document-templates/performance-dashboard) — IND 2 monthly breakdown and VAE specific terminology
- [logic/assessment-dating-logic](mem://logic/assessment-dating-logic) — Bilan à chaud (last day) vs Bilan à froid (no precise date)
- [features/document-templates/training-program-sessions](mem://features/document-templates/training-program-sessions) — Replace session table with "Sessions en [Year]" if dates are individual
- [features/document-templates/individual-emargement](mem://features/document-templates/individual-emargement) — Individual attendance sheets based on specific dates
- [logic/exam-grading-logic](mem://logic/exam-grading-logic) — Guaranteed positive results (15-20/20 for certs) for audit proofs
- [features/document-templates/connection-reports](mem://features/document-templates/connection-reports) — LMS logs generation with workday IP/time variations
- [features/document-templates/annual-trainer-interview](mem://features/document-templates/annual-trainer-interview) — IND 22 pre-filled stats synced with trainee dates
- [features/trainee-form/trainer-assignment](mem://features/trainee-form/trainer-assignment) — Individual trainer assignment and personalized document generation
- [features/document-templates/trainer-compliance-reports](mem://features/document-templates/trainer-compliance-reports) — IND 18/30 trainer-specific filtering and stats
- [logic/new-entrant-compliance](mem://logic/new-entrant-compliance) — VAE/CFA ongoing neutralizes historical stats ("Phase de lancement")
- [logic/mandatory-dating](mem://logic/mandatory-dating) — All generated documents must be dated
- [logic/vae-session-scheduling](mem://logic/vae-session-scheduling) — 10 sessions spread evenly, intermediate interview at midpoint
- [features/document-templates/vae-needs-analysis](mem://features/document-templates/vae-needs-analysis) — IND 4 tripartite signatures and pre-filled 6-year history
- [features/document-templates/tripartite-training-convention](mem://features/document-templates/tripartite-training-convention) — Trainee + Company + Org convention logic
- [features/document-templates/ind11-evaluation-logic](mem://features/document-templates/ind11-evaluation-logic) — IND 11 full evaluation disguised as "EXERCICES PRATIQUES"
- [logic/ind11-redundancy-skip](mem://logic/ind11-redundancy-skip) — Skip single-day exercise blocks at end of odd-duration trainings
- [features/document-templates/dropout-prevention-af](mem://features/document-templates/dropout-prevention-af) — IND 12 left empty for Actions de Formation
- [features/document-templates/cfa-annual-calendar](mem://features/document-templates/cfa-annual-calendar) — IND 6 52-week calendar, August holidays, leftover review weeks
- [features/document-templates/cfa-course-support](mem://features/document-templates/cfa-course-support) — IND 6 >30 pages PDF by RNCP blocks
- [features/document-templates/cfa-excel-planning](mem://features/document-templates/cfa-excel-planning) — IND 6 Excel REAC structure with transversal modules
- [features/document-templates/monitoring-indicators-ind7](mem://features/document-templates/monitoring-indicators-ind7) — IND 7 synced with calendar, mapped eval scores
- [features/document-templates/cfa-connection-guide](mem://features/document-templates/cfa-connection-guide) — IND 9 conditional on distanciel/e-learning modality
- [features/document-templates/cfa-enrollment-tracking](mem://features/document-templates/cfa-enrollment-tracking) — IND 9 Excel 17 columns enrollment tracking
- [features/document-templates/continuous-improvement](mem://features/document-templates/continuous-improvement) — IND 32 contextual corrective actions based on domain
- [logic/solo-trainee-adaptation](mem://logic/solo-trainee-adaptation) — Roleplay and criteria adapted for individual work if 1 trainee
- [features/document-templates/pedagogical-resources](mem://features/document-templates/pedagogical-resources) — IND 18 contextual resource links (Copilot, TOSA, etc.)
- [features/visual-theme-engine](mem://features/visual-theme-engine) — 8 visual themes, headers, H1/H2 styles, 48 fonts
- [features/document-templates/cfa-compliance-catalog](mem://features/document-templates/cfa-compliance-catalog) — CFA specific catalog structure (IND 18, 19, 20, 28, 29)
- [features/document-templates/cfa-static-resources](mem://features/document-templates/cfa-static-resources) — Fixed PDF resources in public/pdfs (Citoyenneté, Handicap, etc.)
- [features/document-templates/signatures-and-stamps-logic](mem://features/document-templates/signatures-and-stamps-logic) — Regex-based role resolution for stamp vs signature
- [features/audit/ey-control](mem://features/audit/ey-control) — EY 68 documents audit control module
- [logic/conditional-rendering-empty-fields](mem://logic/conditional-rendering-empty-fields) — Omit empty fields entirely
- [logic/cfa-modality-adaptation](mem://logic/cfa-modality-adaptation) — Content shifts for Distanciel vs Présentiel
- [features/trainee-form/signatures-management](mem://features/trainee-form/signatures-management) — Image upload or Canvas drawing for signatures
- [features/document-templates/cfa-block-contract](mem://features/document-templates/cfa-block-contract) — Block contract specific to EDOF action numbers
- [features/document-templates/edof-invoice](mem://features/document-templates/edof-invoice) — EDOF Invoice variations and financial conditions
- [logic/bilateral-action-de-formation-logic](mem://logic/bilateral-action-de-formation-logic) — Action de formation bilateral (Org + Trainee only)
- [style/facebook-label-adaptation](mem://style/facebook-label-adaptation) — 'Page Facebook' label if URL matches facebook
- [logic/cfa-domain-coherence-logic](mem://logic/cfa-domain-coherence-logic) — Partial filling for ongoing sessions based on current date
- [features/document-templates/bdc-monitoring](mem://features/document-templates/bdc-monitoring) — BDC IND 23/24/25 consolidated Fiche de Veille
- [features/document-templates/bdc-action-type](mem://features/document-templates/bdc-action-type) — BDC terminology (bénéficiaire) and removed signatures
- [features/document-templates/bdc-personalization](mem://features/document-templates/bdc-personalization) — BDC proofs personalized per beneficiary and coherent with CAP esthétique, CAP mécanique, NTC
- [features/bdc/refonte-conformite](mem://features/bdc/refonte-conformite) — Socle BDC : source unique de vérité, anti-fabrication, validation bloquante, templates obligatoires, vocabulaire BC

- [logic/completion-status-logic](mem://logic/completion-status-logic) — isFormationTerminee based on latest end date
- [features/audit/ey-control-bac-pro](mem://features/audit/ey-control-bac-pro) — Bac Pro 22 docs for 9 trainees with high scores
- [features/document-templates/vae-pack](mem://features/document-templates/vae-pack) — VAE Livret 2, Séquençage, and role signatures
- [features/document-templates/subcontracting-agreement](mem://features/document-templates/subcontracting-agreement) — IND 27 dynamic subcontracting (IZIBUSINESS for BDC)
- [technical/pdf-export-stability](mem://technical/pdf-export-stability) — -99999px absolute positioning and contain: strict for PDF generation
- [logic/bac-pro-randomization](mem://logic/bac-pro-randomization) — Deterministic variation for exams based on trainee/question index
- [logic/edof-export-uniqueness](mem://logic/edof-export-uniqueness) — Permissive trainee filtering and standard file names for ZIPs
- [features/zip-export-optimization](mem://features/zip-export-optimization) — GC pauses, canvas clearRect, and scale down for large ZIP exports
- [logic/audit-realism](mem://logic/audit-realism) — Concrete domains and rich realistic data for audits
- [features/document-templates/bdc-filling-logic](mem://features/document-templates/bdc-filling-logic) — BDC specific blank vs filled document logic
- [logic/mid-term-date-calculation](mem://logic/mid-term-date-calculation) — Midpoint calculation for Bilan intermédiaire (Code 33)
- [features/trainee-form/auto-import-logic](mem://features/trainee-form/auto-import-logic) — Predefined trainees auto-import for quick generation
- [logic/empty-phone-omission](mem://logic/empty-phone-omission) — If phone is empty, omit entirely from all documents
- [logic/emargement-connexion-mixte](mem://logic/emargement-connexion-mixte) — Émargement/connexion : mixte alterné jour par jour, jours futurs en blanc
- [features/audit/opco-calendrier-alternance](mem://features/audit/opco-calendrier-alternance) — Calendrier OPCO B9 : rythme alternance, démarrage école, 7h/jour
- [features/audit/opco-trames-vierges](mem://features/audit/opco-trames-vierges) — ZIP B9 et C11 : trame vierge ajoutée par session en plus du PDF rempli
- [features/audit/cfa-prepa-audit-dreamers](mem://features/audit/cfa-prepa-audit-dreamers) — Pack CFA (Book + Feuille de route + Guide audit + 18 docs gaps) format Dreamers Team V9 nouvel entrant
- [logic/horaires-cours-du-soir](mem://logic/horaires-cours-du-soir) — Cours du soir 18h-22h + samedi 9h-17h30 (PSH/Nouira : 9h-17h). OPCO/CFA gardent rythme journée.
- [logic/rythme-alternance-parser](mem://logic/rythme-alternance-parser) — Parser rythme alternance : 3 formats (semaines, jours, heures ex 910h/280h)
- [logic/bilan-froid-empty-if-not-finished](mem://logic/bilan-froid-empty-if-not-finished) — Bilan à froid (CODE 58bis / IND 30 / OPCO C10) vide tant que formation non terminée
- [logic/coherence-formation-besoins-evals](mem://logic/coherence-formation-besoins-evals) — Analyse besoins + questions ouvertes générées dynamiquement à partir des objectifs/programme réels
- [logic/positionnement-fin-empty-if-not-finished](mem://logic/positionnement-fin-empty-if-not-finished) — Test de positionnement de fin (OPCO C6) en trame vierge tant que formation non terminée
- [features/audit/cfa-visuels-14-missions](mem://features/audit/cfa-visuels-14-missions) — Affiches HD 14 missions dans CT3 IND 14, sous-dossier VISUELS_14_MISSIONS
- [logic/veille-cache-persistence](mem://logic/veille-cache-persistence) — Pack veilles IA persisté en localStorage, jamais effacé sauf bouton "Régénérer"
- [features/bdc-nt-conseils](mem://features/bdc-nt-conseils) — BDC trame NT Conseils : 51 docs + 5 trames, ZIP unique, ancien catalogue BDC supprimé
