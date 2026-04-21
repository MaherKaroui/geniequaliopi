---
name: CERFA Apprentissage rempli
description: Document CT3-IND 9 par stagiaire, génère le CERFA officiel 10103*14 pré-rempli via pdf-lib (employeur, apprenti, contrat, formation)
type: feature
---
Le catalogue CFA inclut un document **CERFA 10103*14 CONTRAT D'APPRENTISSAGE** par stagiaire (CT3-IND 9), généré via `genCerfaApprentissagePdf` dans `src/lib/cerfaApprentissage.ts`.

Approche technique :
- Le PDF officiel (`public/pdfs/cerfa/cerfa_10103-14.pdf`) contient 216 champs AcroForm anonymes (`Zone de texte 8_X`, `Zone de texte 21_X`).
- Mapping établi par coordonnées des widgets (page 1 = Employeur/Apprenti/Maître, page 2 = Contrat/Rémunération/Formation/Signature).
- `pdf-lib` remplit les ~50 champs essentiels ; les champs non essentiels (RQTH, dérogations, retraite) restent vides.

Données auto-remplies :
- **Employeur** : depuis `s.entreprise`, `s.siretEntreprise`, `s.adresseEntreprise`
- **Apprenti** : nom, prénom, date naissance, NIR, adresse, sexe (depuis `s.civilite`)
- **Maître d'apprentissage** : depuis `s.responsableEntreprise`
- **Contrat** : dates basées sur `f.dateDebut`/`f.dateFin`, conclusion = -7 jours
- **Formation** : organisme, intitulé, code RNCP (`f.codeRNCP`), durée (`f.duree`)
- **Fait à** = `o.ville`
