# Réorganiser le ZIP Bilan de compétences par critère

## Problème constaté

Dans le ZIP « Télécharger tout », les documents nominatifs sont rangés à la racine sous un dossier bénéficiaire (`Bénéficiaire - Yassine EL-ARABY/Critere_7/Indicateur_31/...`), ce qui crée une centaine de dossiers bénéficiaires au premier niveau. En plus, les fichiers statistiques de l'indicateur 2 sont écrits dans un dossier `Indicateur 2` non rattaché à un critère.

## Structure cible

```text
Critere_1/
  Indicateur_1/
    doc collectif.docx
  Indicateur_2/
    statistiques.xlsx
Critere_3/
  Indicateur_9/
    CGV collective.docx
    Bénéficiaire - Yassine EL-ARABY/
      Convention.docx
      CGV.docx
    Bénéficiaire - Yasmine GOMES/
      ...
LISEZMOI.txt
```

Règle : critère > indicateur > fichiers collectifs, et un sous-dossier « Bénéficiaire - Prénom NOM » à l'intérieur de l'indicateur uniquement pour les documents nominatifs.

## Modifications techniques

Fichier : `src/lib/bdc/bdcNTConseilsZip.ts`

1. Documents nominatifs : remplacer le chemin `${benFolder}/${critereFolder}/${baseName}` par `${critereFolder}/${benFolder}/${baseName}`. Si aucun critère n'est déterminé, ranger dans `Divers/${benFolder}/`.
2. Fichiers stats indicateur 2 : utiliser `mapFolderToCriterePath("Indicateur 2")` au lieu du dossier brut `Indicateur 2`, pour obtenir `Critere_1/Indicateur_2/`.
3. Mettre à jour le texte « Structure » du `LISEZMOI.txt` pour décrire la nouvelle arborescence.

Aucun changement sur le contenu ou le nom des documents.
