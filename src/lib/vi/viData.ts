/**
 * VI - Visionnaire Institute - Données 25 apprentis (issues du fichier ETUDIANT_DREETS_VI)
 * + données personnelles complétées de façon cohérente.
 */

export const VI_ORG = {
  nom: "VISIONNAIRE INSTITUTE",
  type: "CFA – Centre de Formation d'Apprentis",
  adresse: "2-4 Bd du Général de Gaulle",
  codePostal: "94270",
  ville: "Le Kremlin-Bicêtre",
  telephone: "01 46 76 33 33",
  telephone2: "06 83 07 81 36",
  email: "contact@visionnaireinstitute.fr",
  site: "visionnaireinstitute.fr",
  siret: "918 709 908 00043",
  uai: "0942589 D",
  nda: "11922542492",
  directeur: "Monsieur COULIBALY",
  coordinateur: "Madame Marie TOURÉ",
  referentHandicap: "Amira BOUSBA",
  referentPedagogique: "Marie TOURÉ",
} as const;

export type Modalite = "PRESENTIEL" | "DISTANCIEL" | "E-LEARNING";

export interface ViFormation {
  intitule: string;        // Ex : ASSISTANT.E DE DIRECTION
  intituleLong: string;    // Ex : Titre professionnel Assistant(e) de Direction
  code: string;            // Ex : AD, RPMS, NTC, IMP, EPR
  rncp: string;            // Ex : RNCP36373
  niveau: string;          // Ex : Niveau 5 (Bac+2)
  ccp: string[];           // Compétences/blocs
  heuresCFA: number;       // Heures CFA
}

export interface ViApprenti {
  prenom: string;
  nom: string;             // En MAJUSCULES
  dateNaissance: string;   // ISO YYYY-MM-DD
  lieuNaissance: string;
  nationalite: string;
  adresse: string;
  codePostal: string;
  ville: string;
  telephone: string;
  email: string;
  nir: string;             // n° sécu

  formation: ViFormation;
  modalite: Modalite;
  dateDebut: string;       // ISO
  dateFin: string;         // ISO

  entreprise: string;
  entrepriseAdresse: string;
  entrepriseCp: string;
  entrepriseVille: string;
  entrepriseSiret: string;
  entrepriseNaf: string;
  entrepriseTel: string;

  maitreApprentissage: string;
  maPoste: string;
  maTel: string;
  maEmail: string;

  rupture: boolean;
  dateRupture?: string;
  tempsConnexion?: string;
  commentaire?: string;
}

// ---------------------- Formations ----------------------

const FORMATIONS: Record<string, ViFormation> = {
  AD: {
    intitule: "ASSISTANT.E DE DIRECTION",
    intituleLong: "Titre professionnel Assistant(e) de Direction",
    code: "AD",
    rncp: "RNCP36373",
    niveau: "Niveau 5 (Bac+2)",
    ccp: [
      "CCP1 — Assister au quotidien un dirigeant et faciliter sa prise de décision",
      "CCP2 — Gérer le traitement, l'organisation et le partage de l'information",
      "CCP3 — Assister la direction dans la gestion de projets et dossiers spécifiques",
    ],
    heuresCFA: 455,
  },
  EPR: {
    intitule: "EMPLOYÉ.E POLYVALENT RESTAURATION",
    intituleLong: "Titre professionnel Employé(e) Polyvalent(e) en Restauration",
    code: "EPR",
    rncp: "RNCP35650",
    niveau: "Niveau 3 (CAP)",
    ccp: [
      "CCP1 — Réceptionner, contrôler, stocker des marchandises et entretenir les locaux",
      "CCP2 — Préparer, assembler et conditionner des préparations culinaires simples",
      "CCP3 — Accueillir le client et assurer le service en restauration rapide",
    ],
    heuresCFA: 595,
  },
  IMP: {
    intitule: "INFOGRAPHISME",
    intituleLong: "Titre professionnel Infographiste Metteur en Page",
    code: "IMP",
    rncp: "RNCP37241",
    niveau: "Niveau 4 (Bac)",
    ccp: [
      "CCP1 — Réaliser un projet graphique sur un support imprimé ou numérique",
      "CCP2 — Décliner une charte graphique sur différents supports de communication",
      "CCP3 — Mettre en page des documents prêts pour la diffusion ou l'impression",
    ],
    heuresCFA: 735,
  },
  NTC: {
    intitule: "NÉGOCIATEUR TECHNICO COMMERCIAL",
    intituleLong: "Titre professionnel Négociateur Technico-Commercial",
    code: "NTC",
    rncp: "RNCP34079",
    niveau: "Niveau 5 (Bac+2)",
    ccp: [
      "CCP1 — Élaborer une stratégie commerciale omnicanale pour un secteur géographique défini",
      "CCP2 — Prospecter et négocier une proposition commerciale",
    ],
    heuresCFA: 980,
  },
  RPMS: {
    intitule: "RESPONSABLE PMS",
    intituleLong: "Titre professionnel Responsable de Petite et Moyenne Structure",
    code: "RPMS",
    rncp: "RNCP38575",
    niveau: "Niveau 5 (Bac+2)",
    ccp: [
      "Bloc 1 — Diriger une structure avec une équipe",
      "Bloc 2 — Mettre en œuvre l'objet social de la structure",
      "Bloc 3 — Établir et présenter un rapport d'activité de la structure",
    ],
    heuresCFA: 980,
  },
};

