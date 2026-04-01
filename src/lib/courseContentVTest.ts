import { CourseChapter } from "./courseContent";

export function getVTestChapters(): CourseChapter[] {
  return [
    {
      title: "Chapitre 1 – Compréhension écrite (Reading)",
      description: "Développer la capacité à lire, comprendre et interpréter des documents professionnels en anglais.",
      sections: [
        {
          title: "Lire et comprendre des emails professionnels",
          content: `<p>L'email professionnel est le support de communication écrite le plus courant en entreprise internationale. Savoir le décoder rapidement est essentiel.</p>
<h4>Structure type d'un email professionnel</h4>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#e8f4fd"><th>Élément</th><th>Exemple</th></tr>
<tr><td>Subject line</td><td>Re: Q3 Budget Review – Action Required</td></tr>
<tr><td>Greeting</td><td>Dear Mr. Johnson, / Hi Team,</td></tr>
<tr><td>Opening</td><td>I hope this email finds you well. / Following our meeting…</td></tr>
<tr><td>Body</td><td>I would like to inform you that… / Please find attached…</td></tr>
<tr><td>Call to action</td><td>Could you please confirm by Friday? / Please review and revert.</td></tr>
<tr><td>Closing</td><td>Best regards, / Kind regards, / Yours sincerely,</td></tr>
</table>
<h4>Exercice pratique</h4>
<div style="background:#f8f9fa;padding:15px;border-radius:8px">
<p><strong>Lisez l'email suivant et répondez aux questions :</strong></p>
<p style="font-style:italic">"Dear Ms. Clark, Further to our conversation on Monday, I am writing to confirm the delivery date for the new software update. The rollout is scheduled for March 15th. Please ensure all team members have completed the training module by March 10th. Should you have any questions, do not hesitate to contact me. Best regards, David"</p>
<p>1. Quel est l'objet principal de l'email ? <span style="color:#28a745">→ Confirmer la date de livraison de la mise à jour logicielle.</span></p>
<p>2. Quelle action est demandée ? <span style="color:#28a745">→ S'assurer que tous les membres ont terminé la formation avant le 10 mars.</span></p>
</div>`
        },
        {
          title: "Interpréter des rapports et documents techniques",
          content: `<p>Les rapports professionnels en anglais suivent généralement une structure normée : <strong>Executive Summary → Findings → Recommendations → Appendices</strong>.</p>
<h4>Vocabulaire clé des rapports</h4>
<ul>
<li><strong>Findings</strong> – Résultats, conclusions d'une étude</li>
<li><strong>To outline</strong> – Présenter les grandes lignes</li>
<li><strong>Key takeaways</strong> – Points essentiels à retenir</li>
<li><strong>To benchmark</strong> – Comparer à un référentiel</li>
<li><strong>Stakeholders</strong> – Parties prenantes</li>
<li><strong>Compliance</strong> – Conformité réglementaire</li>
<li><strong>ROI (Return on Investment)</strong> – Retour sur investissement</li>
<li><strong>KPIs (Key Performance Indicators)</strong> – Indicateurs clés de performance</li>
</ul>
<h4>Stratégies de lecture rapide (Skimming & Scanning)</h4>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#e8f4fd"><th>Technique</th><th>Objectif</th><th>Comment</th></tr>
<tr><td>Skimming</td><td>Saisir l'idée générale</td><td>Lire titres, sous-titres, première phrase de chaque paragraphe</td></tr>
<tr><td>Scanning</td><td>Trouver une information précise</td><td>Chercher des mots-clés, chiffres, noms propres</td></tr>
<tr><td>Intensive reading</td><td>Comprendre en profondeur</td><td>Lire mot à mot, analyser la structure grammaticale</td></tr>
</table>`
        },
        {
          title: "Comprendre des offres d'emploi et documents RH",
          content: `<p>Les documents RH en anglais comportent un vocabulaire spécifique qu'il faut maîtriser pour évoluer dans un contexte international.</p>
<h4>Termes RH essentiels</h4>
<ul>
<li><strong>Job description</strong> – Fiche de poste</li>
<li><strong>Requirements / Qualifications</strong> – Prérequis</li>
<li><strong>Benefits / Perks</strong> – Avantages sociaux</li>
<li><strong>Probation period</strong> – Période d'essai</li>
<li><strong>Notice period</strong> – Préavis</li>
<li><strong>Salary range</strong> – Fourchette salariale</li>
<li><strong>Performance review</strong> – Entretien annuel d'évaluation</li>
<li><strong>Onboarding</strong> – Intégration d'un nouveau collaborateur</li>
</ul>
<h4>Exercice : Analyser une offre d'emploi</h4>
<div style="background:#f8f9fa;padding:15px;border-radius:8px">
<p><em>"We are looking for a dynamic Project Manager with 5+ years of experience in IT. The ideal candidate will have strong leadership skills, PMP certification preferred. Competitive salary + bonus scheme. Hybrid working model (3 days office / 2 days remote)."</em></p>
<p>→ Identifiez : le poste, l'expérience requise, les certifications souhaitées, les avantages.</p>
</div>`
        },
        {
          title: "Études de marché et documents financiers",
          content: `<p>La lecture de documents financiers et d'études de marché en anglais nécessite la maîtrise d'un vocabulaire spécialisé.</p>
<h4>Vocabulaire financier courant</h4>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#e8f4fd"><th>English</th><th>Français</th></tr>
<tr><td>Revenue / Turnover</td><td>Chiffre d'affaires</td></tr>
<tr><td>Profit margin</td><td>Marge bénéficiaire</td></tr>
<tr><td>Market share</td><td>Part de marché</td></tr>
<tr><td>Quarterly report</td><td>Rapport trimestriel</td></tr>
<tr><td>Forecast</td><td>Prévision</td></tr>
<tr><td>Break-even point</td><td>Seuil de rentabilité</td></tr>
<tr><td>Cash flow</td><td>Flux de trésorerie</td></tr>
<tr><td>Overheads</td><td>Frais généraux</td></tr>
</table>`
        }
      ]
    },
    {
      title: "Chapitre 2 – Compréhension orale (Listening)",
      description: "Comprendre des échanges professionnels oraux : appels, réunions, présentations et consignes.",
      sections: [
        {
          title: "Comprendre un appel téléphonique professionnel",
          content: `<p>Le téléphone reste un canal majeur en entreprise. Comprendre un interlocuteur anglophone au téléphone demande une attention particulière car il n'y a pas de support visuel.</p>
<h4>Expressions téléphoniques courantes</h4>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#e8f4fd"><th>Situation</th><th>Expression</th></tr>
<tr><td>Décrocher</td><td>"Good morning, [Company], [Name] speaking. How may I help you?"</td></tr>
<tr><td>Demander l'identité</td><td>"May I ask who's calling, please?"</td></tr>
<tr><td>Mettre en attente</td><td>"Could you hold the line for a moment, please?"</td></tr>
<tr><td>Transférer</td><td>"I'll put you through to Mr. Smith."</td></tr>
<tr><td>Demander de répéter</td><td>"I'm sorry, could you repeat that, please?"</td></tr>
<tr><td>Prendre un message</td><td>"I'm afraid she's in a meeting. Can I take a message?"</td></tr>
<tr><td>Confirmer</td><td>"Let me read that back to you to make sure I've got it right."</td></tr>
<tr><td>Conclure</td><td>"Thank you for calling. Have a good day."</td></tr>
</table>
<h4>Exercice d'écoute active</h4>
<div style="background:#f8f9fa;padding:15px;border-radius:8px">
<p><strong>Simulation :</strong> Votre collègue vous appelle pour modifier l'horaire d'une réunion. Notez : le nouveau créneau, les participants concernés, la salle.</p>
</div>`
        },
        {
          title: "Suivre une réunion en anglais",
          content: `<p>Participer à une réunion en anglais requiert de comprendre les interventions rapides, les changements de sujet et les décisions prises.</p>
<h4>Structure type d'une réunion</h4>
<ol>
<li><strong>Opening</strong> – "Let's get started. The purpose of today's meeting is…"</li>
<li><strong>Agenda review</strong> – "We have three items on the agenda today."</li>
<li><strong>Discussion</strong> – "Moving on to the next point…" / "I'd like to raise a concern about…"</li>
<li><strong>Action items</strong> – "So, to summarize, John will prepare the report by Friday."</li>
<li><strong>Closing</strong> – "If there's nothing else, let's wrap up. Thank you all."</li>
</ol>
<h4>Expressions pour interagir</h4>
<ul>
<li><strong>Donner son avis :</strong> "In my opinion…" / "From my perspective…"</li>
<li><strong>Être d'accord :</strong> "I completely agree." / "That's a valid point."</li>
<li><strong>Être en désaccord :</strong> "I see your point, but…" / "I'm not entirely convinced."</li>
<li><strong>Demander une clarification :</strong> "Could you elaborate on that?" / "What exactly do you mean by…?"</li>
</ul>`
        },
        {
          title: "Comprendre des présentations et exposés",
          content: `<p>Les présentations professionnelles en anglais utilisent des marqueurs discursifs spécifiques pour guider l'auditoire.</p>
<h4>Marqueurs discursifs clés</h4>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#e8f4fd"><th>Fonction</th><th>Expressions</th></tr>
<tr><td>Introduire</td><td>"Today I'm going to talk about…" / "The aim of this presentation is…"</td></tr>
<tr><td>Structurer</td><td>"First of all… / Secondly… / Finally…"</td></tr>
<tr><td>Illustrer</td><td>"For example… / Let me give you an illustration…"</td></tr>
<tr><td>Résumer</td><td>"To sum up… / In conclusion… / The key message is…"</td></tr>
<tr><td>Inviter les questions</td><td>"Does anyone have any questions?" / "I'd be happy to take questions now."</td></tr>
</table>`
        },
        {
          title: "Comprendre des consignes et instructions orales",
          content: `<p>Dans un environnement de travail anglophone, les consignes sont souvent données oralement. Il est crucial de les comprendre immédiatement.</p>
<h4>Stratégies de compréhension</h4>
<ul>
<li><strong>Note-taking :</strong> Prendre des notes en temps réel avec des abréviations</li>
<li><strong>Paraphrasing :</strong> Reformuler pour vérifier la compréhension : "So, if I understand correctly…"</li>
<li><strong>Asking for clarification :</strong> "Sorry, could you go over that again?"</li>
<li><strong>Confirming :</strong> "Just to confirm, you'd like me to…"</li>
</ul>
<h4>Exercice : Instructions multiples</h4>
<div style="background:#f8f9fa;padding:15px;border-radius:8px">
<p><em>"I need you to update the spreadsheet with the latest sales figures, then send it to the marketing team by 3 PM. Also, could you book a meeting room for Thursday at 2? Make sure it has video conferencing facilities."</em></p>
<p>→ Listez les 3 tâches demandées et leurs contraintes respectives.</p>
</div>`
        }
      ]
    },
    {
      title: "Chapitre 3 – Expression écrite (Writing)",
      description: "Rédiger des documents professionnels en anglais avec clarté, précision et un registre adapté.",
      sections: [
        {
          title: "Rédiger des emails professionnels",
          content: `<p>La rédaction d'emails professionnels en anglais suit des codes précis selon le degré de formalité.</p>
<h4>Registres de langue</h4>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#e8f4fd"><th>Formel</th><th>Semi-formel</th><th>Informel</th></tr>
<tr><td>Dear Sir/Madam,</td><td>Dear John,</td><td>Hi John,</td></tr>
<tr><td>I am writing to enquire about…</td><td>I wanted to ask about…</td><td>Just wondering about…</td></tr>
<tr><td>I would be grateful if you could…</td><td>Could you please…</td><td>Can you…</td></tr>
<tr><td>Please do not hesitate to contact me.</td><td>Feel free to get in touch.</td><td>Let me know!</td></tr>
<tr><td>Yours faithfully,</td><td>Best regards,</td><td>Cheers, / Thanks,</td></tr>
</table>
<h4>Modèles d'emails types</h4>
<ul>
<li><strong>Demande d'information :</strong> "I am writing to enquire about your services…"</li>
<li><strong>Confirmation :</strong> "This is to confirm our meeting on Tuesday at 10 AM."</li>
<li><strong>Réclamation :</strong> "I am writing to express my dissatisfaction regarding…"</li>
<li><strong>Remerciement :</strong> "Thank you for your prompt response to our request."</li>
</ul>`
        },
        {
          title: "Rédiger des comptes rendus et synthèses",
          content: `<p>Le compte rendu (minutes) est un document clé pour assurer le suivi des décisions en entreprise.</p>
<h4>Structure d'un compte rendu</h4>
<ol>
<li><strong>Header :</strong> Date, attendees, apologies, location</li>
<li><strong>Agenda items :</strong> Résumé de chaque point discuté</li>
<li><strong>Decisions :</strong> Ce qui a été décidé</li>
<li><strong>Action items :</strong> Qui fait quoi, pour quand</li>
<li><strong>Next meeting :</strong> Date et heure de la prochaine réunion</li>
</ol>
<h4>Expressions utiles</h4>
<ul>
<li>"It was agreed that…" – Il a été convenu que…</li>
<li>"The following action points were identified…" – Les actions suivantes ont été identifiées…</li>
<li>"[Name] will be responsible for…" – [Nom] sera responsable de…</li>
<li>"The deadline for completion is…" – La date limite est…</li>
</ul>`
        },
        {
          title: "Rédiger des propositions commerciales",
          content: `<p>Une proposition commerciale en anglais doit être claire, structurée et persuasive.</p>
<h4>Structure recommandée</h4>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#e8f4fd"><th>Section</th><th>Contenu</th></tr>
<tr><td>Executive Summary</td><td>Résumé de la proposition en 2-3 phrases</td></tr>
<tr><td>Understanding of Needs</td><td>Reformulation des besoins du client</td></tr>
<tr><td>Proposed Solution</td><td>Description détaillée de l'offre</td></tr>
<tr><td>Timeline</td><td>Calendrier de mise en œuvre</td></tr>
<tr><td>Pricing</td><td>Grille tarifaire détaillée</td></tr>
<tr><td>Terms & Conditions</td><td>Conditions contractuelles</td></tr>
<tr><td>Next Steps</td><td>Actions à entreprendre</td></tr>
</table>`
        },
        {
          title: "Les faux-amis et pièges courants",
          content: `<p>Les faux-amis (false friends) sont des mots qui ressemblent au français mais ont un sens différent en anglais.</p>
<h4>Les 20 faux-amis les plus courants en contexte professionnel</h4>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#e8f4fd"><th>Mot anglais</th><th>❌ Ne signifie PAS</th><th>✅ Signifie</th></tr>
<tr><td>Actually</td><td>Actuellement</td><td>En fait</td></tr>
<tr><td>Eventually</td><td>Éventuellement</td><td>Finalement</td></tr>
<tr><td>To attend</td><td>Attendre</td><td>Assister à</td></tr>
<tr><td>Resume</td><td>Résumé</td><td>CV (américain)</td></tr>
<tr><td>Delay</td><td>Délai</td><td>Retard</td></tr>
<tr><td>To achieve</td><td>Achever</td><td>Accomplir, atteindre</td></tr>
<tr><td>Comprehensive</td><td>Compréhensif</td><td>Exhaustif, complet</td></tr>
<tr><td>To supply</td><td>Supplier</td><td>Fournir</td></tr>
<tr><td>Location</td><td>Location</td><td>Emplacement</td></tr>
<tr><td>Agenda</td><td>Agenda</td><td>Ordre du jour</td></tr>
</table>`
        }
      ]
    },
    {
      title: "Chapitre 4 – Expression orale (Speaking)",
      description: "S'exprimer avec aisance en contexte professionnel : présenter, argumenter, négocier et participer à des échanges.",
      sections: [
        {
          title: "Se présenter professionnellement",
          content: `<p>La première impression est cruciale dans un contexte professionnel anglophone.</p>
<h4>Modèle de présentation professionnelle</h4>
<div style="background:#f8f9fa;padding:15px;border-radius:8px">
<p><em>"Good morning/afternoon. My name is [Prénom Nom]. I'm the [poste] at [entreprise]. I've been working in [secteur] for [X] years, specializing in [domaine]. Currently, I'm in charge of [responsabilités]. I'm looking forward to working with you on [projet]."</em></p>
</div>
<h4>Elevator Pitch (30 secondes)</h4>
<p>L'elevator pitch est une présentation concise de votre profil ou projet :</p>
<ol>
<li><strong>Who :</strong> Qui êtes-vous ?</li>
<li><strong>What :</strong> Que faites-vous ?</li>
<li><strong>Why :</strong> Pourquoi c'est pertinent ?</li>
<li><strong>Call to action :</strong> Que souhaitez-vous ?</li>
</ol>
<h4>Small talk professionnel</h4>
<ul>
<li>"How was your weekend?" / "Did you have a good trip?"</li>
<li>"The weather has been lovely/terrible lately, hasn't it?"</li>
<li>"Have you been to this office/city before?"</li>
<li>"What did you think of the presentation earlier?"</li>
</ul>`
        },
        {
          title: "Participer activement à une réunion",
          content: `<p>Prendre la parole en réunion anglophone demande de maîtriser des expressions spécifiques pour chaque type d'intervention.</p>
<h4>Expressions par situation</h4>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#e8f4fd"><th>Intention</th><th>Expression</th></tr>
<tr><td>Prendre la parole</td><td>"If I may add something…" / "I'd like to make a point."</td></tr>
<tr><td>Proposer</td><td>"How about…?" / "What if we…?" / "I'd suggest…"</td></tr>
<tr><td>Exprimer un accord</td><td>"Absolutely." / "That makes perfect sense."</td></tr>
<tr><td>Exprimer un désaccord poli</td><td>"I take your point, but…" / "With respect, I disagree because…"</td></tr>
<tr><td>Demander l'avis</td><td>"What's your take on this?" / "How do you feel about…?"</td></tr>
<tr><td>Résumer</td><td>"So, to recap…" / "Let me summarize the key points."</td></tr>
</table>`
        },
        {
          title: "Faire une présentation orale",
          content: `<p>Structurer et délivrer une présentation en anglais avec impact.</p>
<h4>Structure en 4 temps</h4>
<ol>
<li><strong>Hook :</strong> Commencer par un chiffre marquant, une question rhétorique ou une anecdote</li>
<li><strong>Body :</strong> 3 points clés maximum, chacun illustré par un exemple</li>
<li><strong>Transition :</strong> "Moving on to…" / "This brings me to my next point…"</li>
<li><strong>Conclusion :</strong> Résumer + Call to action clair</li>
</ol>
<h4>Gérer les questions</h4>
<ul>
<li>"That's a great question." – Gagner du temps pour réfléchir</li>
<li>"I'm glad you raised that point." – Valoriser l'interlocuteur</li>
<li>"I'll get back to you on that." – Reporter si besoin</li>
<li>"If I understand your question correctly…" – Reformuler avant de répondre</li>
</ul>`
        },
        {
          title: "Négocier et persuader en anglais",
          content: `<p>La négociation en anglais utilise des techniques linguistiques spécifiques pour atteindre un compromis.</p>
<h4>Techniques de négociation</h4>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#e8f4fd"><th>Technique</th><th>Expression</th></tr>
<tr><td>Softening (adoucir)</td><td>"I was wondering if we could…" / "Would it be possible to…"</td></tr>
<tr><td>Conditional offers</td><td>"If you could offer us X, we would be prepared to…"</td></tr>
<tr><td>Seeking compromise</td><td>"Let's meet halfway." / "Perhaps we could find a middle ground."</td></tr>
<tr><td>Expressing limits</td><td>"I'm afraid that's beyond our budget." / "Unfortunately, we can't go below…"</td></tr>
<tr><td>Closing a deal</td><td>"Shall we shake on it?" / "I think we have a deal."</td></tr>
</table>
<h4>Jeu de rôle : Négociation commerciale</h4>
<div style="background:#f8f9fa;padding:15px;border-radius:8px">
<p><strong>Contexte :</strong> Vous négociez un contrat de prestation de services. Le client souhaite une réduction de 15% et un délai de paiement de 90 jours. Votre marge maximale de réduction est de 10% et vous acceptez 60 jours.</p>
<p>→ Préparez vos arguments et trouvez un compromis.</p>
</div>`
        }
      ]
    },
    {
      title: "Chapitre 5 – Grammaire et vocabulaire professionnel",
      description: "Consolider les bases grammaticales et enrichir le vocabulaire professionnel pour améliorer la précision et la fluidité.",
      sections: [
        {
          title: "Les temps essentiels en contexte professionnel",
          content: `<h4>Tableau récapitulatif des temps</h4>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#e8f4fd"><th>Temps</th><th>Usage professionnel</th><th>Exemple</th></tr>
<tr><td>Present Simple</td><td>Habitudes, faits, processus</td><td>"We deliver orders every Tuesday."</td></tr>
<tr><td>Present Continuous</td><td>Actions en cours, projets actuels</td><td>"We are currently developing a new product."</td></tr>
<tr><td>Present Perfect</td><td>Bilan, expérience, résultats</td><td>"We have increased sales by 20% this year."</td></tr>
<tr><td>Past Simple</td><td>Événements terminés, rapports</td><td>"The meeting took place last Monday."</td></tr>
<tr><td>Future (will / going to)</td><td>Prévisions, plans</td><td>"We will launch the product in Q2." / "We're going to hire 5 people."</td></tr>
<tr><td>Conditional</td><td>Propositions, négociations</td><td>"If we reduced the price, would you place a larger order?"</td></tr>
</table>`
        },
        {
          title: "Les modaux en contexte professionnel",
          content: `<p>Les verbes modaux nuancent le degré de certitude, obligation ou permission.</p>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#e8f4fd"><th>Modal</th><th>Usage</th><th>Exemple</th></tr>
<tr><td>Can / Could</td><td>Capacité, permission, demande polie</td><td>"Could you send me the report?"</td></tr>
<tr><td>Must / Have to</td><td>Obligation</td><td>"You must comply with the regulations."</td></tr>
<tr><td>Should / Ought to</td><td>Conseil, recommandation</td><td>"You should review the contract before signing."</td></tr>
<tr><td>May / Might</td><td>Possibilité, permission formelle</td><td>"The project may be delayed."</td></tr>
<tr><td>Would</td><td>Conditionnel, politesse</td><td>"Would you mind explaining that again?"</td></tr>
</table>`
        },
        {
          title: "Vocabulaire thématique Business English",
          content: `<h4>Secteurs clés</h4>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#e8f4fd"><th>Thème</th><th>Vocabulaire essentiel</th></tr>
<tr><td>Finance</td><td>Budget, forecast, invoice, payment terms, cash flow, profit, loss, assets, liabilities</td></tr>
<tr><td>Marketing</td><td>Brand awareness, target audience, campaign, conversion rate, engagement, SEO, ROI</td></tr>
<tr><td>IT / Tech</td><td>Software, hardware, server, cloud computing, cybersecurity, deployment, debugging</td></tr>
<tr><td>HR</td><td>Recruitment, onboarding, retention, appraisal, training, dismissal, redundancy</td></tr>
<tr><td>Logistique</td><td>Supply chain, warehouse, shipment, tracking, inventory, lead time, procurement</td></tr>
</table>
<h4>Phrasal verbs professionnels</h4>
<ul>
<li><strong>To carry out</strong> – Réaliser, effectuer</li>
<li><strong>To set up</strong> – Mettre en place</li>
<li><strong>To follow up</strong> – Assurer le suivi</li>
<li><strong>To look into</strong> – Examiner, étudier</li>
<li><strong>To come up with</strong> – Proposer, trouver (une idée)</li>
<li><strong>To break down</strong> – Décomposer, détailler</li>
<li><strong>To draw up</strong> – Rédiger (un contrat, un plan)</li>
</ul>`
        }
      ]
    },
    {
      title: "Chapitre 6 – Préparation à la certification VTest",
      description: "Se préparer à l'examen VTest Business English – 4 Skills (RS6905) : format, stratégies et entraînement.",
      sections: [
        {
          title: "Présentation de la certification VTest",
          content: `<p>La certification <strong>VTest Business English – 4 Skills</strong> est enregistrée au Répertoire Spécifique sous le code <strong>RS6905</strong>. Elle évalue les compétences professionnelles en anglais du niveau A2 au C2 selon le CECRL.</p>
<h4>Caractéristiques de l'examen</h4>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#e8f4fd"><th>Critère</th><th>Détail</th></tr>
<tr><td>Nom</td><td>VTest Business English – 4 Skills</td></tr>
<tr><td>Code RS</td><td>RS6905</td></tr>
<tr><td>Niveaux évalués</td><td>A2 à C2 (CECRL)</td></tr>
<tr><td>Compétences évaluées</td><td>Reading, Listening, Writing, Speaking</td></tr>
<tr><td>Format</td><td>En ligne, adaptatif</td></tr>
<tr><td>Résultats</td><td>Disponibles immédiatement dans 85% des cas</td></tr>
<tr><td>Certificat</td><td>Certificat international sécurisé + Certificat de compétence reconnu par l'État</td></tr>
</table>
<h4>Niveaux CECRL</h4>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#e8f4fd"><th>Niveau</th><th>Description</th></tr>
<tr><td>A2</td><td>Utilisateur élémentaire – Communication basique en situations familières</td></tr>
<tr><td>B1</td><td>Utilisateur indépendant – Compréhension et expression sur des sujets courants</td></tr>
<tr><td>B2</td><td>Utilisateur indépendant avancé – Argumentation et nuance</td></tr>
<tr><td>C1</td><td>Utilisateur expérimenté – Expression fluide et structurée</td></tr>
<tr><td>C2</td><td>Maîtrise – Compréhension et expression quasi natives</td></tr>
</table>`
        },
        {
          title: "Stratégies pour le Reading et le Listening",
          content: `<h4>Stratégies Reading</h4>
<ul>
<li>Lire la question AVANT le texte pour cibler l'information</li>
<li>Repérer les mots-clés et les synonymes dans le texte</li>
<li>Attention aux négations et aux nuances (hardly, barely, scarcely)</li>
<li>Gérer son temps : ne pas rester bloqué sur une question</li>
</ul>
<h4>Stratégies Listening</h4>
<ul>
<li>Lire les options de réponse avant l'écoute</li>
<li>Se concentrer sur les mots accentués et les mots de liaison</li>
<li>Attention aux changements d'avis ("Actually, I meant…" / "On second thought…")</li>
<li>Prendre des notes courtes pendant l'écoute</li>
</ul>
<h4>Exercice : Mini-test Reading</h4>
<div style="background:#f8f9fa;padding:15px;border-radius:8px">
<p><em>"The quarterly results exceeded expectations by 12%, primarily driven by the APAC region. However, the European market showed a slight decline of 3%, attributed to regulatory changes affecting the supply chain."</em></p>
<p>1. What was the overall trend? <span style="color:#28a745">→ Positive (exceeded expectations)</span></p>
<p>2. Which region underperformed? <span style="color:#28a745">→ Europe (-3%)</span></p>
<p>3. What caused the decline? <span style="color:#28a745">→ Regulatory changes affecting supply chain</span></p>
</div>`
        },
        {
          title: "Stratégies pour le Writing et le Speaking",
          content: `<h4>Stratégies Writing</h4>
<ul>
<li>Respecter le registre demandé (formel/semi-formel)</li>
<li>Structurer avec des paragraphes clairs (1 idée = 1 paragraphe)</li>
<li>Utiliser des connecteurs : However, Furthermore, In addition, Nevertheless</li>
<li>Relire pour corriger grammaire, ponctuation et cohérence</li>
</ul>
<h4>Stratégies Speaking</h4>
<ul>
<li>Prendre 5 secondes pour organiser ses idées avant de parler</li>
<li>Utiliser des gap fillers naturels : "Well…", "Let me think…", "That's a good point…"</li>
<li>Varier le vocabulaire : éviter la répétition</li>
<li>Soigner la prononciation des mots-clés du business</li>
</ul>
<h4>Exercice : Simulation Writing</h4>
<div style="background:#f8f9fa;padding:15px;border-radius:8px">
<p><strong>Consigne :</strong> Rédigez un email professionnel (150 mots) pour informer votre équipe d'un changement de date pour le lancement d'un produit. Incluez : la raison du changement, la nouvelle date, les actions à prendre.</p>
</div>`
        },
        {
          title: "Quiz et auto-évaluation VTest",
          content: `<p>Évaluez votre niveau de préparation à la certification VTest :</p>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse">
<tr style="background:#e8f4fd"><th>Compétence</th><th>A2</th><th>B1</th><th>B2</th><th>C1</th></tr>
<tr><td>Comprendre un email professionnel</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Comprendre un appel téléphonique</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Rédiger un email formel</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Participer à une réunion</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Faire une présentation</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Négocier en anglais</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Lire un rapport financier</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Maîtriser la grammaire professionnelle</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
</table>
<p style="margin-top:15px;font-style:italic">Commentaire du stagiaire : _______________________________________________</p>`
        }
      ]
    }
  ];
}
