// Génère des preuves d'inscription RÉALISTES et VARIÉES pour chaque formation
// du PLAN DE DÉVELOPPEMENT DES COMPÉTENCES (CT5 - IND 22).
// Chaque page utilise un canal et un format différent : Gmail, Outlook, webmail
// organisme, page de confirmation portail, ou capture d'écran d'espace client.
import { OrganismeInfo, FormationInfo } from "@/types/qualiopi";
import { FormateurInfo } from "./sampleData";
import { getPlanDevTrainings, PlanDevTraining } from "./templatesCritere5";

const MONTHS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];
const DAYS_FR = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const MONTHS_SHORT = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

function pad(n: number): string { return n.toString().padStart(2, "0"); }

function inscriptionDateObj(f: FormationInfo, monthsBefore: number, daysShift: number): Date {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() - monthsBefore);
  d.setDate(d.getDate() + daysShift);
  const dow = d.getDay();
  if (dow === 0) d.setDate(d.getDate() + 2);
  if (dow === 6) d.setDate(d.getDate() + 3);
  return d;
}

function sessionDateObj(f: FormationInfo, monthsAfter: number, daysShift: number): Date {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() + monthsAfter);
  d.setDate(d.getDate() + daysShift);
  const dow = d.getDay();
  if (dow === 0) d.setDate(d.getDate() + 1);
  if (dow === 6) d.setDate(d.getDate() + 2);
  return d;
}

function fmtLong(d: Date): string {
  return `${DAYS_FR[d.getDay()]} ${d.getDate()} ${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`;
}
function fmtShort(d: Date): string {
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}
function fmtDateNum(d: Date): string {
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}
function fmtTime(seed: number, baseHour = 8): string {
  const h = baseHour + (Math.abs(seed) % 9);
  const m = (Math.abs(seed) * 7) % 60;
  return `${pad(h)}h${pad(m)}`;
}
function fmtTimeColon(seed: number, baseHour = 8): string {
  const h = baseHour + (Math.abs(seed) % 9);
  const m = (Math.abs(seed) * 7) % 60;
  return `${pad(h)}:${pad(m)}`;
}

type Brand = {
  key: string;
  matcher: RegExp;
  primary: string;
  accent: string;
  domain: string;
  fullName: string;
  shortName: string;
  contacts: { name: string; role: string; email: string; phone: string }[];
  address: string;
  signoff: string[];
};

