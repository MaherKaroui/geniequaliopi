import type { CourseChapter } from "../courseContent";

export const ARH41366_PARTIE2: CourseChapter[] = [
  {
    title: "Chapitre 3 – CP1 (2/3) : temps de travail, absences, congés et procédures internes",
    description: "Ce chapitre poursuit la compétence professionnelle n° 1 « Assurer la gestion administrative du personnel » du titre RNCP41366. Il couvre la gestion et le suivi du temps de travail (durée légale et conventionnelle, heures supplémentaires et complémentaires, forfaits jours, aménagement du temps de travail, pauses et repos, travail de nuit, du dimanche et des jours fériés), la conception d'outils de planification et de suivi dans le SIRH ou le tableur, la gestion des congés payés à jour de la loi du 22 avril 2024, des congés pour événements familiaux et des congés liés à la parentalité, puis le traitement administratif des absences : maladie, accident du travail et maladie professionnelle, maintien de salaire, subrogation et visites médicales. Il se termine par les documents et procédures internes (règlement intérieur, notes de service, procédures RH écrites, document unique d'évaluation des risques) et par la posture à adopter pour répondre aux questions du personnel sur ses droits et obligations, avec des modèles de réponses traçables. Toutes les mises en pratique s'appuient sur ALTÉA SERVICES (148 salariés, propreté, IDCC 3043), outillée de Lucca pour le temps et les absences et de Silae pour la paie externalisée.",
    sections: [
      {
        title: "3.1 – Durée du travail : durée légale, durée conventionnelle et durées maximales",
        content: `
<h3>Ce que le référentiel attend de vous</h3>
<p>La fiche de la compétence professionnelle n° 1 demande à l'assistant RH d'« assurer la gestion et le suivi du temps de travail », de « concevoir et utiliser des outils de planification et de suivi » et de « rechercher une information juridique dans une source de référence ». Les critères de performance associés sont explicites : <strong>les cadres juridiques et conventionnels sont respectés</strong>, <strong>les informations transmises sont fiables et exhaustives</strong>, <strong>les échéances sont respectées</strong>. En pratique, cela signifie que vous devez savoir lire un planning, détecter un dépassement de durée maximale ou un repos non respecté, alerter le manager avant que l'infraction ne soit commise et transmettre au gestionnaire de paie des compteurs exacts.</p>

<h3>La hiérarchie des sources en matière de durée du travail</h3>
<p>Depuis la loi du 8 août 2016, le Code du travail organise la plupart des thèmes de la durée du travail en trois niveaux : <strong>l'ordre public</strong> (règles auxquelles on ne peut pas déroger), <strong>le champ de la négociation collective</strong> (ce que l'accord d'entreprise, ou à défaut l'accord de branche, peut prévoir) et <strong>les dispositions supplétives</strong> (ce qui s'applique en l'absence d'accord). Pour un même sujet, l'accord d'entreprise prime en principe sur l'accord de branche, sauf dans les domaines que la loi réserve à la branche (articles L2253-1 et L2253-2 du Code du travail). Avant de répondre à une question de temps de travail, vérifiez donc toujours dans cet ordre : accord d'entreprise, convention collective de branche (pour ALTÉA SERVICES : convention collective nationale des entreprises de propreté et services associés, IDCC 3043), puis Code du travail.</p>

<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Règle</th><th>Valeur légale</th><th>Référence</th><th>Possibilité d'aménagement</th></tr>
<tr><td>Durée légale hebdomadaire</td><td>35 heures (1 607 heures par an en cas d'aménagement annuel)</td><td>L3121-27</td><td>Ce n'est pas un maximum : c'est le seuil de déclenchement des heures supplémentaires</td></tr>
<tr><td>Durée quotidienne maximale</td><td>10 heures de travail effectif</td><td>L3121-18</td><td>Jusqu'à 12 heures par accord collectif en cas d'activité accrue ou pour motifs liés à l'organisation (L3121-19), ou sur dérogation de l'inspection du travail</td></tr>
<tr><td>Durée hebdomadaire maximale absolue</td><td>48 heures sur une même semaine</td><td>L3121-20</td><td>Jusqu'à 60 heures sur autorisation administrative en cas de circonstances exceptionnelles (L3121-21)</td></tr>
<tr><td>Durée hebdomadaire maximale moyenne</td><td>44 heures en moyenne sur 12 semaines consécutives</td><td>L3121-22</td><td>Jusqu'à 46 heures sur 12 semaines par accord collectif (L3121-23)</td></tr>
<tr><td>Repos quotidien</td><td>11 heures consécutives</td><td>L3131-1</td><td>Dérogations limitées par accord ou en cas d'urgence (L3131-2, D3131-1 et suivants)</td></tr>
<tr><td>Repos hebdomadaire</td><td>24 heures consécutives auxquelles s'ajoutent les 11 heures de repos quotidien, soit 35 heures</td><td>L3132-2</td><td>Six jours de travail au maximum par semaine (L3132-1)</td></tr>
<tr><td>Temps de pause</td><td>20 minutes consécutives dès que le temps de travail quotidien atteint 6 heures</td><td>L3121-16</td><td>Un accord peut prévoir une pause plus longue</td></tr>
</table>

<h3>Qu'est-ce que le travail effectif ?</h3>
<p>L'article L3121-1 définit la durée du travail effectif comme « le temps pendant lequel le salarié est à la disposition de l'employeur et se conforme à ses directives sans pouvoir vaquer librement à des occupations personnelles ». Cette définition a des conséquences directes sur les compteurs :</p>
<ul>
<li><strong>Les temps de pause et de restauration</strong> ne sont pas du travail effectif, sauf si le salarié reste à la disposition de l'employeur (par exemple un agent qui doit rester joignable et intervenir pendant sa pause).</li>
<li><strong>Le temps d'habillage et de déshabillage</strong>, lorsque le port d'une tenue est imposé et que l'habillage doit se faire sur le lieu de travail, donne lieu à une contrepartie (repos ou financière) fixée par accord ou par le contrat (L3121-3). Cette question est fréquente dans la propreté.</li>
<li><strong>Le temps de trajet domicile – lieu habituel de travail</strong> n'est pas du travail effectif. S'il dépasse le temps normal de trajet (déplacement vers un chantier éloigné, par exemple), il donne lieu à une contrepartie (L3121-4).</li>
<li><strong>Les astreintes</strong> : seule la durée de l'intervention est du travail effectif ; la période d'astreinte elle-même donne lieu à une contrepartie (L3121-9).</li>
</ul>

<h3>Durée conventionnelle et durée contractuelle</h3>
<p>La <strong>durée conventionnelle</strong> est celle fixée par un accord collectif (par exemple 35 heures, ou un horaire collectif de 37 heures avec attribution de jours de réduction du temps de travail). La <strong>durée contractuelle</strong> est celle inscrite au contrat de travail : elle est obligatoire pour les salariés à temps partiel (article L3123-6, avec la répartition entre les jours de la semaine ou les semaines du mois). Dans une entreprise de propreté comme ALTÉA SERVICES, une grande partie des agents de service travaillent à temps partiel sur des vacations tôt le matin ou en soirée, chez plusieurs clients. Les règles de temps partiel (durée minimale, heures complémentaires, coupures, délai de prévenance) y sont donc au cœur du quotidien de l'assistant RH.</p>

<h3>Mise en pratique – ALTÉA SERVICES</h3>
<p>Le chef d'équipe du site « Parc d'activités de Créteil » vous transmet le planning de la semaine 47 d'un agent de service à temps plein, Mehdi CHAOUCHE :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Jour</th><th>Horaires</th><th>Durée</th></tr>
<tr><td>Lundi</td><td>5 h 00 – 9 h 00 puis 17 h 00 – 21 h 30</td><td>8 h 30</td></tr>
<tr><td>Mardi</td><td>5 h 00 – 9 h 00 puis 17 h 00 – 21 h 30</td><td>8 h 30</td></tr>
<tr><td>Mercredi</td><td>5 h 00 – 9 h 00 puis 17 h 00 – 22 h 00</td><td>9 h 00</td></tr>
<tr><td>Jeudi</td><td>6 h 00 – 9 h 00 puis 17 h 00 – 21 h 00</td><td>7 h 00</td></tr>
<tr><td>Vendredi</td><td>5 h 00 – 9 h 00 puis 17 h 00 – 21 h 00</td><td>8 h 00</td></tr>
<tr><td colspan="2"><strong>Total</strong></td><td><strong>41 h 00</strong></td></tr>
</table>
<p><strong>Analyse attendue :</strong></p>
<ol>
<li><strong>Durée quotidienne</strong> : aucune journée ne dépasse 10 heures. Conforme.</li>
<li><strong>Repos quotidien</strong> : le mercredi, l'agent finit à 22 h 00 et reprend le jeudi à 6 h 00, soit 8 heures de repos seulement. Entre lundi 21 h 30 et mardi 5 h 00, le repos n'est que de 7 h 30. Les 11 heures consécutives ne sont pas respectées : c'est une non-conformité à signaler immédiatement au responsable d'exploitation, avant l'exécution du planning.</li>
<li><strong>Heures supplémentaires</strong> : 41 h – 35 h = 6 heures supplémentaires, majorées à 25 % en l'absence d'accord fixant un autre taux (voir section 3.2). À transmettre au gestionnaire de paie.</li>
<li><strong>Travail de nuit</strong> : les heures entre 5 h 00 et 6 h 00 se situent dans la plage légale de nuit (21 h – 6 h), de même que les fins de service après 21 h 00 : il faut vérifier si l'agent atteint le statut de travailleur de nuit (voir section 3.3) et appliquer les contreparties prévues par la convention collective.</li>
</ol>
<blockquote><strong>Réflexe professionnel :</strong> l'assistant RH ne « valide » pas un planning non conforme. Il alerte par écrit (courriel au responsable d'exploitation, copie à la responsable RH), propose une correction (décaler la reprise du jeudi à 8 h 00 et du mardi à 8 h 30, ou répartir la vacation du soir sur un autre agent) et conserve la trace de l'échange.</blockquote>
`,
      },
      {
        title: "3.2 – Heures supplémentaires, heures complémentaires et forfaits",
        content: `
<h3>Les heures supplémentaires (salariés à temps plein)</h3>
<p>Les heures supplémentaires sont les heures accomplies <strong>au-delà de la durée légale de 35 heures par semaine</strong> (ou de la durée considérée comme équivalente), <strong>à la demande ou avec l'accord, même implicite, de l'employeur</strong>. Une heure effectuée à l'initiative du salarié sans que l'employeur en ait connaissance n'est pas, en principe, une heure supplémentaire ; mais dès que l'employeur les connaît et les laisse faire, elles sont dues. La semaine civile s'entend, sauf accord, du lundi 0 h au dimanche 24 h (L3121-35).</p>

<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Champ de la négociation (accord d'entreprise ou, à défaut, de branche)</th><th>Dispositions supplétives (à défaut d'accord)</th></tr>
<tr><td>Taux de majoration</td><td>Taux librement fixé, au minimum 10 % (L3121-33)</td><td>25 % pour les 8 premières heures (de la 36e à la 43e incluse), 50 % au-delà (L3121-36)</td></tr>
<tr><td>Contingent annuel</td><td>Fixé par l'accord (L3121-33)</td><td>220 heures par salarié et par an (D3121-24)</td></tr>
<tr><td>Contrepartie obligatoire en repos (au-delà du contingent)</td><td>Fixée par l'accord</td><td>50 % des heures au-delà du contingent dans les entreprises de 20 salariés au plus, 100 % au-delà de 20 salariés (L3121-38)</td></tr>
<tr><td>Remplacement du paiement par un repos</td><td>Repos compensateur de remplacement prévu par accord (L3121-33)</td><td>Possible dans les entreprises sans délégué syndical si le CSE ne s'y oppose pas (L3121-37)</td></tr>
</table>
<p>Les heures supplémentaires dont le paiement est intégralement remplacé par un repos compensateur équivalent ne s'imputent pas sur le contingent (L3121-30). Le Code exige que le CSE soit informé (et consulté sur les modalités d'utilisation du contingent selon les cas) ; la convention collective peut fixer un contingent différent : pour ALTÉA SERVICES, le réflexe est de vérifier la valeur du contingent et les taux applicables dans la CCN propreté (IDCC 3043) et dans un éventuel accord d'entreprise, sur Légifrance.</p>

<h4>Régime social et fiscal en bref</h4>
<p>Les rémunérations des heures supplémentaires et complémentaires bénéficient d'une <strong>réduction de cotisations salariales d'assurance vieillesse</strong> (dans la limite de 11,31 % du salaire de ces heures) et d'une <strong>exonération d'impôt sur le revenu dans la limite d'un plafond annuel de 7 500 € net</strong> (article 81 quater du Code général des impôts). Les entreprises de moins de 250 salariés bénéficient en outre d'une déduction forfaitaire de cotisations patronales par heure supplémentaire (1,50 € par heure en dessous de 20 salariés et 0,50 € de 20 à 249 salariés depuis la loi de finances rectificative du 16 août 2022 ; montants à vérifier sur urssaf.fr pour l'année en cours). Ce n'est pas à vous de paramétrer ces mécanismes, mais vous devez savoir pourquoi les heures supplémentaires sont <strong>identifiées séparément</strong> dans les variables transmises au cabinet comptable : elles déclenchent un traitement spécifique dans le logiciel de paie et dans la DSN.</p>

<h4>Exemple chiffré</h4>
<p>Agent de service à temps plein, taux horaire brut de 12,50 €, semaine de 45 heures, aucun accord d'entreprise sur le taux de majoration (on applique ici les taux supplétifs pour l'exercice) :</p>
<ul>
<li>Heures supplémentaires : 45 – 35 = 10 heures.</li>
<li>De la 36e à la 43e heure : 8 heures × 12,50 € × 1,25 = 125,00 €.</li>
<li>De la 44e à la 45e heure : 2 heures × 12,50 € × 1,50 = 37,50 €.</li>
<li>Total brut des heures supplémentaires : <strong>162,50 €</strong>, soit 125 € de salaire de base et 37,50 € de majorations.</li>
<li>Imputation sur le contingent annuel : 10 heures (si elles sont payées et non remplacées par un repos).</li>
</ul>

<h3>Les heures complémentaires (salariés à temps partiel)</h3>
<p>Est à temps partiel le salarié dont la durée du travail est inférieure à la durée légale ou conventionnelle (L3123-1). La <strong>durée minimale</strong> de travail est de 24 heures par semaine (L3123-27), mais un accord de branche étendu peut fixer une durée inférieure (L3123-19), et des dérogations individuelles existent (demande écrite et motivée du salarié pour contraintes personnelles ou cumul d'emplois, étudiants de moins de 26 ans, etc., L3123-7). La branche de la propreté fait partie des branches qui ont négocié sur ce point : la durée minimale applicable aux agents d'ALTÉA SERVICES se lit dans la CCN IDCC 3043.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Règle</th><th>Accord de branche étendu</th><th>Dispositions supplétives</th></tr>
<tr><td>Volume d'heures complémentaires</td><td>Jusqu'au tiers de la durée contractuelle (L3123-20)</td><td>Dans la limite du dixième de la durée contractuelle (L3123-28)</td></tr>
<tr><td>Majoration</td><td>Taux fixé par l'accord, au minimum 10 % pour chaque heure (L3123-21)</td><td>10 % dans la limite du dixième ; 25 % au-delà du dixième lorsque l'accord autorise à dépasser ce dixième (L3123-29)</td></tr>
<tr><td>Limite absolue</td><td colspan="2">Les heures complémentaires ne peuvent jamais porter la durée du travail au niveau de la durée légale ou conventionnelle (L3123-9)</td></tr>
<tr><td>Requalification</td><td colspan="2">Lorsque l'horaire réellement accompli dépasse de 2 heures au moins par semaine l'horaire prévu pendant 12 semaines consécutives (ou 12 semaines sur 15), l'horaire contractuel est modifié, sauf opposition du salarié (L3123-13)</td></tr>
</table>
<p><strong>Exemple :</strong> une agente contractuellement à 20 heures par semaine travaille 23 heures. Sans accord de branche ouvrant le tiers, la limite est de 2 heures (dixième de 20 heures). La troisième heure dépasse la limite légale : l'assistant RH doit signaler la situation et proposer, si le besoin est durable, un <strong>avenant de complément d'heures</strong> si la convention collective le permet (L3123-22) ou une augmentation de la durée contractuelle.</p>

<h3>Les forfaits</h3>
<h4>Forfait en heures</h4>
<p>Un forfait en heures sur la semaine ou le mois peut être conclu avec tout salarié ; il intègre un nombre d'heures supplémentaires déterminé, payées avec leur majoration. Le forfait annuel en heures exige un accord collectif et concerne les cadres autonomes et les salariés disposant d'une réelle autonomie dans l'organisation de leur emploi du temps (L3121-56). Dans tous les cas, une <strong>convention individuelle de forfait écrite</strong> est obligatoire (L3121-55).</p>
<h4>Forfait en jours</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Condition</th><th>Contenu</th><th>Référence</th></tr>
<tr><td>Salariés concernés</td><td>Cadres disposant d'une autonomie dans l'organisation de leur emploi du temps ; salariés dont la durée du temps de travail ne peut être prédéterminée et qui disposent d'une réelle autonomie</td><td>L3121-58</td></tr>
<tr><td>Accord collectif</td><td>Obligatoire ; il fixe les catégories, le nombre de jours (218 au plus), les modalités d'évaluation et de suivi de la charge de travail, la communication sur l'articulation vie professionnelle – vie personnelle et le droit à la déconnexion</td><td>L3121-63, L3121-64</td></tr>
<tr><td>Convention individuelle</td><td>Écrite, signée par le salarié</td><td>L3121-55</td></tr>
<tr><td>Suivi</td><td>Document de contrôle des jours travaillés et des repos ; entretien périodique sur la charge de travail, l'organisation, l'articulation des temps et la rémunération</td><td>L3121-64, L3121-65</td></tr>
<tr><td>Renonciation à des jours de repos</td><td>Possible par avenant écrit, valable un an, avec une majoration d'au moins 10 % ; plafond fixé par l'accord ou, à défaut, 235 jours</td><td>L3121-59, L3121-66</td></tr>
<tr><td>Règles restant applicables</td><td>Repos quotidien de 11 heures, repos hebdomadaire, congés payés, jours fériés chômés dans l'entreprise. Les durées maximales quotidienne et hebdomadaire ne s'appliquent pas</td><td>L3121-62</td></tr>
</table>
<p><strong>Calcul du nombre de jours de repos (« JRTT ») d'un forfait de 218 jours, année 2027 :</strong> 365 jours – 104 samedis et dimanches – 25 jours ouvrés de congés payés – 7 jours fériés tombant un jour ouvré en 2027 (1er janvier, lundi de Pâques, Ascension, lundi de Pentecôte, 14 juillet, 1er novembre, 11 novembre ; nombre à recompter chaque année) = 229 jours travaillables. 229 – 218 = <strong>11 jours de repos</strong>. Le nombre varie chaque année selon le calendrier : l'assistant RH le recalcule et le paramètre dans le SIRH (compteur « repos forfait jours » dans Lucca).</p>
<blockquote><strong>Point de vigilance :</strong> un forfait jours conclu sans accord collectif conforme, ou sans suivi effectif de la charge de travail, peut être privé d'effet par le juge ; le salarié peut alors réclamer le paiement d'heures supplémentaires sur les trois dernières années (prescription des salaires, L3245-1). Pour l'assistant RH, la preuve de l'entretien annuel de charge de travail (compte rendu signé, archivé au dossier) est donc un document sensible.</blockquote>
`,
      },
      {
        title: "3.3 – Aménagement du temps de travail, travail de nuit, du dimanche et des jours fériés",
        content: `
<h3>L'aménagement du temps de travail sur une période supérieure à la semaine</h3>
<p>Lorsque l'activité varie (saisonnalité, chantiers ponctuels, fermetures de sites clients en été), l'entreprise peut répartir la durée du travail sur une période supérieure à la semaine. Les semaines hautes compensent alors les semaines basses et les heures supplémentaires ne sont décomptées qu'à la fin de la période de référence.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Mode d'aménagement</th><th>Conditions</th><th>Décompte des heures supplémentaires</th></tr>
<tr><td>Par accord collectif (L3121-44)</td><td>Période de référence au plus égale à un an (trois ans si un accord de branche l'autorise). L'accord fixe le délai de prévenance des changements d'horaire, les conditions de prise en compte des absences, arrivées et départs en cours de période</td><td>Heures effectuées au-delà de 1 607 heures par an ou de la limite haute hebdomadaire fixée par l'accord</td></tr>
<tr><td>Par décision unilatérale de l'employeur (L3121-45, D3121-27)</td><td>Période maximale de 9 semaines dans les entreprises de moins de 50 salariés ; de 4 semaines dans celles de 50 salariés et plus. Programme indicatif soumis à l'avis du CSE ; délai de prévenance de 7 jours ouvrés</td><td>Heures effectuées au-delà de la moyenne de 35 heures calculée sur la période</td></tr>
</table>
<p>Avec 148 salariés, ALTÉA SERVICES ne peut aménager le temps de travail par décision unilatérale que sur 4 semaines au plus. Une annualisation exige un accord collectif.</p>
<p><strong>Autres dispositifs :</strong> les jours de réduction du temps de travail (horaire collectif de 37 heures compensé par des jours de repos), le cycle de travail, les horaires individualisés avec reports d'heures (L3121-48 et suivants), le travail en équipes successives, et le temps partiel aménagé sur plusieurs semaines si un accord le prévoit (L3121-44).</p>

<h3>Le travail de nuit</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Notion</th><th>Règle</th><th>Référence</th></tr>
<tr><td>Caractère exceptionnel</td><td>Le recours au travail de nuit est exceptionnel ; il doit être justifié par la nécessité d'assurer la continuité de l'activité économique ou des services d'utilité sociale</td><td>L3122-1</td></tr>
<tr><td>Période de nuit</td><td>Tout travail effectué entre 21 heures et 7 heures est du travail de nuit ; à défaut d'accord, la période est fixée de 21 heures à 6 heures</td><td>L3122-2, L3122-20</td></tr>
<tr><td>Travailleur de nuit</td><td>Le salarié qui accomplit, au moins deux fois par semaine, au moins 3 heures de son temps de travail quotidien dans la période de nuit, ou qui accomplit au moins 270 heures de travail de nuit sur 12 mois consécutifs (à défaut d'accord)</td><td>L3122-5, R3122-1</td></tr>
<tr><td>Durées maximales</td><td>8 heures par jour ; 40 heures par semaine en moyenne sur 12 semaines (44 heures par accord)</td><td>L3122-6, L3122-7</td></tr>
<tr><td>Contreparties</td><td>Repos compensateur obligatoire, et le cas échéant compensation salariale, fixés par l'accord collectif</td><td>L3122-8</td></tr>
<tr><td>Suivi médical</td><td>Suivi individuel adapté (visite d'information et de prévention préalable à l'affectation)</td><td>L3122-11, R4624-18</td></tr>
<tr><td>Protection</td><td>La salariée enceinte travailleuse de nuit peut demander à être affectée à un poste de jour ; transfert possible pour raisons familiales impérieuses</td><td>L1225-9, L3122-12</td></tr>
</table>
<p>Dans la propreté, les vacations très matinales sont fréquentes. L'assistant RH tient à jour, dans Lucca ou dans un tableur, un <strong>compteur des heures de nuit</strong> par salarié : il permet de valoriser les majorations prévues par la convention collective et de repérer le passage au statut de travailleur de nuit (et donc le suivi médical adapté).</p>

<h3>Le travail du dimanche</h3>
<p>Le repos hebdomadaire est donné le dimanche « dans l'intérêt des salariés » (L3132-3). Les dérogations sont limitatives :</p>
<ul>
<li><strong>Dérogations permanentes de droit</strong> pour les activités dont le fonctionnement est rendu nécessaire par les contraintes de production ou les besoins du public (L3132-12 ; liste à l'article R3132-5), parmi lesquelles certaines activités de nettoyage de locaux industriels et commerciaux dans des conditions précises : à vérifier pour chaque site client.</li>
<li><strong>Commerces de détail alimentaire</strong> : jusqu'à 13 heures (L3132-13).</li>
<li><strong>Dérogations géographiques</strong> (zones touristiques internationales, zones touristiques, zones commerciales, gares) avec accord collectif et contreparties (L3132-24 et suivants).</li>
<li><strong>« Dimanches du maire »</strong> : jusqu'à 12 dimanches par an dans les commerces de détail (L3132-26).</li>
<li><strong>Dérogation préfectorale temporaire</strong> lorsque le repos simultané de tout le personnel serait préjudiciable au public ou au fonctionnement de l'établissement (L3132-20).</li>
</ul>
<p>Les contreparties (majoration, repos compensateur) dépendent du fondement de la dérogation et de la convention collective. Dans les cas de dérogations géographiques ou préfectorales, seuls les salariés volontaires ayant donné leur accord par écrit peuvent travailler le dimanche.</p>

<h3>Les jours fériés</h3>
<p>Le Code du travail énumère <strong>11 jours fériés</strong> (L3133-1) : 1er janvier, lundi de Pâques, 1er mai, 8 mai, Ascension, lundi de Pentecôte, 14 juillet, 15 août, 1er novembre, 11 novembre, 25 décembre (avec deux jours supplémentaires en Alsace-Moselle : Vendredi saint dans les communes ayant un temple protestant ou une église mixte, et 26 décembre).</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Jour</th><th>Règle</th></tr>
<tr><td>1er mai</td><td>Seul jour férié obligatoirement chômé (sauf établissements qui ne peuvent interrompre le travail). Le chômage n'entraîne aucune perte de salaire ; s'il est travaillé, le salarié perçoit en plus une indemnité égale au montant du salaire (L3133-4 à L3133-6)</td></tr>
<tr><td>Autres jours fériés</td><td>Chômés ou non selon l'accord d'entreprise, à défaut de branche, à défaut décision de l'employeur (L3133-3-1, L3133-3-2). Le chômage d'un jour férié ne peut entraîner aucune perte de salaire pour les salariés ayant au moins 3 mois d'ancienneté (L3133-3)</td></tr>
<tr><td>Journée de solidarité</td><td>Journée de travail supplémentaire non rémunérée de 7 heures pour un temps plein (proratisée pour un temps partiel), fixée par accord ou, à défaut, par l'employeur après consultation du CSE (L3133-7 à L3133-12). Contribution patronale de 0,30 % (CSA)</td></tr>
<tr><td>Jeunes de moins de 18 ans</td><td>Principe d'interdiction du travail les jours fériés (L3164-6), sauf dérogations sectorielles</td></tr>
</table>

<h3>Mise en pratique – ALTÉA SERVICES</h3>
<p>Un client, centre commercial du Val-de-Marne, demande une prestation de nettoyage le dimanche 6 décembre 2026 et le vendredi 25 décembre 2026. La responsable d'exploitation vous demande « ce qu'il faut faire ». Votre démarche :</p>
<ol>
<li>Identifier le fondement juridique du travail dominical sur ce site (dérogation de droit liée à l'activité, zone commerciale, arrêté municipal) : demander au client ou consulter l'arrêté, puis vérifier la CCN.</li>
<li>Vérifier si le 25 décembre est chômé chez ALTÉA SERVICES (accord d'entreprise, CCN) et quelles majorations s'appliquent s'il est travaillé.</li>
<li>Recueillir le volontariat écrit des salariés lorsque la dérogation l'exige, et préparer l'affectation dans Lucca.</li>
<li>Créer les codes d'heures spécifiques (« dimanche », « jour férié travaillé ») pour la transmission des variables à Silae.</li>
<li>Rédiger une note de synthèse de 10 lignes pour la responsable d'exploitation, en citant les sources consultées.</li>
</ol>
`,
      },
      {
        title: "3.4 – Outils de planification et de suivi du temps : planning, compteurs SIRH, tableur",
        content: `
<h3>Pourquoi l'employeur doit décompter le temps de travail</h3>
<p>L'employeur doit pouvoir justifier des horaires effectivement réalisés. Lorsque tous les salariés d'un atelier, d'un service ou d'une équipe ne travaillent pas selon le même horaire collectif affiché, la durée du travail de chaque salarié est décomptée <strong>quotidiennement</strong> (enregistrement des heures de début et de fin de chaque période de travail ou relevé du nombre d'heures accomplies) et <strong>chaque semaine</strong> (récapitulation) (D3171-8). Pour les salariés à temps partiel, l'horaire et sa répartition doivent pouvoir être contrôlés à tout moment. Ces documents sont tenus à la disposition de l'inspection du travail pendant <strong>un an</strong> (D3171-16). En cas de litige sur les heures supplémentaires, le juge forme sa conviction au vu des éléments apportés par les deux parties (L3171-4) : un employeur incapable de produire un décompte fiable est en position de faiblesse.</p>

<h3>Les trois outils de l'assistant RH</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Outil</th><th>Usage</th><th>Points de contrôle</th></tr>
<tr><td>Planning prévisionnel</td><td>Affecter les salariés aux sites et aux vacations, anticiper les absences et les remplacements</td><td>Durées maximales, repos de 11 heures et de 35 heures, coupures des temps partiels, délai de prévenance des modifications (7 jours ouvrés à défaut d'accord pour les temps partiels, L3123-31 ; 3 jours au minimum par accord, L3123-24)</td></tr>
<tr><td>SIRH (Lucca chez ALTÉA SERVICES)</td><td>Saisie et validation des temps, demandes d'absences et de congés, compteurs individuels (congés payés, RTT, heures supplémentaires, récupérations, heures de nuit)</td><td>Paramétrage des règles (période d'acquisition, règles de décompte en jours ouvrables ou ouvrés), circuit de validation manager puis RH, export mensuel des variables vers la paie</td></tr>
<tr><td>Tableur (Excel ou Google Sheets)</td><td>Contrôle croisé, tableaux de suivi spécifiques (contingent d'heures supplémentaires, heures de délégation, suivi des arrêts), simulations</td><td>Formules verrouillées, données sources datées, accès restreint (données personnelles), sauvegarde</td></tr>
</table>

<h3>Construire un tableau de suivi du contingent d'heures supplémentaires</h3>
<p>Voici une structure de tableur simple, à une ligne par salarié et par mois, que vous pouvez construire en ECF ou en entreprise :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Colonne</th><th>Contenu</th><th>Formule ou règle (exemple sous Excel)</th></tr>
<tr><td>A</td><td>Matricule</td><td>Saisie (pas de nom dans un fichier partagé si ce n'est pas nécessaire : minimisation RGPD)</td></tr>
<tr><td>B</td><td>Mois</td><td>Date au format mois-année</td></tr>
<tr><td>C</td><td>Heures supplémentaires payées à 25 %</td><td>Import depuis l'export Lucca</td></tr>
<tr><td>D</td><td>Heures supplémentaires payées à 50 %</td><td>Import depuis l'export Lucca</td></tr>
<tr><td>E</td><td>Heures supplémentaires compensées intégralement en repos</td><td>Non imputées sur le contingent</td></tr>
<tr><td>F</td><td>Cumul imputable sur le contingent depuis le 1er janvier</td><td>=SOMME.SI.ENS(C:C;A:A;A2;B:B;"&lt;="&amp;B2)+SOMME.SI.ENS(D:D;A:A;A2;B:B;"&lt;="&amp;B2)</td></tr>
<tr><td>G</td><td>Contingent applicable</td><td>Valeur de référence (220 heures à défaut d'accord, ou valeur conventionnelle)</td></tr>
<tr><td>H</td><td>Alerte</td><td>=SI(F2&gt;=G2;"DÉPASSÉ";SI(F2&gt;=0,8*G2;"80 % atteint";"OK"))</td></tr>
<tr><td>I</td><td>Contrepartie obligatoire en repos due</td><td>=MAX(0;F2-G2)*taux (100 % au-delà de 20 salariés)</td></tr>
</table>
<p>Une mise en forme conditionnelle (orange à 80 %, rouge au dépassement) permet à la responsable RH de visualiser immédiatement les salariés concernés. Le salarié doit être informé de ses droits à repos (contrepartie obligatoire en repos) par un document annexé au bulletin de paie (D3171-11).</p>

<h3>Procédure mensuelle de clôture des temps – ALTÉA SERVICES</h3>
<ol>
<li><strong>J-10 avant l'envoi des variables</strong> : rappel automatique Lucca aux chefs d'équipe pour valider les feuilles de temps du mois.</li>
<li><strong>J-7</strong> : contrôle par l'assistant RH des anomalies (feuilles non validées, pointages manquants, absences sans justificatif, dépassements de durées maximales, repos non respectés).</li>
<li><strong>J-5</strong> : relance individuelle des managers ; échange avec les salariés concernés si nécessaire.</li>
<li><strong>J-4</strong> : export des compteurs (heures normales, heures supplémentaires par taux, heures complémentaires, heures de nuit, dimanches, jours fériés, absences par motif) ; contrôle de cohérence avec le tableur de suivi.</li>
<li><strong>J-3</strong> : transmission à Karim BENSAÏD, qui envoie le fichier au cabinet comptable pour la saisie dans Silae.</li>
<li><strong>J+2 après la paie</strong> : contrôle par sondage de 10 bulletins (heures supplémentaires, absences) ; archivage de l'export dans le dossier « Variables » daté.</li>
</ol>
<blockquote><strong>Bonne pratique :</strong> tenez un <strong>journal des anomalies</strong> (date, salarié, anomalie, action, personne informée, date de résolution). Il sert de preuve de diligence, alimente les indicateurs du chapitre CP3 et vous permet de répondre au jury lors de l'entretien technique sur la manière dont vous fiabilisez les données.</blockquote>

<h3>Le temps partiel : coupures et modifications de planning</h3>
<p>La journée de travail d'un salarié à temps partiel ne peut comporter, à défaut d'accord, <strong>plus d'une interruption d'activité ou une interruption supérieure à deux heures</strong> (L3123-30). Un accord de branche étendu peut déroger à cette règle, en prévoyant des contreparties. C'est le cas dans plusieurs branches de services, dont la propreté : la CCN IDCC 3043 encadre les coupures et leurs contreparties. Avant de valider le planning d'un agent qui travaille 2 heures le matin et 3 heures le soir, vérifiez la règle conventionnelle applicable et la contrepartie à verser.</p>
`,
      },
      {
        title: "3.5 – Les congés payés : acquisition, prise, report, fractionnement et indemnisation",
        content: `
<h3>Le droit à congé : principes</h3>
<p>Tout salarié a droit chaque année à un congé payé à la charge de l'employeur (L3141-1), quel que soit son contrat (CDI, CDD, temps plein ou partiel, apprenti). Il acquiert <strong>2,5 jours ouvrables par mois de travail effectif</strong> chez le même employeur, dans la limite de <strong>30 jours ouvrables</strong> (5 semaines) par période de référence (L3141-3). Aucune condition d'ancienneté minimale n'est exigée. Lorsque le nombre de jours obtenu n'est pas entier, la durée du congé est portée au nombre entier immédiatement supérieur (L3141-7).</p>
<p>Les jours ouvrables sont tous les jours de la semaine sauf le jour de repos hebdomadaire (en général le dimanche) et les jours fériés chômés. De nombreuses entreprises décomptent en <strong>jours ouvrés</strong> (jours habituellement travaillés, en général du lundi au vendredi) : 25 jours ouvrés équivalent à 30 jours ouvrables, à condition que le décompte ne soit jamais moins favorable au salarié.</p>

<h3>La période de référence et les périodes assimilées</h3>
<p>Sauf accord collectif fixant une autre période, la période de référence pour l'acquisition court <strong>du 1er juin de l'année précédente au 31 mai de l'année en cours</strong> (R3141-4). Dans les entreprises affiliées à une caisse de congés payés, la période est différente (1er avril – 31 mars).</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Période</th><th>Effet sur l'acquisition</th><th>Référence</th></tr>
<tr><td>Congés payés, jours de repos de RTT, repos compensateurs</td><td>Assimilés à du travail effectif</td><td>L3141-5</td></tr>
<tr><td>Congé de maternité, de paternité et d'accueil de l'enfant, d'adoption</td><td>Assimilés à du travail effectif</td><td>L3141-5</td></tr>
<tr><td>Arrêt pour accident du travail ou maladie professionnelle</td><td>Assimilé à du travail effectif <strong>sans limitation de durée</strong> depuis la loi du 22 avril 2024 (auparavant limité à un an ininterrompu) : 2,5 jours ouvrables par mois</td><td>L3141-5, 5°</td></tr>
<tr><td>Arrêt pour maladie ou accident d'origine non professionnelle</td><td>Ouvre droit depuis la loi du 22 avril 2024 à <strong>2 jours ouvrables par mois</strong>, dans la limite de <strong>24 jours ouvrables</strong> par période de référence</td><td>L3141-5, 7° et L3141-5-1</td></tr>
<tr><td>Congé parental d'éducation</td><td>Pas d'acquisition de congés payés pendant le congé ; le salarié conserve les droits acquis avant son départ. L'ancienneté est prise en compte pour moitié (loi du 9 mars 2023)</td><td>L1225-54</td></tr>
<tr><td>Absences non assimilées (congé sans solde, absence injustifiée, grève)</td><td>Pas d'acquisition</td><td>–</td></tr>
</table>

<h3>Ce que la loi du 22 avril 2024 a changé</h3>
<p>La loi n° 2024-364 du 22 avril 2024 (article 37) a mis le droit français en conformité avec le droit de l'Union européenne, après les arrêts de la Cour de cassation du 13 septembre 2023. Retenez cinq points :</p>
<ol>
<li><strong>Acquisition pendant la maladie non professionnelle</strong> : 2 jours ouvrables par mois, plafonnée à 24 jours ouvrables par an, soit 4 semaines, le minimum garanti par la directive européenne 2003/88.</li>
<li><strong>Acquisition pendant un arrêt AT/MP</strong> : 2,5 jours ouvrables par mois, sans limitation de durée.</li>
<li><strong>Période de report de 15 mois</strong> (L3141-19-1) : lorsque le salarié n'a pas pu prendre ses congés du fait d'une maladie ou d'un accident, il dispose d'un délai de report de 15 mois pour les prendre. Ce délai court à compter de la date à laquelle il reçoit, après sa reprise, l'information de l'employeur sur ses droits.</li>
<li><strong>Obligation d'information</strong> (L3141-19-3) : dans le mois qui suit la reprise du travail, l'employeur informe le salarié, par tout moyen conférant date certaine (bulletin de paie notamment), du nombre de jours de congé dont il dispose et de la date jusqu'à laquelle ils peuvent être pris.</li>
<li><strong>Effet rétroactif encadré</strong> : les nouvelles règles s'appliquent rétroactivement depuis le 1er décembre 2009, sous réserve des décisions de justice définitives ; un salarié toujours en poste disposait d'un délai de deux ans à compter de l'entrée en vigueur de la loi (24 avril 2024) pour agir, et pour un salarié ayant quitté l'entreprise, la prescription de trois ans de l'action en paiement s'applique. Le calcul des droits rétroactifs est plafonné à 24 jours ouvrables par période.</li>
</ol>
<p>Concrètement, l'assistant RH vérifie que le paramétrage du SIRH et du logiciel de paie a bien été mis à jour (règle d'acquisition sur les absences « maladie » et « AT/MP ») et que le courrier ou la mention sur le bulletin d'information au retour d'arrêt est bien produit.</p>

<h3>La prise des congés</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Règle</th><th>Contenu</th><th>Référence</th></tr>
<tr><td>Période de prise</td><td>Fixée par accord ou, à défaut, par l'employeur après avis du CSE ; elle comprend dans tous les cas la période du 1er mai au 31 octobre</td><td>L3141-13, L3141-16</td></tr>
<tr><td>Information</td><td>Période de prise portée à la connaissance des salariés au moins 2 mois avant son ouverture</td><td>D3141-5</td></tr>
<tr><td>Ordre des départs</td><td>Fixé selon les critères de l'accord ou, à défaut, de l'employeur, en tenant compte de la situation de famille (possibilités de congé du conjoint ou partenaire de PACS, présence d'un enfant ou d'un adulte handicapé ou d'une personne âgée en perte d'autonomie), de l'ancienneté, de l'activité chez un ou plusieurs autres employeurs. Les conjoints et partenaires de PACS travaillant dans la même entreprise ont droit à un congé simultané</td><td>L3141-14, L3141-16</td></tr>
<tr><td>Communication de l'ordre des départs</td><td>À chaque salarié, par tout moyen, au moins un mois avant son départ ; affichage dans les locaux</td><td>D3141-6</td></tr>
<tr><td>Modification des dates</td><td>Pas de modification dans le délai d'un mois avant la date prévue, sauf circonstances exceptionnelles (ou délai fixé par accord)</td><td>L3141-16</td></tr>
<tr><td>Congé principal</td><td>Au plus 24 jours ouvrables d'affilée (sauf contraintes géographiques particulières ou enfant handicapé) ; au moins 12 jours ouvrables continus entre deux jours de repos hebdomadaire pris entre le 1er mai et le 31 octobre</td><td>L3141-17, L3141-18, L3141-19</td></tr>
<tr><td>5e semaine</td><td>Prise séparément du congé principal</td><td>L3141-19</td></tr>
</table>

<h3>Le fractionnement</h3>
<p>Lorsque le congé principal (4 semaines au plus) est fractionné et qu'une partie est prise en dehors de la période du 1er mai au 31 octobre, le salarié a droit à des jours supplémentaires (L3141-23, dispositions supplétives) :</p>
<ul>
<li><strong>2 jours ouvrables</strong> si le nombre de jours pris en dehors de cette période est au moins égal à 6 ;</li>
<li><strong>1 jour ouvrable</strong> s'il est compris entre 3 et 5.</li>
</ul>
<p>Les jours de la 5e semaine ne comptent pas pour ce calcul. Un accord peut prévoir d'autres règles, et l'employeur peut obtenir, avec l'agrément du salarié, une renonciation individuelle écrite aux jours de fractionnement.</p>
<p><strong>Exemple :</strong> Inès FERREIRA (30 jours ouvrables acquis) prend 18 jours en août, puis 6 jours en février et 6 jours (5e semaine) en avril. Jours du congé principal pris hors période : 6 (février). Elle a droit à <strong>2 jours de fractionnement</strong>. Les 6 jours d'avril (5e semaine) ne sont pas comptés.</p>

<h3>Le report</h3>
<p>En principe, les congés non pris à la fin de la période de prise sont perdus, sauf si l'employeur a empêché le salarié de les prendre (c'est à l'employeur de prouver qu'il a mis le salarié en mesure de les exercer). Ils sont reportés de plein droit en cas de maladie, d'accident, de maternité (L3141-2) ou d'adoption ; un accord peut aussi prévoir un report, notamment sur un compte épargne-temps, ou en cas de temps partiel ou d'aménagement du temps de travail sur l'année (L3141-22).</p>

<h3>L'indemnisation : maintien de salaire ou règle du dixième</h3>
<p>L'indemnité de congés payés est égale au <strong>dixième de la rémunération brute totale</strong> perçue pendant la période de référence (L3141-24), sans pouvoir être inférieure à la rémunération que le salarié aurait perçue s'il avait continué à travailler (<strong>maintien de salaire</strong>). Le calcul le plus favorable s'applique. La rémunération brute totale comprend le salaire de base, les heures supplémentaires, les primes liées au travail (prime d'assiduité, d'astreinte, de rendement individuel), les indemnités de congés payés de l'année précédente, ainsi que les périodes assimilées valorisées ; elle exclut les primes annuelles non affectées par la prise des congés (13e mois, prime de fin d'année calculée sur l'année) et les remboursements de frais.</p>
<h4>Exemple chiffré</h4>
<p>Salariée à temps plein, salaire mensuel de base 2 100 € bruts, rémunération brute totale de la période de référence (1er juin 2025 – 31 mai 2026) de 26 400 € (incluant heures supplémentaires et primes d'assiduité), 30 jours ouvrables acquis. Elle prend 12 jours ouvrables en juillet 2026 (juillet compte 26 jours ouvrables).</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Méthode</th><th>Calcul</th><th>Résultat</th></tr>
<tr><td>Règle du dixième</td><td>26 400 € × 10 % = 2 640 € pour 30 jours ; 2 640 € × 12 / 30</td><td>1 056,00 €</td></tr>
<tr><td>Maintien de salaire (méthode des jours ouvrables réels)</td><td>2 100 € × 12 / 26</td><td>969,23 €</td></tr>
<tr><td>Montant retenu</td><td colspan="2"><strong>1 056,00 €</strong> (règle du dixième, plus favorable) ; dans Silae, la comparaison est effectuée automatiquement, mais l'assistant RH doit savoir l'expliquer à la salariée</td></tr>
</table>
`,
      },
      {
        title: "3.6 – Congés pour événements familiaux, congés spéciaux et congés liés à la parentalité",
        content: `
<h3>Les congés pour événements familiaux</h3>
<p>Ces congés n'entraînent aucune réduction de rémunération et sont assimilés à du travail effectif pour la détermination des congés payés (L3142-2). Ils sont pris au moment de l'événement ou dans une période raisonnable autour de celui-ci. Les durées légales ci-dessous sont des minima d'ordre public : la convention collective ou l'accord d'entreprise peut prévoir plus (L3142-4 et L3142-5). Pour ALTÉA SERVICES, comparez toujours avec la CCN IDCC 3043 et appliquez la règle la plus favorable.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Événement</th><th>Durée légale minimale</th></tr>
<tr><td>Mariage ou conclusion d'un PACS du salarié</td><td>4 jours</td></tr>
<tr><td>Mariage d'un enfant</td><td>1 jour</td></tr>
<tr><td>Naissance ou arrivée d'un enfant placé en vue de son adoption</td><td>3 jours (à prendre à compter du jour de la naissance ou du premier jour ouvrable qui suit, pour le congé de naissance)</td></tr>
<tr><td>Décès d'un enfant</td><td>12 jours ouvrables ; 14 jours ouvrables si l'enfant avait moins de 25 ans, s'il était lui-même parent ou s'il s'agit d'une personne de moins de 25 ans à la charge effective et permanente du salarié (loi du 19 juillet 2023). S'y ajoute, dans ces derniers cas, le congé de deuil de 8 jours (L3142-1-1), fractionnable et à prendre dans l'année</td></tr>
<tr><td>Décès du conjoint, du concubin ou du partenaire de PACS</td><td>3 jours</td></tr>
<tr><td>Décès du père, de la mère, du beau-père, de la belle-mère, d'un frère ou d'une sœur</td><td>3 jours</td></tr>
<tr><td>Annonce de la survenue d'un handicap, d'une pathologie chronique nécessitant un apprentissage thérapeutique ou d'un cancer chez un enfant</td><td>5 jours</td></tr>
</table>
<p>Ces durées évoluent régulièrement : avant toute réponse écrite à un salarié, vérifiez l'article L3142-4 sur Légifrance ou la fiche correspondante sur service-public.fr à la date du jour.</p>

<h3>Les autres congés et absences autorisées</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Congé</th><th>Objet et règles essentielles</th><th>Rémunération</th></tr>
<tr><td>Congé pour enfant malade</td><td>3 jours par an, 5 jours si l'enfant a moins d'un an ou si le salarié assume la charge d'au moins trois enfants de moins de 16 ans (L1225-61) ; certificat médical</td><td>Non rémunéré par la loi (la convention collective peut prévoir un maintien)</td></tr>
<tr><td>Congé de présence parentale</td><td>Enfant à charge atteint d'une maladie, d'un handicap ou victime d'un accident d'une particulière gravité ; réserve de 310 jours ouvrés sur 3 ans (L1225-62)</td><td>Non rémunéré ; allocation journalière de présence parentale (CAF)</td></tr>
<tr><td>Congé de proche aidant</td><td>Proche en situation de handicap ou de perte d'autonomie ; 3 mois renouvelables, dans la limite d'un an sur la carrière (L3142-16 et suivants)</td><td>Non rémunéré ; allocation journalière du proche aidant</td></tr>
<tr><td>Congé de solidarité familiale</td><td>Proche en fin de vie ; 3 mois renouvelable une fois (L3142-6)</td><td>Non rémunéré ; allocation journalière d'accompagnement</td></tr>
<tr><td>Congé sabbatique, congé pour création d'entreprise</td><td>Conditions d'ancienneté et de délai de demande fixées par accord ou, à défaut, par le Code (L3142-28 et suivants, L3142-105 et suivants)</td><td>Non rémunéré</td></tr>
<tr><td>Congé de formation économique, sociale, environnementale et syndicale</td><td>Pour les salariés souhaitant participer à des stages ou sessions de formation (L2145-5)</td><td>Maintien de salaire par l'employeur</td></tr>
<tr><td>Absences pour examens médicaux de grossesse et PMA</td><td>Autorisation d'absence pour les examens obligatoires ; le conjoint peut accompagner à trois examens (L1225-16)</td><td>Rémunérées, assimilées à du travail effectif</td></tr>
</table>

<h3>Le congé de maternité</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Prénatal</th><th>Postnatal</th><th>Total</th></tr>
<tr><td>1er ou 2e enfant</td><td>6 semaines</td><td>10 semaines</td><td>16 semaines</td></tr>
<tr><td>3e enfant ou plus (au moins deux enfants déjà à charge)</td><td>8 semaines</td><td>18 semaines</td><td>26 semaines</td></tr>
<tr><td>Jumeaux</td><td>12 semaines</td><td>22 semaines</td><td>34 semaines</td></tr>
<tr><td>Triplés ou plus</td><td>24 semaines</td><td>22 semaines</td><td>46 semaines</td></tr>
</table>
<p>Il est interdit d'employer une salariée pendant 8 semaines au total avant et après l'accouchement, dont 6 semaines après (L1225-29). Une partie du congé prénatal peut être reportée après la naissance (dans la limite de 3 semaines, sur avis médical). La salariée bénéficie d'une <strong>protection contre le licenciement</strong> pendant la grossesse, le congé de maternité et les 10 semaines qui suivent (L1225-4). À son retour, elle retrouve son emploi ou un emploi similaire assorti d'une rémunération au moins équivalente, avec la garantie d'évolution salariale de l'article L1225-26, et bénéficie de l'<strong>entretien de parcours professionnel</strong> (L6315-1). Depuis la loi du 24 octobre 2025, cet entretien remplace l'ancien entretien professionnel : un premier entretien dans l'année qui suit l'embauche, puis tous les 4 ans, avec un état des lieux récapitulatif à 8 ans ; vérifiez sur Légifrance les conditions dans lesquelles il est proposé au retour d'un congé de maternité, d'un congé parental ou d'une longue absence.</p>

<h3>Le congé de paternité et d'accueil de l'enfant</h3>
<p>Depuis le 1er juillet 2021, il dure <strong>25 jours calendaires</strong> (32 jours en cas de naissances multiples), s'ajoutant aux 3 jours du congé de naissance (L1225-35). Il se compose d'une période obligatoire de 4 jours calendaires prise immédiatement après le congé de naissance, et d'une période de 21 jours (28 jours en cas de naissances multiples) qui peut être fractionnée en deux périodes d'au moins 5 jours, à prendre dans les 6 mois suivant la naissance. Le salarié informe l'employeur de la date prévisionnelle de l'accouchement au moins un mois avant, et des dates de prise de la seconde période au moins un mois avant (D1225-8). L'indemnisation est assurée par la CPAM (indemnités journalières), avec éventuellement un complément conventionnel.</p>

<h3>Le congé parental d'éducation</h3>
<ul>
<li><strong>Bénéficiaires</strong> : tout salarié justifiant d'un an d'ancienneté à la date de la naissance ou de l'arrivée de l'enfant (L1225-47).</li>
<li><strong>Forme</strong> : suspension totale du contrat ou passage à temps partiel (16 heures hebdomadaires au minimum).</li>
<li><strong>Durée</strong> : un an au plus, renouvelable deux fois, jusqu'au troisième anniversaire de l'enfant (L1225-48).</li>
<li><strong>Demande</strong> : par lettre recommandée avec avis de réception ou remise en main propre contre décharge, un mois avant la fin du congé de maternité ou d'adoption si le congé parental lui succède immédiatement, deux mois avant dans les autres cas (R1225-13, L1225-50).</li>
<li><strong>Effets</strong> : l'employeur ne peut pas refuser ; la durée du congé est prise en compte pour moitié dans l'ancienneté ; au retour, entretien de parcours professionnel (L6315-1, dans sa rédaction issue de la loi du 24 octobre 2025) et réintégration dans l'emploi précédent ou un emploi similaire.</li>
</ul>

<h3>Modèle – Accusé de réception d'une demande de congé parental</h3>
<blockquote>
<p><strong>ALTÉA SERVICES</strong> – Service des ressources humaines – Créteil, le [date]</p>
<p>Objet : votre demande de congé parental d'éducation</p>
<p>Madame [NOM],</p>
<p>Nous accusons réception de votre courrier du [date], reçu le [date], par lequel vous nous informez de votre souhait de bénéficier d'un congé parental d'éducation à temps plein du [date] au [date] inclus, à l'issue de votre congé de maternité.</p>
<p>Vous remplissez la condition d'ancienneté d'un an prévue par l'article L1225-47 du Code du travail. Votre contrat de travail sera suspendu pendant cette période. Vous pourrez demander sa prolongation ou sa transformation en temps partiel en nous informant au moins un mois avant le terme initialement prévu, par lettre recommandée ou remise en main propre contre décharge.</p>
<p>À votre retour, vous retrouverez votre précédent emploi ou un emploi similaire assorti d'une rémunération au moins équivalente, et un entretien de parcours professionnel vous sera proposé.</p>
<p>Nous vous prions d'agréer, Madame, l'expression de nos salutations distinguées.</p>
<p>Nathalie ROUSSEL, responsable des ressources humaines</p>
</blockquote>
`,
      },
      {
        title: "3.7 – Les absences pour maladie, accident du travail et maladie professionnelle",
        content: `
<h3>L'arrêt de travail pour maladie non professionnelle</h3>
<h4>Obligations du salarié et de l'employeur</h4>
<ol>
<li><strong>Le salarié</strong> prévient son employeur dès que possible (délai souvent fixé par la convention collective ou le règlement intérieur) et lui adresse le volet 3 de l'avis d'arrêt de travail dans les <strong>48 heures</strong> ; les volets 1 et 2 sont transmis à la CPAM dans le même délai (R321-2 du Code de la sécurité sociale), le plus souvent directement par le médecin en télétransmission. Depuis le 1er juillet 2025, les arrêts papier doivent être établis sur le formulaire sécurisé CERFA.</li>
<li><strong>L'employeur</strong> transmet les données nécessaires au calcul des indemnités journalières de sécurité sociale (IJSS) par un <strong>signalement d'arrêt de travail en DSN</strong>, dans les 5 jours suivant la connaissance de l'arrêt. Ce signalement remplace l'attestation de salaire papier. En cas de subrogation, il le précise dans le signalement.</li>
<li>À la reprise, la <strong>DSN mensuelle</strong> intègre la date de reprise ; un signalement de reprise anticipée est effectué si nécessaire.</li>
</ol>
<h4>Les indemnités journalières de sécurité sociale (IJSS)</h4>
<ul>
<li><strong>Délai de carence</strong> : 3 jours (R323-1 du Code de la sécurité sociale), sauf exceptions (affection de longue durée pour les arrêts successifs liés à la même affection dans un délai de 3 ans, etc.).</li>
<li><strong>Montant</strong> : 50 % du salaire journalier de base, calculé sur les salaires des 3 mois précédant l'arrêt (divisés par 91,25). Depuis le 1er avril 2025, le salaire pris en compte est plafonné à 1,4 fois le SMIC mensuel (décret n° 2025-160 du 20 février 2025).</li>
<li><strong>Conditions d'ouverture</strong> : avoir travaillé au moins 150 heures au cours des 3 mois précédents ou cotisé sur au moins 1 015 fois le SMIC horaire au cours des 6 mois précédents pour un arrêt de moins de 6 mois (R313-3 du Code de la sécurité sociale).</li>
</ul>

<h4>Le maintien de salaire par l'employeur (indemnité complémentaire)</h4>
<p>L'article L1226-1 du Code du travail impose à l'employeur de compléter les IJSS lorsque le salarié justifie d'<strong>un an d'ancienneté</strong>, a transmis son certificat médical dans les 48 heures, est pris en charge par la sécurité sociale et est soigné en France ou dans l'Union européenne. Le régime légal (D1226-1 à D1226-8) prévoit :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Ancienneté</th><th>Durée d'indemnisation à 90 % de la rémunération brute</th><th>Puis à 66,66 %</th></tr>
<tr><td>1 à 5 ans</td><td>30 jours</td><td>30 jours</td></tr>
<tr><td>6 à 10 ans</td><td>40 jours</td><td>40 jours</td></tr>
<tr><td>11 à 15 ans</td><td>50 jours</td><td>50 jours</td></tr>
<tr><td>16 à 20 ans</td><td>60 jours</td><td>60 jours</td></tr>
<tr><td>21 à 25 ans</td><td>70 jours</td><td>70 jours</td></tr>
<tr><td>26 à 30 ans</td><td>80 jours</td><td>80 jours</td></tr>
<tr><td>31 ans et plus</td><td>90 jours</td><td>90 jours</td></tr>
</table>
<p>En cas de maladie non professionnelle, l'indemnité complémentaire légale est versée à compter du <strong>8e jour d'absence</strong> (délai de carence de 7 jours, D1226-3). Les durées s'apprécient sur 12 mois : les arrêts successifs se cumulent. Les montants versés tiennent compte des IJSS (et des prestations de prévoyance financées par l'employeur), de sorte que le salarié ne perçoit jamais plus que ce qu'il aurait gagné en travaillant. <strong>Les conventions collectives prévoient souvent un régime plus favorable</strong> (carence réduite, ancienneté requise moindre) : c'est le régime conventionnel de la CCN propreté et du contrat de prévoyance d'ALTÉA SERVICES qui s'applique s'il est plus favorable.</p>

<h3>La subrogation</h3>
<p>Lorsque l'employeur maintient tout ou partie du salaire, il peut être <strong>subrogé</strong> dans les droits du salarié : la CPAM lui verse directement les IJSS, et le salarié perçoit son salaire (maintenu) sur son bulletin habituel. La subrogation est obligatoire lorsque l'employeur maintient intégralement le salaire et qu'il le prévoit (R323-11 du Code de la sécurité sociale) ; elle est souvent prévue par la convention collective. Sur le bulletin, on retrouve la retenue pour absence, l'indemnité complémentaire et, en cas de subrogation, la déduction des IJSS brutes ou nettes selon la méthode retenue. L'assistant RH vérifie la <strong>réception effective des IJSS</strong> (relevé de la CPAM ou de net-entreprises) et relance en cas de retard.</p>

<h3>L'accident du travail et la maladie professionnelle</h3>
<h4>Définitions</h4>
<ul>
<li><strong>Accident du travail</strong> : accident survenu, quelle qu'en soit la cause, par le fait ou à l'occasion du travail (L411-1 du Code de la sécurité sociale). Une présomption d'imputabilité s'applique aux accidents survenus au temps et au lieu du travail.</li>
<li><strong>Accident de trajet</strong> : accident survenu pendant le trajet aller-retour entre la résidence et le lieu de travail, ou entre le lieu de travail et le lieu de restauration habituel (L411-2).</li>
<li><strong>Maladie professionnelle</strong> : maladie figurant dans un tableau de maladies professionnelles et contractée dans les conditions de ce tableau, ou reconnue par le comité régional de reconnaissance des maladies professionnelles (L461-1). Dans la propreté, les troubles musculo-squelettiques (tableau 57) et les affections liées aux produits d'entretien sont des risques majeurs.</li>
</ul>
<h4>Procédure de déclaration d'un accident du travail – pas à pas</h4>
<ol>
<li><strong>Information par la victime</strong> : dans la journée ou au plus tard dans les 24 heures, sauf force majeure (R441-2 du Code de la sécurité sociale).</li>
<li><strong>Recueil des faits</strong> par l'employeur (en pratique le RH ou le manager) : date, heure, lieu, circonstances détaillées, nature et siège des lésions, témoins, première personne avisée. Inscription au registre des accidents bénins si l'entreprise y est autorisée et que l'accident n'entraîne ni arrêt ni soins médicaux.</li>
<li><strong>Déclaration à la CPAM dans les 48 heures</strong>, non compris les dimanches et jours fériés (L441-2 et R441-3 du Code de la sécurité sociale), de préférence en ligne sur net-entreprises.fr (DAT). Le non-respect de ce délai expose l'employeur à une sanction et au remboursement des prestations.</li>
<li><strong>Remise à la victime de la feuille d'accident</strong> (formulaire S6201), qui lui permet de bénéficier de la gratuité des soins liés à l'accident (L441-5).</li>
<li><strong>Réserves motivées</strong> éventuelles de l'employeur sur le caractère professionnel de l'accident, dans le délai de 10 jours francs à compter de la déclaration (R441-6). Des réserves non motivées (simple doute) sont sans effet.</li>
<li><strong>Signalement d'arrêt de travail en DSN</strong> (ancienne attestation de salaire AT), avec le motif « accident du travail ».</li>
<li><strong>Mise à jour du document unique</strong> et analyse de l'accident (méthode de l'arbre des causes) avec le CSE ; information de la commission santé, sécurité et conditions de travail si elle existe.</li>
</ol>
<h4>Indemnisation et protection</h4>
<ul>
<li><strong>IJSS AT/MP</strong> : versées dès le lendemain de l'accident, sans carence (le jour de l'accident est payé intégralement par l'employeur) ; 60 % du salaire journalier de référence pendant les 28 premiers jours, 80 % à partir du 29e jour, dans la limite de plafonds réglementaires (R433-1 et suivants).</li>
<li><strong>Maintien de salaire légal</strong> : sans délai de carence (D1226-3) et dès le premier jour.</li>
<li><strong>Protection contre la rupture</strong> : pendant la suspension du contrat, l'employeur ne peut rompre le contrat que pour faute grave ou impossibilité de maintenir le contrat pour un motif étranger à l'accident ou à la maladie (L1226-9).</li>
<li><strong>Visite de reprise</strong> obligatoire après une absence d'au moins 30 jours pour AT (voir section 3.8).</li>
</ul>

<h3>Mise en pratique – ALTÉA SERVICES</h3>
<p>Le mardi 9 février 2027 à 7 h 20, Fatoumata KONÉ, agente de service, glisse dans un escalier mouillé sur le site d'un client et se blesse au poignet. Son chef d'équipe vous prévient à 9 h 00. Le médecin lui prescrit un arrêt jusqu'au 23 février. Elle a 4 ans d'ancienneté.</p>
<ul>
<li><strong>Déclaration</strong> : au plus tard le jeudi 11 février 2027 (48 heures, hors dimanches et jours fériés). Faites-la dès le 9 février pour éviter tout risque.</li>
<li><strong>Pièces</strong> : témoignage écrit du chef d'équipe et de l'éventuel témoin, photos des lieux si possible, horaires de la vacation.</li>
<li><strong>Paie du 9 février</strong> : journée intégralement payée par l'employeur.</li>
<li><strong>IJSS</strong> : à partir du 10 février, sans carence ; maintien de salaire légal dès le premier jour d'arrêt indemnisé (4 ans d'ancienneté : 30 jours à 90 %), sous réserve du régime conventionnel plus favorable.</li>
<li><strong>Congés payés</strong> : la période d'arrêt ouvre droit à 2,5 jours ouvrables par mois.</li>
<li><strong>Prévention</strong> : information du CSE, analyse de l'accident, mise à jour du DUERP (risque de chute de plain-pied, signalisation des sols mouillés), rappel de consignes au client et aux équipes.</li>
</ul>
`,
      },
      {
        title: "3.8 – Le suivi médical des salariés : visites et rendez-vous",
        content: `
<h3>Le cadre</h3>
<p>Tout salarié bénéficie d'un suivi individuel de son état de santé par le service de prévention et de santé au travail (SPST) auquel l'employeur adhère (L4624-1). L'assistant RH est souvent chargé d'organiser les visites, d'en suivre les échéances et de conserver les attestations et avis. <strong>Il n'a jamais accès au dossier médical</strong> et ne doit jamais demander au salarié la nature de sa pathologie : seuls l'attestation de suivi ou l'avis d'aptitude ou d'inaptitude, avec les éventuelles propositions d'aménagement de poste, sont transmis à l'employeur.</p>

<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Visite</th><th>Quand ?</th><th>Qui la déclenche ?</th><th>Référence</th></tr>
<tr><td>Visite d'information et de prévention (VIP)</td><td>Dans les 3 mois suivant la prise effective du poste ; avant l'affectation pour les travailleurs de nuit et les moins de 18 ans. Renouvellement selon une périodicité fixée par le médecin du travail, au plus 5 ans (3 ans pour les travailleurs handicapés, de nuit, titulaires d'une pension d'invalidité)</td><td>Employeur (demande au SPST lors de l'embauche, souvent concomitante à la DPAE)</td><td>R4624-10 à R4624-21</td></tr>
<tr><td>Examen médical d'aptitude (suivi individuel renforcé, SIR)</td><td>Avant l'affectation pour les postes à risques (amiante, plomb, agents cancérogènes, risque de chute de hauteur lors du montage et démontage d'échafaudages, habilitation électrique, etc.) ; renouvellement au plus tous les 4 ans, avec une visite intermédiaire au plus tard 2 ans après</td><td>Employeur</td><td>R4624-22 à R4624-28</td></tr>
<tr><td>Visite de pré-reprise</td><td>Pendant un arrêt de plus de 30 jours, pour préparer le retour</td><td>Le salarié, le médecin traitant, le médecin-conseil, le médecin du travail</td><td>R4624-29</td></tr>
<tr><td>Rendez-vous de liaison</td><td>Pendant un arrêt d'au moins 30 jours, pour informer le salarié des actions de prévention de la désinsertion professionnelle ; facultatif pour le salarié</td><td>Employeur ou salarié</td><td>L1226-1-3, D1226-8-1</td></tr>
<tr><td>Visite de reprise</td><td>Après un congé de maternité, une absence pour maladie professionnelle, une absence d'au moins 30 jours pour accident du travail, une absence d'au moins 60 jours pour maladie ou accident non professionnel. Organisée dans les 8 jours qui suivent la reprise</td><td>Employeur (dès qu'il connaît la date de fin d'arrêt)</td><td>R4624-31</td></tr>
<tr><td>Visite de mi-carrière</td><td>À une échéance fixée par accord de branche ou, à défaut, durant l'année civile du 45e anniversaire</td><td>SPST / employeur</td><td>L4624-2-2</td></tr>
<tr><td>Visite à la demande</td><td>À tout moment, à la demande du salarié, de l'employeur ou du médecin du travail</td><td>Salarié, employeur, médecin</td><td>R4624-34</td></tr>
<tr><td>Visite post-exposition ou de fin de carrière</td><td>Avant le départ pour les salariés ayant bénéficié d'un SIR ou exposés à certains risques</td><td>Employeur</td><td>L4624-2-1</td></tr>
</table>

<h3>Construire l'échéancier des visites</h3>
<p>Un échéancier fiable est un outil de planification typique du CP1. Dans Lucca ou dans un tableur, prévoyez par salarié : date d'embauche, type de suivi (VIP, VIP adaptée, SIR), date de la dernière visite, périodicité fixée par le médecin (lue sur l'attestation), date de la prochaine visite calculée (=DATE(ANNEE(D2)+E2;MOIS(D2);JOUR(D2)) sous Excel), statut (à demander, demandée, réalisée), alerte à 60 jours de l'échéance. Ajoutez une liste des retours d'arrêts déclenchant une visite de reprise, alimentée chaque mois par l'export des absences.</p>
<blockquote><strong>Attention à la confidentialité :</strong> l'échéancier contient des données de santé indirectes (statut de travailleur handicapé, existence d'un arrêt long). Il est réservé au service RH, stocké dans un espace à accès restreint, et ne mentionne jamais de diagnostic. Ce traitement figure au registre des traitements RGPD de l'entreprise.</blockquote>

<h3>L'avis d'inaptitude en bref</h3>
<p>Si le médecin du travail déclare le salarié inapte, l'employeur doit rechercher un reclassement en tenant compte de ses conclusions, après avis du CSE (L1226-2 et L1226-10 en cas d'origine professionnelle), sauf si l'avis mentionne expressément que tout maintien du salarié dans un emploi serait gravement préjudiciable à sa santé ou que son état de santé fait obstacle à tout reclassement. Si le salarié n'est ni reclassé ni licencié dans le délai d'un mois suivant l'avis, l'employeur doit reprendre le versement du salaire (L1226-4 et L1226-11). Ce délai d'un mois est une échéance critique que l'assistant RH doit suivre.</p>
`,
      },
      {
        title: "3.9 – Règlement intérieur, notes de service, procédures RH écrites et document unique",
        content: `
<h3>Le règlement intérieur</h3>
<p>Le règlement intérieur est <strong>obligatoire dans les entreprises et établissements d'au moins 50 salariés</strong>, l'obligation s'appliquant au terme d'un délai de 12 mois consécutifs à compter de la date à laquelle le seuil a été atteint (L1311-2). Il est rédigé en français (L1321-6).</p>
<h4>Contenu obligatoire et contenu interdit</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Contenu obligatoire (L1321-1, L1321-2)</th><th>Contenu interdit (L1321-3)</th></tr>
<tr><td>
<ul>
<li>Mesures d'application de la réglementation en matière de santé et de sécurité</li>
<li>Conditions dans lesquelles les salariés peuvent être appelés à participer au rétablissement de conditions de travail protectrices de la santé et de la sécurité</li>
<li>Règles générales et permanentes relatives à la discipline, nature et échelle des sanctions</li>
<li>Dispositions relatives aux droits de la défense des salariés</li>
<li>Dispositions relatives aux harcèlements moral et sexuel et aux agissements sexistes</li>
<li>Existence du dispositif de protection des lanceurs d'alerte</li>
</ul>
</td><td>
<ul>
<li>Dispositions contraires aux lois, règlements et conventions collectives</li>
<li>Restrictions aux droits des personnes et aux libertés individuelles et collectives non justifiées par la nature de la tâche à accomplir ni proportionnées au but recherché</li>
<li>Discriminations (origine, sexe, mœurs, orientation sexuelle, âge, situation de famille, opinions, activités syndicales, convictions religieuses, apparence physique, nom, état de santé, handicap, etc.)</li>
</ul>
</td></tr>
</table>
<p>Une clause de neutralité (restriction de la manifestation des convictions des salariés) peut figurer au règlement si elle est justifiée par l'exercice d'autres libertés et droits fondamentaux ou par les nécessités du bon fonctionnement de l'entreprise, et proportionnée au but recherché (L1321-2-1).</p>

<h4>Procédure d'adoption et de modification – pas à pas</h4>
<ol>
<li>Rédaction du projet (RH, direction, éventuellement avocat).</li>
<li><strong>Consultation du CSE</strong> (et de sa commission santé, sécurité et conditions de travail pour les questions qui relèvent de sa compétence) : avis obligatoire (L1321-4).</li>
<li><strong>Communication à l'inspection du travail</strong> en deux exemplaires, accompagnée de l'avis du CSE (R1321-4).</li>
<li><strong>Dépôt au greffe du conseil de prud'hommes</strong> du ressort de l'entreprise (R1321-2).</li>
<li><strong>Publicité</strong> : affichage à une place convenable et aisément accessible dans les lieux de travail et les locaux d'embauche, ou communication par tout moyen (R1321-1).</li>
<li><strong>Entrée en vigueur</strong> : date fixée, au moins un mois après l'accomplissement des formalités de dépôt et de publicité (L1321-4).</li>
</ol>
<p>Les <strong>notes de service</strong> qui portent prescriptions générales et permanentes dans les matières relevant du règlement intérieur (une note sur l'alcool au travail ou sur l'usage des équipements de protection, par exemple) sont soumises à la même procédure (L1321-5). En cas d'urgence pour la sécurité, elles peuvent recevoir application immédiate, mais doivent être communiquées simultanément au secrétaire du CSE et à l'inspection du travail.</p>

<h3>Les procédures RH écrites</h3>
<p>Le référentiel demande à l'assistant RH de « participer à la définition et à la mise à jour des documents et procédures internes » et d'« appliquer les procédures en matière d'administration du personnel ». Une procédure écrite efficace répond à six questions : <strong>qui</strong> fait <strong>quoi</strong>, <strong>quand</strong>, <strong>avec quel outil</strong>, <strong>selon quelle règle</strong>, et <strong>quelle trace</strong> est conservée.</p>
<h4>Modèle de fiche procédure</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th colspan="2">ALTÉA SERVICES – Procédure RH n° PR-07 – Gestion d'un arrêt de travail pour maladie – Version 2 du [date]</th></tr>
<tr><td>Objet</td><td>Garantir la prise en compte de l'arrêt dans les délais, la bonne indemnisation du salarié et l'organisation du remplacement</td></tr>
<tr><td>Champ d'application</td><td>Tous les salariés, quels que soient le contrat et le site</td></tr>
<tr><td>Références</td><td>L1226-1 et D1226-1 et suivants du Code du travail ; R321-2 et R323-1 du Code de la sécurité sociale ; CCN IDCC 3043 ; contrat de prévoyance</td></tr>
<tr><td>Étape 1 – Jour J</td><td>Le salarié prévient son chef d'équipe ; le chef d'équipe saisit l'absence « maladie – justificatif attendu » dans Lucca et organise le remplacement</td></tr>
<tr><td>Étape 2 – J+2</td><td>Réception du volet 3 par l'assistant RH ; numérisation au dossier du salarié ; mise à jour du motif dans Lucca</td></tr>
<tr><td>Étape 3 – J+5 au plus tard</td><td>Signalement d'arrêt de travail en DSN par le gestionnaire de paie (cabinet), avec indication de la subrogation</td></tr>
<tr><td>Étape 4 – Paie du mois</td><td>Transmission des dates d'absence ; contrôle du maintien de salaire et de la subrogation</td></tr>
<tr><td>Étape 5 – Arrêt de plus de 30 jours</td><td>Proposition du rendez-vous de liaison ; information sur la visite de pré-reprise</td></tr>
<tr><td>Étape 6 – Reprise</td><td>Visite de reprise si absence d'au moins 60 jours ; information sur les congés payés reportés dans le mois suivant la reprise</td></tr>
<tr><td>Traces</td><td>Volet 3, accusé de réception DSN, courrier d'information congés, attestation de visite</td></tr>
<tr><td>Responsable de la procédure</td><td>Nathalie ROUSSEL, responsable RH</td></tr>
</table>

<h3>Le document unique d'évaluation des risques professionnels (DUERP)</h3>
<ul>
<li><strong>Obligation</strong> : l'employeur transcrit et met à jour dans un document unique les résultats de l'évaluation des risques, dès le premier salarié (R4121-1, L4121-3-1).</li>
<li><strong>Mise à jour</strong> : au moins chaque année dans les entreprises d'au moins 11 salariés, et lors de toute décision d'aménagement important modifiant les conditions de santé, de sécurité ou de travail, ou lorsqu'une information supplémentaire sur un risque est portée à la connaissance de l'employeur (R4121-2).</li>
<li><strong>Programme annuel de prévention</strong> (PAPRIPACT) dans les entreprises d'au moins 50 salariés, présenté au CSE (L4121-3-1).</li>
<li><strong>Conservation</strong> : les versions successives sont conservées par l'employeur pendant au moins 40 ans et tenues à la disposition des travailleurs, anciens travailleurs et de toute personne justifiant d'un intérêt (L4121-3-1). La loi du 2 août 2021 prévoit un dépôt dématérialisé sur un portail numérique, selon un calendrier fixé par décret (à vérifier).</li>
<li><strong>Consultation du CSE</strong> sur le document unique et ses mises à jour.</li>
</ul>
<p>L'assistant RH contribue au DUERP en fournissant les données d'accidents du travail, d'absentéisme et de maladies professionnelles, et en organisant la diffusion des consignes de sécurité.</p>

<h3>Les affichages et informations obligatoires</h3>
<p>L'employeur doit porter à la connaissance des salariés, par tout moyen (affichage ou intranet selon les cas), un ensemble d'informations : coordonnées de l'inspection du travail, du médecin du travail et des services de secours, horaires collectifs et durée du repos, ordre des départs en congés, intitulé de la convention collective applicable et modalités de consultation, textes relatifs à l'égalité de rémunération entre femmes et hommes, à la lutte contre le harcèlement moral et sexuel et les discriminations, consignes incendie, résultats de l'index de l'égalité professionnelle (entreprises d'au moins 50 salariés), interdiction de fumer et de vapoter, référent harcèlement sexuel. Un <strong>tableau de contrôle annuel des affichages</strong> par site fait partie des outils de l'assistant RH.</p>
`,
      },
      {
        title: "3.10 – Répondre aux questions du personnel sur ses droits et obligations",
        content: `
<h3>Une mission de premier niveau</h3>
<p>Le référentiel attend de l'assistant RH qu'il « réponde aux questions du personnel concernant leurs droits et obligations », en « communiquant de façon ouverte, positive et constructive », en « recherchant une information juridique dans une source de référence » et en « respectant les règles de confidentialité ». C'est souvent la partie la plus visible du poste : un salarié qui reçoit une réponse rapide, juste et compréhensible gagne confiance dans le service RH ; une réponse fausse peut engager l'employeur.</p>

<h3>La méthode en six étapes</h3>
<ol>
<li><strong>Écouter et reformuler</strong> la question (« Si je comprends bien, vous souhaitez savoir si vous pouvez poser vos congés en février alors que vous étiez en arrêt en décembre ? »).</li>
<li><strong>Identifier la situation exacte</strong> du salarié : contrat, ancienneté, temps de travail, statut, accords applicables, historique dans le SIRH.</li>
<li><strong>Rechercher la règle dans les sources de référence</strong>, de la plus spécifique à la plus générale : contrat de travail, accords d'entreprise, règlement intérieur, convention collective, Code du travail, jurisprudence ; avec des sources fiables (Légifrance, service-public.fr, travail-emploi.gouv.fr, urssaf.fr, ameli.fr, code.travail.gouv.fr pour les simulateurs). Évitez les forums.</li>
<li><strong>Vérifier sa délégation</strong> : l'assistant RH peut donner une information générale et une réponse factuelle sur un compteur ; il ne prend pas de décision (accord d'un congé, refus d'une demande, interprétation discutable) et n'engage pas l'entreprise sur un point litigieux sans validation de la responsable RH.</li>
<li><strong>Répondre clairement et par écrit</strong> lorsque la question a un enjeu (droits, délais, montants) : réponse courte, source citée, prochaine étape, interlocuteur.</li>
<li><strong>Tracer</strong> : enregistrer la demande et la réponse (outil de ticket, onglet « échanges » du dossier dans Lucca, ou registre des demandes), classer la réponse type pour réutilisation.</li>
</ol>

<h3>Les limites de la délégation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Ce que l'assistant RH peut faire</th><th>Ce qu'il transmet à la responsable RH</th></tr>
<tr><td>Expliquer un compteur de congés ou d'heures, une ligne de bulletin, une règle générale du Code ou de la CCN, une procédure interne ; remettre un formulaire ; donner une date ; orienter vers le bon interlocuteur (CPAM, SPST, organisme de prévoyance)</td><td>Toute question disciplinaire, tout litige ou réclamation sur la rémunération, toute demande susceptible de créer un précédent, toute situation de harcèlement ou de discrimination (procédure spécifique), toute question sur la rupture du contrat, toute demande émanant d'un avocat ou de l'inspection du travail</td></tr>
</table>
<blockquote><strong>Confidentialité :</strong> on ne répond jamais sur la situation d'un autre salarié (salaire, absence, sanction), même à un collègue ou un manager qui n'a pas à en connaître. On vérifie l'identité de l'interlocuteur avant de communiquer une donnée personnelle par téléphone. On n'envoie pas de bulletin de paie ou de données de santé par messagerie non sécurisée.</blockquote>

<h3>Modèles de réponses écrites</h3>
<h4>Modèle 1 – Congés payés acquis pendant un arrêt maladie</h4>
<blockquote>
<p>Bonjour Monsieur DA SILVA,</p>
<p>Vous nous avez interrogés le 12 janvier sur vos droits à congés payés après votre arrêt de travail pour maladie du 3 novembre au 31 décembre 2026.</p>
<p>Depuis la loi du 22 avril 2024, un arrêt pour maladie non professionnelle ouvre droit à 2 jours ouvrables de congés payés par mois, dans la limite de 24 jours par période de référence (article L3141-5-1 du Code du travail). Votre compteur Lucca a été mis à jour en conséquence : vous disposez à ce jour de 21 jours ouvrables à prendre. Les congés que vous n'avez pas pu prendre en raison de votre arrêt peuvent être reportés pendant 15 mois à compter de la présente information, soit jusqu'au 12 avril 2028.</p>
<p>Pour poser vos dates, il vous suffit de faire la demande dans Lucca ; votre chef d'équipe la validera en tenant compte de l'organisation du site.</p>
<p>Je reste à votre disposition pour toute précision.</p>
<p>[Prénom NOM], assistant(e) ressources humaines – ALTÉA SERVICES</p>
</blockquote>
<h4>Modèle 2 – Demande de jours pour mariage</h4>
<blockquote>
<p>Bonjour Madame LEROUX,</p>
<p>Félicitations pour votre prochain mariage. Vous bénéficiez d'un congé pour événement familial de 4 jours au titre de l'article L3142-4 du Code du travail (sous réserve d'une durée plus favorable prévue par notre convention collective, que nous vérifions). Ce congé est rémunéré et n'est pas décompté de vos congés payés. Merci de saisir votre demande dans Lucca sous le motif « Événement familial – mariage » et de nous transmettre une copie de l'acte de mariage ou du livret de famille à votre retour.</p>
<p>[Signature]</p>
</blockquote>
<h4>Modèle 3 – Question hors délégation</h4>
<blockquote>
<p>Bonjour Monsieur PETIT,</p>
<p>Nous avons bien reçu votre question concernant le paiement d'heures supplémentaires que vous estimez avoir effectuées en septembre et octobre. J'ai transmis votre demande à Nathalie ROUSSEL, responsable des ressources humaines, qui vérifie les relevés d'heures avec votre responsable de site et reviendra vers vous au plus tard le [date]. N'hésitez pas à nous transmettre tout élément utile (planning, échanges avec votre chef d'équipe).</p>
<p>[Signature]</p>
</blockquote>

<h3>Assurer la veille juridique et sociale</h3>
<p>Pour répondre juste, il faut être à jour. Organisez une veille simple : abonnement aux lettres d'information de service-public.fr (rubrique entreprises), du ministère du Travail et de l'URSSAF, alertes Légifrance sur la CCN IDCC 3043 (avenants, arrêtés d'extension), suivi des publications de l'éditeur de paie et du SIRH. Tenez un <strong>tableau de veille</strong> (date, source, texte, résumé en trois lignes, impact pour ALTÉA SERVICES, action, responsable) et partagez une synthèse mensuelle avec l'équipe RH. Cette veille alimente la compétence transversale « actualiser ses connaissances en GRH » évaluée par le jury.</p>
`,
      },
      {
        title: "3.11 – Quiz du chapitre",
        content: `
<h3>Questions</h3>
<p><strong>1. À défaut d'accord collectif, quelle est la majoration des heures supplémentaires de la 36e à la 43e heure ?</strong></p>
<ul><li>a) 10 %</li><li>b) 25 %</li><li>c) 50 %</li><li>d) 100 %</li></ul>
<p><strong>2. Quel est le repos quotidien minimal ?</strong></p>
<ul><li>a) 9 heures</li><li>b) 10 heures</li><li>c) 11 heures consécutives</li><li>d) 12 heures</li></ul>
<p><strong>3. Depuis la loi du 22 avril 2024, combien de jours de congés payés un salarié acquiert-il par mois d'arrêt pour maladie non professionnelle ?</strong></p>
<ul><li>a) Aucun</li><li>b) 2 jours ouvrables, dans la limite de 24 jours par période</li><li>c) 2,5 jours ouvrables sans limite</li><li>d) 1 jour ouvrable</li></ul>
<p><strong>4. Un salarié prend 4 jours du congé principal en dehors de la période du 1er mai au 31 octobre. À défaut d'accord, combien de jours de fractionnement obtient-il ?</strong></p>
<ul><li>a) 0</li><li>b) 1</li><li>c) 2</li><li>d) 3</li></ul>
<p><strong>5. Dans quel délai l'employeur doit-il déclarer un accident du travail à la CPAM ?</strong></p>
<ul><li>a) 24 heures</li><li>b) 48 heures, non compris les dimanches et jours fériés</li><li>c) 5 jours</li><li>d) 15 jours</li></ul>
<p><strong>6. Quelle ancienneté minimale le Code du travail exige-t-il pour bénéficier du maintien de salaire légal en cas de maladie ?</strong></p>
<ul><li>a) Aucune</li><li>b) 3 mois</li><li>c) 6 mois</li><li>d) 1 an</li></ul>
<p><strong>7. Après un arrêt pour maladie non professionnelle, à partir de quelle durée d'absence la visite de reprise est-elle obligatoire ?</strong></p>
<ul><li>a) 8 jours</li><li>b) 30 jours</li><li>c) 60 jours</li><li>d) 90 jours</li></ul>
<p><strong>8. Le règlement intérieur est obligatoire à partir de :</strong></p>
<ul><li>a) 11 salariés</li><li>b) 20 salariés</li><li>c) 50 salariés pendant 12 mois consécutifs</li><li>d) 300 salariés</li></ul>
<p><strong>9. Quelle est la durée du congé de paternité et d'accueil de l'enfant pour une naissance simple ?</strong></p>
<ul><li>a) 11 jours calendaires</li><li>b) 14 jours ouvrables</li><li>c) 25 jours calendaires, en plus des 3 jours de naissance</li><li>d) 28 jours calendaires, congé de naissance compris</li></ul>
<p><strong>10. Un salarié vous demande combien gagne sa collègue qui occupe le même poste. Que faites-vous ?</strong></p>
<ul><li>a) Vous lui communiquez le salaire puisqu'ils occupent le même poste</li><li>b) Vous refusez de communiquer une donnée personnelle d'un autre salarié et l'orientez, s'il s'interroge sur l'égalité de rémunération, vers la responsable RH</li><li>c) Vous lui envoyez la grille de la convention collective et le bulletin de sa collègue</li><li>d) Vous lui conseillez de demander directement à sa collègue</li></ul>

<h3>Corrigé expliqué</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>b</td><td>Taux supplétif de 25 % pour les 8 premières heures supplémentaires, 50 % au-delà (L3121-36). Un accord peut fixer un taux d'au moins 10 %.</td></tr>
<tr><td>2</td><td>c</td><td>11 heures consécutives (L3131-1), auxquelles s'ajoutent 24 heures pour le repos hebdomadaire.</td></tr>
<tr><td>3</td><td>b</td><td>L3141-5-1 : 2 jours ouvrables par mois, plafonnés à 24 jours ouvrables. Pour un AT/MP, c'est 2,5 jours sans limite de durée.</td></tr>
<tr><td>4</td><td>b</td><td>Entre 3 et 5 jours pris hors période : 1 jour ; 6 jours et plus : 2 jours (L3141-23).</td></tr>
<tr><td>5</td><td>b</td><td>48 heures non compris les dimanches et jours fériés (R441-3 du Code de la sécurité sociale). Le délai de 24 heures est celui dont dispose le salarié pour informer l'employeur.</td></tr>
<tr><td>6</td><td>d</td><td>Un an d'ancienneté (L1226-1). Les conventions collectives sont souvent plus favorables.</td></tr>
<tr><td>7</td><td>c</td><td>60 jours pour la maladie non professionnelle ; 30 jours pour un AT ; toujours après une maladie professionnelle ou un congé de maternité (R4624-31).</td></tr>
<tr><td>8</td><td>c</td><td>L1311-2 : au moins 50 salariés, au terme d'un délai de 12 mois consécutifs.</td></tr>
<tr><td>9</td><td>c</td><td>25 jours calendaires (32 en cas de naissances multiples), dont 4 jours obligatoires après le congé de naissance de 3 jours (L1225-35).</td></tr>
<tr><td>10</td><td>b</td><td>Le salaire d'un collègue est une donnée personnelle confidentielle. La transparence salariale (directive (UE) 2023/970) donne au salarié le droit d'obtenir des informations sur les niveaux de rémunération moyens ventilés par sexe pour les travailleurs accomplissant le même travail, pas le salaire nominatif d'un collègue ; la demande est orientée vers la responsable RH.</td></tr>
</table>
`,
      },
      {
        title: "3.12 – Cas pratique corrigé : un mois de gestion des temps et des absences chez ALTÉA SERVICES",
        content: `
<h3>Énoncé</h3>
<p>Vous êtes l'apprenti(e) assistant(e) RH d'ALTÉA SERVICES. Nous sommes le lundi 1er mars 2027. Nathalie ROUSSEL vous confie le traitement des situations suivantes avant la clôture des variables de paie de mars.</p>
<ol>
<li><strong>Heures supplémentaires</strong> : Thomas GAUTIER, chef d'équipe à temps plein (35 heures, taux horaire brut 15,20 €), a travaillé 46 heures la semaine du 8 mars pour un chantier de remise en état. Aucun accord d'entreprise ne fixe de taux de majoration. Son cumul d'heures supplémentaires payées depuis le 1er janvier atteint 205 heures. Calculez le montant brut des heures supplémentaires et indiquez ce que vous devez surveiller.</li>
<li><strong>Temps partiel</strong> : Samira BOUZID, agente de service à 24 heures par semaine, a effectué 27 heures la semaine du 15 mars. Aucun accord de branche étendu applicable n'est pris en compte pour l'exercice. Analysez.</li>
<li><strong>Congés payés</strong> : Lucas MOREL a été en arrêt pour maladie non professionnelle du 1er septembre au 30 novembre 2026 (3 mois), puis a repris le 1er décembre. Il demande pourquoi son compteur n'affiche que 26 jours ouvrables acquis pour la période du 1er juin 2026 au 31 mai 2027 alors que la période n'est pas terminée, et combien il aura à la fin de la période s'il ne s'absente plus.</li>
<li><strong>Accident du travail</strong> : le jeudi 11 mars 2027 à 18 h 30, Aïcha TRAORÉ, agente de service, se coupe la main avec un éclat de verre en vidant une corbeille. Son chef d'équipe vous informe le vendredi 12 mars à 8 h 30. Arrêt de travail jusqu'au 28 mars. Elle a 18 mois d'ancienneté. Listez les démarches et les échéances.</li>
<li><strong>Question d'un salarié</strong> : Paul NGUYEN, agent à temps plein, vous demande s'il a droit à des jours de congé pour le décès de son beau-père. Rédigez la réponse.</li>
<li><strong>Outil</strong> : proposez la structure d'un tableau de bord mensuel « temps et absences » destiné à la responsable RH.</li>
</ol>

<h3>Corrigé détaillé</h3>
<h4>1. Heures supplémentaires de Thomas GAUTIER</h4>
<ul>
<li>Heures supplémentaires de la semaine : 46 – 35 = 11 heures.</li>
<li>8 heures à 25 % : 8 × 15,20 € × 1,25 = 152,00 €.</li>
<li>3 heures à 50 % : 3 × 15,20 € × 1,50 = 68,40 €.</li>
<li><strong>Total brut : 220,40 €</strong>.</li>
<li>Durées maximales : 46 heures sur une semaine ne dépasse pas 48 heures, mais il faut vérifier la moyenne sur 12 semaines (44 heures) et la durée quotidienne (10 heures au plus).</li>
<li><strong>Contingent</strong> : 205 + 11 = 216 heures. Le contingent supplétif de 220 heures (ou le contingent conventionnel s'il est différent) est presque atteint. Au-delà, chaque heure supplémentaire ouvrira droit à une contrepartie obligatoire en repos de 100 % (entreprise de plus de 20 salariés) et l'information du CSE devra être assurée. Action : alerte écrite au responsable d'exploitation et à la responsable RH, proposition de répartir la charge sur d'autres chefs d'équipe ou de compenser une partie des heures en repos de remplacement si un accord le permet.</li>
</ul>
<h4>2. Heures complémentaires de Samira BOUZID</h4>
<ul>
<li>Heures complémentaires : 27 – 24 = 3 heures.</li>
<li>Limite supplétive : dixième de la durée contractuelle, soit 2 h 24 (2,4 heures). Les 3 heures dépassent cette limite de 36 minutes : <strong>non-conformité</strong> à signaler, sauf si un accord de branche étendu (CCN propreté) autorise un volume supérieur, ce qu'il faut vérifier.</li>
<li>Majoration (dans la limite du dixième) : 10 % sur chaque heure complémentaire.</li>
<li>Vérifier aussi l'absence de requalification : si l'horaire dépasse de 2 heures au moins par semaine l'horaire contractuel pendant 12 semaines consécutives ou 12 semaines sur 15, l'horaire contractuel doit être modifié sauf opposition de la salariée (L3123-13). Le tableau de suivi doit compter ces semaines.</li>
<li>Si le besoin est durable : proposer un avenant de complément d'heures ou une augmentation de la durée contractuelle.</li>
</ul>
<h4>3. Congés payés de Lucas MOREL</h4>
<ul>
<li>Période de référence du 1er juin 2026 au 31 mai 2027.</li>
<li>Du 1er juin au 31 août 2026 : 3 mois de travail × 2,5 = 7,5 jours.</li>
<li>Du 1er septembre au 30 novembre 2026 (maladie non professionnelle) : 3 mois × 2 = 6 jours (plafond de 24 jours non atteint).</li>
<li>Du 1er décembre 2026 au 28 février 2027 : 3 mois × 2,5 = 7,5 jours.</li>
<li>Au 28 février 2027 : 7,5 + 6 + 7,5 = <strong>21 jours</strong> (et non 26). Le compteur affiché semble erroné : vérifiez le paramétrage de Lucca (le motif d'absence a peut-être été traité comme du travail effectif, ce qui donnerait 9 × 2,5 = 22,5, arrondis à 23 ; ou une reprise de solde antérieur a été ajoutée). Il faut identifier l'origine de l'écart avant de répondre.</li>
<li>Fin de période (31 mai 2027) s'il ne s'absente plus : 21 + 3 × 2,5 = 28,5 jours, arrondis à <strong>29 jours ouvrables</strong> (L3141-7).</li>
<li>Rappel : l'information prévue par L3141-19-3 devait lui être donnée dans le mois suivant sa reprise du 1er décembre 2026 ; vérifiez qu'elle a été faite (mention sur le bulletin de décembre ou courrier). À défaut, régularisez sans attendre.</li>
</ul>
<h4>4. Accident du travail d'Aïcha TRAORÉ</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Démarche</th><th>Échéance</th></tr>
<tr><td>Recueillir les circonstances (déclaration de la victime, témoignage du chef d'équipe, lieu, heure, nature de la lésion)</td><td>Vendredi 12 mars, dès l'information</td></tr>
<tr><td>Déclarer l'accident sur net-entreprises</td><td>Délai de 48 heures non compris dimanches et jours fériés à compter de la connaissance de l'accident (12 mars 8 h 30) : le samedi compte, le dimanche est exclu : au plus tard le lundi 15 mars à 8 h 30 ; à faire dès le 12 mars</td></tr>
<tr><td>Remettre la feuille d'accident à la salariée (envoi postal ou remise)</td><td>Le 12 mars</td></tr>
<tr><td>Signalement d'arrêt de travail en DSN, motif AT</td><td>Dans les 5 jours</td></tr>
<tr><td>Payer intégralement la journée du 11 mars</td><td>Paie de mars</td></tr>
<tr><td>Maintien de salaire légal sans carence (18 mois d'ancienneté : 30 jours à 90 %, puis 30 jours à 66,66 %), sous réserve du régime conventionnel ; subrogation si prévue</td><td>Paie de mars</td></tr>
<tr><td>Arrêt de 17 jours : pas de visite de reprise obligatoire (seuil de 30 jours pour un AT), mais visite possible à la demande</td><td>–</td></tr>
<tr><td>Information du CSE, analyse de l'accident, mise à jour du DUERP (risque de coupure : sacs et corbeilles contenant du verre, gants anti-coupure, consigne au client)</td><td>Prochaine réunion du CSE</td></tr>
</table>
<h4>5. Réponse à Paul NGUYEN</h4>
<blockquote>
<p>Bonjour Monsieur NGUYEN,</p>
<p>Je vous présente nos sincères condoléances. Le Code du travail prévoit un congé de 3 jours pour le décès du père ou de la mère du conjoint (beau-père, belle-mère), sans perte de rémunération (article L3142-4). Notre convention collective peut prévoir une durée plus favorable : je le vérifie et vous confirme le nombre de jours dans la journée. Ces jours sont à prendre au moment de l'événement ; il vous suffit de les déclarer dans Lucca sous le motif « Événement familial – décès » et de nous transmettre un justificatif (acte de décès) à votre retour.</p>
<p>[Signature]</p>
</blockquote>
<p>Note : le beau-père s'entend du père du conjoint ; pour le conjoint de la mère du salarié, la qualification dépend de la jurisprudence et de la convention collective : en cas de doute, valider avec la responsable RH.</p>
<h4>6. Tableau de bord mensuel « temps et absences »</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Calcul</th><th>Usage</th></tr>
<tr><td>Taux d'absentéisme global et par motif</td><td>Heures d'absence (maladie, AT/MP, absences injustifiées) / heures théoriques × 100</td><td>Suivi mensuel, comparaison n-1</td></tr>
<tr><td>Nombre d'AT avec arrêt et jours perdus</td><td>Comptage DAT et jours d'arrêt AT du mois</td><td>Prévention, CSE</td></tr>
<tr><td>Heures supplémentaires et complémentaires</td><td>Total, par site, par taux</td><td>Pilotage de la charge et des coûts</td></tr>
<tr><td>Salariés à plus de 80 % du contingent</td><td>Liste issue du tableur</td><td>Alerte</td></tr>
<tr><td>Anomalies de temps détectées et résolues</td><td>Nombre, délai moyen de résolution</td><td>Qualité des données</td></tr>
<tr><td>Visites médicales à échéance dans les 60 jours</td><td>Liste</td><td>Planification</td></tr>
<tr><td>Solde moyen de congés payés et salariés avec reliquat important</td><td>Moyenne des compteurs ; liste des soldes supérieurs à 20 jours</td><td>Anticiper la prise des congés</td></tr>
</table>
<p>Ce tableau de bord prépare directement la compétence CP3 (indicateurs RH) et constitue une bonne preuve à insérer dans le dossier professionnel.</p>
`,
      },
    ],
  },
  {
    title: "Chapitre 4 – CP1 (3/3) : instances représentatives du personnel et fin du contrat de travail",
    description: "Ce chapitre termine la compétence professionnelle n° 1 du titre RNCP41366. Il traite d'abord du dialogue social, que le référentiel vise expressément (« préparer les élections professionnelles et constituer les dossiers de consultation des instances représentatives du personnel ») : seuils et attributions du comité social et économique (CSE), réunions, ordre du jour, procès-verbaux et heures de délégation, organisation complète des élections professionnelles (information, protocole d'accord préélectoral, listes, vote électronique, procès-verbaux CERFA, rétroplanning), informations-consultations récurrentes et base de données économiques, sociales et environnementales (BDESE), délégués syndicaux. Il aborde ensuite toutes les formes de rupture du contrat de travail – démission, licenciement pour motif personnel et économique, rupture conventionnelle homologuée sur TéléRC, fin de CDD, rupture de la période d'essai, départ et mise à la retraite, présomption de démission en cas d'abandon de poste – avant de consacrer une section entière à l'évaluation chiffrée des indemnités de fin de contrat, savoir-faire nommément cité par le référentiel. Il se conclut par les documents de fin de contrat, la sortie du registre unique du personnel et l'archivage, toujours appliqués à ALTÉA SERVICES (148 salariés, CSE en place).",
    sections: [
      {
        title: "4.1 – Le comité social et économique : seuils, composition et attributions",
        content: `
<h3>La mise en place du CSE</h3>
<p>Le comité social et économique (CSE) est mis en place dans les entreprises d'au moins <strong>11 salariés</strong>, dès lors que cet effectif est atteint pendant <strong>12 mois consécutifs</strong> (L2311-2). Il a remplacé, depuis les ordonnances de septembre 2017 et au plus tard le 1er janvier 2020, les délégués du personnel, le comité d'entreprise et le CHSCT. L'effectif se calcule selon les règles des articles L1111-2 et L1111-3 : les salariés en CDI à temps plein comptent pour une unité, les CDD et les salariés mis à disposition au prorata de leur temps de présence sur les 12 derniers mois (sauf s'ils remplacent un salarié absent), les temps partiels au prorata de leur durée de travail ; les apprentis et les titulaires de contrats de professionnalisation ne sont pas pris en compte.</p>
<p>Le CSE est composé de l'<strong>employeur</strong>, qui le préside (il peut être assisté de trois collaborateurs avec voix consultative), et d'une <strong>délégation du personnel</strong> élue (titulaires et suppléants en nombre égal). Dans les entreprises d'au moins 50 salariés, chaque organisation syndicale représentative peut désigner un <strong>représentant syndical au CSE</strong> (L2314-2). Le CSE désigne parmi ses membres titulaires un <strong>secrétaire</strong> et un <strong>trésorier</strong> (L2315-23), ainsi qu'un <strong>référent en matière de lutte contre le harcèlement sexuel et les agissements sexistes</strong> (L2314-1).</p>

<h3>Nombre d'élus et heures de délégation</h3>
<p>Le nombre de membres et le crédit d'heures sont fixés par l'article R2314-1, en fonction de l'effectif. Extrait :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Effectif</th><th>Titulaires</th><th>Heures de délégation mensuelles par titulaire</th><th>Total mensuel</th></tr>
<tr><td>11 à 24</td><td>1</td><td>10</td><td>10</td></tr>
<tr><td>25 à 49</td><td>2</td><td>10</td><td>20</td></tr>
<tr><td>50 à 74</td><td>4</td><td>18</td><td>72</td></tr>
<tr><td>75 à 99</td><td>5</td><td>19</td><td>95</td></tr>
<tr><td>100 à 124</td><td>6</td><td>21</td><td>126</td></tr>
<tr><td>125 à 149</td><td>7</td><td>21</td><td>147</td></tr>
<tr><td>150 à 174</td><td>8</td><td>21</td><td>168</td></tr>
<tr><td>175 à 199</td><td>9</td><td>21</td><td>189</td></tr>
</table>
<p>Avec 148 salariés, ALTÉA SERVICES compte donc 7 titulaires et 7 suppléants, disposant chacun (pour les titulaires) de 21 heures par mois. Le protocole d'accord préélectoral peut modifier le nombre de sièges et le volume des heures, sans réduire le volume global (L2314-7). Les heures de délégation peuvent être <strong>reportées</strong> d'un mois sur l'autre dans la limite de 12 mois, et <strong>mutualisées</strong> entre titulaires et avec les suppléants, sans qu'un élu puisse disposer, dans le mois, de plus d'une fois et demie le crédit d'heures d'un titulaire (R2315-5 et R2315-6). L'élu informe l'employeur au plus tard 8 jours avant la date prévue de l'utilisation des heures reportées ou mutualisées. Les heures de délégation sont <strong>de plein droit considérées comme du temps de travail et payées à l'échéance normale</strong> (L2315-10) : l'employeur qui en conteste l'usage saisit le juge après paiement. Le temps passé en réunion à l'initiative de l'employeur n'est pas imputé sur le crédit d'heures (L2315-11).</p>
<p><strong>Rôle de l'assistant RH :</strong> tenir un tableau des bons de délégation (date, élu, heures, report ou mutualisation, solde) et transmettre les heures en paie avec un code dédié, sans jamais demander à l'élu le contenu de son activité.</p>

<h3>Les attributions selon l'effectif</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Entreprises de 11 à 49 salariés (L2312-5 et suivants)</th><th>Entreprises d'au moins 50 salariés (L2312-8 et suivants) – en plus</th></tr>
<tr><td>
<ul>
<li>Présenter à l'employeur les réclamations individuelles ou collectives relatives aux salaires, à l'application du Code du travail, des conventions et accords</li>
<li>Contribuer à promouvoir la santé, la sécurité et l'amélioration des conditions de travail ; réaliser des enquêtes en matière d'accidents du travail</li>
<li>Saisir l'inspection du travail de toute plainte ou observation</li>
<li>Droit d'alerte en cas d'atteinte aux droits des personnes et de danger grave et imminent</li>
</ul>
</td><td>
<ul>
<li>Assurer une expression collective des salariés permettant la prise en compte permanente de leurs intérêts dans les décisions relatives à la gestion et à l'évolution économique et financière de l'entreprise, à l'organisation du travail, à la formation professionnelle et aux techniques de production, notamment au regard des conséquences environnementales de ces décisions</li>
<li>Informations-consultations récurrentes et ponctuelles</li>
<li>Personnalité civile, gestion de son patrimoine</li>
<li>Budget de fonctionnement (0,20 % de la masse salariale brute de 50 à 1 999 salariés, 0,22 % à partir de 2 000, L2315-61) et contribution aux activités sociales et culturelles</li>
<li>Recours à des experts, droit d'alerte économique et sociale</li>
<li>Commission santé, sécurité et conditions de travail obligatoire à partir de 300 salariés (L2315-36)</li>
</ul>
</td></tr>
</table>

<h3>Les consultations ponctuelles à connaître</h3>
<p>En plus des trois consultations récurrentes (section 4.3), le CSE d'une entreprise d'au moins 50 salariés est consulté notamment sur : les mesures de nature à affecter le volume ou la structure des effectifs, la modification de l'organisation économique ou juridique, les conditions d'emploi et de travail (durée du travail, formation), l'introduction de nouvelles technologies, tout aménagement important modifiant les conditions de santé, de sécurité ou de travail, les mesures prises en vue de faciliter la mise, la remise ou le maintien au travail des accidentés du travail et des travailleurs handicapés (L2312-8), le règlement intérieur (L1321-4), les licenciements pour motif économique, le reclassement d'un salarié déclaré inapte, l'aménagement du temps de travail par décision unilatérale, la journée de solidarité, la période de prise des congés payés.</p>
<p><strong>Délais de consultation</strong> (à défaut d'accord, R2312-6) : le CSE est réputé avoir rendu un avis négatif à l'expiration d'un délai d'un mois, porté à deux mois en cas d'intervention d'un expert et à trois mois en cas d'intervention d'une ou plusieurs expertises au niveau du CSE central et des CSE d'établissement. Le délai court à compter de la communication des informations prévues ou de leur mise à disposition dans la BDESE.</p>
`,
      },
      {
        title: "4.2 – Les réunions du CSE : convocation, ordre du jour et procès-verbal",
        content: `
<h3>La périodicité des réunions</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Effectif</th><th>Règle supplétive</th><th>Référence</th></tr>
<tr><td>11 à 49 salariés</td><td>Les membres de la délégation du personnel sont reçus collectivement par l'employeur au moins une fois par mois, et en cas d'urgence sur leur demande ; ils remettent une note écrite exposant l'objet de leurs demandes 2 jours ouvrables avant la date de la réunion ; l'employeur y répond par écrit au plus tard dans les 6 jours ouvrables suivant la réunion, et les demandes et réponses sont transcrites sur un registre spécial</td><td>L2315-21, L2315-22</td></tr>
<tr><td>50 à 299 salariés</td><td>Au moins une réunion tous les deux mois</td><td>L2315-28</td></tr>
<tr><td>300 salariés et plus</td><td>Au moins une réunion par mois</td><td>L2315-28</td></tr>
<tr><td>Toutes entreprises d'au moins 50 salariés</td><td>Au moins quatre réunions par an portant en tout ou partie sur les attributions en santé, sécurité et conditions de travail ; réunion extraordinaire à la suite de tout accident ayant entraîné ou pu entraîner des conséquences graves, ou à la demande motivée de deux membres sur ces sujets</td><td>L2315-27</td></tr>
</table>
<p>Un accord d'entreprise peut fixer le nombre de réunions annuelles, qui ne peut être inférieur à six (L2312-19). ALTÉA SERVICES (148 salariés), sans accord, doit donc réunir son CSE au moins six fois par an, dont quatre réunions au moins traitant de santé, sécurité et conditions de travail.</p>

<h3>L'ordre du jour</h3>
<ul>
<li><strong>Établissement</strong> : conjointement par le président et le secrétaire ; les consultations rendues obligatoires par la loi, un accord ou une convention collective y sont inscrites de plein droit par l'un ou l'autre (L2315-29).</li>
<li><strong>Communication</strong> : aux membres, ainsi qu'à l'agent de contrôle de l'inspection du travail et à l'agent des services de prévention de la sécurité sociale pour les points relevant de la santé et sécurité, <strong>au moins 3 jours avant la réunion</strong> (L2315-30). Ce délai est un minimum : la jurisprudence exige que les élus aient le temps d'étudier les documents.</li>
<li><strong>Participants</strong> : le président, les titulaires, les représentants syndicaux au CSE ; les suppléants n'assistent aux réunions qu'en l'absence du titulaire (L2314-1), sauf accord plus favorable. Le médecin du travail, le responsable interne de la sécurité et, le cas échéant, l'inspection du travail et la CARSAT sont invités aux réunions portant sur la santé et la sécurité.</li>
</ul>

<h3>Le vote et le procès-verbal</h3>
<p>Les résolutions sont prises à la majorité des membres présents ; le président ne participe pas au vote lorsqu'il consulte les membres élus en tant que délégation du personnel (L2315-32). Les délibérations sont consignées dans un <strong>procès-verbal</strong> établi par le secrétaire dans un délai et selon des modalités définis par accord ou, à défaut, par décret (L2315-34) : à défaut d'accord, le procès-verbal est établi et transmis à l'employeur dans un délai de 15 jours suivant la réunion (D2315-26), ou plus court dans certaines procédures de licenciement économique. Le procès-verbal contient au minimum le résumé des délibérations et la décision motivée de l'employeur sur les propositions faites lors de la précédente réunion. L'enregistrement ou la sténographie des séances est possible dans les conditions de l'article D2315-27.</p>

<h3>Le travail préparatoire de l'assistant RH</h3>
<ol>
<li>Tenir le <strong>calendrier annuel des réunions</strong> (dates fixées en début d'année, réunions SSCT identifiées) et des consultations récurrentes.</li>
<li>Préparer avec la responsable RH le <strong>projet d'ordre du jour</strong> et le transmettre au secrétaire pour arrêt conjoint.</li>
<li>Rassembler les documents de chaque point (notes d'information, données sociales, projets de documents), les déposer dans la BDESE et/ou les joindre à la convocation.</li>
<li>Envoyer la <strong>convocation</strong> (courriel avec accusé de lecture ou plateforme) au moins 3 jours avant, en conservant la preuve de l'envoi.</li>
<li>Réserver la salle ou le lien de visioconférence (la visioconférence est limitée à trois réunions par année civile à défaut d'accord, L2315-4).</li>
<li>Après la réunion, <strong>suivre le procès-verbal</strong> : réception, archivage, affichage ou diffusion selon les règles internes, suivi des engagements pris par la direction (tableau d'actions).</li>
</ol>

<h3>Modèle – Ordre du jour d'une réunion ordinaire du CSE d'ALTÉA SERVICES</h3>
<blockquote>
<p><strong>ALTÉA SERVICES – Comité social et économique</strong></p>
<p>Réunion ordinaire du jeudi 18 mars 2027 à 9 h 30 – Salle Bréguet, siège de Créteil (et lien Teams pour les élus en déplacement)</p>
<p>Ordre du jour arrêté conjointement par Monsieur [NOM], président, et Madame Céline VASSEUR, secrétaire :</p>
<ol>
<li>Approbation du procès-verbal de la réunion du 21 janvier 2027.</li>
<li>Information du CSE sur l'évolution des effectifs et de l'emploi (tableau au 28 février 2027).</li>
<li>Santé, sécurité et conditions de travail : analyse des accidents du travail du 1er trimestre ; présentation de la mise à jour du document unique d'évaluation des risques professionnels.</li>
<li>Consultation sur le projet de modification du règlement intérieur (ajout d'une clause sur l'usage des équipements de protection individuelle) – recueil de l'avis.</li>
<li>Information sur le calendrier de la consultation récurrente sur la politique sociale, les conditions de travail et l'emploi.</li>
<li>Activités sociales et culturelles : point du trésorier.</li>
<li>Questions diverses.</li>
</ol>
<p>Documents joints ou disponibles dans la BDESE : PV du 21/01/2027 ; tableau des effectifs ; projet de règlement intérieur annoté ; synthèse AT ; DUERP version 2027.</p>
</blockquote>
`,
      },
      {
        title: "4.3 – Les élections professionnelles : procédure, protocole et rétroplanning",
        content: `
<h3>Les grands principes</h3>
<ul>
<li><strong>Initiative</strong> : l'employeur organise les élections lorsque le seuil de 11 salariés est atteint pendant 12 mois consécutifs, puis à l'échéance des mandats. Il doit les organiser dans le mois suivant la demande d'un salarié ou d'une organisation syndicale si l'entreprise remplit les conditions (L2314-8).</li>
<li><strong>Durée des mandats</strong> : 4 ans ; un accord de branche, de groupe ou d'entreprise peut fixer une durée comprise entre 2 et 4 ans (L2314-33, L2314-34). Le nombre de mandats successifs est limité à trois dans les entreprises de 50 salariés et plus, sauf disposition contraire du protocole préélectoral dans les entreprises de 50 à 300 salariés.</li>
<li><strong>Information du personnel</strong> : l'employeur informe le personnel, par tout moyen permettant de conférer date certaine, de l'organisation des élections ; le document précise la date envisagée pour le premier tour, qui doit se tenir <strong>au plus tard le 90e jour suivant la diffusion</strong> (L2314-4).</li>
<li><strong>Invitation des syndicats</strong> : les organisations syndicales intéressées sont invitées à négocier le protocole d'accord préélectoral et à établir les listes de candidats ; l'invitation doit leur parvenir <strong>au plus tard 15 jours avant la date de la première réunion de négociation</strong>. En cas de renouvellement, l'invitation est faite <strong>deux mois avant l'expiration du mandat</strong> des délégués en exercice (L2314-5). Les syndicats représentatifs dans l'entreprise ou au niveau national et interprofessionnel, ceux ayant constitué une section syndicale, et ceux affiliés à une organisation représentative nationale sont invités par courrier ; les autres par voie d'affichage ou tout moyen.</li>
<li><strong>Carence</strong> : si aucun syndicat ne se manifeste dans le mois de l'information (et dans les entreprises de 11 à 20 salariés, si aucun salarié ne s'est porté candidat dans les 30 jours), l'employeur peut fixer seul les modalités. Si aucun candidat ne se présente aux deux tours, l'employeur établit un <strong>procès-verbal de carence</strong>, qu'il porte à la connaissance des salariés et transmet dans les 15 jours.</li>
</ul>

<h3>Le protocole d'accord préélectoral (PAP)</h3>
<p>Le PAP fixe notamment : la répartition des sièges et du personnel entre les collèges, le nombre et la composition des collèges si l'on déroge aux règles légales, les modalités d'organisation et de déroulement des opérations électorales (dates, horaires, lieux de vote, vote par correspondance ou électronique), la proportion de femmes et d'hommes dans chaque collège, les modalités de dépôt des candidatures. Sa validité est subordonnée à sa signature par la <strong>majorité des organisations syndicales ayant participé à sa négociation</strong>, dont les organisations représentatives ayant recueilli la majorité des suffrages exprimés lors des dernières élections (ou, à défaut, la majorité des organisations représentatives ayant participé) (L2314-6). Certaines clauses exigent l'unanimité (modification du nombre et de la composition des collèges, L2314-12). À défaut d'accord sur la répartition entre collèges, l'autorité administrative (DREETS) décide.</p>

<h3>Collèges, électeurs, éligibles, listes</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Point</th><th>Règle</th><th>Référence</th></tr>
<tr><td>Collèges</td><td>Un collège « ouvriers et employés » et un collège « ingénieurs, chefs de service, techniciens, agents de maîtrise et assimilés » ; un troisième collège « cadres » lorsque le nombre des ingénieurs, chefs de service et cadres administratifs, commerciaux ou techniques assimilés est au moins égal à 25 au moment de la constitution ou du renouvellement. Un collège unique dans les entreprises qui élisent un seul titulaire et un seul suppléant</td><td>L2314-11</td></tr>
<tr><td>Électeurs</td><td>Salariés des deux sexes, âgés de 16 ans révolus, travaillant depuis 3 mois au moins dans l'entreprise, n'ayant fait l'objet d'aucune interdiction, déchéance ou incapacité relative à leurs droits civiques</td><td>L2314-18</td></tr>
<tr><td>Éligibles</td><td>Électeurs âgés de 18 ans révolus, travaillant dans l'entreprise depuis un an au moins, à l'exception des conjoints, partenaires de PACS, concubins, ascendants, descendants, frères, sœurs et alliés au même degré de l'employeur, et des salariés qui disposent d'une délégation écrite particulière d'autorité leur permettant d'être assimilés au chef d'entreprise ou qui le représentent devant le CSE</td><td>L2314-19</td></tr>
<tr><td>Représentation équilibrée</td><td>Pour chaque collège, les listes comportant plusieurs candidats sont composées d'un nombre de femmes et d'hommes correspondant à la part de chaque sexe dans la liste électorale, et alternativement d'un candidat de chaque sexe jusqu'à épuisement des candidats d'un des sexes</td><td>L2314-30</td></tr>
<tr><td>Premier tour</td><td>Seules les organisations syndicales peuvent présenter des listes (monopole syndical)</td><td>L2314-29</td></tr>
<tr><td>Second tour</td><td>Organisé dans un délai de 15 jours si le nombre de votants (bulletins blancs et nuls compris) est inférieur à la moitié des électeurs inscrits, ou si aucune liste n'a été déposée ou s'il reste des sièges à pourvoir ; candidatures libres</td><td>L2314-29</td></tr>
<tr><td>Mode de scrutin</td><td>Scrutin de liste à deux tours avec représentation proportionnelle à la plus forte moyenne ; titulaires et suppléants sont élus par des votes distincts</td><td>L2314-29</td></tr>
</table>

<h3>Le vote électronique</h3>
<p>Le vote électronique peut être prévu par un accord d'entreprise ou de groupe ; à défaut d'accord, l'employeur peut le décider unilatéralement (L2314-26). Le système retenu doit garantir la confidentialité des données transmises, la sécurité de l'adressage des moyens d'authentification, de l'émargement, de l'enregistrement et du dépouillement des votes (R2314-5 et suivants). Il fait l'objet d'une <strong>expertise indépendante</strong> préalable, d'un cahier des charges, d'une cellule d'assistance technique, et les fichiers d'émargement et de résultats sont séparés. Une information détaillée est remise à chaque salarié. La CNIL recommande en outre un niveau de sécurité adapté (délibération de 2019 sur le vote par Internet). Le vote électronique facilite le vote des salariés multi-sites, comme les agents de propreté répartis chez les clients d'ALTÉA SERVICES.</p>

<h3>Proclamation, procès-verbaux et contentieux</h3>
<ul>
<li>Le bureau de vote proclame les résultats et établit les procès-verbaux sur les formulaires CERFA officiels : <strong>n° 15724</strong> pour les titulaires, <strong>n° 15725</strong> pour les suppléants, <strong>n° 15726</strong> pour la carence (vérifiez la version en vigueur sur elections-professionnelles.travail.gouv.fr).</li>
<li>L'employeur transmet les procès-verbaux dans les <strong>15 jours</strong> au prestataire agissant pour le compte du ministère du Travail, le centre de traitement des élections professionnelles (CTEP), de préférence en ligne, et en adresse une copie aux organisations syndicales ayant présenté des listes ou ayant participé à la négociation du PAP (R2314-22).</li>
<li>Les résultats servent à mesurer l'audience des syndicats (représentativité) : d'où l'importance d'un PV exact (nombre d'inscrits, de votants, de suffrages valablement exprimés par liste et par collège).</li>
<li><strong>Contestations</strong> devant le tribunal judiciaire : dans les 3 jours suivant la publication de la liste électorale pour l'électorat ; dans les 15 jours suivant l'élection pour la régularité de l'élection ou la désignation des représentants (R2314-24).</li>
</ul>

<h3>Rétroplanning complet – renouvellement du CSE d'ALTÉA SERVICES</h3>
<p>Hypothèse : les mandats en cours expirent le <strong>31 mai 2027</strong>. On vise un premier tour le mardi 4 mai 2027 et, si nécessaire, un second tour le mardi 18 mai 2027 (le jeudi 6 mai 2027 est le jeudi de l'Ascension), en vote électronique.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Date (au plus tard)</th><th>Étape</th><th>Référence et preuve à conserver</th></tr>
<tr><td>Janvier 2027</td><td>Choix du prestataire de vote électronique, décision ou accord sur le vote électronique, expertise indépendante</td><td>L2314-26, R2314-5 ; contrat, rapport d'expertise</td></tr>
<tr><td>Vendredi 26 février 2027</td><td>Information du personnel de l'organisation des élections (affichage sur tous les sites, courriel, Lucca) avec la date envisagée du premier tour (4 mai, soit moins de 90 jours après)</td><td>L2314-4 ; capture d'écran datée, photos des affichages</td></tr>
<tr><td>Vendredi 26 février 2027</td><td>Invitation des organisations syndicales à négocier le PAP (courriers recommandés aux syndicats représentatifs, affichage pour les autres) – au moins deux mois avant l'expiration des mandats, et 15 jours au moins avant la première réunion</td><td>L2314-5 ; AR des courriers</td></tr>
<tr><td>Vendredi 19 mars 2027</td><td>Première réunion de négociation du PAP</td><td>Feuille de présence, projet de PAP</td></tr>
<tr><td>Vendredi 2 avril 2027</td><td>Signature du PAP ; à défaut, saisine de la DREETS pour la répartition des sièges et du personnel entre les collèges</td><td>L2314-6, L2314-13 ; PAP signé</td></tr>
<tr><td>Mardi 6 avril 2027</td><td>Affichage et publication de la liste électorale par collège (nom, prénom, date d'entrée, âge si nécessaire) ; ouverture de la période de contestation (3 jours)</td><td>R2314-24 ; liste affichée datée</td></tr>
<tr><td>Vendredi 16 avril 2027</td><td>Date limite de dépôt des listes de candidats du premier tour (fixée par le PAP) ; contrôle de la représentation équilibrée</td><td>L2314-29, L2314-30 ; accusés de dépôt</td></tr>
<tr><td>Lundi 19 avril 2027</td><td>Affichage des listes de candidats ; envoi des codes de vote et de la notice d'information aux électeurs ; scellement du système</td><td>R2314-9 et suivants</td></tr>
<tr><td>Mardi 4 mai 2027</td><td>Premier tour : vote, dépouillement, calcul du quorum, attribution des sièges, PV</td><td>CERFA 15724 et 15725</td></tr>
<tr><td>Mardi 4 mai 2027</td><td>Si quorum non atteint ou sièges non pourvus : annonce du second tour et appel à candidatures libres</td><td>L2314-29</td></tr>
<tr><td>Mardi 18 mai 2027</td><td>Second tour (dans les 15 jours) ; PV</td><td>CERFA 15724 et 15725</td></tr>
<tr><td>Dans les 15 jours suivant chaque tour</td><td>Transmission des PV au CTEP et copie aux syndicats ; affichage des résultats</td><td>R2314-22 ; accusé de réception CTEP</td></tr>
<tr><td>Dans les 15 jours suivant l'élection</td><td>Délai de contestation de la régularité de l'élection</td><td>R2314-24</td></tr>
<tr><td>Juin 2027</td><td>Première réunion du nouveau CSE : désignation du secrétaire, du trésorier, du référent harcèlement ; adoption du règlement intérieur du CSE ; mise à jour des protections (salariés protégés) dans le SIRH ; formation des élus (santé, sécurité et conditions de travail : 5 jours pour un premier mandat, L2315-18)</td><td>PV de réunion</td></tr>
</table>
<blockquote><strong>Point de vigilance : les salariés protégés.</strong> Les candidats aux élections, dès l'envoi de leur candidature, les salariés ayant demandé l'organisation des élections et les élus bénéficient d'une protection contre le licenciement : toute rupture nécessite l'autorisation de l'inspection du travail (L2411-1 et suivants). L'assistant RH tient à jour la liste des salariés protégés et les dates de fin de protection (6 mois pour les candidats, 6 mois après la fin du mandat pour les anciens élus).</blockquote>
`,
      },
      {
        title: "4.4 – Les dossiers de consultation, la BDESE et les délégués syndicaux",
        content: `
<h3>Les trois consultations récurrentes</h3>
<p>Dans les entreprises d'au moins 50 salariés, le CSE est consulté chaque année, à défaut d'accord fixant une autre périodicité (dans la limite de trois ans), sur (L2312-17) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Consultation</th><th>Contenu</th><th>Documents à constituer</th></tr>
<tr><td>Orientations stratégiques de l'entreprise</td><td>Orientations définies par l'organe chargé de l'administration et leurs conséquences sur l'activité, l'emploi, l'évolution des métiers et des compétences, l'organisation du travail, le recours à la sous-traitance, à l'intérim, aux contrats temporaires et aux stages, ainsi que sur la gestion prévisionnelle des emplois et des compétences et les orientations de la formation professionnelle, et leurs conséquences environnementales (L2312-24)</td><td>Note de la direction sur la stratégie à 3 ans, données GPEC, plan de développement des compétences envisagé</td></tr>
<tr><td>Situation économique et financière</td><td>Comptes, affectation des résultats, politique de recherche et de développement technologique, utilisation du crédit d'impôt, conséquences environnementales (L2312-25)</td><td>Comptes annuels, rapport de gestion, données de la BDESE</td></tr>
<tr><td>Politique sociale, conditions de travail et emploi</td><td>Évolution de l'emploi, qualifications, programme pluriannuel de formation, actions de prévention et de formation, apprentissage, conditions d'accueil en stage, conditions de travail, congés et aménagement du temps de travail, durée du travail, égalité professionnelle entre femmes et hommes, modalités d'exercice du droit d'expression des salariés (L2312-26)</td><td>Bilan social (300 salariés et plus), données d'effectifs, de formation, d'absentéisme, d'accidents, d'égalité professionnelle (index), rapport annuel et programme de prévention en santé-sécurité (PAPRIPACT)</td></tr>
</table>
<p>C'est sur cette troisième consultation que l'assistant RH est le plus mobilisé : il extrait les données du SIRH et de la paie, les met en forme et les contrôle, et prépare les tableaux qui alimentent également les indicateurs du CP3.</p>

<h3>La BDESE</h3>
<p>La <strong>base de données économiques, sociales et environnementales</strong> est obligatoire dans les entreprises d'au moins 50 salariés (L2312-18). Elle rassemble l'ensemble des informations nécessaires aux consultations et informations récurrentes. Elle est accessible en permanence aux membres du CSE, aux représentants syndicaux et aux délégués syndicaux, sous format papier ou, le plus souvent, numérique. Les informations portent sur l'année en cours, les deux années précédentes et, sous forme de grandes tendances, les trois années suivantes. Les membres sont tenus à une obligation de discrétion sur les informations présentées comme confidentielles par l'employeur (L2312-36).</p>
<p>À défaut d'accord, dans les entreprises de moins de 300 salariés comme ALTÉA SERVICES, la BDESE comporte les rubriques suivantes (R2312-8) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Exemples d'informations</th></tr>
<tr><td>1° Investissements : investissement social</td><td>Évolution des effectifs par type de contrat, par âge, par ancienneté ; évolution des emplois, notamment par catégorie professionnelle ; travailleurs handicapés ; évolution du nombre de stagiaires ; formation professionnelle (investissements, publics concernés) ; conditions de travail (durée du travail dont temps partiel, aménagement)</td></tr>
<tr><td>1° Investissements : investissement matériel et immatériel</td><td>Évolution des actifs nets d'amortissement et des dépenses de recherche et développement</td></tr>
<tr><td>1° bis Égalité professionnelle entre les femmes et les hommes</td><td>Diagnostic et analyse de la situation comparée (embauche, formation, promotion, qualification, classification, conditions de travail, sécurité et santé, rémunération effective, articulation vie professionnelle – vie personnelle) ; indicateurs de l'index de l'égalité professionnelle ; à terme, données issues de la transposition de la directive (UE) 2023/970 sur la transparence des rémunérations</td></tr>
<tr><td>2° Fonds propres, endettement et impôts</td><td>Capitaux propres, emprunts et dettes financières, impôts et taxes</td></tr>
<tr><td>3° Rémunération des salariés et dirigeants</td><td>Évolution des rémunérations salariales (frais de personnel, rémunération moyenne par catégorie), épargne salariale, rémunération des dirigeants</td></tr>
<tr><td>4° Activités sociales et culturelles</td><td>Montant de la contribution aux activités sociales et culturelles du CSE, mécénat</td></tr>
<tr><td>5° Rémunération des financeurs</td><td>Dividendes, rémunération des actionnaires</td></tr>
<tr><td>6° Flux financiers à destination de l'entreprise</td><td>Aides publiques reçues, réductions d'impôts, exonérations et réductions de cotisations sociales, crédits d'impôts, mécénat</td></tr>
<tr><td>7° Partenariats</td><td>Partenariats conclus pour produire des services ou des produits pour une autre entreprise, ou bénéficiant à l'entreprise</td></tr>
<tr><td>8° Transferts commerciaux et financiers entre les entités du groupe</td><td>Le cas échéant</td></tr>
<tr><td>9° Environnement (depuis la loi Climat et résilience du 22 août 2021)</td><td>Politique générale en matière environnementale, économie circulaire, changement climatique (pour les entreprises non soumises à la déclaration de performance extra-financière ou au rapport de durabilité CSRD : informations fixées par décret)</td></tr>
</table>
<p>Pour les entreprises soumises au rapport de durabilité issu de la directive CSRD (qui remplace progressivement la DPEF), dont le calendrier a été décalé par la directive « stop-the-clock » de 2025, les informations du rapport peuvent alimenter la rubrique environnementale. ALTÉA SERVICES, avec 148 salariés, n'est pas directement concernée par la CSRD au regard des seuils actuels.</p>

<h3>Mettre à jour la BDESE : méthode</h3>
<ol>
<li>Établir la <strong>matrice des indicateurs</strong> (rubrique, indicateur, source, périodicité, responsable, date de mise à jour).</li>
<li>Extraire les données (Lucca, Silae, comptabilité) et les contrôler (cohérence des effectifs entre sources, effectif au 31 décembre et effectif moyen).</li>
<li>Rédiger une courte <strong>note de lecture</strong> par rubrique (évolutions marquantes, explications).</li>
<li>Déposer les documents dans la BDESE et <strong>informer les élus</strong> de la mise à jour (ce qui fait courir le délai de consultation).</li>
<li>Conserver l'historique des versions.</li>
</ol>

<h3>Les délégués syndicaux en bref</h3>
<ul>
<li><strong>Désignation</strong> : dans les entreprises d'au moins 50 salariés (effectif atteint pendant 12 mois consécutifs), chaque syndicat représentatif qui constitue une section syndicale peut désigner un délégué syndical, choisi parmi les candidats ayant recueilli au moins 10 % des suffrages exprimés au premier tour des dernières élections du CSE (L2143-3).</li>
<li><strong>Rôle</strong> : représenter le syndicat auprès de l'employeur, formuler des revendications et <strong>négocier les accords collectifs</strong> (négociations obligatoires sur la rémunération, le temps de travail et le partage de la valeur ajoutée ; sur l'égalité professionnelle et la qualité de vie et des conditions de travail ; GEPP dans les entreprises d'au moins 300 salariés).</li>
<li><strong>Crédit d'heures</strong> : 12 heures par mois de 50 à 150 salariés, 18 heures de 151 à 499 salariés, 24 heures à partir de 500 salariés (L2143-13).</li>
<li><strong>Représentant de la section syndicale (RSS)</strong> : un syndicat non représentatif ayant constitué une section peut désigner un RSS (L2142-1-1), qui dispose de 4 heures par mois.</li>
<li><strong>Protection</strong> : le délégué syndical est un salarié protégé.</li>
</ul>
<p>Dans les entreprises dépourvues de délégué syndical, des modes alternatifs de négociation existent : ratification par référendum aux deux tiers dans les entreprises de moins de 11 salariés (ou de 11 à 20 sans élu), négociation avec des élus du CSE ou des salariés mandatés (L2232-21 à L2232-29).</p>
`,
      },
      {
        title: "4.5 – Démission et licenciement : procédures et délais",
        content: `
<h3>Panorama des modes de rupture du CDI</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Mode</th><th>Initiative</th><th>Formalisme principal</th><th>Préavis</th><th>Indemnité de rupture</th><th>Allocation chômage</th></tr>
<tr><td>Démission</td><td>Salarié</td><td>Volonté claire et non équivoque ; pas de forme imposée par la loi</td><td>Selon la convention collective ou les usages</td><td>Aucune</td><td>Non, sauf démission légitime ou projet de reconversion validé</td></tr>
<tr><td>Licenciement pour motif personnel</td><td>Employeur</td><td>Convocation, entretien préalable, notification motivée</td><td>Oui, sauf faute grave ou lourde</td><td>Indemnité légale ou conventionnelle (8 mois d'ancienneté), sauf faute grave ou lourde</td><td>Oui</td></tr>
<tr><td>Licenciement pour motif économique</td><td>Employeur</td><td>Procédure renforcée (CSE, reclassement, ordre des licenciements, administration)</td><td>Oui (sauf CSP)</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Rupture conventionnelle</td><td>Commune</td><td>Entretien(s), convention, rétractation, homologation</td><td>Non</td><td>Au moins l'indemnité légale (ou conventionnelle selon les cas)</td><td>Oui</td></tr>
<tr><td>Départ volontaire à la retraite</td><td>Salarié</td><td>Information de l'employeur</td><td>Oui</td><td>Indemnité de départ à la retraite</td><td>Non</td></tr>
<tr><td>Mise à la retraite</td><td>Employeur</td><td>Conditions d'âge</td><td>Oui</td><td>Au moins l'indemnité légale de licenciement</td><td>Non</td></tr>
<tr><td>Présomption de démission (abandon de poste)</td><td>Employeur constate</td><td>Mise en demeure, délai de 15 jours au moins</td><td>Préavis de démission</td><td>Aucune</td><td>Non</td></tr>
</table>

<h3>La démission</h3>
<p>La démission est un acte unilatéral par lequel le salarié manifeste sa volonté <strong>claire et non équivoque</strong> de rompre le contrat. Aucune forme n'est imposée par la loi, mais il est conseillé d'en obtenir un écrit (lettre remise contre décharge ou recommandée). Une démission donnée sous le coup de la colère, ou motivée par des manquements reprochés à l'employeur, peut être requalifiée (en prise d'acte, notamment). La durée du <strong>préavis</strong> est fixée par la loi pour certaines professions, par la convention collective, les usages ou le contrat (L1237-1) : il faut la lire dans la CCN propreté pour chaque catégorie (agents de service, agents de maîtrise, cadres). Si l'employeur dispense le salarié d'exécuter son préavis, il lui verse une <strong>indemnité compensatrice de préavis</strong> ; si c'est le salarié qui demande à ne pas l'effectuer et que l'employeur l'accepte, aucune indemnité n'est due.</p>
<h4>Modèle – Accusé de réception de démission</h4>
<blockquote>
<p>Madame [NOM], Créteil, le [date]</p>
<p>Nous accusons réception de votre lettre de démission datée du 3 mai 2027 et remise en main propre le même jour. Conformément à la convention collective applicable, votre préavis est de [durée] et prendra fin le [date], date à laquelle votre contrat de travail sera rompu. Vous voudrez bien prendre contact avec le service RH pour la restitution du matériel et de votre badge. Votre certificat de travail, votre attestation destinée à France Travail et votre reçu pour solde de tout compte seront tenus à votre disposition le dernier jour de votre contrat.</p>
<p>Nathalie ROUSSEL, responsable des ressources humaines</p>
</blockquote>

<h3>Le licenciement pour motif personnel</h3>
<p>Tout licenciement pour motif personnel doit être justifié par une <strong>cause réelle et sérieuse</strong> (L1232-1). Le motif peut être disciplinaire (faute simple, grave ou lourde) ou non disciplinaire (insuffisance professionnelle, inaptitude, absences prolongées perturbant le fonctionnement et nécessitant le remplacement définitif, etc.).</p>
<h4>Procédure pas à pas</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Règle</th><th>Référence</th></tr>
<tr><td>1. Convocation à l'entretien préalable</td><td>Lettre recommandée ou remise en main propre contre décharge, indiquant l'objet (licenciement envisagé), la date, l'heure et le lieu de l'entretien, et la possibilité de se faire assister par une personne de son choix appartenant au personnel de l'entreprise ou, en l'absence d'institution représentative du personnel, par un conseiller du salarié (adresse des services où la liste est consultable)</td><td>L1232-2, L1232-4, R1232-1</td></tr>
<tr><td>2. Délai avant l'entretien</td><td>L'entretien ne peut avoir lieu moins de <strong>5 jours ouvrables</strong> après la présentation de la lettre recommandée ou sa remise en main propre</td><td>L1232-2</td></tr>
<tr><td>3. Entretien préalable</td><td>L'employeur indique les motifs de la décision envisagée et recueille les explications du salarié</td><td>L1232-3</td></tr>
<tr><td>4. Délai de réflexion</td><td>La lettre de licenciement ne peut être expédiée moins de <strong>2 jours ouvrables</strong> après la date de l'entretien. En matière disciplinaire, la sanction ne peut intervenir plus d'<strong>un mois</strong> après l'entretien</td><td>L1232-6, L1332-2</td></tr>
<tr><td>5. Notification</td><td>Lettre recommandée avec avis de réception comportant l'énoncé du ou des motifs. Des modèles de lettres sont fixés par décret (arrêté du 29 décembre 2017)</td><td>L1232-6, R1232-13</td></tr>
<tr><td>6. Précision des motifs</td><td>Dans les 15 jours suivant la notification, le salarié peut demander des précisions ; l'employeur dispose de 15 jours pour répondre ; l'employeur peut aussi préciser les motifs de sa propre initiative dans le même délai</td><td>R1232-13</td></tr>
<tr><td>7. Préavis</td><td>Sauf faute grave ou lourde ; il démarre à la première présentation de la lettre</td><td>L1234-1, L1234-3</td></tr>
</table>
<p><strong>Faits fautifs</strong> : aucun fait fautif ne peut donner lieu à lui seul à l'engagement de poursuites disciplinaires au-delà d'un délai de <strong>2 mois</strong> à compter du jour où l'employeur en a eu connaissance, sauf poursuites pénales (L1332-4). Une mise à pied conservatoire peut être notifiée en attendant la décision en cas de faute grave présumée.</p>

<h4>Durée du préavis de licenciement (minimum légal)</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Ancienneté de services continus</th><th>Préavis légal</th></tr>
<tr><td>Moins de 6 mois</td><td>Selon la loi, la convention collective ou les usages</td></tr>
<tr><td>De 6 mois à moins de 2 ans</td><td>1 mois</td></tr>
<tr><td>2 ans et plus</td><td>2 mois</td></tr>
</table>
<p>La convention collective, le contrat ou les usages peuvent prévoir plus favorable (L1234-1). Pour un travailleur handicapé, la durée légale est doublée dans la limite de 3 mois (L5213-9).</p>

<h4>Le calcul des délais : exemple</h4>
<p>ALTÉA SERVICES envisage de licencier pour insuffisance professionnelle Benoît RENARD, agent de maîtrise. La lettre de convocation est présentée par La Poste le <strong>lundi 7 juin 2027</strong>. Jours ouvrables (tous les jours sauf le dimanche et les jours fériés) : mardi 8, mercredi 9, jeudi 10, vendredi 11, samedi 12 = 5 jours ouvrables pleins. L'entretien peut se tenir au plus tôt le <strong>lundi 14 juin 2027</strong>. S'il a lieu le 14 juin, la lettre de licenciement peut être expédiée au plus tôt le <strong>jeudi 17 juin 2027</strong> (mardi 15 et mercredi 16 = 2 jours ouvrables pleins). On ne compte ni le jour de la présentation ni le jour de l'entretien ; lorsqu'un délai expire un samedi, un dimanche ou un jour férié, il est prorogé jusqu'au premier jour ouvrable suivant.</p>

<h3>Les conséquences d'un licenciement sans cause réelle et sérieuse</h3>
<p>Si le juge considère le licenciement sans cause réelle et sérieuse, il peut proposer la réintégration ; à défaut, il octroie une indemnité comprise entre des montants minimaux et maximaux fixés par un barème selon l'ancienneté et l'effectif de l'entreprise (L1235-3, dit « barème Macron »). Le barème est écarté en cas de nullité du licenciement (harcèlement, discrimination, violation d'une liberté fondamentale, salarié protégé, etc., L1235-3-1). Une irrégularité de procédure seule (absence d'entretien, délai non respecté) ouvre droit à une indemnité d'un mois de salaire au plus (L1235-2). D'où l'importance, pour l'assistant RH, de sécuriser chaque date.</p>

<h3>Le licenciement pour motif économique en bref</h3>
<p>Constitue un licenciement pour motif économique celui effectué pour un ou plusieurs motifs non inhérents à la personne du salarié, résultant d'une suppression ou transformation d'emploi ou d'une modification refusée d'un élément essentiel du contrat, consécutives notamment à des difficultés économiques, à des mutations technologiques, à une réorganisation nécessaire à la sauvegarde de la compétitivité ou à la cessation d'activité (L1233-3). Points clés :</p>
<ul>
<li>Obligation de <strong>reclassement</strong> préalable (L1233-4) et d'<strong>adaptation</strong>.</li>
<li><strong>Critères d'ordre des licenciements</strong> (charges de famille, ancienneté, situation des salariés présentant des caractéristiques sociales rendant leur réinsertion difficile, qualités professionnelles, L1233-5).</li>
<li><strong>Consultation du CSE</strong> et information de la DREETS ; procédure différente selon le nombre de licenciements (1, de 2 à 9, 10 et plus sur 30 jours) ; <strong>plan de sauvegarde de l'emploi</strong> (PSE) obligatoire dans les entreprises d'au moins 50 salariés pour 10 licenciements et plus sur 30 jours (L1233-61).</li>
<li>Proposition du <strong>contrat de sécurisation professionnelle</strong> (CSP) dans les entreprises de moins de 1 000 salariés (L1233-66), et du congé de reclassement au-delà.</li>
<li>Priorité de réembauche pendant un an (L1233-45).</li>
</ul>
<p>Ces procédures sont pilotées par la responsable RH avec un conseil juridique ; l'assistant RH prépare les données (ancienneté, charges de famille déclarées, catégories professionnelles) et les courriers.</p>
`,
      },
      {
        title: "4.6 – Rupture conventionnelle, fin de CDD, période d'essai, retraite et abandon de poste",
        content: `
<h3>La rupture conventionnelle homologuée</h3>
<p>L'employeur et le salarié en CDI peuvent convenir en commun des conditions de la rupture du contrat (L1237-11). Elle ne peut être imposée par l'une ou l'autre des parties et suppose un consentement libre (un consentement vicié par un harcèlement ou des pressions entraîne la nullité).</p>
<h4>Procédure pas à pas</h4>
<ol>
<li><strong>Un ou plusieurs entretiens</strong> au cours desquels les parties conviennent du principe de la rupture et de ses conditions. Le salarié peut se faire assister par une personne de l'entreprise ou, en l'absence de représentants du personnel, par un conseiller du salarié ; il en informe l'employeur, qui peut alors lui-même se faire assister (L1237-12).</li>
<li><strong>Rédaction de la convention sur TéléRC</strong> (téléservice du ministère du Travail), obligatoire depuis le 1er avril 2022 sauf si l'une des parties ne peut pas l'utiliser (R1237-3). La convention fixe le montant de l'indemnité spécifique de rupture conventionnelle, qui ne peut être inférieur à l'indemnité légale de licenciement (ou à l'indemnité conventionnelle lorsque l'accord national interprofessionnel du 11 janvier 2008 et son avenant s'appliquent à l'entreprise), et la date envisagée de la rupture (L1237-13).</li>
<li><strong>Signature</strong> par les deux parties ; <strong>remise d'un exemplaire au salarié</strong> (à défaut, la convention est nulle selon la jurisprudence).</li>
<li><strong>Délai de rétractation de 15 jours calendaires</strong> à compter du lendemain de la signature ; s'il expire un samedi, un dimanche ou un jour férié, il est prorogé au premier jour ouvrable suivant. La rétractation est exercée par lettre adressée par tout moyen attestant de sa date de réception par l'autre partie (L1237-13).</li>
<li><strong>Demande d'homologation</strong> à la DREETS via TéléRC, au plus tôt le lendemain de la fin du délai de rétractation (L1237-14).</li>
<li><strong>Instruction</strong> : l'administration dispose de <strong>15 jours ouvrables</strong> à compter de la réception de la demande ; à défaut de notification dans ce délai, l'homologation est réputée acquise.</li>
<li><strong>Rupture du contrat</strong> au plus tôt le lendemain du jour de l'homologation, à la date prévue par la convention.</li>
</ol>
<p>Pour un salarié protégé, la rupture conventionnelle est soumise à l'<strong>autorisation de l'inspection du travail</strong> et non à l'homologation (L1237-15). Le recours contre la convention ou l'homologation se prescrit par 12 mois à compter de l'homologation (L1237-14).</p>

<h4>Exemple de calendrier</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Date</th></tr>
<tr><td>Entretiens</td><td>Mardi 4 et mardi 11 mai 2027</td></tr>
<tr><td>Signature de la convention (exemplaire remis au salarié)</td><td>Mardi 11 mai 2027</td></tr>
<tr><td>Délai de rétractation (15 jours calendaires à compter du 12 mai)</td><td>Expire le mercredi 26 mai 2027 à minuit</td></tr>
<tr><td>Envoi de la demande d'homologation via TéléRC</td><td>Jeudi 27 mai 2027</td></tr>
<tr><td>Fin du délai d'instruction (15 jours ouvrables à compter du lendemain de la réception, hors dimanches et jours fériés ; aucun jour férié dans l'intervalle)</td><td>Lundi 14 juin 2027 si la demande est reçue le 27 mai (à recalculer au vu de l'accusé de réception)</td></tr>
<tr><td>Date de rupture prévue dans la convention</td><td>Au plus tôt le mardi 15 juin 2027 ; prévoir une marge (par exemple le vendredi 18 juin 2027)</td></tr>
</table>

<h3>La fin du contrat à durée déterminée</h3>
<p>Le CDD cesse de plein droit à l'échéance du terme (L1243-5). Avant le terme, il ne peut être rompu que dans des cas limitativement énumérés (L1243-1) : accord des parties, faute grave, force majeure, inaptitude constatée par le médecin du travail, ou à l'initiative du salarié qui justifie d'une embauche en CDI (avec un préavis d'un jour par semaine de durée du contrat, dans la limite de 2 semaines, L1243-2).</p>
<h4>L'indemnité de fin de contrat (dite « de précarité »)</h4>
<p>À l'échéance d'un CDD qui n'est pas suivi d'un CDI, le salarié perçoit une indemnité égale à <strong>10 % de la rémunération totale brute</strong> qui lui a été versée pendant le contrat (L1243-8). Un accord de branche étendu peut limiter ce taux à 6 % en contrepartie d'un accès privilégié à la formation (L1243-9). Elle est versée à l'issue du contrat avec le dernier salaire. Elle <strong>n'est pas due</strong> notamment (L1243-10) :</p>
<ul>
<li>pour les contrats saisonniers, les CDD d'usage (sauf disposition conventionnelle plus favorable), les contrats conclus avec des jeunes pour une période comprise dans leurs vacances scolaires ou universitaires, les contrats d'apprentissage et les contrats aidés ou de formation ;</li>
<li>en cas de refus par le salarié d'accepter la conclusion d'un CDI pour occuper le même emploi ou un emploi similaire, assorti d'une rémunération au moins équivalente ;</li>
<li>en cas de rupture anticipée due à l'initiative du salarié, à sa faute grave ou à un cas de force majeure.</li>
</ul>
<p>Depuis la loi « marché du travail » du 21 décembre 2022, l'employeur qui propose à l'issue du CDD un CDI pour le même emploi ou un emploi similaire le fait par écrit, et informe France Travail en cas de refus du salarié (L1243-11-1).</p>

<h3>La rupture de la période d'essai</h3>
<p>Pendant la période d'essai, chaque partie peut rompre le contrat librement, sans motif ni indemnité (hors abus), sous réserve d'un délai de prévenance :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rupture à l'initiative de l'employeur (L1221-25)</th><th>Délai de prévenance</th></tr>
<tr><td>Moins de 8 jours de présence</td><td>24 heures</td></tr>
<tr><td>Entre 8 jours et un mois de présence</td><td>48 heures</td></tr>
<tr><td>Après un mois de présence</td><td>2 semaines</td></tr>
<tr><td>Après 3 mois de présence</td><td>1 mois</td></tr>
<tr><th>Rupture à l'initiative du salarié (L1221-26)</th><th>Délai de prévenance</th></tr>
<tr><td>Moins de 8 jours de présence</td><td>24 heures</td></tr>
<tr><td>8 jours de présence et plus</td><td>48 heures</td></tr>
</table>
<p>Le délai de prévenance ne peut avoir pour effet de prolonger la période d'essai au-delà de son terme (L1221-25). S'il n'est pas respecté, le salarié a droit à une indemnité compensatrice égale aux salaires qu'il aurait perçus jusqu'à la fin du délai. Les durées maximales de la période d'essai du CDI sont de 2 mois (ouvriers et employés), 3 mois (agents de maîtrise et techniciens) et 4 mois (cadres), renouvelable une fois si un accord de branche étendu le prévoit (L1221-19 et L1221-21).</p>

<h3>Le départ et la mise à la retraite</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Point</th><th>Départ volontaire</th><th>Mise à la retraite</th></tr>
<tr><td>Initiative</td><td>Salarié (L1237-9)</td><td>Employeur (L1237-5)</td></tr>
<tr><td>Conditions</td><td>Le salarié doit pouvoir liquider sa pension ; le départ est une décision du salarié</td><td>Possible sans l'accord du salarié à partir de 70 ans. Entre l'âge d'attribution automatique du taux plein (67 ans) et 70 ans, l'employeur interroge par écrit le salarié 3 mois avant son anniversaire sur son intention de partir ; en cas de réponse négative, il ne peut pas le mettre à la retraite pendant l'année qui suit (L1237-5, D1237-2-1)</td></tr>
<tr><td>Préavis</td><td>Préavis de licenciement (mêmes durées)</td><td>Préavis de licenciement</td></tr>
<tr><td>Indemnité</td><td>Indemnité de départ à la retraite : ½ mois après 10 ans d'ancienneté, 1 mois après 15 ans, 1,5 mois après 20 ans, 2 mois après 30 ans (D1237-1), ou montant conventionnel plus favorable</td><td>Au moins égale à l'indemnité légale de licenciement (L1237-7)</td></tr>
<tr><td>Régime social</td><td>Indemnité soumise à cotisations et à l'impôt comme un salaire</td><td>Exonération partielle dans certaines limites ; contribution patronale spécifique (voir section 4.7)</td></tr>
</table>

<h3>L'abandon de poste et la présomption de démission</h3>
<p>Depuis la loi du 21 décembre 2022 et le décret du 17 avril 2023, le salarié qui a abandonné volontairement son poste et ne reprend pas le travail après avoir été <strong>mis en demeure</strong> de justifier son absence et de reprendre son poste, par lettre recommandée ou remise en main propre contre décharge, dans le délai fixé par l'employeur, est <strong>présumé avoir démissionné</strong> à l'expiration de ce délai (L1237-1-1). Le délai ne peut être inférieur à <strong>15 jours</strong> à compter de la date de présentation de la mise en demeure (R1237-13). Le Conseil d'État (décision du 18 décembre 2024) a validé le décret en précisant que la mise en demeure doit informer le salarié des conséquences de l'absence de reprise, c'est-à-dire de la présomption de démission.</p>
<p>Le salarié peut invoquer un motif légitime (raisons médicales, droit de retrait, droit de grève, refus d'exécuter une instruction contraire à une réglementation, modification du contrat à l'initiative de l'employeur) ; l'absence n'est alors pas un abandon volontaire. Il peut contester la rupture devant le conseil de prud'hommes, qui statue directement au fond dans un délai d'un mois. Le salarié présumé démissionnaire doit effectuer son préavis (ou en être dispensé) et n'a pas droit, en principe, à l'allocation chômage.</p>
<h4>Modèle – Mise en demeure (extrait)</h4>
<blockquote>
<p>Monsieur [NOM], Créteil, le [date] – Lettre recommandée avec avis de réception</p>
<p>Nous constatons que vous ne vous êtes pas présenté à votre poste de travail sur le site [client] depuis le [date], sans nous avoir fourni de justificatif. Nous vous mettons en demeure de justifier de votre absence et de reprendre votre poste au plus tard le [date : au moins 15 jours après la présentation de ce courrier].</p>
<p>Si vous invoquez un motif légitime (raison médicale, exercice du droit de retrait ou du droit de grève, refus d'exécuter une instruction contraire à une réglementation, modification de votre contrat de travail à notre initiative), nous vous remercions de nous en informer dans ce même délai.</p>
<p>À défaut de reprise du travail ou de justification à cette date, vous serez présumé avoir démissionné en application de l'article L1237-1-1 du Code du travail. Votre préavis de démission courra alors à compter de cette date, et vous ne pourrez en principe pas bénéficier de l'allocation d'assurance chômage.</p>
<p>Nathalie ROUSSEL, responsable des ressources humaines</p>
</blockquote>
`,
      },
      {
        title: "4.7 – Évaluer les indemnités de fin de contrat : règles et calculs détaillés",
        content: `
<h3>Un savoir-faire nommément évalué</h3>
<p>Le référentiel du titre (fiche CP1) cite parmi les savoir-faire « évaluer des indemnités de fin de contrat », et la description de la compétence précise que l'assistant RH « constitue et actualise les dossiers individuels du personnel et évalue les indemnités de fin de contrat ». Lors de la mise en situation professionnelle et de l'entretien technique portant sur le CP1, le jury attend un calcul juste, présenté étape par étape, avec la source de chaque règle et la comparaison entre le montant légal et le montant conventionnel. Le principe est toujours le même : <strong>on calcule l'indemnité légale, on calcule l'indemnité conventionnelle (ou contractuelle), et on retient la plus favorable au salarié</strong>.</p>

<h3>Les sommes dues selon le mode de rupture</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Somme</th><th>Démission</th><th>Licenciement (hors faute grave/lourde)</th><th>Licenciement pour faute grave ou lourde</th><th>Rupture conventionnelle</th><th>Fin de CDD</th><th>Départ volontaire à la retraite</th></tr>
<tr><td>Salaire jusqu'à la date de fin</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Indemnité compensatrice de congés payés</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Indemnité compensatrice de préavis</td><td>Si dispense à l'initiative de l'employeur</td><td>Si dispense à l'initiative de l'employeur</td><td>Non</td><td>Non (pas de préavis)</td><td>Non</td><td>Si dispense à l'initiative de l'employeur</td></tr>
<tr><td>Indemnité de rupture</td><td>Non</td><td>Indemnité légale ou conventionnelle de licenciement</td><td>Non</td><td>Indemnité spécifique de rupture conventionnelle</td><td>Indemnité de fin de contrat (10 %), sauf exceptions</td><td>Indemnité de départ à la retraite</td></tr>
<tr><td>Prorata des primes (13e mois, etc.)</td><td colspan="6">Selon la convention collective, le contrat ou l'usage (par exemple 13e mois versé au prorata en cas de départ en cours d'année si le texte le prévoit)</td></tr>
</table>
<p>Depuis la décision du Conseil constitutionnel du 2 mars 2016, l'indemnité compensatrice de congés payés est due même en cas de faute lourde.</p>

<h3>L'indemnité légale de licenciement</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Règle</th><th>Référence</th></tr>
<tr><td>Condition</td><td>Salarié en CDI, licencié alors qu'il compte <strong>8 mois d'ancienneté ininterrompus</strong> au service du même employeur, sauf faute grave ou lourde</td><td>L1234-9</td></tr>
<tr><td>Ancienneté</td><td>Appréciée à la date de fin du contrat, c'est-à-dire à l'expiration du préavis, même si celui-ci n'est pas exécuté ; les années incomplètes sont prises en compte au prorata du nombre de mois complets</td><td>L1234-11, R1234-1</td></tr>
<tr><td>Montant</td><td><strong>1/4 de mois de salaire par année d'ancienneté jusqu'à 10 ans</strong>, puis <strong>1/3 de mois de salaire par année d'ancienneté au-delà de 10 ans</strong></td><td>R1234-2</td></tr>
<tr><td>Salaire de référence</td><td>Formule la plus avantageuse pour le salarié : soit la moyenne mensuelle des <strong>12 derniers mois</strong> précédant le licenciement (ou de toute la durée de service si elle est inférieure à 12 mois), soit le tiers des <strong>3 derniers mois</strong>, toute prime ou gratification annuelle ou exceptionnelle versée pendant ces 3 mois n'étant alors prise en compte qu'au prorata</td><td>R1234-4</td></tr>
<tr><td>Salaire de référence en cas d'arrêt maladie</td><td>Lorsque le salarié était en arrêt de travail au cours de la période, on retient le salaire des 12 ou 3 mois précédant l'arrêt (jurisprudence constante de la Cour de cassation)</td><td>Jurisprudence</td></tr>
<tr><td>Temps plein et temps partiel</td><td>Si le salarié a travaillé successivement à temps plein et à temps partiel, l'indemnité est calculée proportionnellement aux périodes d'emploi accomplies selon l'une et l'autre modalités</td><td>L3123-5</td></tr>
<tr><td>Absences</td><td>Les périodes de suspension du contrat (maladie non professionnelle, congé sans solde) n'entrent pas dans le calcul de l'ancienneté, sauf disposition contraire ; les périodes d'AT/MP, de congé de maternité ou de paternité sont prises en compte ; le congé parental compte pour moitié</td><td>L1226-7, L1225-24, L1225-54</td></tr>
</table>
<p><strong>Formules à retenir</strong>, avec S le salaire de référence et A l'ancienneté en années (mois convertis en douzièmes) :</p>
<ul>
<li>Si A est inférieure ou égale à 10 : indemnité = S × 1/4 × A.</li>
<li>Si A est supérieure à 10 : indemnité = (S × 1/4 × 10) + (S × 1/3 × (A – 10)).</li>
</ul>

<h3>Calcul n° 1 – Licenciement pour insuffisance professionnelle, ancienneté inférieure à 10 ans</h3>
<p><strong>Données :</strong> Sandrine LEBRUN, assistante d'exploitation, entrée le 1er avril 2019, licenciée pour insuffisance professionnelle ; notification le 29 octobre 2026 ; préavis de 2 mois exécuté, fin du contrat le 31 décembre 2026. Salaire de base mensuel 2 450 € bruts. Douze derniers mois précédant la notification (octobre 2025 à septembre 2026) : 29 400 € de salaire de base, 600 € d'heures supplémentaires, une prime annuelle de 1 200 € versée en décembre 2025, soit 31 200 €. Trois derniers mois (juillet à septembre 2026) : 7 350 € de base et 150 € d'heures supplémentaires, soit 7 500 € (aucune prime annuelle versée sur ces 3 mois). On suppose, pour l'exercice, que l'indemnité conventionnelle est moins favorable.</p>
<ol>
<li><strong>Ancienneté</strong> à la fin du préavis : du 1er avril 2019 au 31 décembre 2026 = 7 ans et 9 mois, soit 7 + 9/12 = 7,75 années. Condition des 8 mois remplie.</li>
<li><strong>Salaire de référence</strong> :
<ul>
<li>Moyenne des 12 mois : 31 200 / 12 = 2 600,00 €.</li>
<li>Moyenne des 3 mois : 7 500 / 3 = 2 500,00 €.</li>
<li>On retient la plus favorable : <strong>2 600,00 €</strong>.</li>
</ul></li>
<li><strong>Indemnité légale</strong> : 2 600 × 1/4 × 7,75 = 650 × 7,75 = <strong>5 037,50 €</strong>.</li>
<li><strong>Comparaison</strong> avec l'indemnité conventionnelle (CCN IDCC 3043) : on retient le montant le plus élevé.</li>
</ol>
<p>En décomposant : 650 € × 7 années = 4 550,00 € ; 650 € × 9/12 = 487,50 € ; total 5 037,50 €.</p>

<h3>Calcul n° 2 – Licenciement, ancienneté supérieure à 10 ans</h3>
<p><strong>Données :</strong> Gérard LAMBERT, chef d'équipe, ancienneté de 16 ans et 4 mois à la fin du préavis ; salaire de référence (plus favorable des deux formules) : 2 900 € bruts.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Tranche</th><th>Calcul</th><th>Montant</th></tr>
<tr><td>10 premières années à 1/4 de mois</td><td>2 900 × 1/4 × 10</td><td>7 250,00 €</td></tr>
<tr><td>Au-delà de 10 ans : 6 ans et 4 mois à 1/3 de mois</td><td>2 900 × 1/3 × (6 + 4/12) = 966,67 × 6,3333</td><td>6 122,22 €</td></tr>
<tr><td colspan="2"><strong>Indemnité légale de licenciement</strong></td><td><strong>13 372,22 €</strong></td></tr>
</table>
<p>Vérification par décomposition : 966,67 € × 6 = 5 800,00 € ; 966,67 € × 4/12 = 322,22 € ; 5 800,00 + 322,22 = 6 122,22 €.</p>

<h3>Calcul n° 3 – Indemnité compensatrice de préavis</h3>
<p>Lorsque l'employeur dispense le salarié d'effectuer son préavis, il lui verse une indemnité égale aux salaires et avantages (y compris l'indemnité de congés payés) qu'il aurait perçus s'il avait travaillé pendant le préavis (L1234-5). La dispense ne modifie pas la date de fin du contrat, qui reste celle de la fin du préavis.</p>
<p><strong>Exemple :</strong> si ALTÉA SERVICES avait dispensé Sandrine LEBRUN de son préavis de 2 mois, l'indemnité compensatrice serait de 2 × 2 450 € = <strong>4 900,00 € bruts</strong>, augmentés des éléments de rémunération qu'elle aurait habituellement perçus (heures supplémentaires régulières, primes mensuelles). Le préavis non effectué mais payé ouvre aussi droit à congés payés : 2 mois × 2,5 jours = 5 jours ouvrables, intégrés dans l'indemnité compensatrice de congés payés (ou, en pratique, 10 % de l'indemnité compensatrice de préavis selon la règle du dixième).</p>

<h3>Calcul n° 4 – Indemnité compensatrice de congés payés</h3>
<p>Lorsque le contrat est rompu avant que le salarié ait pu bénéficier de la totalité des congés acquis, il reçoit une indemnité compensatrice pour la fraction non prise (L3141-28), calculée selon les mêmes règles que l'indemnité de congés payés : <strong>règle du dixième</strong> ou <strong>maintien de salaire</strong>, la plus favorable.</p>
<p><strong>Données :</strong> Sandrine LEBRUN a soldé ses congés de la période précédente. Pour la période en cours (1er juin – 31 décembre 2026), elle a acquis 7 mois × 2,5 = 17,5 jours, arrondis à 18 jours ouvrables, et n'en a pris aucun. Rémunération brute de la période en cours : 2 450 × 7 + 350 € d'heures supplémentaires = 17 500 €.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Méthode</th><th>Calcul</th><th>Résultat</th></tr>
<tr><td>Règle du dixième</td><td>17 500 × 10 % (pour la totalité des jours acquis sur la période, aucun n'ayant été pris)</td><td>1 750,00 €</td></tr>
<tr><td>Maintien de salaire</td><td>2 450 × 18 / 26 (26 jours ouvrables en moyenne par mois, convention à appliquer de façon constante)</td><td>1 696,15 €</td></tr>
<tr><td colspan="2"><strong>Indemnité compensatrice de congés payés retenue</strong></td><td><strong>1 750,00 €</strong></td></tr>
</table>

<h3>Calcul n° 5 – Rupture conventionnelle : plancher et régime social</h3>
<p><strong>Données :</strong> Romain FAURE, technicien de maintenance des autolaveuses, 3 ans et 6 mois d'ancienneté à la date de rupture envisagée, salaire de référence 2 300 €, non éligible à une pension de retraite. Les parties conviennent d'une indemnité de 4 000 €.</p>
<ol>
<li><strong>Plancher légal</strong> : 2 300 × 1/4 × 3,5 = <strong>2 012,50 €</strong>. L'indemnité négociée de 4 000 € est supérieure : la convention est recevable sur ce point (vérifier aussi le plancher conventionnel si l'ANI de 2008 s'applique à l'entreprise).</li>
<li><strong>Impôt sur le revenu</strong> : l'indemnité est exonérée dans la limite du plus élevé des montants suivants : l'indemnité légale ou conventionnelle, deux fois la rémunération annuelle brute de l'année précédente, ou 50 % de l'indemnité, dans la limite de 6 fois le plafond annuel de la sécurité sociale (article 80 duodecies du CGI). Ici, 2 fois la rémunération annuelle (environ 55 200 €) dépasse 4 000 € : l'indemnité est entièrement exonérée d'impôt.</li>
<li><strong>Cotisations de sécurité sociale</strong> : exonérées pour la fraction exonérée d'impôt, dans la limite de 2 PASS (PASS 2025 : 47 100 €, soit 94 200 € ; valeur 2026 à vérifier sur urssaf.fr). Ici, 4 000 € exonérés de cotisations.</li>
<li><strong>CSG et CRDS</strong> : dues sur la fraction qui excède le montant de l'indemnité légale ou conventionnelle de licenciement : 4 000 – 2 012,50 = <strong>1 987,50 €</strong> soumis à CSG-CRDS (sans abattement pour frais professionnels).</li>
<li><strong>Contribution patronale spécifique</strong> : depuis le 1er septembre 2023, les indemnités de rupture conventionnelle (et de mise à la retraite) sont soumises, sur leur fraction exonérée de cotisations, à une contribution patronale unique dont le taux a été fixé à 30 % (LFSS pour 2023) ; ce taux est susceptible d'évoluer avec chaque loi de financement de la sécurité sociale : vérifiez le taux applicable à la date de la rupture sur urssaf.fr. À 30 %, la contribution serait de 4 000 × 30 % = 1 200 €.</li>
</ol>
<p>Une indemnité supérieure à 10 PASS est soumise aux cotisations dès le premier euro.</p>

<h3>Calcul n° 6 – Fin de CDD</h3>
<p><strong>Données :</strong> Kevin JOLY, agent de service en CDD de remplacement de 6 mois, rémunération brute totale versée pendant le contrat : 13 200 € ; il n'a pris aucun congé ; aucun CDI ne lui est proposé.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indemnité</th><th>Calcul</th><th>Montant</th></tr>
<tr><td>Indemnité de fin de contrat (précarité)</td><td>13 200 × 10 %</td><td>1 320,00 €</td></tr>
<tr><td>Indemnité compensatrice de congés payés</td><td>(13 200 + 1 320) × 10 % – l'indemnité de précarité entre dans l'assiette de l'indemnité de congés payés</td><td>1 452,00 €</td></tr>
<tr><td colspan="2"><strong>Total des indemnités de fin de contrat</strong></td><td><strong>2 772,00 €</strong></td></tr>
</table>
<p>Ces deux indemnités ont la nature de salaire : elles sont soumises à cotisations, CSG-CRDS et impôt sur le revenu.</p>

<h3>Calcul n° 7 – Départ et mise à la retraite</h3>
<p><strong>Données :</strong> Martine COLIN, 22 ans d'ancienneté, salaire de référence 2 800 €.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Hypothèse</th><th>Règle</th><th>Calcul</th><th>Montant</th></tr>
<tr><td>Départ volontaire</td><td>1,5 mois de salaire après 20 ans d'ancienneté (D1237-1)</td><td>2 800 × 1,5</td><td>4 200,00 €</td></tr>
<tr><td>Mise à la retraite par l'employeur</td><td>Au moins l'indemnité légale de licenciement (L1237-7)</td><td>(2 800 × 1/4 × 10) + (2 800 × 1/3 × 12) = 7 000 + 11 200</td><td>18 200,00 €</td></tr>
</table>
<p>L'indemnité de départ volontaire est soumise à cotisations et à l'impôt comme un salaire ; l'indemnité de mise à la retraite bénéficie d'une exonération partielle, et supporte la contribution patronale spécifique (voir calcul n° 5).</p>

<h3>Récapitulatif du régime social et fiscal (en bref)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indemnité</th><th>Cotisations sociales</th><th>CSG-CRDS</th><th>Impôt sur le revenu</th></tr>
<tr><td>Indemnité compensatrice de préavis, de congés payés, de précarité</td><td>Soumise</td><td>Soumise</td><td>Imposable</td></tr>
<tr><td>Indemnité légale ou conventionnelle de licenciement</td><td>Exonérée dans la limite de 2 PASS (pour la part exonérée d'impôt)</td><td>Exonérée dans la limite du montant légal ou conventionnel</td><td>Exonérée pour le montant légal ou conventionnel ; au-delà, dans les limites de l'article 80 duodecies du CGI</td></tr>
<tr><td>Indemnité spécifique de rupture conventionnelle (salarié non éligible à la retraite)</td><td>Comme le licenciement ; plus contribution patronale spécifique</td><td>Sur la part excédant l'indemnité légale ou conventionnelle</td><td>Comme le licenciement</td></tr>
<tr><td>Indemnité de départ volontaire à la retraite</td><td>Soumise</td><td>Soumise</td><td>Imposable</td></tr>
<tr><td>Indemnité de mise à la retraite</td><td>Exonération partielle ; contribution patronale spécifique</td><td>Sur la part excédant le montant légal ou conventionnel</td><td>Exonérée dans certaines limites</td></tr>
</table>
<p>L'assistant RH n'établit pas seul le bulletin de sortie : il prépare un <strong>tableau de calcul</strong> (données, sources, formules, résultat), le fait valider par la responsable RH et le transmet au gestionnaire de paie, qui contrôle le traitement dans Silae.</p>
`,
      },
      {
        title: "4.8 – Documents de fin de contrat, sortie du registre et archivage",
        content: `
<h3>Les trois documents obligatoires</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Document</th><th>Contenu</th><th>Règles de remise</th><th>Référence</th></tr>
<tr><td>Certificat de travail</td><td>Date d'entrée et date de sortie ; nature de l'emploi ou des emplois successivement occupés et périodes correspondantes ; le cas échéant, maintien à titre gratuit des garanties de complémentaire santé et de prévoyance (portabilité). Aucune mention défavorable au salarié</td><td>Remis à l'expiration du contrat, quel que soit le motif de la rupture (y compris en fin de CDD et pendant la période d'essai). Il est « quérable » : tenu à disposition du salarié ; l'employeur l'envoie en cas de demande</td><td>L1234-19, D1234-6</td></tr>
<tr><td>Attestation employeur destinée à France Travail</td><td>Données permettant d'examiner les droits à l'allocation : motif de la rupture, salaires des derniers mois, indemnités versées, préavis</td><td>Transmise par l'employeur via la DSN (signalement de fin de contrat de travail unique, dit « FCTU »), dans les délais réglementaires ; un exemplaire est remis au salarié (il est disponible dans son espace)</td><td>R1234-9</td></tr>
<tr><td>Reçu pour solde de tout compte</td><td>Inventaire des sommes versées au salarié lors de la rupture (salaire, indemnités, primes)</td><td>Établi par l'employeur, signé par le salarié qui en reçoit un exemplaire. Il peut être <strong>dénoncé dans les 6 mois</strong> qui suivent sa signature, délai au-delà duquel il devient libératoire pour l'employeur pour les seules sommes qui y sont mentionnées. Un solde non signé n'est pas libératoire</td><td>L1234-20, D1234-7</td></tr>
</table>
<p><strong>Autres documents</strong> : état récapitulatif de l'épargne salariale le cas échéant (L3341-7), notice de portabilité des garanties de santé et de prévoyance (L911-8 du Code de la sécurité sociale : maintien jusqu'à 12 mois si le salarié est pris en charge par l'assurance chômage), dernier bulletin de paie, documents propres à la convention collective. Dans la propreté, en cas de perte de marché, le transfert conventionnel des salariés vers l'entreprise entrante obéit à des règles spécifiques de la CCN (garantie d'emploi) : c'est un cas particulier à traiter avec la responsable RH.</p>

<h3>Modèle – Certificat de travail</h3>
<blockquote>
<p><strong>ALTÉA SERVICES</strong> – SAS – [adresse du siège], 94000 Créteil – SIRET [numéro] – Code APE [code]</p>
<p><strong>CERTIFICAT DE TRAVAIL</strong></p>
<p>Je soussignée, Nathalie ROUSSEL, responsable des ressources humaines, agissant pour le compte de la société ALTÉA SERVICES, certifie que :</p>
<p>Madame Sandrine LEBRUN, demeurant [adresse], a été employée dans notre entreprise du 1er avril 2019 au 31 décembre 2026 inclus, en qualité de :</p>
<ul>
<li>agente de service, du 1er avril 2019 au 31 août 2022 ;</li>
<li>assistante d'exploitation, du 1er septembre 2022 au 31 décembre 2026.</li>
</ul>
<p>Madame Sandrine LEBRUN bénéficie du maintien à titre gratuit de ses garanties de complémentaire santé et de prévoyance, dans les conditions prévues à l'article L911-8 du Code de la sécurité sociale, sous réserve de sa prise en charge par l'assurance chômage.</p>
<p>Madame Sandrine LEBRUN nous quitte libre de tout engagement.</p>
<p>Fait à Créteil, le 31 décembre 2026, pour servir et valoir ce que de droit.</p>
<p>Signature et cachet de l'entreprise</p>
</blockquote>

<h3>Modèle – Reçu pour solde de tout compte</h3>
<blockquote>
<p>Je soussignée, Madame Sandrine LEBRUN, reconnais avoir reçu de la société ALTÉA SERVICES, pour solde de tout compte, en paiement des salaires, accessoires du salaire et de toutes indemnités dues au titre de l'exécution et de la cessation de mon contrat de travail, la somme brute de [montant] €, soit [montant] € nets, se décomposant comme suit :</p>
<ul>
<li>salaire du mois de décembre 2026 : [montant] € ;</li>
<li>indemnité compensatrice de congés payés (18 jours ouvrables) : 1 750,00 € ;</li>
<li>indemnité légale de licenciement : 5 037,50 € ;</li>
<li>[autres éléments éventuels : prorata de prime, heures supplémentaires de décembre].</li>
</ul>
<p>Le présent reçu, établi en double exemplaire dont un m'a été remis, peut être dénoncé dans les six mois qui suivent sa signature, délai au-delà duquel il devient libératoire pour l'employeur pour les sommes qui y sont mentionnées (article L1234-20 du Code du travail).</p>
<p>Fait à Créteil, le [date]. Signature du salarié</p>
</blockquote>

<h3>La check-list de sortie</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Étape</th><th>Action</th><th>Outil</th></tr>
<tr><td>Dès la connaissance de la rupture</td><td>Vérifier la procédure applicable, les délais (préavis, rétractation, homologation), le statut protégé éventuel ; créer la « fiche de sortie »</td><td>Lucca, dossier du salarié</td></tr>
<tr><td>Avant la date de sortie</td><td>Calculer les indemnités (tableau validé) ; transmettre les éléments au cabinet de paie ; informer les services (exploitation, informatique, flotte, badge)</td><td>Tableur, courriel</td></tr>
<tr><td>Dernier jour</td><td>Remise du certificat de travail, du solde de tout compte et de l'attestation France Travail ; restitution du matériel (tenues, clés, badges des sites clients, téléphone) contre décharge</td><td>Documents signés</td></tr>
<tr><td>Paie de sortie</td><td>Contrôle du bulletin de sortie ; signalement de fin de contrat en DSN</td><td>Silae, DSN</td></tr>
<tr><td>Après la sortie</td><td>Mise à jour du registre unique du personnel (date de sortie) ; désactivation des accès ; information de l'organisme de prévoyance (portabilité) ; mise à jour de l'organigramme et des indicateurs ; classement du dossier en archives intermédiaires</td><td>Registre, SIRH, archivage</td></tr>
</table>

<h3>La sortie du registre unique du personnel</h3>
<p>Le registre unique du personnel est tenu dans tout établissement employant des salariés. Il mentionne, dans l'ordre des embauches, les noms et prénoms de tous les salariés, ainsi que les dates d'entrée et de sortie (L1221-13). La date de sortie est inscrite dès la fin du contrat. Les mentions sont conservées pendant <strong>5 ans à compter de la date à laquelle le salarié a quitté l'établissement</strong> (R1221-26). Le registre peut être tenu sous forme dématérialisée s'il est infalsifiable ; il est tenu à la disposition des délégués du personnel élus et des agents de contrôle.</p>

<h3>L'archivage des documents RH</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Document</th><th>Durée de conservation minimale indicative</th><th>Fondement</th></tr>
<tr><td>Double des bulletins de paie (employeur)</td><td>5 ans</td><td>L3243-4</td></tr>
<tr><td>Bulletins de paie dématérialisés mis à disposition du salarié</td><td>50 ans ou jusqu'aux 75 ans du salarié</td><td>D3243-8</td></tr>
<tr><td>Registre unique du personnel</td><td>5 ans après le départ du salarié</td><td>R1221-26</td></tr>
<tr><td>Contrat de travail, avenants, documents de fin de contrat</td><td>5 ans après le départ (prescription de droit commun et durée des actions en discrimination à partir de leur révélation)</td><td>Article 2224 du Code civil, L1134-5</td></tr>
<tr><td>Documents de décompte de la durée du travail</td><td>1 an (tenue à disposition de l'inspection) ; en pratique 3 ans au regard de la prescription des salaires</td><td>D3171-16, L3245-1</td></tr>
<tr><td>Déclarations sociales et pièces justificatives</td><td>6 ans (contrôle URSSAF : 3 ans plus l'année en cours, délai porté en cas de fraude)</td><td>L244-3 du Code de la sécurité sociale</td></tr>
<tr><td>Document unique d'évaluation des risques (versions successives)</td><td>40 ans</td><td>L4121-3-1</td></tr>
<tr><td>Procès-verbaux des élections professionnelles</td><td>Jusqu'aux élections suivantes au moins (recommandation : durée du mandat + délais de contestation)</td><td>Pratique</td></tr>
<tr><td>Données des candidats non retenus</td><td>2 ans au plus après le dernier contact, sauf accord du candidat (recommandation CNIL)</td><td>RGPD</td></tr>
</table>
<p>Au regard du RGPD, les durées de conservation sont définies par finalité dans le registre des traitements ; au terme de la durée d'utilisation courante, les données passent en <strong>archivage intermédiaire</strong> (accès restreint au seul service RH, pour faire face à un contentieux ou à un contrôle), puis sont détruites ou anonymisées. Les dossiers papier sont rangés dans une armoire fermant à clé ; les dossiers numériques dans un espace à droits d'accès nominatifs.</p>
`,
      },
      {
        title: "4.9 – Quiz du chapitre",
        content: `
<h3>Questions</h3>
<p><strong>1. À partir de quel effectif le CSE doit-il être mis en place ?</strong></p>
<ul><li>a) 11 salariés pendant 12 mois consécutifs</li><li>b) 20 salariés</li><li>c) 50 salariés pendant 12 mois consécutifs</li><li>d) 11 salariés à n'importe quel moment de l'année</li></ul>
<p><strong>2. Dans une entreprise de 148 salariés sans accord, à quelle fréquence minimale le CSE doit-il se réunir ?</strong></p>
<ul><li>a) Une fois par mois</li><li>b) Au moins une fois tous les deux mois</li><li>c) Une fois par trimestre</li><li>d) Deux fois par an</li></ul>
<p><strong>3. Dans quel délai minimal l'ordre du jour du CSE doit-il être communiqué aux membres ?</strong></p>
<ul><li>a) 24 heures</li><li>b) 3 jours</li><li>c) 8 jours</li><li>d) 15 jours</li></ul>
<p><strong>4. Pour un renouvellement du CSE, quand l'employeur doit-il inviter les syndicats à négocier le protocole d'accord préélectoral ?</strong></p>
<ul><li>a) 15 jours avant l'expiration des mandats</li><li>b) Un mois avant l'expiration des mandats</li><li>c) Deux mois avant l'expiration des mandats</li><li>d) 90 jours après l'expiration des mandats</li></ul>
<p><strong>5. Quelles conditions faut-il remplir pour être éligible au CSE ?</strong></p>
<ul><li>a) 16 ans et 3 mois d'ancienneté</li><li>b) 18 ans et un an d'ancienneté</li><li>c) 18 ans et 6 mois d'ancienneté</li><li>d) 21 ans et 2 ans d'ancienneté</li></ul>
<p><strong>6. Quel délai minimal doit séparer la présentation de la convocation et l'entretien préalable au licenciement ?</strong></p>
<ul><li>a) 2 jours ouvrables</li><li>b) 5 jours ouvrables</li><li>c) 8 jours calendaires</li><li>d) 15 jours</li></ul>
<p><strong>7. Un salarié compte 12 ans et 6 mois d'ancienneté et un salaire de référence de 2 400 €. Quelle est son indemnité légale de licenciement ?</strong></p>
<ul><li>a) 7 500,00 €</li><li>b) 8 000,00 €</li><li>c) 10 000,00 €</li><li>d) 7 000,00 €</li></ul>
<p><strong>8. Quel est le délai de rétractation d'une rupture conventionnelle ?</strong></p>
<ul><li>a) 7 jours calendaires</li><li>b) 15 jours ouvrables</li><li>c) 15 jours calendaires</li><li>d) 1 mois</li></ul>
<p><strong>9. Dans quel délai un reçu pour solde de tout compte signé peut-il être dénoncé ?</strong></p>
<ul><li>a) 15 jours</li><li>b) 2 mois</li><li>c) 6 mois</li><li>d) 3 ans</li></ul>
<p><strong>10. En cas d'abandon de poste, quel est le délai minimal laissé au salarié pour reprendre son poste après la mise en demeure ?</strong></p>
<ul><li>a) 48 heures</li><li>b) 8 jours</li><li>c) 15 jours</li><li>d) 1 mois</li></ul>

<h3>Corrigé expliqué</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>a</td><td>L2311-2 : le seuil de 11 salariés doit être atteint pendant 12 mois consécutifs. Le seuil de 50 déclenche les attributions élargies.</td></tr>
<tr><td>2</td><td>b</td><td>L2315-28 : au moins tous les deux mois dans les entreprises de moins de 300 salariés, soit 6 réunions par an au minimum, dont 4 au moins consacrées en tout ou partie à la santé, la sécurité et les conditions de travail.</td></tr>
<tr><td>3</td><td>b</td><td>L2315-30 : 3 jours au moins avant la réunion, aux membres et, pour les points de santé-sécurité, à l'inspection du travail et à la CARSAT.</td></tr>
<tr><td>4</td><td>c</td><td>L2314-5 : deux mois avant l'expiration des mandats ; l'invitation doit en outre parvenir 15 jours au moins avant la première réunion de négociation.</td></tr>
<tr><td>5</td><td>b</td><td>L2314-19 : 18 ans révolus et un an d'ancienneté ; les électeurs doivent avoir 16 ans et 3 mois d'ancienneté (L2314-18).</td></tr>
<tr><td>6</td><td>b</td><td>L1232-2 : 5 jours ouvrables. Les 2 jours ouvrables correspondent au délai minimal entre l'entretien et l'envoi de la lettre de licenciement.</td></tr>
<tr><td>7</td><td>b</td><td>(2 400 × 1/4 × 10) + (2 400 × 1/3 × 2,5) = 6 000 + 2 000 = 8 000,00 €.</td></tr>
<tr><td>8</td><td>c</td><td>L1237-13 : 15 jours calendaires à compter du lendemain de la signature. Les 15 jours ouvrables correspondent au délai d'instruction de la demande d'homologation par la DREETS.</td></tr>
<tr><td>9</td><td>c</td><td>L1234-20 : 6 mois à compter de la signature, et l'effet libératoire ne vaut que pour les sommes mentionnées.</td></tr>
<tr><td>10</td><td>c</td><td>L1237-1-1 et R1237-13 : 15 jours au minimum à compter de la présentation de la mise en demeure, qui doit informer le salarié des conséquences d'une absence de reprise (Conseil d'État, 18 décembre 2024).</td></tr>
</table>
`,
      },
      {
        title: "4.10 – Cas pratique corrigé : trois départs et un renouvellement du CSE chez ALTÉA SERVICES",
        content: `
<h3>Énoncé</h3>
<p>Nous sommes le lundi 3 mai 2027. Nathalie ROUSSEL vous confie quatre dossiers à traiter dans la semaine. Vous disposez du Code du travail, de la CCN IDCC 3043 et des exports Lucca et Silae. Pour les calculs, on considère que les montants conventionnels sont inférieurs aux montants légaux.</p>
<ol>
<li><strong>Licenciement pour motif personnel</strong> : Hervé DUMONT, agent de service, entré le 1er février 2015, va être convoqué à un entretien préalable en vue d'un licenciement pour absences répétées injustifiées (faits du mois d'avril 2027, dont la direction a eu connaissance le 30 avril). La direction écarte la faute grave. Son salaire de base est de 2 100 € bruts ; il a perçu sur les 12 derniers mois 25 920 € bruts (base, heures complémentaires et une prime annuelle de 600 € en décembre) et 6 450 € sur les 3 derniers mois (sans prime annuelle). Préavis de 2 mois, exécuté. La lettre de convocation est remise en main propre le mardi 4 mai 2027. a) Calculez la date la plus proche possible pour l'entretien et pour l'envoi de la lettre de licenciement. b) En supposant une première présentation de la lettre de licenciement le jeudi 20 mai 2027, déterminez la date de fin du contrat et l'ancienneté. c) Calculez l'indemnité légale de licenciement.</li>
<li><strong>Rupture conventionnelle</strong> : Léa BERNARD, assistante commerciale, 5 ans et 3 mois d'ancienneté à la date de rupture envisagée, salaire de référence 2 500 €, souhaite une rupture conventionnelle. La direction propose 3 000 €. Analysez et décrivez la procédure.</li>
<li><strong>Fin de CDD</strong> : Yanis MERCIER, agent de service en CDD pour accroissement temporaire d'activité du 1er décembre 2026 au 31 mai 2027, a perçu 12 600 € bruts au total et pris 5 jours de congés payés (indemnité de congés déjà versée : 450 €). Calculez les indemnités de fin de contrat, sachant qu'aucun CDI ne lui est proposé.</li>
<li><strong>CSE</strong> : la directrice générale vous demande pourquoi le premier tour des élections est fixé au mardi 4 mai et non au jeudi 6 mai comme elle l'avait suggéré, et ce qu'il faudra faire des procès-verbaux.</li>
</ol>

<h3>Corrigé détaillé</h3>
<h4>1. Licenciement d'Hervé DUMONT</h4>
<p><strong>a) Délais de procédure</strong></p>
<ul>
<li>Prescription des faits fautifs : la direction a eu connaissance des faits le 30 avril 2027 ; elle doit engager la procédure (convocation) avant le 30 juin 2027 (L1332-4). La convocation du 4 mai respecte ce délai.</li>
<li>Remise en main propre le mardi 4 mai 2027. Jours ouvrables suivants : mercredi 5 (1), jeudi 6 – jeudi de l'Ascension, jour férié, non compté –, vendredi 7 (2), samedi 8 mai – jour férié, non compté –, lundi 10 (3), mardi 11 (4), mercredi 12 (5). L'entretien peut se tenir au plus tôt le <strong>jeudi 13 mai 2027</strong>.</li>
<li>Lettre de licenciement : au moins 2 jours ouvrables après l'entretien : vendredi 14 (1), samedi 15 (2). Les deux jours ouvrables pleins étant le vendredi 14 et le samedi 15 mai, la lettre peut être expédiée au plus tôt le dimanche 16 mai, en pratique le <strong>lundi 17 mai 2027</strong> ; ce jour étant le lundi de Pentecôte, si le bureau de poste est fermé, l'envoi se fera le <strong>mardi 18 mai 2027</strong>. En matière disciplinaire, l'envoi doit intervenir au plus tard un mois après l'entretien, soit le 13 juin 2027.</li>
</ul>
<p><em>Remarque de méthode :</em> l'essentiel est de montrer au jury le décompte jour par jour, l'exclusion des dimanches et jours fériés et la vérification du délai maximal d'un mois.</p>
<p><strong>b) Fin du contrat et ancienneté</strong></p>
<p>Le préavis de 2 mois court à compter de la première présentation de la lettre, le jeudi 20 mai 2027 (L1234-3), et prend fin le <strong>20 juillet 2027</strong> au soir. Ancienneté du 1er février 2015 au 20 juillet 2027 : 12 ans, 5 mois et 20 jours ; seuls les mois complets étant retenus, A = 12 ans et 5 mois = 12 + 5/12 = 12,4167 années.</p>
<p><strong>c) Indemnité légale</strong></p>
<ul>
<li>Salaire de référence : 12 mois : 25 920 / 12 = 2 160,00 € ; 3 mois : 6 450 / 3 = 2 150,00 €. On retient <strong>2 160,00 €</strong>.</li>
<li>10 premières années : 2 160 × 1/4 × 10 = 5 400,00 €.</li>
<li>Au-delà : 2 160 × 1/3 × (2 + 5/12) = 720 × 2,4167 = 1 740,00 € (720 × 2 = 1 440,00 € ; 720 × 5/12 = 300,00 €).</li>
<li><strong>Indemnité légale de licenciement : 7 140,00 €</strong>, à comparer avec l'indemnité conventionnelle.</li>
<li>S'y ajoutent l'indemnité compensatrice des congés payés non pris et le salaire du préavis exécuté. Aucune indemnité compensatrice de préavis puisque le préavis est exécuté.</li>
</ul>

<h4>2. Rupture conventionnelle de Léa BERNARD</h4>
<ul>
<li><strong>Plancher légal</strong> : 2 500 × 1/4 × (5 + 3/12) = 625 × 5,25 = <strong>3 281,25 €</strong>.</li>
<li>La proposition de 3 000 € est <strong>inférieure au plancher</strong> : la DREETS refuserait l'homologation. Il faut porter l'indemnité à 3 281,25 € au moins (ou au montant conventionnel s'il est supérieur et applicable).</li>
<li><strong>Procédure</strong> : un ou plusieurs entretiens (assistance possible), saisie de la convention sur TéléRC, signature et remise d'un exemplaire, délai de rétractation de 15 jours calendaires à compter du lendemain de la signature, demande d'homologation, instruction de 15 jours ouvrables, rupture au plus tôt le lendemain de l'homologation.</li>
<li><strong>Régime social</strong> : si l'indemnité est fixée exactement au plancher, aucune CSG-CRDS ni cotisation n'est due sur l'indemnité (salariée non éligible à la retraite) ; l'employeur doit en revanche la contribution patronale spécifique sur la fraction exonérée (taux à vérifier sur urssaf.fr).</li>
<li><strong>Documents</strong> : certificat de travail, attestation France Travail (la rupture conventionnelle ouvre droit à l'allocation chômage sous conditions), solde de tout compte, notice de portabilité.</li>
</ul>

<h4>3. Fin du CDD de Yanis MERCIER</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Calcul</th><th>Montant</th></tr>
<tr><td>Indemnité de fin de contrat</td><td>12 600 × 10 % (la rémunération totale brute inclut l'indemnité de congés déjà versée)</td><td>1 260,00 €</td></tr>
<tr><td>Assiette de l'indemnité de congés payés</td><td>12 600 + 1 260</td><td>13 860,00 €</td></tr>
<tr><td>Droits totaux (règle du dixième)</td><td>13 860 × 10 %</td><td>1 386,00 €</td></tr>
<tr><td>Déjà versé au titre des 5 jours pris</td><td>–</td><td>– 450,00 €</td></tr>
<tr><td>Indemnité compensatrice de congés payés restant due</td><td>1 386 – 450</td><td>936,00 €</td></tr>
<tr><td colspan="2"><strong>Total des indemnités de fin de CDD</strong></td><td><strong>2 196,00 €</strong></td></tr>
</table>
<p>À vérifier : que le maintien de salaire ne serait pas plus favorable pour les jours restants (6 mois × 2,5 = 15 jours acquis, 10 restants). Le CDD prend fin de plein droit le 31 mai 2027 ; aucune procédure n'est requise. Les documents de fin de contrat sont remis le dernier jour.</p>

<h4>4. Élections du CSE</h4>
<ul>
<li>Le jeudi 6 mai 2027 est le <strong>jeudi de l'Ascension</strong>, jour férié : organiser le vote ce jour-là réduirait la participation et donc le quorum (la moitié des inscrits). Le mardi 4 mai 2027 reste dans le délai de 90 jours suivant l'information du personnel du 26 février 2027 (L2314-4).</li>
<li>Si le quorum n'est pas atteint au premier tour, le second tour est organisé dans les 15 jours, ici le mardi 18 mai 2027.</li>
<li><strong>Procès-verbaux</strong> : établis sur les CERFA titulaires et suppléants, signés par les membres du bureau de vote ; transmis dans les 15 jours au centre de traitement des élections professionnelles (CTEP), en ligne de préférence, avec copie aux organisations syndicales ayant présenté des listes ou participé à la négociation du PAP ; affichage des résultats ; conservation au dossier « Élections 2027 ». Délai de contestation : 15 jours à compter de l'élection.</li>
<li><strong>Après l'élection</strong> : mise à jour de la liste des salariés protégés (élus et candidats, avec dates de fin de protection), première réunion du nouveau CSE, plan de formation des élus.</li>
</ul>

<h3>Ce que le jury valorise</h3>
<ul>
<li>Des <strong>calculs posés</strong> (données, formule, résultat) et la comparaison légal/conventionnel.</li>
<li>Des <strong>dates exactes</strong>, jours fériés compris, et des preuves conservées.</li>
<li>La <strong>confidentialité</strong> des informations sur les départs et la <strong>limite de délégation</strong> : l'assistant RH prépare, la responsable RH valide et signe.</li>
</ul>
`,
      },
    ],
  },
];
