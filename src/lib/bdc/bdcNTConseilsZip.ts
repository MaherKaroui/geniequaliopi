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
import type { JobReporter } from "@/lib/backgroundJobs";

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
function minusBusinessDays(d: Date, n: number): Date {
  const r = new Date(d);
  let i = 0;
  while (i < n) {
    r.setDate(r.getDate() - 1);
    const wd = r.getDay();
    if (wd !== 0 && wd !== 6) i++;
  }
  return r;
}

interface DatesCtx {
  dateConvention: string;    // J-14 ouvrés avant début
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
  const mi = new Date((debut.getTime() + fin.getTime()) / 2);
  const bilanTermine = fin.getTime() <= today.getTime();
  const versionD = parseDateFR(org?.dateMaj) || new Date(debut.getFullYear(), 0, 1);
  return {
    dateConvention: fmtLongDate(conv),
    dateDebut: fmtLongDate(debut),
    dateFin: fmtLongDate(fin),
    dateMiParcours: fmtLongDate(mi),
    dateCertificat: bilanTermine ? fmtLongDate(fin) : "",
    dateVersion: fmtLongDate(versionD),
    bilanTermine,
  };
}

/** Substitutions globales : remplace tous les marqueurs NT Conseils par les données organisme/bénéficiaire. */
function applySubstitutions(src: string, org: OrganismeInfo, s: StagiaireInfo | null, dates: DatesCtx): string {
  let txt = src;
  const orgNom = org.nom || "[Organisme]";
  const orgAdresse = [org.adresse, org.codePostal, org.ville].filter(Boolean).join(" ");
  const orgEmail = org.email || "contact@organisme.fr";
  const orgTel = org.telephone || "";
  const orgSiret = org.siret || "[SIRET]";
  const orgNda = org.nda || "[NDA en cours d'attribution]";
  const dirigeant = org.dirigeant || "Le Responsable";
  const dirigeantUpper = dirigeant.toUpperCase();

  const map: [RegExp, string][] = [
    [/NT\s*CONSEILS/gi, orgNom],
    [/5\s*rue\s*Pleyel\s*93200\s*Saint-Denis/gi, orgAdresse || "[Adresse]"],
    [/5\s*rue\s*Pleyel,?\s*93200/gi, [org.adresse, org.codePostal].filter(Boolean).join(" ") || "[Adresse]"],
    [/Saint-Denis/g, org.ville || "[Ville]"],
    [/902\s*274\s*448\s*000\s*31/g, orgSiret],
    [/902\s*274\s*448/g, orgSiret.replace(/\s/g,"").slice(0,9) || orgSiret],
    [/contact\.ntconseil@gmail\.com/gi, orgEmail],
    [/Marc\.z103@gmail\.com/gi, orgEmail],
    [/Préfet\s+de\s+la\s+région\s+ILE-DE-FRANCE/gi, `Préfet de la région ${org.ville || "[Région]"}`],
    [/Préfet\s+de\s+la\s+région\s+XXX/gi, `Préfet de la région ${org.ville || "[Région]"}`],
    [/SIRET\s*XXX/gi, `SIRET ${orgSiret}`],
    [/Fait\s+à\s+Saint-Denis\s+le\s+\d{2}\/\d{2}\/\d{4}/gi, `Fait à ${org.ville || "[Ville]"} le ${dates.dateConvention}`],
    [/01\/01\/2026/g, fmtShortDate(parseDateFR(dates.dateVersion) || new Date())],
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

  if (s) {
    const nomComplet = `${s.prenom} ${s.nom}`.trim();
    txt = txt.replace(/\bNom\s*:\s*\n/g, `Nom : ${s.nom || ""}\n`);
    txt = txt.replace(/\bPrénom\s*:\s*\n/g, `Prénom : ${s.prenom || ""}\n`);
    txt = txt.replace(/\bbénéficiaire\s*:\s*\n/gi, `bénéficiaire : ${nomComplet}\n`);
    // entête mail destinataire
    txt = txt.replace(/Bonjour\s*Monsieur,?/g, `Bonjour ${s.civilite === "Mme" ? "Madame" : "Monsieur"},`);
  }

  // dates dynamiques
  txt = txt.replace(/\{DATE_CONVENTION\}/g, dates.dateConvention);
  txt = txt.replace(/\{DATE_DEBUT\}/g, dates.dateDebut);
  txt = txt.replace(/\{DATE_FIN\}/g, dates.dateFin);

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

**Date de l'entretien :** ${dates.dateConvention}

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

const TEST_POSITIONNEMENT_KEY = "Indicateur 8/Indicateur 8 - Test de positionnement";

function buildTestPositionnementMd(
  s: StagiaireInfo,
  org: OrganismeInfo,
  _dates: DatesCtx,
): string {
  const nom = `${s.prenom || ""} ${s.nom || ""}`.trim() || "Bénéficiaire";
  const poste = (s.poste || "").trim();
  const entreprise = (s.entreprise || "").trim();
  const seed = hashStr(`pos|${s.prenom}|${s.nom}|${s.email}`);
  const orgNom = org.nom || "NT CONSEILS";

  const domaines = [
    poste || "mon métier actuel",
    entreprise ? `mon expérience chez ${entreprise}` : "mon parcours professionnel",
  ];

  const motivationsArr = [
    `Faire le point sur mes compétences acquises ${poste ? `dans le poste de ${poste}` : "au fil de mon parcours"} et identifier des pistes d'évolution réalistes. Je souhaite construire un projet aligné avec mes valeurs et mes contraintes personnelles.`,
    `Sortir d'une routine professionnelle qui ne me correspond plus et explorer de nouvelles voies. Le bilan est pour moi un temps structuré pour prendre du recul et décider de la suite.`,
    `Sécuriser une reconversion que j'envisage depuis plusieurs mois${entreprise ? `, en parallèle de mon poste chez ${entreprise}` : ""}. J'attends du bilan des outils concrets et un regard extérieur professionnel.`,
    `Confirmer une intuition de changement de métier et la confronter à la réalité du marché. Je veux éviter de me lancer sans avoir validé mes hypothèses.`,
  ];

  const parcoursArr = [
    `J'ai exercé ${poste ? `comme ${poste}` : "plusieurs fonctions"} pendant environ ${5 + (seed % 8)} ans${entreprise ? `, principalement au sein de ${entreprise}` : ""}. J'ai développé des compétences en organisation, en relation client et en gestion de priorités.`,
    `Mon parcours est mixte : une première partie technique${poste ? ` autour du métier de ${poste}` : ""}, puis une évolution progressive vers des missions à plus forte dimension relationnelle et d'encadrement d'équipe.`,
    `Après des études supérieures, j'ai occupé ${2 + (seed % 4)} postes successifs${entreprise ? `, dont le dernier chez ${entreprise}` : ""}. Chaque expérience m'a permis de monter en autonomie et de confronter mes choix initiaux à la réalité du terrain.`,
  ];

  const pointsFortsArr = [
    `Capacité d'adaptation, sens de l'organisation et écoute active. Mes collègues soulignent souvent ma fiabilité et ma rigueur dans le suivi des dossiers.`,
    `Autonomie, esprit d'analyse et persévérance face aux situations complexes. Je sais prendre du recul avant d'agir et je m'appuie sur des faits.`,
    `Sens du collectif, pédagogie et capacité à fédérer autour d'un objectif commun. J'aime transmettre et accompagner la montée en compétences des autres.`,
    `Curiosité, capacité à apprendre vite et à m'approprier de nouveaux outils numériques. Je suis à l'aise avec le changement quand il est expliqué.`,
  ];

  const objectifsArr = [
    `À court terme : poser un diagnostic clair sur mes compétences et mes motivations. À moyen terme : identifier 2 ou 3 pistes professionnelles crédibles. À long terme : engager une transition (formation, mobilité interne ou changement d'employeur) dans les 12 à 18 mois.`,
    `À court terme : structurer mon projet et lever mes doutes. À moyen terme : suivre la formation identifiée comme nécessaire. À long terme : exercer un métier qui ait du sens et m'assure un équilibre vie pro / vie perso satisfaisant.`,
    `À court terme : sécuriser mon poste actuel tout en explorant des alternatives. À moyen terme : tester une nouvelle voie via une mission, un stage ou une mobilité. À long terme : me stabiliser dans un projet professionnel à 5 ans.`,
  ];

  const besoinBilanArr = [
    `Je suis arrivé(e) à un palier dans mon poste actuel et je manque de visibilité sur la suite. Le bilan doit m'aider à clarifier ce qui est possible et à hiérarchiser mes options.`,
    `Je traverse une période de questionnement et j'ai besoin d'un cadre méthodique, accompagné par un professionnel neutre, pour avancer sans m'éparpiller.`,
    `Mon environnement de travail évolue fortement (organisation, outils, missions) et je veux m'assurer que mon projet reste cohérent avec ces changements et avec mes aspirations.`,
  ];

  const attentesArr = [
    `Un accompagnement à la fois bienveillant et exigeant, des tests fiables, et la production d'une synthèse écrite que je pourrai réutiliser pour mes démarches (entretiens, dossiers de formation, CPF).`,
    `Des outils concrets pour mieux me connaître (intérêts, valeurs, personnalité), une exploration du marché du travail réaliste, et un plan d'action chiffré et calendaire.`,
    `Un travail de fond sur mes compétences transférables, une validation de mon projet par des enquêtes métier, et la sécurisation du financement (CPF, autres dispositifs).`,
  ];

  const motivation = pick(motivationsArr, seed, 0);
  const parcours = pick(parcoursArr, seed, 1);
  const pointsForts = pick(pointsFortsArr, seed, 2);
  const objectifs = pick(objectifsArr, seed, 3);
  const besoin = pick(besoinBilanArr, seed, 4);
  const attentes = pick(attentesArr, seed, 5);

  return `**[${orgNom}]{.underline}**

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
`;
}

/** Retourne un markdown personnalisé pour les clés qui le supportent, sinon null. */
function getPersonalizedRaw(key: string, s: StagiaireInfo | null, org: OrganismeInfo, dates: DatesCtx): string | null {
  if (!s) return null;
  if (key === OUTIL_PREPA_KEY) return buildOutilPreparatoireMd(s, org, dates);
  if (key === TEST_POSITIONNEMENT_KEY) return buildTestPositionnementMd(s, org, dates);
  return null;
}




/** Markdown (pandoc-style) → fragment HTML (corps uniquement) */
function mdToHtmlBody(md: string): string {
  // Nettoie les artefacts d'échappement (ex: \' → ', \" → ")
  md = md.replace(/\\'/g, "'").replace(/\\"/g, '"');
  const esc = (s: string) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const inline = (s: string) => esc(s)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\{\.underline\}/g, "<u>$1</u>")
    .replace(/\\\\/g, "<br>")
    .replace(/\\$/gm, "<br>");

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
  let inUl = false, inOl = false, inTable = false;
  const closeLists = () => { if (inUl){out.push("</ul>");inUl=false;} if(inOl){out.push("</ol>");inOl=false;} };
  const closeTable = () => { if (inTable){out.push("</table>");inTable=false;} };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) { closeLists(); closeTable(); out.push(""); continue; }
    let m = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (m) {
      closeLists(); closeTable();
      // Demote one level: #/##/### → h2/h3/h4 to avoid duplicate h1 + page-break-before
      const lvl = Math.min(6, m[1].length + 1);
      out.push(`<h${lvl}>${inline(m[2])}</h${lvl}>`);
      continue;
    }
    if (/^[-*+]\s+/.test(trimmed)) {
      closeTable();
      if (!inUl) { closeLists(); out.push("<ul>"); inUl = true; }
      out.push(`<li>${inline(trimmed.replace(/^[-*+]\s+/,""))}</li>`);
      continue;
    }
    if (/^\d+\.\s+/.test(trimmed)) {
      closeTable();
      if (!inOl) { closeLists(); out.push("<ol>"); inOl = true; }
      out.push(`<li>${inline(trimmed.replace(/^\d+\.\s+/,""))}</li>`);
      continue;
    }
    if (/^\|.*\|$/.test(trimmed)) {
      closeLists();
      if (!inTable) { out.push('<table class="bdc-table">'); inTable = true; }
      const cells = trimmed.slice(1, -1).split("|").map(c => c.trim());
      if (cells.every(c => /^-+$/.test(c) || c === "")) continue;
      out.push("<tr>" + cells.map(c => `<td>${inline(c)}</td>`).join("") + "</tr>");
      continue;
    }
    if (/^[+\-=]{3,}/.test(trimmed)) { closeTable(); continue; }
    closeLists(); closeTable();
    out.push(`<p>${inline(trimmed)}</p>`);
  }
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
    `.bdc-doc-body table{border-collapse:collapse;width:100%;margin:10px 0;font-size:10.5pt}` +
    `.bdc-doc-body table td,.bdc-doc-body table th{border:1px solid #bbb;padding:6px;vertical-align:top}` +
    `.bdc-doc-body h2{font-size:14pt;color:#0b2545;margin:16px 0 8px;page-break-before:avoid;border-bottom:1px solid #0b254540;padding-bottom:4px}` +
    `.bdc-doc-body h3{font-size:12pt;color:#1d4ed8;margin:14px 0 6px;page-break-before:avoid}` +
    `.bdc-doc-body h4{font-size:11pt;color:#334155;margin:12px 0 4px;page-break-before:avoid}` +
    `.bdc-doc-body p{margin:4px 0;line-height:1.35;text-align:justify}` +
    `.bdc-doc-body strong{color:#0b2545}` +
    `.bdc-doc-body ul,.bdc-doc-body ol{margin:6px 0 8px 22px}</style>`;
  return htmlWrap(content);
}



