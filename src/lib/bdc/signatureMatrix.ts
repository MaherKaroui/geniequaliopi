/**
 * MESSAGE 13 — PARTIES C & D : matrice des signatures et blocs de signature.
 *
 * B = bénéficiaire · C = consultant/formateur · O = organisme (représentant
 * légal + tampon). Un nom tapé en clair à l'emplacement d'une signature ne
 * prouve rien : seule une image de signature est acceptée.
 */
import type { BdcContext, Beneficiaire } from "./bdcModel";
import { fmtDateFR, seancesFor } from "./bdcModel";
import { calculerDatesDossier } from "../moteurDates";

export type RoleSignature = "B" | "C" | "O";

export interface RegleSignature {
  /** Rang dans la matrice (1 à 15) */
  rang: number;
  /** Fragment identifiant la pièce dans son nom de fichier */
  motif: RegExp;
  piece: string;
  roles: RoleSignature[];
  tampon: boolean;
  /** Règle de date de signature */
  dateRegle:
    | "derniere_seance"
    | "par_seance"
    | "fin_plus_7"
    | "suivi_6_mois"
    | "destruction"
    | "date_demande"
    | "date_debut"
    | "contractualisation"
    | "version"
    | "derniere_revue"
    | "etablissement";
  dateLibelle: string;
}

