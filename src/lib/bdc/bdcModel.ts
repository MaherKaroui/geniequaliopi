/**
 * BLOC 1 — SOURCE UNIQUE DE VÉRITÉ (Bilan de compétences)
 *
 * Modèle de données central du dossier BDC. Tous les documents générés
 * dérivent EXCLUSIVEMENT de ces objets : aucune valeur en dur dans un template,
 * aucune phrase de durée réécrite localement (cf. formatDuree).
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { genererPlanning } from "../generateurPlanning";
import { getBdcDomainProfile } from "../templatesBDC";

export type Jour = "lundi" | "mardi" | "mercredi" | "jeudi" | "vendredi" | "samedi" | "dimanche";
export type Creneau = "matin" | "apres-midi" | "soir";
export type CategorieAction = "BC" | "AF" | "VAE" | "APP";
export type OrigineDemande = "beneficiaire" | "employeur" | "prescripteur";
export type Financeur = "CPF" | "employeur" | "personnel" | "France Travail" | "Transitions Pro" | "OPCO" | "Région";

export interface Organisme {
  raisonSociale: string;
  adresse: string; codePostal: string; ville: string;
  siret: string;
  nda: string;
  ndaStatut: "enregistre" | "en_cours";
  regionPrefecture: string;
  regimeTva: "assujetti" | "exonere_261_4_4a";
  tauxTva: number;
  emailContact: string; telephoneContact: string;
  representantLegal: { nom: string; qualite: string };
  referentHandicap: { nom: string; email: string; telephone: string };
  mediateurConsommation: { nom: string; adresse: string; urlSaisine: string };
  tribunalCompetent: string;
  /** Date de MAJ du dossier (V1) : date des pièces de système qualité. */
  dateMaj: Date | null;
  /** Délai de rétractation en jours — paramètre UNIQUE pour toute l'application (R2). */
  delaiRetractationJours?: number;
  /** Signature du représentant légal (PNG transparent, stockée en base) */
  signatureUrl?: string;
  /** Tampon de l'organisme (PNG transparent, téléversé une seule fois) */
  tamponUrl?: string;
}

export interface Beneficiaire {
  id: string;
  civilite: "M." | "Mme" | "Non précisé";
  nom: string; prenom: string;
  dateNaissance: Date | null;
  adresse: string; codePostal: string; ville: string;
  email: string; telephone: string;
  situation: "salarie" | "demandeur_emploi" | "independant" | "fonctionnaire" | "autre";
  employeur?: { raisonSociale: string; adresse: string; contact: string };
  niveauEtudes: string;
  joursDisponibles: Jour[];
  creneauxDisponibles: Creneau[];
  situationHandicap: boolean;
  amenagements?: string;
  /** Signature manuscrite du bénéficiaire (tracé ou image téléversée) */
  signatureUrl?: string;
  signatureDateAjout?: string;
  /** Poste et entreprise saisis (vides si non renseignés). */
  poste: string;
  entreprise: string;
  /** Profil déclaratif UNIQUE : toutes les pièces du bénéficiaire le consomment. */
  profil: ProfilDeclaratif;
}

/* ------------------------------------------------------------------ */
/* Profil déclaratif unique par bénéficiaire                           */
/* ------------------------------------------------------------------ */

export type MotifCle = "point" | "reconversion" | "evolution" | "confirmer" | "pistes";
export const MOTIFS: Record<MotifCle, string> = {
  point: "Faire le point sur ma carrière et mes compétences",
  reconversion: "Préparer une reconversion professionnelle",
  evolution: "Évoluer dans mon métier ou dans mon entreprise",
  confirmer: "Confirmer un projet professionnel",
  pistes: "Identifier des pistes d'évolution",
};
export const NIVEAUX_ETUDES = ["CAP/BEP", "Bac", "Bac +2", "Bac +3", "Bac +5 et plus"];
export type SourceContact = "Internet" | "Réseaux sociaux" | "Recommandation" | "Employeur" | "France Travail";

export interface ProfilDeclaratif {
  seed: number;
  motif: MotifCle;
  motifLibelle: string;
  niveauEtudes: string;
  source: SourceContact;
  financeur: Financeur;
  origine: OrigineDemande;
  situation: "salarie" | "demandeur_emploi" | "independant" | "fonctionnaire" | "autre";
  jours: Jour[];
  creneaux: Creneau[];
  /** Projet exploré (sans majuscule initiale) : « accéder au métier de … ». */
  projet: string;
  /** Cible courte : « le métier de … » ou « son projet professionnel ». */
  cible: string;
  attente: string;
  resultatAttendu: string;
}

