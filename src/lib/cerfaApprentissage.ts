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
import { loadCerfaReferentiels } from "./cerfa/referentiels";
import { controleCerfa, dateConclusionParDefaut, type CerfaRapport } from "./cerfa/validation";


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

// L'âge et les taux de rémunération sont calculés par `src/lib/cerfa/remuneration.ts`
// à partir des tables éditables `smic_references` et `baremes_apprentissage`.



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
  // ---------- CONTRÔLE BLOQUANT AVANT GÉNÉRATION ----------
  const refs = await loadCerfaReferentiels();
  const rapport = controleCerfa(o, f, s, refs);
  if (!rapport.ok) {
    const err = new Error(
      `CERFA non déposable — ${rapport.bloquants.length} point(s) bloquant(s) :\n` +
        rapport.bloquants.map((b) => `• [${b.rubrique}] ${b.champ} : ${b.observe} → ${b.attendu}`).join("\n"),
    );
    (err as Error & { rapport?: CerfaRapport }).rapport = rapport;
    throw err;
  }

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
  const telEnt = clean(s.telephoneEntreprise); // champ propre à l'employeur — jamais celui de l'apprenti
  const courrielEnt = clean(s.emailEntreprise);

  setText(form, "Zone de texte 8", ent); // Nom/dénomination employeur
  setText(form, "Zone de texte 8_2", siretEnt); // N° SIRET
  setText(form, "Zone de texte 8_3", clean(s.typeEmployeur)); // Type employeur
  setText(form, "Zone de texte 8_14", adrEnt.numero); // N° adresse
  setText(form, "Zone de texte 8_13", adrEnt.voie); // Voie
  setText(form, "Zone de texte 8_4", ""); // Employeur spécifique
  setText(form, "Zone de texte 8_8", ""); // Complément
  setText(form, "Zone de texte 8_7", clean(s.apeEntreprise)); // Code APE
  setText(form, "Zone de texte 8_9", cpvEnt.cp); // Code postal entreprise
  setText(form, "Zone de texte 8_10", cpvEnt.ville); // Commune entreprise
  setText(form, "Zone de texte 8_5", clean(s.effectifEntreprise)); // Effectif total
  setText(form, "Zone de texte 8_11", telEnt); // Téléphone entreprise
  setText(form, "Zone de texte 8_12", courrielEnt); // Courriel entreprise
  setText(form, "Zone de texte 8_6", s.aucuneConventionCollective ? "9999" : clean(s.idccEntreprise)); // Code IDCC

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
  setText(form, "Zone de texte 8_34", clean(s.regimeSocial)); // Régime social
  setText(form, "Zone de texte 8_22", clean(s.codePostal)); // Code postal apprenti
  setText(form, "Zone de texte 8_23", clean(s.commune)); // Commune apprenti
  setText(form, "Zone de texte 8_24", clean(s.telephone)); // Téléphone apprenti
  setText(form, "Zone de texte 8_25", clean(s.email)); // Courriel apprenti

  // Sportif de haut niveau (saisi) / RQTH
  const sportif = s.sportifHautNiveau === "oui";
  setCheck(form, "Case #C3#A0 cocher 5_3", sportif); // sportif Oui
  setCheck(form, "Case #C3#A0 cocher 5_4", !sportif); // sportif Non
  setCheck(form, "Case #C3#A0 cocher 5_5", s.rqth === "oui"); // RQTH Oui
  setCheck(form, "Case #C3#A0 cocher 5_6", s.rqth !== "oui"); // RQTH Non


  // Représentant légal (vide si majeur)
  setText(form, "Zone de texte 8_35", ""); // Nom prénom rep légal
  setText(form, "Zone de texte 8_37", ""); // N° rep
  setText(form, "Zone de texte 8_36", ""); // Voie rep
  setText(form, "Zone de texte 8_38", ""); // Complément rep
  setText(form, "Zone de texte 8_39", ""); // CP rep
  setText(form, "Zone de texte 8_40", ""); // Commune rep
  setText(form, "Zone de texte 8_41", ""); // Courriel rep

  // Parcours de l'apprenti
  setText(form, "Zone de texte 8_28", clean(s.situationAvantContrat)); // Situation avant
  setText(form, "Zone de texte 8_29", clean(s.dernierDiplomePrepare)); // Dernier diplôme préparé
  setText(form, "Zone de texte 8_30", clean(s.derniereClasse)); // Dernière classe
  setText(form, "Zone de texte 8_31", clean(s.intituleDernierDiplome)); // Intitulé précis dernier diplôme
  setText(form, "Zone de texte 8_32", clean(s.diplome)); // Diplôme le plus élevé obtenu
  // Projet de création / reprise d'entreprise
  setCheck(form, "Case #C3#A0 cocher 5_7", s.projetCreationEntreprise === "oui");
  setCheck(form, "Case #C3#A0 cocher 5_8", s.projetCreationEntreprise === "non");


  // ---------- PAGE 1 — MAÎTRE D'APPRENTISSAGE ----------
  // Champs saisis explicitement (jamais déduits du nom du responsable)
  const [mnJ, mnM, mnA] = splitDate(s.maitreDateNaissance);
  setText(form, "Zone de texte 8_42", clean(s.maitreNom)); // Nom maître 1
  setText(form, "Zone de texte 8_43", clean(s.maitrePrenom)); // Prénom maître 1
  setText(form, "Zone de texte 21_4", mnJ); // Date naissance maître 1
  setText(form, "Zone de texte 21_5", mnM);
  setText(form, "Zone de texte 21_6", mnA);
  setText(form, "Zone de texte 8_44", clean(s.maitreEmail)); // Courriel maître 1
  setText(form, "Zone de texte 8_45", clean(s.maitreEmploi)); // Emploi occupé maître 1
  setText(form, "Zone de texte 8_50", clean(s.maitreDiplome)); // Diplôme le plus élevé
  setText(form, "Zone de texte 8_52", clean(s.maitreNiveauDiplome)); // Niveau de diplôme

  // Maître n°2 — vide
  setText(form, "Zone de texte 8_46", "");
  setText(form, "Zone de texte 8_47", "");
  setText(form, "Zone de texte 8_48", "");
  setText(form, "Zone de texte 8_49", "");

  // Attestation d'éligibilité du maître d'apprentissage
  setCheck(form, "Case #C3#A0 cocher 6", s.attestationEligibiliteMaitre !== false);


  // ---------- PAGE 2 — CONTRAT ----------
  // Type de contrat (11 = contrat d'apprentissage initial par défaut)
  setText(form, "Zone de texte 8_71", "11");

  // Dates du contrat (saisie contrat prioritaire sur les dates de formation)
  const dateDebut = s.dateDebutContrat || f.dateDebut;
  const dateFin = s.dateFinContrat || f.dateFin;
  const dateConclusion = s.dateConclusionContrat || dateConclusionParDefaut(dateDebut);


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
  // CFA d'entreprise : déduit de l'égalité des SIRET employeur / CFA
  setCheck(form, "Case #C3#A0 cocher 5_11", rapport.cfaEntreprise); // Oui
  setCheck(form, "Case #C3#A0 cocher 5_12", !rapport.cfaEntreprise); // Non

  // Diplôme/titre visé — code TYPE de diplôme (nomenclature notice), distinct du code RNCP
  setText(form, "Zone de texte 8_77", clean(f.typeDiplome));
  setText(form, "Zone de texte 8_99", clean(o.nom)); // Dénomination CFA responsable
  setText(form, "Zone de texte 8_100", clean(f.intitule)); // Intitulé précis
  setText(form, "Zone de texte 8_73", clean(f.uaiCfa)); // N° UAI
  setText(form, "Zone de texte 8_75", clean(f.codeDiplome)); // Code diplôme

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

  // Date prévue de fin des épreuves
  const [feJ, feM, feA] = splitDate(s.dateFinEpreuves || dateFin);
  setText(form, "Zone de texte 21_28", feJ);
  setText(form, "Zone de texte 21_29", feM);
  setText(form, "Zone de texte 21_30", feA);

  // CFA = lieu de formation principal
  setCheck(form, "Case #C3#A0 cocher 7", true);

  // Durée de formation en CFA
  const dureeMatch = (f.dureeFormationCfa || f.duree || "").match(/(\d+)/);
  const dureeHeures = dureeMatch ? dureeMatch[1] : "";
  setText(form, "Zone de texte 21_80", dureeHeures);
  // dont heures de formation à distance : total si distanciel, 0 si présentiel
  const modalites = (f.modalites || "").toLowerCase();
  const estDistanciel = /distanc|e-?learning|foad|en ligne|visio/.test(modalites);
  setText(form, "Zone de texte 8_102", estDistanciel ? dureeHeures || "0" : "0");

  // Attestation pièces justificatives
  setCheck(form, "Case #C3#A0 cocher 8", true);

  // Numéro contrat précédent (vide pour un nouveau contrat type 11)
  setText(form, "Zone de texte 8_55", "");
  // Fait à (champ correct = 8_90)
  setText(form, "Zone de texte 8_90", clean(o.ville));

  // ---------- RÉMUNÉRATION ----------
  // Une ligne par période : années de contrat de 12 mois glissants, re-découpées
  // à chaque changement de tranche d'âge. Pourcentages issus de `baremes_apprentissage`,
  // montant issu de `smic_references` (aucune valeur codée en dur).
  if (rapport.salaireMensuel !== null) {
    const [montantEuros, montantCents] = rapport.salaireMensuel.toFixed(2).split(".");
    setText(form, "Zone de texte 8_72", montantEuros);
    setText(form, "Zone de texte 21_73", montantCents);
  }
  // Caisse de retraite complémentaire
  setText(form, "Zone de texte 21_74", clean(s.caisseRetraiteComplementaire));

  // Emplacements du tableau (4 lignes × 2 cases)
  const SLOTS: { dates: string[]; pct: string; base: string }[] = [
    { dates: ["21_81", "21_82", "21_83", "21_84", "21_85", "21_86"], pct: "8_95", base: "8_96" },
    { dates: ["21_87", "21_88", "21_89", "21_90", "21_91", "21_92"], pct: "8_97", base: "8_98" },
    { dates: ["21_37", "21_38", "21_39", "21_40", "21_41", "21_42"], pct: "8_56", base: "8_57" },
    { dates: ["21_43", "21_44", "21_45", "21_46", "21_47", "21_48"], pct: "8_58", base: "8_59" },
    { dates: ["21_49", "21_50", "21_51", "21_52", "21_53", "21_54"], pct: "8_60", base: "8_61" },
    { dates: ["21_55", "21_56", "21_57", "21_58", "21_59", "21_60"], pct: "8_62", base: "8_63" },
    { dates: ["21_61", "21_62", "21_63", "21_64", "21_65", "21_66"], pct: "8_64", base: "8_65" },
    { dates: ["21_67", "21_68", "21_69", "21_70", "21_71", "21_72"], pct: "8_66", base: "8_67" },
  ];
  SLOTS.forEach((slot, i) => {
    const p = rapport.periodes[i];
    const [aJ, aM, aA] = splitDate(p?.debut);
    const [bJ, bM, bA] = splitDate(p?.fin);
    const vals = [aJ, aM, aA, bJ, bM, bA];
    slot.dates.forEach((n, k) => setText(form, `Zone de texte ${n}`, p ? vals[k] : ""));
    setText(form, `Zone de texte ${slot.pct}`, p && p.pourcentage !== null ? String(p.pourcentage) : "");
    setText(form, `Zone de texte ${slot.base}`, p ? (p.base === "SMIC" ? "SMIC" : "SMIC/SMC") : "");
  });

  // ---------- CADRE RÉSERVÉ À L'ORGANISME EN CHARGE DU DÉPÔT ----------
  // Réservé à l'OPCO : jamais rempli par le générateur (nom, SIRET, dates de
  // réception et de décision, n° de dépôt, numéro d'avenant).


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
