# Créateur de logos pour organismes de formation

## Objectif
Ajouter sur l’accueil un accès direct à un outil qui crée des propositions de logo à partir du nom de l’organisme, de son activité et de logos de référence fournis par l’utilisateur.

## Parcours prévu
1. Ajouter une carte/bouton « Créateur de logo » sur l’accueil.
2. Ouvrir une page dédiée avec :
   - nom exact de l’organisme ;
   - slogan facultatif ;
   - domaines de formation ;
   - choix d’une orientation visuelle ;
   - ajout de plusieurs logos de référence ;
   - consignes libres et couleur principale.
3. Générer deux concepts réellement différents, isolés sur fond transparent, sans copier les références.
4. Afficher les propositions dans une galerie avec leur état de chargement et les messages d’erreur utiles.
5. Permettre de télécharger chaque logo en PNG et de le choisir comme logo de l’organisme dans le générateur Qualiopi.

## Technique
- Ajouter une nouvelle page React et sa route, en réutilisant les boutons, champs et couleurs existants.
- Ajouter une fonction sécurisée côté serveur pour appeler la génération d’images avec le modèle recommandé, en gardant la clé secrète hors du navigateur.
- Envoyer les images de référence avec le nom et les consignes ; préserver exactement l’orthographe du nom demandé.
- Gérer proprement les erreurs de crédits, d’accès, de format et de limitation, sans relance automatique incorrecte.
- Conserver localement les créations pendant la session afin de pouvoir revenir à l’accueil et les réutiliser.
- Vérifier le parcours complet sur ordinateur et mobile, y compris ajout de références, génération, aperçu et téléchargement.
