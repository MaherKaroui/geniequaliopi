import type { CourseChapter } from "../courseContent";

export const MSP21_PARTIE4: CourseChapter[] = [
  {
    title: "Chapitre 10 – Réaliser une correction ou un embellissement des lèvres (C9)",
    description:
      "Jour 3, en présentiel. Compétence C9 – Réaliser une correction ou un embellissement des lèvres. Anatomie et repères morphologiques des lèvres, styles de réalisation (contour, contour estompé, remplissage, effet « lip blush »), précautions et contre-indications propres à la zone (antécédents d'herpès labial, injections esthétiques récentes : avis médical préalable), lèvres foncées des phototypes IV à VI et neutralisation, réglages du dermographe, protocole pas à pas, gestion de l'œdème et de la sensibilité. Étude du cas fil rouge de Mme Aïcha DIALLO (cliente fictive de l'Institut Ligne & Teint, Argenteuil), quiz de 10 questions corrigé et cas pratique corrigé. Entraînement sur peau latex 3D puis réalisation sur modèle.",
    sections: [
      {
        title: "10.1 – Anatomie des lèvres et repères morphologiques",
        content: `<h3>Pourquoi l'anatomie conditionne le résultat</h3>
<p>Les lèvres sont la zone la plus mobile, la plus vascularisée et l'une des plus sensibles du visage. Une prestation de dermopigmentation labiale réussie repose d'abord sur une lecture précise de leur structure : la praticienne qui connaît les repères anatomiques dessine un contour qui respecte la morphologie naturelle, choisit une profondeur adaptée à une peau très fine et anticipe les réactions (œdème, sensibilité, cicatrisation plus rapide mais plus « mouvante » que sur les sourcils).</p>
<p>Le travail porte sur deux tissus différents, qu'il ne faut pas confondre :</p>
<ul>
<li><strong>La peau cutanée péri-labiale</strong> : c'est la peau du visage qui entoure la bouche, avec un épiderme kératinisé, des poils fins et des glandes. Elle est concernée lorsque l'on redessine très légèrement un contour au-delà de la limite naturelle (ce qui doit rester exceptionnel et discret).</li>
<li><strong>Le vermillon</strong> (ou « rouge » des lèvres) : c'est la partie colorée, recouverte d'un épithélium très fin, peu kératinisé, sans glandes sébacées ni sudoripares, sous lequel la vascularisation est très riche, ce qui lui donne sa couleur rosée. Le vermillon est la zone principale du remplissage.</li>
<li><strong>La muqueuse labiale</strong> : c'est la partie humide, à l'intérieur de la bouche. <strong>On ne pigmente jamais la muqueuse</strong> : le pigment n'y tient pas, la zone est exposée à la salive et aux germes de la cavité buccale, et le risque de complication y est plus élevé. La limite entre vermillon sec et muqueuse humide (la « ligne humide ») est la limite intérieure du travail.</li>
</ul>
<h3>Les repères à connaître et à nommer</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Repère</th><th>Description</th><th>Intérêt pour la dermopigmentation</th></tr>
<tr><td>Ligne cutanéo-muqueuse (bord du vermillon)</td><td>Limite nette entre la peau du visage et le vermillon ; souvent soulignée par un fin bourrelet clair.</td><td>C'est la ligne de référence du contour. Avec l'âge, elle s'estompe : la redessiner redonne de la définition.</td></tr>
<tr><td>Arc de Cupidon</td><td>Courbe en double arc de la lèvre supérieure, avec deux sommets (les « pics ») et un creux central.</td><td>Repère de symétrie principal. Les deux pics doivent être à la même hauteur et à égale distance de l'axe médian.</td></tr>
<tr><td>Philtrum et colonnes du philtrum</td><td>Gouttière verticale entre le nez et la lèvre supérieure, bordée de deux reliefs (les colonnes).</td><td>Les colonnes aboutissent aux pics de l'arc de Cupidon : elles aident à les placer.</td></tr>
<tr><td>Tubercule labial</td><td>Petit renflement médian de la lèvre supérieure.</td><td>À respecter : un contour trop rectiligne efface le relief naturel.</td></tr>
<tr><td>Commissures labiales</td><td>Points de jonction des deux lèvres, aux coins de la bouche.</td><td>Zone fine et mobile ; le contour s'y affine et ne doit jamais « tomber » vers le bas.</td></tr>
<tr><td>Ligne humide</td><td>Limite intérieure entre vermillon sec et muqueuse humide.</td><td>Limite intérieure du remplissage : on ne la dépasse pas.</td></tr>
<tr><td>Axe médian du visage</td><td>Ligne verticale passant par le milieu du front, l'arête du nez et le centre de la bouche.</td><td>Base de toutes les mesures de symétrie.</td></tr>
</table>
<h3>Proportions et visagisme labial</h3>
<p>Il n'existe pas de « bouche idéale » unique : l'objectif est l'harmonie avec le visage de la cliente et le respect de son identité. Quelques repères aident néanmoins à construire le dessin :</p>
<ul>
<li><strong>La largeur de la bouche</strong> se lit souvent par rapport à la position des pupilles ou de l'iris quand la cliente regarde droit devant : des commissures qui s'arrêtent bien en deçà donnent une bouche étroite, au-delà une bouche large. On ne cherche pas à modifier fortement la largeur : prolonger une commissure au-delà de sa limite naturelle donne un résultat artificiel.</li>
<li><strong>Le rapport entre lèvre supérieure et lèvre inférieure</strong> : la lèvre inférieure est en général un peu plus pleine que la lèvre supérieure. Une lèvre supérieure très fine peut être légèrement redessinée sur la ligne cutanéo-muqueuse, mais jamais « débordée » de manière visible.</li>
<li><strong>L'asymétrie naturelle</strong> : la plupart des bouches sont légèrement asymétriques (un pic plus haut, une commissure plus basse, un côté plus charnu). Le dessin préparatoire corrige les asymétries visibles <em>dans les limites de ce que la peau permet</em> et en accord avec la cliente.</li>
<li><strong>La bouche en mouvement</strong> : la praticienne observe la cliente qui parle, sourit, pince les lèvres. Un contour qui paraît parfait bouche fermée peut se déformer au sourire.</li>
</ul>
<h3>Ce que l'âge et le mode de vie changent</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Observation</th><th>Conséquence pour la prestation</th></tr>
<tr><td>Contour qui s'estompe, perte de définition de l'arc de Cupidon</td><td>Le contour (éventuellement estompé) redonne de la netteté ; dessin sobre, couleur proche du naturel.</td></tr>
<tr><td>Ridules verticales péri-labiales (« code-barres »)</td><td>Ne pas déborder sur la peau ridée : le pigment pourrait fuser dans les ridules. Contour légèrement intérieur.</td></tr>
<tr><td>Lèvres très sèches, desquamation</td><td>Préparer la zone en amont (hydratation recommandée par la praticienne dans les jours précédents, sans promesse de résultat) ; reporter si fissures ou lésions.</td></tr>
<tr><td>Tabagisme</td><td>Lèvres parfois plus foncées ou ternes, cicatrisation pouvant être moins régulière : l'expliquer à la cliente sans jugement.</td></tr>
<tr><td>Lèvres naturellement foncées ou à pigmentation inégale</td><td>Étude de colorimétrie spécifique et neutralisation éventuelle (voir 10.4).</td></tr>
<tr><td>Cicatrice (chirurgie, fente labiale opérée, accident)</td><td>Évaluation prudente : la peau cicatricielle prend le pigment de manière imprévisible ; avis médical selon l'histoire de la cicatrice ; test sur une petite zone éventuellement, et attentes réalistes.</td></tr>
</table>
<p><strong>À retenir :</strong> on travaille sur le vermillon et sa limite, jamais sur la muqueuse ; l'arc de Cupidon et l'axe médian sont les deux repères de symétrie ; on respecte la bouche de la cliente plutôt que d'imposer une forme à la mode.</p>`,
      },
      {
        title: "10.2 – Les styles de réalisation : contour, contour estompé, remplissage, « lip blush »",
        content: `<h3>Quatre familles d'effets</h3>
<p>Le choix du style découle de l'entretien conseil (C1), de l'évaluation de la peau (C2) et de la morphologie. Il se décide avec la cliente, photos ou dessin à l'appui, et il est consigné sur la fiche cliente. La praticienne explique toujours qu'un maquillage semi-permanent des lèvres n'est <strong>pas un rouge à lèvres</strong> : la couleur cicatrisée est plus douce, plus transparente et plus naturelle que la couleur visible juste après la séance.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Style</th><th>Description</th><th>Indications</th><th>Points de vigilance</th></tr>
<tr><td><strong>Contour</strong> (contour net)</td><td>Ligne fine et régulière qui suit la ligne cutanéo-muqueuse.</td><td>Redonner une limite nette à une bouche dont le contour s'est effacé ; corriger une légère asymétrie.</td><td>Un contour seul, plus foncé que la lèvre, peut donner un effet « crayon des années passées » quand il s'atténue. On le choisit proche de la couleur naturelle et on évite le contraste fort.</td></tr>
<tr><td><strong>Contour estompé</strong></td><td>Ligne de contour dont la couleur se dégrade progressivement vers l'intérieur de la lèvre, sur quelques millimètres.</td><td>Définition naturelle sans effet de trait ; transition douce entre contour et lèvre.</td><td>Le dégradé doit être homogène sur tout le pourtour ; attention aux zones de commissures, plus fines.</td></tr>
<tr><td><strong>Remplissage</strong> (total)</td><td>Pigmentation de l'ensemble du vermillon, contour compris, avec une couleur homogène.</td><td>Uniformiser une lèvre à pigmentation irrégulière ; donner de la couleur à des lèvres pâles.</td><td>Séance plus longue ; œdème plus marqué ; choix de couleur crucial (on vit avec la couleur tous les jours).</td></tr>
<tr><td><strong>Effet « lip blush »</strong></td><td>Remplissage léger, en voile, travaillé par petites touches superposées (ombrage), qui laisse transparaître la lèvre naturelle ; aspect « baume teinté ».</td><td>Clientes qui souhaitent un résultat très naturel, « bonne mine », sans effet maquillé.</td><td>Résultat moins couvrant et plus progressif ; la retouche est souvent nécessaire pour atteindre l'intensité voulue ; le dire dès le devis.</td></tr>
</table>
<h3>Choisir avec la cliente</h3>
<p>Une démarche structurée évite les malentendus :</p>
<ol>
<li><strong>Clarifier l'attente</strong> : « Que voulez-vous voir le matin dans le miroir ? » Plus de définition, plus de couleur, plus d'homogénéité, une impression de volume ?</li>
<li><strong>Montrer</strong> des exemples de résultats cicatrisés (photos de l'institut, avec autorisation de droit à l'image des modèles), et non des photos prises juste après la séance.</li>
<li><strong>Expliquer les limites</strong> : le maquillage semi-permanent ne crée pas de volume réel ; il peut seulement donner une impression de bouche mieux définie. Il ne remplace pas un acte médical.</li>
<li><strong>Dessiner</strong> au crayon dermatologique et faire valider face au miroir, bouche au repos et en mouvement.</li>
<li><strong>Consigner</strong> le choix (style, couleur, références et numéros de lot des pigments) sur la fiche cliente.</li>
</ol>
<h3>Combiner les styles</h3>
<p>Les combinaisons sont fréquentes : contour estompé plus « lip blush », ou contour discret plus remplissage léger. La règle reste la même : <strong>le contour ne doit jamais être nettement plus foncé que le remplissage</strong>, faute de quoi le vieillissement de la couleur fera ressortir une ligne marquée. On préfère une différence de nuance légère, que l'œil perçoit comme une définition et non comme un trait.</p>
<h3>Couleurs et intentions</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Intention</th><th>Famille de couleurs</th><th>Commentaire</th></tr>
<tr><td>Naturel, « ma bouche en mieux »</td><td>Roses doux, nudes rosés, beiges rosés proches de la couleur naturelle de la lèvre</td><td>Choix le plus sûr pour une première prestation.</td></tr>
<tr><td>Bonne mine, fraîcheur</td><td>Roses corail, pêche, rose framboise léger</td><td>Les tons chauds réchauffent les lèvres à sous-ton bleuté.</td></tr>
<tr><td>Plus maquillé</td><td>Rouges, framboises, prunes</td><td>À réserver aux clientes qui portent déjà ces couleurs au quotidien ; on reste un ton en dessous de l'effet souhaité, la retouche permettant d'intensifier.</td></tr>
<tr><td>Uniformisation de lèvres foncées</td><td>Neutralisation puis couleur finale chaude</td><td>Démarche en plusieurs séances ; voir 10.4.</td></tr>
</table>
<p><strong>Règle de colorimétrie rappelée (C5)</strong> : la couleur finale résulte de la superposition du pigment et de la couleur naturelle de la lèvre, vue à travers l'épiderme. Une lèvre à sous-ton bleuté « refroidit » un rose froid, qui peut tourner au violacé ; on choisit alors un rose légèrement plus chaud. À l'inverse, une lèvre déjà très chaude supporte mieux un rose neutre.</p>`,
      },
      {
        title: "10.3 – Précautions, contre-indications et information de la cliente",
        content: `<h3>Le principe : vérifier, informer, orienter</h3>
<p>La zone labiale cumule plusieurs facteurs de risque : peau très fine, vascularisation abondante, proximité de la cavité buccale et de ses germes, réactivation possible d'un herpès labial. Avant toute prestation, la praticienne reprend le questionnaire de santé recueilli lors de l'évaluation personnalisée (C2) et le complète par des questions propres aux lèvres. <strong>Elle ne pose pas de diagnostic et ne prescrit rien</strong> : dès qu'une situation sort du cadre, elle demande un avis médical préalable et reporte la prestation si nécessaire.</p>
<h3>Situations demandant un avis médical préalable</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Pourquoi c'est important</th><th>Conduite à tenir</th></tr>
<tr><td><strong>Antécédents d'herpès labial</strong> (« boutons de fièvre »)</td><td>L'effraction cutanée et l'irritation de la zone peuvent favoriser une poussée d'herpès, qui compromet la cicatrisation et le résultat.</td><td>Informer la cliente ; lui demander de consulter son médecin avant la prestation ; un traitement préventif éventuel est <strong>prescrit par le médecin</strong>, jamais conseillé ni fourni par la praticienne. Noter sur la fiche que l'information a été donnée.</td></tr>
<tr><td><strong>Poussée d'herpès en cours</strong> ou lésion active sur la zone</td><td>Affection cutanée active : contre-indication à la prestation sur la zone.</td><td>Reporter ; la cliente consulte son médecin ; nouvelle date après guérison complète et accord médical si besoin.</td></tr>
<tr><td><strong>Injections esthétiques récentes sur les lèvres</strong> (produits de comblement notamment)</td><td>Le volume et la forme de la lèvre peuvent encore évoluer ; la zone peut être inflammatoire ; le dessin réalisé sur une lèvre en cours de modification risque d'être décalé.</td><td>Demander l'avis du médecin qui a réalisé l'injection sur le délai à respecter ; ne pas fixer soi-même de délai chiffré ; consigner la réponse.</td></tr>
<tr><td>Grossesse, allaitement</td><td>Précaution générale : on ne réalise pas de dermopigmentation sans avis médical.</td><td>Proposer de reporter ; avis médical préalable.</td></tr>
<tr><td>Traitement anticoagulant</td><td>Saignement plus important, pigment mal retenu, hématomes.</td><td>Avis médical préalable ; ne jamais conseiller d'interrompre un traitement.</td></tr>
<tr><td>Diabète non équilibré, troubles de la cicatrisation, tendance aux chéloïdes</td><td>Cicatrisation plus lente ou anormale, risque infectieux.</td><td>Avis médical préalable.</td></tr>
<tr><td>Traitement par isotrétinoïne</td><td>Peau et lèvres très sèches et fragiles, cicatrisation perturbée.</td><td>Avis médical préalable.</td></tr>
<tr><td>Chimiothérapie ou radiothérapie en cours</td><td>Défenses immunitaires et cicatrisation altérées.</td><td>Avis médical préalable ; en pratique, report.</td></tr>
<tr><td>Allergies connues</td><td>Risque de réaction aux pigments ou aux produits utilisés (antiseptique, gants, crème).</td><td>Recenser les allergies ; avis médical ; vérifier la composition des produits (étiquetage des pigments, liste des ingrédients).</td></tr>
<tr><td>Soins dentaires récents ou prévus</td><td>Bouche maintenue ouverte longtemps, manipulations de la zone, irritation.</td><td>Organiser le calendrier pour éviter de cumuler soins dentaires et cicatrisation ; en parler avec la cliente.</td></tr>
</table>
<h3>L'anesthésie : une limite stricte</h3>
<p>La zone labiale est sensible et les clientes posent souvent la question d'une « crème anesthésiante ». La règle à appliquer est claire : <strong>la professionnelle ne prescrit, n'injecte ni ne fournit aucun produit anesthésiant relevant du médicament</strong>. Toute question sur ce sujet est renvoyée vers le médecin ou le pharmacien de la cliente. La praticienne agit sur le confort par d'autres moyens : explication du déroulé, pauses, installation confortable, gestes doux et maîtrisés, réglages adaptés du dermographe.</p>
<h3>L'information préalable et le consentement</h3>
<p>Conformément à l'<strong>arrêté du 3 décembre 2008</strong>, la cliente reçoit, avant la prestation, une information écrite sur les risques et sur les précautions à respecter après la réalisation ; cette information fait aussi l'objet d'un affichage dans l'institut. Pour les lèvres, la praticienne insiste particulièrement sur :</p>
<ul>
<li>l'<strong>œdème</strong> attendu dans les heures et jours qui suivent ;</li>
<li>l'aspect <strong>très soutenu</strong> de la couleur juste après la séance, puis l'éclaircissement pendant la cicatrisation, avec parfois une phase où la couleur semble presque disparaître avant de remonter ;</li>
<li>le risque de <strong>poussée d'herpès</strong> chez les personnes prédisposées ;</li>
<li>la <strong>nécessité probable d'une retouche</strong> après cicatrisation complète, la tenue du pigment sur les lèvres étant plus variable que sur d'autres zones ;</li>
<li>les consignes post-prestation spécifiques (voir chapitre 12).</li>
</ul>
<p>Le <strong>consentement éclairé</strong> est signé après cette information, une fois le dessin validé. Pour une cliente mineure, la prestation est interdite sans le consentement écrit d'une personne titulaire de l'autorité parentale ou du tuteur (article R1311-11 du code de la santé publique) ; en pratique, la plupart des instituts choisissent de ne pas réaliser de lèvres sur des mineures, ce qui relève de leur politique commerciale.</p>
<h3>Les questions à poser spécifiquement</h3>
<ul>
<li>« Avez-vous déjà eu des boutons de fièvre ? À quelle fréquence ? »</li>
<li>« Avez-vous eu des injections dans les lèvres ? Quand, et avec quel praticien ? »</li>
<li>« Avez-vous déjà eu un maquillage permanent des lèvres ? Avec quelle couleur ? »</li>
<li>« Avez-vous des soins dentaires prévus dans les semaines à venir ? »</li>
<li>« Avez-vous des lèvres sèches, qui pèlent ou qui se fendillent souvent ? »</li>
<li>« Quelle couleur de rouge à lèvres portez-vous le plus souvent ? »</li>
</ul>
<p><strong>À retenir :</strong> herpès labial et injections récentes = avis médical préalable, sans délai chiffré inventé ; aucune anesthésie médicamenteuse fournie ; information écrite avant la prestation et consentement signé après validation du dessin.</p>`,
      },
      {
        title: "10.4 – Lèvres foncées (phototypes IV à VI) et neutralisation",
        content: `<h3>Comprendre la pigmentation naturelle des lèvres</h3>
<p>Chez les personnes de phototype IV, V ou VI, les lèvres présentent souvent une pigmentation mélanique plus importante, parfois <strong>inégale</strong> : contour plus foncé que le centre, lèvre inférieure bicolore (partie externe foncée, partie interne rosée), taches plus sombres. Cette pigmentation est naturelle ; elle n'est pas un défaut. Certaines clientes souhaitent pourtant une couleur plus homogène, ou plus rosée, et c'est une demande fréquente en institut.</p>
<p>La difficulté est colorimétrique : un pigment rose ou rouge appliqué directement sur une lèvre à fond brun-violacé ne donne pas du rose. L'œil perçoit le mélange optique du pigment et du fond, vu à travers l'épiderme : le résultat tend vers le <strong>violet, le prune ou le grisâtre</strong>, souvent terne.</p>
<h3>Le principe de la neutralisation</h3>
<p>La neutralisation applique la règle des <strong>couleurs complémentaires</strong> vue en C5 : deux couleurs opposées sur le cercle chromatique se neutralisent mutuellement. Le fond des lèvres foncées présente généralement une dominante froide (bleu-violet). On utilise donc d'abord un pigment correcteur de la famille <strong>orangée ou orangé-saumoné</strong>, qui atténue la dominante froide et éclaircit visuellement le fond. Une fois la cicatrisation complète obtenue, on évalue le résultat, puis on applique la couleur finale.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Observation du fond de la lèvre</th><th>Dominante</th><th>Famille correctrice envisageable</th><th>Couleur finale conseillée</th></tr>
<tr><td>Brun-violacé, aspect « froid »</td><td>Bleu-violet</td><td>Orangé, orangé-saumon</td><td>Tons chauds : corail, rose chaud, terracotta, brique</td></tr>
<tr><td>Brun foncé avec reflets gris</td><td>Bleu-gris</td><td>Orangé chaud</td><td>Nude chaud, caramel rosé, brique</td></tr>
<tr><td>Brun chaud homogène</td><td>Jaune-orangé</td><td>En général pas de neutralisation forte ; travail direct possible avec une couleur choisie après test</td><td>Rouges chauds, framboise chaude, nudes profonds</td></tr>
<tr><td>Lèvre bicolore (externe foncée, interne rosée)</td><td>Variable selon les zones</td><td>Neutralisation localisée de la zone foncée seulement</td><td>Couleur finale unique, posée sur l'ensemble après cicatrisation</td></tr>
</table>
<p>Ces correspondances sont des <strong>repères pédagogiques</strong> : le choix réel se fait sur la peau de la cliente, à la lumière du jour, avec des touches d'essai et en s'appuyant sur les fiches techniques du fabricant des pigments (nuancier, recommandations d'usage).</p>
<h3>Les règles de prudence</h3>
<ul>
<li><strong>Annoncer un parcours en plusieurs séances</strong> : neutralisation, cicatrisation complète, évaluation, puis couleur finale et éventuellement retouche. Ne jamais promettre un résultat en une seule séance.</li>
<li><strong>Ne pas chercher à « blanchir » la lèvre</strong> : l'objectif est d'atténuer la dominante froide et d'homogénéiser, pas d'obtenir une lèvre claire, ce qui serait artificiel et souvent irréalisable.</li>
<li><strong>Éviter les pigments trop clairs ou trop blancs</strong> utilisés pour « éclaircir » : ils donnent un aspect crayeux et peuvent ressortir de manière inesthétique.</li>
<li><strong>Doser la profondeur</strong> : une effraction trop profonde sur peau foncée favorise une diffusion floue et un virage grisé ; rester à la jonction dermo-épidermique.</li>
<li><strong>Anticiper les troubles pigmentaires</strong> : les peaux foncées peuvent réagir à l'inflammation par une hyperpigmentation post-inflammatoire, ou plus rarement une dépigmentation. Travailler avec douceur, limiter les passages, ne pas « surtravailler » la zone. Au moindre antécédent de ce type, en parler avec la cliente et demander un avis médical si nécessaire.</li>
<li><strong>Photographier</strong> à chaque étape, à la même lumière, pour objectiver l'évolution (avec l'autorisation de la cliente).</li>
</ul>
<h3>Le test de couleur</h3>
<p>Avant la séance, la praticienne pose de petites touches de pigment (sans effraction) sur le dos de la main de la cliente ou sur un support, et les compare à la lèvre ; elle peut aussi utiliser des crayons ou des rouges de teinte voisine pour simuler l'effet. Cette étape ne remplace pas l'expérience : elle aide la cliente à se projeter et ouvre la discussion. Le choix final et les numéros de lot sont inscrits sur la fiche cliente.</p>
<h3>Exemple de raisonnement</h3>
<p>Une cliente de phototype V présente un contour labial brun foncé à dominante violacée, un centre rosé et souhaite « une bouche plus uniforme, rosée mais naturelle ». Raisonnement de la praticienne :</p>
<ol>
<li>Dominante froide sur le contour : neutralisation localisée avec une famille orangée, en voile léger.</li>
<li>Cicatrisation complète (environ 4 à 6 semaines), photo comparative.</li>
<li>Couleur finale : rose chaud ou corail profond sur l'ensemble du vermillon, en « lip blush » pour garder un aspect naturel.</li>
<li>Retouche éventuelle après une nouvelle cicatrisation complète.</li>
</ol>
<p>Ce raisonnement est expliqué à la cliente, avec le nombre prévisible de séances, et figure sur le devis.</p>`,
      },
      {
        title: "10.5 – Matériel et réglages pour la zone labiale (application de C6)",
        content: `<h3>Les spécificités techniques des lèvres</h3>
<p>La compétence C6 (sélectionner le dermographe, la taille des aiguilles et la vitesse d'effraction en fonction de la zone et de l'effet attendu, adapter son mouvement et sa pression) prend ici une importance particulière : la peau du vermillon est fine, souple, très mobile, et elle saigne et gonfle facilement. La technique labiale est presque exclusivement <strong>électrique</strong> (dermographe) ; la technique manuelle de type microblading est réservée aux sourcils et ne s'emploie pas sur les lèvres.</p>
<h3>Choix du matériel</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Choix conseillé</th><th>Justification</th></tr>
<tr><td>Dermographe</td><td>Appareil rotatif ou à cartouches, réglable en vitesse, stable, léger et maniable</td><td>La précision du contour exige un appareil qui ne vibre pas excessivement ; la souplesse de réglage permet de passer du contour au remplissage.</td></tr>
<tr><td>Aiguilles pour le contour</td><td>Configurations fines, à une ou quelques pointes (aiguilles rondes de petit diamètre)</td><td>Tracé net, précis, maîtrisé sur la ligne cutanéo-muqueuse.</td></tr>
<tr><td>Aiguilles pour le remplissage et le « lip blush »</td><td>Configurations groupées (rondes groupées, magnum ou équivalent selon le fabricant)</td><td>Couverture plus rapide et plus homogène, moins de passages, donc moins de traumatisme.</td></tr>
<tr><td>Cartouches avec membrane</td><td>Cartouches stériles à usage unique munies d'un système anti-reflux</td><td>Limite la remontée de fluides vers l'appareil ; sécurité hygiénique.</td></tr>
<tr><td>Protections</td><td>Housse à usage unique pour le dermographe et son cordon</td><td>Obligation d'hygiène : protéger tout ce qui ne peut pas être stérilisé.</td></tr>
<tr><td>Consommables</td><td>Compresses stériles, cupules à pigment à usage unique, crayon dermatologique, écarteur ou doigts gantés pour la tension</td><td>Usage unique, champ stérile, traçabilité.</td></tr>
</table>
<p>La taille exacte des aiguilles et la vitesse dépendent du matériel et des recommandations de son fabricant : la praticienne se réfère à la notice et à ses essais sur peau latex 3D. Le formulaire d'entraînement de la formation propose une fiche de réglages à compléter pour chaque appareil utilisé.</p>
<h3>Vitesse, profondeur, angle et tension</h3>
<ul>
<li><strong>Profondeur</strong> : l'objectif est la jonction dermo-épidermique. Sur les lèvres, la peau est fine : la sortie d'aiguille est réduite et la pression légère. Trop profond, le pigment migre, le contour devient flou et la couleur peut virer au bleuté ; trop superficiel, le pigment est éliminé pendant la cicatrisation.</li>
<li><strong>Vitesse</strong> : une vitesse régulière, adaptée à l'appareil, permet un dépôt homogène ; on adapte la vitesse de déplacement de la main à la vitesse de l'appareil (mouvement lent avec vitesse élevée pour un tracé dense, mouvement plus rapide pour un voile léger).</li>
<li><strong>Angle</strong> : pour le contour, l'aiguille est tenue quasiment perpendiculaire à la peau ; pour le remplissage en ombrage, on peut légèrement incliner selon la technique enseignée.</li>
<li><strong>Tension</strong> : une tension de la peau suffisante mais non excessive (deux doigts de la main non dominante, ou écarteur) évite que l'aiguille « accroche » la peau souple de la lèvre. Une tension trop forte déforme le dessin.</li>
<li><strong>Mouvements</strong> : petits cercles serrés, mouvements de va-et-vient courts (« pendule ») ou points rapprochés selon l'effet recherché ; toujours par petites zones, en vérifiant la régularité.</li>
</ul>
<h3>Le travail par passages</h3>
<p>On procède par <strong>passages successifs légers</strong> plutôt que par un passage unique appuyé. Entre deux passages, la praticienne essuie la zone avec une compresse stérile, observe la saturation et l'homogénéité, et ajuste. Multiplier inutilement les passages sur une même zone augmente l'œdème et le traumatisme : on vise la juste saturation, en sachant qu'une retouche est prévue.</p>
<h3>Entraînement sur peau latex 3D</h3>
<p>Avant le modèle, chaque stagiaire réalise sur peau latex 3D en forme de bouche :</p>
<ol>
<li>un tracé de contour suivant l'arc de Cupidon, à main levée, avec contrôle de la symétrie ;</li>
<li>un contour estompé avec dégradé régulier sur quelques millimètres ;</li>
<li>un remplissage homogène sur une demi-lèvre ;</li>
<li>un « lip blush » en voile sur l'autre demi-lèvre, pour comparer les deux effets.</li>
</ol>
<p>La formatrice évalue la régularité du tracé, l'homogénéité, le respect des limites (pas de pigment au-delà de la ligne humide dessinée sur le latex) et la posture. La peau latex ne reproduit ni le saignement, ni l'œdème, ni la mobilité : c'est pourquoi le passage sur modèle est accompagné pas à pas.</p>`,
      },
      {
        title: "10.6 – Protocole pas à pas d'une prestation lèvres",
        content: `<h3>Vue d'ensemble</h3>
<p>Le protocole ci-dessous intègre l'ensemble des compétences mobilisées : C1 et C2 (besoins, évaluation, documents), C3 (poste et hygiène), C4 (préparation de la zone), C5 (pigments), C6 (réglages), C9 (réalisation) et C11 (soins post-prestation). Il sert de trame à l'entraînement sur modèle et à la mise en situation devant le jury.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Actions</th><th>Points de contrôle</th></tr>
<tr><td>1. Accueil et vérifications</td><td>Accueillir la cliente, relire la fiche cliente, le questionnaire de santé et les éventuels avis médicaux ; vérifier l'absence de lésion, de poussée d'herpès, d'injection récente non validée.</td><td>Aucune contre-indication non levée ; information préalable remise ; photos « avant » réalisées avec autorisation.</td></tr>
<tr><td>2. Préparation du poste</td><td>Désinfection des surfaces ; friction hydroalcoolique ; mise en place du champ stérile ; préparation du matériel stérile à usage unique ; housse du dermographe et du cordon ; collecteur pour objets piquants-coupants à portée de main.</td><td>Ordre logique propre / sale respecté ; matériel complet avant de commencer ; numéros de lot notés.</td></tr>
<tr><td>3. Installation de la cliente</td><td>Installation confortable, tête soutenue, éclairage adapté ; protection des vêtements ; explication du déroulé.</td><td>Cliente informée, rassurée ; posture ergonomique de la praticienne.</td></tr>
<tr><td>4. Préparation de la zone</td><td>Démaquillage ; observation de la lèvre au repos et en mouvement ; antisepsie de la peau avec un produit adapté à la zone.</td><td>Zone propre, sèche, sans résidu gras.</td></tr>
<tr><td>5. Dessin préparatoire</td><td>Tracer l'axe médian, placer les pics de l'arc de Cupidon, les commissures, le point le plus bas de la lèvre inférieure ; dessiner le contour au crayon dermatologique ; vérifier la symétrie (mesures, recul, miroir).</td><td>Dessin validé par la cliente face au miroir ; consentement signé après validation.</td></tr>
<tr><td>6. Choix et préparation du pigment</td><td>Sélection selon le phototype, le sous-ton, la couleur naturelle de la lèvre et la demande ; éventuel mélange ; homogénéisation ; dépôt dans une cupule à usage unique.</td><td>Référence et numéro de lot inscrits ; date de péremption vérifiée ; étiquetage conforme (mention relative à l'usage en tatouage ou maquillage permanent, ingrédients, lot).</td></tr>
<tr><td>7. Réglages</td><td>Mise en place de la cartouche ou de l'aiguille ; réglage de la vitesse et de la sortie d'aiguille ; essai sur un support.</td><td>Fonctionnement régulier, sans vibration anormale.</td></tr>
<tr><td>8. Contour</td><td>Tracé du contour par petites sections, en suivant le dessin, peau tendue ; essuyage régulier ; contrôle de la symétrie.</td><td>Trait régulier, respect du dessin, pas de débordement.</td></tr>
<tr><td>9. Remplissage ou « lip blush »</td><td>Travail par zones, de l'extérieur vers l'intérieur ou selon la technique enseignée ; passages légers successifs ; arrêt à la ligne humide.</td><td>Homogénéité, saturation adaptée, pas de pigment sur la muqueuse.</td></tr>
<tr><td>10. Contrôle final</td><td>Nettoyage doux avec compresse stérile ; observation sous différents angles ; correction des zones manquantes ; présentation du résultat à la cliente en expliquant l'évolution de la couleur.</td><td>Résultat cohérent avec le dessin validé ; cliente informée de l'aspect temporaire (œdème, couleur intense).</td></tr>
<tr><td>11. Soins immédiats</td><td>Application d'une fine couche du produit de soin recommandé par la praticienne ; remise et explication des consignes écrites ; date de la retouche proposée.</td><td>Consignes écrites remises et comprises ; rendez-vous de contrôle fixé.</td></tr>
<tr><td>12. Remise en état et traçabilité</td><td>Élimination des aiguilles et cartouches dans le collecteur pour objets piquants-coupants ; autres déchets souillés dans la filière DASRI ; retrait des protections ; désinfection des surfaces ; complétion de la fiche cliente (lots, réglages, couleurs, observations, photos).</td><td>Aucun objet piquant hors collecteur ; fiche complète et signée ; poste prêt pour la cliente suivante.</td></tr>
</table>
<h3>Durée et rythme</h3>
<p>Une prestation lèvres complète, avec accueil, dessin, réalisation et consignes, demande un temps important. La praticienne prévoit des <strong>pauses</strong> pour la cliente (la bouche reste longtemps dans la même position) et évite de programmer une prestation lèvres en fin de journée lorsqu'elle est fatiguée : la précision du contour en dépend.</p>
<h3>Les erreurs les plus fréquentes</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Erreur</th><th>Conséquence</th><th>Prévention</th></tr>
<tr><td>Contour dessiné au-delà de la limite naturelle pour « faire du volume »</td><td>Effet artificiel, contour visible sur la peau quand la couleur s'atténue, risque de fusée dans les ridules.</td><td>Rester sur la ligne cutanéo-muqueuse ; expliquer les limites dès le devis.</td></tr>
<tr><td>Contour beaucoup plus foncé que le remplissage</td><td>Effet « crayon » vieillissant.</td><td>Écart de nuance léger seulement.</td></tr>
<tr><td>Pigmentation de la muqueuse</td><td>Pigment non tenu, irrégularités, risque infectieux.</td><td>S'arrêter à la ligne humide, bien la repérer avant de commencer.</td></tr>
<tr><td>Profondeur excessive</td><td>Flou, migration, virage bleuté, cicatrisation plus longue.</td><td>Sortie d'aiguille réduite, pression légère, entraînement sur latex.</td></tr>
<tr><td>Surtravail de la zone</td><td>Œdème important, croûtes épaisses, cicatrisation irrégulière.</td><td>Passages légers et contrôlés ; accepter une retouche.</td></tr>
<tr><td>Couleur choisie sans tenir compte du fond de la lèvre</td><td>Virage violacé ou terne.</td><td>Analyse colorimétrique (C5), neutralisation si nécessaire.</td></tr>
</table>`,
      },
      {
        title: "10.7 – Œdème, sensibilité et confort de la cliente",
        content: `<h3>Ce qui est normal</h3>
<p>Après une prestation lèvres, plusieurs réactions sont <strong>attendues et transitoires</strong>. Les connaître permet de rassurer la cliente et de distinguer les suites normales d'une complication qui justifie une orientation médicale.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Réaction</th><th>Description</th><th>Ce qu'on dit à la cliente</th></tr>
<tr><td>Œdème (gonflement)</td><td>Gonflement des lèvres dès la fin de la séance, parfois plus marqué le lendemain, puis régression progressive en quelques jours.</td><td>« C'est une réaction normale de la peau à l'effraction ; elle diminue d'elle-même dans les jours qui suivent. »</td></tr>
<tr><td>Sensibilité, tiraillement</td><td>Sensation de lèvres « cartonnées », légère douleur à la pression ou en mangeant.</td><td>« Privilégiez une alimentation tiède, évitez les aliments très épicés ou acides pendant les premiers jours. »</td></tr>
<tr><td>Couleur très intense</td><td>Couleur beaucoup plus vive et foncée que le résultat final.</td><td>« La couleur va s'éclaircir nettement pendant la cicatrisation. »</td></tr>
<tr><td>Petites peaux, desquamation</td><td>Fines pellicules qui se détachent dans la première ou la deuxième semaine.</td><td>« Ne les arrachez pas ; laissez-les tomber seules et appliquez le soin recommandé. »</td></tr>
<tr><td>Phase « couleur disparue »</td><td>Après la desquamation, la lèvre peut sembler presque sans couleur ou laiteuse.</td><td>« La couleur remonte progressivement au fil des semaines ; on juge le résultat après cicatrisation complète. »</td></tr>
</table>
<h3>Ce qui doit alerter</h3>
<p>La praticienne indique dans les consignes écrites les signes qui justifient de <strong>consulter un médecin</strong> sans attendre le rendez-vous de contrôle : gonflement qui augmente au lieu de diminuer après quelques jours, douleur croissante, chaleur importante, écoulement purulent, fièvre, apparition de vésicules évoquant un herpès, réaction allergique (démangeaisons intenses, plaques, gonflement s'étendant au-delà de la zone). Elle ne pose pas de diagnostic, ne conseille aucun médicament et n'entreprend aucun soin sur une lésion suspecte : elle oriente vers le médecin et note l'échange sur la fiche cliente.</p>
<h3>Agir sur le confort pendant la séance</h3>
<ul>
<li><strong>Expliquer chaque étape</strong> avant de la réaliser : la sensibilité est accrue par l'appréhension.</li>
<li><strong>Proposer des pauses</strong> régulières, laisser la cliente boire (paille propre à usage unique) et détendre la mâchoire.</li>
<li><strong>Adapter le geste</strong> : légèreté, passages courts, tension douce.</li>
<li><strong>Soigner l'installation</strong> : coussin sous la nuque et sous les genoux, couverture si la cliente a froid, température de la cabine agréable.</li>
<li><strong>Observer les signes non verbaux</strong> : crispation des mains, respiration bloquée, larmes ; s'arrêter et demander.</li>
<li><strong>Respecter le refus</strong> : la cliente peut demander l'arrêt à tout moment ; la praticienne termine alors proprement la zone en cours si c'est possible, sans forcer, et note l'arrêt sur la fiche.</li>
</ul>
<h3>Le froid après la séance</h3>
<p>L'application d'une compresse froide propre (poche de froid protégée par un linge ou une compresse, jamais de glace directement sur la peau) peut aider à limiter le gonflement dans les heures qui suivent ; cette mesure de confort est mentionnée dans les consignes écrites. Tout autre produit relevant du médicament relève du médecin ou du pharmacien.</p>
<h3>Les recommandations pratiques des premiers jours</h3>
<ul>
<li>Boire à la paille pendant les premiers jours si le contact du verre est inconfortable.</li>
<li>Éviter les aliments très salés, épicés ou acides et les boissons très chaudes, qui irritent.</li>
<li>Se brosser les dents avec précaution sans frotter les lèvres ; éviter le dentifrice sur la zone.</li>
<li>Ne pas embrasser, ne pas mordiller ni lécher les lèvres de manière répétée.</li>
<li>Ne pas appliquer de rouge à lèvres, de gloss ni de maquillage sur la zone pendant la cicatrisation.</li>
<li>Appliquer le soin recommandé en couche fine, avec des mains propres ou un applicateur propre.</li>
</ul>`,
      },
      {
        title: "10.8 – Cas fil rouge : Mme Aïcha DIALLO, lèvres à pigmentation inégale",
        content: `<h3>Présentation du cas</h3>
<p><em>Cas fictif.</em> L'Institut Ligne & Teint, institut de beauté fictif installé à Argenteuil (Val-d'Oise) et dirigé par Nadia FERRAND, vient d'ouvrir son espace de dermopigmentation. Mme <strong>Aïcha DIALLO</strong>, 41 ans, phototype V, prend rendez-vous pour un entretien conseil. Elle explique : « Mes lèvres sont plus foncées sur le bord que sur le milieu, et le contour est flou ; je mets tous les jours un crayon et un rouge, je voudrais quelque chose de plus uniforme et de plus net, mais qui reste naturel. »</p>
<h3>Ce que l'entretien et l'évaluation ont permis d'établir</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Observation</th></tr>
<tr><td>Phototype et sous-ton</td><td>Phototype V, sous-ton chaud à neutre sur le visage.</td></tr>
<tr><td>Couleur des lèvres</td><td>Contour et partie externe de la lèvre inférieure brun foncé à dominante violacée ; centre des deux lèvres brun rosé.</td></tr>
<tr><td>Contour</td><td>Ligne cutanéo-muqueuse peu lisible ; arc de Cupidon présent mais estompé ; légère asymétrie : pic droit un peu plus haut que le gauche.</td></tr>
<tr><td>État de la peau</td><td>Lèvres légèrement sèches, pas de fissure ni de lésion le jour de l'entretien.</td></tr>
<tr><td>Questionnaire de santé</td><td>Pas de traitement en cours ; pas de grossesse ; pas d'allergie connue. Mme DIALLO signale <strong>des boutons de fièvre « une à deux fois par an »</strong>. Elle a eu une injection d'acide hyaluronique dans les lèvres « il y a quelques années », aucune récente.</td></tr>
<tr><td>Habitudes</td><td>Rouge à lèvres quotidien dans des tons brique et rose chaud.</td></tr>
<tr><td>Attentes</td><td>Uniformiser, redonner de la netteté, couleur naturelle rosée chaude ; pas d'effet « tatoué ».</td></tr>
</table>
<h3>L'analyse de la praticienne</h3>
<ol>
<li><strong>Précaution herpès</strong> : les antécédents d'herpès labial imposent une information claire et la demande d'un <strong>avis médical préalable</strong>. Mme DIALLO consulte son médecin traitant ; un traitement préventif éventuel relève de sa prescription. La praticienne ne conseille aucun produit. La prestation ne sera programmée qu'en l'absence de poussée en cours.</li>
<li><strong>Injection ancienne</strong> : pas d'injection récente ; la praticienne note toutefois l'information sur la fiche cliente et observe la lèvre (pas d'irrégularité de volume visible).</li>
<li><strong>Colorimétrie</strong> : le fond foncé du contour présente une dominante froide. Un rose posé directement virerait au violacé. Démarche retenue : <strong>neutralisation localisée</strong> du contour et de la partie externe de la lèvre inférieure avec une famille orangée en voile, puis, après cicatrisation complète, couleur finale rose chaud ou brique douce sur l'ensemble.</li>
<li><strong>Style</strong> : contour estompé (pour la netteté sans trait marqué) combiné à un « lip blush » pour l'uniformité naturelle.</li>
<li><strong>Symétrie</strong> : correction légère du pic gauche sur le dessin, dans la limite de la ligne cutanéo-muqueuse.</li>
<li><strong>Calendrier</strong> : séance 1 (neutralisation et contour estompé), cicatrisation complète (environ 4 à 6 semaines), contrôle avec photo, séance 2 (couleur finale), puis retouche éventuelle après nouvelle cicatrisation complète.</li>
</ol>
<h3>Les documents remis et signés</h3>
<ul>
<li>Information préalable écrite sur les risques et les précautions après la réalisation (arrêté du 3 décembre 2008), avec mention spécifique de l'herpès labial et de l'évolution de la couleur ;</li>
<li>Devis détaillant le nombre de séances prévisibles et la retouche (prix fictifs dans le cadre de la formation) ;</li>
<li>Fiche cliente avec questionnaire de santé, mention de la demande d'avis médical et de sa réponse ;</li>
<li>Autorisation de droit à l'image pour les photos avant / pendant / après (facultative : Mme DIALLO accepte les photos pour son dossier, mais refuse leur publication ; c'est noté et respecté) ;</li>
<li>Consentement éclairé signé le jour de la séance, après validation du dessin ;</li>
<li>Consignes post-prestation écrites.</li>
</ul>
<h3>Ce que ce cas enseigne</h3>
<ul>
<li>Sur lèvres foncées, la réussite tient d'abord au <strong>diagnostic colorimétrique</strong> et à la <strong>patience</strong> : plusieurs séances, chacune après cicatrisation complète.</li>
<li>Les précautions médicales sont traitées <strong>avant</strong> de fixer la date, pas le jour même.</li>
<li>Le choix de la cliente sur l'usage de son image est un droit : les photos de suivi n'impliquent pas une autorisation de publication.</li>
</ul>`,
      },
      {
        title: "10.9 – Quiz C9 : 10 questions corrigées",
        content: `<h3>Questions</h3>
<p>Répondez sans consulter le support, puis comparez avec le corrigé.</p>
<ol>
<li>Sur quelle partie des lèvres ne réalise-t-on jamais de pigmentation ?<br>a) La ligne cutanéo-muqueuse<br>b) Le vermillon<br>c) La muqueuse labiale humide<br>d) L'arc de Cupidon</li>
<li>Quel repère sert principalement à vérifier la symétrie de la lèvre supérieure ?<br>a) La ligne humide<br>b) Les pics de l'arc de Cupidon par rapport à l'axe médian<br>c) La commissure gauche<br>d) Le menton</li>
<li>Une cliente signale des antécédents d'herpès labial. Que faites-vous ?<br>a) Vous lui conseillez un traitement antiviral en pharmacie<br>b) Vous réalisez la prestation sans en tenir compte<br>c) Vous l'informez et lui demandez de consulter son médecin avant la prestation<br>d) Vous refusez définitivement toute prestation</li>
<li>Une cliente a eu une injection de produit de comblement dans les lèvres récemment. Quelle est la bonne conduite ?<br>a) Attendre deux jours<br>b) Demander l'avis du médecin qui a réalisé l'injection avant de fixer la date<br>c) Réaliser la prestation en pigmentant plus profondément<br>d) Masser la lèvre pour répartir le produit</li>
<li>Pourquoi un pigment rose posé directement sur une lèvre à fond brun-violacé donne-t-il un résultat décevant ?<br>a) Parce que le pigment ne tient pas sur peau foncée<br>b) Parce que le mélange optique avec le fond froid fait virer la couleur vers le violet ou le terne<br>c) Parce que le rose est interdit<br>d) Parce que la cicatrisation est plus rapide</li>
<li>Quelle famille de pigment correcteur est généralement utilisée pour neutraliser une dominante bleu-violet ?<br>a) Bleue<br>b) Verte<br>c) Orangée<br>d) Blanche</li>
<li>Qu'est-ce que l'effet « lip blush » ?<br>a) Un contour très foncé<br>b) Un remplissage léger en voile, qui laisse transparaître la lèvre naturelle<br>c) Une injection de volume<br>d) Un tatouage de la muqueuse</li>
<li>Pourquoi le contour ne doit-il pas être nettement plus foncé que le remplissage ?<br>a) Parce que c'est interdit par la réglementation<br>b) Parce qu'en s'atténuant, la couleur fera ressortir une ligne marquée d'aspect vieillissant<br>c) Parce que le dermographe ne le permet pas<br>d) Parce que la cliente ne le verra pas</li>
<li>Une cliente vous demande une crème anesthésiante pour la séance. Que répondez-vous ?<br>a) Vous lui en vendez une<br>b) Vous lui en appliquez une de votre stock<br>c) Vous lui expliquez que vous ne fournissez aucun produit anesthésiant relevant du médicament et vous la renvoyez vers son médecin ou son pharmacien<br>d) Vous lui conseillez une marque précise</li>
<li>Trois jours après la séance, les lèvres sont nettement plus gonflées que le lendemain, chaudes, douloureuses, avec un écoulement jaunâtre. Que faites-vous ?<br>a) Vous rassurez la cliente : c'est normal<br>b) Vous lui conseillez de retirer les croûtes<br>c) Vous l'orientez sans attendre vers un médecin et vous notez l'échange sur sa fiche<br>d) Vous programmez immédiatement la retouche</li>
</ol>
<h3>Corrigé</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>c</td><td>La muqueuse humide ne retient pas le pigment et expose davantage aux germes buccaux ; la ligne humide est la limite intérieure du travail.</td></tr>
<tr><td>2</td><td>b</td><td>Les deux pics de l'arc de Cupidon doivent être à même hauteur et à égale distance de l'axe médian.</td></tr>
<tr><td>3</td><td>c</td><td>Information et avis médical préalable ; un traitement préventif éventuel est prescrit par le médecin, jamais conseillé par la praticienne. Un refus définitif n'est pas justifié d'emblée.</td></tr>
<tr><td>4</td><td>b</td><td>La praticienne ne fixe pas elle-même de délai chiffré ; elle s'en remet à l'avis du médecin et consigne la réponse.</td></tr>
<tr><td>5</td><td>b</td><td>La couleur perçue est un mélange optique du pigment et du fond vu à travers l'épiderme.</td></tr>
<tr><td>6</td><td>c</td><td>L'orangé est complémentaire du bleu-violet sur le cercle chromatique et neutralise la dominante froide.</td></tr>
<tr><td>7</td><td>b</td><td>Le « lip blush » est un voile de couleur, travaillé en ombrage, au rendu naturel.</td></tr>
<tr><td>8</td><td>b</td><td>Ce n'est pas une règle réglementaire mais une règle esthétique liée au vieillissement de la couleur.</td></tr>
<tr><td>9</td><td>c</td><td>Aucun produit anesthésiant relevant du médicament n'est prescrit, injecté ou fourni par la professionnelle.</td></tr>
<tr><td>10</td><td>c</td><td>Ces signes évoquent une complication (infection possible) : orientation médicale, pas de diagnostic ni de soin par la praticienne, traçabilité de l'échange.</td></tr>
</table>
<p><strong>Barème indicatif</strong> : 9 ou 10 bonnes réponses, maîtrise ; 7 ou 8, à consolider sur les points manqués ; moins de 7, reprendre les sections 10.1 à 10.4 avant la mise en situation.</p>`,
      },
      {
        title: "10.10 – Cas pratique corrigé : préparer et réaliser une prestation lèvres",
        content: `<h3>Énoncé</h3>
<p><em>Cas fictif.</em> Mme <strong>Sandrine ROCHE</strong>, 47 ans, cliente de l'Institut Ligne & Teint, phototype II, sous-ton froid, lèvres fines et pâles, contour estompé par l'âge, quelques ridules verticales au-dessus de la lèvre supérieure. Elle souhaite « des lèvres plus pulpeuses et une couleur rose bonbon bien visible ». Elle ne signale ni herpès, ni injection, ni traitement. Elle a prévu un détartrage chez son dentiste dans dix jours.</p>
<p><strong>Travail demandé :</strong></p>
<ol>
<li>Reformulez la demande et identifiez ce qui est réalisable et ce qui ne l'est pas.</li>
<li>Proposez un style et une famille de couleur argumentés.</li>
<li>Repérez les points de vigilance liés à la zone et au calendrier.</li>
<li>Rédigez les cinq étapes clés du dessin préparatoire.</li>
<li>Listez les informations à porter sur la fiche cliente le jour de la prestation.</li>
</ol>
<h3>Corrigé commenté</h3>
<p><strong>1. Reformulation et faisabilité.</strong> « Si je comprends bien, vous souhaitez une bouche plus définie, qui paraisse plus pleine, avec une couleur rose bien visible au quotidien. » Réalisable : redonner de la définition au contour, donner une impression de bouche mieux dessinée, apporter une couleur rosée. Non réalisable : créer un volume réel (le maquillage semi-permanent ne remplit pas la lèvre) ; déborder nettement du contour naturel pour « grossir » la bouche, ce qui donnerait un résultat artificiel et, avec les ridules péri-labiales, un risque de fusée du pigment. La praticienne l'explique sans dévaloriser la demande et ne renvoie pas vers un acte médical par démarchage : si la cliente évoque d'elle-même les injections, elle lui indique simplement que cela relève d'un médecin.</p>
<p><strong>2. Style et couleur.</strong> Contour estompé posé sur la ligne cutanéo-muqueuse (éventuellement très légèrement redessiné à la limite, sans débord visible sur la peau ridée) et remplissage léger ou « lip blush ». Couleur : un rose bonbon froid, sur une lèvre pâle à sous-ton froid, risque d'être perçu comme trop artificiel et de virer au violacé ; on propose un rose légèrement plus chaud, un ton en dessous de l'intensité souhaitée, en expliquant que la retouche permettra d'intensifier si la cliente le souhaite après cicatrisation complète.</p>
<p><strong>3. Points de vigilance.</strong></p>
<ul>
<li>Ridules péri-labiales : ne pas déborder sur la peau, contour légèrement intérieur si nécessaire.</li>
<li>Peau fine et claire : profondeur maîtrisée, pression légère, passages contrôlés.</li>
<li>Détartrage prévu dans dix jours : bouche maintenue ouverte, manipulation et irritation pendant la cicatrisation ; proposer de décaler l'une des deux interventions pour ne pas les cumuler, et en discuter avec la cliente (et, si besoin, qu'elle en parle à son dentiste).</li>
<li>Attentes de volume : à recadrer dès l'entretien et à rappeler par écrit sur le devis (résultat attendu : définition et couleur).</li>
</ul>
<p><strong>4. Étapes du dessin préparatoire.</strong></p>
<ol>
<li>Démaquiller, appliquer l'antiseptique, laisser sécher ; observer bouche au repos et en mouvement.</li>
<li>Tracer l'axe médian (milieu du philtrum et de la lèvre inférieure).</li>
<li>Placer les deux pics de l'arc de Cupidon à égale distance de l'axe et à même hauteur ; placer le point bas de la lèvre inférieure sur l'axe.</li>
<li>Relier les points en suivant la ligne cutanéo-muqueuse jusqu'aux commissures, sans les prolonger ni les faire tomber.</li>
<li>Vérifier la symétrie (mesures, recul, miroir), puis faire valider par la cliente ; ajuster ; signer le consentement après validation.</li>
</ol>
<p><strong>5. Fiche cliente du jour.</strong> Date ; questionnaire de santé relu et mis à jour ; absence de contre-indication constatée ; style choisi ; couleur(s), références et <strong>numéros de lot</strong> des pigments ; type d'aiguilles ou cartouches et leurs <strong>numéros de lot</strong> ; réglages principaux ; observations pendant la séance (saignement, sensibilité, pauses) ; photos réalisées et autorisation de droit à l'image (avec la portée choisie) ; consignes écrites remises ; date du contrôle et de la retouche proposées ; signature.</p>
<h3>Grille d'auto-évaluation du cas</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Acquis</th><th>À revoir</th></tr>
<tr><td>J'ai distingué attente réaliste et attente irréaliste et je l'ai expliqué avec tact</td><td></td><td></td></tr>
<tr><td>J'ai justifié la couleur par la colorimétrie (sous-ton, fond de la lèvre)</td><td></td><td></td></tr>
<tr><td>J'ai identifié la contrainte des ridules et celle du calendrier dentaire</td><td></td><td></td></tr>
<tr><td>Mon dessin suit l'axe médian, l'arc de Cupidon et la ligne cutanéo-muqueuse</td><td></td><td></td></tr>
<tr><td>Ma fiche cliente permet la traçabilité complète (lots des pigments et des aiguilles)</td><td></td><td></td></tr>
</table>`,
      },
    ],
  },
  {
    title: "Chapitre 11 – Créer des taches de rousseur (C10)",
    description:
      "Jour 3, en présentiel. Compétence C10 – Créer des taches de rousseur. Observation des taches naturelles (éphélides), répartition sur le nez et les pommettes, variation des tailles et des densités, choix de la couleur selon le phototype (bruns chauds, jamais de noir), technique du point unique à profondeur superficielle, dessin préparatoire et validation par la cliente, risques (taches trop régulières, trop foncées, virage de couleur). Cas fil rouge de Mme Clara NGUYEN (cliente fictive de l'Institut Ligne & Teint), quiz corrigé et cas pratique corrigé ; entraînement sur peau latex 3D.",
    sections: [
      {
        title: "11.1 – Observer les taches de rousseur naturelles",
        content: `<h3>Un effet « naturel » qui ne s'improvise pas</h3>
<p>Les taches de rousseur créées en dermopigmentation, parfois appelées « freckles », répondent à une demande esthétique de fraîcheur et de naturel. Paradoxalement, c'est l'une des prestations où l'œil de la praticienne compte le plus : <strong>une tache de rousseur réussie est une tache que personne ne soupçonne d'être artificielle</strong>. Pour y parvenir, il faut d'abord savoir regarder les taches naturelles.</p>
<h3>Les caractéristiques des éphélides naturelles</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Caractéristique</th><th>Observation</th><th>Traduction en dermopigmentation</th></tr>
<tr><td>Forme</td><td>Contours irréguliers, rarement parfaitement ronds ; légèrement flous.</td><td>Points de formes et de contours légèrement variés ; aucun « rond parfait » répété.</td></tr>
<tr><td>Taille</td><td>Très variable, de la tête d'épingle à quelques millimètres, sur un même visage.</td><td>Alterner plusieurs tailles, avec une majorité de petites taches.</td></tr>
<tr><td>Couleur</td><td>Brun clair à brun moyen, plus ou moins chaud ; plusieurs nuances coexistent.</td><td>Deux ou trois nuances de brun chaud, jamais de noir.</td></tr>
<tr><td>Densité</td><td>Plus dense au centre du visage (arête et ailes du nez, haut des pommettes), qui s'éclaircit vers la périphérie.</td><td>Gradient de densité : concentré au centre, dispersé sur les bords.</td></tr>
<tr><td>Répartition</td><td>Aléatoire, avec des petits groupes et des espaces vides ; jamais en lignes ni en grille.</td><td>Placement volontairement irrégulier, avec des « grappes » et des zones libres.</td></tr>
<tr><td>Évolution</td><td>Les taches naturelles foncent au soleil et pâlissent en hiver.</td><td>Les taches pigmentées ne varient pas avec le soleil ; l'expliquer à la cliente.</td></tr>
</table>
<h3>S'entraîner à observer</h3>
<p>Pendant la formation, les stagiaires observent des photographies de visages présentant des taches naturelles (banques d'images libres de droits ou photos autorisées) et réalisent un relevé :</p>
<ul>
<li>Où se trouve la zone la plus dense ?</li>
<li>Combien de tailles différentes peut-on distinguer ?</li>
<li>Combien de nuances ?</li>
<li>Les taches sont-elles présentes sur le front, le menton, les paupières ?</li>
<li>Comment la densité diminue-t-elle vers les tempes et les joues ?</li>
</ul>
<p>Ce relevé sert ensuite de référence pour construire le dessin préparatoire sur la cliente.</p>
<h3>Taches de rousseur, grains de beauté et lésions : ne pas confondre</h3>
<p>Avant de créer des taches, la praticienne observe la peau de la zone. Elle ne pigmente <strong>jamais</strong> sur ou autour d'un grain de beauté, d'une tache pigmentée d'aspect inhabituel, d'une lésion ou d'une zone irritée. Si elle remarque une lésion qui a changé d'aspect selon la cliente, ou une tache qui l'interroge, elle conseille à la cliente d'en parler à son médecin ou à un dermatologue, <strong>sans émettre d'avis</strong> sur sa nature. Créer des taches artificielles par-dessus une lésion pourrait en gêner la surveillance médicale.</p>
<p>De même, la praticienne vérifie que la cliente ne présente pas d'affection cutanée active sur la zone (acné inflammatoire, eczéma, rosacée en poussée) : il s'agit d'une contre-indication à la prestation sur cette zone tant que l'affection est active.</p>`,
      },
      {
        title: "11.2 – Répartition, tailles et densités : construire un semis naturel",
        content: `<h3>La zone de répartition</h3>
<p>La répartition la plus courante et la plus naturelle suit la zone d'exposition au soleil :</p>
<ul>
<li><strong>Le nez</strong> : arête et ailes ; c'est souvent le cœur du semis.</li>
<li><strong>Les pommettes</strong> : partie haute et centrale, sous les yeux, en s'éloignant vers les tempes.</li>
<li><strong>Le haut des joues</strong>, de manière plus dispersée.</li>
<li>Selon la demande, quelques taches éparses sur le <strong>front</strong> ou le <strong>menton</strong>, en faible densité.</li>
</ul>
<p>La forme générale évoque un « papillon » ou un « masque » léger centré sur le nez, mais sans contours nets : la périphérie se dilue progressivement.</p>
<h3>Le gradient de densité</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Zone</th><th>Densité visée</th><th>Taille dominante</th></tr>
<tr><td>Centre : arête du nez, haut des pommettes près du nez</td><td>Forte (taches rapprochées, petites grappes)</td><td>Petites et moyennes</td></tr>
<tr><td>Zone intermédiaire : milieu des pommettes</td><td>Moyenne</td><td>Petites, quelques moyennes</td></tr>
<tr><td>Périphérie : vers les tempes et les joues</td><td>Faible (taches isolées)</td><td>Très petites</td></tr>
</table>
<p>La cliente choisit l'intensité générale : <strong>discrète</strong> (semis léger, surtout sur le nez et le haut des pommettes), <strong>moyenne</strong>, ou <strong>marquée</strong>. Pour une première prestation, on recommande de rester discret : il est toujours possible d'ajouter des taches lors de la retouche, alors qu'il est très difficile d'en retirer.</p>
<h3>Varier les tailles</h3>
<p>Un semis naturel associe trois catégories de taches :</p>
<ol>
<li><strong>Très petites</strong> (points fins) : les plus nombreuses, elles assurent le naturel et « relient » le semis.</li>
<li><strong>Petites</strong> : la base du semis.</li>
<li><strong>Moyennes</strong> : peu nombreuses, placées irrégulièrement, elles donnent du relief.</li>
</ol>
<p>On évite les grosses taches : elles attirent l'œil, et une tache trop large risque de paraître floue après cicatrisation.</p>
<h3>Les règles du placement irrégulier</h3>
<ul>
<li><strong>Pas de lignes</strong> : vérifier qu'aucun alignement de trois taches ou plus ne se forme.</li>
<li><strong>Pas de grille</strong> : éviter des espacements identiques entre les taches.</li>
<li><strong>Pas de symétrie parfaite</strong> : les deux côtés du visage doivent être équilibrés en densité, mais jamais en miroir point par point.</li>
<li><strong>Des grappes et des vides</strong> : regrouper certaines taches par deux ou trois, laisser des espaces libres.</li>
<li><strong>Varier les nuances</strong> au sein d'une même zone.</li>
</ul>
<h3>Exercice d'entraînement sur papier puis sur latex</h3>
<p>Sur un gabarit de visage imprimé, chaque stagiaire réalise un semis au feutre fin de deux couleurs, puis le fait relire par un autre stagiaire avec la check-list ci-dessus (lignes, grille, symétrie en miroir, gradient). Le même exercice est ensuite réalisé au dermographe sur peau latex 3D, avec la configuration d'aiguille et les réglages choisis pour cette prestation.</p>`,
      },
      {
        title: "11.3 – Couleur selon le phototype : des bruns chauds, jamais de noir",
        content: `<h3>Le principe</h3>
<p>Les taches de rousseur naturelles sont <strong>brunes, plus ou moins chaudes</strong>, et légèrement plus foncées que la carnation. Le pigment choisi doit reproduire cet écart de manière douce. Deux erreurs sont fréquentes : choisir une couleur trop foncée (effet « points de feutre ») et choisir un brun froid ou un noir, qui <strong>vire au gris-bleu</strong> en vieillissant sous la peau.</p>
<h3>Repères de choix selon le phototype de Fitzpatrick</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Phototype</th><th>Carnation (repère)</th><th>Famille de couleur conseillée</th><th>À éviter</th></tr>
<tr><td>I</td><td>Très claire, brûle toujours, ne bronze pas</td><td>Brun clair chaud, caramel clair, brun roux léger</td><td>Bruns moyens ou foncés, qui paraîtraient trop contrastés</td></tr>
<tr><td>II</td><td>Claire, brûle facilement, bronze peu</td><td>Brun clair à brun moyen chaud, brun roux</td><td>Bruns froids, gris</td></tr>
<tr><td>III</td><td>Intermédiaire, bronze progressivement</td><td>Brun moyen chaud, brun cuivré</td><td>Noir, bruns très froids</td></tr>
<tr><td>IV</td><td>Mate, bronze facilement</td><td>Brun moyen à brun profond chaud</td><td>Couleurs trop claires (effet de taches pâles « posées »), noir</td></tr>
<tr><td>V</td><td>Brune</td><td>Brun profond chaud, chocolat chaud ; effet discret, peu contrasté</td><td>Noir, bruns froids</td></tr>
<tr><td>VI</td><td>Noire</td><td>Bruns très profonds chauds ; prestation demandant une réflexion particulière, l'effet de tache de rousseur étant moins courant naturellement</td><td>Noir, couleurs claires</td></tr>
</table>
<p>Ces repères sont pédagogiques ; le choix final se fait sur la peau de la cliente, à la lumière du jour, en tenant compte de son sous-ton, de la couleur de ses sourcils et de ses cheveux, et des recommandations du fabricant du pigment.</p>
<h3>Pourquoi éviter le noir</h3>
<p>Un pigment noir ou très froid, déposé dans la peau, est perçu à travers l'épiderme : la couche de peau filtre la lumière et la couleur paraît <strong>bleutée ou grise</strong>. Ce phénomène, accentué en cas d'effraction trop profonde, est l'un des « virages » les plus difficiles à corriger. Pour les taches de rousseur, on utilise donc des bruns à dominante chaude (bases orangées ou rouges), qui vieillissent vers des tons doux.</p>
<h3>Composer deux ou trois nuances</h3>
<p>Pour reproduire la variété naturelle, la praticienne prépare en général <strong>deux nuances</strong> (parfois trois) dans des cupules séparées :</p>
<ul>
<li>une nuance de base, légèrement plus foncée que la carnation ;</li>
<li>une nuance plus claire ou plus chaude, obtenue par un mélange ou une dilution conforme aux recommandations du fabricant.</li>
</ul>
<p>Chaque pigment utilisé (référence et numéro de lot) est noté sur la fiche cliente. La praticienne vérifie l'étiquetage : mention « Mélange destiné à être utilisé dans des tatouages ou des maquillages permanents », liste des ingrédients, numéro de lot, et date de péremption ; elle ne recourt qu'à des produits conformes aux restrictions du règlement (UE) 2020/2081.</p>
<h3>Tenir compte du soleil</h3>
<p>Les taches naturelles foncent l'été ; les taches pigmentées, elles, ne bronzent pas, mais la peau autour peut bronzer. Sur une cliente qui bronze beaucoup, des taches trop claires peuvent « disparaître » l'été ; à l'inverse, des taches choisies l'été peuvent paraître trop foncées l'hiver. On choisit une nuance moyenne et on conseille une protection solaire régulière, qui protège aussi la tenue du pigment.</p>`,
      },
      {
        title: "11.4 – Technique : point unique, profondeur superficielle, réglages",
        content: `<h3>La technique du point</h3>
<p>Chaque tache est créée par une <strong>technique de point</strong> : l'aiguille est posée brièvement, perpendiculairement à la peau, pour déposer le pigment sur une petite surface, puis retirée. Pour une très petite tache, un seul contact bref suffit (« point unique ») ; pour une tache un peu plus grande, la praticienne réalise un micro-mouvement circulaire très serré ou quelques points rapprochés, de manière à garder un contour légèrement irrégulier.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Paramètre</th><th>Repère</th><th>Justification</th></tr>
<tr><td>Configuration d'aiguille</td><td>Aiguille fine à une pointe ou à petit nombre de pointes, selon la taille de tache recherchée et les recommandations du fabricant</td><td>Contrôle de la taille et de la netteté de chaque tache.</td></tr>
<tr><td>Profondeur</td><td>Superficielle : épiderme, jusqu'à la jonction dermo-épidermique sans la dépasser</td><td>Les taches doivent rester douces ; trop profond, elles s'élargissent, deviennent floues et virent au gris-bleu.</td></tr>
<tr><td>Pression</td><td>Légère, constante</td><td>Taille régulière des points d'une même catégorie.</td></tr>
<tr><td>Durée de contact</td><td>Brève, adaptée à la taille voulue</td><td>Un contact prolongé élargit et assombrit la tache.</td></tr>
<tr><td>Vitesse</td><td>Réglée selon l'appareil, essai préalable sur latex ou sur support</td><td>Dépôt régulier du pigment.</td></tr>
<tr><td>Tension de la peau</td><td>Légère, avec la main non dominante gantée</td><td>Évite que la peau « fuie » sous l'aiguille, sans déformer la zone.</td></tr>
</table>
<h3>L'ordre de réalisation</h3>
<ol>
<li>Commencer par la <strong>zone centrale</strong> (arête du nez), avec la nuance de base, en suivant le dessin préparatoire.</li>
<li>Passer au haut des pommettes en alternant les côtés pour garder l'équilibre.</li>
<li>Ajouter la <strong>deuxième nuance</strong> en intercalant des taches pour créer la variété.</li>
<li>Terminer par la <strong>périphérie</strong> avec des points fins et espacés.</li>
<li>Prendre du recul régulièrement, faire regarder la cliente dans le miroir, compléter si nécessaire.</li>
</ol>
<h3>« Moins, c'est mieux »</h3>
<p>Après la séance, les taches paraissent plus foncées et parfois entourées d'une légère rougeur. Pendant la cicatrisation, une partie du pigment est éliminée et les taches s'adoucissent ; certaines peuvent s'estomper davantage que d'autres, ce qui contribue d'ailleurs au naturel. La praticienne <strong>s'arrête avant d'avoir atteint la densité souhaitée</strong> et prévoit d'ajouter des taches lors de la retouche, après cicatrisation complète.</p>
<h3>Hygiène et traçabilité</h3>
<p>La prestation suit la même chaîne d'hygiène que toute dermopigmentation : friction hydroalcoolique, gants à usage unique, champ et matériel stériles à usage unique, housse du dermographe et du cordon, antisepsie de la peau, élimination des aiguilles et cartouches dans le collecteur pour objets piquants-coupants (filière DASRI), désinfection des surfaces, fiche cliente complétée avec les numéros de lot des pigments et des aiguilles.</p>`,
      },
      {
        title: "11.5 – Dessin préparatoire et validation par la cliente",
        content: `<h3>Pourquoi le dessin est indispensable</h3>
<p>Le dessin préparatoire permet à la cliente de <strong>visualiser le résultat</strong> avant toute effraction et de décider en connaissance de cause : densité, étendue, nuance. Il sert aussi de guide à la praticienne pendant la réalisation. Il est réalisé au crayon dermatologique ou au crayon de maquillage brun fin, sur une peau démaquillée et préparée.</p>
<h3>Les étapes</h3>
<ol>
<li><strong>Préparer la peau</strong> : démaquillage, nettoyage, peau sèche. L'antisepsie est réalisée selon le protocole de l'institut, avant le passage du dermographe, en veillant à ne pas effacer les repères validés.</li>
<li><strong>Délimiter la zone</strong> mentalement ou par quelques points de repère très légers : limites hautes (sous les yeux, en restant à distance de la zone oculaire), limites latérales, limite basse.</li>
<li><strong>Placer le cœur du semis</strong> sur le nez et le haut des pommettes.</li>
<li><strong>Construire le gradient</strong> vers la périphérie.</li>
<li><strong>Contrôler l'irrégularité</strong> : pas de ligne, pas de grille, pas de miroir.</li>
<li><strong>Faire valider</strong> la cliente face au miroir, de face et de trois quarts, à la lumière naturelle si possible. Ajouter ou retirer des taches selon ses remarques.</li>
<li><strong>Photographier</strong> le dessin validé (avec autorisation) : il servira de référence pour la retouche.</li>
<li><strong>Faire signer le consentement éclairé</strong> après la validation du dessin.</li>
</ol>
<h3>Le dialogue de validation</h3>
<p>Quelques questions aident la cliente à se prononcer :</p>
<ul>
<li>« Vous voyez-vous ainsi tous les jours, sans maquillage ? »</li>
<li>« Préférez-vous que nous allions moins loin vers les tempes ? »</li>
<li>« Souhaitez-vous des taches sur le front ou le menton, ou uniquement sur le nez et les pommettes ? »</li>
<li>« Rappelez-vous que nous pourrons en ajouter à la retouche, mais pas en enlever facilement. »</li>
</ul>
<p>Si la cliente hésite, la praticienne peut lui proposer de <strong>porter le dessin</strong> quelques heures ou de revenir un autre jour : une décision précipitée est source d'insatisfaction.</p>
<h3>Le cas particulier des clientes qui ont déjà des taches naturelles</h3>
<p>Certaines clientes ont quelques taches naturelles et souhaitent les « compléter ». La praticienne s'inspire alors de leur couleur et de leur taille pour harmoniser, sans pigmenter sur les taches existantes. Elle rappelle que les taches naturelles évoluent avec le soleil, contrairement aux taches pigmentées : l'harmonie peut varier selon les saisons.</p>`,
      },
      {
        title: "11.6 – Risques et erreurs : taches trop régulières, trop foncées, virage",
        content: `<h3>Les principaux risques esthétiques</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Problème</th><th>Cause probable</th><th>Prévention</th><th>Conduite si le problème survient</th></tr>
<tr><td>Taches trop régulières (aspect « pointillé », grille)</td><td>Placement mécanique, tailles identiques, espacements égaux</td><td>Dessin préparatoire validé, check-list d'irrégularité, recul fréquent</td><td>À la retouche, intercaler des taches de tailles et de nuances variées pour casser la régularité ; bien expliquer à la cliente ce qui est possible.</td></tr>
<tr><td>Taches trop foncées</td><td>Pigment trop foncé, contact trop long, trop de passages</td><td>Nuance proche de la carnation, contacts brefs, rester en dessous de l'intensité voulue</td><td>Attendre la cicatrisation complète avant de juger ; la couleur s'adoucit souvent. Si elles restent trop foncées, ne pas tenter de « recouvrir » avec un pigment clair ; orienter, si la cliente le souhaite, vers les professionnels qui pratiquent les techniques de détatouage, notamment le laser, qui relève d'un cadre médical.</td></tr>
<tr><td>Taches trop grosses ou floues</td><td>Effraction trop profonde, aiguille trop large, mouvement circulaire trop ample</td><td>Profondeur superficielle, aiguille fine, petits contacts</td><td>Pas de correction immédiate ; évaluation après cicatrisation complète.</td></tr>
<tr><td>Virage gris-bleu</td><td>Pigment trop froid ou noir, effraction trop profonde</td><td>Bruns chauds, profondeur maîtrisée</td><td>Évaluation après cicatrisation ; correction colorimétrique éventuelle par un pigment chaud, uniquement si elle est raisonnable et expliquée.</td></tr>
<tr><td>Asymétrie de densité</td><td>Travail d'un côté puis de l'autre sans comparaison</td><td>Alterner les côtés, contrôler au miroir</td><td>Compléter le côté le moins dense à la retouche.</td></tr>
<tr><td>Taches trop proches de l'œil</td><td>Limite haute mal définie</td><td>Respecter une distance de sécurité avec la zone oculaire</td><td>Aucune reprise dans la zone oculaire ; noter et informer.</td></tr>
</table>
<h3>Les risques liés à la santé</h3>
<p>Comme toute effraction cutanée, la création de taches de rousseur expose à des risques d'infection, de réaction allergique au pigment, ou de troubles de la pigmentation chez les peaux sujettes à l'hyperpigmentation post-inflammatoire. Les précautions générales s'appliquent : questionnaire de santé, contre-indications (grossesse et allaitement, traitement anticoagulant, diabète non équilibré, troubles de la cicatrisation, affection cutanée active sur la zone, isotrétinoïne, chimiothérapie ou radiothérapie en cours, allergies connues) avec avis médical préalable, hygiène stricte, information écrite et consignes post-prestation. Toute réaction anormale conduit à une <strong>orientation médicale</strong>.</p>
<h3>Le risque d'insatisfaction</h3>
<p>Les taches de rousseur sont une prestation très « visible » et très personnelle. L'insatisfaction vient souvent d'un écart entre l'image que la cliente avait en tête et le résultat. Le dessin validé et photographié, la mention de l'intensité choisie sur la fiche cliente, et l'explication de l'évolution de la couleur sont les meilleures protections.</p>`,
      },
      {
        title: "11.7 – Cas fil rouge : Mme Clara NGUYEN, des taches discrètes",
        content: `<h3>Présentation du cas</h3>
<p><em>Cas fictif.</em> Mme <strong>Clara NGUYEN</strong>, 27 ans, phototype III, sous-ton chaud, cheveux châtain foncé, sourcils bruns, vient à l'Institut Ligne & Teint. Elle a vu des photos de taches de rousseur pigmentées sur les réseaux sociaux et souhaite « des petites taches discrètes, comme si j'avais pris le soleil ». Elle se maquille peu, fait du sport en extérieur et passe ses vacances au bord de la mer. Questionnaire de santé : pas de traitement, pas d'allergie connue, pas de grossesse ; acné légère à l'adolescence, peau aujourd'hui calme ; deux grains de beauté sur la pommette gauche.</p>
<h3>Analyse et proposition</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Point</th><th>Analyse</th><th>Décision</th></tr>
<tr><td>Intensité</td><td>Demande de discrétion, première prestation</td><td>Semis discret, centré sur le nez et le haut des pommettes ; densité à compléter éventuellement à la retouche.</td></tr>
<tr><td>Couleur</td><td>Phototype III, sous-ton chaud, cheveux châtain foncé</td><td>Deux nuances : brun moyen chaud et brun cuivré plus clair ; aucun noir.</td></tr>
<tr><td>Grains de beauté</td><td>Deux grains de beauté sur la pommette gauche</td><td>Ne pas pigmenter sur ou autour ; laisser un espace libre ; si la cliente signale un changement d'aspect, l'inviter à consulter un médecin.</td></tr>
<tr><td>Exposition solaire</td><td>Sport en extérieur, vacances à la mer</td><td>Programmer la prestation hors période d'exposition intense ; expliquer que le soleil est à éviter pendant la cicatrisation et que la protection solaire préserve ensuite la tenue ; nuance moyenne pour rester harmonieuse en été comme en hiver.</td></tr>
<tr><td>Sport</td><td>Transpiration importante</td><td>Éviter les activités entraînant une forte transpiration dans les premiers jours de cicatrisation, comme indiqué dans les consignes écrites.</td></tr>
</table>
<h3>Déroulé de la séance</h3>
<ol>
<li>Relecture de la fiche, photos avant, information préalable remise lors de la prise de rendez-vous.</li>
<li>Poste préparé selon la chaîne d'hygiène ; numéros de lot notés.</li>
<li>Dessin préparatoire au crayon brun fin, validation face au miroir ; Mme NGUYEN demande d'aller un peu moins loin vers les tempes ; ajustement ; photo du dessin validé ; consentement signé.</li>
<li>Réalisation au point unique, nuance de base au centre, deuxième nuance intercalée, points fins en périphérie ; alternance des côtés ; recul régulier.</li>
<li>Contrôle final avec la cliente, explication de l'évolution (taches plus foncées et légère rougeur au début, adoucissement pendant la cicatrisation).</li>
<li>Soin immédiat, consignes écrites remises, rendez-vous de contrôle et retouche proposés après cicatrisation complète.</li>
<li>Remise en état du poste, DASRI, fiche complétée.</li>
</ol>
<h3>Le contrôle après cicatrisation</h3>
<p>Lors du rendez-vous de contrôle, après cicatrisation complète, la praticienne compare les photos au dessin validé. Trois taches de la pommette droite se sont presque effacées et le côté droit paraît un peu moins dense. Avec l'accord de Mme NGUYEN, elle ajoute quelques taches de petite taille lors de la retouche, en reprenant les mêmes pigments (mêmes références ; nouveaux numéros de lot notés s'ils ont changé).</p>`,
      },
      {
        title: "11.8 – Quiz C10 corrigé",
        content: `<h3>Questions</h3>
<ol>
<li>Où les taches de rousseur naturelles sont-elles généralement les plus denses ?</li>
<li>Citez trois règles qui évitent l'effet « pointillé » artificiel.</li>
<li>Pourquoi ne faut-il pas utiliser de pigment noir pour les taches de rousseur ?</li>
<li>Quelle famille de couleurs choisir pour une cliente de phototype II ?</li>
<li>Quelle profondeur d'effraction vise-t-on pour une tache de rousseur ?</li>
<li>Que se passe-t-il si la durée de contact de l'aiguille est trop longue ?</li>
<li>Pourquoi conseille-t-on un semis discret pour une première prestation ?</li>
<li>Que faites-vous si la cliente présente un grain de beauté dans la zone ?</li>
<li>À quel moment fait-on signer le consentement éclairé ?</li>
<li>Vrai ou faux : les taches pigmentées foncent au soleil comme les taches naturelles.</li>
</ol>
<h3>Corrigé</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Réponse attendue</th></tr>
<tr><td>1</td><td>Au centre du visage : arête et ailes du nez, haut des pommettes près du nez ; la densité diminue vers la périphérie.</td></tr>
<tr><td>2</td><td>Varier les tailles ; varier les nuances ; éviter les alignements et les espacements égaux ; ne pas faire de symétrie en miroir ; créer des grappes et des vides ; respecter un gradient de densité (trois éléments suffisent).</td></tr>
<tr><td>3</td><td>Vu à travers l'épiderme, un pigment noir ou froid paraît gris-bleu, surtout en cas d'effraction trop profonde ; le virage est difficile à corriger et l'effet n'est pas naturel.</td></tr>
<tr><td>4</td><td>Brun clair à brun moyen chaud, brun roux ; éviter les bruns froids et les gris.</td></tr>
<tr><td>5</td><td>Superficielle : dans l'épiderme, jusqu'à la jonction dermo-épidermique sans la dépasser.</td></tr>
<tr><td>6</td><td>La tache s'élargit et fonce ; elle risque de paraître floue après cicatrisation.</td></tr>
<tr><td>7</td><td>On peut ajouter des taches à la retouche, mais il est très difficile d'en retirer ; la cliente découvre aussi progressivement l'effet sur son visage.</td></tr>
<tr><td>8</td><td>Ne pas pigmenter sur le grain de beauté ni autour ; laisser un espace libre ; si la cliente signale un changement d'aspect ou si la tache interroge, lui conseiller d'en parler à son médecin, sans émettre d'avis.</td></tr>
<tr><td>9</td><td>Après la validation du dessin préparatoire par la cliente, avant la réalisation.</td></tr>
<tr><td>10</td><td>Faux : les taches pigmentées ne bronzent pas ; c'est la peau autour qui peut foncer, ce qui modifie le contraste selon les saisons.</td></tr>
</table>`,
      },
      {
        title: "11.9 – Cas pratique corrigé : reprendre un semis trop régulier",
        content: `<h3>Énoncé</h3>
<p><em>Cas fictif.</em> Mme <strong>Élodie MARTIN</strong>, 33 ans, phototype II, se présente à l'Institut Ligne & Teint. Elle a fait réaliser des taches de rousseur dans un autre établissement il y a plusieurs mois (cicatrisation complète). Elle est déçue : « On dirait des points faits au feutre, tous pareils, alignés sur le nez. » À l'observation : une trentaine de taches de même taille, brun moyen, régulièrement espacées, dont deux alignements nets sur l'arête du nez ; pas de virage gris ; peau calme. Elle ne dispose pas des références des pigments utilisés.</p>
<p><strong>Travail demandé :</strong></p>
<ol>
<li>Que pouvez-vous lui proposer, et quelles sont les limites ?</li>
<li>Quelles informations et quels documents devez-vous recueillir avant toute intervention ?</li>
<li>Décrivez votre stratégie de réalisation.</li>
<li>Comment présentez-vous votre proposition pour éviter une nouvelle déception ?</li>
</ol>
<h3>Corrigé commenté</h3>
<p><strong>1. Proposition et limites.</strong> La correction ne peut pas « effacer » les taches existantes : la dermopigmentation ajoute du pigment, elle n'en retire pas. On peut en revanche <strong>casser la régularité</strong> en intercalant des taches de tailles plus petites et de nuances légèrement différentes (plus claires et plus chaudes), en créant des grappes et en prolongeant le gradient vers la périphérie, ce qui « noie » les alignements dans un semis plus naturel. Limite : le nombre total de taches augmentera, et l'effet sera plus marqué. Si la cliente veut moins de taches, la correction n'est pas la bonne réponse : elle peut se renseigner auprès des professionnels qui pratiquent le détatouage, notamment par laser, qui relève d'un cadre médical. La praticienne présente honnêtement les deux options.</p>
<p><strong>2. Informations et documents.</strong> Questionnaire de santé complet (contre-indications, allergies, réactions lors de la première prestation) ; date de la prestation précédente et confirmation de la cicatrisation complète ; photos avant (avec autorisation) ; information préalable écrite ; devis ; consentement éclairé après validation du dessin ; mention sur la fiche que les pigments d'origine sont inconnus, ce qui limite la prévisibilité du rendu en superposition.</p>
<p><strong>3. Stratégie.</strong> Analyse des alignements (repérer les deux lignes sur le nez) ; dessin préparatoire au crayon : taches très petites et petites intercalées hors de l'axe des alignements, petites grappes, quelques taches isolées en périphérie ; deux nuances chaudes, l'une proche des taches existantes, l'autre plus claire ; point unique, profondeur superficielle, contacts brefs ; travail modéré en première séance, évaluation après cicatrisation complète et retouche si nécessaire.</p>
<p><strong>4. Présentation.</strong> Montrer le dessin au crayon et le faire valider au miroir ; expliquer clairement ce qui va changer (aspect plus naturel, plus de taches) et ce qui ne changera pas (les taches existantes restent) ; consigner sur la fiche et sur le devis l'objectif convenu (« casser la régularité du semis existant »). Ne pas critiquer le travail de l'établissement précédent : rester factuel et centré sur la solution.</p>
<h3>Grille d'auto-évaluation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Acquis</th><th>À revoir</th></tr>
<tr><td>J'ai expliqué qu'on ne retire pas de pigment par dermopigmentation</td><td></td><td></td></tr>
<tr><td>J'ai proposé une stratégie précise pour casser la régularité</td><td></td><td></td></tr>
<tr><td>J'ai choisi des bruns chauds et une profondeur superficielle</td><td></td><td></td></tr>
<tr><td>J'ai recueilli les documents et noté l'inconnue sur les pigments d'origine</td><td></td><td></td></tr>
<tr><td>Je suis resté(e) factuel(le), sans dénigrer le travail précédent</td><td></td><td></td></tr>
</table>`,
      },
    ],
  },
  {
    title: "Chapitre 12 – Soins post-prestation, retouche et bonnes pratiques (C11)",
    description:
      "Jour 3, en présentiel. Compétence C11 – Procéder aux soins post-prestation et communiquer les bonnes pratiques. Étapes de la cicatrisation (environ 4 à 6 semaines), soins immédiats, consignes écrites remises à la cliente, évolution normale de la couleur, retouche après cicatrisation complète, suivi et photos, complications et orientation médicale, entretien à long terme (protection solaire, IRM, laser), gestion des réclamations et de l'insatisfaction, traçabilité et conservation du dossier (RGPD), fidélisation éthique. Quiz corrigé et cas pratique corrigé.",
    sections: [
      {
        title: "12.1 – Les étapes de la cicatrisation",
        content: `<h3>Ce qui se passe dans la peau</h3>
<p>La dermopigmentation crée une multitude de micro-effractions jusqu'à la jonction dermo-épidermique. La peau réagit comme à toute plaie superficielle : inflammation, reconstruction de l'épiderme, élimination d'une partie du pigment déposé, puis stabilisation du pigment retenu. La cicatrisation complète demande <strong>plusieurs semaines, environ 4 à 6</strong>, avec des variations selon la zone, la peau, l'âge, l'état de santé et le respect des consignes. C'est seulement après cette période que l'on peut juger le résultat et envisager une retouche.</p>
<h3>Les grandes phases, telles qu'on les explique à la cliente</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Phase (repère indicatif)</th><th>Ce que la cliente observe</th><th>Ce qu'elle doit faire</th></tr>
<tr><td>Les premiers jours</td><td>Couleur intense, plus foncée et plus nette que le résultat final ; rougeur, légère sensibilité ; œdème marqué pour les lèvres et parfois les paupières ; léger suintement possible au tout début.</td><td>Appliquer les soins indiqués, garder la zone propre, ne pas toucher avec des mains sales, éviter maquillage, soleil, eau chlorée, sauna.</td></tr>
<tr><td>La phase de desquamation</td><td>Fines croûtes ou petites peaux qui se détachent ; démangeaisons possibles ; la couleur paraît irrégulière.</td><td>Ne pas gratter, ne pas arracher les peaux ; laisser tomber naturellement ; continuer la crème cicatrisante recommandée en couche fine.</td></tr>
<tr><td>La phase « couleur atténuée »</td><td>Après la chute des peaux, la couleur semble très claire, voire laiteuse ou absente par endroits.</td><td>Patienter : la couleur remonte progressivement au fil des semaines. Ne pas juger le résultat à ce stade.</td></tr>
<tr><td>La stabilisation</td><td>La couleur se stabilise, plus douce et plus naturelle qu'au premier jour ; les éventuelles zones manquantes apparaissent.</td><td>Rendez-vous de contrôle ; décision de retouche après cicatrisation complète.</td></tr>
</table>
<h3>Les variations selon la zone</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Zone</th><th>Particularités de cicatrisation</th></tr>
<tr><td>Sourcils (microblading)</td><td>Les traits manuels peuvent s'estomper inégalement ; les peaux grasses retiennent souvent moins bien les traits fins et les rendent plus flous.</td></tr>
<tr><td>Sourcils (ombré, poudré)</td><td>Effet poudré qui paraît très soutenu au début puis s'adoucit nettement.</td></tr>
<tr><td>Eye-liner</td><td>Œdème possible des paupières les premiers jours ; zone fragile ; vigilance particulière à l'hygiène oculaire.</td></tr>
<tr><td>Lèvres</td><td>Œdème important les premiers jours, desquamation marquée, phase « couleur disparue » fréquente ; muqueuse voisine très exposée aux germes buccaux.</td></tr>
<tr><td>Taches de rousseur</td><td>Petites croûtes ponctuelles ; certaines taches s'estompent plus que d'autres.</td></tr>
</table>
<h3>Les facteurs qui influencent la cicatrisation</h3>
<ul>
<li><strong>La peau</strong> : peau grasse, peau très sèche, peau mature, phototype, tendance aux réactions pigmentaires.</li>
<li><strong>La technique</strong> : profondeur, nombre de passages, traumatisme de la zone.</li>
<li><strong>Le respect des consignes</strong> : grattage, soleil, eau chlorée, maquillage précoce, produits inadaptés.</li>
<li><strong>L'état de santé</strong> : diabète non équilibré, troubles de la cicatrisation, traitements (d'où l'importance du questionnaire de santé et des avis médicaux).</li>
<li><strong>Le mode de vie</strong> : tabac, sport intensif avec transpiration abondante, exposition professionnelle à la chaleur ou à la poussière.</li>
</ul>`,
      },
      {
        title: "12.2 – Soins immédiats et consignes écrites remises à la cliente",
        content: `<h3>Les soins immédiats en fin de séance</h3>
<ol>
<li>Nettoyage doux de la zone avec une compresse stérile (et, selon le protocole de l'institut, un produit adapté) pour retirer l'excédent de pigment et les sérosités.</li>
<li>Contrôle visuel de la zone : absence de saignement persistant, homogénéité, respect du dessin.</li>
<li>Application d'une <strong>fine couche de crème cicatrisante</strong> recommandée par la praticienne (produit cosmétique adapté, sans promesse thérapeutique), avec un applicateur à usage unique.</li>
<li>Photos « après » réalisées si la cliente l'a accepté.</li>
<li>Explication orale des consignes, puis <strong>remise des consignes écrites</strong>.</li>
<li>Proposition du rendez-vous de contrôle et de la date de retouche, après cicatrisation complète.</li>
</ol>
<h3>Pourquoi des consignes écrites</h3>
<p>L'<strong>arrêté du 3 décembre 2008</strong> impose une information préalable des clients sur les risques et les précautions à respecter <strong>après</strong> la réalisation. En pratique, la remise d'un document écrit, relu avec la cliente, permet :</p>
<ul>
<li>de s'assurer qu'elle repart avec une information complète, qu'elle pourra relire chez elle ;</li>
<li>de limiter les complications et les résultats décevants liés au non-respect des consignes ;</li>
<li>de conserver une preuve de l'information donnée (mention sur la fiche cliente, éventuellement signature d'un accusé de réception).</li>
</ul>
<h3>Le contenu type des consignes post-prestation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Thème</th><th>Consigne</th><th>Pourquoi</th></tr>
<tr><td>Hygiène</td><td>Se laver les mains avant de toucher la zone ; ne pas la toucher inutilement.</td><td>Prévenir l'infection.</td></tr>
<tr><td>Grattage</td><td><strong>Ne pas gratter</strong>, ne pas frotter, ne pas arracher les croûtes ni les peaux.</td><td>Arracher une croûte retire le pigment et peut laisser une zone claire ou une marque.</td></tr>
<tr><td>Soin</td><td>Appliquer la <strong>crème cicatrisante recommandée</strong>, en couche fine, selon la fréquence indiquée par la praticienne.</td><td>Favoriser une cicatrisation confortable ; une couche trop épaisse peut étouffer la peau.</td></tr>
<tr><td>Soleil</td><td><strong>Éviter le soleil</strong> et les UV artificiels pendant toute la cicatrisation.</td><td>Risque d'irritation, de troubles pigmentaires et d'altération de la couleur.</td></tr>
<tr><td>Eau et chaleur</td><td>Éviter la <strong>piscine</strong>, la mer, le <strong>sauna</strong>, le hammam et les bains prolongés pendant la cicatrisation.</td><td>Eau chlorée ou salée, chaleur et humidité favorisent l'irritation, l'infection et la perte de pigment.</td></tr>
<tr><td>Maquillage</td><td><strong>Pas de maquillage sur la zone</strong> pendant la cicatrisation.</td><td>Risque d'infection et d'irritation ; les produits peuvent pénétrer dans les micro-plaies.</td></tr>
<tr><td>Produits de soin</td><td>Éviter sur la zone les gommages, peelings, produits exfoliants ou acides, et les soins non recommandés.</td><td>Ils accélèrent l'élimination du pigment et irritent.</td></tr>
<tr><td>Sport</td><td>Éviter les activités entraînant une forte transpiration dans les premiers jours.</td><td>La transpiration irrite la zone et favorise la perte de pigment.</td></tr>
<tr><td>Spécifique lèvres</td><td>Alimentation tiède, éviter aliments très épicés ou acides ; boire à la paille si besoin ; pas de rouge à lèvres ni de gloss.</td><td>Confort et protection de la zone.</td></tr>
<tr><td>Spécifique eye-liner</td><td>Pas de mascara ni de maquillage des yeux pendant la cicatrisation ; ne pas frotter les yeux ; lentilles selon l'avis de l'ophtalmologiste de la cliente.</td><td>Zone oculaire fragile, risque infectieux.</td></tr>
<tr><td>Signes d'alerte</td><td>Consulter un médecin en cas de rougeur qui s'étend ou persiste, gonflement qui augmente, douleur croissante, chaleur, écoulement purulent, fièvre, vésicules, démangeaisons intenses ou plaques.</td><td>Orientation médicale rapide en cas de complication.</td></tr>
<tr><td>Contact</td><td>Coordonnées de l'institut pour toute question ; rendez-vous de contrôle.</td><td>Suivi et réassurance.</td></tr>
</table>
<p>Les consignes sont adaptées à la zone traitée. Elles ne contiennent <strong>aucune recommandation de médicament</strong> : en cas de besoin, la cliente s'adresse à son médecin ou à son pharmacien. Un modèle complet de fiche de consignes figure au chapitre 13.</p>
<h3>Vérifier la compréhension</h3>
<p>La praticienne ne se contente pas de remettre le document. Elle demande à la cliente de reformuler les trois points essentiels (« Qu'est-ce que vous ne devez surtout pas faire ? Quand revenez-vous ? Que faites-vous si la zone devient très rouge et chaude ? »). Elle adapte son explication si la cliente maîtrise mal le français, a une déficience visuelle (document en gros caractères, lecture à voix haute) ou auditive (explications écrites complètes, échanges par écrit).</p>`,
      },
      {
        title: "12.3 – L'évolution normale de la couleur",
        content: `<h3>Préparer la cliente à ce qu'elle va voir</h3>
<p>La principale source d'inquiétude des clientes pendant la cicatrisation est l'évolution de la couleur. Une information claire avant et après la séance évite beaucoup d'appels anxieux et de réclamations prématurées.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Moment</th><th>Aspect de la couleur</th><th>Explication à donner</th></tr>
<tr><td>Juste après la séance</td><td>Plus foncée, plus nette, plus saturée que prévu</td><td>Le pigment est encore en surface et mêlé aux sérosités ; une partie va s'éliminer.</td></tr>
<tr><td>Phase de desquamation</td><td>Irrégulière, par plaques</td><td>Les petites peaux emportent un peu de pigment de surface ; c'est normal.</td></tr>
<tr><td>Après la chute des peaux</td><td>Très claire, voilée, parfois presque invisible</td><td>Une nouvelle couche d'épiderme recouvre le pigment et le voile ; la couleur remonte progressivement.</td></tr>
<tr><td>Fin de cicatrisation</td><td>Couleur stabilisée, plus douce et plus naturelle</td><td>C'est le résultat sur lequel on se prononce ; la retouche corrige les manques.</td></tr>
<tr><td>Les mois et années suivants</td><td>Atténuation progressive</td><td>Le maquillage est semi-permanent : il s'estompe avec le temps, à un rythme variable selon la peau, le soleil et les soins.</td></tr>
</table>
<h3>Distinguer l'évolution normale du virage</h3>
<p>Le <strong>virage</strong> est un changement de teinte du pigment dans la peau (vers le gris, le bleu, le rose-orangé, le saumon) qui apparaît souvent à plus long terme. Il est lié à la composition du pigment, à son vieillissement, à la profondeur d'effraction, à l'exposition solaire et à la carnation. On ne parle pas de virage pendant la cicatrisation : une couleur qui paraît grisée pendant la phase de voile peut retrouver sa teinte une fois la peau stabilisée. La praticienne attend la cicatrisation complète pour évaluer.</p>
<h3>La tenue dans le temps</h3>
<p>La tenue s'exprime en « plusieurs années » avec une atténuation progressive, sans durée garantie : elle varie selon la peau (les peaux grasses retiennent souvent moins), la zone (les lèvres sont plus variables), l'exposition au soleil, les soins utilisés (produits exfoliants, acides) et la technique. La praticienne n'annonce jamais une durée précise et ne promet pas de résultat. Une séance d'entretien (« rafraîchissement ») peut être proposée quand la cliente le souhaite, après évaluation.</p>`,
      },
      {
        title: "12.4 – La retouche après cicatrisation complète",
        content: `<h3>Le rôle de la retouche</h3>
<p>La retouche n'est pas un « rattrapage » d'erreur : c'est une étape normale du protocole, qui permet de compléter les zones où le pigment a moins tenu, d'ajuster l'intensité ou la nuance et, éventuellement, d'affiner le dessin en accord avec la cliente. Elle se réalise <strong>uniquement après cicatrisation complète</strong>, quand la couleur est stabilisée et lisible.</p>
<h3>Pourquoi attendre la cicatrisation complète</h3>
<ul>
<li>Intervenir sur une peau encore en reconstruction augmente le traumatisme, le risque infectieux et le risque de cicatrice.</li>
<li>La couleur n'étant pas stabilisée, on risque de surcharger une zone qui allait « remonter » d'elle-même.</li>
<li>Le dessin peut paraître asymétrique pendant la cicatrisation (desquamation inégale) sans l'être réellement.</li>
</ul>
<h3>Le protocole de la retouche</h3>
<ol>
<li><strong>Bilan</strong> : comparer avec les photos avant, du dessin validé et de fin de séance ; recueillir le ressenti de la cliente ; vérifier le respect des consignes et les éventuels incidents de cicatrisation.</li>
<li><strong>Mise à jour du questionnaire de santé</strong> : nouveau traitement, grossesse, injections, poussée d'herpès, etc.</li>
<li><strong>Décision partagée</strong> : zones à compléter, ajustement de la couleur ou de la densité ; la cliente valide.</li>
<li><strong>Réalisation</strong> : même chaîne d'hygiène, mêmes règles de traçabilité (références et numéros de lot des pigments et des aiguilles utilisés lors de la retouche).</li>
<li><strong>Consignes post-prestation</strong> remises à nouveau.</li>
<li><strong>Photos</strong> et mise à jour de la fiche cliente.</li>
</ol>
<h3>Quand ne pas faire la retouche</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Conduite</th></tr>
<tr><td>Cicatrisation incomplète</td><td>Reporter.</td></tr>
<tr><td>Nouvelle contre-indication (grossesse, traitement, lésion active…)</td><td>Reporter ; avis médical préalable si nécessaire.</td></tr>
<tr><td>Complication en cours ou récente (infection, réaction allergique)</td><td>Pas de retouche ; orientation médicale ; ne reprendre qu'avec un avis médical favorable.</td></tr>
<tr><td>Demande excessive (couleur beaucoup plus foncée, dessin très élargi)</td><td>Expliquer les risques, proposer une évolution raisonnable ; refuser si la demande va contre l'intérêt de la cliente.</td></tr>
</table>
<h3>Informer dès le devis</h3>
<p>Le devis précise si la retouche est incluse dans le prix de la prestation ou facturée à part, et dans quel délai elle doit être réalisée selon la politique de l'institut. La praticienne explique clairement ces conditions pour éviter toute incompréhension.</p>`,
      },
      {
        title: "12.5 – Suivi de la cliente et photos",
        content: `<h3>Le suivi, partie intégrante de la prestation</h3>
<p>Le suivi rassure la cliente, permet de détecter tôt une anomalie et nourrit la progression technique de la praticienne. Il s'organise en plusieurs temps :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Moment</th><th>Action</th><th>Trace</th></tr>
<tr><td>Fin de séance</td><td>Consignes écrites, rendez-vous de contrôle proposé</td><td>Fiche cliente : consignes remises, date du contrôle</td></tr>
<tr><td>Premiers jours</td><td>Disponibilité pour répondre aux questions (téléphone, messagerie professionnelle)</td><td>Note des échanges significatifs sur la fiche</td></tr>
<tr><td>Après cicatrisation complète</td><td>Rendez-vous de contrôle : photos, bilan, décision de retouche</td><td>Photos datées, observations</td></tr>
<tr><td>Après la retouche</td><td>Nouveau contrôle si nécessaire</td><td>Photos, fiche mise à jour</td></tr>
<tr><td>À long terme</td><td>Proposition d'entretien quand la couleur s'atténue, sans relance insistante</td><td>Historique des prestations</td></tr>
</table>
<h3>Les bonnes pratiques photographiques</h3>
<ul>
<li><strong>Toujours la même lumière</strong> (idéalement lumière du jour ou éclairage neutre constant), le même fond, la même distance et les mêmes angles (face, trois quarts droit et gauche, profil pour les lèvres).</li>
<li>Photos <strong>datées</strong> et classées dans le dossier de la cliente.</li>
<li>Pas de filtre, pas de retouche numérique : la photo est une pièce de suivi, elle doit être fidèle.</li>
<li>Stockage <strong>sécurisé</strong> (appareil professionnel, accès protégé), jamais sur un téléphone personnel partagé ni dans une messagerie grand public non maîtrisée.</li>
</ul>
<h3>Photos de suivi et droit à l'image</h3>
<p>Deux usages doivent être distingués :</p>
<ol>
<li><strong>Les photos de suivi</strong>, versées au dossier de la cliente pour le suivi technique : elles constituent des données personnelles, traitées avec l'accord de la cliente, et conservées de manière sécurisée.</li>
<li><strong>La diffusion</strong> (site internet, réseaux sociaux, portfolio, supports de formation) : elle exige une <strong>autorisation écrite de droit à l'image</strong>, précisant les supports, la durée et la possibilité de retirer son accord. La cliente peut refuser la diffusion tout en acceptant les photos de suivi.</li>
</ol>
<p>Même avec autorisation, la praticienne recadre si possible sur la zone traitée et ne publie pas d'informations permettant d'identifier la cliente au-delà de ce qu'elle a accepté.</p>`,
      },
      {
        title: "12.6 – Complications : reconnaître, orienter, tracer",
        content: `<h3>Le cadre d'intervention de la praticienne</h3>
<p>La praticienne en dermopigmentation n'est pas une professionnelle de santé. Face à une suite anormale, son rôle est de <strong>reconnaître les signes d'alerte</strong>, d'<strong>orienter sans délai vers un médecin</strong>, de <strong>ne pas aggraver</strong> (aucune manipulation, aucun produit conseillé) et de <strong>tracer</strong> l'événement. Elle ne pose aucun diagnostic et ne conseille aucun médicament.</p>
<h3>Tableau des complications et conduites à tenir</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Signes évocateurs</th><th>Conduite de la praticienne</th></tr>
<tr><td><strong>Rougeur prolongée</strong></td><td>Rougeur qui persiste ou s'étend au-delà des premiers jours, au lieu de diminuer</td><td>Inviter la cliente à consulter un médecin ; ne pas appliquer de nouveau produit ; noter l'échange et la date sur la fiche.</td></tr>
<tr><td><strong>Suspicion d'infection</strong></td><td>Douleur croissante, chaleur, gonflement qui augmente, écoulement purulent, croûtes jaunâtres épaisses, fièvre</td><td>Orientation médicale rapide ; aucune manipulation de la zone ; noter ; vérifier la traçabilité (lots des aiguilles et des pigments, déroulé de la séance) ; analyser les pratiques d'hygiène.</td></tr>
<tr><td><strong>Réaction allergique</strong></td><td>Démangeaisons intenses, plaques, gonflement qui s'étend, eczéma sur la zone, parfois à distance de la séance</td><td>Orientation médicale ; en cas de signes généraux (gêne respiratoire, gonflement du visage ou de la gorge, malaise), appeler les secours (15 ou 112) ; noter les références et numéros de lot des pigments utilisés et les tenir à disposition du médecin.</td></tr>
<tr><td><strong>Poussée d'herpès</strong> (lèvres)</td><td>Vésicules, sensation de brûlure</td><td>Orientation vers le médecin ; pas de retouche tant que la poussée n'est pas guérie.</td></tr>
<tr><td><strong>Complication oculaire</strong> (eye-liner)</td><td>Rougeur de l'œil, douleur, écoulement, gêne visuelle</td><td>Orientation médicale sans délai (médecin, ophtalmologiste ou urgences selon la gravité).</td></tr>
<tr><td><strong>Cicatrice, relief anormal, granulome</strong></td><td>Relief, induration, nodule sur la zone pigmentée</td><td>Orientation vers un médecin ou un dermatologue ; aucune retouche sur la zone.</td></tr>
<tr><td><strong>Migration, flou, virage</strong></td><td>Pigment qui diffuse au-delà du dessin, couleur gris-bleu</td><td>Problème esthétique, à évaluer après cicatrisation complète ; correction colorimétrique éventuelle si raisonnable ; sinon information sur les techniques de détatouage (laser) qui relèvent d'un cadre médical.</td></tr>
</table>
<h3>La traçabilité, outil de sécurité</h3>
<p>En cas de complication, la fiche cliente doit permettre de retrouver immédiatement : la date de la prestation, la zone, les pigments (références et <strong>numéros de lot</strong>), les aiguilles ou cartouches (numéros de lot), les produits utilisés (antiseptique, soin), le questionnaire de santé et les consignes remises. Ces informations sont utiles au médecin et permettent, le cas échéant, d'identifier un lot de produit en cause.</p>
<h3>Signaler un effet indésirable lié à un produit</h3>
<p>Les produits de tatouage sont surveillés par l'<strong>ANSM</strong>. Lorsqu'un effet indésirable pourrait être lié à un produit, la praticienne peut le signaler auprès de l'ANSM, selon les modalités de signalement que l'agence met à disposition ; elle conserve si possible le flacon et son numéro de lot. Elle informe la cliente qu'elle-même ou son médecin peuvent aussi effectuer ce signalement.</p>
<h3>Analyser pour progresser</h3>
<p>Toute complication donne lieu à une analyse interne, sans recherche de culpabilité : hygiène, matériel, technique, information de la cliente, respect des consignes. Les enseignements sont intégrés au protocole (par exemple : renforcer l'explication d'une consigne, changer d'antiseptique, revoir la profondeur sur un type de peau).</p>`,
      },
      {
        title: "12.7 – Entretien à long terme : soleil, IRM, laser et soins",
        content: `<h3>Ce que la cliente doit savoir pour les années à venir</h3>
<p>Le maquillage semi-permanent s'atténue progressivement et peut interagir avec certains examens ou soins. La praticienne remet ces informations par écrit, en complément des consignes de cicatrisation.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Thème</th><th>Information à donner</th></tr>
<tr><td><strong>Protection solaire</strong></td><td>Le soleil accélère l'atténuation et peut modifier la couleur : protection solaire régulière sur les zones pigmentées (sourcils, taches de rousseur) ; baume protecteur pour les lèvres ; chapeau, lunettes.</td></tr>
<tr><td><strong>IRM</strong></td><td>Avant une IRM, <strong>informer le radiologue de la présence de pigments</strong> (maquillage permanent), en précisant les zones. C'est l'équipe médicale qui apprécie la conduite à tenir. La cliente ne doit jamais renoncer d'elle-même à un examen prescrit.</td></tr>
<tr><td><strong>Laser et soins esthétiques</strong></td><td>Avant une épilation laser, un traitement à lumière pulsée ou tout soin laser à proximité, signaler la présence de pigments au professionnel : le pigment peut réagir à la lumière et changer de couleur. Éviter de traiter directement la zone pigmentée sans avis du professionnel concerné.</td></tr>
<tr><td><strong>Produits de soin</strong></td><td>Les produits exfoliants, peelings, acides, et certains soins anti-âge appliqués sur la zone accélèrent l'atténuation. Les éviter sur les zones pigmentées ou les appliquer en les contournant.</td></tr>
<tr><td><strong>Injections esthétiques ultérieures</strong></td><td>Signaler le maquillage semi-permanent au médecin ; pour une retouche ultérieure, informer la praticienne des injections réalisées : un avis médical préalable sera demandé.</td></tr>
<tr><td><strong>Entretien</strong></td><td>Quand la couleur s'atténue, une séance d'entretien peut être envisagée, après évaluation et mise à jour du questionnaire de santé.</td></tr>
</table>
<h3>La carte ou fiche de suivi remise à la cliente</h3>
<p>Une bonne pratique consiste à remettre à la cliente une petite fiche récapitulative : date de la prestation et de la retouche, zone(s), nom commercial des pigments et numéros de lot, coordonnées de l'institut. Elle pourra la présenter à un médecin, à un radiologue ou à un autre professionnel de l'esthétique. Cette fiche ne contient pas de données de santé.</p>
<h3>Le corrigé ou la reprise d'un ancien maquillage</h3>
<p>Comme dans le cas de Mme Martine LEROY (ancien maquillage des sourcils viré au gris-bleu, cas étudié avec C5 et C7), une correction n'est envisagée qu'après analyse colorimétrique, information claire sur les limites, et seulement si elle est raisonnable. Lorsque le pigment est trop dense ou trop foncé, l'orientation vers les techniques de détatouage, notamment le laser, relevant d'un cadre médical, est préférable à une superposition de couleurs.</p>`,
      },
      {
        title: "12.8 – Gérer les réclamations et l'insatisfaction",
        content: `<h3>Une réclamation est une information</h3>
<p>Une cliente insatisfaite qui l'exprime offre une occasion de comprendre, de réparer et de progresser. Une réclamation mal gérée, au contraire, peut dégénérer en conflit, en avis négatif ou en litige. La praticienne adopte une démarche structurée et professionnelle.</p>
<h3>La méthode en six temps</h3>
<ol>
<li><strong>Accueillir</strong> : recevoir la cliente au calme, en cabine plutôt qu'à l'accueil ; l'écouter sans l'interrompre ni se justifier.</li>
<li><strong>Reformuler</strong> : « Si je comprends bien, vous trouvez que le sourcil gauche est plus haut que le droit et que la couleur est trop foncée. »</li>
<li><strong>Objectiver</strong> : comparer avec le dessin validé, les photos et la fiche ; vérifier où en est la cicatrisation ; examiner à la lumière du jour.</li>
<li><strong>Expliquer</strong> : distinguer ce qui relève de l'évolution normale (couleur encore en cours de stabilisation, desquamation inégale) de ce qui relève d'un écart réel.</li>
<li><strong>Proposer</strong> une solution adaptée : attendre la fin de cicatrisation, retouche, ajustement, correction colorimétrique si raisonnable ; ou, si la demande ne peut être satisfaite, l'expliquer et orienter.</li>
<li><strong>Tracer et suivre</strong> : noter la réclamation, la réponse et la solution sur la fiche et dans le registre des réclamations de l'institut ; recontacter la cliente.</li>
</ol>
<h3>Situations types</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Réclamation</th><th>Analyse</th><th>Réponse adaptée</th></tr>
<tr><td>« C'est beaucoup trop foncé » (au lendemain de la séance)</td><td>Évolution normale : la couleur est toujours plus intense au début</td><td>Rassurer, rappeler les phases de cicatrisation, renvoyer aux consignes écrites, fixer le contrôle.</td></tr>
<tr><td>« La couleur a disparu » (deuxième ou troisième semaine)</td><td>Phase de voile normale</td><td>Expliquer que la couleur remonte ; évaluation après cicatrisation complète.</td></tr>
<tr><td>« Il y a des trous dans mes sourcils » (après cicatrisation)</td><td>Tenue inégale du pigment</td><td>C'est l'objet de la retouche ; la programmer.</td></tr>
<tr><td>« Les deux sourcils ne sont pas pareils » (après cicatrisation)</td><td>Comparer avec le dessin validé et la morphologie ; asymétrie réelle ou asymétrie naturelle du visage ?</td><td>Si écart réel : correction à la retouche. Si asymétrie naturelle : l'expliquer, photos à l'appui.</td></tr>
<tr><td>« Ce n'est pas la couleur que je voulais »</td><td>Comparer avec la couleur notée sur la fiche et le choix validé</td><td>Ajustement possible à la retouche si raisonnable ; tirer les enseignements pour la phase de choix.</td></tr>
<tr><td>Signes d'infection ou d'allergie</td><td>Complication</td><td>Orientation médicale immédiate ; pas de retouche ; traçabilité.</td></tr>
</table>
<h3>Les postures à éviter</h3>
<ul>
<li>Se justifier ou contredire avant d'avoir écouté.</li>
<li>Rejeter la faute sur la cliente (« vous n'avez pas respecté les consignes ») sans éléments.</li>
<li>Promettre une correction impossible pour clore la discussion.</li>
<li>Intervenir à chaud sur une zone non cicatrisée pour « réparer vite ».</li>
<li>Répondre publiquement et de manière agressive à un avis négatif en ligne : une réponse courtoise, factuelle et sans donnée personnelle est préférable, avec une proposition d'échange direct.</li>
</ul>
<h3>Quand le désaccord persiste</h3>
<p>Si aucune solution amiable n'est trouvée malgré ces étapes, la praticienne reste courtoise, propose un dernier échange en présence de la gérante de l'institut, formalise par écrit sa proposition et conserve l'ensemble des pièces du dossier (fiche, photos, consentement, consignes remises, échanges). Ces pièces permettent de répondre de manière factuelle à toute suite éventuelle.</p>`,
      },
      {
        title: "12.9 – Traçabilité et conservation du dossier cliente",
        content: `<h3>Ce que contient le dossier</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Pièce</th><th>Contenu</th><th>Finalité</th></tr>
<tr><td>Fiche cliente</td><td>Identité, coordonnées, historique des prestations</td><td>Suivi, contact</td></tr>
<tr><td>Questionnaire de santé</td><td>Contre-indications, traitements, allergies, avis médicaux demandés et réponses</td><td>Sécurité de la prestation</td></tr>
<tr><td>Information préalable</td><td>Document remis sur les risques et les précautions (arrêté du 3 décembre 2008)</td><td>Preuve de l'information</td></tr>
<tr><td>Consentement éclairé</td><td>Signature après validation du dessin</td><td>Preuve du consentement</td></tr>
<tr><td>Traçabilité technique</td><td>Pigments (références, <strong>numéros de lot</strong>, dates de péremption), aiguilles ou cartouches (<strong>numéros de lot</strong>), réglages, observations</td><td>Sécurité, analyse en cas de complication, rappel de lot</td></tr>
<tr><td>Photos</td><td>Avant, dessin validé, après, contrôle, retouche</td><td>Suivi technique</td></tr>
<tr><td>Autorisation de droit à l'image</td><td>Portée de l'autorisation (supports, durée, retrait possible)</td><td>Conditions d'une éventuelle diffusion</td></tr>
<tr><td>Consignes post-prestation</td><td>Mention de leur remise</td><td>Preuve de l'information post-prestation</td></tr>
<tr><td>Échanges et réclamations</td><td>Dates, contenu, réponses</td><td>Suivi, gestion des litiges</td></tr>
</table>
<h3>Le RGPD appliqué au dossier cliente</h3>
<p>Le questionnaire de santé contient des <strong>données de santé</strong>, qui sont des <strong>données sensibles</strong> au sens du RGPD. Leur traitement suppose :</p>
<ul>
<li>une <strong>finalité</strong> précise (la sécurité de la prestation) et une collecte limitée aux informations nécessaires ;</li>
<li>le <strong>consentement explicite</strong> de la cliente pour le recueil de ces données, avec une information claire sur leur usage ;</li>
<li>une <strong>durée de conservation limitée</strong>, définie par l'institut, justifiée et annoncée à la cliente (l'institut fixe cette durée en fonction de ses besoins de suivi et de preuve, et la mentionne dans son information) ;</li>
<li>la <strong>sécurité</strong> : classeur fermé à clé pour le papier, accès protégé et sauvegardes pour le numérique, pas de partage avec des tiers non autorisés ;</li>
<li>le respect des <strong>droits de la cliente</strong> : accès, rectification, effacement dans les limites prévues, opposition ; un interlocuteur identifié pour les exercer ;</li>
<li>la tenue, par l'institut, d'un registre de ses traitements de données.</li>
</ul>
<h3>Les bons réflexes au quotidien</h3>
<ul>
<li>Ne jamais laisser une fiche cliente visible à l'accueil.</li>
<li>Ne pas échanger de photos ou de données de santé par une messagerie grand public non maîtrisée.</li>
<li>Remplir la fiche <strong>pendant ou juste après</strong> la prestation, pas de mémoire en fin de semaine.</li>
<li>Coller ou recopier immédiatement les numéros de lot (certaines praticiennes collent l'étiquette du sachet d'aiguilles sur la fiche).</li>
<li>Détruire de manière sécurisée les dossiers arrivés au terme de la durée de conservation.</li>
</ul>`,
      },
      {
        title: "12.10 – Fidélisation éthique",
        content: `<h3>Fidéliser par la qualité, pas par la pression</h3>
<p>Une cliente satisfaite d'une prestation de dermopigmentation revient pour la retouche, pour l'entretien et souvent pour d'autres zones ; elle recommande l'institut. Cette fidélité se construit par la qualité du résultat, la transparence de l'information et le suivi, jamais par une incitation excessive ou une promesse irréaliste.</p>
<h3>Les leviers de fidélisation compatibles avec l'éthique</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Levier</th><th>Bonne pratique</th><th>Dérive à éviter</th></tr>
<tr><td>Suivi</td><td>Contrôle après cicatrisation, disponibilité pour les questions</td><td>Relances commerciales répétées</td></tr>
<tr><td>Conseil</td><td>Conseils d'entretien adaptés, honnêtes</td><td>Vente forcée de produits sans utilité</td></tr>
<tr><td>Entretien</td><td>Proposer un rafraîchissement quand la couleur s'est atténuée</td><td>Pousser à des séances trop rapprochées</td></tr>
<tr><td>Nouvelles prestations</td><td>Les présenter quand elles répondent à un besoin exprimé</td><td>Multiplier les zones pour augmenter le panier</td></tr>
<tr><td>Communication</td><td>Photos autorisées de résultats cicatrisés, informations claires sur les prix (fictifs dans la formation) et les retouches</td><td>Photos retouchées, publicités promettant un résultat « parfait » ou « définitif »</td></tr>
<tr><td>Données</td><td>Utiliser les coordonnées pour le suivi ; demander un accord distinct pour la prospection</td><td>Utiliser le fichier clientes pour de la prospection sans accord</td></tr>
</table>
<h3>Savoir refuser</h3>
<p>La fidélisation passe aussi par la capacité à <strong>refuser une prestation</strong> qui ne serait pas dans l'intérêt de la cliente : contre-indication non levée, demande irréaliste, correction impossible, pression d'un tiers, cliente mineure sans consentement écrit d'un titulaire de l'autorité parentale. Un refus argumenté, bienveillant, avec une orientation si nécessaire, renforce la confiance.</p>
<h3>L'accessibilité comme marque de qualité</h3>
<p>Accueillir une cliente en situation de handicap (comme Mme Yasmine BELKACEM, qui utilise un fauteuil roulant, cas étudié avec C3) avec un poste adapté, des documents accessibles et un temps suffisant fait partie de la qualité de service. Une cliente bien accueillie revient et recommande.</p>`,
      },
      {
        title: "12.11 – Quiz C11 corrigé",
        content: `<h3>Questions</h3>
<ol>
<li>Combien de temps dure environ la cicatrisation complète d'une dermopigmentation ?</li>
<li>Citez cinq consignes post-prestation à remettre par écrit.</li>
<li>Quel texte impose l'information des clients sur les précautions à respecter après la réalisation ?</li>
<li>Pourquoi ne faut-il pas arracher les croûtes ?</li>
<li>Une cliente vous appelle trois semaines après ses sourcils poudrés : « la couleur a presque disparu ». Que lui répondez-vous ?</li>
<li>Quand réalise-t-on la retouche ?</li>
<li>Que doit faire une cliente porteuse d'un maquillage permanent avant une IRM ?</li>
<li>Quelles informations de traçabilité permettent d'identifier un produit en cause en cas de réaction ?</li>
<li>Pourquoi les données du questionnaire de santé demandent-elles une protection particulière ?</li>
<li>Une cliente accepte les photos de suivi mais refuse la publication. Que faites-vous ?</li>
<li>Quels signes justifient une orientation médicale sans attendre le contrôle ?</li>
<li>Citez deux postures à éviter face à une réclamation.</li>
</ol>
<h3>Corrigé</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Réponse attendue</th></tr>
<tr><td>1</td><td>Plusieurs semaines, environ 4 à 6, variable selon la zone, la peau et le respect des consignes.</td></tr>
<tr><td>2</td><td>Ne pas gratter ni arracher les croûtes ; éviter le soleil ; éviter piscine, mer, sauna et hammam ; pas de maquillage sur la zone pendant la cicatrisation ; appliquer la crème cicatrisante recommandée en couche fine ; mains propres ; éviter exfoliants et acides ; signes d'alerte et contact.</td></tr>
<tr><td>3</td><td>L'arrêté du 3 décembre 2008 (information préalable sur les risques et les précautions après la réalisation : affichage et document remis).</td></tr>
<tr><td>4</td><td>Arracher une croûte emporte le pigment, crée des manques et peut laisser une marque ; cela augmente aussi le risque d'infection.</td></tr>
<tr><td>5</td><td>C'est la phase normale de voile après la desquamation ; la couleur remonte progressivement ; on évalue le résultat après cicatrisation complète lors du contrôle ; rappel des consignes.</td></tr>
<tr><td>6</td><td>Après cicatrisation complète, quand la couleur est stabilisée, et en l'absence de contre-indication ou de complication.</td></tr>
<tr><td>7</td><td>Informer le radiologue de la présence de pigments et des zones concernées ; l'équipe médicale décide de la conduite à tenir ; ne pas renoncer à l'examen.</td></tr>
<tr><td>8</td><td>Les références et numéros de lot des pigments et des aiguilles ou cartouches, la date de la prestation, les produits utilisés.</td></tr>
<tr><td>9</td><td>Ce sont des données de santé, donc des données sensibles au sens du RGPD : consentement explicite, finalité limitée, conservation limitée, sécurité.</td></tr>
<tr><td>10</td><td>Prendre et conserver les photos de suivi dans le dossier sécurisé, ne pas les publier ; noter la portée de l'autorisation sur la fiche.</td></tr>
<tr><td>11</td><td>Rougeur qui s'étend ou persiste, gonflement croissant, douleur croissante, chaleur, écoulement purulent, fièvre, vésicules, démangeaisons intenses ou plaques ; signes généraux (gêne respiratoire, malaise) : appel des secours.</td></tr>
<tr><td>12</td><td>Se justifier avant d'écouter ; rejeter la faute sur la cliente sans éléments ; promettre l'impossible ; retoucher une zone non cicatrisée ; répondre agressivement en ligne.</td></tr>
</table>`,
      },
      {
        title: "12.12 – Cas pratique corrigé : un appel inquiet et une réclamation",
        content: `<h3>Énoncé</h3>
<p><em>Cas fictif.</em> Mme <strong>Laura VIDAL</strong> (34 ans, phototype II, sous-ton froid), cliente fil rouge, a bénéficié d'un microblading des sourcils à l'Institut Ligne & Teint. Situation en deux temps :</p>
<ul>
<li><strong>Cinq jours après la séance</strong>, elle appelle : « Ça me gratte énormément, il y a des petites peaux, et j'ai fait une séance de sauna hier, c'est grave ? »</li>
<li><strong>Après cicatrisation complète</strong>, au rendez-vous de contrôle, elle se plaint : « Le sourcil droit a des trous, et le gauche me paraît plus épais. »</li>
</ul>
<p><strong>Travail demandé :</strong> rédigez la réponse téléphonique du jour 5, puis la conduite à tenir lors du contrôle, en précisant ce que vous notez sur la fiche cliente.</p>
<h3>Corrigé commenté</h3>
<p><strong>Réponse du jour 5.</strong></p>
<ol>
<li>Écouter et poser des questions fermées pour repérer des signes d'alerte : « Avez-vous une rougeur qui s'étend, une chaleur, un gonflement qui augmente, un écoulement, de la fièvre ? » Réponse : non, seulement des démangeaisons et des petites peaux.</li>
<li>Rassurer : les démangeaisons et les petites peaux font partie de la phase normale de desquamation.</li>
<li>Rappeler les consignes : ne pas gratter ni arracher les peaux ; mains propres ; crème cicatrisante recommandée en couche fine ; éviter sauna, hammam, piscine, soleil et maquillage sur la zone pendant toute la cicatrisation. Expliquer sans reproche que le sauna peut favoriser l'irritation et la perte de pigment, et qu'il faut l'éviter jusqu'à la fin de la cicatrisation.</li>
<li>Indiquer les signes qui justifieraient de consulter un médecin sans attendre.</li>
<li>Confirmer la date du rendez-vous de contrôle.</li>
</ol>
<p><strong>Fiche cliente :</strong> date de l'appel ; motif ; absence de signes d'alerte déclarée ; séance de sauna au jour 4 signalée ; consignes rappelées.</p>
<p><strong>Conduite lors du contrôle.</strong></p>
<ol>
<li>Accueillir, écouter, reformuler la réclamation.</li>
<li>Objectiver : photos du dessin validé et de fin de séance, photos du jour à la même lumière ; observation. Constat : manques de pigment dans la queue du sourcil droit (zone peut-être plus exposée au frottement et au sauna) ; le sourcil gauche n'est pas plus épais sur les photos de fin de séance, mais la pilosité naturelle y est plus dense.</li>
<li>Expliquer : les manques sont fréquents après une première séance et sont l'objet de la retouche ; la différence d'épaisseur perçue tient surtout aux poils naturels, ce que les photos montrent.</li>
<li>Proposer : retouche du sourcil droit pour compléter les manques ; éventuel ajustement léger du dessin pour équilibrer visuellement, avec validation au miroir ; conseils sur l'entretien de la pilosité.</li>
<li>Mettre à jour le questionnaire de santé, réaliser la retouche dans le respect de la chaîne d'hygiène, noter les numéros de lot, remettre les consignes écrites.</li>
</ol>
<p><strong>Fiche cliente :</strong> réclamation et analyse ; photos de contrôle ; décision partagée ; détails de la retouche (pigments, lots, aiguilles, lots, réglages) ; consignes remises ; prochaine étape.</p>
<h3>Ce que le cas enseigne</h3>
<ul>
<li>Des questions précises permettent de distinguer suites normales et signes d'alerte.</li>
<li>Rappeler une consigne non respectée se fait sans reproche, en expliquant pourquoi.</li>
<li>Les photos standardisées objectivent une réclamation et apaisent la discussion.</li>
</ul>`,
      },
    ],
  },
  {
    title: "Chapitre 13 – Préparer la certification RS6459 et boîte à outils",
    description:
      "Jour 3, fin de journée, en présentiel, puis travail personnel jusqu'à la date d'épreuve fixée par le certificateur. Rappel des modalités officielles de la certification « Techniques de maquillage semi-permanent » (RS6459) : QCM et études de cas, cas pratiques sur peau latex 3D et sur modèle, mise en situation devant un jury de 3 professionnels externes avec 2 prestations (technique manuelle et technique électrique). Conseils pour les épreuves, grille d'auto-évaluation par compétence C1 à C11, QCM blanc de 20 questions corrigé, 2 études de cas corrigées, check-lists opérationnelles, modèles de documents (information préalable, consentement éclairé, fiche cliente avec traçabilité des lots, autorisation de droit à l'image, consignes post-prestation) et glossaire.",
    sections: [
      {
        title: "13.1 – Les modalités officielles de la certification RS6459",
        content: `<h3>La certification en bref</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Information</th></tr>
<tr><td>Intitulé</td><td>Techniques de maquillage semi-permanent</td></tr>
<tr><td>Code</td><td>RS6459 – Répertoire spécifique de France Compétences</td></tr>
<tr><td>Certificateurs</td><td>ZH GROUPE et ESTHETIQUE PROJECT</td></tr>
<tr><td>Enregistrement</td><td>Du 21/12/2023, échéance au 21/12/2026 ; dernière délivrance possible au 21/06/2027</td></tr>
<tr><td>Public</td><td>Professionnels de l'esthétique et de la beauté, indépendants ou salariés, qui mettent en œuvre le maquillage semi-permanent (dermopigmentation) en institut, centre esthétique, spa ou salon de coiffure</td></tr>
<tr><td>Prérequis à l'entrée</td><td>Expérience professionnelle dans le secteur de l'esthétique et de la beauté</td></tr>
<tr><td>Prérequis à la validation</td><td>Avoir suivi la formation aux conditions d'hygiène et de salubrité (21 h), obligatoire pour exercer</td></tr>
<tr><td>Handicap</td><td>Aménagements de parcours et d'épreuves possibles : à signaler le plus tôt possible au référent handicap de l'organisme et au certificateur</td></tr>
</table>
<h3>Les 11 compétences évaluées</h3>
<ul>
<li>C1 – Identifier les besoins de la cliente</li>
<li>C2 – Réaliser une évaluation personnalisée de la peau de la cliente, personnaliser son offre commerciale et remettre les documents légaux</li>
<li>C3 – Préparer son poste de travail, en tenant compte d'une éventuelle situation de handicap (la sienne ou celle de la cliente) et respecter les règles d'hygiène</li>
<li>C4 – Préparer la zone à traiter (sourcils, eye-liner, lèvres, taches de rousseur…)</li>
<li>C5 – Sélectionner les pigments adaptés au phototype de la cliente en appliquant les règles de colorimétrie</li>
<li>C6 – Sélectionner le dermographe, la taille des aiguilles et la vitesse d'effraction en fonction de la zone à traiter et de l'effet attendu, et adapter son mouvement et sa pression sur la zone</li>
<li>C7 – Réaliser une correction ou un embellissement des sourcils</li>
<li>C8 – Réaliser un embellissement des yeux en dessinant un eye-liner</li>
<li>C9 – Réaliser une correction ou un embellissement des lèvres</li>
<li>C10 – Créer des taches de rousseur</li>
<li>C11 – Procéder aux soins post-prestation et communiquer les bonnes pratiques</li>
</ul>
<h3>Les modalités d'évaluation de la certification</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Modalité</th><th>Contenu</th><th>Compétences surtout mobilisées</th></tr>
<tr><td><strong>QCM et études de cas</strong></td><td>Questions sur les connaissances (réglementation, hygiène, contre-indications, colorimétrie, matériel, cicatrisation) et analyse de situations clientes</td><td>C1, C2, C3, C5, C6, C11, et les connaissances associées à C7 à C10</td></tr>
<tr><td><strong>Cas pratiques</strong></td><td>Mises en situation professionnelle sur <strong>peau latex 3D</strong> et sur <strong>modèle</strong></td><td>C4, C6, C7 à C10</td></tr>
<tr><td><strong>Mise en situation devant jury</strong></td><td>Jury de <strong>3 professionnels du secteur de l'esthétique</strong>, experts en maquillage semi-permanent, <strong>externes à l'organisme certificateur</strong> ; réalisation de <strong>2 prestations</strong> de maquillage semi-permanent : une en <strong>technique manuelle</strong> et une en <strong>technique électrique</strong></td><td>Ensemble des compétences, de l'accueil aux consignes post-prestation</td></tr>
</table>
<h3>Articulation entre la formation et la certification</h3>
<p>La formation se déroule sur <strong>3 jours de 7 heures (21 heures)</strong>, en présentiel et en petit groupe. L'évaluation de fin de formation (QCM, études de cas, mise en situation sur latex et sur modèle) a lieu au jour 3 : elle mesure les acquis et prépare aux épreuves. Le <strong>passage devant le jury de certification</strong> (3 professionnels externes, 2 prestations : technique manuelle et technique électrique) a lieu <strong>selon le calendrier du certificateur</strong>, qui convoque les candidats et organise les épreuves. Entre la fin de la formation et l'épreuve, la stagiaire poursuit son entraînement sur peau latex 3D et, dans le respect de toutes les règles d'hygiène et du cadre réglementaire, sur modèles.</p>
<h3>Le cadre réglementaire à maîtriser pour les épreuves</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Repère</th><th>Ce qu'il faut savoir</th></tr>
<tr><td>Code de la santé publique, articles R1311-1 à R1311-13</td><td>Encadrent les techniques de tatouage par effraction cutanée, y compris le maquillage permanent, et le perçage.</td></tr>
<tr><td>Déclaration de l'activité (R1311-2)</td><td>Auprès du directeur général de l'ARS.</td></tr>
<tr><td>Formation hygiène et salubrité (R1311-3)</td><td>Obligatoire ; contenu fixé par l'arrêté du 12 décembre 2008 ; formation de 21 h dispensée par un organisme habilité.</td></tr>
<tr><td>Arrêté du 11 mars 2009</td><td>Bonnes pratiques d'hygiène et de salubrité pour la mise en œuvre des techniques de tatouage par effraction cutanée et du perçage.</td></tr>
<tr><td>Arrêté du 3 décembre 2008</td><td>Information préalable des clients sur les risques et les précautions à respecter après la réalisation (affichage et document remis).</td></tr>
<tr><td>Mineurs (R1311-11)</td><td>Interdiction sans le consentement écrit d'une personne titulaire de l'autorité parentale ou du tuteur.</td></tr>
<tr><td>DASRI (articles R1335-1 et suivants du CSP)</td><td>Tri à la source, collecteur pour objets piquants-coupants, convention avec un prestataire de collecte, bordereaux de suivi.</td></tr>
<tr><td>Produits de tatouage</td><td>Définis par le CSP (articles L513-10-1 et suivants), surveillés par l'ANSM ; règlement REACH (CE) n° 1907/2006 et restriction par le règlement (UE) 2020/2081 applicable depuis le 4 janvier 2022 ; Blue 15:3 et Green 7 restreints depuis le 4 janvier 2023 ; étiquetage : mention « Mélange destiné à être utilisé dans des tatouages ou des maquillages permanents », liste des ingrédients, numéro de lot.</td></tr>
<tr><td>RGPD et droit à l'image</td><td>Données de santé = données sensibles (consentement, conservation limitée, sécurité) ; autorisation écrite pour la diffusion des photos.</td></tr>
<tr><td>Anesthésie</td><td>Aucun produit anesthésiant relevant du médicament n'est prescrit, injecté ou fourni par la professionnelle ; les questions sont renvoyées vers le médecin ou le pharmacien.</td></tr>
</table>`,
      },
      {
        title: "13.2 – Conseils pour réussir les épreuves",
        content: `<h3>Avant l'épreuve</h3>
<ul>
<li><strong>Relire les 11 compétences</strong> et vérifier, avec la grille d'auto-évaluation (13.3), que chacune est maîtrisée.</li>
<li><strong>Refaire le QCM blanc</strong> (13.4) et les quiz de chaque chapitre jusqu'à obtenir des résultats stables ; reprendre les explications des réponses manquées.</li>
<li><strong>S'entraîner aux deux techniques</strong> : manuelle (microblading) et électrique (dermographe), sur peau latex 3D en chronométrant les étapes.</li>
<li><strong>Préparer son matériel</strong> selon la convocation et les consignes du certificateur : vérifier les dates de péremption, l'étiquetage des pigments, la disponibilité du matériel stérile à usage unique, des protections, du collecteur pour objets piquants-coupants.</li>
<li><strong>Préparer ses documents</strong> : modèles de fiche d'information préalable, de consentement éclairé, de fiche cliente avec traçabilité, d'autorisation de droit à l'image, de consignes post-prestation (13.7), si la convocation le prévoit.</li>
<li><strong>Organiser son modèle</strong> si l'épreuve en requiert un : vérifier en amont l'absence de contre-indication (questionnaire de santé), son accord écrit, sa disponibilité, et lui expliquer le déroulé.</li>
<li><strong>Signaler un besoin d'aménagement</strong> lié à un handicap dès l'inscription.</li>
</ul>
<h3>Pendant la mise en situation devant le jury</h3>
<p>Le jury observe une <strong>prestation complète</strong>, pas seulement un résultat. Il est attentif à la manière de travailler autant qu'au rendu.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Moment</th><th>Ce que le jury attend</th><th>Conseil</th></tr>
<tr><td>Accueil et entretien</td><td>Écoute, questions pertinentes, reformulation des attentes (C1)</td><td>Parler à voix haute de sa démarche : « Je vérifie… », « Je vous propose… »</td></tr>
<tr><td>Évaluation et documents</td><td>Questionnaire de santé, contre-indications, information préalable, consentement après validation du dessin (C2)</td><td>Ne jamais sauter la vérification des contre-indications, même sur un modèle connu.</td></tr>
<tr><td>Poste et hygiène</td><td>Chaîne d'hygiène complète et logique, matériel stérile à usage unique, protections, gestion des déchets (C3)</td><td>Suivre la check-list d'ouverture du poste (13.6) ; ne jamais toucher une surface non protégée avec des gants contaminés.</td></tr>
<tr><td>Préparation de la zone</td><td>Démaquillage, antisepsie, dessin préparatoire mesuré, symétrie, validation (C4)</td><td>Montrer les mesures, faire valider au miroir.</td></tr>
<tr><td>Choix des pigments</td><td>Justification colorimétrique selon le phototype et le sous-ton (C5)</td><td>Expliquer son choix en une ou deux phrases ; noter les lots.</td></tr>
<tr><td>Réglages</td><td>Choix d'aiguille, vitesse, profondeur, angle, tension, adaptés à la zone et à l'effet (C6)</td><td>Annoncer ses réglages et les justifier.</td></tr>
<tr><td>Réalisation</td><td>Technique maîtrisée, régularité, respect du dessin, gestion du confort (C7 à C10)</td><td>Travailler par passages contrôlés ; préférer un résultat juste à un résultat « chargé ».</td></tr>
<tr><td>Fin de prestation</td><td>Soins immédiats, consignes écrites et orales, retouche, remise en état du poste, traçabilité (C11)</td><td>Ne pas bâcler la fin : elle compte autant que le début.</td></tr>
</table>
<h3>Pour le QCM et les études de cas</h3>
<ul>
<li>Lire chaque question jusqu'au bout ; repérer les mots « toujours », « jamais », « obligatoire ».</li>
<li>Dans une étude de cas, identifier d'abord <strong>les signaux d'alerte</strong> (contre-indication, demande irréaliste, mineure, complication) avant de proposer une technique.</li>
<li>Structurer ses réponses : constat, analyse, décision, justification, traçabilité.</li>
<li>Ne jamais inventer de délai médical ni conseiller un médicament : la bonne réponse est l'avis médical préalable ou l'orientation.</li>
</ul>
<h3>Gérer son stress</h3>
<p>Préparer son matériel la veille, arriver en avance, respirer calmement avant de commencer, se référer à ses check-lists. Une erreur reconnue et corrigée proprement (par exemple, changer de gants après avoir touché une surface non protégée) est un signe de professionnalisme.</p>`,
      },
      {
        title: "13.3 – Grille d'auto-évaluation par compétence (C1 à C11)",
        content: `<h3>Mode d'emploi</h3>
<p>Pour chaque critère, cochez votre niveau : <strong>1</strong> = je ne sais pas encore faire ; <strong>2</strong> = je sais faire avec aide ; <strong>3</strong> = je sais faire seule ; <strong>4</strong> = je sais faire et expliquer. Tout critère à 1 ou 2 devient une priorité d'entraînement avant l'épreuve. Remplissez la grille à la fin du jour 3, puis à nouveau quelques jours avant l'épreuve.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Compétence</th><th>Critères observables</th><th>1</th><th>2</th><th>3</th><th>4</th></tr>
<tr><td>C1 – Identifier les besoins de la cliente</td><td>Je conduis un entretien avec des questions ouvertes ; je reformule ; j'identifie motivations, attentes, habitudes de maquillage, contraintes ; je repère une attente irréaliste.</td><td></td><td></td><td></td><td></td></tr>
<tr><td>C2 – Évaluation de la peau, offre et documents légaux</td><td>J'évalue le type de peau, le phototype et le sous-ton ; je recherche les contre-indications et demande un avis médical quand il le faut ; je propose une offre et un devis adaptés ; je remets l'information préalable, la fiche cliente, le consentement, l'autorisation de droit à l'image.</td><td></td><td></td><td></td><td></td></tr>
<tr><td>C3 – Poste de travail, handicap, hygiène</td><td>J'applique la chaîne d'hygiène (mains, gants, champ et matériel stériles à usage unique, protections, désinfection des surfaces, DASRI) ; j'adapte le poste à une situation de handicap ; j'adopte une posture ergonomique.</td><td></td><td></td><td></td><td></td></tr>
<tr><td>C4 – Préparer la zone</td><td>Je démaquille, j'applique l'antisepsie, je réalise un dessin préparatoire mesuré et symétrique, je le fais valider par la cliente.</td><td></td><td></td><td></td><td></td></tr>
<tr><td>C5 – Pigments et colorimétrie</td><td>Je détermine le phototype (I à VI) et le sous-ton ; j'utilise le cercle chromatique, les complémentaires et la neutralisation ; j'anticipe le virage ; je vérifie l'étiquetage et je note les lots.</td><td></td><td></td><td></td><td></td></tr>
<tr><td>C6 – Dermographe, aiguilles, vitesse, geste</td><td>Je choisis le dermographe et la configuration d'aiguille selon la zone et l'effet ; je règle la vitesse et la profondeur ; je maîtrise angle, tension, mouvement et pression.</td><td></td><td></td><td></td><td></td></tr>
<tr><td>C7 – Sourcils</td><td>Je construis un sourcil adapté à la morphologie ; je réalise un microblading régulier ; je réalise un ombré ou un poudré homogène ; j'analyse et je traite une correction raisonnable.</td><td></td><td></td><td></td><td></td></tr>
<tr><td>C8 – Eye-liner</td><td>Je respecte les précautions de la zone oculaire ; je réalise un ras de cils, un trait fin ou un trait étiré régulier et symétrique.</td><td></td><td></td><td></td><td></td></tr>
<tr><td>C9 – Lèvres</td><td>Je respecte la ligne cutanéo-muqueuse et la ligne humide ; je choisis contour, contour estompé, remplissage ou « lip blush » ; je neutralise une lèvre foncée ; je gère l'œdème et la sensibilité.</td><td></td><td></td><td></td><td></td></tr>
<tr><td>C10 – Taches de rousseur</td><td>Je construis un semis naturel (répartition, tailles, densités) ; je choisis des bruns chauds ; je travaille au point unique à profondeur superficielle.</td><td></td><td></td><td></td><td></td></tr>
<tr><td>C11 – Soins post-prestation et bonnes pratiques</td><td>J'applique les soins immédiats ; je remets et j'explique les consignes écrites ; j'organise la retouche après cicatrisation complète ; je reconnais les complications et j'oriente ; je gère une réclamation ; je trace.</td><td></td><td></td><td></td><td></td></tr>
</table>
<h3>Mon plan d'entraînement</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère à travailler</th><th>Action d'entraînement</th><th>Support</th><th>Échéance (avant l'épreuve)</th><th>Fait</th></tr>
<tr><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td><td></td></tr>
</table>`,
      },
      {
        title: "13.4 – QCM blanc de 20 questions corrigé",
        content: `<h3>Consignes</h3>
<p>Une seule bonne réponse par question. Temps conseillé : 20 minutes. Corrigez-vous ensuite avec le tableau et relisez les explications.</p>
<ol>
<li>Les articles R1311-1 à R1311-13 du code de la santé publique concernent :<br>a) Uniquement le tatouage artistique<br>b) Les techniques de tatouage par effraction cutanée, y compris le maquillage permanent, et le perçage<br>c) Uniquement le perçage<br>d) Les soins esthétiques sans effraction</li>
<li>Auprès de qui déclare-t-on l'activité de maquillage permanent ?<br>a) La mairie<br>b) Le directeur général de l'ARS<br>c) La chambre de commerce<br>d) L'ANSM</li>
<li>La formation aux conditions d'hygiène et de salubrité :<br>a) Est facultative<br>b) Est obligatoire ; son contenu est fixé par l'arrêté du 12 décembre 2008<br>c) Dure une journée<br>d) Est remplacée par la certification RS6459</li>
<li>Quel arrêté porte sur l'information préalable des clients sur les risques et les précautions après la réalisation ?<br>a) Arrêté du 3 décembre 2008<br>b) Arrêté du 11 mars 2009<br>c) Arrêté du 12 décembre 2008<br>d) Aucun</li>
<li>Pour une cliente de 16 ans :<br>a) La prestation est libre<br>b) La prestation est interdite sans le consentement écrit d'une personne titulaire de l'autorité parentale ou du tuteur<br>c) Un accord oral de la cliente suffit<br>d) Un accord téléphonique d'un parent suffit</li>
<li>Les aiguilles usagées sont éliminées :<br>a) Dans la poubelle ménagère, dans un sac fermé<br>b) Dans un collecteur pour objets piquants-coupants, filière DASRI<br>c) Dans les toilettes<br>d) Après rinçage, au tri sélectif</li>
<li>Quelle mention doit figurer sur l'étiquette d'un pigment ?<br>a) « Produit cosmétique »<br>b) « Mélange destiné à être utilisé dans des tatouages ou des maquillages permanents »<br>c) « Usage professionnel uniquement » seulement<br>d) Aucune mention particulière</li>
<li>Le règlement (UE) 2020/2081 :<br>a) Restreint des substances dangereuses dans les encres de tatouage et de maquillage permanent, et s'applique depuis le 4 janvier 2022<br>b) Interdit le maquillage permanent<br>c) Fixe la durée de la formation hygiène<br>d) Concerne uniquement les cosmétiques</li>
<li>Une cliente demande une crème anesthésiante. Vous :<br>a) Lui en fournissez une<br>b) Lui conseillez une marque<br>c) La renvoyez vers son médecin ou son pharmacien, sans fournir aucun produit relevant du médicament<br>d) Lui en injectez</li>
<li>Jusqu'où doit aller l'effraction en dermopigmentation ?<br>a) Le derme profond<br>b) L'hypoderme<br>c) L'épiderme, jusqu'à la jonction dermo-épidermique<br>d) La couche cornée uniquement</li>
<li>Une effraction trop profonde provoque surtout :<br>a) Une meilleure tenue sans inconvénient<br>b) Migration, flou, virage bleuté<br>c) Une cicatrisation plus rapide<br>d) Une couleur plus claire et plus nette</li>
<li>Un ancien sourcil viré au gris-bleu se neutralise en principe avec une famille :<br>a) Bleue<br>b) Grise<br>c) Orangée ou chaude<br>d) Noire</li>
<li>Le phototype de Fitzpatrick classe les peaux :<br>a) De I à VI selon leur réaction au soleil<br>b) De A à F selon l'hydratation<br>c) Selon l'âge<br>d) Selon la quantité de sébum</li>
<li>La technique manuelle de sourcils poil à poil s'appelle :<br>a) Le microshading<br>b) Le microblading<br>c) Le poudré<br>d) Le ras de cils</li>
<li>Avant une prestation eye-liner, une cliente signale une infection oculaire en cours. Vous :<br>a) Réalisez la prestation avec prudence<br>b) Reportez et demandez un avis médical<br>c) Utilisez un antiseptique plus fort<br>d) Réalisez uniquement la paupière inférieure</li>
<li>Sur les lèvres, on ne pigmente jamais :<br>a) Le contour<br>b) Le vermillon<br>c) La muqueuse humide<br>d) L'arc de Cupidon</li>
<li>Pour des taches de rousseur, on évite :<br>a) Les bruns chauds<br>b) Les tailles variées<br>c) Le noir et les bruns froids<br>d) Le dessin préparatoire</li>
<li>La retouche se réalise :<br>a) Le lendemain<br>b) Après cicatrisation complète<br>c) Pendant la desquamation<br>d) Jamais</li>
<li>Avant une IRM, la cliente doit :<br>a) Renoncer à l'examen<br>b) Informer le radiologue de la présence de pigments<br>c) Faire retirer son maquillage permanent<br>d) Ne rien dire</li>
<li>Les données du questionnaire de santé sont :<br>a) Des données ordinaires<br>b) Des données sensibles au sens du RGPD<br>c) Des données publiques<br>d) Libres de diffusion avec les photos</li>
</ol>
<h3>Corrigé</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>b</td><td>Le maquillage permanent est expressément inclus dans les techniques de tatouage par effraction cutanée.</td></tr>
<tr><td>2</td><td>b</td><td>Déclaration auprès du directeur général de l'ARS (R1311-2).</td></tr>
<tr><td>3</td><td>b</td><td>Obligatoire (R1311-3) ; arrêté du 12 décembre 2008 ; 21 h par un organisme habilité ; c'est aussi un prérequis à la validation de la certification.</td></tr>
<tr><td>4</td><td>a</td><td>L'arrêté du 11 mars 2009 porte sur les bonnes pratiques d'hygiène ; celui du 12 décembre 2008 sur la formation.</td></tr>
<tr><td>5</td><td>b</td><td>R1311-11 : consentement écrit d'une personne titulaire de l'autorité parentale ou du tuteur.</td></tr>
<tr><td>6</td><td>b</td><td>Tri à la source, collecteur pour objets piquants-coupants, prestataire de collecte et bordereaux de suivi.</td></tr>
<tr><td>7</td><td>b</td><td>Avec la liste des ingrédients et le numéro de lot.</td></tr>
<tr><td>8</td><td>a</td><td>Il complète REACH ; Blue 15:3 et Green 7 sont restreints depuis le 4 janvier 2023.</td></tr>
<tr><td>9</td><td>c</td><td>Aucun produit anesthésiant relevant du médicament n'est prescrit, injecté ou fourni par la professionnelle.</td></tr>
<tr><td>10</td><td>c</td><td>Trop superficiel : mauvaise tenue ; trop profond : migration, flou, virage.</td></tr>
<tr><td>11</td><td>b</td><td>Le pigment diffuse et paraît bleuté à travers la peau.</td></tr>
<tr><td>12</td><td>c</td><td>L'orangé est complémentaire du bleu ; la correction n'est envisagée que si elle est raisonnable.</td></tr>
<tr><td>13</td><td>a</td><td>Phototypes I (très clair, brûle toujours) à VI (peau noire).</td></tr>
<tr><td>14</td><td>b</td><td>Le microshading et le poudré relèvent de la technique électrique.</td></tr>
<tr><td>15</td><td>b</td><td>Infection oculaire ou chirurgie récente des yeux : report et avis médical.</td></tr>
<tr><td>16</td><td>c</td><td>La ligne humide est la limite intérieure.</td></tr>
<tr><td>17</td><td>c</td><td>Ils virent au gris-bleu ; on choisit des bruns chauds.</td></tr>
<tr><td>18</td><td>b</td><td>Quand la couleur est stabilisée, après environ 4 à 6 semaines.</td></tr>
<tr><td>19</td><td>b</td><td>L'équipe médicale décide ; on ne renonce pas à un examen prescrit.</td></tr>
<tr><td>20</td><td>b</td><td>Consentement explicite, finalité limitée, conservation limitée, sécurité.</td></tr>
</table>
<p><strong>Interprétation</strong> : 18 à 20, prête ; 15 à 17, revoir les thèmes manqués ; moins de 15, reprendre les chapitres correspondants et refaire le QCM quelques jours plus tard.</p>`,
      },
      {
        title: "13.5 – Deux études de cas corrigées",
        content: `<h3>Étude de cas n° 1 – Mme Martine LEROY : correction de sourcils virés</h3>
<p><em>Cas fictif.</em> Mme <strong>Martine LEROY</strong>, 63 ans, cliente de l'Institut Ligne & Teint, présente un ancien maquillage permanent des sourcils réalisé il y a de nombreuses années, aujourd'hui <strong>viré au gris-bleu</strong>, à la forme un peu trop arquée et haute. Elle souhaite « retrouver des sourcils naturels, châtain clair ». Elle prend un traitement anticoagulant. Ses sourcils naturels sont clairsemés et grisonnants ; sa peau est mature et fine.</p>
<p><strong>Questions :</strong></p>
<ol>
<li>Quels sont les points d'alerte ?</li>
<li>Quelle analyse colorimétrique proposez-vous ?</li>
<li>Quelle est votre proposition, et quelles sont ses limites ?</li>
<li>Quels documents et quelles traces prévoyez-vous ?</li>
</ol>
<p><strong>Corrigé.</strong></p>
<p><strong>1. Points d'alerte.</strong> Traitement anticoagulant : avis médical préalable obligatoire avant toute décision ; la praticienne ne conseille jamais de modifier le traitement. Peau mature et fine : profondeur et pression maîtrisées. Forme ancienne trop haute : une correction ne peut pas effacer le pigment existant situé au-dessus de la forme souhaitée. Pigments d'origine inconnus : rendu en superposition moins prévisible.</p>
<p><strong>2. Colorimétrie.</strong> Le gris-bleu résulte vraisemblablement d'un pigment froid ou noir, éventuellement déposé trop profondément. Pour neutraliser une dominante bleue, on utilise la complémentaire : une famille orangée ou chaude (correcteur), puis, après cicatrisation complète, un brun chaud clair compatible avec le châtain clair souhaité et la pilosité grisonnante. Un brun froid aggraverait le virage.</p>
<p><strong>3. Proposition et limites.</strong> Si l'ancien pigment est léger et que la forme existante peut être intégrée dans une forme plus naturelle (en épaississant légèrement vers le bas par exemple), une correction colorimétrique en technique électrique (ombré léger) est envisageable, en plusieurs séances séparées par une cicatrisation complète. Si le pigment est dense, ou si la partie haute dépasse nettement la forme souhaitée, la correction n'est pas raisonnable : la praticienne l'explique et informe la cliente de l'existence des techniques de détatouage, notamment le laser, qui relèvent d'un cadre médical, avant toute nouvelle dermopigmentation. Dans tous les cas, aucune promesse de résultat.</p>
<p><strong>4. Documents et traces.</strong> Questionnaire de santé avec mention de l'anticoagulant et de l'avis médical demandé (réponse consignée) ; photos avant à la lumière du jour (autorisation) ; information préalable écrite précisant les limites de la correction ; devis mentionnant les séances prévisibles ; dessin validé et photographié ; consentement après validation ; fiche technique (pigments, lots, aiguilles, lots, réglages) ; consignes post-prestation ; date du contrôle.</p>
<h3>Étude de cas n° 2 – Mme Sophie MARCHAND et Mme Yasmine BELKACEM : une journée à organiser</h3>
<p><em>Cas fictif.</em> Une praticienne de l'Institut Ligne & Teint a deux rendez-vous dans la même journée :</p>
<ul>
<li>Mme <strong>Sophie MARCHAND</strong>, 52 ans, porteuse de lentilles, presbyte, souhaite un <strong>eye-liner ras de cils</strong> ; elle indique avoir eu « une petite conjonctivite il y a quelques jours, presque finie ».</li>
<li>Mme <strong>Yasmine BELKACEM</strong>, 38 ans, utilise un <strong>fauteuil roulant</strong> ; elle vient pour des sourcils en <strong>technique poudrée</strong> ; aucune contre-indication déclarée.</li>
</ul>
<p><strong>Questions :</strong></p>
<ol>
<li>Que décidez-vous pour Mme MARCHAND ?</li>
<li>Si la prestation de Mme MARCHAND a lieu plus tard, quelles adaptations prévoyez-vous ?</li>
<li>Comment adaptez-vous le poste et l'accueil pour Mme BELKACEM ?</li>
<li>Quelles sont les étapes d'hygiène communes aux deux prestations ?</li>
</ol>
<p><strong>Corrigé.</strong></p>
<p><strong>1. Mme MARCHAND.</strong> Une infection oculaire récente ou en cours est une situation qui demande un <strong>avis médical préalable</strong> : la praticienne reporte la prestation, invite la cliente à consulter son médecin ou son ophtalmologiste et ne reprend qu'avec la guérison constatée et l'accord médical. Elle note l'échange sur la fiche.</p>
<p><strong>2. Adaptations ultérieures.</strong> Lentilles : demander à la cliente de venir sans lentilles, avec ses lunettes et leur étui, et de suivre l'avis de son ophtalmologiste pour la reprise du port après la prestation ; presbytie : documents en caractères agrandis et lecture à voix haute des consignes ; dessin validé avec ses lunettes de vue pour qu'elle voie réellement le tracé ; trait ras de cils fin, symétrique, couleur adaptée ; sécurité de la zone oculaire (tension douce de la paupière, aucune effraction sur la muqueuse, gestes lents) ; consignes spécifiques (pas de mascara ni de maquillage des yeux pendant la cicatrisation, ne pas frotter, signes d'alerte oculaires).</p>
<p><strong>3. Mme BELKACEM.</strong> Vérifier en amont l'accessibilité (entrée de plain-pied ou rampe, largeur des passages, cabine permettant de manœuvrer) ; lui demander comment elle préfère être installée : transfert sur la table si elle le souhaite et le peut, ou prestation dans son fauteuil avec une têtière ou un appui-tête adapté ; ajuster la hauteur du poste de la praticienne (tabouret réglable) pour garder une posture ergonomique ; prévoir le matériel à portée sans gêner la circulation ; ne jamais manipuler le fauteuil sans son accord ; prévoir un temps suffisant. Documents remis dans un format qui lui convient.</p>
<p><strong>4. Hygiène commune.</strong> Désinfection des surfaces ; friction hydroalcoolique ; gants à usage unique ; champ et matériel stériles à usage unique (aiguilles, cartouches) ; housse du dermographe et du cordon ; antisepsie de la peau ; numéros de lot notés ; élimination des objets piquants-coupants dans le collecteur, autres déchets souillés en filière DASRI ; retrait des protections et désinfection entre les deux clientes ; fiche cliente complétée.</p>`,
      },
      {
        title: "13.6 – Check-lists opérationnelles",
        content: `<h3>Check-list 1 – Ouverture du poste de travail</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Point de contrôle</th><th>Fait</th></tr>
<tr><td>Cabine propre, rangée, aérée ; éclairage fonctionnel</td><td></td></tr>
<tr><td>Surfaces de travail, fauteuil ou table, lampe : désinfectées avec un produit adapté</td><td></td></tr>
<tr><td>Collecteur pour objets piquants-coupants en place, non plein, à portée de main</td><td></td></tr>
<tr><td>Sacs DASRI et sacs pour déchets assimilés aux ordures ménagères en place</td><td></td></tr>
<tr><td>Stock vérifié : aiguilles et cartouches stériles à usage unique (emballages intacts, dates), lames de microblading stériles, gants, champs, compresses, cupules, housses</td><td></td></tr>
<tr><td>Pigments : étiquetage conforme (mention, ingrédients, lot), dates de péremption, flacons fermés</td><td></td></tr>
<tr><td>Dermographe : fonctionnement vérifié, propre, prêt à recevoir sa housse</td><td></td></tr>
<tr><td>Produit hydroalcoolique, antiseptique cutané, crème cicatrisante recommandée disponibles</td><td></td></tr>
<tr><td>Documents prêts : information préalable, questionnaire de santé, consentement, droit à l'image, consignes post-prestation, fiche cliente</td><td></td></tr>
<tr><td>Accessibilité vérifiée si une cliente en situation de handicap est attendue</td><td></td></tr>
</table>
<h3>Check-list 2 – Protocole sourcils (C7)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Fait</th></tr>
<tr><td>Fiche relue, questionnaire de santé mis à jour, contre-indications vérifiées</td><td></td></tr>
<tr><td>Photos avant (autorisation)</td><td></td></tr>
<tr><td>Démaquillage, antisepsie</td><td></td></tr>
<tr><td>Mesures : début, point le plus haut, fin du sourcil ; symétrie</td><td></td></tr>
<tr><td>Dessin validé au miroir ; consentement signé</td><td></td></tr>
<tr><td>Technique choisie : manuelle (microblading) ou électrique (ombré, poudré, combiné) ; justification</td><td></td></tr>
<tr><td>Pigment choisi selon phototype, sous-ton, pilosité ; lots notés</td><td></td></tr>
<tr><td>Lame ou aiguille stérile ouverte devant la cliente ; lot noté</td><td></td></tr>
<tr><td>Réalisation : profondeur maîtrisée, régularité, respect du dessin</td><td></td></tr>
<tr><td>Contrôle final, soin immédiat, consignes écrites, date de retouche</td><td></td></tr>
<tr><td>Remise en état, DASRI, fiche complétée</td><td></td></tr>
</table>
<h3>Check-list 3 – Protocole eye-liner (C8)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Fait</th></tr>
<tr><td>Absence d'infection oculaire et de chirurgie récente des yeux vérifiée (sinon : report, avis médical)</td><td></td></tr>
<tr><td>Lentilles retirées (venir sans lentilles, avec lunettes)</td><td></td></tr>
<tr><td>Démaquillage doux des yeux, antisepsie adaptée à la zone</td><td></td></tr>
<tr><td>Style choisi : ras de cils, trait fin, trait étiré ; dessin validé, consentement</td><td></td></tr>
<tr><td>Pigment adapté à la zone ; lot noté</td><td></td></tr>
<tr><td>Tension douce de la paupière, gestes lents, aucune effraction sur la muqueuse</td><td></td></tr>
<tr><td>Symétrie contrôlée yeux ouverts et fermés</td><td></td></tr>
<tr><td>Consignes spécifiques : pas de maquillage des yeux, ne pas frotter, signes d'alerte oculaires</td><td></td></tr>
</table>
<h3>Check-list 4 – Protocole lèvres (C9)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Fait</th></tr>
<tr><td>Antécédents d'herpès labial recherchés (avis médical si oui) ; pas de poussée en cours</td><td></td></tr>
<tr><td>Injections esthétiques récentes recherchées (avis du médecin injecteur si oui)</td><td></td></tr>
<tr><td>Calendrier des soins dentaires vérifié</td><td></td></tr>
<tr><td>Analyse colorimétrique du fond de la lèvre ; neutralisation si nécessaire</td><td></td></tr>
<tr><td>Dessin : axe médian, arc de Cupidon, commissures, ligne cutanéo-muqueuse ; validé ; consentement</td><td></td></tr>
<tr><td>Style : contour, contour estompé, remplissage, « lip blush »</td><td></td></tr>
<tr><td>Arrêt à la ligne humide ; passages légers</td><td></td></tr>
<tr><td>Information sur l'œdème et l'évolution de la couleur ; consignes spécifiques lèvres</td><td></td></tr>
</table>
<h3>Check-list 5 – Protocole taches de rousseur (C10)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Fait</th></tr>
<tr><td>Peau de la zone observée : pas de lésion active, grains de beauté repérés et évités</td><td></td></tr>
<tr><td>Intensité choisie (discrète, moyenne, marquée) ; zone délimitée</td><td></td></tr>
<tr><td>Deux nuances de brun chaud préparées ; aucun noir ; lots notés</td><td></td></tr>
<tr><td>Dessin : gradient, tailles variées, pas de ligne, pas de grille, pas de miroir ; validé ; consentement</td><td></td></tr>
<tr><td>Point unique, profondeur superficielle, contacts brefs, alternance des côtés</td><td></td></tr>
<tr><td>Arrêt avant la densité finale ; retouche prévue</td><td></td></tr>
</table>
<h3>Check-list 6 – Post-prestation (C11)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Fait</th></tr>
<tr><td>Nettoyage doux, contrôle visuel, crème cicatrisante recommandée en couche fine</td><td></td></tr>
<tr><td>Photos après (selon autorisation)</td><td></td></tr>
<tr><td>Consignes écrites remises et expliquées ; compréhension vérifiée</td><td></td></tr>
<tr><td>Signes d'alerte et coordonnées de l'institut communiqués</td><td></td></tr>
<tr><td>Rendez-vous de contrôle et retouche après cicatrisation complète proposés</td><td></td></tr>
<tr><td>Objets piquants-coupants dans le collecteur ; déchets souillés en filière DASRI</td><td></td></tr>
<tr><td>Protections retirées, surfaces désinfectées</td><td></td></tr>
<tr><td>Fiche cliente complète : lots des pigments et des aiguilles, réglages, observations, documents remis</td><td></td></tr>
</table>`,
      },
      {
        title: "13.7 – Modèles de documents",
        content: `<p>Les modèles ci-dessous sont à adapter à chaque institut (coordonnées, politique de retouche, durée de conservation des données). Les zones entre crochets sont à compléter. Ils sont proposés à titre pédagogique et ne remplacent pas une vérification de conformité propre à chaque structure.</p>
<h3>Modèle 1 – Fiche d'information préalable</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th colspan="2">INFORMATION PRÉALABLE – MAQUILLAGE SEMI-PERMANENT (DERMOPIGMENTATION)</th></tr>
<tr><td>Établissement</td><td>[Nom de l'institut, adresse, téléphone]</td></tr>
<tr><td>Nature de l'acte</td><td>Le maquillage semi-permanent est une technique de tatouage par effraction cutanée : des pigments sont introduits dans l'épiderme, jusqu'à la jonction dermo-épidermique, à l'aide d'aiguilles ou de lames stériles à usage unique. L'activité est déclarée auprès de l'ARS ; la praticienne a suivi la formation aux conditions d'hygiène et de salubrité.</td></tr>
<tr><td>Caractère semi-permanent</td><td>Le résultat s'atténue progressivement sur plusieurs années, à un rythme variable selon la peau, le soleil et les soins. Il n'est pas totalement réversible : le retrait éventuel relève de techniques de détatouage, notamment le laser, qui relèvent d'un cadre médical.</td></tr>
<tr><td>Risques</td><td>Rougeur, gonflement (œdème), sensibilité dans les jours suivants ; infection ; réaction allergique aux pigments ou aux produits, parfois à distance ; poussée d'herpès labial chez les personnes prédisposées (lèvres) ; troubles de la pigmentation ; résultat inégal nécessitant une retouche ; évolution de la couleur dans le temps (virage) ; interaction possible avec une IRM ou un traitement laser.</td></tr>
<tr><td>Contre-indications et précautions</td><td>Signalez-nous notamment : grossesse ou allaitement, traitement anticoagulant, diabète, troubles de la cicatrisation ou chéloïdes, affection de la peau sur la zone, antécédents d'herpès labial, traitement par isotrétinoïne, chimiothérapie ou radiothérapie, allergies, injections esthétiques récentes sur la zone, infection ou chirurgie récente des yeux. Un avis médical préalable pourra vous être demandé.</td></tr>
<tr><td>Anesthésie</td><td>Aucun produit anesthésiant relevant du médicament n'est prescrit, injecté ou fourni par l'institut. Pour toute question, adressez-vous à votre médecin ou à votre pharmacien.</td></tr>
<tr><td>Précautions après la réalisation</td><td>Ne pas gratter ; éviter le soleil, la piscine, le sauna et le maquillage sur la zone pendant la cicatrisation ; appliquer la crème cicatrisante recommandée ; consulter un médecin en cas de signe anormal. Des consignes écrites détaillées vous seront remises après la prestation.</td></tr>
<tr><td>Mineurs</td><td>Aucune prestation sans le consentement écrit d'une personne titulaire de l'autorité parentale ou du tuteur.</td></tr>
<tr><td>Remis le</td><td>[date] – Signature de la cliente attestant la remise : [ ]</td></tr>
</table>
<h3>Modèle 2 – Consentement éclairé</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th colspan="2">CONSENTEMENT ÉCLAIRÉ</th></tr>
<tr><td>Cliente</td><td>Nom, prénom : [ ] – Date de naissance : [ ]</td></tr>
<tr><td>Prestation</td><td>Zone : [sourcils / eye-liner / lèvres / taches de rousseur] – Technique : [manuelle / électrique] – Style : [ ]</td></tr>
<tr><td>Déclarations</td><td>Je déclare : avoir reçu et compris l'information préalable sur les risques et les précautions ; avoir répondu sincèrement au questionnaire de santé et signalé tout changement ; avoir validé le dessin préparatoire et la couleur ; avoir été informée du caractère semi-permanent du résultat, de l'évolution de la couleur pendant la cicatrisation et de la nécessité éventuelle d'une retouche après cicatrisation complète ; avoir été informée que je peux demander l'arrêt de la prestation à tout moment.</td></tr>
<tr><td>Cliente mineure</td><td>Consentement écrit de la personne titulaire de l'autorité parentale ou du tuteur : nom, qualité, signature [ ]</td></tr>
<tr><td>Date et signatures</td><td>Fait à [ ], le [ ] – Signature de la cliente : [ ] – Signature de la praticienne : [ ]</td></tr>
</table>
<h3>Modèle 3 – Fiche cliente avec traçabilité des lots</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th colspan="2">FICHE CLIENTE – DERMOPIGMENTATION</th></tr>
<tr><td>Identité et contact</td><td>Nom, prénom, date de naissance, téléphone, e-mail</td></tr>
<tr><td>Questionnaire de santé (données sensibles)</td><td>Grossesse / allaitement ; traitements en cours ; anticoagulants ; diabète ; troubles de la cicatrisation, chéloïdes ; affections cutanées ; herpès labial ; isotrétinoïne ; chimiothérapie / radiothérapie ; allergies ; injections esthétiques récentes (zone, date, praticien) ; infection ou chirurgie récente des yeux ; maquillage permanent antérieur. Avis médical demandé : [oui / non] – Réponse : [ ]</td></tr>
<tr><td>Consentement RGPD</td><td>J'accepte le recueil de mes données de santé pour la sécurité de la prestation : [ ] – Durée de conservation annoncée : [définie par l'institut] – Droits d'accès, de rectification et d'effacement auprès de : [ ]</td></tr>
<tr><td>Évaluation</td><td>Type de peau, phototype (I à VI), sous-ton, morphologie, attentes</td></tr>
</table>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Date</th><th>Zone / technique</th><th>Pigment(s) : référence</th><th>N° de lot pigment</th><th>Péremption</th><th>Aiguille / cartouche / lame : type</th><th>N° de lot</th><th>Réglages</th><th>Observations</th><th>Documents remis</th></tr>
<tr><td>[ ]</td><td>[ ]</td><td>[ ]</td><td>[ ]</td><td>[ ]</td><td>[ ]</td><td>[ ]</td><td>[ ]</td><td>[ ]</td><td>Information préalable, consentement, consignes</td></tr>
<tr><td>[retouche]</td><td>[ ]</td><td>[ ]</td><td>[ ]</td><td>[ ]</td><td>[ ]</td><td>[ ]</td><td>[ ]</td><td>[ ]</td><td>Consignes</td></tr>
</table>
<h3>Modèle 4 – Autorisation de droit à l'image</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th colspan="2">AUTORISATION D'UTILISATION DE L'IMAGE</th></tr>
<tr><td>Personne photographiée</td><td>Nom, prénom : [ ]</td></tr>
<tr><td>Photos concernées</td><td>Photos avant / après de la prestation [zone] réalisée le [date]</td></tr>
<tr><td>Usages autorisés (cocher)</td><td>[ ] Dossier de suivi uniquement (aucune diffusion) – [ ] Site internet de l'institut – [ ] Réseaux sociaux de l'institut – [ ] Portfolio présenté en cabine – [ ] Supports de formation</td></tr>
<tr><td>Conditions</td><td>[ ] Visage entier – [ ] Zone traitée uniquement (recadrage) – Pas de nom associé sauf accord exprès</td></tr>
<tr><td>Durée</td><td>[durée choisie]</td></tr>
<tr><td>Retrait</td><td>Je peux retirer mon autorisation à tout moment, par écrit, pour les diffusions futures.</td></tr>
<tr><td>Contrepartie</td><td>Autorisation consentie à titre gratuit.</td></tr>
<tr><td>Date et signature</td><td>[ ]</td></tr>
</table>
<h3>Modèle 5 – Fiche de consignes post-prestation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th colspan="2">VOS CONSIGNES APRÈS LA PRESTATION – à conserver</th></tr>
<tr><td>Prestation</td><td>Zone : [ ] – Date : [ ] – Contrôle prévu le : [ ]</td></tr>
<tr><td>Cicatrisation</td><td>Elle dure plusieurs semaines (environ 4 à 6). La couleur est d'abord intense, puis s'éclaircit, peut sembler presque disparaître, puis remonte et se stabilise. Le résultat se juge après cicatrisation complète.</td></tr>
<tr><td>À faire</td><td>Se laver les mains avant de toucher la zone ; appliquer la crème cicatrisante recommandée en couche fine, [fréquence indiquée par la praticienne] ; garder la zone propre.</td></tr>
<tr><td>À ne pas faire pendant la cicatrisation</td><td>Ne pas gratter ni arracher les croûtes ou les peaux ; pas de soleil ni d'UV ; pas de piscine, mer, sauna, hammam ; pas de maquillage sur la zone ; pas de gommage, peeling ou produit acide sur la zone ; éviter le sport avec forte transpiration les premiers jours.</td></tr>
<tr><td>Lèvres</td><td>Alimentation tiède, éviter épices et aliments acides ; paille si besoin ; pas de rouge à lèvres ni de gloss.</td></tr>
<tr><td>Eye-liner</td><td>Pas de mascara ni de maquillage des yeux ; ne pas frotter ; lentilles selon l'avis de votre ophtalmologiste.</td></tr>
<tr><td>Consultez un médecin si</td><td>Rougeur qui s'étend ou persiste, gonflement qui augmente, douleur croissante, chaleur, écoulement, fièvre, vésicules, démangeaisons intenses, plaques. En cas de gêne respiratoire ou de malaise : appelez le 15 ou le 112.</td></tr>
<tr><td>À long terme</td><td>Protection solaire ; avant une IRM, informez le radiologue de la présence de pigments ; avant un soin laser ou à lumière pulsée, signalez votre maquillage semi-permanent.</td></tr>
<tr><td>Contact</td><td>[Téléphone et e-mail de l'institut]</td></tr>
<tr><td>Remise</td><td>Consignes reçues et expliquées le [date] – Signature : [ ]</td></tr>
</table>`,
      },
      {
        title: "13.8 – Glossaire",
        content: `<p>Les termes ci-dessous sont classés par ordre alphabétique. Ils correspondent au vocabulaire attendu lors des épreuves et dans les échanges professionnels.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Terme</th><th>Définition</th></tr>
<tr><td>Aiguille (configuration)</td><td>Disposition et nombre de pointes d'une aiguille de dermographe (une pointe, rondes groupées, magnum…), choisis selon la zone et l'effet.</td></tr>
<tr><td>ANSM</td><td>Agence nationale de sécurité du médicament et des produits de santé ; assure notamment la surveillance des produits de tatouage.</td></tr>
<tr><td>Antisepsie</td><td>Opération visant à réduire les micro-organismes présents sur la peau avant l'effraction, au moyen d'un antiseptique adapté.</td></tr>
<tr><td>Arc de Cupidon</td><td>Courbe en double arc du bord de la lèvre supérieure ; repère de symétrie.</td></tr>
<tr><td>ARS</td><td>Agence régionale de santé ; l'activité de maquillage permanent est déclarée auprès de son directeur général.</td></tr>
<tr><td>Asepsie</td><td>Ensemble des mesures visant à empêcher l'apport de micro-organismes (matériel stérile, champ stérile, gestes adaptés).</td></tr>
<tr><td>Cartouche</td><td>Module stérile à usage unique contenant l'aiguille, qui se fixe sur un dermographe à cartouches ; souvent munie d'une membrane anti-reflux.</td></tr>
<tr><td>Cercle chromatique</td><td>Représentation circulaire des couleurs permettant de visualiser les couleurs primaires, secondaires et complémentaires.</td></tr>
<tr><td>Chéloïde</td><td>Cicatrice épaisse et en relief qui déborde de la plaie initiale ; une tendance aux chéloïdes demande un avis médical préalable.</td></tr>
<tr><td>Cicatrisation</td><td>Processus de réparation de la peau après l'effraction ; dure plusieurs semaines (environ 4 à 6) en dermopigmentation.</td></tr>
<tr><td>Collecteur pour objets piquants-coupants</td><td>Conteneur rigide dédié aux aiguilles, cartouches et lames usagées, éliminé dans la filière DASRI.</td></tr>
<tr><td>Colorimétrie</td><td>Étude des couleurs et de leurs interactions, appliquée au choix des pigments selon la peau.</td></tr>
<tr><td>Commissure labiale</td><td>Point de jonction des lèvres supérieure et inférieure, au coin de la bouche.</td></tr>
<tr><td>Complémentaire (couleur)</td><td>Couleur opposée sur le cercle chromatique ; deux complémentaires se neutralisent.</td></tr>
<tr><td>Consentement éclairé</td><td>Accord écrit de la cliente, donné après information complète sur l'acte, ses risques et ses suites, et après validation du dessin.</td></tr>
<tr><td>Contour estompé</td><td>Contour des lèvres dont la couleur se dégrade vers l'intérieur.</td></tr>
<tr><td>Contre-indication</td><td>Situation dans laquelle la prestation ne doit pas être réalisée, ou seulement après avis médical.</td></tr>
<tr><td>DASRI</td><td>Déchets d'activités de soins à risques infectieux : tri à la source, collecteurs adaptés, convention avec un prestataire, bordereaux de suivi.</td></tr>
<tr><td>Dermographe</td><td>Appareil électrique (rotatif ou à cartouches) qui actionne l'aiguille pour introduire le pigment dans la peau.</td></tr>
<tr><td>Dermopigmentation</td><td>Introduction de pigments dans l'épiderme par effraction cutanée à des fins esthétiques ; synonyme professionnel de maquillage semi-permanent.</td></tr>
<tr><td>Dessin préparatoire</td><td>Tracé au crayon dermatologique de la forme à réaliser, mesuré et validé par la cliente avant l'effraction.</td></tr>
<tr><td>Desquamation</td><td>Élimination de fines peaux ou croûtes pendant la cicatrisation.</td></tr>
<tr><td>Droit à l'image</td><td>Droit de chaque personne d'autoriser ou de refuser la captation et la diffusion de son image ; la diffusion de photos exige une autorisation écrite.</td></tr>
<tr><td>Effraction cutanée</td><td>Pénétration de la peau par une aiguille ou une lame.</td></tr>
<tr><td>Éphélides</td><td>Taches de rousseur naturelles.</td></tr>
<tr><td>Épiderme</td><td>Couche superficielle de la peau ; la dermopigmentation y dépose le pigment, jusqu'à la jonction dermo-épidermique.</td></tr>
<tr><td>Eye-liner ras de cils</td><td>Trait fin placé au plus près de la racine des cils, qui densifie le regard sans effet maquillé.</td></tr>
<tr><td>Fitzpatrick (phototypes)</td><td>Classification des peaux de I à VI selon leur réaction au soleil (coup de soleil, bronzage).</td></tr>
<tr><td>Hyperpigmentation post-inflammatoire</td><td>Assombrissement de la peau à la suite d'une inflammation ; plus fréquente sur les peaux foncées.</td></tr>
<tr><td>Jonction dermo-épidermique</td><td>Limite entre l'épiderme et le derme ; profondeur visée en dermopigmentation.</td></tr>
<tr><td>Ligne cutanéo-muqueuse</td><td>Limite entre la peau du visage et le vermillon des lèvres ; repère du contour.</td></tr>
<tr><td>Ligne humide</td><td>Limite entre le vermillon sec et la muqueuse humide ; limite intérieure du travail sur les lèvres.</td></tr>
<tr><td>« Lip blush »</td><td>Remplissage léger des lèvres, en voile, au rendu naturel.</td></tr>
<tr><td>Microblading</td><td>Technique manuelle de sourcils réalisée avec une lame de micro-aiguilles stérile à usage unique, qui dessine des traits imitant les poils.</td></tr>
<tr><td>Microshading</td><td>Technique électrique de sourcils réalisée au dermographe, par points, pour un effet ombré ou poudré.</td></tr>
<tr><td>Migration</td><td>Diffusion du pigment au-delà du tracé, souvent liée à une effraction trop profonde.</td></tr>
<tr><td>Neutralisation</td><td>Utilisation d'une couleur complémentaire pour atténuer une dominante indésirable (fond de lèvre foncé, ancien pigment viré).</td></tr>
<tr><td>Numéro de lot</td><td>Identifiant de fabrication d'un pigment ou d'une aiguille, reporté sur la fiche cliente pour assurer la traçabilité.</td></tr>
<tr><td>Œdème</td><td>Gonflement transitoire de la zone après la prestation, particulièrement marqué sur les lèvres.</td></tr>
<tr><td>Phototype</td><td>Catégorie de peau selon sa réaction au soleil (classification de Fitzpatrick).</td></tr>
<tr><td>Pigment</td><td>Mélange coloré destiné à être utilisé dans des tatouages ou des maquillages permanents ; étiqueté avec liste des ingrédients et numéro de lot.</td></tr>
<tr><td>Poudré (effet)</td><td>Effet de sourcil ombré, homogène et doux, réalisé en technique électrique.</td></tr>
<tr><td>REACH</td><td>Règlement (CE) n° 1907/2006 sur les substances chimiques ; complété par le règlement (UE) 2020/2081 pour les encres de tatouage et de maquillage permanent.</td></tr>
<tr><td>Retouche</td><td>Séance complémentaire réalisée après cicatrisation complète pour compléter et ajuster le résultat.</td></tr>
<tr><td>RGPD</td><td>Règlement général sur la protection des données ; impose notamment un traitement protégé des données de santé (données sensibles).</td></tr>
<tr><td>Sous-ton</td><td>Nuance de fond de la carnation (froid, chaud, neutre), déterminante pour le choix du pigment.</td></tr>
<tr><td>Traçabilité</td><td>Capacité à retrouver, pour chaque prestation, les produits et matériels utilisés (lots), les réglages et les documents remis.</td></tr>
<tr><td>Vermillon</td><td>Partie rouge et sèche des lèvres, zone principale de pigmentation.</td></tr>
<tr><td>Virage</td><td>Changement de teinte d'un pigment dans la peau au fil du temps (vers le gris, le bleu, le saumon…).</td></tr>
<tr><td>Visagisme</td><td>Analyse de la morphologie du visage pour adapter la forme des sourcils, du trait d'eye-liner ou des lèvres.</td></tr>
</table>`,
      },
    ],
  },
];
