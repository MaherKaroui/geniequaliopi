import { StagiaireInfo } from "@/types/qualiopi";
import { REGIONS, RegionKey, CommuneEntry, getAllCommunes } from "./fakeStagiaireRegions";

// Prénoms réalistes Île-de-France (mix culturel représentatif)
const PRENOMS_M = [
  "Thomas", "Lucas", "Hugo", "Nathan", "Mathis", "Léo", "Gabriel", "Raphaël", "Arthur", "Louis",
  "Mohamed", "Mehdi", "Yanis", "Karim", "Amine", "Bilal", "Rayan", "Adam", "Ilyes", "Samir",
  "Kevin", "Anthony", "Jérémy", "Maxime", "Antoine", "Alexandre", "Julien", "Nicolas", "Romain", "Clément",
  "David", "Daniel", "Samuel", "Jonathan", "Steven", "Wesley", "Ibrahim", "Youssef", "Abdelkader", "Hakim",
  "Cheick", "Mamadou", "Souleymane", "Moussa", "Ousmane", "Boubacar", "Aboubakar", "Sékou", "Issa", "Fodé",
  "Junior", "Christ", "Loïc", "Yoann", "Brandon", "Dylan", "Enzo", "Theo", "Adrien", "Bastien"
];

const PRENOMS_F = [
  "Emma", "Léa", "Manon", "Chloé", "Camille", "Sarah", "Inès", "Jade", "Louise", "Alice",
  "Fatima", "Aïcha", "Yasmine", "Nawal", "Leila", "Samira", "Khadija", "Amina", "Nadia", "Soraya",
  "Marie", "Julie", "Laura", "Pauline", "Marine", "Mélanie", "Élodie", "Caroline", "Charlotte", "Mathilde",
  "Aminata", "Fatou", "Awa", "Mariam", "Kadiatou", "Hawa", "Salimata", "Bintou", "Aïssatou", "Rokia",
  "Stéphanie", "Vanessa", "Sabrina", "Cindy", "Jessica", "Priscilla", "Océane", "Anaïs", "Mélissa", "Cassandra"
];

// Noms de famille fréquents en IDF
const NOMS = [
  "Martin", "Bernard", "Dubois", "Thomas", "Robert", "Petit", "Richard", "Durand", "Leroy", "Moreau",
  "Simon", "Laurent", "Lefebvre", "Michel", "Garcia", "David", "Bertrand", "Roux", "Vincent", "Fournier",
  "Morel", "Girard", "André", "Lefèvre", "Mercier", "Dupont", "Lambert", "Bonnet", "François", "Martinez",
  "Benali", "Belkacem", "Bouzid", "Cherif", "Hamidi", "Kaddour", "Mansouri", "Saidi", "Yahiaoui", "Ziani",
  "Diallo", "Diop", "Traoré", "Camara", "Bamba", "Kone", "Sylla", "Cissé", "Touré", "Sow",
  "Da Silva", "Pereira", "Ferreira", "Santos", "Gomes", "Rodrigues", "Lopes", "Carvalho", "Costa", "Oliveira",
  "Nguyen", "Tran", "Pham", "Lê", "Wang", "Chen", "Zhang", "Liu", "Singh", "Patel"
];

