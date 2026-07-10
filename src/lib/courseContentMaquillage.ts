/**
 * Contenu pédagogique – Formation MAQUILLEUR PROFESSIONNEL (5 jours, 35 h).
 * Programme officiel Maison HSY / Bellezza & Co : accueil client, hygiène, diagnostic
 * peau et morphologie, teint / contouring / strobing, sourcils, yeux, bouche, examen.
 * Utilisé pour le Support de cours (CT4 – IND 18/19) — Action de Formation Qualiopi.
 */
import { CourseChapter } from "./courseContent";

const IMG = {
  accueil: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80",
  hygiene: "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=900&q=80",
  diagnostic: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80",
  morphologie: "https://images.unsplash.com/photo-1503236823255-94609f598e71?w=900&q=80",
  peau: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80",
  fondTeint: "https://images.unsplash.com/photo-1522335789203-aaaa66c1a09b?w=900&q=80",
  contouring: "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=900&q=80",
  sourcils: "https://images.unsplash.com/photo-1512257492854-c0900cf6cdad?w=900&q=80",
  yeux: "https://images.unsplash.com/photo-1583241800698-9c2e30d16fa2?w=900&q=80",
  bouche: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&q=80",
  pinceaux: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=900&q=80",
  produits: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=900&q=80",
  mariee: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?w=900&q=80",
  examen: "https://images.unsplash.com/photo-1526045478516-99145907023c?w=900&q=80",
};

const photo = (src: string, alt: string) =>
  `<figure style="margin:12px 0;text-align:center"><img src="${src}" alt="${alt}" loading="lazy" style="max-width:100%;height:auto;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.12)" /><figcaption style="font-size:12px;color:#666;margin-top:6px;font-style:italic">${alt}</figcaption></figure>`;

const exo = (titre: string, enonce: string, corrige: string) =>
  `<div style="background:#fef6e4;border-left:4px solid #f59e0b;padding:14px;border-radius:6px;margin:14px 0"><p style="margin:0 0 6px 0;font-weight:bold;color:#92400e">📝 Exercice – ${titre}</p><p style="margin:0 0 10px 0">${enonce}</p><details style="margin-top:8px"><summary style="cursor:pointer;font-weight:bold;color:#16a34a">✅ Voir le corrigé</summary><div style="background:#f0fdf4;padding:10px;border-radius:4px;margin-top:6px">${corrige}</div></details></div>`;

