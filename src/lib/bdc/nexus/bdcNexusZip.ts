/**
 * Dossier Qualiopi « bilan de compétences » complet, au format du dossier audité NEXUS :
 * même arborescence Critere_X/Indicateur_Y (+ « Bénéficiaire - Prénom NOM »), mêmes pièces,
 * mêmes noms de fichiers, toutes les pièces documentaires en PDF, classeurs en .xlsx.
 *
 * Le contenu suit la formation (intitulé, durée, tarif, consultant, modalité) et les dates de
 * chaque bénéficiaire (planning, chronologie contractuelle, suivi à six mois) : voir nexusModele.ts.
 */
import JSZip from "jszip";
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import type { JobReporter } from "@/lib/backgroundJobs";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import { htmlToXlsxBlob } from "@/lib/htmlToXlsx";
import { limiterCheminsZip } from "@/lib/fileNaming";
import { ceder } from "@/lib/arrierePlan";
import { buildBdcContext, financeurEffectifBC } from "../bdcModel";
import { htmlClasseurMatrices, htmlRegistreAbandons } from "../bdcNexus";
import { mdToHtml, avecPiedUnique, classeurIndicateurs2Html, supportsDeCoursBDC } from "../bdcNTConseilsZip";
import {
  blocs, casesACocher, construireBeneficiaires, contexteNexus, remplir, varsBeneficiaire,
  type BenNexus, type ContexteNexus, type Vars,
} from "./nexusModele";
import { cahierContacts, calendrierAnnuel, contactsHandicap, suiviAdaptations, tableauDysfonctionnements } from "./nexusClasseurs";

const BEN = "BEN";

/** Pièce à produire : gabarit, chemin dans le ZIP, bénéficiaire, ajustements de variables. */
interface Sortie {
  chemin: string;
  gabarit?: string;
  md?: (ctx: ContexteNexus, b: BenNexus, v: Vars) => string;
  ben: BenNexus;
  surcharges?: Vars;
}

/** Copies voulues par le dossier de référence (même pièce versée à plusieurs indicateurs). */
const COPIES: Array<{ de: string; vers: string; ind?: string; vierge?: boolean }> = [
  { de: "Critere_2/Indicateur_4/BEN/Indicateur 4 - Fiche d'analyse du besoin", vers: "Critere_2/Indicateur_6/Indicateur 6 - Fiche d'analyse du besoin", vierge: true },
  { de: "Critere_2/Indicateur_4/BEN/Indicateur 4 - Fiche d'analyse du besoin", vers: "Critere_3/Indicateur_10/BEN/Indicateur 10 - Fiche d'analyse du besoin" },
  { de: "Critere_2/Indicateur_4/BEN/Indicateur 4 - Planning previsionnel signe", vers: "Critere_3/Indicateur_10/BEN/Indicateur 10 - Planning previsionnel signe" },
  { de: "Critere_3/Indicateur_9/BEN/Indicateur 9 - Convention de prestation", vers: "Critere_3/Indicateur_10/BEN/Indicateur 10 - Convention de prestation" },
  { de: "Critere_3/Indicateur_9/BEN/Indicateur 9 - Convocation", vers: "Critere_3/Indicateur_10/BEN/Indicateur 10 - Convocation" },
  { de: "Critere_2/Indicateur_5/BEN/Indicateur 5 - Document de synthese (copie anonymisee)", vers: "Critere_3/Indicateur_11/BEN/Indicateur 11 - Document de synthese (copie anonymisee)" },
  { de: "Critere_3/Indicateur_9/BEN/Indicateur 9 - Livret d'accueil du beneficiaire", vers: "Critere_3/Indicateur_12/Indicateur 12 - Livret d'accueil du beneficiaire" },
  { de: "Critere_1/Indicateur_1/Indicateur 1 - Fiche de presentation du bilan de competences", vers: "Critere_2/Indicateur_5/Indicateur 5 - Fiche de presentation du bilan de competences" },
  { de: "Critere_2/Indicateur_5/Indicateur 5 - Matrices d'evaluation du bilan", vers: "Critere_3/Indicateur_11/Indicateur 11 - Matrices d'evaluation du bilan", ind: "11" },
  { de: "Critere_2/Indicateur_5/Indicateur 5 - Reperes qualite et feuille de route de la synthese", vers: "Critere_3/Indicateur_11/Indicateur 11 - Reperes qualite et feuille de route de la synthese", ind: "11" },
  { de: "Critere_2/Indicateur_5/Indicateur 5 - Trame du document de synthese", vers: "Critere_3/Indicateur_11/Indicateur 11 - Trame du document de synthese", ind: "11" },
];

