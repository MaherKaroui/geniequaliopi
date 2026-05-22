/**
 * Contenu pédagogique – CAP Esthétique Cosmétique Parfumerie (RNCP39030).
 * Inclut chapitres détaillés, photos illustratives (Unsplash), exercices et corrigés.
 * Utilisé pour le Support de cours (CT4 – IND 18/19) en Action de Formation Qualiopi.
 */
import { CourseChapter } from "./courseContent";

const IMG = {
  visage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80",
  produits: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=900&q=80",
  manucure: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&q=80",
  maquillage: "https://images.unsplash.com/photo-1522335789203-aaaa66c1a09b?w=900&q=80",
  epilation: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80",
  institut: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=900&q=80",
  hygiene: "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=900&q=80",
  peau: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80",
};

const photo = (src: string, alt: string) =>
  `<figure style="margin:12px 0;text-align:center"><img src="${src}" alt="${alt}" style="max-width:100%;height:auto;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1)" /><figcaption style="font-size:12px;color:#666;margin-top:6px;font-style:italic">${alt}</figcaption></figure>`;

const exo = (titre: string, enonce: string, corrige: string) =>
  `<div style="background:#fef6e4;border-left:4px solid #f59e0b;padding:14px;border-radius:6px;margin:14px 0"><p style="margin:0 0 6px 0;font-weight:bold;color:#92400e">📝 Exercice – ${titre}</p><p style="margin:0 0 10px 0">${enonce}</p><details style="margin-top:8px"><summary style="cursor:pointer;font-weight:bold;color:#16a34a">✅ Voir le corrigé</summary><div style="background:#f0fdf4;padding:10px;border-radius:4px;margin-top:6px">${corrige}</div></details></div>`;

