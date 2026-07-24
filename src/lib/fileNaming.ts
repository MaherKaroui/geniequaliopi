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

export function buildDocumentFileName(
  doc: DocEntry,
  orgName: string,
  version: string,
  dateMaj: string,
  extension: string,
  stagiaire?: StagiaireInfo | null,
): string {
  const parts = [
    toUpperSnakeCase(normalizeDocumentLabel(doc.nom, stagiaire)) || "DOCUMENT",
  ];

  if (stagiaire?.prenom) parts.push(toTitleSnakeCase(stagiaire.prenom));
  if (stagiaire?.nom) parts.push(toUpperSnakeCase(stagiaire.nom));

  parts.push(toUpperSnakeCase(orgName) || "ORGANISME");
  parts.push(`V${normalizeVersion(version)}`);
  parts.push(formatDateCompact(dateMaj));

  return `${parts.filter(Boolean).join("_")}${extension}`;
}