function buildFooter(org: OrganismeInfo, dates: DatesCtx): string {
  const parts = [
    `<strong>${org.nom || ""}</strong>`,
    org.siret ? `SIRET ${org.siret}` : "",
    org.nda ? `NDA ${org.nda}` : "",
    org.version ? `Version ${org.version}` : "",
    `Édition du ${dates.dateVersion}`,
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
  return name;
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
): string {
  const raw = BDC_NT_SOURCE[key];
  const title = bdcDocTitle(key);
  if (!raw) {
    return htmlWrap(orgHeader(org, title) + `<p style="color:#b91c1c">Document BDC introuvable (clé : ${key}).</p>` + docFooter(org));
  }
  const dates = computeDates(stagiaire || undefined, org, formation);
  const personalized = getPersonalizedRaw(key, stagiaire, org, dates);
  const effectiveRaw = personalized ?? raw;
  let md = applySubstitutions(effectiveRaw, org, stagiaire, dates);

  if (!dates.bilanTermine && /Certificat de réalisation|Compte rendu de fin/i.test(title)) {
    md = md.replace(/\n[^|\n]{200,}\n/g, "\n[À compléter à la fin du bilan]\n");
  }
  const body = mdToHtmlBody(md);
  const beneficiaireLine = stagiaire
    ? `<div style="margin:6px 0 18px;color:#475569;font-size:12px">Bénéficiaire : <strong>${stagiaire.prenom} ${stagiaire.nom}</strong></div>`
    : "";
  return htmlWrap(
    orgHeader(org, title) +
    beneficiaireLine +
    `<div class="bdc-doc-body">${body}</div>` +
    `<style>.bdc-doc-body{font-size:11pt}.bdc-doc-body table{border-collapse:collapse;width:100%;margin:10px 0;font-size:10.5pt}.bdc-doc-body table td,.bdc-doc-body table th{border:1px solid #bbb;padding:6px;vertical-align:top}.bdc-doc-body h2{font-size:14pt;color:#0b2545;margin:16px 0 8px;page-break-before:avoid;border-bottom:1px solid #0b254540;padding-bottom:4px}.bdc-doc-body h3{font-size:12pt;color:#1d4ed8;margin:14px 0 6px;page-break-before:avoid}.bdc-doc-body h4{font-size:11pt;color:#334155;margin:12px 0 4px;page-break-before:avoid}.bdc-doc-body p{margin:4px 0;line-height:1.35;text-align:justify}.bdc-doc-body strong{color:#0b2545}.bdc-doc-body ul,.bdc-doc-body ol{margin:6px 0 8px 22px}</style>` +
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

  // README global
  const totalDocs = keys.length + BDC_NT_STATIC_ASSETS.length;
  const readme = [
    "DOSSIER BILAN DE COMPÉTENCES — TRAME NT CONSEILS",
    "================================================",
    "",
    `Organisme : ${org.nom}`,
    `SIRET : ${org.siret}    NDA : ${org.nda}`,
    `Bénéficiaires : ${benList.length}`,
    "",
    "Structure :",
    "  - Documents collectifs à la racine de chaque dossier Indicateur",
    "  - Documents nominatifs dans le sous-dossier de chaque bénéficiaire",
    "",
    `Total documents : ${totalDocs} par bénéficiaire pour les nominatifs.`,
  ].join("\n");
  zip.file("LISEZMOI.txt", readme);

  let step = 0;
  const totalSteps = keys.length + keys.filter(k => BDC_NT_PER_BENEFICIAIRE.has(k)).length * (benList.length - 1) + BDC_NT_STATIC_ASSETS.length;
  const advance = (msg: string) => {
    step++;
    reporter?.setProgress(Math.min(99, (step / Math.max(1, totalSteps)) * 100));
    reporter?.setMessage(msg);
  };

  // Helper : génère un DOCX depuis markdown + substitutions
  const genDocx = async (rawMd: string, title: string, s: StagiaireInfo | null): Promise<Blob> => {
    const dates = computeDates(s || undefined, org, formation);
    let md = applySubstitutions(rawMd, org, s, dates);

    // Bilan en cours : on neutralise les évaluations finales
    if (!dates.bilanTermine && /Certificat de réalisation|Compte rendu de fin/i.test(title)) {
      md = md.replace(/\n[^|\n]{200,}\n/g, "\n[À compléter à la fin du bilan]\n");
    }

    const html = mdToHtml(md, title, org, s).replace("</body>", buildFooter(org, dates) + "</body>");
    return await htmlToWordBlob(html);
  };

  for (const key of keys) {
    const folder = key.includes("/") ? key.split("/")[0] : "";
    const critereFolder = mapFolderToCriterePath(folder);
    const baseName = fileTitle(key);
    const isPerBen = BDC_NT_PER_BENEFICIAIRE.has(key);
    const raw = BDC_NT_SOURCE[key];

    if (isPerBen) {
      for (const s of benList) {
        advance(`${baseName} — ${s.prenom} ${s.nom}`);
        const dts = computeDates(s, org, formation);
        const personalized = getPersonalizedRaw(key, s, org, dts);
        const blob = await genDocx(personalized ?? raw, `${baseName} – ${s.prenom} ${s.nom}`, s);
        const benFolder = `Bénéficiaire - ${s.prenom} ${s.nom}`;
        const path = critereFolder
          ? `${benFolder}/${critereFolder}/${baseName}.docx`
          : `${benFolder}/${baseName}.docx`;
        zip.file(path, blob);
      }

    } else {
      advance(baseName);
      const blob = await genDocx(raw, baseName, null);
      const path = critereFolder ? `${critereFolder}/${baseName}.docx` : `${baseName}.docx`;
      zip.file(path, blob);
    }
  }

  // Static assets
  for (const a of BDC_NT_STATIC_ASSETS) {
    advance(a.zipPath.split("/").pop() || a.zipPath);
    try {
      const res = await fetch(a.src);
      if (res.ok) {
        const buf = await res.arrayBuffer();
        zip.file(mapAssetPathToCriterePath(a.zipPath), buf);
      }
    } catch (e) {
      console.warn("[BDC NT] asset failed", a.src, e);
    }
  }

  reporter?.setProgress(99);
  reporter?.setMessage("Compression du ZIP…");
  const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
  reporter?.setProgress(100);
  return blob;
}
