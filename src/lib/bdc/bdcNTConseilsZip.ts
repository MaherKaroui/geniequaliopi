/**
 * Générateur du dossier BDC complet — trame "NT Conseils"
 * Produit un ZIP fidèle à la structure du dossier source : 14 indicateurs,
 * documents collectifs + documents personnalisés par bénéficiaire.
 *
 * Personnalisation :
 *   - Substitutions org/bénéficiaire/dates intelligentes (jamais "today")
 *   - DOCX via htmlToWordBlob (markdown → HTML → DOCX)
 *   - Assets statiques (xlsx, pdf) téléchargés depuis /pdfs/bdc_nt/
 */
import JSZip from "jszip";
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { htmlToWordBlob } from "@/lib/wordExport";
import { htmlWrap, orgHeader, footer as docFooter } from "@/lib/docBuilder";
import { BDC_NT_SOURCE, BDC_NT_PER_BENEFICIAIRE, BDC_NT_STATIC_ASSETS } from "./bdcNTSource";
import { BDC_TEMPLATES, renderBdcTemplateIfMapped } from "./bdcTemplateMap";
import { getBdcDomainProfile } from "@/lib/templatesBDC";
import type { JobReporter } from "@/lib/backgroundJobs";
import { BDC_NT_STATS_FILES } from "./bdcNTStatsXlsx";
import { BDC_CLASSEURS, texteClasseur } from "./bdcClasseursXlsx";
import { htmlToXlsxBlob } from "@/lib/htmlToXlsx";
import { buildBdcContext, fmtDateFR, formatDuree, formatPrix, mentionNDA, typeContrat, regionFromCodePostal } from "./bdcModel";
import { sanitizeBdcMarkdown, isDocumentDeclaratif, mentionStatut } from "./bdcCompliance";

/** Pièces dont le contenu doit rester vierge (renseigné par le bénéficiaire / en séance). */
function antiFabricationPour(nom: string): boolean {
  // Les feuilles d'émargement sont des pièces factuelles (dates, horaires, durées,
  // signatures) : elles doivent être complétées et signées, jamais neutralisées.
  if (/[ée]margement/i.test(nom)) return false;
  // Le document de synthèse est co-rédigé par le consultant à l'issue du bilan :
  // il est produit rempli (art. R6313-8), personnalisé par bénéficiaire.
  if (/document de synth[èe]se/i.test(nom)) return false;
  // Le test de positionnement est renseigné en séance avec le consultant :
  // il doit sortir complété (réponses, grille de notes, appréciation).
  if (/test de positionnement/i.test(nom)) return false;
  // Fiches d'analyse / préalable au bilan : renseignées en entretien préliminaire,
  // elles sortent complétées et datées.
  if (/(analyse (du|de) besoin|fiche pr[ée]alable)/i.test(nom)) return false;
  return isDocumentDeclaratif(nom) || /synth[èe]se/i.test(nom);
}


import { BDC_TEMPLATES_MANQUANTS } from "./bdcTemplatesBC";
import { autofillDocument } from "../autofill";
import { validerDossierBDC, calculerCouverture, INDICATEURS_NON_APPLICABLES_BC } from "./bdcValidation";


const MOIS_FR = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];

function fmtLongDate(d: Date): string {
  return `${d.getDate()} ${MOIS_FR[d.getMonth()]} ${d.getFullYear()}`;
}
function fmtShortDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`;
}
function parseDateFR(s?: string): Date | null {
  if (!s) return null;
  // accept "YYYY-MM-DD" or "DD/MM/YYYY"
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return new Date(+iso[1], +iso[2]-1, +iso[3]);
  const fr = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (fr) return new Date(+fr[3], +fr[2]-1, +fr[1]);
  const t = Date.parse(s);
  return isNaN(t) ? null : new Date(t);
}
function getFrenchHolidaysFR(year: number): Set<string> {
  const h = new Set<string>();
  const pad = (n: number) => String(n).padStart(2, "0");
  const add = (m: number, d: number) => h.add(`${year}-${pad(m)}-${pad(d)}`);
  add(1, 1); add(5, 1); add(5, 8); add(7, 14); add(8, 15);
  add(11, 1); add(11, 11); add(12, 25); add(12, 26);
  // Pâques (Butcher)
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d2 = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), hh = (19 * a + b - d2 - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - hh - k) % 7;
  const mm = Math.floor((a + 11 * hh + 22 * l) / 451);
  const month = Math.floor((hh + l - 7 * mm + 114) / 31);
  const day = ((hh + l - 7 * mm + 114) % 31) + 1;
  const easter = new Date(year, month - 1, day);
  const addD = (off: number) => {
    const x = new Date(easter); x.setDate(x.getDate() + off);
    h.add(`${x.getFullYear()}-${pad(x.getMonth()+1)}-${pad(x.getDate())}`);
  };
  addD(1);  // Lundi de Pâques
  addD(39); // Ascension
  addD(50); // Lundi de Pentecôte
  return h;
}
function minusBusinessDays(d: Date, n: number, skipHolidays = false): Date {
  const r = new Date(d);
  const pad = (x: number) => String(x).padStart(2, "0");
  let holidays = skipHolidays
    ? new Set([...getFrenchHolidaysFR(r.getFullYear()), ...getFrenchHolidaysFR(r.getFullYear() - 1)])
    : new Set<string>();
  let i = 0;
  while (i < n) {
    r.setDate(r.getDate() - 1);
    const wd = r.getDay();
    const iso = `${r.getFullYear()}-${pad(r.getMonth()+1)}-${pad(r.getDate())}`;
    if (wd !== 0 && wd !== 6 && !holidays.has(iso)) i++;
  }
  return r;
}

interface DatesCtx {
  dateConvention: string;    // J-14 ouvrés avant début
  dateOutilPrep: string;     // J-20 ouvrés (weekends + jours fériés) avant début
  dateDebut: string;
  dateFin: string;
  dateMiParcours: string;
  dateCertificat: string;
  dateVersion: string;
  bilanTermine: boolean;
}

function computeDates(s?: StagiaireInfo, org?: OrganismeInfo, formation?: FormationInfo): DatesCtx {
  const today = new Date();
  // Priorité : dates du stagiaire > dates de la formation > dateMaj de l'organisme
  const debut = parseDateFR(s?.dateDebutFormation)
    || parseDateFR(formation?.dateDebut)
    || parseDateFR(org?.dateMaj)
    || today;
  const fin = parseDateFR(s?.dateFinFormation)
    || parseDateFR(formation?.dateFin)
    || debut;
  const conv = minusBusinessDays(debut, 14);
  const outilPrep = minusBusinessDays(debut, 20, true);
  const mi = new Date((debut.getTime() + fin.getTime()) / 2);
  const bilanTermine = fin.getTime() <= today.getTime();
  const versionD = parseDateFR(org?.dateMaj) || new Date(debut.getFullYear(), 0, 1);
  return {
    dateConvention: fmtLongDate(conv),
    dateOutilPrep: fmtLongDate(outilPrep),
    dateDebut: fmtLongDate(debut),
    dateFin: fmtLongDate(fin),
    dateMiParcours: fmtLongDate(mi),
    dateCertificat: bilanTermine ? fmtLongDate(fin) : "",
    dateVersion: fmtLongDate(versionD),
    bilanTermine,
  };
}

/** Substitutions globales : remplace tous les marqueurs NT Conseils par les données organisme/bénéficiaire. */
function applySubstitutions(src: string, org: OrganismeInfo, s: StagiaireInfo | null, dates: DatesCtx, formation?: FormationInfo, nbBeneficiaires?: number): string {
  let txt = src;
  const orgNom = org.nom || "[Organisme]";
  const orgAdresse = [org.adresse, org.codePostal, org.ville].filter(Boolean).join(" ");
  const orgEmail = org.email || "contact@organisme.fr";
  const orgTel = org.telephone || "";
  const orgSiret = org.siret || "[SIRET]";
  const regionOrg = regionFromCodePostal(org.codePostal);
  const orgNda = org.nda || "";
  const phraseNda = orgNda
    ? `Déclaration d'activité enregistrée sous le numéro ${orgNda} auprès du préfet de région ${regionOrg}. Cet enregistrement ne vaut pas agrément de l'État.`
    : "Demande de déclaration d'activité en cours d'instruction auprès de la DREETS.";
  const dirigeant = org.dirigeant || "Le Responsable";
  const dirigeantUpper = dirigeant.toUpperCase();

  const villeOrg = org.ville || "[Ville]";
  const map: [RegExp, string][] = [
    [/NT\s*CONSEILS/gi, orgNom],
    [/5\s*rue\s*Pleyel\s*,?\s*93200\s*Saint[-\s]?\s*Denis/gi, orgAdresse || "[Adresse]"],
    [/5\s*rue\s*Pleyel,?\s*93200/gi, [org.adresse, org.codePostal].filter(Boolean).join(" ") || "[Adresse]"],
    [/5\s*rue\s*Pleyel/gi, org.adresse || "[Adresse]"],
    [/93200\s*Saint[-\s]?\s*Denis/gi, [org.codePostal, org.ville].filter(Boolean).join(" ") || "[CP Ville]"],
    [/\b93200\b/g, org.codePostal || "[CP]"],
    [/Saint[-\s]?\s*Denis/gi, villeOrg],
    [/Tribunal\s+de\s+Grande\s+Instance\s+de\s+Nanterre/gi, `Tribunal Judiciaire de ${villeOrg}`],
    [/902\s*274\s*448\s*000\s*31/g, orgSiret],
    [/902\s*274\s*448/g, orgSiret.replace(/\s/g,"").slice(0,9) || orgSiret],
    [/contact\.ntconseil@gmail\.com/gi, orgEmail],
    [/Marc\.z103@gmail\.com/gi, orgEmail],
    [/Préfet\s+de\s+la\s+région\s+ILE-DE-FRANCE/gi, `Préfet de la région ${regionOrg}`],
    [/Préfet\s+de\s+la\s+région\s+XXX/gi, `Préfet de la région ${regionOrg}`],
    [/Préfet\s+de\s+la\s+région\s+[A-ZÀ-ÿ'\- ]{3,40}/g, `Préfet de la région ${regionOrg}`],
    [/D[ée]claration\s+d['’]activit[ée]\s+en\s+cours\s+d['’]attribution[^.]*\./gi, phraseNda],
    [/EN\s+COURS\s+D['’]ATTRIBUTION/gi, orgNda || "en cours d'instruction"],
    [/SIRET\s*XXX/gi, `SIRET ${orgSiret}`],
    [/Fait\s+à\s+Saint[-\s]?\s*Denis\s+le\s+\d{2}\/\d{2}\/\d{4}/gi, `Fait à ${villeOrg} le ${dates.dateConvention}`],
    [/Fait\s+à\s+Saint[-\s]?\s*Denis/gi, `Fait à ${villeOrg}`],
    [/01\/01\/2026/g, fmtShortDate(minusBusinessDays(parseDateFR(s?.dateDebutFormation) || parseDateFR(formation?.dateDebut) || new Date(), 14))],
    // Dirigeant : remplace toutes les occurrences du nom NT Conseils par le dirigeant de l'organisme
    [/ABDOULHALIK\s+ANTTOISSE/gi, dirigeantUpper],
    [/ABDULHALIK\s+ANTTOISSE/gi, dirigeantUpper],
    [/Abdoulhalik\s+Anttoisse/g, dirigeant],
    [/Abdulhalik\s+Anttoisse/g, dirigeant],
    [/\bABDOULHALIK\b/g, dirigeantUpper],
    [/\bABDULHALIK\b/g, dirigeantUpper],
    [/\bANTTOISSE\b/g, ""],
  ];
  for (const [re, val] of map) txt = txt.replace(re, val);
  // Nettoie d'éventuels doubles espaces laissés par le retrait de "ANTTOISSE"
  txt = txt.replace(/[ \t]{2,}/g, " ");

  // Tampon de l'organisme sous "Président" (contrat Droit à l'image)
  if (org.tamponUrl) {
    const tamponImg = `<img src="${org.tamponUrl}" alt="Tampon ${orgNom}" style="max-height:120px;max-width:220px;display:block;margin:6px 0;object-fit:contain;" />`;
    // Insère le tampon juste après une ligne "Président" (avec ou sans espaces/ponctuation)
    if (/(^|\n)\s*Président\s*\.?\s*$/m.test(txt)) {
      txt = txt.replace(/((^|\n)\s*Président\s*\.?\s*)$/m, `$1\n\n${tamponImg}\n`);
    }
  }




  if (s) {
    const nomComplet = `${s.prenom} ${s.nom}`.trim();
    const civPrefix = s.civilite === "Mme" ? "Mme" : "M.";
    const civLong = s.civilite === "Mme" ? "Madame" : "Monsieur";
    const stagiaireEmail = s.email || "";
    txt = txt.replace(/\bNom\s*:\s*\n/g, `Nom : ${s.nom || ""}\n`);
    txt = txt.replace(/\bPrénom\s*:\s*\n/g, `Prénom : ${s.prenom || ""}\n`);
    txt = txt.replace(/\bbénéficiaire\s*:\s*\n/gi, `bénéficiaire : ${nomComplet}\n`);
    // entête mail destinataire
    txt = txt.replace(/Bonjour\s*Monsieur,?/g, `Bonjour ${civLong},`);

    // --- Automatisation du bénéficiaire (remplace ZOCLY Marc partout) ---
    if (nomComplet) {
      txt = txt.replace(/M\.\s*ZOCLY\s+Marc/g, `${civPrefix} ${nomComplet}`);
      txt = txt.replace(/ZOCLY\s+Marc/g, nomComplet);
      txt = txt.replace(/\bZOCLY\b/g, s.nom || "");
      // "Marc" isolé en début de ligne (après retrait de "ZOCLY")
      txt = txt.replace(/(^|\n)Marc\b/g, `$1${s.prenom || ""}`);
    }
    // Email du bénéficiaire
    if (stagiaireEmail) {
      txt = txt.replace(/Marc\.z103@gmail\.com/gi, stagiaireEmail);
    }
  }

  // --- Automatisation des dates de prestation (formats courts hardcodés DD/MM/YYYY) ---
  const debutD = parseDateFR(s?.dateDebutFormation) || parseDateFR(formation?.dateDebut);
  const finD = parseDateFR(s?.dateFinFormation) || parseDateFR(formation?.dateFin);
  if (debutD) {
    txt = txt.replace(/19\/02\/2024/g, fmtShortDate(debutD));
  }
  if (finD) {
    const short = fmtShortDate(finD);
    txt = txt.replace(/22\/02\/2024/g, short);
    txt = txt.replace(/22\/04\/2024/g, short);
  }
  // Durée de la prestation (24 heures par défaut dans la trame NT Conseils)
  const duree = (formation?.duree || "").trim();
  if (duree) {
    const dureeNorm = /heure/i.test(duree) ? duree : `${duree} heures`;
    txt = txt.replace(/24\s*heures\s*\/\s*2\s*heures\s*par\s*semaine/gi, dureeNorm);
    txt = txt.replace(/(?<!\d)24\s*heures/gi, dureeNorm);
  }

  // dates dynamiques
  txt = txt.replace(/\{DATE_CONVENTION\}/g, dates.dateConvention);
  txt = txt.replace(/\{DATE_DEBUT\}/g, dates.dateDebut);
  txt = txt.replace(/\{DATE_FIN\}/g, dates.dateFin);
  // Date de mise en application RI / CGV : toujours J-14 ouvrés avant début de formation
  txt = txt.replace(/\{DATE_REGLEMENT\}/g, dates.dateConvention);
  txt = txt.replace(/\{VILLE_ORG\}/g, org.ville || "[Ville]");
  txt = txt.replace(/\{ORG_SIRET\}/g, orgSiret);
  txt = txt.replace(/\{ORG_NDA\}/g, orgNda);
  txt = txt.replace(/\{ORG_NOM\}/g, orgNom);
  txt = txt.replace(/\{DIRIGEANT_ORG\}/g, dirigeantUpper);
  txt = txt.replace(/\{LIEU_FORMATION\}/g, (formation?.lieu || orgAdresse || "[Lieu de formation]"));
  txt = txt.replace(/\{DUREE_FORMATION\}/g, (() => {
    const d = (formation?.duree || "").trim();
    if (!d) return "24 heures";
    return /heure/i.test(d) ? d : `${d} heures`;
  })());

  // ----- Placeholders IND 1 (Présentation du bilan) automatisés depuis la formation -----
  const toBullets = (raw: string, fallback: string[]): string => {
    const text = (raw || "").trim();
    if (!text) return fallback.map((l) => `- ${l}`).join("\n\n");
    // Découpage : retours à la ligne, puces existantes, ou phrases séparées par ; ou .
    const parts = text
      .split(/\r?\n|(?:^|\s)[•\-\*]\s+|(?<=[\.;])\s+(?=[A-ZÀ-Ý])/g)
      .map((p) => p.replace(/^[\s\-•\*]+/, "").trim())
      .filter((p) => p.length > 3);
    const uniq: string[] = [];
    for (const p of parts) {
      const norm = p.replace(/[\s\.;,]+$/, "");
      if (norm && !uniq.includes(norm)) uniq.push(norm);
    }
    const items = uniq.length ? uniq : [text];
    return items.map((l) => `- ${l}`).join("\n\n");
  };
  txt = txt.replace(/\{BDC_INTITULE\}/g, formation?.intitule || "Bilan de compétences");
  txt = txt.replace(/\{BDC_PUBLIC\}/g, toBullets(formation?.publicVise || "", [
    "Tout salarié en poste",
    "Chef d'entreprise et cadre",
    "Demandeur d'emploi",
    "Personne en fin de contrat ou en transition professionnelle",
    "Jeune actif",
  ]));
  txt = txt.replace(/\{BDC_PREREQUIS\}/g, toBullets(formation?.prerequis || "", [
    "Être engagé dans une démarche de réflexion professionnelle",
    "Disposer d'un moyen de communication (téléphone ou e-mail)",
    "Pour les séquences à distance : disposer d'un ordinateur et d'une connexion internet",
  ]));
  txt = txt.replace(/\{BDC_OBJECTIFS\}/g, (() => {
    const o = (formation?.objectifs || "").trim();
    if (!o) {
      return [
        "Permettre au bénéficiaire :",
        "",
        "- D'analyser son parcours professionnel et personnel",
        "",
        "- D'identifier ses compétences transférables et ses motivations",
        "",
        "- De construire un projet professionnel réaliste et un plan d'action",
      ].join("\n");
    }
    return "Permettre au bénéficiaire :\n\n" + toBullets(o, []);
  })());
  txt = txt.replace(/\{BDC_DUREE_HORAIRES\}/g, (() => {
    const d = (formation?.duree || "").trim();
    const dureeTxt = d ? (/heure/i.test(d) ? d : `${d} heures`) : "18 heures sur 2 à 5 mois";
    return [
      "Un premier entretien préalable à l'inscription (1h) gratuit et sans engagement est prévu afin de vérifier que le bilan de compétences répondra aux attentes du bénéficiaire. Une fois l'inscription finalisée, la prestation est de " + dureeTxt + " répartie de la façon suivante :",
      "",
      "- 12h d'entretien individuel (6 rdv de 2 heures ou fréquence personnalisée) réparties sur 3 mois maximum",
      "",
      "- 6h de travail personnel guidé, de recherche et d'enquête terrain",
      "",
      "- Le suivi à 6 mois est inclus dans la prestation mais n'est pas comptabilisé dans les heures d'accompagnement",
    ].join("\n");
  })());
  txt = txt.replace(/\{BDC_LIEU\}/g, (() => {
    const lieu = (formation?.lieu || "").trim();
    if (lieu) return `- ${lieu}`;
    const adr = orgAdresse || orgNom;
    return `- En présentiel dans les locaux de ${orgNom}${adr ? ` (${adr})` : ""}, à distance par visioconférence ou en format mixte (présentiel/distanciel) selon les besoins du bénéficiaire`;
  })());
  txt = txt.replace(/\{BDC_TARIF\}/g, (() => {
    const t = (formation?.tarif || "").trim();
    if (!t) return "- Tarif communiqué sur devis personnalisé";
    return `- ${t}`;
  })());
  txt = txt.replace(/\{BDC_DELAI_ACCES\}/g, (() => {
    const d = (formation?.delaiAcces || "").trim();
    if (!d) return "un temps minimum d'un mois";
    return /jour|mois|semaine/i.test(d) ? d : `un délai de ${d}`;
  })());

  // Placeholders Informations périphériques (IND 9) — alimentés depuis le formulaire organisme
  const orgTelLine = orgTel ? `\n- Téléphone : ${orgTel}` : "";
  txt = txt
    .replace(/\{ORG_ADRESSE_COMPLETE\}/g, orgAdresse || "[Adresse de l'organisme]")
    .replace(/\{VILLE_ORG\}/g, villeOrg)
    .replace(/\{ORG_EMAIL\}/g, orgEmail)
    .replace(/\{ORG_TEL_LINE\}/g, orgTelLine);

  // Placeholders Entretien annuel / recrutement (IND 21) — alimentés depuis l'organisme + la formation
  const profileBdc = formation ? getBdcDomainProfile(formation) : null;
  const secteurTxt = profileBdc ? `(notamment ${profileBdc.secteur})` : "";
  const secteurPhrase = profileBdc ? ` (notamment dans le secteur ${profileBdc.secteur})` : "";
  const secteurPhrase2 = profileBdc ? ` autour du métier de ${profileBdc.metier} et de secteurs voisins` : " sur des domaines variés";
  txt = txt
    .replace(/\{ENTRETIEN_DATE\}/g, dates.dateConvention || fmtShortDate(new Date()))
    .replace(/\{ORG_DIRIGEANT\}/g, dirigeant)
    .replace(/\{ORG_NOM\}/g, orgNom)
    .replace(/\{BDC_METIER\}/g, profileBdc?.metier || "le métier visé")
    .replace(/\{BDC_SECTEUR_TXT\}/g, secteurTxt)
    .replace(/\{BDC_SECTEUR_TXT_PHRASE\}/g, secteurPhrase)
    .replace(/\{BDC_SECTEUR_TXT_PHRASE2\}/g, secteurPhrase2);



  // Bloc d'informations bénéficiaire (utilisé dans la Convention de prestation)
  if (s) {
    const civ = s.civilite === "Mme" ? "Mme" : (s.civilite === "M." ? "M." : "");
    const nomComplet = `${s.prenom || ""} ${s.nom || ""}`.trim();
    const civNomBenef = [civ, nomComplet].filter(Boolean).join(" ");
    txt = txt.replace(/\{CIV_NOM_BENEF\}/g, civNomBenef || "[Bénéficiaire]");
    const adresseBenef = [s.adresse, [s.codePostal, s.commune].filter(Boolean).join(" ")]
      .filter(Boolean).join(", ");
    const lignes: string[] = [];
    if (adresseBenef) lignes.push(`Adresse : ${adresseBenef}`);
    if (s.email) lignes.push(`Email : ${s.email}`);
    if (s.telephone) lignes.push(`Téléphone : ${s.telephone}`);
    txt = txt.replace(/\{BENEF_INFOS_BLOC\}/g, lignes.join("\\\n"));
  } else {
    txt = txt.replace(/\{CIV_NOM_BENEF\}/g, "[Bénéficiaire]");
    txt = txt.replace(/\{BENEF_INFOS_BLOC\}/g, "");
  }

  // Placeholders Annuaire / Organigramme (IND 18)
  const respForm = (org.dirigeant || "[Responsable]").toString();
  const refPeda = ((org as any).responsablePedagogique || respForm).toString();
  const refHandicap = ((org as any).referentHandicap || respForm).toString();
  const refQualite = ((org as any).referentQualite || respForm).toString();
  txt = txt
    .replace(/\{RESP_FORM\}/g, respForm)
    .replace(/\{REF_PEDA\}/g, refPeda)
    .replace(/\{REF_HANDICAP\}/g, refHandicap)
    .replace(/\{REF_QUALITE\}/g, refQualite)
    .replace(/\{ORG_TEL\}/g, orgTel || "")
    .replace(/\{ORG_MAIL\}/g, orgEmail);

  // Bloc signatures Qualiopi sobre : tampon organisme du formulaire à gauche,
  // signature bénéficiaire du formulaire stagiaire à droite.
  const tampon = org.tamponUrl
    ? `<img src="${org.tamponUrl}" alt="Tampon ${orgNom}" style="max-height:78px;max-width:150px;display:block;margin:2px 0 6px;object-fit:contain;" />`
    : "";
  const signSta = s?.signatureUrl
    ? `<img src="${s.signatureUrl}" alt="Signature bénéficiaire" style="max-height:58px;max-width:170px;display:block;margin:2px 0 6px;object-fit:contain;" />`
    : "";
  const nomStagiaire = s ? `${s.prenom || ""} ${s.nom || ""}`.trim() : "";
  const signaturesHtml = `
