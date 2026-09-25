# Déplacer le référentiel vers l’étape Formation

## Modifications
- Placer en haut de l’étape Formation l’analyse par lien France Compétences ou fichier PDF/DOCX, avec le résumé complet et l’alerte d’inactivité.
- Enregistrer automatiquement la fiche analysée dans la formation et laisser « Appliquer à la formation » compléter uniquement les champs vides.
- Ajouter le champ optionnel `referentiel` au modèle de formation afin qu’il suive la sauvegarde de session et l’historique existants.
- Remplacer le bloc complet de l’étape Stagiaires par les contrôles compacts région/nombre et un seul bouton « Générer N stagiaires cohérents avec la formation ».
- Conserver les badges fictifs, les compteurs et la suppression groupée.

## Détails techniques
- Réutiliser l’analyse et le générateur existants, avec repli automatique sur les champs de la formation si aucune fiche n’est enregistrée.
- Passer la formation aux formulaires Stagiaires des parcours qui la possèdent, sans modifier les autres générateurs.
- Vérifier le typage et l’état de compilation après les changements.
