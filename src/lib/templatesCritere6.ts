// Critère 6 — IND 23-27 generators (based on real SELECT FORMATION documents)
import { OrganismeInfo, FormationInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, subtractBusinessDays } from "./docBuilder";

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
type FormationType = "fle" | "ia" | "word" | "commercial" | "webmarketing" | "crm" | "anglais" | "massage" | "esthetique" | "secretaire" | "management" | "ecsr";

function detectFormationType(f: FormationInfo): FormationType {
  const title = (f.intitule || "").toLowerCase();
  const code = (f.codeRNCP || "").toLowerCase();
  if (title.includes("conduite") || title.includes("ecsr") || title.includes("enseignant de la conduite") || code.includes("35329")) return "ecsr";
  if (title.includes("français") || title.includes("fle") || title.includes("social") || title.includes("médico") || title.includes("medico") || title.includes("communiquer en français")) return "fle";
  if (title.includes("massage") || title.includes("prénatal") || title.includes("prenatal") || title.includes("relaxation") || title.includes("bien-être") || title.includes("bien être")) return "massage";
  if (title.includes("esthéti") || title.includes("cosmétique") || title.includes("parfumerie") || title.includes("beauté")) return "esthetique";
  if (title.includes("secrétaire") || title.includes("assistant") || title.includes("médico-admin")) return "secretaire";
  if (title.includes("management") || title.includes("encadrement") || title.includes("leadership") || title.includes("manager")) return "management";
  if (title.includes("intelligence artificielle") || title.includes("ia générative") || title.includes("ia ") || title.includes("contenus rédactionnels") || title.includes("chatgpt") || title.includes("prompt")) return "ia";
  if (title.includes("crm") || title.includes("automation") || title.includes("automatisation")) return "crm";
  if (title.includes("webmarketing") || title.includes("marketing de contenus") || title.includes("réseaux sociaux") || title.includes("marketing digital")) return "webmarketing";
  if (title.includes("anglais") || title.includes("english") || title.includes("toeic") || title.includes("vtest") || title.includes("v-test") || title.includes("rs6905")) return "anglais";
  if (title.includes("commercial") || title.includes("conseiller") || title.includes("négociat") || title.includes("vente") || title.includes("relation client") || title.includes("prospection")) return "commercial";
  return "word";
}

// ===== IND 23 — VEILLE RÉGLEMENTAIRE =====

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
      `<a href="https://www.dendreo.com/blog/veille-legale-et-reglementaire-de-la-formation-professionnelle-recap-des-actualites-2025">Dendreo – Décret RNCP/RS</a>`,
      "Modification des critères d'enregistrement au RNCP et au RS",
      veilleDate(f, 5),
      "Décret — Obligation d'intégrer dans les référentiels les compétences liées aux transitions écologique et numérique.",
      "Preuve: Nous veillerons à être conforme suite au décret. Nous nous sommes rapprochés du certificateur ICDL pour une formation Word."
    ],
    [
      `<a href="https://www.centre-inffo.fr/site-droit-formation/actualites-droit/cpf-hausse-du-montant-de-la-participation-forfaitaire">Centre Inffo – CPF</a>`,
      "CPF : Hausse du montant de la participation forfaitaire",
      veilleDate(f, 3),
      "La participation financière obligatoire pour l'achat d'une formation mobilisant le CPF s'élève à 103,20 euros.",
      "Preuve: Informer les futurs apprenants de la hausse du ticket modérateur à 103,20 euros."
    ],
  ];
}

export function genVeilleReglementaireV2(o: OrganismeInfo, f: FormationInfo) {
  const type = detectFormationType(f);
  return buildDocument({ org: o, title: "Veille réglementaire", table: {
    headers: ["Liens", "Nom de l'article / Texte", "Date du texte", "Commentaire", "Exploitation de veille (preuve + action Qualiopi)"],
    rows: veilleReglementaireRows(f, type)
  } });
}

// ===== IND 24 — TABLEAU DE VEILLE MÉTIER =====

