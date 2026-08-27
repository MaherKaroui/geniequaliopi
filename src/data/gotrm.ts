/**
 * Référentiel officiel du Titre professionnel
 * « Gestionnaire des opérations de transport routier de marchandises » (GOTRM)
 *
 * Source : REAC + RE validés le 16/06/2025 — Arrêté du 03/06/2025 (JO du 14/06/2025).
 * Les libellés sont repris tels quels et ne doivent pas être reformulés.
 */

export interface GotrmTitreInfo {
  intitule: string;
  sigle: string;
  codeTitre: string;
  millesime: string;
  niveau: string;
  cadre: string;
  rncp: string;
  nsf: string;
  rome: string[];
  arrete: string;
  jo: string;
  dateEffet: string;
  referentiels: string;
}

export const GOTRM_TITRE: GotrmTitreInfo = {
  intitule: "Gestionnaire des opérations de transport routier de marchandises",
  sigle: "GOTRM",
  codeTitre: "TP-01329",
  millesime: "03",
  niveau: "Niveau 5",
  cadre: "CNC 2019",
  rncp: "RNCP40990",
  nsf: "311n",
  rome: ["N1207", "N4203", "N4201", "N1201"],
  arrete: "Arrêté du 03/06/2025",
  jo: "JO du 14/06/2025",
  dateEffet: "24/08/2025",
  referentiels: "REAC + RE, validés le 16/06/2025",
};

export interface GotrmEpreuveItem {
  code: string;
  libelle: string;
  duree: string;
  precisions: string;
}

export const GOTRM_DUREE_TOTALE = "12h00 par candidat";

export const GOTRM_EPREUVES: GotrmEpreuveItem[] = [
  {
    code: "MSP",
    libelle: "Mise en situation professionnelle",
    duree: "10h00",
    precisions:
      "En 2 parties de 5h00 sur 2 jours distincts (les deux parties ne peuvent pas être planifiées le même jour). Travail sur poste informatique : production d'un dossier technique sous Word incluant des travaux sous Excel. Présence du jury non requise, candidats sous surveillance. Accès internet limité à la consultation des textes législatifs et réglementaires. Fichiers informatiques personnels interdits.",
  },
  {
    code: "ET",
    libelle: "Entretien technique",
    duree: "1h00",
    precisions: "Après la mise en situation professionnelle, dont 20 min de préparation non décomptées.",
  },
  {
    code: "QP",
    libelle: "Questionnement à partir de production(s)",
    duree: "30 min",
    precisions: "Portant sur les productions du candidat.",
  },
  {
    code: "EF",
    libelle: "Entretien final",
    duree: "30 min",
    precisions: "Entretien final avec le jury.",
  },
];

export const GOTRM_MSP_PARTIES = [
  { code: "MSP1", libelle: "MSP partie 1", duree: "5h00", perimetre: "CCP1" },
  { code: "MSP2", libelle: "MSP partie 2", duree: "5h00", perimetre: "CCP2 + CCP3" },
] as const;

export interface GotrmCompetence {
  code: string;
  libelle: string;
  modalite: string;
  support: string;
  criteres: string[];
}

export interface GotrmCCP {
  code: string;
  libelle: string;
  competences: GotrmCompetence[];
}