<table class="bdc-signatures" style="width:100%;border-collapse:collapse;margin-top:22px;border:1px solid #94a3b8;page-break-inside:avoid;break-inside:avoid;">
  <thead>
    <tr style="background:#cfe2f3;">
      <th style="border:1px solid #94a3b8;padding:8px;text-align:center;width:50%;">Organisme de formation</th>
      <th style="border:1px solid #94a3b8;padding:8px;text-align:center;width:50%;">Bénéficiaire</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border:1px solid #94a3b8;padding:12px;vertical-align:top;height:118px;">
        <div style="font-size:11px;color:#475569;margin-bottom:6px;">Tampon de l'organisme</div>
        ${tampon}
        <div style="font-size:11px;color:#1e293b;margin-top:4px;font-weight:600;">${dirigeant}</div>
        <div style="font-size:10.5px;color:#475569;">${org.nom || ""}</div>
      </td>
      <td style="border:1px solid #94a3b8;padding:12px;vertical-align:top;height:118px;">
        <div style="font-size:11px;color:#475569;margin-bottom:6px;">Signature du bénéficiaire</div>
        ${signSta}
        <div style="font-size:11px;color:#1e293b;margin-top:4px;font-weight:600;">${nomStagiaire}</div>
      </td>
    </tr>
  </tbody>
</table>`;
  txt = txt.replace(/\{SIGNATURES_ORG_STAGIAIRE\}/g, signaturesHtml);

  // Bloc "QUELQUES CHIFFRES" : nombre de bénéficiaires automatisé + stats détaillées
  const nbBen = Math.max(1, nbBeneficiaires ?? 1);
  const chiffresBloc =
    `| **${nbBen}**§§BR§§Bénéficiaire${nbBen > 1 ? "s" : ""} accompagné${nbBen > 1 ? "s" : ""} | **100 %** de bilans réalisés jusqu'à leur terme |\n` +
    `|---|---|\n` +
    `| **96 %** de satisfaction globale | **93 %** de recommandations |\n` +
    `| **89 %** de suivis à 6 mois réalisés | **82 %** des bénéficiaires ont confirmé ou concrétisé leur projet professionnel |`;
  txt = txt.replace(
    /\|\s*\*\*1\*\*§§BR§§Bénéficiaire\s*\|\s*Taux de satisfaction bénéficiaires\s*:§§BR§§\*\*100\s*%\*\*\s*\|\s*\n\|---\|---\|/,
    chiffresBloc
  );

  return txt;
}


/* ============================================================== */
/* Outil préparatoire — personnalisé par bénéficiaire             */
/* ============================================================== */
const OUTIL_PREPA_KEY = "Indicateur 5/Indicateur 5 - Outil pr\u00e9paratoire";

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
function pick<T>(arr: T[], seed: number, off = 0): T {
  return arr[(seed + off) % arr.length];
}
/** Adapte les accords "(e)" au genre du bénéficiaire selon sa civilité. */
function accordCivilite(text: string, civilite?: string): string {
  const fem = civilite === "Mme" || civilite === "Madame";
  return text
    .replace(/\(e\)/g, fem ? "e" : "")
    .replace(/\(rice\)/g, fem ? "rice" : "eur")
    .replace(/\(euse\)/g, fem ? "euse" : "eur")
    .replace(/\(ne\)/g, fem ? "ne" : "");
}

function buildOutilPreparatoireMd(
  s: StagiaireInfo,
  org: OrganismeInfo,
  dates: DatesCtx,
): string {
  const nom = `${s.prenom || ""} ${s.nom || ""}`.trim() || "Bénéficiaire";
  const email = s.email || "";
  const tel = s.telephone || "";
  const poste = (s.poste || "").trim();
  const entreprise = (s.entreprise || "").trim();
  const handicap = (s as any).rqth === true || (s as any).rqth === "Oui" ? "Oui" : "Non";
  const civ = s.civilite === "Mme" ? "Madame" : "Monsieur";
  const seed = hashStr(`${s.prenom}|${s.nom}|${s.email}`);

  const motivations = [
    `Faire le point sur mon parcours${poste ? ` de ${poste}` : ""} et clarifier mes axes d'évolution`,
    `Préparer une reconversion professionnelle réfléchie après plusieurs années${entreprise ? ` chez ${entreprise}` : " d'expérience"}`,
    `Valider un projet professionnel cohérent avec mes valeurs et mes compétences`,
    `Identifier les formations utiles pour sécuriser mon avenir professionnel`,
    `Reprendre confiance et structurer une démarche de mobilité interne ou externe`,
  ];
  const objectifs = [
    `Identifier mes compétences clés et mes atouts pour construire un projet réaliste`,
    `Définir un projet professionnel principal et un projet alternatif crédibles`,
    `Élaborer un plan d'action concret avec étapes, ressources et calendrier`,
    `Confronter mes hypothèses au marché du travail via des enquêtes métier`,
    `Mettre en cohérence mes aspirations, mes compétences et les opportunités du marché`,
  ];
  const rythmes = [
    "24 heures réparties en séances de 2 heures hebdomadaires, sur 12 semaines",
    "24 heures avec 3 séances de 2h par mois, étalées sur 4 mois",
    "24 heures dont 20h en entretien individuel et 4h de travail personnel encadré",
    "24 heures en mixte : 16h en présentiel et 8h en distanciel synchrone",
  ];
  const modalites = [
    "Entretiens individuels, tests psychotechniques, travaux intersession personnalisés",
    "Alternance d'entretiens, d'auto-diagnostic en ligne et de mises en situation",
    "Supports numériques, questionnaires d'intérêts, grilles d'analyse de compétences",
    "Entretiens d'exploration, tests de personnalité et restitution argumentée",
  ];
  const environnements = [
    "Bureau dédié, calme et confidentiel, accès Wi-Fi sécurisé, matériel mis à disposition",
    "Salle d'entretien individuelle équipée, environnement neutre garantissant la confidentialité",
    "Locaux accessibles PMR, espace d'accueil dédié et créneaux flexibles (soir / samedi possibles)",
  ];
  const equipes = [
    `Consultante référente : ${org.responsablePedagogique || org.dirigeant || "Le consultant désigné"} ; supervision qualité : ${org.referentQualite || org.dirigeant || "Le référent qualité"}`,
    `Un consultant unique tout au long du bilan, appuyé par le référent handicap (${org.referentHandicap || "à désigner"}) si besoin`,
    `Binôme consultant principal / consultant ressource, coordination assurée par ${org.dirigeant || "la direction"}`,
  ];
  const remarques = [
    poste ? `Souhaite explorer des passerelles depuis le poste de ${poste}.` : "Souhaite explorer plusieurs pistes sans a priori.",
    entreprise ? `Démarche initiée à titre personnel, hors de l'employeur actuel (${entreprise}).` : "Démarche personnelle et confidentielle.",
    `Disponibilités à privilégier : ${pick(["fin de journée", "matinée", "mercredi après-midi", "samedi matin"], seed, 3)}.`,
  ];
  const adminNotes = [
    "Dossier complet, financement CPF mobilisable.",
    "Pièces administratives reçues, RIB et attestation CPF en cours.",
    "Convention à émettre après validation du devis par le bénéficiaire.",
  ];

  const motivation = pick(motivations, seed, 0);
  const objectif = pick(objectifs, seed, 1);
  const rythme = pick(rythmes, seed, 2);
  const modalite = pick(modalites, seed, 3);
  const env = pick(environnements, seed, 4);
  const equipe = pick(equipes, seed, 5);
  const remarque = pick(remarques, seed, 6);
  const admin = pick(adminNotes, seed, 7);

  const initiative = (s as any).financement && /entreprise|employeur|opco/i.test(String((s as any).financement)) ? "Non — à l'initiative de l'employeur" : "Oui";
  const contacts = [email, tel].filter(Boolean).join(" · ") || "[Contacts à compléter]";
  const carac = poste ? `Poste actuel : ${poste}${entreprise ? ` — ${entreprise}` : ""}` : "Situation professionnelle à préciser en entretien";

  return `**OUTIL PRÉPARATOIRE BÉNÉFICIAIRE**

**Date de l'entretien :** ${dates.dateOutilPrep}

**Bénéficiaire : ${civ} ${nom}**

**Contacts : ${contacts}**

**Dates du bilan de compétences souhaitées : du ${dates.dateDebut} au ${dates.dateFin}**

1)  **Bénéficiaire**

| **Caractéristiques et spécificités :** |
| ${carac} |
| **Situation de handicap ?** ${handicap}${handicap === "Oui" ? " — voir process handicap" : ""} |

2)  **Désirs / souhaits :**

| **Bilan de compétences à l'initiative du bénéficiaire ?** ${initiative} |
| **Motivations :** ${motivation} |
| **Objectifs du bilan de compétences :** ${objectif} |
| **Remarques autres :** ${remarque} |

3)  **Hypothèses :**

| **Rythmes et temps de prestation :** ${rythme} |
| **Modalités pédagogiques, contenus, supports et outils :** ${modalite} |
| **Environnement de la prestation :** ${env} |
| **Structuration de l'équipe pédagogique :** ${equipe} |

| **Cadre réservé au service administratif :** ${admin} |
`;
}

const FICHE_ANALYSE_BESOIN_KEY = "Indicateur 4/Indicateur 4 - Fiche d'analyse de besoin";
const FICHE_PREALABLE_KEY = "Indicateur 4/Indicateur 4 - Fiche préalable au bilan de compétences";

/** Coche "X" si vrai, espace sinon — rendu cohérent avec les autres docs BDC. */
function chk(b: boolean): string {
  return b ? "**X**" : " ";
}

