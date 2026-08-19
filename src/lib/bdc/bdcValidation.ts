/**
 * BLOC 2 — Moteur de validation bloquant (V01 → V20) + alertes
 * BLOC 8 — Couverture des indicateurs
 *
 * Aucune exportation possible tant qu'une règle bloquante échoue.
 */
import type { BdcContext } from "./bdcModel";
import { fmtDateFR, formatDuree, seancesFor } from "./bdcModel";
import { BDC_TEMPLATES_MANQUANTS } from "./bdcTemplatesBC";
import {
  detectDuplication, findMentionsAbrogees, findOrganismesTiers,
  findUnresolvedMergeFields, findVocabulaireInterdit, findRegressionsSubstitution, type DuplicationHit,
} from "./bdcCompliance";

export interface RegleResultat {
  code: string;
  libelle: string;
  ok: boolean;
  message?: string;
  details?: string[];
}

export interface RapportValidation {
  bloquantes: RegleResultat[];
  alertes: RegleResultat[];
  duplications: DuplicationHit[];
  exportAutorise: boolean;
}

export interface RenduDocuments {
  /** Texte brut rendu de chaque document, indexé par nom de fichier. */
  parDocument: Record<string, string>;
  /** Textes rendus regroupés par bénéficiaire (champs libres). */
  parBeneficiaire: Record<string, string[]>;
  /** Noms des documents présents dans le dossier. */
  noms: string[];
}

const DAY = 86400000;

/** Prénoms usuellement féminins : sert uniquement à demander une confirmation. */
const PRENOMS_FEMININS = [
  "rahma", "fatima", "sabrina", "amina", "sarah", "nadia", "leila", "maria", "sofia",
  "yasmine", "karima", "samira", "laura", "julie", "marie", "sandrine", "aicha", "khadija",
  "nawel", "imane", "sonia", "myriam", "hanane", "assia", "linda", "elodie", "camille",
];

/** Vrai si la civilité retenue contredit vraisemblablement le prénom. */
function feminiteDouteuse(prenom: string, civilite: string): boolean {
  const p = (prenom || "").trim().toLowerCase();
  if (!p) return false;
  const feminin = PRENOMS_FEMININS.includes(p) || /(a|ia|ah|ine|elle|ette)$/.test(p);
  return feminin && /^m\.?$/i.test(civilite.trim());
}


function r(code: string, libelle: string, ok: boolean, message?: string, details?: string[]): RegleResultat {
  return { code, libelle, ok, message, details };
}

