import type { CourseChapter } from "../courseContent";

export const LRB_PARTIE4: CourseChapter[] = [
  {
    title: "Chapitre 7 – Registres de langue et communication professionnelle (C2 et C1)",
    description:
      "Compétences C2 et C1. Reconnaître et choisir le registre de langue adapté à une situation professionnelle, maîtriser les formules d'appel et de politesse, rédiger un courriel, un compte rendu et un courrier conformes aux usages et aux règles de la langue, prendre des notes et restituer oralement une information, communiquer au téléphone avec précision, connaître les repères factuels sur la féminisation des noms et l'écriture dite inclusive. Exemples sur le fil rouge fictif Ardoise & Plume, exercices d'application corrigés, quiz de dix questions et cas pratique corrigé.",
    sections: [
      {
        title: "7.1 – Identifier les registres de langue et choisir le bon",
        content: `<h3>Pourquoi le registre fait partie de la maîtrise de la langue</h3>
<p>La seconde compétence attestée par la Certification en langue française Le Robert consiste à <strong>s'exprimer de manière adéquate dans un contexte professionnel défini</strong> : choisir le registre de langue, sélectionner le vocabulaire, construire correctement ses phrases, afin de se faire comprendre et de communiquer efficacement. Une phrase peut être parfaitement orthographiée et pourtant mal choisie : « Ok, je vous renvoie le truc demain » ne contient aucune faute d'orthographe, mais elle n'a pas sa place dans un courriel adressé à un client ou à une directrice. À l'inverse, une phrase d'une solennité excessive (« Je me permets de vous faire tenir ci-après l'humble expression de ma gratitude ») crée une distance inutile et peut paraître ironique.</p>
<p>Le <strong>registre de langue</strong> (on dit aussi « niveau de langue ») désigne l'ensemble des choix de vocabulaire, de construction et de prononciation qu'un locuteur fait en fonction de la situation : à qui parle-t-il, dans quel cadre, par quel canal (oral ou écrit), avec quel enjeu ? Savoir passer d'un registre à l'autre n'est pas un luxe : c'est une compétence professionnelle que les recruteurs, les clients et les partenaires perçoivent immédiatement.</p>
<h3>Les trois registres de référence</h3>
<p>On distingue traditionnellement trois registres. Les frontières ne sont pas étanches, mais les repères suivants suffisent dans la très grande majorité des situations.</p>
<table>
<thead><tr><th>Registre</th><th>Situations typiques</th><th>Marques principales</th><th>Exemple</th></tr></thead>
<tbody>
<tr><td><strong>Familier</strong></td><td>Conversation entre proches, messages personnels, échanges très informels entre collègues</td><td>Vocabulaire relâché (boulot, bosser, truc), omission du « ne » de la négation, « ça », « on » à la place de « nous », phrases inachevées, élisions orales (« t'as », « j'sais pas »)</td><td>« On a pas fini le dossier, ça va être chaud. »</td></tr>
<tr><td><strong>Courant</strong></td><td>Échanges professionnels ordinaires, courriels internes et externes, réunions, accueil du public</td><td>Vocabulaire usuel et précis, négation complète, phrases construites, « cela » ou « ça » selon le canal, interrogation avec « est-ce que » ou par inversion</td><td>« Nous n'avons pas terminé le dossier ; le délai sera difficile à tenir. »</td></tr>
<tr><td><strong>Soutenu</strong></td><td>Courriers officiels, discours, écrits juridiques ou institutionnels, correspondance avec une autorité</td><td>Vocabulaire recherché, inversion du sujet, subjonctif imparfait parfois (surtout à l'écrit littéraire), tournures elliptiques, « ne » seul avec certains verbes</td><td>« Le dossier n'étant pas achevé, nous craignons de ne pouvoir respecter l'échéance. »</td></tr>
</tbody>
</table>
<p>En contexte professionnel, la règle de prudence est simple : <strong>le registre courant est la norme</strong>, le registre soutenu est réservé aux écrits formels et aux situations à fort enjeu, et le registre familier ne s'emploie qu'avec des interlocuteurs proches, à l'oral ou dans des messages informels, et jamais avec un client, un candidat, un financeur ou une administration.</p>
<h3>Les marqueurs à repérer</h3>
<p>Pour identifier rapidement le registre d'une phrase, observez quatre éléments.</p>
<ul>
<li><strong>Le vocabulaire</strong> : un même référent peut être désigné par des mots de registres différents. « Boulot » (familier), « travail » (courant), « labeur » ou « tâche » selon le sens (soutenu). « Bagnole », « voiture », « véhicule ». « Se planter », « se tromper », « commettre une erreur ».</li>
<li><strong>La négation</strong> : l'omission du « ne » (« Je sais pas ») est la marque familière la plus fréquente. À l'écrit professionnel, la négation est toujours complète : « Je ne sais pas ». Avec les verbes <em>savoir, pouvoir, oser, cesser</em>, le « ne » employé seul (« Je ne saurais vous dire », « Il ne cesse de répéter ») relève du registre soutenu.</li>
<li><strong>L'interrogation</strong> : « Vous venez ? » (intonation seule, oral courant ou familier), « Est-ce que vous venez ? » (courant), « Venez-vous ? » (soutenu, ou courant à l'écrit). « Vous venez quand ? » est familier ; « Quand venez-vous ? » est la forme écrite attendue.</li>
<li><strong>Les pronoms et démonstratifs</strong> : « on » à la place de « nous » est familier ou oral (« On vous rappelle demain ») ; à l'écrit professionnel, préférez « nous ». « Ça » est courant à l'oral et familier à l'écrit ; « cela » convient à l'écrit.</li>
</ul>
<h3>Tableau d'équivalences utiles</h3>
<table>
<thead><tr><th>Familier</th><th>Courant</th><th>Soutenu ou formel</th></tr></thead>
<tbody>
<tr><td>bosser</td><td>travailler</td><td>œuvrer, exercer</td></tr>
<tr><td>un truc, un machin</td><td>une chose, un objet, un document (selon le cas)</td><td>un élément, une pièce</td></tr>
<tr><td>piger</td><td>comprendre</td><td>saisir, appréhender</td></tr>
<tr><td>filer un coup de main</td><td>aider</td><td>apporter son concours</td></tr>
<tr><td>c'est super</td><td>c'est très bien</td><td>c'est remarquable</td></tr>
<tr><td>pas de souci</td><td>bien sûr, volontiers, entendu</td><td>je vous en prie, avec plaisir</td></tr>
<tr><td>je vous recontacte asap</td><td>je vous recontacte dès que possible</td><td>je ne manquerai pas de revenir vers vous dans les meilleurs délais (voir 7.2 sur « revenir vers »)</td></tr>
<tr><td>il est vénère</td><td>il est mécontent</td><td>il manifeste son mécontentement</td></tr>
<tr><td>checker</td><td>vérifier, contrôler</td><td>s'assurer de</td></tr>
</tbody>
</table>
<blockquote><strong>Point d'attention</strong> – Le registre soutenu n'est pas synonyme de « plus correct ». Une phrase courante peut être irréprochable, et une phrase qui se veut soutenue peut contenir des fautes graves. « Je vous saurais gré de bien vouloir m'adresser le document » est soutenu et correct ; « Je vous serais gré de bien vouloir m'adresser le document » est une faute fréquente : la locution est <em>savoir gré</em>, donc on écrit <strong>saurais</strong>, conditionnel du verbe <em>savoir</em>.</blockquote>
<h3>Le mélange des registres : une erreur fréquente</h3>
<p>L'erreur la plus courante n'est pas l'emploi d'un registre inadapté, mais le <strong>mélange</strong> de registres dans un même écrit : une formule d'appel très solennelle suivie d'un corps de message relâché, ou l'inverse. Exemple à éviter : « Madame la Directrice, suite à notre échange, je vous envoie le truc pour la compta. Bien à vous. » La formule d'appel est formelle, mais « suite à » (tour critiqué, voir 7.2), « le truc » et « la compta » (abréviation familière) relèvent d'un autre niveau. Version homogène : « Madame la Directrice, comme suite à notre échange, je vous adresse le tableau de suivi destiné au service comptable. Je vous prie d'agréer, Madame la Directrice, l'expression de mes salutations distinguées. »</p>
<h3>Oral et écrit : deux exigences différentes</h3>
<p>L'oral tolère des constructions que l'écrit refuse. À l'oral, « Le client, il a appelé ce matin » (reprise du sujet par un pronom, dite dislocation) passe inaperçu ; à l'écrit, on écrit « Le client a appelé ce matin ». De même, « Je sais pas si il vient » devient à l'écrit « Je ne sais pas s'il vient » : le <em>si</em> s'élide devant <em>il</em> et <em>ils</em> (et seulement devant ces deux pronoms : on écrit « si elle vient », « si on vient »).</p>
<h3>Exercice d'application</h3>
<p>Transposez chaque phrase dans un registre courant adapté à un écrit professionnel.</p>
<ol>
<li>« On a reçu ton mail, on regarde ça et on te dit. »</li>
<li>« Le devis, il est pas encore validé. »</li>
<li>« Vous pouvez me filer le numéro de la facture ? »</li>
<li>« C'est bon pour moi, pas de souci. »</li>
<li>« J'sais pas si il pourra venir à la réunion. »</li>
<li>« La réunion, c'est quand ? »</li>
</ol>
<p><strong>Corrigé proposé</strong> (d'autres formulations sont possibles) :</p>
<ol>
<li>« Nous avons bien reçu votre courriel ; nous l'étudions et nous vous répondrons rapidement. » (« on » remplacé par « nous », « mail » par « courriel », tutoiement abandonné si la relation l'exige).</li>
<li>« Le devis n'est pas encore validé. » (suppression de la reprise par « il » et négation complète).</li>
<li>« Pourriez-vous me communiquer le numéro de la facture ? » (inversion du sujet, conditionnel de politesse, verbe précis).</li>
<li>« Cela me convient parfaitement. » ou « C'est entendu. »</li>
<li>« Je ne sais pas s'il pourra assister à la réunion. » (négation complète, élision de « si » devant « il », « assister à » plus précis que « venir à »).</li>
<li>« Quand la réunion aura-t-elle lieu ? » ou « À quelle date la réunion est-elle prévue ? » (interrogation par inversion complexe : le sujet nominal est repris par le pronom <em>elle</em>, avec un <em>t</em> euphonique entre deux voyelles).</li>
</ol>`,
      },
      {
        title: "7.2 – Formules d'appel, de politesse et tournures à surveiller",
        content: `<h3>La formule d'appel</h3>
<p>La formule d'appel ouvre le courrier ou le courriel. Elle doit être adaptée au destinataire et reprise à l'identique dans la formule de politesse finale d'une lettre.</p>
<table>
<thead><tr><th>Destinataire</th><th>Formule d'appel</th><th>Remarque</th></tr></thead>
<tbody>
<tr><td>Personne inconnue, genre inconnu</td><td>Madame, Monsieur,</td><td>Formule neutre, toujours suivie d'une virgule.</td></tr>
<tr><td>Femme dont on connaît le nom</td><td>Madame,</td><td>Dans une lettre, on n'ajoute pas le nom de famille : on n'écrit pas « Madame Delorme, ».</td></tr>
<tr><td>Femme exerçant une fonction identifiée</td><td>Madame la Directrice,</td><td>La fonction prend une majuscule dans l'appel.</td></tr>
<tr><td>Avocat, notaire, commissaire de justice</td><td>Maître,</td><td>Le titre s'emploie pour un homme comme pour une femme.</td></tr>
<tr><td>Médecin</td><td>Docteur, ou Madame, Monsieur,</td><td>« Docteur » s'emploie sans le nom.</td></tr>
<tr><td>Interlocuteur connu, relation suivie</td><td>Chère Madame, Cher Monsieur,</td><td>Seulement lorsqu'une relation existe déjà. On n'écrit pas « Cher Monsieur Martin » dans une lettre formelle.</td></tr>
<tr><td>Collègue, courriel interne</td><td>Bonjour Karim, Bonjour à toutes et à tous,</td><td>Registre courant, adapté au courriel.</td></tr>
</tbody>
</table>
<p>Dans un courriel, l'usage admet « Bonjour Madame, » ou « Bonjour Madame Delorme, », moins formels que l'appel d'une lettre. Les mots <em>Madame</em> et <em>Monsieur</em> s'écrivent en toutes lettres dans l'appel : on n'y emploie jamais les abréviations « Mme » ou « M. ». Rappelons que l'abréviation de <em>Monsieur</em> est <strong>M.</strong> et non « Mr », qui est l'abréviation anglaise de <em>Mister</em> ; celle de <em>Madame</em> est <strong>Mme</strong>, sans point, car elle se termine par la dernière lettre du mot. Le pluriel s'abrège en <strong>MM.</strong> (Messieurs) et <strong>Mmes</strong> (Mesdames).</p>
<h3>La formule de politesse finale d'une lettre</h3>
<p>Une lettre se termine par une formule complète, qui reprend la formule d'appel entre deux virgules.</p>
<ul>
<li>« Je vous prie d'agréer, Madame, l'expression de mes salutations distinguées. » (formule neutre, la plus sûre)</li>
<li>« Veuillez agréer, Madame la Directrice, l'expression de ma considération distinguée. »</li>
<li>« Je vous prie de recevoir, Madame, Monsieur, mes salutations distinguées. »</li>
<li>« Recevez, Maître, l'assurance de ma considération. »</li>
<li>« Je vous prie de croire, Monsieur, à l'expression de mes sentiments respectueux. » (destinataire auquel on veut marquer une déférence particulière)</li>
</ul>
<p>Attention aux constructions : on <em>agrée</em> l'expression de quelque chose, on <em>reçoit</em> des salutations, on <em>croit à</em> l'expression de sentiments. Les combinaisons hybrides (« Je vous prie de croire mes salutations ») sont incorrectes.</p>
<h3>Le piège du participe ou du gérondif en tête de formule</h3>
<p>Une formule finale commence souvent par une proposition participiale ou par un gérondif : « Dans l'attente de votre réponse… », « En vous remerciant par avance… ». Règle : <strong>le sujet implicite du gérondif ou du participe doit être le sujet du verbe principal</strong>.</p>
<ul>
<li>Correct : « <strong>En vous remerciant</strong> par avance, <strong>je</strong> vous prie d'agréer, Madame, l'expression de mes salutations distinguées. » (C'est « je » qui remercie et « je » qui prie.)</li>
<li>Incorrect : « En vous remerciant par avance, veuillez agréer, Madame, l'expression de mes salutations distinguées. » (Le sujet de « veuillez » est « vous » : la phrase signifie littéralement que c'est le destinataire qui se remercie lui-même.)</li>
<li>Incorrect : « En espérant une réponse favorable, recevez, Monsieur, mes salutations. » Correction : « Dans l'espoir d'une réponse favorable, je vous prie de recevoir, Monsieur, mes salutations distinguées. »</li>
</ul>
<h3>Les formules de fin de courriel</h3>
<p>Le courriel admet des formules plus brèves, qui ne reprennent pas l'appel :</p>
<table>
<thead><tr><th>Formule</th><th>Usage</th></tr></thead>
<tbody>
<tr><td>Cordialement, / Bien cordialement,</td><td>La plus répandue, neutre et professionnelle.</td></tr>
<tr><td>Bien à vous,</td><td>Un peu plus personnelle, adaptée à une relation établie.</td></tr>
<tr><td>Sincères salutations, / Salutations distinguées,</td><td>Plus formelle, adaptée à un premier contact ou à une administration.</td></tr>
<tr><td>Belle journée, / Bonne fin de semaine,</td><td>Chaleureuse, à réserver aux interlocuteurs connus.</td></tr>
<tr><td>Cdt, Bàv</td><td>Abréviations à proscrire : elles donnent une impression de négligence.</td></tr>
</tbody>
</table>
<h3>Tournures à surveiller dans les écrits professionnels</h3>
<p>Certaines tournures très répandues sont critiquées par l'Académie française ou relèvent d'un usage relâché. Sans être toujours de véritables fautes, elles sont à éviter dans un écrit soigné.</p>
<table>
<thead><tr><th>Tournure critiquée</th><th>Pourquoi</th><th>Formulation recommandée</th></tr></thead>
<tbody>
<tr><td>Suite à votre appel</td><td>Tour d'origine commerciale, critiqué par l'Académie française.</td><td>À la suite de votre appel ; comme suite à votre appel ; après votre appel</td></tr>
<tr><td>Je reviens vers vous</td><td>Emploi déconseillé par l'Académie française dans sa rubrique « Dire, ne pas dire ».</td><td>Je vous recontacte ; je vous apporte une réponse ; je reprends contact avec vous</td></tr>
<tr><td>Je vous serais gré</td><td>Confusion entre <em>être</em> et <em>savoir</em> : la locution est <em>savoir gré</em>.</td><td>Je vous saurais gré de…</td></tr>
<tr><td>Au jour d'aujourd'hui</td><td>Pléonasme : <em>aujourd'hui</em> contient déjà l'idée de « jour ».</td><td>Aujourd'hui ; à ce jour ; actuellement</td></tr>
<tr><td>Je me permets de vous recontacter à nouveau</td><td>Pléonasme : le préfixe <em>re-</em> exprime déjà la répétition.</td><td>Je me permets de vous recontacter ; je me permets de vous relancer</td></tr>
<tr><td>Pallier à un problème</td><td><em>Pallier</em> est transitif direct.</td><td>Pallier un problème ; remédier à un problème</td></tr>
<tr><td>Se rappeler de quelque chose</td><td><em>Se rappeler</em> est transitif direct (on se rappelle quelque chose), à la différence de <em>se souvenir de</em>.</td><td>Je me rappelle cette réunion ; je me souviens de cette réunion</td></tr>
<tr><td>Malgré que</td><td>Locution condamnée par l'usage soigné.</td><td>Bien que (+ subjonctif) ; malgré (+ nom)</td></tr>
</tbody>
</table>
<blockquote><strong>Bonne pratique</strong> – Constituez votre propre liste de « formules sûres » : une formule d'appel, deux formules de fin de lettre, deux formules de fin de courriel, trois phrases d'introduction et trois phrases de conclusion. Utilisées et relues une fois pour toutes, elles éliminent une source importante d'erreurs.</blockquote>
<h3>« Ci-joint », « ci-inclus », « ci-annexé »</h3>
<p>Ces adjectifs posent régulièrement problème. Les règles sont les suivantes :</p>
<ul>
<li>Ils sont <strong>invariables en tête de phrase</strong> et lorsqu'ils précèdent un nom sans déterminant : « Ci-joint les factures demandées. » ; « Vous trouverez ci-joint copie du contrat. »</li>
<li>Ils <strong>s'accordent</strong> lorsqu'ils suivent le nom ou sont attributs : « les pièces ci-jointes » ; « La facture est ci-jointe. »</li>
<li>Placés devant un nom précédé d'un déterminant, l'accord est facultatif : « Vous trouverez ci-joint la facture » et « Vous trouverez ci-jointe la facture » sont admis ; la forme invariable est la plus courante.</li>
</ul>
<h3>Exercice d'application</h3>
<p>Corrigez les phrases si nécessaire.</p>
<ol>
<li>« Suite à notre entretien, je vous serais gré de m'adresser votre devis. »</li>
<li>« En attendant votre réponse, veuillez agréer, Monsieur, mes salutations distinguées. »</li>
<li>« Veuillez trouver les pièces ci-jointes. »</li>
<li>« Bonjour Mr Lefèvre, »</li>
</ol>
<p><strong>Corrigé</strong> : 1. « À la suite de notre entretien, je vous saurais gré de m'adresser votre devis. » 2. « Dans l'attente de votre réponse, je vous prie d'agréer, Monsieur, l'expression de mes salutations distinguées. » (le gérondif « en attendant » avait pour sujet implicite « je », alors que le sujet de « veuillez » est « vous » ; de plus, on agrée « l'expression » des salutations). 3. Phrase correcte : <em>ci-jointes</em> suit le nom et s'accorde avec <em>pièces</em>. 4. « Bonjour Monsieur Lefèvre, » : dans l'appel, <em>Monsieur</em> s'écrit en toutes lettres, et l'abréviation française est <em>M.</em>, jamais « Mr ».</p>`,
      },
      {
        title: "7.3 – Rédiger un courriel professionnel clair et correct",
        content: `<h3>Le courriel : un écrit à part entière</h3>
<p>Le courriel (terme recommandé en français pour désigner l'<em>e-mail</em> ; on rencontre aussi « message électronique » et, dans un usage familier, « mail ») est devenu l'écrit professionnel le plus fréquent. Sa rapidité incite à la négligence : fautes de frappe, accords oubliés, formules familières, destinataires mal choisis. Or un courriel engage son auteur et l'entreprise qu'il représente ; il peut être transféré, archivé, produit comme preuve. Il mérite donc la même attention qu'un courrier.</p>
<h3>Les éléments d'un courriel bien construit</h3>
<table>
<thead><tr><th>Élément</th><th>Règle</th><th>Exemple</th></tr></thead>
<tbody>
<tr><td><strong>Destinataires</strong></td><td>« À » : personnes qui doivent agir ou répondre ; « Cc » (copie) : personnes informées ; « Cci » (copie cachée) : destinataires invisibles des autres, utile pour un envoi groupé à des personnes qui ne se connaissent pas.</td><td>À : Karim ; Cc : Mme Delorme</td></tr>
<tr><td><strong>Objet</strong></td><td>Court, informatif, sans point final ; il annonce le contenu et, le cas échéant, l'action attendue.</td><td>Objet : Devis n° 2026-118 – validation attendue avant le 27 novembre</td></tr>
<tr><td><strong>Appel</strong></td><td>Adapté au destinataire, suivi d'une virgule ; le message commence à la ligne par une majuscule.</td><td>Bonjour Madame,</td></tr>
<tr><td><strong>Introduction</strong></td><td>Une phrase qui situe le message : réponse, demande, information.</td><td>Je vous remercie de votre demande du 18 novembre.</td></tr>
<tr><td><strong>Corps</strong></td><td>Un paragraphe par idée ; les informations essentielles en premier ; listes à puces pour les éléments énumérés.</td><td>Vous trouverez ci-joint le devis détaillé…</td></tr>
<tr><td><strong>Conclusion</strong></td><td>Action attendue, délai, proposition d'aide.</td><td>Je reste à votre disposition pour tout renseignement complémentaire.</td></tr>
<tr><td><strong>Formule finale et signature</strong></td><td>Formule brève, prénom et nom, fonction, entreprise, coordonnées.</td><td>Cordialement,<br>Inès [nom], assistante de direction – Ardoise &amp; Plume</td></tr>
</tbody>
</table>
<h3>Dix règles de rédaction</h3>
<ol>
<li><strong>Un courriel, un sujet.</strong> Si deux sujets distincts doivent être traités par des personnes différentes, envoyez deux messages.</li>
<li><strong>L'essentiel d'abord.</strong> Le destinataire doit comprendre dès les deux premières lignes ce que vous attendez de lui.</li>
<li><strong>Des phrases courtes.</strong> Une phrase d'une ligne et demie est plus sûre qu'une phrase de quatre lignes, où les accords et la ponctuation se perdent.</li>
<li><strong>Pas de capitales pour insister.</strong> Un texte écrit en capitales est perçu comme crié ; utilisez le gras avec modération.</li>
<li><strong>Pas d'abréviations de messagerie</strong> (« stp », « svp », « pk », « dsl ») ni d'émoticônes dans un écrit externe.</li>
<li><strong>Annoncez les pièces jointes</strong> et vérifiez qu'elles sont bien jointes avant l'envoi.</li>
<li><strong>Datez précisément</strong> : « jeudi 26 novembre » plutôt que « jeudi prochain », ambigu.</li>
<li><strong>Relisez à voix basse</strong> avant d'envoyer : l'oreille repère les mots oubliés et les répétitions.</li>
<li><strong>Vérifiez les accords « à distance »</strong> : sujet éloigné du verbe, participe passé avec un COD placé avant.</li>
<li><strong>Répondez à tous seulement si tous sont concernés.</strong></li>
</ol>
<h3>Fautes typiques des courriels et corrections</h3>
<table>
<thead><tr><th>Version fautive</th><th>Version corrigée</th><th>Règle</th></tr></thead>
<tbody>
<tr><td>Je vous envoie les documents que vous m'avez demandé.</td><td>Je vous envoie les documents que vous m'avez demand<strong>és</strong>.</td><td>Participe passé avec <em>avoir</em> : accord avec le COD <em>que</em> (mis pour <em>documents</em>) placé avant le verbe.</td></tr>
<tr><td>Je vous joint le planning.</td><td>Je vous join<strong>s</strong> le planning.</td><td>Présent de l'indicatif, 1re personne du singulier : <em>je joins</em>.</td></tr>
<tr><td>Je vous remercie de me faire parvenir vos disponibilités au plus vite possible.</td><td>Je vous remercie de me faire parvenir vos disponibilités le plus vite possible (ou au plus vite).</td><td>Croisement fautif de deux locutions : <em>au plus vite</em> et <em>le plus vite possible</em>.</td></tr>
<tr><td>Comme convenu, voici ci-joint le compte-rendu.</td><td>Comme convenu, voici le compte rendu.</td><td><em>Compte rendu</em> s'écrit sans trait d'union ; « voici ci-joint » est redondant.</td></tr>
<tr><td>Je vous prie de m'excuser pour ce retard, du à un problème technique.</td><td>… ce retard, dû à un problème technique.</td><td>Le participe passé de <em>devoir</em> prend un accent circonflexe au masculin singulier : <em>dû</em> (mais <em>due, dus, dues</em>).</td></tr>
<tr><td>Pouvez-vous me confirmer si vous serez présent ?</td><td>Pouvez-vous me confirmer votre présence ? / Pouvez-vous me dire si vous serez présent ?</td><td><em>Confirmer</em> se construit avec un COD ou avec <em>que</em> ; « confirmer si » est critiqué dans l'usage soigné.</td></tr>
<tr><td>Les éléments que je vous ai envoyé hier.</td><td>Les éléments que je vous ai envoy<strong>és</strong> hier.</td><td>Même règle que ci-dessus : le COD <em>que</em> (mis pour <em>éléments</em>, masculin pluriel) est placé avant.</td></tr>
</tbody>
</table>
<h3>Exemple commenté – Ardoise &amp; Plume (entreprise fictive)</h3>
<blockquote><strong>Fil rouge – Ardoise &amp; Plume (entreprise fictive)</strong> – Karim, conseiller commercial, doit confirmer à une cliente, Mme Bernier, la date d'un atelier d'écriture professionnelle organisé pour son équipe. Premier jet de Karim : « Bonjour, suite à notre conversation je vous confirme l'atelier le 3/12. Les supports vous seront envoyé la veille. N'hésitez pas si vous avez des questions. Cdt Karim ». Inès, assistante de direction, l'aide à reprendre le message. <em>L'entreprise et les personnages sont fictifs.</em></blockquote>
<p><strong>Version reprise :</strong></p>
<p>Objet : Atelier d'écriture professionnelle – confirmation du jeudi 3 décembre 2026</p>
<p>Bonjour Madame,</p>
<p>Comme suite à notre conversation téléphonique de ce matin, je vous confirme que l'atelier d'écriture professionnelle destiné à votre équipe aura lieu le jeudi 3 décembre 2026, de 9 h à 12 h 30, dans vos locaux.</p>
<p>Les supports vous seront envoyés la veille par courriel, afin que vous puissiez les imprimer si vous le souhaitez.</p>
<p>Je reste à votre disposition pour toute question.</p>
<p>Cordialement,</p>
<p>Karim [nom]<br>Conseiller commercial – Ardoise &amp; Plume</p>
<p><strong>Ce qui a changé :</strong> l'objet est explicite ; l'appel « Bonjour Madame » est plus respectueux qu'un simple « Bonjour » ; « suite à » est remplacé par « comme suite à » ; la date est écrite avec le jour de la semaine et le mois en lettres, ce qui évite toute ambiguïté ; le participe passé <em>envoyés</em> s'accorde avec le sujet <em>supports</em> (forme passive avec <em>être</em>) ; les heures sont écrites selon l'usage français (« 9 h », « 12 h 30 », avec une espace de part et d'autre du symbole <em>h</em>) ; l'abréviation « Cdt » a disparu au profit d'une formule complète ; la signature indique la fonction et l'entreprise.</p>
<h3>Le courriel de relance</h3>
<p>Relancer sans agresser est un exercice délicat. Trois principes : rappeler le contexte (date et objet du premier message), formuler la demande avec une échéance, proposer une aide. Exemple : « Je me permets de vous relancer au sujet de mon message du 12 novembre concernant la validation du devis n° 2026-118. Afin de pouvoir réserver la date de l'atelier, pourriez-vous me faire part de votre décision d'ici au vendredi 27 novembre ? Je me tiens à votre disposition si vous souhaitez modifier certains éléments. » Remarquez « d'ici au vendredi » : la construction classique est <em>d'ici à</em>, mais <em>d'ici vendredi</em> est aujourd'hui admis dans l'usage courant.</p>
<h3>Le courriel de réponse à une réclamation</h3>
<p>Face à un client mécontent, le courriel doit accuser réception, reconnaître le désagrément sans polémique, exposer les faits, annoncer la solution et le délai. Les formules utiles : « Je vous remercie de nous avoir fait part de… », « Nous regrettons le désagrément occasionné… », « Après vérification, il apparaît que… », « Nous vous proposons… », « Vous recevrez… au plus tard le… ». On évite de rejeter la faute sur un collègue ou un prestataire nommément et l'on n'emploie pas d'ironie. Attention : on présente ses excuses ou l'on prie quelqu'un de nous excuser ; la formule « Je m'excuse », très répandue, est critiquée par les puristes au motif que l'on ne peut pas s'excuser soi-même ; dans un écrit soigné, préférez « Je vous prie de m'excuser » ou « Veuillez nous excuser ».</p>
<h3>Exercice d'application</h3>
<p>Repérez et corrigez les cinq fautes du message suivant : « Bonjour à tous, je vous rappel que la réunion d'équipe se tiendra Mardi 24 novembre à 14h. Les comptes-rendus des dernières réunions sont joint à ce message. Merci de venir avec vos remarques. Bien à vous. »</p>
<p><strong>Corrigé :</strong> 1. « je vous <strong>rappelle</strong> » (verbe <em>rappeler</em>, présent, 1re personne : deux <em>l</em> devant un <em>e</em> muet ; « rappel » est le nom) ; 2. « <strong>mardi</strong> » (les noms de jours s'écrivent avec une minuscule) ; 3. « <strong>14 h</strong> » (espace entre le nombre et le symbole) ; 4. « Les <strong>comptes rendus</strong> » (sans trait d'union ; les deux mots prennent la marque du pluriel) ; 5. « sont <strong>joints</strong> » (le participe employé comme adjectif attribut s'accorde avec le sujet <em>comptes rendus</em>). La formule « Bien à vous » est de préférence suivie d'une virgule puis de la signature, plutôt que d'un point.</p>`,
      },
      {
        title: "7.4 – Rédiger un compte rendu fidèle et utile",
        content: `<h3>À quoi sert un compte rendu ?</h3>
<p>Le compte rendu (pluriel : <em>comptes rendus</em>, sans trait d'union) rapporte de manière <strong>fidèle, objective et synthétique</strong> ce qui a été dit, décidé ou constaté lors d'une réunion, d'un entretien, d'une visite ou d'une activité. Il permet à ceux qui étaient présents de garder une trace commune et à ceux qui étaient absents de connaître les décisions. Il ne faut pas le confondre avec le <strong>procès-verbal</strong> (avec trait d'union ; pluriel <em>procès-verbaux</em>), document plus formel qui consigne officiellement les débats et les votes d'une instance (assemblée générale, conseil d'administration, comité), ni avec le <strong>rapport</strong>, qui analyse une situation et formule des propositions de son auteur.</p>
<h3>La structure type d'un compte rendu de réunion</h3>
<table>
<thead><tr><th>Partie</th><th>Contenu</th></tr></thead>
<tbody>
<tr><td>En-tête</td><td>Nom de l'entreprise ou du service ; intitulé (« Compte rendu de la réunion d'équipe ») ; date, horaires et lieu ; rédacteur.</td></tr>
<tr><td>Participants</td><td>Présents ; absents excusés ; destinataires de la diffusion.</td></tr>
<tr><td>Ordre du jour</td><td>Rappel des points prévus, numérotés.</td></tr>
<tr><td>Corps</td><td>Pour chaque point : exposé synthétique des échanges, positions exprimées, décisions prises.</td></tr>
<tr><td>Relevé des décisions et actions</td><td>Tableau « action – responsable – échéance ».</td></tr>
<tr><td>Prochaine réunion</td><td>Date, lieu, points déjà prévus.</td></tr>
</tbody>
</table>
<h3>Les qualités attendues</h3>
<ul>
<li><strong>Fidélité</strong> : le rédacteur ne déforme pas les propos, n'ajoute pas d'informations et n'en retranche pas d'essentielles.</li>
<li><strong>Objectivité</strong> : il n'exprime pas son opinion personnelle ; on proscrit les jugements (« une proposition absurde ») et les adverbes d'appréciation (« heureusement »).</li>
<li><strong>Concision</strong> : on ne retranscrit pas les échanges mot pour mot ; on regroupe les interventions par thème.</li>
<li><strong>Clarté</strong> : un paragraphe par point de l'ordre du jour, des intertitres, des listes.</li>
</ul>
<h3>Le choix des temps</h3>
<p>Deux options sont possibles ; l'essentiel est de <strong>s'y tenir</strong> d'un bout à l'autre du document.</p>
<ul>
<li><strong>Le présent</strong>, qui rend le compte rendu vivant : « Mme Delorme ouvre la séance et rappelle l'ordre du jour. »</li>
<li><strong>Le passé composé</strong>, plus distancié : « Mme Delorme a ouvert la séance et a rappelé l'ordre du jour. »</li>
</ul>
<p>Le choix du temps principal commande la <strong>concordance des temps</strong> dans les propositions subordonnées au discours indirect.</p>
<h3>Du discours direct au discours indirect</h3>
<p>Un compte rendu rapporte les propos au discours indirect. La transposition modifie les pronoms, les temps et les indicateurs de temps.</p>
<table>
<thead><tr><th>Propos tenus (discours direct)</th><th>Compte rendu au présent</th><th>Compte rendu au passé composé</th></tr></thead>
<tbody>
<tr><td>« Je validerai le budget lundi. »</td><td>Mme Delorme indique qu'elle validera le budget lundi.</td><td>Mme Delorme a indiqué qu'elle validerait le budget le lundi suivant.</td></tr>
<tr><td>« Nous avons reçu trois réclamations. »</td><td>Karim précise que le service a reçu trois réclamations.</td><td>Karim a précisé que le service avait reçu trois réclamations.</td></tr>
<tr><td>« Il faut que chacun relise ses devis. »</td><td>La directrice demande que chacun relise ses devis.</td><td>La directrice a demandé que chacun relise ses devis.</td></tr>
<tr><td>« Êtes-vous d'accord ? »</td><td>Elle demande aux participants s'ils sont d'accord.</td><td>Elle a demandé aux participants s'ils étaient d'accord.</td></tr>
</tbody>
</table>
<p>Lorsque le verbe introducteur est au passé, le futur devient conditionnel présent (<em>validera</em> → <em>validerait</em>), le passé composé devient plus-que-parfait (<em>avons reçu</em> → <em>avait reçu</em>), le présent devient imparfait (<em>sont</em> → <em>étaient</em>) ; « demain » devient « le lendemain » et « lundi » devient « le lundi suivant ». Le subjonctif présent se maintient dans l'usage courant (« a demandé que chacun relise ») ; le subjonctif imparfait (« relût ») relève de la langue littéraire.</p>
<h3>Choisir des verbes introducteurs précis</h3>
<p>Le verbe « dire » répété appauvrit le compte rendu et ne rend pas compte de la nature de l'intervention. Choisissez le verbe qui correspond à l'intention de la personne.</p>
<table>
<thead><tr><th>Intention</th><th>Verbes introducteurs</th></tr></thead>
<tbody>
<tr><td>Informer</td><td>indiquer, préciser, signaler, annoncer, rappeler, informer que</td></tr>
<tr><td>Insister</td><td>souligner, insister sur, mettre l'accent sur</td></tr>
<tr><td>Proposer</td><td>proposer, suggérer, recommander</td></tr>
<tr><td>S'opposer</td><td>objecter, contester, s'opposer à, émettre des réserves sur</td></tr>
<tr><td>Accepter</td><td>approuver, accepter, se rallier à, donner son accord à</td></tr>
<tr><td>Interroger</td><td>demander, s'interroger sur, se demander si</td></tr>
<tr><td>Décider</td><td>décider, arrêter, retenir, valider</td></tr>
</tbody>
</table>
<blockquote><strong>Point d'attention</strong> – Certains verbes introducteurs ne se construisent pas comme on le croit. On <em>informe quelqu'un de quelque chose</em> ou on <em>informe quelqu'un que…</em> ; on <em>insiste sur</em> un point (et non « insiste le fait que ») ; on <em>souligne que</em> ou on <em>souligne le fait que</em> ; on <em>se rallie à</em> une proposition ; on <em>émet des réserves sur</em> un projet. Enfin, après <em>se demander si</em>, le verbe est à l'indicatif ou au conditionnel, jamais au subjonctif : « Elle se demande si le délai est réaliste. »</blockquote>
<h3>La nominalisation : un outil de concision</h3>
<p>Pour les intertitres et le relevé des décisions, on transforme souvent une phrase verbale en groupe nominal : « Nous allons réorganiser l'accueil » → « Réorganisation de l'accueil » ; « Il faut recruter un stagiaire » → « Recrutement d'un stagiaire ». Attention à l'orthographe des noms dérivés : <em>réviser</em> → <em>révision</em> ; <em>diffuser</em> → <em>diffusion</em> ; <em>intervenir</em> → <em>intervention</em> ; <em>maintenir</em> → <em>maintien</em> ou <em>maintenance</em> (sens différents) ; <em>exclure</em> → <em>exclusion</em> ; <em>acquérir</em> → <em>acquisition</em> ; <em>résoudre</em> → <em>résolution</em>.</p>
<h3>Exemple de relevé de décisions</h3>
<table>
<thead><tr><th>Décision ou action</th><th>Responsable</th><th>Échéance</th></tr></thead>
<tbody>
<tr><td>Mise à jour du modèle de devis</td><td>Inès</td><td>vendredi 27 novembre 2026</td></tr>
<tr><td>Rappel des trois clients en attente</td><td>Karim</td><td>mardi 24 novembre 2026</td></tr>
<tr><td>Validation du budget de formation interne</td><td>Mme Delorme</td><td>lundi 30 novembre 2026</td></tr>
</tbody>
</table>
<p><em>Exemple fictif, fil rouge Ardoise &amp; Plume.</em></p>
<h3>Exercice d'application</h3>
<p>Transposez au discours indirect, dans un compte rendu rédigé au passé composé :</p>
<ol>
<li>Karim : « Je rappellerai les trois clients demain. »</li>
<li>Inès : « Le nouveau modèle de devis est prêt depuis lundi. »</li>
<li>Mme Delorme : « Pouvez-vous me transmettre les chiffres avant vendredi ? »</li>
</ol>
<p><strong>Corrigé :</strong> 1. Karim a indiqué qu'il rappellerait les trois clients le lendemain. 2. Inès a précisé que le nouveau modèle de devis était prêt depuis le lundi précédent. 3. Mme Delorme a demandé aux participants s'ils pouvaient lui transmettre les chiffres avant le vendredi suivant. On remarque la double consonne de <em>rappellerait</em> : le verbe <em>rappeler</em> double le <em>l</em> devant une syllabe contenant un <em>e</em> muet, notamment au futur et au conditionnel.</p>`,
      },
      {
        title: "7.5 – Rédiger un courrier professionnel",
        content: `<h3>Quand préférer la lettre au courriel ?</h3>
<p>La lettre (sur papier ou en pièce jointe au format PDF) reste de mise lorsque l'écrit a une portée officielle ou juridique : réponse formelle à une réclamation, mise en demeure, résiliation d'un contrat, courrier à une administration, attestation, lettre de candidature, convocation à un entretien. Elle obéit à des conventions de présentation plus strictes que le courriel, et le registre attendu est le registre courant soutenu.</p>
<h3>La mise en page d'une lettre</h3>
<table>
<thead><tr><th>Bloc</th><th>Position habituelle</th><th>Contenu et règles</th></tr></thead>
<tbody>
<tr><td>Expéditeur</td><td>En haut à gauche</td><td>Raison sociale, adresse, téléphone, adresse électronique ; pour une entreprise, les mentions légales figurent souvent en pied de page.</td></tr>
<tr><td>Destinataire</td><td>À droite, sous l'expéditeur</td><td>Civilité et nom (« Madame Claire Bernier »), fonction, entreprise, adresse complète.</td></tr>
<tr><td>Lieu et date</td><td>À droite, sous le destinataire</td><td>« Nantes, le 23 novembre 2026 » : virgule après le lieu, mois en minuscules, pas de zéro devant le jour. On n'écrit pas « le 23/11/2026 » dans une lettre.</td></tr>
<tr><td>Références</td><td>À gauche</td><td>« V/Réf. » (vos références) et « N/Réf. » (nos références), numéro de dossier.</td></tr>
<tr><td>Objet</td><td>À gauche, avant l'appel</td><td>« Objet : réponse à votre réclamation du 16 novembre 2026 » : le mot <em>Objet</em> est suivi d'une espace, des deux-points et d'une espace.</td></tr>
<tr><td>Pièces jointes</td><td>Sous l'objet ou en bas à gauche</td><td>« P. J. : copie de la facture n° 2026-245 ».</td></tr>
<tr><td>Appel</td><td>Au-dessus du corps</td><td>« Madame, » suivi d'une virgule ; le premier paragraphe commence par une majuscule.</td></tr>
<tr><td>Corps</td><td>Au centre</td><td>Introduction, développement, conclusion ; paragraphes séparés.</td></tr>
<tr><td>Formule de politesse</td><td>Dernier paragraphe</td><td>Reprend l'appel entre virgules.</td></tr>
<tr><td>Signature</td><td>À droite ou à gauche selon la charte</td><td>Prénom, nom, fonction ; signature manuscrite ou électronique.</td></tr>
</tbody>
</table>
<h3>Le plan du corps de la lettre</h3>
<ol>
<li><strong>Introduction</strong> : elle rappelle le contexte ou la raison de l'écrit. « Par courrier du 16 novembre 2026, vous nous avez fait part de votre mécontentement concernant… » ; « J'ai l'honneur de solliciter… » (formule réservée aux demandes adressées à une autorité).</li>
<li><strong>Développement</strong> : il expose les faits, les arguments, la réponse ou la demande. Un paragraphe par idée ; des connecteurs logiques (<em>en effet, par ailleurs, cependant, en conséquence, c'est pourquoi</em>).</li>
<li><strong>Conclusion</strong> : elle annonce la suite (action, délai, rendez-vous) et précède la formule de politesse.</li>
</ol>
<h3>Les connecteurs logiques et leur ponctuation</h3>
<table>
<thead><tr><th>Relation</th><th>Connecteurs</th><th>Exemple et ponctuation</th></tr></thead>
<tbody>
<tr><td>Addition</td><td>de plus, en outre, par ailleurs</td><td>« En outre, nous vous offrons… » (virgule après le connecteur en tête de phrase)</td></tr>
<tr><td>Cause</td><td>car, en effet, puisque, étant donné que</td><td>« Le délai a été dépassé, car la pièce était indisponible. » (virgule avant <em>car</em>)</td></tr>
<tr><td>Conséquence</td><td>donc, c'est pourquoi, par conséquent, de sorte que</td><td>« La pièce était indisponible ; c'est pourquoi la livraison a été retardée. »</td></tr>
<tr><td>Opposition</td><td>mais, cependant, toutefois, néanmoins, en revanche</td><td>« Le tarif est maintenu ; en revanche, les frais de port sont offerts. »</td></tr>
<tr><td>Concession</td><td>bien que, quoique (+ subjonctif), même si (+ indicatif)</td><td>« Bien que la commande soit arrivée en retard, … » / « Même si la commande est arrivée en retard, … »</td></tr>
<tr><td>But</td><td>afin de, afin que, pour que (+ subjonctif)</td><td>« afin que vous puissiez… »</td></tr>
</tbody>
</table>
<blockquote><strong>Point d'attention</strong> – <em>Quoique</em> en un seul mot signifie « bien que » et se construit avec le subjonctif : « Quoiqu'il soit en retard, il sera reçu. » <em>Quoi que</em> en deux mots signifie « quelle que soit la chose que » : « Quoi que vous décidiez, nous vous accompagnerons. » De même, <em>quel que</em> (en deux mots, <em>quel</em> s'accordant avec le sujet) s'emploie devant le verbe <em>être</em> : « Quelle que soit votre décision… » ; « Quels que soient les délais… ».</blockquote>
<h3>Exemple de lettre – Ardoise &amp; Plume (entreprise fictive)</h3>
<p>Ardoise &amp; Plume – [adresse fictive], 44000 Nantes</p>
<p>Madame Claire Bernier<br>Responsable des ressources humaines<br>[Entreprise cliente fictive]</p>
<p>Nantes, le 23 novembre 2026</p>
<p>N/Réf. : RC-2026-014<br>Objet : réponse à votre réclamation du 16 novembre 2026<br>P. J. : avoir n° 2026-031</p>
<p>Madame,</p>
<p>Par courrier du 16 novembre 2026, vous nous avez fait part de votre mécontentement concernant la livraison tardive des supports de l'atelier du 12 novembre. Je vous remercie d'avoir pris le temps de nous écrire.</p>
<p>Après vérification, il apparaît que les supports, qui devaient vous parvenir la veille de l'atelier, ne vous ont été transmis que le matin même, en raison d'une erreur dans notre planning d'envoi. Nous regrettons sincèrement le désagrément que ce retard a occasionné pour votre équipe.</p>
<p>Afin de réparer ce préjudice, nous vous adressons ci-joint un avoir de 10 % sur le montant de la prestation. Nous avons par ailleurs modifié notre procédure : les supports seront désormais envoyés au plus tard trois jours ouvrés avant chaque intervention.</p>
<p>Je reste à votre disposition pour en parler de vive voix et vous prie d'agréer, Madame, l'expression de mes salutations distinguées.</p>
<p>Mme [prénom] Delorme<br>Directrice</p>
<p><em>Tous les noms, numéros et montants sont fictifs.</em></p>
<h3>Analyse des choix de rédaction</h3>
<ul>
<li>« vous nous avez fait part » : le participe <em>fait</em> reste invariable, car le COD (<em>part</em>) est placé après le verbe et n'est pas un pronom antéposé.</li>
<li>« d'avoir pris le temps » : infinitif passé, qui marque l'antériorité.</li>
<li>« qui devaient vous parvenir » : <em>parvenir</em> se construit avec <em>à</em> ; ici, le pronom <em>vous</em> est complément indirect.</li>
<li>« ne vous ont été transmis que le matin même » : restriction <em>ne… que</em> (qui n'est pas une négation : les supports ont bien été transmis, mais tardivement) ; dans « le matin même », <em>même</em> est un adjectif placé après le nom, au sens de « précisément ce matin-là ».</li>
<li>« le désagrément que ce retard a occasionné » : le COD <em>que</em> reprend <em>désagrément</em>, masculin singulier ; le participe s'accorde donc au masculin singulier, ce qui ne se voit pas.</li>
<li>« trois jours ouvrés » : jours effectivement travaillés dans l'entreprise, à distinguer des « jours ouvrables » (tous les jours de la semaine sauf le jour de repos hebdomadaire et les jours fériés chômés).</li>
</ul>
<h3>Exercice d'application</h3>
<p>Corrigez la date, l'objet et l'appel de l'en-tête suivant : « Nantes le 05 Décembre 2026 / Objet: Votre commande / Chère Madame Bernier, ».</p>
<p><strong>Corrigé :</strong> « Nantes, le 5 décembre 2026 » (virgule après le lieu, pas de zéro devant le jour, mois en minuscule) ; « Objet : votre commande n° … du … » (espace avant et après les deux-points, objet précis ; après « Objet : », la minuscule et la majuscule se rencontrent toutes deux dans l'usage : l'essentiel est d'être constant d'un courrier à l'autre) ; « Madame, » ou, si une relation existe déjà, « Chère Madame, » : on ne met pas le nom de famille dans l'appel d'une lettre.</p>`,
      },
      {
        title: "7.6 – Prendre des notes et restituer oralement une information",
        content: `<h3>Écouter, noter, restituer : une compétence évaluée</h3>
<p>Parmi les cinq types d'exercices de l'épreuve Le Robert figurent des <strong>phrases à compléter après avoir écouté un enregistrement</strong>. Cet exercice mobilise deux capacités : comprendre un message oral et transcrire correctement à l'écrit ce que l'on a entendu. Dans le monde professionnel, la même compétence est sollicitée dès que l'on prend un message téléphonique, que l'on note les décisions d'une réunion ou que l'on rapporte à un collègue les propos d'un client. L'oral ne montre pas l'orthographe : c'est au moment du passage à l'écrit que surgissent les erreurs d'homophonie (<em>a/à, ces/ses, quand/quant, -é/-er</em>).</p>
<h3>Les règles de la prise de notes</h3>
<ul>
<li><strong>Noter l'essentiel, pas tout</strong> : les informations répondant aux questions <em>qui ? quoi ? quand ? où ? combien ? pourquoi ? comment ?</em></li>
<li><strong>Noter les données exactes</strong> : noms propres, chiffres, dates, numéros de téléphone, références. Ce sont les éléments qu'on ne peut pas reconstituer par le raisonnement.</li>
<li><strong>Utiliser des abréviations personnelles et stables</strong>, que l'on sera capable de relire.</li>
<li><strong>Faire apparaître la structure</strong> : tirets, flèches, retraits.</li>
<li><strong>Relire et rédiger aussitôt</strong> : une note relue une heure plus tard est encore compréhensible ; une note relue une semaine plus tard l'est rarement.</li>
</ul>
<h3>Abréviations et symboles courants de prise de notes</h3>
<table>
<thead><tr><th>Symbole ou abréviation</th><th>Sens</th><th>Symbole ou abréviation</th><th>Sens</th></tr></thead>
<tbody>
<tr><td>→</td><td>entraîne, donc</td><td>qd</td><td>quand</td></tr>
<tr><td>←</td><td>provient de, à cause de</td><td>ds</td><td>dans</td></tr>
<tr><td>+</td><td>plus, en outre</td><td>pr</td><td>pour</td></tr>
<tr><td>=</td><td>égale, est</td><td>tt, ttes</td><td>tout, toutes</td></tr>
<tr><td>≠</td><td>différent, opposé</td><td>ms</td><td>mais</td></tr>
<tr><td>↑ / ↓</td><td>hausse / baisse</td><td>pb</td><td>problème</td></tr>
<tr><td>cf.</td><td>se reporter à</td><td>RDV</td><td>rendez-vous</td></tr>
<tr><td>env.</td><td>environ</td><td>tél.</td><td>téléphone</td></tr>
</tbody>
</table>
<blockquote><strong>Point d'attention</strong> – Ces abréviations servent à la prise de notes et ne doivent <strong>jamais</strong> apparaître dans le document final. Le passage de la note à la phrase rédigée est précisément le moment où il faut réactiver toutes les règles d'orthographe : la note « RDV reporté → mar. 1/12, 10 h, salle B » devient « Le rendez-vous est reporté au mardi 1er décembre, à 10 heures, en salle B. » On observe l'abréviation <em>1er</em> (et non « 1ier » ni « 1e ») et l'accord du participe <em>reporté</em> avec <em>rendez-vous</em> (masculin).</blockquote>
<h3>De l'oral à l'écrit : les homophones à surveiller</h3>
<p>À l'oral, les terminaisons suivantes se prononcent de la même façon. Seule l'analyse grammaticale permet de trancher au moment d'écrire.</p>
<table>
<thead><tr><th>Ce qu'on entend</th><th>Possibilités écrites</th><th>Test</th></tr></thead>
<tbody>
<tr><td>[e] en fin de verbe</td><td>-er (infinitif), -é, -ée, -és, -ées (participe), -ez (2e pers. du pluriel), -ai (passé simple ou futur, 1re pers.)</td><td>Remplacer par un verbe du 3e groupe : « Il faut <em>vendre</em> » → infinitif ; « Il a <em>vendu</em> » → participe.</td></tr>
<tr><td>[sɛ]</td><td>ces, ses, c'est, s'est, sait, sais</td><td>Mettre au singulier (<em>ce/son</em>), remplacer par <em>cela est</em>, conjuguer à une autre personne.</td></tr>
<tr><td>[kɑ̃]</td><td>quand, quant (à), qu'en</td><td><em>quand</em> = lorsque ; <em>quant à</em> = en ce qui concerne ; <em>qu'en</em> = que + en.</td></tr>
<tr><td>[sɑ̃]</td><td>sans, s'en, sang, cent</td><td><em>s'en</em> se trouve devant un verbe pronominal : « il s'en souvient ».</td></tr>
<tr><td>[lœʁ]</td><td>leur, leurs</td><td>Devant un verbe : pronom invariable ; devant un nom pluriel : déterminant au pluriel.</td></tr>
</tbody>
</table>
<h3>Restituer oralement une information</h3>
<p>Restituer, c'est rapporter à un tiers, avec ses propres mots et sans déformer, un message reçu. La restitution orale efficace suit une structure simple :</p>
<ol>
<li><strong>Annoncer la source et l'objet</strong> : « Mme Bernier a appelé à 10 h 15 au sujet de l'atelier du 3 décembre. »</li>
<li><strong>Donner les faits essentiels</strong>, dans l'ordre logique (et non dans l'ordre où ils ont été dits) : « Elle souhaite avancer le début à 8 h 30, car deux participants doivent partir à midi. »</li>
<li><strong>Préciser l'action attendue et le délai</strong> : « Elle attend une confirmation avant jeudi. »</li>
<li><strong>Transmettre les coordonnées</strong> : « Elle est joignable au numéro habituel jusqu'à 18 h. »</li>
</ol>
<p>Le discours rapporté oral obéit aux mêmes règles que le compte rendu (voir 7.4) : « Elle m'a dit qu'elle viendrait » : après un verbe introducteur au passé, le futur devient un conditionnel présent ; le futur (« Elle m'a dit qu'elle viendra ») reste admis lorsque l'événement est encore à venir au moment où l'on parle. L'interrogation indirecte ne comporte ni inversion ni point d'interrogation : « Elle demande si nous pouvons commencer plus tôt » (et non « Elle demande est-ce que nous pouvons commencer plus tôt ? »).</p>
<h3>Exercice d'application : du message à la note, de la note au message</h3>
<p><strong>Transcription du message vocal (lue par le formateur) :</strong> « Bonjour, c'est Julien Morel, du cabinet Morel et associés. Je vous appelle à propos des deux devis que vous nous avez envoyés la semaine dernière. Nous avons retenu le premier, celui des ateliers de rédaction, mais nous voudrions savoir s'il est possible d'ajouter une demi-journée consacrée aux courriels. Pouvez-vous me rappeler avant vendredi ? Mon numéro est le 02 40 00 00 00. Merci et bonne journée. »</p>
<p><strong>Consigne :</strong> 1. Prenez des notes en cinq lignes au maximum. 2. Rédigez le message que vous laisserez sur le bureau de Karim.</p>
<p><strong>Notes possibles :</strong> « J. Morel (Morel et associés) / devis : 1er retenu (ateliers rédaction) / + ½ j. courriels ? / rappeler av. vendredi / 02 40 00 00 00 »</p>
<p><strong>Message rédigé :</strong> « Karim, M. Julien Morel, du cabinet Morel et associés, a appelé au sujet des deux devis que nous lui avons envoyés la semaine dernière. Il a retenu le premier, consacré aux ateliers de rédaction, et souhaite savoir s'il est possible d'y ajouter une demi-journée sur les courriels. Il demande que vous le rappeliez avant vendredi, au 02 40 00 00 00. Inès »</p>
<p><strong>Points de vigilance :</strong> <em>envoyés</em> s'accorde avec le COD <em>que</em> (mis pour <em>devis</em>, masculin pluriel) placé avant ; <em>demi-journée</em> : <em>demi</em> placé devant le nom est invariable et suivi d'un trait d'union ; « il demande que vous le rappeliez » : subjonctif après un verbe de demande ; on écrit <em>rappeliez</em> avec un seul <em>l</em>, car la terminaison <em>-iez</em> ne contient pas de <em>e</em> muet. <em>Le numéro de téléphone et l'interlocuteur sont fictifs.</em></p>`,
      },
      {
        title: "7.7 – Communiquer au téléphone avec précision",
        content: `<h3>Le téléphone, vitrine de l'entreprise</h3>
<p>Au téléphone, l'interlocuteur ne voit ni le sourire ni les gestes : il juge l'entreprise sur la voix, le vocabulaire et la clarté des phrases. Les erreurs de registre y sont plus visibles qu'ailleurs, et les informations mal comprises (un nom propre, une date, un chiffre) se traduisent ensuite par des erreurs écrites. La compétence C2 du référentiel de la formation inclut donc la maîtrise des formules téléphoniques et la capacité à transcrire avec exactitude ce qui a été dit.</p>
<h3>Les étapes d'un appel entrant</h3>
<table>
<thead><tr><th>Étape</th><th>Formule recommandée</th><th>À éviter</th></tr></thead>
<tbody>
<tr><td>Accueil</td><td>« Ardoise &amp; Plume, Inès à l'appareil, bonjour. »</td><td>« Allô ? » ; « Oui ? »</td></tr>
<tr><td>Identification</td><td>« Puis-je vous demander votre nom, s'il vous plaît ? » ; « Qui dois-je annoncer ? »</td><td>« C'est de la part de qui ? » (familier)</td></tr>
<tr><td>Objet de l'appel</td><td>« À quel sujet souhaitez-vous la joindre ? » ; « Puis-je connaître l'objet de votre appel ? »</td><td>« C'est pour quoi ? » ; « C'est à quel sujet ? » (courant oral, un peu sec)</td></tr>
<tr><td>Mise en attente</td><td>« Je vous prie de patienter un instant. » ; « Ne quittez pas, je vous la passe. »</td><td>« Bougez pas. » ; « Attendez. »</td></tr>
<tr><td>Personne absente</td><td>« Mme Delorme est en rendez-vous jusqu'à 15 heures. Souhaitez-vous laisser un message ? »</td><td>« Elle est pas là. » ; « Elle est partie manger. »</td></tr>
<tr><td>Prise de message</td><td>« Pourriez-vous m'épeler votre nom ? » ; « Je vous relis votre numéro : … »</td><td>Noter sans vérifier.</td></tr>
<tr><td>Conclusion</td><td>« Je transmets votre message à Mme Delorme, qui vous rappellera dans l'après-midi. Je vous souhaite une bonne journée. »</td><td>« Ok, ça marche, bye. »</td></tr>
</tbody>
</table>
<h3>Formules correctes et formules critiquées</h3>
<ul>
<li>« Je vous passe Mme Delorme » est correct et usuel ; « Je vous mets en relation avec Mme Delorme » est plus formel.</li>
<li>« Ne quittez pas » est correct (impératif négatif de <em>quitter</em>, au sens de « ne pas raccrocher »).</li>
<li>« Je vais vous demander de patienter » est très répandu ; « Je vous prie de patienter » ou « Pourriez-vous patienter un instant ? » sont plus directs.</li>
<li>« Pas de souci » appartient au registre familier ; préférez « Bien sûr », « Volontiers », « C'est entendu », « Je vous en prie ».</li>
<li>« Je vous rappelle » (présent à valeur de futur proche) est correct ; attention à l'orthographe : <em>je rappelle, tu rappelles, il rappelle, nous rappelons, vous rappelez, ils rappellent</em>.</li>
<li>« Au plaisir » seul est une formule familière ; on dira plutôt « Au plaisir de vous rencontrer » ou « Au plaisir de travailler avec vous ».</li>
</ul>
<h3>Épeler et vérifier les données</h3>
<p>Les noms propres et les adresses électroniques sont les premières sources d'erreurs. Demandez systématiquement d'épeler, et épelez vous-même avec des repères clairs : « D comme Denise, E comme Eugène… » ; on peut aussi utiliser l'alphabet phonétique international employé en aéronautique (Alpha, Bravo, Charlie…), à condition que l'interlocuteur le connaisse. Pour les adresses électroniques, distinguez à voix haute le point, le tiret (« tiret du six » ou « tiret haut » dans l'usage courant), le tiret bas, l'arobase (nom féminin : <em>une arobase</em> ; on rencontre aussi <em>arrobe</em> et <em>arobas</em>).</p>
<p>Pour les nombres, faites répéter ou répétez vous-même, chiffre par chiffre ou par groupes : « zéro deux, quarante, douze… ». Pour les dates, nommez le jour de la semaine : « mardi 1er décembre » permet de détecter immédiatement une confusion.</p>
<h3>Laisser un message vocal</h3>
<p>Un message vocal professionnel tient en quatre éléments : identité (« Inès, d'Ardoise &amp; Plume »), objet (« au sujet de votre inscription à l'atelier du 3 décembre »), demande (« pourriez-vous me confirmer le nombre de participants ? »), coordonnées lentement articulées et répétées une fois. Durée indicative : une trentaine de secondes, pas davantage.</p>
<h3>Le registre au téléphone : vouvoiement et adaptation</h3>
<p>Le vouvoiement est la règle avec tout interlocuteur extérieur, même si celui-ci tutoie. On ne passe au tutoiement qu'à l'initiative de l'interlocuteur, dans une relation déjà établie, et l'on reste au vouvoiement si l'on a un doute. Le passage d'un registre à l'autre dans un même appel (« Bonjour Monsieur, … ok, je vous dis ça demain ») produit une impression de désinvolture.</p>
<blockquote><strong>Fil rouge – Ardoise &amp; Plume (entreprise fictive)</strong> – Karim reçoit l'appel d'un prospect pressé. Il répond : « Ouais, pas de souci, je vous envoie ça asap, je checke avec ma boss et je reviens vers vous. » Inès lui propose une version adaptée : « Bien sûr, Monsieur. Je vérifie les disponibilités avec Mme Delorme, notre directrice, et je vous adresse une proposition par courriel avant 17 heures. Puis-je vous demander votre adresse électronique ? » Les quatre anglicismes ou termes familiers (<em>ouais, asap, checker, boss</em>) et la formule critiquée <em>revenir vers</em> ont disparu ; l'engagement est précis (heure, canal).</blockquote>
<h3>Exercice d'application</h3>
<p>Reformulez en registre professionnel :</p>
<ol>
<li>« Elle est pas là, rappelez plus tard. »</li>
<li>« C'est qui ? »</li>
<li>« Bougez pas, je regarde. »</li>
<li>« Ça marche, à plus. »</li>
</ol>
<p><strong>Corrigé proposé :</strong> 1. « Mme Delorme est absente pour le moment. Souhaitez-vous laisser un message ou préférez-vous qu'elle vous rappelle ? » (on remarque le subjonctif <em>rappelle</em> après <em>préférer que</em>) 2. « Puis-je vous demander votre nom, s'il vous plaît ? » 3. « Je vous prie de patienter un instant, je vérifie. » 4. « C'est entendu. Je vous souhaite une bonne journée. »</p>`,
      },
      {
        title: "7.8 – Féminisation des noms et écriture dite inclusive : repères factuels",
        content: `<h3>De quoi parle-t-on ?</h3>
<p>L'expression « écriture inclusive » recouvre plusieurs pratiques différentes, qu'il est utile de distinguer, car elles n'ont ni le même statut ni la même réception. Ce cours se limite à des repères factuels et à des conseils de prudence : il ne prend pas parti dans le débat public sur ces questions.</p>
<table>
<thead><tr><th>Pratique</th><th>Définition</th><th>Exemple</th></tr></thead>
<tbody>
<tr><td><strong>Féminisation des noms de métiers, titres et fonctions</strong></td><td>Emploi de la forme féminine d'un nom de métier ou de fonction lorsqu'il désigne une femme.</td><td>la directrice, une ingénieure, la maire, une autrice</td></tr>
<tr><td><strong>Doublets</strong> (ou double flexion)</td><td>Mention des deux formes, féminine et masculine, en toutes lettres.</td><td>les candidates et les candidats ; toutes et tous</td></tr>
<tr><td><strong>Termes épicènes et formulations englobantes</strong></td><td>Emploi de mots dont la forme ne varie pas selon le genre ou de noms collectifs.</td><td>les membres, les responsables, le personnel, l'équipe, les personnes inscrites</td></tr>
<tr><td><strong>Formes abrégées avec un signe</strong></td><td>Contraction des deux formes à l'aide d'un point médian, d'un point, d'un tiret ou de parenthèses.</td><td>les salarié·es ; les salarié(e)s</td></tr>
<tr><td><strong>Accord de proximité</strong></td><td>Accord de l'adjectif avec le nom le plus proche, quel que soit son genre.</td><td>« les dossiers et les factures envoyées » (accord avec <em>factures</em>)</td></tr>
</tbody>
</table>
<h3>La féminisation des noms de métiers et de fonctions</h3>
<p>C'est la pratique la plus consensuelle. L'Académie française a adopté en <strong>février 2019</strong> un rapport sur la féminisation des noms de métiers et de fonctions, qui prend acte de l'usage des formes féminines et considère qu'il n'existe pas d'obstacle de principe à leur emploi. Les formes féminines sont aujourd'hui largement répandues dans l'usage professionnel et administratif.</p>
<table>
<thead><tr><th>Masculin</th><th>Féminin en usage</th><th>Remarque</th></tr></thead>
<tbody>
<tr><td>directeur</td><td>directrice</td><td>Forme ancienne et régulière (<em>-teur</em> → <em>-trice</em>).</td></tr>
<tr><td>ingénieur</td><td>ingénieure</td><td>Ajout d'un <em>e</em> final, comme <em>professeure</em>, <em>procureure</em>.</td></tr>
<tr><td>auteur</td><td>autrice, auteure</td><td>Les deux formes coexistent dans l'usage.</td></tr>
<tr><td>chef</td><td>cheffe, chef</td><td><em>Cheffe</em> s'écrit avec deux <em>f</em> ; la forme <em>la chef</em> se rencontre aussi.</td></tr>
<tr><td>écrivain</td><td>écrivaine</td><td>Forme régulière.</td></tr>
<tr><td>maire, ministre, juge, architecte</td><td>la maire, la ministre, la juge, l'architecte</td><td>Noms épicènes : seul le déterminant change.</td></tr>
<tr><td>conseiller</td><td>conseillère</td><td>Accent grave sur le <em>e</em> devant la consonne finale suivie d'un <em>e</em> muet.</td></tr>
</tbody>
</table>
<p>Dans un courrier, on écrit donc « Madame la Directrice » lorsque la fonction est occupée par une femme. Les accords suivent le genre de la personne : « Mme Delorme, directrice d'Ardoise &amp; Plume, est arrivée » ; « la ministre est attendue ».</p>
<h3>Les repères institutionnels</h3>
<ul>
<li>Une <strong>circulaire du Premier ministre du 21 novembre 2017</strong>, relative aux règles de féminisation et de rédaction des textes publiés au <em>Journal officiel</em>, invite à féminiser les noms de fonctions lorsqu'elles sont occupées par une femme et à ne pas faire usage, dans ces textes, de l'écriture dite inclusive recourant à des signes (comme le point médian) ; le masculin y est utilisé comme forme neutre pour les termes susceptibles de s'appliquer aussi bien aux femmes qu'aux hommes.</li>
<li>Dans le domaine scolaire, le ministère chargé de l'éducation nationale a diffusé en <strong>mai 2021</strong> une circulaire proscrivant le recours au point médian dans l'enseignement, tout en encourageant la féminisation des fonctions.</li>
<li>Dans les entreprises et les associations, les pratiques sont variées : certaines disposent d'une <strong>charte rédactionnelle</strong> qui fixe la règle interne (doublets, termes épicènes, ou au contraire absence de forme abrégée).</li>
</ul>
<blockquote><strong>Point d'attention</strong> – Ces repères évoluent : avant de vous référer à un texte officiel dans un écrit professionnel, vérifiez qu'il est toujours en vigueur et citez-le avec exactitude. En cas de doute, contentez-vous d'appliquer la charte de votre structure ou, à défaut, les procédés qui ne posent aucun problème grammatical : féminisation des fonctions, doublets en toutes lettres et termes épicènes.</blockquote>
<h3>Les procédés sans difficulté grammaticale</h3>
<p><strong>1. Les doublets en toutes lettres.</strong> « Les candidates et les candidats sont invités à se présenter à 9 heures. » L'adjectif ou le participe qui se rapporte aux deux noms se met au <strong>masculin pluriel</strong> selon la règle d'accord traditionnelle : « Les candidates et les candidats inscrits… ». Certains rédacteurs placent le nom masculin en second pour rapprocher le participe masculin (« les candidates et les candidats inscrits ») ; l'accord reste ainsi grammaticalement régulier et fluide à la lecture.</p>
<p><strong>2. Les termes épicènes et collectifs.</strong> « Les membres de l'équipe », « les personnes inscrites », « le personnel », « la direction », « les responsables de service », « les stagiaires », « les élèves ». Ces formulations évitent la répétition des doublets et allègent la phrase : « Le personnel est invité à… » plutôt que « Les salariées et les salariés sont invités à… ».</p>
<p><strong>3. La reformulation.</strong> « Toute personne souhaitant s'inscrire… » plutôt que « Tout candidat souhaitant s'inscrire… » ; « Vous êtes invité ou invitée » peut devenir « Nous avons le plaisir de vous inviter ».</p>
<h3>Les formes abrégées et l'accord de proximité</h3>
<p>Les formes abrégées avec signe (« salarié·es ») sont l'objet de débats : leurs partisans y voient un moyen de rendre visibles les deux genres ; leurs détracteurs soulignent notamment les difficultés de lecture à voix haute et les difficultés rencontrées par certains lecteurs, y compris avec des logiciels de lecture d'écran. Elles ne relèvent pas de la norme grammaticale enseignée et sont proscrites dans les textes visés par les circulaires évoquées ci-dessus.</p>
<p>L'accord de proximité, attesté dans la langue ancienne, ne correspond pas à la norme grammaticale actuelle, selon laquelle l'adjectif qui se rapporte à plusieurs noms de genres différents se met au masculin pluriel : « un dossier et une facture <strong>envoyés</strong> ».</p>
<h3>Conseils pour l'épreuve et pour le travail</h3>
<ul>
<li><strong>Dans un exercice d'orthographe ou de grammaire</strong>, appliquez les règles d'accord de la norme grammaticale enseignée (accord au masculin pluriel pour un ensemble mixte) et employez les formes féminines usuelles des noms de métiers.</li>
<li><strong>Dans un écrit professionnel</strong>, suivez la charte de votre structure ; à défaut, privilégiez les procédés qui n'altèrent pas la lisibilité : féminisation des fonctions, termes épicènes, doublets en nombre limité.</li>
<li><strong>Soyez cohérent</strong> : un document qui alterne doublets, point médian et masculin générique donne une impression de désordre.</li>
</ul>
<h3>Exercice d'application</h3>
<p>Reformulez sans forme abrégée, en conservant le sens et en respectant les accords.</p>
<ol>
<li>« Les participant·es seront accueilli·es à 9 h. »</li>
<li>« Chaque salarié(e) doit être informé(e) de la procédure. »</li>
<li>« Mme Delorme, directeur général, a signé la convention. »</li>
</ol>
<p><strong>Corrigé proposé :</strong> 1. « Les participantes et les participants seront accueillis à 9 h. » ou « Les personnes inscrites seront accueillies à 9 h. » (dans la seconde version, le participe s'accorde au féminin avec <em>personnes</em>, nom féminin, quel que soit le genre des personnes concernées). 2. « Chaque membre du personnel doit être informé de la procédure. » ou « L'ensemble du personnel doit être informé de la procédure. » (<em>membre</em> est un nom masculin : on accorde au masculin). 3. « Mme Delorme, directrice générale, a signé la convention. » (féminisation de la fonction occupée par une femme ; l'adjectif <em>générale</em> s'accorde).</p>`,
      },
      {
        title: "7.9 – Quiz de fin de chapitre",
        content: `<h3>Dix questions pour vérifier vos acquis</h3>
<p>Répondez sans consulter le cours, puis comparez avec le corrigé expliqué.</p>
<ol>
<li>Quelle phrase relève du registre courant attendu dans un écrit professionnel ?<br>a) « On a pas encore reçu votre dossier. »<br>b) « Nous n'avons pas encore reçu votre dossier. »<br>c) « Votre dossier, on l'a pas encore reçu. »</li>
<li>Complétez : « Je vous … gré de bien vouloir me retourner le contrat signé. »<br>a) serais<br>b) saurais<br>c) serai</li>
<li>Quelle formule finale est correcte ?<br>a) « En vous remerciant, veuillez agréer, Madame, mes salutations distinguées. »<br>b) « En vous remerciant, je vous prie d'agréer, Madame, l'expression de mes salutations distinguées. »<br>c) « En espérant une réponse, recevez, Madame, mes salutations. »</li>
<li>Quelle est l'abréviation correcte de « Monsieur » ?<br>a) Mr<br>b) M.<br>c) Mr.</li>
<li>Quel est le pluriel de « compte rendu » ?<br>a) des compte-rendus<br>b) des comptes-rendus<br>c) des comptes rendus</li>
<li>Transposez au discours indirect dans un compte rendu au passé composé : Karim : « J'enverrai le devis demain. »</li>
<li>Quelle phrase est incorrecte ?<br>a) « Ci-joint les factures demandées. »<br>b) « Veuillez trouver les factures ci-jointes. »<br>c) « Ci-jointes les factures demandées. »</li>
<li>Par quelle formulation remplacer « Suite à votre appel, je reviens vers vous » dans un écrit soigné ?</li>
<li>Quelle date est correctement écrite en tête d'une lettre ?<br>a) « Nantes le 03 Décembre 2026 »<br>b) « Nantes, le 3 décembre 2026 »<br>c) « Nantes, le 3 Décembre 2026 »</li>
<li>Réécrivez sans forme abrégée : « Les stagiaires inscrit·es recevront leur convocation. »</li>
</ol>
<h3>Corrigé expliqué</h3>
<ol>
<li><strong>b)</strong> La négation est complète (<em>ne… pas</em>) et le pronom <em>nous</em> remplace <em>on</em>. Les propositions a) et c) omettent le <em>ne</em> et emploient <em>on</em> ; la c) ajoute une dislocation (« Votre dossier, on l'a… ») propre à l'oral.</li>
<li><strong>b) saurais.</strong> La locution est <em>savoir gré à quelqu'un de quelque chose</em> ; on emploie le conditionnel de politesse du verbe <em>savoir</em> : <em>je saurais</em>. « Je vous serais gré » est une faute très répandue.</li>
<li><strong>b)</strong> Le gérondif <em>en vous remerciant</em> a pour sujet implicite « je », qui est aussi le sujet de <em>prie</em>. En a), le sujet de <em>veuillez</em> est « vous » : la construction est fautive. En c), même défaut, et la formule est incomplète.</li>
<li><strong>b) M.</strong> « Mr » est l'abréviation anglaise de <em>Mister</em>. En français, <em>Monsieur</em> s'abrège <em>M.</em>, avec un point, car l'abréviation ne se termine pas par la dernière lettre du mot ; <em>Messieurs</em> s'abrège <em>MM.</em></li>
<li><strong>c) des comptes rendus.</strong> Le nom composé s'écrit sans trait d'union ; <em>compte</em> (nom) et <em>rendu</em> (participe employé comme nom) prennent la marque du pluriel.</li>
<li>« Karim a indiqué qu'il enverrait le devis le lendemain. » Le futur devient conditionnel présent après un verbe introducteur au passé, le pronom <em>je</em> devient <em>il</em> et <em>demain</em> devient <em>le lendemain</em>. On note l'orthographe du verbe <em>envoyer</em> : futur <em>j'enverrai</em>, conditionnel <em>il enverrait</em> (radical irrégulier <em>enverr-</em>).</li>
<li><strong>c)</strong> En tête de phrase, <em>ci-joint</em> est invariable. En b), placé après le nom, il s'accorde avec <em>factures</em> : <em>ci-jointes</em> est correct.</li>
<li>« À la suite de votre appel, je vous recontacte… » ou « Comme suite à votre appel, je vous apporte les précisions demandées. » <em>Suite à</em> et <em>revenir vers quelqu'un</em> sont deux tournures déconseillées par l'Académie française dans un écrit soigné.</li>
<li><strong>b)</strong> Virgule après le nom du lieu, pas de zéro devant le quantième, nom du mois en minuscule.</li>
<li>« Les stagiaires inscrits recevront leur convocation » (accord au masculin pluriel selon la norme grammaticale, <em>stagiaire</em> étant épicène) ou, pour éviter la question, « Les personnes inscrites recevront leur convocation ». Selon que chaque stagiaire reçoit une convocation, on peut aussi écrire <em>leur convocation</em> (singulier distributif) ou <em>leurs convocations</em> : les deux sont admis.</li>
</ol>
<p><strong>Barème indicatif :</strong> 9 ou 10 bonnes réponses : acquis solides ; 6 à 8 : relisez les sections correspondant à vos erreurs ; moins de 6 : reprenez le chapitre en commençant par les sections 7.1 et 7.2.</p>`,
      },
      {
        title: "7.10 – Cas pratique corrigé : une journée de communication chez Ardoise & Plume",
        content: `<h3>Contexte</h3>
<blockquote><strong>Fil rouge – Ardoise &amp; Plume (entreprise fictive)</strong> – Ardoise &amp; Plume est une PME fictive de services installée à Nantes. Le vendredi 20 novembre 2026, Mme Delorme, directrice, a réuni Inès (assistante de direction) et Karim (conseiller commercial) pour faire le point sur la réclamation d'une cliente et sur l'organisation des ateliers de décembre. Inès doit produire trois écrits : le compte rendu de la réunion, le courriel de diffusion de ce compte rendu, et la correction d'un courriel de Karim destiné à la cliente. <em>Tous les noms, dates, montants et coordonnées sont fictifs.</em></blockquote>
<h3>Document 1 – Les notes d'Inès</h3>
<p>« Réu 20/11 – 10h-11h – bureau dir. / présents : Mme D., K., moi / 1) récla Mme Bernier : supports arrivés le matin même → avoir 10 % validé par Mme D. ; K. appelle cliente lundi / 2) ateliers déc. : 3 sessions (3, 10, 17/12) ; manque 1 salle pr le 10 → Inès cherche avant merc. / 3) nouvelle procédure : envoi supports 3 j. ouvrés avant / prochaine réu : vend. 4/12, 10h »</p>
<h3>Document 2 – Le brouillon de Karim</h3>
<p>« Bonjour Madame Bernier, Suite à votre courrier, je voulais m'excuser pour le retard des supports qui vous ont été envoyé le matin même. Je vous informe que notre directrice à validé un avoir de 10% que vous trouverez ci-jointe. Nous avons mis en place une nouvelle procédure afin que cela ne se reproduit plus. Je reviens vers vous lundi pour en parler. Cdt, Karim »</p>
<h3>Travail demandé</h3>
<ol>
<li>Rédigez le compte rendu de la réunion à partir des notes.</li>
<li>Rédigez le courriel de diffusion du compte rendu.</li>
<li>Repérez et corrigez les erreurs du brouillon de Karim, puis proposez une version finale.</li>
</ol>
<h3>Corrigé – 1. Le compte rendu</h3>
<p><strong>Ardoise &amp; Plume – Compte rendu de la réunion de direction du vendredi 20 novembre 2026</strong><br>Horaires et lieu : de 10 heures à 11 heures, bureau de la direction<br>Présents : Mme Delorme, directrice ; Karim [nom], conseiller commercial ; Inès [nom], assistante de direction (rédactrice)<br>Diffusion : participants</p>
<p><strong>1. Réclamation de Mme Bernier</strong><br>Mme Delorme rappelle que les supports de l'atelier du 12 novembre ne sont parvenus à la cliente que le matin même. Elle valide l'octroi d'un avoir de 10 % sur le montant de la prestation. Karim appellera la cliente le lundi 23 novembre pour lui présenter les excuses de l'entreprise et la mesure retenue.</p>
<p><strong>2. Ateliers de décembre</strong><br>Trois sessions sont prévues les jeudis 3, 10 et 17 décembre 2026. Une salle manque pour la session du 10 décembre ; Inès est chargée d'en trouver une avant le mercredi 25 novembre.</p>
<p><strong>3. Procédure d'envoi des supports</strong><br>Les participants adoptent une nouvelle règle : les supports seront désormais envoyés au plus tard trois jours ouvrés avant chaque intervention.</p>
<table>
<thead><tr><th>Action</th><th>Responsable</th><th>Échéance</th></tr></thead>
<tbody>
<tr><td>Appel de Mme Bernier et envoi de l'avoir</td><td>Karim</td><td>lundi 23 novembre 2026</td></tr>
<tr><td>Réservation d'une salle pour le 10 décembre</td><td>Inès</td><td>mercredi 25 novembre 2026</td></tr>
<tr><td>Application de la procédure d'envoi des supports</td><td>Karim et Inès</td><td>à compter des ateliers de décembre</td></tr>
</tbody>
</table>
<p><strong>Prochaine réunion :</strong> vendredi 4 décembre 2026, à 10 heures.</p>
<p><strong>Commentaire :</strong> le compte rendu est rédigé au présent, temps tenu d'un bout à l'autre ; les décisions futures sont exprimées au futur (<em>appellera</em>, <em>seront envoyés</em>), ce qui est conforme à la concordance au présent. Les abréviations de prise de notes (<em>réu, récla, K., pr, j.</em>) ont toutes disparu. Les dates ont été vérifiées : le 20 novembre 2026 est un vendredi ; le lundi suivant est donc le 23 novembre et le mercredi le 25 ; les 3, 10 et 17 décembre 2026 sont des jeudis. On écrit « 10 % » avec une espace entre le nombre et le symbole. « Ne sont parvenus que » : <em>parvenir</em> se conjugue avec <em>être</em> ; le participe s'accorde avec le sujet <em>supports</em>.</p>
<h3>Corrigé – 2. Le courriel de diffusion</h3>
<p>Objet : Compte rendu de la réunion de direction du 20 novembre 2026</p>
<p>Bonjour Madame Delorme, bonjour Karim,</p>
<p>Vous trouverez ci-joint le compte rendu de notre réunion de ce matin. Je vous remercie de me faire part de vos éventuelles corrections avant lundi midi ; sans retour de votre part, je considérerai le document comme validé.</p>
<p>Je vous rappelle les deux échéances les plus proches : l'appel de Mme Bernier (Karim, lundi 23 novembre) et la réservation de la salle pour le 10 décembre (Inès, mercredi 25 novembre).</p>
<p>Bien cordialement,</p>
<p>Inès [nom]<br>Assistante de direction – Ardoise &amp; Plume</p>
<p><strong>Commentaire :</strong> l'appel s'adresse aux deux destinataires en respectant la hiérarchie et la relation (vouvoiement pour la directrice, prénom pour le collègue ; le vouvoiement de Karim n'est pas obligatoire si l'usage interne est le tutoiement, mais le courriel étant collectif, le « vous » s'impose grammaticalement). <em>Ci-joint</em> placé devant le nom précédé d'un déterminant reste invariable ici, ce qui est l'usage le plus courant. <em>Je considérerai</em> : futur du verbe <em>considérer</em>, formé sur l'infinitif (<em>considérer</em> + <em>-ai</em>) ; les rectifications orthographiques de 1990 admettent aussi la graphie <em>considèrerai</em>, alignée sur la prononciation. <em>Je vous rappelle</em> : deux <em>l</em>.</p>
<h3>Corrigé – 3. Le brouillon de Karim</h3>
<table>
<thead><tr><th>Erreur</th><th>Correction</th><th>Explication</th></tr></thead>
<tbody>
<tr><td>Bonjour Madame Bernier, Suite à</td><td>Bonjour Madame, / À la suite de</td><td>Appel acceptable en courriel, mais après la virgule, le message commence à la ligne ; <em>suite à</em> est déconseillé.</td></tr>
<tr><td>je voulais m'excuser</td><td>je vous prie de bien vouloir nous excuser</td><td>L'imparfait d'atténuation affaiblit l'excuse ; on présente ses excuses ou l'on prie le destinataire d'excuser.</td></tr>
<tr><td>qui vous ont été envoyé</td><td>qui vous ont été envoyés</td><td>Passif : accord du participe avec le sujet <em>qui</em>, mis pour <em>supports</em> (masculin pluriel).</td></tr>
<tr><td>notre directrice à validé</td><td>notre directrice a validé</td><td>Auxiliaire <em>avoir</em> (on peut dire « avait validé ») : pas d'accent.</td></tr>
<tr><td>10%</td><td>10 %</td><td>Espace entre le nombre et le symbole.</td></tr>
<tr><td>que vous trouverez ci-jointe</td><td>que vous trouverez ci-joint</td><td><em>Ci-joint</em> se rapporte à <em>avoir</em>, nom masculin : <em>ci-joint</em>.</td></tr>
<tr><td>afin que cela ne se reproduit plus</td><td>afin que cela ne se reproduise plus</td><td><em>Afin que</em> exige le subjonctif.</td></tr>
<tr><td>Je reviens vers vous lundi</td><td>Je vous appellerai lundi</td><td>Tournure déconseillée ; engagement plus précis.</td></tr>
<tr><td>Cdt, Karim</td><td>Cordialement, / Karim [nom], conseiller commercial</td><td>Pas d'abréviation ; signature complète.</td></tr>
</tbody>
</table>
<p><strong>Version finale proposée :</strong></p>
<p>Objet : Votre réclamation du 16 novembre 2026 – avoir et nouvelle procédure</p>
<p>Bonjour Madame,</p>
<p>À la suite de votre courrier du 16 novembre, je vous prie de bien vouloir nous excuser pour l'envoi tardif des supports de l'atelier du 12 novembre, qui ne vous ont été transmis que le matin même.</p>
<p>Notre directrice, Mme Delorme, a validé un avoir de 10 % sur le montant de la prestation, que vous trouverez ci-joint. Nous avons par ailleurs mis en place une nouvelle procédure afin que cette situation ne se reproduise plus : les supports seront désormais envoyés au plus tard trois jours ouvrés avant chaque intervention.</p>
<p>Je vous appellerai le lundi 23 novembre pour faire le point avec vous.</p>
<p>Cordialement,</p>
<p>Karim [nom]<br>Conseiller commercial – Ardoise &amp; Plume</p>
<h3>Bilan des compétences mobilisées</h3>
<ul>
<li><strong>C2 – registre et vocabulaire</strong> : suppression des formules critiquées (<em>suite à, revenir vers</em>), des abréviations et des tournures familières ; choix de verbes précis.</li>
<li><strong>C1 – règles de la langue</strong> : accord du participe passé au passif, homophones <em>a/à</em>, subjonctif après <em>afin que</em>, accord de <em>ci-joint</em>, typographie des pourcentages et des dates.</li>
<li><strong>Méthode</strong> : passage de la note au texte rédigé, vérification des dates, cohérence des temps dans le compte rendu.</li>
</ul>`,
      },
    ],
  },
  {
    title: "Chapitre 8 – Entraînement à l'épreuve et examen blanc (C1 et C2)",
    description:
      "Compétences C1 et C2. Se préparer de manière méthodique à l'épreuve de la Certification en langue française Le Robert (RS7013) : rappel du format officiel (épreuve en ligne de 350 questions à correction automatique, cinq types d'exercices, score sur 1 000 points), stratégies adaptées à chaque type d'exercice, gestion du rythme sans présumer de la durée de l'épreuve, examen blanc de cinquante items couvrant les cinq types d'exercices avec corrigé expliqué, plan de révision individuel, glossaire grammatical de plus de quarante termes, quiz de dix questions et cas pratique corrigé sur le fil rouge fictif Ardoise & Plume.",
    sections: [
      {
        title: "8.1 – Rappel du format de l'épreuve et stratégie générale",
        content: `<h3>Ce que l'on sait de l'épreuve</h3>
<p>Avant de s'entraîner, il faut connaître précisément le cadre de l'évaluation. Les éléments ci-dessous sont ceux qui figurent dans la fiche de la certification enregistrée au Répertoire spécifique sous le code <strong>RS7013</strong> (« Certification en langue française Le Robert », certificateur : SEJER, nom commercial « Certification Le Robert »). Tout ce qui n'y figure pas, notamment la durée de l'épreuve, le coût de l'inscription et les modalités techniques de passation, est <strong>précisé lors de l'inscription auprès du certificateur</strong> : ce cours n'en dit rien de plus.</p>
<table>
<thead><tr><th>Élément</th><th>Ce que dit la fiche de la certification</th></tr></thead>
<tbody>
<tr><td>Forme de l'épreuve</td><td>Épreuve en ligne de 350 questions, à correction automatique.</td></tr>
<tr><td>Types d'exercices</td><td>1. Dictée de mots et d'expressions ; 2. Phrases à compléter en insérant un mot ; 3. Phrases à compléter après avoir écouté un enregistrement ; 4. Questions à choix multiple ; 5. Phrases à corriger si l'on estime qu'elles comportent une erreur.</td></tr>
<tr><td>Résultat</td><td>Score sur 1 000 points.</td></tr>
<tr><td>Seuil de délivrance</td><td>En dessous de 450 points, la certification n'est pas délivrée ; une formation complémentaire est conseillée.</td></tr>
<tr><td>Validation partielle</td><td>Non prévue.</td></tr>
<tr><td>Prérequis</td><td>Avoir le français pour langue maternelle ou avoir acquis le niveau A2 du CECRL, et ne pas être en situation d'analphabétisme.</td></tr>
</tbody>
</table>
<h3>Les niveaux de score et leur signification</h3>
<table>
<thead><tr><th>Score</th><th>Signification indiquée par la fiche</th><th>Exemples de métiers cités</th></tr></thead>
<tbody>
<tr><td>Moins de 450</td><td>Certification non délivrée ; formation complémentaire conseillée.</td><td>–</td></tr>
<tr><td>450 à 599</td><td>Maîtrise des règles les plus courantes.</td><td>Techniciens, ouvriers, agents d'accueil, testeurs informatiques</td></tr>
<tr><td>600 à 749</td><td>Capacité à rédiger et à communiquer par écrit de façon autonome.</td><td>Ingénieurs, managers, conseillers commerciaux, graphistes</td></tr>
<tr><td>750 à 899</td><td>Aisance ; production et correction fiables de tous documents ; personne référente.</td><td>Secrétaires de direction, téléconseillers, chargés de communication, psychologues, notaires</td></tr>
<tr><td>900 et plus</td><td>Expertise.</td><td>Relecteurs-correcteurs, formateurs en langues, éditeurs</td></tr>
</tbody>
</table>
<p>Ces paliers permettent de fixer un <strong>objectif réaliste</strong> en fonction de son métier et de son projet. Un agent d'accueil peut viser le premier palier, une assistante de direction ou une chargée de communication le palier 750–899. Fixer un objectif chiffré aide à organiser ses révisions : on ne prépare pas de la même manière un score de 500 et un score de 800.</p>
<blockquote><strong>Point d'attention</strong> – L'examen blanc de ce chapitre comporte cinquante items, et non 350 ; il n'a pas le même barème que l'épreuve officielle. Son résultat donne une indication de vos points forts et de vos points faibles par type d'exercice ; il <strong>ne permet pas de prédire</strong> votre score sur 1 000 points.</blockquote>
<h3>Gérer son rythme sans connaître d'avance la durée</h3>
<p>Le nombre de questions est connu (350) ; la durée de l'épreuve vous sera indiquée lors de l'inscription. Dès que vous la connaissez, calculez votre <strong>temps moyen par question</strong> en divisant la durée totale par 350 : vous saurez ainsi s'il est raisonnable de vous attarder sur un item difficile. En attendant, entraînez-vous selon trois principes valables quelle que soit la durée :</p>
<ul>
<li><strong>Ne pas s'enliser.</strong> Un item sur lequel on hésite longtemps n'est pas mieux réussi pour autant ; au-delà d'une hésitation raisonnable, on choisit la réponse la plus probable et l'on passe à la suite.</li>
<li><strong>Répondre à la première lecture attentive.</strong> Les candidats qui changent leur réponse sans argument grammatical nouveau remplacent souvent une bonne réponse par une mauvaise. On ne modifie une réponse que si l'on identifie une règle précise.</li>
<li><strong>S'entraîner en temps limité.</strong> Lors des séances de révision, chronométrez des séries de vingt items et notez votre temps : vous saurez à quel rythme vous travaillez naturellement.</li>
</ul>
<h3>Les conditions de passation : à vérifier soi-même</h3>
<p>L'épreuve se déroulant en ligne et comportant des enregistrements à écouter, il est prudent de vérifier à l'avance, auprès du certificateur ou de l'organisme qui vous inscrit, les conditions matérielles et techniques requises (lieu de passation, matériel, connexion, équipement d'écoute). Ces modalités sont précisées lors de l'inscription : ne vous fiez pas à des informations de seconde main.</p>
<h3>Une stratégie générale en quatre temps</h3>
<ol>
<li><strong>Se positionner</strong> : réaliser l'examen blanc dans des conditions sérieuses (sans dictionnaire, sans interruption, en chronométrant).</li>
<li><strong>Analyser</strong> : calculer le taux de réussite par type d'exercice et par famille de règles (homophones, accords, participes, conjugaison, vocabulaire, construction).</li>
<li><strong>Réviser de manière ciblée</strong> : consacrer la majorité du temps aux deux ou trois familles de règles les moins maîtrisées (section 8.7).</li>
<li><strong>Consolider</strong> : refaire des séries courtes, régulièrement, plutôt qu'une longue séance la veille.</li>
</ol>
<h3>Les familles d'erreurs les plus fréquentes</h3>
<p>Quel que soit le niveau, l'expérience des formations montre que les erreurs se concentrent sur quelques familles de règles, déjà travaillées dans les chapitres précédents :</p>
<table>
<thead><tr><th>Famille</th><th>Exemples typiques</th><th>Chapitre de référence</th></tr></thead>
<tbody>
<tr><td>Homophones grammaticaux</td><td>a/à, ces/ses, quand/quant, leur/leurs, quel que/quelque</td><td>Chapitre 3</td></tr>
<tr><td>Participe passé</td><td>COD placé avant, verbes pronominaux, participe suivi d'un infinitif</td><td>Chapitre 4</td></tr>
<tr><td>Terminaisons verbales</td><td>-é/-er/-ez, futur/conditionnel, subjonctif</td><td>Chapitre 4</td></tr>
<tr><td>Orthographe d'usage</td><td>doubles consonnes, accents, mots invariables</td><td>Chapitre 2</td></tr>
<tr><td>Vocabulaire</td><td>paronymes, pléonasmes, impropriétés, anglicismes</td><td>Chapitre 5</td></tr>
<tr><td>Construction</td><td>constructions verbales, relatifs, négation, interrogation indirecte</td><td>Chapitre 6</td></tr>
</tbody>
</table>
<h3>Exercice d'application</h3>
<p>Supposons que la durée de l'épreuve annoncée lors de votre inscription soit notée D (en minutes). Exprimez le temps moyen dont vous disposez par question, puis indiquez ce que vous faites si un item vous a déjà pris trois fois ce temps moyen.</p>
<p><strong>Corrigé :</strong> le temps moyen par question est égal à D ÷ 350 minutes, soit (D × 60) ÷ 350 secondes. Si un item a déjà consommé trois fois ce temps, on choisit la réponse qui paraît la plus probable, on la valide et l'on passe à l'item suivant ; le temps gagné profitera à des items mieux maîtrisés. Remarque : la valeur de D n'est pas indiquée dans ce cours ; elle vous sera communiquée lors de l'inscription auprès du certificateur.</p>`,
      },
      {
        title: "8.2 – Stratégies par type d'exercice",
        content: `<h3>Type 1 – Dictée de mots et d'expressions</h3>
<p><strong>Ce qui est évalué :</strong> l'orthographe lexicale (lettres doubles, accents, lettres muettes, mots invariables) et l'orthographe des locutions figées (« au fur et à mesure », « en l'occurrence »).</p>
<p><strong>Méthode :</strong></p>
<ul>
<li>Écoutez le mot <strong>dans sa phrase de contexte</strong> : le contexte permet de distinguer les homophones (« un compte » et « un conte » ; « la cour », « le cours » et « la course »).</li>
<li>Identifiez la nature du mot : nom, adverbe, locution. Un adverbe en <em>-ment</em> formé sur un adjectif en <em>-ant</em> ou <em>-ent</em> s'écrit en <em>-amment</em> ou <em>-emment</em> (<em>couramment, évidemment</em>).</li>
<li>Pensez à la <strong>famille du mot</strong> : <em>accueil</em> rappelle <em>accueillir</em> ; <em>dorénavant</em> vient de l'ancienne locution <em>d'ores en avant</em> (<em>ores</em> signifiant « maintenant »), d'où le <em>é</em> et le <em>n</em> unique ; <em>occurrence</em> prend deux <em>c</em> et deux <em>r</em>, comme <em>concurrence</em>.</li>
<li>Vérifiez le <strong>nombre</strong> : la dictée peut porter sur une forme au pluriel (« des rendez-vous », invariable ; « des après-midi » ou « des après-midis » selon l'orthographe traditionnelle ou rectifiée).</li>
</ul>
<p><strong>Pièges classiques :</strong> les doubles consonnes après le préfixe <em>a-</em> (<em>apparaître, appeler, accueil</em>, mais <em>apercevoir, aménager</em>) ; les mots en <em>-tion/-ssion</em> ; les accents circonflexes (<em>tâche</em> au sens de travail, <em>tache</em> au sens de salissure) ; les mots invariables (<em>néanmoins, parmi, malgré, volontiers</em>).</p>
<h3>Type 2 – Phrases à compléter en insérant un mot</h3>
<p><strong>Ce qui est évalué :</strong> la maîtrise des homophones grammaticaux, des accords, des formes verbales, des pronoms relatifs et des mots de liaison.</p>
<p><strong>Méthode :</strong></p>
<ol>
<li>Lisez <strong>toute la phrase</strong> avant de compléter : l'accord ou la forme verbale dépend souvent d'un mot éloigné.</li>
<li>Déterminez la <strong>fonction</strong> du mot manquant : déterminant, pronom, verbe conjugué, participe, conjonction.</li>
<li>Si c'est un verbe, identifiez le <strong>mode</strong> exigé par la construction (<em>il faut que</em> → subjonctif ; <em>après que</em> → indicatif ; <em>si</em> de condition → jamais de conditionnel juste après).</li>
<li>Si c'est un participe, cherchez <strong>l'auxiliaire</strong> et, avec <em>avoir</em>, le <strong>COD</strong> et sa place.</li>
<li>Relisez la phrase complétée à voix basse.</li>
</ol>
<h3>Type 3 – Phrases à compléter après avoir écouté un enregistrement</h3>
<p><strong>Ce qui est évalué :</strong> la compréhension d'un message oral et la transcription correcte des mots entendus, souvent des formes dont l'orthographe ne s'entend pas (terminaisons verbales, accords).</p>
<p><strong>Méthode :</strong></p>
<ul>
<li>Avant l'écoute, si les phrases à compléter sont visibles, <strong>lisez-les</strong> : vous saurez quels passages guetter.</li>
<li>Pendant l'écoute, notez le mot entendu tel quel, même approximativement ; la mise en forme orthographique viendra ensuite.</li>
<li>Après l'écoute, <strong>analysez la phrase écrite</strong>, qui n'est pas toujours identique à la phrase entendue : le sujet, le temps ou la construction peuvent avoir changé, et c'est la phrase écrite qui commande l'accord.</li>
<li>Méfiez-vous des sons [e] et [ɛ] en fin de verbe : <em>-er, -é, -ée, -és, -ées, -ez, -ai, -ait</em>.</li>
</ul>
<blockquote><strong>Bonne pratique</strong> – En formation, cet exercice est reproduit à partir de <strong>transcriptions lues par le formateur</strong>. Demandez à un collègue de vous lire des messages professionnels (messages vocaux, consignes, annonces) et entraînez-vous à compléter des phrases de reformulation. L'objectif n'est pas la vitesse d'écriture, mais l'exactitude orthographique de la forme retenue.</blockquote>
<h3>Type 4 – Questions à choix multiple</h3>
<p><strong>Ce qui est évalué :</strong> l'ensemble des compétences, en particulier le vocabulaire (sens précis, paronymes, registres), les constructions et l'orthographe de mots isolés.</p>
<p><strong>Méthode :</strong></p>
<ol>
<li>Lisez la consigne : demande-t-on la forme <strong>correcte</strong> ou la forme <strong>incorrecte</strong> ? Une inversion de consigne est une cause d'erreur fréquente.</li>
<li>Éliminez d'abord les propositions manifestement fautives.</li>
<li>Entre deux propositions plausibles, cherchez la règle qui les départage (sens, construction, accord), et non l'impression visuelle : une forme fautive vue souvent finit par « sembler juste ».</li>
<li>Méfiez-vous des propositions qui se ressemblent : l'erreur tient parfois à une seule lettre (<em>dilemme/dilemne</em>) ou à un accent.</li>
</ol>
<h3>Type 5 – Phrases à corriger si elles comportent une erreur</h3>
<p><strong>Ce qui est évalué :</strong> la capacité à repérer une erreur et à la corriger, mais aussi à reconnaître une phrase <strong>correcte</strong>. Toutes les phrases ne comportent pas nécessairement une erreur : la consigne précise qu'il faut corriger la phrase « si l'on estime » qu'elle en comporte une.</p>
<p><strong>Méthode de relecture en quatre passages :</strong></p>
<table>
<thead><tr><th>Passage</th><th>Question à se poser</th><th>Exemple d'erreur détectée</th></tr></thead>
<tbody>
<tr><td>1. Le verbe</td><td>Quel est le sujet ? Le verbe est-il bien accordé, au bon temps et au bon mode ?</td><td>« Si j'aurais su » → « Si j'avais su »</td></tr>
<tr><td>2. Les participes</td><td>Quel auxiliaire ? Où est le COD ? Le verbe est-il pronominal ?</td><td>« Elle s'est permise » → « Elle s'est permis »</td></tr>
<tr><td>3. Les mots grammaticaux</td><td>Homophones, déterminants, pronoms, prépositions</td><td>« Quelque soit » → « Quelle que soit »</td></tr>
<tr><td>4. Le sens et la construction</td><td>Le mot est-il employé dans son sens exact ? La construction est-elle correcte ?</td><td>« Se rappeler de » → « se rappeler quelque chose »</td></tr>
</tbody>
</table>
<p><strong>Piège symétrique :</strong> à force de chercher des erreurs, on en « voit » partout. Si, après les quatre passages, aucune règle précise n'est enfreinte, la phrase est probablement correcte. Ne la modifiez pas.</p>
<h3>Tableau de synthèse</h3>
<table>
<thead><tr><th>Type</th><th>Réflexe principal</th><th>Erreur à éviter</th></tr></thead>
<tbody>
<tr><td>Dictée</td><td>Contexte et famille du mot</td><td>Écrire le premier homophone qui vient à l'esprit</td></tr>
<tr><td>Phrase à compléter</td><td>Lire toute la phrase, identifier la fonction</td><td>Accorder avec le mot le plus proche</td></tr>
<tr><td>Après écoute</td><td>Analyser la phrase écrite</td><td>Recopier la terminaison « entendue »</td></tr>
<tr><td>QCM</td><td>Relire la consigne, éliminer</td><td>Se fier à l'impression visuelle</td></tr>
<tr><td>Phrase à corriger</td><td>Quatre passages de relecture</td><td>Corriger une phrase juste</td></tr>
</tbody>
</table>
<h3>Exercice d'application</h3>
<p>Pour chacune des phrases suivantes, dites si elle est correcte ; sinon, corrigez-la et nommez la règle : 1. « Les candidates se sont présentées à l'heure. » 2. « Il faut que vous preniez le temps de relire. » 3. « Je vous ai envoyer le planning. » 4. « Les décisions qu'il a pris sont contestées. »</p>
<p><strong>Corrigé :</strong> 1. Correcte : dans <em>se présenter</em>, le pronom <em>se</em> est complément d'objet direct (elles ont présenté elles-mêmes) et il est placé avant le verbe : le participe s'accorde avec lui, donc avec le sujet <em>candidates</em>. 2. Correcte : subjonctif présent après <em>il faut que</em>. 3. « Je vous ai envoyé le planning » : après l'auxiliaire <em>avoir</em>, on emploie le participe passé (test : « je vous ai <em>vendu</em> »). 4. « Les décisions qu'il a prises » : le COD <em>qu'</em> (mis pour <em>décisions</em>, féminin pluriel) est placé avant le verbe conjugué avec <em>avoir</em>.</p>`,
      },
      {
        title: "8.3 – Examen blanc, première partie : items 1 à 25",
        content: `<h3>Consignes générales de l'examen blanc</h3>
<p>Cet examen blanc comporte <strong>cinquante items</strong> répartis en cinq séries de dix, une par type d'exercice de l'épreuve officielle. Il se réalise sans dictionnaire, sans correcteur orthographique et sans consulter le cours. Chronométrez-vous : le temps que vous mettrez vous servira de repère personnel (section 8.1). Notez vos réponses sur une feuille, puis reportez-vous au corrigé expliqué (sections 8.5 et 8.6).</p>
<blockquote><strong>Point d'attention</strong> – Les items de cet examen blanc ont été rédigés pour la formation ; ils s'inspirent des cinq types d'exercices décrits dans la fiche de la certification, mais ne reproduisent pas les questions de l'épreuve officielle. Les enregistrements sont remplacés par des <strong>transcriptions lues à voix haute par le formateur</strong>. En autoformation, demandez à une autre personne de vous les lire, sans que vous ayez le texte sous les yeux.</blockquote>
<h3>Série A – Dictée de mots et d'expressions (items 1 à 10)</h3>
<p><strong>Mode de passation :</strong> le formateur lit chaque phrase de contexte à voix haute, puis répète le mot ou l'expression en italique. Le candidat écrit <strong>uniquement</strong> le mot ou l'expression demandés. Le candidat ne voit pas la colonne « Phrase lue par le formateur ».</p>
<table>
<thead><tr><th>Item</th><th>Phrase lue par le formateur</th><th>À écrire</th></tr></thead>
<tbody>
<tr><td>1</td><td>« Nous vous remercions de votre <em>accueil</em>. »</td><td>le nom</td></tr>
<tr><td>2</td><td>« Le contrat arrive à <em>échéance</em> en mars. »</td><td>le nom</td></tr>
<tr><td>3</td><td>« <em>Néanmoins</em>, le délai reste serré. »</td><td>l'adverbe</td></tr>
<tr><td>4</td><td>« <em>En l'occurrence</em>, la clause ne s'applique pas. »</td><td>la locution</td></tr>
<tr><td>5</td><td>« <em>Dorénavant</em>, les factures seront dématérialisées. »</td><td>l'adverbe</td></tr>
<tr><td>6</td><td>« Les corrections seront faites <em>au fur et à mesure</em>. »</td><td>la locution</td></tr>
<tr><td>7</td><td>« Prévoyez <em>un intervalle</em> de dix minutes entre les deux séances. »</td><td>le groupe nominal</td></tr>
<tr><td>8</td><td>« <em>La connexion</em> au réseau a été interrompue. »</td><td>le groupe nominal</td></tr>
<tr><td>9</td><td>« Les deux <em>événements</em> ont eu lieu le même jour. »</td><td>le nom, au pluriel</td></tr>
<tr><td>10</td><td>« Ce dossier reste prioritaire, <em>quoi qu'il arrive</em>. »</td><td>la locution</td></tr>
</tbody>
</table>
<h3>Série B – Phrases à compléter en insérant un mot (items 11 à 20)</h3>
<p><strong>Consigne :</strong> complétez chaque phrase par <strong>un seul mot</strong>. Lorsqu'un verbe est indiqué entre parenthèses, écrivez-le à la forme qui convient.</p>
<ol start="11">
<li>Les factures ___ vous m'avez parlé sont arrivées ce matin.</li>
<li>___ à la date de livraison, elle reste à confirmer.</li>
<li>Il est indispensable que vous ___ (être) présents à la réunion de lundi.</li>
<li>Les dossiers sont ___ prêts à être envoyés. (au sens de « entièrement »)</li>
<li>Les deux directrices se sont ___ (téléphoner) hier soir.</li>
<li>Ces chiffres, je les ai ___ (vérifier) moi-même.</li>
<li>Il faudrait que nous ___ (prendre) une décision avant jeudi.</li>
<li>Nous lancerons la commande dès que le client ___ (avoir) signé le devis.</li>
<li>___ sont les heures d'ouverture de l'accueil ?</li>
<li>Mme Delorme nous a demandé ___ nous étions disponibles mardi.</li>
</ol>
<h3>Série C – Phrases à compléter après écoute (items 21 à 30)</h3>
<p><strong>Mode de passation :</strong> le formateur lit <strong>deux fois</strong>, à vitesse normale, la transcription ci-dessous, qui reproduit un message vocal. Le candidat ne voit pas la transcription. Il complète ensuite chaque phrase par <strong>un seul mot</strong>, entendu dans le message et écrit à la forme exigée par la phrase écrite. Les items 21 à 25 figurent ci-dessous ; les items 26 à 30, qui portent sur le même message, figurent en section 8.4.</p>
<p><strong>Transcription lue par le formateur (fictive) :</strong></p>
<blockquote>« Bonjour, ici Sandrine Lecomte, de l'imprimerie Atlantique. Je vous appelle au sujet de votre commande de brochures. Les épreuves que vous nous avez renvoyées lundi ont bien été prises en compte. Toutefois, deux corrections restent à valider : le logo, qui apparaît trop petit, et l'adresse, où il manque le code postal. Quant au papier, nous vous conseillons un grammage plus épais, car les brochures seront distribuées lors de salons. Si vous êtes d'accord, l'impression pourra commencer dès jeudi, et la livraison aura lieu la semaine suivante. Merci de me rappeler avant mercredi midi. Je vous souhaite une bonne journée. »<br><em>Message, personne et entreprise fictifs.</em></blockquote>
<p><strong>Phrases à compléter (le candidat les voit) :</strong></p>
<ol start="21">
<li>Les épreuves que nous avons ___ à l'imprimerie lundi ont été prises en compte.</li>
<li>Mme Lecomte confirme que nos corrections ont bien été ___ en compte.</li>
<li>Deux corrections doivent encore être ___ par nos soins.</li>
<li>Selon l'imprimerie, le logo ___ trop petit.</li>
<li>Dans l'adresse, il ___ le code postal.</li>
</ol>
<h3>Conseils avant de passer à la suite</h3>
<ul>
<li>Pour la série A, relisez chaque mot en vous demandant s'il appartient à une famille connue (<em>accueillir</em>, <em>échoir</em>, <em>connecter</em>).</li>
<li>Pour la série B, entourez dans chaque phrase le mot qui commande la forme manquante : antécédent du relatif, conjonction, auxiliaire, COD.</li>
<li>Pour la série C, rappelez-vous que la phrase écrite peut avoir un autre sujet que la phrase entendue : l'item 21, par exemple, est formulé du point de vue de l'entreprise qui a renvoyé les épreuves (« nous avons… »), alors que le message est formulé du point de vue de l'imprimerie (« vous nous avez… »).</li>
</ul>
<h3>Feuille de réponses à reproduire</h3>
<table>
<thead><tr><th>Item</th><th>Réponse</th><th>Item</th><th>Réponse</th><th>Item</th><th>Réponse</th></tr></thead>
<tbody>
<tr><td>1</td><td></td><td>10</td><td></td><td>19</td><td></td></tr>
<tr><td>2</td><td></td><td>11</td><td></td><td>20</td><td></td></tr>
<tr><td>3</td><td></td><td>12</td><td></td><td>21</td><td></td></tr>
<tr><td>4</td><td></td><td>13</td><td></td><td>22</td><td></td></tr>
<tr><td>5</td><td></td><td>14</td><td></td><td>23</td><td></td></tr>
<tr><td>6</td><td></td><td>15</td><td></td><td>24</td><td></td></tr>
<tr><td>7</td><td></td><td>16</td><td></td><td>25</td><td></td></tr>
<tr><td>8</td><td></td><td>17</td><td></td><td></td><td></td></tr>
<tr><td>9</td><td></td><td>18</td><td></td><td></td><td></td></tr>
</tbody>
</table>`,
      },
      {
        title: "8.4 – Examen blanc, seconde partie : items 26 à 50",
        content: `<h3>Série C (suite) – Phrases à compléter après écoute (items 26 à 30)</h3>
<p>Ces items portent sur le message vocal de l'imprimerie Atlantique (transcription lue par le formateur en section 8.3). Si la lecture a eu lieu au début de la section précédente, le formateur peut la relire une fois avant les items 26 à 30. Complétez chaque phrase par <strong>un seul mot</strong>.</p>
<ol start="26">
<li>___ au papier, l'imprimerie conseille un grammage plus épais.</li>
<li>Les brochures seront ___ lors de salons professionnels.</li>
<li>Si nous donnons notre accord, l'impression commencera ___ jeudi.</li>
<li>La livraison aura lieu la semaine ___.</li>
<li>Mme Lecomte nous demande de la ___ avant mercredi midi.</li>
</ol>
<h3>Série D – Questions à choix multiple (items 31 à 40)</h3>
<p><strong>Consigne :</strong> choisissez la proposition qui convient. Une seule réponse est attendue par item.</p>
<ol start="31">
<li>Quelle est l'orthographe correcte ?<br>a) un dilemne<br>b) un dilemme<br>c) un dilème</li>
<li>« Il faut ___ ce manque de personnel. »<br>a) pallier à<br>b) pallier<br>c) palier</li>
<li>« Le comptable a ___ une erreur dans le bilan. »<br>a) décelé<br>b) descellé<br>c) desselé</li>
<li>À quel registre appartient la phrase « Je ne saurais vous dire » ?<br>a) familier<br>b) courant<br>c) soutenu</li>
<li>« Les documents que j'ai ___ imprimer sont sur votre bureau. »<br>a) fait<br>b) faits<br>c) faites</li>
<li>Quel est l'équivalent français recommandé de l'anglicisme <em>deadline</em> ?<br>a) date limite<br>b) ligne morte<br>c) délai final mort</li>
<li>« Bien qu'il ___ arrivé en retard, il a été reçu. »<br>a) est<br>b) soit<br>c) était</li>
<li>Quelle phrase contient un pléonasme ?<br>a) « Nous allons collaborer ensemble sur ce projet. »<br>b) « Nous allons collaborer sur ce projet. »<br>c) « Nous allons travailler ensemble sur ce projet. »</li>
<li>Quelle écriture est correcte ?<br>a) trois milles euros<br>b) trois mille euros<br>c) trois mils euros</li>
<li>« Ce sont les collègues ___ je travaille depuis deux ans. »<br>a) que<br>b) avec qui<br>c) dont</li>
</ol>
<h3>Série E – Phrases à corriger si elles comportent une erreur (items 41 à 50)</h3>
<p><strong>Consigne :</strong> pour chaque phrase, indiquez « correcte » si vous estimez qu'elle ne comporte aucune erreur ; sinon, recopiez le passage fautif corrigé. Chaque phrase comporte <strong>au plus une</strong> erreur. Attention : certaines phrases sont correctes.</p>
<ol start="41">
<li>Les documents que vous m'avez transmis sont complets.</li>
<li>Elle s'est permise de modifier le planning sans prévenir.</li>
<li>Je vous envoie les chiffres que vous avez demandé.</li>
<li>Si j'aurais su, je serais venu plus tôt.</li>
<li>Quelque soit votre décision, nous la respecterons.</li>
<li>Il est sorti de la réunion à 11 heures.</li>
<li>Nous fermerons la salle après qu'il soit parti.</li>
<li>Je me rappelle de cette réunion comme si c'était hier.</li>
<li>Pourriez-vous me dire où se trouve la salle B ?</li>
<li>Les deux salariées se sont succédées à ce poste.</li>
</ol>
<h3>Après l'examen : la grille d'auto-évaluation</h3>
<p>Une fois le corrigé consulté, reportez vos résultats dans la grille ci-dessous. Comptez un point par item juste ; un item n'est juste que si la réponse est entièrement correcte (accent, accord, trait d'union compris). Pour les items de la série A, la graphie rectifiée de 1990, lorsqu'elle existe, est acceptée au même titre que la graphie traditionnelle.</p>
<table>
<thead><tr><th>Série</th><th>Type d'exercice</th><th>Items</th><th>Score sur 10</th><th>Familles de règles les plus touchées</th></tr></thead>
<tbody>
<tr><td>A</td><td>Dictée de mots et d'expressions</td><td>1 à 10</td><td></td><td></td></tr>
<tr><td>B</td><td>Phrases à compléter en insérant un mot</td><td>11 à 20</td><td></td><td></td></tr>
<tr><td>C</td><td>Phrases à compléter après écoute</td><td>21 à 30</td><td></td><td></td></tr>
<tr><td>D</td><td>Questions à choix multiple</td><td>31 à 40</td><td></td><td></td></tr>
<tr><td>E</td><td>Phrases à corriger</td><td>41 à 50</td><td></td><td></td></tr>
<tr><td colspan="3"><strong>Total</strong></td><td><strong>/ 50</strong></td><td></td></tr>
</tbody>
</table>
<h3>Lire son résultat avec prudence</h3>
<p>Le total sur cinquante est un outil de diagnostic, non une estimation du score officiel sur 1 000 points : l'épreuve officielle compte 350 questions et son barème n'est pas reproduit ici. Retenez surtout la <strong>répartition</strong> de vos erreurs. Un candidat qui obtient 9 en série A et 4 en série E n'a pas les mêmes besoins qu'un candidat qui obtient 5 en série A et 9 en série E : le premier connaît bien l'orthographe d'usage mais repère mal les erreurs grammaticales ; le second doit travailler la mémoire visuelle des mots.</p>
<blockquote><strong>Bonne pratique</strong> – Pour chaque erreur, notez dans un carnet la phrase, votre réponse, la bonne réponse et la règle en une ligne. Ce « carnet d'erreurs » est l'outil de révision le plus efficace : il ne contient que ce que vous ne maîtrisez pas encore, et vous le relirez en priorité dans les jours qui précèdent l'épreuve.</blockquote>`,
      },
      {
        title: "8.5 – Corrigé expliqué des items 1 à 25",
        content: `<h3>Série A – Dictée de mots et d'expressions</h3>
<table>
<thead><tr><th>Item</th><th>Réponse</th><th>Explication et moyen mnémotechnique</th></tr></thead>
<tbody>
<tr><td>1</td><td><strong>accueil</strong></td><td>Deux <em>c</em>, puis <em>-ueil</em> : après <em>c</em> et <em>g</em>, le son [œj] s'écrit <em>ueil</em> pour conserver le son dur de la consonne (<em>accueil, cercueil, orgueil</em>), alors qu'il s'écrit <em>euil</em> ailleurs (<em>fauteuil, seuil</em>). Même règle pour le verbe : <em>accueillir</em>.</td></tr>
<tr><td>2</td><td><strong>échéance</strong></td><td>Deux accents aigus ; finale en <em>-ance</em>, comme <em>chance</em>. Le mot est de la famille du verbe <em>échoir</em> (participe présent <em>échéant</em>, d'où « le cas échéant »).</td></tr>
<tr><td>3</td><td><strong>néanmoins</strong></td><td>Adverbe invariable, toujours terminé par <em>s</em>, comme <em>moins</em>. Accent aigu sur le premier <em>e</em>.</td></tr>
<tr><td>4</td><td><strong>en l'occurrence</strong></td><td>Deux <em>c</em> et deux <em>r</em>, finale <em>-ence</em>. Pensez à <em>concurrence</em>, qui a la même structure. Fautes fréquentes : « occurence », « ocurrence ».</td></tr>
<tr><td>5</td><td><strong>dorénavant</strong></td><td>De l'ancienne locution <em>d'ores en avant</em> : un seul <em>n</em>, un accent aigu, finale <em>-ant</em>. Fautes fréquentes : « dorénnavant », « dorénavent ».</td></tr>
<tr><td>6</td><td><strong>au fur et à mesure</strong></td><td>Locution invariable : <em>fur</em> sans <em>e</em> final (ancien mot signifiant « proportion »), <em>à</em> avec accent grave (préposition), sans trait d'union.</td></tr>
<tr><td>7</td><td><strong>un intervalle</strong></td><td>Nom <strong>masculin</strong> (<em>un</em> intervalle), deux <em>l</em> et un <em>e</em> final. Fautes fréquentes : « une intervalle », « interval ».</td></tr>
<tr><td>8</td><td><strong>la connexion</strong></td><td>Deux <em>n</em> et un <em>x</em> : <em>connexion</em> (comme <em>annexion</em>), alors que le verbe s'écrit <em>connecter</em>. On n'écrit pas « connection », qui est la forme anglaise.</td></tr>
<tr><td>9</td><td><strong>événements</strong> (ou <strong>évènements</strong>)</td><td>La graphie traditionnelle porte deux accents aigus ; les rectifications orthographiques de 1990 admettent <em>évènement</em>, avec un accent grave conforme à la prononciation. Les deux graphies sont acceptées. Le pluriel prend un <em>s</em>.</td></tr>
<tr><td>10</td><td><strong>quoi qu'il arrive</strong></td><td>En deux mots : <em>quoi que</em> signifie « quelle que soit la chose qui » ; ici, le <em>que</em> s'élide devant <em>il</em>. À distinguer de <em>quoique</em> (« bien que »), qui n'aurait pas de sens ici.</td></tr>
</tbody>
</table>
<h3>Série B – Phrases à compléter en insérant un mot</h3>
<p><strong>Item 11 – dont.</strong> Le verbe <em>parler</em> se construit ici avec <em>de</em> (« parler de quelque chose ») : le pronom relatif qui remplace un complément introduit par <em>de</em> est <strong>dont</strong>. « Les factures <em>dont</em> vous m'avez parlé » = « vous m'avez parlé <em>de ces factures</em> ». Les réponses « que » et « desquelles » sont fautives ou maladroites (« desquelles » s'emploie surtout après une préposition composée : « au sujet desquelles »).</p>
<p><strong>Item 12 – Quant.</strong> La locution prépositive <em>quant à</em> signifie « en ce qui concerne ». Elle s'écrit avec un <em>t</em>, car elle vient du latin <em>quantum</em>. À ne pas confondre avec <em>quand</em> (« lorsque ») ni avec <em>qu'en</em> (« que » + « en »). Test : remplacer par « en ce qui concerne ».</p>
<p><strong>Item 13 – soyez.</strong> <em>Il est indispensable que</em> exprime une nécessité et exige le subjonctif. Subjonctif présent du verbe <em>être</em> : <em>que je sois, que tu sois, qu'il soit, que nous soyons, que vous soyez, qu'ils soient</em>. Pas de <em>i</em> après le <em>y</em> : on n'écrit pas « soyiez ». L'adjectif <em>présents</em> au pluriel indique que <em>vous</em> désigne plusieurs personnes.</p>
<p><strong>Item 14 – tout.</strong> Devant un adjectif, <em>tout</em> est un adverbe signifiant « entièrement » ; il est <strong>invariable</strong> devant un adjectif masculin (« ils sont tout prêts »). Il ne varie que devant un adjectif féminin commençant par une consonne ou un <em>h</em> aspiré, pour des raisons d'euphonie (« elles sont toutes prêtes »). Attention : « Les dossiers sont tous prêts » est aussi grammatical, mais signifie « chacun des dossiers est prêt » (<em>tous</em> pronom, prononcé avec le <em>s</em>) : la précision « au sens de entièrement » imposait l'adverbe.</p>
<p><strong>Item 15 – téléphoné.</strong> Avec un verbe pronominal réciproque, on cherche la fonction du pronom <em>se</em>. On téléphone <strong>à</strong> quelqu'un : <em>se</em> est complément d'objet indirect. Le participe passé reste donc <strong>invariable</strong> : « elles se sont téléphoné ». Même règle pour <em>se parler, se sourire, se succéder, se nuire, se plaire, se mentir</em>.</p>
<p><strong>Item 16 – vérifiés.</strong> Participe passé employé avec <em>avoir</em> : il s'accorde avec le COD placé avant. Le COD est <em>les</em>, qui reprend <em>ces chiffres</em> (masculin pluriel) : <em>vérifiés</em>.</p>
<p><strong>Item 17 – prenions.</strong> <em>Il faudrait que</em> exige le subjonctif. Subjonctif présent du verbe <em>prendre</em> : <em>que nous prenions, que vous preniez</em> (avec un seul <em>n</em> aux deux premières personnes du pluriel, mais deux <em>n</em> aux autres : <em>que je prenne, qu'ils prennent</em>). Dans la langue courante, on n'emploie pas le subjonctif imparfait (« que nous prissions »).</p>
<p><strong>Item 18 – aura.</strong> <em>Dès que</em> exprime un rapport de temps et se construit avec l'indicatif. L'action de signer est antérieure à une action future (<em>lancerons</em>) : on emploie le <strong>futur antérieur</strong>, formé de l'auxiliaire au futur et du participe passé : « dès que le client <em>aura signé</em> ». Le conditionnel « aurait » ou le subjonctif « ait » sont fautifs.</p>
<p><strong>Item 19 – Quelles.</strong> Déterminant interrogatif, qui s'accorde avec le nom auquel il se rapporte : <em>heures</em>, féminin pluriel, d'où <strong>quelles</strong>. Ici, <em>quelles</em> est attribut du sujet <em>les heures d'ouverture</em>, placé en tête dans l'interrogation. À ne pas confondre avec <em>qu'elles</em> (« que » + « elles ») : « Je pense qu'elles sont affichées. »</p>
<p><strong>Item 20 – si.</strong> L'interrogation indirecte totale (dont la réponse serait « oui » ou « non ») est introduite par <strong>si</strong> : « Êtes-vous disponibles ? » devient « Elle nous a demandé si nous étions disponibles ». On n'emploie ni « est-ce que » ni inversion dans une interrogation indirecte, et la phrase se termine par un point.</p>
<h3>Série C – Phrases à compléter après écoute (items 21 à 25)</h3>
<p><strong>Item 21 – renvoyées.</strong> La phrase écrite est au passé composé avec l'auxiliaire <em>avoir</em> : « les épreuves que nous avons renvoyées ». Le COD <em>que</em>, mis pour <em>épreuves</em> (nom féminin pluriel), est placé avant le verbe : accord au féminin pluriel. On remarque que la phrase écrite (« nous avons ») n'est pas la phrase entendue (« vous nous avez ») : le sujet a changé, mais la règle d'accord reste la même. Orthographe : <em>renvoyer</em> s'écrit avec un <em>y</em>.</p>
<p><strong>Item 22 – prises.</strong> Forme passive au passé composé (<em>ont été prises</em>) : le participe s'accorde avec le sujet <em>corrections</em>, féminin pluriel. Le participe passé de <em>prendre</em> est <em>pris</em>, avec un <em>s</em> au masculin singulier ; on le retrouve au féminin (<em>prise</em>). Moyen de vérification : mettre au féminin fait entendre le <em>s</em> [priz].</p>
<p><strong>Item 23 – validées.</strong> Après <em>être</em> (<em>doivent être validées</em>), le participe passé s'accorde avec le sujet <em>corrections</em>. Dans le message, on entendait « restent à <em>valider</em> » (infinitif après la préposition <em>à</em>) ; la phrase écrite emploie un passif : la forme change. Test : remplacer par un verbe du 3e groupe (« doivent être <em>faites</em> » et non « doivent être <em>faire</em> ») confirme le participe.</p>
<p><strong>Item 24 – apparaît</strong> (ou <strong>apparait</strong>). Présent de l'indicatif, 3e personne du singulier du verbe <em>apparaître</em>. La graphie traditionnelle conserve l'accent circonflexe sur le <em>i</em> devant le <em>t</em> (<em>il apparaît, il paraît, il connaît</em>) ; les rectifications de 1990 admettent sa suppression (<em>il apparait</em>). Deux <em>p</em> : préfixe <em>ap-</em> devant <em>paraître</em>.</p>
<p><strong>Item 25 – manque.</strong> Tournure impersonnelle : « il manque le code postal ». Le sujet grammatical est le pronom impersonnel <em>il</em> ; le verbe reste au singulier, même si le sujet réel est au pluriel (« il manque deux pièces »). On n'écrit pas « il manquent ».</p>
<blockquote><strong>Synthèse des items 1 à 25</strong> – Les erreurs les plus fréquentes dans ces trois séries tiennent à trois causes : l'ignorance de la famille du mot (séries A), l'oubli de la règle qui commande le mode ou l'accord (série B), et la transcription « à l'oreille » d'une terminaison qui ne s'entend pas (série C). Pour chaque erreur, identifiez la cause avant de noter la règle dans votre carnet.</blockquote>`,
      },
      {
        title: "8.6 – Corrigé expliqué des items 26 à 50",
        content: `<h3>Série C (suite) – Phrases à compléter après écoute (items 26 à 30)</h3>
<p><strong>Item 26 – Quant.</strong> Même règle qu'à l'item 12 : <em>quant à</em> (« en ce qui concerne »), avec un <em>t</em>. L'oral ne distingue pas <em>quant</em> de <em>quand</em> : seul le sens permet de trancher.</p>
<p><strong>Item 27 – distribuées.</strong> Futur passif : <em>seront distribuées</em>. Après l'auxiliaire <em>être</em>, le participe passé s'accorde avec le sujet <em>brochures</em>, féminin pluriel. L'erreur « distribuer » (infinitif) est fréquente : le test du verbe du 3e groupe (« seront <em>vendues</em> ») lève le doute.</p>
<p><strong>Item 28 – dès.</strong> La préposition <em>dès</em> (« à partir de ») porte un accent grave et se termine par un <em>s</em>. Ne pas confondre avec le déterminant <em>des</em> (« des brochures ») ni avec <em>dés</em> (pluriel de <em>dé</em>).</p>
<p><strong>Item 29 – suivante.</strong> Adjectif qui s'accorde avec <em>semaine</em>, nom féminin singulier. À distinguer du participe présent <em>suivant</em>, invariable (« en suivant la procédure »), et de la préposition <em>suivant</em> (« suivant les cas »).</p>
<p><strong>Item 30 – rappeler.</strong> Après la préposition <em>de</em> (« nous demande de… »), le verbe se met à l'<strong>infinitif</strong>. Test : « nous demande de la <em>prendre</em> » (et non « de la <em>pris</em> »). Orthographe : <em>rappeler</em> s'écrit avec deux <em>p</em> et un seul <em>l</em> à l'infinitif ; le <em>l</em> ne se double que devant un <em>e</em> muet (<em>je rappelle</em>).</p>
<h3>Série D – Questions à choix multiple (items 31 à 40)</h3>
<table>
<thead><tr><th>Item</th><th>Réponse</th><th>Explication</th></tr></thead>
<tbody>
<tr><td>31</td><td><strong>b) dilemme</strong></td><td>Le mot vient du grec <em>dilemma</em> (« double proposition ») : deux <em>m</em>, comme <em>lemme</em>. « Dilemne » est une faute très répandue, sans doute par analogie avec <em>indemne</em>.</td></tr>
<tr><td>32</td><td><strong>b) pallier</strong></td><td><em>Pallier</em> est transitif direct : on pallie un manque, une difficulté. « Pallier à » est une faute d'usage, par confusion avec <em>remédier à</em>. <em>Palier</em> (un seul <em>l</em>) est un nom : le palier d'un escalier, un palier de progression.</td></tr>
<tr><td>33</td><td><strong>a) décelé</strong></td><td><em>Déceler</em> signifie « découvrir ce qui était caché ». <em>Desceller</em> signifie « détacher ce qui était scellé » (desceller une plaque). Ce sont des paronymes, presque homophones. <em>Desselé</em> n'est pas une forme correcte.</td></tr>
<tr><td>34</td><td><strong>c) soutenu</strong></td><td>Emploi de <em>ne</em> seul, sans <em>pas</em>, avec le verbe <em>savoir</em> au conditionnel : tournure soutenue, au sens de « je ne suis pas en mesure de vous dire ».</td></tr>
<tr><td>35</td><td><strong>a) fait</strong></td><td>Le participe passé <em>fait</em> suivi d'un infinitif est <strong>toujours invariable</strong> : « les documents que j'ai fait imprimer ». Les documents ne font pas l'action d'imprimer ; ils la subissent, et c'est la locution <em>faire imprimer</em> tout entière qui a pour COD <em>que</em>. Depuis les rectifications de 1990, la même invariabilité est recommandée pour <em>laissé</em> suivi d'un infinitif.</td></tr>
<tr><td>36</td><td><strong>a) date limite</strong></td><td>Équivalents français usuels : <em>date limite</em>, <em>échéance</em>, <em>date butoir</em>. Les propositions b) et c) sont des traductions littérales sans existence en français.</td></tr>
<tr><td>37</td><td><strong>b) soit</strong></td><td><em>Bien que</em> exige le subjonctif : « bien qu'il soit arrivé » (subjonctif passé, qui marque l'antériorité). L'indicatif (« est », « était ») est fautif après <em>bien que</em>. Le subjonctif plus-que-parfait (« fût arrivé ») relève de la langue littéraire.</td></tr>
<tr><td>38</td><td><strong>a)</strong></td><td><em>Collaborer</em> signifie déjà « travailler avec » (préfixe <em>col-</em>, de <em>cum</em>, « avec ») : « collaborer ensemble » est un pléonasme. La phrase c) est correcte, car <em>travailler</em> ne contient pas l'idée de « avec ».</td></tr>
<tr><td>39</td><td><strong>b) trois mille euros</strong></td><td><em>Mille</em>, adjectif numéral, est <strong>invariable</strong>. Ne pas le confondre avec le nom <em>mille</em> (unité de distance), qui varie (« trois milles marins »). <em>Mil</em> est une variante ancienne, employée parfois dans les dates (« l'an mil »).</td></tr>
<tr><td>40</td><td><strong>b) avec qui</strong></td><td>On travaille <em>avec</em> quelqu'un : le pronom relatif doit être précédé de la préposition <em>avec</em>. Pour des personnes, on emploie <em>avec qui</em> ou <em>avec lesquels</em>. <em>Que</em> (COD) et <em>dont</em> (complément introduit par <em>de</em>) ne conviennent pas à cette construction.</td></tr>
</tbody>
</table>
<h3>Série E – Phrases à corriger (items 41 à 50)</h3>
<p><strong>Item 41 – Correcte.</strong> « Les documents que vous m'avez transmis » : le COD <em>que</em> (mis pour <em>documents</em>, masculin pluriel) est placé avant ; <em>transmis</em> s'écrit avec un <em>s</em> au masculin singulier comme au pluriel. L'adjectif <em>complets</em> s'accorde avec <em>documents</em>.</p>
<p><strong>Item 42 – Elle s'est permis.</strong> On permet quelque chose <strong>à</strong> quelqu'un : dans <em>se permettre</em>, le pronom <em>se</em> est complément d'objet indirect (« elle a permis <em>à elle-même</em> »). Le COD est l'infinitif <em>de modifier le planning</em>, placé après : le participe reste invariable. Même règle pour <em>se rendre compte</em> (« elle s'est rendu compte »).</p>
<p><strong>Item 43 – les chiffres que vous avez demandés.</strong> Participe passé avec <em>avoir</em>, COD <em>que</em> (mis pour <em>chiffres</em>, masculin pluriel) placé avant : accord au masculin pluriel.</p>
<p><strong>Item 44 – Si j'avais su.</strong> Après le <em>si</em> de condition, on n'emploie <strong>jamais</strong> le futur ni le conditionnel. Le système est : <em>si</em> + imparfait → conditionnel présent ; <em>si</em> + plus-que-parfait → conditionnel passé. « Si j'avais su, je serais venu plus tôt. » Formule mnémotechnique : « Les <em>si</em> n'aiment pas les <em>-rais</em>. »</p>
<p><strong>Item 45 – Quelle que soit votre décision.</strong> Devant le verbe <em>être</em> (ou <em>pouvoir être, devoir être</em>) au subjonctif, on écrit <em>quel que</em> en deux mots, et <em>quel</em> s'accorde avec le sujet du verbe : <em>décision</em>, féminin singulier, d'où <em>quelle que</em>. <em>Quelque</em> en un mot s'emploie devant un nom (« quelques difficultés ») ou, adverbe invariable, devant un adjectif ou un nombre au sens de « environ » ou « si » (« quelque cent personnes » ; « quelque compétents qu'ils soient »).</p>
<p><strong>Item 46 – Correcte.</strong> <em>Sortir</em>, employé sans COD, se conjugue avec <em>être</em> : « il est sorti ». On écrit « 11 heures » en toutes lettres ou « 11 h » avec le symbole ; les deux sont corrects.</p>
<p><strong>Item 47 – après qu'il sera parti.</strong> <em>Après que</em> introduit un fait présenté comme réalisé : il se construit avec l'<strong>indicatif</strong>, contrairement à <em>avant que</em>, qui exige le subjonctif. L'action de partir étant antérieure à une action future (<em>fermerons</em>), on emploie le futur antérieur : « après qu'il sera parti ». L'emploi du subjonctif après <em>après que</em>, très répandu à l'oral, est considéré comme fautif dans la langue soignée.</p>
<p><strong>Item 48 – Je me rappelle cette réunion.</strong> <em>Se rappeler</em> est transitif direct : on se rappelle quelque chose. On peut aussi écrire « Je me souviens de cette réunion », car <em>se souvenir</em> se construit avec <em>de</em>. Le croisement des deux constructions (« se rappeler de ») est fautif dans un écrit soigné. L'usage admet toutefois <em>se rappeler de</em> devant un pronom personnel désignant une personne (« je me rappelle de vous ») ; devant un infinitif, la construction directe est recommandée (« je me rappelle avoir signé »).</p>
<p><strong>Item 49 – Correcte.</strong> Interrogation directe introduite par <em>pourriez-vous</em> (inversion du sujet, conditionnel de politesse), suivie d'une interrogation indirecte « où se trouve la salle B » : dans l'interrogation indirecte, l'inversion du sujet nominal après <em>où</em> est possible et courante. Le point d'interrogation final se justifie, car la phrase principale est interrogative.</p>
<p><strong>Item 50 – se sont succédé.</strong> On succède <strong>à</strong> quelqu'un : dans <em>se succéder</em>, le pronom <em>se</em> est complément d'objet indirect. Le participe passé reste invariable : « Les deux salariées se sont succédé à ce poste. » Même règle qu'à l'item 15 (<em>se téléphoner</em>).</p>
<h3>Tableau récapitulatif des règles mobilisées</h3>
<table>
<thead><tr><th>Règle</th><th>Items concernés</th><th>Chapitre</th></tr></thead>
<tbody>
<tr><td>Orthographe d'usage et locutions</td><td>1 à 10, 28, 31, 39</td><td>2</td></tr>
<tr><td>Homophones grammaticaux (quant/quand, dès/des, quel que/quelque)</td><td>12, 19, 26, 28, 45</td><td>3</td></tr>
<tr><td>Accord du participe passé (avoir, être, pronominaux, fait + infinitif)</td><td>15, 16, 21, 22, 23, 27, 35, 41, 42, 43, 50</td><td>4</td></tr>
<tr><td>Modes et temps (subjonctif, futur antérieur, système hypothétique, après que)</td><td>13, 17, 18, 37, 44, 47</td><td>4</td></tr>
<tr><td>Infinitif, participe ou forme conjuguée</td><td>23, 27, 30</td><td>3 et 4</td></tr>
<tr><td>Vocabulaire (paronymes, pléonasmes, anglicismes, registres)</td><td>32, 33, 34, 36, 38</td><td>5 et 7</td></tr>
<tr><td>Construction (relatifs, interrogation indirecte, constructions verbales)</td><td>11, 20, 40, 48, 49</td><td>6</td></tr>
<tr><td>Accord de <em>tout</em>, des adjectifs, impersonnel</td><td>14, 25, 29</td><td>3</td></tr>
</tbody>
</table>
<p>Reportez dans ce tableau les numéros des items que vous avez manqués : la ou les lignes les plus chargées indiquent les chapitres à reprendre en priorité dans votre plan de révision.</p>`,
      },
      {
        title: "8.7 – Construire son plan de révision individuel",
        content: `<h3>Principe : réviser ce que l'on ne sait pas encore</h3>
<p>Le temps de révision est limité ; il doit être consacré en priorité aux règles qui coûtent des points. Relire l'ensemble du cours de manière uniforme est rassurant, mais peu efficace : on relit surtout ce que l'on sait déjà. Le plan de révision individuel part donc du <strong>diagnostic</strong> établi grâce à l'examen blanc (sections 8.3 à 8.6) et au carnet d'erreurs.</p>
<h3>Étape 1 – Établir son profil à partir de l'examen blanc</h3>
<table>
<thead><tr><th>Résultat par série (sur 10)</th><th>Interprétation</th><th>Priorité</th></tr></thead>
<tbody>
<tr><td>9 ou 10</td><td>Type d'exercice maîtrisé</td><td>Entretien : une série courte par semaine</td></tr>
<tr><td>7 ou 8</td><td>Bonne maîtrise, quelques règles à consolider</td><td>Moyenne : reprendre les règles des items manqués</td></tr>
<tr><td>5 ou 6</td><td>Maîtrise fragile</td><td>Haute : reprendre le chapitre correspondant</td></tr>
<tr><td>4 ou moins</td><td>Lacunes importantes</td><td>Très haute : reprendre les bases du chapitre avec des exercices progressifs</td></tr>
</tbody>
</table>
<p>Croisez ce résultat avec le tableau récapitulatif de la section 8.6, qui indique, pour chaque famille de règles, les items concernés et le chapitre de référence.</p>
<h3>Étape 2 – Fixer son objectif</h3>
<p>Choisissez le palier de score visé en fonction de votre métier et de votre projet (section 8.1). L'objectif oriente l'effort : pour viser le palier 450–599, il faut d'abord sécuriser les règles les plus courantes (homophones grammaticaux, accords de base, participe passé avec <em>être</em> et <em>avoir</em> dans les cas simples) ; pour viser 750 et plus, il faut en outre maîtriser les cas difficiles (verbes pronominaux, participe suivi d'un infinitif, subjonctif après les locutions, paronymes, constructions verbales rares).</p>
<h3>Étape 3 – Planifier des séances courtes et régulières</h3>
<p>La mémorisation des règles d'orthographe repose sur la répétition espacée : revoir une règle à plusieurs reprises, à intervalles de plus en plus longs, est plus efficace qu'une longue séance unique. Un format éprouvé en formation est la séance de vingt à trente minutes, quatre ou cinq fois par semaine.</p>
<table>
<thead><tr><th>Temps de la séance</th><th>Activité</th></tr></thead>
<tbody>
<tr><td>5 minutes</td><td>Relecture du carnet d'erreurs (les dix dernières entrées)</td></tr>
<tr><td>10 minutes</td><td>Étude d'une règle prioritaire : lecture de la section du cours, exemples et contre-exemples</td></tr>
<tr><td>10 minutes</td><td>Série d'exercices sur cette règle, chronométrée</td></tr>
<tr><td>5 minutes</td><td>Correction et mise à jour du carnet d'erreurs</td></tr>
</tbody>
</table>
<h3>Étape 4 – Répartir les révisions sur plusieurs semaines</h3>
<p>Exemple de plan sur quatre semaines pour un profil qui a obtenu : A = 8, B = 6, C = 5, D = 7, E = 4.</p>
<table>
<thead><tr><th>Semaine</th><th>Priorités</th><th>Chapitres</th><th>Contrôle en fin de semaine</th></tr></thead>
<tbody>
<tr><td>1</td><td>Participe passé avec <em>avoir</em> et <em>être</em> ; terminaisons en [e]</td><td>4 (et 3 pour <em>-é/-er</em>)</td><td>Série de 20 phrases à corriger</td></tr>
<tr><td>2</td><td>Verbes pronominaux ; participe suivi d'un infinitif ; subjonctif après les locutions</td><td>4</td><td>Série de 20 phrases à compléter</td></tr>
<tr><td>3</td><td>Homophones grammaticaux ; constructions verbales ; relatifs</td><td>3 et 6</td><td>Série de 10 phrases après écoute (transcription lue par un tiers)</td></tr>
<tr><td>4</td><td>Révision du carnet d'erreurs ; paronymes et pléonasmes ; nouvel examen blanc</td><td>5 et 8</td><td>Examen blanc refait sans regarder les réponses précédentes</td></tr>
</tbody>
</table>
<h3>Étape 5 – Utiliser des outils fiables</h3>
<ul>
<li><strong>Un dictionnaire de référence</strong>, papier ou en ligne, pour l'orthographe, le genre et la construction des mots. Consultez l'article entier : il indique souvent la construction du verbe (transitif direct ou indirect) et des exemples.</li>
<li><strong>Un conjugueur</strong>, pour vérifier les formes verbales rares (passé simple, subjonctif imparfait, verbes défectifs).</li>
<li><strong>Une grammaire de référence</strong>, pour les règles d'accord complexes.</li>
<li><strong>Le correcteur orthographique</strong> du traitement de texte : utile pour repérer les fautes de frappe, mais insuffisant pour les homophones et les accords ; il ne remplace pas la relecture. Il ne sera évidemment d'aucune aide pendant l'épreuve.</li>
</ul>
<blockquote><strong>Bonne pratique</strong> – Dans votre travail quotidien, transformez chaque écrit professionnel en exercice : avant d'envoyer un courriel, relisez-le en appliquant la méthode des quatre passages (verbe, participes, mots grammaticaux, sens). Vous réviserez ainsi quotidiennement, sans temps supplémentaire, sur des phrases qui ont un véritable enjeu.</blockquote>
<h3>Étape 6 – Préparer les derniers jours</h3>
<ul>
<li>Ne commencez pas l'étude de règles nouvelles la veille de l'épreuve : relisez le carnet d'erreurs et les tableaux de synthèse.</li>
<li>Vérifiez les informations pratiques communiquées lors de l'inscription auprès du certificateur (date, horaire, modalités techniques, pièces à présenter éventuellement).</li>
<li>Prévoyez des conditions calmes et un équipement d'écoute en état de marche si l'épreuve se passe à distance ou dans un lieu que vous ne connaissez pas.</li>
</ul>
<h3>Modèle de fiche de plan de révision</h3>
<table>
<thead><tr><th>Rubrique</th><th>À compléter</th></tr></thead>
<tbody>
<tr><td>Palier de score visé et raison</td><td></td></tr>
<tr><td>Résultats de l'examen blanc par série (A à E)</td><td></td></tr>
<tr><td>Trois familles de règles prioritaires</td><td></td></tr>
<tr><td>Nombre de séances par semaine et durée</td><td></td></tr>
<tr><td>Date de l'épreuve (communiquée lors de l'inscription)</td><td></td></tr>
<tr><td>Dates des examens blancs de contrôle</td><td></td></tr>
<tr><td>Outils utilisés</td><td></td></tr>
</tbody>
</table>`,
      },
      {
        title: "8.8 – Glossaire grammatical",
        content: `<h3>Pourquoi un glossaire ?</h3>
<p>Les règles d'orthographe s'énoncent avec un vocabulaire précis : on ne peut appliquer la règle d'accord du participe passé que si l'on sait reconnaître un complément d'objet direct. Ce glossaire rassemble, par ordre alphabétique, les termes employés dans l'ensemble du support de cours. Chaque définition est accompagnée d'un exemple ; les éléments concernés sont en gras.</p>
<table>
<thead><tr><th>Terme</th><th>Définition</th><th>Exemple</th></tr></thead>
<tbody>
<tr><td>Accord</td><td>Variation de forme d'un mot (genre, nombre, personne) en fonction d'un autre mot dont il dépend.</td><td>Les factures <strong>envoyées</strong> (accord avec <em>factures</em>).</td></tr>
<tr><td>Adjectif qualificatif</td><td>Mot qui exprime une qualité du nom auquel il se rapporte et qui s'accorde avec lui.</td><td>Un rapport <strong>précis</strong>, des notes <strong>précises</strong>.</td></tr>
<tr><td>Adjectif verbal</td><td>Adjectif issu d'un participe présent, variable, exprimant un état ; son orthographe diffère parfois de celle du participe.</td><td>Des arguments <strong>convaincants</strong> (participe : <em>convainquant</em>).</td></tr>
<tr><td>Adverbe</td><td>Mot invariable qui modifie le sens d'un verbe, d'un adjectif, d'un autre adverbe ou d'une phrase.</td><td>Il répond <strong>rapidement</strong>.</td></tr>
<tr><td>Anglicisme</td><td>Mot, sens ou construction emprunté à l'anglais, souvent remplaçable par un équivalent français.</td><td><em>Deadline</em> → <strong>date limite</strong>.</td></tr>
<tr><td>Antécédent</td><td>Mot ou groupe de mots que reprend un pronom, notamment un pronom relatif.</td><td>Le <strong>dossier</strong> que je traite.</td></tr>
<tr><td>Apposition</td><td>Mot ou groupe placé à côté d'un nom, généralement entre virgules, qui le caractérise.</td><td>Mme Delorme, <strong>directrice</strong>, a signé.</td></tr>
<tr><td>Attribut du sujet</td><td>Mot ou groupe qui exprime une caractéristique du sujet par l'intermédiaire d'un verbe d'état (<em>être, paraître, sembler, devenir, rester</em>).</td><td>Les pièces sont <strong>complètes</strong>.</td></tr>
<tr><td>Auxiliaire</td><td>Verbe (<em>être</em> ou <em>avoir</em>) qui sert à former les temps composés et la voix passive.</td><td>Elle <strong>a</strong> signé ; elle <strong>est</strong> partie.</td></tr>
<tr><td>Barbarisme</td><td>Mot qui n'existe pas ou forme fautive d'un mot existant.</td><td>« Ils croivent » pour <strong>ils croient</strong>.</td></tr>
<tr><td>Complément circonstanciel</td><td>Complément qui précise les circonstances de l'action (temps, lieu, cause, but, manière…), généralement déplaçable et supprimable.</td><td>Nous signerons <strong>demain</strong>.</td></tr>
<tr><td>Complément d'objet direct (COD)</td><td>Complément du verbe construit sans préposition ; il répond à la question « quoi ? » ou « qui ? » posée après le verbe.</td><td>J'envoie <strong>le devis</strong>.</td></tr>
<tr><td>Complément d'objet indirect (COI)</td><td>Complément du verbe introduit par une préposition (<em>à, de</em>…).</td><td>Je téléphone <strong>à la cliente</strong>.</td></tr>
<tr><td>Complément du nom</td><td>Mot ou groupe qui complète un nom, souvent introduit par une préposition.</td><td>Le bon <strong>de commande</strong>.</td></tr>
<tr><td>Concordance des temps</td><td>Ensemble des règles qui fixent le temps du verbe d'une subordonnée en fonction du temps du verbe principal.</td><td>Elle a dit qu'elle <strong>viendrait</strong>.</td></tr>
<tr><td>Conditionnel</td><td>Mode (ou, selon les grammaires, temps de l'indicatif) qui exprime une éventualité, un fait soumis à condition, une demande atténuée ou le futur dans le passé.</td><td><strong>Pourriez</strong>-vous m'aider ?</td></tr>
<tr><td>Conjonction de coordination</td><td>Mot invariable qui relie deux éléments de même fonction : <em>mais, ou, et, donc, or, ni, car</em>.</td><td>Il est absent, <strong>mais</strong> joignable.</td></tr>
<tr><td>Conjonction de subordination</td><td>Mot ou locution invariable qui introduit une proposition subordonnée : <em>que, quand, si, bien que, afin que</em>…</td><td><strong>Bien qu'</strong>il soit tard…</td></tr>
<tr><td>Déterminant</td><td>Mot placé devant le nom, qui en précise le genre, le nombre et la valeur (article, possessif, démonstratif, interrogatif…).</td><td><strong>Ces</strong> dossiers, <strong>ses</strong> notes.</td></tr>
<tr><td>Discours indirect</td><td>Manière de rapporter des paroles dans une subordonnée, sans guillemets, avec adaptation des pronoms et des temps.</td><td>Il a précisé <strong>qu'il rappellerait</strong>.</td></tr>
<tr><td>Élision</td><td>Remplacement d'une voyelle finale par une apostrophe devant un mot commençant par une voyelle ou un <em>h</em> muet.</td><td><strong>L'</strong>accueil, <strong>s'il</strong> vient.</td></tr>
<tr><td>Épicène</td><td>Se dit d'un nom ou d'un adjectif dont la forme est identique au masculin et au féminin.</td><td>Un ou une <strong>stagiaire</strong>, <strong>responsable</strong>.</td></tr>
<tr><td>Épithète</td><td>Adjectif placé directement à côté du nom, sans verbe intermédiaire.</td><td>Un délai <strong>raisonnable</strong>.</td></tr>
<tr><td>Gérondif</td><td>Forme verbale invariable composée de <em>en</em> et du participe présent ; son sujet implicite est celui du verbe principal.</td><td><strong>En relisant</strong>, j'ai vu l'erreur.</td></tr>
<tr><td>Groupe nominal</td><td>Ensemble formé d'un nom noyau et des mots qui en dépendent (déterminant, adjectifs, compléments).</td><td><strong>Les deux devis signés hier</strong>.</td></tr>
<tr><td>Homophone</td><td>Mot qui se prononce comme un autre, mais qui s'écrit différemment et a un autre sens.</td><td><strong>Ces</strong> / <strong>ses</strong> / <strong>c'est</strong>.</td></tr>
<tr><td>Impératif</td><td>Mode de l'ordre, du conseil ou de la demande, sans sujet exprimé.</td><td><strong>Veuillez</strong> trouver ci-joint…</td></tr>
<tr><td>Impersonnel (verbe ou tournure)</td><td>Construction dont le sujet <em>il</em> ne représente rien ; le verbe reste au singulier.</td><td><strong>Il manque</strong> deux pièces.</td></tr>
<tr><td>Indicatif</td><td>Mode qui présente un fait comme réel, dans le passé, le présent ou le futur.</td><td>Après qu'il <strong>sera</strong> parti.</td></tr>
<tr><td>Infinitif</td><td>Forme non conjuguée du verbe, qui exprime l'action sans indication de personne ni de temps.</td><td>Merci de <strong>rappeler</strong>.</td></tr>
<tr><td>Interrogation indirecte</td><td>Question rapportée dans une subordonnée, sans inversion ni point d'interrogation.</td><td>Elle demande <strong>si</strong> nous viendrons.</td></tr>
<tr><td>Invariable</td><td>Se dit d'un mot dont la forme ne varie jamais.</td><td><strong>Néanmoins</strong>, <strong>parmi</strong>, <strong>volontiers</strong>.</td></tr>
<tr><td>Locution</td><td>Groupe de mots figé qui fonctionne comme un seul mot.</td><td><strong>Au fur et à mesure</strong>, <strong>quant à</strong>.</td></tr>
<tr><td>Mode</td><td>Forme du verbe qui exprime la manière dont le locuteur présente l'action : indicatif, subjonctif, impératif, conditionnel, infinitif, participe.</td><td>Il faut que vous <strong>veniez</strong> (subjonctif).</td></tr>
<tr><td>Nominalisation</td><td>Transformation d'un verbe ou d'un adjectif en nom.</td><td>Réviser → <strong>révision</strong>.</td></tr>
<tr><td>Paronyme</td><td>Mot de forme et de prononciation proches d'un autre, mais de sens différent.</td><td><strong>Éminent</strong> / <strong>imminent</strong>.</td></tr>
<tr><td>Participe passé</td><td>Forme verbale employée avec un auxiliaire dans les temps composés ou seule comme adjectif ; elle peut s'accorder.</td><td>Les clients <strong>reçus</strong>.</td></tr>
<tr><td>Participe présent</td><td>Forme verbale en <em>-ant</em>, invariable, qui exprime une action.</td><td>Les clients <strong>souhaitant</strong> un devis…</td></tr>
<tr><td>Pléonasme</td><td>Répétition inutile d'une même idée dans un énoncé.</td><td>« <strong>Monter en haut</strong> », « <strong>collaborer ensemble</strong> ».</td></tr>
<tr><td>Préposition</td><td>Mot invariable qui introduit un complément : <em>à, de, pour, par, avec, sans, dès</em>…</td><td>Il viendra <strong>dès</strong> lundi.</td></tr>
<tr><td>Pronom personnel</td><td>Pronom qui désigne les personnes de la conjugaison ou reprend un nom : <em>je, tu, il, nous, le, la, lui, leur</em>…</td><td>Je <strong>leur</strong> écris.</td></tr>
<tr><td>Pronom relatif</td><td>Pronom qui reprend un antécédent et introduit une subordonnée relative : <em>qui, que, quoi, dont, où, lequel</em>…</td><td>Le projet <strong>dont</strong> je parle.</td></tr>
<tr><td>Proposition subordonnée</td><td>Proposition qui dépend d'une autre (la principale) et qui est introduite par un subordonnant.</td><td>Je pense <strong>qu'il viendra</strong>.</td></tr>
<tr><td>Radical</td><td>Partie du verbe qui porte le sens et à laquelle s'ajoutent les terminaisons.</td><td><strong>envoy</strong>-er, <strong>enverr</strong>-ai.</td></tr>
<tr><td>Rectifications orthographiques de 1990</td><td>Ensemble de modifications orthographiques proposées par le Conseil supérieur de la langue française et publiées au <em>Journal officiel</em> ; les graphies traditionnelles et rectifiées sont toutes deux admises.</td><td><strong>Évènement</strong> ou événement ; <strong>il apparait</strong> ou il apparaît.</td></tr>
<tr><td>Registre de langue</td><td>Niveau d'expression choisi en fonction de la situation : familier, courant, soutenu.</td><td>« Boulot » / « travail » / « labeur ».</td></tr>
<tr><td>Solécisme</td><td>Faute de construction de la phrase (syntaxe), portant sur des mots qui existent par ailleurs.</td><td>« Si j'aurais su » pour <strong>si j'avais su</strong>.</td></tr>
<tr><td>Subjonctif</td><td>Mode qui présente un fait comme envisagé, souhaité, craint ou nécessaire, souvent après <em>que</em>.</td><td>Il faut que nous <strong>prenions</strong>…</td></tr>
<tr><td>Sujet</td><td>Mot ou groupe qui commande l'accord du verbe ; il répond à la question « qui est-ce qui ? » ou « qu'est-ce qui ? » posée avant le verbe.</td><td><strong>Les devis</strong> arrivent.</td></tr>
<tr><td>Terminaison</td><td>Partie finale du verbe, qui varie selon la personne, le temps et le mode.</td><td>Vous envoy<strong>ez</strong>.</td></tr>
<tr><td>Trait d'union</td><td>Signe qui unit des mots formant une unité (noms composés, inversion du sujet, nombres).</td><td><strong>Rendez-vous</strong>, <strong>pourriez-vous</strong>, <strong>vingt-deux</strong>.</td></tr>
<tr><td>Verbe pronominal</td><td>Verbe accompagné d'un pronom réfléchi de la même personne que le sujet (<em>me, te, se, nous, vous</em>).</td><td>Elles <strong>se sont téléphoné</strong>.</td></tr>
<tr><td>Verbe transitif / intransitif</td><td>Un verbe transitif admet un complément d'objet (direct ou indirect) ; un verbe intransitif n'en admet pas.</td><td><em>Pallier</em> un problème (transitif direct) ; il <strong>part</strong> (intransitif).</td></tr>
<tr><td>Voix passive</td><td>Construction où le sujet subit l'action, formée de l'auxiliaire <em>être</em> et du participe passé, qui s'accorde avec le sujet.</td><td>Les brochures <strong>seront distribuées</strong>.</td></tr>
</tbody>
</table>
<p>Le glossaire compte cinquante-quatre entrées. Pour vous l'approprier, choisissez dix termes que vous employez rarement et rédigez pour chacun un exemple tiré de vos propres écrits professionnels.</p>`,
      },
      {
        title: "8.9 – Quiz de fin de chapitre",
        content: `<h3>Dix questions pour vérifier vos acquis</h3>
<p>Répondez sans consulter le cours, puis comparez avec le corrigé expliqué.</p>
<ol>
<li>Combien de questions l'épreuve officielle de la Certification en langue française Le Robert comporte-t-elle, et comment est-elle corrigée ?</li>
<li>Sur combien de points le score est-il établi, et en dessous de quel score la certification n'est-elle pas délivrée ?</li>
<li>Citez les cinq types d'exercices de l'épreuve.</li>
<li>Quelle est la durée de l'épreuve, et comment en déduire son rythme de travail ?</li>
<li>La certification prévoit-elle une validation partielle ?</li>
<li>Complétez : « Les deux associées se sont ___ (parler) longuement avant de signer. »</li>
<li>Laquelle de ces phrases est correcte ?<br>a) « Quelque soient les délais, nous livrerons. »<br>b) « Quels que soient les délais, nous livrerons. »<br>c) « Quelques soient les délais, nous livrerons. »</li>
<li>Dans un exercice de phrases à corriger, que faites-vous si, après une relecture méthodique, vous ne trouvez aucune règle enfreinte ?</li>
<li>Complétez : « Nous partirons après que vous ___ (finir) la présentation. » (un ou deux mots)</li>
<li>Qu'est-ce qu'un solécisme ? Donnez un exemple et sa correction.</li>
</ol>
<h3>Corrigé expliqué</h3>
<ol>
<li><strong>350 questions, à correction automatique</strong>, dans le cadre d'une épreuve en ligne. Ces éléments figurent dans la fiche de la certification RS7013.</li>
<li><strong>Sur 1 000 points.</strong> En dessous de <strong>450 points</strong>, la certification n'est pas délivrée et une formation complémentaire est conseillée. Les paliers suivants (450–599, 600–749, 750–899, 900 et plus) décrivent des niveaux de maîtrise croissants.</li>
<li>La dictée de mots et d'expressions ; les phrases à compléter en insérant un mot ; les phrases à compléter après avoir écouté un enregistrement ; les questions à choix multiple ; les phrases à corriger si l'on estime qu'elles comportent une erreur.</li>
<li>La durée n'est pas indiquée dans ce cours : elle est <strong>précisée lors de l'inscription auprès du certificateur</strong>. Une fois connue, on divise cette durée par 350 pour obtenir le temps moyen disponible par question, ce qui permet de savoir quand cesser d'hésiter sur un item.</li>
<li><strong>Non.</strong> La fiche de la certification ne prévoit pas de validation partielle : le résultat est un score global.</li>
<li><strong>parlé.</strong> On parle <em>à</em> quelqu'un : <em>se</em> est complément d'objet indirect, le participe passé reste invariable (« elles se sont parlé »).</li>
<li><strong>b)</strong> Devant le verbe <em>être</em> au subjonctif, on écrit <em>quel que</em> en deux mots, <em>quel</em> s'accordant avec le sujet <em>délais</em> (masculin pluriel) : <em>quels que soient</em>.</li>
<li>On considère la phrase comme <strong>correcte</strong> et on ne la modifie pas. Corriger une phrase juste est une erreur aussi coûteuse que laisser passer une faute ; on ne modifie une réponse que si l'on peut nommer la règle enfreinte.</li>
<li><strong>aurez fini.</strong> <em>Après que</em> se construit avec l'indicatif ; l'action de finir est antérieure à une action future (<em>partirons</em>) : futur antérieur. Le subjonctif « ayez fini » est fautif dans la langue soignée.</li>
<li>Un <strong>solécisme</strong> est une faute de construction de la phrase, portant sur des mots qui existent : par exemple « Si j'aurais su » (conditionnel après le <em>si</em> de condition), corrigé en « Si j'avais su ». À distinguer du <strong>barbarisme</strong>, qui porte sur la forme d'un mot (« ils croivent » pour « ils croient »).</li>
</ol>
<p><strong>Barème indicatif :</strong> 9 ou 10 bonnes réponses : vous êtes prêt à aborder la phase de consolidation ; 6 à 8 : relisez les sections 8.1, 8.2 et le corrigé de l'examen blanc ; moins de 6 : reprenez le chapitre avant de refaire l'examen blanc.</p>`,
      },
      {
        title: "8.10 – Cas pratique corrigé : préparer Inès et Karim à la certification",
        content: `<h3>Contexte</h3>
<blockquote><strong>Fil rouge – Ardoise &amp; Plume (entreprise fictive)</strong> – Mme Delorme, directrice d'Ardoise &amp; Plume, PME fictive de services installée à Nantes, souhaite que deux membres de son équipe préparent la Certification en langue française Le Robert : Inès, assistante de direction, qui relit la plupart des courriers de l'entreprise, et Karim, conseiller commercial, qui rédige de nombreux courriels et devis. Tous deux ont passé l'examen blanc de cinquante items de ce chapitre. Mme Delorme demande à Inès de lui adresser une proposition de plan de préparation pour chacun d'eux. <em>Personnages, résultats et entreprise sont fictifs.</em></blockquote>
<h3>Document 1 – Résultats de l'examen blanc</h3>
<table>
<thead><tr><th>Série</th><th>Inès</th><th>Karim</th></tr></thead>
<tbody>
<tr><td>A – Dictée de mots et d'expressions</td><td>9 / 10</td><td>6 / 10</td></tr>
<tr><td>B – Phrases à compléter</td><td>9 / 10</td><td>6 / 10</td></tr>
<tr><td>C – Phrases à compléter après écoute</td><td>9 / 10</td><td>6 / 10</td></tr>
<tr><td>D – Questions à choix multiple</td><td>9 / 10</td><td>8 / 10</td></tr>
<tr><td>E – Phrases à corriger</td><td>7 / 10</td><td>6 / 10</td></tr>
<tr><td><strong>Total</strong></td><td><strong>43 / 50</strong></td><td><strong>32 / 50</strong></td></tr>
</tbody>
</table>
<h3>Document 2 – Relevé des erreurs</h3>
<p><strong>Inès :</strong> item 7 « un interval » ; item 15 « se sont téléphonées » ; item 23 « être validé » ; item 35 « faits » ; items 42, 47 et 50 jugés corrects à tort.</p>
<p><strong>Karim :</strong> item 4 « en l'occurence » ; item 5 « dorénnavant » ; item 8 « la connection » ; item 10 « quoiqu'il arrive » ; item 13 « soyiez » ; item 17 « prennions » ; item 18 « aurait » ; item 19 « Qu'elles » ; item 21 « renvoyé » ; item 23 « valider » ; item 27 « distribuer » ; item 30 « rappelé » ; item 32 « pallier à » ; item 38 réponse c) ; item 44 jugé correct à tort ; item 45 « Quelque soit » conservé ; item 46 corrigé à tort en « il est sortit » ; item 48 jugé correct à tort.</p>
<h3>Travail demandé</h3>
<ol>
<li>Analysez le profil de chacun et proposez un palier de score visé, en vous appuyant sur les exemples de métiers cités dans la fiche de la certification.</li>
<li>Regroupez les erreurs de chacun par famille de règles.</li>
<li>Proposez un plan de révision de quatre semaines pour chacun.</li>
<li>Rédigez le courriel d'Inès à Mme Delorme présentant ces propositions.</li>
</ol>
<h3>Corrigé – 1. Analyse des profils et objectifs</h3>
<p><strong>Inès</strong> obtient 43 sur 50, avec des résultats homogènes et une seule série en retrait (E, phrases à corriger). Ses erreurs portent presque toutes sur des cas difficiles du participe passé et des modes : elle maîtrise les règles courantes. La fiche de la certification cite les secrétaires de direction parmi les exemples du palier <strong>750–899</strong> (aisance, production et correction fiables de tous documents, personne référente) : cet objectif est cohérent avec son rôle de relectrice des courriers de l'entreprise.</p>
<p><strong>Karim</strong> obtient 32 sur 50. Ses résultats sont plus faibles en dictée, en phrases à compléter et après écoute : ses erreurs portent à la fois sur l'orthographe d'usage, les terminaisons verbales et les modes. Les conseillers commerciaux figurent parmi les exemples du palier <strong>600–749</strong> (rédiger et communiquer par écrit de façon autonome) : c'est un objectif réaliste, à condition de consolider d'abord les bases.</p>
<p>Rappel : le résultat de l'examen blanc est un diagnostic et ne permet pas de prédire le score officiel sur 1 000 points.</p>
<h3>Corrigé – 2. Regroupement des erreurs par famille</h3>
<table>
<thead><tr><th>Famille de règles</th><th>Erreurs d'Inès</th><th>Erreurs de Karim</th></tr></thead>
<tbody>
<tr><td>Orthographe d'usage (chapitre 2)</td><td>7 (<em>intervalle</em>)</td><td>4, 5, 8 (<em>occurrence, dorénavant, connexion</em>)</td></tr>
<tr><td>Homophones grammaticaux (chapitre 3)</td><td>–</td><td>10, 19, 45 (<em>quoi que, quelles, quelle que</em>)</td></tr>
<tr><td>Infinitif ou participe (chapitres 3 et 4)</td><td>23</td><td>23, 27, 30</td></tr>
<tr><td>Participe passé avec <em>avoir</em> (chapitre 4)</td><td>–</td><td>21</td></tr>
<tr><td>Verbes pronominaux et participe suivi d'un infinitif (chapitre 4)</td><td>15, 35, 42, 50</td><td>–</td></tr>
<tr><td>Modes et temps (chapitre 4)</td><td>47</td><td>13, 17, 18, 44</td></tr>
<tr><td>Vocabulaire et pléonasmes (chapitre 5)</td><td>–</td><td>38</td></tr>
<tr><td>Constructions verbales (chapitres 5 et 6)</td><td>–</td><td>32, 48 (<em>pallier</em> transitif direct, <em>se rappeler</em> transitif direct)</td></tr>
<tr><td>Conjugaison de base</td><td>–</td><td>46 (<em>il est sorti</em> : participe en <em>-i</em>)</td></tr>
</tbody>
</table>
<p><strong>Rappel des corrections :</strong> <em>un intervalle</em> (masculin, deux <em>l</em>, <em>e</em> final) ; <em>elles se sont téléphoné</em> (COI, invariable) ; <em>doivent être validées</em> (participe accordé avec le sujet) ; <em>les documents que j'ai fait imprimer</em> (<em>fait</em> + infinitif, invariable) ; <em>elle s'est permis</em> ; <em>après qu'il sera parti</em> ; <em>elles se sont succédé</em> ; <em>en l'occurrence</em> ; <em>dorénavant</em> ; <em>la connexion</em> ; <em>quoi qu'il arrive</em> ; <em>que vous soyez</em> ; <em>que nous prenions</em> ; <em>dès que le client aura signé</em> ; <em>quelles sont les heures</em> ; <em>que nous avons renvoyées</em> ; <em>seront distribuées</em> ; <em>de la rappeler</em> ; <em>pallier ce manque</em> ; « collaborer ensemble » est un pléonasme ; <em>si j'avais su</em> ; <em>quelle que soit</em> ; <em>il est sorti</em> (le participe passé de <em>sortir</em> se termine par <em>-i</em> : test du féminin, <em>sortie</em>) ; <em>je me rappelle cette réunion</em>.</p>
<h3>Corrigé – 3. Plans de révision</h3>
<table>
<thead><tr><th>Semaine</th><th>Inès (objectif 750–899)</th><th>Karim (objectif 600–749)</th></tr></thead>
<tbody>
<tr><td>1</td><td>Verbes pronominaux : fonction du pronom <em>se</em> (COD ou COI) ; liste des verbes à COI (<em>se parler, se téléphoner, se succéder, se permettre, se plaire, se nuire</em>)</td><td>Terminaisons en [e] : infinitif, participe, 2e personne du pluriel ; test du verbe du 3e groupe</td></tr>
<tr><td>2</td><td>Participe passé suivi d'un infinitif ; <em>fait</em> et <em>laissé</em> + infinitif ; phrases à corriger en quatre passages</td><td>Modes : subjonctif après <em>il faut que, bien que, afin que</em> ; indicatif après <em>après que, dès que</em> ; système hypothétique avec <em>si</em></td></tr>
<tr><td>3</td><td>Modes après les locutions (<em>après que, avant que, bien que</em>) ; constructions verbales rares</td><td>Homophones grammaticaux (<em>quel que / quelque, quoi que / quoique, quelles / qu'elles</em>) ; participe passé avec <em>avoir</em></td></tr>
<tr><td>4</td><td>Carnet d'erreurs ; examen blanc de contrôle ; relecture croisée des courriels de Karim</td><td>Orthographe d'usage (liste personnelle de vingt mots) ; carnet d'erreurs ; examen blanc de contrôle</td></tr>
</tbody>
</table>
<p>Rythme proposé : quatre séances de vingt-cinq minutes par semaine pour Inès, cinq séances de trente minutes pour Karim, selon le format décrit en section 8.7. La relecture croisée des courriels, en semaine 4, permet à Inès d'appliquer en situation réelle la compétence de correction visée par son palier, et à Karim de bénéficier d'un retour immédiat sur ses écrits.</p>
<h3>Corrigé – 4. Le courriel d'Inès</h3>
<p>Objet : Préparation à la Certification Le Robert – propositions pour Karim et moi</p>
<p>Bonjour Madame Delorme,</p>
<p>Comme suite à votre demande, je vous adresse ci-joint une proposition de plan de préparation à la Certification en langue française Le Robert pour Karim et pour moi-même.</p>
<p>À l'issue de l'examen blanc, nous avons obtenu respectivement 32 et 43 points sur 50. Ces résultats ne permettent pas de prédire le score officiel, mais ils indiquent clairement nos priorités : les modes, les terminaisons verbales et l'orthographe d'usage pour Karim ; les cas difficiles du participe passé pour moi.</p>
<p>Je propose que Karim vise le palier 600–749 et que je vise le palier 750–899, conformément aux exemples de métiers cités dans la fiche de la certification. Chacun de nous suivrait un plan de quatre semaines, à raison de quatre à cinq séances de vingt-cinq à trente minutes, et repasserait un examen blanc à la fin de la période.</p>
<p>Les modalités pratiques de l'épreuve (date, durée, conditions techniques) nous seront précisées lors de l'inscription auprès du certificateur. Si ces propositions vous conviennent, je pourrai préparer les démarches d'inscription dès que vous m'aurez donné votre accord.</p>
<p>Je reste à votre disposition pour en parler.</p>
<p>Bien cordialement,</p>
<p>Inès [nom]<br>Assistante de direction – Ardoise &amp; Plume</p>
<h3>Analyse du courriel</h3>
<ul>
<li><strong>Registre</strong> : courant soutenu, adapté à un écrit adressé à la directrice ; aucune tournure critiquée (<em>comme suite à</em> remplace <em>suite à</em>).</li>
<li><strong>Exactitude</strong> : aucun fait non vérifié sur l'épreuve ; la durée et les conditions techniques sont renvoyées à l'inscription.</li>
<li><strong>Points de grammaire</strong> : « je vous adresse ci-joint une proposition » (<em>ci-joint</em> invariable devant un nom précédé d'un déterminant, usage le plus courant) ; « nous avons obtenu respectivement 32 et 43 points » (l'ordre des nombres suit l'ordre des noms cités : Karim, puis moi) ; « je propose que Karim vise » (subjonctif après <em>proposer que</em>) ; « dès que vous m'aurez donné votre accord » (futur antérieur après <em>dès que</em> ; le participe <em>donné</em> reste invariable, car le COD <em>votre accord</em> est placé après).</li>
<li><strong>Structure</strong> : objet explicite, contexte, résultats, proposition, suite à donner, formule de fin.</li>
</ul>
<h3>Bilan des compétences mobilisées</h3>
<ul>
<li><strong>C1 – règles de la langue</strong> : analyse et correction de cinquante items couvrant l'orthographe d'usage, les homophones, les accords, les participes, les modes et la construction.</li>
<li><strong>C2 – expression adéquate</strong> : choix du registre, précision du vocabulaire, construction d'un courriel argumenté.</li>
<li><strong>Méthode</strong> : diagnostic par type d'exercice et par famille de règles, fixation d'un objectif réaliste, planification de révisions courtes et régulières.</li>
</ul>`,
      },
    ],
  },
];