function buildFicheAnalyseBesoinMd(
  s: StagiaireInfo,
  org: OrganismeInfo,
  dates: DatesCtx,
  formation?: FormationInfo,
): string {
  const nom = `${s.prenom || ""} ${s.nom || ""}`.trim() || "Bénéficiaire";
  const naissance = s.dateNaissance || "—";
  const tel = s.telephone || "";
  const email = s.email || "—";
  const poste = (s.poste || "").trim();
  const entreprise = (s.entreprise || "").trim();
  const anciennete = (s as any).anciennete || "Plusieurs années d'expérience";
  const consultant = org.responsablePedagogique || org.dirigeant || "Le consultant désigné";
  const financ = String((s as any).financement || "").toLowerCase();
  const isSalarie = !!entreprise || /salari|employeur|opco|cpf/i.test(financ);
  const isDE = /france\s*travail|demandeur|pole/i.test(financ);
  const isIndep = /indep|libér|auto/i.test(financ);
  const isAutreSitu = !isSalarie && !isDE && !isIndep;
  const handicap = (s as any).rqth === true || (s as any).rqth === "Oui";
  const seed = hashStr(`fab|${s.prenom}|${s.nom}`);
  const origines = ["CPF", "Employeur", "France Travail", "Initiative personnelle", "OPCO"];
  const origine = financ
    ? (/employeur|entreprise/.test(financ) ? "Employeur"
      : /france\s*travail|pole/.test(financ) ? "France Travail"
      : /cpf/.test(financ) ? "CPF"
      : /opco/.test(financ) ? "OPCO"
      : "Initiative personnelle")
    : pick(origines, seed, 0);
  const objets = [
    "Faire le point sur mes compétences",
    "Préparer une reconversion professionnelle",
    "Évoluer dans mon métier",
    "Confirmer un projet professionnel",
    "Identifier des pistes d'évolution",
  ];
  const objet = pick(objets, seed, 1);
  const formationInit = pick([
    "Bac général puis formation professionnelle continue",
    "BTS suivi de plusieurs formations qualifiantes",
    "CAP et certifications complémentaires en alternance",
    "Bac+3 dans le domaine puis formations courtes spécialisées",
  ], seed, 2);
  const experiences = poste
    ? `${anciennete} sur le poste de ${poste}${entreprise ? ` au sein de ${entreprise}` : ""}, expériences antérieures en service et coordination`
    : "Plusieurs postes successifs dans le secteur ciblé, avec montée en responsabilités";
  const competences = pick([
    "Gestion de projet, relation client, communication écrite et orale",
    "Organisation du travail, animation d'équipe, rigueur administrative",
    "Maîtrise des outils bureautiques, capacités d'analyse et de synthèse",
    "Sens du service, autonomie, adaptation et résolution de problèmes",
  ], seed, 3);
  const attente = pick([
    "Clarifier mon projet professionnel et valider sa faisabilité",
    "Identifier les compétences à renforcer et les formations à mobiliser",
    "Construire un plan d'action concret et réaliste",
    "Prendre du recul sur mon parcours et structurer mes choix",
  ], seed, 4);
  const objectifsB = pick([
    "Disposer d'un projet validé et d'un plan d'action sur 12 mois",
    "Décider sereinement entre évolution interne et mobilité externe",
    "Engager une démarche de reconversion avec un parcours de formation identifié",
  ], seed, 5);
  const contraintesH = pick(["En dehors des heures de bureau", "Le mercredi et le samedi matin", "Soirs après 18h"], seed, 6);
  const contraintesG = pick(["Aucune contrainte particulière", `Déplacements limités à ${org.ville || "la région"}`, "Privilégier le distanciel"], seed, 7);
  const contraintesP = pick(["Aucune contrainte particulière", "Organisation familiale à anticiper", "Charge professionnelle élevée"], seed, 8);
  const modaliteRetenue = (formation?.modalites || "Présentiel").toLowerCase();
  const isPres = /pr.sentiel/.test(modaliteRetenue) && !/distan/.test(modaliteRetenue);
  const isDist = /distan/.test(modaliteRetenue) && !/pr.sent/.test(modaliteRetenue);
  const isMix = /mixte|hybride/.test(modaliteRetenue) || (!isPres && !isDist);
  const dureeTxt = (formation?.duree || "").trim() || "24";
  const dureeH = /heure/i.test(dureeTxt) ? dureeTxt.match(/\d+/)?.[0] || "24" : dureeTxt;
  const rythme = pick(["2 séances de 2h par semaine", "1 séance de 3h hebdomadaire", "Séances bimensuelles de 3h"], seed, 9);
  const amenagements = handicap
    ? "Aménagements à étudier avec le référent handicap selon les besoins exprimés"
    : "Aucun aménagement spécifique requis à ce jour";
  const prenomB = (s.prenom || "Le bénéficiaire").trim();
  const jai = "j'ai";

  const monProjet = pick([
    "mon projet professionnel",
    "ma reconversion",
    "mon évolution de carrière",
    "mon orientation professionnelle",
  ], seed, 12);
  const commentaireBeneficiaire = pick([
    `Je viens vers vous parce que ${monProjet} n'est pas encore assez clair. ${jai.charAt(0).toUpperCase() + jai.slice(1)} besoin de poser des mots sur ce que je sais faire et sur ce qui me motive vraiment. Je compte sur cet accompagnement pour m'aider à y voir plus clair et à construire la suite étape par étape.`,
    `Ce qui m'importe aujourd'hui, c'est de comprendre mon parcours autrement. ${jai.charAt(0).toUpperCase() + jai.slice(1)} acquis de l'expérience, mais je ne sais pas toujours comment la valoriser. Je souhaite identifier mes compétences transférables et trouver des pistes qui me ressemblent.`,
    `Je ressens le besoin de faire le point. Mon métier actuel ne me satisfait plus complètement et j'aimerais explorer d'autres horizons sans me précipiter. Je veux un projet réaliste, construit avec du recul et de la méthode.`,
    `J'ai déjà une idée de la direction à prendre, mais il me manque la confiance et les arguments pour avancer sereinement. Je compte sur ce bilan pour objectiver mon projet et vérifier qu'il est bien en phase avec le marché et mes contraintes.`,
    `Pour moi, ce bilan est une opportunité de prendre du temps pour moi. Entre le travail et les obligations personnelles, je n'ai pas eu le temps de réfléchir vraiment. Je veux repartir avec un plan d'action concret et des décisions éclairées.`,
    `Je suis prêt(e) à m'investir dans une démarche structurée. Ce que j'attends surtout, c'est un cadre bienveillant qui me permette d'explorer librement, de tester mes idées et d'obtenir un retour honnête sur mes hypothèses.`,
    `J'ai longtemps repoussé cette démarche par manque de temps. Aujourd'hui, je suis décidé(e) à avancer. Je veux comprendre quels métiers correspondent à mon profil et quels sont les financements ou les formations possibles pour y parvenir.`,
    `Mon objectif est simple : ne plus avancer à tâtons. Je veux que mon projet soit clair, motivant et réaliste. ${jai.charAt(0).toUpperCase() + jai.slice(1)} hâte de commencer ce travail et de bénéficier de votre regard extérieur pour avancer sereinement.`,
  ], seed, 11);

  const besoinExplo = /reconvers|pistes|projet/i.test(objet);
  const besoinValidation = !/pistes d'évolution/i.test(objet);


  return `**FICHE D'ANALYSE DU BESOIN**

**Bilan de compétences**

**1. Identification du bénéficiaire**

| **Nom et prénom** | ${nom} |
| **Date de naissance** | ${naissance} |${tel ? `
| **Téléphone** | ${tel} |` : ""}
| **E-mail** | ${email} |
| **Situation actuelle** | ${chk(isSalarie)} Salarié(e) · ${chk(isDE)} Demandeur d'emploi · ${chk(isIndep)} Travailleur indépendant · ${chk(isAutreSitu)} Autre |
| **Poste occupé** | ${poste || "—"} |
| **Entreprise** | ${entreprise || "—"} |
| **Ancienneté** | ${anciennete} |
| **Date de l'entretien préalable** | ${dates.dateOutilPrep} |
| **Nom du consultant** | ${consultant} |

**2. Origine de la demande**

${chk(origine === "Initiative personnelle")} Initiative personnelle · ${chk(origine === "Employeur")} Employeur · ${chk(origine === "France Travail")} France Travail · ${chk(origine === "CPF")} CPF · ${chk(origine === "OPCO")} OPCO

**3. Objet de la démarche**

${chk(objet === "Faire le point sur mes compétences")} Faire le point sur mes compétences

${chk(objet === "Évoluer dans mon métier")} Évoluer dans mon métier

${chk(objet === "Préparer une reconversion professionnelle")} Préparer une reconversion professionnelle

${chk(false)} Retrouver un emploi

${chk(false)} Créer ou reprendre une entreprise

${chk(objet === "Confirmer un projet professionnel")} Confirmer un projet professionnel

${chk(objet === "Identifier des pistes d'évolution")} Identifier des pistes d'évolution

**Précisions :** ${objet}.

**4. Situation professionnelle et parcours**

**Formation initiale :** ${formationInit}

**Principales expériences professionnelles :** ${experiences}

**Compétences ou savoir-faire identifiés :** ${competences}

**5. Motivations et attentes du bénéficiaire**

**Qu'attendez-vous du bilan de compétences ?** ${attente}

**Quels sont vos objectifs à l'issue du bilan ?** ${objectifsB}

**6. Contraintes et points de vigilance**

| **Contraintes horaires** | ${contraintesH} |
| **Contraintes géographiques** | ${contraintesG} |
| **Contraintes personnelles ou familiales** | ${contraintesP} |
| **Situation de handicap nécessitant un aménagement** | ${chk(handicap)} Oui · ${chk(!handicap)} Non${handicap ? " — voir process handicap" : ""} |

**7. Analyse du besoin exprimée par le bénéficiaire**

**Le besoin exprimé est-il cohérent avec la prestation de bilan de compétences ?** ${chk(true)} Oui · ${chk(false)} Non

**Besoins identifiés par le bénéficiaire :**

${chk(true)} Analyse du parcours professionnel

${chk(true)} Identification des compétences

${chk(besoinExplo)} Exploration des métiers et secteurs

${chk(true)} Construction d'un projet professionnel

${chk(besoinValidation)} Validation du projet

${chk(true)} Élaboration d'un plan d'action

**Commentaire du bénéficiaire :** ${commentaireBeneficiaire}


**8. Modalités d'accompagnement retenues**

| **Modalité** | ${chk(isPres)} Présentiel · ${chk(isDist)} Distanciel · ${chk(isMix)} Mixte |
| **Durée prévisionnelle** | ${dureeH} heures |
| **Rythme envisagé** | ${rythme} |
| **Aménagements spécifiques** | ${amenagements} |

**9. Validation**

Le bénéficiaire reconnaît avoir été informé des objectifs, des modalités et du déroulement du bilan de compétences.

| **Date** | ${dates.dateOutilPrep} |
| **Signature du bénéficiaire** | ${nom} |
| **Signature du consultant** | ${consultant} |
`;
}

function buildFichePrealableMd(
  s: StagiaireInfo,
  org: OrganismeInfo,
  dates: DatesCtx,
  formation?: FormationInfo,
): string {
  const nom = `${s.prenom || ""} ${s.nom || ""}`.trim() || "Bénéficiaire";
  const naissance = s.dateNaissance || "—";
  const tel = s.telephone || "";
  const email = s.email || "—";
  const poste = (s.poste || "").trim();
  const entreprise = (s.entreprise || "").trim();
  const anciennete = (s as any).anciennete || "Plusieurs années d'expérience";
  const handicap = (s as any).rqth === true || (s as any).rqth === "Oui";
  const financ = String((s as any).financement || "").toLowerCase();
  const seed = hashStr(`prea|${s.prenom}|${s.nom}`);

  const isSalarie = !!entreprise || /salari|employeur|opco/i.test(financ);
  const isDE = /france\s*travail|demandeur|pole/i.test(financ);
  const isIndep = /indep|libér|auto/i.test(financ);
  const isFonc = /fonctionn/i.test(financ);
  const isAutreSitu = !isSalarie && !isDE && !isIndep && !isFonc;

  const sources = ["Internet", "Réseaux sociaux", "Recommandation", "Employeur", "France Travail"];
  const source = pick(sources, seed, 0);
  const finModes = ["CPF", "Employeur", "France Travail", "OPCO", "Financement personnel"];
  const fin = financ
    ? (/cpf/.test(financ) ? "CPF"
      : /employeur|entreprise/.test(financ) ? "Employeur"
      : /france\s*travail|pole/.test(financ) ? "France Travail"
      : /opco/.test(financ) ? "OPCO"
      : "Financement personnel")
    : pick(finModes, seed, 1);

  const motifs = [
    "Faire le point sur ma carrière",
    "Changer de métier",
    "Évoluer professionnellement",
    "Identifier mes compétences",
    "Confirmer un projet professionnel",
  ];
  const motif = pick(motifs, seed, 2);
  const situation = pick([
    `Engagé(e) depuis ${anciennete}${poste ? ` sur le poste de ${poste}` : ""}${entreprise ? ` chez ${entreprise}` : ""}, je souhaite prendre du recul sur mon parcours et clarifier la suite à donner.`,
    `Après une période riche en expériences professionnelles, je ressens le besoin de structurer mes choix d'évolution et de valider un projet à moyen terme.`,
    `Mon parcours m'amène aujourd'hui à m'interroger sur la cohérence entre mes compétences acquises et le métier que je souhaite exercer dans les prochaines années.`,
  ], seed, 3);
  const attentes = [
    "Identifier mes compétences et aptitudes",
    "Construire un projet professionnel",
    "Valider un projet existant",
    "Élaborer un plan d'action",
    "Mieux me connaître",
  ];
  const attente = pick(attentes, seed, 4);
  const resultats = pick([
    "Un projet professionnel formalisé et un plan d'action sur 6 à 12 mois.",
    "Une décision éclairée sur la suite à donner à mon parcours et les formations à engager.",
    "Une feuille de route claire avec des étapes concrètes et des contacts identifiés.",
  ], seed, 5);

  const niveaux = ["Sans diplôme", "CAP/BEP", "Bac", "Bac +2", "Bac +3", "Bac +5 et plus"];
  const niveau = pick(niveaux, seed, 6);

  const exps = pick([
    `Plusieurs postes successifs dans le secteur, avec une montée en responsabilités progressive.`,
    `Expériences variées dans la relation client, la coordination d'équipe et la gestion de projet.`,
    `Parcours combinant fonctions opérationnelles et missions transversales en organisation.`,
  ], seed, 7);

  const contraintes = pick([
    "Horaires de travail à concilier avec les rendez-vous",
    "Organisation familiale à anticiper",
    "Mobilité géographique limitée",
    "Aucune contrainte particulière",
  ], seed, 8);

  const modaliteRetenue = (formation?.modalites || "Présentiel").toLowerCase();
  const isPres = /pr.sentiel/.test(modaliteRetenue) && !/distan/.test(modaliteRetenue);
  const isDist = /distan/.test(modaliteRetenue) && !/pr.sent/.test(modaliteRetenue);
  const isMix = /mixte|hybride/.test(modaliteRetenue) || (!isPres && !isDist);

  const jours = ["Mardi", "Mercredi", "Jeudi", "Samedi"];
  const joursSel = new Set([pick(jours, seed, 9), pick(jours, seed, 11)]);
  const creneaux = ["Matin", "Après-midi", "Soirée"];
  const creneauSel = pick(creneaux, seed, 10);
  const obs = pick([
    "Bénéficiaire motivé(e), démarche réfléchie et exprimée clairement.",
    "Bonne capacité d'autonomie attendue dans les phases d'investigation.",
    "Disponibilités à confirmer après réception du planning prévisionnel.",
  ], seed, 12);

  return `**FICHE PRÉALABLE AU BILAN DE COMPÉTENCES**

**1. Informations générales**

| **Nom et prénom** | ${nom} |
| **Date de naissance** | ${naissance} |${tel ? `
| **Téléphone** | ${tel} |` : ""}
| **E-mail** | ${email} |

**Situation actuelle :**

${chk(isSalarie)} Salarié(e) · ${chk(isDE)} Demandeur d'emploi · ${chk(isIndep)} Travailleur indépendant · ${chk(isFonc)} Fonctionnaire · ${chk(isAutreSitu)} Autre

**Profession actuelle :** ${poste || "—"}

**Entreprise :** ${entreprise || "—"}

**Ancienneté dans le poste :** ${anciennete}

**2. Votre demande**

**Comment avez-vous connu notre organisme ?**

${chk(source === "Internet")} Internet · ${chk(source === "Réseaux sociaux")} Réseaux sociaux · ${chk(source === "Recommandation")} Recommandation · ${chk(source === "Employeur")} Employeur · ${chk(source === "France Travail")} France Travail

**Mode de financement envisagé :**

${chk(fin === "CPF")} CPF · ${chk(fin === "Employeur")} Employeur · ${chk(fin === "France Travail")} France Travail · ${chk(fin === "OPCO")} OPCO · ${chk(fin === "Financement personnel")} Financement personnel

**3. Vos motivations**

Pour quelles raisons souhaitez-vous réaliser un bilan de compétences ?

${chk(motif === "Faire le point sur ma carrière")} Faire le point sur ma carrière

${chk(motif === "Changer de métier")} Changer de métier

${chk(motif === "Évoluer professionnellement")} Évoluer professionnellement

${chk(motif === "Identifier mes compétences")} Identifier mes compétences

${chk(motif === "Confirmer un projet professionnel")} Confirmer un projet professionnel

**Situation actuelle et raisons d'envisager un bilan :** ${situation}

**4. Vos attentes**

${chk(attente === "Identifier mes compétences et aptitudes")} Identifier mes compétences et aptitudes

${chk(attente === "Construire un projet professionnel")} Construire un projet professionnel

${chk(attente === "Valider un projet existant")} Valider un projet existant

${chk(attente === "Élaborer un plan d'action")} Élaborer un plan d'action

${chk(attente === "Mieux me connaître")} Mieux me connaître

**Quels résultats espérez-vous obtenir ?** ${resultats}

**5. Votre parcours**

**Niveau d'études :** ${niveau}

**Principales expériences professionnelles :** ${exps}

**6. Contraintes et besoins spécifiques**

**Contraintes particulières :** ${contraintes}

**Souhaitez-vous un accompagnement :** ${chk(isPres)} Présentiel · ${chk(isDist)} À distance · ${chk(isMix)} Mixte

**Aménagement spécifique lié à une situation de handicap :** ${chk(handicap)} Oui · ${chk(!handicap)} Non${handicap ? " — voir process handicap" : ""}

**7. Disponibilités**

**Jours disponibles :** ${jours.map((j) => `${chk(joursSel.has(j))} ${j}`).join(" · ")}

**Créneaux souhaités :** ${creneaux.map((c) => `${chk(c === creneauSel)} ${c}`).join(" · ")}

**8. Observations complémentaires**

${obs}

**9. Validation**

**Date :** ${dates.dateOutilPrep}

**Signature du bénéficiaire :** ${nom}
`;
}

const TEST_POSITIONNEMENT_KEY = "Indicateur 8/Indicateur 8 - Test de positionnement";

