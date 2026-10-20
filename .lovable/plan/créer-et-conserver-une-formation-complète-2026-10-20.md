# Créer et conserver une formation complète

## Résultat attendu

Ajouter **Créer cette formation** au formulaire Formation, à Génération rapide et à IZILearn lorsqu’aucun contenu dédié ne correspond exactement au titre ou au code RNCP/RS.

Afficher alors le texte demandé : « Cette formation n'a pas de contenu dédié : les documents utiliseront un contenu générique. » Les rapprochements approximatifs tels que « Gérer un projet digital » → webmarketing ne compteront plus comme contenu dédié.

## Contenu et génération

- Utiliser **GPT-6 Astra**, conformément à votre choix, sans changer les autres générations IA.
- Enregistrer la fiche pédagogique, les besoins types et adaptations, 10 mises en situation corrigées, 10 QCM par compétence, les positionnements début/fin de 10 questions, les questions ouvertes, le cas intermédiaire et l’évaluation finale avec grille.
- Produire le support chapitre par chapitre : objectif d’environ **500 000 caractères HTML**, plus de **60 pages**, avec quiz et cas corrigé par chapitre. Vérifier le volume réel et la pagination exportée : le nombre de caractères ne garantit pas à lui seul le nombre de pages.
- Reprendre uniquement les blocs, certificateurs et dates de la fiche France Compétences synchronisée. Sans fiche vérifiable, ne pas inventer ces informations.
- Vérifier les liens de veille et de ressources avant conservation ; exclure les sources non vérifiables et les vidéos hors YouTube. Une réponse HTTP seule ne suffira pas : vérifier aussi l’identité et la pertinence de la source.

## Progression et validation

- Sauvegarder chaque étape achevée et afficher une progression telle que « Chapitre 4 / 12 ».
- Permettre de fermer la page puis de retrouver la formation et reprendre les étapes manquantes, sans refaire les chapitres enregistrés.
- Limiter à trois les chapitres simultanés et éviter les doubles générations entre onglets.
- Terminer en **brouillon**, proposer **Valider la formation** et **Régénérer ce chapitre**. Une régénération d’un contenu validé repasse en brouillon avant republication du contenu.
- Réessayer les erreurs 429/5xx avec attente croissante, au maximum trois essais. Arrêter et afficher les blocages de crédits, d’accès ou les refus, sans relance automatique.

## Utilisation et protection des données

- Charger les contenus enregistrés au retour dans un dossier, y compris depuis l’historique, et les utiliser avant les contenus statiques et génériques.
- Brancher les évaluations, questions ouvertes, supports, exercices IND 11 et veilles sur le même contenu enregistré.
- Dans IZILearn, conserver la priorité des leçons explicitement reçues de la session et des réponses effectivement enregistrées.
- Ne jamais transformer les corrigés pédagogiques en réponses, notes, appréciations, signatures ou satisfaction de stagiaire : les documents à compléter restent vierges sans réponse réelle.
- IZILearn pourra lire les contenus validés sans connexion. **Créer, reprendre, régénérer ou valider nécessitera une connexion** ; cela ne rendra pas les autres outils publics.
- La génération longue utilise des crédits IA ; une fermeture de page conserve les étapes terminées mais ne promet pas de poursuivre tout le travail en arrière-plan.

## Détails techniques

- Créer `public.formation_presets` avec les colonnes et statuts demandés, l’index unique sur titre normalisé et code, les droits explicites et les politiques de lecture : utilisateurs connectés, public pour les contenus validés uniquement. Réserver les modifications au créateur authentifié pour éviter qu’un autre compte n’écrase son travail.
- Ajouter des opérations serveur limitées par étape, des réservations atomiques avec expiration, des checkpoints et des gardes d’état persistant pour éviter les appels dupliqués ou les relances après blocage. Les sauvegardes de progression fusionneront les résultats sans écraser les chapitres parallèles.
- Implémenter `generate-formation-preset` avec authentification, entrées validées, réponses structurées contrôlées et flux continu côté IA. Résoudre les références France Compétences depuis les données officielles synchronisées, sans faire confiance à une fiche modifiable envoyée par le navigateur.
- Introduire un registre partagé des contenus et une correspondance exacte par code puis titre normalisé, compatible avec les formats des presets existants. Garder les corrigés séparés des réponses apprenants.
- Nettoyer le HTML généré et contrôler les URL côté serveur, notamment les redirections, afin de ne pas accéder aux adresses privées.

## Vérification

- Tests : correspondance exacte, titre inconnu, ordre de priorité, reprise des étapes, trois chapitres maximum, validation, isolation des écritures et consultation publique limitée aux contenus validés.
- Tests : QCM et exercices provenant d’un preset factice, support rendu depuis ce preset, absence de réponses stagiaires inventées, priorité du contenu IZILearn.
- Vérifier une création authentifiée avec appel IA réel, sauvegarde, retour après fermeture, validation et réutilisation dans les documents ; contrôler le support exporté et l’aperçu des trois écrans.
- Vérifier les erreurs et la compilation automatique, sans modifier les documents retirés ni les règles des signatures et des dates.