const BRANDS: Brand[] = [
  { key: "afnor", matcher: /afnor/i, primary: "#003e7e", accent: "#fdb813", domain: "afnor.org", fullName: "AFNOR Compétences", shortName: "AFNOR",
    contacts: [
      { name: "Sylvie MARCHAND", role: "Responsable inscriptions formation", email: "sylvie.marchand", phone: "+33 1 41 62 80 24" },
      { name: "Karim BOUAZIZ", role: "Conseiller formation entreprises", email: "k.bouaziz", phone: "+33 1 41 62 80 47" },
      { name: "Émilie ROCHE", role: "Coordinatrice pédagogique", email: "emilie.roche", phone: "+33 1 41 62 81 02" },
    ],
    address: "11 rue Francis de Pressensé, 93571 La Plaine Saint-Denis Cedex",
    signoff: ["Bien cordialement", "Cordialement", "Sincères salutations"],
  },
  { key: "cegos", matcher: /cegos/i, primary: "#003a5d", accent: "#e30613", domain: "cegos.fr", fullName: "Cegos Formation", shortName: "Cegos",
    contacts: [
      { name: "Aurélie DELORME", role: "Conseillère clientèle entreprises", email: "aurelie.delorme", phone: "+33 1 55 00 91 22" },
      { name: "Stéphane LECLERC", role: "Account Manager — Pôle Management", email: "s.leclerc", phone: "+33 1 55 00 92 18" },
    ],
    address: "19 rue René Jacques, 92798 Issy-les-Moulineaux Cedex 9",
    signoff: ["Bien à vous", "Cordialement", "Bien cordialement"],
  },
  { key: "centre-inffo", matcher: /centre[\s-]?inffo/i, primary: "#003c71", accent: "#f4a01a", domain: "centre-inffo.fr", fullName: "Centre Inffo", shortName: "Centre Inffo",
    contacts: [
      { name: "Patricia GAUTIER-MOULIN", role: "Service inscriptions", email: "p.gautier", phone: "+33 1 55 93 91 55" },
      { name: "Olivier FAURE", role: "Chargé de relations clients", email: "o.faure", phone: "+33 1 55 93 91 73" },
    ],
    address: "4 avenue du Stade de France, 93218 Saint-Denis La Plaine Cedex",
    signoff: ["Cordialement", "Bien cordialement"],
  },
  { key: "cnam", matcher: /cnam/i, primary: "#a4123f", accent: "#1a1a1a", domain: "cnam.fr", fullName: "Cnam — Conservatoire National des Arts et Métiers", shortName: "Cnam",
    contacts: [
      { name: "Service Scolarité", role: "Direction nationale des formations", email: "scolarite", phone: "+33 1 40 27 23 30" },
      { name: "Brigitte LAMBERT", role: "Coordinatrice EPN", email: "brigitte.lambert", phone: "+33 1 40 27 22 14" },
    ],
    address: "292 rue Saint-Martin, 75003 Paris",
    signoff: ["Sincères salutations", "Cordialement"],
  },
  { key: "cnil", matcher: /cnil/i, primary: "#00006e", accent: "#ffd400", domain: "cnil.fr", fullName: "CNIL — Service formations", shortName: "CNIL",
    contacts: [
      { name: "Marc DAVAL", role: "Coordinateur formations professionnelles", email: "marc.daval", phone: "+33 1 53 73 22 18" },
    ],
    address: "3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07",
    signoff: ["Sincères salutations", "Cordialement"],
  },
  { key: "openclassrooms", matcher: /openclassrooms/i, primary: "#7451eb", accent: "#00c7b1", domain: "openclassrooms.com", fullName: "OpenClassrooms", shortName: "OpenClassrooms",
    contacts: [
      { name: "Julie BOSSARD", role: "Customer Success Manager", email: "julie.bossard", phone: "+33 1 76 35 04 11" },
      { name: "Lucas PERRIER", role: "Account Executive Pro", email: "lucas.p", phone: "+33 1 76 35 05 02" },
    ],
    address: "7 Cité Paradis, 75010 Paris",
    signoff: ["À bientôt sur OpenClassrooms !", "Cordialement", "Belle journée"],
  },
  { key: "british", matcher: /british council/i, primary: "#262262", accent: "#e30613", domain: "britishcouncil.fr", fullName: "British Council France", shortName: "British Council",
    contacts: [
      { name: "Emma WHITAKER", role: "Customer Services Manager", email: "emma.whitaker", phone: "+33 1 49 55 73 22" },
      { name: "Camille HENNEQUIN", role: "Exams Officer", email: "camille.h", phone: "+33 1 49 55 73 41" },
    ],
    address: "9 rue de Constantine, 75007 Paris",
    signoff: ["Best regards", "Kind regards", "Cordialement"],
  },
  { key: "cambridge", matcher: /cambridge/i, primary: "#0a3a6d", accent: "#a32638", domain: "cambridgeenglish.org", fullName: "Cambridge English", shortName: "Cambridge",
    contacts: [
      { name: "Sarah PALMER", role: "Centre Liaison Officer", email: "sarah.palmer", phone: "+44 1223 553 997" },
    ],
    address: "1 Hills Road, Cambridge CB1 2EU, United Kingdom",
    signoff: ["Kind regards", "Best wishes"],
  },
  { key: "alliance", matcher: /alliance fran[cç]aise/i, primary: "#003399", accent: "#e1000f", domain: "alliancefr.org", fullName: "Alliance Française Paris Île-de-France", shortName: "Alliance Française",
    contacts: [
      { name: "Catherine RIBEIRO", role: "Responsable inscriptions", email: "c.ribeiro", phone: "+33 1 42 84 90 12" },
    ],
    address: "101 boulevard Raspail, 75006 Paris",
    signoff: ["Cordialement", "Bien à vous"],
  },
  { key: "halifax", matcher: /halifax/i, primary: "#003366", accent: "#f1a900", domain: "halifax-consulting.com", fullName: "Halifax Consulting", shortName: "Halifax",
    contacts: [
      { name: "Olivier RABOUEL", role: "Account Manager", email: "olivier.rabouel", phone: "+33 1 41 38 02 14" },
    ],
    address: "53 rue d'Anjou, 75008 Paris",
    signoff: ["Bien cordialement", "À votre disposition"],
  },
  { key: "hubspot", matcher: /hubspot/i, primary: "#ff7a59", accent: "#33475b", domain: "hubspot.com", fullName: "HubSpot Academy", shortName: "HubSpot",
    contacts: [
      { name: "Camille HENRY", role: "Academy Specialist", email: "chenry", phone: "+33 1 86 26 07 91" },
    ],
    address: "39 Saint-Pères, 75006 Paris",
    signoff: ["Cheers", "À bientôt", "Best"],
  },
  { key: "microsoft", matcher: /microsoft/i, primary: "#0078d4", accent: "#50e6ff", domain: "microsoft.com", fullName: "Microsoft Learning Partners France", shortName: "Microsoft",
    contacts: [
      { name: "Thomas RAYNAUD", role: "Learning Partner Coordinator", email: "thraynaud", phone: "+33 1 57 75 50 12" },
      { name: "Anne-Sophie CHEVALIER", role: "Skilling Programs Lead France", email: "ascheval", phone: "+33 1 57 75 50 47" },
    ],
    address: "39 quai du Président Roosevelt, 92130 Issy-les-Moulineaux",
    signoff: ["Best regards", "Cordialement"],
  },
  { key: "eni", matcher: /\beni\b/i, primary: "#1a4488", accent: "#ee7600", domain: "eni-elearning.com", fullName: "ENI École Informatique", shortName: "ENI",
    contacts: [
      { name: "Stéphanie LE GOFF", role: "Service commercial e-learning", email: "s.legoff", phone: "+33 2 51 80 15 27" },
    ],
    address: "ZAC du Moulin Neuf, 2 rue Benjamin Franklin, 44800 Saint-Herblain",
    signoff: ["Bien cordialement", "Cordialement"],
  },
  { key: "digiformag", matcher: /digiformag|abilways/i, primary: "#1d4ed8", accent: "#06b6d4", domain: "digiformag.com", fullName: "Digiformag — Groupe Abilways", shortName: "Digiformag",
    contacts: [
      { name: "Léa BERNARD", role: "Conseillère formation", email: "lea.bernard", phone: "+33 1 53 24 90 18" },
    ],
    address: "35 rue du Louvre, 75002 Paris",
    signoff: ["Bien à vous", "Cordialement"],
  },
  { key: "ciep", matcher: /ciep|france éducation/i, primary: "#0033a0", accent: "#e60028", domain: "france-education-international.fr", fullName: "France Éducation International", shortName: "FEI",
    contacts: [
      { name: "Hélène MOULIN", role: "Département langue française", email: "h.moulin", phone: "+33 1 45 07 60 14" },
    ],
    address: "1 avenue Léon Journault, 92318 Sèvres Cedex",
    signoff: ["Cordialement", "Sincères salutations"],
  },
  { key: "anact", matcher: /anact/i, primary: "#005a9c", accent: "#ffcd00", domain: "anact.fr", fullName: "Anact — Réseau Anact-Aract", shortName: "Anact",
    contacts: [
      { name: "Pascal ÉTIENNE", role: "Pôle Formation", email: "p.etienne", phone: "+33 4 72 56 13 44" },
    ],
    address: "192 avenue Thiers, CS 80031, 69457 Lyon Cedex 06",
    signoff: ["Cordialement", "Bien cordialement"],
  },
  { key: "inserr", matcher: /inserr|institut national de s/i, primary: "#003a70", accent: "#ce0e2d", domain: "inserr.fr", fullName: "INSERR — Institut National de Sécurité Routière", shortName: "INSERR",
    contacts: [
      { name: "François MERCIER", role: "Coordinateur formation continue", email: "f.mercier", phone: "+33 3 86 21 33 47" },
    ],
    address: "8 boulevard de la Marne, 58027 Nevers Cedex",
    signoff: ["Cordialement", "Sincères salutations"],
  },
  { key: "securite-routiere", matcher: /sécurité routière|securite routiere/i, primary: "#003a70", accent: "#fdb813", domain: "securite-routiere.gouv.fr", fullName: "Délégation à la Sécurité Routière", shortName: "DSR",
    contacts: [
      { name: "Marie DUBREUIL", role: "Service formation", email: "marie.dubreuil", phone: "+33 1 86 21 30 14" },
    ],
    address: "Place Beauvau, 75800 Paris Cedex 08",
    signoff: ["Cordialement", "Sincères salutations"],
  },
  { key: "codes-rousseau", matcher: /codes rousseau/i, primary: "#1a3e6f", accent: "#e30613", domain: "codesrousseau.fr", fullName: "Codes Rousseau — Formation continue ECSR", shortName: "Codes Rousseau",
    contacts: [
      { name: "Nathalie GAUTIER", role: "Service inscription", email: "n.gautier", phone: "+33 2 51 56 53 14" },
    ],
    address: "Rue de Verdun, ZAE La Brosse, 85003 La Roche-sur-Yon Cedex",
    signoff: ["Cordialement", "Bien cordialement"],
  },
  { key: "supsante", matcher: /sup\s?sant[eé]/i, primary: "#1d6ca8", accent: "#5cb85c", domain: "sup-sante.com", fullName: "Sup Santé", shortName: "Sup Santé",
    contacts: [
      { name: "Caroline VASSEUR", role: "Responsable pédagogique", email: "c.vasseur", phone: "+33 1 84 19 75 22" },
    ],
    address: "1 boulevard Charles de Gaulle, 92700 Colombes",
    signoff: ["Cordialement", "Bien à vous"],
  },
  { key: "febea", matcher: /febea/i, primary: "#c3084e", accent: "#000000", domain: "febea.fr", fullName: "FEBEA — Fédération des Entreprises de la Beauté", shortName: "FEBEA",
    contacts: [
      { name: "Isabelle MARCHAND", role: "Pôle formation et compétences", email: "i.marchand", phone: "+33 1 56 69 67 22" },
    ],
    address: "33 avenue des Champs-Élysées, 75008 Paris",
    signoff: ["Cordialement", "Bien à vous"],
  },
  { key: "ffmbe", matcher: /ffmbe/i, primary: "#7a4ca0", accent: "#f29400", domain: "ffmbe.fr", fullName: "FFMBE — Fédération Française de Massage Bien-Être", shortName: "FFMBE",
    contacts: [
      { name: "Sandrine PERRIN", role: "Référente formation", email: "s.perrin", phone: "+33 4 78 71 36 47" },
    ],
    address: "84 rue de la République, 69002 Lyon",
    signoff: ["Cordialement", "Belle journée"],
  },
  { key: "ecole-massage", matcher: /école de massage|ecole de massage/i, primary: "#5b3a7a", accent: "#e8a87c", domain: "ecoledemassage-paris.fr", fullName: "École de Massage Paris", shortName: "EMP",
    contacts: [
      { name: "Magali ROUSSEL", role: "Responsable admissions", email: "m.roussel", phone: "+33 1 47 70 88 14" },
    ],
    address: "23 rue de Trévise, 75009 Paris",
    signoff: ["Cordialement", "Belle journée"],
  },
  { key: "ecole-esthetique", matcher: /école internationale d'esthétique|ecole internationale d'esthetique/i, primary: "#a4458b", accent: "#f5b1cc", domain: "ecole-esthetique-paris.fr", fullName: "École Internationale d'Esthétique de Paris", shortName: "EIEP",
    contacts: [
      { name: "Florence DUBOIS", role: "Service inscriptions formation continue", email: "f.dubois", phone: "+33 1 42 85 17 22" },
    ],
    address: "12 rue de Maubeuge, 75009 Paris",
    signoff: ["Cordialement", "Belle journée"],
  },
  { key: "perinatalite", matcher: /périnatalité|perinatalite/i, primary: "#3aa6b9", accent: "#ff9a8b", domain: "institut-perinatalite.fr", fullName: "Institut de Formation en Périnatalité", shortName: "IFP",
    contacts: [
      { name: "Laure CHAUMET", role: "Coordinatrice pédagogique", email: "l.chaumet", phone: "+33 1 45 22 96 14" },
    ],
    address: "78 avenue de Suffren, 75015 Paris",
    signoff: ["Cordialement", "Belle journée"],
  },
];

