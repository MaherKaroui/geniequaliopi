"""Construit src/data/tpPresets/orienta/vtest-b1-35h.json : parcours B1 de 35 h d'ORIENTA CONSULT.

Reprend le parcours B1 d'Orienta Campus (vtest-b1.json : compétences, besoins, chapitres, évaluations,
sources) et remplace les 10 exercices pratiques par 10 QCM de niveau B1, un par séance du programme
(format lu par generatorsV2 : « 1) … A) …   B) … » et corrigé « 1-B  2-C … »).
Lancer depuis la racine du dépôt : python scripts/build-vtest-b1-35h.py
"""
import json
from pathlib import Path

SRC = Path("src/data/tpPresets/orienta/vtest-b1.json")
DST = Path("src/data/tpPresets/orienta/vtest-b1-35h.json")
LETTRES = "ABCD"

QCM = [
    ("QCM 1 — Se présenter et présenter son entreprise", [
        ("« I ___ in the sales department for three years. »", ["work", "am working", "have been working", "worked since"], 2),
        ("Quelle phrase présente correctement un poste ?", ["I am responsible of the team.", "I am in charge of a team of five.", "I am charged to the team.", "I make the responsible of five people."], 1),
        ("« Our company ___ in 2010. »", ["was founded", "has founded", "founded itself", "is founding"], 0),
        ("Quel mot désigne le siège social ?", ["Headquarters", "Head office branch", "Main seat", "Social seat"], 0),
        ("« What does your job involve? » signifie :", ["Combien gagnez-vous ?", "En quoi consiste votre travail ?", "Depuis quand travaillez-vous ?", "Aimez-vous votre travail ?"], 1),
        ("« We have about 200 ___ in France. »", ["employers", "employees", "employments", "employs"], 1),
        ("Complétez : « I report ___ the operations manager. »", ["at", "for", "to", "with"], 2),
        ("Quelle question est correcte ?", ["How long do you work here?", "How long have you worked here?", "How long are you working here since?", "How much time you work here?"], 1),
        ("« A subsidiary » est :", ["Une filiale", "Une subvention", "Un sous-traitant", "Un fournisseur"], 0),
        ("Réponse adaptée à « Nice to meet you. » :", ["Me too.", "Nice to meet you too.", "Yes, it is.", "You are welcome."], 1),
    ]),
    ("QCM 2 — Compréhension orale : appels, messages et réunions courtes", [
        ("Dans un message vocal, « Could you get back to me by Friday? » veut dire :", ["Pouvez-vous revenir vendredi ?", "Pouvez-vous me rappeler ou me répondre d'ici vendredi ?", "Pouvez-vous me rendre le dossier vendredi ?", "Pouvez-vous partir vendredi ?"], 1),
        ("« The meeting has been brought forward. » signifie que la réunion est :", ["reportée", "annulée", "avancée", "confirmée"], 2),
        ("« I'm afraid he's tied up at the moment. » signifie qu'il est :", ["malade", "occupé", "parti", "en retard"], 1),
        ("Vous entendez « fifteen » : quel nombre est-ce ?", ["50", "15", "5", "150"], 1),
        ("« Let's touch base next week. » signifie :", ["Faisons le point la semaine prochaine.", "Allons sur le terrain la semaine prochaine.", "Arrêtons le projet la semaine prochaine.", "Changeons de base la semaine prochaine."], 0),
        ("« Could you speak up a bit? » demande de :", ["parler moins vite", "parler plus fort", "parler en premier", "parler plus tard"], 1),
        ("« The deadline is the end of the month. » donne :", ["une date limite", "un budget", "un lieu", "un participant"], 0),
        ("« Sorry, you've lost me. » signifie :", ["Vous m'avez perdu, je ne suis plus.", "Je vous ai perdu de vue.", "Vous avez perdu votre dossier.", "Je dois partir."], 0),
        ("Dans une réunion, « Any other business? » annonce :", ["le début de la réunion", "les questions diverses", "le vote du budget", "la pause"], 1),
        ("« I'll put you through to accounts. » signifie :", ["Je vous passe la comptabilité.", "Je vous envoie les comptes.", "Je vous fais payer.", "Je vous mets en attente indéfiniment."], 0),
    ]),
    ("QCM 3 — Téléphone : messages, rendez-vous et malentendus", [
        ("Formule correcte pour se présenter au téléphone :", ["I am Paul from Delta.", "This is Paul from Delta.", "Here is Paul of Delta.", "Me, Paul, Delta."], 1),
        ("Pour demander de patienter :", ["Wait me, please.", "Could you hold on a moment, please?", "Stay on the phone you.", "Hold me a second."], 1),
        ("« Can I take a message? » signifie :", ["Puis-je laisser un message ?", "Puis-je prendre un message ?", "Avez-vous mon message ?", "Puis-je envoyer un SMS ?"], 1),
        ("Pour fixer un rendez-vous :", ["Would Tuesday at 10 suit you?", "Do you suit Tuesday at 10?", "Are you suitable Tuesday?", "Tuesday 10, you can?"], 0),
        ("Pour faire épeler un nom :", ["Could you spell that, please?", "Could you write me that?", "Say me the letters.", "How do you write it you?"], 0),
        ("« The line is breaking up. » signifie :", ["La ligne est occupée.", "La communication coupe.", "La ligne est libre.", "Le standard est fermé."], 1),
        ("Pour vérifier une information :", ["Let me just check I've got that right.", "I control your information.", "I verify you.", "Repeat me."], 0),
        ("« I'll call you back. » signifie :", ["Je vous rappelle.", "Je vous rends l'appel maintenant.", "Je vous appelle en arrière.", "Je vous transfère."], 0),
        ("Pour corriger un malentendu poliment :", ["You are wrong.", "Sorry, I think there's been a misunderstanding.", "No, no, no.", "You don't understand nothing."], 1),
        ("Clôture adaptée d'un appel professionnel :", ["Thanks for calling, goodbye.", "Bye bye, darling.", "OK finish.", "See you never."], 0),
    ]),
    ("QCM 4 — Compréhension écrite : e-mails, notes et rapports", [
        ("Dans un e-mail, « Please find attached… » annonce :", ["une pièce jointe", "un rendez-vous", "une réclamation", "une signature"], 0),
        ("« FYI » signifie :", ["For your information", "For your interest", "Find your invoice", "Fill your index"], 0),
        ("« The report is due on Monday. » signifie que le rapport :", ["a été rendu lundi", "doit être remis lundi", "est en retard depuis lundi", "est annulé lundi"], 1),
        ("Pour repérer la demande principale d'un e-mail, on cherche d'abord :", ["la signature", "l'objet et la phrase d'action", "les formules de politesse", "la date d'envoi"], 1),
        ("« Sales rose sharply » signifie que les ventes :", ["ont baissé fortement", "ont augmenté fortement", "sont restées stables", "ont légèrement augmenté"], 1),
        ("« As per our agreement » signifie :", ["Selon notre accord", "Malgré notre accord", "Avant notre accord", "Sans accord"], 0),
        ("Le faux-ami « eventually » signifie :", ["éventuellement", "finalement", "évidemment", "parfois"], 1),
        ("« A reminder » est :", ["une relance ou un rappel", "un remboursement", "un remerciement", "un reçu"], 0),
        ("« Pending » qualifie un dossier :", ["clos", "en attente", "refusé", "archivé"], 1),
        ("Dans une note interne, « with immediate effect » signifie :", ["avec effet immédiat", "à effet rétroactif", "sans effet", "sous réserve"], 0),
    ]),
    ("QCM 5 — Expression écrite : e-mails structurés et grammaire", [
        ("Ouverture formelle d'un e-mail à un inconnu :", ["Hi mate,", "Dear Sir or Madam,", "Hello you,", "Yo,"], 1),
        ("« We ___ your order yesterday. »", ["have received", "received", "receive", "are receiving"], 1),
        ("« I ___ already ___ the invoice. »", ["have / sent", "did / send", "am / sending", "was / sent"], 0),
        ("Pour relancer poliment :", ["I'm just following up on my e-mail of 3 May.", "Why you don't answer?", "Answer me now.", "You forgot me."], 0),
        ("Formule pour une réclamation :", ["I am writing to complain about…", "I write you for complain…", "I make a complaint of…", "I am complaining you…"], 0),
        ("« You ___ send the contract before Friday; it is compulsory. »", ["might", "must", "could", "would"], 1),
        ("Clôture formelle :", ["Cheers,", "Yours faithfully,", "Bye,", "Love,"], 1),
        ("Choisissez le connecteur : « The price is high; ___, the quality is excellent. »", ["however", "because", "so", "therefore"], 0),
        ("« I look forward to ___ from you. »", ["hear", "hearing", "heard", "be hearing"], 1),
        ("Pour présenter des excuses écrites :", ["Please accept our apologies for the delay.", "Sorry for the delay, it's not our fault.", "We excuse the delay.", "Excuse us the delay."], 0),
    ]),
    ("QCM 6 — Réunions : donner son avis et proposer une solution", [
        ("Pour donner son avis :", ["In my opinion, …", "In my opinion of me, …", "For me opinion, …", "I am opinion that…"], 0),
        ("Pour exprimer un désaccord poli :", ["I see your point, but…", "That's stupid.", "No way.", "You are wrong."], 0),
        ("Pour proposer une solution :", ["What if we…?", "What we if…?", "If we what…?", "We propose to what…?"], 0),
        ("« I couldn't agree more. » signifie :", ["Je ne suis pas d'accord.", "Je suis tout à fait d'accord.", "Je ne peux pas répondre.", "Je suis plutôt d'accord."], 1),
        ("Pour interrompre poliment :", ["Sorry to interrupt, but…", "Stop talking.", "Shut up please.", "Let me speak now."], 0),
        ("« Let's move on to the next item. » signifie :", ["Passons au point suivant.", "Déplaçons la réunion.", "Arrêtons-nous ici.", "Revenons au point précédent."], 0),
        ("Pour demander une clarification :", ["Could you clarify what you mean by…?", "What you mean?", "Clarify me.", "Explain you."], 0),
        ("« The minutes » d'une réunion sont :", ["les minutes de pause", "le compte rendu", "l'ordre du jour", "les participants"], 1),
        ("« The agenda » est :", ["l'ordre du jour", "l'agenda personnel", "le budget", "la salle"], 0),
        ("Pour conclure une réunion :", ["To sum up, we've agreed to…", "To sum, we agreed…", "In summary of us…", "Finally of all…"], 0),
    ]),
    ("QCM 7 — Comptes rendus : connecteurs et faux-amis", [
        ("Connecteur d'addition :", ["Moreover", "Although", "Unless", "Whereas"], 0),
        ("Connecteur de cause :", ["Due to", "In spite of", "Unlike", "Despite of"], 0),
        ("Connecteur de conséquence :", ["As a result", "Even though", "Instead of", "Apart from"], 0),
        ("« Although the budget was tight, we finished on time. » exprime :", ["une cause", "une opposition", "un but", "une condition"], 1),
        ("Le faux-ami « actually » signifie :", ["actuellement", "en réalité, en fait", "activement", "actuel"], 1),
        ("Le faux-ami « to attend a meeting » signifie :", ["attendre une réunion", "assister à une réunion", "annuler une réunion", "organiser une réunion"], 1),
        ("Le faux-ami « a library » est :", ["une librairie", "une bibliothèque", "une liberté", "un livret"], 1),
        ("Pour résumer :", ["In short, …", "In shortly, …", "For short, …", "On short, …"], 0),
        ("« Action points » d'un compte rendu sont :", ["les actions décidées avec un responsable", "les points de vente", "les points de fidélité", "les points forts"], 0),
        ("Le faux-ami « a lecture » est :", ["une lecture", "une conférence ou un cours", "une leçon de lecture", "un lecteur"], 1),
    ]),
    ("QCM 8 — Présenter un projet, des chiffres et des tendances", [
        ("« Turnover increased by 10%. » signifie :", ["Le chiffre d'affaires a augmenté de 10 %.", "Le chiffre d'affaires a atteint 10 %.", "Le personnel a augmenté de 10 %.", "Les pertes ont baissé de 10 %."], 0),
        ("Pour annoncer le plan d'une présentation :", ["First, I'll talk about…, then…", "Firstly I talk of…", "In first, I say…", "Before all, I…"], 0),
        ("« A slight decrease » est :", ["une forte baisse", "une légère baisse", "une stabilité", "une hausse"], 1),
        ("« Sales peaked in July. » signifie que les ventes :", ["ont atteint leur maximum en juillet", "ont chuté en juillet", "ont commencé en juillet", "étaient nulles en juillet"], 0),
        ("Pour comparer : « This year's results are ___ than last year's. »", ["more good", "better", "best", "gooder"], 1),
        ("Pour présenter un graphique :", ["As you can see on this chart, …", "Like you see in this chart, …", "As you look the chart, …", "You see the chart that…"], 0),
        ("« Figures » dans une présentation désigne :", ["des personnages", "des chiffres", "des figures de style", "des formes"], 1),
        ("« The project is on track. » signifie :", ["Le projet est en avance.", "Le projet avance comme prévu.", "Le projet est arrêté.", "Le projet est en retard."], 1),
        ("Pour inviter aux questions :", ["I'd be happy to take any questions.", "Questions are forbidden.", "You ask now.", "Any question you?"], 0),
        ("« Remained stable » signifie :", ["est resté stable", "a fortement varié", "a doublé", "a disparu"], 0),
    ]),
    ("QCM 9 — Stratégies d'examen VTest Business English", [
        ("Combien de compétences le VTest Business English – 4 Skills évalue-t-il ?", ["2", "3", "4", "5"], 2),
        ("Le VTest situe le candidat sur :", ["une note sur 20", "l'échelle du CECRL", "un score sur 990", "un pourcentage de réussite"], 1),
        ("En compréhension écrite, la stratégie « skimming » consiste à :", ["lire en détail chaque mot", "survoler le texte pour en saisir l'idée générale", "traduire le texte", "relire la question"], 1),
        ("La stratégie « scanning » consiste à :", ["chercher une information précise", "résumer le texte", "lire à voix haute", "souligner tous les verbes"], 0),
        ("En compréhension orale, avant l'écoute, il faut :", ["lire les questions pour anticiper", "fermer les yeux", "prendre des notes au hasard", "attendre la fin"], 0),
        ("À l'oral, quand on ne trouve pas un mot, on peut :", ["reformuler avec d'autres mots", "se taire", "parler français", "arrêter l'épreuve"], 0),
        ("À l'écrit, il faut d'abord :", ["repérer la tâche demandée et le destinataire", "écrire le plus long possible", "recopier la consigne", "commencer par la signature"], 0),
        ("Gérer son temps à l'écrit signifie :", ["garder quelques minutes pour se relire", "écrire jusqu'à la dernière seconde sans relire", "faire un brouillon complet de chaque phrase", "ne pas regarder l'heure"], 0),
        ("Qui délivre la certification VTest Business English ?", ["France Compétences", "EXASSESS", "L'organisme de formation", "Le CECRL"], 1),
        ("La fiche du Répertoire spécifique du VTest Business English est :", ["RS6905", "RNCP41480", "RS5637", "RS7332"], 0),
    ]),
    ("QCM 10 — Bilan B1 : langue et situations professionnelles", [
        ("« If we ___ the order today, we will deliver on Monday. »", ["receive", "will receive", "received", "would receive"], 0),
        ("« The goods ___ yesterday. »", ["were delivered", "are delivered", "have delivered", "delivered them"], 0),
        ("« She asked me ___ I could join the call. »", ["if", "that", "what", "do"], 0),
        ("« We ___ finish the report by tonight. » — obligation forte :", ["have to", "may", "could", "would rather"], 0),
        ("Pour accepter poliment une invitation :", ["I'd be delighted to come.", "I come, OK.", "Yes I am coming you.", "Sure I go."], 0),
        ("« I'm used to ___ in English. »", ["work", "working", "worked", "works"], 1),
        ("Réponse adaptée à une réclamation client :", ["I'm sorry to hear that. Let me look into it.", "It's not my problem.", "Call somebody else.", "That's impossible."], 0),
        ("« Could you send it to me ASAP? » : ASAP signifie :", ["dès que possible", "après-midi", "avec soin", "à part"], 0),
        ("« We've been waiting ___ two weeks. »", ["since", "for", "during", "from"], 1),
        ("Formule pour remercier à la fin d'un échange :", ["Thank you for your time.", "Thanks you for your time.", "Thank for your time.", "Thanking your time."], 0),
    ]),
]