function veilleMetierRows(f: FormationInfo, type: FormationType): string[][] {
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

  // Default: word/bureautique
  return [
    [
      `<a href="https://propulsandgo.com/blog/top-5-formations-bureautique-paris-2025">propulsandgo.com</a>`,
      "Top 5 des formations bureautiques à Paris",
      veilleMonthYear(f, 8),
      "Montre que Word et Pack Office restent des compétences clés en entreprise. Forte demande CPF.",
      "Preuve : lien + capture écran. Action : positionnement de la formation Word comme compétence métier indispensable."
    ],
    [
      `<a href="https://nouvelle-donne-formation.org/et-si-vous-vous-formiez-en-bureautique">nouvelle-donne-formation.org</a>`,
      "Se former en bureautique : Word, Excel, PowerPoint",
      veilleMonthYear(f, 7),
      "Confirme la pertinence des formations bureautiques pour l'employabilité et la reconversion professionnelle.",
      "Action Qualiopi : ajustement du public visé et des objectifs pédagogiques en lien avec l'emploi (critère 2)."
    ],
    [
      `<a href="https://capcours-abdformations.com/formation-word-pack-office">capcours-abdformations.com</a>`,
      "Pourquoi apprendre Word aujourd'hui ?",
      veilleYear(f, 6),
      "Met en avant l'usage professionnel réel de Word : mise en page, documents normés, efficacité.",
      "Action : renforcement des cas pratiques professionnels (courrier, rapport, document administratif)."
    ],
    [
      `<a href="https://www.microsoft.com/ignite">microsoft.com/ignite</a>`,
      "Microsoft Ignite (événement officiel)",
      veilleMonthYear(f, 4),
      "Conférence majeure Microsoft : intégration massive de l'IA (Copilot) dans Word et Office 365.",
      "Preuve : programme Ignite + vidéos. Action : ajout d'un module « Découverte IA dans Word »."
    ],
    [
      `<a href="https://www.youtube.com/watch?v=sBkfzCiD0BI">YouTube – Ignite Highlights</a>`,
      "Microsoft Ignite – Highlights & Copilot",
      veilleYear(f, 4),
      "Présentation des nouveautés Word : aide à la rédaction, reformulation, automatisation.",
      "Action Qualiopi : adaptation du contenu pédagogique Word aux nouvelles fonctionnalités (critère 6)."
    ],
    [
      `<a href="https://www.edutech.com">edutech.com</a>`,
      "Salon EduTECH (Formation & digital)",
      veilleYear(f, 3),
      "Salon international sur l'évolution des outils pédagogiques et numériques.",
      "Preuve : site événement. Action : réflexion sur pédagogie active et outils numériques."
    ],
  ];
}

