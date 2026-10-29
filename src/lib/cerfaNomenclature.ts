// Nomenclatures officielles de la notice CERFA 51649#09 (contrat d'apprentissage 10103*14).
export type Opt = [string, string];

export const TYPE_EMPLOYEUR: Opt[] = [
  ["11", "Entreprise inscrite au répertoire des métiers / registre Alsace-Moselle"],
  ["12", "Entreprise inscrite uniquement au RCS"],
  ["13", "Entreprise relevant de la MSA"],
  ["14", "Profession libérale"],
  ["15", "Association"],
  ["16", "Autre employeur privé"],
  ["21", "Service de l'État"],
  ["22", "Commune"],
  ["23", "Département"],
  ["24", "Région"],
  ["25", "Établissement public hospitalier"],
  ["26", "Établissement public local d'enseignement"],
  ["27", "Établissement public administratif de l'État"],
  ["28", "Établissement public administratif local (dont EPCI)"],
  ["29", "Autre employeur public"],
  ["30", "Établissement public industriel et commercial"],
];
export const EMPLOYEUR_SPECIFIQUE: Opt[] = [
  ["0", "Aucun de ces cas"],
  ["1", "Entreprise de travail temporaire"],
  ["2", "Groupement d'employeurs"],
  ["3", "Employeur saisonnier"],
  ["4", "Apprentissage familial (ascendant)"],
];
export const REGIME_SOCIAL: Opt[] = [["1", "MSA"], ["2", "URSSAF"]];
export const SITUATION_AVANT: Opt[] = [
  ["1", "Scolaire"], ["2", "Prépa apprentissage"], ["3", "Étudiant"], ["4", "Contrat d'apprentissage"],
  ["5", "Contrat de professionnalisation"], ["6", "Contrat aidé"],
  ["7", "En formation au CFA (stagiaire FP) avant contrat"], ["8", "En formation au CFA après rupture d'un contrat"],
  ["9", "Autre situation de stagiaire FP"], ["10", "Salarié"], ["11", "Demandeur d'emploi"], ["12", "Inactif"],
];
export const DIPLOMES: Opt[] = [
  ["80", "Doctorat"], ["73", "Master"], ["75", "Diplôme d'ingénieur"], ["76", "Diplôme d'école de commerce"],
  ["79", "Autre bac+5 ou plus"], ["62", "Licence professionnelle"], ["63", "Licence générale"], ["64", "BUT"],
  ["69", "Autre bac+3 ou 4"], ["54", "BTS"], ["55", "DUT"], ["58", "Autre bac+2"],
  ["41", "Bac professionnel"], ["42", "Bac général"], ["43", "Bac technologique"],
  ["44", "Diplôme de spécialisation professionnelle"], ["49", "Autre niveau bac"],
  ["33", "CAP"], ["34", "BEP"], ["35", "Certificat de spécialisation"], ["38", "Autre CAP/BEP"],
  ["25", "Diplôme national du Brevet"], ["26", "Certificat de formation générale"], ["13", "Aucun diplôme ni titre"],
];
export const DERNIERE_CLASSE: Opt[] = [
  ["01", "Dernière année suivie, diplôme obtenu"], ["11", "1re année validée"], ["12", "1re année non validée"],
  ["21", "2e année validée"], ["22", "2e année non validée"], ["31", "3e année validée"], ["32", "3e année non validée"],
  ["40", "1er cycle secondaire achevé (collège)"], ["41", "Études interrompues en 3e"], ["42", "Études interrompues en 4e"],
];
export const TYPE_CONTRAT: Opt[] = [
  ["11", "Premier contrat d'apprentissage"],
  ["21", "Nouveau contrat, même employeur (précédent terminé)"],
  ["22", "Nouveau contrat, autre employeur (précédent terminé)"],
  ["23", "Nouveau contrat après rupture"],
  ["31", "Avenant : situation juridique de l'employeur"], ["32", "Avenant : contrat saisonnier"],
  ["33", "Avenant : prolongation après échec"], ["34", "Avenant : prolongation RQTH"],
  ["35", "Avenant : diplôme supplémentaire"], ["36", "Avenant : autres changements"],
  ["37", "Avenant : lieu d'exécution"], ["38", "Avenant : lieu de formation théorique"],
];
export const TYPE_DEROGATION: Opt[] = [
  ["11", "Âge inférieur à 16 ans"], ["12", "Âge supérieur à 29 ans"], ["21", "Réduction de durée"],
  ["22", "Allongement de durée"], ["50", "Cumul de dérogations"], ["60", "Autre dérogation"],
];

/** Type d'employeur déduit de la catégorie juridique INSEE ; vide si non déterminable. */
export function typeEmployeurDepuisNature(nature: string, ape = ""): string {
  const n = String(nature || "");
  if (!n) return "";
  if (/^01|^02|^03/.test(ape)) return "13";
  if (n.startsWith("92")) return "15";
  if (n === "7210") return "22";
  if (n === "7220") return "23";
  if (n === "7230") return "24";
  if (n === "7364") return "25";
  if (n === "7331") return "26";
  if (n.startsWith("71") || n === "7120") return "21";
  if (n.startsWith("73")) return "27";
  if (n.startsWith("74")) return "28";
  if (n === "4110") return "30";
  if (n.startsWith("7")) return "29";
  if (/^5|^6/.test(n)) return "12";
  return "";
}

/** Régime social : MSA pour les activités agricoles (NAF 01 à 03), sinon URSSAF. */
export function regimeSocialDepuisApe(ape: string): string {
  const a = String(ape || "").replace(/\D/g, "").slice(0, 2);
  if (!a) return "";
  return ["01", "02", "03"].includes(a) ? "1" : "2";
}
