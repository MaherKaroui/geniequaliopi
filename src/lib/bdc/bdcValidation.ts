/**
 * BLOC 2 — Moteur de validation bloquant (V01 → V20) + alertes
 * BLOC 8 — Couverture des indicateurs
 *
 * Aucune exportation possible tant qu'une règle bloquante échoue.
 */
import type { BdcContext } from "./bdcModel";
import { fmtDateFR, formatDuree, seancesFor } from "./bdcModel";
import { BDC_TEMPLATES_MANQUANTS } from "./bdcTemplatesBC";
import { calculerDatesDossier } from "../moteurDates";
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

/**
 * Prénoms sans ambiguïté : aucune heuristique de terminaison (« Yassine »,
 * « Sacha » ou « Karim » seraient signalés à tort). Seule une liste explicite
 * de prénoms très majoritairement féminins déclenche une demande de confirmation.
 */
const PRENOMS_FEMININS = new Set([
  "rahma", "fatima", "sabrina", "amina", "sarah", "nadia", "leila", "maria", "sofia",
  "yasmine", "karima", "samira", "laura", "julie", "marie", "sandrine", "aicha", "khadija",
  "nawel", "imane", "sonia", "myriam", "hanane", "assia", "linda", "elodie", "camille",
]);

/** Prénoms masculins fréquents à terminaison « féminine » : jamais signalés. */
const PRENOMS_MASCULINS = new Set([
  "yassine", "amine", "hocine", "mohamed", "karim", "sacha", "yanis", "hamza", "nabil",
  "sofiane", "zine", "ilyes", "anthonin", "come", "côme", "noa", "elia", "andrea", "luca",
]);

