import type { CourseChapter } from "../courseContent";

export const ANG40_CHAPITRE_2: CourseChapter = {
  title: "Chapitre 2 – Rédiger des écrits professionnels en anglais",
  description: "Jour 2 (7 h) – Compétence C2 : rédiger des écrits professionnels clairs, fluides et structurés en anglais. Principes de l'écrit professionnel (clarté, concision, plain English, ton, registre, différences britanniques et américaines), structure d'un email, emails complexes (demande d'information, demande de devis, confirmation de commande, relance, réponse à une réclamation, annonce d'un retard, refus poli), connecteurs logiques, synthèse et executive summary, ordre du jour, compte rendu de réunion, ponctuation et formats, erreurs fréquentes des francophones, messagerie instantanée et LinkedIn. Fil rouge : l'entreprise fictive Lumivia et ses partenaires internationaux.",
  sections: [
    {
      title: "2.1 – Les principes de l'écrit professionnel en anglais",
      content: `
<h3>Pourquoi l'écrit compte autant à l'international</h3>
<p>Dans une PME qui travaille avec l'étranger, l'essentiel des échanges passe par l'écrit : emails, messages instantanés, comptes rendus, offres commerciales, bons de commande. Un email mal construit fait perdre du temps (le destinataire doit relire, poser des questions, attendre une réponse) et peut abîmer la relation commerciale (un ton trop sec, une demande mal formulée, une promesse imprécise). À l'inverse, un écrit clair donne une image de <strong>sérieux</strong>, de <strong>fiabilité</strong> et de <strong>professionnalisme</strong>.</p>
<p>Ce deuxième jour s'appuie sur le fil rouge de la formation : <strong>Lumivia</strong>, PME lyonnaise (fictive) de 85 salariés qui conçoit et fabrique des luminaires LED pour bâtiments tertiaires. Vous suivrez les écrits de <strong>Claire Moreau</strong> (responsable export), <strong>Julien Bertrand</strong> (acheteur), <strong>Sofia Benali</strong> (assistante commerciale) et <strong>Thomas Garnier</strong> (chef de projet), en relation avec <strong>Mark Davies</strong> (Brightway Ltd, Manchester), <strong>Anna Weber</strong> (Nordlicht GmbH, Hambourg) et <strong>Kevin Liu</strong> (Sunrise Components, Shenzhen). Tous les chiffres sont fictifs.</p>
<p>Point important : vos interlocuteurs ne sont pas toujours anglophones natifs. Anna Weber est allemande, Kevin Liu est chinois. L'anglais des affaires est souvent une <strong>langue commune entre non-natifs</strong> (on parle d'anglais international ou de « Globish »). Votre objectif n'est donc pas d'écrire comme un romancier britannique, mais d'être <strong>compris immédiatement et sans ambiguïté</strong>.</p>

<h3>Les 4 C de l'écrit professionnel</h3>
<p>Les formateurs anglophones résument souvent les qualités d'un bon écrit professionnel par quatre mots commençant par C :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Principe</th><th>Ce que cela signifie</th><th>Exemple à éviter</th><th>Exemple réussi</th></tr>
<tr><td><strong>Clear</strong> (clair)</td><td>Une idée par phrase, un objectif par email, des mots simples et précis.</td><td>We would like to inform you that there might possibly be some changes concerning the delivery.</td><td>Your delivery will arrive on 14 March, not 10 March.</td></tr>
<tr><td><strong>Concise</strong> (concis)</td><td>Supprimer les mots inutiles, les répétitions, les formules creuses.</td><td>At this point in time, due to the fact that...</td><td>Now, because...</td></tr>
<tr><td><strong>Correct</strong> (exact)</td><td>Chiffres, dates, noms, références et grammaire vérifiés.</td><td>Dear Mr Weber (Anna Weber est une femme)</td><td>Dear Ms Weber</td></tr>
<tr><td><strong>Courteous</strong> (courtois)</td><td>Ton poli, positif, respectueux, même en cas de désaccord.</td><td>You didn't send the payment.</td><td>We have not yet received your payment.</td></tr>
</table>

<h3>Le « plain English » : écrire simple</h3>
<p>Le <strong>plain English</strong> (anglais clair, sans jargon) est un mouvement né au Royaume-Uni qui encourage les administrations et les entreprises à écrire de façon simple et directe. Ses règles principales sont très utiles pour un francophone :</p>
<ul>
<li><strong>Phrases courtes</strong> : visez 15 à 20 mots par phrase en moyenne. Le français aime les phrases longues avec plusieurs subordonnées ; l'anglais professionnel préfère enchaîner des phrases courtes.</li>
<li><strong>Voix active</strong> plutôt que passive : « We will ship the order on Monday » est plus clair que « The order will be shipped on Monday ». La voix passive reste utile pour éviter d'accuser quelqu'un (voir plus bas).</li>
<li><strong>Verbes plutôt que noms</strong> : « We decided » plutôt que « We made the decision » ; « Please confirm » plutôt que « Please give your confirmation ».</li>
<li><strong>Mots courts et courants</strong> : « use » plutôt que « utilise », « help » plutôt que « facilitate », « start » plutôt que « commence », « buy » plutôt que « purchase » (sauf dans les documents d'achat officiels).</li>
<li><strong>« You » et « we »</strong> : s'adresser directement au lecteur rend le texte plus vivant et plus clair.</li>
<li><strong>Listes à puces</strong> pour énumérer plusieurs éléments (références, étapes, questions).</li>
</ul>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Formulation lourde</th><th>Plain English</th><th>Traduction</th></tr>
<tr><td>in order to</td><td>to</td><td>pour</td></tr>
<tr><td>with regard to / with reference to</td><td>about</td><td>concernant</td></tr>
<tr><td>in the event that</td><td>if</td><td>si</td></tr>
<tr><td>prior to</td><td>before</td><td>avant</td></tr>
<tr><td>subsequent to</td><td>after</td><td>après</td></tr>
<tr><td>a large number of</td><td>many</td><td>de nombreux</td></tr>
<tr><td>at the present time</td><td>now</td><td>actuellement</td></tr>
<tr><td>we are in receipt of</td><td>we have received</td><td>nous avons reçu</td></tr>
<tr><td>please find attached herewith</td><td>I attach / please find attached</td><td>veuillez trouver ci-joint</td></tr>
<tr><td>it is our intention to</td><td>we plan to / we intend to</td><td>nous prévoyons de</td></tr>
</table>
<blockquote><strong>À retenir :</strong> en anglais professionnel, la simplicité n'est pas un manque de niveau, c'est une marque de respect pour le lecteur. Un message court et précis est perçu comme plus professionnel qu'un message long et cérémonieux.</blockquote>

<h3>Le ton : positif, direct mais poli</h3>
<p>L'anglais des affaires adoucit souvent les messages négatifs ou les demandes grâce à quelques techniques simples :</p>
<ul>
<li><strong>Les modaux de politesse</strong> : could, would, might. « Could you send me the invoice? » est plus poli que « Send me the invoice. »</li>
<li><strong>Les adoucisseurs</strong> (softeners) : a little, slightly, a few, I'm afraid, unfortunately. « I'm afraid we will need a little more time. »</li>
<li><strong>La forme interrogative ou négative</strong> : « Would it be possible to...? », « Wouldn't it be better to...? »</li>
<li><strong>La voix passive pour éviter de pointer du doigt</strong> : « The invoice was sent to the wrong address » plutôt que « You sent the invoice to the wrong address ».</li>
<li><strong>Le positif d'abord</strong> : dire ce que l'on peut faire avant ce que l'on ne peut pas faire. « We can deliver 300 units on 12 May and the remaining 200 on 26 May » plutôt que « We cannot deliver the 500 units on 12 May ».</li>
</ul>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Trop direct (risque d'être perçu comme impoli)</th><th>Version diplomatique</th><th>Glose française</th></tr>
<tr><td>You made a mistake.</td><td>There seems to be a mistake.</td><td>Il semble y avoir une erreur.</td></tr>
<tr><td>Your price is too high.</td><td>Your price is slightly above our budget.</td><td>Votre prix dépasse légèrement notre budget.</td></tr>
<tr><td>I want an answer today.</td><td>I would appreciate an answer by the end of the day.</td><td>Je vous serais reconnaissant d'une réponse d'ici la fin de la journée.</td></tr>
<tr><td>We can't do that.</td><td>I'm afraid that won't be possible.</td><td>Je crains que ce ne soit pas possible.</td></tr>
<tr><td>You are late.</td><td>We haven't received the goods yet.</td><td>Nous n'avons pas encore reçu la marchandise.</td></tr>
<tr><td>That's wrong.</td><td>I'm not sure that's quite right.</td><td>Je ne suis pas certain que ce soit tout à fait exact.</td></tr>
</table>

<h3>Les registres : formel, neutre, informel</h3>
<p>Le choix du registre dépend de la relation avec le destinataire, du sujet et de la culture de l'entreprise. En anglais, le registre se marque surtout par le vocabulaire (mots d'origine latine plus formels, verbes à particule plus informels), les contractions et les formules d'ouverture et de clôture.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Formel</th><th>Neutre</th><th>Informel</th><th>Français</th></tr>
<tr><td>to request</td><td>to ask for</td><td>to ask</td><td>demander</td></tr>
<tr><td>to receive</td><td>to get</td><td>to get</td><td>recevoir</td></tr>
<tr><td>to inform</td><td>to let you know</td><td>to tell</td><td>informer</td></tr>
<tr><td>to assist</td><td>to help</td><td>to help out</td><td>aider</td></tr>
<tr><td>to postpone</td><td>to delay</td><td>to put off</td><td>reporter</td></tr>
<tr><td>to investigate</td><td>to look into</td><td>to check out</td><td>examiner</td></tr>
<tr><td>to contact</td><td>to get in touch</td><td>to drop a line</td><td>contacter</td></tr>
<tr><td>I am writing to...</td><td>I'm writing about...</td><td>Just a quick note about...</td><td>Je vous écris au sujet de...</td></tr>
<tr><td>We regret to inform you that...</td><td>Unfortunately,...</td><td>Sorry, but...</td><td>Nous avons le regret de...</td></tr>
</table>
<p><strong>Les contractions</strong> (I'm, we'll, don't, can't) sont normales dans un email neutre entre partenaires réguliers. Elles sont à éviter dans un écrit très formel (réponse officielle à une réclamation, contrat, lettre de mise en demeure, première prise de contact avec un grand compte).</p>
<p><strong>Règle pratique</strong> : adaptez-vous au registre de votre interlocuteur. Si Mark Davies vous écrit « Hi Sofia, thanks for this! », vous pouvez répondre « Hi Mark, ». Si Anna Weber écrit « Dear Ms Benali », restez sur « Dear Ms Weber » jusqu'à ce qu'elle passe au prénom.</p>

<h3>Différences entre anglais britannique et anglais américain</h3>
<p>Lumivia travaille avec un distributeur britannique (Brightway Ltd, Manchester). Il est donc utile de connaître les principales différences entre l'anglais britannique (UK) et l'anglais américain (US). L'important est de <strong>rester cohérent</strong> dans un même document : ne mélangez pas « colour » et « color ».</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Domaine</th><th>Anglais britannique (UK)</th><th>Anglais américain (US)</th><th>Français</th></tr>
<tr><td>Orthographe -our / -or</td><td>colour, favour, labour</td><td>color, favor, labor</td><td>couleur, faveur, travail</td></tr>
<tr><td>Orthographe -ise / -ize</td><td>organise, realise (les deux sont admis au UK)</td><td>organize, realize</td><td>organiser, réaliser</td></tr>
<tr><td>Orthographe -re / -er</td><td>centre, metre</td><td>center, meter</td><td>centre, mètre</td></tr>
<tr><td>Doublement du l</td><td>travelled, cancelled</td><td>traveled, canceled</td><td>voyagé, annulé</td></tr>
<tr><td>-ence / -ense</td><td>licence (nom), defence</td><td>license, defense</td><td>licence, défense</td></tr>
<tr><td>Vocabulaire</td><td>mobile phone, lorry, flat, holiday</td><td>cell phone, truck, apartment, vacation</td><td>portable, camion, appartement, vacances</td></tr>
<tr><td>Vocabulaire du bureau</td><td>CV, timetable, ground floor</td><td>résumé, schedule, first floor</td><td>CV, planning, rez-de-chaussée</td></tr>
<tr><td>Dates</td><td>14 March 2027 / 14/03/2027</td><td>March 14, 2027 / 03/14/2027</td><td>14 mars 2027</td></tr>
<tr><td>Titres</td><td>Mr, Ms, Dr (sans point)</td><td>Mr., Ms., Dr. (avec point)</td><td>M., Mme, Dr</td></tr>
<tr><td>Formule finale</td><td>Kind regards / Yours sincerely</td><td>Best regards / Sincerely</td><td>Cordialement</td></tr>
<tr><td>Grammaire</td><td>Have you got...? / in the team</td><td>Do you have...? / on the team</td><td>Avez-vous... ? / dans l'équipe</td></tr>
</table>
<blockquote><strong>À retenir :</strong> choisissez une variante (britannique en Europe, en général) et gardez-la pour tout le document. Le correcteur orthographique de votre logiciel doit être réglé sur la même variante (English UK ou English US).</blockquote>

<h3>Avant d'écrire : la méthode des 5 questions</h3>
<p>Avant de rédiger un écrit important, prenez une minute pour répondre à ces cinq questions :</p>
<ol>
<li><strong>Who?</strong> Qui va lire ? Quel est son niveau d'anglais, sa fonction, notre relation ?</li>
<li><strong>Why?</strong> Pourquoi j'écris ? Informer, demander, confirmer, s'excuser, refuser, relancer ?</li>
<li><strong>What?</strong> Quel est le message principal en une phrase ?</li>
<li><strong>What next?</strong> Qu'est-ce que j'attends du lecteur, et pour quand ?</li>
<li><strong>How?</strong> Quel canal (email, message instantané, téléphone) et quel registre ?</li>
</ol>
<p>Exemple : Sofia doit prévenir Anna Weber d'un retard. Who? Une cliente allemande, acheteuse, relation cordiale mais formelle. Why? Annoncer un retard et proposer une solution. What? La livraison arrivera le 21 mars au lieu du 14 mars. What next? Qu'Anna confirme si une livraison partielle l'intéresse, d'ici jeudi. How? Email formel, suivi d'un appel si nécessaire.</p>
<blockquote><strong>À retenir :</strong> un écrit professionnel efficace se prépare. Si vous ne pouvez pas résumer votre message en une phrase, votre lecteur ne le pourra pas non plus.</blockquote>
`,
    },
    {
      title: "2.2 – La structure d'un email professionnel",
      content: `
<h3>Les six éléments d'un email</h3>
<p>Un email professionnel en anglais suit une structure assez stable. La maîtriser permet de gagner du temps et de rassurer le lecteur, qui sait où trouver chaque information.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Rôle</th><th>Exemple</th></tr>
<tr><td><strong>Subject line</strong> (objet)</td><td>Annoncer le sujet et, si possible, l'action attendue.</td><td>Order LUM-2417 – new delivery date</td></tr>
<tr><td><strong>Salutation / greeting</strong></td><td>Saluer le destinataire avec le bon registre.</td><td>Dear Ms Weber,</td></tr>
<tr><td><strong>Opening</strong> (ouverture)</td><td>Donner le contexte et la raison de l'email en une ou deux phrases.</td><td>I am writing about your order LUM-2417 of 3 February.</td></tr>
<tr><td><strong>Body</strong> (corps)</td><td>Développer les informations : faits, détails, explications, options. Un paragraphe par idée.</td><td>Due to a shortage of drivers at our supplier...</td></tr>
<tr><td><strong>Call to action</strong> (demande d'action)</td><td>Dire clairement ce que l'on attend, de qui et pour quand.</td><td>Could you confirm by Thursday 6 March whether a partial delivery suits you?</td></tr>
<tr><td><strong>Closing + sign-off</strong> (formule finale + signature)</td><td>Remercier, proposer son aide, conclure poliment.</td><td>Thank you for your understanding. Kind regards, Sofia Benali</td></tr>
</table>

<h3>1. L'objet (subject line)</h3>
<p>L'objet est souvent la seule partie lue avant d'ouvrir l'email. Il doit être <strong>court</strong> (6 à 10 mots), <strong>précis</strong> et contenir les <strong>références utiles</strong> (numéro de commande, de devis, de projet).</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Objet vague (à éviter)</th><th>Objet efficace</th></tr>
<tr><td>Question</td><td>Question about invoice INV-0592</td></tr>
<tr><td>Order</td><td>Order LUM-2417 – delivery delayed to 21 March</td></tr>
<tr><td>Meeting</td><td>Project review meeting – Tuesday 11 March, 10:00 CET</td></tr>
<tr><td>Urgent!!!</td><td>Action required: please approve samples by Friday</td></tr>
<tr><td>Prices</td><td>Request for quotation – 2,000 PCB boards</td></tr>
<tr><td>Hello</td><td>Introduction – Lumivia, LED lighting manufacturer</td></tr>
</table>
<p>Mots utiles dans un objet : <strong>Request for</strong> (demande de), <strong>Reminder</strong> (rappel), <strong>Follow-up</strong> (suivi), <strong>Action required</strong> (action requise), <strong>For your information / FYI</strong> (pour information), <strong>Update</strong> (mise à jour), <strong>Confirmation</strong>, <strong>Re:</strong> (réponse), <strong>Fwd:</strong> (transfert).</p>

<h3>2. La salutation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Salutation</th><th>Remarque</th></tr>
<tr><td>Destinataire inconnu (nom inconnu)</td><td>Dear Sir or Madam,</td><td>Très formel, de plus en plus rare. Préférez chercher le nom ou utiliser un intitulé de poste.</td></tr>
<tr><td>Service ou fonction</td><td>Dear Customer Service Team, / Dear Purchasing Manager,</td><td>Moderne et neutre.</td></tr>
<tr><td>Nom connu, relation formelle</td><td>Dear Mr Davies, / Dear Ms Weber,</td><td>Ms pour toutes les femmes (on ne présume pas du statut marital). Jamais « Dear Mr Mark ».</td></tr>
<tr><td>Relation établie, neutre</td><td>Dear Mark, / Dear Anna,</td><td>Très courant entre partenaires réguliers.</td></tr>
<tr><td>Collègue, relation détendue</td><td>Hi Kevin, / Hello Thomas,</td><td>Courant en interne et avec les partenaires proches.</td></tr>
<tr><td>Plusieurs personnes</td><td>Dear all, / Hi everyone, / Hello team,</td><td>« Dear all » est neutre et très utilisé.</td></tr>
<tr><td>Genre inconnu</td><td>Dear Alex Morgan,</td><td>Prénom + nom sans titre : solution neutre et polie.</td></tr>
</table>
<p><strong>Ponctuation</strong> : en anglais britannique, on met une virgule après la salutation (Dear Anna,) ou rien du tout. En anglais américain formel, on trouve parfois deux-points (Dear Ms. Weber:). On ne met <strong>jamais</strong> de point d'exclamation dans une salutation professionnelle formelle.</p>

<h3>3. L'ouverture</h3>
<p>L'ouverture situe le message. On peut remercier, rappeler un contact précédent ou annoncer directement l'objet.</p>
<ul>
<li>I am writing to enquire about... (UK) / I am writing to inquire about... (US) – Je vous écris pour me renseigner sur...</li>
<li>I am writing with regard to your order of 3 February. – Je vous écris au sujet de votre commande du 3 février.</li>
<li>Thank you for your email of 12 March. – Merci pour votre email du 12 mars.</li>
<li>Thank you for your quick reply. – Merci pour votre réponse rapide.</li>
<li>Further to our phone call this morning, ... – Suite à notre appel de ce matin, ...</li>
<li>Following our meeting on Tuesday, ... – Suite à notre réunion de mardi, ...</li>
<li>I hope you are well. / I hope this email finds you well. – J'espère que vous allez bien. (formule de politesse fréquente, à ne pas répéter dans chaque email d'un même échange)</li>
<li>Just a quick note to let you know that... – Juste un petit mot pour vous dire que... (informel)</li>
</ul>
<blockquote><strong>Attention :</strong> « Further to » est très britannique et assez formel ; « Following » est plus universel. Évitez l'ouverture « I write you because... » : c'est un calque du français. Dites « I am writing to... » (présent continu).</blockquote>

<h3>4. Le corps du message</h3>
<p>Le corps contient l'information. Quelques règles :</p>
<ul>
<li><strong>Un paragraphe = une idée</strong>, deux à quatre phrases maximum.</li>
<li><strong>Le plus important d'abord</strong> : les anglophones attendent le message principal dès le début (on parle de « BLUF » : Bottom Line Up Front, la conclusion en premier). Les francophones ont tendance à expliquer le contexte avant d'arriver au fait : inversez l'ordre.</li>
<li><strong>Listes numérotées</strong> si vous posez plusieurs questions : le destinataire pourra répondre point par point.</li>
<li><strong>Chiffres, dates et références précis</strong> : « 500 units of the Lumi-Panel 60 » plutôt que « the panels ».</li>
</ul>
<p>Phrases utiles pour structurer le corps :</p>
<ul>
<li>I would like to inform you that... – Je souhaite vous informer que...</li>
<li>Please note that... – Veuillez noter que...</li>
<li>As requested, I attach... – Comme demandé, je joins...</li>
<li>Please find attached our latest price list. – Veuillez trouver ci-joint notre dernière liste de prix.</li>
<li>I have two questions about the offer: – J'ai deux questions concernant l'offre :</li>
<li>As discussed on the phone, ... – Comme convenu par téléphone, ...</li>
<li>Regarding the delivery, ... – Concernant la livraison, ...</li>
<li>With regard to the price, ... – En ce qui concerne le prix, ...</li>
</ul>

<h3>5. L'appel à l'action (call to action)</h3>
<p>C'est l'élément le plus souvent oublié par les rédacteurs francophones. Un bon appel à l'action précise <strong>quoi</strong>, <strong>qui</strong> et <strong>quand</strong>.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Appel à l'action flou</th><th>Appel à l'action précis</th></tr>
<tr><td>Let me know.</td><td>Could you let me know by Friday 14 March whether you accept the new date?</td></tr>
<tr><td>Waiting for your answer.</td><td>I look forward to receiving your signed order form by Wednesday.</td></tr>
<tr><td>Please check.</td><td>Please check the quantities in the attached file and confirm them by noon tomorrow.</td></tr>
<tr><td>Call me.</td><td>Would you be available for a 15-minute call on Tuesday at 10:00 UK time?</td></tr>
</table>

<h3>6. La formule finale et la signature</h3>
<p>Une formule finale comprend souvent une phrase de clôture puis une formule de politesse (sign-off).</p>
<p>Phrases de clôture : I look forward to hearing from you. (J'attends votre réponse avec intérêt) / Please do not hesitate to contact me if you have any questions. (N'hésitez pas à me contacter pour toute question) / Thank you in advance for your help. (Merci d'avance pour votre aide) / Let me know if you need anything else. (Dites-moi si vous avez besoin d'autre chose).</p>

<h3>Tableau des formules : formel, neutre, informel</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Fonction</th><th>Formel</th><th>Neutre</th><th>Informel</th></tr>
<tr><td>Salutation</td><td>Dear Sir or Madam, / Dear Ms Weber,</td><td>Dear Anna,</td><td>Hi Anna, / Hello Anna,</td></tr>
<tr><td>Raison de l'email</td><td>I am writing to inform you that...</td><td>I'm writing to let you know that...</td><td>Just to let you know...</td></tr>
<tr><td>Remercier</td><td>Thank you for your letter of 12 March.</td><td>Thanks for your email.</td><td>Thanks for this!</td></tr>
<tr><td>Faire référence</td><td>With reference to your enquiry, ...</td><td>About your question, ...</td><td>Re your question, ...</td></tr>
<tr><td>Demander</td><td>I would be grateful if you could...</td><td>Could you please...?</td><td>Can you...?</td></tr>
<tr><td>Joindre</td><td>Please find enclosed / attached...</td><td>I've attached...</td><td>Here's the file.</td></tr>
<tr><td>Mauvaise nouvelle</td><td>We regret to inform you that...</td><td>Unfortunately, ...</td><td>Sorry, but...</td></tr>
<tr><td>S'excuser</td><td>Please accept our apologies for...</td><td>We're sorry for...</td><td>Sorry about...</td></tr>
<tr><td>Proposer son aide</td><td>Should you require any further information, please do not hesitate to contact me.</td><td>If you have any questions, please let me know.</td><td>Just shout if you need anything.</td></tr>
<tr><td>Attendre une réponse</td><td>I look forward to hearing from you.</td><td>Looking forward to hearing from you.</td><td>Speak soon. / Talk soon.</td></tr>
<tr><td>Formule de politesse</td><td>Yours faithfully, (nom inconnu, UK) / Yours sincerely, (nom connu, UK)</td><td>Kind regards, / Best regards,</td><td>Best, / Cheers, (UK, très familier) / Thanks,</td></tr>
</table>
<blockquote><strong>À retenir :</strong> au Royaume-Uni, <strong>Yours faithfully</strong> s'emploie après « Dear Sir or Madam » (nom inconnu) et <strong>Yours sincerely</strong> après « Dear Ms Weber » (nom connu). Dans l'immense majorité des emails professionnels actuels, <strong>Kind regards</strong> ou <strong>Best regards</strong> conviennent parfaitement.</blockquote>

<h3>La signature électronique</h3>
<p>Une signature professionnelle en anglais comprend : prénom et nom, fonction, entreprise, adresse, téléphone au format international.</p>
<blockquote>Sofia Benali<br>Sales Assistant – Export Department<br>Lumivia<br>Lyon, France<br>Tel: +33 4 00 00 00 00</blockquote>
<p>Traductions de fonctions utiles : responsable export = <strong>Export Manager</strong> ; acheteur = <strong>Buyer</strong> ou <strong>Purchasing Officer</strong> ; assistante commerciale = <strong>Sales Assistant</strong> ; chef de projet = <strong>Project Manager</strong> ; directeur général = <strong>Managing Director</strong> (UK) ou <strong>CEO</strong> ; responsable qualité = <strong>Quality Manager</strong> ; service comptabilité = <strong>Accounts Department</strong>.</p>

<h3>Exemple complet commenté</h3>
<blockquote>
<strong>Subject:</strong> Meeting request – 2027 product range<br><br>
Dear Mark,<br><br>
I hope you are well.<br><br>
I am writing to ask whether you would be available for a video call next week to present our 2027 product range. We are launching three new LED panels for open-plan offices, and I think they could interest several of your customers in the North West.<br><br>
Would Tuesday 18 March at 10:00 (UK time) or Wednesday 19 March at 14:00 (UK time) suit you? The presentation will take about 30 minutes.<br><br>
I have attached a short brochure so that you can have a first look.<br><br>
I look forward to hearing from you.<br><br>
Kind regards,<br>
Claire Moreau<br>
Export Manager, Lumivia
</blockquote>
<p>Analyse : l'objet est précis ; l'ouverture donne la raison de l'email dès la deuxième phrase ; le corps explique l'intérêt pour le destinataire (« could interest several of your customers ») ; l'appel à l'action propose deux créneaux précis avec le fuseau horaire ; la clôture est neutre et chaleureuse.</p>
`,
    },
    {
      title: "2.3 – Emails complexes (1) : demande d'information, demande de devis, confirmation de commande",
      content: `
<h3>Méthode commune aux emails « de transaction »</h3>
<p>Les emails de demande et de confirmation font partie du quotidien d'une PME exportatrice. Ils ont un point commun : ils doivent permettre au destinataire de <strong>répondre ou d'agir sans avoir à reposer de questions</strong>. Pour cela, ils contiennent toutes les données utiles (références, quantités, dates, conditions) et se terminent par une demande d'action précise.</p>
<p>Dans chaque modèle ci-dessous, le texte anglais est suivi d'une <strong>glose française</strong> (traduction libre) pour vous aider à comprendre la logique. Ne traduisez jamais mot à mot depuis le français : partez des phrases types anglaises et adaptez-les.</p>

<h3>Modèle 1 – Demande d'information (enquiry)</h3>
<p>Contexte : Julien Bertrand, acheteur chez Lumivia, souhaite obtenir des informations techniques sur un nouveau driver LED proposé par Sunrise Components.</p>
<blockquote>
<strong>Subject:</strong> Enquiry – LED driver SC-450 technical data<br><br>
Dear Mr Liu,<br><br>
I am the buyer for electronic components at Lumivia, a French manufacturer of LED lighting for office buildings. I saw your new SC-450 LED driver on your website and I would like some more information before we consider a test order.<br><br>
Could you please send me the following details:<br>
1. the full technical data sheet, including efficiency and power factor;<br>
2. the minimum order quantity (MOQ);<br>
3. the standard lead time for 5,000 units;<br>
4. the warranty period.<br><br>
We would also be interested in receiving five samples for testing in our laboratory in Lyon. Please let me know if there is a charge for samples.<br><br>
Thank you in advance for your help. I look forward to hearing from you.<br><br>
Best regards,<br>
Julien Bertrand<br>
Buyer, Lumivia
</blockquote>
<p><em>Glose : Monsieur, je suis l'acheteur des composants électroniques chez Lumivia, fabricant français d'éclairage LED pour bureaux. J'ai vu votre nouveau driver LED SC-450 sur votre site et je souhaiterais quelques informations avant d'envisager une commande d'essai. Pourriez-vous m'envoyer : 1. la fiche technique complète, avec le rendement et le facteur de puissance ; 2. la quantité minimale de commande ; 3. le délai standard pour 5 000 unités ; 4. la durée de garantie. Nous aimerions également recevoir cinq échantillons pour des tests dans notre laboratoire de Lyon. Merci de m'indiquer si les échantillons sont payants. Merci d'avance pour votre aide...</em></p>
<p>Points clés : la présentation de l'entreprise en une phrase (le destinataire ne vous connaît pas), la liste numérotée des questions, la demande complémentaire (échantillons) dans un paragraphe distinct.</p>

<h3>Vocabulaire de la demande d'information et du devis</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Anglais</th><th>Français</th><th>Exemple</th></tr>
<tr><td>an enquiry (UK) / an inquiry (US)</td><td>une demande de renseignements</td><td>Thank you for your enquiry about our panels.</td></tr>
<tr><td>a quotation / a quote</td><td>un devis</td><td>Could you send us a quotation for 2,000 units?</td></tr>
<tr><td>a request for quotation (RFQ)</td><td>un appel d'offres simplifié, une demande de prix</td><td>Please find attached our RFQ.</td></tr>
<tr><td>a price list</td><td>une liste de prix, un tarif</td><td>Our 2027 price list is attached.</td></tr>
<tr><td>a unit price</td><td>un prix unitaire</td><td>The unit price is 42 euros.</td></tr>
<tr><td>a discount</td><td>une remise</td><td>We offer a 5% discount for orders over 1,000 units.</td></tr>
<tr><td>lead time</td><td>délai de fabrication / d'approvisionnement</td><td>The lead time is six weeks.</td></tr>
<tr><td>minimum order quantity (MOQ)</td><td>quantité minimale de commande</td><td>The MOQ is 500 pieces.</td></tr>
<tr><td>payment terms</td><td>conditions de paiement</td><td>Our payment terms are 30 days net.</td></tr>
<tr><td>delivery terms / Incoterms</td><td>conditions de livraison</td><td>Prices are quoted EXW Lyon.</td></tr>
<tr><td>valid until</td><td>valable jusqu'au</td><td>This offer is valid until 30 April.</td></tr>
<tr><td>a sample</td><td>un échantillon</td><td>We can send free samples.</td></tr>
<tr><td>a data sheet</td><td>une fiche technique</td><td>The data sheet is attached.</td></tr>
</table>

<h3>Modèle 2 – Demande de devis (request for quotation)</h3>
<p>Contexte : Julien a reçu les informations et les échantillons. Les tests sont concluants. Il demande maintenant un devis ferme.</p>
<blockquote>
<strong>Subject:</strong> Request for quotation – 5,000 x SC-450 LED drivers<br><br>
Dear Kevin,<br><br>
Thank you for the samples, which arrived last week. Our laboratory has tested them and the results are very satisfactory.<br><br>
We would now like to receive a quotation for the following:<br>
- Product: SC-450 LED driver, 45 W, version with dimming function<br>
- Quantity: 5,000 units (two deliveries of 2,500 units)<br>
- Requested delivery dates: week 18 and week 24<br>
- Delivery terms: FOB Shenzhen<br>
- Packaging: boxes of 50 units, with our part number on each box<br><br>
Please also indicate your payment terms, the validity of the offer and any discount for a yearly volume of 20,000 units.<br><br>
As we need to present this budget to our management on 28 March, I would be grateful if you could send your quotation by Friday 21 March.<br><br>
Many thanks in advance.<br><br>
Best regards,<br>
Julien Bertrand<br>
Buyer, Lumivia
</blockquote>
<p><em>Glose : Merci pour les échantillons arrivés la semaine dernière. Notre laboratoire les a testés et les résultats sont très satisfaisants. Nous souhaitons maintenant recevoir un devis pour : produit (driver SC-450, 45 W, version avec variation), quantité 5 000 unités en deux livraisons de 2 500, dates souhaitées semaines 18 et 24, conditions FOB Shenzhen, emballage par cartons de 50 avec notre référence sur chaque carton. Merci d'indiquer aussi vos conditions de paiement, la validité de l'offre et toute remise pour un volume annuel de 20 000 unités. Comme nous devons présenter ce budget à notre direction le 28 mars, je vous serais reconnaissant de m'envoyer votre devis d'ici le vendredi 21 mars.</em></p>
<p>Points clés : le passage au prénom (« Dear Kevin ») car la relation s'est établie ; la liste des spécifications ; la justification de l'échéance (« As we need to present this budget... »), qui rend la demande plus acceptable qu'un simple « urgent ».</p>
<blockquote><strong>À retenir :</strong> justifier une échéance (« because we need to... », « as our meeting is on... ») est plus efficace et plus poli que d'écrire « URGENT » ou « ASAP ». ASAP (as soon as possible) est d'ailleurs vague : préférez une date.</blockquote>

<h3>Modèle 3 – Réponse à une demande de devis (côté Lumivia vendeur)</h3>
<p>Contexte : Mark Davies (Brightway Ltd) a demandé un devis pour 800 panneaux Lumi-Panel 60. Claire Moreau répond.</p>
<blockquote>
<strong>Subject:</strong> RE: Quotation request – 800 x Lumi-Panel 60<br><br>
Dear Mark,<br><br>
Thank you for your enquiry of 10 March and for your interest in our Lumi-Panel 60.<br><br>
I am pleased to attach our quotation Q-2027-114. The main conditions are as follows:<br>
- Unit price: 46.50 euros (ex works Lyon)<br>
- Discount: 4% for the full quantity of 800 units<br>
- Lead time: five weeks from receipt of your purchase order<br>
- Payment terms: 30 days from invoice date<br>
- Validity: this offer is valid until 30 April<br><br>
If you need delivery to your warehouse in Manchester, we can also quote DAP prices including transport.<br><br>
Please do not hesitate to contact me if you have any questions. I would be happy to arrange a call to discuss the details.<br><br>
Kind regards,<br>
Claire Moreau<br>
Export Manager, Lumivia
</blockquote>
<p><em>Glose : Merci pour votre demande du 10 mars et pour votre intérêt pour notre Lumi-Panel 60. J'ai le plaisir de vous joindre notre devis Q-2027-114. Les principales conditions sont les suivantes : prix unitaire 46,50 euros départ usine Lyon, remise de 4 % pour la quantité totale de 800 unités, délai de cinq semaines à réception de votre bon de commande, paiement à 30 jours date de facture, offre valable jusqu'au 30 avril. Si vous souhaitez une livraison dans votre entrepôt de Manchester, nous pouvons aussi vous proposer des prix DAP incluant le transport...</em></p>
<p>Remarque sur les nombres : en anglais, on écrit <strong>46.50</strong> (point décimal) et <strong>5,000</strong> (virgule pour les milliers). C'est l'inverse du français (46,50 et 5 000). Nous y reviendrons dans la section sur la ponctuation et les formats.</p>

<h3>Modèle 4 – Confirmation de commande (order confirmation)</h3>
<p>Contexte : Anna Weber (Nordlicht GmbH) a envoyé un bon de commande. Sofia Benali en accuse réception et confirme les conditions.</p>
<blockquote>
<strong>Subject:</strong> Order confirmation – your PO NL-7731 / our ref. LUM-2417<br><br>
Dear Ms Weber,<br><br>
Thank you for your purchase order NL-7731 dated 3 February, which we received today.<br><br>
We are pleased to confirm your order as follows:<br>
- 1,200 x Lumi-Linear 120 (4000 K), unit price 58.00 euros<br>
- 300 x Lumi-Panel 60 (3000 K), unit price 46.50 euros<br>
- Total amount: 83,550.00 euros excluding VAT<br>
- Delivery terms: DAP Hamburg<br>
- Planned delivery date: 14 March<br>
- Payment terms: 30 days from invoice date<br><br>
Our order reference is LUM-2417. Please quote this reference in all future correspondence about this order.<br><br>
We will send you the shipping documents and the tracking number as soon as the goods leave our warehouse.<br><br>
If any of the details above are incorrect, please let me know by 7 February so that we can update the order before production starts.<br><br>
Thank you for your order.<br><br>
Yours sincerely,<br>
Sofia Benali<br>
Sales Assistant – Export Department, Lumivia
</blockquote>
<p><em>Glose : Merci pour votre bon de commande NL-7731 du 3 février, reçu ce jour. Nous avons le plaisir de confirmer votre commande comme suit : 1 200 Lumi-Linear 120 (4000 K) à 58,00 euros, 300 Lumi-Panel 60 (3000 K) à 46,50 euros, montant total 83 550,00 euros HT, livraison DAP Hambourg, date prévue le 14 mars, paiement à 30 jours date de facture. Notre référence est LUM-2417 ; merci de la rappeler dans toute correspondance. Nous vous enverrons les documents d'expédition et le numéro de suivi dès que la marchandise quittera notre entrepôt. Si l'un des éléments ci-dessus est inexact, merci de me prévenir d'ici le 7 février afin que nous puissions modifier la commande avant le lancement de la production.</em></p>
<p>Vérifiez le calcul : 1 200 x 58,00 = 69 600 ; 300 x 46,50 = 13 950 ; total 83 550 euros. Une erreur de calcul dans une confirmation de commande peut avoir des conséquences contractuelles : relisez toujours les chiffres.</p>

<h3>Vocabulaire de la commande</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Anglais</th><th>Français</th><th>Exemple</th></tr>
<tr><td>a purchase order (PO)</td><td>un bon de commande</td><td>Please send us your PO.</td></tr>
<tr><td>to place an order</td><td>passer une commande</td><td>We would like to place an order for 300 units.</td></tr>
<tr><td>to confirm an order</td><td>confirmer une commande</td><td>We are pleased to confirm your order.</td></tr>
<tr><td>to acknowledge receipt</td><td>accuser réception</td><td>We acknowledge receipt of your order.</td></tr>
<tr><td>an invoice</td><td>une facture</td><td>The invoice will be sent by email.</td></tr>
<tr><td>a pro forma invoice</td><td>une facture pro forma</td><td>Could you send a pro forma invoice for prepayment?</td></tr>
<tr><td>a delivery note</td><td>un bon de livraison</td><td>Please sign the delivery note.</td></tr>
<tr><td>excluding VAT / including VAT</td><td>hors taxes / toutes taxes comprises</td><td>The total is 83,550 euros excluding VAT.</td></tr>
<tr><td>in stock / out of stock</td><td>en stock / en rupture</td><td>This model is currently out of stock.</td></tr>
<tr><td>a back order</td><td>une commande en attente (reliquat)</td><td>The remaining 200 units are on back order.</td></tr>
<tr><td>a tracking number</td><td>un numéro de suivi</td><td>Here is the tracking number for your parcel.</td></tr>
<tr><td>shipping / dispatch</td><td>expédition</td><td>The goods were dispatched yesterday.</td></tr>
</table>
<blockquote><strong>À retenir :</strong> une confirmation de commande reprend <strong>tous</strong> les éléments contractuels (produits, quantités, prix, montant, conditions de livraison et de paiement, date) et invite le client à signaler une erreur avant une date précise. C'est une protection pour les deux parties.</blockquote>
`,
    },
    {
      title: "2.4 – Emails complexes (2) : relance, réclamation, retard, refus poli",
      content: `
<h3>Les emails « sensibles »</h3>
<p>Certains emails engagent davantage la relation : relancer quelqu'un qui ne répond pas, répondre à un client mécontent, annoncer un retard, refuser une demande. Le risque est double : être trop brutal (et vexer le partenaire) ou être trop flou (et ne pas obtenir ce que l'on veut). La méthode consiste à combiner <strong>fermeté sur le fond</strong> et <strong>politesse sur la forme</strong>.</p>

<h3>Modèle 5 – La relance (follow-up / reminder)</h3>
<p>On distingue généralement trois niveaux de relance, du plus doux au plus ferme.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Niveau</th><th>Phrases types</th><th>Glose</th></tr>
<tr><td>1. Relance douce</td><td>I'm just following up on my email of 4 March. / I wanted to check whether you had a chance to look at our offer.</td><td>Je reviens vers vous au sujet de mon email du 4 mars. / Je voulais savoir si vous aviez pu regarder notre offre.</td></tr>
<tr><td>2. Relance ferme</td><td>I'm writing again about... As we haven't heard from you, ... We would appreciate a reply by...</td><td>Je vous écris de nouveau au sujet de... Comme nous n'avons pas eu de nouvelles, ... Nous apprécierions une réponse d'ici...</td></tr>
<tr><td>3. Relance formelle (paiement)</td><td>According to our records, invoice INV-0592 is now 30 days overdue. We would ask you to settle this amount within seven days.</td><td>Selon nos registres, la facture INV-0592 est échue depuis 30 jours. Nous vous demandons de régler ce montant sous sept jours.</td></tr>
</table>
<p>Exemple de relance douce : Claire relance Mark Davies, qui n'a pas répondu au devis.</p>
<blockquote>
<strong>Subject:</strong> Follow-up – quotation Q-2027-114<br><br>
Hi Mark,<br><br>
I hope all is well in Manchester.<br><br>
I'm just following up on the quotation I sent you on 12 March for 800 Lumi-Panel 60. I wanted to check whether you had any questions or whether you need any further information.<br><br>
Just a reminder that the offer is valid until 30 April. If it helps, I'd be happy to have a quick call this week to go through the details.<br><br>
Best regards,<br>
Claire
</blockquote>
<p><em>Glose : J'espère que tout va bien à Manchester. Je reviens vers vous au sujet du devis envoyé le 12 mars pour 800 Lumi-Panel 60. Je voulais savoir si vous aviez des questions ou besoin d'informations complémentaires. Pour rappel, l'offre est valable jusqu'au 30 avril. Si cela peut aider, je serais ravie d'avoir un court appel cette semaine pour passer en revue les détails.</em></p>
<p>Exemple de relance de paiement (Sofia, service export) :</p>
<blockquote>
<strong>Subject:</strong> Payment reminder – invoice INV-0592<br><br>
Dear Mr Davies,<br><br>
We would like to remind you that invoice INV-0592 of 15 January, for an amount of 18,600.00 euros, was due for payment on 14 February.<br><br>
According to our records, we have not yet received this payment. It may be that the payment and this reminder have crossed; if so, please ignore this email.<br><br>
Otherwise, we would be grateful if you could arrange payment within the next seven days. I attach a copy of the invoice for your convenience.<br><br>
Yours sincerely,<br>
Sofia Benali<br>
Sales Assistant, Lumivia
</blockquote>
<p><em>Glose : Nous souhaitons vous rappeler que la facture INV-0592 du 15 janvier, d'un montant de 18 600,00 euros, était payable le 14 février. Selon nos registres, nous n'avons pas encore reçu ce paiement. Il est possible que le paiement et ce rappel se soient croisés ; dans ce cas, merci de ne pas tenir compte de cet email. Sinon, nous vous serions reconnaissants de procéder au paiement dans les sept prochains jours. Je joins une copie de la facture pour plus de commodité.</em></p>
<blockquote><strong>À retenir :</strong> la phrase « It may be that the payment and this reminder have crossed » (le paiement et ce rappel se sont peut-être croisés) permet de rester courtois tout en étant clair. Elle laisse au client une porte de sortie honorable.</blockquote>

<h3>Modèle 6 – Réponse à une réclamation (reply to a complaint)</h3>
<p>Une réponse à une réclamation suit souvent le schéma <strong>« 5 A »</strong> :</p>
<ol>
<li><strong>Acknowledge</strong> : remercier et accuser réception de la réclamation (Thank you for bringing this to our attention).</li>
<li><strong>Apologise</strong> : s'excuser pour le désagrément, sans forcément reconnaître une faute juridique (We are sorry for the inconvenience).</li>
<li><strong>Account</strong> : expliquer brièvement ce qui s'est passé, sans rejeter la faute sur d'autres.</li>
<li><strong>Act</strong> : annoncer les mesures prises ou proposées (remplacement, avoir, nouvelle livraison).</li>
<li><strong>Assure</strong> : rassurer sur l'avenir (We have taken steps to make sure this does not happen again).</li>
</ol>
<p>Contexte : Anna Weber signale que 40 luminaires Lumi-Linear 120 sont arrivés avec des diffuseurs rayés.</p>
<blockquote>
<strong>Subject:</strong> RE: Damaged goods – order LUM-2417<br><br>
Dear Ms Weber,<br><br>
Thank you for your email of 17 March and for the photos of the damaged diffusers. I am very sorry that 40 of the Lumi-Linear 120 luminaires in your order LUM-2417 arrived in this condition.<br><br>
We have looked into the matter with our logistics team. It appears that the protective film was not applied correctly on one production batch, and the diffusers were scratched during transport.<br><br>
We will send you 40 replacement luminaires free of charge. They will leave our warehouse on Friday 21 March and should arrive in Hamburg on Tuesday 25 March. Our carrier will collect the damaged units at the same time, so you do not need to return them yourself.<br><br>
We have also added an extra quality check on packaging before every shipment to make sure this does not happen again.<br><br>
Please accept our apologies once again for the inconvenience. If you have any questions, please do not hesitate to call me directly on +33 4 00 00 00 00.<br><br>
Yours sincerely,<br>
Sofia Benali<br>
Sales Assistant – Export Department, Lumivia
</blockquote>
<p><em>Glose : Merci pour votre email du 17 mars et pour les photos des diffuseurs endommagés. Je suis vraiment désolée que 40 des luminaires Lumi-Linear 120 de votre commande soient arrivés dans cet état. Nous avons examiné la situation avec notre équipe logistique : il semble que le film de protection n'ait pas été correctement posé sur un lot de production et que les diffuseurs aient été rayés pendant le transport. Nous vous envoyons 40 luminaires de remplacement gratuitement. Ils quitteront notre entrepôt le vendredi 21 mars et devraient arriver à Hambourg le mardi 25 mars. Notre transporteur reprendra les unités endommagées en même temps. Nous avons également ajouté un contrôle qualité supplémentaire de l'emballage avant chaque expédition. Veuillez accepter de nouveau nos excuses pour la gêne occasionnée.</em></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Phrases utiles</th><th>Traduction</th></tr>
<tr><td>Acknowledge</td><td>Thank you for bringing this matter to our attention.</td><td>Merci de nous avoir signalé ce problème.</td></tr>
<tr><td>Apologise</td><td>We sincerely apologise for any inconvenience this may have caused.</td><td>Nous vous présentons nos sincères excuses pour la gêne occasionnée.</td></tr>
<tr><td>Account</td><td>This was due to a technical problem in our warehouse.</td><td>Cela est dû à un problème technique dans notre entrepôt.</td></tr>
<tr><td>Act</td><td>We will issue a credit note for the full amount. / We will replace the goods free of charge.</td><td>Nous émettrons un avoir pour la totalité. / Nous remplacerons la marchandise gratuitement.</td></tr>
<tr><td>Assure</td><td>We have taken steps to ensure that this does not happen again.</td><td>Nous avons pris des mesures pour que cela ne se reproduise pas.</td></tr>
</table>

<h3>Modèle 7 – Annonce d'un retard (delay notification)</h3>
<p>Annoncer un retard est délicat mais indispensable : un client prévenu tôt peut s'organiser ; un client découvrant le retard le jour prévu est furieux. Structure recommandée : <strong>annoncer</strong> (la mauvaise nouvelle, clairement et tôt dans l'email), <strong>expliquer</strong> (brièvement), <strong>proposer</strong> (une nouvelle date et si possible une solution), <strong>s'excuser</strong>, <strong>demander une décision</strong> si nécessaire.</p>
<p>Contexte : Thomas Garnier, chef de projet, prévient Mark Davies que les échantillons d'un nouveau modèle auront une semaine de retard.</p>
<blockquote>
<strong>Subject:</strong> Samples of Lumi-Spot 15 – new date: 2 April<br><br>
Dear Mark,<br><br>
I'm afraid the samples of the new Lumi-Spot 15 will not be ready on 26 March as planned. The new date is Wednesday 2 April.<br><br>
The reason is that the optical lenses from our supplier failed our first quality test. We have received a new batch, which is now being tested.<br><br>
To limit the impact on your schedule, I can send you the final technical drawings and photometric data this week, so that your team can already start preparing the customer presentation.<br><br>
I apologise for this delay and I will keep you informed if anything changes.<br><br>
Best regards,<br>
Thomas Garnier<br>
Project Manager, Lumivia
</blockquote>
<p><em>Glose : Je crains que les échantillons du nouveau Lumi-Spot 15 ne soient pas prêts le 26 mars comme prévu. La nouvelle date est le mercredi 2 avril. La raison : les lentilles optiques de notre fournisseur n'ont pas passé notre premier test qualité. Nous avons reçu un nouveau lot, en cours de test. Pour limiter l'impact sur votre planning, je peux vous envoyer cette semaine les plans techniques définitifs et les données photométriques afin que votre équipe commence à préparer la présentation client. Je vous prie de m'excuser pour ce retard et je vous tiendrai informé de tout changement.</em></p>
<p>Phrases utiles pour annoncer un retard : I'm afraid that... (je crains que) ; Unfortunately, we will not be able to deliver on... (malheureusement nous ne pourrons pas livrer le...) ; due to... / because of... (en raison de) ; the new delivery date is... (la nouvelle date de livraison est) ; we expect the goods to arrive on... (nous prévoyons une arrivée le...) ; to minimise the impact, we can... (pour limiter l'impact, nous pouvons) ; we will keep you updated (nous vous tiendrons au courant).</p>

<h3>Modèle 8 – Le refus poli (polite refusal)</h3>
<p>Dire non en anglais professionnel suit une structure en « sandwich » : <strong>remercier ou reconnaître</strong> la demande, <strong>refuser clairement</strong> avec une raison, <strong>proposer une alternative</strong> si possible, <strong>terminer positivement</strong>.</p>
<p>Contexte : Mark Davies demande une remise supplémentaire de 10 %. Claire ne peut accorder que 6 % et propose une autre contrepartie.</p>
<blockquote>
<strong>Subject:</strong> RE: Additional discount – order of 800 Lumi-Panel 60<br><br>
Dear Mark,<br><br>
Thank you for your email and for your confidence in our products. I fully understand that your customers are very price-sensitive at the moment.<br><br>
Unfortunately, we are not in a position to offer a 10% discount on this order. Our prices already take into account the large volume, and the cost of LED components has increased this year.<br><br>
However, we could offer you a 6% discount if you confirm the order before 15 April, together with free delivery to your Manchester warehouse. This would represent a total saving of about 3,200 euros.<br><br>
I hope this proposal will help you. I would be happy to discuss it by phone if you wish.<br><br>
Kind regards,<br>
Claire
</blockquote>
<p><em>Glose : Merci pour votre email et pour votre confiance dans nos produits. Je comprends tout à fait que vos clients sont très attentifs aux prix en ce moment. Malheureusement, nous ne sommes pas en mesure de proposer une remise de 10 % sur cette commande : nos prix tiennent déjà compte du volume et le coût des composants LED a augmenté cette année. En revanche, nous pourrions vous accorder 6 % si vous confirmez la commande avant le 15 avril, avec la livraison gratuite dans votre entrepôt de Manchester. Cela représenterait une économie totale d'environ 3 200 euros...</em></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Fonction</th><th>Phrases utiles</th><th>Traduction</th></tr>
<tr><td>Reconnaître</td><td>I fully understand your position. / I appreciate your request.</td><td>Je comprends tout à fait votre position. / Je prends bonne note de votre demande.</td></tr>
<tr><td>Refuser</td><td>Unfortunately, we are not in a position to... / I'm afraid we are unable to... / We regret that we cannot...</td><td>Malheureusement, nous ne sommes pas en mesure de... / Je crains que nous ne puissions... / Nous regrettons de ne pouvoir...</td></tr>
<tr><td>Proposer une alternative</td><td>However, we could... / What we can do is... / As an alternative, we would suggest...</td><td>En revanche, nous pourrions... / Ce que nous pouvons faire, c'est... / En alternative, nous suggérons...</td></tr>
<tr><td>Terminer positivement</td><td>I hope this solution suits you. / We look forward to continuing our cooperation.</td><td>J'espère que cette solution vous conviendra. / Nous nous réjouissons de poursuivre notre collaboration.</td></tr>
</table>
<blockquote><strong>À retenir :</strong> un bon refus est <strong>clair</strong> (le lecteur comprend que c'est non), <strong>justifié</strong> (une raison courte et crédible) et <strong>constructif</strong> (une alternative). Évitez « It's impossible » ou « No way », beaucoup trop abrupts.</blockquote>
`,
    },
    {
      title: "2.5 – Les connecteurs logiques : rendre un texte fluide",
      content: `
<h3>À quoi servent les connecteurs ?</h3>
<p>Les connecteurs logiques (linking words, connectors, transition words) relient les idées entre elles. Ils indiquent au lecteur la relation entre deux phrases : ajout, opposition, cause, conséquence, exemple, conclusion. Sans eux, un texte ressemble à une liste d'informations juxtaposées ; avec trop de connecteurs, il devient lourd. L'objectif est d'utiliser <strong>le bon connecteur au bon endroit</strong>.</p>
<p>Comparez :</p>
<blockquote>Our supplier had a problem. The delivery is late. We are offering a partial delivery. We hope this helps.</blockquote>
<blockquote>Our supplier had a production problem. <strong>As a result</strong>, the delivery will be one week late. <strong>However</strong>, we can offer a partial delivery on the original date. <strong>We hope</strong> this will help you to keep your project on schedule.</blockquote>
<p>La deuxième version est plus fluide, plus logique et plus professionnelle, pour très peu de mots supplémentaires.</p>

<h3>Tableau des connecteurs par fonction</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Fonction</th><th>Connecteurs</th><th>Français</th><th>Exemple</th></tr>
<tr><td>Ajouter</td><td>and, also, in addition, furthermore, moreover, as well as, besides</td><td>et, aussi, de plus, en outre, ainsi que</td><td>The panels are energy-efficient. In addition, they are easy to install.</td></tr>
<tr><td>Opposer</td><td>but, however, although, even though, whereas, on the other hand, nevertheless</td><td>mais, cependant, bien que, alors que, en revanche, néanmoins</td><td>The price is higher. However, the lifetime is twice as long.</td></tr>
<tr><td>Concéder</td><td>despite, in spite of, admittedly, even so</td><td>malgré, certes, quand même</td><td>Despite the delay, the customer was satisfied.</td></tr>
<tr><td>Cause</td><td>because, because of, as, since, due to, owing to</td><td>parce que, à cause de, comme, puisque, en raison de</td><td>The shipment is late due to a strike at the port.</td></tr>
<tr><td>Conséquence</td><td>so, therefore, as a result, consequently, thus</td><td>donc, par conséquent, en conséquence, ainsi</td><td>The lenses failed the test. Therefore, we ordered a new batch.</td></tr>
<tr><td>But</td><td>to, in order to, so that, so as to</td><td>pour, afin de, afin que</td><td>We added a quality check so that the problem does not happen again.</td></tr>
<tr><td>Exemple</td><td>for example, for instance, such as, e.g.</td><td>par exemple, tel que</td><td>We sell to offices, such as banks and insurance companies.</td></tr>
<tr><td>Préciser</td><td>in other words, that is to say, i.e., in particular, especially</td><td>autrement dit, c'est-à-dire, en particulier</td><td>The offer is valid for 30 days, i.e. until 30 April.</td></tr>
<tr><td>Séquence</td><td>first, firstly, then, next, after that, finally, lastly</td><td>d'abord, ensuite, puis, après cela, enfin</td><td>First, we check the order. Then, we prepare the goods.</td></tr>
<tr><td>Condition</td><td>if, unless, provided that, as long as, in case</td><td>si, à moins que, à condition que, tant que, au cas où</td><td>We can offer 6% provided that you order before 15 April.</td></tr>
<tr><td>Conclure / résumer</td><td>in conclusion, to sum up, overall, in short, all in all</td><td>en conclusion, pour résumer, globalement, bref</td><td>To sum up, the project is on schedule and on budget.</td></tr>
<tr><td>Faire référence</td><td>regarding, concerning, as for, with regard to, in terms of</td><td>concernant, quant à, en ce qui concerne, en termes de</td><td>As for the price, we will send a new offer.</td></tr>
</table>

<h3>Les pièges de construction</h3>
<p>Certains connecteurs ont des constructions différentes, ce qui provoque des erreurs fréquentes :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Connecteur</th><th>Suivi de...</th><th>Correct</th><th>Incorrect</th></tr>
<tr><td>because</td><td>une proposition (sujet + verbe)</td><td>because the port was closed</td><td>because the strike</td></tr>
<tr><td>because of / due to</td><td>un nom ou un groupe nominal</td><td>because of the strike / due to the strike</td><td>due to the port was closed</td></tr>
<tr><td>although / even though</td><td>une proposition</td><td>although the price is high</td><td>although the high price</td></tr>
<tr><td>despite / in spite of</td><td>un nom ou un verbe en -ing</td><td>despite the high price / despite being late</td><td>despite the price is high / despite of</td></tr>
<tr><td>however</td><td>en début de phrase, suivi d'une virgule</td><td>The offer is good. However, the lead time is long.</td><td>The offer is good, however the lead time is long. (virgule seule : faute fréquente)</td></tr>
<tr><td>therefore</td><td>en début de phrase ou après le sujet</td><td>We have therefore decided to...</td><td>We have decided therefore of...</td></tr>
<tr><td>in order to</td><td>la base verbale</td><td>in order to reduce costs</td><td>in order to reducing costs / for to reduce</td></tr>
</table>
<blockquote><strong>À retenir :</strong> <strong>despite</strong> ne se construit jamais avec « of » (on dit « despite the delay », pas « despite of the delay »). Seul <strong>in spite of</strong> prend « of ».</blockquote>

<h3>Registre des connecteurs</h3>
<p>Tous les connecteurs ne s'emploient pas dans le même registre :</p>
<ul>
<li><strong>Très formels</strong> (rapports, courriers officiels) : furthermore, moreover, consequently, nevertheless, thus, hence, notwithstanding.</li>
<li><strong>Neutres</strong> (emails professionnels courants) : in addition, however, therefore, as a result, for example, although.</li>
<li><strong>Informels</strong> (messagerie, emails entre collègues) : also, but, so, plus, anyway, by the way.</li>
</ul>
<p>Dans un email à un partenaire, « Moreover » et « Hence » peuvent paraître trop solennels. « In addition » et « So » sont souvent plus naturels.</p>

<h3>Faux amis et confusions</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Mot anglais</th><th>Sens réel</th><th>Piège pour un francophone</th></tr>
<tr><td>eventually</td><td>finalement, au bout du compte</td><td>Ne signifie pas « éventuellement » (= possibly, if necessary).</td></tr>
<tr><td>actually</td><td>en fait, en réalité</td><td>Ne signifie pas « actuellement » (= currently, at the moment).</td></tr>
<tr><td>finally</td><td>enfin (dernier point, ou après une longue attente)</td><td>À ne pas confondre avec « in conclusion » pour conclure un raisonnement.</td></tr>
<tr><td>sensible</td><td>raisonnable, sensé</td><td>« Sensible » en français = sensitive.</td></tr>
<tr><td>on the contrary</td><td>au contraire (pour contredire une idée)</td><td>Ne s'emploie pas pour opposer deux faits : utilisez « on the other hand » (en revanche).</td></tr>
<tr><td>whereas</td><td>alors que (opposition)</td><td>Ne signifie pas « alors que » temporel (= while, when).</td></tr>
</table>

<h3>Exercice d'application commenté</h3>
<p>Reliez ces phrases de Thomas Garnier avec des connecteurs adaptés :</p>
<p><em>« The client wants the installation in June. Our team is fully booked in June. We propose the first week of July. We can send a technician in June to check the site. »</em></p>
<p>Proposition de corrigé :</p>
<blockquote>The client would like the installation in June. <strong>However</strong>, our team is fully booked that month. <strong>Therefore</strong>, we propose the first week of July. <strong>In the meantime</strong>, we can send a technician in June to check the site.</blockquote>
<p>Commentaire : « However » marque l'opposition entre le souhait du client et la disponibilité de l'équipe ; « Therefore » introduit la conséquence (la proposition) ; « In the meantime » (en attendant) introduit une solution intermédiaire. Remarquez aussi le remplacement de « wants » par « would like », plus poli.</p>

<h3>Les connecteurs à l'oral et à l'écrit : prononciation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Mot</th><th>Prononciation approximative</th><th>Syllabe accentuée</th></tr>
<tr><td>however</td><td>hao-È-veu</td><td>how-EV-er</td></tr>
<tr><td>therefore</td><td>ZÈ-fôr (th comme dans « the »)</td><td>THERE-fore</td></tr>
<tr><td>furthermore</td><td>FEU-ZEU-môr</td><td>FUR-ther-more</td></tr>
<tr><td>although</td><td>ôl-ZÔ</td><td>al-THOUGH</td></tr>
<tr><td>consequently</td><td>KON-si-kouènt-li</td><td>CON-se-quent-ly</td></tr>
<tr><td>moreover</td><td>môr-Ô-veu</td><td>more-O-ver</td></tr>
</table>
<p>Même si ce chapitre porte sur l'écrit, vous réutiliserez ces connecteurs en réunion (jour 4) et en présentation (jour 5) : autant les prononcer correctement dès maintenant.</p>
`,
    },
    {
      title: "2.6 – Rédiger une synthèse : l'executive summary",
      content: `
<h3>Qu'est-ce qu'un executive summary ?</h3>
<p>Un <strong>executive summary</strong> (résumé pour la direction, note de synthèse) est un texte court, placé au début d'un rapport ou envoyé seul, qui permet à un décideur de comprendre l'essentiel d'un sujet <strong>en deux minutes</strong>. Le lecteur type est pressé : il veut savoir quelle est la situation, ce qui pose problème, ce que l'on recommande et ce qu'on attend de lui.</p>
<p>Chez Lumivia, Claire Moreau rédige chaque trimestre une synthèse en anglais pour les partenaires et pour l'actionnaire minoritaire de l'entreprise, qui ne parle pas français. Thomas Garnier rédige une synthèse de fin de projet pour chaque grand chantier.</p>
<blockquote><strong>À retenir :</strong> la synthèse ne raconte pas l'histoire dans l'ordre chronologique ; elle donne <strong>la conclusion d'abord</strong>, puis les éléments qui la justifient.</blockquote>

<h3>La structure recommandée</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Partie</th><th>Contenu</th><th>Phrases types</th></tr>
<tr><td>1. Purpose (objet)</td><td>Pourquoi ce document existe, en une phrase.</td><td>This summary presents the results of... / The purpose of this report is to...</td></tr>
<tr><td>2. Key findings (constats clés)</td><td>Les 3 à 5 faits essentiels, chiffrés si possible.</td><td>The main findings are as follows: ... / Sales increased by 12%...</td></tr>
<tr><td>3. Issues / risks (problèmes, risques)</td><td>Ce qui pose problème ou peut en poser.</td><td>The main risk is... / One issue remains: ...</td></tr>
<tr><td>4. Recommendations (recommandations)</td><td>Ce que l'on propose de faire.</td><td>We recommend that... / We suggest...</td></tr>
<tr><td>5. Next steps (prochaines étapes)</td><td>Qui fait quoi, pour quand, et quelle décision est attendue.</td><td>The next step is to... / We need your approval by...</td></tr>
</table>

<h3>La méthode en six étapes</h3>
<ol>
<li><strong>Lire ou rassembler</strong> toute l'information (rapports, chiffres, emails, notes).</li>
<li><strong>Identifier le message principal</strong> : si le lecteur ne devait retenir qu'une phrase, laquelle ?</li>
<li><strong>Sélectionner</strong> 3 à 5 faits qui soutiennent ce message. Éliminez le reste, même si c'est intéressant.</li>
<li><strong>Rédiger</strong> en phrases courtes, avec des titres et des puces. Une synthèse dépasse rarement une page (300 à 400 mots).</li>
<li><strong>Chiffrer</strong> : les décideurs veulent des montants, des pourcentages, des dates.</li>
<li><strong>Relire</strong> en se mettant à la place du lecteur : peut-il décider sans lire le reste ?</li>
</ol>

<h3>Le vocabulaire des chiffres et des tendances</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Anglais</th><th>Français</th><th>Exemple</th></tr>
<tr><td>to increase / to rise / to grow</td><td>augmenter</td><td>Export sales rose by 8%.</td></tr>
<tr><td>to decrease / to fall / to drop</td><td>baisser</td><td>Transport costs fell by 3%.</td></tr>
<tr><td>to remain stable / to stay the same</td><td>rester stable</td><td>Margins remained stable.</td></tr>
<tr><td>to reach</td><td>atteindre</td><td>Turnover reached 2.4 million euros.</td></tr>
<tr><td>to exceed</td><td>dépasser</td><td>Orders exceeded our forecast.</td></tr>
<tr><td>a sharp increase / a slight decrease</td><td>une forte hausse / une légère baisse</td><td>There was a slight decrease in returns.</td></tr>
<tr><td>by / from... to...</td><td>de (écart) / de... à...</td><td>Sales grew by 10%, from 500 to 550 units.</td></tr>
<tr><td>turnover (UK) / revenue</td><td>chiffre d'affaires</td><td>Our export turnover is growing.</td></tr>
<tr><td>a forecast</td><td>une prévision</td><td>The forecast for Q3 is positive.</td></tr>
<tr><td>a target</td><td>un objectif</td><td>We met our sales target.</td></tr>
<tr><td>on schedule / behind schedule</td><td>dans les temps / en retard</td><td>The project is slightly behind schedule.</td></tr>
<tr><td>on budget / over budget</td><td>dans le budget / hors budget</td><td>The installation was completed on budget.</td></tr>
</table>
<p>Attention à la préposition : « Sales increased <strong>by</strong> 10% » (l'augmentation est de 10 %) n'a pas le même sens que « Sales increased <strong>to</strong> 10 million » (les ventes ont atteint 10 millions).</p>

<h3>Exemple d'executive summary chez Lumivia</h3>
<p>Contexte : Thomas Garnier a dirigé l'installation de 2 400 luminaires dans le nouveau siège d'un client de Nordlicht GmbH à Hambourg. Il rédige la synthèse de fin de projet pour Anna Weber et pour la direction de Lumivia.</p>
<blockquote>
<strong>Executive summary – Hamburg office project (Nordlicht GmbH)</strong><br><br>
<strong>Purpose</strong><br>
This summary presents the results of the lighting installation completed at the new Hamburg office of Nordlicht's customer, and our recommendations for future projects of this type.<br><br>
<strong>Key findings</strong><br>
- 2,400 luminaires were installed over six weeks, one week later than planned.<br>
- The final cost was 312,000 euros, which is 2% below the approved budget.<br>
- Measured energy consumption is 38% lower than with the previous lighting.<br>
- The end customer has approved the installation without reservations.<br><br>
<strong>Issues</strong><br>
The one-week delay was caused by damaged diffusers in one delivery (40 units). The units were replaced within eight days, but the installation team had to change its schedule.<br><br>
<strong>Recommendations</strong><br>
We recommend (1) adding a packaging check before every export shipment, which has already been in place since March, and (2) keeping a safety stock of 2% of spare parts on site for projects over 1,000 luminaires.<br><br>
<strong>Next steps</strong><br>
Nordlicht would like to use this project as a reference for two new tenders in Bremen. We need the end customer's written agreement to publish photos. Anna Weber will ask for it by 30 May.
</blockquote>
<p><em>Glose : Objet : cette synthèse présente les résultats de l'installation d'éclairage dans les nouveaux bureaux hambourgeois d'un client de Nordlicht, ainsi que nos recommandations pour les futurs projets. Constats : 2 400 luminaires installés en six semaines, avec une semaine de retard ; coût final de 312 000 euros, soit 2 % sous le budget validé ; consommation d'énergie mesurée inférieure de 38 % à l'ancien éclairage ; installation validée sans réserve par le client final. Problème : le retard d'une semaine est dû aux diffuseurs endommagés d'une livraison. Recommandations : contrôle de l'emballage avant chaque expédition export (déjà en place depuis mars) et stock de sécurité de 2 % de pièces sur site pour les projets de plus de 1 000 luminaires. Prochaines étapes : Nordlicht souhaite utiliser ce projet comme référence pour deux appels d'offres à Brême ; il faut l'accord écrit du client final pour publier des photos, qu'Anna Weber demandera d'ici le 30 mai.</em></p>
<p>Remarquez : les chiffres de cet exemple sont fictifs ; ils montrent la précision attendue. Chaque constat tient en une ligne ; la mauvaise nouvelle (le retard) est assumée et expliquée ; les recommandations sont numérotées ; la prochaine étape a un responsable et une date.</p>

<h3>Erreurs fréquentes dans une synthèse</h3>
<ul>
<li><strong>Raconter au lieu de synthétiser</strong> : « On Monday we started, then on Tuesday... ». Le lecteur veut le bilan, pas le journal de bord.</li>
<li><strong>Noyer le message</strong> dans des détails techniques : réservez-les à une annexe (appendix).</li>
<li><strong>Oublier la recommandation</strong> : une synthèse sans proposition laisse le décideur sans action possible.</li>
<li><strong>Utiliser des adjectifs vagues</strong> (good, bad, big) au lieu de chiffres.</li>
<li><strong>Mélanger les temps</strong> : utilisez le prétérit pour les faits terminés (was installed, increased), le present perfect pour les résultats actuels (has approved, has been in place), le futur ou les modaux pour les recommandations (we recommend, we should, we will).</li>
</ul>
<blockquote><strong>À retenir :</strong> une bonne synthèse répond aux questions « So what? » (et alors, qu'est-ce que cela change ?) et « What now? » (que fait-on maintenant ?).</blockquote>
`,
    },
    {
      title: "2.7 – L'ordre du jour (agenda) : préparer une réunion par écrit",
      content: `
<h3>Le rôle de l'ordre du jour</h3>
<p>Une réunion efficace commence par un bon ordre du jour (<strong>agenda</strong>). Envoyé quelques jours avant, il permet aux participants de se préparer, de savoir ce qui sera décidé et combien de temps prévoir. Dans un contexte international, il évite aussi les malentendus liés aux fuseaux horaires et à la langue : les participants non natifs peuvent préparer leur vocabulaire à l'avance.</p>
<p>Attention au faux ami : en anglais, <strong>agenda</strong> signifie « ordre du jour ». Votre agenda personnel (le carnet ou le calendrier) se dit <strong>diary</strong> (UK), <strong>planner</strong> ou <strong>calendar</strong>.</p>

<h3>Les éléments d'un ordre du jour</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Anglais</th><th>Exemple</th></tr>
<tr><td>Titre de la réunion</td><td>Meeting title</td><td>Quarterly sales review – Brightway Ltd / Lumivia</td></tr>
<tr><td>Date, heure, fuseau</td><td>Date and time</td><td>Tuesday 15 April, 10:00–11:30 (UK time) / 11:00–12:30 (CET)</td></tr>
<tr><td>Lieu ou lien</td><td>Venue / Location</td><td>Video call (link in the calendar invitation)</td></tr>
<tr><td>Participants</td><td>Attendees / Participants</td><td>Mark Davies, Claire Moreau, Sofia Benali</td></tr>
<tr><td>Président de séance / animateur</td><td>Chair / Facilitator</td><td>Claire Moreau</td></tr>
<tr><td>Objectif</td><td>Purpose / Objective</td><td>To review Q1 sales and agree on the Q2 action plan</td></tr>
<tr><td>Points à l'ordre du jour</td><td>Agenda items</td><td>1. Q1 results 2. New products...</td></tr>
<tr><td>Responsable de chaque point</td><td>Lead / Owner</td><td>Item 2: Thomas Garnier</td></tr>
<tr><td>Durée de chaque point</td><td>Time allocated</td><td>15 minutes</td></tr>
<tr><td>Documents à lire</td><td>Pre-reading / Documents</td><td>Q1 sales report (attached)</td></tr>
<tr><td>Questions diverses</td><td>AOB (Any Other Business)</td><td>Item 6: AOB</td></tr>
</table>

<h3>Modèle d'ordre du jour</h3>
<blockquote>
<strong>AGENDA</strong><br>
<strong>Quarterly sales review – Brightway Ltd / Lumivia</strong><br><br>
<strong>Date:</strong> Tuesday 15 April<br>
<strong>Time:</strong> 10:00–11:30 UK time (11:00–12:30 CET)<br>
<strong>Location:</strong> Video call<br>
<strong>Chair:</strong> Claire Moreau (Export Manager, Lumivia)<br>
<strong>Attendees:</strong> Mark Davies (Purchasing Manager, Brightway Ltd), Thomas Garnier (Project Manager, Lumivia), Sofia Benali (Sales Assistant, Lumivia – minutes)<br>
<strong>Objective:</strong> to review first-quarter sales and agree on the action plan for the second quarter<br><br>
1. Welcome and introductions – Claire Moreau – 5 min<br>
2. Approval of the minutes of the last meeting (14 January) – Claire Moreau – 5 min<br>
3. Q1 sales results and stock levels – Mark Davies – 20 min<br>
4. Presentation of the new Lumi-Spot 15 – Thomas Garnier – 20 min<br>
5. Marketing support for Q2: brochures, samples, trade show in Birmingham – Claire Moreau – 20 min<br>
6. Delivery issues and lead times – Sofia Benali – 10 min<br>
7. AOB – all – 5 min<br>
8. Summary of action points and date of next meeting – Claire Moreau – 5 min<br><br>
<strong>Pre-reading:</strong> Q1 sales report and Lumi-Spot 15 data sheet (attached). Please send any additional items to Sofia by Friday 11 April.
</blockquote>
<p><em>Glose : Ordre du jour – Revue commerciale trimestrielle Brightway / Lumivia. Mardi 15 avril, 10 h – 11 h 30 heure britannique (11 h – 12 h 30 heure de Paris), en visioconférence. Présidente de séance : Claire Moreau. Participants : Mark Davies, Thomas Garnier, Sofia Benali (secrétaire de séance). Objectif : faire le bilan des ventes du premier trimestre et convenir du plan d'action du deuxième trimestre. 1. Accueil et présentations. 2. Approbation du compte rendu de la dernière réunion. 3. Résultats des ventes du T1 et niveaux de stock. 4. Présentation du nouveau Lumi-Spot 15. 5. Soutien marketing pour le T2 : brochures, échantillons, salon à Birmingham. 6. Problèmes de livraison et délais. 7. Questions diverses. 8. Synthèse des actions et date de la prochaine réunion. Documents à lire : rapport des ventes et fiche technique (joints). Merci d'envoyer tout point supplémentaire à Sofia d'ici le vendredi 11 avril.</em></p>

<h3>L'email d'envoi de l'ordre du jour</h3>
<blockquote>
<strong>Subject:</strong> Agenda – Quarterly sales review, Tuesday 15 April, 10:00 UK time<br><br>
Dear Mark,<br><br>
Please find attached the agenda for our quarterly sales review next Tuesday, 15 April, at 10:00 UK time (11:00 in France).<br><br>
I have also attached the Q1 sales report and the data sheet for the new Lumi-Spot 15, so that you can have a look before the meeting.<br><br>
If you would like to add any items to the agenda, please let me know by Friday 11 April.<br><br>
The video call link is in the calendar invitation.<br><br>
Best regards,<br>
Sofia Benali
</blockquote>

<h3>Vocabulaire de l'organisation de réunion</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Anglais</th><th>Français</th><th>Exemple</th></tr>
<tr><td>to schedule / to arrange a meeting</td><td>organiser, planifier une réunion</td><td>Could we schedule a meeting next week?</td></tr>
<tr><td>to call a meeting</td><td>convoquer une réunion</td><td>Claire has called a meeting for Tuesday.</td></tr>
<tr><td>to reschedule</td><td>reprogrammer</td><td>We need to reschedule the meeting.</td></tr>
<tr><td>to postpone / to put back</td><td>reporter (à plus tard)</td><td>The meeting has been postponed to Thursday.</td></tr>
<tr><td>to bring forward</td><td>avancer (à plus tôt)</td><td>Can we bring the meeting forward to 9:00?</td></tr>
<tr><td>to cancel</td><td>annuler</td><td>I'm afraid we have to cancel tomorrow's meeting.</td></tr>
<tr><td>an item</td><td>un point (de l'ordre du jour)</td><td>Let's move on to item 4.</td></tr>
<tr><td>to chair</td><td>présider</td><td>Who will chair the meeting?</td></tr>
<tr><td>to take the minutes</td><td>rédiger le compte rendu, être secrétaire de séance</td><td>Sofia will take the minutes.</td></tr>
<tr><td>apologies (for absence)</td><td>excusés</td><td>Apologies: Julien Bertrand.</td></tr>
<tr><td>a time zone</td><td>un fuseau horaire</td><td>Please note the time zone: CET.</td></tr>
<tr><td>a calendar invitation</td><td>une invitation calendrier</td><td>I've sent you a calendar invitation.</td></tr>
</table>
<blockquote><strong>À retenir :</strong> un bon ordre du jour indique pour chaque point <strong>qui</strong> le présente et <strong>combien de temps</strong> il dure, et précise toujours le <strong>fuseau horaire</strong> quand les participants sont dans des pays différents. Pour Shenzhen (Kevin Liu), pensez au décalage de 6 à 7 heures avec la France selon la saison.</blockquote>

<h3>Rédiger les points de l'ordre du jour</h3>
<p>Formulez les points de façon précise, si possible avec un verbe ou un objectif :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Point vague</th><th>Point précis</th></tr>
<tr><td>Prices</td><td>2027 price list: agree on the new distributor prices</td></tr>
<tr><td>Logistics</td><td>Delivery delays in March: causes and solutions</td></tr>
<tr><td>Marketing</td><td>Birmingham trade show: decide on stand size and budget</td></tr>
<tr><td>New products</td><td>Lumi-Spot 15: presentation and launch date</td></tr>
</table>
<p>Les verbes utiles : to review (passer en revue), to agree on (se mettre d'accord sur), to decide on (décider), to discuss (discuter de – sans préposition : « discuss the budget », pas « discuss about the budget »), to approve (approuver), to update on (faire le point sur).</p>
`,
    },
    {
      title: "2.8 – Le compte rendu de réunion (minutes) et les action points",
      content: `
<h3>À quoi sert un compte rendu ?</h3>
<p>Le compte rendu (<strong>minutes</strong>, toujours au pluriel en anglais : « the minutes of the meeting ») garde une trace officielle de ce qui a été dit, décidé et confié à chacun. Il sert de référence en cas de désaccord ultérieur et permet aux absents de se tenir informés. Dans un contexte international, il est souvent le document le plus important de la réunion : c'est lui que l'on relira dans trois mois.</p>
<p>On distingue :</p>
<ul>
<li>Les <strong>formal minutes</strong> : compte rendu détaillé, structuré point par point, utilisé pour les conseils d'administration, les comités, les réunions contractuelles.</li>
<li>Les <strong>action minutes</strong> ou <strong>meeting notes</strong> : compte rendu court centré sur les décisions et les actions. C'est le format le plus courant en entreprise.</li>
<li>Le <strong>follow-up email</strong> (email de suivi) : un résumé rapide envoyé juste après une réunion ou un appel informel.</li>
</ul>

<h3>La structure d'un compte rendu</h3>
<ol>
<li><strong>En-tête</strong> : titre, date, heure, lieu, participants (present), excusés (apologies), président (chair), rédacteur (minutes taken by).</li>
<li><strong>Approbation du compte rendu précédent</strong> (si réunion régulière).</li>
<li><strong>Points traités</strong>, dans l'ordre de l'ordre du jour : résumé de la discussion, décisions.</li>
<li><strong>Tableau des actions</strong> (action points) : action, responsable, échéance.</li>
<li><strong>Date de la prochaine réunion</strong>.</li>
</ol>

<h3>Le style du compte rendu</h3>
<p>Le compte rendu s'écrit généralement :</p>
<ul>
<li><strong>Au passé</strong> (prétérit) : « Mark presented the Q1 results. », « The team agreed to... »</li>
<li><strong>À la troisième personne</strong> : on évite « I » et « we » ; on utilise les noms ou les initiales (CM, MD, TG).</li>
<li><strong>En discours indirect</strong> : « Mark said that sales had increased » plutôt que de citer mot à mot.</li>
<li><strong>De façon neutre et factuelle</strong> : on ne juge pas (« Mark gave a brilliant presentation » n'a rien à faire dans un compte rendu).</li>
</ul>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Verbe de compte rendu</th><th>Français</th><th>Exemple</th></tr>
<tr><td>to report</td><td>rendre compte, indiquer</td><td>MD reported that stock levels were low.</td></tr>
<tr><td>to present</td><td>présenter</td><td>TG presented the new Lumi-Spot 15.</td></tr>
<tr><td>to explain</td><td>expliquer</td><td>SB explained the reasons for the delay.</td></tr>
<tr><td>to point out</td><td>faire remarquer, souligner</td><td>MD pointed out that competitors were cheaper.</td></tr>
<tr><td>to suggest / to propose</td><td>suggérer, proposer</td><td>CM suggested a joint stand at the trade show.</td></tr>
<tr><td>to agree</td><td>convenir, être d'accord</td><td>It was agreed that Lumivia would send 50 samples.</td></tr>
<tr><td>to decide</td><td>décider</td><td>It was decided to postpone the launch.</td></tr>
<tr><td>to raise (a point, a concern)</td><td>soulever (une question, une inquiétude)</td><td>MD raised concerns about lead times.</td></tr>
<tr><td>to confirm</td><td>confirmer</td><td>TG confirmed the launch date of 2 June.</td></tr>
<tr><td>to express (concern, satisfaction)</td><td>exprimer</td><td>MD expressed satisfaction with the new product.</td></tr>
</table>

<h3>Le discours indirect : rappel</h3>
<p>Dans un compte rendu, on rapporte les propos au passé. Le temps du verbe « recule » d'un cran :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Paroles prononcées (discours direct)</th><th>Compte rendu (discours indirect)</th></tr>
<tr><td>« Sales are increasing. »</td><td>MD said that sales were increasing.</td></tr>
<tr><td>« We have received the samples. »</td><td>MD said that they had received the samples.</td></tr>
<tr><td>« We will send the brochures next week. »</td><td>CM said that Lumivia would send the brochures the following week.</td></tr>
<tr><td>« We can deliver in five weeks. »</td><td>SB confirmed that Lumivia could deliver in five weeks.</td></tr>
<tr><td>« The price increased last year. »</td><td>CM explained that the price had increased the previous year.</td></tr>
</table>
<p>Notez aussi que les repères de temps changent : next week devient the following week ; yesterday devient the day before ; tomorrow devient the next day.</p>

<h3>Modèle de compte rendu (action minutes)</h3>
<blockquote>
<strong>MINUTES</strong><br>
<strong>Quarterly sales review – Brightway Ltd / Lumivia</strong><br><br>
<strong>Date:</strong> Tuesday 15 April, 10:00–11:35 UK time (video call)<br>
<strong>Present:</strong> Claire Moreau (CM, chair), Mark Davies (MD), Thomas Garnier (TG), Sofia Benali (SB, minutes)<br>
<strong>Apologies:</strong> Julien Bertrand (JB)<br><br>
<strong>1. Welcome</strong><br>
CM welcomed the participants and presented the agenda.<br><br>
<strong>2. Minutes of the last meeting</strong><br>
The minutes of the meeting of 14 January were approved without changes.<br><br>
<strong>3. Q1 sales results</strong><br>
MD reported that Brightway had sold 1,450 Lumi-Panel 60 in Q1, compared with 1,200 in Q4. Stock in Manchester was low (about 150 units). MD pointed out that two large orders were expected in May.<br>
Decision: Brightway will place a stock order of 800 units by 25 April.<br><br>
<strong>4. Lumi-Spot 15</strong><br>
TG presented the new product and its technical data. MD expressed strong interest but raised concerns about the price, which he considered high for the UK market. CM explained that the price included a five-year warranty.<br>
Decision: Lumivia will send 20 samples to Brightway for customer demonstrations.<br><br>
<strong>5. Marketing support for Q2</strong><br>
CM suggested a joint stand at the Birmingham trade show in June. MD agreed in principle but needed approval from his director.<br><br>
<strong>6. Delivery issues</strong><br>
SB explained that the March delay was due to a shortage of drivers at the carrier. A second carrier has been added to secure deliveries to the UK.<br><br>
<strong>7. AOB</strong><br>
None.<br><br>
<strong>Action points</strong>
</blockquote>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>No.</th><th>Action</th><th>Owner</th><th>Deadline</th></tr>
<tr><td>1</td><td>Send purchase order for 800 Lumi-Panel 60</td><td>MD</td><td>25 April</td></tr>
<tr><td>2</td><td>Send 20 Lumi-Spot 15 samples to Manchester</td><td>TG</td><td>30 April</td></tr>
<tr><td>3</td><td>Confirm participation in the Birmingham trade show</td><td>MD</td><td>9 May</td></tr>
<tr><td>4</td><td>Send stand options and costs for Birmingham</td><td>CM</td><td>2 May</td></tr>
<tr><td>5</td><td>Circulate the minutes to all participants</td><td>SB</td><td>16 April</td></tr>
</table>
<blockquote><strong>Next meeting:</strong> Tuesday 15 July, 10:00 UK time (video call).</blockquote>
<p><em>Glose (extraits) : Mark Davies a indiqué que Brightway avait vendu 1 450 Lumi-Panel 60 au T1, contre 1 200 au T4. Le stock de Manchester était bas. Il a souligné que deux grosses commandes étaient attendues en mai. Décision : Brightway passera une commande de stock de 800 unités d'ici le 25 avril. Thomas a présenté le nouveau produit ; Mark a manifesté un vif intérêt mais a exprimé des réserves sur le prix, qu'il jugeait élevé pour le marché britannique ; Claire a expliqué que le prix incluait une garantie de cinq ans...</em></p>

<h3>Les action points : la partie la plus lue</h3>
<p>Le tableau des actions est souvent la seule partie que les participants relisent. Chaque ligne doit être :</p>
<ul>
<li><strong>Actionnable</strong> : commencer par un verbe (send, confirm, check, prepare, update, book).</li>
<li><strong>Attribuée</strong> à une seule personne (owner), même si plusieurs y contribuent.</li>
<li><strong>Datée</strong> avec une échéance réelle, pas « ASAP » ni « soon ».</li>
</ul>

<h3>L'email d'envoi du compte rendu</h3>
<blockquote>
<strong>Subject:</strong> Minutes – Quarterly sales review, 15 April<br><br>
Dear all,<br><br>
Thank you for your participation in today's meeting. Please find attached the minutes, including the action points.<br><br>
Could you please check them and let me know of any corrections by Thursday 17 April? If I do not hear from you, I will consider the minutes approved.<br><br>
Best regards,<br>
Sofia Benali
</blockquote>
<blockquote><strong>À retenir :</strong> envoyez le compte rendu dans les 24 à 48 heures. Plus il arrive tard, moins il est lu, et plus les participants ont oublié ce qui a été décidé.</blockquote>
`,
    },
    {
      title: "2.9 – Ponctuation, majuscules, dates et formats (UK / US)",
      content: `
<h3>Les majuscules : beaucoup plus fréquentes qu'en français</h3>
<p>L'anglais met une majuscule à de nombreux mots qui restent en minuscule en français :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Catégorie</th><th>Anglais (majuscule)</th><th>Français (minuscule)</th></tr>
<tr><td>Jours de la semaine</td><td>Monday, Tuesday</td><td>lundi, mardi</td></tr>
<tr><td>Mois</td><td>January, March</td><td>janvier, mars</td></tr>
<tr><td>Nationalités et adjectifs de nationalité</td><td>French, German, a British company</td><td>français, allemand, une entreprise britannique</td></tr>
<tr><td>Langues</td><td>English, Chinese</td><td>l'anglais, le chinois</td></tr>
<tr><td>Pronom personnel « je »</td><td>I</td><td>je</td></tr>
<tr><td>Titres de documents (title case)</td><td>Quarterly Sales Report</td><td>Rapport trimestriel des ventes</td></tr>
<tr><td>Fonctions devant un nom</td><td>Export Manager Claire Moreau</td><td>la responsable export Claire Moreau</td></tr>
<tr><td>Fêtes</td><td>Christmas, Easter, New Year's Day</td><td>Noël, Pâques, le jour de l'An</td></tr>
</table>
<p>En revanche, les saisons restent en minuscule (spring, summer, autumn / fall, winter). Dans un titre, on peut choisir le « title case » (majuscule aux mots principaux : « Delivery Schedule for Q2 ») ou le « sentence case » (majuscule au premier mot seulement : « Delivery schedule for Q2 »), mais il faut rester cohérent.</p>
<blockquote><strong>À retenir :</strong> la phrase « we will meet our german partners on monday » contient trois fautes de majuscule : <strong>We</strong> en début de phrase, <strong>German</strong> et <strong>Monday</strong>. Pensez aussi à « I » toujours en majuscule.</blockquote>

<h3>La ponctuation : les différences avec le français</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Règle</th><th>Anglais</th><th>Français</th></tr>
<tr><td>Espace avant ? ! : ;</td><td>Pas d'espace : Can you confirm?</td><td>Espace insécable : Pouvez-vous confirmer ?</td></tr>
<tr><td>Guillemets</td><td>"double" (US, et souvent UK) ou 'simple' (UK)</td><td>« chevrons »</td></tr>
<tr><td>Virgule après un connecteur en début de phrase</td><td>However, ... / Therefore, ... / In addition, ...</td><td>Souvent facultative</td></tr>
<tr><td>Virgule d'Oxford (serial comma)</td><td>red, green, and blue (fréquente en US, facultative en UK)</td><td>rouge, vert et bleu</td></tr>
<tr><td>Virgule avant « that » (proposition déterminative)</td><td>Jamais : the order that you placed</td><td>—</td></tr>
<tr><td>Point-virgule</td><td>Relie deux phrases complètes liées : The goods are ready; they will leave tomorrow.</td><td>Usage proche</td></tr>
<tr><td>Apostrophe du possessif</td><td>the customer's order (un client) / the customers' orders (plusieurs clients)</td><td>—</td></tr>
</table>
<p><strong>La « virgule soudée » (comma splice)</strong> est une erreur fréquente des francophones : on relie deux phrases complètes par une simple virgule. « The goods are ready, they will leave tomorrow » est incorrect. Corrigez avec un point, un point-virgule ou un connecteur : « The goods are ready. They will leave tomorrow. » ou « The goods are ready, so they will leave tomorrow. »</p>
<p><strong>Its / it's</strong> : « it's » = it is (It's ready) ; « its » = son, sa (The company and its customers). C'est une erreur fréquente, même chez les natifs.</p>

<h3>Les dates</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Format</th><th>Anglais britannique (UK)</th><th>Anglais américain (US)</th></tr>
<tr><td>Écrit en toutes lettres</td><td>14 March 2027 (ou 14th March 2027)</td><td>March 14, 2027</td></tr>
<tr><td>Lu à voix haute</td><td>the fourteenth of March</td><td>March fourteenth</td></tr>
<tr><td>Format numérique</td><td>14/03/2027 (jour/mois/année)</td><td>03/14/2027 (mois/jour/année)</td></tr>
<tr><td>Format international (ISO), compris partout</td><td>2027-03-14 (année-mois-jour)</td><td>2027-03-14 (année-mois-jour)</td></tr>
</table>
<blockquote><strong>Attention :</strong> la date 04/05/2027 signifie 4 mai au Royaume-Uni et en France, mais 5 avril aux États-Unis. Dans un email international, écrivez toujours le mois en lettres (<strong>4 May 2027</strong>) pour éviter toute ambiguïté.</blockquote>
<p>Prépositions de temps : <strong>on</strong> + jour ou date (on Monday, on 14 March) ; <strong>in</strong> + mois, année, saison (in March, in 2027, in summer) ; <strong>at</strong> + heure (at 10:00, at noon) ; <strong>by</strong> + échéance (by Friday = au plus tard vendredi) ; <strong>until</strong> + durée jusqu'à (until Friday = jusqu'à vendredi). La différence entre <strong>by</strong> et <strong>until</strong> est essentielle : « Please reply by Friday » (répondez au plus tard vendredi) ; « The offer is valid until Friday » (l'offre est valable jusqu'à vendredi).</p>

<h3>Les heures</h3>
<ul>
<li>Le Royaume-Uni et les États-Unis utilisent souvent le format 12 heures : 9 am (9 h), 2 pm (14 h), 12 noon (midi), 12 midnight (minuit).</li>
<li>Le format 24 heures (14:00) est compris partout et préférable dans les emails internationaux, avec le fuseau : 14:00 CET, 13:00 UK time, 21:00 China Standard Time.</li>
<li>Séparateur : deux-points (14:00) ou point (14.00) au Royaume-Uni. Jamais « 14h00 » en anglais.</li>
</ul>

<h3>Les nombres et les montants</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Anglais</th><th>Français</th></tr>
<tr><td>Séparateur décimal</td><td>point : 46.50</td><td>virgule : 46,50</td></tr>
<tr><td>Séparateur des milliers</td><td>virgule : 83,550 / 2,400,000</td><td>espace : 83 550 / 2 400 000</td></tr>
<tr><td>Monnaie</td><td>€46.50 ou 46.50 euros / EUR 46.50 ; £1,200 ; $3,000</td><td>46,50 € ; 1 200 £</td></tr>
<tr><td>Pourcentage</td><td>5% (sans espace) – five per cent (UK) / percent (US)</td><td>5 %</td></tr>
<tr><td>Milliard</td><td>a billion (1,000,000,000)</td><td>un milliard</td></tr>
<tr><td>Abréviations</td><td>k (thousand), m ou M (million), bn (billion)</td><td>k, M, Md</td></tr>
<tr><td>Nombres ordinaux</td><td>1st, 2nd, 3rd, 4th, 21st, 22nd</td><td>1er, 2e, 3e</td></tr>
</table>
<p>Exemple : « Le montant total est de 83 550,00 € HT » s'écrit « The total amount is €83,550.00 excluding VAT ». Une erreur de séparateur peut multiplier un prix par mille : « 1.200 » lu par un Britannique signifie « un virgule deux », pas « mille deux cents ».</p>
<p>Règle de style : on écrit en général les nombres de un à neuf en lettres (five weeks, two deliveries) et les nombres à partir de 10 en chiffres (15 units, 2,400 luminaires). Les mesures, prix et pourcentages s'écrivent toujours en chiffres (5 kg, 45 W, 6%).</p>

<h3>Les abréviations courantes à l'écrit</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Abréviation</th><th>Signification</th><th>Français</th></tr>
<tr><td>e.g.</td><td>for example (exempli gratia)</td><td>par exemple</td></tr>
<tr><td>i.e.</td><td>that is (id est)</td><td>c'est-à-dire</td></tr>
<tr><td>etc.</td><td>and so on</td><td>etc.</td></tr>
<tr><td>approx.</td><td>approximately</td><td>environ</td></tr>
<tr><td>ref.</td><td>reference</td><td>référence</td></tr>
<tr><td>encl. / att.</td><td>enclosed / attached</td><td>pièce jointe</td></tr>
<tr><td>cc / bcc</td><td>carbon copy / blind carbon copy</td><td>copie / copie cachée</td></tr>
<tr><td>FYI</td><td>for your information</td><td>pour information</td></tr>
<tr><td>ASAP</td><td>as soon as possible</td><td>dès que possible</td></tr>
<tr><td>EOD / COB</td><td>end of day / close of business</td><td>d'ici la fin de la journée</td></tr>
<tr><td>TBC / TBD</td><td>to be confirmed / to be decided</td><td>à confirmer / à décider</td></tr>
<tr><td>N/A</td><td>not applicable / not available</td><td>sans objet / non disponible</td></tr>
<tr><td>Ltd / GmbH / SAS</td><td>formes juridiques (UK / Allemagne / France)</td><td>société à responsabilité limitée, etc.</td></tr>
</table>
<p>Ne confondez pas <strong>e.g.</strong> (introduit des exemples, liste non exhaustive) et <strong>i.e.</strong> (introduit une précision, une reformulation).</p>
`,
    },
    {
      title: "2.10 – Erreurs fréquentes des francophones et faux amis",
      content: `
<h3>Pourquoi les francophones font-ils les mêmes erreurs ?</h3>
<p>La plupart des erreurs à l'écrit viennent de la <strong>traduction mentale</strong> depuis le français : on pense la phrase en français, puis on la transpose mot à mot. Or certaines structures, certains mots et certaines prépositions ne fonctionnent pas de la même manière. Connaître ces pièges permet de les repérer à la relecture.</p>

<h3>Les faux amis du monde professionnel</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Mot anglais</th><th>Sens réel en anglais</th><th>Ce que le francophone veut dire</th><th>Mot correct</th></tr>
<tr><td>actually</td><td>en fait</td><td>actuellement</td><td>currently, at the moment</td></tr>
<tr><td>eventually</td><td>finalement</td><td>éventuellement</td><td>possibly, if necessary</td></tr>
<tr><td>to assist</td><td>aider</td><td>assister à (une réunion)</td><td>to attend</td></tr>
<tr><td>to attend</td><td>assister à, participer à</td><td>attendre</td><td>to wait (for)</td></tr>
<tr><td>to demand</td><td>exiger</td><td>demander</td><td>to ask (for), to request</td></tr>
<tr><td>a formation</td><td>une formation (géologique, militaire)</td><td>une formation (cours)</td><td>a training course, training</td></tr>
<tr><td>a lecture</td><td>un cours magistral, une conférence</td><td>une lecture</td><td>reading</td></tr>
<tr><td>a library</td><td>une bibliothèque</td><td>une librairie</td><td>a bookshop (UK) / bookstore (US)</td></tr>
<tr><td>a location</td><td>un emplacement, un lieu</td><td>une location</td><td>a rental, to rent</td></tr>
<tr><td>to control</td><td>maîtriser, diriger</td><td>contrôler, vérifier</td><td>to check, to inspect</td></tr>
<tr><td>a delay</td><td>un retard</td><td>un délai</td><td>a lead time, a deadline, a time frame</td></tr>
<tr><td>to precise</td><td>(n'existe pas comme verbe)</td><td>préciser</td><td>to specify, to clarify</td></tr>
<tr><td>sympathetic</td><td>compatissant</td><td>sympathique</td><td>nice, friendly</td></tr>
<tr><td>an occasion</td><td>un événement, une circonstance</td><td>une opportunité, une occasion d'affaires</td><td>an opportunity</td></tr>
<tr><td>a souvenir</td><td>un objet souvenir</td><td>un souvenir (mémoire)</td><td>a memory</td></tr>
<tr><td>to resume</td><td>reprendre (après une pause)</td><td>résumer</td><td>to summarise (UK) / summarize (US)</td></tr>
<tr><td>a résumé (US)</td><td>un CV</td><td>un résumé</td><td>a summary</td></tr>
<tr><td>to realise</td><td>se rendre compte</td><td>réaliser (un projet)</td><td>to carry out, to complete</td></tr>
<tr><td>responsible</td><td>(adjectif seulement : responsable de)</td><td>un responsable</td><td>a manager, the person in charge</td></tr>
<tr><td>an agenda</td><td>un ordre du jour</td><td>un agenda</td><td>a diary, a planner</td></tr>
<tr><td>to support</td><td>soutenir, aider</td><td>supporter (tolérer)</td><td>to put up with, to stand</td></tr>
<tr><td>a deception</td><td>une tromperie</td><td>une déception</td><td>a disappointment</td></tr>
<tr><td>a coin</td><td>une pièce de monnaie</td><td>un coin</td><td>a corner</td></tr>
</table>
<blockquote><strong>À retenir :</strong> le faux ami le plus dangereux dans un email commercial est <strong>delay</strong> : « the delay is three weeks » signifie « le retard est de trois semaines », pas « le délai est de trois semaines ». Pour un délai normal de fabrication, dites <strong>lead time</strong> ; pour une date limite, <strong>deadline</strong>.</blockquote>

<h3>Les erreurs de grammaire les plus fréquentes</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Erreur</th><th>Correction</th><th>Explication</th></tr>
<tr><td>I am agree.</td><td>I agree.</td><td>« Agree » est un verbe, pas un adjectif.</td></tr>
<tr><td>Thank you for your informations.</td><td>Thank you for your information.</td><td>« Information » est indénombrable : pas de pluriel. Pour un élément : a piece of information.</td></tr>
<tr><td>Can you give me an advice?</td><td>Can you give me some advice?</td><td>« Advice » est indénombrable (comme equipment, furniture, feedback, news, luggage).</td></tr>
<tr><td>I look forward to hear from you.</td><td>I look forward to hearing from you.</td><td>« To » est ici une préposition : verbe en -ing.</td></tr>
<tr><td>I have sent the offer yesterday.</td><td>I sent the offer yesterday.</td><td>Avec un moment passé précis (yesterday, last week, on Monday), on utilise le prétérit, pas le present perfect.</td></tr>
<tr><td>I work here since 2019.</td><td>I have worked here since 2019.</td><td>Action commencée dans le passé et qui continue : present perfect.</td></tr>
<tr><td>We discussed about the price.</td><td>We discussed the price.</td><td>« Discuss » est transitif direct (comme contact, answer, attend, reach).</td></tr>
<tr><td>Please contact with me.</td><td>Please contact me.</td><td>Idem : pas de préposition après « contact ».</td></tr>
<tr><td>It depends of the quantity.</td><td>It depends on the quantity.</td><td>« Depend on », jamais « of ».</td></tr>
<tr><td>The people is satisfied.</td><td>The people are satisfied.</td><td>« People » est pluriel.</td></tr>
<tr><td>He explained me the problem.</td><td>He explained the problem to me.</td><td>« Explain something to someone ».</td></tr>
<tr><td>She said me that...</td><td>She told me that... / She said that...</td><td>« Tell someone », « say something ».</td></tr>
<tr><td>We are waiting your answer.</td><td>We are waiting for your answer.</td><td>« Wait for ».</td></tr>
<tr><td>The meeting is on 10 o'clock.</td><td>The meeting is at 10 o'clock.</td><td>« At » + heure.</td></tr>
<tr><td>Since three weeks.</td><td>For three weeks.</td><td>« For » + durée, « since » + point de départ.</td></tr>
</table>

<h3>Les calques de formules françaises</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Calque du français (à éviter)</th><th>Formule anglaise naturelle</th></tr>
<tr><td>I remain at your disposal for any further information.</td><td>Please let me know if you have any questions.</td></tr>
<tr><td>Please accept, Madam, the expression of my distinguished salutations.</td><td>Yours sincerely, / Kind regards,</td></tr>
<tr><td>I come back to you concerning...</td><td>I'm getting back to you about... / I'm following up on...</td></tr>
<tr><td>I take the liberty to write you.</td><td>I am writing to you.</td></tr>
<tr><td>Thanking you in advance.</td><td>Thank you in advance. / Many thanks in advance.</td></tr>
<tr><td>Hoping that this will satisfy you.</td><td>I hope this answers your question.</td></tr>
<tr><td>Good reception.</td><td>(rien, ou) I hope you find everything in order.</td></tr>
<tr><td>Good continuation.</td><td>All the best with the project. / Best of luck with...</td></tr>
<tr><td>I send you in attached file...</td><td>Please find attached... / I have attached...</td></tr>
<tr><td>Can you send me the document quickly?</td><td>Could you send me the document by Thursday?</td></tr>
</table>

<h3>Prononciation : quelques mots de l'écrit qu'on lit souvent à voix haute</h3>
<p>Même à l'écrit, vous serez amené à lire vos emails ou comptes rendus en réunion. Quelques mots souvent mal prononcés :</p>
<ul>
<li><strong>minutes</strong> (compte rendu) : MI-nits, comme les minutes de l'heure (à ne pas confondre avec l'adjectif minute, « minuscule », prononcé maï-NIOUT).</li>
<li><strong>schedule</strong> : SHED-youl (UK) ou SKED-joul (US).</li>
<li><strong>quotation</strong> : kouo-TÉÏ-sheun.</li>
<li><strong>purchase</strong> : PEU-tcheus (et non « peur-chéïze »).</li>
<li><strong>invoice</strong> : IN-voïs.</li>
<li><strong>receipt</strong> : ri-SIIT (le p est muet).</li>
<li><strong>Wednesday</strong> : WENZ-déï (le premier d est muet).</li>
<li><strong>suite</strong> (ensemble) : SOUIT, comme sweet.</li>
</ul>

<h3>La relecture en 5 points (checklist)</h3>
<ol>
<li><strong>Destinataire et objet</strong> : le bon nom, le bon titre (Mr / Ms), un objet précis.</li>
<li><strong>Chiffres et dates</strong> : séparateurs anglais, mois en lettres, fuseau horaire, calculs vérifiés.</li>
<li><strong>Faux amis</strong> : delay, actually, eventually, assist, attend, demand.</li>
<li><strong>Grammaire</strong> : information / advice sans s, look forward to + -ing, prétérit avec un moment passé.</li>
<li><strong>Appel à l'action</strong> : qui, quoi, quand.</li>
</ol>
<blockquote><strong>À retenir :</strong> relisez au moins une fois <strong>à voix basse</strong>, en anglais. Une phrase qui « sonne français » est souvent un calque à reformuler.</blockquote>
`,
    },
    {
      title: "2.11 – Messagerie instantanée (Teams, Slack) et LinkedIn",
      content: `
<h3>La messagerie instantanée : un écrit à part</h3>
<p>Dans beaucoup d'entreprises, une partie des échanges internationaux passe par des messageries instantanées : Microsoft Teams, Slack, WhatsApp Business, WeChat (très utilisé en Chine, par exemple avec Kevin Liu). Ces outils ont leurs propres codes : messages courts, ton plus direct, réponses rapides. Mais ils restent des écrits professionnels : <strong>tout ce qui est écrit peut être relu, transféré ou capturé</strong>.</p>

<h3>Les règles de base</h3>
<ul>
<li><strong>Un message complet plutôt que cinq fragments</strong> : évitez d'envoyer « Hi », puis « Are you there? », puis la question. Écrivez directement : « Hi Kevin, quick question about the SC-450 drivers: can you confirm the shipping date for batch 2? »</li>
<li><strong>Le contexte d'abord</strong> : votre interlocuteur reçoit des dizaines de messages ; rappelez de quoi vous parlez (numéro de commande, projet).</li>
<li><strong>Le bon canal</strong> : une décision importante, une réclamation ou un engagement contractuel doivent être confirmés par email.</li>
<li><strong>Le respect des horaires</strong> : tenez compte des fuseaux horaires et des statuts (away, do not disturb). Écrire à Kevin Liu à 17 h heure de Lyon, c'est lui écrire à 23 h ou minuit à Shenzhen.</li>
<li><strong>Les émojis</strong> : avec parcimonie, et seulement si votre interlocuteur en utilise. Un pouce levé peut être perçu comme sec ou ambigu dans certaines cultures.</li>
</ul>

<h3>Les phrases et abréviations de la messagerie</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Expression</th><th>Sens</th><th>Registre</th></tr>
<tr><td>Quick question: ...</td><td>Petite question : ...</td><td>neutre</td></tr>
<tr><td>Do you have a minute?</td><td>Tu as / Vous avez une minute ?</td><td>neutre</td></tr>
<tr><td>Just checking in on...</td><td>Je fais un point sur...</td><td>neutre</td></tr>
<tr><td>Noted, thanks!</td><td>Bien noté, merci !</td><td>neutre</td></tr>
<tr><td>On it.</td><td>Je m'en occupe.</td><td>informel</td></tr>
<tr><td>Will do.</td><td>Je vais le faire.</td><td>informel</td></tr>
<tr><td>Sounds good.</td><td>Ça me va.</td><td>informel</td></tr>
<tr><td>Let me check and get back to you.</td><td>Je vérifie et je reviens vers toi / vous.</td><td>neutre</td></tr>
<tr><td>BRB (be right back)</td><td>je reviens tout de suite</td><td>très informel</td></tr>
<tr><td>FYI (for your information)</td><td>pour info</td><td>neutre</td></tr>
<tr><td>BTW (by the way)</td><td>au fait</td><td>informel</td></tr>
<tr><td>ETA (estimated time of arrival)</td><td>heure ou date d'arrivée estimée</td><td>neutre</td></tr>
<tr><td>OOO (out of office)</td><td>absent du bureau</td><td>neutre</td></tr>
<tr><td>WFH (working from home)</td><td>en télétravail</td><td>informel</td></tr>
<tr><td>TBC (to be confirmed)</td><td>à confirmer</td><td>neutre</td></tr>
<tr><td>Thx / Thanks</td><td>merci</td><td>informel / neutre</td></tr>
</table>
<p>Avec un interlocuteur non natif, limitez les abréviations : FYI, ETA et TBC sont largement comprises, mais BRB ou IMO (in my opinion) peuvent ne pas l'être.</p>

<h3>Exemple d'échange sur Teams</h3>
<blockquote>
<strong>Sofia Benali (09:12):</strong> Hi Kevin, hope you're well. Quick question about PO LUM-P-0381 (SC-450 drivers, batch 2): could you confirm the ETA at Lyon? Our production team needs the drivers by 22 April.<br>
<strong>Kevin Liu (09:40):</strong> Hi Sofia. Batch 2 arrived at Fos port this morning. Customs clearance usually takes two days, then one day by truck. So ETA Lyon is 18 April, if there is no delay at customs.<br>
<strong>Sofia Benali (09:43):</strong> Great, thanks Kevin. Could you send me the bill of lading by email so I can forward it to our customs agent?<br>
<strong>Kevin Liu (09:51):</strong> Sure, I'll send it today.<br>
<strong>Sofia Benali (09:52):</strong> Perfect, thanks a lot!
</blockquote>
<p><em>Glose : Sofia demande la date d'arrivée estimée du deuxième lot de drivers, en rappelant la référence de commande et l'échéance de production. Kevin répond que le lot est arrivé le matin même au port de Fos ; le dédouanement prend en général deux jours, puis un jour de camion : arrivée estimée à Lyon le 18 avril, sauf retard en douane. Sofia demande le connaissement (bill of lading) par email pour le transmettre à son commissionnaire en douane.</em></p>
<p>Remarquez : le premier message contient tout (salutation, référence, question, échéance) ; la demande d'un document officiel passe par l'email.</p>

<h3>Le message d'absence (out-of-office reply)</h3>
<blockquote>
Thank you for your email. I am out of the office until Monday 14 April with limited access to email. For urgent matters, please contact Claire Moreau (Export Manager). Otherwise, I will reply to your message as soon as possible after my return.<br>
Best regards,<br>
Sofia Benali
</blockquote>
<p><em>Glose : Merci pour votre email. Je suis absente jusqu'au lundi 14 avril avec un accès limité à mes emails. Pour toute urgence, merci de contacter Claire Moreau (responsable export). Sinon, je répondrai à votre message dès que possible à mon retour.</em></p>

<h3>LinkedIn : le réseau professionnel</h3>
<p>LinkedIn est largement utilisé pour prospecter, entretenir une relation commerciale ou recruter. Les écrits y sont publics ou semi-publics : soignez particulièrement votre anglais.</p>
<h4>Le titre de profil (headline) et le résumé (About)</h4>
<p>Le titre de profil présente votre fonction et votre valeur ajoutée en une ligne :</p>
<blockquote>Export Manager at Lumivia | LED lighting solutions for office buildings | UK, Germany, Benelux</blockquote>
<p>Le résumé (section About) se rédige à la première personne, en trois ou quatre phrases :</p>
<blockquote>I lead the export team at Lumivia, a French manufacturer of energy-efficient LED lighting for offices and public buildings. I work with distributors and contractors in the UK, Germany and the Benelux countries to bring high-quality lighting to their projects. I am always happy to connect with lighting designers, distributors and facility managers.</blockquote>

<h4>L'invitation à se connecter</h4>
<p>N'envoyez jamais une invitation sans message personnalisé à un contact professionnel inconnu. Le message est limité en longueur : soyez bref et précis.</p>
<blockquote>Hello Ms Weber, we met briefly at the lighting trade fair in Frankfurt. I enjoyed our conversation about lighting for office renovations and would be glad to stay in touch. Best regards, Claire Moreau (Lumivia)</blockquote>
<p><em>Glose : Bonjour Madame Weber, nous nous sommes brièvement rencontrées au salon de l'éclairage de Francfort. J'ai apprécié notre échange sur l'éclairage des rénovations de bureaux et serais ravie de rester en contact.</em></p>

<h4>Le message de suivi après la connexion</h4>
<blockquote>Hi Anna, thank you for connecting. As promised, I'm sending you our case study on the renovation of a large office building in Lyon. If you think it could be relevant for Nordlicht's customers, I'd be happy to organise a short call. Best regards, Claire</blockquote>

<h4>Une publication professionnelle (post)</h4>
<blockquote>We are proud to have completed the lighting of a new 2,400-luminaire office project in Hamburg with our partner Nordlicht GmbH. Thank you to the installation teams for their hard work, and to Nordlicht for their trust. Next stop: Bremen!</blockquote>
<p>Règles pour une publication : une idée principale, une phrase d'accroche, des remerciements nominatifs (avec l'accord des personnes et des entreprises citées), pas de données confidentielles (prix, noms de clients finaux sans autorisation).</p>

<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Vocabulaire LinkedIn</th><th>Français</th></tr>
<tr><td>to connect with someone</td><td>se connecter avec quelqu'un, l'ajouter à son réseau</td></tr>
<tr><td>a connection request</td><td>une invitation</td></tr>
<tr><td>to endorse a skill</td><td>recommander une compétence</td></tr>
<tr><td>a recommendation</td><td>une recommandation écrite</td></tr>
<tr><td>a post / to post</td><td>une publication / publier</td></tr>
<tr><td>to share / to like / to comment</td><td>partager / aimer / commenter</td></tr>
<tr><td>to follow a company page</td><td>suivre une page entreprise</td></tr>
<tr><td>a direct message (DM)</td><td>un message privé</td></tr>
</table>
<blockquote><strong>À retenir :</strong> sur la messagerie et LinkedIn, on peut être plus court et plus direct qu'en email, mais la politesse (Hi..., thanks, best regards) et la précision (références, dates) restent indispensables. Les engagements importants se confirment toujours par email.</blockquote>
`,
    },
    {
      title: "2.12 – Quiz de fin de chapitre",
      content: `
<h3>Consignes</h3>
<p>Ce quiz de 20 questions permet de vérifier vos acquis du jour 2. Pour chaque question, une seule réponse est correcte. Répondez d'abord sans regarder la correction, puis comparez. Le formateur utilise ce quiz dans le cadre de l'évaluation interne de la compétence C2 (écrits professionnels).</p>

<h4>Question 1</h4>
<p>Quelle formule de politesse finale convient après « Dear Sir or Madam » dans un courrier britannique formel ?</p>
<ul><li>a) Yours sincerely,</li><li>b) Yours faithfully,</li><li>c) Cheers,</li><li>d) Best,</li></ul>
<p><strong>Réponse : b.</strong> Au Royaume-Uni, « Yours faithfully » s'emploie quand on ne connaît pas le nom du destinataire ; « Yours sincerely » quand on le connaît. « Cheers » et « Best » sont informels.</p>

<h4>Question 2</h4>
<p>Quel objet d'email est le plus efficace ?</p>
<ul><li>a) Urgent!!!</li><li>b) Question</li><li>c) Order LUM-2417 – delivery delayed to 21 March</li><li>d) Hello Anna</li></ul>
<p><strong>Réponse : c.</strong> Un bon objet est court, précis et contient la référence et l'information principale. Les autres objets ne disent rien du contenu.</p>

<h4>Question 3</h4>
<p>Complétez : « I look forward to ... from you. »</p>
<ul><li>a) hear</li><li>b) hearing</li><li>c) heard</li><li>d) be hearing</li></ul>
<p><strong>Réponse : b.</strong> Dans « look forward to », « to » est une préposition, donc suivie d'un verbe en -ing.</p>

<h4>Question 4</h4>
<p>Que signifie « The delay is two weeks » ?</p>
<ul><li>a) Le délai de fabrication est de deux semaines.</li><li>b) Le retard est de deux semaines.</li><li>c) La date limite est dans deux semaines.</li><li>d) La livraison prendra deux semaines.</li></ul>
<p><strong>Réponse : b.</strong> « Delay » est un faux ami : il signifie « retard ». Le délai de fabrication se dit « lead time », la date limite « deadline ».</p>

<h4>Question 5</h4>
<p>Quelle phrase est la plus diplomatique pour signaler une erreur sur une facture ?</p>
<ul><li>a) You made a mistake on the invoice.</li><li>b) Your invoice is wrong.</li><li>c) There seems to be a mistake on the invoice.</li><li>d) Correct your invoice.</li></ul>
<p><strong>Réponse : c.</strong> « There seems to be » et la formulation impersonnelle évitent d'accuser directement le destinataire, tout en restant claires.</p>

<h4>Question 6</h4>
<p>Comment écrire « 83 550,00 € » dans un email en anglais ?</p>
<ul><li>a) €83.550,00</li><li>b) €83,550.00</li><li>c) €83 550,00</li><li>d) €83550,00</li></ul>
<p><strong>Réponse : b.</strong> En anglais, la virgule sépare les milliers et le point sépare les décimales : l'inverse du français.</p>

<h4>Question 7</h4>
<p>Quel connecteur exprime une conséquence ?</p>
<ul><li>a) however</li><li>b) although</li><li>c) therefore</li><li>d) despite</li></ul>
<p><strong>Réponse : c.</strong> « Therefore » (donc, par conséquent) introduit une conséquence. « However », « although » et « despite » expriment une opposition ou une concession.</p>

<h4>Question 8</h4>
<p>Quelle phrase est correcte ?</p>
<ul><li>a) Despite of the delay, the customer was satisfied.</li><li>b) Despite the delay, the customer was satisfied.</li><li>c) Despite the delivery was late, the customer was satisfied.</li><li>d) Although the delay, the customer was satisfied.</li></ul>
<p><strong>Réponse : b.</strong> « Despite » est suivi directement d'un nom, sans « of ». « Although » est suivi d'une proposition (sujet + verbe) : « Although the delivery was late, ... ».</p>

<h4>Question 9</h4>
<p>Que signifie « agenda » dans un email professionnel en anglais ?</p>
<ul><li>a) Un carnet de rendez-vous</li><li>b) Un ordre du jour</li><li>c) Un compte rendu</li><li>d) Un planning de production</li></ul>
<p><strong>Réponse : b.</strong> « Agenda » est un faux ami : il désigne l'ordre du jour d'une réunion. Le carnet de rendez-vous se dit « diary » (UK), « planner » ou « calendar ».</p>

<h4>Question 10</h4>
<p>Que signifie AOB dans un ordre du jour ?</p>
<ul><li>a) Action on board</li><li>b) Any other business</li><li>c) Agenda of the board</li><li>d) Approval of budget</li></ul>
<p><strong>Réponse : b.</strong> AOB (Any Other Business) correspond aux « questions diverses », généralement en fin d'ordre du jour.</p>

<h4>Question 11</h4>
<p>Dans un compte rendu, comment rapporter la phrase de Mark : « We will send the order next week » ?</p>
<ul><li>a) MD said that they will send the order next week.</li><li>b) MD said that they would send the order the following week.</li><li>c) MD says we send the order next week.</li><li>d) MD said: we will send the order next week.</li></ul>
<p><strong>Réponse : b.</strong> Au discours indirect, « will » devient « would » et « next week » devient « the following week ». Le compte rendu s'écrit au passé et à la troisième personne.</p>

<h4>Question 12</h4>
<p>Quelle ligne d'action (action point) est la mieux rédigée ?</p>
<ul><li>a) Samples – soon</li><li>b) Someone should check the samples.</li><li>c) Send 20 Lumi-Spot 15 samples to Manchester – TG – 30 April</li><li>d) Samples to be discussed ASAP</li></ul>
<p><strong>Réponse : c.</strong> Une bonne action commence par un verbe, a un seul responsable et une échéance précise.</p>

<h4>Question 13</h4>
<p>La date « 04/05/2027 » dans un email venant des États-Unis signifie :</p>
<ul><li>a) 4 mai 2027</li><li>b) 5 avril 2027</li><li>c) 4 mars 2027</li><li>d) 5 mai 2027</li></ul>
<p><strong>Réponse : b.</strong> Le format américain est mois/jour/année. Pour éviter toute ambiguïté, écrivez le mois en lettres : « 5 April 2027 ».</p>

<h4>Question 14</h4>
<p>Quelle est la différence entre « Please reply by Friday » et « The offer is valid until Friday » ?</p>
<ul><li>a) Aucune différence.</li><li>b) « By » indique une échéance (au plus tard), « until » une durée qui continue jusqu'à un moment.</li><li>c) « By » est britannique, « until » est américain.</li><li>d) « Until » est plus formel que « by ».</li></ul>
<p><strong>Réponse : b.</strong> « By Friday » = au plus tard vendredi (action ponctuelle) ; « until Friday » = jusqu'à vendredi (situation qui dure).</p>

<h4>Question 15</h4>
<p>Quelle phrase est correcte ?</p>
<ul><li>a) Thank you for your informations.</li><li>b) Thank you for the information.</li><li>c) Thank you for an information.</li><li>d) Thank you for informations.</li></ul>
<p><strong>Réponse : b.</strong> « Information » est indénombrable en anglais : il ne prend ni « s » ni article « an ». On dit « a piece of information » pour un élément.</p>

<h4>Question 16</h4>
<p>Dans la réponse à une réclamation selon la méthode des 5 A, quelle étape consiste à annoncer les mesures prises (remplacement, avoir) ?</p>
<ul><li>a) Acknowledge</li><li>b) Apologise</li><li>c) Act</li><li>d) Assure</li></ul>
<p><strong>Réponse : c.</strong> Acknowledge = accuser réception, Apologise = s'excuser, Account = expliquer, Act = agir (annoncer la solution), Assure = rassurer pour l'avenir.</p>

<h4>Question 17</h4>
<p>Quelle est la meilleure structure pour un refus poli ?</p>
<ul><li>a) Refuser, puis expliquer longuement le contexte.</li><li>b) Reconnaître la demande, refuser clairement avec une raison, proposer une alternative, conclure positivement.</li><li>c) Ne pas répondre pour éviter le conflit.</li><li>d) Écrire « It's impossible » pour être clair.</li></ul>
<p><strong>Réponse : b.</strong> C'est la structure « sandwich » : clarté sur le fond, politesse sur la forme et une solution de rechange.</p>

<h4>Question 18</h4>
<p>Dans un executive summary, que doit-on placer en premier ?</p>
<ul><li>a) L'historique détaillé du projet, dans l'ordre chronologique.</li><li>b) L'objet du document et les constats clés.</li><li>c) Les annexes techniques.</li><li>d) Les remerciements.</li></ul>
<p><strong>Réponse : b.</strong> La synthèse donne d'abord l'objet et l'essentiel (constats, conclusion), puis les problèmes, recommandations et prochaines étapes. Les détails vont en annexe.</p>

<h4>Question 19</h4>
<p>Sur Teams, quel premier message est le plus efficace pour Kevin Liu ?</p>
<ul><li>a) Hi</li><li>b) Are you there?</li><li>c) Hi Kevin, quick question about PO LUM-P-0381: could you confirm the ETA in Lyon? We need the drivers by 22 April.</li><li>d) URGENT call me</li></ul>
<p><strong>Réponse : c.</strong> Un message complet (salutation, référence, question, échéance) permet à l'interlocuteur de répondre immédiatement, même avec un décalage horaire.</p>

<h4>Question 20</h4>
<p>Quelle phrase est correcte ?</p>
<ul><li>a) We discussed about the new prices.</li><li>b) We discussed the new prices.</li><li>c) We have discussed about the new prices yesterday.</li><li>d) We discussed of the new prices.</li></ul>
<p><strong>Réponse : b.</strong> « Discuss » se construit sans préposition. De plus, avec « yesterday », on utilise le prétérit et non le present perfect.</p>

<h3>Barème indicatif</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Score</th><th>Interprétation</th><th>Conseil</th></tr>
<tr><td>17 à 20</td><td>Acquis solides sur les écrits professionnels.</td><td>Entraînez-vous sur des emails plus longs et sur la synthèse.</td></tr>
<tr><td>12 à 16</td><td>Bases acquises, quelques points à consolider.</td><td>Relisez les sections correspondant à vos erreurs (faux amis, formats, connecteurs).</td></tr>
<tr><td>Moins de 12</td><td>Notions à retravailler.</td><td>Reprenez les modèles d'emails des sections 2.2 à 2.4 et refaites le quiz avec le formateur.</td></tr>
</table>
`,
    },
    {
      title: "2.13 – Cas pratique corrigé : retard de livraison chez Nordlicht",
      content: `
<h3>Énoncé</h3>
<p><strong>Situation (entreprise fictive).</strong> Nous sommes le lundi 3 mars. Nordlicht GmbH (Hambourg) a commandé à Lumivia 1 200 luminaires Lumi-Linear 120 et 300 panneaux Lumi-Panel 60 (commande Lumivia LUM-2417, bon de commande Nordlicht NL-7731). La livraison était prévue le vendredi 14 mars, en conditions DAP Hambourg. Les luminaires sont destinés à un chantier de bureaux dont l'installation débute le lundi 17 mars.</p>
<p>Ce matin, Julien Bertrand (acheteur) informe Sofia Benali que Sunrise Components (Kevin Liu) a livré avec dix jours de retard un lot de drivers LED à cause d'une pénurie de composants. Conséquence : seuls <strong>700 Lumi-Linear 120</strong> et les <strong>300 Lumi-Panel 60</strong> pourront être expédiés à temps pour le 14 mars. Les <strong>500 Lumi-Linear 120 restants</strong> pourront être livrés le <strong>vendredi 21 mars</strong>. Lumivia prendra en charge les frais de la seconde livraison.</p>
<p>Le mardi 4 mars, une visioconférence interne réunit Claire Moreau (présidente de séance), Julien Bertrand, Thomas Garnier et Sofia Benali (secrétaire). Décisions : livraison partielle proposée à Nordlicht ; Julien obtient de Kevin Liu une date ferme pour le reste des drivers (le 12 mars au plus tard) ; Thomas vérifie avec l'équipe de production la capacité à fabriquer 500 luminaires entre le 13 et le 19 mars ; Claire appellera Anna Weber après l'envoi de l'email ; Sofia met en place un suivi hebdomadaire des stocks de drivers.</p>
<p><strong>Travail demandé à Sofia Benali :</strong></p>
<ol>
<li>Rédiger en anglais l'email à <strong>Anna Weber</strong> annonçant le retard partiel, proposant la livraison partielle et demandant une confirmation d'ici le jeudi 6 mars.</li>
<li>Rédiger en anglais le <strong>compte rendu</strong> (minutes) de la réunion interne du 4 mars, avec un tableau d'actions. (Le compte rendu est rédigé en anglais car il sera aussi transmis au directeur commercial du groupe actionnaire, anglophone.)</li>
</ol>
<p>Contraintes : registre formel mais cordial, structure complète, chiffres exacts, aucun faux ami, connecteurs logiques adaptés.</p>

<h3>Corrigé – Partie 1 : l'email à Anna Weber</h3>
<blockquote>
<strong>Subject:</strong> Order LUM-2417 (your PO NL-7731) – partial delivery on 14 March<br><br>
Dear Ms Weber,<br><br>
I am writing about your order LUM-2417 (your purchase order NL-7731), planned for delivery on Friday 14 March.<br><br>
I am sorry to inform you that we will not be able to deliver the full order on that date. Our supplier of LED drivers has had a shortage of components, and as a result, a batch of drivers reached us ten days late.<br><br>
However, we can offer the following solution:<br>
- <strong>Friday 14 March</strong>: delivery of 700 Lumi-Linear 120 and all 300 Lumi-Panel 60, as planned;<br>
- <strong>Friday 21 March</strong>: delivery of the remaining 500 Lumi-Linear 120.<br><br>
Lumivia will of course cover the transport costs of the second delivery. We hope that this will allow your installation team to start work on 17 March as planned.<br><br>
Could you please confirm by Thursday 6 March whether this partial delivery suits you? If you would prefer a different split between the two deliveries, we will do our best to adapt.<br><br>
Please accept our apologies for this inconvenience. My colleague Claire Moreau, our Export Manager, will also call you this week to discuss the situation. In the meantime, please do not hesitate to contact me if you have any questions.<br><br>
Yours sincerely,<br><br>
Sofia Benali<br>
Sales Assistant – Export Department<br>
Lumivia<br>
Lyon, France
</blockquote>
<p><em>Glose : Je vous écris au sujet de votre commande LUM-2417, dont la livraison est prévue le vendredi 14 mars. J'ai le regret de vous informer que nous ne pourrons pas livrer la totalité de la commande à cette date. Notre fournisseur de drivers LED a connu une pénurie de composants et, par conséquent, un lot de drivers nous est parvenu avec dix jours de retard. Nous pouvons toutefois vous proposer la solution suivante : le 14 mars, livraison de 700 Lumi-Linear 120 et des 300 Lumi-Panel 60 comme prévu ; le 21 mars, livraison des 500 Lumi-Linear 120 restants. Lumivia prendra bien sûr en charge les frais de transport de la seconde livraison. Nous espérons que cela permettra à votre équipe d'installation de commencer le chantier le 17 mars comme prévu. Pourriez-vous nous confirmer d'ici le jeudi 6 mars si cette livraison partielle vous convient ? Si vous préférez une autre répartition, nous ferons notre possible pour nous adapter. Veuillez accepter nos excuses pour ce désagrément. Ma collègue Claire Moreau vous appellera également cette semaine...</em></p>

<h4>Analyse du corrigé</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Ce qui a été fait</th><th>Pourquoi</th></tr>
<tr><td>Objet</td><td>Références des deux parties + « partial delivery » + date.</td><td>Anna identifie immédiatement la commande et le sujet.</td></tr>
<tr><td>Salutation</td><td>Dear Ms Weber,</td><td>Relation formelle ; « Ms » pour une femme quel que soit son statut.</td></tr>
<tr><td>Ouverture</td><td>I am writing about your order...</td><td>Contexte en une phrase.</td></tr>
<tr><td>Mauvaise nouvelle</td><td>Annoncée dès le deuxième paragraphe, avec une explication courte.</td><td>Principe du « bottom line up front » ; on ne cache pas le problème.</td></tr>
<tr><td>Connecteurs</td><td>as a result, however, in the meantime</td><td>Ils guident la lecture : cause, opposition (solution), attente.</td></tr>
<tr><td>Solution</td><td>Liste à puces avec dates et quantités ; frais pris en charge.</td><td>Lisible, vérifiable, rassurant. 700 + 500 = 1 200 Lumi-Linear 120 : le total est respecté.</td></tr>
<tr><td>Appel à l'action</td><td>Confirmation demandée d'ici le jeudi 6 mars.</td><td>Quoi, qui, quand : Anna sait exactement ce qu'on attend d'elle.</td></tr>
<tr><td>Excuses et suivi</td><td>Apologies + appel annoncé de Claire Moreau.</td><td>Montre l'implication de l'entreprise au niveau managérial.</td></tr>
<tr><td>Clôture</td><td>Yours sincerely (nom connu, registre formel)</td><td>Cohérent avec « Dear Ms Weber ». « Kind regards » aurait aussi été acceptable.</td></tr>
</table>
<p><strong>Erreurs à éviter dans cet email</strong> : « The delay of delivery is one week » pour parler du délai (ambigu) ; « We are agree to pay the transport » (on dit « we will cover » ou « we agree to cover ») ; « Thanking you in advance for your comprehension » (calque : dites « Thank you for your understanding ») ; écrire « 14/03 » sans le mois en lettres.</p>

<h3>Corrigé – Partie 2 : le compte rendu de la réunion interne</h3>
<blockquote>
<strong>MINUTES</strong><br>
<strong>Internal meeting – Order LUM-2417 (Nordlicht GmbH): supply problem</strong><br><br>
<strong>Date:</strong> Tuesday 4 March, 09:00–09:40 (video call)<br>
<strong>Present:</strong> Claire Moreau (CM, chair), Julien Bertrand (JB), Thomas Garnier (TG), Sofia Benali (SB, minutes)<br>
<strong>Apologies:</strong> none<br><br>
<strong>1. Situation</strong><br>
JB reported that Sunrise Components had delivered a batch of LED drivers ten days late because of a shortage of components. As a result, only 700 of the 1,200 Lumi-Linear 120 ordered by Nordlicht could be produced in time for the delivery of 14 March. The 300 Lumi-Panel 60 were not affected.<br><br>
<strong>2. Proposal to the customer</strong><br>
CM proposed a partial delivery: 700 Lumi-Linear 120 and 300 Lumi-Panel 60 on 14 March, and the remaining 500 Lumi-Linear 120 on 21 March. It was agreed that Lumivia would pay the transport costs of the second delivery. SB will send the proposal to Anna Weber (Nordlicht) by email the same day and ask for a reply by Thursday 6 March.<br><br>
<strong>3. Supply of drivers</strong><br>
JB explained that Kevin Liu (Sunrise Components) had not yet given a firm date for the remaining drivers. JB will obtain a confirmed date, at the latest 12 March.<br><br>
<strong>4. Production capacity</strong><br>
TG pointed out that producing 500 luminaires between 13 and 19 March would require an extra shift on two days. He will check this with the production team.<br><br>
<strong>5. Prevention</strong><br>
CM suggested a weekly check of driver stock levels in order to anticipate similar problems. This was agreed.<br><br>
<strong>Action points</strong>
</blockquote>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>No.</th><th>Action</th><th>Owner</th><th>Deadline</th></tr>
<tr><td>1</td><td>Obtain a confirmed delivery date for the remaining drivers from Sunrise Components (latest acceptable date: 12 March)</td><td>JB</td><td>5 March</td></tr>
<tr><td>2</td><td>Check production capacity for 500 Lumi-Linear 120 between 13 and 19 March (extra shift)</td><td>TG</td><td>5 March</td></tr>
<tr><td>3</td><td>Send the partial delivery proposal to Anna Weber by email</td><td>SB</td><td>4 March</td></tr>
<tr><td>4</td><td>Call Anna Weber to discuss the partial delivery</td><td>CM</td><td>6 March</td></tr>
<tr><td>5</td><td>Follow up Nordlicht's reply and update the order in the system</td><td>SB</td><td>6 March</td></tr>
<tr><td>6</td><td>Set up a weekly check of driver stock levels</td><td>SB</td><td>14 March</td></tr>
<tr><td>7</td><td>Circulate these minutes</td><td>SB</td><td>4 March</td></tr>
</table>
<blockquote><strong>Next meeting:</strong> Friday 7 March, 09:00 (video call), to confirm the delivery plan.</blockquote>

<h4>Analyse du corrigé</h4>
<ul>
<li><strong>En-tête complet</strong> : date, horaire, participants, président, rédactrice, excusés.</li>
<li><strong>Passé et discours indirect</strong> : « JB reported that Sunrise Components had delivered... », « TG pointed out that... would require... ».</li>
<li><strong>Troisième personne et initiales</strong> : neutralité et concision.</li>
<li><strong>Verbes de compte rendu variés</strong> : reported, proposed, confirmed, explained, pointed out, suggested, it was agreed.</li>
<li><strong>Connecteurs</strong> : because of, as a result, in order to.</li>
<li><strong>Tableau d'actions</strong> : verbe d'action, un responsable, une échéance ; les actions reprennent fidèlement les décisions de l'énoncé.</li>
<li><strong>Cohérence des chiffres</strong> : 700 + 500 = 1 200 ; dates cohérentes avec l'email (réponse attendue le 6 mars, appel de Claire le 6 mars au plus tard).</li>
</ul>

<h3>Grille d'auto-évaluation</h3>
<p>Comparez votre production avec le corrigé et cochez chaque critère. Le formateur utilise une grille équivalente pour l'évaluation interne de la compétence C2.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Critère</th><th>Indicateur observable</th><th>Acquis</th><th>En cours</th><th>Non acquis</th></tr>
<tr><td>1. Objet de l'email</td><td>Court, précis, avec la référence de commande et le sujet.</td><td></td><td></td><td></td></tr>
<tr><td>2. Salutation et formule finale</td><td>Registre formel cohérent (Dear Ms Weber / Yours sincerely ou Kind regards).</td><td></td><td></td><td></td></tr>
<tr><td>3. Structure de l'email</td><td>Ouverture, annonce, explication, solution, appel à l'action, excuses, clôture.</td><td></td><td></td><td></td></tr>
<tr><td>4. Annonce du retard</td><td>Claire, précoce, avec une cause brève et sans accuser personne.</td><td></td><td></td><td></td></tr>
<tr><td>5. Solution proposée</td><td>Quantités et dates exactes, prise en charge des frais mentionnée.</td><td></td><td></td><td></td></tr>
<tr><td>6. Appel à l'action</td><td>Demande de confirmation avec une date précise.</td><td></td><td></td><td></td></tr>
<tr><td>7. Ton diplomatique</td><td>Softeners, excuses, formulation positive (we can offer...).</td><td></td><td></td><td></td></tr>
<tr><td>8. Connecteurs logiques</td><td>Au moins trois connecteurs pertinents et correctement construits.</td><td></td><td></td><td></td></tr>
<tr><td>9. Compte rendu : en-tête</td><td>Date, participants, président, rédacteur, excusés.</td><td></td><td></td><td></td></tr>
<tr><td>10. Compte rendu : style</td><td>Passé, troisième personne, discours indirect, neutralité.</td><td></td><td></td><td></td></tr>
<tr><td>11. Tableau d'actions</td><td>Chaque action : verbe, responsable unique, échéance.</td><td></td><td></td><td></td></tr>
<tr><td>12. Formats et exactitude</td><td>Dates avec le mois en lettres, nombres au format anglais, calculs justes.</td><td></td><td></td><td></td></tr>
<tr><td>13. Correction de la langue</td><td>Pas de faux amis (delay, actually, eventually), information sans s, prépositions justes.</td><td></td><td></td><td></td></tr>
</table>
<blockquote><strong>À retenir pour la suite de la formation :</strong> les écrits de ce jour 2 serviront de base aux jours suivants. Au jour 3, vous apprendrez à confirmer par email ce qui a été dit au téléphone ; au jour 4, à préparer l'ordre du jour et le compte rendu des réunions que vous animerez ; au jour 6, à répondre par écrit aux objections et aux réclamations dans le cadre d'une négociation.</blockquote>
`,
    },
  ],
};
