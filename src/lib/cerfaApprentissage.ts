/**
 * Génération PDF CERFA 10103*14 (Contrat d'apprentissage)
 * Remplit les champs essentiels du PDF officiel via pdf-lib AcroForm.
 *
 * Mapping établi à partir des coordonnées des widgets (cf. inspection PDF) :
 * - Page 1 : Employeur, Apprenti, Maître d'apprentissage
 * - Page 2 : Contrat, Rémunération, Formation, Signature
 *
 * Les champs non essentiels (RQTH, dérogations, retraite, etc.) restent vides.
 */
import { PDFDocument, PDFTextField, PDFCheckBox, PDFImage } from "pdf-lib";
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";

/** Embed une image (data URL ou URL) dans le PDF, retourne null si échec */
async function embedImage(pdf: PDFDocument, src: string | undefined): Promise<PDFImage | null> {
  if (!src) return null;
  try {
    let bytes: ArrayBuffer;
    let mime = "";
    if (src.startsWith("data:")) {
      const m = src.match(/^data:([^;]+);base64,(.+)$/);
      if (!m) return null;
      mime = m[1];
      const bin = atob(m[2]);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      bytes = arr.buffer;
    } else {
      const r = await fetch(src);
      if (!r.ok) return null;
      mime = r.headers.get("content-type") || "";
      bytes = await r.arrayBuffer();
    }
    if (mime.includes("png") || src.toLowerCase().includes(".png")) {
      return await pdf.embedPng(bytes);
    }
    return await pdf.embedJpg(bytes);
  } catch {
    return null;
  }
}

/** Dessine une image dans une zone donnée (bottom-left origin, comme pdf-lib & coords JSON), conserve le ratio */
function drawFitted(
  page: ReturnType<PDFDocument["getPage"]>,
  img: PDFImage,
  x: number,
  yBottom: number,
  maxW: number,
  maxH: number,
) {
  const ratio = img.width / img.height;
  let w = maxW;
  let h = w / ratio;
  if (h > maxH) {
    h = maxH;
    w = h * ratio;
  }
  // Coords JSON et pdf-lib utilisent le même système bottom-up
  page.drawImage(img, { x, y: yBottom, width: w, height: h });
}

/** Calcule l'âge à une date donnée (string YYYY-MM-DD) */
function ageAt(birthIso: string | undefined, refIso: string | undefined): number | null {
  if (!birthIso || !refIso) return null;
  const b = new Date(birthIso);
  const r = new Date(refIso);
  if (isNaN(b.getTime()) || isNaN(r.getTime())) return null;
  let age = r.getFullYear() - b.getFullYear();
  const m = r.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && r.getDate() < b.getDate())) age--;
  return age;
}

/**
 * Barème légal (art. D6222-26 C. trav.) : % du SMIC selon la tranche d'âge et l'année d'exécution du contrat.
 * La 4e année éventuelle reprend le taux de 3e année. À partir de 21 ans, le salaire minimum conventionnel
 * (SMC) s'applique s'il est plus favorable : l'employeur le précise dans les données du contrat.
 */
const BAREME: [number, [number, number, number]][] = [
  [18, [27, 39, 55]],
  [21, [43, 51, 67]],
  [26, [53, 61, 78]],
  [Infinity, [100, 100, 100]],
];
export function tauxApprenti(age: number, annee: number): number {
  const ligne = BAREME.find(([max]) => age < max)![1];
  return ligne[Math.min(Math.max(annee, 1), 3) - 1];
}

/** Dates ISO (AAAA-MM-JJ) manipulées en UTC pour éviter tout décalage de fuseau. */
const isoUtc = (iso: string) => { const [y, m, d] = iso.slice(0, 10).split("-").map(Number); return Date.UTC(y, m - 1, d); };
const versIso = (t: number) => new Date(t).toISOString().slice(0, 10);
const plusJours = (iso: string, n: number) => versIso(isoUtc(iso) + n * 86400000);
const plusAns = (iso: string, n: number) => {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const t = new Date(Date.UTC(y + n, m - 1, d));
  if (t.getUTCMonth() !== m - 1) t.setUTCDate(0); // 29 février → 28 février
  return versIso(t.getTime());
};

export type PeriodeRemuneration = { debut: string; fin: string; taux: number; age: number };
/**
 * Grille de rémunération du contrat : une ligne par année d'exécution (4 au plus), chacune découpée en
 * deux périodes au plus quand l'apprenti change de tranche d'âge (18, 21 ou 26 ans) en cours d'année.
 * Le nouveau taux s'applique le 1er jour du mois qui suit l'anniversaire.
 */