export const GOTRM_CCP: GotrmCCP[] = [
  {
    code: "CCP1",
    libelle:
      "Concevoir, organiser, mettre en œuvre et piloter des prestations de transport routier de marchandises jusqu'à la clôture des dossiers",
    competences: [
      {
        code: "CP1",
        libelle:
          "Étudier la faisabilité des demandes de transport, y compris affrétées, les tarifer et transmettre par écrit une proposition technique détaillée au donneur d'ordres",
        modalite: "MSP partie 1 + entretien technique",
        support: "AC1 / DOSSIER_1",
        criteres: [
          "Les caractéristiques des demandes sont identifiées",
          "La faisabilité de la commande est vérifiée en fonction des contraintes et des impératifs",
          "Les réglementations liées au transport sont respectées",
          "Le choix organisationnel répond aux demandes",
          "Les méthodes de calcul de prix sont appliquées et en cohérence avec les différentes références tarifaires ou les exigences de rentabilité",
          "L'offre de prix est formalisée de manière détaillée et transmise sur un support adapté dans le respect des dispositions prévues par le code des transports",
          "L'offre détaille les moyens techniques mis en œuvre et les différentes étapes de l'organisation",
        ],
      },
      {
        code: "CP2",
        libelle:
          "Affecter, affréter et planifier les moyens adaptés à la réalisation des opérations de transport routier de marchandises",
        modalite: "MSP partie 1",
        support: "AC1 / DOSSIER_2",
        criteres: [
          "Le choix des sous-traitants ponctuels est adapté aux contraintes des commandes",
          "Les contraintes des commandes sont prises en compte dans le choix des moyens humains et matériels de l'entreprise",
          "Les situations de handicap sont prises en compte lors des affectations des opérations de transport",
          "Les opérations sont reportées sur le planning conformément aux procédures et aux affectations",
          "Les affectations respectent les réglementations des transports",
          "Le contrôle de la situation administrative du sous-traitant est effectué et la hiérarchie est alertée en cas de non-conformité",
        ],
      },
      {
        code: "CP3",
        libelle: "Encadrer au quotidien une équipe de conducteurs dans le respect des réglementations en vigueur",
        modalite: "MSP partie 1",
        support: "AC1 / DOSSIER_3",
        criteres: [
          "Les instructions sont correctement transmises au regard des réglementations sociales des transports et des règles de sécurité et de sûreté",
          "Les plans de marche des conducteurs sont conformes aux procédures internes et à toute réglementation sociale en vigueur",
          "Les données issues des relevés des temps de service, les temps de conduite et de repos sont contrôlés et les anomalies repérées",
          "La hiérarchie est alertée en cas d'anomalie ou d'infraction sur les temps de service, les temps de conduite et de repos ou de non-respect des consignes de la part d'un conducteur",
          "Les conducteurs sont informés des obligations réglementaires et des conséquences en cas de non-respect de celles-ci",
          "Les documents de bord sont vérifiés et conformes",
        ],
      },
      {
        code: "CP4",
        libelle:
          "Coordonner l'exécution de chaque opération de transport, renseigner les tableaux de suivi et contrôler le respect des objectifs qualité et de rentabilité fixés par l'entreprise",
        modalite: "Questionnement à partir de production(s), 30 min",
        support: "AC1 / DOSSIER_4",
        criteres: [
          "Les tableaux de suivi des opérations sont renseignés",
          "La solution de substitution en cas d'aléas ou d'imprévus est pertinente",
          "Les interlocuteurs concernés sont identifiés et informés",
          "Le choix du rechargement est économiquement pertinent et respecte l'organisation de l'entreprise",
          "Les réserves sur les documents de transport sont correctement identifiées et les documents transmis aux services concernés",
          "Les indicateurs de rentabilité et de qualité sont relevés",
          "Les objectifs fixés par l'entreprise sont contrôlés et la hiérarchie est alertée en cas d'anomalies",
        ],
      },
    ],
  },
  {
    code: "CCP2",
    libelle: "Piloter les trafics réguliers sous contrat de sous-traitance",
    competences: [
      {
        code: "CP5",
        libelle: "Négocier et contractualiser les opérations de transport régulièrement sous-traitées",
        modalite: "MSP partie 2",
        support: "AC2 / DOSSIER_1",
        criteres: [
          "Le tarif négocié avec la sous-traitance satisfait aux objectifs de rentabilité de l'entreprise",
          "Les éléments rédigés en anglais sont pris en compte",
          "Le cahier des charges est établi en tenant compte des besoins de l'activité et inclut toutes les informations réglementaires prévues par le contrat type de sous-traitance",
          "La formalisation du contrat commercial respecte les dispositions du contrat type de sous-traitance",
        ],
      },
      {
        code: "CP6",
        libelle: "Superviser les opérations de traction, groupage, dégroupage ou camionnage",
        modalite: "MSP partie 2",
        support: "AC2 / DOSSIER_2",
        criteres: [
          "Les positions en arrivage sont affectées aux véhicules de distribution correspondants",
          "Les tournées régulières de livraison et de ramasse sont optimisées",
          "Les tournées respectent la réglementation des transports",
          "Les envois sont affectés aux tractions correspondantes",
          "Les bordereaux de groupage sont complets et conformes aux envois en départ",
        ],
      },
      {
        code: "CP7",
        libelle: "Assurer le service après-vente des opérations de livraisons et de retours de marchandises",
        modalite: "MSP partie 2 + entretien technique",
        support: "AC2 / DOSSIER_3",
        criteres: [
          "Les requêtes ou réclamations des clients sont vérifiées et traitées",
          "Les litiges sont pris en compte et transmis aux services concernés",
          "Le suivi administratif des supports de charge consignés est assuré",
          "Les opérations de retour de marchandises sont traitées",
        ],
      },
    ],
  },
  {
    code: "CCP3",
    libelle: "Optimiser l'ensemble des moyens liés à l'activité de transport",
    competences: [
      {
        code: "CP8",
        libelle: "Animer et superviser l'activité du personnel du service exploitation",
        modalite: "MSP partie 2 + entretien technique",
        support: "AC2 / DOSSIER_4 + DOSSIER_5",
        criteres: [
          "Le programme Qualité de Vie et Conditions de Travail (QVCT) de l'entreprise est mis en œuvre",
          "Le choix des actions de formation proposées aux équipes est pertinent",
          "Les formations réglementaires obligatoires sont organisées et planifiées",
          "Les besoins de recrutement en personnel sont anticipés et proposés à la hiérarchie",
          "Les calculs des éléments variables de l'annexe au bulletin de salaire sont conformes aux activités des conducteurs",
        ],
      },
      {
        code: "CP9",
        libelle:
          "Reconstituer les indicateurs de performance de l'activité globale et, si besoin, préconiser des mesures correctives",
        modalite: "MSP partie 2",
        support: "AC2 / DOSSIER_6",
        criteres: [
          "Les coûts d'exploitation sont reconstitués de façon précise et fiable",
          "La comparaison avec les indices professionnels de référence est effectuée",
          "Les seuils de rentabilité des prestations sont correctement déterminés et analysés",
          "Les ratios financiers sont correctement déterminés et analysés",
          "Les causes exerçant une influence sur les coûts d'exploitation sont repérées",
          "Les mesures correctives préconisées à la hiérarchie sont pertinentes",
        ],
      },
    ],
  },
];

