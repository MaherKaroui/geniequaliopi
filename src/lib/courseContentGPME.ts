import { CourseChapter } from "./courseContent";

/**
 * Support de cours BTS Gestion de la PME (RNCP38363)
 * Référentiel : Arrêté du 19 février 2018 portant définition du BTS « Gestion de la PME »
 * 4 domaines d'activités / blocs de compétences :
 *   D1 - Gérer la relation avec les clients et les fournisseurs de la PME
 *   D2 - Participer à la gestion des risques de la PME
 *   D3 - Gérer le personnel et contribuer à la GRH de la PME
 *   D4 - Soutenir le fonctionnement et le développement de la PME
 */
export function getGPMEChapters(): CourseChapter[] {
  return [
    {
      title: "Chapitre 1 – Présentation de la PME et de la fonction de gestionnaire",
      description: "Comprendre le contexte d'exercice, les missions et le positionnement du gestionnaire de PME.",
      sections: [
        {
          title: "1.1 – Définition et caractéristiques de la PME",
          content: `<h3>Qu'est-ce qu'une PME ?</h3>
<p>Selon la <strong>recommandation européenne 2003/361/CE</strong>, une PME est une entreprise qui emploie <strong>moins de 250 personnes</strong> et dont le chiffre d'affaires annuel n'excède pas <strong>50 M€</strong> ou dont le total de bilan n'excède pas <strong>43 M€</strong>.</p>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr style="background:#1e3a7b;color:white"><th>Catégorie</th><th>Effectif</th><th>CA</th><th>Bilan</th></tr>
<tr><td>Microentreprise</td><td>&lt; 10</td><td>≤ 2 M€</td><td>≤ 2 M€</td></tr>
<tr><td>Petite entreprise</td><td>&lt; 50</td><td>≤ 10 M€</td><td>≤ 10 M€</td></tr>
<tr><td>Moyenne entreprise</td><td>&lt; 250</td><td>≤ 50 M€</td><td>≤ 43 M€</td></tr>
</table>
<p>Les PME représentent <strong>99,9 %</strong> des entreprises françaises et près de <strong>50 %</strong> de l'emploi salarié marchand (INSEE).</p>`
        },
        {
          title: "1.2 – Le gestionnaire de PME : positionnement et missions",
          content: `<h3>Un collaborateur direct du dirigeant</h3>
<p>Le titulaire du BTS GPME exerce ses missions auprès du dirigeant d'une PME (5 à 50 salariés). Il occupe une position transversale et polyvalente, à l'<strong>interface des fonctions commerciale, comptable, RH et administrative</strong>.</p>
<h4>Les 4 domaines d'activités (référentiel RNCP38363)</h4>
<ol>
<li><strong>D1 – Gérer la relation avec les clients et les fournisseurs</strong> de la PME</li>
<li><strong>D2 – Participer à la gestion des risques</strong> de la PME</li>
<li><strong>D3 – Gérer le personnel et contribuer à la GRH</strong> de la PME</li>
<li><strong>D4 – Soutenir le fonctionnement et le développement</strong> de la PME</li>
</ol>
<h4>Compétences transversales attendues</h4>
<ul>
<li>Maîtrise de la <strong>communication écrite et orale</strong> (français et une LV étrangère niveau B2)</li>
<li>Maîtrise des <strong>outils numériques de gestion</strong> (PGI, tableur avancé, GED, outils collaboratifs)</li>
<li><strong>Veille informationnelle</strong> et culture économique, juridique et managériale</li>
<li>Sens de l'<strong>organisation, autonomie et discrétion professionnelle</strong></li>
</ul>`
        },
      ]
    },
    {
      title: "Chapitre 2 – D1 : Gérer la relation avec les clients et les fournisseurs",
      description: "Maîtriser le cycle commercial complet : prospection, vente, achats, suivi comptable et administratif.",
      sections: [
        {
          title: "2.1 – La recherche de clientèle et le contact",
          content: `<h3>Activité 1.1 – Prospection et fidélisation</h3>
<p>Le gestionnaire participe à la <strong>prospection</strong> (constitution et qualification d'un fichier prospects, ciblage, choix des canaux : phoning, mailing, social selling, salons) et à la <strong>fidélisation</strong> (programmes de fidélité, enquêtes de satisfaction, traitement des réclamations).</p>
<h4>Outils mobilisés</h4>
<ul>
<li><strong>CRM / GRC</strong> : Salesforce, HubSpot, Sellsy, Axonaut, Zoho — gestion des contacts, suivi des opportunités, pipeline commercial</li>
<li><strong>RGPD</strong> : recueil du consentement, base légale du traitement, registre des activités, droit à l'effacement</li>
<li><strong>Outils d'emailing</strong> : Mailchimp, Sendinblue, Brevo</li>
</ul>`
        },
        {
          title: "2.2 – L'administration des ventes",
          content: `<h3>De la commande au règlement</h3>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr style="background:#1e3a7b;color:white"><th>Étape</th><th>Document</th><th>Mentions obligatoires / contrôles</th></tr>
<tr><td>Demande de prix</td><td>Devis</td><td>Identité parties, désignation, prix HT/TTC, durée de validité, conditions générales</td></tr>
<tr><td>Commande client</td><td>Bon de commande</td><td>Référence devis, délai, lieu de livraison</td></tr>
<tr><td>Livraison</td><td>Bon de livraison</td><td>Quantités livrées, signature client, réserves éventuelles</td></tr>
<tr><td>Facturation</td><td>Facture</td><td>N° unique, date, SIREN, n° TVA intracommunautaire, taux et montant TVA, conditions de paiement, escompte, indemnité forfaitaire 40 €</td></tr>
<tr><td>Encaissement</td><td>Relevé bancaire / quittance</td><td>Lettrage, suivi des impayés, relances</td></tr>
</table>
<h4>Réglementation à connaître</h4>
<ul>
<li><strong>Loi LME</strong> (4 août 2008) : délais de paiement plafonnés (60 jours fin de mois ou 45 jours date d'émission)</li>
<li><strong>Facturation électronique obligatoire</strong> (réforme 2026-2027) : passage progressif via Plateforme de Dématérialisation Partenaire (PDP) ou Portail Public de Facturation (PPF)</li>
<li><strong>TVA</strong> : taux 20 % / 10 % / 5,5 % / 2,1 %, exigibilité (livraison pour les biens, encaissement pour les services)</li>
</ul>`
        },
        {
          title: "2.3 – La gestion des achats et le suivi des fournisseurs",
          content: `<h3>Le processus achats en PME</h3>
<ol>
<li><strong>Expression du besoin</strong> (demande d'achat interne)</li>
<li><strong>Sourcing fournisseurs</strong> : appel d'offres, mise en concurrence, demande de devis</li>
<li><strong>Évaluation et sélection</strong> : grille multicritères (prix, qualité, délai, RSE, solidité financière via Pappers / Société.com)</li>
<li><strong>Passation de commande</strong> et négociation des conditions (prix, remises, escomptes, délais)</li>
<li><strong>Réception</strong> : contrôle qualitatif et quantitatif, rapprochement bon de commande / bon de livraison / facture (3-way match)</li>
<li><strong>Règlement</strong> et archivage (durée légale 10 ans pour les pièces comptables — art. L.123-22 C. com.)</li>
</ol>
<h4>Indicateurs de performance achats</h4>
<ul>
<li>Taux de service fournisseur (% commandes livrées dans les délais)</li>
<li>Taux de litiges / non-conformités</li>
<li>Économies réalisées (savings)</li>
<li>Délai moyen de paiement fournisseurs</li>
</ul>`
        },
      ]
    },
    {
      title: "Chapitre 3 – D2 : Participer à la gestion des risques",
      description: "Identifier, évaluer et traiter les risques (commerciaux, financiers, informatiques, environnementaux, RH).",
      sections: [
        {
          title: "3.1 – La démarche de gestion des risques",
          content: `<h3>Norme ISO 31000 : un processus en 5 étapes</h3>
<ol>
<li><strong>Identification</strong> des risques (cartographie, brainstorming, retours d'expérience)</li>
<li><strong>Analyse</strong> : probabilité × gravité = criticité</li>
<li><strong>Évaluation</strong> et hiérarchisation (matrice de criticité 5×5)</li>
<li><strong>Traitement</strong> : éviter, réduire, transférer (assurance), accepter</li>
<li><strong>Surveillance</strong> et revue (Document Unique d'Évaluation des Risques Professionnels — DUERP, obligatoire dès 1 salarié, art. R.4121-1 C. trav.)</li>
</ol>
<h4>Typologie des risques en PME</h4>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr style="background:#1e3a7b;color:white"><th>Catégorie</th><th>Exemples</th><th>Outil de couverture</th></tr>
<tr><td>Risques commerciaux</td><td>Impayés, défaillance client</td><td>Assurance-crédit (Coface, Atradius, Allianz Trade), affacturage</td></tr>
<tr><td>Risques financiers</td><td>Trésorerie, change, taux</td><td>Plan de trésorerie, couverture de change</td></tr>
<tr><td>Risques opérationnels</td><td>Pannes, accidents</td><td>RC pro, multirisque pro, PCA</td></tr>
<tr><td>Risques numériques</td><td>Cyberattaque, RGPD</td><td>Cyber-assurance, sauvegardes 3-2-1, MFA</td></tr>
<tr><td>Risques environnementaux</td><td>Pollution, déchets</td><td>ICPE, ISO 14001, tri sélectif</td></tr>
</table>`
        },
        {
          title: "3.2 – Les risques financiers et la trésorerie",
          content: `<h3>Le suivi quotidien de la trésorerie</h3>
<p>Le gestionnaire élabore et met à jour le <strong>plan de trésorerie</strong> (mensuel, hebdomadaire ou quotidien). Il anticipe les besoins de financement à court terme (découvert autorisé, escompte, Dailly, affacturage) et les placements d'excédents.</p>
<h4>Indicateurs clés</h4>
<ul>
<li><strong>FRNG</strong> = Capitaux permanents − Actif immobilisé net</li>
<li><strong>BFR</strong> = (Stocks + Créances clients) − Dettes fournisseurs</li>
<li><strong>Trésorerie nette</strong> = FRNG − BFR</li>
<li><strong>Délai client (DSO)</strong> = (Créances clients TTC × 360) / CA TTC</li>
<li><strong>Délai fournisseur (DPO)</strong> = (Dettes fournisseurs TTC × 360) / Achats TTC</li>
</ul>`
        },
        {
          title: "3.3 – La sécurité du SI et la protection des données",
          content: `<h3>Cybersécurité en PME</h3>
<p>Plus de <strong>43 % des cyberattaques</strong> visent les PME (rapport ANSSI 2024). Le gestionnaire participe à la mise en place des mesures de protection :</p>
<ul>
<li><strong>Sauvegardes 3-2-1</strong> : 3 copies, 2 supports différents, 1 hors site</li>
<li><strong>Authentification multifacteur (MFA)</strong> sur les comptes sensibles</li>
<li><strong>Sensibilisation</strong> des collaborateurs (phishing, ingénierie sociale)</li>
<li><strong>Mises à jour</strong> régulières des logiciels et systèmes</li>
<li><strong>Plan de Continuité d'Activité (PCA)</strong> et Plan de Reprise (PRA)</li>
</ul>
<h4>RGPD : les 6 principes fondateurs</h4>
<p>Licéité, finalité, minimisation, exactitude, conservation limitée, sécurité. <strong>Sanction CNIL</strong> : jusqu'à 20 M€ ou 4 % du CA mondial.</p>`
        },
      ]
    },
    {
      title: "Chapitre 4 – D3 : Gérer le personnel et contribuer à la GRH",
      description: "Participer au recrutement, à l'administration du personnel, au développement des compétences et au climat social.",
      sections: [
        {
          title: "4.1 – Le recrutement et l'intégration",
          content: `<h3>Les 7 étapes du recrutement</h3>
<ol>
<li>Analyse du besoin et rédaction de la <strong>fiche de poste</strong></li>
<li>Diffusion de l'offre (France Travail, APEC, LinkedIn, jobboards spécialisés, cooptation)</li>
<li>Tri des candidatures (CV / LM)</li>
<li>Entretiens (téléphonique de pré-qualification, puis physique/visio — méthode <strong>STAR</strong> : Situation, Tâche, Action, Résultat)</li>
<li>Tests éventuels (techniques, personnalité — Central Test, AssessFirst)</li>
<li>Décision d'embauche et <strong>DPAE</strong> (Déclaration Préalable À l'Embauche, au plus tôt 8 jours avant l'embauche)</li>
<li><strong>Onboarding</strong> : livret d'accueil, parcours d'intégration, parrainage, point à 1 mois / 3 mois</li>
</ol>
<h4>Cadre juridique</h4>
<ul>
<li><strong>Non-discrimination</strong> (art. L.1132-1 C. trav.) : 25 critères prohibés</li>
<li><strong>Égalité H/F</strong> : Index Égapro (≥ 75/100 obligatoire dès 50 salariés)</li>
<li><strong>Visite d'information et de prévention (VIP)</strong> dans les 3 mois suivant l'embauche</li>
</ul>`
        },
        {
          title: "4.2 – Le contrat de travail et la paie",
          content: `<h3>Les principaux contrats</h3>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr style="background:#1e3a7b;color:white"><th>Contrat</th><th>Durée max</th><th>Cas de recours</th></tr>
<tr><td>CDI</td><td>Indéterminée</td><td>Norme générale</td></tr>
<tr><td>CDD</td><td>18 mois (renouv. 2 fois)</td><td>Remplacement, accroissement temporaire, saisonnier</td></tr>
<tr><td>Apprentissage</td><td>1 à 3 ans</td><td>16-29 ans (sauf exceptions), formation diplômante</td></tr>
<tr><td>Professionnalisation</td><td>6 à 24 mois</td><td>16-25 ans, demandeurs d'emploi 26+, RSA</td></tr>
<tr><td>Intérim</td><td>18 mois</td><td>Mêmes cas que CDD, via ETT</td></tr>
</table>
<h4>Le bulletin de paie (mentions obligatoires — art. R.3243-1)</h4>
<p>Identité employeur/salarié, période, emploi, classification, salaire brut, cotisations (URSSAF, retraite, prévoyance, chômage), net imposable, net à payer, prélèvement à la source, mention du <strong>bulletin clarifié</strong>. La <strong>DSN</strong> (Déclaration Sociale Nominative) est mensuelle, transmet toutes les données sociales aux organismes.</p>`
        },
        {
          title: "4.3 – Le développement des compétences",
          content: `<h3>Le plan de développement des compétences (PDC)</h3>
<p>Depuis la loi <strong>« Avenir professionnel »</strong> du 5 septembre 2018, l'ancien « plan de formation » est devenu le <strong>plan de développement des compétences</strong>. L'employeur doit assurer l'adaptation au poste et veiller au maintien de la capacité à occuper un emploi (art. L.6321-1).</p>
<h4>Les dispositifs mobilisables</h4>
<ul>
<li><strong>CPF</strong> (Compte Personnel de Formation) : 500 €/an plafonné à 5 000 € (800 €/an pour les non-qualifiés, plafonné à 8 000 €)</li>
<li><strong>Pro-A</strong> : reconversion ou promotion par alternance</li>
<li><strong>VAE</strong> (Validation des Acquis de l'Expérience) : depuis la loi du 21 décembre 2022, suppression de la durée minimale d'expérience</li>
<li><strong>PTP</strong> (Projet de Transition Professionnelle, ex-CIF) : géré par les Transitions Pro</li>
<li><strong>AFEST</strong> (Action de Formation En Situation de Travail)</li>
</ul>
<h4>Entretien professionnel obligatoire</h4>
<p>Tous les <strong>2 ans</strong>, et <strong>état des lieux récapitulatif tous les 6 ans</strong>. Sanction si manquement dans les entreprises de 50+ salariés : abondement CPF de <strong>3 000 €</strong>.</p>`
        },
      ]
    },
    {
      title: "Chapitre 5 – D4 : Soutenir le fonctionnement et le développement de la PME",
      description: "Contribuer à la qualité du système d'information, à l'analyse financière et à la pérennité de la structure.",
      sections: [
        {
          title: "5.1 – Le système d'information et la dématérialisation",
          content: `<h3>Les outils numériques du gestionnaire</h3>
<ul>
<li><strong>PGI / ERP</strong> : Sage 100, Cegid, EBP, Odoo, Dolibarr — intégration des modules ventes, achats, stocks, compta, paie</li>
<li><strong>GED</strong> (Gestion Électronique des Documents) : DocuWare, Zeendoc, M-Files</li>
<li><strong>Suite collaborative</strong> : Microsoft 365 (Teams, SharePoint, OneDrive) ou Google Workspace</li>
<li><strong>Tableur avancé</strong> : tableaux croisés dynamiques, RECHERCHEX, Power Query, Power BI</li>
<li><strong>Signature électronique</strong> conforme eIDAS : DocuSign, Yousign, Universign</li>
</ul>
<h4>La facture électronique (réforme 2026-2027)</h4>
<p>À partir du <strong>1<sup>er</sup> septembre 2026</strong> : obligation de <strong>réception</strong> pour toutes les entreprises, et obligation d'<strong>émission</strong> progressive (grandes entreprises et ETI dès 09/2026, PME et microentreprises au 01/09/2027). Format : Factur-X, UBL ou CII.</p>`
        },
        {
          title: "5.2 – L'analyse financière et le pilotage",
          content: `<h3>Les soldes intermédiaires de gestion (SIG)</h3>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr style="background:#1e3a7b;color:white"><th>Solde</th><th>Calcul</th><th>Signification</th></tr>
<tr><td>Marge commerciale</td><td>Ventes de marchandises − Coût d'achat des marchandises vendues</td><td>Performance de l'activité de négoce</td></tr>
<tr><td>Production de l'exercice</td><td>Production vendue + stockée + immobilisée</td><td>Activité industrielle</td></tr>
<tr><td>Valeur ajoutée (VA)</td><td>Marge com. + Production − Consommations en provenance des tiers</td><td>Richesse créée</td></tr>
<tr><td>EBE</td><td>VA + Subventions − Impôts/taxes − Charges de personnel</td><td>Performance économique brute</td></tr>
<tr><td>Résultat d'exploitation</td><td>EBE + Autres produits − Dotations − Autres charges</td><td>Performance industrielle/com.</td></tr>
<tr><td>Résultat net</td><td>RE + Résultat financier + Résultat exceptionnel − IS − Participation</td><td>Performance globale</td></tr>
</table>
<h4>Ratios à suivre</h4>
<ul>
<li><strong>Taux de marge brute</strong> = Marge com. / CA HT</li>
<li><strong>Taux d'EBE</strong> = EBE / CA HT</li>
<li><strong>Capacité d'autofinancement (CAF)</strong> = EBE + Produits encaissables − Charges décaissables</li>
<li><strong>Autonomie financière</strong> = Capitaux propres / Total bilan (≥ 30 % conseillé)</li>
<li><strong>Capacité de remboursement</strong> = Dettes financières / CAF (≤ 3-4 ans)</li>
</ul>`
        },
        {
          title: "5.3 – Le développement et la pérennité de la PME",
          content: `<h3>Les axes de développement</h3>
<ul>
<li><strong>Développement commercial</strong> : nouveaux marchés (géographique, segments), digitalisation, e-commerce, export (Team France Export, Bpifrance)</li>
<li><strong>Innovation</strong> : R&D, Crédit d'Impôt Recherche (CIR), Crédit d'Impôt Innovation (CII), JEI</li>
<li><strong>Croissance externe</strong> : rapprochements, acquisitions, partenariats</li>
<li><strong>RSE</strong> : ISO 26000, label Lucie, EcoVadis, B Corp — leviers de différenciation et d'attractivité</li>
<li><strong>Transition écologique</strong> : bilan carbone (méthode GHG Protocol / ADEME), plan de sobriété énergétique, ADEME Diag Décarbon'Action</li>
</ul>
<h4>Les financements de la PME</h4>
<table border="1" cellpadding="6" cellspacing="0" style="width:100%">
<tr style="background:#1e3a7b;color:white"><th>Source</th><th>Type</th><th>Acteurs</th></tr>
<tr><td>Autofinancement</td><td>Interne</td><td>CAF, mise en réserve</td></tr>
<tr><td>Apports en capital</td><td>Fonds propres</td><td>Associés, business angels, capital-risque</td></tr>
<tr><td>Emprunt bancaire</td><td>Endettement</td><td>Banques, BPI France (cofinancement, garantie)</td></tr>
<tr><td>Crédit-bail</td><td>Financement d'actifs</td><td>Sociétés de leasing</td></tr>
<tr><td>Subventions / aides</td><td>Public</td><td>Régions, France 2030, ADEME, Europe (FEDER)</td></tr>
<tr><td>Crowdfunding</td><td>Foule</td><td>Ulule, KissKissBankBank, October, Lendopolis</td></tr>
</table>`
        },
      ]
    },
    {
      title: "Chapitre 6 – Communication professionnelle et culture managériale",
      description: "Maîtriser la communication interne/externe, la posture professionnelle et la culture économique, juridique et managériale (CEJM).",
      sections: [
        {
          title: "6.1 – La communication écrite professionnelle",
          content: `<h3>Les écrits du gestionnaire</h3>
<ul>
<li><strong>Note de service</strong> : information descendante, ton neutre, structure : objet / contexte / contenu / signature</li>
<li><strong>Compte-rendu de réunion</strong> : objectif, participants, ordre du jour, décisions, actions (qui-quoi-quand)</li>
<li><strong>Note de synthèse</strong> : analyse de plusieurs documents, plan structuré, recommandations</li>
<li><strong>E-mail professionnel</strong> : objet précis, formule d'appel, paragraphes courts, signature normalisée</li>
<li><strong>Courrier commercial</strong> : norme NF Z 11-001 (zones, marges), formules d'usage</li>
</ul>`
        },
        {
          title: "6.2 – La communication orale et l'animation",
          content: `<h3>Conduire une réunion efficace</h3>
<ol>
<li><strong>Avant</strong> : objectif clair, ordre du jour diffusé 48h avant, durée maîtrisée (max 1h), salle/visio préparée</li>
<li><strong>Pendant</strong> : tour de table, respect du temps, distribution de la parole, reformulation, prise de notes synthétique</li>
<li><strong>Après</strong> : compte-rendu sous 48h, suivi des actions (matrice RACI : Responsible, Accountable, Consulted, Informed)</li>
</ol>
<h4>Les techniques d'animation</h4>
<ul>
<li><strong>Brainstorming</strong>, <strong>6 chapeaux de Bono</strong>, <strong>World Café</strong></li>
<li>Outils digitaux : <strong>Klaxoon, Miro, Mural, Beekast</strong></li>
</ul>`
        },
        {
          title: "6.3 – Culture économique, juridique et managériale (CEJM)",
          content: `<h3>Thèmes du programme CEJM (BTS tertiaires)</h3>
<ol>
<li>L'intégration de l'entreprise dans son environnement</li>
<li>La régulation de l'activité économique</li>
<li>L'organisation de l'activité de l'entreprise</li>
<li>L'impact du numérique sur la vie de l'entreprise</li>
<li>Les mutations du travail</li>
<li>Les choix stratégiques de l'entreprise</li>
</ol>
<h4>Les grandes notions à maîtriser</h4>
<ul>
<li><strong>Marché</strong>, concurrence (parfaite, imparfaite, monopole, oligopole), élasticité</li>
<li><strong>Régulation</strong> : Autorité de la concurrence, AMF, ARCEP, CNIL</li>
<li><strong>Contrats</strong> : formation, exécution, responsabilité civile contractuelle et délictuelle</li>
<li><strong>Stratégie</strong> : matrice BCG, 5 forces de Porter, Océan Bleu, business model canvas (Osterwalder)</li>
<li><strong>Numérique</strong> : économie de plateforme, données personnelles (RGPD), IA et automatisation</li>
</ul>`
        },
      ]
    },
  ];
}
