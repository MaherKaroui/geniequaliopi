/**
 * Pièces du dossier Qualiopi « bilan de compétences » au format NEXUS, rendues une à une en HTML.
 * Source unique du ZIP complet (bdcNexusZip.ts) et des téléchargements document par document
 * du catalogue (docCatalog / documentGenerator) : mêmes pièces, même contenu.
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildBdcContext, financeurEffectifBC } from "../bdcModel";
import { htmlClasseurMatrices, htmlRegistreAbandons } from "../bdcNexus";
import { mdToHtmlBody, classeurIndicateurs2Html } from "../bdcNTConseilsZip";
import { footer, htmlWrap, orgHeader } from "@/lib/docBuilder";
import {
  blocs, casesACocher, construireBeneficiaires, contexteNexus, remplir, varsBeneficiaire,
  type BenNexus, type ContexteNexus, type Vars,
} from "./nexusModele";
import { reponsesNexus } from "./nexusReponses";
import { cahierContacts, calendrierAnnuel, contactsHandicap, suiviAdaptations, tableauDysfonctionnements } from "./nexusClasseurs";

const BEN = "BEN";

/** Pièce à produire : gabarit, chemin dans le ZIP, bénéficiaire, ajustements de variables. */
interface Sortie {
  chemin: string;
  cle: string;
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
  { de: "Critere_2/Indicateur_5/BEN/Indicateur 5 - Document de synthese", vers: "Critere_3/Indicateur_11/BEN/Indicateur 11 - Document de synthese" },
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

const DATE_SIG = /(?:Signé le|, le|^Le) (\d{2})\/(\d{2})\/(\d{4})/;
const imgSig = (url: string, alt: string, tampon = false) =>
  `<img src="${url}" alt="${alt}" style="max-height:${tampon ? 60 : 50}px;max-width:${tampon ? 140 : 120}px;object-fit:contain;margin-top:5px${tampon ? ";opacity:0.85" : ""}" />`;
const signeManuscrit = (nom: string) => (nom ? `<p style="font-family:'Brush Script MT',cursive;font-size:18px;color:#1a3a8c;margin:4px 0 0">Signé par ${nom}</p>` : "");
const ligneVide = `<div style="height:48px;border-bottom:1px dotted #bbb;margin-top:10px"></div>`;

/**
 * Bloc de signatures au même format que les autres dossiers Qualiopi (signatureBlock2 de docBuilder) :
 * un cadre par signataire — qualité, nom, date, signature. Signature apposée seulement si la date est
 * échue : tampon de l'organisme (sinon signature du dirigeant) pour l'organisme, signature enregistrée
 * du consultant ou du bénéficiaire, à défaut sa signature manuscrite « Signé par … » comme pour les
 * émargements des actions de formation.
 */
function blocSignatures(cellules: string[], org: OrganismeInfo, f: FormationInfo, b: BenNexus, v: Vars, arrete: Date): string {
  const dirigeant = org.tamponUrl || org.signatureUrl;
  const consultantUrl = f.formateurSignatureUrl || (String(v.CONSULTANT) === String(v.DIRIGEANT) ? org.signatureUrl : undefined);
  const cadres = cellules.map((cell) => {
    const parts = cell.split("⏎").map((x) => x.trim()).filter(Boolean);
    const libelle = parts[0] || "";
    const nom = (parts[1] || "").replace(/^_+$/, "");
    const derniere = parts[parts.length - 1] || "";
    const m = derniere.match(DATE_SIG) || cell.match(DATE_SIG);
    const date = m ? `${m[1]}/${m[2]}/${m[3]}` : "____ / ____ / ________";
    const qualites = parts.slice(2).filter((x) => x !== derniere || !/(Signé le|À signer le|^Le |, le )/.test(x));
    const echu = !!m && !/À signer/.test(derniere) && new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1])).getTime() <= arrete.getTime();
    let sig = ligneVide;
    if (echu) {
      if (/bénéficiaire/i.test(libelle)) sig = b.s.signatureUrl ? imgSig(b.s.signatureUrl, "Signature du bénéficiaire") : signeManuscrit(nom) || ligneVide;
      else if (/consultant|intéressé/i.test(libelle)) sig = consultantUrl ? imgSig(consultantUrl, "Signature du consultant") : signeManuscrit(nom) || ligneVide;
      else if (/organisme|^pour |direction|donneur d'ordre/i.test(libelle)) sig = dirigeant ? imgSig(dirigeant, org.tamponUrl ? "Tampon de l'organisme" : "Signature du représentant légal", !!org.tamponUrl) : signeManuscrit(String(v.DIRIGEANT)) || ligneVide;
      else if (/employeur|entreprise/i.test(libelle)) sig = b.s.signatureResponsableUrl ? imgSig(b.s.signatureResponsableUrl, "Signature de l'employeur") : signeManuscrit(nom) || ligneVide;
      else sig = signeManuscrit(nom) || ligneVide;
    }
    return `<div class="sig-box"><p class="sig-label">${libelle}</p><p>Nom : ${nom || "________________________"}</p>${qualites.map((q) => `<p>${q}</p>`).join("")}<p>Date : ${date}</p><p style="margin-top:20px">Signature :</p>${sig}</div>`;
  });
  const classe = cadres.length >= 3 ? "signature-block" : cadres.length === 2 ? "signature-block-2" : "signature-block-1";
  return `<div class="${classe}">${cadres.join("")}</div>`;
}