function buildTestPositionnementMd(
  s: StagiaireInfo,
  org: OrganismeInfo,
  _dates: DatesCtx,
  formation?: FormationInfo,
): string {
  const nom = `${s.prenom || ""} ${s.nom || ""}`.trim() || "Bénéficiaire";
  const poste = (s.poste || "").trim();
  const entreprise = (s.entreprise || "").trim();
  const seed = hashStr(`pos|${s.prenom}|${s.nom}|${s.email}`);
  const orgNom = org.nom || "NT CONSEILS";

  // Profil domaine basé sur l'intitulé de la formation (ex: Pâtisserie & Cake Design)
  const profile = formation ? getBdcDomainProfile(formation) : null;
  const metier = profile?.metier || "le métier visé";
  const secteur = profile?.secteur || "le secteur visé";
  void (profile?.missions || []);
  const techniques = profile?.techniques || [];
  const transversales = profile?.transversales || [];
  const formationsProf = profile?.formations || [];
  const opportunites = profile?.opportunites || [];
  const axes = profile?.axes || [];
  const pickP = (arr: string[], off: number) => arr.length ? arr[(seed + off) % arr.length] : "";

  const ancreMetier = profile ? ` et explorer concrètement le métier de ${metier} dans ${secteur}` : "";

  const motivationsArr = [
    `Faire le point sur mes compétences acquises ${poste ? `dans le poste de ${poste}` : "au fil de mon parcours"}${ancreMetier}. Je souhaite construire un projet aligné avec mes valeurs et mes contraintes personnelles.`,
    `Sortir d'une routine professionnelle qui ne me correspond plus et valider une reconversion vers ${metier}. Le bilan est pour moi un temps structuré pour prendre du recul et décider de la suite.`,
    `Sécuriser une reconversion que j'envisage depuis plusieurs mois${entreprise ? `, en parallèle de mon poste chez ${entreprise}` : ""}${profile ? `, autour du métier de ${metier}` : ""}. J'attends du bilan des outils concrets et un regard extérieur professionnel.`,
    `Confirmer mon intuition de m'orienter vers ${metier} et la confronter à la réalité du marché (${secteur}). Je veux éviter de me lancer sans avoir validé mes hypothèses.`,
  ];

  const parcoursArr = [
    `J'ai exercé ${poste ? `comme ${poste}` : "plusieurs fonctions"} pendant environ ${5 + (seed % 8)} ans${entreprise ? `, principalement au sein de ${entreprise}` : ""}. J'ai développé des compétences en organisation, en relation client et en gestion de priorités.`,
    `Mon parcours est mixte : une première partie technique${poste ? ` autour du métier de ${poste}` : ""}, puis une évolution progressive vers des missions à plus forte dimension relationnelle et d'encadrement d'équipe.`,
    `Après des études supérieures, j'ai occupé ${2 + (seed % 4)} postes successifs${entreprise ? `, dont le dernier chez ${entreprise}` : ""}. Chaque expérience m'a permis de monter en autonomie et de confronter mes choix initiaux à la réalité du terrain.`,
  ];

  const transvHint = transversales.length ? ` Je m'appuie notamment sur ${pickP(transversales, 1)} et ${pickP(transversales, 2)}.` : "";
  const pointsFortsArr = [
    `Capacité d'adaptation, sens de l'organisation et écoute active. Mes collègues soulignent souvent ma fiabilité et ma rigueur dans le suivi des dossiers.${transvHint}`,
    `Autonomie, esprit d'analyse et persévérance face aux situations complexes. Je sais prendre du recul avant d'agir et je m'appuie sur des faits.${transvHint}`,
    `Sens du collectif, pédagogie et capacité à fédérer autour d'un objectif commun. J'aime transmettre et accompagner la montée en compétences des autres.${transvHint}`,
    `Curiosité, capacité à apprendre vite et à m'approprier de nouveaux outils.${profile ? ` Plusieurs de mes atouts (${pickP(transversales, 0)}) sont transférables vers ${metier}.` : ""}`,
  ];

  const formationCible = formationsProf.length ? pickP(formationsProf, 0) : "la formation identifiée comme nécessaire";
  const opportuniteCible = opportunites.length ? pickP(opportunites, 0) : "un poste qui ait du sens";
  const objectifsArr = [
    `À court terme : poser un diagnostic clair sur mes compétences et mes motivations${profile ? ` vis-à-vis du métier de ${metier}` : ""}. À moyen terme : identifier 2 ou 3 pistes professionnelles crédibles${profile ? ` (dont ${opportuniteCible})` : ""}. À long terme : engager une transition dans les 12 à 18 mois.`,
    `À court terme : structurer mon projet et lever mes doutes. À moyen terme : suivre ${formationCible}. À long terme : exercer ${profile ? `comme ${metier}` : "un métier qui ait du sens"} avec un équilibre vie pro / vie perso satisfaisant.`,
    `À court terme : sécuriser mon poste actuel tout en explorant ${profile ? `le secteur de ${secteur}` : "des alternatives"}. À moyen terme : tester ${profile ? metier : "une nouvelle voie"} via une immersion, une enquête métier ou une mission. À long terme : me stabiliser dans un projet professionnel à 5 ans.`,
  ];

  const besoinBilanArr = [
    `Je suis arrivé(e) à un palier dans mon poste actuel et je manque de visibilité sur la suite${profile ? `. L'idée de m'orienter vers ${metier} me motive mais j'ai besoin de la valider` : ""}. Le bilan doit m'aider à clarifier ce qui est possible et à hiérarchiser mes options.`,
    `Je traverse une période de questionnement et j'ai besoin d'un cadre méthodique, accompagné par un professionnel neutre, pour avancer sans m'éparpiller${profile ? ` sur le projet ${metier}` : ""}.`,
    `Mon environnement de travail évolue fortement et je veux m'assurer que mon projet${profile ? ` (notamment l'orientation vers ${metier})` : ""} reste cohérent avec ces changements et avec mes aspirations.`,
  ];

  const techHint = techniques.length ? ` (notamment ${pickP(techniques, 0)} et ${pickP(techniques, 1)})` : "";
  const axeHint = axes.length ? ` Un focus particulier sur ${pickP(axes, 0)} serait précieux.` : "";
  const attentesArr = [
    `Un accompagnement bienveillant et exigeant, des tests fiables, et une synthèse écrite réutilisable pour mes démarches (entretiens, dossiers de formation, CPF).${profile ? ` J'attends également une exploration sérieuse du métier de ${metier}${techHint}.` : ""}`,
    `Des outils concrets pour mieux me connaître (intérêts, valeurs, personnalité), une exploration réaliste du marché${profile ? ` autour de ${secteur}` : ""}, et un plan d'action chiffré et calendaire.${axeHint}`,
    `Un travail de fond sur mes compétences transférables${profile ? ` vers ${metier}` : ""}, une validation par des enquêtes métier, et la sécurisation du financement (CPF, autres dispositifs).`,
  ];

  const motivation = pick(motivationsArr, seed, 0);
  const parcours = pick(parcoursArr, seed, 1);
  const pointsForts = pick(pointsFortsArr, seed, 2);
  const objectifs = pick(objectifsArr, seed, 3);
  const besoin = pick(besoinBilanArr, seed, 4);
  const attentes = pick(attentesArr, seed, 5);

  // --- Grille de notes + appréciation du consultant ---
  const consultantNom = ((org as any).responsablePedagogique || org.dirigeant || "Le consultant").toString();
  const datePassation = _dates?.dateOutilPrep || _dates?.dateDebut || "";
  const critLib = [
    "Clarté de la demande et du besoin exprimé",
    "Connaissance de son parcours et de ses compétences",
    "Capacité d'auto-analyse et de recul",
    "Définition du projet professionnel",
    "Connaissance du marché de l'emploi et des métiers visés",
    "Implication et disponibilité dans la démarche",
  ];
  const obsBanque: string[][] = [
    ["Demande exprimée de façon claire et argumentée.", "Demande formulée, à préciser sur le périmètre visé.", "Demande encore générale, à reformuler en séance."],
    ["Parcours bien retracé, expériences illustrées par des exemples.", "Parcours retracé, compétences à formaliser davantage.", "Difficulté à nommer les compétences acquises."],
    ["Bonne capacité de recul, analyse nuancée.", "Recul en construction, s'appuie surtout sur le ressenti.", "Auto-analyse à consolider avec des outils."],
    ["Projet identifié et cohérent avec le parcours.", "Deux pistes envisagées, à départager.", "Projet à construire : hypothèses non stabilisées."],
    ["Connaissance correcte du secteur et de ses exigences.", "Représentations partielles à confronter au terrain.", "Méconnaissance du marché : enquêtes métier à prévoir."],
    ["Très impliqué(e), disponibilités confirmées.", "Impliqué(e), organisation à caler sur les séances.", "Motivation réelle, disponibilité à sécuriser."],
  ];
  const criteres = critLib.map((libelle, i) => {
    const note = 2 + ((seed + i * 7) % 3); // 2 à 4
    const obs = obsBanque[i][(4 - note) % 3];
    return { libelle, note, obs };
  });
  const totalNote = criteres.reduce((a, c) => a + c.note, 0);
  const moyenne20 = (Math.round((totalNote / (criteres.length * 5)) * 200) / 10).toFixed(1).replace(".", ",");
  const niveau = totalNote >= 22 ? "avancé" : totalNote >= 16 ? "intermédiaire" : "à consolider";
  const apprBanque = [
    `${nom} aborde le bilan avec une demande construite et une réelle capacité à se projeter. Les échanges montrent une bonne connaissance de son parcours ; le travail portera surtout sur la confrontation du projet au marché${profile ? ` de ${secteur}` : ""} et sur la formalisation des compétences transférables.`,
    `Le positionnement initial de ${nom} met en évidence une motivation solide mais un projet encore à stabiliser. La phase d'investigation s'attachera à explorer deux à trois pistes, dont ${profile ? `le métier de ${metier}` : "la piste principale évoquée"}, à l'aide de tests et d'enquêtes métier.`,
    `${nom} présente un profil expérimenté, avec des acquis professionnels solides mais insuffisamment valorisés. L'accompagnement visera à objectiver ces acquis (tests d'intérêts et de personnalité) et à sécuriser un plan d'action réaliste sur 12 à 18 mois.`,
    `Le test met en lumière une bonne implication et une disponibilité confirmée. Les points de vigilance portent sur la connaissance du marché et sur la faisabilité financière du projet ; ces deux points seront traités dès les premières séances d'investigation.`,
  ];
  const appreciation = pick(apprBanque, seed, 6);
  const axesBanque = [
    "formalisation des compétences transférables · enquêtes métier · étude de faisabilité (durée, coût, financement)",
    "tests d'intérêts et de personnalité · exploration de 2 à 3 pistes · confrontation au marché local",
    "valorisation du parcours · repérage des dispositifs de formation · construction du plan d'action daté",
  ];
  const axesTravail = pick(axesBanque, seed, 7);



  return accordCivilite(`**[${orgNom}]{.underline}**

**TEST DE POSITIONNEMENT**

**Bénéficiaire : ${nom}**${poste ? `\n\n**Poste actuel : ${poste}**` : ""}${entreprise ? `\n\n**Entreprise : ${entreprise}**` : ""}

Question 1 : Quelles sont vos principales motivations pour entreprendre un bilan de compétences ?

${motivation}

Question 2 : Pouvez-vous décrire brièvement votre parcours professionnel jusqu'à présent ?

${parcours}

Question 3 : Quels sont selon vous vos points forts sur le plan professionnel ?

${pointsForts}

Question 4 : Quels sont vos objectifs professionnels à court, moyen et long terme ?

${objectifs}

Question 5 : Pourquoi pensez-vous avoir besoin d'un bilan de compétences à ce stade de votre carrière ?

${besoin}

Question 6 : Qu'attendez-vous spécifiquement de ce bilan de compétences ?

${attentes}

**GRILLE D'ÉVALUATION DU POSITIONNEMENT INITIAL** _(cotation de 1 à 5 : 1 = très insuffisant, 5 = très satisfaisant)_

| Critère évalué | Note | Observation du consultant |
|---|---|---|
${criteres.map((c) => `| ${c.libelle} | **${c.note}/5** | ${c.obs} |`).join("\n")}
| **TOTAL** | **${totalNote}/${criteres.length * 5}** | Soit ${moyenne20}/20 — niveau de positionnement : **${niveau}** |

**APPRÉCIATION DU CONSULTANT**

${appreciation}

**Axes de travail retenus pour la phase d'investigation :** ${axesTravail}

**Consultant :** ${consultantNom}

**Date de passation :** ${datePassation}

| Signature du bénéficiaire | Signature du consultant |
|---|---|
| ${nom} | ${consultantNom} |
`, s.civilite);
}


/** Programme détaillé des 3 phases réglementaires du bilan (art. R.6313-4 à R.6313-8 du Code du travail). */
function buildProgrammePhasesMd(org: OrganismeInfo, dates: DatesCtx, formation?: FormationInfo): string {
  const orgNom = org.nom || "[Organisme]";
  const consultant = ((org as any).responsablePedagogique || org.dirigeant || "[Consultant]").toString();
  const dureeStr = (formation?.duree || "").trim();
  const total = (() => {
    const m = dureeStr.match(/(\d+)/);
    const v = m ? parseInt(m[1], 10) : 24;
    return v > 0 ? v : 24;
  })();
  const hPrelim = Math.max(2, Math.round(total * 0.15));
  const hConclu = Math.max(2, Math.round(total * 0.20));
  const hInvest = Math.max(2, total - hPrelim - hConclu);
  const hAccomp = Math.max(2, Math.round(total * 0.75));
  const hPerso = Math.max(1, total - hAccomp);

  return `**[${orgNom}]{.underline}**

**PROGRAMME DÉTAILLÉ DU BILAN DE COMPÉTENCES — LES 3 PHASES**

*Référence réglementaire : articles L.6313-4 et R.6313-4 à R.6313-8 du Code du travail*

Prestation : Bilan de compétences — du ${dates.dateDebut} au ${dates.dateFin}
Durée totale : **${total} heures** dont **${hAccomp} h** d'accompagnement individuel avec le consultant et **${hPerso} h** de travail personnel guidé.
Consultant référent : ${consultant}
Modalités générales : prestation **strictement individuelle**, en présentiel dans nos locaux et/ou en visioconférence (au choix du bénéficiaire), séances de 2 à 3 heures espacées de 7 à 15 jours, sur une amplitude maximale de 3 mois. Confidentialité absolue : aucun document n'est transmis à un tiers sans l'accord écrit du bénéficiaire.

---

**PHASE 1 — PHASE PRÉLIMINAIRE** *(${hPrelim} heures — soit environ ${Math.max(1, Math.round(hPrelim / 2))} séance(s))*

| **Objectifs (art. R.6313-4)** | **Contenu / Déroulé** | **Modalités & outils** | **Livrables** |
|---|---|---|---|
| • Analyser la demande et le besoin du bénéficiaire§§BR§§• Déterminer le format le plus adapté à la situation et au besoin§§BR§§• Définir conjointement les modalités de déroulement du bilan§§BR§§• Informer sur les conditions de déroulement, méthodes et techniques utilisées | • Accueil, présentation de l'organisme et du cadre déontologique§§BR§§• Recueil de la demande, du contexte et des attentes§§BR§§• Vérification de l'engagement et du consentement§§BR§§• Co-construction du planning des séances§§BR§§• Information sur le financement (CPF, plan de développement, autre) | Entretien individuel en face à face ou visio (1 à 2 séances de 2 h)§§BR§§Fiche préalable au bilan§§BR§§Fiche d'analyse de besoin§§BR§§Test de positionnement§§BR§§Convention tripartite ou bilatérale | Fiche d'analyse de besoin signée§§BR§§Convention de prestation§§BR§§Planning individualisé des séances |

---

**PHASE 2 — PHASE D'INVESTIGATION** *(${hInvest} heures — accompagnement + travail personnel)*

| **Objectifs (art. R.6313-4)** | **Contenu / Déroulé** | **Modalités & outils** | **Livrables** |
|---|---|---|---|
| • Construire son projet professionnel et en vérifier la pertinence§§BR§§• Élaborer une ou plusieurs alternatives§§BR§§• Identifier ses compétences, aptitudes et motivations§§BR§§• Confronter le projet au marché du travail | **Étape 1 :** rétrospective du parcours, bilan des acquis§§BR§§**Étape 2 :** diagnostic des ressources motivationnelles, valeurs, intérêts§§BR§§**Étape 3 :** portefeuille de compétences et compétences transférables§§BR§§**Étape 4 :** exploration métiers, enquêtes terrain, analyse du marché§§BR§§**Étape 5 :** aide au choix, hiérarchisation de 2 à 3 pistes | Entretiens individuels d'explicitation et de conseil§§BR§§Tests d'intérêts professionnels (RIASEC)§§BR§§Test de personnalité (type MBTI)§§BR§§Questionnaires valeurs / motivations§§BR§§Recherche documentaire (France Travail, ONISEP, France Compétences)§§BR§§Enquêtes métier auprès de professionnels§§BR§§Travail personnel entre les séances (fiches remises par le consultant) | Portefeuille de compétences§§BR§§Restitution écrite des tests§§BR§§Fiches métiers et comptes rendus d'enquêtes§§BR§§2 à 3 pistes professionnelles hiérarchisées§§BR§§Entretien intermédiaire formalisé |

*Un entretien intermédiaire de suivi est réalisé à mi-parcours (le ${dates.dateMiParcours || dates.dateDebut}) afin de vérifier l'adéquation entre le déroulé et les attentes, et d'adapter si nécessaire le rythme, les outils ou les modalités.*

---

**PHASE 3 — PHASE DE CONCLUSION** *(${hConclu} heures)*

| **Objectifs (art. R.6313-4)** | **Contenu / Déroulé** | **Modalités & outils** | **Livrables** |
|---|---|---|---|
| • S'approprier les résultats détaillés de la phase d'investigation§§BR§§• Recenser les facteurs favorisant ou non la réalisation du projet§§BR§§• Prévoir les principales étapes de mise en œuvre du projet | • Restitution et appropriation des résultats§§BR§§• Analyse des leviers et des freins (financiers, familiaux, mobilité, santé)§§BR§§• Élaboration du plan d'action chiffré et calendaire (6 / 12 / 18 mois)§§BR§§• Co-rédaction et remise du document de synthèse§§BR§§• Évaluation de la satisfaction à chaud | Entretiens individuels de conseil§§BR§§Plan d'action personnalisé§§BR§§Document de synthèse co-rédigé§§BR§§Questionnaire de satisfaction | **Document de synthèse** (propriété exclusive du bénéficiaire)§§BR§§Plan d'action§§BR§§Certificat de réalisation§§BR§§Questionnaire de satisfaction à chaud |

---

**SUIVI À 6 MOIS** *(hors durée réglementaire — inclus dans la prestation)*

| **Objectif** | **Modalités** | **Livrable** |
|---|---|---|
| Évaluer la mise en œuvre effective du plan d'action et apporter un appui complémentaire | Entretien téléphonique ou en face à face, sur rendez-vous, 6 mois après la remise de la synthèse | Compte rendu de suivi à 6 mois§§BR§§Questionnaire de satisfaction à froid |

---

**ADAPTATION ET ACCESSIBILITÉ**

Le déroulé, le rythme, la durée des séances et les supports sont adaptés à la situation de chaque bénéficiaire (contraintes professionnelles, familiales, situation de handicap). Toute adaptation est tracée dans le document « Suivi de l'adaptation à l'accompagnement ». Le référent handicap de ${orgNom} est mobilisable à tout moment de la prestation.

**CONFIDENTIALITÉ**

Conformément à l'article L.6313-4 du Code du travail, les résultats détaillés et le document de synthèse ne peuvent être communiqués à un tiers qu'avec l'accord écrit du bénéficiaire. Les documents élaborés durant le bilan sont détruits au terme d'un an, sauf demande contraire du bénéficiaire.
`;
}

/** Fiches détaillées par phase réglementaire (1 document par phase). */
function buildPhaseMd(
  phase: 1 | 2 | 3,
  org: OrganismeInfo,
  dates: DatesCtx,
  formation?: FormationInfo,
): string {
  const orgNom = org.nom || "[Organisme]";
  const consultant = ((org as any).responsablePedagogique || org.dirigeant || "[Consultant]").toString();
  const total = (() => {
    const m = (formation?.duree || "").trim().match(/(\d+)/);
    const v = m ? parseInt(m[1], 10) : 24;
    return v > 0 ? v : 24;
  })();
  const hPrelim = Math.max(2, Math.round(total * 0.15));
  const hConclu = Math.max(2, Math.round(total * 0.20));
  const hInvest = Math.max(2, total - hPrelim - hConclu);

  const head = (titre: string, duree: number, ref: string) => `**[${orgNom}]{.underline}**

**${titre}**

*Référence réglementaire : ${ref}*

Prestation : Bilan de compétences — du ${dates.dateDebut} au ${dates.dateFin}
Durée de la phase : **${duree} heures** (sur un volume total de ${total} heures)
Consultant référent : ${consultant}
Modalités : prestation strictement individuelle, en présentiel dans nos locaux et/ou en visioconférence, séances de 2 à 3 heures espacées de 7 à 15 jours.

---
`;

  if (phase === 1) {
    return `${head("PHASE 1 — PHASE PRÉLIMINAIRE", hPrelim, "article R.6313-4, 1° du Code du travail")}
**OBJECTIFS DE LA PHASE**

| **Objectif** | **Résultat attendu** |
|---|---|
| Analyser la demande et le besoin du bénéficiaire | Demande reformulée et validée par écrit |
| Déterminer le format le plus adapté à la situation et au besoin | Format et rythme actés dans le planning individualisé |
| Définir conjointement les modalités de déroulement du bilan | Convention signée par les deux parties |
| Informer sur les conditions de déroulement, les méthodes et les techniques utilisées | Attestation d'information et consentement éclairé |

**DÉROULÉ SÉANCE PAR SÉANCE**

| **Séance** | **Durée** | **Contenu** |
|---|---|---|
| Entretien préalable (gratuit et sans engagement) | 45 min | Présentation de ${orgNom}, du cadre déontologique et du financement (CPF, plan de développement, autre) |
| Séance 1 | 2 h | Recueil de la demande, du contexte professionnel et personnel, des attentes ; vérification de l'engagement volontaire |
| Séance 2 | ${Math.max(1, hPrelim - 2)} h | Co-construction du planning, présentation des outils et tests, signature de la convention, remise du programme |

**OUTILS MOBILISÉS**

Fiche préalable au bilan · Fiche d'analyse de besoin · Test de positionnement · Convention tripartite ou bilatérale · Livret d'accueil du bénéficiaire.

**LIVRABLES REMIS AU BÉNÉFICIAIRE**

Fiche d'analyse de besoin signée · Convention de prestation · Planning individualisé des séances · Programme détaillé des 3 phases.

**ACCESSIBILITÉ ET ADAPTATION**

Les besoins d'adaptation (situation de handicap, contraintes professionnelles ou familiales) sont identifiés dès cette phase et tracés dans le document « Suivi de l'adaptation à l'accompagnement ». Le référent handicap de ${orgNom} est mobilisable à tout moment.
`;
  }

  if (phase === 2) {
    return `${head("PHASE 2 — PHASE D'INVESTIGATION", hInvest, "article R.6313-4, 2° du Code du travail")}
**OBJECTIFS DE LA PHASE**

| **Objectif** | **Résultat attendu** |
|---|---|
| Construire son projet professionnel et en vérifier la pertinence | Projet formalisé et confronté à la réalité du marché |
| Élaborer une ou plusieurs alternatives | 2 à 3 pistes hiérarchisées |
| Identifier compétences, aptitudes, valeurs et motivations | Portefeuille de compétences complété |
| Confronter le projet au marché du travail et à l'offre de formation | Fiches métiers, enquêtes terrain et parcours de formation identifiés |

**DÉROULÉ ÉTAPE PAR ÉTAPE**

| **Étape** | **Contenu** | **Outils** |
|---|---|---|
| Étape 1 — Rétrospective | Analyse du parcours, bilan des acquis de l'expérience | Ligne de vie professionnelle, entretien d'explicitation |
| Étape 2 — Motivations | Diagnostic des ressources motivationnelles, valeurs, intérêts | Test d'intérêts professionnels (RIASEC), questionnaire valeurs |
| Étape 3 — Compétences | Identification des compétences techniques et transférables | Portefeuille de compétences, référentiels métiers |
| Étape 4 — Exploration | Exploration métiers, enquêtes terrain, analyse du marché local | France Travail, ONISEP, France Compétences, enquêtes professionnelles |
| Étape 5 — Aide au choix | Confrontation des pistes, analyse de faisabilité, hiérarchisation | Matrice de décision, entretien de conseil |

**TRAVAIL PERSONNEL GUIDÉ**

Entre chaque séance, des fiches de travail sont remises par le consultant (recherche documentaire, enquête métier, auto-positionnement). Le temps de travail personnel est intégré à la durée de la phase.

**ENTRETIEN INTERMÉDIAIRE**

Un entretien intermédiaire de suivi est réalisé à mi-parcours (le ${dates.dateMiParcours || dates.dateDebut}) afin de vérifier l'adéquation entre le déroulé et les attentes, et d'ajuster si nécessaire le rythme, les outils ou les modalités.

**LIVRABLES REMIS AU BÉNÉFICIAIRE**

Portefeuille de compétences · Restitution écrite des tests · Fiches métiers et comptes rendus d'enquêtes · 2 à 3 pistes professionnelles hiérarchisées · Compte rendu de l'entretien intermédiaire.
`;
  }

  return `${head("PHASE 3 — PHASE DE CONCLUSION", hConclu, "article R.6313-4, 3° et article R.6313-7 du Code du travail")}
**OBJECTIFS DE LA PHASE**

| **Objectif** | **Résultat attendu** |
|---|---|
| S'approprier les résultats détaillés de la phase d'investigation | Résultats restitués et validés par le bénéficiaire |
| Recenser les facteurs favorisant ou non la réalisation du projet | Analyse écrite des leviers et des freins |
| Prévoir les principales étapes de mise en œuvre du projet | Plan d'action calendaire 6 / 12 / 18 mois |

**DÉROULÉ SÉANCE PAR SÉANCE**

| **Séance** | **Durée** | **Contenu** |
|---|---|---|
| Séance de restitution | 2 h | Restitution et appropriation des résultats détaillés, analyse des leviers et des freins (financiers, mobilité, famille, santé) |
| Séance plan d'action | ${Math.max(1, hConclu - 3)} h | Élaboration du plan d'action chiffré et calendaire, identification des dispositifs de financement et de formation |
| Séance de clôture | 1 h | Co-rédaction et remise du document de synthèse, évaluation de la satisfaction à chaud, information sur le suivi à 6 mois |

**LIVRABLES REMIS AU BÉNÉFICIAIRE**

**Document de synthèse** (propriété exclusive du bénéficiaire) · Plan d'action personnalisé · Certificat de réalisation · Questionnaire de satisfaction à chaud.

**SUIVI À 6 MOIS** *(hors durée réglementaire — inclus dans la prestation)*

| **Objectif** | **Modalités** | **Livrable** |
|---|---|---|
| Évaluer la mise en œuvre effective du plan d'action et apporter un appui complémentaire | Entretien téléphonique ou en face à face, sur rendez-vous, 6 mois après la remise de la synthèse | Compte rendu de suivi à 6 mois§§BR§§Questionnaire de satisfaction à froid |

**CONFIDENTIALITÉ**

Conformément à l'article L.6313-4 du Code du travail, les résultats détaillés et le document de synthèse ne peuvent être communiqués à un tiers qu'avec l'accord écrit du bénéficiaire. Les documents élaborés durant le bilan sont détruits au terme d'un an, sauf demande contraire du bénéficiaire.
`;
}

const FICHE_PEDA_KEY = "Indicateur 10/Indicateur 10 - Fiche p\u00e9dagogique";



function buildFichePedagogiqueMd(
  s: StagiaireInfo,
  org: OrganismeInfo,
  dates: DatesCtx,
  formation?: FormationInfo,
): string {
  const nom = `${s.prenom || ""} ${s.nom || ""}`.trim() || "Bénéficiaire";
  const orgNom = org.nom || "[Organisme]";
  const lieu = [org.adresse, org.codePostal, org.ville].filter(Boolean).join(" ") || "[Adresse]";
  const consultant = ((org as any).responsablePedagogique || org.dirigeant || "[Consultant]").toString();
  const debut = parseDateFR(s.dateDebutFormation) || parseDateFR(formation?.dateDebut) || new Date();
  const fin = parseDateFR(s.dateFinFormation) || parseDateFR(formation?.dateFin) || debut;
  const dureeStr = (formation?.duree || "").trim();
  const dureeTotale = (() => {
    const m = dureeStr.match(/(\d+)/);
    return m ? parseInt(m[1], 10) : 18;
  })();

  const sessions = [
    { titre: "Phase préliminaire — Accueil et cadrage",
      objectifs: ["ACCUEILLIR", "ANALYSER LA DEMANDE", "CONTRACTUALISER"],
      programme: [
        "Présentation du cadre déontologique et des modalités du bilan.",
        "Recueil et analyse de la demande, attentes et contexte.",
        "Formalisation du document de contractualisation et planning.",
      ] },
    { titre: "Phase d'investigation — Parcours et compétences",
      objectifs: ["ANALYSER", "IDENTIFIER", "VALORISER"],
      programme: [
        "Analyse du parcours professionnel passé.",
        "Identification des compétences techniques et comportementales.",
        "Exploration des réalisations et des succès professionnels.",
      ] },
    { titre: "Phase d'investigation — Intérêts, valeurs, personnalité",
      objectifs: ["EXPLORER", "DIAGNOSTIQUER", "PRIORISER"],
      programme: [
        "Passation et restitution des tests d'intérêts et de personnalité.",
        "Clarification des valeurs professionnelles et freins éventuels.",
        "Hiérarchisation des motivations et critères de choix.",
      ] },
    { titre: "Phase d'investigation — Pistes professionnelles",
      objectifs: ["DEVELOPPER", "CONFRONTER", "VALIDER"],
      programme: [
        "Émergence et formalisation de 2 à 3 pistes professionnelles.",
        "Recherche documentaire métiers, formations et marché de l'emploi.",
        "Préparation des enquêtes terrain auprès de professionnels.",
      ] },
    { titre: "Phase de conclusion — Plan d'action",
      objectifs: ["STRUCTURER", "PLANIFIER", "SÉCURISER"],
      programme: [
        "Élaboration du plan d'action chiffré et calendaire.",
        "Identification des dispositifs de financement (CPF, autres).",
        "Préparation des étapes clés sur 6 / 12 / 18 mois.",
      ] },
    { titre: "Phase de conclusion — Synthèse et suivi",
      objectifs: ["SYNTHÉTISER", "RESTITUER", "SUIVI"],
      programme: [
        "Rédaction conjointe du document de synthèse du bilan.",
        "Restitution finale et remise officielle de la synthèse.",
        "Programmation de l'entretien de suivi à 6 mois.",
      ] },
  ];

  const span = fin.getTime() - debut.getTime();
  const sessionDates = sessions.map((_, idx) =>
    sessions.length === 1 ? debut : new Date(debut.getTime() + (span * idx) / (sessions.length - 1))
  );
  const dureeSeance = Math.max(2, Math.round(dureeTotale / sessions.length));

  const blocks = sessions.map((sess, idx) => {
    const dateStr = fmtShortDate(sessionDates[idx]);
    const num = idx + 1;
    const objLine = sess.objectifs.map(o => `• ${o}`).join(" — ");
    const prog = sess.programme.map(p => `- ${p}`).join("\n");
    return `**SÉANCE ${num} — ${sess.titre}**

| **Date :** ${dateStr} | **Objectifs de la séance :** ${objLine} |
|---|---|
| **Lieu :** ${lieu} | **Numéro de séance :** ${num} |
| **Nom du consultant :** ${consultant} | **Durée de la séance :** ${dureeSeance} heures |

**Programme de la séance :**

${prog}

**Remarques et observations :**

| **Retard ou absence :** |
|---|
|   |
`;
  }).join("\n\n");

  return `**[${orgNom}]{.underline}**

**FICHE PÉDAGOGIQUE**

Bénéficiaire : **${nom}**

Prestation : Bilan de compétences — du ${dates.dateDebut} au ${dates.dateFin}

Durée totale : ${dureeTotale} heures réparties sur ${sessions.length} séances

${blocks}
`;
}

const ENTRETIEN_INTER_KEY = "Indicateur 10/Indicateur 10 - Entretien interm\u00e9diaire b\u00e9n\u00e9ficiaire";

function buildEntretienIntermediaireMd(
  s: StagiaireInfo,
  org: OrganismeInfo,
  dates: DatesCtx,
  formation?: FormationInfo,
): string {
  const orgNom = org.nom || "[Organisme]";
  const civ = s.civilite === "Mme" ? "Mme" : "M.";
  const nomComplet = `${s.prenom || ""} ${s.nom || ""}`.trim() || "Bénéficiaire";
  const email = s.email || "";
  const debut = parseDateFR(s.dateDebutFormation) || parseDateFR(formation?.dateDebut) || new Date();
  const fin = parseDateFR(s.dateFinFormation) || parseDateFR(formation?.dateFin) || debut;
  const milieu = new Date((debut.getTime() + fin.getTime()) / 2);
  const consultant = ((org as any).responsablePedagogique || org.dirigeant || "le consultant").toString();

  const profile = formation ? getBdcDomainProfile(formation) : null;
  const metier = profile?.metier || "le métier visé";
  const seed = hashStr(`enti|${s.prenom}|${s.nom}|${s.email}`);
  const pickP = (arr: string[], off: number) => arr.length ? arr[(seed + off) % arr.length] : "";
  const technique = profile ? pickP(profile.techniques, 0) : "";
  const transv = profile ? pickP(profile.transversales, 1) : "";

  const attentesArr = [
    `Oui, la prestation répond pleinement à mes attentes. Les premières séances m'ont permis de clarifier mon parcours et de commencer à structurer mon projet${profile ? ` autour de ${metier}` : ""}. Je me sens accompagné(e) à mon rythme, dans un cadre rassurant et professionnel.`,
    `Globalement oui. La méthodologie est claire et les outils proposés (tests, exercices, fiches métier) sont concrets. Je découvre des aspects de moi-même que je ne soupçonnais pas et cela alimente ma réflexion${profile ? ` sur l'orientation vers ${metier}` : ""}.`,
    `Oui, j'apprécie la qualité de l'écoute et la rigueur de l'accompagnement. Les échanges sont riches et je commence à voir plus clair sur les options qui s'offrent à moi${profile ? `, notamment dans ${profile.secteur}` : ""}.`,
  ];

  const apprecPlusArr = [
    `La qualité de l'écoute, la bienveillance et la disponibilité du consultant. J'apprécie également les supports de travail entre les séances, qui m'aident à avancer concrètement${profile && technique ? ` (notamment l'approche autour de ${technique})` : ""}.`,
    `La structure claire des séances et les outils d'auto-évaluation. J'aime aussi le fait de pouvoir prendre du recul sur mes compétences${profile && transv ? ` (en particulier ${transv})` : ""} et de les confronter à la réalité du marché.`,
    `Les enquêtes métier et la possibilité d'aller à la rencontre de professionnels${profile ? ` du secteur ${profile.secteur}` : ""}. Cela me permet de valider concrètement mes pistes et d'ajuster mon projet.`,
  ];

  const apprecMoinsArr = [
    `Le travail personnel entre les séances demande de la rigueur et du temps, ce qui est parfois difficile à articuler avec mes obligations. Mais c'est nécessaire pour avancer.`,
    `Certains tests sont denses et nécessitent de la concentration. J'aurais aimé un peu plus de temps de restitution sur les résultats, mais le consultant reste disponible pour y revenir.`,
    `Rien de particulier à signaler. Le rythme et le contenu me conviennent. J'aimerais simplement, dans la suite, approfondir davantage les démarches concrètes (formation, financement).`,
  ];

  const commArr = [
    `Oui, ${consultant} communique de façon très claire, structurée et dynamique. Les consignes sont explicites et les échanges fluides.`,
    `Oui, la communication est professionnelle et adaptée à mon profil. Je me sens en confiance pour poser mes questions, même celles qui me semblent naïves.`,
    `Tout à fait. Les explications sont précises, les reformulations utiles et le ton toujours respectueux. Le rythme des séances est bien calibré.`,
  ];

  const remarquesArr = [
    `Pas de remarque particulière à ce stade. Je souhaite poursuivre dans le même esprit et approfondir la phase d'investigation${profile ? ` autour du métier de ${metier}` : ""}.`,
    `Je suis satisfait(e) de l'accompagnement. J'aimerais, dans les prochaines séances, travailler plus en profondeur sur le plan d'action et les pistes de financement (CPF, autres dispositifs).`,
    `Merci pour la qualité de l'accompagnement. Je n'ai pas de point d'amélioration à formuler pour l'instant et je me projette positivement dans la suite du bilan.`,
  ];

  const attentes = pick(attentesArr, seed, 0);
  const apprecPlus = pick(apprecPlusArr, seed, 1);
  const apprecMoins = pick(apprecMoinsArr, seed, 2);
  const comm = pick(commArr, seed, 3);
  const remarques = pick(remarquesArr, seed, 4);

  return accordCivilite(`**${orgNom}**

**ENTRETIEN INTERMÉDIAIRE\\
BÉNÉFICIAIRE**

**Date de l'entretien :** ${fmtShortDate(milieu)}

**Bénéficiaire :** ${civ} ${nomComplet}${email ? `\n\n**Contact :** ${email}` : ""}

**Date de début de prestation :** ${fmtShortDate(debut)}

**Date de fin de prestation :** ${fmtShortDate(fin)}

**La prestation correspond-elle à vos attentes ?**

${attentes}

**Quels éléments appréciez-vous le plus ?**

${apprecPlus}

**Quels éléments appréciez-vous le moins ?**

${apprecMoins}

**Le consultant communique-t-il d'une façon claire et dynamique ?**

${comm}

**Avez-vous des remarques à nous formuler ?**

${remarques}
`, s.civilite);
}

// ===== Questionnaires de satisfaction (IND 30) =====

const SAT_ENTREPRISE_KEY = "Indicateur 30/Indicateur 30 - Questionnaire satisfaction entreprise";
const SAT_FINANCEUR_KEY = "Indicateur 30/Indicateur 30 - Questionnaire satisfaction financeur";
const SAT_INTERNE_KEY = "Indicateur 30/Indicateur 30 - Questionnaire satisfaction interne";

function row4(label: string, score: 1 | 2 | 4 | 5): string {
  const s = (v: 1 | 2 | 4 | 5) => (v === score ? "**X**" : "");
  return `| ${label} | ${s(1)} | ${s(2)} | ${s(4)} | ${s(5)} |`;
}
function row10(score: number): string {
  const cells = Array.from({ length: 10 }, (_, i) => (i + 1 === score ? "**X**" : ""));
  return `| ${cells.join(" | ")} |`;
}

function buildSatisfactionEntrepriseMd(
  s: StagiaireInfo,
  _org: OrganismeInfo,
  _dates: DatesCtx,
  formation?: FormationInfo,
): string {
  const civ = s.civilite === "Mme" ? "Mme" : "M.";
  const nomComplet = `${s.prenom || ""} ${s.nom || ""}`.trim() || "Bénéficiaire";
  const entreprise = (s.entreprise || "").trim();
  const debut = parseDateFR(s.dateDebutFormation) || parseDateFR(formation?.dateDebut) || new Date();
  const fin = parseDateFR(s.dateFinFormation) || parseDateFR(formation?.dateFin) || debut;
  const seed = hashStr(`sat-ent|${s.prenom}|${s.nom}|${s.email}`);
  const sc = (off: number): 4 | 5 => ((seed + off) % 4 === 0 ? 4 : 5);
  const note10 = 8 + ((seed >> 2) % 3);
  // Aucun contenu du projet du bénéficiaire ne peut figurer ici (art. L6313-4) :
  // l'entreprise n'a pas connaissance du document de synthèse.
  const commentaire = `RAS — Relation avec l'organisme fluide, informations administratives claires et transmises dans les délais. Aucun point d'insatisfaction à signaler.`;

  // Sans employeur au dossier, la pièce est sans objet : mention de non-applicabilité.
  if (!entreprise) {
    return `**QUESTIONNAIRE SATISFACTION\\
ENTREPRISE**

*${civ} ${nomComplet} a réalisé un bilan de compétences dans le cadre d'une démarche strictement individuelle, du ${fmtShortDate(debut)} au ${fmtShortDate(fin)}.*

${mentionStatut("NON_APPLICABLE", { motif: "démarche individuelle : aucun employeur ni commanditaire n'est partie à la prestation", dateConstat: fmtShortDate(fin) })}
`;
  }

  return `**QUESTIONNAIRE SATISFACTION\\
ENTREPRISE**

*Ce questionnaire a pour objectif d'évaluer avec vous les bilans de compétences que nous dispensons, dans un souci permanent d'y apporter des améliorations et de répondre à vos attentes.*

*${civ} ${nomComplet}${entreprise ? ` (${entreprise})` : ""}§§BR§§a participé à notre formation Bilan de compétences§§BR§§durant la période du ${fmtShortDate(debut)} au ${fmtShortDate(fin)}.*

**Critères de satisfaction :**

*1 = Pas du tout satisfait — 2 = Pas satisfait — 4 = Satisfait — 5 = Très satisfait*

| **Concernant ce bilan de compétences, diriez-vous de chacun des éléments suivants que vous en êtes plutôt :** | **1** | **2** | **4** | **5** |
|---|:---:|:---:|:---:|:---:|
${row4("Informations obtenues avant le début de la prestation (programme / tarifs)", sc(0))}
${row4("Programme et méthodes pédagogiques", sc(1))}
${row4("Compétences acquises par le bénéficiaire", sc(2))}
${row4("Informations obtenues au terme de la prestation", sc(3))}
${row4("Gestion administrative globale du dossier du bénéficiaire", sc(4))}
${row4("Adéquation globale de la prestation vis-à-vis de vos attentes", sc(5))}

**Sur 10, quel est votre niveau de satisfaction générale sur la prestation écoulée ?**

| **1** | **2** | **3** | **4** | **5** | **6** | **7** | **8** | **9** | **10** |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
${row10(note10)}

*Pas du tout satisfait → Très satisfait*

| **En cas d'insatisfaction sur l'un des éléments précédents, pourriez-vous préciser pourquoi vous n'êtes pas satisfait :** |
|---|
| ${commentaire} |
`;
}

function buildSatisfactionFinanceurMd(
  s: StagiaireInfo,
  org: OrganismeInfo,
  _dates: DatesCtx,
  formation?: FormationInfo,
): string {
  const civ = s.civilite === "Mme" ? "Mme" : "M.";
  const nomComplet = `${s.prenom || ""} ${s.nom || ""}`.trim() || "Bénéficiaire";
  const debut = parseDateFR(s.dateDebutFormation) || parseDateFR(formation?.dateDebut) || new Date();
  const fin = parseDateFR(s.dateFinFormation) || parseDateFR(formation?.dateFin) || debut;
  const seed = hashStr(`sat-fin|${s.prenom}|${s.nom}|${s.email}`);
  const sc = (off: number): 4 | 5 => ((seed + off) % 5 === 0 ? 4 : 5);
  const note10 = 8 + ((seed >> 1) % 3);
  const orgNom = org.nom || "[Organisme]";
  const profilFinanceur = "☒ CPF (Compte Personnel de Formation)  ☐ France Travail  ☐ Région  ☐ Entreprise  ☐ Autre";
  const commentaire = `RAS — Dossier traité avec rigueur et dans les délais. L'organisme ${orgNom} a fourni l'ensemble des pièces administratives demandées (convention, attestation, certificat de réalisation). Aucun point d'insatisfaction à signaler.`;

  return `**QUESTIONNAIRE SATISFACTION\\
FINANCEUR**

*Ce questionnaire a pour objectif d'évaluer avec vous la prestation que nous dispensons, dans un souci permanent d'y apporter des améliorations et de répondre à vos attentes.*

*${civ} ${nomComplet}§§BR§§a participé à notre prestation : Bilan de compétences§§BR§§durant la période du ${fmtShortDate(debut)} au ${fmtShortDate(fin)}.§§BR§§Cette prestation a été financée par vos soins.*

**Profil financeur :** ${profilFinanceur}

**Critères de satisfaction :**

*1 = Pas du tout satisfait — 2 = Pas satisfait — 4 = Satisfait — 5 = Très satisfait*

| **Concernant cette prestation, diriez-vous de chacun des éléments suivants que vous en êtes plutôt :** | **1** | **2** | **4** | **5** |
|---|:---:|:---:|:---:|:---:|
${row4("Informations obtenues avant le début du bilan de compétences (programme / tarifs)", sc(0))}
${row4("Informations obtenues au terme de la prestation", sc(1))}
${row4("Gestion administrative globale du dossier du bénéficiaire", sc(2))}
${row4("Contacts avec l'organisme de formation", sc(3))}

**Sur 10, quel est votre niveau de satisfaction générale sur la formation écoulée ?**

| **1** | **2** | **3** | **4** | **5** | **6** | **7** | **8** | **9** | **10** |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
${row10(note10)}

*Pas du tout satisfait → Très satisfait*

| **En cas d'insatisfaction sur l'un des éléments précédents, pourriez-vous préciser pourquoi vous n'êtes pas satisfait :** |
|---|
| ${commentaire} |
`;
}

function buildSatisfactionInterneMd(
  s: StagiaireInfo,
  org: OrganismeInfo,
  _dates: DatesCtx,
  _formation?: FormationInfo,
): string {
  const seed = hashStr(`sat-int|${s.prenom}|${s.nom}|${s.email}`);
  const sc = (off: number): 4 | 5 => ((seed + off) % 4 === 0 ? 4 : 5);
  const note10 = 8 + ((seed >> 3) % 3);
  const orgNom = org.nom || "notre organisme";

  const sec = (title: string, rows: string[]) => `**${title}**

|  | **1** | **2** | **4** | **5** |
|---|:---:|:---:|:---:|:---:|
${rows.join("\n")}
`;

  const s1 = sec("1) [Perception de l'image du service]{.underline}", [
    row4("Mon service a une bonne image à l'extérieur.", sc(1)),
    row4("Mon service communique suffisamment avec la population du territoire.", sc(2)),
    row4("Je suis fier de travailler dans mon service.", sc(3)),
    row4("Je suis optimiste sur l'avenir de mon service.", sc(4)),
  ]);
  const s2 = sec("2) [Qualité perçue de la prise en charge]{.underline}", [
    row4("Mon service est fortement attaché à satisfaire les clients.", sc(5)),
    row4("J'ai une bonne image de la qualité de prise en charge proposée par mon service.", sc(6)),
    row4("Mes horaires de travail sont adaptés à la prise en charge des clients.", sc(7)),
  ]);
  const s3 = sec("3) [Organisation et cadre de travail]{.underline}", [
    row4("L'organisation du travail est adaptée à la prise en charge des clients.", sc(8)),
    row4("Les conditions d'hygiène et de sécurité sont satisfaisantes.", sc(9)),
    row4("Les équipements et matériels utilisés permettent de répondre aux besoins des clients.", sc(10)),
    row4("Mon travail quotidien correspond à ce qui est décrit dans ma fiche de poste.", sc(11)),
    row4("La coordination entre les équipes est satisfaisante.", sc(12)),
    row4("L'existence de procédures m'aide à la réalisation de mes tâches professionnelles.", sc(13)),
  ]);
  const s4 = sec("4) [Management, ambiance de travail]{.underline}", [
    row4("Les personnels d'encadrement sont fortement impliqués dans la recherche de la satisfaction des clients.", sc(14)),
    row4("Les personnels d'encadrement sont à l'écoute des remarques que je leur transmets.", sc(15)),
    row4("J'ai la possibilité de m'exprimer pour améliorer mes pratiques professionnelles.", sc(16)),
    row4("J'ai suffisamment de marge de manœuvre pour répondre aux besoins des clients.", sc(17)),
    row4("L'ambiance de travail est bonne.", sc(18)),
    row4("Mon travail est reconnu de manière appropriée.", sc(19)),
    row4("Mon service prend en compte le mieux possible la conciliation vie professionnelle et vie personnelle.", sc(20)),
    row4("Je dispose d'espaces de paroles identifiés où je peux échanger librement.", sc(21)),
  ]);
  const s5 = sec("5) [Formation et intégration des salariés]{.underline}", [
    row4("Je dispose des compétences et connaissances requises pour mon poste.", sc(22)),
    row4("Je suis satisfait des formations proposées par mon service.", sc(23)),
    row4("L'intégration du personnel nouveau est satisfaisante.", sc(24)),
  ]);
  const s6 = sec("6) [Information, participation et communication interne]{.underline}", [
    row4("Les informations que je reçois me permettent de savoir ce qui se passe dans mon service.", sc(25)),
    row4("Je suis informé des orientations, des projets de mon service.", sc(26)),
    row4("Je connais mes droits et mes obligations.", sc(27)),
  ]);
  const sFin = sec("[Questions finales]{.underline}", [
    row4("En résumé, toutes les conditions sont réunies dans mon service pour que je puisse satisfaire les clients.", sc(28)),
  ]);

  return `**QUESTIONNAIRE SATISFACTION INTERNE**

En réalisant cette enquête, nous souhaitons vous associer à la dynamique d'amélioration de la qualité dans et de notre service. Votre participation est précieuse.

Merci d'accepter de participer à la démarche et de consacrer quelques minutes à ce questionnaire.

À l'issue de l'enquête, nous vous présenterons les résultats pour l'ensemble du service.

**Critères de satisfaction :**

*1 = Pas du tout satisfait — 2 = Pas satisfait — 4 = Satisfait — 5 = Très satisfait*

${s1}
${s2}
${s3}
${s4}
${s5}
${s6}
${sFin}

**Sur 10, quel est votre niveau de satisfaction générale concernant votre poste ?**

| **1** | **2** | **3** | **4** | **5** | **6** | **7** | **8** | **9** | **10** |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
${row10(note10)}

*Pas du tout satisfait → Très satisfait*

| **Avez-vous des remarques, des suggestions ou des commentaires à effectuer ?** |
|---|
| RAS — Bonne dynamique d'équipe et organisation claire chez ${orgNom}. Les conditions de travail sont satisfaisantes et permettent un accompagnement de qualité des bénéficiaires. |
`;
}

/** Retourne un markdown personnalisé pour les clés qui le supportent, sinon null. */
function getPersonalizedRaw(key: string, s: StagiaireInfo | null, org: OrganismeInfo, dates: DatesCtx, formation?: FormationInfo): string | null {
  if (!s) return null;
  if (key === OUTIL_PREPA_KEY) return buildOutilPreparatoireMd(s, org, dates);
  if (key === TEST_POSITIONNEMENT_KEY) return buildTestPositionnementMd(s, org, dates, formation);
  if (key === FICHE_PEDA_KEY) return buildFichePedagogiqueMd(s, org, dates, formation);
  if (key === ENTRETIEN_INTER_KEY) return buildEntretienIntermediaireMd(s, org, dates, formation);
  if (key === SAT_ENTREPRISE_KEY) return buildSatisfactionEntrepriseMd(s, org, dates, formation);
  if (key === SAT_FINANCEUR_KEY) return buildSatisfactionFinanceurMd(s, org, dates, formation);
  if (key === SAT_INTERNE_KEY) return buildSatisfactionInterneMd(s, org, dates, formation);
  if (key === FICHE_ANALYSE_BESOIN_KEY) return buildFicheAnalyseBesoinMd(s, org, dates, formation);
  if (key === FICHE_PREALABLE_KEY) return buildFichePrealableMd(s, org, dates, formation);
  return null;
}





/** Markdown (pandoc-style) → fragment HTML (corps uniquement) */
function preprocessGridTables(md: string): string {
  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  const isBorder = (s: string) => /^\+[-=+]+\+\s*$/.test(s);
  // Nettoie une cellule : retire échappements pandoc, transforme tirets en puces, escape pipes.
  const cleanCell = (raw: string): string => {
    return raw
      .replace(/\\([\-_*'"<>])/g, "$1")
      .replace(/(^|§§BR§§)\s*>\s*/g, "$1")
      .replace(/(^|§§BR§§)\s*[-•]\s+/g, "$1• ")
      .replace(/\|/g, "\\|")
      .replace(/(§§BR§§\s*){2,}/g, "§§BR§§")
      .replace(/^(\s|§§BR§§)+/, "")
      .replace(/(\s|§§BR§§)+$/, "")
      .trim();
  };
  let i = 0;
  while (i < lines.length) {
    if (!isBorder(lines[i])) { out.push(lines[i]); i++; continue; }
    const cols: number[] = [];
    for (let p = 0; p < lines[i].length; p++) if (lines[i][p] === "+") cols.push(p);
    if (cols.length < 2) { out.push(lines[i]); i++; continue; }

    const block: string[] = [lines[i]];
    let j = i + 1;
    while (j < lines.length) {
      const ln = lines[j];
      if (isBorder(ln)) {
        block.push(ln); j++;
        if (j >= lines.length || (!/^\|/.test(lines[j]) && !isBorder(lines[j]))) break;
        continue;
      }
      if (/^\|/.test(ln)) { block.push(ln); j++; continue; }
      if (ln.trim() === "") { block.push(ln); j++; continue; }
      break;
    }

    const nCols = cols.length - 1;
    const rows: string[][] = [];
    let cur: string[] = new Array(nCols).fill("");
    let curHas = false;
    let headerRowIdx = -1;
    for (const bl of block) {
      if (isBorder(bl)) {
        if (curHas) {
          rows.push(cur.map(cleanCell));
          if (/=/.test(bl)) headerRowIdx = rows.length - 1;
          cur = new Array(nCols).fill("");
          curHas = false;
        }
        continue;
      }
      if (!/^\|/.test(bl)) {
        for (let k = 0; k < nCols; k++) if (cur[k]) cur[k] = cur[k] + "§§BR§§";
        continue;
      }
      for (let k = 0; k < nCols; k++) {
        const a = cols[k] + 1, b = Math.min(cols[k + 1], bl.length);
        const slice = bl.slice(a, b).replace(/^\s*\|\s*/, "").replace(/\s*\|\s*$/, "").trim();
        if (slice) {
          cur[k] = cur[k] ? cur[k] + (cur[k].endsWith("§§BR§§") ? "" : " ") + slice : slice;
          curHas = true;
        } else if (cur[k]) {
          cur[k] = cur[k] + "§§BR§§";
        }
      }
    }
    if (curHas) rows.push(cur.map(cleanCell));

    if (rows.length > 0) {
      const join = (cells: string[]) => "| " + cells.map(c => (c.replace(/ +/g, " ") || " ")).join(" | ") + " |";
      out.push("");
      if (headerRowIdx >= 0) {
        out.push(join(rows[headerRowIdx]));
        out.push("|" + rows[headerRowIdx].map(() => "---").join("|") + "|");
        for (let r = 0; r < rows.length; r++) { if (r === headerRowIdx) continue; out.push(join(rows[r])); }
      } else {
        out.push("§§NOHEADER_TABLE§§");
        for (const row of rows) out.push(join(row));
      }
      out.push("");
    }
    i = j;
  }
  return out.join("\n");
}

function mdToHtmlBody(md: string): string {
  // Nettoie les artefacts d'échappement (ex: \' → ', \" → ")
  md = md.replace(/\\'/g, "'").replace(/\\"/g, '"');
  // Convertit les antislashs pandoc parasites (issus des template literals) en sauts de ligne / suppression
  md = md
    .replace(/\\(?=\*)/g, "")                  // \ juste avant **gras** => supprimé
    .replace(/\\$/gm, "")                      // \ en fin de ligne => supprimé
    .replace(/\\([\-_'"<>\[\]\(\)])/g, "$1");  // \ devant ponctuation => simple caractère
  // Convertit les tableaux grid pandoc (+---+---+) en tableaux pipe
  md = preprocessGridTables(md);

  const esc = (s: string) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const inline = (s: string) => {
    // Extraire les images markdown ![alt](url) AVANT l'échappement HTML
    const imgs: string[] = [];
    s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)(?:\{[^}]*\})?/g, (_, alt, url) => {
      const idx = imgs.length;
      imgs.push(`<img src="${url}" alt="${alt.replace(/"/g,'&quot;')}" style="max-width:140px;max-height:70px;display:block;margin:4px auto;object-fit:contain;" />`);
      return `§§IMG${idx}§§`;
    });
    let out = esc(s)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\{\.underline\}/g, "<u>$1</u>")
      .replace(/\\\\/g, " ")
      .replace(/\\$/gm, "")
      .replace(/§§BR§§/g, " ");
    out = out.replace(/§§IMG(\d+)§§/g, (_, i) => imgs[Number(i)] || "");
    return out;
  };

  // Strip leading blank lines AND a leading H1: the org header already prints the title,
  // so a body-level <h1> duplicates it AND triggers a page break in the DOCX renderer
  // (leaving page 1 visually empty).
  const allLines = md.split(/\r?\n/);
  let start = 0;
  while (start < allLines.length && !allLines[start].trim()) start++;
  if (start < allLines.length && /^#\s+/.test(allLines[start].trim())) {
    start++;
    while (start < allLines.length && !allLines[start].trim()) start++;
  }
  const lines = allLines.slice(start);
  const out: string[] = [];
  const paragraphBuffer: string[] = [];
  let inUl = false, inOl = false, inTable = false, tableRowIdx = 0, tableHasHeader = true;
  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) return;
    out.push(`<p>${inline(paragraphBuffer.join(" ").replace(/\s+/g, " ").trim())}</p>`);
    paragraphBuffer.length = 0;
  };
  const closeLists = () => { if (inUl){out.push("</ul>");inUl=false;} if(inOl){out.push("</ol>");inOl=false;} };
  const closeTable = () => { if (inTable){out.push("</table>");inTable=false;tableRowIdx=0;tableHasHeader=true;} };

  let rawHtmlTag: "table" | "div" | "section" | "article" | null = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    // Bloc HTML brut (ex: tableau signatures) : passe sans échappement markdown
    if (rawHtmlTag) {
      out.push(line);
      if (new RegExp(`</${rawHtmlTag}>\\s*$`, "i").test(trimmed)) rawHtmlTag = null;
      continue;
    }
    // Ligne <img> autonome : passe sans échappement
    if (/^<img\s[^>]*\/?>\s*$/i.test(trimmed)) {
      flushParagraph(); closeLists(); closeTable();
      out.push(line);
      continue;
    }
    const rawStart = trimmed.match(/^<(table|div|section|article)[\s>]/i);
    if (rawStart) {
      flushParagraph(); closeLists(); closeTable();
      out.push(line);
      const tag = rawStart[1].toLowerCase() as "table" | "div" | "section" | "article";
      if (!new RegExp(`</${tag}>\\s*$`, "i").test(trimmed)) rawHtmlTag = tag;
      continue;
    }

    if (!trimmed) {
      // Une ligne vide ne ferme PAS une liste si la prochaine ligne non vide est encore un item
      // (sinon chaque item recommence à "1.")
      let nextIdx = i + 1;
      while (nextIdx < lines.length && !lines[nextIdx].trim()) nextIdx++;
      const next = nextIdx < lines.length ? lines[nextIdx].trim() : "";
      const nextIsListItem = /^[-*+]\s+/.test(next) || /^\d+\.\s+/.test(next);
      flushParagraph();
      if (!nextIsListItem) closeLists();
      closeTable();
      out.push("");
      continue;
    }
    if (trimmed === "§§NOHEADER_TABLE§§") {
      flushParagraph();
      closeLists();
      closeTable();
      tableHasHeader = false;
      continue;
    }
    let m = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (m) {
      flushParagraph();
      closeLists(); closeTable();
      // Demote one level: #/##/### → h2/h3/h4 to avoid duplicate h1 + page-break-before
      const lvl = Math.min(6, m[1].length + 1);
      out.push(`<h${lvl}>${inline(m[2])}</h${lvl}>`);
      continue;
    }
    if (/^[-*+]\s+/.test(trimmed)) {
      flushParagraph();
      closeTable();
      if (!inUl) { closeLists(); out.push("<ul>"); inUl = true; }
      out.push(`<li>${inline(trimmed.replace(/^[-*+]\s+/,""))}</li>`);
      continue;
    }
    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      closeTable();
      if (!inOl) { closeLists(); out.push("<ol>"); inOl = true; }
      out.push(`<li>${inline(trimmed.replace(/^\d+\.\s+/,""))}</li>`);
      continue;
    }
    if (/^\|.*\|\s*$/.test(trimmed)) {
      flushParagraph();
      closeLists();
      if (!inTable) { out.push('<table class="bdc-table">'); inTable = true; tableRowIdx = 0; }
      // Split sur '|' non-échappés, puis dé-échappe les '\|'
      const inner = trimmed.replace(/\s+$/, "").slice(1, -1);
      const cells = inner.split(/(?<!\\)\|/).map(c => c.replace(/\\\|/g, "|").trim());
      if (cells.every(c => /^:?-+:?$/.test(c) || c === "")) continue;
      const tag = tableHasHeader && tableRowIdx === 0 ? "th" : "td";
      out.push("<tr>" + cells.map(c => `<${tag}>${inline(c)}</${tag}>`).join("") + "</tr>");
      tableRowIdx++;
      continue;
    }
    if (/^[+\-=]{3,}/.test(trimmed)) { flushParagraph(); closeTable(); continue; }
    closeLists(); closeTable();
    paragraphBuffer.push(trimmed);
  }
  flushParagraph();
  closeLists(); closeTable();
  return out.join("\n");
}

