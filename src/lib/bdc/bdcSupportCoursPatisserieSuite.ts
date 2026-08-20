/**
 * Support de cours — Indicateur 19 (suite)
 * Chapitres 15 à 24 : approfondissement technique, économique et professionnel.
 */

const T = (rows: string[][], head: string[]) =>
  [`| ${head.join(" | ")} |`, `|${head.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");

const ch15 = `
## Chapitre 15 — Le chocolat : tempérage, moulage et confiserie

### 15.1 Comprendre la cristallisation

Le beurre de cacao cristallise sous six formes. Seule la forme V (bêta) donne un chocolat brillant,
cassant et stable au démoulage. Le tempérage consiste à conduire le chocolat en température pour
sélectionner cette forme.

${T(
  [
    ["Chocolat noir", "50 – 55 °C", "28 – 29 °C", "31 – 32 °C"],
    ["Chocolat au lait", "45 – 50 °C", "27 – 28 °C", "29 – 30 °C"],
    ["Chocolat blanc", "45 °C", "26 – 27 °C", "28 – 29 °C"],
    ["Chocolat blond / inspiration", "45 °C", "26 °C", "28 °C"],
  ],
  ["Couverture", "Fonte", "Pré-cristallisation", "Travail"],
)}

### 15.2 Les trois méthodes

**Tablage** : fonte, puis étalement des deux tiers sur marbre jusqu'à la température de
pré-cristallisation, retour dans la cuve. Méthode de référence en atelier.
**Ensemencement** : ajout de 20 à 25 % de pistoles non fondues dans la masse chaude, mixage.
Méthode la plus accessible à domicile.
**Bain-marie froid** : refroidissement sous agitation, puis remontée douce. Méthode lente,
risque de traces d'eau.

### 15.3 Contrôle et défauts

Tester sur pointe de couteau : la prise doit intervenir en 3 à 5 minutes à 20 °C, avec brillance
et absence de traînées. Défauts courants :

${T(
  [
    ["Blanchiment gras", "Tempérage raté ou choc thermique", "Retempérer, stocker à 16 – 18 °C"],
    ["Blanchiment sucré", "Condensation / humidité", "Éviter le froid positif humide"],
    ["Chocolat mat", "Excès de cristaux ou moule froid", "Remonter d'1 °C, tempérer les moules"],
    ["Démoulage difficile", "Sous-cristallisation", "Prolonger la cristallisation à 16 °C"],
  ],
  ["Défaut", "Cause probable", "Correction"],
)}

### 15.4 Bonbons de chocolat et confiserie

Ganaches (rapport couverture/crème de 2:1 pour le noir, 3:1 pour le lait), praliné maison
(fruits secs torréfiés + sucre caramélisé, broyage jusqu'à 30 microns), pâtes de fruits
(pectine jaune, 75 °Brix), caramels tendres (cuisson 118 – 121 °C), guimauves (sirop 110 °C
+ gélatine). Conservation : 16 – 18 °C, 55 % d'hygrométrie, à l'abri de la lumière.
`;

const ch16 = `
## Chapitre 16 — Viennoiserie et pâtes levées feuilletées

### 16.1 Les fermentations

Pointage (fermentation en masse), détente (repos après division), apprêt (dernière pousse avant
cuisson). La température de base — somme des températures farine + local + eau — se situe entre
54 et 58 °C pour les pâtes levées feuilletées.

### 16.2 Le tourage

${T(
  [
    ["Croissant classique", "3 tours simples", "25 – 27 % de beurre de tourage"],
    ["Pain au chocolat", "1 tour double + 1 simple", "Feuilletage plus serré"],
    ["Brioche feuilletée", "2 tours doubles", "Pâte riche, tourage à froid impératif"],
    ["Kouign-amann", "3 tours simples sucrés", "Sucre incorporé aux 2 derniers tours"],
  ],
  ["Produit", "Tourage", "Remarques"],
)}

Le beurre de tourage (82 – 84 % MG, point de fusion élevé) et la pâte doivent avoir la même
plasticité : environ 12 – 14 °C. Un beurre trop froid casse ; trop chaud, il migre dans la pâte.

### 16.3 Apprêt et cuisson

Apprêt à 26 – 28 °C maximum : au-delà, le beurre fond et fuit à la cuisson. Dorure à l'œuf entier
+ pincée de sel, sans couler sur les tranches. Cuisson à 175 – 180 °C en four ventilé, buée
courte au démarrage.

### 16.4 Défauts fréquents

${T(
  [
    ["Fuite de beurre", "Apprêt trop chaud", "Baisser l'étuve à 26 °C"],
    ["Feuilletage écrasé", "Laminage trop rapide", "Réduire l'épaisseur par paliers"],
    ["Mie serrée", "Apprêt insuffisant", "Prolonger de 20 – 30 min"],
    ["Croissants pâles", "Four trop ventilé / pas de dorure", "Ajuster la dorure et la sole"],
  ],
  ["Défaut", "Cause", "Correction"],
)}
`;

const ch17 = `
## Chapitre 17 — Entremets modernes, inserts et glaçages

### 17.1 Architecture d'un entremets

Un entremets contemporain s'organise en couches : base croustillante, biscuit, insert (crémeux,
compotée, confit), mousse, glaçage, décor. La règle d'équilibre : une texture croquante, une
texture fondante, une acidité, une note sucrée.

### 17.2 Les mousses

${T(
  [
    ["Mousse sur base bombe", "Œufs + sirop 118 °C + crème montée", "Fruits, chocolat"],
    ["Mousse sur crème anglaise", "Anglaise 82 °C + gélatine + crème", "Vanille, café, praliné"],
    ["Mousse sur ganache", "Ganache 40 °C + crème montée", "Chocolats fins"],
    ["Mousse sur meringue italienne", "Meringue + purée + gélatine + crème", "Fruits acides"],
  ],
  ["Type", "Base", "Usage"],
)}

Dosage indicatif de gélatine : 8 à 12 g de masse gélatine (or 200 bloom) par litre d'appareil,
selon la tenue recherchée et la hauteur du moule.

### 17.3 Inserts et surgélation

L'insert est coulé puis surgelé à cœur (-18 °C) avant montage à l'envers. Le passage en cellule
de surgélation doit être rapide pour éviter les macro-cristaux qui provoquent le suintement à la
décongélation. Décongélation lente en froid positif (+4 °C, 6 à 12 h).

### 17.4 Glaçages

Glaçage miroir (sirop + lait concentré + gélatine + chocolat, utilisé à 30 – 35 °C sur entremets
congelé), glaçage rocher (couverture + huile de pépin de raisin + amandes hachées, à 40 °C),
velours (beurre de cacao + couverture 1:1, pulvérisé à 40 – 45 °C). Un glaçage terne signale un
entremets insuffisamment congelé ou un glaçage trop chaud.
`;

const ch18 = `
## Chapitre 18 — Allergènes, régimes spécifiques et substitutions

### 18.1 Les 14 allergènes à déclaration obligatoire

Gluten, crustacés, œufs, poissons, arachides, soja, lait, fruits à coque, céleri, moutarde,
sésame, sulfites, lupin, mollusques. En vente directe non préemballée, l'information doit être
disponible par écrit et accessible au client (affichage, classeur, mention sur devis).

### 18.2 Substitutions courantes

${T(
  [
    ["Œuf (liant)", "Aquafaba 45 g / œuf, ou compote 50 g", "Texture plus dense"],
    ["Beurre", "Margarine végétale 82 % MG", "Vérifier le point de fusion"],
    ["Lait", "Boisson soja / avoine barista", "Attention au goût en crème"],
    ["Gélatine", "Agar-agar 5 – 7 g/L, pectine NH", "Prise différente, pas de fonte en bouche"],
    ["Farine de blé", "Mix riz / fécule / psyllium", "Hydratation à réajuster"],
    ["Sucre", "Sucre de coco, sirop d'agave", "Impact sur coloration et conservation"],
  ],
  ["Ingrédient", "Substitution", "Point de vigilance"],
)}

### 18.3 Prévention des contaminations croisées

Plan de travail dédié, ustensiles identifiés par couleur, production sans allergène en début de
journée, nettoyage documenté entre deux séries, étiquetage strict des matières premières.

### 18.4 Communication commerciale

Ne jamais écrire « sans gluten » si l'atelier manipule de la farine de blé : préférer
« recette sans ingrédient contenant du gluten — atelier non dédié ». Cette formulation protège
juridiquement et informe honnêtement le client.
`;

const ch19 = `
## Chapitre 19 — Équipement de l'atelier et investissement

### 19.1 Niveaux d'équipement

${T(
  [
    ["Démarrage domicile", "Batteur 5 L, four ménager ventilé, plaques, balance 0,1 g", "1 500 – 3 000 €"],
    ["Atelier semi-pro", "Batteur 10 L, four 4 niveaux, armoire froide, plan inox", "8 000 – 15 000 €"],
    ["Laboratoire pro", "Cellule de refroidissement, tempéreuse, chambre de pousse, laminoir", "25 000 – 60 000 €"],
  ],
  ["Niveau", "Matériel clé", "Budget indicatif"],
)}

### 19.2 Le froid, poste critique

Trois besoins distincts : froid positif (0 à +4 °C) pour le stockage, froid négatif (-18 °C)
pour la surgélation des inserts et le stock tampon, cellule de refroidissement rapide pour
respecter le passage +63 → +10 °C en moins de deux heures. La cellule est l'investissement qui
transforme réellement l'organisation d'une petite production.

### 19.3 Achat, occasion, leasing

Le matériel d'occasion professionnel révisé permet de diviser l'investissement par deux, à
condition de vérifier l'historique d'entretien et la disponibilité des pièces. Le crédit-bail
préserve la trésorerie de démarrage mais alourdit le coût total. Prévoir 5 % du budget matériel
par an en maintenance.

### 19.4 Aménagement et marche en avant

Circuit sans croisement entre matières premières, production, produits finis et déchets. Zones
identifiées : réception, stockage sec, stockage froid, préparation, cuisson, refroidissement,
finition, conditionnement, plonge, vestiaire.
`;

const ch20 = `
## Chapitre 20 — Gestion des stocks, achats et fournisseurs

### 20.1 Choisir ses fournisseurs

Grossistes généralistes (large gamme, prix moyens), spécialistes pâtisserie (qualité, conseil
technique), producteurs locaux (différenciation, circuit court), cash & carry (dépannage, coût
élevé). Comparer au prix unitaire réel, franco de port inclus.

### 20.2 Suivi des stocks

${T(
  [
    ["Matières sèches", "Rotation 2 – 3 mois", "FIFO, contenants hermétiques étiquetés"],
    ["Produits laitiers", "Rotation 7 – 14 jours", "Contrôle des DLC à réception"],
    ["Chocolat de couverture", "Rotation 3 – 6 mois", "16 – 18 °C, à l'abri des odeurs"],
    ["Fruits surgelés", "Rotation 6 – 12 mois", "Chaîne du froid ininterrompue"],
  ],
  ["Famille", "Rotation cible", "Bonnes pratiques"],
)}

### 20.3 Réduire les pertes

Fiches techniques précises, production sur commande pour les gammes coûteuses, valorisation des
chutes (chapelure de biscuit, cake pops, gâteaux de voyage), suivi hebdomadaire du taux de perte.
Objectif réaliste : rester sous 5 % de la valeur des matières achetées.

### 20.4 Traçabilité

Conserver les étiquettes des lots utilisés pendant toute la durée de vie du produit + une marge.
En cas d'alerte sanitaire, la capacité à identifier les lots concernés en moins d'une heure est
un critère de contrôle de la DDPP.
`;

const ch21 = `
## Chapitre 21 — Communication digitale et vente en ligne

### 21.1 La photographie produit

Lumière naturelle latérale, fond neutre, angle 45° pour les gâteaux entiers, vue de dessus pour
les assortiments, plan macro pour les textures. Retouches minimales : la couleur doit rester
fidèle, sous peine de déception client à la livraison.

### 21.2 Réseaux sociaux

${T(
  [
    ["Instagram", "Vitrine visuelle, prise de contact", "3 – 4 publications / semaine"],
    ["Facebook", "Clientèle locale, événements", "2 publications / semaine + groupe local"],
    ["TikTok", "Notoriété, coulisses, tutoriels", "1 – 2 vidéos / semaine"],
    ["Google Business", "Référencement local, avis", "Fiche complète + réponse à chaque avis"],
  ],
  ["Canal", "Rôle", "Rythme conseillé"],
)}

### 21.3 Site et prise de commande

Un site vitrine simple avec formulaire de devis suffit au démarrage. Éléments indispensables :
gamme et prix indicatifs, délais de commande, zone de livraison, conditions d'acompte et
d'annulation, mentions légales, informations allergènes.

### 21.4 Fidélisation

Relance à J+3 après une commande, offre anniversaire, parrainage, contenu utile (conseils de
conservation, idées de présentation). Le coût d'acquisition d'un nouveau client est trois à cinq
fois supérieur au coût de fidélisation d'un client existant.
`;

const ch22 = `
## Chapitre 22 — Prévisionnel économique et pilotage

### 22.1 Construire un prévisionnel simple

${T(
  [
    ["Chiffre d'affaires", "Nb commandes × panier moyen", "Ex. 25 × 60 € = 1 500 €/mois"],
    ["Coût matières", "28 – 32 % du CA HT", "420 – 480 €"],
    ["Charges fixes", "Loyer, assurance, abonnements", "150 – 400 €"],
    ["Charges sociales", "≈ 21,2 % du CA (micro BIC vente)", "≈ 318 €"],
    ["Résultat", "CA − charges", "À comparer au revenu cible"],
  ],
  ["Poste", "Méthode", "Exemple mensuel"],
)}

### 22.2 Le seuil de rentabilité

Seuil = charges fixes / taux de marge sur coût variable. Avec 300 € de charges fixes et une marge
sur coût variable de 68 %, le seuil est de 441 € de CA mensuel. En dessous, l'activité est
déficitaire ; le calculer avant de se lancer évite la désillusion du sixième mois.

### 22.3 Trésorerie

Acompte de 30 à 50 % à la commande sur les pièces sur mesure, solde à la livraison. Suivre un
tableau de trésorerie sur 12 mois glissants : l'activité pâtissière est saisonnière (pics
mariage mai-septembre, fêtes de fin d'année, Pâques).

### 22.4 Indicateurs de pilotage

Panier moyen, taux de transformation des devis, coût matière réel vs théorique, heures
travaillées par pièce, taux de réclamation. Quatre indicateurs suivis mensuellement valent mieux
que quinze suivis une fois.
`;

const ch23 = `
## Chapitre 23 — Cake design avancé : structures, tendances et sculpture

### 23.1 Gâteaux à étages et structures

Au-delà de trois étages, la structure interne devient obligatoire : dowels en polycarbonate,
plateau intermédiaire rigide, tige centrale traversante fixée sur un socle. Règle de charge :
un étage de 20 cm supporte au maximum deux étages supérieurs sans plateau de report.

${T(
  [
    ["2 étages", "Dowels bois/plastique", "Aucun socle spécifique"],
    ["3 – 4 étages", "Dowels + plateaux + tige centrale", "Socle rigide 12 mm"],
    ["Gâteau suspendu / gravity", "Tige métallique coudée", "Contrepoids et test à vide"],
    ["Sculpture 3D", "Armature interne + RKT", "Vérifier l'aptitude alimentaire"],
  ],
  ["Configuration", "Structure", "Précautions"],
)}

### 23.2 Techniques de finition

Ganache tranchante (arêtes vives à la raclette et à l'équerre), pâte à sucre lissée au fer,
buttercream à la spatule chauffée, effet marbre, effet aquarelle, drip contrôlé (ganache à
32 °C), feuille d'or alimentaire, isomalt pour les effets verre.

### 23.3 Tendances et durée de vie

Les tendances (naked cake, drip cake, fault line, textured buttercream) durent en moyenne deux à
trois saisons. Se positionner sur une signature stable — un style de décor, une palette, une
gamme de parfums — protège mieux qu'une course permanente à la nouveauté.

### 23.4 Transport et livraison

Boîte rigide, support antidérapant, plancher plat du véhicule, climatisation à 18 °C, assemblage
final sur place pour les pièces montées. Prévoir une trousse de retouche : poche de buttercream
de la même teinte, spatule, colle alimentaire, éléments de décor de rechange.
`;

const ch24 = `
## Chapitre 24 — Exercices complémentaires et corrigés

### Exercice 7 — Tempérage

Vous devez mouler 60 bonbons en couverture noire 66 %. Décrivez la courbe de température par la
méthode d'ensemencement, le contrôle réalisé avant moulage et les deux défauts que vous
surveillerez au démoulage.

### Exercice 8 — Prévisionnel

Vous visez 1 800 € de CA mensuel, un coût matière de 30 %, 250 € de charges fixes et un régime
micro-BIC (21,2 %). Calculez le résultat mensuel et le seuil de rentabilité.

### Exercice 9 — Allergènes

Une cliente commande un layer cake pour un enfant allergique aux fruits à coque. Vous travaillez
quotidiennement le praliné. Rédigez votre réponse commerciale en trois phrases.

### Exercice 10 — Structure

Un gâteau de mariage 120 parts sur 4 étages (30 / 25 / 20 / 15 cm) doit tenir 5 h en extérieur à
26 °C. Choisissez le type de masquage, la structure interne et le protocole de livraison.

### Exercice 11 — Stock

Votre coût matière réel ressort à 36 % contre 29 % théorique. Listez quatre causes possibles et
l'action de contrôle associée à chacune.

### Exercice 12 — Communication

Rédigez le texte d'une publication Instagram présentant une nouvelle gamme de 3 entremets :
accroche, description sensorielle, information pratique, appel à l'action.

### 24.1 Corrigés indicatifs

**Exercice 7** : fonte à 50 – 55 °C, ensemencement de 25 % de pistoles, descente à 28 – 29 °C
sous agitation, remontée à 31 – 32 °C. Contrôle sur pointe de couteau (prise en 3 – 5 min,
brillance). Défauts surveillés : blanchiment gras et démoulage difficile (sous-cristallisation).

**Exercice 8** : matières 540 €, charges sociales 381,60 €, charges fixes 250 € → résultat
≈ 628 €. Marge sur coût variable = 1 − (0,30 + 0,212) = 48,8 % ; seuil = 250 / 0,488 ≈ **512 € de
CA mensuel**.

**Exercice 9** : indiquer que l'atelier manipule des fruits à coque, qu'aucune garantie d'absence
de trace ne peut être donnée, proposer une alternative (production en début de journée sur
matériel nettoyé) et laisser la décision à la cliente, par écrit.

**Exercice 10** : masquage ganache (tenue supérieure au buttercream à 26 °C), dowels + plateaux
sur chaque étage + tige centrale, transport des étages séparés en glacière, assemblage sur place
et pose du décor final moins de 2 h avant le service.

**Exercice 11** : (1) pesées approximatives → repeser selon fiche technique ; (2) pertes et
ratés → suivi quotidien des rebuts ; (3) hausse fournisseur non répercutée → mise à jour
trimestrielle des prix ; (4) portions plus généreuses que prévu → contrôle du grammage par part.

**Exercice 12** : accroche courte, une phrase sensorielle par entremets, mention du délai de
commande de 72 h et de la zone de livraison, appel à l'action explicite (« commande en message
privé jusqu'à jeudi »).
`;

export const CHAPITRES_SUITE = [ch15, ch16, ch17, ch18, ch19, ch20, ch21, ch22, ch23, ch24];

export const SOMMAIRE_SUITE = `15. Le chocolat : tempérage, moulage et confiserie
16. Viennoiserie et pâtes levées feuilletées
17. Entremets modernes, inserts et glaçages
18. Allergènes, régimes spécifiques et substitutions
19. Équipement de l'atelier et investissement
20. Gestion des stocks, achats et fournisseurs
21. Communication digitale et vente en ligne
22. Prévisionnel économique et pilotage
23. Cake design avancé : structures, tendances et sculpture
24. Exercices complémentaires et corrigés`;