/* ------------------------------------------------------------------ */
/* Rendu                                                               */
/* ------------------------------------------------------------------ */

/** Seconde cellule d'un vrai en-tête de tableau à deux colonnes (« Question | Réponse du bénéficiaire »…). */
const EN_TETE_2_COLONNES = /^(Ce qu'il faut|Mise en œuvre|Résultat attendu|Réponse du|1 → 5|Objet$|Conditions d'accès|Modalité d'association|Conséquence|Cocher|Concrètement|Information$|Exigence minimale|Caractéristiques|Usage dans|Où elle figure|Jointe)/;

/** Une table markdown de signatures : chaque cellule « Qualité ⏎ Nom ⏎ … ⏎ Signé le / Le ____ ». */
const estLigneSignature = (l: string) => /^\|.*⏎.*\|\s*$/.test(l.trim()) && /(Signé le|À signer le|Le _{2,}| le _{2,}|, le \d)/.test(l) && /(Le |La |L'|Pour )/.test(l);

/**
 * Rendu au même format que les autres dossiers Qualiopi (buildDocument de docBuilder) : en-tête de
 * l'organisme, titre, sections, cadres de signature, pied de page de l'organisme.
 */
function rendreHtml(md: string, org: OrganismeInfo, f: FormationInfo, b: BenNexus, v: Vars, arrete: Date, signer: boolean): string {
  const lignes = md.replace(/\r\n/g, "\n").split("\n");
  let i = 0;
  while (i < lignes.length && !lignes[i].trim()) i++;
  const m = (lignes[i] || "").match(/^\*\*(.+)\*\*\s*$/);
  const titre = m ? m[1] : "";
  const corps = m ? lignes.slice(i + 1) : lignes;
  const blocs: string[] = [];
  const sortie: string[] = [];
  for (let k = 0; k < corps.length; k++) {
    const l = corps[k];
    if (estLigneSignature(l)) {
      const cellules = l.trim().slice(1, -1).split("|").map((c) => c.trim()).filter(Boolean);
      if (/^\|[-\s|:]+\|$/.test((corps[k + 1] || "").trim())) k++;
      blocs.push(blocSignatures(cellules, org, f, b, v, signer ? arrete : new Date(0)));
      sortie.push("", `§§SIGNATURES${blocs.length - 1}§§`, "");
      continue;
    }
    // Tableau « libellé | valeur » : pas de bandeau d'en-tête (première ligne = donnée), comme les
    // grilles d'information des autres dossiers ; seuls les vrais en-têtes de colonnes restent en bandeau.
    if (/^\|[^|]*\|[^|]*\|\s*$/.test(l.trim()) && /^\|\s*-+\s*\|\s*-+\s*\|\s*$/.test((corps[k + 1] || "").trim()) && !/^\|/.test((corps[k - 1] || "").trim())) {
      const second = l.trim().slice(1, -1).split("|")[1]?.trim() || "";
      if (!EN_TETE_2_COLONNES.test(second)) sortie.push("§§NOHEADER_TABLE§§");
    }
    // Ligne entièrement en gras : intertitre de section, comme les <h2> des autres dossiers.
    const t = l.match(/^\*\*([^*]+)\*\*\s*$/);
    sortie.push(t ? `<div class="nexus-section"><h2>${t[1].replace(/&/g, "&amp;").replace(/</g, "&lt;")}</h2></div>` : l);
  }
  let corpsHtml = mdToHtmlBody(sortie.join("\n")).replace(/\s*⏎\s*/g, "<br/>");
  corpsHtml = corpsHtml.replace(/<p>§§SIGNATURES(\d+)§§<\/p>/g, (_, n) => blocs[Number(n)] || "");
  return htmlWrap(`${orgHeader(org)}${titre ? `<h1>${titre}</h1>` : ""}${corpsHtml}${footer(org)}`);
}

/** Une pièce du dossier : chemin dans le ZIP (sans extension pour les PDF), format et rendu HTML. */
export interface DocNexus {
  /** Chemin complet dans le ZIP, extension comprise. */
  chemin: string;
  /** Clé stable : chemin avec « BEN » à la place du dossier du bénéficiaire. */
  cle: string;
  format: "pdf" | "xlsx";
  /** Index du bénéficiaire (pièces nominatives) ; absent pour les pièces de l'organisme. */
  ben?: number;
  html: () => string;
}

const dossierBen = (b: BenNexus) => `Bénéficiaire - ${b.nomme ? `${b.s.prenom} ${b.s.nom}`.trim() : "Modèle"}`;

/**
 * Liste des pièces du dossier (PDF et classeurs). Le rendu de chaque pièce est paresseux :
 * la liste se construit sans rien rendre, ce qui permet au catalogue de l'utiliser.
 */
export function planNexus(
  org: OrganismeInfo,
  formation: FormationInfo,
  stagiaires: StagiaireInfo[],
  templates: Record<string, string>,
  arrete = new Date(),
): DocNexus[] {
  const benList = stagiaires.map((s) => ({ ...s, financeur: financeurEffectifBC(s, org, formation) }));
  const bens = construireBeneficiaires(org, formation, benList, (s) => s.financeur || "");
  const ctx = contexteNexus(org, formation, bens, arrete);
  const premier = bens[0];
  let bdcCtxCache: ReturnType<typeof buildBdcContext> | null = null;
  const bdcCtx = () => (bdcCtxCache ||= buildBdcContext(org, formation, benList));

  const sorties: Sortie[] = [];
  const ajouter = (cle: string, chemin: string, extra: Partial<Sortie> = {}) => {
    if (cle.includes(`/${BEN}/`)) for (const b of bens) sorties.push({ chemin: chemin.replace(`/${BEN}/`, `/${dossierBen(b)}/`), cle: chemin, gabarit: cle, ben: b, ...extra });
    else sorties.push({ chemin, cle: chemin, gabarit: cle, ben: premier, ...extra });
  };
  for (const cle of Object.keys(templates)) ajouter(cle, cle, { surcharges: { IND: cle.match(/Indicateur_(\d+)/)?.[1] || "" } });
  for (const c of COPIES) ajouter(c.de, c.vers, { surcharges: { IND: c.ind || c.vers.match(/Indicateur_(\d+)/)?.[1] || "", ...(c.vierge ? VIERGE : {}) } });
  for (const kind of ["entreprise", "financeur", "interne"] as const) {
    const cle = `Critere_7/Indicateur_30/${BEN}/Indicateur 30 - Questionnaire de satisfaction ${kind}`;
    for (const b of bens) sorties.push({ chemin: cle.replace(`/${BEN}/`, `/${dossierBen(b)}/`), cle, md: questionnairePartie(kind), ben: b });
  }

  const varsCache = new Map<BenNexus, { v: Vars; bl: Record<string, string> }>();
  const varsDe = (b: BenNexus) => {
    let e = varsCache.get(b);
    if (!e) {
      const v0 = varsBeneficiaire(ctx, b);
      const v1 = { ...v0, ...casesACocher(ctx, b, v0) };
      const v = { ...v1, ...reponsesNexus(ctx, b, v1) };
      e = { v, bl: blocs(ctx, b, v) };
      varsCache.set(b, e);
    }
    return e;
  };

  const docs: DocNexus[] = sorties.map((s) => ({
    chemin: `${s.chemin}.pdf`,
    cle: `${s.cle}.pdf`,
    format: "pdf" as const,
    ben: s.cle.includes(`/${BEN}/`) ? bens.indexOf(s.ben) : undefined,
    html: () => {
      const { v: v0, bl } = varsDe(s.ben);
      const v = { ...v0, ...(s.surcharges || {}) };
      let md = s.md ? s.md(ctx, s.ben, v) : remplir(templates[s.gabarit!], v, bl);
      const restes = md.match(/\{\{[^}]+\}\}/g);
      if (restes) console.warn("[BDC NEXUS] variables non résolues", s.chemin, [...new Set(restes)]);
      return rendreHtml(md, org, formation, s.ben, v, arrete, s.surcharges?.BEN !== "");
    },
  }));

  const xlsx = (chemin: string, html: () => string, ben?: number, cle = chemin) => docs.push({ chemin, cle, format: "xlsx", ben, html });
  xlsx("Critere_1/Indicateur_1/Indicateur 1 - Calendrier annuel.xlsx", () => calendrierAnnuel(ctx));
  xlsx("Critere_1/Indicateur_2/Indicateur 2 - Tableaux de suivi et indicateurs de resultats.xlsx", () => classeurIndicateurs2Html(org, formation, benList));
  xlsx("Critere_2/Indicateur_4/Indicateur 4 - Cahier de contacts et analyse du besoin.xlsx", () => cahierContacts(ctx));
  for (const ind of [5, 11]) {
    const crit = ind === 5 ? 2 : 3;
    xlsx(`Critere_${crit}/Indicateur_${ind}/Indicateur ${ind} - Matrices d'evaluation du bilan (classeur).xlsx`, () => htmlClasseurMatrices(bdcCtx(), org));
    bens.forEach((b, i) => {
      const cle = `Critere_${crit}/Indicateur_${ind}/${BEN}/Indicateur ${ind} - Matrices d'evaluation renseignees.xlsx`;
      xlsx(cle.replace(`/${BEN}/`, `/${dossierBen(b)}/`), () => htmlClasseurMatrices(bdcCtx(), org, bdcCtx().beneficiaires[i]), i, cle);
    });
  }
  xlsx("Critere_3/Indicateur_12/Indicateur 12 - Registre des abandons et des aleas.xlsx", () => htmlRegistreAbandons(bdcCtx(), org, arrete));
  xlsx("Critere_6/Indicateur_26/Indicateur 26 - Contacts et suivi handicap.xlsx", () => contactsHandicap(ctx));
  xlsx("Critere_6/Indicateur_26/Indicateur 26 - Suivi des adaptations par beneficiaire.xlsx", () => suiviAdaptations(ctx));
  xlsx("Critere_7/Indicateur_31/Indicateur 31 - Tableau des dysfonctionnements.xlsx", () => tableauDysfonctionnements(ctx));
  return docs;
}

/** Contacts Agefiph : PDF statique du dossier de référence. */
export const NEXUS_PDF_AGEFIPH = { chemin: "Critere_6/Indicateur_26/Indicateur 26 - Contacts AGEFIPH.pdf", url: "/pdfs/bdc_nt/contacts_agefiph.pdf" };