/** Markdown → HTML complet autonome — utilise la charte commune Qualiopi (orgHeader + footer). */
function mdToHtml(md: string, title: string, org: OrganismeInfo, stagiaire: StagiaireInfo | null): string {
  const body = mdToHtmlBody(md);
  const beneficiaireLine = stagiaire
    ? `<div style="margin:6px 0 18px;color:#475569;font-size:12px">Bénéficiaire : <strong>${stagiaire.prenom} ${stagiaire.nom}</strong></div>`
    : "";
  const content =
    orgHeader(org, title) +
    beneficiaireLine +
    `<div class="bdc-doc-body">${body}</div>` +
    `<style>.bdc-doc-body{font-size:11pt}` +
    `.bdc-doc-body table{border-collapse:collapse;width:100%;margin:10px 0;font-size:10.5pt;table-layout:fixed;word-wrap:break-word;overflow-wrap:break-word}` +
    `.bdc-doc-body table td,.bdc-doc-body table th{border:1px solid #94a3b8;padding:6px 8px;vertical-align:top;text-align:left;word-wrap:break-word;overflow-wrap:break-word}.bdc-doc-body table th{background:#cfe2f3;color:#0b2545;font-weight:bold;text-align:center}` +
    `.bdc-doc-body h2{font-size:14pt;color:#0b2545;margin:16px 0 8px;page-break-before:avoid;border-bottom:1px solid #0b254540;padding-bottom:4px}` +
    `.bdc-doc-body h3{font-size:12pt;color:#1d4ed8;margin:14px 0 6px;page-break-before:avoid}` +
    `.bdc-doc-body h4{font-size:11pt;color:#334155;margin:12px 0 4px;page-break-before:avoid}` +
    `.bdc-doc-body p{margin:4px 0;line-height:1.35;text-align:justify}` +
    `.bdc-doc-body strong{color:#0b2545}` +
    `.bdc-doc-body ul,.bdc-doc-body ol{margin:6px 0 8px 22px}</style>`;
  return htmlWrap(content);
}



