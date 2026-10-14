import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import {
  buildDocument,
  formatDate,
  tableHTML,
  getStagiaireDateDebut,
  getStagiaireDateFin,
  getStagiaireTarif,
  getStagiaireDuree,
  getDateSignatureDossier,
  subtractBusinessDays,
  addBusinessDays,
} from "./docBuilder";
import { mentionTVA } from "./mentionsLegales";
import { parseMontant } from "./templatesCA";

/* ------------------------------------------------------------------ */
/* Regroupement des stagiaires par client                              */
/* ------------------------------------------------------------------ */

export interface ClientGroupe {
  /** Clé stable : entreprise normalisée, ou « stagiaire:<idx> » pour un particulier. */
  key: string;
  /** Nom de l'entreprise, ou prénom + nom du particulier. */
  label: string;
  /** Indices dans le tableau complet des stagiaires (ordre de saisie). */
  idxs: number[];
  /** true : client entreprise (convention tripartite) ; false : particulier (contrat). */
  entreprise: boolean;
}

/** « ACME  SAS » et « Acme sas » désignent la même entreprise. */
export function normaliserEntreprise(nom?: string | null): string {
  return String(nom || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Un client par entreprise (tous ses stagiaires réunis) et un client par
 * stagiaire sans entreprise. Seuls les stagiaires avec prénom et nom comptent.
 */
export function grouperStagiairesParClient(stagiaires: StagiaireInfo[]): ClientGroupe[] {
  const out: ClientGroupe[] = [];
  const parEntreprise = new Map<string, ClientGroupe>();
  stagiaires.forEach((s, i) => {
    if (!s?.prenom?.trim() || !s?.nom?.trim()) return;
    const cle = normaliserEntreprise(s.entreprise);
    if (!cle) {
      out.push({ key: `stagiaire:${i}`, label: `${s.prenom.trim()} ${s.nom.trim()}`, idxs: [i], entreprise: false });
      return;
    }
    const existant = parEntreprise.get(cle);
    if (existant) { existant.idxs.push(i); return; }
    const g: ClientGroupe = { key: `entreprise:${cle}`, label: s.entreprise!.trim(), idxs: [i], entreprise: true };
    parEntreprise.set(cle, g);
    out.push(g);
  });
  return out;
}

/* ------------------------------------------------------------------ */
/* Outils communs                                                      */
/* ------------------------------------------------------------------ */

const fmtEur = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

/** Première valeur renseignée parmi les stagiaires du groupe (fiche entreprise). */
const premier = (liste: StagiaireInfo[], k: keyof StagiaireInfo): string => {
  for (const s of liste) {
    const v = String(s[k] ?? "").trim();
    if (v) return v;
  }
  return "";
};

const nomComplet = (s: StagiaireInfo) => `${s.civilite ? s.civilite + " " : ""}${s.prenom} ${(s.nom || "").toUpperCase()}`.trim();

const resoudreGroupe = (stagiaires: StagiaireInfo[], idxs: number[]) =>
  idxs.map((i) => stagiaires[i]).filter((s): s is StagiaireInfo => Boolean(s));

const minDate = (dates: string[]) => dates.filter(Boolean).sort()[0] || "";
const maxDate = (dates: string[]) => dates.filter(Boolean).sort().slice(-1)[0] || "";

interface LignesMontants {
  rows: string[][];
  total: number;
  manquants: number;
}

function lignesFormation(f: FormationInfo, liste: StagiaireInfo[]): LignesMontants {
  let total = 0;
  let manquants = 0;
  const rows = liste.map((s) => {
    const montant = parseMontant(getStagiaireTarif(s, f));
    if (montant === null) manquants++;
    else total += montant;
    const debut = getStagiaireDateDebut(s, f);
    const fin = getStagiaireDateFin(s, f);
    const periode = debut && fin ? `du ${formatDate(debut)} au ${formatDate(fin)}` : "";
    const designation = `Formation « ${f.intitule} »<br><small>${nomComplet(s)}${periode ? ` — ${periode}` : ""}${getStagiaireDuree(s, f) ? ` — ${getStagiaireDuree(s, f)}` : ""}</small>`;
    const m = montant !== null ? fmtEur(montant) : "Non renseigné";
    return [designation, "1", m, m];
  });
  return { rows, total, manquants };
}

/** Totaux : exonéré → net de TVA ; assujetti → tarifs saisis TTC, TVA 20 % extraite. */
function blocTotaux(o: OrganismeInfo, total: number, manquants: number, nbLignes: number): string {
  const ligne = (label: string, val: string, fort = false) =>
    `<tr style="border:none"><td style="border:none;text-align:right;padding:4px">${fort ? `<strong>${label}</strong>` : label}</td><td style="border:none;text-align:right;width:140px;padding:4px">${fort ? `<strong>${val}</strong>` : val}</td></tr>`;
  let lignes: string;
  if (o.regimeTva === "assujetti") {
    const ht = total / 1.2;
    lignes = ligne("Total HT", fmtEur(ht)) + ligne("TVA 20 %", fmtEur(total - ht)) + ligne("Total TTC", fmtEur(total), true);
  } else {
    lignes = ligne("Total HT", fmtEur(total)) + ligne("TVA", "0,00 € (non applicable)") + ligne("Net à payer", fmtEur(total), true);
  }
  const alerte = manquants > 0
    ? `<p style="font-size:12px;color:#b45309;margin-top:6px"><strong>Total calculé sur ${nbLignes - manquants} ligne(s) sur ${nbLignes} — tarif(s) manquant(s) à compléter.</strong></p>`
    : "";
  return `<table style="width:100%;border:none;margin-top:10px">${lignes}</table>${alerte}<p style="font-size:12px;margin-top:6px">${mentionTVA(o)}</p>`;
}

function blocClient(liste: StagiaireInfo[], entreprise: boolean, titre: string): string {
  if (entreprise) {
    const nom = premier(liste, "entreprise");
    const siret = premier(liste, "siretEntreprise");
    const adresse = premier(liste, "adresseEntreprise");
    const resp = premier(liste, "responsableEntreprise");
    const email = premier(liste, "emailResponsable");
    return `<div style="border:1px solid #ccc;border-radius:6px;padding:12px;margin:0">
      <p style="margin:0 0 6px;font-weight:bold">${titre}</p>
      <p style="margin:0"><strong>${nom}</strong>${siret ? `<br>SIRET : ${siret}` : ""}${adresse ? `<br>${adresse}` : ""}${resp ? `<br>À l'attention de : ${resp}` : ""}${email ? `<br>${email}` : ""}</p>
    </div>`;
  }
  const s = liste[0];
  const adresse = [s.adresse, [s.codePostal, s.commune].filter(Boolean).join(" ")].filter((x) => x && x.trim()).join(", ");
  return `<div style="border:1px solid #ccc;border-radius:6px;padding:12px;margin:0">
    <p style="margin:0 0 6px;font-weight:bold">${titre}</p>
    <p style="margin:0"><strong>${nomComplet(s)}</strong>${adresse ? `<br>${adresse}` : ""}${s.email ? `<br>${s.email}` : ""}${s.telephone?.trim() ? `<br>${s.telephone}` : ""}</p>
  </div>`;
}

function blocFinanceur(liste: StagiaireInfo[]): string {
  const fin = [...new Set(liste.map((s) => (s.financeur || "").trim()).filter(Boolean))];
  return fin.length ? `<p><strong>Financement prévu :</strong> ${fin.join(", ")}</p>` : "";
}

/** Cachet de l'organisme : tampon, à défaut signature du dirigeant (jamais les deux). */
function cachetOF(o: OrganismeInfo): string {
  if (o.tamponUrl) return `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:90px;max-width:180px;object-fit:contain;margin-top:5px;opacity:0.9" />`;
  if (o.signatureUrl) return `<img src="${o.signatureUrl}" alt="Signature dirigeant" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px" />`;
  return `<div style="height:60px"></div>`;
}

const numero = (prefixe: string, dateISO: string, clientNo: number) =>
  `${prefixe}-${(dateISO || new Date().toISOString()).slice(0, 4)}-${String(clientNo).padStart(3, "0")}`;

/* ------------------------------------------------------------------ */
/* DEVIS                                                               */
/* ------------------------------------------------------------------ */

/**
 * Devis par client : une entreprise reçoit un seul devis pour tous ses
 * stagiaires ; un particulier reçoit son propre devis. Daté 5 jours ouvrés
 * avant la signature de la convention / du contrat.
 */
export function genDevisClient(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], idxs: number[], clientNo = 1): string {
  const liste = resoudreGroupe(stagiaires, idxs);
  if (liste.length === 0) return "";
  const entreprise = Boolean(liste[0].entreprise?.trim());
  const debut = minDate(liste.map((s) => getStagiaireDateDebut(s, f))) || f.dateDebut;
  const dateDevisISO = debut ? subtractBusinessDays(getDateSignatureDossier(debut), 5) : new Date().toISOString().slice(0, 10);
  // Acceptation : 2 jours ouvrés après le devis, au plus tard le jour de signature de la convention / du contrat.
  const signatureISO = debut ? getDateSignatureDossier(debut) : dateDevisISO;
  const acceptationISO = (() => { const a = addBusinessDays(dateDevisISO, 2); return a > signatureISO ? signatureISO : a; })();
  const validiteISO = (() => { const d = new Date(dateDevisISO); d.setDate(d.getDate() + 30); return d.toISOString().slice(0, 10); })();
  const { rows, total, manquants } = lignesFormation(f, liste);
  const signataireClient = entreprise ? (premier(liste, "responsableEntreprise") || "Le représentant de l'entreprise") : `${liste[0].prenom} ${liste[0].nom}`;
  const sigClientUrl = entreprise ? premier(liste, "signatureResponsableUrl") : (liste[0].signatureUrl || "");

  const extra = `
    ${blocTotaux(o, total, manquants, rows.length)}
    <h2>Conditions</h2>
    <p><strong>Date du devis :</strong> ${formatDate(dateDevisISO)}<br><strong>Validité :</strong> jusqu'au ${formatDate(validiteISO)} (30 jours)<br><strong>Modalité :</strong> ${f.modalites}${f.lieu ? `<br><strong>Lieu :</strong> ${f.lieu}` : ""}</p>
    ${blocFinanceur(liste)}
    <p>${entreprise
      ? "Règlement à 30 jours à réception de facture, émise après réalisation de la formation. La convention de formation est établie à l'acceptation du présent devis."
      : "Aucune somme n'est exigible avant l'expiration du délai de rétractation de 10 jours suivant la signature du contrat de formation (art. L.6353-5 et L.6353-6 du Code du travail)."}</p>
    <p style="margin-top:14px"><em>Devis à retourner daté et signé, précédé de la mention « Bon pour accord ».</em></p>
    <div style="display:flex;justify-content:space-between;margin-top:24px;gap:15px">
      <div style="flex:1;border:1px solid #ccc;border-radius:6px;padding:15px;text-align:center">
        <p style="font-weight:bold;margin-bottom:8px">Pour l'Organisme de formation</p>
        <p>${o.nom}</p><p>Nom : ${o.dirigeant}</p><p>Le ${formatDate(dateDevisISO)}</p><p>Cachet :</p>
        ${cachetOF(o)}
      </div>
      <div style="flex:1;border:1px solid #ccc;border-radius:6px;padding:15px;text-align:center">
        <p style="font-weight:bold;margin-bottom:8px">Bon pour accord — ${entreprise ? "Le Client" : "Le/La Stagiaire"}</p>
        ${entreprise ? `<p>${premier(liste, "entreprise")}</p>` : ""}<p>Nom : ${signataireClient}</p><p>Le ${formatDate(acceptationISO)}</p>
        ${sigClientUrl ? `<img src="${sigClientUrl}" alt="Signature client" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />` : `<div style="height:48px;border-bottom:1px dotted #bbb;margin-top:10px"></div>`}
      </div>
    </div>`;

  return buildDocument({
    org: o,
    title: "DEVIS DE FORMATION",
    subtitle: `N° ${numero("DEV", dateDevisISO, clientNo)} — ${formatDate(dateDevisISO)}`,
    sections: [{ heading: "Destinataire", content: blocClient(liste, entreprise, entreprise ? "Client" : "Stagiaire") }],
    table: { headers: ["Désignation", "Qté", "Prix unitaire", "Montant"], rows },
    extraHtml: extra,
  });
}

/* ------------------------------------------------------------------ */
/* FACTURE                                                             */
/* ------------------------------------------------------------------ */

/**
 * Facture par client, émise le dernier jour de formation du groupe
 * (la convention prévoit une facturation après réalisation).
 */
export function genFactureClient(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], idxs: number[], clientNo = 1): string {
  const liste = resoudreGroupe(stagiaires, idxs);
  if (liste.length === 0) return "";
  const entreprise = Boolean(liste[0].entreprise?.trim());
  const fin = maxDate(liste.map((s) => getStagiaireDateFin(s, f))) || f.dateFin;
  const dateFactureISO = fin || new Date().toISOString().slice(0, 10);
  const echeanceISO = (() => { const d = new Date(dateFactureISO); d.setDate(d.getDate() + 30); return d.toISOString().slice(0, 10); })();
  const debut = minDate(liste.map((s) => getStagiaireDateDebut(s, f))) || f.dateDebut;
  const dateDevisISO = debut ? subtractBusinessDays(getDateSignatureDossier(debut), 5) : "";
  const { rows, total, manquants } = lignesFormation(f, liste);

  const extra = `
    ${blocTotaux(o, total, manquants, rows.length)}
    <h2>Règlement</h2>
    <p><strong>Date de la facture :</strong> ${formatDate(dateFactureISO)}<br><strong>Date d'échéance :</strong> ${formatDate(echeanceISO)} (30 jours)${dateDevisISO ? `<br><strong>Référence devis :</strong> ${numero("DEV", dateDevisISO, clientNo)}` : ""}<br><strong>Mode de règlement :</strong> virement bancaire</p>
    <p style="font-size:12px">Pas d'escompte pour paiement anticipé.${entreprise
      ? " En cas de retard de paiement, pénalités au taux de trois fois le taux d'intérêt légal et indemnité forfaitaire pour frais de recouvrement de 40 € (art. L.441-10 et D.441-5 du Code de commerce)."
      : " En cas de retard de paiement, pénalités au taux de trois fois le taux d'intérêt légal."}</p>
    <div style="display:flex;justify-content:flex-end;margin-top:24px">
      <div style="width:45%;border:1px solid #ccc;border-radius:6px;padding:15px;text-align:center">
        <p style="font-weight:bold;margin-bottom:8px">Pour l'Organisme de formation</p>
        <p>${o.nom}</p><p>Nom : ${o.dirigeant}</p><p>Le ${formatDate(dateFactureISO)}</p><p>Cachet :</p>
        ${cachetOF(o)}
      </div>
    </div>`;

  return buildDocument({
    org: o,
    title: "FACTURE",
    subtitle: `N° ${numero("FAC", dateFactureISO, clientNo)} — ${formatDate(dateFactureISO)}`,
    sections: [{ heading: "Facturé à", content: blocClient(liste, entreprise, entreprise ? "Client" : "Stagiaire") }],
    table: { headers: ["Désignation", "Qté", "Prix unitaire", "Montant"], rows },
    extraHtml: extra,
  });
}
