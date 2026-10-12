/**
 * Générateur du dossier BDC complet — trame "NT Conseils"
 * Produit un ZIP fidèle à la structure du dossier source : 14 indicateurs,
 * documents collectifs + documents personnalisés par bénéficiaire.
 *
 * Personnalisation :
 *   - Substitutions org/bénéficiaire/dates intelligentes (jamais "today")
 *   - Toutes les pièces en PDF (htmlToPdfBlob), arborescence « MMF - BDC » (skill /bdc)
 *   - Assets statiques (xlsx, pdf) téléchargés depuis /pdfs/bdc_nt/
 */
import JSZip from "jszip";
import { limiterCheminsZip } from "@/lib/fileNaming";
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import { htmlWrap, orgHeader, footer as docFooter } from "@/lib/docBuilder";
import { BDC_NT_SOURCE, BDC_NT_PER_BENEFICIAIRE, BDC_NT_STATIC_ASSETS } from "./bdcNTSource";
import { BDC_TEMPLATES, renderBdcTemplateIfMapped } from "./bdcTemplateMap";
import { getBdcDomainProfile } from "@/lib/templatesBDC";
import type { JobReporter } from "@/lib/backgroundJobs";
import { BDC_NT_STATS_FILES } from "./bdcNTStatsXlsx";
import { BDC_CLASSEURS, texteClasseur } from "./bdcClasseursXlsx";
import { htmlToXlsxBlob } from "@/lib/htmlToXlsx";
import { buildBdcContext, fmtDateFR, regionFromCodePostal, tribunalFromCodePostal, profilDeclaratif, repartitionHeures, dureeBilanH, seancesFor, prestationFor, etatBilan, parseDateAny, DELAI_RETRACTATION_BC, MENTION_MCF_BC, financeurEffectifBC, bcCertifieAu, type BdcContext, type Beneficiaire } from "./bdcModel";
import { genAnalyseRisquesQualite, genClausesQualiteContrat } from "@/lib/qualite2026";
import { entreesCatalogueTypeAudit, renderTypeAuditTemplate } from "@/lib/piecesTypeAudit";
import { buildSuivi6MoisIndividuel } from "./bdcNTStatsXlsx";
import { mdProcessSuivi6Mois, mdProcessObjectifs, mdProcessPositionnement, mdProcessInformationPublics, mdInformationsPratiquesDistance, mdAccuseReception, mdFicheCompetencesConsultant, mdReseauActeurs, mdObjectifsIndividualises, mdCVConsultant } from "./bdcPiecesMMF";
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
  // Entretien intermédiaire : formalisé en séance, il sort complété et daté.
  if (/entretien interm[ée]diaire/i.test(nom)) return false;
  // Test de personnalité : outil d'investigation complété et restitué en séance.
  if (/test de personnalit[ée]/i.test(nom)) return false;
  // Questionnaires de satisfaction (bénéficiaire à chaud / à froid, interne) :
  // recueillis en fin de prestation, ils sortent renseignés et datés.
  if (/satisfaction/i.test(nom)) return false;
  // Supports de cours / ressources pédagogiques (indicateur 19) : contenus de formation.
  if (/support de cours|ressources p[ée]dagogiques/i.test(nom)) return false;
  return isDocumentDeclaratif(nom) || /synth[èe]se/i.test(nom);
}


import { BDC_TEMPLATES_MANQUANTS, bdcTemplateApplicable } from "./bdcTemplatesBC";
import { autofillDocument } from "../autofill";
import { validerDossierBDC } from "./bdcValidation";


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

/** Profil de domaine métier, ou null si l'intitulé n'en désigne aucun (« Bilan de compétences »). */
function domaineMetier(formation?: FormationInfo) {
  if (!formation) return null;
  const p = getBdcDomainProfile(formation);
  return p.generique ? null : p;
}

