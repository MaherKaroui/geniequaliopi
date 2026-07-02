# Module « Génération VAE »

Module 100 % indépendant du générateur Qualiopi existant. Aucune modification du flow actuel.

## 1. Accès

- Nouvelle carte sur la page d'accueil (`src/pages/Index.tsx`) : « Génération VAE — Dossier candidat complet » à côté des cartes existantes, avec icône dédiée (GraduationCap).
- Nouvelle route `/vae` dans `src/App.tsx` → `src/pages/VAE.tsx`.

## 2. Wizard 5 étapes (`src/pages/VAE.tsx` + `src/components/vae/*`)

Un state central (`VAEData`) traverse les 5 étapes, avec `StepIndicator` réutilisé.

### Étape 1 — Organisme accompagnateur
- Formulaire avec valeurs par défaut LCA DIGITAL (nom, adresse, SIRET, NDA, dirigeante, email, lien visio, référent handicap, prix, durée).
- Sauvegardé dans `localStorage` sous `vae_organisme` pour préremplir les prochains dossiers.

### Étape 2 — Certification France Compétences
- Champ recherche (nom de titre ou code RNCP).
- Appel edge function `fc-rncp-lookup` (voir §3) qui construit `https://www.francecompetences.fr/recherche/rncp/{n}/`, scrape/parse la fiche et retourne : intitulé, code RNCP, niveau, certificateur, date d'échéance, blocs de compétences.
- Affichage de la fiche + lien cliquable, avec fallback saisie manuelle en cas d'échec.

### Étape 3 — Candidat + CV
- Upload PDF/Word/image → edge function `vae-extract-cv` (Gemini 2.5 Pro multimodal, réutilise le pattern de `generate-cv`).
- Extraction : identité, coordonnées, emploi actuel, statut, diplômes, expériences chronologiques complètes.
- Formulaire modifiable pré-rempli.
- Bouton « Je n'ai pas de CV » → mini-questionnaire → edge function `vae-generate-cv` qui rédige un CV orienté certification, téléchargeable en Word (via `wordExport.ts`) et injecté dans le state.

### Étape 4 — Dossier / session
- Dates : entretien positionnement, début, fin, demande recevabilité, signature.
- Modalité (défaut « 100 % à distance »), financement (défaut CPF), lieu de signature.

### Étape 5 — Génération IA + aperçu
- Edge function `vae-generate-contents` : à partir du CV + certification + organisme, rédige les textes personnalisés de chaque document (motivation, situations de travail par bloc de compétences, réponses évaluation des besoins, plan d'accompagnement, etc.).
- Aperçu par document avec `<Textarea>` éditable par section.
- Bouton « Générer le dossier » → produit un ZIP `.docx` (JSZip + `wordExport.ts`).

## 3. Edge functions (Lovable AI Gateway)

Toutes protégées par JWT (pattern `__requireAuth` existant), CORS standard.

- `supabase/functions/fc-rncp-lookup/index.ts` : `fetch` la page francecompetences.fr, parse HTML (regex/cheerio via `npm:`) ou tombe sur l'API publique si disponible. Retourne JSON structuré.
- `supabase/functions/vae-extract-cv/index.ts` : multimodal `google/gemini-2.5-pro` + tool call `extract_vae_candidat` (schéma étendu par rapport à `generate-cv`).
- `supabase/functions/vae-generate-cv/index.ts` : `google/gemini-2.5-flash` génère un CV structuré à partir du mini-questionnaire, orienté certification visée.
- `supabase/functions/vae-generate-contents/index.ts` : `google/gemini-2.5-pro`, un tool call par section (motivation, situations par bloc, besoins, plan). Retourne un objet `VAEContents`.

## 4. Génération des documents Word (`src/lib/vae/`)

Nouveau dossier isolé, ne touche pas à `src/lib/vi/`.

- `vaeTypes.ts` — types (`VAEOrganisme`, `VAECertification`, `VAECandidat`, `VAESession`, `VAEContents`, `VAEData`).
- `vaeTemplates.ts` — templates HTML de chaque document (footer légal, dates longues FR, style minimaliste bleu/blanc conforme aux règles projet). Documents générés :
  1. Convention d'accompagnement VAE (tripartite si employeur, sinon bilatérale)
  2. Livret 1 — Demande de recevabilité (pré-rempli à partir du CV)
  3. Livret 2 — Trame guidée par bloc de compétences (situations de travail détaillées issues du CV)
  4. Programme d'accompagnement (40 h à distance)
  5. Évaluation des besoins candidat (réponses IA)
  6. Plan d'accompagnement personnalisé
  7. Devis / conditions financières
  8. Attestation d'entrée en accompagnement
  9. Livret de suivi (séances datées, midpoint entretien intermédiaire — règle `vae-session-scheduling` existante)
  10. Fiche récapitulative certification (lien France Compétences + blocs)
- `vaeGenerator.ts` — assemble tout en ZIP via JSZip, nommage `VAE_{nom}_{prenom}_{code}.docx`.

## 5. Détails techniques

- Réutilise `wordExport.ts` (`htmlToWordBlob`) pour chaque document.
- Réutilise `SignaturePad` / `LogoSignatureUpload` pour la signature organisme.
- Dates au format long FR (règle mémoire).
- Téléphone omis si vide (règle mémoire).
- Footer légal complet (règle mémoire).
- Aucune modif de `src/lib/vi/*`, `feuilleRouteQualiopi*`, `Index.tsx` sauf ajout de la carte.

## 6. Fichiers créés / modifiés

**Créés**
- `src/pages/VAE.tsx`
- `src/components/vae/StepOrganisme.tsx`, `StepCertification.tsx`, `StepCandidat.tsx`, `StepSession.tsx`, `StepGeneration.tsx`
- `src/lib/vae/vaeTypes.ts`, `vaeTemplates.ts`, `vaeGenerator.ts`
- `supabase/functions/fc-rncp-lookup/index.ts`
- `supabase/functions/vae-extract-cv/index.ts`
- `supabase/functions/vae-generate-cv/index.ts`
- `supabase/functions/vae-generate-contents/index.ts`

**Modifiés (minimes)**
- `src/App.tsx` — ajout route `/vae`
- `src/pages/Index.tsx` — ajout carte « Génération VAE »
