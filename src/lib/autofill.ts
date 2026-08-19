/**
 * MESSAGE 13 — PARTIE A : REMPLISSAGE AUTOMATIQUE
 *
 * Un champ factuel saisi dans un formulaire (Organisme, Consultant,
 * Bénéficiaire, Prestation) n'est JAMAIS ressaisi dans un document : il est
 * injecté ici sous forme de jeton {{cle}}.
 *
 * Règle absolue : seuls les FAITS sont pré-remplis. Les verbatims, réponses de
 * questionnaires, comptes rendus, appréciations et contenus du document de
 * synthèse restent vides — un témoignage généré par un logiciel est considéré
 * comme une preuve fabriquée en audit.
 */
import type { BdcContext, Beneficiaire } from "./bdc/bdcModel";
import { fmtDateFR, fmtDateLongue, formatPrix, mentionNDA, seancesFor, typeContrat } from "./bdc/bdcModel";
import { phraseDuree } from "./generateurPlanning";
import { calculerDatesDossier } from "./moteurDates";

export type JetonsAutofill = Record<string, string>;

/** Champs déclaratifs : interdits au remplissage automatique. */
export const CHAMPS_DECLARATIFS = [
  "verbatim",
  "commentaire de satisfaction",
  "réponse de questionnaire",
  "réponse au test de positionnement",
  "compte rendu d'entretien",
  "contenu du document de synthèse",
  "motif d'abandon",
  "appréciation",
];

export const FILIGRANE_DECLARATIF = "_[À compléter par la personne concernée]_";

/**
 * Construit tous les jetons factuels d'un dossier pour un bénéficiaire donné.
 */
export function construireJetons(ctx: BdcContext, b?: Beneficiaire | null): JetonsAutofill {
  const o = ctx.organisme;
  const p = ctx.prestation;
  const seances = seancesFor(ctx, b);
  const dates = calculerDatesDossier({
    dateDebut: p.dateDebut,
    dateFin: p.dateFin,
    dureeTotaleH: p.dureeTotaleH,
    typeContrat: typeContrat(p).type === "tripartite" ? "tripartite" : p.financeur === "CPF" ? "cpf" : "individuel",
  });

  const j: JetonsAutofill = {
    // — Organisme
    "organisme.raisonSociale": o.raisonSociale,
    "organisme.adresse": `${o.adresse}, ${o.codePostal} ${o.ville}`.replace(/^,\s*/, ""),
    "organisme.siret": o.siret,
    "organisme.nda": o.nda,
    "organisme.mentionNDA": mentionNDA(o),
    "organisme.email": o.emailContact,
    "organisme.telephone": o.telephoneContact,
    "organisme.representantLegal": o.representantLegal.nom,
    "organisme.qualiteRepresentant": o.representantLegal.qualite,
    "organisme.referentHandicap": o.referentHandicap.nom,
    "organisme.referentHandicapTel": o.referentHandicap.telephone,
    "organisme.referentHandicapEmail": o.referentHandicap.email,
    "organisme.mediateur": `${o.mediateurConsommation.nom} — ${o.mediateurConsommation.adresse} — ${o.mediateurConsommation.urlSaisine}`,
    "organisme.tribunal": `Tribunal judiciaire de ${o.tribunalCompetent}`,
    "organisme.region": o.regionPrefecture,

    // — Consultant
    "consultant.nom": p.consultant.nom,
    "consultant.fonction": "Consultant en bilan de compétences",
    "consultant.qualification": p.consultant.qualification,

    // — Prestation
    "prestation.intitule": typeContrat(p).libelle,
    "prestation.categorie": p.categorieAction,
    "prestation.dateDebut": fmtDateFR(p.dateDebut),
    "prestation.dateDebutLongue": fmtDateLongue(p.dateDebut),
    "prestation.dateFin": fmtDateFR(p.dateFin),
    "prestation.dateFinLongue": fmtDateLongue(p.dateFin),
    "prestation.dureeTotaleH": String(p.dureeTotaleH),
    "prestation.dureeEntretiensH": String(p.dureeEntretiensH),
    "prestation.dureeTravailPersoH": String(p.dureeTravailPersoH),
    "prestation.phraseDuree": phraseDuree(p, seances.length),
    "prestation.modalite": p.modalite,
    "prestation.lieu": p.lieu,
    "prestation.prix": formatPrix(o, p),
    "prestation.financeur": p.financeur,
    "prestation.origineDemande": p.origineDemande,
    "prestation.nbSeances": String(seances.length),

    // — Dates dérivées (moteur de dates)
    "dates.entretienPrealable": fmtDateFR(dates.entretienPrealable),
    "dates.contractualisation": fmtDateFR(dates.contractualisation),
    "dates.finRetractation": fmtDateFR(dates.finDelaiRetractation),
    "dates.testPositionnement": fmtDateFR(dates.testPositionnement),
    "dates.entretienIntermediaire": fmtDateFR(dates.entretienIntermediaire),
    "dates.remiseSynthese": fmtDateFR(dates.remiseDocumentSynthese),
    "dates.certificatRealisation": fmtDateFR(dates.certificatRealisation),
    "dates.satisfactionChaud": fmtDateFR(dates.satisfactionChaud),
    "dates.suivi6Mois": fmtDateFR(dates.suivi6Mois),
    "dates.destruction": fmtDateFR(dates.destructionDocuments),
  };

  if (b) {
    j["beneficiaire.civilite"] = b.civilite === "Non précisé" ? "" : b.civilite;
    j["beneficiaire.nom"] = b.nom;
    j["beneficiaire.prenom"] = b.prenom;
    j["beneficiaire.nomComplet"] = `${b.prenom} ${b.nom}`.trim();
    j["beneficiaire.dateNaissance"] = fmtDateFR(b.dateNaissance);
    j["beneficiaire.adresse"] = `${b.adresse}${b.codePostal ? `, ${b.codePostal}` : ""} ${b.ville}`.trim();
    j["beneficiaire.email"] = b.email;
    j["beneficiaire.telephone"] = b.telephone;
    j["beneficiaire.situation"] = b.situation;
    j["beneficiaire.employeur"] = b.employeur?.raisonSociale || "";
    j["beneficiaire.employeurAdresse"] = b.employeur?.adresse || "";
  }

  // — Séances : jetons indexés (1-based)
  seances.forEach((s, i) => {
    const n = i + 1;
    j[`seance${n}.numero`] = String(s.numero);
    j[`seance${n}.date`] = fmtDateFR(s.date);
    j[`seance${n}.horaires`] = `${s.heureDebut} – ${s.heureFin}`;
    j[`seance${n}.duree`] = `${s.duree} h`;
    j[`seance${n}.phase`] = `Phase ${s.phase}`;
    j[`seance${n}.modalite`] = s.modalite;
    j[`seance${n}.lieu`] = s.modalite === "distanciel" ? "Visioconférence" : p.lieu;
  });

  return j;
}

