import { DocEntry, StagiaireInfo } from "@/types/qualiopi";

export type ExportFormat = "doc" | "pdf";

export const PER_STAGIAIRE_TEMPLATES = new Set([
  "qcm_positionnement", "qcm_final", "exercices_pratiques",
  "eval_positionnement_remplie", "eval_intermediaire_remplie", "eval_finale_remplie",
  "ai_test_positionnement_debut", "ai_test_positionnement_fin",
  "ai_exercice_intermediaire", "ai_evaluation_finale",
  "attestation_formation", "certificat_reussite", "convocation",
  "attestation_entree_formation", "attestation_assiduite", "certificat_realisation",
  "fiche_autoevaluation", "fiche_renseignement", "trame_eval_besoins",
  "contrat_formation_pro", "convention_formation_tripartite", "dossier_inscription",
  "contrat_apprentissage", "livret_apprentissage_cfa",
  "analyse_parcours_pro", "plan_action_bilan", "synthese_bilan",
  "livret_recevabilite_vae", "dossier_validation_vae", "accompagnement_vae",
  "attestation_inscription_cfa", "fiche_autoevaluation_apprenti",
  "fiche_renseignement_cfa", "convention_formation_cfa", "livret_apprentissage_cfa_v2",
  "convention_formation_apprentissage", "livre_apprentissage_cfa", "convocation_cfa", "cgv_cfa",
  "convocation_certification",
  "livret_accueil_cfa_v2",
  "dp_officiel",
  "ecf_officiel",
  "droit_image_cfa",
  "reglement_interieur_cfa_v2",
  "contrat_formation_par_bloc",
  "dossier_inscription_cfa",
  "outils_suivi_alternance_excel",
  "certificat_realisation_cfa",
  "bdc_programme", "bdc_catalogue_commercial", "bdc_parcours", "bdc_support_cours",
  "bdc_eval_besoins", "bdc_document_synthese", "bdc_engagement_confidentialite", "bdc_test_personnalite",
  "bdc_deroule_modalites", "bdc_enquete_metier", "bdc_cgv", "bdc_contrat", "bdc_convention",
  "bdc_formulaire_attentes", "bdc_convocation", "bdc_synopsis", "bdc_questionnaire_enquete_metiers",
  "bdc_grille_suivi", "bdc_suivi_post_bilan", "bdc_trame_suivi_6mois", "bdc_procedure_adaptation",
  "bdc_exploration_metier", "bdc_guide_protocoles", "bdc_tableau_bases", "bdc_fiche_poste_consultant",
  "bdc_compte_rendu_fin", "bdc_cv_beneficiaire", "bdc_fiche_intervenant", "bdc_fiche_veille",
  "bdc_procedure_handicap", "bdc_contrat_sous_traitance", "bdc_satisfaction_chaud",
  "bdc_formulaire_reclamation", "bdc_gestion_reclamations", "bdc_actions_correctives",
  "bdc_nt_doc_per_ben",
]);

const EXCEL_TEMPLATES = new Set([
  "tableau_suivi_parcours_excel",
  "plan_dev_competences_excel",
  "tableau_amelioration_continue_excel",
  "suivi_dysfonctionnements_excel",
  "relances_appreciations_excel",
  "indicateurs_performance",
  "vae_indicateurs_previsionnels",
  "decoupage_formation_cfa_excel",
  "matrice_competences_excel",
  "suivi_chiffre_formation_excel",
  "suivi_inscriptions_excel",
  "bdc_nt_calendrier_annuel",
  "bdc_nt_suivi_adaptation",
  "bdc_nt_contacts_handicap",
  "bdc_nt_tableau_dysfonctionnements",
  "bdc_nt_stats_xlsx",
  "bdc_nt_cr6mois_stagiaire",
]);

export const MAIL_DOCX_TEMPLATES = new Set([
  "mail_pre_inscription",
  "mail_inscription",
  "mail_convocation",
  "mail_envoie_sc_ressources",
  "mail_fin_formation",
]);