export const MATRICE_SIGNATURES: RegleSignature[] = [
  { rang: 1, motif: /document de synth[èe]se/i, piece: "Document de synthèse R6313-8", roles: ["B", "C"], tampon: false, dateRegle: "derniere_seance", dateLibelle: "date de la dernière séance" },
  { rang: 2, motif: /[ée]margement/i, piece: "Feuille d'émargement", roles: ["B", "C"], tampon: false, dateRegle: "par_seance", dateLibelle: "date de la séance concernée" },
  { rang: 3, motif: /satisfaction.*chaud/i, piece: "Questionnaire satisfaction à chaud", roles: ["B"], tampon: false, dateRegle: "fin_plus_7", dateLibelle: "date de fin, au plus tard fin + 7 jours" },
  { rang: 4, motif: /satisfaction.*froid/i, piece: "Questionnaire satisfaction à froid", roles: ["B", "C"], tampon: false, dateRegle: "suivi_6_mois", dateLibelle: "date du suivi à 6 mois" },
  { rang: 5, motif: /accord de conservation/i, piece: "Accord de conservation des documents", roles: ["B", "O"], tampon: true, dateRegle: "derniere_seance", dateLibelle: "date de la dernière séance" },
  { rang: 6, motif: /attestation de destruction|destruction des documents/i, piece: "Attestation de destruction", roles: ["O"], tampon: true, dateRegle: "destruction", dateLibelle: "date de destruction effective" },
  { rang: 7, motif: /autorisation de transmission/i, piece: "Autorisation de transmission à un tiers", roles: ["B", "O"], tampon: false, dateRegle: "date_demande", dateLibelle: "date de la demande" },
  { rang: 8, motif: /r[ée]clamation|m[ée]diation/i, piece: "Procédure de réclamation et médiation", roles: ["B", "O"], tampon: false, dateRegle: "date_debut", dateLibelle: "date de début de prestation" },
  { rang: 9, motif: /livret d'accueil/i, piece: "Livret d'accueil", roles: ["B"], tampon: false, dateRegle: "date_debut", dateLibelle: "date de début de prestation" },
  { rang: 10, motif: /planning/i, piece: "Planning prévisionnel", roles: ["B", "C"], tampon: false, dateRegle: "contractualisation", dateLibelle: "date de contractualisation" },
  { rang: 11, motif: /distanciel/i, piece: "Informations distanciel", roles: ["B"], tampon: false, dateRegle: "date_debut", dateLibelle: "date de début de prestation" },
  { rang: 12, motif: /fiches? de poste/i, piece: "Fiches de poste", roles: ["C", "O"], tampon: true, dateRegle: "version", dateLibelle: "date de version du document" },
  { rang: 13, motif: /handicap/i, piece: "Process handicap", roles: ["O"], tampon: true, dateRegle: "version", dateLibelle: "date de version du document" },
  { rang: 14, motif: /am[ée]lioration continue/i, piece: "Tableau d'amélioration continue", roles: ["O"], tampon: true, dateRegle: "derniere_revue", dateLibelle: "date de la dernière revue" },
  { rang: 15, motif: /clauses BC|attestations? de statut/i, piece: "Clauses BC et attestations de statut", roles: ["O"], tampon: true, dateRegle: "etablissement", dateLibelle: "date d'établissement" },
];

/** Règle applicable à une pièce, à partir de son nom de fichier. */
export function regleFor(nomPiece: string): RegleSignature | null {
  return MATRICE_SIGNATURES.find((r) => r.motif.test(nomPiece)) || null;
}

/** Accusé de remise/réception : le bénéficiaire signe une remise, pas un contenu. */
export function mentionRole(role: RoleSignature, regle: RegleSignature): string {
  if (role === "B") {
    if (/livret|distanciel/i.test(regle.piece)) return "Le bénéficiaire (accusé de remise)";
    if (/r[ée]clamation/i.test(regle.piece)) return "Le bénéficiaire (accusé de réception)";
    return "Le bénéficiaire";
  }
  if (role === "C") return /froid/i.test(regle.piece) ? "Le consultant (recueil)" : "Le consultant";
  return "L'organisme — représentant légal";
}

/** Date de signature dérivée du moteur de dates — jamais saisie à la main. */
export function dateSignature(ctx: BdcContext, regle: RegleSignature, b?: Beneficiaire | null, dateSeance?: Date): string {
  const p = ctx.prestation;
  const d = calculerDatesDossier({ dateDebut: p.dateDebut, dateFin: p.dateFin, dureeTotaleH: p.dureeTotaleH });
  const seances = seancesFor(ctx, b);
  const derniere = seances.length ? seances[seances.length - 1].date : p.dateFin;
  switch (regle.dateRegle) {
    case "par_seance": return fmtDateFR(dateSeance || seances[0]?.date || p.dateDebut);
    case "derniere_seance": return fmtDateFR(derniere);
    case "fin_plus_7": return fmtDateFR(d.satisfactionChaud);
    case "suivi_6_mois": return fmtDateFR(d.suivi6Mois);
    case "destruction": return fmtDateFR(d.destructionDocuments);
    case "date_demande": return fmtDateFR(d.remiseDocumentSynthese);
    case "date_debut": return fmtDateFR(p.dateDebut);
    case "contractualisation": return fmtDateFR(d.contractualisation);
    case "derniere_revue": return fmtDateFR(p.dateFin);
    case "version":
    case "etablissement":
    default: return fmtDateFR(p.dateDebut);
  }
}

export interface PartieSignature {
  role: RoleSignature;
  libelle: string;
  nom: string;
  qualite: string;
  image?: string;
  date: string;
}

export function partiesPour(ctx: BdcContext, regle: RegleSignature, b?: Beneficiaire | null, dateSeance?: Date): PartieSignature[] {
  const date = dateSignature(ctx, regle, b, dateSeance);
  const o = ctx.organisme;
  const p = ctx.prestation;
  return regle.roles.map((role) => {
    if (role === "B") {
      return {
        role, libelle: mentionRole(role, regle),
        nom: b ? `${b.prenom} ${b.nom}`.trim() : "",
        qualite: "Bénéficiaire du bilan de compétences",
        image: b?.signatureUrl, date,
      };
    }
    if (role === "C") {
      return { role, libelle: mentionRole(role, regle), nom: p.consultant.nom, qualite: p.consultant.qualification, image: p.consultant.signatureUrl, date };
    }
    return { role, libelle: mentionRole(role, regle), nom: o.representantLegal.nom, qualite: o.representantLegal.qualite, image: o.signatureUrl, date };
  });
}

/** Signatures attendues mais absentes : bloquent l'export du dossier. */
export function signaturesManquantes(ctx: BdcContext, regle: RegleSignature, b?: Beneficiaire | null): string[] {
  const manque = partiesPour(ctx, regle, b).filter((pa) => !pa.image).map((pa) => pa.libelle);
  if (regle.tampon && !ctx.organisme.tamponUrl) manque.push("Tampon de l'organisme");
  return manque;
}

/* ------------------------------------------------------------------ */
/* Rendu HTML du bloc de signature (injecté dans les markdowns)         */
/* ------------------------------------------------------------------ */

function celluleHtml(pa: PartieSignature, tampon?: string): string {
  const fond = tampon
    ? `background-image:url('${tampon}');background-repeat:no-repeat;background-position:center;background-size:contain;`
    : "";
  const visuel = pa.image
    ? `<img src="${pa.image}" alt="Signature ${pa.libelle}" style="max-height:58px;max-width:170px;object-fit:contain;display:block;margin:2px auto;" />`
    : pa.nom
      ? `<div style="font-family:'Brush Script MT','Lucida Handwriting','Segoe Script',cursive;font-size:22px;color:#1a3a8c;text-align:center;line-height:1.1;padding:10px 4px 6px;">${pa.nom}</div>`
      : `<div style="border-bottom:1px solid #94a3b8;height:34px;"></div>`;
  return (
    `<td style="border:1px solid #94a3b8;padding:8px;vertical-align:top;width:33%;${fond}">` +
    `<div style="font-size:10.5px;font-weight:bold;color:#0b2545;">${pa.libelle}</div>` +
    `<div style="font-size:10px;color:#475569;margin-bottom:4px;">${pa.nom || "—"}${pa.qualite ? ` · ${pa.qualite}` : ""}</div>` +
    visuel +
    `<div style="font-size:9.5px;color:#475569;text-align:center;margin-top:4px;">Signé le ${pa.date}</div>` +
    `</td>`
  );
}

/**
 * Bloc de signature conforme à la matrice, rendu en HTML brut
 * (les templates markdown laissent passer les blocs <div>).
 */
export function blocSignatureHtml(
  ctx: BdcContext,
  nomPiece: string,
  b?: Beneficiaire | null,
  opts?: { dateSeance?: Date; lieu?: string },
): string {
  const regle = regleFor(nomPiece);
  if (!regle) return "";
  const parties = partiesPour(ctx, regle, b, opts?.dateSeance);
  // MESSAGE 23 — lieu de signature = ville, jamais la phrase complète de la rubrique LIEU
  const lieuBrut = opts?.lieu || ctx.organisme.ville || ctx.prestation.lieu || "";
  const lieu = lieuBrut.length > 40 ? (ctx.organisme.ville || "") : lieuBrut;
  const tampon = regle.tampon ? ctx.organisme.tamponUrl : undefined;
  const cellules = parties
    .map((pa) => celluleHtml(pa, pa.role === "O" ? tampon : undefined))
    .join("");
  return (
    `<div class="bloc-signature" style="margin-top:18px;">` +
    `<div style="font-size:11px;font-weight:bold;color:#0b2545;margin-bottom:4px;">Signatures — fait à ${lieu}</div>` +
    `<table style="border-collapse:collapse;width:100%;"><tr>${cellules}</tr></table>` +
    `</div>`
  );
}