/** Remplace tous les jetons {{cle}} par leur valeur factuelle. */
export function appliquerAutofill(texte: string, jetons: JetonsAutofill): string {
  return texte.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (brut, cle: string) => {
    const v = jetons[cle];
    return v === undefined ? brut : v;
  });
}

/** Jetons restés non résolus : signalés au lieu d'être laissés dans le document. */
export function jetonsNonResolus(texte: string): string[] {
  return Array.from(new Set((texte.match(/\{\{\s*[\w.]+\s*\}\}/g) || []).map((s) => s.trim())));
}

/** Compte les zones déclaratives restant à compléter dans un document. */
export function compterChampsDeclaratifs(md: string): number {
  const filigranes = md.match(/\[À compléter[^\]]*\]/gi) || [];
  return filigranes.length;
}

/**
 * Bandeau placé en tête de document : compteur des zones déclaratives.
 * Un document sans zone à compléter n'affiche aucun bandeau.
 */
export function bandeauDeclaratif(md: string): string {
  const n = compterChampsDeclaratifs(md);
  if (!n) return "";
  return `> **${n} champ${n > 1 ? "s" : ""} déclaratif${n > 1 ? "s" : ""} à compléter** — les zones marquées « à compléter par la personne concernée » relèvent du déclaratif (verbatims, réponses, appréciations) et ne peuvent pas être pré-remplies par l'application.\n`;
}

/**
 * Point d'entrée unique : injecte les faits, ajoute le bandeau déclaratif.
 */
export function autofillDocument(md: string, ctx: BdcContext, b?: Beneficiaire | null): string {
  const rempli = appliquerAutofill(md, construireJetons(ctx, b));
  const bandeau = bandeauDeclaratif(rempli);
  return bandeau ? `${bandeau}\n${rempli}` : rempli;
}