export function hashSeed(src: string): number {
  let h = 2166136261;
  for (let i = 0; i < src.length; i++) { h ^= src.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

/**
 * L'organisme est-il certifié Qualiopi pour les bilans de compétences à la date donnée ?
 * Sans certificat (numéro + date d'obtention), ou si la liste des catégories certifiées
 * n'inclut pas le bilan de compétences, ou si le bilan démarre avant la date d'obtention :
 * aucun financement public ou mutualisé (CPF, OPCO, France Travail, Région, Transitions Pro)
 * n'est mobilisable (art. L6316-1 du Code du travail).
 */
export function bcCertifieAu(org: Partial<OrganismeInfo> | undefined, date: Date | null): boolean {
  if (!org) return false;
  const num = `${org.numeroCertificatQualiopi || ""}`.trim();
  const obtention = parseDateAny(org.dateObtentionQualiopi || "");
  if (!num || !obtention) return false;
  const cats = `${org.certifications || ""}`.toLowerCase();
  if (/actions? de formation|apprentissage|vae|validation/.test(cats) && !/bilan/.test(cats)) return false;
  if (date && date.getTime() < obtention.getTime()) return false;
  const fin = parseDateAny(org.dateFinValiditeQualiopi || "");
  if (date && fin && date.getTime() > fin.getTime()) return false;
  return true;
}

/** Financeurs qui exigent la certification Qualiopi de l'organisme pour le bilan. */
const FINANCEURS_SOUS_QUALIOPI = /cpf|compte formation|opco|france travail|p[ôo]le emploi|r[ée]gion|transition/i;

/** Financeur effectif d'un bénéficiaire : le financement public n'est retenu que si l'OF est certifié BC. */
export function financeurEffectifBC(s: StagiaireInfo, org: Partial<OrganismeInfo> | undefined, f?: FormationInfo): string {
  const saisi = `${s.financeur || ""}`.trim();
  const debut = parseDateAny(s.dateDebutFormation) || parseDateAny(f?.dateDebut);
  if (bcCertifieAu(org, debut)) return saisi;
  if (!saisi || FINANCEURS_SOUS_QUALIOPI.test(saisi)) return "Personnel";
  return saisi;
}

/** Financeur saisi dans la fiche stagiaire (CPF, OPCO, Entreprise, Personnel, France Travail, Région, Autre). */
export function financeurSaisi(s?: StagiaireInfo, f?: FormationInfo): Financeur {
  const v = `${s?.financeur || ""}`.toLowerCase();
  if (/cpf|compte formation/.test(v)) return "CPF";
  if (/opco/.test(v)) return "OPCO";
  if (/entreprise|employeur|plan/.test(v)) return "employeur";
  if (/france travail|p[ôo]le emploi/.test(v)) return "France Travail";
  if (/r[ée]gion/.test(v)) return "Région";
  if (/transition/.test(v)) return "Transitions Pro";
  if (/perso|autofin|particulier/.test(v)) return "personnel";
  const txt = `${f?.tarif || ""} ${f?.modalites || ""}`.toLowerCase();
  if (/opco/.test(txt)) return "OPCO";
  if (/france travail/.test(txt)) return "France Travail";
  // Aucun financeur saisi : cas le plus courant du bilan (démarche individuelle via le CPF).
  return "CPF";
}

/**
 * Profil déclaratif d'un bénéficiaire, calculé UNE fois à partir des champs réels
 * (financeur, diplôme, poste, entreprise) et d'une graine stable. Les fiches
 * d'analyse, préalable, outil préparatoire, synthèse, tests, questionnaires et
 * planning lisent toutes ce même profil : plus de réponses contradictoires.
 */
export function profilDeclaratif(s: StagiaireInfo, f?: FormationInfo, domaine?: { generique?: boolean; metier: string; secteur: string }): ProfilDeclaratif {
  const seed = hashSeed(`${s.prenom}|${s.nom}|${s.email}|${s.dateNaissance}`);
  const pk = <T,>(arr: T[], off: number): T => arr[(seed + off * 7919) % arr.length];
  const financeur = financeurSaisi(s, f);
  const origine: OrigineDemande = financeur === "employeur" || financeur === "OPCO" ? "employeur" : financeur === "France Travail" ? "prescripteur" : "beneficiaire";
  const poste = (s.poste || "").trim();
  const entreprise = (s.entreprise || "").trim();
  const situation: ProfilDeclaratif["situation"] = financeur === "France Travail"
    ? "demandeur_emploi"
    : (entreprise || poste || origine === "employeur") ? "salarie" : "demandeur_emploi";
  const motifs: MotifCle[] = origine === "employeur"
    ? ["evolution", "point", "pistes"]
    : situation === "demandeur_emploi" ? ["reconversion", "pistes", "confirmer"] : ["reconversion", "evolution", "point", "confirmer", "pistes"];
  const motif = pk(motifs, 1);
  const niveauEtudes = (s.diplome || "").trim() || pk(NIVEAUX_ETUDES, 2);
  const source: SourceContact = origine === "employeur" ? "Employeur" : origine === "prescripteur" ? "France Travail" : pk(["Internet", "Réseaux sociaux", "Recommandation"] as SourceContact[], 3);
  const semaine: Jour[] = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];
  const retire = seed % 5;
  const jours = semaine.filter((_, i) => i !== retire && (seed % 3 !== 0 || i !== (retire + 2) % 5));
  const creneaux = ([["matin", "apres-midi"], ["matin"], ["apres-midi"]] as Creneau[][])[seed % 3];
  let projet: string;
  let cible: string;
  if (domaine && !domaine.generique) {
    projet = `accéder au métier de ${domaine.metier} (${domaine.secteur.split(",")[0]})`;
    cible = `le métier de ${domaine.metier}`;
  } else {
    const depuis = poste ? ` à partir de son expérience professionnelle (${poste})` : "";
    projet = ({
      point: `consolider sa trajectoire professionnelle actuelle${depuis} et identifier les compétences à développer`,
      reconversion: `engager une reconversion vers un métier cohérent avec ses compétences transférables${depuis}`,
      evolution: `évoluer vers un poste aux responsabilités élargies${depuis}`,
      confirmer: `confirmer et sécuriser le projet professionnel envisagé${depuis}`,
      pistes: `arbitrer entre plusieurs pistes d'évolution professionnelle${depuis}`,
    } as Record<MotifCle, string>)[motif];
    cible = "son projet professionnel";
  }
  const attente = pk([
    "Clarifier mon projet professionnel et vérifier sa faisabilité",
    "Identifier mes compétences transférables et les formations à mobiliser",
    "Construire un plan d'action concret et daté",
    "Prendre du recul sur mon parcours et structurer mes choix",
  ], 4);
  const resultatAttendu = pk([
    "Un projet professionnel formalisé et un plan d'action sur 6 à 12 mois.",
    "Une décision éclairée sur la suite de mon parcours et les démarches à engager.",
    "Une feuille de route claire, avec des étapes concrètes et des contacts identifiés.",
  ], 5);
  return { seed, motif, motifLibelle: MOTIFS[motif], niveauEtudes, source, financeur, origine, situation, jours, creneaux, projet, cible, attente, resultatAttendu };
}

/** Répartition UNIQUE des heures entre les trois phases (art. R6313-4), reprise par toutes les pièces. */
export function repartitionHeures(totalH: number): { p1: number; p2: number; p3: number } {
  const t = Math.min(24, Math.max(3, Math.round(totalH)));
  const p1 = Math.max(1, Math.round(t * 0.2));
  const p3 = Math.max(1, Math.round(t * 0.25));
  return { p1, p2: t - p1 - p3, p3 };
}

/** Durée du bilan : durée saisie plafonnée à 24 heures (art. L6313-4), 24 h par défaut. */
export function dureeBilanH(f?: FormationInfo): number {
  const n = num(f?.duree);
  return Math.min(24, Math.max(3, n || 24));
}

/** État du bilan d'un bénéficiaire à la date du jour. */
export function etatBilan(p: Prestation, ref: Date = new Date()): { termine: boolean; suiviEchu: boolean } {
  return { termine: p.dateFin.getTime() <= ref.getTime(), suiviEchu: p.dateSuivi6Mois.getTime() <= ref.getTime() };
}

export interface Seance {
  numero: number;
  phase: 1 | 2 | 3;
  date: Date;
  heureDebut: string;
  heureFin: string;
  duree: number;
  modalite: "presentiel" | "distanciel";
  objet: string;
}

export interface Prestation {
  categorieAction: CategorieAction;
  origineDemande: OrigineDemande;
  financeur: Financeur;
  dureeTotaleH: number;
  dureeEntretiensH: number;
  dureeTravailPersoH: number;
  dateDebut: Date; dateFin: Date;
  dateSuivi6Mois: Date;
  modalite: "presentiel" | "distanciel" | "mixte";
  lieu: string;
  prixHT: number; prixTTC: number;
  seances: Seance[];
  consultant: { nom: string; qualification: string; cvJoint: boolean; signatureUrl?: string; signatureDateAjout?: string };
}

export interface BdcContext {
  organisme: Organisme;
  beneficiaires: Beneficiaire[];
  prestation: Prestation;
  /** Planning propre à chaque bénéficiaire (clé = Beneficiaire.id) — jamais deux plannings identiques. */
  seancesParBeneficiaire: Record<string, Seance[]>;
  /** Prestation propre à chaque bénéficiaire : ses dates, son financeur, son prix, ses séances. */
  prestationsParBeneficiaire: Record<string, Prestation>;
  /** Formation d'origine (intitulé, domaine) — sert à contextualiser les contenus. */
  formation?: FormationInfo;
}

/** Prestation du bénéficiaire (dates, financeur, origine, séances) — jamais celle d'un autre. */
export function prestationFor(ctx: BdcContext, b?: { id: string } | null): Prestation {
  return (b && ctx.prestationsParBeneficiaire?.[b.id]) || ctx.prestation;
}

/** Retourne le planning du bénéficiaire (ou celui de la prestation à défaut). */
export function seancesFor(ctx: BdcContext, b?: { id: string } | null): Seance[] {
  if (b && ctx.seancesParBeneficiaire[b.id]?.length) return ctx.seancesParBeneficiaire[b.id];
  return ctx.prestation.seances;
}


/* ------------------------------------------------------------------ */
/* Helpers de parsing / formatage                                      */
/* ------------------------------------------------------------------ */

const MOIS_FR = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
const JOURS_FR: Jour[] = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];

