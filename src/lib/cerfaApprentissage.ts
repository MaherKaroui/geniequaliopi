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

/**
 * SMIC mensuel brut (35 h) utilisé pour la rémunération minimale de l'apprenti.
 * Valeur en vigueur au 1er novembre 2024 : à actualiser à chaque revalorisation.
 */
export const SMIC_BRUT_MENSUEL_REFERENCE = { montant: 1801.80, enVigueurDepuis: "2024-11-01" };

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
  setText(form, "Zone de texte 8_21", clean(cx.complementAdresse)); // Complément adresse apprenti
  setText(form, "Zone de texte 8_33", clean(s.nationalite)); // Nationalité
  setText(form, "Zone de texte 8_34", clean(cx.regimeSocial)); // Régime social
  setText(form, "Zone de texte 8_22", clean(s.codePostal)); // Code postal apprenti
  setText(form, "Zone de texte 8_23", clean(s.commune)); // Commune apprenti
  setText(form, "Zone de texte 8_24", clean(s.telephone)); // Téléphone apprenti
  setText(form, "Zone de texte 8_25", clean(s.email)); // Courriel apprenti

  // Sportif haut niveau = Non ; RQTH = valeur saisie pour l'apprenti
  const rqth = (s.rqth || "").toLowerCase() === "oui";
  setCheck(form, "Case #C3#A0 cocher 5_3", cx.sportifHautNiveau === true); // sportif Oui
  setCheck(form, "Case #C3#A0 cocher 5_4", cx.sportifHautNiveau !== true); // sportif Non
  setCheck(form, "Case #C3#A0 cocher 5_5", rqth); // RQTH Oui
  setCheck(form, "Case #C3#A0 cocher 5_6", !rqth); // RQTH Non

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
  setText(form, "Zone de texte 8_77", clean(f.codeRNCP || ""));
  setText(form, "Zone de texte 8_99", clean(o.nom)); // Dénomination CFA responsable
  setText(form, "Zone de texte 8_100", clean(f.intitule)); // Intitulé précis
  setText(form, "Zone de texte 8_73", clean(extra.uai)); // N° UAI
  setText(form, "Zone de texte 8_75", clean(cx.codeDiplome)); // Code diplôme
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

  // ---------- RÉMUNÉRATION (1ère année — ligne du HAUT y=669) ----------
  // Barème selon âge apprenti à la date de début du contrat.
  // Le tableau CERFA compte 4 lignes (1ère→4ème année, de haut en bas : y=669, 655, 641, 627).
  // On remplit la 1ère année (côté gauche : période unique du début→fin contrat).
  const age = ageAt(s.dateNaissance, dateDebut) ?? 20;
  const tarif = tarifApprenti(age);
  const SMIC_BRUT_MENSUEL = SMIC_BRUT_MENSUEL_REFERENCE.montant;
  const montantTarif = Math.round((SMIC_BRUT_MENSUEL * tarif.y1) / 100 * 100) / 100;
  const salaireSaisi = Number(String(cx.salaireBrutMensuel || "").replace(/[^\d,.]/g, "").replace(",", "."));
  const [montantEuros, montantCents] = (salaireSaisi > 0 ? salaireSaisi : montantTarif).toFixed(2).split(".");
  // Salaire brut mensuel à l'embauche (euros , centimes)
  setText(form, "Zone de texte 8_72", montantEuros);
  setText(form, "Zone de texte 21_73", montantCents);

  // 1ère année — case de gauche (du/au + % + SMIC/SMC)
  setText(form, "Zone de texte 21_81", ddJ);
  setText(form, "Zone de texte 21_82", ddM);
  setText(form, "Zone de texte 21_83", ddA);
  setText(form, "Zone de texte 21_84", dfJ);
  setText(form, "Zone de texte 21_85", dfM);
  setText(form, "Zone de texte 21_86", dfA);
  setText(form, "Zone de texte 8_95", String(tarif.y1));
  setText(form, "Zone de texte 8_96", "SMIC");

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

  // ---------- CADRE RÉSERVÉ ORGANISME EN CHARGE DU DÉPÔT (bas page 2) ----------
  // Toujours laissé VIDE : rempli par l'organisme dépositaire (OPCO).
  setText(form, "Zone de texte 8_91", "");
  setText(form, "Zone de texte 8_92", "");
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
