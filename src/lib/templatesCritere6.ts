// Critère 6 — IND 23-27 generators (based on real SELECT FORMATION documents)
import { OrganismeInfo, FormationInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, subtractBusinessDays } from "./docBuilder";
import { getCachedVeillePack, veilleRowsToTable } from "./aiVeillePack";

/**
 * Helper: generates realistic veille dates BEFORE the formation start date.
 */
function veilleDate(f: FormationInfo, monthsBefore: number): string {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() - monthsBefore);
  return formatDate(d.toISOString().split("T")[0]);
}

function veilleMonthYear(f: FormationInfo, monthsBefore: number): string {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() - monthsBefore);
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

function veilleYear(f: FormationInfo, monthsBefore: number): string {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() - monthsBefore);
  return `${d.getFullYear()}`;
}

// ===== Detection helpers =====
type FormationType = "creation" | "fle" | "ia" | "word" | "commercial" | "webmarketing" | "crm" | "anglais" | "massage" | "esthetique" | "secretaire" | "management" | "ecsr" | "vtc";

function detectFormationType(f: FormationInfo): FormationType {
  const title = (f.intitule || "").toLowerCase();
  const code = (f.codeRNCP || "").toLowerCase();
  if (title.includes("création d'entreprise") || title.includes("creation d'entreprise") || title.includes("création entreprise") || title.includes("creation entreprise") || title.includes("créer son entreprise") || title.includes("creer son entreprise") || title.includes("porteur de projet") || title.includes("créateur d'entreprise") || title.includes("createur d'entreprise")) return "creation";
  if (title.includes("vtc") || title.includes("voiture de transport avec chauffeur") || title.includes("chauffeur vtc") || code.includes("5637") || code.includes("rs5637")) return "vtc";
  if (title.includes("conduite") || title.includes("ecsr") || title.includes("enseignant de la conduite") || code.includes("35329")) return "ecsr";
  if (title.includes("français") || title.includes("fle") || title.includes("social") || title.includes("médico") || title.includes("medico") || title.includes("communiquer en français")) return "fle";
  if (title.includes("massage") || title.includes("prénatal") || title.includes("prenatal") || title.includes("relaxation") || title.includes("bien-être") || title.includes("bien être") || title.includes("postpartum") || title.includes("post-partum") || title.includes("post partum")) return "massage";
  if (title.includes("esthéti") || title.includes("cosmétique") || title.includes("parfumerie") || title.includes("beauté")) return "esthetique";
  if (title.includes("secrétaire") || title.includes("assistant") || title.includes("médico-admin")) return "secretaire";
  if (title.includes("management") || title.includes("encadrement") || title.includes("leadership") || title.includes("manager")) return "management";
  if (title.includes("intelligence artificielle") || title.includes("ia générative") || title.includes("ia ") || title.includes("contenus rédactionnels") || title.includes("chatgpt") || title.includes("prompt")) return "ia";
  if (title.includes("crm") || title.includes("automation") || title.includes("automatisation")) return "crm";
  if (title.includes("webmarketing") || title.includes("marketing de contenus") || title.includes("réseaux sociaux") || title.includes("marketing digital")) return "webmarketing";
  if (title.includes("anglais") || title.includes("english") || title.includes("toeic") || title.includes("vtest") || title.includes("v-test") || title.includes("rs6905")) return "anglais";
  if (title.includes("commercial") || title.includes("conseiller") || title.includes("négociat") || title.includes("vente") || title.includes("relation client") || title.includes("prospection") || title.includes("ntc") || title.includes("technico") || code.includes("39063")) return "commercial";
  return "word";
}

function isTypeExplicit(f: FormationInfo, type: FormationType): boolean {
  if (type !== "word") return true;
  const t = (f.intitule || "").toLowerCase();
  return t.includes("word") || t.includes("bureautique");
}

// ===== Fallback générique cohérent avec l'intitulé (utilisé tant que l'IA n'a pas régénéré) =====
function genericVeilleRows(
  f: FormationInfo,
  kind: "reglementaire" | "metier" | "technologique",
): string[][] {
  const sujet = (f.intitule || "votre formation").trim();
  const rncp = f.codeRNCP ? ` (${f.codeRNCP})` : "";
  if (kind === "reglementaire") {
    return [
      [
        `<a href="https://travail-emploi.gouv.fr/referentiel-national-qualite-guide-de-lecture-qualiopi" target="_blank" rel="noopener">Ministère du Travail – Guide Qualiopi V9</a>`,
        `Référentiel National Qualité — Guide de lecture Qualiopi V9 appliqué à « ${sujet} »${rncp}`,
        veilleMonthYear(f, 8),
        `Cadre obligatoire pour les organismes dispensant la formation « ${sujet} ». Détaille les 33 indicateurs et leurs preuves attendues.`,
        `Preuve : guide Qualiopi V9 archivé. Action : revue interne des 33 indicateurs adaptée au contenu de « ${sujet} ».`,
      ],
      [
        `<a href="https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006195856" target="_blank" rel="noopener">Légifrance – Code du travail (Formation pro.)</a>`,
        `Articles L.6111-1 et suivants — droit à la formation professionnelle continue`,
        veilleDate(f, 6),
        `Encadre les obligations de l'employeur et les droits du stagiaire pour les actions concourant au développement des compétences telles que « ${sujet} ».`,
        `Preuve : extrait Légifrance. Action : intégration dans le programme et le règlement intérieur de « ${sujet} ».`,
      ],
      [
        `<a href="https://www.francecompetences.fr/" target="_blank" rel="noopener">France Compétences – Répertoires nationaux</a>`,
        `Mises à jour des fiches RNCP/RS du domaine « ${sujet} »`,
        veilleMonthYear(f, 5),
        `Veille sur les évolutions des certifications et blocs de compétences en lien avec le métier visé par « ${sujet} ».`,
        `Preuve : capture fiche RNCP/RS. Action : alignement du référentiel pédagogique de « ${sujet} » sur la dernière version.`,
      ],
      [
        `<a href="https://www.legifrance.gouv.fr/eli/arrete/2025/2/18/TSSD2501626A/jo/texte" target="_blank" rel="noopener">Légifrance – Arrêté du 18/02/2025</a>`,
        `Arrêté du 18 février 2025 — modalités d'audit Qualiopi`,
        veilleDate(f, 4),
        `Modifie les modalités d'audit (durée, indicateurs) pour les organismes dispensant des actions comme « ${sujet} ».`,
        `Preuve : version consolidée JO. Action : mise à jour des procédures d'audit interne.`,
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-droit-formation/actualites-droit/cpf-hausse-du-montant-de-la-participation-forfaitaire" target="_blank" rel="noopener">Centre Inffo – CPF</a>`,
        `CPF : participation forfaitaire 103,20 € — impact sur « ${sujet} »`,
        veilleDate(f, 3),
        `La participation obligatoire CPF s'applique aux inscriptions en « ${sujet} » sauf exonérations (DE, abondement employeur).`,
        `Preuve : article Centre Inffo. Action : information préalable des candidats à « ${sujet} ».`,
      ],
      [
        `<a href="https://www.dendreo.com/blog/veille-legale-et-reglementaire-de-la-formation-professionnelle-recap-des-actualites-2025" target="_blank" rel="noopener">Dendreo – Veille formation pro</a>`,
        `Synthèse réglementaire ${veilleYear(f, 2)} — secteur formation`,
        veilleMonthYear(f, 2),
        `Recensement des évolutions ${veilleYear(f, 2)} applicables à « ${sujet} » : CPF, financement, qualité, RGPD.`,
        `Preuve : synthèse archivée. Action : revue annuelle interne intégrée à « ${sujet} ».`,
      ],
    ];
  }
  if (kind === "metier") {
    return [
      [
        `<a href="https://www.francetravail.fr/statistiques-analyses/marche-du-travail.html" target="_blank" rel="noopener">France Travail – Statistiques métiers</a>`,
        `Tendances du marché du travail pour le métier visé par « ${sujet} »`,
        veilleMonthYear(f, 7),
        `Données officielles sur les besoins de recrutement, salaires et perspectives du métier ciblé par « ${sujet} ».`,
        `Preuve : extrait statistique. Action : adaptation du contenu de « ${sujet} » aux attentes du marché.`,
      ],
      [
        `<a href="https://www.apec.fr/tous-nos-metiers.html" target="_blank" rel="noopener">APEC – Référentiel métiers</a>`,
        `Fiche métier APEC liée à « ${sujet} »`,
        veilleMonthYear(f, 6),
        `Référentiel des compétences attendues, missions et évolutions du métier ciblé par « ${sujet} ».`,
        `Preuve : capture fiche APEC. Action : alignement des objectifs pédagogiques de « ${sujet} ».`,
      ],
      [
        `<a href="https://www.centre-inffo.fr/" target="_blank" rel="noopener">Centre Inffo – Actualités sectorielles</a>`,
        `Évolutions du secteur professionnel de « ${sujet} »`,
        veilleMonthYear(f, 5),
        `Veille sur les conventions collectives, accords de branche et compétences émergentes du secteur de « ${sujet} ».`,
        `Preuve : article archivé. Action : intégration des évolutions dans le programme de « ${sujet} ».`,
      ],
      [
        `<a href="https://www.observatoire-metiers.org/" target="_blank" rel="noopener">Observatoire des métiers de la branche</a>`,
        `Études prospectives sur les métiers liés à « ${sujet} »`,
        veilleMonthYear(f, 4),
        `Études quantitatives et qualitatives sur l'évolution des compétences pour les métiers visés par « ${sujet} ».`,
        `Preuve : étude téléchargée. Action : ajustement des modules de « ${sujet} ».`,
      ],
      [
        `<a href="https://www.linkedin.com/" target="_blank" rel="noopener">LinkedIn – Communautés professionnelles</a>`,
        `Discussions et tendances métier autour de « ${sujet} »`,
        veilleMonthYear(f, 3),
        `Veille communautaire sur les pratiques émergentes, outils et retours d'expérience des professionnels de « ${sujet} ».`,
        `Preuve : capture posts/articles. Action : enrichissement des cas pratiques de « ${sujet} ».`,
      ],
      [
        `<a href="https://www.francecompetences.fr/recherche_certificationprofessionnelle/" target="_blank" rel="noopener">France Compétences – Fiche RNCP/RS</a>`,
        `Fiche officielle des compétences attendues pour « ${sujet} »${rncp}`,
        veilleMonthYear(f, 2),
        `Référentiel d'activités, compétences et évaluation officiel à respecter dans « ${sujet} ».`,
        `Preuve : fiche archivée. Action : conformité du programme de « ${sujet} ».`,
      ],
    ];
  }
  // technologique
  return [
    [
      `<a href="https://www.youtube.com/results?search_query=${encodeURIComponent(sujet + " 2025 nouveautés")}" target="_blank" rel="noopener">YouTube – Nouveautés ${sujet}</a>`,
      `Vidéos professionnelles récentes sur « ${sujet} »`,
      veilleMonthYear(f, 7),
      `Tutoriels et démonstrations des dernières évolutions techniques et outils dans « ${sujet} ».`,
      `Preuve : playlist visionnée. Action : intégration des bonnes pratiques actualisées dans « ${sujet} ».`,
    ],
    [
      `<a href="https://www.usine-digitale.fr/" target="_blank" rel="noopener">L'Usine Digitale</a>`,
      `Innovations technologiques applicables à « ${sujet} »`,
      veilleMonthYear(f, 6),
      `Veille sur les outils numériques, plateformes et SaaS qui transforment la pratique du métier visé par « ${sujet} ».`,
      `Preuve : article archivé. Action : présentation des outils en formation « ${sujet} ».`,
    ],
    [
      `<a href="https://www.frandroid.com/" target="_blank" rel="noopener">Presse spécialisée tech</a>`,
      `Outils et logiciels récents pour « ${sujet} »`,
      veilleMonthYear(f, 5),
      `Comparatifs et tests des outils numériques utilisés dans le métier ciblé par « ${sujet} ».`,
      `Preuve : article comparatif. Action : sélection des outils enseignés dans « ${sujet} ».`,
    ],
    [
      `<a href="https://www.cnil.fr/fr/professionnels" target="_blank" rel="noopener">CNIL – Espace professionnels</a>`,
      `RGPD et numérique appliqués au métier de « ${sujet} »`,
      veilleMonthYear(f, 4),
      `Recommandations CNIL sur l'usage des outils numériques et la protection des données dans « ${sujet} ».`,
      `Preuve : guide CNIL. Action : module RGPD intégré à « ${sujet} ».`,
    ],
    [
      `<a href="https://openai.com/blog" target="_blank" rel="noopener">OpenAI Blog</a>`,
      `IA générative au service du métier de « ${sujet} »`,
      veilleMonthYear(f, 3),
      `Veille sur les apports de l'IA générative pour automatiser ou enrichir les tâches de « ${sujet} ».`,
      `Preuve : article archivé. Action : démonstration d'usages IA appliqués à « ${sujet} ».`,
    ],
    [
      `<a href="https://www.youtube.com/results?search_query=${encodeURIComponent(sujet + " tutoriel pro")}" target="_blank" rel="noopener">YouTube – Tutoriels ${sujet}</a>`,
      `Tutoriels professionnels sur les outils de « ${sujet} »`,
      veilleMonthYear(f, 2),
      `Démonstrations pratiques des outils numériques utilisés dans « ${sujet} ».`,
      `Preuve : tutoriels visionnés. Action : ressources partagées aux stagiaires de « ${sujet} ».`,
    ],
  ];
}

// ===== IND 23 — VEILLE RÉGLEMENTAIRE =====

/** Public helper: récupère les lignes hardcodées de veille réglementaire d'une formation
 *  (utilisé par le générateur de preuves visuelles IND 23). */
export function getVeilleReglementaireRowsForFormation(f: FormationInfo): string[][] {
  const aiPack = getCachedVeillePack(f);
  if (aiPack?.reglementaire?.length) return veilleRowsToTable(aiPack.reglementaire);
  return genericVeilleRows(f, "reglementaire");
}