export function parseDateAny(s?: string | null): Date | null {
  if (!s) return null;
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return new Date(+iso[1], +iso[2] - 1, +iso[3]);
  const fr = s.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})/);
  if (fr) return new Date(+fr[3], +fr[2] - 1, +fr[1]);
  const t = Date.parse(s);
  return isNaN(t) ? null : new Date(t);
}

/** Toutes les dates affichées sont en JJ/MM/AAAA (BLOC 9). */
export function fmtDateFR(d?: Date | null): string {
  if (!d || isNaN(d.getTime())) return "";
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export function fmtDateLongue(d?: Date | null): string {
  if (!d || isNaN(d.getTime())) return "";
  return `${d.getDate()} ${MOIS_FR[d.getMonth()]} ${d.getFullYear()}`;
}

function num(s?: string | null): number {
  if (!s) return 0;
  const m = String(s).replace(/\s/g, "").replace(",", ".").match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : 0;
}

/* ------------------------------------------------------------------ */
/* Dérivations obligatoires                                            */
/* ------------------------------------------------------------------ */

/** Tribunal compétent dérivé du département du siège — jamais saisi à la main. */
export function tribunalFromCodePostal(cp?: string): string {
  const dep = (cp || "").trim().slice(0, 2);
  const table: Record<string, string> = {
    "13": "Marseille", "31": "Toulouse", "33": "Bordeaux", "34": "Montpellier",
    "35": "Rennes", "37": "Tours", "38": "Grenoble", "44": "Nantes", "45": "Orléans",
    "49": "Angers", "51": "Reims", "54": "Nancy", "57": "Metz", "59": "Lille",
    "62": "Arras", "63": "Clermont-Ferrand", "64": "Pau", "67": "Strasbourg",
    "68": "Mulhouse", "69": "Lyon", "72": "Le Mans", "74": "Annecy", "75": "Paris",
    "76": "Rouen", "77": "Melun", "78": "Versailles", "80": "Amiens", "83": "Toulon",
    "livre": "Paris", "86": "Poitiers", "87": "Limoges", "91": "Évry", "92": "Nanterre",
    "93": "Bobigny", "94": "Créteil", "95": "Pontoise", "97": "Fort-de-France",
  };
  return `Tribunal judiciaire de ${table[dep] || "Paris"}`;
}

/** Région de la préfecture (jamais une ville) dérivée du département. */
export function regionFromCodePostal(cp?: string): string {
  const dep = (cp || "").trim().slice(0, 2);
  const idf = ["75", "77", "78", "91", "92", "93", "94", "95"];
  if (idf.includes(dep)) return "Île-de-France";
  const map: Record<string, string> = {
    "01": "Auvergne-Rhône-Alpes", "03": "Auvergne-Rhône-Alpes", "07": "Auvergne-Rhône-Alpes",
    "15": "Auvergne-Rhône-Alpes", "26": "Auvergne-Rhône-Alpes", "38": "Auvergne-Rhône-Alpes",
    "42": "Auvergne-Rhône-Alpes", "43": "Auvergne-Rhône-Alpes", "63": "Auvergne-Rhône-Alpes",
    "69": "Auvergne-Rhône-Alpes", "73": "Auvergne-Rhône-Alpes", "74": "Auvergne-Rhône-Alpes",
    "21": "Bourgogne-Franche-Comté", "25": "Bourgogne-Franche-Comté", "39": "Bourgogne-Franche-Comté",
    "58": "Bourgogne-Franche-Comté", "70": "Bourgogne-Franche-Comté", "71": "Bourgogne-Franche-Comté",
    "89": "Bourgogne-Franche-Comté", "90": "Bourgogne-Franche-Comté",
    "22": "Bretagne", "29": "Bretagne", "35": "Bretagne", "56": "Bretagne",
    "18": "Centre-Val de Loire", "28": "Centre-Val de Loire", "36": "Centre-Val de Loire",
    "37": "Centre-Val de Loire", "41": "Centre-Val de Loire", "45": "Centre-Val de Loire",
    "08": "Grand Est", "10": "Grand Est", "51": "Grand Est", "52": "Grand Est",
    "54": "Grand Est", "55": "Grand Est", "57": "Grand Est", "67": "Grand Est",
    "68": "Grand Est", "88": "Grand Est",
    "02": "Hauts-de-France", "59": "Hauts-de-France", "60": "Hauts-de-France",
    "62": "Hauts-de-France", "80": "Hauts-de-France",
    "14": "Normandie", "27": "Normandie", "50": "Normandie", "61": "Normandie", "76": "Normandie",
    "16": "Nouvelle-Aquitaine", "17": "Nouvelle-Aquitaine", "19": "Nouvelle-Aquitaine",
    "23": "Nouvelle-Aquitaine", "24": "Nouvelle-Aquitaine", "33": "Nouvelle-Aquitaine",
    "40": "Nouvelle-Aquitaine", "47": "Nouvelle-Aquitaine", "64": "Nouvelle-Aquitaine",
    "79": "Nouvelle-Aquitaine", "86": "Nouvelle-Aquitaine", "87": "Nouvelle-Aquitaine",
    "09": "Occitanie", "11": "Occitanie", "12": "Occitanie", "30": "Occitanie",
    "31": "Occitanie", "32": "Occitanie", "34": "Occitanie", "46": "Occitanie",
    "48": "Occitanie", "65": "Occitanie", "66": "Occitanie", "81": "Occitanie", "82": "Occitanie",
    "44": "Pays de la Loire", "49": "Pays de la Loire", "53": "Pays de la Loire",
    "72": "Pays de la Loire", "85": "Pays de la Loire",
    "04": "Provence-Alpes-Côte d'Azur", "05": "Provence-Alpes-Côte d'Azur",
    "06": "Provence-Alpes-Côte d'Azur", "13": "Provence-Alpes-Côte d'Azur",
    "83": "Provence-Alpes-Côte d'Azur", "84": "Provence-Alpes-Côte d'Azur",
    "20": "Corse", "97": "Outre-mer", "98": "Outre-mer",
  };
  return map[dep] || "Île-de-France";
}

/** Mention légale NDA — unique, jamais dupliquée, absente si l'enregistrement est en cours. */
export function mentionNDA(o: Organisme): string {
  if (o.ndaStatut === "en_cours" || !o.nda) {
    return "Demande de déclaration d'activité en cours d'instruction auprès de la DREETS.";
  }
  return `Déclaration d'activité enregistrée sous le numéro ${o.nda} auprès du préfet de région ${o.regionPrefecture}. Cet enregistrement ne vaut pas agrément de l'État.`;
}

/** Formatage d'un prix conforme au régime de TVA. */
export function formatPrix(o: Organisme, p: Prestation): string {
  const eur = (n: number) => `${n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
  if (o.regimeTva === "exonere_261_4_4a") {
    return `${eur(p.prixHT)} net de taxe — exonération de TVA, art. 261-4-4°a du CGI`;
  }
  return `${eur(p.prixHT)} HT, soit ${eur(p.prixTTC)} TTC (TVA ${o.tauxTva} %)`;
}

/**
 * UNIQUE fonction de phrase de durée. Tous les templates l'appellent.
 * Aucun document ne doit réécrire cette phrase.
 */
export function formatDuree(p: Prestation): string {
  if (p.dureeTravailPersoH > 0) {
    return `Durée totale : ${p.dureeTotaleH} heures, dont ${p.dureeEntretiensH} heures d'entretiens individuels avec le consultant et ${p.dureeTravailPersoH} heures de travail personnel du bénéficiaire.`;
  }
  return `Durée totale : ${p.dureeTotaleH} heures d'accompagnement individuel avec le consultant (travail personnel non décompté de la durée facturée).`;
}