// Communes IDF avec code postal réel
const COMMUNES_IDF: { cp: string; commune: string; dept: string }[] = [
  // Paris (75)
  { cp: "75011", commune: "Paris", dept: "75" }, { cp: "75013", commune: "Paris", dept: "75" },
  { cp: "75015", commune: "Paris", dept: "75" }, { cp: "75017", commune: "Paris", dept: "75" },
  { cp: "75018", commune: "Paris", dept: "75" }, { cp: "75019", commune: "Paris", dept: "75" },
  { cp: "75020", commune: "Paris", dept: "75" }, { cp: "75010", commune: "Paris", dept: "75" },
  // Seine-et-Marne (77)
  { cp: "77100", commune: "Meaux", dept: "77" }, { cp: "77000", commune: "Melun", dept: "77" },
  { cp: "77340", commune: "Pontault-Combault", dept: "77" }, { cp: "77400", commune: "Lagny-sur-Marne", dept: "77" },
  { cp: "77500", commune: "Chelles", dept: "77" },
  // Yvelines (78)
  { cp: "78000", commune: "Versailles", dept: "78" }, { cp: "78180", commune: "Montigny-le-Bretonneux", dept: "78" },
  { cp: "78200", commune: "Mantes-la-Jolie", dept: "78" }, { cp: "78500", commune: "Sartrouville", dept: "78" },
  { cp: "78700", commune: "Conflans-Sainte-Honorine", dept: "78" },
  // Essonne (91)
  { cp: "91000", commune: "Évry-Courcouronnes", dept: "91" }, { cp: "91100", commune: "Corbeil-Essonnes", dept: "91" },
  { cp: "91200", commune: "Athis-Mons", dept: "91" }, { cp: "91300", commune: "Massy", dept: "91" },
  { cp: "91400", commune: "Orsay", dept: "91" },
  // Hauts-de-Seine (92)
  { cp: "92100", commune: "Boulogne-Billancourt", dept: "92" }, { cp: "92110", commune: "Clichy", dept: "92" },
  { cp: "92120", commune: "Montrouge", dept: "92" }, { cp: "92130", commune: "Issy-les-Moulineaux", dept: "92" },
  { cp: "92160", commune: "Antony", dept: "92" }, { cp: "92200", commune: "Neuilly-sur-Seine", dept: "92" },
  { cp: "92230", commune: "Gennevilliers", dept: "92" }, { cp: "92250", commune: "La Garenne-Colombes", dept: "92" },
  { cp: "92300", commune: "Levallois-Perret", dept: "92" }, { cp: "92400", commune: "Courbevoie", dept: "92" },
  { cp: "92500", commune: "Rueil-Malmaison", dept: "92" }, { cp: "92700", commune: "Colombes", dept: "92" },
  // Seine-Saint-Denis (93)
  { cp: "93000", commune: "Bobigny", dept: "93" }, { cp: "93100", commune: "Montreuil", dept: "93" },
  { cp: "93110", commune: "Rosny-sous-Bois", dept: "93" }, { cp: "93120", commune: "La Courneuve", dept: "93" },
  { cp: "93140", commune: "Bondy", dept: "93" }, { cp: "93150", commune: "Le Blanc-Mesnil", dept: "93" },
  { cp: "93160", commune: "Noisy-le-Grand", dept: "93" }, { cp: "93170", commune: "Bagnolet", dept: "93" },
  { cp: "93200", commune: "Saint-Denis", dept: "93" }, { cp: "93220", commune: "Gagny", dept: "93" },
  { cp: "93230", commune: "Romainville", dept: "93" }, { cp: "93240", commune: "Stains", dept: "93" },
  { cp: "93250", commune: "Villemomble", dept: "93" }, { cp: "93260", commune: "Les Lilas", dept: "93" },
  { cp: "93270", commune: "Sevran", dept: "93" }, { cp: "93290", commune: "Tremblay-en-France", dept: "93" },
  { cp: "93300", commune: "Aubervilliers", dept: "93" }, { cp: "93310", commune: "Le Pré-Saint-Gervais", dept: "93" },
  { cp: "93320", commune: "Les Pavillons-sous-Bois", dept: "93" }, { cp: "93330", commune: "Neuilly-sur-Marne", dept: "93" },
  { cp: "93340", commune: "Le Raincy", dept: "93" }, { cp: "93350", commune: "Le Bourget", dept: "93" },
  { cp: "93360", commune: "Neuilly-Plaisance", dept: "93" }, { cp: "93370", commune: "Montfermeil", dept: "93" },
  { cp: "93380", commune: "Pierrefitte-sur-Seine", dept: "93" }, { cp: "93390", commune: "Clichy-sous-Bois", dept: "93" },
  { cp: "93400", commune: "Saint-Ouen-sur-Seine", dept: "93" }, { cp: "93410", commune: "Vaujours", dept: "93" },
  { cp: "93420", commune: "Villepinte", dept: "93" }, { cp: "93430", commune: "Villetaneuse", dept: "93" },
  { cp: "93440", commune: "Dugny", dept: "93" }, { cp: "93450", commune: "L'Île-Saint-Denis", dept: "93" },
  { cp: "93460", commune: "Gournay-sur-Marne", dept: "93" }, { cp: "93470", commune: "Coubron", dept: "93" },
  { cp: "93500", commune: "Pantin", dept: "93" }, { cp: "93600", commune: "Aulnay-sous-Bois", dept: "93" },
  { cp: "93700", commune: "Drancy", dept: "93" }, { cp: "93800", commune: "Épinay-sur-Seine", dept: "93" },
  // Val-de-Marne (94)
  { cp: "94000", commune: "Créteil", dept: "94" }, { cp: "94100", commune: "Saint-Maur-des-Fossés", dept: "94" },
  { cp: "94110", commune: "Arcueil", dept: "94" }, { cp: "94120", commune: "Fontenay-sous-Bois", dept: "94" },
  { cp: "94140", commune: "Alfortville", dept: "94" }, { cp: "94150", commune: "Rungis", dept: "94" },
  { cp: "94170", commune: "Le Perreux-sur-Marne", dept: "94" }, { cp: "94190", commune: "Villeneuve-Saint-Georges", dept: "94" },
  { cp: "94200", commune: "Ivry-sur-Seine", dept: "94" }, { cp: "94220", commune: "Charenton-le-Pont", dept: "94" },
  { cp: "94230", commune: "Cachan", dept: "94" }, { cp: "94240", commune: "L'Haÿ-les-Roses", dept: "94" },
  { cp: "94250", commune: "Gentilly", dept: "94" }, { cp: "94260", commune: "Fresnes", dept: "94" },
  { cp: "94270", commune: "Le Kremlin-Bicêtre", dept: "94" }, { cp: "94300", commune: "Vincennes", dept: "94" },
  { cp: "94310", commune: "Orly", dept: "94" }, { cp: "94320", commune: "Thiais", dept: "94" },
  { cp: "94340", commune: "Joinville-le-Pont", dept: "94" }, { cp: "94350", commune: "Villiers-sur-Marne", dept: "94" },
  { cp: "94360", commune: "Bry-sur-Marne", dept: "94" }, { cp: "94370", commune: "Sucy-en-Brie", dept: "94" },
  { cp: "94380", commune: "Bonneuil-sur-Marne", dept: "94" }, { cp: "94400", commune: "Vitry-sur-Seine", dept: "94" },
  { cp: "94410", commune: "Saint-Maurice", dept: "94" }, { cp: "94420", commune: "Le Plessis-Trévise", dept: "94" },
  { cp: "94430", commune: "Chennevières-sur-Marne", dept: "94" }, { cp: "94440", commune: "Villecresnes", dept: "94" },
  { cp: "94450", commune: "Limeil-Brévannes", dept: "94" }, { cp: "94460", commune: "Valenton", dept: "94" },
  { cp: "94470", commune: "Boissy-Saint-Léger", dept: "94" }, { cp: "94480", commune: "Ablon-sur-Seine", dept: "94" },
  { cp: "94490", commune: "Ormesson-sur-Marne", dept: "94" }, { cp: "94500", commune: "Champigny-sur-Marne", dept: "94" },
  { cp: "94510", commune: "La Queue-en-Brie", dept: "94" }, { cp: "94520", commune: "Mandres-les-Roses", dept: "94" },
  { cp: "94550", commune: "Chevilly-Larue", dept: "94" }, { cp: "94600", commune: "Choisy-le-Roi", dept: "94" },
  { cp: "94700", commune: "Maisons-Alfort", dept: "94" }, { cp: "94800", commune: "Villejuif", dept: "94" },
  // Val-d'Oise (95)
  { cp: "95100", commune: "Argenteuil", dept: "95" }, { cp: "95110", commune: "Sannois", dept: "95" },
  { cp: "95120", commune: "Ermont", dept: "95" }, { cp: "95130", commune: "Franconville", dept: "95" },
  { cp: "95140", commune: "Garges-lès-Gonesse", dept: "95" }, { cp: "95150", commune: "Taverny", dept: "95" },
  { cp: "95160", commune: "Montmorency", dept: "95" }, { cp: "95170", commune: "Deuil-la-Barre", dept: "95" },
  { cp: "95190", commune: "Goussainville", dept: "95" }, { cp: "95200", commune: "Sarcelles", dept: "95" },
  { cp: "95210", commune: "Saint-Gratien", dept: "95" }, { cp: "95220", commune: "Herblay-sur-Seine", dept: "95" },
  { cp: "95230", commune: "Soisy-sous-Montmorency", dept: "95" }, { cp: "95240", commune: "Cormeilles-en-Parisis", dept: "95" },
  { cp: "95250", commune: "Beauchamp", dept: "95" }, { cp: "95270", commune: "Luzarches", dept: "95" },
  { cp: "95280", commune: "Jouy-le-Moutier", dept: "95" }, { cp: "95290", commune: "L'Isle-Adam", dept: "95" },
  { cp: "95300", commune: "Pontoise", dept: "95" }, { cp: "95310", commune: "Saint-Ouen-l'Aumône", dept: "95" },
  { cp: "95320", commune: "Saint-Leu-la-Forêt", dept: "95" }, { cp: "95330", commune: "Domont", dept: "95" },
  { cp: "95340", commune: "Persan", dept: "95" }, { cp: "95350", commune: "Saint-Brice-sous-Forêt", dept: "95" },
  { cp: "95360", commune: "Montmagny", dept: "95" }, { cp: "95370", commune: "Montigny-lès-Cormeilles", dept: "95" },
  { cp: "95380", commune: "Louvres", dept: "95" }, { cp: "95390", commune: "Saint-Prix", dept: "95" },
  { cp: "95400", commune: "Villiers-le-Bel", dept: "95" }, { cp: "95410", commune: "Groslay", dept: "95" },
  { cp: "95420", commune: "Magny-en-Vexin", dept: "95" }, { cp: "95430", commune: "Auvers-sur-Oise", dept: "95" },
  { cp: "95440", commune: "Écouen", dept: "95" }, { cp: "95450", commune: "Vigny", dept: "95" },
  { cp: "95460", commune: "Ézanville", dept: "95" }, { cp: "95470", commune: "Survilliers", dept: "95" },
  { cp: "95480", commune: "Pierrelaye", dept: "95" }, { cp: "95490", commune: "Vauréal", dept: "95" },
  { cp: "95500", commune: "Gonesse", dept: "95" }, { cp: "95520", commune: "Osny", dept: "95" },
  { cp: "95540", commune: "Méry-sur-Oise", dept: "95" }, { cp: "95560", commune: "Maffliers", dept: "95" },
  { cp: "95580", commune: "Andilly", dept: "95" }, { cp: "95600", commune: "Eaubonne", dept: "95" },
  { cp: "95610", commune: "Éragny", dept: "95" }, { cp: "95620", commune: "Parmain", dept: "95" },
  { cp: "95630", commune: "Mériel", dept: "95" }, { cp: "95640", commune: "Marines", dept: "95" },
  { cp: "95650", commune: "Boissy-l'Aillerie", dept: "95" }, { cp: "95660", commune: "Champagne-sur-Oise", dept: "95" },
  { cp: "95670", commune: "Marly-la-Ville", dept: "95" }, { cp: "95680", commune: "Montlignon", dept: "95" },
  { cp: "95690", commune: "Nesles-la-Vallée", dept: "95" }, { cp: "95700", commune: "Roissy-en-France", dept: "95" },
  { cp: "95710", commune: "Bray-et-Lû", dept: "95" }, { cp: "95720", commune: "Le Mesnil-Aubry", dept: "95" },
  { cp: "95740", commune: "Frépillon", dept: "95" }, { cp: "95750", commune: "Chars", dept: "95" },
  { cp: "95760", commune: "Valmondois", dept: "95" }, { cp: "95770", commune: "Saint-Clair-sur-Epte", dept: "95" },
  { cp: "95780", commune: "La Roche-Guyon", dept: "95" }, { cp: "95800", commune: "Cergy", dept: "95" },
  { cp: "95810", commune: "Vétheuil", dept: "95" }, { cp: "95820", commune: "Bruyères-sur-Oise", dept: "95" },
  { cp: "95830", commune: "Cormeilles-en-Vexin", dept: "95" }, { cp: "95840", commune: "Bessancourt", dept: "95" },
];