function veilleReglementaireRows(f: FormationInfo, type: FormationType): string[][] {
  const common = [
    [
      `<a href="https://www.legifrance.gouv.fr/eli/arrete/2025/2/18/TSSD2501626A/jo/texte">Légifrance – Arrêté du 18/02/2025</a>`,
      "Arrêté du 18 février 2025 — modalités d'audit associées au référentiel national",
      veilleDate(f, 10),
      "Modification des modalités d'audit pour les organismes certifiés (durée, indicateurs audités).",
      "Preuve: Version consolidée journal officiel + critères audit. Action: Mettre à jour vos procédures d'audit interne + planification des indicateurs."
    ],
    [
      `<a href="https://travail-emploi.gouv.fr/referentiel-national-qualite-guide-de-lecture-qualiopi">Ministère du Travail – Guide Qualiopi</a>`,
      "Référentiel national Qualité — Guide de lecture Qualiopi V9",
      veilleDate(f, 8),
      "Rappelle l'obligation de Qualiopi pour accès fonds et financeurs mentionnés à l'art L.6316-1.",
      "Preuve: Version guide Qualiopi. Action: Vérifier conformité continue des indicateurs Qualiopi + documentation interne. Nous nous sommes mis en conformité par rapport au référentiel national qualiopi la v9."
    ],
    [
      `<a href="https://www.dendreo.com/blog/veille-legale-et-reglementaire-de-la-formation-professionnelle-recap-des-actualites-2025">Dendreo – Veille formation pro</a>`,
      "Veille légale et réglementaire formation pro",
      veilleMonthYear(f, 6),
      "Synthèse des actualités essentielles pour OF & Qualiopi. Les financements par le CPF ont connu des évolutions.",
      "Preuve: Extrait synthèse + signets. Action: Archive et établir une synthèse interne annuelle (preuve Qualiopi)."
    ],
  ];

  if (type === "creation") {
    return [...common,
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037385660">Légifrance – Code du travail, art. L.6313-1</a>`,
        "Article L.6313-1 — catégories d'actions relevant de la formation professionnelle",
        veilleDate(f, 9),
        "L'article définit les actions entrant dans le champ de la formation professionnelle (actions de formation, bilans de compétences, VAE, apprentissage). Une formation « Création d'entreprise » relève de la catégorie « action de formation » dès lors qu'elle vise l'acquisition de compétences entrepreneuriales mobilisables : étude de marché, business model, prévisionnel financier, choix du statut, formalités.",
        "Preuve : extrait Légifrance daté et archivé. Action : le programme est présenté comme une action de formation avec des objectifs opérationnels évaluables (construire un BMC, bâtir un prévisionnel 3 ans, arbitrer une forme juridique) ; la qualification est reprise sur la convention, la convocation et l'attestation."
      ],
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037386198">Légifrance – Code du travail, art. L.6353-1</a>`,
        "Article L.6353-1 — contractualisation et information préalable du bénéficiaire",
        veilleDate(f, 8),
        "L'action de formation doit être réalisée conformément à un programme préétabli précisant objectifs, moyens pédagogiques, moyens d'encadrement et modalités d'évaluation, et faire l'objet d'un contrat ou d'une convention avec le bénéficiaire ou le financeur.",
        "Preuve : modèles de contrat et de convention à jour. Action : mise à jour des documents contractuels du parcours Création d'entreprise (intitulé, durée, dates, objectifs, tarif, modalités d'évaluation, conditions d'annulation, contacts) signés avant le démarrage."
      ],
      [
        `<a href="https://entreprendre.service-public.fr/vosdroits/N16789">Service-Public Entreprendre – Guichet unique</a>`,
        "Formalités de création d'entreprise : guichet unique électronique de l'INPI",
        veilleMonthYear(f, 7),
        "Depuis le 1ᵉʳ janvier 2023, l'ensemble des formalités de création, modification et cessation d'entreprise est centralisé sur le guichet unique de l'INPI (formalites.entreprises.gouv.fr), en remplacement des six réseaux de CFE. Les pièces attendues, le parcours en ligne et les délais de délivrance des identifiants (SIREN/SIRET, code APE, Kbis) évoluent régulièrement.",
        "Preuve : captures datées du parcours de formalité + fiche PDF archivée. Action : réécriture du module « Démarches d'immatriculation » et du pas-à-pas remis aux stagiaires (liste des pièces, dépôt de capital, annonce légale, suivi du dossier)."
      ],
      [
        `<a href="https://www.urssaf.fr/accueil/independant/creer-mon-entreprise.html">URSSAF – Créateurs et indépendants</a>`,
        "Micro-entreprise : plafonds de chiffre d'affaires, taux de cotisations et déclarations",
        veilleMonthYear(f, 6),
        "Rappel des plafonds applicables (188 700 € pour la vente de marchandises, 77 700 € pour les prestations de services et activités libérales), des taux de cotisations par nature d'activité, du versement libératoire et de l'obligation de déclarer le chiffre d'affaires même nul.",
        "Preuve : capture des barèmes URSSAF datée. Action : actualisation des chiffres dans le support de cours, dans le comparatif micro / réel et dans les exercices de prévisionnel (calcul du revenu disponible après cotisations)."
      ],
      [
        `<a href="https://www.economie.gouv.fr/entreprises/aides-creation-entreprise">economie.gouv.fr – Aides à la création</a>`,
        "ACRE, ARCE, NACRE et aides régionales : conditions d'éligibilité",
        veilleMonthYear(f, 6),
        "Conditions d'accès à l'exonération partielle de cotisations la première année (ACRE), au versement en capital de 45 % des droits France Travail (ARCE), aux prêts d'honneur et aux dispositifs régionaux d'accompagnement. Les critères d'éligibilité et les taux sont revus chaque année.",
        "Preuve : fiches d'aides archivées et datées. Action : mise à jour du module « Financement du projet » et du tableau comparatif des aides remis en formation, avec cas chiffrés ACRE / ARCE selon le profil du créateur."
      ],
      [
        `<a href="https://bpifrance-creation.fr/">Bpifrance Création</a>`,
        "Choix du statut juridique : EI, micro, EURL, SARL, SASU, SAS",
        veilleMonthYear(f, 5),
        "Comparatif juridique, fiscal et social actualisé des formes d'entreprise : responsabilité, capital, régime d'imposition (IR/IS), statut social du dirigeant (TNS vs assimilé salarié), coût des cotisations et perspectives de développement.",
        "Preuve : tableau comparatif Bpifrance archivé. Action : refonte de l'exercice « Choix du statut juridique » avec les données de l'année en cours et intégration du tableau de synthèse dans le support de cours."
      ],
      [
        `<a href="https://www.impots.gouv.fr/professionnel/facturation-electronique">impots.gouv.fr – Facturation électronique</a>`,
        "Généralisation de la facturation électronique entre entreprises (réforme e-invoicing / e-reporting)",
        veilleMonthYear(f, 4),
        "Toutes les entreprises devront être en capacité de recevoir des factures électroniques à compter de septembre 2026, l'obligation d'émission s'appliquant par étapes jusqu'en septembre 2027 pour les PME et microentreprises. Les factures devront transiter par une plateforme agréée (PDP) dans un format structuré (Factur-X, UBL, CII).",
        "Preuve : page officielle et calendrier archivés. Action : ajout d'une séquence « Facturation conforme et e-invoicing » dans le support de cours, avec check-list des mentions obligatoires et critères de choix d'un outil de facturation compatible."
      ],
      [
        `<a href="https://www.impots.gouv.fr/professionnel/franchise-en-base-de-tva">impots.gouv.fr – TVA</a>`,
        "Franchise en base de TVA : seuils, sortie de franchise et obligations déclaratives",
        veilleMonthYear(f, 4),
        "Seuils de franchise en base (85 000 € pour la vente, 37 500 € pour les services), seuils majorés de tolérance, conséquences du franchissement en cours d'année et mentions obligatoires à porter sur les factures (« TVA non applicable, art. 293 B du CGI »).",
        "Preuve : fiche fiscale datée. Action : mise à jour du module « Fiscalité » et de l'exercice de facturation ; les stagiaires simulent le passage de la franchise au régime réel simplifié sur leur propre prévisionnel."
      ],
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032227330">Légifrance – Code de commerce, art. L.441-9</a>`,
        "Mentions obligatoires des factures et délais de paiement entre professionnels",
        veilleMonthYear(f, 3),
        "L'article fixe les mentions obligatoires de la facture (identification des parties, numéro unique, date, désignation, prix, TVA, date de règlement, pénalités de retard et indemnité forfaitaire de 40 €) ainsi que le plafond légal des délais de paiement (60 jours date de facture ou 45 jours fin de mois).",
        "Preuve : extrait du Code de commerce archivé. Action : modèle de facture et de devis conformes fournis aux stagiaires, avec exercice de repérage des mentions manquantes et procédure de relance des impayés."
      ],
      [
        `<a href="https://www.cnil.fr/fr/rgpd-par-ou-commencer">CNIL – RGPD : par où commencer</a>`,
        "Obligations RGPD applicables aux très petites entreprises",
        veilleMonthYear(f, 3),
        "Rappel des obligations minimales : registre des traitements, information des personnes, base légale, durées de conservation, sécurité des données et notification des violations sous 72 heures. La CNIL publie des modèles adaptés aux TPE et aux sites vitrines.",
        "Preuve : guide CNIL TPE-PME archivé. Action : intégration d'une séquence « RGPD et protection des données du créateur » (registre type, mentions de formulaire, politique de confidentialité) et actualisation des mentions du site vitrine étudié en atelier."
      ],
      [
        `<a href="https://www.inpi.fr/proteger-vos-creations/proteger-votre-marque">INPI – Protéger sa marque</a>`,
        "Dépôt de marque : recherche d'antériorité, classes et coût",
        veilleMonthYear(f, 2),
        "Procédure de dépôt en ligne, recherche d'antériorité préalable, choix des classes de produits et services, barème en vigueur (190 € pour une classe, 40 € par classe supplémentaire) et durée de protection de 10 ans renouvelable.",
        "Preuve : barème et fiche INPI datés. Action : ajout d'un atelier « Protéger son nom commercial et sa marque » (recherche d'antériorité en direct, réservation du nom de domaine et des comptes sociaux) au module Lancement."
      ],
      [
        `<a href="https://entreprendre.service-public.fr/vosdroits/F22421">Service-Public – Assurances professionnelles</a>`,
        "Assurances obligatoires et recommandées du chef d'entreprise",
        veilleMonthYear(f, 2),
        "Recensement des obligations selon l'activité : responsabilité civile professionnelle, garantie décennale pour le bâtiment, assurance des véhicules professionnels, multirisque des locaux, prévoyance et mutuelle du dirigeant.",
        "Preuve : fiche officielle archivée. Action : mise à jour de la check-list « Prêt à démarrer » remise en fin de parcours et de l'exercice d'identification des risques par secteur d'activité du projet de chaque stagiaire."
      ],
    ];
  }


  if (type === "fle") {
    return [...common,
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901294">Légifrance – Art. L.6321-1 Code du travail</a>`,
        "Obligation de formation des salariés – adaptation au poste de travail",
        veilleDate(f, 5),
        "L'employeur doit assurer l'adaptation des salariés à leur poste, y compris la maîtrise du français professionnel dans les métiers du social et médico-social.",
        "Preuve: Extrait code du travail. Action: Intégrer cette obligation dans le programme FLE professionnel pour justifier le besoin de formation linguistique."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-droit-formation/actualites-droit/cpf-hausse-du-montant-de-la-participation-forfaitaire">Centre Inffo – CPF</a>`,
        "CPF : Hausse du montant de la participation forfaitaire",
        veilleDate(f, 3),
        "La participation financière obligatoire pour l'achat d'une formation mobilisant le CPF s'élève à 103,20 euros.",
        "Preuve: Informer les futurs apprenants de la hausse du ticket modérateur. Sauf pour les personnes au chômage ou financées par les employeurs."
      ],
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033862420">Légifrance – Art. L.1321-6 Code du travail</a>`,
        "Maîtrise du français en milieu professionnel – obligation de l'employeur",
        veilleDate(f, 2),
        "Le règlement intérieur doit être rédigé en français. Les salariés doivent pouvoir comprendre les consignes de sécurité et les protocoles dans leur langue de travail.",
        "Preuve: Article de loi. Action: Adapter le programme de formation FLE aux exigences de compréhension des documents professionnels (protocoles, transmissions)."
      ],
    ];
  }

  if (type === "ia") {
    return [...common,
      [
        `<a href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049757543">Légifrance – Règlement IA européen (AI Act)</a>`,
        "Règlement (UE) 2024/1689 — Intelligence artificielle",
        veilleDate(f, 5),
        "Cadre réglementaire européen sur l'IA : classification des risques, obligations de transparence, interdictions. Applicable progressivement à partir de 2025.",
        "Preuve: Texte du règlement + synthèse interne. Action: Intégrer les obligations de transparence et d'éthique IA dans le programme de formation."
      ],
      [
        `<a href="https://www.cnil.fr/fr/intelligence-artificielle/plan-daction-pour-une-ia-innovante-et-respectueuse-de-la-vie-privee">CNIL – Plan d'action IA</a>`,
        "CNIL – Plan d'action pour une IA respectueuse de la vie privée",
        veilleDate(f, 4),
        "Recommandations de la CNIL sur l'usage de l'IA et la protection des données personnelles (RGPD appliqué à l'IA générative).",
        "Preuve: Publication CNIL. Action: Module sur le respect du RGPD dans l'utilisation de l'IA générative (données personnelles, droit à l'image)."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-droit-formation/actualites-droit/cpf-hausse-du-montant-de-la-participation-forfaitaire">Centre Inffo – CPF</a>`,
        "CPF : Hausse du montant de la participation forfaitaire",
        veilleDate(f, 3),
        "La participation financière obligatoire pour l'achat d'une formation mobilisant le CPF s'élève à 103,20 euros.",
        "Preuve: Informer les futurs apprenants de la hausse du ticket modérateur."
      ],
    ];
  }

  if (type === "commercial") {
    const yr = veilleYear(f, 0);
    const yrPrev = veilleYear(f, 12);
    return [
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006904070">Légifrance – Art. L6316-1</a>`,
        "Article L6316-1 du Code du travail (Qualité des actions de formation)",
        `Version en vigueur ${yrPrev}`,
        "Définit l'obligation de certification Qualiopi pour les prestataires de formation souhaitant accéder aux fonds publics ou mutualisés",
        "Vérification annuelle du maintien de la certification Qualiopi + mise à jour des procédures internes. Nous avons préparé l'audit de surveillance."
      ],
      [
        `<a href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049757543">Légifrance – Contrôles OF</a>`,
        "Renforcement des contrôles des organismes de formation",
        yrPrev,
        "Accentuation des contrôles, lutte contre la fraude",
        "Mise en place d'un système de traçabilité renforcé (émargements, mails)"
      ],
      [
        `<a href="https://www.francecompetences.fr/">France Compétences – Certifications RS</a>`,
        "Réforme des certifications RS",
        yrPrev,
        "Renforcement des exigences d'enregistrement et de renouvellement",
        "Vérification de la demande des certifications RS"
      ],
      [
        `<a href="https://www.moncompteformation.gouv.fr/">Mon Compte Formation – CPF</a>`,
        "Décret relatif au CPF et à la régulation des formations",
        yrPrev,
        "Encadrement plus strict des pratiques commerciales CPF",
        "En attente de validation du RS pour pouvoir faire la demande du EDOF"
      ],
      [
        `<a href="https://grand-est.dreets.gouv.fr/Le-controle-de-la-formation-professionnelle-17841">DREETS – Contrôle formation pro</a>`,
        "Contrôle des organismes de formation",
        yrPrev,
        "Précise les modalités de contrôle administratif et financier",
        "Préparation dossier conformité (conventions, factures, preuves d'exécution)"
      ],
      [
        `<a href="https://of.moncompteformation.gouv.fr/espace-public/actualites/loi-de-finances-2026-les-evolutions-concernant-le-cpfv">MCF – Loi de finances</a>`,
        "Évolutions financement formation professionnelle",
        yr,
        "Ajustements des financements OPCO et CPF",
        "Adaptation des offres de formation aux priorités de financement"
      ],
    ];
  }

  if (type === "webmarketing") {
    const yr = veilleYear(f, 0);
    const yrPrev = veilleYear(f, 12);
    return [
      ...common,
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006904070">Légifrance – Art. L6316-1</a>`,
        "Article L6316-1 du Code du travail (Qualité des actions de formation)",
        `Version en vigueur ${yrPrev}`,
        "Obligation de certification Qualiopi pour les prestataires de formation souhaitant accéder aux fonds publics ou mutualisés.",
        "Vérification annuelle du maintien de la certification + mise à jour procédures internes."
      ],
      [
        `<a href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees">CNIL – RGPD</a>`,
        "RGPD – Règlement général sur la protection des données",
        veilleDate(f, 8),
        "Cadre réglementaire sur la collecte et le traitement des données personnelles. Impact direct sur les pratiques d'email marketing, tracking web (cookies, pixels), ciblage publicitaire et gestion des bases CRM.",
        "Preuve : synthèse RGPD + checklist conformité. Action : intégrer un module RGPD dans la formation (mentions légales, consentement, opt-in, politique de confidentialité)."
      ],
      [
        `<a href="https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/pratiques-commerciales-trompeuses">DGCCRF – Pratiques commerciales</a>`,
        "Réglementation des pratiques commerciales sur Internet",
        veilleDate(f, 6),
        "Encadrement des publicités en ligne, mentions obligatoires, interdiction des pratiques trompeuses (faux avis, prix barrés abusifs, influenceurs).",
        "Preuve : fiche DGCCRF. Action : module sur les obligations légales de la publicité en ligne et des partenariats influenceurs."
      ],
      [
        `<a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies">CNIL – Cookies et traceurs</a>`,
        "CNIL – Lignes directrices cookies et traceurs",
        veilleDate(f, 5),
        "Encadrement de l'utilisation des cookies, pixels de suivi et traceurs publicitaires (Meta Pixel, Google Analytics). Obligation de consentement préalable.",
        "Preuve : publication CNIL. Action : enseigner la mise en conformité cookies dans le module Analytics (bandeau cookie, Google Consent Mode)."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-droit-formation/actualites-droit/cpf-hausse-du-montant-de-la-participation-forfaitaire">Centre Inffo – CPF</a>`,
        "CPF : Hausse du montant de la participation forfaitaire",
        veilleDate(f, 3),
        "La participation financière pour l'achat d'une formation CPF s'élève à 103,20 euros. Impact sur le financement des formations marketing digital.",
        "Preuve : article Centre Inffo. Action : informer les futurs stagiaires de la hausse du reste à charge CPF."
      ],
    ];
  }

  if (type === "crm") {
    const yr = veilleYear(f, 0);
    const yrPrev = veilleYear(f, 12);
    return [
      ...common,
      [
        `<a href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees">CNIL – RGPD</a>`,
        "RGPD – Règlement général sur la protection des données",
        veilleDate(f, 8),
        "Cadre réglementaire majeur pour les CRM : collecte de données, consentement, droit d'accès/suppression, DPA avec les sous-traitants (HubSpot, Brevo, etc.).",
        "Preuve : synthèse RGPD + checklist. Action : module RGPD obligatoire dans la formation CRM (registre des traitements, base légale, durée de conservation)."
      ],
      [
        `<a href="https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique">CNIL – Prospection commerciale</a>`,
        "CNIL – Prospection commerciale par email",
        veilleDate(f, 6),
        "Encadrement strict de la prospection B2C (opt-in obligatoire) et B2B (opt-out). Règles spécifiques pour les séquences d'email automation.",
        "Preuve : publication CNIL. Action : intégrer les règles de prospection dans le module email marketing (distinction B2B/B2C, désinscription, mentions légales)."
      ],
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006904070">Légifrance – Art. L6316-1</a>`,
        "Article L6316-1 du Code du travail (Qualité des actions de formation)",
        `Version en vigueur ${yrPrev}`,
        "Obligation de certification Qualiopi pour les prestataires souhaitant accéder aux fonds publics ou mutualisés.",
        "Vérification annuelle du maintien de la certification + mise à jour des procédures internes."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-droit-formation/actualites-droit/cpf-hausse-du-montant-de-la-participation-forfaitaire">Centre Inffo – CPF</a>`,
        "CPF : Hausse du montant de la participation forfaitaire",
        veilleDate(f, 3),
        "La participation financière pour l'achat d'une formation CPF s'élève à 103,20 euros.",
        "Preuve : article Centre Inffo. Action : informer les futurs stagiaires du reste à charge CPF."
      ],
    ];
  }

  if (type === "anglais") {
    const isVTest = f.intitule.toLowerCase().includes("vtest") || f.intitule.toLowerCase().includes("v-test") || f.intitule.toLowerCase().includes("rs6905");
    const vtestReglEntries: string[][] = isVTest ? [
      [
        `<a href="https://www.francecompetences.fr/recherche/rs/6905/">France Compétences – RS6905</a>`,
        "Enregistrement RS6905 – VTest Business English – 4 Skills (ExAssess)",
        veilleDate(f, 6),
        "Certification enregistrée au Répertoire Spécifique sous le code RS6905 par ExAssess (Burlington English). Validité : 20/07/2023 au 20/07/2026. Évalue les 4 compétences linguistiques (C1 à C4) du niveau A2 au C2 CECRL.",
        "Preuve : fiche France Compétences RS6905. Action : vérifier la validité de la certification et adapter le programme aux compétences du référentiel."
      ],
    ] : [];
    return [...common,
      ...vtestReglEntries,
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901294">Légifrance – Art. L.6321-1 Code du travail</a>`,
        "Obligation de formation des salariés – adaptation au poste et compétences linguistiques",
        veilleDate(f, 5),
        "L'employeur doit assurer l'adaptation des salariés à leur poste de travail. Les compétences en anglais sont essentielles dans un contexte professionnel internationalisé.",
        "Preuve : extrait du Code du travail. Action : justifier la formation anglais comme compétence professionnelle d'adaptation au poste."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-droit-formation/actualites-droit/cpf-hausse-du-montant-de-la-participation-forfaitaire">Centre Inffo – CPF</a>`,
        "CPF : Hausse du montant de la participation forfaitaire",
        veilleDate(f, 3),
        "La participation financière pour l'achat d'une formation CPF s'élève à 103,20 euros. Impact direct sur les inscriptions en formation langue.",
        "Preuve : article Centre Inffo. Action : informer les futurs stagiaires du ticket modérateur CPF."
      ],
      [
        `<a href="https://www.europe-education-formation.fr/erasmus-plus-formation.php">Erasmus+ Formation Professionnelle</a>`,
        "Erasmus+ – Mobilité et formation linguistique en Europe",
        veilleDate(f, 2),
        "Programme européen soutenant la mobilité professionnelle et l'apprentissage des langues. Financements disponibles pour les organismes certifiés.",
        "Preuve : site Erasmus+. Action : explorer les financements Erasmus+ pour les parcours de formation en anglais et enrichir l'offre."
      ],
    ];
  }

  if (type === "massage" || type === "esthetique") {
    return [...common,
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006912284">Légifrance – Art. L1110-4 Code de la santé publique</a>`,
        "Respect de la vie privée et secret professionnel dans le secteur du bien-être",
        veilleDate(f, 5),
        "Obligation de respecter la vie privée et le secret professionnel pour les praticiens du bien-être et du massage. Encadrement de la relation praticien-client.",
        "Preuve : extrait du Code de la santé publique. Action : intégrer un module sur l'éthique et la déontologie dans la formation massage."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-droit-formation/actualites-droit/cpf-hausse-du-montant-de-la-participation-forfaitaire">Centre Inffo – CPF</a>`,
        "CPF : Hausse du montant de la participation forfaitaire",
        veilleDate(f, 3),
        "La participation financière obligatoire pour l'achat d'une formation CPF s'élève à 103,20 euros.",
        "Preuve : article Centre Inffo. Action : informer les futurs stagiaires du reste à charge CPF."
      ],
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006910978">Légifrance – Art. R4127-39 Code de la santé publique</a>`,
        "Encadrement des pratiques de bien-être et distinction avec les actes médicaux",
        veilleDate(f, 2),
        "Distinction entre massage de bien-être et massage thérapeutique (kinésithérapie). Les praticiens en massage prénatal doivent connaître les limites de leur exercice.",
        "Preuve : texte réglementaire. Action : clarifier dans le programme les contre-indications et le périmètre d'intervention du praticien bien-être."
      ],
    ];
  }

  if (type === "management") {
    return [...common,
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901294">Légifrance – Art. L.6321-1 Code du travail</a>`,
        "Obligation de formation des salariés – Développement des compétences managériales",
        veilleDate(f, 5),
        "L'employeur assure l'adaptation des salariés à leur poste. La montée en compétences managériales est un levier clé de la politique RH.",
        "Preuve : extrait Code du travail. Action : intégrer les obligations légales dans le module management des ressources humaines."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-droit-formation/actualites-droit/cpf-hausse-du-montant-de-la-participation-forfaitaire">Centre Inffo – CPF</a>`,
        "CPF : Hausse du montant de la participation forfaitaire",
        veilleDate(f, 3),
        "Participation financière obligatoire pour les formations CPF. Impact sur les formations en management et leadership.",
        "Preuve : article Centre Inffo. Action : informer les futurs stagiaires managers du reste à charge."
      ],
    ];
  }

  if (type === "secretaire") {
    return [...common,
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006912284">Légifrance – Art. L1110-4 CSP</a>`,
        "Secret médical et confidentialité des données de santé",
        veilleDate(f, 5),
        "Obligation de secret professionnel pour les secrétaires médico-administratifs. Encadrement strict de l'accès aux données de santé (DPI, courriers médicaux).",
        "Preuve : Code de la santé publique. Action : module sur le secret médical et la gestion sécurisée des dossiers patients."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-droit-formation/actualites-droit/cpf-hausse-du-montant-de-la-participation-forfaitaire">Centre Inffo – CPF</a>`,
        "CPF : Hausse du montant de la participation forfaitaire",
        veilleDate(f, 3),
        "Participation financière CPF de 103,20 euros. Impact sur les formations secrétariat médical.",
        "Preuve : article Centre Inffo. Action : informer les stagiaires du reste à charge CPF."
      ],
    ];
  }

  if (type === "vtc") {
    return [...common,
      [
        `<a href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000035419744/">Légifrance – Arrêté du 11/08/2017</a>`,
        "Arrêté du 11 août 2017 modifié relatif à l'examen pour l'obtention de la carte professionnelle VTC",
        veilleDate(f, 8),
        "Définit les épreuves d'examen VTC : 5 épreuves communes T3P (réglementation, gestion, sécurité routière, secourisme, français) + 2 épreuves spécifiques VTC + 1 épreuve d'admission pratique. Note ≥ 10/20 sans note < 6/20.",
        "Preuve : arrêté consolidé + référentiel d'évaluation CMA. Action : aligner intégralement le programme sur les 8 épreuves et les modalités d'évaluation."
      ],
      [
        `<a href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000029434679/">Légifrance – Loi Thévenoud</a>`,
        "Loi n° 2014-1104 du 1er octobre 2014 relative aux taxis et VTC",
        veilleDate(f, 7),
        "Cadre juridique fondateur du VTC : distinction Taxi/VTC, interdiction de la maraude, obligation de réservation préalable, retour à la base après course, registre national VTC.",
        "Preuve : version consolidée. Action : module dédié sur les obligations spécifiques VTC vs Taxi (épreuve spécifique 1)."
      ],
      [
        `<a href="https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000023086525/LEGISCTA000028538027/">Légifrance – Code des transports L3122</a>`,
        "Code des transports – Articles L3122-1 à L3122-12 (VTC)",
        veilleDate(f, 6),
        "Réglementation VTC : conditions d'exercice, signalétique (macaron rouge), tarification libre, obligations du conducteur, sanctions pénales en cas d'infraction.",
        "Preuve : extrait du code. Action : intégrer les sanctions et le contrôle (DREAL, police) dans le module réglementation."
      ],
      [
        `<a href="https://www.cma-france.fr/examen-vtc">CMA France – Examen VTC</a>`,
        "CMA France – Modalités officielles de l'examen VTC (certificateur RS5637)",
        veilleDate(f, 5),
        "Calendrier des sessions, droits d'inscription (221€), centres d'examen, programme officiel des 8 épreuves, taux de réussite national.",
        "Preuve : page CMA + convocations stagiaires. Action : informer les stagiaires des dates de sessions et préparer aux modalités exactes."
      ],
      [
        `<a href="https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006074228/LEGISCTA000006159515/">Légifrance – Code de la route</a>`,
        "Code de la route – Évolutions applicables aux conducteurs professionnels",
        veilleDate(f, 4),
        "Évolutions du Code de la route : abaissement vitesses, ZFE-m (Zones à Faibles Émissions mobilité), permis à points, alcoolémie professionnelle (0,2 g/L pour transport public).",
        "Preuve : textes consolidés. Action : actualiser le module sécurité routière avec les ZFE-m (impact direct sur l'activité VTC en agglomération)."
      ],
      [
        `<a href="https://www.economie.gouv.fr/entreprises/auto-entrepreneur-creation">economie.gouv.fr – Micro-entrepreneur</a>`,
        "Statut micro-entrepreneur – Plafonds et obligations 2025 pour VTC",
        veilleMonthYear(f, 3),
        "Plafond CA micro-BIC services : 77 700€ (2025). TVA franchise en base sous 36 800€. Cotisations URSSAF 21,2% pour prestations de services. Obligations comptables simplifiées.",
        "Preuve : page officielle. Action : module gestion d'entreprise actualisé avec les plafonds en vigueur."
      ],
    ];
  }

  if (type === "ecsr") {
    return [...common,
      [
        `<a href="https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006074228/LEGISCTA000006159515/">Légifrance – Code de la route</a>`,
        "Code de la route – Réglementation de l'enseignement de la conduite",
        veilleDate(f, 6),
        "Encadrement réglementaire des écoles de conduite et des enseignants : agrément, programme de formation, conditions d'exercice. Évolutions du permis de conduire.",
        "Preuve : textes réglementaires + synthèse. Action : mettre à jour les modules pédagogiques selon les évolutions du Code de la route."
      ],
      [
        `<a href="https://www.securite-routiere.gouv.fr/">Sécurité Routière – Actualités</a>`,
        "Délégation à la Sécurité Routière – Réglementation et prévention",
        veilleDate(f, 5),
        "Actualités réglementaires : nouvelles mesures de sécurité routière, évolutions des sanctions, campagnes de prévention, réforme du permis.",
        "Preuve : publications officielles. Action : intégrer les nouvelles mesures dans le programme de sensibilisation à la sécurité routière."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-droit-formation/actualites-droit/cpf-hausse-du-montant-de-la-participation-forfaitaire">Centre Inffo – CPF</a>`,
        "CPF : Hausse du montant de la participation forfaitaire",
        veilleDate(f, 3),
        "Participation financière obligatoire CPF de 103,20 euros. Impact sur les formations ECSR financées par le CPF.",
        "Preuve : article Centre Inffo. Action : informer les futurs stagiaires ECSR du reste à charge CPF."
      ],
      [
        `<a href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044465890">Légifrance – Arrêté REAC ECSR</a>`,
        "Arrêté relatif au titre professionnel ECSR (RNCP 35329)",
        veilleDate(f, 4),
        "Référentiel Emploi Activités Compétences du titre professionnel Enseignant de la Conduite et de la Sécurité Routière. 2 CCP : formation à la conduite et sensibilisation à la sécurité routière.",
        "Preuve : REAC officiel. Action : vérifier l'alignement du programme sur les 2 CCP et les compétences du REAC."
      ],
    ];
  }

  // Default: word/bureautique
  return [...common,
    [
      `<a href="https://www.francecompetences.fr/recherche/rs/6159/">France Compétences – RS6159 ICDL</a>`,
      "Certification ICDL – Traitement de texte (Word)",
      veilleDate(f, 6),
      "La certification ICDL (ex-PCIE) est enregistrée au Répertoire Spécifique. Elle valide les compétences en traitement de texte (Word) selon un référentiel international reconnu par les employeurs.",
      "Preuve : fiche France Compétences RS6159 + référentiel ICDL. Action : aligner le programme de formation Word sur les compétences du référentiel ICDL (mise en forme, tableaux, publipostage, styles)."
    ],
    [
      `<a href="https://www.dendreo.com/blog/veille-legale-et-reglementaire-de-la-formation-professionnelle-recap-des-actualites-2025">Dendreo – Décret RNCP/RS</a>`,
      "Modification des critères d'enregistrement au RNCP et au RS",
      veilleDate(f, 5),
      "Décret — Obligation d'intégrer dans les référentiels les compétences liées aux transitions écologique et numérique. Impact direct sur les certifications bureautiques.",
      "Preuve : version consolidée du décret. Action : nous nous sommes rapprochés du certificateur ICDL pour vérifier la conformité de notre formation Word."
    ],
    [
      `<a href="https://www.centre-inffo.fr/site-droit-formation/actualites-droit/cpf-hausse-du-montant-de-la-participation-forfaitaire">Centre Inffo – CPF</a>`,
      "CPF : Hausse du montant de la participation forfaitaire",
      veilleDate(f, 3),
      "La participation financière obligatoire pour l'achat d'une formation CPF s'élève à 103,20 euros. Impact sur les inscriptions en formation bureautique Word.",
      "Preuve : article Centre Inffo. Action : informer les futurs stagiaires du reste à charge CPF pour leur formation Word."
    ],
  ];
}

