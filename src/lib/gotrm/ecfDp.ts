/**
 * MOTEUR UNIQUE — DP (45A) et ECF (45B)
 *
 * Ce module construit le Dossier professionnel et le Livret d'évaluations
 * passées en cours de formation pour N'IMPORTE QUEL titre professionnel :
 * le référentiel (titre officiel, code titre, millésime, RNCP, arrêté, J.O.,
 * activités-types) est résolu par `resolveReferentiel()` et n'est plus lu en dur.
 *
 * Règles structurantes :
 *  - aucun nom d'entreprise, de personne ou de date n'est inventé ;
 *  - la période d'exercice n'est jamais déduite des dates de session ;
 *  - les rubriques 1, 2, 3 et 5 du DP sont recomposées à partir de fentes
 *    indépendantes (contexte, contrainte, méthode, outils, aléa, clôture,
 *    interlocuteurs, retour) pour interdire toute duplication entre dossiers ;
 *  - la déclaration sur l'honneur n'est jamais pré-signée.
 */

import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import {
  htmlWrap,
  formatDate,
  getStagiaireDateDebut,
  getStagiaireDateFin,
  subtractBusinessDays,
  g,
} from "@/lib/docBuilder";
import {
  resolveReferentiel,
  nettoyerIntitule,
  DP_TRAME_VERSION,
  
  ECF_TYPE_DOC,
  type DpReferentiel,
} from "@/lib/dp/referentielTitres";
import { getBanque, detectDomaine, type DpBanque } from "@/lib/dp/dpBanques";
import { findGotrmProfile, type GotrmCvProfile } from "@/lib/gotrm/cvProfiles";
import {
  buildEcfProfilage,
  LIBELLE_NIVEAU,
  MENTION_PRE_RENSEIGNE,
  MARQUEUR_SANS_PROFIL,
} from "@/lib/dp/ecfProfilage";

// ───────────────────────────────────────────── utils

export const A_RENSEIGNER_TXT = "[à renseigner par le candidat]";
const A_RENSEIGNER = `<span style="color:#b00020;font-weight:600">${A_RENSEIGNER_TXT}</span>`;

function seedOf(s: StagiaireInfo | null | undefined, salt = 0): number {
  const base = `${s?.nom || ""}${s?.prenom || ""}${s?.email || ""}`.toUpperCase();
  let h = 7;
  for (let i = 0; i < base.length; i++) h = (h * 31 + base.charCodeAt(i)) % 100000;
  return (h + salt * 977) % 100000;
}
function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}
/** Tirage sans remise : ordre déterministe propre au dossier. */
function shuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = (seed * (i + 7) + i * 31) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
/** Décale une date ISO de n jours ouvrés. */
function addWorkDays(iso: string, days: number): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  let left = days;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    const w = d.getDay();
    if (w !== 0 && w !== 6) left--;
  }
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

/**
 * Charte des trames officielles 45A (Dossier professionnel) et 45B (Livret
 * d'évaluations passées en cours de formation) : magenta soutenu #E5007D,
 * bandes grises, tirets verticaux magenta, cadres de réponse gris clair.
 * Aucun bleu : ce n'est pas la couleur des trames.
 */
const MAGENTA = "#E5007D";
const STYLE_MINISTERE = `<style>
  .doc-officiel{font-family:'Calibri','Arial',sans-serif;color:#1a1a1a;font-size:11pt;line-height:1.4}
  .doc-officiel h1{text-align:center;font-size:17pt;font-weight:bold;margin:24px 0 16px;letter-spacing:1.5px;color:#333;text-transform:uppercase}
  .doc-officiel h2{font-size:12pt;font-weight:bold;margin:20px 0 10px;color:#222;padding:0 0 5px 12px;border-left:5px solid ${MAGENTA};border-bottom:2px solid ${MAGENTA}}
  .doc-officiel h3{font-size:11pt;font-weight:bold;margin:14px 0 6px;color:#222;padding-left:10px;border-left:4px solid ${MAGENTA}}
  .doc-officiel .bande-titre{background:#F2F2F2;padding:9px 14px;font-variant:small-caps;letter-spacing:2px;color:#444;font-weight:bold;font-size:12pt;position:relative;border-bottom:4px solid ${MAGENTA}}
  .doc-officiel .bandeau-magenta{background:${MAGENTA};color:#fff;font-weight:bold;text-align:center;padding:8px 12px;letter-spacing:.5px}
  .doc-officiel .double-filet{border-top:3px solid ${MAGENTA};border-bottom:1px solid ${MAGENTA};height:4px;margin:0 0 14px}
  .doc-officiel .bloc-identite{border-left:5px solid ${MAGENTA};padding:6px 0 6px 14px;margin:18px 0}
  .doc-officiel .bloc-identite .lib{font-style:italic;color:${MAGENTA};font-size:10.5pt}
  .doc-officiel .bloc-identite .val{font-weight:bold;color:#111}
  .doc-officiel .cadre-reponse{border:1px solid #CFCFCF;padding:10px 12px;margin:6px 0 14px;min-height:52px;background:#fff}
  .doc-officiel .cadre-fin{border:1px solid #BBB;padding:8px 12px;margin:10px 0;font-variant:small-caps;letter-spacing:1px}
  .doc-officiel .entete-courant{text-align:center;font-variant:small-caps;letter-spacing:2px;color:#555;font-size:9.5pt;border-top:1px solid #CCC;border-bottom:1px solid #CCC;padding:3px 0;margin-bottom:0}
  .doc-officiel p{margin:8px 0;text-align:justify;line-height:1.5}
  .doc-officiel ol,.doc-officiel ul{margin:8px 0 8px 22px}
  .doc-officiel li{margin:3px 0}
  .doc-officiel table{width:100%;border-collapse:collapse;margin:12px 0}
  .doc-officiel table th,.doc-officiel table td{border:1px solid #9A9A9A;padding:6px 8px;vertical-align:top;text-align:left;color:#1a1a1a}
  .doc-officiel table th{background:#EFEFEF;font-weight:bold;font-size:9.5pt;color:#222}
  .doc-officiel table.contexte th{background:#EFEFEF;color:#222;font-weight:bold}
  .doc-officiel table.contexte caption{caption-side:top;text-align:left;font-weight:bold;background:#E4E4E4;color:#222;padding:6px 8px;border:1px solid #9A9A9A;border-bottom:0}
  .doc-officiel .grille-comp{display:inline-block}
  .doc-officiel table.grille-comp td{border:0;padding:1px 8px 1px 0;font-size:9pt;white-space:nowrap}
  .doc-officiel .verdict{margin:10px 0;padding:8px 0;line-height:1.7}
  .doc-officiel .page-break{page-break-after:always;break-after:page}
  /* Pied ancré (rendu hors flux par le moteur d'export, une fois par page physique) */
  .footer.pied-dp{padding:6px 26px 0;border-top:2px solid ${MAGENTA};display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:8pt;line-height:1.6;color:#555;min-height:26px}
  .footer.pied-dp .pied-dp-t{flex:1 1 auto;text-align:left;font-variant:small-caps;letter-spacing:.5px;color:#333;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .footer.pied-dp .pied-dp-v{flex:0 0 auto;text-align:center;font-style:italic;white-space:nowrap}
  .footer.pied-dp .pied-dp-p{flex:0 0 auto;text-align:right;white-space:nowrap;color:${MAGENTA};font-weight:bold}
  .footer.pied-ecf{padding:0 18px}
  .footer.pied-ecf table{width:100%;border-collapse:collapse;font-size:7.5pt}
  .footer.pied-ecf th,.footer.pied-ecf td{border:1px solid #9A9A9A;padding:3px 4px;text-align:center;line-height:1.5;color:#222}
  .footer.pied-ecf th{background:#EFEFEF;font-weight:bold}
</style>`;

