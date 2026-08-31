/**
 * Contrôles de conformité du CERFA 10103*14.
 * Règle générale : on n'invente jamais une valeur manquante — on la signale.
 * AUCUN contrôle n'est bloquant : le PDF est toujours téléchargeable, les champs
 * non renseignés sortent vides et sont listés dans « À compléter à la main ».
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import type { CerfaReferentiels, SmicReference } from "./referentiels";
import { smicEnVigueur, revalorisationsPendant } from "./referentiels";
import { calculePeriodesRemuneration, ageA, type PeriodeRemuneration } from "./remuneration";

export const RUBRIQUES = [
  "L'employeur",
  "L'apprenti",
  "Le maître d'apprentissage",
  "Le contrat",
  "La formation",
] as const;
export type Rubrique = (typeof RUBRIQUES)[number];

export interface CerfaFinding {
  rubrique: Rubrique;
  champ: string;
  observe: string;
  attendu: string;
  niveau: "manquant" | "avertissement";
}

export interface CerfaRapport {
  findings: CerfaFinding[];
  /** Champs obligatoires laissés vides — à compléter à la main sur le PDF. */
  manquants: CerfaFinding[];
  /** Incohérences détectées — simples avertissements. */
  avertissements: CerfaFinding[];
  /** Libellés courts des champs vides (affichés sous le bouton de téléchargement). */
  champsVides: string[];
  /** Vrai si aucun champ obligatoire n'est vide (sinon le fichier est suffixé _INCOMPLET). */
  complet: boolean;
  periodes: PeriodeRemuneration[];
  smicRef: SmicReference | null;
  salaireMensuel: number | null;
  cfaEntreprise: boolean;
}

const digits = (v: string | undefined) => (v || "").replace(/\D/g, "");

/** Clé de Luhn (SIRET 14 chiffres / SIREN 9 chiffres). */
export function luhnValide(numero: string | undefined): boolean {
  const n = digits(numero);
  if (n.length !== 9 && n.length !== 14) return false;
  let somme = 0;
  const inverse = n.split("").reverse();
  for (let i = 0; i < inverse.length; i++) {
    let c = parseInt(inverse[i], 10);
    if (i % 2 === 1) {
      c *= 2;
      if (c > 9) c -= 9;
    }
    somme += c;
  }
  return somme % 10 === 0;
}

/** Clé de contrôle du NIR (15 caractères, gestion 2A/2B corse). */
export function nirValide(nir: string | undefined): boolean {
  const brut = (nir || "").toUpperCase().replace(/\s/g, "");
  if (!/^[12]\d{2}(0[1-9]|1[0-2]|[2-9]\d)\d{2}(\d{3}|2[AB]\d{2})\d{3}\d{2}$/.test(brut)) {
    if (!/^[12][0-9A-B]{12}\d{2}$/.test(brut)) return false;
  }
  if (brut.length !== 15) return false;
  const corps = brut.slice(0, 13).replace("2A", "19").replace("2B", "18");
  if (!/^\d{13}$/.test(corps)) return false;
  const cle = parseInt(brut.slice(13), 10);
  return 97 - (Number(BigInt(corps) % 97n)) === cle;
}

function heuresDepuis(texte: string | undefined): number | null {
  const m = (texte || "").match(/(\d[\d\s]*)\s*h/i) || (texte || "").match(/(\d+)/);
  if (!m) return null;
  const n = parseInt(m[1].replace(/\s/g, ""), 10);
  return isNaN(n) ? null : n;
}

function moisEntre(debut: string, fin: string): number {
  const d = new Date(`${debut}T00:00:00Z`);
  const f = new Date(`${fin}T00:00:00Z`);
  return (f.getUTCFullYear() - d.getUTCFullYear()) * 12 + (f.getUTCMonth() - d.getUTCMonth()) + (f.getUTCDate() >= d.getUTCDate() ? 0 : -1);
}

