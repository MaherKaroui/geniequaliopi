/**
 * BLOC 1 — SOURCE UNIQUE DE VÉRITÉ (Bilan de compétences)
 *
 * Modèle de données central du dossier BDC. Tous les documents générés
 * dérivent EXCLUSIVEMENT de ces objets : aucune valeur en dur dans un template,
 * aucune phrase de durée réécrite localement (cf. formatDuree).
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { genererPlanning } from "../generateurPlanning";

export type Jour = "lundi" | "mardi" | "mercredi" | "jeudi" | "vendredi" | "samedi" | "dimanche";
export type Creneau = "matin" | "apres-midi" | "soir";
export type CategorieAction = "BC" | "AF" | "VAE" | "APP";
export type OrigineDemande = "beneficiaire" | "employeur" | "prescripteur";
export type Financeur = "CPF" | "employeur" | "personnel" | "France Travail" | "Transitions Pro" | "OPCO";

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
  /** Formation d'origine (intitulé, domaine) — sert à contextualiser les contenus. */
  formation?: FormationInfo;
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


/** Type de contrat dérivé de l'origine de la demande. */
export function typeContrat(p: Prestation): { type: "tripartite" | "bipartite"; libelle: string; base: string; delai: string } {
  if (p.origineDemande === "employeur") {
    return {
      type: "tripartite",
      libelle: "Convention tripartite de bilan de compétences",
      base: "articles R6313-5 à R6313-7 du Code du travail",
      delai: "Le bénéficiaire dispose de 10 jours à compter de la réception de la convention pour faire connaître son acceptation en apposant sa signature (art. R6313-7). Ce délai n'est pas un délai de rétractation.",
    };
  }
  return {
    type: "bipartite",
    libelle: "Contrat de prestation de bilan de compétences",
    base: "articles L6353-3 à L6353-7 du Code du travail",
    delai: "Le bénéficiaire dispose d'un délai de rétractation de 14 jours à compter de la signature du contrat (art. L6353-5). Aucune somme ne peut être exigée avant l'expiration de ce délai ; au-delà, l'acompte est plafonné à 30 % du prix convenu. En cas d'inscription via Mon Compte Formation, le délai de rétractation est de 4 jours ouvrés et l'inscription intervient au moins 11 jours ouvrés avant le début de la prestation.",
  };
}

/* ------------------------------------------------------------------ */
/* Construction du contexte depuis les formulaires de l'application     */
/* ------------------------------------------------------------------ */

function inferFinanceur(f?: FormationInfo, s?: StagiaireInfo): Financeur {
  const txt = `${f?.tarif || ""} ${f?.modalites || ""} ${s?.entreprise || ""}`.toLowerCase();
  if (/cpf|mon compte formation/.test(txt)) return "CPF";
  if (/transitions?\s*pro/.test(txt)) return "Transitions Pro";
  if (/opco/.test(txt)) return "OPCO";
  if (/france travail/.test(txt)) return "France Travail";
  if (s?.entreprise) return "employeur";
  return "personnel";
}

function inferModalite(f?: FormationInfo): "presentiel" | "distanciel" | "mixte" {
  const m = (f?.modalites || "").toLowerCase();
  if (/mixte|hybride|blended/.test(m)) return "mixte";
  if (/distanci|foad|visio|e-?learning/.test(m)) return "distanciel";
  return "presentiel";
}

function buildBeneficiaire(s: StagiaireInfo, idx: number): Beneficiaire {
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
    situation: s.entreprise ? "salarie" : "demandeur_emploi",
    employeur: s.entreprise
      ? { raisonSociale: s.entreprise, adresse: s.adresseEntreprise || "", contact: s.responsableEntreprise || "" }
      : undefined,
    niveauEtudes: s.diplome || "Non renseigné",
    joursDisponibles: ["lundi", "mardi", "mercredi", "jeudi", "vendredi"],
    creneauxDisponibles: ["matin", "apres-midi"],
    situationHandicap: s.rqth === "oui",
    amenagements: s.rqth === "oui" ? "À définir avec le référent handicap" : undefined,
    signatureUrl: s.signatureUrl || "",
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
  const repartition: Array<{ phase: 1 | 2 | 3; part: number; objet: string }> = [
    { phase: 1, part: 0.2, objet: "Phase préliminaire — analyse de la demande et du besoin, information sur les conditions de déroulement" },
    { phase: 2, part: 0.55, objet: "Phase d'investigation — exploration des motivations, identification des compétences et aptitudes" },
    { phase: 3, part: 0.25, objet: "Phase de conclusion — restitution et remise du document de synthèse" },
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
    let h = Math.round(total * r.part);
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
    signatureUrl: org.signatureUrl || "",
    tamponUrl: org.tamponUrl || "",
  };

  const beneficiaires = (stagiaires || []).map(buildBeneficiaire);
  const s0 = stagiaires?.[0];

  const debut = parseDateAny(s0?.dateDebutFormation) || parseDateAny(formation.dateDebut) || new Date();
  const finBrute = parseDateAny(s0?.dateFinFormation) || parseDateAny(formation.dateFin) || debut;
  const fin = finBrute < debut ? debut : finBrute;

  const dureeSaisie = num(formation.duree) || 24;
  const dureeTotaleH = Math.min(24, Math.max(1, dureeSaisie));
  // Le planning doit couvrir la totalité des heures vendues (24 h = 24 h de séances),
  // sinon le dossier affiche 18 h face à une prestation de 24 h.
  const dureeEntretiensH = dureeTotaleH;
  const dureeTravailPersoH = 0;

  const prixHT = num(s0?.tarifFormation) || num(formation.tarif) || 0;
  const suivi = new Date(fin);
  suivi.setMonth(suivi.getMonth() + 6);

  const base: Omit<Prestation, "seances"> = {
    categorieAction: "BC",
    origineDemande: s0?.entreprise ? "employeur" : "beneficiaire",
    financeur: inferFinanceur(formation, s0),
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
    consultant: {
      nom: formation.formateur || org.dirigeant || "",
      qualification: "Consultant en bilan de compétences",
      cvJoint: true,
      signatureUrl: formation.formateurSignatureUrl || org.signatureUrl || "",
    },
  };

  // Planning calculé (MESSAGE 15) : phases légales, jours disponibles, hors
  // dimanches/fériés, sans collision entre bénéficiaires d'un même consultant.
  const seancesParBeneficiaire: Record<string, Seance[]> = {};
  const dejaPosees: Seance[] = [];
  beneficiaires.forEach((b, i) => {
    const res = genererPlanning({ ...base, seances: [] }, b, { rang: i, seancesConsultant: dejaPosees });
    const seances = res.ok && res.seances.length ? res.seances : buildSeances(base, b, i, dejaPosees);
    dejaPosees.push(...seances);
    seancesParBeneficiaire[b.id] = seances;
  });

  return {
    organisme,
    beneficiaires,
    prestation: { ...base, seances: seancesParBeneficiaire[beneficiaires[0]?.id] || buildSeances(base, beneficiaires[0], 0) },
    seancesParBeneficiaire,
    formation,
  };

}