// Palettes réalistes utilisées en rotation pour les organismes inconnus
const GENERIC_PALETTES = [
  { primary: "#1e3a7b", accent: "#f59e0b" },
  { primary: "#0f5132", accent: "#fcbf49" },
  { primary: "#7c2d12", accent: "#fb923c" },
  { primary: "#1e40af", accent: "#22d3ee" },
  { primary: "#581c87", accent: "#e879f9" },
  { primary: "#0c4a6e", accent: "#38bdf8" },
  { primary: "#7f1d1d", accent: "#fca5a5" },
  { primary: "#134e4a", accent: "#5eead4" },
  { primary: "#3f3f46", accent: "#facc15" },
  { primary: "#9a3412", accent: "#fde68a" },
];

const GENERIC_FIRSTNAMES_F = ["Sophie", "Aurélie", "Camille", "Élodie", "Nathalie", "Sandrine", "Caroline", "Isabelle", "Marie", "Julie", "Pauline", "Hélène"];
const GENERIC_FIRSTNAMES_M = ["Thomas", "Julien", "Olivier", "Sébastien", "Nicolas", "Pierre", "Antoine", "Frédéric", "Laurent", "Vincent", "Benoît", "Mathieu"];
const GENERIC_LASTNAMES = ["MARTIN", "BERNARD", "DUBOIS", "ROUSSEAU", "LAURENT", "MOREAU", "LEFEBVRE", "GIRARD", "BONNET", "FONTAINE", "CHEVALIER", "ROBERT", "RICHARD", "PETIT", "DURAND", "LEROY", "MORIN", "FOURNIER", "MERCIER", "BLANC"];
const GENERIC_ROLES = [
  "Responsable inscriptions formation",
  "Conseiller(ère) formation entreprises",
  "Coordinateur(trice) pédagogique",
  "Chargé(e) de relations clients",
  "Gestionnaire administratif formation",
];
const GENERIC_CITIES = [
  { city: "Paris", cp: "75009", street: "rue de Châteaudun" },
  { city: "Lyon", cp: "69003", street: "rue de la République" },
  { city: "Marseille", cp: "13008", street: "avenue du Prado" },
  { city: "Toulouse", cp: "31000", street: "allée Jean Jaurès" },
  { city: "Nantes", cp: "44000", street: "rue Crébillon" },
  { city: "Bordeaux", cp: "33000", street: "cours de l'Intendance" },
  { city: "Lille", cp: "59000", street: "rue Faidherbe" },
  { city: "Strasbourg", cp: "67000", street: "rue du Vieux Marché aux Vins" },
  { city: "Nice", cp: "06000", street: "boulevard Victor Hugo" },
  { city: "Rennes", cp: "35000", street: "rue Saint-Hélier" },
];
const GENERIC_PHONE_PREFIXES: Record<string, string> = {
  Paris: "+33 1", Lyon: "+33 4", Marseille: "+33 4", Toulouse: "+33 5",
  Nantes: "+33 2", Bordeaux: "+33 5", Lille: "+33 3", Strasbourg: "+33 3",
  Nice: "+33 4", Rennes: "+33 2",
};

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function detectTLD(label: string): string {
  const l = label.toLowerCase();
  if (/(academy|institute|college|university|english|school)/.test(l)) return "com";
  if (/\.org\b/.test(l)) return "org";
  return "fr";
}