/** Phrase UNIQUE sur la rétractation : contrat, CGV, livret d'accueil et clauses la reprennent. */
export const DELAI_RETRACTATION_BC =
  "Le bénéficiaire qui contracte à titre individuel dispose d'un délai de rétractation de 14 jours calendaires à compter de la signature du contrat (art. L6353-5 du Code du travail et art. L221-18 du Code de la consommation, le délai le plus long étant retenu pour toutes les prestations). Aucune somme ne peut être exigée avant l'expiration de ce délai ; l'acompte est ensuite plafonné à 30 % du prix (art. L6353-6). En cas d'inscription via Mon Compte Formation, les conditions générales d'utilisation de la plateforme s'appliquent et la prestation débute au plus tôt 11 jours ouvrés après la validation de l'inscription.";

/** Table UNIQUE des références légales du bilan de compétences. */
export const ARTICLES_BC = {
  /** Objet, consentement, résultats et synthèse remis au seul bénéficiaire, secret professionnel, 24 h maximum. */
  definition: "art. L6313-4 du Code du travail",
  /** Phases préliminaire, d'investigation et de conclusion. */
  phases: "art. R6313-4 du Code du travail",
  /** L'employeur ne peut réaliser lui-même le bilan de ses salariés. */
  employeur: "art. R6313-5 du Code du travail",
  /** Organisation identifiée dédiée aux bilans. */
  organisation: "art. R6313-6 du Code du travail",
  /** Destruction des documents dès le terme ; exception de 3 ans sur accord écrit (suivi). */
  destruction: "art. R6313-7 du Code du travail",
  /** Convention tripartite (plan de développement des compétences, congé de reclassement), 10 jours. */
  convention: "art. R6313-8 du Code du travail",
  /** Contrat avec une personne physique : rétractation, acompte. */
  contrat: "art. L6353-3 à L6353-7 du Code du travail",
};