/** Trame vierge : aucune donnée de bénéficiaire, cases non cochées. */
const VIERGE: Vars = {
  BEN: "", BEN_NAISS: "", BEN_TEL: "", BEN_EMAIL: "", BEN_ADRESSE: "", BEN_SITUATION: "", BEN_POSTE: "", BEN_EXPERIENCES: "",
  D_PREALABLE: "____ / ____ / ________", CB_ORIGINE: "", CB_FIN: "", CB_SITUATION: "",
  TRIPARTITE: false, FINANCEMENT_LIB: "", PRIX_PARENTHESE: "", JOURS_SEANCES: "à arrêter d'un commun accord au planning prévisionnel",
};

/* ------------------------------------------------------------------ */
/* Questionnaires des autres parties prenantes (IND 30)                 */
/* ------------------------------------------------------------------ */

const QUESTIONS: Record<"entreprise" | "financeur" | "interne", string[]> = {
  entreprise: ["Qualité de l'information reçue avant la prestation", "Respect du cadre convenu (dates, durée, modalités)", "Respect de la confidentialité des contenus du bilan", "Qualité des échanges avec l'organisme", "Satisfaction globale"],
  financeur: ["Conformité des pièces administratives transmises", "Respect des délais (entrée, réalisation, facturation)", "Qualité des échanges avec l'organisme", "Satisfaction globale"],
  interne: ["Adéquation des moyens mis à disposition", "Clarté des process et des outils", "Qualité de la coordination", "Accès à la formation et à la veille", "Satisfaction globale"],
};

