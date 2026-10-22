**FICHE D'ANALYSE DU BESOIN**

Indicateur 4 — Co-construite lors de l'entretien préalable du {{D_PREALABLE}}

**1. Identification du bénéficiaire**

| Nom et prénom | {{BEN}} |
|---|---|
| Date de naissance | {{BEN_NAISS}} |
| Téléphone | {{BEN_TEL}} |
| Courriel | {{BEN_EMAIL}} |
| Situation actuelle | {{BEN_SITUATION}} |
| Poste occupé | {{BEN_POSTE}} |
| Date de l'entretien préalable | {{D_PREALABLE}} — par téléphone ou visioconférence |
| Consultant | {{CONSULTANT}} |

**2. Origine de la demande et financement**

| Origine de la demande | {{CB:ORIGINE=beneficiaire}} Initiative personnelle  {{CB:ORIGINE=employeur}} Employeur  {{CB:ORIGINE=francetravail}} France Travail  {{CB:ORIGINE=opco}} OPCO |
|---|---|
| Financeur | {{CB:FIN=personnel}} Financement personnel  {{CB:FIN=CPF}} CPF  {{CB:FIN=employeur}} Employeur  {{CB:FIN=OPCO}} OPCO  {{CB:FIN=France Travail}} France Travail |
| Employeur partie au contrat | {{#SI TRIPARTITE}}Oui. Bilan financé par l'employeur {{BEN_EMPLOYEUR}} : convention tripartite entre l'organisme, l'employeur et le bénéficiaire (art. R6313-8 du Code du travail). L'employeur n'est destinataire d'aucun résultat sans l'accord écrit du bénéficiaire (art. L6313-4).{{#SINON}}Non. Démarche individuelle du bénéficiaire : contrat bilatéral entre l'organisme et le bénéficiaire (art. L6353-3 du Code du travail). L'employeur n'est destinataire d'aucun résultat (art. L6313-4).{{/SI}} |
| Information donnée sur le financement | {{#SI CERTIFIE_BC}}{{ORG}} est certifié Qualiopi pour la catégorie « bilans de compétences » : le bénéficiaire a été informé des financements mobilisables (CPF, employeur, OPCO, France Travail, financement personnel). Financement retenu : {{FINANCEMENT_LIB}}.{{#SINON}}Le CPF et les fonds de l'OPCO ne sont pas mobilisables auprès de {{ORG}} tant que sa certification Qualiopi n'est pas étendue aux bilans de compétences. Le bénéficiaire en a été informé. Financement retenu : {{FINANCEMENT_LIB}}{{PRIX_PARENTHESE}}.{{/SI}} |

**3. Objet de la démarche**

•	☐ Faire le point sur mes compétences

•	☐ Évoluer dans mon métier

•	☐ Préparer une reconversion professionnelle

•	☐ Retrouver un emploi

•	☐ Créer ou reprendre une entreprise

•	☐ Confirmer un projet professionnel

•	☐ Identifier des pistes d'évolution

**4. Situation professionnelle et parcours**

| Formation initiale |  |
|---|---|
| Principales expériences professionnelles | {{BEN_EXPERIENCES}} |
| Compétences ou savoir-faire identifiés |  |

**5. Motivations et attentes**

| Qu'attendez-vous du bilan de compétences ? |  |
|---|---|
| Quels sont vos objectifs à l'issue du bilan ? |  |
| Commentaire du bénéficiaire |  |

**6. Contraintes et points de vigilance**

| Contraintes horaires | Dates arrêtées d'un commun accord au planning prévisionnel : {{JOURS_SEANCES}}. |
|---|---|
| Contraintes géographiques | {{#SI DISTANCIEL}}Modalité à distance retenue, sans déplacement.{{#SINON}}Séances dans les locaux de {{ORG}}, {{ORG_ADRESSE_COMPLETE}}.{{/SI}} |
| Contraintes personnelles ou familiales |  |
| Situation de handicap nécessitant un aménagement | ☐ Oui  ☐ Non |

**7. Analyse du besoin**

| Le besoin relève-t-il du bilan de compétences ? | ☐ Oui  ☐ Non |
|---|---|
| Motivation |  |

**Besoins identifiés :**

•	☐ Analyse du parcours professionnel

•	☐ Identification des compétences

•	☐ Exploration des métiers et secteurs

•	☐ Construction d'un projet professionnel

•	☐ Validation du projet

•	☐ Élaboration d'un plan d'action

**8. Modalités d'accompagnement retenues**

| Modalité | {{CB:MODALITE=presentiel}} Présentiel  {{CB:MODALITE=distanciel}} Distanciel synchrone  {{CB:MODALITE=mixte}} Mixte |
|---|---|
| Durée prévisionnelle | {{DUREE}} heures d'accompagnement individuel avec le consultant, réparties sur {{NB_SEANCES}} séances. Le travail personnel guidé réalisé entre les séances n'est ni décompté de ces {{DUREE}} heures ni facturé. |
| Rythme envisagé | {{NB_SEANCES}} séances de 2 à 4 heures, {{JOURS_SEANCES}}, espacées de 1 à 2 semaines. |
| Aménagements spécifiques |  |

**9. Validation**

Le bénéficiaire reconnaît avoir été informé des objectifs, des modalités et du déroulement du bilan de compétences.

**Signatures**

Fait à {{ORG_VILLE}}, en deux exemplaires originaux.

| Le bénéficiaire ⏎ {{BEN}} ⏎ Bénéficiaire du bilan de compétences ⏎ Signé le {{D_PREALABLE}} | Le consultant ⏎ {{CONSULTANT}} ⏎ Consultant en bilan de compétences ⏎ Signé le {{D_PREALABLE}} |
|---|---|