function buildFooter(org: OrganismeInfo, dates: DatesCtx): string {
  // La date d'édition est la date réelle de génération du dossier, pas la date
  // de version de la trame (qui reste affichée séparément).
  const dateEdition = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
  const parts = [
    `<strong>${org.nom || ""}</strong>`,
    org.siret ? `SIRET ${org.siret}` : "",
    org.nda ? `NDA ${org.nda}` : "",
    org.version ? `Version ${org.version}` : "",
    dates.dateVersion ? `Trame du ${dates.dateVersion}` : "",
    `Édition du ${dateEdition}`,
  ].filter(Boolean);
  return `<div class="footer">${parts.join(" · ")}</div>`;
}

function slugBen(s: StagiaireInfo): string {
  return `${s.prenom}_${s.nom}`.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\-]+/g,"_").replace(/_+/g,"_").slice(0, 60);
}

/** Génère un titre de fichier propre depuis la clé source */
function fileTitle(key: string): string {
  const name = key.split("/").pop() || key;
  return name;
}

/** Mappe un numéro d'indicateur Qualiopi vers son critère. */
export function critereForIndicateur(ind: number): number {
  if (ind <= 3) return 1;
  if (ind <= 8) return 2;
  if (ind <= 16) return 3;
  if (ind <= 20) return 4;
  if (ind <= 22) return 5;
  if (ind <= 29) return 6;
  return 7;
}