export function getEsthetiqueChapters(): CourseChapter[] {
  return [
    {
      title: "Module 1 – Connaissance de la peau et hygiène professionnelle",
      description: "Bases anatomiques de la peau, types cutanés et règles d'hygiène en institut (Bloc 1 – CAP Esthétique RNCP39030).",
      sections: [
        {
          title: "1.1 – Anatomie et physiologie de la peau",
          content: `${photo(IMG.peau, "Coupe anatomique de la peau")}
<p>La peau est le plus grand organe du corps humain (≈ 2 m² chez l'adulte). Elle est constituée de <strong>trois couches</strong> :</p>
<ul>
<li><strong>Épiderme</strong> (couche superficielle) : kératinocytes, mélanocytes (pigmentation), cellules de Langerhans (immunité). Renouvellement tous les 28 jours.</li>
<li><strong>Derme</strong> (couche moyenne) : fibres de collagène et d'élastine, vaisseaux sanguins, glandes sébacées et sudoripares, follicules pileux.</li>
<li><strong>Hypoderme</strong> (couche profonde) : tissu adipeux, rôle d'isolant thermique et de réserve énergétique.</li>
</ul>
<p><strong>Fonctions de la peau :</strong> protection (barrière), thermorégulation, sensorielle, synthèse de vitamine D, excrétion (sueur, sébum).</p>`,
        },
        {
          title: "1.2 – Les types et états de peau",
          content: `<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#fce7f3"><th>Type de peau</th><th>Caractéristiques</th><th>Soins adaptés</th></tr>
<tr><td><strong>Normale</strong></td><td>Souple, lisse, grain fin, peu de pores visibles</td><td>Hydratation douce, protection</td></tr>
<tr><td><strong>Sèche</strong></td><td>Tiraille, fine, peu de sébum, sensible</td><td>Crèmes nourrissantes, huiles végétales</td></tr>
<tr><td><strong>Grasse</strong></td><td>Brillance, pores dilatés, imperfections</td><td>Nettoyage doux, soins matifiants, acide salicylique</td></tr>
<tr><td><strong>Mixte</strong></td><td>Zone T grasse, joues normales/sèches</td><td>Soins équilibrants, multi-textures</td></tr>
<tr><td><strong>Sensible</strong></td><td>Rougeurs, picotements, réactivité</td><td>Produits hypoallergéniques, apaisants</td></tr>
</table>
<p><strong>États temporaires :</strong> déshydratée (manque d'eau), couperose (microcirculation), acnéique, mature.</p>`,
        },
        {
          title: "1.3 – Hygiène et sécurité en institut",
          content: `${photo(IMG.hygiene, "Désinfection du matériel d'esthétique")}
<p><strong>Règles d'or :</strong></p>
<ul>
<li>Lavage des mains avant et après chaque cliente (savon + solution hydro-alcoolique).</li>
<li>Désinfection systématique du matériel (alcool 70°, autoclave pour le métal).</li>
<li>Linge propre à chaque cliente (serviettes, draps, bandeaux).</li>
<li>Port de gants pour les soins à risque (épilation, soins du visage avec extractions).</li>
<li>Élimination des déchets piquants/coupants dans un container DASRI.</li>
<li>Respect du décret n°2008-87 sur l'hygiène en institut de beauté.</li>
</ul>`,
        },
        {
          title: "1.4 – Exercices d'application",
          content: `${exo(
            "Identification de type de peau",
            "Une cliente de 28 ans présente une zone T (front, nez, menton) brillante avec pores dilatés, et des joues qui tiraillent après nettoyage. De quel type de peau s'agit-il et quels soins lui conseilleriez-vous ?",
            "<p><strong>Type de peau :</strong> peau mixte. <strong>Soins conseillés :</strong> nettoyant doux pH 5,5, soin équilibrant (zone T matifiante, joues hydratantes), hydratation quotidienne légère, masque purifiant 1×/semaine sur la zone T uniquement, masque hydratant sur les joues. Protection solaire indispensable.</p>"
          )}
${exo(
  "Protocole d'hygiène",
  "Listez les 5 étapes obligatoires de désinfection du poste de travail entre deux clientes pour un soin du visage.",
  "<ol><li>Évacuer le linge usagé dans un bac fermé.</li><li>Désinfecter la table de soin avec un spray virucide/bactéricide.</li><li>Nettoyer et désinfecter le matériel réutilisable (spatules, pinces) à l'alcool 70°.</li><li>Remplacer le linge propre (drap, serviette, bandeau).</li><li>Se laver et désinfecter les mains avant l'arrivée de la cliente suivante.</li></ol>"
)}`,
        },
      ],
    },
    {
      title: "Module 2 – Soins esthétiques du visage",
      description: "Protocole complet de soin du visage : démaquillage, gommage, modelage, masque, hydratation (Bloc 1).",
      sections: [
        {
          title: "2.1 – Le protocole de soin du visage en 7 étapes",
          content: `${photo(IMG.visage, "Soin du visage en cabine d'esthétique")}
<ol>
<li><strong>Démaquillage</strong> (5 min) : lait démaquillant + lotion tonique, mouvements doux du bas vers le haut.</li>
<li><strong>Diagnostic de peau</strong> (3 min) : observation à la loupe lumineuse, palpation, questions.</li>
<li><strong>Gommage</strong> (5 min) : exfoliant adapté (grains, enzymes, acides), éviter le contour des yeux.</li>
<li><strong>Vapozone / serviette chaude</strong> (5 min) : ouvre les pores, prépare aux extractions.</li>
<li><strong>Modelage du visage</strong> (15 min) : effleurages, lissages, pressions glissées – favorise la circulation.</li>
<li><strong>Masque</strong> (10-15 min) : adapté au type de peau (hydratant, purifiant, apaisant).</li>
<li><strong>Soin final</strong> (5 min) : sérum + crème de jour + contour des yeux + SPF.</li>
</ol>
<p><strong>Durée totale :</strong> 60 minutes (soin complet) ou 45 minutes (express).</p>`,
        },
        {
          title: "2.2 – Techniques de modelage facial",
          content: `<p>Le <strong>modelage esthétique</strong> n'a pas de visée médicale ; il favorise la détente musculaire et la microcirculation :</p>
<ul>
<li><strong>Effleurage</strong> : glissement doux de la paume, en remontant toujours.</li>
<li><strong>Pétrissage doux</strong> : entre pouce et index, sur les joues et la mâchoire.</li>
<li><strong>Pressions glissées</strong> : le long des lignes lymphatiques (du centre vers les oreilles).</li>
<li><strong>Tapotements</strong> : du bout des doigts, sur le contour des yeux (très léger).</li>
<li><strong>Lissages</strong> : du décolleté vers le menton, drainant.</li>
</ul>
<p><strong>Sens :</strong> toujours du bas vers le haut et du centre vers l'extérieur, pour suivre les lignes de tension naturelles.</p>`,
        },
        {
          title: "2.3 – Exercices pratiques",
          content: `${exo(
            "Ordre du protocole",
            "Remettez dans l'ordre les étapes suivantes : Masque – Démaquillage – Modelage – Diagnostic – Crème finale – Gommage – Vapozone.",
            "<ol><li>Démaquillage</li><li>Diagnostic</li><li>Gommage</li><li>Vapozone</li><li>Modelage</li><li>Masque</li><li>Crème finale</li></ol>"
          )}
${exo(
  "Cas client",
  "Madame L., 45 ans, peau mature et déshydratée, demande un soin éclat avant un mariage. Quel protocole proposez-vous ?",
  "<p>Protocole 75 min : démaquillage doux + lotion sans alcool ; gommage enzymatique (non agressif) ; vapozone 5 min ; modelage repulpant (effleurages remontants + pressions glissées) ; masque hydratant à l'acide hyaluronique (15 min) ; sérum vitamine C + crème nourrissante + SPF 30. Conseil : boire 1,5 L d'eau/jour les jours précédents.</p>"
)}`,
        },
      ],
    },
    {
      title: "Module 3 – Épilation",
      description: "Techniques d'épilation à la cire (chaude, tiède, jetable) sur visage et corps en toute sécurité (Bloc 1 & 2).",
      sections: [
        {
          title: "3.1 – Les différents types de cire",
          content: `${photo(IMG.epilation, "Épilation à la cire en institut")}
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#fce7f3"><th>Type de cire</th><th>Utilisation</th><th>Avantages / inconvénients</th></tr>
<tr><td>Cire tiède (sucre, miel)</td><td>Jambes, bras, dos – grandes surfaces</td><td>+ Économique, rapide / – Moins efficace sur poils courts</td></tr>
<tr><td>Cire chaude (pelable)</td><td>Maillot, aisselles, visage</td><td>+ Précise, douce / – Risque de brûlure si mal chauffée</td></tr>
<tr><td>Cire jetable (roll-on)</td><td>Petites zones, gestes rapides</td><td>+ Hygiénique (usage unique) / – Coût plus élevé</td></tr>
</table>`,
        },
        {
          title: "3.2 – Règles de sécurité",
          content: `<ul>
<li><strong>Tester la température</strong> sur le poignet avant application (37–40 °C max).</li>
<li><strong>Sens de pose :</strong> dans le sens du poil ; <strong>sens d'arrachage :</strong> à contre-sens, en tendant la peau.</li>
<li><strong>Contre-indications :</strong> peau lésée, coup de soleil, herpès, varices saillantes, diabète non équilibré, traitement Roaccutane.</li>
<li>Toujours appliquer un <strong>soin post-épilation apaisant</strong> (huile ou lait).</li>
<li><strong>Délai entre 2 séances :</strong> 3 à 4 semaines pour respecter le cycle pilaire.</li>
</ul>`,
        },
        {
          title: "3.3 – Exercice",
          content: `${exo(
            "Contre-indications",
            "Une cliente arrive pour une épilation des jambes : elle revient d'un week-end ensoleillé, sa peau est rouge et chaude. Que faites-vous ?",
            "<p>Je <strong>refuse l'épilation à la cire</strong> ce jour-là (risque d'arrachage de la peau brûlée par le soleil). Je propose un report à 7-10 jours et conseille une crème apaisante (après-soleil, aloe vera). Je note le refus motivé dans la fiche cliente pour traçabilité Qualiopi.</p>"
          )}`,
        },
      ],
    },
    {
      title: "Module 4 – Maquillage",
      description: "Étude du visage, maquillage jour/soir, correctif et conseil personnalisé (Bloc 1).",
      sections: [
        {
          title: "4.1 – Étude morphologique du visage",
          content: `${photo(IMG.maquillage, "Application de maquillage professionnel")}
<p>Avant tout maquillage, identifier la <strong>forme du visage</strong> :</p>
<ul>
<li><strong>Ovale</strong> : référence harmonieuse, tout maquillage convient.</li>
<li><strong>Rond</strong> : allonger avec contouring vertical, blush en diagonal.</li>
<li><strong>Carré</strong> : adoucir les angles, blush sur les pommettes.</li>
<li><strong>Long</strong> : raccourcir avec contouring horizontal (front + menton), blush horizontal.</li>
<li><strong>Triangle</strong> : équilibrer haut/bas avec contouring et blush adapté.</li>
</ul>`,
        },
        {
          title: "4.2 – Protocole maquillage jour",
          content: `<ol>
<li>Préparation : crème + base lissante.</li>
<li>Anti-cernes (en triangle inversé sous l'œil).</li>
<li>Fond de teint léger appliqué au pinceau ou éponge humide.</li>
<li>Poudre matifiante (zone T uniquement si peau mixte).</li>
<li>Sculpting léger (contouring + highlighter sur pommettes hautes).</li>
<li>Sourcils brossés et structurés.</li>
<li>Yeux : fard nude + crayon discret + 1 couche de mascara.</li>
<li>Joues : blush rosé sur la pomme des joues.</li>
<li>Lèvres : baume + rouge nude ou rosé.</li>
</ol>
<p><strong>Durée :</strong> 20-25 minutes. <strong>Objectif :</strong> teint frais, naturel, longue tenue.</p>`,
        },
        {
          title: "4.3 – Exercice",
          content: `${exo(
            "Conseil personnalisé",
            "Cliente : 30 ans, visage rond, yeux verts, peau claire. Elle veut un maquillage de soirée. Décrivez votre proposition.",
            "<p><strong>Teint :</strong> base lissante + fond de teint medium coverage + poudre légère + contouring vertical (sous les pommettes) pour affiner. <strong>Yeux :</strong> smoky bronze/cuivré (sublime les yeux verts par contraste complémentaire), eye-liner noir, faux-cils, mascara waterproof. <strong>Sourcils :</strong> structurés et marqués. <strong>Joues :</strong> blush pêche en diagonal + highlighter. <strong>Lèvres :</strong> rouge nude mat ou nude glossy (pour ne pas surcharger). Fixation au spray.</p>"
          )}`,
        },
      ],
    },
    {
      title: "Module 5 – Soins des mains, des pieds et prothésie ongulaire",
      description: "Manucure, beauté des pieds, pose de vernis classique et semi-permanent (Blocs 1 et 2).",
      sections: [
        {
          title: "5.1 – Protocole manucure complète",
          content: `${photo(IMG.manucure, "Manucure professionnelle")}
<ol>
<li>Démaquillage de l'ancien vernis (dissolvant sans acétone si possible).</li>
<li>Limage en forme choisie (carré, carré-arrondi, amande, ovale).</li>
<li>Bain adoucissant des mains (5 min, eau tiède savonneuse).</li>
<li>Soin des cuticules (repoussoir + huile, jamais de coupe agressive).</li>
<li>Polissage léger pour lisser l'ongle.</li>
<li>Modelage des mains avec crème nourrissante (5 min).</li>
<li>Dégraissage de l'ongle avec dissolvant.</li>
<li>Base + 2 couches de vernis + top coat.</li>
</ol>
<p><strong>Durée :</strong> 45 min (manucure classique) – 60 min (avec semi-permanent).</p>`,
        },
        {
          title: "5.2 – Vernis semi-permanent",
          content: `<p>Le semi-permanent (gel polish) tient <strong>2 à 3 semaines</strong> :</p>
<ul>
<li>Préparation rigoureuse : ponçage léger de l'ongle, dégraissage au cleaner.</li>
<li>Base + 2 à 3 couches de couleur + top coat, chaque couche catalysée sous lampe UV/LED (30 à 60 sec).</li>
<li>Dépose : limage du top coat + acétone pure 10 min + retrait délicat au repoussoir.</li>
<li><strong>Contre-indications :</strong> ongles abîmés, mycose, allergie aux résines.</li>
</ul>`,
        },
        {
          title: "5.3 – Exercice",
          content: `${exo(
            "Diagnostic ongulaire",
            "Une cliente a des ongles cassants, dédoublés, après plusieurs poses de semi-permanent. Quels conseils donnez-vous ?",
            "<p><strong>Pause technique de 3-4 semaines</strong> avec des soins reconstructeurs (durcisseurs à la kératine, huile de ricin sur les cuticules tous les soirs, gants pour ménage). <strong>Vitamines :</strong> biotine, zinc. À la reprise, alterner avec du vernis classique. Toujours utiliser une base protectrice et soigner la dépose (pas d'arrachage).</p>"
          )}`,
        },
      ],
    },
    {
      title: "Module 6 – Conseil, vente et vie d'un institut",
      description: "Accueil, fidélisation, techniques de vente et gestion d'un espace de vente (Bloc 3).",
      sections: [
        {
          title: "6.1 – L'accueil de la cliente",
          content: `${photo(IMG.institut, "Accueil en institut de beauté")}
<p>L'accueil conditionne <strong>70 %</strong> de la perception de la qualité du soin :</p>
<ul>
<li>Sourire et regard à l'arrivée, prononciation du nom de la cliente.</li>
<li>Proposition d'une boisson (eau, thé, café).</li>
<li>Conduite à la cabine, présentation rapide du déroulé.</li>
<li>Écoute active des attentes (questions ouvertes : « Comment puis-je vous faire plaisir aujourd'hui ? »).</li>
<li>À la fin : reformulation, conseils maison, prise du prochain RDV, encaissement courtois.</li>
</ul>`,
        },
        {
          title: "6.2 – Techniques de vente conseil",
          content: `<p>La vente en institut suit la méthode <strong>CAB</strong> :</p>
<ul>
<li><strong>C</strong> – Caractéristique : « Cette crème contient 5 % d'acide hyaluronique. »</li>
<li><strong>A</strong> – Avantage : « Elle hydrate les couches profondes de la peau. »</li>
<li><strong>B</strong> – Bénéfice client : « Vous aurez une peau visiblement repulpée dès la 2e application. »</li>
</ul>
<p><strong>Argumentaire :</strong> écouter le besoin, proposer 1 à 2 produits maximum, démontrer (test sur la main), conclure (« Vous le prenez aujourd'hui ? »), encaisser sans relancer.</p>
<p><strong>Fidélisation :</strong> carte de fidélité, anniversaire, SMS personnalisé, programme parrainage.</p>`,
        },
        {
          title: "6.3 – Exercices de mise en situation",
          content: `${exo(
            "Vente additionnelle",
            "Une cliente vient pour une épilation des jambes (35 €). Vous remarquez qu'elle a la peau très sèche. Proposez-lui un produit en utilisant la méthode CAB.",
            "<p><em>« J'ai remarqué que votre peau est un peu déshydratée après l'épilation. Je vous recommande notre lait corps à l'aloe vera (Caractéristique : 95 % d'ingrédients naturels et aloe vera bio). Il pénètre rapidement et apaise les rougeurs post-épilation (Avantage). Vous éviterez les démangeaisons des prochains jours et votre peau sera plus douce, prolongeant la durée de votre épilation (Bénéfice). Souhaitez-vous l'essayer dès aujourd'hui ? »</em></p>"
          )}
${exo(
  "Gestion réclamation",
  "Une cliente revient 24h après son soin du visage avec des rougeurs et picotements. Que faites-vous ?",
  "<ol><li>L'accueillir avec empathie sans la culpabiliser.</li><li>Examiner sa peau, identifier la cause (réaction aux produits ? Exposition soleil ? Allergie ?).</li><li>Proposer un soin gratuit apaisant (masque calmant, sérum à la camomille).</li><li>Lui remettre un échantillon de soin réparateur.</li><li>Si réaction allergique : orienter vers un médecin et noter dans la fiche cliente le produit suspect.</li><li>Documenter l'incident (traçabilité Qualiopi IND 30).</li></ol>"
)}`,
        },
      ],
    },
    {
      title: "Module 7 – Connaissance des produits cosmétiques",
      description: "Composition, réglementation et conseils produits (Bloc 3).",
      sections: [
        {
          title: "7.1 – Lecture d'une étiquette cosmétique (INCI)",
          content: `${photo(IMG.produits, "Produits cosmétiques en linéaire")}
<p>La <strong>liste INCI</strong> (International Nomenclature of Cosmetic Ingredients) est obligatoire :</p>
<ul>
<li>Les ingrédients sont listés par ordre décroissant de concentration (les 5 premiers représentent 80 % du produit).</li>
<li>Sous 1 %, ils peuvent être listés dans n'importe quel ordre.</li>
<li>Les colorants apparaissent sous forme « CI 12345 ».</li>
<li>Allergènes obligatoires : linalool, limonene, citronellol, geraniol…</li>
</ul>
<p><strong>Ingrédients à signaler :</strong> parabens, silicones, parfums, alcool dénaturé (Alcohol denat.), sulfates (SLS, SLES).</p>`,
        },
        {
          title: "7.2 – Réglementation cosmétique européenne",
          content: `<p>Tout produit cosmétique vendu en UE doit respecter le <strong>Règlement (CE) n°1223/2009</strong> :</p>
<ul>
<li>Dossier d'information produit (DIP) tenu à disposition des autorités.</li>
<li>Personne responsable identifiée dans l'UE.</li>
<li>Évaluation de la sécurité par un toxicologue.</li>
<li>Notification CPNP (Cosmetic Products Notification Portal).</li>
<li>Étiquetage : nom, fonction, contenance, DLUO/PAO, INCI, précautions, lot.</li>
</ul>`,
        },
        {
          title: "7.3 – Exercice",
          content: `${exo(
            "Décryptage INCI",
            "Voici les 6 premiers ingrédients d'une crème : Aqua, Glycerin, Cetearyl Alcohol, Caprylic/Capric Triglyceride, Sodium Hyaluronate, Tocopherol. Que peut-on en déduire ?",
            "<p><strong>Aqua</strong> = eau (base de la crème). <strong>Glycerin</strong> = humectant puissant (hydratation). <strong>Cetearyl Alcohol</strong> = émulsifiant et co-émollient (non irritant malgré le nom). <strong>Caprylic/Capric Triglyceride</strong> = huile de coco fractionnée (texture légère). <strong>Sodium Hyaluronate</strong> = acide hyaluronique (repulpant). <strong>Tocopherol</strong> = vitamine E (antioxydant). <strong>Conclusion :</strong> crème hydratante et anti-âge légère, adaptée aux peaux normales à mixtes, sans parfum allergène.</p>"
          )}`,
        },
      ],
    },
    {
      title: "Module 8 – Préparation à l'examen CAP",
      description: "Méthodologie, épreuves écrites et pratiques, gestion du stress.",
      sections: [
        {
          title: "8.1 – Structure des épreuves CAP Esthétique RNCP39030",
          content: `<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#fce7f3"><th>Épreuve</th><th>Durée</th><th>Coeff.</th></tr>
<tr><td>EP1 – Techniques esthétiques du visage, des mains et des pieds</td><td>3h00 pratique + 1h écrit</td><td>7</td></tr>
<tr><td>EP2 – Techniques esthétiques liées aux phanères</td><td>2h30 pratique + 1h écrit</td><td>4</td></tr>
<tr><td>EP3 – Conduite d'un institut de beauté : conseil et vente</td><td>1h écrit + 30 min oral</td><td>4</td></tr>
<tr><td>EG1 – Français, Histoire-Géo, EMC (si non dispensé)</td><td>3h15</td><td>3</td></tr>
<tr><td>EG2 – Mathématiques – Sciences physiques et chimiques</td><td>2h</td><td>2</td></tr>
</table>
<p><strong>Admission :</strong> moyenne ≥ 10/20 sur l'ensemble.</p>`,
        },
        {
          title: "8.2 – Conseils méthodologiques",
          content: `<ul>
<li><strong>Pratique :</strong> répéter chaque protocole 5 à 10 fois minimum, chronométrer les gestes.</li>
<li><strong>Écrit :</strong> fiches de révision par bloc, schémas anatomiques annotés.</li>
<li><strong>Oral :</strong> entraîner la posture, le sourire, la méthode CAB sur 3 produits types.</li>
<li><strong>Stress :</strong> respiration 4-7-8 avant épreuve, sommeil suffisant, hydratation.</li>
<li><strong>Jour J :</strong> arriver 30 min en avance, pièce d'identité + convocation, kit complet vérifié la veille.</li>
</ul>`,
        },
        {
          title: "8.3 – Auto-évaluation de fin de formation",
          content: `<p>Cochez votre niveau de maîtrise pour chaque compétence :</p>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#fce7f3"><th>Compétence</th><th>Débutant</th><th>En cours</th><th>Acquis</th><th>Maîtrisé</th></tr>
<tr><td>Diagnostic de peau</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Soin du visage complet (60 min)</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Épilation cire chaude / tiède</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Maquillage jour & soir</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Manucure + pose vernis semi-permanent</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Beauté des pieds</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Conseil et vente (méthode CAB)</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Hygiène et sécurité en institut</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Lecture INCI et réglementation</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
</table>
<p style="margin-top:15px;font-style:italic">Commentaire libre du stagiaire : ____________________________________</p>`,
        },
      ],
    },
  ];
}