export function grilleRemuneration(naissance: string, debut: string, fin: string): PeriodeRemuneration[][] {
  if (!/^\d{4}-\d{2}-\d{2}/.test(naissance) || !/^\d{4}-\d{2}-\d{2}/.test(debut) || !/^\d{4}-\d{2}-\d{2}/.test(fin)) return [];
  if (isoUtc(fin) < isoUtc(debut)) return [];
  const changements = [18, 21, 26].map((a) => {
    const [y, m] = plusAns(naissance, a).split("-").map(Number);
    return versIso(Date.UTC(y, m, 1)); // 1er jour du mois suivant l'anniversaire
  });
  const grille: PeriodeRemuneration[][] = [];
  for (let k = 0; k < 4; k++) {
    const d = plusAns(debut, k);
    if (isoUtc(d) > isoUtc(fin)) break;
    const finAnnee = plusJours(plusAns(debut, k + 1), -1);
    const f = isoUtc(finAnnee) < isoUtc(fin) ? finAnnee : fin;
    const coupure = changements.find((c) => isoUtc(c) > isoUtc(d) && isoUtc(c) <= isoUtc(f));
    const bornes = coupure ? [[d, plusJours(coupure, -1)], [coupure, f]] : [[d, f]];
    grille.push(bornes.map(([du, au]) => {
      const age = ageAt(naissance, du) ?? 0;
      return { debut: du, fin: au, taux: tauxApprenti(age, k + 1), age };
    }));
  }
  return grille;
}

const TEMPLATE_URL = "/pdfs/cerfa/cerfa_10103-14.pdf";

/** Découpe une date ISO YYYY-MM-DD en [JJ, MM, AAAA] */
function splitDate(iso: string | undefined): [string, string, string] {
  if (!iso) return ["", "", ""];
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) {
    const ym = iso.match(/^(\d{4})-(\d{2})$/); // mois/année seuls (annuaire public) : jour laissé vide
    return ym ? ["", ym[2], ym[1]] : ["", "", ""];
  }
  return [m[3], m[2], m[1]];
}

/** Découpe une adresse "12 RUE DES LILAS" en numéro / voie (gère "7-15", "12bis") */
function splitAdresse(adresse: string | undefined): { numero: string; voie: string } {
  if (!adresse) return { numero: "", voie: "" };
  // On retire d'abord un éventuel ", 93290 VILLE" en fin de chaîne (CP+ville parasites)
  const cleaned = adresse.trim().replace(/[,;]\s*\d{5}\b.*$/, "").trim();
  const m = cleaned.match(/^(\d+(?:\s*[-/]\s*\d+)?\s*(?:bis|ter|quater)?)\s+(.+)$/i);
  if (m) return { numero: m[1].replace(/\s+/g, ""), voie: m[2].trim() };
  return { numero: "", voie: cleaned };
}