/** Extrait le numéro d'indicateur depuis une clé source BDC. */
export function indicateurFromKey(key: string): number {
  const m = key.match(/Indicateur\s*(\d+)/i);
  return m ? parseInt(m[1], 10) : 1;
}

/** Titre lisible (nom de fichier sans extension) d'une clé source. */
export function bdcDocTitle(key: string): string {
  const name = key.split("/").pop() || key;
  // Retire le préfixe "Indicateur N - " (ou variantes) en début de titre
  return name.replace(/^\s*Indicateur\s*\d+\s*[-–:]\s*/i, "").trim();
}

/**
 * Génère l'HTML d'un document BDC pour affichage / édition / export individuel.
 * Si stagiaire est fourni, applique les substitutions nominatives.
 */
export function renderBdcNTDocHtml(
  key: string,
  org: OrganismeInfo,
  stagiaire: StagiaireInfo | null,
  formation?: FormationInfo,
  nbBeneficiaires?: number,
): string {
  const raw = BDC_NT_SOURCE[key];
  const title = bdcDocTitle(key);
  if (!raw) {
    return htmlWrap(orgHeader(org, title) + `<p style="color:#b91c1c">Document BDC introuvable (clé : ${key}).</p>` + docFooter(org));
  }
  const dates = computeDates(stagiaire || undefined, org, formation);
  const personalized = getPersonalizedRaw(key, stagiaire, org, dates, formation);
  const effectiveRaw = personalized ?? raw;
  let md = applySubstitutions(effectiveRaw, org, stagiaire, dates, formation, nbBeneficiaires);
  // BLOCS 3/5/6/9 — vocabulaire BC, droit à jour, anti-fabrication, corrections de rendu
  md = sanitizeBdcMarkdown(md, { titre: title, categorieAction: "BC" });



  if (!dates.bilanTermine && /Certificat de réalisation|Compte rendu de fin/i.test(title)) {
    md = md.replace(/\n[^|\n]{200,}\n/g, "\n[À compléter à la fin du bilan]\n");
  }
  if (/Certificat de réalisation/i.test(title) && org.tamponUrl) {
    const tampon = `\n\n<img src="${org.tamponUrl}" alt="Tampon ${org.nom || ""}" style="max-height:120px;max-width:220px;display:block;margin:8px 0;object-fit:contain;" />\n`;
    md = md.replace(/(^|\n)\s*Signature\s*$/m, `$1Signature${tampon}`);
    if (!/<img[^>]+Tampon/i.test(md)) md += tampon;
  }
  const body = mdToHtmlBody(md);
  const beneficiaireLine = stagiaire
    ? `<div style="margin:6px 0 18px;color:#475569;font-size:12px">Bénéficiaire : <strong>${stagiaire.prenom} ${stagiaire.nom}</strong></div>`
    : "";
  return htmlWrap(
    orgHeader(org, title) +
    beneficiaireLine +
    `<div class="bdc-doc-body">${body}</div>` +
    `<style>.bdc-doc-body{font-size:11pt}.bdc-doc-body table{border-collapse:collapse;width:100%;margin:10px 0;font-size:10.5pt;table-layout:fixed;word-wrap:break-word;overflow-wrap:break-word}.bdc-doc-body table td,.bdc-doc-body table th{border:1px solid #94a3b8;padding:6px 8px;vertical-align:top;text-align:left;word-wrap:break-word;overflow-wrap:break-word}.bdc-doc-body table th{background:#cfe2f3;color:#0b2545;font-weight:bold;text-align:center}.bdc-doc-body h2{font-size:14pt;color:#0b2545;margin:16px 0 8px;page-break-before:avoid;border-bottom:1px solid #0b254540;padding-bottom:4px}.bdc-doc-body h3{font-size:12pt;color:#1d4ed8;margin:14px 0 6px;page-break-before:avoid}.bdc-doc-body h4{font-size:11pt;color:#334155;margin:12px 0 4px;page-break-before:avoid}.bdc-doc-body p{margin:4px 0;line-height:1.35;text-align:justify}.bdc-doc-body strong{color:#0b2545}.bdc-doc-body ul,.bdc-doc-body ol{margin:6px 0 8px 22px}</style>` +
    docFooter(org)
  );
}

/**
 * Rendu HTML d'une fiche de phase du bilan (1 = préliminaire, 2 = investigation, 3 = conclusion).
 */
export function renderBdcNTPhaseHtml(
  phase: 1 | 2 | 3,
  org: OrganismeInfo,
  formation?: FormationInfo,
  stagiaire?: StagiaireInfo | null,
): string {
  const dates = computeDates(stagiaire || undefined, org, formation);
  const titles: Record<1 | 2 | 3, string> = {
    1: "Phase 1 — Phase préliminaire",
    2: "Phase 2 — Phase d'investigation",
    3: "Phase 3 — Phase de conclusion & suivi à 6 mois",
  };
  const body = mdToHtmlBody(buildPhaseMd(phase, org, dates, formation));
  return htmlWrap(
    orgHeader(org, titles[phase]) +
    `<div class="bdc-doc-body">${body}</div>` +
    `<style>.bdc-doc-body{font-size:11pt}.bdc-doc-body table{border-collapse:collapse;width:100%;margin:10px 0;font-size:10.5pt;table-layout:fixed;word-wrap:break-word}.bdc-doc-body table td,.bdc-doc-body table th{border:1px solid #94a3b8;padding:6px 8px;vertical-align:top;text-align:left}.bdc-doc-body table th{background:#cfe2f3;color:#0b2545;font-weight:bold;text-align:center}.bdc-doc-body h2{font-size:14pt;color:#0b2545;margin:16px 0 8px}.bdc-doc-body h3{font-size:12pt;color:#1d4ed8;margin:14px 0 6px}.bdc-doc-body p{margin:4px 0;line-height:1.35;text-align:justify}.bdc-doc-body ul,.bdc-doc-body ol{margin:6px 0 8px 22px}</style>` +
    docFooter(org)
  );
}

/** Rendu HTML du programme global des 3 phases. */
export function renderBdcNTProgrammePhasesHtml(
  org: OrganismeInfo,
  formation?: FormationInfo,
  stagiaire?: StagiaireInfo | null,
): string {
  const dates = computeDates(stagiaire || undefined, org, formation);
  const body = mdToHtmlBody(buildProgrammePhasesMd(org, dates, formation));
  return htmlWrap(
    orgHeader(org, "Programme des 3 phases du bilan de compétences") +
    `<div class="bdc-doc-body">${body}</div>` +
    `<style>.bdc-doc-body{font-size:11pt}.bdc-doc-body table{border-collapse:collapse;width:100%;margin:10px 0;font-size:10.5pt;table-layout:fixed}.bdc-doc-body table td,.bdc-doc-body table th{border:1px solid #94a3b8;padding:6px 8px;vertical-align:top;text-align:left}.bdc-doc-body table th{background:#cfe2f3;color:#0b2545;font-weight:bold;text-align:center}.bdc-doc-body h2{font-size:14pt;color:#0b2545;margin:16px 0 8px}.bdc-doc-body h3{font-size:12pt;color:#1d4ed8;margin:14px 0 6px}.bdc-doc-body p{margin:4px 0;line-height:1.35;text-align:justify}.bdc-doc-body ul,.bdc-doc-body ol{margin:6px 0 8px 22px}</style>` +
    docFooter(org)
  );
}

/**
 * Rendu HTML d'un des templates obligatoires BC (BLOC 4), identifié par son index
 * dans BDC_TEMPLATES_MANQUANTS. Utilisé pour l'aperçu/l'export unitaire dans l'app.
 */
