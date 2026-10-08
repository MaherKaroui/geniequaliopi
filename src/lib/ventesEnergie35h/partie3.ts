import type { CourseChapter } from "../courseContent";

export const TVTE_PARTIE3: CourseChapter[] = [
  {
    title: "Chapitre 5 – Négocier et traiter les objections (C4)",
    description:
      "Adopter une posture de négociateur loyal, préparer ses marges de manœuvre et ses contreparties, comprendre et traiter les objections propres aux travaux énergétiques (prix, défiance, report, aides, mauvaises expériences, bruit de la pompe à chaleur, délais) avec l'écoute active, la reformulation, les méthodes ACCEPT et CRAC et la question de contrôle, sans pression ni fausse promesse ; négocier avec un syndic, une assemblée générale de copropriété ou un acheteur tertiaire ; s'entraîner par des jeux de rôle. Durée indicative : 3 h 30 (matinée du jour 4). Fil rouge : Thermia Rénov, entreprise fictive de rénovation énergétique à Saint-Genis-Laval (Rhône).",
    sections: [
      {
        title: "5.1 – La posture du négociateur dans les travaux énergétiques",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Distinguer la négociation commerciale du simple marchandage sur le prix.</li>
<li>Comprendre pourquoi la confiance est l'enjeu central de la négociation dans la rénovation énergétique.</li>
<li>Connaître les limites légales qui encadrent le comportement du vendeur : pratiques commerciales trompeuses, pratiques agressives, abus de faiblesse.</li>
<li>Adopter une posture de conseil loyal, compatible avec les objectifs commerciaux de l'entreprise.</li>
</ul>

<h3>1. Négocier, ce n'est pas céder</h3>
<p>Dans le langage courant, « négocier » est souvent compris comme « obtenir une remise ». En vente, la <strong>négociation</strong> est un processus plus large : c'est l'échange par lequel le vendeur et le client ajustent une proposition (contenu technique, prix, calendrier, modalités de paiement, garanties, services associés) jusqu'à ce qu'elle soit acceptable pour les deux parties. Elle commence bien avant la discussion sur le prix : dès la découverte (chapitre 3), le commercial recueille les informations qui lui permettront ensuite de défendre sa proposition.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Marchandage</th><th>Négociation commerciale</th></tr>
<tr><td>Porte sur un seul critère : le prix.</td><td>Porte sur l'ensemble de la proposition : solution technique, options, délais, financement, garanties, suivi.</td></tr>
<tr><td>Logique gagnant-perdant : ce que l'un gagne, l'autre le perd.</td><td>Recherche d'un accord durable : chacun obtient ce qui compte le plus pour lui.</td></tr>
<tr><td>Le vendeur réagit aux demandes.</td><td>Le vendeur a préparé ses marges de manœuvre et ses contreparties.</td></tr>
<tr><td>Les concessions sont gratuites et successives.</td><td>Toute concession est échangée contre une contrepartie.</td></tr>
<tr><td>Risque : vendre à perte ou dégrader la prestation pour tenir le prix.</td><td>Objectif : un chantier rentable, bien exécuté, et un client qui recommande l'entreprise.</td></tr>
</table>

<h3>2. Un secteur marqué par la défiance</h3>
<p>Le commercial en travaux énergétiques négocie dans un contexte particulier. Depuis plusieurs années, la rénovation énergétique est l'un des secteurs les plus touchés par les fraudes et les pratiques abusives : démarchage agressif, entreprises se présentant faussement comme mandatées par l'État, devis surévalués « compensés » par des aides, travaux non réalisés ou mal réalisés. Les pouvoirs publics ont réagi par plusieurs textes, en particulier l'<strong>interdiction du démarchage téléphonique</strong> dans ce secteur (loi n° 2020-901 du 24 juillet 2020, voir chapitre 6) et la <strong>loi n° 2025-594 du 30 juin 2025 contre toutes les fraudes aux aides publiques</strong>, qui a renforcé les contrôles et étendu les interdictions de prospection.</p>
<p>Conséquence pour la négociation : <strong>le client arrive souvent méfiant</strong>, parfois après avoir été sollicité par des entreprises indélicates, ou après avoir lu des témoignages négatifs. Une partie de ses objections ne porte pas sur l'offre elle-même mais sur une question plus profonde : « Puis-je faire confiance à cette entreprise ? ». Le commercial qui l'ignore et « force » la vente confirme les craintes du client ; celui qui l'accueille, l'explique et apporte des preuves transforme cette méfiance en avantage concurrentiel.</p>
<blockquote><strong>Idée clé :</strong> dans les travaux énergétiques, le premier objet de la négociation est la confiance. Le prix ne devient négociable qu'une fois que le client est convaincu que l'entreprise est sérieuse, que la solution est adaptée et que les aides annoncées sont réalistes.</blockquote>

<h3>3. Le cadre légal du comportement du vendeur</h3>
<p>La négociation avec un consommateur est encadrée par le code de la consommation. Trois notions doivent être connues de tout commercial :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Notion</th><th>Principe (code de la consommation)</th><th>Exemples à proscrire en rénovation énergétique</th></tr>
<tr><td><strong>Pratique commerciale trompeuse</strong></td><td>Articles L. 121-2 et suivants : pratique qui repose sur des allégations, indications ou présentations fausses ou de nature à induire en erreur, ou qui omet une information substantielle.</td><td>Se présenter comme « partenaire de l'État », « agréé France Rénov' » ou « mandaté par la mairie » ; annoncer un montant d'aide garanti ; promettre une division par deux de la facture sans étude ; afficher une qualification RGE qui ne couvre pas le domaine de travaux concerné.</td></tr>
<tr><td><strong>Pratique commerciale agressive</strong></td><td>Articles L. 121-6 et suivants : pratique qui, du fait de sollicitations répétées et insistantes ou d'une contrainte physique ou morale, altère ou est de nature à altérer la liberté de choix du consommateur.</td><td>Refuser de quitter le domicile tant que le devis n'est pas signé ; revenir plusieurs fois sans y être invité ; faire croire que l'offre ou l'aide disparaît « ce soir » pour obtenir une signature immédiate.</td></tr>
<tr><td><strong>Abus de faiblesse</strong></td><td>Article L. 121-8 : abuser de la faiblesse ou de l'ignorance d'une personne pour lui faire souscrire un engagement, notamment lors d'une visite à domicile, lorsque les circonstances montrent qu'elle n'était pas en mesure d'apprécier la portée de ses engagements.</td><td>Faire signer une personne âgée isolée, visiblement confuse, sans la présence d'un proche ; minimiser le coût réel ou l'engagement de crédit.</td></tr>
</table>
<p>Ces pratiques sont sanctionnées pénalement et peuvent entraîner la nullité du contrat. Au-delà du risque juridique, elles détruisent la réputation de l'entreprise : dans un secteur où la recommandation et les avis en ligne pèsent lourd (chapitre 6), un seul client abusé peut coûter des dizaines de ventes.</p>

<h3>4. Les quatre attitudes du négociateur loyal</h3>
<ol>
<li><strong>L'écoute avant la réponse</strong> : on ne répond pas à une objection que l'on n'a pas comprise. Laisser le client aller au bout de sa phrase, poser une question de clarification, reformuler.</li>
<li><strong>La transparence</strong> : expliquer d'où viennent les chiffres (prix, économies estimées, aides), ce qui est certain et ce qui ne l'est pas. Dire « je ne sais pas, je vérifie et je vous réponds par écrit » vaut mieux qu'une réponse improvisée.</li>
<li><strong>La fermeté sur l'essentiel</strong> : le commercial ne transige ni sur la conformité technique (dimensionnement, isolation préalable si nécessaire), ni sur la sécurité, ni sur les règles des aides. Il peut négocier le périmètre, les options, le calendrier ; il ne négocie pas la qualité.</li>
<li><strong>Le respect de la liberté de décision</strong> : le client doit pouvoir réfléchir, comparer, consulter un proche ou un conseiller public. Le commercial aide à décider ; il ne décide pas à sa place.</li>
</ol>

<h3>5. Les styles de négociation et leurs limites</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Style</th><th>Comportement</th><th>Effet à court terme</th><th>Effet à moyen terme</th></tr>
<tr><td>Compétitif (« dur »)</td><td>Le vendeur cherche à imposer sa solution et son prix, met la pression.</td><td>Signature parfois rapide.</td><td>Rétractations, litiges, avis négatifs, risque juridique.</td></tr>
<tr><td>Accommodant</td><td>Le vendeur cède dès la première résistance pour « ne pas perdre la vente ».</td><td>Client satisfait sur le moment.</td><td>Marge détruite, chantier sous-dimensionné ou bâclé, image d'un prix initial « gonflé ».</td></tr>
<tr><td>Évitant</td><td>Le vendeur esquive les objections, change de sujet.</td><td>Pas de conflit.</td><td>Le doute du client reste entier ; la vente ne se fait pas ou est annulée.</td></tr>
<tr><td><strong>Coopératif</strong></td><td>Le vendeur explore les intérêts du client, propose des options, échange concessions et contreparties.</td><td>Discussion plus longue.</td><td>Accord solide, client prescripteur, rentabilité préservée.</td></tr>
</table>
<p>Le style coopératif n'est pas un style « mou » : il suppose une préparation rigoureuse (section 5.2) et une capacité à dire non, avec des arguments, à une demande qui dégraderait la prestation ou la rentabilité.</p>

<h3>6. Présentation du fil rouge du chapitre</h3>
<p>Comme dans les chapitres précédents, nous travaillons avec <strong>Thermia Rénov</strong>, une <strong>entreprise fictive</strong> créée pour cette formation. Tous les noms, chiffres et situations sont imaginaires.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Description (fictive)</th></tr>
<tr><td>Entreprise</td><td>SAS de travaux de rénovation énergétique à Saint-Genis-Laval (Rhône), 14 salariés, qualifiée RGE pour ses domaines de travaux : pompes à chaleur air/eau, isolation des combles et des murs, chauffe-eau thermodynamiques, photovoltaïque en autoconsommation.</td></tr>
<tr><td>Nadia</td><td>Directrice commerciale. Fixe la politique de prix, les marges de manœuvre des commerciaux et valide les remises au-delà du seuil autorisé.</td></tr>
<tr><td>Karim</td><td>Conseiller commercial débutant, arrivé il y a quatre mois. Très bon contact, mais tendance à accorder des remises trop vite et à se sentir déstabilisé par les objections sur la confiance.</td></tr>
<tr><td>M. et Mme Ferrand</td><td>Maison de 1978, chaudière fioul vieillissante, DPE classé F. Ils ont reçu de Thermia Rénov une proposition « isolation des combles + PAC air/eau ». Ils hésitent.</td></tr>
<tr><td>Mme Lopez</td><td>Propriétaire occupante d'un appartement dans une copropriété des années 1970 ; souhaite remplacer son chauffe-eau électrique et s'intéresse au projet de rénovation de l'immeuble.</td></tr>
<tr><td>SCI Les Tilleuls</td><td>Propriétaire d'un immeuble de bureaux de 1 200 m², assujetti au dispositif « éco énergie tertiaire » (décret tertiaire). Interlocuteur : le gérant, assisté d'un acheteur externe.</td></tr>
</table>
<p>Au début de ce chapitre, Karim revient de son deuxième rendez-vous chez les Ferrand. Il est découragé : « Ils m'ont dit que c'était trop cher, qu'ils allaient réfléchir, que leur voisin a eu des problèmes avec sa pompe à chaleur et qu'ils préféraient attendre les nouvelles aides. J'ai proposé 10 % de remise, ça n'a rien changé. » Nadia lui répond : « Tu as répondu au prix alors que le problème était ailleurs. On va reprendre tout cela. » C'est l'objet de ce chapitre.</p>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Confondre négociation et remise : la remise est un outil parmi d'autres, et souvent le moins efficace.</li>
<li>Prendre les objections comme une attaque personnelle et se justifier au lieu de comprendre.</li>
<li>Croire qu'un client « méfiant » est un client perdu : c'est souvent un client qui a besoin de preuves.</li>
<li>Utiliser l'urgence artificielle (« l'aide s'arrête demain ») : c'est une pratique potentiellement trompeuse ou agressive.</li>
</ul>
<blockquote><strong>À retenir :</strong> négocier, c'est ajuster l'ensemble d'une proposition jusqu'à un accord durable, pas céder sur le prix. Dans la rénovation énergétique, la confiance est le premier enjeu. Le code de la consommation interdit les pratiques trompeuses, agressives et l'abus de faiblesse. Le négociateur loyal écoute, explique, reste ferme sur la qualité et respecte la liberté de décision du client.</blockquote>
`,
      },
      {
        title: "5.2 – Préparer la négociation : objectifs, marges de manœuvre, concessions et contreparties",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Fixer avant le rendez-vous ses objectifs, sa position de départ et sa limite (prix plancher).</li>
<li>Identifier les marges de manœuvre autres que le prix.</li>
<li>Construire une liste de concessions possibles, chacune associée à une contrepartie.</li>
<li>Anticiper les objections probables à partir des informations de la découverte.</li>
</ul>

<h3>1. Pourquoi la préparation est décisive</h3>
<p>Un commercial qui arrive en rendez-vous sans préparation subit la négociation : il découvre les objections en direct, improvise des réponses et, sous la pression, accorde des remises qu'il n'avait pas prévues. À l'inverse, un commercial préparé sait <strong>jusqu'où il peut aller</strong>, <strong>ce qu'il peut offrir</strong> et <strong>ce qu'il demandera en échange</strong>. La préparation prend en moyenne 20 à 30 minutes pour un rendez-vous de particulier, davantage pour un dossier de copropriété ou de tertiaire.</p>

<h3>2. Les trois repères chiffrés</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Repère</th><th>Définition</th><th>Qui le fixe</th></tr>
<tr><td><strong>Objectif</strong> (position d'ouverture)</td><td>Le devis tel qu'il a été établi : solution technique recommandée, prix catalogue, conditions standard.</td><td>Le commercial, à partir du chiffrage du bureau d'études ou du métreur.</td></tr>
<tr><td><strong>Zone d'accord</strong></td><td>L'ensemble des ajustements acceptables (options retirées, calendrier différent, remise dans la limite autorisée).</td><td>La direction commerciale (grille de délégation).</td></tr>
<tr><td><strong>Prix plancher</strong> (point de rupture)</td><td>En dessous, le chantier n'est plus rentable ou la qualité serait compromise : le commercial préfère ne pas conclure.</td><td>La direction, à partir des coûts réels (matériel, main-d'œuvre, sous-traitance, frais de structure).</td></tr>
</table>
<p>Chez Thermia Rénov, Nadia a mis en place une <strong>grille de délégation</strong> (exemple fictif) : le commercial peut accorder jusqu'à 3 % de remise globale ; entre 3 et 6 %, il doit obtenir l'accord de Nadia ; au-delà, la décision revient au dirigeant. Ce dispositif évite les remises improvisées et donne au commercial un argument honnête : « Je dois faire valider cette demande, je vous apporte une réponse demain. »</p>

<h3>3. La solution de repli</h3>
<p>Les spécialistes de la négociation parlent de <strong>meilleure solution de rechange</strong> (MESORE, en anglais <em>BATNA</em>) : ce que chaque partie fera si l'accord n'est pas conclu. Pour le vendeur, c'est la valeur des autres dossiers en cours ; pour le client, c'est le maintien de son équipement actuel, un devis concurrent ou le report du projet. Plus la solution de repli d'une partie est solide, plus elle a de pouvoir dans la négociation.</p>
<ul>
<li>Un commercial dont le carnet de rendez-vous est rempli négocie plus sereinement qu'un commercial qui « doit » signer ce dossier : d'où l'importance de la prospection (chapitre 6).</li>
<li>Comprendre la solution de repli du client aide à argumenter : pour les Ferrand, garder la chaudière fioul signifie supporter le coût du combustible, l'entretien d'un équipement ancien et le risque de panne en plein hiver ; c'est aussi conserver un logement classé F, ce qui pèsera sur sa valeur de revente.</li>
</ul>

<h3>4. Les marges de manœuvre autres que le prix</h3>
<p>Le prix n'est qu'une variable parmi d'autres. Avant le rendez-vous, le commercial liste tout ce qui peut être ajusté :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Variable</th><th>Exemples d'ajustement</th><th>Limites à respecter</th></tr>
<tr><td>Périmètre technique</td><td>Phaser les travaux (isolation d'abord, PAC ensuite) ; retirer une option de confort (thermostat connecté, habillage de l'unité extérieure).</td><td>Ne jamais proposer un phasage techniquement incohérent (PAC dimensionnée pour une maison non isolée puis surdimensionnée après isolation, par exemple) sans l'expliquer.</td></tr>
<tr><td>Gamme de matériel</td><td>Proposer un modèle de PAC d'une autre gamme, de performances équivalentes et compatibles avec les exigences des aides.</td><td>Le matériel doit rester éligible aux aides annoncées et adapté au logement.</td></tr>
<tr><td>Calendrier</td><td>Réaliser le chantier en période creuse (printemps, début d'été) plutôt qu'en pleine saison de chauffe.</td><td>Ne pas promettre une date que le planning ne permet pas de tenir.</td></tr>
<tr><td>Modalités de paiement</td><td>Échelonnement (acompte, situation intermédiaire, solde à la réception), orientation vers un financement (éco-prêt à taux zéro, prêt bancaire).</td><td>Respecter les règles du démarchage à domicile (aucun paiement avant l'expiration d'un délai de 7 jours, chapitre 7) ; ne jamais conditionner la signature à un crédit sans information complète.</td></tr>
<tr><td>Services associés</td><td>Premier entretien inclus, extension de la durée de garantie commerciale, accompagnement administratif pour le montage des dossiers d'aide.</td><td>L'accompagnement administratif ne doit pas faire croire que l'aide est garantie ; préciser ce qui est inclus.</td></tr>
<tr><td>Prix</td><td>Remise dans la limite de la délégation, arrondi, prise en charge d'un poste.</td><td>Toujours contre une contrepartie ; jamais de prix « gonflé » au départ pour pouvoir le baisser.</td></tr>
</table>

<h3>5. Concessions et contreparties</h3>
<p>Règle d'or de la négociation : <strong>aucune concession sans contrepartie</strong>. Une concession gratuite envoie un double message négatif : « le prix de départ n'était pas le vrai prix » et « si je demande encore, j'obtiendrai encore ». La formule de base est conditionnelle : <em>« Si vous… alors je peux… »</em>.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Concession que le commercial peut accorder</th><th>Contrepartie qu'il peut demander</th></tr>
<tr><td>Remise de 2 %</td><td>Accord pour un chantier en avril (période creuse) ; acceptation d'être chantier de référence pour des visites ou des photos (avec accord écrit).</td></tr>
<tr><td>Premier entretien annuel inclus</td><td>Souscription du contrat d'entretien à partir de la deuxième année.</td></tr>
<tr><td>Thermostat connecté offert</td><td>Commande groupée isolation + PAC (au lieu de la seule PAC).</td></tr>
<tr><td>Accompagnement au montage du dossier d'aides</td><td>Remise rapide des pièces (avis d'imposition, justificatifs) pour respecter le calendrier.</td></tr>
<tr><td>Délai d'intervention raccourci</td><td>Acompte versé dès que la loi le permet et accès au logement garanti aux dates fixées.</td></tr>
</table>
<blockquote><strong>Attention :</strong> la contrepartie ne doit jamais être une pression déguisée. Demander « signez ce soir et je vous fais 5 % » à un particulier démarché à domicile revient à créer une urgence artificielle. Les contreparties légitimes portent sur l'organisation du chantier, l'étendue de la commande ou la relation future, pas sur la rapidité de la signature.</blockquote>

<h3>6. Les règles de conduite des concessions</h3>
<ol>
<li><strong>Concéder lentement et par petites étapes</strong> : une concession importante d'emblée laisse croire qu'il y a encore beaucoup de marge.</li>
<li><strong>Concéder de moins en moins</strong> : 3 %, puis 1 %, puis plus rien. Le client comprend que l'on approche de la limite.</li>
<li><strong>Valoriser chaque concession</strong> : expliquer ce qu'elle représente (« le premier entretien représente une intervention d'un technicien et un déplacement »).</li>
<li><strong>Noter tout ce qui a été accordé</strong> et le reporter dans le devis modifié : rien d'oral, tout écrit.</li>
<li><strong>Garder une concession en réserve</strong> pour la conclusion, mais sans jamais en faire un levier de pression.</li>
</ol>

<h3>7. La fiche de préparation de négociation</h3>
<p>Thermia Rénov utilise une fiche d'une page, remplie avant chaque rendez-vous de présentation ou de relance de devis :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu pour le dossier Ferrand (exemple fictif)</th></tr>
<tr><td>Rappel du besoin (découverte)</td><td>Réduire la facture de chauffage, sortir du fioul avant une panne, améliorer le confort à l'étage, valoriser la maison (projet de vente dans une dizaine d'années).</td></tr>
<tr><td>Profil SONCAS dominant</td><td>M. Ferrand : Sécurité et Argent ; Mme Ferrand : Confort et Sécurité.</td></tr>
<tr><td>Proposition initiale</td><td>Isolation des combles perdus + PAC air/eau + désinstallation de la cuve fioul : 21 400 € TTC (montant fictif), aides estimées par simulation à la date du devis (montant fictif de l'exemple : 7 900 €), reste à charge estimé 13 500 €.</td></tr>
<tr><td>Objections probables</td><td>Prix ; « on va réfléchir » ; expérience du voisin ; bruit de l'unité extérieure ; attente de nouvelles aides.</td></tr>
<tr><td>Preuves à apporter</td><td>Attestation RGE (domaines PAC et isolation), assurance décennale, 3 avis clients vérifiables, fiche technique de la PAC avec niveau de puissance acoustique, étude d'implantation, simulation d'aides imprimée avec sa date et sa source.</td></tr>
<tr><td>Marges de manœuvre</td><td>Phasage possible ; gamme alternative ; chantier en avril ; premier entretien offert ; remise jusqu'à 3 % (au-delà, accord de Nadia).</td></tr>
<tr><td>Prix plancher</td><td>Fixé par Nadia, non communiqué au client.</td></tr>
<tr><td>Objectif du rendez-vous</td><td>Lever les doutes sur la confiance et le bruit, obtenir une décision ou un rendez-vous de décision daté.</td></tr>
</table>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Partir sans connaître sa délégation de remise et appeler la direction devant le client à chaque demande.</li>
<li>Gonfler le devis initial pour « avoir de la marge » : c'est déloyal et le client le perçoit dès qu'il compare.</li>
<li>Accorder une concession dès la première objection sur le prix, avant d'avoir compris ce qu'elle cache.</li>
<li>Oublier de reporter les concessions dans le devis modifié, ce qui crée des litiges à la facturation.</li>
</ul>
<blockquote><strong>À retenir :</strong> préparer, c'est fixer son objectif, sa zone d'accord et son prix plancher, connaître sa délégation, identifier toutes les variables négociables et associer à chaque concession une contrepartie légitime. La fiche de préparation relie la découverte, les objections probables et les preuves à apporter.</blockquote>
`,
      },
      {
        title: "5.3 – Comprendre les objections : nature, origine et signaux",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Définir l'objection et la distinguer du refus.</li>
<li>Reconnaître les différents types d'objections : sincère, prétexte, demande d'information, objection de principe.</li>
<li>Établir la typologie des objections propres aux travaux énergétiques.</li>
<li>Repérer les signaux verbaux et non verbaux qui accompagnent une objection.</li>
</ul>

<h3>1. L'objection, un signal d'intérêt</h3>
<p>Une <strong>objection</strong> est une réserve exprimée par le client sur tout ou partie de la proposition. Ce n'est pas un refus : le client qui ne veut vraiment pas acheter ne prend généralement pas la peine d'objecter, il met fin à l'échange. L'objection signifie le plus souvent : « Je suis intéressé, mais quelque chose me retient ; aidez-moi à lever ce doute. »</p>
<p>Pour le commercial, une objection est donc une <strong>information</strong> précieuse : elle indique ce qui manque encore pour que le client puisse décider. Le pire scénario n'est pas le client qui objecte, c'est le client qui ne dit rien, prend le devis « pour réfléchir » et ne rappelle jamais.</p>

<h3>2. Les quatre natures d'objections</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Nature</th><th>Description</th><th>Exemple</th><th>Attitude du commercial</th></tr>
<tr><td><strong>Objection sincère et fondée</strong></td><td>Le client pointe une limite réelle de l'offre.</td><td>« Votre délai d'intervention est de dix semaines, j'ai besoin d'un chauffage avant l'hiver. »</td><td>Reconnaître la limite, chercher une solution (solution provisoire, planning), ou admettre que l'offre ne convient pas.</td></tr>
<tr><td><strong>Objection sincère mais non fondée</strong></td><td>Le client croit une information inexacte.</td><td>« Les pompes à chaleur ne fonctionnent pas quand il gèle. »</td><td>Informer avec des preuves (plage de fonctionnement du fabricant, dimensionnement à la température extérieure de base), sans ridiculiser le client.</td></tr>
<tr><td><strong>Objection prétexte</strong></td><td>Le client avance une raison qui masque la vraie réserve.</td><td>« Je vais réfléchir » alors que le vrai frein est la peur d'une arnaque.</td><td>Questionner pour faire émerger la véritable objection.</td></tr>
<tr><td><strong>Demande d'information</strong></td><td>Le client a besoin d'un complément pour avancer.</td><td>« Et si la PAC tombe en panne ? »</td><td>Répondre précisément (garanties, SAV, contrat d'entretien) : c'est souvent un signal d'achat.</td></tr>
</table>
<p>À ces quatre natures s'ajoute l'<strong>objection de principe</strong> (« de toute façon, je ne signe jamais le premier jour ») : elle exprime une règle personnelle qu'il faut respecter. Chercher à la contourner serait une forme de pression.</p>

<h3>3. Typologie des objections dans les travaux énergétiques</h3>
<p>Les objections rencontrées dans le secteur se regroupent en sept familles. Les connaître permet de préparer des réponses (section 5.5) et des preuves.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Famille</th><th>Formulations typiques</th><th>Ce qui se cache souvent derrière</th></tr>
<tr><td><strong>Prix et budget</strong></td><td>« C'est trop cher. » « Le concurrent est moins cher. » « Je n'ai pas le budget. »</td><td>Un reste à charge mal compris ; une comparaison entre offres non équivalentes ; une inquiétude sur la trésorerie ; une valeur perçue insuffisante.</td></tr>
<tr><td><strong>Confiance</strong></td><td>« C'est une arnaque. » « Encore une entreprise qui profite des aides. » « Vous dites tous la même chose. »</td><td>Mauvaise expérience antérieure, démarchage abusif subi, articles de presse sur les fraudes.</td></tr>
<tr><td><strong>Report de décision</strong></td><td>« Je vais réfléchir. » « Je dois en parler à mon épouse / mon fils. » « Rappelez-moi dans six mois. »</td><td>Doute non exprimé, besoin de consulter, absence d'un décideur, priorité budgétaire concurrente.</td></tr>
<tr><td><strong>Aides</strong></td><td>« J'attends les nouvelles aides. » « On m'a dit que tout était remboursé. » « Les aides vont augmenter l'an prochain. »</td><td>Confusion sur les dispositifs, peur de « rater » une aide, promesse irréaliste d'un concurrent.</td></tr>
<tr><td><strong>Expérience négative d'un tiers</strong></td><td>« Mon voisin a eu des problèmes avec sa PAC. » « Mon beau-frère a payé et l'entreprise a disparu. »</td><td>Peur du risque technique ou financier, généralisation à partir d'un cas.</td></tr>
<tr><td><strong>Technique</strong></td><td>« La PAC fait du bruit. » « Ça ne chauffe pas quand il fait froid. » « L'isolation par l'intérieur va réduire mes pièces. » « Les panneaux ne produisent rien l'hiver. »</td><td>Information partielle, crainte de troubles de voisinage, crainte d'une perte de confort.</td></tr>
<tr><td><strong>Délai et organisation</strong></td><td>« C'est trop long. » « Je ne veux pas de travaux en hiver. » « Je ne peux pas poser de congés. »</td><td>Contraintes réelles d'organisation, urgence (panne), crainte des nuisances du chantier.</td></tr>
</table>
<p>En B2B (syndic, gestionnaire tertiaire), on rencontre en plus des objections de <strong>processus</strong> (« ce n'est pas moi qui décide », « il faut un vote en assemblée générale », « nous passons par un appel d'offres ») et de <strong>preuve de performance</strong> (« quel gain garantissez-vous ? », « avez-vous des références comparables ? »).</p>

<h3>4. Le moment de l'objection</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Moment</th><th>Objection typique</th><th>Lecture</th></tr>
<tr><td>Prise de contact</td><td>« Je n'ai que dix minutes. » « Je ne veux pas qu'on me vende quelque chose. »</td><td>Méfiance initiale : rassurer sur l'objectif du rendez-vous et sa durée.</td></tr>
<tr><td>Découverte</td><td>« Pourquoi toutes ces questions ? »</td><td>Expliquer à quoi servent les informations (dimensionnement, éligibilité aux aides).</td></tr>
<tr><td>Présentation de la solution</td><td>Objections techniques.</td><td>Le client se projette : bon signe.</td></tr>
<tr><td>Annonce du prix</td><td>Objections de prix.</td><td>Normal : le client mesure l'effort. Ne pas répondre trop vite.</td></tr>
<tr><td>Conclusion</td><td>Report, confiance.</td><td>Les doutes profonds émergent quand il faut s'engager.</td></tr>
</table>

<h3>5. Les signaux à observer</h3>
<ul>
<li><strong>Signaux verbaux</strong> : ton hésitant, phrases au conditionnel, questions répétées sur le même point, silences prolongés après l'annonce d'un chiffre.</li>
<li><strong>Signaux non verbaux</strong> : bras croisés, regard vers le conjoint, dossier repoussé, corps orienté vers la sortie. Ils sont à interpréter avec prudence et en lien avec le discours : un signe isolé ne prouve rien.</li>
<li><strong>Signaux d'achat</strong> : questions sur les délais, sur l'emplacement de l'unité extérieure, sur l'entretien, demande de revoir un chiffre précis. Une objection accompagnée de signaux d'achat est presque toujours une demande d'information.</li>
</ul>

<h3>6. L'analyse de Nadia sur le dossier Ferrand</h3>
<p>Nadia reprend avec Karim les quatre objections entendues chez les Ferrand :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Ce qui a été dit</th><th>Nature probable</th><th>Hypothèse sur l'objection réelle</th></tr>
<tr><td>« C'est trop cher. »</td><td>À explorer</td><td>Le reste à charge n'a été présenté qu'oralement ; les Ferrand ont retenu le prix total TTC, pas le reste à charge ni les économies estimées.</td></tr>
<tr><td>« Notre voisin a eu des problèmes avec sa PAC. »</td><td>Sincère, peut-être non fondée</td><td>Peur du risque technique et du bruit. Il faut savoir ce qui s'est réellement passé.</td></tr>
<tr><td>« On préfère attendre les nouvelles aides. »</td><td>Sincère, non fondée ou prétexte</td><td>Confusion sur l'évolution des aides, ou manière polie de différer.</td></tr>
<tr><td>« On va réfléchir. »</td><td>Prétexte probable</td><td>Les doutes précédents n'ont pas été levés ; c'est la conséquence, pas la cause.</td></tr>
</table>
<p>Conclusion de Nadia : « Ta remise de 10 % répondait à la seule objection qui n'était sans doute pas la vraie. Résultat : tu as perdu de la marge, et tu as donné l'impression que ton premier prix était gonflé. »</p>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Répondre à la lettre de l'objection sans chercher ce qu'elle cache.</li>
<li>Traiter toutes les objections comme des objections de prix.</li>
<li>Interpréter un geste isolé comme une preuve de refus.</li>
<li>Considérer l'objection de principe comme un obstacle à contourner.</li>
</ul>
<blockquote><strong>À retenir :</strong> l'objection est un signal d'intérêt et une information. Elle peut être sincère et fondée, sincère mais non fondée, prétexte, demande d'information ou objection de principe. Dans les travaux énergétiques, sept familles reviennent : prix, confiance, report, aides, expérience d'un tiers, technique, délai. Avant de répondre, on identifie l'objection réelle.</blockquote>
`,
      },
      {
        title: "5.4 – Les méthodes de traitement : écoute, reformulation, ACCEPT, CRAC et question de contrôle",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Mettre en œuvre l'écoute active face à une objection.</li>
<li>Maîtriser les trois formes de reformulation.</li>
<li>Appliquer les méthodes ACCEPT et CRAC.</li>
<li>Conclure chaque traitement par une question de contrôle.</li>
<li>Connaître les techniques classiques et celles à proscrire.</li>
</ul>

<h3>1. L'écoute active face à l'objection</h3>
<p>L'écoute active, déjà travaillée lors de la découverte (chapitre 3), est encore plus importante face à une objection, parce que le réflexe naturel du vendeur est de <strong>se défendre</strong>. Ses composantes :</p>
<ul>
<li><strong>Laisser finir</strong> : ne jamais couper le client, même si l'on « connaît la réponse ».</li>
<li><strong>Marquer l'écoute</strong> : regard, hochement de tête, prise de notes visible.</li>
<li><strong>Accepter le silence</strong> : quelques secondes de silence après l'objection invitent le client à préciser sa pensée.</li>
<li><strong>Neutraliser l'émotion</strong> : si le client est agacé ou inquiet, reconnaître l'émotion avant d'argumenter (« Je comprends que cela vous inquiète »).</li>
</ul>

<h3>2. La reformulation</h3>
<p>Reformuler, c'est redire avec ses propres mots ce que le client a exprimé, pour vérifier la compréhension et lui montrer qu'il a été entendu.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type</th><th>Principe</th><th>Exemple</th></tr>
<tr><td><strong>Reformulation-écho</strong></td><td>Reprendre un mot-clé sur un ton interrogatif pour inviter à développer.</td><td>Client : « C'est trop cher. » – Commercial : « Trop cher ? »</td></tr>
<tr><td><strong>Reformulation-résumé</strong></td><td>Synthétiser l'objection et son contexte.</td><td>« Si je comprends bien, vous êtes intéressés par la PAC, mais l'expérience de votre voisin vous fait craindre des pannes et du bruit. C'est bien cela ? »</td></tr>
<tr><td><strong>Reformulation-clarification</strong></td><td>Préciser le sens ou faire émerger le non-dit.</td><td>« Quand vous dites que vous allez réfléchir, est-ce le montant, la solution ou autre chose qui vous fait encore hésiter ? »</td></tr>
</table>
<p>La reformulation a trois effets : elle <strong>apaise</strong> (le client se sent compris), elle <strong>précise</strong> (l'objection réelle émerge) et elle <strong>engage</strong> (le client confirme que c'est bien là le point à traiter, ce qui prépare la question de contrôle).</p>

<h3>3. La méthode ACCEPT</h3>
<p>La méthode <strong>ACCEPT</strong> est un moyen mnémotechnique répandu dans les formations commerciales pour structurer le traitement d'une objection. Plusieurs variantes de l'acronyme circulent ; nous retenons la suivante :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Lettre</th><th>Étape</th><th>Ce que fait le commercial</th><th>Exemple (objection « Votre PAC va faire du bruit »)</th></tr>
<tr><td><strong>A</strong></td><td>Accepter</td><td>Accueillir l'objection sans la contester, montrer qu'elle est légitime.</td><td>« C'est une vraie question, et vous avez raison de la poser avant de vous engager. »</td></tr>
<tr><td><strong>C</strong></td><td>Creuser</td><td>Questionner pour comprendre l'origine et la portée.</td><td>« Qu'est-ce qui vous inquiète le plus : le bruit pour vous, pour vos voisins, la nuit ? »</td></tr>
<tr><td><strong>C</strong></td><td>Confirmer</td><td>Reformuler et faire valider l'objection réelle.</td><td>« Si je résume, votre crainte, c'est surtout le bruit chez les voisins, puisque leur chambre donne sur votre jardin. »</td></tr>
<tr><td><strong>E</strong></td><td>Expliquer</td><td>Apporter la réponse adaptée, en lien avec les besoins exprimés.</td><td>« L'emplacement de l'unité extérieure se choisit justement pour cela : nous faisons une étude d'implantation qui tient compte des distances, des murs et des fenêtres voisines. »</td></tr>
<tr><td><strong>P</strong></td><td>Prouver</td><td>Appuyer la réponse par une preuve vérifiable.</td><td>« Voici la fiche du fabricant avec le niveau de puissance acoustique de ce modèle ; et je vous propose de visiter une installation en fonctionnement chez un client qui l'a accepté. »</td></tr>
<tr><td><strong>T</strong></td><td>Tester</td><td>Vérifier que l'objection est levée (question de contrôle).</td><td>« Avec l'étude d'implantation et la visite, est-ce que ce point serait réglé pour vous ? »</td></tr>
</table>

<h3>4. La méthode CRAC</h3>
<p>La méthode <strong>CRAC</strong> est plus courte et convient bien aux objections simples ou aux échanges rapides :</p>
<ol>
<li><strong>C – Creuser</strong> : poser une ou deux questions pour comprendre (« Par rapport à quoi trouvez-vous ce prix élevé ? »).</li>
<li><strong>R – Reformuler</strong> : faire valider sa compréhension (« Vous avez reçu un devis à 15 000 € pour une PAC seule et vous vous demandez pourquoi le nôtre est plus élevé ? »).</li>
<li><strong>A – Argumenter</strong> : répondre avec un argument adapté au profil du client (« Notre devis comprend aussi l'isolation des combles et la neutralisation de la cuve : comparons poste par poste »).</li>
<li><strong>C – Contrôler</strong> : s'assurer que la réponse convient (« Présenté ainsi, la différence vous paraît-elle justifiée ? »).</li>
</ol>
<p>ACCEPT et CRAC reposent sur la même logique : <strong>comprendre avant de répondre, prouver plutôt qu'affirmer, vérifier avant d'avancer</strong>. Le choix de la méthode dépend du contexte ; l'essentiel est de ne jamais sauter la phase de questionnement.</p>

<h3>5. La question de contrôle</h3>
<p>La <strong>question de contrôle</strong> est une question fermée posée après la réponse, pour vérifier que l'objection est levée. Elle évite deux écueils : continuer à argumenter sur un point déjà réglé, ou passer à la suite alors que le doute persiste.</p>
<ul>
<li>« Est-ce que cela répond à votre question ? »</li>
<li>« Ce point est-il clair pour vous ? »</li>
<li>« Y a-t-il autre chose qui vous fait hésiter ? »</li>
</ul>
<p>Si la réponse est « non » ou « oui, mais… », on reprend le questionnement : l'objection réelle n'a pas encore été identifiée. Si la réponse est « oui », on peut passer au point suivant ou à la conclusion (chapitre 7). La dernière question (« autre chose ? ») est particulièrement utile pour <strong>isoler l'objection</strong> : si le client répond « non, c'est tout », lever ce point permet d'envisager la décision.</p>

<h3>6. Les techniques classiques de réponse</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Technique</th><th>Principe</th><th>Usage adapté</th><th>Précaution</th></tr>
<tr><td>Le « oui… et » (plutôt que « oui, mais »)</td><td>Reconnaître le point du client puis compléter l'information.</td><td>Objections partiellement fondées.</td><td>« Mais » efface ce qui précède ; « et » ajoute.</td></tr>
<tr><td>Le boomerang (retournement)</td><td>Transformer l'objection en argument.</td><td>« Justement parce que votre maison est ancienne, l'isolation est la première étape rentable. »</td><td>Ne pas l'utiliser de manière systématique ou ironique.</td></tr>
<tr><td>La compensation</td><td>Admettre une limite et la mettre en balance avec un avantage.</td><td>« Le délai est de huit semaines, c'est vrai ; il nous permet de faire l'étude d'implantation et la demande d'aides dans les règles. »</td><td>La limite doit être réelle et assumée.</td></tr>
<tr><td>Le témoignage et la preuve</td><td>Apporter un élément extérieur vérifiable.</td><td>Objections de confiance et techniques.</td><td>Uniquement des preuves authentiques, avec l'accord des clients cités.</td></tr>
<tr><td>Le report</td><td>Différer la réponse à un moment plus pertinent.</td><td>Question sur le prix posée avant la découverte : « Je vous répondrai précisément dès que j'aurai vu le logement. »</td><td>Revenir effectivement sur le point.</td></tr>
<tr><td>Le fractionnement</td><td>Ramener un montant à une unité plus parlante.</td><td>Comparer un reste à charge mensuel (en cas de financement) à la dépense actuelle de fioul.</td><td>Ne jamais présenter une économie estimée comme certaine ; préciser les hypothèses.</td></tr>
</table>

<h3>7. Les techniques à proscrire</h3>
<ul>
<li><strong>Contredire frontalement</strong> (« Vous vous trompez ») : le client se braque, même s'il a tort.</li>
<li><strong>Minimiser</strong> (« Ce n'est rien, tout le monde dit ça ») : le client se sent méprisé.</li>
<li><strong>Dénigrer un concurrent</strong> : c'est peu professionnel et peut constituer un acte de concurrence déloyale ; on compare des offres, pas des personnes.</li>
<li><strong>Inventer une preuve</strong> (faux avis, faux chiffre, fausse référence) : pratique commerciale trompeuse.</li>
<li><strong>Créer une urgence artificielle</strong> (« prix valable jusqu'à ce soir », « la prime disparaît demain ») : pression contraire à la liberté de décision, et souvent une allégation fausse.</li>
<li><strong>Les techniques de manipulation</strong> (« pied dans la porte » détourné, culpabilisation : « vous ne pensez pas à vos enfants ? ») : elles peuvent produire une signature, jamais une relation de confiance, et elles alimentent les rétractations.</li>
</ul>

<h3>8. Exercice d'application rapide</h3>
<p>Pour chaque objection, identifiez la reformulation et la question de contrôle adaptées (corrigé en fin de section).</p>
<ol>
<li>« Les panneaux solaires, ça ne produit rien en hiver. »</li>
<li>« Je n'ai pas envie d'avoir des ouvriers chez moi pendant un mois. »</li>
<li>« Votre concurrent m'a dit que tout serait pris en charge. »</li>
</ol>
<p><strong>Corrigé indicatif :</strong></p>
<ol>
<li>Reformulation : « Vous vous demandez si l'installation est rentable sur l'année, compte tenu de la baisse de production en hiver ? » – Contrôle : « Si je vous montre l'estimation de production mois par mois pour votre toiture, cela vous aiderait-il à juger ? »</li>
<li>Reformulation : « Votre crainte, c'est la durée et les nuisances du chantier ? » – Réponse : planning détaillé (l'isolation des combles perdus se réalise généralement en une journée, la PAC en quelques jours selon la configuration). Contrôle : « Avec ce planning, est-ce acceptable pour vous ? »</li>
<li>Reformulation : « On vous a annoncé un reste à charge nul, et vous vous demandez pourquoi notre proposition en comporte un ? » – Réponse : expliquer que les aides dépendent des revenus, du logement et des travaux, et qu'elles sont calculées sur le barème en vigueur (à vérifier sur france-renov.gouv.fr) ; proposer de comparer les deux simulations écrites. Contrôle : « Seriez-vous d'accord pour demander à l'autre entreprise sa simulation écrite, afin de comparer sur la même base ? »</li>
</ol>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Sauter l'étape « creuser » et répondre immédiatement.</li>
<li>Reformuler en déformant (« donc vous trouvez qu'on vous vole ? »).</li>
<li>Oublier la question de contrôle et enchaîner les arguments.</li>
<li>Utiliser les méthodes comme des scripts récités : elles doivent rester naturelles.</li>
</ul>
<blockquote><strong>À retenir :</strong> face à une objection, on écoute jusqu'au bout, on reformule, on creuse, on répond avec une preuve et on vérifie par une question de contrôle. ACCEPT (Accepter, Creuser, Confirmer, Expliquer, Prouver, Tester) et CRAC (Creuser, Reformuler, Argumenter, Contrôler) structurent cette démarche. Contredire, minimiser, dénigrer, inventer des preuves ou créer une urgence artificielle sont à proscrire.</blockquote>
`,
      },
      {
        title: "5.5 – Réponses-types aux objections du secteur, sans pression ni fausse promesse",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Disposer de pistes de réponse éthiques pour les objections les plus fréquentes du secteur.</li>
<li>Savoir quelles preuves mobiliser pour chaque famille d'objections.</li>
<li>Identifier, pour chaque objection, les réponses à proscrire.</li>
</ul>

<h3>1. Mode d'emploi des réponses-types</h3>
<p>Les réponses proposées ci-dessous ne sont pas des scripts à réciter. Ce sont des <strong>trames</strong> à adapter au client, après l'avoir écouté et questionné (section 5.4). Chacune suit la même logique : reconnaître, comprendre, répondre avec une preuve, vérifier. Pour chaque objection, une colonne rappelle ce qu'il ne faut jamais dire : ce sont des formulations relevées dans des litiges ou dans les mises en garde des pouvoirs publics.</p>

<h3>2. « C'est trop cher »</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Piste de réponse</th></tr>
<tr><td>Creuser</td><td>« Trop cher par rapport à quoi : à votre budget, à un autre devis, à ce que vous imaginiez ? » ; « Quel montant aviez-vous en tête ? »</td></tr>
<tr><td>Si c'est le budget</td><td>Présenter clairement le <strong>reste à charge</strong> estimé (prix TTC moins aides estimées, chapitre 4), puis les solutions de financement : éco-prêt à taux zéro, prêt bancaire, phasage des travaux. Préciser que les aides sont estimées selon le barème en vigueur à la date de la simulation et sous réserve d'acceptation du dossier.</td></tr>
<tr><td>Si c'est un autre devis</td><td>Proposer une comparaison poste par poste : matériel (marque, puissance, performance), dimensionnement, travaux inclus (désembouage, neutralisation de la cuve, raccordement électrique, évacuation des déchets), qualification RGE couvrant le domaine, garanties, SAV, délai.</td></tr>
<tr><td>Si c'est la valeur perçue</td><td>Revenir aux bénéfices exprimés en découverte : confort à l'étage, fin des livraisons de fioul, sécurité face à une panne, valeur du logement (classe DPE). Présenter l'estimation d'économies en précisant les hypothèses (consommation actuelle, prix de l'énergie à la date de l'étude).</td></tr>
<tr><td>Contrôle</td><td>« Présenté ainsi, le montant vous paraît-il plus cohérent avec ce que vous obtenez ? »</td></tr>
</table>
<p><strong>À proscrire :</strong> « Je vous fais 15 % si vous signez maintenant » ; « Avec les aides, ça ne vous coûtera rien » ; « Les économies rembourseront tout en deux ans » (sans étude).</p>

<h3>3. « C'est une arnaque » / « Vous êtes tous pareils »</h3>
<p>Cette objection est fréquente et compréhensible : le secteur a connu de nombreuses fraudes. La pire réponse est de se vexer ; la meilleure est de <strong>donner au client les moyens de vérifier par lui-même</strong>.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Piste de réponse</th></tr>
<tr><td>Accepter</td><td>« Vous avez raison d'être prudent. Il y a eu beaucoup d'abus dans ce secteur, et les pouvoirs publics recommandent justement de tout vérifier. »</td></tr>
<tr><td>Creuser</td><td>« Avez-vous déjà eu une mauvaise expérience, ou entendu parler de quelque chose de précis ? »</td></tr>
<tr><td>Donner les moyens de vérifier</td><td>Remettre : le numéro SIRET (vérifiable sur l'annuaire des entreprises de l'administration), l'attestation de qualification RGE et ses domaines (vérifiables sur l'annuaire des professionnels RGE de France Rénov'), l'attestation d'assurance décennale, des références de chantiers dans la commune avec l'accord des clients, des avis en ligne vérifiables.</td></tr>
<tr><td>Rappeler les garde-fous</td><td>« Nous ne vous demanderons aucun paiement avant le délai légal ; vous aurez un devis détaillé et un formulaire de rétractation ; vous pouvez faire relire notre proposition par un conseiller France Rénov', c'est un service public gratuit et indépendant. »</td></tr>
<tr><td>Contrôle</td><td>« Avec ces documents, avez-vous ce qu'il faut pour vous faire votre propre avis ? »</td></tr>
</table>
<p><strong>À proscrire :</strong> « Nous sommes partenaires de l'État / de France Rénov' / de l'Anah » (sauf convention réelle et vérifiable, ce qui n'est pas le cas d'une entreprise de travaux ordinaire) ; « Je ne suis pas un commercial, je viens pour un contrôle » ; dénigrer les autres entreprises (« les autres sont des escrocs »).</p>
<blockquote><strong>Bon réflexe :</strong> encourager le client à consulter un Espace Conseil France Rénov' n'est pas une perte de temps commerciale. Un client qui a vérifié par lui-même signe en confiance, se rétracte moins et recommande davantage.</blockquote>

<h3>4. « Je vais réfléchir »</h3>
<p>C'est l'objection la plus fréquente en fin de rendez-vous. Elle peut être <strong>légitime</strong> (le client a le droit et parfois le besoin de réfléchir) ou être un <strong>prétexte</strong> qui masque un doute non exprimé.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Piste de réponse</th></tr>
<tr><td>Accepter</td><td>« C'est tout à fait normal, c'est un investissement important. »</td></tr>
<tr><td>Clarifier</td><td>« Pour que votre réflexion soit la plus facile possible, y a-t-il un point sur lequel vous aimeriez davantage d'informations : la solution, le montant, les aides, l'entreprise ? »</td></tr>
<tr><td>Si un point émerge</td><td>Le traiter avec ACCEPT ou CRAC.</td></tr>
<tr><td>Si rien n'émerge</td><td>Respecter la décision et organiser la suite : « Je vous laisse le devis détaillé et la simulation écrite. Seriez-vous d'accord pour que nous fixions un rendez-vous téléphonique la semaine prochaine, à l'heure qui vous convient, pour répondre à vos éventuelles questions ? »</td></tr>
<tr><td>Contrôle</td><td>« Avez-vous tous les éléments pour en discuter tranquillement ensemble ? »</td></tr>
</table>
<p><strong>À proscrire :</strong> « Si vous réfléchissez, le prix ne sera plus le même » ; « Ma direction ne m'autorise cette offre qu'aujourd'hui » ; rester au domicile en attendant une décision.</p>
<p><strong>Point juridique :</strong> le rappel fixé d'un commun accord avec le client qui a demandé à être recontacté s'inscrit dans le cadre d'une relation qu'il a sollicitée. Mais attention : en rénovation énergétique, la prospection téléphonique non sollicitée des consommateurs est interdite (chapitre 6). Le commercial doit donc noter dans le CRM que le client a <strong>demandé</strong> ce rappel, à quelle date et pour quel objet.</p>

<h3>5. « J'attends les aides » / « Les aides vont augmenter »</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Piste de réponse</th></tr>
<tr><td>Creuser</td><td>« Qu'avez-vous entendu exactement ? D'où vient cette information ? »</td></tr>
<tr><td>Informer honnêtement</td><td>« Les dispositifs (MaPrimeRénov', certificats d'économies d'énergie, éco-PTZ, TVA à taux réduit, aides locales) évoluent régulièrement, à la hausse comme à la baisse, et il arrive que des guichets soient suspendus temporairement. Personne ne peut garantir ce qu'ils seront dans six mois. Ce que je peux faire, c'est vous montrer ce qui est en vigueur aujourd'hui, avec la source. »</td></tr>
<tr><td>Mettre en balance</td><td>Le coût d'attendre : poursuite des dépenses de fioul, risque de panne en hiver qui obligerait à remplacer dans l'urgence, sans pouvoir monter les dossiers d'aides dans les règles.</td></tr>
<tr><td>Respecter les règles</td><td>Rappeler que certaines aides imposent un ordre précis : par exemple, pour les primes CEE, l'offre du financeur doit être formalisée <strong>avant</strong> la signature du devis ; pour MaPrimeRénov', la demande doit être déposée avant le démarrage des travaux. Signer trop vite peut faire perdre une aide.</td></tr>
<tr><td>Contrôle</td><td>« Préférez-vous que nous déposions les demandes sur la base des règles actuelles, ou souhaitez-vous attendre et que je vous recontacte si vous me le demandez ? »</td></tr>
</table>
<p><strong>À proscrire :</strong> « Les aides vont baisser au 1er janvier, il faut signer maintenant » (sauf annonce officielle vérifiable, citée avec sa source) ; « Je vous garantis 8 000 € d'aides » ; « Je m'occupe de tout, vous n'aurez rien à faire » si cela conduit à se substituer au client pour des démarches qu'il doit faire lui-même (création de son compte, attestations sur l'honneur).</p>

<h3>6. « Mon voisin a eu des problèmes »</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Piste de réponse</th></tr>
<tr><td>Accepter</td><td>« Je comprends, une mauvaise expérience à côté de chez soi, ça marque. »</td></tr>
<tr><td>Creuser</td><td>« Que s'est-il passé exactement : une panne, un problème de chauffage insuffisant, du bruit, une entreprise qui a disparu ? »</td></tr>
<tr><td>Expliquer selon la cause</td><td>Chauffage insuffisant : souvent un dimensionnement inadapté ou une maison non isolée, d'où notre étude de dimensionnement et l'isolation prévue en premier. Bruit : emplacement mal choisi, d'où l'étude d'implantation. Entreprise disparue : vérifier l'ancienneté, l'assurance décennale, les garanties fabricant, le contrat d'entretien.</td></tr>
<tr><td>Prouver</td><td>Note de dimensionnement, références de chantiers comparables, proposition de visite d'une installation, organisation du SAV.</td></tr>
<tr><td>Contrôle</td><td>« Ce qui est arrivé à votre voisin pourrait-il, selon vous, se reproduire avec ce que nous prévoyons ? »</td></tr>
</table>
<p><strong>À proscrire :</strong> critiquer l'entreprise du voisin sans rien en savoir ; affirmer « avec nous, il n'y aura jamais aucun problème ».</p>

<h3>7. « La pompe à chaleur fait du bruit » et autres objections techniques</h3>
<p>Le bruit de l'unité extérieure est une crainte légitime : les bruits d'équipements peuvent constituer un trouble de voisinage. Le code de la santé publique (articles R. 1336-4 et suivants) encadre les bruits de voisinage ; pour les bruits d'activités et d'équipements, il retient notamment la notion d'<strong>émergence</strong>, c'est-à-dire l'écart entre le bruit ambiant avec l'équipement en marche et le bruit résiduel sans lui (valeurs limites de 5 dB(A) le jour et 3 dB(A) la nuit, avec un terme correctif selon la durée du bruit, article R. 1336-7). Le commercial n'a pas à faire un calcul acoustique, mais il doit savoir que <strong>l'implantation se réfléchit</strong> et que la réponse sérieuse est une étude, pas une promesse.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Objection technique</th><th>Éléments de réponse</th><th>Preuve à apporter</th></tr>
<tr><td>« La PAC fait du bruit. »</td><td>Choix d'un modèle adapté, implantation éloignée des fenêtres voisines, plots anti-vibratiles, éventuel écran acoustique ; respect de la réglementation sur les bruits de voisinage.</td><td>Fiche technique avec puissance acoustique, plan d'implantation, visite d'une installation.</td></tr>
<tr><td>« Ça ne chauffe pas quand il gèle. »</td><td>Le dimensionnement tient compte de la température extérieure de base de la commune ; les modèles indiquent leur plage de fonctionnement ; un appoint peut être prévu.</td><td>Note de dimensionnement, documentation du fabricant.</td></tr>
<tr><td>« Mes radiateurs ne sont pas compatibles. »</td><td>Vérification de la température de départ nécessaire ; une PAC basse ou moyenne température peut convenir après isolation ; certains émetteurs peuvent devoir être remplacés.</td><td>Relevé des émetteurs fait en visite technique.</td></tr>
<tr><td>« L'isolation par l'intérieur va réduire mes pièces. »</td><td>Épaisseur réelle selon le matériau et la performance visée ; alternatives (isolation par l'extérieur, isolation des combles en priorité).</td><td>Coupe ou schéma, échantillons.</td></tr>
<tr><td>« Les panneaux ne produisent rien en hiver. »</td><td>Production plus faible en hiver, plus forte au printemps et en été ; l'intérêt s'apprécie sur l'année et selon le taux d'autoconsommation.</td><td>Estimation de production mensuelle (par exemple avec l'outil européen PVGIS), hypothèses écrites.</td></tr>
</table>

<h3>8. Les objections de délai</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Objection</th><th>Piste de réponse</th></tr>
<tr><td>« Votre délai est trop long. »</td><td>Expliquer ce qui le compose (visite technique, étude, dépôt des demandes d'aides, approvisionnement, planning) ; proposer la première date réellement disponible ; si l'urgence est réelle (panne), proposer une solution provisoire de dépannage distincte du projet.</td></tr>
<tr><td>« Je ne veux pas de travaux en hiver. »</td><td>Planifier au printemps, en rappelant que la préparation administrative peut commencer dès maintenant.</td></tr>
<tr><td>« Un concurrent peut venir la semaine prochaine. »</td><td>Ne pas promettre un délai intenable ; demander si l'offre concurrente inclut l'étude et le dépôt des dossiers d'aides avant travaux.</td></tr>
</table>

<h3>9. Tableau de synthèse : les preuves par famille d'objections</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Famille</th><th>Preuves à avoir dans sa mallette (ou sa tablette)</th></tr>
<tr><td>Prix</td><td>Devis détaillé poste par poste, simulation d'aides datée et sourcée, estimation d'économies avec hypothèses, solutions de financement.</td></tr>
<tr><td>Confiance</td><td>SIRET, attestation RGE et domaines, assurance décennale, avis clients authentiques, références de chantiers avec accord, procédure SAV.</td></tr>
<tr><td>Report / aides</td><td>Calendrier des démarches, liens officiels (france-renov.gouv.fr, service-public.fr), coordonnées de l'Espace Conseil France Rénov' du secteur.</td></tr>
<tr><td>Technique</td><td>Fiches fabricant, note de dimensionnement, plan d'implantation, photos de chantiers réels.</td></tr>
<tr><td>Délai</td><td>Planning type, étapes administratives, date de première disponibilité.</td></tr>
</table>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Apprendre les réponses-types par cœur et les réciter sans écouter.</li>
<li>Promettre ce que l'entreprise ne maîtrise pas (montant d'une aide, date d'un versement).</li>
<li>Se présenter comme lié à un organisme public pour rassurer.</li>
<li>Oublier que la meilleure réponse à l'objection de confiance est de donner au client les moyens de vérifier.</li>
</ul>
<blockquote><strong>À retenir :</strong> chaque famille d'objections appelle une réponse adaptée et des preuves vérifiables : reste à charge et comparaison poste par poste pour le prix, documents officiels et orientation vers France Rénov' pour la confiance, information honnête et sourcée pour les aides, étude d'implantation pour le bruit, planning réaliste pour le délai. Les promesses de gratuité, les montants garantis, les urgences artificielles et les fausses affiliations sont à bannir.</blockquote>
`,
      },
      {
        title: "5.6 – Négocier le prix et les conditions sans brader",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Annoncer et défendre un prix avec assurance.</li>
<li>Répondre à une demande de remise par l'échange de contreparties.</li>
<li>Comparer loyalement son offre à celle d'un concurrent.</li>
<li>Formaliser les conditions négociées dans un devis modifié conforme.</li>
</ul>

<h3>1. Annoncer le prix</h3>
<p>La manière d'annoncer le prix influence fortement la suite de la négociation. Les bonnes pratiques :</p>
<ul>
<li><strong>Annoncer le prix après la valeur</strong> : présenter d'abord la solution et ses bénéfices pour le client, puis le prix.</li>
<li><strong>Utiliser la « technique du sandwich »</strong> : bénéfice principal, prix, bénéfice complémentaire. « Cette solution vous apporte un chauffage fiable sans fioul ; elle représente un investissement de 21 400 € TTC, et avec les aides estimées, un reste à charge d'environ 13 500 € ; elle améliore aussi la classe énergétique de votre maison. » (chiffres fictifs)</li>
<li><strong>Annoncer d'une voix posée, sans s'excuser</strong> : éviter « je sais que c'est un peu cher, mais… ».</li>
<li><strong>Se taire après l'annonce</strong> : laisser le client réagir le premier.</li>
<li><strong>Présenter les chiffres par écrit</strong> : prix TTC, aides estimées (avec la date, la source et la mention « sous réserve d'acceptation »), reste à charge, financement éventuel.</li>
</ul>

<h3>2. Face à une demande de remise</h3>
<p>Quand le client demande « Vous pouvez faire un geste ? », le commercial suit cinq étapes :</p>
<ol>
<li><strong>Ne pas répondre tout de suite</strong> : « Qu'est-ce qui vous ferait dire oui aujourd'hui ? »</li>
<li><strong>Identifier l'enjeu réel</strong> : budget global, mensualité, comparaison, principe (« je demande toujours un geste »).</li>
<li><strong>Proposer d'abord une alternative non tarifaire</strong> : phasage, autre gamme, service associé, calendrier.</li>
<li><strong>Si une remise est accordée, l'échanger contre une contrepartie</strong> et rester dans sa délégation.</li>
<li><strong>Clore la négociation</strong> : « Si nous sommes d'accord sur ces conditions, je vous prépare le devis modifié. » Éviter d'ouvrir un nouveau cycle de demandes.</li>
</ol>

<h3>3. Comparer loyalement avec un devis concurrent</h3>
<p>Le client qui présente un devis concurrent moins cher offre au commercial une occasion de démontrer la qualité de sa proposition, à condition de rester loyal.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère de comparaison</th><th>Questions à poser</th></tr>
<tr><td>Matériel</td><td>Même puissance ? Même performance saisonnière ? Même garantie fabricant ? Éligibilité aux aides ?</td></tr>
<tr><td>Dimensionnement</td><td>Une étude a-t-elle été faite ? Sur quelle base (déperditions, température extérieure de base) ?</td></tr>
<tr><td>Périmètre</td><td>Isolation incluse ? Dépose de l'ancienne chaudière et neutralisation de la cuve ? Raccordements ? Mise en service ? Évacuation des déchets ?</td></tr>
<tr><td>Qualification</td><td>Qualification RGE couvrant le domaine de travaux concerné ? Assurance décennale en cours ? Sous-traitance déclarée ?</td></tr>
<tr><td>Aides</td><td>Montants annoncés : sur quelle simulation, à quelle date ? Qui dépose les demandes ? L'ordre des démarches est-il respecté ?</td></tr>
<tr><td>Après-vente</td><td>Contrat d'entretien, délai d'intervention en cas de panne, proximité de l'entreprise.</td></tr>
</table>
<p>Le commercial ne dénigre jamais le concurrent : il compare les offres point par point et laisse le client conclure. Si l'offre concurrente est réellement équivalente et moins chère, il le reconnaît et recentre sur ce qui différencie son entreprise (proximité, SAV, références), ou accepte de ne pas s'aligner si cela le ferait passer sous son prix plancher.</p>

<h3>4. Les financements comme levier de négociation</h3>
<p>Pour un particulier, le frein est souvent la trésorerie plus que le coût total. Le commercial peut présenter les principaux dispositifs, en restant dans son rôle :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Dispositif</th><th>Principe</th><th>Rôle du commercial</th></tr>
<tr><td>Éco-prêt à taux zéro (éco-PTZ)</td><td>Prêt sans intérêts accordé par les banques ayant passé une convention avec l'État, pour financer des travaux de rénovation énergétique, sous conditions.</td><td>Informer de l'existence du dispositif, fournir les documents techniques nécessaires (devis, formulaire entreprise) ; le prêt est accordé par la banque, pas par l'entreprise. Plafonds et conditions : à vérifier sur service-public.fr.</td></tr>
<tr><td>Prêt bancaire classique</td><td>Crédit affecté ou personnel.</td><td>Si l'entreprise propose un crédit affecté par l'intermédiaire d'un établissement partenaire, respecter les règles du crédit à la consommation (information précontractuelle, fiche d'informations standardisée, délai de rétractation) ; ne jamais présenter un crédit comme une « aide ».</td></tr>
<tr><td>Avance de certaines aides</td><td>Certaines aides peuvent faire l'objet d'avances selon les conditions du dispositif et les ressources du ménage.</td><td>Ne jamais affirmer qu'une avance sera versée sans vérification des conditions en vigueur.</td></tr>
</table>

<h3>5. Négocier les autres conditions</h3>
<ul>
<li><strong>Date de chantier</strong> : la confirmer par écrit, avec les conditions (accès, présence d'un adulte, électricité disponible).</li>
<li><strong>Conditions de paiement</strong> : acompte, situations, solde à la réception. Rappel : en cas de contrat conclu hors établissement, aucun paiement ni contrepartie ne peut être exigé avant l'expiration d'un délai de sept jours à compter de la conclusion du contrat (article L. 221-10 du code de la consommation, détaillé au chapitre 7).</li>
<li><strong>Garanties et services</strong> : les distinguer clairement des garanties légales (garantie de parfait achèvement, biennale de bon fonctionnement, décennale) qui ne se négocient pas puisqu'elles s'imposent.</li>
<li><strong>Modifications de la solution</strong> : toute modification technique doit être validée par le technicien ou le bureau d'études, et vérifiée au regard de l'éligibilité aux aides.</li>
</ul>

<h3>6. Formaliser l'accord</h3>
<p>Ce qui n'est pas écrit n'existe pas. Après une négociation, le commercial :</p>
<ol>
<li>Récapitule oralement les conditions convenues et obtient l'accord du client.</li>
<li>Établit un <strong>devis modifié</strong> (nouvelle version datée, ancienne version annulée), comportant le détail des prestations, le prix, la remise éventuelle, les conditions de paiement, le délai d'exécution, les mentions relatives à la qualification RGE et aux aides.</li>
<li>Met à jour la simulation d'aides si la solution a changé.</li>
<li>Enregistre dans le CRM les concessions accordées, les contreparties obtenues et la date de décision prévue.</li>
</ol>

<h3>7. Le dialogue entre Karim et Nadia</h3>
<p><em>Karim : « Mme Ferrand m'a demandé si on pouvait faire mieux sur le prix. J'ai dit oui tout de suite et j'ai proposé 10 %. »</em></p>
<p><em>Nadia : « Qu'est-ce qu'elle t'a donné en échange ? »</em></p>
<p><em>Karim : « Rien… Elle a dit qu'elle allait réfléchir. »</em></p>
<p><em>Nadia : « Tu as fait trois erreurs. Tu as dépassé ta délégation sans me consulter. Tu n'as rien demandé en échange. Et tu n'as pas cherché ce qui la faisait vraiment hésiter. La prochaine fois, commence par : "Qu'est-ce qui vous ferait dire oui ?" Si c'est le budget, regarde d'abord le phasage ou l'éco-PTZ. Et si tu fais un geste, c'est contre quelque chose d'utile pour nous : un chantier en avril, par exemple, quand le planning est plus léger. »</em></p>

<h3>Erreurs fréquentes</h3>
<ul>
<li>S'excuser du prix ou l'annoncer en baissant la voix.</li>
<li>Accorder une remise dès la première demande.</li>
<li>Comparer avec un concurrent en le dénigrant.</li>
<li>Présenter un crédit comme une aide ou un financement « gratuit ».</li>
<li>Laisser les conditions négociées à l'oral.</li>
</ul>
<blockquote><strong>À retenir :</strong> on annonce le prix après la valeur, avec assurance et par écrit. Face à une demande de remise, on cherche l'enjeu réel, on propose d'abord une alternative non tarifaire, puis, si besoin, une concession limitée contre une contrepartie. La comparaison avec un concurrent se fait poste par poste, loyalement. Les financements s'expliquent sans les confondre avec des aides. Tout accord est formalisé dans un devis modifié.</blockquote>
`,
      },
      {
        title: "5.7 – Négocier en B2B : syndic, assemblée générale de copropriété, acheteur tertiaire",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Comprendre le processus de décision en copropriété et le rôle du syndic, du conseil syndical et de l'assemblée générale.</li>
<li>Préparer une intervention en assemblée générale.</li>
<li>Négocier avec un acheteur ou un gestionnaire de bâtiment tertiaire assujetti au décret tertiaire.</li>
<li>Adapter les objections et les réponses au contexte professionnel.</li>
</ul>

<h3>1. Ce qui change en B2B</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Particulier (B2C)</th><th>Copropriété / tertiaire (B2B)</th></tr>
<tr><td>Décideur</td><td>Le ménage, souvent en un ou deux rendez-vous.</td><td>Plusieurs acteurs : syndic, conseil syndical, assemblée générale ; gérant, acheteur, directeur technique, propriétaire et locataires.</td></tr>
<tr><td>Durée du cycle</td><td>Quelques semaines.</td><td>Plusieurs mois, parfois plus d'un an (calendrier des assemblées, budgets annuels).</td></tr>
<tr><td>Critères de choix</td><td>Confort, budget, confiance.</td><td>Conformité réglementaire, coût global, performance mesurable, références, capacité de l'entreprise, conditions contractuelles.</td></tr>
<tr><td>Formalisme</td><td>Devis, contrat hors établissement le cas échéant.</td><td>Cahier des charges, mise en concurrence, appel d'offres, mémoire technique, contrat de travaux, pénalités.</td></tr>
<tr><td>Protection</td><td>Droit de la consommation.</td><td>Droit commun des contrats et droit de la copropriété ; certaines protections des consommateurs ne s'appliquent pas.</td></tr>
</table>

<h3>2. La copropriété : comprendre qui décide</h3>
<p>En copropriété, les travaux sur les parties communes (isolation des façades, de la toiture, remplacement d'une chaufferie collective) sont décidés par l'<strong>assemblée générale des copropriétaires</strong>, selon des règles de majorité fixées par la loi du 10 juillet 1965. Les acteurs :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Acteur</th><th>Rôle</th><th>Ce qu'il attend d'une entreprise</th></tr>
<tr><td><strong>Syndic</strong> (professionnel ou bénévole)</td><td>Représente le syndicat des copropriétaires, prépare l'ordre du jour, met en concurrence les entreprises, exécute les décisions de l'assemblée.</td><td>Des devis complets et comparables, remis à temps pour l'envoi de la convocation ; un interlocuteur fiable ; une entreprise assurée.</td></tr>
<tr><td><strong>Conseil syndical</strong></td><td>Assiste et contrôle le syndic, donne son avis sur les devis.</td><td>De la pédagogie, des réponses précises aux questions techniques et financières.</td></tr>
<tr><td><strong>Assemblée générale</strong></td><td>Vote les travaux et leur financement.</td><td>Une présentation claire : pourquoi, combien, quelles aides, quel calendrier, quelle quote-part.</td></tr>
<tr><td>Maître d'œuvre, bureau d'études, assistant à maîtrise d'ouvrage</td><td>Conçoivent le programme de travaux, rédigent le cahier des charges, analysent les offres.</td><td>Une offre conforme au cahier des charges, sans variantes non demandées.</td></tr>
</table>
<p>Plusieurs obligations récentes font de la rénovation des copropriétés un marché structuré : le <strong>plan pluriannuel de travaux</strong> (PPT), rendu progressivement obligatoire par la loi Climat et résilience selon la taille des copropriétés, le <strong>diagnostic de performance énergétique collectif</strong>, et des aides spécifiques (MaPrimeRénov' Copropriété, conditions et montants à vérifier sur france-renov.gouv.fr). Le commercial s'appuie sur ces documents existants plutôt que de proposer des travaux « hors programme ».</p>

<h3>3. Négocier avec le syndic</h3>
<ul>
<li><strong>Respecter le processus</strong> : le syndic doit souvent mettre en concurrence plusieurs entreprises ; l'assemblée générale peut fixer un montant de marché au-delà duquel cette mise en concurrence est obligatoire. Contourner le syndic pour démarcher directement les copropriétaires est contre-productif.</li>
<li><strong>Respecter le calendrier</strong> : les devis doivent être disponibles suffisamment tôt pour être joints à la convocation de l'assemblée générale.</li>
<li><strong>Fournir des offres comparables</strong> : bordereau de prix détaillé, variantes clairement séparées, attestations d'assurance et de qualification.</li>
<li><strong>Anticiper les questions des copropriétaires</strong> : nuisances du chantier, durée, impact sur les charges, aides individuelles et collectives.</li>
<li><strong>Ne jamais proposer d'avantage personnel</strong> au syndic ou à un membre du conseil syndical : ce serait contraire à ses obligations et pourrait relever de la corruption privée.</li>
</ul>

<h3>4. Intervenir en assemblée générale</h3>
<p>Lorsque le syndic invite l'entreprise à présenter son offre en assemblée, l'intervention est courte (souvent 10 à 15 minutes, questions comprises) et doit être préparée avec soin.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Séquence</th><th>Contenu</th><th>Durée indicative</th></tr>
<tr><td>Présentation</td><td>Entreprise, qualification, références de copropriétés comparables.</td><td>1 à 2 min</td></tr>
<tr><td>Le constat</td><td>Ce que disent le DPE collectif, l'audit ou le PPT : déperditions, état des équipements.</td><td>2 min</td></tr>
<tr><td>La solution</td><td>Travaux proposés, phasage, nuisances, durée.</td><td>3 min</td></tr>
<tr><td>Le financement</td><td>Coût global, aides collectives estimées (source et date), effet sur la quote-part (exemple pour un lot type, en précisant que la répartition dépend des tantièmes et de la grille de charges), impact estimé sur les charges.</td><td>3 min</td></tr>
<tr><td>Questions-réponses</td><td>Traitement des objections avec ACCEPT ou CRAC, sans interrompre ni polémiquer.</td><td>5 min</td></tr>
</table>
<p><strong>Objections typiques en assemblée générale</strong> : « Je vends l'année prochaine, pourquoi payer ? » (réponse : la performance énergétique et l'état de l'immeuble pèsent sur la valeur du lot ; les obligations de décence énergétique concernent les bailleurs) ; « Les charges vont exploser » (réponse : présenter l'échéancier d'appels de fonds et le financement possible) ; « On peut attendre » (réponse : rappeler le PPT et les échéances réglementaires, sans dramatiser). Le commercial ne prend <strong>jamais</strong> parti dans les conflits entre copropriétaires et ne vote évidemment pas.</p>

<h3>5. Le cas de Mme Lopez</h3>
<p>Mme Lopez, copropriétaire, souhaite que Thermia Rénov remplace son chauffe-eau électrique par un chauffe-eau thermodynamique et lui demande si l'entreprise peut « aussi faire l'isolation de l'immeuble ». Karim doit distinguer :</p>
<ul>
<li><strong>Les travaux privatifs</strong> (son chauffe-eau, dans son lot) : vente B2C classique, avec les règles du démarchage si le contrat est conclu hors établissement ; vérifier le règlement de copropriété si une unité ou une évacuation touche une partie commune.</li>
<li><strong>Les travaux sur parties communes</strong> : seule l'assemblée générale peut décider. Karim peut remettre à Mme Lopez une plaquette de références copropriété et proposer qu'elle la transmette au conseil syndical ; il peut se faire connaître du syndic pour être consulté lors de la mise en concurrence. Il ne peut pas « vendre » l'isolation de l'immeuble à Mme Lopez.</li>
</ul>

<h3>6. Négocier avec un acheteur tertiaire : la SCI Les Tilleuls</h3>
<p>Le <strong>dispositif éco énergie tertiaire</strong> (dit « décret tertiaire », articles L. 174-1 et R. 174-22 et suivants du code de la construction et de l'habitation) impose aux bâtiments ou ensembles de bâtiments à usage tertiaire dont la surface d'activité tertiaire est supérieure ou égale à 1 000 m² de réduire leur consommation d'énergie finale : <strong>– 40 % en 2030, – 50 % en 2040 et – 60 % en 2050</strong> par rapport à une année de référence (au plus tôt 2010), ou d'atteindre un niveau de consommation exprimé en valeur absolue. Les consommations sont déclarées annuellement sur la plateforme <strong>OPERAT</strong> de l'ADEME. Les modalités détaillées (arrêtés, valeurs absolues, modulations) sont à vérifier sur le site du ministère et de l'ADEME.</p>
<p>Avec ses 1 200 m² de bureaux, la SCI Les Tilleuls est concernée. La négociation se distingue nettement d'une vente B2C :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Attente de l'acheteur</th><th>Réponse de Thermia Rénov</th></tr>
<tr><td>Atteindre l'objectif 2030 au moindre coût global.</td><td>Proposer un plan d'actions hiérarchisé (pilotage, régulation, isolation, remplacement des équipements), chiffré, avec estimation des gains par action et hypothèses explicites.</td></tr>
<tr><td>Des engagements mesurables.</td><td>Distinguer ce qui relève d'une estimation et ce qui peut faire l'objet d'un engagement contractuel (par exemple un contrat de performance énergétique, avec un mode de mesure et de vérification défini). Ne jamais « garantir » un gain sans dispositif contractuel adapté.</td></tr>
<tr><td>Une comparaison objective avec d'autres offres.</td><td>Répondre précisément au cahier des charges, présenter les variantes à part, remettre un mémoire technique.</td></tr>
<tr><td>Des conditions contractuelles maîtrisées.</td><td>Négocier délais, pénalités, modalités de réception, garanties ; préparer les concessions et contreparties comme en B2C (section 5.2).</td></tr>
<tr><td>Un financement.</td><td>Mentionner les primes CEE applicables au tertiaire et les éventuelles aides régionales, sous réserve des conditions en vigueur.</td></tr>
</table>
<p><strong>Objections B2B fréquentes et pistes :</strong></p>
<ul>
<li>« Votre prix est 12 % au-dessus du moins-disant. » → Comparer le coût global sur la durée (investissement, consommation, maintenance) et la conformité au cahier des charges.</li>
<li>« Nous ne sommes pas sûrs d'être concernés. » → Ne pas trancher à la place du client : l'inviter à vérifier son assujettissement (surface, usage) et sa situation sur OPERAT.</li>
<li>« Il faut l'accord des locataires. » → Proposer une réunion d'information conjointe ; le décret tertiaire concerne à la fois propriétaires et preneurs, selon leurs responsabilités respectives.</li>
<li>« Nous verrons au prochain budget. » → Proposer un phasage aligné sur le calendrier budgétaire et identifier les actions de pilotage à faible coût réalisables immédiatement.</li>
</ul>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Démarcher directement les copropriétaires en contournant le syndic.</li>
<li>Remettre un devis trop tard pour la convocation de l'assemblée générale.</li>
<li>Promettre un gain énergétique chiffré sans étude ni dispositif de mesure.</li>
<li>Confondre l'interlocuteur (acheteur) et le décideur (gérant, direction).</li>
<li>Transposer en B2B des techniques de vente « émotionnelles » adaptées au particulier.</li>
</ul>
<blockquote><strong>À retenir :</strong> en B2B, la négociation est plus longue, plus formalisée et implique plusieurs décideurs. En copropriété, l'assemblée générale décide des travaux sur les parties communes ; le syndic organise la mise en concurrence ; l'entreprise respecte ce processus et prépare une présentation claire. En tertiaire, le décret tertiaire structure les besoins : l'acheteur attend un plan chiffré, des engagements mesurables et une offre conforme au cahier des charges.</blockquote>
`,
      },
      {
        title: "5.8 – Jeux de rôle : s'entraîner à négocier et à traiter les objections",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Mettre en pratique les méthodes de traitement des objections en situation simulée.</li>
<li>Observer et évaluer une négociation à l'aide d'une grille.</li>
<li>Recevoir et donner un retour constructif.</li>
</ul>

<h3>1. Organisation des jeux de rôle</h3>
<p>Les jeux de rôle se déroulent en trinômes : un <strong>commercial</strong>, un <strong>client</strong> et un <strong>observateur</strong>. Chaque scénario dure 10 à 12 minutes, suivi de 8 minutes de débriefing. Les rôles tournent pour que chaque participant joue au moins une fois le commercial. Le formateur circule, intervient pour relancer et anime une synthèse collective en fin de séquence.</p>
<p>Consignes données au « client » : jouer de façon réaliste, ni trop facile ni caricaturalement hostile ; ne lever une objection que si la réponse du commercial le convainc vraiment ; garder pour soi l'« objection cachée » de la fiche tant que le commercial ne l'a pas fait émerger par ses questions.</p>
<p>Consignes données au « commercial » : appliquer la méthode (écoute, reformulation, ACCEPT ou CRAC, question de contrôle) ; respecter sa délégation de remise ; ne faire aucune promesse non vérifiable.</p>

<h3>2. Scénario 1 – Les Ferrand : « trop cher » et « on va réfléchir »</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Fiche du commercial</th><th>Fiche du client (confidentielle)</th></tr>
<tr><td>Troisième rendez-vous. Proposition : isolation des combles + PAC air/eau, 21 400 € TTC, aides estimées 7 900 €, reste à charge 13 500 € (chiffres fictifs). Délégation : 3 % de remise. Marges : phasage, chantier en avril, premier entretien offert.</td><td>Vous êtes M. Ferrand. Objections exprimées : « c'est trop cher », puis « on va réfléchir ». Objection cachée : vous avez lu un article sur des entreprises qui disparaissent après le chantier, et vous craignez de ne pas avoir de SAV. Vous accepterez un rendez-vous de décision si l'on vous rassure sur l'entreprise et si l'on vous présente clairement le reste à charge par écrit.</td></tr>
</table>

<h3>3. Scénario 2 – Le bruit de la PAC et le voisin</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Fiche du commercial</th><th>Fiche du client (confidentielle)</th></tr>
<tr><td>Client intéressé par une PAC air/eau pour une maison mitoyenne. Vous disposez de la fiche technique du modèle et pouvez proposer une étude d'implantation et la visite d'une installation.</td><td>Vous êtes Mme Ferrand. Objection : « Notre voisin a eu des problèmes avec sa PAC, et en plus elle fait du bruit. » Ce qui s'est réellement passé chez le voisin : la PAC a été installée contre le mur mitoyen, sous la fenêtre de la chambre des autres voisins, et il y a eu une plainte. Vous serez rassurée si le commercial vous pose des questions sur le cas du voisin et vous propose une implantation étudiée.</td></tr>
</table>

<h3>4. Scénario 3 – « J'attends les nouvelles aides »</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Fiche du commercial</th><th>Fiche du client (confidentielle)</th></tr>
<tr><td>Client propriétaire d'une maison des années 1980, chaudière gaz ancienne. Il a reçu votre devis. Vous connaissez les principes des aides mais pas les éventuelles évolutions futures.</td><td>Vous avez entendu à la radio que « les aides allaient changer » et un concurrent vous a annoncé un reste à charge nul. Vous êtes prêt à avancer si le commercial est honnête sur ce qu'il sait et ne sait pas, et s'il vous explique l'ordre des démarches. Si le commercial vous met la pression (« les aides baissent le mois prochain »), vous mettez fin au rendez-vous.</td></tr>
</table>

<h3>5. Scénario 4 – Assemblée générale de copropriété</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Fiche du commercial</th><th>Fiche des « copropriétaires » (3 à 4 participants)</th></tr>
<tr><td>Vous présentez en 10 minutes l'offre de Thermia Rénov pour l'isolation des combles de la copropriété de Mme Lopez, puis répondez aux questions. Le syndic vous a donné la parole ; le vote aura lieu après votre départ.</td><td>Un copropriétaire qui va vendre ; un bailleur inquiet des obligations de décence énergétique ; une copropriétaire âgée inquiète du montant des appels de fonds ; un membre du conseil syndical qui a déjà comparé trois devis et pose des questions techniques précises.</td></tr>
</table>

<h3>6. Scénario 5 – L'acheteur de la SCI Les Tilleuls</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Fiche du commercial</th><th>Fiche de l'acheteur (confidentielle)</th></tr>
<tr><td>Votre offre pour le remplacement du système de production de chaleur et la régulation du bâtiment est 12 % plus chère que le moins-disant. Nadia vous autorise jusqu'à 4 % de remise contre des contreparties (calendrier, référence, contrat de maintenance pluriannuel).</td><td>Vous êtes acheteur externe mandaté par la SCI. Votre objectif : obtenir 10 % de baisse. Votre vraie priorité (non dite) : le respect du calendrier, car les locataires ont exigé des travaux hors période d'activité, en août. Vous pouvez accepter un prix plus élevé si le commercial s'engage sur un planning et des pénalités raisonnables.</td></tr>
</table>

<h3>7. Grille d'observation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Observé ? (oui / partiellement / non)</th><th>Exemple relevé</th></tr>
<tr><td>Le commercial laisse le client terminer ses phrases.</td><td></td><td></td></tr>
<tr><td>Il accueille l'objection sans la contester.</td><td></td><td></td></tr>
<tr><td>Il pose au moins une question pour creuser.</td><td></td><td></td></tr>
<tr><td>Il reformule et fait valider l'objection réelle.</td><td></td><td></td></tr>
<tr><td>Il apporte une preuve vérifiable.</td><td></td><td></td></tr>
<tr><td>Il pose une question de contrôle.</td><td></td><td></td></tr>
<tr><td>Il respecte sa délégation de remise et échange chaque concession contre une contrepartie.</td><td></td><td></td></tr>
<tr><td>Il ne fait aucune promesse non vérifiable (aide garantie, gain garanti, délai intenable).</td><td></td><td></td></tr>
<tr><td>Il n'exerce aucune pression (urgence artificielle, insistance).</td><td></td><td></td></tr>
<tr><td>Il conclut par une étape suivante claire et acceptée (rendez-vous, envoi d'un document, décision).</td><td></td><td></td></tr>
</table>

<h3>8. Conduire le débriefing</h3>
<ol>
<li><strong>Le commercial s'exprime en premier</strong> : ce qu'il pense avoir réussi, ce qu'il ferait différemment.</li>
<li><strong>Le client</strong> dit ce qui l'a convaincu ou non, et révèle son objection cachée.</li>
<li><strong>L'observateur</strong> commente la grille, avec des faits (« tu as posé deux questions avant de répondre ») plutôt que des jugements (« tu étais bien »).</li>
<li><strong>Synthèse</strong> : un point fort à conserver, un axe de progrès concret pour le prochain jeu de rôle.</li>
</ol>
<blockquote><strong>Lien avec l'évaluation :</strong> l'évaluation finale de la formation, interne à l'organisme, comporte une mise en situation de vente observée par le formateur avec une grille proche de celle-ci. Elle donne lieu à un retour individualisé lors du coaching du dernier jour.</blockquote>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Jouer un client caricatural qui n'accepte rien, ou trop complaisant.</li>
<li>Débriefer avec des jugements de personne plutôt que des observations de comportements.</li>
<li>Ne retenir que les erreurs et oublier les réussites à reproduire.</li>
</ul>
<blockquote><strong>À retenir :</strong> les jeux de rôle permettent d'automatiser les bons réflexes : écouter, creuser, reformuler, prouver, contrôler, échanger les concessions. L'observation s'appuie sur une grille factuelle et le débriefing se conclut par un point fort et un axe de progrès.</blockquote>
`,
      },
      {
        title: "5.9 – Quiz de fin de chapitre",
        content: `
<p>Répondez aux dix questions, puis consultez le corrigé. Une seule réponse est correcte par question.</p>

<h4>Question 1</h4>
<p>Quelle est la différence essentielle entre marchandage et négociation commerciale ?</p>
<ul>
<li>A. Le marchandage concerne les particuliers, la négociation les professionnels</li>
<li>B. La négociation porte sur l'ensemble de la proposition et échange des concessions contre des contreparties</li>
<li>C. La négociation consiste à accorder la remise la plus élevée possible pour signer</li>
<li>D. Il n'y a aucune différence</li>
</ul>

<h4>Question 2</h4>
<p>Un client vous dit : « Je vais réfléchir. » Quelle est la meilleure première réaction ?</p>
<ul>
<li>A. Proposer immédiatement une remise valable uniquement aujourd'hui</li>
<li>B. Accepter, puis demander s'il y a un point particulier sur lequel il souhaiterait davantage d'informations</li>
<li>C. Lui dire que le prix augmentera la semaine prochaine</li>
<li>D. Rester chez lui jusqu'à ce qu'il se décide</li>
</ul>

<h4>Question 3</h4>
<p>Dans la méthode ACCEPT retenue dans ce cours, que signifie la lettre T ?</p>
<ul>
<li>A. Terminer la vente</li>
<li>B. Tarifer</li>
<li>C. Tester, c'est-à-dire vérifier que l'objection est levée</li>
<li>D. Témoigner</li>
</ul>

<h4>Question 4</h4>
<p>Quelles sont les quatre étapes de la méthode CRAC ?</p>
<ul>
<li>A. Convaincre, Rassurer, Accélérer, Conclure</li>
<li>B. Creuser, Reformuler, Argumenter, Contrôler</li>
<li>C. Contredire, Répéter, Affirmer, Clore</li>
<li>D. Calculer, Rédiger, Annoncer, Chiffrer</li>
</ul>

<h4>Question 5</h4>
<p>Un client vous dit : « C'est une arnaque, vous êtes tous pareils. » Quelle réponse est la plus adaptée ?</p>
<ul>
<li>A. « Nous sommes partenaires officiels de France Rénov', vous pouvez avoir confiance. »</li>
<li>B. « Les autres entreprises sont peut-être malhonnêtes, pas nous. »</li>
<li>C. « Vous avez raison d'être prudent. Voici notre SIRET, notre attestation RGE et notre assurance décennale ; vous pouvez aussi faire relire notre devis par un conseiller France Rénov'. »</li>
<li>D. « Si vous ne nous faites pas confiance, nous pouvons arrêter là. »</li>
</ul>

<h4>Question 6</h4>
<p>Le client demande un geste commercial. Quelle est la bonne pratique ?</p>
<ul>
<li>A. Accorder immédiatement 10 % pour ne pas perdre la vente</li>
<li>B. Chercher l'enjeu réel, proposer d'abord une alternative non tarifaire, et si une remise est accordée, l'échanger contre une contrepartie dans la limite de sa délégation</li>
<li>C. Refuser systématiquement toute discussion</li>
<li>D. Gonfler le devis suivant pour pouvoir accorder une remise</li>
</ul>

<h4>Question 7</h4>
<p>Le client hésite car il « attend les nouvelles aides ». Quelle réponse est conforme à une posture loyale ?</p>
<ul>
<li>A. « Les aides baissent le mois prochain, il faut signer ce soir. »</li>
<li>B. « Je vous garantis 9 000 € d'aides. »</li>
<li>C. « Personne ne peut garantir l'évolution des aides ; je peux vous montrer ce qui est en vigueur aujourd'hui, avec la source, et l'ordre des démarches à respecter. »</li>
<li>D. « Avec les aides, vous n'aurez rien à payer. »</li>
</ul>

<h4>Question 8</h4>
<p>Pour les primes CEE, quelle règle de calendrier le commercial doit-il respecter ?</p>
<ul>
<li>A. Faire signer le devis le plus tôt possible, l'offre CEE viendra ensuite</li>
<li>B. L'offre du financeur de la prime doit être formalisée avant la signature du devis</li>
<li>C. La prime CEE est demandée après la fin des travaux, sans condition de calendrier</li>
<li>D. Les primes CEE ne concernent que les entreprises</li>
</ul>

<h4>Question 9</h4>
<p>Une copropriétaire vous demande de « faire l'isolation de la façade de l'immeuble ». Que faites-vous ?</p>
<ul>
<li>A. Vous lui faites signer un devis pour l'ensemble de l'immeuble</li>
<li>B. Vous démarchez les autres copropriétaires un par un</li>
<li>C. Vous lui expliquez que seule l'assemblée générale peut décider des travaux sur les parties communes et proposez de vous faire connaître du syndic</li>
<li>D. Vous refusez de lui parler</li>
</ul>

<h4>Question 10</h4>
<p>Quel est le seuil de surface d'activité tertiaire à partir duquel un bâtiment est soumis au dispositif « éco énergie tertiaire » ?</p>
<ul>
<li>A. 500 m²</li>
<li>B. 1 000 m²</li>
<li>C. 2 000 m²</li>
<li>D. 5 000 m²</li>
</ul>

<h3>Corrigé et explications</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>B</td><td>La négociation porte sur toutes les variables (solution, calendrier, paiement, services, prix) et suit la règle « aucune concession sans contrepartie ». Elle existe en B2C comme en B2B.</td></tr>
<tr><td>2</td><td>B</td><td>« Je vais réfléchir » peut être légitime ou masquer un doute. On l'accepte, puis on cherche s'il existe un point à éclaircir. Les réponses A, C et D relèvent de la pression, voire de la pratique commerciale agressive.</td></tr>
<tr><td>3</td><td>C</td><td>Accepter, Creuser, Confirmer, Expliquer, Prouver, Tester : la dernière étape est la question de contrôle.</td></tr>
<tr><td>4</td><td>B</td><td>Creuser, Reformuler, Argumenter, Contrôler : comprendre avant de répondre et vérifier après.</td></tr>
<tr><td>5</td><td>C</td><td>On reconnaît la légitimité de la méfiance et on donne au client les moyens de vérifier. Se dire faussement « partenaire de France Rénov' » est une pratique commerciale trompeuse ; dénigrer les concurrents ou se vexer est contre-productif.</td></tr>
<tr><td>6</td><td>B</td><td>La remise est un dernier recours, limitée par la délégation et échangée contre une contrepartie légitime. Gonfler un devis pour pouvoir le baisser est déloyal.</td></tr>
<tr><td>7</td><td>C</td><td>Le commercial informe honnêtement, cite les sources officielles et explique l'ordre des démarches. Les aides garanties, la gratuité annoncée et l'urgence artificielle sont à proscrire.</td></tr>
<tr><td>8</td><td>B</td><td>Le dispositif des CEE exige que le financeur ait joué un rôle incitatif : son offre doit être formalisée avant l'engagement de l'opération, c'est-à-dire avant la signature du devis.</td></tr>
<tr><td>9</td><td>C</td><td>Les travaux sur les parties communes relèvent d'un vote de l'assemblée générale ; le syndic organise la consultation des entreprises.</td></tr>
<tr><td>10</td><td>B</td><td>Le dispositif concerne les bâtiments, parties de bâtiments ou ensembles de bâtiments dont la surface d'activité tertiaire est supérieure ou égale à 1 000 m².</td></tr>
</table>
<p><strong>Barème indicatif :</strong> 9 ou 10 bonnes réponses : notions maîtrisées ; 6 à 8 : relire les sections correspondant aux erreurs ; moins de 6 : reprendre le chapitre avant le cas pratique.</p>
`,
      },
      {
        title: "5.10 – Cas pratique : reprendre la négociation du dossier Ferrand et préparer le rendez-vous de la SCI Les Tilleuls",
        content: `
<h3>Consigne</h3>
<p>Vous êtes dans la peau de Karim, conseiller commercial de <strong>Thermia Rénov</strong> (entreprise fictive). Nadia vous demande de préparer deux rendez-vous. Tous les chiffres sont fictifs.</p>
<p><strong>Dossier 1 – M. et Mme Ferrand</strong></p>
<ul>
<li>Maison de 1978, 120 m², chaudière fioul de 25 ans, DPE classé F. Les Ferrand consomment environ 2 000 litres de fioul par an (déclaratif).</li>
<li>Proposition remise : isolation des combles perdus + PAC air/eau + neutralisation de la cuve, 21 400 € TTC ; aides estimées par simulation 7 900 € (montant fictif, sous réserve d'acceptation) ; reste à charge estimé 13 500 €.</li>
<li>Lors du dernier rendez-vous, Karim a proposé oralement 10 % de remise, sans accord de Nadia et sans contrepartie. Les Ferrand ont répondu « on va réfléchir ».</li>
<li>Objections exprimées : prix ; expérience du voisin (PAC bruyante et chauffage insuffisant) ; attente de « nouvelles aides » annoncées par un concurrent qui leur a promis un reste à charge nul.</li>
<li>Les Ferrand ont demandé, lors du rendez-vous, que Karim les rappelle « dans quinze jours » ; cette demande est notée dans le CRM.</li>
<li>Délégation de Karim : 3 % ; au-delà, accord de Nadia.</li>
</ul>
<p><strong>Dossier 2 – SCI Les Tilleuls</strong></p>
<ul>
<li>Immeuble de bureaux de 1 200 m², chaudière gaz ancienne, régulation rudimentaire. Le gérant veut respecter l'objectif 2030 du décret tertiaire.</li>
<li>Thermia Rénov a remis une offre de 186 000 € HT (remplacement de la production de chaleur par une solution PAC et régulation/pilotage), 12 % au-dessus du moins-disant selon l'acheteur.</li>
<li>Nadia autorise jusqu'à 4 % de remise, uniquement contre contreparties.</li>
</ul>
<p><strong>Travail demandé :</strong></p>
<ol>
<li>Analysez les erreurs commises lors du précédent rendez-vous avec les Ferrand.</li>
<li>Rédigez la fiche de préparation du nouveau rendez-vous (objectif, objections probables et objection réelle supposée, preuves, marges de manœuvre, concessions et contreparties).</li>
<li>Rédigez le traitement de deux objections selon la méthode ACCEPT (bruit de la PAC ; « le concurrent dit que tout sera pris en charge »).</li>
<li>Expliquez comment revenir sur la remise de 10 % évoquée oralement.</li>
<li>Préparez la négociation avec l'acheteur de la SCI Les Tilleuls : enjeux, concessions et contreparties, réponses à deux objections.</li>
<li>Listez les pratiques que Karim doit s'interdire dans les deux dossiers.</li>
</ol>

<h3>Corrigé détaillé</h3>
<h4>1. Analyse des erreurs du précédent rendez-vous</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Erreur</th><th>Conséquence</th><th>Ce qu'il fallait faire</th></tr>
<tr><td>Répondre à « trop cher » par une remise immédiate.</td><td>Marge perdue, crédibilité du prix initial entamée.</td><td>Creuser : trop cher par rapport à quoi ?</td></tr>
<tr><td>Dépasser sa délégation (10 % au lieu de 3 %).</td><td>Engagement que l'entreprise ne peut pas forcément tenir.</td><td>Respecter la grille et dire : « je dois faire valider ».</td></tr>
<tr><td>Aucune contrepartie.</td><td>Le client peut demander davantage.</td><td>« Si…, alors… ».</td></tr>
<tr><td>Ne pas traiter l'expérience du voisin.</td><td>La peur technique reste entière.</td><td>Questionner sur ce qui s'est passé, apporter étude et preuves.</td></tr>
<tr><td>Laisser sans réponse la promesse du concurrent.</td><td>Les Ferrand comparent un reste à charge réel à une promesse de gratuité.</td><td>Expliquer le fonctionnement des aides et proposer de comparer des simulations écrites.</td></tr>
<tr><td>Reste à charge présenté uniquement à l'oral.</td><td>Les clients ont retenu le prix TTC.</td><td>Remettre une synthèse écrite : prix, aides estimées (date, source), reste à charge, financement.</td></tr>
</table>

<h4>2. Fiche de préparation du nouveau rendez-vous</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu</th></tr>
<tr><td>Cadre du contact</td><td>Rappel à la date demandée par les Ferrand (demande tracée dans le CRM), pour proposer un rendez-vous à leur domicile en présence des deux époux.</td></tr>
<tr><td>Objectif</td><td>Lever les doutes techniques et de confiance, clarifier les aides, régulariser la question de la remise, obtenir une décision ou un rendez-vous de décision daté. Objectif minimal : accord pour visiter une installation en fonctionnement.</td></tr>
<tr><td>Objection réelle supposée</td><td>La peur du risque technique (voisin) et la confusion sur les aides, plus que le prix.</td></tr>
<tr><td>Preuves</td><td>Note de dimensionnement (déperditions, température extérieure de base), plan d'implantation de l'unité extérieure, fiche technique (puissance acoustique), attestation RGE avec domaines, assurance décennale, deux références de clients ayant accepté une visite, simulation d'aides datée avec la source (france-renov.gouv.fr), synthèse écrite du reste à charge, informations sur l'éco-PTZ (conditions à vérifier sur service-public.fr), procédure SAV et contrat d'entretien.</td></tr>
<tr><td>Marges de manœuvre</td><td>Phasage (isolation d'abord si budget contraint, en expliquant les conséquences sur le dimensionnement) ; chantier en avril ; premier entretien offert ; remise dans la limite autorisée.</td></tr>
<tr><td>Concessions / contreparties</td><td>Premier entretien offert contre souscription du contrat d'entretien la deuxième année ; 3 % de remise contre chantier en avril et accord écrit pour servir de chantier de référence (photos, éventuelle visite).</td></tr>
<tr><td>Étape suivante visée</td><td>Signature du devis modifié après formalisation de l'offre CEE, ou rendez-vous de décision fixé à une date choisie par les Ferrand.</td></tr>
</table>

<h4>3. Traitement de deux objections avec ACCEPT</h4>
<p><strong>Objection 1 : « La PAC de notre voisin fait du bruit et ne chauffe pas assez. »</strong></p>
<ul>
<li><strong>Accepter :</strong> « Je comprends tout à fait votre inquiétude, c'est important d'en parler avant de décider. »</li>
<li><strong>Creuser :</strong> « Savez-vous où son unité extérieure est installée ? Le problème de chauffage, c'était surtout par grand froid ? Sa maison avait-elle été isolée ? »</li>
<li><strong>Confirmer :</strong> « Si je vous suis, l'unité est contre le mur mitoyen, sous une fenêtre, et la maison n'avait pas été isolée. Votre crainte, c'est d'avoir les mêmes problèmes. C'est bien ça ? »</li>
<li><strong>Expliquer :</strong> « Les deux problèmes ont souvent les mêmes causes : un emplacement non étudié et une PAC dimensionnée sans tenir compte de l'isolation. C'est pourquoi nous isolons d'abord les combles et dimensionnons la PAC sur la base de votre maison isolée et de la température extérieure de base de la commune ; nous choisissons l'emplacement en tenant compte des fenêtres et des voisins. »</li>
<li><strong>Prouver :</strong> « Voici la note de dimensionnement, le plan d'implantation et la fiche du fabricant. Et je vous propose de visiter, avec son accord, l'installation d'un client à Brignais. » (exemple fictif)</li>
<li><strong>Tester :</strong> « Avec ces éléments et la visite, pensez-vous que ce qui est arrivé à votre voisin pourrait se reproduire chez vous ? »</li>
</ul>
<p><strong>Objection 2 : « Le concurrent dit que tout sera pris en charge. »</strong></p>
<ul>
<li><strong>Accepter :</strong> « Je comprends que ce soit tentant, et c'est normal de comparer. »</li>
<li><strong>Creuser :</strong> « Vous a-t-il remis une simulation écrite ? Avec quels montants, quelles aides, à quelle date ? A-t-il vu votre avis d'imposition ? »</li>
<li><strong>Confirmer :</strong> « Donc on vous a annoncé oralement un reste à charge nul, sans document. C'est bien cela ? »</li>
<li><strong>Expliquer :</strong> « Le montant des aides dépend de vos revenus, de votre logement et des travaux ; il est calculé selon le barème en vigueur et n'est définitivement acquis qu'après acceptation du dossier et contrôle. Je ne peux pas vous garantir un montant, et personne ne le peut. »</li>
<li><strong>Prouver :</strong> « Voici notre simulation écrite, datée, avec la source ; vous pouvez la refaire vous-même sur le simulateur officiel, ou la faire vérifier gratuitement par l'Espace Conseil France Rénov'. »</li>
<li><strong>Tester :</strong> « Seriez-vous d'accord pour demander au concurrent sa simulation écrite, afin de comparer les deux sur la même base ? »</li>
</ul>

<h4>4. Revenir sur la remise de 10 %</h4>
<p>Karim doit être transparent : il a commis une erreur en proposant une remise qu'il n'était pas autorisé à accorder. Il ne doit ni la nier ni la maintenir sans accord. Deux options, validées en amont avec Nadia :</p>
<ul>
<li>Nadia accepte d'honorer tout ou partie de la remise annoncée, pour préserver la confiance du client, et Karim obtient en échange des contreparties (chantier en avril, chantier de référence) ; la leçon est tirée en interne.</li>
<li>Ou Karim explique honnêtement : « Lors de notre dernier échange, j'ai évoqué une remise de 10 % sans l'avoir fait valider. Je vous dois la vérité : ce n'était pas possible dans ces conditions. Ce que je peux vous proposer, c'est… » (remise autorisée et services associés), en remettant un devis écrit clair.</li>
</ul>
<p>Dans les deux cas, aucun devis écrit ne mentionnait la remise de 10 % : l'erreur reste rattrapable, à condition d'être reconnue. On rappelle que si un devis écrit l'avait mentionnée et avait été accepté, l'entreprise serait engagée.</p>

<h4>5. Négociation avec l'acheteur de la SCI Les Tilleuls</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Préparation</th></tr>
<tr><td>Enjeux de l'acheteur</td><td>Prix affiché (objectif de baisse), mais surtout respect de l'objectif 2030 et, selon nos informations à vérifier par le questionnement, contraintes des locataires sur le calendrier.</td></tr>
<tr><td>Enjeux de Thermia Rénov</td><td>Marge, référence tertiaire, contrat de maintenance pluriannuel, planning compatible avec les autres chantiers.</td></tr>
<tr><td>Questions de découverte</td><td>« Quels sont vos critères de choix et leur poids ? Quelles sont les contraintes de calendrier liées aux locataires ? Comment allez-vous mesurer les gains ? Qui valide la décision finale ? »</td></tr>
<tr><td>Concessions possibles</td><td>Jusqu'à 4 % ; intervention en août (période creuse pour les locataires) ; formation de l'équipe du gestionnaire à la régulation ; rapport de suivi des consommations pendant un an.</td></tr>
<tr><td>Contreparties demandées</td><td>Contrat de maintenance de 3 ans ; autorisation de citer le chantier comme référence ; acompte à la commande ; accès au bâtiment garanti aux dates fixées.</td></tr>
<tr><td>Point de vigilance</td><td>Ne pas garantir un pourcentage de baisse de consommation sans dispositif contractuel de mesure et de vérification ; présenter des estimations avec hypothèses.</td></tr>
</table>
<p><strong>Objection « Vous êtes 12 % plus cher que le moins-disant » :</strong> « Je comprends. Pour comparer sur la même base, pouvons-nous regarder ensemble ce que comprend chaque offre : puissance et performance des équipements, régulation et pilotage, mise en service, maintenance, délais ? Notre offre intègre le pilotage, qui conditionne une partie des gains attendus pour l'objectif 2030. » Puis question de contrôle : « Sur cette base, l'écart vous semble-t-il toujours de 12 % ? »</p>
<p><strong>Objection « Il nous faut 10 % de baisse » :</strong> « Je ne peux pas aller jusque-là sans dégrader la solution. Si nous intervenons en août comme le souhaitent vos locataires et que nous signons un contrat de maintenance de trois ans, je peux revoir le prix de 4 %, et m'engager sur un planning écrit avec des pénalités raisonnables. » (Karim ne divulgue pas son plafond et concède par paliers.)</p>

<h4>6. Pratiques interdites</h4>
<ul>
<li>Créer une urgence artificielle (« les aides baissent le mois prochain »).</li>
<li>Garantir un montant d'aide ou une économie chiffrée sans étude ni contrat.</li>
<li>Se présenter comme partenaire de France Rénov', de l'Anah ou de l'État.</li>
<li>Dénigrer le concurrent des Ferrand ou le moins-disant de la SCI.</li>
<li>Faire signer le devis avant que l'offre CEE ne soit formalisée, ou faire démarrer les travaux avant le dépôt de la demande MaPrimeRénov'.</li>
<li>Demander un paiement aux Ferrand avant l'expiration du délai légal de sept jours si le contrat est conclu à leur domicile.</li>
<li>Recontacter les Ferrand par téléphone en dehors du rappel qu'ils ont eux-mêmes demandé.</li>
<li>Proposer un avantage personnel à l'acheteur de la SCI.</li>
</ul>
<blockquote><strong>À retenir :</strong> reprendre une négociation mal engagée suppose d'abord de reconnaître ses erreurs, puis de préparer : objection réelle, preuves, marges, concessions et contreparties. ACCEPT structure le traitement de chaque objection. En B2B, on identifie les vrais enjeux de l'acheteur pour échanger des concessions qui ont de la valeur pour lui. Dans tous les cas, la loyauté est à la fois une obligation légale et un avantage commercial.</blockquote>
`,
      },
    ],
  },
  {
    title: "Chapitre 6 – Prospecter et développer un portefeuille client (C5)",
    description:
      "Connaître le cadre légal de la prospection dans la rénovation énergétique (interdiction du démarchage téléphonique issue de la loi n° 2020-901, extension aux SMS, courriels et réseaux sociaux par la loi n° 2025-594, consentement préalable et fin de Bloctel), cibler les marchés porteurs (DPE F et G, calendrier de la loi Climat et résilience, copropriétés, tertiaire), développer un réseau de prescripteurs et des canaux licites (salons, portes ouvertes, parrainage, avis, site, réseaux sociaux, réunions de copropriété), respecter le RGPD, construire un plan de prospection, piloter son portefeuille avec un CRM et des indicateurs, organiser sa semaine de commercial. Durée indicative : 3 h 30 (après-midi du jour 4). Fil rouge : Thermia Rénov, entreprise fictive.",
    sections: [
      {
        title: "6.1 – Le cadre légal de la prospection dans la rénovation énergétique",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Connaître l'interdiction du démarchage téléphonique en matière de rénovation énergétique et ses conséquences.</li>
<li>Connaître l'extension de l'interdiction aux SMS, courriels et réseaux sociaux.</li>
<li>Comprendre le régime général du démarchage téléphonique depuis la fin de Bloctel.</li>
<li>Distinguer ce qui est interdit, ce qui est encadré et ce qui est libre.</li>
</ul>

<h3>1. Pourquoi un cadre aussi strict ?</h3>
<p>Pendant plusieurs années, la rénovation énergétique a été le terrain d'un démarchage massif et souvent frauduleux : appels répétés, faux « contrôles » ou « diagnostics obligatoires », sociétés se présentant comme mandatées par l'État, offres « à 1 euro » mal comprises, travaux bâclés financés par des aides publiques. Le législateur a réagi en plusieurs étapes. Pour le commercial, ce cadre n'est pas une contrainte périphérique : <strong>il détermine les canaux de prospection qu'il a le droit d'utiliser</strong>. Une entreprise qui prospecte illégalement s'expose à des sanctions lourdes, à la nullité des contrats et à la perte de sa crédibilité.</p>

<h3>2. L'interdiction du démarchage téléphonique (loi n° 2020-901)</h3>
<p>La <strong>loi n° 2020-901 du 24 juillet 2020</strong> visant à encadrer le démarchage téléphonique et à lutter contre les appels frauduleux a introduit à l'article <strong>L. 223-1 du code de la consommation</strong> une interdiction spécifique : est interdite toute prospection commerciale de consommateurs par des professionnels, <strong>par voie téléphonique</strong>, ayant pour objet la vente d'équipements ou la réalisation de travaux pour des logements <strong>en vue de la réalisation d'économies d'énergie ou de la production d'énergies renouvelables</strong>, à l'exception des sollicitations intervenant dans le cadre de l'exécution d'un contrat en cours.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Ce qu'il faut comprendre</th></tr>
<tr><td>Qui est protégé ?</td><td>Les <strong>consommateurs</strong> (particuliers). La prospection d'entreprises n'est pas visée par ce texte, mais reste soumise au droit commun et au RGPD.</td></tr>
<tr><td>Quels produits ?</td><td>Les équipements et travaux sur des logements visant des économies d'énergie ou la production d'énergies renouvelables : isolation, pompes à chaleur, chauffe-eau thermodynamiques ou solaires, photovoltaïque, VMC, menuiseries performantes, etc.</td></tr>
<tr><td>Quelle exception ?</td><td>Les sollicitations liées à l'<strong>exécution d'un contrat en cours</strong> (par exemple : appeler un client pour fixer la date de son chantier ou de son entretien). L'exception ne permet pas de vendre un nouveau contrat.</td></tr>
<tr><td>Le consentement du client change-t-il la règle ?</td><td>L'interdiction ne prévoit pas d'exception fondée sur le consentement. Les pouvoirs publics la présentent comme une interdiction totale en dehors de l'exécution d'un contrat en cours. Appeler un client qui a <strong>lui-même demandé</strong> à être rappelé pour répondre à sa demande n'est pas une prospection non sollicitée, mais l'entreprise doit pouvoir prouver cette demande (date, objet, canal).</td></tr>
<tr><td>Quelles sanctions ?</td><td>Amende administrative pouvant atteindre <strong>75 000 € pour une personne physique et 375 000 € pour une personne morale</strong>, prononcée par la DGCCRF (article L. 242-16 du code de la consommation). Le contrat conclu à la suite d'une prospection réalisée en violation de l'interdiction est <strong>nul</strong> (article L. 242-16-1).</td></tr>
</table>

<h3>3. L'extension aux autres canaux (loi n° 2025-594)</h3>
<p>La <strong>loi n° 2025-594 du 30 juin 2025 contre toutes les fraudes aux aides publiques</strong> a élargi l'interdiction : la prospection commerciale des consommateurs pour des travaux de rénovation énergétique est désormais interdite non seulement par téléphone, mais aussi par <strong>SMS, courriel et réseaux sociaux</strong> (messages privés de sollicitation, notamment), toujours sous réserve de l'exécution d'un contrat en cours. La même loi a étendu l'interdiction à la prospection pour les travaux d'adaptation du logement à la perte d'autonomie ou au handicap, et a renforcé les contrôles sur les aides.</p>
<blockquote><strong>Vigilance :</strong> les textes d'application et les fiches pratiques de la DGCCRF précisent régulièrement la portée de ces règles. Avant de lancer une action de communication numérique, le commercial vérifie la fiche à jour sur economie.gouv.fr (rubrique DGCCRF) et, en cas de doute, demande l'avis de sa direction ou d'un juriste.</blockquote>

<h3>4. Le régime général : consentement préalable et fin de Bloctel</h3>
<p>Pour les autres secteurs, la même loi du 30 juin 2025 a profondément modifié le démarchage téléphonique des consommateurs. Depuis le <strong>11 août 2026</strong> :</p>
<ul>
<li>le professionnel doit avoir recueilli le <strong>consentement préalable</strong> du consommateur avant tout appel de prospection (régime dit « opt-in ») ; ce consentement doit être libre, spécifique, éclairé, univoque et révocable, et le professionnel doit pouvoir en apporter la preuve ;</li>
<li>la liste d'opposition <strong>Bloctel</strong>, sur laquelle le consommateur devait s'inscrire pour ne plus être démarché, a été supprimée : la logique s'inverse, l'absence de consentement vaut refus.</li>
</ul>
<p>Pour une entreprise de rénovation énergétique, ce régime général ne change rien à l'essentiel : <strong>même avec un consentement, la prospection téléphonique des consommateurs pour des travaux d'économies d'énergie reste interdite</strong>. Il est cependant utile de le connaître : un commercial qui vend aussi des prestations hors du champ de l'interdiction, ou qui reçoit des « fichiers de prospects consentants » de la part de fournisseurs, doit savoir que ces fichiers ne l'autorisent pas à appeler pour de la rénovation énergétique. Avant le 11 août 2026, l'inscription sur Bloctel complétait l'interdiction ; de nombreux supports de formation anciens mentionnent encore Bloctel comme protection principale : ils ne sont plus à jour.</p>

<h3>5. Le démarchage à domicile et les autres formes de contact</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Statut</th><th>Règles principales</th></tr>
<tr><td>Prospection téléphonique de particuliers pour des travaux énergétiques</td><td><strong>Interdite</strong></td><td>Sauf exécution d'un contrat en cours. Sanctions et nullité du contrat.</td></tr>
<tr><td>Prospection par SMS, courriel, réseaux sociaux de particuliers pour ces travaux</td><td><strong>Interdite</strong></td><td>Loi n° 2025-594. Sauf exécution d'un contrat en cours.</td></tr>
<tr><td>Réponse à une demande du client (formulaire, appel entrant, message reçu)</td><td>Libre</td><td>Le contact est sollicité par le client. Tracer la demande (date, canal, objet) dans le CRM.</td></tr>
<tr><td>Contrat conclu au domicile du client (après un rendez-vous, même sollicité)</td><td><strong>Encadré</strong></td><td>Règles du contrat hors établissement : information précontractuelle, droit de rétractation de 14 jours, formulaire de rétractation, aucun paiement avant 7 jours (chapitre 7).</td></tr>
<tr><td>Porte-à-porte non sollicité</td><td>Encadré, déconseillé</td><td>Non visé par l'interdiction téléphonique, mais soumis aux règles du hors établissement, aux éventuels arrêtés municipaux et à l'interdiction des pratiques agressives. Il est mal perçu dans le secteur et Thermia Rénov l'a exclu de sa politique commerciale.</td></tr>
<tr><td>Communication publique (site, publicité, publications sur les réseaux sociaux, salons, presse)</td><td>Libre, sous réserve</td><td>Interdiction des pratiques commerciales trompeuses ; mentions exactes sur la qualification RGE ; pas de fausse affiliation publique.</td></tr>
<tr><td>Prospection d'entreprises, de syndics, de gestionnaires</td><td>Libre, sous réserve</td><td>RGPD (intérêt légitime, information, droit d'opposition), règles de l'e-mail professionnel (section 6.5).</td></tr>
</table>

<h3>6. Les allégations interdites</h3>
<p>Quel que soit le canal, certaines allégations sont trompeuses et sanctionnées. Le commercial ne doit jamais :</p>
<ul>
<li>se présenter comme mandaté, agréé ou envoyé par l'État, l'Anah, France Rénov', une collectivité ou un fournisseur d'énergie ;</li>
<li>évoquer un « contrôle », un « diagnostic obligatoire » ou une « mise aux normes obligatoire » pour obtenir un rendez-vous ;</li>
<li>utiliser des logos officiels ou des visuels laissant croire à une démarche publique ;</li>
<li>annoncer des travaux « gratuits » ou « entièrement financés » ;</li>
<li>afficher une qualification RGE qu'il n'a pas, ou pour un domaine qu'elle ne couvre pas.</li>
</ul>

<h3>7. La position de Thermia Rénov</h3>
<p>Nadia a formalisé une charte de prospection signée par chaque commercial (exemple fictif) :</p>
<ol>
<li>Aucun appel, SMS, courriel ou message privé de prospection à un particulier.</li>
<li>Tout contact avec un particulier part d'une <strong>demande</strong> de sa part (formulaire, appel entrant, recommandation avec son accord, rendez-vous pris sur un salon) et cette demande est tracée dans le CRM.</li>
<li>Aucun porte-à-porte.</li>
<li>Aucune allusion à un organisme public autrement que pour orienter le client vers lui (« vous pouvez vérifier sur… »).</li>
<li>Aucun fichier de prospects acheté à un tiers.</li>
</ol>
<p>Karim s'en étonne : « Mais alors, comment je trouve des clients ? » Nadia : « En faisant en sorte que ce soient eux qui viennent à nous. C'est plus lent au début, mais les clients qui nous appellent sont déjà convaincus qu'ils ont besoin de travaux, et ils signent plus souvent. » C'est l'objet des sections suivantes.</p>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Croire que l'interdiction ne vise que les « centres d'appels » : elle s'applique à toute entreprise, y compris un commercial qui appelle avec son téléphone personnel.</li>
<li>Croire qu'un consentement recueilli par un fournisseur de fichiers autorise l'appel pour des travaux énergétiques.</li>
<li>Penser que les SMS ou messages privés sur les réseaux sociaux échappent à l'interdiction.</li>
<li>Continuer à parler de Bloctel comme du dispositif de référence après le 11 août 2026.</li>
<li>Oublier de tracer la demande du client qui justifie un rappel.</li>
</ul>
<blockquote><strong>À retenir :</strong> la prospection des consommateurs pour des travaux de rénovation énergétique est interdite par téléphone (loi n° 2020-901, art. L. 223-1 c. conso) et, depuis la loi n° 2025-594, par SMS, courriel et réseaux sociaux, sauf exécution d'un contrat en cours. Sanctions : jusqu'à 75 000 € (personne physique) et 375 000 € (personne morale) d'amende administrative, et nullité du contrat. Depuis le 11 août 2026, le régime général exige un consentement préalable et Bloctel a disparu. La prospection licite repose sur des canaux où c'est le client qui prend contact.</blockquote>
`,
      },
      {
        title: "6.2 – Cibler les marchés porteurs : DPE, passoires thermiques et calendrier réglementaire",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Identifier les segments de clientèle les plus porteurs pour une entreprise de travaux énergétiques.</li>
<li>Connaître le rôle du DPE et la notion de passoire thermique.</li>
<li>Maîtriser le calendrier des obligations issues de la loi Climat et résilience.</li>
<li>Construire des profils de clients cibles (personas) et un ciblage géographique.</li>
</ul>

<h3>1. Pourquoi cibler ?</h3>
<p>Un commercial qui ne peut pas « décrocher son téléphone » pour prospecter doit concentrer ses efforts là où la demande existe déjà ou va apparaître. Cibler, c'est répondre à trois questions : <strong>qui</strong> a un besoin (ou une obligation) de travaux, <strong>où</strong> se trouvent ces clients, et <strong>par quel canal</strong> licite ils peuvent découvrir l'entreprise.</p>

<h3>2. Le DPE, outil de ciblage</h3>
<p>Le <strong>diagnostic de performance énergétique</strong> (DPE) classe les logements de A à G selon leur consommation d'énergie primaire et leurs émissions de gaz à effet de serre. Depuis la réforme de juillet 2021, il est <strong>opposable</strong> et sa durée de validité est de 10 ans (les DPE réalisés avant le 1er juillet 2021 ont cessé d'être valides au plus tard le 31 décembre 2024). On appelle couramment <strong>passoires thermiques</strong> les logements classés F et G.</p>
<p>Le DPE a été ajusté à plusieurs reprises : par exemple, le coefficient de conversion de l'électricité en énergie primaire a été abaissé au 1er janvier 2026, ce qui a amélioré le classement de nombreux logements chauffés à l'électricité. Le commercial doit donc toujours raisonner sur le DPE <strong>en vigueur</strong> du logement et ne pas promettre une classe cible sans étude ou audit énergétique.</p>

<h3>3. Le calendrier de la loi Climat et résilience</h3>
<p>La loi n° 2021-1104 du 22 août 2021 dite « Climat et résilience » a intégré la performance énergétique dans les critères de <strong>décence</strong> des logements loués : un logement trop énergivore ne peut plus être proposé à la location pour un nouveau bail (ou lors d'un renouvellement ou d'une reconduction). Le calendrier en métropole :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Date</th><th>Mesure</th><th>Conséquence commerciale</th></tr>
<tr><td>24 août 2022</td><td>Gel des loyers des logements classés F et G (pas de révision, d'indexation ni de majoration).</td><td>Les bailleurs de passoires perdent la possibilité d'augmenter leurs loyers.</td></tr>
<tr><td>1er janvier 2023</td><td>Les logements consommant plus de 450 kWh d'énergie finale par m² et par an ne sont plus décents.</td><td>Premiers bailleurs contraints de faire des travaux.</td></tr>
<tr><td>1er avril 2023</td><td>Audit énergétique obligatoire pour la vente des maisons et immeubles en monopropriété classés F ou G.</td><td>Les acheteurs reçoivent des scénarios de travaux chiffrés.</td></tr>
<tr><td>1er janvier 2025</td><td>Les logements classés G ne sont plus décents (nouveaux baux) ; audit énergétique étendu aux ventes de logements classés E.</td><td>Forte demande des bailleurs de logements G ; acquéreurs informés des travaux nécessaires.</td></tr>
<tr><td>1er janvier 2028</td><td>Les logements classés F ne sont plus décents.</td><td>Marché majeur pour les années 2026-2027 : les bailleurs anticipent.</td></tr>
<tr><td>1er janvier 2034</td><td>Les logements classés E ne sont plus décents ; audit énergétique étendu aux ventes de logements classés D.</td><td>Marché de long terme.</td></tr>
</table>
<blockquote><strong>Vigilance :</strong> ce calendrier fait régulièrement l'objet de débats et de propositions de modification (assouplissements pour les copropriétés, modalités du DPE, situations particulières des petites surfaces ou des logements dont les travaux sont bloqués), et il diffère en outre-mer. Avant de l'utiliser dans un argumentaire, le commercial vérifie la version en vigueur sur service-public.fr ou ecologie.gouv.fr. Utiliser une obligation périmée ou inventée pour pousser un client à signer constitue une pratique commerciale trompeuse.</blockquote>

<h3>4. Les grands segments de clientèle</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Segment</th><th>Déclencheur de projet</th><th>Besoin dominant</th><th>Canaux pour être trouvé</th></tr>
<tr><td>Propriétaires occupants de maisons anciennes (années 1950-1990), chauffage fioul ou électrique ancien</td><td>Panne ou vétusté, hausse des factures, inconfort, départ à la retraite</td><td>Confort, économies, sécurité</td><td>Site et référencement local, avis, salons, parrainage, artisans complémentaires</td></tr>
<tr><td>Bailleurs privés de logements F ou G</td><td>Calendrier de la décence énergétique, gel des loyers, changement de locataire</td><td>Conformité, valeur locative, coût maîtrisé</td><td>Agences immobilières, administrateurs de biens, notaires (information), associations de propriétaires</td></tr>
<tr><td>Acquéreurs récents</td><td>Audit énergétique à la vente, projet de travaux avant emménagement</td><td>Planifier les travaux, financer avec l'achat</td><td>Agences immobilières, courtiers, architectes, site internet</td></tr>
<tr><td>Copropriétés</td><td>PPT, DPE collectif, vote en assemblée générale</td><td>Conformité, maîtrise des charges</td><td>Syndics, maîtres d'œuvre, conseils syndicaux, appels d'offres</td></tr>
<tr><td>Tertiaire (bureaux, commerces)</td><td>Décret tertiaire, coûts d'exploitation, image</td><td>Atteindre les objectifs, coût global</td><td>Prospection B2B, gestionnaires d'actifs, bureaux d'études, réseaux d'entreprises</td></tr>
</table>

<h3>5. Construire des personas</h3>
<p>Un <strong>persona</strong> est un portrait type, fondé sur l'analyse des clients réels, qui aide à choisir les messages et les canaux. Thermia Rénov en a défini trois à partir de ses dossiers des deux dernières années (exemples fictifs) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Persona</th><th>Profil</th><th>Ce qui le décide</th><th>Où il s'informe</th></tr>
<tr><td>« Les Ferrand »</td><td>Couple de 55-65 ans, maison des années 1970-1980, fioul ou électrique ancien, DPE E à G.</td><td>Confiance, interlocuteur local, SAV.</td><td>Bouche-à-oreille, avis Google, presse locale, salons de l'habitat, Espace Conseil France Rénov'.</td></tr>
<tr><td>« Le bailleur pressé »</td><td>Propriétaire d'un ou plusieurs logements loués, classés F ou G.</td><td>Respect de l'échéance, délai, coût.</td><td>Son agence de gestion locative, son notaire, recherches en ligne.</td></tr>
<tr><td>« Le gestionnaire »</td><td>Syndic, gérant de SCI, responsable technique.</td><td>Conformité au cahier des charges, références, fiabilité.</td><td>Réseaux professionnels, consultations, LinkedIn, bureaux d'études.</td></tr>
</table>

<h3>6. Le ciblage géographique</h3>
<p>Une entreprise de travaux a une zone d'intervention limitée (temps de trajet des équipes, coût du SAV). Thermia Rénov intervient dans un rayon d'environ 40 km autour de Saint-Genis-Laval. Pour concentrer ses actions, l'entreprise peut s'appuyer sur des <strong>données territoriales agrégées</strong> : ancienneté du parc de logements par commune, part de maisons individuelles, modes de chauffage (statistiques publiques de l'Insee), répartition des étiquettes DPE à l'échelle d'un territoire (observatoire DPE de l'ADEME).</p>
<blockquote><strong>Attention aux données personnelles :</strong> certaines bases publiques comportent l'adresse précise des logements diagnostiqués. Le fait qu'une donnée soit accessible ne signifie pas qu'on peut la réutiliser librement pour prospecter ses occupants : la réutilisation à des fins commerciales doit être analysée au regard du RGPD (finalité, information des personnes, droit d'opposition), et les canaux de contact restent soumis aux interdictions de la section 6.1. La pratique prudente consiste à utiliser ces données <strong>à l'échelle d'un quartier ou d'une commune</strong> pour choisir où organiser un salon local, une réunion publique ou une campagne de communication, et non pour cibler des personnes nommément.</blockquote>

<h3>7. Exemple : le ciblage de Thermia Rénov</h3>
<ul>
<li>Communes prioritaires : celles où le parc de maisons construites avant 1980 et chauffées au fioul est le plus important (données Insee à l'échelle communale).</li>
<li>Segment prioritaire 2026-2027 : bailleurs de logements F, en raison de l'échéance du 1er janvier 2028, via les agences de gestion locative.</li>
<li>Segment de développement : copropriétés de 20 à 80 lots disposant d'un PPT, via les syndics.</li>
<li>Segment opportuniste : petits bâtiments tertiaires assujettis au décret tertiaire, via les bureaux d'études et le réseau de la chambre de commerce.</li>
</ul>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Cibler « tout le monde » : le message devient générique et les canaux sont dispersés.</li>
<li>Présenter un calendrier réglementaire inexact ou dépassé.</li>
<li>Promettre un gain de classes DPE sans étude ni audit.</li>
<li>Utiliser des données nominatives publiques pour démarcher individuellement.</li>
</ul>
<blockquote><strong>À retenir :</strong> le ciblage repose sur les déclencheurs de projet (panne, factures, vente, obligations). Le DPE et le calendrier de décence énergétique (G non décent depuis 2025, F en 2028, E en 2034) créent des marchés prévisibles, notamment chez les bailleurs. Les personas et les données territoriales agrégées guident le choix des messages, des zones et des canaux, dans le respect du RGPD.</blockquote>
`,
      },
      {
        title: "6.3 – Développer un réseau de prescripteurs et de partenaires",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Identifier les prescripteurs pertinents pour une entreprise de travaux énergétiques.</li>
<li>Construire une relation durable et équilibrée avec chacun d'eux.</li>
<li>Connaître les limites : indépendance de certains acteurs, déontologie, transparence vis-à-vis du client.</li>
<li>Formaliser un partenariat d'apport d'affaires lorsque c'est possible.</li>
</ul>

<h3>1. Qu'est-ce qu'un prescripteur ?</h3>
<p>Un <strong>prescripteur</strong> est une personne ou une organisation qui, sans acheter elle-même, influence la décision du client : elle conseille, recommande, oriente. Dans la rénovation énergétique, où la confiance est décisive, une recommandation par un tiers crédible vaut souvent plus que n'importe quelle publicité. C'est aussi le premier canal licite qui permet au client de <strong>prendre contact de lui-même</strong> avec l'entreprise.</p>

<h3>2. Cartographie des prescripteurs</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Prescripteur</th><th>Pourquoi il est en contact avec des projets</th><th>Ce qu'il attend d'une entreprise</th><th>Limites à respecter</th></tr>
<tr><td><strong>Architectes, maîtres d'œuvre</strong></td><td>Conçoivent des rénovations, rédigent des descriptifs, consultent des entreprises.</td><td>Qualité d'exécution, respect des plans et des délais, réactivité, conseil technique.</td><td>La déontologie des architectes leur interdit de recevoir une rémunération d'un entrepreneur au titre d'un projet qu'ils suivent : aucune commission à proposer.</td></tr>
<tr><td><strong>Agences immobilières, administrateurs de biens</strong></td><td>Accompagnent vendeurs, acquéreurs et bailleurs confrontés au DPE et à la décence énergétique.</td><td>Des estimations rapides de travaux, un interlocuteur fiable pour leurs clients bailleurs.</td><td>Le client doit rester libre de choisir son entreprise ; toute rémunération de l'agence doit être transparente et conforme à ses propres règles professionnelles.</td></tr>
<tr><td><strong>Notaires</strong></td><td>Interviennent lors des ventes (audit énergétique, DPE annexés à l'acte).</td><td>De l'information fiable et neutre pour leurs clients.</td><td>Officiers publics soumis à une stricte déontologie : ils peuvent accepter une documentation générale (guides, conférences), pas un partenariat commercial ni une commission.</td></tr>
<tr><td><strong>Espaces Conseil France Rénov'</strong></td><td>Service public gratuit d'information et de conseil sur la rénovation de l'habitat.</td><td>Des entreprises qualifiées, des devis clairs et conformes.</td><td>Ils sont <strong>neutres et indépendants</strong> : ils ne recommandent pas une entreprise en particulier et ne passent pas de partenariat commercial. L'entreprise peut se faire connaître (participation à des événements publics ouverts aux professionnels, inscription à l'annuaire RGE), mais ne peut jamais se prévaloir d'un « partenariat France Rénov' ».</td></tr>
<tr><td><strong>Mon Accompagnateur Rénov'</strong></td><td>Accompagne les ménages dans les rénovations d'ampleur aidées.</td><td>Des entreprises capables de réaliser un bouquet de travaux de qualité.</td><td>L'accompagnateur est soumis à une exigence d'<strong>indépendance</strong> vis-à-vis des entreprises de travaux : pas de commission, pas d'accord d'exclusivité.</td></tr>
<tr><td><strong>Artisans complémentaires</strong> (électriciens, plombiers, menuisiers, couvreurs, chauffagistes non RGE)</td><td>Sont chez les clients pour d'autres travaux et repèrent des besoins.</td><td>Réciprocité : être recommandés à leur tour, sous-traitance éventuelle.</td><td>Accord de recommandation réciproque clair ; si sous-traitance, contrat écrit et qualification adaptée.</td></tr>
<tr><td><strong>Syndics de copropriété</strong></td><td>Préparent les assemblées générales et mettent en concurrence les entreprises.</td><td>Des devis comparables à temps, de la fiabilité, une présence en assemblée si demandée.</td><td>Aucun avantage personnel (section 5.7).</td></tr>
<tr><td><strong>Bureaux d'études, auditeurs énergétiques</strong></td><td>Réalisent audits et études thermiques qui débouchent sur des préconisations.</td><td>Des entreprises qui exécutent fidèlement les préconisations.</td><td>L'indépendance de l'auditeur doit être préservée ; pas de rémunération liée aux préconisations.</td></tr>
<tr><td><strong>Fournisseurs et fabricants</strong></td><td>Reçoivent des demandes de particuliers et les orientent vers des installateurs.</td><td>Volume de ventes, qualité de pose.</td><td>Lire les conditions des réseaux d'installateurs (exclusivités, engagements).</td></tr>
</table>

<h3>3. Construire la relation avec un prescripteur</h3>
<ol>
<li><strong>Identifier</strong> : lister les prescripteurs de la zone, puis les prioriser selon leur volume de projets et leur proximité avec les cibles.</li>
<li><strong>Se faire connaître</strong> : prise de contact professionnelle (prescripteurs = professionnels, donc hors du champ de l'interdiction de prospection des consommateurs, mais sous réserve du RGPD), présentation courte de l'entreprise, références, qualifications.</li>
<li><strong>Apporter de la valeur</strong> : fiche synthétique sur le calendrier de décence énergétique pour une agence, petit-déjeuner technique pour des architectes sur les PAC en rénovation, mémo « bien lire un devis de rénovation » pour les clients d'un administrateur de biens.</li>
<li><strong>Prouver par l'exécution</strong> : le premier dossier recommandé doit être exemplaire ; c'est lui qui décide de la suite.</li>
<li><strong>Rendre compte</strong> : informer le prescripteur de l'avancement (avec l'accord du client) et le remercier.</li>
<li><strong>Entretenir</strong> : contact régulier (trimestriel), invitations aux portes ouvertes, partage d'informations réglementaires utiles.</li>
</ol>

<h3>4. Formaliser un apport d'affaires</h3>
<p>Lorsqu'un partenaire peut légalement être rémunéré pour une mise en relation (par exemple un artisan complémentaire ou un apporteur indépendant), la relation doit être <strong>écrite</strong> et <strong>transparente</strong> :</p>
<ul>
<li>convention d'apport d'affaires précisant la mission (mise en relation seulement, sans négociation ni signature au nom de l'entreprise), la rémunération, les conditions de versement (après encaissement), la durée ;</li>
<li>engagement de l'apporteur à respecter les règles de prospection : <strong>l'interdiction du démarchage téléphonique et électronique s'applique aussi aux apporteurs</strong>, et l'entreprise qui profite d'une prospection illicite s'expose elle-même ;</li>
<li>rémunération comprise dans le prix, sans surcoût caché pour le client et sans incidence sur les aides ;</li>
<li>contrôle régulier des pratiques de l'apporteur (provenance des contacts, réclamations).</li>
</ul>
<blockquote><strong>Signal d'alerte :</strong> un « apporteur » qui propose de fournir chaque semaine des dizaines de rendez-vous chez des particuliers « intéressés par une PAC » obtient presque toujours ces rendez-vous par un démarchage interdit. Thermia Rénov refuse ce type de proposition.</blockquote>

<h3>5. Le plan prescripteurs de Thermia Rénov</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Prescripteur</th><th>Action</th><th>Responsable</th><th>Objectif (fictif)</th></tr>
<tr><td>8 agences de gestion locative de la zone</td><td>Rendez-vous de présentation, remise d'un mémo « échéance 2028 pour les logements F », proposition d'un interlocuteur dédié aux bailleurs.</td><td>Karim</td><td>4 agences actives, 3 demandes de devis par mois.</td></tr>
<tr><td>Architectes et maîtres d'œuvre locaux</td><td>Petit-déjeuner technique « PAC en rénovation : dimensionnement et implantation » dans les locaux de Thermia Rénov.</td><td>Nadia + responsable technique</td><td>12 participants, 2 consultations par trimestre.</td></tr>
<tr><td>6 artisans complémentaires</td><td>Accord de recommandation réciproque, fiche de contact partagée.</td><td>Karim</td><td>2 recommandations par mois.</td></tr>
<tr><td>5 syndics</td><td>Présentation des références copropriété, dossier type (attestations, qualifications, délais).</td><td>Nadia</td><td>Être consulté pour 4 assemblées générales par an.</td></tr>
<tr><td>Espace Conseil France Rénov' du secteur</td><td>Vérifier que l'annuaire RGE est à jour ; participer aux événements publics ouverts aux professionnels lorsqu'ils sont organisés.</td><td>Nadia</td><td>Visibilité, aucune recommandation attendue.</td></tr>
</table>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Proposer une commission à un prescripteur qui n'a pas le droit d'en recevoir (architecte sur son projet, notaire, conseiller public, accompagnateur).</li>
<li>Prétendre être « partenaire » ou « recommandé » par France Rénov'.</li>
<li>Laisser un apporteur d'affaires prospecter par téléphone au nom de l'entreprise.</li>
<li>Négliger le prescripteur après le premier dossier.</li>
</ul>
<blockquote><strong>À retenir :</strong> les prescripteurs (architectes, agences, notaires, artisans complémentaires, syndics, bureaux d'études) apportent des clients en confiance. La relation se construit en apportant de la valeur et en exécutant parfaitement les premiers dossiers. Les conseillers France Rénov' et les accompagnateurs Rénov' sont indépendants : on ne peut ni les rémunérer ni se prévaloir d'un partenariat. Tout apport d'affaires rémunéré est écrit, transparent et soumis aux mêmes interdictions de prospection.</blockquote>
`,
      },
      {
        title: "6.4 – Les canaux licites pour être trouvé : salons, portes ouvertes, parrainage, avis, site et réseaux sociaux",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Choisir et mettre en œuvre les canaux de prospection licites adaptés à une entreprise de travaux énergétiques.</li>
<li>Connaître les règles particulières des foires et salons, du parrainage et des avis en ligne.</li>
<li>Utiliser le site internet et les réseaux sociaux pour générer des demandes entrantes.</li>
<li>Organiser des événements locaux : portes ouvertes, chantiers témoins, réunions d'information.</li>
</ul>

<h3>1. La logique « entrante »</h3>
<p>Puisque la prospection à distance des particuliers est interdite, la stratégie repose sur la <strong>prospection entrante</strong> : rendre l'entreprise visible, crédible et facile à contacter, pour que le client fasse le premier pas. Chaque canal a un rôle : se faire connaître (notoriété), rassurer (preuves), déclencher la demande (appel à l'action), et la demande arrive par un canal tracé (formulaire, appel entrant, rendez-vous pris sur un stand).</p>

<h3>2. Les foires et salons</h3>
<p>Les salons de l'habitat, foires régionales et salons spécialisés réunissent des visiteurs qui ont souvent un projet. Pour un commercial, c'est l'un des rares lieux où le contact en face à face est à la fois naturel et licite.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avant le salon</th><th>Pendant le salon</th><th>Après le salon</th></tr>
<tr><td>Choisir les salons selon le public (habitat, seniors, immobilier) ; préparer un stand sobre et crédible (qualifications, photos de chantiers réels, maquette ou équipement exposé) ; former l'équipe aux règles ; préparer des fiches de demande de contact avec consentement.</td><td>Accueillir, faire une mini-découverte, proposer un rendez-vous de visite technique à domicile ; recueillir les coordonnées avec l'accord écrit du visiteur et l'objet précis de sa demande ; ne pas pousser à la signature sur place.</td><td>Recontacter uniquement les visiteurs qui l'ont demandé, pour l'objet demandé, dans un délai court ; saisir les contacts dans le CRM avec la source « salon » ; mesurer le retour sur investissement.</td></tr>
</table>
<p><strong>Règle essentielle :</strong> un contrat signé sur une foire ou un salon <strong>ne bénéficie pas du droit de rétractation</strong> de 14 jours (article L. 224-59 du code de la consommation). Le professionnel doit en informer le consommateur, par un affichage visible sur le stand et par une mention dans le contrat, dans les conditions fixées par arrêté. Lorsque l'achat est financé par un crédit affecté, le consommateur dispose en revanche du droit de rétractation lié au crédit, et le contrat de vente est résolu de plein droit si le crédit est rétracté (article L. 224-62). Dans un secteur où les travaux nécessitent une visite technique, Thermia Rénov a pour règle de <strong>ne jamais faire signer de devis sur un salon</strong> : le stand sert à obtenir des rendez-vous, pas des signatures.</p>

<h3>3. Les portes ouvertes et les chantiers témoins</h3>
<ul>
<li><strong>Portes ouvertes dans les locaux</strong> : showroom avec équipements en fonctionnement (PAC, chauffe-eau thermodynamique), démonstration du niveau sonore réel, ateliers courts (« Comprendre son DPE », « Les étapes d'un projet de rénovation »). Annonce par le site, les réseaux sociaux, la presse locale, une affiche chez les partenaires.</li>
<li><strong>Chantiers témoins</strong> : avec l'accord écrit du client, une installation récente peut être présentée à des prospects (visite accompagnée, durée courte). C'est la preuve la plus convaincante face aux objections techniques (chapitre 5). Le client hôte est remercié, par exemple par une extension de garantie ou un entretien offert, sans que cela soit conditionné à un avis positif.</li>
<li><strong>Réunions d'information publiques</strong> : en lien avec une association de quartier ou une commune, sur des thèmes neutres (comment bien préparer son projet, comment vérifier une entreprise). Le ton est informatif, pas commercial, et l'entreprise ne laisse pas croire à un mandat public.</li>
</ul>

<h3>4. Le parrainage</h3>
<p>Le parrainage consiste à récompenser un client qui recommande l'entreprise à un proche qui devient client. C'est un canal particulièrement efficace dans la rénovation, où la recommandation d'un voisin ou d'un ami lève la plupart des objections de confiance.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Bonne pratique</th><th>Pourquoi</th></tr>
<tr><td>Le parrain transmet les coordonnées de l'entreprise à son proche, ou les coordonnées du proche <strong>avec l'accord de celui-ci</strong>.</td><td>L'entreprise ne doit pas démarcher un filleul qui n'a rien demandé ; c'est le filleul qui prend contact, ou qui a explicitement accepté d'être contacté.</td></tr>
<tr><td>Récompense raisonnable, versée après la réception des travaux du filleul (bon d'achat, entretien offert, carte cadeau).</td><td>Éviter qu'une récompense trop élevée transforme les clients en démarcheurs.</td></tr>
<tr><td>Conditions écrites (règlement de parrainage simple).</td><td>Transparence, absence de litige.</td></tr>
<tr><td>Récompense sans lien avec les aides publiques.</td><td>Ne pas présenter la récompense comme une « aide » ni la déduire d'un reste à charge annoncé.</td></tr>
<tr><td>Proposer le parrainage au bon moment : après la réception, quand le client est satisfait.</td><td>Un client satisfait recommande naturellement ; le parrainage l'y encourage.</td></tr>
</table>

<h3>5. Les avis clients en ligne</h3>
<p>Les avis Google (fiche Google Business Profile) et ceux des plateformes spécialisées sont consultés par la grande majorité des clients avant de contacter une entreprise de travaux. Ils sont encadrés :</p>
<ul>
<li><strong>Faux avis interdits</strong> : rédiger ou faire rédiger de faux avis, ou demander à des proches ou à des salariés de publier des avis, constitue une <strong>pratique commerciale trompeuse</strong> (le code de la consommation vise expressément le fait de soumettre ou de faire soumettre de faux avis, article L. 121-4) et viole les règles des plateformes.</li>
<li><strong>Transparence sur la gestion des avis</strong> : un professionnel qui collecte, modère ou publie des avis sur son propre site doit informer les lecteurs des modalités de contrôle et de publication (articles L. 111-7-2 et D. 111-16 et suivants du code de la consommation).</li>
<li><strong>Pas de sélection des clients satisfaits</strong> : demander un avis à tous les clients, et pas seulement à ceux que l'on sait contents.</li>
<li><strong>Pas d'incitation</strong> : ne pas récompenser un avis, encore moins un avis positif.</li>
<li><strong>Répondre à tous les avis</strong>, notamment négatifs, avec courtoisie et en proposant une solution : la réponse est lue par les futurs clients autant que l'avis.</li>
</ul>
<p>Thermia Rénov demande un avis lors de la remise du dossier de fin de chantier (carte avec QR code) et dans le courriel de suivi envoyé un mois après la mise en service, envoi qui s'inscrit dans l'exécution du contrat.</p>

<h3>6. Le site internet et le référencement local</h3>
<p>Le site est le pivot de la prospection entrante : c'est là que le client vérifie le sérieux de l'entreprise et formule sa demande.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Contenu attendu</th></tr>
<tr><td>Preuves de sérieux</td><td>Mentions légales complètes (SIREN, assurance décennale et assureur, zone couverte), qualifications RGE avec domaines et lien vers l'annuaire officiel, photos de chantiers réels, équipe.</td></tr>
<tr><td>Pages par solution et par besoin</td><td>« Remplacer une chaudière fioul », « Isoler ses combles », « Bailleur : préparer l'échéance 2028 », avec explications honnêtes, étapes, délais, principes des aides et liens vers les sources officielles.</td></tr>
<tr><td>Formulaire de demande</td><td>Court (coordonnées, type de projet, commune, créneau de rappel souhaité), avec case de consentement explicite pour être rappelé au sujet de la demande, information RGPD et lien vers la politique de confidentialité.</td></tr>
<tr><td>Référencement local</td><td>Fiche Google Business Profile complète et à jour (catégories, zone desservie, horaires, photos, réponses aux avis), pages ciblant les communes réellement desservies sans multiplier des pages vides.</td></tr>
<tr><td>Simulateurs</td><td>Lien vers le simulateur officiel des aides plutôt qu'un calculateur maison qui donnerait des montants inexacts.</td></tr>
</table>

<h3>7. Les réseaux sociaux</h3>
<p>Les réseaux sociaux restent un canal utile, à condition de distinguer :</p>
<ul>
<li><strong>La publication</strong> (contenu sur la page de l'entreprise : avant/après de chantiers avec accord des clients, conseils, coulisses, événements) : libre, sous réserve d'exactitude des messages.</li>
<li><strong>La publicité ciblée</strong> (annonces sponsorisées sur une zone géographique) : possible, avec des messages exacts, sans allusion trompeuse aux aides (« PAC à 1 € », « travaux gratuits »), et conforme aux règles des plateformes. L'internaute qui clique et remplit un formulaire fait une demande.</li>
<li><strong>La sollicitation individuelle</strong> (message privé envoyé à un particulier qui n'a rien demandé, commentaires commerciaux sous les publications de particuliers) : c'est de la prospection par réseaux sociaux, désormais interdite pour les travaux de rénovation énergétique.</li>
</ul>
<p>Pour la cible professionnelle (syndics, gestionnaires, architectes), LinkedIn permet de publier des références et de prendre contact avec des professionnels, dans le respect du RGPD.</p>

<h3>8. Les réunions de copropriété et le marché collectif</h3>
<ul>
<li>Être consulté par les syndics (section 6.3) et, le cas échéant, présenter son offre en assemblée générale (section 5.7).</li>
<li>Proposer au conseil syndical, par l'intermédiaire du syndic, une réunion d'information sur les travaux envisagés dans le PPT.</li>
<li>Après un chantier collectif, informer les copropriétaires, par une affiche validée par le syndic, des travaux privatifs complémentaires possibles (chauffe-eau, menuiseries) : ce sont les copropriétaires intéressés qui prennent contact.</li>
</ul>

<h3>9. Les autres canaux</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Canal</th><th>Intérêt</th><th>Précautions</th></tr>
<tr><td>Presse locale et radio locale</td><td>Notoriété, crédibilité (article sur un chantier exemplaire, une portes ouvertes).</td><td>Information exacte ; publicité identifiable comme telle.</td></tr>
<tr><td>Véhicules et chantiers floqués, panneaux de chantier</td><td>Visibilité dans les quartiers ciblés.</td><td>Mentions exactes (qualification, coordonnées).</td></tr>
<tr><td>Courrier postal ou dépliants en boîte aux lettres</td><td>Non visé par les interdictions de prospection téléphonique et électronique.</td><td>Respect des mentions « stop pub » ; si le courrier est adressé nominativement, respect du RGPD (origine des données, information, opposition) ; aucune présentation trompeuse imitant un courrier officiel.</td></tr>
<tr><td>Clubs et réseaux d'entreprises</td><td>Accès aux décideurs tertiaires.</td><td>Relation professionnelle, sans pression.</td></tr>
<tr><td>Partenariats avec des fabricants (réseaux d'installateurs)</td><td>Demandes transmises par la marque.</td><td>Vérifier que la marque recueille les demandes de façon licite.</td></tr>
</table>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Faire signer des devis sur un salon sans informer le client de l'absence de droit de rétractation.</li>
<li>Recontacter tous les visiteurs d'un salon, y compris ceux qui n'ont rien demandé.</li>
<li>Offrir une récompense en échange d'un avis positif.</li>
<li>Envoyer des messages privés de sollicitation sur les réseaux sociaux.</li>
<li>Utiliser des slogans du type « PAC à 1 € » ou « travaux 100 % financés ».</li>
</ul>
<blockquote><strong>À retenir :</strong> la prospection licite est entrante : salons (sans rétractation, à annoncer clairement), portes ouvertes et chantiers témoins, parrainage encadré, avis authentiques, site crédible et référencement local, publications et publicités exactes sur les réseaux sociaux, réunions de copropriété via le syndic. Chaque demande est tracée. Les faux avis, les messages privés de sollicitation et les slogans trompeurs sont proscrits.</blockquote>
`,
      },
      {
        title: "6.5 – RGPD, consentement et gestion des données prospects",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Appliquer les principes du RGPD aux données de prospects et de clients.</li>
<li>Choisir la bonne base légale selon la situation (consentement, contrat, intérêt légitime).</li>
<li>Recueillir et prouver un consentement valable.</li>
<li>Connaître les règles de l'e-mail de prospection B2B et les durées de conservation.</li>
</ul>

<h3>1. Le RGPD en quelques principes</h3>
<p>Le <strong>règlement général sur la protection des données</strong> (RGPD, règlement (UE) 2016/679), complété par la loi Informatique et libertés, s'applique à toute donnée permettant d'identifier une personne : nom, téléphone, adresse, courriel, mais aussi adresse d'un logement associée à son DPE, photos de chantier où l'on reconnaît la maison, notes de découverte sur la situation financière.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Principe</th><th>Application au commercial</th></tr>
<tr><td>Licéité, loyauté, transparence</td><td>Chaque traitement repose sur une base légale ; la personne est informée de qui collecte ses données, pourquoi, combien de temps, et de ses droits.</td></tr>
<tr><td>Limitation des finalités</td><td>Des données collectées pour répondre à une demande de devis ne sont pas utilisées pour autre chose sans base légale nouvelle.</td></tr>
<tr><td>Minimisation</td><td>Ne collecter que ce qui est nécessaire : le revenu fiscal de référence peut être nécessaire pour estimer les aides, pas des informations sans lien avec le projet.</td></tr>
<tr><td>Exactitude</td><td>Mettre à jour le CRM, corriger les erreurs.</td></tr>
<tr><td>Limitation de la conservation</td><td>Durées définies et respectées (voir ci-dessous).</td></tr>
<tr><td>Sécurité et confidentialité</td><td>Accès au CRM protégé, pas de fichiers de prospects sur une clé USB ou dans une messagerie personnelle, pas de photos d'avis d'imposition sur le téléphone personnel.</td></tr>
</table>

<h3>2. Les bases légales utiles en prospection</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Base légale</th><th>Exemple</th></tr>
<tr><td>Répondre à une demande de devis, réaliser le chantier</td><td>Mesures précontractuelles et exécution du contrat</td><td>Mme Lopez demande un devis de chauffe-eau via le formulaire.</td></tr>
<tr><td>Envoyer une lettre d'information à des particuliers</td><td>Consentement (et, pour les travaux énergétiques, vérifier que l'envoi ne constitue pas une prospection interdite)</td><td>Case non pré-cochée « Je souhaite recevoir la lettre d'information de Thermia Rénov ».</td></tr>
<tr><td>Prospecter des professionnels (syndics, gérants, architectes)</td><td>Intérêt légitime, avec information et droit d'opposition</td><td>Courriel au gérant de la SCI Les Tilleuls en lien avec son activité.</td></tr>
<tr><td>Respecter une obligation légale (conservation des factures, attestations)</td><td>Obligation légale</td><td>Conservation des pièces comptables.</td></tr>
</table>

<h3>3. Le consentement valable</h3>
<p>Le consentement au sens du RGPD est une manifestation de volonté <strong>libre, spécifique, éclairée et univoque</strong> : case non pré-cochée, finalité précise, information claire, possibilité de retrait aussi simple que l'octroi. L'entreprise doit pouvoir le <strong>prouver</strong> : date, canal, texte présenté, identité de la personne. Concrètement, sur un salon, la fiche de contact comporte une case à cocher par finalité (« être rappelé au sujet de mon projet de… », « recevoir la lettre d'information ») et la signature du visiteur ; sur le site, l'horodatage et le texte du formulaire sont conservés.</p>
<blockquote><strong>Articulation avec l'interdiction de prospection :</strong> le consentement RGPD ne lève pas l'interdiction de prospection des consommateurs pour les travaux de rénovation énergétique (section 6.1). La pratique sûre consiste à n'utiliser le téléphone, le SMS ou le courriel qu'en <strong>réponse à une demande précise du client</strong> ou dans l'<strong>exécution d'un contrat en cours</strong>, et à tracer cette demande. Pour toute communication régulière (lettre d'information), demander l'avis d'un juriste sur sa conformité.</blockquote>

<h3>4. L'e-mail de prospection : particuliers et professionnels</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Destinataire</th><th>Règle générale (article L. 34-5 du code des postes et des communications électroniques)</th><th>Spécificité rénovation énergétique</th></tr>
<tr><td>Particulier</td><td>Consentement préalable obligatoire, sauf s'il est déjà client et que la prospection concerne des produits ou services analogues fournis par la même entreprise, avec possibilité de s'opposer à chaque envoi.</td><td>Prospection par courriel des consommateurs pour ces travaux interdite depuis la loi n° 2025-594, sauf exécution d'un contrat en cours.</td></tr>
<tr><td>Professionnel</td><td>Possible sans consentement préalable si le message est en rapport avec la profession du destinataire ; information et lien de désinscription obligatoires.</td><td>Le texte d'interdiction vise les consommateurs ; la prospection B2B reste possible dans ce cadre.</td></tr>
</table>
<p>Chaque message de prospection doit identifier clairement l'expéditeur et comporter un moyen simple de s'opposer à la réception de nouveaux messages.</p>

<h3>5. Durées de conservation</h3>
<p>La CNIL, dans son référentiel relatif à la gestion commerciale, recommande notamment :</p>
<ul>
<li>pour un <strong>prospect</strong> : conservation au maximum <strong>3 ans</strong> à compter de la collecte ou du dernier contact émanant du prospect ; à l'issue, on peut lui demander s'il souhaite continuer à recevoir des informations, sinon les données sont supprimées ou anonymisées ;</li>
<li>pour un <strong>client</strong> : pendant la durée de la relation contractuelle, puis éventuellement 3 ans à des fins de prospection à compter de la fin de la relation, sans préjudice des durées légales d'archivage (pièces comptables, garanties décennales, etc.).</li>
</ul>
<p>Les pièces sensibles (avis d'imposition pour les aides, pièces d'identité) sont conservées le temps nécessaire au dossier, dans un espace sécurisé, et non dans le CRM commercial accessible à tous.</p>

<h3>6. Les droits des personnes</h3>
<p>Toute personne peut demander l'accès à ses données, leur rectification, leur effacement, la limitation du traitement, et s'opposer à la prospection à tout moment. La demande doit être traitée dans un délai d'un mois (prolongeable dans certains cas). Le commercial qui reçoit une telle demande la transmet immédiatement au référent désigné et note l'opposition dans le CRM.</p>

<h3>7. Les fichiers achetés ou loués</h3>
<p>L'achat de fichiers de particuliers « intéressés par la rénovation » est à proscrire chez Thermia Rénov : l'origine des données et la validité des consentements sont souvent invérifiables, et leur exploitation par téléphone, SMS ou courriel pour des travaux énergétiques est de toute façon interdite. Pour la cible B2B, l'achat d'un fichier de professionnels est possible, à condition de vérifier son origine, l'information des personnes et la mise à jour.</p>

<h3>8. Le registre et la documentation</h3>
<p>L'entreprise tient un <strong>registre des traitements</strong> (prospection, gestion des clients, dossiers d'aides, avis clients) et documente ses règles : textes des formulaires, durées de conservation, procédure de gestion des droits. Pour le commercial, la règle pratique est simple : <strong>chaque contact dans le CRM a une source, une base légale et une date</strong>.</p>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Considérer qu'une carte de visite récupérée sur un salon vaut consentement à tout type de sollicitation.</li>
<li>Utiliser une case pré-cochée ou un consentement global « à toutes communications ».</li>
<li>Conserver indéfiniment les prospects inactifs.</li>
<li>Stocker des avis d'imposition dans sa messagerie personnelle.</li>
<li>Confondre consentement RGPD et autorisation de prospecter pour des travaux énergétiques.</li>
</ul>
<blockquote><strong>À retenir :</strong> chaque donnée de prospect a une base légale (contrat, consentement, intérêt légitime pour le B2B), une finalité, une durée de conservation (3 ans maximum après le dernier contact pour un prospect, selon la CNIL) et une source traçable. Le consentement doit être libre, spécifique, éclairé, univoque et prouvé. Il ne lève pas l'interdiction de prospection des consommateurs pour les travaux énergétiques.</blockquote>
`,
      },
      {
        title: "6.6 – Construire un plan de prospection",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Traduire un objectif de chiffre d'affaires en volume d'activité commerciale.</li>
<li>Choisir un mix de canaux et l'allouer dans le temps.</li>
<li>Rédiger un plan de prospection annuel et trimestriel.</li>
</ul>

<h3>1. Partir de l'objectif : le calcul inversé</h3>
<p>Un plan de prospection commence par un objectif chiffré, puis remonte l'entonnoir commercial jusqu'au nombre de contacts nécessaires. Exemple pour Karim (chiffres fictifs) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Hypothèse</th><th>Résultat</th></tr>
<tr><td>Objectif annuel de chiffre d'affaires signé (particuliers)</td><td>—</td><td>600 000 € TTC</td></tr>
<tr><td>Panier moyen</td><td>15 000 € TTC</td><td>40 ventes par an</td></tr>
<tr><td>Taux de transformation devis → vente</td><td>35 %</td><td>115 devis remis</td></tr>
<tr><td>Taux visite technique → devis</td><td>85 %</td><td>135 visites techniques</td></tr>
<tr><td>Taux demande qualifiée → visite</td><td>60 %</td><td>225 demandes qualifiées</td></tr>
<tr><td>Rythme</td><td>45 semaines travaillées</td><td>5 demandes qualifiées par semaine</td></tr>
</table>
<p>Ce calcul fait apparaître le vrai enjeu : <strong>générer environ cinq demandes qualifiées par semaine</strong> par des canaux licites. Il montre aussi les leviers : améliorer le taux de transformation de 35 à 40 % réduit d'environ 13 % le nombre de demandes nécessaires.</p>

<h3>2. Le mix de canaux</h3>
<p>On répartit l'objectif de demandes entre les canaux, en fonction de leur rendement observé (données du CRM) et de leur coût.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Canal</th><th>Part des demandes visée (fictif)</th><th>Coût principal</th><th>Délai d'effet</th></tr>
<tr><td>Site internet et référencement local</td><td>35 %</td><td>Temps de contenu, prestataire</td><td>Moyen terme</td></tr>
<tr><td>Recommandations et parrainage</td><td>20 %</td><td>Récompenses, qualité d'exécution</td><td>Cumulatif</td></tr>
<tr><td>Prescripteurs (agences, artisans, architectes)</td><td>20 %</td><td>Temps relationnel</td><td>3 à 6 mois</td></tr>
<tr><td>Salons et portes ouvertes</td><td>15 %</td><td>Stand, personnel</td><td>Immédiat mais saisonnier</td></tr>
<tr><td>Publicité locale (en ligne, presse)</td><td>10 %</td><td>Budget média</td><td>Immédiat</td></tr>
</table>
<p>Le mix évite la dépendance à un seul canal : si un salon est annulé ou si le référencement baisse, les autres canaux prennent le relais.</p>

<h3>3. Tenir compte de la saisonnalité</h3>
<ul>
<li><strong>Fin d'été et automne</strong> : forte demande de chauffage (anticipation de l'hiver), salons de rentrée. C'est la haute saison des demandes.</li>
<li><strong>Hiver</strong> : pannes et remplacements urgents ; les délais s'allongent.</li>
<li><strong>Printemps</strong> : période favorable aux chantiers d'isolation et de photovoltaïque ; portes ouvertes.</li>
<li><strong>Calendrier réglementaire</strong> : approche de l'échéance 2028 pour les logements F chez les bailleurs ; calendrier des assemblées générales de copropriété (souvent au premier semestre, après la clôture des comptes).</li>
</ul>

<h3>4. Les composantes du plan de prospection</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Contenu</th></tr>
<tr><td>Objectifs</td><td>Chiffre d'affaires, nombre de ventes, de devis, de demandes, par segment.</td></tr>
<tr><td>Cibles</td><td>Segments et personas prioritaires, zones géographiques.</td></tr>
<tr><td>Canaux et actions</td><td>Pour chaque canal : actions concrètes, calendrier, responsable.</td></tr>
<tr><td>Messages</td><td>Promesse principale par segment, preuves, appel à l'action.</td></tr>
<tr><td>Budget</td><td>Salons, publicité, supports, récompenses de parrainage, outils.</td></tr>
<tr><td>Conformité</td><td>Vérification des canaux (interdictions de prospection, RGPD, allégations).</td></tr>
<tr><td>Indicateurs et revue</td><td>Indicateurs suivis, fréquence de revue (section 6.7).</td></tr>
</table>

<h3>5. Des objectifs SMART</h3>
<p>Chaque action est formulée de manière <strong>SMART</strong> : Spécifique, Mesurable, Atteignable, Réaliste, Temporellement définie. Exemple : « Obtenir 3 demandes de devis par mois de la part d'agences de gestion locative de l'ouest lyonnais, à partir de mars, grâce à 8 rendez-vous de présentation réalisés en janvier et février. » Contre-exemple : « Développer les partenariats. »</p>

<h3>6. Exemple : extrait du plan trimestriel de Karim</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Mois</th><th>Action</th><th>Objectif</th><th>Indicateur</th></tr>
<tr><td>Janvier</td><td>8 rendez-vous de présentation avec des agences de gestion locative ; mémo « échéance 2028 ».</td><td>4 agences actives</td><td>Nombre de rendez-vous, demandes reçues par agence.</td></tr>
<tr><td>Janvier</td><td>Demande d'avis systématique aux 12 clients réceptionnés en décembre.</td><td>12 demandes envoyées</td><td>Nombre d'avis reçus, note moyenne.</td></tr>
<tr><td>Février</td><td>Rencontre de 6 artisans complémentaires, accord de recommandation réciproque.</td><td>4 accords</td><td>Recommandations reçues.</td></tr>
<tr><td>Février</td><td>Deux pages du site : « Bailleurs : logements F et échéance 2028 » et « Remplacer une chaudière fioul ».</td><td>Pages publiées</td><td>Visites, demandes via ces pages.</td></tr>
<tr><td>Mars</td><td>Portes ouvertes avec démonstration de PAC en fonctionnement.</td><td>40 visiteurs, 12 rendez-vous demandés</td><td>Visiteurs, demandes, visites techniques.</td></tr>
<tr><td>Mars</td><td>Proposition de parrainage aux 30 derniers clients satisfaits, lors du contrôle à trois mois.</td><td>6 recommandations</td><td>Filleuls, signatures.</td></tr>
</table>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Fixer un objectif de chiffre d'affaires sans le traduire en activité hebdomadaire.</li>
<li>Dépendre d'un seul canal.</li>
<li>Oublier la saisonnalité et lancer les actions trop tard.</li>
<li>Rédiger des actions vagues, sans responsable ni indicateur.</li>
<li>Ne pas vérifier la conformité d'un canal avant de l'activer.</li>
</ul>
<blockquote><strong>À retenir :</strong> le plan de prospection part d'un objectif chiffré et remonte l'entonnoir (panier moyen, taux de transformation) jusqu'au nombre de demandes qualifiées nécessaires par semaine. Il répartit ces demandes entre plusieurs canaux licites, tient compte des saisons et du calendrier réglementaire, fixe des actions SMART avec responsable et indicateur, et prévoit un contrôle de conformité.</blockquote>
`,
      },
      {
        title: "6.7 – Piloter son portefeuille avec un CRM et des indicateurs",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Comprendre l'intérêt d'un CRM pour un commercial en travaux énergétiques.</li>
<li>Structurer le pipeline commercial en étapes.</li>
<li>Calculer et interpréter les principaux indicateurs : taux de transformation, panier moyen, cycle de vente, coût d'acquisition.</li>
<li>Utiliser les indicateurs pour décider des actions correctives.</li>
</ul>

<h3>1. Le CRM, mémoire et outil de pilotage</h3>
<p>Un <strong>CRM</strong> (<em>Customer Relationship Management</em>, gestion de la relation client) centralise les informations sur les prospects et les clients : coordonnées, source du contact, historique des échanges, devis, étapes, prochaines actions. Pour une entreprise de travaux énergétiques, il remplit trois fonctions :</p>
<ul>
<li><strong>Mémoire</strong> : quiconque reprend le dossier sait ce qui a été dit, promis et envoyé.</li>
<li><strong>Organisation</strong> : rappels des relances demandées par les clients, des échéances de dépôt des dossiers d'aides, des entretiens annuels.</li>
<li><strong>Preuve et conformité</strong> : traçabilité de la source de chaque contact (demande du client, recommandation avec accord, salon avec consentement), des consentements et des oppositions, utile en cas de contrôle de la DGCCRF ou de la CNIL.</li>
</ul>
<p>Il existe des CRM généralistes et des logiciels métiers du bâtiment intégrant devis, planning et facturation. Le choix dépend de la taille de l'entreprise ; l'essentiel est que l'outil soit <strong>réellement utilisé</strong> et que les données y soient fiables.</p>

<h3>2. Les étapes du pipeline</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Définition</th><th>Action attendue du commercial</th></tr>
<tr><td>1. Demande reçue</td><td>Contact entrant enregistré avec sa source.</td><td>Rappeler dans les 24 à 48 heures ouvrées, comme le client l'a demandé.</td></tr>
<tr><td>2. Demande qualifiée</td><td>Projet réel, zone desservie, solution dans le champ de l'entreprise.</td><td>Fixer la visite technique.</td></tr>
<tr><td>3. Visite technique réalisée</td><td>Découverte et relevés effectués.</td><td>Produire le devis et la simulation d'aides.</td></tr>
<tr><td>4. Devis remis</td><td>Proposition présentée au client.</td><td>Fixer avec le client la date de décision ou de rappel.</td></tr>
<tr><td>5. Négociation</td><td>Objections en cours de traitement, devis modifié.</td><td>Traiter, formaliser, faire valider les concessions.</td></tr>
<tr><td>6. Gagné / perdu</td><td>Signature (puis fin du délai de rétractation) ou refus.</td><td>Gagné : transmettre au planning et aux dossiers d'aides. Perdu : noter le motif.</td></tr>
</table>
<p>Le <strong>motif de perte</strong> est une information essentielle : prix, concurrent, report, refus de financement, aides, confiance. Sans lui, impossible d'améliorer l'offre ou l'argumentaire.</p>

<h3>3. Les champs indispensables d'une fiche</h3>
<ul>
<li>Identité et coordonnées ; segment (particulier occupant, bailleur, copropriété, tertiaire).</li>
<li><strong>Source</strong> du contact et preuve de la demande (formulaire horodaté, fiche salon signée, appel entrant).</li>
<li>Consentements donnés et oppositions exprimées, avec dates.</li>
<li>Caractéristiques du logement ou du bâtiment (année, surface, énergie, DPE).</li>
<li>Besoins exprimés et profil SONCAS dominant.</li>
<li>Devis (versions, montants), simulation d'aides (date, source), concessions accordées.</li>
<li>Prochaine action, date, responsable.</li>
<li>Motif de gain ou de perte.</li>
</ul>

<h3>4. Les indicateurs clés</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Formule</th><th>Ce qu'il révèle</th></tr>
<tr><td><strong>Taux de transformation</strong> (devis → vente)</td><td>Nombre de ventes ÷ nombre de devis remis × 100</td><td>Qualité de l'argumentation, de la négociation et de l'adéquation de l'offre.</td></tr>
<tr><td>Taux de transformation global</td><td>Nombre de ventes ÷ nombre de demandes reçues × 100</td><td>Efficacité de l'ensemble du processus, y compris la qualité des demandes.</td></tr>
<tr><td><strong>Panier moyen</strong></td><td>Chiffre d'affaires signé ÷ nombre de ventes</td><td>Capacité à proposer des solutions complètes (bouquets de travaux) adaptées aux besoins.</td></tr>
<tr><td>Cycle de vente</td><td>Délai moyen entre la demande et la signature</td><td>Fluidité du processus ; un cycle qui s'allonge signale des freins.</td></tr>
<tr><td>Coût d'acquisition par canal</td><td>Dépenses du canal ÷ nombre de ventes issues du canal</td><td>Rentabilité de chaque canal.</td></tr>
<tr><td>Taux de rétractation / annulation</td><td>Contrats rétractés ou annulés ÷ contrats signés × 100</td><td>Qualité de la vente : un taux élevé signale de la pression ou des promesses non tenues.</td></tr>
<tr><td>Délai de premier contact</td><td>Temps moyen entre la demande et le premier rappel</td><td>Réactivité ; une demande non rappelée rapidement part chez un concurrent.</td></tr>
<tr><td>Taux de recommandation</td><td>Part des ventes issues de recommandations ou parrainages</td><td>Satisfaction et capital confiance.</td></tr>
<tr><td>Note moyenne et nombre d'avis</td><td>Données de la fiche Google Business Profile</td><td>Réputation visible des futurs clients.</td></tr>
</table>

<h3>5. Lire et interpréter : le tableau de bord de Karim</h3>
<p>Après six mois, Nadia analyse avec Karim son tableau de bord, comparé à la moyenne de l'équipe (chiffres fictifs) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Karim</th><th>Équipe</th><th>Lecture</th></tr>
<tr><td>Demandes reçues</td><td>118</td><td>110</td><td>Volume correct.</td></tr>
<tr><td>Devis remis</td><td>74</td><td>62</td><td>Karim fait beaucoup de devis, parfois sans qualification suffisante.</td></tr>
<tr><td>Ventes</td><td>17</td><td>22</td><td>En retrait.</td></tr>
<tr><td>Taux de transformation devis → vente</td><td>23 %</td><td>35 %</td><td>Faiblesse principale : objections mal traitées, relances non fixées.</td></tr>
<tr><td>Panier moyen</td><td>11 800 €</td><td>15 200 €</td><td>Karim propose souvent un seul équipement, sans bouquet cohérent (isolation + chauffage).</td></tr>
<tr><td>Remise moyenne accordée</td><td>6,5 %</td><td>2,8 %</td><td>Concessions trop rapides et hors délégation.</td></tr>
<tr><td>Taux de rétractation</td><td>12 %</td><td>4 %</td><td>Signal d'alerte : signatures obtenues trop vite, doutes non levés.</td></tr>
<tr><td>Délai de premier contact</td><td>3,5 jours</td><td>1,5 jour</td><td>Rappels trop tardifs.</td></tr>
</table>
<p><strong>Plan d'action convenu :</strong> mieux qualifier avant de chiffrer ; appliquer ACCEPT et la fiche de préparation (chapitre 5) ; proposer systématiquement une approche globale lorsque l'étude la justifie ; respecter la délégation ; ne jamais conclure le jour même si des doutes subsistent ; bloquer chaque matin un créneau de rappel des demandes de la veille.</p>
<blockquote><strong>Point de vigilance :</strong> les indicateurs ne doivent pas pousser à de mauvais comportements. Un objectif de panier moyen ne justifie jamais de vendre des travaux inutiles ; un objectif de transformation ne justifie jamais la pression. C'est pourquoi le taux de rétractation et les avis clients figurent dans le tableau de bord, à côté des indicateurs de volume.</blockquote>

<h3>6. Les rituels de pilotage</h3>
<ul>
<li><strong>Chaque jour</strong> : traiter les nouvelles demandes, mettre à jour les étapes.</li>
<li><strong>Chaque semaine</strong> : revue du pipeline (dossiers sans prochaine action, devis anciens, relances demandées).</li>
<li><strong>Chaque mois</strong> : tableau de bord avec la direction commerciale, trois actions correctives.</li>
<li><strong>Chaque trimestre</strong> : revue des canaux (coût d'acquisition, rendement), ajustement du plan de prospection.</li>
</ul>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Remplir le CRM après coup, de mémoire, ou pas du tout.</li>
<li>Ne pas renseigner la source et la preuve de la demande.</li>
<li>Laisser des devis « en cours » pendant des mois sans prochaine action.</li>
<li>Ne pas noter les motifs de perte.</li>
<li>Piloter uniquement le volume, sans indicateurs de qualité.</li>
</ul>
<blockquote><strong>À retenir :</strong> le CRM est la mémoire, l'agenda et la preuve de conformité du commercial. Le pipeline va de la demande reçue au gain ou à la perte, avec un motif. Les indicateurs clés (taux de transformation, panier moyen, cycle de vente, coût d'acquisition, rétractations, délai de premier contact, avis) se lisent ensemble et débouchent sur des actions correctives, sans jamais justifier la pression ou la vente de travaux inutiles.</blockquote>
`,
      },
      {
        title: "6.8 – Organiser sa semaine de commercial",
        content: `
<h3>Objectifs de la section</h3>
<ul>
<li>Répartir son temps entre prospection, rendez-vous, administration et suivi.</li>
<li>Prioriser les tâches selon leur impact.</li>
<li>Construire une semaine type réaliste.</li>
</ul>

<h3>1. Où va le temps d'un commercial ?</h3>
<p>Un commercial en travaux énergétiques partage son temps entre des activités très différentes : rendez-vous et visites techniques chez les clients, déplacements, rédaction des devis et des simulations, relances demandées, suivi des dossiers d'aides, relations avec les prescripteurs, salons et événements, coordination avec le planning et les équipes de pose, mise à jour du CRM. Sans organisation, les urgences (un client mécontent, un devis à refaire) dévorent le temps consacré au développement du portefeuille, et le pipeline se vide quelques mois plus tard.</p>

<h3>2. Prioriser : urgent et important</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th></th><th>Urgent</th><th>Non urgent</th></tr>
<tr><td><strong>Important</strong></td><td>Rappeler une demande reçue la veille ; répondre à un client en négociation ; traiter un problème de chantier signalé par un client.</td><td><strong>Développer les prescripteurs, préparer les portes ouvertes, demander des avis, analyser son tableau de bord.</strong> C'est la zone qui construit le chiffre d'affaires de demain : à planifier en priorité dans l'agenda.</td></tr>
<tr><td><strong>Peu important</strong></td><td>Certaines sollicitations internes, appels sans lien avec un dossier.</td><td>Tâches à regrouper, déléguer ou supprimer.</td></tr>
</table>

<h3>3. Les principes d'organisation</h3>
<ol>
<li><strong>Bloquer des créneaux fixes</strong> pour les tâches importantes non urgentes (par exemple, le mardi après-midi pour les prescripteurs).</li>
<li><strong>Regrouper les rendez-vous par secteur géographique</strong> (tournées) pour réduire les déplacements.</li>
<li><strong>Traiter les nouvelles demandes chaque matin</strong> : le délai de premier contact influence fortement la transformation.</li>
<li><strong>Préparer chaque rendez-vous</strong> (fiche de préparation, chapitre 5) et le compléter dans le CRM le jour même.</li>
<li><strong>Limiter le nombre de rendez-vous par jour</strong> à ce qui permet une découverte de qualité : une visite technique sérieuse chez un particulier dure souvent 1 h 30 à 2 heures.</li>
<li><strong>Prévoir une marge</strong> pour les imprévus (environ 15 à 20 % du temps).</li>
<li><strong>Respecter les horaires des clients</strong> : rendez-vous à des heures convenues, jamais de visite à l'improviste.</li>
</ol>

<h3>4. La semaine type de Karim</h3>
<p>Nadia et Karim construisent ensemble une semaine type (exemple, à adapter à la saison et à l'activité) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Jour</th><th>Matin</th><th>Après-midi</th></tr>
<tr><td>Lundi</td><td>8 h 30 – 9 h 30 : nouvelles demandes du week-end, rappels demandés. 9 h 30 – 10 h 30 : réunion d'équipe (planning, dossiers en cours). 10 h 30 – 12 h 30 : rédaction des devis de la semaine précédente.</td><td>Deux visites techniques sur le secteur ouest.</td></tr>
<tr><td>Mardi</td><td>Nouvelles demandes (30 min). Deux rendez-vous de présentation de devis.</td><td>Créneau prescripteurs : visite de deux agences de gestion locative, appel à un artisan partenaire, préparation d'un mémo.</td></tr>
<tr><td>Mercredi</td><td>Nouvelles demandes. Deux visites techniques sur le secteur sud.</td><td>Devis et simulations ; préparation des négociations de la fin de semaine.</td></tr>
<tr><td>Jeudi</td><td>Nouvelles demandes. Suivi des dossiers d'aides avec l'assistante administrative ; contrôle de satisfaction téléphonique des clients réceptionnés (exécution du contrat), proposition de parrainage, demande d'avis.</td><td>Deux rendez-vous de présentation ou de décision.</td></tr>
<tr><td>Vendredi</td><td>Nouvelles demandes. Revue hebdomadaire du pipeline dans le CRM (dossiers sans prochaine action, relances demandées).</td><td>Préparation de la semaine suivante ; une fois par mois : tableau de bord avec Nadia ; selon le calendrier : préparation d'un salon ou des portes ouvertes.</td></tr>
</table>
<p>Les week-ends de salon ou de portes ouvertes sont compensés selon les règles de l'entreprise et du droit du travail.</p>

<h3>5. Répartition indicative du temps</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Activité</th><th>Part indicative du temps</th></tr>
<tr><td>Rendez-vous clients (visites techniques, présentations, négociations)</td><td>40 à 45 %</td></tr>
<tr><td>Devis, simulations, préparation</td><td>15 à 20 %</td></tr>
<tr><td>Développement du portefeuille (prescripteurs, événements, avis, parrainage)</td><td>15 %</td></tr>
<tr><td>Suivi client (aides, chantier, satisfaction)</td><td>10 %</td></tr>
<tr><td>Déplacements, CRM, réunions</td><td>10 à 15 %</td></tr>
</table>
<p>Ces proportions sont des repères, pas des normes. Leur intérêt est de vérifier que le développement du portefeuille n'est pas sacrifié : un commercial dont le pipeline est plein aujourd'hui mais qui ne consacre aucun temps aux prescripteurs connaîtra un creux dans trois à six mois.</p>

<h3>6. Les outils d'organisation</h3>
<ul>
<li>Agenda partagé avec le planning de l'entreprise (visites, chantiers).</li>
<li>CRM avec tâches et rappels automatiques.</li>
<li>Itinéraires optimisés pour les tournées.</li>
<li>Modèles de documents (devis, synthèse du reste à charge, mémos prescripteurs).</li>
<li>Mallette ou tablette « preuves » à jour (attestations, références, fiches techniques).</li>
</ul>

<h3>Erreurs fréquentes</h3>
<ul>
<li>Remplir l'agenda de rendez-vous au point de ne plus avoir de temps pour les devis ni pour la prospection.</li>
<li>Rappeler les demandes « quand on a le temps ».</li>
<li>Traverser le département plusieurs fois par jour faute de tournées.</li>
<li>Abandonner les actions de développement dès que l'activité est forte.</li>
</ul>
<blockquote><strong>À retenir :</strong> une semaine efficace réserve chaque matin un temps aux nouvelles demandes, regroupe les rendez-vous par secteur, bloque des créneaux fixes pour le développement du portefeuille (prescripteurs, événements, avis), prévoit une revue hebdomadaire du pipeline et garde une marge pour les imprévus.</blockquote>
`,
      },
      {
        title: "6.9 – Quiz de fin de chapitre",
        content: `
<p>Répondez aux dix questions, puis consultez le corrigé. Une seule réponse est correcte par question.</p>

<h4>Question 1</h4>
<p>Quel texte a introduit l'interdiction de la prospection téléphonique des consommateurs pour des travaux d'économies d'énergie ?</p>
<ul>
<li>A. La loi Climat et résilience de 2021</li>
<li>B. La loi n° 2020-901 du 24 juillet 2020, codifiée à l'article L. 223-1 du code de la consommation</li>
<li>C. Le RGPD</li>
<li>D. Le décret tertiaire</li>
</ul>

<h4>Question 2</h4>
<p>Quelle est la seule exception prévue à cette interdiction ?</p>
<ul>
<li>A. Le consommateur inscrit sur une liste de prospects consentants</li>
<li>B. Les appels passés par un apporteur d'affaires</li>
<li>C. Les sollicitations intervenant dans le cadre de l'exécution d'un contrat en cours</li>
<li>D. Les appels passés le samedi</li>
</ul>

<h4>Question 3</h4>
<p>Depuis la loi n° 2025-594 du 30 juin 2025, la prospection des consommateurs pour des travaux de rénovation énergétique est également interdite par :</p>
<ul>
<li>A. affichage sur un stand de salon</li>
<li>B. SMS, courriel et réseaux sociaux</li>
<li>C. publication sur le site de l'entreprise</li>
<li>D. article dans la presse locale</li>
</ul>

<h4>Question 4</h4>
<p>Quel est le montant maximal de l'amende administrative encourue par une personne morale qui enfreint l'interdiction du démarchage téléphonique en rénovation énergétique ?</p>
<ul>
<li>A. 15 000 €</li>
<li>B. 75 000 €</li>
<li>C. 375 000 €</li>
<li>D. 1 000 000 €</li>
</ul>

<h4>Question 5</h4>
<p>Qu'est-il advenu de Bloctel le 11 août 2026 ?</p>
<ul>
<li>A. Bloctel est devenu obligatoire pour les entreprises de rénovation</li>
<li>B. Bloctel a été supprimé ; le démarchage téléphonique des consommateurs suppose désormais leur consentement préalable</li>
<li>C. Bloctel a été étendu aux entreprises</li>
<li>D. Rien, Bloctel fonctionne comme avant</li>
</ul>

<h4>Question 6</h4>
<p>Un client signe un contrat de travaux sur le stand de Thermia Rénov lors d'une foire, sans crédit. De quel droit de rétractation dispose-t-il ?</p>
<ul>
<li>A. 14 jours</li>
<li>B. 7 jours</li>
<li>C. Aucun, et le professionnel doit l'en informer de façon visible</li>
<li>D. 30 jours</li>
</ul>

<h4>Question 7</h4>
<p>Depuis le 1er janvier 2025, quels logements ne peuvent plus être proposés à la location dans le cadre d'un nouveau bail en métropole ?</p>
<ul>
<li>A. Les logements classés E</li>
<li>B. Les logements classés F</li>
<li>C. Les logements classés G</li>
<li>D. Tous les logements chauffés au fioul</li>
</ul>

<h4>Question 8</h4>
<p>Laquelle de ces pratiques est conforme ?</p>
<ul>
<li>A. Annoncer sur son site que l'entreprise est « partenaire officiel de France Rénov' »</li>
<li>B. Offrir un bon d'achat aux clients qui laissent un avis 5 étoiles</li>
<li>C. Récompenser un parrain après la réception des travaux de son filleul, le filleul ayant lui-même pris contact avec l'entreprise</li>
<li>D. Envoyer un message privé sur Facebook aux habitants d'un lotissement pour leur proposer une PAC</li>
</ul>

<h4>Question 9</h4>
<p>Karim a remis 80 devis et signé 28 ventes pour 420 000 € TTC. Quels sont son taux de transformation et son panier moyen ?</p>
<ul>
<li>A. 28 % et 15 000 €</li>
<li>B. 35 % et 15 000 €</li>
<li>C. 35 % et 5 250 €</li>
<li>D. 3,5 % et 14 000 €</li>
</ul>

<h4>Question 10</h4>
<p>Selon le référentiel de la CNIL sur la gestion commerciale, combien de temps peut-on conserver les données d'un prospect qui n'a pas donné suite ?</p>
<ul>
<li>A. Indéfiniment</li>
<li>B. 3 ans à compter de la collecte ou du dernier contact émanant du prospect</li>
<li>C. 10 ans</li>
<li>D. 6 mois</li>
</ul>

<h3>Corrigé et explications</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>B</td><td>La loi n° 2020-901 du 24 juillet 2020 a inséré cette interdiction à l'article L. 223-1 du code de la consommation.</td></tr>
<tr><td>2</td><td>C</td><td>Seule l'exécution d'un contrat en cours permet de solliciter le client. Un consentement « acheté » ou un apporteur d'affaires ne lèvent pas l'interdiction. Répondre à une demande que le client a lui-même formulée n'est pas de la prospection non sollicitée, à condition de pouvoir la prouver.</td></tr>
<tr><td>3</td><td>B</td><td>La loi contre toutes les fraudes aux aides publiques a étendu l'interdiction aux SMS, courriels et réseaux sociaux. La communication publique (site, salon, presse) reste possible si elle est loyale.</td></tr>
<tr><td>4</td><td>C</td><td>Jusqu'à 75 000 € pour une personne physique et 375 000 € pour une personne morale ; le contrat conclu à la suite d'une prospection illicite est en outre nul.</td></tr>
<tr><td>5</td><td>B</td><td>Le régime de l'opt-in remplace la liste d'opposition. Pour la rénovation énergétique, l'interdiction spécifique demeure, même avec consentement.</td></tr>
<tr><td>6</td><td>C</td><td>Sur une foire ou un salon, il n'y a pas de droit de rétractation (article L. 224-59 du code de la consommation), sauf règles propres au crédit affecté ; le professionnel doit l'annoncer par un affichage et dans le contrat.</td></tr>
<tr><td>7</td><td>C</td><td>Les logements classés G sont considérés comme non décents depuis le 1er janvier 2025 ; les F le seront en 2028, les E en 2034 (calendrier à vérifier, il fait l'objet de débats).</td></tr>
<tr><td>8</td><td>C</td><td>Le parrainage est licite si le filleul prend contact ou y consent et si la récompense est raisonnable. La fausse affiliation publique, l'avis rémunéré et le message privé de sollicitation sont interdits.</td></tr>
<tr><td>9</td><td>B</td><td>28 ÷ 80 = 35 % ; 420 000 ÷ 28 = 15 000 €.</td></tr>
<tr><td>10</td><td>B</td><td>La CNIL recommande une conservation de 3 ans maximum à compter de la collecte ou du dernier contact émanant du prospect.</td></tr>
</table>
<p><strong>Barème indicatif :</strong> 9 ou 10 bonnes réponses : notions maîtrisées ; 6 à 8 : relire les sections correspondant aux erreurs ; moins de 6 : reprendre le chapitre avant le cas pratique.</p>
`,
      },
      {
        title: "6.10 – Cas pratique : bâtir le plan de prospection de Karim pour l'année à venir",
        content: `
<h3>Consigne</h3>
<p>Nadia confie à Karim, conseiller commercial de <strong>Thermia Rénov</strong> (entreprise fictive), la construction de son plan de prospection pour l'année à venir. Tous les chiffres sont fictifs.</p>
<p><strong>Éléments de contexte :</strong></p>
<ul>
<li>Objectif annuel de Karim : 540 000 € TTC de chiffre d'affaires signé auprès des particuliers, plus la contribution à deux dossiers de copropriété.</li>
<li>Historique de Karim sur six mois : 118 demandes, 74 devis, 17 ventes, panier moyen 11 800 €, taux de rétractation 12 %, délai de premier contact 3,5 jours.</li>
<li>Objectifs de progrès fixés avec Nadia : taux de transformation devis → vente de 35 %, panier moyen de 15 000 € grâce aux bouquets de travaux lorsque l'étude les justifie, taux demande → devis de 60 %.</li>
<li>Canaux existants : site internet (formulaire), fiche Google Business Profile (4,4 sur 63 avis), un salon de l'habitat en septembre, deux artisans qui recommandent occasionnellement l'entreprise.</li>
<li>Un prestataire propose à Thermia Rénov « 30 rendez-vous qualifiés par mois chez des propriétaires intéressés par une PAC », obtenus par « appels de qualification ».</li>
<li>Un commercial d'une autre agence suggère à Karim d'envoyer des SMS aux visiteurs du salon de l'an dernier dont il a conservé les numéros, et de contacter sur Facebook les membres d'un groupe d'habitants d'un lotissement des années 1975.</li>
<li>Mme Lopez, cliente satisfaite (chauffe-eau thermodynamique posé le mois dernier), a dit à Karim que son syndic préparait une assemblée générale sur l'isolation de la toiture.</li>
</ul>
<p><strong>Travail demandé :</strong></p>
<ol>
<li>Calculez, par le calcul inversé, le nombre de ventes, de devis et de demandes nécessaires, puis le rythme hebdomadaire (45 semaines).</li>
<li>Analysez la conformité des trois propositions (prestataire, SMS, Facebook) et indiquez la décision à prendre.</li>
<li>Proposez un mix de canaux licites avec la part visée de demandes et les actions principales.</li>
<li>Indiquez comment exploiter la situation de Mme Lopez.</li>
<li>Définissez le tableau de bord de suivi (indicateurs, cibles, fréquence).</li>
<li>Proposez trois changements dans l'organisation hebdomadaire de Karim.</li>
</ol>

<h3>Corrigé détaillé</h3>
<h4>1. Calcul inversé</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Calcul</th><th>Résultat</th></tr>
<tr><td>Ventes</td><td>540 000 ÷ 15 000</td><td>36 ventes</td></tr>
<tr><td>Devis</td><td>36 ÷ 0,35</td><td>103 devis (arrondi au supérieur)</td></tr>
<tr><td>Demandes</td><td>103 ÷ 0,60</td><td>172 demandes (arrondi au supérieur)</td></tr>
<tr><td>Rythme hebdomadaire</td><td>172 ÷ 45</td><td>environ 4 demandes par semaine</td></tr>
</table>
<p><strong>Commentaire :</strong> avec les taux actuels de Karim (17 ventes pour 74 devis, soit environ 23 % ; 74 devis pour 118 demandes, soit environ 63 % ; panier moyen 11 800 €), il faudrait environ 46 ventes, 200 devis et plus de 300 demandes. L'amélioration de la transformation et du panier moyen (chapitres 4 et 5) est donc plus efficace que la seule recherche de volume, et elle est compatible avec un rythme réaliste de quatre demandes par semaine.</p>

<h4>2. Analyse de conformité des propositions</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Proposition</th><th>Analyse</th><th>Décision</th></tr>
<tr><td>Prestataire : 30 rendez-vous par mois via des « appels de qualification »</td><td>Il s'agit d'une prospection téléphonique de consommateurs pour des travaux d'économies d'énergie, interdite par l'article L. 223-1 du code de la consommation, quel que soit le nom donné aux appels. L'entreprise qui en bénéficie s'expose aux sanctions (jusqu'à 375 000 € pour une personne morale), à la nullité des contrats et à une atteinte grave à sa réputation.</td><td>Refus écrit, information de Nadia.</td></tr>
<tr><td>SMS aux visiteurs du salon de l'an dernier</td><td>Prospection par SMS de consommateurs pour des travaux de rénovation énergétique : interdite depuis la loi n° 2025-594. De plus, les numéros ont été collectés pour une autre finalité et leur conservation n'est peut-être pas conforme au RGPD.</td><td>Refus ; vérifier la conformité du fichier (finalité, durée de conservation) et supprimer les données qui n'ont plus de base légale.</td></tr>
<tr><td>Messages Facebook aux membres d'un groupe d'habitants</td><td>Prospection par réseaux sociaux de consommateurs : interdite. Elle serait en outre très mal perçue par les membres du groupe.</td><td>Refus. Alternative licite : publications sur la page de l'entreprise, publicité locale exacte, réunion d'information publique annoncée dans la presse locale.</td></tr>
</table>

<h4>3. Mix de canaux licites</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Canal</th><th>Part visée</th><th>Demandes / an</th><th>Actions principales</th></tr>
<tr><td>Site et référencement local</td><td>35 %</td><td>60</td><td>Pages « Remplacer une chaudière fioul », « Bailleurs : échéance 2028 », « Isolation des combles » ; formulaire avec consentement et créneau de rappel ; fiche Google Business Profile complétée, photos de chantiers récents.</td></tr>
<tr><td>Recommandations et parrainage</td><td>20 %</td><td>35</td><td>Règlement de parrainage simple ; proposition lors du contrôle de satisfaction à trois mois ; demande d'avis systématique à tous les clients (objectif : 100 avis dans l'année, réponse à chacun).</td></tr>
<tr><td>Prescripteurs</td><td>25 %</td><td>43</td><td>8 agences de gestion locative (mémo échéance 2028) ; 6 artisans complémentaires (recommandation réciproque) ; petit-déjeuner technique pour architectes ; 5 syndics.</td></tr>
<tr><td>Salons et portes ouvertes</td><td>15 %</td><td>26</td><td>Salon de septembre (rendez-vous seulement, pas de signature, fiche de contact avec consentement par finalité) ; portes ouvertes au printemps avec PAC en fonctionnement ; deux chantiers témoins avec accord des clients.</td></tr>
<tr><td>Publicité locale</td><td>5 %</td><td>8</td><td>Annonces géolocalisées et presse locale aux messages exacts (aucune mention de gratuité).</td></tr>
<tr><td><strong>Total</strong></td><td>100 %</td><td>172</td><td></td></tr>
</table>

<h4>4. Exploiter la situation de Mme Lopez</h4>
<ul>
<li>Remercier Mme Lopez et lui demander si elle accepte de transmettre au conseil syndical la plaquette de références copropriété de Thermia Rénov ; ne pas solliciter les autres copropriétaires.</li>
<li>Contacter le syndic (professionnel, donc dans un cadre B2B) pour proposer d'être consulté dans la mise en concurrence, avec un dossier complet (qualifications, assurances, références, délais).</li>
<li>Si l'entreprise est retenue pour présenter son offre, préparer l'intervention en assemblée générale (section 5.7).</li>
<li>Proposer à Mme Lopez le parrainage, et lui demander un avis sur sa propre installation, sans condition.</li>
</ul>

<h4>5. Tableau de bord de suivi</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Cible</th><th>Fréquence de revue</th></tr>
<tr><td>Demandes reçues, par canal</td><td>4 par semaine, répartition selon le mix</td><td>Hebdomadaire</td></tr>
<tr><td>Délai de premier contact</td><td>≤ 1 jour ouvré</td><td>Hebdomadaire</td></tr>
<tr><td>Taux demande → devis</td><td>60 %</td><td>Mensuelle</td></tr>
<tr><td>Taux de transformation devis → vente</td><td>35 %</td><td>Mensuelle</td></tr>
<tr><td>Panier moyen</td><td>15 000 € (sans vente de travaux non justifiés par l'étude)</td><td>Mensuelle</td></tr>
<tr><td>Remise moyenne accordée</td><td>≤ 3 %</td><td>Mensuelle</td></tr>
<tr><td>Taux de rétractation / annulation</td><td>≤ 4 %</td><td>Mensuelle</td></tr>
<tr><td>Avis Google : nombre et note</td><td>+ 40 avis, note ≥ 4,5</td><td>Mensuelle</td></tr>
<tr><td>Coût d'acquisition par canal</td><td>À établir sur le premier trimestre</td><td>Trimestrielle</td></tr>
<tr><td>Conformité : contacts sans source tracée</td><td>0</td><td>Mensuelle</td></tr>
</table>

<h4>6. Trois changements dans l'organisation hebdomadaire</h4>
<ol>
<li><strong>Créneau quotidien de 8 h 30 à 9 h 30</strong> consacré aux nouvelles demandes et aux rappels demandés, pour ramener le délai de premier contact à moins d'un jour.</li>
<li><strong>Demi-journée fixe « développement »</strong> le mardi après-midi : prescripteurs, préparation des événements, avis et parrainage.</li>
<li><strong>Revue du pipeline le vendredi matin</strong> : aucun devis sans prochaine action datée, motif de perte renseigné, préparation des négociations de la semaine suivante avec la fiche du chapitre 5.</li>
</ol>
<blockquote><strong>À retenir :</strong> un plan de prospection crédible part d'un objectif chiffré et des taux réels, privilégie l'amélioration de la transformation et du panier moyen, écarte sans hésiter les canaux interdits (appels, SMS, messages privés aux particuliers), mobilise un mix de canaux licites et traçables, et se pilote avec un tableau de bord qui associe volume, qualité et conformité.</blockquote>
`,
      },
    ],
  },
];
