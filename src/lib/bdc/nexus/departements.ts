/** Départements français : nom et forme « du / de la / de l' / des » (MDPH, conseil départemental). */
const DEPTS: Record<string, [string, string]> = {
  "01": ["Ain", "de l'"], "02": ["Aisne", "de l'"], "03": ["Allier", "de l'"], "04": ["Alpes-de-Haute-Provence", "des "],
  "05": ["Hautes-Alpes", "des "], "06": ["Alpes-Maritimes", "des "], "07": ["Ardèche", "de l'"], "08": ["Ardennes", "des "],
  "09": ["Ariège", "de l'"], "10": ["Aube", "de l'"], "11": ["Aude", "de l'"], "12": ["Aveyron", "de l'"],
  "13": ["Bouches-du-Rhône", "des "], "14": ["Calvados", "du "], "15": ["Cantal", "du "], "16": ["Charente", "de la "],
  "17": ["Charente-Maritime", "de la "], "18": ["Cher", "du "], "19": ["Corrèze", "de la "], "2A": ["Corse-du-Sud", "de la "],
  "2B": ["Haute-Corse", "de la "], "21": ["Côte-d'Or", "de la "], "22": ["Côtes-d'Armor", "des "], "23": ["Creuse", "de la "],
  "24": ["Dordogne", "de la "], "25": ["Doubs", "du "], "26": ["Drôme", "de la "], "27": ["Eure", "de l'"],
  "28": ["Eure-et-Loir", "d'"], "29": ["Finistère", "du "], "30": ["Gard", "du "], "31": ["Haute-Garonne", "de la "],
  "32": ["Gers", "du "], "33": ["Gironde", "de la "], "34": ["Hérault", "de l'"], "35": ["Ille-et-Vilaine", "d'"],
  "36": ["Indre", "de l'"], "37": ["Indre-et-Loire", "d'"], "38": ["Isère", "de l'"], "39": ["Jura", "du "],
  "40": ["Landes", "des "], "41": ["Loir-et-Cher", "du "], "42": ["Loire", "de la "], "43": ["Haute-Loire", "de la "],
  "44": ["Loire-Atlantique", "de la "], "45": ["Loiret", "du "], "46": ["Lot", "du "], "47": ["Lot-et-Garonne", "du "],
  "48": ["Lozère", "de la "], "49": ["Maine-et-Loire", "du "], "50": ["Manche", "de la "], "51": ["Marne", "de la "],
  "52": ["Haute-Marne", "de la "], "53": ["Mayenne", "de la "], "54": ["Meurthe-et-Moselle", "de "], "55": ["Meuse", "de la "],
  "56": ["Morbihan", "du "], "57": ["Moselle", "de la "], "58": ["Nièvre", "de la "], "59": ["Nord", "du "],
  "60": ["Oise", "de l'"], "61": ["Orne", "de l'"], "62": ["Pas-de-Calais", "du "], "63": ["Puy-de-Dôme", "du "],
  "64": ["Pyrénées-Atlantiques", "des "], "65": ["Hautes-Pyrénées", "des "], "66": ["Pyrénées-Orientales", "des "], "67": ["Bas-Rhin", "du "],
  "68": ["Haut-Rhin", "du "], "69": ["Rhône", "du "], "70": ["Haute-Saône", "de la "], "71": ["Saône-et-Loire", "de "],
  "72": ["Sarthe", "de la "], "73": ["Savoie", "de la "], "74": ["Haute-Savoie", "de la "], "75": ["Paris", "de "],
  "76": ["Seine-Maritime", "de la "], "77": ["Seine-et-Marne", "de "], "78": ["Yvelines", "des "], "79": ["Deux-Sèvres", "des "],
  "80": ["Somme", "de la "], "81": ["Tarn", "du "], "82": ["Tarn-et-Garonne", "du "], "83": ["Var", "du "],
  "84": ["Vaucluse", "du "], "85": ["Vendée", "de la "], "86": ["Vienne", "de la "], "87": ["Haute-Vienne", "de la "],
  "88": ["Vosges", "des "], "89": ["Yonne", "de l'"], "90": ["Territoire de Belfort", "du "], "91": ["Essonne", "de l'"],
  "92": ["Hauts-de-Seine", "des "], "93": ["Seine-Saint-Denis", "de la "], "94": ["Val-de-Marne", "du "], "95": ["Val-d'Oise", "du "],
  "971": ["Guadeloupe", "de la "], "972": ["Martinique", "de la "], "973": ["Guyane", "de la "], "974": ["La Réunion", "de "], "976": ["Mayotte", "de "],
};

export interface Departement { numero: string; nom: string; du: string }

/** Département déduit du code postal (Corse 20xxx : 2A jusqu'à 201xx, 2B au-delà). */
export function departementDuCodePostal(cp?: string): Departement | null {
  const c = (cp || "").replace(/\s/g, "");
  if (!/^\d{5}$/.test(c)) return null;
  let num = c.slice(0, 2);
  if (num === "97") num = c.slice(0, 3);
  if (num === "20") num = Number(c.slice(0, 3)) < 202 ? "2A" : "2B";
  const d = DEPTS[num];
  return d ? { numero: num, nom: d[0], du: `${d[1]}${d[0]}` } : null;
}

const DREETS: Record<string, string> = {
  "Île-de-France": "idf.dreets.gouv.fr", "Auvergne-Rhône-Alpes": "auvergne-rhone-alpes.dreets.gouv.fr",
  "Bourgogne-Franche-Comté": "bourgogne-franche-comte.dreets.gouv.fr", "Bretagne": "bretagne.dreets.gouv.fr",
  "Centre-Val de Loire": "centre-val-de-loire.dreets.gouv.fr", "Grand Est": "grand-est.dreets.gouv.fr",
  "Hauts-de-France": "hauts-de-france.dreets.gouv.fr", "Normandie": "normandie.dreets.gouv.fr",
  "Nouvelle-Aquitaine": "nouvelle-aquitaine.dreets.gouv.fr", "Occitanie": "occitanie.dreets.gouv.fr",
  "Pays de la Loire": "pays-de-la-loire.dreets.gouv.fr", "Provence-Alpes-Côte d'Azur": "paca.dreets.gouv.fr",
  "Corse": "corse.dreets.gouv.fr",
};

export function dreetsUrl(region: string): string {
  return DREETS[region] || "travail-emploi.gouv.fr";
}

/** « d'Île-de-France », « de Normandie », « des Hauts-de-France », « du Grand Est »… */
export function regionDe(region: string): string {
  if (/^(Hauts|Pays)/.test(region)) return region.startsWith("Pays") ? `des ${region}` : `des ${region}`;
  if (region === "Grand Est" || region === "Centre-Val de Loire") return `du ${region}`;
  if (/^[AEIOUÎÉ]/i.test(region)) return `d'${region}`;
  return `de ${region}`;
}