function buildGenericBrand(label: string): Brand {
  const seed = hashStr(label);
  const palette = GENERIC_PALETTES[seed % GENERIC_PALETTES.length];
  const slug = slugify(label).split("-").slice(0, 3).join("-") || "organisme";
  const tld = detectTLD(label);
  const domain = `${slug}.${tld}`;
  const words = label.split(/\s+/).filter(Boolean);
  const shortName = words.length >= 2
    ? words.slice(0, 2).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ")
    : (words[0] || "OF");

  const phoneSeed = (seed * 31) % 1000000;
  const formatPhone = (prefix: string, n: number) => {
    const digits = (10000000 + n).toString().slice(0, 8);
    return `${prefix} ${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)}`;
  };

  const contacts = [0, 1, 2].map(i => {
    const isFem = (seed + i) % 2 === 0;
    const first = isFem ? GENERIC_FIRSTNAMES_F[(seed + i * 7) % GENERIC_FIRSTNAMES_F.length] : GENERIC_FIRSTNAMES_M[(seed + i * 7) % GENERIC_FIRSTNAMES_M.length];
    const last = GENERIC_LASTNAMES[(seed + i * 13) % GENERIC_LASTNAMES.length];
    const role = GENERIC_ROLES[(seed + i * 5) % GENERIC_ROLES.length];
    const cityIdx = (seed + i * 3) % GENERIC_CITIES.length;
    const prefix = GENERIC_PHONE_PREFIXES[GENERIC_CITIES[cityIdx].city] || "+33 1";
    return {
      name: `${first} ${last}`,
      role,
      email: `${first.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.${last.toLowerCase()}`,
      phone: formatPhone(prefix, phoneSeed + i * 1234),
    };
  });

  const cityInfo = GENERIC_CITIES[seed % GENERIC_CITIES.length];
  const streetNum = (seed % 199) + 1;
  const address = `${streetNum} ${cityInfo.street}, ${cityInfo.cp} ${cityInfo.city}`;

  return {
    key: `generic-${slug}`,
    matcher: /./,
    primary: palette.primary,
    accent: palette.accent,
    domain,
    fullName: label,
    shortName,
    contacts,
    address,
    signoff: ["Cordialement", "Bien cordialement", "Sincères salutations", "Bien à vous"],
  };
}

function detectBrand(label: string): Brand {
  for (const b of BRANDS) if (b.matcher.test(label)) return b;
  return buildGenericBrand(label);
}

function refNumber(seed: number, brand: Brand, year: number): string {
  const num = (100000 + (Math.abs(seed) * 7919) % 899999).toString();
  const prefix = brand.shortName.replace(/[^A-Z0-9]/gi, "").substring(0, 4).toUpperCase() || "INS";
  return `${prefix}-${year}-${num}`;
}

function pickContact(brand: Brand, idx: number) {
  return brand.contacts[idx % brand.contacts.length];
}

function senderEmailFull(brand: Brand, idx: number): string {
  return `${pickContact(brand, idx).email}@${brand.domain}`;
}

function userEmail(o: OrganismeInfo): string {
  if (o.email) return o.email;
  const slug = (o.nom || "organisme").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return `contact@${slug}.fr`;
}

function recipientName(t: PlanDevTraining, o: OrganismeInfo): string {
  return t.noms || o.responsablePedagogique || o.nom || "Service formation";
}

function firstName(full: string): string {
  return full.split(" ")[0] || full;
}