/** Type de contrat dérivé de l'origine de la demande. */
export function typeContrat(p: Prestation): { type: "tripartite" | "bipartite"; libelle: string; base: string; delai: string } {
  if (p.origineDemande === "employeur") {
    return {
      type: "tripartite",
      libelle: "Convention tripartite de bilan de compétences",
      base: ARTICLES_BC.convention,
      delai: "Le salarié dispose de 10 jours à compter de la transmission de la convention pour faire connaître son acceptation en la signant ; l'absence de réponse vaut refus, lequel ne constitue ni une faute ni un motif de licenciement (art. R6313-8). Ce délai n'est pas un délai de rétractation.",
    };
  }
  return {
    type: "bipartite",
    libelle: "Contrat de prestation de bilan de compétences",
    base: ARTICLES_BC.contrat,
    delai: DELAI_RETRACTATION_BC,
  };
}

/* ------------------------------------------------------------------ */
/* Construction du contexte depuis les formulaires de l'application     */
/* ------------------------------------------------------------------ */

function inferModalite(f?: FormationInfo): "presentiel" | "distanciel" | "mixte" {
  const m = (f?.modalites || "").toLowerCase();
  if (/mixte|hybride|blended/.test(m)) return "mixte";
  if (/distanci|foad|visio|e-?learning/.test(m)) return "distanciel";
  return "presentiel";
}

