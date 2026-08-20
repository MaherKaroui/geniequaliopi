/**
 * Support de cours — Indicateur 19
 * Pâtisserie & Cake design : ressources pédagogiques remises au bénéficiaire
 * dans le cadre du bilan de compétences (exploration du métier visé).
 *
 * Document long (30+ pages) : 14 chapitres, sauts de page entre chapitres.
 */
import type { BdcDocDef } from "./bdcTemplatesBC";
import { fmtDateFR } from "./bdcModel";

const PB = `\n<div style="page-break-after:always"></div>\n`;

const T = (rows: string[][], head: string[]) =>
  [`| ${head.join(" | ")} |`, `|${head.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");

/* ---------------------------------------------------------------- */
/* Chapitres                                                         */
/* ---------------------------------------------------------------- */

const ch1 = `
## Chapitre 1 — Le secteur de la pâtisserie et du cake design

### 1.1 Panorama du métier

La pâtisserie française repose sur un socle technique codifié : maîtrise des cuissons, des textures, des
températures et des équilibres sucre / matière grasse / acidité. Le **cake design**, apparu plus récemment,
associe ces fondamentaux à une dimension décorative et créative : sculpture de gâteaux, pâte à sucre,
modelage, travail de la couleur, mise en scène de la pièce montée.

Trois grandes familles d'exercice coexistent :

- **La pâtisserie de boutique** : production quotidienne, entremets, viennoiseries, tartes, service au comptoir.
- **La pâtisserie événementielle et le cake design** : commandes sur mesure (mariages, anniversaires,
  baptêmes, événements d'entreprise), forte valeur ajoutée artistique, production à la commande.
- **La pâtisserie de restauration** : desserts à l'assiette, travail en brigade, contraintes de dressage minute.

### 1.2 Les chiffres clés à connaître

${T(
  [
    ["Entreprises artisanales de pâtisserie (France)", "≈ 3 200 pâtisseries + 32 000 boulangeries-pâtisseries"],
    ["Poids du fait maison dans l'artisanat", "70 à 90 % de la production selon les enseignes"],
    ["Croissance du segment cake design", "Marché de niche en progression continue depuis 2015"],
    ["Saisonnalité", "Pics : mai-juillet (mariages), septembre, décembre (fêtes), Épiphanie, Pâques"],
    ["Panier moyen d'un gâteau personnalisé", "de 45 € à 250 € selon le nombre de parts et la complexité"],
  ],
  ["Indicateur", "Repère"],
)}

### 1.3 Les débouchés

Salariat en laboratoire, en boutique, en grande surface (rayon pâtisserie), en restauration collective ou
gastronomique ; création d'entreprise (laboratoire à domicile déclaré, boutique, corner, vente en ligne,
marchés) ; enseignement et animation d'ateliers ; production événementielle en sous-traitance pour des
traiteurs et wedding planners.

### 1.4 Les conditions réelles d'exercice

Le métier suppose une station debout prolongée, des horaires matinaux (prise de poste fréquente entre
4 h et 6 h en boutique), le port de charges (sacs de farine de 25 kg, plaques, cuves), une exposition
au froid et à la chaleur, et une activité intense en périodes de fêtes. En cake design indépendant,
les horaires sont plus souples mais la charge se concentre sur les fins de semaine.

> **À travailler en bilan** : confronter ces contraintes à sa situation personnelle (santé, contraintes
> familiales, mobilité, capacité d'investissement) avant de valider le projet.
`;

const ch2 = `
## Chapitre 2 — Hygiène, sécurité alimentaire et réglementation

### 2.1 Le paquet hygiène et la méthode HACCP

Toute activité de production alimentaire est soumise au règlement (CE) n° 852/2004. L'exploitant doit
mettre en place un **plan de maîtrise sanitaire (PMS)** comprenant :

1. Les bonnes pratiques d'hygiène (BPH) : tenue, lavage des mains, nettoyage-désinfection, plan de lutte
   contre les nuisibles, maîtrise de l'eau et des déchets.
2. Un plan **HACCP** en 7 principes : analyse des dangers, points critiques, limites critiques,
   surveillance, actions correctives, vérification, documentation.
3. La **traçabilité** amont/aval et la procédure de retrait-rappel.

### 2.2 Les 7 principes HACCP appliqués à la pâtisserie

${T(
  [
    ["1. Analyse des dangers", "Œufs crus (salmonelles), crème pâtissière, chaîne du froid rompue"],
    ["2. Points critiques (CCP)", "Cuisson ≥ 63 °C à cœur, refroidissement rapide, stockage 0-4 °C"],
    ["3. Limites critiques", "Refroidissement de +63 °C à +10 °C en moins de 2 heures"],
    ["4. Surveillance", "Relevés de températures 2×/jour, sondes étalonnées"],
    ["5. Actions correctives", "Destruction du lot, réglage ou réparation de l'enceinte froide"],
    ["6. Vérification", "Analyses microbiologiques périodiques, audit interne annuel"],
    ["7. Documentation", "Fiches de relevés, bons de livraison, étiquettes conservées"],
  ],
  ["Principe", "Application concrète"],
)}

### 2.3 Formation obligatoire et déclaration

- **Déclaration d'activité** auprès de la DDPP (ex-DDCSPP) avant ouverture (formulaire Cerfa 13984).
- **Agrément sanitaire** requis uniquement en cas de vente à d'autres professionnels au-delà des seuils
  de la dérogation « remise directe ».
- Au moins une personne formée à l'hygiène alimentaire dans l'établissement (formation type HACCP 14 h)
  pour les activités de restauration commerciale.

### 2.4 Allergènes et information du consommateur

Les 14 allergènes majeurs (règlement INCO n° 1169/2011) doivent être signalés : gluten, œufs, lait,
fruits à coque, arachides, soja, sésame, sulfites, lupin, céleri, moutarde, poissons, crustacés, mollusques.
En pâtisserie, quatre reviennent systématiquement : **gluten, œufs, lait, fruits à coque**.

### 2.5 Sécurité au travail

Risques principaux : brûlures (four, sucre cuit à 155 °C, caramel), coupures (lames, mandolines),
troubles musculo-squelettiques (gestes répétitifs, port de charges), chutes de plain-pied (sols gras).
Équipements : gants anti-chaleur, chaussures antidérapantes, plan de travail à bonne hauteur,
chariots pour éviter le port de plaques.
`;

const ch3 = `
## Chapitre 3 — Matières premières et fonctions des ingrédients

### 3.1 Les farines

${T(
  [
    ["T45", "9 à 11 %", "Pâtisserie fine, génoises, biscuits, pâte à choux"],
    ["T55", "10 à 12 %", "Pâtes feuilletées, pâtes brisées, tartes"],
    ["T65", "11 à 13 %", "Viennoiseries levées, brioches"],
    ["Farine de gruau", "13 à 15 %", "Brioches riches, pâtes levées feuilletées"],
  ],
  ["Type", "Taux de protéines", "Usage"],
)}

### 3.2 Les sucres et leurs rôles

Le sucre ne se limite pas au goût : il structure (cristallisation), colore (réaction de Maillard,
caramélisation dès 160 °C), conserve (activité de l'eau abaissée), aère (foisonnement avec le beurre)
et abaisse le point de congélation (indispensable en glacerie et pour les inserts).

- **Saccharose** : référence, pouvoir sucrant 1.
- **Glucose (sirop)** : anti-cristallisant, apporte du moelleux, pouvoir sucrant 0,5.
- **Trimoline / sucre inverti** : rétention d'eau, prolonge la conservation, pouvoir sucrant 1,25.
- **Cassonade, muscovado** : notes caramélisées, humidité résiduelle plus élevée.

### 3.3 Les matières grasses

Beurre (82 % MG) : goût, feuilletage, fondant. Beurre de tourage (84 % MG, plastique à froid) :
indispensable au feuilletage. Crème 35 % MG : foisonnement et ganaches. Huiles : moelleux durable
(cakes, muffins) mais absence de structure au froid.

### 3.4 Les œufs

Un œuf moyen = 50 g (jaune 20 g / blanc 30 g). Le jaune apporte lécithine (émulsifiant), couleur et
richesse ; le blanc apporte protéines coagulantes et pouvoir foisonnant. Coagulation : jaune 65-70 °C,
blanc 62-65 °C. **Règle sanitaire** : pas d'œuf cru dans une préparation non cuite destinée à la vente,
sauf ovoproduits pasteurisés.

### 3.5 Les gélifiants et texturants

${T(
  [
    ["Gélatine (2 g/feuille)", "Dose : 12 à 20 g/L", "Mousses, bavarois, glaçages miroir"],
    ["Pectine NH", "8 à 12 g/kg de fruits", "Inserts thermoréversibles, nappages"],
    ["Agar-agar", "3 à 6 g/L", "Gel ferme, résiste à 80 °C, alternative végétale"],
    ["Amidon / maïzena", "60 à 90 g/L", "Crème pâtissière, crémeux"],
  ],
  ["Texturant", "Dosage courant", "Usage"],
)}

### 3.6 Le chocolat

Courbes de tempérage à mémoriser :

- **Noir** : fonte 50-55 °C → cristallisation 28-29 °C → travail 31-32 °C.
- **Lait** : 45-50 °C → 27-28 °C → 29-30 °C.
- **Blanc** : 40-45 °C → 26-27 °C → 28-29 °C.

Un chocolat mal tempéré blanchit (blanchiment gras), ne casse pas net et colle au moule.
`;

const ch4 = `
## Chapitre 4 — Les pâtes de base

### 4.1 Pâte à choux

Recette de référence : 250 g eau (ou 125 eau / 125 lait), 100 g beurre, 4 g sel, 5 g sucre,
150 g farine T45, 250 à 300 g œufs.

**Procédé** : porter liquides + beurre + sel + sucre à ébullition → hors du feu, verser la farine
en une fois → dessécher 1 à 2 min à la spatule (la panade se détache et un voile se forme au fond) →
débarrasser, refroidir à 60 °C → incorporer les œufs progressivement jusqu'au « ruban en V ».
**Cuisson** : 180-200 °C, ne jamais ouvrir le four les 20 premières minutes.

**Défauts courants** : choux plats (panade trop humide ou trop d'œufs) ; choux creux qui retombent
(cuisson insuffisante) ; craquelures (four trop chaud).

### 4.2 Pâtes friables

${T(
  [
    ["Pâte brisée", "Sablage", "Tartes salées, fonds neutres"],
    ["Pâte sablée", "Sablage + sucre", "Fonds de tartes sucrées, sablés"],
    ["Pâte sucrée", "Crémage", "Tartes fines, croustillant régulier"],
    ["Pâte à foncer", "Sablage, peu de sucre", "Grandes tartes, fonçage haut"],
  ],
  ["Pâte", "Méthode", "Application"],
)}

Deux méthodes : le **sablage** (beurre froid + farine sablés avant hydratation → friabilité maximale)
et le **crémage** (beurre pommade + sucre montés, puis œufs, puis farine → texture plus fine et régulière).
Dans les deux cas : ne pas corser la pâte, filmer et reposer 2 h au froid avant abaisse.

### 4.3 Pâte feuilletée

Détrempe : 500 g farine, 250 g eau, 10 g sel, 50 g beurre fondu. Beurre de tourage : 375 g.
Tourage classique : 6 tours simples ou 3 tours doubles, 30 min de repos au froid entre chaque tour.
Le feuilletage inversé (beurre enveloppant la détrempe) donne un développement plus régulier et
une meilleure conservation du croustillant.

### 4.4 Pâtes levées

Brioche : 500 g farine de gruau, 300 g œufs, 10 g sel, 60 g sucre, 20 g levure fraîche, 250 g beurre.
Pétrissage 5 min en 1ʳᵉ vitesse puis 10-12 min en 2ᵉ jusqu'au décollement de la cuve, beurre incorporé
en fin de pétrissage, température de pâte visée **24 °C**. Pointage 1 h, rabat, pousse lente au froid
12 h, façonnage, apprêt 2 à 3 h à 25 °C, dorure, cuisson 170 °C.

### 4.5 Biscuits et masses montées

- **Génoise** : œufs + sucre montés au bain-marie à 45 °C puis refroidis au ruban, farine tamisée.
- **Biscuit Joconde** : poudre d'amande, base des entremets roulés et des bandes de contour.
- **Dacquoise** : blancs montés serrés + tant-pour-tant, croustillant en surface, moelleux à cœur.
- **Cake** : méthode crémage, densité contrôlée, cuisson longue à 160 °C, sirop d'imbibage à la sortie.
`;

const ch5 = `
## Chapitre 5 — Crèmes, mousses et garnitures

### 5.1 Les crèmes de base

${T(
  [
    ["Crème pâtissière", "Lait, jaunes, sucre, amidon", "Ébullition 1 min", "Choux, tartes, bases"],
    ["Crème mousseline", "Pâtissière + beurre monté", "—", "Fraisier, Paris-Brest"],
    ["Crème diplomate", "Pâtissière + gélatine + montée", "—", "Entremets légers"],
    ["Crème chiboust", "Pâtissière + meringue italienne", "—", "Saint-Honoré"],
    ["Crème d'amande", "Beurre, sucre, poudre d'amande, œufs", "Cuite avec la tarte", "Frangipane, tartes fruits"],
    ["Crème anglaise", "Lait, jaunes, sucre", "Cuisson 82-84 °C", "Base bavarois, glaces"],
  ],
  ["Crème", "Composition", "Point clé", "Usage"],
)}

### 5.2 Les ganaches

Ganache de base : chocolat + crème chaude, émulsion réalisée au centre puis élargie, mixage au mixeur
plongeant sans incorporer d'air. Ratios repères :

- Ganache à cadrer (bonbons) : noir 1/0,8 crème.
- Ganache de garniture : noir 1/1.
- Ganache montée : chocolat blanc 1/1 crème chaude + 2 crème froide, repos 12 h au froid, puis montée.

### 5.3 Les meringues

- **Française** : blancs + sucre à froid. Simple, fragile, séchée au four 90 °C.
- **Suisse** : blancs + sucre chauffés à 55 °C au bain-marie, puis montés. Dense, idéale pour décors.
- **Italienne** : sirop à 118-121 °C versé sur blancs montés. Stable, pastorisée, base des mousses
  et de la crème au beurre meringue italienne.

### 5.4 Mousses et bavarois

Structure type d'un entremets : biscuit → insert (crémeux ou gelée de fruits) → croustillant →
mousse → glaçage. Dosage de gélatine dans une mousse : 8 à 12 g par litre de préparation finale.
Montage **à l'envers** dans un cercle filmé, surgélation à −18 °C minimum 6 h, glaçage à 30-35 °C
sur entremets encore congelé.

### 5.5 Glaçages

- **Miroir neutre / cacao** : eau, sucre, glucose, lait concentré, gélatine, couverture.
- **Rocher** : couverture + huile de pépins de raisin + éclats d'amandes, application à 40 °C.
- **Fondant pâtissier** : réchauffé à 37 °C maximum, sinon il perd son brillant.
`;

const ch6 = `
## Chapitre 6 — Le cake design : techniques de base

### 6.1 Le gâteau support

Un gâteau de cake design doit être **structurellement stable** : il supporte poids, pâte à sucre et
manipulation. On privilégie des masses denses : molly cake, madeira cake, sponge cake, cake au beurre.
Les génoises légères s'affaissent sous la pâte à sucre.

**Molly cake (repère)** : 250 g farine, 250 g sucre, 250 g crème 35 % montée, 3 œufs, 10 g levure.
Cuisson 150 °C pendant 60 à 75 min pour un moule de 18 cm.

### 6.2 Le fourrage et le crumb coat

1. Refroidir puis trancher le gâteau en couches régulières (lyre ou couteau à génoise).
2. Imbiber légèrement (sirop 1:1) pour la conservation.
3. Poser un **cordon de contention** en ganache ou buttercream sur le pourtour avant garnissage.
4. Réaliser le **crumb coat** : fine couche qui emprisonne les miettes, 30 min de froid.
5. Lisser la couche finale à la spatule coudée et au lisseur, arêtes vives.

### 6.3 La pâte à sucre

Composition : sucre glace, glucose, glycérine, gélatine ou CMC. Étalage sur 3 à 4 mm, sur plan
légèrement saupoudré de fécule. Application : dérouler sur le gâteau, lisser du haut vers le bas
en chassant l'air, ébarber au cutter.

**Ennemis de la pâte à sucre** : humidité (elle « transpire »), froid positif humide (condensation),
chaleur (elle ramollit). Conservation du gâteau fini : température ambiante 18-20 °C sous boîte,
jamais au réfrigérateur ouvert.

### 6.4 Le buttercream

- **Américain** : beurre + sucre glace. Très sucré, très stable, facile.
- **Meringue suisse (SMBC)** : blancs + sucre à 55 °C montés + beurre. Soyeux, moins sucré, référence pro.
- **Crème au beurre française** : pâte à bombe + beurre. Riche, goût prononcé.

Application : lissage au grattoir sur plateau tournant, effets *ombré*, *rustic*, *drip cake*,
*naked cake*, *semi-naked*.

### 6.5 Les structures

Étages : chaque étage repose sur des **dowels** (piliers) coupés à hauteur, plus un axe central
pour le transport. Règle : au-delà de 2 étages, plaque à gâteau rigide sous chaque niveau.
Gâteaux sculptés : structure interne inox ou tige alimentaire fixée sur socle.
`;

const ch7 = `
## Chapitre 7 — Décor, modelage et couleur

### 7.1 Le modelage

Pâte à sucre + CMC (5 g/kg) = pâte à modeler tenue. Techniques : boule, cône, poire, boudin,
assemblage au spaghetti alimentaire, collage à la colle alimentaire ou à l'eau. Temps de séchage :
12 à 48 h selon l'épaisseur et l'hygrométrie.

### 7.2 Les fleurs en pâte à fleur (gum paste)

Étalage très fin (0,5 mm), emporte-pièces, veineurs, boulage sur tapis mousse, séchage sur formeur.
Assemblage au fil floral gainé, montage en bouquet, poudrage aux colorants secs pour les dégradés.
Une pivoine complète demande de 3 à 5 heures de travail : ce temps se facture.

### 7.3 La couleur

- **Colorants en gel** : pâte à sucre et buttercream (n'apportent pas d'eau).
- **Colorants liposolubles** : chocolat et beurre de cacao uniquement.
- **Colorants en poudre** : poudrage à sec, effets velours et ombrés.
- **Aérographe** : dégradés, pochoirs, effets marbrés.

Cercle chromatique : associer deux complémentaires (bleu/orange) crée un contraste fort ;
une harmonie analogue (rose/framboise/prune) reste douce et « pâtissière ». Attention aux colorants
qui foncent en séchant (rouge, noir) : préparer 24 h à l'avance.

### 7.4 Effets et tendances

Drip cake (ganache coulante), effet marbre, feuille d'or, isomalt (sucre transparent, coulé à 170 °C),
fleurs fraîches (tiges protégées, non toxiques uniquement), lettrage en glace royale, impression
alimentaire sur feuille azyme ou pâte à sucre.

### 7.5 La glace royale

200 g sucre glace tamisé + 30 à 35 g de blanc d'œuf (ou albumine réhydratée) + quelques gouttes de
jus de citron. Consistances : ferme (contours et fleurs), moyenne (écriture), fluide (remplissage,
technique *flooding*).
`;

const ch8 = `
## Chapitre 8 — Organisation du travail et production

### 8.1 La fiche technique

Une fiche technique complète comporte : nom du produit, nombre de parts, liste des ingrédients avec
grammages et coûts unitaires, progression détaillée, matériel, températures et temps, allergènes,
DLC, photo du produit fini. C'est le document de référence pour la régularité et pour le coût matière.

### 8.2 Planifier une production

Méthode du **rétroplanning** : partir de l'heure de livraison et remonter.

${T(
  [
    ["J-5", "Commande matières premières, vérification stocks"],
    ["J-4", "Cuisson des biscuits, surgélation"],
    ["J-3", "Inserts, croustillants, modelage des sujets (séchage)"],
    ["J-2", "Montage des entremets, surgélation ; ganache de couverture"],
    ["J-1", "Glaçage, masquage, pose de la pâte à sucre, décor"],
    ["Jour J", "Assemblage des étages, finitions, transport"],
  ],
  ["Échéance", "Tâche"],
)}

### 8.3 La marche en avant

Principe : les produits progressent du sale vers le propre sans jamais revenir en arrière.
Zones : réception → stockage → déballage → préparation → cuisson → refroidissement → conditionnement →
expédition. Quand l'espace ne le permet pas, on applique une **marche en avant dans le temps**
(séparation des tâches par plages horaires avec nettoyage intermédiaire).

### 8.4 Gestion des stocks

Rotation **FIFO / PEPS** (premier entré, premier sorti), étiquetage systématique à l'ouverture
(produit, date d'ouverture, DLC secondaire), inventaire mensuel, calcul du taux de perte
(objectif < 3 % en pâtisserie de commande).

### 8.5 Conservation et transport

${T(
  [
    ["Entremets glacé (surgelé)", "−18 °C", "3 mois"],
    ["Entremets décongelé", "0 à +4 °C", "48 à 72 h"],
    ["Gâteau pâte à sucre", "18-20 °C, boîte fermée", "3 à 4 jours"],
    ["Ganache montée", "+4 °C", "48 h"],
    ["Macarons garnis", "+4 °C", "5 jours (maturation 24 h)"],
  ],
  ["Produit", "Température", "Durée"],
)}

Transport : boîte rigide, socle antidérapant, coffre climatisé ou glacière, conduite souple,
pas de gâteau monté à plus de deux étages en véhicule (assemblage sur site).
`;

const ch9 = `
## Chapitre 9 — Coût de revient et fixation des prix

### 9.1 Calculer un coût matière

Coût matière = Σ (quantité utilisée × prix au kg / L). On y ajoute une majoration de 3 à 5 %
pour les pertes et les fournitures de finition (colorants, dowels, plateaux, boîtes).

**Exemple : gâteau pâte à sucre 20 parts**

${T(
  [
    ["Molly cake (3 étages 20 cm)", "6,80 €"],
    ["Ganache montée chocolat blanc", "9,40 €"],
    ["Pâte à sucre + colorants", "7,20 €"],
    ["Modelages et décors", "4,10 €"],
    ["Emballage, plateau, dowels", "3,50 €"],
    ["**Total matière**", "**31,00 €**"],
  ],
  ["Poste", "Coût"],
)}

### 9.2 Valoriser le temps de travail

Temps réel : 1 h de préparation + 2 h de cuisson (surveillance 0,5 h) + 1,5 h de masquage +
3 h de décor + 0,5 h de nettoyage = **6,5 h**. Au taux horaire cible de 25 €/h : **162,50 €**.

### 9.3 Structure de prix

Prix de vente HT = (coût matière + main-d'œuvre + charges fixes réparties) × (1 + marge).
Repère de gestion : le **coût matière ne doit pas dépasser 25 à 30 %** du prix de vente HT en
pâtisserie de commande.

Pour l'exemple ci-dessus : coût de revient ≈ 31 + 162,50 + 20 (quote-part charges) = 213,50 € →
prix de vente conseillé 260 à 290 € TTC pour 20 parts (13 à 14,50 € la part).

### 9.4 TVA applicable

- **5,5 %** : produits alimentaires destinés à la consommation différée (gâteau à emporter).
- **10 %** : consommation immédiate sur place.
- Franchise en base de TVA possible sous les seuils applicables au régime micro-entreprise.

### 9.5 Le seuil de rentabilité

Seuil = charges fixes / taux de marge sur coût variable. Exemple : 900 € de charges fixes mensuelles,
taux de marge 70 % → il faut réaliser **1 286 € de chiffre d'affaires mensuel** pour couvrir les charges,
soit environ 5 gâteaux de commande par mois avant tout revenu.
`;

const ch10 = `
## Chapitre 10 — Statuts, installation et démarches

### 10.1 Le diplôme et la qualification

L'activité de pâtissier est une **activité artisanale réglementée** : elle exige un CAP/BEP du métier
ou une expérience professionnelle de **3 ans** dans le métier (art. 16 de la loi du 5 juillet 1996).
Voies d'accès : CAP Pâtissier en 1 an (candidat libre ou formation continue), mention complémentaire
(MC Pâtisserie boulangère, MC Desserts de restaurant), BTM Pâtissier, VAE.

### 10.2 Choisir un statut

${T(
  [
    ["Micro-entreprise", "Simplicité, charges proportionnelles", "Plafond de CA, pas de déduction des achats"],
    ["EI au réel", "Déduction des charges, TVA récupérable", "Comptabilité plus lourde"],
    ["EURL / SASU", "Crédibilité, protection du patrimoine", "Formalités et coût de gestion"],
  ],
  ["Statut", "Avantages", "Limites"],
)}

### 10.3 Les démarches d'installation

1. Stage / accompagnement à la création (facultatif mais recommandé).
2. Immatriculation au **répertoire des métiers** (CMA) via le guichet unique des entreprises.
3. Déclaration d'établissement à la **DDPP**.
4. Conformité du **laboratoire** : surfaces lessivables, poste de lavage des mains à commande non
   manuelle, séparation propre/sale, plan de nettoyage, enceintes froides avec relevés.
5. Assurance **RC professionnelle** et, le cas échéant, multirisque du local.
6. Ouverture d'un compte bancaire dédié, choix d'un logiciel de caisse conforme.

### 10.4 Le laboratoire à domicile

Il est possible sous conditions : local dédié et exclusivement affecté à la production, pas de
circulation domestique pendant la production, animaux interdits, accord du bailleur ou du règlement
de copropriété, déclaration DDPP. C'est la voie d'entrée la plus fréquente en cake design.

### 10.5 L'investissement de départ (repères)

${T(
  [
    ["Four ventilé professionnel 4 niveaux", "1 500 à 4 000 €"],
    ["Batteur planétaire 7 à 10 L", "600 à 2 500 €"],
    ["Réfrigérateur + congélateur pro", "1 200 à 3 000 €"],
    ["Petit matériel, moules, cercles", "800 à 1 500 €"],
    ["Aménagement laboratoire (inox, plonge)", "2 000 à 6 000 €"],
    ["**Budget d'entrée réaliste**", "**6 000 à 15 000 €**"],
  ],
  ["Poste", "Montant"],
)}
`;

const ch11 = `
## Chapitre 11 — Commercialisation et relation client

### 11.1 Définir son positionnement

Trois questions structurantes : **à qui** je vends (particuliers, professionnels, entreprises) ;
**quoi** (gâteaux d'exception, pâtisserie du quotidien, ateliers) ; **à quel prix** (entrée de gamme,
milieu, premium). Un positionnement flou entraîne des prix bas et une charge de travail non rentable.

### 11.2 La prise de commande

Trame d'entretien client :

1. Événement, date, heure et lieu de livraison.
2. Nombre de parts (règle : 1 part = 100 g de gâteau fini environ).
3. Parfums, allergies et interdits alimentaires.
4. Univers visuel (thème, couleurs, photos de référence).
5. Budget annoncé — à demander **avant** de proposer un croquis.
6. Devis écrit, acompte de 30 % à la commande, conditions d'annulation.

### 11.3 Communication et visibilité

Instagram et Facebook restent les vitrines dominantes du cake design : photo soignée sur fond neutre,
lumière naturelle, publication régulière, stories de coulisses. Google Business Profile pour le
référencement local. Partenariats : wedding planners, salles de réception, fleuristes, photographes.

### 11.4 Fidélisation

Carte de remerciement dans la boîte, relance à J+3 avec demande d'avis, offre anniversaire à J+11 mois,
programme de parrainage. Le coût d'acquisition d'un nouveau client est 5 fois supérieur à celui de la
fidélisation d'un client existant.

### 11.5 Gérer une réclamation

Écouter sans interrompre → reformuler → constater les faits (photos) → proposer une solution graduée
(geste commercial, refonte, remboursement partiel) → tracer la réclamation → analyser la cause racine
et corriger la fiche technique ou le process concerné.
`;

const ch12 = `
## Chapitre 12 — Se former et progresser

### 12.1 Les certifications accessibles

${T(
  [
    ["CAP Pâtissier", "RNCP niveau 3", "1 an en formation continue / candidat libre"],
    ["MC Pâtisserie boulangère", "RNCP niveau 3", "1 an après CAP"],
    ["BTM Pâtissier", "RNCP niveau 4", "2 ans en apprentissage"],
    ["Titre Chef pâtissier", "Niveau 4/5 selon organisme", "Formation privée certifiante"],
    ["Formation cake design", "Non certifiante en général", "Modules courts 2 à 10 jours"],
  ],
  ["Certification", "Niveau", "Durée type"],
)}

### 12.2 Financer sa formation

- **CPF** : mobilisable pour le CAP Pâtissier et les titres inscrits au RNCP / RS.
- **Transition professionnelle (PTP)** : maintien de rémunération pour un salarié en reconversion.
- **France Travail** : AIF, POEI, aides à la reprise ou création d'entreprise (ARCE, ARE maintenue).
- **OPCO** : plan de développement des compétences pour les salariés.
- **Conseil régional** : programmes régionaux de formation pour demandeurs d'emploi.

### 12.3 L'immersion professionnelle

La **PMSMP** (période de mise en situation en milieu professionnel, jusqu'à 1 mois renouvelable) est
l'outil le plus efficace pour valider un projet en pâtisserie : elle confronte aux horaires, à la
cadence et à la posture physique réelles. À demander via France Travail, Mission locale ou Cap emploi.

### 12.4 Ressources d'auto-formation

Ouvrages de référence (Le Cordon Bleu, *Encyclopédie du chocolat*, ouvrages Ferrandi), chaînes
techniques en ligne, salons professionnels (Europain, Sirha, Salon du Cake Design), concours amateurs
et associations locales de pâtissiers.

### 12.5 Construire son portfolio

Photographier chaque réalisation dans des conditions constantes, documenter la fiche technique, noter
le temps réel passé et les difficultés rencontrées. Au bout de 20 à 30 pièces, le portfolio devient
un outil de vente et un support de candidature.
`;

const ch13 = `
## Chapitre 13 — Exercices d'application

### Exercice 1 — Calcul de coût de revient

Un entremets de 8 parts nécessite : 180 g de couverture noire (11 €/kg), 300 g de crème 35 %
(4,20 €/L), 120 g de sucre (1,10 €/kg), 4 œufs (0,32 € pièce), 90 g de beurre (8,50 €/kg),
80 g de poudre d'amande (14 €/kg).
**Questions** : (a) calculez le coût matière ; (b) ajoutez 5 % de pertes ; (c) proposez un prix de
vente TTC en visant un coût matière à 28 % du prix HT (TVA 5,5 %).

### Exercice 2 — Rétroplanning

Un client commande pour le samedi 14 h un gâteau à 2 étages en pâte à sucre avec 3 modelages.
Construisez le rétroplanning complet du lundi au samedi, en précisant les temps de séchage.

### Exercice 3 — Diagnostic de défaut

Vos choux se développent puis retombent à la sortie du four ; leur base est humide.
Identifiez trois causes possibles et l'action corrective associée pour chacune.

### Exercice 4 — HACCP

Vous produisez 40 éclairs le jeudi pour une livraison le vendredi midi. Listez les points critiques
de cette production et les limites critiques associées (températures et durées).

### Exercice 5 — Positionnement commercial

Rédigez en 10 lignes la présentation de votre future activité : cible, gamme, gamme de prix,
zone de chalandise, canal de vente principal, élément différenciant.

### Exercice 6 — Entretien client

Simulez une prise de commande pour un gâteau de mariage 80 parts, budget annoncé 350 €.
Le budget est-il tenable ? Que proposez-vous comme alternatives ?
`;

const ch14 = `
## Chapitre 14 — Corrigés et lexique

### 14.1 Corrigés indicatifs

**Exercice 1** : couverture 1,98 € + crème 1,26 € + sucre 0,13 € + œufs 1,28 € + beurre 0,77 € +
amande 1,12 € = **6,54 €** ; avec 5 % de pertes = **6,87 €**. À 28 % du prix HT :
6,87 / 0,28 = 24,54 € HT, soit **≈ 25,90 € TTC**, environ 3,25 € la part.

**Exercice 2** : lundi commande matières ; mardi modelages (séchage 48 h) ; mercredi cuisson des
gâteaux + surgélation ; jeudi ganache, fourrage, crumb coat ; vendredi masquage pâte à sucre +
décor ; samedi matin assemblage des étages, pose des modelages, livraison 13 h.

**Exercice 3** : (1) cuisson insuffisante → prolonger et entrouvrir en fin de cuisson ; (2) panade
trop hydratée → dessécher davantage, ajuster les œufs au ruban ; (3) four ouvert trop tôt → ne pas
ouvrir avant 20 min.

**Exercice 4** : CCP cuisson de la crème pâtissière (ébullition 1 min) ; CCP refroidissement rapide
(+63 → +10 °C en < 2 h) ; CCP stockage (0 à +4 °C) ; garnissage au plus près de la vente ;
DLC 24 h à +4 °C.

### 14.2 Lexique professionnel

${T(
  [
    ["Abaisser", "Étaler une pâte au rouleau à l'épaisseur voulue"],
    ["Chemiser", "Garnir un moule de papier, de beurre-farine ou de biscuit"],
    ["Corser", "Donner trop d'élasticité à une pâte par excès de travail"],
    ["Crumb coat", "Première couche fine qui emprisonne les miettes"],
    ["Dowel", "Pilier de soutien inséré entre deux étages"],
    ["Foisonner", "Incorporer de l'air dans une préparation"],
    ["Ganache montée", "Ganache refroidie puis montée au batteur"],
    ["Insert", "Élément congelé placé au cœur d'un entremets"],
    ["Pointage", "Première fermentation d'une pâte levée"],
    ["Ruban", "Consistance d'un appareil qui retombe en formant un ruban"],
    ["Tabler", "Précristalliser le chocolat sur marbre"],
    ["Tourage", "Opération de pliage du feuilletage"],
  ],
  ["Terme", "Définition"],
)}

### 14.3 Pour aller plus loin

Consulter les référentiels du CAP Pâtissier sur France Compétences, les fiches métiers ROME
(D1104 Pâtisserie, confiserie, chocolaterie), les guides de bonnes pratiques d'hygiène de la
Confédération nationale de la boulangerie-pâtisserie, et les fiches pratiques de la Chambre de
métiers et de l'artisanat pour l'installation.
`;

const SOMMAIRE = `
## Sommaire

1. Le secteur de la pâtisserie et du cake design
2. Hygiène, sécurité alimentaire et réglementation
3. Matières premières et fonctions des ingrédients
4. Les pâtes de base
5. Crèmes, mousses et garnitures
6. Le cake design : techniques de base
7. Décor, modelage et couleur
8. Organisation du travail et production
9. Coût de revient et fixation des prix
10. Statuts, installation et démarches
11. Commercialisation et relation client
12. Se former et progresser
13. Exercices d'application
14. Corrigés et lexique
${SOMMAIRE_SUITE}
`;

export const supportCoursPatisserie: BdcDocDef = {
  nom: "Indicateur 19 - Support de cours Pâtisserie et Cake design",
  indicateur: 19,
  parBeneficiaire: false,
  build: (ctx) => {
    const { organisme: o, prestation: p } = ctx;
    const chapitres = [
      ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10, ch11, ch12, ch13, ch14,
      ...CHAPITRES_SUITE,
    ];
    return [
      `# Support de cours — Pâtisserie & Cake design\n`,
      `_Ressource pédagogique remise dans le cadre du bilan de compétences — Indicateur 19._\n`,
      `**Organisme** : ${o.raisonSociale} — SIRET ${o.siret}  `,
      `**Consultant référent** : ${p.consultant.nom}  `,
      `**Version** : 2.0 — mise à jour du ${fmtDateFR(new Date())}  `,
      `**Volume** : ${chapitres.length} chapitres — exercices et corrigés inclus`,
      "",
      `Ce support accompagne l'exploration du projet professionnel en pâtisserie et cake design. Il couvre
les fondamentaux techniques du métier, le cadre réglementaire et sanitaire, l'organisation de la
production, la gestion économique d'une activité et les voies de formation. Il constitue une ressource
de travail personnel entre les séances d'accompagnement.`,
      SOMMAIRE,
      PB,
      chapitres.join(PB),
    ].join("\n");
  },
};