export const GOTRM_COMPETENCES_TRANSVERSALES: string[] = [
  "Assurer une veille réglementaire professionnelle",
  "Combiner différents paramètres chiffrés durant toute son activité",
  "Communiquer par écrit et oralement avec l'ensemble des interlocuteurs internes ou externes en utilisant le vocabulaire technique du transport de marchandises",
  "Mobiliser un comportement orienté client et une posture de service",
  "Organiser son activité en s'adaptant rapidement aux priorités du service exploitation",
  "Utiliser les technologies de l'information et les outils numériques dédiés au transport dans le respect de la réglementation et des recommandations de l'ANSSI",
];

export interface GotrmMatriceFichier {
  ac: "AC1" | "AC2";
  dossier: string;
  fichier: string;
  cp: string;
  ccp: string;
}

const AC1_FILES: string[] = [
  "DOSSIER_1_FAISABILITE_COMMANDES.xlsx",
  "DOSSIER_1_MEMO_DIRECTION.doc",
  "DOSSIER_1_OFFRE_DE_PRESTATION_CLIENT_1.docx",
  "DOSSIER_1_OFFRE_DE_PRESTATION_CLIENT_2.docx",
  "DOSSIER_1_PREVISIONNEL_RENTABILITE.xlsx",
  "DOSSIER_1_REPONSE_CLIENT.docx",
  "DOSSIER_2_CONFIRMATION_AFFRETEMENT.xlsx",
  "DOSSIER_2_DOCUMENTS_DE_BORD.xlsx",
  "DOSSIER_2_GRILLE_TEMPS_SERVICE.xlsx",
  "DOSSIER_2_ORDRE_DE_MISSION.xlsx",
  "DOSSIER_3_MEMO_HIERARCHIE.doc",
  "DOSSIER_3_PLANNING_HEBDO.xlsx",
  "DOSSIER_4_DONNEES_SOCIALES_LAVAL.xlsx",
  "DOSSIER_4_MEMO_HIERARCHIE.doc",
  "DOSSIER_4_NOTE_DE_SERVICE.doc",
];