def qcm_exercice(titre, questions):
    for q, opts, _ in questions:
        for txt in [q, *opts]:
            # le parseur QCM se sert de « A) », « B) »… : aucune parenthèse fermante après une lettre A-D
            assert not any(f"{l})" in txt for l in LETTRES), txt
    consigne = f"Cochez la bonne réponse pour chacune des {len(questions)} questions :\n\n" + "\n\n".join(
        f"{i + 1}) {q}\n  " + "   ".join(f"{LETTRES[oi]}) {o}" for oi, o in enumerate(opts))
        for i, (q, opts, _) in enumerate(questions)
    )
    reponse = "  ".join(f"{i + 1}-{LETTRES[c]}" for i, (_, _, c) in enumerate(questions))
    return {"titre": titre, "consigne": consigne, "reponseAttendue": reponse}


def main():
    d = json.loads(SRC.read_text(encoding="utf-8"))
    d = json.loads(json.dumps(d, ensure_ascii=False).replace("21 h", "35 h").replace("B1-21H", "B1-35H"))
    d["id"] = "vtest-b1-35h"
    d["titre"] = "Anglais professionnel – Niveau B1 – VTest Business English (RS6905)"
    d["aliases"] = [
        "Anglais professionnel – Niveau B1 – 35 h",
        "VTest Business English (RS6905) – Parcours B1 – 35 h",
        "Anglais professionnel – Niveau B1 – VTest (RS6905)",
    ]
    d["heures"] = 35
    prog = d["programme"]
    prog.update({"hours": 35, "sync_hours": 35, "async_hours": 0})
    # 10 séances de 3 h 30 en classe virtuelle, réparties sur les 6 modules du parcours B1
    for module, heures in zip(prog["modules"], [5, 7, 7, 7, 6, 3]):
        module["heures"] = heures
    assert sum(m["heures"] for m in prog["modules"]) == 35
    prog["modalities"] = ("Formation à distance : 10 classes virtuelles de 3 h 30 avec le formateur (Google Meet / Zoom), "
                          "plateforme e-learning ouverte 24 h/24 en complément, QCM au format VTest à chaque séance.")
    assert len(QCM) == 10 and all(len(qs) == 10 for _, qs in QCM)
    d["exercices"] = [qcm_exercice(t, qs) for t, qs in QCM]
    DST.write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(DST, len(d["exercices"]), "QCM")


if __name__ == "__main__":
    main()
