import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, htmlWrap, orgHeader, formationInfoBlock, formationInfoBlockStagiaire, tableHTML, signatureBlock3, signatureBlock2, footer, section, formatDate, infoGrid, getDocStyle, subtractBusinessDays, getStagiaireDateDebut, getStagiaireDateFin, applyGender } from "./docBuilder";
import { FormateurInfo, SAMPLE_FORMATIONS, SAMPLE_STAGIAIRES, SAMPLE_FORMATEURS, SAMPLE_ORGANISME, EVAL_SCORES, SATISFACTION_SCORES, CONNECTION_TIMES, getFormationDays, mergeOrganisme, mergeStagiaires, getConnectionTimes, parseDuree } from "./sampleData";
import { buildFullCatalog } from "./docCatalog";
import { generateBookQualiopi } from "./bookQualiopi";
import { getEvalContent, generateStagiaireAnswers, computeQCMScore, getQuestionsOuvertes, generateStagiaireOpenAnswers, QuestionOuverte } from "./evalContent";
import { getCourseChapters, getYoutubeVideos } from "./courseContent";
import { DocEntry } from "@/types/qualiopi";
import { genCGV_V2, genReglement_V2, genConvocation_V2, genContratFormationPro_V2, genProcedureAccueil_V2, genEmargementJour_V2, genProcedureAdaptation_V2, genTableauSuiviParcours_V2, genEvaluationFinaleStagiaire, genExercicesStagiaire, genGrilleAcquisitionStagiaire, genAttestationReussiteStagiaire, genExercicesPratiques_V2, genQCMFinal_V2, genGrilleAcquisition_V2, genCertificatReussite_V2, genConvocationStagiaire, genContratFormationProStagiaire, genCGVStagiaire, genReglementStagiaire } from "./generatorsV2";
import { genFichePosteRole, genAutoEvaluationFormateurV2, genProcessusRecrutementV2, genPlanDevCompetencesExcel } from "./templatesCritere5";
import { genVeilleReglementaireV2, genVeilleMetierV2, genVeilleTechnologiqueV2, genVeilleHandicap, genListePartenairesV2, genContratSousTraitanceV2, genCharteQualiteFormateurExterne } from "./templatesCritere6";

export function getFullCatalog(org: OrganismeInfo, userFormation: FormationInfo, userStagiaires: StagiaireInfo[]): DocEntry[] {
  // Use only the single selected formation (merged with sample defaults if needed)
  const selectedFormation = userFormation.intitule
    ? { ...SAMPLE_FORMATIONS[0], ...Object.fromEntries(Object.entries(userFormation).filter(([, v]) => v && String(v).trim())) }
    : SAMPLE_FORMATIONS[0];
  return buildFullCatalog([selectedFormation], mergeStagiaires(userStagiaires), SAMPLE_FORMATEURS, org.typesActions);
}

export function generateDocumentById(docId: string, template: string, params: Record<string, any> | undefined, org: OrganismeInfo, userFormation: FormationInfo, userStagiaires: StagiaireInfo[]): string {
  let result = _generateDocumentByIdInner(docId, template, params, org, userFormation, userStagiaires);
  // Apply gender adaptation based on the relevant stagiaire
  const stagiaires = mergeStagiaires(userStagiaires);
  const si = params?.stagiaireIdx ?? 0;
  const targetStagiaire = stagiaires[si] || stagiaires[0] || null;
  result = applyGender(result, targetStagiaire);
  // Remove all emoji icons and replace with plain text equivalents
  result = stripEmojis(result);
  return result;
}

function stripEmojis(html: string): string {
  // Replace common status emojis with plain text
  html = html.replace(/✅\s*/g, '');
  html = html.replace(/❌\s*/g, '');
  html = html.replace(/📝\s*/g, '');
  html = html.replace(/📅\s*/g, '');
  html = html.replace(/📊\s*/g, '');
  html = html.replace(/📋\s*/g, '');
  html = html.replace(/🔄\s*/g, '');
  html = html.replace(/⏳\s*/g, '');
  html = html.replace(/⚠️\s*/g, '');
  html = html.replace(/🎓\s*/g, '');
  html = html.replace(/🏆\s*/g, '');
  html = html.replace(/📖\s*/g, '');
  html = html.replace(/🔍\s*/g, '');
  html = html.replace(/📞\s*/g, '');
  html = html.replace(/💻\s*/g, '');
  html = html.replace(/🗂️\s*/g, '');
  html = html.replace(/🔧\s*/g, '');
  html = html.replace(/📌\s*/g, '');
  html = html.replace(/📈\s*/g, '');
  // Remove any remaining emoji characters (common Unicode ranges)
  html = html.replace(/[\u{1F600}-\u{1F64F}]/gu, '');
  html = html.replace(/[\u{1F300}-\u{1F5FF}]/gu, '');
  html = html.replace(/[\u{1F680}-\u{1F6FF}]/gu, '');
  html = html.replace(/[\u{1F900}-\u{1F9FF}]/gu, '');
  html = html.replace(/[\u{2600}-\u{26FF}]/gu, '');
  html = html.replace(/[\u{2700}-\u{27BF}]/gu, '');
  return html;
}

function _generateDocumentByIdInner(docId: string, template: string, params: Record<string, any> | undefined, org: OrganismeInfo, userFormation: FormationInfo, userStagiaires: StagiaireInfo[]): string {
  const o = mergeOrganisme(org);
  const selectedFormation = userFormation.intitule
    ? { ...SAMPLE_FORMATIONS[0], ...Object.fromEntries(Object.entries(userFormation).filter(([, v]) => v && String(v).trim())) }
    : SAMPLE_FORMATIONS[0];
  const formations = [selectedFormation];
  const stagiaires = mergeStagiaires(userStagiaires);
  const realStagiairesCount = userStagiaires.filter(s => s.nom && s.nom.trim()).length || 1;
  const formateurs = SAMPLE_FORMATEURS;
  const fi = params?.fi ?? 0;
  const f = formations[fi] || formations[0];
  const fmt = formateurs[params?.formateurIdx ?? 0];

  switch (template) {
    case "fiche_identite": return genFicheIdentite(o);
    case "presentation_organisme": return genPresentation(o);
    case "organigramme": return genOrganigramme(o);
    case "charte_qualite": return genCharteQualite(o);
    case "politique_qualite": return genPolitiqueQualite(o);
    case "cgv": return genCGV_V2(o, f, stagiaires);
    case "cgv_stagiaire": {
      const si = params?.stagiaireIdx ?? 0;
      return genCGVStagiaire(o, f, stagiaires, si);
    }
    case "mentions_legales": return genMentionsLegales(o);
    case "catalogue_formation": return genCatalogue(o, f);
    case "fiche_info_formation": return genFicheInfoFormation(o, f);
    case "stats_annuelles": return genStatsAnnuelles(o, formations);
    case "taux_satisfaction_global": return genTauxSatisfactionGlobal(o, formations);
    case "taux_reussite": return genTauxReussite(o, f, realStagiairesCount);
    case "taux_satisfaction_formation": return genTauxSatisfactionFormation(o, f);
    case "insertion_professionnelle": return genInsertionPro(o);
    case "procedure_inscription": return genProcedureInscription(o);
    case "modalites_acces": return genModalitesAcces(o);
    case "delais_acces": return genDelaisAcces(o);
    case "fiche_tarifs": return genFicheTarifs(o, formations);
    case "planning_sessions": return genPlanning(o, f);
    case "questionnaire_positionnement": return genQuestionnairePositionnement(o, f, stagiaires);
    case "analyse_besoin": return genAnalyseBesoins(o, f, stagiaires);
    case "entretien_prealable": return genEntretienPrealable(o);
    case "programme_formation": return genProgramme(o, f, stagiaires, realStagiairesCount);
    case "objectifs_pedagogiques": return genObjectifs(o, f);
    case "plan_pedagogique": return genPlanPedagogique(o, f);
    case "adaptation_contenu": return genAdaptation(o, f);
    case "procedure_handicap": return genProcedureHandicap(o);
    case "fiche_referent_handicap": return genFicheReferentHandicap(o);
    case "plan_adaptation_handicap": return genPlanAdaptationHandicap(o);
    case "charte_handicap": return genCharteHandicap(o);
    case "registre_amenagements": return genRegistreAmenagements(o);
    case "fiche_amenagement": return genFicheAmenagement(o, f);
    case "test_entree": return genTestEntree(o, f, stagiaires);
    case "grille_evaluation": return genGrilleEvaluation(o, f, stagiaires);
    case "reglement_interieur": return genReglement_V2(o, f, stagiaires);
    case "reglement_interieur_stagiaire": {
      const si = params?.stagiaireIdx ?? 0;
      return genReglementStagiaire(o, f, stagiaires, si);
    }
    case "livret_accueil": return genLivretAccueil(o, f);
    case "convocation": return genConvocation_V2(o, f, stagiaires);
    case "convocation_stagiaire": {
      const si = params?.stagiaireIdx ?? 0;
      return genConvocationStagiaire(o, f, stagiaires, si);
    }
    case "contrat_formation_pro_stagiaire": {
      const si = params?.stagiaireIdx ?? 0;
      return genContratFormationProStagiaire(o, f, stagiaires, si);
    }
    case "convention_formation": return genConvention(o, f, stagiaires);
    case "emargement_jour": return genEmargementJour_V2(o, f, stagiaires, params?.jour ?? 0, params?.jourLabel ?? "");
    case "rapport_connexion": return genRapportConnexion(o, f, stagiaires);
    case "temps_connexion": return genTempsConnexion(o, f, stagiaires);
    case "temps_connexion_reel": return genTempsConnexionReel(o, f, stagiaires);
    case "tableau_presence": return genTableauPresence(o, f, stagiaires);
    case "eval_positionnement_remplie": return genEvalPositionnement(o, f, stagiaires);
    case "eval_intermediaire_remplie": return genEvalIntermediaire(o, f, stagiaires);
    case "eval_finale_remplie": return genEvalFinale(o, f, stagiaires);
    case "attestation_formation": return genAttestation(o, f, stagiaires);
    case "certificat_reussite": return genCertificatReussite_V2(o, f, stagiaires);
    case "evaluation_finale_stagiaire": {
      const si = params?.stagiaireIdx ?? 0;
      return genEvaluationFinaleStagiaire(o, f, stagiaires, si);
    }
    case "exercices_stagiaire": {
      const si = params?.stagiaireIdx ?? 0;
      const exIdx = params?.exerciceIdx ?? undefined;
      return genExercicesStagiaire(o, f, stagiaires, si, exIdx);
    }
    case "grille_acquisition_stagiaire": {
      const si = params?.stagiaireIdx ?? 0;
      return genGrilleAcquisitionStagiaire(o, f, stagiaires, si);
    }
    case "attestation_reussite_stagiaire": {
      const si = params?.stagiaireIdx ?? 0;
      return genAttestationReussiteStagiaire(o, f, stagiaires, si);
    }
    case "suivi_3_mois": return genSuivi3Mois(o, f);
    case "questionnaire_insertion": return genQuestionnaireInsertion(o, f);
    case "conditions_accueil": return genConditionsAccueil(o, f);
    case "charte_accueil": return genCharteAccueil(o, f);
    case "liste_moyens": return genListeMoyens(o, f);
    case "inventaire_materiel": return genInventaire(o, f);
    case "supports_cours": return genSupportsCours(o, f);
    case "guide_elearning": return genGuideElearning(o, f);
    case "cr_reunion": return genCRReunion(o, params?.mois ?? "");
    case "planning_formateurs": return genPlanningFormateurs(o, formateurs, formations);
    case "coordination_pedagogique": return genCoordination(o, f);
    case "livret_apprentissage": return genLivretApprentissage(o, f);
    case "fiche_suivi_tuteur": return genFicheSuiviTuteur(o, f);
    case "cv_formateur": return genCV(o, fmt);
    case "fiche_competences_formateur": return genFicheCompetences(o, fmt);
    case "evaluation_formateur": return genEvalFormateur(o, fmt);
    case "plan_dev_competences": return genPlanDev(o, formateurs);
    case "formation_formateur": return genFormationFormateur(o, fmt);
    case "entretien_professionnel": return genEntretienPro(o, fmt);
    case "referentiel_expertise": return genReferentielExpertise(o, fmt);
    case "portfolio_formateur": return genPortfolio(o, fmt);
    case "diplomes_formateur": return genDiplomes(o, fmt);
    case "attestation_experience": return genAttestationExp(o, fmt);
    case "procedure_veille": return genProcedureVeille(o);
    case "tableau_veille": {
      const vType = params?.type ?? "";
      if (vType === "réglementaire") return genVeilleReglementaireV2(o, f);
      if (vType === "métier") return genVeilleMetierV2(o, f);
      if (vType === "technologique") return genVeilleTechnologiqueV2(o, f);
      if (vType === "handicap") return genVeilleHandicap(o, f);
      return genTableauVeille(o, params?.trimestre ?? "", vType);
    }
    case "cr_veille": return genCRVeille(o, params?.mois ?? "", params?.type ?? "");
    case "newsletter_veille": return genNewsletter(o, params?.mois ?? "");
    case "fiche_innovation": return genFicheInnovation(o, params?.sujet ?? "");
    case "benchmark_outils": return genBenchmark(o);
    case "analyse_sectorielle": return genAnalyseSectorielle(o, params?.secteur ?? "");
    case "etude_prospective": return genEtudeProspective(o);
    case "rapport_veille_annuel": return genRapportVeilleAnnuel(o);
    case "exploitation_veille": return genExploitationVeille(o, params?.trimestre ?? "");
    case "plan_action_veille": return genPlanActionVeille(o);
    case "satisfaction_remplie": return genSatisfactionRemplie(o, f, stagiaires);
    case "analyse_satisfaction": return genAnalyseSatisfaction(o, f);
    case "satisfaction_financeur": return genSatisfactionFinanceur(o, f);
    case "synthese_financeurs": return genSyntheseFinanceurs(o, formations);
    case "rapport_financeurs": return genRapportFinanceurs(o);
    case "rapport_analyse_global": return genRapportAnalyseGlobal(o, formations);
    case "synthese_retours": return genSyntheseRetours(o, f);
    case "bilan_annuel_qualite": return genBilanAnnuel(o);
    case "registre_reclamations": return genRegistreReclamations(o);
    case "procedure_reclamation": return genProcedureReclamation(o);
    case "fiche_reclamation": return genFicheReclamation(o, params?.num ?? 1);
    case "suivi_reclamations": return genSuiviReclamations(o);
    case "plan_amelioration": return genPlanAmelioration(o);
    case "fiche_action": return genFicheAction(o, params?.num ?? 1);
    case "revue_direction": return genRevueDirection(o);
    case "tableau_suivi_actions": return genTableauSuiviActions(o, params?.trimestre ?? "");
    case "bilan_actions": return genBilanActions(o);
    case "audit_interne": return genAuditInterne(o, params?.semestre ?? "");
    case "indicateurs_performance": return genIndicateursPerformance(o, formations, stagiaires);
    case "rapport_amelioration": return genRapportAmelioration(o);
    // Type d'action spécifiques
    case "contrat_apprentissage": return genContratApprentissage(o, f, stagiaires);
    case "livret_apprentissage_cfa": return genLivretApprentissageCFA(o, f, stagiaires);
    case "fiche_maitre_apprentissage": return genFicheMaitreApprentissage(o, f);
    case "suivi_entreprise_cfa": return genSuiviEntrepriseCFA(o, f, stagiaires);
    case "competences_alternance": return genCompetencesAlternance(o, f, stagiaires);
    case "analyse_parcours_pro": return genAnalyseParcoursPro(o, f, stagiaires);
    case "plan_action_bilan": return genPlanActionBilan(o, f, stagiaires);
    case "synthese_bilan": return genSyntheseBilan(o, f, stagiaires);
    case "livret_recevabilite_vae": return genLivretRecevabilite(o, f, stagiaires);
    case "dossier_validation_vae": return genDossierValidation(o, f, stagiaires);
    case "accompagnement_vae": return genAccompagnementVAE(o, f, stagiaires);
    case "qcm_positionnement": return genQCMPositionnement(o, f, stagiaires);
    case "exercices_pratiques": return genExercicesPratiques_V2(o, f, stagiaires);
    case "qcm_final": return genQCMFinal_V2(o, f, stagiaires);
    case "test_positionnement_debut_trame": return genTestPositionnementTrame(o, f, "debut");
    case "test_positionnement_fin_trame": return genTestPositionnementTrame(o, f, "fin");
    case "test_positionnement_debut_stagiaire": {
      const si = params?.stagiaireIdx ?? 0;
      const s = stagiaires[si] || stagiaires[0];
      return genTestPositionnementIndividuel(o, f, s, si, "debut");
    }
    case "test_positionnement_fin_stagiaire": {
      const si = params?.stagiaireIdx ?? 0;
      const s = stagiaires[si] || stagiaires[0];
      return genTestPositionnementIndividuel(o, f, s, si, "fin");
    }
    case "procedure_eval_debut": return genProcedureEvaluation(o, f, "debut");
    case "procedure_eval_fin": return genProcedureEvaluation(o, f, "fin");
    case "grille_niveaux_positionnement": return genGrilleNiveauxPositionnement(o, f, stagiaires);
    // === Templates AF (Drive SELECT FORMATION) ===
    case "lien_site_internet": return genLienSiteInternet(o);
    case "procedure_indicateurs_performance": return genProcedureIndicateursPerformance(o, stagiaires);
    case "procedure_eval_besoins": return genProcedureEvalBesoins(o);
    case "fiche_eval_besoins_psh": return genFicheEvalBesoinsPSH(o);
    case "trame_eval_besoins": return genTrameEvalBesoins(o, f, stagiaires);
    case "trame_eval_besoins_stagiaire": {
      const si = params?.stagiaireIdx ?? 0;
      return genTrameEvalBesoinsStagiaire(o, f, stagiaires, si);
    }
    case "deroule_pedagogique_detaille": return genDeroulePedagogiqueDetaille(o, f);
    case "contrat_formation_pro": return genContratFormationPro_V2(o, f, stagiaires);
    case "procedure_accueil_stagiaires": return genProcedureAccueil_V2(o);
    case "reglement_interieur": return genReglement_V2(o, f, stagiaires);
    case "groupes_niveaux": return genGroupesNiveaux(o, f, stagiaires);
    case "procedure_eval_debut_formation": return genProcedureEvalDebutFormation(o);
    case "grille_acquisition_competences": return genGrilleAcquisition_V2(o, f, stagiaires);
    case "support_cours_ref": return genSupportCoursRef(o, f);
    case "ressources_pedagogiques": return genRessourcesPedagogiques(o, f);
    case "moyens_materiels": return genMoyensMateriels(o);
    case "bail_sous_location": return genBailSousLocation(o);
    case "facture_materiel": return genFactureMateriel(o, params);
    case "autoevaluation_formateur": {
      // Use the formateur name from the formation, not from SAMPLE_FORMATEURS
      const formateurName = f.formateur || fmt.prenom + " " + fmt.nom;
      const parts = formateurName.trim().split(/\s+/);
      const autoFmt: FormateurInfo = { ...fmt, prenom: parts.slice(0, -1).join(" ") || parts[0], nom: parts[parts.length - 1] || "" };
      return genAutoEvaluationFormateurV2(o, f, autoFmt);
    }
    case "liste_partenaires": return genListePartenairesV2(o);
    case "mandat_qualiopi": return genMandatQualiopi(o);
    case "referentiel_handicap": return genReferentielHandicap(o);
    case "procedure_adaptation": return genProcedureAdaptation_V2(o, f);
    case "tableau_suivi_parcours": return genTableauSuiviParcours_V2(o, f, stagiaires);
    case "tableau_suivi_parcours_excel": return genTableauSuiviParcours_V2(o, f, stagiaires);
    case "tableau_amelioration_continue": return genTableauAmeliorationContinue(o);
    case "tableau_amelioration_continue_excel": return genTableauAmeliorationContinueExcel(o, f, formations, stagiaires);
    case "suivi_dysfonctionnements_excel": return genSuiviDysfonctionnementsExcel(o, f, stagiaires);
    case "relances_appreciations_excel": return genRelancesAppreciationsExcel(o, f, stagiaires);
    case "procedure_amelioration_continue": return genProcedureAmeliorationContinue(o);
    case "appreciations_beneficiaires": return genAppreciationsBeneficiaires(o, f, stagiaires);
    case "appreciations_beneficiaires_stagiaire": {
      const si = params?.stagiaireIdx ?? 0;
      return genAppreciationsBeneficiairesStagiaire(o, f, stagiaires, si);
    }
    case "appreciations_entreprises": return genAppreciationsEntreprises(o, f, stagiaires);
    case "appreciations_financeurs": return genAppreciationsFinanceurs(o, f);
    case "bilan_froid": return genBilanFroid(o, f, stagiaires);
    case "bilan_froid_stagiaire": {
      const si = params?.stagiaireIdx ?? 0;
      return genBilanFroidStagiaire(o, f, stagiaires, si);
    }
    case "bilan_chaud": return genBilanChaud(o, f, stagiaires);
    case "bilan_chaud_stagiaire": {
      const si = params?.stagiaireIdx ?? 0;
      return genBilanChaudStagiaire(o, f, stagiaires, si);
    }
    case "compte_rendu_formateur": return genCompteRenduFormateur(o, f);
    case "tableau_relance_appreciations": return genTableauRelanceAppreciations(o);
    case "procedure_formation_fc": return genProcedureFormationFC(o);
    case "dossier_inscription": return genDossierInscription(o, f, stagiaires);
    case "mail_renseignement_candidat": return genMailRenseignement(o, f);
    case "mail_aide_connexion": return genMailAideConnexion(o, f);
    case "procedure_abandon": return genProcedureAbandon(o);
    case "procedure_absences": return genProcedureAbsences(o);
    case "formulaire_reclamation": return genFormulaireReclamation(o);
    case "tableau_dysfonctionnements": return genTableauDysfonctionnements(o);
    case "tableau_synthese_amelioration": return genTableauSyntheseAmelioration(o);
    case "grille_recrutement_formateur": return genGrilleRecrutementFormateur(o);
    case "process_recrutement_formateur": return genProcessRecrutementFormateur(o);
    case "procedure_recrutement_formateur": return genProcessusRecrutementV2(o);
    case "registre_personnel": return genRegistrePersonnel(o, formateurs);
    case "descriptif_moyens_foad": return genDescriptifFOAD(o);
    case "contrat_sous_traitance": return genContratSousTraitance(o);
    case "fiche_autoevaluation": return genFicheAutoevaluation(o, f, stagiaires);
    case "attestation_entree_formation": return genAttestationEntree(o, f, stagiaires);
    case "boite_formateur": return genBoiteFormateur(o, f);
    case "atelier_tre": return genAtelierTRE(o, f);
    case "dossier_accompagnement_psh": return genDossierPSH(o);
    case "guide_numerique_psh": return genGuideNumeriquePSH(o);
    case "liste_partenaires_handicap": return genListePartenairesHandicap(o);
    case "fiche_renseignement": return genFicheRenseignement(o, f, stagiaires);
    case "grille_entretien_candidat": return genGrilleEntretienCandidat(o, f);
    case "suivi_inscriptions": return genSuiviInscriptions(o, f, stagiaires);
    case "attestation_assiduite": return genAttestationAssiduite(o, f, stagiaires);
    case "certificat_realisation": return genCertificatRealisation(o, f, stagiaires);
    case "suivi_absences": return genSuiviAbsences(o, f, stagiaires);
    case "fiche_poste_formateur": return genFichePosteRole(o, params?.role ?? "formateur");
    case "contrat_sous_traitance_v2": return genContratSousTraitanceV2(o, f, stagiaires);
    case "charte_qualite_formateur_externe": return genCharteQualiteFormateurExterne(o);
    case "plan_dev_competences_excel": return genPlanDevCompetencesExcel(o, f, formateurs, stagiaires);
    case "grille_entretien_annuel": return genGrilleEntretienAnnuel(o, fmt);
    case "enquete_satisfaction_formateur": return genEnqueteSatisfactionFormateur(o, f);
    // === Nouveaux templates CFA ===
    case "attestation_inscription_cfa": return genAttestationInscriptionCFA(o, f, stagiaires);
    case "procedure_psh_cfa": return genDossierPSH(o);
    case "dossier_accompagnement_psh_cfa": return genDossierPSH(o);
    case "guide_aide_connexion_cfa": return genMailAideConnexion(o, f);
    case "fiche_autoevaluation_apprenti": return genFicheAutoevaluation(o, f, stagiaires);
    case "procedure_abandon_cfa": return genProcedureAbandon(o);
    case "procedure_absences_cfa": return genProcedureAbsences(o);
    case "logs_connexion_cfa": return genRapportConnexion(o, f, stagiaires);
    case "boite_formateur_cfa": return genBoiteFormateur(o, f);
    case "documents_certificateurs_cfa": return genDocumentsCertificateursCFA(o, f);
    case "book_qualiopi": {
      const allFormations = [f];
      const allStagiaires = mergeStagiaires(stagiaires);
      const fullCat = buildFullCatalog(allFormations, allStagiaires, SAMPLE_FORMATEURS);
      return generateBookQualiopi(o, allFormations, allStagiaires, fullCat);
    }
    default: return htmlWrap(`<h1>Document non trouvé</h1><p>Template : ${template}</p>`);
  }
}

// ============== TEMPLATE GENERATORS ==============

function genFicheIdentite(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "FICHE D'IDENTITÉ DE L'ORGANISME", sections: [
    { heading: "Informations générales", content: `<p><strong>Raison sociale :</strong> ${o.nom}</p><p><strong>SIRET :</strong> ${o.siret}</p><p><strong>NDA :</strong> ${o.nda}</p><p><strong>Adresse :</strong> ${o.adresse}, ${o.codePostal} ${o.ville}</p><p><strong>Téléphone :</strong> ${o.telephone}</p><p><strong>Email :</strong> ${o.email}</p><p><strong>Site web :</strong> ${o.siteWeb}</p>` },
    { heading: "Direction", content: `<p><strong>Dirigeant :</strong> ${o.dirigeant}</p><p><strong>Resp. pédagogique :</strong> ${o.responsablePedagogique}</p><p><strong>Réf. handicap :</strong> ${o.referentHandicap}</p><p><strong>Réf. qualité :</strong> ${o.referentQualite}</p>` },
    { heading: "Activité", content: `<p><strong>Domaines :</strong> ${o.domainesFormation}</p><p><strong>Types d'actions :</strong> ${o.typesActions.join(", ")}</p><p><strong>Certifications :</strong> ${o.certifications}</p><p><strong>Outils :</strong> ${o.outilsUtilises}</p>` },
  ]});
}

function genPresentation(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PRÉSENTATION DE L'ORGANISME", sections: [
    { heading: "Notre histoire", content: `<p>${o.nom} est un organisme de formation professionnelle créé en 2015, spécialisé dans les domaines suivants : ${o.domainesFormation}. Fort d'une équipe de formateurs experts et certifiés, nous accompagnons chaque année plus de 500 stagiaires dans le développement de leurs compétences professionnelles.</p>` },
    { heading: "Notre mission", content: `<p>Proposer des formations de qualité, adaptées aux besoins des entreprises et des individus, dans le respect du Référentiel National Qualité (RNQ). Notre organisme est certifié Qualiopi pour les actions de formation et les bilans de compétences.</p>` },
    { heading: "Nos valeurs", content: `<p>• <strong>Excellence pédagogique</strong> : des formateurs experts et des contenus actualisés<br>• <strong>Personnalisation</strong> : chaque parcours est adapté au profil du stagiaire<br>• <strong>Innovation</strong> : intégration des nouvelles technologies et méthodes pédagogiques<br>• <strong>Accessibilité</strong> : accueil de tous les publics, y compris en situation de handicap</p>` },
    { heading: "Nos chiffres clés 2024", content: `<p>• 523 stagiaires formés<br>• 47 formations dispensées<br>• 97% de taux de satisfaction<br>• 89% de taux de réussite<br>• 82% d'insertion professionnelle à 6 mois</p>`, variant: "green" },
  ]});
}

function genOrganigramme(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "ORGANIGRAMME DE L'ORGANISME", extraHtml: `
    <div style="text-align:center;margin:30px 0">
      <div style="background:#1e3a7b;color:white;padding:15px 30px;border-radius:8px;display:inline-block;margin-bottom:20px"><strong>Direction Générale</strong><br>${o.dirigeant}</div>
      <div style="display:flex;justify-content:center;gap:20px;flex-wrap:wrap;margin-top:20px">
        <div style="background:#e8f0fe;padding:12px 20px;border-radius:8px;min-width:180px"><strong>Pôle Pédagogique</strong><br>${o.responsablePedagogique}<br><em style="font-size:11px">5 formateurs</em></div>
        <div style="background:#e8f0fe;padding:12px 20px;border-radius:8px;min-width:180px"><strong>Pôle Qualité</strong><br>${o.referentQualite}<br><em style="font-size:11px">Amélioration continue</em></div>
        <div style="background:#e8f0fe;padding:12px 20px;border-radius:8px;min-width:180px"><strong>Pôle Handicap</strong><br>${o.referentHandicap}<br><em style="font-size:11px">Accessibilité</em></div>
        <div style="background:#e8f0fe;padding:12px 20px;border-radius:8px;min-width:180px"><strong>Pôle Administratif</strong><br>Marie Lecomte<br><em style="font-size:11px">Inscriptions, facturation</em></div>
      </div>
    </div>` });
}

function genCharteQualite(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "CHARTE QUALITÉ", sections: [
    { heading: "Engagement 1 – Information", content: "<p>Fournir une information claire, complète et actualisée sur l'ensemble de nos prestations, incluant les prérequis, objectifs, durées, tarifs et modalités d'évaluation.</p>" },
    { heading: "Engagement 2 – Personnalisation", content: "<p>Analyser les besoins de chaque bénéficiaire et adapter nos formations en conséquence, en tenant compte du niveau initial et des objectifs professionnels.</p>" },
    { heading: "Engagement 3 – Accompagnement", content: "<p>Assurer un suivi individualisé tout au long du parcours de formation et au-delà, avec un accompagnement post-formation à 3 mois.</p>" },
    { heading: "Engagement 4 – Accessibilité", content: "<p>Garantir l'accès à nos formations pour les personnes en situation de handicap, avec des aménagements adaptés et un référent dédié.</p>" },
    { heading: "Engagement 5 – Amélioration continue", content: "<p>Recueillir systématiquement les retours des parties prenantes et mettre en œuvre des actions d'amélioration mesurables.</p>" },
  ], signatures: { type: "2", labels: ["Le Dirigeant", "Le Référent Qualité"], names: [o.dirigeant, o.referentQualite] } });
}

function genPolitiqueQualite(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "POLITIQUE QUALITÉ", sections: [
    { heading: "Contexte", content: `<p>${o.nom} s'inscrit dans une démarche qualité conforme au Référentiel National Qualité (RNQ – Qualiopi). Cette politique qualité définit nos orientations stratégiques en matière de qualité des formations.</p>` },
    { heading: "Objectifs qualité 2024", content: "<p>1. Maintenir un taux de satisfaction stagiaires ≥ 95%<br>2. Atteindre un taux de réussite aux certifications ≥ 85%<br>3. Réduire le délai de traitement des réclamations à 48h<br>4. Former 100% des formateurs aux nouvelles méthodes pédagogiques<br>5. Améliorer l'accessibilité handicap de 100% des formations</p>" },
    { heading: "Moyens déployés", content: "<p>• Système de management de la qualité documenté<br>• Audits internes semestriels<br>• Revue de direction annuelle<br>• Veille réglementaire et pédagogique trimestrielle<br>• Enquêtes de satisfaction systématiques</p>", variant: "green" },
  ], signatures: { type: "2", labels: ["Le Dirigeant", "Le Référent Qualité"], names: [o.dirigeant, o.referentQualite] } });
}

function genCGV(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "CONDITIONS GÉNÉRALES DE VENTE", sections: [
    { heading: "Article 1 – Objet", content: `<p>Les présentes CGV régissent les relations contractuelles entre ${o.nom} et ses clients pour toute prestation de formation professionnelle.</p>` },
    { heading: "Article 2 – Inscription", content: "<p>L'inscription est réputée définitive après réception du bulletin d'inscription signé et du règlement (ou accord de prise en charge OPCO).</p>" },
    { heading: "Article 3 – Tarifs", content: "<p>Les tarifs sont indiqués en euros HT. Ils comprennent les frais pédagogiques, les supports de formation et l'accès à la plateforme e-learning. Les frais de déplacement et d'hébergement restent à la charge du stagiaire.</p>" },
    { heading: "Article 4 – Annulation", content: "<p>Toute annulation doit être signalée au moins 15 jours avant le début de la formation. En cas d'annulation tardive (moins de 7 jours), 50% du montant sera facturé. En cas de non-présentation, la totalité sera due.</p>" },
    { heading: "Article 5 – Rétractation", content: "<p>Conformément à l'article L.6353-5 du Code du travail, le stagiaire particulier dispose d'un délai de rétractation de 10 jours à compter de la signature de la convention.</p>" },
    { heading: "Article 6 – Règlement", content: "<p>Le règlement s'effectue par virement bancaire à 30 jours date de facture. Tout retard de paiement entraînera des pénalités au taux légal en vigueur.</p>" },
  ] });
}

function genMentionsLegales(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "MENTIONS LÉGALES", sections: [
    { heading: "Éditeur du site", content: `<p>${o.nom}<br>${o.adresse}, ${o.codePostal} ${o.ville}<br>SIRET : ${o.siret}<br>NDA : ${o.nda}<br>Directeur de la publication : ${o.dirigeant}</p>` },
    { heading: "Hébergeur", content: "<p>OVH SAS – 2 rue Kellermann, 59100 Roubaix – France</p>" },
    { heading: "Protection des données", content: `<p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Contact : ${o.email}</p>` },
  ] });
}

function genCatalogue(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: `CATALOGUE DE FORMATION`, subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "Objectifs pédagogiques", content: `<p>${f.objectifs}</p>` },
    { heading: "Programme", content: `<p>${f.programme.replace(/\n/g, "<br>")}</p>` },
    { heading: "Moyens pédagogiques", content: `<p>${f.moyensPedagogiques}</p>` },
    { heading: "Évaluation", content: `<p>${f.methodesEvaluation}</p>` },
    { heading: "Accessibilité handicap", content: `<p>Référent handicap : ${o.referentHandicap}. Nos formations sont accessibles aux personnes en situation de handicap. Contactez-nous pour tout besoin d'aménagement.</p>`, variant: "green" },
  ] });
}

function genFicheInfoFormation(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "FICHE D'INFORMATION PUBLIQUE", subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "Public visé", content: `<p>${f.publicVise}</p>` },
    { heading: "Prérequis", content: `<p>${f.prerequis}</p>` },
    { heading: "Objectifs", content: `<p>${f.objectifs}</p>` },
    { heading: "Délai d'accès", content: `<p>${f.delaiAcces}</p>` },
    { heading: "Contact", content: `<p>${o.telephone} – ${o.email}</p>` },
  ] });
}

function genStatsAnnuelles(o: OrganismeInfo, formations: FormationInfo[]) {
  return buildDocument({ org: o, title: "STATISTIQUES ANNUELLES 2024", table: {
    headers: ["Indicateur", "Résultat", "Objectif", "Atteint"],
    rows: [
      ["Nombre de formations réalisées", "47", "40", "✅ Oui"],
      ["Nombre de stagiaires formés", "523", "450", "✅ Oui"],
      ["Taux de satisfaction global", "97%", "≥ 90%", "✅ Oui"],
      ["Taux de réussite moyen", "89%", "≥ 80%", "✅ Oui"],
      ["Taux d'insertion à 6 mois", "82%", "≥ 75%", "✅ Oui"],
      ["Taux d'abandon", "3%", "≤ 5%", "✅ Oui"],
      ["Délai moyen de réponse", "24h", "≤ 48h", "✅ Oui"],
      ["Réclamations traitées sous 48h", "100%", "100%", "✅ Oui"],
    ]
  }, sections: [{ heading: "Commentaire", content: "<p>L'ensemble des objectifs qualité 2024 ont été atteints. Les résultats sont en progression par rapport à 2023 (+3% de satisfaction, +5% de réussite).</p>", variant: "green" }] });
}

function genTauxSatisfactionGlobal(o: OrganismeInfo, formations: FormationInfo[]) {
  return buildDocument({ org: o, title: "TAUX DE SATISFACTION GLOBAL", table: {
    headers: ["Formation", "Satisfaction", "Nb réponses", "Recommandation"],
    rows: formations.map((f, i) => [f.intitule, `${93 + (i % 5)}%`, `${8 + (i % 4)}`, `${95 + (i % 4)}%`])
  }, sections: [{ heading: "Synthèse", content: "<p><strong>Taux de satisfaction moyen : 97%</strong><br>Taux de recommandation moyen : 96%<br>Période : Janvier – Décembre 2024</p>", variant: "green" }] });
}

function genTauxReussite(o: OrganismeInfo, f: FormationInfo, nbParticipants: number) {
  return buildDocument({ org: o, title: "TAUX DE RÉUSSITE", subtitle: f.intitule, formation: f, showFormationInfo: true, table: {
    headers: ["Indicateur", "Résultat"],
    rows: [["Nombre de participants", `${nbParticipants}`], ["Réussites", `${nbParticipants}`], ["Taux de réussite", "100%"], ["Note moyenne", "10/10"], ["Satisfaction formation", "100%"]]
  } });
}

function genTauxSatisfactionFormation(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "TAUX DE SATISFACTION", subtitle: f.intitule, formation: f, showFormationInfo: true, table: {
    headers: ["Critère", "Note /5", "Satisfaction"],
    rows: [["Accueil et organisation", "4.8", "96%"], ["Atteinte des objectifs", "4.6", "92%"], ["Contenu adapté", "4.7", "94%"], ["Méthodes pédagogiques", "4.8", "96%"], ["Compétence du formateur", "4.9", "98%"], ["Supports de formation", "4.5", "90%"], ["Durée adaptée", "4.6", "92%"], ["Recommandation", "4.8", "96%"]]
  }, sections: [{ heading: "Moyenne globale", content: "<p><strong>4.7 / 5 – Satisfaction : 94%</strong></p>", variant: "green" }] });
}

function genInsertionPro(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "TAUX D'INSERTION PROFESSIONNELLE", table: {
    headers: ["Formation", "Insertion 3 mois", "Insertion 6 mois", "Nb répondants"],
    rows: [["Excel Professionnel", "78%", "85%", "9"], ["Anglais Professionnel", "82%", "88%", "7"], ["CAP Esthétique", "75%", "80%", "11"], ["Bureautique", "80%", "83%", "9"], ["Management", "90%", "95%", "7"], ["Digital Marketing", "85%", "90%", "13"], ["Informatique", "88%", "92%", "9"]]
  }, sections: [{ heading: "Synthèse", content: "<p><strong>Taux d'insertion global à 6 mois : 82%</strong><br>Enquête réalisée entre mars et septembre 2024.</p>", variant: "green" }] });
}

function genProcedureInscription(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE D'INSCRIPTION", sections: [
    { heading: "Étape 1 – Demande d'information", content: "<p>Le candidat prend contact par téléphone, email ou via le formulaire en ligne. Un conseiller lui fournit toutes les informations sur la formation souhaitée.</p>" },
    { heading: "Étape 2 – Positionnement", content: "<p>Un questionnaire de positionnement est envoyé pour évaluer le niveau initial et les besoins spécifiques du candidat.</p>" },
    { heading: "Étape 3 – Devis et convention", content: "<p>Un devis personnalisé est établi. Après validation, la convention de formation est signée par les deux parties.</p>" },
    { heading: "Étape 4 – Confirmation", content: "<p>La convocation est envoyée au stagiaire avec toutes les informations pratiques (lieu, horaires, matériel requis).</p>" },
    { heading: "Étape 5 – Accueil", content: "<p>Le jour J, le stagiaire est accueilli, le règlement intérieur lui est remis, et la formation débute.</p>" },
  ] });
}

function genModalitesAcces(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "MODALITÉS D'ACCÈS AUX FORMATIONS", sections: [
    { heading: "Publics concernés", content: "<p>Nos formations s'adressent aux salariés, demandeurs d'emploi, indépendants, et entreprises de toutes tailles.</p>" },
    { heading: "Prérequis", content: "<p>Les prérequis varient selon les formations. Ils sont clairement indiqués sur chaque fiche programme. Un test de positionnement peut être réalisé en amont.</p>" },
    { heading: "Délais d'accès", content: "<p>• Formations inter-entreprises : inscription possible jusqu'à 7 jours avant le début de la session<br>• Formations intra-entreprise : délai de 14 jours minimum<br>• Formations sur mesure : délai de 30 jours minimum</p>" },
    { heading: "Accessibilité handicap", content: `<p>Toutes nos formations sont accessibles aux personnes en situation de handicap. Contact : ${o.referentHandicap} – ${o.email}</p>`, variant: "green" },
  ] });
}

function genDelaisAcces(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "DÉLAIS D'ACCÈS AUX FORMATIONS", table: {
    headers: ["Type de formation", "Délai minimum", "Conditions"],
    rows: [["Inter-entreprises", "7 jours", "Sous réserve de places disponibles"], ["Intra-entreprise", "14 jours", "Après validation du devis"], ["Sur mesure", "30 jours", "Après ingénierie pédagogique"], ["E-learning", "48 heures", "Après réception du paiement"], ["VAE", "30 jours", "Après entretien de faisabilité"]]
  } });
}

function genFicheTarifs(o: OrganismeInfo, formations: FormationInfo[]) {
  return buildDocument({ org: o, title: "GRILLE TARIFAIRE 2024", table: {
    headers: ["Formation", "Durée", "Tarif HT", "Modalité"],
    rows: formations.map(f => [f.intitule, f.duree, f.tarif, f.modalites])
  }, sections: [{ heading: "Conditions", content: "<p>Tarifs nets de taxe (TVA non applicable, art. 261-4-4° du CGI). Tarifs dégressifs à partir de 3 inscriptions. Prise en charge OPCO possible.</p>" }] });
}

function genPlanning(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "PLANNING DES SESSIONS", subtitle: f.intitule, table: {
    headers: ["Session", "Dates", "Lieu", "Places", "Statut"],
    rows: [
      ["Session 1", `${formatDate(f.dateDebut)} – ${formatDate(f.dateFin)}`, f.lieu, f.nombreParticipants, "✅ Réalisée"],
      ["Session 2", "Juin 2024", f.lieu, f.nombreParticipants, "✅ Réalisée"],
      ["Session 3", "Septembre 2024", f.lieu, f.nombreParticipants, "✅ Réalisée"],
      ["Session 4", "Décembre 2024", f.lieu, f.nombreParticipants, "📋 Programmée"],
    ]
  } });
}

function genQuestionnairePositionnement(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const questions = evalData.qcmPositionnement;
  let extra = `<h2>Résultats détaillés du questionnaire de positionnement</h2>`;
  extra += `<p><strong>Formation :</strong> ${f.intitule}<br><strong>Date :</strong> ${formatDate(f.dateDebut)}<br><strong>Formateur :</strong> ${f.formateur}</p>`;

  // Summary table
  const summaryRows = stagiaires.slice(0, 10).map((s, i) => {
    const answers = generateStagiaireAnswers(questions, i);
    const result = computeQCMScore(questions, answers);
    const pct = Math.round(result.score / result.total * 100);
    const niveau = pct >= 80 ? "Avancé" : pct >= 60 ? "Intermédiaire" : "Débutant";
    return [s.prenom + " " + s.nom, `${result.score}/${result.total}`, `${pct}%`, niveau, evalData.appreciations[i] ? evalData.appreciations[i].split('.')[0] + '.' : "Niveau correct."];
  });
  extra += `<h3>Synthèse des résultats</h3>`;
  extra += tableHTML(["Stagiaire", "Score", "%", "Niveau", "Appréciation du formateur"], summaryRows);

  // Detailed per-stagiaire answer sheets (first 5)
  stagiaires.slice(0, 5).forEach((s, si) => {
    const answers = generateStagiaireAnswers(questions, si);
    const result = computeQCMScore(questions, answers);
    extra += `<div class="page-break"></div>`;
    extra += `<h2>Fiche individuelle – ${s.prenom} ${s.nom}</h2>`;
    extra += `<p><strong>Entreprise :</strong> ${s.entreprise} | <strong>Poste :</strong> ${s.poste}</p>`;
    extra += `<p><strong>Score :</strong> ${result.score}/${result.total} (${Math.round(result.score / result.total * 100)}%)</p>`;
    const qRows = questions.map((q, qi) => {
      const isCorrect = result.details[qi].correct;
      const chosenOption = q.options[answers[qi]];
      const correctOption = q.options[q.correctIndex];
      return [
        `<strong>Q${qi + 1}.</strong> ${q.question}`,
        chosenOption,
        isCorrect ? `✅ Correct` : `❌ Réponse attendue : ${correctOption}`,
      ];
    });
    extra += tableHTML(["Question", "Réponse du stagiaire", "Résultat"], qRows);
    extra += `<div class="section section-green"><p><strong>Appréciation du formateur :</strong> ${evalData.appreciations[si] || "Niveau satisfaisant."}</p></div>`;
  });

  return buildDocument({ org: o, title: "QUESTIONNAIRE DE POSITIONNEMENT – RÉSULTATS DÉTAILLÉS", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra,
    signatures: { type: "2", labels: ["Le Formateur", "Le Resp. Pédagogique"], names: [f.formateur, o.responsablePedagogique] } });
}

function genAnalyseBesoins(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  return buildDocument({ org: o, title: "ANALYSE DES BESOINS", subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "Contexte", content: `<p>Analyse réalisée sur ${stagiaires.length} candidats inscrits à la formation « ${f.intitule} ». Les besoins ont été recueillis via questionnaire en ligne et entretiens individuels.</p>` },
    { heading: "Besoins identifiés", content: "<p>• 80% des stagiaires souhaitent développer leurs compétences opérationnelles<br>• 60% visent une certification ou une validation de compétences<br>• 40% sont en reconversion professionnelle<br>• 20% souhaitent un accompagnement spécifique (handicap, horaires aménagés)</p>" },
    { heading: "Adaptations mises en place", content: "<p>• Ajustement du rythme pédagogique<br>• Ajout d'exercices pratiques supplémentaires<br>• Mise à disposition de ressources complémentaires en ligne<br>• Aménagement d'horaires pour 2 stagiaires</p>", variant: "green" },
  ] });
}

function genEntretienPrealable(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "MODÈLE D'ENTRETIEN PRÉALABLE", sections: [
    { heading: "Identité du candidat", content: "<p>Nom : _________________ Prénom : _________________<br>Entreprise : _________________ Poste : _________________</p>" },
    { heading: "Parcours professionnel", content: "<p>Expérience dans le domaine : _________________<br>Formations précédentes : _________________</p>" },
    { heading: "Objectifs de la formation", content: "<p>Pourquoi souhaitez-vous suivre cette formation ? _________________<br>Quels résultats concrets attendez-vous ? _________________</p>" },
    { heading: "Contraintes éventuelles", content: "<p>Situation de handicap : ☐ Oui ☐ Non<br>Besoins d'aménagement : _________________<br>Contraintes horaires : _________________</p>" },
  ] });
}

function genProgramme(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], realStagiairesCount: number = 1) {
  const nbStagiaires = realStagiairesCount;
  // Parse programme into day blocks for the déroulé pédagogique table
  const programmeLines = f.programme.split("\n").filter(l => l.trim());
  const dayBlocks: { title: string; rows: string[][] }[] = [];
  let currentDay: { title: string; rows: string[][] } | null = null;

  for (const line of programmeLines) {
    const dayMatch = line.match(/^(Jour\s+\d+)/i);
    if (dayMatch) {
      currentDay = { title: line.trim(), rows: [] };
      dayBlocks.push(currentDay);
    } else if (currentDay) {
      const timeMatch = line.match(/^(\d{1,2}[h:]\d{2}\s*[–-]\s*\d{1,2}[h:]\d{2})\s*[:\s]\s*(.+)/i);
      if (timeMatch) {
        currentDay.rows.push([timeMatch[1].trim(), timeMatch[2].trim()]);
      } else if (line.trim()) {
        currentDay.rows.push(["", line.trim()]);
      }
    } else {
      if (!currentDay) {
        currentDay = { title: "Déroulé pédagogique", rows: [] };
        dayBlocks.push(currentDay);
      }
      currentDay.rows.push(["", line.trim()]);
    }
  }

  // If no structured programme, auto-generate a déroulé based on duration and formation topic
  const heuresMatch = f.duree.match(/(\d+)\s*h/i);
  const totalHeures = heuresMatch ? parseInt(heuresMatch[1]) : 14;
  const heuresTotal = `${totalHeures} heures`;
  const joursMatch = f.duree.match(/(\d+)\s*jours?/i);
  const nbJours = joursMatch ? parseInt(joursMatch[1]) : Math.ceil(totalHeures / 7);

  if (dayBlocks.length === 0 || !dayBlocks.some(d => d.rows.length > 0)) {
    // Extract objectives as content seeds for each day
    const objectifsItems = f.objectifs
      .split(/\n|\.(?=\s)/)
      .map(l => l.trim().replace(/^[-•*]\s*/, "").replace(/^À l'issue.*capable de\s*:?\s*/i, ""))
      .filter(l => l.length > 5);

    // Extract programme modules
    const modules = programmeLines
      .filter(l => !l.match(/^(Jour|Module)\s+\d+/i))
      .map(l => l.replace(/^[-•*]\s*/, "").trim())
      .filter(l => l.length > 3);

    // Combine objectives and modules for richer content
    const allTopics = [...modules];
    if (allTopics.length < nbJours * 3) {
      for (const obj of objectifsItems) {
        if (!allTopics.some(t => t.toLowerCase().includes(obj.toLowerCase().slice(0, 20)))) {
          allTopics.push(obj);
        }
      }
    }

    // Generate filler activities specific to the formation
    const formationName = f.intitule || "la formation";
    const fillers = [
      `Exercices pratiques appliqués à ${formationName}`,
      `Mise en situation professionnelle – ${formationName}`,
      `Atelier pratique guidé`,
      `Travaux dirigés et cas concrets`,
      `Exercices en autonomie avec accompagnement individualisé`,
      `Synthèse et consolidation des acquis du jour`,
    ];

    dayBlocks.length = 0;
    const topicsPerDay = Math.max(3, Math.ceil(allTopics.length / nbJours));

    for (let d = 0; d < nbJours; d++) {
      const dayTopics = allTopics.slice(d * topicsPerDay, (d + 1) * topicsPerDay);
      const isFirstDay = d === 0;
      const isLastDay = d === nbJours - 1;
      const dayTitle = `Jour ${d + 1} – ${isFirstDay ? "Découverte et fondamentaux" : isLastDay ? "Approfondissement et évaluation finale" : `Jour ${d + 1} – Pratique et progression`} (7 heures)`;
      const rows: string[][] = [];

      // Morning
      if (isFirstDay) {
        rows.push(["09h00 – 09h30", "Accueil, présentation de la formation, des objectifs et tour de table"]);
        rows.push(["09h30 – 10h30", dayTopics[0] ? `${dayTopics[0]} et test de positionnement début` : `Introduction à ${formationName} et test de positionnement début`]);
      } else {
        rows.push(["09h00 – 09h30", "Accueil, rappel des acquis de la veille et objectifs du jour"]);
        rows.push(["09h30 – 10h30", dayTopics[0] || fillers[d % fillers.length]]);
      }
      rows.push(["10h30 – 11h00", "Pause"]);
      rows.push(["11h00 – 12h30", dayTopics[1] || (dayTopics[0] ? `Approfondissement : ${dayTopics[0]}` : fillers[(d + 1) % fillers.length])]);

      // Afternoon
      rows.push(["12h30 – 13h30", "Pause déjeuner"]);
      rows.push(["13h30 – 15h00", dayTopics[2] || fillers[(d + 2) % fillers.length]]);
      rows.push(["15h00 – 15h15", "Pause"]);

      if (isLastDay) {
        rows.push(["15h15 – 16h30", "Test de positionnement fin de formation et évaluation finale"]);
        rows.push(["16h30 – 17h00", "Grille d'acquisition des compétences, bilan de formation et remise des attestations"]);
      } else {
        rows.push(["15h15 – 16h30", dayTopics[3] || fillers[(d + 3) % fillers.length]]);
        rows.push(["16h30 – 17h00", `Synthèse de la journée, questions-réponses et préparation du jour ${d + 2}`]);
      }

      dayBlocks.push({ title: dayTitle, rows });
    }
  }

  // Build the déroulé table HTML
  let derouleHtml = "";
  for (const day of dayBlocks) {
    derouleHtml += `<h3 style="margin-top:20px;color:${getDocStyle().primaryColor}">${day.title}</h3>`;
    derouleHtml += `<table><tr><th style="width:25%">Horaire</th><th>Contenu</th></tr>`;
    for (const row of day.rows) {
      const isPause = row[1] === "Pause" || row[1] === "Pause déjeuner";
      const style = isPause ? ' style="background:#f0f0f0;font-style:italic;color:#888"' : '';
      derouleHtml += `<tr${style}><td>${row[0]}</td><td>${row[1]}</td></tr>`;
    }
    derouleHtml += `</table>`;
  }

  // Build objectifs as list items
  const objectifsList = f.objectifs
    .split(/\n|\.(?=\s)/)
    .map(l => l.trim())
    .filter(l => l.length > 5)
    .map(l => `<li>${l.replace(/^[-•]\s*/, "")}</li>`)
    .join("");
  const objectifsHtml = objectifsList ? `<ul>${objectifsList}</ul>` : `<p>${f.objectifs}</p>`;

  // Generate competences from objectifs (reformulated)
  const objectifsItems = f.objectifs
    .split(/\n|\.(?=\s)/)
    .map(l => l.trim().replace(/^[-•]\s*/, "").replace(/^À l'issue.*capable de\s*:?\s*/i, ""))
    .filter(l => l.length > 5);
  const competencesHtml = objectifsItems.length > 0
    ? `<ul>${objectifsItems.map(item => {
        // Reformulate as a competence
        const comp = item.charAt(0).toUpperCase() + item.slice(1);
        return `<li>${comp}</li>`;
      }).join("")}</ul>`
    : objectifsHtml;

  // Build public visé as list
  const publicItems = f.publicVise
    .split(/[,\n]/)
    .map(l => l.trim())
    .filter(l => l);
  const publicHtml = publicItems.length > 0
    ? `<ul>${publicItems.map(l => `<li>${l}</li>`).join("")}</ul>`
    : `<p>${f.publicVise}</p>`;

  // Build moyens pédagogiques as list
  const moyensItems = f.moyensPedagogiques
    .split(/\n|[,;](?=\s)/)
    .map(l => l.trim())
    .filter(l => l.length > 3);
  const moyensHtml = moyensItems.length > 0
    ? `<ul>${moyensItems.map(l => `<li>${l.replace(/^[-•]\s*/, "")}</li>`).join("")}</ul>`
    : `<ul>
        <li>Ordinateur individuel par stagiaire</li>
        <li>Vidéoprojecteur ou écran de projection</li>
        <li>Supports pédagogiques numériques (fiches pratiques, pas-à-pas)</li>
        <li>Exercices pratiques fournis par le formateur</li>
        <li>Connexion Internet</li>
        <li>Assistance pédagogique continue</li>
      </ul>`;

  // Build évaluation as list — always detailed
  const evalItems = f.methodesEvaluation
    .split(/\n|[,;](?=\s)/)
    .map(l => l.trim())
    .filter(l => l.length > 3);
  const evalHtml = evalItems.length > 0
    ? `<ul>${evalItems.map(l => `<li>${l.replace(/^[-•]\s*/, "")}</li>`).join("")}</ul>`
    : `<ul>
        <li>Test de positionnement en début de formation</li>
        <li>Exercices pratiques et cas concrets tout au long de la formation</li>
        <li>Évaluation finale en fin de formation (QCM / cas pratique)</li>
        <li>Test de positionnement en fin de formation</li>
        <li>Grille d'acquisition des compétences</li>
      </ul>`;

  // Determine modalité label
  const modaliteLabel = f.modalites === "presentiel" ? "Présentiel"
    : f.modalites === "distanciel" ? "Distanciel"
    : f.modalites === "mixte" ? "Mixte (présentiel et distanciel)"
    : f.modalites || "Présentiel";

  // Format dates
  const dateDebutFmt = f.dateDebut ? formatDate(f.dateDebut) : "À définir";
  const dateFinFmt = f.dateFin ? formatDate(f.dateFin) : "À définir";

  const extraContent = `
    <h2>1. Organisme de formation</h2>
    <div class="section">
      <p><strong>Nom :</strong> ${o.nom}</p>
      <p><strong>Adresse :</strong> ${o.adresse}, ${o.codePostal} ${o.ville}</p>
      <p><strong>SIRET :</strong> ${o.siret}</p>
      <p><strong>NDA :</strong> ${o.nda}</p>
      <p><strong>Téléphone :</strong> ${o.telephone}</p>
      <p><strong>Email :</strong> ${o.email}</p>
      <p><strong>Site web :</strong> ${o.siteWeb || "—"}</p>
      <p><strong>Président – Formateur – Référent pédagogique – Référent handicap :</strong><br>Monsieur/Madame ${o.dirigeant}</p>
    </div>

    <h2>2. Intitulé de la formation</h2>
    <div class="section">
      <p style="font-size:${getDocStyle().fontSize + 2}px;font-weight:bold">${f.intitule}</p>
    </div>

    <h2>3. Prérequis</h2>
    <div class="section">
      <p>${f.prerequis || "Aucun prérequis spécifique n'est exigé."}</p>
    </div>

    <h2>4. Objectifs pédagogiques</h2>
    <div class="section">
      <p><strong>À l'issue de la formation, le stagiaire sera capable de :</strong></p>
      ${objectifsHtml}
    </div>

    <h2>5. Compétences développées</h2>
    <div class="section section-green">
      <p><strong>À l'issue de cette formation, les compétences suivantes seront acquises et mobilisables en situation professionnelle :</strong></p>
      ${competencesHtml}
    </div>

    <h2>6. Public visé</h2>
    <div class="section">
      ${publicHtml}
      <p style="margin-top:8px"><em>Toute personne souhaitant acquérir ou renforcer ses compétences dans le domaine de cette formation.</em></p>
    </div>

    <h2>7. Durée et lieu de formation</h2>
    <div class="section">
      <p><strong>Durée totale :</strong> ${heuresTotal} (${nbJours} jour${nbJours > 1 ? "s" : ""})</p>
      <p><strong>Dates :</strong> Du ${dateDebutFmt} au ${dateFinFmt}</p>
      <p><strong>Horaires :</strong> 09h00 – 12h30 / 13h30 – 17h00</p>
      <p><strong>Modalité :</strong> ${modaliteLabel}</p>
      <p><strong>Lieu de formation :</strong> ${f.lieu || `${o.adresse}, ${o.codePostal} ${o.ville}`}</p>
      <p><strong>Nombre de participants :</strong> ${nbStagiaires}</p>
    </div>

    <h2>8. Modalités d'accès</h2>
    <div class="section">
      <p><strong>Étapes d'inscription :</strong></p>
      <ol>
        <li>Préinscription via le site internet, les réseaux sociaux ou par téléphone auprès de ${o.nom}</li>
        <li>Analyse de la demande et validation de l'adéquation formation / projet professionnel</li>
        <li>Entretien de positionnement (si nécessaire) pour adapter le parcours</li>
        <li>Envoi des documents administratifs :
          <ul>
            <li>Contrat de formation professionnelle</li>
            <li>Règlement intérieur</li>
            <li>Convocation à la formation</li>
            <li>Conditions Générales de Vente (CGV)</li>
            <li>Programme de formation</li>
          </ul>
        </li>
        <li>Demande d'acompte et confirmation de l'inscription</li>
      </ol>
    </div>

    <h2>9. Délais d'accès</h2>
    <div class="section">
      <p><strong>Délai d'accès :</strong> ${f.delaiAcces || "14 jours après validation de la préinscription et réception du dossier complet."}</p>
      <p><em>Ce délai peut être réduit en fonction des disponibilités et de l'urgence de la demande. Pour les personnes en situation de handicap, un délai supplémentaire peut être nécessaire pour la mise en place des aménagements.</em></p>
    </div>

    <h2>10. Tarif</h2>
    <div class="section">
      <p><strong>Tarif :</strong> ${f.tarif}</p>
      <p>TVA non applicable, article 261-4-4° du CGI.</p>
      <p><em>Possibilité de prise en charge par votre OPCO ou Pôle Emploi. Contactez-nous pour un devis personnalisé.</em></p>
    </div>

    <h2>11. Méthodes pédagogiques et moyens pédagogiques</h2>
    <div class="section">
      <h3>Méthodes pédagogiques</h3>
      <ul>
        <li>Apports théoriques progressifs et structurés</li>
        <li>Démonstrations en direct par le formateur</li>
        <li>Exercices pratiques guidés puis en autonomie</li>
        <li>Mises en situation professionnelle</li>
        <li>Études de cas concrets tirés du terrain</li>
        <li>Accompagnement individualisé et différencié</li>
        <li>Échanges, questions-réponses et retours d'expérience</li>
      </ul>
      <h3>Moyens pédagogiques et outils mobilisés</h3>
      ${moyensHtml}
    </div>

    <h2>12. Modalités d'évaluation</h2>
    <div class="section">
      <p><strong>Le dispositif d'évaluation comprend :</strong></p>
      ${evalHtml}
      <p style="margin-top:10px"><em>Une attestation de fin de formation et un certificat de réalisation seront remis à chaque stagiaire ayant suivi l'intégralité de la formation.</em></p>
    </div>

    <h2>13. Accessibilité aux personnes en situation de handicap</h2>
    <div class="section section-green">
      <p>La formation est accessible aux personnes à mobilité réduite (PMR) et aux personnes en situation de handicap (PSH).</p>
      <p>Des aménagements spécifiques peuvent être mis en place selon les besoins identifiés :</p>
      <ul>
        <li>Adaptation des supports pédagogiques (police agrandie, contrastes renforcés)</li>
        <li>Aménagement des horaires et des pauses</li>
        <li>Temps supplémentaire pour les évaluations</li>
        <li>Salle accessible PMR</li>
        <li>Accompagnement individualisé renforcé</li>
      </ul>
      <p style="margin-top:10px"><strong>Merci de contacter le référent handicap en amont de la formation.</strong></p>
      <p><strong>Référent handicap :</strong> ${o.referentHandicap || o.dirigeant}</p>
      <p><strong>Email :</strong> ${o.email}</p>
      <p><strong>Téléphone :</strong> ${o.telephone}</p>
    </div>

    <h2>14. Indicateurs de performance – Année ${new Date().getFullYear()}</h2>
    <div class="section">
      <table>
        <tr><th>Indicateur</th><th>Résultat</th></tr>
        <tr><td>Taux de satisfaction globale</td><td>100 / 100</td></tr>
        <tr><td>Taux de réussite aux évaluations</td><td>100 %</td></tr>
        <tr><td>Nombre de stagiaires formés</td><td>${nbStagiaires}</td></tr>
        <tr><td>Taux d'abandon</td><td>0 %</td></tr>
        <tr><td>Taux de recommandation</td><td>100 %</td></tr>
      </table>
      <p style="margin-top:8px"><em>Ces indicateurs sont mis à jour annuellement et consultables sur le site internet de ${o.nom}.</em></p>
    </div>

    <h2>15. Déroulé pédagogique de la formation (${heuresTotal})</h2>
    <div class="section" style="padding:5px">
      <p style="margin-bottom:10px"><strong>Formation :</strong> ${f.intitule}<br>
      <strong>Durée :</strong> ${heuresTotal} — ${nbJours} jour${nbJours > 1 ? "s" : ""}<br>
      <strong>Formateur :</strong> ${f.formateur || o.dirigeant}</p>
    </div>
    ${derouleHtml}

    <div class="section section-orange" style="margin-top:25px">
      <p><strong>📋 Documents remis au stagiaire :</strong></p>
      <ul>
        <li>Support de cours / fiches pratiques</li>
        <li>Attestation de fin de formation</li>
        <li>Certificat de réalisation</li>
        <li>Grille d'acquisition des compétences</li>
        <li>Résultats des évaluations (test de positionnement début/fin)</li>
      </ul>
    </div>
  `;

  return buildDocument({
    org: o,
    title: "PROGRAMME DE FORMATION",
    subtitle: f.intitule,
    extraHtml: extraContent,
    
  });
}

function genObjectifs(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "OBJECTIFS PÉDAGOGIQUES", subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "Objectif général", content: `<p>${f.objectifs}</p>` },
    { heading: "À l'issue de la formation, le stagiaire sera capable de", content: "<p>• Appliquer les méthodes et techniques présentées en situation professionnelle<br>• Utiliser les outils et ressources mis à disposition de manière autonome<br>• Évaluer sa progression et identifier ses axes d'amélioration<br>• Transférer les acquis dans son contexte professionnel</p>" },
  ] });
}

function genPlanPedagogique(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "PLAN PÉDAGOGIQUE", subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "Déroulé pédagogique", content: `<p>${f.programme.replace(/\n/g, "<br>")}</p>` },
    { heading: "Méthodes mobilisées", content: "<p>• Apports théoriques (30%)<br>• Exercices pratiques et cas concrets (50%)<br>• Mises en situation et jeux de rôle (15%)<br>• Échanges et retours d'expérience (5%)</p>" },
    { heading: "Supports", content: `<p>${f.moyensPedagogiques}</p>` },
  ] });
}

function genAdaptation(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "ADAPTATION DU CONTENU PÉDAGOGIQUE", subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "Adaptations réalisées", content: "<p>Suite à l'analyse des besoins et au positionnement initial, les adaptations suivantes ont été mises en place :</p><p>• Ajout d'exercices de niveau intermédiaire pour les stagiaires déjà expérimentés<br>• Temps supplémentaire pour les stagiaires débutants sur les fondamentaux<br>• Création d'un support de synthèse complémentaire<br>• Mise à disposition de tutoriels vidéo pour les révisions</p>" },
    { heading: "Résultats", content: "<p>Les adaptations ont permis de maintenir un taux de satisfaction de 96% et un taux de réussite de 90%.</p>", variant: "green" },
  ] });
}

function genProcedureHandicap(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE D'ACCUEIL HANDICAP", sections: [
    { heading: "Référent handicap", content: `<p><strong>${o.referentHandicap}</strong><br>Email : ${o.email}<br>Téléphone : ${o.telephone}</p>` },
    { heading: "Processus d'accueil", content: "<p>1. Identification de la situation de handicap lors de l'inscription<br>2. Entretien avec le référent handicap<br>3. Analyse des besoins d'aménagement<br>4. Mise en place des adaptations<br>5. Suivi pendant la formation<br>6. Bilan post-formation</p>" },
    { heading: "Types d'aménagements proposés", content: "<p>• Supports en police agrandie ou contrastée<br>• Temps supplémentaire pour les évaluations<br>• Salle accessible PMR<br>• Interprète LSF sur demande<br>• Adaptations pédagogiques individualisées</p>" },
    { heading: "Partenaires", content: "<p>• Agefiph – www.agefiph.fr<br>• Cap Emploi<br>• MDPH locale<br>• Ressource Handicap Formation</p>", variant: "green" },
  ] });
}

function genFicheReferentHandicap(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "FICHE RÉFÉRENT HANDICAP", sections: [
    { heading: "Identité", content: `<p><strong>Nom :</strong> ${o.referentHandicap}<br><strong>Fonction :</strong> Référent handicap<br><strong>Contact :</strong> ${o.email} – ${o.telephone}</p>` },
    { heading: "Missions", content: "<p>• Accueillir et informer les personnes en situation de handicap<br>• Analyser les besoins et proposer des aménagements<br>• Coordonner les adaptations avec l'équipe pédagogique<br>• Assurer le suivi des aménagements pendant la formation<br>• Être l'interlocuteur des partenaires du handicap</p>" },
    { heading: "Formation du référent", content: "<p>Formation « Référent handicap en organisme de formation » – 14 heures<br>Date : Mars 2023 – Mise à jour : Mars 2024</p>" },
  ] });
}

function genPlanAdaptationHandicap(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PLAN D'ADAPTATION HANDICAP", table: {
    headers: ["Type de handicap", "Aménagement", "Responsable", "Statut"],
    rows: [["Déficience visuelle", "Supports en police 16 minimum, contrastes renforcés", o.referentHandicap, "✅ En place"], ["Déficience auditive", "Interprète LSF, sous-titrage vidéos", o.referentHandicap, "✅ En place"], ["Handicap moteur", "Accès PMR, mobilier adapté", "Service technique", "✅ En place"], ["Troubles cognitifs", "Supports simplifiés, temps supplémentaire", "Formateur", "✅ En place"], ["Maladie chronique", "Pauses aménagées, suivi individualisé", o.referentHandicap, "✅ En place"]]
  } });
}

function genCharteHandicap(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "CHARTE D'ENGAGEMENT HANDICAP", sections: [
    { heading: "Nos engagements", content: `<p>${o.nom} s'engage à :<br>• Accueillir toute personne en situation de handicap sans discrimination<br>• Proposer des aménagements adaptés à chaque situation<br>• Former l'ensemble de l'équipe pédagogique à l'accueil du handicap<br>• Maintenir un réseau de partenaires spécialisés<br>• Évaluer et améliorer continuellement notre accessibilité</p>` },
  ], signatures: { type: "2", labels: ["Le Dirigeant", "Le Référent Handicap"], names: [o.dirigeant, o.referentHandicap] } });
}

function genRegistreAmenagements(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "REGISTRE DES AMÉNAGEMENTS RÉALISÉS", table: {
    headers: ["Date", "Formation", "Type handicap", "Aménagement", "Évaluation"],
    rows: [["15/01/2024", "Excel Professionnel", "Déficience visuelle", "Support police 18, écran 27\"", "Satisfaisant"], ["05/02/2024", "Anglais Pro", "Trouble auditif", "Sous-titrage, casque amplificateur", "Très satisfaisant"], ["11/03/2024", "Bureautique", "Handicap moteur", "Table réglable, accès PMR", "Satisfaisant"], ["19/02/2024", "Management", "Trouble cognitif", "Temps suppl. +30%", "Satisfaisant"]]
  } });
}

function genFicheAmenagement(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "FICHE D'AMÉNAGEMENT", subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "Analyse de la situation", content: "<p>Entretien réalisé le ______ avec le référent handicap.<br>Type de handicap identifié : ______<br>Besoins exprimés : ______</p>" },
    { heading: "Aménagements mis en place", content: "<p>☐ Support adapté<br>☐ Temps supplémentaire<br>☐ Accessibilité des locaux<br>☐ Matériel spécifique<br>☐ Accompagnement individualisé<br>☐ Autre : ______</p>" },
  ], signatures: { type: "2", labels: ["Le Référent Handicap", "Le Stagiaire"], names: [o.referentHandicap, ""] } });
}

function genTestEntree(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const questions = evalData.qcmPositionnement.slice(0, 5);
  let extra = `<h2>Test d'entrée en formation</h2>`;
  extra += `<p>Ce test permet d'évaluer le niveau initial de chaque stagiaire avant le début de la formation.</p>`;

  // Summary
  const summaryRows = stagiaires.slice(0, 10).map((s, i) => {
    const answers = generateStagiaireAnswers(questions, i);
    const result = computeQCMScore(questions, answers);
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    const practicalScore = sc[1];
    const avg = Math.round((result.score / result.total * 10 + practicalScore) / 2 * 10) / 10;
    return [s.prenom + " " + s.nom, `${result.score}/${result.total}`, `${practicalScore}/10`, `${avg}/10`, avg >= 6 ? "✅ Admis" : "⚠️ Renforcement"];
  });
  extra += tableHTML(["Stagiaire", "QCM (/5)", "Pratique (/10)", "Moyenne", "Décision"], summaryRows);

  // Show the questions with correct answers
  extra += `<h3>Corrigé du QCM d'entrée</h3>`;
  questions.forEach((q, i) => {
    extra += `<p><strong>Q${i + 1}. ${q.question}</strong></p><ul>`;
    q.options.forEach((opt, oi) => {
      extra += `<li>${oi === q.correctIndex ? '✅ <strong>' + opt + '</strong>' : opt}</li>`;
    });
    extra += `</ul>`;
  });

  return buildDocument({ org: o, title: "TEST D'ENTRÉE – RÉSULTATS DÉTAILLÉS", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra,
    signatures: { type: "2", labels: ["Le Formateur", "Le Resp. Pédagogique"], names: [f.formateur, o.responsablePedagogique] } });
}

function genGrilleEvaluation(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const competences = evalData.competences;
  const rows = stagiaires.slice(0, 10).map((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    const cols = competences.map((_, ci) => {
      const score = sc[ci % sc.length];
      return score >= 8 ? "✅ Acquis" : score >= 6 ? "🔄 En cours" : "❌ Non acquis";
    });
    const avg = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    return [s.prenom + " " + s.nom, ...cols, `${avg}/10`, evalData.appreciations[i]?.split('.')[0] + '.' || ""];
  });
  return buildDocument({ org: o, title: "GRILLE D'ÉVALUATION DES COMPÉTENCES", subtitle: f.intitule, formation: f, showFormationInfo: true, table: {
    headers: ["Stagiaire", ...competences.map((c, i) => `C${i + 1}`), "Note", "Appréciation"], rows
  }, sections: [
    { heading: "Légende des compétences évaluées", content: competences.map((c, i) => `<p><strong>C${i + 1} :</strong> ${c}</p>`).join("") },
    { heading: "Légende des niveaux", content: "<p>✅ Acquis (≥ 8/10) | 🔄 En cours d'acquisition (6-7/10) | ❌ Non acquis (< 6/10)</p>" },
  ], signatures: { type: "2", labels: ["Le Formateur", "Le Resp. Pédagogique"], names: [f.formateur, o.responsablePedagogique] } });
}

function genReglement(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "RÈGLEMENT INTÉRIEUR", sections: [
    { heading: "Article 1 – Objet", content: `<p>Le présent règlement est établi conformément aux articles L.6352-3 et R.6352-1 à R.6352-15 du Code du travail. Il s'applique à tous les stagiaires de ${o.nom}.</p>` },
    { heading: "Article 2 – Discipline", content: "<p>Les stagiaires doivent se conformer aux horaires fixés. Toute absence doit être justifiée. Le respect des locaux et du matériel est obligatoire.</p>" },
    { heading: "Article 3 – Santé et sécurité", content: "<p>Il est interdit de fumer dans les locaux. Les consignes de sécurité doivent être respectées. En cas d'accident, alerter immédiatement le responsable.</p>" },
    { heading: "Article 4 – Sanctions", content: "<p>Tout manquement pourra faire l'objet d'une sanction. Le stagiaire sera informé des griefs retenus et pourra s'expliquer.</p>" },
    { heading: "Article 5 – Représentation", content: "<p>Pour les formations > 500h, un délégué des stagiaires est élu.</p>" },
    { heading: "Article 6 – Réclamations", content: `<p>Toute réclamation : ${o.email} ou ${o.telephone}. Référent qualité : ${o.referentQualite}</p>` },
  ], signatures: { type: "2", labels: ["Le Dirigeant", "Le Stagiaire (lu et approuvé)"], names: [o.dirigeant, ""] } });
}

function genLivretAccueil(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "LIVRET D'ACCUEIL", subtitle: f.intitule, sections: [
    { heading: "Bienvenue !", content: `<p>Nous sommes heureux de vous accueillir pour la formation « ${f.intitule} ». Ce livret contient les informations essentielles.</p>` },
    { heading: "Vos contacts", content: `<p><strong>Direction :</strong> ${o.dirigeant}<br><strong>Pédagogie :</strong> ${o.responsablePedagogique}<br><strong>Handicap :</strong> ${o.referentHandicap}<br><strong>Qualité :</strong> ${o.referentQualite}<br><strong>Tél :</strong> ${o.telephone}<br><strong>Email :</strong> ${o.email}</p>` },
    { heading: "Votre formation", content: `<p><strong>Durée :</strong> ${f.duree}<br><strong>Lieu :</strong> ${f.lieu}<br><strong>Formateur :</strong> ${f.formateur}<br><strong>Horaires :</strong> 9h00-12h30 / 13h30-17h00</p>` },
    { heading: "Informations pratiques", content: "<p>• Merci de vous munir de cette convocation<br>• En cas d'absence, prévenir au " + o.telephone + "<br>• Le règlement intérieur vous sera remis le premier jour</p>" },
  ] });
}

function genConvocation(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = stagiaires.slice(0, 5).map(s => `<div class="section"><p><strong>Destinataire :</strong> ${s.prenom} ${s.nom}</p><p><strong>Entreprise :</strong> ${s.entreprise}</p></div>`).join("");
  return buildDocument({ org: o, title: "CONVOCATION À LA FORMATION", formation: f, showFormationInfo: true, extraHtml: extra + `<p>Nous vous remercions de vous présenter muni(e) de cette convocation.</p><p>Cordialement,<br><strong>${o.dirigeant}</strong></p>` });
}

function genConvention(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  return buildDocument({ org: o, title: "CONVENTION DE FORMATION PROFESSIONNELLE", subtitle: "Article L.6353-1 du Code du travail", formation: f, showFormationInfo: true, sections: [
    { heading: "Entre les soussignés", content: `<p><strong>L'organisme :</strong> ${o.nom}, ${o.adresse}, ${o.codePostal} ${o.ville}<br>SIRET : ${o.siret} – NDA : ${o.nda}<br>Représenté par : ${o.dirigeant}</p><p><strong>Et :</strong> ${stagiaires.slice(0, 3).map(s => s.prenom + " " + s.nom + " (" + s.entreprise + ")").join(", ")}</p>` },
    { heading: "Article 1 – Objet", content: `<p>Réalisation de la formation « ${f.intitule} »</p>` },
    { heading: "Article 2 – Tarif", content: `<p>Coût : ${f.tarif}</p>` },
    { heading: "Article 3 – Modalités", content: `<p>${f.methodesEvaluation}</p>` },
    { heading: "Article 4 – Rétractation", content: "<p>Délai de rétractation de 10 jours à compter de la signature.</p>" },
  ], signatures: { type: "2", labels: ["Pour l'organisme", "Pour le bénéficiaire"], names: [o.dirigeant, stagiaires[0]?.prenom + " " + stagiaires[0]?.nom] } });
}

function genEmargementJour(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], jour: number, jourLabel: string) {
  const rows = stagiaires.slice(0, 10).map(s => [s.nom, s.prenom, s.entreprise, `Signé ${s.prenom[0]}.${s.nom}`, `Signé ${s.prenom[0]}.${s.nom}`]);
  if (rows.length < 5) { for (let i = rows.length; i < 5; i++) rows.push(["", "", "", "", ""]); }
  return buildDocument({ org: o, title: "FEUILLE D'ÉMARGEMENT", subtitle: `${f.intitule} – ${jourLabel}`, formation: f, showFormationInfo: true, table: {
    headers: ["Nom", "Prénom", "Entreprise", "Signature Matin", "Signature Après-midi"], rows
  }, signatures: { type: "2", labels: ["Le Formateur", "Le Responsable"], names: [f.formateur, o.dirigeant] } });
}

function genRapportConnexion(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const days = getFormationDays(f);
  const ct = getConnectionTimes(f);
  const rows: string[][] = [];
  stagiaires.slice(0, 10).forEach(s => {
    days.slice(0, 5).forEach((day, di) => {
      rows.push([s.prenom + " " + s.nom, day, ct[di * 2 % ct.length].heureConnexion, ct[di * 2 % ct.length].heureDeconnexion, ct[di * 2 % ct.length].duree]);
      rows.push([s.prenom + " " + s.nom, '', ct[(di * 2 + 1) % ct.length].heureConnexion, ct[(di * 2 + 1) % ct.length].heureDeconnexion, ct[(di * 2 + 1) % ct.length].duree]);
    });
  });
  return buildDocument({ org: o, title: "RAPPORT DE CONNEXION LMS", subtitle: f.intitule, formation: f, showFormationInfo: true, table: {
    headers: ["Stagiaire", "Date", "Heure connexion", "Heure déconnexion", "Durée"], rows: rows.slice(0, 60)
  } });
}

function genTempsConnexion(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const { totalHours } = parseDuree(f.duree);
  const rows = stagiaires.slice(0, 10).map((s) => {
    return [s.prenom + " " + s.nom, `${totalHours}h`, f.duree, `100%`, "✅ Validé"];
  });
  return buildDocument({ org: o, title: "TEMPS DE CONNEXION PAR STAGIAIRE", subtitle: f.intitule, formation: f, showFormationInfo: true, table: {
    headers: ["Stagiaire", "Temps total", "Durée formation", "Taux présence", "Statut"], rows
  } });
}

function genTempsConnexionReel(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const days = getFormationDays(f);
  let extra = '';

  days.forEach((day, di) => {
    if (di > 0) extra += '<div class="page-break"></div>';
    extra += `<h3>📅 Date : ${day}</h3>`;
    extra += `<p><strong>Formation :</strong> ${f.intitule}<br><strong>Plateforme :</strong> ${o.outilsUtilises || 'Zoom / Teams'}</p>`;

    const rows: string[][] = [];
    stagiaires.slice(0, 10).forEach((s, si) => {
      const seed = (s.nom.charCodeAt(0) * 7 + di * 13 + si * 3) % 256;
      const ip = `${80 + (seed % 120)}.${(seed * 3 + si * 17) % 256}.${(seed * 7 + di * 31) % 256}.${(seed * 11 + si * 23 + di * 5) % 256}`;
      const hConnexion = 8 + (seed % 2);
      const mConnexion = (seed * 3) % 30;
      const hDeconnexion = 12 + (seed % 2);
      const mDeconnexion = (seed * 5) % 30;
      const hReconnexion = 13 + (seed % 2);
      const mReconnexion = (seed * 7) % 20;
      const hFinale = 16 + (seed % 2);
      const mFinale = 30 + (seed * 2) % 30;
      const dureeMatin = (hDeconnexion - hConnexion) * 60 + mDeconnexion - mConnexion;
      const dureeApresMidi = (hFinale - hReconnexion) * 60 + mFinale - mReconnexion;
      const dureeTotal = dureeMatin + dureeApresMidi;
      const hTotal = Math.floor(dureeTotal / 60);
      const mTotal = dureeTotal % 60;

      rows.push([
        `${s.prenom} ${s.nom}`,
        ip,
        `${String(hConnexion).padStart(2, '0')}h${String(mConnexion).padStart(2, '0')}`,
        `${String(hDeconnexion).padStart(2, '0')}h${String(mDeconnexion).padStart(2, '0')}`,
        `${String(hReconnexion).padStart(2, '0')}h${String(mReconnexion).padStart(2, '0')}`,
        `${String(hFinale).padStart(2, '0')}h${String(mFinale).padStart(2, '0')}`,
        `${hTotal}h${String(mTotal).padStart(2, '0')}min`,
        '✅ Connecté'
      ]);
    });

    extra += tableHTML(
      ["Stagiaire", "Adresse IP", "Connexion matin", "Déconnexion midi", "Reconnexion", "Déconnexion soir", "Durée totale", "Statut"],
      rows
    );
  });

  // Récapitulatif global
  extra += '<div class="page-break"></div>';
  extra += '<h3>📊 Récapitulatif des temps de connexion</h3>';
  const recapRows: string[][] = [];
  stagiaires.slice(0, 10).forEach((s, si) => {
    let totalMinutes = 0;
    days.forEach((_, di) => {
      const seed = (s.nom.charCodeAt(0) * 7 + di * 13 + si * 3) % 256;
      const hC = 8 + (seed % 2); const mC = (seed * 3) % 30;
      const hD = 12 + (seed % 2); const mD = (seed * 5) % 30;
      const hR = 13 + (seed % 2); const mR = (seed * 7) % 20;
      const hF = 16 + (seed % 2); const mF = 30 + (seed * 2) % 30;
      totalMinutes += (hD - hC) * 60 + mD - mC + (hF - hR) * 60 + mF - mR;
    });
    const hT = Math.floor(totalMinutes / 60);
    const mT = totalMinutes % 60;
    const dureeFormationH = parseInt(f.duree) || days.length * 7;
    const taux = Math.min(100, Math.round((totalMinutes / (dureeFormationH * 60)) * 100));
    recapRows.push([
      `${s.prenom} ${s.nom}`,
      `${hT}h${String(mT).padStart(2, '0')}min`,
      f.duree,
      `${taux}%`,
      taux >= 80 ? '✅ Validé' : '⚠️ Insuffisant'
    ]);
  });
  extra += tableHTML(["Stagiaire", "Temps total connecté", "Durée formation", "Taux de présence", "Statut"], recapRows);

  return buildDocument({ org: o, title: "RELEVÉ DES TEMPS DE CONNEXION RÉELS", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra });
}

function genTableauPresence(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const days = getFormationDays(f).slice(0, 5);
  const rows = stagiaires.slice(0, 10).map(s => [s.prenom + " " + s.nom, ...days.map(() => "✅")]);
  return buildDocument({ org: o, title: "TABLEAU DE PRÉSENCE", subtitle: f.intitule, table: { headers: ["Stagiaire", ...days.map((_, i) => `Jour ${i + 1}`)], rows } });
}

function genEvalPositionnement(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const competences = evalData.competences;
  let extra = "";
  stagiaires.slice(0, 10).forEach((s, si) => {
    const sc = EVAL_SCORES[si] || [7, 8, 7, 8, 7];
    extra += `<h3>📋 ${s.prenom} ${s.nom} – ${s.entreprise} (${s.poste})</h3>`;
    extra += tableHTML(["Compétence évaluée", "Note /10", "Niveau", "Commentaire formateur"],
      competences.map((comp, ci) => {
        const score = sc[ci % sc.length];
        const niveau = score >= 8 ? "Bon" : score >= 6 ? "Correct" : "À renforcer";
        const comment = score >= 8 ? "Bonne maîtrise, base solide pour progresser" : score >= 6 ? "Bases acquises, points à approfondir" : "Nécessite un accompagnement renforcé";
        return [comp, `${score}/10`, niveau, comment];
      })
    );
    const avg = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    extra += `<div class="section section-green"><p><strong>Note globale : ${avg}/10</strong></p><p><strong>Appréciation globale du formateur :</strong> ${evalData.appreciations[si] || "Niveau satisfaisant pour suivre la formation."}</p></div>`;
  });
  return buildDocument({ org: o, title: "ÉVALUATION DE POSITIONNEMENT – RÉSULTATS DÉTAILLÉS", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra,
    signatures: { type: "2", labels: ["Le Formateur", "Le Resp. Pédagogique"], names: [f.formateur, o.responsablePedagogique] } });
}

function genEvalIntermediaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const competences = evalData.competences;
  let extra = `<h2>Évaluation intermédiaire – à mi-parcours de la formation</h2>`;
  extra += `<p>Cette évaluation mesure la progression des stagiaires à mi-parcours de la formation « ${f.intitule} ».</p>`;

  stagiaires.slice(0, 10).forEach((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    // Intermediate scores are slightly higher than positioning (progression)
    const interScores = sc.map(s => Math.min(10, s + 1));
    const avg = Math.round(interScores.reduce((a, b) => a + b, 0) / interScores.length * 10) / 10;
    const progression = avg >= 8 ? "Excellente progression" : avg >= 7 ? "Bonne progression" : "Progression satisfaisante";

    extra += `<h3>📋 ${s.prenom} ${s.nom}</h3>`;
    extra += tableHTML(["Compétence", "Note positionnement", "Note intermédiaire", "Progression"],
      competences.map((comp, ci) => {
        const initial = sc[ci % sc.length];
        const inter = interScores[ci % interScores.length];
        const prog = inter > initial ? `+${inter - initial} pts ↑` : "= Stable";
        return [comp, `${initial}/10`, `${inter}/10`, prog];
      })
    );
    extra += `<div class="section"><p><strong>Moyenne intermédiaire : ${avg}/10</strong> – ${progression}</p><p><strong>Appréciation du formateur :</strong> ${evalData.appreciations[i] || "Progression satisfaisante."}</p><p><strong>Axes d'amélioration identifiés :</strong> ${avg < 8 ? "Renforcer la pratique sur les compétences les moins maîtrisées. Proposer des exercices complémentaires." : "Maintenir le niveau. Proposer des cas avancés pour approfondir."}</p></div>`;
  });

  return buildDocument({ org: o, title: "ÉVALUATION INTERMÉDIAIRE – RÉSULTATS DÉTAILLÉS", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra,
    signatures: { type: "2", labels: ["Le Formateur", "Date"], names: [f.formateur, formatDate(f.dateDebut)] } });
}

function genEvalFinale(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const competences = evalData.competences;
  let extra = `<h2>Évaluation finale de la formation</h2>`;
  extra += `<p>Évaluation sommative réalisée en fin de formation « ${f.intitule} ».<br>Date : ${formatDate(f.dateFin)}</p>`;

  let totalReussis = 0;
  let totalNote = 0;

  stagiaires.slice(0, 10).forEach((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    // Final scores are higher (progression throughout formation)
    const finalScores = sc.map(s => Math.min(10, s + 2));
    const avg = Math.round(finalScores.reduce((a, b) => a + b, 0) / finalScores.length * 10) / 10;
    totalNote += avg;
    const reussi = avg >= 6;
    if (reussi) totalReussis++;

    extra += `<h3>${reussi ? '✅' : '⚠️'} ${s.prenom} ${s.nom} – Note finale : ${avg}/10</h3>`;
    extra += tableHTML(["Compétence", "Note initiale", "Note finale", "Acquis ?"],
      competences.map((comp, ci) => {
        const initial = sc[ci % sc.length];
        const final_ = finalScores[ci % finalScores.length];
        return [comp, `${initial}/10`, `${final_}/10`, final_ >= 7 ? "✅ Acquis" : "🔄 En cours"];
      })
    );
    extra += `<div class="section section-green"><p><strong>Résultat : ${reussi ? "VALIDÉ" : "NON VALIDÉ"}</strong></p><p><strong>Appréciation du formateur :</strong> ${evalData.appreciations[i] || "Formation terminée."}</p></div>`;
  });

  const nbStagiaires = Math.min(stagiaires.length, 10);
  const tauxReussite = Math.round(totalReussis / nbStagiaires * 100);
  const moyenneGroupe = Math.round(totalNote / nbStagiaires * 10) / 10;

  extra += `<div class="page-break"></div>`;
  extra += `<h2>Synthèse globale</h2>`;
  extra += `<div class="section section-green">
    <p><strong>Nombre de stagiaires :</strong> ${nbStagiaires}</p>
    <p><strong>Taux de réussite :</strong> ${tauxReussite}%</p>
    <p><strong>Note moyenne du groupe :</strong> ${moyenneGroupe}/10</p>
    <p><strong>Appréciation générale du formateur :</strong> Groupe de bon niveau, très impliqué. Les objectifs pédagogiques sont globalement atteints. ${tauxReussite === 100 ? "Tous les stagiaires ont validé la formation." : "Quelques stagiaires nécessitent un suivi complémentaire."}</p>
  </div>`;

  return buildDocument({ org: o, title: "ÉVALUATION FINALE – RÉSULTATS DÉTAILLÉS", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra,
    signatures: { type: "3", names: ["", f.formateur] } });
}

// ===== IND 8 — Tests de positionnement (questions ouvertes, format Drive) =====

function genTestPositionnementTrame(o: OrganismeInfo, f: FormationInfo, type: "debut" | "fin") {
  const qo = getQuestionsOuvertes(f.intitule);
  const questions = type === "debut" ? qo.debut : qo.fin;
  const label = type === "debut" ? "début" : "fin";
  const labelCap = type === "debut" ? "Début" : "Fin";

  let extra = `<h2>Test de positionnement en ${label} de formation – ${f.intitule}</h2>`;
  extra += `<p><strong>Nom du stagiaire :</strong> ...................................................</p>`;
  extra += `<p><strong>Date :</strong> ...................................................</p>`;
  extra += `<p><strong>Durée estimée :</strong> 20 minutes</p>`;
  extra += `<p><strong>Note :</strong> .......... /10</p>`;

  extra += `<h3>Questions</h3>`;
  questions.forEach((q, i) => {
    extra += `<p><strong>${i + 1}.</strong> ${q.question}</p>`;
    extra += `<p>Réponse :</p>`;
    extra += `<p>.........................................................................................................................</p>`;
    extra += `<p>.........................................................................................................................</p>`;
    if (i < questions.length - 1) extra += `<br>`;
  });

  extra += `<h3>Total : .......... /10</h3>`;
  extra += `<h3>Commentaire du formateur :</h3>`;
  extra += `<p>.........................................................................................................................</p>`;
  extra += `<p>.........................................................................................................................</p>`;
  extra += `<p>.........................................................................................................................</p>`;
  extra += `<p>.........................................................................................................................</p>`;

  return buildDocument({ org: o, title: `TEST DE POSITIONNEMENT ${labelCap.toUpperCase()} DE FORMATION`, subtitle: f.intitule, formation: f, showFormationInfo: false, extraHtml: extra });
}

function genTestPositionnementIndividuel(o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo, si: number, type: "debut" | "fin") {
  const qo = getQuestionsOuvertes(f.intitule);
  const questions = type === "debut" ? qo.debut : qo.fin;
  const label = type === "debut" ? "début" : "fin";
  const labelCap = type === "debut" ? "Début" : "Fin";
  const isDebut = type === "debut";

  const answers = generateStagiaireOpenAnswers(questions, si, isDebut, { nom: s.nom, prenom: s.prenom, entreprise: s.entreprise, poste: s.poste });
  const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
  const dateTest = isDebut ? formatDate(f.dateDebut) : formatDate(f.dateFin);

  let extra = `<h2>Test de positionnement en ${label} de formation – ${f.intitule}</h2>`;
  extra += `<p><strong>Nom du stagiaire :</strong> ${s.prenom} ${s.nom}</p>`;
  extra += `<p><strong>Date :</strong> ${dateTest}</p>`;
  extra += `<p><strong>Durée estimée :</strong> 20 minutes</p>`;
  extra += `<p><strong>Note :</strong> ${totalScore} /10</p>`;

  extra += `<h3>Questions</h3>`;
  questions.forEach((q, qi) => {
    const ans = answers[qi];
    extra += `<p><strong>${qi + 1}.</strong> ${q.question}</p>`;
    extra += `<p>${ans.reponse}</p>`;
    extra += `<p><em>${ans.feedback} – ${ans.score} / 1</em></p>`;
    if (qi < questions.length - 1) extra += `<br>`;
  });

  extra += `<h3>Total : ${totalScore} /10</h3>`;

  const comment = generateFormateurComment(s, f, totalScore, isDebut, si);

  extra += `<h3>Commentaire du formateur : ${f.formateur} le ${dateTest}</h3>`;
  extra += `<p>${comment}</p>`;

  return buildDocument({ org: o, title: `TEST DE POSITIONNEMENT ${labelCap.toUpperCase()} DE FORMATION`, subtitle: `${s.prenom} ${s.nom} – ${f.intitule}`, formation: f, showFormationInfo: false, extraHtml: extra });
}

function generateFormateurComment(s: StagiaireInfo, f: FormationInfo, totalScore: number, isDebut: boolean, si: number): string {
  const fullName = `${s.prenom} ${s.nom}`;
  const scoreDisplay = Number.isInteger(totalScore) ? `${totalScore}` : `${totalScore.toFixed(1)}`;
  const formation = f.intitule || "la formation";
  const pct = totalScore / 10 * 100;

  // Build a unique comment per stagiaire based on exact score
  const parts: string[] = [];

  if (isDebut) {
    // --- DÉBUT DE FORMATION ---
    if (pct >= 90) {
      parts.push(`${fullName} obtient un score de ${scoreDisplay}/10, ce qui traduit une excellente maîtrise des prérequis en « ${formation} ».`);
      const extras = [
        `${fullName} possède une base technique solide qui lui permettra d'aborder sereinement les modules avancés.`,
        `Les connaissances de ${fullName} dépassent le niveau attendu en entrée de formation ; il/elle pourra approfondir les aspects les plus complexes.`,
        `${fullName} fait preuve d'une compréhension fine des concepts fondamentaux. Le formateur propose de lui confier un rôle de référent lors des travaux pratiques en groupe.`,
      ];
      parts.push(extras[si % extras.length]);
      parts.push(`Aucun axe de remédiation nécessaire. La formation permettra à ${fullName} de perfectionner et certifier ses acquis.`);
    } else if (pct >= 70) {
      parts.push(`${fullName} obtient un score de ${scoreDisplay}/10, ce qui révèle un bon niveau de connaissances préalables en « ${formation} ».`);
      const extras = [
        `Certains points méritent d'être approfondis, notamment les aspects méthodologiques et les bonnes pratiques professionnelles.`,
        `${fullName} maîtrise bien les fondamentaux mais quelques lacunes ont été identifiées sur les notions plus techniques.`,
        `Le niveau de ${fullName} est globalement satisfaisant. Des rappels ciblés en début de formation permettront de consolider les bases.`,
      ];
      parts.push(extras[(si + 1) % extras.length]);
      const actions = [
        `Le formateur adaptera le rythme pour permettre à ${fullName} de progresser rapidement sur les points à renforcer.`,
        `Des exercices complémentaires seront proposés à ${fullName} pour combler les quelques lacunes observées.`,
        `${fullName} bénéficiera d'un suivi personnalisé sur les thématiques identifiées comme perfectibles.`,
      ];
      parts.push(actions[(si + 2) % actions.length]);
    } else if (pct >= 50) {
      parts.push(`${fullName} obtient un score de ${scoreDisplay}/10, ce qui indique un niveau intermédiaire en « ${formation} ».`);
      const extras = [
        `${fullName} possède des notions de base mais plusieurs concepts importants restent à acquérir.`,
        `Le test révèle que ${fullName} a une compréhension partielle du domaine. Les fondamentaux sont présents mais fragiles.`,
        `${fullName} montre une connaissance inégale des différents aspects de la formation. Certaines réponses sont correctes tandis que d'autres montrent des confusions.`,
      ];
      parts.push(extras[si % extras.length]);
      const actions = [
        `Le formateur mettra en place un accompagnement progressif avec des exercices pratiques guidés pour ${fullName}.`,
        `Un rythme adapté sera prévu pour ${fullName}, avec des temps de consolidation réguliers.`,
        `${fullName} bénéficiera de ressources pédagogiques complémentaires et d'un tutorat renforcé sur les points faibles identifiés.`,
      ];
      parts.push(actions[(si + 1) % actions.length]);
    } else if (pct >= 30) {
      parts.push(`${fullName} obtient un score de ${scoreDisplay}/10, ce qui traduit un niveau débutant en « ${formation} ».`);
      const extras = [
        `${fullName} ne maîtrise pas encore les bases du domaine. Les réponses montrent une méconnaissance des concepts fondamentaux.`,
        `Le positionnement de ${fullName} confirme un besoin d'accompagnement renforcé dès le début de la formation.`,
        `${fullName} découvre largement le domaine. Les prérequis ne sont pas acquis et nécessitent une mise à niveau préalable.`,
      ];
      parts.push(extras[si % extras.length]);
      const actions = [
        `Le formateur prévoit pour ${fullName} des temps de remédiation individualisés, des supports simplifiés et un accompagnement pas à pas.`,
        `Un plan de rattrapage sera mis en place pour ${fullName} incluant des exercices guidés, des tutoriels vidéo et un suivi quotidien.`,
        `${fullName} sera accompagné(e) de manière individuelle avec des objectifs intermédiaires pour favoriser une progression régulière.`,
      ];
      parts.push(actions[(si + 1) % actions.length]);
    } else {
      parts.push(`${fullName} obtient un score de ${scoreDisplay}/10, ce qui indique une absence de connaissances préalables en « ${formation} ».`);
      const extras = [
        `${fullName} n'a aucune expérience dans ce domaine. L'ensemble des compétences devra être construit durant la formation.`,
        `Le test de positionnement confirme que ${fullName} part de zéro. Un dispositif d'accompagnement individualisé est indispensable.`,
        `${fullName} débute totalement dans le domaine. Le formateur devra consacrer un temps significatif à l'initiation aux concepts de base.`,
      ];
      parts.push(extras[si % extras.length]);
      parts.push(`Un entretien individuel sera programmé avec ${fullName} pour identifier les éventuels freins à l'apprentissage et définir un parcours adapté.`);
    }
  } else {
    // --- FIN DE FORMATION ---
    if (pct >= 90) {
      parts.push(`${fullName} obtient un score de ${scoreDisplay}/10 en fin de formation, ce qui démontre une excellente acquisition des compétences visées en « ${formation} ».`);
      const extras = [
        `${fullName} a pleinement atteint les objectifs pédagogiques. La maîtrise des outils et méthodes est complète et opérationnelle.`,
        `Les résultats de ${fullName} confirment une parfaite assimilation des contenus. Le transfert en situation professionnelle peut se faire en totale autonomie.`,
        `${fullName} a fait preuve d'une progression exemplaire et d'un investissement remarquable tout au long de la formation.`,
      ];
      parts.push(extras[si % extras.length]);
      parts.push(`Aucun besoin de suivi complémentaire pour ${fullName}. Les compétences sont acquises et directement applicables.`);
    } else if (pct >= 70) {
      parts.push(`${fullName} obtient un score de ${scoreDisplay}/10 en fin de formation, attestant d'une bonne acquisition des compétences en « ${formation} ».`);
      const extras = [
        `${fullName} a atteint les principaux objectifs pédagogiques. Quelques points restent à consolider par la pratique régulière.`,
        `La progression de ${fullName} est très satisfaisante. Les compétences essentielles sont acquises, seuls quelques aspects avancés nécessitent un approfondissement.`,
        `${fullName} maîtrise correctement les compétences visées. Le formateur recommande de poursuivre la pratique pour ancrer durablement les acquis.`,
      ];
      parts.push(extras[(si + 1) % extras.length]);
      const actions = [
        `Il est conseillé à ${fullName} de mettre en application rapidement les compétences acquises et de consulter les ressources e-learning mises à disposition.`,
        `${fullName} pourra consolider ses acquis en pratiquant régulièrement et en se référant aux fiches méthodes fournies durant la formation.`,
        `Un suivi à 3 mois est recommandé pour ${fullName} afin de vérifier l'ancrage des compétences en situation de travail.`,
      ];
      parts.push(actions[(si + 2) % actions.length]);
    } else if (pct >= 50) {
      parts.push(`${fullName} obtient un score de ${scoreDisplay}/10 en fin de formation. Les objectifs pédagogiques sont partiellement atteints en « ${formation} ».`);
      const extras = [
        `${fullName} a progressé mais certaines compétences restent fragiles et nécessitent un renforcement.`,
        `La progression de ${fullName} est encourageante mais insuffisante pour une autonomie complète. Des lacunes persistent sur les aspects techniques.`,
        `${fullName} a acquis les bases mais manque encore de maîtrise sur plusieurs compétences clés de la formation.`,
      ];
      parts.push(extras[si % extras.length]);
      const actions = [
        `Le formateur recommande à ${fullName} un accompagnement post-formation : sessions de révision, exercices complémentaires et accès prolongé à la plateforme.`,
        `Il est préconisé que ${fullName} bénéficie d'un suivi tutoral pour finaliser la montée en compétences sur les points identifiés.`,
        `${fullName} devrait envisager une session de renforcement pour consolider les acquis et atteindre pleinement les objectifs visés.`,
      ];
      parts.push(actions[(si + 1) % actions.length]);
    } else {
      parts.push(`${fullName} obtient un score de ${scoreDisplay}/10 en fin de formation. Les objectifs pédagogiques ne sont pas pleinement atteints en « ${formation} ».`);
      const extras = [
        `Malgré les efforts de ${fullName}, des difficultés importantes persistent. Les compétences ne sont pas suffisamment acquises pour une mise en pratique autonome.`,
        `${fullName} a montré de la motivation mais les résultats restent en deçà des attentes. Les lacunes identifiées en début de formation n'ont pas été totalement comblées.`,
        `La progression de ${fullName} est insuffisante. Des freins à l'apprentissage ont été identifiés et n'ont pas pu être entièrement levés durant la formation.`,
      ];
      parts.push(extras[si % extras.length]);
      parts.push(`Le formateur recommande fortement à ${fullName} de suivre une formation complémentaire ou un accompagnement individualisé pour atteindre le niveau requis.`);
    }
  }

  return parts.join(" ");
}

function genProcedureEvaluation(o: OrganismeInfo, f: FormationInfo, type: "debut" | "fin") {
  const label = type === "debut" ? "début" : "fin";
  const labelCap = type === "debut" ? "Début" : "Fin";

  const objectifs = type === "debut"
    ? `<ul>
        <li>Identifier le niveau initial des stagiaires concernant leurs connaissances de base en « ${f.intitule} ».</li>
        <li>Déterminer leur capacité à interagir avec les outils et concepts du domaine.</li>
        <li>Adapter le contenu pédagogique, le rythme, et les modalités d'accompagnement en fonction du profil de chaque participant.</li>
       </ul>`
    : `<ul>
        <li>Mesurer la progression des stagiaires à l'issue de la formation « ${f.intitule} ».</li>
        <li>Vérifier l'acquisition des compétences et connaissances visées par les objectifs pédagogiques.</li>
        <li>Identifier les éventuels axes de consolidation et recommander un plan d'action post-formation.</li>
       </ul>`;

  const contenu = type === "debut"
    ? `<ul>
        <li>Questions sur la reconnaissance de l'environnement et des outils liés à « ${f.intitule} ».</li>
        <li>Connaissances déclaratives et pratiques sur les fondamentaux du domaine.</li>
        <li>Questions de logique et de compréhension des concepts de base.</li>
        <li>Questions sur les réflexes d'utilisation et les bonnes pratiques.</li>
       </ul>`
    : `<ul>
        <li>Questions approfondies sur les compétences développées pendant la formation.</li>
        <li>Application des méthodes et outils présentés en cours.</li>
        <li>Questions de synthèse et de transfert des acquis en situation professionnelle.</li>
        <li>Auto-évaluation de la progression et plan d'action post-formation.</li>
       </ul>`;

  const exploitation = type === "debut"
    ? `<ul>
        <li>Le formateur corrige et commente les copies individuellement.</li>
        <li>Une fiche de synthèse de positionnement est remplie et archivée.</li>
        <li>En cas de difficulté majeure (score faible ou grande hésitation), un entretien individuel peut être proposé pour identifier les blocages.</li>
        <li>La progression pédagogique et l'accompagnement sont ajustés en conséquence : tutoriels complémentaires, rappels fondamentaux, exercices guidés.</li>
       </ul>`
    : `<ul>
        <li>Le formateur corrige et commente les copies individuellement.</li>
        <li>Comparaison systématique avec les résultats du test de début pour mesurer la progression.</li>
        <li>Remise d'une attestation de fin de formation avec mention du score obtenu.</li>
        <li>En cas de score insuffisant, recommandation de ressources complémentaires et d'un accompagnement post-formation.</li>
       </ul>`;

  return buildDocument({ org: o, title: `PROCÉDURE D'ÉVALUATION DE ${labelCap.toUpperCase()} DE FORMATION`, subtitle: f.intitule, formation: f, showFormationInfo: false, sections: [
    { heading: `Titre de la formation`, content: `<p>${f.intitule}</p>` },
    { heading: "Durée de l'évaluation", content: "<p>10 à 15 minutes</p>" },
    { heading: "Objectifs de l'évaluation", content: `<p>L'évaluation de ${label} de formation vise à :</p>${objectifs}` },
    { heading: "Modalités pédagogiques", content: `<ul>
      <li>Test de positionnement individuel sous forme de questions ouvertes courtes.</li>
      <li>Support proposé : papier ou formulaire numérique.</li>
      <li>Présentation orale du test par le formateur en ${label} de session, consignes claires et temps imparti.</li>
      <li>Évaluation réalisée en autonomie, sans correction immédiate par les pairs.</li>
    </ul>` },
    { heading: "Contenu du test", content: contenu },
    { heading: "Critères d'évaluation", content: `<ul>
      <li>Pertinence des réponses.</li>
      <li>Logique de raisonnement de base.</li>
      <li>Capacité à structurer une réponse simple mais fonctionnelle.</li>
      <li>Score sur 10 avec seuil d'alerte pédagogique à 5/10.</li>
    </ul>` },
    { heading: "Exploitation pédagogique", content: exploitation },
    { heading: "Trace conservée", content: `<ul>
      <li>Test rempli, corrigé et archivé.</li>
      <li>Commentaire du formateur daté.</li>
      <li>Synthèse globale du positionnement dans le dossier de la session.</li>
    </ul>`, variant: "green" },
  ] });
}

function genGrilleNiveauxPositionnement(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = `<div class="section"><p><strong>Présentation du document</strong><br>Ce document vise à définir et présenter les différents groupes de niveaux existants au sein de la société ${o.nom}.</p></div>`;

  // Table of groups
  extra += tableHTML(
    ["GROUPE", "NIVEAU", "COMPÉTENCES MAÎTRISÉES AVANT LA FORMATION"],
    [
      ["Groupe 3", "AVANCÉ", "Déjà formé(e) / pratique régulière et autonome dans le domaine"],
      ["Groupe 2", "AMATEUR", "Déjà suivi une formation / déjà pratiqué en autodidacte"],
      ["Groupe 1", "DÉBUTANT", "Jamais suivi de formation dans ce domaine / aucune pratique"],
    ]
  );

  // Assign stagiaires to groups based on their profile
  if (stagiaires.length > 0) {
    extra += `<h3>Répartition des stagiaires – ${f.intitule}</h3>`;
    const rows = stagiaires.slice(0, 10).map((s, i) => {
      const profiles = ['bon', 'excellent', 'moyen', 'bon', 'debutant', 'excellent', 'bon', 'moyen', 'bon', 'moyen'];
      const level = profiles[i % profiles.length];
      const groupe = level === 'excellent' ? 'Groupe 3' : level === 'bon' ? 'Groupe 2' : level === 'moyen' ? 'Groupe 2' : 'Groupe 1';
      const niveau = level === 'excellent' ? 'AVANCÉ' : level === 'bon' || level === 'moyen' ? 'AMATEUR' : 'DÉBUTANT';
      return [s.prenom + " " + s.nom, groupe, niveau];
    });
    extra += tableHTML(["Stagiaire", "Groupe", "Niveau"], rows);
  }

  return buildDocument({ org: o, title: "GRILLE DE NIVEAUX", subtitle: f.intitule, formation: f, showFormationInfo: false, extraHtml: extra });
}

// ===== NEW: QCM Positionnement détaillé =====
function genQCMPositionnement(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const questions = evalData.qcmPositionnement;
  let extra = `<h2>QCM DE POSITIONNEMENT</h2>`;
  extra += `<p><strong>Formation :</strong> ${f.intitule}<br><strong>Date :</strong> ${formatDate(f.dateDebut)}<br><strong>Nombre de questions :</strong> ${questions.length}<br><strong>Durée :</strong> 30 minutes<br><strong>Barème :</strong> 1 point par bonne réponse</p>`;

  // Show full questionnaire with correct answers
  extra += `<h3>📝 Questionnaire et corrigé</h3>`;
  questions.forEach((q, i) => {
    extra += `<div class="section"><p><strong>Question ${i + 1} :</strong> ${q.question}</p>`;
    q.options.forEach((opt, oi) => {
      if (oi === q.correctIndex) {
        extra += `<p>✅ <strong>${String.fromCharCode(65 + oi)}) ${opt}</strong> ← Bonne réponse</p>`;
      } else {
        extra += `<p>○ ${String.fromCharCode(65 + oi)}) ${opt}</p>`;
      }
    });
    extra += `</div>`;
  });

  // Individual results
  extra += `<div class="page-break"></div><h2>Résultats individuels</h2>`;
  stagiaires.slice(0, 10).forEach((s, si) => {
    const answers = generateStagiaireAnswers(questions, si);
    const result = computeQCMScore(questions, answers);
    const pct = Math.round(result.score / result.total * 100);

    extra += `<h3>${s.prenom} ${s.nom} – ${result.score}/${result.total} (${pct}%)</h3>`;
    const rows = questions.map((q, qi) => {
      const chosen = String.fromCharCode(65 + answers[qi]);
      const correct = String.fromCharCode(65 + q.correctIndex);
      return [`Q${qi + 1}`, chosen, correct, result.details[qi].correct ? "✅" : "❌"];
    });
    extra += tableHTML(["Question", "Réponse", "Correct", ""], rows);
    extra += `<p><em>Appréciation : ${evalData.appreciations[si]?.split('.')[0] || "Niveau correct"}.</em></p>`;
  });

  return buildDocument({ org: o, title: "QCM DE POSITIONNEMENT – DÉTAILLÉ", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra,
    signatures: { type: "2", labels: ["Le Formateur", "Le Resp. Pédagogique"], names: [f.formateur, o.responsablePedagogique] } });
}

// ===== NEW: Exercices pratiques remplis =====
function genExercicesPratiques(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const exercices = evalData.exercices;
  let extra = `<h2>EXERCICES PRATIQUES – RÉSULTATS</h2>`;
  extra += `<p><strong>Formation :</strong> ${f.intitule}<br><strong>Formateur :</strong> ${f.formateur}<br><strong>Nombre d'exercices :</strong> ${exercices.length}</p>`;

  exercices.forEach((ex, ei) => {
    extra += `<div class="page-break"></div>`;
    extra += `<h2>${ex.titre}</h2>`;
    extra += `<div class="section"><p><strong>Consigne :</strong> ${ex.consigne}</p></div>`;
    extra += `<div class="section section-green"><p><strong>Réponse attendue / Corrigé :</strong> ${ex.reponseAttendue}</p></div>`;

    // Results per stagiaire
    extra += `<h3>Résultats par stagiaire</h3>`;
    const rows = stagiaires.slice(0, 10).map((s, si) => {
      const sc = EVAL_SCORES[si] || [7, 8, 7, 8, 7];
      const note = sc[ei % sc.length];
      const noteFinale = Math.min(10, note + 1);
      const appreciation = noteFinale >= 9 ? "Excellent travail, exercice parfaitement réalisé"
        : noteFinale >= 7 ? "Bon travail, quelques points à améliorer"
        : "Travail correct, nécessite un approfondissement";
      return [s.prenom + " " + s.nom, `${noteFinale}/10`, noteFinale >= 7 ? "✅ Validé" : "🔄 À revoir", appreciation];
    });
    extra += tableHTML(["Stagiaire", "Note", "Statut", "Appréciation du formateur"], rows);
  });

  // Global summary
  extra += `<div class="page-break"></div><h2>Synthèse des exercices pratiques</h2>`;
  const globalRows = stagiaires.slice(0, 10).map((s, si) => {
    const sc = EVAL_SCORES[si] || [7, 8, 7, 8, 7];
    const notes = exercices.map((_, ei) => Math.min(10, sc[ei % sc.length] + 1));
    const avg = Math.round(notes.reduce((a, b) => a + b, 0) / notes.length * 10) / 10;
    return [s.prenom + " " + s.nom, ...notes.map(n => `${n}/10`), `<strong>${avg}/10</strong>`, evalData.appreciations[si]?.split('.')[0] + '.' || ""];
  });
  extra += tableHTML(["Stagiaire", ...exercices.map((_, i) => `Ex.${i + 1}`), "Moyenne", "Appréciation globale"], globalRows);

  return buildDocument({ org: o, title: "EXERCICES PRATIQUES – CORRIGÉS ET RÉSULTATS", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra,
    signatures: { type: "2", labels: ["Le Formateur", "Le Resp. Pédagogique"], names: [f.formateur, o.responsablePedagogique] } });
}

// ===== NEW: QCM Final rempli =====
function genQCMFinal(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const questions = evalData.qcmFinal;
  let extra = `<h2>QCM FINAL – ÉVALUATION SOMMATIVE</h2>`;
  extra += `<p><strong>Formation :</strong> ${f.intitule}<br><strong>Date :</strong> ${formatDate(f.dateFin)}<br><strong>Nombre de questions :</strong> ${questions.length}<br><strong>Durée :</strong> 45 minutes<br><strong>Seuil de validation :</strong> 6/${questions.length} (60%)</p>`;

  // Questionnaire with answers
  extra += `<h3>📝 Questionnaire et corrigé</h3>`;
  questions.forEach((q, i) => {
    extra += `<div class="section"><p><strong>Question ${i + 1} :</strong> ${q.question}</p>`;
    q.options.forEach((opt, oi) => {
      if (oi === q.correctIndex) {
        extra += `<p>✅ <strong>${String.fromCharCode(65 + oi)}) ${opt}</strong> ← Bonne réponse</p>`;
      } else {
        extra += `<p>○ ${String.fromCharCode(65 + oi)}) ${opt}</p>`;
      }
    });
    extra += `</div>`;
  });

  // Individual detailed results
  let totalReussis = 0;
  extra += `<div class="page-break"></div><h2>Résultats individuels détaillés</h2>`;
  stagiaires.slice(0, 10).forEach((s, si) => {
    // Final QCM: slightly better answers (end of formation)
    const answers = generateStagiaireAnswers(questions, si + 100);
    const result = computeQCMScore(questions, answers);
    // Boost score slightly for final
    const boostedScore = Math.min(result.total, result.score + 1);
    const pct = Math.round(boostedScore / result.total * 100);
    const reussi = pct >= 60;
    if (reussi) totalReussis++;

    extra += `<h3>${reussi ? '✅' : '⚠️'} ${s.prenom} ${s.nom} – ${boostedScore}/${result.total} (${pct}%) – ${reussi ? 'VALIDÉ' : 'NON VALIDÉ'}</h3>`;
    const rows = questions.map((q, qi) => {
      const chosen = q.options[answers[qi]];
      const isCorrect = answers[qi] === q.correctIndex;
      return [`Q${qi + 1}`, q.question.substring(0, 50) + '...', chosen, isCorrect ? "✅" : `❌ (${q.options[q.correctIndex]})`];
    });
    extra += tableHTML(["N°", "Question", "Réponse donnée", "Résultat"], rows);
    extra += `<div class="section"><p><strong>Appréciation du formateur :</strong> ${evalData.appreciations[si] || "Évaluation terminée."}</p></div>`;
  });

  const nbStagiaires = Math.min(stagiaires.length, 10);
  extra += `<div class="page-break"></div><h2>Synthèse</h2>`;
  extra += `<div class="section section-green">
    <p><strong>Stagiaires évalués :</strong> ${nbStagiaires}</p>
    <p><strong>Stagiaires ayant validé :</strong> ${totalReussis}/${nbStagiaires} (${Math.round(totalReussis / nbStagiaires * 100)}%)</p>
    <p><strong>Appréciation générale :</strong> Les résultats du QCM final confirment une bonne acquisition des connaissances par le groupe. Les objectifs pédagogiques de la formation sont atteints.</p>
  </div>`;

  return buildDocument({ org: o, title: "QCM FINAL – RÉSULTATS DÉTAILLÉS", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra,
    signatures: { type: "3", names: ["", f.formateur] } });
}

function genAttestation(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = stagiaires.slice(0, 10).map(s => `
    <div class="section"><p>Je soussigné, <strong>${o.dirigeant}</strong>, atteste que <strong>${s.prenom} ${s.nom}</strong> (${s.entreprise}) a suivi la formation « ${f.intitule} » du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)} (${f.duree}).</p>
    <p><strong>Objectifs atteints :</strong> ${f.objectifs}</p>
    <p>Fait à ${o.ville}, le ${formatDate(f.dateFin)}</p>
    ${signatureBlock2("Le Responsable", o.dirigeant, "Le Stagiaire", s.prenom + " " + s.nom)}
    </div><div class="page-break"></div>`).join("");
  return buildDocument({ org: o, title: "ATTESTATIONS DE FIN DE FORMATION", subtitle: f.intitule, extraHtml: extra });
}

function genCertificat(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = stagiaires.slice(0, 10).map((s, i) => {
    const sc = EVAL_SCORES[i] || [8, 8, 8, 8, 8];
    const note = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    return `<div class="section" style="text-align:center;padding:30px"><h2 style="color:#1e3a7b">CERTIFICAT DE RÉUSSITE</h2><p style="font-size:16px;margin:20px 0"><strong>${s.prenom} ${s.nom}</strong></p><p>a validé avec succès la formation</p><p style="font-size:15px;font-weight:700;color:#1e3a7b">${f.intitule}</p><p>Note obtenue : <strong>${note}/10</strong></p><p style="margin-top:20px">Fait à ${o.ville}, le ${formatDate(f.dateFin)}</p><p><em>Signé par ${o.dirigeant}</em></p></div><div class="page-break"></div>`;
  }).join("");
  return buildDocument({ org: o, title: "CERTIFICATS DE RÉUSSITE", subtitle: f.intitule, extraHtml: extra });
}

function genSuivi3Mois(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "QUESTIONNAIRE DE SUIVI À 3 MOIS", subtitle: f.intitule, sections: [
    { heading: "Utilisation des acquis", content: "<p>Les compétences acquises sont-elles utilisées dans votre poste ? <strong class='check'>✅ Oui, quotidiennement</strong><br>Impact sur votre performance : <strong class='check'>8/10</strong><br>Compétences les plus utiles : Maîtrise des outils, méthodologie, autonomie</p>" },
    { heading: "Situation professionnelle", content: "<p>Évolution depuis la formation : <strong>Promotion / Nouvelles responsabilités</strong><br>La formation a-t-elle contribué ? <strong class='check'>✅ Oui</strong></p>" },
  ] });
}

function genQuestionnaireInsertion(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "QUESTIONNAIRE D'INSERTION PROFESSIONNELLE", subtitle: f.intitule, table: {
    headers: ["Question", "Réponse"],
    rows: [["Êtes-vous en emploi ?", "✅ Oui"], ["Type de contrat", "CDI"], ["Le poste est-il en lien avec la formation ?", "✅ Oui"], ["La formation a contribué à votre insertion ?", "✅ Oui, significativement"], ["Note de satisfaction globale", "4.5/5"]]
  } });
}

function genConditionsAccueil(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "FICHE CONDITIONS D'ACCUEIL", subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "Locaux", content: `<p>Adresse : ${f.lieu}<br>Accès : Métro, bus, parking<br>Accessibilité PMR : ✅ Oui<br>Wifi : ✅ Disponible</p>` },
    { heading: "Équipements", content: `<p>${f.moyensPedagogiques}</p>` },
    { heading: "Horaires", content: "<p>Matin : 9h00 – 12h30<br>Après-midi : 13h30 – 17h00<br>Pause déjeuner : 12h30 – 13h30</p>" },
  ] });
}

function genCharteAccueil(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "CHARTE D'ACCUEIL", subtitle: f.intitule, sections: [
    { heading: "Nos engagements", content: "<p>• Accueil personnalisé dès votre arrivée<br>• Environnement propice à l'apprentissage<br>• Matériel en parfait état de fonctionnement<br>• Respect des horaires annoncés<br>• Écoute et disponibilité de l'équipe</p>" },
  ], signatures: { type: "2", labels: ["Le Responsable", "Le Stagiaire"], names: [o.dirigeant, ""] } });
}

function genListeMoyens(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "LISTE DES MOYENS PÉDAGOGIQUES", subtitle: f.intitule, formation: f, showFormationInfo: true, table: {
    headers: ["Moyen", "Quantité", "État", "Dernière vérification"],
    rows: [["PC portables", "12", "✅ Bon", "01/01/2024"], ["Vidéoprojecteur", "1", "✅ Bon", "01/01/2024"], ["Tableau blanc interactif", "1", "✅ Bon", "01/01/2024"], ["Connexion internet fibre", "1", "✅ Bon", "01/01/2024"], ["Supports de cours imprimés", `${f.nombreParticipants}`, "✅ Neuf", formatDate(f.dateDebut)], ["Plateforme Moodle", "1", "✅ Opérationnel", "01/01/2024"]]
  } });
}

function genInventaire(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "INVENTAIRE DU MATÉRIEL PÉDAGOGIQUE", subtitle: f.intitule, table: {
    headers: ["Référence", "Désignation", "Localisation", "État", "Date achat"],
    rows: [["MAT-001", "PC Dell Latitude 5540", "Salle A1", "Bon", "09/2023"], ["MAT-002", "Vidéoprojecteur Epson EB-2250U", "Salle A1", "Bon", "06/2023"], ["MAT-003", "TBI Samsung Flip 3", "Salle A1", "Bon", "01/2024"], ["MAT-004", "Imprimante HP LaserJet", "Bureau admin", "Bon", "03/2023"], ["MAT-005", "Kit visioconférence Poly", "Salle B2", "Bon", "11/2023"]]
  } });
}

function genSupportsCours(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "SUPPORTS DE COURS", subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "Supports fournis", content: "<p>• Manuel de formation (version papier et numérique)<br>• Fiches mémo synthétiques<br>• Exercices pratiques et corrigés<br>• Études de cas réels<br>• Vidéos tutorielles (accès 6 mois post-formation)<br>• Ressources complémentaires en ligne</p>" },
    { heading: "Accès numérique", content: `<p>Plateforme : ${o.outilsUtilises}<br>Durée d'accès : 6 mois après la formation<br>Identifiants envoyés par email avant le début de la formation</p>`, variant: "green" },
  ] });
}

function genGuideElearning(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "GUIDE PLATEFORME E-LEARNING", subtitle: f.intitule, sections: [
    { heading: "Connexion", content: "<p>1. Rendez-vous sur https://moodle.formapro-excellence.fr<br>2. Saisissez votre identifiant (email) et mot de passe<br>3. Accédez à votre tableau de bord</p>" },
    { heading: "Navigation", content: "<p>• Mes formations : accès aux cours en cours<br>• Ressources : documents et vidéos<br>• Évaluations : tests et QCM<br>• Forum : échanges avec le formateur et les autres stagiaires</p>" },
    { heading: "Support technique", content: `<p>En cas de difficulté : ${o.email} ou ${o.telephone}</p>` },
  ] });
}

function genCRReunion(o: OrganismeInfo, mois: string) {
  return buildDocument({ org: o, title: "COMPTE-RENDU RÉUNION PÉDAGOGIQUE", subtitle: mois, sections: [
    { heading: "Participants", content: `<p>${o.responsablePedagogique} (resp. pédagogique), Philippe Martin, Catherine Dubois, Marie Fontaine, Jean-Pierre Blanc, Alexandre Petit</p>` },
    { heading: "Ordre du jour", content: "<p>1. Bilan des formations du mois<br>2. Retours stagiaires et points d'amélioration<br>3. Mise à jour des supports pédagogiques<br>4. Planification du mois suivant</p>" },
    { heading: "Décisions prises", content: "<p>• Mise à jour du module Excel (ajout Power Query)<br>• Création d'un nouveau support pour le module Management à distance<br>• Réorganisation des créneaux de formation anglais<br>• Acquisition de 3 licences logicielles supplémentaires</p>", variant: "green" },
    { heading: "Actions à mener", content: "<p>• Philippe Martin : mettre à jour les supports Excel avant le 15 du mois<br>• Catherine Dubois : préparer le nouveau test TOEIC blanc<br>• Alexandre Petit : installer les environnements virtuels pour la formation IT</p>" },
  ] });
}

function genPlanningFormateurs(o: OrganismeInfo, formateurs: FormateurInfo[], formations: FormationInfo[]) {
  const rows = formations.map(f => [f.intitule, f.formateur, `${formatDate(f.dateDebut)} – ${formatDate(f.dateFin)}`, f.duree, f.modalites]);
  return buildDocument({ org: o, title: "PLANNING DES FORMATEURS 2024", table: { headers: ["Formation", "Formateur", "Dates", "Durée", "Modalité"], rows } });
}

function genCoordination(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "COORDINATION PÉDAGOGIQUE", subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "Équipe pédagogique", content: `<p>Formateur principal : ${f.formateur}<br>Responsable pédagogique : ${o.responsablePedagogique}<br>Coordinateur : ${o.responsablePedagogique}</p>` },
    { heading: "Points de coordination", content: "<p>• Briefing pré-formation avec le formateur<br>• Point mi-parcours sur l'avancement<br>• Débriefing post-formation<br>• Analyse des évaluations et retours</p>" },
  ] });
}

function genLivretApprentissage(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "LIVRET D'APPRENTISSAGE", subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "Objectifs de la période", content: `<p>${f.objectifs}</p>` },
    { heading: "Compétences à développer", content: "<p>☐ Compétence 1 : Acquise<br>☐ Compétence 2 : En cours<br>☐ Compétence 3 : À développer</p>" },
    { heading: "Observations du tuteur", content: "<p>Le stagiaire fait preuve de motivation et d'assiduité. Les compétences se développent de manière satisfaisante.</p>" },
  ], signatures: { type: "3", names: ["", f.formateur] } });
}

function genFicheSuiviTuteur(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "FICHE DE SUIVI TUTEUR", subtitle: f.intitule, formation: f, showFormationInfo: true, table: {
    headers: ["Date", "Activité réalisée", "Compétences travaillées", "Évaluation"],
    rows: [["Semaine 1", "Observation et découverte", "Compétences de base", "Satisfaisant"], ["Semaine 2", "Pratique guidée", "Compétences intermédiaires", "Bien"], ["Semaine 3", "Pratique autonome", "Compétences avancées", "Très bien"], ["Semaine 4", "Mise en situation réelle", "Compétences transversales", "Excellent"]]
  }, signatures: { type: "2", labels: ["Le Tuteur", "Le Stagiaire"], names: [f.formateur, ""] } });
}

function genCV(o: OrganismeInfo, fmt: FormateurInfo) {
  return buildDocument({ org: o, title: `CURRICULUM VITAE`, subtitle: `${fmt.prenom} ${fmt.nom}`, sections: [
    { heading: "Informations", content: `<p><strong>Nom :</strong> ${fmt.prenom} ${fmt.nom}<br><strong>Spécialité :</strong> ${fmt.specialite}<br><strong>Email :</strong> ${fmt.email}</p>` },
    { heading: "Formation", content: `<p>${fmt.diplomes}</p>` },
    { heading: "Expérience", content: `<p>${fmt.experience}</p><p>• Formation professionnelle continue depuis ${parseInt(fmt.experience)} ans<br>• Plus de 2000 heures de formation dispensées<br>• Interventions en entreprise et en centre de formation</p>` },
    { heading: "Compétences pédagogiques", content: "<p>• Ingénierie pédagogique et conception de programmes<br>• Animation de groupes en présentiel et à distance<br>• Évaluation des compétences<br>• Utilisation des outils numériques de formation</p>" },
  ] });
}

function genFicheCompetences(o: OrganismeInfo, fmt: FormateurInfo) {
  return buildDocument({ org: o, title: "FICHE DE COMPÉTENCES", subtitle: `${fmt.prenom} ${fmt.nom}`, sections: [
    { heading: "Domaine d'expertise", content: `<p>${fmt.specialite}</p>` },
    { heading: "Compétences techniques", content: "<p>☑ Expertise du domaine : <strong>Expert</strong><br>☑ Maîtrise des outils : <strong>Expert</strong><br>☑ Veille sectorielle : <strong>Avancé</strong></p>" },
    { heading: "Compétences pédagogiques", content: "<p>☑ Conception de programmes : <strong>Expert</strong><br>☑ Animation présentielle : <strong>Expert</strong><br>☑ Animation distancielle : <strong>Avancé</strong><br>☑ Évaluation : <strong>Expert</strong></p>" },
  ] });
}

function genEvalFormateur(o: OrganismeInfo, fmt: FormateurInfo) {
  return buildDocument({ org: o, title: "ÉVALUATION DU FORMATEUR", subtitle: `${fmt.prenom} ${fmt.nom}`, table: {
    headers: ["Critère", "Note /5", "Commentaire"],
    rows: [["Maîtrise du sujet", "5/5", "Excellent"], ["Clarté des explications", "4.8/5", "Très bien"], ["Gestion du groupe", "4.5/5", "Bien"], ["Supports utilisés", "4.7/5", "Très bien"], ["Disponibilité", "4.9/5", "Excellent"], ["Respect du programme", "5/5", "Excellent"]]
  }, sections: [{ heading: "Appréciation globale", content: `<p><strong>4.8/5 – Excellent formateur</strong>. ${fmt.prenom} ${fmt.nom} fait preuve d'une expertise remarquable et d'une grande pédagogie.</p>`, variant: "green" }] });
}

function genPlanDev(o: OrganismeInfo, formateurs: FormateurInfo[]) {
  const rows = formateurs.map(f => [f.prenom + " " + f.nom, f.specialite, "Formation IA en pédagogie", "2024", "✅ Réalisée"]);
  return buildDocument({ org: o, title: "PLAN DE DÉVELOPPEMENT DES COMPÉTENCES DES FORMATEURS", table: { headers: ["Formateur", "Domaine", "Formation prévue", "Échéance", "Statut"], rows } });
}

function genFormationFormateur(o: OrganismeInfo, fmt: FormateurInfo) {
  return buildDocument({ org: o, title: "ATTESTATION DE FORMATION CONTINUE", subtitle: `${fmt.prenom} ${fmt.nom}`, sections: [
    { heading: "Formation suivie", content: `<p><strong>Intitulé :</strong> Perfectionnement pédagogique et outils numériques<br><strong>Durée :</strong> 14 heures<br><strong>Dates :</strong> Mars 2024<br><strong>Organisme :</strong> Centre National de Formation des Formateurs</p>` },
    { heading: "Compétences développées", content: "<p>• Utilisation avancée des outils de visioconférence<br>• Gamification des parcours de formation<br>• Intelligence artificielle au service de la pédagogie</p>" },
  ] });
}

function genEntretienPro(o: OrganismeInfo, fmt: FormateurInfo) {
  return buildDocument({ org: o, title: "ENTRETIEN PROFESSIONNEL", subtitle: `${fmt.prenom} ${fmt.nom} – Année 2024`, sections: [
    { heading: "Bilan de l'année", content: `<p>Nombre d'heures de formation dispensées : 450h<br>Taux de satisfaction moyen : 4.8/5<br>Formations nouvelles créées : 2</p>` },
    { heading: "Objectifs pour l'année suivante", content: "<p>• Développer l'offre de formation à distance<br>• Obtenir la certification Qualiopi Formateur Expert<br>• Créer 3 nouveaux modules de formation</p>" },
    { heading: "Besoins de formation identifiés", content: "<p>• Formation avancée en IA appliquée<br>• Certification en ingénierie pédagogique digitale</p>" },
  ], signatures: { type: "2", labels: ["Le Responsable", "Le Formateur"], names: [o.responsablePedagogique, fmt.prenom + " " + fmt.nom] } });
}

function genReferentielExpertise(o: OrganismeInfo, fmt: FormateurInfo) {
  return buildDocument({ org: o, title: "RÉFÉRENTIEL D'EXPERTISE", subtitle: `${fmt.prenom} ${fmt.nom}`, sections: [
    { heading: "Domaine principal", content: `<p>${fmt.specialite}</p>` },
    { heading: "Niveau d'expertise", content: `<p>${fmt.experience}<br>Niveau : <strong>Expert (niveau 5/5)</strong></p>` },
    { heading: "Publications et interventions", content: "<p>• Participation à des conférences professionnelles<br>• Rédaction d'articles spécialisés<br>• Membre de réseaux professionnels du secteur</p>" },
  ] });
}

function genPortfolio(o: OrganismeInfo, fmt: FormateurInfo) {
  return buildDocument({ org: o, title: "PORTFOLIO FORMATEUR", subtitle: `${fmt.prenom} ${fmt.nom}`, sections: [
    { heading: "Formations dispensées en 2024", content: "<p>• 12 sessions de formation réalisées<br>• 450 heures de formation dispensées<br>• 120 stagiaires formés<br>• 4 nouvelles formations créées</p>" },
    { heading: "Résultats", content: "<p>Taux de satisfaction : 4.8/5<br>Taux de réussite : 91%<br>Taux de recommandation : 96%</p>", variant: "green" },
  ] });
}

function genDiplomes(o: OrganismeInfo, fmt: FormateurInfo) {
  return buildDocument({ org: o, title: "ATTESTATION DE DIPLÔMES", subtitle: `${fmt.prenom} ${fmt.nom}`, sections: [
    { heading: "Diplômes obtenus", content: `<p>${fmt.diplomes}</p>` },
    { heading: "Certifications professionnelles", content: "<p>• Certification Formateur Professionnel d'Adultes (FPA)<br>• Habilitation à former dans le cadre Qualiopi<br>• Certification numérique (PIX niveau Expert)</p>" },
  ] });
}

function genAttestationExp(o: OrganismeInfo, fmt: FormateurInfo) {
  return buildDocument({ org: o, title: "ATTESTATION D'EXPÉRIENCE PROFESSIONNELLE", subtitle: `${fmt.prenom} ${fmt.nom}`, sections: [
    { heading: "Attestation", content: `<p>Je soussigné, ${o.dirigeant}, dirigeant de ${o.nom}, atteste que ${fmt.prenom} ${fmt.nom} exerce en qualité de formateur au sein de notre organisme.</p><p><strong>Spécialité :</strong> ${fmt.specialite}<br><strong>Expérience :</strong> ${fmt.experience}<br><strong>Statut :</strong> Formateur permanent</p>` },
  ], signatures: { type: "2", labels: ["Le Dirigeant", "Le Formateur"], names: [o.dirigeant, fmt.prenom + " " + fmt.nom] } });
}

function genProcedureVeille(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE DE VEILLE", sections: [
    { heading: "Objectif", content: "<p>Assurer une veille permanente sur les évolutions réglementaires, pédagogiques et sectorielles pour maintenir la qualité et la pertinence de nos formations.</p>" },
    { heading: "Sources de veille", content: "<p>• Légifrance, Journal Officiel<br>• DGEFP, France Compétences<br>• OPCO Atlas, Constructys<br>• FFFOD, Centre Inffo<br>• Revues professionnelles spécialisées</p>" },
    { heading: "Fréquence", content: "<p>• Veille quotidienne : alertes automatiques<br>• Synthèse mensuelle : note de veille<br>• Rapport trimestriel : analyse et actions<br>• Bilan annuel : rapport de veille global</p>" },
    { heading: "Responsable", content: `<p>${o.referentQualite} – Référent qualité et veille</p>` },
  ] });
}

function genTableauVeille(o: OrganismeInfo, trimestre: string, type: string) {
  const items: Record<string, string[][]> = {
    "réglementaire": [["Décret formation professionnelle", "Légifrance", "Mise à jour des CGV", "✅ Fait"], ["Loi avenir professionnel – évolution", "DGEFP", "Formation équipe", "✅ Fait"], ["Arrêté Qualiopi – mise à jour indicateurs", "France Compétences", "Revue du SMQ", "✅ Fait"], ["RGPD – nouvelles obligations", "CNIL", "Mise à jour politique données", "✅ Fait"]],
    "pédagogique": [["AFEST – nouvelles pratiques", "Centre Inffo", "Étude de faisabilité", "✅ Fait"], ["Blended learning – tendances 2024", "FFFOD", "Intégration programme", "✅ Fait"], ["Neurosciences et apprentissage", "Revue scientifique", "Formation formateurs", "✅ Fait"], ["Accessibilité numérique (RGAA)", "DINUM", "Audit plateforme", "🔄 En cours"]],
    "métiers et compétences": [["Évolution métiers du numérique", "APEC", "Mise à jour programmes IT", "✅ Fait"], ["Compétences vertes et RSE", "ADEME", "Nouveau module en préparation", "🔄 En cours"], ["Soft skills – référentiel européen", "Cedefop", "Intégration transversale", "✅ Fait"], ["IA et transformation des métiers", "McKinsey", "Veille approfondie", "✅ Fait"]],
  };
  return buildDocument({ org: o, title: `TABLEAU DE VEILLE ${type.toUpperCase()}`, subtitle: trimestre, table: {
    headers: ["Sujet", "Source", "Action engagée", "Statut"], rows: items[type] || items["réglementaire"]
  } });
}

function genCRVeille(o: OrganismeInfo, mois: string, type: string) {
  return buildDocument({ org: o, title: `COMPTE-RENDU DE VEILLE ${type.toUpperCase()}`, subtitle: mois, sections: [
    { heading: "Éléments identifiés", content: "<p>• 3 évolutions réglementaires relevées<br>• 2 nouvelles obligations identifiées<br>• 1 opportunité de développement repérée</p>" },
    { heading: "Actions décidées", content: "<p>• Mise à jour de la documentation interne<br>• Formation de l'équipe sur les nouvelles dispositions<br>• Adaptation des programmes concernés</p>", variant: "green" },
    { heading: "Prochaine échéance", content: "<p>Prochaine revue de veille prévue le mois prochain.</p>" },
  ] });
}

function genNewsletter(o: OrganismeInfo, mois: string) {
  return buildDocument({ org: o, title: "NEWSLETTER VEILLE FORMATION", subtitle: mois, sections: [
    { heading: "À la une", content: "<p>Réforme de la formation professionnelle : les points clés à retenir pour les organismes de formation certifiés Qualiopi.</p>" },
    { heading: "Réglementation", content: "<p>• Nouveau décret sur les conditions de réalisation des bilans de compétences<br>• Mise à jour du guide de lecture du RNQ</p>" },
    { heading: "Innovation pédagogique", content: "<p>• L'intelligence artificielle au service de la personnalisation des parcours<br>• Retour d'expérience : la gamification dans la formation bureautique</p>" },
  ] });
}

function genFicheInnovation(o: OrganismeInfo, sujet: string) {
  return buildDocument({ org: o, title: "FICHE INNOVATION PÉDAGOGIQUE", subtitle: sujet, sections: [
    { heading: "Description", content: `<p>${sujet} représente une opportunité majeure pour améliorer l'efficacité pédagogique de nos formations. Cette technologie/approche permet de personnaliser les parcours d'apprentissage et d'augmenter l'engagement des apprenants.</p>` },
    { heading: "Applications potentielles", content: "<p>• Personnalisation des contenus selon le profil apprenant<br>• Automatisation de certaines évaluations<br>• Création de contenus interactifs<br>• Analyse prédictive des résultats</p>" },
    { heading: "Plan d'intégration", content: "<p>Phase 1 : Expérimentation (T1 2024) – 1 formation pilote<br>Phase 2 : Évaluation (T2 2024) – Analyse des résultats<br>Phase 3 : Déploiement (T3-T4 2024) – Généralisation</p>", variant: "green" },
  ] });
}

function genBenchmark(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "BENCHMARK OUTILS PÉDAGOGIQUES 2024", table: {
    headers: ["Outil", "Catégorie", "Note /5", "Adopté", "Commentaire"],
    rows: [["Moodle", "LMS", "4.5/5", "✅ Oui", "Notre plateforme principale"], ["Zoom", "Visio", "4/5", "✅ Oui", "Fiable et complet"], ["Genially", "Création contenu", "4.2/5", "✅ Oui", "Interactif et intuitif"], ["Kahoot", "Gamification", "3.8/5", "🔄 Test", "Bon pour les quiz"], ["Notion", "Documentation", "4.5/5", "✅ Oui", "Base de connaissances"], ["ChatGPT", "IA", "4/5", "🔄 Test", "Aide à la conception"]]
  } });
}

function genAnalyseSectorielle(o: OrganismeInfo, secteur: string) {
  return buildDocument({ org: o, title: "ANALYSE SECTORIELLE", subtitle: secteur, sections: [
    { heading: "Tendances du secteur", content: `<p>Le secteur « ${secteur} » connaît des évolutions majeures en 2024 : digitalisation accélérée, nouvelles compétences requises, évolution des certifications et des référentiels métiers.</p>` },
    { heading: "Impact sur nos formations", content: "<p>• Mise à jour des contenus de 3 formations<br>• Création d'un nouveau module spécialisé<br>• Renforcement des partenariats sectoriels<br>• Adaptation des évaluations aux nouvelles normes</p>" },
    { heading: "Recommandations", content: "<p>Maintenir une veille active et prévoir une mise à jour semestrielle des programmes concernés.</p>", variant: "green" },
  ] });
}

function genEtudeProspective(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "ÉTUDE PROSPECTIVE EMPLOI-FORMATION", sections: [
    { heading: "Métiers en tension identifiés", content: "<p>• Développeur / Data Analyst<br>• Manager de transition<br>• Expert en cybersécurité<br>• Spécialiste marketing digital<br>• Technicien en esthétique avancée</p>" },
    { heading: "Compétences émergentes", content: "<p>• Intelligence artificielle et prompt engineering<br>• Gestion de projet agile<br>• Compétences vertes et RSE<br>• Communication interculturelle<br>• Analyse de données</p>" },
    { heading: "Opportunités pour l'organisme", content: "<p>Développement de 5 nouvelles formations ciblées sur les compétences émergentes. Objectif : +15% de CA sur le segment numérique.</p>", variant: "green" },
  ] });
}

function genRapportVeilleAnnuel(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "RAPPORT ANNUEL DE VEILLE 2024", sections: [
    { heading: "Synthèse", content: "<p>En 2024, notre dispositif de veille a permis d'identifier 47 évolutions significatives :<br>• 15 évolutions réglementaires<br>• 12 innovations pédagogiques<br>• 10 évolutions métiers<br>• 10 nouvelles certifications</p>" },
    { heading: "Actions mises en œuvre", content: "<p>• 8 programmes de formation mis à jour<br>• 3 nouvelles formations créées<br>• 5 formateurs formés aux nouvelles pratiques<br>• Mise en conformité réglementaire (100%)</p>", variant: "green" },
    { heading: "Perspectives 2025", content: "<p>Renforcement de la veille sur l'IA, développement de l'offre e-learning, nouvelles certifications RS.</p>" },
  ], signatures: { type: "2", labels: ["Le Référent Qualité", "Le Dirigeant"], names: [o.referentQualite, o.dirigeant] } });
}

function genExploitationVeille(o: OrganismeInfo, trimestre: string) {
  return buildDocument({ org: o, title: "EXPLOITATION DE LA VEILLE", subtitle: trimestre, table: {
    headers: ["Veille identifiée", "Impact", "Action engagée", "Résultat"],
    rows: [["Nouveau décret formation", "Fort", "Mise à jour CGV et conventions", "✅ Réalisé"], ["Outil IA pédagogique", "Moyen", "Test sur 2 formations", "✅ Positif"], ["Évolution certification RNCP", "Fort", "Révision programme CAP", "✅ Réalisé"], ["Méthode pédagogique immersive", "Moyen", "Formation formateur", "🔄 En cours"]]
  } });
}

function genPlanActionVeille(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PLAN D'ACTION ISSU DE LA VEILLE", table: {
    headers: ["Action", "Origine veille", "Responsable", "Échéance", "Statut"],
    rows: [["Mise à jour CGV", "Décret 2024-XX", o.referentQualite, "T1 2024", "✅ Fait"], ["Nouveau module IA", "Veille pédagogique", o.responsablePedagogique, "T2 2024", "✅ Fait"], ["Certification formateurs", "Veille métiers", o.dirigeant, "T3 2024", "✅ Fait"], ["Audit accessibilité LMS", "Veille réglementaire", o.referentHandicap, "T4 2024", "🔄 En cours"]]
  } });
}

function genSatisfactionRemplie(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const questions = ["Accueil et organisation", "Atteinte des objectifs", "Contenu adapté", "Méthodes pédagogiques", "Compétence du formateur", "Supports de formation", "Durée adaptée", "Recommandation"];
  let extra = "";
  stagiaires.slice(0, 5).forEach((s, si) => {
    const scores = [4, 5, 4, 5, 5, 4, 5, 5].map((v, i) => v - (si % 2 === 0 && i % 3 === 0 ? 0 : 0));
    extra += `<h3>${s.prenom} ${s.nom}</h3>` + tableHTML(["Critère", "Note /5"], questions.map((q, i) => [q, `${scores[i]}/5`]));
  });
  return buildDocument({ org: o, title: "QUESTIONNAIRES DE SATISFACTION REMPLIS", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra,
    sections: [{ heading: "Satisfaction moyenne", content: "<p><strong>4.7 / 5 – 94% de satisfaction</strong></p>", variant: "green" }] });
}

function genAnalyseSatisfaction(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "ANALYSE DE LA SATISFACTION", subtitle: f.intitule, table: {
    headers: ["Critère", "Moyenne", "Min", "Max", "Écart type"],
    rows: [["Accueil", "4.8", "4", "5", "0.3"], ["Objectifs", "4.6", "4", "5", "0.4"], ["Contenu", "4.7", "4", "5", "0.3"], ["Pédagogie", "4.8", "4", "5", "0.3"], ["Formateur", "4.9", "5", "5", "0.1"], ["Supports", "4.5", "4", "5", "0.5"], ["Durée", "4.6", "4", "5", "0.4"], ["Recommandation", "4.8", "4", "5", "0.3"]]
  }, sections: [{ heading: "Points forts", content: "<p>Compétence du formateur (4.9/5), Accueil (4.8/5)</p>", variant: "green" }, { heading: "Axes d'amélioration", content: "<p>Supports de formation (4.5/5) – Action : mise à jour des supports prévue</p>", variant: "orange" }] });
}

function genSatisfactionFinanceur(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "SATISFACTION FINANCEUR", subtitle: f.intitule, table: {
    headers: ["Critère", "Note /5"],
    rows: [["Qualité de l'information fournie", "5/5"], ["Respect des engagements", "5/5"], ["Qualité des documents administratifs", "4/5"], ["Communication pendant la formation", "5/5"], ["Résultats des stagiaires", "4/5"], ["Rapport qualité/prix", "4/5"], ["Satisfaction globale", "4.5/5"]]
  } });
}

function genSyntheseFinanceurs(o: OrganismeInfo, formations: FormationInfo[]) {
  return buildDocument({ org: o, title: "SYNTHÈSE SATISFACTION FINANCEURS 2024", table: {
    headers: ["Financeur", "Nb formations", "Satisfaction", "Renouvellement"],
    rows: [["OPCO Atlas", "12", "4.7/5", "✅ Oui"], ["OPCO Constructys", "8", "4.5/5", "✅ Oui"], ["Pôle Emploi", "6", "4.6/5", "✅ Oui"], ["Entreprises directes", "15", "4.8/5", "✅ Oui"], ["CPF", "6", "4.4/5", "✅ Oui"]]
  }, sections: [{ heading: "Synthèse", content: "<p><strong>Satisfaction moyenne financeurs : 4.6/5</strong><br>100% de taux de renouvellement des partenariats.</p>", variant: "green" }] });
}

function genRapportFinanceurs(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "RAPPORT ANNUEL FINANCEURS", sections: [
    { heading: "Bilan 2024", content: "<p>47 formations financées par des OPCO et autres financeurs<br>523 stagiaires financés<br>Taux de conformité administrative : 100%<br>Délai moyen de facturation : 15 jours</p>" },
    { heading: "Satisfaction", content: "<p>Satisfaction moyenne : 4.6/5<br>Points forts : réactivité, qualité pédagogique<br>Axes d'amélioration : dématérialisation complète des documents</p>", variant: "green" },
  ] });
}

function genRapportAnalyseGlobal(o: OrganismeInfo, formations: FormationInfo[]) {
  return buildDocument({ org: o, title: "RAPPORT D'ANALYSE SATISFACTION GLOBAL", sections: [
    { heading: "Synthèse 2024", content: "<p>• 523 questionnaires de satisfaction recueillis<br>• Taux de retour : 95%<br>• Satisfaction globale : 97%<br>• Net Promoter Score : +68</p>" },
    { heading: "Évolution", content: "<p>2022 : 92% → 2023 : 95% → 2024 : 97%<br>Progression constante depuis 3 ans.</p>", variant: "green" },
    { heading: "Actions mises en place suite aux retours", content: "<p>• Amélioration des supports de cours (12 formations mises à jour)<br>• Réduction de la taille des groupes à 10 max<br>• Ajout de pauses actives<br>• Développement de l'offre e-learning</p>" },
  ] });
}

function genSyntheseRetours(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "SYNTHÈSE DES RETOURS", subtitle: f.intitule, sections: [
    { heading: "Points positifs", content: "<p>• Qualité du formateur unanimement saluée<br>• Contenu pratique et applicable<br>• Bonne ambiance de groupe<br>• Supports de qualité</p>", variant: "green" },
    { heading: "Points d'amélioration", content: "<p>• Prévoir plus de temps pour les exercices pratiques<br>• Ajouter des cas concrets du secteur d'activité<br>• Améliorer l'acoustique de la salle A1</p>", variant: "orange" },
    { heading: "Actions décidées", content: "<p>• Ajout d'1h de pratique au programme<br>• Création d'une banque de cas par secteur<br>• Demande de travaux d'insonorisation</p>" },
  ] });
}

function genBilanAnnuel(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "BILAN ANNUEL QUALITÉ 2024", sections: [
    { heading: "Indicateurs clés", content: "<p>• Taux de satisfaction : 97% (objectif : 90%) ✅<br>• Taux de réussite : 89% (objectif : 80%) ✅<br>• Taux d'insertion : 82% (objectif : 75%) ✅<br>• Réclamations traitées < 48h : 100% ✅<br>• Taux d'abandon : 3% (objectif : ≤5%) ✅</p>", variant: "green" },
    { heading: "Faits marquants", content: "<p>• Renouvellement certification Qualiopi<br>• Création de 5 nouvelles formations<br>• Recrutement de 2 formateurs<br>• Mise en place du LMS Moodle</p>" },
    { heading: "Objectifs 2025", content: "<p>• Atteindre 600 stagiaires<br>• Développer l'offre e-learning à 40% du catalogue<br>• Obtenir la certification RS pour 3 formations<br>• Mettre en place l'IA dans 2 parcours</p>" },
  ], signatures: { type: "2", labels: ["Le Dirigeant", "Le Référent Qualité"], names: [o.dirigeant, o.referentQualite] } });
}

function genRegistreReclamations(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "REGISTRE DES RÉCLAMATIONS 2024", table: {
    headers: ["N°", "Date", "Réclamant", "Objet", "Traitement", "Délai", "Statut"],
    rows: [["1", "15/01/2024", "M. Dupont", "Problème de connexion LMS", "Réinitialisation accès + support", "24h", "✅ Clôturé"], ["2", "03/02/2024", "Mme Bernard", "Support cours incomplet", "Envoi version complète", "4h", "✅ Clôturé"], ["3", "22/03/2024", "Entreprise XYZ", "Facturation incorrecte", "Avoir + nouvelle facture", "48h", "✅ Clôturé"], ["4", "10/04/2024", "M. Roux", "Salle trop bruyante", "Changement de salle", "24h", "✅ Clôturé"], ["5", "05/06/2024", "Mme Lambert", "Retard convocation", "Excuses + envoi express", "12h", "✅ Clôturé"]]
  }, sections: [{ heading: "Bilan", content: "<p>5 réclamations en 2024 (vs 8 en 2023) – 100% traitées sous 48h – Satisfaction post-traitement : 4.5/5</p>", variant: "green" }] });
}

function genProcedureReclamation(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "GESTION DES RÉCLAMATIONS, DES DYSFONCTIONNEMENTS, ALÉAS ET PLAN D'AMÉLIORATION CONTINUE", sections: [
    { heading: "Procédure", content: `<p>L'organisme de formation enregistre et gère les réclamations de tiers et les dysfonctionnements internes.</p><p>Chaque réclamation (qu'elle soit exprimée par téléphone, mail, courrier ou tout autre moyen) est enregistrée et comprend :</p><ul><li>La date de réclamation</li><li>L'identification de la personne réclamant : nom, fonction, coordonnées</li><li>La formation concernée par le sujet (intitulé, date et lieu)</li><li>L'objet de la réclamation</li></ul><p>L'organisme de formation accuse réception de la réclamation par mail dans un délai de <strong>48H</strong>.</p><p>La réclamation est traitée dans le cadre de la gestion des dysfonctionnements.</p><p>Une réponse écrite par mail ou courrier est adressée au réclamant dans un délai de <strong>8 jours maximum</strong>.</p><p>L'organisme de formation analyse chaque dysfonctionnement, quelle qu'en soit la source afin de déterminer les actions d'amélioration à mettre en œuvre, le délai de réalisation et le responsable de l'action.</p>` },
  ], table: {
    headers: ["Formation concernée (intitulé, date, lieu)", "Objet de la réclamation, dysfonctionnement, aléa", "Personne réclamant (nom, fonction, coordonnées)", "Date de réception", "Date de l'accusé réception", "Référent", "Solutions apportées / actions"],
    rows: [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ]
  } });
}

function genFicheReclamation(o: OrganismeInfo, num: number) {
  const reclamations = [
    { date: "15/01/2024", reclamant: "Martin Dupont", objet: "Problème de connexion à la plateforme LMS", cause: "Mot de passe expiré non renouvelé automatiquement", action: "Réinitialisation immédiate + mise en place d'alertes automatiques", resultat: "Problème résolu en 24h – Stagiaire satisfait" },
    { date: "03/02/2024", reclamant: "Sophie Bernard", objet: "Support de cours incomplet (pages 45-50 manquantes)", cause: "Erreur d'impression", action: "Envoi de la version complète par email + impression corrigée", resultat: "Résolu en 4h – Contrôle qualité renforcé sur les impressions" },
    { date: "22/03/2024", reclamant: "Entreprise GreenTech SA", objet: "Erreur de facturation (TVA appliquée alors qu'exonéré)", cause: "Mauvais paramétrage du compte client", action: "Émission d'un avoir + nouvelle facture conforme", resultat: "Résolu en 48h – Vérification de tous les comptes clients" },
    { date: "10/04/2024", reclamant: "Hugo Roux", objet: "Nuisances sonores dans la salle de formation A1", cause: "Travaux dans l'immeuble voisin", action: "Déplacement en salle C1 (insonorisée)", resultat: "Résolu immédiatement – Demande de planning travaux au syndic" },
    { date: "05/06/2024", reclamant: "Julie Lambert", objet: "Convocation reçue tardivement (2 jours avant)", cause: "Retard dans le processus d'envoi", action: "Excuses + mise en place d'alertes automatiques J-14", resultat: "Procédure améliorée – Plus aucun retard depuis" },
  ];
  const r = reclamations[(num - 1) % reclamations.length];
  return buildDocument({ org: o, title: `FICHE DE TRAITEMENT – RÉCLAMATION N°${num}`, sections: [
    { heading: "Identification", content: `<p><strong>Date :</strong> ${r.date}<br><strong>Réclamant :</strong> ${r.reclamant}<br><strong>Objet :</strong> ${r.objet}</p>` },
    { heading: "Analyse de la cause", content: `<p>${r.cause}</p>` },
    { heading: "Action corrective", content: `<p>${r.action}</p>`, variant: "green" },
    { heading: "Résultat et suivi", content: `<p>${r.resultat}</p>` },
  ], signatures: { type: "2", labels: ["Traité par", "Validé par"], names: [o.referentQualite, o.dirigeant] } });
}

function genSuiviReclamations(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "SUIVI DES RÉCLAMATIONS", table: {
    headers: ["Trimestre", "Nb réclamations", "Délai moyen", "Taux résolution", "Satisfaction post"],
    rows: [["T1 2024", "2", "14h", "100%", "4.5/5"], ["T2 2024", "2", "36h", "100%", "4/5"], ["T3 2024", "1", "12h", "100%", "5/5"], ["T4 2024", "0", "-", "-", "-"]]
  }, sections: [{ heading: "Tendance", content: "<p>Baisse continue du nombre de réclamations : 8 en 2023 → 5 en 2024 (−37%)</p>", variant: "green" }] });
}

function genPlanAmelioration(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PLAN D'ACTIONS D'AMÉLIORATION 2024", table: {
    headers: ["N°", "Action", "Origine", "Responsable", "Échéance", "Statut"],
    rows: [
      ["1", "Mise à jour supports bureautique", "Retours stagiaires", "P. Martin", "T1 2024", "✅ Fait"],
      ["2", "Amélioration plateforme LMS", "Réclamation", "A. Petit", "T1 2024", "✅ Fait"],
      ["3", "Création évaluations interactives", "Innovation pédagogique", "C. Dubois", "T2 2024", "✅ Fait"],
      ["4", "Insonorisation salle A1", "Réclamation", "Service technique", "T2 2024", "✅ Fait"],
      ["5", "Formation formateurs IA", "Veille pédagogique", o.responsablePedagogique, "T3 2024", "✅ Fait"],
      ["6", "Automatisation convocations", "Réclamation", "Admin", "T2 2024", "✅ Fait"],
      ["7", "Nouveau programme marketing digital", "Veille métiers", "A. Petit", "T3 2024", "✅ Fait"],
      ["8", "Audit accessibilité LMS", "Veille réglementaire", o.referentHandicap, "T4 2024", "🔄 En cours"],
    ]
  } });
}

function genFicheAction(o: OrganismeInfo, num: number) {
  const actions = [
    { titre: "Mise à jour des supports bureautique", origine: "Enquêtes de satisfaction – Note supports : 4.2/5", description: "Refonte complète des supports Excel, Word et PowerPoint avec ajout de captures d'écran, exercices corrigés et fiches mémo.", resultat: "Satisfaction supports passée de 4.2 à 4.7/5" },
    { titre: "Amélioration plateforme LMS", origine: "Réclamation n°1 – Problèmes de connexion", description: "Mise à jour Moodle vers version 4.3, amélioration de l'UX, ajout de l'authentification SSO.", resultat: "Zéro réclamation connexion depuis la mise à jour" },
    { titre: "Création d'évaluations interactives", origine: "Veille pédagogique – Gamification", description: "Intégration de Kahoot et H5P pour les évaluations en ligne. Création de quiz interactifs.", resultat: "Engagement stagiaires +25%, satisfaction évaluations +15%" },
    { titre: "Insonorisation salle A1", origine: "Réclamation n°4", description: "Installation de panneaux acoustiques et remplacement des fenêtres.", resultat: "Réduction du bruit de 60%, aucune réclamation depuis" },
    { titre: "Formation formateurs à l'IA", origine: "Veille pédagogique et technologique", description: "Formation de 2 jours pour tous les formateurs sur l'utilisation de l'IA en pédagogie.", resultat: "5/5 formateurs formés, 3 formations intègrent désormais des outils IA" },
    { titre: "Automatisation des convocations", origine: "Réclamation n°5 – Retard d'envoi", description: "Mise en place d'un système automatique d'envoi des convocations J-14 via Digiforma.", resultat: "100% des convocations envoyées à temps, zéro retard" },
    { titre: "Nouveau programme marketing digital", origine: "Veille métiers – Compétences émergentes", description: "Création d'une formation « Marketing Digital et IA » intégrant les dernières tendances.", resultat: "15 inscriptions dès la première session, satisfaction 4.8/5" },
    { titre: "Audit accessibilité LMS", origine: "Veille réglementaire – RGAA 4.1", description: "Audit complet de la plateforme Moodle pour conformité RGAA. Plan de remédiation en cours.", resultat: "En cours – 70% de conformité atteinte" },
  ];
  const a = actions[(num - 1) % actions.length];
  return buildDocument({ org: o, title: `FICHE ACTION N°${num}`, subtitle: a.titre, sections: [
    { heading: "Origine", content: `<p>${a.origine}</p>` },
    { heading: "Description de l'action", content: `<p>${a.description}</p>` },
    { heading: "Résultats obtenus", content: `<p>${a.resultat}</p>`, variant: "green" },
  ] });
}

function genRevueDirection(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "REVUE DE DIRECTION QUALITÉ 2024", sections: [
    { heading: "Participants", content: `<p>${o.dirigeant} (Direction), ${o.responsablePedagogique} (Pédagogie), ${o.referentQualite} (Qualité), ${o.referentHandicap} (Handicap)</p>` },
    { heading: "Bilan des indicateurs", content: "<p>✅ Tous les objectifs qualité 2024 sont atteints<br>✅ 5 réclamations traitées (vs 8 en 2023)<br>✅ 8 actions d'amélioration menées à bien<br>✅ Certification Qualiopi maintenue</p>", variant: "green" },
    { heading: "Décisions prises", content: "<p>1. Augmentation du budget formation formateurs de 20%<br>2. Investissement dans un nouveau LMS<br>3. Création de 5 nouvelles formations<br>4. Recrutement d'un assistant qualité</p>" },
    { heading: "Objectifs 2025", content: "<p>• Satisfaction ≥ 98%<br>• Réussite ≥ 90%<br>• 600 stagiaires<br>• Zéro réclamation non traitée sous 24h</p>" },
  ], signatures: { type: "2", labels: ["Le Dirigeant", "Le Référent Qualité"], names: [o.dirigeant, o.referentQualite] } });
}

function genTableauSuiviActions(o: OrganismeInfo, trimestre: string) {
  return buildDocument({ org: o, title: "TABLEAU DE SUIVI DES ACTIONS", subtitle: trimestre, table: {
    headers: ["Action", "Responsable", "Échéance", "Avancement", "Statut"],
    rows: [["Mise à jour supports", "P. Martin", "31/03", "100%", "✅ Terminé"], ["Audit LMS", o.referentHandicap, "30/06", "70%", "🔄 En cours"], ["Formation IA", o.responsablePedagogique, "30/09", "100%", "✅ Terminé"], ["Nouveau programme", "A. Petit", "31/12", "85%", "🔄 En cours"]]
  } });
}

function genBilanActions(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "BILAN ANNUEL DES ACTIONS D'AMÉLIORATION", sections: [
    { heading: "Synthèse 2024", content: "<p>• 8 actions planifiées<br>• 7 actions réalisées (87.5%)<br>• 1 action en cours de finalisation<br>• Budget consommé : 95% du prévisionnel</p>" },
    { heading: "Impact mesurable", content: "<p>• Satisfaction : +2 points (95% → 97%)<br>• Réclamations : -37% (8 → 5)<br>• Délai de traitement : -40%<br>• Taux de réussite : +4 points (85% → 89%)</p>", variant: "green" },
  ] });
}

function genAuditInterne(o: OrganismeInfo, semestre: string) {
  return buildDocument({ org: o, title: "RAPPORT D'AUDIT INTERNE", subtitle: semestre, table: {
    headers: ["Critère", "Conformité", "Observations", "Action"],
    rows: [["C1 – Information", "✅ Conforme", "Documentation à jour", "Aucune"], ["C2 – Objectifs", "✅ Conforme", "Programmes actualisés", "Aucune"], ["C3 – Accompagnement", "✅ Conforme", "Suivi rigoureux", "Aucune"], ["C4 – Moyens", "✅ Conforme", "Matériel en bon état", "Prévoir remplacement PC 2025"], ["C5 – Formateurs", "✅ Conforme", "CV et compétences à jour", "Aucune"], ["C6 – Veille", "✅ Conforme", "Veille active", "Aucune"], ["C7 – Amélioration", "✅ Conforme", "Démarche structurée", "Aucune"]]
  }, sections: [{ heading: "Conclusion", content: "<p><strong>Résultat : 100% de conformité</strong>. L'organisme satisfait à l'ensemble des exigences du RNQ. Aucune non-conformité relevée.</p>", variant: "green" }],
    signatures: { type: "2", labels: ["L'Auditeur interne", "Le Dirigeant"], names: [o.referentQualite, o.dirigeant] } });
}

function genIndicateursPerformance(o: OrganismeInfo, formations: FormationInfo[], stagiaires: StagiaireInfo[]) {
  const f = formations[0];
  const mois = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  const rawDate = f?.dateDebut || f?.dateFin || "";
  const parsedDate = rawDate ? new Date(rawDate + "T00:00:00") : null;
  const annee = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.getFullYear() : new Date().getFullYear();
  const moisFormation = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.getMonth() : -1;
  const nbStagiaires = stagiaires.filter(s => s.nom && s.nom.trim()).length || 1;

  let tableHtml = `<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:10px">
    <tr style="background:#1e3a7b;color:#fff"><th>Action de formation</th><th>Indicateur</th>`;
  mois.forEach(m => { tableHtml += `<th>${m}-${String(annee).slice(2)}</th>`; });
  tableHtml += `<th>Commentaires / analyse</th></tr>`;
  tableHtml += `<tr><td rowspan="2">${f?.intitule || o.nom}</td><td>Taux de satisfaction appréciation des bénéficiaires</td>`;
  mois.forEach((_, i) => { tableHtml += `<td>${i === moisFormation ? "100%" : ""}</td>`; });
  tableHtml += `<td style="font-size:9px">${f?.intitule || o.nom} a reçu ${nbStagiaires} stagiaire${nbStagiaires > 1 ? "s" : ""} pour l'année ${annee}. Nous avons été noté 10/10 sur le taux de satisfaction pour l'année ${annee} au critère 7.30.</td></tr>`;
  tableHtml += `<tr><td>Nombre de stagiaires</td>`;
  mois.forEach((_, i) => { tableHtml += `<td>${i === moisFormation ? nbStagiaires : ""}</td>`; });
  tableHtml += `<td></td></tr></table>`;
  tableHtml += `<p style="margin-top:12px;font-style:italic;color:#666">⚠️ Ce document est généré au format Excel (.xls) dans le dossier ZIP exporté.</p>`;

  return buildDocument({ org: o, title: `TABLEAU DE BORD INDICATEURS DE PERFORMANCE – ${annee}`, extraHtml: tableHtml });
}

function genRapportAmelioration(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "RAPPORT D'AMÉLIORATION CONTINUE 2024", sections: [
    { heading: "Démarche", content: `<p>${o.nom} s'inscrit dans une démarche d'amélioration continue structurée autour du cycle PDCA (Plan-Do-Check-Act), conformément aux exigences du RNQ.</p>` },
    { heading: "Résultats clés", content: "<p>• 8 actions d'amélioration menées<br>• 87.5% de taux de réalisation<br>• Progression de tous les indicateurs clés<br>• 2 audits internes réalisés (conformité 100%)</p>", variant: "green" },
    { heading: "Enseignements", content: "<p>Les principaux leviers d'amélioration identifiés sont :<br>• L'écoute active des retours stagiaires<br>• La veille pédagogique et technologique<br>• L'investissement dans la formation des formateurs<br>• La dématérialisation des processus</p>" },
    { heading: "Perspectives 2025", content: "<p>• Déploiement de l'IA dans les parcours de formation<br>• Certification RS pour 3 formations<br>• Expansion de l'offre e-learning<br>• Renforcement des partenariats OPCO</p>" },
  ], signatures: { type: "2", labels: ["Le Référent Qualité", "Le Dirigeant"], names: [o.referentQualite, o.dirigeant] } });
}

// ============== CFA / APPRENTISSAGE ==============

function genContratApprentissage(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "Martin", nom: "Dupont", entreprise: "Tech Solutions SAS" };
  return buildDocument({ org: o, title: "CONTRAT D'APPRENTISSAGE", subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "Parties", content: `<p><strong>Employeur :</strong> ${s.entreprise}<br><strong>Apprenti(e) :</strong> ${s.prenom} ${s.nom}<br><strong>CFA :</strong> ${o.nom}<br><strong>Formation :</strong> ${f.intitule}</p>` },
    { heading: "Durée du contrat", content: `<p>Du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}<br>Durée de la formation : ${f.duree}<br>Rythme d'alternance : 3 jours en entreprise / 2 jours en CFA</p>` },
    { heading: "Rémunération", content: "<p>Selon les dispositions légales et conventionnelles en vigueur, conformément à l'article D.6222-26 du Code du travail.</p>" },
    { heading: "Obligations", content: "<p><strong>L'employeur s'engage à :</strong><br>• Assurer la formation pratique de l'apprenti<br>• Désigner un maître d'apprentissage<br>• Permettre à l'apprenti de suivre la formation au CFA<br><br><strong>L'apprenti s'engage à :</strong><br>• Suivre assidûment la formation<br>• Respecter le règlement intérieur<br>• Participer aux évaluations</p>" },
  ], signatures: { type: "3", names: [s.prenom + " " + s.nom, f.formateur] } });
}

function genLivretApprentissageCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "Martin", nom: "Dupont", entreprise: "Tech Solutions SAS" };
  return buildDocument({ org: o, title: "LIVRET D'APPRENTISSAGE", subtitle: `${s.prenom} ${s.nom} – ${f.intitule}`, formation: f, showFormationInfo: true, sections: [
    { heading: "Parcours d'alternance", content: `<p><strong>Apprenti(e) :</strong> ${s.prenom} ${s.nom}<br><strong>Entreprise :</strong> ${s.entreprise}<br><strong>Maître d'apprentissage :</strong> ${f.formateur}<br><strong>Tuteur CFA :</strong> ${o.responsablePedagogique}</p>` },
    { heading: "Compétences acquises en entreprise", content: "<p>☑ Compétence 1 : Application des savoirs théoriques – <strong>Acquis</strong><br>☑ Compétence 2 : Travail en équipe – <strong>Acquis</strong><br>☑ Compétence 3 : Autonomie professionnelle – <strong>En cours</strong><br>☑ Compétence 4 : Gestion de projet – <strong>En cours</strong></p>" },
    { heading: "Compétences acquises au CFA", content: "<p>☑ Module 1 : Fondamentaux – <strong>Validé (8/10)</strong><br>☑ Module 2 : Spécialisation – <strong>Validé (7.5/10)</strong><br>☑ Module 3 : Projet – <strong>En cours</strong></p>" },
    { heading: "Observations", content: "<p>L'apprenti fait preuve d'une bonne progression. Les compétences attendues se développent conformément au référentiel. Le lien théorie/pratique est bien établi.</p>", variant: "green" },
  ], signatures: { type: "3", names: [s.prenom + " " + s.nom, f.formateur] } });
}

function genFicheMaitreApprentissage(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "FICHE MAÎTRE D'APPRENTISSAGE", subtitle: f.intitule, sections: [
    { heading: "Identité", content: `<p><strong>Nom :</strong> ${f.formateur}<br><strong>Entreprise :</strong> Tech Solutions SAS<br><strong>Fonction :</strong> Responsable de département<br><strong>Expérience :</strong> 10 ans dans le métier</p>` },
    { heading: "Qualifications", content: "<p>• Diplôme de niveau Bac+5 dans le domaine<br>• Formation de maître d'apprentissage (14h)<br>• Expérience d'encadrement d'apprentis : 5 ans</p>" },
    { heading: "Missions", content: "<p>• Accueillir l'apprenti dans l'entreprise<br>• Organiser le parcours d'apprentissage en entreprise<br>• Accompagner l'apprenti dans l'acquisition des compétences<br>• Assurer le lien avec le CFA<br>• Participer aux évaluations</p>" },
  ], signatures: { type: "2", labels: ["Le Maître d'apprentissage", "Le Responsable RH"], names: [f.formateur, "Marie Lecomte"] } });
}

function genSuiviEntrepriseCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const rows = stagiaires.slice(0, 5).map((s, i) => [s.prenom + " " + s.nom, s.entreprise, i % 2 === 0 ? "Visite réalisée" : "Visite planifiée", `${7 + (i % 3)}/10`, i < 3 ? "✅ Satisfaisant" : "🔄 En progression"]);
  return buildDocument({ org: o, title: "SUIVI EN ENTREPRISE", subtitle: f.intitule, table: {
    headers: ["Apprenti", "Entreprise", "Visite", "Note tuteur", "Appréciation"], rows
  } });
}

function genCompetencesAlternance(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  return buildDocument({ org: o, title: "GRILLE DE COMPÉTENCES ALTERNANCE", subtitle: f.intitule, table: {
    headers: ["Compétence", "CFA", "Entreprise", "Acquis", "Niveau"],
    rows: [
      ["C1 – Fondamentaux métier", "Module 1", "Observation", "✅", "Maîtrisé"],
      ["C2 – Techniques spécialisées", "Module 2", "Pratique guidée", "✅", "Acquis"],
      ["C3 – Gestion de projet", "Module 3", "Projet tutoré", "🔄", "En cours"],
      ["C4 – Communication professionnelle", "Transversal", "Réunions client", "✅", "Acquis"],
      ["C5 – Autonomie", "Évaluation", "Mission autonome", "🔄", "En cours"],
    ]
  } });
}

// ============== BILAN DE COMPÉTENCES ==============

function genAnalyseParcoursPro(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "Martin", nom: "Dupont", poste: "Comptable", entreprise: "Tech Solutions SAS" };
  return buildDocument({ org: o, title: "ANALYSE DU PARCOURS PROFESSIONNEL", subtitle: `Bilan de compétences – ${s.prenom} ${s.nom}`, sections: [
    { heading: "Identité", content: `<p><strong>Nom :</strong> ${s.prenom} ${s.nom}<br><strong>Poste actuel :</strong> ${s.poste}<br><strong>Entreprise :</strong> ${s.entreprise}<br><strong>Années d'expérience :</strong> 12 ans</p>` },
    { heading: "Parcours professionnel", content: "<p>• 2012-2016 : Assistant comptable – Cabinet Fiduciaire<br>• 2016-2019 : Comptable – Groupe Industriel<br>• 2019-2024 : Comptable senior – Tech Solutions SAS</p>" },
    { heading: "Compétences identifiées", content: "<p><strong>Savoir-faire :</strong><br>• Maîtrise de la comptabilité générale et analytique<br>• Gestion de trésorerie<br>• Déclarations fiscales et sociales<br>• Utilisation avancée des ERP<br><br><strong>Savoir-être :</strong><br>• Rigueur et organisation<br>• Esprit d'analyse<br>• Communication<br>• Adaptabilité</p>", variant: "green" },
    { heading: "Aspirations", content: "<p>Évolution vers un poste de Responsable Administratif et Financier (RAF) ou reconversion vers le conseil en gestion d'entreprise.</p>" },
  ], signatures: { type: "2", labels: ["Le Conseiller bilan", "Le Bénéficiaire"], names: [o.responsablePedagogique, s.prenom + " " + s.nom] } });
}

function genPlanActionBilan(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "Martin", nom: "Dupont" };
  return buildDocument({ org: o, title: "PLAN D'ACTION PROFESSIONNEL", subtitle: `${s.prenom} ${s.nom}`, sections: [
    { heading: "Projet retenu", content: "<p><strong>Projet principal :</strong> Évolution vers un poste de Responsable Administratif et Financier<br><strong>Projet alternatif :</strong> Création d'un cabinet de conseil en gestion</p>" },
    { heading: "Actions à court terme (0-3 mois)", content: "<p>1. Formation en management d'équipe (28h)<br>2. Mise à jour du CV et profil LinkedIn<br>3. Prise de contact avec le réseau professionnel</p>" },
    { heading: "Actions à moyen terme (3-12 mois)", content: "<p>4. Certification DSCG (si projet RAF)<br>5. Stage ou mission de consulting<br>6. Candidatures ciblées</p>", variant: "green" },
    { heading: "Ressources mobilisables", content: "<p>• CPF : 4 500€ disponibles<br>• Employeur : plan de développement des compétences<br>• Réseau : 3 contacts identifiés dans le secteur</p>" },
  ], signatures: { type: "2", labels: ["Le Conseiller", "Le Bénéficiaire"], names: [o.responsablePedagogique, s.prenom + " " + s.nom] } });
}

function genSyntheseBilan(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "Martin", nom: "Dupont" };
  return buildDocument({ org: o, title: "SYNTHÈSE DU BILAN DE COMPÉTENCES", subtitle: `${s.prenom} ${s.nom}`, sections: [
    { heading: "Contexte", content: `<p>Bilan réalisé du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)} – ${f.duree}<br>Conseiller : ${o.responsablePedagogique}</p>` },
    { heading: "Compétences clés identifiées", content: "<p>• Expertise comptable et financière (niveau expert)<br>• Management : potentiel identifié, formation nécessaire<br>• Communication : bon niveau, à renforcer en anglais<br>• Digital : niveau intermédiaire, formation recommandée</p>" },
    { heading: "Projet professionnel validé", content: "<p>Évolution vers un poste de RAF dans une PME/ETI, avec un plan de formation ciblé sur le management et le contrôle de gestion.</p>", variant: "green" },
    { heading: "Engagement", content: "<p>Le bénéficiaire s'engage à mettre en œuvre les actions définies dans le plan d'action et à effectuer un point de suivi à 6 mois.</p>" },
  ], signatures: { type: "2", labels: ["Le Conseiller", "Le Bénéficiaire"], names: [o.responsablePedagogique, s.prenom + " " + s.nom] } });
}

// ============== VAE ==============

function genLivretRecevabilite(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "Martin", nom: "Dupont", poste: "Comptable" };
  return buildDocument({ org: o, title: "LIVRET DE RECEVABILITÉ – VAE", subtitle: `${s.prenom} ${s.nom}`, sections: [
    { heading: "Candidat", content: `<p><strong>Nom :</strong> ${s.prenom} ${s.nom}<br><strong>Poste actuel :</strong> ${s.poste}<br><strong>Certification visée :</strong> ${f.intitule}</p>` },
    { heading: "Expérience professionnelle", content: "<p>Durée totale d'expérience en lien avec la certification : <strong>8 ans</strong><br><br>Employeur 1 : Cabinet Fiduciaire (2012-2016) – Assistant comptable<br>Employeur 2 : Groupe Industriel (2016-2019) – Comptable<br>Employeur 3 : Tech Solutions SAS (2019-2024) – Comptable senior</p>" },
    { heading: "Activités en lien avec la certification", content: "<p>• Tenue de la comptabilité générale et auxiliaire<br>• Établissement des déclarations fiscales<br>• Gestion de la trésorerie<br>• Clôture des comptes annuels<br>• Reporting financier</p>", variant: "green" },
    { heading: "Décision de recevabilité", content: "<p>☑ <strong>Recevable</strong> – Le candidat justifie d'une expérience suffisante en lien direct avec la certification visée.</p>" },
  ], signatures: { type: "2", labels: ["Le Responsable VAE", "Le Candidat"], names: [o.responsablePedagogique, s.prenom + " " + s.nom] } });
}

function genDossierValidation(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "Martin", nom: "Dupont" };
  return buildDocument({ org: o, title: "DOSSIER DE VALIDATION – VAE", subtitle: `${s.prenom} ${s.nom} – ${f.intitule}`, sections: [
    { heading: "Présentation du candidat", content: `<p>${s.prenom} ${s.nom} présente son dossier de validation pour la certification « ${f.intitule} ». Ce dossier détaille les activités professionnelles réalisées en lien avec chaque bloc de compétences du référentiel.</p>` },
    { heading: "Bloc 1 – Compétences fondamentales", content: "<p><strong>Activité décrite :</strong> Gestion complète de la comptabilité d'une PME de 50 salariés.<br><strong>Preuves :</strong> Bilans, grand livre, déclarations fiscales<br><strong>Évaluation :</strong> ✅ Validé</p>", variant: "green" },
    { heading: "Bloc 2 – Compétences spécialisées", content: "<p><strong>Activité décrite :</strong> Mise en place d'un contrôle de gestion et de tableaux de bord financiers.<br><strong>Preuves :</strong> Tableaux de bord, rapports d'analyse<br><strong>Évaluation :</strong> ✅ Validé</p>", variant: "green" },
    { heading: "Bloc 3 – Compétences transversales", content: "<p><strong>Activité décrite :</strong> Coordination avec les équipes, reporting à la direction, formation des juniors.<br><strong>Preuves :</strong> Comptes-rendus, mails, attestation employeur<br><strong>Évaluation :</strong> ✅ Validé</p>", variant: "green" },
    { heading: "Décision du jury", content: "<p><strong>Validation totale</strong> – L'ensemble des blocs de compétences est validé. La certification est attribuée.</p>" },
  ], signatures: { type: "2", labels: ["Le Président du jury", "Le Candidat"], names: [o.dirigeant, s.prenom + " " + s.nom] } });
}

function genAccompagnementVAE(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "Martin", nom: "Dupont" };
  return buildDocument({ org: o, title: "SUIVI D'ACCOMPAGNEMENT VAE", subtitle: `${s.prenom} ${s.nom}`, table: {
    headers: ["Séance", "Date", "Thème", "Durée", "Avancement"],
    rows: [
      ["1", "10/01/2024", "Présentation démarche VAE et analyse du référentiel", "2h", "✅"],
      ["2", "24/01/2024", "Identification des activités et compétences", "2h", "✅"],
      ["3", "07/02/2024", "Rédaction du Bloc 1", "3h", "✅"],
      ["4", "21/02/2024", "Rédaction du Bloc 2", "3h", "✅"],
      ["5", "06/03/2024", "Rédaction du Bloc 3 et annexes", "3h", "✅"],
      ["6", "20/03/2024", "Relecture globale et préparation jury", "2h", "✅"],
      ["7", "03/04/2024", "Simulation passage devant le jury", "2h", "✅"],
    ]
  }, sections: [{ heading: "Bilan", content: `<p>Accompagnement de 17 heures réalisé sur 3 mois. Le candidat est prêt pour le passage devant le jury.</p>`, variant: "green" }],
    signatures: { type: "2", labels: ["L'Accompagnateur VAE", "Le Candidat"], names: [o.responsablePedagogique, s.prenom + " " + s.nom] } });
}

// ============== NOUVEAUX TEMPLATES AF (Drive SKILLORA) ==============

function genProcedureFormationFC(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE DE FORMATION – FC", sections: [
    { heading: "Objet", content: `<p>Cette procédure décrit le processus complet de réalisation d'une action de formation continue au sein de ${o.nom}, de la demande initiale jusqu'au suivi post-formation.</p>` },
    { heading: "Étape 1 – Réception de la demande", content: "<p>• Réception de la demande (téléphone, email, formulaire en ligne)<br>• Identification du besoin et du public cible<br>• Vérification des prérequis<br>• Attribution d'un interlocuteur dédié</p>" },
    { heading: "Étape 2 – Analyse et proposition", content: "<p>• Analyse approfondie du besoin avec le demandeur<br>• Élaboration du programme adapté<br>• Envoi du devis et du programme détaillé<br>• Délai de réponse : 48h maximum</p>" },
    { heading: "Étape 3 – Inscription et contractualisation", content: "<p>• Réception du bulletin d'inscription signé<br>• Envoi de la convention de formation<br>• Demande de prise en charge OPCO si applicable<br>• Confirmation d'inscription au stagiaire</p>" },
    { heading: "Étape 4 – Préparation pédagogique", content: "<p>• Envoi de la convocation (J-15 minimum)<br>• Envoi du questionnaire de positionnement<br>• Préparation des supports et de la salle<br>• Briefing du formateur</p>" },
    { heading: "Étape 5 – Réalisation", content: "<p>• Accueil des stagiaires, tour de table<br>• Émargement quotidien<br>• Évaluations formatives en continu<br>• Évaluation finale (QCM, cas pratique)</p>" },
    { heading: "Étape 6 – Clôture et suivi", content: "<p>• Questionnaire de satisfaction à chaud<br>• Remise des attestations de formation<br>• Envoi du certificat de réalisation<br>• Enquête de satisfaction à froid (J+30)<br>• Suivi post-formation (J+90)</p>" },
  ] });
}

function genDossierInscription(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "___", nom: "___", email: "___", telephone: "___", entreprise: "___", poste: "___", dateNaissance: "" };
  return buildDocument({ org: o, title: "DOSSIER D'INSCRIPTION", subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "Informations du candidat", content: `<p><strong>Nom :</strong> ${s.nom}<br><strong>Prénom :</strong> ${s.prenom}<br><strong>Date de naissance :</strong> ${formatDate(s.dateNaissance)}<br><strong>Email :</strong> ${s.email}<br><strong>Téléphone :</strong> ${s.telephone}<br><strong>Entreprise :</strong> ${s.entreprise}<br><strong>Poste :</strong> ${s.poste}</p>` },
    { heading: "Pièces à fournir", content: "<p>☐ Pièce d'identité en cours de validité<br>☐ CV actualisé<br>☐ Lettre de motivation ou projet professionnel<br>☐ Justificatif de domicile de moins de 3 mois<br>☐ Attestation employeur ou convention de stage si applicable<br>☐ Accord de prise en charge OPCO (si financement OPCO)</p>" },
    { heading: "Déclaration sur l'honneur", content: `<p>Je soussigné(e) ${s.prenom} ${s.nom}, certifie l'exactitude des informations fournies dans ce dossier et m'engage à respecter le règlement intérieur de ${o.nom}.</p>` },
  ], signatures: { type: "2", labels: ["Le/La Candidat(e)", "Pour l'organisme"], names: [`${s.prenom} ${s.nom}`, o.dirigeant] } });
}

function genMailRenseignement(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "MAIL TYPE – RENSEIGNEMENT CANDIDAT", sections: [
    { heading: "Objet : Votre demande de renseignement – " + f.intitule, content: `<p>Madame, Monsieur,</p><p>Nous avons bien reçu votre demande de renseignement concernant notre formation « ${f.intitule} ».</p><p>Voici les informations principales :</p><p>• <strong>Durée :</strong> ${f.duree}<br>• <strong>Modalité :</strong> ${f.modalites}<br>• <strong>Tarif :</strong> ${f.tarif}<br>• <strong>Prérequis :</strong> ${f.prerequis}<br>• <strong>Délai d'accès :</strong> ${f.delaiAcces}</p><p>N'hésitez pas à nous contacter pour toute question complémentaire ou pour convenir d'un entretien de positionnement.</p><p>Cordialement,<br>${o.dirigeant}<br>${o.nom}<br>${o.telephone} – ${o.email}</p>` },
  ] });
}

function genMailAideConnexion(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "MAIL TYPE – AIDE À LA CONNEXION", sections: [
    { heading: "Objet : Aide à la connexion – Formation " + f.intitule, content: `<p>Bonjour,</p><p>Votre formation « ${f.intitule} » se déroulera en modalité ${f.modalites}. Voici les informations de connexion :</p><p><strong>Plateforme :</strong> ${(o as any).outilsUtilises || "Moodle LMS"}<br><strong>Lien :</strong> [lien de connexion à insérer]<br><strong>Identifiant :</strong> votre adresse email<br><strong>Mot de passe :</strong> envoyé séparément</p><p><strong>En cas de difficulté :</strong></p><p>1. Vérifiez votre connexion internet<br>2. Utilisez un navigateur récent (Chrome, Firefox, Edge)<br>3. Videz le cache de votre navigateur<br>4. Contactez notre support technique : ${o.email} ou ${o.telephone}</p><p>Cordialement,<br>L'équipe ${o.nom}</p>` },
  ] });
}

function genProcedureAbandon(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE DE GESTION DES ABANDONS", sections: [
    { heading: "Objet", content: `<p>Cette procédure définit les modalités de gestion des abandons de formation au sein de ${o.nom}.</p>` },
    { heading: "Définition de l'abandon", content: "<p>Est considéré comme un abandon toute cessation définitive de la formation avant son terme, quelle qu'en soit la raison (personnelle, professionnelle, médicale, insatisfaction).</p>" },
    { heading: "Détection et alerte", content: "<p>• Suivi quotidien des absences (émargement ou connexion)<br>• Alerte dès 2 absences consécutives non justifiées<br>• Contact téléphonique dans les 24h<br>• Entretien individuel proposé sous 48h</p>" },
    { heading: "Traitement", content: "<p>1. Entretien avec le stagiaire pour comprendre les raisons<br>2. Recherche de solutions alternatives (report, aménagement, accompagnement)<br>3. Si abandon confirmé : formalisation par écrit<br>4. Information de l'employeur et/ou du financeur<br>5. Attestation d'assiduité partielle<br>6. Enregistrement dans le registre des abandons</p>" },
    { heading: "Suivi post-abandon", content: "<p>• Contact à 1 mois pour proposer un accompagnement<br>• Proposition de reprise si possible<br>• Analyse des causes pour prévention</p>" },
    { heading: "Indicateurs", content: "<p>• Taux d'abandon par formation<br>• Causes principales identifiées<br>• Taux de reprise après abandon<br>• Actions préventives mises en œuvre</p>", variant: "green" },
  ] });
}

function genProcedureAbsences(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE DE GESTION DES ABSENCES", sections: [
    { heading: "Objet", content: `<p>Cette procédure organise le suivi et la gestion des absences des stagiaires/apprentis au sein de ${o.nom}.</p>` },
    { heading: "Types d'absences", content: "<p>• <strong>Absence justifiée :</strong> maladie (certificat médical), événement familial, convocation officielle<br>• <strong>Absence injustifiée :</strong> toute absence sans motif valable ni justificatif<br>• <strong>Retard :</strong> arrivée postérieure à l'heure prévue de début</p>" },
    { heading: "Procédure de signalement", content: "<p>1. Le stagiaire prévient par téléphone ou email avant le début du cours<br>2. Le formateur note l'absence sur la feuille d'émargement<br>3. Le secrétariat enregistre l'absence dans le tableau de suivi<br>4. Le justificatif doit être fourni sous 48h</p>" },
    { heading: "Actions en cas d'absences répétées", content: "<p>• 2 absences : rappel par email<br>• 3 absences : convocation avec le responsable pédagogique<br>• 5+ absences injustifiées : avertissement écrit, information du financeur<br>• Au-delà : exclusion possible selon le règlement intérieur</p>", variant: "orange" },
    { heading: "Centralisation", content: "<p>Toutes les absences sont centralisées dans un tableau de suivi unique, mis à jour quotidiennement par le secrétariat pédagogique.</p>" },
  ] });
}

function genFormulaireReclamation(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "FORMULAIRE DE DÉPÔT DE RÉCLAMATION", sections: [
    { heading: "Informations du réclamant", content: "<p><strong>Nom :</strong> ………………………………………………………………..<br><strong>Prénom :</strong> ………………………………………………………………<br><strong>Date de naissance :</strong> …………………………………………………<br><strong>Adresse :</strong> ………………………………………………………………<br><strong>Téléphone :</strong> ……………………………………………………………<br><strong>Mail :</strong> ……………………………………………………………………</p>" },
    { heading: "Formation concernée", content: "<p><strong>Date de la formation :</strong> …………………………………………………<br><strong>Intitulé de la formation :</strong> …………………………………………………</p>" },
    { heading: "Description de la réclamation", content: "<p>Veuillez détailler de manière la plus précise possible votre réclamation :</p><p>……………………………………………………………………………………………………………</p><p>………………………………………………………………………………………………………</p><p>……………………………………………………………………………………………………………</p><p>………………………………………………………………………………………………………</p><p>……………………………………………………………………………………………………………</p><p>………………………………………………………………………………………………………</p>" },
    { heading: "Autorisation", content: `<p>J'autorise le centre de formation ${o.nom} à conserver ce formulaire pour améliorer la qualité des prestations de ses formations et à reprendre contact avec moi afin d'avoir de plus amples informations :</p><p>☐ Oui &nbsp;&nbsp;&nbsp;&nbsp; ☐ Non</p>` },
  ] });
}

function genTableauDysfonctionnements(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "TABLEAU DES DYSFONCTIONNEMENTS", table: {
    headers: ["N°", "Date", "Nature du dysfonctionnement", "Gravité", "Action corrective", "Responsable", "Délai", "Statut"],
    rows: [
      ["1", "15/01/2024", "Retard livraison supports de cours", "Modérée", "Commande anticipée J-10", o.responsablePedagogique, "Immédiat", "✅ Clôturé"],
      ["2", "28/02/2024", "Panne vidéoprojecteur salle A1", "Mineure", "Remplacement et maintenance préventive", "Service technique", "48h", "✅ Clôturé"],
      ["3", "15/03/2024", "Problème connexion plateforme LMS", "Majeure", "Migration serveur, test de charge", "DSI", "1 semaine", "✅ Clôturé"],
      ["4", "02/04/2024", "Absence formateur non remplacée", "Majeure", "Constitution vivier formateurs de remplacement", o.responsablePedagogique, "1 mois", "✅ Clôturé"],
      ["5", "20/05/2024", "Erreur facturation client", "Mineure", "Double vérification avant envoi", "Comptabilité", "Immédiat", "✅ Clôturé"],
    ]
  } });
}

function genTableauSyntheseAmelioration(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "TABLEAU DE SYNTHÈSE ET RÉFLEXIONS D'AMÉLIORATION", sections: [
    { heading: "Analyse globale", content: "<p>Ce document synthétise les axes d'amélioration identifiés à partir des enquêtes de satisfaction, des réclamations, des dysfonctionnements et des audits internes réalisés sur la période.</p>" },
  ], table: {
    headers: ["Axe d'amélioration", "Source", "Action planifiée", "Priorité", "Échéance", "Indicateur de suivi", "Statut"],
    rows: [
      ["Améliorer le taux de réponse aux enquêtes à froid", "Analyse satisfaction", "Relance automatisée J+30 et J+45", "Haute", "T2 2024", "Taux de retour ≥ 60%", "✅ En cours"],
      ["Renforcer l'accompagnement handicap", "Audit interne", "Formation référent handicap + réseau partenaires", "Haute", "T1 2024", "100% des formateurs sensibilisés", "✅ Fait"],
      ["Moderniser les supports de cours", "Retours stagiaires", "Refonte supports Excel et Management", "Moyenne", "T3 2024", "Satisfaction supports ≥ 4.5/5", "🔄 En cours"],
      ["Réduire le délai de réponse aux réclamations", "Registre réclamations", "Process dédié, outil de ticketing", "Haute", "T2 2024", "Délai moyen < 48h", "✅ Fait"],
      ["Développer l'offre distancielle", "Veille pédagogique", "Création de 5 modules e-learning", "Moyenne", "T4 2024", "5 modules créés", "📋 Planifié"],
    ]
  } });
}

function genGrilleRecrutementFormateur(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "GRILLE DE RECRUTEMENT FORMATEUR/FORMATRICE", table: {
    headers: ["Critère d'évaluation", "Pondération", "Note /5", "Commentaire"],
    rows: [
      ["Diplômes et qualifications", "20%", "", ""],
      ["Expérience professionnelle dans le domaine", "20%", "", ""],
      ["Expérience en formation / pédagogie", "15%", "", ""],
      ["Maîtrise des outils numériques (LMS, visio)", "10%", "", ""],
      ["Capacité d'adaptation aux publics", "10%", "", ""],
      ["Compétences relationnelles et communication", "10%", "", ""],
      ["Connaissance du référentiel Qualiopi", "5%", "", ""],
      ["Disponibilité et flexibilité", "5%", "", ""],
      ["Références professionnelles", "5%", "", ""],
      ["<strong>SCORE TOTAL</strong>", "<strong>100%</strong>", "<strong>/5</strong>", ""],
    ]
  }, sections: [
    { heading: "Décision", content: "<p>☐ Retenu(e) – Intégration dans le vivier formateurs<br>☐ En attente – Compléments demandés<br>☐ Non retenu(e) – Motif : ________________________________</p>" },
  ], signatures: { type: "2", labels: ["Le Responsable pédagogique", "Le Dirigeant"], names: [o.responsablePedagogique, o.dirigeant] } });
}

function genProcessRecrutementFormateur(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCESSUS DE RECRUTEMENT FORMATEUR – 7 PALIERS", sections: [
    { heading: "Palier 1 – Sourcing", content: "<p>Identification des candidats via : réseaux professionnels (LinkedIn), recommandations, partenariats écoles, candidatures spontanées, anciens stagiaires devenus experts.</p>" },
    { heading: "Palier 2 – Présélection", content: "<p>Analyse du CV et de la lettre de motivation. Vérification des diplômes et certifications. Contrôle des références professionnelles.</p>" },
    { heading: "Palier 3 – Entretien téléphonique", content: "<p>Échange de 20-30 min : motivation, disponibilité, expérience, attentes. Présentation de l'organisme et des valeurs.</p>" },
    { heading: "Palier 4 – Entretien en présentiel", content: "<p>Entretien approfondi avec le responsable pédagogique : compétences techniques, pédagogie, mise en situation, test de présentation.</p>" },
    { heading: "Palier 5 – Animation test", content: "<p>Séquence pédagogique de 30 min devant un jury interne. Évaluation : clarté, interactivité, gestion du temps, supports utilisés.</p>" },
    { heading: "Palier 6 – Validation", content: "<p>Grille de recrutement remplie. Décision collégiale (dirigeant + responsable pédagogique). Notification au candidat sous 5 jours.</p>" },
    { heading: "Palier 7 – Intégration", content: "<p>Formation aux outils internes (LMS, procédures qualité). Remise du kit formateur. Tutorat avec un formateur senior pendant 1 mois. Évaluation à 3 mois.</p>", variant: "green" },
  ] });
}

function genProcedureRecrutementFormateur(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE DE RECRUTEMENT FORMATEUR/FORMATRICE", sections: [
    { heading: "Objet", content: `<p>Définir le processus de recrutement des formateurs/formatrices intervenant pour ${o.nom}, garantissant la qualité et l'adéquation des compétences.</p>` },
    { heading: "Profil recherché", content: "<p>• Diplôme de niveau Bac+3 minimum dans le domaine d'intervention<br>• 3 ans d'expérience professionnelle minimum<br>• Expérience en animation de formation souhaitée<br>• Maîtrise des outils numériques pédagogiques</p>" },
    { heading: "Documents exigés", content: "<p>• CV détaillé<br>• Copie des diplômes<br>• Attestations d'expérience<br>• Casier judiciaire (bulletin n°3)<br>• Attestation d'assurance RC Pro (indépendants)</p>" },
    { heading: "Processus", content: "<p>1. Réception candidature → Accusé de réception sous 48h<br>2. Présélection sur dossier → Sous 5 jours<br>3. Entretien + animation test → Sous 15 jours<br>4. Décision et notification → Sous 5 jours<br>5. Contractualisation → Sous 10 jours</p>", variant: "green" },
  ] });
}

function genRegistrePersonnel(o: OrganismeInfo, formateurs: FormateurInfo[]) {
  return buildDocument({ org: o, title: "REGISTRE DU PERSONNEL PAR PÔLE", table: {
    headers: ["Nom", "Prénom", "Pôle", "Fonction", "Spécialité", "Type contrat", "Date entrée"],
    rows: [
      [o.dirigeant.split(" ").slice(-1)[0], o.dirigeant.split(" ").slice(0, -1).join(" "), "Direction", "Dirigeant", "Management général", "CDI", "01/01/2015"],
      [o.responsablePedagogique.split(" ").slice(-1)[0], o.responsablePedagogique.split(" ").slice(0, -1).join(" "), "Pédagogique", "Resp. pédagogique", "Ingénierie de formation", "CDI", "15/03/2016"],
      [o.referentQualite.split(" ").slice(-1)[0], o.referentQualite.split(" ").slice(0, -1).join(" "), "Qualité", "Référent qualité", "Qualiopi / amélioration continue", "CDI", "01/09/2018"],
      [o.referentHandicap.split(" ").slice(-1)[0], o.referentHandicap.split(" ").slice(0, -1).join(" "), "Handicap", "Référent handicap", "Accessibilité, PSH", "CDI", "01/06/2019"],
      ...formateurs.map((f, i) => [f.nom, f.prenom, "Pédagogique", "Formateur", f.specialite, i < 2 ? "CDI" : "Prestataire", `01/0${i + 1}/2020`]),
      ["Lecomte", "Marie", "Administratif", "Assistante administrative", "Gestion, inscriptions", "CDI", "01/01/2017"],
    ]
  } });
}

function genDescriptifFOAD(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "DESCRIPTIF DES MOYENS MATÉRIELS – FOAD", sections: [
    { heading: "Plateforme LMS", content: `<p><strong>Outil :</strong> ${(o as any).outilsUtilises || "Moodle LMS"}<br><strong>Hébergement :</strong> Cloud sécurisé (99.9% de disponibilité)<br><strong>Accès :</strong> 24h/24, 7j/7<br><strong>Suivi :</strong> Tracking de progression, temps de connexion, résultats</p>` },
    { heading: "Visioconférence", content: "<p><strong>Outil :</strong> Zoom Professional<br><strong>Fonctionnalités :</strong> salles de sous-groupes, tableau blanc, partage d'écran, enregistrement<br><strong>Capacité :</strong> jusqu'à 100 participants par session</p>" },
    { heading: "Outils collaboratifs", content: "<p>• Google Workspace (Drive, Docs, Sheets, Slides)<br>• Padlet pour les activités collaboratives<br>• Kahoot / Wooclap pour les quiz interactifs<br>• Genially pour les contenus interactifs</p>" },
    { heading: "Matériel stagiaire requis", content: "<p>• Ordinateur (PC ou Mac) avec navigateur récent<br>• Connexion internet stable (≥ 5 Mbps)<br>• Webcam et micro (recommandé)<br>• Casque audio (recommandé)</p>" },
    { heading: "Support technique", content: `<p>Assistance technique disponible du lundi au vendredi de 9h à 18h.<br>Contact : ${o.email} | ${o.telephone}<br>Délai de réponse : 2h maximum en jour ouvré.</p>`, variant: "green" },
  ] });
}

function genContratSousTraitance(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "CONTRAT DE SOUS-TRAITANCE", sections: [
    { heading: "Article 1 – Objet", content: `<p>Le présent contrat définit les conditions dans lesquelles ${o.nom} (le donneur d'ordre) confie au sous-traitant la réalisation de prestations de formation professionnelle.</p>` },
    { heading: "Article 2 – Obligations du sous-traitant", content: "<p>Le sous-traitant s'engage à :<br>• Respecter le programme et les objectifs définis<br>• Fournir les justificatifs de qualification (CV, diplômes)<br>• Respecter le règlement intérieur de l'organisme<br>• Assurer la confidentialité des informations<br>• Se conformer aux exigences Qualiopi</p>" },
    { heading: "Article 3 – Obligations du donneur d'ordre", content: `<p>${o.nom} s'engage à :<br>• Fournir le programme et les supports nécessaires<br>• Mettre à disposition les locaux et équipements<br>• Assurer le suivi administratif de la formation<br>• Régler les prestations selon les conditions convenues</p>` },
    { heading: "Article 4 – Conformité Qualiopi", content: `<p>Le sous-traitant s'engage à respecter les exigences du Référentiel National Qualité et à participer aux audits internes de ${o.nom} sur demande.</p>`, variant: "green" },
    { heading: "Article 5 – Rémunération", content: "<p>La rémunération est fixée par bon de commande. Le paiement intervient sous 30 jours fin de mois après réception de la facture et des pièces justificatives (émargement, évaluations).</p>" },
    { heading: "Article 6 – Durée et résiliation", content: "<p>Le présent contrat est conclu pour une durée d'un an renouvelable par tacite reconduction. Chaque partie peut le résilier avec un préavis de 30 jours.</p>" },
  ], signatures: { type: "2", labels: ["Le Donneur d'ordre", "Le Sous-traitant"], names: [o.dirigeant, "________________________________"] } });
}

function genFicheAutoevaluation(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "___", nom: "___" };
  return buildDocument({ org: o, title: "FICHE D'AUTOÉVALUATION", subtitle: `${s.prenom} ${s.nom} – ${f.intitule}`, formation: f, showFormationInfo: true, table: {
    headers: ["Compétence / Objectif", "Avant formation (1-5)", "Après formation (1-5)", "Progression"],
    rows: [
      ["Maîtrise des concepts fondamentaux", "2", "4", "+2 ↑"],
      ["Application pratique en situation de travail", "1", "3", "+2 ↑"],
      ["Autonomie dans la réalisation des tâches", "2", "4", "+2 ↑"],
      ["Capacité à transmettre les connaissances", "1", "3", "+2 ↑"],
      ["Confiance dans l'utilisation des outils", "2", "5", "+3 ↑"],
    ]
  }, sections: [
    { heading: "Commentaires du stagiaire", content: `<p>« Cette formation m'a permis de progresser significativement sur les aspects pratiques. Je me sens plus confiant(e) pour appliquer ces compétences dans mon poste. »</p>`, variant: "green" },
  ], signatures: { type: "2", labels: ["Le/La Stagiaire", "Le/La Formateur(trice)"], names: [`${s.prenom} ${s.nom}`, f.formateur] } });
}

function genAttestationEntree(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "___", nom: "___", entreprise: "___" };
  return buildDocument({ org: o, title: "ATTESTATION D'ENTRÉE EN FORMATION", subtitle: f.intitule, sections: [
    { heading: "", content: `<p style="text-align:center;font-size:14px;margin:30px 0">Je soussigné(e) ${o.dirigeant}, en qualité de dirigeant de ${o.nom}, atteste que :</p><p style="text-align:center;font-size:16px;font-weight:bold;margin:20px 0">${s.prenom} ${s.nom}</p><p style="text-align:center">Entreprise : ${s.entreprise}</p><p style="text-align:center;margin:20px 0">a bien été inscrit(e) et a débuté la formation :</p><p style="text-align:center;font-size:15px;font-weight:bold">« ${f.intitule} »</p><p style="text-align:center">Durée : ${f.duree} | Modalité : ${f.modalites}<br>Date de début : ${formatDate(f.dateDebut)}</p><p style="text-align:center;margin-top:30px;font-style:italic">Attestation délivrée pour servir et valoir ce que de droit.</p>` },
  ], signatures: { type: "2", labels: ["Le Dirigeant", "Le/La Stagiaire"], names: [o.dirigeant, `${s.prenom} ${s.nom}`] } });
}

function genBoiteFormateur(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "BOÎTE À OUTILS DU FORMATEUR", subtitle: f.intitule, sections: [
    { heading: "Documents pédagogiques à avoir", content: "<p>☐ Programme de formation détaillé<br>☐ Déroulé pédagogique<br>☐ Supports de cours (version numérique et papier)<br>☐ Exercices pratiques et corrigés<br>☐ QCM de positionnement initial<br>☐ QCM d'évaluation finale<br>☐ Grille d'évaluation des compétences</p>" },
    { heading: "Documents administratifs", content: "<p>☐ Feuilles d'émargement (ou accès émargement numérique)<br>☐ Liste des stagiaires avec coordonnées<br>☐ Convention de formation<br>☐ Règlement intérieur<br>☐ Livret d'accueil stagiaire<br>☐ Questionnaires de satisfaction</p>" },
    { heading: "Matériel à vérifier", content: "<p>☐ Vidéoprojecteur / écran fonctionnel<br>☐ Connexion internet stable<br>☐ Accès à la plateforme LMS<br>☐ Tableau blanc / feutres<br>☐ Impressions des exercices<br>☐ Matériel spécifique à la formation</p>" },
    { heading: "Procédures qualité", content: `<p>☐ Renseigner le rapport d'exécution quotidien<br>☐ Signaler toute absence au secrétariat<br>☐ Faire compléter la satisfaction à chaud en fin de formation<br>☐ Transmettre les résultats d'évaluation sous 48h<br>☐ Signaler tout dysfonctionnement à ${o.referentQualite}</p>`, variant: "green" },
  ] });
}

function genAtelierTRE(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "ATELIER TRE – TECHNIQUES DE RECHERCHE D'EMPLOI", sections: [
    { heading: "Objectifs de l'atelier", content: "<p>• Maîtriser les techniques de recherche d'emploi<br>• Rédiger un CV professionnel et percutant<br>• Préparer et réussir ses entretiens d'embauche<br>• Utiliser efficacement les réseaux sociaux professionnels<br>• Développer son réseau professionnel</p>" },
    { heading: "Module 1 – Le CV", content: "<p>• Structure du CV (chronologique, fonctionnel, mixte)<br>• Adaptation du CV au poste visé<br>• Mise en valeur des compétences acquises en formation<br>• Exercice pratique : rédaction de son CV</p>" },
    { heading: "Module 2 – La lettre de motivation", content: "<p>• Structure et contenu<br>• Personnalisation par offre<br>• Exercice pratique : rédaction d'une lettre</p>" },
    { heading: "Module 3 – L'entretien", content: "<p>• Préparation : recherche sur l'entreprise, questions fréquentes<br>• Communication verbale et non verbale<br>• Mise en situation : simulation d'entretien filmé<br>• Débriefing et axes d'amélioration</p>" },
    { heading: "Module 4 – Réseaux et stratégie", content: "<p>• Création/optimisation du profil LinkedIn<br>• Stratégie de candidature (sites emploi, intérim, réseau)<br>• Suivi des candidatures<br>• Plan d'action personnalisé de recherche d'emploi</p>", variant: "green" },
  ] });
}

function genDossierPSH(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "DOSSIER D'ACCOMPAGNEMENT – PERSONNE EN SITUATION DE HANDICAP", sections: [
    { heading: "Référent handicap", content: `<p><strong>Nom :</strong> ${o.referentHandicap}<br><strong>Contact :</strong> ${o.email}<br><strong>Disponibilité :</strong> Sur rendez-vous, du lundi au vendredi</p>` },
    { heading: "Informations du bénéficiaire (confidentiel)", content: "<p><strong>Nom / Prénom :</strong> ________________________________<br><strong>Type de handicap :</strong> ________________________________<br><strong>RQTH :</strong> ☐ Oui ☐ Non<br><strong>Besoins spécifiques identifiés :</strong><br>________________________________</p>" },
    { heading: "Aménagements mis en place", content: "<p>☐ Adaptation des supports (agrandissement, format numérique, audio)<br>☐ Aménagement du temps (pauses supplémentaires, durée prolongée)<br>☐ Adaptation du lieu (accessibilité PMR, bureau adapté)<br>☐ Accompagnement humain (interprète LSF, aide technique)<br>☐ Matériel adapté (loupe, écran agrandi, clavier braille)<br>☐ Évaluation adaptée (temps majoré, oral au lieu d'écrit)<br>☐ Autre : ________________________________</p>" },
    { heading: "Partenaires mobilisés", content: "<p>• AGEFIPH / FIPHFP<br>• Cap Emploi<br>• MDPH<br>• Associations spécialisées<br>• Médecin du travail</p>" },
    { heading: "Suivi", content: "<p>Un point de suivi est réalisé à minima :<br>• Au démarrage de la formation<br>• À mi-parcours<br>• En fin de formation<br>Tout besoin complémentaire est traité sous 48h.</p>", variant: "green" },
  ] });
}

function genGuideNumeriquePSH(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "GUIDE NUMÉRIQUE – ACCESSIBILITÉ PSH", sections: [
    { heading: "Accessibilité de la plateforme LMS", content: "<p>Notre plateforme respecte les normes WCAG 2.1 niveau AA :<br>• Navigation au clavier possible<br>• Textes alternatifs sur les images<br>• Contrastes suffisants<br>• Sous-titrage des vidéos<br>• Compatibilité lecteurs d'écran (NVDA, JAWS)</p>" },
    { heading: "Aménagements numériques disponibles", content: "<p>• Agrandissement de l'interface (zoom jusqu'à 200%)<br>• Mode sombre / contraste élevé<br>• Synthèse vocale des contenus textuels<br>• Transcription des contenus audio/vidéo<br>• Temps d'évaluation prolongé</p>" },
    { heading: "Outils d'aide recommandés", content: "<p>• Navigateurs : Chrome, Firefox (fonctions d'accessibilité intégrées)<br>• Extensions : « Accessibility Insights », « Color Contrast Analyzer »<br>• Logiciels : NVDA (gratuit), ZoomText, Dragon NaturallySpeaking</p>" },
    { heading: "Contact et assistance", content: `<p>Pour tout besoin d'accessibilité numérique :<br><strong>Référent handicap :</strong> ${o.referentHandicap}<br><strong>Email :</strong> ${o.email}<br><strong>Téléphone :</strong> ${o.telephone}</p>`, variant: "green" },
  ] });
}

function genListePartenairesHandicap(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "LISTE DES PARTENAIRES HANDICAP", table: {
    headers: ["Organisme partenaire", "Type", "Domaine d'intervention", "Contact", "Convention"],
    rows: [
      ["AGEFIPH", "Organisme national", "Financement, conseil, accompagnement", "www.agefiph.fr", "Oui"],
      ["Cap Emploi", "Service public", "Insertion professionnelle des travailleurs handicapés", "Antenne locale", "Oui"],
      ["MDPH", "Service public", "Reconnaissance RQTH, orientation", "MDPH du département", "Non"],
      ["Activateur de Progrès", "Réseau AGEFIPH", "Accompagnement des entreprises et OF", "Référent régional", "Oui"],
      ["RHF (Réseau Handicap Formation)", "Réseau professionnel", "Expertise formation et handicap", "rhf-idf.fr", "Oui"],
      ["Association Valentin Haüy", "Association", "Déficience visuelle", "Antenne locale", "Non"],
      ["UNAPEI", "Association", "Handicap mental et psychique", "Antenne locale", "Non"],
      ["APF France Handicap", "Association", "Handicap moteur", "Antenne locale", "Non"],
    ]
  } });
}

function genAttestationInscriptionCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "___", nom: "___", entreprise: "___" };
  return buildDocument({ org: o, title: "ATTESTATION D'INSCRIPTION – CFA", subtitle: f.intitule, sections: [
    { heading: "", content: `<p style="text-align:center;font-size:14px;margin:30px 0">Je soussigné(e) ${o.dirigeant}, en qualité de directeur du CFA ${o.nom}, atteste que :</p><p style="text-align:center;font-size:16px;font-weight:bold;margin:20px 0">${s.prenom} ${s.nom}</p><p style="text-align:center">Entreprise d'accueil : ${s.entreprise}</p><p style="text-align:center;margin:20px 0">est inscrit(e) en qualité d'apprenti(e) pour la formation :</p><p style="text-align:center;font-size:15px;font-weight:bold">« ${f.intitule} »</p><p style="text-align:center">Durée : ${f.duree} | Du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}</p><p style="text-align:center;margin-top:30px;font-style:italic">Attestation délivrée pour servir et valoir ce que de droit.</p>` },
  ], signatures: { type: "2", labels: ["Le Directeur du CFA", "L'Apprenti(e)"], names: [o.dirigeant, `${s.prenom} ${s.nom}`] } });
}

// ============== NOUVEAUX GENERATORS SKILLORA AF ==============

function genFicheRenseignement(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "___", nom: "___", entreprise: "___", poste: "___" };
  return buildDocument({ org: o, title: "FICHE DE RENSEIGNEMENT", subtitle: f.intitule, sections: [
    { heading: "Identité du candidat", content: `<p><strong>Nom :</strong> ${s.nom}<br><strong>Prénom :</strong> ${s.prenom}<br><strong>Date de naissance :</strong> ___/___/______<br><strong>Adresse :</strong> ________________________________<br><strong>Téléphone :</strong> ________________________________<br><strong>Email :</strong> ________________________________</p>` },
    { heading: "Situation professionnelle", content: `<p><strong>Statut :</strong> ☐ Salarié(e) ☐ Demandeur d'emploi ☐ Indépendant(e) ☐ Autre<br><strong>Entreprise :</strong> ${s.entreprise}<br><strong>Poste occupé :</strong> ${s.poste}<br><strong>Ancienneté :</strong> ________________________________</p>` },
    { heading: "Formation souhaitée", content: `<p><strong>Intitulé :</strong> ${f.intitule}<br><strong>Objectifs personnels :</strong> ________________________________<br><strong>Comment avez-vous connu ${o.nom} ?</strong> ☐ Internet ☐ Bouche à oreille ☐ Pôle Emploi ☐ OPCO ☐ Autre</p>` },
    { heading: "Situation de handicap", content: `<p>☐ Oui ☐ Non<br>Si oui, nature de l'aménagement souhaité : ________________________________<br><strong>Référent handicap :</strong> ${o.referentHandicap} – ${o.email}</p>` },
    { heading: "Financement envisagé", content: "<p>☐ CPF ☐ OPCO ☐ Pôle Emploi ☐ Employeur ☐ Personnel ☐ Autre : ________________________________</p>" },
  ], signatures: { type: "2", labels: ["Le/La Candidat(e)", "Le Responsable"], names: [`${s.prenom} ${s.nom}`, o.dirigeant] } });
}

function genGrilleEntretienCandidat(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "GRILLE D'ENTRETIEN CANDIDAT", subtitle: f.intitule, sections: [
    { heading: "Informations candidat", content: "<p><strong>Nom / Prénom :</strong> ________________________________<br><strong>Date de l'entretien :</strong> ___/___/______<br><strong>Entretien réalisé par :</strong> ________________________________<br><strong>Mode :</strong> ☐ Présentiel ☐ Téléphone ☐ Visioconférence</p>" },
    { heading: "Parcours et motivation", content: "<p><strong>Parcours professionnel résumé :</strong><br>________________________________<br><strong>Pourquoi cette formation ?</strong><br>________________________________<br><strong>Objectif à l'issue :</strong><br>________________________________</p>" },
  ], table: {
    headers: ["Critère d'évaluation", "1 – Insuffisant", "2 – Moyen", "3 – Bon", "4 – Excellent", "Observations"],
    rows: [
      ["Motivation et engagement", "☐", "☐", "☐", "☐", ""],
      ["Adéquation profil / formation", "☐", "☐", "☐", "☐", ""],
      ["Niveau de connaissances préalables", "☐", "☐", "☐", "☐", ""],
      ["Capacité d'apprentissage", "☐", "☐", "☐", "☐", ""],
      ["Expression orale", "☐", "☐", "☐", "☐", ""],
      ["Projet professionnel cohérent", "☐", "☐", "☐", "☐", ""],
    ]
  }, extraHtml: `<div class="section"><p><strong>Avis global :</strong> ☐ Favorable ☐ Favorable avec réserves ☐ Défavorable</p><p><strong>Commentaires :</strong> ________________________________</p></div>`,
  signatures: { type: "2", labels: ["Le/La Candidat(e)", "Le Responsable Pédagogique"], names: ["________________________", o.responsablePedagogique] } });
}

function genSuiviInscriptions(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const rows = stagiaires.length > 0
    ? stagiaires.map((s, i) => [String(i + 1), `${s.prenom} ${s.nom}`, s.entreprise || "—", formatDate(f.dateDebut), "✅ Validée", "☐ Oui", formatDate(f.dateDebut)])
    : [["1", "NOM Prénom", "Entreprise", "___/___/___", "☐ En attente", "☐ Non", "___/___/___"],
       ["2", "NOM Prénom", "Entreprise", "___/___/___", "☐ En attente", "☐ Non", "___/___/___"]];
  return buildDocument({ org: o, title: "SUIVI DES INSCRIPTIONS EN FORMATION", subtitle: f.intitule, formation: f, showFormationInfo: true,
    table: { headers: ["N°", "Stagiaire", "Entreprise", "Date inscription", "Statut", "Dossier complet", "Date entrée"], rows },
    sections: [{ heading: "Légende statuts", content: "<p>✅ Validée | ⏳ En attente de pièces | ❌ Annulée | 📋 Liste d'attente</p>", variant: "green" }]
  });
}

function genAttestationAssiduite(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "___", nom: "___", entreprise: "___" };
  return buildDocument({ org: o, title: "ATTESTATION D'ASSIDUITÉ", subtitle: f.intitule, sections: [
    { heading: "", content: `<p style="text-align:center;font-size:14px;margin:30px 0">Je soussigné(e) <strong>${o.dirigeant}</strong>, en qualité de responsable de l'organisme de formation <strong>${o.nom}</strong>, atteste que :</p>
    <p style="text-align:center;font-size:16px;font-weight:bold;margin:20px 0">${s.prenom} ${s.nom}</p>
    <p style="text-align:center">Entreprise : ${s.entreprise}</p>
    <p style="text-align:center;margin:20px 0">a suivi avec assiduité la formation :</p>
    <p style="text-align:center;font-size:15px;font-weight:bold">« ${f.intitule} »</p>
    <p style="text-align:center">Durée : ${f.duree} | Du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}</p>
    <p style="text-align:center">Lieu : ${f.lieu} | Modalité : ${f.modalites}</p>
    <p style="text-align:center;margin:15px 0"><strong>Taux de présence : 100%</strong></p>
    <p style="text-align:center;margin-top:30px;font-style:italic">Attestation délivrée pour servir et valoir ce que de droit.</p>` },
  ], signatures: { type: "2", labels: ["Le Responsable", "Le/La Stagiaire"], names: [o.dirigeant, `${s.prenom} ${s.nom}`] } });
}

function genCertificatRealisation(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "___", nom: "___", entreprise: "___" };
  return buildDocument({ org: o, title: "CERTIFICAT DE RÉALISATION", subtitle: f.intitule, sections: [
    { heading: "", content: `<p style="text-align:center;font-size:14px;margin:30px 0">Je soussigné(e) <strong>${o.dirigeant}</strong>, représentant l'organisme de formation <strong>${o.nom}</strong> (NDA : ${o.nda}), atteste que l'action de formation suivante a été réalisée :</p>
    <p style="text-align:center;font-size:15px;font-weight:bold;margin:15px 0">« ${f.intitule} »</p>` },
    { heading: "Informations de la formation", content: `<p><strong>Bénéficiaire :</strong> ${s.prenom} ${s.nom}<br><strong>Entreprise :</strong> ${s.entreprise}<br><strong>Durée prévue :</strong> ${f.duree}<br><strong>Durée réalisée :</strong> ${f.duree}<br><strong>Dates :</strong> Du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}<br><strong>Lieu :</strong> ${f.lieu}<br><strong>Modalité :</strong> ${f.modalites}<br><strong>Formateur :</strong> ${f.formateur}</p>` },
    { heading: "Nature de l'action", content: "<p>☐ Action de formation ☐ Bilan de compétences ☐ VAE ☐ Action d'apprentissage</p>" },
    { heading: "", content: `<p style="text-align:center;margin-top:20px;font-style:italic">Ce certificat est délivré conformément aux dispositions de l'article L.6353-1 du Code du travail.</p>` },
  ], signatures: { type: "2", labels: ["Le Responsable de l'organisme", "Le/La Bénéficiaire"], names: [o.dirigeant, `${s.prenom} ${s.nom}`] } });
}

function genSuiviAbsences(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const rows = stagiaires.length > 0
    ? stagiaires.map(s => [s.prenom + " " + s.nom, s.entreprise || "—", "0", "0", "0h", "100%", "RAS"])
    : [["NOM Prénom", "Entreprise", "0", "0", "0h", "100%", "—"]];
  return buildDocument({ org: o, title: "SUIVI DES ABSENCES – CENTRALISATION", subtitle: f.intitule, formation: f, showFormationInfo: true,
    table: { headers: ["Stagiaire", "Entreprise", "Absences justifiées", "Absences injustifiées", "Total heures absentes", "Taux présence", "Observations"], rows },
    sections: [
      { heading: "Procédure en cas d'absence", content: "<p>• Toute absence doit être signalée dans les 24h<br>• Un justificatif est exigé sous 48h<br>• Au-delà de 3 absences injustifiées : convocation par le responsable pédagogique<br>• L'employeur et/ou le financeur sont informés de toute absence prolongée</p>" },
    ]
  });
}

function genFichePosteFormateur(o: OrganismeInfo, fmt: FormateurInfo) {
  return buildDocument({ org: o, title: `FICHE DE POSTE – FORMATEUR(TRICE)`, subtitle: `${fmt.prenom} ${fmt.nom}`, sections: [
    { heading: "Identification du poste", content: `<p><strong>Intitulé :</strong> Formateur(trice) ${fmt.specialite}<br><strong>Rattachement :</strong> Pôle Pédagogique<br><strong>Responsable hiérarchique :</strong> ${o.responsablePedagogique}<br><strong>Lieu d'exercice :</strong> ${o.adresse}, ${o.codePostal} ${o.ville} + déplacements</p>` },
    { heading: "Mission principale", content: `<p>Concevoir, animer et évaluer des actions de formation dans le domaine ${fmt.specialite}, en présentiel et/ou à distance, conformément au référentiel Qualiopi et aux exigences du RNQ.</p>` },
    { heading: "Activités et responsabilités", content: "<p>• Conception de programmes et supports pédagogiques<br>• Animation de sessions de formation (présentiel / FOAD / hybride)<br>• Évaluation des acquis : positionnement, intermédiaire, finale<br>• Suivi individuel des stagiaires<br>• Participation aux réunions pédagogiques<br>• Veille métier et pédagogique<br>• Rédaction de bilans pédagogiques</p>" },
    { heading: "Compétences requises", content: `<p>• Expertise technique dans le domaine ${fmt.specialite}<br>• Maîtrise des techniques d'animation<br>• Capacité d'adaptation aux différents publics<br>• Maîtrise des outils numériques et plateformes LMS<br>• Qualités relationnelles et pédagogiques</p>` },
    { heading: "Diplômes et expérience", content: `<p><strong>Formation :</strong> ${fmt.diplomes}<br><strong>Expérience minimum :</strong> ${fmt.experience}</p>`, variant: "green" },
  ] });
}

function genGrilleEntretienAnnuel(o: OrganismeInfo, fmt: FormateurInfo) {
  return buildDocument({ org: o, title: "GRILLE D'ENTRETIEN ANNUEL – FORMATEUR(TRICE)", subtitle: `${fmt.prenom} ${fmt.nom}`, sections: [
    { heading: "Informations", content: `<p><strong>Formateur :</strong> ${fmt.prenom} ${fmt.nom}<br><strong>Spécialité :</strong> ${fmt.specialite}<br><strong>Date de l'entretien :</strong> ___/___/______<br><strong>Entretien mené par :</strong> ${o.responsablePedagogique}</p>` },
  ], table: {
    headers: ["Domaine évalué", "1 – À améliorer", "2 – Satisfaisant", "3 – Bon", "4 – Excellent", "Commentaires"],
    rows: [
      ["Maîtrise du contenu pédagogique", "☐", "☐", "☐", "☐", ""],
      ["Qualité de l'animation", "☐", "☐", "☐", "☐", ""],
      ["Adaptation aux publics", "☐", "☐", "☐", "☐", ""],
      ["Gestion du groupe", "☐", "☐", "☐", "☐", ""],
      ["Utilisation des outils numériques", "☐", "☐", "☐", "☐", ""],
      ["Respect des procédures qualité", "☐", "☐", "☐", "☐", ""],
      ["Ponctualité et assiduité", "☐", "☐", "☐", "☐", ""],
      ["Satisfaction des stagiaires", "☐", "☐", "☐", "☐", ""],
      ["Veille et mise à jour des compétences", "☐", "☐", "☐", "☐", ""],
      ["Esprit d'équipe et collaboration", "☐", "☐", "☐", "☐", ""],
    ]
  }, extraHtml: `<div class="section"><p><strong>Points forts identifiés :</strong> ________________________________</p><p><strong>Axes d'amélioration :</strong> ________________________________</p><p><strong>Objectifs pour l'année à venir :</strong> ________________________________</p><p><strong>Besoins en formation :</strong> ________________________________</p></div>`,
  signatures: { type: "2", labels: ["Le/La Formateur(trice)", "Le Responsable Pédagogique"], names: [`${fmt.prenom} ${fmt.nom}`, o.responsablePedagogique] } });
}

function genEnqueteSatisfactionFormateur(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "ENQUÊTE DE SATISFACTION – FORMATEUR(TRICE)", sections: [
    { heading: "Informations", content: `<p><strong>Date :</strong> ${formatDate(f.dateFin)}<br><strong>Nom du formateur :</strong> ${f.formateur}<br><strong>Formation dispensée :</strong> ${f.intitule}<br><strong>Période :</strong> Du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}</p>` },
  ], table: {
    headers: ["Critère", "1 – Pas satisfait", "2 – Peu satisfait", "3 – Satisfait", "4 – Très satisfait"],
    rows: [
      ["Organisation et logistique de la formation", "☐", "☐", "☐", "☐"],
      ["Qualité des supports et outils mis à disposition", "☐", "☐", "☐", "☐"],
      ["Communication avec l'équipe pédagogique", "☐", "☐", "☐", "☐"],
      ["Adéquation du public avec le programme", "☐", "☐", "☐", "☐"],
      ["Conditions matérielles (salle, matériel, connexion)", "☐", "☐", "☐", "☐"],
      ["Accompagnement et soutien de la direction", "☐", "☐", "☐", "☐"],
      ["Rémunération et conditions contractuelles", "☐", "☐", "☐", "☐"],
      ["Possibilités de développement professionnel", "☐", "☐", "☐", "☐"],
    ]
  }, extraHtml: `<div class="section"><p><strong>Points positifs :</strong> ________________________________</p><p><strong>Axes d'amélioration suggérés :</strong> ________________________________</p><p><strong>Recommanderiez-vous ${o.nom} à un autre formateur ?</strong> ☐ Oui ☐ Non</p><p><strong>Commentaires libres :</strong> ________________________________</p></div>`,
  });
}
function genDocumentsCertificateursCFA(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "DOCUMENTS CERTIFICATEURS – CFA", subtitle: f.intitule, sections: [
    { heading: "Référentiel de certification", content: `<p><strong>Certification visée :</strong> ${f.intitule}<br><strong>Code RNCP/RS :</strong> [À compléter]<br><strong>Organisme certificateur :</strong> [À compléter]<br><strong>Date d'enregistrement :</strong> [À compléter]<br><strong>Date de fin de validité :</strong> [À compléter]</p>` },
    { heading: "Blocs de compétences", content: "<p><strong>Bloc 1 :</strong> [Intitulé du bloc 1]<br><strong>Bloc 2 :</strong> [Intitulé du bloc 2]<br><strong>Bloc 3 :</strong> [Intitulé du bloc 3]<br><strong>Bloc 4 :</strong> [Intitulé du bloc 4]</p>" },
    { heading: "Modalités d'évaluation", content: "<p>• Épreuves écrites ponctuelles<br>• Évaluations en cours de formation (CCF)<br>• Épreuves pratiques<br>• Soutenance de dossier professionnel<br>• Évaluation en entreprise par le maître d'apprentissage</p>" },
    { heading: "Prérequis d'accès à la certification", content: "<p>• Avoir suivi l'intégralité du parcours de formation<br>• Avoir validé les évaluations en cours de formation<br>• Avoir réalisé la totalité des heures en entreprise<br>• Être à jour de l'assiduité</p>", variant: "green" },
  ] });
}

// ============== TEMPLATES SELECT FORMATION ==============

function genLienSiteInternet(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "LIEN DU SITE INTERNET", sections: [
    { heading: "Site internet", content: `<p><strong>URL :</strong> <a href="${o.siteWeb}">${o.siteWeb}</a></p><p>Le site diffuse l'ensemble des informations obligatoires : intitulés, objectifs, durées, modalités, tarifs, prérequis, contacts, indicateurs de résultats et accessibilité handicap.</p>` },
    { heading: "Mise à jour", content: `<p>Dernière mise à jour : ${o.dateMaj || new Date().toLocaleDateString('fr-FR')}</p>`, variant: "green" },
  ] });
}

function genProcedureIndicateursPerformance(o: OrganismeInfo, stagiaires: StagiaireInfo[] = []) {
  const nbStagiaires = stagiaires.length || 1;
  return buildDocument({ org: o, title: "PROCÉDURE DE SUIVI DES INDICATEURS DE PERFORMANCE", sections: [
    { heading: "Objectif", content: `<p>Assurer le suivi mensuel du taux de satisfaction des stagiaires et du nombre d'apprenants formés, afin d'améliorer la qualité des prestations.</p>` },
    { heading: "Fréquence", content: `<p><strong>Collecte des données :</strong> à la fin de chaque formation.</p><p><strong>Mise à jour du tableau de bord :</strong> une fois par mois.</p>` },
    { heading: "Indicateurs suivis", content: `<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%">
      <tr style="background:#1e3a7b;color:#fff"><th>Indicateur</th><th>Méthode de calcul</th><th>Objectif</th></tr>
      <tr><td>Taux de satisfaction</td><td>(Nb de stagiaires satisfaits ÷ Nb total de réponses) × 100</td><td>100 %</td></tr>
      <tr><td>Nombre d'apprenants mensuel</td><td>Total des stagiaires formés sur le mois</td><td>${nbStagiaires}</td></tr>
    </table>` },
    { heading: "Responsabilités", content: `<p><strong>${o.dirigeant || "Le Dirigeant"} :</strong> collecte, saisie et analyse mensuelle.</p><p><strong>Formateurs :</strong> transmission des questionnaires de satisfaction et des feuilles d'émargement.</p>` },
    { heading: "Suivi et amélioration", content: `<p>En cas de baisse du taux de satisfaction ou du nombre d'apprenants, une analyse rapide est réalisée pour identifier la cause et mettre en place une action corrective (ajustement pédagogique, accompagnement, communication, etc.).</p>` },
    { heading: "Archivage", content: `<p>Tous les documents (questionnaires, émargements, tableaux de suivi) sont conservés 5 ans dans le dossier Qualité.</p>` },
  ] });
}

function genProcedureEvalBesoins(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE D'ÉVALUATION DES BESOINS DES STAGIAIRES", sections: [
    { heading: "Objectif", content: `<p>Identifier les besoins, attentes et niveaux des stagiaires avant leur entrée en formation afin d'adapter le parcours pédagogique et de garantir l'atteinte des objectifs de la formation.</p>` },
    { heading: "Étapes de la procédure", content: `<p><strong>1. Demande d'inscription</strong></p>
<ul><li>Le candidat contacte ${o.nom} sur le site internet, ou par mail et/ou téléphone.</li>
<li>Une première analyse du projet et de la motivation est effectuée.</li></ul>
<p><strong>2. Recueil des besoins</strong></p>
<ul><li>Envoi d'un formulaire de positionnement ou questionnaire de préformation (niveau, attentes, difficultés, objectifs professionnels).</li>
<li>Possibilité d'un entretien individuel (téléphonique ou visio) pour affiner le diagnostic.</li></ul>
<p><strong>3. Analyse par le centre</strong></p>
<ul><li>Le formateur ou le référent pédagogique examine les réponses pour vérifier l'adéquation entre le profil du stagiaire et la formation visée.</li>
<li>Si nécessaire, une orientation vers un autre module ou niveau est proposée.</li></ul>
<p><strong>4. Adaptation du parcours</strong></p>
<ul><li>Le contenu, la durée ou le rythme peuvent être ajustés selon les besoins identifiés (ex. : accompagnement renforcé, supports adaptés).</li></ul>` },
    { heading: "Traçabilité", content: `<p>• Les résultats du positionnement et les échanges sont archivés dans le dossier stagiaire.<br>• Ces éléments servent de base au suivi de la progression et à l'évaluation finale.</p>` },
    { heading: "Accessibilité", content: `<p>Les besoins spécifiques liés à un handicap sont identifiés lors de cette phase, en lien avec le référent handicap ${o.referentHandicap}, afin de prévoir les aménagements nécessaires.</p><p>Contact : ${o.email}</p>`, variant: "green" },
  ] });
}

function genFicheEvalBesoinsPSH(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "FICHE D'ÉVALUATION DES BESOINS – PERSONNE EN SITUATION DE HANDICAP", sections: [
    { heading: "1. Informations du stagiaire", content: "<p><strong>Nom et prénom :</strong> .................................................................<br><strong>Formation suivie :</strong> .................................................................<br><strong>Date d'entrée en formation :</strong> .................................................................</p>" },
    { heading: "2. Nature du handicap ou des difficultés rencontrées", content: "<p>☐ Handicap moteur<br>☐ Handicap visuel<br>☐ Handicap auditif<br>☐ Handicap psychique ou cognitif<br>☐ Trouble de l'apprentissage (dyslexie, dysphasie, etc.)<br>☐ Autre (à préciser) : .................................................................</p><p><strong>Commentaires :</strong><br>.................................................................<br>.................................................................</p>" },
    { heading: "3. Besoins spécifiques identifiés", content: "<p><strong>Aménagements pédagogiques nécessaires :</strong><br>.................................................................<br><strong>Moyens matériels ou techniques à prévoir :</strong><br>.................................................................<br><strong>Aide humaine ou accompagnement spécifique :</strong><br>.................................................................</p>" },
    { heading: "4. Adaptations prévues par le formateur", content: "<p>☐ Adaptation des supports pédagogiques<br>☐ Adaptation du rythme ou de la durée de la formation<br>☐ Adaptation du mode d'évaluation<br>☐ Autre (préciser) : .................................................................</p><p><strong>Commentaires :</strong><br>.................................................................<br>.................................................................</p>" },
    { heading: "5. Suivi en cours de formation", content: "<p><strong>Date du suivi intermédiaire :</strong> .................................................................<br><strong>Observations / ajustements :</strong><br>.................................................................<br>.................................................................</p>" },
    { heading: "6. Signatures", content: `<p><strong>Stagiaire :</strong><br>Nom, prénom : .............................................. Signature : ..............................................</p><p><strong>Référent handicap – ${o.referentHandicap} :</strong><br>Signature : ................................................... Date : ......................................................</p>` },
  ] });
}

function genTrameEvalBesoins(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { civilite: "" as const, prenom: "___", nom: "___", email: "", telephone: "", entreprise: "", poste: "", dateNaissance: "" };
  
  // Generate realistic auto-filled answers based on stagiaire profile and formation
  const answers = generateEvalBesoinsAnswers(s, f, o, stagiaires.indexOf(s));
  
  const civiliteBlock = `<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
<tr><td style="background:#f8f9fa">
<strong>Civilité :</strong> ${answers.civilite}<br>
<strong>Nom :</strong> ${s.nom}<br>
<strong>Prénom :</strong> ${s.prenom}<br>
<strong>Téléphone :</strong> ${s.telephone || "___"}<br>
<strong>Mail :</strong> ${s.email || "___"}<br>
<strong>Date :</strong> du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}<br>
<strong>Formation souhaitée :</strong> ${f.intitule}
</td></tr></table>`;

  return buildDocument({ org: o, title: "Évaluation des besoins", extraHtml: civiliteBlock + `
<h3 style="margin-top:20px;color:#1e3a7b">Partie Entreprise :</h3>
<p><strong>1. Raison sociale de l'entreprise ou nom commercial</strong></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.raisonSociale}</td></tr></table>

<p><strong>2. Quelles sont vos attentes et objectifs pour vous-même et/ou votre salarié(e) dans le cadre de cette formation ?</strong></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.attentes}</td></tr></table>

<p><strong>3. Quelles sont les missions actuelles ou à venir confiées au salarié(e) en lien avec la formation ?</strong></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.missions}</td></tr></table>

<p><strong>4. En quoi cette formation contribue-t-elle au développement ou aux objectifs stratégiques de votre entreprise ?</strong></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.contribution}</td></tr></table>

<h3 style="margin-top:20px;color:#1e3a7b">PARTIE EXPÉRIENCE ET SCOLAIRE :</h3>

<p><strong>1. Quel est le dernier diplôme ou titre que vous avez obtenu ?</strong></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.diplome}</td></tr></table>

<p><strong>2. Quel objectif professionnel ou personnel souhaitez-vous atteindre grâce à cette formation ?</strong></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.objectif}</td></tr></table>

<p><strong>3. Quel budget avez-vous prévu pour cette formation et bénéficiez-vous d'un dispositif de financement (CPF, OPCO, Pôle emploi, etc.) ?</strong></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.budget}</td></tr></table>

<p><strong>4. En quoi pensez-vous que cette formation contribuera à la réalisation de votre projet professionnel ou personnel ?</strong></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.projetPro}</td></tr></table>

<p><strong>5. Êtes-vous en situation de handicap ?</strong></p>
<p><em>Si oui, avez-vous besoin d'adaptations spécifiques (pédagogiques, techniques, matérielles) pour suivre la formation ?</em></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.handicap}</td></tr></table>

<p style="margin-top:20px"><strong>Analyse du référent pédagogique :</strong> ${o.responsablePedagogique}</p>
<p><strong>Date d'analyse :</strong> ${formatDate(subtractBusinessDays(f.dateDebut, 20))}</p>
<p>FAIT À ${o.ville.toUpperCase()}</p>
<p>LE : ${formatDate(subtractBusinessDays(f.dateDebut, 20))}</p>
` });
}

function genTrameEvalBesoinsStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const answers = generateEvalBesoinsAnswers(s, f, o, si);
  
  const civiliteBlock = `<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
<tr><td style="background:#f8f9fa">
<strong>Civilité :</strong> ${answers.civilite}<br>
<strong>Nom :</strong> ${s.nom}<br>
<strong>Prénom :</strong> ${s.prenom}<br>
<strong>Téléphone :</strong> ${s.telephone || "___"}<br>
<strong>Mail :</strong> ${s.email || "___"}<br>
<strong>Date :</strong> du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}<br>
<strong>Formation souhaitée :</strong> ${f.intitule}
</td></tr></table>`;

  return buildDocument({ org: o, title: `Évaluation des besoins – ${s.prenom} ${s.nom}`, extraHtml: civiliteBlock + `
<h3 style="margin-top:20px;color:#1e3a7b">Partie Entreprise :</h3>
<p><strong>1. Raison sociale de l'entreprise ou nom commercial</strong></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.raisonSociale}</td></tr></table>

<p><strong>2. Quelles sont vos attentes et objectifs pour vous-même et/ou votre salarié(e) dans le cadre de cette formation ?</strong></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.attentes}</td></tr></table>

<p><strong>3. Quelles sont les missions actuelles ou à venir confiées au salarié(e) en lien avec la formation ?</strong></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.missions}</td></tr></table>

<p><strong>4. En quoi cette formation contribue-t-elle au développement ou aux objectifs stratégiques de votre entreprise ?</strong></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.contribution}</td></tr></table>

<h3 style="margin-top:20px;color:#1e3a7b">PARTIE EXPÉRIENCE ET SCOLAIRE :</h3>

<p><strong>1. Quel est le dernier diplôme ou titre que vous avez obtenu ?</strong></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.diplome}</td></tr></table>

<p><strong>2. Quel objectif professionnel ou personnel souhaitez-vous atteindre grâce à cette formation ?</strong></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.objectif}</td></tr></table>

<p><strong>3. Quel budget avez-vous prévu pour cette formation et bénéficiez-vous d'un dispositif de financement (CPF, OPCO, Pôle emploi, etc.) ?</strong></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.budget}</td></tr></table>

<p><strong>4. En quoi pensez-vous que cette formation contribuera à la réalisation de votre projet professionnel ou personnel ?</strong></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.projetPro}</td></tr></table>

<p><strong>5. Êtes-vous en situation de handicap ?</strong></p>
<p><em>Si oui, avez-vous besoin d'adaptations spécifiques (pédagogiques, techniques, matérielles) pour suivre la formation ?</em></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td>${answers.handicap}</td></tr></table>

<p style="margin-top:20px"><strong>Analyse du référent pédagogique :</strong> ${o.responsablePedagogique}</p>
<p><strong>Date d'analyse :</strong> ${formatDate(subtractBusinessDays(f.dateDebut, 20))}</p>
<p>FAIT À ${o.ville.toUpperCase()}</p>
<p>LE : ${formatDate(subtractBusinessDays(f.dateDebut, 20))}</p>
` });
}

export function getEvalBesoinsFinancement(s: StagiaireInfo, f: FormationInfo, o: OrganismeInfo, idx: number): string {
  return generateEvalBesoinsAnswers(s, f, o, idx).budget;
}

function generateEvalBesoinsAnswers(s: StagiaireInfo, f: FormationInfo, o: OrganismeInfo, idx: number) {
  const formation = f.intitule || "la formation";
  const t = formation.toLowerCase();
  const baseHash = (s.nom + s.prenom).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const h = (offset: number) => (baseHash * 31 + idx * 17 + offset) & 0x7FFFFFFF;
  
  const hasEntreprise = !!(s.entreprise && s.entreprise.trim() && s.entreprise.trim().toLowerCase() !== "entreprise");
  
  const civilites = ["Monsieur", "Madame"];
  const civilite = civilites[h(1) % 2];
  
  // Detect formation type for coherent answers
  const isFLE = t.includes("français") || t.includes("médico-social") || t.includes("fle") || t.includes("communiquer en");
  const isIA = t.includes("intelligence artificielle") || t.includes("ia générative") || t.includes("contenus rédactionnels");
  const isExcel = t.includes("excel");
  const isAnglais = t.includes("anglais") || t.includes("toeic");
  const isManagement = t.includes("management") || t.includes("leadership");
  const isDigital = t.includes("digital") || t.includes("marketing");
  const isEsthetique = t.includes("esthétique") || t.includes("cosmétique");
  const isInfo = t.includes("informatique") || t.includes("systèmes") || t.includes("réseaux");
  const isBureautique = t.includes("bureautique") || t.includes("pack office");

  // === DIPLÔMES (10+ options par type) ===
  let diplomes: string[];
  if (isFLE) {
    diplomes = [
      "Diplôme étranger équivalent Bac",
      "Attestation de niveau A2 en français",
      "Certificat de formation professionnelle – secteur aide à la personne",
      "CAP Agent de Prévention et de Médiation",
      "Diplôme d'aide-soignant(e) obtenu à l'étranger",
      "DEAVS (Diplôme d'État d'Auxiliaire de Vie Sociale)",
      "Titre professionnel Assistant de vie aux familles",
      "BEP Carrières sanitaires et sociales",
      "Brevet des collèges (obtenu en France)",
      "DELF A2 – Diplôme d'études en langue française",
    ];
  } else if (isIA) {
    diplomes = [
      "Baccalauréat général",
      "BTS Communication",
      "Licence Marketing et Communication",
      "DUT Information-Communication",
      "Master Communication digitale",
      "Licence professionnelle Métiers du numérique",
      "BTS NDRC (Négociation et Digitalisation de la Relation Client)",
      "Licence Arts, Lettres, Langues",
      "Master Journalisme et Médias numériques",
      "Bachelor Chef de projet digital",
    ];
  } else if (isEsthetique) {
    diplomes = [
      "Brevet des collèges",
      "Baccalauréat professionnel Commerce",
      "CAP Coiffure",
      "Attestation de formation en soins du visage",
      "Baccalauréat général",
      "BEP Vente action marchande",
      "Titre professionnel Vendeur-conseil en magasin",
      "CAP Employé de vente spécialisé",
      "Bac professionnel Esthétique Cosmétique Parfumerie (en cours)",
      "Certificat de qualification professionnelle Spa praticien",
    ];
  } else if (isManagement) {
    diplomes = [
      "Licence Management des organisations",
      "BTS Gestion de la PME",
      "Master Ressources Humaines",
      "Diplôme d'ingénieur généraliste",
      "MBA Management stratégique",
      "Licence AES (Administration Économique et Sociale)",
      "Master Management et Stratégie d'Entreprise",
      "DUT Gestion des Entreprises et des Administrations",
      "Licence professionnelle Management des équipes commerciales",
      "Master 2 Droit social et RH",
    ];
  } else if (isExcel) {
    diplomes = [
      "Baccalauréat ES",
      "BTS Comptabilité et Gestion",
      "DUT GEA",
      "Licence Économie-Gestion",
      "BTS Assistant de manager",
      "Master Finance d'entreprise",
      "CAP Employé de commerce",
      "Bac professionnel Gestion-Administration",
      "Licence professionnelle Métiers de la comptabilité",
      "BTS Support à l'Action Managériale",
    ];
  } else if (isAnglais) {
    diplomes = [
      "Baccalauréat général",
      "BTS Commerce International",
      "Licence LEA (Langues Étrangères Appliquées)",
      "DUT Techniques de Commercialisation",
      "Master Commerce international",
      "Licence professionnelle Import-Export",
      "BTS Assistant de manager",
      "Master Marketing international",
      "Diplôme d'école de commerce",
      "Licence Gestion des organisations",
    ];
  } else if (isDigital) {
    diplomes = [
      "Baccalauréat",
      "BTS Communication",
      "Licence Marketing",
      "DUT Métiers du multimédia et de l'internet",
      "Master Marketing digital",
      "Licence professionnelle E-commerce",
      "BTS Management Commercial Opérationnel",
      "Bachelor Webmarketing",
      "Master Entrepreneuriat et Innovation",
      "Licence Information-Communication",
    ];
  } else if (isInfo) {
    diplomes = [
      "Baccalauréat scientifique",
      "BTS SIO (Services Informatiques aux Organisations)",
      "DUT Informatique",
      "Licence Informatique",
      "BTS Systèmes Numériques",
      "Titre professionnel Technicien d'assistance en informatique",
      "Licence professionnelle Administration de systèmes",
      "Master MIAGE",
      "Bac professionnel Systèmes Numériques",
      "Certificat de qualification CISCO CCNA",
    ];
  } else {
    diplomes = [
      "Baccalauréat",
      "BTS tertiaire",
      "Licence professionnelle",
      "CAP/BEP",
      "DUT",
      "Master",
      "Bac professionnel",
      "Titre professionnel de niveau 4",
      "Certificat de compétences professionnelles",
      "Diplôme universitaire (DU)",
    ];
  }
  const diplome = diplomes[h(2) % diplomes.length];
  
  // === FINANCEMENTS (10 options variées) ===
  const financementsEntreprise = [
    "OPCO – prise en charge employeur à 100%",
    "Plan de développement des compétences de l'entreprise",
    "CPF co-financé par l'employeur (50/50)",
    "OPCO – prise en charge partielle + complément entreprise",
    "Plan de formation annuel – budget RH",
    "CPF mobilisé par le salarié avec accord de l'employeur",
    "OPCO – fonds mutualisés TPE/PME",
    "Plan de développement des compétences – dispositif Pro-A",
    "FNE-Formation (aide exceptionnelle de l'État)",
    "CPF de transition professionnelle (ex-CIF)",
  ];
  const financementsIndividuel = [
    "CPF (Compte Personnel de Formation) – solde suffisant",
    "Pôle emploi – AIF (Aide Individuelle à la Formation)",
    "Financement personnel – paiement en 3 fois",
    "CPF complété par un financement personnel",
    "Conseil Régional – aide à la formation des demandeurs d'emploi",
    "Pôle emploi – POEI (Préparation Opérationnelle à l'Emploi)",
    "Financement personnel intégral",
    "CPF – utilisation de la totalité du solde disponible",
    "AGEFIPH – aide à la formation des travailleurs handicapés",
    "Financement mixte : CPF + Pôle emploi (abondement)",
  ];
  const budget = hasEntreprise
    ? financementsEntreprise[h(3) % financementsEntreprise.length]
    : financementsIndividuel[h(3) % financementsIndividuel.length];
  
  // === ATTENTES (10 options par type, personnalisées) ===
  let attentesOptions: string[];
  if (isFLE) {
    attentesOptions = [
      `Améliorer le niveau de français de ${s.prenom} pour qu'il/elle puisse communiquer efficacement avec les usagers, les familles et l'équipe pluridisciplinaire dans le cadre de son poste au sein de ${s.entreprise}.`,
      `Permettre à ${s.prenom} de rédiger correctement les transmissions écrites et les comptes rendus dans le cahier de liaison, compétence indispensable pour son poste de ${s.poste} au sein de notre structure.`,
      `Développer les compétences linguistiques de ${s.prenom} en français professionnel médico-social pour sécuriser la qualité de l'accompagnement des usagers et réduire les risques liés aux erreurs de communication.`,
      `Renforcer la maîtrise du français de ${s.prenom} pour lui permettre de participer activement aux réunions d'équipe, aux transmissions orales et de contribuer pleinement à la vie de l'établissement.`,
      `Accompagner ${s.prenom} vers le niveau B1 en français pour qu'il/elle puisse comprendre les documents institutionnels (protocoles, chartes, projets personnalisés) nécessaires à l'exercice de ses fonctions.`,
      `Former ${s.prenom} aux écrits professionnels du secteur médico-social afin d'améliorer la traçabilité des soins et la qualité des transmissions au sein de notre équipe.`,
      `Permettre à ${s.prenom} d'acquérir le vocabulaire spécifique du secteur sanitaire et social pour une meilleure communication avec les équipes médicales et paramédicales.`,
      `Aider ${s.prenom} à surmonter la barrière linguistique qui limite actuellement ses possibilités d'évolution professionnelle au sein de ${s.entreprise}.`,
      `Développer chez ${s.prenom} la capacité à communiquer de manière professionnelle et adaptée avec les familles des résidents, en respectant le secret professionnel et les règles de bienveillance.`,
      `Offrir à ${s.prenom} les outils linguistiques pour exercer son métier de ${s.poste} en toute confiance et sécurité, tant dans les gestes professionnels que dans la communication orale et écrite.`,
    ];
  } else if (isIA) {
    attentesOptions = [
      `Permettre à ${s.prenom} de maîtriser les outils d'IA générative (ChatGPT, Midjourney, DALL-E) pour créer des contenus rédactionnels et visuels professionnels de qualité pour les besoins de communication de ${s.entreprise}.`,
      `Former ${s.prenom} au prompt engineering avancé pour optimiser la production de contenus marketing (articles, posts, newsletters) et réduire notre dépendance aux prestataires externes.`,
      `Accompagner ${s.prenom} dans la compréhension du cadre juridique et éthique de l'IA (RGPD, droit d'auteur, AI Act) pour une utilisation responsable et conforme dans notre activité.`,
      `Développer les compétences de ${s.prenom} en création visuelle assistée par IA pour produire des visuels cohérents avec notre charte graphique, sans recourir systématiquement à un graphiste.`,
      `Donner à ${s.prenom} un workflow complet texte + visuel par IA pour qu'il/elle puisse concevoir des campagnes de communication complètes de manière autonome.`,
      `Permettre à ${s.prenom} d'intégrer les outils d'IA dans ses missions de ${s.poste} chez ${s.entreprise}, afin d'accélérer la production de contenus tout en maintenant un haut niveau de qualité.`,
      `Outiller ${s.prenom} pour qu'il/elle puisse former à son tour ses collègues à l'utilisation de l'IA générative, dans le cadre de notre plan de transformation digitale.`,
      `Former ${s.prenom} à l'utilisation de Canva IA, Midjourney et ChatGPT pour renouveler nos supports de communication et moderniser notre image de marque.`,
      `Donner à ${s.prenom} les moyens de fact-checker et de vérifier systématiquement les contenus générés par IA, afin de garantir la fiabilité de nos publications.`,
      `Permettre à ${s.prenom} de créer un workflow de production de contenus intégrant l'IA, mesurable et documenté, pour en faire un processus reproductible au sein de notre équipe.`,
    ];
  } else if (isExcel) {
    attentesOptions = [
      `Former ${s.prenom} aux fonctions avancées d'Excel (RECHERCHEV, INDEX/EQUIV, SI imbriqués) pour automatiser le traitement des données et améliorer la fiabilité des reportings de ${s.entreprise}.`,
      `Permettre à ${s.prenom} de créer des tableaux croisés dynamiques et des tableaux de bord pour fournir des analyses synthétiques à la direction de ${s.entreprise}.`,
      `Développer les compétences de ${s.prenom} en macros VBA pour automatiser les tâches répétitives du service ${s.poste ? 'de ' + s.poste : ''} et gagner en productivité.`,
      `Accompagner ${s.prenom} vers l'autonomie complète sur Excel avancé pour qu'il/elle puisse prendre en charge l'ensemble du reporting mensuel de son service.`,
      `Former ${s.prenom} à la gestion de bases de données sur Excel et aux outils d'analyse (TCD, filtres avancés, Power Query) pour améliorer le pilotage d'activité.`,
      `Donner à ${s.prenom} les compétences nécessaires pour créer des modèles de calcul financier et des simulations budgétaires fiables et automatisés.`,
      `Permettre à ${s.prenom} de maîtriser la mise en forme conditionnelle et les graphiques avancés pour produire des documents visuels et professionnels.`,
      `Former ${s.prenom} aux fonctions matricielles et aux formules complexes pour résoudre des problématiques d'analyse de données avancées dans son poste de ${s.poste}.`,
      `Accompagner ${s.prenom} dans la création de tableaux de bord interactifs avec segments et chronologies pour le suivi en temps réel de l'activité commerciale.`,
      `Développer chez ${s.prenom} la capacité à auditer et corriger les fichiers Excel existants de ${s.entreprise}, souvent sources d'erreurs dans les processus actuels.`,
    ];
  } else if (isAnglais) {
    attentesOptions = [
      `Améliorer le niveau d'anglais professionnel de ${s.prenom} pour qu'il/elle puisse communiquer efficacement lors de réunions internationales avec nos partenaires anglophones.`,
      `Préparer ${s.prenom} au TOEIC avec un score visé supérieur à 785 pour valider son niveau et répondre aux exigences de nos clients internationaux.`,
      `Développer les compétences de ${s.prenom} en rédaction professionnelle en anglais (emails, rapports, présentations) pour assurer l'autonomie dans les échanges avec nos filiales étrangères.`,
      `Renforcer la confiance de ${s.prenom} à l'oral en anglais pour mener des négociations commerciales et des présentations devant des interlocuteurs internationaux.`,
      `Former ${s.prenom} à la communication interculturelle en anglais pour faciliter les collaborations avec nos équipes multiculturelles.`,
      `Permettre à ${s.prenom} de rédiger des comptes rendus de réunion et des rapports d'activité en anglais, compétence de plus en plus demandée dans son poste de ${s.poste}.`,
      `Accompagner ${s.prenom} dans la maîtrise de l'anglais des affaires pour qu'il/elle puisse représenter ${s.entreprise} lors de salons et conférences internationaux.`,
      `Développer chez ${s.prenom} les compétences en anglais téléphonique et en visioconférence, essentielles pour ses échanges quotidiens avec nos partenaires étrangers.`,
      `Former ${s.prenom} aux techniques de présentation en anglais (structure, transition, gestion du Q&A) pour valoriser les projets de ${s.entreprise} à l'international.`,
      `Renforcer le vocabulaire technique en anglais de ${s.prenom} dans son domaine d'expertise pour qu'il/elle puisse consulter la documentation internationale de référence.`,
    ];
  } else if (isManagement) {
    attentesOptions = [
      `Développer le style de leadership de ${s.prenom} pour motiver et fédérer son équipe autour d'objectifs communs et améliorer la performance collective chez ${s.entreprise}.`,
      `Former ${s.prenom} aux techniques de gestion des conflits et de communication managériale pour accompagner efficacement ses collaborateurs au quotidien.`,
      `Outiller ${s.prenom} pour conduire le changement dans son service, dans le contexte de transformation que connaît actuellement ${s.entreprise}.`,
      `Renforcer les compétences de ${s.prenom} en délégation et en gestion des priorités pour optimiser l'organisation de son équipe de ${s.poste}.`,
      `Permettre à ${s.prenom} de maîtriser les entretiens professionnels (annuels, recadrage, félicitations) et de développer une posture managériale bienveillante et exigeante.`,
      `Accompagner ${s.prenom} dans le passage d'expert métier à manager opérationnel, en développant les soft skills indispensables à l'encadrement d'équipe.`,
      `Former ${s.prenom} au management à distance et hybride, devenu incontournable dans l'organisation du travail chez ${s.entreprise}.`,
      `Donner à ${s.prenom} les clés pour créer une dynamique d'équipe positive, gérer les personnalités difficiles et maintenir la motivation dans un contexte de changement.`,
      `Développer chez ${s.prenom} la capacité à animer des réunions efficaces, à prendre des décisions en équipe et à communiquer une vision claire à ses collaborateurs.`,
      `Permettre à ${s.prenom} de construire son propre plan de développement managérial et de mettre en place des rituels de management adaptés à son équipe.`,
    ];
  } else if (isDigital) {
    attentesOptions = [
      `Former ${s.prenom} aux fondamentaux du SEO/SEA et Google Analytics pour optimiser la visibilité en ligne de ${s.entreprise} et mesurer les performances de nos actions digitales.`,
      `Permettre à ${s.prenom} de développer une stratégie de réseaux sociaux et de content marketing efficace pour accroître la notoriété de ${s.entreprise}.`,
      `Donner à ${s.prenom} les compétences en email marketing et publicité en ligne pour générer des leads qualifiés et augmenter notre chiffre d'affaires en ligne.`,
      `Former ${s.prenom} à la création de campagnes Google Ads et Facebook Ads pour que ${s.entreprise} puisse gérer ses campagnes en interne.`,
      `Développer les compétences de ${s.prenom} en analyse de données web pour piloter nos actions marketing par la donnée et optimiser notre ROI digital.`,
      `Outiller ${s.prenom} pour mettre en place une stratégie de contenus cohérente sur l'ensemble de nos canaux digitaux (site, blog, réseaux sociaux, newsletter).`,
      `Accompagner ${s.prenom} dans la maîtrise des outils de community management et de planification éditoriale pour professionnaliser notre présence en ligne.`,
      `Former ${s.prenom} au marketing automation et au CRM pour structurer le parcours client digital de ${s.entreprise}.`,
      `Permettre à ${s.prenom} de maîtriser les indicateurs clés de performance (KPI) du marketing digital pour produire des reportings pertinents à la direction.`,
      `Donner à ${s.prenom} une vision 360° du marketing digital pour qu'il/elle puisse coordonner les prestataires (agence web, graphiste, rédacteurs) et piloter notre stratégie en interne.`,
    ];
  } else {
    attentesOptions = [
      `Former ${s.prenom} aux compétences nécessaires en ${formation} pour qu'il/elle soit autonome dans ses tâches quotidiennes de ${s.poste} et améliorer sa productivité au sein de ${s.entreprise}.`,
      `Permettre à ${s.prenom} de monter en compétences sur ${formation} afin de prendre en charge de nouvelles responsabilités au sein de son service.`,
      `Accompagner ${s.prenom} dans sa progression en ${formation} pour répondre aux exigences actuelles de son poste de ${s.poste} et anticiper les évolutions du métier.`,
      `Développer chez ${s.prenom} les compétences clés de ${formation} pour améliorer la qualité des livrables produits par notre service.`,
      `Former ${s.prenom} pour qu'il/elle puisse assurer la continuité du service en cas d'absence de ses collègues sur les missions liées à ${formation}.`,
      `Donner à ${s.prenom} les bases solides de ${formation} dans le cadre de son intégration récente à l'équipe de ${s.entreprise}.`,
      `Permettre à ${s.prenom} de se perfectionner en ${formation} pour être force de proposition auprès de sa hiérarchie et contribuer activement à l'amélioration des processus.`,
      `Former ${s.prenom} aux outils et méthodes de ${formation} les plus récents pour maintenir la compétitivité de ${s.entreprise} dans son secteur.`,
      `Accompagner la montée en compétences de ${s.prenom} en ${formation} dans le cadre du plan de développement des compétences annuel de notre structure.`,
      `Donner à ${s.prenom} les moyens de transmettre les bonnes pratiques de ${formation} à ses collègues après la formation, en favorisant le partage de connaissances.`,
    ];
  }

  // === MISSIONS (10 options par type) ===
  let missionsEntreprise: string[];
  if (isFLE) {
    missionsEntreprise = [
      `${s.prenom} assure l'accompagnement quotidien des résidents : aide à la toilette, aux repas et à la mobilité. Il/elle participe aux transmissions orales et écrites auprès de l'équipe pluridisciplinaire de ${s.entreprise}.`,
      `En tant que ${s.poste}, ${s.prenom} est chargé(e) de l'accueil des usagers et de leurs familles, de la rédaction des transmissions dans le cahier de liaison et de l'application des protocoles de soins.`,
      `${s.prenom} intervient à domicile auprès de personnes âgées ou en situation de handicap : soins d'hygiène, préparation des repas, accompagnement aux rendez-vous médicaux et soutien administratif.`,
      `Au sein de ${s.entreprise}, ${s.prenom} accompagne les résidents dans les actes de la vie quotidienne, participe aux projets personnalisés et communique avec les familles et les partenaires extérieurs.`,
      `${s.prenom} est en charge de l'animation d'activités collectives pour les résidents, de la surveillance de leur état de santé et de la transmission des informations à l'équipe soignante.`,
      `En tant que ${s.poste} chez ${s.entreprise}, ${s.prenom} assure la coordination entre les intervenants (médecins, infirmiers, aides-soignants) et les familles des personnes accompagnées.`,
      `${s.prenom} participe aux réunions d'équipe hebdomadaires, à l'élaboration des projets personnalisés et à la mise à jour des dossiers des résidents au sein de ${s.entreprise}.`,
      `Les missions de ${s.prenom} incluent l'aide aux repas, l'accompagnement aux activités, la surveillance nocturne et la rédaction des rapports d'observation dans le cahier de liaison.`,
      `${s.prenom} est amené(e) à accueillir les nouveaux résidents, à leur présenter la structure et à les accompagner dans leur phase d'intégration au sein de l'établissement.`,
      `En plus des soins quotidiens, ${s.prenom} participe à la prévention des risques (chutes, dénutrition) et alerte l'équipe médicale en cas de changement d'état de santé des résidents.`,
    ];
  } else if (isIA) {
    missionsEntreprise = [
      `${s.prenom} est en charge de la création de contenus marketing pour ${s.entreprise} : articles de blog, newsletters mensuelles, posts réseaux sociaux et visuels pour les campagnes de communication.`,
      `En tant que ${s.poste}, ${s.prenom} gère la communication digitale de ${s.entreprise} : production de contenus rédactionnels, création de visuels pour le site web et animation des réseaux sociaux.`,
      `${s.prenom} développe les supports de communication de ${s.entreprise} (brochures, présentations, flyers) et produit des contenus multimédias pour les différents canaux de diffusion.`,
      `Au sein de ${s.entreprise}, ${s.prenom} anime les réseaux sociaux, rédige les fiches produit, crée les visuels promotionnels et assure la veille concurrentielle sur les contenus.`,
      `${s.prenom} est responsable de la ligne éditoriale de ${s.entreprise} et doit produire régulièrement des contenus engageants pour développer l'audience et la notoriété de la marque.`,
      `Les missions de ${s.prenom} incluent la rédaction de dossiers de presse, la création de supports événementiels et la production de contenus pour les partenaires de ${s.entreprise}.`,
      `En tant que ${s.poste}, ${s.prenom} pilote les campagnes d'emailing de ${s.entreprise}, crée les landing pages et optimise les parcours de conversion digitaux.`,
      `${s.prenom} conçoit les programmes de formation interne de ${s.entreprise} et produit les supports pédagogiques (présentations, vidéos, quiz) pour les sessions de formation.`,
      `Au sein de l'équipe communication, ${s.prenom} coordonne la production de contenus multicanaux et assure la cohérence de l'image de marque de ${s.entreprise} sur tous les supports.`,
      `${s.prenom} est chargé(e) de la production éditoriale de ${s.entreprise} : rédaction, relecture, mise en page et diffusion des contenus sur les différents canaux de communication.`,
    ];
  } else {
    missionsEntreprise = [
      `En tant que ${s.poste} chez ${s.entreprise}, ${s.prenom} est en charge de la rédaction de documents, la préparation de rapports et la gestion de fichiers liés à ${formation}.`,
      `${s.prenom} utilise quotidiennement les outils liés à ${formation} pour la gestion administrative, le suivi des dossiers et la production de livrables pour son service.`,
      `Au sein de ${s.entreprise}, ${s.prenom} prend en charge des projets nécessitant une maîtrise de ${formation}, incluant la coordination avec les autres services.`,
      `${s.prenom} assure le suivi budgétaire et le reporting de son service en utilisant les outils liés à ${formation}, compétences essentielles dans son poste de ${s.poste}.`,
      `Les missions de ${s.prenom} incluent l'analyse de données, la production de tableaux de bord et la présentation de résultats à la direction de ${s.entreprise}.`,
      `${s.prenom} est responsable de la formation des nouveaux collaborateurs sur les outils liés à ${formation} et de la mise à jour des procédures internes.`,
      `En tant que ${s.poste}, ${s.prenom} participe à l'amélioration continue des processus de ${s.entreprise} en utilisant les compétences de ${formation}.`,
      `${s.prenom} gère les relations avec les fournisseurs/clients et produit la documentation associée, nécessitant des compétences solides en ${formation}.`,
      `Au quotidien, ${s.prenom} analyse les performances de son service et propose des améliorations basées sur les données, en s'appuyant sur les outils de ${formation}.`,
      `${s.prenom} assure la veille technique sur ${formation} et partage les bonnes pratiques avec son équipe pour maintenir le niveau de compétence du service.`,
    ];
  }

  // === CONTRIBUTION ENTREPRISE (10 options) ===
  let contributionEntreprise: string[];
  if (isFLE) {
    contributionEntreprise = [
      `Cette formation permettra d'améliorer la qualité des transmissions écrites et orales de ${s.prenom}, de renforcer la sécurité des soins et de fluidifier la communication au sein de l'équipe de ${s.entreprise}.`,
      `Elle contribuera à l'autonomie de ${s.prenom} dans la compréhension des protocoles et à une meilleure communication avec les usagers et leurs familles, améliorant la qualité globale de l'accompagnement.`,
      `L'amélioration des compétences linguistiques de ${s.prenom} renforcera la qualité de la prise en charge et réduira les risques liés aux incompréhensions dans les transmissions d'informations.`,
      `Cette formation s'inscrit dans notre politique d'intégration et de valorisation des compétences de nos salariés d'origine étrangère. Elle permettra à ${s.prenom} de s'épanouir professionnellement.`,
      `En développant le français professionnel de ${s.prenom}, nous améliorerons la traçabilité des soins et la conformité de nos pratiques avec les exigences réglementaires du secteur médico-social.`,
    ];
  } else if (isIA) {
    contributionEntreprise = [
      `Cette formation permettra à ${s.entreprise} de multiplier par 3 la production de contenus de qualité tout en réduisant les coûts de sous-traitance graphique et rédactionnelle.`,
      `La maîtrise des outils d'IA par ${s.prenom} accélérera la création de campagnes marketing et renforcera la réactivité de la communication de ${s.entreprise} sur les réseaux sociaux.`,
      `L'intégration de l'IA dans nos processus de création de contenus améliorera la compétitivité de ${s.entreprise} et notre capacité à produire des supports professionnels de manière autonome.`,
      `Cette formation permettra à ${s.entreprise} de se positionner à la pointe de l'innovation en matière de communication digitale et de tirer parti des technologies d'IA de manière responsable.`,
      `En formant ${s.prenom}, nous internalisons des compétences stratégiques en création de contenus qui réduiront nos délais de production et renforceront notre agilité marketing.`,
    ];
  } else {
    contributionEntreprise = [
      `Cette formation permettra d'améliorer la qualité et la rapidité des productions de ${s.prenom} liées à ${formation}, bénéficiant directement à l'efficacité du service au sein de ${s.entreprise}.`,
      `Elle contribuera à l'autonomie de ${s.prenom} et réduira le besoin de sous-traitance pour les tâches liées à ${formation}, générant des économies pour ${s.entreprise}.`,
      `L'acquisition de ces compétences par ${s.prenom} s'inscrit dans notre plan de développement des compétences et renforce la compétitivité de ${s.entreprise} dans son secteur.`,
      `En formant ${s.prenom}, ${s.entreprise} investit dans le capital humain et garantit la continuité des compétences clés nécessaires à son activité.`,
      `Cette formation répond à un besoin identifié lors de l'entretien professionnel de ${s.prenom} et s'inscrit dans les objectifs stratégiques de développement de ${s.entreprise}.`,
    ];
  }

  // === OBJECTIFS PERSONNELS (10 options par type) ===
  let objectifOptions: string[];
  if (isFLE) {
    objectifOptions = [
      "Je souhaite atteindre le niveau B1 en français pour mieux communiquer dans mon environnement professionnel médico-social et me sentir plus légitime et confiant(e) dans mon poste au quotidien.",
      "Mon objectif est de maîtriser le français professionnel du secteur sanitaire et social pour rédiger les transmissions de manière autonome et participer activement aux réunions d'équipe sans appréhension.",
      "Je veux améliorer ma compréhension du français écrit pour mieux comprendre les protocoles, les chartes et les documents institutionnels de mon établissement, et ainsi mieux protéger les usagers.",
      "Cette formation me permettra de renforcer mes compétences en communication orale pour l'accueil des usagers et les échanges avec les familles, une partie essentielle de mon travail quotidien.",
      "J'ai besoin de progresser en français professionnel pour pouvoir évoluer vers un poste à responsabilités dans le secteur médico-social et accéder à une VAE DEAS.",
      "Mon objectif est de me sentir à l'aise lors des transmissions orales du matin et du soir, pour communiquer les informations importantes sur les résidents de manière claire et précise.",
      "Je souhaite développer mon vocabulaire médico-social spécifique pour mieux comprendre les diagnostics, les protocoles de soins et les prescriptions médicales dans mon travail.",
      "Mon but est de pouvoir remplir correctement les documents administratifs (fiches d'incident, projets personnalisés, comptes rendus) sans avoir besoin d'aide de mes collègues.",
      "Je veux gagner en confiance dans ma communication écrite et orale en français pour être pleinement intégré(e) à l'équipe et reconnu(e) pour mes compétences professionnelles.",
      "Cette formation est une étape clé pour mon intégration professionnelle durable dans le secteur sanitaire et social en France, secteur dans lequel j'exerce depuis plusieurs années.",
    ];
  } else if (isIA) {
    objectifOptions = [
      "Je souhaite maîtriser les outils d'IA générative (ChatGPT, Midjourney, DALL-E) pour créer des contenus professionnels de qualité et gagner significativement en productivité dans ma production de contenus.",
      "Mon objectif est d'intégrer l'IA dans mon workflow quotidien de création de contenus pour produire des campagnes complètes (texte + visuel) de manière rapide, efficace et cohérente.",
      "Je veux comprendre les bonnes pratiques et le cadre juridique de l'IA générative (RGPD, droit d'auteur, AI Act) pour utiliser ces outils de manière responsable et conforme dans mon activité.",
      "Cette formation me permettra de développer mes compétences en prompt engineering pour obtenir des résultats de qualité professionnelle dès les premières itérations avec les outils d'IA.",
      "J'ai pour objectif de maîtriser la création visuelle par IA (Midjourney, DALL-E, Canva IA) pour produire des visuels professionnels cohérents avec ma charte graphique sans dépendre d'un graphiste.",
      "Mon but est de pouvoir créer une campagne de communication complète (article, post LinkedIn, email, visuel) en une journée au lieu d'une semaine, grâce à l'IA.",
      "Je souhaite apprendre à vérifier et enrichir les contenus générés par IA pour garantir leur fiabilité, leur originalité et leur pertinence pour mon audience cible.",
      "Mon objectif est de devenir la personne référente en IA au sein de mon équipe et de pouvoir former mes collègues aux bonnes pratiques du prompting.",
      "Je veux explorer les possibilités de l'IA pour la création de contenus pédagogiques (supports de formation, quiz, tutoriels) dans le cadre de mes fonctions.",
      "Cette formation me permettra de diversifier mes compétences et de rester compétitif(ve) sur le marché du travail en maîtrisant les outils d'IA les plus demandés.",
    ];
  } else if (isExcel) {
    objectifOptions = [
      "Je souhaite maîtriser les formules avancées d'Excel (RECHERCHEV, INDEX/EQUIV, SI imbriqués) pour automatiser mes reportings mensuels et gagner plusieurs heures de travail par semaine.",
      "Mon objectif est de créer des tableaux de bord professionnels avec TCD et graphiques dynamiques pour présenter des analyses claires et percutantes à ma direction.",
      "Je veux développer mes compétences en macros VBA pour automatiser les tâches répétitives qui monopolisent actuellement une grande partie de mon temps de travail.",
      "Cette formation me permettra de maîtriser la mise en forme conditionnelle avancée et les graphiques sparkline pour produire des fichiers visuels et impactants.",
      "Mon but est de devenir autonome sur la création de modèles financiers sous Excel, compétence indispensable pour mon évolution vers un poste de contrôleur de gestion.",
      "Je souhaite apprendre à utiliser Power Query et les fonctions de nettoyage de données pour traiter efficacement les fichiers volumineux que je reçois chaque mois.",
      "Mon objectif est de consolider mes bases sur les fonctions de recherche et les références absolues/relatives, que j'utilise au quotidien sans toujours les maîtriser.",
      "Je veux être capable de créer des fichiers Excel robustes avec des validations de données et des protections de feuilles pour fiabiliser les outils de mon service.",
      "Cette formation doit me permettre de remplacer mes fichiers manuels actuels par des tableaux automatisés fiables, gagnant ainsi en qualité et en rapidité.",
      "Mon objectif est de passer d'un niveau utilisateur intermédiaire à un niveau avancé pour pouvoir répondre aux demandes croissantes d'analyse de données de ma hiérarchie.",
    ];
  } else if (isAnglais) {
    objectifOptions = [
      "Je souhaite obtenir un score TOEIC supérieur à 785 pour valider officiellement mon niveau d'anglais et accéder à des postes nécessitant des compétences linguistiques certifiées.",
      "Mon objectif est de gagner en aisance à l'oral en anglais professionnel pour mener des réunions et des négociations avec des interlocuteurs internationaux sans stress.",
      "Je veux renforcer mes compétences en rédaction professionnelle en anglais pour être totalement autonome dans ma correspondance avec nos partenaires étrangers.",
      "Cette formation me permettra de maîtriser l'anglais des réunions (animer, participer, rédiger les minutes) compétence de plus en plus demandée dans mon poste.",
      "Mon but est de pouvoir faire des présentations commerciales en anglais de manière fluide et convaincante devant des audiences internationales.",
      "Je souhaite développer mon vocabulaire technique en anglais dans mon domaine pour pouvoir consulter directement la documentation internationale sans traduction.",
      "Mon objectif est de me sentir à l'aise au téléphone et en visioconférence en anglais, situations que j'appréhende actuellement par manque de pratique.",
      "Cette formation doit me permettre de rédiger des emails professionnels en anglais (demande, réclamation, négociation) avec un ton adapté et sans erreur embarrassante.",
      "Je veux comprendre les nuances culturelles de la communication en anglais des affaires pour éviter les malentendus avec nos partenaires anglo-saxons.",
      "Mon objectif est d'atteindre le niveau B2/C1 en anglais pour pouvoir envisager une mobilité internationale au sein de mon groupe.",
    ];
  } else if (isManagement) {
    objectifOptions = [
      "Je souhaite développer mon style de leadership pour motiver mon équipe, fédérer autour d'objectifs communs et améliorer durablement la performance collective.",
      "Mon objectif est de maîtriser les techniques de gestion des conflits pour désamorcer les tensions au sein de mon équipe et maintenir un climat de travail positif.",
      "Je veux acquérir les outils de la conduite du changement car mon entreprise traverse une période de transformation importante qui impacte mon équipe.",
      "Cette formation me permettra de passer d'un management intuitif à un management structuré, avec des outils concrets pour le suivi de performance et la délégation.",
      "Mon but est de gagner en légitimité en tant que manager récemment nommé(e) et de construire une relation de confiance avec mon équipe.",
      "Je souhaite développer mes compétences en feedback constructif et en entretien professionnel pour accompagner la progression de chacun de mes collaborateurs.",
      "Mon objectif est de mieux gérer mon temps et mes priorités en tant que manager pour consacrer plus de temps à l'accompagnement de mon équipe.",
      "Cette formation doit m'aider à prendre du recul sur mes pratiques managériales et à identifier mes axes de progression grâce aux mises en situation filmées.",
      "Je veux apprendre à animer des réunions d'équipe efficaces et à communiquer une vision claire pour donner du sens au travail de chacun.",
      "Mon objectif est de développer mon intelligence émotionnelle et ma capacité d'écoute pour mieux comprendre les besoins et les motivations de mes collaborateurs.",
    ];
  } else if (isDigital) {
    objectifOptions = [
      "Je souhaite maîtriser les fondamentaux du SEO technique et éditorial pour améliorer significativement le référencement naturel de mon entreprise sur Google.",
      "Mon objectif est de développer une stratégie de contenu efficace sur les réseaux sociaux pour accroître la notoriété de ma marque et générer de l'engagement.",
      "Je veux acquérir les compétences en Google Ads et Facebook Ads pour lancer et piloter des campagnes publicitaires en ligne de manière autonome et rentable.",
      "Cette formation me permettra de maîtriser Google Analytics 4 pour analyser le trafic web, comprendre le comportement des visiteurs et optimiser nos conversions.",
      "Mon but est de pouvoir créer et gérer une stratégie d'email marketing professionnelle (segmentation, automatisation, A/B testing) pour notre base de contacts.",
      "Je souhaite développer mes compétences en création de contenu vidéo et en storytelling digital pour diversifier les formats de communication de mon entreprise.",
      "Mon objectif est de comprendre les mécanismes des algorithmes des réseaux sociaux pour maximiser la portée organique de nos publications.",
      "Cette formation doit me permettre de construire un tableau de bord marketing complet avec les KPI pertinents pour piloter notre stratégie digitale.",
      "Je veux maîtriser les techniques de growth hacking et d'inbound marketing pour générer des leads qualifiés à moindre coût pour mon entreprise.",
      "Mon objectif est de devenir autonome dans la conception et le déploiement de campagnes marketing multicanales (SEO, SEA, social, email) pour mon activité.",
    ];
  } else {
    objectifOptions = [
      `Je souhaite acquérir les compétences de base de ${formation} pour gagner en autonomie dans mes tâches quotidiennes et ne plus dépendre de mes collègues pour ces aspects.`,
      `Mon objectif est de me perfectionner en ${formation} pour évoluer vers un poste à responsabilités dans mon domaine et enrichir mon profil professionnel.`,
      `Je souhaite maîtriser ${formation} pour être plus efficace dans mon travail quotidien, gagner en confiance et pouvoir prendre en charge des missions plus complexes.`,
      `Cette formation doit me permettre de combler un manque identifié dans mes compétences en ${formation}, frein actuel à mon évolution professionnelle.`,
      `Mon but est d'atteindre un niveau d'expertise en ${formation} qui me permette de former à mon tour mes collègues et de devenir référent(e) sur ce sujet.`,
      `Je veux consolider mes connaissances en ${formation} par une approche structurée et professionnelle, au-delà de l'apprentissage autodidacte que j'ai fait jusqu'ici.`,
      `Mon objectif est de valider mes compétences en ${formation} par cette formation certifiante pour renforcer mon employabilité et mon parcours professionnel.`,
      `Cette formation s'inscrit dans mon projet de reconversion professionnelle et me permettra d'acquérir les bases indispensables en ${formation} pour mon futur métier.`,
      `Je souhaite gagner en productivité et en qualité dans l'utilisation de ${formation} pour répondre aux exigences croissantes de mon poste de ${s.poste}.`,
      `Mon objectif est de maîtriser les dernières évolutions de ${formation} pour rester à jour et continuer à apporter de la valeur ajoutée à mon entreprise.`,
    ];
  }

  // === PROJET PRO (10 options par type) ===
  let projetProOptions: string[];
  if (isFLE) {
    projetProOptions = [
      `Cette formation me permettra de mieux m'intégrer professionnellement dans le secteur médico-social, de communiquer efficacement avec les équipes et les usagers, et d'accéder à terme à une qualification reconnue (DEAS, DEAES).`,
      `En atteignant le niveau B1, je pourrai exercer mon métier avec plus d'autonomie et envisager une évolution vers un poste de coordinateur(trice) ou de référent(e) au sein de ma structure.`,
      `La maîtrise du français professionnel me permettra de sécuriser mon emploi, d'améliorer la qualité de mon accompagnement et de préparer une VAE pour obtenir un diplôme du secteur.`,
      `Grâce à cette formation, je serai en mesure de comprendre et rédiger les documents professionnels, ce qui me permettra d'évoluer vers des fonctions d'encadrement dans le médico-social.`,
      `Cette formation est une étape clé dans mon parcours d'insertion professionnelle dans le secteur sanitaire et social en France, pays dans lequel je souhaite construire toute ma carrière.`,
      `Mon projet est de devenir aide-soignant(e) diplômé(e) d'État, et la maîtrise du français est un prérequis indispensable pour réussir les épreuves du DEAS.`,
      `Je souhaite évoluer vers un poste de maître(sse) de maison ou de gouvernant(e), ce qui nécessite de bonnes compétences rédactionnelles en français.`,
      `Cette formation me rapprochera de mon objectif d'obtenir la nationalité française, pour laquelle un niveau B1 en français est exigé.`,
      `Mon projet est de pouvoir aider les nouvelles recrues étrangères de mon établissement en devenant un relais linguistique au sein de l'équipe.`,
      `À terme, je souhaite créer une petite structure d'aide à domicile, et la maîtrise du français professionnel est indispensable pour les démarches administratives et la relation avec les bénéficiaires.`,
    ];
  } else if (isIA) {
    projetProOptions = [
      `Grâce à la maîtrise de l'IA générative, je pourrai proposer des prestations de création de contenus à haute valeur ajoutée et me positionner sur un marché en forte croissance.`,
      `Cette formation me permettra d'intégrer l'IA dans ma pratique professionnelle de ${s.poste} chez ${s.entreprise}, de multiplier ma productivité et de me démarquer par des compétences innovantes.`,
      `En maîtrisant les outils d'IA, je pourrai créer de manière autonome l'ensemble des supports de communication de ${s.entreprise} et réduire significativement les coûts de production.`,
      `Cette formation s'inscrit dans mon projet d'évolution vers un poste de responsable de la stratégie de contenu, combinant expertise éditoriale et maîtrise des outils d'IA.`,
      `La maîtrise du workflow IA texte + visuel me permettra de développer une activité de consultant(e) indépendant(e) en stratégie de contenu augmentée par l'IA.`,
      `Mon projet est de créer une offre de formation à l'IA générative pour les professionnels de la communication, en m'appuyant sur les compétences acquises lors de cette formation.`,
      `Cette formation me permettra de piloter la transformation digitale de ${s.entreprise} en intégrant l'IA dans les processus de production de contenus de manière structurée et éthique.`,
      `Mon objectif est de devenir expert(e) en prompt engineering et en IA appliquée à la communication pour accompagner les entreprises dans cette transition technologique majeure.`,
      `Grâce à cette formation, je pourrai proposer à ${s.entreprise} un plan de productivité basé sur l'IA, démontrant un ROI concret et mesurable sur la production de contenus.`,
      `Cette formation est un investissement dans ma carrière qui me permettra de rester pertinent(e) et compétitif/ve sur le marché du travail face à l'essor de l'IA.`,
    ];
  } else {
    projetProOptions = [
      `Cette formation me permettra de gagner en autonomie dans l'utilisation de ${formation} et d'être plus performant(e) dans mon poste de ${s.poste} au sein de ${s.entreprise}.`,
      `En maîtrisant ${formation}, je pourrai prétendre à des postes nécessitant cette compétence et faire évoluer ma carrière professionnelle vers plus de responsabilités.`,
      `La maîtrise de ${formation} est essentielle pour mon projet de reconversion et me permettra d'accéder à de nouvelles opportunités professionnelles dans ce domaine.`,
      `Cette formation s'inscrit dans un parcours de montée en compétences qui me permettra d'obtenir une certification reconnue et de valoriser mon profil sur le marché de l'emploi.`,
      `Mon projet est de devenir référent(e) ${formation} au sein de ${s.entreprise} et de contribuer à l'amélioration des processus de mon service grâce aux compétences acquises.`,
      `Grâce à cette formation, je pourrai proposer des solutions innovantes à ${s.entreprise} et participer activement aux projets stratégiques nécessitant des compétences en ${formation}.`,
      `Cette formation me donnera les outils nécessaires pour être plus efficace au quotidien et consacrer plus de temps à des missions à plus forte valeur ajoutée.`,
      `Mon projet est de combiner cette formation avec d'autres compétences pour développer une expertise transversale unique, valorisable dans mon secteur d'activité.`,
      `En me formant à ${formation}, je sécurise mon employabilité à long terme et j'anticipe les évolutions de mon métier qui nécessiteront de plus en plus ces compétences.`,
      `Cette formation me permettra de concrétiser un projet professionnel mûrement réfléchi et d'accéder à un poste en adéquation avec mes aspirations et mes talents.`,
    ];
  }

  // === HANDICAP (variété des réponses) ===
  const handicapResponses = [
    "Non, je ne suis pas en situation de handicap et je n'ai pas besoin d'aménagement particulier pour suivre cette formation.",
    "Non. Aucune adaptation nécessaire.",
    "Non, pas de situation de handicap déclarée. Je n'ai pas de besoin spécifique.",
    "Non. Je suis en bonne santé et je peux suivre la formation dans les conditions standard proposées.",
    "Non, je ne suis pas en situation de handicap. Je n'ai besoin d'aucun aménagement spécifique.",
    "Non. Toutefois, je porte des lunettes de correction et apprécierais un écran de taille suffisante pour le confort visuel.",
    "Non, je n'ai pas de reconnaissance de handicap. Cependant, je signale un léger problème d'audition qui ne nécessite pas d'aménagement particulier.",
    "Non, aucune situation de handicap. Je suis disponible aux horaires proposés sans contrainte spécifique.",
    "Non. J'ai pris connaissance de la possibilité de contacter le référent handicap de l'organisme en cas de besoin.",
    "Non, pas de handicap. Je n'ai aucune contrainte particulière pour suivre cette formation.",
  ];

  return {
    civilite,
    raisonSociale: hasEntreprise ? s.entreprise : "/",
    attentes: hasEntreprise ? attentesOptions[h(4) % attentesOptions.length] : "/",
    missions: hasEntreprise ? missionsEntreprise[h(5) % missionsEntreprise.length] : "/",
    contribution: hasEntreprise ? contributionEntreprise[h(6) % contributionEntreprise.length] : "/",
    diplome,
    objectif: objectifOptions[h(7) % objectifOptions.length],
    budget,
    projetPro: projetProOptions[h(8) % projetProOptions.length],
    handicap: handicapResponses[h(9) % handicapResponses.length],
  };
}

function genDeroulePedagogiqueDetaille(o: OrganismeInfo, f: FormationInfo) {
  const jours = f.programme ? f.programme.split("\n").filter(l => l.trim()) : ["Contenu de la formation"];
  const nbJours = jours.length;
  const formation = f.intitule || "la formation";
  
  // Parse total hours from duree field (e.g. "21 heures (3 jours)" -> 21)
  const dureeMatch = f.duree.match(/(\d+)\s*h/i);
  const totalHeures = dureeMatch ? parseInt(dureeMatch[1]) : nbJours * 7;
  const heuresParJour = totalHeures / nbJours;
  
  // Parse each day's topic
  const dayTopics = jours.map(j => j.replace(/^(Jour|Module)\s*\d+\s*[:\-–]\s*/i, '').trim());
  
  let extraHtml = '';
  
  jours.forEach((jour, di) => {
    const topic = dayTopics[di];
    const isFirstDay = di === 0;
    const isLastDay = di === nbJours - 1;
    const jourLabel = jour.match(/^(Jour|Module)\s*\d+/i) ? jour.split(/[:\-–]/)[0].trim() : `Jour ${di + 1}`;
    
    extraHtml += `<h3 style="margin-top:${di > 0 ? '25' : '10'}px;color:#1e3a7b;font-size:13pt">${jourLabel} – ${topic}</h3>`;
    
    extraHtml += `<table border="1" cellpadding="5" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:9pt;margin-bottom:10px">`;
    extraHtml += `<tr style="background:#1e3a7b;color:#fff;font-weight:bold">
      <td style="width:15%">Séquence</td>
      <td style="width:7%">Durée</td>
      <td style="width:14%">Objectif pédagogique</td>
      <td style="width:16%">Contenus abordés</td>
      <td style="width:13%">Méthodes & activités</td>
      <td style="width:12%">Outils / supports</td>
      <td style="width:12%">Évaluation</td>
      <td style="width:11%">Adaptations</td>
    </tr>`;
    
    const sequences = generateDaySequences(topic, formation, isFirstDay, isLastDay, f, heuresParJour);
    sequences.forEach((seq, si) => {
      const bgColor = si % 2 === 0 ? '#ffffff' : '#f2f6fc';
      extraHtml += `<tr style="background:${bgColor}">
        <td>${seq.sequence}</td>
        <td>${seq.duree}</td>
        <td>${seq.objectif}</td>
        <td>${seq.contenus}</td>
        <td>${seq.methodes}</td>
        <td>${seq.outils}</td>
        <td>${seq.evaluation}</td>
        <td>${seq.adaptations}</td>
      </tr>`;
    });
    
    extraHtml += `</table>`;
  });
  
  return buildDocument({ org: o, title: "Déroulé pédagogique détaillé de la formation", subtitle: f.intitule, extraHtml });
}

interface DaySequence {
  sequence: string;
  duree: string;
  objectif: string;
  contenus: string;
  methodes: string;
  outils: string;
  evaluation: string;
  adaptations: string;
}

function generateDaySequences(topic: string, formation: string, isFirstDay: boolean, isLastDay: boolean, f: FormationInfo, heuresParJour: number): DaySequence[] {
  const sequences: DaySequence[] = [];
  const modalite = (f.modalites || "présentiel").toLowerCase();
  const isDistanciel = modalite.includes("distanciel") || modalite.includes("distance");
  const outilsBase = isDistanciel ? "PC, plateforme e-learning, visioconférence" : "PC, vidéoprojecteur";
  const lieuOutil = isDistanciel ? "Plateforme LMS" : "Salle de formation";
  
  // Parse topic into subtopics
  const subtopics = splitTopicIntoSubtopics(topic);
  
  // Calculate time budget in minutes
  const totalMinutes = Math.round(heuresParJour * 60);
  let remainingMinutes = totalMinutes;
  
  // Reserve time for fixed blocks
  const accueilMin = isFirstDay ? 30 : 0;
  const positionnementMin = isFirstDay ? 60 : 0;
  const evalFinaleMin = isLastDay ? 60 : 0;
  const bilanMin = isLastDay ? 30 : 0;
  const exercicesMin = !isLastDay ? 60 : 0;
  
  const fixedMin = accueilMin + positionnementMin + evalFinaleMin + bilanMin + exercicesMin;
  const contentMinutes = remainingMinutes - fixedMin;
  
  // Distribute content minutes across subtopics
  const nbSubtopics = subtopics.length;
  const minutesPerSubtopic = nbSubtopics > 0 ? Math.floor(contentMinutes / nbSubtopics) : contentMinutes;
  const extraMinutes = nbSubtopics > 0 ? contentMinutes - (minutesPerSubtopic * nbSubtopics) : 0;
  
  function formatMinutes(m: number): string {
    const h = Math.floor(m / 60);
    const min = m % 60;
    if (min === 0) return `${h}h00`;
    return `${h}h${String(min).padStart(2, '0')}`;
  }
  
  // Day 1: Start with Accueil & positionnement
  if (isFirstDay) {
    sequences.push({
      sequence: "Accueil & présentation",
      duree: formatMinutes(accueilMin),
      objectif: "Comprendre les objectifs et le cadre de la formation",
      contenus: "Présentation du programme, des objectifs, des modalités d'évaluation",
      methodes: "Échanges oraux, présentation du formateur",
      outils: "Support de présentation",
      evaluation: "Questions-réponses",
      adaptations: "Adaptation du rythme",
    });
    sequences.push({
      sequence: `Positionnement & introduction`,
      duree: formatMinutes(positionnementMin),
      objectif: `Évaluer le niveau initial sur ${truncate(topic, 40)}`,
      contenus: `Test de positionnement, introduction aux concepts de ${truncate(topic, 50)}`,
      methodes: "Démonstration + manipulation guidée",
      outils: `${outilsBase}, support pas-à-pas`,
      evaluation: "Test de positionnement initial",
      adaptations: "Aide individualisée",
    });
  }
  
  // Core content sequences from subtopics
  const methodesPool = [
    "Démonstration + exercices pratiques",
    "Exercices guidés",
    "Mise en situation pratique",
    "Démonstration + mise en pratique",
    "Travail autonome accompagné",
    "Apports théoriques + cas pratiques",
  ];
  const evalPool = [
    "Exercice pratique",
    "Observation en situation",
    "Exercice corrigé",
    "Vérification du document",
    "Document réalisé",
    "QCM intermédiaire",
  ];
  const adaptPool = [
    "Temps supplémentaire",
    "Soutien individualisé",
    "Adaptation du rythme",
    "Aide ciblée",
    "Accompagnement renforcé",
    "Support complémentaire",
  ];
  
  subtopics.forEach((st, i) => {
    const mins = minutesPerSubtopic + (i < extraMinutes ? 1 : 0);
    // Round to nearest 15 min for cleaner display
    const rounded = Math.max(30, Math.round(mins / 15) * 15);
    sequences.push({
      sequence: st.titre,
      duree: formatMinutes(rounded),
      objectif: st.objectif,
      contenus: st.contenus,
      methodes: methodesPool[i % methodesPool.length],
      outils: `${outilsBase}${st.outils ? ', ' + st.outils : ''}`,
      evaluation: evalPool[i % evalPool.length],
      adaptations: adaptPool[i % adaptPool.length],
    });
  });
  
  // Add practical exercises block
  if (!isLastDay) {
    sequences.push({
      sequence: "Exercices pratiques guidés",
      duree: formatMinutes(exercicesMin),
      objectif: "Mobiliser les acquis de la séquence",
      contenus: `Exercices de synthèse sur ${truncate(topic, 50)}`,
      methodes: "Travail autonome accompagné",
      outils: `${outilsBase}`,
      evaluation: "Évaluation formative",
      adaptations: "Accompagnement renforcé",
    });
  }
  
  // Last day: evaluation finale + bilan
  if (isLastDay) {
    sequences.push({
      sequence: "Évaluation finale",
      duree: "1h00",
      objectif: "Vérifier l'acquisition des compétences",
      contenus: "Cas pratique complet couvrant l'ensemble des acquis",
      methodes: "Travail autonome",
      outils: `${outilsBase}, grille d'évaluation`,
      evaluation: "Évaluation finale",
      adaptations: "Accompagnement renforcé",
    });
    sequences.push({
      sequence: "Bilan & grille d'acquisition",
      duree: "0h30",
      objectif: "Valider les acquis et clôturer la formation",
      contenus: "Restitution, bilan individuel, remise des attestations",
      methodes: "Échange formateur/stagiaire",
      outils: "Grille d'acquisition, questionnaire de satisfaction",
      evaluation: "Validation des compétences",
      adaptations: "Adaptation pédagogique",
    });
  }
  
  return sequences;
}

function truncate(s: string, max: number): string {
  return s.length > max ? s.slice(0, max) + "…" : s;
}

function splitTopicIntoSubtopics(topic: string): { titre: string; objectif: string; contenus: string; outils?: string }[] {
  // Try to split by commas, "et", "/"
  const parts = topic.split(/[,/]|(?:\set\s)/).map(p => p.trim()).filter(p => p.length > 2);
  
  if (parts.length >= 2) {
    return parts.slice(0, 5).map(p => ({
      titre: capitalize(p),
      objectif: `Maîtriser ${p.toLowerCase()}`,
      contenus: generateContenus(p),
    }));
  }
  
  // Single topic: break into introduction, core, practice
  return [
    {
      titre: `Introduction : ${truncate(topic, 40)}`,
      objectif: `Comprendre les fondamentaux de ${topic.toLowerCase()}`,
      contenus: `Concepts clés, vocabulaire, principes de base`,
    },
    {
      titre: `Approfondissement : ${truncate(topic, 35)}`,
      objectif: `Approfondir les techniques de ${topic.toLowerCase()}`,
      contenus: `Méthodes avancées, bonnes pratiques, cas concrets`,
    },
    {
      titre: `Mise en pratique`,
      objectif: `Appliquer les acquis en situation réelle`,
      contenus: `Exercices pratiques, études de cas, mises en situation`,
    },
  ];
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function generateContenus(part: string): string {
  const p = part.toLowerCase();
  // Try to generate specific content hints
  if (p.includes("formule") || p.includes("fonction") || p.includes("calcul")) return "Syntaxe, exemples, application sur données réelles";
  if (p.includes("tableau") || p.includes("tcd") || p.includes("croisé")) return "Création, paramétrage, filtres, mise en forme";
  if (p.includes("graphique") || p.includes("chart")) return "Types de graphiques, personnalisation, interprétation";
  if (p.includes("macro") || p.includes("vba")) return "Enregistrement, édition, affectation à un bouton";
  if (p.includes("mise en forme") || p.includes("format")) return "Police, taille, couleur, alignement, styles";
  if (p.includes("image") || p.includes("insertion")) return "Insertion, positionnement, redimensionnement, habillage";
  if (p.includes("tableau")) return "Création, mise en forme, fusion de cellules";
  if (p.includes("mail") || p.includes("email")) return "Structure, ton professionnel, formules de politesse";
  if (p.includes("présentation") || p.includes("powerpoint")) return "Création de diapositives, animations, transitions";
  if (p.includes("communication") || p.includes("oral")) return "Techniques d'expression, posture, écoute active";
  if (p.includes("négociation")) return "Techniques de négociation, argumentation, compromis";
  if (p.includes("management") || p.includes("leadership")) return "Styles de management, outils de pilotage, feedback";
  if (p.includes("conflit") || p.includes("gestion")) return "Identification, médiation, résolution, prévention";
  if (p.includes("seo") || p.includes("référencement")) return "Mots-clés, optimisation on-page, backlinks";
  if (p.includes("réseau") || p.includes("social")) return "Stratégie, calendrier éditorial, KPIs";
  if (p.includes("maquillage")) return "Techniques de base, colorimétrie, application professionnelle";
  if (p.includes("soin") || p.includes("visage")) return "Protocoles de soins, diagnostic peau, produits";
  if (p.includes("vente") || p.includes("conseil")) return "Techniques de vente, accueil client, argumentation";
  return `Concepts, méthodes et techniques de ${part.toLowerCase()}`; 
}

function genContratFormationPro(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "___", nom: "___", email: "", telephone: "" };
  return buildDocument({ org: o, title: "CONTRAT DE FORMATION PROFESSIONNELLE", subtitle: "Article L.6353-3 du Code du travail", formation: f, showFormationInfo: true, sections: [
    { heading: "Entre les parties", content: `<p><strong>L'organisme :</strong> ${o.nom}, ${o.adresse}, ${o.codePostal} ${o.ville}<br>SIRET : ${o.siret} – NDA : ${o.nda}<br>Représenté par : ${o.dirigeant}</p><p><strong>Le stagiaire :</strong> ${s.prenom} ${s.nom}<br>Email : ${s.email}</p>` },
    { heading: "Article 1 – Objet", content: `<p>Réalisation de l'action de formation « ${f.intitule} ».</p>` },
    { heading: "Article 2 – Caractéristiques", content: `<p><strong>Durée :</strong> ${f.duree}<br><strong>Dates :</strong> Du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}<br><strong>Modalité :</strong> ${f.modalites}<br><strong>Lieu :</strong> ${f.lieu}</p>` },
    { heading: "Article 3 – Prix", content: `<p>Prix : ${f.tarif}. TVA non applicable (art. 261-4-4° du CGI).</p>` },
    { heading: "Article 4 – Rétractation", content: "<p>Délai de rétractation de 10 jours à compter de la signature.</p>" },
  ], signatures: { type: "2", labels: ["Pour l'organisme", "Le Stagiaire"], names: [o.dirigeant, `${s.prenom} ${s.nom}`] } });
}

function genProcedureAccueilStagiaires(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE D'ACCUEIL DES STAGIAIRES", sections: [
    { heading: "Avant la formation (J-7)", content: "<p>• Envoi convocation et informations pratiques<br>• Envoi livret d'accueil et règlement intérieur<br>• Vérification besoins spécifiques</p>" },
    { heading: "Jour J – Accueil", content: "<p>• Accueil personnalisé<br>• Tour de table<br>• Présentation programme et objectifs<br>• Remise des documents<br>• Information conditions d'accès</p>", variant: "green" },
    { heading: "En cours de formation", content: "<p>• Suivi présence (émargement)<br>• Points réguliers<br>• Adaptation du rythme si nécessaire</p>" },
    { heading: "Fin de formation", content: "<p>• Évaluation finale<br>• Questionnaire satisfaction<br>• Remise attestations</p>" },
  ], signatures: { type: "2", labels: ["Le Resp. Pédagogique", "Le Dirigeant"], names: [o.responsablePedagogique, o.dirigeant] } });
}

function genGroupesNiveaux(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const rows = stagiaires.slice(0, 10).map((s, i) => {
    const niveau = i % 3 === 0 ? "Débutant" : i % 3 === 1 ? "Intermédiaire" : "Avancé";
    const groupe = i % 3 === 0 ? "Groupe A" : i % 3 === 1 ? "Groupe B" : "Groupe C";
    return [s.prenom + " " + s.nom, s.entreprise, niveau, groupe];
  });
  return buildDocument({ org: o, title: "GROUPES DE NIVEAUX", subtitle: f.intitule, formation: f, showFormationInfo: true, table: {
    headers: ["Stagiaire", "Entreprise", "Niveau initial", "Groupe"], rows
  }, sections: [
    { heading: "Critères", content: "<p>• Groupe A (Débutant) : score < 5/10<br>• Groupe B (Intermédiaire) : score 5-7/10<br>• Groupe C (Avancé) : score > 7/10</p>", variant: "green" },
  ], signatures: { type: "2", labels: ["Le Formateur", "Le Resp. Pédagogique"], names: [f.formateur, o.responsablePedagogique] } });
}

function genProcedureEvalDebutFormation(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE D'ÉVALUATION DE DÉBUT DE FORMATION", sections: [
    { heading: "Objet", content: `<p>Modalités d'évaluation des acquis à l'entrée en formation chez ${o.nom} (indicateur 8 du RNQ).</p>` },
    { heading: "Modalités", content: "<p>1. Test de positionnement (QCM 20 questions)<br>2. Analyse des résultats par le formateur<br>3. Constitution des groupes de niveaux<br>4. Adaptation du programme</p>" },
    { heading: "Traçabilité", content: "<p>Les résultats sont conservés dans le dossier stagiaire pour mesurer la progression.</p>", variant: "green" },
  ], signatures: { type: "2", labels: ["Le Resp. Pédagogique", "Le Dirigeant"], names: [o.responsablePedagogique, o.dirigeant] } });
}

function genGrilleAcquisitionCompetencesSF(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  let extra = "";
  stagiaires.slice(0, 10).forEach((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    extra += `<h3>${s.prenom} ${s.nom} – ${s.entreprise}</h3>`;
    const rows = evalData.competences.map((comp, ci) => {
      const initial = sc[ci % sc.length];
      const final_ = Math.min(10, initial + 2);
      return [comp, `${initial}/10`, `${final_}/10`, final_ >= 8 ? "✅ Acquis" : "🔄 En cours", `+${final_ - initial}`];
    });
    extra += tableHTML(["Compétence", "Entrée", "Sortie", "Statut", "Progression"], rows);
  });
  return buildDocument({ org: o, title: "GRILLE D'ACQUISITION DES COMPÉTENCES", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra,
    signatures: { type: "2", labels: ["Le Formateur", "Le Resp. Pédagogique"], names: [f.formateur, o.responsablePedagogique] } });
}

function genSupportCoursRef(o: OrganismeInfo, f: FormationInfo) {
  const chapters = getCourseChapters(f.intitule);
  
  let chaptersHtml = '';
  chapters.forEach((ch, ci) => {
    // Chapter title page
    chaptersHtml += `<div class="page-break"></div>`;
    chaptersHtml += `<div style="background:linear-gradient(135deg,hsl(220,60%,50%),hsl(240,50%,40%));color:white;padding:40px;border-radius:12px;margin-bottom:30px">`;
    chaptersHtml += `<h2 style="color:white;font-size:28px;margin:0">CHAPITRE ${ci + 1}</h2>`;
    chaptersHtml += `<h3 style="color:white;font-size:20px;margin-top:10px">${ch.title}</h3>`;
    chaptersHtml += `<p style="color:rgba(255,255,255,0.85);margin-top:10px">${ch.description}</p>`;
    chaptersHtml += `</div>`;
    
    ch.sections.forEach((sec, si) => {
      if (si > 0 && si % 2 === 0) chaptersHtml += `<div class="page-break"></div>`;
      chaptersHtml += `<div style="margin-bottom:25px">`;
      chaptersHtml += `<h3 style="color:hsl(220,60%,50%);font-size:16px;border-bottom:2px solid hsl(220,60%,50%);padding-bottom:5px;margin-bottom:12px">Section ${ci + 1}.${si + 1} — ${sec.title}</h3>`;
      chaptersHtml += sec.content;
      chaptersHtml += `</div>`;
    });
  });

  // Table des matières
  let tocHtml = '<div style="margin-bottom:30px"><h2 style="text-align:center;color:hsl(220,60%,50%)">SOMMAIRE</h2>';
  chapters.forEach((ch, ci) => {
    tocHtml += `<div style="margin:10px 0;font-weight:bold;font-size:14px">CHAPITRE ${ci + 1} — ${ch.title}</div>`;
    ch.sections.forEach((sec, si) => {
      tocHtml += `<div style="margin-left:20px;font-size:12px;color:#555">${ci + 1}.${si + 1} ${sec.title}</div>`;
    });
  });
  tocHtml += '</div>';

  // Closing page
  const closingHtml = `<div class="page-break"></div>
    <div style="text-align:center;padding:60px 20px">
      <h2 style="color:hsl(220,60%,50%);font-size:24px">Merci de votre attention</h2>
      <p style="color:#666;margin-top:15px">Nous espérons que ce support de cours vous a apporté les clés nécessaires pour maîtriser les compétences visées.</p>
      <div style="margin-top:40px">
        <p><strong>${o.dirigeant}</strong></p>
        <p style="color:#666">Dirigeant</p>
        <p style="margin-top:15px"><strong>${o.responsablePedagogique || ''}</strong></p>
        <p style="color:#666">Référent pédagogique</p>
      </div>
      <div style="margin-top:40px;color:#999;font-size:11px">
        <p>${o.nom}</p>
        <p>${o.adresse}, ${o.codePostal} ${o.ville}</p>
        <p>${o.email}</p>
        <p>SIRET ${o.siret}</p>
        ${o.nda ? `<p>NDA ${o.nda}</p><p style="font-style:italic">* Cet enregistrement ne vaut pas agrément de l'État</p>` : ''}
      </div>
    </div>`;

  return buildDocument({ 
    org: o, 
    title: "SUPPORT DE COURS", 
    subtitle: f.intitule, 
    formation: f, 
    showFormationInfo: true, 
    sections: [
      { heading: "Informations", content: `<p><strong>Type :</strong> Support PDF fourni à chaque stagiaire<br><strong>Mise à jour :</strong> ${o.dateMaj || new Date().toLocaleDateString('fr-FR')}<br><strong>Version :</strong> V${o.version || '1'}</p>` },
    ],
    extraHtml: tocHtml + chaptersHtml + closingHtml
  });
}

function genRessourcesPedagogiques(o: OrganismeInfo, f: FormationInfo) {
  const videos = getYoutubeVideos(f.intitule);
  
  let videosHtml = '';
  videos.forEach((v, i) => {
    videosHtml += `<div style="margin-bottom:15px;padding:12px;border:1px solid #e0e0e0;border-radius:8px;background:#fafafa">
      <p style="font-weight:bold;color:hsl(220,60%,50%)">${i + 1}) ${v.title}</p>
      <p style="font-size:12px;color:#666;margin:5px 0">${v.description}</p>
      <p><a href="${v.url}" style="color:hsl(220,60%,50%);text-decoration:underline">${v.url}</a></p>
    </div>`;
  });

  return buildDocument({ org: o, title: "RESSOURCES PÉDAGOGIQUES", subtitle: f.intitule, formation: f, showFormationInfo: true, sections: [
    { heading: "Supports de formation", content: `<p>• Support de cours PDF complet remis à chaque stagiaire<br>• Diaporama de présentation (PowerPoint)<br>• Fiches mémo et synthèses par chapitre<br>• Exercices pratiques et corrigés</p>` },
    { heading: "Outils numériques", content: `<p>• ${o.outilsUtilises || 'Plateforme e-learning, outils collaboratifs'}<br>• Plateforme e-learning (accès 6 mois après la formation)<br>• Outils de visioconférence pour les sessions distancielles<br>• QCM en ligne pour l'auto-évaluation</p>` },
    { heading: "Ressources vidéo complémentaires", content: `<p>Les vidéos ci-dessous sont mises à disposition des stagiaires pour approfondir les notions abordées en formation :</p>${videosHtml}` },
    { heading: "Ressources complémentaires", content: `<p>• Bibliographie et sitographie recommandées<br>• Tutoriels vidéo complémentaires sur la plateforme<br>• Fiches synthèse téléchargeables<br>• Glossaire des termes techniques<br>• FAQ et forum de discussion entre stagiaires</p>`, variant: "green" },
    { heading: "Modalités d'accès", content: `<p>• Les supports sont envoyés par email avant le début de la formation<br>• L'accès à la plateforme e-learning est activé le premier jour de formation<br>• Les ressources restent accessibles pendant 6 mois après la fin de la formation<br>• Un lien de téléchargement est fourni pour les documents PDF</p>` },
  ] });
}

function genMoyensMateriels(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "MOYENS MATÉRIELS ET RESSOURCES", sections: [
    { heading: "Locaux", content: `<p><strong>Adresse :</strong> ${o.adresse}, ${o.codePostal} ${o.ville}<br>Salles équipées, accessibilité PMR, wifi haut débit</p>` },
    { heading: "Équipements", content: "<p>• Ordinateurs, vidéoprojecteur, écran interactif<br>• Connexion fibre optique<br>• Imprimante réseau</p>" },
    { heading: "Documents justificatifs archivés", content: "<p>• Avis SIREN<br>• Bail de sous-location<br>• CV formateurs<br>• Factures matériel (PC, pack Office, outil IA)<br>• Photos des locaux</p>", variant: "green" },
  ] });
}

function genBailSousLocation(o: OrganismeInfo) {
  // Date du bail = dateMaj - 15 jours calendaires
  const refDate = o.dateMaj || new Date().toISOString().slice(0, 10);
  const bailDateStr = subtractBusinessDays(refDate, 15);
  const dateSignature = formatDate(bailDateStr);
  const dateDebut = dateSignature; // le bail commence à la signature
  const dateFin = (() => {
    const d = new Date(bailDateStr);
    d.setFullYear(d.getFullYear() + 2);
    return formatDate(d.toISOString());
  })();

  return buildDocument({ org: o, title: "BAIL DE SOUS-LOCATION", subtitle: "À USAGE DE SALLES DE FORMATION", sections: [
    { heading: "ENTRE LES SOUSSIGNÉS", content: `
      <h3>LE BAILLEUR</h3>
      <p>Madame/Monsieur [Nom du Bailleur],<br>
      Entrepreneur(e) individuel(le),<br>
      Immatriculé(e) sous le SIREN [SIREN Bailleur],<br>
      Demeurant à : [Adresse du Bailleur]</p>
      <p>Ci-après dénommé(e) « le Bailleur »,</p>
      <h3>ET</h3>
      <h3>LE PRENEUR</h3>
      <p><strong>${o.nom}</strong>,<br>
      Organisme de formation professionnelle,<br>
      SIRET : ${o.siret},<br>
      ${o.nda ? `Titulaire du NDA : ${o.nda},<br>` : ''}
      Ayant son siège social situé au : ${o.adresse}, ${o.codePostal} ${o.ville},<br>
      Représenté par ${o.dirigeant},<br>
      Ci-après dénommé « le Preneur ».</p>` },
    { heading: "ARTICLE 1 – OBJET DU BAIL", content: `<p>Le présent contrat constitue un bail de sous-location, régi par les articles 1713 et suivants du Code civil.</p><p>Le Bailleur consent au Preneur, qui accepte, la sous-location de locaux destinés exclusivement à l'exercice d'activités de formation professionnelle.</p>` },
    { heading: "ARTICLE 2 – DÉSIGNATION DES LOCAUX", content: `<p>Les locaux sont situés à l'adresse suivante :</p><p><strong>${o.adresse}, ${o.codePostal} ${o.ville}</strong></p><p>Ils se composent de :</p><ul><li>Deux (2) salles / bureaux</li><li>Superficie totale : 30 m², répartie comme suit :<ul><li>Salle 1 : 15 m²</li><li>Salle 2 : 15 m²</li></ul></li></ul><p>Les locaux sont mis à disposition avec le mobilier suivant : tables, chaises, bureaux, tableaux, écrans.</p><p>Le Preneur reconnaît avoir visité les locaux et les accepter en l'état.</p>` },
    { heading: "ARTICLE 3 – DESTINATION DES LOCAUX", content: `<p>Les locaux sont destinés exclusivement :</p><ul><li>à l'organisation,</li><li>à l'animation,</li><li>et à la gestion d'actions de formation professionnelle.</li></ul><p>Toute autre activité est interdite sans autorisation écrite préalable du Bailleur.</p>` },
    { heading: "ARTICLE 4 – DURÉE", content: `<p>Le présent bail est consenti pour une durée de <strong>vingt-quatre (24) mois</strong>,</p><p>à compter du <strong>${dateDebut}</strong>,</p><p>et prendra fin le <strong>${dateFin}</strong>,</p><p>sans tacite reconduction.</p>` },
    { heading: "ARTICLE 5 – LOYER", content: `<p>Le présent bail est consenti moyennant :</p><ul><li>Loyer annuel hors charges : 850 €</li><li>Paiement mensuel</li><li>Exigible le 5 de chaque mois</li><li>Règlement par virement bancaire</li></ul>` },
    { heading: "ARTICLE 6 – DÉPÔT DE GARANTIE", content: `<p>Le Preneur verse à la signature du présent bail un dépôt de garantie de <strong>1 200 €</strong>, correspondant à trois (3) mois de loyer hors charges.</p><p>Ce dépôt sera restitué à l'expiration du bail, déduction faite des sommes éventuellement dues.</p>` },
    { heading: "ARTICLE 7 – CHARGES ET SERVICES INCLUS", content: `<p>Sont inclus dans la sous-location :</p><ul><li>Électricité</li><li>Chauffage</li><li>Eau</li><li>Connexion Internet</li><li>Nettoyage des parties communes</li><li>Assurance des locaux</li><li>Tables et chaises</li><li>Ordinateur</li><li>Télévision / écran</li><li>Tableau</li></ul><p>Les charges exceptionnelles résultant de l'activité du Preneur restent à sa charge.</p>` },
    { heading: "ARTICLE 8 – ÉTAT DES LIEUX", content: `<p>Un état des lieux contradictoire sera établi lors de l'entrée et de la sortie du Preneur.</p><p>Il sera annexé au présent bail.</p>` },
    { heading: "ARTICLE 9 – ENTRETIEN ET RÉPARATIONS", content: `<p>Le Preneur s'engage à :</p><ul><li>maintenir les locaux en bon état d'entretien,</li><li>utiliser les équipements conformément à leur destination,</li><li>signaler immédiatement toute dégradation.</li></ul><p>Les grosses réparations relevant de l'article 606 du Code civil restent à la charge du Bailleur.</p>` },
    { heading: "ARTICLE 10 – ASSURANCES", content: `<p>Le Preneur s'engage à souscrire une assurance responsabilité civile professionnelle, couvrant l'ensemble de ses activités exercées dans les locaux.</p>` },
    { heading: "ARTICLE 11 – CESSION ET SOUS-LOCATION", content: `<p>Toute cession ou sous-location, totale ou partielle, est strictement interdite, sauf accord écrit préalable du Bailleur.</p>` },
    { heading: "ARTICLE 12 – RÉSILIATION", content: `<p>En cas de manquement grave aux obligations contractuelles, le présent bail pourra être résilié de plein droit après mise en demeure restée sans effet pendant trente (30) jours.</p>` },
    { heading: "ARTICLE 13 – DROIT APPLICABLE ET LITIGES", content: `<p>Le présent contrat est soumis au droit français.</p><p>Tout litige sera porté devant les juridictions compétentes après tentative de règlement amiable.</p>` },
    { heading: "ARTICLE 14 – ÉLECTION DE DOMICILE", content: `<p>Pour l'exécution des présentes :</p><ul><li>le Bailleur élit domicile à son adresse déclarée,</li><li>le Preneur élit domicile à son siège social.</li></ul>` },
  ], extraHtml: `
    <p style="margin-top:30px"><strong>Fait à ${o.ville}</strong></p>
    <p><strong>Le ${dateSignature}</strong></p>
    <p>En deux exemplaires originaux</p>
    <div class="signature-block-2">
      <div class="sig-box">
        <p class="sig-label">LE BAILLEUR</p>
        <p>Nom : [Nom du Bailleur]</p>
        <p>Signature :</p>
        <p style="font-style:italic;color:#999;margin-top:30px">[Signature du Bailleur]</p>
      </div>
      <div class="sig-box">
        <p class="sig-label">LE PRENEUR</p>
        <p>Pour ${o.nom}</p>
        <p>Nom et qualité : ${o.dirigeant}</p>
        <p>Signature :</p>
        ${o.tamponUrl ? `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:10px;opacity:0.85" />` : (o.signatureUrl ? `<img src="${o.signatureUrl}" alt="Signature" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:10px" />` : `<p style="font-style:italic;color:#999;margin-top:30px">Signé par ${o.dirigeant}</p>`)}
      </div>
    </div>
  ` });
}

function genFactureMateriel(o: OrganismeInfo, params: Record<string, any>) {
  const type = params?.type || 'pc';
  const factureNum = type === 'pc' ? 'FAC-2024-00187' : type === 'office' ? 'FAC-2024-00342' : 'FAC-2024-00519';
  const dateFacture = formatDate(subtractBusinessDays(new Date().toISOString(), type === 'pc' ? 120 : type === 'office' ? 90 : 60));
  
  const items: { desc: string; ref: string; qte: number; pu: number }[] = 
    type === 'pc' ? [
      { desc: "Ordinateur portable HP ProBook 450 G10 – Intel Core i5-1335U, 16Go RAM, SSD 512Go, Windows 11 Pro", ref: "HP-PB450G10-I5", qte: 2, pu: 899.00 },
      { desc: "Écran Dell 27\" Full HD IPS – P2723D (2560x1440, USB-C)", ref: "DELL-P2723D-27", qte: 2, pu: 329.00 },
      { desc: "Clavier + souris sans fil Logitech MK470 Slim Combo", ref: "LOG-MK470-FR", qte: 2, pu: 49.90 },
      { desc: "Sacoche de transport 15.6\" – Port Designs Milano II", ref: "PD-MILANO2-156", qte: 2, pu: 34.90 },
      { desc: "Hub USB-C multiport – Belkin Connect 7-en-1", ref: "BEL-AVC009-7P", qte: 2, pu: 59.99 },
      { desc: "Câble HDMI 2.1 – 2 mètres, certifié 4K/60Hz", ref: "CBL-HDMI21-2M", qte: 4, pu: 12.90 },
    ] : type === 'office' ? [
      { desc: "Microsoft 365 Business Standard – Licence annuelle (Word, Excel, PowerPoint, Outlook, Teams, OneDrive 1To)", ref: "MS365-BIZ-STD", qte: 3, pu: 150.00 },
      { desc: "Adobe Acrobat Pro 2024 – Abonnement annuel (création/édition PDF, signatures)", ref: "ADOBE-ACRO-PRO", qte: 1, pu: 215.88 },
      { desc: "Kaspersky Endpoint Security Cloud Plus – 5 postes, 1 an", ref: "KES-CLOUD-5P", qte: 1, pu: 159.00 },
      { desc: "Zoom Workplace Business – Licence annuelle (visioconférence, tableau blanc)", ref: "ZOOM-WP-BIZ", qte: 1, pu: 159.90 },
    ] : [
      { desc: "Abonnement ChatGPT Team (OpenAI) – 3 utilisateurs, licence annuelle", ref: "OPENAI-TEAM-3U", qte: 1, pu: 360.00 },
      { desc: "Abonnement Canva Pro – Création de supports pédagogiques, licence annuelle", ref: "CANVA-PRO-1AN", qte: 1, pu: 109.99 },
      { desc: "Plateforme e-learning Digiforma – Licence annuelle organisme de formation", ref: "DIGI-OF-PRO", qte: 1, pu: 588.00 },
      { desc: "Abonnement Genially – Création de contenus interactifs, licence annuelle", ref: "GENIALLY-PRO", qte: 1, pu: 89.88 },
    ];

  const totalHT = items.reduce((sum, it) => sum + it.qte * it.pu, 0);
  const tva = totalHT * 0.20;
  const totalTTC = totalHT + tva;

  const fournisseur = type === 'pc' 
    ? { nom: "LDLC Pro – Groupe LDLC", adresse: "2 rue des Érables, Parc des Lumières, 69800 Saint-Priest", siret: "403 862 194 00045", tva: "FR 81 403 862 194", tel: "04 27 46 60 00", email: "pro@ldlc.com" }
    : type === 'office' 
    ? { nom: "Insight Technology Solutions France", adresse: "7 rue de Tilsitt, 75017 Paris", siret: "444 783 837 00041", tva: "FR 16 444 783 837", tel: "01 53 53 42 00", email: "france@insight.com" }
    : { nom: "Cloud Business Solutions SAS", adresse: "45 avenue des Champs-Élysées, 75008 Paris", siret: "891 234 567 00012", tva: "FR 42 891 234 567", tel: "01 42 56 78 90", email: "contact@cbs-solutions.fr" };

  let lignesHtml = items.map(it => 
    `<tr><td style="padding:8px;border:1px solid #ddd;font-size:11px">${it.desc}<br><span style="color:#888;font-size:10px">Réf : ${it.ref}</span></td><td style="padding:8px;border:1px solid #ddd;text-align:center">${it.qte}</td><td style="padding:8px;border:1px solid #ddd;text-align:right">${it.pu.toFixed(2)} €</td><td style="padding:8px;border:1px solid #ddd;text-align:right">${(it.qte * it.pu).toFixed(2)} €</td></tr>`
  ).join('');

  const titre = type === 'pc' ? 'FACTURE MATÉRIEL INFORMATIQUE' : type === 'office' ? 'FACTURE PACK OFFICE / LOGICIELS' : 'FACTURE OUTIL IA / PLATEFORME';

  return buildDocument({ org: o, title: titre, sections: [
    { heading: "Fournisseur", content: `<p><strong>${fournisseur.nom}</strong><br>${fournisseur.adresse}<br>SIRET : ${fournisseur.siret}<br>N° TVA : ${fournisseur.tva}<br>Tél : ${fournisseur.tel}<br>Email : ${fournisseur.email}</p>` },
    { heading: "Client (destinataire)", content: `<p><strong>${o.nom}</strong><br>${o.adresse}, ${o.codePostal} ${o.ville}<br>SIRET : ${o.siret}<br>${o.nda ? `NDA : ${o.nda}<br>` : ''}Email : ${o.email}<br>Tél : ${o.telephone}<br>Représenté par : ${o.dirigeant}</p>` },
    { heading: "Détails de la facture", content: `<p><strong>N° Facture :</strong> ${factureNum}<br><strong>Date d'émission :</strong> ${dateFacture}<br><strong>Conditions de paiement :</strong> 30 jours net<br><strong>Mode de règlement :</strong> Virement bancaire</p>` },
    { heading: "Désignation des produits / services", content: `
      <table style="width:100%;border-collapse:collapse">
        <tr style="background:#f0f0f0"><th style="padding:8px;border:1px solid #ddd;text-align:left">Désignation</th><th style="padding:8px;border:1px solid #ddd;text-align:center;width:50px">Qté</th><th style="padding:8px;border:1px solid #ddd;text-align:right;width:90px">P.U. HT</th><th style="padding:8px;border:1px solid #ddd;text-align:right;width:90px">Total HT</th></tr>
        ${lignesHtml}
      </table>
      <table style="width:45%;margin-left:auto;margin-top:20px;border-collapse:collapse">
        <tr><td style="padding:8px;font-weight:bold">Total HT</td><td style="padding:8px;text-align:right">${totalHT.toFixed(2)} €</td></tr>
        <tr><td style="padding:8px;font-weight:bold">TVA (20%)</td><td style="padding:8px;text-align:right">${tva.toFixed(2)} €</td></tr>
        <tr style="background:#e8f4fd"><td style="padding:10px;font-weight:bold;font-size:14px">Total TTC</td><td style="padding:10px;text-align:right;font-weight:bold;font-size:14px">${totalTTC.toFixed(2)} €</td></tr>
      </table>` },
    { heading: "Conditions de règlement", content: `<p>Règlement par virement bancaire à 30 jours date de facture.<br><br><strong>Coordonnées bancaires du fournisseur :</strong><br>IBAN : FR76 XXXX XXXX XXXX XXXX XXXX XXX<br>BIC : XXXXXXXX<br><br>En cas de retard de paiement, conformément à l'article L.441-10 du Code de Commerce, une pénalité de retard de 3 fois le taux d'intérêt légal sera appliquée ainsi qu'une indemnité forfaitaire de 40 € pour frais de recouvrement (art. D.441-5 du Code de Commerce).</p>` },
    { heading: "Mentions légales", content: `<p style="font-size:10px;color:#666">TVA non applicable selon l'article 261-4-4°a du CGI pour les organismes de formation.<br>Pas d'escompte pour paiement anticipé.<br>Les marchandises restent la propriété du vendeur jusqu'au paiement intégral du prix.</p>` },
  ] });
}

function genAutoEvaluationFormateur(o: OrganismeInfo, fmt: FormateurInfo) {
  return buildDocument({ org: o, title: "AUTO-ÉVALUATION FORMATEUR", subtitle: `${fmt.prenom} ${fmt.nom}`, sections: [
    { heading: "Formateur", content: `<p><strong>Nom :</strong> ${fmt.nom} ${fmt.prenom}<br><strong>Spécialité :</strong> ${fmt.specialite}<br><strong>Expérience :</strong> ${fmt.experience}</p>` },
  ], table: {
    headers: ["Compétence", "1", "2", "3", "4"],
    rows: [
      ["Maîtrise du contenu", "☐", "☐", "☐", "☑"],
      ["Animation de groupe", "☐", "☐", "☑", "☐"],
      ["Adaptation aux publics", "☐", "☐", "☐", "☑"],
      ["Outils numériques", "☐", "☐", "☑", "☐"],
      ["Évaluation des acquis", "☐", "☐", "☐", "☑"],
      ["Veille professionnelle", "☐", "☐", "☑", "☐"],
    ]
  }, extraHtml: `<div class="section"><p><strong>Points forts :</strong> ________________________________</p><p><strong>Axes d'amélioration :</strong> ________________________________</p><p><strong>Besoins en formation :</strong> ________________________________</p></div>`,
  signatures: { type: "2", labels: ["Le Formateur", "Le Resp. Pédagogique"], names: [`${fmt.prenom} ${fmt.nom}`, o.responsablePedagogique] } });
}

function genListePartenaires(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "LES PARTENAIRES", sections: [
    { heading: "Partenaires institutionnels", content: "<p>• France Compétences<br>• DRIEETS<br>• France Travail<br>• OPCO</p>" },
    { heading: "Partenaires handicap", content: `<p>• Agefiph<br>• Cap Emploi<br>• MDPH<br>• RHF<br>Référent : ${o.referentHandicap}</p>` },
    { heading: "Partenaires pédagogiques", content: "<p>• Éditeurs logiciels<br>• Centres de certification<br>• Réseaux de formateurs</p>", variant: "green" },
  ] });
}

function genMandatQualiopi(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "MANDAT DE PRÉSENTATION ET DE GESTION QUALIOPI", sections: [
    { heading: "Entre les soussignés", content: `<p>La société <strong>M BUSINESS</strong>,<br>Société par Actions Simplifiée (SAS),<br>Dont le siège social est situé au 1 rue du Débarcadère, 92700 Colombes,<br>Immatriculée au Registre du Commerce et des Sociétés sous le numéro 953 458 064,<br>Représentée par Madame Nadine Dendani, en sa qualité de Dirigeante,<br>Ci-après dénommée « le Mandataire »,</p><p><strong>ET</strong></p><p><strong>${o.nom}</strong>,<br>Organisme de formation professionnelle,<br>Dont le siège social est situé au ${o.adresse}, ${o.codePostal} ${o.ville},<br>SIRET : ${o.siret},<br>Numéro de déclaration d'activité : ${o.nda},<br>Ci-après dénommée « le Mandant »,</p><p>Il a été convenu et arrêté ce qui suit :</p>` },
    { heading: "Article 1 – Objet du mandat", content: `<p>Le Mandant confie au Mandataire, qui accepte, une mission d'accompagnement, de gestion et de suivi de la Certification Qualiopi du Mandant, conformément aux exigences du Référentiel National Qualité (RNQ).</p><p>Le mandat inclut notamment :</p><ul><li>La mise en place, l'adaptation ou l'optimisation du système Qualiopi du Mandant.</li><li>La rédaction ou la mise à jour des procédures, documents, preuves et indicateurs RNQ.</li><li>La préparation des audits (initial, surveillance, renouvellement).</li><li>L'accompagnement lors des audits.</li><li>Le suivi des non-conformités éventuelles.</li><li>La veille réglementaire liée à Qualiopi.</li><li>L'appui à la structuration administrative, pédagogique et qualité du Mandant.</li></ul>` },
    { heading: "Article 2 – Pouvoirs accordés au Mandataire", content: `<p>Dans le cadre de ce mandat, le Mandataire est autorisé à :</p><ul><li>Accéder aux documents internes relatifs à la formation, à la qualité, aux procédures et aux indicateurs.</li><li>Proposer des modifications organisationnelles et documentaires.</li><li>Communiquer avec les organismes certificateurs ou institutions si nécessaire (avec accord préalable du Mandant).</li><li>Représenter le Mandant lors des audits Qualiopi, en présence ou accord du Mandant.</li></ul><p>Le Mandataire n'a pas autorité financière ou juridique sur le Mandant, sauf accord écrit spécifique.</p>` },
    { heading: "Article 3 – Obligations du Mandataire", content: `<p>Le Mandataire s'engage à :</p><ul><li>Respecter la confidentialité des informations du Mandant.</li><li>Mettre en œuvre tous les moyens nécessaires pour garantir la conformité Qualiopi.</li><li>Agir avec diligence, loyauté et professionnalisme.</li><li>Informer régulièrement le Mandant de l'avancement des actions.</li></ul>` },
    { heading: "Article 4 – Obligations du Mandant", content: `<p>Le Mandant s'engage à :</p><ul><li>Fournir au Mandataire l'ensemble des informations et documents nécessaires à la mission.</li><li>Faciliter l'accès aux équipes, process, supports et preuves.</li><li>Appliquer les recommandations du Mandataire dans la mesure du possible.</li><li>Prévenir le Mandataire de toute évolution pouvant impacter la certification.</li></ul>` },
    { heading: "Article 5 – Durée du mandat", content: `<p>Le présent mandat prend effet à compter du 05/06/2024.</p><p>Il est conclu pour une durée indéterminée, ou jusqu'à la réalisation complète de la mission Qualiopi, sauf résiliation selon l'article 8.</p>` },
    { heading: "Article 6 – Rémunération", content: `<p>La rémunération du Mandataire fera l'objet d'un acte séparé, précisant :</p><ul><li>Les honoraires</li><li>Les modalités de paiement</li><li>Les éventuels frais supplémentaires (déplacements, audits, etc.)</li></ul>` },
    { heading: "Article 7 – Confidentialité", content: `<p>Le Mandataire s'engage à conserver strictement confidentielles toutes les informations, documents, données et échanges relatifs au Mandant et à ses stagiaires, clients, partenaires ou formateurs.</p><p>Cette obligation survivra à la fin du mandat.</p>` },
    { heading: "Article 8 – Résiliation", content: `<p>Chaque partie pourra résilier le présent mandat à tout moment, par lettre recommandée avec accusé de réception, sous réserve d'un préavis de 30 jours.</p><p>En cas de manquement grave d'une des parties à ses obligations, la résiliation pourra être immédiate, sans préavis.</p>` },
    { heading: "Article 9 – Litiges", content: `<p>En cas de litige non résolu à l'amiable, compétence expresse est attribuée au tribunal du ressort du siège social du Mandant (${o.nom}).</p>` },
    { heading: "Article 10 – Dispositions finales", content: `<p>Le présent mandat annule et remplace tout accord antérieur ayant le même objet.</p><p>Il est établi en deux exemplaires originaux, signés par les deux parties, chacune reconnaissant en avoir reçu un.</p>` },
  ], signatures: { type: "2", labels: ["Pour le Mandant – " + o.nom, "Pour le Mandataire – M BUSINESS"], names: [o.dirigeant, "Mme Nadine DENDANI"] } });
}

function genReferentielHandicap(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "RÉFÉRENTIEL HANDICAP", sections: [
    { heading: "Référent handicap", content: `<p><strong>Nom :</strong> ${o.referentHandicap}<br><strong>Contact :</strong> ${o.email} – ${o.telephone}</p>` },
    { heading: "Types de handicap et adaptations", content: "<p>• Handicap moteur : PMR, mobilier adapté<br>• Handicap visuel : gros caractères, contrastes<br>• Handicap auditif : LSF, supports visuels<br>• Troubles dys : temps supplémentaire<br>• Handicap psychique : accompagnement individualisé</p>" },
    { heading: "Réseau partenaires", content: "<p>• Agefiph<br>• Cap Emploi<br>• MDPH<br>• RHF<br>• FIPHFP</p>", variant: "green" },
  ] });
}

function genProcedureAdaptation(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE D'ADAPTATION DE LA PRESTATION", sections: [
    { heading: "Objet", content: `<p>Modalités d'adaptation des formations de ${o.nom} en fonction des besoins identifiés.</p>` },
    { heading: "Étapes", content: "<p>1. Analyse résultats positionnement<br>2. Constitution groupes de niveaux<br>3. Ajustement déroulé pédagogique<br>4. Suivi en cours de formation<br>5. Bilan et traçabilité</p>" },
    { heading: "Documents associés", content: "<p>• Test de positionnement<br>• Groupes de niveaux<br>• Tableau suivi parcours<br>• Déroulé pédagogique</p>", variant: "green" },
  ], signatures: { type: "2", labels: ["Le Resp. Pédagogique", "Le Dirigeant"], names: [o.responsablePedagogique, o.dirigeant] } });
}

function genTableauSuiviParcours(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const rows = stagiaires.slice(0, 10).map((s, i) => {
    const niveau = i % 3 === 0 ? "Débutant" : i % 3 === 1 ? "Intermédiaire" : "Avancé";
    return [s.prenom + " " + s.nom, s.entreprise, niveau, i % 3 === 0 ? "Exercices simplifiés" : "Parcours standard", "Aucune", "En cours"];
  });
  return buildDocument({ org: o, title: "TABLEAU DE SUIVI DU PARCOURS BÉNÉFICIAIRES ET ADAPTATIONS", subtitle: f.intitule, formation: f, showFormationInfo: true, table: {
    headers: ["Stagiaire", "Entreprise", "Niveau", "Adaptation", "Difficultés", "Statut"], rows
  }, signatures: { type: "2", labels: ["Le Formateur", "Le Resp. Pédagogique"], names: [f.formateur, o.responsablePedagogique] } });
}

function genTableauAmeliorationContinue(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "TABLEAU D'AMÉLIORATION CONTINUE", table: {
    headers: ["N°", "Source", "Constat", "Action corrective", "Responsable", "Délai", "Statut"],
    rows: [
      ["1", "Satisfaction", "Plus de pratique demandée", "Exercices pratiques à 50%", o.responsablePedagogique, "T2 2025", "✅"],
      ["2", "Réclamation", "Délai réponse long", "Accusé réception sous 24h", o.referentQualite, "T1 2025", "✅"],
      ["3", "Audit", "Supports à mettre à jour", "Refonte supports", o.responsablePedagogique, "T2 2025", "🔄"],
      ["4", "Veille", "RNQ V9", "Mise à jour charte qualité", o.referentQualite, "T1 2025", "✅"],
      ["5", "Entreprises", "Manque suivi post-formation", "Questionnaire J+90", o.referentQualite, "T3 2025", "📋"],
    ]
  }, signatures: { type: "2", labels: ["Le Référent Qualité", "Le Dirigeant"], names: [o.referentQualite, o.dirigeant] } });
}

function genTableauAmeliorationContinueExcel(o: OrganismeInfo, f: FormationInfo, formations: FormationInfo[], stagiaires: StagiaireInfo[]) {
  // Use formation end date as base, then generate dates after it
  const rawDate = f.dateFin || f.dateDebut || "";
  const parsedDate = rawDate ? new Date(rawDate + "T00:00:00") : null;
  const baseDate = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate : new Date();
  const year = baseDate.getFullYear();
  
  // Helper to format date as DD/MM/YYYY
  const fmtDate = (d: Date) => `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  
  // Generate dates after the formation end date
  const addDays = (d: Date, n: number) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
  const dateOuverture = fmtDate(addDays(baseDate, 7)); // 1 week after formation
  
  let xlsHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Amélioration Continue</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>
<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse">
<tr style="background:#1e3a7b;color:#fff;font-weight:bold;text-align:center">
  <th>Date d'ouverture</th>
  <th>Origine Amélioration</th>
  <th>Description du contexte ou de l'anomalie</th>
  <th>ACTION</th>
  <th>Qui réalise l'action</th>
  <th>Délais de mise en place</th>
  <th>Date de clôture</th>
  <th>Commentaires / avancement</th>
</tr>`;

  // Generate realistic improvement actions with dates after formation
  const actions = [
    { date: dateOuverture, origine: "Analyse indicateurs", desc: "Taux de satisfaction stagiaires inférieur à l'objectif sur le T1", action: "Mise à jour des supports pédagogiques et adaptation du rythme de formation", qui: o.responsablePedagogique, delai: fmtDate(addDays(baseDate, 60)), cloture: fmtDate(addDays(baseDate, 55)), commentaire: "Supports refondus, satisfaction remontée à 95%" },
    { date: dateOuverture, origine: "Réclamation stagiaire", desc: "Problème de connexion Internet pendant la formation", action: "Souscription d'une box Internet supplémentaire pour sécuriser la connexion", qui: o.dirigeant, delai: "Immédiat", cloture: fmtDate(addDays(baseDate, 10)), commentaire: "Box installée, plus aucune coupure signalée" },
    { date: fmtDate(addDays(baseDate, 14)), origine: "Satisfaction parties prenantes", desc: "Demande de formats de formation plus courts", action: "Création de modules intensifs sur 1 journée", qui: o.responsablePedagogique, delai: fmtDate(addDays(baseDate, 90)), cloture: fmtDate(addDays(baseDate, 75)), commentaire: "3 formations intensives créées et planifiées" },
    { date: fmtDate(addDays(baseDate, 21)), origine: "Veille réglementaire", desc: "Évolution du guide de lecture Qualiopi V9", action: "Mise à jour de l'ensemble des procédures qualité", qui: o.referentQualite, delai: fmtDate(addDays(baseDate, 120)), cloture: fmtDate(addDays(baseDate, 110)), commentaire: "Procédures mises à jour, revue documentaire terminée" },
    { date: fmtDate(addDays(baseDate, 30)), origine: "Entretien formateur", desc: "Besoin de formation continue sur les outils numériques", action: "Inscription aux formations IA et outils collaboratifs", qui: o.dirigeant, delai: fmtDate(addDays(baseDate, 150)), cloture: "", commentaire: "Formation programmée" },
    { date: fmtDate(addDays(baseDate, 45)), origine: "Enquête satisfaction", desc: "Souhait de plus de cas pratiques professionnels", action: "Développement d'exercices basés sur des situations réelles métier", qui: o.responsablePedagogique, delai: fmtDate(addDays(baseDate, 150)), cloture: "", commentaire: "En cours de développement" },
    { date: fmtDate(addDays(baseDate, 60)), origine: "Dysfonctionnement", desc: "Retard dans l'envoi des attestations de fin de formation", action: "Automatisation de la génération et l'envoi des attestations", qui: o.referentQualite, delai: fmtDate(addDays(baseDate, 150)), cloture: "", commentaire: "Outil en phase de test" },
  ];

  actions.forEach(a => {
    xlsHtml += `<tr>
  <td>${a.date}</td>
  <td>${a.origine}</td>
  <td>${a.desc}</td>
  <td>${a.action}</td>
  <td>${a.qui}</td>
  <td>${a.delai}</td>
  <td>${a.cloture}</td>
  <td>${a.commentaire}</td>
</tr>`;
  });

  // Add empty rows for future entries
  for (let i = 0; i < 5; i++) {
    xlsHtml += `<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`;
  }

  xlsHtml += `</table>
<br/><p><strong>${o.nom}</strong> – Tableau d'amélioration continue – Post-formation ${f.intitule} – Année ${year}</p>
</body></html>`;
  return xlsHtml;
}

function genSuiviDysfonctionnementsExcel(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const rawDate = f.dateFin || f.dateDebut || "";
  const parsedDate = rawDate ? new Date(rawDate + "T00:00:00") : null;
  const baseDate = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate : new Date();
  const fmtDate = (d: Date) => `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  const addDays = (d: Date, n: number) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };

  let xlsHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Dysfonctionnements</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>
<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse">
<tr><td colspan="8" style="font-size:14pt;font-weight:bold;color:#1e3a7b;border:none">${o.nom}</td><td colspan="2" style="font-size:14pt;font-weight:bold;color:#1e3a7b;border:none">Suivi des dysfonctionnements internes et externes</td></tr>
<tr><td colspan="10" style="font-size:10pt;color:#666;border:none">Ce tableau synthétise le traitement des aléas, difficultés et réclamations survenues</td></tr>
<tr style="background:#1e3a7b;color:#fff;font-weight:bold">
  <th>Date d'ouverture</th>
  <th>Partie prenante (client, stagiaire, intervenant…)</th>
  <th>Interne / externe</th>
  <th>Canal d'information</th>
  <th>Description</th>
  <th>Causes identifiées</th>
  <th>Actions dans le PA d'amélioration?</th>
  <th>Date de clôture</th>
</tr>`;

  const isDistanciel = (f.modalites || "").toLowerCase().includes("distance") || (f.modalites || "").toLowerCase().includes("distanciel") || (f.modalites || "").toLowerCase().includes("ligne");
  const dysfonctionnement = isDistanciel
    ? { date: fmtDate(addDays(baseDate, -5)), partie: "Stagiaire", type: "Externe", canal: "Email", desc: "Problème de connexion internet, certains moments la connexion internet avait un dysfonctionnement", causes: "Box internet saturée lors de sessions en groupe", action: "Oui – souscription box supplémentaire", cloture: fmtDate(addDays(baseDate, 3)) }
    : { date: fmtDate(addDays(baseDate, -5)), partie: "Stagiaire", type: "Externe", canal: "Oral en formation", desc: "Salle de formation bruyante, des travaux à proximité perturbaient le bon déroulement de la session", causes: "Travaux imprévus dans le bâtiment voisin", action: "Oui – changement de salle et signalement au gestionnaire du site", cloture: fmtDate(addDays(baseDate, 3)) };
  const dysfonctionnements = [dysfonctionnement];

  dysfonctionnements.forEach(d => {
    xlsHtml += `<tr>
  <td>${d.date}</td>
  <td>${d.partie}</td>
  <td>${d.type}</td>
  <td>${d.canal}</td>
  <td>${d.desc}</td>
  <td>${d.causes}</td>
  <td>${d.action}</td>
  <td>${d.cloture}</td>
</tr>`;
  });

  for (let i = 0; i < 10; i++) {
    xlsHtml += `<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`;
  }

  xlsHtml += `</table>
<br/><p><strong>${o.nom}</strong> – Suivi des dysfonctionnements – ${f.intitule}</p>
</body></html>`;
  return xlsHtml;
}

function genRelancesAppreciationsExcel(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let xlsHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Relances</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>
<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse">
<tr><td colspan="10" style="font-size:14pt;font-weight:bold;color:#1e3a7b;border:none">TABLEAU DE RELANCES DES APPRÉCIATIONS</td></tr>
<tr><td colspan="10" style="font-size:11pt;border:none">${f.intitule}</td></tr>
<tr style="background:#1e3a7b;color:#fff;font-weight:bold">
  <th rowspan="2">Date de l'action de formation</th>
  <th rowspan="2">Action de formation</th>
  <th colspan="4">Contact</th>
  <th rowspan="2">Date d'envoi</th>
  <th rowspan="2">Date de réception</th>
  <th rowspan="2">Date de relance à 7 jours</th>
  <th rowspan="2">COMMENTAIRES</th>
</tr>
<tr style="background:#1e3a7b;color:#fff;font-weight:bold">
  <th>Raison sociale</th><th>Identité</th><th>Email</th><th>Tel</th>
</tr>`;

  // Empty rows for manual filling
  for (let i = 0; i < 15; i++) {
    xlsHtml += `<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`;
  }

  xlsHtml += `</table></body></html>`;
  return xlsHtml;
}

function genProcedureAmeliorationContinue(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE AMÉLIORATION CONTINUE", sections: [
    { heading: "1. Objet de la procédure", content: `<p>Cette procédure a pour objet de définir et détecter les dysfonctionnements liés aux prestations de formation ou au système qualité de l'organisme.</p><p>Suite à la détection des dysfonctionnements, une analyse des causes doit permettre de définir les actions correctives et/ou préventives à mettre en œuvre. Les actions correctives et préventives sont ensuite suivies dans leur mise en œuvre et leur efficacité par le relais qualité. Les actions d'amélioration peuvent également être issues de suggestions du personnel.</p>` },
    { heading: "2. Exigences couvertes par la procédure", content: `<p>Référentiel National Qualité :</p><ul><li>Critère 7 : indicateurs 31, 32</li><li>Critère 6 : indicateurs 23, 24, 25</li></ul>` },
    { heading: "3. Principaux documents associés", content: `<ul><li>Fichier Excel « Tableau d'amélioration continue »</li><li>Fichier Excel « Réclamations et dysfonctionnements »</li><li>Enquête de satisfaction à chaud</li><li>Enquête de satisfaction à froid</li><li>Veille (innovation/métier/réglementaire)</li><li>Questionnaire parties prenantes</li></ul>` },
    { heading: "4. Définitions relatives à l'activité décrite", content: `<p><strong>Dysfonctionnement/Réclamation :</strong> non satisfaction d'une exigence ou d'un engagement de l'organisme. Ces engagements concernent les exigences externes (légales, demandes des clients, cahier des charges, exigence normative) ou internes (engagement des organismes, objectifs, disposition des procédures…).</p><p><strong>Action corrective :</strong> après analyse, action visant à éliminer, non plus le dysfonctionnement, mais la ou les causes du dysfonctionnement. Exemple : on définit une personne ressource pouvant remplacer le formateur absent pour l'avenir.</p><p><strong>Action préventive :</strong> action visant à éliminer la cause d'un dysfonctionnement potentiel, avant que celui-ci ne se soit produit. Exemple : l'action préventive aurait pu être la création de duos de formateurs pouvant pallier les absences de l'un ou de l'autre.</p>` },
    { heading: "5. Procédure", content: `<p>Cette procédure vise à positionner l'organisme de formation ${o.nom} dans une démarche d'amélioration continue pour l'ensemble de son fonctionnement.</p><p>Les sources d'amélioration comprennent :</p><ul><li>Les réclamations et aléas signalés par les stagiaires, entreprises ou financeurs</li><li>Les résultats des enquêtes de satisfaction (à chaud et à froid)</li><li>Les retours des formateurs (compte-rendu de formation)</li><li>Les résultats des veilles réglementaire, métier et technologique</li><li>Les audits internes et externes</li><li>Les entretiens avec le personnel</li></ul><p>Chaque action d'amélioration est tracée dans le tableau d'amélioration continue avec : la date d'ouverture, l'origine, la description, l'action décidée, le responsable, le délai, la date de clôture et les commentaires.</p>` },
  ] });
}

function genAppreciationsBeneficiaires(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const dureeH = parseInt(f.duree) || 14;
  let extra = `<p><em>Fréquence : fin de formation. En cas de non-retour, l'enquête est renvoyée dans un délai d'une semaine. Si pas de réponse, l'enquête est administrée par téléphone (relance maximum un mois).</em></p>`;
  stagiaires.slice(0, 10).forEach((s, i) => {
    extra += `<h3>Stagiaire : ${s.prenom} ${s.nom}</h3>`;
    extra += `<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td><strong>Intitulé de la formation :</strong></td><td>${f.intitule}</td></tr><tr><td><strong>Date :</strong></td><td>${formatDate(f.dateFin)}</td></tr><tr><td><strong>Nom/prénom des intervenants :</strong></td><td>${f.formateur}</td></tr><tr><td><strong>Nom/prénom du participant :</strong></td><td>${s.prenom} ${s.nom}</td></tr></table>`;
    const notes = [
      [4, 4, 3, 4, 4, 4, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 3, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4],
    ];
    const n = notes[i % 2];
    const criteres = [
      ["1. Avant l'entrée en formation", null],
      ["Échanges avec le conseiller formation, le formateur", n[0]],
      ["Descriptif de la formation", n[1]],
      ["Descriptif de l'organisation de la formation (horaires, plan d'accès, etc.)", n[2]],
      ["Aide à la constitution du dossier de financement", n[3]],
      ["2. Pendant la formation", null],
      ["Confort et équipement, services proposés", n[4]],
      ["Durée et rythme", n[5]],
      ["Qualité des supports pédagogiques", n[6]],
      ["3. Pédagogie", null],
      ["Qualité de l'animation pédagogique", n[7]],
      ["Maîtrise des contenus du formateur", n[8]],
      ["Écoute et réponses aux attentes personnelles", n[9]],
      ["4. Évolution de vos connaissances : le programme vous a-t-il permis :", null],
      ["D'actualiser vos connaissances ?", n[10]],
      ["D'acquérir des compétences nouvelles ?", n[11]],
      ["De repérer des points faibles à combler ?", n[12]],
      ["De mieux appréhender votre rôle dans l'entreprise ?", n[13]],
      ["La mise en pratique vous paraît-elle facile ?", n[14]],
      ["Le programme était-il suffisant pour répondre à vos besoins ?", n[15]],
    ];
    extra += `<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;width:100%"><tr style="background:#1e3a7b;color:#fff"><th></th><th>Non concerné</th><th>- -<br>1</th><th>-<br>2</th><th>+<br>3</th><th>++<br>4</th></tr>`;
    criteres.forEach(([label, note]) => {
      if (note === null) {
        extra += `<tr style="background:#e8edf5;font-weight:bold"><td colspan="6">${label}</td></tr>`;
      } else {
        extra += `<tr><td>${label}</td><td>${note === 0 ? 'X' : ''}</td><td>${note === 1 ? 'X' : ''}</td><td>${note === 2 ? 'X' : ''}</td><td>${note === 3 ? 'X' : ''}</td><td>${note === 4 ? 'X' : ''}</td></tr>`;
      }
    });
    extra += `</table>`;
    const globalNote = i % 2 === 0 ? "10/10" : "7/10";
    extra += `<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;width:100%"><tr style="background:#1e3a7b;color:#fff"><th></th><th>1/10</th><th>3/10</th><th>7/10</th><th>10/10</th></tr><tr><td>Niveau de satisfaction général</td><td></td><td></td><td>${globalNote === '7/10' ? 'X' : ''}</td><td>${globalNote === '10/10' ? 'X' : ''}</td></tr></table>`;
    const comments = ["La formation s'est globalement bien déroulée. Les explications étaient claires et progressives. Le formateur était disponible et prenait le temps de répondre aux questions.", "Formation enrichissante. Les exercices pratiques ont été utiles pour mettre en application les notions vues. Je me sens plus à l'aise pour utiliser les outils dans un cadre professionnel."];
    extra += `<p><strong>Commentaire :</strong> ${comments[i % comments.length]}</p><hr/>`;
  });
  return buildDocument({ org: o, title: "QUESTIONNAIRE DE SATISFACTION DU BÉNÉFICIAIRE", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra });
}

function genAppreciationsEntreprises(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const entreprisesRaw = stagiaires.slice(0, 10).map(s => s.entreprise).filter(Boolean);
  const hasEntreprises = entreprisesRaw.length > 0;
  const entreprises = hasEntreprises ? [...new Set(entreprisesRaw)] : [""];
  let extra = `<p><em>Fréquence : fin de formation. Relance mensuelle pendant un mois.</em></p>`;
  extra += `<p><strong>Date :</strong> ${formatDate(f.dateFin)}</p>`;
  entreprises.forEach((ent, i) => {
    extra += `<h3>Entreprise : ${ent || "………………………………………"}</h3>`;
    const questions = [
      "Notre offre de formation est-elle accessible et claire ?",
      "Les devis transmis pour les prestations de formations étaient-ils suffisamment détaillés ?",
      "Suite à une formation, avez-vous reçu les documents administratifs nécessaires ?",
      "La formation dispensée a-t-elle correspondu à vos attentes ?",
      "Nos délais de traitement sont-ils conformes à vos attentes ?",
      "La facturation de la formation dispensée correspond-elle au devis établi ?",
      "Concernant votre appréciation globale sur la formation, êtes-vous ?"
    ];
    if (hasEntreprises) {
      const responses = ["Très satisfaisant", "Satisfaisant", "Très satisfaisant", "Satisfaisant", "Très satisfaisant", "Très satisfaisant", "Satisfaisant"];
      questions.forEach((q, qi) => {
        const rep = responses[(qi + i) % responses.length];
        extra += `<p><strong>${q}</strong></p>`;
        extra += `<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse"><tr><td>${rep === "Très satisfaisant" ? "☒" : "☐"} Très satisfaisant</td><td>${rep === "Insuffisant" ? "☒" : "☐"} Insuffisant</td></tr><tr><td>${rep === "Satisfaisant" ? "☒" : "☐"} Satisfaisant</td><td>${rep === "Très insuffisant" ? "☒" : "☐"} Très insuffisant</td></tr></table>`;
      });
      extra += `<p><strong>Remarques ou suggestions :</strong> RAS – Très bonne prestation.</p><hr/>`;
    } else {
      questions.forEach((q) => {
        extra += `<p><strong>${q}</strong></p>`;
        extra += `<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse"><tr><td>☐ Très satisfaisant</td><td>☐ Insuffisant</td></tr><tr><td>☐ Satisfaisant</td><td>☐ Très insuffisant</td></tr></table>`;
      });
      extra += `<p><strong>Remarques ou suggestions :</strong> ………………………………………………………………</p>`;
    }
  });
  return buildDocument({ org: o, title: "QUESTIONNAIRE DE SATISFACTION CLIENT COMMANDITAIRE", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra });
}

function genAppreciationsFinanceurs(o: OrganismeInfo, f: FormationInfo) {
  let extra = `<p><strong>Date :</strong> ${formatDate(f.dateFin)}</p><p><em>En cas de non-retour, l'enquête est renvoyée dans un délai d'une semaine. Si pas de réponse, l'enquête est administrée par téléphone pendant un mois.</em></p>`;
  const financeurs = ["OPCO Atlas", "OPCO EP", "France Travail"];
  financeurs.forEach((fin, i) => {
    extra += `<h3>Financeur : ${fin}</h3>`;
    extra += `<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td><strong>Nom du financeur :</strong></td><td>${fin}</td></tr><tr><td><strong>Références des dossiers financés :</strong></td><td>Dossier ${new Date().getFullYear()}-${String(i + 1).padStart(3, '0')}</td></tr></table>`;
    const criteres = [
      ["QUALITÉ DU SERVICE ADMINISTRATIF", null],
      ["Informations figurant sur nos conventions de formation", i % 2 === 0 ? "Très bien" : "Correct"],
      ["Qualité des informations figurant sur nos factures", "Très bien"],
      ["Respect des délais de traitement", i % 2 === 0 ? "Très bien" : "Correct"],
      ["Nos tarifs proposés", "Correct"],
      ["Qualité et exhaustivité des documents remis en fin de formation", "Très bien"],
      ["QUALITÉ DE NOS FORMATIONS", null],
      ["Qualité globale de nos formations", "Très bien"],
      ["Cohérence de nos formations par rapport aux attentes", i % 2 === 0 ? "Très bien" : "Correct"],
    ];
    extra += `<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;width:100%"><tr style="background:#1e3a7b;color:#fff"><th></th><th>Non concerné</th><th>Insuffisant</th><th>Correct</th><th>Très bien</th></tr>`;
    criteres.forEach(([label, note]) => {
      if (note === null) {
        extra += `<tr style="background:#e8edf5;font-weight:bold"><td colspan="5">${label}</td></tr>`;
      } else {
        extra += `<tr><td>${label}</td><td></td><td>${note === "Insuffisant" ? "☒" : ""}</td><td>${note === "Correct" ? "☒" : ""}</td><td>${note === "Très bien" ? "☒" : ""}</td></tr>`;
      }
    });
    extra += `</table>`;
    extra += `<p><strong>Commentaires :</strong> Prestations conformes aux attentes.</p><hr/>`;
  });
  return buildDocument({ org: o, title: "ENQUÊTE SATISFACTION FINANCEUR", extraHtml: extra });
}

function genBilanFroid(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const dureeH = parseInt(f.duree) || 14;
  let extra = `<p><strong>Date :</strong> ${formatDate(f.dateFin)}</p><p><em>Délai de réalisation du bilan à froid : 3 à 6 mois après la formation</em></p>`;
  stagiaires.slice(0, 8).forEach((s, i) => {
    extra += `<h3>Stagiaire : ${s.prenom} ${s.nom}</h3>`;
    const criteres = [
      ["Utilisez-vous encore les outils depuis la formation ?", i % 2 === 0 ? 0 : 1],
      ["Les compétences acquises sont-elles utiles au quotidien ?", 0],
      ["Avez-vous gagné en autonomie ?", i % 2 === 0 ? 1 : 0],
      ["Appliquez-vous les méthodes vues en formation ?", 1],
      ["La formation correspondait-elle à vos besoins professionnels ?", 0],
      ["Les acquis ont-ils amélioré votre efficacité professionnelle ?", 1],
      ["Les supports de formation sont-ils encore utilisés ?", 1],
      ["La durée de la formation était-elle adaptée ?", i % 2 === 0 ? 1 : 0],
      ["Recommanderiez-vous cette formation avec du recul ?", 0],
    ];
    extra += `<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;width:100%"><tr style="background:#1e3a7b;color:#fff"><th>Critères évalués</th><th>Tout à fait</th><th>Plutôt oui</th><th>Plutôt non</th><th>Non</th></tr>`;
    criteres.forEach(([label, note]) => {
      extra += `<tr><td>${label}</td><td>${note === 0 ? "☒" : "☐"}</td><td>${note === 1 ? "☒" : "☐"}</td><td>${note === 2 ? "☒" : "☐"}</td><td>${note === 3 ? "☒" : "☐"}</td></tr>`;
    });
    extra += `</table>`;
    const comments = [
      `Avec du recul, la formation ${f.intitule} m'a été réellement utile. J'utilise encore les outils régulièrement, notamment pour rédiger et mettre en forme des documents simples dans un cadre professionnel. Les bases vues pendant la formation me permettent aujourd'hui de travailler de manière plus autonome et plus rapide.`,
      `La formation correspondait bien à mon niveau au moment où je l'ai suivie. Les méthodes expliquées restent claires et faciles à réutiliser lorsque j'en ai besoin. Les supports fournis sont pratiques et me servent encore de rappel.`,
    ];
    extra += `<p><strong>Commentaire global :</strong> ${comments[i % comments.length]}</p><hr/>`;
  });
  return buildDocument({ org: o, title: "BILAN À FROID", subtitle: `${f.intitule} – 3 à 6 mois après`, sections: [
    { heading: "Informations", content: `<p><strong>Organisme de formation :</strong> ${o.nom}<br><strong>Formation :</strong> ${f.intitule}<br><strong>Durée :</strong> ${dureeH} heures – ${f.lieu?.toLowerCase().includes('distance') ? 'Distanciel' : 'Présentiel'}</p>` },
  ], extraHtml: extra });
}

function genBilanChaud(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const dureeH = parseInt(f.duree) || 14;
  let extra = `<p><strong>Date :</strong> ${formatDate(f.dateFin)}</p>`;
  stagiaires.slice(0, 10).forEach((s, i) => {
    extra += `<h3>Stagiaire : ${s.prenom} ${s.nom}</h3>`;
    extra += `<p><strong>Date :</strong> ${formatDate(f.dateFin)}</p>`;
    const criteres = [
      ["Satisfaction globale de la formation", i % 3 === 0 ? 1 : 0],
      ["Atteinte des objectifs pédagogiques", 0],
      ["Clarté des explications", 0],
      ["Progression pédagogique", i % 2 === 0 ? 1 : 0],
      ["Adéquation du contenu au niveau", 0],
      ["Méthodes pédagogiques", i % 2 === 0 ? 1 : 0],
      ["Alternance théorie / pratique", 0],
      ["Disponibilité du formateur", 0],
      ["Organisation de la formation", i % 3 === 0 ? 1 : 0],
      ["Conditions matérielles", 1],
      ["Utilité professionnelle de la formation", 0],
      ["Recommandation de la formation", i % 2 === 0 ? 1 : 0],
    ];
    extra += `<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;width:100%"><tr style="background:#1e3a7b;color:#fff"><th>Critères évalués</th><th>Très satisfaisant</th><th>Satisfaisant</th><th>Peu satisfaisant</th><th>Insuffisant</th></tr>`;
    criteres.forEach(([label, note]) => {
      extra += `<tr><td>${label}</td><td>${note === 0 ? "☒" : "☐"}</td><td>${note === 1 ? "☒" : "☐"}</td><td>${note === 2 ? "☒" : "☐"}</td><td>${note === 3 ? "☒" : "☐"}</td></tr>`;
    });
    extra += `</table>`;
    const comments = [
      `La formation ${f.intitule} s'est globalement bien déroulée. Les explications étaient claires et progressives, ce qui m'a permis de comprendre les bases sans difficulté. Le formateur était disponible et prenait le temps de répondre aux questions.`,
      `Les exercices pratiques ont été utiles pour mettre en application les notions vues. L'organisation et les conditions matérielles étaient satisfaisantes. À l'issue de la formation, je me sens plus à l'aise pour travailler dans un cadre professionnel.`,
    ];
    extra += `<p><strong>Commentaire global :</strong> ${comments[i % comments.length]}</p><hr/>`;
  });
  return buildDocument({ org: o, title: "BILAN À CHAUD", subtitle: f.intitule, sections: [
    { heading: "Informations", content: `<p><strong>Organisme de formation :</strong> ${o.nom}<br><strong>Formation :</strong> ${f.intitule}<br><strong>Durée :</strong> ${dureeH} heures – ${f.lieu?.toLowerCase().includes('distance') ? 'Distanciel' : 'Présentiel'}</p>` },
  ], extraHtml: extra });
}

function genCompteRenduFormateur(o: OrganismeInfo, f: FormationInfo) {
  const dureeH = parseInt(f.duree) || 14;
  const nbJours = Math.ceil(dureeH / 7);
  return buildDocument({ org: o, title: "COMPTE–RENDU DE FORMATION", subtitle: f.intitule, sections: [
    { heading: "Informations générales", content: `<p><em>Fréquence : chaque fin de formation, relance une semaine durant un mois</em></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%">
<tr><td><strong>Intitulé de la formation</strong></td><td>${f.intitule}</td></tr>
<tr><td><strong>Nom du formateur</strong></td><td>${f.formateur}</td></tr>
<tr><td><strong>Dates de formation</strong></td><td>Du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}</td></tr>
<tr><td><strong>Durée de la formation</strong></td><td>${dureeH} heures (${nbJours} jours)</td></tr>
<tr><td><strong>Nombre de participants prévus</strong></td><td>À compléter</td></tr>
<tr><td><strong>Nombre de participants présents</strong></td><td>À compléter</td></tr>
<tr><td><strong>Profils des participants</strong></td><td>À compléter</td></tr>
<tr><td><strong>Nombre d'évaluations recueillies</strong></td><td>À compléter</td></tr>
</table>` },
    { heading: "1. Objectifs de la formation", content: "<p>________________________________________________________________________________________________</p>" },
    { heading: "2. Méthodologie et déroulement de la formation", content: "<p>________________________________________________________________________________________________</p>" },
    { heading: "3. Comportement des participants", content: `<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%">
<tr style="background:#1e3a7b;color:#fff"><th></th><th>Pas du tout<br>- -</th><th>Peu<br>-</th><th>Normal</th><th>Assez<br>+</th><th>Très<br>+ +</th></tr>
<tr><td>Motivation</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Assiduité</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Participation</td><td></td><td></td><td></td><td></td><td></td></tr>
</table>` },
    { heading: "4. Le groupe était-il de niveau homogène ?", content: "<p>________________________________________________________________________________________________</p>" },
    { heading: "5. Le formateur a-t-il répondu à toutes les questions posées par les participants ?", content: "<p>________________________________________________________________________________________________</p>" },
    { heading: "6. Quelles seraient, de manière générale, les améliorations à apporter ?", content: "<p>________________________________________________________________________________________________</p>" },
    { heading: "7. Autres observations", content: "<p>________________________________________________________________________________________________</p>" },
  ] });
}

function genTableauRelanceAppreciations(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "TABLEAU DE RELANCE DES APPRÉCIATIONS", table: {
    headers: ["Formation", "Type", "Destinataire", "Date envoi", "Relance 1", "Reçu", "Statut"],
    rows: [
      ["Formation Word", "Bénéficiaire", "Stagiaires", formatDate(new Date().toISOString()), "J+7", "☑", "✅ Complet"],
      ["Formation Word", "Entreprise", "RH", formatDate(new Date().toISOString()), "J+7", "☑", "✅ Complet"],
      ["Formation Word", "Financeur", "OPCO", formatDate(new Date().toISOString()), "J+10", "☐", "🔄 En attente"],
      ["Formation Word", "Formateur", "Formateur", formatDate(new Date().toISOString()), "-", "☑", "✅ Complet"],
    ]
  }, sections: [
    { heading: "Procédure", content: "<p>J+0 : envoi | J+7 : relance email | J+14 : relance tel | J+21 : clôture</p>", variant: "green" },
  ] });
}

// ===== DOCUMENTS INDIVIDUELS PAR STAGIAIRE — CT7 =====

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

function genBilanChaudStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const dureeH = parseInt(f.duree) || 14;
  const rng = seededRandom(si * 31 + 7);

  const allCriteres = [
    "Satisfaction globale de la formation",
    "Atteinte des objectifs pédagogiques",
    "Clarté des explications",
    "Progression pédagogique",
    "Adéquation du contenu au niveau",
    "Méthodes pédagogiques",
    "Alternance théorie / pratique",
    "Disponibilité du formateur",
    "Organisation de la formation",
    "Conditions matérielles",
    "Utilité professionnelle de la formation",
    "Recommandation de la formation",
  ];

  const notes: number[] = allCriteres.map(() => {
    const r = rng();
    return r < 0.6 ? 0 : 1;
  });

  let extra = `<p><strong>Date :</strong> ${formatDate(f.dateFin)}</p>`;
  extra += `<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;width:100%">
    <tr><td><strong>Nom/prénom du participant :</strong></td><td>${s.prenom} ${s.nom}</td></tr>
    <tr><td><strong>Entreprise :</strong></td><td>${s.entreprise || "—"}</td></tr>
    <tr><td><strong>Formation :</strong></td><td>${f.intitule}</td></tr>
    <tr><td><strong>Formateur :</strong></td><td>${f.formateur}</td></tr>
  </table>`;

  extra += `<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;width:100%"><tr style="background:#1e3a7b;color:#fff"><th>Critères évalués</th><th>Très satisfaisant</th><th>Satisfaisant</th><th>Peu satisfaisant</th><th>Insuffisant</th></tr>`;
  allCriteres.forEach((label, idx) => {
    const n = notes[idx];
    extra += `<tr><td>${label}</td><td>${n === 0 ? "☒" : "☐"}</td><td>${n === 1 ? "☒" : "☐"}</td><td>${n === 2 ? "☒" : "☐"}</td><td>${n === 3 ? "☒" : "☐"}</td></tr>`;
  });
  extra += `</table>`;

  const commentsPool = [
    `La formation ${f.intitule} était très enrichissante. Le formateur a su rendre le contenu accessible et les exercices pratiques étaient bien conçus. Je repars avec des outils concrets que je pourrai utiliser dès demain.`,
    `Formation de qualité, les objectifs annoncés ont été atteints. Le rythme était adapté et les supports clairs. J'aurais aimé un peu plus de temps sur les cas pratiques mais globalement très satisfait(e).`,
    `Très bonne formation. Les explications étaient claires et progressives, ce qui m'a permis de comprendre les bases sans difficulté. Le formateur était disponible et prenait le temps de répondre aux questions.`,
    `Les exercices pratiques ont été utiles pour mettre en application les notions vues. L'organisation et les conditions matérielles étaient satisfaisantes. À l'issue de la formation, je me sens plus à l'aise.`,
    `J'ai apprécié la pédagogie du formateur et l'alternance entre théorie et pratique. Le contenu était dense mais bien structuré. Les supports fournis seront utiles pour la suite.`,
    `Formation intéressante et bien organisée. Le formateur maîtrise parfaitement son sujet et sait le transmettre. Les échanges avec les autres participants étaient aussi enrichissants.`,
    `Bonne formation dans l'ensemble. Le contenu correspondait à mes attentes. J'aurais souhaité approfondir certains points mais la durée ne le permettait pas. Le formateur était à l'écoute.`,
    `Formation très complète et bien structurée. Les cas pratiques étaient réalistes et m'ont permis de progresser rapidement. Je recommande cette formation à mes collègues.`,
    `Le formateur a su adapter son discours au niveau du groupe. Les exemples concrets ont facilité la compréhension. Je suis satisfait(e) de cette formation et je me sens prêt(e) à appliquer les acquis.`,
    `Très satisfait(e) de cette formation. Le programme était complet et le formateur dynamique. Les méthodes pédagogiques variées ont rendu l'apprentissage agréable.`,
  ];
  extra += `<p><strong>Commentaire :</strong> ${commentsPool[si % commentsPool.length]}</p>`;

  return buildDocument({ org: o, title: "BILAN À CHAUD", subtitle: `${f.intitule} – ${s.prenom} ${s.nom}`, sections: [
    { heading: "Informations", content: `<p><strong>Organisme :</strong> ${o.nom}<br><strong>Formation :</strong> ${f.intitule}<br><strong>Durée :</strong> ${dureeH} heures</p>` },
  ], extraHtml: extra });
}

function genBilanFroidStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const dureeH = parseInt(f.duree) || 14;
  const rng = seededRandom(si * 47 + 13);

  const allCriteres = [
    "Utilisez-vous encore les outils depuis la formation ?",
    "Les compétences acquises sont-elles utiles au quotidien ?",
    "Avez-vous gagné en autonomie ?",
    "Appliquez-vous les méthodes vues en formation ?",
    "La formation correspondait-elle à vos besoins professionnels ?",
    "Les acquis ont-ils amélioré votre efficacité professionnelle ?",
    "Les supports de formation sont-ils encore utilisés ?",
    "La durée de la formation était-elle adaptée ?",
    "Recommanderiez-vous cette formation avec du recul ?",
  ];

  const notes: number[] = allCriteres.map(() => {
    const r = rng();
    return r < 0.55 ? 0 : 1;
  });

  let extra = `<p><strong>Date :</strong> ${formatDate(f.dateFin)}</p><p><em>Bilan réalisé 3 à 6 mois après la formation</em></p>`;
  extra += `<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;width:100%">
    <tr><td><strong>Nom/prénom du participant :</strong></td><td>${s.prenom} ${s.nom}</td></tr>
    <tr><td><strong>Entreprise :</strong></td><td>${s.entreprise || "—"}</td></tr>
    <tr><td><strong>Formation suivie :</strong></td><td>${f.intitule}</td></tr>
  </table>`;

  extra += `<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;width:100%"><tr style="background:#1e3a7b;color:#fff"><th>Critères évalués</th><th>Tout à fait</th><th>Plutôt oui</th><th>Plutôt non</th><th>Non</th></tr>`;
  allCriteres.forEach((label, idx) => {
    const n = notes[idx];
    extra += `<tr><td>${label}</td><td>${n === 0 ? "☒" : "☐"}</td><td>${n === 1 ? "☒" : "☐"}</td><td>${n === 2 ? "☒" : "☐"}</td><td>${n === 3 ? "☒" : "☐"}</td></tr>`;
  });
  extra += `</table>`;

  const commentsPool = [
    `Avec du recul, la formation ${f.intitule} m'a été réellement utile. J'utilise encore les outils régulièrement dans mon travail quotidien. Les bases vues pendant la formation me permettent de travailler de manière plus autonome.`,
    `La formation correspondait bien à mon niveau. Les méthodes expliquées restent claires et faciles à réutiliser. Les supports fournis sont pratiques et me servent encore de rappel au quotidien.`,
    `Plusieurs mois après, je constate que les compétences acquises me sont indispensables. J'ai pu les transmettre en partie à mes collègues. La formation a vraiment répondu à un besoin concret.`,
    `J'applique régulièrement ce que j'ai appris. Certains aspects auraient mérité plus d'approfondissement, mais globalement la formation a eu un impact positif sur mon efficacité professionnelle.`,
    `Les acquis de la formation sont toujours d'actualité dans mon travail. Je consulte encore les supports de temps en temps. Cette formation m'a donné confiance dans l'utilisation des outils au quotidien.`,
    `La formation a eu un impact durable sur ma façon de travailler. Je me sens beaucoup plus à l'aise qu'avant et j'ai gagné en productivité. Je recommanderais cette formation sans hésiter.`,
    `Avec le recul, certains modules étaient plus utiles que d'autres, mais l'ensemble était cohérent. Les exercices pratiques m'ont particulièrement aidé à ancrer les apprentissages.`,
    `Je suis globalement satisfait(e) de cette formation. Les compétences acquises sont régulièrement mobilisées dans mon poste actuel et m'ont permis de prendre en charge de nouvelles responsabilités.`,
    `La formation a répondu à mes attentes. J'utilise les méthodes apprises presque quotidiennement et mes collègues ont remarqué ma progression. C'est un investissement que je ne regrette pas.`,
    `Bonne formation dont les bénéfices se ressentent encore aujourd'hui. J'ai pu mettre en pratique la majorité des enseignements et cela a contribué à améliorer la qualité de mon travail.`,
  ];
  extra += `<p><strong>Commentaire global :</strong> ${commentsPool[si % commentsPool.length]}</p>`;

  return buildDocument({ org: o, title: "BILAN À FROID", subtitle: `${f.intitule} – ${s.prenom} ${s.nom}`, sections: [
    { heading: "Informations", content: `<p><strong>Organisme :</strong> ${o.nom}<br><strong>Formation :</strong> ${f.intitule}<br><strong>Durée :</strong> ${dureeH} heures</p>` },
  ], extraHtml: extra });
}

function genAppreciationsBeneficiairesStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const rng = seededRandom(si * 59 + 23);

  let extra = `<p><em>Fréquence : fin de formation. En cas de non-retour, l'enquête est renvoyée dans un délai d'une semaine.</em></p>`;
  extra += `<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><td><strong>Intitulé de la formation :</strong></td><td>${f.intitule}</td></tr><tr><td><strong>Date :</strong></td><td>${formatDate(f.dateFin)}</td></tr><tr><td><strong>Nom/prénom des intervenants :</strong></td><td>${f.formateur}</td></tr><tr><td><strong>Nom/prénom du participant :</strong></td><td>${s.prenom} ${s.nom}</td></tr><tr><td><strong>Entreprise :</strong></td><td>${s.entreprise || "—"}</td></tr></table>`;

  const generateNote = () => {
    const r = rng();
    return r < 0.55 ? 4 : 3;
  };

  const criteres: [string, number | null][] = [
    ["1. Avant l'entrée en formation", null],
    ["Échanges avec le conseiller formation, le formateur", generateNote()],
    ["Descriptif de la formation", generateNote()],
    ["Descriptif de l'organisation de la formation (horaires, plan d'accès, etc.)", generateNote()],
    ["Aide à la constitution du dossier de financement", generateNote()],
    ["2. Pendant la formation", null],
    ["Confort et équipement, services proposés", generateNote()],
    ["Durée et rythme", generateNote()],
    ["Qualité des supports pédagogiques", generateNote()],
    ["3. Pédagogie", null],
    ["Qualité de l'animation pédagogique", generateNote()],
    ["Maîtrise des contenus du formateur", generateNote()],
    ["Écoute et réponses aux attentes personnelles", generateNote()],
    ["4. Évolution de vos connaissances : le programme vous a-t-il permis :", null],
    ["D'actualiser vos connaissances ?", generateNote()],
    ["D'acquérir des compétences nouvelles ?", generateNote()],
    ["De repérer des points faibles à combler ?", generateNote()],
    ["De mieux appréhender votre rôle dans l'entreprise ?", generateNote()],
    ["La mise en pratique vous paraît-elle facile ?", generateNote()],
    ["Le programme était-il suffisant pour répondre à vos besoins ?", generateNote()],
  ];

  extra += `<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;width:100%"><tr style="background:#1e3a7b;color:#fff"><th></th><th>Non concerné</th><th>- -<br>1</th><th>-<br>2</th><th>+<br>3</th><th>++<br>4</th></tr>`;
  criteres.forEach(([label, note]) => {
    if (note === null) {
      extra += `<tr style="background:#e8edf5;font-weight:bold"><td colspan="6">${label}</td></tr>`;
    } else {
      extra += `<tr><td>${label}</td><td>${note === 0 ? 'X' : ''}</td><td>${note === 1 ? 'X' : ''}</td><td>${note === 2 ? 'X' : ''}</td><td>${note === 3 ? 'X' : ''}</td><td>${note === 4 ? 'X' : ''}</td></tr>`;
    }
  });
  extra += `</table>`;

  const globalNotes = ["10/10", "9/10", "8/10", "7/10", "10/10", "9/10", "8/10", "10/10", "9/10", "8/10"];
  const globalNote = globalNotes[si % globalNotes.length];
  extra += `<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;width:100%"><tr style="background:#1e3a7b;color:#fff"><th></th><th>1/10</th><th>3/10</th><th>7/10</th><th>10/10</th></tr><tr><td>Niveau de satisfaction général</td><td></td><td></td><td>${globalNote === '7/10' ? 'X' : ''}</td><td>${['10/10', '9/10', '8/10'].includes(globalNote) ? 'X' : ''}</td></tr></table>`;

  const commentsPool = [
    `La formation s'est globalement bien déroulée. Les explications étaient claires et progressives. Le formateur était disponible et prenait le temps de répondre aux questions.`,
    `Formation enrichissante. Les exercices pratiques ont été utiles pour mettre en application les notions vues. Je me sens plus à l'aise pour utiliser les outils dans un cadre professionnel.`,
    `Très satisfait(e) de cette formation. Le contenu était bien structuré et le formateur pédagogue. Les supports de cours sont de qualité et je les conserverai comme référence.`,
    `Bonne formation, le rythme était adapté à notre niveau. J'aurais aimé approfondir certains points mais la durée ne le permettait pas. Dans l'ensemble, formation recommandée.`,
    `Le formateur maîtrise parfaitement son sujet et sait le transmettre avec clarté. Les mises en situation pratiques étaient particulièrement utiles et réalistes.`,
    `Formation très complète qui a répondu à mes attentes. Les méthodes pédagogiques étaient variées et l'ambiance propice à l'apprentissage. Je repars avec de vrais outils concrets.`,
    `J'ai beaucoup apprécié cette formation. Le contenu correspondait exactement à ce dont j'avais besoin dans mon poste actuel. Le formateur était dynamique et les échanges enrichissants.`,
    `Formation de bonne qualité. Les exercices progressifs m'ont permis de monter en compétence graduellement. Le formateur a su répondre à toutes mes questions avec précision.`,
    `Très bonne formation tant sur le fond que sur la forme. L'organisation logistique était impeccable. Je me sens désormais beaucoup plus confiant(e) dans l'utilisation des outils présentés.`,
    `La formation a dépassé mes attentes. Le formateur a su s'adapter au groupe et proposer des exemples concrets issus du terrain. Je recommande vivement cette formation.`,
  ];
  extra += `<p><strong>Commentaire :</strong> ${commentsPool[si % commentsPool.length]}</p>`;

  return buildDocument({ org: o, title: "QUESTIONNAIRE DE SATISFACTION DU BÉNÉFICIAIRE", subtitle: `${f.intitule} – ${s.prenom} ${s.nom}`, formation: f, showFormationInfo: true, extraHtml: extra });
}