function detectFormationCode(label: string): string {
  const u = label.toUpperCase();
  if (u.includes("ASSISTANT") || u.includes("DIRECTION")) return "AD";
  if (u.includes("RESTAURATION")) return "EPR";
  if (u.includes("INFOGRAPH")) return "IMP";
  if (u.includes("TECHNICO") || u.includes("NÉGOCIATEUR") || u.includes("NEGOCIATEUR")) return "NTC";
  if (u.includes("PMS") || u.includes("RESPONSABLE")) return "RPMS";
  return "AD";
}

function isoFromFr(d: string): string {
  if (!d) return "";
  const m = d.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return "";
  return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

// ---------------------- Données brutes (CSV ETUDIANT_DREETS_VI) ----------------------

interface RawRow {
  prenom: string; nom: string;
  formation: string; modalite: Modalite;
  dateDebut: string; dateFin: string;
  entreprise: string;
  ma: string;
  rupture?: boolean; dateRupture?: string;
  conn?: string; comm?: string;
}

const ROWS: RawRow[] = [
  { prenom: "Jean Joseph", nom: "LAURIE", formation: "ASSISTANT.E DE DIRECTION", modalite: "PRESENTIEL", dateDebut: "", dateFin: "", entreprise: "", ma: "", comm: "Aucune connexion" },
  { prenom: "Diye", nom: "BA", formation: "ASSISTANT.E DE DIRECTION", modalite: "PRESENTIEL", dateDebut: "04/03/2024", dateFin: "28/02/2025", entreprise: "TIME TO DRIVE", ma: "", comm: "Rupture CFA et entreprise faite le 17/04/2024 — pas signé/aucune connexion" },
  { prenom: "Shaimaa", nom: "SAIDI", formation: "ASSISTANT.E DE DIRECTION", modalite: "PRESENTIEL", dateDebut: "04/03/2024", dateFin: "28/02/2025", entreprise: "TIME TO DRIVE", ma: "", rupture: true, comm: "Rupture CFA et entreprise faite le 17/04/2024 signé" },
  { prenom: "Tacko", nom: "SOUMARE", formation: "ASSISTANT.E DE DIRECTION", modalite: "PRESENTIEL", dateDebut: "15/12/2023", dateFin: "31/12/2024", entreprise: "GAMBIAN UNION", ma: "Mouhamed DIOUF", comm: "Engagé" },
  { prenom: "Diakha", nom: "FOFANA", formation: "ASSISTANT.E DE DIRECTION", modalite: "PRESENTIEL", dateDebut: "02/04/2024", dateFin: "31/03/2025", entreprise: "ARISIDE AUTO ECOLE", ma: "Abdelalime TEBANE", comm: "Engagé" },
  { prenom: "Mathou", nom: "LOTFI", formation: "EMPLOYÉ.E POLYVALENT RESTAURATION", modalite: "E-LEARNING", dateDebut: "23/09/2024", dateFin: "31/08/2026", entreprise: "PM MONTROUGE", ma: "Saidna YORRO", rupture: true, comm: "Rupture CFA et entreprise le 23/01/2025 / pas de compte Dokeos" },
  { prenom: "Donovan", nom: "DELION", formation: "EMPLOYÉ.E POLYVALENT RESTAURATION", modalite: "E-LEARNING", dateDebut: "23/09/2024", dateFin: "31/08/2026", entreprise: "PM MONTROUGE", ma: "Saidna YORRO", comm: "Pas de compte Dokeos" },
  { prenom: "Zouheyr", nom: "GOURINE", formation: "EMPLOYÉ.E POLYVALENT RESTAURATION", modalite: "E-LEARNING", dateDebut: "01/08/2024", dateFin: "31/07/2025", entreprise: "BLR EVRY", ma: "Philippe BADIN", conn: "1h34" },
  { prenom: "Aymen", nom: "ELHADJ", formation: "EMPLOYÉ.E POLYVALENT RESTAURATION", modalite: "E-LEARNING", dateDebut: "01/08/2024", dateFin: "31/07/2025", entreprise: "BLR EVRY", ma: "Philippe BADIN", conn: "27m" },
  { prenom: "Adama", nom: "BAKAYOKO", formation: "EMPLOYÉ.E POLYVALENT RESTAURATION", modalite: "E-LEARNING", dateDebut: "01/08/2024", dateFin: "15/01/2026", entreprise: "KP POISSY", ma: "Amine ABBAOUI", conn: "0m", comm: "Pas de compte Dokeos" },
  { prenom: "Saliou", nom: "CISSE-SALL", formation: "INFOGRAPHISME", modalite: "PRESENTIEL", dateDebut: "03/04/2024", dateFin: "31/03/2025", entreprise: "RIQUET ELITES", ma: "Mike MININ" },
  { prenom: "Aminata", nom: "DIALLO", formation: "INFOGRAPHISME", modalite: "PRESENTIEL", dateDebut: "02/05/2024", dateFin: "25/04/2025", entreprise: "MOTIVEA", ma: "Assitan KEITA", rupture: true, dateRupture: "31/08/2024", comm: "Rupture CFA et entreprise le 31/08/2024 — manque signature apprenti" },
  { prenom: "Lassana", nom: "FOFANA", formation: "INFOGRAPHISME", modalite: "PRESENTIEL", dateDebut: "03/04/2024", dateFin: "31/03/2025", entreprise: "RIQUET ELITES", ma: "Mike MININ", comm: "Aucune connexion" },
  { prenom: "Emma", nom: "ZAOUI-MILI", formation: "INFOGRAPHISME", modalite: "PRESENTIEL", dateDebut: "25/04/2024", dateFin: "24/04/2025", entreprise: "LA COMPAGNIE DES REVES AYEZ", ma: "Baya BELAL", rupture: true, dateRupture: "31/01/2025", comm: "Rupture entreprise — poursuit la formation" },
  { prenom: "Djibril", nom: "COULIBALY", formation: "INFOGRAPHISME", modalite: "PRESENTIEL", dateDebut: "10/04/2024", dateFin: "09/04/2025", entreprise: "ASSO MUSIC HALL 19", ma: "Ba CAMARA" },
  { prenom: "Marion", nom: "LAURI", formation: "NÉGOCIATEUR TECHNICO COMMERCIAL", modalite: "E-LEARNING", dateDebut: "02/09/2024", dateFin: "31/08/2026", entreprise: "ASC ROBINET", ma: "Caty ROBINET", conn: "21d 01h 46m" },
  { prenom: "Leni", nom: "GRENET", formation: "NÉGOCIATEUR TECHNICO COMMERCIAL", modalite: "E-LEARNING", dateDebut: "02/09/2024", dateFin: "31/08/2026", entreprise: "ASC ROBINET", ma: "Caty ROBINET", conn: "13d 23h 05m" },
  { prenom: "Housna", nom: "GALIFANI", formation: "NÉGOCIATEUR TECHNICO COMMERCIAL", modalite: "E-LEARNING", dateDebut: "15/07/2024", dateFin: "15/01/2026", entreprise: "KM10", ma: "Karim DEMMOUCHE", rupture: true, dateRupture: "05/01/2025", conn: "15h 21m" },
  { prenom: "Zohaire-Khalil", nom: "ZEGRIR", formation: "NÉGOCIATEUR TECHNICO COMMERCIAL", modalite: "E-LEARNING", dateDebut: "04/11/2024", dateFin: "30/03/2026", entreprise: "KM10", ma: "Karim DEMMOUCHE", conn: "1d 20h 11m" },
  { prenom: "Sandeep", nom: "KUMAR", formation: "NÉGOCIATEUR TECHNICO COMMERCIAL", modalite: "E-LEARNING", dateDebut: "02/09/2024", dateFin: "28/02/2026", entreprise: "SHAAN'S PAJI", ma: "Patrick KARKI", conn: "3d 01h 21m" },
  { prenom: "Rayane", nom: "BONDROIT", formation: "RESPONSABLE PMS", modalite: "E-LEARNING", dateDebut: "23/09/2024", dateFin: "31/08/2026", entreprise: "PARIS BAT PRO", ma: "Jean-Marc BONDROIT", rupture: true, dateRupture: "30/06/2025", conn: "20d 03h 35m", comm: "OPCO Constructys" },
  { prenom: "Mamuna", nom: "KHANAM-MOHAMMAD", formation: "RESPONSABLE PMS", modalite: "E-LEARNING", dateDebut: "31/12/2024", dateFin: "31/12/2025", entreprise: "4M INVESTMENT", ma: "Mohammed FAROOQ", conn: "11d 12h 10m", comm: "OPCO Constructys" },
  { prenom: "Naheed Akhtar", nom: "MOHAMMAD", formation: "RESPONSABLE PMS", modalite: "E-LEARNING", dateDebut: "31/12/2024", dateFin: "31/12/2025", entreprise: "4M INVESTMENT", ma: "Mohammed FAROOQ", conn: "18d 17h 25m", comm: "OPCO Constructys" },
  { prenom: "Nicolas", nom: "SCHOUPPE", formation: "RESPONSABLE PMS", modalite: "E-LEARNING", dateDebut: "02/12/2024", dateFin: "28/11/2025", entreprise: "LH RENOVE 75", ma: "Abed SEBA", conn: "2d 17h 42m", comm: "OPCO Constructys" },
  { prenom: "Valentin", nom: "CUTITARU", formation: "RESPONSABLE PMS", modalite: "E-LEARNING", dateDebut: "01/10/2024", dateFin: "30/09/2025", entreprise: "LH RENOVE 76", ma: "Abed SEBA", conn: "3d 09h 14m", comm: "OPCO Constructys" },
];

// ------------------ Génération déterministe données perso ------------------

function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
  return h >>> 0;
}
function pick<T>(arr: T[], seed: number): T { return arr[Math.abs(seed | 0) % arr.length]; }

