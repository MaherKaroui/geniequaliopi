## Objectif

Mettre à jour les aides apprenti CFA conformément au document officiel 2026 :
- Supprimer toute référence à l'**aide au permis B (500€)** — supprimée par l'article 202 de la loi de finances 2026.
- Ajouter les 4 aides manquantes confirmées par l'utilisateur.

## Fichiers à modifier

### 1. `src/lib/newslettersMissionsCFA.ts` (Mission 14 — Affiche A3 & paragraphe)
Remplacer la puce « Permis B aide au financement » par les nouvelles aides et mettre à jour le paragraphe :

Nouvelles puces Mission 14 :
- **Mobili-Jeune (Action Logement)** — jusqu'à 100 €/mois sur le loyer, sous conditions.
- **Garantie Visale + Avance Loca-Pass** — caution locative gratuite + avance du dépôt de garantie.
- **Aide au logement & restauration** — CROUS / Action Logement (conservée).
- **Aide à la mobilité** — Carte Imagine R, aide transport, Erasmus+ (conservée).
- **Carte d'étudiant des métiers + Prime d'activité (CAF)** — réductions + complément de revenus.
- **Fonds social du CFA + Aide premier équipement** — situations financières difficiles, matériel/tenue.
- **Aides santé & psy** — Mutuelle, Santé Psy Étudiant (conservée).
- **Aides régionales spécifiques** — équipement, prime IDF, France Travail (conservée).

Paragraphe Mission 14 reformulé sans permis B, mentionnant logement (Mobili-Jeune, Visale, Loca-Pass), mobilité, fonds social, prime d'activité, et aides régionales. Ajout d'une note : « L'aide au permis B (500€) a été supprimée par la loi de finances 2026. »

### 2. `src/lib/qualiopiReferenceCFA.ts` (IND 14 — script audit)
Ligne 102 : retirer « permis B » du « ceQuIlFautDire » et le remplacer par « aides logement (Mobili-Jeune, Visale, Loca-Pass), mobilité, fonds social, aides régionales ».

### 3. `src/lib/templatesCFAGapsAudit.ts` (QCM 14 missions)
Ligne 61 : remplacer la question QCM sur l'aide permis B (500€) par une question sur **Mobili-Jeune** (« Quelle aide existe pour aider à payer le loyer ? » → Mobili-Jeune jusqu'à 100€/mois).

### 4. `src/lib/feuilleRouteQualiopi.ts` (Feuille de route — ligne IND 15)
Ligne 41 : remplacer « permis, mobilité, hébergement, restauration, équipement » par « logement (Mobili-Jeune, Visale, Loca-Pass), mobilité, restauration, fonds social, premier équipement, prime d'activité ».

## Fichiers **non touchés** (sciemment)

- `src/lib/courseContent.ts`, `courseContentECSR.ts`, `courseContentCIP.ts` : références au « permis B » dans les **contenus pédagogiques** des formations ECSR (moniteur auto-école) et CIP (freins périphériques) — ce n'est pas une aide apprenti, c'est un sujet de cours métier.
- `src/lib/mailRdvEvaluationBesoins.ts` : demande au stagiaire d'apporter son permis B comme **pièce d'identité** lors d'un RDV — rien à voir avec l'aide financière.

## Sources

- Document officiel utilisateur `aides-apprenti-cfa-2026.docx` (loi de finances 2026, article 202).
- Portail de l'alternance / Service-Public / Action Logement / CAF / Centre Inffo.