function buildBeneficiaire(s: StagiaireInfo, idx: number, f?: FormationInfo, domaine?: { generique?: boolean; metier: string; secteur: string }): Beneficiaire {
  const profil = profilDeclaratif(s, f, domaine);
  return {
    id: `${s.prenom}_${s.nom}`.trim() || `beneficiaire_${idx + 1}`,
    civilite: s.civilite === "M." || s.civilite === "Mme" ? s.civilite : "Non précisé",
    nom: s.nom || "",
    prenom: s.prenom || "",
    dateNaissance: parseDateAny(s.dateNaissance),
    adresse: s.adresse || "",
    codePostal: s.codePostal || "",
    ville: s.commune || "",
    email: s.email || "",
    telephone: s.telephone || "",
    situation: profil.situation,
    employeur: s.entreprise
      ? { raisonSociale: s.entreprise, adresse: s.adresseEntreprise || "", contact: s.responsableEntreprise || "" }
      : undefined,
    niveauEtudes: profil.niveauEtudes,
    joursDisponibles: profil.jours,
    creneauxDisponibles: profil.creneaux,
    situationHandicap: s.rqth === "oui",
    amenagements: s.rqth === "oui" ? "À définir avec le référent handicap" : undefined,
    signatureUrl: s.signatureUrl || "",
    poste: (s.poste || "").trim(),
    entreprise: (s.entreprise || "").trim(),
    profil,
  };
}

/**
 * Séquençage contraint aux 3 phases réglementaires (art. R6313-4), max 24 h.
 * `rang` = position du bénéficiaire : il décale les dates et alterne les créneaux
 * horaires pour qu'aucun bénéficiaire ne partage la même séance qu'un autre
 * (un consultant unique ne peut pas conduire deux entretiens simultanés).
 */