const VILLES_IDF: Array<{ cp: string; ville: string }> = [
  { cp: "94270", ville: "Le Kremlin-Bicêtre" },
  { cp: "93800", ville: "Épinay-sur-Seine" },
  { cp: "93200", ville: "Saint-Denis" },
  { cp: "75019", ville: "Paris" },
  { cp: "94400", ville: "Vitry-sur-Seine" },
  { cp: "92110", ville: "Clichy" },
  { cp: "94800", ville: "Villejuif" },
  { cp: "91000", ville: "Évry-Courcouronnes" },
  { cp: "78300", ville: "Poissy" },
  { cp: "92240", ville: "Malakoff" },
  { cp: "75018", ville: "Paris" },
  { cp: "93100", ville: "Montreuil" },
];

const RUES = ["Rue Victor Hugo", "Avenue de la République", "Rue Pasteur", "Rue Jean Jaurès", "Rue du Général Leclerc", "Avenue Gabriel Péri", "Rue de Paris", "Rue des Lilas", "Rue Émile Zola", "Avenue de Verdun", "Boulevard Voltaire", "Rue Voltaire"];

const NAF = ["64.20Z", "47.11D", "56.10C", "85.59A", "74.10Z", "70.22Z", "43.21A", "49.41A"];

const NATIONALITES = ["Française", "Française", "Sénégalaise", "Malienne", "Pakistanaise", "Algérienne", "Marocaine", "Tunisienne", "Ivoirienne"];