/** Vrai si la civilité retenue contredit vraisemblablement le prénom. */
function feminiteDouteuse(prenom: string, civilite: string): boolean {
  const p = (prenom || "").trim().toLowerCase().split(/[\s-]/)[0];
  if (!p || PRENOMS_MASCULINS.has(p)) return false;
  return PRENOMS_FEMININS.has(p) && /^m\.?$/i.test(civilite.trim());
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
  // Signature 14 jours ouvrés avant le démarrage (même règle que les pièces du dossier)
  const dateConvention = (() => { const d = new Date(p.dateDebut); let n = 0; while (n < 14) { d.setDate(d.getDate() - 1); const w = d.getDay(); if (w !== 0 && w !== 6) n++; } return d; })();
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

  // V26 — MESSAGE 22 : les disponibilités affichées dans le planning doivent être
  // celles déclarées dans la fiche d'analyse du besoin. Le générateur de planning
  // lit ces disponibilités en lecture seule : il ne les élargit jamais.
  const joursDansLigne = (ligne: string) => JOURS.filter((j) => new RegExp(`\\b${j}\\b`, "i").test(ligne));
  const ligneDispo = (txt: string) => txt.split("\n").find((l) => /disponibilit[ée]s d[ée]clar[ée]es/i.test(l)) || "";
  const ecartsDispo: string[] = [];
  for (const b of beneficiaires) {
    const fiche = entries.find(([nom]) => /analyse (du|de) besoin|analyse des besoins/i.test(nom) && nom.includes(b.nom));
    const plannings = entries.filter(([nom]) => /planning/i.test(nom) && nom.includes(b.nom));
    if (!fiche || !plannings.length) continue;
    const attendus = joursDansLigne(ligneDispo(fiche[1]));
    if (!attendus.length) continue;
    for (const [nom, txt] of plannings) {
      const affiches = joursDansLigne(ligneDispo(txt));
      if (!affiches.length) continue;
      const enTrop = affiches.filter((j) => !attendus.includes(j));
      if (enTrop.length) {
        ecartsDispo.push(`${nom} : planning affichant ${affiches.join(", ")} alors que la fiche de besoin déclare ${attendus.join(", ")}`);
      }
    }
  }
  B.push(r("V26", "Disponibilités du planning identiques à celles de la fiche de besoin", ecartsDispo.length === 0,
    "Les disponibilités déclarées par le bénéficiaire ont été élargies par le générateur de planning : la contrainte doit être respectée, jamais effacée.",
    ecartsDispo.slice(0, 8)));

  // V27 — MESSAGE 20 : les rubriques 2, 3 et 4 du document de synthèse doivent
  // être renseignées par le consultant. Tant qu'elles portent le marqueur de
  // saisie, l'export est bloqué et le dossier est marqué incomplet.
  const syntheses = fichiersOu(/document de synth[èe]se/i);
  const synthesesVides = syntheses
    .filter(([, txt]) => /À COMPLÉTER PAR LE CONSULTANT/i.test(txt))
    .map(([nom]) => nom);
  B.push(r("V27", "Document de synthèse renseigné par le consultant",
    syntheses.length === 0 || synthesesVides.length === 0,
    "Les rubriques 2, 3 et 4 du document de synthèse doivent être saisies à partir des notes d'entretien : elles ne peuvent pas être générées.",
    synthesesVides.slice(0, 10)));

  // V28 — MESSAGE 23 : politique de datation. Aucune donnée du dossier ne peut
  // être postérieure à la date d'édition, et la trame précède la première séance.
  const edition = new Date();
  const futures: string[] = [];
  for (const [nom, txt] of entries) {
    for (const d of datesDansTexte(txt)) {
      if (d.getTime() > edition.getTime() && d.getTime() > p.dateFin.getTime()) {
        // Les échéances prévisionnelles (suivi à 6 mois, destruction) restent licites.
        if (Math.abs(d.getTime() - p.dateSuivi6Mois.getTime()) < 60 * DAY) continue;
        futures.push(`${nom} : donnée datée du ${fmtDateFR(d)}, postérieure à l'édition du ${fmtDateFR(edition)}`);
      }
    }
  }
  B.push(r("V28", "Aucune donnée postérieure à la date d'édition", futures.length === 0,
    "Une donnée du dossier est postérieure à la date d'édition : un auditeur y verra un antidatage.",
    [...new Set(futures)].slice(0, 8)));

  /* ================================================================== */
  /* R1 → R12 — Chaîne chronologique et clôture du parcours              */
  /* ================================================================== */

  const dj = calculerDatesDossier({
    dateDebut: p.dateDebut,
    dateFin: p.dateFin,
    dureeTotaleH: p.dureeTotaleH,
    typeContrat: p.origineDemande === "employeur" ? "tripartite" : p.financeur === "CPF" ? "cpf" : "individuel",
  });
  /** Délai de rétractation : UN SEUL paramètre pour toute l'application. */
  const delaiRetractJours = o.delaiRetractationJours ?? dj.delaiRetractationJours;
  const addJ = (d0: Date, n: number) => new Date(d0.getTime() + n * DAY);

  const toutesSeances = beneficiaires.flatMap((b) => seancesFor(ctx, b));
  const seancesTriees = [...toutesSeances].sort((a, b2) => a.date.getTime() - b2.date.getTime());
  const premiereSeance = seancesTriees[0]?.date ?? p.dateDebut;
  const derniereSeance = seancesTriees[seancesTriees.length - 1]?.date ?? p.dateFin;

  // R1 — chaîne chronologique complète
  const finRetractation = addJ(dj.contractualisation, delaiRetractJours);
  const chaine: Array<[string, Date]> = [
    ["premier contact", dj.entretienPrealable],
    ["analyse du besoin", dj.analyseBesoin],
    ["signature de la convention", dj.contractualisation],
    ["fin du délai de rétractation", finRetractation],
    ["début de la prestation", p.dateDebut],
    ["1re séance", premiereSeance],
  ];
  const rupturesR1 = chaine
    .slice(1)
    .map((c, i) => (chaine[i][1].getTime() > c[1].getTime()
      ? `${chaine[i][0]} (${fmtDateFR(chaine[i][1])}) postérieur à ${c[0]} (${fmtDateFR(c[1])})` : ""))
    .filter(Boolean);
  B.push(r("R1", "Chaîne chronologique respectée (contact → analyse → convention → rétractation → début → 1re séance)",
    rupturesR1.length === 0, "Ordre chronologique du dossier rompu.", rupturesR1));

  // R2 — fin de rétractation = signature + délai paramétré (valeur unique)
  const delaisEcrits = new Set<number>();
  for (const [, txt] of entries) {
    for (const m of txt.matchAll(/d[ée]lai[^.\n]{0,60}?(\d{1,2})\s*jours?/gi)) {
      if (/r[ée]tractation|acceptation/i.test(m[0])) delaisEcrits.add(Number(m[1]));
    }
  }
  const delaisIncoherents = [...delaisEcrits].filter((v) => v !== delaiRetractJours);
  B.push(r("R2", `Délai de rétractation unique (${delaiRetractJours} jours) appliqué partout`,
    delaisIncoherents.length === 0,
    "Deux valeurs de délai de rétractation coexistent dans le dossier : un seul délai doit être paramétré au niveau de l'organisme.",
    delaisIncoherents.map((v) => `${v} jours trouvés au lieu de ${delaiRetractJours}`)));

  // R3 — aucune séance hors de la période
  const horsPeriode = toutesSeances
    .filter((s) => s.date < p.dateDebut || s.date > p.dateFin)
    .map((s) => `Séance ${s.numero} du ${fmtDateFR(s.date)} hors période ${fmtDateFR(p.dateDebut)} → ${fmtDateFR(p.dateFin)}`);
  B.push(r("R3", "Toutes les séances tombent entre la date de début et la date de fin",
    horsPeriode.length === 0, "Séance datée hors de la période de la prestation.", horsPeriode.slice(0, 8)));

  // R4 — date de fin = dernière séance réalisée (jamais saisie à la main)
  const memeJour = (a: Date, b2: Date) => fmtDateFR(a) === fmtDateFR(b2);
  B.push(r("R4", "Date de fin égale à la dernière séance réalisée", memeJour(p.dateFin, derniereSeance),
    `La date de fin (${fmtDateFR(p.dateFin)}) doit être celle de la dernière séance (${fmtDateFR(derniereSeance)}) : elle est calculée, jamais saisie.`));

  // R5 — remise de la synthèse après la dernière séance
  B.push(r("R5", "Document de synthèse remis après la dernière séance",
    dj.remiseDocumentSynthese.getTime() >= derniereSeance.getTime(),
    `Remise du document de synthèse (${fmtDateFR(dj.remiseDocumentSynthese)}) antérieure à la dernière séance (${fmtDateFR(derniereSeance)}).`));

  // R6 — suivi à 6 mois entre 5 et 7 mois après la remise
  const joursSuivi = Math.round((p.dateSuivi6Mois.getTime() - dj.remiseDocumentSynthese.getTime()) / DAY);
  B.push(r("R6", "Suivi à 6 mois daté entre 5 et 7 mois après la remise",
    joursSuivi >= 150 && joursSuivi <= 214,
    `Un suivi à 6 mois ne peut pas être daté à ${joursSuivi} jours de la remise.`));

  // R7 — aucune relance postérieure à la réponse
  const relancesApresReponse: string[] = [];
  for (const [nom, txt] of entries) {
    const lignes = txt.split("\n");
    const dateReponse = lignes
      .filter((l) => /r[ée]ponse|retour du b[ée]n[ée]ficiaire/i.test(l))
      .flatMap(datesDansTexte)
      .sort((a, b2) => a.getTime() - b2.getTime())[0];
    if (!dateReponse) continue;
    for (const l of lignes.filter((x) => /relance/i.test(x))) {
      for (const d0 of datesDansTexte(l)) {
        if (d0 > dateReponse) relancesApresReponse.push(`${nom} : relance du ${fmtDateFR(d0)} après la réponse du ${fmtDateFR(dateReponse)}`);
      }
    }
  }
  B.push(r("R7", "Aucune relance datée après la réponse du bénéficiaire", relancesApresReponse.length === 0,
    "Une relance est datée après la réponse obtenue.", [...new Set(relancesApresReponse)].slice(0, 5)));

  // R8 — plafond légal de 24 h d'accompagnement
  const depassements = beneficiaires
    .map((b) => ({ b, h: seancesFor(ctx, b).reduce((a, s) => a + s.duree, 0) }))
    .filter((x) => x.h > 24)
    .map((x) => `${x.b.prenom} ${x.b.nom} : ${x.h} h d'accompagnement`);
  B.push(r("R8", "Plafond légal de 24 h d'accompagnement respecté", depassements.length === 0,
    "Le bilan de compétences ne peut pas dépasser 24 h d'accompagnement (art. R6313-4).", depassements));

  // R9 — répartition réelle par phase vs programme de référence (20 / 55 / 25 %)
  const refPhases: Record<1 | 2 | 3, number> = { 1: 0.2, 2: 0.55, 3: 0.25 };
  const ecartsPhase: string[] = [];
  for (const b of beneficiaires) {
    const ss = seancesFor(ctx, b);
    const tot = ss.reduce((a, s) => a + s.duree, 0);
    ([1, 2, 3] as const).forEach((ph) => {
      const reel = ss.filter((s) => s.phase === ph).reduce((a, s) => a + s.duree, 0);
      const attendu = tot * refPhases[ph];
      if (Math.abs(reel - attendu) > 1) {
        ecartsPhase.push(`${b.prenom} ${b.nom} — phase ${ph} : ${reel} h réalisées pour ${attendu.toFixed(1)} h annoncées`);
      }
    });
  }
  B.push(r("R9", "Répartition par phase conforme au programme annoncé", ecartsPhase.length === 0,
    "Le parcours réalisé ne correspond pas au programme annoncé — corrigez le programme ou le séquençage.",
    ecartsPhase.slice(0, 8)));

  // R10 — conditions de clôture (présence, signature, atteinte des objectifs)
  const clotureKo: string[] = [];
  const dossierTermine = derniereSeance.getTime() <= Date.now();
  if (dossierTermine) {
    for (const [nom, txt] of fichiersOu(/[ée]margement/i)) {
      if (!/pr[ée]sent/i.test(txt)) clotureKo.push(`${nom} : présence non renseignée`);
      else if (!/signature|signé/i.test(txt)) clotureKo.push(`${nom} : séance présente sans signature`);
    }
    for (const [nom, txt] of fichiersOu(/objectif|synth[èe]se/i)) {
      if (/objectif/i.test(txt) && /☐/.test(txt) && !/☒/.test(txt)) {
        clotureKo.push(`${nom} : objectif sans niveau d'atteinte coché`);
      }
    }
  }
  B.push(r("R10", "Parcours clôturable (présences, signatures, atteinte des objectifs)", clotureKo.length === 0,
    "Le parcours ne peut pas être clôturé : présence, signature ou atteinte d'objectif manquante.",
    [...new Set(clotureKo)].slice(0, 8)));

  // R11 — convention tripartite obligatoire si la demande vient de l'employeur
  const aTripartite = noms.some((n) => /tripartite/i.test(n)) || textes.some((t) => /convention tripartite/i.test(t));
  B.push(r("R11", tripartite ? "Convention tripartite présente au dossier" : "Convention tripartite — non applicable (demande du bénéficiaire)",
    !tripartite || aTripartite,
    "Demande à l'initiative de l'employeur : la convention tripartite est obligatoire au dossier."));

  // R12 — aucun taux saisi à la main : tous les taux sont calculés
  const tauxManuels: string[] = [];
  for (const [nom, txt] of entries) {
    for (const l of txt.split("\n")) {
      if (!/taux|%/i.test(l)) continue;
      if (/(_{2,}|\.{3,}|\bà compl[ée]ter\b|\[\s*\]|…\s*%)/i.test(l)) tauxManuels.push(`${nom} : « ${l.trim().slice(0, 80)} »`);
    }
  }
  B.push(r("R12", "Tous les taux sont calculés, aucun n'est saisi à la main", tauxManuels.length === 0,
    "Un taux est laissé à la saisie manuelle : les taux doivent être calculés à partir des données du dossier.",
    [...new Set(tauxManuels)].slice(0, 8)));

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
  // A06 — MESSAGE 22 : la règle porte sur la présence effective du fichier CV.
  const cvPresent = noms.some((n) => /\bCV\b|curriculum/i.test(n));
  A.push(r("A06", "CV du consultant joint", cvPresent,
    "Aucun CV de consultant ne figure dans l'archive exportée."));
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

/** Indicateurs non applicables au bilan de compétences (guide de lecture V9, décret n° 2026-728). */
export const INDICATEURS_NON_APPLICABLES_BC = [3, 7, 8, 13, 14, 15, 16, 20, 28, 29, 33];

/** Pièces attendues par indicateur applicable — libellés alignés sur les pièces réellement générées. */
export const PIECES_ATTENDUES_BC: Record<number, string[]> = {
  1: ["Présentation du bilan", "Cadre légal et réglementaire", "Process général"],
  2: ["Indicateurs de résultats", "Justificatifs chiffrés calculés"],
  4: ["Fiche d'analyse du besoin", "Fiche préalable au bilan", "Auto-diagnostic préliminaire"],
  5: ["Objectifs opérationnels et évaluables", "Outil préparatoire"],
  6: ["Contenus et modalités adaptés", "Programme des 3 phases"],
  9: ["Contrat / convention", "CGV", "Règlement intérieur", "Livret d'accueil", "Accord de conservation", "Autorisation de transmission", "Clauses BC"],
  10: ["Convention de prestation", "Planning prévisionnel signé", "Fiche pédagogique", "Entretien intermédiaire"],
  11: ["Document de synthèse", "Attestation de remise", "Feuilles d'émargement"],
  12: ["Process abandons", "Guide d'entretien des abandons"],
  17: ["Moyens, confidentialité et informations pratiques"],
  18: ["Organigramme", "Annuaire des contacts"],
  19: ["Ressources mises à disposition"],
  21: ["Fiches de poste des fonctions exercées", "Process recrutement"],
  22: ["Entretien annuel", "Plan de développement des compétences"],
  23: ["Registre de veille légale et réglementaire", "Process veilles"],
  24: ["Registre de veille emplois, métiers et compétences"],
  25: ["Registre de veille innovations pédagogiques et technologiques"],
  26: ["Process handicap", "Partenaires handicap"],
  27: ["Registre de sous-traitance et de portage salarial", "Clauses qualité des contrats"],
  30: ["Questionnaires de satisfaction (à chaud / à froid)", "Mentions entreprise / financeur"],
  31: ["Procédure de réclamation et de médiation"],
  32: ["Tableau d'amélioration continue", "Analyse des risques sur la qualité"],
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
  for (let ind = 1; ind <= 33; ind++) {
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
