# Qualité PDF et design du pack rapide

## Objectif
Améliorer uniquement la page Génération rapide, sans modifier les générateurs de contenu existants.

## Modifications prévues
1. Ajouter le choix de qualité PDF dans la barre de génération : Standard, Haute par défaut, Maximale.
2. Appliquer ce réglage aux téléchargements unitaires, aux packs et aux aperçus PDF, puis le mémoriser pour la session.
3. Recalculer l’estimation selon la qualité choisie et conserver l’alerte au-delà de deux minutes.
4. Ajouter l’aide précisant que le PDF est une image et que Word reste sélectionnable et cherchable.
5. Ajouter l’étape repliable « Design du dossier » avec mode automatique activé par défaut.
6. Construire la charte automatiquement avec une graine stable `nom + siret + dateMaj`, identique à celle de l’organigramme, plus un décalage mémorisé pour « Autre design ».
7. Permettre la personnalisation complète avec le panneau existant : thème, couleurs, en-tête, titres, polices, taille et logo.
8. Afficher une mini-prévisualisation de la charte et appliquer exactement le même style avant chaque aperçu, téléchargement et génération du pack.

## Détails techniques
- Les chartes automatiques utiliseront seulement des thèmes imprimables sur fond clair et des couleurs d’accent suffisamment contrastées.
- Le style sera capturé au lancement d’un travail en arrière-plan afin qu’un changement ultérieur à l’écran ne modifie pas le pack en cours.
- L’aperçu PDF sera rendu avec `htmlToPdfBlob` et les mêmes options que le fichier téléchargé ; Word conservera l’aperçu HTML.
- Le CERFA restera généré par son générateur PDF dédié.

## Vérifications
- Contrôle TypeScript.
- Génération d’un pack PDF en qualité Haute et inspection de sa résolution.
- Comparaison visuelle entre aperçu et fichier produit.
- Vérification de deux organismes distincts donnant deux chartes différentes et d’un même organisme conservant sa charte.
- Vérification de l’organigramme sans bande parasite.