function buildAdresse(seed: number) {
  const num = (seed % 99) + 1;
  const rue = pick(RUES, seed);
  const cv = pick(VILLES_IDF, seed >> 3);
  return { adresse: `${num} ${rue}`, codePostal: cv.cp, ville: cv.ville };
}

function buildTel(seed: number): string {
  const v = (seed % 90000000) + 10000000;
  const s = String(v).padStart(8, "0");
  return `06 ${s.slice(0, 2)} ${s.slice(2, 4)} ${s.slice(4, 6)} ${s.slice(6, 8)}`;
}

function buildEmail(prenom: string, nom: string, seed: number): string {
  const p = prenom.toLowerCase().replace(/[^a-z]/g, "").slice(0, 12);
  const n = nom.toLowerCase().replace(/[^a-z]/g, "").slice(0, 14);
  const dom = pick(["gmail.com", "outlook.fr", "hotmail.fr", "yahoo.fr", "laposte.net"], seed);
  const sep = pick([".", "_", ""], seed >> 2);
  return `${p}${sep}${n}@${dom}`;
}

function buildNir(seed: number, sexe: 1 | 2, year: number, month: number): string {
  const dep = String((seed % 95) + 1).padStart(2, "0");
  const com = String((seed % 990) + 10).padStart(3, "0");
  const ord = String((seed % 990) + 10).padStart(3, "0");
  const yy = String(year).slice(-2);
  const mm = String(month).padStart(2, "0");
  const base = `${sexe}${yy}${mm}${dep}${com}${ord}`;
  // Clé NIR
  const cle = String(97 - (Number(base) % 97)).padStart(2, "0");
  return `${base} ${cle}`;
}

