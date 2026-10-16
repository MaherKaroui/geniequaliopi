import type { CourseChapter } from "../courseContent";

export const MSP21_PARTIE2: CourseChapter[] = [
  {
    title: "Chapitre 4 – Préparer son poste de travail, respecter les règles d'hygiène et tenir compte du handicap (C3)",
    description:
      "Aménager une salle technique conforme aux bonnes pratiques de l'arrêté du 11 mars 2009, réunir le matériel et les consommables, dérouler pas à pas la chaîne d'hygiène (tenue, hygiène des mains, gants, champ stérile, ouverture des emballages devant la cliente, protection du dermographe, antisepsie), distinguer le stérile du désinfecté, assurer la traçabilité des lots, gérer les DASRI et réagir à un accident d'exposition au sang. Organiser son ergonomie et adapter le poste à une situation de handicap, celle de la praticienne ou celle de la cliente, à partir du cas fictif de Mme Yasmine BELKACEM à l'Institut Ligne & Teint. Séquence traitée le jour 1 de la formation. Compétence C3 du référentiel RS6459.",
    sections: [
      {
        title: "4.1 – Le cadre : pourquoi l'hygiène est le cœur du métier de dermopigmentiste",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Situer la compétence C3 dans le référentiel RS6459 et comprendre pourquoi elle conditionne toutes les autres.</li>
<li>Rappeler les textes qui encadrent l'hygiène du maquillage semi-permanent et ce que chacun impose à la praticienne.</li>
<li>Identifier les risques infectieux propres à une technique par effraction cutanée et les principes qui permettent de les maîtriser.</li>
</ul>

<h3>Le libellé officiel de la compétence</h3>
<p>La fiche RS6459 formule ainsi la troisième compétence attestée : <strong>« C3 – Préparer son poste de travail, en tenant compte d'une éventuelle situation de handicap (la sienne ou celle de la cliente) et respecter les règles d'hygiène »</strong>. Ce libellé réunit trois exigences qui, dans la pratique, ne se séparent jamais :</p>
<ul>
<li><strong>l'organisation matérielle</strong> : un poste rangé, complet, préparé avant l'arrivée de la cliente, dans lequel chaque objet a sa place et où l'on ne cherche rien pendant la prestation ;</li>
<li><strong>la maîtrise du risque infectieux</strong> : une suite de gestes d'hygiène toujours identiques, que l'on appelle la chaîne d'hygiène, et dont aucun maillon ne peut être sauté ;</li>
<li><strong>l'accessibilité et l'adaptation</strong> : un poste qui permet à la praticienne de travailler sans se blesser et à toute cliente, y compris en situation de handicap, d'être accueillie et installée en sécurité et dans le respect de sa dignité.</li>
</ul>
<p>Lors de la mise en situation professionnelle devant le jury, la préparation du poste et le respect de la chaîne d'hygiène sont observés du premier au dernier geste. Une réalisation esthétiquement réussie mais obtenue avec une rupture d'asepsie (gant contaminé qui touche le pigment, emballage stérile ouvert à l'avance, surface non désinfectée) n'est pas une prestation professionnelle.</p>

<h3>Une technique par effraction cutanée</h3>
<p>Le maquillage semi-permanent dépose un pigment dans l'épiderme, jusqu'à la jonction dermo-épidermique, au moyen d'une aiguille (dermographe) ou d'une lame composée de fines aiguilles (technique manuelle, dite microblading). La barrière cutanée est donc volontairement franchie. C'est cette <strong>effraction</strong> qui fait du maquillage semi-permanent une activité réglementée au même titre que le tatouage : le Code de la santé publique, dans ses articles <strong>R1311-1 à R1311-13</strong>, vise expressément les techniques de tatouage par effraction cutanée, <strong>y compris le maquillage permanent</strong>, ainsi que le perçage.</p>
<p>Franchir la peau expose à deux familles de risques :</p>
<table border="1" cellpadding="6">
<tr><th>Risque</th><th>Origine possible</th><th>Moyen de maîtrise</th></tr>
<tr><td>Infection locale (bactérienne, plus rarement virale ou fongique) de la zone traitée</td><td>Germes présents sur la peau de la cliente, sur les mains de la praticienne, sur le matériel, dans un pigment contaminé ou dans l'environnement</td><td>Antisepsie de la peau, hygiène des mains, gants, matériel stérile à usage unique, pigment conforme et non recontaminé, surfaces désinfectées, consignes post-prestation</td></tr>
<tr><td>Transmission d'agents infectieux par le sang (virus des hépatites B et C, VIH notamment)</td><td>Réutilisation d'une aiguille, d'une cartouche ou d'une lame, contamination croisée par un objet souillé, pot de pigment commun</td><td>Usage unique strict, godets de pigment individuels, protections à usage unique du dermographe, élimination immédiate des piquants-coupants en collecteur</td></tr>
<tr><td>Accident d'exposition au sang pour la praticienne</td><td>Piqûre avec une aiguille souillée, coupure avec une lame, projection sur une muqueuse</td><td>Gants, gestes sans recapuchonnage, collecteur à portée de main, conduite à tenir connue et affichée</td></tr>
<tr><td>Réaction allergique ou irritative</td><td>Pigment, latex des gants, antiseptique, produit de soin</td><td>Interrogatoire préalable (C2), gants sans latex si besoin, produits conformes et étiquetés, traçabilité des lots</td></tr>
</table>

<h3>Les textes qui structurent la compétence C3</h3>
<table border="1" cellpadding="6">
<tr><th>Texte</th><th>Ce qu'il impose (repères du cours)</th><th>Conséquence pour le poste de travail</th></tr>
<tr><td>Code de la santé publique, articles R1311-1 à R1311-13</td><td>Encadrement des techniques de tatouage par effraction cutanée, y compris le maquillage permanent, et du perçage</td><td>L'activité est soumise à des obligations de déclaration, de formation et de bonnes pratiques</td></tr>
<tr><td>Déclaration auprès du directeur général de l'ARS (R1311-2)</td><td>La praticienne déclare son activité avant de la mettre en œuvre</td><td>Le lieu d'exercice déclaré doit permettre de respecter les règles d'hygiène</td></tr>
<tr><td>Formation aux conditions d'hygiène et de salubrité (R1311-3), contenu fixé par l'arrêté du 12 décembre 2008</td><td>Formation obligatoire de 21 h, dispensée par un organisme habilité</td><td>C'est aussi un prérequis à la validation de la certification RS6459 ; l'attestation doit pouvoir être présentée</td></tr>
<tr><td>Arrêté du 11 mars 2009</td><td>Bonnes pratiques d'hygiène et de salubrité pour la mise en œuvre des techniques de tatouage par effraction cutanée et du perçage</td><td>Aménagement des locaux, organisation de la salle technique, gestes d'hygiène, gestion du matériel</td></tr>
<tr><td>Arrêté du 3 décembre 2008</td><td>Information préalable des clients sur les risques et sur les précautions à respecter après la réalisation (affichage et document remis)</td><td>Affichage visible dans les locaux et document remis à la cliente (lien avec C2 et C11)</td></tr>
<tr><td>Articles R1335-1 et suivants du CSP</td><td>Gestion des déchets d'activités de soins à risques infectieux (DASRI)</td><td>Tri à la source, collecteurs adaptés, convention de collecte, bordereaux de suivi</td></tr>
<tr><td>Articles L513-10-1 et suivants du CSP, règlement REACH et règlement (UE) 2020/2081</td><td>Définition et surveillance des produits de tatouage (ANSM), restriction des substances dangereuses dans les encres</td><td>Pigments conformes, étiquetés, numéro de lot relevé sur la fiche cliente</td></tr>
</table>
<p>Ce cours reprend les principes de ces textes pour les traduire en gestes. Il ne remplace ni la lecture des textes eux-mêmes, ni la formation hygiène et salubrité de 21 h, qui reste obligatoire pour exercer.</p>

<h3>Quatre principes qui guident tous les gestes</h3>
<ol>
<li><strong>Du propre vers le sale, jamais l'inverse.</strong> Le matériel stérile est ouvert en dernier, au plus près du geste, et ne croise jamais un objet souillé. Les déchets suivent un chemin à sens unique vers les poubelles et le collecteur.</li>
<li><strong>Tout ce qui touche la peau effractée est stérile et à usage unique.</strong> Aiguilles, cartouches, lames de microblading et godets de pigment sont neufs pour chaque cliente et éliminés après usage.</li>
<li><strong>Tout ce qui est touché pendant la prestation est protégé ou désinfecté.</strong> Le dermographe, son cordon, les flacons, la lampe, le fauteuil sont protégés par des housses ou films à usage unique, ou désinfectés entre chaque cliente.</li>
<li><strong>Tout ce qui est fait est tracé.</strong> Les numéros de lot des pigments et des aiguilles figurent sur la fiche cliente : en cas de réaction ou d'alerte sur un produit, la praticienne doit pouvoir retrouver quelles clientes ont été concernées.</li>
</ol>

<h3>Le fil rouge du chapitre</h3>
<p>L'Institut Ligne & Teint (institut de beauté fictif à Argenteuil, Val-d'Oise) ouvre un espace de dermopigmentation. Sa gérante, Nadia FERRAND, a suivi la formation hygiène et salubrité et prépare la salle technique. Parmi les premières clientes figure Mme Yasmine BELKACEM, 38 ans, qui se déplace en fauteuil roulant et souhaite un embellissement des sourcils. Tout au long du chapitre, nous construisons avec Nadia une salle technique conforme, une chaîne d'hygiène écrite et une organisation qui permet d'accueillir Mme BELKACEM sans improvisation.</p>

<blockquote><strong>À retenir.</strong> Le maquillage semi-permanent est une technique par effraction cutanée encadrée par le Code de la santé publique (R1311-1 à R1311-13). L'hygiène n'est pas une étape annexe : elle est le socle de la compétence C3 et elle est observée sur chaque geste lors de l'évaluation. Quatre principes la résument : du propre vers le sale, stérile et usage unique pour tout ce qui touche la peau effractée, protection ou désinfection de tout ce qui est touché, traçabilité de tout ce qui est utilisé.</blockquote>
`,
      },
      {
        title: "4.2 – Aménager la salle technique selon l'arrêté du 11 mars 2009",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Connaître les grandes exigences d'aménagement des locaux posées par les bonnes pratiques de l'arrêté du 11 mars 2009.</li>
<li>Organiser la salle en zones distinctes et respecter la marche en avant.</li>
<li>Choisir des revêtements, un point d'eau et un éclairage compatibles avec l'hygiène et la précision du geste.</li>
</ul>

<h3>Une salle dédiée à la technique</h3>
<p>L'arrêté du 11 mars 2009 relatif aux bonnes pratiques d'hygiène et de salubrité pour la mise en œuvre des techniques de tatouage par effraction cutanée et du perçage pose le principe d'une <strong>salle technique</strong> réservée à la réalisation des actes, distincte des espaces d'accueil, d'attente, de vente ou de soins esthétiques classiques. Dans un institut de beauté qui ouvre une activité de dermopigmentation, cela signifie concrètement qu'on ne réalise pas un maquillage semi-permanent dans la cabine où l'on vient de faire une épilation à la cire ou un soin du visage aux huiles, et qu'on ne laisse pas la salle technique servir de lieu de stockage ou de passage.</p>
<p>Chez Ligne & Teint, Nadia FERRAND a choisi la cabine la plus éloignée de l'accueil, fermée par une porte, qu'elle consacre exclusivement à la dermopigmentation. Les produits de vente, les serviettes en tissu des soins du visage et la cire ont été déplacés dans une autre pièce.</p>

<h3>Le zonage de la salle : penser en « marche en avant »</h3>
<p>La marche en avant consiste à organiser l'espace et les gestes de façon que le propre et le sale ne se croisent jamais. On distingue en pratique plusieurs zones, matérialisées par l'emplacement des meubles et par des habitudes strictes :</p>
<table border="1" cellpadding="6">
<tr><th>Zone</th><th>Contenu</th><th>Règles de fonctionnement</th></tr>
<tr><td>Zone de stockage propre</td><td>Armoire ou meuble fermé : consommables stériles dans leurs emballages, pigments, gants, champs, housses, produits d'entretien rangés à part</td><td>Fermée, à l'abri de la poussière, de la chaleur, de l'humidité et de la lumière directe ; rotation des stocks selon les dates de péremption ; aucun objet usagé</td></tr>
<tr><td>Zone de lavage des mains</td><td>Point d'eau, savon liquide en distributeur, essuie-mains à usage unique, solution hydroalcoolique, poubelle</td><td>Réservé à l'hygiène des mains ; on n'y rince pas le matériel ; accessible sans toucher de surface propre</td></tr>
<tr><td>Zone de préparation</td><td>Plan de travail désinfecté sur lequel on dispose le champ et le matériel juste avant la prestation</td><td>Désinfecté avant chaque mise en place ; rien n'y est posé qui n'appartienne à la prestation en cours</td></tr>
<tr><td>Zone de réalisation</td><td>Fauteuil ou table de soin, tabouret de la praticienne, lampe, desserte avec le champ stérile</td><td>Housses à usage unique sur les surfaces en contact avec la cliente ; desserte à portée de main sans se retourner</td></tr>
<tr><td>Zone d'élimination</td><td>Collecteur pour objets piquants-coupants, sac ou poubelle DASRI, poubelle pour déchets ménagers</td><td>À portée de main de la praticienne mais hors du passage ; collecteur fixé et stable ; jamais au-dessus du champ</td></tr>
<tr><td>Zone d'entretien et, le cas échéant, de traitement du matériel réutilisable</td><td>Produits détergents-désinfectants, matériel de nettoyage, éventuel matériel de traitement des instruments réutilisables</td><td>Séparée de la zone de préparation ; dans une salle utilisant exclusivement du matériel à usage unique pour l'effraction, cette zone se limite à l'entretien</td></tr>
</table>
<p>Dans une petite cabine, ces zones ne sont pas forcément des pièces : ce sont des emplacements. L'essentiel est que leur ordre corresponde au déroulé de la prestation et que la praticienne n'ait jamais à passer au-dessus du champ stérile avec un objet usagé.</p>

<h3>Des surfaces lisses et lessivables</h3>
<p>Les bonnes pratiques exigent des revêtements faciles à nettoyer et à désinfecter. On retient comme règle générale : tout ce qui se trouve dans la salle technique doit pouvoir être lavé avec un produit détergent-désinfectant sans s'abîmer.</p>
<ul>
<li><strong>Sols</strong> : revêtement continu, lisse, sans joints profonds ni tapis ; plinthes ou angles faciles à nettoyer.</li>
<li><strong>Murs</strong> au voisinage de la zone de réalisation : peinture ou revêtement lessivable ; on évite le papier peint, les tentures et les décorations textiles.</li>
<li><strong>Plans de travail et dessertes</strong> : surfaces non poreuses, sans rayures profondes ; le bois brut, le tissu et les matières absorbantes sont proscrits.</li>
<li><strong>Fauteuil ou table</strong> : revêtement en matière lessivable, sans déchirure ; protégé par un drap d'examen ou une housse à usage unique changés pour chaque cliente.</li>
<li><strong>Mobilier</strong> : réduit au strict nécessaire, sans objets décoratifs qui retiennent la poussière (plantes, bibelots, coussins).</li>
</ul>
<p>Nadia a retiré le tapis décoratif et les rideaux de la cabine, fait repeindre les murs avec une peinture lessivable et remplacé l'étagère en bois brut par un meuble fermé à surfaces lisses.</p>

<h3>Le point d'eau et l'hygiène des mains</h3>
<p>Un point d'eau dédié au lavage des mains doit être disponible dans la salle technique ou à proximité immédiate. Ses équipements sont choisis pour éviter la recontamination des mains après le lavage :</p>
<ul>
<li>robinet dont l'usage ne nécessite pas de reprendre le contact avec les mains propres (commande non manuelle, au coude, au pied ou à détection, selon l'installation) ;</li>
<li>savon liquide en distributeur (pas de savon en pain) ;</li>
<li>essuie-mains à usage unique en distributeur (pas de serviette en tissu partagée) ;</li>
<li>poubelle à proximité, de préférence à ouverture sans contact manuel ;</li>
<li>distributeur de solution hydroalcoolique à portée de main de la zone de réalisation.</li>
</ul>

<h3>L'éclairage : voir juste pour piquer juste</h3>
<p>La précision du dessin préparatoire, la lecture de la profondeur d'effraction et le contrôle du rendu de couleur exigent un éclairage de qualité. On recherche :</p>
<ul>
<li>un <strong>éclairage général</strong> suffisant et homogène de la pièce, qui permet aussi de repérer les salissures lors de l'entretien ;</li>
<li>un <strong>éclairage d'appoint orientable</strong> (lampe articulée, avec ou sans loupe) placé de manière à ne pas créer d'ombre portée de la main de la praticienne sur la zone travaillée ;</li>
<li>une lumière dont le <strong>rendu des couleurs</strong> est fidèle, proche de la lumière du jour, pour juger correctement la teinte d'un pigment et la carnation de la cliente (voir chapitre 6) ;</li>
<li>une lampe dont la tête et le bras peuvent être protégés par un film à usage unique ou désinfectés entre chaque cliente.</li>
</ul>
<p>Attention au confort de la cliente, surtout pour l'eye-liner : la lampe ne doit pas éblouir directement l'œil, et on prévient la cliente avant de l'orienter.</p>

<h3>Ventilation, température et autres éléments du local</h3>
<ul>
<li>Une aération régulière de la pièce, en dehors des temps de prestation, et une température confortable (une cliente qui a froid se crispe ; une praticienne qui a chaud transpire sous ses gants).</li>
<li>Aucun animal dans la salle technique ; on n'y mange pas et on n'y boit pas.</li>
<li>Un affichage de l'information préalable sur les risques et les précautions après la réalisation, conformément à l'arrêté du 3 décembre 2008, visible par la clientèle dans les locaux.</li>
<li>Un emplacement fermé pour les dossiers clients papier, ou un poste informatique sécurisé, compatible avec le RGPD (les fiches clientes contiennent des données de santé).</li>
</ul>

<h3>Liste de contrôle d'aménagement utilisée chez Ligne & Teint</h3>
<table border="1" cellpadding="6">
<tr><th>Point vérifié</th><th>Conforme</th><th>Action si non conforme</th></tr>
<tr><td>Salle réservée à la dermopigmentation, porte fermée, aucun autre usage</td><td>Oui</td><td>–</td></tr>
<tr><td>Sol continu, lisse, sans tapis</td><td>Oui après retrait du tapis</td><td>Retrait effectué</td></tr>
<tr><td>Murs lessivables près du fauteuil</td><td>Oui après travaux</td><td>Peinture lessivable posée</td></tr>
<tr><td>Point d'eau avec savon liquide et essuie-mains à usage unique</td><td>Oui</td><td>–</td></tr>
<tr><td>Robinet à commande non manuelle</td><td>Non</td><td>Remplacement prévu ; en attendant, fermeture du robinet avec l'essuie-mains usagé</td></tr>
<tr><td>Meuble de stockage fermé</td><td>Oui</td><td>–</td></tr>
<tr><td>Lampe articulée à rendu des couleurs fidèle</td><td>Oui</td><td>–</td></tr>
<tr><td>Collecteur piquants-coupants fixé à portée de main</td><td>Oui</td><td>–</td></tr>
<tr><td>Affichage de l'information préalable (arrêté du 3 décembre 2008)</td><td>Oui</td><td>–</td></tr>
<tr><td>Espace de circulation suffisant pour un fauteuil roulant</td><td>À vérifier</td><td>Voir section 4.9</td></tr>
</table>

<blockquote><strong>À retenir.</strong> La salle technique est dédiée à l'activité. Elle est organisée en zones qui suivent la marche en avant : stockage propre, lavage des mains, préparation, réalisation, élimination, entretien. Les surfaces sont lisses et lessivables, le point d'eau est équipé de savon liquide et d'essuie-mains à usage unique, l'éclairage est homogène, orientable et fidèle aux couleurs. L'affichage de l'information préalable est visible par la clientèle.</blockquote>
`,
      },
      {
        title: "4.3 – Matériel et consommables : composer et organiser son poste",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Dresser l'inventaire du matériel durable et des consommables nécessaires à une prestation de maquillage semi-permanent.</li>
<li>Distinguer pour chaque élément son statut : stérile à usage unique, à usage unique non stérile, réutilisable à désinfecter.</li>
<li>Gérer les stocks : conditions de conservation, dates de péremption, rotation, intégrité des emballages.</li>
</ul>

<h3>Le matériel durable</h3>
<table border="1" cellpadding="6">
<tr><th>Élément</th><th>Usage</th><th>Entretien</th></tr>
<tr><td>Fauteuil ou table de soin réglable</td><td>Installer la cliente en position semi-allongée ou allongée, à la bonne hauteur pour la praticienne</td><td>Désinfection entre chaque cliente ; drap d'examen ou housse à usage unique</td></tr>
<tr><td>Tabouret de la praticienne, réglable, à roulettes</td><td>Travailler assise, dos soutenu, au plus près de la zone</td><td>Désinfection régulière de l'assise et des commandes</td></tr>
<tr><td>Desserte</td><td>Recevoir le champ stérile et le matériel de la prestation</td><td>Désinfection avant chaque mise en place du champ</td></tr>
<tr><td>Lampe articulée (avec ou sans loupe)</td><td>Éclairer précisément la zone</td><td>Film de protection à usage unique ou désinfection entre chaque cliente</td></tr>
<tr><td>Dermographe (rotatif ou à cartouches) et son alimentation</td><td>Effraction électrique (voir chapitre consacré à C6)</td><td>Protection à usage unique du corps et du cordon ; désinfection selon la notice du fabricant entre chaque cliente</td></tr>
<tr><td>Porte-lame ou manche de microblading réutilisable, s'il en est utilisé</td><td>Tenir la lame stérile en technique manuelle</td><td>Selon la notice : soit modèle entièrement à usage unique (recommandé), soit traitement adapté du manche entre chaque cliente</td></tr>
<tr><td>Instruments de mesure réutilisables (compas, règle rigide)</td><td>Mesure et symétrie (voir chapitre 5)</td><td>Désinfection entre chaque cliente ; préférer des modèles à usage unique quand ils touchent la peau</td></tr>
<tr><td>Appareil photo ou tablette</td><td>Photos avant/après, validation du dessin</td><td>Désinfection de la coque ; ne jamais le manipuler avec des gants contaminés</td></tr>
<tr><td>Collecteur pour objets piquants-coupants (support)</td><td>Éliminer immédiatement aiguilles, cartouches, lames</td><td>Collecteur remplacé lorsqu'il atteint son repère de remplissage</td></tr>
</table>

<h3>Les consommables</h3>
<table border="1" cellpadding="6">
<tr><th>Consommable</th><th>Statut</th><th>Points de vigilance</th></tr>
<tr><td>Aiguilles et cartouches pour dermographe</td><td>Stériles, à usage unique</td><td>Emballage individuel intact, date de péremption, numéro de lot relevé ; ouverture devant la cliente</td></tr>
<tr><td>Lames de microblading</td><td>Stériles, à usage unique</td><td>Mêmes exigences ; une lame par cliente et par séance, éliminée en collecteur</td></tr>
<tr><td>Pigments</td><td>Mélanges destinés aux tatouages ou maquillages permanents, conformes au règlement (UE) 2020/2081</td><td>Étiquetage complet, numéro de lot, date de péremption et durée d'utilisation après ouverture indiquées par le fabricant ; jamais de retour dans le flacon d'un pigment prélevé</td></tr>
<tr><td>Godets ou anneaux à pigment</td><td>À usage unique</td><td>Un jeu par cliente ; éliminés en fin de prestation, même s'il reste du pigment</td></tr>
<tr><td>Gants</td><td>À usage unique (non stériles d'examen ou stériles selon le protocole retenu)</td><td>Taille adaptée ; nitrile ou autre matière sans latex si allergie de la cliente ou de la praticienne ; changement à chaque rupture d'asepsie</td></tr>
<tr><td>Champ de soin</td><td>Stérile ou à usage unique selon son emploi</td><td>Le champ qui reçoit le matériel stérile doit lui-même être stérile</td></tr>
<tr><td>Housses, films et manchons de protection</td><td>À usage unique</td><td>Dermographe, cordon, lampe, flacons, appareil photo, commandes du fauteuil</td></tr>
<tr><td>Compresses</td><td>Stériles pour l'antisepsie et l'essuyage pendant l'effraction ; non stériles pour le démaquillage</td><td>Ne pas mélanger les deux stocks</td></tr>
<tr><td>Antiseptique cutané</td><td>Produit adapté à la peau et, pour les zones proches des yeux ou des muqueuses, à ces zones</td><td>Date de péremption et date d'ouverture notées ; flacon refermé ; pas de transvasement</td></tr>
<tr><td>Crayons de dessin préparatoire, fil de mesure, règles adhésives</td><td>Usage unique ou réservés à une cliente</td><td>Un crayon taillé ou neuf par cliente ; fil et règles adhésives jetés</td></tr>
<tr><td>Coton-tiges, microbrossettes, spatules</td><td>À usage unique</td><td>Jamais replongés dans un produit après contact avec la peau</td></tr>
<tr><td>Tenue à usage unique (blouse, charlotte, masque)</td><td>À usage unique</td><td>Voir section 4.4</td></tr>
<tr><td>Draps d'examen</td><td>À usage unique</td><td>Changés pour chaque cliente</td></tr>
<tr><td>Produit détergent-désinfectant des surfaces</td><td>Produit conforme aux normes de désinfection, compatible avec les surfaces</td><td>Respect du temps de contact indiqué par le fabricant</td></tr>
<tr><td>Solution hydroalcoolique</td><td>Produit pour l'hygiène des mains</td><td>Flacon pompe, date de péremption</td></tr>
<tr><td>Sacs et collecteurs DASRI</td><td>Conformes, identifiés</td><td>Voir section 4.7</td></tr>
</table>

<h3>Stocker et gérer les stocks</h3>
<p>Un consommable stérile ne reste stérile que si son emballage est intact, sec et non périmé. La gestion des stocks fait donc partie de l'hygiène :</p>
<ul>
<li><strong>Conservation</strong> : dans un meuble fermé, à l'abri de la poussière, de l'humidité, de la chaleur et de la lumière directe ; on respecte les conditions indiquées par le fabricant, notamment pour les pigments.</li>
<li><strong>Rotation</strong> : les produits dont la date de péremption est la plus proche sont placés devant et utilisés en premier.</li>
<li><strong>Contrôle à la réception</strong> : emballages intacts, étiquetage lisible et complet en français, numéros de lot présents, conformité des pigments à la réglementation ; un produit douteux n'entre pas dans le stock.</li>
<li><strong>Contrôle avant usage</strong> : un emballage stérile percé, mouillé, déchiré, ouvert ou périmé est écarté et éliminé, sans exception.</li>
<li><strong>Date d'ouverture</strong> notée sur les flacons d'antiseptique et de pigment, pour respecter la durée d'utilisation après ouverture fixée par le fabricant.</li>
<li><strong>Inventaire</strong> régulier pour éviter la rupture de stock, qui pousse à l'improvisation (par exemple utiliser une configuration d'aiguille inadaptée faute de mieux).</li>
</ul>

<h3>Organiser la desserte : un emplacement pour chaque chose</h3>
<p>Le jour de la prestation, la desserte est préparée selon un schéma toujours identique, que la praticienne connaît par cœur. Chez Ligne & Teint, Nadia FERRAND a photographié et affiché la disposition de référence :</p>
<ol>
<li>au fond de la desserte, côté opposé à la cliente : les flacons de pigment sélectionnés, protégés, et le flacon d'antiseptique ;</li>
<li>au centre, sur le champ stérile : godets à usage unique, compresses stériles, coton-tiges, puis, au dernier moment, l'aiguille ou la lame stérile ;</li>
<li>côté main dominante : le dermographe protégé, posé sur son support, cordon protégé et fixé pour ne pas traîner ;</li>
<li>hors du champ, à portée de main mais en dessous : le collecteur piquants-coupants et le sac DASRI ;</li>
<li>à l'écart, côté main non dominante : la fiche cliente et l'étiquette de lot à reporter, qui ne seront manipulées qu'avec des mains propres (gants retirés ou par une tierce personne).</li>
</ol>

<blockquote><strong>À retenir.</strong> Chaque élément du poste a un statut connu : stérile à usage unique (aiguilles, cartouches, lames, compresses d'antisepsie, champ qui reçoit le stérile), usage unique non stérile (gants d'examen, housses, draps, godets) ou réutilisable à désinfecter (fauteuil, desserte, lampe, dermographe protégé). Les stocks sont conservés fermés, contrôlés à la réception et avant usage, utilisés dans l'ordre des dates de péremption. La desserte est organisée selon un schéma fixe qui évite tout croisement entre le propre et le souillé.</blockquote>
`,
      },
      {
        title: "4.4 – La chaîne d'hygiène pas à pas : de la tenue à l'antisepsie",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Dérouler, dans l'ordre, chaque maillon de la chaîne d'hygiène d'une prestation de maquillage semi-permanent.</li>
<li>Réaliser correctement l'hygiène des mains, l'enfilage et le retrait des gants, l'ouverture d'un emballage stérile et la protection du dermographe.</li>
<li>Repérer les ruptures d'asepsie et savoir les corriger immédiatement.</li>
</ul>

<h3>Vue d'ensemble de la chaîne</h3>
<table border="1" cellpadding="6">
<tr><th>Étape</th><th>Moment</th><th>Geste clé</th></tr>
<tr><td>1. Tenue professionnelle</td><td>Avant l'arrivée de la cliente</td><td>Tenue propre, cheveux attachés, pas de bijoux aux mains et aux poignets, ongles courts sans vernis ni faux ongles</td></tr>
<tr><td>2. Désinfection des surfaces</td><td>Avant l'installation</td><td>Fauteuil, desserte, lampe, tabouret, plan de travail</td></tr>
<tr><td>3. Mise en place des protections</td><td>Avant l'installation</td><td>Drap d'examen, housses de la lampe, du dermographe et du cordon</td></tr>
<tr><td>4. Accueil et installation de la cliente</td><td>Arrivée</td><td>Vérification de la fiche, du consentement, installation, protection des vêtements et des cheveux</td></tr>
<tr><td>5. Hygiène des mains</td><td>Avant tout contact avec la zone</td><td>Lavage si mains visiblement sales, puis friction hydroalcoolique</td></tr>
<tr><td>6. Démaquillage, nettoyage et dessin préparatoire</td><td>Préparation de la zone (chapitre 5)</td><td>Gants d'examen, matériel à usage unique</td></tr>
<tr><td>7. Mise en place du champ stérile</td><td>Après validation du dessin</td><td>Champ ouvert sans toucher sa face utile</td></tr>
<tr><td>8. Ouverture des emballages stériles devant la cliente</td><td>Juste avant l'effraction</td><td>Montrer l'emballage intact, l'ouvrir en déposant le contenu sans contact</td></tr>
<tr><td>9. Changement de gants</td><td>Avant l'antisepsie et l'effraction</td><td>Hygiène des mains entre deux paires</td></tr>
<tr><td>10. Antisepsie de la peau</td><td>Juste avant l'effraction</td><td>Antiseptique adapté à la zone, du centre vers la périphérie, temps de contact respecté</td></tr>
<tr><td>11. Réalisation</td><td>Effraction</td><td>Ne toucher que la zone, le matériel de la prestation et le champ</td></tr>
<tr><td>12. Élimination immédiate</td><td>Fin de l'effraction</td><td>Aiguille, cartouche ou lame directement en collecteur</td></tr>
<tr><td>13. Soins immédiats et consignes</td><td>Fin de prestation</td><td>Voir compétence C11</td></tr>
<tr><td>14. Remise en état et traçabilité</td><td>Après le départ de la cliente</td><td>Déchets triés, surfaces désinfectées, lots notés sur la fiche</td></tr>
</table>

<h3>Étape 1 – La tenue de la praticienne</h3>
<ul>
<li><strong>Tenue de travail propre</strong>, réservée à l'activité, changée dès qu'elle est souillée ; une blouse ou une surblouse à usage unique peut être portée par-dessus pendant la prestation, notamment pour la protéger des projections de pigment.</li>
<li><strong>Cheveux attachés</strong> et, si besoin, couverts par une charlotte, pour qu'ils ne tombent pas sur la zone ni sur le champ et que la praticienne n'ait pas à les remettre en place avec ses mains gantées.</li>
<li><strong>Masque</strong> : il protège la zone effractée des projections de gouttelettes de la praticienne, qui travaille à quelques centimètres du visage de la cliente ; il est changé lorsqu'il est humide ou souillé.</li>
<li><strong>Mains et avant-bras</strong> : aucun bijou (bagues, alliance, bracelets, montre), ongles courts, propres, sans vernis, sans faux ongles ni capsules, qui empêchent une hygiène des mains efficace et peuvent percer les gants ; manches courtes ou relevées.</li>
<li><strong>Lunettes de protection</strong> ou visière : elles protègent les yeux de la praticienne d'une projection de sang ou de pigment ; elles sont particulièrement utiles lors du nettoyage du matériel et des surfaces.</li>
</ul>

<h3>Étape 5 – L'hygiène des mains</h3>
<p>L'hygiène des mains est le geste le plus efficace contre la transmission des germes. Deux techniques sont utilisées :</p>
<table border="1" cellpadding="6">
<tr><th>Technique</th><th>Quand</th><th>Comment</th></tr>
<tr><td>Lavage au savon liquide et à l'eau</td><td>Mains visiblement sales ou souillées, en début de journée, après être allée aux toilettes, après un contact avec du sang si les mains n'étaient pas protégées</td><td>Mouiller, savonner en frottant toutes les surfaces (paumes, dos, entre les doigts, pouces, bout des doigts et ongles, poignets), rincer, sécher avec un essuie-mains à usage unique, fermer le robinet sans recontaminer les mains</td></tr>
<tr><td>Friction hydroalcoolique</td><td>Avant et après tout contact avec la cliente, avant d'enfiler des gants, après les avoir retirés, avant de toucher du matériel stérile, entre deux étapes</td><td>Sur des mains sèches et non souillées, déposer une dose suffisante, frictionner toutes les surfaces dans le même ordre que pour le lavage, jusqu'à séchage complet, sans essuyer</td></tr>
</table>
<p>La friction hydroalcoolique ne remplace pas le lavage lorsque les mains sont visiblement sales : l'alcool n'agit pas correctement sur une peau souillée. À l'inverse, elle est plus rapide et mieux tolérée que des lavages répétés et constitue la technique de référence entre les étapes d'une prestation.</p>

<h3>Les gants : bien les mettre, bien les changer, bien les retirer</h3>
<p>Les gants protègent à la fois la cliente et la praticienne, mais ils ne protègent que s'ils sont utilisés correctement. Un gant contaminé transporte les germes exactement comme une main nue.</p>
<ul>
<li><strong>Enfilage</strong> : sur des mains sèches, après friction hydroalcoolique ; prendre le gant par le poignet, sans toucher la surface des doigts du gant suivant.</li>
<li><strong>Changement</strong> obligatoire : entre la préparation (démaquillage, dessin) et l'effraction ; dès qu'un gant touche un objet non protégé (téléphone, tiroir, cheveux, visage de la praticienne, fiche papier, crayon non réservé) ; en cas de perforation ou de déchirure ; entre deux clientes, bien sûr.</li>
<li><strong>Retrait</strong> : pincer le premier gant à hauteur du poignet par l'extérieur et le retourner en le retirant ; le garder dans la main encore gantée ; glisser les doigts nus à l'intérieur du second gant, au poignet, et le retourner par-dessus le premier ; jeter les deux ensemble ; réaliser immédiatement une friction hydroalcoolique.</li>
<li><strong>Allergie</strong> : demander à la cliente, lors de l'entretien (C2), si elle est allergique au latex ; utiliser par défaut des gants sans latex évite le problème.</li>
</ul>
<p>Une astuce d'organisation pour limiter les changements inutiles : préparer tout ce qui est non stérile (fiche, photo, étiquette de lot à recopier, réglage de la lampe) avant de mettre les gants de l'effraction, ou faire appel à une tierce personne pour les manipulations hors champ.</p>

<h3>Étape 7 – Le champ stérile</h3>
<p>Le champ stérile est une surface de travail temporaire sur laquelle on dépose le matériel stérile de la prestation. Il est installé sur la desserte préalablement désinfectée :</p>
<ol>
<li>vérifier l'emballage du champ (intact, sec, non périmé) ;</li>
<li>ouvrir l'emballage en écartant les rabats vers l'extérieur, sans toucher l'intérieur ;</li>
<li>saisir le champ par ses coins, le déplier sans qu'il touche les vêtements ou une surface non désinfectée, et le déposer sur la desserte ;</li>
<li>considérer comme non stériles les bords du champ qui pendent au-delà de la desserte ;</li>
<li>ne plus passer la main ou un objet non stérile au-dessus du champ.</li>
</ol>

<h3>Étape 8 – Ouvrir les emballages stériles devant la cliente</h3>
<p>Ouvrir l'aiguille, la cartouche ou la lame <strong>devant la cliente</strong> est à la fois une règle d'hygiène et un geste de confiance. La cliente voit que le matériel est neuf, emballé et intact, et qu'il a été ouvert pour elle.</p>
<ol>
<li>Présenter l'emballage à la cliente en le nommant : « Voici l'aiguille que je vais utiliser pour vous ; elle est stérile, à usage unique, l'emballage est intact et je l'ouvre maintenant. »</li>
<li>Vérifier une dernière fois l'intégrité de l'emballage et la date de péremption.</li>
<li>Relever le numéro de lot (ou détacher l'étiquette de traçabilité si l'emballage en comporte une) avant d'ouvrir, pour ne pas avoir à toucher l'emballage ensuite.</li>
<li>Ouvrir selon le sens indiqué (pelage des deux films) et faire glisser le contenu sur le champ stérile, ou le présenter pour qu'il soit saisi directement avec des gants propres, sans que l'extérieur de l'emballage touche le contenu.</li>
<li>Éliminer l'emballage vide dans la poubelle des déchets ménagers ou selon le tri prévu, hors du champ.</li>
</ol>
<p>Un emballage ouvert à l'avance, avant l'arrivée de la cliente, n'est plus un emballage stérile au moment de l'effraction : il est éliminé.</p>

<h3>La protection du dermographe</h3>
<p>Le corps du dermographe et son cordon ne peuvent pas être stérilisés entre deux clientes : ils sont donc <strong>protégés par une housse ou un manchon à usage unique</strong>, posé avant la prestation et retiré après, puis désinfectés selon la notice du fabricant. Avec les dermographes à cartouches, la cartouche à membrane limite le risque de remontée de liquides vers l'appareil, mais elle ne dispense pas de la protection du corps et du cordon.</p>
<ul>
<li>Housse adaptée à la forme de l'appareil, sans gêner la prise en main ni l'aération du moteur si la notice l'exige.</li>
<li>Cordon entièrement protégé (manchon) ou, à défaut, maintenu à distance de la zone et du champ.</li>
<li>Pédale ou boîtier de commande protégés par un film, ou commandés au pied pour éviter les manipulations.</li>
<li>Retrait des protections avec des gants, élimination, puis désinfection de l'appareil avec un produit compatible.</li>
</ul>

<h3>Étape 10 – L'antisepsie de la peau</h3>
<p>L'antisepsie réduit la quantité de germes présents sur la peau juste avant l'effraction. Elle intervient après le démaquillage et le nettoyage (une peau grasse ou maquillée empêche l'antiseptique d'agir) et après la validation du dessin préparatoire. Les règles générales :</p>
<ul>
<li>utiliser un <strong>antiseptique cutané</strong> adapté, en respectant sa notice, et pour les zones proches de l'œil ou des muqueuses un produit compatible avec ces zones (voir chapitre 5) ;</li>
<li>appliquer avec une <strong>compresse stérile</strong>, du centre de la zone vers la périphérie, sans revenir sur une zone déjà traitée avec la même compresse ;</li>
<li>respecter le <strong>temps de contact</strong> et le séchage indiqués par le fabricant ;</li>
<li>veiller à ne pas effacer le dessin préparatoire : on tamponne délicatement plutôt que de frotter, ou l'on choisit un crayon de dessin qui résiste à l'antiseptique ;</li>
<li>ne plus toucher la zone avec un objet non stérile après l'antisepsie.</li>
</ul>

<h3>Repérer et corriger une rupture d'asepsie</h3>
<table border="1" cellpadding="6">
<tr><th>Situation</th><th>Correction immédiate</th></tr>
<tr><td>La praticienne remet une mèche de cheveux en place avec ses gants</td><td>Retrait des gants, friction hydroalcoolique, nouvelle paire</td></tr>
<tr><td>Le téléphone sonne et la praticienne le décroche</td><td>Ne pas décrocher ; si cela a été fait, changement de gants avant de reprendre</td></tr>
<tr><td>Une aiguille stérile tombe sur le sol ou sur une surface non stérile</td><td>Élimination en collecteur, ouverture d'une nouvelle aiguille devant la cliente</td></tr>
<tr><td>La praticienne replonge une microbrossette utilisée dans le flacon de pigment</td><td>Le flacon est considéré comme contaminé ; on ne s'en sert plus pour les autres clientes ; rappel de la règle des godets individuels</td></tr>
<tr><td>Le cordon du dermographe non protégé frotte sur la zone</td><td>Arrêt, nouvelle antisepsie de la zone, protection du cordon</td></tr>
<tr><td>La cliente touche la zone avec ses doigts</td><td>Hygiène des mains de la cliente proposée, nouvelle antisepsie de la zone ; explication bienveillante de la consigne</td></tr>
</table>

<blockquote><strong>À retenir.</strong> La chaîne d'hygiène se déroule toujours dans le même ordre : tenue, désinfection des surfaces, protections, installation, hygiène des mains, préparation de la zone, champ stérile, ouverture des emballages devant la cliente, changement de gants, antisepsie, réalisation, élimination immédiate, remise en état et traçabilité. Les gants ne protègent que s'ils sont changés à chaque rupture d'asepsie. Le dermographe est protégé par des housses à usage unique. Toute rupture d'asepsie est corrigée sur-le-champ, sans négociation.</blockquote>
`,
      },
      {
        title: "4.5 – Désinfecter les surfaces, distinguer stérile et désinfecté, assurer la traçabilité",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Différencier nettoyage, désinfection, antisepsie et stérilisation, et savoir à quoi chaque opération s'applique.</li>
<li>Organiser l'entretien des surfaces entre chaque cliente et en fin de journée.</li>
<li>Appliquer la règle de l'usage unique et tenir une traçabilité exploitable des lots de pigments et d'aiguilles.</li>
</ul>

<h3>Quatre mots à ne pas confondre</h3>
<table border="1" cellpadding="6">
<tr><th>Opération</th><th>Définition simple</th><th>S'applique à</th><th>Exemple au poste</th></tr>
<tr><td>Nettoyage</td><td>Élimination des salissures visibles (poussière, traces de pigment, sang séché) par action mécanique et détergent</td><td>Surfaces, matériel</td><td>Essuyage de la desserte tachée de pigment</td></tr>
<tr><td>Désinfection</td><td>Réduction du nombre de micro-organismes sur une surface ou un objet inerte, au moyen d'un produit désinfectant, en respectant son temps de contact</td><td>Surfaces et objets inertes (fauteuil, desserte, lampe, dermographe)</td><td>Application d'un détergent-désinfectant sur le fauteuil entre deux clientes</td></tr>
<tr><td>Antisepsie</td><td>Réduction du nombre de micro-organismes sur un tissu vivant (peau, muqueuse), au moyen d'un antiseptique</td><td>Peau de la cliente, mains (avec les produits adaptés)</td><td>Application d'antiseptique sur le sourcil juste avant l'effraction</td></tr>
<tr><td>Stérilisation</td><td>Procédé validé qui élimine tous les micro-organismes, y compris les formes résistantes ; l'objet est stérile tant que son emballage reste intact</td><td>Matériel qui pénètre la peau</td><td>Aiguilles, cartouches et lames stérilisées par le fabricant et livrées sous emballage</td></tr>
</table>
<p>La règle qui en découle est simple : <strong>un objet désinfecté n'est pas stérile</strong>. On ne fait jamais pénétrer dans la peau un objet simplement désinfecté (par exemple une lame « passée à l'alcool »). Tout ce qui réalise l'effraction est stérile et à usage unique.</p>

<h3>Pourquoi privilégier l'usage unique</h3>
<p>Le traitement d'un instrument réutilisable par stérilisation suppose un local, un équipement, des procédures validées et des contrôles que peu d'instituts sont en mesure de garantir. Pour tout ce qui réalise l'effraction ou entre en contact avec la peau effractée et le pigment, le choix professionnel est donc l'<strong>usage unique</strong> :</p>
<ul>
<li>aiguilles, cartouches et lames : stériles, à usage unique, ouvertes devant la cliente et éliminées dans le collecteur ;</li>
<li>godets à pigment, microbrossettes, coton-tiges, compresses : à usage unique ;</li>
<li>manches de microblading : de préférence modèles entièrement à usage unique ;</li>
<li>housses et films : à usage unique, posés et retirés à chaque cliente.</li>
</ul>
<p>« Usage unique » signifie <strong>une cliente, une séance</strong>. Une cartouche qui a servi à la première séance ne se garde pas pour la retouche de la même cliente quelques semaines plus tard.</p>

<h3>La désinfection des surfaces : quand et comment</h3>
<table border="1" cellpadding="6">
<tr><th>Moment</th><th>Surfaces concernées</th><th>Méthode</th></tr>
<tr><td>Ouverture de la salle, avant la première cliente</td><td>Plans de travail, desserte, fauteuil, tabouret, lampe, poignées</td><td>Détergent-désinfectant, essuyage du plus propre au plus sale et du haut vers le bas, temps de contact respecté</td></tr>
<tr><td>Entre chaque cliente</td><td>Toutes les surfaces de la zone de réalisation et de préparation, y compris celles qui étaient protégées par une housse</td><td>Retrait des protections avec des gants, élimination, désinfection, pose de nouvelles protections</td></tr>
<tr><td>Après une projection de sang ou de pigment</td><td>Surface souillée</td><td>Absorber avec un essuie-tout à usage unique, éliminer selon le tri, nettoyer puis désinfecter</td></tr>
<tr><td>En fin de journée</td><td>Ensemble de la salle, sol compris, point d'eau, poubelles</td><td>Nettoyage et désinfection complets, vidage des poubelles, contrôle du collecteur</td></tr>
<tr><td>Selon un rythme défini (hebdomadaire par exemple)</td><td>Intérieur des meubles de stockage, murs autour de la zone de réalisation</td><td>Nettoyage approfondi, contrôle des stocks</td></tr>
</table>
<p>Quelques règles de bon usage des produits :</p>
<ul>
<li>utiliser le produit conformément à son étiquette (dilution, temps de contact, compatibilité avec les matériaux) ;</li>
<li>ne pas mélanger deux produits ;</li>
<li>préférer des lingettes ou des chiffons à usage unique imprégnés plutôt qu'une éponge réutilisée ;</li>
<li>porter des gants de ménage ou des gants à usage unique pour l'entretien ;</li>
<li>consigner l'entretien sur une fiche de suivi, utile en cas de contrôle et rassurante pour l'équipe.</li>
</ul>

<h3>La traçabilité des lots</h3>
<p>La traçabilité consiste à pouvoir retrouver, pour chaque prestation, quels produits ont été utilisés, et pour chaque produit, quelles clientes en ont bénéficié. Elle est indispensable pour trois raisons :</p>
<ul>
<li><strong>alerte sanitaire</strong> : si l'ANSM ou un fabricant signale un lot de pigment non conforme ou contaminé, la praticienne doit pouvoir identifier les clientes concernées et les informer ;</li>
<li><strong>réaction chez une cliente</strong> : en cas d'inflammation, d'allergie ou d'infection, le médecin pourra avoir besoin de connaître la composition du pigment et le lot de l'aiguille ;</li>
<li><strong>retouche et correction</strong> : connaître le pigment exact utilisé permet de reproduire ou de corriger la teinte à la séance suivante (voir chapitre 6).</li>
</ul>
<p>Chez Ligne & Teint, la fiche cliente comporte un encadré « Traçabilité » rempli à chaque séance :</p>
<table border="1" cellpadding="6">
<tr><th>Élément</th><th>Information relevée</th></tr>
<tr><td>Date de la séance</td><td>Première séance ou retouche</td></tr>
<tr><td>Zone traitée et technique</td><td>Exemple : sourcils, technique manuelle</td></tr>
<tr><td>Pigment(s)</td><td>Nom commercial, teinte, numéro de lot, date de péremption, proportions du mélange le cas échéant</td></tr>
<tr><td>Aiguille, cartouche ou lame</td><td>Référence (configuration), numéro de lot, date de péremption</td></tr>
<tr><td>Antiseptique</td><td>Produit et numéro de lot</td></tr>
<tr><td>Praticienne</td><td>Nom et signature</td></tr>
<tr><td>Observations</td><td>Réaction pendant la séance, saignement, sensibilité, consignes particulières</td></tr>
</table>
<p>La fiche cliente contient des données de santé : elle est soumise au RGPD (consentement, durée de conservation limitée et définie, sécurité des données, accès restreint). Elle est rangée dans un meuble fermé ou dans un logiciel sécurisé, jamais laissée sur la desserte à la vue des autres clientes.</p>

<blockquote><strong>À retenir.</strong> Nettoyer, désinfecter, antiseptiser et stériliser sont quatre opérations différentes. Un objet désinfecté n'est pas stérile : tout ce qui réalise l'effraction est stérile et à usage unique, pour une cliente et une séance. Les surfaces sont désinfectées entre chaque cliente, après toute projection et en fin de journée. Les numéros de lot des pigments, des aiguilles et de l'antiseptique sont relevés sur la fiche cliente, qui est protégée comme une donnée de santé.</blockquote>
`,
      },
      {
        title: "4.6 – Les déchets d'activités de soins à risques infectieux (DASRI)",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Identifier les déchets produits par une prestation et les classer correctement.</li>
<li>Utiliser les emballages adaptés : collecteur pour objets piquants-coupants, sacs ou cartons DASRI.</li>
<li>Organiser l'entreposage, la collecte et la traçabilité des DASRI : convention avec un prestataire et bordereaux de suivi.</li>
</ul>

<h3>Ce que dit le cadre</h3>
<p>Les articles <strong>R1335-1 et suivants</strong> du Code de la santé publique organisent l'élimination des déchets d'activités de soins à risques infectieux. Le producteur des déchets, c'est-à-dire ici la praticienne ou l'entreprise qui l'emploie, est responsable de leur élimination. Il ne peut pas s'en défaire dans les ordures ménagères : il doit les trier à la source, les conditionner dans des emballages adaptés, les entreposer dans de bonnes conditions et les confier à un prestataire de collecte et de traitement, avec une traçabilité écrite.</p>

<h3>Trier à la source : trois flux</h3>
<table border="1" cellpadding="6">
<tr><th>Flux</th><th>Exemples issus d'une prestation</th><th>Contenant</th></tr>
<tr><td>Objets piquants, coupants, tranchants</td><td>Aiguilles, cartouches, lames de microblading, tout objet qui a percé ou coupé la peau</td><td>Collecteur rigide spécifique, résistant à la perforation, avec fermeture provisoire et fermeture définitive</td></tr>
<tr><td>Autres DASRI (déchets mous)</td><td>Compresses imbibées de sang ou de lymphe, coton-tiges et microbrossettes souillés, godets contenant du pigment mélangé de sérosité, gants et protections souillés</td><td>Sac ou carton DASRI identifié, placé dans un support, fermé avant enlèvement</td></tr>
<tr><td>Déchets assimilés aux ordures ménagères</td><td>Emballages vides non souillés (films, cartons, notices), essuie-mains du lavage des mains, papier</td><td>Poubelle classique, sac ménager</td></tr>
</table>
<p>Deux erreurs sont fréquentes et doivent être évitées : jeter une compresse ensanglantée dans la poubelle ménagère (risque pour le personnel d'entretien et de collecte) et, à l'inverse, remplir les sacs DASRI d'emballages propres (coût inutile et saturation). Le tri se fait <strong>au moment du geste</strong>, à la source, et non après coup en fouillant une poubelle.</p>

<h3>Le collecteur pour objets piquants-coupants</h3>
<ul>
<li>Placé à portée de main de la praticienne, sur un support stable ou fixé, pour qu'elle puisse y déposer l'aiguille ou la lame immédiatement, sans se déplacer, d'une seule main.</li>
<li>Aucun recapuchonnage des aiguilles : c'est l'une des premières causes de piqûre accidentelle.</li>
<li>Ne jamais forcer pour faire entrer un objet ni secouer le collecteur, ne jamais y plonger la main.</li>
<li>Respecter le repère de remplissage : au-delà, le risque de piqûre augmente ; le collecteur est fermé définitivement et remplacé.</li>
<li>Fermeture provisoire entre deux usages, fermeture définitive avant l'entreposage.</li>
</ul>

<h3>Entreposer, faire collecter, tracer</h3>
<p>Une fois fermés, les emballages DASRI sont entreposés dans un endroit réservé, à l'écart de la zone de réalisation, de l'accueil et des denrées, à l'abri des intempéries et de l'accès du public, en attendant leur enlèvement. La fréquence d'enlèvement dépend de la quantité produite et est fixée par la réglementation et par la convention conclue avec le prestataire.</p>
<ul>
<li><strong>Convention</strong> : la praticienne passe une convention écrite avec un prestataire de collecte (ou utilise un dispositif de collecte proposé localement), qui précise les modalités d'enlèvement, les emballages fournis et le traitement des déchets.</li>
<li><strong>Bordereaux de suivi</strong> : chaque enlèvement donne lieu à un document de suivi, qui permet de prouver que les déchets ont bien été collectés et traités ; ces documents sont conservés et présentés en cas de contrôle.</li>
<li><strong>Classement</strong> : Nadia FERRAND range la convention, les bordereaux et les factures du prestataire dans un classeur « DASRI » rangé avec les documents réglementaires de la salle (déclaration à l'ARS, attestation de formation hygiène et salubrité, fiches techniques des produits).</li>
</ul>

<h3>Le chemin d'un déchet chez Ligne & Teint</h3>
<ol>
<li>Fin de l'effraction : la cartouche est déclipsée du dermographe au-dessus du collecteur et y tombe directement.</li>
<li>Les compresses souillées et les godets vont dans le sac DASRI placé sous la desserte.</li>
<li>Les gants sont retirés selon la technique du retournement et jetés dans le sac DASRI s'ils sont souillés de sang.</li>
<li>Les housses du dermographe et de la lampe sont retirées avec des gants propres et éliminées selon leur état.</li>
<li>Les emballages vides propres vont dans la poubelle ménagère.</li>
<li>En fin de journée, le sac DASRI est fermé et rejoint, avec le collecteur fermé si son repère est atteint, le local d'entreposage, en attendant l'enlèvement prévu par la convention.</li>
</ol>

<blockquote><strong>À retenir.</strong> La praticienne est responsable de l'élimination de ses DASRI (articles R1335-1 et suivants du CSP). Le tri se fait à la source en trois flux : piquants-coupants en collecteur rigide, déchets mous souillés en sac ou carton DASRI, déchets non souillés en poubelle ménagère. Pas de recapuchonnage, respect du repère de remplissage, entreposage réservé, convention avec un prestataire et bordereaux de suivi conservés.</blockquote>
`,
      },
      {
        title: "4.7 – Accident d'exposition au sang : prévenir et réagir",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Définir l'accident d'exposition au sang (AES) et en connaître les circonstances habituelles dans la pratique du maquillage semi-permanent.</li>
<li>Appliquer la conduite à tenir générale immédiatement après l'accident.</li>
<li>Mettre en place les mesures de prévention et l'affichage au poste.</li>
</ul>

<h3>Qu'est-ce qu'un accident d'exposition au sang ?</h3>
<p>On parle d'accident d'exposition au sang lorsqu'il y a un contact avec du sang ou un liquide biologique contenant du sang, soit par une <strong>effraction de la peau</strong> (piqûre avec une aiguille, coupure avec une lame), soit par une <strong>projection sur une muqueuse</strong> (œil, bouche) ou sur une <strong>peau lésée</strong> (plaie, eczéma, gerçure). Dans la pratique du maquillage semi-permanent, la praticienne est principalement exposée :</p>
<ul>
<li>en manipulant la cartouche ou l'aiguille après usage (retrait, transport jusqu'au collecteur) ;</li>
<li>en se piquant avec la lame de microblading lors du changement de lame ou du rangement ;</li>
<li>en heurtant un objet piquant mal éliminé laissé sur la desserte ;</li>
<li>lors d'un mouvement brusque de la cliente pendant l'effraction ;</li>
<li>en recevant une projection dans l'œil lors du nettoyage du matériel.</li>
</ul>

<h3>La conduite à tenir générale</h3>
<p>La rapidité de la réaction est essentielle. La conduite à tenir générale, à afficher dans la salle technique, est la suivante :</p>
<table border="1" cellpadding="6">
<tr><th>Étape</th><th>En cas de piqûre, coupure ou contact sur peau lésée</th><th>En cas de projection sur une muqueuse (œil, bouche)</th></tr>
<tr><td>1. Arrêter</td><td>Interrompre la prestation, retirer le matériel en sécurité et le déposer dans le collecteur</td><td>Interrompre la prestation</td></tr>
<tr><td>2. Nettoyer</td><td>Ne pas faire saigner ; nettoyer immédiatement la plaie à l'eau courante et au savon, puis rincer</td><td>Rincer abondamment à l'eau ou au sérum physiologique</td></tr>
<tr><td>3. Désinfecter</td><td>Appliquer un antiseptique sur la plaie en respectant le temps de contact</td><td>–</td></tr>
<tr><td>4. Consulter rapidement</td><td colspan="2">Consulter un médecin <strong>le plus rapidement possible</strong>, idéalement dans les heures qui suivent (service d'urgences ou dispositif de prise en charge des AES indiqué sur l'affiche) : le médecin évalue le risque et décide d'un éventuel traitement ou suivi</td></tr>
<tr><td>5. Informer et déclarer</td><td colspan="2">Recueillir les informations utiles (circonstances, matériel en cause) ; si la praticienne est salariée, déclarer l'accident à l'employeur selon les règles applicables aux accidents du travail ; une praticienne indépendante se renseigne auprès de son assurance et de son régime</td></tr>
</table>
<p>Ce cours donne la conduite à tenir générale. Les modalités précises (lieu de consultation le plus proche, numéros utiles) sont adaptées localement et inscrites sur l'affiche de la salle technique. La décision médicale ne relève en aucun cas de la praticienne.</p>
<p>La question de la cliente doit être abordée avec tact : le médecin peut avoir besoin d'informations sur la personne source. La praticienne explique la situation à la cliente avec calme et respect de la confidentialité, sans lui imposer quoi que ce soit ; c'est le médecin qui indiquera la démarche à suivre.</p>

<h3>Prévenir l'accident</h3>
<ul>
<li>Port de gants pendant toute la prestation et lors de la manipulation du matériel souillé.</li>
<li>Collecteur à portée de main, élimination <strong>immédiate</strong> de chaque objet piquant ou coupant après usage, par la personne qui l'a utilisé.</li>
<li>Jamais de recapuchonnage, jamais de transport d'une aiguille à la main d'un point à un autre de la salle.</li>
<li>Expliquer à la cliente, avant de commencer, qu'elle doit prévenir avant de bouger, éternuer ou tousser, et convenir d'un signal (lever la main).</li>
<li>Lunettes de protection pour le nettoyage du matériel.</li>
<li>Vaccination de la praticienne : à aborder avec son médecin traitant ou le médecin du travail, qui la conseillera selon son exposition.</li>
<li>Affichage de la conduite à tenir dans la salle technique, connu de toutes les personnes qui y travaillent.</li>
</ul>

<blockquote><strong>À retenir.</strong> Après une piqûre ou une coupure : ne pas faire saigner, nettoyer à l'eau et au savon, rincer, appliquer un antiseptique, puis consulter un médecin le plus rapidement possible. Après une projection sur une muqueuse : rincer abondamment, puis consulter. Prévenir vaut mieux : gants, collecteur à portée de main, pas de recapuchonnage, signal convenu avec la cliente, affichage de la conduite à tenir.</blockquote>
`,
      },
      {
        title: "4.8 – Ergonomie et posture de la praticienne",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Identifier les contraintes physiques propres au métier de dermopigmentiste.</li>
<li>Régler son poste (fauteuil, tabouret, desserte, lampe) pour travailler dans une posture protectrice.</li>
<li>Intégrer des pauses et des exercices simples dans l'organisation de la journée.</li>
</ul>

<h3>Un métier de précision, donc de postures maintenues</h3>
<p>Une prestation de maquillage semi-permanent demande une concentration et une précision élevées, en travaillant à quelques centimètres du visage de la cliente, souvent penchée en avant, la main dominante en appui, le regard fixé sur une petite zone. Ces conditions exposent la praticienne à des <strong>troubles musculo-squelettiques</strong> (nuque, épaules, dos, poignet et main dominante) et à une <strong>fatigue visuelle</strong>. Une praticienne qui a mal ou qui est fatiguée perd en précision : l'ergonomie est donc aussi une question de qualité du résultat et de sécurité de la cliente.</p>

<h3>Régler le poste avant de régler la machine</h3>
<table border="1" cellpadding="6">
<tr><th>Élément</th><th>Réglage recherché</th><th>Erreur à éviter</th></tr>
<tr><td>Hauteur du fauteuil de la cliente</td><td>La zone à traiter est à hauteur des coudes ou légèrement au-dessus, sans que la praticienne lève les épaules</td><td>Fauteuil trop bas, qui oblige à se pencher et à arrondir le dos</td></tr>
<tr><td>Inclinaison du dossier et appui-tête</td><td>Tête de la cliente stable, orientée vers la praticienne selon la zone (sourcils, lèvres, eye-liner)</td><td>Tête qui glisse ou bascule, obligeant la praticienne à se contorsionner</td></tr>
<tr><td>Tabouret de la praticienne</td><td>Pieds à plat, cuisses à l'horizontale ou légèrement inclinées vers le bas, dos soutenu, roulettes pour se déplacer autour de la tête</td><td>Assise trop haute ou trop basse, travail debout prolongé en torsion</td></tr>
<tr><td>Position de la praticienne</td><td>Placée dans l'axe de la zone, souvent à la tête de la cliente pour les sourcils et l'eye-liner, de côté pour les lèvres ; changement de côté plutôt que torsion</td><td>Rester du même côté et se tordre pour atteindre l'autre sourcil</td></tr>
<tr><td>Desserte</td><td>Du côté de la main dominante, à portée sans extension du bras ni rotation du tronc</td><td>Matériel posé derrière la praticienne</td></tr>
<tr><td>Lampe et loupe</td><td>Lumière sans ombre portée, loupe réglée à une distance qui évite de rapprocher la tête de la zone</td><td>Se pencher pour mieux voir faute d'éclairage suffisant</td></tr>
<tr><td>Dermographe et cordon</td><td>Appareil d'un poids et d'un diamètre adaptés à la main, cordon soutenu pour ne pas tirer sur le poignet</td><td>Serrer l'appareil trop fort, poignet cassé en flexion</td></tr>
</table>

<h3>Le geste : appui, poignet, respiration</h3>
<ul>
<li><strong>Prendre appui</strong> avec le bord de la main ou l'auriculaire sur le visage de la cliente (sur une zone protégée) ou sur un support, pour stabiliser le geste sans crisper l'épaule.</li>
<li><strong>Garder le poignet dans l'axe</strong> de l'avant-bras autant que possible ; c'est la cliente (tête tournée) ou la praticienne (déplacement du tabouret) qui s'adapte, pas le poignet.</li>
<li><strong>Tenir le dermographe sans serrer</strong> : une prise trop crispée fatigue la main et rend le trait irrégulier.</li>
<li><strong>Respirer</strong> normalement, ne pas bloquer sa respiration pendant le tracé.</li>
<li>La main non dominante assure la <strong>tension de la peau</strong> (voir chapitre 5) : elle doit pouvoir le faire sans que le bras soit en élévation prolongée.</li>
</ul>

<h3>Organiser la journée</h3>
<ul>
<li>Prévoir des <strong>temps de pause</strong> entre deux clientes : ils servent aussi à l'entretien de la salle et à la traçabilité, et évitent d'enchaîner dans la précipitation.</li>
<li>Pendant les prestations longues, s'accorder de courtes micro-pauses (relâcher les épaules, regarder au loin pour reposer les yeux), en prévenant la cliente.</li>
<li>Pratiquer quelques étirements simples de la nuque, des épaules, des poignets et des doigts entre les prestations.</li>
<li>Ne pas planifier plus de prestations que l'on peut réaliser avec la même précision du début à la fin de la journée.</li>
</ul>

<blockquote><strong>À retenir.</strong> L'ergonomie protège la praticienne et la qualité du résultat. On règle d'abord le fauteuil, le tabouret, la desserte et la lampe ; on change de côté plutôt que de se tordre ; on prend appui, on garde le poignet dans l'axe et on tient l'appareil sans le serrer ; on planifie des pauses. Une praticienne fatiguée ou douloureuse est moins précise.</blockquote>
`,
      },
      {
        title: "4.9 – Adapter le poste à une situation de handicap : la praticienne et la cliente",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Comprendre pourquoi le référentiel RS6459 intègre la situation de handicap dans la compétence C3, qu'il s'agisse de la praticienne ou de la cliente.</li>
<li>Repérer, dès la prise de rendez-vous, les besoins d'adaptation, sans préjugé et dans le respect de la personne.</li>
<li>Proposer des adaptations concrètes pour une mobilité réduite, l'usage d'un fauteuil roulant, une déficience visuelle ou auditive et des troubles anxieux.</li>
</ul>

<h3>Un principe : adapter l'environnement, pas exclure la personne</h3>
<p>La situation de handicap naît de la rencontre entre une personne et un environnement qui n'est pas adapté. Une marche à l'entrée, un fauteuil de soin non réglable, une consigne donnée uniquement à l'oral, un rendez-vous enchaîné sans temps d'explication peuvent suffire à rendre une prestation impossible ou risquée. La compétence C3 demande à la praticienne d'anticiper ces obstacles et de préparer un poste qui permette de travailler <strong>en sécurité, dans le respect de l'hygiène et de la dignité</strong> de chacun.</p>
<p>Quelques règles de posture professionnelle :</p>
<ul>
<li>s'adresser directement à la personne, et non à son accompagnant ;</li>
<li>demander plutôt que supposer : « De quoi avez-vous besoin pour être bien installée ? » ;</li>
<li>ne pas toucher ni déplacer une aide technique (fauteuil, canne, appareil auditif) sans l'accord de la personne ;</li>
<li>respecter la confidentialité : la situation de handicap n'est notée sur la fiche cliente que dans la mesure où elle est utile à la prestation, avec l'accord de la cliente ;</li>
<li>distinguer la situation de handicap des contre-indications médicales vues en C2 : le handicap n'est pas en soi une contre-indication ; en revanche, une pathologie associée ou un traitement peut nécessiter un avis médical préalable.</li>
</ul>

<h3>Repérer les besoins dès la prise de rendez-vous</h3>
<p>Chez Ligne & Teint, la prise de rendez-vous comporte désormais une question ouverte : « Avez-vous des besoins particuliers pour votre accueil ou votre installation ? » Cette question, posée à toutes les clientes, permet d'anticiper sans stigmatiser : accès de plain-pied, durée de rendez-vous allongée, présence d'un accompagnant, supports écrits en gros caractères, etc.</p>

<h3>Adaptations selon la situation de la cliente</h3>
<table border="1" cellpadding="6">
<tr><th>Situation</th><th>Points d'attention</th><th>Adaptations possibles du poste et de la prestation</th></tr>
<tr><td>Mobilité réduite (difficulté à marcher, à se lever, douleurs)</td><td>Transferts difficiles, station assise ou allongée prolongée inconfortable, risque de chute</td><td>Accès sans obstacle, fauteuil de soin réglable en hauteur et en inclinaison, aide au transfert seulement si la cliente la demande, coussins de positionnement protégés par une housse à usage unique, pauses prévues, rendez-vous plus long</td></tr>
<tr><td>Usage d'un fauteuil roulant</td><td>Largeur des passages, espace de rotation dans la salle, possibilité ou non de transfert, hauteur de travail</td><td>Libérer l'espace de circulation, décider avec la cliente si elle reste dans son fauteuil ou se transfère, adapter la hauteur de travail de la praticienne (tabouret, position debout), stabiliser la tête de la cliente, protéger le fauteuil personnel par une housse à usage unique si la prestation y est réalisée</td></tr>
<tr><td>Déficience visuelle</td><td>Difficulté à valider le dessin préparatoire sur une photo ou dans un miroir, à lire les documents et les consignes</td><td>Décrire précisément le dessin, utiliser un miroir grossissant ou une photo agrandie si la vision résiduelle le permet, documents en gros caractères ou lisibles par une aide technique, lecture à voix haute des documents à signer, temps de validation suffisant, accompagnant de confiance si la cliente le souhaite ; le consentement reste celui de la cliente</td></tr>
<tr><td>Déficience auditive</td><td>Masque qui empêche la lecture labiale, bruit du dermographe, consignes non entendues</td><td>Se placer face à la cliente pour les explications, masque retiré pendant les échanges hors prestation ou masque transparent si disponible, consignes écrites, signaux convenus pendant la prestation (toucher l'épaule avant de commencer, geste pour une pause), vérification de la compréhension des consignes post-prestation par écrit</td></tr>
<tr><td>Troubles anxieux, phobie des aiguilles, hypersensibilité sensorielle</td><td>Tension, mouvements brusques, difficulté à rester immobile, malaise possible</td><td>Rendez-vous de découverte de la salle, explication de chaque étape avant de la réaliser, matériel stérile ouvert devant la cliente mais sans l'exposer inutilement à sa vue, signal d'arrêt convenu, pauses, environnement calme, possibilité d'un accompagnant ; ne jamais minimiser la peur ; pour toute question de produit anesthésiant ou de traitement, renvoi vers le médecin ou le pharmacien</td></tr>
<tr><td>Troubles cognitifs ou difficultés de compréhension</td><td>Compréhension de l'information préalable et du consentement</td><td>Langage simple, supports illustrés, temps de réflexion ; si la capacité à consentir est en doute, ne pas réaliser la prestation tant que les conditions d'un consentement éclairé ne sont pas réunies</td></tr>
</table>

<h3>Adaptations selon la situation de la praticienne</h3>
<p>La praticienne elle-même peut être en situation de handicap, de façon permanente ou temporaire (douleur chronique, trouble musculo-squelettique, déficience visuelle corrigée, déficience auditive, fatigabilité). Le poste doit alors être pensé pour elle :</p>
<ul>
<li><strong>poste de travail réglable</strong> : tabouret ergonomique avec appui, fauteuil de cliente électrique pour éviter les efforts de réglage, desserte réglable ;</li>
<li><strong>aides visuelles</strong> : lampe-loupe de bonne qualité, éclairage renforcé, contrastes marqués sur la desserte (champ de couleur unie sur lequel le matériel se repère bien) ;</li>
<li><strong>déficience auditive</strong> : signaux visuels convenus avec la cliente, consignes écrites, information de la cliente en début de séance ;</li>
<li><strong>fatigabilité ou douleurs</strong> : planning allégé, prestations plus courtes, alternance des zones traitées dans la journée, pauses régulières ;</li>
<li><strong>accompagnement</strong> : les dispositifs d'accompagnement du handicap au travail (référent handicap, organismes spécialisés, médecin du travail pour les salariées) peuvent aider à financer ou à concevoir des aménagements.</li>
</ul>
<p>Pendant la formation et pour la certification, la fiche RS6459 prévoit que des <strong>aménagements de parcours et d'épreuves</strong> peuvent être mis en place pour les candidates en situation de handicap. La stagiaire concernée en parle dès le début de la formation au référent handicap de l'organisme.</p>

<h3>Le cas fictif de Mme Yasmine BELKACEM</h3>
<p>Mme Yasmine BELKACEM, 38 ans, utilise un fauteuil roulant manuel. Elle prend rendez-vous pour un embellissement des sourcils. Lors de l'appel, en réponse à la question sur les besoins particuliers, elle précise qu'elle peut effectuer un transfert avec appui sur un plan stable mais qu'elle préfère rester dans son fauteuil quand c'est possible, et qu'un appui-tête lui est nécessaire pour rester longtemps immobile.</p>
<p>Nadia FERRAND prépare la séance ainsi :</p>
<ol>
<li><strong>Accès</strong> : elle vérifie le trajet depuis l'entrée jusqu'à la salle technique (seuil, largeur de la porte, espace pour tourner) et déplace le meuble de stockage qui réduisait le passage.</li>
<li><strong>Entretien préalable (C1/C2)</strong> : il a lieu à une table accessible, à hauteur des yeux, Nadia assise face à la cliente. Les contre-indications sont recherchées comme pour toute cliente ; la situation de handicap n'en est pas une en soi.</li>
<li><strong>Choix de l'installation</strong> : avec Mme BELKACEM, elles conviennent d'un transfert sur le fauteuil de soin électrique, abaissé à la hauteur de l'assise du fauteuil roulant, réalisé par la cliente elle-même avec un appui stable ; Nadia se tient prête à l'aider uniquement à sa demande. Une alternative est prévue si la cliente se sent fatiguée ce jour-là : réalisation dans son propre fauteuil, avec un appui-tête amovible et une housse à usage unique sur le dossier.</li>
<li><strong>Hygiène</strong> : les commandes du fauteuil de soin sont protégées par un film à usage unique ; si la prestation se fait dans le fauteuil personnel, les surfaces en contact avec la zone de travail sont protégées par une housse à usage unique et le fauteuil n'est jamais désinfecté avec un produit agressif sans l'accord de la cliente.</li>
<li><strong>Ergonomie de la praticienne</strong> : Nadia ajuste la hauteur de son tabouret et de la desserte pour garder la zone à hauteur des coudes ; si la cliente reste dans son fauteuil, elle travaille debout avec un appui pour ne pas se pencher.</li>
<li><strong>Durée</strong> : un créneau plus long est réservé pour que le transfert, les pauses et les explications se fassent sans hâte.</li>
<li><strong>Sortie et consignes</strong> : les consignes post-prestation sont remises par écrit et expliquées ; le trajet de sortie reste dégagé.</li>
</ol>

<blockquote><strong>À retenir.</strong> La compétence C3 inclut l'adaptation du poste à la situation de handicap de la cliente ou de la praticienne. On demande plutôt que supposer, on s'adresse à la personne, on anticipe dès la prise de rendez-vous. Les adaptations portent sur l'accès, l'installation, la communication, la durée et l'ergonomie, sans jamais relâcher la chaîne d'hygiène. Le handicap n'est pas une contre-indication en soi ; seules les situations médicales relevées en C2 justifient un avis médical préalable.</blockquote>
`,
      },
      {
        title: "4.10 – Quiz de fin de chapitre",
        content: `
<p>Pour chaque question, une seule réponse est correcte. Le corrigé figure après chaque question.</p>

<h4>Question 1 – Quel texte fixe les bonnes pratiques d'hygiène et de salubrité pour la mise en œuvre des techniques de tatouage par effraction cutanée, y compris le maquillage permanent ?</h4>
<ol type="A">
<li>L'arrêté du 3 décembre 2008</li>
<li>L'arrêté du 11 mars 2009</li>
<li>Le règlement (UE) 2020/2081</li>
<li>L'article R1311-11 du Code de la santé publique</li>
</ol>
<p><strong>Réponse : B.</strong> L'arrêté du 11 mars 2009 porte sur les bonnes pratiques d'hygiène et de salubrité. L'arrêté du 3 décembre 2008 concerne l'information préalable des clients, le règlement 2020/2081 les substances dans les encres, et l'article R1311-11 la protection des mineurs.</p>

<h4>Question 2 – Parmi ces revêtements, lequel est compatible avec une salle technique ?</h4>
<ol type="A">
<li>Un tapis lavable posé sous le fauteuil</li>
<li>Une étagère en bois brut pour les pigments</li>
<li>Un sol continu et des murs lessivables autour de la zone de réalisation</li>
<li>Des rideaux en tissu pour créer une ambiance chaleureuse</li>
</ol>
<p><strong>Réponse : C.</strong> Les surfaces de la salle technique doivent être lisses et pouvoir être nettoyées et désinfectées. Les textiles et matériaux poreux retiennent poussière et micro-organismes.</p>

<h4>Question 3 – Quand l'emballage de l'aiguille stérile doit-il être ouvert ?</h4>
<ol type="A">
<li>Le matin, en préparant tous les postes de la journée</li>
<li>Avant l'arrivée de la cliente, pour gagner du temps</li>
<li>Devant la cliente, juste avant l'effraction, après vérification de l'intégrité et de la date de péremption</li>
<li>Après l'antisepsie, par la cliente elle-même</li>
</ol>
<p><strong>Réponse : C.</strong> L'ouverture devant la cliente garantit la stérilité au moment du geste et montre que le matériel est neuf. Un emballage ouvert à l'avance n'est plus considéré comme stérile.</p>

<h4>Question 4 – Une lame de microblading a été trempée dans un désinfectant. Peut-elle être utilisée sur une nouvelle cliente ?</h4>
<ol type="A">
<li>Oui, si le temps de contact du désinfectant a été respecté</li>
<li>Oui, si elle est ensuite passée à l'alcool</li>
<li>Non : un objet désinfecté n'est pas stérile, et la lame est à usage unique</li>
<li>Oui, s'il s'agit d'une retouche pour la même cliente</li>
</ol>
<p><strong>Réponse : C.</strong> Tout ce qui réalise l'effraction est stérile et à usage unique, pour une cliente et une séance. La désinfection ne rend pas un objet stérile.</p>

<h4>Question 5 – Dans quel cas le lavage des mains au savon est-il préférable à la friction hydroalcoolique ?</h4>
<ol type="A">
<li>Entre le dessin préparatoire et l'effraction</li>
<li>Lorsque les mains sont visiblement sales ou souillées</li>
<li>Avant d'enfiler une nouvelle paire de gants</li>
<li>Jamais, la friction suffit toujours</li>
</ol>
<p><strong>Réponse : B.</strong> La friction hydroalcoolique s'utilise sur des mains sèches et non souillées. Des mains visiblement sales doivent d'abord être lavées.</p>

<h4>Question 6 – Pendant l'effraction, la praticienne remet ses lunettes en place avec ses gants. Que doit-elle faire ?</h4>
<ol type="A">
<li>Continuer, le contact a été bref</li>
<li>Essuyer ses gants avec une compresse</li>
<li>Retirer ses gants, réaliser une friction hydroalcoolique et mettre une nouvelle paire</li>
<li>Passer de l'antiseptique sur ses gants</li>
</ol>
<p><strong>Réponse : C.</strong> Toute rupture d'asepsie est corrigée immédiatement par un changement de gants précédé d'une hygiène des mains.</p>

<h4>Question 7 – Où jeter une compresse imbibée de sang et de pigment ?</h4>
<ol type="A">
<li>Dans la poubelle ménagère, fermée en fin de journée</li>
<li>Dans le collecteur pour objets piquants-coupants</li>
<li>Dans le sac ou carton DASRI</li>
<li>Dans les toilettes</li>
</ol>
<p><strong>Réponse : C.</strong> Les déchets mous souillés sont des DASRI. Le collecteur rigide est réservé aux objets piquants, coupants ou tranchants.</p>

<h4>Question 8 – Quels documents prouvent une élimination conforme des DASRI ?</h4>
<ol type="A">
<li>Les factures d'achat des collecteurs</li>
<li>La convention avec le prestataire de collecte et les bordereaux de suivi</li>
<li>Une attestation sur l'honneur de la praticienne</li>
<li>Les photos de la poubelle</li>
</ol>
<p><strong>Réponse : B.</strong> La convention organise la collecte ; les bordereaux de suivi tracent chaque enlèvement. Ils sont conservés et présentés en cas de contrôle.</p>

<h4>Question 9 – La praticienne se pique avec une aiguille usagée. Quelle est la bonne conduite ?</h4>
<ol type="A">
<li>Faire saigner fortement la plaie, puis reprendre la prestation</li>
<li>Ne pas faire saigner, nettoyer à l'eau et au savon, rincer, appliquer un antiseptique, puis consulter un médecin le plus rapidement possible</li>
<li>Appliquer un pansement et attendre la fin de la journée pour voir si une rougeur apparaît</li>
<li>Demander à la cliente une analyse de sang avant toute démarche</li>
</ol>
<p><strong>Réponse : B.</strong> C'est la conduite à tenir générale en cas d'accident d'exposition au sang. La consultation rapide permet au médecin d'évaluer le risque et de décider de la suite. La praticienne n'impose rien à la cliente.</p>

<h4>Question 10 – Une cliente en fauteuil roulant prend rendez-vous. Quelle attitude correspond à la compétence C3 ?</h4>
<ol type="A">
<li>Lui proposer de venir accompagnée et s'adresser à l'accompagnant pour les explications</li>
<li>Considérer le handicap comme une contre-indication et refuser la prestation</li>
<li>Lui demander ses besoins, préparer l'accès et l'installation, prévoir un créneau adapté et maintenir toute la chaîne d'hygiène</li>
<li>La transférer d'autorité sur le fauteuil de soin pour gagner du temps</li>
</ol>
<p><strong>Réponse : C.</strong> On demande plutôt que supposer, on s'adresse à la personne et on adapte l'environnement. Le handicap n'est pas une contre-indication en soi, et l'hygiène n'est jamais relâchée.</p>
`,
      },
      {
        title: "4.11 – Cas pratique corrigé : préparer la salle technique pour Mme Yasmine BELKACEM",
        content: `
<h3>Contexte (fictif)</h3>
<p>L'Institut Ligne & Teint, à Argenteuil, ouvre son espace de dermopigmentation. Nadia FERRAND, gérante, a déclaré l'activité auprès du directeur général de l'ARS et détient son attestation de formation hygiène et salubrité. Elle vous confie, en tant que praticienne nouvellement formée, la préparation de la salle technique pour la première prestation de la semaine : un embellissement des sourcils pour Mme Yasmine BELKACEM, 38 ans, qui utilise un fauteuil roulant manuel. La veille, vous faites le tour de la cabine et relevez les constats suivants :</p>
<ul>
<li>un tapis décoratif est resté sous le fauteuil de soin ;</li>
<li>les pigments sont rangés sur une étagère ouverte près de la fenêtre, au soleil ;</li>
<li>deux cartouches stériles ont été sorties de leur carton et posées sur la desserte « pour gagner du temps » ; l'emballage de l'une d'elles est légèrement déchiré ;</li>
<li>un flacon d'antiseptique ne porte pas de date d'ouverture ;</li>
<li>le collecteur pour objets piquants-coupants est posé au sol, derrière le fauteuil, et son repère de remplissage est dépassé ;</li>
<li>un carton de stock bloque en partie la porte de la cabine ;</li>
<li>la fiche cliente type ne comporte aucun encadré de traçabilité ;</li>
<li>aucune affiche n'indique la conduite à tenir en cas d'accident d'exposition au sang ;</li>
<li>le classeur réglementaire ne contient pas de convention de collecte des DASRI.</li>
</ul>

<h3>Consigne</h3>
<ol>
<li>Pour chaque constat, indiquez le risque et l'action corrective.</li>
<li>Rédigez la séquence de la chaîne d'hygiène que vous appliquerez le jour de la prestation, de l'ouverture de la salle à la remise en état.</li>
<li>Décrivez les adaptations prévues pour Mme BELKACEM, en distinguant accès, installation, communication, hygiène et ergonomie.</li>
<li>Indiquez ce que vous noterez sur la fiche cliente au titre de la traçabilité.</li>
</ol>

<h3>Corrigé</h3>
<h4>1. Constats, risques et actions correctives</h4>
<table border="1" cellpadding="6">
<tr><th>Constat</th><th>Risque</th><th>Action corrective</th></tr>
<tr><td>Tapis sous le fauteuil</td><td>Surface non lessivable qui retient poussière et projections ; obstacle à la circulation d'un fauteuil roulant</td><td>Retrait définitif du tapis</td></tr>
<tr><td>Pigments sur étagère ouverte, au soleil</td><td>Altération possible des pigments (chaleur, lumière), dépôt de poussière sur les flacons</td><td>Rangement dans le meuble fermé, à l'abri de la lumière et de la chaleur, selon les conditions du fabricant ; contrôle de l'aspect et des dates des flacons concernés</td></tr>
<tr><td>Cartouches sorties à l'avance, emballage déchiré</td><td>Perte de stérilité ; ouverture non réalisée devant la cliente</td><td>Élimination de la cartouche à l'emballage déchiré ; retour de l'autre dans le stock fermé si son emballage est intact ; ouverture le jour J devant la cliente</td></tr>
<tr><td>Antiseptique sans date d'ouverture</td><td>Impossible de vérifier la durée d'utilisation après ouverture</td><td>Élimination du flacon par précaution ; ouverture d'un flacon neuf avec date notée</td></tr>
<tr><td>Collecteur au sol, derrière le fauteuil, repère dépassé</td><td>Piqûre en éliminant une aiguille (débordement), élimination différée et transport d'aiguilles dans la salle</td><td>Fermeture définitive et entreposage du collecteur plein ; nouveau collecteur fixé à portée de main, du côté de la main dominante, hors passage</td></tr>
<tr><td>Carton bloquant la porte</td><td>Accès impossible en fauteuil roulant ; obstacle en cas d'évacuation</td><td>Rangement du carton dans la réserve ; passage dégagé et vérifié</td></tr>
<tr><td>Fiche cliente sans traçabilité</td><td>Impossible de retrouver les lots en cas d'alerte ou de réaction</td><td>Ajout d'un encadré : pigments (nom, teinte, lot, péremption, mélange), aiguille ou lame (référence, lot), antiseptique, praticienne, observations</td></tr>
<tr><td>Pas d'affiche AES</td><td>Réaction tardive ou inadaptée après une piqûre</td><td>Affichage de la conduite à tenir générale et des coordonnées locales utiles dans la salle technique</td></tr>
<tr><td>Pas de convention DASRI</td><td>Élimination non conforme ; impossibilité de prouver la collecte</td><td>Signalement à Nadia FERRAND pour conclure une convention avec un prestataire de collecte avant la première prestation ; classement des futurs bordereaux de suivi</td></tr>
</table>

<h4>2. Séquence de la chaîne d'hygiène le jour de la prestation</h4>
<ol>
<li>Tenue propre, cheveux attachés, aucun bijou aux mains et poignets, ongles courts sans vernis ; masque et surblouse prêts.</li>
<li>Aération, puis nettoyage et désinfection du fauteuil, de la desserte, du tabouret, de la lampe et du plan de travail, temps de contact respecté.</li>
<li>Mise en place du drap d'examen, des films sur la lampe et les commandes du fauteuil, de la housse du dermographe et du manchon du cordon.</li>
<li>Préparation hors champ : fiche cliente, consentement, appareil photo, pigments sélectionnés (dates et lots vérifiés).</li>
<li>Accueil et installation de la cliente (voir point 3).</li>
<li>Hygiène des mains, gants d'examen ; démaquillage, nettoyage, dessin préparatoire et validation (chapitre 5).</li>
<li>Retrait des gants, friction hydroalcoolique ; ouverture du champ stérile sur la desserte désinfectée.</li>
<li>Présentation et ouverture devant la cliente de l'aiguille ou de la cartouche et des compresses stériles ; relevé des lots ; dépôt sur le champ ; pigment versé dans des godets à usage unique.</li>
<li>Friction hydroalcoolique, nouvelle paire de gants ; antisepsie de la zone avec une compresse stérile, du centre vers la périphérie, temps de contact respecté.</li>
<li>Réalisation, en ne touchant que la zone, le matériel de la prestation et le champ ; changement de gants à toute rupture d'asepsie.</li>
<li>Élimination immédiate de la cartouche en collecteur, des compresses et godets souillés en DASRI.</li>
<li>Soins immédiats et consignes post-prestation remises par écrit (C11).</li>
<li>Après le départ : retrait des protections avec des gants, tri des déchets, désinfection de toutes les surfaces, désinfection du dermographe selon la notice, renseignement de la traçabilité, hygiène des mains.</li>
</ol>

<h4>3. Adaptations prévues pour Mme BELKACEM</h4>
<table border="1" cellpadding="6">
<tr><th>Domaine</th><th>Adaptation</th></tr>
<tr><td>Accès</td><td>Trajet vérifié de l'entrée à la salle technique ; porte et espace de rotation dégagés ; carton et tapis retirés</td></tr>
<tr><td>Installation</td><td>Choix fait avec la cliente : transfert autonome sur le fauteuil de soin électrique abaissé à la hauteur de son assise, aide seulement si elle la demande ; alternative prévue dans son propre fauteuil avec appui-tête amovible ; coussins de positionnement protégés</td></tr>
<tr><td>Communication</td><td>Entretien face à face à hauteur des yeux ; explications adressées directement à la cliente ; signal convenu pour demander une pause</td></tr>
<tr><td>Durée</td><td>Créneau allongé pour le transfert, les pauses et les explications</td></tr>
<tr><td>Hygiène</td><td>Commandes du fauteuil électrique sous film à usage unique ; si la prestation a lieu dans le fauteuil personnel, housse à usage unique sur les surfaces proches de la zone, pas de produit agressif sur le fauteuil sans accord ; chaîne d'hygiène inchangée</td></tr>
<tr><td>Ergonomie de la praticienne</td><td>Hauteur du tabouret et de la desserte réajustée ; si la cliente reste dans son fauteuil, travail debout avec appui pour garder la zone à hauteur des coudes</td></tr>
<tr><td>Confidentialité</td><td>Seules les informations utiles à l'installation sont notées sur la fiche, avec l'accord de la cliente</td></tr>
</table>

<h4>4. Traçabilité notée sur la fiche cliente</h4>
<ul>
<li>Date de la séance (première séance), zone et technique.</li>
<li>Pigment(s) : nom commercial, teinte, numéro de lot, date de péremption, proportions du mélange.</li>
<li>Aiguille, cartouche ou lame : référence, numéro de lot, date de péremption.</li>
<li>Antiseptique : produit et numéro de lot.</li>
<li>Nom et signature de la praticienne ; observations (sensibilité, saignement, pauses).</li>
</ul>

<h4>Erreurs fréquentes relevées lors de la correction</h4>
<ul>
<li>Conserver la cartouche à l'emballage déchiré « parce qu'elle n'a pas servi ».</li>
<li>Vider une partie du collecteur plein dans un autre contenant pour le réutiliser.</li>
<li>Prévoir une housse sur le fauteuil personnel mais oublier les commandes du fauteuil de soin.</li>
<li>S'adresser à l'accompagnant plutôt qu'à la cliente.</li>
<li>Considérer l'usage d'un fauteuil roulant comme une contre-indication à la prestation.</li>
<li>Oublier le numéro de lot de l'antiseptique dans la traçabilité.</li>
</ul>

<blockquote><strong>À retenir.</strong> Préparer son poste, c'est anticiper : aménagement conforme, stocks contrôlés, collecteur à portée de main, affichages et documents réglementaires présents, traçabilité prête, accès et installation pensés pour la cliente. Le jour de la prestation, la chaîne d'hygiène se déroule intégralement, quelle que soit l'adaptation retenue.</blockquote>
`,
      },
    ],
  },
  {
    title: "Chapitre 5 – Préparer la zone à traiter (C4)",
    description:
      "Préparer la zone avant toute effraction : démaquillage et nettoyage, antisepsie adaptée à la zone, mesure et symétrie (compas, fil de mesure, règle), dessin préparatoire au crayon, mapping des sourcils, tracé de l'eye-liner et des lèvres, répartition des taches de rousseur, validation écrite et photographique par la cliente, position, tension de la peau et confort sans produit anesthésiant relevant du médicament. Erreurs fréquentes et cas pratique corrigé : la préparation des sourcils de Mme Laura VIDAL à l'Institut Ligne & Teint (fictif). Séquence traitée le jour 1 de la formation. Compétence C4 du référentiel RS6459.",
    sections: [
      {
        title: "5.1 – La préparation de la zone : une étape qui décide du résultat",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Situer la compétence C4 dans le déroulé d'une prestation et comprendre son poids dans le résultat final.</li>
<li>Connaître les étapes de la préparation de la zone et leur ordre.</li>
<li>Comprendre pourquoi aucune effraction n'a lieu sans validation préalable par la cliente.</li>
</ul>

<h3>Le libellé officiel</h3>
<p>La fiche RS6459 formule ainsi la quatrième compétence : <strong>« C4 – Préparer la zone à traiter (sourcils, eye-liner, lèvres, taches de rousseur…) »</strong>. Derrière ce libellé court se trouve une étape décisive : le maquillage semi-permanent est durable, il s'atténue progressivement sur plusieurs années mais ne s'efface pas d'un geste. Une erreur de dessin, une asymétrie non vue, une forme non validée deviennent une erreur visible sur le visage de la cliente pendant longtemps, et parfois une correction difficile. La règle professionnelle qui en découle est que <strong>l'effraction n'est que la reproduction fidèle d'un dessin préparé, mesuré et accepté</strong>.</p>

<h3>Les étapes, dans l'ordre</h3>
<table border="1" cellpadding="6">
<tr><th>Étape</th><th>But</th><th>Section du chapitre</th></tr>
<tr><td>1. Vérifications préalables</td><td>Fiche cliente complète, contre-indications recherchées (C2), consentement éclairé signé, photos avant</td><td>5.1</td></tr>
<tr><td>2. Installation et position de la cliente</td><td>Confort, stabilité de la tête, éclairage</td><td>5.8</td></tr>
<tr><td>3. Démaquillage et nettoyage</td><td>Supprimer maquillage, sébum, résidus de soins</td><td>5.2</td></tr>
<tr><td>4. Observation de la zone au naturel</td><td>Repérer asymétries, poils, cicatrices, ancien maquillage, état de la peau</td><td>5.2</td></tr>
<tr><td>5. Mesure et symétrie</td><td>Établir les repères objectifs à partir de la morphologie</td><td>5.3</td></tr>
<tr><td>6. Dessin préparatoire</td><td>Matérialiser la forme et l'épaisseur visées</td><td>5.4 à 5.7</td></tr>
<tr><td>7. Validation par la cliente</td><td>Accord écrit et photographique avant toute effraction</td><td>5.8</td></tr>
<tr><td>8. Antisepsie adaptée à la zone</td><td>Réduire les germes juste avant l'effraction, sans effacer le dessin</td><td>5.2</td></tr>
<tr><td>9. Tension de la peau et confort</td><td>Permettre une effraction régulière et une prestation sereine</td><td>5.9</td></tr>
</table>

<h3>Les vérifications qui précèdent tout</h3>
<p>Avant de toucher la zone, la praticienne vérifie que les étapes des compétences C1 et C2 ont bien été réalisées et documentées :</p>
<ul>
<li>la fiche cliente est complète et à jour, y compris pour une cliente déjà venue (un traitement a pu commencer depuis la dernière séance) ;</li>
<li>les contre-indications et précautions ont été recherchées ; en cas de grossesse, d'allaitement, de traitement anticoagulant, de diabète non équilibré, de troubles de la cicatrisation, d'affection cutanée active sur la zone, d'antécédents d'herpès labial pour les lèvres, de traitement par isotrétinoïne, de chimiothérapie ou radiothérapie en cours, d'allergies connues, d'injections esthétiques récentes sur la zone, d'infection oculaire ou de chirurgie récente des yeux pour l'eye-liner, l'avis médical préalable a été obtenu ;</li>
<li>l'information préalable sur les risques et les précautions après la réalisation a été remise (arrêté du 3 décembre 2008) et le consentement éclairé a été signé ;</li>
<li>pour une personne mineure, le consentement écrit d'une personne titulaire de l'autorité parentale ou du tuteur est présent (R1311-11) ;</li>
<li>l'autorisation écrite relative aux photos (droit à l'image) a été recueillie si les photos doivent servir au-delà du dossier de la cliente.</li>
</ul>
<p>Si l'un de ces éléments manque, la préparation de la zone ne commence pas : on complète d'abord le dossier, ou l'on reporte la prestation.</p>

<h3>Le fil rouge du chapitre</h3>
<p>Mme Laura VIDAL, 34 ans, phototype II, sous-ton froid, se présente à l'Institut Ligne & Teint (fictif) pour ses sourcils. Des années d'épilation excessive les ont rendus clairsemés et asymétriques : le sourcil gauche est plus court et son arche est plus haute que celle du droit. Elle souhaite un effet naturel ; la technique retenue lors de l'entretien est la technique manuelle (microblading), qui dessine des traits imitant le poil. Nous suivrons pas à pas la préparation de ses sourcils jusqu'au cas pratique final.</p>

<blockquote><strong>À retenir.</strong> La préparation de la zone (C4) commence par la vérification du dossier (fiche, contre-indications, information, consentement) et se termine par la validation du dessin par la cliente puis l'antisepsie. L'effraction ne fait que reproduire un dessin mesuré et accepté : aucune effraction sans validation préalable.</blockquote>
`,
      },
      {
        title: "5.2 – Démaquiller, nettoyer, observer et réaliser l'antisepsie adaptée à la zone",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Démaquiller et nettoyer la zone avec des produits et un matériel adaptés.</li>
<li>Observer la zone au naturel et consigner les éléments utiles.</li>
<li>Choisir et appliquer une antisepsie compatible avec la zone, au bon moment, sans effacer le dessin.</li>
</ul>

<h3>Démaquiller et nettoyer</h3>
<p>Le démaquillage supprime le maquillage, le sébum, les résidus de crème solaire ou de soin qui empêcheraient le dessin de tenir, l'antiseptique d'agir et le pigment de pénétrer régulièrement. Il est réalisé avec des gants d'examen, après hygiène des mains, avec des produits doux, sans parfum ajouté de préférence, et un matériel à usage unique.</p>
<table border="1" cellpadding="6">
<tr><th>Zone</th><th>Points d'attention</th></tr>
<tr><td>Sourcils</td><td>Retirer poudre, gel teinté, crayon ; nettoyer jusqu'à la racine des poils ; dégraisser la peau (les peaux grasses de la zone médiane du visage retiennent mal le dessin)</td></tr>
<tr><td>Eye-liner</td><td>Démaquillant adapté au contour de l'œil ; retrait du mascara et de tout résidu au ras des cils ; les lentilles de contact sont retirées avant la prestation (la cliente apporte son étui et ses lunettes)</td></tr>
<tr><td>Lèvres</td><td>Retrait du rouge à lèvres, y compris des formules longue tenue ; retrait des baumes gras ; observer le contour naturel une fois la lèvre propre</td></tr>
<tr><td>Taches de rousseur</td><td>Retrait du fond de teint et de la poudre sur toute la zone concernée (nez, pommettes), pour voir les taches naturelles existantes</td></tr>
</table>
<p>On n'utilise ni gommage ni produit agressif juste avant la prestation : une peau irritée saigne davantage et retient moins bien le pigment.</p>

<h3>Observer la zone au naturel</h3>
<p>Une fois la zone propre, la praticienne observe, sous un bon éclairage, et note sur la fiche ce qui conditionnera le dessin et la technique :</p>
<ul>
<li><strong>la peau</strong> : grain, épaisseur apparente, caractère gras ou sec, pores dilatés, rougeurs, sensibilité (ces éléments ont été évalués en C2 et sont confirmés ici) ;</li>
<li><strong>les asymétries</strong> : hauteur des sourcils, des yeux, des commissures, différence de mobilité d'un côté à l'autre (la plupart des visages sont asymétriques) ;</li>
<li><strong>les poils et les cils</strong> : densité, direction de pousse, couleur, zones vides ;</li>
<li><strong>les cicatrices</strong> et irrégularités : une cicatrice peut mal retenir le pigment ou le faire diffuser ;</li>
<li><strong>un ancien maquillage semi-permanent ou permanent</strong> : forme, couleur, éventuel virage (voir chapitre 6) ; il conditionne la faisabilité, la correction colorimétrique et parfois l'orientation vers une autre solution ;</li>
<li><strong>la mobilité</strong> : on demande à la cliente de lever les sourcils, de sourire, de fermer les yeux, pour voir comment la zone bouge.</li>
</ul>
<p>Des photos « avant » sont prises dans des conditions reproductibles (même éclairage, même distance, de face et de trois quarts), pour le dossier de la cliente et la comparaison lors de la retouche.</p>

<h3>L'antisepsie adaptée à la zone</h3>
<p>L'antisepsie vient <strong>après la validation du dessin</strong> et juste avant l'effraction, avec une compresse stérile, du centre vers la périphérie, en respectant le temps de contact du produit (voir chapitre 4). Le choix du produit dépend de la zone :</p>
<table border="1" cellpadding="6">
<tr><th>Zone</th><th>Exigence</th><th>Précautions</th></tr>
<tr><td>Sourcils, pommettes, nez</td><td>Antiseptique cutané adapté à la peau du visage, utilisé selon sa notice</td><td>Tamponner sans frotter pour préserver le dessin ; protéger les yeux de tout écoulement</td></tr>
<tr><td>Contour de l'œil (eye-liner)</td><td>Produit compatible avec la proximité de l'œil et des muqueuses, conformément à sa notice</td><td>Compresse à peine humide, jamais d'écoulement vers l'œil ; yeux fermés ; en cas de contact avec l'œil, rinçage abondant</td></tr>
<tr><td>Lèvres</td><td>Produit compatible avec les muqueuses et la demi-muqueuse des lèvres, conformément à sa notice</td><td>Éviter l'intérieur de la bouche ; ne pas effacer le tracé du contour</td></tr>
</table>
<p>La praticienne ne choisit pas un produit « au hasard » parce qu'il est disponible : elle vérifie sur la notice que l'usage prévu correspond à la zone. En cas d'allergie connue de la cliente à un antiseptique, signalée en C2, un autre produit adapté est retenu.</p>

<h3>Dessin et antisepsie : concilier les deux</h3>
<p>Le dessin préparatoire doit survivre à l'antisepsie. Plusieurs solutions existent : utiliser un crayon de dessin résistant, laisser sécher le dessin avant l'antisepsie, tamponner délicatement plutôt qu'essuyer, ou, pour des zones larges, matérialiser les repères principaux (début, point le plus haut, fin) par de petits points qui résistent mieux qu'un tracé. Si le dessin s'efface partiellement, on le reprend et on le fait valider à nouveau avant toute effraction.</p>

<blockquote><strong>À retenir.</strong> Démaquillage et nettoyage doux, avec gants et matériel à usage unique, pour une peau propre et dégraissée. Observation au naturel et photos avant dans des conditions reproductibles. Antisepsie après validation du dessin, avec un produit dont la notice correspond à la zone (peau, contour de l'œil, lèvres), sans effacer le dessin.</blockquote>
`,
      },
      {
        title: "5.3 – Mesurer et établir la symétrie : compas, fil de mesure, règle",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Utiliser les instruments de mesure du dermopigmentiste en respectant l'hygiène.</li>
<li>Établir des repères objectifs à partir de la morphologie de la cliente.</li>
<li>Rechercher une harmonie visuelle plutôt qu'une symétrie mathématique impossible.</li>
</ul>

<h3>Pourquoi mesurer</h3>
<p>L'œil est trompeur : à force de regarder un côté puis l'autre, la praticienne s'habitue à une asymétrie ou en crée une. La mesure apporte des <strong>repères objectifs</strong> et permet d'expliquer à la cliente pourquoi une forme est proposée. Elle ne remplace pas le regard esthétique : un visage est rarement symétrique, et l'objectif est un résultat <strong>harmonieux</strong>, qui paraît équilibré lorsque le visage est au repos et en mouvement, et non deux formes identiques au millimètre posées sur des bases différentes.</p>

<h3>Les instruments</h3>
<table border="1" cellpadding="6">
<tr><th>Instrument</th><th>Usage</th><th>Hygiène</th></tr>
<tr><td>Fil de mesure (fil enduit de pigment de marquage)</td><td>Tracer des lignes droites de repère : axe médian, lignes horizontales de hauteur, lignes obliques de début, d'arche et de fin du sourcil</td><td>Usage unique : un fil par cliente, éliminé après usage</td></tr>
<tr><td>Compas de proportions (compas de sourcils)</td><td>Reporter une longueur d'un côté à l'autre, vérifier l'écart entre les têtes de sourcils, comparer les épaisseurs</td><td>Modèle à usage unique ou désinfecté entre chaque cliente selon la notice</td></tr>
<tr><td>Règle souple ou adhésive</td><td>Mesurer une longueur sur une surface courbe, poser une ligne de repère</td><td>Usage unique</td></tr>
<tr><td>Règle rigide ou baguette d'alignement</td><td>Visualiser un alignement (aile du nez, coin de l'œil, extrémité du sourcil)</td><td>Désinfectée entre chaque cliente ; elle ne touche pas une peau effractée</td></tr>
<tr><td>Crayon de dessin</td><td>Marquer les points et dessiner la forme</td><td>Taillé ou neuf pour chaque cliente, réservé à elle</td></tr>
</table>

<h3>Les repères morphologiques de base</h3>
<p>Quelle que soit la zone, on commence par établir l'<strong>axe médian</strong> du visage, ligne verticale passant par le milieu du front, l'arête du nez et le milieu de la bouche et du menton. Cet axe permet de vérifier que les deux côtés sont construits à distance égale. Viennent ensuite les repères propres à chaque zone :</p>
<ul>
<li>pour les <strong>sourcils</strong> : aile du nez, coin interne de l'œil, bord externe de l'iris en regard droit, coin externe de l'œil (section 5.5) ;</li>
<li>pour l'<strong>eye-liner</strong> : ligne de cils, coin interne et coin externe, prolongement de la ligne de la paupière inférieure (section 5.6) ;</li>
<li>pour les <strong>lèvres</strong> : arc de Cupidon, sommets de l'arc, commissures, proportion entre lèvre supérieure et lèvre inférieure (section 5.7) ;</li>
<li>pour les <strong>taches de rousseur</strong> : zone d'exposition naturelle au soleil (nez, pommettes), limites de la zone de répartition (section 5.7).</li>
</ul>

<h3>Méthode de mesure pas à pas</h3>
<ol>
<li>La cliente est assise ou semi-allongée, la tête droite, le regard à l'horizontale, visage détendu. Pour les repères d'alignement, on préfère une position assise et un regard droit : en position allongée, la peau se déplace légèrement vers l'arrière.</li>
<li>Tracer ou matérialiser l'axe médian.</li>
<li>Poser les repères horizontaux et obliques avec le fil de mesure, en s'appuyant sur les points morphologiques.</li>
<li>Reporter au compas les longueurs et écarts d'un côté sur l'autre ; noter les différences constatées.</li>
<li>Prendre du recul, regarder dans le miroir avec la cliente, en face et de trois quarts, visage au repos puis en mouvement (sourcils levés, sourire).</li>
<li>Ajuster : on corrige le repère qui crée l'asymétrie visible, en tenant compte de la mobilité du visage.</li>
</ol>

<h3>Symétrie et asymétrie : arbitrer</h3>
<p>Lorsque les os du visage, les yeux ou la musculature sont asymétriques, deux sourcils dessinés à l'identique peuvent paraître inégaux. La praticienne arbitre en fonction de l'effet visuel :</p>
<table border="1" cellpadding="6">
<tr><th>Constat</th><th>Approche possible</th></tr>
<tr><td>Un sourcil naturellement plus haut que l'autre</td><td>Rapprocher visuellement les hauteurs en travaillant le bord inférieur du sourcil le plus haut et le bord supérieur du plus bas, dans la limite de ce qui reste naturel</td></tr>
<tr><td>Un sourcil plus mobile (la cliente le lève davantage en parlant)</td><td>Vérifier le dessin au repos et en mouvement ; privilégier l'équilibre au repos, en évitant une arche trop haute du côté mobile</td></tr>
<tr><td>Yeux d'écartement ou de hauteur différents</td><td>Positionner les têtes de sourcils à égale distance de l'axe médian, puis adapter les queues à chaque œil</td></tr>
<tr><td>Commissures des lèvres à des hauteurs différentes</td><td>Construire le contour à partir de l'axe médian et de l'arc de Cupidon, harmoniser sans dépasser franchement la limite naturelle de la lèvre</td></tr>
</table>
<p>Ces arbitrages sont <strong>expliqués à la cliente</strong> : elle doit comprendre pourquoi un sourcil n'est pas « recopié » sur l'autre.</p>

<blockquote><strong>À retenir.</strong> La mesure (fil de mesure, compas, règle) donne des repères objectifs à partir de l'axe médian et des points morphologiques ; elle est réalisée visage droit, regard à l'horizontale, au repos puis en mouvement. L'objectif est l'harmonie visuelle, pas la symétrie mathématique. Les instruments en contact avec la peau sont à usage unique ou désinfectés, le crayon est réservé à la cliente.</blockquote>
`,
      },
      {
        title: "5.4 – Le dessin préparatoire au crayon : règles communes à toutes les zones",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Choisir le crayon et la technique de dessin adaptés.</li>
<li>Construire un dessin progressif, du repère à la forme définitive.</li>
<li>Faire du dessin un outil de dialogue avec la cliente.</li>
</ul>

<h3>Choisir le crayon</h3>
<ul>
<li>Un crayon de dessin de maquillage permanent, ou un crayon cosmétique, taillé finement ou neuf, réservé à la cliente.</li>
<li>Une couleur de dessin visible sur la peau mais proche de la teinte finale, pour que la cliente se projette ; on évite un trait très foncé qui effraie ou un trait trop clair qui ne permet pas de juger la forme.</li>
<li>Un crayon blanc ou très clair peut servir à « effacer » visuellement un bord ou à délimiter le pourtour, et des pâtes de dessin permettent de remplir la forme pour en juger la masse.</li>
</ul>

<h3>Construire le dessin en trois temps</h3>
<ol>
<li><strong>Les points de repère</strong> : début, point haut, fin pour un sourcil ; coins et point d'étirement pour un eye-liner ; arc de Cupidon et commissures pour les lèvres ; limites de zone pour des taches de rousseur.</li>
<li><strong>Les contours</strong> : relier les points par des traits fins, le bord inférieur puis le bord supérieur pour un sourcil, le contour de la lèvre supérieure puis de la lèvre inférieure.</li>
<li><strong>Le remplissage ou la simulation de l'effet</strong> : remplir légèrement la forme ou dessiner quelques traits de poils pour montrer l'effet final ; vérifier l'épaisseur et la densité.</li>
</ol>

<h3>Le dessin, support du dialogue</h3>
<p>Le dessin préparatoire n'est pas un geste technique réalisé en silence : c'est le moment où la cliente découvre ce que sera son nouveau regard ou sa nouvelle bouche. La praticienne :</p>
<ul>
<li>explique chaque repère et pourquoi elle le place à cet endroit ;</li>
<li>montre le résultat dans un miroir, de face et de trois quarts, à distance de conversation ;</li>
<li>accepte les ajustements raisonnables demandés par la cliente, mais conseille fermement lorsqu'une demande produirait un résultat disproportionné, non naturel ou difficile à corriger ;</li>
<li>rappelle que le résultat cicatrisé sera, en général, plus doux et plus fin que l'aspect immédiat après la prestation, et qu'une retouche est prévue après cicatrisation complète ;</li>
<li>sait proposer de prendre du temps : une cliente hésitante peut repartir avec une photo du dessin et revenir ; mieux vaut une prestation reportée qu'une forme regrettée.</li>
</ul>

<h3>Retoucher le dessin proprement</h3>
<p>Pour corriger un trait, on efface localement avec un coton-tige ou une microbrossette à usage unique légèrement humidifié, sans frotter toute la zone. Un nouvel outil est utilisé à chaque fois : on ne remet jamais un coton-tige utilisé dans un produit. Après plusieurs corrections, si la peau rougit, on laisse reposer quelques instants avant de poursuivre.</p>

<blockquote><strong>À retenir.</strong> Le dessin se construit du repère au contour puis au remplissage, avec un crayon fin, réservé à la cliente, d'une couleur proche du résultat. Il sert de support au dialogue : la praticienne explique, montre, ajuste, conseille et accepte de reporter si la cliente hésite.</blockquote>
`,
      },
      {
        title: "5.5 – Le mapping des sourcils : point de départ, arche et queue",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Positionner les trois points clés du sourcil à partir de la morphologie.</li>
<li>Déterminer l'épaisseur, la forme de la tête et l'orientation des poils.</li>
<li>Adapter le mapping au visage, à l'âge, aux poils existants et à la technique retenue.</li>
</ul>

<h3>Les trois points clés</h3>
<p>Le mapping (cartographie) des sourcils consiste à placer des repères à partir de lignes passant par des points fixes du visage. La méthode la plus répandue s'appuie sur l'aile du nez :</p>
<table border="1" cellpadding="6">
<tr><th>Point</th><th>Construction classique</th><th>Ajustements fréquents</th></tr>
<tr><td>Point de départ (tête du sourcil)</td><td>Ligne verticale partant de l'aile du nez et passant par le coin interne de l'œil</td><td>Rapprocher légèrement pour des yeux écartés, éloigner pour des yeux rapprochés ; vérifier l'écart égal de chaque tête par rapport à l'axe médian</td></tr>
<tr><td>Arche (point le plus haut)</td><td>Ligne oblique partant de l'aile du nez et passant par le bord externe de l'iris, regard droit devant</td><td>Arche plus douce pour un visage anguleux ou une paupière tombante, plus marquée pour un visage rond ; éviter une arche haute qui donne un air surpris</td></tr>
<tr><td>Queue (extrémité)</td><td>Ligne oblique partant de l'aile du nez et passant par le coin externe de l'œil</td><td>Ne pas descendre la queue sous le niveau de la tête (regard triste) ; la raccourcir légèrement si la paupière est tombante pour ne pas accentuer la descente</td></tr>
</table>
<p>Ces lignes sont des <strong>points de départ</strong>, pas un gabarit universel. Elles sont ensuite confrontées au regard global, aux poils naturels et aux souhaits de la cliente.</p>

<h3>Le reste du dessin</h3>
<ul>
<li><strong>Bord inférieur</strong> : il structure le sourcil ; on le trace en premier, de la tête vers la queue, en respectant la ligne de l'os de l'arcade.</li>
<li><strong>Bord supérieur</strong> : il donne l'épaisseur ; il monte progressivement de la tête jusqu'à l'arche, puis rejoint le bord inférieur à la queue.</li>
<li><strong>Épaisseur</strong> : proportionnée au visage et aux poils existants ; un sourcil trop épais durcit le regard, un sourcil trop fin le vieillit ; on garde une marge prudente, car il est plus facile d'étoffer lors de la retouche que de réduire.</li>
<li><strong>Tête</strong> : plus légère et moins définie que le reste du sourcil pour un rendu naturel, surtout en technique électrique (dégradé) ; en technique manuelle, les traits de la tête sont plus verticaux.</li>
<li><strong>Orientation des poils</strong> : en technique manuelle, les traits suivent la direction naturelle de pousse, verticaux à la tête, puis de plus en plus obliques vers l'arche et la queue ; le dessin indique ces directions.</li>
</ul>

<h3>Adapter à la technique</h3>
<table border="1" cellpadding="6">
<tr><th>Technique</th><th>Ce que le dessin doit montrer</th></tr>
<tr><td>Technique manuelle (microblading)</td><td>Contour précis, directions de traits, densité souhaitée ; pertinente sur des peaux qui retiennent bien un trait fin ; à discuter pour des peaux très grasses où les traits peuvent diffuser</td></tr>
<tr><td>Technique électrique (microshading, poudré, ombré)</td><td>Contour, zone de dégradé (tête plus claire), intensité souhaitée</td></tr>
<tr><td>Technique combinée</td><td>Zones de traits (souvent la tête) et zones d'ombré (corps et queue)</td></tr>
</table>
<p>Le choix de la technique, du dermographe et des aiguilles est traité dans le chapitre consacré à la compétence C6 ; le dessin doit simplement être cohérent avec ce choix.</p>

<h3>Tenir compte des poils existants et de l'ancien maquillage</h3>
<ul>
<li>Les poils naturels situés hors de la forme validée peuvent être retirés, de préférence avant la séance pour éviter une irritation le jour même ; ceux situés dans la forme sont conservés.</li>
<li>Un ancien maquillage visible impose de tenir compte de sa forme : on ne peut pas dessiner un sourcil plus fin qu'une ancienne pigmentation encore marquée sans recourir à une autre solution ; sa couleur conditionne la correction colorimétrique (chapitre 6).</li>
</ul>

<h3>Application au cas de Mme Laura VIDAL</h3>
<p>Chez Mme VIDAL, le mapping fait apparaître : une tête gauche plus éloignée de l'axe médian que la droite, une arche gauche plus haute, une queue gauche plus courte. La praticienne propose de positionner les deux têtes à égale distance de l'axe, d'abaisser visuellement l'arche gauche en travaillant le bord inférieur sans monter le bord supérieur, et d'allonger la queue gauche jusqu'à la ligne passant par le coin externe de l'œil. Les traits suivront la direction de pousse observée sur les poils restants. La forme est volontairement naturelle et d'épaisseur moyenne, conformément à son souhait.</p>

<blockquote><strong>À retenir.</strong> Le mapping place la tête, l'arche et la queue à partir de lignes passant par l'aile du nez et le coin interne de l'œil, le bord externe de l'iris et le coin externe de l'œil. Ce sont des repères à ajuster au visage, à la mobilité, aux poils existants et à la technique. On trace le bord inférieur avant le bord supérieur, on reste prudent sur l'épaisseur, on garde une tête légère.</blockquote>
`,
      },
      {
        title: "5.6 – Le tracé de l'eye-liner : préparer une zone sensible",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Préparer la zone oculaire en sécurité et dans le confort de la cliente.</li>
<li>Tracer un eye-liner ras de cils, fin ou étiré adapté à la forme de l'œil.</li>
<li>Connaître les précautions propres à cette zone lors de la préparation.</li>
</ul>

<h3>Une zone qui exige des précautions particulières</h3>
<p>La peau de la paupière est fine, mobile et proche de l'œil. Les précautions commencent dès la préparation :</p>
<ul>
<li>les contre-indications propres à la zone ont été recherchées en C2 (infection oculaire, chirurgie récente des yeux, notamment) ; en cas de doute, avis médical préalable ;</li>
<li>les lentilles de contact sont retirées avant la prestation et ne sont pas remises immédiatement après ; la cliente vient avec ses lunettes ;</li>
<li>les extensions de cils et le mascara sont retirés ; une cliente qui porte des extensions est prévenue lors de la prise de rendez-vous ;</li>
<li>l'antiseptique est compatible avec le contour de l'œil, appliqué avec une compresse à peine humide, yeux fermés, sans écoulement ;</li>
<li>la lampe n'éblouit pas directement l'œil.</li>
</ul>

<h3>Les trois tracés de base</h3>
<table border="1" cellpadding="6">
<tr><th>Tracé</th><th>Description</th><th>Pour qui</th></tr>
<tr><td>Ras de cils (densification)</td><td>Pigment déposé entre et au ras des cils, sans trait visible au-delà ; donne une impression de cils plus denses</td><td>Clientes qui veulent un effet invisible, peaux matures, premières prestations</td></tr>
<tr><td>Trait fin</td><td>Fine ligne au-dessus de la ligne de cils, d'épaisseur régulière ou légèrement croissante vers l'extérieur</td><td>Clientes habituées à un trait léger</td></tr>
<tr><td>Trait étiré</td><td>Trait fin prolongé au-delà du coin externe par une petite pointe orientée vers le haut</td><td>Clientes qui portent habituellement un trait étiré et dont la paupière le permet</td></tr>
</table>

<h3>Construire le tracé</h3>
<ol>
<li>La cliente est assise, yeux ouverts, regard droit : on repère le coin interne, le coin externe et la direction du prolongement naturel de la ligne de la paupière inférieure.</li>
<li>Pour un trait étiré, on matérialise le point d'arrivée de la pointe sur le prolongement de cette ligne, orienté vers la queue du sourcil ; on vérifie que la pointe ne se perd pas dans un pli de la paupière lorsque l'œil est ouvert.</li>
<li>La cliente ferme les yeux : on dessine le trait au ras des cils, plus fin au coin interne et s'épaississant légèrement vers l'extérieur ; on relie à la pointe.</li>
<li>La cliente ouvre les yeux : on vérifie le rendu les yeux ouverts, de face, car une paupière tombante ou un pli marqué peuvent masquer ou briser le trait.</li>
<li>On compare les deux yeux, yeux ouverts, et on ajuste.</li>
</ol>

<h3>Adapter à la forme de l'œil</h3>
<table border="1" cellpadding="6">
<tr><th>Forme ou situation</th><th>Adaptation</th></tr>
<tr><td>Paupière tombante ou pli marqué</td><td>Privilégier le ras de cils ou un trait très fin ; la pointe éventuelle est tracée yeux ouverts pour rester visible</td></tr>
<tr><td>Yeux rapprochés</td><td>Commencer le trait un peu après le coin interne, l'étoffer vers l'extérieur</td></tr>
<tr><td>Yeux tombants (coin externe bas)</td><td>Orienter la pointe légèrement vers le haut pour remonter visuellement le regard</td></tr>
<tr><td>Peau mature, paupière fine</td><td>Ras de cils, sans pointe marquée, effet doux</td></tr>
<tr><td>Cliente porteuse de lentilles et presbyte (ex. : Mme Sophie MARCHAND, fil rouge)</td><td>Ras de cils ; validation dans un miroir grossissant ou sur photo agrandie, lunettes portées pour juger ; consignes sur les lentilles remises par écrit</td></tr>
</table>

<blockquote><strong>À retenir.</strong> L'eye-liner se prépare avec des précautions propres à l'œil : contre-indications vérifiées, lentilles et extensions retirées, antiseptique compatible avec le contour de l'œil sans écoulement, lampe non éblouissante. Le tracé (ras de cils, trait fin, trait étiré) se construit yeux fermés et se valide yeux ouverts.</blockquote>
`,
      },
      {
        title: "5.7 – Le tracé des lèvres et la répartition des taches de rousseur",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Tracer un contour de lèvres harmonieux à partir de l'arc de Cupidon et des commissures.</li>
<li>Répartir des taches de rousseur de façon naturelle et validée par la cliente.</li>
<li>Connaître les précautions de préparation propres à ces deux zones.</li>
</ul>

<h3>Les lèvres : repères et tracé</h3>
<p>Le contour des lèvres est délimité par une fine ligne de transition entre la peau et la demi-muqueuse, le vermillon. Le dessin s'appuie sur des repères précis :</p>
<table border="1" cellpadding="6">
<tr><th>Repère</th><th>Description</th><th>Point de vigilance</th></tr>
<tr><td>Arc de Cupidon</td><td>Creux central de la lèvre supérieure et ses deux sommets</td><td>Les deux sommets sont placés à égale distance de l'axe médian ; un arc trop pointu durcit, un arc effacé aplatit la bouche</td></tr>
<tr><td>Commissures</td><td>Points de jonction des lèvres supérieure et inférieure</td><td>On ne prolonge pas le contour au-delà des commissures, ce qui donnerait un sourire artificiel ; on vérifie leur hauteur respective</td></tr>
<tr><td>Point le plus bas de la lèvre inférieure</td><td>Centre du contour inférieur</td><td>Aligné sur l'axe médian ; courbe douce vers les commissures</td></tr>
<tr><td>Proportion des deux lèvres</td><td>Rapport entre la hauteur de la lèvre supérieure et celle de la lèvre inférieure</td><td>On respecte l'équilibre propre au visage ; on ne cherche pas à imposer un modèle unique</td></tr>
</table>
<ol>
<li>Lèvres propres et détendues, bouche fermée sans pincer.</li>
<li>Placer l'axe médian, puis les deux sommets de l'arc de Cupidon et le creux central.</li>
<li>Tracer le contour supérieur du sommet vers chaque commissure, puis le contour inférieur depuis le centre.</li>
<li>Vérifier bouche fermée, en souriant et en parlant ; ajuster.</li>
<li>Si un léger agrandissement est souhaité, il reste très limité et suit le contour naturel : un contour tracé franchement hors de la lèvre se voit, surtout en vieillissant, et se corrige difficilement.</li>
</ol>
<p>Précautions propres aux lèvres, déjà évoquées en C2 : en cas d'antécédents d'herpès labial, un avis médical est obtenu avant la prestation et un éventuel traitement préventif relève de la seule prescription du médecin ; les injections esthétiques récentes sur la zone sont signalées et font l'objet d'un avis médical. L'antiseptique utilisé est compatible avec les muqueuses.</p>
<p>Pour une cliente aux lèvres à pigmentation inégale et au contour flou, comme Mme Aïcha DIALLO (phototype V, fil rouge), la préparation comprend l'observation précise des zones plus foncées, qui conditionnera la neutralisation colorimétrique (chapitre 6), et un tracé de contour qui redonne de la netteté sans chercher à modifier la forme naturelle.</p>

<h3>Les taches de rousseur : une répartition naturelle</h3>
<p>Les taches de rousseur naturelles apparaissent sur les zones les plus exposées au soleil. Leur reproduction réussie tient à une impression de hasard, qui se construit en réalité avec méthode :</p>
<ul>
<li><strong>Zone</strong> : en général l'arête et les ailes du nez et le haut des pommettes, parfois le front ou le haut des joues ; on délimite la zone au crayon blanc ou par quelques points de repère.</li>
<li><strong>Densité</strong> : plus forte au centre de la zone (arête du nez, haut des pommettes), plus faible vers la périphérie, pour un fondu naturel.</li>
<li><strong>Taille et forme</strong> : variées, jamais toutes identiques ; de petits points de tailles différentes, certains légèrement irréguliers.</li>
<li><strong>Disposition</strong> : sans alignement ni motif géométrique ; on évite les rangées et les espacements réguliers ; quelques taches peuvent se toucher.</li>
<li><strong>Symétrie</strong> : la répartition est équilibrée entre les deux côtés du visage, sans être une copie en miroir.</li>
<li><strong>Taches existantes</strong> : on s'appuie sur les taches naturelles de la cliente pour prolonger leur logique.</li>
</ul>
<p>Le dessin des taches est réalisé au crayon, tache par tache, et regardé à distance de conversation. Pour Mme Clara NGUYEN (phototype III, fil rouge), qui souhaite un effet discret, la praticienne propose une zone limitée au nez et au haut des pommettes, une densité faible et des tailles variées mais petites, avec la possibilité d'en ajouter lors de la retouche plutôt que d'en mettre trop dès la première séance.</p>

<blockquote><strong>À retenir.</strong> Le contour des lèvres se construit à partir de l'axe médian, des sommets de l'arc de Cupidon et des commissures, sans dépasser franchement la limite naturelle ni prolonger les commissures. Les taches de rousseur se répartissent sur les zones naturellement exposées, plus denses au centre, de tailles variées, sans alignement, en restant prudent sur la quantité à la première séance.</blockquote>
`,
      },
      {
        title: "5.8 – Valider avec la cliente avant toute effraction et installer la cliente",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Recueillir une validation écrite et photographique du dessin avant toute effraction.</li>
<li>Installer la cliente dans une position adaptée à la zone, confortable et stable.</li>
<li>Savoir interrompre la préparation si la validation n'est pas obtenue.</li>
</ul>

<h3>La validation : un acte formel</h3>
<p>Le consentement éclairé, recueilli en C2, porte sur la prestation et ses risques. La validation du dessin porte sur <strong>le résultat visé</strong> : forme, épaisseur, emplacement, effet. Elle est formalisée pour protéger la cliente et la praticienne :</p>
<ol>
<li><strong>Présentation</strong> : la cliente se regarde dans un miroir, assise, sous un bon éclairage, de face et de trois quarts ; la praticienne reformule ce qui a été dessiné et pourquoi.</li>
<li><strong>Photo du dessin</strong> : une photo est prise, de face et de trois quarts, dans les conditions habituelles ; elle rejoint le dossier de la cliente (son usage au-delà du dossier suppose l'autorisation écrite relative au droit à l'image).</li>
<li><strong>Validation écrite</strong> : sur la fiche cliente, une mention du type « J'ai vu et j'accepte le dessin préparatoire présenté (forme, épaisseur, emplacement) avant la réalisation » suivie de la date et de la signature de la cliente.</li>
<li><strong>Rappel des limites</strong> : l'aspect immédiat est plus intense que le résultat cicatrisé ; la cicatrisation dure plusieurs semaines (environ 4 à 6) ; une retouche est prévue après cicatrisation complète ; la tenue est de plusieurs années avec une atténuation progressive, variable selon la peau, le soleil et les soins.</li>
</ol>
<p>Si la cliente hésite, demande des modifications répétées ou ne semble pas convaincue, la praticienne <strong>n'effectue pas l'effraction</strong>. Elle propose de modifier le dessin, de réfléchir, de revenir avec une photo de référence ou de reporter la séance. Une prestation réalisée sous la pression du planning est une source de réclamation et de regret.</p>

<h3>Installer la cliente</h3>
<p>La position est choisie selon la zone, pour que la cliente soit à l'aise et immobile et que la praticienne garde une posture correcte (chapitre 4) :</p>
<table border="1" cellpadding="6">
<tr><th>Zone</th><th>Position de la cliente</th><th>Position de la praticienne</th></tr>
<tr><td>Sourcils</td><td>Semi-allongée ou allongée, tête droite sur l'appui-tête, nuque soutenue</td><td>Assise à la tête de la cliente ou de côté, en changeant de côté pour chaque sourcil si nécessaire</td></tr>
<tr><td>Eye-liner</td><td>Allongée ou semi-allongée, tête bien calée, yeux fermés détendus</td><td>Assise à la tête de la cliente, main non dominante assurant une tension douce de la paupière</td></tr>
<tr><td>Lèvres</td><td>Semi-allongée, tête légèrement tournée selon le côté travaillé, bouche détendue</td><td>De côté, au niveau du visage, en changeant de côté pour chaque moitié de la bouche</td></tr>
<tr><td>Taches de rousseur</td><td>Semi-allongée, tête tournée selon la zone</td><td>De côté ou à la tête selon la zone</td></tr>
</table>
<ul>
<li>Vêtements et cheveux protégés (bandeau, charlotte ou serviette à usage unique), bijoux d'oreille retirés s'ils gênent.</li>
<li>Coussin sous les genoux ou les bras pour le confort des prestations longues, protégé par une housse.</li>
<li>Signal convenu pour demander une pause ou prévenir d'un éternuement.</li>
<li>Vérification que la cliente n'a ni froid ni chaud et qu'elle a pu aller aux toilettes avant de commencer.</li>
</ul>

<blockquote><strong>À retenir.</strong> Aucune effraction sans validation : le dessin est présenté au miroir, photographié et accepté par écrit, daté et signé par la cliente, avec un rappel de l'aspect cicatrisé et de la retouche. En cas d'hésitation, on modifie ou on reporte. L'installation dépend de la zone et vise immobilité, confort et bonne posture de la praticienne.</blockquote>
`,
      },
      {
        title: "5.9 – Tension de la peau, confort de la cliente et erreurs fréquentes",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Assurer une tension de la peau adaptée à chaque zone.</li>
<li>Gérer le confort et l'appréhension de la cliente sans recourir à un produit anesthésiant relevant du médicament.</li>
<li>Identifier et éviter les erreurs fréquentes de préparation.</li>
</ul>

<h3>La tension de la peau</h3>
<p>Une peau tendue offre une surface régulière à l'aiguille ou à la lame : le pigment est déposé de façon homogène, à la bonne profondeur, et le trait ne dévie pas. Une peau détendue se creuse sous l'aiguille, le dépôt devient irrégulier et le risque d'aller trop profond augmente (migration, flou, virage bleuté).</p>
<table border="1" cellpadding="6">
<tr><th>Zone</th><th>Tension recherchée</th></tr>
<tr><td>Sourcils</td><td>Tension en trois points avec la main non dominante (et parfois la main dominante en appui), perpendiculairement au trait réalisé ; tension ferme mais sans déformer la forme dessinée</td></tr>
<tr><td>Eye-liner</td><td>Tension douce de la paupière vers l'extérieur et vers le haut, yeux fermés, sans appuyer sur le globe oculaire</td></tr>
<tr><td>Lèvres</td><td>Tension de la lèvre entre deux doigts, en travaillant par petits segments ; la cliente garde la bouche détendue</td></tr>
<tr><td>Taches de rousseur</td><td>Tension locale de la peau autour de chaque point</td></tr>
</table>
<p>Avec des gants, la tension peut glisser sur une peau humide de pigment : on essuie régulièrement avec une compresse stérile et l'on peut utiliser une compresse pour améliorer la prise.</p>

<h3>Le confort sans anesthésiant médicamenteux</h3>
<p>La sensibilité varie d'une personne à l'autre et d'une zone à l'autre ; les lèvres et la paupière sont souvent plus sensibles. La praticienne <strong>ne prescrit, n'injecte et ne fournit aucun produit anesthésiant relevant du médicament</strong>. Si la cliente pose une question sur un produit pour limiter la douleur, elle est renvoyée vers <strong>son médecin ou son pharmacien</strong>, seuls compétents pour la conseiller au regard de sa santé et de ses traitements. Ce qui relève de la praticienne :</p>
<ul>
<li><strong>informer</strong> honnêtement : la sensation est décrite sans dramatiser ni minimiser ;</li>
<li><strong>expliquer</strong> chaque étape avant de la réaliser et prévenir avant de commencer l'effraction ;</li>
<li><strong>installer</strong> confortablement et proposer des pauses ;</li>
<li><strong>maîtriser le geste</strong> : une bonne tension et une technique adaptée limitent l'inconfort ;</li>
<li><strong>créer un environnement calme</strong> : bruit limité, lumière non éblouissante, échanges rassurants ;</li>
<li><strong>respecter un arrêt</strong> : si la cliente demande d'arrêter, on arrête, on écoute et on décide ensemble de la suite.</li>
</ul>
<p>Si la cliente indique qu'elle a utilisé de sa propre initiative un produit avant de venir, la praticienne le note sur la fiche et, en cas de doute sur la compatibilité avec la prestation, ne commence pas et l'oriente vers son médecin ou son pharmacien.</p>

<h3>Les erreurs fréquentes de préparation</h3>
<table border="1" cellpadding="6">
<tr><th>Erreur</th><th>Conséquence</th><th>Bonne pratique</th></tr>
<tr><td>Mesurer la cliente allongée, tête tournée</td><td>Repères décalés, asymétrie visible une fois la cliente assise</td><td>Mesurer assise, tête droite, regard à l'horizontale</td></tr>
<tr><td>Copier un sourcil sur l'autre au millimètre</td><td>Asymétrie apparente si le visage est asymétrique</td><td>Raisonner en harmonie visuelle, au repos et en mouvement</td></tr>
<tr><td>Dessiner une forme « tendance » sans tenir compte du visage</td><td>Résultat disproportionné, vite démodé</td><td>Partir de la morphologie et du souhait réel de la cliente</td></tr>
<tr><td>Faire un sourcil trop épais ou trop foncé dès la première séance</td><td>Correction difficile</td><td>Rester prudent, étoffer à la retouche</td></tr>
<tr><td>Arche trop haute</td><td>Air surpris, regard figé</td><td>Arche placée sur la ligne de l'iris, douce</td></tr>
<tr><td>Queue de sourcil plus basse que la tête</td><td>Regard triste</td><td>Queue au-dessus ou au niveau de la tête</td></tr>
<tr><td>Contour de lèvres tracé franchement hors de la lèvre</td><td>Effet artificiel, visible en vieillissant</td><td>Suivre le contour naturel, agrandissement très limité</td></tr>
<tr><td>Taches de rousseur alignées ou de même taille</td><td>Effet artificiel</td><td>Tailles variées, densité décroissante, pas de motif</td></tr>
<tr><td>Valider le trait d'eye-liner yeux fermés seulement</td><td>Trait invisible ou brisé yeux ouverts</td><td>Toujours valider yeux ouverts</td></tr>
<tr><td>Passer l'antiseptique en frottant</td><td>Dessin effacé, effraction « à l'œil »</td><td>Tamponner, reprendre le dessin si besoin et le faire revalider</td></tr>
<tr><td>Commencer sans validation écrite</td><td>Contestation impossible à trancher</td><td>Photo et mention signée sur la fiche</td></tr>
<tr><td>Conseiller une crème anesthésiante</td><td>Sortie du champ de compétence, risque pour la santé de la cliente</td><td>Renvoi vers le médecin ou le pharmacien</td></tr>
</table>

<blockquote><strong>À retenir.</strong> La tension de la peau conditionne la régularité et la profondeur du dépôt ; elle s'adapte à chaque zone, avec une douceur particulière sur la paupière. Le confort repose sur l'information, l'installation, les pauses, la maîtrise du geste et l'écoute ; toute question de produit anesthésiant est renvoyée vers le médecin ou le pharmacien. Les erreurs de préparation les plus fréquentes viennent d'une mesure mal faite, d'une forme imposée et d'une validation absente.</blockquote>
`,
      },
      {
        title: "5.10 – Quiz de fin de chapitre",
        content: `
<p>Pour chaque question, une seule réponse est correcte. Le corrigé figure après chaque question.</p>

<h4>Question 1 – À quel moment l'antisepsie de la zone est-elle réalisée ?</h4>
<ol type="A">
<li>Avant le démaquillage</li>
<li>Avant la mesure, pour pouvoir dessiner sur une peau propre</li>
<li>Après la validation du dessin, juste avant l'effraction</li>
<li>Après l'effraction uniquement</li>
</ol>
<p><strong>Réponse : C.</strong> Le démaquillage et le nettoyage préparent le dessin ; l'antisepsie intervient juste avant l'effraction, une fois le dessin validé, en veillant à ne pas l'effacer.</p>

<h4>Question 2 – Quel antiseptique utiliser pour un eye-liner ?</h4>
<ol type="A">
<li>Celui qui est disponible sur la desserte</li>
<li>Un produit dont la notice prévoit l'usage à proximité de l'œil et des muqueuses, appliqué sans écoulement</li>
<li>De l'alcool, pour un séchage rapide</li>
<li>Aucun, la zone est trop sensible</li>
</ol>
<p><strong>Réponse : B.</strong> Le produit doit être compatible avec la zone selon sa notice ; il est appliqué avec une compresse à peine humide, yeux fermés.</p>

<h4>Question 3 – Dans quelle position mesure-t-on de préférence les repères des sourcils ?</h4>
<ol type="A">
<li>Allongée, tête tournée vers la praticienne</li>
<li>Assise, tête droite, regard à l'horizontale, visage détendu</li>
<li>Debout, devant un miroir mural</li>
<li>Peu importe</li>
</ol>
<p><strong>Réponse : B.</strong> En position allongée, la peau se déplace légèrement ; la mesure assise, tête droite, donne des repères conformes au visage tel qu'il est vu au quotidien.</p>

<h4>Question 4 – Selon la construction classique, par où passe la ligne qui détermine l'arche du sourcil ?</h4>
<ol type="A">
<li>Par l'aile du nez et le coin interne de l'œil</li>
<li>Par l'aile du nez et le bord externe de l'iris, regard droit</li>
<li>Par la commissure des lèvres et le coin externe de l'œil</li>
<li>Par le milieu du front</li>
</ol>
<p><strong>Réponse : B.</strong> La tête est alignée sur l'aile du nez et le coin interne de l'œil, l'arche sur le bord externe de l'iris, la queue sur le coin externe de l'œil. Ce sont des repères à ajuster.</p>

<h4>Question 5 – Une cliente a un sourcil naturellement plus haut que l'autre. Quelle approche est la plus juste ?</h4>
<ol type="A">
<li>Copier exactement le sourcil le plus haut sur l'autre côté</li>
<li>Rechercher une harmonie visuelle en travaillant les bords, au repos et en mouvement, et expliquer le choix à la cliente</li>
<li>Refuser la prestation</li>
<li>Dessiner deux formes identiques sans tenir compte de la morphologie</li>
</ol>
<p><strong>Réponse : B.</strong> L'objectif est un résultat harmonieux, pas une symétrie mathématique. L'explication fait partie du dialogue avec la cliente.</p>

<h4>Question 6 – Comment valider un trait d'eye-liner étiré ?</h4>
<ol type="A">
<li>Yeux fermés uniquement</li>
<li>Yeux ouverts, de face, après l'avoir tracé yeux fermés</li>
<li>Sur photo uniquement, sans miroir</li>
<li>Après l'effraction</li>
</ol>
<p><strong>Réponse : B.</strong> Une paupière tombante ou un pli peut masquer ou briser le trait : la validation se fait toujours yeux ouverts.</p>

<h4>Question 7 – Quelle règle s'applique au contour des lèvres ?</h4>
<ol type="A">
<li>Prolonger les commissures pour un effet souriant</li>
<li>Dessiner franchement hors de la lèvre pour l'agrandir</li>
<li>Construire le contour à partir de l'axe médian, des sommets de l'arc de Cupidon et des commissures, en suivant le contour naturel</li>
<li>Ne dessiner que la lèvre supérieure</li>
</ol>
<p><strong>Réponse : C.</strong> Un contour qui sort franchement de la lèvre ou prolonge les commissures donne un effet artificiel, difficile à corriger.</p>

<h4>Question 8 – Quelle répartition de taches de rousseur paraîtra la plus naturelle ?</h4>
<ol type="A">
<li>Des points de même taille, régulièrement espacés</li>
<li>Des rangées symétriques sur chaque pommette</li>
<li>Des points de tailles variées, plus denses au centre de la zone, sans alignement</li>
<li>Une seule tache par pommette</li>
</ol>
<p><strong>Réponse : C.</strong> Le naturel naît de la variété des tailles, d'une densité décroissante vers la périphérie et de l'absence de motif.</p>

<h4>Question 9 – Le dessin est terminé, la cliente dit : « Je ne sais pas trop… on peut y aller quand même. » Que faites-vous ?</h4>
<ol type="A">
<li>Vous commencez, le planning est chargé</li>
<li>Vous ne commencez pas : vous cherchez ce qui gêne, ajustez le dessin ou proposez de reporter, et n'effectuez l'effraction qu'après validation écrite et photo</li>
<li>Vous commencez par un seul sourcil pour voir</li>
<li>Vous lui demandez de signer sans regarder</li>
</ol>
<p><strong>Réponse : B.</strong> Aucune effraction sans validation claire, écrite et photographiée. Le maquillage semi-permanent est durable.</p>

<h4>Question 10 – Une cliente demande quelle crème anesthésiante acheter avant sa séance. Que répondez-vous ?</h4>
<ol type="A">
<li>Vous lui conseillez un produit que vous utilisez habituellement</li>
<li>Vous lui en fournissez un échantillon</li>
<li>Vous l'orientez vers son médecin ou son pharmacien et lui expliquez ce que vous mettez en œuvre pour son confort (information, installation, pauses, maîtrise du geste)</li>
<li>Vous lui dites que la prestation est indolore</li>
</ol>
<p><strong>Réponse : C.</strong> La praticienne ne prescrit, n'injecte et ne fournit aucun produit anesthésiant relevant du médicament. Elle informe honnêtement et agit sur le confort par les moyens qui relèvent de sa pratique.</p>
`,
      },
      {
        title: "5.11 – Cas pratique corrigé : préparer les sourcils de Mme Laura VIDAL",
        content: `
<h3>Contexte (fictif)</h3>
<p>Mme Laura VIDAL, 34 ans, a rendez-vous à l'Institut Ligne & Teint pour une première séance de sourcils en technique manuelle (microblading). Lors de l'entretien préalable, il a été relevé : phototype II, sous-ton froid, peau normale à légèrement grasse sur la zone médiane du visage, aucune contre-indication déclarée, aucun traitement en cours, aucune allergie connue. Ses sourcils sont clairsemés et asymétriques après des années d'épilation excessive : à gauche, la tête est plus éloignée de l'axe médian, l'arche est plus haute et la queue plus courte qu'à droite. Elle lève davantage le sourcil gauche en parlant. Elle souhaite « des sourcils naturels, pas dessinés ». Elle se maquille habituellement les sourcils avec un crayon brun foncé. Elle demande aussi s'il faut mettre une crème « pour ne rien sentir ».</p>

<h3>Consigne</h3>
<ol>
<li>Listez les vérifications à effectuer avant de toucher la zone.</li>
<li>Décrivez le démaquillage, l'observation et les photos avant.</li>
<li>Expliquez votre mesure et votre mapping, en traitant l'asymétrie et la mobilité du sourcil gauche.</li>
<li>Décrivez le dessin préparatoire adapté à la technique manuelle et à l'effet naturel recherché.</li>
<li>Rédigez la validation à faire signer et indiquez ce que vous direz à la cliente au moment de la validation.</li>
<li>Indiquez l'ordre de l'antisepsie, de l'installation et de la tension de la peau.</li>
<li>Répondez à sa question sur la crème.</li>
</ol>

<h3>Corrigé</h3>
<h4>1. Vérifications préalables</h4>
<ul>
<li>Fiche cliente complète et relue avec elle : état de santé, traitements, allergies, antécédents, absence de grossesse et d'allaitement, absence d'injection esthétique récente sur la zone.</li>
<li>Information préalable sur les risques et les précautions après la réalisation remise (arrêté du 3 décembre 2008) et consentement éclairé signé.</li>
<li>Autorisation écrite pour l'usage des photos au-delà de son dossier, si elle l'accepte ; à défaut, les photos restent dans son dossier.</li>
<li>Poste préparé selon la chaîne d'hygiène (chapitre 4), pigments présélectionnés pour un phototype II à sous-ton froid (chapitre 6).</li>
</ul>

<h4>2. Démaquillage, observation, photos</h4>
<ul>
<li>Hygiène des mains, gants d'examen ; retrait du crayon à sourcils avec un démaquillant doux et des cotons à usage unique ; dégraissage de la zone, légèrement grasse.</li>
<li>Observation sous un bon éclairage : densité des poils, direction de pousse (verticale à la tête, puis oblique), zones vides, absence de cicatrice et d'ancien maquillage, peau sans lésion.</li>
<li>Test de mobilité : la cliente lève les sourcils, sourit, parle ; on note que le gauche monte davantage.</li>
<li>Photos avant de face et de trois quarts, dans les conditions habituelles d'éclairage et de distance.</li>
</ul>

<h4>3. Mesure et mapping</h4>
<ul>
<li>Cliente assise, tête droite, regard à l'horizontale. Axe médian matérialisé au fil de mesure (fil à usage unique).</li>
<li>Têtes positionnées sur la ligne aile du nez – coin interne de l'œil et vérifiées au compas à égale distance de l'axe : la tête gauche est rapprochée de l'axe pour égaliser.</li>
<li>Arches placées sur la ligne aile du nez – bord externe de l'iris ; pour compenser l'arche gauche plus haute et plus mobile, on n'augmente pas le bord supérieur à gauche et l'on travaille le bord inférieur pour abaisser visuellement l'arche ; on vérifie au repos puis en parlant.</li>
<li>Queues placées sur la ligne aile du nez – coin externe de l'œil, au-dessus du niveau des têtes : la queue gauche est allongée jusqu'à ce repère.</li>
<li>Recul au miroir avec la cliente, de face et de trois quarts, au repos et en mouvement ; ajustement pour une harmonie visuelle et non une copie au millimètre.</li>
</ul>

<h4>4. Dessin préparatoire</h4>
<ul>
<li>Crayon taillé, réservé à la cliente, de couleur proche de la teinte prévue (moins foncé que son crayon habituel, pour un effet naturel).</li>
<li>Points de repère, puis bord inférieur de la tête à la queue, puis bord supérieur ; épaisseur moyenne, prudente.</li>
<li>Indication de la direction des traits : verticaux à la tête, obliques vers l'arche, presque horizontaux vers la queue, en suivant les poils restants ; densité plus légère à la tête.</li>
<li>Explication des choix : pourquoi la tête gauche est rapprochée, pourquoi l'arche gauche n'est pas remontée, pourquoi la queue gauche est allongée.</li>
</ul>

<h4>5. Validation</h4>
<p>Mention portée sur la fiche, datée et signée par la cliente : « J'ai vu dans le miroir et sur photo le dessin préparatoire de mes sourcils (forme, épaisseur, emplacement, direction des traits). Je l'accepte avant la réalisation. »</p>
<p>Ce qui est dit à la cliente : le résultat immédiat sera plus marqué que le résultat cicatrisé ; la cicatrisation dure plusieurs semaines (environ 4 à 6), avec des phases où la couleur paraît plus foncée puis plus claire ; une retouche est prévue après cicatrisation complète, qui permettra d'étoffer si elle le souhaite ; la tenue est de plusieurs années avec une atténuation progressive, variable selon la peau, le soleil et les soins. Photo du dessin validé de face et de trois quarts.</p>

<h4>6. Antisepsie, installation, tension</h4>
<ol>
<li>Installation semi-allongée, nuque soutenue, tête droite ; praticienne assise à la tête, desserte côté main dominante ; signal convenu pour les pauses.</li>
<li>Retrait des gants, friction hydroalcoolique ; champ stérile ; ouverture devant la cliente de la lame stérile à usage unique et des compresses stériles ; relevé des lots.</li>
<li>Nouvelle paire de gants ; antisepsie avec un antiseptique cutané adapté au visage, compresse stérile, tamponnement du centre vers la périphérie, temps de contact respecté, sans effacer le dessin (reprise et revalidation si nécessaire).</li>
<li>Tension en trois points, perpendiculaire au trait, ferme sans déformer la forme ; changement de côté pour le second sourcil plutôt que torsion.</li>
</ol>

<h4>7. Réponse sur la crème</h4>
<p>« Je ne peux ni vous conseiller ni vous fournir un produit anesthésiant : c'est une question à poser à votre médecin ou à votre pharmacien, qui connaissent votre santé. De mon côté, je vous explique chaque étape avant de la faire, nous pouvons faire des pauses à tout moment avec le signal convenu, et une bonne tension de la peau rend le geste plus confortable. Si vous utilisez quelque chose sur conseil de votre médecin ou de votre pharmacien, dites-le-moi pour que je le note. »</p>

<h4>Erreurs fréquentes relevées lors de la correction</h4>
<ul>
<li>Recopier le sourcil droit sur le gauche sans tenir compte de la mobilité.</li>
<li>Monter le bord supérieur gauche pour « égaliser », ce qui accentue l'arche.</li>
<li>Dessiner aussi foncé que le crayon habituel de la cliente, contraire à l'effet naturel souhaité.</li>
<li>Oublier de valider au repos et en mouvement.</li>
<li>Conseiller une crème « que toutes les clientes utilisent ».</li>
</ul>

<blockquote><strong>À retenir.</strong> Une préparation réussie suit toujours le même ordre : vérifications, démaquillage, observation et photos, mesure et mapping au repos et en mouvement, dessin adapté à la technique, validation écrite et photographique, installation, antisepsie, tension. Les choix sont expliqués à la cliente, et les questions médicales sont renvoyées vers son médecin ou son pharmacien.</blockquote>
`,
      },
    ],
  },
  {
    title: "Chapitre 6 – Choisir les pigments selon le phototype et appliquer les règles de colorimétrie (C5)",
    description:
      "Maîtriser les bases de la couleur (cercle chromatique, primaires, secondaires, complémentaires, valeur, saturation), analyser la carnation et le sous-ton, relier les phototypes de Fitzpatrick au choix des teintes, connaître la composition des pigments (organiques, inorganiques, oxydes de fer, dioxyde de titane, carbone), vérifier la conformité au règlement REACH et à la restriction (UE) 2020/2081 et l'étiquetage, anticiper le virage des couleurs dans la peau, neutraliser et corriger, réaliser des mélanges et choisir par zone. Cas fictifs de Mme Martine LEROY (ancien maquillage viré au gris-bleu) et de Mme Aïcha DIALLO (phototype V, lèvres). Séquence traitée le jour 1 de la formation. Compétence C5 du référentiel RS6459.",
    sections: [
      {
        title: "6.1 – Les bases de la couleur appliquées à la dermopigmentation",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Situer la compétence C5 dans le référentiel et comprendre pourquoi la colorimétrie est indispensable.</li>
<li>Utiliser le cercle chromatique : couleurs primaires, secondaires, tertiaires et complémentaires.</li>
<li>Décrire une couleur par sa teinte, sa valeur et sa saturation.</li>
</ul>

<h3>Le libellé officiel</h3>
<p>La fiche RS6459 formule ainsi la cinquième compétence : <strong>« C5 – Sélectionner les pigments adaptés au phototype de la cliente en appliquant les règles de colorimétrie »</strong>. En maquillage semi-permanent, la couleur n'est pas posée sur la peau comme un fard : elle est déposée <strong>dans</strong> la peau et vue <strong>à travers</strong> l'épiderme, qui agit comme un filtre plus ou moins opaque et coloré selon la carnation. La couleur finale cicatrisée résulte donc de la rencontre entre le pigment, la peau de la cliente, la profondeur de dépôt et le temps. Choisir une couleur « jolie dans le flacon » ne suffit pas : il faut prévoir ce qu'elle deviendra.</p>

<h3>Le cercle chromatique</h3>
<p>Le cercle chromatique utilisé en dermopigmentation est celui des peintres (synthèse soustractive, par mélange de matières colorées). Il s'organise ainsi :</p>
<table border="1" cellpadding="6">
<tr><th>Catégorie</th><th>Couleurs</th><th>Obtention</th></tr>
<tr><td>Primaires</td><td>Jaune, rouge, bleu</td><td>Ne peuvent pas être obtenues par mélange d'autres couleurs</td></tr>
<tr><td>Secondaires</td><td>Orange (jaune + rouge), violet (rouge + bleu), vert (bleu + jaune)</td><td>Mélange à parts égales de deux primaires</td></tr>
<tr><td>Tertiaires</td><td>Jaune-orangé, rouge-orangé, rouge-violet, bleu-violet, bleu-vert, jaune-vert</td><td>Mélange d'une primaire et d'une secondaire voisine</td></tr>
<tr><td>Complémentaires</td><td>Jaune / violet, rouge / vert, bleu / orange</td><td>Couleurs diamétralement opposées sur le cercle</td></tr>
</table>
<p>Deux propriétés des complémentaires sont fondamentales pour la praticienne :</p>
<ul>
<li><strong>Mélangées</strong>, deux complémentaires se neutralisent : elles tendent vers un brun ou un gris. C'est le principe de la <strong>neutralisation</strong> : un orange atténue un bleu, un vert atténue un rouge, un jaune atténue un violet.</li>
<li><strong>Juxtaposées</strong>, elles se renforcent visuellement : un sourcil à reflet rouge paraît plus rouge sur une peau qui présente des rougeurs vertes de correcteur, par exemple.</li>
</ul>

<h3>Les bruns : la famille centrale du maquillage semi-permanent</h3>
<p>La plupart des teintes de sourcils sont des bruns. Or un brun est, en colorimétrie, un mélange des trois primaires dans des proportions différentes. Selon la primaire dominante, il a une « base » :</p>
<table border="1" cellpadding="6">
<tr><th>Base dominante</th><th>Aspect</th><th>Évolution possible dans la peau</th></tr>
<tr><td>Jaune (et rouge) : base chaude</td><td>Brun doré, brun cuivré, caramel</td><td>Peut tirer vers l'orangé ou le rouge en s'estompant si le jaune disparaît plus vite</td></tr>
<tr><td>Bleu (ou noir) : base froide</td><td>Brun cendré, taupe, gris-brun</td><td>Peut tirer vers le gris ou le gris-bleu, surtout si le dépôt est trop profond</td></tr>
<tr><td>Équilibrée : base neutre</td><td>Brun moyen sans reflet marqué</td><td>Évolution plus prévisible, souvent choisie en première intention</td></tr>
</table>

<h3>Teinte, valeur, saturation</h3>
<ul>
<li><strong>La teinte</strong> est la couleur elle-même, sa place sur le cercle (rouge, orangé, brun à base jaune…).</li>
<li><strong>La valeur</strong> est le degré de clarté ou d'obscurité. Ajouter du blanc éclaircit (on parle de teinte rompue ou de « tint ») ; ajouter du noir assombrit. En maquillage semi-permanent, la valeur se juge par rapport à la carnation et aux poils ou aux cheveux : un sourcil plus foncé de plusieurs tons que les cheveux durcit le visage.</li>
<li><strong>La saturation</strong> (ou intensité) est la pureté de la couleur : une couleur saturée est vive, une couleur désaturée est rabattue, plus douce. Ajouter la complémentaire désature.</li>
</ul>
<p>Pour décrire une couleur avec précision, on combine les trois : « brun moyen, base légèrement chaude, peu saturé » est plus utile que « marron ».</p>

<h3>Couleur, lumière et perception</h3>
<p>La couleur perçue dépend de l'éclairage : une lumière chaude jaunit les teintes, une lumière froide les bleuit. D'où l'importance d'un éclairage au rendu des couleurs fidèle dans la salle technique (chapitre 4) et d'une vérification du choix de pigment, si possible, à la lumière du jour. La couleur perçue dépend aussi de son environnement : un même brun paraît plus clair sur une peau foncée et plus foncé sur une peau claire.</p>

<blockquote><strong>À retenir.</strong> En dermopigmentation, la couleur est vue à travers l'épiderme et évolue dans le temps. Le cercle chromatique organise primaires, secondaires et complémentaires ; deux complémentaires mélangées se neutralisent, ce qui fonde la correction. Les bruns ont une base chaude, froide ou neutre qui conditionne leur évolution. Une couleur se décrit par sa teinte, sa valeur et sa saturation, sous un éclairage fidèle.</blockquote>
`,
      },
      {
        title: "6.2 – Carnation, sous-ton et phototypes : analyser la peau de la cliente",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Distinguer la carnation (couleur de surface) du sous-ton (reflet sous-jacent).</li>
<li>Déterminer le sous-ton d'une cliente par des observations simples.</li>
<li>Utiliser la classification des phototypes de Fitzpatrick (I à VI) pour orienter le choix des teintes.</li>
</ul>

<h3>Carnation et sous-ton</h3>
<p>La <strong>carnation</strong> est la couleur de la peau telle qu'on la voit : claire, moyenne, mate, foncée. Le <strong>sous-ton</strong> est le reflet de fond, plus stable, qui transparaît sous la carnation. Deux personnes de carnation identique peuvent avoir des sous-tons différents. On distingue habituellement :</p>
<table border="1" cellpadding="6">
<tr><th>Sous-ton</th><th>Indices habituels</th><th>Conséquence pour le choix des pigments</th></tr>
<tr><td>Froid</td><td>Reflets rosés ou bleutés ; veines du poignet d'aspect plutôt bleu ou violet ; bijoux argentés jugés plus flatteurs ; peau qui rougit facilement</td><td>Éviter les bruns trop froids ou trop cendrés qui risquent de griser ; un brun neutre ou légèrement chaud compense le risque de virage gris-bleu ; éviter d'ajouter du rose sur des lèvres déjà froides</td></tr>
<tr><td>Chaud</td><td>Reflets dorés, pêche ou olivâtres ; veines d'aspect plutôt vert ; bijoux dorés jugés plus flatteurs ; peau qui hâle facilement</td><td>Éviter les bruns trop chauds qui risquent de virer à l'orangé ou au rouge ; un brun neutre ou légèrement froid équilibre</td></tr>
<tr><td>Neutre</td><td>Mélange des indices ; ni l'or ni l'argent ne domine</td><td>Bruns neutres ; choix guidé par la valeur (clair, moyen, foncé) et par les cheveux et les poils</td></tr>
</table>
<p>Ces indices sont des <strong>aides à l'observation</strong>, pas des tests infaillibles. On les croise, sous un éclairage fidèle, sur une peau démaquillée, en observant aussi la zone à traiter : des lèvres peuvent présenter un sous-ton différent du reste du visage, et une zone de sourcils peut garder la trace d'un ancien maquillage.</p>

<h3>Une règle de prudence : compenser plutôt qu'accentuer</h3>
<p>Le pigment cicatrisé est vu à travers la peau : un sous-ton froid « refroidit » visuellement le pigment, un sous-ton chaud le « réchauffe ». C'est pourquoi on choisit souvent un pigment qui compense légèrement le sous-ton plutôt qu'un pigment qui l'accentue. Ce principe s'ajuste toujours au souhait de la cliente et à la couleur de ses cheveux et de ses poils.</p>

<h3>Les phototypes de Fitzpatrick</h3>
<p>La classification de Fitzpatrick décrit la réaction de la peau au soleil. Elle est utile en dermopigmentation parce qu'elle renseigne à la fois sur la carnation, sur la quantité de mélanine (qui filtre la couleur du pigment) et sur le risque de réactions pigmentaires de la peau après une agression.</p>
<table border="1" cellpadding="6">
<tr><th>Phototype</th><th>Description habituelle</th><th>Repères pour le choix des teintes</th></tr>
<tr><td>I</td><td>Peau très claire, souvent taches de rousseur, cheveux roux ou blond clair ; brûle toujours, ne bronze pas</td><td>Valeurs claires ; bruns doux, souvent légèrement chauds pour éviter le gris ; vigilance sur l'intensité, toute couleur ressort fortement</td></tr>
<tr><td>II</td><td>Peau claire, cheveux blonds à châtain clair ; brûle facilement, bronze peu</td><td>Bruns clairs à moyens ; neutres ou légèrement chauds en cas de sous-ton froid ; éviter les bruns très cendrés et le noir</td></tr>
<tr><td>III</td><td>Peau claire à mate, cheveux châtains ; brûle parfois, bronze progressivement</td><td>Bruns moyens ; choix guidé par le sous-ton ; large palette possible</td></tr>
<tr><td>IV</td><td>Peau mate, cheveux bruns ; brûle rarement, bronze facilement</td><td>Bruns moyens à foncés ; prudence avec les bases très chaudes qui peuvent rougir</td></tr>
<tr><td>V</td><td>Peau foncée, cheveux bruns à noirs ; brûle très rarement</td><td>Bruns foncés, bases adaptées à un épiderme riche en mélanine qui assombrit et désature la couleur ; lèvres souvent plus foncées ou à pigmentation inégale, nécessitant neutralisation ; vigilance sur les réactions pigmentaires de la peau</td></tr>
<tr><td>VI</td><td>Peau très foncée, cheveux noirs ; ne brûle pas</td><td>Bruns très foncés ; couleurs claires peu visibles ou d'aspect grisâtre ; vigilance accrue sur les réactions pigmentaires et cicatricielles</td></tr>
</table>
<p>Sur les phototypes foncés (V et VI), la peau peut réagir à l'effraction par des modifications de pigmentation (zones plus claires ou plus foncées) et la tendance aux cicatrices épaisses peut être plus fréquente chez certaines personnes. Les antécédents de cicatrisation et de chéloïdes, recherchés en C2, prennent ici toute leur importance ; en cas de doute, l'avis médical préalable s'impose.</p>

<h3>Observer, noter, conclure</h3>
<p>Le diagnostic colorimétrique est consigné sur la fiche cliente :</p>
<table border="1" cellpadding="6">
<tr><th>Élément</th><th>Exemple : Mme Laura VIDAL</th></tr>
<tr><td>Phototype</td><td>II</td></tr>
<tr><td>Carnation</td><td>Claire</td></tr>
<tr><td>Sous-ton</td><td>Froid (reflets rosés, veines bleutées, préfère l'argent)</td></tr>
<tr><td>Cheveux et poils</td><td>Châtain clair, poils de sourcils châtain clair</td></tr>
<tr><td>Ancien maquillage</td><td>Aucun</td></tr>
<tr><td>Conclusion</td><td>Brun clair à moyen, base neutre à légèrement chaude, pour éviter le virage gris sur un sous-ton froid ; valeur proche des cheveux</td></tr>
</table>

<blockquote><strong>À retenir.</strong> La carnation est la couleur visible, le sous-ton le reflet de fond (froid, chaud, neutre), observé par des indices croisés sur peau démaquillée. Le phototype de Fitzpatrick (I à VI) renseigne sur la carnation, la mélanine qui filtre le pigment et le risque de réactions pigmentaires. On choisit souvent un pigment qui compense légèrement le sous-ton, et l'on consigne le diagnostic sur la fiche cliente.</blockquote>
`,
      },
      {
        title: "6.3 – Composition des pigments, conformité réglementaire et étiquetage",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Distinguer pigments organiques et inorganiques et connaître leurs comportements généraux.</li>
<li>Connaître le rôle des oxydes de fer, du dioxyde de titane et du carbone.</li>
<li>Vérifier la conformité réglementaire d'un pigment et lire son étiquette.</li>
</ul>

<h3>Ce qu'il y a dans un flacon</h3>
<p>Un pigment de maquillage semi-permanent est un <strong>mélange</strong> : des particules colorées insolubles (les pigments proprement dits) en suspension dans un liquide porteur, avec éventuellement des agents qui assurent la dispersion, la conservation et la fluidité. Le Code de la santé publique définit ces produits comme des <strong>produits de tatouage</strong> (articles L513-10-1 et suivants) ; leur surveillance relève de l'<strong>ANSM</strong>.</p>

<h3>Pigments organiques et inorganiques</h3>
<table border="1" cellpadding="6">
<tr><th>Famille</th><th>Nature</th><th>Comportement général</th><th>Points de vigilance</th></tr>
<tr><td>Inorganiques (minéraux)</td><td>Composés minéraux, notamment les oxydes de fer (jaunes, rouges, bruns, noirs) et le dioxyde de titane (blanc)</td><td>Couleurs plutôt douces, mates, proches des teintes naturelles de la peau et des poils ; particules généralement plus grosses</td><td>Les oxydes de fer se prêtent bien aux bruns naturels ; les mélanges peuvent évoluer vers une dominante chaude (orangé, rougeâtre) en s'estompant</td></tr>
<tr><td>Organiques (de synthèse)</td><td>Molécules colorées à base de carbone, obtenues par synthèse</td><td>Couleurs vives et saturées, large palette (rouges, roses, violets, bleus, verts) ; particules généralement plus fines</td><td>Utiles pour les lèvres et pour certains correcteurs ; certaines teintes peuvent s'estomper différemment selon la lumière ; plusieurs substances de cette famille sont visées par la restriction européenne</td></tr>
<tr><td>Hybrides</td><td>Mélange des deux familles dans un même flacon</td><td>Combinent la douceur des minéraux et l'éclat des organiques</td><td>L'évolution dans la peau peut être moins prévisible si les composants s'estompent à des rythmes différents</td></tr>
</table>

<h3>Trois composants à connaître</h3>
<ul>
<li><strong>Les oxydes de fer</strong> donnent les jaunes, les rouges, les bruns et certains noirs. Ils sont à la base de nombreux bruns de sourcils. Leur composante jaune peut s'estomper et laisser apparaître une dominante plus rouge ou orangée.</li>
<li><strong>Le dioxyde de titane</strong> est un blanc opaque utilisé pour éclaircir et opacifier une teinte. Il est à manier avec beaucoup de prudence : ajouté en excès ou déposé seul, il peut donner un aspect terne, grisâtre ou crayeux, et un dépôt blanc ne se corrige pas facilement. On ne cherche pas à « effacer » un ancien maquillage en déposant du blanc par-dessus.</li>
<li><strong>Le carbone</strong> (noir de carbone) donne des noirs profonds et assombrit les mélanges. Ses particules très fines, lorsqu'elles sont déposées trop profondément, sont vues à travers la peau avec un reflet bleuté ou gris-bleu : c'est l'une des causes classiques du virage gris-bleu des sourcils et des eye-liners.</li>
</ul>

<h3>REACH et la restriction (UE) 2020/2081</h3>
<p>Le règlement <strong>REACH</strong> (CE) n° 1907/2006 encadre les substances chimiques dans l'Union européenne. Le règlement <strong>(UE) 2020/2081</strong> a ajouté une restriction visant les substances dangereuses dans les encres de tatouage et de maquillage permanent, applicable depuis le <strong>4 janvier 2022</strong>. Les pigments <strong>Blue 15:3</strong> et <strong>Green 7</strong> sont restreints depuis le <strong>4 janvier 2023</strong>. Pour la praticienne, les conséquences sont concrètes :</p>
<ul>
<li>n'acheter que des pigments dont le fabricant ou le distributeur atteste la conformité à la réglementation européenne en vigueur ;</li>
<li>écarter tout flacon ancien, d'origine inconnue, acheté hors circuit professionnel ou dont l'étiquetage est incomplet ;</li>
<li>conserver les fiches techniques et les éléments de conformité fournis par le fournisseur ;</li>
<li>être particulièrement attentive aux teintes bleues et vertes, ainsi qu'aux correcteurs qui en contiennent, concernés par la restriction de 2023 ;</li>
<li>suivre les informations publiées par l'ANSM et par le fournisseur (alertes, retraits de lots).</li>
</ul>

<h3>Lire l'étiquette</h3>
<table border="1" cellpadding="6">
<tr><th>Mention attendue</th><th>Pourquoi la vérifier</th></tr>
<tr><td>« Mélange destiné à être utilisé dans des tatouages ou des maquillages permanents »</td><td>Confirme que le produit est destiné à cet usage et relève de la réglementation correspondante</td></tr>
<tr><td>Liste des ingrédients</td><td>Permet de connaître la composition (en lien avec les allergies déclarées par la cliente) et d'informer un médecin si besoin</td></tr>
<tr><td>Numéro de lot</td><td>Indispensable à la traçabilité sur la fiche cliente (chapitre 4)</td></tr>
<tr><td>Date de péremption et conditions d'utilisation</td><td>Un pigment périmé ou ouvert depuis trop longtemps selon les indications du fabricant n'est pas utilisé</td></tr>
<tr><td>Identification du fabricant ou du responsable de la mise sur le marché</td><td>Permet de le contacter et de vérifier le circuit d'approvisionnement</td></tr>
</table>
<p>Le cours ne cite volontairement aucune marque : le choix d'un fournisseur repose sur la conformité, la transparence de l'étiquetage, la disponibilité des fiches techniques et la constance des lots, pas sur la notoriété.</p>

<h3>Manipuler les pigments en sécurité</h3>
<ul>
<li>Agiter le flacon selon les indications du fabricant pour homogénéiser la suspension.</li>
<li>Verser la quantité nécessaire dans un godet à usage unique, sans que l'embout touche le godet ; ne jamais reverser un reste dans le flacon.</li>
<li>Refermer immédiatement le flacon ; noter la date d'ouverture.</li>
<li>Réaliser les mélanges dans le godet avec un outil à usage unique, et noter les proportions sur la fiche cliente.</li>
</ul>

<blockquote><strong>À retenir.</strong> Un pigment est un mélange de particules colorées en suspension. Les inorganiques (oxydes de fer, dioxyde de titane) sont doux et naturels, les organiques vifs et saturés, les hybrides combinent les deux. Le dioxyde de titane s'utilise avec une extrême prudence, le carbone déposé trop profond donne un reflet gris-bleu. Les pigments doivent être conformes à REACH et à la restriction (UE) 2020/2081 (applicable depuis le 4 janvier 2022 ; Blue 15:3 et Green 7 restreints depuis le 4 janvier 2023) et porter la mention réglementaire, les ingrédients et le numéro de lot.</blockquote>
`,
      },
      {
        title: "6.4 – Le virage des couleurs dans la peau",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Expliquer pourquoi une couleur évolue dans la peau après cicatrisation et au fil des années.</li>
<li>Reconnaître les trois virages les plus fréquents : gris-bleu, rose-rouge, orangé.</li>
<li>Prévenir le virage dès le choix du pigment et par la maîtrise de la profondeur.</li>
</ul>

<h3>Pourquoi les couleurs changent</h3>
<p>Le maquillage semi-permanent s'atténue progressivement sur plusieurs années : l'organisme élimine peu à peu une partie des particules, la lumière (notamment le soleil) dégrade certains pigments, et la peau se renouvelle. Mais l'atténuation n'est pas toujours uniforme : <strong>les composants d'un mélange ne disparaissent pas tous au même rythme</strong>. Lorsqu'un composant s'estompe plus vite que les autres, la couleur restante change de teinte : c'est le <strong>virage</strong>.</p>
<p>Plusieurs facteurs l'influencent :</p>
<ul>
<li><strong>la profondeur de dépôt</strong> : un pigment déposé trop profondément, au-delà de la jonction dermo-épidermique, migre, devient flou et prend souvent un reflet bleuté, car il est vu à travers une épaisseur de peau plus importante ;</li>
<li><strong>la composition du pigment</strong> : proportion de jaune, de rouge, de noir et de carbone, nature organique ou inorganique ;</li>
<li><strong>la carnation et le sous-ton</strong> : l'épiderme filtre et teinte la couleur perçue ;</li>
<li><strong>l'exposition au soleil</strong> et les soins (produits exfoliants, certains actifs cosmétiques appliqués sur la zone) ;</li>
<li><strong>les superpositions</strong> : un nouveau pigment déposé sur un ancien maquillage se mélange optiquement avec lui.</li>
</ul>

<h3>Les trois virages les plus fréquents</h3>
<table border="1" cellpadding="6">
<tr><th>Virage</th><th>Origine habituelle</th><th>Zones souvent concernées</th><th>Prévention</th></tr>
<tr><td>Gris-bleu, gris, bleu-vert</td><td>Pigment à forte composante noire ou carbone, base froide, dépôt trop profond ; sous-ton froid qui accentue l'effet</td><td>Sourcils (anciens maquillages noirs ou très foncés), eye-liner noir</td><td>Bruns à base neutre ou légèrement chaude sur sous-ton froid ; jamais de noir pur aux sourcils ; maîtrise de la profondeur ; tension de peau régulière</td></tr>
<tr><td>Rose, rouge, saumon</td><td>Composante jaune qui s'estompe et laisse le rouge ; pigment à base chaude ; sous-ton chaud</td><td>Sourcils bruns chauds anciens, lèvres</td><td>Bruns neutres ou légèrement froids sur sous-ton chaud ; éviter l'excès de rouge dans les mélanges</td></tr>
<tr><td>Orangé, cuivré</td><td>Oxydes de fer à dominante chaude restants après disparition de la composante froide ; surcorrection orange d'un ancien gris-bleu</td><td>Sourcils</td><td>Dosage mesuré des modificateurs chauds ; correction progressive en plusieurs séances</td></tr>
</table>
<p>À ces virages s'ajoute le cas du <strong>violet</strong> sur les lèvres foncées ou à sous-ton froid : un rose ou un rouge déposé sur une lèvre bleutée peut paraître violacé, par mélange optique avec le bleu de la lèvre. La solution passe par la neutralisation (section 6.5).</p>

<h3>Prévenir dès le choix du pigment</h3>
<ol>
<li>Analyser le phototype et le sous-ton (section 6.2).</li>
<li>Choisir une base qui compense légèrement le sous-ton plutôt qu'elle ne l'accentue.</li>
<li>Éviter les couleurs extrêmes (noir pur aux sourcils, roses très froids sur lèvres bleutées, blanc pour éclaircir).</li>
<li>Maîtriser la profondeur : rester dans l'épiderme jusqu'à la jonction dermo-épidermique ; trop profond, le pigment migre et vire au bleu, trop superficiel, il tient mal (les réglages relèvent de la compétence C6).</li>
<li>Prévenir la cliente : le résultat cicatrisé sera plus doux que l'aspect immédiat, et l'atténuation progressive sur plusieurs années est normale ; la protection solaire de la zone, une fois cicatrisée, aide à préserver la couleur (compétence C11).</li>
<li>Noter le pigment, le lot et le mélange : en cas de virage constaté à la retouche ou des années plus tard, on sait ce qui a été déposé.</li>
</ol>

<blockquote><strong>À retenir.</strong> Le virage vient de composants qui s'estompent à des rythmes différents, d'un dépôt trop profond, du sous-ton et du soleil. Gris-bleu : noir, carbone, base froide, profondeur excessive. Rose-rouge : disparition du jaune, base chaude. Orangé : oxydes de fer chauds restants ou surcorrection. On prévient par le choix d'une base compensatrice, l'absence de couleurs extrêmes, la maîtrise de la profondeur et la traçabilité.</blockquote>
`,
      },
      {
        title: "6.5 – Neutraliser et corriger : la complémentaire au service de la correction",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Appliquer le principe des complémentaires à la correction d'un ancien maquillage viré.</li>
<li>Choisir le correcteur adapté : orange ou ocre sur gris-bleu, vert pour atténuer le rouge, jaune pour atténuer le violet.</li>
<li>Évaluer la faisabilité d'une correction et savoir orienter la cliente lorsqu'elle n'est pas possible.</li>
</ul>

<h3>Le principe</h3>
<p>Neutraliser, c'est déposer une couleur complémentaire de la couleur indésirable pour la rabattre vers un brun ou un ton neutre, sur lequel on pourra ensuite déposer la couleur souhaitée. On ne « recouvre » pas une couleur foncée avec une couleur plus claire : en dermopigmentation, les couleurs se mélangent optiquement, elles ne se superposent pas comme une peinture opaque. <strong>On ne peut pas éclaircir une couleur en déposant une couleur plus claire par-dessus.</strong></p>

<h3>Le tableau des corrections</h3>
<table border="1" cellpadding="6">
<tr><th>Couleur indésirable</th><th>Complémentaire / correcteur</th><th>Exemple de situation</th><th>Points de vigilance</th></tr>
<tr><td>Gris-bleu, bleu</td><td>Orange, ocre, brun à base chaude (orangée)</td><td>Ancien maquillage noir des sourcils viré au gris-bleu</td><td>Dosage progressif ; un excès d'orange donne un sourcil cuivré ; correction souvent en plusieurs séances</td></tr>
<tr><td>Bleu-vert, vert</td><td>Rouge, rouge-orangé, brun à base rouge</td><td>Ancien eye-liner ou sourcil viré au vert</td><td>Un excès de rouge donne un reflet rosé</td></tr>
<tr><td>Rose, rouge, saumon</td><td>Vert (en petite quantité) ou brun à base olive / froide</td><td>Ancien sourcil brun chaud viré au rouge</td><td>Le vert pur se manie avec beaucoup de prudence ; vérifier la conformité réglementaire des correcteurs verts</td></tr>
<tr><td>Orangé, cuivré</td><td>Bleu (en petite quantité) ou brun à base froide (cendrée)</td><td>Ancien sourcil viré à l'orange, surcorrection d'un gris-bleu</td><td>Risque de basculer vers le gris si l'on force ; vérifier la conformité réglementaire des correcteurs bleus</td></tr>
<tr><td>Violet, violacé</td><td>Jaune, jaune-orangé, ocre</td><td>Lèvre foncée à reflet violacé, sourcil viré au violet</td><td>Sur lèvres foncées, on préfère souvent un correcteur orangé (voir section 6.7)</td></tr>
</table>
<p>Rappel réglementaire : les pigments Blue 15:3 et Green 7 sont restreints depuis le 4 janvier 2023 par le règlement (UE) 2020/2081. Les correcteurs bleus et verts utilisés doivent être conformes ; à défaut, on travaille la neutralisation avec des bruns à base froide ou olive conformes.</p>

<h3>Deux méthodes de correction</h3>
<ul>
<li><strong>En deux temps</strong> : on dépose d'abord le correcteur sur la zone virée, on laisse cicatriser complètement, on évalue le résultat, puis on dépose la couleur souhaitée lors d'une séance suivante. Méthode plus lente mais plus contrôlable, adaptée aux virages marqués.</li>
<li><strong>Par mélange</strong> : on intègre une petite proportion de modificateur complémentaire dans le pigment de la couleur finale (par exemple un brun auquel on ajoute un modificateur orangé pour un ancien sourcil gris). Méthode adaptée aux virages légers.</li>
</ul>

<h3>Évaluer la faisabilité</h3>
<p>Une correction par la couleur n'est possible que si l'ancien maquillage est <strong>plus clair ou de valeur proche</strong> de la couleur souhaitée, et si sa <strong>forme</strong> est compatible avec la forme visée. La praticienne refuse ou diffère la correction lorsque :</p>
<ul>
<li>l'ancien maquillage est très foncé ou très saturé : une correction par-dessus ne ferait que l'assombrir ;</li>
<li>l'ancien maquillage déborde largement de la forme souhaitée ou a migré (flou, diffusion) : on ne peut pas réduire une forme en pigmentant ;</li>
<li>la zone présente des cicatrices ou une peau fragilisée par des corrections répétées ;</li>
<li>un ancien dépôt de blanc ou de couleur chair a donné un aspect crayeux.</li>
</ul>
<p>Dans ces cas, la praticienne explique honnêtement les limites et oriente la cliente vers un <strong>médecin</strong> pour envisager une technique d'atténuation ou de détatouage, qui ne relève pas de sa compétence. Une nouvelle pigmentation pourra éventuellement être envisagée ensuite, une fois la zone éclaircie et cicatrisée.</p>

<h3>Le cas de Mme Martine LEROY</h3>
<p>Mme Martine LEROY, 63 ans, porte un ancien maquillage permanent des sourcils, réalisé il y a de nombreuses années ailleurs, aujourd'hui viré au gris-bleu. Elle souhaite retrouver un brun naturel. L'analyse est la suivante :</p>
<table border="1" cellpadding="6">
<tr><th>Élément observé</th><th>Constat</th><th>Conséquence</th></tr>
<tr><td>Couleur de l'ancien maquillage</td><td>Gris-bleu, de valeur moyenne, atténué</td><td>Neutralisation possible par un correcteur orangé ou ocre</td></tr>
<tr><td>Forme</td><td>Légèrement plus basse et plus courte que la forme idéale, sans débordement important, contours un peu flous</td><td>La nouvelle forme peut englober l'ancienne ; pas de réduction nécessaire</td></tr>
<tr><td>Peau</td><td>Peau mature, plus fine, sans cicatrice sur la zone</td><td>Geste léger, tension adaptée</td></tr>
<tr><td>Phototype et sous-ton</td><td>Phototype II à III, sous-ton plutôt froid</td><td>Couleur finale à base neutre à légèrement chaude, pour ne pas reproduire le virage gris</td></tr>
<tr><td>Cheveux</td><td>Gris clair, quelques mèches châtain</td><td>Valeur claire à moyenne : un brun doux, jamais foncé, pour ne pas durcir le visage</td></tr>
</table>
<p>Proposition de la praticienne : une première séance consacrée à la neutralisation du gris-bleu par un correcteur orangé dosé avec prudence, uniquement sur la surface de l'ancien maquillage ; évaluation après cicatrisation complète ; séance suivante avec un brun clair à base légèrement chaude sur la forme complète validée. La cliente est prévenue que plusieurs séances peuvent être nécessaires, que le résultat dépendra de la réaction de sa peau, et que si l'ancien pigment résistait de façon importante, une orientation vers un médecin serait envisagée. Tous les pigments, lots et proportions sont notés.</p>

<blockquote><strong>À retenir.</strong> On neutralise une couleur indésirable par sa complémentaire : orange ou ocre sur gris-bleu, rouge sur vert, vert ou brun olive sur rouge, bleu ou brun cendré sur orangé, jaune ou orangé sur violet. On ne peut pas éclaircir en déposant plus clair. La correction est possible si l'ancien maquillage est de valeur proche ou plus claire et de forme compatible ; sinon, orientation vers un médecin. Les correcteurs bleus et verts doivent être conformes à la restriction (UE) 2020/2081.</blockquote>
`,
      },
      {
        title: "6.6 – Réaliser des mélanges maîtrisés",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Ajuster une teinte par l'ajout d'un modificateur (chaud, froid, plus clair, plus foncé).</li>
<li>Préparer un mélange reproductible et le documenter.</li>
<li>Éviter les mélanges hasardeux qui rendent le résultat imprévisible.</li>
</ul>

<h3>Pourquoi mélanger</h3>
<p>Les gammes de pigments proposent un éventail de teintes prêtes à l'emploi, souvent suffisant. Le mélange permet d'ajuster finement une teinte à la cliente : réchauffer un brun destiné à une peau froide, refroidir un brun destiné à une peau chaude, assombrir légèrement pour des cheveux foncés, intégrer une correction légère. Mais chaque mélange ajoute de l'incertitude : plus il y a de composants, moins l'évolution dans la peau est prévisible.</p>

<h3>Les règles du mélange</h3>
<ol>
<li><strong>Partir de la teinte la plus proche</strong> du résultat visé, et la modifier le moins possible.</li>
<li><strong>Privilégier les mélanges au sein d'une même gamme</strong>, conçue pour être compatible ; mélanger des produits de fabricants différents rend l'évolution imprévisible et la traçabilité plus complexe.</li>
<li><strong>Ajouter le modificateur goutte à goutte</strong>, en mélangeant soigneusement et en évaluant à chaque étape.</li>
<li><strong>Tester la couleur</strong> : déposer une petite touche sur la peau (sur la zone de dessin ou à proximité, sans effraction) ou sur un support blanc, pour juger la teinte ; garder en tête que le résultat cicatrisé sera plus doux.</li>
<li><strong>Documenter</strong> : nom et teinte de chaque pigment, numéros de lot, proportions (par exemple en nombre de gouttes), pour pouvoir reproduire le mélange à la retouche.</li>
<li><strong>Préparer la quantité nécessaire</strong> dans un godet à usage unique ; le reste est éliminé en fin de prestation.</li>
</ol>

<h3>Les modificateurs usuels et leurs effets</h3>
<table border="1" cellpadding="6">
<tr><th>Objectif</th><th>Modificateur</th><th>Effet attendu</th><th>Risque en cas d'excès</th></tr>
<tr><td>Réchauffer un brun</td><td>Modificateur orangé ou jaune-orangé</td><td>Compense un sous-ton froid, limite le virage gris</td><td>Brun cuivré ou orangé</td></tr>
<tr><td>Refroidir un brun</td><td>Modificateur à base olive ou cendrée</td><td>Compense un sous-ton chaud, limite le virage rouge</td><td>Brun grisâtre</td></tr>
<tr><td>Assombrir</td><td>Brun plus foncé de la même base</td><td>Augmente la valeur sans changer la teinte</td><td>Sourcil dur ; éviter le noir pur, qui expose au virage gris-bleu</td></tr>
<tr><td>Éclaircir</td><td>Brun plus clair de la même base</td><td>Diminue la valeur</td><td>Éviter le recours au blanc (dioxyde de titane), qui ternit et se corrige mal</td></tr>
<tr><td>Désaturer (adoucir)</td><td>Petite quantité de la complémentaire</td><td>Teinte plus douce, plus naturelle</td><td>Teinte boueuse, grisâtre</td></tr>
</table>

<h3>Exemple de fiche de mélange (fictif)</h3>
<table border="1" cellpadding="6">
<tr><th>Cliente</th><th>Mme Laura VIDAL – sourcils – première séance</th></tr>
<tr><td>Pigment de base</td><td>Brun clair, base neutre (gamme A), lot noté</td></tr>
<tr><td>Modificateur</td><td>Modificateur orangé (gamme A), lot noté</td></tr>
<tr><td>Proportions</td><td>Base majoritaire, une petite proportion de modificateur, exprimée en gouttes sur la fiche</td></tr>
<tr><td>Justification</td><td>Phototype II, sous-ton froid : compenser légèrement pour éviter le virage gris ; valeur proche des cheveux châtain clair</td></tr>
<tr><td>Test</td><td>Touche sur la zone de dessin, validée avec la cliente</td></tr>
</table>
<p>Les noms de gamme sont volontairement génériques : le cours ne recommande aucune marque.</p>

<blockquote><strong>À retenir.</strong> Un bon mélange part de la teinte la plus proche, reste dans une même gamme, ajoute le modificateur progressivement, est testé et documenté (pigments, lots, proportions). On évite le noir pur pour assombrir et le blanc pour éclaircir. Moins il y a de composants, plus l'évolution dans la peau est prévisible.</blockquote>
`,
      },
      {
        title: "6.7 – Choisir la couleur selon la zone : sourcils, eye-liner, lèvres, taches de rousseur",
        content: `
<h3>Objectifs pédagogiques de la section</h3>
<ul>
<li>Appliquer les règles de colorimétrie à chaque zone traitée.</li>
<li>Adapter le choix au phototype, au sous-ton, aux cheveux et au souhait de la cliente.</li>
<li>Traiter le cas des lèvres à pigmentation foncée ou inégale sur phototype V.</li>
</ul>

<h3>Les sourcils</h3>
<ul>
<li><strong>Valeur</strong> : en règle générale, proche de la couleur des cheveux et des poils naturels ; pour des cheveux très clairs ou blancs, un brun doux un peu plus soutenu que les cheveux, pour structurer sans durcir ; pour des cheveux très foncés, un brun foncé plutôt qu'un noir.</li>
<li><strong>Base</strong> : compensatrice du sous-ton (neutre à légèrement chaude sur sous-ton froid, neutre à légèrement froide sur sous-ton chaud).</li>
<li><strong>Technique</strong> : en technique manuelle, la teinte paraît plus fine et plus claire car déposée en traits ; en technique électrique (poudré), la teinte paraît plus dense : on peut choisir une valeur légèrement plus claire et jouer sur l'intensité.</li>
<li><strong>Jamais de noir pur</strong> aux sourcils : risque élevé de virage gris-bleu et rendu dur.</li>
</ul>

<h3>L'eye-liner</h3>
<ul>
<li>Le noir est la couleur la plus demandée ; il est déposé très superficiellement, au ras des cils, avec une maîtrise rigoureuse de la profondeur, car un dépôt trop profond dans une peau aussi fine expose à la migration et au reflet bleuté.</li>
<li>Des bruns foncés ou un noir adouci conviennent aux clientes qui veulent un effet plus doux, aux peaux très claires et aux peaux matures.</li>
<li>Les couleurs vives (bleus, verts) ne sont pas recommandées en première intention et les pigments concernés doivent respecter la restriction (UE) 2020/2081.</li>
<li>Pour Mme Sophie MARCHAND (fil rouge), un ras de cils dans un brun foncé ou un noir adouci donne une densification naturelle.</li>
</ul>

<h3>Les lèvres</h3>
<p>Les lèvres ont une couleur propre, plus ou moins rosée, rouge, brune ou bleutée, qui se mélange optiquement avec le pigment. Le choix se fait toujours <strong>en tenant compte de la couleur naturelle de la lèvre</strong> :</p>
<table border="1" cellpadding="6">
<tr><th>Lèvre naturelle</th><th>Objectif fréquent</th><th>Approche colorimétrique</th></tr>
<tr><td>Claire et rosée, sous-ton froid</td><td>Effet bonne mine, « lip blush »</td><td>Rose nude ou corail doux ; éviter les roses très froids qui peuvent virer au violacé</td></tr>
<tr><td>Rose à rouge, sous-ton chaud</td><td>Contour net, couleur naturelle</td><td>Rose-beige, nude chaud modéré ; éviter l'excès d'orangé</td></tr>
<tr><td>Bleutée ou violacée</td><td>Unifier, réchauffer</td><td>Neutralisation préalable par un ton orangé ou saumon, puis couleur choisie</td></tr>
<tr><td>Foncée ou à pigmentation inégale (fréquent sur phototypes IV à VI)</td><td>Unifier, redonner un contour net</td><td>Neutralisation des zones foncées par un correcteur orangé ou cuivré adapté, en une ou plusieurs séances ; couleur finale choisie en fonction de la carnation, souvent dans des bruns rosés, terracotta ou baies profonds ; contour légèrement plus soutenu pour la netteté</td></tr>
</table>

<h3>Le cas de Mme Aïcha DIALLO</h3>
<p>Mme Aïcha DIALLO, 41 ans, phototype V, présente des lèvres à pigmentation inégale (zones plus foncées, notamment sur le pourtour et sur la lèvre inférieure, et zones plus claires au centre) et un contour flou. Elle souhaite des lèvres unifiées et un contour net, dans une couleur naturelle.</p>
<ul>
<li><strong>Vérifications</strong> : antécédents d'herpès labial recherchés en C2 ; s'il y en a, avis médical préalable et éventuel traitement préventif prescrit par le médecin ; antécédents de cicatrisation et de chéloïdes vérifiés, compte tenu du phototype ; aucune injection récente sur la zone.</li>
<li><strong>Analyse</strong> : zones foncées à reflet brun-violacé ; zones centrales plus claires et rosées ; carnation foncée à sous-ton chaud.</li>
<li><strong>Stratégie</strong> : première séance de neutralisation des zones foncées avec un correcteur orangé ou cuivré dosé avec prudence, uniquement sur ces zones, et tracé d'un contour net dans un brun rosé profond ; évaluation après cicatrisation complète ; séance suivante pour unifier l'ensemble avec une couleur finale naturelle choisie avec la cliente (brun rosé ou terracotta profond).</li>
<li><strong>Information</strong> : sur une peau riche en mélanine, la couleur cicatrisée paraît plus sombre et plus douce que dans le godet ; plusieurs séances peuvent être nécessaires ; la peau peut réagir par des variations de pigmentation, ce qui justifie une approche progressive.</li>
<li><strong>Traçabilité</strong> : correcteur, couleur finale, lots et proportions notés.</li>
</ul>

<h3>Les taches de rousseur</h3>
<ul>
<li>Couleurs : bruns clairs à moyens, souvent à base chaude (brun doré, caramel), proches des taches naturelles de la cliente ou de la couleur de ses cheveux.</li>
<li>Variété : on peut préparer deux teintes proches (une plus claire, une plus soutenue) pour varier les taches et obtenir un rendu naturel.</li>
<li>Valeur : toujours plus claire que les sourcils ; les taches doivent rester discrètes.</li>
<li>Pour Mme Clara NGUYEN (phototype III, fil rouge), des bruns clairs dorés, en deux nuances, avec une intensité modérée à la première séance.</li>
</ul>

<h3>Synthèse par zone</h3>
<table border="1" cellpadding="6">
<tr><th>Zone</th><th>Repère principal</th><th>À éviter</th></tr>
<tr><td>Sourcils</td><td>Valeur proche des cheveux, base compensatrice du sous-ton</td><td>Noir pur, blanc pour éclaircir</td></tr>
<tr><td>Eye-liner</td><td>Noir ou brun foncé, dépôt très superficiel</td><td>Dépôt profond, couleurs vives non conformes</td></tr>
<tr><td>Lèvres</td><td>Tenir compte de la couleur naturelle ; neutraliser les zones bleutées ou foncées</td><td>Rose froid sur lèvre bleutée, contour très foncé sans fondu</td></tr>
<tr><td>Taches de rousseur</td><td>Bruns clairs dorés, deux nuances</td><td>Couleur trop foncée ou uniforme</td></tr>
</table>

<blockquote><strong>À retenir.</strong> Sourcils : valeur proche des cheveux, base compensatrice, jamais de noir pur. Eye-liner : noir ou brun foncé déposé très superficiellement. Lèvres : la couleur naturelle de la lèvre fait partie du résultat ; les zones bleutées ou foncées sont neutralisées avant la couleur finale, progressivement sur les phototypes foncés. Taches de rousseur : bruns clairs dorés en deux nuances, discrets.</blockquote>
`,
      },
      {
        title: "6.8 – Quiz de fin de chapitre",
        content: `
<p>Pour chaque question, une seule réponse est correcte. Le corrigé figure après chaque question.</p>

<h4>Question 1 – Quelle est la couleur complémentaire du bleu ?</h4>
<ol type="A">
<li>Le vert</li>
<li>Le violet</li>
<li>L'orange</li>
<li>Le jaune</li>
</ol>
<p><strong>Réponse : C.</strong> Sur le cercle chromatique, le bleu est opposé à l'orange. C'est pourquoi un correcteur orangé ou ocre neutralise un ancien maquillage viré au gris-bleu.</p>

<h4>Question 2 – Que désigne la « valeur » d'une couleur ?</h4>
<ol type="A">
<li>Sa place sur le cercle chromatique</li>
<li>Son degré de clarté ou d'obscurité</li>
<li>Sa pureté ou son intensité</li>
<li>Son prix</li>
</ol>
<p><strong>Réponse : B.</strong> La teinte est la place sur le cercle, la saturation la pureté ; la valeur est la clarté.</p>

<h4>Question 3 – Une cliente a des reflets rosés, des veines bleutées et préfère les bijoux argentés. Quel est probablement son sous-ton ?</h4>
<ol type="A">
<li>Chaud</li>
<li>Froid</li>
<li>Neutre</li>
<li>On ne peut rien en déduire</li>
</ol>
<p><strong>Réponse : B.</strong> Ces indices, croisés, orientent vers un sous-ton froid. On choisira plutôt un brun neutre ou légèrement chaud pour éviter un virage gris.</p>

<h4>Question 4 – Pourquoi déconseille-t-on le noir pur pour des sourcils ?</h4>
<ol type="A">
<li>Parce qu'il est interdit par la réglementation</li>
<li>Parce qu'il donne un rendu dur et expose au virage gris-bleu, surtout s'il est déposé trop profondément</li>
<li>Parce qu'il s'efface en quelques jours</li>
<li>Parce qu'il vire toujours au rouge</li>
</ol>
<p><strong>Réponse : B.</strong> Le noir, notamment à base de carbone, est vu à travers la peau avec un reflet bleuté lorsqu'il est trop profond, et il durcit le visage.</p>

<h4>Question 5 – Quel est le rôle du dioxyde de titane dans un pigment, et quelle précaution s'impose ?</h4>
<ol type="A">
<li>Il assombrit ; on l'utilise librement</li>
<li>C'est un blanc qui éclaircit et opacifie ; on l'utilise avec une extrême prudence et jamais pour « effacer » un ancien maquillage</li>
<li>C'est un conservateur sans effet sur la couleur</li>
<li>C'est un correcteur vert</li>
</ol>
<p><strong>Réponse : B.</strong> En excès ou déposé seul, il donne un aspect terne ou crayeux difficile à corriger.</p>

<h4>Question 6 – Depuis quelle date les pigments Blue 15:3 et Green 7 sont-ils restreints par le règlement (UE) 2020/2081 ?</h4>
<ol type="A">
<li>4 janvier 2021</li>
<li>4 janvier 2022</li>
<li>4 janvier 2023</li>
<li>Ils ne sont pas concernés</li>
</ol>
<p><strong>Réponse : C.</strong> La restriction générale est applicable depuis le 4 janvier 2022 ; Blue 15:3 et Green 7 sont restreints depuis le 4 janvier 2023.</p>

<h4>Question 7 – Quelle mention doit figurer sur l'étiquette d'un pigment de maquillage permanent ?</h4>
<ol type="A">
<li>« Produit cosmétique pour usage externe »</li>
<li>« Mélange destiné à être utilisé dans des tatouages ou des maquillages permanents », avec la liste des ingrédients et le numéro de lot</li>
<li>Uniquement le nom de la teinte</li>
<li>Le nom de la praticienne</li>
</ol>
<p><strong>Réponse : B.</strong> Ces éléments confirment l'usage, informent sur la composition et permettent la traçabilité.</p>

<h4>Question 8 – Un ancien sourcil a viré au rose-rouge. Quel correcteur est le plus logique ?</h4>
<ol type="A">
<li>Un orange</li>
<li>Un vert en petite quantité ou un brun à base olive, conforme à la réglementation</li>
<li>Un rose plus clair</li>
<li>Du blanc</li>
</ol>
<p><strong>Réponse : B.</strong> Le vert est complémentaire du rouge. On le dose avec prudence et l'on vérifie la conformité des correcteurs verts.</p>

<h4>Question 9 – Un ancien maquillage des sourcils est très foncé et déborde largement de la forme souhaitée. Que faites-vous ?</h4>
<ol type="A">
<li>Vous déposez un brun clair par-dessus pour l'éclaircir</li>
<li>Vous déposez du blanc sur les débordements</li>
<li>Vous expliquez les limites de la correction par la couleur et orientez la cliente vers un médecin pour envisager une technique d'atténuation, avant toute nouvelle pigmentation</li>
<li>Vous redessinez une forme plus fine et pigmentez</li>
</ol>
<p><strong>Réponse : C.</strong> On ne peut ni éclaircir en déposant plus clair, ni réduire une forme en pigmentant. L'atténuation relève d'un médecin.</p>

<h4>Question 10 – Pour des lèvres foncées à pigmentation inégale sur phototype V, quelle approche est la plus adaptée ?</h4>
<ol type="A">
<li>Un rose froid très clair en une seule séance</li>
<li>Une neutralisation progressive des zones foncées par un correcteur orangé ou cuivré, puis une couleur finale naturelle adaptée à la carnation, en informant la cliente du rendu plus sombre et plus doux après cicatrisation</li>
<li>Du blanc pour unifier</li>
<li>Un noir pour le contour</li>
</ol>
<p><strong>Réponse : B.</strong> Sur peau riche en mélanine, on neutralise d'abord, progressivement, puis on unifie avec une couleur adaptée ; les antécédents d'herpès et de cicatrisation sont vérifiés au préalable.</p>
`,
      },
      {
        title: "6.9 – Cas pratique corrigé : deux diagnostics colorimétriques à l'Institut Ligne & Teint",
        content: `
<h3>Contexte (fictif)</h3>
<p>Nadia FERRAND vous confie la préparation colorimétrique de deux rendez-vous de la semaine. Elle vous demande de rédiger, pour chaque cliente, un diagnostic et une proposition argumentée, à présenter lors de l'entretien.</p>
<ul>
<li><strong>Cliente 1 – Mme Martine LEROY</strong>, 63 ans. Ancien maquillage permanent des sourcils réalisé il y a de nombreuses années, aujourd'hui gris-bleu, de valeur moyenne, atténué, aux contours un peu flous, légèrement plus bas et plus court que la forme idéale. Peau mature, fine, sans cicatrice. Phototype II à III, sous-ton plutôt froid. Cheveux gris clair avec quelques mèches châtain. Elle déclare : « Je veux du brun, comme avant, pas ce gris. » Elle n'a pas d'autre information sur le pigment utilisé à l'époque.</li>
<li><strong>Cliente 2 – Mme Aïcha DIALLO</strong>, 41 ans. Phototype V, sous-ton chaud. Lèvres à pigmentation inégale : pourtour et lèvre inférieure plus foncés à reflet brun-violacé, centre plus clair et rosé, contour flou. Elle souhaite « des lèvres unifiées et un contour net, naturel ». Lors de l'entretien, elle indique avoir eu des épisodes d'herpès labial par le passé.</li>
</ul>

<h3>Consigne</h3>
<ol>
<li>Pour chaque cliente, rédigez le diagnostic colorimétrique (phototype, sous-ton, couleur et état de la zone, éléments à risque).</li>
<li>Expliquez l'origine probable du virage de Mme LEROY et la règle de colorimétrie qui permet de le corriger.</li>
<li>Proposez pour chaque cliente une stratégie en séances, avec le choix des correcteurs et des couleurs finales, sans citer de marque.</li>
<li>Indiquez les vérifications réglementaires et sanitaires préalables.</li>
<li>Rédigez les phrases d'information à donner à chaque cliente.</li>
<li>Indiquez ce qui sera noté sur la fiche cliente.</li>
</ol>

<h3>Corrigé</h3>
<h4>1. Diagnostics</h4>
<table border="1" cellpadding="6">
<tr><th>Élément</th><th>Mme Martine LEROY (sourcils)</th><th>Mme Aïcha DIALLO (lèvres)</th></tr>
<tr><td>Phototype</td><td>II à III</td><td>V</td></tr>
<tr><td>Sous-ton</td><td>Plutôt froid</td><td>Chaud</td></tr>
<tr><td>Couleur de la zone</td><td>Ancien maquillage gris-bleu, valeur moyenne, atténué</td><td>Zones foncées brun-violacé (pourtour, lèvre inférieure), centre plus clair rosé</td></tr>
<tr><td>Forme et état</td><td>Ancien sourcil légèrement plus bas et plus court, contours un peu flous, sans débordement important ; peau mature, fine</td><td>Contour flou ; muqueuse sans lésion le jour de l'entretien</td></tr>
<tr><td>Éléments à risque</td><td>Reproduire le virage gris avec un brun trop froid ; surcorriger vers l'orangé</td><td>Antécédents d'herpès labial ; réactions pigmentaires et cicatricielles à surveiller sur phototype V ; virage violacé si un rose froid est déposé sur les zones foncées</td></tr>
</table>

<h4>2. Origine du virage de Mme LEROY et règle de correction</h4>
<p>Origine probable : un pigment noir ou très foncé, à forte composante froide ou carbone, déposé à l'époque, peut-être trop profondément ; avec le temps, les composants chauds se sont estompés et la couleur restante est vue à travers la peau avec un reflet gris-bleu, accentué par un sous-ton froid. Règle de correction : le bleu se neutralise par sa complémentaire, l'orange ; on utilise un correcteur orangé ou ocre, dosé avec prudence, pour ramener la zone vers un brun neutre, avant de déposer la couleur finale. On ne cherche pas à « couvrir » le gris avec un brun clair, ce qui ne l'éclaircirait pas.</p>

<h4>3. Stratégies</h4>
<table border="1" cellpadding="6">
<tr><th>Séance</th><th>Mme Martine LEROY</th><th>Mme Aïcha DIALLO</th></tr>
<tr><td>Préalable</td><td>Mapping de la nouvelle forme englobant l'ancienne ; validation écrite et photo</td><td>Avis médical préalable compte tenu des antécédents d'herpès labial ; éventuel traitement préventif sur prescription du médecin uniquement ; tracé du contour et validation</td></tr>
<tr><td>Séance 1</td><td>Neutralisation par un correcteur orangé ou ocre conforme, uniquement sur la surface de l'ancien maquillage, geste léger adapté à la peau mature</td><td>Neutralisation des zones foncées par un correcteur orangé ou cuivré conforme, dosé avec prudence ; contour net dans un brun rosé profond</td></tr>
<tr><td>Après cicatrisation complète</td><td>Évaluation : gris neutralisé ou non, absence de reflet cuivré</td><td>Évaluation : homogénéité, réaction de la peau, absence de variation pigmentaire anormale</td></tr>
<tr><td>Séance 2</td><td>Brun clair à base neutre à légèrement chaude sur la forme complète, valeur douce adaptée aux cheveux gris clair</td><td>Unification de l'ensemble avec une couleur finale naturelle choisie avec la cliente (brun rosé ou terracotta profond), en tenant compte de la carnation</td></tr>
<tr><td>Si le résultat est insuffisant</td><td>Nouvelle séance de neutralisation légère, ou orientation vers un médecin si l'ancien pigment résiste fortement</td><td>Séance complémentaire de neutralisation ciblée, après nouvelle cicatrisation complète</td></tr>
</table>

<h4>4. Vérifications préalables</h4>
<ul>
<li>Fiche cliente complète, contre-indications recherchées (pour Mme DIALLO : antécédents d'herpès labial, cicatrisation et chéloïdes, injections récentes ; pour Mme LEROY : traitements en cours, notamment anticoagulants, fréquents à cet âge, avec avis médical le cas échéant).</li>
<li>Information préalable remise (arrêté du 3 décembre 2008) et consentement éclairé signé.</li>
<li>Pigments et correcteurs conformes à REACH et à la restriction (UE) 2020/2081, étiquetés (mention réglementaire, ingrédients, numéro de lot), non périmés ; vigilance particulière sur tout correcteur bleu ou vert.</li>
<li>Autorisation écrite pour les photos au-delà du dossier, si elle est souhaitée.</li>
</ul>

<h4>5. Phrases d'information</h4>
<p><strong>À Mme LEROY :</strong> « Le gris que vous voyez vient de l'ancien pigment, qui a changé de couleur avec le temps. Je ne peux pas l'effacer en mettant un brun clair par-dessus : je vais d'abord le neutraliser avec une teinte orangée, qui s'oppose au bleu, puis, une fois la peau bien cicatrisée, je déposerai un brun doux adapté à vos cheveux. Il faudra au moins deux séances, peut-être davantage, et le résultat dépendra de la façon dont votre peau réagit. Si l'ancien pigment résistait beaucoup, je vous orienterais vers un médecin. »</p>
<p><strong>À Mme DIALLO :</strong> « Comme vous avez déjà eu de l'herpès labial, je vous demande de consulter votre médecin avant la séance : lui seul peut décider d'un éventuel traitement préventif. Pour unifier vos lèvres, je vais d'abord neutraliser les zones plus foncées avec une teinte orangée, puis nous choisirons ensemble la couleur finale. Sur votre carnation, la couleur paraîtra plus sombre et plus douce une fois cicatrisée que dans le godet ; nous avancerons progressivement, en plusieurs séances, pour respecter votre peau. »</p>

<h4>6. Fiche cliente</h4>
<ul>
<li>Diagnostic colorimétrique (phototype, sous-ton, couleur et état de la zone).</li>
<li>Pour chaque séance : correcteur et couleur finale (nom, teinte, numéro de lot, péremption), proportions des mélanges, aiguilles ou cartouches (référence et lot), antiseptique (lot).</li>
<li>Avis médical obtenu (pour Mme DIALLO), validation du dessin signée, photos avant, dessin validé, après.</li>
<li>Observations et date prévue d'évaluation après cicatrisation complète.</li>
</ul>

<h4>Erreurs fréquentes relevées lors de la correction</h4>
<ul>
<li>Proposer pour Mme LEROY un brun foncé « pour couvrir le gris ».</li>
<li>Utiliser du blanc pour éclaircir l'ancien maquillage.</li>
<li>Surdoser le correcteur orangé, au risque d'un sourcil cuivré.</li>
<li>Déposer un rose froid directement sur les zones foncées de Mme DIALLO, avec un risque de rendu violacé.</li>
<li>Proposer soi-même un traitement contre l'herpès au lieu de renvoyer vers le médecin.</li>
<li>Citer une marque de pigment au lieu de raisonner en teinte, base et conformité.</li>
<li>Oublier de noter les lots et les proportions, ce qui rend la séance suivante impossible à ajuster.</li>
</ul>

<blockquote><strong>À retenir.</strong> Un choix de pigment se construit par un diagnostic (phototype, sous-ton, couleur et état de la zone), une règle de colorimétrie (compenser le sous-ton, neutraliser par la complémentaire, ne jamais éclaircir en déposant plus clair), une stratégie progressive évaluée après cicatrisation complète, des produits conformes et étiquetés, une information honnête et une traçabilité complète.</blockquote>
`,
      },
    ],
  },
];
