---
name: pedagogical-resources
description: IND 19 ressources pédagogiques contextuelles avec banque YouTube et supports adaptés à 18+ domaines
type: feature
---

Le document RESSOURCES PÉDAGOGIQUES (CT4 - IND 19) est entièrement contextualisé selon l'intitulé de la formation. Le routeur `getYoutubeVideos()` (src/lib/courseContent.ts) sélectionne une banque vidéo YouTube ciblée parmi les domaines suivants :

- Bureautique : Excel, Word, PowerPoint, Pack Office (générique)
- Langues : Anglais (B1+/TOEIC), Anglais A1, FLE
- Massages : Prénatal/relaxation, Post-partum/post-natal
- Esthétique : Esthétique générale, Socio-esthétique (publics fragilisés)
- Métiers tertiaires : CIP, RPMS, Assistant(e) de direction, Secrétaire médicale
- Mobilité : VTC, ECSR (enseignant de la conduite)
- Numérique : IA générative, Webmarketing, CRM/Automation, Infographiste/PAO Adobe
- Autres : Management/Leadership, Commercial/Négociation, Restauration/HACCP

`genRessourcesPedagogiques()` (src/lib/documentGenerator.ts) génère 5 sections : Supports de formation, Outils numériques et matériels, Ressources vidéo complémentaires (avec liens YouTube cliquables et descriptions), Ressources complémentaires (sites officiels, livres, glossaires) et Modalités d'accès. Les supports/outils/ressources sont eux aussi spécialisés par domaine (mêmes branches que la banque vidéo) — fallback générique uniquement si aucun mot-clé ne matche.

**Règle :** ajouter une formation = ajouter une banque YouTube dédiée + une branche `if/else` dans `genRessourcesPedagogiques` + entrée dans le routeur. Ne jamais laisser tomber dans le fallback générique pour une formation reconnue.