export function validerDossierBDC(ctx: BdcContext, rendu?: RenduDocuments): RapportValidation {
  const { organisme: o, prestation: p, beneficiaires } = ctx;
  const docs = rendu?.parDocument || {};
  const textes = Object.values(docs);
  // Sans rendu fourni (contrôle a priori), les pièces attendues sont celles que
  // l'export génère systématiquement : on valide leur présence au catalogue.
  const noms = rendu?.noms || (Object.keys(docs).length ? Object.keys(docs) : BDC_TEMPLATES_MANQUANTS.map((d) => d.nom));
  const B: RegleResultat[] = [];

  /* Helpers de lecture du RENDU (MESSAGE 16) : les règles scannent les fichiers
     réellement produits, pas le modèle en mémoire. */
  const entries = Object.entries(docs);
  const datesDansTexte = (txt: string): Date[] =>
    (txt.match(/\b(\d{2})\/(\d{2})\/(\d{4})\b/g) || []).map((s) => {
      const [d, m, y] = s.split("/").map(Number);
      return new Date(y, m - 1, d);
    });
  const fichiersOu = (re: RegExp) => entries.filter(([nom]) => re.test(nom));
  const joursOuvresEntre = (a: Date, b2: Date) => {
    let n = 0;
    const cur = new Date(Math.min(a.getTime(), b2.getTime()));
    const fin = new Date(Math.max(a.getTime(), b2.getTime()));
    while (cur <= fin) {
      const j = cur.getDay();
      if (j !== 0 && j !== 6) n++;
      cur.setDate(cur.getDate() + 1);
    }
    return n;
  };

  // V01
  B.push(r("V01", "Date de fin postérieure à la date de début", p.dateFin >= p.dateDebut, "Date de fin antérieure à la date de début"));

  // V02 — ordre ET vraisemblance : N heures ne tiennent pas en moins de N/6 jours ouvrés
  const sortieAvantEntree = p.seances.some((s) => s.heureFin <= s.heureDebut);
  const joursNecessaires = Math.ceil(p.dureeTotaleH / 6);
  const joursReels = joursOuvresEntre(p.dateDebut, p.dateFin);
  const v02Ok = !sortieAvantEntree && p.dateFin >= p.dateDebut && joursReels >= joursNecessaires;
  B.push(r("V02", "Entrée / sortie dans un ordre et un volume vraisemblables", v02Ok,
    sortieAvantEntree
      ? "Sortie avant entrée"
      : `Une prestation de ${p.dureeTotaleH} h ne peut pas tenir en ${joursReels} jour(s) ouvré(s) : ${joursNecessaires} jours ouvrés au minimum.`));

  // V03 — convention signée avant démarrage
  const dateConvention = new Date(p.dateDebut.getTime() - 14 * DAY);
  B.push(r("V03", "Convention signée avant le démarrage", dateConvention <= p.dateDebut, "Convention signée après le démarrage"));

  // V04 — la date ÉCRITE dans le fichier « Suivi à 6 mois »
  const fichiersSuivi = fichiersOu(/suivi.*6\s*mois|6\s*mois/i);
  const ecartsSuivi: string[] = [];
  for (const [nom, txt] of fichiersSuivi) {
    for (const d of datesDansTexte(txt)) {
      if (d <= p.dateFin) continue;
      const mois = (d.getFullYear() - p.dateFin.getFullYear()) * 12 + (d.getMonth() - p.dateFin.getMonth());
      if (mois < 5 || mois > 8) ecartsSuivi.push(`${nom} : ${fmtDateFR(d)} → ${mois} mois après la fin`);
    }
  }
  const moisEcart = (p.dateSuivi6Mois.getFullYear() - p.dateFin.getFullYear()) * 12 + (p.dateSuivi6Mois.getMonth() - p.dateFin.getMonth());
  B.push(r("V04", "Suivi à 6 mois cohérent dans les fichiers (J+5 à J+8 mois)",
    ecartsSuivi.length === 0 && moisEcart >= 5 && moisEcart <= 8,
    `Date de suivi « à 6 mois » incohérente dans le rendu`, ecartsSuivi.slice(0, 5)));

  // V05 — relances écrites dans les fichiers vs statut écrit dans le même fichier
  const today = new Date();
  const relancesKo: string[] = [];
  for (const [nom, txt] of entries) {
    for (const ligne of txt.split("\n")) {
      if (!/relance/i.test(ligne)) continue;
      const dates = datesDansTexte(ligne);
      const realise = /r[ée]alis[ée]|effectu[ée]|clos|soldé/i.test(ligne);
      for (const d of dates) {
        if (realise && d > today) relancesKo.push(`${nom} : relance au ${fmtDateFR(d)} sur une action déclarée réalisée`);
        if (d > p.dateSuivi6Mois) relancesKo.push(`${nom} : relance au ${fmtDateFR(d)} postérieure au suivi à 6 mois`);
      }
    }
  }
  B.push(r("V05", "Aucune relance postérieure à l'action réalisée", relancesKo.length === 0,
    "Relance postérieure à l'action déjà réalisée", [...new Set(relancesKo)].slice(0, 5)));


  // V06
  B.push(r("V06", "Somme des durées cohérente", p.dureeEntretiensH + p.dureeTravailPersoH === p.dureeTotaleH,
    `Somme des durées incohérente (${p.dureeEntretiensH} + ${p.dureeTravailPersoH} ≠ ${p.dureeTotaleH})`));

  // V07
  const sommeSeances = p.seances.reduce((a, s) => a + s.duree, 0);
  B.push(r("V07", "Le planning totalise la durée annoncée", sommeSeances === p.dureeEntretiensH,
    `Le planning totalise ${sommeSeances} h pour ${p.dureeEntretiensH} h annoncées`));

  // V08
  B.push(r("V08", "Durée légale maximale du bilan respectée (24 h)", p.categorieAction !== "BC" || p.dureeTotaleH <= 24,
    "Durée légale maximale du bilan dépassée (art. R6313-4)"));

  // V09 — disponibilités LUES dans la fiche d'analyse du besoin du bénéficiaire
  const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const dispoDeclareeDansFiche = (b: { prenom: string; nom: string }): string[] => {
    const fiche = entries.find(([nom]) =>
      /analyse (du|de) besoin|analyse des besoins/i.test(nom) && nom.includes(b.nom));
    if (!fiche) return [];
    const ligne = fiche[1].split("\n").find((l) => /disponibilit[ée]s d[ée]clar[ée]es/i.test(l));
    if (!ligne) return [];
    return JOURS.filter((j) => new RegExp(`\\b${j}\\b`, "i").test(ligne));
  };
  const horsDispo: string[] = [];
  for (const b of beneficiaires) {
    const declarees = dispoDeclareeDansFiche(b);
    const reference = declarees.length ? declarees : (b.joursDisponibles || []);
    if (!reference.length) continue;
    for (const s of seancesFor(ctx, b)) {
      const jour = JOURS[s.date.getDay()];
      if (!reference.includes(jour)) {
        horsDispo.push(`${b.prenom} ${b.nom} — séance ${s.numero} le ${fmtDateFR(s.date)} (${jour}) hors disponibilités déclarées : ${reference.join(", ")}`);
      }
    }
  }
  B.push(r("V09", "Séances programmées dans les disponibilités déclarées par le bénéficiaire", horsDispo.length === 0,
    "Séance programmée hors disponibilités déclarées (élargir la période, jamais les disponibilités)", horsDispo.slice(0, 8)));


  // V10 — collision d'agenda entre bénéficiaires (même consultant)
  const creneaux = new Map<string, string>();
  const collisions: string[] = [];
  for (const b of beneficiaires) {
    for (const s of seancesFor(ctx, b)) {
      const key = `${fmtDateFR(s.date)} ${s.heureDebut}`;
      const prev = creneaux.get(key);
      if (prev && prev !== b.id) collisions.push(`${key} : ${prev} / ${b.id}`);
      else creneaux.set(key, b.id);
    }
  }
  B.push(r("V10", "Aucune collision d'agenda du consultant", collisions.length === 0, "Collision d'agenda", collisions.slice(0, 5)));

  // V11 → V14 : cohérence transverse des valeurs uniques
  const coherence = (code: string, libelle: string, msg: string, valeurs: string[]) => {
    const uniques = [...new Set(valeurs.filter(Boolean))];
    return r(code, libelle, uniques.length <= 1, msg, uniques);
  };
  // V11 — uniformité ET exactitude de la civilité (une civilité fausse peut être
  // parfaitement uniforme dans tout le dossier).
  const civiliteKo: string[] = [];
  for (const b of beneficiaires) {
    const attendue = b.civilite;
    const autre = attendue === "M." ? "Mme" : "M.";
    for (const [nom, txt] of entries) {
      const reAutre = new RegExp(`${autre}\\.?\\s+${b.prenom}\\b`, "i");
      if (reAutre.test(txt)) civiliteKo.push(`${nom} : « ${autre} ${b.prenom} » alors que la fiche indique « ${attendue} »`);
    }
    if (feminiteDouteuse(b.prenom, attendue)) {
      civiliteKo.push(`${b.prenom} ${b.nom} : civilité « ${attendue} » à confirmer manuellement au regard du prénom.`);
    }
  }
  B.push(r("V11", "Civilité uniforme ET exacte dans tous les documents", civiliteKo.length === 0,
    "Civilité incohérente ou à confirmer", [...new Set(civiliteKo)].slice(0, 8)));

  B.push(coherence("V12", "Financeur identique dans toutes les pièces", "Financeur contradictoire", [p.financeur]));
  B.push(coherence("V13", "Origine de la demande identique dans toutes les pièces", "Origine de la demande contradictoire", [p.origineDemande]));
  B.push(coherence("V14", "Niveau d'études identique dans toutes les pièces", "Niveau d'études contradictoire",
    beneficiaires.length === 1 ? [beneficiaires[0].niveauEtudes] : ["ok"]));

  // V15 — champs de fusion non résolus
  const nonResolus: string[] = [];
  for (const [nom, txt] of Object.entries(docs)) {
    const f = findUnresolvedMergeFields(txt);
    if (f.length) nonResolus.push(`${nom} : ${f.slice(0, 3).join(", ")}`);
  }
  B.push(r("V15", "Aucun champ de fusion non substitué", nonResolus.length === 0, "Variable non substituée", nonResolus.slice(0, 10)));

  // V16 — organisme tiers
  const tiers: string[] = [];
  for (const [nom, txt] of Object.entries(docs)) {
    const t = findOrganismesTiers(txt, o.raisonSociale);
    if (t.length) tiers.push(`${nom} : ${t.join(", ")}`);
  }
  B.push(r("V16", "Aucun nom d'organisme tiers", tiers.length === 0, "Nom d'un autre organisme détecté", tiers.slice(0, 10)));

  // V17 — document de synthèse présent
  const aSynthese = noms.some((n) => /document de synth[èe]se/i.test(n));
  B.push(r("V17", "Document de synthèse présent", p.categorieAction !== "BC" || aSynthese,
    "Pièce obligatoire manquante (art. R6313-8) : document de synthèse"));

  // V18 — émargements
  const aEmargement = noms.some((n) => /[ée]margement/i.test(n));
  B.push(r("V18", "Feuilles d'émargement présentes", p.categorieAction !== "BC" || aEmargement,
    "Preuve de réalisation manquante : feuilles d'émargement"));

  // V19 — employeur identifié : sans objet si l'engagement est bipartite
  const tripartite = p.origineDemande === "employeur";
  const employeurOk = !tripartite || beneficiaires.every((b) => !!b.employeur?.raisonSociale);
  B.push(r("V19", tripartite ? "Employeur identifié dans la convention tripartite" : "Employeur identifié — non applicable (contrat bipartite)",
    employeurOk, "Employeur non identifié dans une convention tripartite",
    tripartite ? undefined : ["Non applicable : contrat bipartite organisme / bénéficiaire."]));

  // V20 — un montant doit être ÉCRIT dans le fichier contrat / convention
  const fichiersContrat = fichiersOu(/convention|contrat/i);
  const sansMontant = fichiersContrat
    .filter(([, txt]) => !/\d[\d\s  ]*(,\d{2})?\s*(€|euros)/i.test(txt))
    .map(([nom]) => nom);
  B.push(r("V20", "Montant écrit dans le contrat", p.prixHT > 0 && sansMontant.length === 0,
    p.prixHT <= 0 ? "Convention sans prix (nulle)" : "Contrat exporté sans montant lisible", sansMontant.slice(0, 5)));


  // Vocabulaire interdit et mentions abrogées (BLOC 6 / BLOC 5 — bloquants)
  const vocab: string[] = [];
  const abroge: string[] = [];
  for (const [nom, txt] of Object.entries(docs)) {
    if (p.categorieAction === "BC") {
      const v = findVocabulaireInterdit(txt);
      if (v.length) vocab.push(`${nom} : ${v.join(", ")}`);
    }
    const a = findMentionsAbrogees(txt);
    if (a.length) abroge.push(`${nom} : ${a.join(", ")}`);
  }
  B.push(r("V21", "Aucun terme de vocabulaire interdit en BC", vocab.length === 0, "Vocabulaire action de formation détecté", vocab.slice(0, 10)));
  B.push(r("V22", "Aucune mention juridique abrogée", abroge.length === 0, "Mention juridique abrogée détectée", abroge.slice(0, 10)));

  // Duplications entre bénéficiaires
  const duplications = rendu?.parBeneficiaire ? detectDuplication(rendu.parBeneficiaire) : [];
  B.push(r("V23", "Aucun contenu identique entre bénéficiaires", duplications.length === 0,
    duplications.length ? `Contenu identique détecté entre ${duplications[0].beneficiaireA} et ${duplications[0].beneficiaireB}. Un auditeur y verra une preuve fabriquée.` : undefined,
    duplications.slice(0, 5).map((d) => `${d.beneficiaireA} / ${d.beneficiaireB} : « ${d.extrait}… »`)));

  // V24 — aucun chevauchement de séances entre bénéficiaires (un seul consultant)
  const collisionsBenef: string[] = [];
  const occupe = new Map<string, string>();
  for (const b of beneficiaires) {
    for (const s of ctx.seancesParBeneficiaire?.[b.id] || []) {
      const key = `${fmtDateFR(s.date)} ${s.heureDebut}`;
      const autre = occupe.get(key);
      if (autre && autre !== b.id) {
        collisionsBenef.push(`${key} : ${autre} et ${b.id}`);
      } else {
        occupe.set(key, b.id);
      }
    }
  }
  B.push(r("V24", "Aucun chevauchement de séances entre bénéficiaires", collisionsBenef.length === 0,
    collisionsBenef.length ? "Deux bénéficiaires ont un entretien à la même date et au même horaire : matériellement impossible pour un consultant unique." : undefined,
    collisionsBenef.slice(0, 5)));

  // V25 — non-régression du dictionnaire de substitution (MESSAGE 17)
  const regressions: string[] = [];
  for (const [nom, txt] of entries) {
    const hits = findRegressionsSubstitution(txt);
    if (hits.length) regressions.push(`${nom} : ${hits.join(", ")}`);
  }
  B.push(r("V25", "Aucune substitution abusive dans les libellés réglementaires", regressions.length === 0,
    "Libellé réglementaire corrompu par le dictionnaire de substitution", regressions.slice(0, 10)));



  /* ---------------- Alertes (orange) ---------------- */
  const A: RegleResultat[] = [];
  A.push(r("A01", "Effectif suffisant pour publier des pourcentages", beneficiaires.length >= 5,
    `Effectif de ${beneficiaires.length} bénéficiaire(s) : tout pourcentage publié doit être accompagné de son volume et de sa date d'arrêté.`));
  A.push(r("A02", "Modalité mixte réellement mixte", !(p.modalite === "mixte" && p.seances.every((s) => s.modalite === "presentiel")),
    "Modalité déclarée « mixte » alors que toutes les séances sont en présentiel."));
  A.push(r("A03", "Distance bénéficiaire / lieu raisonnable",
    !(p.modalite === "presentiel" && beneficiaires.some((b) => b.codePostal && o.codePostal && b.codePostal.slice(0, 2) !== o.codePostal.slice(0, 2))),
    "Un bénéficiaire réside dans un autre département alors que les séances sont en présentiel."));
  A.push(r("A04", "Adaptations tracées", beneficiaires.every((b) => !b.situationHandicap || !!b.amenagements),
    "Aucune adaptation tracée pour un bénéficiaire en situation de handicap."));
  const maj = p.dateFin;
  A.push(r("A05", "Dossier actualisé depuis moins de 12 mois", (Date.now() - maj.getTime()) / DAY < 365,
    "Dossier non actualisé depuis plus de 12 mois."));
  A.push(r("A06", "CV du consultant joint", p.consultant.cvJoint, "Le CV du consultant n'est pas joint au dossier."));
  A.push(r("A07", "Phrase de durée unique", true, formatDuree(p)));

  const bloquantes = B;
  return {
    bloquantes,
    alertes: A,
    duplications,
    exportAutorise: bloquantes.every((x) => x.ok),
  };
}