export function genVeilleMetierV2(o: OrganismeInfo, f: FormationInfo) {
  const type = detectFormationType(f);
  return buildDocument({ org: o, title: "Tableau de veille métier", table: {
    headers: ["Lien (article / vidéo / événement)", "Nom de l'article / Vidéo / Événement", "Date", "Commentaire – Analyse métier", "Exploitation de veille (preuve + action Qualiopi)"],
    rows: veilleMetierRows(f, type)
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

  // Default: word/bureautique
  return [...commonDigitalLearning,
    [
      `<a href="https://www.learningtechnologiesfrance.com/">learningtechnologiesfrance.com</a>`,
      "Learning Technologies France – Événement technologie & formation",
      veilleYear(f, 7),
      "Principal salon français des technologies pour la formation (IA, EdTech, plateformes, LMS).",
      "Preuve : programme + certificat de participation. Action Qualiopi : participer au salon / CR + plan adoption tech."
    ],
    [
      `<a href="https://www.centre-inffo.fr/site-centre-inffo/actualites-centre-inffo/6e-edition-du-barom%C3%A8tre-de-la-formation-et-de-l%E2%80%99emploi-2025">Centre Inffo – Baromètre</a>`,
      "Baromètre formation & emploi – IA et compétences",
      veilleDate(f, 8),
      "Indique que l'IA est un levier majeur intégré dans les attentes des actifs, avec implications sur les compétences & E-learning.",
      "Preuve : infographie / PDF baromètre. Action Qualiopi : intégrer résultats dans analyse des besoins."
    ],
    [
      `<a href="https://fr.linkedin.com/posts/centre-inffo_lia-en-formation-professionnelle-innovation-activity-7316747080062951424-7ws1">LinkedIn – Centre Inffo IA</a>`,
      "Post Centre Inffo – IA & innovation en formation",
      veilleYear(f, 5),
      "Publication LinkedIn sur l'intégration de l'IA dans les pratiques de formation.",
      "Preuve : capture écran + URL. Action Qualiopi : preuve de veille mensuelle."
    ],
    [
      `<a href="https://www.centre-inffo.fr/site-centre-inffo/actualites-centre-inffo/articles-2025/lia-dans-la-formation-professionnelle-opportunite-ou-revolution">Centre Inffo – Article IA</a>`,
      "L'IA dans la formation professionnelle : opportunité ou révolution ?",
      veilleDate(f, 5),
      "Article Centre Inffo sur place de l'IA (personnalisation, automatisation des parcours).",
      "Preuve : PDF article + note interne. Action Qualiopi : mise à jour de la politique pédagogique."
    ],
    [
      `<a href="https://www.talenco.com/nos-publications/barometre-formation-professionnelle-tendances-pratiques-2025/">TalenCo – Baromètre</a>`,
      "Baromètre formation professionnelle tendances",
      veilleDate(f, 3),
      "Synthèse des pratiques et attentes digitales dans la formation.",
      "Preuve : PDF baromètre + résumés. Action Qualiopi : alignement offre/compétences sur tendances numériques."
    ],
  ];
}

export function genVeilleTechnologiqueV2(o: OrganismeInfo, f: FormationInfo) {
  const type = detectFormationType(f);
  return buildDocument({ org: o, title: "Tableau de veille technologique", table: {
    headers: ["Lien (vrai)", "Nom / Titre de l'article", "Date", "Commentaire (veille technologique)", "Exploitation de veille vérifiable (preuve + action Qualiopi)"],
    rows: veilleTechnoRows(f, type)
  } });
}

// ===== IND 26 — VEILLE HANDICAP =====

export function genVeilleHandicap(o: OrganismeInfo, f?: FormationInfo) {
  const fi = f || { dateDebut: new Date().toISOString().split("T")[0] } as FormationInfo;
  return buildDocument({ org: o, title: "Tableau de veille handicap", table: {
    headers: ["Lien", "Nom de l'article / Texte", "Date", "Commentaire – Analyse handicap", "Exploitation de veille (preuve + action Qualiopi)"],
    rows: [
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
      <p>Numéro de Déclaration d'Activité (NDA) : ${o.nda}</p>
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
      <p>Le Donneur d'ordre, <strong>${o.nom}</strong>, est un organisme de formation professionnelle déclaré auprès de la DREETS sous le numéro ${o.nda}.</p>
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
        <tr><td><strong>Intitulé de la formation</strong></td><td>${f.intitule}</td></tr>
        <tr><td><strong>Type de formation</strong></td><td>Formation en Langue Française – Français Langue Étrangère (FLE)</td></tr>
        <tr><td><strong>Public visé</strong></td><td>Adultes</td></tr>
        <tr><td><strong>Durée totale</strong></td><td>À définir selon le groupe</td></tr>
        <tr><td><strong>Dates prévisionnelles</strong></td><td>Sessions : Dates individuelles par stagiaire</td></tr>
        <tr><td><strong>Modalités</strong></td><td>${f.modalites || "Présentiel et/ou distanciel (à adapter selon les besoins)"}</td></tr>
        <tr><td><strong>Lieu de formation</strong></td><td>${f.lieu || `${o.adresse}, ${o.codePostal} ${o.ville}`}</td></tr>
        <tr><td><strong>Horaires</strong></td><td>De 9h00 à 12h30 et de 13h30 à 17h00</td></tr>
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