export function getMaquillageChapters(): CourseChapter[] {
  return [
    // ═══════════════════ MODULE 1 – JOUR 1 (matin) ═══════════════════
    {
      title: "Module 1 – Accueil client et protocole d'hygiène",
      description: "Bases de l'accueil professionnel et règles d'hygiène rigoureuses en cabine de maquillage (Jour 1).",
      sections: [
        {
          title: "1.1 – Les 7 étapes de l'accueil client",
          content: `${photo(IMG.accueil, "Accueil personnalisé en cabine de maquillage")}
<p>L'accueil conditionne <strong>70 %</strong> de la satisfaction cliente. La maquilleuse professionnelle applique un protocole standardisé :</p>
<ol>
<li><strong>Sourire, regard et prononciation du prénom</strong> à l'arrivée.</li>
<li><strong>Proposition d'une boisson</strong> (eau, thé, café) et vestiaire.</li>
<li><strong>Installation confortable</strong> devant le miroir (fauteuil hydraulique, éclairage lumière du jour 5500 K).</li>
<li><strong>Questions ouvertes</strong> sur l'occasion (mariage, shooting, soirée, quotidien), l'ambiance recherchée (naturel, glam, artistique).</li>
<li><strong>Recueil des contre-indications</strong> : allergies (latex, parfums, conservateurs), traitements dermatologiques (Roaccutane, peelings récents), lentilles de contact.</li>
<li><strong>Présentation du déroulé</strong> et de la durée estimée (60 à 90 min).</li>
<li><strong>Validation d'une inspiration visuelle</strong> (moodboard, photos client) avant démarrage.</li>
</ol>
<p><strong>Fiche cliente</strong> : à remplir dès le premier RDV (nom, téléphone, type de peau, produits utilisés, occasion, photos avant/après). Traçabilité Qualiopi IND 30.</p>`,
        },
        {
          title: "1.2 – Protocole d'hygiène rigoureux",
          content: `${photo(IMG.hygiene, "Désinfection des pinceaux à maquillage")}
<p><strong>Règles d'or de la maquilleuse professionnelle</strong> (référentiel DGCCRF + Règlement CE n°1223/2009) :</p>
<ul>
<li><strong>Lavage des mains</strong> : savon + solution hydro-alcoolique avant et après chaque cliente.</li>
<li><strong>Pinceaux</strong> : nettoyage au spray désinfectant à base d'alcool 70° entre chaque cliente ; lavage complet (savon de Marseille + huile végétale) au moins 1×/semaine.</li>
<li><strong>Éponges</strong> : usage unique OU lavage à 60° si mousse silicone dédiée à une seule cliente.</li>
<li><strong>Prélèvement des produits</strong> : spatule jetable pour les crèmes en pot, aiguisage des crayons à chaque utilisation (dépose la couche superficielle).</li>
<li><strong>Rouge à lèvres</strong> : prélèvement au pinceau lèvres jetable ou coupe de la couche superficielle au coupe-fromage cosmétique.</li>
<li><strong>Mascara</strong> : privilégier les mascaras jetables (spoolies individuels).</li>
<li><strong>Linge</strong> : cape, serviette, bandeau frontal propres par cliente.</li>
<li><strong>Élimination</strong> des lingettes usagées dans une poubelle fermée ; DASRI si présence de sang (blessure accidentelle avec pince à épiler).</li>
</ul>
<p><strong>Contre-indications absolues</strong> : herpès labial actif, conjonctivite, orgelet, eczéma suintant, plaie ouverte. Reporter le RDV.</p>`,
        },
        {
          title: "1.3 – Identification des types de peau et produits adaptés",
          content: `${photo(IMG.peau, "Diagnostic du type de peau au diagnostic visuel")}
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#fce7f3"><th>Type de peau</th><th>Reconnaissance</th><th>Produits maquillage adaptés</th></tr>
<tr><td><strong>Normale</strong></td><td>Grain fin, souple, pores discrets</td><td>Base hydratante légère, FDT fluide, poudre libre voile</td></tr>
<tr><td><strong>Sèche</strong></td><td>Tiraille, ridules, aspect terne</td><td>Base hydratante riche, FDT liquide lumineux, éviter poudres compactes</td></tr>
<tr><td><strong>Grasse</strong></td><td>Brillance zone T, pores dilatés</td><td>Base matifiante, FDT matte longue tenue, poudre matifiante, spray fixateur</td></tr>
<tr><td><strong>Mixte</strong></td><td>Zone T grasse, joues normales</td><td>Multi-textures : matifiante zone T, hydratante joues</td></tr>
<tr><td><strong>Sensible</strong></td><td>Rougeurs, réactivité, couperose</td><td>Base anti-rougeurs verte, FDT hypoallergénique, éviter parfums</td></tr>
<tr><td><strong>Mature</strong></td><td>Rides, relâchement, taches</td><td>Base lissante repulpante, FDT à la lumière réflective, éviter poudres lourdes</td></tr>
</table>
<p><strong>Piège fréquent</strong> : peau grasse ≠ peau déshydratée. Une peau grasse peut manquer d'eau et compenser par un excès de sébum. Diagnostic à confirmer par palpation.</p>`,
        },
        {
          title: "1.4 – Exercices d'application",
          content: `${exo(
            "Accueil client",
            "Une cliente arrive en avance pour un maquillage de mariage. Elle semble anxieuse et vous montre 3 photos très différentes (nude, smoky, coloré). Décrivez les 4 premières étapes de votre accueil.",
            "<ol><li><strong>Sourire, prononciation du prénom, boisson chaude</strong> (thé/tisane apaisante), installation en cabine.</li><li><strong>Écoute active</strong> : « Racontez-moi votre mariage, l'ambiance, votre robe. » (question ouverte, laisser parler).</li><li><strong>Recueil contre-indications</strong> : lentilles, allergies, traitements peau récents, essais maquillage antérieurs.</li><li><strong>Analyse des 3 inspirations ensemble</strong> : identifier le fil conducteur (yeux ? lèvres ? teint ?), proposer une <strong>synthèse cohérente avec sa robe et sa personnalité</strong>, valider par une phrase rassurante : « Vous serez lumineuse et reconnue par vos proches. » Photo avant + accord écrit sur fiche cliente.</li></ol>"
          )}
${exo(
  "Contre-indication",
  "Une cliente arrive avec un herpès labial en poussée (bouton visible sur la lèvre supérieure). Que faites-vous ?",
  "<p><strong>Refus courtois et empathique du maquillage lèvres</strong> (risque de contamination du pinceau et de propagation). Deux options : <br>1. Reporter le RDV complet à 8-10 jours (cicatrisation) — <strong>recommandé pour un shooting/mariage</strong>.<br>2. Réaliser uniquement le teint et les yeux, laisser les lèvres nues avec un baume Compeed ou anti-viral (Aciclovir). Utiliser un pinceau lèvres jetable jeté aussitôt.<br>Noter le refus motivé et la solution proposée sur la fiche cliente (traçabilité Qualiopi).</p>"
)}`,
        },
      ],
    },

    // ═══════════════════ MODULE 2 – JOUR 2 (matin) ═══════════════════
    {
      title: "Module 2 – Diagnostic morphologique et colorimétrie",
      description: "Analyse de la forme du visage, colorimétrie et carnation pour un maquillage sur-mesure (Jour 2).",
      sections: [
        {
          title: "2.1 – Les 7 formes de visage",
          content: `${photo(IMG.morphologie, "Étude morphologique du visage")}
<p>Avant tout maquillage, identifier la forme dominante permet d'<strong>équilibrer le visage</strong> par le contouring :</p>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#fce7f3"><th>Forme</th><th>Reconnaissance</th><th>Objectif contouring / blush</th></tr>
<tr><td><strong>Ovale</strong></td><td>Longueur ≈ 1,5 × largeur, front et mâchoire équilibrés</td><td>Forme de référence — mise en valeur des pommettes</td></tr>
<tr><td><strong>Rond</strong></td><td>Longueur ≈ largeur, joues pleines</td><td>Allonger verticalement : contouring temples + sous-joues, blush diagonal</td></tr>
<tr><td><strong>Carré</strong></td><td>Front, pommettes et mâchoire de largeur similaire, angles marqués</td><td>Adoucir les angles mâchoire et temples, blush arrondi sur pommettes</td></tr>
<tr><td><strong>Long / rectangulaire</strong></td><td>Longueur nettement > largeur, front haut</td><td>Raccourcir horizontalement : contouring front + menton, blush horizontal</td></tr>
<tr><td><strong>Triangle / poire</strong></td><td>Mâchoire plus large que front</td><td>Élargir front (highlight temples), affiner mâchoire (contouring)</td></tr>
<tr><td><strong>Triangle inversé</strong></td><td>Front large, menton fin</td><td>Adoucir tempes (contouring), élargir mâchoire (highlight menton)</td></tr>
<tr><td><strong>Cœur</strong></td><td>Front large, pommettes hautes, menton pointu</td><td>Adoucir front (contouring léger), highlight pommettes hautes</td></tr>
</table>`,
        },
        {
          title: "2.2 – Colorimétrie et sous-tons de peau",
          content: `<p>Le <strong>sous-ton</strong> détermine le choix du fond de teint, du blush, du rouge à lèvres et des couleurs qui subliment :</p>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#fce7f3"><th>Sous-ton</th><th>Reconnaissance</th><th>Couleurs qui subliment</th><th>À éviter</th></tr>
<tr><td><strong>Chaud (jaune, doré, olive)</strong></td><td>Veines vertes au poignet, bronze facile, or flatteur</td><td>Corail, pêche, terracotta, rouge brique, bronze, or</td><td>Rose froid, argent, prune</td></tr>
<tr><td><strong>Froid (rose, bleuté)</strong></td><td>Veines bleues/violettes, bronze rouge, argent flatteur</td><td>Rose, framboise, bordeaux, mauve, argent, gris</td><td>Orange, doré, corail</td></tr>
<tr><td><strong>Neutre</strong></td><td>Veines mixtes, or et argent flatteurs</td><td>Nude, taupe, rosé pêche, bordeaux</td><td>Peu de restrictions</td></tr>
</table>
<p><strong>Test rapide en cabine</strong> : appliquer une bandelette or et une bandelette argent près du visage. Celle qui illumine sans rougir la peau = sous-ton dominant.</p>
<p><strong>Échelle de carnation Fitzpatrick</strong> (I à VI) : de la peau très claire réactive (I) à la peau noire très foncée (VI). Utile pour choisir la teinte de FDT et anticiper la tolérance solaire.</p>`,
        },
        {
          title: "2.3 – Préparation de la peau",
          content: `<ol>
<li><strong>Démaquillage bi-phase</strong> (30 s) : eau micellaire ou huile démaquillante — mouvements doux du bas vers le haut, contour des yeux inclus.</li>
<li><strong>Nettoyant doux</strong> pH 5,5 (mousse ou gel selon type de peau).</li>
<li><strong>Tonique sans alcool</strong> apaisant : rééquilibre le pH cutané.</li>
<li><strong>Sérum ciblé</strong> : acide hyaluronique (hydratation), vitamine C (éclat), niacinamide (matifiant).</li>
<li><strong>Contour des yeux</strong> : soin spécifique tapoté à l'annulaire (aucune traction).</li>
<li><strong>Crème adaptée au type de peau</strong> : attendre 2 min d'absorption.</li>
<li><strong>Primer / base</strong> : lissante (comble pores), hydratante (peau sèche), matifiante (zone T), illuminatrice (peau terne), verte (rougeurs), mauve (teint jaune terne).</li>
<li><strong>Protection solaire SPF 30-50</strong> si maquillage jour ou extérieur.</li>
</ol>
<p><strong>Timing total préparation</strong> : 8 à 12 minutes selon le type de peau. Sans cette étape, le maquillage ne tient pas et se marque dans les ridules.</p>`,
        },
        {
          title: "2.4 – Correction des imperfections",
          content: `<p>La <strong>théorie des couleurs complémentaires</strong> est la clé de la correction professionnelle :</p>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#fce7f3"><th>Imperfection</th><th>Correcteur couleur</th><th>Zone d'application</th></tr>
<tr><td>Rougeurs, boutons, couperose</td><td><strong>Vert</strong></td><td>Ponctuel sur la zone rouge</td></tr>
<tr><td>Cernes bleutés / violacés</td><td><strong>Orange / pêche</strong> (peaux claires : pêche ; peaux mates/foncées : orange)</td><td>Triangle inversé sous l'œil</td></tr>
<tr><td>Teint terne, cireux</td><td><strong>Mauve / lilas</strong></td><td>Front, menton, ailes du nez</td></tr>
<tr><td>Cernes bruns / hyperpigmentation</td><td><strong>Pêche saumon</strong></td><td>Ponctuel</td></tr>
<tr><td>Rosacée sévère</td><td><strong>Jaune</strong></td><td>Sur toute la zone concernée</td></tr>
</table>
<p><strong>Règle d'or</strong> : correcteurs AVANT le fond de teint (posés en couche fine puis estompés au pinceau langue-de-chat ou éponge humide).</p>
${exo(
  "Cas pratique diagnostic",
  "Cliente : 32 ans, sous-ton chaud, visage rond, peau mixte avec cernes bleutés marqués et rougeurs sur les ailes du nez. Elle veut un maquillage de soirée. Quelles décisions techniques prenez-vous ?",
  "<p><strong>Sous-ton chaud</strong> → FDT à sous-ton doré/beige chaud, blush corail ou pêche, rouge à lèvres terracotta ou brique.<br><strong>Visage rond</strong> → contouring vertical (temples + sous-pommettes), blush en diagonal, sourcils arqués pour allonger.<br><strong>Peau mixte</strong> → base matifiante zone T + hydratante joues, poudre matifiante ponctuelle.<br><strong>Cernes bleutés</strong> → correcteur pêche en triangle inversé (peau claire) ou orange (peau mate), puis anti-cernes teinte + 0,5 vs FDT.<br><strong>Rougeurs ailes du nez</strong> → correcteur vert ponctuel avant FDT.<br><strong>Soirée</strong> → smoky bronze/cuivré (sublime yeux verts/marrons + sous-ton chaud), spray fixateur.</p>"
)}`,
        },
      ],
    },

    // ═══════════════════ MODULE 3 – JOUR 3 (teint) ═══════════════════
    {
      title: "Module 3 – Fond de teint, contouring et strobing",
      description: "Techniques d'application du teint parfait et sculpting du visage par contraste ombre/lumière (Jour 3).",
      sections: [
        {
          title: "3.1 – Choisir et appliquer le fond de teint",
          content: `${photo(IMG.fondTeint, "Application du fond de teint au pinceau")}
<p><strong>Choix de la teinte</strong> : tester 3 teintes sur la <strong>mâchoire</strong> (jamais sur le poignet), à la lumière du jour. La teinte qui disparaît = la bonne. En cas de doute, choisir la teinte la plus proche de la couleur du cou (pour l'harmonie).</p>
<p><strong>Choix de la texture</strong> selon l'occasion :</p>
<ul>
<li><strong>Fluide / liquide</strong> : jour, naturel, peaux sèches à normales.</li>
<li><strong>Poudre</strong> : peaux grasses, retouches rapides, tenue légère.</li>
<li><strong>Crème compacte</strong> : couvrance haute, mariage, shooting, peaux à imperfections.</li>
<li><strong>Airless / bâton</strong> : maquillage express, retouches en cours de journée.</li>
<li><strong>Airbrush</strong> : shooting HD, mariage grand format, tenue 10-12 h.</li>
</ul>
<p><strong>3 techniques d'application</strong> :</p>
<ol>
<li><strong>Pinceau langue-de-chat / kabuki</strong> : dépôts en croix sur le visage puis étirement vers l'extérieur, mouvements circulaires légers. Résultat couvrant.</li>
<li><strong>Éponge humide (beauty blender)</strong> : tamponnage vertical (jamais frotter), résultat second peau lumineux.</li>
<li><strong>Doigts (chaleur de la main)</strong> : peaux sèches, texture crème, fini glowy naturel.</li>
</ol>
<p><strong>Ordre d'application</strong> : centre du visage → extérieur → cou/décolleté (unification indispensable).</p>`,
        },
        {
          title: "3.2 – Technique du contouring",
          content: `${photo(IMG.contouring, "Sculpting du visage par contouring")}
<p>Le <strong>contouring</strong> sculpte le visage en créant des zones d'ombre là où la lumière ne tombe pas naturellement. Utiliser un produit <strong>1 à 2 tons plus foncé que la peau</strong>, sous-ton froid gris-marron (JAMAIS orangé, qui simulerait un bronzage sale).</p>
<p><strong>4 zones stratégiques du contouring</strong> :</p>
<ul>
<li><strong>Creux des joues (cheek hollow)</strong> : sous la pommette, du haut de l'oreille vers le coin de la bouche (arrêter au-dessus du coin des lèvres). Aspire les joues.</li>
<li><strong>Tempes</strong> : arc de cercle du haut de l'oreille vers la ligne du sourcil. Rétrécit un front large.</li>
<li><strong>Mâchoire</strong> : sous l'os mandibulaire, du menton à l'oreille. Structure la ligne de la mâchoire, gomme un double menton.</li>
<li><strong>Arêtes du nez</strong> : deux traits parallèles de chaque côté de l'arête. Affine le nez.</li>
</ul>
<p><strong>Estompage impératif</strong> au pinceau contouring propre ou à l'éponge : ne laisser aucun trait visible. Sens du bas vers le haut pour un lifting optique.</p>`,
        },
        {
          title: "3.3 – Technique du strobing",
          content: `<p>Le <strong>strobing</strong> (highlighter) capture la lumière sur les zones naturellement en relief. C'est l'inverse du contouring : produit <strong>plus clair que la peau</strong>, à sous-ton doré (peaux chaudes), rosé (peaux froides) ou champagne (universel).</p>
<p><strong>Textures</strong> :</p>
<ul>
<li><strong>Poudre pressée</strong> : pinceau éventail, résultat lumineux discret (jour).</li>
<li><strong>Crème / stick</strong> : doigt ou éponge, résultat glowy intense (soirée).</li>
<li><strong>Liquide</strong> : mélangé au FDT pour un teint globalement lumineux ou en touches ciblées.</li>
</ul>
<p><strong>6 zones de highlight (règle des « 6 points de lumière »)</strong> :</p>
<ol>
<li><strong>Arcade sourcilière haute</strong> (sous le sourcil, os frontal) — ouvre le regard.</li>
<li><strong>Coin interne de l'œil</strong> — agrandit l'œil et le rend éveillé.</li>
<li><strong>Pommettes hautes</strong> (au-dessus du blush) — sublime le relief.</li>
<li><strong>Arête du nez</strong> (fine ligne centrale) — affine le nez.</li>
<li><strong>Arc de Cupidon</strong> (au-dessus de la lèvre supérieure) — repulpe la bouche.</li>
<li><strong>Menton</strong> (point central) — structure et allonge.</li>
</ol>
<p><strong>Piège fréquent</strong> : trop de highlighter = effet gras/luisant. Doser à la loupe, toujours estomper.</p>
${exo(
  "Contouring + strobing",
  "Cliente à visage rond, peau claire sous-ton froid, demande un rendu sculpté pour un anniversaire. Décrivez précisément votre plan d'attaque contouring + strobing.",
  "<p><strong>Contouring</strong> (poudre gris-marron froid, 2 tons plus foncés) :<br>• Creux des joues (cheek hollow) marqué et allongé vers la bouche → aspire visuellement les joues.<br>• Tempes en arc → rétrécit la largeur du front.<br>• Arêtes du nez fines → affine.<br>• Mâchoire légère → structure sans durcir.<br>Estompage éponge humide, sens du bas vers le haut.<br><br><strong>Strobing</strong> (poudre champagne à reflets rosés pour sous-ton froid) :<br>• Pommettes hautes (juste au-dessus du blush) → volume vertical.<br>• Arête du nez, ligne fine centrale → allonge le visage.<br>• Arcade sourcilière + coin interne œil → ouvre le regard.<br>• Arc de Cupidon → repulpe la bouche.<br><br><strong>Blush</strong> rose froid en diagonal (bas de pommette vers la tempe) pour renforcer la verticalité. <strong>Résultat</strong> : visage optiquement allongé, pommettes saillantes, éclat concentré sur les points hauts.</p>"
)}`,
        },
      ],
    },

    // ═══════════════════ MODULE 4 – JOUR 4 (sourcils/yeux/bouche) ═══════════════════
    {
      title: "Module 4 – Sourcils, yeux et bouche",
      description: "Structure du sourcil (3 points d'or), techniques de maquillage des yeux et forme de bouche (Jour 4).",
      sections: [
        {
          title: "4.1 – Structure du sourcil : les 3 points d'or",
          content: `${photo(IMG.sourcils, "Structuration du sourcil au pinceau biseauté")}
<p>Un sourcil parfaitement structuré <strong>redessine tout le regard</strong>. Trois points de référence anatomiques :</p>
<ol>
<li><strong>Point A (départ)</strong> : verticale passant par l'aile du nez → début du sourcil.</li>
<li><strong>Point B (sommet de l'arche)</strong> : diagonale du coin externe de l'aile du nez passant par le milieu de la pupille (regard droit devant) → point le plus haut du sourcil.</li>
<li><strong>Point C (fin)</strong> : diagonale de l'aile du nez au coin externe de l'œil → fin du sourcil.</li>
</ol>
<p><strong>Règle d'harmonie</strong> : la fin du sourcil (C) doit être à la même hauteur que le début (A). Éviter les fins qui descendent (visage triste).</p>
<p><strong>Techniques de remplissage</strong> :</p>
<ul>
<li><strong>Crayon</strong> : petits traits en forme de poils (jamais un trait continu). Pour peaux normales/sèches.</li>
<li><strong>Poudre</strong> : au pinceau biseauté, effet naturel dégradé. Peaux grasses.</li>
<li><strong>Pommade / gel</strong> : longue tenue, résultat structuré. Mariage, shooting.</li>
<li><strong>Feutre microblading</strong> : simule le poil-à-poil ultra-réaliste.</li>
</ul>
<p><strong>Finition</strong> : gel transparent ou teinté pour fixer et discipliner les poils vers le haut (effet « brushed brows »).</p>`,
        },
        {
          title: "4.2 – Maquillage des yeux (5 techniques essentielles)",
          content: `${photo(IMG.yeux, "Maquillage smoky des yeux")}
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#fce7f3"><th>Technique</th><th>Description</th><th>Occasion</th></tr>
<tr><td><strong>Nude / naturel</strong></td><td>Teintes beige, taupe, brun clair — dégradé du plus clair (paupière mobile) au plus foncé (creux)</td><td>Jour, bureau, quotidien</td></tr>
<tr><td><strong>Smoky eye</strong></td><td>Dégradé fumé noir/gris/marron/bronze — estompé sans démarcation</td><td>Soirée, sortie</td></tr>
<tr><td><strong>Cut-crease</strong></td><td>Ligne nette dans le creux paupière — teinte claire dessous, foncée au-dessus</td><td>Événement, shooting, effet œil de biche</td></tr>
<tr><td><strong>Halo eye</strong></td><td>Foncé aux coins interne et externe + éclat lumineux au centre paupière mobile</td><td>Soirée glam, mise en valeur pupille</td></tr>
<tr><td><strong>Winged liner (eye-liner)</strong></td><td>Trait fin ras des cils + « aile » externe étirée</td><td>Rétro, chic, universel</td></tr>
</table>
<p><strong>Adaptation à la forme de l'œil</strong> :</p>
<ul>
<li><strong>Yeux ronds</strong> → étirer vers l'extérieur (winged liner, smoky externe).</li>
<li><strong>Yeux en amande</strong> → tout convient.</li>
<li><strong>Yeux tombants</strong> → concentrer le foncé sur le tiers externe, éviter le foncé sous l'œil qui alourdit.</li>
<li><strong>Yeux rapprochés</strong> → éclaircir le coin interne (highlight), foncer le coin externe.</li>
<li><strong>Yeux écartés</strong> → foncer le coin interne, effet œil de biche.</li>
<li><strong>Paupière tombante</strong> → cut-crease légèrement au-dessus du pli naturel.</li>
</ul>
<p><strong>Cils</strong> : recourbe-cils AVANT le mascara, mascara en zig-zag (cache la racine), 2 couches. Faux-cils : bande complète pour l'effet dramatique, cils individuels pour un renfort discret naturel.</p>`,
        },
        {
          title: "4.3 – Forme et contour de la bouche",
          content: `${photo(IMG.bouche, "Application du rouge à lèvres au pinceau")}
<p><strong>Protocole professionnel</strong> :</p>
<ol>
<li><strong>Exfoliation</strong> : gommage lèvres doux (sucre + huile) puis baume hydratant. Attendre 5 min.</li>
<li><strong>Correction / neutralisation</strong> : anti-cernes ou FDT sur les lèvres → efface la pigmentation naturelle et fait ressortir la vraie couleur du rouge.</li>
<li><strong>Crayon contour</strong> : au ton proche du rouge, épouse le contour naturel (redessine légèrement pour repulper ou affiner).</li>
<li><strong>Rouge à lèvres au pinceau</strong> : application précise, remplit le contour vers l'intérieur.</li>
<li><strong>Retouche</strong> : coton-tige pour nettoyer les débordements.</li>
<li><strong>Fixation</strong> : mouchoir + poudre translucide + 2e couche pour un mat longue tenue.</li>
</ol>
<p><strong>Techniques de forme</strong> :</p>
<ul>
<li><strong>Ombre lip</strong> : dégradé du foncé (contour) au clair (centre) — effet repulpant sublime.</li>
<li><strong>Overline discret</strong> : redessiner 1 mm au-dessus du contour naturel pour repulper — jamais grossièrement (effet duck lips).</li>
<li><strong>Underline</strong> : à l'inverse, tracer 1 mm à l'intérieur pour affiner une bouche jugée trop pleine.</li>
<li><strong>Highlight arc de Cupidon</strong> : petit point lumineux au sommet — donne du volume à la lèvre supérieure.</li>
</ul>
<p><strong>Choix de couleur</strong> : selon le sous-ton (cf. Module 2), la couleur des yeux (contraste ou harmonie) et l'occasion. <strong>Règle esthétique</strong> : quand les yeux sont chargés, la bouche est nue (et inversement).</p>
${exo(
  "Look complet cohérent",
  "Cliente : sourcils fournis mais anarchiques, yeux en amande verts, bouche fine, sous-ton froid, veut un look mariage nude & lumineux. Détaillez sourcils, yeux, bouche.",
  "<p><strong>Sourcils</strong> : brossage vers le haut, remplissage à la poudre biseautée teinte brun froid (poil-à-poil), fixation au gel transparent. Structurer sans surcharger (elle a déjà de la matière). Points A-B-C respectés, arche naturelle légèrement rehaussée pour ouvrir le regard.<br><br><strong>Yeux</strong> : base paupière, dégradé nude — beige rosé sur la paupière mobile, taupe froid dans le creux, brun froid au coin externe (halo). Coin interne + arcade highlighter champagne rosé. Recourbe-cils + mascara noir 2 couches, cils individuels au coin externe. Sublime les yeux verts par contraste complémentaire subtil (taupe = complément atténué du vert).<br><br><strong>Bouche</strong> : gommage + baume, correcteur pour neutraliser, crayon nude rosé légèrement <strong>overlined</strong> (1 mm, très discret) pour repulper la bouche fine. Rouge à lèvres nude rosé satiné (pas mat pour la lumière du mariage). Highlight arc de Cupidon. Résultat : bouche visiblement plus pulpeuse mais naturelle, en harmonie avec le regard doux.</p>"
)}`,
        },
      ],
    },

    // ═══════════════════ MODULE 5 – PINCEAUX & PRODUITS ═══════════════════
    {
      title: "Module 5 – Référentiel pinceaux et produits",
      description: "Kit professionnel : pinceaux essentiels par usage, familles de produits, décryptage INCI.",
      sections: [
        {
          title: "5.1 – Les 12 pinceaux indispensables du kit pro",
          content: `${photo(IMG.pinceaux, "Kit professionnel de pinceaux à maquillage")}
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#fce7f3"><th>Pinceau</th><th>Forme / poil</th><th>Usage principal</th></tr>
<tr><td><strong>Kabuki</strong></td><td>Court, dense, arrondi (synthétique)</td><td>Fond de teint poudre, poudre libre, blush</td></tr>
<tr><td><strong>Langue-de-chat</strong></td><td>Plat, biseauté (synthétique)</td><td>Fond de teint fluide, correcteur ponctuel</td></tr>
<tr><td><strong>Éponge beauty blender</strong></td><td>Ovale, humide</td><td>FDT tamponné, anti-cernes, second peau</td></tr>
<tr><td><strong>Pinceau anti-cernes</strong></td><td>Petit, plat (synthétique)</td><td>Correcteur, anti-cernes précis</td></tr>
<tr><td><strong>Pinceau poudre</strong></td><td>Grand, moelleux (naturel)</td><td>Poudre libre voile, retouches</td></tr>
<tr><td><strong>Pinceau contouring</strong></td><td>Angulé, dense (naturel)</td><td>Contouring joues, mâchoire</td></tr>
<tr><td><strong>Pinceau blush</strong></td><td>Rond, moelleux (naturel)</td><td>Blush poudre en dépôt et estompage</td></tr>
<tr><td><strong>Pinceau highlighter éventail</strong></td><td>Éventail plat (naturel ou synthétique)</td><td>Strobing sur pommettes, arête nez</td></tr>
<tr><td><strong>Pinceau fards mobile</strong></td><td>Plat, dense (naturel)</td><td>Dépôt de fard sur paupière mobile</td></tr>
<tr><td><strong>Pinceau estompeur</strong></td><td>Bombé, souple (naturel)</td><td>Estompage creux paupière, dégradé smoky</td></tr>
<tr><td><strong>Pinceau eye-liner biseauté</strong></td><td>Fin, angulé (synthétique)</td><td>Eye-liner gel, sourcils</td></tr>
<tr><td><strong>Pinceau lèvres</strong></td><td>Petit, plat, précis (synthétique)</td><td>Rouge à lèvres au pinceau</td></tr>
</table>
<p><strong>Entretien</strong> : spray désinfectant alcool 70° entre chaque cliente. Lavage complet hebdomadaire (savon Marseille + huile végétale + eau tiède, séchage à plat).</p>`,
        },
        {
          title: "5.2 – Décryptage INCI et allergènes",
          content: `${photo(IMG.produits, "Étiquetage INCI d'un produit cosmétique")}
<p>La <strong>liste INCI</strong> (International Nomenclature of Cosmetic Ingredients) est obligatoire sur tout cosmétique vendu en UE (Règlement CE n°1223/2009) :</p>
<ul>
<li>Ingrédients listés par <strong>ordre décroissant de concentration</strong> (les 5 premiers = 80 % du produit).</li>
<li>Sous 1 %, ordre libre.</li>
<li>Colorants sous forme « <strong>CI 12345</strong> » (ex. CI 15850 = rouge carminé).</li>
<li><strong>26 allergènes obligatoires</strong> à signaler : linalool, limonene, citronellol, geraniol, coumarine, eugenol, cinnamal…</li>
</ul>
<p><strong>Ingrédients à connaître (surveiller pour clientes sensibles)</strong> :</p>
<ul>
<li><strong>Parabens</strong> (methylparaben, butylparaben) : conservateurs suspectés perturbateurs endocriniens.</li>
<li><strong>Silicones</strong> (Dimethicone, Cyclopentasiloxane) : effet lissant occlusif, à éviter sur peau acnéique.</li>
<li><strong>Parfums (Parfum / Fragrance)</strong> : première cause d'allergie cosmétique.</li>
<li><strong>Alcool dénaturé (Alcohol denat.)</strong> : desséchant, à éviter sur peaux sèches.</li>
<li><strong>Talc</strong> : dans certaines poudres, préférer les alternatives amidon de riz / silice.</li>
<li><strong>Nano-particules (nano)</strong> : à signaler obligatoirement, débat sanitaire ouvert.</li>
</ul>
<p><strong>Certifications à connaître</strong> : Ecocert, Cosmos Organic, Nature & Progrès, Cruelty Free (Leaping Bunny), Vegan Society.</p>`,
        },
      ],
    },

    // ═══════════════════ MODULE 6 – SATISFACTION & MISE EN SITUATION ═══════════════════
    {
      title: "Module 6 – Mise en situation professionnelle complète",
      description: "Trame de la prestation 1h30 : accueil, réalisation, ajustements et satisfaction client.",
      sections: [
        {
          title: "6.1 – Trame chronométrée d'une prestation maquillage complet (1h30)",
          content: `${photo(IMG.mariee, "Prestation maquillage mariée complète")}
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#fce7f3"><th>Étape</th><th>Durée</th><th>Points de vigilance</th></tr>
<tr><td>1. Accueil, boisson, installation</td><td>5 min</td><td>Sourire, prénom, confort</td></tr>
<tr><td>2. Recueil des besoins + validation inspiration</td><td>10 min</td><td>Questions ouvertes, photos avant, contre-indications</td></tr>
<tr><td>3. Préparation peau (démaquillage → primer)</td><td>10 min</td><td>Respect du temps d'absorption (2 min crème)</td></tr>
<tr><td>4. Sourcils</td><td>10 min</td><td>Points A-B-C, poil-à-poil, gel fixateur</td></tr>
<tr><td>5. Correction + fond de teint + poudre</td><td>15 min</td><td>Unification cou/décolleté indispensable</td></tr>
<tr><td>6. Contouring + blush + strobing</td><td>10 min</td><td>Estompage impératif, aucune démarcation</td></tr>
<tr><td>7. Yeux (base, fards, eye-liner, cils)</td><td>20 min</td><td>Coton sous l'œil pour poudres volantes</td></tr>
<tr><td>8. Bouche (contour, RàL, fixation)</td><td>7 min</td><td>Pinceau lèvres, retouche coton-tige</td></tr>
<tr><td>9. Spray fixateur + retouches finales</td><td>3 min</td><td>Photo miroir cliente, ajustements</td></tr>
</table>
<p><strong>Total : 90 min</strong>. Une bonne maquilleuse maîtrise ce timing pour ne jamais faire attendre une mariée un jour J.</p>`,
        },
        {
          title: "6.2 – Recueil de la satisfaction et ajustements",
          content: `<p>La satisfaction cliente ne s'improvise pas — elle se <strong>vérifie activement</strong> :</p>
<ol>
<li><strong>Miroir main + miroir mural</strong> : la cliente voit le résultat sous 3 angles.</li>
<li><strong>Question ouverte</strong> : « Qu'est-ce qui vous plaît le plus ? Est-ce qu'il y a un détail que vous souhaiteriez ajuster ? » (jamais « ça va ? » qui appelle un oui poli).</li>
<li><strong>Écoute active</strong> : reformuler la demande (« Vous trouvez le smoky un peu trop intense, on adoucit le coin externe ? »).</li>
<li><strong>Ajustements immédiats</strong> : intensifier / adoucir, changer une teinte de rouge à lèvres, ajouter un liner…</li>
<li><strong>Photo finale</strong> avant sortie + accord d'utilisation portfolio.</li>
<li><strong>Conseil produit</strong> : recommander les produits utilisés adaptés à la cliente (vente conseil douce, méthode CAB).</li>
<li><strong>Fiche satisfaction</strong> : note /10 + commentaire libre + prise du prochain RDV.</li>
</ol>
<p><strong>Gestion d'une insatisfaction</strong> : ne jamais se justifier, remercier du retour, proposer un ajustement immédiat gratuit. En cas d'échec, offrir un forfait retouche gratuit + document dans fiche cliente (traçabilité qualité).</p>`,
        },
      ],
    },

    // ═══════════════════ MODULE 7 – EXAMEN ═══════════════════
    {
      title: "Module 7 – Préparation à l'examen (Jour 5)",
      description: "Modalités d'évaluation, QCM 20 questions, mise en situation 1h30 avec tirage au sort du look.",
      sections: [
        {
          title: "7.1 – Structure de l'examen",
          content: `${photo(IMG.examen, "Passage d'examen maquillage professionnel")}
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#fce7f3"><th>Épreuve</th><th>Durée</th><th>Modalités</th></tr>
<tr><td><strong>Partie théorique — QCM</strong></td><td>20 min</td><td>20 questions à choix multiples : vocabulaire, fonctionnalité des produits (pinceaux contouring/strobing/teint/lèvres), colorimétrie, carnation</td></tr>
<tr><td><strong>Partie pratique — Mise en situation</strong></td><td>1h30</td><td>Prestation complète sur modèle vivant : accueil, hygiène, choix produits, teint + yeux + sourcils + lèvres, satisfaction client. <strong>Look tiré au sort sur 3</strong> (jour naturel, soirée glam, mariée).</td></tr>
</table>
<p><strong>Critères d'évaluation pratique</strong> :</p>
<ul>
<li>Respect du protocole d'accueil et d'hygiène (10 pts).</li>
<li>Diagnostic peau et choix des produits adaptés (10 pts).</li>
<li>Technique du teint (fond de teint, correcteur, contouring, strobing) (25 pts).</li>
<li>Sourcils, yeux, bouche : maîtrise technique et cohérence (30 pts).</li>
<li>Gestion du temps (10 pts).</li>
<li>Satisfaction client et ajustements (15 pts).</li>
</ul>
<p><strong>Admission</strong> : moyenne ≥ 60/100 sur les deux épreuves.</p>`,
        },
        {
          title: "7.2 – Exemples de questions QCM",
          content: `<p><strong>Q1</strong> — Quel pinceau utiliser pour le contouring des joues ?<br>
a) Pinceau kabuki ○ &nbsp; b) Pinceau angulé dense ● &nbsp; c) Pinceau éventail ○ &nbsp; d) Pinceau langue-de-chat ○</p>
<p><strong>Q2</strong> — Un correcteur vert corrige :<br>
a) Les cernes bleutés ○ &nbsp; b) Les rougeurs et boutons ● &nbsp; c) Le teint terne ○ &nbsp; d) L'hyperpigmentation ○</p>
<p><strong>Q3</strong> — Une cliente aux veines vertes visibles au poignet a un sous-ton :<br>
a) Froid ○ &nbsp; b) Neutre ○ &nbsp; c) Chaud ● &nbsp; d) Impossible à déterminer ○</p>
<p><strong>Q4</strong> — Le highlighter s'applique en priorité sur :<br>
a) Le creux des joues ○ &nbsp; b) Les tempes ○ &nbsp; c) Les pommettes hautes et l'arête du nez ● &nbsp; d) La mâchoire ○</p>
<p><strong>Q5</strong> — Le point B (sommet de l'arche du sourcil) se situe :<br>
a) Au coin interne de l'œil ○ &nbsp; b) Sur la diagonale aile du nez → milieu de la pupille ● &nbsp; c) Au coin externe de l'œil ○ &nbsp; d) Au centre de l'arcade ○</p>
<p><strong>Q6</strong> — Le sens du contouring des joues est :<br>
a) De la bouche vers l'oreille ○ &nbsp; b) De l'oreille vers le coin de la bouche, en s'arrêtant au-dessus ● &nbsp; c) Vertical ○ &nbsp; d) En cercle ○</p>
<p><em>… QCM complet de 20 questions généré par l'IA lors de la génération du pack d'évaluation.</em></p>`,
        },
        {
          title: "7.3 – Méthodologie et gestion du stress",
          content: `<ul>
<li><strong>La veille</strong> : préparer et désinfecter tout le kit (pinceaux propres, produits vérifiés, éponges neuves), tester le maquillage sur soi ou un proche.</li>
<li><strong>Jour J</strong> : arriver 30 min en avance, tenue professionnelle noire (met en valeur le travail), cheveux attachés, ongles courts propres.</li>
<li><strong>Tirage au sort</strong> : quel que soit le look tiré (jour / soirée / mariée), rester dans le timing 1h30 et suivre la trame chronométrée du Module 6.</li>
<li><strong>Communication avec le modèle</strong> : verbaliser chaque étape (« Je vais appliquer un correcteur vert sur cette rougeur »), rassurer, écouter.</li>
<li><strong>Erreurs de parcours</strong> : ne jamais paniquer, corriger avec un coton-tige + démaquillant, expliquer la correction au jury (démontre la maîtrise).</li>
<li><strong>Respiration 4-7-8</strong> avant l'épreuve : inspirer 4 s, retenir 7 s, expirer 8 s, 3 cycles → chute du rythme cardiaque.</li>
<li><strong>Sommeil</strong> : 7-8 h la nuit précédente, dernière révision QCM courte (30 min max).</li>
</ul>
${exo(
  "Simulation examen",
  "Vous tirez au sort le look 'Mariée'. Le modèle a la peau mixte à tendance grasse, sous-ton froid, yeux marrons, sourcils fournis, bouche moyenne. Décrivez votre plan chronométré des 90 minutes.",
  "<p><strong>0-5 min Accueil</strong> : sourire, prénom, boisson, installation, confort.<br><strong>5-15 min Recueil</strong> : occasion (mariage), inspiration nude & lumineux, contre-indications, photo avant.<br><strong>15-25 min Préparation peau</strong> : démaquillage → tonique → sérum acide hyaluronique → crème adaptée mixte-grasse → primer matifiant zone T + lissant sur joues. Absorption 2 min.<br><strong>25-35 min Sourcils</strong> : brossage haut, remplissage poudre biseauté brun froid poil-à-poil, gel fixateur.<br><strong>35-50 min Teint</strong> : correcteur vert ponctuel rougeurs, correcteur pêche cernes, FDT crème compacte couvrance haute (mariage) sous-ton rosé, poudre matifiante ponctuelle zone T, unification cou.<br><strong>50-60 min Sculpting</strong> : contouring gris-froid creux joues + mâchoire + arêtes nez, blush rose froid diagonal, strobing champagne rosé pommettes + arête + coin interne + arc Cupidon + menton.<br><strong>60-80 min Yeux</strong> : base, dégradé nude (beige rosé mobile, taupe froid creux, brun froid coin externe halo), highlight coin interne + arcade, recourbe-cils, mascara 2 couches, cils individuels coin externe.<br><strong>80-87 min Bouche</strong> : gommage + baume, correcteur neutralisant, crayon nude rosé (overline 1 mm discret), rouge nude rosé satiné pinceau, highlight arc Cupidon.<br><strong>87-90 min Finition</strong> : spray fixateur, miroir 3 angles, question ouverte satisfaction, ajustements immédiats, photo après.</p>"
)}`,
        },
      ],
    },
  ];
}