/* ================================================================== */
/* BLOC 8 — Couverture des indicateurs                                 */
/* ================================================================== */

export const INDICATEURS_NON_APPLICABLES_BC = [3, 7, 13, 14, 15, 20, 29];

export const PIECES_ATTENDUES_BC: Record<number, string[]> = {
  1: ["Process de diffusion de l'information", "Plaquette de présentation du bilan", "Programme des 3 phases"],
  2: ["Tableau de bord des indicateurs de résultats", "Justificatifs chiffrés"],
  4: ["Fiche d'analyse du besoin (renseignée par le bénéficiaire)", "Fiche préalable au bilan"],
  5: ["Objectifs de la prestation formalisés", "Outil préparatoire"],
  6: ["Livret d'accueil", "Informations pratiques distanciel", "Planning prévisionnel signé"],
  8: ["Positionnement d'entrée renseigné par le bénéficiaire"],
  9: ["Contrat / convention", "CGV", "Règlement intérieur", "Accord de conservation", "Autorisation de transmission", "Clauses BC"],
  10: ["Programme des 3 phases", "Planning prévisionnel signé", "Fiche pédagogique"],
  11: ["Document de synthèse", "Feuilles d'émargement", "Suivi de l'atteinte des objectifs"],
  12: ["Suivi de l'adaptation de l'accompagnement"],
  16: ["Suivi à 6 mois formalisé", "Questionnaire à froid"],
  17: ["Moyens matériels et outils d'investigation"],
  18: ["Ressources documentaires mises à disposition"],
  19: ["Coordination des intervenants"],
  21: ["Fiches de poste des fonctions exercées", "CV du consultant"],
  22: ["Entretien annuel / plan de développement du consultant"],
  23: ["Veille légale et réglementaire du secteur d'intervention"],
  24: ["Veille sur les compétences, métiers et emplois du secteur"],
  25: ["Veille sur les innovations pédagogiques et technologiques"],
  26: ["Process handicap", "Partenaires handicap"],
  27: ["Sous-traitance / partenariats"],
  28: ["Contribution à l'insertion et aux acteurs socio-économiques"],
  30: ["Questionnaires de satisfaction bénéficiaire (à chaud / à froid)", "Mentions non applicable / sollicité sans réponse"],
  31: ["Procédure de réclamation et de médiation", "Registre des réclamations"],
  32: ["Tableau d'amélioration continue"],
};