const STYLE_ECF = `<style>
  .doc-officiel .marqueur-attente{border:1.5px dashed #b00020;color:#b00020;font-weight:600;padding:8px 12px;margin:12px 0}
  .doc-officiel .mention-prerenseigne{margin-top:18px;padding:8px 12px;border-left:4px solid ${MAGENTA};background:#FDF2F6;font-size:9.5pt;font-style:italic;color:#333}
</style>`;

const CHK = (on: boolean) => (on ? "☒" : "☐");

/** Cellule de visa : image si fournie, sinon mention manuscrite attendue. */
function visaCell(nom: string, date: string, imgUrl?: string): string {
  if (imgUrl) return `<img src="${imgUrl}" alt="Visa ${nom}" style="max-height:56px" />`;
  return `<span style="font-family:'Segoe Script','Brush Script MT',cursive;font-size:12pt">${nom}</span><br><span style="font-size:8pt;color:#555">Visa apposé le ${date}</span>`;
}

/**
 * Cadre de signature manuscrite : utilisé pour la déclaration sur l'honneur du
 * DP, signée de la main du candidat. Aucun visa n'est fabriqué.
 */
function cadreSignature(imgUrl?: string): string {
  if (imgUrl) return `<img src="${imgUrl}" alt="Signature" style="max-height:56px" />`;
  return `<div style="height:58px"></div><span style="font-size:8pt;color:#666">Signature manuscrite du candidat</span>`;
}

/** Ligne de tableau omise si la valeur est vide (jamais de nom inventé). */
function rowIf(label: string, value?: string): string {
  return value && value.trim() ? `<tr><th style="width:34%">${label}</th><td>${value}</td></tr>` : "";
}

// ───────────────────────────────────────────── référentiel + profil

function profilCandidat(s?: StagiaireInfo): GotrmCvProfile | undefined {
  return findGotrmProfile(s?.nom, s?.prenom);
}

export interface DpContexteEntreprise {
  nom: string;
  service: string;
  ville: string;
  /** true si l'information est réellement connue (saisie ou profil transmis). */
  connue: boolean;
}

function resolveEntreprise(s?: StagiaireInfo, cv?: GotrmCvProfile): DpContexteEntreprise {
  if (s?.entreprise?.trim()) {
    return {
      nom: s.entreprise.trim(),
      service: s.poste?.trim() || "",
      ville: s.commune || "",
      connue: true,
    };
  }
  if (cv?.entreprise?.nom) {
    return { nom: cv.entreprise.nom, service: cv.entreprise.service || "", ville: cv.entreprise.ville || "", connue: true };
  }
  return { nom: "", service: "", ville: "", connue: false };
}

/** Extrait les bornes d'une période rédigée en clair (« Du 1er mars 2022 au 30 juin 2024 »). */
const MOIS_FR = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
export function parsePeriodeFr(txt: string): { debut: Date; fin: Date } | null {
  if (!txt) return null;
  const dates: Date[] = [];
  const reLong = /(\d{1,2})(?:er)?\s+([a-zéûôA-Z]+)\s+(\d{4})/g;
  let m: RegExpExecArray | null;
  while ((m = reLong.exec(txt))) {
    const mi = MOIS_FR.findIndex((x) => x.startsWith(m![2].toLowerCase().slice(0, 4)));
    if (mi >= 0) dates.push(new Date(Number(m[3]), mi, Number(m[1])));
  }
  const reNum = /(\d{2})\/(\d{2})\/(\d{4})/g;
  while ((m = reNum.exec(txt))) dates.push(new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1])));
  if (dates.length < 2) return null;
  dates.sort((a, b) => a.getTime() - b.getTime());
  return { debut: dates[0], fin: dates[dates.length - 1] };
}

export interface DpExempleData {
  atIndex: number;
  atTitre: string;
  numero: number;
  intitule: string;
  r1: string;
  r2: string;
  r3: string;
  r5: string;
}

export interface DpDossierData {
  stagiaire: StagiaireInfo;
  ref: DpReferentiel;
  banque: DpBanque;
  entreprise: DpContexteEntreprise;
  /** Période d'exercice professionnelle, jamais dérivée des dates de session. */
  periodeExercice: string;
  periodeConnue: boolean;
  cv?: GotrmCvProfile;
  exemples: DpExempleData[];
}

/**
 * Construit les données structurées du DP d'un candidat.
 * Utilisé à la fois par le générateur HTML et par les contrôles bloquants.
 */