/** Extrait CP + Ville depuis une adresse complète "76 AVENUE X, 93290 TREMBLAY" */
function splitCpVille(adresse: string | undefined): { cp: string; ville: string } {
  if (!adresse) return { cp: "", ville: "" };
  const m = adresse.match(/(\d{5})\s+([A-ZÀ-ÿ' -]+)\s*$/i);
  if (m) return { cp: m[1], ville: m[2].trim() };
  return { cp: "", ville: "" };
}

/** Setter sécurisé : ignore les champs absents */
function setText(form: ReturnType<PDFDocument["getForm"]>, name: string, value: string) {
  try {
    const f = form.getField(name);
    if (f instanceof PDFTextField) f.setText(value || "");
  } catch { /* champ absent */ }
}
function setCheck(form: ReturnType<PDFDocument["getForm"]>, name: string, checked: boolean) {
  try {
    const f = form.getField(name);
    if (f instanceof PDFCheckBox) checked ? f.check() : f.uncheck();
  } catch { /* champ absent */ }
}

/** Nettoie les caractères non WinAnsi (problème pdf-lib avec accents non std) */
function clean(s: string | undefined | null): string {
  if (!s) return "";
  return String(s)
    .replace(/[\u2018\u2019\u02BC]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2013|\u2014/g, "-")
    .replace(/\u00A0/g, " ");
}

/**
 * SMIC mensuel brut (35 h, 151,67 h) par date d'entrée en vigueur — à compléter à chaque revalorisation.
 * 1er janvier 2026 : 12,02 €/h (décret du 17/12/2025) ; 1er juin 2026 : 12,31 €/h (revalorisation
 * automatique de 2,41 %, arrêté du 22/05/2026).
 */
export const SMIC_BRUT_MENSUEL: { depuis: string; horaire: number; mensuel: number }[] = [
  { depuis: "2024-11-01", horaire: 11.88, mensuel: 1801.80 },
  { depuis: "2026-01-01", horaire: 12.02, mensuel: 1823.03 },
  { depuis: "2026-06-01", horaire: 12.31, mensuel: 1867.02 },
];
/** SMIC mensuel brut en vigueur à une date (AAAA-MM-JJ) ; le plus récent si la date est absente. */
export function smicMensuelAu(iso?: string): number {
  const ok = iso && /^\d{4}-\d{2}-\d{2}/.test(iso) ? iso.slice(0, 10) : "9999-12-31";
  return [...SMIC_BRUT_MENSUEL].reverse().find((v) => v.depuis <= ok)?.mensuel ?? SMIC_BRUT_MENSUEL[0].mensuel;
}
/** Valeur la plus récente (compatibilité). */
export const SMIC_BRUT_MENSUEL_REFERENCE = {
  montant: SMIC_BRUT_MENSUEL[SMIC_BRUT_MENSUEL.length - 1].mensuel,
  enVigueurDepuis: SMIC_BRUT_MENSUEL[SMIC_BRUT_MENSUEL.length - 1].depuis,
};

/** Champs de la grille de rémunération : [du J, M, A, au J, M, A, %, base] × 2 périodes, pour les 4 années. */
const GRILLE_CHAMPS: [string[], string[]][] = [
  [["21_81", "21_82", "21_83", "21_84", "21_85", "21_86", "8_95", "8_96"], ["21_87", "21_88", "21_89", "21_90", "21_91", "21_92", "8_97", "8_98"]],
  [["21_37", "21_38", "21_39", "21_40", "21_41", "21_42", "8_56", "8_57"], ["21_43", "21_44", "21_45", "21_46", "21_47", "21_48", "8_58", "8_59"]],
  [["21_49", "21_50", "21_51", "21_52", "21_53", "21_54", "8_60", "8_61"], ["21_55", "21_56", "21_57", "21_58", "21_59", "21_60", "8_62", "8_63"]],
  [["21_61", "21_62", "21_63", "21_64", "21_65", "21_66", "8_64", "8_65"], ["21_67", "21_68", "21_69", "21_70", "21_71", "21_72", "8_66", "8_67"]],
].map((ligne) => ligne.map((p) => p.map((n) => `Zone de texte ${n}`))) as [string[], string[]][];
const CHAMPS_GRILLE = new Set(GRILLE_CHAMPS.flat(2));
const CHAMPS_SALAIRE = new Set(["Zone de texte 8_72", "Zone de texte 21_73"]);

/** Date AAAA-MM-JJ lue dans trois cases JJ / MM / AAAA des champs transmis. */
function dateChamps(c: Record<string, string | boolean>, j: string, m: string, a: string): string {
  const v = (n: string) => String(c[`Zone de texte ${n}`] ?? "").trim();
  const [d, mo, y] = [v(j), v(m), v(a)];
  return /^\d{1,2}$/.test(d) && /^\d{1,2}$/.test(mo) && /^\d{4}$/.test(y) ? `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}` : "";
}
const nombre = (v: unknown) => { const n = Number(String(v ?? "").replace(/\s/g, "").replace(",", ".")); return isFinite(n) ? n : 0; };

/** Code nationalité CERFA (1 française, 2 UE, 3 hors UE) à partir d'un code ou d'un libellé. */
const UE = /allemand|autrichien|belge|bulgare|chypriote|croate|danois|espagnol|estonien|finlandais|grec|hongrois|irlandais|italien|letton|lituanien|luxembourgeois|maltais|neerlandais|polonais|portugais|roumain|slovaque|slovene|suedois|tcheque/;
function codeNationalite(v: string | undefined): string {
  const n = (v || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  if (!n || /^[123]$/.test(n)) return n;
  return /franc/.test(n) ? "1" : UE.test(n) ? "2" : "3";
}

/** Codes diplôme officiels (8 caractères) connus et vérifiés, par RNCP ou intitulé. */
const CODES_DIPLOME_OFFICIELS: { re: RegExp; rncp?: string; code: string }[] = [
  { re: /\bntc\b|negociateur technico/, code: "36T31203" },
];
export function codeDiplomeOfficiel(intitule?: string, rncp?: string): string {
  const t = (intitule || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const r = (rncp || "").toUpperCase().replace(/\s/g, "");
  const hit = CODES_DIPLOME_OFFICIELS.find((c) => (c.rncp && r.includes(c.rncp)) || c.re.test(t));
  return hit?.code || "";
}

/** Code « Diplôme ou titre visé » (nomenclature CERFA) déduit de l'intitulé ; vide si inconnu. */
export function codeDiplomeVise(intitule: string | undefined): string {
  const t = (intitule || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (!t) return "";
  if (/\bmaster\b|\bmba\b/.test(t)) return "73";
  if (/ingenieur/.test(t)) return "74";
  if (/licence pro/.test(t)) return "63";
  if (/\bbut\b|bachelor universitaire/.test(t)) return "64";
  if (/\blicence\b/.test(t)) return "62";
  if (/\bbts\b/.test(t)) return "54";
  if (/\bdut\b/.test(t)) return "55";
  if (/bac pro|baccalaureat pro/.test(t)) return "41";
  if (/brevet professionnel|\bbp\b/.test(t)) return "42";
  if (/\bcap\b/.test(t)) return "33";
  if (/\bbep\b/.test(t)) return "34";
  // Titres professionnels courants (niveau officiel France Compétences)
  if (/\bntc\b|negociateur technico|gestionnaire (de paie|comptable|des operations de transport)|assistant de direction|responsable de petite|developpeur web|technicien superieur|\bcip\b|conseiller en insertion|manager d'unite marchande|exploitant en transport|\bmum\b/.test(t)) return "58";
  if (/conseiller de vente|employe commercial|assistant de vie|agent de restauration|secretaire assistant|vendeur conseil/.test(t)) return /secretaire assistant|vendeur conseil|conseiller de vente/.test(t) ? "49" : "38";
  const n = t.match(/niveau\s*([3-8])|bac\s*\+\s*([0-5])/);
  if (n) {
    const niv = n[1] ? Number(n[1]) : Number(n[2]) + 4;
    return niv >= 7 ? "79" : niv === 6 ? "69" : niv === 5 ? "58" : niv === 4 ? "49" : "38";
  }
  return "";
}

export async function genCerfaApprentissagePdf(
  o: OrganismeInfo,
  f: FormationInfo,
  s: StagiaireInfo,
  extra: { uai?: string } = {},
): Promise<Blob> {
  const res = await fetch(TEMPLATE_URL);
  if (!res.ok) throw new Error(`Template CERFA introuvable (${res.status})`);
  const bytes = await res.arrayBuffer();
  const pdf = await PDFDocument.load(bytes);
  const form = pdf.getForm();
  const champs = s.cerfaChamps || {};

  // ---------- PAGE 1 — EMPLOYEUR ----------
  // Employeur privé coché par défaut
  setCheck(form, "Case #C3#A0 cocher 1", !s.cerfa?.employeurPublic); // privé
  setCheck(form, "Case #C3#A0 cocher 2", !!s.cerfa?.employeurPublic); // public

  // Données entreprise du stagiaire
  const ent = clean(s.entreprise);
  const siretEnt = clean(s.siretEntreprise);
  const adrEnt = splitAdresse(s.adresseEntreprise);
  const cpvEnt = splitCpVille(s.adresseEntreprise);
  // Coordonnées de l'EMPLOYEUR (jamais celles du CFA) : courriel du responsable si saisi.
  const cx = s.cerfa || {};
  const telEnt = clean(cx.telephoneEmployeur);
  const courrielEnt = clean(s.emailResponsable);

  setText(form, "Zone de texte 8", ent); // Nom/dénomination employeur
  setText(form, "Zone de texte 8_2", siretEnt); // N° SIRET
  setText(form, "Zone de texte 8_3", clean(cx.typeEmployeur)); // Type d'employeur : code de la nomenclature CERFA, à renseigner par l'employeur
  setText(form, "Zone de texte 8_14", adrEnt.numero); // N° adresse
  setText(form, "Zone de texte 8_13", adrEnt.voie); // Voie
  setText(form, "Zone de texte 8_4", clean(cx.employeurSpecifique)); // Employeur spécifique
  setText(form, "Zone de texte 8_8", clean(cx.complementAdresseEmployeur)); // Complément
  setText(form, "Zone de texte 8_7", clean(cx.codeApe)); // Code APE
  setText(form, "Zone de texte 8_9", cpvEnt.cp); // Code postal entreprise
  setText(form, "Zone de texte 8_10", cpvEnt.ville); // Commune entreprise
  setText(form, "Zone de texte 8_5", clean(cx.effectif)); // Effectif total
  setText(form, "Zone de texte 8_11", telEnt); // Téléphone entreprise
  setText(form, "Zone de texte 8_12", courrielEnt); // Courriel entreprise
  setText(form, "Zone de texte 8_6", clean(cx.idcc)); // Code IDCC

  // ---------- PAGE 1 — APPRENTI ----------
  setText(form, "Zone de texte 8_15", clean(cx.nomNaissance || s.nom)); // Nom de naissance
  setText(form, "Zone de texte 8_16", clean(s.nom)); // Nom d'usage
  setText(form, "Zone de texte 8_17", clean(s.prenom)); // Premier prénom

  // Date de naissance (3 zones)
  const [dnJ, dnM, dnA] = splitDate(s.dateNaissance);
  setText(form, "Zone de texte 21_7", dnJ);
  setText(form, "Zone de texte 21_8", dnM);
  setText(form, "Zone de texte 21_9", dnA);

  // Sexe
  const civ = (s.civilite || "").toUpperCase();
  const nir = clean(s.nir).replace(/\s/g, "");
  const isM = civ ? civ.startsWith("M.") || civ === "M" : nir.startsWith("1");
  setCheck(form, "Case #C3#A0 cocher 3", isM); // M
  setCheck(form, "Case #C3#A0 cocher 4", !isM); // F

  setText(form, "Zone de texte 8_18", nir); // NIR
  // Département de naissance : saisi, sinon déduit du NIR (99 = né à l'étranger)
  const deptNir = /^[12]\d{4}(97|98)\d/.test(nir) ? nir.slice(5, 8) : /^[12]\d{4}(\d{2}|2A|2B)/i.test(nir) ? nir.slice(5, 7).toUpperCase() : "";
  setText(form, "Zone de texte 8_26", clean(s.departementNaissance) || deptNir); // Département naissance

  // Adresse apprenti
  const adrAp = splitAdresse(s.adresse);
  setText(form, "Zone de texte 8_19", adrAp.numero);
  setText(form, "Zone de texte 8_20", adrAp.voie);
  setText(form, "Zone de texte 8_27", clean(s.communeNaissance)); // Commune de naissance
  setText(form, "Zone de texte 8_21", clean(cx.complementAdresse)); // Complément adresse apprenti
  setText(form, "Zone de texte 8_33", codeNationalite(clean(s.nationalite))); // Nationalité (1, 2 ou 3)
  setText(form, "Zone de texte 8_34", clean(cx.regimeSocial)); // Régime social
  const cpvAp = splitCpVille(s.adresse);
  setText(form, "Zone de texte 8_22", clean(s.codePostal) || cpvAp.cp); // Code postal apprenti
  setText(form, "Zone de texte 8_23", clean(s.commune) || cpvAp.ville); // Commune apprenti
  setText(form, "Zone de texte 8_24", clean(s.telephone)); // Téléphone apprenti
  setText(form, "Zone de texte 8_25", clean(s.email)); // Courriel apprenti

  // Sportif haut niveau = Non ; RQTH = valeur saisie pour l'apprenti
  const rqth = (s.rqth || "").toLowerCase() === "oui";
  setCheck(form, "Case #C3#A0 cocher 5", cx.sportifHautNiveau === true); // sportif Oui
  setCheck(form, "Case #C3#A0 cocher 5_2", cx.sportifHautNiveau !== true); // sportif Non
  setCheck(form, "Case #C3#A0 cocher 5_3", rqth); // RQTH Oui
  setCheck(form, "Case #C3#A0 cocher 5_4", !rqth); // RQTH Non
  setCheck(form, "Case #C3#A0 cocher 5_5", false); // Équivalence jeunes RQTH Oui
  setCheck(form, "Case #C3#A0 cocher 5_6", true); // Équivalence jeunes RQTH Non
  setCheck(form, "Case #C3#A0 cocher 5_7", false); // Extension BOE Oui
  setCheck(form, "Case #C3#A0 cocher 5_8", true); // Extension BOE Non
  setCheck(form, "Case #C3#A0 cocher 5_9", false); // Projet création/reprise Oui
  setCheck(form, "Case #C3#A0 cocher 5_10", true); // Projet création/reprise Non

  // Représentant légal : obligatoire pour un apprenti mineur, laissé vide si majeur
  // (aucune donnée du représentant n'est saisie dans le dossier : à compléter à la main).
  setText(form, "Zone de texte 8_35", clean(cx.representantLegal?.nom)); // Nom prénom rep légal
  setText(form, "Zone de texte 8_37", clean(cx.representantLegal?.numero)); // N° rep
  setText(form, "Zone de texte 8_36", clean(cx.representantLegal?.voie)); // Voie rep
  setText(form, "Zone de texte 8_38", clean(cx.representantLegal?.complement)); // Complément rep
  setText(form, "Zone de texte 8_39", clean(cx.representantLegal?.codePostal)); // CP rep
  setText(form, "Zone de texte 8_40", clean(cx.representantLegal?.commune)); // Commune rep
  setText(form, "Zone de texte 8_41", clean(cx.representantLegal?.email)); // Courriel rep

  // Diplôme dernier préparé / obtenu
  setText(form, "Zone de texte 8_28", clean(cx.situationAvant)); // Situation avant
  setText(form, "Zone de texte 8_29", clean(cx.dernierDiplomePrepare)); // Dernier diplôme préparé
  setText(form, "Zone de texte 8_30", clean(cx.derniereClasse)); // Dernière classe
  setText(form, "Zone de texte 8_31", clean(s.diplome)); // Intitulé précis dernier diplôme
  setText(form, "Zone de texte 8_32", clean(cx.diplomePlusEleve)); // Diplôme le plus élevé obtenu

  // ---------- PAGE 1 — MAÎTRE D'APPRENTISSAGE ----------
  // Maître n°1 = responsable de l'entreprise du stagiaire
  const respParts = clean(s.responsableEntreprise).split(/\s+/);
  const respNom = respParts.length > 1 ? respParts.slice(1).join(" ") : clean(s.responsableEntreprise);
  const respPrenom = respParts.length > 1 ? respParts[0] : "";

  setText(form, "Zone de texte 8_42", respNom); // Nom maître 1
  setText(form, "Zone de texte 8_43", respPrenom); // Prénom maître 1
  const [mnJ, mnM, mnA] = splitDate(s.dateNaissanceResponsable);
  setText(form, "Zone de texte 21_4", mnJ); // Date naissance maître 1 J
  setText(form, "Zone de texte 21_5", mnM);
  setText(form, "Zone de texte 21_6", mnA);
  setText(form, "Zone de texte 8_44", clean(s.emailResponsable)); // Courriel maître 1
  setText(form, "Zone de texte 8_45", clean(cx.maitreEmploi)); // Emploi occupé par le maître d'apprentissage (distinct du poste de l'apprenti)

  // Maître n°2 — vide
  setText(form, "Zone de texte 8_46", clean(cx.maitre2?.nom));
  setText(form, "Zone de texte 8_47", clean(cx.maitre2?.prenom));
  setText(form, "Zone de texte 8_48", clean(cx.maitre2?.dateNaissance));
  setText(form, "Zone de texte 8_49", clean(cx.maitre2?.email));

  // Attestation maître apprentissage
  setCheck(form, "Case #C3#A0 cocher 6", true);

  // ---------- PAGE 2 — CONTRAT ----------
  // Type de contrat (11 = contrat d'apprentissage initial par défaut)
  setText(form, "Zone de texte 8_71", clean(cx.typeContrat) || "11");

  // Date de conclusion = 7 jours avant le début d'exécution du contrat de l'apprenti
  const dateDebut = s.dateDebutFormation || f.dateDebut;
  const dateFin = s.dateFinFormation || f.dateFin;
  const dateConclusion = cx.dateConclusion || (dateDebut ? (() => {
    const d = new Date(dateDebut);
    d.setDate(d.getDate() - 7);
    return d.toISOString().slice(0, 10);
  })() : "");

  const [ccJ, ccM, ccA] = splitDate(dateConclusion);
  setText(form, "Zone de texte 21_16", ccJ);
  setText(form, "Zone de texte 21_17", ccM);
  setText(form, "Zone de texte 21_18", ccA);

  const [ddJ, ddM, ddA] = splitDate(dateDebut);
  setText(form, "Zone de texte 21_19", ddJ);
  setText(form, "Zone de texte 21_20", ddM);
  setText(form, "Zone de texte 21_21", ddA);

  const [exJ, exM, exA] = cx.dateDebutExecution ? splitDate(cx.dateDebutExecution) : [ddJ, ddM, ddA];
  setText(form, "Zone de texte 21_22", exJ);
  setText(form, "Zone de texte 21_23", exM);
  setText(form, "Zone de texte 21_24", exA);

  // Date fin contrat
  const [dfJ, dfM, dfA] = splitDate(dateFin);
  setText(form, "Zone de texte 21_10", dfJ);
  setText(form, "Zone de texte 21_11", dfM);
  setText(form, "Zone de texte 21_12", dfA);

  // Durée hebdo : 35h
  setText(form, "Zone de texte 8_68", clean(cx.dureeHebdoHeures) || "35");
  setText(form, "Zone de texte 8_69", clean(cx.dureeHebdoMinutes) || "00");

  // Travail machines dangereuses : Non
  setCheck(form, "Case #C3#A0 cocher 5_13", cx.machinesDangereuses === true); // Oui
  setCheck(form, "Case #C3#A0 cocher 5_14", cx.machinesDangereuses !== true); // Non

  // ---------- PAGE 2 — FORMATION ----------
  setCheck(form, "Case #C3#A0 cocher 5_11", false); // CFA entreprise Oui
  setCheck(form, "Case #C3#A0 cocher 5_12", true); // CFA entreprise Non

  // Diplôme/titre visé
  // Nomenclature du diplôme/titre (ex. 58), distincte du RNCP en 8_76.
  // La valeur contractuelle IZILearn est appliquée ci-dessous si elle est fournie.
  setText(form, "Zone de texte 8_77", clean(cx.codeDiplome) || codeDiplomeVise(f.intitule)); // Diplôme ou titre visé
  setText(form, "Zone de texte 8_99", clean(o.nom)); // Dénomination CFA responsable
  setText(form, "Zone de texte 8_100", clean(f.intitule)); // Intitulé précis
  setText(form, "Zone de texte 8_73", clean(extra.uai)); // N° UAI
  setText(form, "Zone de texte 8_75", clean(cx.codeDiplomeEN) || codeDiplomeOfficiel(f.intitule, f.codeRNCP)); // Code du diplôme (8 caractères, jamais déduit)
  setText(form, "Zone de texte 8_74", clean(o.siret)); // N° SIRET CFA
  setText(form, "Zone de texte 8_76", clean(f.codeRNCP || "")); // Code RNCP

  // Adresse CFA
  const adrOrg = splitAdresse(o.adresse);
  setText(form, "Zone de texte 8_79", adrOrg.numero);
  setText(form, "Zone de texte 8_80", adrOrg.voie);
  setText(form, "Zone de texte 8_81", ""); // Complément
  setText(form, "Zone de texte 8_82", clean(o.codePostal));
  setText(form, "Zone de texte 8_78", clean(o.ville));

  // Date début formation CFA = date début formation
  setText(form, "Zone de texte 21_25", ddJ);
  setText(form, "Zone de texte 21_26", ddM);
  setText(form, "Zone de texte 21_27", ddA);

  // Date fin épreuves = date fin formation
  setText(form, "Zone de texte 21_28", dfJ);
  setText(form, "Zone de texte 21_29", dfM);
  setText(form, "Zone de texte 21_30", dfA);

  // CFA = lieu de formation principal
  setCheck(form, "Case #C3#A0 cocher 7", true);

  // Durée formation
  const dureeMatch = (f.duree || "").match(/(\d+)/);
  const dureeHeures = dureeMatch ? dureeMatch[1] : "";
  setText(form, "Zone de texte 21_80", dureeHeures);
  // dont heures de formation à distance : total si distanciel, 0 si présentiel
  const modalites = (f.modalites || "").toLowerCase();
  const estDistanciel = /distanc|e-?learning|foad|en ligne|visio/.test(modalites);
  setText(form, "Zone de texte 8_102", clean(cx.heuresDistance) || (estDistanciel ? dureeHeures || "0" : "0"));


  // Attestation pièces justificatives
  setCheck(form, "Case #C3#A0 cocher 8", true);

  // Numéro contrat précédent (vide pour un nouveau contrat type 11)
  setText(form, "Zone de texte 8_55", clean(cx.numeroContratPrecedent));
  // Fait à (champ correct = 8_90)
  setText(form, "Zone de texte 8_90", clean(cx.lieuSignature || o.ville));

  // ---------- RÉMUNÉRATION ----------
  // Grille légale calculée sur les dates du contrat (celles transmises en priorité) et l'âge de l'apprenti :
  // 4 années au plus, 2 périodes par année quand l'apprenti change de tranche d'âge.
  const naissance = dateChamps(champs, "21_7", "21_8", "21_9") || s.dateNaissance || "";
  const debutContrat = dateChamps(champs, "21_19", "21_20", "21_21") || cx.dateDebutExecution || dateDebut || "";
  const finContrat = dateChamps(champs, "21_10", "21_11", "21_12") || dateFin || "";
  const grille = naissance ? grilleRemuneration(naissance, debutContrat, finContrat) : [];
  if (!grille.length && debutContrat && finContrat) {
    // date de naissance inconnue : 1 seule période, taux d'un apprenti de 18 à 20 ans (à vérifier)
    grille.push([{ debut: debutContrat, fin: finContrat, taux: tauxApprenti(20, 1), age: 20 }]);
  }
  GRILLE_CHAMPS.forEach((ligne, i) => ligne.forEach((noms, j) => {
    const per = grille[i]?.[j];
    // un taux contractuel supérieur au minimum légal (ou basé sur le SMC) est conservé
    const tauxContrat = nombre(champs[noms[6]]);
    const baseContrat = String(champs[noms[7]] ?? "").trim();
    const [dJ, dM, dA] = splitDate(per?.debut);
    const [fJ, fM, fA] = splitDate(per?.fin);
    const valeurs = per
      ? [dJ, dM, dA, fJ, fM, fA, String(Math.max(per.taux, tauxContrat)), baseContrat || "SMIC"]
      : ["", "", "", "", "", "", "", ""];
    noms.forEach((n, k) => setText(form, n, valeurs[k]));
  }));

  // Salaire brut mensuel à l'embauche = % de la 1re période × SMIC en vigueur au début du contrat
  // (ou le salaire convenu s'il est plus élevé).
  const premiere = grille[0]?.[0];
  const tauxEmbauche = premiere ? Math.max(premiere.taux, nombre(champs["Zone de texte 8_95"])) : 0;
  const salaireLegal = Math.round(smicMensuelAu(debutContrat) * tauxEmbauche) / 100;
  const salaireContrat = Math.max(
    nombre(cx.salaireBrutMensuel),
    nombre(champs["Zone de texte 8_72"]) + nombre(champs["Zone de texte 21_73"]) / 100,
  );
  const salaire = Math.max(salaireLegal, salaireContrat);
  const [montantEuros, montantCents] = salaire > 0 ? salaire.toFixed(2).split(".") : ["", ""];
  setText(form, "Zone de texte 8_72", montantEuros);
  setText(form, "Zone de texte 21_73", montantCents);

  // ---------- CADRE RÉSERVÉ ORGANISME EN CHARGE DU DÉPÔT (bas page 2) ----------
  // Toujours laissé VIDE : rempli par l'organisme dépositaire (OPCO).
  setText(form, "Zone de texte 8_91", "");
  setText(form, "Zone de texte 8_92", "");
  setText(form, "Zone de texte 8_93", "");
  setText(form, "Zone de texte 8_94", "");

  // Les champs exacts du contrat priment sur tous les préremplissages,
  // sauf le cadre réservé à l'OPCO, qui ne peut jamais être renseigné ici.
  // La grille de rémunération et le salaire, déjà calculés au minimum légal (en tenant compte des
  // valeurs du contrat), ne sont pas réécrits.
  for (const [nom, valeur] of Object.entries(champs)) {
    if (/^Zone de texte (?:8_(?:91|92|93|94)|21_(?:31|32|33|34|35|36))$/.test(nom)) continue;
    if (CHAMPS_GRILLE.has(nom) || CHAMPS_SALAIRE.has(nom)) continue;
    if (typeof valeur === "string") setText(form, nom, clean(valeur));
    else if (typeof valeur === "boolean") setCheck(form, nom, valeur);
  }

  pdf.getForm().updateFieldAppearances();

  // ---------- SIGNATURES & TAMPON (page 2) ----------
  // Coords bottom-up. Labels "Signature de l'employeur / apprenti / représentant légal" ≈ y=175.
  // Champ "Fait à" 8_90 ≈ y=197. → On dessine les signatures SOUS les labels, entre y=110 et y=160.
  // Tampon CFA : zone "Visa du CFA" colonne gauche, sous l'adresse CFA (entre y=270 et y=395).
  const page2 = pdf.getPages()[1];
  if (page2) {
    const [tamponImg, sigStagImg, sigRespImg] = await Promise.all([
      embedImage(pdf, o.tamponUrl),
      embedImage(pdf, s.signatureUrl),
      embedImage(pdf, s.signatureResponsableUrl), // jamais la signature du CFA à la place de l'employeur
    ]);
    // Signature employeur (gauche, sous "Signature de l'employeur") — uniquement la signature de l'employeur
    if (sigRespImg) drawFitted(page2, sigRespImg, 30, 110, 150, 55);
    // Signature apprenti (centre, sous "Signature de l'apprenti(e)")
    if (sigStagImg) drawFitted(page2, sigStagImg, 220, 110, 150, 55);
    // Signature représentant légal de l'apprenti(e) mineur(e) : volontairement laissée vide
    // Tampon organisme dans la zone "Visa du CFA (cachet et signature du directeur)" (colonne gauche FORMATION)
    if (tamponImg) drawFitted(page2, tamponImg, 30, 290, 130, 90);
  }

  const out = await pdf.save();
  const ab = out.buffer.slice(out.byteOffset, out.byteOffset + out.byteLength) as ArrayBuffer;
  return new Blob([ab], { type: "application/pdf" });
}