export interface CouvertureIndicateur {
  indicateur: number;
  critere: number;
  statut: "couvert" | "partiel" | "non_couvert" | "non_applicable";
  piecesAttendues: string[];
  piecesPresentes: string[];
}

function critereDe(ind: number): number {
  if (ind <= 3) return 1;
  if (ind <= 8) return 2;
  if (ind <= 16) return 3;
  if (ind <= 20) return 4;
  if (ind <= 22) return 5;
  if (ind <= 29) return 6;
  return 7;
}

export function calculerCouverture(nomsDocuments: string[]): CouvertureIndicateur[] {
  const res: CouvertureIndicateur[] = [];
  for (let ind = 1; ind <= 32; ind++) {
    if (INDICATEURS_NON_APPLICABLES_BC.includes(ind)) {
      res.push({ indicateur: ind, critere: critereDe(ind), statut: "non_applicable", piecesAttendues: [], piecesPresentes: [] });
      continue;
    }
    const attendues = PIECES_ATTENDUES_BC[ind] || [];
    const presentes = nomsDocuments.filter((n) => new RegExp(`Indicateur[ _]?${ind}\\b`, "i").test(n));
    let statut: CouvertureIndicateur["statut"] = "non_couvert";
    if (presentes.length >= Math.max(1, attendues.length)) statut = "couvert";
    else if (presentes.length > 0) statut = "partiel";
    res.push({ indicateur: ind, critere: critereDe(ind), statut, piecesAttendues: attendues, piecesPresentes: presentes });
  }
  return res;
}