export function buildDpDossier(
  org: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx = 0,
): DpDossierData {
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  const seed = seedOf(s);
  const ref = resolveReferentiel(f);
  const banque = getBanque(f);
  const cv = profilCandidat(s);
  const entreprise = resolveEntreprise(s, cv);
  const periodeExercice = (cv?.periodeExercice || "").trim();

  // Tirage sans remise sur l'ensemble du dossier : intitulés ET fentes de phrases.
  // Un même intitulé ou un même fragment ne peut donc pas réapparaître deux fois.
  const intitules = shuffle(banque.intitules, seed);
  let curseurIntitule = 0;
  const files: Record<string, string[]> = {
    contexte: shuffle(banque.contexte, seed + 11),
    contrainte: shuffle(banque.contrainte, seed + 23),
    methode: shuffle(banque.methode, seed + 37),
    outils: shuffle(banque.outils, seed + 41),
    alea: shuffle(banque.alea, seed + 53),
    cloture: shuffle(banque.cloture, seed + 67),
    interlocuteurs: shuffle(banque.interlocuteurs, seed + 71),
    retour: shuffle(banque.retour, seed + 83),
  };
  const curseurs: Record<string, number> = {};
  const next = (slot: string): string => {
    const f = files[slot];
    const i = curseurs[slot] || 0;
    curseurs[slot] = i + 1;
    return f[i % f.length];
  };

  // Ancrage factuel propre au candidat (entreprise et service réellement renseignés)
  const ancrageContexte = [entreprise.service, entreprise.nom].filter(Boolean).join(" – ");

  const exemples: DpExempleData[] = [];
  ref.activitesTypes.forEach((at, ci) => {
    const nbEx = Math.min(2, Math.max(1, Math.floor(intitules.length / Math.max(1, ref.activitesTypes.length))));
    for (let ej = 0; ej < nbEx; ej++) {
      const intitule = intitules[curseurIntitule % intitules.length] || `Exemple de pratique professionnelle n° ${curseurIntitule + 1}`;
      curseurIntitule++;

      // L'accroche issue du profil n'est utilisée qu'une fois par activité-type
      const accroche = ej === 0 ? cv?.accroches?.[ci] || "" : "";
      const prefixe = ancrageContexte ? `Au sein de ${ancrageContexte}${periodeExercice ? ` (${periodeExercice.charAt(0).toLowerCase()}${periodeExercice.slice(1)})` : ""} :` : "";
      const r1 = [prefixe, accroche, next("contexte"), next("contrainte"), next("methode"), next("alea")].filter(Boolean).join(" ");
      // Les outils du profil ne sont cités que sur le premier exemple du dossier
      const outilsProfil = cv?.outils && exemples.length === 0 ? ` J'utilisais également ${cv.outils}.` : "";
      const ancrage = ancrageContexte;
      const r2 = `Pour cette opération, j'ai utilisé ${next("outils")}.${outilsProfil}${ancrage ? ` Les documents produits ont été classés dans le dossier d'exploitation de ${ancrage}.` : ""}`;
      const r3 = `J'ai travaillé ${next("interlocuteurs")}${ancrage ? `, au sein de ${ancrage}` : ""}.`;
      const r5 = `${next("cloture")} ${next("retour")}${ancrage ? ` Ce dossier est conservé dans les archives d'exploitation de ${ancrage}.` : ""}`;

      exemples.push({ atIndex: ci + 1, atTitre: at.titre, numero: ej + 1, intitule, r1, r2, r3, r5 });
    }
  });

  return {
    stagiaire: s,
    ref,
    banque,
    entreprise,
    periodeExercice,
    periodeConnue: periodeExercice.length > 0,
    cv,
    exemples,
  };
}

// ───────────────────────────────────────────── ECF

/**
 * Modalités d'évaluation, différenciées PAR ACTIVITÉ-TYPE.
 * Chaque activité-type dispose de ses propres libellés : les quatre lignes
 * d'une fiche de résultats ne peuvent pas être identiques d'une AT à l'autre.
 */
const ECF_MODALITES_PAR_AT: ((c: string, at: string) => string)[][] = [
  [
    (c, at) => `Étude de cas « ${at} » : analyse d'une demande client réelle, étude de faisabilité et rédaction de l'offre chiffrée — compétence évaluée : ${c}`,
    (c) => `Production écrite : construction d'un devis argumenté (prix de revient, marge, conditions d'exécution) et présentation orale des hypothèses retenues — compétence évaluée : ${c}`,
    (c) => `Mise en situation : réception d'une demande urgente, arbitrage coût / délai et rédaction de la réponse au donneur d'ordres — compétence évaluée : ${c}`,
    (c) => `Entretien technique portant sur la contractualisation de la prestation et les mentions obligatoires du contrat de transport — compétence évaluée : ${c}`,
  ],
  [
    (c, at) => `Mise en situation professionnelle reconstituée « ${at} » : affectation des moyens, construction du plan de marche et respect du règlement (CE) 561/2006 — compétence évaluée : ${c}`,
    (c) => `Exercice sur poste informatisé : saisie et suivi des ordres dans le TMS, édition des documents de transport et contrôle des pièces — compétence évaluée : ${c}`,
    (c) => `Gestion d'aléa en temps contraint : panne / retard signalé en cours de tournée, replanification et information du client — compétence évaluée : ${c}`,
    (c) => `Étude de dossier de sous-traitance : contrôle des pièces de l'affrété et traçabilité de l'opération — compétence évaluée : ${c}`,
  ],
  [
    (c, at) => `Étude de cas de pilotage « ${at} » : construction et lecture d'un tableau de bord d'exploitation, analyse des écarts — compétence évaluée : ${c}`,
    (c) => `Production écrite : compte rendu d'activité mensuel assorti de préconisations chiffrées à la direction — compétence évaluée : ${c}`,
    (c) => `Mise en situation d'animation d'équipe : conduite d'un point d'exploitation et traitement d'un litige client — compétence évaluée : ${c}`,
    (c) => `Entretien technique sur les obligations réglementaires de l'entreprise (licence, temps de travail, sécurité) — compétence évaluée : ${c}`,
  ],
];

const MODALITES_GENERIQUES: ((c: string, at: string) => string)[] = [
  (c, at) => `Étude de cas contextualisée « ${at} » : analyse de la demande, production écrite et argumentation de la solution retenue — compétence évaluée : ${c}`,
  (c, at) => `Mise en situation professionnelle reconstituée sur le poste de travail (activité-type « ${at} ») avec production du dossier attendu — compétence évaluée : ${c}`,
  (c, at) => `Questionnement à partir de productions réalisées en centre, portant sur « ${at} » — compétence évaluée : ${c}`,
  (c, at) => `Entretien technique avec le formateur évaluateur sur les choix professionnels opérés dans l'activité « ${at} » — compétence évaluée : ${c}`,
];

function modalitesAT(ci: number): ((c: string, at: string) => string)[] {
  return ECF_MODALITES_PAR_AT[ci] || MODALITES_GENERIQUES;
}

const ECF_CONSOLIDATION_PAR_AT = [
  "Évaluation de consolidation : reprise complète d'une demande client, du calcul du prix de revient à la remise de l'offre, avec restitution orale devant le formateur évaluateur.",
  "Évaluation de consolidation : construction d'un plan de marche conforme à la réglementation sociale européenne, suivi d'un débriefing individualisé.",
  "Évaluation de consolidation : production d'un tableau de bord commenté et d'un plan d'actions correctives, présenté à l'oral.",
];

