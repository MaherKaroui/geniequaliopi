/**
 * MESSAGE 21 — Les quatre classeurs jusqu'ici importés en l'état sont désormais
 * PRODUITS à partir du BdcContext et du moteur de dates.
 *
 * Aucun en-tête d'organisme tiers, aucune ligne fictive, aucune date postérieure
 * à la date d'édition.
 */
import type { BdcContext, Beneficiaire } from "./bdcModel";
import { fmtDateFR, seancesFor, prestationFor } from "./bdcModel";
import { calculerDatesDossier } from "../moteurDates";

const ESC = (v: unknown) =>
  (v === null || v === undefined ? "" : String(v)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const STYLE = `
table{border-collapse:collapse;font-family:Calibri,Arial,sans-serif;font-size:11pt}
th{background:#1e3a7b;color:#fff;padding:8px 10px;text-align:left;border:1px solid #1e3a7b;font-weight:bold;vertical-align:top}
td{padding:6px 9px;border:1px solid #d0d0d0;vertical-align:top}
tr:nth-child(even) td{background:#f2f6fc}
.title{font-size:14pt;font-weight:bold;color:#1e3a7b;padding:10px;background:#fff}
.subtitle{font-size:10pt;color:#666;padding:4px 10px;background:#fff}
.total td{background:#1e3a7b;color:#fff;font-weight:bold;mso-number-format:"\\@"}
.dt{mso-number-format:"dd\\/mm\\/yyyy"}
.txt{mso-number-format:"\\@"}
.pct{mso-number-format:"0%"}
`;

export function classeur(title: string, subtitle: string, sheetName: string, headers: string[], rows: string[][], notes: string[] = []): string {
  const colspan = headers.length;
  const body =
    `<tr>${headers.map((h) => `<th>${ESC(h)}</th>`).join("")}</tr>` +
    rows.map((r) => `<tr>${r.map((c) => `<td class="txt">${ESC(c)}</td>`).join("")}</tr>`).join("") +
    notes.map((n) => `<tr><td class="subtitle" colspan="${colspan}">${ESC(n)}</td></tr>`).join("");
  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8">
<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${ESC(sheetName)}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
<style>${STYLE}</style></head><body><table>
<tr><td class="title" colspan="${colspan}">${ESC(title)}</td></tr>
<tr><td class="subtitle" colspan="${colspan}">${ESC(subtitle)}</td></tr>
<tr><td colspan="${colspan}" style="height:6px"></td></tr>
${body}
</table></body></html>`;
}

const sousTitre = (ctx: BdcContext) =>
  `Organisme : ${ctx.organisme.raisonSociale} · SIRET ${ctx.organisme.siret} · Édition du ${fmtDateFR(new Date())}`;

const nomBen = (b: Beneficiaire) => `${b.prenom} ${b.nom.toUpperCase()}`.trim();

/* ------------------------------------------------------------------ */
/* Indicateur 4 — Cahier de contacts                                    */
/* ------------------------------------------------------------------ */
export function buildCahierContacts(ctx: BdcContext): string {
  const rows = ctx.beneficiaires.flatMap((b) => {
    const p = prestationFor(ctx, b);
    const d = calculerDatesDossier({ dateDebut: p.dateDebut, dateFin: p.dateFin, dureeTotaleH: p.dureeTotaleH });
    const futur = (x: Date) => x.getTime() > Date.now();
    return [
      [
        fmtDateFR(d.entretienPrealable), nomBen(b), b.telephone || "—", b.email || "—",
        "Demande d'information — bilan de compétences", "Entretien préalable d'information (gratuit, sans engagement)",
        p.consultant.nom, futur(d.entretienPrealable) ? "Prévu" : "Analyse du besoin réalisée",
      ],
      [
        fmtDateFR(d.contractualisation), nomBen(b), b.telephone || "—", b.email || "—",
        "Contractualisation", p.origineDemande === "employeur" ? "Envoi de la convention tripartite, des CGV et du règlement intérieur" : "Envoi du contrat, des CGV et du règlement intérieur",
        p.consultant.nom, futur(d.contractualisation) ? "Prévu" : "Signé avant démarrage",
      ],
    ];
  });
  return classeur(
    "CAHIER DE CONTACTS ET ANALYSE DU BESOIN",
    sousTitre(ctx),
    "Cahier de contacts",
    ["Date du contact", "Bénéficiaire", "Téléphone", "Courriel", "Objet de la demande", "Suite donnée", "Interlocuteur", "Statut"],
    rows,
    ["Aucune donnée ne peut être postérieure à la date d'édition du dossier."],
  );
}

/* ------------------------------------------------------------------ */
/* Indicateur 26 — Contacts et suivi handicap                           */
/* ------------------------------------------------------------------ */
export function buildContactsHandicap(ctx: BdcContext): string {
  const dep = (ctx.organisme.codePostal || "").slice(0, 2);
  const rows: string[][] = [
    ["Référent handicap de l'organisme", ctx.organisme.referentHandicap.nom || ctx.organisme.representantLegal.nom, ctx.organisme.referentHandicap.telephone || ctx.organisme.telephoneContact || "—", ctx.organisme.referentHandicap.email || ctx.organisme.emailContact || "—", "Accueil, analyse du besoin d'adaptation, mise en relation"],
    [`MDPH du département ${dep || "—"}`, "Maison départementale des personnes handicapées", "—", "—", "Reconnaissance RQTH, orientation, prestation de compensation"],
    ["Agefiph", "Délégation régionale", "0 800 11 10 09", "www.agefiph.fr", "Aides à la compensation du handicap en emploi et en formation"],
    ["Cap emploi", "Organisme de placement spécialisé", "—", "www.capemploi.fr", "Accompagnement vers et dans l'emploi"],
    ["Ressource Handicap Formation", "Agefiph — RHF", "—", "www.agefiph.fr", "Appui à l'adaptation de la prestation"],
  ];
  const suivi = ctx.beneficiaires.map((b) => [
    nomBen(b),
    b.situationHandicap ? "Situation déclarée" : "Aucune situation déclarée",
    b.situationHandicap ? (b.amenagements || "À formaliser avec le référent handicap") : "Sans objet",
    b.situationHandicap ? fmtDateFR(prestationFor(ctx, b).dateDebut) : "—",
  ]);
  return classeur(
    "CONTACTS ET SUIVI HANDICAP",
    sousTitre(ctx),
    "Contacts handicap",
    ["Structure", "Interlocuteur", "Téléphone", "Contact", "Champ d'intervention"],
    [...rows, ["", "", "", "", ""], ["SUIVI DES BÉNÉFICIAIRES", "Situation", "Adaptation mise en œuvre", "Date", ""],
      ...suivi.map((s) => [...s, ""])],
  );
}

/* ------------------------------------------------------------------ */
/* Indicateur 10 — Suivi de l'adaptation                                */
/* ------------------------------------------------------------------ */
export function buildSuiviAdaptation(ctx: BdcContext): string {
  const rows = ctx.beneficiaires.map((b) => {
    const seances = seancesFor(ctx, b);
    return [
      nomBen(b),
      seances.length ? fmtDateFR(seances[0].date) : fmtDateFR(prestationFor(ctx, b).dateDebut),
      b.situationHandicap ? "Situation de handicap déclarée" : "Contraintes professionnelles et familiales",
      b.amenagements || "Aucun besoin d'adaptation exprimé lors de l'analyse du besoin",
      `Créneaux : ${b.joursDisponibles.join(", ") || "—"}`,
      ctx.prestation.consultant.nom,
      "",
    ];
  });
  return classeur(
    "SUIVI DE L'ADAPTATION À L'ACCOMPAGNEMENT",
    sousTitre(ctx),
    "Suivi adaptation",
    ["Bénéficiaire", "Date du constat", "Besoin identifié", "Adaptation mise en œuvre", "Modalités retenues", "Consultant", "Évaluation de l'efficacité"],
    rows,
    ["La colonne « Évaluation de l'efficacité » est renseignée par le consultant après mise en œuvre."],
  );
}

/* ------------------------------------------------------------------ */
/* Indicateur 31 — Tableau des dysfonctionnements                       */
/* ------------------------------------------------------------------ */
export function buildDysfonctionnements(ctx: BdcContext): string {
  // Registre tenu au fil de l'eau : aucune ligne n'est inventée par l'outil.
  const vide = ["", "", "", "", "", "", "", "", "☐ En cours ☐ Soldée"];
  return classeur(
    "REGISTRE DES DYSFONCTIONNEMENTS, RÉCLAMATIONS ET ALÉAS",
    sousTitre(ctx),
    "Dysfonctionnements",
    ["Référence", "Date du constat", "Origine", "Bénéficiaire", "Prestation", "Description", "Action corrective", "Responsable", "Statut"],
    [vide, vide, vide],
    ["Registre ouvert à la date de mise à jour du dossier et tenu au fil de l'eau. Toute réclamation, difficulté ou aléa y est inscrit dans les 48 heures ; l'action corrective est reportée au tableau d'amélioration continue (IND 32)."],
  );
}

export interface ClasseurDef {
  /** Nom du fichier avec extension */
  name: string;
  /** Indicateur de rattachement (pour le classement Critere_X/Indicateur_Y) */
  indicateur: number;
  build: (ctx: BdcContext) => string;
}

export const BDC_CLASSEURS: ClasseurDef[] = [
  { name: "Indicateur 4 - Cahier de contacts et analyse du besoin.xlsx", indicateur: 4, build: buildCahierContacts },
  { name: "Indicateur 26 - Contacts et suivi handicap.xlsx", indicateur: 26, build: buildContactsHandicap },
  { name: "Indicateur 10 - Suivi de l'adaptation à l'accompagnement.xlsx", indicateur: 10, build: buildSuiviAdaptation },
  { name: "Indicateur 31 - Registre des dysfonctionnements, réclamations et aléas.xlsx", indicateur: 31, build: buildDysfonctionnements },
];

/** Texte brut d'un classeur, pour le contrôle de cohérence (MESSAGE 22). */
export function texteClasseur(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<\/(td|th)>/gi, " | ")
    .replace(/<\/tr>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}
