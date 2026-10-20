import type { CourseChapter } from "../courseContent";

export const ARH41366_PARTIE3: CourseChapter[] = [
  {
    title: "Chapitre 5 – CP2 : Assurer la gestion des variables et paramètres de paie",
    description: "Ce chapitre couvre la compétence professionnelle n° 2 du titre (bloc BC01 / CCP1) : dans le respect de la réglementation sociale et des règles de confidentialité, collecter, contrôler et transmettre les éléments variables de paie pour contribuer à la production mensuelle des bulletins dans les délais. Vous y apprendrez à situer le rôle de l'assistant(e) RH dans un processus de paie internalisé ou externalisé (cas d'ALTÉA SERVICES, dont la paie est produite sur Silae par un cabinet d'expertise comptable), à tenir un calendrier de paie et une date de clôture des variables, à lire et contrôler un bulletin (présentation simplifiée, mentions obligatoires, dématérialisation, conservation), à fiabiliser les paramètres individuels (contrat, classification conventionnelle IDCC 3043, salaire de base, durée du travail, taux de prélèvement à la source, complémentaire santé et prévoyance, dispenses d'adhésion) et à valoriser les éléments variables : heures supplémentaires et complémentaires, primes, avantages en nature, absences, congés payés, arrêts de travail et subrogation, acomptes et avances, saisies et cessions, titres-restaurant, frais de transport et notes de frais. Il présente aussi la tenue du dossier paie numérisé, le classement protégé, la DSN mensuelle et événementielle, et se termine par un quiz et un cas pratique chiffré corrigé.",
    sections: [
      {
        title: "5.1 – Le rôle de l'assistant(e) RH dans le processus de paie",
        content: `
<h3>Ce que dit le référentiel</h3>
<p>Le référentiel emploi-activités-compétences du titre (REAC TP-01284) décrit ainsi la compétence n° 2 : <em>« Dans le respect de la règlementation sociale en vigueur et des règles de confidentialité, collecter et saisir des éléments variables de paie pour contribuer à la production mensuelle des bulletins de paie dans le respect des délais. Recueillir les informations individuelles nécessaires telles que les primes, les acomptes, les oppositions sur salaire, les éléments concernant la complémentaire santé et la prévoyance et valoriser les évènements liés au temps de travail du personnel. Contrôler les dates de congés payés, les diverses absences et les incidences des arrêts de travail. »</em></p>
<p>Quatre critères de performance seront observés lors de la mise en situation professionnelle et des évaluations en cours de formation :</p>
<ol>
<li><strong>Les éléments variables collectifs et individuels du mois sont collectés</strong> (exhaustivité : aucun événement oublié, aucun salarié omis) ;</li>
<li><strong>Les bulletins de paie sont conformes aux paramètres individuels de paie</strong> (le bon salaire, le bon temps de travail, la bonne mutuelle, le bon taux de prélèvement à la source…) ;</li>
<li><strong>Les règles de confidentialité sont respectées</strong> (accès restreints, transmissions sécurisées, discrétion) ;</li>
<li><strong>Les échéances sont respectées</strong> (date de clôture des variables, date de paiement, échéances DSN).</li>
</ol>
<p>Retenez que l'assistant(e) RH n'est pas le « gestionnaire de paie » : il ou elle <strong>prépare, fiabilise et transmet</strong> les données, puis <strong>contrôle</strong> le résultat. La production du bulletin, le paramétrage des cotisations et la DSN relèvent d'un service spécialisé interne ou externe. Mais la qualité du bulletin dépend à 80 % de la qualité des données d'entrée : une prime oubliée, une absence mal codée ou un changement d'adresse non transmis produisent un bulletin faux, quel que soit le talent du gestionnaire.</p>

<h3>Paie internalisée ou externalisée</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Organisation</th><th>Qui produit la paie ?</th><th>Rôle de l'assistant(e) RH</th><th>Points de vigilance</th></tr>
<tr><td><strong>Paie internalisée</strong></td><td>Un gestionnaire de paie salarié de l'entreprise, sur un logiciel acquis ou en mode SaaS (Silae, Sage, ADP, Cegid, PayFit…)</td><td>Collecte des variables, saisie directe possible dans le logiciel, contrôle des bulletins avant validation, archivage, réponse aux questions des salariés</td><td>Séparation des tâches (celui qui saisit ne valide pas seul), gestion des habilitations du logiciel, veille sur les taux</td></tr>
<tr><td><strong>Paie externalisée</strong> (expert-comptable, prestataire de paie)</td><td>Le cabinet, qui détient le paramétrage et dépose la DSN par délégation</td><td>Interlocuteur unique du cabinet : transmission du tableau de variables et des pièces justificatives à date fixe, contrôle des bulletins « brouillons », diffusion, classement</td><td>Lettre de mission (qui fait quoi, quelles dates), canal de transmission sécurisé, traçabilité des échanges, délai de correction</td></tr>
<tr><td><strong>Organisation mixte</strong></td><td>Saisie des variables en interne (souvent via le SIRH), calcul et DSN par le prestataire</td><td>Saisie des absences et des éléments variables dans le SIRH, export vers le logiciel de paie, contrôle de l'interface</td><td>Contrôle de l'import (lignes rejetées), cohérence des codes absences entre SIRH et logiciel de paie</td></tr>
</table>

<h3>Le cas d'ALTÉA SERVICES</h3>
<p>ALTÉA SERVICES, SAS de propreté et de services aux entreprises installée à Créteil, emploie 148 salariés relevant de la convention collective nationale des entreprises de propreté et services associés (IDCC 3043). Sa paie est <strong>externalisée</strong> auprès d'un cabinet d'expertise comptable qui travaille sur <strong>Silae</strong>. En interne :</p>
<ul>
<li><strong>Nathalie ROUSSEL</strong>, responsable RH, valide les éléments sensibles (primes exceptionnelles, ruptures, saisies) et signe le bon à payer ;</li>
<li><strong>Karim BENSAÏD</strong>, gestionnaire paie, est l'interlocuteur technique du cabinet, contrôle les bulletins et prépare les virements ;</li>
<li><strong>l'apprenti(e) assistant(e) RH</strong> collecte les variables auprès des chefs d'équipe et des chefs de site, extrait les absences de Lucca, prépare le tableau de variables, rassemble les justificatifs, met à jour le dossier paie numérisé de chaque salarié et répond en première ligne aux questions simples.</li>
</ul>

<h3>Le flux de la paie, de l'événement au virement</h3>
<ol>
<li><strong>Événement</strong> : un salarié fait des heures supplémentaires, tombe malade, reçoit une saisie, change d'adresse, de mutuelle ou de temps de travail ;</li>
<li><strong>Remontée</strong> : le chef de site déclare les heures dans Lucca, le salarié transmet son arrêt, le commissaire de justice adresse l'acte de saisie à l'employeur ;</li>
<li><strong>Collecte et contrôle</strong> par l'assistant(e) RH : vérification de la pièce, de la période, du montant, de la cohérence ;</li>
<li><strong>Transmission</strong> au cabinet avant la date de clôture, via la plateforme sécurisée ;</li>
<li><strong>Calcul</strong> par le cabinet sur Silae et envoi des bulletins brouillons et du journal de paie ;</li>
<li><strong>Contrôle</strong> par l'équipe RH (rapprochement variables / bulletins, contrôles de cohérence) ;</li>
<li><strong>Validation</strong> (bon à payer signé par la responsable RH) ;</li>
<li><strong>Paiement</strong> des salaires par virement, <strong>diffusion</strong> des bulletins (coffre-fort électronique ou papier) ;</li>
<li><strong>Déclaration</strong> : DSN mensuelle déposée par le cabinet sur net-entreprises ;</li>
<li><strong>Archivage</strong> et mise à jour du dossier paie numérisé.</li>
</ol>

<h3>Les compétences mobilisées</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Savoir-faire du référentiel</th><th>Traduction concrète chez ALTÉA SERVICES</th></tr>
<tr><td>Identifier les documents individuels nécessaires pour justifier les données de la paie</td><td>Savoir qu'une prime exceptionnelle exige une décision écrite signée, qu'un arrêt maladie exige le volet 3 de l'avis d'arrêt, qu'une saisie exige l'acte du commissaire de justice</td></tr>
<tr><td>Assurer la bonne prise en compte des paramètres individuels de paie</td><td>Vérifier que l'avenant de passage à temps partiel a été transmis et que l'horaire de Silae a été modifié au bon mois</td></tr>
<tr><td>Tenir un dossier paie numérisé pour chaque salarié</td><td>Arborescence normée, nommage des fichiers, versionnement</td></tr>
<tr><td>Appliquer un système de classement protégé des dossiers de paie</td><td>Dossiers à accès restreint, mot de passe, journalisation</td></tr>
<tr><td>Garantir la confidentialité du processus de la paie</td><td>Pas de bulletin envoyé par messagerie non chiffrée, pas d'écran visible, pas de discussion de salaires en open space</td></tr>
<tr><td>Rechercher des informations dans la documentation professionnelle</td><td>Consulter le Code du travail, la CCN 3043, urssaf.fr, service-public.fr, le BOSS (Bulletin officiel de la sécurité sociale)</td></tr>
<tr><td>Obtenir les informations nécessaires pour une actualisation des données collectives et individuelles</td><td>Suivre les avenants de la CCN (revalorisation des minima), les nouveaux taux PAS transmis par la DGFiP, les changements de contrat de mutuelle</td></tr>
</table>
<blockquote><strong>À retenir :</strong> l'assistant(e) RH est le garant de la qualité des données d'entrée de la paie. Exhaustivité, justification, confidentialité et respect des délais sont les quatre réflexes évalués au titre.</blockquote>
`,
      },
      {
        title: "5.2 – Le calendrier mensuel de paie et la date de clôture des variables",
        content: `
<h3>Pourquoi un calendrier ?</h3>
<p>La paie est un processus <strong>à échéance fixe</strong> : le salaire doit être payé au moins une fois par mois aux salariés mensualisés (article L3242-1 du Code du travail), à date régulière, et la DSN doit être déposée à une date imposée. Tout retard a un coût : mécontentement des salariés, frais bancaires pour eux, pénalités de retard pour l'entreprise en cas de DSN tardive. Le calendrier de paie fixe donc, pour chaque mois, les dates de chaque étape et le responsable de chacune.</p>

<h3>Les échéances de la DSN mensuelle</h3>
<p>La DSN mensuelle doit être transmise :</p>
<ul>
<li>au plus tard le <strong>5 du mois suivant</strong> la période d'emploi pour les employeurs d'au moins 50 salariés qui versent les salaires au cours du même mois que la période de travail ;</li>
<li>au plus tard le <strong>15 du mois suivant</strong> dans les autres cas.</li>
</ul>
<p>ALTÉA SERVICES (148 salariés, salaires versés le dernier jour ouvré du mois) relève donc de l'échéance du <strong>5</strong>. Si le 5 tombe un samedi, un dimanche ou un jour férié, l'échéance est reportée au premier jour ouvré suivant. Les règles d'exigibilité sont rappelées sur urssaf.fr et net-entreprises.fr : vérifiez-les chaque année.</p>

<h3>La date de clôture des variables</h3>
<p>La <strong>date de clôture des variables</strong> est la date au-delà de laquelle un événement du mois n'est plus intégré dans la paie du mois mais reporté sur la paie suivante (on parle de <em>décalage de paie</em> pour les variables). Elle est fixée par la lettre de mission du cabinet ou par la procédure interne. Plus la paie est versée tôt, plus la clôture est précoce : les heures et absences des derniers jours du mois sont alors régularisées le mois suivant.</p>
<p>Chez ALTÉA SERVICES, la clôture est fixée au <strong>20 du mois</strong> : les heures supplémentaires et absences du 21 au 31 sont payées ou retenues sur la paie du mois suivant. Ce principe doit être expliqué aux salariés et appliqué de manière constante.</p>

<h3>Calendrier type d'ALTÉA SERVICES (mois M)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Date</th><th>Étape</th><th>Responsable</th><th>Livrable</th></tr>
<tr><td>Du 1er au 15</td><td>Saisie au fil de l'eau dans Lucca des absences, congés, heures et arrêts ; réception des pièces</td><td>Chefs de site, salariés, apprenti(e) ARH</td><td>Données à jour dans le SIRH</td></tr>
<tr><td>Le 16</td><td>Relance des chefs de site pour les déclarations d'heures manquantes</td><td>Apprenti(e) ARH</td><td>Courriel de relance</td></tr>
<tr><td>Le 20 (clôture)</td><td>Arrêt des variables, extraction Lucca, constitution du tableau de variables</td><td>Apprenti(e) ARH</td><td>Tableau de variables M + dossier des justificatifs</td></tr>
<tr><td>Le 21</td><td>Contrôle du tableau, validation des primes et éléments sensibles</td><td>Karim BENSAÏD, Nathalie ROUSSEL</td><td>Tableau validé</td></tr>
<tr><td>Le 22</td><td>Transmission au cabinet sur la plateforme sécurisée</td><td>Karim BENSAÏD</td><td>Accusé de dépôt</td></tr>
<tr><td>Le 25</td><td>Réception des bulletins brouillons et du journal de paie</td><td>Cabinet</td><td>Bulletins provisoires</td></tr>
<tr><td>Le 25 et le 26</td><td>Contrôle des bulletins, demandes de correction</td><td>Équipe RH</td><td>Liste des anomalies</td></tr>
<tr><td>Le 27</td><td>Bulletins définitifs, bon à payer, préparation du fichier de virement</td><td>Nathalie ROUSSEL, Karim BENSAÏD</td><td>Bon à payer signé</td></tr>
<tr><td>Dernier jour ouvré</td><td>Virement des salaires, mise à disposition des bulletins</td><td>Comptabilité, cabinet</td><td>Salaires payés</td></tr>
<tr><td>Le 5 de M+1</td><td>Dépôt de la DSN de M, paiement des cotisations</td><td>Cabinet</td><td>Accusé de réception DSN</td></tr>
<tr><td>Du 5 au 10 de M+1</td><td>Classement, archivage, mise à jour des dossiers paie numérisés</td><td>Apprenti(e) ARH</td><td>Dossiers à jour</td></tr>
</table>

<h3>Construire le calendrier annuel</h3>
<p>En début d'année, l'assistant(e) RH prépare le calendrier des douze paies dans un tableur :</p>
<ol>
<li>Lister les dates de paiement (dernier jour ouvré de chaque mois), en tenant compte des jours fériés (1er mai, 8 mai, Ascension, 14 juillet, 15 août, 1er et 11 novembre, 25 décembre…) ;</li>
<li>Remonter les dates de clôture, de transmission, de contrôle et de bon à payer en jours ouvrés ;</li>
<li>Anticiper les mois particuliers : <strong>décembre</strong> (fêtes, primes de fin d'année, régularisations annuelles), <strong>mai</strong> (nombreux jours fériés), <strong>août</strong> (congés de l'équipe RH et du cabinet), <strong>juin</strong> (fin de la période de référence des congés payés, au 31 mai par défaut) ;</li>
<li>Faire valider le calendrier par la responsable RH et le cabinet, puis le diffuser aux chefs de site ;</li>
<li>Insérer des rappels automatiques dans les agendas partagés.</li>
</ol>

<h3>Les événements qui arrivent après la clôture</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Situation</th><th>Traitement</th></tr>
<tr><td>Absence non justifiée constatée le 26</td><td>Retenue sur la paie de M+1 (ou rappel si l'absence est ensuite justifiée et rémunérée)</td></tr>
<tr><td>Heures supplémentaires effectuées les 28 et 29</td><td>Paiement sur la paie de M+1 ; elles restent rattachées à la période réelle pour le contrôle de la durée du travail</td></tr>
<tr><td>Départ d'un salarié le 30</td><td>Le solde de tout compte ne peut pas attendre : paie de sortie traitée spécifiquement avec le cabinet (bulletin de sortie, certificat de travail, attestation France Travail via DSN)</td></tr>
<tr><td>Erreur découverte après le virement</td><td>Régularisation sur la paie suivante, ou virement complémentaire immédiat si l'erreur pénalise lourdement le salarié</td></tr>
</table>
<blockquote><strong>Bonne pratique :</strong> chaque report ou régularisation est noté dans une colonne « Commentaire / régularisation » du tableau de variables, afin que le mois suivant n'oublie rien. Une régularisation non tracée est une régularisation qui se perd.</blockquote>
`,
      },
      {
        title: "5.3 – Le bulletin de paie : structure, mentions obligatoires, dématérialisation et conservation",
        content: `
<h3>Le principe</h3>
<p>Lors du paiement du salaire, l'employeur remet au salarié une pièce justificative appelée bulletin de paie (article L3243-2 du Code du travail). Ses mentions sont fixées par l'article <strong>R3243-1</strong> ; certaines mentions sont interdites (R3243-4 : ni l'exercice du droit de grève, ni l'activité de représentant du personnel ne doivent apparaître). Depuis 2018, tous les employeurs utilisent une <strong>présentation simplifiée</strong> (arrêté du 25 février 2016 modifié) qui regroupe les cotisations par risque couvert. Depuis le 1er juillet 2023, le bulletin affiche aussi le <strong>montant net social</strong>, qui sert de base aux déclarations de ressources pour la prime d'activité et le RSA.</p>

<h3>La structure d'un bulletin simplifié</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Bloc</th><th>Contenu</th><th>Ce que vérifie l'assistant(e) RH</th></tr>
<tr><td>En-tête employeur</td><td>Raison sociale, adresse, SIRET, code APE (NAF), référence de l'organisme de recouvrement des cotisations</td><td>Identité de l'établissement de rattachement du salarié</td></tr>
<tr><td>En-tête salarié</td><td>Nom, emploi, position dans la classification conventionnelle (niveau, échelon, coefficient), date d'entrée</td><td>Concordance avec le contrat et le dernier avenant</td></tr>
<tr><td>Convention collective</td><td>Intitulé de la convention applicable (ici CCN des entreprises de propreté et services associés)</td><td>Présence de l'intitulé</td></tr>
<tr><td>Période et durée</td><td>Période de paie, nombre d'heures (en distinguant heures normales et heures majorées), forfait jours le cas échéant</td><td>Concordance avec le contrat et les heures du mois</td></tr>
<tr><td>Rémunération brute</td><td>Salaire de base, heures supplémentaires, primes, avantages en nature, absences, indemnités de congés payés</td><td>Rapprochement avec le tableau de variables</td></tr>
<tr><td>Cotisations et contributions sociales</td><td>Regroupées par risque : santé, accidents du travail, retraite, famille, assurance chômage, autres contributions, CSG et CRDS ; base, taux et montant salarial, montant patronal</td><td>Cohérence d'ensemble (le détail des taux relève du gestionnaire de paie)</td></tr>
<tr><td>Exonérations et allègements</td><td>Montant total des exonérations et allègements de cotisations</td><td>Présence de la ligne</td></tr>
<tr><td>Net</td><td>Net à payer avant impôt sur le revenu, montant net social, impôt prélevé à la source (base, taux, montant), net payé</td><td>Taux PAS, net payé = virement</td></tr>
<tr><td>Pied de bulletin</td><td>Date de paiement, total versé par l'employeur (coût du travail), droits à congés (acquis, pris, restants), mention de conservation sans limitation de durée et lien vers le portail mesdroitssociaux.gouv.fr</td><td>Soldes de congés conformes à Lucca</td></tr>
</table>

<h3>Exemple simplifié de bulletin (ALTÉA SERVICES)</h3>
<p>Salariée : <strong>Sophie MARCHAND</strong>, agente de propreté qualifiée, temps plein (151,67 heures), salaire de base contractuel 1 900,00 € brut, mois de mars, 6 heures supplémentaires à 25 %, prime d'assiduité conventionnelle ou d'usage de 40,00 €, aucune absence.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Élément</th><th>Base</th><th>Taux</th><th>Montant</th></tr>
<tr><td>Salaire de base</td><td>151,67 h</td><td>12,527 €</td><td>1 900,00 €</td></tr>
<tr><td>Heures supplémentaires majorées à 25 %</td><td>6 h</td><td>15,659 €</td><td>93,95 €</td></tr>
<tr><td>Prime d'assiduité</td><td></td><td></td><td>40,00 €</td></tr>
<tr><td><strong>Salaire brut</strong></td><td></td><td></td><td><strong>2 033,95 €</strong></td></tr>
<tr><td>Cotisations et contributions salariales (total illustratif)</td><td></td><td></td><td>calculées par Silae</td></tr>
<tr><td>Réduction de cotisations salariales sur heures supplémentaires</td><td>93,95 €</td><td></td><td>calculée par Silae</td></tr>
<tr><td>Net à payer avant impôt</td><td></td><td></td><td>calculé par Silae</td></tr>
<tr><td>Impôt sur le revenu prélevé à la source</td><td>net fiscal</td><td>taux transmis par la DGFiP</td><td>calculé par Silae</td></tr>
</table>
<p>Le taux horaire est obtenu en divisant le salaire mensuel par la durée mensuelle : 1 900,00 / 151,67 = 12,527 €. Le taux majoré vaut 12,527 × 1,25 = 15,659 € ; 6 heures donnent 93,95 €. Le contrôle de l'assistant(e) RH porte sur les éléments du brut ; le calcul des cotisations est vérifié par le gestionnaire de paie. Pour ce mois, il faut aussi vérifier que les heures supplémentaires sont bien isolées : elles ouvrent droit à une réduction de cotisations salariales et sont exonérées d'impôt sur le revenu dans la limite d'un plafond annuel (7 500 € net, à vérifier chaque année sur service-public.fr).</p>

<h3>Le bulletin dématérialisé et le droit d'opposition</h3>
<p>L'employeur peut remettre le bulletin <strong>sous forme électronique</strong>, sauf opposition du salarié (article L3243-2). Les règles pratiques (articles D3243-7 et D3243-8) :</p>
<ul>
<li>le salarié est informé, au moins un mois avant la première émission électronique ou lors de l'embauche, de son droit de s'opposer ;</li>
<li>il peut s'opposer <strong>à tout moment</strong>, avant ou après la première émission, et l'opposition prend effet dans les meilleurs délais, au plus tard trois mois après ;</li>
<li>l'employeur garantit la disponibilité du bulletin électronique pendant <strong>50 ans</strong> ou jusqu'à ce que le salarié ait atteint l'âge de <strong>75 ans</strong>, par un service en ligne associé au compte personnel d'activité ou par un service équivalent (coffre-fort électronique) ;</li>
<li>il garantit l'intégrité, la disponibilité et la confidentialité des données.</li>
</ul>
<p>Chez ALTÉA SERVICES, les bulletins sont déposés dans un coffre-fort électronique. Deux agentes de propreté ont exercé leur droit d'opposition : leurs bulletins sont imprimés et remis en main propre sous enveloppe fermée portant la mention « Personnel et confidentiel ». L'assistant(e) RH tient à jour la liste des oppositions et l'archive de chaque courrier d'opposition dans le dossier du salarié.</p>

<h3>La conservation</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Qui ?</th><th>Durée</th><th>Fondement</th></tr>
<tr><td>Employeur : double des bulletins (papier ou électronique)</td><td>5 ans</td><td>Article L3243-4 du Code du travail</td></tr>
<tr><td>Employeur : bulletins électroniques mis à disposition</td><td>50 ans ou jusqu'aux 75 ans du salarié</td><td>Article D3243-8</td></tr>
<tr><td>Employeur : documents servant au calcul des cotisations (journaux de paie, DSN, justificatifs)</td><td>Au moins 6 ans (pièces comptables : 10 ans en pratique, article L123-22 du Code de commerce)</td><td>Livre des procédures fiscales, Code de commerce ; durées à confirmer avec l'expert-comptable</td></tr>
<tr><td>Salarié</td><td>Sans limitation de durée</td><td>Mention obligatoire du bulletin ; utile pour la retraite</td></tr>
</table>
<blockquote><strong>Piège classique :</strong> remettre le bulletin d'un salarié à un collègue « qui passe le lui donner », ou l'envoyer sur une adresse électronique partagée. Le bulletin contient des données personnelles (salaire, absences, saisies, taux d'imposition) : il ne doit être remis qu'à son titulaire.</blockquote>
`,
      },
      {
        title: "5.4 – Les paramètres individuels de paie",
        content: `
<h3>Paramètres et variables : la distinction</h3>
<p>Les <strong>paramètres individuels</strong> (ou données permanentes) sont les informations stables qui servent à calculer chaque bulletin tant qu'elles ne changent pas : identité, contrat, classification, salaire de base, durée du travail, taux de prélèvement à la source, affiliations santé et prévoyance, coordonnées bancaires. Les <strong>éléments variables</strong> changent d'un mois à l'autre (heures supplémentaires, absences, primes ponctuelles…). Une erreur de paramètre se répète tous les mois tant qu'elle n'est pas corrigée : elle est donc plus coûteuse qu'une erreur de variable.</p>

<h3>La fiche de paramètres individuels</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Donnée</th><th>Pièce justificative</th></tr>
<tr><td>Identité</td><td>Nom de naissance et d'usage, prénoms, NIR (numéro de sécurité sociale), date et lieu de naissance, nationalité, adresse</td><td>Pièce d'identité, attestation de droits à l'assurance maladie, titre de séjour autorisant à travailler le cas échéant</td></tr>
<tr><td>Contrat</td><td>Nature (CDI, CDD et motif, apprentissage, professionnalisation), date d'entrée, période d'essai, date de fin pour un CDD</td><td>Contrat signé, avenants, DPAE</td></tr>
<tr><td>Emploi et classification</td><td>Intitulé de poste, statut (ouvrier, employé, agent de maîtrise, cadre), niveau et échelon dans la grille de la CCN 3043</td><td>Contrat, avenant, grille conventionnelle en vigueur</td></tr>
<tr><td>Rémunération</td><td>Salaire de base mensuel ou taux horaire, primes contractuelles ou conventionnelles permanentes</td><td>Contrat, avenant, accord salarial, avenant de salaires de la CCN</td></tr>
<tr><td>Temps de travail</td><td>Durée hebdomadaire et mensuelle, temps plein ou partiel, répartition des horaires, forfait jours éventuel</td><td>Contrat, avenant, accord d'aménagement du temps de travail</td></tr>
<tr><td>Fiscalité</td><td>Taux de prélèvement à la source (PAS) personnalisé, ou taux non personnalisé (grille)</td><td>Compte rendu métier (CRM) de la DGFiP reçu via la DSN</td></tr>
<tr><td>Protection sociale</td><td>Affiliation à la complémentaire santé (seul, famille), dispense éventuelle, affiliation prévoyance, caisse de retraite complémentaire</td><td>Bulletin d'adhésion, demande de dispense et justificatif</td></tr>
<tr><td>Paiement</td><td>Coordonnées bancaires (IBAN) au nom du salarié</td><td>RIB ; toute modification vérifiée par un contre-appel</td></tr>
<tr><td>Situations particulières</td><td>Travailleur handicapé reconnu, temps partiel thérapeutique, saisie ou cession en cours, mandat de représentant du personnel</td><td>Décision RQTH, prescription médicale et accord CPAM, acte de saisie</td></tr>
</table>

<h3>Le salaire de base et la classification</h3>
<p>Le salaire de base ne peut être inférieur ni au <strong>SMIC</strong> ni au <strong>salaire minimum conventionnel</strong> correspondant à la classification du salarié. Pour mémoire, le SMIC horaire brut était de <strong>11,88 €</strong> au 1er novembre 2024, soit <strong>1 801,80 €</strong> brut mensuel pour 151,67 heures, valeur en vigueur en 2025 ; le SMIC est revalorisé au moins chaque 1er janvier : <em>la valeur applicable en 2026 est à vérifier sur service-public.fr</em>. Les minima de la CCN 3043 sont fixés par avenant de salaires : lorsque la grille est revalorisée, l'assistant(e) RH repère les salariés dont le salaire de base devient inférieur au nouveau minimum de leur niveau et prépare la mise à jour, à effet de la date d'entrée en vigueur de l'avenant (ou de son extension s'il n'est applicable qu'à compter de celle-ci).</p>

<h3>Le temps de travail</h3>
<p>La durée légale est de 35 heures par semaine (article L3121-27), soit 151,67 heures par mois après mensualisation (35 × 52 / 12). Pour un temps partiel, la durée contractuelle mensuelle se calcule de la même manière : 24 heures par semaine × 52 / 12 = <strong>104 heures</strong> par mois. La durée minimale du temps partiel est de 24 heures par semaine sauf dérogations (demande écrite et motivée du salarié, accord de branche étendu prévoyant une durée inférieure, étudiants de moins de 26 ans…) : les entreprises de propreté recourent beaucoup au temps partiel, il faut donc vérifier les règles de branche en vigueur.</p>

<h3>Le taux de prélèvement à la source</h3>
<p>Depuis 2019, l'employeur prélève l'impôt sur le revenu sur le salaire net imposable en appliquant le taux transmis par l'administration fiscale dans le <strong>compte rendu métier</strong> (CRM) consécutif au dépôt de la DSN. En l'absence de taux transmis (nouvel embauché non encore connu), l'employeur applique le <strong>taux non personnalisé</strong> issu d'une grille légale fonction du montant de la rémunération. L'employeur n'a pas à expliquer ni à modifier le taux : le salarié qui conteste son taux s'adresse à l'administration fiscale (espace particulier sur impots.gouv.fr). Le taux est une donnée confidentielle : il révèle une partie de la situation fiscale du foyer.</p>

<h3>La complémentaire santé et la prévoyance</h3>
<p>Tout employeur du secteur privé doit faire bénéficier ses salariés d'une <strong>couverture collective obligatoire de frais de santé</strong> (article L911-7 du Code de la sécurité sociale) avec un panier de soins minimal et une participation de l'employeur au moins égale à <strong>50 %</strong> de la cotisation. Pour les cadres, l'employeur doit en outre financer une <strong>prévoyance</strong> à hauteur de 1,50 % de la tranche 1 de rémunération, affectée en priorité au décès (accord national interprofessionnel du 17 novembre 2017). La branche de la propreté prévoit des garanties de prévoyance et de santé conventionnelles : leurs taux et répartitions figurent dans les accords de branche, à vérifier lors de chaque renouvellement.</p>

<h3>Les dispenses d'adhésion à la mutuelle</h3>
<p>Certains salariés peuvent, à leur initiative et par écrit, demander une dispense d'adhésion. Les cas de dispense de droit sont prévus par les articles L911-7-1 et D911-2 du Code de la sécurité sociale ; d'autres peuvent être prévus par l'acte instaurant le régime (accord ou décision unilatérale), article R242-1-6.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Cas de dispense</th><th>Justificatif à demander</th><th>Durée</th></tr>
<tr><td>Salarié couvert à titre obligatoire comme ayant droit par le contrat collectif de son conjoint</td><td>Attestation de l'organisme du conjoint mentionnant la couverture obligatoire de l'ayant droit</td><td>À justifier chaque année</td></tr>
<tr><td>Bénéficiaire de la complémentaire santé solidaire (CSS)</td><td>Attestation de droits</td><td>Jusqu'à la fin des droits</td></tr>
<tr><td>Salarié couvert par un contrat individuel au moment de l'embauche ou de la mise en place du régime</td><td>Copie de l'échéancier ou attestation du contrat individuel</td><td>Jusqu'à l'échéance du contrat individuel</td></tr>
<tr><td>Salariés en CDD ou contrat de mission (selon conditions de durée et de couverture prévues par les textes)</td><td>Demande écrite, justificatif de couverture le cas échéant</td><td>Durée du contrat</td></tr>
<tr><td>Salariés à temps partiel dont la cotisation représenterait au moins 10 % de la rémunération brute (si prévu par l'acte fondateur)</td><td>Demande écrite</td><td>Tant que la condition est remplie</td></tr>
<tr><td>Salariés présents lors de la mise en place du régime par décision unilatérale et cotisant (cas de l'article 11 de la loi Évin)</td><td>Demande écrite</td><td>Durée du contrat</td></tr>
</table>
<p>La dispense doit être <strong>demandée par écrit par le salarié</strong>, avec les justificatifs : à défaut, le salarié est affilié et la dispense ne peut pas être opposée en cas de contrôle URSSAF (risque de redressement sur la part patronale). L'assistant(e) RH tient un tableau de suivi des dispenses avec la date d'échéance de chaque justificatif et relance avant expiration.</p>

<h3>Procédure de mise à jour d'un paramètre</h3>
<ol>
<li>Recevoir la pièce (avenant signé, attestation, RIB) et vérifier son authenticité et sa complétude ;</li>
<li>Identifier la date d'effet et le mois de paie concerné ;</li>
<li>Mettre à jour la fiche du salarié dans Lucca et l'inscrire dans le tableau de variables, rubrique « Modifications de paramètres » ;</li>
<li>Joindre la pièce au dossier paie numérisé ;</li>
<li>Contrôler sur le bulletin suivant que la modification a été prise en compte (et, en cas d'effet rétroactif, que le rappel a été calculé).</li>
</ol>
<blockquote><strong>Exemple ALTÉA :</strong> Moussa DIALLO passe de 24 h à 30 h par semaine au 1er avril par avenant signé le 18 mars. La durée mensuelle devient 30 × 52 / 12 = 130 heures. L'avenant est transmis au cabinet avant la clôture du 20 mars : la modification n'a pas d'effet sur la paie de mars mais doit apparaître sur le bulletin d'avril (130 heures). Le contrôle d'avril vérifie le nombre d'heures et le nouveau salaire de base.</blockquote>
`,
      },
      {
        title: "5.5 – Les éléments variables liés au temps de travail et à la rémunération : heures, primes, avantages en nature",
        content: `
<h3>Les heures supplémentaires (salariés à temps plein)</h3>
<p>Sont des heures supplémentaires les heures accomplies <strong>au-delà de la durée légale de 35 heures par semaine</strong> (ou de la durée équivalente), à la demande de l'employeur ou avec son accord au moins implicite. Elles se décomptent <strong>par semaine civile</strong> (du lundi 0 h au dimanche 24 h, sauf accord fixant une autre période de sept jours), sauf aménagement du temps de travail sur une période supérieure à la semaine.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Règle</th><th>Contenu</th><th>Référence</th></tr>
<tr><td>Majoration fixée par accord</td><td>Un accord d'entreprise ou, à défaut, de branche fixe le taux, qui ne peut être inférieur à 10 %</td><td>Article L3121-33</td></tr>
<tr><td>Majoration à défaut d'accord</td><td><strong>25 %</strong> pour les 8 premières heures (de la 36e à la 43e heure), <strong>50 %</strong> au-delà (à partir de la 44e heure)</td><td>Article L3121-36</td></tr>
<tr><td>Contingent annuel</td><td>Fixé par accord ; à défaut <strong>220 heures</strong> par salarié et par an. Au-delà : contrepartie obligatoire en repos et consultation du CSE</td><td>Articles L3121-30, D3121-24</td></tr>
<tr><td>Repos compensateur de remplacement</td><td>Paiement remplacé, en tout ou partie, par un repos équivalent (majoration comprise), si un accord le prévoit</td><td>Article L3121-33</td></tr>
<tr><td>Durées maximales</td><td>10 h par jour, 48 h sur une semaine, 44 h en moyenne sur 12 semaines consécutives (sauf dérogations)</td><td>Articles L3121-18, L3121-20, L3121-22</td></tr>
<tr><td>Régime social et fiscal</td><td>Réduction de cotisations salariales d'assurance vieillesse, exonération d'impôt sur le revenu dans la limite d'un plafond annuel, déduction forfaitaire de cotisations patronales selon l'effectif</td><td>Article L241-17 du Code de la sécurité sociale, article 81 quater du CGI ; plafonds et montants à vérifier chaque année</td></tr>
</table>
<p><strong>Exemple chiffré.</strong> Lors de la semaine du 9 au 15 mars, Sophie MARCHAND (taux horaire 12,527 €) a travaillé 45 heures pour remplacer une collègue sur un site client. En l'absence d'accord fixant un autre taux (hypothèse pédagogique ; la CCN et les accords d'ALTÉA sont à consulter) :</p>
<ul>
<li>heures 36 à 43 : 8 h × 12,527 × 1,25 = 8 × 15,659 = <strong>125,27 €</strong> ;</li>
<li>heures 44 et 45 : 2 h × 12,527 × 1,50 = 2 × 18,791 = <strong>37,58 €</strong> ;</li>
<li>total à payer au titre des heures supplémentaires de la semaine : <strong>162,85 €</strong> (en plus du salaire de base mensualisé, qui rémunère déjà les 35 premières heures).</li>
</ul>
<p>Le tableau de variables doit distinguer les heures à 25 % et à 50 %, et mentionner la semaine concernée, car le décompte est hebdomadaire : 45 heures une semaine et 30 heures la semaine suivante ne se compensent pas (sauf aménagement pluri-hebdomadaire).</p>

<h3>Les heures complémentaires (salariés à temps partiel)</h3>
<p>Les heures effectuées par un salarié à temps partiel au-delà de sa durée contractuelle sont des <strong>heures complémentaires</strong>. Elles ne peuvent pas porter la durée du travail au niveau de la durée légale.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Tranche</th><th>Limite</th><th>Majoration</th></tr>
<tr><td>Jusqu'à 1/10e de la durée contractuelle</td><td>Limite légale de principe (article L3123-28)</td><td><strong>10 %</strong> dès la première heure (article L3123-29)</td></tr>
<tr><td>Au-delà de 1/10e et jusqu'à 1/3 de la durée contractuelle</td><td>Seulement si un accord de branche étendu ou d'entreprise le prévoit (article L3123-20)</td><td><strong>25 %</strong> à défaut d'accord (article L3123-29) ; un accord peut prévoir un taux différent, au moins 10 % (article L3123-21)</td></tr>
</table>
<p><strong>Exemple chiffré.</strong> Aïcha TRAORÉ, agente de propreté à 104 heures par mois (24 h par semaine), taux horaire 12,30 €, a effectué 8 heures complémentaires en février. La limite du dixième est de 104 / 10 = 10,4 heures (raisonnement mensuel si le contrat est mensualisé). Les 8 heures sont donc majorées à 10 % : 12,30 × 1,10 = 13,53 € ; 8 × 13,53 = <strong>108,24 €</strong>.</p>
<blockquote><strong>Vigilance :</strong> lorsque l'horaire réellement accompli dépasse de 2 heures au moins par semaine l'horaire contractuel pendant 12 semaines consécutives (ou 12 semaines sur 15), l'horaire contractuel est modifié, sauf opposition du salarié (article L3123-13). L'assistant(e) RH qui voit revenir chaque mois des heures complémentaires sur le même salarié le signale à la responsable RH.</blockquote>

<h3>Les primes et gratifications</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Origine</th><th>Exemples</th><th>Caractère</th><th>Justificatif</th></tr>
<tr><td>Contrat de travail</td><td>Prime d'objectifs, 13e mois contractuel</td><td>Obligatoire selon les conditions du contrat</td><td>Contrat, avenant, grille d'objectifs signée</td></tr>
<tr><td>Convention collective</td><td>Primes prévues par la CCN 3043 (selon les avenants en vigueur, à vérifier)</td><td>Obligatoire dès que les conditions sont remplies</td><td>Texte conventionnel, relevé des conditions</td></tr>
<tr><td>Accord d'entreprise</td><td>Prime de fin d'année, prime de panier, prime de salissure</td><td>Obligatoire</td><td>Accord</td></tr>
<tr><td>Usage</td><td>Prime versée de façon générale, constante et fixe</td><td>Obligatoire tant que l'usage n'est pas dénoncé régulièrement</td><td>Historique de paie, note interne</td></tr>
<tr><td>Décision unilatérale ponctuelle</td><td>Prime exceptionnelle pour un chantier, prime de partage de la valeur</td><td>Selon la décision</td><td>Décision écrite signée de la direction ; pour la PPV, décision unilatérale ou accord et respect des conditions légales en vigueur</td></tr>
</table>
<p>Pour chaque prime, l'assistant(e) RH vérifie : l'<strong>éligibilité</strong> (ancienneté, présence, objectifs atteints), le <strong>montant</strong> (forfait ou pourcentage), la <strong>proratisation</strong> (temps partiel, entrée en cours d'année, absences si le texte le prévoit), le <strong>mois de versement</strong> et la <strong>validation</strong> par la personne habilitée. Le régime social de certaines primes (prime de partage de la valeur notamment) a beaucoup évolué depuis 2022 : vérifier les conditions d'exonération en vigueur sur urssaf.fr avant chaque versement.</p>
<p><strong>Exemple chiffré.</strong> L'accord d'entreprise d'ALTÉA prévoit une prime de fin d'année de 300 € brut pour un temps plein présent toute l'année, proratisée selon le temps de travail. Pour Aïcha TRAORÉ (104 h / 151,67 h), la prime est de 300 × 104 / 151,67 = <strong>205,71 €</strong>. Pour un salarié à temps plein entré le 1er juillet, si l'accord prévoit une proratisation au temps de présence : 300 × 6 / 12 = <strong>150,00 €</strong>.</p>

<h3>Les avantages en nature</h3>
<p>Un avantage en nature est un bien ou un service fourni gratuitement ou à prix réduit par l'employeur pour l'usage privé du salarié. Il entre dans l'assiette des cotisations et du revenu imposable : il est ajouté au brut puis retranché du net (puisqu'il a déjà été « perçu » en nature).</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Avantage</th><th>Évaluation</th><th>Point de contrôle</th></tr>
<tr><td>Nourriture (repas fournis par l'employeur)</td><td>Forfait par repas fixé chaque année (5,45 € par repas en 2025, valeur 2026 à vérifier sur urssaf.fr) ; règles particulières pour les hôtels-cafés-restaurants</td><td>Nombre de repas pris dans le mois</td></tr>
<tr><td>Logement</td><td>Barème forfaitaire selon la rémunération et le nombre de pièces, ou valeur locative réelle</td><td>Bail, nombre de pièces, rémunération du mois</td></tr>
<tr><td>Véhicule de fonction utilisé à titre privé</td><td>Dépenses réelles ou forfait en pourcentage du coût d'achat ou du coût de location ; les règles d'évaluation ont été modifiées en 2025 : barème à vérifier dans le BOSS</td><td>Fiche véhicule (date d'achat, prix TTC, électrique ou non, carburant payé ou non)</td></tr>
<tr><td>Outils numériques (téléphone, ordinateur)</td><td>L'usage privé raisonnable d'un outil professionnel n'est pas un avantage en nature ; un usage privé important peut en constituer un</td><td>Charte informatique</td></tr>
</table>
<p><strong>Exemple chiffré (valeur 2025, à actualiser).</strong> Le chef d'équipe Julien PERRIN prend ses repas à la cantine d'un site client, intégralement payée par ALTÉA, 18 jours en avril : avantage nourriture = 18 × 5,45 = <strong>98,10 €</strong>, ajouté au brut et déduit du net.</p>

<h3>Le temps de travail en dehors du cadre habituel</h3>
<ul>
<li><strong>Travail de nuit, du dimanche ou des jours fériés</strong> : majorations ou repos prévus par la CCN et les accords ; à identifier sur les relevés de chaque site ;</li>
<li><strong>Astreintes</strong> : contrepartie financière ou en repos (article L3121-9) ; les interventions pendant l'astreinte sont du temps de travail effectif ;</li>
<li><strong>Temps de trajet inhabituel</strong> : le temps de déplacement professionnel qui dépasse le temps normal de trajet domicile-travail donne lieu à contrepartie (article L3121-4).</li>
</ul>
<blockquote><strong>Réflexe :</strong> toute heure saisie dans le tableau de variables doit pouvoir être reliée à un relevé validé par le responsable (feuille d'heures, badgeuse, validation dans Lucca). Sans validation, pas de transmission au cabinet : on interroge le responsable avant la clôture.</blockquote>
`,
      },
      {
        title: "5.6 – Absences, congés payés, arrêts de travail et subrogation",
        content: `
<h3>Typologie des absences</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type d'absence</th><th>Effet sur la paie</th><th>Justificatif</th></tr>
<tr><td>Congés payés</td><td>Absence rémunérée par l'indemnité de congés payés</td><td>Demande validée dans Lucca</td></tr>
<tr><td>Jours fériés chômés</td><td>Pas de perte de salaire pour les salariés ayant au moins 3 mois d'ancienneté (article L3133-3) ; 1er mai chômé et payé pour tous (article L3133-5)</td><td>Calendrier</td></tr>
<tr><td>Congés pour événements familiaux (mariage, PACS, naissance, décès…)</td><td>Rémunérés, durées minimales légales (article L3142-4) éventuellement améliorées par la CCN</td><td>Acte d'état civil, faire-part</td></tr>
<tr><td>Maladie, accident du travail, maladie professionnelle</td><td>Suspension du contrat ; IJSS et éventuel maintien de salaire</td><td>Avis d'arrêt de travail (volet employeur)</td></tr>
<tr><td>Maternité, paternité, adoption</td><td>IJSS ; maintien éventuel selon CCN</td><td>Déclaration de grossesse, acte de naissance</td></tr>
<tr><td>Absence autorisée non rémunérée, congé sans solde</td><td>Retenue sur salaire</td><td>Accord écrit</td></tr>
<tr><td>Absence injustifiée</td><td>Retenue sur salaire ; éventuellement procédure disciplinaire</td><td>Constat du responsable, relance écrite</td></tr>
<tr><td>Grève</td><td>Retenue proportionnelle à la durée de l'arrêt de travail ; aucune mention sur le bulletin de l'exercice du droit de grève</td><td>Relevé des grévistes</td></tr>
</table>

<h3>Les méthodes de retenue pour absence (salarié mensualisé)</h3>
<p>Le salaire mensualisé est indépendant du nombre de jours du mois. Pour retenir une absence non rémunérée, plusieurs méthodes existent ; la jurisprudence exige que la retenue soit <strong>strictement proportionnelle</strong> à la durée de l'absence et qu'elle ne pénalise pas le salarié. La méthode des <strong>heures réelles du mois</strong> (horaire réel de travail du mois considéré) est celle qui respecte le mieux ce principe ; la méthode « 151,67 » est simple mais peut aboutir à une retenue supérieure ou inférieure à la proportion exacte. Une même méthode doit être appliquée de manière constante.</p>
<p><strong>Exemple chiffré.</strong> Salaire de base de Sophie MARCHAND : 1 900,00 €. Absence non rémunérée (congé sans solde) de 2 jours, soit 14 heures, en mars. Le mois de mars compte 22 jours ouvrés, soit 154 heures de travail réelles (22 × 7).</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Méthode</th><th>Calcul</th><th>Retenue</th><th>Commentaire</th></tr>
<tr><td>Horaire mensualisé (151,67 h)</td><td>1 900,00 × 14 / 151,67</td><td>175,38 €</td><td>Simple, mais ne tient pas compte de l'horaire réel du mois</td></tr>
<tr><td>Heures réelles du mois</td><td>1 900,00 × 14 / 154</td><td>172,73 €</td><td>Retenue exactement proportionnelle ; méthode à privilégier</td></tr>
<tr><td>Jours ouvrés réels</td><td>1 900,00 × 2 / 22</td><td>172,73 €</td><td>Équivalente ici (horaire régulier de 7 h par jour)</td></tr>
<tr><td>Jours ouvrables réels (du lundi au samedi)</td><td>1 900,00 × 2 / 26</td><td>146,15 €</td><td>Avec un horaire réparti sur 5 jours, cette méthode sous-estime la retenue et n'est pas adaptée</td></tr>
</table>
<p>Une absence couvrant <strong>tout le mois</strong> doit conduire à une rémunération nulle : avec la méthode 151,67 appliquée à un mois de 168 heures réelles, on retiendrait plus que le salaire, d'où l'intérêt de la méthode des heures réelles.</p>

<h3>Les congés payés</h3>
<p><strong>Acquisition.</strong> Le salarié acquiert <strong>2,5 jours ouvrables par mois</strong> de travail effectif, soit 30 jours ouvrables (5 semaines) par an (article L3141-3). La période de référence court en principe du <strong>1er juin au 31 mai</strong> (article R3141-4), sauf accord fixant une autre période ou entreprise affiliée à une caisse de congés. Sont assimilées à du travail effectif notamment les périodes de congés payés, de congé maternité, de paternité, d'adoption, et les arrêts pour accident du travail ou maladie professionnelle (article L3141-5).</p>
<p><strong>Réforme de 2024.</strong> Depuis la loi n° 2024-364 du 22 avril 2024, les périodes d'<strong>arrêt pour maladie non professionnelle</strong> ouvrent droit à <strong>2 jours ouvrables</strong> de congés par mois, dans la limite de 24 jours par période de référence ; les arrêts pour accident du travail ou maladie professionnelle ouvrent droit à 2,5 jours par mois sans limitation à un an. Au retour d'un arrêt, l'employeur doit informer le salarié, dans le mois qui suit la reprise, du nombre de jours de congés dont il dispose et de la date jusqu'à laquelle il peut les prendre (article L3141-19-3) ; les congés qui n'ont pu être pris en raison d'un arrêt bénéficient d'une période de report de 15 mois (article L3141-19-1). L'assistant(e) RH vérifie que Lucca applique bien ces règles et prépare le courrier d'information à la reprise.</p>
<p><strong>Indemnisation.</strong> L'indemnité de congés payés est égale à la plus favorable des deux méthodes (article L3141-24) :</p>
<ul>
<li>la <strong>règle du dixième</strong> : 1/10 de la rémunération brute totale perçue pendant la période de référence (y compris l'indemnité de congés de la période précédente), proratisée selon les jours pris ;</li>
<li>la <strong>règle du maintien de salaire</strong> : la rémunération que le salarié aurait perçue s'il avait travaillé.</li>
</ul>
<p><strong>Exemple chiffré.</strong> Kevin LAMBERT, chef d'équipe, salaire de base 1 950,00 €, a perçu une rémunération brute totale de 23 400,00 € sur la période du 1er juin au 31 mai (y compris des heures supplémentaires et primes). Il prend 6 jours ouvrables (une semaine, soit 5 jours ouvrés) en juillet ; on retient, pour l'exemple, un mois de 21 jours ouvrés (à recalculer sur le calendrier réel de l'année).</p>
<ul>
<li>Dixième : 23 400,00 × 10 % = 2 340,00 € pour 30 jours ouvrables ; pour 6 jours : 2 340,00 × 6 / 30 = <strong>468,00 €</strong> ;</li>
<li>Maintien : 1 950,00 × 5 / 21 = <strong>464,29 €</strong> ;</li>
<li>Le dixième est plus favorable : la paie retient l'absence pour congés (464,29 €) et verse une indemnité de 468,00 €, soit un gain de 3,71 € pour le salarié.</li>
</ul>
<p>En pratique, le logiciel de paie compare automatiquement les deux méthodes ; le contrôle de l'assistant(e) RH porte sur les <strong>dates et le nombre de jours</strong> (concordance Lucca / bulletin), le décompte en jours ouvrables ou ouvrés selon la règle de l'entreprise, et les soldes affichés.</p>

<h3>Les arrêts maladie, accident du travail et maladie professionnelle</h3>
<p><strong>Indemnités journalières de sécurité sociale (IJSS) maladie.</strong> Versées par la CPAM après un délai de carence de <strong>3 jours</strong>, elles sont égales à 50 % du salaire journalier de base (salaires bruts des 3 derniers mois divisés par 91,25), dans la limite d'un plafond qui a été abaissé, pour les arrêts débutant à compter du 1er avril 2025, à <strong>1,4 fois le SMIC mensuel</strong> (au lieu de 1,8). Ces règles sont à vérifier sur ameli.fr pour l'année en cours.</p>
<p><strong>Accident du travail et maladie professionnelle.</strong> Pas de carence pour la CPAM (le jour de l'accident est payé par l'employeur) ; les IJ sont de 60 % du salaire journalier de référence pendant les 28 premiers jours, puis 80 %. L'employeur déclare l'accident dans les 48 heures (dimanches et jours fériés non compris) sur net-entreprises.</p>
<p><strong>Maintien de salaire légal (articles L1226-1 et D1226-1 et suivants).</strong> Le salarié ayant au moins <strong>un an d'ancienneté</strong> perçoit un complément employeur, après un délai de carence de <strong>7 jours</strong> en maladie (aucun en AT/MP), pour atteindre <strong>90 %</strong> de la rémunération brute qu'il aurait perçue pendant 30 jours, puis <strong>66,66 %</strong> pendant 30 jours ; ces durées augmentent de 10 jours par période de 5 ans d'ancienneté au-delà d'un an, sans dépasser 90 jours chacune. La CCN ou un accord peut être plus favorable : c'est la règle la plus favorable qui s'applique (vérifier la CCN 3043 et l'accord de prévoyance).</p>
<p><strong>Exemple chiffré (règles légales, plafond 2025).</strong> Fatou CAMARA, 4 ans d'ancienneté, salaire mensuel brut constant de 2 100,00 €, est en arrêt maladie du 3 au 22 mai, soit 20 jours calendaires.</p>
<ul>
<li>Salaire journalier de base : (2 100 × 3) / 91,25 = 69,04 € ; IJSS = 50 % = <strong>34,52 €</strong> par jour (inférieure au plafond) ;</li>
<li>IJSS versées par la CPAM : 20 − 3 jours de carence = 17 jours × 34,52 = <strong>586,84 €</strong> ;</li>
<li>Maintien employeur : jours 8 à 20 = 13 jours ; rémunération de référence : 2 100 × 13 / 30 = 910,00 € ; 90 % = 819,00 € ;</li>
<li>IJSS correspondant à ces 13 jours : 13 × 34,52 = 448,76 € ; complément employeur = 819,00 − 448,76 = <strong>370,24 €</strong> brut ;</li>
<li>Les 7 premiers jours ne donnent lieu à aucun complément légal (les jours 4 à 7 sont indemnisés par la CPAM).</li>
</ul>

<h3>La subrogation</h3>
<p>Avec la <strong>subrogation</strong>, l'employeur maintient tout ou partie du salaire pendant l'arrêt et perçoit directement les IJSS à la place du salarié (article R323-11 du Code de la sécurité sociale). Elle s'impose lorsque la convention collective ou un accord la prévoit ; à défaut, elle est facultative et suppose que le salaire maintenu soit au moins égal aux IJSS. Avantage pour le salarié : pas de rupture de revenu. Contraintes pour l'employeur : avance de trésorerie, rapprochement entre IJSS attendues et IJSS reçues (relevés de la CPAM), régularisations.</p>
<p>Sur le bulletin en subrogation, on voit : la retenue pour absence maladie, le maintien de salaire (brut), puis la déduction en net des IJSS perçues par l'employeur pour le compte du salarié. Le contrôle porte sur le rapprochement mensuel <em>IJSS attendues / IJSS encaissées</em> : un écart persistant signale souvent un signalement d'arrêt manquant ou des données de salaire incomplètes.</p>
<blockquote><strong>Procédure ALTÉA à la réception d'un arrêt :</strong> 1) enregistrer l'arrêt dans Lucca (dates, type, initial ou prolongation) ; 2) vérifier que le signalement d'arrêt de travail en DSN sera déposé par le cabinet dans les 5 jours ; 3) calculer l'ancienneté pour le maintien ; 4) noter la subrogation dans le tableau de variables ; 5) déclarer à l'organisme de prévoyance si l'arrêt dépasse la franchise du contrat ; 6) préparer l'information sur les congés à la reprise.</blockquote>
`,
      },
      {
        title: "5.7 – Acomptes, avances, saisies et cessions, titres-restaurant, frais de transport et notes de frais",
        content: `
<h3>Acompte et avance : deux notions à ne pas confondre</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th></th><th>Acompte</th><th>Avance</th></tr>
<tr><td>Définition</td><td>Paiement anticipé d'une partie du salaire correspondant à un travail <strong>déjà effectué</strong></td><td>Prêt d'argent consenti au salarié pour un travail <strong>non encore effectué</strong></td></tr>
<tr><td>Droit du salarié</td><td>Le salarié mensualisé peut obtenir, <strong>sur sa demande</strong>, un acompte correspondant pour une quinzaine à la moitié de sa rémunération mensuelle (article L3242-1)</td><td>Aucun droit : l'employeur est libre d'accepter ou de refuser</td></tr>
<tr><td>Remboursement</td><td>Déduit intégralement sur la paie du mois</td><td>Retenues successives ne pouvant excéder <strong>1/10e</strong> du salaire exigible chaque mois (article L3251-3)</td></tr>
<tr><td>Formalisme recommandé</td><td>Demande écrite, reçu signé, montant reporté dans le tableau de variables</td><td>Convention d'avance signée précisant le montant, l'échéancier et la clause en cas de départ</td></tr>
</table>
<p><strong>Exemple chiffré.</strong> Le 12 juin, Sophie MARCHAND (salaire net habituel d'environ 1 480 €) demande un acompte. Le maximum de droit est la moitié de la rémunération mensuelle (calcul en pratique sur le net) : environ 740 €. ALTÉA lui verse 500 € le 15 juin ; la ligne « Acompte versé le 15/06 : 500,00 € » est saisie dans les variables de juin et déduite du net à payer. Deux mois plus tard, Kevin LAMBERT obtient une avance de 900 € pour une réparation de véhicule : son salaire exigible étant d'environ 1 950 €, la retenue mensuelle ne peut dépasser 195 € ; l'échéancier signé prévoit 6 mensualités de 150 €.</p>

<h3>Les saisies et cessions sur salaire</h3>
<p>Le salaire ne peut être saisi ou cédé que dans les limites d'un <strong>barème légal</strong> (articles L3252-2 et R3252-2 du Code du travail) : une fraction du salaire est saisissable selon des tranches de rémunération annuelle dont les seuils sont <strong>revalorisés chaque année par décret</strong> et majorés par personne à charge (article R3252-3). Les proportions saisissables sont les suivantes :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Tranche de rémunération annuelle (seuils fixés par décret)</th><th>Fraction saisissable</th></tr>
<tr><td>Tranche 1</td><td>1/20e</td></tr>
<tr><td>Tranche 2</td><td>1/10e</td></tr>
<tr><td>Tranche 3</td><td>1/5e</td></tr>
<tr><td>Tranche 4</td><td>1/4</td></tr>
<tr><td>Tranche 5</td><td>1/3</td></tr>
<tr><td>Tranche 6</td><td>2/3</td></tr>
<tr><td>Au-delà de la tranche 6</td><td>Totalité</td></tr>
</table>
<p>La rémunération à prendre en compte est la rémunération <strong>nette</strong> (après cotisations et contributions sociales obligatoires et après prélèvement à la source), à laquelle s'ajoutent les avantages en nature et dont on exclut notamment les remboursements de frais professionnels et certaines prestations familiales. Dans tous les cas, le salarié conserve une somme au moins égale au <strong>montant forfaitaire du RSA pour une personne seule</strong> (article L3252-5) : 646,52 € par mois depuis le 1er avril 2025, montant à vérifier sur service-public.fr.</p>
<p><strong>Cas particuliers :</strong></p>
<ul>
<li><strong>Pension alimentaire (paiement direct)</strong> : elle est prélevée en priorité, y compris sur la fraction insaisissable, sous réserve du montant RSA laissé au salarié ;</li>
<li><strong>Saisie administrative à tiers détenteur</strong> (Trésor public, URSSAF…) : elle suit le même barème, sauf règles particulières ;</li>
<li><strong>Cession volontaire</strong> : le salarié cède une fraction de son salaire à un créancier selon les formes prévues par la loi ; la cession s'impute sur la même fraction saisissable.</li>
</ul>
<p><strong>Réforme de 2025.</strong> Depuis le 1er juillet 2025, la procédure de saisie des rémunérations est conduite par un <strong>commissaire de justice</strong> sans autorisation préalable du juge (loi n° 2023-1059 du 20 novembre 2023 et décret d'application) : l'employeur reçoit un procès-verbal de saisie, doit fournir dans un délai court les informations demandées (situation du salarié, autres saisies en cours) et verse chaque mois les sommes retenues au commissaire de justice répartiteur. Les modalités et délais exacts sont à vérifier sur service-public.fr ; tout manquement de l'employeur peut le rendre redevable des sommes non retenues.</p>
<p><strong>Exemple de calcul (seuils arrondis à but pédagogique, à remplacer par ceux du décret en vigueur).</strong> Karim BENSAÏD reçoit un procès-verbal de saisie visant Thomas GIRARD, agent de propreté, sans personne à charge, dont la rémunération nette après cotisations et prélèvement à la source est de 1 600 € par mois, soit 19 200 € par an. Supposons, pour l'exercice, des seuils annuels de 4 400 / 8 500 / 12 700 / 16 800 / 21 000 / 25 200 €.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Tranche annuelle</th><th>Montant de la tranche dans 19 200 €</th><th>Fraction</th><th>Saisissable annuel</th></tr>
<tr><td>0 à 4 400</td><td>4 400</td><td>1/20</td><td>220,00</td></tr>
<tr><td>4 400 à 8 500</td><td>4 100</td><td>1/10</td><td>410,00</td></tr>
<tr><td>8 500 à 12 700</td><td>4 200</td><td>1/5</td><td>840,00</td></tr>
<tr><td>12 700 à 16 800</td><td>4 100</td><td>1/4</td><td>1 025,00</td></tr>
<tr><td>16 800 à 19 200</td><td>2 400</td><td>1/3</td><td>800,00</td></tr>
<tr><td><strong>Total</strong></td><td>19 200</td><td></td><td><strong>3 295,00 € par an, soit 274,58 € par mois</strong></td></tr>
</table>
<p>Il reste 1 600 − 274,58 = 1 325,42 € au salarié, montant supérieur au RSA personne seule : la retenue mensuelle est donc de 274,58 €. Elle varie chaque mois si le salaire varie (heures supplémentaires, absences) : le logiciel de paie la recalcule à partir du barème paramétré ; l'assistant(e) RH vérifie le paramétrage annuel et la présence de la ligne sur chaque bulletin.</p>
<p><strong>À ne pas confondre :</strong> le <strong>solde bancaire insaisissable</strong> (SBI) protège le compte bancaire du débiteur lors d'une saisie sur compte : la banque laisse automatiquement à disposition une somme égale au RSA pour une personne seule. Il ne concerne pas l'employeur mais la banque ; l'assistant(e) RH peut en informer un salarié qui pose la question, sans entrer dans sa situation personnelle.</p>
<blockquote><strong>Confidentialité :</strong> une saisie révèle une situation d'endettement. L'acte est classé dans la partie protégée du dossier paie, seuls la responsable RH et le gestionnaire paie y ont accès, et l'information n'est jamais communiquée au manager.</blockquote>

<h3>Les titres-restaurant</h3>
<ul>
<li>Un titre par repas compris dans l'horaire journalier de travail : pas de titre pour un jour d'absence, de congé ou de télétravail sans repas (le télétravailleur y a droit dans les mêmes conditions que s'il travaillait sur site) ;</li>
<li>Contribution patronale comprise entre <strong>50 % et 60 %</strong> de la valeur du titre pour bénéficier de l'exonération de cotisations, dans la limite d'un montant par titre fixé chaque année (<strong>7,26 € en 2025</strong>, à vérifier pour 2026 sur urssaf.fr) ;</li>
<li>La part salariale est retenue sur le net ; la part patronale exonérée n'apparaît pas dans le brut ;</li>
<li>Les règles d'utilisation (produits alimentaires non directement consommables, plafond journalier d'utilisation) ont fait l'objet de dérogations temporaires prolongées par la loi : vérifier leur date de fin.</li>
</ul>
<p><strong>Exemple chiffré.</strong> Titre d'une valeur faciale de 10,00 €, part patronale 6,00 € (60 %), part salariale 4,00 €. En mai, Julien PERRIN a travaillé 19 jours (2 jours de congés, 1 jour férié) : 19 titres, retenue salariale = 19 × 4,00 = <strong>76,00 €</strong> ; contribution patronale = 19 × 6,00 = 114,00 €, exonérée car 6,00 € reste sous la limite et le taux de 60 % est respecté.</p>

<h3>La prise en charge des frais de transport</h3>
<p>L'employeur prend en charge <strong>50 %</strong> du prix des abonnements de transports publics (ou de services publics de location de vélos) souscrits pour le trajet entre la résidence habituelle et le lieu de travail, sur la base du tarif de 2e classe et du trajet le plus court (articles L3261-2 et R3261-1 et suivants). Le salarié à temps partiel travaillant au moins la moitié de la durée légale bénéficie de la même prise en charge qu'un temps plein ; en dessous, la prise en charge est proportionnelle au nombre d'heures travaillées. La prise en charge est subordonnée à la présentation des justificatifs. Au-delà de cette obligation, l'employeur peut verser un <strong>forfait mobilités durables</strong> (vélo, covoiturage, trottinette…) ou une <strong>prime de transport</strong> (carburant, recharge électrique), exonérés dans des limites annuelles à vérifier sur urssaf.fr.</p>
<p><strong>Exemple chiffré.</strong> Aïcha TRAORÉ (24 h par semaine, soit plus de la moitié de 35 h) présente un abonnement mensuel francilien à 88,80 € (tarif 2025, à vérifier) : prise en charge = 88,80 × 50 % = <strong>44,40 €</strong>, versée sur le bulletin en élément non soumis à cotisations. Un salarié à 15 h par semaine présentant le même abonnement : 44,40 × 15 / 17,5 = <strong>38,06 €</strong> (proratisation sur la base de la moitié de la durée légale, soit 17,5 heures).</p>

<h3>Les notes de frais</h3>
<p>Les frais professionnels (repas hors des locaux lors d'un déplacement, hôtel, péage, indemnités kilométriques pour l'usage du véhicule personnel) sont remboursés soit <strong>au réel sur justificatifs</strong>, soit par des <strong>allocations forfaitaires</strong> exonérées dans les limites fixées par l'URSSAF (et le barème kilométrique fiscal pour les indemnités kilométriques), révisées chaque année. Un remboursement de frais n'est pas un salaire : il n'est pas soumis à cotisations s'il est justifié et conforme à son objet.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Contrôle</th><th>Question à se poser</th></tr>
<tr><td>Réalité</td><td>La dépense est-elle professionnelle et justifiée (facture, ticket, ordre de mission) ?</td></tr>
<tr><td>Validation</td><td>Le responsable hiérarchique a-t-il validé ?</td></tr>
<tr><td>Montant</td><td>Le remboursement respecte-t-il la politique interne et les limites URSSAF pour les forfaits ?</td></tr>
<tr><td>Kilométrage</td><td>Le trajet déclaré est-il cohérent (distance vérifiée, puissance fiscale sur la carte grise) ?</td></tr>
<tr><td>Doublon</td><td>La dépense n'a-t-elle pas déjà été remboursée (carte carburant, note précédente) ?</td></tr>
<tr><td>Période</td><td>La note est-elle transmise dans le délai prévu par la procédure (par exemple dans le mois) ?</td></tr>
</table>
<blockquote><strong>Exemple :</strong> Nathalie ROUSSEL s'est rendue chez un client à Melun avec son véhicule personnel (5 CV), 96 km aller-retour. L'indemnité est calculée avec le barème kilométrique fiscal de l'année (publié par l'administration fiscale) : l'assistant(e) RH applique le coefficient de la tranche « jusqu'à 5 000 km » correspondant à la puissance du véhicule, joint le justificatif d'itinéraire et transmet au cabinet la ligne « Indemnités kilométriques, non soumises ».</blockquote>
`,
      },
      {
        title: "5.8 – Collecter, contrôler, classer et déclarer : tableau de variables, dossier paie numérisé, confidentialité et DSN",
        content: `
<h3>Le tableau de variables</h3>
<p>Le tableau de variables est l'outil central de l'assistant(e) RH : un fichier mensuel unique, transmis au cabinet, qui récapitule tous les événements de paie du mois, salarié par salarié. Modèle utilisé chez ALTÉA SERVICES (une ligne par événement) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Matricule</th><th>Nom Prénom</th><th>Site</th><th>Rubrique</th><th>Code paie</th><th>Date début</th><th>Date fin</th><th>Quantité</th><th>Montant</th><th>Justificatif (nom du fichier)</th><th>Validé par</th><th>Commentaire</th></tr>
<tr><td>0412</td><td>MARCHAND Sophie</td><td>Créteil Europarc</td><td>Heures sup. 25 %</td><td>HS25</td><td>09/03</td><td>15/03</td><td>8</td><td></td><td>2027-03_0412_HS_releve.pdf</td><td>Chef de site</td><td>Remplacement</td></tr>
<tr><td>0412</td><td>MARCHAND Sophie</td><td>Créteil Europarc</td><td>Heures sup. 50 %</td><td>HS50</td><td>09/03</td><td>15/03</td><td>2</td><td></td><td>idem</td><td>Chef de site</td><td></td></tr>
<tr><td>0388</td><td>CAMARA Fatou</td><td>Vitry</td><td>Arrêt maladie</td><td>MAL</td><td>03/05</td><td>22/05</td><td>20 j</td><td></td><td>2027-05_0388_arret.pdf</td><td>ARH</td><td>Subrogation, 4 ans d'ancienneté</td></tr>
<tr><td>0157</td><td>GIRARD Thomas</td><td>Ivry</td><td>Saisie sur salaire</td><td>SAIS</td><td></td><td></td><td></td><td>selon barème</td><td>Dossier protégé</td><td>Responsable RH</td><td>Nouveau PV reçu le 04/03</td></tr>
<tr><td>0520</td><td>TRAORÉ Aïcha</td><td>Créteil Soleil</td><td>Transport 50 %</td><td>TRANS</td><td></td><td></td><td></td><td>44,40</td><td>2027-03_0520_navigo.pdf</td><td>ARH</td><td></td></tr>
</table>
<p>Le fichier comporte aussi des onglets <strong>Entrées / sorties</strong> (date, contrat, éléments de solde de tout compte), <strong>Modifications de paramètres</strong> (avenants, RIB, adresse, mutuelle), <strong>Primes</strong> (avec décision de validation) et <strong>Régularisations</strong> (reports du mois précédent).</p>

<h3>Les pièces justificatives à réunir</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Événement</th><th>Pièce</th></tr>
<tr><td>Embauche</td><td>Contrat signé, DPAE, pièce d'identité, attestation de sécurité sociale, RIB, adhésion mutuelle ou demande de dispense</td></tr>
<tr><td>Heures supplémentaires / complémentaires</td><td>Relevé d'heures validé par le responsable</td></tr>
<tr><td>Prime exceptionnelle</td><td>Décision signée de la direction</td></tr>
<tr><td>Arrêt de travail</td><td>Volet employeur de l'avis d'arrêt, déclaration d'accident du travail le cas échéant</td></tr>
<tr><td>Congé pour événement familial</td><td>Acte justificatif</td></tr>
<tr><td>Acompte / avance</td><td>Demande écrite, reçu, convention d'avance</td></tr>
<tr><td>Saisie / cession</td><td>Procès-verbal ou acte du commissaire de justice, notification de paiement direct</td></tr>
<tr><td>Transport</td><td>Copie de l'abonnement ou attestation de l'opérateur</td></tr>
<tr><td>Note de frais</td><td>Factures, tickets, ordre de mission, carte grise pour les indemnités kilométriques</td></tr>
<tr><td>Départ</td><td>Lettre de démission ou de licenciement, convention de rupture homologuée, date de fin de préavis</td></tr>
</table>

<h3>Les contrôles de cohérence avant transmission</h3>
<ol>
<li><strong>Exhaustivité de l'effectif</strong> : nombre de salariés du tableau = effectif de la paie précédente + entrées − sorties ;</li>
<li><strong>Exhaustivité des sites</strong> : chaque chef de site a envoyé son relevé (liste de pointage) ;</li>
<li><strong>Absences</strong> : concordance entre Lucca, les arrêts reçus et le tableau ; pas de congés posés sur un jour d'arrêt ;</li>
<li><strong>Heures</strong> : pas d'heures supplémentaires pour un salarié à temps partiel (ce sont des heures complémentaires), respect du dixième ou du tiers, respect des durées maximales, suivi du contingent ;</li>
<li><strong>Primes</strong> : éligibilité vérifiée, décision jointe, proratisation appliquée ;</li>
<li><strong>Montants</strong> : pas de valeur aberrante (une prime de 4 000 € au lieu de 400 €) ;</li>
<li><strong>Dates</strong> : au bon format, dans le bon mois ;</li>
<li><strong>Justificatifs</strong> : chaque ligne renvoie à une pièce présente dans le dossier.</li>
</ol>

<h3>Les contrôles après réception des bulletins brouillons</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Contrôle global (journal de paie)</th><th>Contrôle individuel (bulletin)</th></tr>
<tr><td>Nombre de bulletins = effectif attendu</td><td>Identité, emploi, classification et date d'entrée corrects</td></tr>
<tr><td>Masse brute du mois comparée au mois précédent ; tout écart supérieur à 3 % est expliqué (entrées, primes, absences)</td><td>Salaire de base conforme au contrat et au moins égal au SMIC et au minimum conventionnel</td></tr>
<tr><td>Liste des salariés dont le net varie de plus de 10 % : explication pour chacun</td><td>Heures (normales, majorées) conformes au tableau</td></tr>
<tr><td>Aucun net négatif</td><td>Primes et variables présentes, au bon montant</td></tr>
<tr><td>Entrées et sorties du mois présentes</td><td>Absences et IJSS conformes ; maintien de salaire correct</td></tr>
<tr><td>Total des virements = total des nets payés</td><td>Mutuelle : formule (isolé / famille) ou dispense conforme</td></tr>
<tr><td>Modifications d'IBAN vérifiées (contre-appel)</td><td>Taux PAS présent ; net payé = net avant impôt − PAS − acompte − retenues</td></tr>
<tr><td></td><td>Soldes de congés conformes à Lucca ; mentions obligatoires présentes</td></tr>
</table>

<h3>Check-list mensuelle de l'assistant(e) RH</h3>
<ul>
<li>☐ Relevés d'heures reçus de tous les sites (relance le 16) ;</li>
<li>☐ Absences et arrêts saisis et justifiés ; signalements d'arrêt transmis au cabinet ;</li>
<li>☐ Entrées et sorties listées avec leurs pièces ;</li>
<li>☐ Primes validées par écrit ;</li>
<li>☐ Acomptes, avances, saisies, transport, titres-restaurant renseignés ;</li>
<li>☐ Modifications de paramètres transmises ;</li>
<li>☐ Tableau contrôlé et validé, transmis avant la clôture par la plateforme sécurisée ;</li>
<li>☐ Bulletins brouillons contrôlés, anomalies listées et corrigées ;</li>
<li>☐ Bulletins diffusés, oppositions à la dématérialisation respectées ;</li>
<li>☐ Dossiers paie numérisés mis à jour, pièces classées.</li>
</ul>

<h3>Le dossier paie numérisé et le classement protégé</h3>
<p>Chaque salarié dispose d'un dossier paie numérisé, distinct du dossier administratif général, dans un espace dont l'accès est limité aux personnes habilitées. Arborescence retenue chez ALTÉA :</p>
<ul>
<li><strong>PAIE / 0412_MARCHAND_Sophie /</strong>
<ul>
<li>01_Contrat_et_avenants</li>
<li>02_Parametres (RIB, mutuelle, dispenses, prévoyance, taux PAS reçus)</li>
<li>03_Variables_mensuelles (AAAA-MM_matricule_objet.pdf)</li>
<li>04_Absences_et_arrets</li>
<li>05_Saisies_cessions (sous-dossier à accès restreint : responsable RH et gestionnaire paie)</li>
<li>06_Bulletins (copies employeur)</li>
<li>07_Sortie (solde de tout compte, certificat de travail, attestation France Travail)</li>
</ul></li>
</ul>
<p><strong>Règles de nommage</strong> : date au format AAAA-MM en tête pour trier chronologiquement, matricule plutôt que nom dans les fichiers transmis, pas d'espaces ni d'accents, version en fin de nom (_V2).</p>
<p><strong>Classement protégé</strong> : droits d'accès nominatifs (pas de compte partagé), authentification forte, chiffrement des fichiers transmis, journalisation des accès, sauvegarde régulière, purge selon les durées de conservation. Le traitement « paie » figure au registre des activités de traitement de l'entreprise (article 30 du RGPD), avec ses finalités, ses destinataires (cabinet, URSSAF, DGFiP, organismes de protection sociale) et ses durées de conservation. Le cabinet est sous-traitant au sens du RGPD : la lettre de mission ou un avenant précise ses obligations (article 28).</p>

<h3>Garantir la confidentialité au quotidien</h3>
<ul>
<li>Écran verrouillé dès qu'on quitte son poste, filtre de confidentialité en open space ;</li>
<li>Aucun bulletin ni tableau de variables envoyé par messagerie non sécurisée ou sur une adresse personnelle ; utilisation exclusive de la plateforme du cabinet ;</li>
<li>Impressions récupérées immédiatement, destruction des brouillons au destructeur ;</li>
<li>Aucune information de paie donnée par téléphone sans vérification de l'identité de l'interlocuteur ;</li>
<li>Réponse à un salarié uniquement sur sa propre situation ; un manager n'a pas accès aux salaires de son équipe sauf habilitation définie ;</li>
<li>Obligation de discrétion rappelée dans le contrat ou la fiche de poste de l'assistant(e) RH.</li>
</ul>

<h3>La DSN : principes</h3>
<p>La <strong>déclaration sociale nominative</strong> (DSN), obligatoire pour tous les employeurs du secteur privé, est un fichier mensuel produit à partir du logiciel de paie et transmis sur net-entreprises.fr. Elle remplace la plupart des déclarations sociales : elle transmet en une fois aux organismes (URSSAF, retraite complémentaire Agirc-Arrco, organismes complémentaires, France Travail, CPAM, DGFiP pour le prélèvement à la source…) les données de rémunération, de contrat et de cotisations de chaque salarié. Son principe : <em>« une donnée saisie une seule fois, transmise une seule fois »</em>. La qualité de la DSN dépend donc directement de la qualité des données collectées par le service RH.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Type</th><th>Objet</th><th>Délai</th></tr>
<tr><td>DSN mensuelle</td><td>Rémunérations, cotisations, contrats, PAS du mois</td><td>Le 5 ou le 15 du mois suivant (voir 5.2)</td></tr>
<tr><td>Signalement d'arrêt de travail</td><td>Maladie, maternité, paternité, AT/MP : déclenche le calcul des IJSS</td><td>Dans les 5 jours suivant la connaissance de l'arrêt (dès que possible en cas de subrogation) ; mêmes règles pour la reprise anticipée</td></tr>
<tr><td>Signalement de fin de contrat de travail</td><td>Permet notamment la production de l'attestation employeur destinée à France Travail</td><td>Dans les 5 jours suivant la fin du contrat (certains cas peuvent être couverts par la DSN mensuelle : à vérifier selon les règles en vigueur)</td></tr>
<tr><td>Signalement d'amorçage des données variables</td><td>Pour les salariés soumis à des conditions particulières de rattachement (selon les cas)</td><td>Selon le cahier technique</td></tr>
</table>
<p>Après chaque dépôt, net-entreprises renvoie des <strong>bilans</strong> et <strong>comptes rendus métier</strong> (CRM) : anomalies bloquantes, taux PAS, notifications des organismes. L'assistant(e) RH n'a pas à corriger un fichier DSN, mais il doit savoir lire un CRM d'anomalie (par exemple NIR inconnu, date de naissance incohérente) et corriger la donnée source dans le dossier du salarié.</p>
<blockquote><strong>Exemple :</strong> le CRM de la DSN de mars signale « NIR non certifié » pour Moussa DIALLO, embauché le 2 mars. L'assistant(e) RH compare le NIR saisi à l'attestation de sécurité sociale du dossier, constate une inversion de deux chiffres, corrige la fiche, transmet la correction au cabinet et classe l'attestation dans 02_Parametres.</blockquote>
`,
      },
      {
        title: "5.9 – Quiz du chapitre",
        content: `
<h3>Questions (une seule bonne réponse par question)</h3>
<ol>
<li>ALTÉA SERVICES compte 148 salariés et verse les salaires le dernier jour ouvré du mois de travail. Sa DSN mensuelle doit être déposée au plus tard :
<ol type="a"><li>le 1er du mois suivant</li><li>le 5 du mois suivant</li><li>le 15 du mois suivant</li><li>le dernier jour du mois suivant</li></ol></li>
<li>À défaut d'accord collectif, les heures supplémentaires de la 36e à la 43e heure sont majorées de :
<ol type="a"><li>10 %</li><li>20 %</li><li>25 %</li><li>50 %</li></ol></li>
<li>Un salarié à temps partiel à 104 heures par mois effectue 9 heures complémentaires. Leur majoration légale est de :
<ol type="a"><li>0 %, il ne s'agit pas d'heures supplémentaires</li><li>10 %</li><li>25 %</li><li>50 %</li></ol></li>
<li>Un salarié mensualisé qui demande un acompte a droit, pour une quinzaine, à :
<ol type="a"><li>un quart de sa rémunération mensuelle</li><li>la moitié de sa rémunération mensuelle</li><li>la totalité de son salaire déjà gagné</li><li>rien, l'acompte est à la discrétion de l'employeur</li></ol></li>
<li>Le remboursement d'une avance sur salaire par retenue ne peut excéder chaque mois :
<ol type="a"><li>1/20e du salaire exigible</li><li>1/10e du salaire exigible</li><li>1/3 du salaire exigible</li><li>la fraction saisissable du barème</li></ol></li>
<li>L'employeur conserve le double des bulletins de paie pendant au moins :
<ol type="a"><li>1 an</li><li>3 ans</li><li>5 ans</li><li>sans limitation de durée</li></ol></li>
<li>Depuis la loi du 22 avril 2024, un arrêt pour maladie non professionnelle fait acquérir des congés payés à raison de :
<ol type="a"><li>aucun jour</li><li>2 jours ouvrables par mois, dans la limite de 24 jours par période de référence</li><li>2,5 jours ouvrables par mois sans limite</li><li>1 jour ouvrable par mois</li></ol></li>
<li>Un salarié souhaite être dispensé d'adhérer à la mutuelle d'entreprise parce qu'il est couvert à titre obligatoire par le contrat collectif de son épouse. Que faut-il ?
<ol type="a"><li>Rien, une simple déclaration orale suffit</li><li>Une demande écrite du salarié et un justificatif de la couverture, renouvelé chaque année</li><li>L'accord du CSE</li><li>Une autorisation de l'URSSAF</li></ol></li>
<li>La prise en charge obligatoire de l'abonnement de transports publics d'un salarié à temps plein est de :
<ol type="a"><li>25 %</li><li>50 %</li><li>75 %</li><li>100 %</li></ol></li>
<li>Le signalement d'arrêt de travail en DSN doit être effectué :
<ol type="a"><li>dans les 5 jours suivant la connaissance de l'arrêt</li><li>avec la DSN mensuelle uniquement</li><li>à la fin de l'arrêt seulement</li><li>uniquement en cas d'accident du travail</li></ol></li>
</ol>

<h3>Corrigé expliqué</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>b</td><td>Les employeurs d'au moins 50 salariés qui paient les salaires dans le mois de la période d'emploi déposent la DSN le 5 du mois suivant ; les autres, le 15.</td></tr>
<tr><td>2</td><td>c</td><td>Article L3121-36 : 25 % pour les 8 premières heures supplémentaires, 50 % au-delà ; un accord peut fixer un taux différent d'au moins 10 %.</td></tr>
<tr><td>3</td><td>b</td><td>Le dixième de 104 h est 10,4 h : 9 heures complémentaires restent dans cette limite et sont majorées de 10 % dès la première heure (article L3123-29).</td></tr>
<tr><td>4</td><td>b</td><td>Article L3242-1 : l'acompte correspond, pour une quinzaine, à la moitié de la rémunération mensuelle, et il est de droit sur demande du salarié mensualisé.</td></tr>
<tr><td>5</td><td>b</td><td>Article L3251-3 : l'avance (prêt) est remboursée par retenues successives limitées au dixième du salaire exigible ; ne pas confondre avec l'acompte, déduit en totalité.</td></tr>
<tr><td>6</td><td>c</td><td>Article L3243-4 : 5 ans pour le double des bulletins ; le salarié, lui, conserve ses bulletins sans limitation de durée ; le bulletin électronique reste accessible 50 ans ou jusqu'aux 75 ans du salarié.</td></tr>
<tr><td>7</td><td>b</td><td>Article L3141-5-1 issu de la loi n° 2024-364 : 2 jours ouvrables par mois d'arrêt pour maladie non professionnelle, dans la limite de 24 jours par période ; l'AT/MP reste à 2,5 jours.</td></tr>
<tr><td>8</td><td>b</td><td>La dispense est à l'initiative du salarié, par écrit, avec justificatif ; à défaut, le salarié doit être affilié et la dispense n'est pas opposable à l'URSSAF.</td></tr>
<tr><td>9</td><td>b</td><td>Article L3261-2 : 50 % du prix de l'abonnement, base 2e classe et trajet le plus court.</td></tr>
<tr><td>10</td><td>a</td><td>Le signalement d'arrêt est un événement de DSN à transmettre dans les 5 jours ; il permet à la CPAM de calculer et verser les IJSS sans attendre la DSN mensuelle.</td></tr>
</table>
<p><strong>Barème indicatif :</strong> 9 ou 10 bonnes réponses : maîtrise ; 7 ou 8 : relire les sections 5.5 à 5.7 ; moins de 7 : reprendre le chapitre avec votre formateur et refaire les exemples chiffrés.</p>
`,
      },
      {
        title: "5.10 – Cas pratique corrigé : préparer et contrôler la paie d'avril chez ALTÉA SERVICES",
        content: `
<h3>Énoncé</h3>
<p>Vous êtes l'apprenti(e) assistant(e) RH d'ALTÉA SERVICES. Nous sommes le 20 avril, date de clôture des variables. Le mois d'avril compte <strong>21 jours ouvrés, soit 147 heures réelles</strong> pour un horaire de 7 heures par jour du lundi au vendredi. La méthode de retenue d'absence retenue par l'entreprise est celle des heures réelles du mois. Les éléments suivants vous ont été remontés :</p>
<ol>
<li><strong>Léa FONTAINE</strong>, agente de propreté à temps plein, salaire de base 1 880,00 € : 4 heures supplémentaires la semaine du 5 avril (relevé validé par le chef de site) et une absence injustifiée d'une journée (7 heures) le 14 avril (constat écrit du chef de site, aucune justification reçue malgré relance). Aucun accord ne fixe un taux de majoration différent du taux légal.</li>
<li><strong>Aïcha TRAORÉ</strong>, agente à temps partiel, 104 heures par mois, taux horaire 12,30 € : 14 heures complémentaires validées. Hypothèse : un accord applicable autorise les heures complémentaires jusqu'au tiers de la durée contractuelle, sans fixer de taux pour la tranche au-delà du dixième.</li>
<li><strong>Mehdi BOUZID</strong>, agent de propreté embauché il y a 8 mois, salaire 1 950,00 € constant les trois derniers mois : arrêt maladie initial du 8 au 17 avril (10 jours calendaires, dont 8 jours ouvrés). Avis d'arrêt reçu le 9 avril.</li>
<li><strong>Kevin LAMBERT</strong>, chef d'équipe : acompte de 400,00 € versé le 15 avril à sa demande.</li>
<li><strong>Julien PERRIN</strong>, chef d'équipe : a transmis son abonnement mensuel de transport à 88,80 € (tarif 2025 pris pour l'exercice).</li>
<li><strong>Sophie MARCHAND</strong> : son chef de site écrit par courriel « Merci de lui mettre une prime de 250 € pour le chantier Europarc ». Aucune décision de la direction n'est jointe.</li>
<li><strong>Inès MOREAU</strong>, embauchée le 1er avril, déclare oralement au téléphone qu'elle « ne veut pas de la mutuelle de l'entreprise, car elle a celle de son mari ».</li>
</ol>
<p>Le 25 avril, vous recevez les bulletins brouillons du cabinet. Vous y relevez notamment : (a) les 14 heures complémentaires d'Aïcha TRAORÉ sont toutes majorées à 10 % ; (b) le net payé de Kevin LAMBERT est identique à celui de mars ; (c) le bulletin de Thomas GIRARD ne comporte plus de ligne de saisie sur salaire, alors qu'aucune mainlevée n'a été reçue.</p>
<p><strong>Travail demandé :</strong></p>
<ol>
<li>Calculer, pour chaque élément chiffrable, le montant à faire figurer en paie.</li>
<li>Indiquer pour chaque élément la pièce justificative et la décision à prendre (transmettre, attendre, refuser).</li>
<li>Présenter les lignes du tableau de variables à transmettre au cabinet.</li>
<li>Rédiger le message de demande de correction au cabinet après contrôle des brouillons.</li>
<li>Préciser les précautions de confidentialité à respecter.</li>
</ol>

<h3>Corrigé</h3>
<h4>1. Calculs</h4>
<p><strong>Léa FONTAINE.</strong> Taux horaire = 1 880,00 / 151,67 = 12,395 €.</p>
<ul>
<li>Heures supplémentaires à 25 % : taux majoré = 12,395 × 1,25 = 15,494 € ; 4 × 15,494 = <strong>61,98 €</strong>.</li>
<li>Retenue pour absence injustifiée (heures réelles) : 1 880,00 × 7 / 147 = <strong>89,52 €</strong>.</li>
<li>Pour information, la méthode 151,67 aurait donné 1 880,00 × 7 / 151,67 = 86,77 € : elle n'est pas celle de l'entreprise et ne doit pas être utilisée.</li>
</ul>
<p><strong>Aïcha TRAORÉ.</strong> Dixième de la durée contractuelle = 104 / 10 = 10,4 heures ; tiers = 34,67 heures. Les 14 heures sont autorisées par l'accord.</p>
<ul>
<li>10,4 heures à 10 % : 12,30 × 1,10 = 13,53 € ; 10,4 × 13,53 = <strong>140,71 €</strong> ;</li>
<li>3,6 heures au-delà du dixième, à 25 % (taux légal supplétif, faute de taux conventionnel) : 12,30 × 1,25 = 15,375 € ; 3,6 × 15,375 = <strong>55,35 €</strong> ;</li>
<li>Total : <strong>196,06 €</strong> (et non 14 × 13,53 = 189,42 € comme sur le brouillon : écart de 6,64 € au détriment de la salariée).</li>
</ul>
<p><strong>Mehdi BOUZID.</strong></p>
<ul>
<li>Ancienneté de 8 mois : pas de maintien de salaire légal (condition d'un an, article L1226-1) ; vérifier toutefois la CCN 3043 et le contrat de prévoyance, qui peuvent prévoir une indemnisation plus favorable ;</li>
<li>Retenue d'absence (heures réelles) : 8 jours ouvrés × 7 h = 56 heures ; 1 950,00 × 56 / 147 = <strong>742,86 €</strong> ;</li>
<li>IJSS estimées (règles légales) : salaire journalier de base = 1 950 × 3 / 91,25 = 64,11 € ; IJ = 50 % = 32,05 € ; 10 jours − 3 jours de carence = 7 jours ; 7 × 32,05 = <strong>224,35 €</strong> versés directement par la CPAM (pas de subrogation en l'absence de maintien) ;</li>
<li>Signalement d'arrêt de travail en DSN dans les 5 jours suivant la réception (soit au plus tard le 14 avril) : à vérifier auprès du cabinet dès le 9 avril, sans attendre la clôture.</li>
</ul>
<p><strong>Kevin LAMBERT.</strong> Acompte de <strong>400,00 €</strong> à déduire du net à payer d'avril.</p>
<p><strong>Julien PERRIN.</strong> Prise en charge transport : 88,80 × 50 % = <strong>44,40 €</strong>, élément non soumis à cotisations.</p>

<h4>2. Pièces et décisions</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Salarié</th><th>Élément</th><th>Pièce justificative</th><th>Décision</th></tr>
<tr><td>Léa FONTAINE</td><td>HS 25 % : 4 h</td><td>Relevé d'heures validé</td><td>Transmettre</td></tr>
<tr><td>Léa FONTAINE</td><td>Absence injustifiée 7 h</td><td>Constat écrit du chef de site, copie de la relance</td><td>Transmettre la retenue ; informer la responsable RH (suite disciplinaire éventuelle, qui ne relève pas de l'assistant(e))</td></tr>
<tr><td>Aïcha TRAORÉ</td><td>HC : 10,4 h à 10 % et 3,6 h à 25 %</td><td>Relevé validé, référence de l'accord</td><td>Transmettre en deux lignes distinctes</td></tr>
<tr><td>Mehdi BOUZID</td><td>Arrêt maladie 08/04 au 17/04</td><td>Volet employeur de l'avis d'arrêt</td><td>Transmettre ; pas de subrogation ; vérifier CCN et prévoyance</td></tr>
<tr><td>Kevin LAMBERT</td><td>Acompte 400 €</td><td>Demande écrite et reçu signé</td><td>Transmettre</td></tr>
<tr><td>Julien PERRIN</td><td>Transport 44,40 €</td><td>Copie de l'abonnement</td><td>Transmettre</td></tr>
<tr><td>Sophie MARCHAND</td><td>Prime 250 €</td><td>Aucune : un courriel du chef de site n'est pas une décision</td><td>Ne pas transmettre en l'état ; soumettre à Nathalie ROUSSEL pour décision écrite avant la clôture ; à défaut, report en mai</td></tr>
<tr><td>Inès MOREAU</td><td>Dispense de mutuelle</td><td>Aucune</td><td>Affilier par défaut ; lui adresser le formulaire de demande de dispense et lui demander l'attestation de l'organisme du conjoint mentionnant sa couverture obligatoire comme ayant droit</td></tr>
</table>

<h4>3. Lignes du tableau de variables d'avril</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Matricule</th><th>Salarié</th><th>Rubrique</th><th>Dates</th><th>Quantité</th><th>Montant indicatif</th><th>Justificatif</th></tr>
<tr><td>0431</td><td>FONTAINE Léa</td><td>HS 25 %</td><td>Sem. du 05/04</td><td>4 h</td><td>61,98 €</td><td>2027-04_0431_HS.pdf</td></tr>
<tr><td>0431</td><td>FONTAINE Léa</td><td>Absence injustifiée non rémunérée</td><td>14/04</td><td>7 h</td><td>− 89,52 €</td><td>2027-04_0431_absence.pdf</td></tr>
<tr><td>0520</td><td>TRAORÉ Aïcha</td><td>HC 10 %</td><td>Avril</td><td>10,4 h</td><td>140,71 €</td><td>2027-04_0520_HC.pdf</td></tr>
<tr><td>0520</td><td>TRAORÉ Aïcha</td><td>HC 25 %</td><td>Avril</td><td>3,6 h</td><td>55,35 €</td><td>idem</td></tr>
<tr><td>0602</td><td>BOUZID Mehdi</td><td>Arrêt maladie initial, sans subrogation</td><td>08/04 au 17/04</td><td>10 j (56 h ouvrées)</td><td>− 742,86 €</td><td>2027-04_0602_arret.pdf</td></tr>
<tr><td>0274</td><td>LAMBERT Kevin</td><td>Acompte</td><td>15/04</td><td></td><td>400,00 €</td><td>2027-04_0274_acompte.pdf</td></tr>
<tr><td>0301</td><td>PERRIN Julien</td><td>Remboursement transport 50 %</td><td>Avril</td><td></td><td>44,40 €</td><td>2027-04_0301_transport.pdf</td></tr>
<tr><td>0615</td><td>MOREAU Inès</td><td>Mutuelle : affiliation (dispense en attente de justificatif)</td><td>01/04</td><td></td><td></td><td>Bulletin d'adhésion</td></tr>
</table>
<p>Commentaire porté dans l'onglet « Régularisations » : <em>« Prime chantier Europarc de S. MARCHAND (250 €) en attente de décision de la direction : report éventuel en mai. »</em></p>

<h4>4. Message au cabinet (via la plateforme sécurisée)</h4>
<blockquote>
<p>Objet : ALTÉA SERVICES – Paie d'avril – Corrections sur bulletins brouillons</p>
<p>Bonjour,</p>
<p>Après contrôle des bulletins brouillons d'avril, nous vous remercions de bien vouloir apporter les corrections suivantes :</p>
<ol>
<li>Matricule 0520 : les 14 heures complémentaires doivent être ventilées en 10,4 h majorées à 10 % et 3,6 h majorées à 25 % (dépassement du dixième de la durée contractuelle de 104 h), soit 196,06 € au lieu de 189,42 €.</li>
<li>Matricule 0274 : l'acompte de 400,00 € versé le 15/04 (ligne transmise dans le tableau de variables) n'est pas déduit du net à payer.</li>
<li>Matricule 0157 : la retenue au titre de la saisie sur rémunération n'apparaît plus ; aucune mainlevée ne nous a été notifiée : merci de la rétablir selon le barème en vigueur.</li>
</ol>
<p>Merci de nous adresser les bulletins corrigés avant le 27/04 pour le bon à payer.</p>
<p>Cordialement,<br>Service RH – ALTÉA SERVICES</p>
</blockquote>
<p>Remarque : le message cite les <strong>matricules</strong> et non les situations personnelles détaillées ; il passe par la plateforme sécurisée et non par une messagerie ordinaire.</p>

<h4>5. Précautions de confidentialité</h4>
<ul>
<li>La saisie de Thomas GIRARD et l'arrêt de Mehdi BOUZID sont des informations sensibles : classement dans les sous-dossiers à accès restreint, pas d'information au chef de site au-delà de ce qui lui est nécessaire (dates d'absence, pas le motif médical) ;</li>
<li>Pas de réponse au chef de site de Sophie MARCHAND sur le montant final de la prime avant décision de la responsable RH ;</li>
<li>Pour Inès MOREAU, ne pas discuter de sa situation familiale au téléphone en open space ; lui envoyer le formulaire sur sa messagerie personnelle déclarée ou en main propre ;</li>
<li>Tableau de variables transmis uniquement par la plateforme du cabinet, nommé avec la période, sans copie locale non protégée.</li>
</ul>
<blockquote><strong>Critères de réussite (grille du formateur) :</strong> calculs exacts au centime (HS, HC, retenue en heures réelles, acompte, transport) ; refus motivé de la prime non validée ; affiliation par défaut de la salariée sans justificatif ; trois anomalies du brouillon détectées et formulées ; confidentialité respectée dans le message.</blockquote>
`,
      },
    ],
  },
  {
    title: "Chapitre 6 – CP3 : Mettre en place et suivre les indicateurs ressources humaines",
    description: "Ce chapitre couvre la compétence professionnelle n° 3 du titre (bloc BC01 / CCP1) : collecter et sélectionner des données internes et externes, calculer des indicateurs sociaux et des ratios exacts, les représenter graphiquement, alimenter les outils de pilotage et les obligations légales de l'entreprise, puis analyser les résultats et les formaliser par écrit selon le destinataire, dans le respect de la confidentialité. Vous y verrez les finalités et destinataires des indicateurs, les obligations qui dépendent de l'effectif (registre unique du personnel, BDESE, bilan social à partir de 300 salariés, index de l'égalité professionnelle à partir de 50 salariés, directive (UE) 2023/970 sur la transparence des rémunérations, obligation d'emploi des travailleurs handicapés à 6 %), le passage de la DPEF au rapport de durabilité CSRD et ses normes ESRS S1 avec le report « stop-the-clock » de 2025, puis les formules exactes des principaux indicateurs : effectifs (physique, ETP, moyen, règles URSSAF), pyramide des âges, ancienneté, turnover, absentéisme, taux de fréquence et de gravité des accidents du travail, masse salariale, salaires moyen et médian, écart de rémunération femmes-hommes, accès à la formation, entretiens de parcours professionnel, délai et coût de recrutement. La partie outil détaille le travail au tableur (nettoyage, tableaux croisés dynamiques, NB.SI.ENS, SOMME.SI.ENS, MOYENNE.SI, RECHERCHEX, DATEDIF, graphiques) et la construction d'un tableau de bord RH. Tous les exemples sont calculés sur ALTÉA SERVICES (148 salariés). Le chapitre se termine par un quiz et un cas pratique corrigé de note de synthèse.",
    sections: [
      {
        title: "6.1 – Pourquoi des indicateurs RH ? Finalités, destinataires et sources de données",
        content: `
<h3>Ce que dit le référentiel</h3>
<p>Le REAC décrit la compétence n° 3 ainsi : <em>« En vue de l'élaboration des dossiers liés aux obligations qui s'imposent aux entreprises en fonction de leur effectif (bilan social, rapport formation égalité hommes/femmes…) ou pour l'établissement de statistiques (masse salariale, absentéisme…), collecter et sélectionner les données nécessaires issues de sources internes et externes dans le respect des règles de confidentialité. Participer à l'élaboration des outils de pilotage et les actualiser périodiquement. Calculer des indicateurs sociaux et des ratios. Représenter graphiquement des données chiffrées. […] Analyser les résultats, repérer les éléments significatifs et les formaliser par écrit en fonction des besoins du destinataire. »</em> Le référentiel, rédigé en 2020, cite la BDES et la DPEF : depuis, la BDES est devenue la <strong>BDESE</strong> (loi Climat et résilience de 2021) et la DPEF est progressivement remplacée par le <strong>rapport de durabilité</strong> issu de la CSRD (voir 6.3).</p>
<p>Six critères de performance sont évalués :</p>
<ol>
<li>Les règles de confidentialité sont respectées ;</li>
<li>Les données sont sélectionnées en fonction de l'objectif ;</li>
<li>Le calcul des indicateurs est exact ;</li>
<li>Les éléments significatifs des statistiques sont repérés ;</li>
<li>L'analyse des données est en cohérence par rapport à l'objectif ;</li>
<li>Les résultats sont exploitables et adaptés à l'objectif et au destinataire.</li>
</ol>

<h3>Les finalités des indicateurs RH</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Finalité</th><th>Exemples</th><th>Périodicité habituelle</th></tr>
<tr><td><strong>Répondre à une obligation légale</strong></td><td>Index égalité professionnelle, BDESE, déclaration d'emploi des travailleurs handicapés, bilan social, rapport de durabilité</td><td>Annuelle, à date fixe</td></tr>
<tr><td><strong>Piloter l'activité RH</strong></td><td>Suivi des effectifs par site, des recrutements en cours, du plan de développement des compétences, des entretiens de parcours professionnel</td><td>Mensuelle ou trimestrielle</td></tr>
<tr><td><strong>Maîtriser les coûts</strong></td><td>Masse salariale réalisée par rapport au budget, heures supplémentaires, coût de l'absentéisme, coût des recrutements</td><td>Mensuelle</td></tr>
<tr><td><strong>Prévenir les risques</strong></td><td>Taux d'absentéisme par site, taux de fréquence des accidents du travail, turnover des nouveaux embauchés</td><td>Mensuelle</td></tr>
<tr><td><strong>Éclairer une décision</strong></td><td>Pyramide des âges pour anticiper les départs en retraite, analyse des écarts de rémunération avant la négociation annuelle</td><td>Ponctuelle</td></tr>
<tr><td><strong>Informer et consulter les représentants du personnel</strong></td><td>Données de la BDESE pour les consultations récurrentes du CSE (orientations stratégiques, situation économique et financière, politique sociale)</td><td>Annuelle et selon le calendrier des consultations</td></tr>
</table>

<h3>Les destinataires et leurs attentes</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Destinataire</th><th>Ce qu'il attend</th><th>Format adapté</th></tr>
<tr><td>Direction générale</td><td>Peu d'indicateurs, tendances, écarts au budget, risques, décisions à prendre</td><td>Tableau de bord d'une page, note de synthèse avec recommandations</td></tr>
<tr><td>Responsable RH</td><td>Détail par site, par catégorie, par motif ; suivi des actions</td><td>Tableau de bord complet, tableaux croisés</td></tr>
<tr><td>Managers et chefs de site</td><td>Indicateurs de leur périmètre (absences, heures, effectifs, entretiens à réaliser)</td><td>Tableau simple et actionnable, sans données individuelles sensibles</td></tr>
<tr><td>CSE</td><td>Données prévues par la BDESE, comparaisons dans le temps, égalité professionnelle</td><td>Données consolidées, non nominatives, mises à disposition dans la BDESE</td></tr>
<tr><td>Administrations et organismes</td><td>Déclarations réglementaires (index sur le site Egapro, DOETH via la DSN)</td><td>Format imposé par l'organisme</td></tr>
<tr><td>Clients et financeurs</td><td>Données sociales demandées dans les questionnaires RSE de grands donneurs d'ordre</td><td>Questionnaire ou extrait validé par la direction</td></tr>
</table>

<h3>Les sources de données</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Source</th><th>Données disponibles chez ALTÉA SERVICES</th><th>Fiabilité et précautions</th></tr>
<tr><td>Registre unique du personnel</td><td>Entrées, sorties, nature des contrats, emplois</td><td>Référence légale de l'effectif ; vérifier sa tenue à jour</td></tr>
<tr><td>SIRH Lucca</td><td>Fiches salariés, absences, congés, entretiens réalisés</td><td>Très exploitable par export ; dépend de la rigueur des saisies</td></tr>
<tr><td>Logiciel de paie Silae (journal de paie, états du cabinet)</td><td>Rémunérations, heures, masse salariale, charges</td><td>Données comptablement validées ; à demander au cabinet sous forme d'export</td></tr>
<tr><td>DSN et comptes rendus</td><td>Effectifs déclarés, effectif moyen annuel calculé par l'URSSAF</td><td>Référence pour les seuils sociaux de la sécurité sociale</td></tr>
<tr><td>Registre et déclarations d'accidents du travail, compte AT/MP sur net-entreprises</td><td>Accidents, jours d'arrêt, taux de cotisation AT/MP</td><td>Distinguer accidents avec et sans arrêt, accidents de trajet</td></tr>
<tr><td>Plan de développement des compétences, Moodle</td><td>Formations suivies, heures, coûts</td><td>Rapprocher les attestations de présence</td></tr>
<tr><td>Outils de recrutement (Welcome to the Jungle, Indeed, France Travail)</td><td>Candidatures, délais, sources</td><td>Données à consolider manuellement</td></tr>
<tr><td>Sources externes</td><td>INSEE, DARES, Assurance maladie (statistiques de sinistralité par secteur), observatoire de branche de la propreté, baromètres d'absentéisme publiés</td><td>Comparer ce qui est comparable (même définition, même secteur, même année)</td></tr>
</table>

<h3>La démarche en six étapes</h3>
<ol>
<li><strong>Définir l'objectif</strong> : à quelle question l'indicateur doit-il répondre, pour qui, à quelle date ?</li>
<li><strong>Définir l'indicateur</strong> : formule, périmètre (sites, contrats inclus ou exclus), période, source, unité ; on rédige une <em>fiche indicateur</em> ;</li>
<li><strong>Collecter</strong> les données dans les sources fiables, par extraction plutôt que par ressaisie ;</li>
<li><strong>Nettoyer et contrôler</strong> : doublons, valeurs manquantes, incohérences ;</li>
<li><strong>Calculer et représenter</strong> : tableur, tableau croisé dynamique, graphique adapté ;</li>
<li><strong>Analyser et communiquer</strong> : repérer les écarts significatifs, les expliquer, formuler des recommandations adaptées au destinataire.</li>
</ol>

<h3>Modèle de fiche indicateur</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Rubrique</th><th>Exemple : taux d'absentéisme</th></tr>
<tr><td>Objectif</td><td>Mesurer le poids des absences non planifiées pour cibler les actions de prévention par site</td></tr>
<tr><td>Formule</td><td>Heures d'absence (maladie, AT/MP et trajet, absences injustifiées, autres absences non planifiées) / heures théoriques de travail × 100</td></tr>
<tr><td>Périmètre</td><td>Tous les salariés en contrat de travail, hors apprentis en période de formation au CFA ; congés payés, formation, congés familiaux légaux exclus du numérateur</td></tr>
<tr><td>Source</td><td>Export des absences Lucca ; heures théoriques issues des contrats (Silae)</td></tr>
<tr><td>Périodicité</td><td>Mensuelle, cumul annuel glissant</td></tr>
<tr><td>Seuil d'alerte</td><td>Supérieur à 7 % sur un site pendant 2 mois consécutifs</td></tr>
<tr><td>Responsable</td><td>Assistant(e) RH (calcul), responsable RH (analyse)</td></tr>
<tr><td>Destinataires</td><td>Direction (synthèse), chefs de site (leur périmètre), CSE (annuel, consolidé)</td></tr>
</table>
<blockquote><strong>À retenir :</strong> un indicateur sans définition écrite n'est pas comparable d'une année sur l'autre. La fiche indicateur est la première garantie de l'exactitude du calcul, deuxième critère évalué au titre.</blockquote>
`,
      },
      {
        title: "6.2 – Les obligations légales qui dépendent de l'effectif",
        content: `
<h3>Vue d'ensemble</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Obligation</th><th>Seuil</th><th>Contenu et échéance</th><th>Référence</th><th>ALTÉA (148 salariés)</th></tr>
<tr><td>Registre unique du personnel</td><td>Tout employeur</td><td>Inscription de chaque salarié dans l'ordre des embauches ; conservation 5 ans après le départ du salarié</td><td>Articles L1221-13, D1221-23 et suivants</td><td>Oui</td></tr>
<tr><td>Comité social et économique</td><td>11 salariés pendant 12 mois consécutifs ; attributions élargies à 50 salariés</td><td>Information et consultation</td><td>Articles L2311-2, L2312-1 et suivants</td><td>Oui, attributions des entreprises d'au moins 50 salariés</td></tr>
<tr><td>BDESE (base de données économiques, sociales et environnementales)</td><td>50 salariés</td><td>Rassemble les informations nécessaires aux consultations récurrentes du CSE ; mise à jour régulière</td><td>Articles L2312-18, L2312-21, L2312-36, R2312-8 et suivants</td><td>Oui</td></tr>
<tr><td>Index de l'égalité professionnelle femmes-hommes</td><td>50 salariés</td><td>Publication au plus tard le <strong>1er mars</strong> de chaque année de la note globale et des notes par indicateur, transmission à l'inspection du travail (site Egapro) et au CSE</td><td>Articles L1142-8 et suivants, D1142-2 et suivants</td><td>Oui, 4 indicateurs (50 à 250 salariés)</td></tr>
<tr><td>Bilan social</td><td>300 salariés</td><td>Récapitule en un document les principales données chiffrées sur l'emploi, les rémunérations, la santé et la sécurité, les conditions de travail, la formation, les relations professionnelles ; intégré à la BDESE</td><td>Articles L2312-28 à L2312-35</td><td>Non</td></tr>
<tr><td>Obligation d'emploi des travailleurs handicapés (OETH)</td><td>20 salariés</td><td>Emploi de bénéficiaires à hauteur de <strong>6 %</strong> de l'effectif ; déclaration annuelle (DOETH) par la DSN ; contribution si l'obligation n'est pas remplie</td><td>Articles L5212-1 et suivants</td><td>Oui</td></tr>
<tr><td>Rapport de durabilité (CSRD)</td><td>Grandes entreprises et sociétés cotées selon calendrier européen</td><td>Informations de durabilité selon les normes ESRS, dont ESRS S1 « Effectifs de l'entreprise »</td><td>Articles L232-6-3 et suivants du Code de commerce</td><td>Non (voir 6.3)</td></tr>
</table>

<h3>La BDESE</h3>
<p>La BDESE rassemble les informations sur les grandes orientations économiques et sociales de l'entreprise. À défaut d'accord, ses thèmes sont fixés par l'article L2312-36 : investissements (social, matériel et immatériel), <strong>égalité professionnelle entre les femmes et les hommes</strong>, fonds propres et endettement, <strong>ensemble des éléments de la rémunération des salariés et dirigeants</strong>, activités sociales et culturelles, rémunération des financeurs, flux financiers à destination de l'entreprise, partenariats, transferts commerciaux et financiers entre entités du groupe, et <strong>conséquences environnementales de l'activité</strong>. Le contenu précis diffère selon que l'entreprise a moins ou plus de 300 salariés (articles R2312-8 et R2312-9). Les informations portent sur les deux années précédentes, l'année en cours et les perspectives des trois années suivantes.</p>
<p>Le <strong>rapport de situation comparée</strong> (RSC) des conditions d'emploi des femmes et des hommes, autrefois document autonome, est depuis la loi du 17 août 2015 <strong>intégré dans la BDESE</strong> sous forme d'indicateurs : effectifs, embauches, promotions, rémunérations, formation, conditions de travail, articulation vie professionnelle et vie personnelle, par sexe.</p>
<p><strong>Rôle de l'assistant(e) RH</strong> : alimenter les rubriques sociales de la BDESE (effectifs par sexe, âge, contrat, catégorie ; entrées et sorties ; absentéisme ; formation ; rémunérations moyennes par catégorie et par sexe) à partir des données consolidées, sans aucune donnée nominative, et respecter le calendrier de mise à jour avant les consultations du CSE.</p>

<h3>L'index de l'égalité professionnelle</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Entreprises de 50 à 250 salariés</th><th>Entreprises de plus de 250 salariés</th></tr>
<tr><td>Écart de rémunération femmes-hommes (par tranche d'âge et catégorie de postes)</td><td>40 points</td><td>40 points</td></tr>
<tr><td>Écart de taux d'augmentations individuelles</td><td>35 points (augmentations et promotions confondues)</td><td>20 points</td></tr>
<tr><td>Écart de taux de promotions</td><td>—</td><td>15 points</td></tr>
<tr><td>Pourcentage de salariées augmentées à leur retour de congé maternité (si augmentations pendant le congé)</td><td>15 points</td><td>15 points</td></tr>
<tr><td>Nombre de salariés du sexe sous-représenté parmi les 10 plus hautes rémunérations</td><td>10 points</td><td>10 points</td></tr>
<tr><td><strong>Total</strong></td><td><strong>100 points</strong></td><td><strong>100 points</strong></td></tr>
</table>
<ul>
<li>Note inférieure à <strong>75 points</strong> : mesures de correction (et, le cas échéant, de rattrapage salarial) à définir par accord ou décision unilatérale après consultation du CSE, pour atteindre au moins 75 points dans un délai de 3 ans ; à défaut, pénalité financière pouvant aller jusqu'à 1 % de la masse salariale ;</li>
<li>Note inférieure à <strong>85 points</strong> : fixation et publication d'objectifs de progression pour chaque indicateur n'ayant pas atteint la note maximale ;</li>
<li>Certains indicateurs peuvent être <strong>incalculables</strong> (par exemple aucun retour de congé maternité dans l'année) : la note est alors ramenée sur 100 au prorata des points calculables, sous réserve qu'au moins 75 points soient calculables.</li>
</ul>
<p><strong>Exemple ALTÉA 2026 (données au 31 décembre, publication au plus tard le 1er mars 2027) :</strong></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Résultat</th><th>Points</th></tr>
<tr><td>Écart de rémunération (après application du seuil de pertinence et pondération par les effectifs des groupes)</td><td>2,6 % en faveur des hommes</td><td>37 / 40</td></tr>
<tr><td>Écart de taux d'augmentations individuelles</td><td>1,5 point de pourcentage</td><td>35 / 35</td></tr>
<tr><td>Retour de congé maternité</td><td>4 salariées concernées, 4 augmentées</td><td>15 / 15</td></tr>
<tr><td>Hautes rémunérations</td><td>3 femmes parmi les 10 plus hautes rémunérations</td><td>5 / 10</td></tr>
<tr><td><strong>Note globale</strong></td><td></td><td><strong>92 / 100</strong></td></tr>
</table>
<p>La note de 92 dispense d'objectifs de progression au titre du seuil de 85 points ; la direction peut néanmoins se fixer un objectif sur l'indicateur des hautes rémunérations. Le barème détaillé de chaque indicateur figure en annexe du décret et sur le simulateur officiel Egapro, qu'il faut utiliser pour le calcul.</p>

<h3>La directive (UE) 2023/970 sur la transparence des rémunérations</h3>
<p>Adoptée le 10 mai 2023, la directive renforce l'application du principe d'égalité de rémunération entre femmes et hommes pour un même travail ou un travail de valeur égale. Les États membres devaient la transposer au plus tard le <strong>7 juin 2026</strong> : vérifiez l'état des textes français de transposition publiés et leur calendrier, l'index actuel ayant vocation à évoluer vers les indicateurs de la directive.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Mesure</th><th>Contenu</th></tr>
<tr><td>Transparence avant l'embauche</td><td>Le candidat reçoit une information sur la rémunération initiale ou sa fourchette (dans l'offre ou avant l'entretien) ; interdiction de l'interroger sur ses rémunérations antérieures</td></tr>
<tr><td>Droit à l'information des salariés</td><td>Tout salarié peut demander son niveau de rémunération et les niveaux moyens, ventilés par sexe, des salariés effectuant un même travail ou un travail de valeur égale ; les clauses de confidentialité salariale sont interdites</td></tr>
<tr><td>Critères de progression</td><td>Les critères de fixation et de progression des rémunérations doivent être accessibles, objectifs et non sexistes</td></tr>
<tr><td>Rapport sur l'écart de rémunération</td><td>Écart moyen et médian, écart sur la part variable, proportion de bénéficiaires de variable par sexe, proportion de femmes et d'hommes dans chaque quartile, écarts par catégorie de travailleurs</td></tr>
<tr><td>Fréquence du rapport</td><td>250 salariés et plus : annuel, premier rapport en 2027 sur l'année 2026 ; 150 à 249 : tous les 3 ans à partir de 2027 ; 100 à 149 : tous les 3 ans à partir de 2031</td></tr>
<tr><td>Évaluation conjointe</td><td>Si un écart d'au moins 5 % dans une catégorie de travailleurs n'est pas justifié par des critères objectifs et non sexistes et n'a pas été corrigé dans les 6 mois, évaluation conjointe des rémunérations avec les représentants du personnel</td></tr>
<tr><td>Charge de la preuve</td><td>En cas de litige, c'est à l'employeur de prouver l'absence de discrimination</td></tr>
</table>
<p><strong>Pour ALTÉA SERVICES</strong> (entre 100 et 149 salariés), le rapport européen sur l'écart de rémunération ne serait exigé qu'à partir de 2031 selon la directive ; en revanche, les obligations de transparence au recrutement et le droit à l'information s'appliqueront à toutes les entreprises dès l'entrée en vigueur du texte français. Le service RH a donc intérêt à préparer dès maintenant une <strong>classification des emplois par catégories de travailleurs</strong> et à vérifier ses écarts par catégorie.</p>

<h3>L'obligation d'emploi des travailleurs handicapés (OETH)</h3>
<ul>
<li>Toute entreprise d'au moins 20 salariés doit employer des bénéficiaires de l'obligation d'emploi (BOETH : RQTH, pension d'invalidité, rente AT/MP avec incapacité d'au moins 10 %, etc.) à hauteur de <strong>6 %</strong> de son effectif d'assujettissement ;</li>
<li>L'effectif d'assujettissement et le nombre de bénéficiaires sont calculés en moyenne annuelle selon les règles de la sécurité sociale (article L130-1 du Code de la sécurité sociale) ; l'obligation est arrondie à l'entier inférieur ;</li>
<li>La déclaration (DOETH) se fait par la DSN ; l'URSSAF transmet en début d'année les éléments de calcul à l'employeur ;</li>
<li>Si l'obligation n'est pas remplie, une contribution annuelle est due par bénéficiaire manquant : 400 fois le SMIC horaire pour les entreprises de 20 à moins de 250 salariés (500 fois de 250 à moins de 750, 600 fois à partir de 750), avec des déductions possibles (contrats de sous-traitance avec le secteur protégé et adapté, dépenses déductibles) et un taux majoré (1 500 fois le SMIC horaire) en l'absence de toute action pendant plus de 3 ans. Vérifier ces règles chaque année sur urssaf.fr et agefiph.fr.</li>
</ul>
<p><strong>Exemple ALTÉA (SMIC horaire 2025 pour l'exercice, à actualiser).</strong> Effectif d'assujettissement communiqué par l'URSSAF : 121,5. Obligation : 121,5 × 6 % = 7,29, arrondie à <strong>7 bénéficiaires</strong>. ALTÉA emploie en moyenne 5 BOETH : il manque 2 unités. Contribution brute avant déductions : 2 × 400 × 11,88 = <strong>9 504 €</strong>. Si ALTÉA a confié une prestation à un ESAT ou une entreprise adaptée, une partie du coût de la prestation est déductible selon les règles en vigueur.</p>
<blockquote><strong>Attention aux effectifs :</strong> chaque obligation a son propre mode de calcul de l'effectif (Code du travail pour le CSE et la BDESE, Code de la sécurité sociale pour l'OETH et les seuils sociaux de cotisations). Ne jamais réutiliser un effectif calculé pour une obligation dans une autre sans vérifier la règle (voir 6.4).</blockquote>
`,
      },
      {
        title: "6.3 – De la DPEF au rapport de durabilité : CSRD et norme ESRS S1",
        content: `
<h3>La DPEF, ce qu'elle était</h3>
<p>La <strong>déclaration de performance extra-financière</strong> (DPEF), prévue par l'article L225-102-1 du Code de commerce (transposition de la directive 2014/95/UE dite NFRD), imposait aux grandes sociétés dépassant certains seuils (notamment 500 salariés) de présenter dans leur rapport de gestion leur modèle d'affaires, les principaux risques sociaux, environnementaux et de gouvernance, les politiques mises en œuvre et leurs résultats, avec des indicateurs clés de performance. Le volet social comportait typiquement : effectif total et répartition, embauches et licenciements, rémunérations et leur évolution, organisation du temps de travail, absentéisme, santé et sécurité, accidents du travail, formation, égalité de traitement, emploi des personnes handicapées.</p>

<h3>La CSRD et le rapport de durabilité</h3>
<p>La directive (UE) 2022/2464 du 14 décembre 2022, dite <strong>CSRD</strong> (Corporate Sustainability Reporting Directive), transposée en France par l'ordonnance n° 2023-1142 du 6 décembre 2023, remplace la NFRD et donc la DPEF par un <strong>rapport de durabilité</strong> : informations normalisées selon les <strong>ESRS</strong> (European Sustainability Reporting Standards), fondées sur une <strong>analyse de double matérialité</strong> (impacts de l'entreprise sur les personnes et l'environnement, et risques ou opportunités de durabilité pour l'entreprise), publiées dans une section dédiée du rapport de gestion et <strong>certifiées</strong> par un commissaire aux comptes ou un organisme tiers indépendant.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Vague</th><th>Entreprises concernées (calendrier initial)</th><th>Premier exercice (calendrier initial)</th><th>Après la directive « stop-the-clock »</th></tr>
<tr><td>1</td><td>Grandes entités d'intérêt public déjà soumises à la NFRD (plus de 500 salariés)</td><td>2024 (rapport publié en 2025)</td><td>Inchangé</td></tr>
<tr><td>2</td><td>Autres grandes entreprises (2 des 3 critères : 250 salariés, 50 M€ de chiffre d'affaires, 25 M€ de total de bilan)</td><td>2025 (rapport en 2026)</td><td>Reporté de 2 ans : exercice 2027 (rapport en 2028)</td></tr>
<tr><td>3</td><td>PME cotées</td><td>2026 (rapport en 2027)</td><td>Reporté de 2 ans : exercice 2028</td></tr>
<tr><td>4</td><td>Entreprises de pays tiers réalisant un chiffre d'affaires important dans l'UE</td><td>2028</td><td>Inchangé à ce stade</td></tr>
</table>
<p>La directive (UE) 2025/794 du 14 avril 2025, dite <strong>« stop-the-clock »</strong>, a reporté de deux ans les vagues 2 et 3, dans le cadre du paquet de simplification « Omnibus » présenté par la Commission européenne en février 2025. Ce paquet prévoit en outre une réduction importante du champ d'application (relèvement des seuils d'effectif et de chiffre d'affaires) et une simplification des ESRS : <strong>vérifiez le texte définitivement adopté et sa transposition en France</strong> avant toute affirmation sur le périmètre applicable. Les entreprises dont l'entrée dans la CSRD a été reportée doivent vérifier, avec leur commissaire aux comptes, les obligations transitoires qui leur restent applicables.</p>

<h3>La norme ESRS S1 « Effectifs de l'entreprise »</h3>
<p>La norme sociale ESRS S1 traite des salariés et des non-salariés (intérimaires, travailleurs indépendants) de l'entreprise. Ses exigences de publication (dans leur version adoptée en 2023, en cours de simplification) couvrent notamment :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Exigence</th><th>Contenu</th><th>Données RH à mobiliser</th></tr>
<tr><td>S1-1 à S1-5</td><td>Politiques, dialogue avec les salariés, mécanismes de réclamation, actions, objectifs</td><td>Accords, procédures d'alerte, plans d'action</td></tr>
<tr><td>S1-6</td><td>Caractéristiques des salariés</td><td>Effectif par sexe, par pays, par type de contrat (permanent, temporaire, heures non garanties), temps plein et partiel, départs et taux de rotation</td></tr>
<tr><td>S1-7</td><td>Caractéristiques des non-salariés</td><td>Intérimaires, indépendants</td></tr>
<tr><td>S1-8</td><td>Couverture des négociations collectives et dialogue social</td><td>Part des salariés couverts par une convention collective, représentation</td></tr>
<tr><td>S1-9</td><td>Indicateurs de diversité</td><td>Répartition femmes-hommes de l'encadrement supérieur, répartition par âge (moins de 30 ans, 30-50 ans, plus de 50 ans)</td></tr>
<tr><td>S1-10 et S1-11</td><td>Salaire décent, protection sociale</td><td>Comparaison des salaires au salaire de référence, couverture des risques</td></tr>
<tr><td>S1-12</td><td>Personnes handicapées</td><td>Pourcentage de salariés handicapés</td></tr>
<tr><td>S1-13</td><td>Formation et développement des compétences</td><td>Heures moyennes de formation par salarié et par sexe, part des salariés ayant eu un entretien d'évaluation</td></tr>
<tr><td>S1-14</td><td>Santé et sécurité</td><td>Couverture par un système de management, décès, nombre et taux d'accidents du travail, jours perdus</td></tr>
<tr><td>S1-15</td><td>Équilibre vie professionnelle et vie privée</td><td>Salariés ayant droit à des congés familiaux et part de ceux qui les ont pris</td></tr>
<tr><td>S1-16</td><td>Rémunération</td><td>Écart de rémunération femmes-hommes, ratio de la rémunération annuelle totale la plus élevée sur la rémunération médiane</td></tr>
<tr><td>S1-17</td><td>Incidents, plaintes et atteintes graves aux droits humains</td><td>Cas de discrimination et de harcèlement signalés, sanctions</td></tr>
</table>

<h3>Et ALTÉA SERVICES ?</h3>
<p>Avec 148 salariés, ALTÉA SERVICES n'est soumise ni à la DPEF ni au rapport de durabilité. Mais elle est concernée <strong>indirectement</strong> : ses grands clients, eux-mêmes assujettis, doivent rendre compte de leur <strong>chaîne de valeur</strong> et lui adressent des questionnaires RSE (taux d'accidents du travail, formation, égalité, part de CDI). Pour répondre de manière cohérente, ALTÉA peut s'appuyer sur la norme volontaire simplifiée pour les PME (<strong>VSME</strong>) publiée par l'EFRAG, qui reprend en version allégée les principaux indicateurs sociaux. Le paquet Omnibus prévoit de limiter les informations que les grandes entreprises peuvent exiger de leurs fournisseurs PME : vérifiez les règles adoptées.</p>
<p><strong>Exemple de réponse à un questionnaire client (données 2026 d'ALTÉA) :</strong></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Question du client</th><th>Réponse validée par la direction</th><th>Source</th></tr>
<tr><td>Effectif total au 31/12 et part de femmes</td><td>148 salariés, dont 97 femmes (65,5 %)</td><td>Registre, Lucca</td></tr>
<tr><td>Part des salariés en CDI</td><td>136 / 148 = 91,9 %</td><td>Registre</td></tr>
<tr><td>Taux de fréquence des accidents du travail</td><td>40,00</td><td>Déclarations AT, heures travaillées (voir 6.5)</td></tr>
<tr><td>Part des salariés formés dans l'année</td><td>60,1 %</td><td>Plan de développement des compétences</td></tr>
<tr><td>Note de l'index égalité</td><td>92 / 100</td><td>Déclaration Egapro</td></tr>
</table>
<blockquote><strong>Rôle de l'assistant(e) RH :</strong> fournir des données exactes, définies et sourcées ; ne jamais transmettre une donnée à l'extérieur sans validation de la direction ; conserver la trace de ce qui a été répondu, à qui et quand, pour garantir la cohérence d'une année sur l'autre.</blockquote>
`,
      },
      {
        title: "6.4 – Indicateurs d'effectif et de structure : effectifs, ETP, effectif moyen, pyramide des âges, ancienneté",
        content: `
<h3>Les différentes notions d'effectif</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Notion</th><th>Définition et formule</th><th>Usage</th></tr>
<tr><td><strong>Effectif physique</strong> (ou inscrit)</td><td>Nombre de personnes titulaires d'un contrat de travail à une date donnée, quel que soit leur temps de travail ; un salarié = 1</td><td>Registre, communication, pyramide des âges</td></tr>
<tr><td><strong>Effectif en équivalent temps plein (ETP)</strong></td><td>Somme des quotités de temps de travail : ETP d'un salarié = durée contractuelle / durée à temps plein ; un salarié à 24 h par semaine = 24 / 35 = 0,69 ETP</td><td>Coûts, ratios de productivité, heures théoriques</td></tr>
<tr><td><strong>Effectif moyen</strong></td><td>Moyenne des effectifs sur une période : (effectif début + effectif fin) / 2, ou mieux somme des effectifs de fin de mois / 12</td><td>Dénominateur du turnover, des taux annuels</td></tr>
<tr><td><strong>Effectif moyen annuel « sécurité sociale »</strong></td><td>Moyenne des effectifs de chaque mois de l'année civile précédente, chaque salarié étant compté selon les règles de l'article L130-1 et R130-1 du Code de la sécurité sociale</td><td>Seuils sociaux de cotisations, OETH, participation…</td></tr>
<tr><td><strong>Effectif « Code du travail »</strong></td><td>Règles de l'article L1111-2 : CDI à temps plein = 1 ; temps partiel au prorata ; CDD, intérimaires et mis à disposition au prorata de leur temps de présence sur les 12 mois précédents, sauf s'ils remplacent un salarié absent ; apprentis et contrats de professionnalisation exclus (article L1111-3)</td><td>CSE, BDESE, index égalité, règlement intérieur</td></tr>
</table>

<h3>Les règles de décompte de l'effectif sécurité sociale (URSSAF)</h3>
<ul>
<li>L'effectif moyen annuel correspond à la moyenne des effectifs déterminés chaque mois de l'année civile ; il est calculé par l'URSSAF à partir des DSN et communiqué à l'employeur ;</li>
<li>Les salariés à temps plein en CDI comptent pour 1 ; les salariés à temps partiel au prorata de leur durée de travail ; les CDD et les salariés intermittents au prorata de leur présence (règles détaillées à l'article R130-1) ;</li>
<li>Sont exclus notamment les apprentis, les titulaires de contrats de professionnalisation (pendant la durée du contrat ou de l'action de professionnalisation), certains contrats aidés, et les CDD de remplacement d'un salarié absent ;</li>
<li>Règle de franchissement : un seuil n'est considéré comme franchi à la hausse que lorsqu'il a été atteint ou dépassé pendant <strong>5 années civiles consécutives</strong> ; le franchissement à la baisse sur une année civile ramène le compteur à zéro (article L130-1 du Code de la sécurité sociale, issu de la loi PACTE de 2019).</li>
</ul>

<h3>Les effectifs d'ALTÉA SERVICES en 2026</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Mois</th><th>Jan.</th><th>Fév.</th><th>Mars</th><th>Avr.</th><th>Mai</th><th>Juin</th><th>Juil.</th><th>Août</th><th>Sept.</th><th>Oct.</th><th>Nov.</th><th>Déc.</th></tr>
<tr><td>Effectif physique fin de mois</td><td>142</td><td>143</td><td>144</td><td>145</td><td>146</td><td>148</td><td>150</td><td>147</td><td>146</td><td>147</td><td>148</td><td>148</td></tr>
</table>
<ul>
<li>Somme des 12 effectifs mensuels : 1 754 ; effectif moyen physique = 1 754 / 12 = <strong>146,17</strong> ;</li>
<li>Méthode simplifiée (début + fin) / 2 : effectif au 1er janvier 142 (effectif au 31/12/2025), au 31 décembre 148 → (142 + 148) / 2 = <strong>145</strong>. La méthode mensuelle est plus précise lorsque l'effectif varie en cours d'année (pic de juillet lié aux remplacements d'été) ;</li>
<li>Mouvements 2026 : 31 entrées, 25 sorties ; contrôle : 142 + 31 − 25 = 148.</li>
</ul>
<p><strong>Structure au 31 décembre 2026 :</strong></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Catégorie</th><th>Effectif</th><th>Part</th></tr>
<tr><td>Femmes</td><td>97</td><td>65,5 %</td></tr>
<tr><td>Hommes</td><td>51</td><td>34,5 %</td></tr>
<tr><td>CDI</td><td>136</td><td>91,9 %</td></tr>
<tr><td>CDD</td><td>9</td><td>6,1 %</td></tr>
<tr><td>Contrats d'apprentissage</td><td>3</td><td>2,0 %</td></tr>
<tr><td>Temps plein</td><td>76</td><td>51,4 %</td></tr>
<tr><td>Temps partiel (quotité moyenne 60 %)</td><td>72</td><td>48,6 %</td></tr>
</table>
<p><strong>Répartition par catégorie au 31 décembre 2026 :</strong></p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Catégorie</th><th>Femmes</th><th>Hommes</th><th>Total</th><th>Part</th></tr>
<tr><td>Agents de propreté</td><td>80</td><td>32</td><td>112</td><td>75,7 %</td></tr>
<tr><td>Chefs d'équipe</td><td>5</td><td>7</td><td>12</td><td>8,1 %</td></tr>
<tr><td>Agents de maîtrise (chefs de site, inspecteurs)</td><td>4</td><td>6</td><td>10</td><td>6,8 %</td></tr>
<tr><td>Employés administratifs (dont l'apprenti(e) assistant(e) RH)</td><td>7</td><td>2</td><td>9</td><td>6,1 %</td></tr>
<tr><td>Cadres</td><td>1</td><td>4</td><td>5</td><td>3,4 %</td></tr>
<tr><td><strong>Total</strong></td><td><strong>97</strong></td><td><strong>51</strong></td><td><strong>148</strong></td><td><strong>100 %</strong></td></tr>
</table>
<p>ETP au 31 décembre : 76 × 1 + 72 × 0,60 = 76 + 43,2 = <strong>119,2 ETP</strong>. L'ETP moyen de l'année, calculé mois par mois à partir de Silae, est de <strong>118,0</strong> : c'est lui qui sert au calcul des heures théoriques et du salaire moyen par ETP.</p>

<h3>La pyramide des âges</h3>
<p>Âge calculé au 31 décembre de l'année, en années révolues. Effectifs d'ALTÉA par tranche d'âge et par sexe :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Tranche d'âge</th><th>Femmes</th><th>Hommes</th><th>Total</th><th>Part</th></tr>
<tr><td>Moins de 25 ans</td><td>7</td><td>5</td><td>12</td><td>8,1 %</td></tr>
<tr><td>25 à 34 ans</td><td>19</td><td>12</td><td>31</td><td>20,9 %</td></tr>
<tr><td>35 à 44 ans</td><td>27</td><td>11</td><td>38</td><td>25,7 %</td></tr>
<tr><td>45 à 54 ans</td><td>28</td><td>13</td><td>41</td><td>27,7 %</td></tr>
<tr><td>55 ans et plus</td><td>16</td><td>10</td><td>26</td><td>17,6 %</td></tr>
<tr><td><strong>Total</strong></td><td><strong>97</strong></td><td><strong>51</strong></td><td><strong>148</strong></td><td><strong>100 %</strong></td></tr>
</table>
<p><strong>Lecture</strong> : 45,3 % des salariés ont 45 ans ou plus (41 + 26 = 67 / 148) ; 26 salariés (17,6 %) ont 55 ans ou plus et pourront partir en retraite dans les 5 à 10 ans selon leur âge légal de départ et leur durée d'assurance : un enjeu de transmission des savoir-faire (chefs d'équipe) et de prévention de l'usure professionnelle dans un métier physique. La forme de la pyramide (base étroite, sommet large) caractérise une population vieillissante : la direction peut s'interroger sur l'attractivité auprès des moins de 25 ans (alternance, partenariats avec France Travail).</p>
<p><strong>Représentation</strong> : graphique en barres horizontales, hommes à gauche (valeurs saisies en négatif, étiquettes formatées sans signe) et femmes à droite, tranches d'âge en ordonnée de la plus jeune (en bas) à la plus âgée (en haut).</p>

<h3>L'ancienneté</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Ancienneté au 31/12/2026</th><th>Effectif</th><th>Part</th></tr>
<tr><td>Moins d'1 an</td><td>29</td><td>19,6 %</td></tr>
<tr><td>1 à moins de 3 ans</td><td>34</td><td>23,0 %</td></tr>
<tr><td>3 à moins de 5 ans</td><td>25</td><td>16,9 %</td></tr>
<tr><td>5 à moins de 10 ans</td><td>33</td><td>22,3 %</td></tr>
<tr><td>10 ans et plus</td><td>27</td><td>18,2 %</td></tr>
<tr><td><strong>Total</strong></td><td><strong>148</strong></td><td><strong>100 %</strong></td></tr>
</table>
<p>L'ancienneté moyenne se calcule à partir de la date d'entrée (en tenant compte, le cas échéant, de la reprise d'ancienneté prévue par la CCN en cas de transfert de marché dans la propreté). <strong>Lecture</strong> : 42,6 % des salariés ont moins de 3 ans d'ancienneté (29 + 34 = 63 / 148), ce qui est cohérent avec un turnover élevé ; 40,5 % ont 5 ans et plus (33 + 27 = 60 / 148). L'entreprise a donc deux populations : un socle stable et une population mobile sur laquelle se concentrent les départs.</p>
<blockquote><strong>Erreur fréquente :</strong> calculer un taux sur l'effectif ETP alors que le numérateur est en personnes (ou l'inverse). Un taux de salariés formés se calcule en personnes / personnes ; un coût moyen se calcule plutôt par ETP. Le périmètre du numérateur et celui du dénominateur doivent toujours être identiques.</blockquote>
`,
      },
      {
        title: "6.5 – Indicateurs de mouvement, d'absentéisme et de santé-sécurité",
        content: `
<h3>Le turnover : plusieurs formules, une seule règle, les annoncer</h3>
<p>Il n'existe pas de formule légale unique du turnover : chaque entreprise doit choisir sa formule, l'écrire dans la fiche indicateur et la conserver d'une année sur l'autre. Données ALTÉA 2026 : effectif au 1er janvier 142, au 31 décembre 148, effectif moyen mensuel 146,17 ; 31 entrées et 25 sorties.</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Formule</th><th>Calcul ALTÉA 2026</th><th>Résultat</th></tr>
<tr><td>Taux de rotation (turnover global)</td><td>[(entrées + sorties) / 2] / effectif moyen × 100</td><td>[(31 + 25) / 2] / 146,17 = 28 / 146,17</td><td><strong>19,16 %</strong></td></tr>
<tr><td>Taux de rotation sur effectif de début</td><td>[(entrées + sorties) / 2] / effectif au 1er janvier × 100</td><td>28 / 142</td><td>19,72 %</td></tr>
<tr><td>Taux d'entrée</td><td>Entrées / effectif moyen × 100</td><td>31 / 146,17</td><td>21,21 %</td></tr>
<tr><td>Taux de sortie (ou de départ)</td><td>Sorties / effectif moyen × 100</td><td>25 / 146,17</td><td>17,10 %</td></tr>
<tr><td>Taux de départs volontaires</td><td>Démissions / effectif moyen × 100</td><td>11 / 146,17</td><td>7,53 %</td></tr>
<tr><td>Taux de stabilité</td><td>Salariés présents au 1er janvier et encore présents au 31 décembre / effectif au 1er janvier × 100</td><td>123 / 142</td><td>86,62 %</td></tr>
<tr><td>Taux de départ des nouveaux embauchés</td><td>Embauchés de l'année partis dans l'année / embauches de l'année × 100</td><td>6 / 31</td><td>19,35 %</td></tr>
</table>
<p><strong>Ventilation des 25 sorties</strong> : 11 démissions, 8 fins de CDD, 2 ruptures conventionnelles, 2 licenciements, 1 départ en retraite, 1 rupture de période d'essai. Les fins de CDD relèvent de l'organisation de l'activité (remplacements d'été) ; les démissions sont le vrai signal d'attractivité. Le taux de stabilité confirme la lecture de l'ancienneté : 19 des 25 sortants étaient présents au 1er janvier (142 − 19 = 123 salariés stables), et 6 sortants avaient été embauchés dans l'année.</p>
<blockquote><strong>Comment commenter :</strong> « Le turnover de 19,2 % est porté par les fins de CDD saisonniers (8 sorties) ; hors CDD, le taux de départ est de 17 / 146,17 = 11,6 %. Les démissions (7,5 %) se concentrent sur les agents de moins de 3 ans d'ancienneté du site de Vitry. » Un indicateur commenté indique toujours <em>de quoi il est fait</em> et <em>où il se concentre</em>.</blockquote>

<h3>Le taux d'absentéisme</h3>
<p><strong>Formule</strong> : taux d'absentéisme = heures d'absence / heures théoriques de travail × 100.</p>
<ul>
<li><strong>Numérateur</strong> : absences pour maladie (y compris temps partiel thérapeutique pour les heures non travaillées), accidents du travail, de trajet et maladies professionnelles, absences injustifiées, absences autorisées non rémunérées et absences pour enfant malade ; on exclut les congés payés, les jours fériés, les RTT, la formation, les congés maternité, paternité et familiaux légaux, les heures de délégation des représentants du personnel (qui sont du temps de travail). Certaines entreprises incluent la maternité : il faut le dire dans la fiche indicateur.</li>
<li><strong>Dénominateur</strong> : heures théoriques = ETP moyen × durée annuelle théorique. Pour un temps plein à 35 heures, la durée annuelle de référence est de <strong>1 607 heures</strong> (incluant la journée de solidarité), soit 52 semaines moins 5 semaines de congés et les jours fériés chômés.</li>
</ul>
<p><strong>Calcul ALTÉA 2026</strong> : heures théoriques = 118,0 ETP × 1 607 = <strong>189 626 heures</strong>. Heures d'absence (export Lucca) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Motif</th><th>Heures</th><th>Taux</th><th>Part du total des absences</th></tr>
<tr><td>Maladie</td><td>8 720</td><td>4,60 %</td><td>73,3 %</td></tr>
<tr><td>Accidents du travail et de trajet</td><td>1 024</td><td>0,54 %</td><td>8,6 %</td></tr>
<tr><td>Absences injustifiées</td><td>493</td><td>0,26 %</td><td>4,1 %</td></tr>
<tr><td>Autres absences non planifiées (enfant malade, absences autorisées non rémunérées)</td><td>1 653</td><td>0,87 %</td><td>13,9 %</td></tr>
<tr><td><strong>Total</strong></td><td><strong>11 890</strong></td><td><strong>6,27 %</strong></td><td><strong>100 %</strong></td></tr>
</table>
<p>Par site :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Site</th><th>Heures théoriques</th><th>Heures d'absence</th><th>Taux</th></tr>
<tr><td>Créteil Europarc</td><td>68 800</td><td>3 509</td><td>5,10 %</td></tr>
<tr><td>Vitry-sur-Seine</td><td>51 600</td><td>4 334</td><td>8,40 %</td></tr>
<tr><td>Ivry-sur-Seine</td><td>54 026</td><td>3 697</td><td>6,84 %</td></tr>
<tr><td>Siège (Créteil)</td><td>15 200</td><td>350</td><td>2,30 %</td></tr>
<tr><td><strong>Total</strong></td><td><strong>189 626</strong></td><td><strong>11 890</strong></td><td><strong>6,27 %</strong></td></tr>
</table>
<p><strong>Point de méthode</strong> : le taux global n'est pas la moyenne des taux des sites (5,10 + 8,40 + 6,84 + 2,30) / 4 = 5,66 % ; c'est la somme des heures d'absence divisée par la somme des heures théoriques. Une moyenne non pondérée sous-estime ici l'absentéisme, car le site le plus touché (Vitry) pèse lourd.</p>
<p><strong>Autres indicateurs utiles</strong> : <em>fréquence</em> (nombre d'arrêts par salarié : beaucoup d'arrêts courts signalent souvent un problème d'organisation ou de climat), <em>durée moyenne</em> des arrêts, part des absences de courte durée (1 à 3 jours).</p>

<h3>Les indicateurs de santé et de sécurité au travail</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Formule</th><th>Calcul ALTÉA 2026</th><th>Résultat</th></tr>
<tr><td>Taux de fréquence (TF)</td><td>Nombre d'accidents du travail avec arrêt × 1 000 000 / heures réellement travaillées</td><td>7 × 1 000 000 / 175 000</td><td><strong>40,00</strong></td></tr>
<tr><td>Taux de gravité (TG)</td><td>Nombre de jours d'arrêt (calendaires) consécutifs aux accidents du travail × 1 000 / heures réellement travaillées</td><td>214 × 1 000 / 175 000</td><td><strong>1,22</strong></td></tr>
<tr><td>Indice de fréquence (IF)</td><td>Nombre d'accidents du travail avec arrêt × 1 000 / effectif salarié moyen</td><td>7 × 1 000 / 146,17</td><td><strong>47,89</strong></td></tr>
</table>
<p><strong>Lecture</strong> : le TF de 40,00 signifie 40 accidents avec arrêt pour un million d'heures travaillées ; le TG de 1,22 signifie 1,22 jour d'arrêt pour 1 000 heures travaillées. Les heures <em>réellement travaillées</em> (175 000, issues des heures payées hors absences, y compris heures supplémentaires) diffèrent des heures théoriques. Les accidents de trajet sont exclus du TF et du TG (ils sont suivis à part). La comparaison avec le secteur se fait à partir des statistiques de sinistralité par code risque publiées par l'Assurance maladie – Risques professionnels (ameli.fr), à la même date et avec la même définition.</p>
<blockquote><strong>Lien avec la paie et les cotisations :</strong> la sinistralité influence le taux de cotisation AT/MP de l'entreprise (tarification mixte entre 20 et 149 salariés, individuelle à partir de 150, selon les règles en vigueur). Le taux notifié est consultable sur le compte AT/MP de net-entreprises : c'est une donnée externe à rapprocher des indicateurs internes.</blockquote>
`,
      },
      {
        title: "6.6 – Indicateurs de rémunération, d'égalité, de formation et de recrutement",
        content: `
<h3>La masse salariale</h3>
<p>La <strong>masse salariale brute</strong> est la somme des rémunérations brutes versées sur la période (salaires de base, heures supplémentaires, primes, indemnités de congés payés, avantages en nature), hors remboursements de frais. La <strong>masse salariale chargée</strong> (ou coût employeur) y ajoute les cotisations patronales, nettes des allègements. Les indemnités de rupture sont souvent suivies à part. Données ALTÉA (états annuels Silae) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Formule</th><th>2025</th><th>2026</th><th>Évolution</th></tr>
<tr><td>Masse salariale brute</td><td>Somme des bruts</td><td>3 250 000 €</td><td>3 420 000 €</td><td>+ 5,23 %</td></tr>
<tr><td>ETP moyen</td><td>Moyenne des ETP mensuels</td><td>115,0</td><td>118,0</td><td>+ 2,61 %</td></tr>
<tr><td>Salaire moyen brut annuel par ETP</td><td>Masse brute / ETP moyen</td><td>28 260,87 €</td><td>28 983,05 €</td><td>+ 2,56 %</td></tr>
<tr><td>Salaire moyen brut mensuel par ETP</td><td>Salaire annuel / 12</td><td>2 355,07 €</td><td>2 415,25 €</td><td>+ 2,56 %</td></tr>
<tr><td>Coût employeur total</td><td>Brut + cotisations patronales nettes</td><td></td><td>4 275 000 €</td><td></td></tr>
<tr><td>Taux de charges patronales apparent</td><td>(Coût employeur − brut) / brut</td><td></td><td>855 000 / 3 420 000 = 25,0 %</td><td></td></tr>
<tr><td>Poids de la masse salariale dans le chiffre d'affaires</td><td>Coût employeur / chiffre d'affaires</td><td></td><td>4 275 000 / 9 800 000 = 43,6 %</td><td></td></tr>
</table>
<p><strong>Analyse de l'évolution</strong> : la hausse de 5,23 % se décompose en un <em>effet effectif</em> (+ 2,61 % d'ETP) et un <em>effet salaire moyen</em> (+ 2,56 %) : 1,0261 × 1,0256 = 1,0523. L'effet salaire moyen lui-même peut résulter des augmentations générales et individuelles, de la revalorisation des minima conventionnels, des heures supplémentaires, ou d'un <em>effet de structure</em> (embauche de profils plus qualifiés, départs de salariés anciens mieux payés…). Le taux de charges apparent de 25 % reflète l'importance des allègements généraux sur les bas salaires dans la propreté ; il ne doit pas être comparé à un taux théorique sans précaution.</p>

<h3>Salaire moyen et salaire médian</h3>
<p>Le <strong>salaire moyen</strong> est la somme des salaires divisée par le nombre de salariés ; le <strong>salaire médian</strong> partage la population en deux moitiés égales (la moitié gagne moins, l'autre moitié plus). La médiane résiste aux valeurs extrêmes. Exemple : salaires mensuels bruts des 9 salariés du siège d'ALTÉA, classés par ordre croissant :</p>
<p>2 150 – 2 200 – 2 260 – 2 310 – <strong>2 400</strong> – 2 550 – 2 900 – 3 450 – 4 800</p>
<ul>
<li>Moyenne : 25 020 / 9 = <strong>2 780 €</strong> ;</li>
<li>Médiane : 5e valeur sur 9 = <strong>2 400 €</strong> ; avec un nombre pair de valeurs, la médiane est la moyenne des deux valeurs centrales ;</li>
<li>Lecture : la moyenne est tirée vers le haut par la rémunération du directeur administratif ; 6 salariés sur 9 gagnent moins que la moyenne. Pour décrire « le salaire typique », la médiane est plus pertinente ; la directive (UE) 2023/970 impose d'ailleurs de publier l'écart moyen <em>et</em> l'écart médian.</li>
</ul>

<h3>L'écart de rémunération entre les femmes et les hommes</h3>
<p><strong>Formule</strong> : écart = (rémunération moyenne des hommes − rémunération moyenne des femmes) / rémunération moyenne des hommes × 100. Un écart positif est en faveur des hommes. Rémunérations mensuelles brutes moyennes en équivalent temps plein (base et primes fixes) chez ALTÉA en 2026, <strong>hors apprenti(e)</strong> (les apprentis sont exclus des calculs d'écart de rémunération, leur salaire étant fixé en pourcentage du SMIC selon l'âge et l'année de contrat) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Catégorie de postes</th><th>Femmes (effectif)</th><th>Moyenne femmes</th><th>Hommes (effectif)</th><th>Moyenne hommes</th><th>Écart</th></tr>
<tr><td>Agents de propreté</td><td>80</td><td>1 905 €</td><td>32</td><td>1 968 €</td><td>(1 968 − 1 905) / 1 968 = 3,20 %</td></tr>
<tr><td>Chefs d'équipe</td><td>5</td><td>2 240 €</td><td>7</td><td>2 310 €</td><td>70 / 2 310 = 3,03 %</td></tr>
<tr><td>Agents de maîtrise</td><td>4</td><td>2 620 €</td><td>6</td><td>2 740 €</td><td>120 / 2 740 = 4,38 %</td></tr>
<tr><td>Employés administratifs (hors apprenti(e))</td><td>6</td><td>2 180 €</td><td>2</td><td>2 260 €</td><td>80 / 2 260 = 3,54 %</td></tr>
<tr><td>Cadres</td><td>1</td><td>3 900 €</td><td>4</td><td>4 350 €</td><td>450 / 4 350 = 10,34 % (groupe non diffusable)</td></tr>
<tr><td><strong>Ensemble</strong></td><td><strong>96</strong></td><td><strong>1 990,21 €</strong></td><td><strong>51</strong></td><td><strong>2 304,04 €</strong></td><td><strong>313,83 / 2 304,04 = 13,62 %</strong></td></tr>
</table>
<p>Calcul des moyennes d'ensemble (pondérées par les effectifs) : femmes = (80 × 1 905 + 5 × 2 240 + 4 × 2 620 + 6 × 2 180 + 1 × 3 900) / 96 = (152 400 + 11 200 + 10 480 + 13 080 + 3 900) / 96 = 191 060 / 96 = 1 990,21 € ; hommes = (32 × 1 968 + 7 × 2 310 + 6 × 2 740 + 2 × 2 260 + 4 × 4 350) / 51 = (62 976 + 16 170 + 16 440 + 4 520 + 17 400) / 51 = 117 506 / 51 = 2 304,04 €.</p>
<p><strong>Analyse</strong> : l'écart global (13,6 %) est bien supérieur aux écarts constatés dans chaque catégorie (3 à 4,4 %, sauf les cadres) : c'est d'abord un <strong>effet de structure</strong>. Les femmes sont surreprésentées parmi les agents de propreté (80 des 96 femmes retenues, soit 83,3 %), catégorie la moins rémunérée, et sous-représentées dans l'encadrement : 5 femmes sur 15 agents de maîtrise et cadres. Deux leviers distincts en découlent : l'accès des femmes aux postes de chef d'équipe, d'agent de maîtrise et de cadre, et l'examen des écarts au sein de chaque catégorie. Chez les cadres, l'écart dépasse le seuil de 5 % de la directive européenne, mais la catégorie ne compte qu'une femme : publier « le salaire moyen des femmes cadres » reviendrait à publier son salaire. Dans l'index français, les groupes comptant moins de 3 femmes ou moins de 3 hommes ne sont pas retenus ; en communication interne, on regroupe agents de maîtrise et cadres (« encadrement » : 5 femmes, 10 hommes) ou on ne diffuse pas le résultat. L'analyse individuelle (ancienneté, périmètre de responsabilité) reste à faire par la responsable RH, de manière confidentielle.</p>

<h3>Les indicateurs de formation et d'entretiens de parcours professionnel</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Formule</th><th>Calcul ALTÉA 2026</th><th>Résultat</th></tr>
<tr><td>Taux d'accès à la formation</td><td>Salariés ayant suivi au moins une action / effectif physique au 31/12 × 100</td><td>89 / 148</td><td><strong>60,1 %</strong></td></tr>
<tr><td>Taux d'accès des femmes</td><td>Femmes formées / femmes de l'effectif</td><td>52 / 97</td><td>53,6 %</td></tr>
<tr><td>Taux d'accès des hommes</td><td>Hommes formés / hommes de l'effectif</td><td>37 / 51</td><td>72,5 %</td></tr>
<tr><td>Taux d'accès des salariés à temps partiel</td><td>Salariés à temps partiel formés / salariés à temps partiel</td><td>34 / 72</td><td>47,2 %</td></tr>
<tr><td>Heures de formation par salarié formé</td><td>Total des heures / salariés formés</td><td>2 136 / 89</td><td>24,0 h</td></tr>
<tr><td>Heures de formation par salarié</td><td>Total des heures / effectif</td><td>2 136 / 148</td><td>14,4 h</td></tr>
<tr><td>Coût horaire de formation</td><td>Dépenses de formation / heures</td><td>61 400 / 2 136</td><td>28,75 €</td></tr>
<tr><td>Taux de réalisation des entretiens de parcours professionnel</td><td>Entretiens réalisés / entretiens dus dans la période × 100</td><td>29 / 34</td><td><strong>85,3 %</strong></td></tr>
<tr><td>États des lieux récapitulatifs réalisés</td><td>Réalisés / dus</td><td>6 / 6</td><td>100 %</td></tr>
</table>
<p><strong>Rappel réglementaire</strong> : la loi du 24 octobre 2025 a transformé l'entretien professionnel (auparavant tous les 2 ans, avec un état des lieux à 6 ans) en <strong>entretien de parcours professionnel</strong> : un premier entretien dans l'année qui suit l'embauche, puis un entretien tous les <strong>4 ans</strong>, et un <strong>état des lieux récapitulatif tous les 8 ans</strong> (article L6315-1 modifié). Les dispositions transitoires, les décrets d'application et les nouvelles règles de l'abondement correctif du CPF dans les entreprises d'au moins 50 salariés sont à vérifier sur travail-emploi.gouv.fr. Les « entretiens dus » de l'année se calculent donc à partir de la date d'embauche et de la date du dernier entretien de chaque salarié : 34 échéances en 2026 chez ALTÉA (salariés atteignant un an d'ancienneté et salariés atteignant 4 ans depuis leur dernier entretien). L'indicateur doit être suivi <strong>par salarié et par échéance</strong> dans Lucca, et pas seulement en taux global.</p>
<p><strong>Lecture</strong> : l'écart d'accès à la formation entre femmes (53,6 %) et hommes (72,5 %) est de 18,9 points ; le croisement avec le temps de travail montre que les salariés à temps partiel (72, en grande majorité des agentes) ne sont formés qu'à 47,2 %. L'hypothèse d'un effet « horaires décalés et temps partiel » est à vérifier avec les chefs de site avant de conclure ; une action possible est de programmer des sessions courtes sur les créneaux de travail, financées dans le cadre du plan de développement des compétences avec l'appui de l'OPCO de la branche (AKTO) selon les règles de prise en charge applicables à l'effectif d'ALTÉA.</p>

<h3>Les indicateurs de recrutement</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Formule</th><th>Calcul ALTÉA 2026</th><th>Résultat</th></tr>
<tr><td>Délai moyen de recrutement</td><td>Somme des délais (de la validation du besoin à l'acceptation de la proposition) / nombre de recrutements</td><td>(24 × 22 + 5 × 41 + 2 × 52) / 31 = 837 / 31</td><td><strong>27,0 jours</strong></td></tr>
<tr><td>Coût par recrutement</td><td>(Coûts externes + coûts internes valorisés) / nombre de recrutements</td><td>(4 200 annonces + 6 500 cabinet + 3 100 temps interne) / 31 = 13 800 / 31</td><td><strong>445,16 €</strong></td></tr>
<tr><td>Coût par recrutement hors cabinet</td><td>(Coûts − honoraires du cabinet) / recrutements sans cabinet</td><td>7 300 / 30</td><td>243,33 €</td></tr>
<tr><td>Taux de transformation</td><td>Embauches / candidatures reçues</td><td>31 / 742</td><td>4,2 %</td></tr>
<tr><td>Taux de réussite des périodes d'essai</td><td>Périodes d'essai confirmées / périodes d'essai terminées</td><td>29 / 30</td><td>96,7 %</td></tr>
</table>
<p>Ventilation du délai : 24 recrutements d'agents de propreté (22 jours en moyenne), 5 de chefs d'équipe (41 jours), 2 d'employés administratifs (52 jours). La moyenne globale masque des délais deux fois plus longs sur les postes d'encadrement de proximité : c'est l'information utile pour la direction. Le recrutement d'un chef de site par un cabinet (6 500 €) fausse le coût moyen : on présente les deux coûts.</p>
<blockquote><strong>Règle d'or :</strong> pour chaque indicateur, présenter la valeur, la période, le périmètre, l'évolution (N-1) et, si possible, une référence (objectif, moyenne de branche). Un chiffre isolé n'apprend rien.</blockquote>
`,
      },
      {
        title: "6.7 – Le tableur au service des indicateurs : données, nettoyage, tableaux croisés, fonctions et graphiques",
        content: `
<h3>Construire une base de données exploitable</h3>
<p>Un tableur ne calcule juste que si les données sont structurées. Règles de construction de la « base salariés » d'ALTÉA (extraction Lucca et Silae, une ligne par salarié, une colonne par variable) :</p>
<ul>
<li>une seule ligne d'en-têtes, sans cellules fusionnées, sans lignes vides ni sous-totaux dans les données ;</li>
<li>une donnée par cellule (le nom et le prénom dans deux colonnes, la date dans un vrai format date) ;</li>
<li>des codes homogènes (« F » / « H », « CDI » / « CDD » / « APP ») définis par des listes déroulantes (Données &gt; Validation des données) ;</li>
<li>un identifiant unique (matricule) qui permet de rapprocher plusieurs sources ;</li>
<li>la plage convertie en <strong>tableau</strong> (Ctrl + T, nommé par exemple <em>T_Salaries</em>) pour que les formules et les tableaux croisés s'étendent automatiquement aux nouvelles lignes.</li>
</ul>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Matricule</th><th>Sexe</th><th>Date_naissance</th><th>Date_entree</th><th>Date_sortie</th><th>Contrat</th><th>Categorie</th><th>Site</th><th>Quotite</th><th>Salaire_ETP</th><th>Heures_absence</th><th>Forme</th></tr>
<tr><td>0412</td><td>F</td><td>14/02/1985</td><td>03/09/2018</td><td></td><td>CDI</td><td>Agent</td><td>Créteil Europarc</td><td>1</td><td>1 900</td><td>21</td><td>Oui</td></tr>
<tr><td>0520</td><td>F</td><td>02/11/1992</td><td>15/01/2022</td><td></td><td>CDI</td><td>Agent</td><td>Créteil Europarc</td><td>0,69</td><td>1 890</td><td>0</td><td>Non</td></tr>
</table>

<h3>Nettoyer les données</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Problème</th><th>Détection</th><th>Correction</th></tr>
<tr><td>Doublons (salarié présent deux fois après une réembauche)</td><td>Mise en forme conditionnelle &gt; Valeurs en double sur le matricule</td><td>Données &gt; Supprimer les doublons, après vérification</td></tr>
<tr><td>Espaces parasites (« CDI » et « CDI  » comptés séparément)</td><td>Filtre sur la colonne</td><td>Fonction SUPPRESPACE</td></tr>
<tr><td>Dates stockées en texte</td><td>Alignement à gauche, tri incorrect</td><td>Données &gt; Convertir, ou fonction DATEVAL</td></tr>
<tr><td>Valeurs manquantes</td><td>Filtre « (Vides) », NB.VIDE</td><td>Rechercher la donnée à la source ; ne jamais inventer</td></tr>
<tr><td>Codes incohérents (« Femme », « F », « f »)</td><td>Tableau croisé sur la colonne</td><td>Rechercher / remplacer, puis liste déroulante</td></tr>
<tr><td>Valeurs aberrantes (quotité 10 au lieu de 1)</td><td>Tri, MIN / MAX, mise en forme conditionnelle</td><td>Vérifier dans le contrat</td></tr>
</table>
<p><strong>Contrôle de cohérence systématique</strong> : le total de la base doit être égal à l'effectif du registre à la même date (148), le total des salaires doit être cohérent avec le journal de paie, et le nombre de femmes plus le nombre d'hommes doit égaler l'effectif total.</p>

<h3>Les fonctions indispensables (version française d'Excel, séparateur point-virgule)</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Fonction</th><th>Usage</th><th>Exemple ALTÉA</th><th>Résultat</th></tr>
<tr><td>NB.SI.ENS</td><td>Compter les lignes répondant à plusieurs critères</td><td>=NB.SI.ENS(T_Salaries[Sexe];"F";T_Salaries[Categorie];"Agent de maîtrise")</td><td>4</td></tr>
<tr><td>SOMME.SI.ENS</td><td>Additionner selon plusieurs critères</td><td>=SOMME.SI.ENS(T_Salaries[Heures_absence];T_Salaries[Site];"Vitry-sur-Seine")</td><td>4 334</td></tr>
<tr><td>MOYENNE.SI</td><td>Moyenne selon un critère</td><td>=MOYENNE.SI(T_Salaries[Sexe];"F";T_Salaries[Salaire_ETP]) sur la base hors apprenti(e)</td><td>1 990,21</td></tr>
<tr><td>MOYENNE.SI.ENS</td><td>Moyenne selon plusieurs critères</td><td>=MOYENNE.SI.ENS(T_Salaries[Salaire_ETP];T_Salaries[Sexe];"H";T_Salaries[Categorie];"Agent")</td><td>1 968</td></tr>
<tr><td>MEDIANE</td><td>Valeur centrale</td><td>=MEDIANE(B2:B10) sur les 9 salaires du siège</td><td>2 400</td></tr>
<tr><td>RECHERCHEX</td><td>Rapatrier une donnée d'une autre table à partir d'un identifiant</td><td>=RECHERCHEX([@Matricule];T_Paie[Matricule];T_Paie[Brut_annuel];"Non trouvé")</td><td>Brut annuel du salarié, ou « Non trouvé »</td></tr>
<tr><td>DATEDIF</td><td>Écart entre deux dates en années (« Y »), mois (« M ») ou jours (« D ») ; fonction non documentée dans l'assistant mais disponible</td><td>=DATEDIF([@Date_naissance];DATE(2026;12;31);"Y")</td><td>41 pour une salariée née le 14/02/1985</td></tr>
<tr><td>SI imbriqués ou SI.CONDITIONS</td><td>Classer en tranches</td><td>=SI.CONDITIONS([@Age]&lt;25;"Moins de 25";[@Age]&lt;35;"25-34";[@Age]&lt;45;"35-44";[@Age]&lt;55;"45-54";VRAI;"55 et plus")</td><td>« 35-44 »</td></tr>
<tr><td>SIERREUR</td><td>Éviter l'affichage d'erreurs (division par zéro)</td><td>=SIERREUR(C5/D5;"n.s.")</td><td>« n.s. » si D5 = 0</td></tr>
<tr><td>ARRONDI</td><td>Arrondir un résultat affiché et réutilisé</td><td>=ARRONDI(28/146,17*100;2)</td><td>19,16</td></tr>
</table>
<p><strong>Ancienneté</strong> : =DATEDIF([@Date_entree];DATE(2026;12;31);"Y") donne l'ancienneté en années révolues ; pour l'afficher en années et mois : =DATEDIF(D2;DATE(2026;12;31);"Y")&amp;" ans "&amp;DATEDIF(D2;DATE(2026;12;31);"YM")&amp;" mois".</p>
<p><strong>Effectif présent à une date</strong> : =NB.SI.ENS(T_Salaries[Date_entree];"&lt;="&amp;DATE(2026;12;31);T_Salaries[Date_sortie];"") compte les salariés entrés avant le 31/12 et sans date de sortie (à compléter par les sortants postérieurs à la date si la base contient l'historique).</p>

<h3>Les tableaux croisés dynamiques (TCD)</h3>
<p>Le TCD (Insertion &gt; Tableau croisé dynamique) résume une base en quelques clics. Exemple : pyramide des âges.</p>
<ol>
<li>Ajouter à la base une colonne calculée <em>Tranche_age</em> (formule SI.CONDITIONS ci-dessus) ;</li>
<li>Insérer un TCD à partir de T_Salaries dans une nouvelle feuille ;</li>
<li>Lignes : Tranche_age ; Colonnes : Sexe ; Valeurs : Nombre de Matricule ;</li>
<li>Filtre : Date_sortie = (vide) pour ne garder que les présents ;</li>
<li>Paramètres des champs de valeurs &gt; Afficher les valeurs &gt; % du total général pour obtenir les parts ;</li>
<li>Actualiser (clic droit &gt; Actualiser) après chaque mise à jour de la base.</li>
</ol>
<p>Autres TCD utiles : heures d'absence par site et par motif (Valeurs : Somme de Heures_absence), salaire moyen par catégorie et par sexe (Valeurs : Moyenne de Salaire_ETP), entrées et sorties par mois (Lignes : Date_entree groupée par mois). Les <strong>segments</strong> (Insertion &gt; Segment) permettent de filtrer visuellement par site ou par année dans un tableau de bord.</p>

<h3>Choisir le bon graphique</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Message à faire passer</th><th>Graphique adapté</th><th>Exemple ALTÉA</th><th>À éviter</th></tr>
<tr><td>Évolution dans le temps</td><td>Courbe</td><td>Taux d'absentéisme mensuel sur 24 mois</td><td>Secteurs</td></tr>
<tr><td>Comparaison entre catégories</td><td>Histogramme (barres verticales) ou barres horizontales si les libellés sont longs</td><td>Absentéisme par site</td><td>Effets 3D qui déforment les proportions</td></tr>
<tr><td>Répartition d'un tout (peu de catégories)</td><td>Secteurs ou anneau (5 parts au plus)</td><td>Motifs de sortie</td><td>Secteurs à 12 parts</td></tr>
<tr><td>Structure par âge et sexe</td><td>Pyramide (barres horizontales opposées)</td><td>Pyramide des âges</td><td>Histogramme empilé</td></tr>
<tr><td>Comparaison femmes-hommes par catégorie</td><td>Histogramme groupé</td><td>Salaire moyen par catégorie et par sexe</td><td>Deux graphiques séparés à échelles différentes</td></tr>
<tr><td>Réalisé par rapport à un objectif</td><td>Jauge simple ou barre avec ligne d'objectif</td><td>Entretiens de parcours professionnel : 85,3 % pour un objectif de 100 %</td><td>Compteurs décoratifs sans valeur affichée</td></tr>
</table>
<p><strong>Règles de présentation</strong> : un titre qui dit le message (« L'absentéisme de Vitry dépasse le seuil d'alerte depuis mars ») plutôt qu'un titre neutre, axes commençant à zéro pour les histogrammes, unité et source indiquées, étiquettes de données lisibles, couleurs sobres et constantes (le même site toujours dans la même couleur).</p>
<blockquote><strong>Protection du fichier :</strong> la base nominative reste dans un classeur protégé par mot de passe, stocké dans l'espace RH à accès restreint ; le tableau de bord diffusé est un <em>autre</em> fichier qui ne contient que des données agrégées (copie des valeurs ou connexion aux TCD sans la base). Une base salariés envoyée par erreur en pièce jointe d'un tableau de bord est une violation de données personnelles.</blockquote>
`,
      },
      {
        title: "6.8 – Tableau de bord RH, analyse, note de synthèse et confidentialité",
        content: `
<h3>La structure d'un tableau de bord RH</h3>
<p>Un tableau de bord est un outil de pilotage synthétique : un nombre limité d'indicateurs (8 à 15), mis à jour selon une périodicité fixe, comparés à un objectif ou à une période antérieure, avec des alertes visuelles et un commentaire. Structure du tableau de bord mensuel d'ALTÉA :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Bloc</th><th>Indicateur</th><th>Mois</th><th>Cumul annuel</th><th>N-1</th><th>Objectif / seuil</th><th>Alerte</th></tr>
<tr><td rowspan="2">Effectifs</td><td>Effectif physique fin de mois</td><td>148</td><td>Moy. 146,17</td><td>142</td><td>Budget 150</td><td>Vert</td></tr>
<tr><td>ETP</td><td>119,2</td><td>Moy. 118,0</td><td>115,0</td><td>Budget 120</td><td>Vert</td></tr>
<tr><td rowspan="2">Mouvements</td><td>Entrées / sorties</td><td>2 / 2</td><td>31 / 25</td><td>27 / 22</td><td></td><td></td></tr>
<tr><td>Taux de rotation</td><td></td><td>19,16 %</td><td>17,4 %</td><td>&lt; 18 %</td><td>Orange</td></tr>
<tr><td rowspan="2">Absences et santé</td><td>Taux d'absentéisme</td><td>6,9 %</td><td>6,27 %</td><td>5,8 %</td><td>&lt; 6 %</td><td>Orange</td></tr>
<tr><td>Accidents du travail avec arrêt / TF</td><td>1</td><td>7 / 40,00</td><td>6 / 35,1</td><td>Baisse</td><td>Rouge</td></tr>
<tr><td rowspan="2">Rémunération</td><td>Masse salariale brute</td><td>292 500 €</td><td>3 420 000 €</td><td>3 250 000 €</td><td>Budget 3 400 000 €</td><td>Orange</td></tr>
<tr><td>Heures supplémentaires payées</td><td>412 h</td><td>4 860 h</td><td>4 120 h</td><td>&lt; 4 500 h</td><td>Rouge</td></tr>
<tr><td rowspan="2">Développement</td><td>Taux d'accès à la formation</td><td></td><td>60,1 %</td><td>54,0 %</td><td>&gt; 60 %</td><td>Vert</td></tr>
<tr><td>Entretiens de parcours professionnel réalisés / dus</td><td></td><td>85,3 %</td><td>78,0 %</td><td>100 %</td><td>Orange</td></tr>
<tr><td>Recrutement</td><td>Délai moyen de recrutement</td><td></td><td>27 j</td><td>31 j</td><td>&lt; 30 j</td><td>Vert</td></tr>
</table>
<p><strong>Alertes</strong> : mise en forme conditionnelle à trois couleurs fondée sur des seuils écrits (par exemple absentéisme vert si inférieur à 6 %, orange de 6 à 7 %, rouge au-delà de 7 %). <strong>Périodicité</strong> : mensuelle pour les effectifs, les absences, les heures et la masse salariale ; trimestrielle pour la formation et le recrutement ; annuelle pour les indicateurs réglementaires (index, BDESE, OETH). Chaque version est datée, archivée et accompagnée d'un <strong>commentaire</strong> de quelques lignes qui explique les alertes.</p>

<h3>Analyser : repérer les éléments significatifs</h3>
<ol>
<li><strong>Comparer</strong> : à la période précédente, au même mois de l'année précédente (saisonnalité), à l'objectif, à une référence externe de même définition ;</li>
<li><strong>Décomposer</strong> : par site, catégorie, sexe, âge, ancienneté, motif ; un indicateur global moyen cache souvent une concentration ;</li>
<li><strong>Relier</strong> les indicateurs entre eux : absentéisme élevé, heures supplémentaires en hausse et accidents du travail à Vitry racontent la même histoire (sous-effectif, remplacements, fatigue) ;</li>
<li><strong>Vérifier</strong> avant de conclure : un pic peut résulter d'une erreur de saisie, d'un changement de méthode ou d'un événement unique (un long arrêt) ;</li>
<li><strong>Distinguer</strong> le constat (les chiffres), l'interprétation (les causes probables, présentées comme des hypothèses) et la recommandation (ce qui est proposé).</li>
</ol>

<h3>Rédiger une note de synthèse adaptée au destinataire</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Partie</th><th>Contenu</th><th>Conseil</th></tr>
<tr><td>En-tête</td><td>Émetteur, destinataire, date, objet, mention de confidentialité</td><td>Objet précis : « Indicateurs RH 2026 – points d'attention »</td></tr>
<tr><td>Introduction</td><td>Contexte et objectif en 2 ou 3 lignes, période et périmètre</td><td>Dire d'où viennent les données</td></tr>
<tr><td>Constats</td><td>3 à 5 messages clés, chiffrés, hiérarchisés du plus important au moins important</td><td>Une idée par paragraphe, titre informatif</td></tr>
<tr><td>Analyse</td><td>Causes probables, liens entre indicateurs</td><td>Prudence : « peut s'expliquer par », « à confirmer »</td></tr>
<tr><td>Recommandations</td><td>Actions proposées, responsables, échéances</td><td>Concrètes et réalistes ; la décision appartient au destinataire</td></tr>
<tr><td>Annexes</td><td>Tableau de bord, graphiques, définitions des indicateurs</td><td>Le corps de la note tient sur une page ou deux</td></tr>
</table>
<p><strong>Adapter au destinataire</strong> : pour la direction générale, l'essentiel en une page, les coûts et les décisions ; pour un chef de site, les indicateurs de son site, sans données des autres sites ni données individuelles médicales ; pour le CSE, des données consolidées et comparables, conformes au contenu de la BDESE ; pour un client qui envoie un questionnaire RSE, seulement les données validées par la direction.</p>

<h3>Confidentialité et anonymisation</h3>
<ul>
<li><strong>Minimisation</strong> (article 5 du RGPD) : n'extraire que les colonnes nécessaires à l'indicateur ; un calcul d'absentéisme n'a pas besoin du motif médical détaillé ni du nom ;</li>
<li><strong>Pseudonymisation</strong> : remplacer le nom par le matricule dans les fichiers de travail ; les données restent personnelles, car la table de correspondance existe ;</li>
<li><strong>Anonymisation</strong> : données agrégées dont on ne peut plus déduire la situation d'une personne ; attention aux <strong>petits effectifs</strong> : « salaire moyen des femmes cadres du siège » quand il n'y en a qu'une revient à publier son salaire. Règle interne d'ALTÉA : aucun résultat diffusé hors service RH pour un groupe de moins de 5 personnes ; regrouper les catégories si nécessaire ;</li>
<li><strong>Données de santé</strong> : les motifs médicaux ne sont pas connus de l'employeur (l'avis d'arrêt employeur ne les mentionne pas) et ne doivent pas être reconstitués ; on parle d'« absence maladie » ;</li>
<li><strong>Accès et diffusion</strong> : classement dans l'espace RH protégé, envoi des tableaux de bord en PDF agrégé, liste de diffusion validée par la responsable RH ;</li>
<li><strong>Conservation</strong> : les fichiers de travail nominatifs sont supprimés une fois l'indicateur produit et archivé sous forme agrégée.</li>
</ul>
<blockquote><strong>Exemple de piège :</strong> un chef de site demande « la liste des salariés qui ont le plus d'absences dans mon équipe, avec les motifs ». L'assistant(e) RH ne transmet pas de motif médical et renvoie la demande à la responsable RH : le manager peut connaître les dates d'absence de son équipe pour organiser le travail, pas les raisons de santé ; un éventuel entretien de retour ou une démarche de prévention se construit avec la RH et, le cas échéant, le service de prévention et de santé au travail.</blockquote>
`,
      },
      {
        title: "6.9 – Quiz du chapitre",
        content: `
<h3>Questions (une seule bonne réponse par question)</h3>
<ol>
<li>À partir de quel effectif une entreprise doit-elle établir un bilan social ?
<ol type="a"><li>50 salariés</li><li>150 salariés</li><li>300 salariés</li><li>500 salariés</li></ol></li>
<li>Les entreprises d'au moins 50 salariés publient leur index de l'égalité professionnelle au plus tard :
<ol type="a"><li>le 1er janvier</li><li>le 1er mars</li><li>le 30 juin</li><li>le 31 décembre</li></ol></li>
<li>Le taux de fréquence des accidents du travail se calcule ainsi :
<ol type="a"><li>accidents avec arrêt × 1 000 / effectif</li><li>accidents avec arrêt × 1 000 000 / heures réellement travaillées</li><li>jours d'arrêt × 1 000 / heures réellement travaillées</li><li>accidents avec et sans arrêt / effectif × 100</li></ol></li>
<li>ALTÉA a enregistré 31 entrées et 25 sorties pour un effectif moyen de 146,17. Avec la formule [(entrées + sorties) / 2] / effectif moyen, le turnover est de :
<ol type="a"><li>17,10 %</li><li>19,16 %</li><li>21,21 %</li><li>38,31 %</li></ol></li>
<li>Quatre sites ont des taux d'absentéisme de 5,10 %, 8,40 %, 6,84 % et 2,30 %. Le taux de l'entreprise est obtenu :
<ol type="a"><li>en faisant la moyenne simple des quatre taux</li><li>en retenant le taux le plus élevé</li><li>en divisant le total des heures d'absence par le total des heures théoriques</li><li>en additionnant les quatre taux</li></ol></li>
<li>L'obligation d'emploi des travailleurs handicapés concerne les entreprises d'au moins :
<ol type="a"><li>11 salariés, à hauteur de 3 %</li><li>20 salariés, à hauteur de 6 %</li><li>50 salariés, à hauteur de 6 %</li><li>250 salariés, à hauteur de 10 %</li></ol></li>
<li>Salaires mensuels : 2 100, 2 300, 2 400, 2 700 et 5 000 €. Le salaire médian est de :
<ol type="a"><li>2 400 €</li><li>2 900 €</li><li>2 700 €</li><li>2 350 €</li></ol></li>
<li>Pour compter dans Excel les femmes en CDI du site de Vitry, on utilise :
<ol type="a"><li>SOMME.SI</li><li>NB.SI.ENS</li><li>RECHERCHEX</li><li>DATEDIF</li></ol></li>
<li>Depuis la loi du 24 octobre 2025, l'entretien de parcours professionnel a lieu, après le premier entretien suivant l'embauche :
<ol type="a"><li>chaque année</li><li>tous les 2 ans</li><li>tous les 4 ans, avec un état des lieux récapitulatif tous les 8 ans</li><li>tous les 6 ans</li></ol></li>
<li>Selon la directive (UE) 2023/970, une évaluation conjointe des rémunérations est déclenchée lorsqu'un écart non justifié et non corrigé atteint, dans une catégorie de travailleurs :
<ol type="a"><li>1 %</li><li>3 %</li><li>5 %</li><li>10 %</li></ol></li>
</ol>

<h3>Corrigé expliqué</h3>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>N°</th><th>Réponse</th><th>Explication</th></tr>
<tr><td>1</td><td>c</td><td>Articles L2312-28 et suivants : bilan social obligatoire à partir de 300 salariés ; il est intégré à la BDESE. ALTÉA (148 salariés) n'est pas concernée.</td></tr>
<tr><td>2</td><td>b</td><td>Publication de la note globale et des notes par indicateur au plus tard le 1er mars, sur le site internet de l'entreprise (ou à défaut par tout moyen), et transmission à l'administration et au CSE.</td></tr>
<tr><td>3</td><td>b</td><td>Le TF rapporte les accidents avec arrêt au million d'heures travaillées ; la réponse c est le taux de gravité, la réponse a l'indice de fréquence.</td></tr>
<tr><td>4</td><td>b</td><td>(31 + 25) / 2 = 28 ; 28 / 146,17 = 19,16 %. 17,10 % est le taux de sortie, 21,21 % le taux d'entrée.</td></tr>
<tr><td>5</td><td>c</td><td>Un taux global est toujours un rapport de totaux ; la moyenne simple (5,66 %) ignore le poids de chaque site et sous-estime ici l'absentéisme réel (6,27 %).</td></tr>
<tr><td>6</td><td>b</td><td>Articles L5212-1 et suivants : 6 % de l'effectif d'assujettissement à partir de 20 salariés, déclaration via la DSN.</td></tr>
<tr><td>7</td><td>a</td><td>Avec 5 valeurs classées, la médiane est la 3e : 2 400 €. La moyenne (14 500 / 5 = 2 900 €) est tirée vers le haut par la valeur de 5 000 €.</td></tr>
<tr><td>8</td><td>b</td><td>NB.SI.ENS compte les lignes répondant simultanément à plusieurs critères (sexe, contrat, site) ; SOMME.SI additionne, RECHERCHEX rapatrie une valeur, DATEDIF calcule une durée.</td></tr>
<tr><td>9</td><td>c</td><td>La loi du 24 octobre 2025 a remplacé le rythme de 2 ans / 6 ans par l'entretien de parcours professionnel : premier dans l'année suivant l'embauche, puis tous les 4 ans, état des lieux tous les 8 ans (dispositions transitoires à vérifier).</td></tr>
<tr><td>10</td><td>c</td><td>Seuil de 5 % dans une catégorie de travailleurs, non justifié par des critères objectifs et non sexistes et non corrigé dans les 6 mois.</td></tr>
</table>
<p><strong>Barème indicatif :</strong> 9 ou 10 bonnes réponses : maîtrise ; 7 ou 8 : revoir les sections 6.4 à 6.6 ; moins de 7 : refaire tous les calculs ALTÉA du chapitre avec le tableur.</p>
`,
      },
      {
        title: "6.10 – Cas pratique corrigé : analyser la situation du site de Vitry et rédiger une note de synthèse",
        content: `
<h3>Énoncé</h3>
<p>Nathalie ROUSSEL, responsable RH d'ALTÉA SERVICES, prépare le comité de direction de janvier 2027. Elle vous demande d'analyser les indicateurs 2026 du site de <strong>Vitry-sur-Seine</strong>, que le tableau de bord signale en alerte, et de rédiger une note de synthèse d'une page destinée au directeur général. Vous disposez des données suivantes (exports Lucca et Silae, année 2026) :</p>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Donnée</th><th>Site de Vitry</th><th>Ensemble ALTÉA</th></tr>
<tr><td>Effectif au 1er janvier / au 31 décembre</td><td>34 / 36</td><td>142 / 148</td></tr>
<tr><td>Effectif moyen mensuel</td><td>35,2</td><td>146,17</td></tr>
<tr><td>Entrées / sorties</td><td>12 / 10</td><td>31 / 25</td></tr>
<tr><td>Dont démissions</td><td>6</td><td>11</td></tr>
<tr><td>Heures théoriques</td><td>51 600</td><td>189 626</td></tr>
<tr><td>Heures d'absence : maladie / AT et trajet / injustifiées / autres</td><td>3 260 / 410 / 214 / 450</td><td>8 720 / 1 024 / 493 / 1 653</td></tr>
<tr><td>Heures réellement travaillées</td><td>47 500</td><td>175 000</td></tr>
<tr><td>Accidents du travail avec arrêt / jours d'arrêt</td><td>4 / 118</td><td>7 / 214</td></tr>
<tr><td>Heures supplémentaires et complémentaires payées</td><td>1 950</td><td>4 860</td></tr>
<tr><td>ETP moyen</td><td>32,1</td><td>118,0</td></tr>
</table>
<p>Par ailleurs, le chef du site de Vitry vous écrit : <em>« Pour préparer mes entretiens, envoyez-moi la liste des agents qui ont eu le plus d'arrêts cette année, avec les motifs. »</em></p>
<p><strong>Travail demandé :</strong></p>
<ol>
<li>Calculer pour Vitry et pour l'ensemble de l'entreprise : le taux d'absentéisme (total et par motif), le turnover, le taux de démission, le taux de fréquence et le taux de gravité, le volume d'heures supplémentaires et complémentaires par ETP.</li>
<li>Repérer les éléments significatifs et proposer une interprétation prudente.</li>
<li>Proposer deux graphiques adaptés pour illustrer la note.</li>
<li>Rédiger la note de synthèse au directeur général.</li>
<li>Répondre à la demande du chef de site.</li>
</ol>

<h3>Corrigé</h3>
<h4>1. Calculs</h4>
<table border="1" cellpadding="6" cellspacing="0">
<tr><th>Indicateur</th><th>Vitry</th><th>Ensemble ALTÉA</th></tr>
<tr><td>Taux d'absentéisme total</td><td>4 334 / 51 600 = <strong>8,40 %</strong></td><td>11 890 / 189 626 = 6,27 %</td></tr>
<tr><td>dont maladie</td><td>3 260 / 51 600 = 6,32 %</td><td>8 720 / 189 626 = 4,60 %</td></tr>
<tr><td>dont AT et trajet</td><td>410 / 51 600 = 0,79 %</td><td>1 024 / 189 626 = 0,54 %</td></tr>
<tr><td>dont absences injustifiées</td><td>214 / 51 600 = 0,41 %</td><td>493 / 189 626 = 0,26 %</td></tr>
<tr><td>dont autres absences</td><td>450 / 51 600 = 0,87 %</td><td>1 653 / 189 626 = 0,87 %</td></tr>
<tr><td>Turnover [(E + S) / 2] / effectif moyen</td><td>11 / 35,2 = <strong>31,25 %</strong></td><td>28 / 146,17 = 19,16 %</td></tr>
<tr><td>Taux de démission</td><td>6 / 35,2 = <strong>17,05 %</strong></td><td>11 / 146,17 = 7,53 %</td></tr>
<tr><td>Taux de fréquence</td><td>4 × 1 000 000 / 47 500 = <strong>84,21</strong></td><td>7 × 1 000 000 / 175 000 = 40,00</td></tr>
<tr><td>Taux de gravité</td><td>118 × 1 000 / 47 500 = <strong>2,48</strong></td><td>214 × 1 000 / 175 000 = 1,22</td></tr>
<tr><td>Heures supplémentaires et complémentaires par ETP</td><td>1 950 / 32,1 = <strong>60,7 h</strong></td><td>4 860 / 118,0 = 41,2 h</td></tr>
<tr><td>Heures supplémentaires et complémentaires par ETP, hors Vitry</td><td></td><td>(4 860 − 1 950) / (118,0 − 32,1) = 2 910 / 85,9 = 33,9 h</td></tr>
</table>
<p>Remarque : la somme des taux par motif de Vitry (6,32 + 0,79 + 0,41 + 0,87 = 8,39 %) diffère de 0,01 point du taux total (8,40 %) à cause des arrondis ; on présente le total calculé sur les heures, pas la somme des taux arrondis.</p>

<h4>2. Éléments significatifs et interprétation</h4>
<ul>
<li><strong>Poids du site</strong> : Vitry représente 24,1 % de l'effectif moyen (35,2 / 146,17) mais 54,5 % des démissions (6 / 11), 57,1 % des accidents du travail avec arrêt (4 / 7) et 40,1 % des heures supplémentaires et complémentaires (1 950 / 4 860) ;</li>
<li><strong>Absentéisme</strong> : 8,40 % contre 6,27 %, soit 2,13 points de plus, porté surtout par la maladie (6,32 % contre 4,60 %) ; les « autres absences » sont au même niveau que l'entreprise ;</li>
<li><strong>Accidents</strong> : TF plus de deux fois supérieur à la moyenne (84,21 contre 40,00) et TG doublé (2,48 contre 1,22) ;</li>
<li><strong>Heures supplémentaires</strong> : 60,7 h par ETP contre 33,9 h dans les autres sites (près de 1,8 fois plus) ;</li>
<li><strong>Interprétation prudente</strong> : ces indicateurs convergent et peuvent traduire un cercle « absences → remplacements en heures supplémentaires → fatigue → accidents et arrêts → démissions ». Cette hypothèse reste à confirmer : vérifier la nature des accidents (déclarations AT), l'organisation des équipes et des horaires, les conditions propres au client du site, le climat social (retours des entretiens de sortie). Un ou deux arrêts longs peuvent aussi peser sur le taux : regarder le nombre d'arrêts et leur durée.</li>
</ul>

<h4>3. Graphiques proposés</h4>
<ul>
<li><strong>Histogramme groupé</strong> « Vitry / autres sites » pour quatre indicateurs exprimés en indice (base 100 = moyenne des autres sites), ou quatre petits histogrammes alignés : absentéisme, turnover, TF, heures supplémentaires par ETP. Titre : « Vitry cumule les écarts sur les quatre indicateurs d'alerte » ;</li>
<li><strong>Courbe mensuelle</strong> sur 12 mois du taux d'absentéisme de Vitry et de l'entreprise, avec la ligne du seuil d'alerte à 7 %. Titre : « L'absentéisme de Vitry dépasse le seuil d'alerte depuis mars ».</li>
</ul>

<h4>4. Note de synthèse</h4>
<blockquote>
<p><strong>ALTÉA SERVICES – Service des ressources humaines</strong><br>
<strong>Note à l'attention de :</strong> Directeur général<br>
<strong>De :</strong> Nathalie ROUSSEL, responsable RH (préparée par l'assistant(e) RH)<br>
<strong>Date :</strong> 12 janvier 2027<br>
<strong>Objet :</strong> Site de Vitry-sur-Seine – indicateurs sociaux 2026 et propositions<br>
<strong>Diffusion :</strong> confidentielle – comité de direction</p>
<p><strong>Contexte.</strong> Le tableau de bord RH 2026 place le site de Vitry en alerte sur plusieurs indicateurs. Cette note en présente les chiffres (sources : Lucca, Silae, déclarations d'accidents du travail ; année civile 2026) et propose des actions.</p>
<p><strong>1. Un absentéisme nettement supérieur à la moyenne.</strong> Le taux d'absentéisme de Vitry atteint 8,40 % contre 6,27 % pour l'entreprise. L'écart provient principalement des absences pour maladie (6,32 % contre 4,60 %).</p>
<p><strong>2. Une sinistralité deux fois plus élevée.</strong> Vitry concentre 4 des 7 accidents du travail avec arrêt de l'année : taux de fréquence de 84,21 contre 40,00 pour l'entreprise, taux de gravité de 2,48 contre 1,22.</p>
<p><strong>3. Un recours important aux heures supplémentaires.</strong> 60,7 heures supplémentaires et complémentaires par ETP, contre 33,9 dans les autres sites ; Vitry représente 40 % des heures payées de l'entreprise pour 24 % des effectifs.</p>
<p><strong>4. Une rotation du personnel élevée.</strong> Turnover de 31,25 % contre 19,16 %, et 6 des 11 démissions de l'entreprise.</p>
<p><strong>Analyse.</strong> Ces indicateurs convergent et peuvent traduire un déséquilibre entre la charge du site et ses effectifs : les absences sont compensées par des heures supplémentaires, ce qui peut accroître la fatigue, le risque d'accident et les départs. Cette hypothèse doit être confirmée par l'analyse des accidents, des plannings et des entretiens de sortie.</p>
<p><strong>Propositions.</strong> 1) Analyse des 4 accidents avec le chef de site et le CSE (commission santé, sécurité et conditions de travail si elle existe), mise à jour du document unique d'évaluation des risques pour le site – échéance : fin février. 2) Revue de la charge et des plannings du site avec la direction des opérations, étude d'un renfort permanent au lieu des heures supplémentaires – échéance : mars. 3) Entretiens de retour après absence et sollicitation du service de prévention et de santé au travail. 4) Suivi mensuel spécifique de Vitry dans le tableau de bord, avec point d'étape au comité de juin.</p>
<p><strong>Annexes :</strong> tableau des indicateurs Vitry / entreprise, définitions des indicateurs, graphiques.</p>
</blockquote>
<p>Points de réussite : messages chiffrés et hiérarchisés, comparaison systématique à une référence, distinction entre constats, hypothèses et propositions, longueur d'une page, aucune donnée nominative ni médicale.</p>

<h4>5. Réponse au chef de site</h4>
<blockquote>
<p>Bonjour,</p>
<p>Je ne peux pas vous transmettre de liste nominative assortie des motifs d'absence : l'employeur ne connaît pas les raisons médicales des arrêts, et les données relatives aux absences des salariés sont confidentielles. Vous disposez déjà dans Lucca des dates d'absence de votre équipe pour organiser le travail. Nathalie ROUSSEL vous proposera prochainement un point sur les indicateurs du site et sur la démarche d'entretiens de retour après absence, que nous organiserons ensemble.</p>
<p>Bien cordialement,<br>Service RH – ALTÉA SERVICES</p>
</blockquote>
<blockquote><strong>Critères de réussite (grille du formateur) :</strong> exactitude de tous les calculs ; taux globaux calculés sur les totaux ; éléments significatifs repérés (poids relatif du site) ; interprétation prudente ; graphiques adaptés au message ; note adaptée au destinataire ; refus motivé de la transmission de données nominatives et médicales.</blockquote>
`,
      },
    ],
  },
];
