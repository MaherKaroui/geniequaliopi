---
name: Empty phone field omission
description: When telephone is empty/blank, omit it entirely from all documents (no dashes, no empty labels)
type: preference
---
Si le téléphone (organisme ou stagiaire) est vide ou absent, il ne doit PAS apparaître du tout dans les documents générés. Pas de "—", pas de label "Téléphone :" suivi de vide. La ligne entière est omise.
Helpers disponibles dans docBuilder.ts : optTel(), telRow(), optTelInline().