// ============================================================
// FORMAT 1 — Gmail interface
// ============================================================
function renderGmail(o: OrganismeInfo, t: PlanDevTraining, idx: number, dateInsc: Date, dateSession: Date, ref: string, brand: Brand): string {
  const contact = pickContact(brand, idx);
  const recipient = recipientName(t, o);
  const recEmail = userEmail(o);
  const subject = `Confirmation d'inscription — ${t.nom} — Réf. ${ref}`;
  const signoff = brand.signoff[idx % brand.signoff.length];

  return `
  <div style="max-width:820px;margin:18px auto;background:#fff;border:1px solid #dadce0;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(60,64,67,0.15);font-family:Roboto,Arial,sans-serif">
    <div style="background:#f6f8fc;border-bottom:1px solid #dadce0;padding:8px 16px;display:flex;align-items:center;gap:14px;font-size:13px;color:#3c4043">
      <div style="display:flex;gap:4px"><span style="padding:6px 8px;border-radius:4px;background:#fff;border:1px solid #dadce0">←</span><span style="padding:6px 8px">🗑</span><span style="padding:6px 8px">📁</span></div>
      <div style="margin-left:auto;color:#5f6368;font-size:12px">1 sur ${247 + idx * 13}</div>
    </div>
    <div style="border-bottom:1px solid #dadce0;padding:14px 24px;background:#fff">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:40px;height:40px;border-radius:50%;background:${brand.primary};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px">${brand.shortName.substring(0, 2).toUpperCase()}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:14px;color:#202124;font-weight:500">${contact.name} <span style="color:#5f6368;font-weight:400">&lt;${senderEmailFull(brand, idx)}&gt;</span></div>
          <div style="font-size:12px;color:#5f6368;margin-top:2px">À : ${recipient} &lt;${recEmail}&gt;</div>
        </div>
        <div style="font-size:12px;color:#5f6368;text-align:right">
          <div>${fmtShort(dateInsc)} à ${fmtTimeColon(idx + ref.length)}</div>
        </div>
      </div>
    </div>
    <div style="padding:24px 32px;font-family:Arial,sans-serif;color:#202124;font-size:14px;line-height:1.65">
      <h2 style="font-size:19px;color:${brand.primary};margin:0 0 4px;font-weight:600">${subject}</h2>
      <div style="font-size:12px;color:#5f6368;margin-bottom:18px">Référence : <strong>${ref}</strong></div>
      <p style="margin:0 0 12px">Bonjour ${firstName(recipient)},</p>
      <p style="margin:0 0 12px">Nous vous confirmons votre inscription à la session <strong>${t.nom}</strong> programmée à partir du <strong>${fmtLong(dateSession)}</strong>.</p>
      <p style="margin:0 0 12px">Vous trouverez ci-dessous le récapitulatif complet de votre dossier.</p>
      <div style="background:#f8f9fa;border-left:4px solid ${brand.primary};padding:12px 16px;margin:14px 0;border-radius:0 4px 4px 0;font-size:13px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:3px 0;color:#5f6368;width:38%">Formation</td><td style="padding:3px 0"><strong>${t.nom}</strong></td></tr>
          <tr><td style="padding:3px 0;color:#5f6368">Objectifs</td><td style="padding:3px 0">${t.objectif}</td></tr>
          <tr><td style="padding:3px 0;color:#5f6368">Modalité</td><td style="padding:3px 0">${t.type}</td></tr>
          <tr><td style="padding:3px 0;color:#5f6368">Durée</td><td style="padding:3px 0">${t.duree}</td></tr>
          <tr><td style="padding:3px 0;color:#5f6368">Bénéficiaire</td><td style="padding:3px 0">${recipient} (${o.nom})</td></tr>
        </table>
      </div>
      <div style="margin:16px 0">
        <a href="https://${brand.domain}/inscription/${ref}" style="display:inline-block;background:${brand.primary};color:#fff;padding:10px 20px;border-radius:4px;text-decoration:none;font-size:13px;font-weight:500">📥 Télécharger ma convocation</a>
      </div>
      <div style="margin:18px 0 6px;font-size:12px;color:#5f6368">2 pièces jointes • Analysées par antivirus</div>
      <div style="display:flex;gap:8px;margin-bottom:14px">
        <div style="border:1px solid #dadce0;border-radius:6px;padding:8px 10px;width:180px;background:#fff">
          <div style="background:#ea4335;color:#fff;padding:3px 6px;font-weight:700;font-size:11px;border-radius:2px;display:inline-block;margin-bottom:6px">PDF</div>
          <div style="font-size:12px">Convocation_${ref}.pdf</div>
          <div style="font-size:11px;color:#5f6368">${248 + idx * 17} Ko</div>
        </div>
        <div style="border:1px solid #dadce0;border-radius:6px;padding:8px 10px;width:180px;background:#fff">
          <div style="background:#1a73e8;color:#fff;padding:3px 6px;font-weight:700;font-size:11px;border-radius:2px;display:inline-block;margin-bottom:6px">PDF</div>
          <div style="font-size:12px">Programme_detaille.pdf</div>
          <div style="font-size:11px;color:#5f6368">${412 + idx * 23} Ko</div>
        </div>
      </div>
      <p style="margin:14px 0 6px">${signoff},</p>
      <div style="margin-top:14px;padding-top:12px;border-top:1px solid #e8eaed;font-size:13px">
        <div style="font-weight:700;color:${brand.primary}">${contact.name}</div>
        <div style="color:#5f6368;font-size:12px">${contact.role}</div>
        <div style="margin-top:6px;font-size:11px;color:#5f6368">${brand.fullName}<br>${brand.address}<br>📞 ${contact.phone} · ✉ ${senderEmailFull(brand, idx)}</div>
      </div>
    </div>
    <div style="background:#f6f8fc;border-top:1px solid #e8eaed;padding:6px 24px;font-size:10px;color:#80868b">
      Message-ID: &lt;${ref}.${dateInsc.getTime()}@mail.${brand.domain}&gt; · DKIM pass · SPF pass · DMARC pass
    </div>
  </div>`;
}

// ============================================================
// FORMAT 2 — Outlook interface
// ============================================================
function renderOutlook(o: OrganismeInfo, t: PlanDevTraining, idx: number, dateInsc: Date, dateSession: Date, ref: string, brand: Brand): string {
  const contact = pickContact(brand, idx);
  const recipient = recipientName(t, o);
  const subject = `Inscription confirmée : ${t.nom}`;

  return `
  <div style="max-width:820px;margin:18px auto;background:#fff;border:1px solid #d1d1d1;border-radius:4px;overflow:hidden;box-shadow:0 2px 4px rgba(0,0,0,0.08);font-family:'Segoe UI',Arial,sans-serif">
    <div style="background:#0078d4;color:#fff;padding:10px 18px;display:flex;align-items:center;gap:10px;font-size:13px">
      <span style="font-weight:600">Outlook</span>
      <span style="opacity:0.85">— Boîte de réception</span>
      <span style="margin-left:auto;font-size:12px;opacity:0.85">${recipient.split(" ").slice(-1)[0]} (${userEmail(o)})</span>
    </div>
    <div style="background:#faf9f8;border-bottom:1px solid #e1dfdd;padding:14px 20px">
      <div style="font-size:18px;color:#252423;font-weight:600;margin-bottom:8px">${subject}</div>
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:36px;height:36px;border-radius:50%;background:${brand.primary};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px">${contact.name.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
        <div style="flex:1">
          <div style="font-size:13px;color:#252423"><strong>${contact.name}</strong> <span style="color:#605e5c;font-weight:400">&lt;${senderEmailFull(brand, idx)}&gt;</span></div>
          <div style="font-size:11px;color:#605e5c">À : ${recipient}; Cc : ${contact.email.split('.')[0]}.assistant@${brand.domain}</div>
        </div>
        <div style="font-size:11px;color:#605e5c;text-align:right">${fmtDateNum(dateInsc)} ${fmtTime(idx)}</div>
      </div>
    </div>
    <div style="padding:22px 28px;color:#252423;font-size:14px;line-height:1.6">
      <p style="margin:0 0 12px">Bonjour ${firstName(recipient)},</p>
      <p style="margin:0 0 12px">Suite à votre demande de pré-réservation transmise le ${fmtShort(new Date(dateInsc.getTime() - 86400000 * 3))}, je vous confirme officiellement votre inscription à la formation <strong>"${t.nom}"</strong>.</p>
      <p style="margin:0 0 12px"><strong>Détails de la session :</strong></p>
      <ul style="margin:0 0 12px;padding-left:22px">
        <li>Date prévisionnelle de démarrage : <strong>${fmtLong(dateSession)}</strong></li>
        <li>Durée totale : ${t.duree}</li>
        <li>Modalité : ${t.type}</li>
        <li>Tarif HT : ${(1200 + (idx * 380) % 2400).toLocaleString('fr-FR')} €</li>
        <li>Financement prévu : ${idx % 3 === 0 ? "OPCO (Atlas)" : idx % 3 === 1 ? "Plan de développement interne" : "Mixte OPCO + autofinancement"}</li>
      </ul>
      <p style="margin:0 0 12px">Une convention de formation tripartite vous sera adressée dans les 5 jours ouvrés. Merci de bien vouloir la signer électroniquement via le lien sécurisé qui vous sera transmis.</p>
      <p style="margin:0 0 12px">N'hésitez pas à me solliciter pour toute question complémentaire.</p>
      <p style="margin:0 0 4px">${brand.signoff[idx % brand.signoff.length]},</p>
      <p style="margin:0;font-weight:600;color:${brand.primary}">${contact.name}</p>
      <p style="margin:0;font-size:12px;color:#605e5c">${contact.role} — ${brand.fullName}<br>${contact.phone} · <a href="mailto:${senderEmailFull(brand, idx)}" style="color:${brand.primary}">${senderEmailFull(brand, idx)}</a></p>
    </div>
  </div>`;
}