function stripDiacritics(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cleanLooseText(value: string): string {
  return stripDiacritics(value)
    .replace(/[’'`]/g, " ")
    .replace(/[(){}\[\]]/g, " ")
    .replace(/[&]/g, " ")
    .replace(/[\-–—]+/g, " ")
    .replace(/[^A-Za-z0-9_\s]+/g, " ")
    .replace(/\b(d|l|j|m|s|t|c|n|de|du|des|la|le|les|un|une|au|aux|et|en|a)\b/gi, " ")
    .replace(/_+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toWords(value: string): string[] {
  return cleanLooseText(value).split(" ").filter(Boolean);
}

function toUpperSnakeCase(value: string): string {
  return toWords(value).map((word) => word.toUpperCase()).join("_");
}

function toTitleCaseWord(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function toTitleSnakeCase(value: string): string {
  return toWords(value).map(toTitleCaseWord).join("_");
}

function normalizeVersion(version: string): string {
  const clean = String(version || "1").replace(/[^0-9]/g, "");
  return clean || "1";
}

function formatDateCompact(dateMaj: string): string {
  if (!dateMaj) {
    const now = new Date();
    return `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}`;
  }
  const parsed = new Date(dateMaj);
  if (Number.isNaN(parsed.getTime())) return dateMaj.replace(/[^0-9_]/g, "");
  return `${parsed.getFullYear()}_${String(parsed.getMonth() + 1).padStart(2, "0")}_${String(parsed.getDate()).padStart(2, "0")}`;
}

function stripCatalogPrefix(label: string): string {
  return label.replace(/^CT\s*\d+\s*-\s*IND\s*\d+\s*/i, "").trim();
}

function stripTrailingStagiaire(label: string, stagiaire?: StagiaireInfo | null): string {
  if (!stagiaire) return label;
  const fullName = `${stagiaire.prenom} ${stagiaire.nom}`.trim();
  if (!fullName) return label;
  return label.replace(new RegExp(`\\s*[–-]\\s*${escapeRegExp(fullName)}\\s*$`, "i"), "").trim();
}

function normalizeDocumentLabel(label: string, stagiaire?: StagiaireInfo | null): string {
  return stripTrailingStagiaire(stripCatalogPrefix(label), stagiaire);
}

export function getFileBaseName(fileNameOrPath: string): string {
  const name = fileNameOrPath.split("/").pop() ?? fileNameOrPath;
  return name.replace(/\.[^.]+$/, "");
}

export function normalizeLooseFileName(fileNameOrPath: string): string {
  return toUpperSnakeCase(getFileBaseName(fileNameOrPath));
}

export function getPreferredExtension(template: string, exportFormat: ExportFormat): string {
  if (template === "pdf_static") return ".pdf";
  if (template === "outils_suivi_alternance_excel") return ".xlsx";
  if (template === "suivi_parcours_beneficiaires_excel") return ".xlsx";
  if (template === "suivi_public_beneficiaire_excel") return ".xlsx";
  if (template === "suivi_pfmp_excel") return ".xlsx";
  if (template === "suivi_inscriptions_excel") return ".xlsx";
  // Templates qui sont aussi téléchargés en vrai .xlsx via SheetJS
  if (template === "decoupage_formation_cfa_excel") return ".xlsx";
  if (template === "matrice_competences_excel") return ".xlsx";
  if (template === "suivi_chiffre_formation_excel") return ".xlsx";
  if (template === "tableau_suivi_parcours_beneficiaires_cfa_excel") return ".xlsx";
  if (template === "calendrier_annuel_cfa") return ".xlsx";
  if (template === "tableau_suivi_parcours_excel") return ".xlsx";
  if (template === "plan_dev_competences_excel") return ".xlsx";
  if (template === "tableau_amelioration_continue_excel") return ".xlsx";
  if (template === "suivi_dysfonctionnements_excel") return ".xlsx";
  if (template === "relances_appreciations_excel") return ".xlsx";
  if (template === "indicateurs_performance") return ".xlsx";
  if (template === "vae_indicateurs_previsionnels") return ".xlsx";
  if (template === "bdc_nt_stats_xlsx") return ".xlsx";
  if (template === "bdc_nt_cr6mois_stagiaire") return ".xlsx";
  if (EXCEL_TEMPLATES.has(template)) return ".xls";
  if (MAIL_DOCX_TEMPLATES.has(template)) return ".docx";
  return exportFormat === "pdf" ? ".pdf" : ".doc";
}

export function replaceFileExtension(fileName: string, extension: string): string {
  const cleanExtension = extension.startsWith(".") ? extension : `.${extension}`;
  return `${getFileBaseName(fileName)}${cleanExtension}`;
}

export function shortCriterePath(critere: number, indicateur: number): string {
  return `Critere_${critere}/Indicateur_${indicateur}`;
}

/**
 * Nom de sous-dossier par stagiaire dans les ZIP (regroupement par apprenant).
 * Ex: "Prenom_NOM". Fallback "Stagiaire" si aucun nom disponible.
 */
export function buildStagiaireFolderName(stagiaire?: StagiaireInfo | null): string {
  if (!stagiaire) return "Stagiaire";
  const parts: string[] = [];
  if (stagiaire.prenom) parts.push(toTitleSnakeCase(stagiaire.prenom));
  if (stagiaire.nom) parts.push(toUpperSnakeCase(stagiaire.nom));
  const joined = parts.filter(Boolean).join("_");
  return joined || "Stagiaire";
}

export function buildGenericFileName(label: string, orgName: string, version: string, dateMaj: string, extension: string): string {
  const parts = [
    toUpperSnakeCase(label) || "DOCUMENT",
    toUpperSnakeCase(orgName) || "ORGANISME",
    `V${normalizeVersion(version)}`,
    formatDateCompact(dateMaj),
  ];

  return `${parts.filter(Boolean).join("_")}${extension}`;
}

export const MAX_LABEL_LENGTH = 60;

/**
 * Raccourcit un libellé UPPER_SNAKE en retirant les mots du milieu : on garde
 * les deux premiers mots et la fin (numéros compris, ex. « EX_1_5 »), qui
 * distinguent les pièces entre elles. Couper la fin créait des doublons dans
 * le ZIP (EX_1_5 … EX_5_5 tronqués au même nom s'écrasaient).
 */
export function compacterLibelle(label: string, max = MAX_LABEL_LENGTH, queueProtegee?: number): string {
  const mots = label.split("_").filter(Boolean);
  let numeros = 0;
  while (numeros < mots.length && /^\d+$/.test(mots[mots.length - 1 - numeros])) numeros++;
  const queue = queueProtegee ?? numeros + 2;
  const tete = 2;
  while (mots.join("_").length > max) {
    // Les mots partent avant les numéros, qui distinguent souvent deux pièces.
    let idx = -1;
    for (let i = mots.length - queue - 1; i >= tete; i--) {
      if (!/^\d+$/.test(mots[i])) { idx = i; break; }
    }
    if (idx < 0) idx = mots.length - queue - 1;
    if (idx < tete) break;
    mots.splice(idx, 1);
  }
  return mots.join("_");
}

/** QCM des 14 missions : le titre de la mission est déjà le nom du dossier. */
function libelleMissionStagiaire(doc: DocEntry, stagiaire?: StagiaireInfo | null): string | null {
  const num = doc.params?.missionNumero;
  if (!stagiaire || typeof num !== "number") return null;
  const segments = normalizeDocumentLabel(doc.nom, stagiaire).split(/\s+[–—-]\s+/);
  const piece = segments.length > 1 ? toUpperSnakeCase(segments[segments.length - 1]) : "";
  return piece ? `MISSION_${num}_${piece}` : null;
}

export function buildDocumentFileName(
  doc: DocEntry,
  orgName: string,
  version: string,
  dateMaj: string,
  extension: string,
  stagiaire?: StagiaireInfo | null,
): string {
  // Libellé raccourci : Windows refuse les chemins > 260 caractères après
  // décompression, et Google Drive affiche alors « Fichier introuvable ».
  let label = libelleMissionStagiaire(doc, stagiaire)
    ?? toUpperSnakeCase(normalizeDocumentLabel(doc.nom, stagiaire)).replace(/^14_MISSIONS_/, "");
  if (label.length > MAX_LABEL_LENGTH) label = compacterLibelle(label);
  const parts = [label || "DOCUMENT"];

  if (stagiaire?.prenom) parts.push(toTitleSnakeCase(stagiaire.prenom));
  if (stagiaire?.nom) parts.push(toUpperSnakeCase(stagiaire.nom));

  parts.push(toUpperSnakeCase(orgName) || "ORGANISME");
  parts.push(`V${normalizeVersion(version)}`);
  parts.push(formatDateCompact(dateMaj));

  return `${parts.filter(Boolean).join("_")}${extension}`;
}

/**
 * Longueur maximale d'un chemin dans le ZIP. Windows limite le chemin complet
 * à 260 caractères : on laisse ~80 caractères au dossier de décompression
 * (C:\Users\<nom>\Downloads\<dossier>\), sinon l'import du dossier dans
 * Google Drive échoue (« Fichier introuvable »).
 */
export const MAX_CHEMIN_ZIP = 175;

/** Raccourcit un chemin trop long en gardant dossiers, extension et suffixe Prénom_NOM_OF_Vx_date. */
export function raccourcirCheminZip(chemin: string, max = MAX_CHEMIN_ZIP): string {
  if (chemin.length <= max) return chemin;
  const coupe = chemin.lastIndexOf("/");
  const dossier = coupe >= 0 ? chemin.slice(0, coupe + 1) : "";
  const fichier = chemin.slice(coupe + 1);
  const point = fichier.lastIndexOf(".");
  const ext = point > 0 ? fichier.slice(point) : "";
  const base = point > 0 ? fichier.slice(0, point) : fichier;
  const budget = Math.max(20, max - dossier.length - ext.length);
  return `${dossier}${compacterLibelle(base, budget, 7)}${ext}`;
}

type ZipLike = {
  files: Record<string, { dir: boolean; date?: Date; async(type: "uint8array"): Promise<Uint8Array> }>;
  file(path: string, data: Uint8Array, options?: { date?: Date }): unknown;
  remove(path: string): unknown;
};

/**
 * À appeler juste avant `zip.generateAsync` : renomme les fichiers dont le
 * chemin dépasse MAX_CHEMIN_ZIP, sans jamais écraser un fichier existant.
 */
export async function limiterCheminsZip(zip: ZipLike, max = MAX_CHEMIN_ZIP): Promise<number> {
  const pris = new Set(Object.keys(zip.files));
  const longs = Object.entries(zip.files).filter(([chemin, f]) => !f.dir && chemin.length > max);
  for (const [chemin, f] of longs) {
    let cible = raccourcirCheminZip(chemin, max);
    if (pris.has(cible)) {
      // Numéro inséré avant le suffixe Prénom_NOM_OF_Vx_date, qui reste intact.
      const coupe = cible.lastIndexOf("/");
      const point = cible.lastIndexOf(".");
      const ext = point > coupe ? cible.slice(point) : "";
      const mots = cible.slice(coupe + 1, ext ? point : undefined).split("_");
      const pos = Math.max(1, mots.length - 7);
      let n = 2;
      const essai = () => `${cible.slice(0, coupe + 1)}${[...mots.slice(0, pos), String(n), ...mots.slice(pos)].join("_")}${ext}`;
      while (pris.has(essai())) n++;
      cible = essai();
    }
    const data = await f.async("uint8array");
    zip.remove(chemin);
    zip.file(cible, data, { date: f.date });
    pris.delete(chemin);
    pris.add(cible);
  }
  return longs.length;
}
