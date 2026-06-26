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
