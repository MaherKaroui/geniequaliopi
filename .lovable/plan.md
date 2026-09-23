# Qualité PDF et design cohérents dans tous les générateurs

## Objectif
Étendre à tous les générateurs de dossiers les réglages déjà présents dans Génération rapide : qualité PDF choisie par l’utilisateur, aperçu fidèle au téléchargement et identité visuelle stable propre à chaque organisme.

## Mise en œuvre
- Centraliser les trois niveaux PDF : Standard, Haute par défaut et Maximale, avec leurs paramètres et estimations.
- Centraliser les chartes imprimables et le calcul déterministe basé sur `nom + siret + dateMaj`, identique à l’organigramme.
- Ajouter un contrôle commun « Qualité PDF » et un contrôle « Design du dossier » aux générateurs qui produisent des dossiers PDF : Qualiopi principal, EY/EDOF, OPCO, NDA, VAE, GOTRM et outils associés.
- Conserver les panneaux de personnalisation existants : automatique activé par défaut, réglage manuel disponible, bouton « Autre design » avec décalage mémorisé.
- Appliquer la charte juste avant chaque aperçu, téléchargement individuel et génération en lot afin d’éviter qu’un autre écran modifie le rendu.
- Utiliser la même qualité pour l’aperçu PDF et le fichier téléchargé ; conserver Word comme format à texte sélectionnable.
- Mémoriser les préférences par espace et restaurer la charte d’un dossier sauvegardé lorsque son historique stocke déjà le style.
- Ne modifier aucun contenu métier des documents ni les règles de génération.

## Vérifications
- Vérifier les types de toute l’application.
- Tester dans le navigateur chaque famille de générateur avec la qualité Haute par défaut.
- Générer des PDF témoins et contrôler leur résolution à 192 DPI ainsi que le rendu visuel des pages.
- Confirmer qu’un même organisme garde sa charte et que deux organismes différents peuvent obtenir des chartes différentes.
