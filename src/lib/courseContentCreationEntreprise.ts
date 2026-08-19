import { CourseChapter } from "./courseContent";

/**
 * Support de cours – Gestion de la création d'entreprise
 * Couvre le parcours complet : idée → étude de marché → business model →
 * prévisionnel financier → statuts juridiques/fiscaux/sociaux → formalités →
 * financement → lancement commercial → pilotage des 12 premiers mois.
 */
export function getCreationEntrepriseChapters(): CourseChapter[] {
  return [
    {
      title: "De l'idée au projet entrepreneurial",
      description: "Structurer son idée, valider sa cohérence personnelle/projet et formaliser une première vision d'entreprise.",
      sections: [
        {
          title: "L'idée, l'opportunité et le porteur de projet",
          content: `<p>Une création d'entreprise réussie repose sur la <strong>rencontre entre une idée, un marché et un porteur</strong>. L'idée peut naître de plusieurs sources :</p>
<ul>
<li><strong>Expérience professionnelle</strong> : reproduire ou améliorer une activité connue.</li>
<li><strong>Observation d'un besoin non satisfait</strong> ou mal satisfait sur un marché.</li>
<li><strong>Innovation</strong> : technologie, usage, modèle économique, distribution.</li>
<li><strong>Opportunité</strong> : reprise d'entreprise, franchise, licence, concession.</li>
</ul>
<p><strong>Auto-diagnostic du porteur de projet :</strong> compétences techniques, expérience managériale, situation personnelle (revenus, famille, conjoint), situation financière (apport, endettement), motivations, tolérance au risque, disponibilité.</p>
<p><strong>Cohérence Homme / Projet :</strong> le projet doit être en phase avec les compétences, les ressources et les contraintes personnelles du créateur (méthode IMPP – Idée, Moyens, Personne, Projet).</p>`,
        },
        {
          title: "Formaliser le projet : Business Model Canvas",
          content: `<p>Le <strong>Business Model Canvas</strong> (Osterwalder) permet de représenter un modèle économique sur 9 blocs :</p>
<ol>
<li><strong>Segments de clientèle</strong> : qui sont les clients ? (B2C, B2B, niches, personas)</li>
<li><strong>Proposition de valeur</strong> : quel problème résolu, quel bénéfice ?</li>
<li><strong>Canaux</strong> : comment atteindre et livrer les clients ?</li>
<li><strong>Relations clients</strong> : self-service, communauté, accompagnement…</li>
<li><strong>Sources de revenus</strong> : vente, abonnement, commission, freemium…</li>
<li><strong>Ressources clés</strong> : humaines, matérielles, immatérielles, financières.</li>
<li><strong>Activités clés</strong> : production, marketing, R&amp;D, logistique.</li>
<li><strong>Partenaires clés</strong> : fournisseurs, sous-traitants, alliances.</li>
<li><strong>Structure de coûts</strong> : fixes / variables, économies d'échelle.</li>
</ol>
<p>Le BMC se complète utilement par le <strong>Value Proposition Canvas</strong> (matching offre/besoins clients) et par un <strong>Lean Canvas</strong> pour les projets innovants (problèmes, solutions, KPIs, avantage déloyal).</p>`,
        },
        {
          title: "Les étapes clés du parcours de création",
          content: `<p>Un parcours type comporte 7 étapes :</p>
<ol>
<li><strong>Maturation de l'idée</strong> et auto-diagnostic.</li>
<li><strong>Étude de marché</strong> (offre, demande, environnement).</li>
<li><strong>Stratégie commerciale et marketing</strong>.</li>
<li><strong>Prévisionnel financier</strong> (3 ans).</li>
<li><strong>Choix juridique, fiscal et social</strong>.</li>
<li><strong>Formalités d'immatriculation</strong> (Guichet Unique INPI).</li>
<li><strong>Lancement et pilotage</strong> des premiers mois.</li>
</ol>
<p><strong>Accompagnement disponible :</strong> BGE, CCI, CMA, France Travail (NACRE / structures conventionnées), Initiative France, Réseau Entreprendre, ADIE, incubateurs, pépinières, couveuses, CAE (coopératives d'activité et d'emploi).</p>`,
        },
      ],
    },
    {
      title: "Étude de marché et stratégie commerciale",
      description: "Valider la demande, analyser la concurrence et bâtir une stratégie commerciale différenciante.",
      sections: [
        {
          title: "Étude de marché : méthode et sources",
          content: `<p>L'étude de marché répond à 4 questions :</p>
<ul>
<li><strong>Le marché existe-t-il ?</strong> (taille, dynamique, tendances)</li>
<li><strong>Qui sont les clients ?</strong> (segments, comportements, motivations d'achat)</li>
<li><strong>Qui sont les concurrents ?</strong> (directs, indirects, substituts)</li>
<li><strong>L'environnement est-il favorable ?</strong> (réglementation, technologie, économie)</li>
</ul>
<p><strong>Étude documentaire (sources gratuites) :</strong> INSEE, Bpifrance Création, observatoires sectoriels, fédérations professionnelles, CCI / CMA, Pôle emploi (DARES), Pappers, Societe.com, Google Trends.</p>
<p><strong>Étude terrain :</strong> questionnaires (Google Forms, Typeform), entretiens qualitatifs (8 à 15 personnes), tests d'offre (MVP, pré-vente, landing page), visites concurrents (mystery shopping).</p>
<p><strong>Outils d'analyse :</strong> PESTEL (macro-environnement), 5 forces de Porter (intensité concurrentielle), SWOT (synthèse stratégique).</p>`,
        },
        {
          title: "Positionnement et mix marketing",
          content: `<p>Le <strong>positionnement</strong> = place que l'on souhaite occuper dans l'esprit du client cible. Il se résume en une phrase : <em>"Pour [cible], [marque] est le [catégorie] qui [bénéfice différenciant] parce que [preuves]."</em></p>
<p><strong>Mix marketing (4P / 7P en services) :</strong></p>
<ul>
<li><strong>Produit / Service</strong> : gamme, qualité, packaging, garanties.</li>
<li><strong>Prix</strong> : coût + marge, alignement concurrentiel, valeur perçue, prix psychologique.</li>
<li><strong>Place (distribution)</strong> : circuit court / long, vente directe, e-commerce, marketplace, retail.</li>
<li><strong>Promotion (communication)</strong> : SEO, SEA, réseaux sociaux, RP, partenariats, événements.</li>
<li><strong>People</strong> : équipe en contact client.</li>
<li><strong>Process</strong> : parcours client, délais, qualité de service.</li>
<li><strong>Physical evidence</strong> : preuves tangibles (locaux, avis clients, certifications).</li>
</ul>`,
        },
        {
          title: "Plan d'action commercial des 12 premiers mois",
          content: `<p>Le plan d'action commercial décline la stratégie en <strong>objectifs SMART</strong> et en actions concrètes :</p>
<ul>
<li><strong>Objectifs</strong> : CA, nombre de clients, panier moyen, taux de transformation, parts de marché.</li>
<li><strong>Actions de prospection</strong> : cold mailing, phoning, réseautage, salons, prescripteurs.</li>
<li><strong>Actions de notoriété</strong> : site web vitrine, SEO local, Google Business Profile, LinkedIn, Instagram, presse locale.</li>
<li><strong>Actions de fidélisation</strong> : programme de parrainage, emailing, avis Google, service après-vente.</li>
<li><strong>Budget communication</strong> : règle empirique 5 à 10 % du CA prévisionnel la première année.</li>
</ul>
<p><strong>Outils :</strong> CRM (HubSpot Free, Pipedrive, Brevo), agenda partagé, tableaux de bord commerciaux (Excel, Notion).</p>`,
        },
      ],
    },
    {
      title: "Prévisionnel financier et plan de financement",
      description: "Chiffrer le projet, construire un prévisionnel 3 ans crédible et boucler le plan de financement.",
      sections: [
        {
          title: "Chiffre d'affaires prévisionnel et seuil de rentabilité",
          content: `<p>Méthodes pour estimer le CA :</p>
<ul>
<li><strong>Méthode des intentions d'achat</strong> (étude terrain × prix moyen × cible).</li>
<li><strong>Méthode des références</strong> (CA moyen de concurrents comparables).</li>
<li><strong>Méthode des objectifs</strong> (calculer le CA nécessaire pour couvrir les charges + rémunération).</li>
<li><strong>Méthode des capacités</strong> (volume produit/vendu × prix unitaire).</li>
</ul>
<p>On retient en général <strong>3 hypothèses</strong> : basse (pessimiste), médiane, haute. Le prévisionnel "audit" se base sur l'hypothèse médiane.</p>
<p><strong>Seuil de rentabilité</strong> = Charges fixes / Taux de marge sur coûts variables.<br>
<strong>Point mort (en jours)</strong> = (Seuil de rentabilité / CA annuel) × 360.</p>`,
        },
        {
          title: "Compte de résultat et plan de trésorerie prévisionnels",
          content: `<p><strong>Compte de résultat prévisionnel (3 ans) :</strong></p>
<ul>
<li>Chiffre d'affaires</li>
<li>– Achats consommés / coût d'achat des marchandises</li>
<li>= Marge brute</li>
<li>– Charges externes (loyer, assurance, honoraires, communication)</li>
<li>– Impôts et taxes (CFE)</li>
<li>– Charges de personnel (salaires + cotisations)</li>
<li>= Excédent Brut d'Exploitation (EBE)</li>
<li>– Dotations aux amortissements</li>
<li>= Résultat d'exploitation</li>
<li>– Charges financières / + produits financiers</li>
<li>= Résultat courant avant impôt</li>
<li>– Impôt sur les sociétés (le cas échéant)</li>
<li>= Résultat net</li>
</ul>
<p><strong>Plan de trésorerie mensuel (12 mois) :</strong> encaissements (TTC) – décaissements (TTC) = solde du mois + solde cumulé. Permet de détecter les <strong>impasses de trésorerie</strong> et d'anticiper un découvert ou un crédit court terme.</p>`,
        },
        {
          title: "Plan de financement et solutions de financement",
          content: `<p><strong>Plan de financement initial</strong> : besoins (immobilisations + BFR + trésorerie de démarrage) = ressources (apport personnel + emprunts + aides + love money + levée).</p>
<p><strong>Sources de financement :</strong></p>
<ul>
<li><strong>Apport personnel</strong> (minimum 20 à 30 % attendu par les banques).</li>
<li><strong>Prêt bancaire professionnel</strong> (souvent garanti à 50-70 % par Bpifrance ou France Active).</li>
<li><strong>Prêt d'honneur</strong> (0 %, sans garantie) : Initiative France, Réseau Entreprendre, ADIE.</li>
<li><strong>Microcrédit professionnel</strong> ADIE (jusqu'à 12 000 €).</li>
<li><strong>Aides publiques</strong> : ACRE (exonération partielle de charges 1ʳᵉ année), ARCE (45 % des droits France Travail en capital), NACRE, aides régionales.</li>
<li><strong>Crowdfunding</strong> (KissKissBankBank, Ulule, October), <strong>love money</strong> (FBA – Friends, Family, Fools), <strong>business angels</strong>, capital-risque.</li>
<li><strong>Crédit-bail / leasing</strong> pour matériel et véhicules.</li>
</ul>`,
        },
      ],
    },
    {
      title: "Choix juridique, fiscal et social",
      description: "Choisir la forme juridique, le régime fiscal et le statut social du dirigeant adaptés au projet.",
      sections: [
        {
          title: "Comparaison des formes juridiques",
          content: `<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;font-size:13px">
<tr style="background:#f0f0f0"><th>Forme</th><th>Associés</th><th>Capital</th><th>Responsabilité</th><th>Régime fiscal</th><th>Statut dirigeant</th></tr>
<tr><td>EI (micro ou réel)</td><td>1</td><td>Aucun</td><td>Limitée au patrimoine pro depuis 2022</td><td>IR (BIC/BNC)</td><td>TNS</td></tr>
<tr><td>EURL</td><td>1</td><td>Libre (1 € mini)</td><td>Limitée aux apports</td><td>IR par défaut, option IS</td><td>TNS (gérant associé)</td></tr>
<tr><td>SARL</td><td>2 à 100</td><td>Libre</td><td>Limitée aux apports</td><td>IS par défaut, option IR 5 ans</td><td>TNS si gérant majoritaire, sinon assimilé salarié</td></tr>
<tr><td>SASU</td><td>1</td><td>Libre</td><td>Limitée aux apports</td><td>IS par défaut, option IR 5 ans</td><td>Assimilé salarié</td></tr>
<tr><td>SAS</td><td>2+</td><td>Libre</td><td>Limitée aux apports</td><td>IS par défaut, option IR 5 ans</td><td>Assimilé salarié</td></tr>
<tr><td>SA</td><td>2+ (7 si cotée)</td><td>37 000 € mini</td><td>Limitée aux apports</td><td>IS</td><td>Assimilé salarié</td></tr>
</table>
<p><strong>Critères de choix :</strong> nombre d'associés, protection du patrimoine, fiscalité visée (IR vs IS), statut social souhaité (TNS = moins de charges mais moins de protection / assimilé salarié = protection régime général sauf chômage), perspectives de levée de fonds, image / crédibilité.</p>`,
        },
        {
          title: "Régimes fiscaux et TVA",
          content: `<p><strong>Imposition des bénéfices :</strong></p>
<ul>
<li><strong>Micro-entreprise</strong> : abattement forfaitaire (71 % vente de marchandises, 50 % BIC services, 34 % BNC). Plafonds 2025 : 188 700 € (vente) / 77 700 € (services et BNC). Versement libératoire possible sous conditions.</li>
<li><strong>Régime réel</strong> (BIC ou BNC) : imposition sur le bénéfice réel après déduction des charges réelles.</li>
<li><strong>Impôt sur les sociétés (IS)</strong> : 15 % jusqu'à 42 500 € de bénéfice (sous conditions de CA &lt; 10 M€ et capital détenu à 75 % par personnes physiques), 25 % au-delà.</li>
</ul>
<p><strong>TVA :</strong></p>
<ul>
<li><strong>Franchise en base</strong> : pas de TVA facturée ni récupérée (seuils 2025 : 85 000 € vente / 37 500 € services).</li>
<li><strong>Réel simplifié</strong> : 2 acomptes par an + régularisation annuelle (CA &lt; 840 000 € vente / 254 000 € services).</li>
<li><strong>Réel normal</strong> : déclaration mensuelle (ou trimestrielle si TVA &lt; 4 000 €/an).</li>
<li><strong>Taux</strong> : 20 % (normal), 10 % (restauration, transport), 5,5 % (alimentaire, livre), 2,1 % (presse, médicaments remboursables).</li>
</ul>
<p><strong>Autres impôts :</strong> CFE (cotisation foncière des entreprises, exonération l'année de création), CVAE (CA &gt; 500 000 €, en extinction progressive), taxe d'apprentissage, formation professionnelle.</p>`,
        },
        {
          title: "Protection sociale du dirigeant",
          content: `<p><strong>Travailleur Non Salarié (TNS – SSI/URSSAF) :</strong></p>
<ul>
<li>Cotisations ≈ 40 à 45 % du revenu net (≈ 22 % pour micro-services BIC/BNC).</li>
<li>Couverture : maladie/maternité, retraite de base + complémentaire, invalidité, décès.</li>
<li>Pas d'assurance chômage ni d'accident du travail (à compléter par contrats Madelin).</li>
</ul>
<p><strong>Assimilé salarié (président de SAS/SASU, gérant minoritaire ou égalitaire SARL) :</strong></p>
<ul>
<li>Cotisations ≈ 75 à 82 % du salaire net (charges salariales + patronales).</li>
<li>Couverture identique aux salariés <strong>hors chômage</strong> (sauf à souscrire une garantie type GSC).</li>
<li>Pas de cotisation si pas de rémunération versée (mais pas de droits acquis).</li>
</ul>
<p><strong>ACRE</strong> (Aide à la Création ou Reprise d'Entreprise) : exonération partielle des cotisations sociales la 1ʳᵉ année, sous conditions de ressources et de statut (demandeur d'emploi, &lt; 26 ans, bénéficiaire RSA…).</p>`,
        },
      ],
    },
    {
      title: "Formalités, lancement et pilotage",
      description: "Immatriculer l'entreprise, sécuriser le lancement et mettre en place les outils de pilotage.",
      sections: [
        {
          title: "Formalités d'immatriculation (Guichet Unique INPI)",
          content: `<p>Depuis le 1ᵉʳ janvier 2023, toutes les formalités passent par le <strong>Guichet Unique des Entreprises (formalites.entreprises.gouv.fr)</strong> géré par l'INPI. Étapes :</p>
<ol>
<li><strong>Rédaction des statuts</strong> (pour les sociétés) ou auto-déclaration (micro / EI).</li>
<li><strong>Dépôt du capital social</strong> sur un compte bloqué (banque, notaire, Caisse des Dépôts).</li>
<li><strong>Annonce légale</strong> dans un journal habilité (≈ 150 à 220 €).</li>
<li><strong>Dossier en ligne</strong> sur le Guichet Unique : pièces d'identité, justificatif de domiciliation, statuts, attestation de dépôt de capital, déclaration de non-condamnation.</li>
<li><strong>Délivrance des numéros</strong> : SIREN / SIRET (INSEE), code APE / NAF, n° de TVA intracommunautaire, extrait Kbis (sociétés) ou avis SIRENE (EI).</li>
</ol>
<p><strong>Domiciliation possible</strong> : adresse personnelle (sous conditions de bail/règlement copro), local commercial, société de domiciliation, pépinière / coworking.</p>
<p><strong>Coût indicatif d'immatriculation :</strong> 0 € (micro), ≈ 40 € (EI réel), ≈ 250 à 400 € (SARL / SAS hors honoraires).</p>`,
        },
        {
          title: "Démarches complémentaires avant lancement",
          content: `<p>Avant le 1ᵉʳ client, sécuriser :</p>
<ul>
<li><strong>Assurances obligatoires/recommandées</strong> : RC Pro, multirisque pro, décennale (BTP), assurance véhicule pro, prévoyance dirigeant, mutuelle.</li>
<li><strong>Compte bancaire pro</strong> (obligatoire pour les sociétés et pour les EI dont CA &gt; 10 000 € pendant 2 ans).</li>
<li><strong>Logiciel de facturation conforme</strong> (facturation électronique obligatoire entre entreprises à partir de septembre 2026).</li>
<li><strong>CGV / CGU</strong>, mentions légales, politique de confidentialité (RGPD).</li>
<li><strong>Protection de la marque</strong> (dépôt INPI, nom de domaine, comptes sociaux).</li>
<li><strong>Conformité sectorielle</strong> : qualifications obligatoires (CAP coiffure, carte VTC, agrément ESUS…), normes (HACCP, ERP), autorisations (terrasse, débit de boissons).</li>
</ul>`,
        },
        {
          title: "Pilotage des 12 premiers mois et tableau de bord",
          content: `<p><strong>Rythme recommandé :</strong></p>
<ul>
<li><strong>Hebdomadaire</strong> : prospection, suivi commercial, trésorerie.</li>
<li><strong>Mensuel</strong> : tableau de bord (CA, marge, trésorerie, encours clients), rapprochement bancaire, déclaration TVA / URSSAF.</li>
<li><strong>Trimestriel</strong> : revue stratégique (vs prévisionnel), ajustement plan d'action commercial.</li>
<li><strong>Annuel</strong> : bilan, liasse fiscale, dépôt des comptes, entretien expert-comptable.</li>
</ul>
<p><strong>Indicateurs clés (KPI) à suivre :</strong> CA mensuel, marge brute, EBE, trésorerie, BFR, DSO (délai moyen de paiement clients), taux de transformation, coût d'acquisition client (CAC), valeur client (LTV), Net Promoter Score (NPS).</p>
<p><strong>Outils recommandés :</strong> tableur Excel / Google Sheets, logiciel de comptabilité (Pennylane, Indy, Tiime, Dougs), CRM (HubSpot, Pipedrive), outil de facturation (Henrri, Abby, Qonto).</p>`,
        },
      ],
    },
    {
      title: "Gestion quotidienne, comptabilité et obligations",
      description: "Maîtriser la facturation, la comptabilité courante, les déclarations et le calendrier fiscal et social de la 1ʳᵉ année.",
      sections: [
        {
          title: "Facturation conforme et recouvrement",
          content: `<p><strong>Mentions obligatoires d'une facture</strong> (art. L441-9 du Code de commerce) :</p>
<ul>
<li>Numéro unique et chronologique, date d'émission, date de la vente ou de la prestation.</li>
<li>Identité complète du vendeur : dénomination, forme juridique, capital, adresse, SIREN/SIRET, RCS ou RM, n° TVA intracommunautaire.</li>
<li>Identité et adresse du client (+ n° TVA si autoliquidation intracommunautaire).</li>
<li>Désignation, quantité, prix unitaire HT, remises, total HT, taux et montant de TVA, total TTC.</li>
<li>Date de règlement, conditions d'escompte, <strong>pénalités de retard</strong> (3× le taux d'intérêt légal minimum) et <strong>indemnité forfaitaire de recouvrement de 40 €</strong>.</li>
<li>Mentions spécifiques : « TVA non applicable, art. 293 B du CGI » (franchise en base), « Autoliquidation », assurance décennale et garant (BTP), adhésion à un OGA le cas échéant.</li>
</ul>
<p><strong>Facturation électronique :</strong> réception obligatoire pour toutes les entreprises et émission progressive à partir de septembre 2026 (grandes entreprises et ETI) puis septembre 2027 (PME et microentreprises). Format structuré (Factur-X, UBL, CII) transmis via une <strong>Plateforme de Dématérialisation Partenaire (PDP)</strong>.</p>
<p><strong>Recouvrement en 4 étapes :</strong> relance amiable (J+3 après échéance) → relance écrite recommandée → mise en demeure → injonction de payer (tribunal de commerce, procédure en ligne) ou recours à un commissaire de justice. Prévention : acompte à la commande (30 %), conditions de paiement claires dans les CGV, plafond légal de 60 jours date de facture (ou 45 jours fin de mois).</p>`,
        },
        {
          title: "Comptabilité courante et obligations déclaratives",
          content: `<p><strong>Obligations selon le régime :</strong></p>
<ul>
<li><strong>Micro-entreprise</strong> : livre des recettes (et registre des achats si vente de marchandises), conservation des justificatifs 10 ans, déclaration mensuelle ou trimestrielle du CA sur autoentrepreneur.urssaf.fr — même si le CA est nul.</li>
<li><strong>Régime réel / société</strong> : comptabilité en partie double, livre-journal, grand livre, inventaire annuel, bilan, compte de résultat et annexe, dépôt des comptes au greffe pour les sociétés.</li>
</ul>
<p><strong>Calendrier type d'une 1ʳᵉ année :</strong></p>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;font-size:13px">
<tr style="background:#f0f0f0"><th>Échéance</th><th>Obligation</th></tr>
<tr><td>Mensuel / trimestriel</td><td>Déclaration et paiement de la TVA, déclaration URSSAF du CA (micro), DSN si salariés</td></tr>
<tr><td>Trimestriel</td><td>Acomptes d'impôt sur les sociétés (si IS et IS N-1 &gt; 3 000 €)</td></tr>
<tr><td>Mai</td><td>Déclaration de revenus (2042-C-PRO pour les entreprises à l'IR)</td></tr>
<tr><td>Mai</td><td>Liasse fiscale (2031 BIC / 2035 BNC / 2065 IS) dans les 3 mois de la clôture</td></tr>
<tr><td>Décembre</td><td>CFE (exonérée l'année de création, déclaration initiale 1447-C avant le 31/12 de l'année de création)</td></tr>
</table>
<p><strong>Choisir son accompagnement :</strong> expert-comptable (obligatoire de fait pour les sociétés, 800 à 2 500 €/an pour une TPE), comptabilité en ligne (Indy, Dougs, Tiime : 20 à 100 €/mois), ou autonomie complète en micro-entreprise.</p>`,
        },
        {
          title: "Premiers recrutements et cadre social",
          content: `<p>Avant d'embaucher, vérifier la <strong>capacité financière</strong> : un salarié au SMIC coûte environ 1,45 fois son salaire brut chargé (hors allègements Fillon qui réduisent fortement le coût au niveau du SMIC).</p>
<p><strong>Étapes de la 1ʳᵉ embauche :</strong></p>
<ol>
<li>Choix du contrat : CDI, CDD (motif obligatoire), apprentissage, contrat de professionnalisation, stage (convention tripartite).</li>
<li><strong>DPAE</strong> (Déclaration Préalable À l'Embauche) auprès de l'URSSAF, au plus tôt 8 jours avant l'embauche.</li>
<li>Rédaction du contrat conforme à la <strong>convention collective</strong> applicable (IDCC déterminé par l'activité principale).</li>
<li>Adhésion caisse de retraite complémentaire (AGIRC-ARRCO), mutuelle collective obligatoire, prévoyance.</li>
<li>Registre unique du personnel, affichages obligatoires, visite d'information et de prévention (SPST).</li>
<li>Paie mensuelle + <strong>DSN</strong> avant le 5 ou le 15 du mois suivant.</li>
</ol>
<p><strong>Alternatives à l'embauche directe :</strong> TESE (Titre Emploi Service Entreprise, gratuit URSSAF, &lt; 20 salariés), portage salarial, freelance/sous-traitance, groupement d'employeurs, intérim.</p>
<p><strong>Aides à l'embauche :</strong> aide unique apprentissage, emploi franc en QPV, aides AGEFIPH pour travailleurs handicapés, exonérations ZRR / ZFU selon implantation.</p>`,
        },
      ],
    },
    {
      title: "Digital, communication et développement commercial",
      description: "Rendre l'entreprise visible, acquérir ses premiers clients et sécuriser ses données.",
      sections: [
        {
          title: "Présence en ligne et acquisition de clients",
          content: `<p><strong>Socle digital minimum d'un créateur :</strong></p>
<ul>
<li><strong>Nom de domaine + site vitrine</strong> (WordPress, Wix, Webflow, Shopify pour la vente en ligne) : présentation, offre, preuves sociales, formulaire de contact, tarifs ou fourchette.</li>
<li><strong>Google Business Profile</strong> : indispensable en local, alimente Maps et le pack local. Photos, horaires, posts, collecte d'avis.</li>
<li><strong>Réseaux sociaux ciblés</strong> : LinkedIn (B2B), Instagram / TikTok (B2C, visuel), Facebook (local, communautés), Pinterest (déco, artisanat).</li>
<li><strong>Emailing</strong> : Brevo, Mailchimp — la base de contacts est un actif de l'entreprise.</li>
</ul>
<p><strong>SEO — les 3 piliers :</strong> technique (vitesse, mobile, balises title/meta, structure Hn), contenu (pages métier + pages locales + blog répondant aux requêtes clients), popularité (backlinks annuaires, partenaires, presse locale).</p>
<p><strong>SEA / Ads :</strong> commencer avec un budget test de 300 à 500 €/mois, une seule campagne, un mot-clé transactionnel principal, une landing page dédiée. Mesurer le <strong>coût par lead</strong> et le <strong>CAC</strong> avant d'augmenter les budgets.</p>
<p><strong>Tunnel de vente type :</strong> visiteur → lead (formulaire, appel) → rendez-vous → devis → client → client fidèle / prescripteur. Suivre le taux de passage à chaque étape pour identifier le point de fuite.</p>`,
        },
        {
          title: "Vente, devis et négociation",
          content: `<p><strong>Structure d'un entretien de vente (méthode CAB / SONCAS) :</strong></p>
<ol>
<li><strong>Prise de contact</strong> : créer le climat, cadrer la durée et l'objectif.</li>
<li><strong>Découverte</strong> : questions ouvertes, écoute active, reformulation, identification des motivations SONCAS (Sécurité, Orgueil, Nouveauté, Confort, Argent, Sympathie).</li>
<li><strong>Argumentation CAB</strong> : Caractéristique → Avantage → Bénéfice client, preuve à l'appui.</li>
<li><strong>Traitement des objections</strong> : accepter, creuser (« qu'entendez-vous par trop cher ? »), répondre, valider.</li>
<li><strong>Conclusion</strong> : engagement daté, acompte, prochaine étape écrite.</li>
</ol>
<p><strong>Devis professionnel :</strong> mêmes mentions que la facture + « devis gratuit / payant », durée de validité (30 jours), conditions de règlement, mention « bon pour accord » avec date et signature. Le devis signé vaut contrat.</p>
<p><strong>Fixer son prix :</strong> partir du <strong>taux horaire cible</strong> = (charges annuelles + rémunération souhaitée) / nombre d'heures facturables réelles (≈ 900 à 1 200 h/an pour un indépendant, pas 1 600 h). Vérifier ensuite l'acceptabilité marché et la valeur perçue.</p>`,
        },
        {
          title: "RGPD, cybersécurité et protection des actifs",
          content: `<p><strong>RGPD — obligations d'une TPE :</strong> registre des traitements, information des personnes (mentions sur les formulaires), base légale identifiée, durées de conservation, sécurité des données, droit d'accès / rectification / effacement, notification CNIL en cas de violation (72 h).</p>
<p><strong>Cybersécurité — mesures de base :</strong> mots de passe forts + gestionnaire, double authentification, sauvegardes automatiques 3-2-1, mises à jour, antivirus, sensibilisation au phishing et à la fraude au président / faux RIB fournisseur, cyberassurance.</p>
<p><strong>Protection des actifs immatériels :</strong></p>
<ul>
<li><strong>Marque</strong> : dépôt INPI (190 € pour 1 classe, +40 € par classe), après recherche d'antériorité ; protection 10 ans renouvelable.</li>
<li><strong>Nom de domaine</strong> : réserver les variantes (.fr, .com) et les comptes sociaux.</li>
<li><strong>Créations</strong> : droit d'auteur automatique, enveloppe Soleau ou dépôt chez un tiers de confiance pour dater.</li>
<li><strong>Savoir-faire</strong> : clauses de confidentialité (NDA) avec partenaires, prestataires et salariés.</li>
</ul>`,
        },
      ],
    },
    {
      title: "Cas pratiques chiffrés et fiches outils",
      description: "Appliquer les notions à des situations réelles et disposer de repères directement utilisables.",
      sections: [
        {
          title: "Cas pratique 1 – Prestataire de services en SASU",
          content: `<p><strong>Contexte :</strong> Consultante en communication, création d'une SASU, TJM 450 €, 130 jours facturés la 1ʳᵉ année.</p>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;font-size:13px">
<tr style="background:#f0f0f0"><th>Poste</th><th>Année 1</th><th>Commentaire</th></tr>
<tr><td>Chiffre d'affaires</td><td>58 500 €</td><td>450 € × 130 jours</td></tr>
<tr><td>Charges externes</td><td>7 200 €</td><td>Coworking, logiciels, assurance, comptable, communication</td></tr>
<tr><td>Rémunération brute présidente</td><td>30 000 €</td><td>2 500 €/mois</td></tr>
<tr><td>Cotisations (≈ 80 % du net)</td><td>16 500 €</td><td>Assimilée salariée</td></tr>
<tr><td>Résultat avant IS</td><td>4 800 €</td><td></td></tr>
<tr><td>IS à 15 %</td><td>720 €</td><td>Taux réduit &lt; 42 500 €</td></tr>
<tr><td><strong>Résultat net</strong></td><td><strong>4 080 €</strong></td><td>Mise en réserve ou dividendes</td></tr>
</table>
<p><strong>Lecture :</strong> le seuil de rentabilité correspond ici à ≈ 120 jours facturés. En dessous, la rémunération doit être réduite ou la trésorerie de départ mobilisée. <strong>Point de vigilance :</strong> les 130 jours facturés supposent 60 jours consacrés à la prospection, l'administratif et les congés — le calendrier commercial doit être planifié dès le mois 1.</p>`,
        },
        {
          title: "Cas pratique 2 – Commerce de détail en micro-entreprise",
          content: `<p><strong>Contexte :</strong> Boutique d'épicerie fine, micro-entreprise (vente de marchandises), CA prévisionnel 90 000 €, taux de marge 35 %.</p>
<ul>
<li>Marge brute : 90 000 × 35 % = <strong>31 500 €</strong>.</li>
<li>Charges fixes annuelles : loyer 9 600 €, assurance 900 €, énergie 2 400 €, communication 1 800 €, divers 1 500 € = <strong>16 200 €</strong>.</li>
<li>Cotisations micro (12,3 % du CA en vente) : <strong>11 070 €</strong>.</li>
<li>Revenu disponible : 31 500 – 16 200 – 11 070 = <strong>4 230 €/an</strong> → insuffisant.</li>
</ul>
<p><strong>Analyse :</strong> le régime micro est ici pénalisant car les cotisations portent sur le CA et non sur la marge. Un passage au <strong>régime réel</strong> (EI ou EURL) permet de déduire les charges réelles et de cotiser sur le bénéfice. Autres leviers : augmenter le taux de marge (mix produits, marques propres), réduire le loyer, développer un second canal (click &amp; collect, marchés).</p>
<p><strong>Besoin de financement de départ :</strong> aménagement 25 000 €, stock initial 15 000 €, trésorerie de sécurité 8 000 €, BFR 6 000 € = <strong>54 000 €</strong>, financés par 16 000 € d'apport, 8 000 € de prêt d'honneur et 30 000 € de prêt bancaire sur 5 ans (≈ 545 €/mois).</p>`,
        },
        {
          title: "Fiches outils : check-lists et modèles",
          content: `<p><strong>Check-list « prêt à immatriculer » :</strong></p>
<ul>
<li>☐ Étude de marché rédigée et sources citées</li>
<li>☐ Business model formalisé (BMC)</li>
<li>☐ Prévisionnel 3 ans + plan de trésorerie 12 mois</li>
<li>☐ Plan de financement bouclé (besoins = ressources)</li>
<li>☐ Forme juridique, régime fiscal et statut social arbitrés</li>
<li>☐ Justificatif de domiciliation</li>
<li>☐ Statuts rédigés et capital déposé (sociétés)</li>
<li>☐ Annonce légale publiée (sociétés)</li>
<li>☐ Assurance RC Pro souscrite</li>
<li>☐ Compte bancaire professionnel ouvert</li>
<li>☐ CGV, mentions légales et registre RGPD prêts</li>
<li>☐ Outil de facturation conforme choisi</li>
</ul>
<p><strong>Check-list mensuelle de pilotage :</strong> saisie comptable à jour ☐ — rapprochement bancaire ☐ — relance des impayés ☐ — TVA / URSSAF déclarées ☐ — tableau de bord mis à jour (CA, marge, trésorerie à 3 mois) ☐ — 1 action de prospection par semaine réalisée ☐.</p>
<p><strong>Erreurs les plus fréquentes des créateurs :</strong> sous-estimer le BFR et le délai d'encaissement, prévoir un CA trop optimiste dès le mois 1, négliger la prospection une fois les premiers clients signés, confondre chiffre d'affaires et revenu, oublier de provisionner l'URSSAF et l'impôt, choisir un statut par imitation plutôt que par calcul.</p>`,
        },
        {
          title: "Glossaire et ressources utiles",
          content: `<p><strong>Glossaire :</strong></p>
<ul>
<li><strong>BFR</strong> : besoin en fonds de roulement = stocks + créances clients – dettes fournisseurs.</li>
<li><strong>EBE</strong> : excédent brut d'exploitation, richesse dégagée par l'activité avant amortissements et financements.</li>
<li><strong>CAF</strong> : capacité d'autofinancement = résultat net + dotations aux amortissements.</li>
<li><strong>DSO</strong> : délai moyen de paiement des clients, en jours de CA.</li>
<li><strong>CAC / LTV</strong> : coût d'acquisition d'un client / valeur générée par ce client sur sa durée de vie.</li>
<li><strong>Kbis</strong> : extrait d'immatriculation au RCS, carte d'identité de la société.</li>
<li><strong>TNS</strong> : travailleur non salarié, affilié à la Sécurité sociale des indépendants.</li>
<li><strong>PDP</strong> : plateforme de dématérialisation partenaire (facturation électronique).</li>
</ul>
<p><strong>Ressources officielles :</strong> bpifrance-creation.fr (guides et prévisionnel gratuit), formalites.entreprises.gouv.fr (Guichet Unique INPI), entreprendre.service-public.fr, urssaf.fr et autoentrepreneur.urssaf.fr, impots.gouv.fr (espace professionnel), insee.fr (données de marché), inpi.fr (marques), cnil.fr (RGPD), francetravail.fr (ACRE / ARCE).</p>
<p><strong>Réseaux d'accompagnement :</strong> BGE, CCI, CMA, Initiative France, Réseau Entreprendre, ADIE, France Active, incubateurs et pépinières territoriales, coopératives d'activité et d'emploi (CAE).</p>`,
        },
      ],
    },
    {

      title: "Quiz et auto-évaluation",
      description: "Vérifier l'acquisition des notions clés du parcours de création d'entreprise.",
      sections: [
        {
          title: "Quiz – Étude de marché et modèle économique",
          content: `<div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px"><p><strong>Question 1 :</strong> Citez les 9 blocs du Business Model Canvas.</p><p style="color:#28a745">✅ Réponse : Segments clients, Proposition de valeur, Canaux, Relations clients, Sources de revenus, Ressources clés, Activités clés, Partenaires clés, Structure de coûts.</p></div>
<div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px"><p><strong>Question 2 :</strong> Quelles sont les 5 forces de Porter ?</p><p style="color:#28a745">✅ Réponse : Concurrents du secteur, nouveaux entrants potentiels, produits de substitution, pouvoir de négociation des fournisseurs, pouvoir de négociation des clients.</p></div>
<div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px"><p><strong>Question 3 :</strong> Comment calcule-t-on le seuil de rentabilité ?</p><p style="color:#28a745">✅ Réponse : Seuil de rentabilité = Charges fixes / Taux de marge sur coûts variables.</p></div>`,
        },
        {
          title: "Quiz – Statuts juridiques, fiscalité, financement",
          content: `<div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px"><p><strong>Question 4 :</strong> Quels sont les plafonds de la micro-entreprise en 2025 ?</p><p style="color:#28a745">✅ Réponse : 188 700 € pour la vente de marchandises, 77 700 € pour les services et activités libérales (BNC).</p></div>
<div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px"><p><strong>Question 5 :</strong> Différence principale entre TNS et assimilé salarié ?</p><p style="color:#28a745">✅ Réponse : Le TNS cotise moins (≈ 40-45 %) mais a une protection sociale plus faible (pas de chômage, pas d'AT/MP). L'assimilé salarié cotise plus (≈ 75-82 %) mais bénéficie du régime général sauf chômage.</p></div>
<div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px"><p><strong>Question 6 :</strong> Qu'est-ce que l'ACRE ?</p><p style="color:#28a745">✅ Réponse : Aide à la Création ou Reprise d'Entreprise : exonération partielle des cotisations sociales pendant la 1ʳᵉ année d'activité, sous conditions.</p></div>
<div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px"><p><strong>Question 7 :</strong> Citez 3 sources de financement complémentaires à l'apport personnel.</p><p style="color:#28a745">✅ Réponse (exemples) : prêt bancaire, prêt d'honneur (Initiative France / Réseau Entreprendre), microcrédit ADIE, ARCE / NACRE, crowdfunding, business angels, love money.</p></div>`,
        },
        {
          title: "Grille d'auto-évaluation des compétences",
          content: `<p>Évaluez votre niveau de maîtrise (1 = à acquérir, 4 = maîtrisé) :</p>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse"><tr style="background:#f0f0f0"><th>Compétence</th><th>1</th><th>2</th><th>3</th><th>4</th></tr>
<tr><td>Formaliser un projet avec le Business Model Canvas</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Réaliser une étude de marché documentaire et terrain</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Définir un positionnement et un mix marketing</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Construire un compte de résultat et un plan de trésorerie prévisionnels</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Boucler un plan de financement et identifier les aides mobilisables</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Choisir une forme juridique, fiscale et sociale adaptée</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Réaliser les formalités d'immatriculation au Guichet Unique INPI</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
<tr><td>Mettre en place un tableau de bord de pilotage mensuel</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>
</table>`,
        },
      ],
    },
  ];
}