// ============================================================
// FORMAT 3 — Page de confirmation portail (capture d'écran)
// ============================================================
function renderPortail(o: OrganismeInfo, t: PlanDevTraining, idx: number, dateInsc: Date, dateSession: Date, ref: string, brand: Brand): string {
  const recipient = recipientName(t, o);
  const contact = pickContact(brand, idx);

  return `
  <div style="max-width:820px;margin:18px auto;background:#fff;border:1px solid #e5e5e5;border-radius:6px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.08);font-family:Arial,sans-serif">
    <div style="background:#fff;border-bottom:1px solid #e5e5e5;padding:8px 16px;font-size:11px;color:#666;display:flex;align-items:center;gap:8px">
      <span style="background:#e8f5e9;color:#2e7d32;padding:2px 8px;border-radius:10px;font-size:10px">🔒 Connexion sécurisée</span>
      <span style="background:#f5f5f5;padding:4px 10px;border-radius:3px;flex:1;color:#333;word-break:break-all">https://espace-client.${brand.domain}/inscriptions/confirmation?ref=${ref}</span>
    </div>
    <div style="background:${brand.primary};color:#fff;padding:14px 24px;display:flex;align-items:center;gap:12px">
      <div style="background:#fff;color:${brand.primary};padding:6px 12px;font-weight:700;border-radius:3px;font-size:14px">${brand.shortName}</div>
      <div style="font-size:13px;opacity:0.9">Espace Client — ${brand.fullName}</div>
      <div style="margin-left:auto;font-size:12px;opacity:0.9">👤 ${recipient}</div>
    </div>
    <div style="padding:32px 36px">
      <div style="text-align:center;margin-bottom:24px">
        <div style="width:64px;height:64px;border-radius:50%;background:#22c55e;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:32px;font-weight:700;margin-bottom:12px">✓</div>
        <h1 style="font-size:22px;color:#1a1a1a;margin:0 0 4px">Inscription confirmée</h1>
        <p style="margin:0;color:#666;font-size:13px">Votre dossier <strong>${ref}</strong> a été enregistré le ${fmtShort(dateInsc)} à ${fmtTime(idx)}.</p>
      </div>
      <div style="border:1px solid #e5e5e5;border-radius:6px;padding:18px 22px;margin-bottom:18px">
        <div style="font-size:11px;color:${brand.accent};text-transform:uppercase;letter-spacing:1px;font-weight:700;margin-bottom:8px">Formation</div>
        <h2 style="margin:0 0 4px;font-size:18px;color:#1a1a1a">${t.nom}</h2>
        <p style="margin:0;color:#666;font-size:13px">${t.objectif}</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px">
        <div style="background:#f8f9fc;border:1px solid #e5e5e5;border-radius:6px;padding:14px"><div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px">Démarrage</div><div style="font-size:14px;color:#1a1a1a;font-weight:600">${fmtLong(dateSession)}</div></div>
        <div style="background:#f8f9fc;border:1px solid #e5e5e5;border-radius:6px;padding:14px"><div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px">Durée</div><div style="font-size:14px;color:#1a1a1a;font-weight:600">${t.duree}</div></div>
        <div style="background:#f8f9fc;border:1px solid #e5e5e5;border-radius:6px;padding:14px"><div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px">Modalité</div><div style="font-size:14px;color:#1a1a1a;font-weight:600">${t.type}</div></div>
        <div style="background:#f8f9fc;border:1px solid #e5e5e5;border-radius:6px;padding:14px"><div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px">Statut</div><div style="font-size:14px;color:#22c55e;font-weight:700">● Confirmée</div></div>
      </div>
      <div style="background:#fef7e0;border:1px solid #fdd663;border-radius:6px;padding:14px 18px;margin-bottom:18px;font-size:12px;color:#5a4a00">
        <strong>📅 Prochaines étapes</strong><br>
        1. Réception de la convention de formation sous 5 jours ouvrés<br>
        2. Questionnaire de positionnement à compléter (lien envoyé séparément)<br>
        3. Convocation finale 10 jours avant la session
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <div style="background:${brand.primary};color:#fff;padding:10px 18px;font-size:12px;border-radius:4px;font-weight:500">📥 Télécharger la convocation (PDF)</div>
        <div style="background:#fff;border:1px solid ${brand.primary};color:${brand.primary};padding:9px 18px;font-size:12px;border-radius:4px;font-weight:500">📅 Ajouter au calendrier (.ics)</div>
        <div style="background:#fff;border:1px solid #999;color:#444;padding:9px 18px;font-size:12px;border-radius:4px">✉ Contacter ${firstName(contact.name)}</div>
      </div>
    </div>
    <div style="background:#f8f9fc;border-top:1px solid #e5e5e5;padding:12px 24px;font-size:10px;color:#888;text-align:center">
      ${brand.fullName} — ${brand.address} — N° activité ${(11750000000 + idx * 137) % 99999999999} — Certifié Qualiopi
    </div>
  </div>`;
}