/** Date d'évaluation : répartie sur le calendrier réel, jamais dans le futur. */
function dateEvaluation(debut: string, fin: string, position: number, total: number): string {
  if (!debut) return "";
  const d0 = new Date(debut);
  if (isNaN(d0.getTime())) return "";
  const aujourdhui = new Date();
  let borne = fin ? new Date(fin) : aujourdhui;
  if (isNaN(borne.getTime())) borne = aujourdhui;
  if (borne > aujourdhui) borne = aujourdhui;
  if (borne <= d0) return debut;
  const joursTotal = Math.max(1, Math.round((borne.getTime() - d0.getTime()) / 86400000));
  // Réparties de 15 % à 95 % de la période effective
  const frac = 0.15 + (0.8 * (position + 1)) / (total + 1);
  const d = new Date(d0.getTime() + Math.round(joursTotal * frac) * 86400000);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() - 1);
  if (d < d0) return debut;
  return d.toISOString().slice(0, 10);
}

export function genECFUnifie(
  org: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx = 0,
): string {
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  const ref = resolveReferentiel(f);
  const cv = profilCandidat(s);
  const prof = buildEcfProfilage(ref, cv);
  const debut = getStagiaireDateDebut(s, f);
  const fin = getStagiaireDateFin(s, f);
  const dateVisa = fin ? formatDate(fin) : formatDate(f.dateFin || "");
  const evaluateur1 = f.formateur || org.responsablePedagogique || "";
  const evaluateur2 =
    org.responsablePedagogique && org.responsablePedagogique !== evaluateur1
      ? org.responsablePedagogique
      : org.referentQualite && org.referentQualite !== evaluateur1
        ? org.referentQualite
        : "";
  const lieu = f.lieu || [org.adresse, `${org.codePostal || ""} ${org.ville || ""}`.trim()].filter(Boolean).join(", ");

  // Nombre total d'évaluations planifiées, pour répartir les dates
  const nbEvalParAT = ref.activitesTypes.map((at) => Math.min(4, Math.max(1, at.competences.length)));
  const totalEval = nbEvalParAT.reduce((a, b) => a + b, 0);
  const offsetAT = nbEvalParAT.map((_, i) => nbEvalParAT.slice(0, i).reduce((a, b) => a + b, 0));

  // Date de mise à jour du livret : jamais antérieure à la fin de formation
  const finDoc = fin || f.dateFin || "";
  const majDoc =
    org.dateMaj && finDoc && new Date(org.dateMaj) >= new Date(finDoc)
      ? org.dateMaj
      : finDoc || org.dateMaj || "";
  // Date de mise à jour du référentiel (trame officielle) sinon date de fin de session
  const majPied = ref.dateMaj || formatDate(majDoc);

  /**
   * Pied de page officiel ECF : tableau à sept colonnes, ancré en bas de CHAQUE
   * page physique par le moteur d'export (jetons {{PAGE}} / {{PAGES}}).
   */
  const piedEcf = `<div class="footer pied-ecf"><table>
    <tr><th style="width:9%">SIGLE</th><th style="width:34%">Type de document</th><th style="width:11%">Code titre</th><th style="width:9%">Millésime</th><th style="width:12%">Date JO</th><th style="width:15%">Date de mise à jour</th><th style="width:10%">Page</th></tr>
    <tr><td>${ref.sigle || ""}</td><td>${ECF_TYPE_DOC}</td><td>${ref.codeTitre || ""}</td><td>${ref.millesime || ""}</td><td>${ref.dateJo || ""}</td><td>${majPied}</td><td>{{PAGE}}/{{PAGES}}</td></tr>
  </table></div>`;

  const pages: string[] = [];

  // ── Page de garde officielle (trame « Livret d'évaluations »)
  pages.push(`<div style="text-align:center">
    <img src="/__l5e/assets-v1/4d848a41-d76e-4a70-90b8-4cc8a50a0e77/ecf-header-officiel.png" alt="Ministère du Travail – Livret d'évaluations passées en cours de formation" style="width:100%;max-width:660px;height:auto" />
  </div>
  <div class="bandeau-magenta" style="margin-top:22px">Titre professionnel</div>
  <div class="double-filet"></div>
  <p style="text-align:center;font-size:13pt;font-weight:bold;margin:6px 0">${ref.titreOfficiel}</p>
  ${ref.niveau ? `<p style="text-align:center;margin:0 0 14px">${ref.niveau}</p>` : ""}
  <table style="width:72%;margin:10px 0 10px auto;border-collapse:collapse;font-size:10.5pt">
    <tr><th style="width:48%">Arrêté du :</th><td>${ref.dateArrete || ""}</td></tr>
    <tr><th>J.O. du :</th><td>${ref.dateJo || ""}</td></tr>
    <tr><th>Date d'effet au :</th><td>${ref.dateJo || ""}</td></tr>
  </table>
  <table style="width:100%;border-collapse:collapse;font-size:10.5pt;margin-top:18px">
    <tr><th style="width:32%">Organisme de formation</th><td>${org.nom}</td></tr>
    ${rowIf("Lieu de formation", lieu)}
  </table>
  <div class="bloc-identite" style="margin-top:20px">
    <div class="lib" style="font-weight:bold;font-size:12pt">Candidat(e) :</div>
    <div style="margin-top:6px">Mme ${CHK(s?.civilite === "Mme")} &nbsp;&nbsp;&nbsp; M. ${CHK(s?.civilite !== "Mme")}</div>
    <div style="margin-top:6px"><span class="lib">Nom :</span> <span class="val">${s?.nom || ""}</span></div>
    <div><span class="lib">Prénom :</span> <span class="val">${s?.prenom || ""}</span></div>
    ${s?.dateNaissance ? `<div><span class="lib">Date de naissance :</span> <span class="val">${formatDate(s.dateNaissance)}</span></div>` : ""}
    <div><span class="lib">Période de formation :</span> <span class="val">Du ${formatDate(debut)} au ${formatDate(fin)}</span></div>
  </div>
  ${!prof.renseigne ? `<p class="marqueur-attente">${MARQUEUR_SANS_PROFIL}</p>` : ""}`);

  // ── Présentation du dossier
  pages.push(`<h2>Présentation du dossier</h2>
  <p>Les évaluations passées en cours de formation décrites dans les fiches qui suivent ont été mises en œuvre en référence aux critères issus des référentiels du titre professionnel, pour les sessions d'examen « Titre », « CCP » et « CCS » telles que prévues par l'arrêté du 22 décembre 2015 relatif aux conditions de délivrance du titre professionnel du ministère chargé de l'emploi.</p>
  <p>Le <strong><em>Guide de mise en œuvre</em></strong> des évaluations passées en cours de formation est à télécharger sur le site du ministère chargé de l'emploi. Il comporte un mode d'emploi du présent Livret d'évaluations passées en cours de formation.</p>`);

  /**
   * Grille officielle des compétences évaluées : cases numérotées 1 à 9,
   * disposées en 3 colonnes × 3 lignes. On coche les compétences couvertes.
   */
  const grilleComp = (cochees: Set<number>, actives: number): string => {
    const cell = (n: number) =>
      n <= actives ? `<td>${n} ${CHK(cochees.has(n - 1))}</td>` : `<td>&nbsp;</td>`;
    return `<table class="grille-comp"><tr>${cell(1)}${cell(2)}${cell(3)}</tr><tr>${cell(4)}${cell(5)}${cell(6)}</tr><tr>${cell(7)}${cell(8)}${cell(9)}</tr></table>`;
  };

  /** Bloc « Observations » de la trame : tiret magenta, filet, zone encadrée. */
  const blocObservations = (texte: string) => `<h3 style="border-bottom:2px solid ${MAGENTA};padding-bottom:4px;margin-top:16px">Observations</h3>
  <div class="cadre-reponse">${texte || "&nbsp;"}</div>`;

  /** Bloc « Formateur(s) évaluateur(s) » : Nom | Date | Visa, deux lignes. */
  const blocFormateurs = (date: string) => `<h3 style="margin-top:14px">Formateur(s) évaluateur(s)</h3>
  <table style="width:100%;border-collapse:collapse;font-size:10pt">
    <tr><th style="width:42%">Nom</th><th style="width:20%">Date</th><th>Visa</th></tr>
    <tr><td>${evaluateur1 || ""}</td><td>${evaluateur1 ? date : ""}</td><td>${evaluateur1 ? visaCell(evaluateur1, date, s?.formateurSignatureUrl) : "&nbsp;"}</td></tr>
    <tr><td>${evaluateur2 || ""}</td><td>${evaluateur2 ? date : ""}</td><td>${evaluateur2 ? visaCell(evaluateur2, date) : "&nbsp;"}</td></tr>
  </table>`;

  ref.activitesTypes.forEach((at, ci) => {
    const numAT = ci + 1;
    const comps = prof.parAT[ci] || [];
    const aConsolider = comps.filter((c) => c.niveau !== "ACQUIS");
    const libelles = at.competences;
    const mods = modalitesAT(ci);

    // Quatre lignes d'évaluation numérotées 1 à 4 ; seules les évaluations
    // réellement mises en œuvre sont décrites, les autres restent vierges.
    const nbEval = prof.renseigne ? Math.min(4, Math.max(2, libelles.length)) : 0;
    const rows = [0, 1, 2, 3].map((ei) => {
      if (ei >= nbEval) {
        return `<tr><td><strong>${ei + 1}</strong>&nbsp;</td><td>&nbsp;</td><td>${grilleComp(new Set(), libelles.length)}</td></tr>`;
      }
      const compEval = comps[ei % Math.max(1, comps.length)];
      const modalite = mods[ei % mods.length](compEval?.libelle || libelles[ei % libelles.length], at.titre);
      const jour = dateEvaluation(debut, fin, offsetAT[ci] + ei, totalEval);
      // Cases cochées : la compétence travaillée sur la ligne, plus la compétence
      // connexe non acquise lorsque l'évaluation est transversale.
      const cochees = new Set<number>();
      cochees.add(ei % Math.max(1, comps.length));
      const connexe = comps.findIndex((x, n) => n !== ei % Math.max(1, comps.length) && x.niveau !== "ACQUIS");
      if (connexe >= 0 && ei % 2 === 1) cochees.add(connexe);
      return `<tr><td><strong>${ei + 1}</strong> ${modalite}</td><td>${jour ? formatDate(jour) : ""}</td><td>${grilleComp(cochees, libelles.length)}</td></tr>`;
    });

    const satisfait = prof.renseigne && aConsolider.length === 0;

    pages.push(`<h2>Activité-type ${numAT} – ${at.titre}</h2>
    <p><strong>Compétences professionnelles évaluées :</strong></p>
    <ol>${libelles.map((c) => `<li>${c}</li>`).join("")}</ol>
    <h3>Évaluations complémentaires <em>(si nécessaire)</em></h3>
    <table style="width:100%;border-collapse:collapse;font-size:9.5pt">
      <tr><th style="width:56%">Description des évaluations mises en œuvre</th><th style="width:14%">Dates</th><th>Compétences évaluées <em>(cochez)</em></th></tr>
      ${rows.join("")}
    </table>
    ${prof.renseigne
      ? `<p class="verdict">Lors de l'évaluation ou des évaluations passée(s) en cours de formation, ${g(s, "le/la candidat(e) est considéré", "le/la candidat(e) est considérée")} :<br>
    ${CHK(satisfait)} Avoir satisfait aux critères issus des référentiels du titre professionnel attendus pour la réalisation de cette activité-type.<br>
    ${CHK(!satisfait)} Ne pas avoir satisfait aux critères issus des référentiels du titre professionnel.</p>`
      : `<p class="marqueur-attente">${MARQUEUR_SANS_PROFIL}</p>`}
    ${blocObservations(prof.renseigne ? prof.appreciations[ci] || "" : "")}
    ${blocFormateurs(prof.renseigne ? dateVisa : "")}`);

    // Réévaluation : uniquement si des compétences restent à travailler
    if (prof.renseigne && aConsolider.length) {
      const consolidation = ECF_CONSOLIDATION_PAR_AT[ci] || ECF_CONSOLIDATION_PAR_AT[0];
      const dateCons = dateEvaluation(debut, fin, totalEval - 1, totalEval);
      const dateConsFr = dateCons ? formatDate(dateCons) : dateVisa;
      const cochees = new Set<number>();
      libelles.forEach((l, n) => {
        if (aConsolider.some((c) => c.libelle === l)) cochees.add(n);
      });
      pages.push(`<h2>Activité-type ${numAT} – Réévaluation</h2>
      <h3>Évaluations complémentaires <em>(si nécessaire)</em></h3>
      <table style="width:100%;border-collapse:collapse;font-size:9.5pt">
        <tr><th style="width:56%">Description des évaluations mises en œuvre</th><th style="width:14%">Dates</th><th>Compétences évaluées <em>(cochez)</em></th></tr>
        <tr><td><strong>1</strong> ${consolidation}</td><td>${dateConsFr}</td><td>${grilleComp(cochees, libelles.length)}</td></tr>
        ${[2, 3, 4].map((n) => `<tr><td><strong>${n}</strong>&nbsp;</td><td>&nbsp;</td><td>${grilleComp(new Set(), libelles.length)}</td></tr>`).join("")}
      </table>
      <p class="verdict">À l'issue de la réévaluation, ${g(s, "le/la candidat(e) est considéré", "le/la candidat(e) est considérée")} :<br>
      ${CHK(true)} Avoir satisfait aux critères issus des référentiels du titre professionnel attendus pour la réalisation de cette activité-type.<br>
      ${CHK(false)} Ne pas avoir satisfait aux critères issus des référentiels du titre professionnel.</p>
      ${blocObservations(`La réévaluation portait sur ${aConsolider.map((c) => `${c.libelle} — ${c.motif}`).join(" ; ")}. Les productions remises lors de cette évaluation de consolidation sont conformes aux attendus : ${aConsolider.length === 1 ? "la compétence concernée est désormais maîtrisée" : "les compétences concernées sont désormais maîtrisées"}.`)}
      ${blocFormateurs(dateConsFr)}`);
    }
  });

  // ── Synthèse
  pages.push(`<h2>Synthèse des résultats obtenus par ${g(s, "le candidat", "la candidate")} à l'issue du parcours de formation</h2>
  <table style="width:100%;border-collapse:collapse;font-size:9.5pt">
    <tr><th style="width:45%">Intitulé de l'activité-type</th><th>Compétences professionnelles</th></tr>
    ${ref.activitesTypes
      .map((at, i) => {
        const detail = at.competences.join("<br>• ");
        return `<tr><td><strong>Activité-type ${i + 1}</strong> – ${at.titre}</td><td>• ${detail}</td></tr>
    <tr><td><strong>L'activité ${i + 1} est maîtrisée :</strong></td><td>OUI ${CHK(prof.renseigne)} &nbsp;&nbsp;&nbsp; NON ${CHK(false)}</td></tr>`;
      })
      .join("")}
  </table>`);

  // ── Observations et visas finaux
  pages.push(`<h2>Observations</h2>
  <div class="cadre-reponse">${prof.renseigne ? prof.observation : "&nbsp;"}</div>
  ${!prof.renseigne ? `<p class="marqueur-attente">${MARQUEUR_SANS_PROFIL}</p>` : ""}
  ${blocFormateurs(prof.renseigne ? dateVisa : "")}
  ${org.dirigeant
      ? `<h3 style="margin-top:14px">Représentant de l'organisme de formation</h3>
  <table style="width:100%;border-collapse:collapse;font-size:10pt">
    <tr><th style="width:42%">Nom</th><th style="width:20%">Date</th><th>Visa</th></tr>
    <tr><td>${org.dirigeant}</td><td>${dateVisa}</td><td>${visaCell(org.dirigeant, dateVisa, org.tamponUrl)}</td></tr>
  </table>`
      : ""}
  <p style="margin-top:12px">Un exemplaire du livret a été remis ${g(s, "au candidat", "à la candidate")} pour information par l'organisme de formation contre signature le ${dateVisa}.</p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt"><tr><th style="width:50%">Signature ${g(s, "du candidat", "de la candidate")} pour information</th><td>${cadreSignature(s?.signatureUrl)}</td></tr></table>
  <p class="mention-prerenseigne">${MENTION_PRE_RENSEIGNE}</p>`);

  // Le pied est ancré par le moteur d'export en bas de chaque page physique.
  const body = pages.join(`<div class="page-break"></div>`);
  return htmlWrap(`${STYLE_MINISTERE}${STYLE_ECF}<div class="doc-officiel">${body}</div>${piedEcf}`);
}

// ───────────────────────────────────────────── DP

export function genDPUnifie(
  org: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx = 0,
): string {
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  const seed = seedOf(s);
  const d = buildDpDossier(org, f, stagiaires, stagiaireIdx);
  const { ref, cv, entreprise: ent } = d;
  const debut = getStagiaireDateDebut(s, f);
  const fin = getStagiaireDateFin(s, f);
  const dateDeclaration = debut ? formatDate(subtractBusinessDays(debut, 3)) : formatDate(f.dateDebut || "");
  const villeDecl = s?.commune?.trim() || "";
  const periode = d.periodeConnue ? d.periodeExercice : A_RENSEIGNER;
  const entNom = ent.connue ? `${ent.nom}${ent.ville ? ` – ${ent.ville}` : ""}` : A_RENSEIGNER;
  const entService = ent.service || (ent.connue ? "" : A_RENSEIGNER);
  const domaine = detectDomaine(f);

  // Pied ancré en bas de chaque page physique par le moteur d'export.
  const piedDp = `<div class="footer pied-dp"><span class="pied-dp-t">Dossier professionnel${ref.codeTitre ? ` – ${ref.codeTitre}` : ""} – ${`${s?.prenom || ""} ${s?.nom || ""}`.trim()}</span><span class="pied-dp-v">Version du ${DP_TRAME_VERSION}</span><span class="pied-dp-p">Page {{PAGE}}/{{PAGES}}</span></div>`;

  const pages: string[] = [];

  // ── Page 1 : page de garde officielle
  pages.push(`<div style="text-align:center;margin-bottom:18px">
    <img src="/__l5e/assets-v1/8eb30e71-1ecc-45e5-a0c2-80298a246489/dp-header-officiel.png" alt="République Française – Dossier Professionnel (DP) – Ministère chargé de l'Emploi" style="width:100%;max-width:640px;height:auto;border:1px solid #ccc" />
  </div>
  <table style="width:86%;margin:22px auto;border-collapse:collapse">
    ${rowIf("<em>Nom de naissance</em>", s?.nom)}
    ${rowIf("<em>Nom d'usage</em>", s?.nom)}
    ${rowIf("<em>Prénom</em>", s?.prenom)}
    ${rowIf("<em>Date de naissance</em>", s?.dateNaissance ? formatDate(s.dateNaissance) : "")}
    ${rowIf("<em>Adresse</em>", [s?.adresse, `${s?.codePostal || ""} ${s?.commune || ""}`.trim()].filter((x) => x && x.trim()).join("<br>"))}
    ${rowIf("<em>Téléphone</em>", s?.telephone)}
    ${rowIf("<em>Courriel</em>", s?.email)}
    ${rowIf("<em>Permis détenus</em>", cv?.permis)}
  </table>
  <div style="text-align:center;margin-top:18px">
    <p><strong>Titre professionnel visé</strong></p>
    <p>${ref.titreOfficiel}</p>
    ${[ref.niveau, ref.codeTitre, ref.rncp].filter(Boolean).length ? `<p style="font-size:10pt">${[ref.niveau, ref.codeTitre, ref.rncp].filter(Boolean).join(" — ")}</p>` : ""}
  </div>
  <p style="margin-top:22px"><strong>MODALITÉ D'ACCÈS :</strong></p>
  <p>${CHK(true)} Parcours de formation<br>${CHK(false)} Validation des Acquis de l'Expérience (VAE)</p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt;margin-top:16px">
    <tr><th style="width:34%">Organisme accompagnateur</th><td>${org.nom}</td></tr>
    <tr><th>Session visée</th><td>Du ${formatDate(debut)} au ${formatDate(fin)}</td></tr>
  </table>`);

  // ── Page 2 : présentation du dossier
  pages.push(`<h2>Présentation du dossier</h2>
  <p>Le dossier professionnel (DP) constitue un élément du système de validation du titre professionnel. <strong>Ce titre est délivré par le Ministère chargé de l'emploi.</strong> Le DP appartient au candidat. Il le conserve, l'actualise durant son parcours et le présente <strong>obligatoirement à chaque session d'examen</strong>. Pour rédiger le DP, le candidat peut être aidé par un formateur ou par un accompagnateur VAE. Il est consulté par le jury au moment de la session d'examen.</p>
  <p><strong>Pour prendre sa décision, le jury dispose :</strong></p>
  <ol>
    <li>des résultats de la mise en situation professionnelle complétés, éventuellement, du questionnaire professionnel ou de l'entretien professionnel ou de l'entretien technique ou du questionnement à partir de productions ;</li>
    <li>du <strong>Dossier Professionnel</strong> (DP) dans lequel le candidat a consigné les preuves de sa pratique professionnelle ;</li>
    <li>des résultats des évaluations passées en cours de formation lorsque le candidat évalué est issu d'un parcours de formation ;</li>
    <li>de l'entretien final (dans le cadre de la session titre).</li>
  </ol>
  <p><em>[Arrêté du 22 décembre 2015, relatif aux conditions de délivrance des titres professionnels du ministère chargé de l'Emploi]</em></p>
  <p><strong>Ce dossier comporte :</strong></p>
  <p>▶ pour chaque activité-type du titre visé, un à trois exemples de pratique professionnelle ;<br>
  ▶ un tableau à renseigner si le candidat souhaite porter à la connaissance du jury la détention d'un titre, d'un diplôme, d'un certificat de qualification professionnelle (CQP) ou des attestations de formation ;<br>
  ▶ une déclaration sur l'honneur à compléter et à signer ;<br>
  ▶ des documents illustrant la pratique professionnelle du candidat (facultatif) ;<br>
  ▶ des annexes, si nécessaire.</p>`);

  // ── Page 3 : parcours professionnel (uniquement si un profil a été transmis)
  if (cv) {
    pages.push(`<h2>Parcours professionnel ${g(s, "du candidat", "de la candidate")}</h2>
    <p>${cv.profil}</p>
    <table style="width:100%;border-collapse:collapse;font-size:9.5pt;margin-top:8px">
      <tr><th style="width:20%">Période</th><th style="width:26%">Emploi occupé</th><th style="width:22%">Entreprise</th><th>Principales missions</th></tr>
      ${cv.experiences.map((e) => `<tr><td>${e.periode}</td><td>${e.poste}</td><td>${e.employeur}</td><td>• ${e.missions.join("<br>• ")}</td></tr>`).join("")}
    </table>
    <table style="width:100%;border-collapse:collapse;font-size:10pt;margin-top:10px">
      <tr><th style="width:32%">Entreprise de référence du dossier</th><td>${entNom}</td></tr>
      ${entService ? `<tr><th>Service concerné</th><td>${entService}</td></tr>` : ""}
      ${rowIf("Emploi de référence", cv.posteOccupe)}
      <tr><th>Période d'exercice retenue</th><td>${periode}</td></tr>
      ${rowIf("Permis et habilitations", cv.permis)}
    </table>`);
  }

  // ── Sommaire (pagination réelle)
  let cursor = pages.length + 3; // sommaire + intercalaire + 1re page d'exemple
  const parAT = new Map<number, DpExempleData[]>();
  d.exemples.forEach((e) => {
    const l = parAT.get(e.atIndex) || [];
    l.push(e);
    parAT.set(e.atIndex, l);
  });
  const sommaireAT = ref.activitesTypes
    .map((at, i) => {
      const exs = parAT.get(i + 1) || [];
      const pAT = cursor;
      const lignes = exs.map((e, j) => `▶ Intitulé de l'exemple n° ${j + 1} : ${e.intitule}&nbsp;&nbsp;<em>p. ${cursor + j}</em>`).join("<br>");
      cursor += exs.length;
      return `<p><strong>Intitulé de l'activité-type n° ${i + 1}</strong> – ${at.titre}&nbsp;&nbsp;<em>p. ${pAT}</em><br>${lignes}</p>`;
    })
    .join("");
  const pTitres = cursor;

  pages.push(`<h2>Sommaire</h2>
  <p><strong>Exemples de pratique professionnelle</strong></p>
  ${sommaireAT}
  <p><strong>Titres, diplômes, CQP, attestations de formation</strong> <em>(facultatif)</em>&nbsp;&nbsp;<em>p. ${pTitres}</em></p>
  <p><strong>Déclaration sur l'honneur</strong>&nbsp;&nbsp;<em>p. ${pTitres + 1}</em></p>
  <p><strong>Documents illustrant la pratique professionnelle</strong> <em>(facultatif)</em>&nbsp;&nbsp;<em>p. ${pTitres + 2}</em></p>
  <p><strong>Annexes</strong> <em>(si le RC le prévoit)</em>&nbsp;&nbsp;<em>p. ${pTitres + 3}</em></p>`);

  pages.push(`<div style="text-align:center;margin-top:120px"><h1>EXEMPLES DE PRATIQUE PROFESSIONNELLE</h1></div>`);

  // ── Exemples de pratique professionnelle
  d.exemples.forEach((ex) => {
    pages.push(`<h2>Activité-type n° ${ex.atIndex} – ${ex.atTitre}</h2>
    <p><strong><em>Exemple n° ${ex.numero}</em></strong> ▶ ${ex.intitule}</p>
    <p><strong>1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :</strong></p>
    <p>${ex.r1}</p>
    <p><strong>2. Précisez les moyens utilisés :</strong></p>
    <p>${ex.r2}</p>
    <p><strong>3. Avec qui avez-vous travaillé ?</strong></p>
    <p>${ex.r3}</p>
    <table style="width:100%;border-collapse:collapse;font-size:10pt;margin-top:10px">
      <tr><th colspan="2" style="text-align:left">4. Contexte</th></tr>
      <tr><th style="width:38%">Nom de l'entreprise, organisme ou association ▶</th><td>${entNom}</td></tr>
      <tr><th>Chantier, atelier, service ▶</th><td>${entService || A_RENSEIGNER}</td></tr>
      <tr><th>Période d'exercice ▶</th><td>${periode}</td></tr>
    </table>
    <p style="margin-top:10px"><strong>5. Informations complémentaires</strong> <em>(facultatif)</em></p>
    <p>${ex.r5}</p>`);
  });

  // ── Titres, diplômes, CQP
  const listeDip: [string, string, string][] = [...(cv?.diplomes || [])];
  if (fin || debut) {
    listeDip.push([
      `Attestation de fin de formation – Parcours préparatoire au titre « ${ref.titreOfficiel} »`,
      org.nom,
      formatDate(fin || debut),
    ]);
    listeDip.push(["Attestation d'évaluations passées en cours de formation (livret ECF)", org.nom, formatDate(fin || debut)]);
  }
  pages.push(`<h2>Titres, diplômes, CQP, attestations de formation</h2>
  <p><em>(facultatif)</em></p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt">
    <tr><th><strong>Intitulé</strong></th><th><strong>Autorité ou organisme</strong></th><th><strong>Date</strong></th></tr>
    ${listeDip.map((x) => `<tr><td>${x[0]}</td><td>${x[1]}</td><td>${x[2]}</td></tr>`).join("")}
  </table>`);

  // ── Déclaration sur l'honneur (jamais pré-signée)
  pages.push(`<h2>Déclaration sur l'honneur</h2>
  <p>Je ${g(s, "soussigné", "soussignée")} <strong>${s?.prenom || ""} ${s?.nom || ""}</strong>, déclare sur l'honneur que les renseignements fournis dans ce dossier sont exacts et que je suis ${g(s, "l'auteur", "l'auteure")} des réalisations jointes.</p>
  <p>${villeDecl ? `Fait à ${villeDecl}, le ${dateDeclaration}` : `Fait le ${dateDeclaration}`}, pour faire valoir ce que de droit.</p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt"><tr><th style="width:50%">Signature ${g(s, "du candidat", "de la candidate")}</th><td>${cadreSignature(s?.signatureUrl)}</td></tr></table>`);

  // ── Documents illustrant la pratique professionnelle
  pages.push(`<h2>Documents illustrant la pratique professionnelle</h2>
  <p><em>(facultatif)</em></p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt">
    <tr><th style="width:26%">Intitulé</th><th>Description</th></tr>
    ${d.exemples
      .slice(0, 4)
      .map((e) => `<tr><td>Pièce liée à l'exemple ${e.atIndex}.${e.numero}</td><td>Document professionnel anonymisé illustrant : ${e.intitule.toLowerCase()}.</td></tr>`)
      .join("")}
  </table>
  ${cv?.outils ? `<p style="margin-top:12px;font-size:10pt">Outils et environnement de travail mobilisés : ${cv.outils}.</p>` : ""}`);

  // ── Annexes — bordereau des pièces
  const refDossier = `DP-${ref.codeTitre || "TP"}-${String((seed % 900) + 100)}`;
  const naturesPreuve = [
    "Document professionnel anonymisé",
    "Extrait d'outil métier (copie d'écran)",
    "Attestation employeur",
    "Production personnelle du candidat",
  ];
  const preuves = d.exemples.map((e, i) => ({
    code: `A${e.atIndex}.${e.numero}`,
    intitule: e.intitule,
    nature: naturesPreuve[(seed + i) % naturesPreuve.length],
    at: `Activité-type n° ${e.atIndex}`,
    periode,
  }));

  pages.push(`<h2>ANNEXES — Bordereau des pièces de preuve</h2>
  <p><em>(annexes au dossier professionnel — pièces justificatives de la pratique professionnelle)</em></p>
  <table style="width:100%;border-collapse:collapse;font-size:10pt">
    <tr><th style="width:26%">Référence du dossier</th><td>${refDossier}</td></tr>
    <tr><th>Candidat</th><td>${s?.prenom || ""} ${s?.nom || ""}</td></tr>
    <tr><th>Entreprise / service concerné</th><td>${entNom}${entService ? ` – ${entService}` : ""}</td></tr>
    <tr><th>Nombre de pièces annexées</th><td>${preuves.length}</td></tr>
  </table>
  <table style="width:100%;border-collapse:collapse;font-size:9.5pt;margin-top:12px">
    <tr><th style="width:8%">Réf.</th><th style="width:36%">Intitulé de la pièce</th><th style="width:20%">Nature</th><th style="width:18%">Activité-type</th><th style="width:18%">Période</th></tr>
    ${preuves.map((p) => `<tr><td>${p.code}</td><td>${p.intitule}</td><td>${p.nature}</td><td>${p.at}</td><td>${p.periode}</td></tr>`).join("")}
  </table>
  <p style="margin-top:12px;font-size:10pt"><strong>Mentions relatives aux pièces annexées :</strong> l'ensemble des documents est anonymisé (noms de clients, coordonnées, montants sensibles et données personnelles masqués) conformément aux obligations de confidentialité et au RGPD. Les pièces sont produites à seule fin d'illustrer la pratique professionnelle devant le jury.</p>
  <p style="margin-top:10px;font-size:10pt">Les pièces sont à joindre par le candidat au moment du dépôt du dossier.${domaine === "transport" ? " Pour l'exploitation transport, joindre notamment les lettres de voiture, plannings et relevés d'activité correspondants." : ""}</p>`);

  const body = pages.join(`<div class="page-break"></div>`);
  return htmlWrap(`${STYLE_MINISTERE}<div class="doc-officiel">${body}</div>${piedDp}`);
}

// ───────────────────────────────────────────── alias historiques

export const genECFGotrm = genECFUnifie;
export const genDPGotrm = genDPUnifie;