/** Date de conclusion : 7 jours avant le début d'exécution (valeur par défaut historique). */
export function dateConclusionParDefaut(dateDebut: string | undefined): string {
  if (!dateDebut) return "";
  const d = new Date(`${dateDebut}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 7);
  return d.toISOString().slice(0, 10);
}

export function controleCerfa(
  o: OrganismeInfo,
  f: FormationInfo,
  s: StagiaireInfo,
  refs: CerfaReferentiels,
): CerfaRapport {
  const findings: CerfaFinding[] = [];
  const add = (
    rubrique: Rubrique,
    champ: string,
    observe: string,
    attendu: string,
    niveau: CerfaFinding["niveau"] = "avertissement",
  ) => findings.push({ rubrique, champ, observe, attendu, niveau });

  const manquant = (rubrique: Rubrique, champ: string, valeur: string | undefined, attendu: string) => {
    if (!(valeur || "").trim()) add(rubrique, champ, "vide", attendu, "manquant");
  };

  const dateDebut = s.dateDebutContrat || f.dateDebut;
  const dateFin = s.dateFinContrat || f.dateFin;
  const dateConclusion = s.dateConclusionContrat || dateConclusionParDefaut(dateDebut);

  // ---------- L'EMPLOYEUR ----------
  manquant("L'employeur", "Dénomination", s.entreprise, "Raison sociale de l'employeur");
  if (!luhnValide(s.siretEntreprise)) {
    add("L'employeur", "SIRET", s.siretEntreprise || "vide", "SIRET à 14 chiffres, clé de Luhn valide", s.siretEntreprise ? "avertissement" : "manquant");
  }
  manquant("L'employeur", "Code APE", s.apeEntreprise, "Code APE/NAF de l'établissement (ex. 4941A)");
  manquant("L'employeur", "Effectif total salariés", s.effectifEntreprise, "Effectif total de l'entreprise au 31/12");
  if (!s.aucuneConventionCollective) {
    if (!/^\d{4}$/.test(digits(s.idccEntreprise))) {
      add("L'employeur", "Code IDCC", s.idccEntreprise || "vide", "Code IDCC à 4 chiffres, ou cocher « aucune convention collective » (9999)", s.idccEntreprise ? "avertissement" : "manquant");
    }
  } else if (digits(s.idccEntreprise) !== "9999") {
    add("L'employeur", "Code IDCC", s.idccEntreprise || "vide", "9999 lorsqu'aucune convention collective ne s'applique");
  }
  manquant("L'employeur", "Téléphone employeur", s.telephoneEntreprise, "Téléphone propre à l'employeur (champ distinct de l'apprenti)");
  manquant("L'employeur", "Courriel employeur", s.emailEntreprise, "Courriel propre à l'employeur (champ distinct de l'apprenti)");
  const memeTel = !!s.telephoneEntreprise && digits(s.telephoneEntreprise) === digits(s.telephone) && !!digits(s.telephone);
  const memeMail =
    !!s.emailEntreprise && s.emailEntreprise.trim().toLowerCase() === (s.email || "").trim().toLowerCase() && !!s.email;
  if (memeTel || memeMail) {
    add(
      "L'employeur",
      "Coordonnées employeur",
      `${memeTel ? "téléphone" : ""}${memeTel && memeMail ? " et " : ""}${memeMail ? "courriel" : ""} identiques à l'apprenti`,
      "Coordonnées de l'employeur distinctes de celles de l'apprenti (marqueur de contrat auto-conclu)",
    );
  }

  // ---------- L'APPRENTI ----------
  manquant("L'apprenti", "Nom", s.nom, "Nom de naissance");
  manquant("L'apprenti", "Prénom", s.prenom, "Premier prénom");
  manquant("L'apprenti", "Date de naissance", s.dateNaissance, "Date de naissance de l'apprenti");
  if (!nirValide(s.nir)) {
    add("L'apprenti", "NIR", s.nir || "vide", "NIR à 15 caractères avec clé de contrôle valide", s.nir ? "avertissement" : "manquant");
  }
  manquant("L'apprenti", "Département de naissance", s.departementNaissance, "Code département de naissance");
  manquant("L'apprenti", "Commune de naissance", s.communeNaissance, "Commune de naissance");
  manquant("L'apprenti", "Régime social", s.regimeSocial, "MSA ou URSSAF");
  if (!s.sportifHautNiveau) {
    add("L'apprenti", "Sportif de haut niveau", "aucune case cochée", "Oui ou Non explicitement renseigné", "manquant");
  }
  manquant("L'apprenti", "Situation avant ce contrat", s.situationAvantContrat, "Code situation avant contrat (notice)");
  manquant("L'apprenti", "Dernier diplôme ou titre préparé", s.dernierDiplomePrepare, "Diplôme/titre préparé avant ce contrat");
  manquant("L'apprenti", "Dernière classe / année suivie", s.derniereClasse, "Dernière classe ou année suivie");
  manquant("L'apprenti", "Intitulé précis du dernier diplôme préparé", s.intituleDernierDiplome, "Intitulé exact");
  manquant("L'apprenti", "Diplôme le plus élevé obtenu", s.diplome, "Diplôme le plus élevé obtenu");
  if (!s.projetCreationEntreprise) {
    add("L'apprenti", "Projet de création/reprise d'entreprise", "vide", "Oui ou Non explicitement renseigné", "manquant");
  }

  // ---------- LE MAÎTRE D'APPRENTISSAGE ----------
  const attesteEligibilite = s.attestationEligibiliteMaitre !== false;
  manquant("Le maître d'apprentissage", "Nom", s.maitreNom, "Nom du maître d'apprentissage");
  manquant("Le maître d'apprentissage", "Prénom", s.maitrePrenom, "Prénom du maître d'apprentissage");
  if (attesteEligibilite) {
    manquant("Le maître d'apprentissage", "Date de naissance", s.maitreDateNaissance, "Obligatoire dès lors que l'attestation d'éligibilité est cochée");
    manquant("Le maître d'apprentissage", "Courriel", s.maitreEmail, "Obligatoire dès lors que l'attestation d'éligibilité est cochée");
    manquant("Le maître d'apprentissage", "Diplôme le plus élevé obtenu", s.maitreDiplome, "Obligatoire dès lors que l'attestation d'éligibilité est cochée");
    manquant("Le maître d'apprentissage", "Niveau de diplôme", s.maitreNiveauDiplome, "Obligatoire dès lors que l'attestation d'éligibilité est cochée");
  }

  // ---------- LE CONTRAT ----------
  if (!dateDebut) add("Le contrat", "Date de début d'exécution", "vide", "Date de début du contrat", "manquant");
  if (!dateFin) add("Le contrat", "Date de fin de contrat", "vide", "Date de fin du contrat", "manquant");
  if (dateConclusion && dateDebut && dateConclusion > dateDebut) {
    add("Le contrat", "Date de conclusion", dateConclusion, "Antérieure ou égale à la date de début d'exécution");
  }
  const dateFinEpreuves = s.dateFinEpreuves || dateFin;
  if (dateFin && dateFinEpreuves && dateFin < dateFinEpreuves) {
    add("Le contrat", "Date de fin de contrat", dateFin, "Postérieure ou égale à la date de fin des épreuves");
  }
  manquant("Le contrat", "Caisse de retraite complémentaire", s.caisseRetraiteComplementaire, "Nom de la caisse de retraite complémentaire");

  // ---------- LA FORMATION ----------
  manquant("La formation", "Intitulé précis", f.intitule, "Intitulé exact du diplôme ou titre visé");
  manquant("La formation", "N° UAI du CFA", f.uaiCfa, "N° UAI de l'organisme de formation");
  manquant("La formation", "Code du diplôme", f.codeDiplome, "Code diplôme de la nomenclature (distinct du code RNCP)");
  manquant("La formation", "Code RNCP", f.codeRNCP, "Code RNCP du titre visé");
  if (!(f.typeDiplome || "").trim()) {
    add("La formation", "Type de diplôme visé", "vide", "Code type de diplôme de la nomenclature de la notice", "manquant");
  } else if (/^rncp/i.test(f.typeDiplome!.trim())) {
    add("La formation", "Type de diplôme visé", f.typeDiplome!, "Code type de diplôme de la notice — le n° RNCP va dans le champ « Code RNCP »");
  }
  if (!luhnValide(o.siret)) {
    add("La formation", "SIRET du CFA", o.siret || "vide", "SIRET à 14 chiffres, clé de Luhn valide", o.siret ? "avertissement" : "manquant");
  }

  // CFA d'entreprise : déduit de l'égalité des SIRET
  const cfaEntreprise = !!digits(o.siret) && digits(o.siret) === digits(s.siretEntreprise);
  if (cfaEntreprise && s.cfaEntreprise === "non") {
    add(
      "La formation",
      "CFA d'entreprise",
      "Non, alors que le SIRET du CFA est identique à celui de l'employeur",
      "Oui — l'employeur est le CFA responsable",
    );
  }
  if (!cfaEntreprise && s.cfaEntreprise === "oui") {
    add(
      "La formation",
      "CFA d'entreprise",
      "Oui, alors que les SIRET de l'employeur et du CFA diffèrent",
      "Non — ou corriger les SIRET",
    );
  }

  // Durée de formation en CFA
  const heuresCfa = heuresDepuis(f.dureeFormationCfa || f.duree);
  if (heuresCfa === null) {
    add("La formation", "Durée de formation en CFA", "vide", "Nombre d'heures de formation en CFA", "manquant");
  } else if (dateDebut && dateFin) {
    const mois = Math.max(moisEntre(dateDebut, dateFin), 0);
    const annees = Math.max(mois / 12, 0.01);
    const plancher = 400 * Math.max(Math.ceil(annees), 1);
    const heuresTotalesContrat = Math.round((mois / 12) * 1607);
    const minimum25 = Math.round(heuresTotalesContrat * 0.25);
    if (heuresCfa < minimum25 || heuresCfa < plancher) {
      add(
        "La formation",
        "Durée de formation en CFA",
        `${heuresCfa} h`,
        `Au moins 25 % de la durée du contrat (${minimum25} h) et au minimum ${plancher} h`,
      );
    }
  }

  // ---------- RÉMUNÉRATION ----------
  const smicRef = smicEnVigueur(refs.smic, dateDebut);
  if (!smicRef) {
    add(
      "Le contrat",
      "SMIC de référence",
      dateDebut ? `aucune référence au ${dateDebut}` : "date de début inconnue",
      "SMIC de référence non renseigné pour cette date — saisissez-le dans l'administration",
    );
  }
  for (const r of revalorisationsPendant(refs.smic, dateDebut, dateFin)) {
    add(
      "Le contrat",
      "Revalorisation du SMIC",
      `${r.montant_mensuel_35h.toFixed(2)} € au ${r.date_effet}`,
      "Une revalorisation prend effet pendant le contrat : la rémunération devra être ajustée",
      "avertissement",
    );
  }

  const periodes =
    dateDebut && dateFin && s.dateNaissance
      ? calculePeriodesRemuneration({ dateDebut, dateFin, dateNaissance: s.dateNaissance, baremes: refs.baremes })
      : [];
  if (periodes.some((p) => p.pourcentage === null)) {
    add("Le contrat", "Barème d'apprentissage", "tranche absente de la table", "Complétez la table des barèmes dans l'administration");
  }
  const age = ageA(s.dateNaissance, dateDebut);
  if (age !== null && age >= 26) {
    add(
      "Le contrat",
      "Rémunération",
      "Apprenti de 26 ans et plus",
      "100 % du SMIC, ou du salaire minimum conventionnel s'il est plus favorable — à vérifier",
      "avertissement",
    );
  }

  const pct1 = periodes[0]?.pourcentage ?? null;
  const salaireMensuel =
    smicRef && pct1 !== null ? Math.round(((smicRef.montant_mensuel_35h * pct1) / 100) * 100) / 100 : null;

  const manquants = findings.filter((x) => x.niveau === "manquant");
  return {
    findings,
    manquants,
    avertissements: findings.filter((x) => x.niveau === "avertissement"),
    champsVides: manquants.map((x) => `${x.rubrique} — ${x.champ}`),
    complet: manquants.length === 0,
    periodes,
    smicRef,
    salaireMensuel,
    cfaEntreprise,
  };
}