function buildDateNaissance(seed: number): { iso: string; year: number; month: number; lieu: string; nationalite: string } {
  const year = 1980 + (seed % 25); // 1980-2004
  const month = (seed % 12) + 1;
  const day = (seed % 28) + 1;
  const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const lieux = ["Paris", "Lyon", "Dakar (Sénégal)", "Bamako (Mali)", "Alger (Algérie)", "Casablanca (Maroc)", "Gujrat (Pakistan)", "Abidjan (Côte d'Ivoire)", "Tunis (Tunisie)", "Marseille"];
  const lieu = pick(lieux, seed >> 5);
  const nationalite = pick(NATIONALITES, seed >> 4);
  return { iso, year, month, lieu, nationalite };
}

function entrepriseAdresse(seed: number) {
  const cv = pick(VILLES_IDF, seed >> 1);
  const num = ((seed * 7) % 200) + 1;
  const rue = pick(RUES, seed >> 4);
  return { adresse: `${num} ${rue}`, codePostal: cv.cp, ville: cv.ville };
}

function entrepriseSiret(seed: number): string {
  const a = String((seed % 900) + 100);
  const b = String(((seed * 13) % 900) + 100);
  const c = String(((seed * 17) % 900) + 100);
  return `${a} ${b} ${c} 00012`;
}

// --------- Build ---------

let cachedApprentis: ViApprenti[] | null = null;

export function getViApprentis(): ViApprenti[] {
  if (cachedApprentis) return cachedApprentis;
  cachedApprentis = ROWS.map((r) => {
    const seed = hashStr(`${r.prenom}|${r.nom}`);
    const dn = buildDateNaissance(seed);
    const adr = buildAdresse(seed);
    const sexe: 1 | 2 = (r.prenom.endsWith("a") || ["Marion", "Diye", "Shaimaa", "Tacko", "Diakha", "Aminata", "Emma", "Housna", "Mamuna"].includes(r.prenom)) ? 2 : 1;
    const nir = buildNir(seed, sexe, dn.year, dn.month);
    const code = detectFormationCode(r.formation);
    const formation = FORMATIONS[code];
    const ea = entrepriseAdresse(seed);
    return {
      prenom: r.prenom,
      nom: r.nom,
      dateNaissance: dn.iso,
      lieuNaissance: dn.lieu,
      nationalite: dn.nationalite,
      adresse: adr.adresse,
      codePostal: adr.codePostal,
      ville: adr.ville,
      telephone: buildTel(seed),
      email: buildEmail(r.prenom, r.nom, seed),
      nir,
      formation,
      modalite: r.modalite,
      dateDebut: isoFromFr(r.dateDebut),
      dateFin: isoFromFr(r.dateFin),
      entreprise: r.entreprise || "—",
      entrepriseAdresse: ea.adresse,
      entrepriseCp: ea.codePostal,
      entrepriseVille: ea.ville,
      entrepriseSiret: entrepriseSiret(seed),
      entrepriseNaf: pick(NAF, seed),
      entrepriseTel: buildTel(seed >> 7).replace(/^06/, "01"),
      maitreApprentissage: r.ma || "—",
      maPoste: "Maître d'apprentissage",
      maTel: buildTel(seed >> 5),
      maEmail: r.ma ? buildEmail(r.ma.split(" ")[0] || "ma", (r.ma.split(" ").slice(-1)[0] || "ent"), seed >> 9).replace(/@.*/, `@${(r.entreprise || "entreprise").toLowerCase().replace(/[^a-z]/g, "").slice(0, 12)}.fr`) : "—",
      rupture: !!r.rupture,
      dateRupture: r.dateRupture ? isoFromFr(r.dateRupture) : undefined,
      tempsConnexion: r.conn,
      commentaire: r.comm,
    };
  });
  return cachedApprentis;
}