export function genVeilleReglementaireV2(o: OrganismeInfo, f: FormationInfo) {
  const type = detectFormationType(f);
  const aiPack = getCachedVeillePack(f);
  const curated = isTypeExplicit(f, type) ? veilleReglementaireRows(f, type) : [];
  const rows = aiPack?.reglementaire?.length
    ? veilleRowsToTable(aiPack.reglementaire)
    : (curated.length ? curated : genericVeilleRows(f, "reglementaire"));
  return buildDocument({ org: o, title: "Veille réglementaire", table: {
    headers: ["Liens", "Nom de l'article / Texte", "Date du texte", "Commentaire", "Exploitation de veille (preuve + action Qualiopi)"],
    rows,
  } });
}

// ===== IND 24 — TABLEAU DE VEILLE MÉTIER =====

function veilleMetierRows(f: FormationInfo, type: FormationType): string[][] {
  if (type === "creation") {
    return [
      [
        `<a href="https://bpifrance-creation.fr/moment-de-vie/etude-marche">Bpifrance Création – Étude de marché</a>`,
        "Méthodologie de l'étude de marché pour un porteur de projet",
        veilleMonthYear(f, 8),
        "Méthode complète en quatre temps : analyse du secteur et de ses tendances, segmentation de la clientèle et construction de personas, analyse concurrentielle (directe, indirecte, substituts) puis dimensionnement du chiffre d'affaires prévisionnel selon les méthodes des intentions d'achat, des références et des capacités.",
        "Preuve : guide méthodologique daté et archivé. Action : refonte de la trame « Étude de marché » remise aux stagiaires et de l'exercice de calcul du CA prévisionnel en trois hypothèses (basse, médiane, haute)."
      ],
      [
        `<a href="https://www.insee.fr/fr/statistiques?theme=25">INSEE – Démographie des entreprises</a>`,
        "Créations d'entreprises en France : statistiques mensuelles et annuelles",
        veilleMonthYear(f, 2),
        "Volumes de créations par secteur d'activité, par forme juridique et par région, part des micro-entrepreneurs, taux de pérennité à 3 et 5 ans. Ces séries permettent d'objectiver le potentiel d'un marché et de relativiser les hypothèses de chiffre d'affaires d'un créateur.",
        "Preuve : export des séries INSEE daté. Action : chiffres intégrés dans le module « Étude de marché » et dans les cas pratiques régionaux ; les stagiaires citent au moins une source statistique officielle dans leur dossier de projet."
      ],
      [
        `<a href="https://www.bpifrance-creation.fr/entrepreneur/observatoire-creation-entreprise">Observatoire de la création d'entreprise</a>`,
        "Profil des créateurs et taux de pérennité des jeunes entreprises",
        veilleMonthYear(f, 6),
        "Analyse du profil des créateurs (âge, situation avant création, niveau de formation, apport initial) et des facteurs de pérennité : préparation du projet, accompagnement, montant des fonds propres, expérience du secteur.",
        "Preuve : étude archivée. Action : séquence d'ouverture « Facteurs de réussite et causes d'échec » appuyée sur des données réelles, et renforcement du volet accompagnement post-création du parcours."
      ],
      [
        `<a href="https://www.initiative-france.fr/">Initiative France</a>`,
        "Prêts d'honneur et accompagnement des créateurs",
        veilleMonthYear(f, 5),
        "Premier réseau associatif de financement des créateurs : prêt d'honneur à taux zéro sans garantie, effet de levier bancaire moyen constaté, parrainage par un chef d'entreprise et suivi sur les trois premières années.",
        "Preuve : fiche réseau et coordonnées de la plateforme locale. Action : orientation systématique des stagiaires en fin de parcours (suite de parcours) et invitation d'un chargé de mission lors de la dernière séquence."
      ],
      [
        `<a href="https://www.reseau-entreprendre.org/">Réseau Entreprendre</a>`,
        "Accompagnement des créateurs d'entreprise à potentiel de création d'emplois",
        veilleMonthYear(f, 7),
        "Critères de sélection des lauréats, accompagnement individuel par des chefs d'entreprise en activité, prêt d'honneur et intégration à un réseau de pairs pendant deux à trois ans.",
        "Preuve : plaquette du réseau archivée. Action : présentation des relais d'accompagnement lors du module « Après la formation » et remise d'un annuaire local des réseaux."
      ],
      [
        `<a href="https://www.adie.org/">ADIE – Microcrédit professionnel</a>`,
        "Financement des créateurs exclus du crédit bancaire classique",
        veilleMonthYear(f, 4),
        "Microcrédit professionnel jusqu'à 12 000 €, prêt d'honneur complémentaire et accompagnement gratuit avant et après la création, notamment pour les demandeurs d'emploi et les bénéficiaires de minima sociaux.",
        "Preuve : conditions d'octroi archivées. Action : ajout d'une fiche « Financer un projet sans apport » au support et orientation des stagiaires concernés vers l'antenne départementale."
      ],
      [
        `<a href="https://www.cci.fr/ressources/creation-entreprise">CCI France</a>`,
        "Accompagnement CCI et CMA : de l'idée à l'immatriculation",
        veilleMonthYear(f, 6),
        "Offre des chambres consulaires : ateliers d'information, permanences juridiques, stage de préparation à l'installation pour les artisans, suivi post-création et mise en relation avec les réseaux économiques locaux.",
        "Preuve : programme des ateliers CCI/CMA daté. Action : partenariat local mentionné dans le livret d'accueil et le catalogue, calendrier des ateliers remis en fin de formation."
      ],
      [
        `<a href="https://www.francetravail.fr/candidat/mes-droits-aux-aides-et-allocations/creer-ou-reprendre-une-entreprise.html">France Travail – Créer son entreprise</a>`,
        "Maintien de l'ARE, ARCE et accompagnement des demandeurs d'emploi créateurs",
        veilleMonthYear(f, 3),
        "Règles de cumul entre allocation d'aide au retour à l'emploi et revenus d'activité non salariée, alternative du versement en capital (ARCE), obligations déclaratives mensuelles et impact sur la durée d'indemnisation.",
        "Preuve : fiche France Travail datée. Action : simulation comparative « maintien ARE vs ARCE » ajoutée aux exercices financiers, très attendue par le public demandeur d'emploi du parcours."
      ],
      [
        `<a href="https://www.les-aides.fr/">Les-aides.fr (CCI)</a>`,
        "Base nationale des aides publiques aux entreprises",
        veilleMonthYear(f, 2),
        "Recensement actualisé des dispositifs nationaux, régionaux et locaux mobilisables par les créateurs : subventions, prêts, exonérations, garanties et accompagnements sectoriels.",
        "Preuve : recherches datées par région et par secteur. Action : mise à jour du tableau des aides remis en formation et exercice de recherche personnalisée par chaque stagiaire sur son propre projet."
      ],
    ];
  }


  if (type === "fle") {
    return [
      [
        `<a href="https://www.fle.fr/">fle.fr</a>`,
        "Le français langue étrangère – Portail du FLE",
        veilleMonthYear(f, 8),
        "Portail de référence du FLE : actualités, offres de formation, ressources pédagogiques pour l'enseignement du français aux non-francophones.",
        "Preuve : capture écran + lien. Action : veille sur les évolutions pédagogiques FLE et nouveaux supports disponibles."
      ],
      [
        `<a href="https://www.cavilam.com/">cavilam.com – Alliance française Vichy</a>`,
        "CAVILAM – Alliance française : innovations pédagogiques FLE",
        veilleMonthYear(f, 7),
        "Centre de référence en FLE proposant des formations de formateurs et des ressources pédagogiques innovantes (approche actionnelle, numérique).",
        "Action Qualiopi : adapter les méthodes pédagogiques aux dernières approches recommandées par les experts FLE."
      ],
      [
        `<a href="https://www.has-sante.fr/jcms/p_3085043/fr/la-bientraitance-et-le-soutien-a-domicile">HAS – Bientraitance</a>`,
        "HAS – Recommandations de bientraitance dans le secteur médico-social",
        veilleYear(f, 6),
        "Référence sectorielle essentielle : les professionnels du social et médico-social doivent comprendre et communiquer autour des protocoles de bientraitance.",
        "Action : intégrer le vocabulaire de la bientraitance et les protocoles HAS dans les exercices de communication FLE."
      ],
      [
        `<a href="https://solidarites.gouv.fr/le-travail-social">Ministère des Solidarités – Travail social</a>`,
        "Travail social en France – orientations et métiers",
        veilleMonthYear(f, 4),
        "Présentation des métiers du social et du médico-social : aide-soignant, AES, moniteur-éducateur. Contexte de pénurie de main-d'œuvre qualifiée.",
        "Preuve : captures + notes. Action : adapter le contenu FLE aux fiches métiers du social (vocabulaire, situations professionnelles réelles)."
      ],
      [
        `<a href="https://www.france-terre-asile.org/">france-terre-asile.org</a>`,
        "France terre d'asile – Insertion et formation linguistique",
        veilleMonthYear(f, 3),
        "Association de référence sur l'accueil et l'insertion des personnes réfugiées : parcours d'intégration linguistique et professionnelle.",
        "Action Qualiopi : prise en compte des publics allophones dans la conception pédagogique et l'accompagnement (critère 2)."
      ],
      [
        `<a href="https://www.youtube.com/watch?v=eVUxaR4aI1U">YouTube – FLE en milieu professionnel</a>`,
        "Enseigner le FLE en milieu professionnel – retour d'expérience",
        veilleYear(f, 2),
        "Vidéo de partage d'expérience sur l'enseignement du français professionnel dans les secteurs du soin et de l'accompagnement social.",
        "Preuve : fiche synthèse vidéo. Action : enrichir les mises en situation professionnelles (transmissions, accueil usagers)."
      ],
    ];
  }

  if (type === "ia") {
    return [
      [
        `<a href="https://www.blogdumoderateur.com/dossier/intelligence-artificielle/">blogdumoderateur.com</a>`,
        "Blog du Modérateur – Dossier Intelligence Artificielle",
        veilleMonthYear(f, 8),
        "Veille complète sur les outils IA : ChatGPT, Midjourney, DALL-E, Copilot. Usages professionnels pour la création de contenus rédactionnels et visuels.",
        "Preuve : capture écran + lien. Action : mise à jour des outils présentés dans la formation selon les dernières versions disponibles."
      ],
      [
        `<a href="https://openai.com/blog">OpenAI Blog</a>`,
        "OpenAI – Actualités et mises à jour ChatGPT / GPT-4",
        veilleMonthYear(f, 7),
        "Blog officiel d'OpenAI : nouvelles fonctionnalités ChatGPT, GPT-4o, DALL-E 3, améliorations du prompt engineering.",
        "Action Qualiopi : adapter les exercices de prompt engineering aux dernières versions des modèles (critère 6 – amélioration continue)."
      ],
      [
        `<a href="https://www.midjourney.com/">midjourney.com</a>`,
        "Midjourney – Génération d'images par IA",
        veilleYear(f, 6),
        "Outil majeur de génération d'images par IA. Évolution rapide des modèles (v5, v6) avec qualité photographique et styles artistiques.",
        "Action : mise à jour du module création visuelle avec les nouvelles commandes et paramètres Midjourney."
      ],
      [
        `<a href="https://www.canva.com/ai-image-generator/">Canva – IA intégrée</a>`,
        "Canva – Générateur d'images et textes par IA",
        veilleMonthYear(f, 4),
        "Intégration de l'IA générative dans Canva : génération de visuels, reformulation de textes, templates automatisés.",
        "Preuve : captures fonctionnalités. Action : intégrer Canva IA comme outil complémentaire dans les exercices pratiques."
      ],
      [
        `<a href="https://www.youtube.com/watch?v=aircAruvnKk">YouTube – 3Blue1Brown Neural Networks</a>`,
        "3Blue1Brown – Comment fonctionne une IA (vulgarisation)",
        veilleYear(f, 5),
        "Vidéo de vulgarisation sur le fonctionnement des réseaux de neurones, essentiel pour comprendre les fondements de l'IA générative.",
        "Preuve : fiche synthèse vidéo. Action : inclure ces ressources pédagogiques dans le module d'introduction à l'IA."
      ],
      [
        `<a href="https://www.france-num.gouv.fr/guides-et-conseils/strategie-numerique/intelligence-artificielle">France Num – IA pour les TPE/PME</a>`,
        "France Num – Guide IA pour les entreprises",
        veilleMonthYear(f, 3),
        "Guide gouvernemental sur l'adoption de l'IA par les TPE/PME : usages concrets, outils recommandés, bonnes pratiques.",
        "Action Qualiopi : aligner les cas pratiques de la formation sur les usages IA recommandés par France Num."
      ],
    ];
  }

  if (type === "webmarketing") {
    return [
      [
        `<a href="https://www.blogdumoderateur.com/dossier/social-media/">blogdumoderateur.com</a>`,
        "Blog du Modérateur – Dossier Social Media",
        veilleMonthYear(f, 8),
        "Veille complète sur les réseaux sociaux : nouvelles fonctionnalités Instagram, LinkedIn, TikTok, évolutions algorithmiques, tendances de contenu.",
        "Preuve : capture + lien. Action : mise à jour des modules réseaux sociaux selon les dernières fonctionnalités (carrousels LinkedIn, Reels Instagram, TikTok Shop)."
      ],
      [
        `<a href="https://www.hubspot.fr/blog">HubSpot Blog France</a>`,
        "HubSpot – Tendances marketing digital et inbound marketing",
        veilleMonthYear(f, 7),
        "Blog de référence sur le marketing digital : SEO, content marketing, email marketing, tunnels de vente, automation. Études de cas et statistiques actualisées.",
        "Action Qualiopi : aligner les cas pratiques sur les dernières tendances inbound marketing et les benchmarks HubSpot."
      ],
      [
        `<a href="https://www.semrush.com/blog/">SEMrush Blog</a>`,
        "SEMrush – Études SEO et marketing de contenu",
        veilleYear(f, 6),
        "Publications d'études et rapports sur l'état du SEO, les tendances de recherche, et les meilleures pratiques de content marketing.",
        "Preuve : rapport annuel SEMrush. Action : mise à jour du module SEO avec les dernières données de positionnement et les bonnes pratiques."
      ],
      [
        `<a href="https://www.socialmediatoday.com/">Social Media Today</a>`,
        "Social Media Today – Actualités réseaux sociaux",
        veilleMonthYear(f, 5),
        "Source internationale sur les évolutions des plateformes sociales : changements d'algorithme, nouvelles fonctionnalités, études d'engagement.",
        "Action : adaptation des stratégies de publication et des formats de contenu enseignés selon les évolutions algorithmiques."
      ],
      [
        `<a href="https://www.france-num.gouv.fr/guides-et-conseils/communication-et-publicite/reseaux-sociaux">France Num – Réseaux sociaux TPE/PME</a>`,
        "France Num – Guide réseaux sociaux pour les entreprises",
        veilleMonthYear(f, 4),
        "Guide gouvernemental sur l'utilisation des réseaux sociaux par les TPE/PME : stratégie, bonnes pratiques, retours d'expérience.",
        "Preuve : guide PDF France Num. Action Qualiopi : aligner les exercices sur les usages recommandés pour les entrepreneurs et indépendants."
      ],
      [
        `<a href="https://www.meta.com/fr/blog/">Meta – Blog actualités</a>`,
        "Meta – Nouvelles fonctionnalités Facebook, Instagram, Threads",
        veilleMonthYear(f, 3),
        "Annonces officielles Meta : évolutions publicitaires (Meta Ads), nouveaux formats, intelligence artificielle intégrée aux outils créateurs.",
        "Preuve : captures annonces. Action : mise à jour du module publicité en ligne (Facebook Ads, Instagram Ads) avec les nouvelles options de ciblage."
      ],
    ];
  }

  if (type === "crm") {
    return [
      [
        `<a href="https://www.hubspot.fr/blog">HubSpot Blog France</a>`,
        "HubSpot – Tendances CRM et automation marketing",
        veilleMonthYear(f, 8),
        "Blog de référence sur le CRM, l'automation marketing et les tunnels de vente. Études de cas, guides pratiques et benchmarks sectoriels.",
        "Preuve : capture + lien. Action : mise à jour des workflows et cas pratiques selon les nouvelles fonctionnalités HubSpot."
      ],
      [
        `<a href="https://www.salesforce.com/fr/blog/">Salesforce Blog France</a>`,
        "Salesforce – État du CRM et tendances relation client",
        veilleMonthYear(f, 7),
        "Rapport annuel « State of Sales » et « State of Marketing » : évolution des pratiques CRM, adoption de l'IA dans la relation client, tendances automation.",
        "Action Qualiopi : intégrer les dernières tendances CRM (IA prédictive, scoring automatisé) dans le programme de formation."
      ],
      [
        `<a href="https://www.make.com/en/blog">Make (Integromat) Blog</a>`,
        "Make – Évolutions de la plateforme d'automation",
        veilleYear(f, 6),
        "Nouvelles intégrations, templates de scénarios, fonctionnalités IA intégrées. Plateforme clé pour l'enseignement de l'automation no-code.",
        "Preuve : changelog + captures. Action : mise à jour des exercices Make avec les nouveaux connecteurs et modèles."
      ],
      [
        `<a href="https://www.brevo.com/fr/blog/">Brevo Blog</a>`,
        "Brevo – Email marketing, automation et CRM",
        veilleMonthYear(f, 5),
        "Évolutions de Brevo (ex-Sendinblue) : nouvelles fonctionnalités automation, segmentation avancée, intégration CRM, conformité RGPD.",
        "Action : actualiser le module email marketing automation avec les nouvelles fonctionnalités Brevo (scoring, A/B test automation)."
      ],
      [
        `<a href="https://zapier.com/blog/">Zapier Blog</a>`,
        "Zapier – Tendances automation et productivité",
        veilleMonthYear(f, 4),
        "Articles sur l'automation des workflows métiers, comparatifs d'outils, templates de zaps. Rapport annuel sur les tendances automation.",
        "Preuve : rapport + captures. Action : enrichir le module intégrations avec les zaps les plus utilisés par les entrepreneurs."
      ],
      [
        `<a href="https://www.france-num.gouv.fr/guides-et-conseils/relation-client-et-fidelisation/outils-crm">France Num – CRM pour TPE/PME</a>`,
        "France Num – Guide CRM pour les entreprises",
        veilleMonthYear(f, 3),
        "Guide gouvernemental sur l'adoption du CRM par les TPE/PME : choix d'outil, mise en place, bonnes pratiques, retours d'expérience.",
        "Preuve : guide PDF France Num. Action Qualiopi : aligner les recommandations de choix CRM sur les préconisations France Num."
      ],
    ];
  }

  if (type === "anglais") {
    const isVTest = f.intitule.toLowerCase().includes("vtest") || f.intitule.toLowerCase().includes("v-test") || f.intitule.toLowerCase().includes("rs6905");
    const certEntries: string[][] = isVTest ? [
      [
        `<a href="https://www.vtest.com/fr/">vtest.com</a>`,
        "VTest – Plateforme officielle de certification Business English – 4 Skills",
        veilleMonthYear(f, 8),
        "Plateforme officielle de la certification VTest Business English (RS6905). Évaluation adaptative des 4 compétences (Reading, Listening, Writing, Speaking) du niveau A2 au C2 CECRL. Accessible en ligne, instructions en 21 langues, gestion du handicap.",
        "Preuve : capture de la plateforme + référentiel RS6905. Action Qualiopi : aligner les objectifs pédagogiques sur les 4 compétences évaluées par VTest et préparer les stagiaires au format adaptatif."
      ],
      [
        `<a href="https://www.francecompetences.fr/recherche/rs/6905/">France Compétences – RS6905</a>`,
        "Fiche RS6905 – VTest Business English – 4 Skills",
        veilleMonthYear(f, 7),
        "Fiche officielle de la certification RS6905 sur France Compétences. Certificateur : ExAssess (Burlington English). 4 blocs de compétences : Compréhension orale (C1), Compréhension écrite (C2), Expression orale (C3), Expression écrite (C4). Échéance : 20/07/2026.",
        "Preuve : fiche France Compétences + capture. Action : vérifier la validité de l'enregistrement et adapter le programme aux compétences du référentiel."
      ],
      [
        `<a href="https://www.cambridgeenglish.org/fr/">Cambridge English – CECRL</a>`,
        "Cambridge English – Cadre européen et descripteurs de niveaux",
        veilleMonthYear(f, 6),
        "Référentiel international pour l'évaluation des compétences en anglais. Niveaux A1 à C2 du CECRL. Les descripteurs servent de base pour les niveaux VTest (A2.1/A2.2, B1.1/B1.2, etc.).",
        "Action Qualiopi : utiliser les descripteurs Cambridge/CECRL pour définir les objectifs pédagogiques par niveau et les critères d'évaluation VTest."
      ],
    ] : [
      [
        `<a href="https://www.britishcouncil.fr/">britishcouncil.fr</a>`,
        "British Council France – Enseignement de l'anglais et certifications",
        veilleMonthYear(f, 8),
        "Organisme de référence pour l'enseignement de l'anglais : ressources pédagogiques, certifications (IELTS, Linguaskill), formations de formateurs, événements.",
        "Preuve : capture + lien. Action : aligner les objectifs pédagogiques sur le CECRL et les standards British Council."
      ],
      [
        `<a href="https://www.cambridgeenglish.org/fr/">Cambridge English</a>`,
        "Cambridge English – Cadre européen et évaluations",
        veilleMonthYear(f, 7),
        "Référentiel international pour l'évaluation des compétences en anglais. Niveaux A1 à C2 du CECRL. Outils de positionnement gratuits.",
        "Action Qualiopi : utiliser les descripteurs Cambridge pour définir les objectifs pédagogiques par niveau et les critères d'évaluation."
      ],
      [
        `<a href="https://www.ets.org/toeic.html">ETS – TOEIC / TOEFL</a>`,
        "ETS Global – Évolutions des certifications TOEIC",
        veilleYear(f, 6),
        "Évolutions du format TOEIC, nouvelles modalités de passage, statistiques de scores par pays. Le TOEIC reste la certification la plus demandée par les employeurs français.",
        "Preuve : site officiel ETS. Action : adapter les modules de préparation aux certifications selon les dernières évolutions."
      ],
    ];
    return [
      ...certEntries,
      [
        `<a href="https://www.youtube.com/watch?v=TpqGIwLz6Yg">YouTube – 50 phrases pour parler anglais au travail</a>`,
        "50 expressions pour l'anglais professionnel",
        veilleMonthYear(f, 5),
        "Vidéo pédagogique présentant les 50 expressions anglaises les plus utiles en contexte professionnel (réunions, emails, téléphone).",
        "Preuve : fiche synthèse vidéo. Action : intégrer ces expressions dans les exercices de mise en situation professionnelle."
      ],
      [
        `<a href="https://www.france-num.gouv.fr/guides-et-conseils/developpement-commercial/internationalisation">France Num – Internationalisation des entreprises</a>`,
        "France Num – L'anglais comme levier d'internationalisation",
        veilleMonthYear(f, 4),
        "Guide sur l'internationalisation des TPE/PME : la maîtrise de l'anglais est identifiée comme compétence clé pour le développement commercial à l'international.",
        "Preuve : guide France Num. Action : contextualiser la formation anglais comme compétence métier stratégique pour les entreprises."
      ],
      [
        `<a href="https://www.ef.fr/epi/">EF Education First – EPI</a>`,
        "EF EPI – Indice de compétence en anglais dans le monde",
        veilleYear(f, 3),
        "Rapport annuel classant les pays par niveau d'anglais. La France se situe au rang 'modéré', soulignant le besoin de formation.",
        "Preuve : rapport PDF EF EPI. Action Qualiopi : utiliser ces données pour justifier la pertinence des formations anglais débutant."
      ],
    ];
  }

  if (type === "massage" || type === "esthetique") {
    return [
      [
        `<a href="https://www.ffmbe.fr/">ffmbe.fr – Fédération Française de Massage Bien-Être</a>`,
        "FFMBE – Fédération du massage bien-être en France",
        veilleMonthYear(f, 8),
        "Fédération professionnelle de référence pour les praticiens en massage bien-être. Informations sur les certifications, le cadre légal et les bonnes pratiques de la profession.",
        "Preuve : capture + lien. Action : aligner les objectifs pédagogiques sur les standards FFMBE et les bonnes pratiques fédérales."
      ],
      [
        `<a href="https://www.doctissimo.fr/grossesse/bien-etre-pendant-la-grossesse/massage-prenatal">Doctissimo – Massage prénatal</a>`,
        "Massage prénatal : bienfaits, techniques et précautions",
        veilleMonthYear(f, 7),
        "Article de référence sur les bienfaits du massage pendant la grossesse : réduction du stress, soulagement des douleurs, amélioration du sommeil. Contre-indications détaillées.",
        "Action Qualiopi : mettre à jour le module contre-indications avec les dernières recommandations médicales."
      ],
      [
        `<a href="https://www.has-sante.fr/">HAS – Haute Autorité de Santé</a>`,
        "HAS – Recommandations sur l'accompagnement de la grossesse",
        veilleYear(f, 6),
        "Recommandations de la HAS sur le suivi de grossesse et les pratiques d'accompagnement non médicamenteux (massage, relaxation, sophrologie).",
        "Preuve : synthèse recommandations HAS. Action : intégrer les recommandations dans le module anatomie et physiologie de la grossesse."
      ],
      [
        `<a href="https://www.perinat-france.org/">Perinat France</a>`,
        "Réseau périnatal – Accompagnement de la grossesse et du post-partum",
        veilleMonthYear(f, 5),
        "Réseau national de périnatalité : ressources sur l'accompagnement des femmes enceintes, les pratiques complémentaires et le bien-être maternel.",
        "Action : enrichir le contenu pédagogique avec les ressources du réseau périnatal sur l'accompagnement non médicamenteux."
      ],
      [
        `<a href="https://www.youtube.com/watch?v=_qTpCmxGiQI">YouTube – Massage prénatal techniques de base</a>`,
        "Massage prénatal – Techniques et positions sécurisées",
        veilleYear(f, 4),
        "Vidéo démonstrative des techniques de massage prénatal : installation en décubitus latéral, pressions adaptées, zones à éviter.",
        "Preuve : fiche synthèse vidéo. Action : utiliser comme support complémentaire pour les mises en pratique supervisées."
      ],
      [
        `<a href="https://www.france-num.gouv.fr/guides-et-conseils/developpement-commercial">France Num – Développement des activités bien-être</a>`,
        "France Num – Développer son activité de praticien bien-être",
        veilleMonthYear(f, 3),
        "Guide sur la digitalisation des activités de services à la personne : prise de rendez-vous en ligne, communication digitale, fidélisation.",
        "Preuve : guide France Num. Action : sensibiliser les stagiaires au développement de leur activité de massage prénatal."
      ],
    ];
  }

  if (type === "management") {
    return [
      [
        `<a href="https://www.hbrfrance.fr/">Harvard Business Review France</a>`,
        "HBR France – Tendances management et leadership",
        veilleMonthYear(f, 8),
        "Revue de référence mondiale sur le management : articles sur le leadership, la gestion d'équipe, le changement organisationnel et l'innovation managériale.",
        "Preuve : capture + lien. Action : intégrer les dernières études de cas HBR dans les exercices pratiques du module management."
      ],
      [
        `<a href="https://www.anact.fr/">ANACT – Agence nationale pour l'amélioration des conditions de travail</a>`,
        "ANACT – Qualité de vie et conditions de travail",
        veilleMonthYear(f, 7),
        "Ressources sur la QVCT, la prévention des RPS, et le management bienveillant. Référence pour les managers en exercice.",
        "Action Qualiopi : enrichir le module gestion des conflits avec les outils ANACT (diagnostic, plans d'action)."
      ],
      [
        `<a href="https://www.youtube.com/watch?v=TpPzFt-DTxg">YouTube – Débuter comme manager</a>`,
        "5 choses essentielles pour bien débuter dans ses fonctions de manager",
        veilleYear(f, 6),
        "Vidéo de formation sur les premières actions à mettre en place lors de sa prise de poste managériale.",
        "Preuve : fiche synthèse vidéo. Action : intégrer comme ressource dans le module prise de poste."
      ],
      [
        `<a href="https://www.manager-go.com/">Manager GO!</a>`,
        "Manager GO – Fiches pratiques et outils de management",
        veilleMonthYear(f, 5),
        "Portail de ressources managériales : fiches pratiques, modèles, outils de gestion d'équipe et de pilotage de projets.",
        "Action : utiliser les fiches Manager GO comme supports complémentaires pour les ateliers pratiques."
      ],
      [
        `<a href="https://www.france-num.gouv.fr/guides-et-conseils/strategie-numerique/management">France Num – Management et digital</a>`,
        "France Num – Le management à l'ère du numérique",
        veilleMonthYear(f, 3),
        "Guide sur l'évolution des pratiques managériales avec le numérique : management hybride, outils collaboratifs, communication à distance.",
        "Preuve : guide France Num. Action : intégrer le management hybride et le télétravail dans les cas pratiques."
      ],
    ];
  }

  if (type === "secretaire") {
    return [
      [
        `<a href="https://www.ameli.fr/medecin/exercice-liberal/facturation-remboursement">Ameli – Facturation des actes médicaux</a>`,
        "Ameli – CCAM et facturation des actes médicaux",
        veilleMonthYear(f, 8),
        "Portail de référence pour la facturation des actes médicaux : nomenclatures CCAM et NGAP, tarifs conventionnels, télétransmission.",
        "Preuve : capture + lien. Action : mettre à jour le module facturation avec les derniers tarifs et nomenclatures."
      ],
      [
        `<a href="https://www.has-sante.fr/jcms/c_1098455/fr/dossier-medical">HAS – Dossier médical</a>`,
        "HAS – Recommandations sur la tenue du dossier médical",
        veilleMonthYear(f, 7),
        "Recommandations de la HAS sur la constitution, la tenue et la conservation du dossier médical patient (DMP, DPI).",
        "Action Qualiopi : aligner le module gestion du DPI sur les dernières recommandations HAS."
      ],
      [
        `<a href="https://www.youtube.com/watch?v=V_bwp2mJTZI">YouTube – Secrétaire médicale au quotidien</a>`,
        "Le métier de secrétaire médicale – Témoignage et quotidien",
        veilleYear(f, 6),
        "Vidéo témoignage sur le quotidien d'une secrétaire médicale : accueil patients, gestion des plannings, archivage, relation avec les praticiens.",
        "Preuve : fiche synthèse. Action : enrichir les mises en situation avec des cas réels du quotidien professionnel."
      ],
      [
        `<a href="https://solidarites.gouv.fr/">Ministère de la Santé – Actualités</a>`,
        "Ministère de la Santé – Évolutions du secteur médico-social",
        veilleMonthYear(f, 4),
        "Actualités réglementaires et organisationnelles du secteur de la santé : réformes hospitalières, numerus clausus, télémédecine.",
        "Action : contextualiser la formation dans les évolutions du secteur sanitaire et social."
      ],
      [
        `<a href="https://www.france-num.gouv.fr/guides-et-conseils/strategie-numerique/sante-numerique">France Num – Santé numérique</a>`,
        "France Num – Transformation numérique du secteur santé",
        veilleMonthYear(f, 3),
        "Guide sur la digitalisation du secteur de la santé : Mon Espace Santé, DMP, téléconsultation, IA en santé.",
        "Preuve : guide France Num. Action : intégrer les outils numériques de santé dans le programme de formation."
      ],
    ];
  }

  if (type === "vtc") {
    return [
      [
        `<a href="https://www.uber.com/fr/fr/drive/">Uber Drivers – Plateforme VTC</a>`,
        "Uber – Plateforme leader de mise en relation VTC (commissions, conditions)",
        veilleMonthYear(f, 8),
        "Uber : commission 25%, paiement hebdomadaire, système de notation client (4,7/5 minimum), exigences véhicule (4 portes, climatisation, < 7 ans).",
        "Preuve : capture conditions Uber. Action : module développement commercial – choix de la plateforme et optimisation des courses."
      ],
      [
        `<a href="https://drivers.bolt.eu/fr/">Bolt – Devenir chauffeur VTC</a>`,
        "Bolt – Plateforme VTC alternative (Estonie, présence FR)",
        veilleMonthYear(f, 7),
        "Bolt : commission 15-20% (plus avantageuse qu'Uber), positionnement prix bas, croissance rapide en France. Multi-plateforme recommandée.",
        "Preuve : page chauffeurs Bolt. Action : intégrer le multi-plateforme dans la stratégie commerciale du futur VTC."
      ],
      [
        `<a href="https://drivers.heetch.com/fr">Heetch – Plateforme VTC française</a>`,
        "Heetch – VTC français positionné jeunes/nightlife",
        veilleMonthYear(f, 6),
        "Heetch : plateforme française, positionnement nightlife (sorties, festivals), commission 10%, clientèle jeune urbaine. Niche commerciale intéressante.",
        "Preuve : page partenaires. Action : présenter aux stagiaires les positionnements différenciants des plateformes."
      ],
      [
        `<a href="https://www.fnam.fr/">FNAM – Fédération Nationale des Auto-Entrepreneurs et Micro-entrepreneurs</a>`,
        "FNAM – Représentation des chauffeurs VTC indépendants",
        veilleMonthYear(f, 5),
        "Syndicat représentatif. Veille sur les conditions d'exercice, négociations avec les plateformes, défense des chauffeurs.",
        "Preuve : actualités FNAM. Action : sensibiliser les futurs VTC aux droits et représentation collective."
      ],
      [
        `<a href="https://www.urssaf.fr/portail/home/independant/mes-cotisations/comment-sont-calculees-mes-cotisat/microentrepreneur--auto-entrepre.html">URSSAF – Cotisations VTC</a>`,
        "URSSAF – Cotisations sociales du chauffeur VTC indépendant",
        veilleMonthYear(f, 4),
        "Taux cotisations services BIC : 21,2% du CA. Versement libératoire impôt sur le revenu : 1,7% supplémentaire. Déclaration mensuelle ou trimestrielle.",
        "Preuve : simulateur URSSAF. Action : exercices pratiques de calcul de cotisations dans le module gestion."
      ],
      [
        `<a href="https://www.youtube.com/results?search_query=devenir+chauffeur+vtc+2025">YouTube – Témoignages chauffeurs VTC</a>`,
        "YouTube – Retours d'expérience de chauffeurs VTC en activité",
        veilleYear(f, 3),
        "Vidéos de chauffeurs VTC : revenus réels (1800-3500€/mois), conditions de travail, choix du véhicule (Peugeot 508, Mercedes Classe E), conseils débutants.",
        "Preuve : playlist vidéos. Action : enrichir le module développement commercial avec des cas concrets de réussite/difficulté."
      ],
    ];
  }

  if (type === "ecsr") {
    return [
      [
        `<a href="https://www.securite-routiere.gouv.fr/">securite-routiere.gouv.fr</a>`,
        "Délégation à la Sécurité Routière – Statistiques et prévention",
        veilleMonthYear(f, 8),
        "Données officielles sur l'accidentalité routière, les comportements à risque et les campagnes de prévention. Référence pour les modules de sensibilisation.",
        "Preuve : rapport annuel accidentalité. Action : actualiser les données statistiques dans le module sécurité routière (CCP2)."
      ],
      [
        `<a href="https://www.inserr.fr/">INSERR – Institut National de Sécurité Routière</a>`,
        "INSERR – Formation et recherche en sécurité routière",
        veilleMonthYear(f, 7),
        "Institut de référence pour la formation des professionnels de la conduite. Programmes de perfectionnement, recherches sur la pédagogie de la conduite.",
        "Action Qualiopi : aligner les pratiques pédagogiques sur les recommandations INSERR."
      ],
      [
        `<a href="https://www.preventionroutiere.asso.fr/">Prévention Routière</a>`,
        "Association Prévention Routière – Ressources pédagogiques",
        veilleMonthYear(f, 6),
        "Supports pédagogiques pour la sensibilisation à la sécurité routière : simulateurs, vidéos, quiz interactifs, interventions en entreprise.",
        "Preuve : ressources téléchargées. Action : enrichir le module animation de sensibilisation (CCP2) avec les supports officiels."
      ],
      [
        `<a href="https://www.youtube.com/watch?v=LpT0v5YzYAA">YouTube – Pédagogie de la conduite</a>`,
        "Techniques pédagogiques pour l'enseignement de la conduite",
        veilleYear(f, 5),
        "Vidéo sur les approches pédagogiques modernes : apprentissage progressif, gestion du stress, pédagogie par objectifs.",
        "Preuve : fiche synthèse vidéo. Action : intégrer dans le module pédagogie de la formation initiale (CCP1)."
      ],
      [
        `<a href="https://www.france-num.gouv.fr/guides-et-conseils/strategie-numerique">France Num – Numérique auto-école</a>`,
        "France Num – Digitalisation des auto-écoles",
        veilleMonthYear(f, 4),
        "Guide sur la transformation numérique des auto-écoles : simulateurs, e-learning code, plateformes de réservation de créneaux.",
        "Preuve : guide France Num. Action : intégrer les outils numériques dans l'enseignement de la conduite."
      ],
      [
        `<a href="https://www.cnpa.fr/">CNPA – Conseil National des Professions de l'Automobile</a>`,
        "CNPA – Actualités du secteur automobile et auto-écoles",
        veilleMonthYear(f, 3),
        "Organisation professionnelle représentant les écoles de conduite. Veille sur les évolutions réglementaires, la convention collective et les enjeux du secteur.",
        "Preuve : newsletter + captures. Action Qualiopi : veille sectorielle sur les évolutions du métier d'enseignant de la conduite."
      ],
    ];
  }

  // Default: word/bureautique
  return [
    [
      `<a href="https://support.microsoft.com/fr-fr/word">support.microsoft.com – Word</a>`,
      "Microsoft – Centre d'aide et nouveautés Word",
      veilleMonthYear(f, 8),
      "Page officielle Microsoft sur les fonctionnalités Word : mise en forme avancée, styles, publipostage, collaboration en temps réel, Copilot intégré.",
      "Preuve : capture écran + lien. Action : mise à jour du programme avec les dernières fonctionnalités Word (dictée vocale, traduction, Copilot)."
    ],
    [
      `<a href="https://propulsandgo.com/blog/top-5-formations-bureautique-paris-2025">propulsandgo.com</a>`,
      "Top 5 des formations bureautiques – Word reste incontournable",
      veilleMonthYear(f, 7),
      "Word et le Pack Office restent les compétences bureautiques les plus demandées par les employeurs. La maîtrise de Word est un prérequis dans 85% des offres d'emploi administratif.",
      "Preuve : article + statistiques. Action : positionnement de la formation Word comme compétence métier indispensable pour l'employabilité."
    ],
    [
      `<a href="https://capcours-abdformations.com/formation-word-pack-office">capcours-abdformations.com</a>`,
      "Pourquoi maîtriser Word en entreprise ?",
      veilleYear(f, 6),
      "Usage professionnel de Word : création de courriers normés, rapports avec sommaire automatique, modèles de documents, publipostage pour les mailings.",
      "Action : renforcement des cas pratiques professionnels (courrier commercial, rapport avec styles, publipostage, document administratif normé)."
    ],
    [
      `<a href="https://www.microsoft.com/ignite">microsoft.com/ignite</a>`,
      "Microsoft Ignite – Nouveautés Word et Microsoft 365",
      veilleMonthYear(f, 4),
      "Conférence Microsoft : intégration de Copilot dans Word (aide à la rédaction, reformulation, résumé automatique), collaboration en temps réel améliorée, nouveaux modèles.",
      "Preuve : programme Ignite + vidéos. Action : ajout d'un module « Découverte des fonctionnalités IA dans Word (Copilot) »."
    ],
    [
      `<a href="https://www.icdlfrance.org/">ICDL France – Certification bureautique</a>`,
      "ICDL – Référentiel de compétences en traitement de texte",
      veilleMonthYear(f, 5),
      "L'ICDL (ex-PCIE) est la certification de référence pour valider les compétences bureautiques. Le module Traitement de texte couvre : mise en forme, tableaux, images, publipostage, styles et sommaires.",
      "Preuve : référentiel ICDL traitement de texte. Action : aligner les exercices pratiques sur les compétences évaluées par la certification ICDL Word."
    ],
    [
      `<a href="https://www.youtube.com/watch?v=sBkfzCiD0BI">YouTube – Word astuces professionnelles</a>`,
      "Astuces Word pour les professionnels – Mise en page et productivité",
      veilleYear(f, 3),
      "Tutoriel sur les fonctionnalités avancées de Word : raccourcis clavier, styles personnalisés, en-têtes/pieds de page, numérotation, table des matières automatique.",
      "Action Qualiopi : enrichir les exercices de la formation avec les astuces de productivité Word les plus recherchées."
    ],
  ];
}