// ============================================================
// FORMAT 4 — Email avec thread de réponse
// ============================================================
function renderThread(o: OrganismeInfo, t: PlanDevTraining, idx: number, dateInsc: Date, dateSession: Date, ref: string, brand: Brand): string {
  const contact = pickContact(brand, idx);
  const recipient = recipientName(t, o);
  const recEmail = userEmail(o);
  const dateReply = new Date(dateInsc.getTime() + 86400000 * 1 + 3600000 * 2);

  return `
  <div style="max-width:820px;margin:18px auto;font-family:Roboto,Arial,sans-serif">
    <div style="background:#fff;border:1px solid #dadce0;border-radius:8px 8px 0 0;padding:14px 22px;border-bottom:none">
      <div style="font-size:18px;color:#202124;margin-bottom:6px">📧 Re: Demande d'inscription — ${t.nom}</div>
      <div style="font-size:11px;color:#5f6368">2 messages · Boîte de réception · Réf. ${ref}</div>
    </div>
    <!-- Premier message : la demande -->
    <div style="background:#fff;border:1px solid #dadce0;border-bottom:none;padding:14px 22px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
        <div style="width:34px;height:34px;border-radius:50%;background:#34a853;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px">${recipient.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
        <div style="flex:1"><div style="font-size:13px;color:#202124"><strong>${recipient}</strong> &lt;${recEmail}&gt;</div><div style="font-size:11px;color:#5f6368">À : ${senderEmailFull(brand, idx)}</div></div>
        <div style="font-size:11px;color:#5f6368">${fmtShort(dateInsc)} ${fmtTime(idx, 9)}</div>
      </div>
      <div style="font-size:13px;color:#3c4043;line-height:1.6;padding-left:44px">
        <p style="margin:0 0 8px">Bonjour,</p>
        <p style="margin:0 0 8px">Dans le cadre de notre plan de développement des compétences ${new Date(dateInsc).getFullYear() + 1}, je souhaite inscrire ${recipient.split(" ").length > 1 ? "un de nos collaborateurs" : "notre référent"} à la formation <strong>"${t.nom}"</strong> que vous proposez.</p>
        <p style="margin:0 0 8px">Pourriez-vous me confirmer la disponibilité d'une session sur le ${(idx % 2 === 0 ? "premier" : "deuxième")} ${(idx % 2 === 0 ? "trimestre" : "semestre")} ${new Date(dateSession).getFullYear()} et m'adresser un devis ?</p>
        <p style="margin:0 0 8px">Cordialement,<br>${recipient}<br>${o.nom}</p>
      </div>
    </div>
    <!-- Réponse de l'organisme -->
    <div style="background:#fff;border:1px solid #dadce0;border-radius:0 0 8px 8px;padding:14px 22px;border-top:1px dashed #dadce0">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
        <div style="width:34px;height:34px;border-radius:50%;background:${brand.primary};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px">${brand.shortName.substring(0, 2).toUpperCase()}</div>
        <div style="flex:1"><div style="font-size:13px;color:#202124"><strong>${contact.name}</strong> &lt;${senderEmailFull(brand, idx)}&gt;</div><div style="font-size:11px;color:#5f6368">À : ${recipient} &lt;${recEmail}&gt;</div></div>
        <div style="font-size:11px;color:#5f6368">${fmtShort(dateReply)} ${fmtTime(idx + 5, 10)}</div>
      </div>
      <div style="font-size:13px;color:#3c4043;line-height:1.6;padding-left:44px">
        <p style="margin:0 0 8px">Bonjour ${firstName(recipient)},</p>
        <p style="margin:0 0 8px">Merci pour votre intérêt. Je vous confirme avec plaisir l'inscription à <strong>${t.nom}</strong> :</p>
        <div style="background:#e8f0fe;border-left:3px solid #1a73e8;padding:10px 14px;margin:8px 0;font-size:12px">
          ✅ <strong>Inscription validée</strong> — Réf. ${ref}<br>
          📅 Démarrage : <strong>${fmtLong(dateSession)}</strong><br>
          ⏱ Durée : ${t.duree} · Modalité : ${t.type}<br>
          💶 Tarif : ${(1490 + (idx * 290) % 1800).toLocaleString('fr-FR')} € HT
        </div>
        <p style="margin:0 0 8px">Vous trouverez ci-joint la convention de formation à signer ainsi que notre programme détaillé. Une fois la convention retournée, je vous transmettrai la convocation finale et les informations de connexion / d'accès.</p>
        <p style="margin:0 0 8px">À votre disposition pour toute question.</p>
        <p style="margin:0 0 4px">${brand.signoff[idx % brand.signoff.length]},</p>
        <p style="margin:0;font-weight:600;color:${brand.primary}">${contact.name}</p>
        <p style="margin:0;font-size:11px;color:#5f6368">${contact.role} — ${brand.fullName}<br>${contact.phone}</p>
      </div>
    </div>
  </div>`;
}