const RUES = [
  "rue de la République", "rue Victor Hugo", "rue Jean Jaurès", "rue Pasteur", "rue Voltaire",
  "rue Gambetta", "rue de la Paix", "rue Émile Zola", "rue Jules Ferry", "rue Carnot",
  "avenue de la Liberté", "avenue Foch", "avenue de Paris", "avenue de la République", "avenue Henri Barbusse",
  "boulevard Voltaire", "boulevard de la Liberté", "boulevard Aristide Briand", "boulevard Jean Jaurès",
  "allée des Tilleuls", "allée des Bleuets", "allée des Acacias", "allée des Marronniers",
  "place du Marché", "place de la Mairie", "impasse des Lilas", "chemin du Moulin", "route de Paris",
];

const DOMAINES_EMAIL = ["gmail.com", "hotmail.fr", "yahoo.fr", "outlook.fr", "orange.fr", "free.fr", "laposte.net", "sfr.fr"];

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

// Mulberry32 deterministic PRNG (optional seed)
function makeRng(seed?: number): () => number {
  let a = seed ?? Math.floor(Math.random() * 2 ** 31);
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function stripAccents(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/['\s-]/g, "");
}

function generatePhone(rng: () => number): string {
  // 06 ou 07 + 8 chiffres, format 06 XX XX XX XX
  const prefix = rng() < 0.5 ? "06" : "07";
  let rest = "";
  for (let i = 0; i < 4; i++) {
    rest += " " + String(Math.floor(rng() * 100)).padStart(2, "0");
  }
  return prefix + rest;
}

function generateBirthDate(rng: () => number): string {
  // 18 à 55 ans
  const year = 2007 - Math.floor(rng() * 38);
  const month = 1 + Math.floor(rng() * 12);
  const day = 1 + Math.floor(rng() * 28);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function generateStreetNumber(rng: () => number): number {
  return 1 + Math.floor(rng() * 180);
}

export interface FakeStagiaireOptions {
  count: number;
  seed?: number;
  genderRatio?: number; // 0-1 probabilité d'être Mme (default 0.5)
  region?: RegionKey | "all"; // région française ciblée, "all" = toute la France
}

export function generateFakeStagiairesIDF(options: FakeStagiaireOptions): StagiaireInfo[] {
  const { count, seed, genderRatio = 0.5, region = "ile-de-france" } = options;
  const rng = makeRng(seed);
  const result: StagiaireInfo[] = [];
  const usedEmails = new Set<string>();

  const communePool: CommuneEntry[] =
    region === "all" ? getAllCommunes() : (REGIONS[region]?.communes ?? COMMUNES_IDF);

  for (let i = 0; i < count; i++) {
    const isFemme = rng() < genderRatio;
    const civilite = isFemme ? "Mme" : "M.";
    const prenom = pick(isFemme ? PRENOMS_F : PRENOMS_M, rng);
    const nom = pick(NOMS, rng);
    const loc = pick(communePool, rng);
    const numRue = generateStreetNumber(rng);
    const rue = pick(RUES, rng);
    const adresse = `${numRue} ${rue}`;

    // Email unique
    let email = "";
    let attempts = 0;
    do {
      const sep = rng() < 0.5 ? "." : "";
      const num = rng() < 0.4 ? String(Math.floor(rng() * 99)) : "";
      const local = `${stripAccents(prenom).toLowerCase()}${sep}${stripAccents(nom).toLowerCase()}${num}`;
      const domain = pick(DOMAINES_EMAIL, rng);
      email = `${local}@${domain}`;
      attempts++;
    } while (usedEmails.has(email) && attempts < 10);
    usedEmails.add(email);

    result.push({
      civilite,
      nom: nom.toUpperCase(),
      prenom,
      email,
      telephone: generatePhone(rng),
      entreprise: "",
      responsableEntreprise: "",
      signatureResponsableUrl: "",
      poste: "",
      dateNaissance: generateBirthDate(rng),
      dateDebutFormation: "",
      dateFinFormation: "",
      tarifFormation: "",
      signatureUrl: "",
      adresse,
      codePostal: loc.cp,
      commune: loc.commune,
      nationalite: "Française",
      nir: "",
      departementNaissance: loc.dept,
      communeNaissance: loc.commune,
      diplome: "",
      rqth: "non",
      formateur: "",
      formateurSignatureUrl: "",
      adresseEntreprise: "",
      siretEntreprise: "",
      fictif: true,
    });
  }

  return result;
}
