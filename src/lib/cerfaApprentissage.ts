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

/** Tarif (% du SMIC) selon l'âge de l'apprenti — barème légal 2024 */
function tarifApprenti(age: number): { y1: number; y2: number } {
  if (age < 18) return { y1: 27, y2: 39 };
  if (age < 21) return { y1: 43, y2: 51 };
  if (age < 26) return { y1: 53, y2: 61 };
  return { y1: 100, y2: 100 }; // 26+ : 100% SMIC
}

const TEMPLATE_URL = "/pdfs/cerfa/cerfa_10103-14.pdf";

/** Découpe une date ISO YYYY-MM-DD en [JJ, MM, AAAA] */
function splitDate(iso: string | undefined): [string, string, string] {
  if (!iso) return ["", "", ""];
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return ["", "", ""];
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

export async function genCerfaApprentissagePdf(
  o: OrganismeInfo,
  f: FormationInfo,
  s: StagiaireInfo,
): Promise<Blob> {
  const res = await fetch(TEMPLATE_URL);
  if (!res.ok) throw new Error(`Template CERFA introuvable (${res.status})`);
  const bytes = await res.arrayBuffer();
  const pdf = await PDFDocument.load(bytes);
  const form = pdf.getForm();

  // ---------- PAGE 1 — EMPLOYEUR ----------
  // Employeur privé coché par défaut
  setCheck(form, "Case #C3#A0 cocher 1", true); // privé
  setCheck(form, "Case #C3#A0 cocher 2", false); // public

  // Données entreprise du stagiaire
  const ent = clean(s.entreprise);
  const siretEnt = clean(s.siretEntreprise);
  const adrEnt = splitAdresse(s.adresseEntreprise);
  const cpvEnt = splitCpVille(s.adresseEntreprise);
  const telEnt = clean(s.telephone); // fallback
  const courrielEnt = clean(s.email); // fallback

  setText(form, "Zone de texte 8", ent); // Nom/dénomination employeur
  setText(form, "Zone de texte 8_2", siretEnt); // N° SIRET
  setText(form, "Zone de texte 8_3", "SARL/Entreprise privée"); // Type employeur
  setText(form, "Zone de texte 8_14", adrEnt.numero); // N° adresse
  setText(form, "Zone de texte 8_13", adrEnt.voie); // Voie
  setText(form, "Zone de texte 8_4", ""); // Employeur spécifique
  setText(form, "Zone de texte 8_8", ""); // Complément
  setText(form, "Zone de texte 8_7", ""); // Code APE
  setText(form, "Zone de texte 8_9", cpvEnt.cp); // Code postal entreprise
  setText(form, "Zone de texte 8_10", cpvEnt.ville); // Commune entreprise
  setText(form, "Zone de texte 8_5", ""); // Effectif total
  setText(form, "Zone de texte 8_11", telEnt); // Téléphone entreprise (fallback)
  setText(form, "Zone de texte 8_12", courrielEnt); // Courriel entreprise (fallback)
  setText(form, "Zone de texte 8_6", ""); // Code IDCC

  // ---------- PAGE 1 — APPRENTI ----------
  setText(form, "Zone de texte 8_15", clean(s.nom)); // Nom de naissance
  setText(form, "Zone de texte 8_16", clean(s.nom)); // Nom d'usage
  setText(form, "Zone de texte 8_17", clean(s.prenom)); // Premier prénom

  // Date de naissance (3 zones)
  const [dnJ, dnM, dnA] = splitDate(s.dateNaissance);
  setText(form, "Zone de texte 21_7", dnJ);
  setText(form, "Zone de texte 21_8", dnM);
  setText(form, "Zone de texte 21_9", dnA);

  // Sexe
  const isM = (s.civilite || "").toUpperCase().startsWith("M.") || (s.civilite || "").toUpperCase() === "M";
  setCheck(form, "Case #C3#A0 cocher 3", isM); // M
  setCheck(form, "Case #C3#A0 cocher 4", !isM); // F

  setText(form, "Zone de texte 8_18", clean(s.nir)); // NIR
  setText(form, "Zone de texte 8_26", clean(s.departementNaissance)); // Département naissance

  // Adresse apprenti
  const adrAp = splitAdresse(s.adresse);
  setText(form, "Zone de texte 8_19", adrAp.numero);
  setText(form, "Zone de texte 8_20", adrAp.voie);
  setText(form, "Zone de texte 8_27", clean(s.communeNaissance)); // Commune de naissance
  setText(form, "Zone de texte 8_21", ""); // Complément adresse apprenti
  setText(form, "Zone de texte 8_33", clean(s.nationalite)); // Nationalité
  setText(form, "Zone de texte 8_34", ""); // Régime social
  setText(form, "Zone de texte 8_22", clean(s.codePostal)); // Code postal apprenti
  setText(form, "Zone de texte 8_23", clean(s.commune)); // Commune apprenti
  setText(form, "Zone de texte 8_24", clean(s.telephone)); // Téléphone apprenti
  setText(form, "Zone de texte 8_25", clean(s.email)); // Courriel apprenti

  // Sportif haut niveau / RQTH = Non par défaut
  setCheck(form, "Case #C3#A0 cocher 5_3", false); // sportif Oui
  setCheck(form, "Case #C3#A0 cocher 5_4", true); // sportif Non
  setCheck(form, "Case #C3#A0 cocher 5_5", false); // RQTH Oui
  setCheck(form, "Case #C3#A0 cocher 5_6", true); // RQTH Non

  // Représentant légal (vide si majeur)
  setText(form, "Zone de texte 8_35", ""); // Nom prénom rep légal
  setText(form, "Zone de texte 8_37", ""); // N° rep
  setText(form, "Zone de texte 8_36", ""); // Voie rep
  setText(form, "Zone de texte 8_38", ""); // Complément rep
  setText(form, "Zone de texte 8_39", ""); // CP rep
  setText(form, "Zone de texte 8_40", ""); // Commune rep
  setText(form, "Zone de texte 8_41", ""); // Courriel rep

  // Diplôme dernier préparé / obtenu
  setText(form, "Zone de texte 8_28", ""); // Situation avant
  setText(form, "Zone de texte 8_29", ""); // Dernier diplôme préparé
  setText(form, "Zone de texte 8_30", ""); // Dernière classe
  setText(form, "Zone de texte 8_31", clean(s.diplome)); // Intitulé précis dernier diplôme
  setText(form, "Zone de texte 8_32", ""); // Diplôme le plus élevé obtenu

  // ---------- PAGE 1 — MAÎTRE D'APPRENTISSAGE ----------
  // Maître n°1 = responsable de l'entreprise du stagiaire
  const respParts = clean(s.responsableEntreprise).split(/\s+/);
  const respNom = respParts.length > 1 ? respParts.slice(1).join(" ") : clean(s.responsableEntreprise);
  const respPrenom = respParts.length > 1 ? respParts[0] : "";

  setText(form, "Zone de texte 8_42", respNom); // Nom maître 1
  setText(form, "Zone de texte 8_43", respPrenom); // Prénom maître 1
  setText(form, "Zone de texte 21_4", ""); // Date naissance maître 1 J
  setText(form, "Zone de texte 21_5", "");
  setText(form, "Zone de texte 21_6", "");
  setText(form, "Zone de texte 8_44", ""); // Courriel maître 1
  setText(form, "Zone de texte 8_45", clean(s.poste) || "Tuteur"); // Emploi occupé maître 1

  // Maître n°2 — vide
  setText(form, "Zone de texte 8_46", "");
  setText(form, "Zone de texte 8_47", "");
  setText(form, "Zone de texte 8_48", "");
  setText(form, "Zone de texte 8_49", "");

  // Attestation maître apprentissage
  setCheck(form, "Case #C3#A0 cocher 6", true);

  // ---------- PAGE 2 — CONTRAT ----------
  // Type de contrat (11 = contrat d'apprentissage initial par défaut)
  setText(form, "Zone de texte 8_71", "11");

  // Date de conclusion = 1 jour avant date début formation
  const dateDebut = f.dateDebut;
  const dateFin = f.dateFin;
  const dateConclusion = dateDebut ? (() => {
    const d = new Date(dateDebut);
    d.setDate(d.getDate() - 7);
    return d.toISOString().slice(0, 10);
  })() : "";

  const [ccJ, ccM, ccA] = splitDate(dateConclusion);
  setText(form, "Zone de texte 21_16", ccJ);
  setText(form, "Zone de texte 21_17", ccM);
  setText(form, "Zone de texte 21_18", ccA);

  const [ddJ, ddM, ddA] = splitDate(dateDebut);
  setText(form, "Zone de texte 21_19", ddJ);
  setText(form, "Zone de texte 21_20", ddM);
  setText(form, "Zone de texte 21_21", ddA);

  setText(form, "Zone de texte 21_22", ddJ);
  setText(form, "Zone de texte 21_23", ddM);
  setText(form, "Zone de texte 21_24", ddA);

  // Date fin contrat
  const [dfJ, dfM, dfA] = splitDate(dateFin);
  setText(form, "Zone de texte 21_10", dfJ);
  setText(form, "Zone de texte 21_11", dfM);
  setText(form, "Zone de texte 21_12", dfA);

  // Durée hebdo : 35h
  setText(form, "Zone de texte 8_68", "35");
  setText(form, "Zone de texte 8_69", "00");

  // Travail machines dangereuses : Non
  setCheck(form, "Case #C3#A0 cocher 5_13", false); // Oui
  setCheck(form, "Case #C3#A0 cocher 5_14", true); // Non

  // ---------- PAGE 2 — FORMATION ----------
  setCheck(form, "Case #C3#A0 cocher 5_11", false); // CFA entreprise Oui
  setCheck(form, "Case #C3#A0 cocher 5_12", true); // CFA entreprise Non

  // Diplôme/titre visé
  setText(form, "Zone de texte 8_77", clean(f.codeRNCP || ""));
  setText(form, "Zone de texte 8_99", clean(o.nom)); // Dénomination CFA responsable
  setText(form, "Zone de texte 8_100", clean(f.intitule)); // Intitulé précis
  setText(form, "Zone de texte 8_73", ""); // N° UAI
  setText(form, "Zone de texte 8_75", ""); // Code diplôme
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
  setText(form, "Zone de texte 21_80", dureeMatch ? dureeMatch[1] : "");
  setText(form, "Zone de texte 8_102", "0"); // dont distance

  // Attestation pièces justificatives
  setCheck(form, "Case #C3#A0 cocher 8", true);

  // Numéro contrat précédent (vide pour un nouveau contrat type 11)
  setText(form, "Zone de texte 8_55", "");
  // Fait à (champ correct = 8_90)
  setText(form, "Zone de texte 8_90", clean(o.ville));

  // ---------- RÉMUNÉRATION (1ère année — ligne du HAUT y=669) ----------
  // Barème selon âge apprenti à la date de début du contrat.
  // Le tableau CERFA compte 4 lignes (1ère→4ème année, de haut en bas : y=669, 655, 641, 627).
  // On remplit la 1ère année (côté gauche : période unique du début→fin contrat).
  const age = ageAt(s.dateNaissance, dateDebut) ?? 20;
  const tarif = tarifApprenti(age);
  const SMIC_BRUT_MENSUEL = 1801.80;
  const montantTarif = Math.round((SMIC_BRUT_MENSUEL * tarif.y1) / 100 * 100) / 100;
  const montantStr = montantTarif.toFixed(2).replace(".", ",") + " €";
  // 1ère année — case de gauche (du/au + % + €)
  setText(form, "Zone de texte 21_81", ddJ);
  setText(form, "Zone de texte 21_82", ddM);
  setText(form, "Zone de texte 21_83", ddA);
  setText(form, "Zone de texte 21_84", dfJ);
  setText(form, "Zone de texte 21_85", dfM);
  setText(form, "Zone de texte 21_86", dfA);
  setText(form, "Zone de texte 8_95", String(tarif.y1));
  setText(form, "Zone de texte 8_96", montantStr);
  // Case de droite (2e période 1ère année) — laissée vide
  setText(form, "Zone de texte 21_87", "");
  setText(form, "Zone de texte 21_88", "");
  setText(form, "Zone de texte 21_89", "");
  setText(form, "Zone de texte 21_90", "");
  setText(form, "Zone de texte 21_91", "");
  setText(form, "Zone de texte 21_92", "");
  setText(form, "Zone de texte 8_97", "");
  setText(form, "Zone de texte 8_98", "");
  // Les lignes 2/3/4 années (y=655, 641, 627) restent vides

  // ---------- CADRE RÉSERVÉ ORGANISME (bas page 2) ----------
  // Seules les zones "Nom" (8_91) et "N° SIRET organisme" (8_92) sont à remplir.
  // 8_93 (N° de dépôt) et 8_94 (Numéro d'avenant) restent vides → remplis par l'organisme dépositaire.
  setText(form, "Zone de texte 8_91", clean(o.nom));
  setText(form, "Zone de texte 8_92", clean(o.siret));
  setText(form, "Zone de texte 8_93", "");
  setText(form, "Zone de texte 8_94", "");

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
      embedImage(pdf, s.signatureResponsableUrl || o.signatureUrl),
    ]);
    // Signature employeur (gauche, sous "Signature de l'employeur") — fallback signature dirigeant CFA si manquante
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