export function genVeilleMetierV2(o: OrganismeInfo, f: FormationInfo) {
  const type = detectFormationType(f);
  const aiPack = getCachedVeillePack(f);
  const curated = isTypeExplicit(f, type) ? veilleMetierRows(f, type) : [];
  const rows = aiPack?.metier?.length
    ? veilleRowsToTable(aiPack.metier)
    : (curated.length ? curated : genericVeilleRows(f, "metier"));
  return buildDocument({ org: o, title: "Tableau de veille métier", table: {
    headers: ["Lien (article / vidéo / événement)", "Nom de l'article / Vidéo / Événement", "Date", "Commentaire – Analyse métier", "Exploitation de veille (preuve + action Qualiopi)"],
    rows,
  } });
}

// ===== IND 25 — TABLEAU DE VEILLE TECHNOLOGIQUE =====

function veilleTechnoRows(f: FormationInfo, type: FormationType): string[][] {
  const commonDigitalLearning = [
    [
      `<a href="https://www.centre-inffo.fr/site-centre-inffo/actualites-centre-inffo/le-barometre-istf-du-digital-learning-souligne-limportance-du-tutorat">Centre Inffo</a>`,
      "Le baromètre ISTF du digital learning",
      veilleDate(f, 10),
      "État des lieux digital learning : tutorat, multimodal, distanciel asynchrone & obstacles à l'adoption.",
      "Preuve : capture écran + PDF du baromètre Centre Inffo. Action Qualiopi : mettre à jour la stratégie digitale pédagogique."
    ],
    [
      `<a href="https://fr.linkedin.com/posts/sas-theia_digital-learning-les-chiffres-cl%C3%A9s-%C3%A0-retenir-activity-7297570569854590977-hFkT">LinkedIn – SAS Theia</a>`,
      "Chiffres clés ISTF Digital Learning",
      veilleMonthYear(f, 9),
      "Publication LinkedIn avec données réelles sur adoption du digital learning (68% des formations intégrant du numérique).",
      "Preuve : capture du post + export PDF. Action Qualiopi : intégrer ces données dans la revue de processus pédagogique."
    ],
  ];

  if (type === "creation") {
    return [...commonDigitalLearning,
      [
        `<a href="https://formalites.entreprises.gouv.fr/">Guichet unique des formalités (INPI)</a>`,
        "Dématérialisation complète des formalités d'entreprise",
        veilleMonthYear(f, 7),
        "Immatriculation, modification et cessation d'activité s'effectuent intégralement en ligne depuis 2023. Le parcours (rubriques, pièces justificatives, signature électronique, suivi du dossier) évolue régulièrement, ce qui impacte directement le module « Démarches administratives ».",
        "Preuve : captures datées du parcours en ligne. Action : mise à jour des tutoriels pas-à-pas utilisés en atelier et simulation d'un dépôt de dossier complet en salle, pièces à l'appui."
      ],
      [
        `<a href="https://www.impots.gouv.fr/professionnel/facturation-electronique">impots.gouv.fr – Facturation électronique</a>`,
        "Calendrier de généralisation de la facture électronique et choix d'une plateforme (PDP)",
        veilleMonthYear(f, 5),
        "Réception obligatoire des factures électroniques pour toutes les entreprises à compter de septembre 2026, émission par étapes jusqu'en septembre 2027 pour les PME et microentreprises, avec transmission via une plateforme de dématérialisation partenaire au format Factur-X, UBL ou CII.",
        "Preuve : calendrier officiel et liste des PDP immatriculées archivés. Action : séquence « Choisir son outil de facturation compatible e-invoicing » ajoutée au support, avec grille de comparaison des solutions du marché."
      ],
      [
        `<a href="https://bpifrance-creation.fr/boiteaoutils">Bpifrance – Boîte à outils du créateur</a>`,
        "Outils numériques de business plan, de prévisionnel financier et de plan de trésorerie",
        veilleMonthYear(f, 6),
        "Modèles de business plan, simulateurs de charges sociales, calculateurs de seuil de rentabilité et tableurs de prévisionnel mis à disposition gratuitement et actualisés chaque année avec les barèmes en vigueur.",
        "Preuve : modèles téléchargés et datés. Action : trames Excel actualisées utilisées pour les exercices de prévisionnel, de plan de financement et de trésorerie sur 12 mois."
      ],
      [
        `<a href="https://www.canva.com/fr_fr/">Canva / Business Model Canvas en ligne</a>`,
        "Outils collaboratifs de formalisation du modèle économique (BMC, Lean Canvas, pitch deck)",
        veilleMonthYear(f, 4),
        "Les outils collaboratifs en ligne (Canva, Miro, Figma Jam) permettent de construire un Business Model Canvas à plusieurs, en présentiel comme à distance, et de produire un pitch deck professionnel sans compétence graphique.",
        "Preuve : gabarits créés par l'organisme et captures des ateliers. Action : atelier BMC animé sur tableau collaboratif partagé, chaque stagiaire repart avec son canvas exportable en PDF."
      ],
      [
        `<a href="https://www.economie.gouv.fr/entreprises/intelligence-artificielle-tpe-pme">IA générative appliquée à la création d'entreprise</a>`,
        "Usage raisonné de l'IA générative pour l'étude de marché, la rédaction et la prospection",
        veilleMonthYear(f, 3),
        "Les assistants génératifs sont massivement adoptés par les créateurs pour rédiger des contenus commerciaux, structurer un business plan ou préparer une étude de marché. Leur usage suppose une vigilance sur la fiabilité des sources, la confidentialité des données et la personnalisation des productions.",
        "Preuve : synthèse interne des usages testés et grille de vigilance. Action : séquence « IA et création d'entreprise » ajoutée au parcours (prompts types, vérification des chiffres, limites juridiques et RGPD)."
      ],
      [
        `<a href="https://www.cnil.fr/fr/rgpd-par-ou-commencer">CNIL – Outils de conformité pour les TPE</a>`,
        "Modèles numériques de registre des traitements et de mentions d'information",
        veilleMonthYear(f, 2),
        "La CNIL met à disposition des modèles de registre simplifié, des générateurs de mentions légales et des guides sécurité adaptés aux très petites structures et aux sites vitrines de créateurs.",
        "Preuve : modèles téléchargés et datés. Action : remise d'un kit RGPD prêt à l'emploi aux stagiaires et exercice de remplissage du registre sur leur propre projet."
      ],
      [
        `<a href="https://www.francenum.gouv.fr/">France Num – Transformation numérique des TPE</a>`,
        "Diagnostic numérique, aides et réseau des activateurs France Num",
        veilleMonthYear(f, 4),
        "Plateforme publique dédiée à la numérisation des petites entreprises : diagnostic en ligne, fiches pratiques (site web, référencement local, paiement en ligne, cybersécurité) et annuaire d'experts labellisés.",
        "Preuve : fiches et diagnostic archivés. Action : intégration du diagnostic France Num en fin de parcours comme plan d'action numérique personnalisé du créateur."
      ],
    ];
  }


  if (type === "fle") {
    return [...commonDigitalLearning,
      [
        `<a href="https://www.learningtechnologiesfrance.com/">learningtechnologiesfrance.com</a>`,
        "Learning Technologies France – Événement technologie & formation",
        veilleYear(f, 7),
        "Principal salon français des technologies pour la formation (IA, EdTech, plateformes, LMS).",
        "Preuve : programme + certificat de participation. Action Qualiopi : participer au salon / CR + plan adoption tech."
      ],
      [
        `<a href="https://www.tv5monde.com/fiches-pedagogiques">TV5Monde – Fiches pédagogiques FLE</a>`,
        "TV5Monde – Ressources numériques pour le FLE",
        veilleDate(f, 6),
        "Plateforme numérique de référence pour l'enseignement du FLE : vidéos authentiques, exercices interactifs, fiches pédagogiques classées par niveau CECRL.",
        "Preuve : capture écran + sélection de fiches niveau B1. Action Qualiopi : intégrer les ressources TV5Monde dans les supports de formation (compréhension orale/écrite)."
      ],
      [
        `<a href="https://apprendre.tv5monde.com/">apprendre.tv5monde.com</a>`,
        "Apprendre le français avec TV5Monde – plateforme interactive",
        veilleMonthYear(f, 4),
        "Plateforme gratuite d'apprentissage du français : exercices auto-corrigés, vidéos avec sous-titres, progression par niveau.",
        "Preuve : URL + captures. Action : recommander la plateforme aux apprenants pour le travail en autonomie entre les sessions."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-centre-inffo/actualites-centre-inffo/6e-edition-du-barom%C3%A8tre-de-la-formation-et-de-l%E2%80%99emploi-2025">Centre Inffo – Baromètre</a>`,
        "Baromètre formation & emploi – IA et compétences",
        veilleDate(f, 3),
        "Indique que l'IA est un levier majeur intégré dans les attentes des actifs, avec implications sur les compétences.",
        "Preuve : infographie / PDF baromètre. Action Qualiopi : intégrer résultats dans analyse des besoins et plan de développement."
      ],
      [
        `<a href="https://www.talenco.com/nos-publications/barometre-formation-professionnelle-tendances-pratiques-2025/">TalenCo – Baromètre</a>`,
        "Baromètre formation professionnelle tendances",
        veilleDate(f, 2),
        "Synthèse des pratiques et attentes digitales dans la formation – accent sur transformation numérique.",
        "Preuve : PDF baromètre + résumés. Action Qualiopi : alignement offre/compétences sur tendances numériques."
      ],
    ];
  }

  if (type === "ia") {
    return [...commonDigitalLearning,
      [
        `<a href="https://www.learningtechnologiesfrance.com/">learningtechnologiesfrance.com</a>`,
        "Learning Technologies France – IA & EdTech",
        veilleYear(f, 7),
        "Salon dédié aux technologies de formation : forte présence de l'IA générative dans les solutions pédagogiques présentées.",
        "Preuve : programme + notes de veille. Action Qualiopi : benchmark des outils IA pédagogiques."
      ],
      [
        `<a href="https://huggingface.co/blog">Hugging Face Blog</a>`,
        "Hugging Face – Modèles open source et IA générative",
        veilleDate(f, 6),
        "Plateforme de référence pour les modèles IA open source : Stable Diffusion, LLaMA, Mistral. Démocratisation de l'accès à l'IA.",
        "Preuve : capture blog + exemples de modèles. Action : présenter les alternatives open source dans le module éthique et choix d'outils."
      ],
      [
        `<a href="https://www.anthropic.com/research">Anthropic – Recherche IA</a>`,
        "Anthropic – Recherche sur la sécurité et l'alignement de l'IA",
        veilleMonthYear(f, 4),
        "Publications sur la sécurité de l'IA, l'alignement des modèles et l'usage responsable. Référence pour le volet éthique.",
        "Preuve : articles de recherche + synthèse. Action Qualiopi : enrichir le module « usage responsable de l'IA » avec les dernières recommandations."
      ],
      [
        `<a href="https://fr.linkedin.com/posts/centre-inffo_lia-en-formation-professionnelle-innovation-activity-7316747080062951424-7ws1">LinkedIn – Centre Inffo IA</a>`,
        "Post Centre Inffo – IA & innovation en formation",
        veilleYear(f, 5),
        "Publication LinkedIn sur l'intégration de l'IA dans les pratiques de formation.",
        "Preuve : capture écran + URL. Action Qualiopi : preuve de veille mensuelle + ateliers internes IA."
      ],
      [
        `<a href="https://www.talenco.com/nos-publications/barometre-formation-professionnelle-tendances-pratiques-2025/">TalenCo – Baromètre</a>`,
        "Baromètre formation professionnelle – IA et transformation digitale",
        veilleDate(f, 3),
        "Synthèse des pratiques : l'IA générative devient un outil quotidien pour la création de contenus dans les organismes de formation.",
        "Preuve : PDF baromètre. Action Qualiopi : alignement offre/compétences sur tendances IA et numériques."
      ],
    ];
  }

  if (type === "webmarketing") {
    return [...commonDigitalLearning,
      [
        `<a href="https://www.canva.com/designschool/">Canva Design School</a>`,
        "Canva – Formation création visuelle et design",
        veilleMonthYear(f, 7),
        "Plateforme d'apprentissage gratuite de Canva : tutoriels design, templates, intégration IA pour la génération de visuels professionnels.",
        "Preuve : captures tutoriels. Action : intégrer les nouveaux templates et fonctionnalités IA Canva dans le module création visuelle."
      ],
      [
        `<a href="https://business.facebook.com/">Meta Business Suite</a>`,
        "Meta Business Suite – Évolutions outils de gestion réseaux sociaux",
        veilleMonthYear(f, 6),
        "Plateforme centralisée pour la gestion Facebook/Instagram : planification, statistiques, messagerie, publicité. Nouvelles fonctionnalités IA pour le ciblage Advantage+.",
        "Action : mise à jour du module community management avec les nouvelles fonctionnalités Meta Business Suite."
      ],
      [
        `<a href="https://analytics.google.com/">Google Analytics 4</a>`,
        "Google Analytics 4 – Évolutions et nouvelles fonctionnalités",
        veilleDate(f, 5),
        "Passage obligatoire à GA4 : nouvelles métriques (engaged sessions), rapports d'exploration, intégration BigQuery, predictive audiences.",
        "Preuve : documentation GA4. Action : mise à jour complète du module Analytics avec l'interface GA4 et les nouvelles métriques."
      ],
      [
        `<a href="https://www.learningtechnologiesfrance.com/">learningtechnologiesfrance.com</a>`,
        "Learning Technologies France – EdTech et formation digitale",
        veilleYear(f, 5),
        "Salon des technologies de formation : outils de création de contenu, plateformes LMS, solutions d'évaluation en ligne.",
        "Preuve : programme + notes de veille. Action Qualiopi : benchmark des outils pédagogiques pour la formation marketing digital."
      ],
      [
        `<a href="https://www.talenco.com/nos-publications/barometre-formation-professionnelle-tendances-pratiques-2025/">TalenCo – Baromètre</a>`,
        "Baromètre formation professionnelle – transformation digitale",
        veilleDate(f, 3),
        "Synthèse des tendances : vidéo courte, IA dans le contenu marketing, social commerce, personal branding.",
        "Preuve : PDF baromètre. Action Qualiopi : alignement du programme sur les tendances digitales émergentes."
      ],
    ];
  }

  if (type === "crm") {
    return [...commonDigitalLearning,
      [
        `<a href="https://www.hubspot.fr/state-of-marketing">HubSpot – State of Marketing</a>`,
        "HubSpot – Rapport annuel State of Marketing & CRM",
        veilleMonthYear(f, 7),
        "Rapport de référence sur l'état du CRM et de l'automation marketing : taux d'adoption, ROI, tendances (IA prédictive, chatbots, scoring automatisé).",
        "Preuve : rapport PDF. Action : aligner les cas pratiques sur les benchmarks d'usage CRM les plus récents."
      ],
      [
        `<a href="https://www.make.com/en/blog">Make Blog</a>`,
        "Make – Nouveautés et templates d'automation",
        veilleMonthYear(f, 6),
        "Évolutions de la plateforme Make : nouveaux connecteurs (HubSpot, Brevo, Stripe), templates de scénarios, fonctionnalités IA intégrées.",
        "Action : mise à jour des exercices Make avec les derniers connecteurs et modèles de scénarios."
      ],
      [
        `<a href="https://www.brevo.com/fr/blog/">Brevo – Innovation email & automation</a>`,
        "Brevo – Nouvelles fonctionnalités automation et IA",
        veilleDate(f, 5),
        "Évolutions Brevo : IA pour l'optimisation des objets d'email, segmentation prédictive, A/B test automatisé, intégration WhatsApp Business.",
        "Preuve : changelog Brevo. Action : intégrer les nouvelles fonctionnalités dans le module email marketing automation."
      ],
      [
        `<a href="https://www.learningtechnologiesfrance.com/">learningtechnologiesfrance.com</a>`,
        "Learning Technologies France – CRM & automation pour la formation",
        veilleYear(f, 5),
        "Salon des technologies de formation : solutions CRM éducatives, automation de la gestion des apprenants.",
        "Preuve : programme + notes. Action Qualiopi : veille sur les outils CRM adaptés au secteur de la formation."
      ],
      [
        `<a href="https://www.talenco.com/nos-publications/barometre-formation-professionnelle-tendances-pratiques-2025/">TalenCo – Baromètre</a>`,
        "Baromètre formation professionnelle – digitalisation et automation",
        veilleDate(f, 3),
        "Synthèse des tendances : automation des processus de gestion, CRM pour les OF, outils no-code.",
        "Preuve : PDF baromètre. Action Qualiopi : alignement des outils enseignés sur les tendances du marché."
      ],
    ];
  }

  if (type === "anglais") {
    const isVTest = f.intitule.toLowerCase().includes("vtest") || f.intitule.toLowerCase().includes("v-test") || f.intitule.toLowerCase().includes("rs6905");
    const vtestTechEntries: string[][] = isVTest ? [
      [
        `<a href="https://candidate.vtest.com/">candidate.vtest.com</a>`,
        "Plateforme candidate VTest – Environnement d'examen en ligne",
        veilleMonthYear(f, 8),
        "Plateforme officielle de passage de la certification VTest Business English. Test adaptatif en ligne avec notation automatique (système vocal exclusif pour l'oral). Interface candidat accessible en 21 langues.",
        "Preuve : capture de l'interface candidate. Action : familiariser les stagiaires avec l'environnement d'examen et les fonctionnalités de la plateforme."
      ],
      [
        `<a href="https://www.vtest.com/fr/la-gestion-du-handicap-chez-vtest/">VTest – Gestion du handicap</a>`,
        "VTest – Accessibilité et aménagements pour candidats en situation de handicap",
        veilleMonthYear(f, 7),
        "Procédures et aménagements VTest pour les candidats ayant des besoins particuliers. Adaptation du format du test selon les besoins identifiés.",
        "Preuve : page officielle + procédure interne. Action Qualiopi : intégrer les procédures d'aménagement VTest dans le protocole d'accueil des stagiaires en situation de handicap."
      ],
    ] : [];
    return [...commonDigitalLearning,
      ...vtestTechEntries,
      [
        `<a href="https://www.duolingo.com/">Duolingo</a>`,
        "Duolingo – Application d'apprentissage des langues par IA",
        veilleMonthYear(f, isVTest ? 6 : 7),
        "Application leader mondial de l'apprentissage des langues. Utilise l'IA adaptative pour personnaliser les parcours. Référence en gamification pédagogique.",
        "Preuve : captures de l'app + analyse pédagogique. Action : recommander Duolingo comme outil complémentaire d'auto-apprentissage entre les sessions."
      ],
      [
        `<a href="https://www.babbel.com/fr/">Babbel</a>`,
        "Babbel – Plateforme d'apprentissage linguistique professionnel",
        veilleMonthYear(f, isVTest ? 5 : 6),
        "Plateforme d'apprentissage de l'anglais orientée professionnels. Reconnaissance vocale intégrée pour la prononciation. Parcours thématiques (business, voyage, quotidien).",
        "Action : benchmark des plateformes d'e-learning linguistique pour enrichir les recommandations aux stagiaires."
      ],
      [
        `<a href="https://www.learningtechnologiesfrance.com/">learningtechnologiesfrance.com</a>`,
        "Learning Technologies France – EdTech linguistique",
        veilleYear(f, isVTest ? 4 : 5),
        "Salon des technologies de formation : solutions IA pour l'apprentissage des langues, speech-to-text, chatbots conversationnels en anglais.",
        "Preuve : programme + notes de veille. Action Qualiopi : évaluer l'intégration de chatbots IA pour la pratique conversationnelle."
      ],
      [
        `<a href="https://www.youtube.com/watch?v=oxs5sjCmfMU">YouTube – Business English Conversation</a>`,
        "Anglais des affaires – Dialogues et mises en situation",
        veilleDate(f, isVTest ? 3 : 4),
        "Ressource vidéo pour la pratique de l'anglais professionnel : dialogues réalistes, vocabulaire business, exercices de compréhension.",
        "Preuve : fiche synthèse + lien. Action : intégrer comme ressource complémentaire pour les exercices de listening."
      ],
      [
        `<a href="https://www.talenco.com/nos-publications/barometre-formation-professionnelle-tendances-pratiques-2025/">TalenCo – Baromètre</a>`,
        "Baromètre formation professionnelle – langues et numérique",
        veilleDate(f, isVTest ? 2 : 3),
        "Synthèse des tendances : la formation en langues reste dans le top 3 des formations les plus demandées. L'anglais représente 80% des demandes linguistiques.",
        "Preuve : PDF baromètre. Action Qualiopi : justifier la pertinence de l'offre anglais dans le plan de développement."
      ],
    ];
  }

  if (type === "massage" || type === "esthetique") {
    return [...commonDigitalLearning,
      [
        `<a href="https://www.ffmbe.fr/se-former/">FFMBE – Se former au massage bien-être</a>`,
        "FFMBE – Référentiel de formation au massage bien-être",
        veilleMonthYear(f, 7),
        "Fédération professionnelle proposant un référentiel de compétences et des formations certifiantes pour les praticiens en massage bien-être.",
        "Preuve : référentiel FFMBE + captures. Action : aligner le contenu pédagogique sur le référentiel FFMBE."
      ],
      [
        `<a href="https://www.youtube.com/watch?v=_qTpCmxGiQI">YouTube – Massage prénatal démonstration</a>`,
        "Techniques de massage prénatal – Démonstration complète",
        veilleYear(f, 6),
        "Vidéo démonstrative des techniques de massage adaptées à la grossesse : positions sécurisées, pressions douces, zones spécifiques.",
        "Preuve : fiche synthèse vidéo. Action : utiliser comme support pédagogique complémentaire."
      ],
      [
        `<a href="https://www.perinat-france.org/">Perinat France – Réseau périnatal</a>`,
        "Réseau périnatal – Pratiques d'accompagnement de la grossesse",
        veilleMonthYear(f, 5),
        "Ressources sur les pratiques complémentaires (massage, relaxation, sophrologie) dans l'accompagnement de la grossesse.",
        "Action : enrichir les supports pédagogiques avec les protocoles recommandés par le réseau périnatal."
      ],
      [
        `<a href="https://www.talenco.com/nos-publications/barometre-formation-professionnelle-tendances-pratiques-2025/">TalenCo – Baromètre</a>`,
        "Baromètre formation professionnelle – Secteur bien-être et santé",
        veilleDate(f, 3),
        "Tendances de la formation dans les métiers du bien-être : digitalisation, prise de rendez-vous en ligne, outils de suivi client.",
        "Preuve : PDF baromètre. Action Qualiopi : intégrer les tendances numériques du secteur bien-être dans la formation."
      ],
    ];
  }

  if (type === "management") {
    return [...commonDigitalLearning,
      [
        `<a href="https://www.hbrfrance.fr/">HBR France – Outils numériques managériaux</a>`,
        "Harvard Business Review – Technologies et management",
        veilleMonthYear(f, 7),
        "Articles sur les outils collaboratifs, le management hybride, l'IA appliquée à la gestion d'équipe et les plateformes de feedback.",
        "Preuve : captures articles. Action : intégrer les outils collaboratifs modernes dans les exercices pratiques."
      ],
      [
        `<a href="https://www.learningtechnologiesfrance.com/">learningtechnologiesfrance.com</a>`,
        "Learning Technologies France – Formation managériale",
        veilleYear(f, 6),
        "Salon EdTech : solutions de formation au management (simulateurs, serious games, coaching digital).",
        "Preuve : programme + notes. Action : benchmark des outils pédagogiques pour le management."
      ],
      [
        `<a href="https://www.talenco.com/nos-publications/barometre-formation-professionnelle-tendances-pratiques-2025/">TalenCo – Baromètre</a>`,
        "Baromètre formation – Management et soft skills",
        veilleDate(f, 3),
        "Le management et les soft skills dans le top 5 des demandes de formation. Focus sur le leadership et la gestion du changement.",
        "Preuve : PDF baromètre. Action Qualiopi : aligner l'offre management sur les tendances du marché."
      ],
    ];
  }

  if (type === "secretaire") {
    return [...commonDigitalLearning,
      [
        `<a href="https://www.ameli.fr/">Ameli – Services numériques santé</a>`,
        "Ameli – Évolutions numériques de l'Assurance Maladie",
        veilleMonthYear(f, 7),
        "Évolutions de la plateforme Ameli : télétransmission, Espace Pro, Mon Espace Santé, facturation en ligne.",
        "Preuve : captures fonctionnalités. Action : mettre à jour le module facturation avec les outils numériques Ameli."
      ],
      [
        `<a href="https://www.doctolib.fr/presse">Doctolib – Actualités</a>`,
        "Doctolib – Innovations de la prise de rendez-vous médicale",
        veilleMonthYear(f, 6),
        "Évolutions de Doctolib : téléconsultation intégrée, messagerie sécurisée, gestion des plannings multi-praticiens.",
        "Action : former les stagiaires aux dernières fonctionnalités Doctolib utilisées en cabinet."
      ],
      [
        `<a href="https://www.talenco.com/nos-publications/barometre-formation-professionnelle-tendances-pratiques-2025/">TalenCo – Baromètre</a>`,
        "Baromètre formation – Santé et numérique",
        veilleDate(f, 3),
        "La transformation numérique du secteur santé accélère : DMP, télémédecine, IA en imagerie médicale.",
        "Preuve : PDF baromètre. Action Qualiopi : intégrer les nouvelles technologies santé dans le programme."
      ],
    ];
  }

  if (type === "vtc") {
    return [...commonDigitalLearning,
      [
        `<a href="https://www.waze.com/fr/">Waze – Navigation GPS communautaire</a>`,
        "Waze – Outil GPS de référence pour les VTC",
        veilleMonthYear(f, 7),
        "Waze : navigation GPS gratuite avec données de trafic en temps réel, signalements communautaires (radars, accidents), itinéraires optimisés. Outil quotidien du VTC.",
        "Preuve : capture interface. Action : module pratique sur la maîtrise de Waze (paramétrage, itinéraires bis, gestion des alertes)."
      ],
      [
        `<a href="https://maps.google.com/">Google Maps – Navigation et estimation course</a>`,
        "Google Maps – Estimation prix et durée pour devis VTC",
        veilleMonthYear(f, 6),
        "Google Maps Distance Matrix API : calcul automatique de distance et durée pour devis client. Intégration possible dans une appli de réservation propre.",
        "Action : présenter aux stagiaires l'utilisation de Google Maps pour établir des devis fiables (épreuve relation client)."
      ],
      [
        `<a href="https://www.uber.com/fr/fr/drive/driver-app/">Uber Driver App – Application chauffeur</a>`,
        "Uber Driver – Application mobile dédiée aux VTC",
        veilleMonthYear(f, 5),
        "Application Uber Driver : acceptation course, navigation intégrée, gestion paiement, statistiques performance, programme Uber Pro (niveaux Bleu/Or/Platine/Diamant avec avantages).",
        "Preuve : captures app. Action : démonstration en formation de l'app et du programme de fidélité chauffeur."
      ],
      [
        `<a href="https://www.tesla.com/fr_fr/modely">Véhicules électriques pour VTC – Tesla, Hyundai Ioniq</a>`,
        "Mobilité électrique – Véhicules adaptés à l'activité VTC",
        veilleMonthYear(f, 4),
        "Véhicules électriques (Tesla Model 3, Hyundai Ioniq 5, Kia EV6) : autonomie 400-500 km, coût/km divisé par 3, accès ZFE-m garanti, image premium pour le client.",
        "Preuve : comparatif TCO. Action : module gestion d'entreprise – choix du véhicule (thermique vs électrique, location longue durée)."
      ],
      [
        `<a href="https://www.zenpark.com/">Zenpark, Onepark – Stationnement urbain</a>`,
        "Applications de stationnement intelligent pour VTC",
        veilleMonthYear(f, 3),
        "Solutions de stationnement (Zenpark, Onepark, Yespark) : réservation à l'avance, parkings disponibles en temps réel. Indispensable pour les VTC en attente de course.",
        "Action : ressource pratique pour optimiser les temps morts entre courses (épreuve gestion d'activité)."
      ],
    ];
  }

  if (type === "ecsr") {
    return [...commonDigitalLearning,
      [
        `<a href="https://www.securite-routiere.gouv.fr/">Sécurité Routière – Simulateurs</a>`,
        "Simulateurs de conduite et outils numériques pédagogiques",
        veilleMonthYear(f, 7),
        "Évolutions des simulateurs de conduite pour la formation : réalité virtuelle, scénarios de conduite en conditions dégradées, éco-conduite.",
        "Preuve : benchmark simulateurs. Action : évaluer l'intégration d'un simulateur dans la formation pratique ECSR."
      ],
      [
        `<a href="https://www.inserr.fr/">INSERR – Outils pédagogiques numériques</a>`,
        "INSERR – Technologies pour l'enseignement de la conduite",
        veilleMonthYear(f, 6),
        "Innovations technologiques dans la formation à la conduite : tablettes embarquées, applications de suivi pédagogique, e-learning code de la route.",
        "Action : intégrer les outils numériques INSERR dans les pratiques de formation."
      ],
      [
        `<a href="https://www.learningtechnologiesfrance.com/">learningtechnologiesfrance.com</a>`,
        "Learning Technologies France – EdTech et conduite",
        veilleYear(f, 5),
        "Salon des technologies de formation : solutions IA, VR et serious games appliquées à l'enseignement de la conduite.",
        "Preuve : programme + notes. Action Qualiopi : benchmark des solutions EdTech pour la formation ECSR."
      ],
      [
        `<a href="https://www.talenco.com/nos-publications/barometre-formation-professionnelle-tendances-pratiques-2025/">TalenCo – Baromètre</a>`,
        "Baromètre formation professionnelle – Secteur transport et mobilité",
        veilleDate(f, 3),
        "Tendances : digitalisation de la formation à la conduite, simulateurs VR, permis connecté, éco-conduite obligatoire.",
        "Preuve : PDF baromètre. Action Qualiopi : aligner les outils pédagogiques sur les tendances technologiques du secteur."
      ],
    ];
  }

  // Default: word/bureautique
  return [...commonDigitalLearning,
    [
      `<a href="https://www.microsoft.com/fr-fr/microsoft-365/word">Microsoft – Word Online et Microsoft 365</a>`,
      "Microsoft 365 – Évolutions de Word (cloud, collaboration, Copilot)",
      veilleMonthYear(f, 7),
      "Word évolue vers le cloud avec Microsoft 365 : co-édition en temps réel, enregistrement automatique sur OneDrive, intégration de Copilot pour l'aide à la rédaction et la mise en forme.",
      "Preuve : captures des nouvelles fonctionnalités Word 365. Action : intégrer la collaboration en ligne et les fonctionnalités cloud dans le programme de formation Word."
    ],
    [
      `<a href="https://www.microsoft.com/fr-fr/microsoft-365/copilot">Microsoft Copilot – IA dans Word</a>`,
      "Microsoft Copilot – Assistant IA intégré à Word",
      veilleMonthYear(f, 6),
      "Copilot dans Word : rédaction assistée par IA, reformulation, résumé de documents longs, génération de contenu à partir de prompts. Changement majeur dans l'utilisation de Word en entreprise.",
      "Action : ajout d'un module de sensibilisation à Copilot dans Word (découverte, limites, bonnes pratiques d'utilisation de l'IA dans le traitement de texte)."
    ],
    [
      `<a href="https://www.icdlfrance.org/">ICDL France – Plateforme de certification en ligne</a>`,
      "ICDL – Plateforme de passage de certification bureautique",
      veilleDate(f, 5),
      "Plateforme officielle ICDL pour le passage de la certification Traitement de texte. Interface en ligne avec exercices pratiques simulant l'environnement Word réel.",
      "Preuve : captures de la plateforme ICDL. Action : familiariser les stagiaires avec l'interface de certification et les types d'exercices évalués."
    ],
    [
      `<a href="https://www.learningtechnologiesfrance.com/">learningtechnologiesfrance.com</a>`,
      "Learning Technologies France – Outils bureautiques et e-learning",
      veilleYear(f, 4),
      "Salon des technologies de formation : évolutions des outils bureautiques en e-learning, simulateurs Word, exercices interactifs, LMS spécialisés bureautique.",
      "Preuve : programme + notes de veille. Action Qualiopi : benchmark des outils pédagogiques pour la formation bureautique Word."
    ],
    [
      `<a href="https://www.talenco.com/nos-publications/barometre-formation-professionnelle-tendances-pratiques-2025/">TalenCo – Baromètre</a>`,
      "Baromètre formation professionnelle – Bureautique et compétences numériques",
      veilleDate(f, 3),
      "La formation bureautique (Word, Excel) reste dans le top 5 des formations les plus demandées en CPF. L'intégration de l'IA dans les outils Office transforme les compétences attendues.",
      "Preuve : PDF baromètre. Action Qualiopi : adapter le programme Word aux nouvelles attentes (IA, collaboration cloud, productivité)."
    ],
  ];
}