export function buildSeances(
  p: Omit<Prestation, "seances">,
  b?: Beneficiaire,
  rang = 0,
  prises: Seance[] = [],
): Seance[] {
  const total = Math.min(p.dureeEntretiensH, 24);
  const rh = repartitionHeures(total);
  const repartition: Array<{ phase: 1 | 2 | 3; heures: number; objet: string }> = [
    { phase: 1, heures: rh.p1, objet: "Phase préliminaire — analyse de la demande et du besoin, information sur les conditions de déroulement" },
    { phase: 2, heures: rh.p2, objet: "Phase d'investigation — exploration des motivations, identification des compétences et aptitudes" },
    { phase: 3, heures: rh.p3, objet: "Phase de conclusion — restitution et remise du document de synthèse" },
  ];
  const jours = b?.joursDisponibles?.length ? b.joursDisponibles : (["lundi", "mardi", "mercredi", "jeudi", "vendredi"] as Jour[]);
  const seances: Seance[] = [];
  let cursor = new Date(p.dateDebut);
  // décalage propre au bénéficiaire (0, 1, 2, 3… jours) — évite les dates identiques
  cursor.setDate(cursor.getDate() + (rang % 4));
  if (cursor > p.dateFin) cursor = new Date(p.dateDebut);
  const spanDays = Math.max(1, Math.round((p.dateFin.getTime() - p.dateDebut.getTime()) / 86400000));
  // créneaux alternés : matin / début d'après-midi / fin d'après-midi
  const debutsPossibles = [9, 14, 16];
  // V24 — un consultant unique ne peut pas recevoir deux bénéficiaires en même temps.
  const memeJour = (a: Date, c: Date) =>
    a.getFullYear() === c.getFullYear() && a.getMonth() === c.getMonth() && a.getDate() === c.getDate();
  const occupe = (date: Date, debut: number, duree: number) =>
    prises.some((s) => {
      if (!memeJour(s.date, date)) return false;
      const sd = parseInt(s.heureDebut.slice(0, 2), 10) + (s.heureDebut.endsWith("30") ? 0.5 : 0);
      return debut < sd + s.duree && sd < debut + duree;
    });
  let numero = 1;
  for (const r of repartition) {
    let h = r.heures;
    while (h > 0) {
      const duree = Math.min(3, h);
      // caler sur un jour disponible du bénéficiaire (V09)
      let guard = 0;
      while (!jours.includes(JOURS_FR[cursor.getDay()]) && guard < 14) {
        cursor.setDate(cursor.getDate() + 1); guard++;
      }
      // recherche d'un créneau libre pour le consultant (jour puis jours suivants)
      let hDeb = debutsPossibles[(rang + numero) % debutsPossibles.length];
      let libre = false;
      let tours = 0;
      while (!libre && tours < 60) {
        for (let k = 0; k < debutsPossibles.length; k++) {
          const cand = debutsPossibles[(rang + numero + k) % debutsPossibles.length];
          if (!occupe(cursor, cand, duree)) { hDeb = cand; libre = true; break; }
        }
        if (!libre) {
          cursor.setDate(cursor.getDate() + 1);
          let g2 = 0;
          while (!jours.includes(JOURS_FR[cursor.getDay()]) && g2 < 14) { cursor.setDate(cursor.getDate() + 1); g2++; }
        }
        tours++;
      }
      const heureDebut = `${String(hDeb).padStart(2, "0")}:00`;
      const heureFin = `${String(Math.min(20, hDeb + duree)).padStart(2, "0")}:00`;
      const seance: Seance = {
        numero: numero++,
        phase: r.phase,
        date: new Date(cursor),
        heureDebut, heureFin, duree,
        modalite: p.modalite === "distanciel" ? "distanciel" : "presentiel",
        objet: r.objet,
      };
      seances.push(seance);
      prises.push(seance);
      h -= duree;
      cursor = new Date(cursor);
      cursor.setDate(cursor.getDate() + Math.max(2, Math.floor(spanDays / Math.max(1, total / 2))));
      if (cursor > p.dateFin) cursor = new Date(p.dateFin);
    }
  }
  // Ajustement final : la somme des séances doit égaler dureeEntretiensH (V07)
  const somme = seances.reduce((a, s) => a + s.duree, 0);
  if (somme !== total && seances.length) {
    const delta = total - somme;
    const last = seances[seances.length - 1];
    last.duree = Math.max(1, last.duree + delta);
    const hDeb = parseInt(last.heureDebut.slice(0, 2), 10);
    last.heureFin = `${String(Math.min(20, hDeb + last.duree)).padStart(2, "0")}:00`;
  }
  return seances;
}