/** Contexte BDC + bénéficiaire correspondant au stagiaire (dates, profil, séances propres). */
function benCtx(org: OrganismeInfo, formation: FormationInfo | undefined, s: StagiaireInfo, stagiaires?: StagiaireInfo[]): { ctx: BdcContext; b: Beneficiaire | null } {
  const liste = stagiaires && stagiaires.some((x) => x.nom === s.nom && x.prenom === s.prenom) ? stagiaires : [s];
  const ctx = buildBdcContext(org, formation || ({} as FormationInfo), liste);
  const b = ctx.beneficiaires.find((x) => x.nom === (s.nom || "") && x.prenom === (s.prenom || "")) || ctx.beneficiaires[0] || null;
  return { ctx, b };
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
  const maj = parseDateFR(org?.dateMaj);
  const plancher = (d: Date) => (maj && d < maj && maj <= debut ? new Date(maj) : d);
  const conv = plancher(minusBusinessDays(debut, 14));
  const outilPrepBrut = plancher(minusBusinessDays(debut, 20, true));
  const outilPrep = outilPrepBrut > conv ? conv : outilPrepBrut;
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
function applySubstitutions(src: string, org: OrganismeInfo, s: StagiaireInfo | null, dates: DatesCtx, formation?: FormationInfo, _nbBeneficiaires?: number): string {
  let txt = src.normalize("NFC");
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
    [/Tribunal\s+de\s+Grande\s+Instance\s+de\s+Nanterre/gi, tribunalFromCodePostal(org.codePostal)],
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
  } else {
    // Pièce collective (ex. engagements déontologiques) : le signataire est le consultant.
    const consultant = (formation?.formateur || org.dirigeant || "Le consultant").trim();
    txt = txt.replace(/M\.\s*ZOCLY\s+Marc|ZOCLY\s+Marc|\bZOCLY\b/g, consultant);
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
  // Durée de la prestation : durée saisie plafonnée à 24 h (art. L6313-4), identique dans toutes les pièces.
  const dureeH = dureeBilanH(formation);
  const dureeNorm = `${dureeH} heures`;
  const rh = repartitionHeures(dureeH);
  txt = txt.replace(/24\s*heures\s*\/\s*2\s*heures\s*par\s*semaine/gi, dureeNorm);
  txt = txt.replace(/(?<!\d)24\s*heures/gi, dureeNorm);
  txt = txt
    .replace(/\{H_P1\}/g, String(rh.p1)).replace(/\{H_P2\}/g, String(rh.p2)).replace(/\{H_P3\}/g, String(rh.p3)).replace(/\{H_TOTAL\}/g, String(dureeH))
    .replace(/\{REPARTITION_HEURES\}/g, `phase préliminaire ${rh.p1} h, phase d'investigation ${rh.p2} h, phase de conclusion ${rh.p3} h`)
    .replace(/\{DATE_MAJ\}/g, dates.dateVersion)
    .replace(/\{ORG_NDA_PHRASE\}/g, phraseNda)
    .replace(/\{TRIBUNAL\}/g, tribunalFromCodePostal(org.codePostal))
    .replace(/\{CONSULTANT\}/g, formation?.formateur || org.responsablePedagogique || dirigeant);

  // Convention : bipartite / tripartite selon le financeur réel du bénéficiaire.
  {
    const pf = s ? profilDeclaratif(s, formation) : null;
    const tripartite = pf?.origine === "employeur";
    const entreprise = (s?.entreprise || "").trim();
    const financement: Record<string, string> = {
      CPF: "Financement : compte personnel de formation du bénéficiaire, via la plateforme Mon Compte Formation.",
      employeur: `Financement : ${entreprise || "l'employeur"} prend en charge le coût du bilan au titre de son plan de développement des compétences ; paiement à réception de la facture, après réalisation.`,
      OPCO: `Financement : ${entreprise || "l'employeur"} prend en charge le coût du bilan au titre de son plan de développement des compétences, avec la participation de son OPCO ; paiement à réception de la facture.`,
      personnel: "Financement : le bénéficiaire finance personnellement la prestation. Aucune somme n'est exigée avant l'expiration du délai de rétractation ; l'acompte éventuel est ensuite plafonné à 30 % du prix.",
      "France Travail": "Financement : compte personnel de formation du bénéficiaire, avec abondement éventuel de France Travail selon la décision de son conseiller.",
      "Région": "Financement : dispositif régional, selon la décision de prise en charge notifiée au bénéficiaire.",
      "Transitions Pro": "Financement : association Transitions Pro, selon la décision de prise en charge.",
    };
    txt = txt
      .replace(/\{CONVENTION_TITRE\}/g, tripartite ? "CONVENTION TRIPARTITE DE BILAN DE COMPÉTENCES" : "CONTRAT DE PRESTATION DE BILAN DE COMPÉTENCES")
      .replace(/\{CONVENTION_EMPLOYEUR\}/g, tripartite ? `- **${entreprise || "L'employeur"}**, employeur du bénéficiaire${s?.responsableEntreprise ? `, représenté par ${s.responsableEntreprise}` : ""}${s?.siretEntreprise ? ` — SIRET ${s.siretEntreprise}` : ""}\n\nci-après « l'employeur »,\n\n` : "")
      .replace(/\{CONVENTION_ACCORD\}/g, "")
      .replace(/\{CONVENTION_BASE\}/g, tripartite
        ? "de l'article R6313-8 du Code du travail (bilan réalisé dans le cadre du plan de développement des compétences)"
        : pf?.financeur === "CPF"
          ? "des articles L6353-3 à L6353-7 du Code du travail et des conditions générales d'utilisation de Mon Compte Formation"
          : "des articles L6353-3 à L6353-7 du Code du travail")
      .replace(/\{CONVENTION_FINANCEMENT\}/g, financement[pf?.financeur || "CPF"] || financement.CPF)
      .replace(/\{CONVENTION_DELAI\}/g, tripartite
        ? "Le salarié dispose de 10 jours à compter de la transmission de la présente convention pour l'accepter en la signant ; l'absence de réponse vaut refus, lequel ne constitue ni une faute ni un motif de licenciement (art. R6313-8). Le bilan ne débute qu'après signature des trois parties."
        : DELAI_RETRACTATION_BC + (pf?.financeur === "CPF" ? MENTION_MCF_BC : ""))
      .replace(/\{CONVENTION_EXEMPLAIRES\}/g, tripartite ? "trois" : "deux");
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
  txt = txt.replace(/\{DUREE_FORMATION\}/g, dureeNorm);

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
    void d;
    return [
      "Un premier entretien préalable à l'inscription, gratuit et sans engagement, vérifie que le bilan de compétences répondra aux attentes du bénéficiaire. Une fois l'inscription finalisée, la prestation comprend " + dureeNorm + " d'entretiens individuels avec le consultant, répartis en trois phases :",
      "",
      `- phase préliminaire : ${rh.p1} h`,
      "",
      `- phase d'investigation : ${rh.p2} h (le travail personnel entre les séances n'est pas décompté)`,
      "",
      `- phase de conclusion : ${rh.p3} h, avec remise du document de synthèse`,
      "",
      "- un entretien de suivi est proposé six mois après la fin du bilan (hors durée facturée)",
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
  txt = txt.replace(/\{BDC_TARIF_RAW\}/g, (() => {
    const t = (formation?.tarif || "").trim();
    return t || "Tarif communiqué sur devis personnalisé";
  })());
  txt = txt.replace(/\{BDC_DELAI_ACCES\}/g, (() => {
    const d = (formation?.delaiAcces || "").trim();
    if (!d) return "un délai minimum de 11 jours ouvrés entre l'inscription et le démarrage";
    return /jour|mois|semaine/i.test(d) ? d : `un délai de ${d}`;
  })());

  // Placeholders Informations périphériques (IND 9) — alimentés depuis le formulaire organisme
  const orgTelLine = orgTel ? `\n- Téléphone : ${orgTel}` : "";
  txt = txt
    .replace(/\{ORG_ADRESSE_COMPLETE\}/g, orgAdresse || "[Adresse de l'organisme]")
    .replace(/\{VILLE_ORG\}/g, villeOrg)
    .replace(/\{ORG_EMAIL\}/g, orgEmail)
    .replace(/\{ORG_TEL_LINE\}/g, orgTelLine)
    .replace(/\{ORG_TELEPHONE\}/g, orgTel || "");

  // Placeholders Entretien annuel / recrutement (IND 21) — alimentés depuis l'organisme + la formation
  const profileBdc = domaineMetier(formation);
  const secteurTxt = profileBdc ? `(notamment ${profileBdc.secteur})` : "";
  const secteurPhrase = profileBdc ? ` (notamment dans le secteur ${profileBdc.secteur})` : "";
  const secteurPhrase2 = profileBdc ? ` autour du métier de ${profileBdc.metier} et de secteurs voisins` : " sur des domaines variés";
  txt = txt
    .replace(/\{ENTRETIEN_DATE\}/g, dates.dateVersion)
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

  // Organisme non certifié Qualiopi « bilans de compétences » : CPF et financeurs publics impossibles
  // (art. L6316-1) — on retire toute mention d'inscription via Mon Compte Formation.
  if (!bcCertifieAu(org, new Date())) {
    const nonMob = "le CPF et les financeurs publics ne sont pas mobilisables tant que l'organisme ne détient pas la certification qualité pour la catégorie « bilans de compétences » (art. L6316-1 du Code du travail)";
    txt = txt
      .replace(/^\|\s*Actif \(salarié, indépendant, demandeur d'emploi\) à son initiative\s*\|[^\n]*$/m, `| Actif (salarié, indépendant, demandeur d'emploi) à son initiative | Financement personnel — ${nonMob} | Contrat de prestation ; rétractation de 14 jours |`)
      .replace(/^\|\s*Demandeur d'emploi\s*\|\s*CPF[^\n]*\n/m, "")
      .replace(/^- Via le Compte Personnel de Formation \(CPF\)[^\n]*\n+/m, `- Le ${nonMob.charAt(0) === "l" ? nonMob.slice(3) : nonMob} ;\n\n`)
      .replace(/^- Via Mon Compte Formation \/ EDOF[^\n]*\n+/m, "")
      .replace(/^Lorsque l'inscription est réalisée via Mon Compte Formation[^\n]*\n+/m, "")
      .replace(/En cas d'inscription via Mon Compte Formation[^.]*\.\s?/g, "");
  }
  txt = txt.replace(/rétractation de 10 jours \(art\. L6353-5\), 14 jours à distance \(art\. L221-18 du Code de la consommation\)/g, "rétractation de 14 jours calendaires (art. L6353-5 du Code du travail et L221-18 du Code de la consommation)");
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
  formation?: FormationInfo,
): string {
  const nom = `${s.prenom || ""} ${s.nom || ""}`.trim() || "Bénéficiaire";
  const poste = (s.poste || "").trim();
  const entreprise = (s.entreprise || "").trim();
  const handicap = s.rqth === "oui" ? "Oui" : "Non";
  const civ = s.civilite === "Mme" ? "Madame" : s.civilite === "M." ? "Monsieur" : "";
  const pf = profilDeclaratif(s, formation, domaineMetier(formation) || undefined);
  const rh = repartitionHeures(dureeBilanH(formation));
  const admin = ({
    CPF: "Financement CPF : inscription à valider sur Mon Compte Formation (démarrage au plus tôt 11 jours ouvrés après validation).",
    employeur: "Financement employeur : convention tripartite à émettre ; délai de 10 jours laissé au salarié.",
    OPCO: "Financement employeur avec participation OPCO : convention tripartite à émettre.",
    personnel: "Financement personnel : contrat à émettre, délai de rétractation de 14 jours à respecter avant tout paiement.",
    "France Travail": "Financement CPF avec abondement France Travail : accord du conseiller à joindre.",
  } as Record<string, string>)[pf.financeur] || "Plan de financement à confirmer.";
  const initiative = pf.origine === "employeur" ? "Non — à l'initiative de l'employeur (plan de développement des compétences)" : "Oui";
  const contacts = [s.email, s.telephone].filter(Boolean).join(" · ") || ZONE;
  const carac = poste ? `Poste actuel : ${poste}${entreprise ? ` — ${entreprise}` : ""}` : "Situation professionnelle à préciser en entretien";
  const consultant = formation?.formateur || org.responsablePedagogique || org.dirigeant || "le consultant désigné";

  return `**OUTIL PRÉPARATOIRE BÉNÉFICIAIRE**

**Date de l'entretien :** ${dates.dateOutilPrep}

**Bénéficiaire : ${`${civ} ${nom}`.trim()}**

**Contacts : ${contacts}**

**Dates du bilan de compétences prévues : du ${dates.dateDebut} au ${dates.dateFin}**

1)  **Bénéficiaire**

| **Caractéristiques et spécificités :** |
| ${carac} |
| **Situation de handicap ?** ${handicap}${handicap === "Oui" ? " — voir process handicap" : ""} |

2)  **Désirs / souhaits** (exprimés par le bénéficiaire pendant l'entretien)

| **Bilan de compétences à l'initiative du bénéficiaire ?** ${initiative} |
| **Motivations :** ${pf.declare ? pf.attente : ZONE} |
| **Objectifs du bilan de compétences :** ${ZONE} |
| **Remarques autres :** ${ZONE} |

3)  **Hypothèses** (proposées par l'organisme)

| **Rythmes et temps de prestation :** ${rh.p1 + rh.p2 + rh.p3} heures d'entretiens : ${rh.p1} h en phase préliminaire, ${rh.p2} h en investigation, ${rh.p3} h en conclusion ; calendrier convenu avec le bénéficiaire (planning prévisionnel) |
| **Modalités pédagogiques, contenus, supports et outils :** entretiens individuels, questionnaire d'intérêts, test de personnalité, enquêtes métier, travail personnel entre les séances |
| **Environnement de la prestation :** ${formation?.modalites || "selon la modalité retenue"}${formation?.lieu ? ` — ${formation.lieu}` : ""} |
| **Structuration de l'équipe pédagogique :** consultant : ${consultant} ; référent handicap : ${org.referentHandicap || org.dirigeant || ""} |

| **Cadre réservé au service administratif :** ${admin} |
`;
}

const FICHE_ANALYSE_BESOIN_KEY = "Indicateur 4/Indicateur 4 - Fiche d'analyse de besoin";
const FICHE_PREALABLE_KEY = "Indicateur 4/Indicateur 4 - Fiche préalable au bilan de compétences";

/** Coche "X" si vrai, espace sinon — rendu cohérent avec les autres docs BDC. */
function chk(b: boolean): string {
  return b ? "**X**" : " ";
}

/** Zone de réponse vierge : le bénéficiaire ou le consultant la remplit à la date de l'étape. */
const ZONE = "______________________________________________________________";
const zone = (n = 2) => Array.from({ length: n }, () => ZONE).join("\n\n");
const cases = (items: string[]) => items.map((x) => `☐ ${x}`).join(" · ");

/** Expériences déclarées (fiche stagiaire) — jamais complétées par défaut. */
function experiencesDeclareesMd(s: StagiaireInfo): string {
  const ex = (s.experiences || []).filter((e) => (e.poste || "").trim());
  if (!ex.length) return zone(3);
  const mois = (x: string) => { const m = (x || "").match(/^(\d{4})-(\d{2})/); return m ? `${m[2]}/${m[1]}` : x; };
  return ex.map((e) => `- ${e.poste}${e.employeur ? ` — ${e.employeur}` : ""}${e.debut ? ` (${mois(e.debut)}${e.fin ? ` à ${mois(e.fin)}` : " à aujourd'hui"})` : ""}${e.activites ? ` : ${e.activites.split(/\r?\n/).filter(Boolean).join(" ; ")}` : ""}`).join("\n");
}

function buildFicheAnalyseBesoinMd(
  s: StagiaireInfo,
  org: OrganismeInfo,
  dates: DatesCtx,
  formation?: FormationInfo,
): string {
  const nom = `${s.prenom || ""} ${s.nom || ""}`.trim() || "Bénéficiaire";
  const tel = s.telephone || "";
  const poste = (s.poste || "").trim();
  const entreprise = (s.entreprise || "").trim();
  const consultant = formation?.formateur || org.responsablePedagogique || org.dirigeant || "Le consultant désigné";
  const pf = profilDeclaratif(s, formation, domaineMetier(formation) || undefined);
  const isSalarie = pf.situation === "salarie";
  const isDE = pf.situation === "demandeur_emploi";
  const handicap = s.rqth === "oui";
  const origine = pf.origine === "employeur" ? (pf.financeur === "OPCO" ? "OPCO" : "Employeur")
    : pf.origine === "prescripteur" ? "France Travail"
    : pf.financeur === "CPF" ? "CPF" : "Initiative personnelle";
  const modaliteRetenue = (formation?.modalites || "").toLowerCase();
  const isPres = /pr.sentiel/.test(modaliteRetenue) && !/distan/.test(modaliteRetenue);
  const isDist = /distan/.test(modaliteRetenue) && !/pr.sent/.test(modaliteRetenue);
  const isMix = /mixte|hybride/.test(modaliteRetenue);
  const seancesB = Object.values(benCtx(org, formation, s).ctx.seancesParBeneficiaire)[0] || [];
  const rythme = seancesB.length ? `${seancesB.length} séances individuelles, du ${fmtShortDate(seancesB[0].date)} au ${fmtShortDate(seancesB[seancesB.length - 1].date)} (planning prévisionnel annexé)` : "Selon le planning prévisionnel";

  return `**FICHE D'ANALYSE DU BESOIN**

**Bilan de compétences**

Les rubriques 3, 5, 6 et 7 sont remplies pendant l'entretien préalable, avec les mots du bénéficiaire.

**1. Identification du bénéficiaire**

| **Nom et prénom** | ${nom} |
| **Date de naissance** | ${s.dateNaissance || ""} |${tel ? `
| **Téléphone** | ${tel} |` : ""}
| **E-mail** | ${s.email || ""} |
| **Situation actuelle** | ${chk(isSalarie)} Salarié(e) · ${chk(isDE)} Demandeur d'emploi · ${chk(false)} Travailleur indépendant · ${chk(false)} Autre |
| **Poste occupé** | ${poste || ""} |
| **Entreprise** | ${entreprise || ""} |
| **Date de l'entretien préalable** | ${dates.dateOutilPrep} |
| **Nom du consultant** | ${consultant} |

**2. Origine de la demande**

${chk(origine === "Initiative personnelle")} Initiative personnelle · ${chk(origine === "Employeur")} Employeur · ${chk(origine === "France Travail")} France Travail · ${chk(origine === "CPF")} CPF · ${chk(origine === "OPCO")} OPCO

**3. Objet de la démarche**

${cases(["Faire le point sur mes compétences", "Évoluer dans mon métier", "Préparer une reconversion professionnelle", "Retrouver un emploi", "Créer ou reprendre une entreprise", "Confirmer un projet professionnel", "Identifier des pistes d'évolution"])}

**Précisions :** ${pf.declare ? pf.attente : ZONE}

**4. Situation professionnelle et parcours**

**Formation initiale / diplôme :** ${pf.niveauEtudes || ZONE}

**Principales expériences professionnelles :**

${experiencesDeclareesMd(s)}

**Compétences ou savoir-faire identifiés :** ${ZONE}

**5. Motivations et attentes du bénéficiaire**

**Qu'attendez-vous du bilan de compétences ?** ${pf.declare ? pf.attente : ZONE}

**Quels sont vos objectifs à l'issue du bilan ?** ${ZONE}

**6. Contraintes et points de vigilance**

| **Contraintes horaires** | ${ZONE} |
| **Contraintes géographiques** | ${ZONE} |
| **Contraintes personnelles ou familiales** | ${ZONE} |
| **Situation de handicap nécessitant un aménagement** | ${chk(handicap)} Oui · ${chk(!handicap)} Non${handicap ? " — voir process handicap" : ""} |

**7. Analyse du besoin**

**Le besoin exprimé est-il cohérent avec la prestation de bilan de compétences ?** ☐ Oui · ☐ Non

**Besoins identifiés :** ${cases(["Analyse du parcours professionnel", "Identification des compétences", "Exploration des métiers et secteurs", "Construction d'un projet professionnel", "Validation du projet", "Élaboration d'un plan d'action"])}

**Commentaire du bénéficiaire :**

${zone(3)}

**8. Modalités d'accompagnement retenues**

| **Modalité** | ${chk(isPres)} Présentiel · ${chk(isDist)} Distanciel · ${chk(isMix)} Mixte |
| **Durée prévisionnelle** | ${dureeBilanH(formation)} heures |
| **Rythme envisagé** | ${rythme} |
| **Aménagements spécifiques** | ${handicap ? "À étudier avec le référent handicap" : "Aucun besoin signalé à l'inscription"} |

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
  void org;
  const nom = `${s.prenom || ""} ${s.nom || ""}`.trim() || "Bénéficiaire";
  const tel = s.telephone || "";
  const poste = (s.poste || "").trim();
  const entreprise = (s.entreprise || "").trim();
  const handicap = s.rqth === "oui";
  const pf = profilDeclaratif(s, formation, domaineMetier(formation) || undefined);
  const isSalarie = pf.situation === "salarie";
  const isDE = pf.situation === "demandeur_emploi";
  const source = pf.source;
  const fin = ({ CPF: "CPF", employeur: "Employeur", OPCO: "OPCO", "France Travail": "France Travail", personnel: "Financement personnel" } as Record<string, string>)[pf.financeur] || "";
  const modaliteRetenue = (formation?.modalites || "").toLowerCase();
  const isPres = /pr.sentiel/.test(modaliteRetenue) && !/distan/.test(modaliteRetenue);
  const isDist = /distan/.test(modaliteRetenue) && !/pr.sent/.test(modaliteRetenue);
  const isMix = /mixte|hybride/.test(modaliteRetenue);

  return `**FICHE PRÉALABLE AU BILAN DE COMPÉTENCES**

Fiche remplie par le bénéficiaire avant l'entretien préalable.

**1. Informations générales**

| **Nom et prénom** | ${nom} |
| **Date de naissance** | ${s.dateNaissance || ""} |${tel ? `
| **Téléphone** | ${tel} |` : ""}
| **E-mail** | ${s.email || ""} |

**Situation actuelle :**

${chk(isSalarie)} Salarié(e) · ${chk(isDE)} Demandeur d'emploi · ${chk(false)} Travailleur indépendant · ${chk(false)} Fonctionnaire · ${chk(false)} Autre

**Profession actuelle :** ${poste || ZONE}

**Entreprise :** ${entreprise || ZONE}

**Ancienneté dans le poste :** ${ZONE}

**2. Votre demande**

**Comment avez-vous connu notre organisme ?**

${chk(source === "Internet")} Internet · ${chk(source === "Réseaux sociaux")} Réseaux sociaux · ${chk(source === "Recommandation")} Recommandation · ${chk(source === "Employeur")} Employeur · ${chk(source === "France Travail")} France Travail

**Mode de financement envisagé :**

${chk(fin === "CPF")} CPF · ${chk(fin === "Employeur")} Employeur · ${chk(fin === "France Travail")} France Travail · ${chk(fin === "OPCO")} OPCO · ${chk(fin === "Financement personnel")} Financement personnel

**3. Vos motivations**

Pour quelles raisons souhaitez-vous réaliser un bilan de compétences ?

${cases(["Faire le point sur ma carrière", "Changer de métier", "Évoluer professionnellement", "Identifier mes compétences", "Confirmer un projet professionnel"])}

**Situation actuelle et raisons d'envisager un bilan :**

${pf.declare ? pf.attente : zone(2)}

**4. Vos attentes**

${cases(["Identifier mes compétences et aptitudes", "Construire un projet professionnel", "Valider un projet existant", "Élaborer un plan d'action", "Mieux me connaître"])}

**Quels résultats espérez-vous obtenir ?** ${ZONE}

**5. Votre parcours**

**Niveau d'études / diplôme :** ${pf.niveauEtudes || ZONE}

**Principales expériences professionnelles :**

${experiencesDeclareesMd(s)}

**6. Contraintes et besoins spécifiques**

**Contraintes particulières :** ${ZONE}

**Modalité de l'accompagnement :** ${chk(isPres)} Présentiel · ${chk(isDist)} À distance · ${chk(isMix)} Mixte

**Aménagement spécifique lié à une situation de handicap :** ${chk(handicap)} Oui · ${chk(!handicap)} Non${handicap ? " — voir process handicap" : ""}

**7. Disponibilités**

**Jours disponibles :** ${cases(["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"])}

**Créneaux souhaités :** ${cases(["Matin", "Après-midi", "Soirée"])}

**8. Observations complémentaires**

${zone(2)}

**9. Validation**

**Date :** ${dates.dateOutilPrep}

**Signature du bénéficiaire :** ${nom}
`;
}

const TEST_POSITIONNEMENT_KEY = "Indicateur 4/Indicateur 4 - Auto-diagnostic préliminaire";

function buildTestPositionnementMd(
  s: StagiaireInfo,
  org: OrganismeInfo,
  _dates: DatesCtx,
  formation?: FormationInfo,
): string {
  const nom = `${s.prenom || ""} ${s.nom || ""}`.trim() || "Bénéficiaire";
  const poste = (s.poste || "").trim();
  const entreprise = (s.entreprise || "").trim();
  const pf = profilDeclaratif(s, formation, domaineMetier(formation) || undefined);
  const orgNom = org.nom || "[Organisme]";
  const consultantNom = (formation?.formateur || org.responsablePedagogique || org.dirigeant || "Le consultant").toString();
  const datePassation = _dates?.dateOutilPrep || _dates?.dateDebut || "";
  const critLib = [
    "Clarté de la demande et du besoin exprimé",
    "Connaissance de son parcours et de ses compétences",
    "Capacité d'auto-analyse et de recul",
    "Définition du projet professionnel",
    "Connaissance du marché de l'emploi et des métiers visés",
    "Implication et disponibilité dans la démarche",
  ];
  const q = (n: number, texte: string, reponse?: string) => `Question ${n} : ${texte}\n\n${reponse || zone(3)}`;

  return `**[${orgNom}]{.underline}**

**TEST DE POSITIONNEMENT — AUTO-DIAGNOSTIC PRÉLIMINAIRE**

_Réalisé lors de l'entretien de la phase préliminaire (art. R6313-4) : il sert à analyser la demande et le besoin, pas à évaluer des acquis. Le bénéficiaire répond avec ses propres mots ; le consultant cote ensuite la grille avec lui._

**Bénéficiaire : ${nom}**${poste ? `\n\n**Poste actuel : ${poste}**` : ""}${entreprise ? `\n\n**Entreprise : ${entreprise}**` : ""}

${q(1, "Quelles sont vos principales motivations pour entreprendre un bilan de compétences ?", pf.declare ? pf.attente : undefined)}

${q(2, "Pouvez-vous décrire brièvement votre parcours professionnel jusqu'à présent ?", (s.experiences || []).some((e) => (e.poste || "").trim()) ? experiencesDeclareesMd(s) : undefined)}

${q(3, "Quels sont selon vous vos points forts sur le plan professionnel ?")}

${q(4, "Quels sont vos objectifs professionnels à court, moyen et long terme ?")}

${q(5, "Pourquoi pensez-vous avoir besoin d'un bilan de compétences à ce stade de votre carrière ?")}

${q(6, "Qu'attendez-vous spécifiquement de ce bilan de compétences ?")}

**GRILLE D'ANALYSE DE LA DEMANDE** _(cotation de 1 à 5 : 1 = très insuffisant, 5 = très satisfaisant)_

| Critère évalué | Note | Observation du consultant |
|---|---|---|
${critLib.map((c) => `| ${c} | ___ /5 |  |`).join("\n")}
| **TOTAL** | ___ /30 |  |

**APPRÉCIATION DU CONSULTANT**

${zone(3)}

**Axes de travail retenus pour la phase d'investigation :** ${ZONE}

**Consultant :** ${consultantNom}

**Date de l'entretien préliminaire :** ${datePassation}

| Signature du bénéficiaire | Signature du consultant |
|---|---|
| ${nom} | ${consultantNom} |
`;
}


/** Programme détaillé des 3 phases réglementaires du bilan (art. R.6313-4 à R.6313-8 du Code du travail). */
function buildProgrammePhasesMd(org: OrganismeInfo, dates: DatesCtx, formation?: FormationInfo): string {
  const orgNom = org.nom || "[Organisme]";
  const consultant = ((org as any).responsablePedagogique || org.dirigeant || "[Consultant]").toString();
  const total = dureeBilanH(formation);
  const rh = repartitionHeures(total);
  const hPrelim = rh.p1;
  const hConclu = rh.p3;
  const hInvest = rh.p2;
  const hAccomp = total;


  return `**[${orgNom}]{.underline}**

**PROGRAMME DÉTAILLÉ DU BILAN DE COMPÉTENCES — LES 3 PHASES**

*Référence réglementaire : articles L6313-4 et R6313-4 à R6313-8 du Code du travail*

Prestation : Bilan de compétences — du ${dates.dateDebut} au ${dates.dateFin}
Durée totale : **${total} heures** d'accompagnement individuel avec le consultant (dont ${hAccomp} h réparties sur les 3 phases), le travail personnel guidé entre les séances n'étant pas décompté de la durée facturée.
Consultant référent : ${consultant}
Modalités générales : prestation **strictement individuelle**, en présentiel dans nos locaux et/ou en visioconférence (au choix du bénéficiaire), séances de 2 à 3 heures espacées de 7 à 15 jours, selon le planning prévisionnel signé. Confidentialité absolue : aucun document n'est transmis à un tiers sans l'accord écrit du bénéficiaire.

---

**PHASE 1 — PHASE PRÉLIMINAIRE** *(${hPrelim} heures — soit environ ${Math.max(1, Math.round(hPrelim / 2))} séance(s))*

| **Objectifs (art. R.6313-4)** | **Contenu / Déroulé** | **Modalités & outils** | **Livrables** |
|---|---|---|---|
| • Analyser la demande et le besoin du bénéficiaire§§BR§§• Déterminer le format le plus adapté à la situation et au besoin§§BR§§• Définir conjointement les modalités de déroulement du bilan§§BR§§• Informer sur les conditions de déroulement, méthodes et techniques utilisées | • Accueil, présentation de l'organisme et du cadre déontologique§§BR§§• Recueil de la demande, du contexte et des attentes§§BR§§• Vérification de l'engagement et du consentement§§BR§§• Co-construction du planning des séances§§BR§§• Information sur le financement (CPF, plan de développement, autre) | Entretien individuel en face à face ou visio (1 à 2 séances de 2 h)§§BR§§Fiche préalable au bilan§§BR§§Fiche d'analyse de besoin§§BR§§Auto-diagnostic préliminaire§§BR§§Convention tripartite ou bilatérale | Fiche d'analyse de besoin signée§§BR§§Convention de prestation§§BR§§Planning individualisé des séances |

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

**SUIVI À 6 MOIS** *(proposé au bénéficiaire, hors durée facturée — démarche qualité de l'organisme)*

| **Objectif** | **Modalités** | **Livrable** |
|---|---|---|
| Évaluer la mise en œuvre effective du plan d'action et apporter un appui complémentaire | Entretien téléphonique ou en face à face, sur rendez-vous, 6 mois après la remise de la synthèse | Compte rendu de suivi à 6 mois§§BR§§Questionnaire de satisfaction à froid |

---

**ADAPTATION ET ACCESSIBILITÉ**

Le déroulé, le rythme, la durée des séances et les supports sont adaptés à la situation de chaque bénéficiaire (contraintes professionnelles, familiales, situation de handicap). Toute adaptation est tracée dans le document « Suivi de l'adaptation à l'accompagnement ». Le référent handicap de ${orgNom} est mobilisable à tout moment de la prestation.

**CONFIDENTIALITÉ**

Conformément à l'article L.6313-4 du Code du travail, les résultats détaillés et le document de synthèse ne peuvent être communiqués à un tiers qu'avec l'accord écrit du bénéficiaire. Les documents élaborés durant le bilan sont détruits dès le terme de l'action, sauf accord écrit du bénéficiaire fondé sur la nécessité d'un suivi de sa situation (conservation de trois ans au plus, art. R6313-7).
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
  const total = dureeBilanH(formation);
  const rh = repartitionHeures(total);
  const hPrelim = rh.p1;
  const hConclu = rh.p3;
  const hInvest = rh.p2;

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

**SUIVI À 6 MOIS** *(proposé au bénéficiaire, hors durée facturée — démarche qualité de l'organisme)*

| **Objectif** | **Modalités** | **Livrable** |
|---|---|---|
| Évaluer la mise en œuvre effective du plan d'action et apporter un appui complémentaire | Entretien téléphonique ou en face à face, sur rendez-vous, 6 mois après la remise de la synthèse | Compte rendu de suivi à 6 mois§§BR§§Questionnaire de satisfaction à froid |

**CONFIDENTIALITÉ**

Conformément à l'article L.6313-4 du Code du travail, les résultats détaillés et le document de synthèse ne peuvent être communiqués à un tiers qu'avec l'accord écrit du bénéficiaire. Les documents élaborés durant le bilan sont détruits dès le terme de l'action, sauf accord écrit du bénéficiaire fondé sur la nécessité d'un suivi de sa situation (conservation de trois ans au plus, art. R6313-7).
`;
}

const FICHE_PEDA_KEY = "Indicateur 10/Indicateur 10 - Fiche p\u00e9dagogique";



function buildFichePedagogiqueMd(
  s: StagiaireInfo,
  org: OrganismeInfo,
  dates: DatesCtx,
  formation?: FormationInfo,
  stagiaires?: StagiaireInfo[],
): string {
  const nom = `${s.prenom || ""} ${s.nom || ""}`.trim() || "Bénéficiaire";
  const orgNom = org.nom || "[Organisme]";
  const consultant = formation?.formateur || org.responsablePedagogique || org.dirigeant || "[Consultant]";
  const { ctx, b } = benCtx(org, formation, s, stagiaires);
  const seances = seancesFor(ctx, b);
  const p = prestationFor(ctx, b);
  const lieuPres = [org.adresse, org.codePostal, org.ville].filter(Boolean).join(" ") || p.lieu;
  const contenus: Record<1 | 2 | 3, Array<{ titre: string; objectifs: string[]; programme: string[] }>> = {
    1: [
      { titre: "Accueil et cadrage", objectifs: ["ACCUEILLIR", "ANALYSER LA DEMANDE", "CONTRACTUALISER"], programme: ["Présentation du cadre déontologique et des modalités du bilan.", "Recueil et analyse de la demande, des attentes et du contexte.", "Validation du planning prévisionnel des séances."] },
    ],
    2: [
      { titre: "Parcours et compétences", objectifs: ["ANALYSER", "IDENTIFIER", "VALORISER"], programme: ["Analyse du parcours professionnel et extra-professionnel.", "Identification des compétences techniques et comportementales.", "Construction du portefeuille de compétences."] },
      { titre: "Intérêts, valeurs, personnalité", objectifs: ["EXPLORER", "DIAGNOSTIQUER", "PRIORISER"], programme: ["Passation et restitution du questionnaire d'intérêts et du test de personnalité.", "Clarification des valeurs professionnelles et des freins éventuels.", "Hiérarchisation des motivations et des critères de choix."] },
      { titre: "Pistes professionnelles", objectifs: ["DÉVELOPPER", "CONFRONTER", "VALIDER"], programme: ["Émergence de deux ou trois pistes professionnelles.", "Recherche documentaire (fiches ROME, RNCP, marché de l'emploi).", "Préparation et bilan des enquêtes métier."] },
    ],
    3: [
      { titre: "Plan d'action", objectifs: ["STRUCTURER", "PLANIFIER", "SÉCURISER"], programme: ["Analyse des leviers et des freins du projet.", "Élaboration du plan d'action daté et des financements mobilisables.", "Préparation des étapes à 6 et 12 mois."] },
      { titre: "Synthèse", objectifs: ["SYNTHÉTISER", "RESTITUER", "SUIVRE"], programme: ["Appropriation des résultats détaillés.", "Remise du document de synthèse au bénéficiaire.", "Proposition de l'entretien de suivi à six mois."] },
    ],
  };
  const rang: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
  const aujourdhui = Date.now();
  const blocks = seances.map((se) => {
    const liste = contenus[se.phase];
    const c = liste[Math.min(rang[se.phase]++, liste.length - 1)];
    const realisee = se.date.getTime() <= aujourdhui;
    return `**SÉANCE ${se.numero} — Phase ${se.phase === 1 ? "préliminaire" : se.phase === 2 ? "d'investigation" : "de conclusion"} — ${c.titre}**

| **Date :** ${fmtShortDate(se.date)} — ${se.heureDebut} à ${se.heureFin} | **Objectifs de la séance :** ${c.objectifs.map((o) => `• ${o}`).join(" — ")} |
|---|---|
| **Lieu :** ${se.modalite === "distanciel" ? "Visioconférence (lien nominatif)" : lieuPres} | **Numéro de séance :** ${se.numero} sur ${seances.length} |
| **Nom du consultant :** ${consultant} | **Durée de la séance :** ${se.duree} heure${se.duree > 1 ? "s" : ""} |

**Programme de la séance :**

${c.programme.map((l) => `- ${l}`).join("\n")}

**Remarques et observations :** ${realisee ? "séance réalisée conformément au planning." : "séance à venir."}
`;
  }).join("\n\n");
  const total = seances.reduce((a, x) => a + x.duree, 0);
  return `**${orgNom}**

**FICHE PÉDAGOGIQUE**

Bénéficiaire : **${nom}**

Prestation : Bilan de compétences — du ${dates.dateDebut} au ${dates.dateFin}

Durée totale : ${total} heures réparties sur ${seances.length} séances (planning prévisionnel signé)

${blocks}
`;
}

const ENTRETIEN_INTER_KEY = "Indicateur 10/Indicateur 10 - Entretien interm\u00e9diaire b\u00e9n\u00e9ficiaire";

function buildEntretienIntermediaireMd(
  s: StagiaireInfo,
  org: OrganismeInfo,
  dates: DatesCtx,
  formation?: FormationInfo,
  stagiaires?: StagiaireInfo[],
): string {
  const orgNom = org.nom || "[Organisme]";
  const civ = s.civilite === "Mme" ? "Mme" : "M.";
  const nomComplet = `${s.prenom || ""} ${s.nom || ""}`.trim() || "Bénéficiaire";
  const email = s.email || "";
  const debut = parseDateFR(s.dateDebutFormation) || parseDateFR(formation?.dateDebut) || new Date();
  const fin = parseDateFR(s.dateFinFormation) || parseDateFR(formation?.dateFin) || debut;
  const { ctx, b } = benCtx(org, formation, s, stagiaires);
  const seancesB = seancesFor(ctx, b);
  const milieu = seancesB.length ? new Date(seancesB[Math.floor((seancesB.length - 1) / 2)].date) : new Date((debut.getTime() + fin.getTime()) / 2);
  const consultant = (formation?.formateur || org.responsablePedagogique || org.dirigeant || "le consultant").toString();

  const profile = domaineMetier(formation);
  const metier = profile?.metier || "le métier visé";
  const seed = b?.profil.seed ?? hashStr(`enti|${s.prenom}|${s.nom}|${s.email}`);
  void seed; void metier;
  {
    const passe = milieu.getTime() <= Date.now();
    return `**${orgNom}**

**ENTRETIEN INTERMÉDIAIRE\\
BÉNÉFICIAIRE**

**${passe ? "Date de l'entretien" : "Date prévue de l'entretien"} :** ${fmtShortDate(milieu)} (séance médiane du planning)

**Bénéficiaire :** ${civ} ${nomComplet}

**Date de début de prestation :** ${fmtShortDate(debut)}

**Date de fin de prestation :** ${fmtShortDate(fin)}

**La prestation correspond-elle à vos attentes ?**

${zone(2)}

**Quels éléments appréciez-vous le plus ?**

${zone(2)}

**Quels éléments appréciez-vous le moins ?**

${zone(2)}

**Le consultant communique-t-il d'une façon claire et dynamique ?**

${zone(2)}

**Avez-vous des remarques à nous formuler ?**

${zone(2)}
`;
  }
}

function getPersonalizedRaw(key: string, s: StagiaireInfo | null, org: OrganismeInfo, dates: DatesCtx, formation?: FormationInfo, stagiaires?: StagiaireInfo[]): string | null {
  if (!s) return null;
  if (key === OUTIL_PREPA_KEY) return buildOutilPreparatoireMd(s, org, dates, formation);
  if (key === FICHE_ANALYSE_BESOIN_KEY) return buildFicheAnalyseBesoinMd(s, org, dates, formation);
  if (key === FICHE_PREALABLE_KEY) return buildFichePrealableMd(s, org, dates, formation);
  if (key === TEST_POSITIONNEMENT_KEY) return buildTestPositionnementMd(s, org, dates, formation);
  if (key === FICHE_PEDA_KEY) return buildFichePedagogiqueMd(s, org, dates, formation, stagiaires);
  if (key === ENTRETIEN_INTER_KEY) return buildEntretienIntermediaireMd(s, org, dates, formation, stagiaires);
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
  stagiaires?: StagiaireInfo[],
): string {
  const raw = BDC_NT_SOURCE[key];
  const title = bdcDocTitle(key);
  if (!raw) {
    return htmlWrap(orgHeader(org, title) + `<p style="color:#b91c1c">Document BDC introuvable (clé : ${key}).</p>` + docFooter(org));
  }
  const dates = computeDates(stagiaire || undefined, org, formation);
  const personalized = getPersonalizedRaw(key, stagiaire, org, dates, formation, stagiaires);
  const effectiveRaw = personalized ?? raw;
  let md = applySubstitutions(effectiveRaw, org, stagiaire, dates, formation, nbBeneficiaires);
  // BLOCS 3/5/6/9 — vocabulaire BC, droit à jour, anti-fabrication, corrections de rendu
  md = sanitizeBdcMarkdown(md, { titre: title, categorieAction: "BC", antiFabrication: antiFabricationPour(title), raisonSociale: org.nom });



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
    raisonSociale: org.nom,
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







/** Anonymise une pièce nominative sensible (synthèse, test) pour le dossier d'audit. */
function anonymiser(md: string, s: StagiaireInfo): string {
  const initiales = `${(s.prenom || "").charAt(0)}. ${(s.nom || "").charAt(0)}.`.trim();
  let out = md;
  const noms = [`${s.prenom} ${s.nom}`, `${s.nom} ${s.prenom}`, s.nom, s.prenom].filter((x) => x && x.trim().length > 1);
  for (const n of noms) out = out.split(n).join(initiales);
  return out.replace(/^.*Né\(e\) le.*$/gm, "");
}

/** Pièces nominatives dont le contenu n'est versé au dossier d'audit qu'anonymisé (art. L6313-4). */
const PIECES_CONFIDENTIELLES = /document de synth[èe]se du bilan|test de personnalit[ée]/i;

/**
 * Arborescence et libellés du dossier de référence « MMF - BDC » (skill /bdc, remap.py) :
 * information des publics en IND 9, programme et phases en IND 6, suivi à 6 mois en IND 2,
 * test de positionnement en IND 8, aucune pièce en IND 16 ni en IND 28.
 */
interface Placement { ind: number; nom: string; beneficiaire?: boolean; collectif?: boolean }
const REMAP_MMF: Array<{ de: RegExp; vers: Placement | ((ind: number) => Placement) }> = [
  { de: /^1\. Process général$/i, vers: { ind: 1, nom: "Process de diffusion de l'information" } },
  { de: /^1\. Calendrier annuel$/i, vers: { ind: 1, nom: "Calendrier annuel" } },
  { de: /^Présentation du bilan de compétences$/i, vers: { ind: 1, nom: "Fiche de présentation du bilan de compétences" } },
  { de: /^INDICATEURS DE RÉSULTATS – /i, vers: { ind: 2, nom: "Indicateurs de résultats - situation à la date d'arrêté" } },
  { de: /^Suivi à 6 mois$/i, vers: { ind: 2, nom: "Suivi à 6 mois et tableau de relance" } },
  { de: /^Compte rendu de suivi à 6 mois$/i, vers: { ind: 2, nom: "Compte rendu de suivi à 6 mois", beneficiaire: true } },
  { de: /^Auto-diagnostic préliminaire$/i, vers: { ind: 8, nom: "Test de positionnement", beneficiaire: true } },
  { de: /^Mail auto-diagnostic préliminaire$/i, vers: { ind: 8, nom: "Mail test de positionnement", beneficiaire: true } },
  { de: /^Programme des 3 phases du bilan de compétences$/i, vers: { ind: 6, nom: "Programme des 3 phases du bilan de compétences" } },
  { de: /^Phase (\d) - (.*)$/i, vers: { ind: 6, nom: "" } },
  { de: /^Convention de prestation$/i, vers: { ind: 9, nom: "Convention de prestation", beneficiaire: true } },
  { de: /^Adaptation de l.accompagnement$/i, vers: { ind: 10, nom: "Catalogue des adaptations de l'accompagnement" } },
  { de: /^Entretien intermédiaire bénéficiaire$/i, vers: { ind: 10, nom: "Entretien intermédiaire", beneficiaire: true } },
  { de: /^Planning prévisionnel signé/i, vers: { ind: 10, nom: "Planning prévisionnel signé", beneficiaire: true } },
  { de: /^Suivi de l.adaptation à l.accompagnement$/i, vers: (ind) => ({ ind, nom: "Suivi de l'adaptation à l'accompagnement" }) },
  { de: /^Document de synthèse du bilan de compétences/i, vers: { ind: 11, nom: "Document de synthèse (copie anonymisée)", beneficiaire: true } },
  { de: /^Test de personnalité/i, vers: { ind: 11, nom: "Restitution de l'inventaire de personnalité (copie anonymisée)", beneficiaire: true } },
  { de: /^Process Abandons$/i, vers: { ind: 12, nom: "Process Prévention et traitement des abandons" } },
  { de: /^Guide d.entretien des abandons$/i, vers: { ind: 12, nom: "Guide d'entretien des abandons" } },
  { de: /^CGV$/i, vers: { ind: 9, nom: "Conditions générales de vente", collectif: true } },
  { de: /^Droit à l.image$/i, vers: { ind: 9, nom: "Autorisation d'utilisation d'image et de témoignage", beneficiaire: true } },
  { de: /^Engagements déontologiques$/i, vers: { ind: 9, nom: "Engagements déontologiques du consultant", collectif: true } },
  { de: /^Règlement intérieur$/i, vers: { ind: 9, nom: "Règlement intérieur", collectif: true } },
  { de: /^Mail début de prestation$/i, vers: { ind: 9, nom: "Mail de début de prestation", beneficiaire: true } },
  { de: /^Mail envoi de la convention de prestation$/i, vers: { ind: 9, nom: "Mail envoi de la convention", beneficiaire: true } },
  { de: /^Accord de conservation/i, vers: { ind: 9, nom: "Accord de conservation et destruction des documents", beneficiaire: true } },
  { de: /^Autorisation de transmission/i, vers: { ind: 9, nom: "Autorisation de transmission du document de synthèse", beneficiaire: true } },
  { de: /^Informations périphériques/i, vers: { ind: 9, nom: "Informations périphériques (présentiel)" } },
  { de: /^Moyens, confidentialité et informations pratiques$/i, vers: { ind: 17, nom: "Moyens humains, techniques et environnement" } },
  { de: /^Entretien de recrutement$/i, vers: { ind: 21, nom: "Trame d'entretien de recrutement" } },
  { de: /^Entretien annuel$/i, vers: { ind: 22, nom: "Compte rendu d'entretien annuel" } },
  { de: /^Formations sur le handicap$/i, vers: { ind: 26, nom: "Ressources de formation sur le handicap" } },
  { de: /^Charte des formateurs sous-traitants$/i, vers: { ind: 27, nom: "Charte des consultants sous-traitants" } },
  { de: /^Questionnaire de satisfaction bénéficiaire \(à chaud\)$/i, vers: { ind: 30, nom: "Questionnaire de satisfaction à chaud", beneficiaire: true } },
  { de: /^Questionnaire de satisfaction bénéficiaire \(à froid/i, vers: { ind: 30, nom: "Questionnaire de satisfaction à froid", beneficiaire: true } },
  { de: /^Process Satisfaction$/i, vers: { ind: 30, nom: "Process Satisfaction des parties prenantes" } },
];

/** Place une pièce (indicateur d'origine + libellé) dans l'arborescence MMF. */
export function placementMMF(ind: number, libelle: string, beneficiaire: boolean): Placement {
  const nom = libelle.replace(/^\s*Indicateur\s*\d+\s*[-–:]\s*/i, "").replace(/\b([ldj])_/g, "$1'").trim();
  for (const r of REMAP_MMF) {
    const m = nom.match(r.de);
    if (!m) continue;
    if (/^Phase \d/i.test(nom)) return { ind: 6, nom: `Phase ${m[1]} - ${m[2]}`, beneficiaire: false };
    const v = typeof r.vers === "function" ? r.vers(ind) : r.vers;
    return { ind: v.ind, nom: v.nom, beneficiaire: v.collectif ? false : (v.beneficiaire ?? beneficiaire), collectif: v.collectif };
  }
  // Aucun indicateur 16 (suivi à 6 mois → IND 2) ni 28 (réseau → IND 24) pour le bilan.
  if (ind === 16) return { ind: 2, nom, beneficiaire };
  if (ind === 28) return { ind: 24, nom, beneficiaire };
  return { ind, nom, beneficiaire };
}

/** Pied de page unique de toutes les pièces : « Version N · Mise à jour du <date de la V1> ». */
function piedUnique(org: OrganismeInfo): string {
  const v = String(org.version || "1").replace(/[^0-9]/g, "") || "1";
  const d = parseDateFR(org.dateMaj);
  const parts = [
    `<strong>${org.nom || ""}</strong>`,
    org.siret ? `SIRET ${org.siret}` : "",
    org.nda ? `NDA ${org.nda}` : "",
    `Version ${v}`,
    d ? `Mise à jour du ${fmtLongDate(d)}` : "",
  ].filter(Boolean);
  return `<div class="footer">${parts.join(" · ")}</div>`;
}

/** Remplace tout pied de page existant par le pied unique (une seule version, une seule date). */
export function avecPiedUnique(html: string, org: OrganismeInfo): string {
  let out = html;
  // Les pieds de docBuilder ne contiennent que des <p> : la première balise </div> ferme le pied.
  for (let i = 0; i < 5 && /<div class="footer">/.test(out); i++) {
    out = out.replace(/<div class="footer">[\s\S]*?<\/div>/, "");
  }
  return /<\/body>/i.test(out) ? out.replace(/<\/body>/i, `${piedUnique(org)}</body>`) : out + piedUnique(org);
}

export async function buildBDCNTConseilsZip(
  org: OrganismeInfo,
  formation: FormationInfo,
  beneficiaires: StagiaireInfo[],
  reporter?: JobReporter,
): Promise<Blob> {
  const zip = new JSZip();
  const keys = Object.keys(BDC_NT_SOURCE).sort();
  const saisis = beneficiaires.length > 0 ? beneficiaires : [{
    civilite: "", nom: "BÉNÉFICIAIRE", prenom: "Modèle", email: "", telephone: "",
    entreprise: "", poste: "", dateNaissance: "",
  } as StagiaireInfo];
  // Un seul financeur cohérent par bénéficiaire (CPF / OPCO / France Travail seulement si l'OF est certifié BC).
  const benList = saisis.map((s) => ({ ...s, financeur: financeurEffectifBC(s, org, formation) }));

  let step = 0;
  const totalSteps = keys.length + keys.filter(k => BDC_NT_PER_BENEFICIAIRE.has(k)).length * (benList.length - 1) + BDC_NT_STATIC_ASSETS.length + BDC_TEMPLATES_MANQUANTS.length * benList.length + 20;
  const advance = (msg: string) => {
    step++;
    reporter?.setProgress(Math.min(99, (step / Math.max(1, totalSteps)) * 100));
    reporter?.setMessage(msg);
  };

  // Source unique de vérité + collecte des rendus pour le contrôle de cohérence (console)
  const bdcCtx = buildBdcContext(org, formation, benList);
  const renduParDocument: Record<string, string> = {};
  const renduParBeneficiaire: Record<string, string[]> = {};
  const nomsDocuments: string[] = [];
  const collect = (title: string, md: string, s: StagiaireInfo | null) => {
    const key = s ? `${title} — ${s.prenom} ${s.nom}` : title;
    renduParDocument[key] = md;
    nomsDocuments.push(title);
    if (s) (renduParBeneficiaire[`${s.prenom} ${s.nom}`] ||= []).push(md);
  };

  /** Toutes les pièces documentaires sont des PDF, avec le pied de page unique. */
  const toPdf = async (html: string): Promise<Blob> => await htmlToPdfBlob(avecPiedUnique(html, org));

  /** Dépose une pièce dans l'arborescence MMF ; une pièce collective n'est versée qu'une fois. */
  const deja = new Set<string>();
  const put = (ind: number, libelle: string, s: StagiaireInfo | null, ext: string, data: Blob | ArrayBuffer) => {
    const pl = placementMMF(ind, libelle, !!s);
    const dossierBen = pl.beneficiaire && s ? `/Bénéficiaire - ${s.prenom} ${s.nom}` : "";
    const path = `Critere_${critereForIndicateur(pl.ind)}/Indicateur_${pl.ind}${dossierBen}/Indicateur ${pl.ind} - ${pl.nom}.${ext}`;
    if (deja.has(path)) return;
    deja.add(path);
    zip.file(path, data);
  };
  /** Une pièce collective issue d'une trame nominative n'est rendue qu'une fois, sans bénéficiaire. */
  const estCollective = (ind: number, libelle: string) => !!placementMMF(ind, libelle, true).collectif;

  const genPdf = async (rawMd: string, title: string, s: StagiaireInfo | null): Promise<Blob> => {
    const dates = computeDates(s || undefined, org, formation);
    let md = applySubstitutions(rawMd, org, s, dates, formation, benList.length);
    md = sanitizeBdcMarkdown(md, { titre: title, categorieAction: "BC", antiFabrication: antiFabricationPour(title), raisonSociale: org.nom });
    if (!dates.bilanTermine && /Certificat de réalisation|Compte rendu de fin/i.test(title)) {
      md = md.replace(/\n[^|\n]{200,}\n/g, "\n[À compléter à la fin du bilan]\n");
    }
    // Tampon seul pour le dirigeant (il porte déjà sa signature).
    if (/Certificat de réalisation/i.test(title) && org.tamponUrl) {
      const tampon = `\n\n<img src="${org.tamponUrl}" alt="Tampon ${org.nom || ""}" style="max-height:120px;max-width:220px;display:block;margin:8px 0;object-fit:contain;" />\n`;
      md = md.replace(/(^|\n)\s*Signature\s*$/m, `$1Signature${tampon}`);
      if (!/<img[^>]+Tampon/i.test(md)) md += tampon;
    }
    collect(title, md, s);
    return await toPdf(mdToHtml(md, bdcDocTitle(title).replace(/\s+–\s+.*$/, ""), org, s));
  };

  // === 1. Pièces de la trame (source nettoyée — même rendu que le catalogue) ===
  for (const key of keys) {
    const ind = indicateurFromKey(key);
    const baseName = fileTitle(key);
    const raw = BDC_NT_SOURCE[key];
    if (BDC_NT_PER_BENEFICIAIRE.has(key) && !estCollective(ind, baseName)) {
      for (const s of benList) {
        advance(`${baseName} — ${s.prenom} ${s.nom}`);
        const dts = computeDates(s, org, formation);
        const personalized = getPersonalizedRaw(key, s, org, dts, formation, benList);
        put(ind, baseName, s, "pdf", await genPdf(personalized ?? raw, `${baseName} – ${s.prenom} ${s.nom}`, s));
      }
    } else {
      advance(baseName);
      if (BDC_TEMPLATES[key]) {
        const r = await renderBdcTemplateIfMapped(key, org, formation, null);
        if (r) { put(ind, baseName, null, r.extension, r.blob); continue; }
      }
      put(ind, baseName, null, "pdf", await genPdf(raw, baseName, null));
    }
  }

  // === 2. Programme des 3 phases et fiches par phase (IND 6) ===
  {
    const dates = computeDates(undefined, org, formation);
    advance("Programme des 3 phases");
    put(6, "Programme des 3 phases du bilan de compétences", null, "pdf", await genPdf(buildProgrammePhasesMd(org, dates, formation), "Programme des 3 phases du bilan de compétences", null));
    const phases: Array<{ n: 1 | 2 | 3; nom: string }> = [
      { n: 1, nom: "Phase 1 - Phase préliminaire" },
      { n: 2, nom: "Phase 2 - Phase d'investigation" },
      { n: 3, nom: "Phase 3 - Phase de conclusion" },
    ];
    for (const p of phases) {
      advance(p.nom);
      put(6, p.nom, null, "pdf", await genPdf(buildPhaseMd(p.n, org, dates, formation), p.nom, null));
    }
  }

  // === 3. Ressources statiques (calendrier annuel, contacts Agefiph) ===
  for (const a of BDC_NT_STATIC_ASSETS) {
    advance(a.zipPath.split("/").pop() || a.zipPath);
    try {
      const keyNoExt = a.zipPath.replace(/\.(xlsx|docx|pdf)$/i, "");
      const ext = (a.zipPath.match(/\.(\w+)$/) || ["", "pdf"])[1];
      let buf: ArrayBuffer | null = null;
      if (BDC_TEMPLATES[keyNoExt]) {
        const r = await renderBdcTemplateIfMapped(keyNoExt, org, formation, null);
        if (r) buf = await r.blob.arrayBuffer();
      }
      if (!buf) {
        const res = await fetch(a.src);
        if (res.ok) buf = await res.arrayBuffer();
      }
      if (buf) put(indicateurFromKey(a.zipPath), fileTitle(keyNoExt), null, ext, buf);
    } catch (e) {
      console.warn("[BDC] ressource indisponible", a.src, e);
    }
  }

  // === 4. Classeurs (suivi de l'adaptation, contacts handicap, dysfonctionnements…) ===
  for (const c of BDC_CLASSEURS) {
    advance(c.name);
    try {
      const html = c.build(bdcCtx);
      put(c.indicateur, c.name.replace(/\.xlsx$/i, ""), null, "xlsx", htmlToXlsxBlob(html));
      collect(c.name.replace(/\.xlsx$/i, ""), texteClasseur(html), null);
    } catch (e) {
      console.warn("[BDC] classeur échoué", c.name, e);
    }
  }

  // === 5. IND 2 : indicateurs calculés à partir des pièces réelles ===
  for (const file of BDC_NT_STATS_FILES) {
    advance(file.name);
    try {
      const html = file.build(org, formation, benList);
      put(2, file.name.replace(/\.xlsx$/i, ""), null, "xlsx", htmlToXlsxBlob(html));
      collect(file.name.replace(/\.xlsx$/i, ""), texteClasseur(html), null);
    } catch (e) {
      console.warn("[BDC] indicateurs IND 2 échoués", file.name, e);
    }
  }

  // === 6. Suivi à 6 mois par bénéficiaire (IND 2) ===
  for (let i = 0; i < benList.length; i++) {
    const s = benList[i];
    advance(`Compte rendu de suivi à 6 mois — ${s.prenom} ${s.nom}`);
    try {
      put(2, "Compte rendu de suivi à 6 mois", s, "pdf", await toPdf(buildSuivi6MoisIndividuel(org, formation, s, i)));
    } catch (e) {
      console.warn("[BDC] suivi 6 mois échoué", e);
    }
  }

  // === 7. Pièces obligatoires BC (synthèse, émargements, veilles, plan de développement…) ===
  for (const def of BDC_TEMPLATES_MANQUANTS) {
    if (!bdcTemplateApplicable(def, formation)) continue;
    if (def.parBeneficiaire) {
      for (let i = 0; i < benList.length; i++) {
        const s = benList[i];
        const b = bdcCtx.beneficiaires[i] ?? null;
        advance(`${def.nom} — ${s.prenom} ${s.nom}`);
        try {
          let md = sanitizeBdcMarkdown(autofillDocument(def.build(bdcCtx, b), bdcCtx, b), { titre: def.nom, categorieAction: "BC", antiFabrication: antiFabricationPour(def.nom), raisonSociale: org.nom });
          collect(def.nom, md, s);
          // Confidentialité (L6313-4) : synthèse et résultats de tests versés en copie anonymisée ;
          // l'attestation de remise reste nominative.
          const confidentiel = PIECES_CONFIDENTIELLES.test(def.nom);
          if (confidentiel) md = `> _Copie anonymisée versée au dossier qualité — l'original nominatif est remis au seul bénéficiaire (art. L6313-4 du Code du travail)._\n\n${anonymiser(md, s)}`;
          put(def.indicateur, def.nom, s, "pdf", await toPdf(mdToHtml(md, bdcDocTitle(def.nom), org, confidentiel ? null : s)));
        } catch (e) {
          console.warn("[BDC] pièce échouée", def.nom, e);
        }
      }
    } else {
      advance(def.nom);
      try {
        const md = sanitizeBdcMarkdown(autofillDocument(def.build(bdcCtx, null), bdcCtx, null), { titre: def.nom, categorieAction: "BC", antiFabrication: antiFabricationPour(def.nom), raisonSociale: org.nom });
        collect(def.nom, md, null);
        put(def.indicateur, def.nom, null, "pdf", await toPdf(mdToHtml(md, bdcDocTitle(def.nom), org, null)));
      } catch (e) {
        console.warn("[BDC] pièce échouée", def.nom, e);
      }
    }
  }

  // === 8. Pièces du format MMF (process, accusé de réception, compétences du consultant, réseau) ===
  {
    const collectives: Array<{ ind: number; nom: string; md: string }> = [
      { ind: 2, nom: "Process Suivi à 6 mois", md: mdProcessSuivi6Mois(bdcCtx) },
      { ind: 5, nom: "Process Définition des objectifs", md: mdProcessObjectifs() },
      { ind: 8, nom: "Process Positionnement à l'entrée", md: mdProcessPositionnement(bdcCtx) },
      { ind: 9, nom: "Process Information des publics", md: mdProcessInformationPublics(bdcCtx) },
      ...(bdcCtx.prestation.modalite !== "presentiel"
        ? [{ ind: 9, nom: "Informations pratiques - prestation à distance", md: mdInformationsPratiquesDistance(bdcCtx) }]
        : []),
      { ind: 21, nom: "Fiche de compétences du consultant", md: mdFicheCompetencesConsultant(bdcCtx) },
      { ind: 21, nom: `CV du consultant - ${(formation?.formateur || org.responsablePedagogique || org.dirigeant || "consultant").toString().trim()}`, md: mdCVConsultant(bdcCtx) },
      { ind: 24, nom: "Réseau d'acteurs socio-économiques", md: mdReseauActeurs(bdcCtx) },
    ];
    for (const p of collectives) {
      advance(p.nom);
      const md = sanitizeBdcMarkdown(p.md, { titre: p.nom, categorieAction: "BC", antiFabrication: false, raisonSociale: org.nom });
      collect(p.nom, md, null);
      put(p.ind, p.nom, null, "pdf", await toPdf(mdToHtml(md, p.nom, org, null)));
    }
    for (let i = 0; i < benList.length; i++) {
      const s = benList[i];
      const b = bdcCtx.beneficiaires[i];
      if (!b) continue;
      const titre = "Accusé de réception des informations";
      advance(`${titre} — ${s.prenom} ${s.nom}`);
      const md = sanitizeBdcMarkdown(mdAccuseReception(bdcCtx, b), { titre, categorieAction: "BC", antiFabrication: false, raisonSociale: org.nom });
      collect(titre, md, s);
      put(9, titre, s, "pdf", await toPdf(mdToHtml(md, titre, org, s)));
    }
    for (let i = 0; i < benList.length; i++) {
      const s = benList[i];
      const b = bdcCtx.beneficiaires[i];
      if (!b) continue;
      const titre = "Objectifs individualisés du bilan";
      advance(`${titre} — ${s.prenom} ${s.nom}`);
      const md = sanitizeBdcMarkdown(mdObjectifsIndividualises(bdcCtx, b), { titre, categorieAction: "BC", antiFabrication: false, raisonSociale: org.nom });
      collect(titre, md, s);
      put(5, titre, s, "pdf", await toPdf(mdToHtml(md, titre, org, s)));
    }
  }

  // === 9. Référentiel 2026 (décret n° 2026-728) : IND 27 et IND 32 ===
  {
    const pieces2026: Array<{ ind: number; nom: string; html: string }> = [
      { ind: 27, nom: "Annexe clauses qualité des contrats de sous-traitance", html: genClausesQualiteContrat(org, "BC") },
      { ind: 32, nom: "Analyse des risques sur la qualité des prestations", html: genAnalyseRisquesQualite(org, "BC", formation) },
      // Pièces dépendant du type d'audit (nouvel entrant / surveillance / renouvellement)
      ...entreesCatalogueTypeAudit(org).map((e) => ({ ind: e.indicateur, nom: e.nom.replace(/^CT\d+ - IND \d+ /, ""), html: renderTypeAuditTemplate(e.template, org, formation, benList) || "" })),
    ];
    for (const p of pieces2026) {
      advance(p.nom);
      if (!p.html) continue;
      put(p.ind, p.nom, null, "pdf", await toPdf(p.html));
    }
  }

  // === LISEZMOI ===
  {
    const fichiers = Object.keys((zip as unknown as { files: Record<string, unknown> }).files).filter((x) => !x.endsWith("/"));
    const nominatifs = fichiers.filter((x) => /Bénéficiaire - /.test(x)).length;
    const v = String(org.version || "1").replace(/[^0-9]/g, "") || "1";
    const d = parseDateFR(org.dateMaj);
    const readme = [
      `DOSSIER BILAN DE COMPÉTENCES — ${(org.nom || "").toUpperCase()}`,
      "=".repeat(40),
      "",
      `Organisme : ${org.nom}`,
      `SIRET : ${org.siret}    NDA : ${org.nda}`,
      `Bénéficiaires : ${benList.length}`,
      `Version ${v}${d ? ` · Mise à jour du ${fmtLongDate(d)}` : ""} (identique sur toutes les pièces)`,
      "Référentiel : référentiel national qualité, décret n° 2026-728 — indicateurs non applicables au bilan de compétences : 3, 7, 13, 14, 15, 16, 20, 28, 29.",
      "",
      "Structure (format « MMF - BDC ») :",
      "  - Critere_X / Indicateur_Y / Indicateur Y - Libellé.pdf : pièces collectives",
      "  - Critere_X / Indicateur_Y / Bénéficiaire - Prénom NOM / : pièces nominatives",
      "  - Tableaux de suivi et registres en .xlsx ; toutes les autres pièces en PDF.",
      "  - Document de synthèse et inventaire de personnalité versés en copie anonymisée (art. L6313-4) ; l'attestation de remise est nominative.",
      "",
      `Fichiers du dossier : ${fichiers.length + 1}`,
      `Dont pièces nominatives : ${nominatifs}`,
    ].join("\n");
    zip.file("LISEZMOI.txt", readme);
  }

  // Contrôle de cohérence : conservé pour l'outil (console), jamais versé au dossier d'audit.
  try {
    const rapport = validerDossierBDC(bdcCtx, { parDocument: renduParDocument, parBeneficiaire: renduParBeneficiaire, noms: nomsDocuments });
    const ko = rapport.bloquantes.filter((x) => !x.ok);
    if (ko.length) console.warn("[BDC] contrôle de cohérence — règles KO :", ko.map((x) => `${x.code} ${x.message || ""}`));
  } catch (e) {
    console.warn("[BDC] contrôle de cohérence échoué", e);
  }

  reporter?.setProgress(99);
  reporter?.setMessage("Compression du ZIP…");
  await limiterCheminsZip(zip);
  const blob = await zip.generateAsync(
    { type: "blob", compression: "STORE", streamFiles: true },
    (meta) => reporter?.setProgress(Math.min(100, 99 + meta.percent / 100))
  );
  reporter?.setProgress(100);
  return blob;
}