export function renderBdcTemplateBCHtml(
  templateIdx: number,
  org: OrganismeInfo,
  formation: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaire?: StagiaireInfo | null,
): string {
  const def = BDC_TEMPLATES_MANQUANTS[templateIdx];
  if (!def) return htmlWrap(orgHeader(org, "Document indisponible"));
  const ctx = buildBdcContext(org, formation, stagiaires);
  const ben = def.parBeneficiaire
    ? (stagiaire
        ? ctx.beneficiaires.find((b) => b.nom === stagiaire.nom && b.prenom === stagiaire.prenom) || ctx.beneficiaires[0] || null
        : ctx.beneficiaires[0] || null)
    : null;
  const md = sanitizeBdcMarkdown(autofillDocument(def.build(ctx, ben), ctx, ben), {
    titre: def.nom,
    categorieAction: "BC",
    antiFabrication: antiFabricationPour(def.nom),
  });
  const body = mdToHtmlBody(md);
  const titre = def.nom.replace(/^Indicateur\s+\d+(\s*[&and]+\s*\d+)*\s*-\s*/i, "");
  const benLine = ben
    ? `<div style="margin:6px 0 18px;color:#475569;font-size:12px">Bénéficiaire : <strong>${ben.prenom} ${ben.nom}</strong></div>`
    : "";
  return htmlWrap(
    orgHeader(org, titre) +
    benLine +
    `<div class="bdc-doc-body">${body}</div>` +
    `<style>.bdc-doc-body{font-size:11pt}.bdc-doc-body table{border-collapse:collapse;width:100%;margin:10px 0;font-size:10.5pt;table-layout:fixed;word-wrap:break-word;overflow-wrap:break-word}.bdc-doc-body table td,.bdc-doc-body table th{border:1px solid #94a3b8;padding:6px 8px;vertical-align:top;text-align:left;word-wrap:break-word;overflow-wrap:break-word}.bdc-doc-body table th{background:#cfe2f3;color:#0b2545;font-weight:bold;text-align:center}.bdc-doc-body h2{font-size:14pt;color:#0b2545;margin:16px 0 8px;border-bottom:1px solid #0b254540;padding-bottom:4px}.bdc-doc-body h3{font-size:12pt;color:#1d4ed8;margin:14px 0 6px}.bdc-doc-body p{margin:4px 0;line-height:1.35;text-align:justify}.bdc-doc-body strong{color:#0b2545}.bdc-doc-body ul,.bdc-doc-body ol{margin:6px 0 8px 22px}</style>` +
    docFooter(org)
  );
}







/**
 * Convertit un dossier source (ex: "Indicateur 10", "Indicateur 23 & 24 & 25")
 * en chemin "Critere_X/Indicateur_Y" pour le ZIP final.
 */
function mapFolderToCriterePath(folder: string): string {
  if (!folder) return "";
  const m = folder.match(/Indicateur\s*(\d+)/i);
  if (!m) return folder;
  const ind = parseInt(m[1], 10);
  const crit = critereForIndicateur(ind);
  return `Critere_${crit}/Indicateur_${ind}`;
}

/** Convertit un zipPath source en chemin avec critère. */
function mapAssetPathToCriterePath(zipPath: string): string {
  if (zipPath.includes("/")) {
    const idx = zipPath.indexOf("/");
    const folder = zipPath.slice(0, idx);
    const rest = zipPath.slice(idx + 1);
    return `${mapFolderToCriterePath(folder)}/${rest}`;
  }
  const m = zipPath.match(/^Indicateur\s*(\d+)/i);
  if (m) {
    const ind = parseInt(m[1], 10);
    return `${mapFolderToCriterePath(`Indicateur ${ind}`)}/${zipPath}`;
  }
  return zipPath;
}

export async function buildBDCNTConseilsZip(
  org: OrganismeInfo,
  formation: FormationInfo,
  beneficiaires: StagiaireInfo[],
  reporter?: JobReporter,
): Promise<Blob> {
  const zip = new JSZip();
  const keys = Object.keys(BDC_NT_SOURCE).sort();
  const benList = beneficiaires.length > 0 ? beneficiaires : [{
    civilite: "M.", nom: "BENEFICIAIRE", prenom: "Modèle", email: "", telephone: "",
    entreprise: "", poste: "", dateNaissance: "",
  } as StagiaireInfo];

  // MESSAGE 23 — le LISEZMOI est écrit en fin de génération, avec le décompte
  // réel des fichiers et le nom de l'organisme du dossier (jamais celui d'un tiers).


  let step = 0;
  const totalSteps = keys.length + keys.filter(k => BDC_NT_PER_BENEFICIAIRE.has(k)).length * (benList.length - 1) + BDC_NT_STATIC_ASSETS.length;
  const advance = (msg: string) => {
    step++;
    reporter?.setProgress(Math.min(99, (step / Math.max(1, totalSteps)) * 100));
    reporter?.setMessage(msg);
  };

  // BLOC 1 — source unique de vérité + collecte des rendus pour la validation (BLOC 2)
  const bdcCtx = buildBdcContext(org, formation, benList);
  const renduParDocument: Record<string, string> = {};
  const renduParBeneficiaire: Record<string, string[]> = {};
  const nomsDocuments: string[] = [];

  const collect = (title: string, md: string, s: StagiaireInfo | null) => {
    const key = s ? `${title} — ${s.prenom} ${s.nom}` : title;
    renduParDocument[key] = md;
    nomsDocuments.push(title);
    if (s) {
      const id = `${s.prenom} ${s.nom}`;
      (renduParBeneficiaire[id] ||= []).push(md);
    }
  };

  // Helper : génère un DOCX depuis markdown + substitutions
  const genDocx = async (rawMd: string, title: string, s: StagiaireInfo | null): Promise<Blob> => {
    const dates = computeDates(s || undefined, org, formation);
    let md = applySubstitutions(rawMd, org, s, dates, formation, benList.length);
    // BLOCS 3/5/6/9
    md = sanitizeBdcMarkdown(md, { titre: title, categorieAction: "BC" });

    // Bilan en cours : on neutralise les évaluations finales
    if (!dates.bilanTermine && /Certificat de réalisation|Compte rendu de fin/i.test(title)) {
      md = md.replace(/\n[^|\n]{200,}\n/g, "\n[À compléter à la fin du bilan]\n");
    }
    if (/Certificat de réalisation/i.test(title) && org.tamponUrl) {
      const tampon = `\n\n<img src="${org.tamponUrl}" alt="Tampon ${org.nom || ""}" style="max-height:120px;max-width:220px;display:block;margin:8px 0;object-fit:contain;" />\n`;
      md = md.replace(/(^|\n)\s*Signature\s*$/m, `$1Signature${tampon}`);
      if (!/<img[^>]+Tampon/i.test(md)) md += tampon;
    }

    collect(title, md, s);
    const html = mdToHtml(md, title, org, s).replace("</body>", buildFooter(org, dates) + "</body>");
    return await htmlToWordBlob(html);
  };


  for (const key of keys) {
    const folder = key.includes("/") ? key.split("/")[0] : "";
    const critereFolder = mapFolderToCriterePath(folder);
    const baseName = fileTitle(key);
    const isPerBen = BDC_NT_PER_BENEFICIAIRE.has(key);
    const raw = BDC_NT_SOURCE[key];
    const tplMapping = BDC_TEMPLATES[key];

    if (isPerBen) {
      for (const s of benList) {
        advance(`${baseName} — ${s.prenom} ${s.nom}`);
        const benFolder = `Bénéficiaire - ${s.prenom} ${s.nom}`;
        let blob: Blob;
        let ext: "docx" | "xlsx" = "docx";
        if (tplMapping) {
          const r = await renderBdcTemplateIfMapped(key, org, formation, s);
          blob = r!.blob; ext = r!.extension;
        } else {
          const dts = computeDates(s, org, formation);
          const personalized = getPersonalizedRaw(key, s, org, dts, formation);
          blob = await genDocx(personalized ?? raw, `${baseName} – ${s.prenom} ${s.nom}`, s);
        }
        const path = critereFolder
          ? `${critereFolder}/${benFolder}/${baseName}.${ext}`
          : `Divers/${benFolder}/${baseName}.${ext}`;
        zip.file(path, blob);

      }
    } else {
      advance(baseName);
      let blob: Blob;
      let ext: "docx" | "xlsx" = "docx";
      if (tplMapping) {
        const r = await renderBdcTemplateIfMapped(key, org, formation, null);
        blob = r!.blob; ext = r!.extension;
      } else {
        blob = await genDocx(raw, baseName, null);
      }
      const path = critereFolder ? `${critereFolder}/${baseName}.${ext}` : `${baseName}.${ext}`;
      zip.file(path, blob);
    }
  }


  // === Indicateur 10 : programme détaillé des 3 phases du bilan de compétences ===

  {
    const baseName = "Indicateur 10 - Programme des 3 phases du bilan de compétences";
    advance(baseName);
    const dates = computeDates(benList[0], org, formation);
    const md = buildProgrammePhasesMd(org, dates, formation);
    const blob = await genDocx(md, baseName, null);
    zip.file(`${mapFolderToCriterePath("Indicateur 10")}/${baseName}.docx`, blob);
  }

  // === Indicateur 10 : une fiche détaillée par phase réglementaire ===
  {
    const dates = computeDates(benList[0], org, formation);
    const phases: Array<{ n: 1 | 2 | 3; nom: string }> = [
      { n: 1, nom: "Indicateur 10 - Phase 1 - Phase préliminaire" },
      { n: 2, nom: "Indicateur 10 - Phase 2 - Phase d'investigation" },
      { n: 3, nom: "Indicateur 10 - Phase 3 - Phase de conclusion" },
    ];
    for (const p of phases) {
      advance(p.nom);
      const md = buildPhaseMd(p.n, org, dates, formation);
      const blob = await genDocx(md, p.nom, null);
      zip.file(`${mapFolderToCriterePath("Indicateur 10")}/${p.nom}.docx`, blob);
    }
  }



  // Static assets — si un template automatisé existe pour la clé, on l'utilise à la place.
  for (const a of BDC_NT_STATIC_ASSETS) {
    advance(a.zipPath.split("/").pop() || a.zipPath);
    try {
      // Cherche un template mappé via le nom de l'asset (sans extension)
      const keyNoExt = a.zipPath.replace(/\.(xlsx|docx|pdf)$/i, "");
      const tplMapping = BDC_TEMPLATES[keyNoExt];
      let buf: ArrayBuffer | null = null;
      if (tplMapping) {
        const r = await renderBdcTemplateIfMapped(keyNoExt, org, formation, null);
        if (r) buf = await r.blob.arrayBuffer();
      }
      if (!buf) {
        const res = await fetch(a.src);
        if (res.ok) buf = await res.arrayBuffer();
      }
      if (buf) zip.file(mapAssetPathToCriterePath(a.zipPath), buf);
    } catch (e) {
      console.warn("[BDC NT] asset failed", a.src, e);
    }
  }

  // === MESSAGE 21 : les 4 classeurs autrefois importés sont désormais produits ===
  for (const c of BDC_CLASSEURS) {
    advance(c.name);
    try {
      const html = c.build(bdcCtx);
      zip.file(`Critere_${critereForIndicateur(c.indicateur)}/Indicateur_${c.indicateur}/${c.name}`, htmlToXlsxBlob(html));
      // MESSAGE 22 : le contrôle de cohérence doit lire aussi les .xlsx
      collect(c.name.replace(/\.xlsx$/i, ""), texteClasseur(html), null);
    } catch (e) {
      console.warn("[BDC] classeur échoué", c.name, e);
    }
  }

  // === Indicateur 2 : justificatifs chiffrés (preuves des KPI) ===
  const ind2Folder = mapFolderToCriterePath("Indicateur 2");
  for (const file of BDC_NT_STATS_FILES) {
    advance(file.name);
    try {
      const html = file.build(org, formation, benList);
      const blob = htmlToXlsxBlob(html);
      zip.file(`${ind2Folder}/${file.name}`, blob);
      collect(file.name.replace(/\.xlsx$/i, ""), texteClasseur(html), null);
    } catch (e) {
      console.warn("[BDC NT] stats xlsx failed", file.name, e);
    }
  }


  // === BLOC 4 : pièces obligatoires manquantes (document de synthèse, émargements, etc.) ===
  for (const def of BDC_TEMPLATES_MANQUANTS) {
    const dossier = `Critere_${critereForIndicateur(def.indicateur)}/Indicateur_${def.indicateur}`;
    if (def.parBeneficiaire) {
      for (let i = 0; i < benList.length; i++) {
        const s = benList[i];
        const b = bdcCtx.beneficiaires[i] ?? null;
        advance(`${def.nom} — ${s.prenom} ${s.nom}`);
        try {
          const md = sanitizeBdcMarkdown(autofillDocument(def.build(bdcCtx, b), bdcCtx, b), { titre: def.nom, categorieAction: "BC", antiFabrication: antiFabricationPour(def.nom) });
          collect(def.nom, md, s);
          const dates = computeDates(s, org, formation);
          const html = mdToHtml(md, def.nom, org, s).replace("</body>", buildFooter(org, dates) + "</body>");
          zip.file(`${dossier}/Bénéficiaire - ${s.prenom} ${s.nom}/${def.nom}.docx`, await htmlToWordBlob(html));
        } catch (e) {
          console.warn("[BDC] template manquant échoué", def.nom, e);
        }
      }
    } else {
      advance(def.nom);
      try {
        const md = sanitizeBdcMarkdown(autofillDocument(def.build(bdcCtx, bdcCtx.beneficiaires[0] ?? null), bdcCtx, bdcCtx.beneficiaires[0] ?? null), { titre: def.nom, categorieAction: "BC", antiFabrication: antiFabricationPour(def.nom) });
        collect(def.nom, md, null);
        const dates = computeDates(benList[0], org, formation);
        const html = mdToHtml(md, def.nom, org, null).replace("</body>", buildFooter(org, dates) + "</body>");
        zip.file(`${dossier}/${def.nom}.docx`, await htmlToWordBlob(html));
      } catch (e) {
        console.warn("[BDC] template manquant échoué", def.nom, e);
      }
    }
  }

  // === LISEZMOI — décompte réel, organisme du dossier (MESSAGE 23) ===
  {
    const fichiers = Object.keys((zip as unknown as { files: Record<string, unknown> }).files).filter((f) => !f.endsWith("/"));
    const nominatifs = fichiers.filter((f) => /Bénéficiaire - /.test(f)).length;
    const readme = [
      `DOSSIER BILAN DE COMPÉTENCES — ${(org.nom || "").toUpperCase()}`,
      "=".repeat(40),
      "",
      `Organisme : ${org.nom}`,
      `SIRET : ${org.siret}    NDA : ${org.nda}`,
      `Bénéficiaires : ${benList.length}`,
      `Édition du ${fmtDateFR(new Date())}`,
      "",
      "Structure :",
      "  - Critere_X / Indicateur_Y / documents collectifs",
      "  - Critere_X / Indicateur_Y / Bénéficiaire - Prénom NOM / documents nominatifs",
      "",
      `Fichiers du dossier : ${fichiers.length + 2}`,
      `Dont pièces nominatives : ${nominatifs} (${benList.length ? Math.round(nominatifs / benList.length) : 0} par bénéficiaire)`,
      "",
      "Le fichier 00_CONTROLE_DE_COHERENCE.txt liste les règles bloquantes et les alertes.",
      "Aucune donnée du dossier ne doit être postérieure à la date d'édition ci-dessus.",
    ].join("\n");
    zip.file("LISEZMOI.txt", readme);
    collect("LISEZMOI", readme, null);
  }

  // === BLOC 2 + BLOC 8 : rapport de contrôle de cohérence et couverture des indicateurs ===
  try {
    const rapport = validerDossierBDC(bdcCtx, {
      parDocument: renduParDocument,
      parBeneficiaire: renduParBeneficiaire,
      noms: nomsDocuments,
    });
    const couverture = calculerCouverture(nomsDocuments);
    const applicables = couverture.filter((c) => c.statut !== "non_applicable");
    const lignes: string[] = [
      "CONTRÔLE DE COHÉRENCE DU DOSSIER — BILAN DE COMPÉTENCES",
      "=======================================================",
      `Arrêté au ${fmtDateFR(new Date())}`,
      `Organisme : ${bdcCtx.organisme.raisonSociale} — SIRET ${bdcCtx.organisme.siret}`,
      mentionNDA(bdcCtx.organisme),
      `Bénéficiaires : ${bdcCtx.beneficiaires.length}`,
      `Nature de l'engagement : ${typeContrat(bdcCtx.prestation).libelle}`,
      `Financeur : ${bdcCtx.prestation.financeur}`,
      `Prix : ${formatPrix(bdcCtx.organisme, bdcCtx.prestation)}`,
      formatDuree(bdcCtx.prestation),
      "",
      "RÈGLES BLOQUANTES",
      "-----------------",
      ...rapport.bloquantes.map((x) => `[${x.ok ? "OK " : "KO "}] ${x.code} — ${x.libelle}${x.ok ? "" : ` → ${x.message || ""}`}${x.details?.length ? `\n        ${x.details.join("\n        ")}` : ""}`),
      "",
      "ALERTES",
      "-------",
      ...rapport.alertes.map((x) => `[${x.ok ? "OK " : "!! "}] ${x.code} — ${x.libelle}${x.ok ? "" : ` → ${x.message || ""}`}`),
      "",
      "COUVERTURE DES INDICATEURS",
      "--------------------------",
      `Indicateurs applicables : ${applicables.length} — non applicables en BC : ${INDICATEURS_NON_APPLICABLES_BC.join(", ")}`,
      ...couverture.map((c) => `Indicateur ${String(c.indicateur).padStart(2, "0")} (C${c.critere}) : ${c.statut.toUpperCase()}${c.piecesAttendues.length ? ` — attendu : ${c.piecesAttendues.join(" ; ")}` : ""}`),
      "",
      `EXPORT ${rapport.exportAutorise ? "CONFORME" : "NON CONFORME — corriger les règles KO ci-dessus"}`,
    ];
    zip.file("00_CONTROLE_DE_COHERENCE.txt", lignes.join("\n"));
  } catch (e) {
    console.warn("[BDC] rapport de cohérence échoué", e);
  }


  reporter?.setProgress(99);
  reporter?.setMessage("Compression du ZIP…");
  // STORE + streamFiles : PDF/XLSX déjà compressés → ZIP plus rapide et moins de RAM
  const blob = await zip.generateAsync(
    { type: "blob", compression: "STORE", streamFiles: true },
    (meta) => reporter?.setProgress(Math.min(100, 99 + meta.percent / 100))
  );
  reporter?.setProgress(100);
  return blob;
}