export function genVeilleTechnologiqueV2(o: OrganismeInfo, f: FormationInfo) {
  const type = detectFormationType(f);
  const aiPack = getCachedVeillePack(f);
  const curated = isTypeExplicit(f, type) ? veilleTechnoRows(f, type) : [];
  const rows = aiPack?.technologique?.length
    ? veilleRowsToTable(aiPack.technologique)
    : (curated.length ? curated : genericVeilleRows(f, "technologique"));
  return buildDocument({ org: o, title: "Tableau de veille technologique", table: {
    headers: ["Lien (vrai)", "Nom / Titre de l'article", "Date", "Commentaire (veille technologique)", "Exploitation de veille vérifiable (preuve + action Qualiopi)"],
    rows,
  } });
}

// ===== IND 26 — VEILLE HANDICAP =====

export function genVeilleHandicap(o: OrganismeInfo, f?: FormationInfo) {
  const fi = f || { dateDebut: new Date().toISOString().split("T")[0] } as FormationInfo;
  const type = f ? detectFormationType(f) : ("autre" as FormationType);
  const specifiques: string[][] = type === "creation" ? [
    [
      `<a href="https://www.agefiph.fr/aides-handicap/aide-la-creation-ou-la-reprise-dentreprise">AGEFIPH – Aide à la création d'entreprise</a>`,
      "Aide forfaitaire à la création ou reprise d'entreprise par une personne en situation de handicap",
      veilleMonthYear(fi, 3),
      "Subvention forfaitaire versée au créateur bénéficiaire de l'obligation d'emploi, cumulable avec les autres dispositifs (ACRE, ARCE, microcrédit), conditionnée à un apport en fonds propres et à un accompagnement du projet.",
      "Preuve : fiche AGEFIPH datée et archivée. Action : information systématique en séquence « Financer son projet » et orientation du référent handicap vers la délégation régionale pour tout stagiaire concerné."
    ],
    [
      `<a href="https://www.handicap.fr/emploi/creation-entreprise">Créateurs en situation de handicap – Accompagnement dédié</a>`,
      "Réseaux et parcours d'accompagnement des entrepreneurs handicapés (Cap emploi, H'up entrepreneurs)",
      veilleMonthYear(fi, 5),
      "Cartographie des relais spécialisés : diagnostic de compatibilité entre la situation de santé et le projet, aménagement du poste de travail indépendant, adaptation du rythme d'activité et soutien par les pairs.",
      "Preuve : annuaire des relais archivé. Action : ajout d'une fiche « Créer son entreprise en situation de handicap » au livret d'accueil et adaptation du rythme des ateliers (pauses, supports numériques accessibles)."
    ],
    [
      `<a href="https://www.service-public.fr/particuliers/vosdroits/F1650">Cumul AAH et revenus d'activité indépendante</a>`,
      "Règles de cumul entre l'AAH et les revenus tirés d'une activité non salariée",
      veilleMonthYear(fi, 4),
      "Modalités d'abattement et de déclaration trimestrielle des revenus d'activité indépendante pour les bénéficiaires de l'AAH : point déterminant dans le choix du statut juridique et du régime fiscal du créateur.",
      "Preuve : fiche service-public.fr datée. Action : cas pratique chiffré « choix du statut avec maintien de l'AAH » intégré aux exercices financiers du parcours."
    ],
  ] : [];
  return buildDocument({ org: o, title: "Tableau de veille handicap", table: {
    headers: ["Lien", "Nom de l'article / Texte", "Date", "Commentaire – Analyse handicap", "Exploitation de veille (preuve + action Qualiopi)"],
    rows: [
      ...specifiques,

      [
        `<a href="https://www.agefiph.fr/">agefiph.fr</a>`,
        "AGEFIPH – Aides et services pour l'emploi des personnes handicapées",
        veilleYear(fi, 8),
        "Référence nationale pour les aides financières et l'accompagnement des personnes en situation de handicap en formation et emploi.",
        "Preuve : capture écran du site + fiches aides téléchargées. Action Qualiopi : mise à jour du répertoire partenaires handicap et information des bénéficiaires PSH."
      ],
      [
        `<a href="https://www.monparcourshandicap.gouv.fr/">monparcourshandicap.gouv.fr</a>`,
        "Mon Parcours Handicap – Plateforme officielle",
        veilleYear(fi, 7),
        "Plateforme gouvernementale d'information et d'orientation pour les personnes en situation de handicap.",
        "Preuve : capture écran + lien vers la plateforme. Action Qualiopi : intégrer le lien dans les supports d'information stagiaires PSH."
      ],
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033862420">Légifrance – Art. L5213-6</a>`,
        "Obligation d'aménagement raisonnable – Code du travail",
        veilleYear(fi, 6),
        "Rappel de l'obligation légale d'aménagement raisonnable pour les personnes en situation de handicap.",
        "Preuve : extrait du code du travail. Action Qualiopi : vérification de la conformité de nos procédures d'aménagement."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-centre-inffo/actualites-centre-inffo/handicap-et-formation-professionnelle">Centre Inffo – Handicap</a>`,
        "Handicap et formation professionnelle – Actualités",
        veilleMonthYear(fi, 4),
        "Veille sur les évolutions réglementaires et pratiques en matière d'accueil des PSH en formation.",
        "Preuve : capture écran + synthèse interne. Action Qualiopi : mise à jour de la procédure d'accueil PSH et formation du référent handicap."
      ],
      [
        `<a href="https://www.handipole.org/">handipole.org</a>`,
        "Handipole – Emploi, formation et insertion des personnes handicapées",
        veilleMonthYear(fi, 2),
        "Ressources et actualités sur l'insertion professionnelle des personnes handicapées.",
        "Preuve : lien + veille documentaire. Action Qualiopi : enrichissement du référentiel handicap interne."
      ],
    ]
  } });
}