function questionnairePartie(kind: "entreprise" | "financeur" | "interne") {
  return (ctx: ContexteNexus, b: BenNexus, v: Vars): string => {
    const tri = b.financement === "employeur" || b.financement === "OPCO";
    const tiers = ["CPF", "OPCO", "France Travail"].includes(b.financement);
    const applicable = kind === "entreprise" ? tri : kind === "financeur" ? tiers : !v.MEME_PERSONNE;
    const entete = `| Organisme | ${v.ORG} — SIRET ${v.SIRET} — NDA ${v.NDA} |
|---|---|
| Adresse | ${v.ORG_ADRESSE_COMPLETE} |
| Consultant référent | ${v.CONSULTANT} — Consultant en bilan de compétences |
| Bénéficiaire | ${v.BEN}${v.BEN_NAISS_TIRET} |
| Période de la prestation | du ${v.S1} au ${v.D_FIN} |
| Durée | ${v.DUREE} heures d'accompagnement individuel avec le consultant, réparties sur ${v.NB_SEANCES} séances. Le travail personnel guidé réalisé entre les séances n'est ni décompté de ces ${v.DUREE} heures ni facturé. |
| Modalité | ${v.MODALITE_LIB} |
| Financement | ${v.FINANCEMENT_LIB} |`;
    const titre = `**QUESTIONNAIRE DE SATISFACTION ${kind.toUpperCase()}**`;
    if (!applicable) {
      const motif = kind === "entreprise"
        ? `${v.BEN} réalise son bilan à titre individuel, du ${v.S1} au ${v.D_FIN}. Aucun employeur n'est à l'initiative de la démarche, n'y est partie ni n'en assure le financement : le contrat est bilatéral`
        : kind === "financeur"
          ? (tri ? "Le financeur est l'employeur, partie à la convention tripartite : sa satisfaction est recueillie par le questionnaire entreprise"
            : `Le financeur est le bénéficiaire lui-même (${String(v.FINANCEMENT_LIB_MIN)}${v.PRIX_PARENTHESE}). Aucun organisme financeur tiers n'intervient : sa satisfaction en tant que payeur est recueillie par le questionnaire bénéficiaire`)
          : `${v.ORG} est une structure à intervenant unique : aucun salarié, aucun sous-traitant. Le consultant étant l'organisme lui-même, son appréciation des moyens et des process est recueillie lors de l'entretien annuel (indicateur 22), et non par un questionnaire adressé à lui-même`;
      return `${titre}

Indicateur 30 — Non applicable pour ce dossier

${entete}

| Non applicable. ${motif} |
|---|

${v.ORG} ne produit jamais de réponse à la place d'une partie prenante. Le modèle de questionnaire est conservé au système documentaire pour les dossiers dans lesquels cette partie prenante existe.

| Mention établie le | ${v.D_ARRETE} |
|---|---|
| Par | ${v.CONSULTANT} |
`;
    }
    const destinataire = kind === "entreprise" ? String(v.BEN_EMPLOYEUR) : kind === "financeur" ? String(v.FINANCEMENT_LIB) : "Intervenants de l'organisme";
    return `${titre}

Indicateur 30 — À adresser à l'issue de la prestation (${v.D_FIN}), relance à J+7

${entete}

| Destinataire | ${destinataire} |
|---|---|
| Date d'envoi | ____ / ____ / ________ |
| Date de réponse | ____ / ____ / ________ |

Échelle de 1 (très insatisfait) à 5 (très satisfait). Questionnaire renseigné **par la partie prenante elle-même** ; sans réponse après deux relances, la sollicitation est consignée dans les mentions de l'indicateur 30.

| Question | 1 → 5 |
|---|---|
${QUESTIONS[kind].map((q) => `| ${q} | 1 ☐   2 ☐   3 ☐   4 ☐   5 ☐ |`).join("\n")}

**Commentaire libre**

______________________________________________
`;
  };
}

/* ------------------------------------------------------------------ */
/* Signatures                                                          */
/* ------------------------------------------------------------------ */

/**
 * Appose les signatures dans les cellules « … Signé le jj/mm/aaaa » déjà échues : tampon de
 * l'organisme (ou, à défaut, signature du dirigeant) pour l'organisme, signature du consultant,
 * signature du bénéficiaire. Une pièce anonymisée ou datée dans le futur n'est jamais signée.
 */
