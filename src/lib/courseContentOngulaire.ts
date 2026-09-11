/**
 * Support de cours — Techniques de prothésie ongulaire (RS7302), 63 h.
 * Contenu intégralement statique (aucun appel réseau / IA).
 * Aligné sur le référentiel de certification (C1 à C10).
 */
import type { CourseChapter } from "./courseContent";

export function getOngulaireChapters(): CourseChapter[] {
  return [
    {
      title: "Chapitre 1 — Le métier de prothésiste ongulaire et la certification RS7302",
      description: "Positionnement du métier, cadre réglementaire, contenu de la certification et compétences C1 à C10.",
      sections: [
        {
          title: "1.1 Le métier et son environnement",
          content: `<p>La prothésiste ongulaire réalise des prestations d'<strong>embellissement et de construction de l'ongle</strong> : pose de gel, d'acrygel, de capsules ou de chablons, décoration (vernis semi-permanent, French, Babyboomer, nail art), remplissage et dépose. Elle exerce en institut de beauté, en salon de coiffure, en spa, en parfumerie, en bar à ongles ou à domicile sous statut indépendant.</p>
<p>Le métier est à la fois <strong>technique</strong> (maîtrise des produits, des gestes, de la lime et de la ponceuse), <strong>sanitaire</strong> (hygiène, stérilisation, prévention des mycoses et des allergies) et <strong>relationnel</strong> (diagnostic, conseil, fidélisation). Une prestation réussie tient autant à la solidité de la pose qu'à la qualité de l'échange avec la cliente.</p>
<p>Les interlocuteurs : la cliente, le fournisseur de produits cosmétiques (fiches techniques et de sécurité), et le cadre réglementaire européen sur les produits cosmétiques.</p>`,
        },
        {
          title: "1.2 La certification RS7302 « Techniques de prothésie ongulaire »",
          content: `<p>La certification est enregistrée au <strong>Répertoire spécifique</strong> sous le code <strong>RS7302</strong>. Elle s'adresse aux professionnels de l'esthétique (salariés ou indépendants) comme aux personnes novices souhaitant proposer une prestation de mise en beauté des ongles.</p>
<p>Elle atteste dix compétences :</p>
<ul>
<li><strong>C1</strong> — Accueillir la cliente, établir le dialogue, prendre en compte l'état des ongles naturels, les contre-indications et les situations de handicap, valider la faisabilité.</li>
<li><strong>C2</strong> — Préparer l'espace de travail et choisir les produits adaptés.</li>
<li><strong>C3</strong> — Respecter le protocole d'hygiène et de sécurité du poste.</li>
<li><strong>C4</strong> — Préparer l'ongle naturel (cuticules, limage du bord libre, matification, dépoussiérage).</li>
<li><strong>C5</strong> — Réaliser l'extension par capsule ou chablon.</li>
<li><strong>C6</strong> — Construire la prothésie (primer, base, gel de construction, apex, limage, finition).</li>
<li><strong>C7</strong> — Réaliser une décoration (semi-permanent, French, Babyboomer, effets, 3D).</li>
<li><strong>C8</strong> — Maîtriser les techniques de remplissage.</li>
<li><strong>C9</strong> — Finaliser le soin (huile cuticule, modelage hydratant).</li>
<li><strong>C10</strong> — Conseiller et informer sur les soins post-prestation.</li>
</ul>
<p>Les modalités d'évaluation sont au nombre de deux : <strong>M1</strong> — mise en situation sur modèle vivant, de l'accueil à la réalisation complète de la prestation ; <strong>M2</strong> — questionnaire « Techniques de prothésie ongulaire ».</p>`,
        },
        {
          title: "1.3 Anatomie et physiologie de l'ongle",
          content: `<p>L'ongle est une production cornée composée de kératine dure. Ses éléments : la <strong>matrice</strong> (zone de fabrication, sous le repli sus-unguéal — toute agression y est irréversible), la <strong>lunule</strong> (partie visible de la matrice), le <strong>lit de l'ongle</strong> (tissu vascularisé sous la tablette), la <strong>tablette</strong> (partie visible), le <strong>bord libre</strong>, les <strong>replis latéraux</strong> et les <strong>cuticules</strong> (barrière naturelle contre les infections).</p>
<p>La pousse est d'environ <strong>3 mm par mois</strong> à la main, deux fois moins au pied : c'est ce qui impose un remplissage toutes les 3 à 4 semaines.</p>
<p>Conséquence pratique : on ne lime jamais dans la zone matricielle, on ne coupe pas les cuticules (on les repousse), et on adapte la préparation à l'épaisseur réelle de la tablette.</p>`,
        },
        {
          title: "1.4 Contre-indications et pathologies à reconnaître",
          content: `<p>La prothésiste n'est pas un professionnel de santé : elle ne diagnostique pas et ne traite pas. Elle doit en revanche savoir <strong>reconnaître ce qui interdit la pose</strong> et orienter vers un médecin ou un dermatologue.</p>
<ul>
<li><strong>Onychomycose</strong> (mycose) : ongle épaissi, jauni, friable, décollé — pose interdite.</li>
<li><strong>Onycholyse</strong> : décollement de la tablette du lit — pose interdite tant que la zone n'est pas ressoudée.</li>
<li><strong>Périonyxis / panaris</strong> : rougeur, chaleur, gonflement ou pus autour de l'ongle — pose interdite.</li>
<li><strong>Psoriasis unguéal, lichen, verrue péri-unguéale</strong> : avis médical requis.</li>
<li><strong>Allergie connue aux acrylates ou aux méthacrylates</strong> : pose interdite.</li>
<li><strong>Ongle fissuré, très fin ou traumatisé</strong> : faisabilité à évaluer, éventuellement réparation ponctuelle et report.</li>
</ul>
<p>Toute contre-indication est notée sur la <strong>fiche diagnostique</strong>, expliquée à la cliente en termes simples, et se traduit par un refus argumenté — jamais par un refus sec.</p>`,
        },
      ],
    },
    {
      title: "Chapitre 2 — Accueil, diagnostic et fiche cliente (C1)",
      description: "Conduite de l'accueil, questionnement, examen des ongles, validation de la faisabilité et information tarifaire.",
      sections: [
        {
          title: "2.1 La trame d'accueil",
          content: `<p>L'accueil se joue en trois minutes : posture ouverte, sourire, regard, présentation de soi et du déroulé. On installe la cliente, on lui propose de se laver les mains, et on annonce l'ordre des étapes.</p>
<p>Trame de questionnement : <em>habitudes</em> (déjà porté du gel ? quelle technique ? quel entretien ?), <em>attentes</em> (forme, longueur, couleur, décoration, occasion), <em>mode de vie</em> (métier manuel, sport, clavier, contact avec l'eau ou des produits), <em>antécédents</em> (allergies, décollements répétés, mycose traitée), <em>situation de handicap</em> éventuelle et besoin d'adaptation.</p>`,
        },
        {
          title: "2.2 L'examen des ongles naturels",
          content: `<p>On observe les dix doigts, à la lumière : couleur, épaisseur, solidité, souplesse, état des cuticules et des replis latéraux, présence de stries, de taches, de décollements, de fissures.</p>
<p>Trois questions guident la décision : l'ongle est-il <strong>sain</strong> ? est-il <strong>assez solide</strong> pour porter une extension ? la demande de la cliente est-elle <strong>réalisable</strong> sur ce support ? Une longueur stiletto sur des ongles très fins et rongés n'est pas réalisable : on propose une longueur intermédiaire et une reconstruction progressive.</p>`,
        },
        {
          title: "2.3 La fiche diagnostique et l'information tarifaire",
          content: `<p>La fiche diagnostique consigne : date, identité de la cliente, état des ongles, contre-indications relevées, technique retenue, produits utilisés (marque et référence), forme et longueur, décoration, durée de la prestation, prix annoncé, conseils remis, date de remplissage conseillée.</p>
<p>L'information est <strong>exhaustive et donnée avant de commencer</strong> : les étapes, la durée réelle, le prix de la prestation et celui du remplissage, la nécessité d'un entretien toutes les 3 à 4 semaines et le coût d'une dépose. Une cliente informée ne conteste pas la facture.</p>`,
        },
        {
          title: "2.4 Accueil d'une personne en situation de handicap",
          content: `<p>L'adaptation se décide avec la personne, jamais à sa place. Exemples : hauteur du plan de travail et espace de retournement pour une personne en fauteuil ; annonce verbale de chaque geste pour une personne malvoyante ; communication écrite ou visuelle pour une personne sourde ; prestation fractionnée ou repose-bras pour une personne ne pouvant maintenir une position longtemps ; réduction des odeurs et ventilation renforcée pour une personne hypersensible.</p>
<p>Cette prise en compte fait partie intégrante de la compétence C1 et est évaluée comme telle.</p>`,
        },
      ],
    },
    {
      title: "Chapitre 3 — Hygiène, sécurité et préparation du poste (C2 et C3)",
      description: "Agencement du poste, ergonomie, protocole de désinfection et de stérilisation, EPI, réglementation cosmétique.",
      sections: [
        {
          title: "3.1 Agencer le poste de travail",
          content: `<p>Le poste est monté <strong>avant</strong> l'arrivée de la cliente : lampe LED/UV désinfectée, ponceuse et embouts stérilisés, limes et buffers, repose-poignet, aspirateur à poussière ou tapis aspirant, produits alignés dans l'ordre d'utilisation (nettoyant, primer/nail prep, base, construction, finition, cleaner), consommables (chablons ou capsules, colle, cotons non pelucheux, bâtonnets, gants, masque).</p>
<p><strong>Ergonomie</strong> : assise réglée, dos droit, avant-bras en appui, distance œil-ongle d'environ 40 cm, éclairage sans ombre portée. Une mauvaise ergonomie se paie en dix ans de carrière : cervicalgies, lombalgies, troubles musculo-squelettiques du poignet.</p>`,
        },
        {
          title: "3.2 Protocole d'hygiène",
          content: `<p>Avant la prestation : nettoyage puis désinfection du plan de travail, de la lampe, de la ponceuse et du repose-main avec un produit <strong>bactéricide, fongicide et virucide aux normes NF EN</strong> ; lavage des mains de la professionnelle (1 minute à l'eau et au savon antiseptique, puis 30 secondes de solution hydroalcoolique) ; désinfection des mains de la cliente ; port du <strong>masque</strong> et des <strong>gants</strong>.</p>
<p>Après la prestation : élimination des consommables à usage unique, nettoyage du périmètre (sol, poubelle fermée), <strong>stérilisation</strong> des outils réutilisables en autoclave ou bac à ultrasons suivi d'un trempage désinfectant, séchage et stockage en pochette fermée.</p>
<p>Les limes en carton et les buffers sont <strong>à usage unique par cliente</strong>. Les embouts de ponceuse sont stérilisés entre chaque cliente.</p>`,
        },
        {
          title: "3.3 Sécurité chimique et prévention des allergies",
          content: `<p>Les gels et acrygels contiennent des <strong>(méth)acrylates</strong>, sensibilisants cutanés. Une allergie acquise est définitive et peut mettre fin à une carrière.</p>
<p>Règles : ne jamais mettre le produit en contact avec la peau, les cuticules ou les replis latéraux ; ne pas toucher le gel non polymérisé à mains nues ; ventiler la pièce ; aspirer les poussières de limage plutôt que de les souffler ; retirer immédiatement tout produit débordé avant catalyse ; respecter les temps de catalyse (un gel sous-catalysé reste allergène) ; lire les fiches de données de sécurité.</p>
<p>Les produits utilisés doivent être <strong>conformes au règlement cosmétique européen</strong> : étiquetage, liste INCI, numéro de lot, date de péremption, responsable de mise sur le marché identifié. On vérifie les dates de péremption et l'état d'usure des outils avant chaque journée.</p>`,
        },
      ],
    },
    {
      title: "Chapitre 4 — Préparation de l'ongle et extension (C4 et C5)",
      description: "Repoussage des cuticules, limage, matification, dépoussiérage, pose de capsule ou de chablon.",
      sections: [
        {
          title: "4.1 Préparer l'ongle naturel",
          content: `<p>Ordre des opérations : ramollir puis <strong>repousser les cuticules</strong> au repousse-cuticules ou au bâtonnet de buis, retirer la <strong>peau morte adhérente</strong> (ptérygion) au pousse-cuticules ou à la ponceuse avec un embout adapté et une vitesse maîtrisée — sans jamais entamer la matrice ; raccourcir le <strong>bord libre</strong> à la lime (grain 180 à 240) en un mouvement d'un seul sens ; <strong>matifier</strong> toute la surface au buffer 180/240 jusqu'à disparition complète de la brillance, y compris le long des replis ; <strong>dépoussiérer</strong> à la brosse puis déshydrater au cleaner.</p>
<p>Repères : une matification incomplète = un décollement garanti à cet endroit. Un limage trop agressif = un ongle aminci et douloureux. La règle est « toute la surface, mais rien de plus ».</p>`,
        },
        {
          title: "4.2 La capsule",
          content: `<p>Choix de la taille : la capsule doit couvrir la largeur de l'ongle <strong>d'un repli latéral à l'autre</strong>, sans jamais les chevaucher ; si aucune ne convient exactement, on prend la taille au-dessus et on lime les côtés.</p>
<p>Pose : colle en petite quantité dans le creux de la capsule, positionnement <strong>droit dans l'axe du doigt</strong>, appui au niveau du stop puis bascule progressive pour chasser les bulles, maintien quelques secondes. On coupe ensuite à la longueur voulue au coupe-capsule, on lime la forme, puis on <strong>fait fondre</strong> le raccord (limage/ponçage doux) pour supprimer la marche entre capsule et ongle naturel.</p>`,
        },
        {
          title: "4.3 Le chablon",
          content: `<p>Le chablon (papier ou métal) prolonge l'ongle sans support collé : il permet une <strong>longueur libre et une architecture sur mesure</strong>, et donne un résultat plus fin et plus naturel qu'une capsule.</p>
<p>Pose : ajuster la découpe du chablon à la courbure du doigt, le glisser sous le bord libre <strong>sans espace</strong>, contrôler l'alignement dans l'axe du doigt vu de dessus et le prolongement de la ligne du bord libre vu de profil, puis coller les languettes. Un chablon mal positionné donne un ongle qui « plonge » ou qui remonte : on repositionne avant de construire, jamais après.</p>`,
        },
      ],
    },
    {
      title: "Chapitre 5 — Construction, décoration et remplissage (C6, C7 et C8)",
      description: "Primer, base, gel de construction, apex, finition, techniques de décoration et cycle complet de remplissage.",
      sections: [
        {
          title: "5.1 Construire la prothésie",
          content: `<p>Séquence : <strong>primer ou nail prep</strong> en fine couche sur l'ongle naturel, séchage à l'air libre ; <strong>gel de base</strong> en couche fine, sans toucher cuticules ni replis, catalyse 60 secondes ; <strong>gel de construction</strong> déposé en une ou deux gouttes travaillées à la spatule.</p>
<p>L'<strong>apex</strong> (le bombé) est le point le plus épais de l'ongle : il se situe à la jonction du tiers de la zone de stress, doit être régulier, centré dans l'axe, et se fondre sans marche vers le bord libre et vers la cuticule. Vue de profil, la ligne doit être une courbe continue ; vue de dessus, la ligne centrale doit être droite.</p>
<p>Puis limage de mise en forme (grain 100/180), dépoussiérage, <strong>gel de finition</strong> en couche moyenne, catalyse 2 × 60 secondes, retrait éventuel de la couche collante au cleaner.</p>`,
        },
        {
          title: "5.2 Décorer l'ongle",
          content: `<p><strong>Vernis semi-permanent</strong> : couches fines, deux passages, absence de traces et de raclage, résultat lisse et net, capsulage du bord libre.</p>
<p><strong>French</strong> : le « sourire » doit être net, symétrique et identique sur les dix doigts ; on la trace au pinceau liner ou on la construit en gel dès la phase d'architecture.</p>
<p><strong>Babyboomer</strong> : dégradé progressif entre la couleur naturelle et le blanc, réalisé à l'éponge ou au pinceau estompeur, sans démarcation visible.</p>
<p><strong>Effets</strong> (sucré, marbre, chrome, sirène, aérographe) : produit adapté, couche uniforme, sans paquet. <strong>3D et bijoux</strong> : relief visible, design harmonieux, quantité de colle maîtrisée, capsulage systématique pour la tenue.</p>`,
        },
        {
          title: "5.3 Le remplissage",
          content: `<p>Le remplissage s'effectue toutes les 3 à 4 semaines, dans un ordre invariable : <strong>désinfecter → préparer → limer → poncer → déposer l'ancienne couleur → préparer et reconstruire → remplir → catalyser → modeler et limer → nettoyer → finir</strong>.</p>
<p>Points techniques : choisir le grain de lime et l'embout de ponceuse adaptés, ajuster la vitesse, restreindre les mouvements à la zone concernée, retirer entièrement l'ancienne couleur mais <strong>laisser une fine couche de gel</strong> (on ne remet pas l'ongle naturel à nu), repousser les cuticules repoussées depuis la pose, dépoussiérer, reconstruire un nouvel apex, respecter les temps de catalyse.</p>
<p>Décollements, bulles ou soulèvements : on lime jusqu'au gel sain, on ne recouvre jamais un décollement — l'humidité emprisonnée est la première cause de mycose sous prothèse.</p>`,
        },
      ],
    },
    {
      title: "Chapitre 6 — Finition, conseils et développement de l'activité (C9 et C10)",
      description: "Huile cuticule, modelage hydratant, conseils post-prestation, gestion de la clientèle et cadre de l'activité.",
      sections: [
        {
          title: "6.1 Finaliser le soin",
          content: `<p>Application de l'<strong>huile à cuticules</strong> en quantité juste (une goutte par doigt, sans débordement), massage circulaire du contour de l'ongle, puis <strong>modelage hydratant des mains</strong> à la crème, homogène, du poignet vers les doigts. Cette étape n'est pas décorative : elle nourrit le contour, améliore le confort et clôt la prestation par un moment agréable qui pèse lourd dans la fidélisation.</p>
<p>Contrôle final devant la cliente : symétrie des dix doigts, brillance, absence de poussière, propreté des contours, mains nettoyées.</p>`,
        },
        {
          title: "6.2 Conseils post-prestation",
          content: `<p>Message à délivrer systématiquement : porter des <strong>gants</strong> pour les produits ménagers ; appliquer l'<strong>huile à cuticules</strong> quotidiennement ; ne pas utiliser les ongles comme outil ; ne jamais arracher un gel qui se décolle ni le limer soi-même ; revenir en cas de décollement, de douleur, de rougeur ou d'odeur ; prévoir le <strong>remplissage à 3-4 semaines</strong> ; ne jamais tenter une dépose maison — la dépose se fait en institut, par limage puis dissolution selon le produit.</p>
<p>Contre-indications rappelées : ne pas poser sur un ongle abîmé, ne pas enchaîner les poses sans laisser respirer un ongle fragilisé, consulter un médecin en cas de suspicion de mycose.</p>`,
        },
        {
          title: "6.3 Exercer et développer son activité",
          content: `<p>Statuts possibles : salariée en institut, indépendante (micro-entreprise), location de fauteuil, prestation à domicile. À prévoir : assurance <strong>responsabilité civile professionnelle</strong>, respect des règles d'hygiène des lieux recevant du public, affichage des tarifs, facturation, et registre des produits utilisés.</p>
<p>Tarification : partir du coût réel (produits, amortissement du matériel, temps réel de prestation, temps de nettoyage) et non du prix du salon d'à côté. Une pose complète représente 2 h à 2 h 30 en début de carrière, 1 h 30 avec l'expérience.</p>
<p>Développement : photothèque avant/après, réseaux sociaux, prise de rendez-vous en ligne, relance à 3 semaines pour le remplissage, formation continue sur les nouvelles techniques (acrygel, nail art, structure russe).</p>`,
        },
      ],
    },
  ];
}