// ===== IND 27 — PARTENAIRES, CONTRAT SOUS-TRAITANCE, CHARTE QUALITÉ =====

export function genListePartenairesV2(o: OrganismeInfo) {
  const tamponHtml = o.tamponUrl ? `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />` : "";
  return buildDocument({ org: o, title: "LES PARTENAIRES", sections: [
    { heading: "", content: `<p>${o.nom} s'attache à développer constamment son réseau de partenaires afin d'assurer une très grande employabilité à ses étudiants.</p>` },
  ], extraHtml: `<h2>Les partenaires de ${o.nom}</h2>
    <table>
      <tr><th>Partenaire</th><th>${o.dirigeant}</th></tr>
      <tr style="background:#fff"><td>Dirigeant</td><td>Dirigeant<br>${tamponHtml}</td></tr>
    </table>` });
}

export function genContratSousTraitanceV2(o: OrganismeInfo, f: FormationInfo, stagiaires: import("@/types/qualiopi").StagiaireInfo[]) {
  const stagList = stagiaires.map(s => `${s.prenom} ${s.nom}${s.poste ? ' – ' + s.poste : ''}`).join(', ') || "___";
  const dateMaj = (o as any).dateMaj ? new Date((o as any).dateMaj).toLocaleDateString("fr-FR") : new Date().toLocaleDateString("fr-FR");
  const formateurNom = f.formateur || "";
  const firstSession = stagiaires[0];
  const formationTitle = f.intitule || "Formation professionnelle continue";
  const formationType = (f as any).typeFormation || formationTitle;
  const formationDuration = (firstSession as any)?.duree || f.duree || "À définir selon le groupe";
  const formationDates = firstSession?.dateDebutFormation && firstSession?.dateFinFormation
    ? `Du ${formatDate(firstSession.dateDebutFormation)} au ${formatDate(firstSession.dateFinFormation)}`
    : f.dateDebut && f.dateFin
      ? `Du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}`
      : "Sessions : Dates individuelles par stagiaire";
  const formationHours = (firstSession as any)?.horaires || (f as any).horaires || "De 9h00 à 12h30 et de 13h30 à 17h00";
  // Find the matching stagiaire for this formateur to get their specific signature
  const matchingStagiaire = stagiaires.find(s => s.formateur === formateurNom);
  const fmtSigUrl = matchingStagiaire?.formateurSignatureUrl || f.formateurSignatureUrl;

  // Déterminer si le formateur est lié à VICTOR ACADEMY ou est une personne physique
  const isVictorAcademy = formateurNom.toUpperCase().includes("RENUKA");

  // Infos sous-traitant selon le cas
  const sousTraitantNom = isVictorAcademy ? "VICTOR ACADEMY" : formateurNom || "Le Sous-traitant";
  const sousTraitantType = isVictorAcademy ? "société" : "personne physique";

  // Bloc d'identification du sous-traitant
  let sousTraitantBlock = "";
  if (isVictorAcademy) {
    sousTraitantBlock = `
      <p><strong>${sousTraitantNom}</strong></p>
      <p>Forme juridique : SASU – Société par Actions Simplifiée Unipersonnelle</p>
      <p>SIRET : 910 645 563 00016 | SIREN : 910 645 563</p>
      <p>Siège social : 5 Allée Watteau, 95200 SARCELLES</p>
      <p>Représenté par : <strong>Monsieur Jeganathan SOFIANE</strong>, en qualité de Dirigeant</p>
      <p>Ci-après dénommé <strong>« le Sous-traitant »</strong></p>
      <br/><p><strong>Formateur désigné :</strong> ${formateurNom}</p>
    `;
  } else {
    sousTraitantBlock = `
      <p><strong>Monsieur/Madame ${formateurNom}</strong></p>
      <p>Formateur indépendant – Personne physique</p>
      <p>Ci-après dénommé(e) <strong>« le Sous-traitant »</strong></p>
    `;
  }

  // Bloc signature sous-traitant
  const sousTraitantSignLabel = isVictorAcademy ? `Pour le Sous-traitant – VICTOR ACADEMY` : `Pour le Sous-traitant – ${formateurNom}`;
  const sousTraitantSignRepresentant = isVictorAcademy ? `Monsieur Jeganathan SOFIANE` : formateurNom;
  const sousTraitantSignQualite = isVictorAcademy ? "Dirigeant" : "Formateur indépendant";

  // Préambule adapté
  const preambuleSousTraitant = isVictorAcademy
    ? `Le Sous-traitant, <strong>VICTOR ACADEMY</strong>, est un organisme de formation professionnelle disposant de formateurs salariés qualifiés dans le domaine de l'enseignement du Français Langue Étrangère (FLE).`
    : `Le Sous-traitant, <strong>${formateurNom}</strong>, est un formateur indépendant (personne physique) qualifié dans le domaine de la formation professionnelle.`;

  const preambuleFormateur = isVictorAcademy
    ? `<p>Le formateur désigné pour l'exécution de la présente prestation est <strong>${formateurNom}</strong>, salarié du Sous-traitant.</p>`
    : "";

  // Article 1 adapté
  const art1Intermediaire = isVictorAcademy
    ? `son formateur salarié <strong>${formateurNom}</strong>`
    : `<strong>${formateurNom}</strong>, en qualité de formateur indépendant`;
  const art1Statut = isVictorAcademy
    ? `<p><strong>Il est expressément convenu que le formateur ${formateurNom} intervenant dans le cadre du présent contrat est un salarié du Sous-traitant et non du Donneur d'ordre.</strong></p>`
    : `<p><strong>Il est expressément convenu que ${formateurNom} intervient en qualité de prestataire indépendant et qu'aucun lien de subordination n'existe entre le Donneur d'ordre et le Sous-traitant.</strong></p>`;

  return buildDocument({ org: o, title: "CONTRAT DE SOUS-TRAITANCE EN FORMATION PROFESSIONNELLE", subtitle: "Conformément aux articles L.6351-1 et suivants du Code du travail et au Référentiel National Qualité (Qualiopi)", sections: [
    { heading: "ENTRE LES SOUSSIGNÉS", content: `
      <p><strong>1. LE DONNEUR D'ORDRE :</strong></p>
      <p><strong>${o.nom}</strong></p>
      <p>Forme juridique : Organisme de formation</p>
      <p>SIRET : ${o.siret}</p>
      ${o.nda ? `<p>Numéro de Déclaration d'Activité (NDA) : ${o.nda}</p>` : ""}
      <p>Siège social : ${o.adresse}, ${o.codePostal} ${o.ville}</p>
      <p>Représenté par : <strong>${o.dirigeant}</strong>, en qualité de Dirigeant</p>
      <p>Ci-après dénommé <strong>« le Donneur d'ordre »</strong></p>
      <br/>
      <p><strong>2. LE SOUS-TRAITANT :</strong></p>
      ${sousTraitantBlock}
      <br/>
      <p style="font-style:italic">Ci-après désignés ensemble « les Parties ».</p>
    ` },
    { heading: "PRÉAMBULE", content: `
      <p>Le Donneur d'ordre, <strong>${o.nom}</strong>, est un organisme de formation professionnelle${o.nda ? ` déclaré auprès de la DREETS sous le numéro ${o.nda}` : ""}.</p>
      <p>${preambuleSousTraitant}</p>
      <p>Le Donneur d'ordre souhaite confier au Sous-traitant, qui l'accepte, la réalisation de prestations de formation en sous-traitance, dans les conditions définies ci-après.</p>
      ${preambuleFormateur}
      <p>Le présent contrat est conclu dans le cadre des articles <strong>L.6351-1 et suivants du Code du travail</strong> relatifs à la sous-traitance en formation professionnelle.</p>
    ` },
    { heading: "ARTICLE 1 – OBJET DU CONTRAT", content: `
      <p>Le présent contrat a pour objet de définir les conditions dans lesquelles le Donneur d'ordre confie au Sous-traitant la réalisation de prestations de formation professionnelle continue au bénéfice de ses apprenants.</p>
      <p>Le Sous-traitant s'engage à réaliser les prestations de formation par l'intermédiaire de ${art1Intermediaire}, conformément aux programmes, objectifs pédagogiques et conditions définis par le Donneur d'ordre.</p>
      ${art1Statut}
    ` },
    { heading: "ARTICLE 2 – DESCRIPTION DE LA FORMATION", content: `
      <table>
        <tr><th style="width:40%">Élément</th><th>Détail</th></tr>
        <tr><td><strong>Intitulé de la formation</strong></td><td>${formationTitle}</td></tr>
        <tr><td><strong>Type de formation</strong></td><td>${formationType}</td></tr>
        <tr><td><strong>Public visé</strong></td><td>${f.publicVise || "Adultes"}</td></tr>
        <tr><td><strong>Durée totale</strong></td><td>${formationDuration}</td></tr>
        <tr><td><strong>Dates prévisionnelles</strong></td><td>${formationDates}</td></tr>
        <tr><td><strong>Modalités</strong></td><td>${f.modalites || "Présentiel et/ou distanciel (à adapter selon les besoins)"}</td></tr>
        <tr><td><strong>Lieu de formation</strong></td><td>${f.lieu || `${o.adresse}, ${o.codePostal} ${o.ville}`}</td></tr>
        <tr><td><strong>Horaires</strong></td><td>${formationHours}</td></tr>
      </table>
      <p style="margin-top:10px"><strong>Modules de formation :</strong></p>
      <ul>
        <li>Compréhension orale et écrite du français</li>
        <li>Expression orale : communication en situation professionnelle et quotidienne</li>
        <li>Expression écrite : rédaction de documents courants</li>
        <li>Grammaire, conjugaison et vocabulaire en contexte</li>
        <li>Préparation aux certifications (le cas échéant)</li>
      </ul>
    ` },
    { heading: "ARTICLE 3 – STATUT DU SOUS-TRAITANT", content: isVictorAcademy ? `
      <p>Les formateurs mis à disposition par le Sous-traitant pour assurer les prestations objet du présent contrat sont <strong>exclusivement des salariés du Sous-traitant</strong>.</p>
      <p>Le Sous-traitant assume seul la qualité d'employeur vis-à-vis de ses formateurs. Il est seul responsable :</p>
      <ul>
        <li>Du versement de leur rémunération et des charges sociales afférentes</li>
        <li>De leurs conditions de travail</li>
        <li>De leur déclaration et de leur couverture sociale</li>
        <li>De leur formation continue et du maintien de leurs compétences</li>
      </ul>
      <p><strong>Aucun lien de subordination</strong> n'existe ni ne saurait exister entre le Donneur d'ordre et les formateurs salariés du Sous-traitant. Le Donneur d'ordre ne peut en aucun cas donner des directives aux formateurs sur l'organisation de leur travail, ni exercer un pouvoir disciplinaire à leur égard.</p>
    ` : `
      <p>Le Sous-traitant, <strong>${formateurNom}</strong>, intervient en qualité de <strong>personne physique – formateur indépendant</strong>.</p>
      <p>Le Sous-traitant exerce son activité de manière indépendante et est seul responsable :</p>
      <ul>
        <li>De ses obligations fiscales et sociales</li>
        <li>De sa couverture sociale et de son assurance professionnelle</li>
        <li>Du maintien et du développement de ses compétences</li>
      </ul>
      <p><strong>Aucun lien de subordination</strong> n'existe ni ne saurait exister entre le Donneur d'ordre et le Sous-traitant. Le Donneur d'ordre ne peut en aucun cas donner des directives au Sous-traitant sur l'organisation de son travail, ni exercer un pouvoir disciplinaire à son égard.</p>
    `, variant: "green" },
    { heading: "ARTICLE 4 – OBLIGATIONS DU SOUS-TRAITANT", content: `
      <p>Le Sous-traitant s'engage à :</p>
      <p><strong>4.1 – Qualité de la prestation :</strong></p>
      <ul>
        <li>Réaliser la formation dans le respect des objectifs pédagogiques définis conjointement avec le Donneur d'ordre</li>
        <li>Mettre à disposition des formateurs qualifiés, compétents et expérimentés dans le domaine du FLE</li>
        <li>Respecter le programme de formation validé par le Donneur d'ordre</li>
        <li>Adapter les méthodes pédagogiques au public cible</li>
      </ul>
      <p><strong>4.2 – Documents et justificatifs :</strong></p>
      <ul>
        <li>Fournir au Donneur d'ordre, avant le début de la formation : les <strong>CV détaillés et diplômes</strong> de chaque formateur intervenant</li>
        <li>Communiquer une copie de son extrait K-bis ou avis SIRENE à jour</li>
        <li>Fournir son récépissé de déclaration d'activité de formation</li>
        <li>Transmettre une attestation d'assurance responsabilité civile professionnelle en cours de validité</li>
      </ul>
      <p><strong>4.3 – Évaluations :</strong></p>
      <ul>
        <li>Réaliser les évaluations des acquis des stagiaires conformément à l'article <strong>L.6353-1 du Code du travail</strong></li>
        <li>Mettre en place des évaluations de positionnement en début de formation</li>
        <li>Réaliser des évaluations intermédiaires et sommatives tout au long du parcours</li>
        <li>Remettre au Donneur d'ordre les résultats des évaluations et les bilans pédagogiques</li>
      </ul>
      <p><strong>4.4 – Conformité Qualiopi :</strong></p>
      <ul>
        <li>Respecter strictement les exigences du <strong>Référentiel National Qualité (Qualiopi)</strong></li>
        <li>Se conformer aux indicateurs applicables du RNQ, notamment en matière de traçabilité, d'évaluation et d'amélioration continue</li>
        <li>Se tenir informé des évolutions du référentiel et s'y conformer</li>
        <li>Participer, le cas échéant, aux audits de surveillance ou de renouvellement du Donneur d'ordre</li>
      </ul>
      <p><strong>4.5 – Confidentialité et non-démarchage :</strong></p>
      <ul>
        <li>Ne pas démarcher directement ou indirectement les clients et prospects du Donneur d'ordre</li>
        <li>Respecter la confidentialité des informations transmises dans le cadre du contrat</li>
      </ul>
    ` },
    { heading: "ARTICLE 5 – OBLIGATIONS DU DONNEUR D'ORDRE", content: `
      <p><strong>${o.nom}</strong> s'engage à :</p>
      <ul>
        <li>Assurer la <strong>gestion administrative</strong> de la formation : inscriptions, convocations, conventions, facturation</li>
        <li>Transmettre au Sous-traitant tous les <strong>documents nécessaires</strong> à la réalisation de la prestation (programme validé, listes de stagiaires, supports pédagogiques le cas échéant)</li>
        <li>Fournir les moyens matériels et logistiques nécessaires (salles, équipements, accès aux outils de visioconférence pour le distanciel)</li>
        <li>Transmettre une copie des feuilles de présence signées par les stagiaires</li>
        <li>Transmettre les questionnaires de satisfaction remplis par les stagiaires</li>
        <li>Informer le Sous-traitant de toute modification, annulation ou report au moins <strong>7 jours ouvrés</strong> avant la date prévue</li>
      </ul>
    ` },
    { heading: "ARTICLE 6 – MODALITÉS FINANCIÈRES", content: `
      <p><strong>6.1 – Rémunération :</strong></p>
      <p>En contrepartie de la réalisation des prestations de formation, le Donneur d'ordre versera au Sous-traitant la somme de : <strong>50 € HT</strong> par heure de formation dispensée.</p>
      <p><strong>6.2 – Facturation et paiement :</strong></p>
      <ul>
        <li>Le Sous-traitant adressera une facture à l'issue de chaque session de formation</li>
        <li>Le paiement sera effectué par virement bancaire dans un délai de <strong>30 jours</strong> à réception de la facture et des pièces justificatives (feuilles d'émargement, bilans pédagogiques)</li>
      </ul>
      <p><strong>6.3 – Frais annexes :</strong></p>
      <p>Les éventuels frais de déplacement, hébergement et restauration du formateur seront à la charge du <strong>Sous-traitant</strong>, sauf accord écrit contraire entre les Parties.</p>
    ` },
    { heading: "ARTICLE 7 – ABSENCE DE LIEN DE SUBORDINATION", content: `
      <p>Le présent contrat constitue un <strong>contrat de prestation de services</strong> et ne saurait en aucun cas être assimilé à un contrat de travail.</p>
      <p>Le Sous-traitant exerce son activité de manière <strong>indépendante</strong>. Il conserve l'entière liberté dans l'organisation de son travail et de celui de ses formateurs salariés, sous réserve du respect des objectifs pédagogiques et du calendrier convenus.</p>
      <p>Aucun lien de subordination juridique n'existe entre le Donneur d'ordre et le Sous-traitant, ni entre le Donneur d'ordre et les formateurs salariés du Sous-traitant.</p>
    `, variant: "green" },
    { heading: "ARTICLE 8 – ASSURANCE RESPONSABILITÉ CIVILE PROFESSIONNELLE", content: `
      <p>Le Sous-traitant déclare avoir souscrit une police d'assurance <strong>Responsabilité Civile Professionnelle (RCP)</strong> couvrant les dommages pouvant résulter de l'exécution des prestations objet du présent contrat.</p>
      <p>Le Sous-traitant s'engage à maintenir cette assurance en vigueur pendant toute la durée du contrat et à fournir une attestation d'assurance sur simple demande du Donneur d'ordre.</p>
    ` },
    { heading: "ARTICLE 9 – PROPRIÉTÉ INTELLECTUELLE", content: `
      <p>Les supports pédagogiques, cours, exercices et tout contenu créé par le Sous-traitant ou ses formateurs dans le cadre de l'exécution du présent contrat restent la <strong>propriété intellectuelle du Sous-traitant</strong>.</p>
      <p>Le Donneur d'ordre s'interdit de reproduire, diffuser, modifier ou exploiter ces contenus sans l'accord préalable et écrit du Sous-traitant.</p>
      <p>Réciproquement, les outils, marques, méthodologies et supports propres au Donneur d'ordre restent sa propriété exclusive.</p>
    ` },
    { heading: "ARTICLE 10 – CLAUSE DE CONFORMITÉ QUALIOPI", content: `
      <p>Le Donneur d'ordre étant engagé dans une démarche de certification <strong>Qualiopi</strong> conformément à l'article L.6316-3 du Code du travail, le Sous-traitant s'engage expressément à :</p>
      <ul>
        <li>Respecter l'ensemble des indicateurs du <strong>Référentiel National Qualité</strong> applicables à la sous-traitance</li>
        <li>Fournir tous les documents et preuves nécessaires aux audits de certification</li>
        <li>Coopérer pleinement lors des audits de surveillance ou de renouvellement</li>
        <li>Se conformer aux procédures qualité du Donneur d'ordre</li>
        <li>Signaler sans délai toute non-conformité identifiée</li>
      </ul>
      <p>Le non-respect de cette clause constitue un <strong>manquement grave</strong> susceptible d'entraîner la résiliation immédiate du contrat.</p>
    `, variant: "orange" },
    { heading: "ARTICLE 11 – DOCUMENTS À FOURNIR AVANT LA FORMATION", content: `
      <p>Le Sous-traitant devra remettre au Donneur d'ordre, <strong>au plus tard 15 jours avant le début de la formation</strong>, les documents suivants :</p>
      <table>
        <tr><th style="width:5%">N°</th><th>Document</th><th style="width:15%">Statut</th></tr>
        <tr><td>1</td><td>Contrat de sous-traitance signé</td><td>Fourni</td></tr>
        <tr><td>2</td><td>Extrait K-bis ou avis SIRENE à jour</td><td>Fourni</td></tr>
        <tr><td>3</td><td>Récépissé de déclaration d'activité de formation</td><td>Fourni</td></tr>
        <tr><td>4</td><td>CV détaillé(s) du/des formateur(s)</td><td>Fourni</td></tr>
        <tr><td>5</td><td>Copie des diplômes et certifications des formateurs</td><td>Fourni</td></tr>
        <tr><td>6</td><td>Attestation d'assurance RCP en cours de validité</td><td>Fourni</td></tr>
        <tr><td>7</td><td>Présentation des méthodes et moyens pédagogiques</td><td>Fourni</td></tr>
        <tr><td>8</td><td>Programme détaillé de la formation</td><td>Fourni</td></tr>
      </table>
    `, variant: "green" },
    { heading: "ARTICLE 12 – DURÉE ET RÉSILIATION", content: `
      <p>Le présent contrat est conclu pour la durée de la prestation de formation visée à l'article 2.</p>
      <p>Il pourra être résilié de plein droit par l'une ou l'autre des Parties en cas de manquement grave de l'autre Partie à l'une de ses obligations, après mise en demeure restée sans effet dans un délai de <strong>15 jours</strong>.</p>
      <p>En cas de résiliation, les prestations déjà réalisées seront rémunérées au prorata temporis.</p>
    ` },
    { heading: "ARTICLE 13 – DROIT APPLICABLE ET LITIGES", content: `
      <p>Le présent contrat est soumis au <strong>droit français</strong>.</p>
      <p>En cas de litige relatif à l'interprétation ou à l'exécution du présent contrat, les Parties s'engagent à rechercher une solution amiable. À défaut d'accord dans un délai de 30 jours, le litige sera soumis aux tribunaux compétents de <strong>${o.ville || "MONTPELLIER"}</strong>.</p>
    ` },
  ], extraHtml: (() => {
    const sigHtml = o.signatureUrl ? `<img src="${o.signatureUrl}" alt="Signature" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />` : "";
    const tamponHtml = o.tamponUrl ? `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />` : "";
    return `<p style="margin-top:30px;text-align:center;font-weight:600">Fait en deux exemplaires originaux, à <strong>${o.ville || "MONTPELLIER"}</strong>, le <strong>${dateMaj}</strong></p>
    <div class="signature-block-2" style="margin-top:30px">
      <div class="sig-box">
        <p class="sig-label">Pour le Donneur d'ordre – ${o.nom}</p>
        <p>Représenté par : <strong>${o.dirigeant}</strong></p>
        <p>Qualité : Dirigeant</p>
        <p>Date : ${dateMaj}</p>
        <p style="margin-top:15px">Signature et cachet :</p>
        ${sigHtml}
        <p style="font-size:11px;color:#888;margin-top:8px;font-style:italic">Lu et approuvé – Bon pour accord</p>
      </div>
      <div class="sig-box">
        <p class="sig-label">${sousTraitantSignLabel}</p>
        <p>Représenté par : <strong>${sousTraitantSignRepresentant}</strong></p>
        <p>Qualité : ${sousTraitantSignQualite}</p>
        <p>Date : ${dateMaj}</p>
        <p style="margin-top:15px">Signature :</p>
        ${fmtSigUrl ? `<img src="${fmtSigUrl}" alt="Signature formateur" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />` : ""}
        <p style="font-size:11px;color:#888;margin-top:8px;font-style:italic">Lu et approuvé – Bon pour accord</p>
      </div>
    </div>`;
  })() });
}

export function genChecklistFormateur(o: OrganismeInfo, f: FormationInfo, sessionDates?: { debut?: string; fin?: string }) {
  const sessDebut = sessionDates?.debut || f.dateDebut;
  const sessFin = sessionDates?.fin || f.dateFin;
  const dateDoc = sessDebut ? formatDate(sessDebut) : new Date().toLocaleDateString("fr-FR");
  const dateSig = sessFin ? formatDate(sessFin) : dateDoc;
  const formateurNom = f.formateur || "—";
  const tamponHtml = o.tamponUrl ? `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />` : "";
  const fmtSigUrl = (f as any).formateurSignatureUrl;
  const sessionLabel = sessDebut && sessFin ? `Session du ${formatDate(sessDebut)} au ${formatDate(sessFin)}` : "";

  const sections: { titre: string; items: string[] }[] = [
    { titre: "1. Préparation pédagogique", items: [
      "Programme de formation lu, compris et respecté",
      "Objectifs pédagogiques identifiés et reformulés aux stagiaires",
      "Supports pédagogiques préparés, à jour et adaptés au public",
      "Séquençage / progression pédagogique respecté",
      "Modalités pédagogiques adaptées (présentiel / distanciel / mixte)",
      "Matériel et outils numériques (vidéoprojecteur, plateforme LMS) testés avant la session",
    ]},
    { titre: "2. Évaluations administrées", items: [
      "Test de positionnement de DÉBUT réalisé et corrigé",
      "QCM / quiz intermédiaires passés à chaque étape clé",
      "Exercices pratiques / mises en situation effectués",
      "Test de positionnement de FIN réalisé et corrigé",
      "Grille d'acquisition des compétences renseignée et signée",
      "Bilan à CHAUD distribué et collecté en fin de formation",
      "Bilan à FROID prévu (3 à 6 mois après la fin)",
    ]},
    { titre: "3. Suivi des stagiaires", items: [
      "Feuilles d'émargement signées chaque demi-journée",
      "Suivi individualisé des acquis (forces / axes de progrès)",
      "Réponse apportée aux besoins spécifiques exprimés par les stagiaires",
      "Adaptation du rythme aux niveaux et profils du groupe",
      "Repérage et accompagnement des stagiaires en difficulté",
      "Prise en compte des situations de handicap (référent PSH informé si besoin)",
      "Communication régulière avec le référent pédagogique",
    ]},
    { titre: "4. Conditions matérielles et accueil", items: [
      "Salle propre, rangée et accueillante avant l'arrivée des stagiaires",
      "Disposition adaptée à la modalité pédagogique (U, îlots, frontal)",
      "Vérification du matériel (chaises, tables, prises, connexion Wi-Fi)",
      "Affichage du règlement intérieur et des consignes de sécurité visible",
      "Issues de secours et consignes incendie connues",
      "Pause(s) organisée(s), eau / café à disposition si prévu",
    ]},
    { titre: "5. Documents administratifs et qualité", items: [
      "Convocations envoyées et confirmées",
      "Livret d'accueil remis aux stagiaires",
      "Programme de formation remis (papier ou numérique)",
      "Règlement intérieur remis et expliqué",
      "Attestations d'assiduité / certificats de réalisation préparés en fin de session",
      "Traçabilité Qualiopi assurée (signatures, évaluations, comptes-rendus)",
    ]},
    { titre: "6. Posture du formateur", items: [
      "Ponctualité et tenue professionnelle",
      "Bienveillance, écoute active et neutralité",
      "Reformulation et vérification de la compréhension",
      "Encouragement à la participation et à la prise de parole",
      "Gestion des conflits / désaccords de manière constructive",
      "Respect de la confidentialité et du RGPD",
    ]},
    { titre: "7. Clôture de la formation", items: [
      "Synthèse des acquis présentée au groupe",
      "Remise des supports finaux et ressources complémentaires",
      "Information sur les suites de parcours / certifications possibles",
      "Collecte des bilans à chaud signés",
      "Remontée d'informations au responsable pédagogique (points forts / axes d'amélioration)",
    ]},
  ];

  const sectionsHtml = sections.map(sec => `
    <div class="section" style="margin-top:18px">
      <h3 style="border-bottom:2px solid #1e3a8a;padding-bottom:4px;color:#1e3a8a">${sec.titre}</h3>
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#1e3a8a;color:#fff">
            <th style="padding:6px;text-align:left;border:1px solid #1e3a8a;width:60%">Point de contrôle</th>
            <th style="padding:6px;text-align:center;border:1px solid #1e3a8a;width:8%">Conforme</th>
            <th style="padding:6px;text-align:center;border:1px solid #1e3a8a;width:8%">Non conforme</th>
            <th style="padding:6px;text-align:center;border:1px solid #1e3a8a;width:8%">N/A</th>
            <th style="padding:6px;text-align:left;border:1px solid #1e3a8a;width:16%">Observations</th>
          </tr>
        </thead>
        <tbody>
          ${sec.items.map((item, i) => `
            <tr style="background:${i % 2 === 0 ? "#f0f6ff" : "#ffffff"}">
              <td style="padding:6px;border:1px solid #cbd5e1">${item}</td>
              <td style="padding:6px;border:1px solid #cbd5e1;text-align:center;font-weight:bold;color:#16a34a">X</td>
              <td style="padding:6px;border:1px solid #cbd5e1;text-align:center">☐</td>
              <td style="padding:6px;border:1px solid #cbd5e1;text-align:center">☐</td>
              <td style="padding:6px;border:1px solid #cbd5e1">RAS</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `).join("");

  return buildDocument({
    org: o,
    title: "Checklist Formateur — Contrôle qualité de la prestation",
    subtitle: sessionLabel ? `${formateurNom} — ${f.intitule || ""} — ${sessionLabel}` : `${formateurNom} — ${f.intitule || ""}`,
    sections: [
      { heading: "Identification", content: `
        <p>
          <strong>Formateur :</strong> ${formateurNom}<br>
          <strong>Formation :</strong> ${f.intitule || "—"}<br>
          <strong>Période :</strong> du ${formatDate(sessDebut)} au ${formatDate(sessFin)}<br>
          <strong>Modalité :</strong> ${f.modalites || "Présentiel"}<br>
          <strong>Date de la checklist :</strong> ${dateDoc}
        </p>
        <p style="font-style:italic;color:#475569;font-size:12px">
          Cette checklist est complétée par le formateur en début et tout au long de la formation,
          puis transmise au responsable pédagogique pour archivage Qualiopi (Critère 6 — IND 27).
          Elle garantit la conformité de la prestation : respect du programme, des supports, des évaluations,
          du suivi des stagiaires et des conditions matérielles d'accueil.
        </p>
      ` },
    ],
    extraHtml: `
      ${sectionsHtml}
      <div class="section" style="margin-top:20px">
        <h3 style="color:#1e3a8a">Synthèse / commentaires libres du formateur</h3>
        <p>La formation s'est déroulée conformément au programme prévu. Les stagiaires ont été assidus,
        impliqués et les objectifs pédagogiques ont été atteints. Les supports, les évaluations et le
        suivi individualisé ont permis une progression mesurable. Aucune non-conformité majeure à signaler.
        Les conditions matérielles (salle, matériel, accueil) étaient conformes aux exigences qualité.</p>
      </div>
      <div class="signature-block-2" style="margin-top:25px">
        <div class="sig-box">
          <p class="sig-label">Le Formateur</p>
          <p>Nom : ${formateurNom}</p>
          <p>Date : ${dateSig}</p>
          <p style="margin-top:20px">Signature :</p>
          ${fmtSigUrl ? `<img src="${fmtSigUrl}" alt="Signature formateur" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />` : ""}
        </div>
        <div class="sig-box">
          <p class="sig-label">Le Responsable Pédagogique</p>
          <p>Nom : ${o.responsablePedagogique || o.dirigeant}</p>
          <p>Date : ${dateSig}</p>
          <p style="margin-top:20px">Cachet :</p>
          ${tamponHtml}
        </div>
      </div>
    `
  });
}

export function genCharteQualiteFormateurExterne(o: OrganismeInfo) {
  const dateMaj = (o as any).dateMaj ? new Date((o as any).dateMaj).toLocaleDateString("fr-FR") : new Date().toLocaleDateString("fr-FR");
  const tamponHtml = o.tamponUrl ? `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />` : "";
  return buildDocument({ org: o, title: "Charte Qualité Formateur externe", sections: [
    { heading: "", content: `<p>Dans le cadre de la sous-traitance des actions de formation, pour chaque prestation de formation,</p><p><strong>Le Partenaire :</strong></p><ul><li>S'engage au respect du Référentiel national qualité QUALIOPI.</li><li>Le Partenaire devra s'informer des mises à jour et s'y conformer.</li></ul>` },
  ], extraHtml: `<div class="signature-block-2">
    <div class="sig-box"><p class="sig-label">Pour le partenaire</p><p>Nom : ________________________</p><p>Date : ________________________</p><p style="margin-top:20px">Signature :</p></div>
    <div class="sig-box"><p class="sig-label">Pour ${o.nom}</p><p>Nom : ${o.dirigeant}</p><p>Date : ${dateMaj}</p>${tamponHtml}</div>
  </div>` });
}