function signer(md: string, org: OrganismeInfo, f: FormationInfo, b: BenNexus, v: Vars, arrete: Date): string {
  const img = (url: string | undefined, alt: string) => (url ? ` ⏎ ![${alt}](${url})` : "");
  const dirigeant = org.tamponUrl || org.signatureUrl;
  const consultant = f.formateurSignatureUrl || (String(v.CONSULTANT) === String(v.DIRIGEANT) ? org.signatureUrl : undefined);
  return md.replace(/^\|.*\|$/gm, (ligne) => {
    if (!/(Signé le|, le) \d{2}\/\d{2}\/\d{4}/.test(ligne)) return ligne;
    return ligne.split(" | ").map((cell) => {
      const m = cell.match(/(?:Signé le|, le) (\d{2})\/(\d{2})\/(\d{4})/);
      if (!m) return cell;
      const d = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
      if (d.getTime() > arrete.getTime()) return cell;
      const fin = cell.endsWith(" |") ? " |" : "";
      const corps = fin ? cell.slice(0, -2) : cell;
      let ajout = "";
      if (/Le bénéficiaire/.test(corps) && b.nomme && v.BEN && corps.includes(String(v.BEN))) ajout = img(b.s.signatureUrl, "Signature du bénéficiaire");
      else if (/Le consultant|L'intéressé/.test(corps)) ajout = img(consultant, "Signature du consultant");
      else if (/L'organisme|^\|?\s*Pour |La direction/.test(corps)) ajout = img(dirigeant, org.tamponUrl ? "Tampon de l'organisme" : "Signature du représentant légal");
      return corps + ajout + fin;
    }).join(" | ");
  });
}

/* ------------------------------------------------------------------ */
/* Rendu                                                               */
/* ------------------------------------------------------------------ */

function rendreHtml(md: string, org: OrganismeInfo): string {
  const lignes = md.replace(/\r\n/g, "\n").split("\n");
  let i = 0;
  while (i < lignes.length && !lignes[i].trim()) i++;
  const m = (lignes[i] || "").match(/^\*\*(.+)\*\*\s*$/);
  const titre = m ? m[1] : "";
  const corps = m ? lignes.slice(i + 1).join("\n") : md;
  return mdToHtml(corps, titre, org, null).replace(/\s*⏎\s*/g, "<br/>");
}

export async function buildBDCNexusZip(
  org: OrganismeInfo,
  formation: FormationInfo,
  stagiaires: StagiaireInfo[],
  reporter?: JobReporter,
): Promise<Blob> {
  const { NEXUS_TEMPLATES } = await import("./nexusTemplates");
  const zip = new JSZip();
  const arrete = new Date();
  const benList = stagiaires.map((s) => ({ ...s, financeur: financeurEffectifBC(s, org, formation) }));
  const bens = construireBeneficiaires(org, formation, benList, (s) => s.financeur || "");
  const ctx = contexteNexus(org, formation, bens, arrete);
  const bdcCtx = buildBdcContext(org, formation, benList);
  const premier = bens[0];
  const dossierBen = (b: BenNexus) => `Bénéficiaire - ${b.nomme ? `${b.s.prenom} ${b.s.nom}`.trim() : "Modèle"}`;

  // Pièces à produire
  const sorties: Sortie[] = [];
  const ajouter = (cle: string, chemin: string, extra: Partial<Sortie> = {}) => {
    if (cle.includes(`/${BEN}/`)) for (const b of bens) sorties.push({ chemin: chemin.replace(`/${BEN}/`, `/${dossierBen(b)}/`), gabarit: cle, ben: b, ...extra });
    else sorties.push({ chemin, gabarit: cle, ben: premier, ...extra });
  };
  for (const cle of Object.keys(NEXUS_TEMPLATES)) ajouter(cle, cle, { surcharges: { IND: cle.match(/Indicateur_(\d+)/)?.[1] || "" } });
  for (const c of COPIES) ajouter(c.de, c.vers, { surcharges: { IND: c.ind || c.vers.match(/Indicateur_(\d+)/)?.[1] || "", ...(c.vierge ? VIERGE : {}) } });
  for (const kind of ["entreprise", "financeur", "interne"] as const) {
    for (const b of bens) sorties.push({ chemin: `Critere_7/Indicateur_30/${dossierBen(b)}/Indicateur 30 - Questionnaire de satisfaction ${kind}`, md: questionnairePartie(kind), ben: b });
  }

  const total = sorties.length + 12;
  let etape = 0;
  const avancer = (msg: string) => { etape++; reporter?.setProgress(Math.min(98, (etape / total) * 100)); reporter?.setMessage(msg); };
  const toPdf = async (html: string) => await htmlToPdfBlob(avecPiedUnique(html, org));

  const varsCache = new Map<BenNexus, { v: Vars; bl: Record<string, string> }>();
  const varsDe = (b: BenNexus) => {
    let e = varsCache.get(b);
    if (!e) {
      const v0 = varsBeneficiaire(ctx, b);
      const v = { ...v0, ...casesACocher(ctx, b, v0) };
      e = { v, bl: blocs(ctx, b, v) };
      varsCache.set(b, e);
    }
    return e;
  };

  for (const s of sorties) {
    avancer(s.chemin.split("/").pop() || s.chemin);
    try {
      const { v: v0, bl } = varsDe(s.ben);
      const v = { ...v0, ...(s.surcharges || {}) };
      let md = s.md ? s.md(ctx, s.ben, v) : remplir(NEXUS_TEMPLATES[s.gabarit!], v, bl);
      const restes = md.match(/\{\{[^}]+\}\}/g);
      if (restes) console.warn("[BDC NEXUS] variables non résolues", s.chemin, [...new Set(restes)]);
      if (!/copie anonymis/i.test(s.chemin) && s.surcharges?.BEN !== "") md = signer(md, org, formation, s.ben, v, arrete);
      zip.file(`${s.chemin}.pdf`, await toPdf(rendreHtml(md, org)));
    } catch (e) {
      console.warn("[BDC NEXUS] pièce échouée", s.chemin, e);
    }
    await ceder();
  }

  // Classeurs
  const xlsx = (chemin: string, html: string) => zip.file(chemin, htmlToXlsxBlob(html));
  avancer("Classeurs");
  xlsx("Critere_1/Indicateur_1/Indicateur 1 - Calendrier annuel.xlsx", calendrierAnnuel(ctx));
  xlsx("Critere_1/Indicateur_2/Indicateur 2 - Tableaux de suivi et indicateurs de resultats.xlsx", classeurIndicateurs2Html(org, formation, benList));
  xlsx("Critere_2/Indicateur_4/Indicateur 4 - Cahier de contacts et analyse du besoin.xlsx", cahierContacts(ctx));
  for (const ind of [5, 11]) {
    const crit = ind === 5 ? 2 : 3;
    xlsx(`Critere_${crit}/Indicateur_${ind}/Indicateur ${ind} - Matrices d'evaluation du bilan (classeur).xlsx`, htmlClasseurMatrices(bdcCtx, org));
    bens.forEach((b, i) => {
      const bc = bdcCtx.beneficiaires[i];
      if (bc) xlsx(`Critere_${crit}/Indicateur_${ind}/${dossierBen(b)}/Indicateur ${ind} - Matrices d'evaluation renseignees (copie anonymisee).xlsx`, htmlClasseurMatrices(bdcCtx, org, bc));
    });
  }
  xlsx("Critere_3/Indicateur_12/Indicateur 12 - Registre des abandons et des aleas.xlsx", htmlRegistreAbandons(bdcCtx, org, arrete));
  xlsx("Critere_6/Indicateur_26/Indicateur 26 - Contacts et suivi handicap.xlsx", contactsHandicap(ctx));
  xlsx("Critere_6/Indicateur_26/Indicateur 26 - Suivi des adaptations par beneficiaire.xlsx", suiviAdaptations(ctx));
  xlsx("Critere_7/Indicateur_31/Indicateur 31 - Tableau des dysfonctionnements.xlsx", tableauDysfonctionnements(ctx));

  // Ressource statique : contacts Agefiph (PDF du dossier de référence)
  avancer("Contacts AGEFIPH");
  try {
    const res = await fetch("/pdfs/bdc_nt/contacts_agefiph.pdf");
    if (res.ok) zip.file("Critere_6/Indicateur_26/Indicateur 26 - Contacts AGEFIPH.pdf", await res.arrayBuffer());
  } catch (e) {
    console.warn("[BDC NEXUS] contacts Agefiph indisponibles", e);
  }

  // Supports de cours propres au profil de la formation (indicateur 19)
  avancer("Supports de cours");
  try {
    for (const p of await supportsDeCoursBDC(org, formation, benList, toPdf)) zip.file(p.chemin, p.blob);
  } catch (e) {
    console.warn("[BDC NEXUS] support de cours échoué", e);
  }

  reporter?.setProgress(99);
  reporter?.setMessage("Compression du ZIP…");
  await limiterCheminsZip(zip);
  const blob = await zip.generateAsync({ type: "blob", compression: "STORE", streamFiles: true }, (meta) => reporter?.setProgress(Math.min(100, 99 + meta.percent / 100)));
  reporter?.setProgress(100);
  return blob;
}
