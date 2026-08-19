# Vérification de la partie BDC — état et corrections restantes

Revue du code BDC (`src/lib/bdc/*`, catalogue, ZIP) au regard de la grille d'audit fournie.

## Ce qui est déjà en place (conforme)

- Document de synthèse R6313-8, feuilles d'émargement par séance, satisfaction bénéficiaire à chaud et à froid, accord de conservation / destruction, autorisation de transmission à un tiers, réclamation-médiation, livret d'accueil, planning signé, infos distanciel, fiches de poste, process handicap, amélioration continue, clauses BC, mentions de non-applicabilité : les 15 pièces existent et sont exposées dans l'application et dans le ZIP.
- Nettoyage automatique : remplacement des noms d'organismes tiers (NT CONSEILS, ntconseil, etc.), champs de fusion non substitués, vocabulaire « formation » converti en vocabulaire BC, mentions abrogées (CIF, OPCA, Datadock).
- Moteur de validation avec 23 règles bloquantes + 7 alertes, dont synthèse, émargements, prix non nul, employeur identifié, détection de duplication entre bénéficiaires ; export ZIP conditionné à ce contrôle.
- Prix, exonération TVA 261-4-4°a, phrase de durée unique, suivi à 6 mois, type de contrat déduits d'une source unique (`bdcModel.ts`).

## Écarts constatés — corrections proposées

1. **Séances identiques pour tous les bénéficiaires (critique, bloquant 4 de la grille)**
   `buildBdcContext` ne construit qu'un seul jeu de séances, à partir du premier bénéficiaire, et toutes les séances démarrent à 09:00. Deux bénéficiaires ont donc les mêmes dates et le même créneau : collision matériellement impossible pour un consultant unique.
   Correction : générer un planning par bénéficiaire (décalage des dates selon un rang déterministe) et alterner les créneaux horaires (09:00, 14:00, 16:30…) pour éviter tout chevauchement entre bénéficiaires.

2. **Anti-fabrication désactivé à l'export**
   `antiFabrication: false` est utilisé aussi bien dans l'aperçu unitaire que dans le ZIP : les rubriques déclaratives (verbatims du bénéficiaire) restent pré-remplies au lieu d'afficher « [À compléter par le bénéficiaire] ».
   Correction : activer l'anti-fabrication sur les documents déclaratifs (synthèse, satisfaction, émargement) et la laisser désactivée sur les pièces rédigées par l'organisme.

3. **Mention NDA non homogène**
   Le ZIP utilise un repli littéral « [NDA en cours d'attribution] » alors que `mentionNDA()` produit déjà la formulation légale correcte ; deux libellés peuvent coexister dans un même dossier.
   Correction : utiliser `mentionNDA()` partout (en-têtes, pieds de page, CGV, contrat de sous-traitance).

4. **Préfet de région**
   Le remplacement injecte la ville de l'organisme (« Préfet de la région Saint-Maur-des-Fossés ») au lieu de la région ; `regionFromCodePostal()` existe déjà mais n'est pas utilisée à cet endroit.
   Correction : brancher `regionFromCodePostal()` sur ces remplacements.

5. **Questionnaire satisfaction entreprise sans employeur**
   Le questionnaire entreprise (IND 30) est généré pour tout bénéficiaire, y compris sans employeur au dossier, et son commentaire type dévoile le projet professionnel (interdit sans accord écrit, art. L6313-4).
   Correction : ne générer cette pièce que si le bénéficiaire a une entreprise renseignée ; sinon produire la mention de non-applicabilité. Retirer du commentaire toute référence au contenu du projet.

## Détails techniques

- `src/lib/bdc/bdcModel.ts` : `buildSeances(p, b, rang)` — décalage de dates et créneaux par bénéficiaire ; `BdcContext` porte `seancesParBeneficiaire`.
- `src/lib/bdc/bdcTemplatesBC.ts` : les modèles par bénéficiaire lisent le planning du bénéficiaire courant.
- `src/lib/bdc/bdcNTConseilsZip.ts` : `mentionNDA()`, `regionFromCodePostal()`, `antiFabrication` ciblé, condition sur le questionnaire entreprise.
- `src/lib/bdc/bdcValidation.ts` : nouvelle règle bloquante « aucun chevauchement de séances entre bénéficiaires ».

Aucune autre partie de l'application n'est touchée.