const AC2_FILES: string[] = [
  "DOSSIER_1_ANALYSE_AO.xlsx",
  "DOSSIER_1_DOCUMENT_PRECONTRACTUEL.docx",
  "DOSSIER_2_GROUPAGES_TRACTIONS.xlsx",
  "DOSSIER_2_TOURNEES_PHARMACIES.xlsx",
  "DOSSIER_3_RECLAMATIONS_AVARIES.xlsx",
  "DOSSIER_3_SUPPORTS_CONSIGNES.xlsx",
  "DOSSIER_4_MEMO_DIRECTION.doc",
  "DOSSIER_4_PLANNING_FORMATIONS.xlsx",
  "DOSSIER_4_TS_PERSONNEL.xlsx",
  "DOSSIER_5_PRE-PAIE.xlsx",
  "DOSSIER_6_COUTS_REVIENT.xlsx",
  "DOSSIER_6_INDICATEURS_CNR.xlsx",
  "DOSSIER_6_MEMO_SIG.doc",
];

/** Mappe un nom de fichier (AC + n° de dossier) vers le CP et le CCP évalués */
function mapDossier(ac: "AC1" | "AC2", dossier: string): { cp: string; ccp: string } {
  const table: Record<string, { cp: string; ccp: string }> = {
    "AC1|DOSSIER_1": { cp: "CP1", ccp: "CCP1" },
    "AC1|DOSSIER_2": { cp: "CP2", ccp: "CCP1" },
    "AC1|DOSSIER_3": { cp: "CP3", ccp: "CCP1" },
    "AC1|DOSSIER_4": { cp: "CP4", ccp: "CCP1" },
    "AC2|DOSSIER_1": { cp: "CP5", ccp: "CCP2" },
    "AC2|DOSSIER_2": { cp: "CP6", ccp: "CCP2" },
    "AC2|DOSSIER_3": { cp: "CP7", ccp: "CCP2" },
    "AC2|DOSSIER_4": { cp: "CP8", ccp: "CCP3" },
    "AC2|DOSSIER_5": { cp: "CP8", ccp: "CCP3" },
    "AC2|DOSSIER_6": { cp: "CP9", ccp: "CCP3" },
  };
  return table[`${ac}|${dossier}`] ?? { cp: "", ccp: "" };
}

function buildMatrice(ac: "AC1" | "AC2", files: string[]): GotrmMatriceFichier[] {
  return files.map((fichier) => {
    const dossier = fichier.match(/^DOSSIER_\d+/)?.[0] ?? "";
    const { cp, ccp } = mapDossier(ac, dossier);
    return { ac, dossier, fichier, cp, ccp };
  });
}

export const GOTRM_MATRICE_DTE: GotrmMatriceFichier[] = [
  ...buildMatrice("AC1", AC1_FILES),
  ...buildMatrice("AC2", AC2_FILES),
];

export const GOTRM_TOTAL_CRITERES = GOTRM_CCP.reduce(
  (n, ccp) => n + ccp.competences.reduce((m, cp) => m + cp.criteres.length, 0),
  0,
);

export type GotrmParcours = "Formation continue" | "VAE" | "Capitalisation de CCP";

export const GOTRM_PARCOURS: GotrmParcours[] = ["Formation continue", "VAE", "Capitalisation de CCP"];
