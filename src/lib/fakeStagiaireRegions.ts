// Communes principales par région française avec code postal et département
export type CommuneEntry = { cp: string; commune: string; dept: string };

export const REGIONS: Record<string, { label: string; communes: CommuneEntry[] }> = {
  "ile-de-france": {
    label: "Île-de-France",
    communes: [
      { cp: "75011", commune: "Paris", dept: "75" }, { cp: "75013", commune: "Paris", dept: "75" },
      { cp: "75015", commune: "Paris", dept: "75" }, { cp: "75017", commune: "Paris", dept: "75" },
      { cp: "75018", commune: "Paris", dept: "75" }, { cp: "75019", commune: "Paris", dept: "75" },
      { cp: "75020", commune: "Paris", dept: "75" }, { cp: "75010", commune: "Paris", dept: "75" },
      { cp: "77100", commune: "Meaux", dept: "77" }, { cp: "77000", commune: "Melun", dept: "77" },
      { cp: "77340", commune: "Pontault-Combault", dept: "77" }, { cp: "77500", commune: "Chelles", dept: "77" },
      { cp: "78000", commune: "Versailles", dept: "78" }, { cp: "78200", commune: "Mantes-la-Jolie", dept: "78" },
      { cp: "78500", commune: "Sartrouville", dept: "78" }, { cp: "91000", commune: "Évry-Courcouronnes", dept: "91" },
      { cp: "91100", commune: "Corbeil-Essonnes", dept: "91" }, { cp: "91300", commune: "Massy", dept: "91" },
      { cp: "92100", commune: "Boulogne-Billancourt", dept: "92" }, { cp: "92110", commune: "Clichy", dept: "92" },
      { cp: "92130", commune: "Issy-les-Moulineaux", dept: "92" }, { cp: "92300", commune: "Levallois-Perret", dept: "92" },
      { cp: "92400", commune: "Courbevoie", dept: "92" }, { cp: "92700", commune: "Colombes", dept: "92" },
      { cp: "93000", commune: "Bobigny", dept: "93" }, { cp: "93100", commune: "Montreuil", dept: "93" },
      { cp: "93200", commune: "Saint-Denis", dept: "93" }, { cp: "93300", commune: "Aubervilliers", dept: "93" },
      { cp: "93600", commune: "Aulnay-sous-Bois", dept: "93" }, { cp: "93700", commune: "Drancy", dept: "93" },
      { cp: "94000", commune: "Créteil", dept: "94" }, { cp: "94200", commune: "Ivry-sur-Seine", dept: "94" },
      { cp: "94400", commune: "Vitry-sur-Seine", dept: "94" }, { cp: "94500", commune: "Champigny-sur-Marne", dept: "94" },
      { cp: "95100", commune: "Argenteuil", dept: "95" }, { cp: "95200", commune: "Sarcelles", dept: "95" },
      { cp: "95400", commune: "Villiers-le-Bel", dept: "95" }, { cp: "95800", commune: "Cergy", dept: "95" },
    ],
  },
  "auvergne-rhone-alpes": {
    label: "Auvergne-Rhône-Alpes",
    communes: [
      { cp: "69001", commune: "Lyon", dept: "69" }, { cp: "69003", commune: "Lyon", dept: "69" },
      { cp: "69007", commune: "Lyon", dept: "69" }, { cp: "69100", commune: "Villeurbanne", dept: "69" },
      { cp: "69200", commune: "Vénissieux", dept: "69" }, { cp: "69500", commune: "Bron", dept: "69" },
      { cp: "38000", commune: "Grenoble", dept: "38" }, { cp: "38100", commune: "Grenoble", dept: "38" },
      { cp: "38200", commune: "Vienne", dept: "38" }, { cp: "38400", commune: "Saint-Martin-d'Hères", dept: "38" },
      { cp: "63000", commune: "Clermont-Ferrand", dept: "63" }, { cp: "63100", commune: "Clermont-Ferrand", dept: "63" },
      { cp: "42000", commune: "Saint-Étienne", dept: "42" }, { cp: "42100", commune: "Saint-Étienne", dept: "42" },
      { cp: "73000", commune: "Chambéry", dept: "73" }, { cp: "74000", commune: "Annecy", dept: "74" },
      { cp: "74100", commune: "Annemasse", dept: "74" }, { cp: "01000", commune: "Bourg-en-Bresse", dept: "01" },
      { cp: "26000", commune: "Valence", dept: "26" }, { cp: "07000", commune: "Privas", dept: "07" },
    ],
  },
  "hauts-de-france": {
    label: "Hauts-de-France",
    communes: [
      { cp: "59000", commune: "Lille", dept: "59" }, { cp: "59100", commune: "Roubaix", dept: "59" },
      { cp: "59200", commune: "Tourcoing", dept: "59" }, { cp: "59300", commune: "Valenciennes", dept: "59" },
      { cp: "59500", commune: "Douai", dept: "59" }, { cp: "59800", commune: "Lille", dept: "59" },
      { cp: "62000", commune: "Arras", dept: "62" }, { cp: "62100", commune: "Calais", dept: "62" },
      { cp: "62200", commune: "Boulogne-sur-Mer", dept: "62" }, { cp: "62300", commune: "Lens", dept: "62" },
      { cp: "80000", commune: "Amiens", dept: "80" }, { cp: "60000", commune: "Beauvais", dept: "60" },
      { cp: "60100", commune: "Creil", dept: "60" }, { cp: "60200", commune: "Compiègne", dept: "60" },
      { cp: "02000", commune: "Laon", dept: "02" }, { cp: "02100", commune: "Saint-Quentin", dept: "02" },
    ],
  },
  "provence-alpes-cote-azur": {
    label: "Provence-Alpes-Côte d'Azur",
    communes: [
      { cp: "13001", commune: "Marseille", dept: "13" }, { cp: "13003", commune: "Marseille", dept: "13" },
      { cp: "13008", commune: "Marseille", dept: "13" }, { cp: "13013", commune: "Marseille", dept: "13" },
      { cp: "13100", commune: "Aix-en-Provence", dept: "13" }, { cp: "13200", commune: "Arles", dept: "13" },
      { cp: "13600", commune: "La Ciotat", dept: "13" }, { cp: "06000", commune: "Nice", dept: "06" },
      { cp: "06100", commune: "Nice", dept: "06" }, { cp: "06200", commune: "Nice", dept: "06" },
      { cp: "06300", commune: "Nice", dept: "06" }, { cp: "06400", commune: "Cannes", dept: "06" },
      { cp: "06600", commune: "Antibes", dept: "06" }, { cp: "83000", commune: "Toulon", dept: "83" },
      { cp: "83100", commune: "Toulon", dept: "83" }, { cp: "83200", commune: "Toulon", dept: "83" },
      { cp: "84000", commune: "Avignon", dept: "84" }, { cp: "05000", commune: "Gap", dept: "05" },
      { cp: "04000", commune: "Digne-les-Bains", dept: "04" },
    ],
  },
  "occitanie": {
    label: "Occitanie",
    communes: [
      { cp: "31000", commune: "Toulouse", dept: "31" }, { cp: "31100", commune: "Toulouse", dept: "31" },
      { cp: "31200", commune: "Toulouse", dept: "31" }, { cp: "31300", commune: "Toulouse", dept: "31" },
      { cp: "31400", commune: "Toulouse", dept: "31" }, { cp: "31500", commune: "Toulouse", dept: "31" },
      { cp: "34000", commune: "Montpellier", dept: "34" }, { cp: "34070", commune: "Montpellier", dept: "34" },
      { cp: "34080", commune: "Montpellier", dept: "34" }, { cp: "34200", commune: "Sète", dept: "34" },
      { cp: "30000", commune: "Nîmes", dept: "30" }, { cp: "11000", commune: "Carcassonne", dept: "11" },
      { cp: "66000", commune: "Perpignan", dept: "66" }, { cp: "12000", commune: "Rodez", dept: "12" },
      { cp: "65000", commune: "Tarbes", dept: "65" }, { cp: "81000", commune: "Albi", dept: "81" },
      { cp: "82000", commune: "Montauban", dept: "82" }, { cp: "32000", commune: "Auch", dept: "32" },
      { cp: "46000", commune: "Cahors", dept: "46" }, { cp: "48000", commune: "Mende", dept: "48" },
    ],
  },
  "nouvelle-aquitaine": {
    label: "Nouvelle-Aquitaine",
    communes: [
      { cp: "33000", commune: "Bordeaux", dept: "33" }, { cp: "33100", commune: "Bordeaux", dept: "33" },
      { cp: "33200", commune: "Bordeaux", dept: "33" }, { cp: "33300", commune: "Bordeaux", dept: "33" },
      { cp: "33800", commune: "Bordeaux", dept: "33" }, { cp: "33600", commune: "Pessac", dept: "33" },
      { cp: "33700", commune: "Mérignac", dept: "33" }, { cp: "64000", commune: "Pau", dept: "64" },
      { cp: "64100", commune: "Bayonne", dept: "64" }, { cp: "64200", commune: "Biarritz", dept: "64" },
      { cp: "87000", commune: "Limoges", dept: "87" }, { cp: "86000", commune: "Poitiers", dept: "86" },
      { cp: "17000", commune: "La Rochelle", dept: "17" }, { cp: "16000", commune: "Angoulême", dept: "16" },
      { cp: "47000", commune: "Agen", dept: "47" }, { cp: "24000", commune: "Périgueux", dept: "24" },
      { cp: "19000", commune: "Tulle", dept: "19" }, { cp: "40000", commune: "Mont-de-Marsan", dept: "40" },
      { cp: "79000", commune: "Niort", dept: "79" }, { cp: "23000", commune: "Guéret", dept: "23" },
    ],
  },
  "grand-est": {
    label: "Grand Est",
    communes: [
      { cp: "67000", commune: "Strasbourg", dept: "67" }, { cp: "67100", commune: "Strasbourg", dept: "67" },
      { cp: "67200", commune: "Strasbourg", dept: "67" }, { cp: "68100", commune: "Mulhouse", dept: "68" },
      { cp: "68200", commune: "Mulhouse", dept: "68" }, { cp: "68000", commune: "Colmar", dept: "68" },
      { cp: "54000", commune: "Nancy", dept: "54" }, { cp: "54100", commune: "Nancy", dept: "54" },
      { cp: "57000", commune: "Metz", dept: "57" }, { cp: "57050", commune: "Metz", dept: "57" },
      { cp: "51100", commune: "Reims", dept: "51" }, { cp: "51000", commune: "Châlons-en-Champagne", dept: "51" },
      { cp: "52000", commune: "Chaumont", dept: "52" }, { cp: "55000", commune: "Bar-le-Duc", dept: "55" },
      { cp: "08000", commune: "Charleville-Mézières", dept: "08" }, { cp: "10000", commune: "Troyes", dept: "10" },
      { cp: "88000", commune: "Épinal", dept: "88" },
    ],
  },
  "pays-de-la-loire": {
    label: "Pays de la Loire",
    communes: [
      { cp: "44000", commune: "Nantes", dept: "44" }, { cp: "44100", commune: "Nantes", dept: "44" },
      { cp: "44200", commune: "Nantes", dept: "44" }, { cp: "44300", commune: "Nantes", dept: "44" },
      { cp: "44600", commune: "Saint-Nazaire", dept: "44" }, { cp: "49000", commune: "Angers", dept: "49" },
      { cp: "49100", commune: "Angers", dept: "49" }, { cp: "72000", commune: "Le Mans", dept: "72" },
      { cp: "72100", commune: "Le Mans", dept: "72" }, { cp: "85000", commune: "La Roche-sur-Yon", dept: "85" },
      { cp: "53000", commune: "Laval", dept: "53" },
    ],
  },
  "bretagne": {
    label: "Bretagne",
    communes: [
      { cp: "35000", commune: "Rennes", dept: "35" }, { cp: "35200", commune: "Rennes", dept: "35" },
      { cp: "35700", commune: "Rennes", dept: "35" }, { cp: "29200", commune: "Brest", dept: "29" },
      { cp: "29000", commune: "Quimper", dept: "29" }, { cp: "22000", commune: "Saint-Brieuc", dept: "22" },
      { cp: "56000", commune: "Vannes", dept: "56" }, { cp: "56100", commune: "Lorient", dept: "56" },
      { cp: "35400", commune: "Saint-Malo", dept: "35" }, { cp: "29600", commune: "Morlaix", dept: "29" },
    ],
  },
  "normandie": {
    label: "Normandie",
    communes: [
      { cp: "76000", commune: "Rouen", dept: "76" }, { cp: "76100", commune: "Rouen", dept: "76" },
      { cp: "76600", commune: "Le Havre", dept: "76" }, { cp: "14000", commune: "Caen", dept: "14" },
      { cp: "14100", commune: "Lisieux", dept: "14" }, { cp: "50000", commune: "Saint-Lô", dept: "50" },
      { cp: "50100", commune: "Cherbourg-en-Cotentin", dept: "50" }, { cp: "27000", commune: "Évreux", dept: "27" },
      { cp: "61000", commune: "Alençon", dept: "61" },
    ],
  },
  "bourgogne-franche-comte": {
    label: "Bourgogne-Franche-Comté",
    communes: [
      { cp: "21000", commune: "Dijon", dept: "21" }, { cp: "25000", commune: "Besançon", dept: "25" },
      { cp: "71000", commune: "Mâcon", dept: "71" }, { cp: "71100", commune: "Chalon-sur-Saône", dept: "71" },
      { cp: "89000", commune: "Auxerre", dept: "89" }, { cp: "58000", commune: "Nevers", dept: "58" },
      { cp: "70000", commune: "Vesoul", dept: "70" }, { cp: "39000", commune: "Lons-le-Saunier", dept: "39" },
      { cp: "90000", commune: "Belfort", dept: "90" },
    ],
  },
  "centre-val-de-loire": {
    label: "Centre-Val de Loire",
    communes: [
      { cp: "45000", commune: "Orléans", dept: "45" }, { cp: "37000", commune: "Tours", dept: "37" },
      { cp: "37100", commune: "Tours", dept: "37" }, { cp: "18000", commune: "Bourges", dept: "18" },
      { cp: "41000", commune: "Blois", dept: "41" }, { cp: "28000", commune: "Chartres", dept: "28" },
      { cp: "36000", commune: "Châteauroux", dept: "36" },
    ],
  },
  "corse": {
    label: "Corse",
    communes: [
      { cp: "20000", commune: "Ajaccio", dept: "2A" }, { cp: "20090", commune: "Ajaccio", dept: "2A" },
      { cp: "20200", commune: "Bastia", dept: "2B" }, { cp: "20600", commune: "Bastia", dept: "2B" },
      { cp: "20250", commune: "Corte", dept: "2B" }, { cp: "20100", commune: "Sartène", dept: "2A" },
    ],
  },
};

export type RegionKey = keyof typeof REGIONS;

export function getAllCommunes(): CommuneEntry[] {
  return Object.values(REGIONS).flatMap(r => r.communes);
}
