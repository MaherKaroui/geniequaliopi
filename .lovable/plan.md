## Objectif

Intégrer une formation exemple **« Maquilleur Professionnel »** (5 jours, 2100 €, 6 stagiaires, session passée entièrement remplie) dans le générateur Qualiopi, avec :
- Préréglage importable (formation + organisme + 6 stagiaires)
- Module de contenu pédagogique dédié (support de cours métier)
- Contenus IA (éval besoins, QCM début/fin, 5 exercices, éval finale) qui se génèrent automatiquement sur ce titre

---

## 1. Nouveau module `src/lib/courseContentMaquillage.ts`

Fichier calqué sur `courseContentEsthetique.ts` (même structure `CourseChapter[]`) mais 100 % centré maquillage pro. **8 modules alignés sur le programme fourni** :

| Module | Contenu |
|---|---|
| M1 – Accueil client & hygiène | Protocole d'accueil, questions ouvertes, désinfection pinceaux (alcool 70°, spray), DASRI, cycle par cliente |
| M2 – Diagnostic peau & morphologie | Types de peau (normale/sèche/grasse/mixte/sensible/mature), formes de visage (ovale/rond/carré/long/triangle/cœur), colorimétrie (sous-tons chauds/froids/neutres), carnation Fitzpatrick I à VI |
| M3 – Préparation peau & correction | Démaquillage bi-phase, tonique, sérum, hydratation, base lissante, correction verte/mauve/pêche/orange selon imperfection |
| M4 – Fond de teint, contouring, strobing | Choix teinte (mâchoire vs cou), pinceaux (kabuki, langue-de-chat, éponge humide), techniques contouring (cheek hollow, temple, mâchoire) et strobing (arcade sourcilière haute, arête nez, cupidon, pommettes hautes) |
| M5 – Sourcils, yeux, bouche | Structure sourcil (3 points d'or), formes yeux (smoky, cut-crease, halo, winged liner), formes bouche (ombre lip, overline, dégradé) |
| M6 – Produits & pinceaux (référentiel) | Tableau des pinceaux par usage + liste INCI critique (parabens, silicones, allergènes) |
| M7 – Mise en situation & satisfaction client | Trame prestation complète 1h30, gestion des ajustements, reformulation, prise du prochain RDV |
| M8 – Préparation à l'examen | QCM 20 questions type, épreuve pratique 1h30, tirage au sort look sur 3 (jour/soirée/mariée), méthodologie |

Chaque module contient : sections richement rédigées, tableaux, photos Unsplash beauté, et **1 à 2 exercices `<details>` avec corrigé**.

## 2. Routage dans `src/lib/courseContent.ts`

Ajouter juste avant la règle `esthét` :

```ts
if (t.includes('maquilleur') || t.includes('maquillage professionnel') || t.includes('make-up') || t.includes('makeup')) return getMaquillageChapters();
```

Import + export ajoutés en tête de fichier.

## 3. Préréglage dans `src/lib/sampleData.ts`

Ajouter 3 exports :

**`MAISON_HSY_ORG`** – Organisme
- Nom : `MAISON HSY BEAUTÉ`, dirigeant : `Hasnaa YEDDI`
- Adresse : `4 rue de la Ceriseraie, 78860 Saint-Nom-la-Bretèche`
- Domaines : Maquillage professionnel, formation certifiante France Compétences
- Types actions : `actions-formation`

**`FORMATION_MAQUILLEUR_PRO`** – FormationInfo
- Intitulé : `Maquilleur Professionnel – Formation certifiante`
- Durée : `35 heures (5 jours)`, tarif : `2 100 € TTC`
- Modalités : présentiel
- Lieu : `Maison HSY, 4 rue de la Ceriseraie, 78860 Saint-Nom-la-Bretèque / Bellezza & Co, 43 rue Pierre Valette, 92240 Malakoff`
- Programme : reprend exactement les 5 jours fournis
- Prérequis : `Travailler dans l'esthétique ou le bien-être + 1 an d'expérience min.`
- Nb participants : `6`
- Dates : session **passée** (démarrage il y a ~35 jours → fin il y a ~28 jours) pour déclencher tous les livrables remplis
- Formateur : `Hasnaa YEDDI`
- Méthodes éval : QCM 20 Q (20 min) + mise en situation pro 1h30 (tirage au sort look sur 3)

**`STAGIAIRES_MAQUILLEUR_PRO`** – 6 esthéticiennes cohérentes
Toutes femmes, entre 25 et 40 ans, adresses IDF/78/92, entreprises esthétique/spa/institut réelles, poste `Esthéticienne` ou `Prothésiste ongulaire`, dates individuelles alignées sur la session 5 jours passée, tarif `2100`, financement personnel.

## 4. Bouton d'import dans `FormationForm.tsx`

Ajouter un bouton `📥 Importer preset Maquilleur Pro (Maison HSY)` à côté des boutons Hexagone / Bac Pro existants, qui :
- appelle `onChange(FORMATION_MAQUILLEUR_PRO)`
- appelle `onApplyOrganisme(MAISON_HSY_ORG)`
- appelle `onImportStagiaires(STAGIAIRES_MAQUILLEUR_PRO)`
- toast : « Preset Maquilleur Pro importé — génère les contenus IA puis les documents »

## 5. Contenus IA auto-générés (déjà en place)

Aucun code à écrire — l'app génère déjà sur base du titre :
- Évaluation des besoins (réponses stagiaires personnalisées cohérentes maquillage)
- QCM positionnement début (10 Q) et fin (10 Q)
- Exercice intermédiaire (4 questions ouvertes)
- Évaluation finale (5 exercices pratiques) — réponses stagiaires différentes
- Veilles réglementaires (règlement cosmétique CE 1223/2009, INCI, allergènes)

Le titre `Maquilleur Professionnel` fait matcher les prompts métier esthétique existants, et le nouveau `courseContentMaquillage.ts` fournit le support de cours long format spécifique maquillage (au lieu du CAP esthétique générique).

## Workflow utilisateur après merge

1. Cliquer « Importer preset Maquilleur Pro » → formation + orga + 6 stagiaires remplis
2. Cliquer « Régénérer tous les contenus IA » (bouton existant) → éval besoins, QCM, exercices, veilles
3. Générer le pack Qualiopi ou OPCO → tous les livrables (émargements, attestations, bilans à chaud, positionnement, support de cours 30+ pages, ressources) sont personnalisés maquillage et datés (session passée → tout rempli)

## Détails techniques

- Aucune migration DB, purement front
- Aucune nouvelle dépendance
- Fichiers modifiés : `src/lib/courseContent.ts`, `src/lib/sampleData.ts`, `src/components/FormationForm.tsx`
- Fichier créé : `src/lib/courseContentMaquillage.ts` (~350 lignes)
- Aucun impact sur les presets existants (Hexagone, Bac Pro)