export function buildBdcContext(
  org: OrganismeInfo,
  formation: FormationInfo,
  stagiaires: StagiaireInfo[],
): BdcContext {
  const cp = org.codePostal || "";
  const organisme: Organisme = {
    raisonSociale: org.nom || "",
    adresse: org.adresse || "",
    codePostal: cp,
    ville: org.ville || "",
    siret: org.siret || "",
    nda: org.nda || "",
    ndaStatut: org.nda ? "enregistre" : "en_cours",
    regionPrefecture: regionFromCodePostal(cp),
    regimeTva: "exonere_261_4_4a",
    tauxTva: 0,
    emailContact: org.email || "",
    telephoneContact: org.telephone || "",
    representantLegal: { nom: org.dirigeant || "", qualite: "Représentant légal" },
    referentHandicap: {
      nom: org.referentHandicap || org.dirigeant || "",
      email: org.email || "",
      telephone: org.telephone || "",
    },
    mediateurConsommation: {
      nom: "CNPM — Médiation de la consommation",
      adresse: "27 avenue de la Libération, 42400 Saint-Chamond",
      urlSaisine: "https://cnpm-mediation-consommation.eu",
    },
    tribunalCompetent: tribunalFromCodePostal(cp),
    dateMaj: parseDateAny(org.dateMaj),
    delaiRetractationJours: 14,
    signatureUrl: org.signatureUrl || "",
    tamponUrl: org.tamponUrl || "",
  };

  const domaine = getBdcDomainProfile(formation);
  // Un seul financeur cohérent par bénéficiaire, compatible avec le périmètre certifié.
  stagiaires = (stagiaires || []).map((s) => ({ ...s, financeur: financeurEffectifBC(s, org, formation) }));
  const beneficiaires = stagiaires.map((s, i) => buildBeneficiaire(s, i, formation, domaine));
  const dureeTotaleH = dureeBilanH(formation);
  // Le planning couvre la totalité des heures vendues (24 h = 24 h de séances).
  const dureeEntretiensH = dureeTotaleH;
  const dureeTravailPersoH = 0;
  const consultant = {
    nom: formation.formateur || org.dirigeant || "",
    qualification: "Consultant en bilan de compétences",
    cvJoint: false,
    signatureUrl: formation.formateurSignatureUrl || org.signatureUrl || "",
  };

  /** Prestation calculée pour UN bénéficiaire : ses dates, son financeur, son prix. */
  const baseFor = (s: StagiaireInfo | undefined, b: Beneficiaire | undefined): Omit<Prestation, "seances"> => {
    const debut = parseDateAny(s?.dateDebutFormation) || parseDateAny(formation.dateDebut) || organisme.dateMaj || new Date();
    const finBrute = parseDateAny(s?.dateFinFormation) || parseDateAny(formation.dateFin) || debut;
    const fin = finBrute < debut ? debut : finBrute;
    const prixHT = num(s?.tarifFormation) || num(formation.tarif) || 0;
    const suivi = new Date(fin);
    suivi.setMonth(suivi.getMonth() + 6);
    return {
      categorieAction: "BC",
      origineDemande: b?.profil.origine || "beneficiaire",
      financeur: b?.profil.financeur || financeurSaisi(s, formation),
      dureeTotaleH,
      dureeEntretiensH,
      dureeTravailPersoH,
      dateDebut: debut,
      dateFin: fin,
      dateSuivi6Mois: suivi,
      modalite: inferModalite(formation),
      lieu: formation.lieu || `${organisme.adresse} ${organisme.codePostal} ${organisme.ville}`.trim(),
      prixHT,
      prixTTC: organisme.regimeTva === "exonere_261_4_4a" ? prixHT : Math.round(prixHT * (1 + organisme.tauxTva / 100) * 100) / 100,
      consultant,
    };
  };

  // Planning calculé par bénéficiaire (phases légales, jours et créneaux déclarés,
  // hors dimanches/fériés, sans collision entre bénéficiaires d'un même consultant).
  const seancesParBeneficiaire: Record<string, Seance[]> = {};
  const prestationsParBeneficiaire: Record<string, Prestation> = {};
  const dejaPosees: Seance[] = [];
  beneficiaires.forEach((b, i) => {
    const base = baseFor(stagiaires[i], b);
    // Même répartition des heures que toutes les pièces (repartitionHeures).
    const rh = repartitionHeures(base.dureeEntretiensH);
    const repartition = { preliminaire: rh.p1 / base.dureeEntretiensH, investigation: rh.p2 / base.dureeEntretiensH, conclusion: rh.p3 / base.dureeEntretiensH };
    const res = genererPlanning({ ...base, seances: [] }, b, { rang: i, seancesConsultant: dejaPosees, repartition });
    const seances = res.ok && res.seances.length ? res.seances : buildSeances(base, b, i, dejaPosees);
    dejaPosees.push(...seances);
    seancesParBeneficiaire[b.id] = seances;
    prestationsParBeneficiaire[b.id] = { ...base, seances };
  });
  const base0 = baseFor(stagiaires?.[0], beneficiaires[0]);

  return {
    organisme,
    beneficiaires,
    prestation: beneficiaires[0] ? prestationsParBeneficiaire[beneficiaires[0].id] : { ...base0, seances: buildSeances(base0, undefined, 0) },
    seancesParBeneficiaire,
    prestationsParBeneficiaire,
    formation,
  };

}