// ============================================================
// FORMAT 5 — Devis / Bon de commande accepté
// ============================================================
function renderDevis(o: OrganismeInfo, t: PlanDevTraining, idx: number, dateInsc: Date, dateSession: Date, ref: string, brand: Brand): string {
  const recipient = recipientName(t, o);
  const contact = pickContact(brand, idx);
  const tarifHT = 1290 + (idx * 380) % 2200;
  const tva = Math.round(tarifHT * 0.20);
  const ttc = tarifHT + tva;

  return `
  <div style="max-width:820px;margin:18px auto;background:#fff;border:1px solid #e0e0e0;font-family:'Helvetica Neue',Arial,sans-serif;color:#222">
    <div style="background:${brand.primary};color:#fff;padding:18px 28px;display:flex;align-items:center;gap:14px">
      <div style="background:#fff;color:${brand.primary};padding:8px 14px;font-weight:700;font-size:15px;border-radius:3px">${brand.shortName}</div>
      <div style="flex:1">
        <div style="font-size:13px;opacity:0.9">${brand.fullName}</div>
        <div style="font-size:11px;opacity:0.75">${brand.address}</div>
      </div>
      <div style="text-align:right;font-size:11px;opacity:0.85">N° SIRET 380 256 477 000${pad(13 + idx)}<br>TVA : FR ${pad(43 + idx)} 380256477<br>NDA : 11 75 ${pad(48000 + idx) }</div>
    </div>
    <div style="padding:20px 28px;border-bottom:2px solid ${brand.accent}">
      <div style="display:flex;align-items:flex-end;gap:20px">
        <div style="flex:1">
          <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px">Devis accepté — Bon de commande</div>
          <h1 style="font-size:28px;color:${brand.primary};margin:0;font-weight:700">N° ${ref}</h1>
          <div style="font-size:12px;color:#666;margin-top:4px">Émis le ${fmtShort(dateInsc)} · Validité 30 jours</div>
        </div>
        <div style="text-align:right">
          <div style="background:#22c55e;color:#fff;padding:6px 14px;font-size:11px;font-weight:700;letter-spacing:1px;border-radius:3px;display:inline-block">✓ ACCEPTÉ ${fmtDateNum(new Date(dateInsc.getTime() + 86400000 * 4))}</div>
        </div>
      </div>
    </div>
    <div style="padding:20px 28px;display:grid;grid-template-columns:1fr 1fr;gap:18px;border-bottom:1px solid #eee">
      <div>
        <div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Prestataire</div>
        <div style="font-size:13px;line-height:1.5"><strong>${brand.fullName}</strong><br>${brand.address}<br>${contact.phone}<br>${senderEmailFull(brand, idx)}</div>
      </div>
      <div>
        <div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Bénéficiaire</div>
        <div style="font-size:13px;line-height:1.5"><strong>${o.nom}</strong><br>${o.adresse || ""}, ${o.codePostal || ""} ${o.ville || ""}<br>SIRET ${o.siret || "—"}<br>Contact : ${recipient}</div>
      </div>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:13px">
      <thead><tr style="background:#f8f9fc;border-bottom:2px solid ${brand.primary}"><th style="padding:10px 16px;text-align:left;font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px">Prestation</th><th style="padding:10px 16px;text-align:center;font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px">Durée</th><th style="padding:10px 16px;text-align:right;font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px">PU HT</th><th style="padding:10px 16px;text-align:right;font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px">Total HT</th></tr></thead>
      <tbody>
        <tr style="border-bottom:1px solid #eee"><td style="padding:14px 16px"><strong>${t.nom}</strong><br><span style="font-size:11px;color:#666">${t.objectif}</span><br><span style="font-size:11px;color:#888">Modalité : ${t.type} · Démarrage ${fmtShort(dateSession)}</span></td><td style="padding:14px 16px;text-align:center">${t.duree}</td><td style="padding:14px 16px;text-align:right">${tarifHT.toLocaleString('fr-FR')} €</td><td style="padding:14px 16px;text-align:right">${tarifHT.toLocaleString('fr-FR')} €</td></tr>
      </tbody>
    </table>
    <div style="display:flex;justify-content:flex-end;padding:14px 28px;background:#f8f9fc;border-top:1px solid #eee">
      <table style="font-size:13px"><tr><td style="padding:3px 14px;color:#666">Sous-total HT</td><td style="padding:3px 0;text-align:right;min-width:90px">${tarifHT.toLocaleString('fr-FR')} €</td></tr><tr><td style="padding:3px 14px;color:#666">TVA 20%</td><td style="padding:3px 0;text-align:right">${tva.toLocaleString('fr-FR')} €</td></tr><tr style="border-top:2px solid ${brand.primary}"><td style="padding:8px 14px;font-weight:700;color:${brand.primary}">TOTAL TTC</td><td style="padding:8px 0;text-align:right;font-weight:700;color:${brand.primary};font-size:16px">${ttc.toLocaleString('fr-FR')} €</td></tr></table>
    </div>
    <div style="padding:18px 28px;border-top:1px solid #eee;background:#fff;font-size:11px;color:#666;line-height:1.6">
      <strong>Modalités de règlement :</strong> 30% à la signature, 70% à l'issue de la formation, à 30 jours fin de mois.<br>
      <strong>Action de formation</strong> au sens de l'article L.6313-1 du Code du travail. Cet organisme est référençable au DataDock et certifié <strong>Qualiopi</strong> sous le n° de certificat ${pad(2024 + idx % 2)}/${(60000 + idx * 47) % 99999}.
    </div>
    <div style="padding:14px 28px;border-top:1px dashed #ccc;background:#f8f9fc;display:flex;justify-content:space-between;font-size:11px;color:#666">
      <div>Signature & cachet ${brand.shortName} :<br><div style="margin-top:6px;width:140px;height:50px;border:1px dashed #ccc"></div></div>
      <div>Bon pour accord — ${o.nom} :<br><div style="margin-top:6px;width:140px;height:50px;border:1px dashed #ccc"></div></div>
    </div>
  </div>`;
}

// ============================================================
// Sélection du format selon l'index
// ============================================================
function renderPage(o: OrganismeInfo, f: FormationInfo, t: PlanDevTraining, idx: number): string {
  const brand = detectBrand(t.formateur);
  const dateInsc = inscriptionDateObj(f, 2 + (idx % 4), idx * 5);
  const dateSession = sessionDateObj(f, 2 + (idx % 5), idx * 7);
  const year = new Date(f.dateDebut || Date.now()).getFullYear();
  const seed = (f.intitule || "FORM").length + idx * 13 + (f.codeRNCP ? f.codeRNCP.length : 7) * 3;
  const ref = refNumber(seed, brand, year);

  // Cycle entre 5 formats différents pour varier
  const format = idx % 5;
  switch (format) {
    case 0: return renderGmail(o, t, idx, dateInsc, dateSession, ref, brand);
    case 1: return renderOutlook(o, t, idx, dateInsc, dateSession, ref, brand);
    case 2: return renderPortail(o, t, idx, dateInsc, dateSession, ref, brand);
    case 3: return renderThread(o, t, idx, dateInsc, dateSession, ref, brand);
    case 4: return renderDevis(o, t, idx, dateInsc, dateSession, ref, brand);
    default: return renderGmail(o, t, idx, dateInsc, dateSession, ref, brand);
  }
}

function wrapRaw(inner: string): string {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="pdf-page-size" content="210x297"><style>
    body{margin:0;padding:0;background:#f1f3f4;font-family:Roboto,Arial,sans-serif}
    @page{margin:0}
    a{color:inherit;text-decoration:none}
  </style></head><body>${inner}</body></html>`;
}

export function genPlanDevPreuvesInscription(
  o: OrganismeInfo,
  f: FormationInfo,
  formateurs: FormateurInfo[],
): string {
  const trainings = getPlanDevTrainings(f, formateurs);

  if (!trainings.length) {
    return wrapRaw(
      `<div style="padding:40px;text-align:center;color:#5f6368;font-family:Roboto,Arial,sans-serif">Aucune formation au plan de développement des compétences pour cette formation.</div>`,
    );
  }

  const pages = trainings
    .map((t, idx) => `<div style="page-break-after:always;margin:0;padding:0;background:#f1f3f4">${renderPage(o, f, t, idx)}</div>`)
    .join("\n");
  return wrapRaw(pages);
}
