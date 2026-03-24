import { DocEntry, FormationInfo } from "@/types/qualiopi";
import { StagiaireInfo } from "@/types/qualiopi";
import { FormateurInfo, getFormationDays, parseDuree } from "./sampleData";

export type ActionType = 'actions-formation' | 'bilans-competences' | 'vae' | 'apprentissage';

export function buildFullCatalog(
  formations: FormationInfo[],
  stagiaires: StagiaireInfo[],
  formateurs: FormateurInfo[],
  typesActions?: ActionType[]
): DocEntry[] {
  const d: DocEntry[] = [];
  const add = (id: string, nom: string, c: number, i: number, template: string, params?: Record<string, any>) =>
    d.push({ id, nom, critere: c, indicateur: i, template, params });

  const isAF = !typesActions || typesActions.length === 0 || typesActions.includes('actions-formation');
  const isCFA = typesActions?.includes('apprentissage');
  const isBDC = typesActions?.includes('bilans-competences');
  const isVAE = typesActions?.includes('vae');

  // =============================================
  // ===== AF — ACTION DE FORMATION (SELECT FORMATION) =====
  // =============================================
  if (isAF) {

    // ===== CRITÈRE 1 — INFORMATION DU PUBLIC =====

    // IND 1 — Programme de formation
    formations.forEach((f, fi) => {
      add(`af_c1i1_programme_${fi}`, `CT1 - IND 1 PROGRAMME DE FORMATION`, 1, 1, "programme_formation", { fi });
    });

    // IND 2 — Indicateurs de résultats / performance
    add("af_c1i2_lien_site_internet", "CT1 - IND 2 LIEN DU SITE INTERNET", 1, 2, "lien_site_internet");
    add("af_c1i2_procedure_indicateurs_perf", "CT1 - IND 2 PROCÉDURE DE SUIVI DES INDICATEURS DE PERFORMANCE", 1, 2, "procedure_indicateurs_performance");
    add("af_c1i2_tableau_bord_perf", "CT1 - IND 2 TABLEAU DE BORD INDICATEURS DE PERFORMANCE", 1, 2, "indicateurs_performance");

    // ===== CRITÈRE 2 — OBJECTIFS ET ADAPTATION =====

    // IND 4 — Analyse du besoin du bénéficiaire
    add("af_c2i4_procedure_eval_besoins", "CT2 - IND 4 PROCÉDURE D'ÉVALUATION DES BESOINS DES STAGIAIRES", 2, 4, "procedure_eval_besoins");
    add("af_c2i4_fiche_eval_psh", "CT2 - IND 4 FICHE D'ÉVALUATION DES BESOINS – PERSONNE EN SITUATION DE HANDICAP", 2, 4, "fiche_eval_besoins_psh");
    // Trame évaluation des besoins — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      add(`af_c2i4_trame_eval_besoins_${si}`, `CT2 - IND 4 TRAME ÉVALUATION DES BESOINS – ${s.prenom} ${s.nom}`, 2, 4, "trame_eval_besoins_stagiaire", { stagiaireIdx: si });
    });

    // IND 5 — Objectifs opérationnels et évaluables
    formations.forEach((f, fi) => {
      add(`af_c2i5_deroule_pedagogique_${fi}`, `CT2 - IND 5 DÉROULÉ PÉDAGOGIQUE DÉTAILLÉ`, 2, 5, "deroule_pedagogique_detaille", { fi });
    });

    // IND 6 — Contenus et modalités adaptés (Programme + Déroulé pédagogique)
    formations.forEach((f, fi) => {
      add(`af_c2i6_programme_${fi}`, `CT2 - IND 6 PROGRAMME DE FORMATION`, 2, 6, "programme_formation", { fi });
      add(`af_c2i6_deroule_pedagogique_${fi}`, `CT2 - IND 6 DÉROULÉ PÉDAGOGIQUE DÉTAILLÉ`, 2, 6, "deroule_pedagogique_detaille", { fi });
    });

    // IND 7 — Adéquation contenus / exigences certification (si formation avec code RS/RNCP)
    formations.forEach((f, fi) => {
      if (f.codeRNCP) {
        add(`af_c2i7_fiche_certification_${fi}`, `CT2 - IND 7 FICHE CERTIFICATION RS/RNCP`, 2, 7, "fiche_certification_rs", { fi });
        add(`af_c2i7_tableau_croise_${fi}`, `CT2 - IND 7 TABLEAU CROISÉ COMPÉTENCES / PROGRAMME`, 2, 7, "tableau_croise_cfa", { fi });
      }
    });

    // IND 8 — Positionnement et évaluation des acquis à l'entrée
    // Trames vides (modèles)
    formations.forEach((f, fi) => {
      add(`af_c2i8_trame_debut_${fi}`, `CT2 - IND 8 TEST DE POSITIONNEMENT DÉBUT DE FORMATION`, 2, 8, "test_positionnement_debut_trame", { fi });
      add(`af_c2i8_trame_fin_${fi}`, `CT2 - IND 8 TEST DE POSITIONNEMENT FIN DE FORMATION`, 2, 8, "test_positionnement_fin_trame", { fi });
    });
    // Procédures d'évaluation
    formations.forEach((f, fi) => {
      add(`af_c2i8_procedure_debut_${fi}`, `CT2 - IND 8 PROCÉDURE D'ÉVALUATION DE DÉBUT DE FORMATION`, 2, 8, "procedure_eval_debut", { fi });
      add(`af_c2i8_procedure_fin_${fi}`, `CT2 - IND 8 PROCÉDURE D'ÉVALUATION DE FIN DE FORMATION`, 2, 8, "procedure_eval_fin", { fi });
    });
    // Grille de niveaux
    formations.forEach((f, fi) => {
      add(`af_c2i8_grille_niveaux_${fi}`, `CT2 - IND 8 GRILLE DE NIVEAUX`, 2, 8, "grille_niveaux_positionnement", { fi });
    });
    // Tests remplis par stagiaire (un fichier individuel par stagiaire)
    formations.forEach((f, fi) => {
      stagiaires.forEach((s, si) => {
        add(`af_c2i8_test_debut_${fi}_${si}`, `CT2 - IND 8 TEST DÉBUT DE FORMATION – ${s.prenom} ${s.nom}`, 2, 8, "test_positionnement_debut_stagiaire", { fi, stagiaireIdx: si });
        add(`af_c2i8_test_fin_${fi}_${si}`, `CT2 - IND 8 TEST FIN DE FORMATION – ${s.prenom} ${s.nom}`, 2, 8, "test_positionnement_fin_stagiaire", { fi, stagiaireIdx: si });
      });
    });

    // ===== CRITÈRE 3 — ACCUEIL, ACCOMPAGNEMENT, SUIVI ET ÉVALUATION =====

    // IND 9 — Conditions de déroulement (documents administratifs uniquement)
    // CGV — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      add(`af_c3i9_cgv_${si}`, `CT3 - IND 9 CONDITIONS GÉNÉRALES DE VENTE – ${s.prenom} ${s.nom}`, 3, 9, "cgv_stagiaire", { stagiaireIdx: si });
    });
    // Contrat de formation — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      add(`af_c3i9_contrat_formation_${si}`, `CT3 - IND 9 CONTRAT DE FORMATION – ${s.prenom} ${s.nom}`, 3, 9, "contrat_formation_pro_stagiaire", { stagiaireIdx: si });
    });
    // Convocation — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      add(`af_c3i9_convocation_${si}`, `CT3 - IND 9 CONVOCATION – ${s.prenom} ${s.nom}`, 3, 9, "convocation_stagiaire", { stagiaireIdx: si });
    });
    add("af_c3i9_procedure_accueil", "CT3 - IND 9 PROCÉDURE D'ACCUEIL DES STAGIAIRES", 3, 9, "procedure_accueil_stagiaires");
    // Règlement intérieur — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      add(`af_c3i9_reglement_interieur_${si}`, `CT3 - IND 9 RÈGLEMENT INTÉRIEUR – ${s.prenom} ${s.nom}`, 3, 9, "reglement_interieur_stagiaire", { stagiaireIdx: si });
    });

    // IND 10 — Adaptation de la prestation et accompagnement
    add("af_c3i10_procedure_adaptation", "CT3 - IND 10 PROCÉDURE D'ADAPTATION PÉDAGOGIQUE", 3, 10, "procedure_adaptation");
    // Évaluation des besoins — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      add(`af_c3i10_eval_besoins_${si}`, `CT3 - IND 10 ÉVALUATION DES BESOINS – ${s.prenom} ${s.nom}`, 3, 10, "trame_eval_besoins_stagiaire", { stagiaireIdx: si });
    });
    formations.forEach((f, fi) => {
      add(`af_c3i10_deroule_pedagogique_${fi}`, `CT3 - IND 10 DÉROULÉ PÉDAGOGIQUE DÉTAILLÉ`, 3, 10, "deroule_pedagogique_detaille", { fi });
      add(`af_c3i10_tableau_suivi_${fi}`, `CT3 - IND 10 TABLEAU DE SUIVI DU PARCOURS BÉNÉFICIAIRES`, 3, 10, "tableau_suivi_parcours_excel", { fi });
    });

    // IND 11 — Évaluation de l'atteinte des objectifs
    formations.forEach((f, fi) => {
      const moda = (f.modalites || '').toLowerCase();
      const distanciel = moda.includes('distanciel') || moda.includes('e-learning') || moda.includes('foad');
      const presentiel = !distanciel || moda.includes('mixte');
      if (presentiel) {
        add(`af_c3i11_emargement_${fi}`, `CT3 - IND 11 FEUILLE D'ÉMARGEMENT`, 3, 11, "emargement_jour", { fi });
      }
      if (distanciel || moda.includes('mixte')) {
        add(`af_c3i11_temps_connexion_${fi}`, `CT3 - IND 11 TEMPS DE CONNEXION RÉEL`, 3, 11, "temps_connexion_reel", { fi });
      }
    });
    // Documents individuels per-stagiaire IND 11
    formations.forEach((f, fi) => {
      const nbJours = getFormationDays(f).length;
      const nbExercices = Math.max(1, Math.ceil(nbJours / 2));
      stagiaires.forEach((s, si) => {
        add(`af_c3i11_test_debut_${fi}_${si}`, `CT3 - IND 11 TEST DÉBUT DE FORMATION – ${s.prenom} ${s.nom}`, 3, 11, "test_positionnement_debut_stagiaire", { fi, stagiaireIdx: si });
        add(`af_c3i11_test_fin_${fi}_${si}`, `CT3 - IND 11 TEST FIN DE FORMATION – ${s.prenom} ${s.nom}`, 3, 11, "test_positionnement_fin_stagiaire", { fi, stagiaireIdx: si });
        // Un fichier exercice par tranche de 2 jours
        for (let exIdx = 0; exIdx < nbExercices; exIdx++) {
          const jourDebut = exIdx * 2 + 1;
          const jourFin = Math.min(exIdx * 2 + 2, nbJours);
          const label = nbExercices > 1 ? ` (Jour ${jourDebut}-${jourFin})` : '';
          add(`af_c3i11_exercices_${fi}_${si}_ex${exIdx}`, `CT3 - IND 11 EXERCICES PRATIQUES${label} – ${s.prenom} ${s.nom}`, 3, 11, "exercices_stagiaire", { fi, stagiaireIdx: si, exerciceIdx: exIdx });
        }
        add(`af_c3i11_grille_acquisition_${fi}_${si}`, `CT3 - IND 11 GRILLE D'ACQUISITION – ${s.prenom} ${s.nom}`, 3, 11, "grille_acquisition_stagiaire", { fi, stagiaireIdx: si });
        add(`af_c3i11_attestation_${fi}_${si}`, `CT3 - IND 11 ATTESTATION DE RÉUSSITE – ${s.prenom} ${s.nom}`, 3, 11, "attestation_reussite_stagiaire", { fi, stagiaireIdx: si });
      });
    });

    // ===== CRITÈRE 4 — ADÉQUATION DES MOYENS =====

    // IND 17 — Moyens humains, techniques et environnement
    add("af_c4i17_bail", "CT4 - IND 17 BAIL DE SOUS-LOCATION", 4, 17, "bail_sous_location");

    // IND 18 — Coordination des intervenants
    add("af_c4i18_organigramme", "CT4 - IND 18 ORGANIGRAMME", 4, 18, "organigramme");

    // IND 19 — Ressources pédagogiques mises à disposition
    formations.forEach((f, fi) => {
      add(`af_c4i19_support_cours_${fi}`, `CT4 - IND 19 SUPPORT DE COURS`, 4, 19, "support_cours_ref", { fi });
    });
    add("af_c4i19_ressources_pedagogiques", "CT4 - IND 19 RESSOURCES PÉDAGOGIQUES", 4, 19, "ressources_pedagogiques");

    // ===== CRITÈRE 5 — QUALIFICATION DU PERSONNEL =====

    // IND 21 — Compétences des intervenants
    add("af_c5i21_fiche_poste_dirigeant", "CT5 - IND 21 FICHE DE POSTE – RESPONSABLE PÉDAGOGIQUE", 5, 21, "fiche_poste_formateur", { role: "dirigeant" });
    add("af_c5i21_fiche_poste_formateur", "CT5 - IND 21 FICHE DE POSTE – FORMATEUR", 5, 21, "fiche_poste_formateur", { role: "formateur" });
    add("af_c5i21_fiche_poste_ref_admin", "CT5 - IND 21 FICHE DE POSTE – RÉFÉRENT ADMINISTRATIF", 5, 21, "fiche_poste_formateur", { role: "referent_administratif" });
    add("af_c5i21_fiche_poste_ref_handicap", "CT5 - IND 21 FICHE DE POSTE – RÉFÉRENT HANDICAP", 5, 21, "fiche_poste_formateur", { role: "referent_handicap" });
    // Une seule auto-évaluation pour le formateur de la formation
    add("af_c5i21_autoevaluation_0", `CT5 - IND 21 AUTO-ÉVALUATION FORMATEUR`, 5, 21, "autoevaluation_formateur", { formateurIdx: 0 });
    add("af_c5i21_processus_recrutement", "CT5 - IND 21 DESCRIPTION DU PROCESSUS DE RECRUTEMENT", 5, 21, "procedure_recrutement_formateur");

    // IND 22 — Entretien et développement des compétences
    add("af_c5i22_plan_dev_competences", "CT5 - IND 22 PLAN DE DÉVELOPPEMENT DES COMPÉTENCES", 5, 22, "plan_dev_competences_excel");

    // ===== CRITÈRE 6 — ENVIRONNEMENT PROFESSIONNEL =====

    // IND 23 — Veille légale et réglementaire
    add("af_c6i23_veille_reglementaire", "CT6 - IND 23 VEILLE RÉGLEMENTAIRE", 6, 23, "tableau_veille", { type: "réglementaire" });
    add("af_c6i23_pdf_guide_qualiopi", "CT6 - IND 23 V9 GUIDE DE LECTURE QUALIOPI", 6, 23, "pdf_static", { pdfFile: "v9_guide_lecture_qualiopi.pdf" });

    // IND 24 — Veille métiers et emplois
    add("af_c6i24_tableau_veille_metier", "CT6 - IND 24 TABLEAU DE VEILLE MÉTIER", 6, 24, "tableau_veille", { type: "métier" });

    // IND 25 — Veille innovations pédagogiques et technologiques
    add("af_c6i25_tableau_veille_techno", "CT6 - IND 25 TABLEAU DE VEILLE TECHNOLOGIQUE", 6, 25, "tableau_veille", { type: "technologique" });

    // IND 26 — Accueil et accompagnement handicap
    add("af_c6i26_veille_handicap", "CT6 - IND 26 VEILLE HANDICAP", 6, 26, "tableau_veille", { type: "handicap" });
    // PDFs statiques IND 26
    add("af_c6i26_pdf_referentiel_defi", "CT6 - IND 26 RÉFÉRENTIEL HANDICAP DÉFI MÉTIER", 6, 26, "pdf_static", { pdfFile: "referentiel_handicap_defi_metier.pdf" });
    add("af_c6i26_pdf_agefiph_fiche", "CT6 - IND 26 AGEFIPH FICHE PRATIQUE QUALITÉ", 6, 26, "pdf_static", { pdfFile: "agefiph_fiche_pratique_qualite.pdf" });
    add("af_c6i26_pdf_agefiph_contacts", "CT6 - IND 26 AGEFIPH RHF CONTACTS", 6, 26, "pdf_static", { pdfFile: "agefiph_rhf_contacts.pdf" });
    add("af_c6i26_pdf_diplome_rhf", "CT6 - IND 26 DIPLÔME RÉFÉRENT HANDICAP", 6, 26, "pdf_static", { pdfFile: "diplome_referent_handicap.pdf" });
    add("af_c6i26_pdf_fiche_rhf_idf", "CT6 - IND 26 FICHE TECHNIQUE RHF IDF", 6, 26, "pdf_static", { pdfFile: "fiche_technique_rhf_idf.pdf" });
    add("af_c6i26_pdf_recruter_handicap", "CT6 - IND 26 COMMENT RECRUTER UNE PERSONNE HANDICAPÉE", 6, 26, "pdf_static", { pdfFile: "handicap_comment_recruter.pdf" });
    add("af_c6i26_pdf_procedure_communiquer", "CT6 - IND 26 PROCÉDURE COMMUNIQUER AVEC DES PERSONNES HANDICAPÉES", 6, 26, "pdf_static", { pdfFile: "procedure_communiquer_handicap.pptx" });

    // IND 27 — Sous-traitance et partenariats
    add("af_c6i27_partenaires", "CT6 - IND 27 LES PARTENAIRES", 6, 27, "liste_partenaires");
    add("af_c6i27_contrat_sous_traitance", "CT6 - IND 27 CONTRAT DE SOUS-TRAITANCE DE FORMATEUR", 6, 27, "contrat_sous_traitance_v2");
    add("af_c6i27_charte_qualite_formateur", "CT6 - IND 27 CHARTE QUALITÉ FORMATEUR EXTERNE", 6, 27, "charte_qualite_formateur_externe");
    add("af_c6i27_mandat_qualiopi", "CT6 - IND 27 MANDAT DE PRÉSENTATION ET DE GESTION QUALIOPI", 6, 27, "mandat_qualiopi");
    add("af_c6i27_pdf_guide_qualiopi", "CT6 - IND 27 V9 GUIDE DE LECTURE QUALIOPI", 6, 27, "pdf_static", { pdfFile: "v9_guide_lecture_qualiopi.pdf" });

    // ===== CRITÈRE 7 — AMÉLIORATION CONTINUE =====

    // IND 30 — Appréciations et amélioration continue
    add("af_c7i30_eval_formateur", "CT7 - IND 30 ÉVALUATION FORMATEUR", 7, 30, "enquete_satisfaction_formateur");
    // Bilan à chaud — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      add(`af_c7i30_bilan_chaud_${si}`, `CT7 - IND 30 BILAN À CHAUD – ${s.prenom} ${s.nom}`, 7, 30, "bilan_chaud_stagiaire", { stagiaireIdx: si });
    });
    // Bilan à froid — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      add(`af_c7i30_bilan_froid_${si}`, `CT7 - IND 30 BILAN À FROID – ${s.prenom} ${s.nom}`, 7, 30, "bilan_froid_stagiaire", { stagiaireIdx: si });
    });
    add("af_c7i30_compte_rendu_formateur", "CT7 - IND 30 COMPTE-RENDU DE FORMATION", 7, 30, "compte_rendu_formateur");
    // Questionnaire satisfaction bénéficiaire — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      add(`af_c7i30_appreciations_beneficiaires_${si}`, `CT7 - IND 30 QUESTIONNAIRE DE SATISFACTION – ${s.prenom} ${s.nom}`, 7, 30, "appreciations_beneficiaires_stagiaire", { stagiaireIdx: si });
    });
    add("af_c7i30_appreciations_entreprises", "CT7 - IND 30 QUESTIONNAIRE DE SATISFACTION CLIENT COMMANDITAIRE", 7, 30, "appreciations_entreprises");
    add("af_c7i30_appreciations_financeurs", "CT7 - IND 30 ENQUÊTE SATISFACTION FINANCEUR", 7, 30, "appreciations_financeurs");
    add("af_c7i30_relances_appreciations_excel", "CT7 - IND 30 TABLEAU DE RELANCES DES APPRÉCIATIONS", 7, 30, "relances_appreciations_excel");

    // IND 31 — Réclamations et dysfonctionnements
    add("af_c7i31_formulaire_reclamation", "CT7 - IND 31 FORMULAIRE DE DÉPÔT DE RÉCLAMATION", 7, 31, "formulaire_reclamation");
    add("af_c7i31_gestion_reclamations", "CT7 - IND 31 GESTION DES RÉCLAMATIONS ET DYSFONCTIONNEMENTS", 7, 31, "procedure_reclamation");
    add("af_c7i31_suivi_dysfonctionnements_excel", "CT7 - IND 31 SUIVI DES DYSFONCTIONNEMENTS INTERNES ET EXTERNES", 7, 31, "suivi_dysfonctionnements_excel");

    // IND 32 — Amélioration continue
    add("af_c7i32_tableau_amelioration_excel", "CT7 - IND 32 TABLEAU D'AMÉLIORATION CONTINUE", 7, 32, "tableau_amelioration_continue_excel");
    add("af_c7i32_procedure_amelioration", "CT7 - IND 32 PROCÉDURE AMÉLIORATION CONTINUE", 7, 32, "procedure_amelioration_continue");
  }

  // =============================================
  // ===== CFA — APPRENTISSAGE (placeholder) =====
  // =============================================
  if (isCFA) {
    // ===== CRITÈRE 1 — INFORMATION DU PUBLIC (CFA) =====

    // IND 1 — Programme et informations
    add("cfa_c1i1_programme", "CT1 - IND 1 PROGRAMME DE FORMATION CFA", 1, 1, "programme_formation", { fi: 0 });
    add("cfa_c1i1_plaquette_commerciale", "CT1 - IND 1 PLAQUETTE COMMERCIALE CFA", 1, 1, "plaquette_commerciale_cfa");
    add("cfa_c1i1_procedure_inscription", "CT1 - IND 1 PROCÉDURE D'INSCRIPTION CFA", 1, 1, "procedure_inscription_cfa");
    add("cfa_c1i1_procedure_formation", "CT1 - IND 1 PROCÉDURE DE FORMATION CFA", 1, 1, "procedure_formation_cfa");
    add("cfa_c1i1_cgv", "CT1 - IND 1 CONDITIONS GÉNÉRALES DE VENTE CFA", 1, 1, "cgv");

    // IND 2 — Indicateurs de résultats CFA
    add("cfa_c1i2_indicateurs_resultats", "CT1 - IND 2 INDICATEURS DE RÉSULTATS CFA", 1, 2, "indicateurs_resultats_cfa");

    // IND 3 — Taux d'obtention, certification RNCP
    add("cfa_c1i3_titre_rncp", "CT1 - IND 3 FICHE TITRE RNCP", 1, 3, "titre_rncp_cfa");
    add("cfa_c1i3_matiere_titre", "CT1 - IND 3 MATIÈRE DU TITRE", 1, 3, "matiere_titre_cfa");
    add("cfa_c1i3_tableau_croise", "CT1 - IND 3 TABLEAU CROISÉ COMPÉTENCES PROGRAMME", 1, 3, "tableau_croise_cfa");

    // ===== CRITÈRE 2 — OBJECTIFS ET ADAPTATION (CFA) =====

    // IND 4 — Analyse du besoin du bénéficiaire (CFA)
    add("cfa_c2i4_grille_entretien", "CT2 - IND 4 GRILLE D'ENTRETIEN INDIVIDUEL – CANDIDAT", 2, 4, "grille_entretien_candidat_cfa");
    add("cfa_c2i4_procedure_eval_besoins", "CT2 - IND 4 PROCÉDURE D'ÉVALUATION DES BESOINS", 2, 4, "procedure_eval_besoins");
    add("cfa_c2i4_fiche_eval_psh", "CT2 - IND 4 FICHE D'ÉVALUATION DES BESOINS – PERSONNE EN SITUATION DE HANDICAP", 2, 4, "fiche_eval_besoins_psh");
    add("cfa_c2i4_procedure_missions", "CT2 - IND 4 PROCÉDURE VÉRIFICATION MISSIONS ENTREPRISE ET CERTIFICATION", 2, 4, "procedure_missions_entreprise_cfa");
    stagiaires.forEach((s, si) => {
      add(`cfa_c2i4_attestation_inscription_${si}`, `CT2 - IND 4 ATTESTATION D'INSCRIPTION – ${s.prenom} ${s.nom}`, 2, 4, "attestation_inscription_cfa", { stagiaireIdx: si });
      add(`cfa_c2i4_fiche_renseignement_${si}`, `CT2 - IND 4 FICHE DE RENSEIGNEMENT – ${s.prenom} ${s.nom}`, 2, 4, "fiche_renseignement_cfa", { stagiaireIdx: si });
      add(`cfa_c2i4_trame_eval_besoins_${si}`, `CT2 - IND 4 TRAME ÉVALUATION DES BESOINS – ${s.prenom} ${s.nom}`, 2, 4, "trame_eval_besoins_stagiaire", { stagiaireIdx: si });
    });
    add("cfa_c2i4_dossier_candidature", "CT2 - IND 4 DOSSIER DE CANDIDATURE", 2, 4, "dossier_candidature_cfa");
    add("cfa_c2i4_mail_type_candidat", "CT2 - IND 4 MAIL TYPES CANDIDAT (Renseignement, Dossier, Relance)", 2, 4, "mail_type_candidat_cfa");

    // IND 5 — Objectifs opérationnels et évaluables (CFA)
    stagiaires.forEach((s, si) => {
      add(`cfa_c2i5_convention_formation_${si}`, `CT2 - IND 5 CONVENTION DE FORMATION PAR APPRENTISSAGE – ${s.prenom} ${s.nom}`, 2, 5, "convention_formation_cfa", { stagiaireIdx: si });
      add(`cfa_c2i5_livret_apprentissage_${si}`, `CT2 - IND 5 LIVRET D'APPRENTISSAGE – ${s.prenom} ${s.nom}`, 2, 5, "livret_apprentissage_cfa_v2", { stagiaireIdx: si });
    });
    add("cfa_c2i5_documents_certificateurs", "CT2 - IND 5 DOCUMENTS CERTIFICATEURS CFA", 2, 5, "documents_certificateurs_cfa");
    add("cfa_c2i5_synopsis", "CT2 - IND 5 SYNOPSIS DE FORMATION", 2, 5, "synopsis_cfa");
    // Si formation NTC → ajouter le REAC
    if (formations.some(f => f.codeRNCP?.toUpperCase() === 'RNCP39063' || f.intitule?.toLowerCase().includes('ntc') || f.intitule?.toLowerCase().includes('négociateur technico-commercial') || f.intitule?.toLowerCase().includes('negociateur technico'))) {
      add("cfa_c2i5_reac_ntc", "CT2 - IND 5 RÉFÉRENTIEL REAC – NÉGOCIATEUR TECHNICO-COMMERCIAL", 2, 5, "pdf_static", { pdfFile: "referentiel_reac_ntc.pdf" });
    }

    // Indicateur 13 - Coordination alternance
    formations.forEach((f, fi) => {
      add(`cfa_c3i13_contrat_${fi}`, `Contrat d'apprentissage`, 3, 13, "contrat_apprentissage", { fi });
      add(`cfa_c3i13_competences_${fi}`, `Grille compétences alternance`, 3, 13, "competences_alternance", { fi });
      add(`cfa_c3i13_suivi_ent_${fi}`, `Suivi en entreprise`, 3, 13, "suivi_entreprise_cfa", { fi });
    });

    // Indicateur 14 - Accompagnement socio-pro
    formations.forEach((f, fi) => {
      add(`cfa_c3i14_suivi3mois_${fi}`, `Suivi à 3 mois`, 3, 14, "suivi_3_mois", { fi });
      add(`cfa_c3i14_insertion_${fi}`, `Questionnaire insertion`, 3, 14, "questionnaire_insertion", { fi });
    });

    // Indicateur 15 - Droits et devoirs apprenti
    formations.forEach((f, fi) => {
      add(`cfa_c3i15_conditions_${fi}`, `Fiche conditions accueil`, 3, 15, "conditions_accueil", { fi });
      add(`cfa_c3i15_charte_${fi}`, `Charte accueil`, 3, 15, "charte_accueil", { fi });
    });

    // Indicateur 16 - Présentation certification
    formations.forEach((f, fi) => {
      add(`cfa_c3i16_livret_${fi}`, `Livret d'apprentissage`, 3, 16, "livret_apprentissage", { fi });
      add(`cfa_c3i16_suivi_tuteur_${fi}`, `Fiche suivi tuteur`, 3, 16, "fiche_suivi_tuteur", { fi });
    });

    // Documents CFA complémentaires
    add("cfa_c1i1_livret_accueil", "CT1 - IND 1 LIVRET D'ACCUEIL CFA", 1, 1, "livret_accueil_cfa");
    add("cfa_procedure_psh", "Procédure PSH CFA", 6, 26, "procedure_psh_cfa");
    add("cfa_guide_connexion", "Guide d'aide à la connexion CFA", 3, 9, "guide_aide_connexion_cfa");
    // Convention de formation par apprentissage — CT3 IND 9
    stagiaires.forEach((s, si) => {
      add(`cfa_c3i9_convention_${si}`, `CT3 - IND 9 CONVENTION DE FORMATION PAR APPRENTISSAGE – ${s.prenom} ${s.nom}`, 3, 9, "convention_formation_apprentissage", { stagiaireIdx: si });
    });
    // ===== IND 11 — Évaluation de l'atteinte des objectifs (CFA) =====
    // Émargement CFA — une feuille par semaine CFA avec dates réelles
    formations.forEach((f, fi) => {
      add(`cfa_c3i11_emargement_${fi}`, `CT3 - IND 11 FEUILLE D'ÉMARGEMENT CFA`, 3, 11, "emargement_cfa", { fi });
    });
    // Documents individuels per-stagiaire IND 11 CFA
    formations.forEach((f, fi) => {
      // Calculate CFA weeks: totalHours / 35h per week
      const dur = parseDuree(f.duree);
      const totalCFAWeeks = Math.max(1, Math.ceil((dur.totalHours > 0 ? dur.totalHours : 420) / 35));
      // 2 exercises per CFA week
      const nbExercices = totalCFAWeeks * 2;
      stagiaires.forEach((s, si) => {
        // Tests début/fin (vide si formation pas terminée, rempli sinon)
        add(`cfa_c3i11_test_debut_${fi}_${si}`, `CT3 - IND 11 TEST DÉBUT DE FORMATION – ${s.prenom} ${s.nom}`, 3, 11, "test_cfa_stagiaire", { fi, stagiaireIdx: si, phase: "debut" });
        add(`cfa_c3i11_test_fin_${fi}_${si}`, `CT3 - IND 11 TEST FIN DE FORMATION – ${s.prenom} ${s.nom}`, 3, 11, "test_cfa_stagiaire", { fi, stagiaireIdx: si, phase: "fin" });
        // Exercices pratiques (2 par semaine CFA)
        for (let exIdx = 0; exIdx < nbExercices; exIdx++) {
          const weekNum = Math.floor(exIdx / 2) + 1;
          const exInWeek = (exIdx % 2) + 1;
          const label = ` (Semaine ${weekNum} - Ex. ${exInWeek})`;
          add(`cfa_c3i11_exercices_${fi}_${si}_ex${exIdx}`, `CT3 - IND 11 EXERCICE PRATIQUE${label} – ${s.prenom} ${s.nom}`, 3, 11, "exercices_cfa_stagiaire", { fi, stagiaireIdx: si, exerciceIdx: exIdx });
        }
        // Examen blanc
        add(`cfa_c3i11_examen_blanc_${fi}_${si}`, `CT3 - IND 11 EXAMEN BLANC – ${s.prenom} ${s.nom}`, 3, 11, "examen_blanc_cfa_stagiaire", { fi, stagiaireIdx: si });
        // Grille d'acquisition
        add(`cfa_c3i11_grille_acquisition_${fi}_${si}`, `CT3 - IND 11 GRILLE D'ACQUISITION – ${s.prenom} ${s.nom}`, 3, 11, "grille_acquisition_cfa_stagiaire", { fi, stagiaireIdx: si });
        // Attestation de réussite
        add(`cfa_c3i11_attestation_${fi}_${si}`, `CT3 - IND 11 ATTESTATION DE RÉUSSITE – ${s.prenom} ${s.nom}`, 3, 11, "attestation_reussite_cfa_stagiaire", { fi, stagiaireIdx: si });
      });
    });
    add("cfa_fiche_autoevaluation", "CT3 - IND 11 FICHE AUTOÉVALUATION APPRENTI", 3, 11, "fiche_autoevaluation_apprenti");
    add("cfa_procedure_abandon", "Procédure d'abandon CFA", 3, 12, "procedure_abandon_cfa");
    add("cfa_procedure_absences", "Procédure des absences CFA", 3, 12, "procedure_absences_cfa");
    add("cfa_logs_connexion", "Logs de connexion CFA", 3, 12, "logs_connexion_cfa");
  }

  // ===== Bilan de compétences =====
  if (isBDC) {
    formations.slice(0, 2).forEach((f, fi) => {
      add(`bdc_analyse_parcours_${fi}`, `Analyse parcours professionnel`, 2, 4, "analyse_parcours_pro", { fi });
      add(`bdc_plan_action_${fi}`, `Plan d'action professionnel`, 3, 14, "plan_action_bilan", { fi });
      add(`bdc_synthese_${fi}`, `Synthèse bilan de compétences`, 3, 12, "synthese_bilan", { fi });
    });
  }

  // ===== VAE =====
  if (isVAE) {
    formations.slice(0, 2).forEach((f, fi) => {
      add(`vae_livret_recevabilite_${fi}`, `Livret de recevabilité VAE`, 2, 4, "livret_recevabilite_vae", { fi });
      add(`vae_dossier_validation_${fi}`, `Dossier de validation VAE`, 3, 11, "dossier_validation_vae", { fi });
      add(`vae_accompagnement_${fi}`, `Suivi accompagnement VAE`, 3, 10, "accompagnement_vae", { fi });
    });
  }

  return d;
}
