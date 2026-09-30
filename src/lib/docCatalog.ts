import { DocEntry, FormationInfo } from "@/types/qualiopi";
import { StagiaireInfo } from "@/types/qualiopi";
import { FormateurInfo, getFormationDays, parseDuree } from "./sampleData";
import { getRNCPByCode } from "./rncpData";
import { estJourFormation } from "./joursFeries";
import { getUnitesExercices } from "./parcoursStagiaire";

/** Nombre de jours de formation réels d'un stagiaire (fériés exclus, samedi de bord inclus). */
function nbJoursStagiaireCatalog(s: StagiaireInfo, f: FormationInfo): number {
  const deb = (s.dateDebutFormation || f.dateDebut || "").trim();
  const fin = (s.dateFinFormation || f.dateFin || "").trim();
  if (!deb || !fin) return 0;
  const parse = (v: string): Date | null => {
    const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    const d = m ? new Date(+m[3], +m[2] - 1, +m[1]) : new Date(v);
    return isNaN(d.getTime()) ? null : d;
  };
  const start = parse(deb), end = parse(fin);
  if (!start || !end || end < start) return 0;
  let n = 0;
  const cur = new Date(start);
  while (cur <= end) {
    if (estJourFormation(cur, start, end)) n++;
    cur.setDate(cur.getDate() + 1);
  }
  return n;
}
import { getEvalContent } from "./evalContent";
import { BDC_NT_SOURCE, BDC_NT_PER_BENEFICIAIRE, BDC_NT_STATIC_ASSETS } from "./bdc/bdcNTSource";
import { BDC_TEMPLATES_MANQUANTS } from "./bdc/bdcTemplatesBC";

import { BDC_NT_STATS_FILES } from "./bdc/bdcNTStatsXlsx";
import { critereForIndicateur, indicateurFromKey, bdcDocTitle } from "./bdc/bdcNTConseilsZip";
import { dateMailMission } from "./mailsMissionsCFA";
import { MISSIONS_QCM } from "./templatesCFA14Missions";
import { dateMailDiffusionMission } from "./mailsDiffusionMissionsCFA";


export type ActionType = 'actions-formation' | 'bilans-competences' | 'vae' | 'apprentissage';

function isCodeRsrncp(code?: string): boolean {
  if (!code) return false;
  const c = code.trim().toUpperCase();
  return c.startsWith("RS") || c.startsWith("RNCP");
}

export function buildFullCatalog(
  formations: FormationInfo[],
  stagiaires: StagiaireInfo[],
  formateurs: FormateurInfo[],
  typesActions?: ActionType[],
  dirigeantNom?: string,
  orgCodePostal?: string
): DocEntry[] {
  const d: DocEntry[] = [];
  const add = (id: string, nom: string, c: number, i: number, template: string, params?: Record<string, any>) =>
    d.push({ id, nom, critere: c, indicateur: i, template, params });

  const isAF = !typesActions || typesActions.length === 0 || typesActions.includes('actions-formation');
  const isCFA = typesActions?.includes('apprentissage');
  const isBDC = typesActions?.includes('bilans-competences');
  const isVAE = typesActions?.includes('vae');

  // Détecte si au moins un formateur (assigné aux stagiaires ou à la formation) est différent du dirigeant.
  const normalizeName = (s: string) => (s || "").trim().toLowerCase().replace(/\s+/g, " ");
  const dirigeantKey = normalizeName(dirigeantNom || "");
  const formateurNames = new Set<string>();
  stagiaires.forEach(s => { if (s.formateur) formateurNames.add(normalizeName(s.formateur)); });
  formations.forEach(f => { if (f.formateur) formateurNames.add(normalizeName(f.formateur)); });
  formateurNames.delete("");
  const hasExternalFormateur = Array.from(formateurNames).some(n => n !== dirigeantKey);


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

    // IND 3 — Taux d'obtention des certifications (uniquement si code RNCP renseigné)
    formations.forEach((f, fi) => {
      if (f.codeRNCP && f.codeRNCP.trim()) {
        add(`af_c1i3_taux_obtention_${fi}`, `CT1 - IND 3 TAUX D'OBTENTION DE LA CERTIFICATION`, 1, 3, "taux_obtention_certification", { fi });
      }
    });


    // ===== CRITÈRE 2 — OBJECTIFS ET ADAPTATION =====

    // IND 4 — Analyse du besoin du bénéficiaire
    add("af_c2i4_procedure_eval_besoins", "CT2 - IND 4 PROCÉDURE D'ÉVALUATION DES BESOINS DES STAGIAIRES", 2, 4, "procedure_eval_besoins");
    add("af_c2i4_fiche_eval_psh", "CT2 - IND 4 FICHE D'ÉVALUATION DES BESOINS – PERSONNE EN SITUATION DE HANDICAP", 2, 4, "fiche_eval_besoins_psh");
    // Trame évaluation des besoins — un fichier par stagiaire (apprenant + entreprise regroupés)
    stagiaires.forEach((s, si) => {
      add(`af_c2i4_trame_eval_besoins_${si}`, `CT2 - IND 4 TRAME ÉVALUATION DES BESOINS – ${s.prenom} ${s.nom}`, 2, 4, "trame_eval_besoins_combine", { stagiaireIdx: si });
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

    // IND 7 — Adéquation contenus / exigences certification (RS/RNCP uniquement)
    formations.forEach((f, fi) => {
      if (isCodeRsrncp(f.codeRNCP)) {
        add(`af_c2i7_fiche_certification_${fi}`, `CT2 - IND 7 FICHE CERTIFICATION RS/RNCP`, 2, 7, "fiche_certification_rs", { fi });
        add(`af_c2i7_tableau_croise_${fi}`, `CT2 - IND 7 TABLEAU CROISÉ COMPÉTENCES / MODULES`, 2, 7, "tableau_croise_cfa", { fi });
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
    // Contrat ou Convention de formation — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      const hasEntreprise = !!(s.entreprise && s.entreprise.trim());
      if (hasEntreprise) {
        add(`af_c3i9_convention_formation_${si}`, `CT3 - IND 9 CONVENTION DE FORMATION TRIPARTITE – ${s.prenom} ${s.nom}`, 3, 9, "convention_formation_tripartite", { stagiaireIdx: si });
      } else {
        add(`af_c3i9_contrat_formation_${si}`, `CT3 - IND 9 CONTRAT DE FORMATION – ${s.prenom} ${s.nom}`, 3, 9, "contrat_formation_pro_stagiaire", { stagiaireIdx: si });
      }
    });
    // Convocation — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      add(`af_c3i9_convocation_${si}`, `CT3 - IND 9 CONVOCATION – ${s.prenom} ${s.nom}`, 3, 9, "convocation_stagiaire", { stagiaireIdx: si });
    });
    add("af_c3i9_procedure_accueil", "CT3 - IND 9 PROCÉDURE D'ACCUEIL DES STAGIAIRES", 3, 9, "procedure_accueil_stagiaires");
    add("af_c3i9_livret_accueil", "CT3 - IND 9 LIVRET D'ACCUEIL DU STAGIAIRE", 3, 9, "livret_accueil");
    // Règlement intérieur — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      add(`af_c3i9_reglement_interieur_${si}`, `CT3 - IND 9 RÈGLEMENT INTÉRIEUR – ${s.prenom} ${s.nom}`, 3, 9, "reglement_interieur_stagiaire", { stagiaireIdx: si });
    });

    // IND 10 — Adaptation de la prestation et accompagnement
    add("af_c3i10_procedure_adaptation", "CT3 - IND 10 PROCÉDURE D'ADAPTATION PÉDAGOGIQUE", 3, 10, "procedure_adaptation");
    // Évaluation des besoins — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      add(`af_c3i10_eval_besoins_${si}`, `CT3 - IND 10 ÉVALUATION DES BESOINS – ${s.prenom} ${s.nom}`, 3, 10, "trame_eval_besoins_combine", { stagiaireIdx: si });
    });
    formations.forEach((f, fi) => {
      add(`af_c3i10_deroule_pedagogique_${fi}`, `CT3 - IND 10 DÉROULÉ PÉDAGOGIQUE DÉTAILLÉ`, 3, 10, "deroule_pedagogique_detaille", { fi });
      add(`af_c3i10_tableau_suivi_${fi}`, `CT3 - IND 10 TABLEAU DE SUIVI DU PARCOURS BÉNÉFICIAIRES`, 3, 10, "tableau_suivi_parcours_excel", { fi });
    });

    // IND 11 — Évaluation de l'atteinte des objectifs
    formations.forEach((f, fi) => {
      const moda = (f.modalites || '').toLowerCase();
      const distanciel = moda.includes('distanciel') || moda.includes('e-learning') || moda.includes('foad');
      const mixte = moda.includes('mixte');
      const presentiel = !distanciel || mixte;
      // Check if stagiaires have individual dates
      const hasIndivDates = stagiaires.some(s => s.dateDebutFormation || s.dateFinFormation);
      if (presentiel) {
        if (hasIndivDates) {
          // One emargement per stagiaire with their individual dates
          stagiaires.forEach((s, si) => {
            add(`af_c3i11_emargement_${fi}_${si}`, `CT3 - IND 11 FEUILLE D'ÉMARGEMENT – ${s.prenom} ${s.nom}`, 3, 11, "emargement_stagiaire", { fi, stagiaireIdx: si });
          });
        } else {
          add(`af_c3i11_emargement_${fi}`, `CT3 - IND 11 FEUILLE D'ÉMARGEMENT`, 3, 11, "emargement_jour", { fi });
        }
      }
      if (distanciel || mixte) {
        if (hasIndivDates) {
          // Distanciel : remplace la feuille d'émargement par un relevé de temps de connexion par stagiaire
          stagiaires.forEach((s, si) => {
            add(`af_c3i11_temps_connexion_${fi}_${si}`, `CT3 - IND 11 TEMPS DE CONNEXION RÉEL – ${s.prenom} ${s.nom}`, 3, 11, "temps_connexion_reel", { fi, stagiaireIdx: si });
          });
        } else {
          add(`af_c3i11_temps_connexion_${fi}`, `CT3 - IND 11 TEMPS DE CONNEXION RÉEL`, 3, 11, "temps_connexion_reel", { fi });
        }
      }
    });
    // Documents individuels per-stagiaire IND 11
    formations.forEach((f, fi) => {
      const rncp = f.codeRNCP ? getRNCPByCode(f.codeRNCP) : null;
      const hasBlocs = rncp && rncp.blocsCompetences && rncp.blocsCompetences.length > 0;
      const nbJoursFormation = getFormationDays(f).length;

      stagiaires.forEach((s, si) => {
        add(`af_c3i11_test_debut_${fi}_${si}`, `CT3 - IND 11 TEST DÉBUT DE FORMATION – ${s.prenom} ${s.nom}`, 3, 11, "test_positionnement_debut_stagiaire", { fi, stagiaireIdx: si });
        add(`af_c3i11_test_fin_${fi}_${si}`, `CT3 - IND 11 TEST FIN DE FORMATION – ${s.prenom} ${s.nom}`, 3, 11, "test_positionnement_fin_stagiaire", { fi, stagiaireIdx: si });

        // 1 fichier = 1 jour de formation (1 exercice par jour).
        // Mix QCM / exercice pratique en alternance selon la formation.
        const evalData = getEvalContent(f.intitule);
        const nbExContent = evalData?.exercices?.length || 0;

        // Formation Gestionnaire de paie / Secrétariat : 1 fichier = 1 module (5 QCM + 1 exercice pratique).
        const tPaie = (f.intitule || "").toLowerCase();
        const isPaieForm = tPaie.includes("gestionnaire de paie") || tPaie.includes("gestionnaire paie") || (tPaie.includes("paie") && (tPaie.includes("bulletin") || tPaie.includes("gestion") || tPaie.includes("dsn")));
        const isSecretariatForm = tPaie.includes("secrétariat") || tPaie.includes("secretariat") || tPaie.includes("secrétaire") || tPaie.includes("secretaire") || tPaie.includes("office manager") || tPaie.includes("assistanat");
        const PAIE_MODULE_TITLES = [
          "Fondamentaux du droit du travail",
          "Construire un bulletin de paie",
          "Cotisations, DSN et déclarations",
          "Absences, congés payés et IJSS",
          "Rupture du contrat et STC",
          "Contrôles, veille et posture pro",
        ];
        const SECRETARIAT_MODULE_TITLES = [
          "Métier, éthique et RGPD",
          "Communication écrite professionnelle",
          "Outils bureautiques et collaboratifs",
          "Accueil, téléphone et anglais pro",
          "Organisation, archivage et employabilité",
        ];
        const isIAForm = tPaie.includes("intelligence artificielle") || tPaie.includes("ia générative");
        const moduleTitles = isPaieForm ? PAIE_MODULE_TITLES : isSecretariatForm ? SECRETARIAT_MODULE_TITLES : null;

        // Nombre d'exercices / QCM dérivé du parcours RÉEL du stagiaire :
        // ≤ 12 jours de formation → 1 par jour ; au-delà → 1 par semaine calendaire.
        const unites = getUnitesExercices(s, f);
        const nbQcm = moduleTitles ? moduleTitles.length : unites.length;
        for (let exIdx = 0; exIdx < nbQcm; exIdx++) {
          if (moduleTitles) {
            add(
              `af_c3i11_exercices_${fi}_${si}_ex${exIdx}`,
              `CT3 - IND 11 EXERCICES MODULE ${exIdx + 1} — ${moduleTitles[exIdx]} – ${s.prenom} ${s.nom}`,
              3, 11, "exercices_stagiaire",
              { fi, stagiaireIdx: si, exerciceIdx: exIdx }
            );
            continue;
          }
          const exTitle = nbExContent ? evalData?.exercices?.[exIdx % nbExContent]?.titre : undefined;
          const isQcm = exTitle ? (/^QCM\b/i.test(exTitle) || isIAForm) : (exIdx % 2 === 0);
          const prefix = isQcm ? `QCM ${exIdx + 1}` : `EXERCICE ${exIdx + 1}`;
          add(
            `af_c3i11_exercices_${fi}_${si}_ex${exIdx}`,
            `CT3 - IND 11 ${prefix} - ${unites[exIdx]?.label || `Jour ${exIdx + 1}`} – ${s.prenom} ${s.nom}`,
            3,
            11,
            "exercices_stagiaire",
            { fi, stagiaireIdx: si, exerciceIdx: exIdx }
          );
        }


        // EXAMEN FINAL — 1 vrai examen de synthèse daté de la fin de formation
        if (nbExContent > 0 || (evalData?.qcmFinal?.length || 0) > 0) {
          add(
            `af_c3i11_examen_final_${fi}_${si}`,
            `CT3 - IND 11 EXAMEN FINAL – ${s.prenom} ${s.nom}`,
            3,
            11,
            "examen_final_stagiaire",
            { fi, stagiaireIdx: si }
          );
        }



        add(`af_c3i11_grille_acquisition_${fi}_${si}`, `CT3 - IND 11 GRILLE D'ACQUISITION – ${s.prenom} ${s.nom}`, 3, 11, "grille_acquisition_stagiaire", { fi, stagiaireIdx: si });
        add(`af_c3i11_attestation_${fi}_${si}`, `CT3 - IND 11 ATTESTATION DE RÉUSSITE – ${s.prenom} ${s.nom}`, 3, 11, "attestation_reussite_stagiaire", { fi, stagiaireIdx: si });
        add(`af_c3i11_certificat_realisation_${fi}_${si}`, `CT3 - IND 11 CERTIFICAT DE RÉALISATION – ${s.prenom} ${s.nom}`, 3, 11, "certificat_realisation_stagiaire", { fi, stagiaireIdx: si });
      });
    });

    // IND 12 — Gestion d'abandon (AF)
    add("af_c3i12_procedure_abandon", "CT3 - IND 12 PROCÉDURE DE GESTION D'ABANDON", 3, 12, "procedure_abandon");
    add("af_c3i12_prevention_gestion_abandons", "CT3 - IND 12 PRÉVENTION ET GESTION DES ABANDONS", 3, 12, "prevention_gestion_abandons_cfa");
    add("af_c3i12_guide_entretien_abandons", "CT3 - IND 12 GUIDE D'ENTRETIEN DES ABANDONS", 3, 12, "guide_entretien_abandons_cfa");
    add("af_c3i12_mesures_engagement", "CT3 - IND 12 MESURES POUR FAVORISER L'ENGAGEMENT DES BÉNÉFICIAIRES", 3, 12, "mesures_engagement_beneficiaires_cfa");

    // IND 16 — Présentation des bénéficiaires à la certification (si formation avec code RS/RNCP)
    formations.forEach((f, fi) => {
      if (isCodeRsrncp(f.codeRNCP)) {
        add(`af_c3i16_procedure_certification_${fi}`, `CT3 - IND 16 PROCÉDURE DE PRÉSENTATION À LA CERTIFICATION`, 3, 16, "procedure_presentation_certification", { fi });
        stagiaires.forEach((s, si) => {
          add(`af_c3i16_convocation_certification_${fi}_${si}`, `CT3 - IND 16 CONVOCATION AUX ÉPREUVES DE CERTIFICATION – ${s.prenom} ${s.nom}`, 3, 16, "convocation_certification", { fi, stagiaireIdx: si });
        });
        stagiaires.forEach((s, si) => {
          add(`af_c3i16_pv_examen_${fi}_${si}`, `CT3 - IND 16 PROCÈS-VERBAL D'EXAMEN – ${s.prenom} ${s.nom}`, 3, 16, "pv_examen_certification", { fi, stagiaireIdx: si });
        });
        stagiaires.forEach((s, si) => {
          add(`af_c3i16_attestation_presentation_${fi}_${si}`, `CT3 - IND 16 ATTESTATION DE PRÉSENTATION À LA CERTIFICATION – ${s.prenom} ${s.nom}`, 3, 16, "attestation_presentation_certification", { fi, stagiaireIdx: si });
        });
        stagiaires.forEach((s, si) => {
          add(`af_c3i16_attestation_reussite_${fi}_${si}`, `CT3 - IND 16 ATTESTATION DE RÉUSSITE – ${s.prenom} ${s.nom}`, 3, 16, "attestation_reussite_stagiaire", { fi, stagiaireIdx: si });
        });
      }
    });

    // ===== CRITÈRE 4 — ADÉQUATION DES MOYENS =====

    // IND 17 — Moyens humains, techniques et environnement
    const afModaLower = (formations[0]?.modalites || '').toLowerCase();
    const afIsPureDistanciel = afModaLower.includes('distanciel') && !afModaLower.includes('mixte') && !afModaLower.includes('présentiel') && !afModaLower.includes('presentiel');
    if (!afIsPureDistanciel) {
      add("af_c4i17_bail", "CT4 - IND 17 BAIL DE SOUS-LOCATION", 4, 17, "bail_sous_location");
    }
    add("af_c4i17_facture_pack_office", "CT4 - IND 17 FACTURE PACK OFFICE", 4, 17, "facture_pack_office_docx");
    add("af_c4i17_facture_google", "CT4 - IND 17 FACTURE GOOGLE WORKSPACE", 4, 17, "facture_google_workspace_docx");
    add("af_c4i17_facture_make", "CT4 - IND 17 FACTURE MAKE", 4, 17, "facture_make_docx");
    add("af_c4i17_facture_genspark", "CT4 - IND 17 FACTURE GENSPARK", 4, 17, "facture_genspark_docx");
    add("af_c4i17_certificat_coursera", "CT4 - IND 17 CERTIFICAT COURSERA / UCI", 4, 17, "certificat_coursera");
    // IND 18 — Coordination des intervenants
    add("af_c4i18_organigramme", "CT4 - IND 18 ORGANIGRAMME", 4, 18, "organigramme");

    // IND 19 — Ressources pédagogiques mises à disposition
    formations.forEach((f, fi) => {
      add(`af_c4i19_support_cours_${fi}`, `CT4 - IND 19 SUPPORT DE COURS`, 4, 19, "support_cours_ref", { fi });
    });
    add("af_c4i19_ressources_pedagogiques", "CT4 - IND 19 RESSOURCES PÉDAGOGIQUES", 4, 19, "ressources_pedagogiques");

    // ===== CRITÈRE 5 — QUALIFICATION DU PERSONNEL =====

    // --- Per-formateur docs: extract unique formateur names from stagiaires ---
    const uniqueFormateurs = Array.from(new Set(stagiaires.map(s => (s as any).formateur).filter((f: any) => f && String(f).trim())));

    // IND 21 — Compétences des intervenants
    add("af_c5i21_fiche_poste_dirigeant", "CT5 - IND 21 FICHE DE POSTE – RESPONSABLE PÉDAGOGIQUE", 5, 21, "fiche_poste_formateur", { role: "dirigeant" });
    // Fiche de poste formateur générique (si aucun formateur assigné)
    if (uniqueFormateurs.length === 0) {
      add("af_c5i21_fiche_poste_formateur", "CT5 - IND 21 FICHE DE POSTE – FORMATEUR", 5, 21, "fiche_poste_formateur", { role: "formateur" });
    }
    add("af_c5i21_fiche_poste_ref_admin", "CT5 - IND 21 FICHE DE POSTE – RÉFÉRENT ADMINISTRATIF", 5, 21, "fiche_poste_formateur", { role: "referent_administratif" });
    add("af_c5i21_fiche_poste_ref_handicap", "CT5 - IND 21 FICHE DE POSTE – RÉFÉRENT HANDICAP", 5, 21, "fiche_poste_formateur", { role: "referent_handicap" });
    add("af_c5i21_fiche_poste_ref_qualite_externe", "CT5 - IND 21 FICHE DE POSTE – RÉFÉRENT QUALITÉ EXTERNE (Nadine DENDANI)", 5, 21, "fiche_poste_formateur", { role: "referent_qualite_externe" });
    // Une seule auto-évaluation pour le formateur de la formation
    add("af_c5i21_autoevaluation_0", `CT5 - IND 21 AUTO-ÉVALUATION FORMATEUR`, 5, 21, "autoevaluation_formateur", { formateurIdx: 0 });
    add("af_c5i21_processus_recrutement", "CT5 - IND 21 DESCRIPTION DU PROCESSUS DE RECRUTEMENT", 5, 21, "procedure_recrutement_formateur");

    // IND 22 — Entretien et développement des compétences
    add("af_c5i22_plan_dev_competences", "CT5 - IND 22 PLAN DE DÉVELOPPEMENT DES COMPÉTENCES", 5, 22, "plan_dev_competences_excel");
    
    add("af_c5i22_attestation_fin_formation", "CT5 - IND 22 ATTESTATION DE FIN DE FORMATION\u00a0", 5, 22, "attestation_fin_formation");
    add("af_c5i22_fiche_entretien_annuel", "CT5 - IND 22 FICHE D'ENTRETIEN ANNUEL FORMATEUR", 5, 22, "fiche_entretien_annuel_formateur");


    uniqueFormateurs.forEach((fName) => {
      const fname = String(fName).trim();
      const slug = fname.replace(/\s+/g, '_').toUpperCase();
      // Fiche d'entretien annuel per formateur
      add(`af_c5i22_fiche_entretien_${slug}`, `CT5 - IND 22 FICHE D'ENTRETIEN ANNUEL – ${fname}`, 5, 22, "fiche_entretien_annuel_formateur", { formateurNom: fname });
      // Fiche de poste per formateur
      add(`af_c5i21_fiche_poste_formateur_${slug}`, `CT5 - IND 21 FICHE DE POSTE – ${fname}`, 5, 21, "fiche_poste_formateur", { role: "formateur", formateurNom: fname });
      // Auto-évaluation per formateur
      add(`af_c5i21_autoevaluation_${slug}`, `CT5 - IND 21 AUTO-ÉVALUATION – ${fname}`, 5, 21, "autoevaluation_formateur", { formateurNom: fname });
      // Contrat de sous-traitance per formateur
      add(`af_c6i27_contrat_soustraitance_${slug}`, `CT6 - IND 27 CONTRAT DE SOUS-TRAITANCE – ${fname}`, 6, 27, "contrat_sous_traitance_v2", { formateurNom: fname });
    });

    // ===== CRITÈRE 6 — ENVIRONNEMENT PROFESSIONNEL =====

    // IND 23 — Veille légale et réglementaire
    add("af_c6i23_veille_reglementaire", "CT6 - IND 23 VEILLE RÉGLEMENTAIRE", 6, 23, "tableau_veille", { type: "réglementaire" });
    add("af_c6i23_pdf_guide_qualiopi", "CT6 - IND 23 V9 GUIDE DE LECTURE QUALIOPI", 6, 23, "pdf_static", { pdfFile: "v9_guide_lecture_qualiopi.pdf" });
    add("af_c6i23_screenshot_france_competences", "CT6 - IND 23 INSCRIPTION NEWSLETTER FRANCE COMPÉTENCES", 6, 23, "screenshot_france_competences");
    add("af_c6i23_screenshot_drieets", "CT6 - IND 23 INSCRIPTION NEWSLETTER DRIEETS", 6, 23, "screenshot_drieets");
    add("af_c6i23_screenshot_centre_inffo", "CT6 - IND 23 INSCRIPTION NEWSLETTER CENTRE INFFO", 6, 23, "screenshot_centre_inffo");
    add("af_c6i23_preuves_veille", "CT6 - IND 23 PREUVES DE VEILLE RÉGLEMENTAIRE", 6, 23, "preuves_veille_reglementaire");

    // IND 24 — Veille métiers et emplois
    add("af_c6i24_tableau_veille_metier", "CT6 - IND 24 TABLEAU DE VEILLE MÉTIER", 6, 24, "tableau_veille", { type: "métier" });

    // IND 25 — Veille innovations pédagogiques et technologiques
    add("af_c6i25_tableau_veille_techno", "CT6 - IND 25 TABLEAU DE VEILLE TECHNOLOGIQUE", 6, 25, "tableau_veille", { type: "technologique" });
    if (formations.some(f => /excel|word|powerpoint/i.test(f.intitule || ''))) {
      add("af_c6i25_screenshot_microsoft", "CT6 - IND 25 INSCRIPTION NEWSLETTER MICROSOFT ADVERTISING", 6, 25, "screenshot_microsoft");
    }
    add("af_c6i25_screenshot_openai", "CT6 - IND 25 INSCRIPTION NEWSLETTER OPEN AI DIGEST", 6, 25, "screenshot_openai");

    // IND 26 — Accueil et accompagnement handicap
    add("af_c6i26_veille_handicap", "CT6 - IND 26 VEILLE HANDICAP", 6, 26, "tableau_veille", { type: "handicap" });
    add("af_c6i26_screenshot_agefiph", "CT6 - IND 26 INSCRIPTION NEWSLETTER AGEFIPH", 6, 26, "screenshot_agefiph");
    // PDFs statiques IND 26
    add("af_c6i26_pdf_referentiel_defi", "CT6 - IND 26 RÉFÉRENTIEL HANDICAP DÉFI MÉTIER", 6, 26, "pdf_static", { pdfFile: "referentiel_handicap_defi_metier.pdf" });
    add("af_c6i26_pdf_agefiph_fiche", "CT6 - IND 26 AGEFIPH FICHE PRATIQUE QUALITÉ", 6, 26, "pdf_static", { pdfFile: "agefiph_fiche_pratique_qualite.pdf" });
    add("af_c6i26_pdf_agefiph_contacts", "CT6 - IND 26 AGEFIPH RHF CONTACTS", 6, 26, "pdf_static", { pdfFile: "agefiph_rhf_contacts.pdf" });
    add("af_c6i26_pdf_diplome_rhf", "CT6 - IND 26 DIPLÔME RÉFÉRENT HANDICAP", 6, 26, "diplome_referent_handicap_docx");
    add("af_c6i26_pdf_fiche_rhf_idf", "CT6 - IND 26 FICHE TECHNIQUE RHF IDF", 6, 26, "pdf_static", { pdfFile: "fiche_technique_rhf_idf.pdf" });
    add("af_c6i26_pdf_recruter_handicap", "CT6 - IND 26 COMMENT RECRUTER UNE PERSONNE HANDICAPÉE", 6, 26, "pdf_static", { pdfFile: "handicap_comment_recruter.pdf" });
    add("af_c6i26_pdf_procedure_communiquer", "CT6 - IND 26 PROCÉDURE COMMUNIQUER AVEC DES PERSONNES HANDICAPÉES", 6, 26, "pdf_static", { pdfFile: "procedure_communiquer_handicap.pptx" });

    // IND 27 — Sous-traitance et partenariats
    add("af_c6i27_partenaires", "CT6 - IND 27 LES PARTENAIRES", 6, 27, "liste_partenaires");
    if (hasExternalFormateur) add("af_c6i27_contrat_sous_traitance", "CT6 - IND 27 CONTRAT DE SOUS-TRAITANCE DE FORMATEUR", 6, 27, "contrat_sous_traitance_v2");
    add("af_c6i27_charte_qualite_formateur", "CT6 - IND 27 CHARTE QUALITÉ FORMATEUR EXTERNE", 6, 27, "charte_qualite_formateur_externe");
    add("af_c6i27_mandat_qualiopi", "CT6 - IND 27 MANDAT DE PRÉSENTATION ET DE GESTION QUALIOPI", 6, 27, "mandat_qualiopi");
    add("af_c6i27_pdf_guide_qualiopi", "CT6 - IND 27 V9 GUIDE DE LECTURE QUALIOPI", 6, 27, "pdf_static", { pdfFile: "v9_guide_lecture_qualiopi.pdf" });
    // Checklist formateur — un fichier par session (groupé par dates)
    {
      const f0 = formations[0];
      const sessionsMapCk = new Map<string, { debut: string; fin: string }>();
      stagiaires.forEach(s => {
        const debut = s.dateDebutFormation || f0?.dateDebut || "";
        const fin = s.dateFinFormation || f0?.dateFin || "";
        const key = `${debut}|${fin}`;
        if (!sessionsMapCk.has(key)) sessionsMapCk.set(key, { debut, fin });
      });
      if (sessionsMapCk.size === 0) {
        sessionsMapCk.set("default", { debut: f0?.dateDebut || "", fin: f0?.dateFin || "" });
      }
      const fmtShortCk = (d: string) => d ? d.split("-").reverse().join("/") : "";
      Array.from(sessionsMapCk.values()).forEach((sess, idx) => {
        const label = sess.debut && sess.fin ? `Session ${fmtShortCk(sess.debut)} – ${fmtShortCk(sess.fin)}` : `Session ${idx + 1}`;
        if (hasExternalFormateur) add(`af_c6i27_checklist_formateur_s${idx}`, `CT6 - IND 27 CHECKLIST FORMATEUR – ${label}`, 6, 27, "checklist_formateur", { sessionDebut: sess.debut, sessionFin: sess.fin });
      });
    }

    // ===== CRITÈRE 7 — AMÉLIORATION CONTINUE =====

    // IND 30 — Appréciations et amélioration continue
    // Évaluation formateur — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      add(`af_c7i30_eval_formateur_${si}`, `CT7 - IND 30 ÉVALUATION FORMATEUR – ${s.prenom} ${s.nom}`, 7, 30, "enquete_satisfaction_formateur", { stagiaireIdx: si });
    });
    // Auto-évaluation formateur — un fichier par session (groupé par dates)
    {
      const f0 = formations[0];
      const sessionsMap = new Map<string, { debut: string; fin: string }>();
      stagiaires.forEach(s => {
        const debut = s.dateDebutFormation || f0?.dateDebut || "";
        const fin = s.dateFinFormation || f0?.dateFin || "";
        const key = `${debut}|${fin}`;
        if (!sessionsMap.has(key)) sessionsMap.set(key, { debut, fin });
      });
      if (sessionsMap.size === 0) {
        sessionsMap.set("default", { debut: f0?.dateDebut || "", fin: f0?.dateFin || "" });
      }
      const fmtShort = (d: string) => d ? d.split("-").reverse().join("/") : "";
      const _now = new Date();
      Array.from(sessionsMap.values()).forEach((sess, idx) => {
        const label = sess.debut && sess.fin ? `Session ${fmtShort(sess.debut)} – ${fmtShort(sess.fin)}` : `Session ${idx + 1}`;
        const finPassee = sess.fin ? new Date(sess.fin) < _now : false;
        if (finPassee) add(`af_c7i30_autoevaluation_formateur_s${idx}`, `CT7 - IND 30 AUTO-ÉVALUATION FORMATEUR – ${label}`, 7, 30, "autoevaluation_formateur", { sessionDebut: sess.debut, sessionFin: sess.fin });
      });
    }
    // Bilan à chaud — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      add(`af_c7i30_bilan_chaud_${si}`, `CT7 - IND 30 BILAN À CHAUD – ${s.prenom} ${s.nom}`, 7, 30, "bilan_chaud_stagiaire", { stagiaireIdx: si });
    });
    // Bilan à froid — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      add(`af_c7i30_bilan_froid_${si}`, `CT7 - IND 30 BILAN À FROID – ${s.prenom} ${s.nom}`, 7, 30, "bilan_froid_stagiaire", { stagiaireIdx: si });
    });
    add("af_c7i30_compte_rendu_formateur", "CT7 - IND 30 COMPTE-RENDU DE FORMATION", 7, 30, "compte_rendu_formateur");
    // Bilan de fin de formation formateur — per formateur
    uniqueFormateurs.forEach((fName) => {
      const fname = String(fName).trim();
      const slug = fname.replace(/\s+/g, '_').toUpperCase();
      add(`af_c7i30_bilan_fin_formateur_${slug}`, `CT7 - IND 30 BILAN DE FIN DE FORMATION – ${fname}`, 7, 30, "bilan_fin_formation_formateur", { formateurNom: fname });
    });
    // Questionnaire satisfaction bénéficiaire — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      add(`af_c7i30_appreciations_beneficiaires_${si}`, `CT7 - IND 30 QUESTIONNAIRE DE SATISFACTION – ${s.prenom} ${s.nom}`, 7, 30, "appreciations_beneficiaires_stagiaire", { stagiaireIdx: si });
    });
    add("af_c7i30_appreciations_entreprises", "CT7 - IND 30 QUESTIONNAIRE DE SATISFACTION CLIENT COMMANDITAIRE", 7, 30, "appreciations_entreprises");
    add("af_c7i30_appreciations_financeurs", "CT7 - IND 30 ENQUÊTE SATISFACTION FINANCEUR", 7, 30, "appreciations_financeurs");
    

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
    // Pièces régionales (Île-de-France) seulement pour un CFA francilien.
    const isIDF = /^(75|77|78|91|92|93|94|95)/.test((orgCodePostal || "").replace(/\s/g, ""));
    const isNTCFormation = formations.some(f => (f.codeRNCP || "").toUpperCase() === "RNCP39063" || /n[ée]gociateur technico/i.test(f.intitule || ""));
    // Titre professionnel (ministère du Travail) : seuls concernés par le DP et le livret ECF.
    const isTitrePro = formations.some(f => /^\s*TP\b|titre professionnel/i.test(f.intitule || "") || /minist[èe]re du travail/i.test(getRNCPByCode(f.codeRNCP || "")?.certificateur || ""));
    const todayCFA = new Date(); todayCFA.setHours(0, 0, 0, 0);
    const apprentiTermine = (s: StagiaireInfo, f: FormationInfo) => {
      const fin = (s.dateFinFormation || f.dateFin || "").trim();
      const m = fin.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      const d = m ? new Date(+m[3], +m[2] - 1, +m[1]) : new Date(fin + "T00:00:00");
      return !isNaN(d.getTime()) && d.getTime() < todayCFA.getTime();
    };

    // ===== CRITÈRE 1 — INFORMATION DU PUBLIC (CFA) =====

    // IND 1 — Programme et informations
    add("cfa_c1i1_programme", "CT1 - IND 1 PROGRAMME DE FORMATION CFA", 1, 1, "programme_formation", { fi: 0, isCFA: true });
    add("cfa_c1i1_plaquette_commerciale", "CT1 - IND 1 PLAQUETTE COMMERCIALE CFA", 1, 1, "plaquette_commerciale_cfa");
    add("cfa_c1i1_procedure_inscription", "CT1 - IND 1 PROCÉDURE D'INSCRIPTION CFA", 1, 1, "procedure_inscription_cfa");
    add("cfa_c1i1_procedure_formation", "CT1 - IND 1 PROCÉDURE DE FORMATION CFA", 1, 1, "procedure_formation_cfa");
    add("cfa_c1i1_cgv", "CT1 - IND 1 CONDITIONS GÉNÉRALES DE VENTE CFA", 1, 1, "cgv_cfa", { genericStagiaire: true, stagiaireIdx: 0 });

    // IND 2 — Indicateurs de résultats CFA
    add("cfa_c1i2_indicateurs_resultats", "CT1 - IND 2 INDICATEURS DE RÉSULTATS CFA", 1, 2, "indicateurs_resultats_cfa");

    // IND 3 — Taux d'obtention, certification RNCP
    add("cfa_c1i3_titre_rncp", "CT1 - IND 3 FICHE TITRE RNCP", 1, 3, "titre_rncp_cfa");
    add("cfa_c1i3_matiere_titre", "CT1 - IND 3 MATIÈRE DU TITRE", 1, 3, "matiere_titre_cfa");
    add("cfa_c1i3_tableau_croise", "CT1 - IND 3 TABLEAU CROISÉ COMPÉTENCES PROGRAMME", 1, 3, "tableau_croise_cfa");
    if (formations.some(f => isCodeRsrncp(f.codeRNCP))) {
      add("cfa_c1i3_taux_obtention", "CT1 - IND 3 TAUX D'OBTENTION DE LA CERTIFICATION", 1, 3, "taux_obtention_certification", { fi: 0 });
    }

    // ===== CRITÈRE 2 — OBJECTIFS ET ADAPTATION (CFA) =====

    // IND 4 — Analyse du besoin du bénéficiaire (CFA)
    add("cfa_c2i4_grille_entretien", "CT2 - IND 4 GRILLE D'ENTRETIEN INDIVIDUEL – CANDIDAT", 2, 4, "grille_entretien_candidat_cfa");
    add("cfa_c2i4_procedure_eval_besoins", "CT2 - IND 4 PROCÉDURE D'ÉVALUATION DES BESOINS", 2, 4, "procedure_eval_besoins");
    add("cfa_c2i4_fiche_eval_psh", "CT2 - IND 4 FICHE D'ÉVALUATION DES BESOINS – PERSONNE EN SITUATION DE HANDICAP", 2, 4, "fiche_eval_besoins_psh");
    add("cfa_c2i4_procedure_missions", "CT2 - IND 4 PROCÉDURE VÉRIFICATION MISSIONS ENTREPRISE ET CERTIFICATION", 2, 4, "procedure_missions_entreprise_cfa");
    stagiaires.forEach((s, si) => {
      add(`cfa_c2i4_attestation_inscription_${si}`, `CT2 - IND 4 ATTESTATION D'INSCRIPTION – ${s.prenom} ${s.nom}`, 2, 4, "attestation_inscription_cfa", { stagiaireIdx: si });
      add(`cfa_c2i4_fiche_renseignement_${si}`, `CT2 - IND 4 FICHE DE RENSEIGNEMENT – ${s.prenom} ${s.nom}`, 2, 4, "fiche_renseignement_cfa", { stagiaireIdx: si });
      add(`cfa_c2i4_trame_eval_besoins_apprenant_${si}`, `CT2 - IND 4 TRAME ÉVALUATION DES BESOINS – APPRENANT – ${s.prenom} ${s.nom}`, 2, 4, "trame_eval_besoins_stagiaire", { stagiaireIdx: si, isCFA: true });
      add(`cfa_c2i4_trame_eval_besoins_entreprise_${si}`, `CT2 - IND 4 TRAME ÉVALUATION DES BESOINS – ENTREPRISE – ${s.prenom} ${s.nom}`, 2, 4, "trame_eval_besoins_entreprise", { stagiaireIdx: si });
      add(`cfa_c2i4_dossier_candidature_${si}`, `CT2 - IND 4 DOSSIER DE CANDIDATURE – ${s.prenom} ${s.nom}`, 2, 4, "dossier_candidature_cfa", { stagiaireIdx: si });
    });
    add("cfa_c2i4_mail_type_candidat", "CT2 - IND 4 MAIL TYPES CANDIDAT (Renseignement, Dossier, Relance)", 2, 4, "mail_type_candidat_cfa");
    add("cfa_c2i4_suivi_parcours_beneficiaires", "CT2 - IND 4 TABLEAU DE SUIVI DU PARCOURS DES BÉNÉFICIAIRES ET ADAPTATIONS (Excel)", 2, 4, "suivi_parcours_beneficiaires_excel");

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

    // IND 6 — Contenus et modalités adaptés (CFA)
    add("cfa_c2i6_support_cours", "CT2 - IND 6 SUPPORT DE COURS CFA", 2, 6, "support_cours_cfa");
    add("cfa_c2i6_calendrier_annuel", "CT2 - IND 6 CALENDRIER ANNUEL CFA", 2, 6, "calendrier_annuel_cfa");
    add("cfa_c2i6_decoupage_formation", "CT2 - IND 6 DÉCOUPAGE DE FORMATION CFA (Excel)", 2, 6, "decoupage_formation_cfa_excel");

    // IND 7 — Adéquation contenus / exigences certification (CFA)
    const hasRsrncpCFA = formations.some(f => isCodeRsrncp(f.codeRNCP));
    if (hasRsrncpCFA) {
      add("cfa_c2i7_fiche_certification", "CT2 - IND 7 FICHE CERTIFICATION RS/RNCP", 2, 7, "fiche_certification_rs");
      add("cfa_c2i7_tableau_croise", "CT2 - IND 7 TABLEAU CROISÉ", 2, 7, "tableau_croise_cfa");
      add("cfa_c2i7_matrice_competences", "CT2 - IND 7 MATRICE DE COMPÉTENCES (Excel)", 2, 7, "matrice_competences_excel");
      add("cfa_c2i7_suivi_chiffre", "CT2 - IND 7 SUIVI CHIFFRÉ DE LA FORMATION (Excel)", 2, 7, "suivi_chiffre_formation_excel");
    }

    // (IND 13/14/15 moved to after IND 12 block below)

    // Indicateur 16 - Présentation certification
    formations.forEach((f, fi) => {
      stagiaires.forEach((s, si) => {
        if (isCodeRsrncp(f.codeRNCP) && apprentiTermine(s, f)) {
          add(`cfa_c3i16_attestation_reussite_${fi}_${si}`, `CT3 - IND 16 ATTESTATION DE RÉUSSITE – ${s.prenom} ${s.nom}`, 3, 16, "attestation_reussite_stagiaire", { fi, stagiaireIdx: si });
        }
      });
    });

    // ===== CRITÈRE 3 — IND 9 — CONDITIONS DE DÉROULEMENT (CFA) =====
    stagiaires.forEach((s, si) => {
      add(`cfa_c3i9_livret_accueil_${si}`, `CT3 - IND 9 LIVRET D'ACCUEIL DE L'APPRENTI – ${s.prenom} ${s.nom}`, 3, 9, "livret_accueil_cfa_v2", { stagiaireIdx: si });
    });
    stagiaires.forEach((s, si) => {
      add(`cfa_c3i9_reglement_interieur_${si}`, `CT3 - IND 9 RÈGLEMENT INTÉRIEUR DU CFA – ${s.prenom} ${s.nom}`, 3, 9, "reglement_interieur_cfa_v2", { stagiaireIdx: si });
    });
    add("cfa_c3i9_pv_election_delegues", "CT3 - IND 9 PROCÈS-VERBAL D'ÉLECTION DES DÉLÉGUÉS", 3, 9, "pv_election_delegues_cfa");
    add("cfa_c3i9_pdf_guide_numerique_psh", "CT3 - IND 9 GUIDE NUMÉRIQUE PSH", 3, 9, "pdf_static", { pdfFile: "CT3_IND9_GUIDE_NUMERIQUE_PSH.pdf" });
    add("cfa_c3i9_pdf_droit_apprentis", "CT3 - IND 9 DROIT DES APPRENTIS", 3, 9, "pdf_static", { pdfFile: "CT3_IND9_DROIT_DES_APPRENTIS.pdf" });
    add("cfa_c3i9_suivi_inscriptions_excel", "CT3 - IND 9 SUIVI DES INSCRIPTIONS (Excel)", 3, 9, "suivi_inscriptions_excel");
    // Convocation à la formation CFA — un par stagiaire
    stagiaires.forEach((s, si) => {
      add(`cfa_c3i9_convocation_${si}`, `CT3 - IND 9 CONVOCATION À LA FORMATION – ${s.prenom} ${s.nom}`, 3, 9, "convocation_cfa", { stagiaireIdx: si });
    });
    // CGV CFA — un par stagiaire
    stagiaires.forEach((s, si) => {
      add(`cfa_c3i9_cgv_${si}`, `CT3 - IND 9 CONDITIONS GÉNÉRALES DE VENTE (CGV) – ${s.prenom} ${s.nom}`, 3, 9, "cgv_cfa", { stagiaireIdx: si });
    });
    // Procédure d'accueil et d'adaptation pédagogique
    add("cfa_c3i9_procedure_accueil_adaptation", "CT3 - IND 9 PROCÉDURE D'ACCUEIL ET D'ADAPTATION PÉDAGOGIQUE", 3, 9, "procedure_accueil_adaptation_cfa");
    // Droit à l'image — un par stagiaire
    stagiaires.forEach((s, si) => {
      add(`cfa_c3i9_droit_image_${si}`, `CT3 - IND 9 DEMANDE D'AUTORISATION DROIT À L'IMAGE – ${s.prenom} ${s.nom}`, 3, 9, "droit_image_cfa", { stagiaireIdx: si });
    });
    // CERFA 10103*14 — Contrat d'apprentissage rempli (un par stagiaire)
    stagiaires.forEach((s, si) => {
      add(`cfa_c3i9_cerfa_${si}`, `CT3 - IND 9 CERFA 10103*14 CONTRAT D'APPRENTISSAGE – ${s.prenom} ${s.nom}`, 3, 9, "cerfa_apprentissage", { stagiaireIdx: si });
    });
    // Guide connexion uniquement si distanciel
    formations.forEach((f) => {
      const moda = (f.modalites || '').toLowerCase();
      const isDistanciel = moda.includes('distanciel') || moda.includes('e-learning') || moda.includes('foad') || moda.includes('mixte');
      if (isDistanciel) {
        add("cfa_c3i9_guide_connexion", "CT3 - IND 9 GUIDE D'AIDE À LA CONNEXION", 3, 9, "guide_aide_connexion_cfa");
      }
    });
    // ===== IND 10 — Adaptation de la prestation et accompagnement (CFA) =====
    add("cfa_c3i10_procedure_abandon_reorientation", "CT3 - IND 10 PROCÉDURE EN CAS D'ABANDON OU RÉORIENTATION", 3, 10, "procedure_abandon_reorientation_cfa");
    // Accompagnement distanciel uniquement si la modalité inclut du distanciel
    {
      const moda = (formations[0]?.modalites || '').toLowerCase();
      const hasDistComp = moda.includes('distanciel') || moda.includes('e-learning') || moda.includes('foad') || moda.includes('mixte');
      if (hasDistComp) {
        add("cfa_c3i10_accompagnement_distanciel", "CT3 - IND 10 ACCOMPAGNEMENT DISTANCIEL", 3, 10, "accompagnement_distanciel_cfa");
      }
    }
    stagiaires.forEach((s, si) => {
      add(`cfa_c3i10_enquete_partenaire_${si}`, `CT3 - IND 10 FICHE DE SUIVI APPRENTI – ${s.prenom} ${s.nom}`, 3, 10, "enquete_partenaire_employeur_cfa", { stagiaireIdx: si });
    });
    add("cfa_c3i10_fiche_renseignements_commanditaire", "CT3 - IND 10 FICHE DE RENSEIGNEMENT COMMANDITAIRE", 3, 10, "fiche_renseignements_commanditaire_cfa");
    add("cfa_c3i10_contrat_apprentissage_mode_emploi", "CT3 - IND 10 CONTRAT D'APPRENTISSAGE – MODE D'EMPLOI", 3, 10, "contrat_apprentissage_mode_emploi_cfa");
    add("cfa_c3i10_procedure_accueil_beneficiaires", "CT3 - IND 10 PROCÉDURE D'ACCUEIL DES BÉNÉFICIAIRES", 3, 10, "procedure_accueil_beneficiaires_cfa");
    add("cfa_c3i10_procedure_adaptation_pedagogique", "CT3 - IND 10 PROCÉDURE D'ADAPTATION PÉDAGOGIQUE", 3, 10, "procedure_adaptation_pedagogique_cfa");
    add("cfa_c3i10_procedure_gestion_annulations", "CT3 - IND 10 PROCÉDURE DE GESTION DES ANNULATIONS", 3, 10, "procedure_gestion_annulations_cfa");
    add("cfa_c3i10_tableau_suivi_parcours_excel", "CT3 - IND 10 TABLEAU DE SUIVI DU PARCOURS BÉNÉFICIAIRES (Excel)", 3, 10, "tableau_suivi_parcours_beneficiaires_cfa_excel");
    add("cfa_c3i10_guide_parents_walt", "CT3 - IND 10 GUIDE PARENTS – WALT", 3, 10, "pdf_static", { pdfUrl: "/pdfs/guide_parents_walt.pdf" });
    add("cfa_c3i10_livret_accompagnez_alternants", "CT3 - IND 10 LIVRET ACCOMPAGNEZ VOS ALTERNANTS", 3, 10, "pdf_static", { pdfUrl: "/pdfs/livret_accompagnez_alternants.pdf" });
    add("cfa_c3i10_boostez_mobilite", "CT3 - IND 10 BOOSTEZ LA MOBILITÉ", 3, 10, "pdf_static", { pdfUrl: "/pdfs/boostez_mobilite.pdf" });
    add("cfa_c3i10_vademecum_controle_pedagogique", "CT3 - IND 10 VADEMECUM CONTRÔLE PÉDAGOGIQUE APPRENTISSAGE", 3, 10, "pdf_static", { pdfUrl: "/pdfs/vademecum_controle_pedagogique.pdf" });
    // --- IND 10 — Dossier Affichage ---
    add("cfa_c3i10_aff_convention_egalite_hf", "CT3 - IND 10 📁 AFFICHAGE – Convention Égalité Hommes Femmes", 3, 10, "pdf_static", { pdfUrl: "/pdfs/convention_egalite_hf.pdf" });
    add("cfa_c3i10_aff_declaration_droits_homme", "CT3 - IND 10 📁 AFFICHAGE – Déclaration des Droits de l'Homme", 3, 10, "pdf_static", { pdfUrl: "/pdfs/declaration_droits_homme.pdf" });
    add("cfa_c3i10_aff_lgbt_affiche", "CT3 - IND 10 📁 AFFICHAGE – Affiche LGBT", 3, 10, "pdf_static", { pdfUrl: "/pdfs/lgbt_affiche.pdf" });
    if (isIDF) add("cfa_c3i10_aff_aide_financiere_apprenti_idf", "CT3 - IND 10 📁 AFFICHAGE – Aide Financière Apprenti Île-de-France", 3, 10, "pdf_static", { pdfUrl: "/pdfs/aide_financiere_apprenti_idf.pdf" });
    add("cfa_c3i10_aff_racisme_antisemitisme", "CT3 - IND 10 📁 AFFICHAGE – Racisme et Antisémitisme", 3, 10, "pdf_static", { pdfUrl: "/pdfs/racisme_antisemitisme.pdf" });
    add("cfa_c3i10_aff_harcelement_reseaux_sociaux", "CT3 - IND 10 📁 AFFICHAGE – Harcèlement Réseaux Sociaux", 3, 10, "pdf_static", { pdfUrl: "/pdfs/harcelement_reseaux_sociaux.pdf" });
    add("cfa_c3i10_aff_harcelement_sur_site", "CT3 - IND 10 📁 AFFICHAGE – Affiche Non au Harcèlement", 3, 10, "pdf_static", { pdfUrl: "/pdfs/harcelement_sur_site.jpg" });
    add("cfa_c3i10_aff_charte_laicite", "CT3 - IND 10 📁 AFFICHAGE – Charte de la Laïcité", 3, 10, "pdf_static", { pdfUrl: "/pdfs/charte_laicite.pdf" });
    add("cfa_c3i10_aff_contacts_ressources_handicap", "CT3 - IND 10 📁 AFFICHAGE – Contacts Ressources Handicap Formation", 3, 10, "pdf_static", { pdfUrl: "/pdfs/contacts_ressources_handicap.pdf" });
    // --- IND 10 — Mission 5 : maintien en formation 6 mois (rupture de contrat) ---
    add("cfa_c3i10_mission5_rupture_contrat", "CT3 - IND 10 📁 14 MISSIONS / Mission 5 – Maintien en formation 6 mois (rupture de contrat)", 3, 10, "procedure_rupture_contrat_apprentissage_cfa", { folder: "14_MISSIONS_CFA/Mission_5_Rupture_Contrat" });
    add("cfa_c3i10_mission5_cas_rupture_pdf", "CT3 - IND 10 📁 14 MISSIONS / Mission 5 – Les cas de rupture du contrat d'apprentissage (PDF)", 3, 10, "cas_rupture_contrat_apprentissage_cfa", { folder: "14_MISSIONS_CFA/Mission_5_Rupture_Contrat" });
    // --- IND 10 — Mission 6 : aides sociales et matérielles aux apprentis ---
    if (isIDF) add("cfa_c3i10_mission6_aide_ara", "CT3 - IND 10 📁 14 MISSIONS / Mission 6 – Aide Régionale à l'Apprentissage (ARA)", 3, 10, "pdf_static", { pdfUrl: "/pdfs/aide_ara.png", folder: "14_MISSIONS_CFA/Mission_6_Accompagnement_Social_Materiel" });
    if (isIDF) add("cfa_c3i10_mission6_aide_equipement", "CT3 - IND 10 📁 14 MISSIONS / Mission 6 – Aide Régionale Équipement Individuel", 3, 10, "pdf_static", { pdfUrl: "/pdfs/aide_regionale_equipement.png", folder: "14_MISSIONS_CFA/Mission_6_Accompagnement_Social_Materiel" });
    add("cfa_c3i10_mission6_sante_psy", "CT3 - IND 10 📁 14 MISSIONS / Mission 6 – Santé Psy Étudiant", 3, 10, "pdf_static", { pdfUrl: "/pdfs/sante_psy_etudiant.png", folder: "14_MISSIONS_CFA/Mission_6_Accompagnement_Social_Materiel" });
    if (isIDF) add("cfa_c3i10_mission6_carte_imagine_r", "CT3 - IND 10 📁 14 MISSIONS / Mission 6 – Carte Imagine R Scolaire", 3, 10, "pdf_static", { pdfUrl: "/pdfs/carte_imagine_r.png", folder: "14_MISSIONS_CFA/Mission_6_Accompagnement_Social_Materiel" });
    // --- IND 10 — Dossier Livret d'Apprentissage et Maître d'Apprentissage ---
    add("cfa_c3i10_livret_maitre_apprentissage", "CT3 - IND 10 📁 LIVRETS – Livret du Maître d'Apprentissage", 3, 10, "livret_maitre_apprentissage_cfa");
    // --- IND 10 — Mission 1 : Orientation & Handicap ---
    add("cfa_c3i10_handicap_livret_referent", "CT3 - IND 10 📁 14 MISSIONS / Mission 1 – Livret Référent Handicap (orientation/réorientation)", 3, 10, "livret_referent_handicap_cfa", { folder: "14_MISSIONS_CFA/Mission_1_Orientation_Handicap" });
    add("cfa_c3i10_handicap_eval_besoins_agefiph", "CT3 - IND 10 📁 14 MISSIONS / Mission 1 – Évaluation Besoins Apprenants AGEFIPH (Excel)", 3, 10, "pdf_static", { pdfUrl: "/pdfs/evaluation_besoins_handicap_agefiph.xlsx", folder: "14_MISSIONS_CFA/Mission_1_Orientation_Handicap" });
    add("cfa_c3i10_handicap_types_moyens", "CT3 - IND 10 📁 14 MISSIONS / Mission 1 – Types de Handicap, Moyens et Partenaires (Excel)", 3, 10, "pdf_static", { pdfUrl: "/pdfs/handicap_types_moyens_partenaires.xlsx", folder: "14_MISSIONS_CFA/Mission_1_Orientation_Handicap" });

    // ===== 14 MISSIONS OFFICIELLES DU CFA (Art. L.6231-2) =====
    // Numérotation alignée sur le texte officiel ; chaque mission = 1 sous-dossier.

    // Chapeau — Procédure de communication & mise en œuvre des 14 missions
    add("cfa_14missions_procedure_communication", "CT3 - IND 10 📁 14 MISSIONS / 00 – Procédure Communication & Mise en œuvre des 14 missions", 3, 10, "procedure_communication_14_missions_cfa", { folder: "14_MISSIONS_CFA" });

    // Mission 2 — Appui à la recherche d'un employeur
    add("cfa_mission2_procedure_aide_employeur", "CT3 - IND 10 📁 14 MISSIONS / Mission 2 – Procédure d'aide à la recherche d'employeur", 3, 10, "procedure_aide_recherche_employeur_cfa", { folder: "14_MISSIONS_CFA/Mission_2_Recherche_Employeur" });
    add("cfa_mission2_tableau_candidats_sans_contrat", "CT3 - IND 10 📁 14 MISSIONS / Mission 2 – Tableau de suivi des candidats sans contrat", 3, 10, "tableau_suivi_candidats_sans_contrat_cfa", { folder: "14_MISSIONS_CFA/Mission_2_Recherche_Employeur" });

    // Mission 3 — Cohérence CFA / Entreprise
    add("cfa_mission3_cooperation_cfa_entreprise", "CT3 - IND 10 📁 14 MISSIONS / Mission 3 – Coopération CFA / Entreprise (Formateurs & MA)", 3, 10, "cooperation_cfa_entreprise_cfa", { folder: "14_MISSIONS_CFA/Mission_3_Coherence_CFA_Entreprise" });

    // Mission 4 — Droits, devoirs & santé-sécurité au travail
    add("cfa_mission4_droits_devoirs_sst", "CT3 - IND 10 📁 14 MISSIONS / Mission 4 – Information droits/devoirs & santé-sécurité au travail", 3, 10, "plan_activites_citoyennes_cfa", { folder: "14_MISSIONS_CFA/Mission_4_Droits_Devoirs_Sante_Securite" });

    // Mission 5 — déjà ajoutée plus haut (rupture / 6 mois)

    // Mission 7 — Mixité & égalité F/H (sensibilisation, harcèlement)
    add("cfa_mission7_plan_mixite_egalite", "CT3 - IND 10 📁 14 MISSIONS / Mission 7 – Plan d'actions Mixité & Égalité F/H", 3, 10, "plan_mixite_egalite_fh_cfa", { folder: "14_MISSIONS_CFA/Mission_7_Mixite_Egalite_FH" });

    // Mission 8 — Égalité professionnelle & mixité des métiers
    add("cfa_mission8_plan_mixite_metiers", "CT3 - IND 10 📁 14 MISSIONS / Mission 8 – Plan d'actions Mixité dans les métiers préparés", 3, 10, "plan_mixite_metiers_cfa", { folder: "14_MISSIONS_CFA/Mission_8_Egalite_Pro_Mixite_Metiers" });

    // Mission 9 — Diversité & lutte contre les discriminations
    add("cfa_mission9_plan_diversite", "CT3 - IND 10 📁 14 MISSIONS / Mission 9 – Plan diversité & lutte contre les discriminations", 3, 10, "plan_diversite_lutte_discriminations_cfa", { folder: "14_MISSIONS_CFA/Mission_9_Diversite_Discriminations" });

    // Mission 10 — Mobilité nationale des apprentis (dispositif inter-CFA en France)
    add("cfa_mission10_plan_mobilite_nationale", "CT3 - IND 10 📁 14 MISSIONS / Mission 10 – Plan de mobilité nationale des apprentis", 3, 10, "plan_mobilite_nationale_cfa", { folder: "14_MISSIONS_CFA/Mission_10_Mobilite_Nationale" });
    add("cfa_mission10_convention_inter_cfa", "CT3 - IND 10 📁 14 MISSIONS / Mission 10 – Convention de mise à disposition inter-CFA", 3, 10, "convention_mobilite_inter_cfa", { folder: "14_MISSIONS_CFA/Mission_10_Mobilite_Nationale" });
    add("cfa_mission10_fiche_demande_mobilite", "CT3 - IND 10 📁 14 MISSIONS / Mission 10 – Fiche de demande de mobilité nationale (apprenti)", 3, 10, "fiche_demande_mobilite_nationale", { folder: "14_MISSIONS_CFA/Mission_10_Mobilite_Nationale" });
    add("cfa_mission10_fiche_poste_referent_mobilite", "CT3 - IND 10 📁 14 MISSIONS / Mission 10 – Fiche de poste Référent Mobilité Nationale", 3, 10, "fiche_poste_referent_mobilite_nationale", { folder: "14_MISSIONS_CFA/Mission_10_Mobilite_Nationale" });

    // Mission 11 — Suivi & accompagnement de la formation à distance
    add("cfa_mission11_suivi_distance", "CT3 - IND 10 📁 14 MISSIONS / Mission 11 – Procédure de suivi & accompagnement à distance", 3, 10, "accompagnement_distanciel_cfa", { folder: "14_MISSIONS_CFA/Mission_11_Formation_Distance" });

    // Mission 12 — Évaluation des compétences acquises (contrôle continu)
    add("cfa_mission12_attestation_formation_ma", "CT3 - IND 10 📁 14 MISSIONS / Mission 12 – Attestation de formation du Maître d'Apprentissage (évaluation)", 3, 10, "attestation_formation_maitre_apprentissage_cfa", { folder: "14_MISSIONS_CFA/Mission_12_Evaluation_Competences" });

    // Mission 13 — Accompagnement post-formation (interruption / non-diplômés)
    add("cfa_mission13_accompagnement_post_formation", "CT3 - IND 10 📁 14 MISSIONS / Mission 13 – Procédure d'accompagnement post-formation", 3, 10, "procedure_accompagnement_post_formation_cfa", { folder: "14_MISSIONS_CFA/Mission_13_Accompagnement_Post_Formation" });
    

    // Mission 14 — Accès aux aides des apprentis
    add("cfa_mission14_acces_aides", "CT3 - IND 10 📁 14 MISSIONS / Mission 14 – Procédure d'accompagnement à l'accès aux aides", 3, 10, "procedure_accompagnement_educatif_social_cfa", { folder: "14_MISSIONS_CFA/Mission_14_Acces_Aides" });

    // ===== EXERCICES — QCM 10 questions par mission, par stagiaire (L.6231-2) =====
    const MISSIONS_FOLDERS: { num: number; folder: string; titre: string; critere: number; ind: number }[] = [
      { num: 1,  folder: "14_MISSIONS_CFA/Mission_1_Orientation_Handicap",               titre: "Mission 1 – Orientation & Handicap",                       critere: 3, ind: 10 },
      { num: 2,  folder: "14_MISSIONS_CFA/Mission_2_Recherche_Employeur",                titre: "Mission 2 – Recherche d'un employeur",                     critere: 3, ind: 10 },
      { num: 3,  folder: "14_MISSIONS_CFA/Mission_3_Coherence_CFA_Entreprise",           titre: "Mission 3 – Cohérence CFA / Entreprise",                   critere: 3, ind: 10 },
      { num: 4,  folder: "14_MISSIONS_CFA/Mission_4_Droits_Devoirs_Sante_Securite",      titre: "Mission 4 – Droits, devoirs & santé-sécurité",             critere: 3, ind: 10 },
      { num: 5,  folder: "14_MISSIONS_CFA/Mission_5_Rupture_Contrat",                    titre: "Mission 5 – Rupture de contrat (6 mois)",                  critere: 3, ind: 10 },
      { num: 6,  folder: "14_MISSIONS_CFA/Mission_6_Accompagnement_Social_Materiel",     titre: "Mission 6 – Accompagnement social & matériel",             critere: 3, ind: 10 },
      { num: 7,  folder: "14_MISSIONS_CFA/Mission_7_Mixite_Egalite_FH",                  titre: "Mission 7 – Mixité & Égalité F/H",                         critere: 3, ind: 10 },
      { num: 8,  folder: "14_MISSIONS_CFA/Mission_8_Egalite_Pro_Mixite_Metiers",         titre: "Mission 8 – Égalité pro & mixité des métiers",             critere: 3, ind: 10 },
      { num: 9,  folder: "14_MISSIONS_CFA/Mission_9_Diversite_Discriminations",          titre: "Mission 9 – Diversité & lutte contre les discriminations", critere: 3, ind: 10 },
      { num: 10, folder: "14_MISSIONS_CFA/Mission_10_Mobilite_Nationale",               titre: "Mission 10 – Mobilité nationale & internationale",         critere: 3, ind: 10 },
      { num: 11, folder: "14_MISSIONS_CFA/Mission_11_Formation_Distance",                titre: "Mission 11 – Suivi formation à distance",                  critere: 3, ind: 10 },
      { num: 12, folder: "14_MISSIONS_CFA/Mission_12_Evaluation_Competences",            titre: "Mission 12 – Évaluation des compétences",                  critere: 3, ind: 10 },
      { num: 13, folder: "14_MISSIONS_CFA/Mission_13_Accompagnement_Post_Formation",     titre: "Mission 13 – Accompagnement post-formation",               critere: 3, ind: 10 },
      { num: 14, folder: "14_MISSIONS_CFA/Mission_14_Acces_Aides",                       titre: "Mission 14 – Accès aux aides des apprentis",               critere: 3, ind: 10 },
    ];
    MISSIONS_FOLDERS.forEach((m) => {
      stagiaires.forEach((s, si) => {
        add(
          `cfa_qcm_mission${m.num}_${si}`,
          `CT${m.critere} - IND ${m.ind} 📁 14 MISSIONS / ${m.titre} – QCM Exercice – ${s.prenom} ${s.nom}`,
          m.critere,
          m.ind,
          "qcm_mission_cfa",
          { folder: m.folder, stagiaireIdx: si, missionNumero: m.num },
        );
      });
    });

    // Documents CFA complémentaires (autres critères)
    add("cfa_procedure_psh", "CT6 - IND 26 PROCÉDURE D'ACCUEIL DES PERSONNES EN SITUATION DE HANDICAP", 6, 26, "procedure_psh_cfa");
    // ===== IND 11 — Évaluation de l'atteinte des objectifs (CFA) =====
    // Émargement CFA / Temps de connexion selon modalité — UNE FEUILLE PAR APPRENTI
    formations.forEach((f, fi) => {
      const moda = (f.modalites || '').toLowerCase();
      const distanciel = moda.includes('distanciel') || moda.includes('e-learning') || moda.includes('foad');
      const mixte = moda.includes('mixte');
      stagiaires.forEach((s, si) => {
        if (distanciel && !mixte) {
          add(`cfa_c3i11_temps_connexion_${fi}_${si}`, `CT3 - IND 11 TEMPS DE CONNEXION RÉEL CFA – ${s.prenom} ${s.nom}`, 3, 11, "temps_connexion_reel", { fi, stagiaireIdx: si });
        } else {
          add(`cfa_c3i11_emargement_${fi}_${si}`, `CT3 - IND 11 FEUILLE D'ÉMARGEMENT CFA – ${s.prenom} ${s.nom}`, 3, 11, "emargement_cfa_stagiaire", { fi, stagiaireIdx: si });
          if (mixte) {
            add(`cfa_c3i11_temps_connexion_${fi}_${si}`, `CT3 - IND 11 TEMPS DE CONNEXION RÉEL CFA – ${s.prenom} ${s.nom}`, 3, 11, "temps_connexion_reel", { fi, stagiaireIdx: si });
          }
        }
      });
    });
    // Documents individuels per-stagiaire IND 11 CFA
    formations.forEach((f, fi) => {
      const rncp = getRNCPByCode(f.codeRNCP || '');
      stagiaires.forEach((s, si) => {
        // Test de fin (le test d'entrée figure en IND 8) — corrigé et barème inclus
        add(`cfa_c3i11_test_fin_${fi}_${si}`, `CT3 - IND 11 TEST DE FIN DE FORMATION – ${s.prenom} ${s.nom}`, 3, 11, "test_cfa_stagiaire", { fi, stagiaireIdx: si, phase: "fin" });

        // Exercices pratiques : 5 par matière par bloc RNCP
        if (rncp && rncp.blocsCompetences.length > 0) {
          let globalExIdx = 0;
          rncp.blocsCompetences.forEach((bloc, bi) => {
            bloc.matieres.forEach((mat, mi) => {
              for (let exNum = 0; exNum < 5; exNum++) {
                const blocLabel = `Bloc ${bi + 1}`;
                const matLabel = mat.competence.length > 40 ? mat.competence.substring(0, 40) + '…' : mat.competence;
                const label = ` (${blocLabel} – ${matLabel} – Ex. ${exNum + 1}/5)`;
                add(
                  `cfa_c3i11_exercices_${fi}_${si}_b${bi}_m${mi}_ex${exNum}`,
                  `CT3 - IND 11 EXERCICE PRATIQUE${label} – ${s.prenom} ${s.nom}`,
                  3, 11, "exercices_cfa_stagiaire",
                  { fi, stagiaireIdx: si, exerciceIdx: globalExIdx, blocIdx: bi, matiereIdx: mi, exInMatiere: exNum }
                );
                globalExIdx++;
              }
            });
          });
        } else {
          // Fallback : 2 exercices par semaine CFA
          const dur = parseDuree(f.duree);
          const totalCFAWeeks = Math.max(1, Math.ceil((dur.totalHours > 0 ? dur.totalHours : 420) / 35));
          const nbExercices = totalCFAWeeks * 2;
          for (let exIdx = 0; exIdx < nbExercices; exIdx++) {
            const weekNum = Math.floor(exIdx / 2) + 1;
            const exInWeek = (exIdx % 2) + 1;
            const label = ` (Semaine ${weekNum} - Ex. ${exInWeek})`;
            add(`cfa_c3i11_exercices_${fi}_${si}_ex${exIdx}`, `CT3 - IND 11 EXERCICE PRATIQUE${label} – ${s.prenom} ${s.nom}`, 3, 11, "exercices_cfa_stagiaire", { fi, stagiaireIdx: si, exerciceIdx: exIdx });
          }
        }

        // Examen blanc
        add(`cfa_c3i11_examen_blanc_${fi}_${si}`, `CT3 - IND 11 EXAMEN BLANC – ${s.prenom} ${s.nom}`, 3, 11, "examen_blanc_cfa_stagiaire", { fi, stagiaireIdx: si });
        // Grille d'acquisition
        add(`cfa_c3i11_grille_acquisition_${fi}_${si}`, `CT3 - IND 11 GRILLE D'ACQUISITION – ${s.prenom} ${s.nom}`, 3, 11, "grille_acquisition_cfa_stagiaire", { fi, stagiaireIdx: si });
      });
    });
    add("cfa_fiche_autoevaluation", "CT3 - IND 11 FICHE AUTOÉVALUATION APPRENTI", 3, 11, "fiche_autoevaluation_apprenti");


    // ===== IND 12 — ENGAGEMENT DES BÉNÉFICIAIRES (CFA) =====
    add("cfa_procedure_abandon", "CT3 - IND 12 PROCÉDURE D'ABANDON CFA", 3, 12, "procedure_abandon_cfa");
    add("cfa_procedure_absences", "CT3 - IND 12 PROCÉDURE DES ABSENCES CFA", 3, 12, "procedure_absences_cfa");
    // Logs de connexion : uniquement si modalité distancielle / e-learning / FOAD / mixte
    {
      const moda = (formations[0]?.modalites || '').toLowerCase();
    }
    add("cfa_c3i12_mesures_engagement", "CT3 - IND 12 MESURES POUR FAVORISER L'ENGAGEMENT DES BÉNÉFICIAIRES", 3, 12, "mesures_engagement_beneficiaires_cfa");
    add("cfa_c3i12_prevention_abandons", "CT3 - IND 12 PRÉVENTION ET GESTION DES ABANDONS", 3, 12, "prevention_gestion_abandons_cfa");
    add("cfa_c3i12_guide_entretien_abandons", "CT3 - IND 12 GUIDE D'ENTRETIEN DES ABANDONS", 3, 12, "guide_entretien_abandons_cfa");
    add("cfa_c3i12_eviter_echec", "CT3 - IND 12 ÉVITER LES SITUATIONS D'ÉCHEC", 3, 12, "eviter_situations_echec_cfa");
    add("cfa_c3i12_procedure_annulations_abandons", "CT3 - IND 12 PROCÉDURE DE GESTION DES ANNULATIONS ET ABANDONS", 3, 12, "procedure_annulations_abandons_cfa");
    add("cfa_c3i12_fichier_gestion_annulations", "CT3 - IND 12 FICHIER GESTION DES ANNULATIONS", 3, 12, "fichier_gestion_annulations_cfa");
    add("cfa_c3i12_accompagnement_recherche_contrat", "CT3 - IND 12 ACCOMPAGNEMENT À LA RECHERCHE D'UN CONTRAT", 3, 12, "accompagnement_recherche_contrat_cfa");
    add("cfa_c3i12_liste_aide_social", "CT3 - IND 12 LISTE AIDE SOCIAL", 3, 12, "liste_aide_social_cfa");
    // Un certificat individuel par stagiaire
    stagiaires.forEach((s, si) => {
      add(
        `cfa_c3i12_certificat_realisation_${si}`,
        `CT3 - IND 12 CERTIFICAT DE RÉALISATION – ${s.prenom} ${s.nom}`,
        3, 12,
        "certificat_realisation_cfa",
        { stagiaireIdx: si },
      );
    });
    add("cfa_c3i12_suivi_public_excel", "CT3 - IND 12 SUIVI DU PUBLIC ET DU BÉNÉFICIAIRE (Excel)", 3, 12, "suivi_public_beneficiaire_excel");
    add("cfa_c3i12_suivi_pfmp_excel", "CT3 - IND 12 TABLEAU DE SUIVI DES PÉRIODES EN ENTREPRISE (Excel)", 3, 12, "suivi_pfmp_excel");
    // Ressources documentaires
    add("cfa_c3i12_cesdh", "CT3 - IND 12 📁 RESSOURCES – Convention européenne des droits de l'homme (CESDH)", 3, 12, "pdf_static", { pdfUrl: "/pdfs/cesdh.pdf" });
    add("cfa_c3i12_precis_apprentissage", "CT3 - IND 12 📁 RESSOURCES – Précis de l'apprentissage", 3, 12, "pdf_static", { pdfUrl: "/pdfs/precis_apprentissage.pdf" });
    add("cfa_c3i12_livret_accompagnez_alternants", "CT3 - IND 12 📁 RESSOURCES – Livret Accompagnez vos alternants", 3, 12, "pdf_static", { pdfUrl: "/pdfs/livret_accompagnez_alternants.pdf" });
    
    add("cfa_c3i12_procedure_rupture_reorientation_echecs", "CT3 - IND 12 📁 GESTION ABANDON – Procédure rupture, réorientation et échecs", 3, 12, "procedure_rupture_reorientation_echecs_cfa", { folder: "Gestion_Abandon" });
    add("cfa_c3i12_feuille_emargement_gestion_abandon", "CT3 - IND 12 📁 GESTION ABANDON – Feuille d'émargement (suivi abandon)", 3, 12, "feuille_emargement_gestion_abandon_cfa", { folder: "Gestion_Abandon" });


    // ===== IND 13 — COORDINATION ALTERNANCE (CFA) =====
    add("cfa_c3i13_procedure_coordination", "CT3 - IND 13 PROCÉDURE DE COORDINATION CFA – ENTREPRISE – APPRENTI", 3, 13, "procedure_coordination_alternance_cfa");
    // Un fichier par stagiaire pour chaque type de document
    stagiaires.forEach((s, si) => {
      const nom = `${(s.nom || "").toUpperCase()} ${s.prenom || ""}`.trim() || `Apprenti ${si + 1}`;
      add(`cfa_c3i13_missions_blocs_${si}`, `CT3 - IND 13 TABLEAU MISSIONS EN ENTREPRISE ↔ BLOCS DE COMPÉTENCES — ${nom}`, 3, 13, "tableau_missions_blocs_cfa", { stagiaireIdx: si });
      add(`cfa_c3i13_calendrier_alternance_${si}`, `CT3 - IND 13 CALENDRIER D'ALTERNANCE — ${nom}`, 3, 13, "calendrier_alternance_cfa", { stagiaireIdx: si });
      add(`cfa_c3i13_grille_competences_${si}`, `CT3 - IND 13 GRILLE DE COMPÉTENCES ALTERNANCE — ${nom}`, 3, 13, "grille_competences_alternance_cfa", { stagiaireIdx: si });
      add(`cfa_c3i13_suivi_ent_${si}`, `CT3 - IND 13 SUIVI EN ENTREPRISE — ${nom}`, 3, 13, "suivi_entreprise_cfa", { stagiaireIdx: si });
      add(
        `cfa_c3i13_outils_suivi_excel_${si}`,
        `CT3 - IND 13 OUTILS DE SUIVI ALTERNANCE (Excel) — ${nom}`,
        3, 13,
        "outils_suivi_alternance_excel",
        { stagiaireIdx: si },
      );
    });

    // ===== IND 14 — ACCOMPAGNEMENT SOCIO-PROFESSIONNEL (CFA) =====
    add("cfa_c3i14_procedure_ruptures", "CT3 - IND 14 PROCÉDURE DE TRAITEMENT SANS DÉLAI DES SITUATIONS DE RUPTURE (difficultés, violences, discriminations)", 3, 14, "procedure_ruptures_sans_delai_cfa");
    // Webinaires uniquement si distanciel
    formations.forEach((f) => {
      const moda = (f.modalites || '').toLowerCase();
      const isDistanciel = moda.includes('distanciel') || moda.includes('e-learning') || moda.includes('foad') || moda.includes('mixte');
      if (isDistanciel) {
        add("cfa_c3i14_webinaire_formation_competences", "CT3 - IND 14 WEBINAIRE FORMATION ET DÉVELOPPEMENT DES COMPÉTENCES", 3, 14, "webinaire_formation_competences_cfa");
        if (isNTCFormation) add("cfa_c3i14_webinaire_ntc", "CT3 - IND 14 WEBINAIRE TECHNIQUES ET OUTILS DU NTC", 3, 14, "webinaire_ntc_cfa");
      }
    });

    // ===== IND 14 — PLANNING DE DIFFUSION DES 14 MISSIONS CFA =====
    add(
      "cfa_c3i14_planning_diffusion_14_missions",
      "CT3 - IND 14 📅 PLANNING DE DIFFUSION DES 14 MISSIONS CFA",
      3, 14, "planning_diffusion_14_missions_cfa",
    );

    // ===== IND 14 — VISUELS / AFFICHES DES 14 MISSIONS DU CFA =====
    // Affiches modernes avec illustration + nom d'organisme dynamique
    const visuels14 = [
      { num: 1,  titre: "Mission 1 – Orientation & Handicap" },
      { num: 2,  titre: "Mission 2 – Recherche d'un Employeur" },
      { num: 3,  titre: "Mission 3 – Cohérence CFA / Entreprise" },
      { num: 4,  titre: "Mission 4 – Droits, Devoirs & Santé-Sécurité au Travail" },
      { num: 5,  titre: "Mission 5 – Rupture de Contrat" },
      { num: 6,  titre: "Mission 6 – Accompagnement Social & Matériel" },
      { num: 7,  titre: "Mission 7 – Mixité Femmes-Hommes" },
      { num: 8,  titre: "Mission 8 – Égalité Professionnelle & Mixité des Métiers" },
      { num: 9,  titre: "Mission 9 – Diversité & Lutte contre les Discriminations" },
      { num: 10, titre: "Mission 10 – Mobilité Nationale & Internationale" },
      { num: 11, titre: "Mission 11 – Suivi de la Formation à Distance" },
      { num: 12, titre: "Mission 12 – Évaluation des Compétences Acquises" },
      { num: 13, titre: "Mission 13 – Accompagnement Post-Formation" },
      { num: 14, titre: "Mission 14 – Accès aux Aides des Apprentis" },
    ];
    visuels14.forEach((v) => {
      add(
        `cfa_c3i14_visuel_mission_${v.num}`,
        `CT3 - IND 14 📁 VISUELS 14 MISSIONS / ${v.titre}`,
        3, 14, "visuel_mission_cfa",
        {
          imageUrl: `/pdfs/visuels_14_missions/illu_m${v.num}.jpg`,
          missionTitre: v.titre,
          folder: "VISUELS_14_MISSIONS",
        }
      );
    });

    // ===== IND 10 — NEWSLETTERS DES 14 MISSIONS CFA (1 par mission, rangée dans le dossier de chaque mission) =====
    const newsletters14 = [
      { num: 1,  folder: "14_MISSIONS_CFA/Mission_1_Orientation_Handicap" },
      { num: 2,  folder: "14_MISSIONS_CFA/Mission_2_Recherche_Employeur" },
      { num: 3,  folder: "14_MISSIONS_CFA/Mission_3_Coherence_CFA_Entreprise" },
      { num: 4,  folder: "14_MISSIONS_CFA/Mission_4_Droits_Devoirs_Sante_Securite" },
      { num: 5,  folder: "14_MISSIONS_CFA/Mission_5_Rupture_Contrat" },
      { num: 6,  folder: "14_MISSIONS_CFA/Mission_6_Accompagnement_Social_Materiel" },
      { num: 7,  folder: "14_MISSIONS_CFA/Mission_7_Mixite_Egalite_FH" },
      { num: 8,  folder: "14_MISSIONS_CFA/Mission_8_Egalite_Pro_Mixite_Metiers" },
      { num: 9,  folder: "14_MISSIONS_CFA/Mission_9_Diversite_Discriminations" },
      { num: 10, folder: "14_MISSIONS_CFA/Mission_10_Mobilite_Nationale" },
      { num: 11, folder: "14_MISSIONS_CFA/Mission_11_Formation_Distance" },
      { num: 12, folder: "14_MISSIONS_CFA/Mission_12_Evaluation_Competences" },
      { num: 13, folder: "14_MISSIONS_CFA/Mission_13_Accompagnement_Post_Formation" },
      { num: 14, folder: "14_MISSIONS_CFA/Mission_14_Acces_Aides" },
    ];
    newsletters14.forEach((n) => {
      add(
        `cfa_c3i10_newsletter_mission_${n.num}`,
        `CT3 - IND 10 📁 14 MISSIONS / Mission ${n.num} – 📰 Newsletter N°${n.num}`,
        3, 10, "newsletter_mission_cfa",
        { missionNum: n.num, folder: n.folder },
      );
    });

    if (isIDF) add("cfa_c3i14_notice_aide_financiere_idf", "CT3 - IND 14 📁 NOTICE – Aide Financière Apprenti Île-de-France", 3, 14, "pdf_static", { pdfUrl: "/pdfs/notice_aide_financiere_apprenti_idf.pdf" });
    add("cfa_c3i14_pages_site_aides_ateliers", "CT3 - IND 14 PAGES SITE – AIDES, ATELIERS CV & ENTRETIEN", 3, 14, "pages_site_aides_ateliers_cfa");

    // ===== IND 14 — DOSSIER CITOYENNETÉ (Vie Publique) =====
    add("cfa_c3i14_cit_chaque_citoyen_a_t_il_droit_au_respect_d", "CT3 - IND 14 📁 CITOYENNETÉ – Droits & Libertés – Chaque citoyen a t il droit au respect de sa vie privée", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/chaque_citoyen_a_t_il_droit_au_respect_de_sa_vie_privee.pdf" });
    add("cfa_c3i14_cit_comment_sont_proteges_les_droits_des_cit", "CT3 - IND 14 📁 CITOYENNETÉ – Droits & Libertés – Comment sont protégés les droits des citoyens", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/comment_sont_proteges_les_droits_des_citoyens.pdf" });
    add("cfa_c3i14_cit_existe_t_il_un_droit_au_travail", "CT3 - IND 14 📁 CITOYENNETÉ – Droits & Libertés – Existe t il un droit au travail", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/existe_t_il_un_droit_au_travail.pdf" });
    add("cfa_c3i14_cit_la_loi_du_9_decembre_1905_de_separation_", "CT3 - IND 14 📁 CITOYENNETÉ – Droits & Libertés – La loi du 9 décembre 1905 de séparation des églises et de l’état", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/la_loi_du_9_decembre_1905_de_separation_des_eglises_et_de_letat.pdf" });
    add("cfa_c3i14_cit_libertes_et_droits_fondamentaux_de_quoi_", "CT3 - IND 14 📁 CITOYENNETÉ – Droits & Libertés – Libertés et droits fondamentaux  de quoi s agit il", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/libertes_et_droits_fondamentaux_de_quoi_s_agit_il.pdf" });
    add("cfa_c3i14_cit_pourquoi_parle_t_on_de_nouveaux_droits_p", "CT3 - IND 14 📁 CITOYENNETÉ – Droits & Libertés – Pourquoi parle t on de nouveaux droits pour les citoyens", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/pourquoi_parle_t_on_de_nouveaux_droits_pour_les_citoyens.pdf" });
    add("cfa_c3i14_cit_propriete_privee_et_droit_a_la_surete", "CT3 - IND 14 📁 CITOYENNETÉ – Droits & Libertés – Propriété privée et droit à la sûreté", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/propriete_privee_et_droit_a_la_surete.pdf" });
    add("cfa_c3i14_cit_qu_est_ce_que_le_droit_de_greve", "CT3 - IND 14 📁 CITOYENNETÉ – Droits & Libertés – Qu est ce que le droit de grève", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/qu_est_ce_que_le_droit_de_greve.pdf" });
    add("cfa_c3i14_cit_quels_sont_les_differents_types_de_droit", "CT3 - IND 14 📁 CITOYENNETÉ – Droits & Libertés – Quels sont les différents types de droits des citoyens", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quels_sont_les_differents_types_de_droits_des_citoyens.pdf" });
    add("cfa_c3i14_cit_quels_sont_les_droits_des_etrangers", "CT3 - IND 14 📁 CITOYENNETÉ – Droits & Libertés – Quels sont les droits des étrangers", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quels_sont_les_droits_des_etrangers.pdf" });
    add("cfa_c3i14_cit_tous_les_citoyens_ont_ils_droit_a_une_ed", "CT3 - IND 14 📁 CITOYENNETÉ – Droits & Libertés – Tous les citoyens ont ils droit à une éducation", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/tous_les_citoyens_ont_ils_droit_a_une_education.pdf" });
    add("cfa_c3i14_cit_tout_citoyen_peut_il_concourir_a_lelabor", "CT3 - IND 14 📁 CITOYENNETÉ – Droits & Libertés – Tout citoyen peut il concourir à l’élaboration de la loi", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/tout_citoyen_peut_il_concourir_a_lelaboration_de_la_loi.pdf" });
    add("cfa_c3i14_cit_tout_le_monde_a_t_il_droit_a_une_protect", "CT3 - IND 14 📁 CITOYENNETÉ – Droits & Libertés – Tout le monde a t il droit à une protection sociale", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/tout_le_monde_a_t_il_droit_a_une_protection_sociale_.pdf" });
    add("cfa_c3i14_cit_comment_se_deroule_une_campagne_electora", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Comment se déroule une campagne électorale", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/comment_se_deroule_une_campagne_electorale.pdf" });
    add("cfa_c3i14_cit_comment_se_deroulent_les_operations_de_v", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Comment se déroulent les opérations de vote", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/comment_se_deroulent_les_operations_de_vote.pdf" });
    add("cfa_c3i14_cit_en_quoi_consiste_le_droit_de_vote", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – En quoi consiste le droit de vote", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/en_quoi_consiste_le_droit_de_vote.pdf" });
    add("cfa_c3i14_cit_en_quoi_consiste_le_depouillement_des_bu", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – En quoi consiste le dépouillement des bulletins de vote", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/en_quoi_consiste_le_depouillement_des_bulletins_de_vote.pdf" });
    add("cfa_c3i14_cit_grandes_etapes_de_la_conquete_du_droit_d", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Grandes étapes de la conquête du droit de vote des femmes", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/grandes_etapes_de_la_conquete_du_droit_de_vote_des_femmes.pdf" });
    add("cfa_c3i14_cit_les_etrangers_ont_ils_le_droit_de_vote", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Les étrangers ont ils le droit de vote", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/les_etrangers_ont_ils_le_droit_de_vote.pdf" });
    add("cfa_c3i14_cit_qu_est_ce_qu_un_corps_electoral", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Qu est ce qu un corps électoral", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/qu_est_ce_qu_un_corps_electoral.pdf" });
    add("cfa_c3i14_cit_qu_est_ce_que_le_vote_sur_etiquette", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Qu est ce que le vote sur étiquette", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/qu_est_ce_que_le_vote_sur_etiquette.pdf" });
    add("cfa_c3i14_cit_que_doit_faire_le_president_du_bureau_en", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Que doit faire le président du bureau en cas de fraude électorale", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/que_doit_faire_le_president_du_bureau_en_cas_de_fraude_electorale.pdf" });
    add("cfa_c3i14_cit_que_fait_on_des_bulletins_de_vote_depoui", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Que fait on des bulletins de vote dépouillés", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/que_fait_on_des_bulletins_de_vote_depouilles.pdf" });
    add("cfa_c3i14_cit_que_se_passe_t_il_en_cas_de_fraude_elect", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Que se passe t il en cas de fraude électorale", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/que_se_passe_t_il_en_cas_de_fraude_electorale.pdf" });
    add("cfa_c3i14_cit_que_sont_les_listes_electorales", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Que sont les listes électorales", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/que_sont_les_listes_electorales.pdf" });
    add("cfa_c3i14_cit_quelle_est_la_signification_de_labstenti", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Quelle est la signification de l’abstention", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quelle_est_la_signification_de_labstention.pdf" });
    add("cfa_c3i14_cit_quelles_sont_les_conditions_pour_voter", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Quelles sont les conditions pour voter", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quelles_sont_les_conditions_pour_voter.pdf" });
    add("cfa_c3i14_cit_quelles_sont_les_etapes_de_la_conquetes_", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Quelles sont les étapes de la conquêtes du droit de vote", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quelles_sont_les_etapes_de_la_conquetes_du_droit_de_vote_.pdf" });
    add("cfa_c3i14_cit_quels_sont_les_differents_intervenants_d", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Quels sont les différents intervenants dans un bureau de vote", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quels_sont_les_differents_intervenants_dans_un_bureau_de_vote.pdf" });
    add("cfa_c3i14_cit_quels_sont_les_differents_modes_de_scrut", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Quels sont les différents modes de scrutin", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quels_sont_les_differents_modes_de_scrutin.pdf" });
    add("cfa_c3i14_cit_qui_a_le_droit_de_voter", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Qui a le droit de voter", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/qui_a_le_droit_de_voter.pdf" });
    add("cfa_c3i14_cit_quest_ce_quun_syndicaliste_aujourd_hui_d", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Qu’est ce qu’un syndicaliste aujourd hui dans l’entreprise", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quest_ce_quun_syndicaliste_aujourd_hui_dans_lentreprise.pdf" });
    add("cfa_c3i14_cit_quest_ce_quune_circonscription_electoral", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Qu’est ce qu’une circonscription électorale", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quest_ce_quune_circonscription_electorale.pdf" });
    add("cfa_c3i14_cit_scrutins_suffrages_systemes_electoraux_q", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Scrutins suffrages systèmes électoraux  quelles différences", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/scrutins_suffrages_systemes_electoraux_quelles_differences.pdf" });
    add("cfa_c3i14_cit_vote_blanc_vote_nul_quelles_differences_", "CT3 - IND 14 📁 CITOYENNETÉ – Élections & Vote – Vote blanc vote nul  quelles différences .fr", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/vote_blanc_vote_nul_quelles_differences_fr.pdf" });
    add("cfa_c3i14_cit_comment_creer_un_parti_politique", "CT3 - IND 14 📁 CITOYENNETÉ – Partis & Syndicats – Comment créer un parti politique", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/comment_creer_un_parti_politique.pdf" });
    add("cfa_c3i14_cit_comment_est_finance_un_syndicat", "CT3 - IND 14 📁 CITOYENNETÉ – Partis & Syndicats – Comment est financé un syndicat", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/comment_est_finance_un_syndicat.pdf" });
    add("cfa_c3i14_cit_qu_est_ce_qu_un_parti_politique", "CT3 - IND 14 📁 CITOYENNETÉ – Partis & Syndicats – Qu est ce qu un parti politique", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/qu_est_ce_qu_un_parti_politique.pdf" });
    add("cfa_c3i14_cit_qu_est_ce_qu_un_syndicat_et_comment_s_or", "CT3 - IND 14 📁 CITOYENNETÉ – Partis & Syndicats – Qu est ce qu un syndicat et comment s organise t il", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/qu_est_ce_qu_un_syndicat_et_comment_s_organise_t_il.pdf" });
    add("cfa_c3i14_cit_quel_est_le_role_dun_syndicat", "CT3 - IND 14 📁 CITOYENNETÉ – Partis & Syndicats – Quel est le rôle d’un syndicat", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quel_est_le_role_dun_syndicat.pdf" });
    add("cfa_c3i14_cit_quelle_est_le_role_de_lopposition_en_pol", "CT3 - IND 14 📁 CITOYENNETÉ – Partis & Syndicats – Quelle est le rôle de l’opposition en politique", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quelle_est_le_role_de_lopposition_en_politique_.pdf" });
    add("cfa_c3i14_cit_quels_sont_les_moyens_daction_des_syndic", "CT3 - IND 14 📁 CITOYENNETÉ – Partis & Syndicats – Quels sont les moyens d’action des syndicats", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quels_sont_les_moyens_daction_des_syndicats.pdf" });
    add("cfa_c3i14_cit_quest_ce_quetre_militant_dun_parti_aujou", "CT3 - IND 14 📁 CITOYENNETÉ – Partis & Syndicats – Qu’est ce qu’être militant d’un parti aujourd hui", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quest_ce_quetre_militant_dun_parti_aujourd_hui.pdf" });
    add("cfa_c3i14_cit_comment_creer_une_association", "CT3 - IND 14 📁 CITOYENNETÉ – Associations – Comment créer une association", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/comment_creer_une_association.pdf" });
    add("cfa_c3i14_cit_existe_t_il_differents_types_dassociatio", "CT3 - IND 14 📁 CITOYENNETÉ – Associations – Existe t il différents types d’associations", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/existe_t_il_differents_types_dassociations.pdf" });
    add("cfa_c3i14_cit_les_associations_sont_elles_controlees", "CT3 - IND 14 📁 CITOYENNETÉ – Associations – Les associations sont elles contrôlées", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/les_associations_sont_elles_controlees.pdf" });
    add("cfa_c3i14_cit_quels_sont_les_differents_roles_des_asso", "CT3 - IND 14 📁 CITOYENNETÉ – Associations – Quels sont les différents rôles des associations", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quels_sont_les_differents_roles_des_associations.pdf" });
    add("cfa_c3i14_cit_quest_ce_quune_association", "CT3 - IND 14 📁 CITOYENNETÉ – Associations – Qu’est ce qu’une association", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quest_ce_quune_association.pdf" });
    add("cfa_c3i14_cit_a_quoi_sert_une_election", "CT3 - IND 14 📁 CITOYENNETÉ – Général – A quoi sert une élection", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/a_quoi_sert_une_election.pdf" });
    add("cfa_c3i14_cit_comment_devient_on_citoyen_francais", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Comment devient on citoyen français", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/comment_devient_on_citoyen_francais.pdf" });
    add("cfa_c3i14_cit_comment_les_partis_politiques_sont_ils_f", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Comment les partis politiques sont ils financés", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/comment_les_partis_politiques_sont_ils_finances.pdf" });
    add("cfa_c3i14_cit_en_quoi_consiste_la_liberte_de_manifesta", "CT3 - IND 14 📁 CITOYENNETÉ – Général – En quoi consiste la liberté de manifestation", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/en_quoi_consiste_la_liberte_de_manifestation.pdf" });
    add("cfa_c3i14_cit_en_quoi_consiste_le_referendum_dinitiati", "CT3 - IND 14 📁 CITOYENNETÉ – Général – En quoi consiste le référendum d’initiative partagée (rip)", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/en_quoi_consiste_le_referendum_dinitiative_partagee_rip.pdf" });
    add("cfa_c3i14_cit_etre_elu_est_ce_un_metier", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Etre élu est ce un métier", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/etre_elu_est_ce_un_metier.pdf" });
    add("cfa_c3i14_cit_les_referendums_de_la_ve_republique_et_l", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Les référendums de la ve république et leurs résultats", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/les_referendums_de_la_ve_republique_et_leurs_resultats.pdf" });
    add("cfa_c3i14_cit_les_elections_europeennes_interessent_el", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Les élections européennes intéressent elles les électeurs", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/les_elections_europeennes_interessent_elles_les_electeurs.pdf" });
    add("cfa_c3i14_cit_peut_on_perdre_sa_citoyennete", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Peut on perdre sa citoyenneté", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/peut_on_perdre_sa_citoyennete.pdf" });
    add("cfa_c3i14_cit_pourquoi_verser_une_indemnite_aux_elus", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Pourquoi verser une indemnité aux élus", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/pourquoi_verser_une_indemnite_aux_elus.pdf" });
    add("cfa_c3i14_cit_qu_est_ce_que_l_eligibilite", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Qu est ce que l éligibilité", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/qu_est_ce_que_l_eligibilite.pdf" });
    add("cfa_c3i14_cit_qu_est_ce_que_la_liberte_de_circulation_", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Qu est ce que la liberté de circulation ou liberté d aller venir", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/qu_est_ce_que_la_liberte_de_circulation_ou_liberte_d_aller_venir.pdf" });
    add("cfa_c3i14_cit_qu_est_ce_que_la_liberte_de_circulation_", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Qu est ce que la liberté de circulation ou liberté d aller venir 2", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/qu_est_ce_que_la_liberte_de_circulation_ou_liberte_d_aller_venir_2.pdf" });
    add("cfa_c3i14_cit_qu_est_ce_que_la_liberte_religieuse", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Qu est ce que la liberté religieuse", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/qu_est_ce_que_la_liberte_religieuse.pdf" });
    add("cfa_c3i14_cit_qu_est_ce_que_la_volatilite_electorale", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Qu est ce que la volatilité électorale", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/qu_est_ce_que_la_volatilite_electorale.pdf" });
    add("cfa_c3i14_cit_quel_est_le_reglement_des_elections", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Quel est le règlement des élections", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quel_est_le_reglement_des_elections.pdf" });
    add("cfa_c3i14_cit_quel_est_le_role_des_partis_politiques", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Quel est le rôle des partis politiques", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quel_est_le_role_des_partis_politiques.pdf" });
    add("cfa_c3i14_cit_quel_est_lenjeu_du_decoupage_electoral", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Quel est l’enjeu du découpage électoral", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quel_est_lenjeu_du_decoupage_electoral.pdf" });
    add("cfa_c3i14_cit_quelle_est_la_definition_de_la_laicite", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Quelle est la définition de la laïcité", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quelle_est_la_definition_de_la_laicite.pdf" });
    add("cfa_c3i14_cit_quelle_est_la_particularite_de_l_electio", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Quelle est la particularité de l élection présidentielle", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quelle_est_la_particularite_de_l_election_presidentielle.pdf" });
    add("cfa_c3i14_cit_quelle_est_la_place_des_elections_legisl", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Quelle est la place des élections législatives dans la ve république", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quelle_est_la_place_des_elections_legislatives_dans_la_ve_republique.pdf" });
    add("cfa_c3i14_cit_quelle_est_la_place_des_elections_legisl", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Quelle est la place des élections législatives dans la ve république  2", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quelle_est_la_place_des_elections_legislatives_dans_la_ve_republique_2.pdf" });
    add("cfa_c3i14_cit_quelles_sont_les_differentes_elections", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Quelles sont les différentes élections", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quelles_sont_les_differentes_elections.pdf" });
    add("cfa_c3i14_cit_quelles_sont_les_garanties_d_un_elu", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Quelles sont les garanties d un élu", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quelles_sont_les_garanties_d_un_elu.pdf" });
    add("cfa_c3i14_cit_quelles_sont_les_responsabilites_dun_elu", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Quelles sont les responsabilités d’un élu", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quelles_sont_les_responsabilites_dun_elu.pdf" });
    add("cfa_c3i14_cit_quels_sont_les_differents_types_de_refer", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Quels sont les différents types de référendum", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quels_sont_les_differents_types_de_referendum_.pdf" });
    add("cfa_c3i14_cit_qui_decide_du_deroulement_dun_referendum", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Qui décide du déroulement d’un référendum", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/qui_decide_du_deroulement_dun_referendum.pdf" });
    add("cfa_c3i14_cit_quest_ce_que_la_liberte_dopinion", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Qu’est ce que la liberté d’opinion", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/quest_ce_que_la_liberte_dopinion.pdf" });
    add("cfa_c3i14_cit_tous_les_citoyens_peuvent_ils_etre_elus", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Tous les citoyens peuvent ils être élus", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/tous_les_citoyens_peuvent_ils_etre_elus.pdf" });
    add("cfa_c3i14_cit_tous_les_habitants_de_la_france_sont_ils", "CT3 - IND 14 📁 CITOYENNETÉ – Général – Tous les habitants de la france sont ils des citoyens français", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/tous_les_habitants_de_la_france_sont_ils_des_citoyens_francais.pdf" });
    add("cfa_c3i14_cit_a_quoi_sert_le_referendum_sous_la_ve_rep", "CT3 - IND 14 📁 CITOYENNETÉ – Général – À quoi sert le référendum sous la ve république", 3, 14, "pdf_static", { folder: "CITOYENNETE", pdfUrl: "/pdfs/citoyennete/a_quoi_sert_le_referendum_sous_la_ve_republique_.pdf" });

    // ===== IND 15 — DROITS ET DEVOIRS DE L'APPRENTI (CFA) =====
    formations.forEach((f, fi) => {
      add(`cfa_c3i15_conditions_${fi}`, `CT3 - IND 15 FICHE CONDITIONS ACCUEIL`, 3, 15, "conditions_accueil", { fi });
      
    });
    add("cfa_c3i15_droits_devoirs_apprenti", "CT3 - IND 15 DROITS ET DEVOIRS DE L'APPRENTI", 3, 15, "droits_devoirs_apprenti_cfa");
    add("cfa_c3i15_regles_sante_securite", "CT3 - IND 15 RÈGLES SANTÉ ET SÉCURITÉ EN MILIEU PROFESSIONNEL", 3, 15, "regles_sante_securite_cfa");
    add("cfa_c3i15_sst_livret", "CT3 - IND 15 📁 LIVRET SST – Sauveteur Secouriste du Travail", 3, 15, "pdf_static", { pdfUrl: "/pdfs/sst_livret.pdf" });
    add("cfa_c3i15_violences_mediateur", "CT3 - IND 15 PRÉVENTION ET SIGNALEMENT DES VIOLENCES, HARCÈLEMENT, DISCRIMINATIONS — MÉDIATEUR DE L'APPRENTISSAGE", 3, 15, "information_violences_mediateur_cfa");
    stagiaires.forEach((s, si) => {
      add(`cfa_c3i15_attestation_sst_${si}`, `CT3 - IND 15 ATTESTATION DE REMISE DU LIVRET SST – ${s.prenom} ${s.nom}`, 3, 15, "attestation_remise_livret_sst_cfa", { stagiaireIdx: si });
    });

    // ===== IND 8 — Positionnement et évaluation des acquis à l'entrée (CFA) =====
    formations.forEach((f, fi) => {
      add(`cfa_c2i8_trame_debut_${fi}`, `CT2 - IND 8 TEST DE POSITIONNEMENT DÉBUT DE FORMATION`, 2, 8, "test_positionnement_debut_trame", { fi });
      add(`cfa_c2i8_trame_fin_${fi}`, `CT3 - IND 11 TEST DE FIN DE FORMATION (trame)`, 3, 11, "test_positionnement_fin_trame", { fi });
      add(`cfa_c2i8_procedure_debut_${fi}`, `CT2 - IND 8 PROCÉDURE D'ÉVALUATION DE DÉBUT DE FORMATION`, 2, 8, "procedure_eval_debut", { fi });
      add(`cfa_c2i8_procedure_fin_${fi}`, `CT3 - IND 11 PROCÉDURE D'ÉVALUATION DE FIN DE FORMATION`, 3, 11, "procedure_eval_fin", { fi });
      add(`cfa_c2i8_grille_niveaux_${fi}`, `CT2 - IND 8 GRILLE DE NIVEAUX`, 2, 8, "grille_niveaux_positionnement", { fi });
    });
    formations.forEach((f, fi) => {
      stagiaires.forEach((s, si) => {
        add(`cfa_c2i8_test_debut_${fi}_${si}`, `CT2 - IND 8 TEST DE POSITIONNEMENT D'ENTRÉE – ${s.prenom} ${s.nom}`, 2, 8, "test_cfa_stagiaire", { fi, stagiaireIdx: si, phase: "debut" });
      });
    });

    // ===== CRITÈRE 4 — ADÉQUATION DES MOYENS (CFA) =====

    // IND 17 — Moyens humains, techniques et environnement
    const cfaModaLower = (formations[0]?.modalites || '').toLowerCase();
    const cfaIsPureDistanciel = cfaModaLower.includes('distanciel') && !cfaModaLower.includes('mixte') && !cfaModaLower.includes('présentiel') && !cfaModaLower.includes('presentiel');
    // Inventaire des moyens établi par le CFA ; bail, factures et attestations restent des pièces fournies par l'organisme.
    add("cfa_c4i17_inventaire_moyens", `CT4 - IND 17 INVENTAIRE DES MOYENS HUMAINS, TECHNIQUES ET PÉDAGOGIQUES${cfaIsPureDistanciel ? " (FORMATION À DISTANCE)" : ""}`, 4, 17, "inventaire_moyens_cfa");

    const uniqueFormateursCFA = Array.from(new Set(stagiaires.map(s => (s as any).formateur).filter((f: any) => f && String(f).trim())));

    // IND 18 — Coordination des intervenants
    add("cfa_c4i18_organigramme", "CT4 - IND 18 ORGANIGRAMME", 4, 18, "organigramme");
    add("cfa_c4i18_fiche_poste_dirigeant", "CT4 - IND 18 FICHE DE POSTE – RESPONSABLE PÉDAGOGIQUE", 4, 18, "fiche_poste_formateur", { role: "dirigeant" });
    if (uniqueFormateursCFA.length === 0) {
      add("cfa_c4i18_fiche_poste_formateur", "CT4 - IND 18 FICHE DE POSTE – FORMATEUR", 4, 18, "fiche_poste_formateur", { role: "formateur" });
    }
    add("cfa_c4i18_fiche_poste_ref_admin", "CT4 - IND 18 FICHE DE POSTE – RÉFÉRENT ADMINISTRATIF", 4, 18, "fiche_poste_formateur", { role: "referent_administratif" });
    add("cfa_c4i18_fiche_poste_ref_handicap", "CT4 - IND 18 FICHE DE POSTE – RÉFÉRENT HANDICAP", 4, 18, "fiche_poste_formateur", { role: "referent_handicap" });

    // IND 19 — Ressources pédagogiques mises à disposition
    formations.forEach((f, fi) => {
      add(`cfa_c4i19_support_cours_${fi}`, `CT4 - IND 19 SUPPORT DE COURS CFA`, 4, 19, "support_cours_cfa", { fi });
      add(`cfa_c4i19_decoupage_formation_${fi}`, `CT4 - IND 19 DÉCOUPAGE DE FORMATION CFA (Excel)`, 4, 19, "decoupage_formation_cfa_excel", { fi });
    });
    add("cfa_c4i19_ressources_pedagogiques", "CT4 - IND 19 RESSOURCES PÉDAGOGIQUES", 4, 19, "ressources_pedagogiques");

    // IND 20 — Conseil de perfectionnement
    add("cfa_c4i20_convocation_conseil_perfectionnement", "CT4 - IND 20 CONVOCATION AU CONSEIL DE PERFECTIONNEMENT", 4, 20, "convocation_conseil_perfectionnement");
    add("cfa_c4i20_pv_conseil_perfectionnement", "CT4 - IND 20 PROCÈS-VERBAL – CONSEIL DE PERFECTIONNEMENT", 4, 20, "pv_conseil_perfectionnement");
    add("cfa_c4i20_fiche_referent_mobilite", "CT4 - IND 20 FICHE RÉFÉRENT MOBILITÉ NATIONALE ET INTERNATIONALE", 4, 20, "fiche_referent_mobilite_cfa");
    add("cfa_c4i20_lettre_mission_mobilite", "CT4 - IND 20 LETTRE DE MISSION – RÉFÉRENT MOBILITÉ", 4, 20, "lettre_mission_referent_mobilite_cfa");
    add("cfa_c4i20_lettre_mission_handicap", "CT4 - IND 20 LETTRE DE MISSION – RÉFÉRENT HANDICAP", 4, 20, "lettre_mission_referent_handicap_cfa");
    add("cfa_c4i20_part_heures_permanents", "CT4 - IND 20 PART DES HEURES ASSURÉES PAR DES PERMANENTS ET SUPERVISION PÉDAGOGIQUE", 4, 20, "part_heures_permanents_cfa");

    // ===== CRITÈRE 5 — QUALIFICATION DU PERSONNEL (CFA) =====

    // IND 21 — Compétences des intervenants
    add("cfa_c5i21_processus_recrutement", "CT5 - IND 21 DESCRIPTION DU PROCESSUS DE RECRUTEMENT", 5, 21, "procedure_recrutement_formateur");
    add("cfa_c5i21_justificatifs_intervenants", "CT5 - IND 21 DOSSIER DE COMPÉTENCES DES INTERVENANTS (CV, DIPLÔMES, EXPÉRIENCE)", 5, 21, "justificatifs_intervenants_cfa");
    add("cfa_c5i21_grille_recrutement", "CT5 - IND 21 GRILLE DE RECRUTEMENT FORMATEUR", 5, 21, "grille_recrutement_formateur_cfa");
    add("cfa_c5i21_grille_evaluation_pedagogique", "CT5 - IND 21 GRILLE D'ÉVALUATION PÉDAGOGIQUE DES INTERVENANTS", 5, 21, "grille_evaluation_pedagogique_cfa");

    // IND 22 — Entretien et développement des compétences
    add("cfa_c5i22_plan_dev_competences", "CT5 - IND 22 PLAN DE DÉVELOPPEMENT DES COMPÉTENCES", 5, 22, "plan_dev_competences_excel");
    

    uniqueFormateursCFA.forEach((fName) => {
      const fname = String(fName).trim();
      const slug = fname.replace(/\s+/g, '_').toUpperCase();
      add(`cfa_c5i22_fiche_entretien_${slug}`, `CT5 - IND 22 FICHE D'ENTRETIEN ANNUEL – ${fname}`, 5, 22, "fiche_entretien_annuel_formateur", { formateurNom: fname });
      add(`cfa_c4i18_fiche_poste_formateur_${slug}`, `CT4 - IND 18 FICHE DE POSTE – ${fname}`, 4, 18, "fiche_poste_formateur", { role: "formateur", formateurNom: fname });
      add(`cfa_c5i21_autoevaluation_${slug}`, `CT5 - IND 21 AUTO-ÉVALUATION – ${fname}`, 5, 21, "autoevaluation_formateur", { formateurNom: fname });
      add(`cfa_c6i27_contrat_soustraitance_${slug}`, `CT6 - IND 27 CONTRAT DE SOUS-TRAITANCE – ${fname}`, 6, 27, "contrat_sous_traitance_v2", { formateurNom: fname });
    });

    // ===== CRITÈRE 6 — ENVIRONNEMENT PROFESSIONNEL (CFA) =====

    // IND 23 — Veille légale et réglementaire
    add("cfa_c6i23_veille_reglementaire", "CT6 - IND 23 VEILLE RÉGLEMENTAIRE", 6, 23, "tableau_veille", { type: "réglementaire" });
    add("cfa_c6i23_pdf_guide_qualiopi", "CT6 - IND 23 V9 GUIDE DE LECTURE QUALIOPI", 6, 23, "pdf_static", { pdfFile: "v9_guide_lecture_qualiopi.pdf" });
    add("cfa_c6i23_veille_sourcee", "CT6 - IND 23 VEILLE RÉGLEMENTAIRE SOURCÉE (dont décret n° 2026-728)", 6, 23, "veille_sourcee_cfa");

    // IND 24 — Veille métiers et emplois
    add("cfa_c6i24_tableau_veille_metier", "CT6 - IND 24 TABLEAU DE VEILLE MÉTIER", 6, 24, "tableau_veille", { type: "métier" });

    // IND 25 — Veille innovations pédagogiques et technologiques
    add("cfa_c6i25_tableau_veille_techno", "CT6 - IND 25 TABLEAU DE VEILLE TECHNOLOGIQUE", 6, 25, "tableau_veille", { type: "technologique" });

    // IND 26 — Accueil et accompagnement handicap
    add("cfa_c6i26_veille_handicap", "CT6 - IND 26 VEILLE HANDICAP", 6, 26, "tableau_veille", { type: "handicap" });
    add("cfa_c6i26_pdf_referentiel_defi", "CT6 - IND 26 RÉFÉRENTIEL HANDICAP DÉFI MÉTIER", 6, 26, "pdf_static", { pdfFile: "referentiel_handicap_defi_metier.pdf" });
    add("cfa_c6i26_pdf_agefiph_fiche", "CT6 - IND 26 AGEFIPH FICHE PRATIQUE QUALITÉ", 6, 26, "pdf_static", { pdfFile: "agefiph_fiche_pratique_qualite.pdf" });
    add("cfa_c6i26_pdf_agefiph_contacts", "CT6 - IND 26 AGEFIPH RHF CONTACTS", 6, 26, "pdf_static", { pdfFile: "agefiph_rhf_contacts.pdf" });
    if (isIDF) add("cfa_c6i26_pdf_fiche_rhf_idf", "CT6 - IND 26 FICHE TECHNIQUE RHF IDF", 6, 26, "pdf_static", { pdfFile: "fiche_technique_rhf_idf.pdf" });
    add("cfa_c6i26_pdf_recruter_handicap", "CT6 - IND 26 COMMENT RECRUTER UNE PERSONNE HANDICAPÉE", 6, 26, "pdf_static", { pdfFile: "handicap_comment_recruter.pdf" });
    add("cfa_c6i26_pdf_procedure_communiquer", "CT6 - IND 26 PROCÉDURE COMMUNIQUER AVEC DES PERSONNES HANDICAPÉES", 6, 26, "pdf_static", { pdfFile: "procedure_communiquer_handicap.pptx" });

    // IND 27 — Sous-traitance et partenariats
    add("cfa_c6i27_registre_sous_traitance", "CT6 - IND 27 REGISTRE DE SOUS-TRAITANCE ET DE PORTAGE SALARIAL", 6, 27, "registre_sous_traitance_portage_cfa", { typePrestation: "CFA" });
    add("cfa_c6i27_clauses_qualite", "CT6 - IND 27 ANNEXE – CLAUSES QUALITÉ DES CONTRATS DE SOUS-TRAITANCE ET DE PORTAGE", 6, 27, "clauses_qualite_contrat_cfa", { typePrestation: "CFA" });
    add("cfa_c6i27_partenaires", "CT6 - IND 27 LES PARTENAIRES", 6, 27, "liste_partenaires");
    if (hasExternalFormateur) add("cfa_c6i27_contrat_sous_traitance", "CT6 - IND 27 CONTRAT DE SOUS-TRAITANCE DE FORMATEUR", 6, 27, "contrat_sous_traitance_v2");
    add("cfa_c6i27_charte_qualite_formateur", "CT6 - IND 27 CHARTE QUALITÉ FORMATEUR EXTERNE", 6, 27, "charte_qualite_formateur_externe");
    add("cfa_c6i27_mandat_qualiopi", "CT6 - IND 27 MANDAT DE PRÉSENTATION ET DE GESTION QUALIOPI", 6, 27, "mandat_qualiopi");
    add("cfa_c6i27_pdf_guide_qualiopi", "CT6 - IND 27 V9 GUIDE DE LECTURE QUALIOPI", 6, 27, "pdf_static", { pdfFile: "v9_guide_lecture_qualiopi.pdf" });
    // Checklist formateur — un fichier par session (groupé par dates)
    {
      const f0 = formations[0];
      const sessionsMapCkC = new Map<string, { debut: string; fin: string }>();
      stagiaires.forEach(s => {
        const debut = s.dateDebutFormation || f0?.dateDebut || "";
        const fin = s.dateFinFormation || f0?.dateFin || "";
        const key = `${debut}|${fin}`;
        if (!sessionsMapCkC.has(key)) sessionsMapCkC.set(key, { debut, fin });
      });
      if (sessionsMapCkC.size === 0) {
        sessionsMapCkC.set("default", { debut: f0?.dateDebut || "", fin: f0?.dateFin || "" });
      }
      const fmtShortCkC = (d: string) => d ? d.split("-").reverse().join("/") : "";
      Array.from(sessionsMapCkC.values()).forEach((sess, idx) => {
        const label = sess.debut && sess.fin ? `Session ${fmtShortCkC(sess.debut)} – ${fmtShortCkC(sess.fin)}` : `Session ${idx + 1}`;
        if (hasExternalFormateur) add(`cfa_c6i27_checklist_formateur_s${idx}`, `CT6 - IND 27 CHECKLIST FORMATEUR – ${label}`, 6, 27, "checklist_formateur", { sessionDebut: sess.debut, sessionFin: sess.fin });
      });
    }

    // IND 28 — Mobilisation des acteurs économiques et sociaux
    add("cfa_c6i28_annuaire_entreprises", "CT6 - IND 28 ANNUAIRE DES ENTREPRISES PARTENAIRES", 6, 28, "annuaire_entreprises_partenaires_cfa");
    add("cfa_c6i28_cr_coconstruction", "CT6 - IND 28 COMPTE RENDU DE CO-CONSTRUCTION DE L'INGÉNIERIE AVEC LES PARTENAIRES", 6, 28, "cr_coconstruction_branche_cfa");
    add("cfa_c6i28_orientation_pour_tous", "CT6 - IND 28 📁 ORIENTATION POUR TOUS", 6, 28, "pdf_static", { pdfUrl: "/pdfs/citoyennete/orientation_pour_tous.png" });
    add("cfa_c6i28_maitre_apprentissage_fiche", "CT6 - IND 28 📁 FICHE MAÎTRE D'APPRENTISSAGE 2025", 6, 28, "pdf_static", { pdfUrl: "/pdfs/citoyennete/maitre_apprentissage_fiche_2025.pdf" });
    add("cfa_c6i28_reseau_partenaires", "CT6 - IND 28 📁 RÉSEAU DE PARTENAIRES SOCIO-ÉCONOMIQUES", 6, 28, "pdf_static", { pdfUrl: "/__l5e/assets-v1/11ae6dae-236e-44e0-bdb6-9c31dabdf1ef/reseau_partenaires_socio_economiques.pdf" });

    // IND 29 — Insertion professionnelle et poursuite d'études
    add("cfa_c6i29_procedure_insertion", "CT6 - IND 29 PROCÉDURE INSERTION PROFESSIONNELLE ET POURSUITE D'ÉTUDES", 6, 29, "procedure_insertion_poursuite_etudes_cfa");
    add("cfa_c6i29_suivi_insertion", "CT6 - IND 29 SUIVI DE L'INSERTION PROFESSIONNELLE DES APPRENTIS", 6, 29, "suivi_insertion_pro_cfa");
    formations.forEach((f, fi) => {
      add(`cfa_c6i29_suivi3mois_${fi}`, `CT6 - IND 29 SUIVI À 3 MOIS`, 6, 29, "suivi_3_mois", { fi });
      add(`cfa_c6i29_insertion_${fi}`, `CT6 - IND 29 QUESTIONNAIRE D'INSERTION`, 6, 29, "questionnaire_insertion", { fi });
    });
    add("cfa_c6i29_savoir_se_vendre", "CT6 - IND 29 📁 SAVOIR SE VENDRE – GUIDE MYCVFACTORY", 6, 29, "pdf_static", { pdfUrl: "/pdfs/citoyennete/savoir_se_vendre_guide.pdf" });
    add("cfa_c6i29_atelier_entretien", "CT6 - IND 29 📁 ATELIER D'ENTRETIEN D'EMBAUCHE", 6, 29, "pdf_static", { pdfUrl: "/__l5e/assets-v1/e2494eb0-5ff2-46ca-b54d-c50a9636f2ca/atelier_entretien_embauche.pdf" });
    add("cfa_c6i29_15_idees_cv", "CT6 - IND 29 📁 15 IDÉES POUR UN CV", 6, 29, "pdf_static", { pdfUrl: "/pdfs/citoyennete/15_idees_pour_un_cv.pdf" });

    // ===== CRITÈRE 7 — AMÉLIORATION CONTINUE (CFA) =====

    // IND 30 — Appréciations et amélioration continue
    // Évaluation formateur — un fichier par stagiaire
    stagiaires.forEach((s, si) => {
      add(`cfa_c7i30_eval_formateur_${si}`, `CT7 - IND 30 ÉVALUATION FORMATEUR – ${s.prenom} ${s.nom}`, 7, 30, "enquete_satisfaction_formateur", { stagiaireIdx: si });
    });
    // Auto-évaluation formateur — un fichier par session (groupé par dates)
    {
      const f0 = formations[0];
      const sessionsMap = new Map<string, { debut: string; fin: string }>();
      stagiaires.forEach(s => {
        const debut = s.dateDebutFormation || f0?.dateDebut || "";
        const fin = s.dateFinFormation || f0?.dateFin || "";
        const key = `${debut}|${fin}`;
        if (!sessionsMap.has(key)) sessionsMap.set(key, { debut, fin });
      });
      if (sessionsMap.size === 0) {
        sessionsMap.set("default", { debut: f0?.dateDebut || "", fin: f0?.dateFin || "" });
      }
      const fmtShort = (d: string) => d ? d.split("-").reverse().join("/") : "";
      const _nowC = new Date();
      Array.from(sessionsMap.values()).forEach((sess, idx) => {
        const label = sess.debut && sess.fin ? `Session ${fmtShort(sess.debut)} – ${fmtShort(sess.fin)}` : `Session ${idx + 1}`;
        const finPassee = sess.fin ? new Date(sess.fin) < _nowC : false;
        if (finPassee) add(`cfa_c7i30_autoevaluation_formateur_s${idx}`, `CT7 - IND 30 AUTO-ÉVALUATION FORMATEUR – ${label}`, 7, 30, "autoevaluation_formateur", { sessionDebut: sess.debut, sessionFin: sess.fin });
      });
    }
    stagiaires.forEach((s, si) => {
      add(`cfa_c7i30_bilan_chaud_${si}`, `CT7 - IND 30 BILAN À CHAUD – ${s.prenom} ${s.nom}`, 7, 30, "bilan_chaud_stagiaire", { stagiaireIdx: si });
    });
    stagiaires.forEach((s, si) => {
      add(`cfa_c7i30_bilan_froid_${si}`, `CT7 - IND 30 BILAN À FROID – ${s.prenom} ${s.nom}`, 7, 30, "bilan_froid_stagiaire", { stagiaireIdx: si });
    });
    add("cfa_c7i30_compte_rendu_formateur", "CT7 - IND 30 COMPTE-RENDU DE FORMATION", 7, 30, "compte_rendu_formateur");
    uniqueFormateursCFA.forEach((fName) => {
      const fname = String(fName).trim();
      const slug = fname.replace(/\s+/g, '_').toUpperCase();
      add(`cfa_c7i30_bilan_fin_formateur_${slug}`, `CT7 - IND 30 BILAN DE FIN DE FORMATION – ${fname}`, 7, 30, "bilan_fin_formation_formateur", { formateurNom: fname });
    });
    stagiaires.forEach((s, si) => {
      add(`cfa_c7i30_appreciations_beneficiaires_${si}`, `CT7 - IND 30 QUESTIONNAIRE DE SATISFACTION – ${s.prenom} ${s.nom}`, 7, 30, "appreciations_beneficiaires_stagiaire", { stagiaireIdx: si });
    });
    add("cfa_c7i30_appreciations_entreprises", "CT7 - IND 30 QUESTIONNAIRE DE SATISFACTION CLIENT COMMANDITAIRE", 7, 30, "appreciations_entreprises");
    add("cfa_c7i30_appreciations_financeurs", "CT7 - IND 30 ENQUÊTE SATISFACTION FINANCEUR", 7, 30, "appreciations_financeurs");
    

    add("cfa_c7i30_pv_session_global", "CT7 - IND 30 PROCÈS-VERBAL GLOBAL DE SESSION", 7, 30, "pv_session_global");

    // IND 31 — Réclamations et dysfonctionnements
    add("cfa_c7i31_formulaire_reclamation", "CT7 - IND 31 FORMULAIRE DE DÉPÔT DE RÉCLAMATION", 7, 31, "formulaire_reclamation");
    add("cfa_c7i31_gestion_reclamations", "CT7 - IND 31 GESTION DES RÉCLAMATIONS ET DYSFONCTIONNEMENTS", 7, 31, "procedure_reclamation");
    add("cfa_c7i31_suivi_dysfonctionnements_excel", "CT7 - IND 31 SUIVI DES DYSFONCTIONNEMENTS INTERNES ET EXTERNES", 7, 31, "suivi_dysfonctionnements_excel");

    // IND 32 — Amélioration continue
    add("cfa_c7i32_tableau_amelioration_excel", "CT7 - IND 32 TABLEAU D'AMÉLIORATION CONTINUE", 7, 32, "tableau_amelioration_continue_excel");
    add("cfa_c7i32_procedure_amelioration", "CT7 - IND 32 PROCÉDURE AMÉLIORATION CONTINUE", 7, 32, "procedure_amelioration_continue");
    add("cfa_c7i32_analyse_risques", "CT7 - IND 32 ANALYSE DES RISQUES SUR LA QUALITÉ DES FORMATIONS", 7, 32, "analyse_risques_qualite_cfa", { typePrestation: "CFA" });

    // IND 33 — Évaluation des contenus et des enseignements par les apprentis (décret n° 2026-728)
    add("cfa_c7i33_procedure", "CT7 - IND 33 PROCÉDURE D'ÉVALUATION DES CONTENUS ET DES ENSEIGNEMENTS", 7, 33, "procedure_evaluation_enseignements_cfa");
    {
      const f0 = formations[0];
      const fiche33 = getRNCPByCode(f0?.codeRNCP || "");
      const blocs33 = fiche33?.blocsCompetences?.length ? fiche33.blocsCompetences.map(b => b.titre)
        : (f0?.referentiel?.blocs?.length ? f0.referentiel.blocs.map(b => `${b.code} — ${b.intitule}`) : [f0?.intitule || "Formation"]);
      blocs33.forEach((titre, bi) => {
        const court = titre.length > 60 ? titre.slice(0, 60) + "…" : titre;
        stagiaires.forEach((s, si) => {
          add(`cfa_c7i33_grille_b${bi}_${si}`, `CT7 - IND 33 ÉVALUATION DES ENSEIGNEMENTS – ${court} – ${s.prenom} ${s.nom}`, 7, 33, "grille_evaluation_enseignements_cfa", { stagiaireIdx: si, blocIdx: bi });
        });
        add(`cfa_c7i33_synthese_b${bi}`, `CT7 - IND 33 SYNTHÈSE PARTAGÉE AVEC L'ÉQUIPE PÉDAGOGIQUE – ${court}`, 7, 33, "synthese_evaluation_enseignements_cfa", { blocIdx: bi });
      });
    }

    // ===========================================================
    // ===== PIÈCES COMPLÉMENTAIRES AUDIT QUALIOPI CFA ==========
    // ===========================================================
    // IND 13 — Grille de compétences alternance nominative (retirée)
    // IND 16 — Procédure de respect des exigences du certificateur
    const hasRsrncpCFAGap = formations.some(f => isCodeRsrncp(f.codeRNCP));
    if (hasRsrncpCFAGap) {
      add("cfa_c3i16_procedure_respect_certificateur", "CT3 - IND 16 PROCÉDURE DE RESPECT DES EXIGENCES DU CERTIFICATEUR", 3, 16, "procedure_respect_certificateur_cfa");
      // IND 16 — DP & ECF officiels par stagiaire (titres professionnels uniquement)
      if (isTitrePro) stagiaires.forEach((s, si) => {
        add(`cfa_c3i16_dp_officiel_${si}`, `CT3 - IND 16 DOSSIER PROFESSIONNEL (DP) – ${s.prenom} ${s.nom}`, 3, 16, "dp_officiel", { stagiaireIdx: si });
        add(`cfa_c3i16_ecf_officiel_${si}`, `CT3 - IND 16 LIVRET ECF – ${s.prenom} ${s.nom}`, 3, 16, "ecf_officiel", { stagiaireIdx: si });
      });
    }
    // IND 17 — Inventaire des moyens
    
    // IND 18 — Fiches de poste + CR réunion
    
    add("cfa_c4i18_cr_reunion_pedagogique", "CT4 - IND 18 COMPTE-RENDU DE RÉUNION PÉDAGOGIQUE", 4, 18, "cr_reunion_pedagogique_cfa");
    // IND 19 — Guide assistance FOAD
    add("cfa_c4i19_guide_assistance_foad", "CT4 - IND 19 GUIDE D'ASSISTANCE TECHNIQUE ET PÉDAGOGIQUE FOAD", 4, 19, "guide_assistance_foad_cfa");
    // IND 20 — Lettres de mission (retirées)
    // IND 21 — Grilles recrutement + évaluation (retirées)
    // IND 22 — Entretien professionnel annuel
    if (hasExternalFormateur) add("cfa_c5i22_entretien_pro_annuel", "CT5 - IND 22 ENTRETIEN PROFESSIONNEL ANNUEL INTERVENANT", 5, 22, "entretien_professionnel_annuel_cfa");
    // IND 26 — Annuaire partenaires handicap
    add("cfa_c6i26_annuaire_handicap", "CT6 - IND 26 ANNUAIRE PARTENAIRES HANDICAP APPRENTISSAGE", 6, 26, "annuaire_partenaires_handicap_cfa");
    // IND 29 (critère 7) — retiré (doublon avec CT6 - IND 29)
    // IND 30 — Tableau de relances
    
    // IND 32 — Plan d'action insertion / réduction ruptures
    add("cfa_c7i32_plan_insertion_ruptures", "CT7 - IND 32 PLAN D'ACTION INSERTION & RÉDUCTION DES RUPTURES", 7, 32, "plan_insertion_reduction_ruptures_cfa");

    // ===========================================================
    // ===== 📁 SITE WEB — Documents publics (sans stagiaire) =====
    // ===========================================================
    // Versions vierges signées/tamponnées, prêtes à être publiées sur le site internet du CFA.
    // Toutes utilisent { genericStagiaire: true } pour neutraliser les noms/prénoms stagiaires.
    add("cfa_siteweb_navigations", "📁 SITE WEB – Navigations (Plan du site)", 1, 1, "pdf_static", { pdfUrl: "/pdfs/site_web/navigations.pdf" });
    add("cfa_siteweb_mentions_legales", "📁 SITE WEB – Mentions légales", 1, 1, "mentions_legales", { genericStagiaire: true });
    add("cfa_siteweb_cgv", "📁 SITE WEB – Conditions Générales de Vente (CGV)", 1, 1, "cgv_cfa", { genericStagiaire: true, stagiaireIdx: 0 });
    add("cfa_siteweb_reglement_interieur", "📁 SITE WEB – Règlement intérieur", 3, 9, "reglement_interieur_cfa_v2", { genericStagiaire: true, stagiaireIdx: 0 });
    add("cfa_siteweb_annexes_reglement", "📁 SITE WEB – Annexes du règlement intérieur", 3, 9, "pdf_static", { pdfUrl: "/pdfs/site_web/annexes_reglement_interieur.pdf" });
    add("cfa_siteweb_droits_devoirs", "📁 SITE WEB – Droits et devoirs de l'apprenti", 3, 9, "droits_devoirs_apprenti_cfa", { genericStagiaire: true });
    add("cfa_siteweb_14_missions", "📁 SITE WEB – Les 14 missions du CFA", 3, 10, "site_web_14_missions_cfa");
    add("cfa_siteweb_livret_accueil", "📁 SITE WEB – Livret d'accueil de l'apprenti", 3, 9, "livret_accueil_cfa_v2", { genericStagiaire: true, stagiaireIdx: 0 });
    add("cfa_siteweb_livret_apprentissage", "📁 SITE WEB – Livret d'apprentissage", 2, 5, "livret_apprentissage_cfa_v2", { genericStagiaire: true, stagiaireIdx: 0 });
    
    if (isIDF) add("cfa_siteweb_aides_sociales", "📁 SITE WEB – Aides sociales (ARA, équipement, santé psy, Imagine R)", 3, 14, "pdf_static", { pdfUrl: "/pdfs/site_web/aides_sociales.pdf" });
    add("cfa_siteweb_atelier_entretien", "📁 SITE WEB – Atelier préparation entretien", 6, 29, "site_web_atelier_entretien_cfa");
    add("cfa_siteweb_atelier_cv", "📁 SITE WEB – Atelier CV", 6, 29, "site_web_atelier_cv_cfa");
  }

  // ===== Bilan de compétences =====
  // Le dossier BDC complet (trame NT Conseils — 51 docs + 5 trames Excel/PDF) est généré
  // exclusivement via le bouton "Télécharger le dossier complet" (buildBDCNTConseilsZip).
  // Aucune entrée individuelle dans le catalogue pour les BDC.
  if (isBDC) {
    // Un document de catalogue par fichier source BDC (NT Conseils).
    // Classement automatique : critère ← indicateur extrait de la clé.
    const bdcKeys = Object.keys(BDC_NT_SOURCE).sort();
    const slug = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "").toLowerCase().slice(0, 60);
    bdcKeys.forEach((key) => {
      const ind = indicateurFromKey(key);
      const crit = critereForIndicateur(ind);
      const title = bdcDocTitle(key);
      const isPerBen = BDC_NT_PER_BENEFICIAIRE.has(key);
      if (isPerBen && stagiaires.length > 0) {
        stagiaires.forEach((s, si) => {
          add(
            `bdc_nt_${slug(key)}_s${si}`,
            `CT${crit} - IND ${ind} ${title} – ${s.prenom} ${s.nom}`,
            crit, ind, "bdc_nt_doc_per_ben",
            { sourceKey: key, stagiaireIdx: si },
          );
        });
      } else {
        add(
          `bdc_nt_${slug(key)}`,
          `CT${crit} - IND ${ind} ${title}`,
          crit, ind, "bdc_nt_doc",
          { sourceKey: key },
        );
      }
    });
    BDC_NT_STATS_FILES.forEach((file, idx) => {
      add(
        `bdc_nt_ind2_justificatif_${idx}`,
        `CT1 - IND 2 ${file.name.replace(/\.xlsx$/i, "")}`,
        1, 2, "bdc_nt_stats_xlsx",
        { statsIndex: idx },
      );
    });
    // CR individuel d'entretien à 6 mois — un fichier par bénéficiaire (cohérent avec le suivi global)
    stagiaires.forEach((s, si) => {
      add(
        `bdc_nt_ind2_cr6mois_s${si}`,
        `CT1 - IND 2 CR entretien à 6 mois – ${s.prenom} ${s.nom}`,
        1, 2, "bdc_nt_cr6mois_stagiaire",
        { stagiaireIdx: si },
      );
    });
    // Trames Excel dynamiques (générées comme les autres docs xlsx, prévisualisables et téléchargeables en .xlsx)
    add("bdc_nt_calendrier_annuel", "CT1 - IND 1 Calendrier annuel (Excel)", 1, 1, "bdc_nt_calendrier_annuel");
    add("bdc_nt_suivi_adaptation", "CT3 - IND 10 Suivi de l'adaptation à l'accompagnement (Excel)", 3, 10, "bdc_nt_suivi_adaptation");
    // Programme réglementaire des 3 phases du bilan (Art. R.6313-4 à R.6313-8)
    add("bdc_nt_programme_phases", "CT3 - IND 10 Programme des 3 phases du bilan de compétences", 3, 10, "bdc_nt_programme_phases");
    add("bdc_nt_phase_1", "CT3 - IND 10 Phase 1 – Phase préliminaire", 3, 10, "bdc_nt_phase", { phase: 1 });
    add("bdc_nt_phase_2", "CT3 - IND 10 Phase 2 – Phase d'investigation", 3, 10, "bdc_nt_phase", { phase: 2 });
    add("bdc_nt_phase_3", "CT3 - IND 10 Phase 3 – Phase de conclusion & suivi à 6 mois", 3, 10, "bdc_nt_phase", { phase: 3 });
    add("bdc_nt_contacts_handicap", "CT6 - IND 26 Contacts & suivi handicap (Excel)", 6, 26, "bdc_nt_contacts_handicap");
    add("bdc_nt_tableau_dysfonctionnements", "CT7 - IND 31 Tableau d'analyse des appréciations & réclamations (Excel)", 7, 31, "bdc_nt_tableau_dysfonctionnements");
    // BLOC 4 — pièces obligatoires BC (synthèse R6313-8, émargements, satisfaction, RGPD…)
    BDC_TEMPLATES_MANQUANTS.forEach((def, idx) => {
      const ind = def.indicateur;
      const crit = critereForIndicateur(ind);
      const titre = def.nom.replace(/^Indicateur\s+\d+(\s*[&et]+\s*\d+)*\s*-\s*/i, "");
      if (def.parBeneficiaire && stagiaires.length > 0) {
        stagiaires.forEach((s, si) => {
          add(
            `bdc_bc_tpl_${idx}_s${si}`,
            `CT${crit} - IND ${ind} ${titre} – ${s.prenom} ${s.nom}`,
            crit, ind, "bdc_bc_template",
            { templateIdx: idx, stagiaireIdx: si },
          );
        });
      } else {
        add(
          `bdc_bc_tpl_${idx}`,
          `CT${crit} - IND ${ind} ${titre}`,
          crit, ind, "bdc_bc_template",
          { templateIdx: idx },
        );
      }
    });

    // Ressources statiques restantes (PDF non générables dynamiquement)
    BDC_NT_STATIC_ASSETS.forEach((a, idx) => {
      if (!/\.pdf$/i.test(a.src)) return;
      const fileName = a.zipPath.split("/").pop() || a.zipPath;
      const folder = a.zipPath.includes("/") ? a.zipPath.split("/")[0] : "";
      const ind = folder ? indicateurFromKey(folder) : 1;
      const crit = critereForIndicateur(ind);
      add(
        `bdc_nt_asset_${idx}`,
        `CT${crit} - IND ${ind} ${fileName} (ressource)`,
        crit, ind, "bdc_nt_asset",
        { assetSrc: a.src, assetName: fileName },
      );
    });
  }



  // ===== VAE — VALIDATION DES ACQUIS DE L'EXPÉRIENCE =====
  if (isVAE) {

    // ===== CRITÈRE 1 — INFORMATION DU PUBLIC =====
    add("vae_c1i1_plaquette", "CT1 - IND 1 Présentation de la VAE", 1, 1, "vae_plaquette_info");
    add("vae_c1i1_diffusion_info", "CT1 - IND 1 Diffusion d'information sur la VAE", 1, 1, "vae_diffusion_info");
    add("vae_c1i1_procedure_info", "CT1 - IND 1 Procédure d'information du public VAE", 1, 1, "vae_procedure_info");
    add("vae_c1i2_indicateurs_resultats", "CT1 - IND 2 Indicateurs de résultats VAE", 1, 2, "vae_indicateurs_resultats");
    add("vae_c1i2_indicateurs_previsionnels", "CT1 - IND 2 Indicateurs prévisionnels VAE (Excel)", 1, 2, "vae_indicateurs_previsionnels");
    add("vae_c1i2_presentation_nouvel_entrant", "CT1 - IND 2 Présentation activité VAE", 1, 2, "vae_presentation_nouvel_entrant");
    add("vae_c1i3_taux_certification", "CT1 - IND 3 Taux d'obtention des certifications VAE", 1, 3, "vae_taux_certification");
    add("vae_c1i3_info_certification", "CT1 - IND 3 Information certification professionnelle", 1, 3, "vae_info_certification");

    // ===== CRITÈRE 2 — OBJECTIFS ET ADAPTATION =====
    // IND 4 — Analyse du besoin
    add("vae_c2i4_process_analyse_besoin", "CT2 - IND 4 Process Analyse du besoin VAE", 2, 4, "vae_process_analyse_besoin");
    add("vae_c2i4_entretien_faisabilite", "CT2 - IND 4 Entretien de faisabilité VAE", 2, 4, "vae_entretien_faisabilite");
    stagiaires.forEach((s, si) => {
      add(`vae_c2i4_analyse_besoin_${si}`, `CT2 - IND 4 Analyse du besoin bénéficiaire – ${s.prenom} ${s.nom}`, 2, 4, "vae_analyse_besoin", { stagiaireIdx: si });
      add(`vae_c2i4_diagnostic_${si}`, `CT2 - IND 4 Diagnostic de faisabilité – ${s.prenom} ${s.nom}`, 2, 4, "vae_diagnostic_faisabilite", { stagiaireIdx: si });
      add(`vae_c2i4_livret1_${si}`, `CT2 - IND 4 Livret 1 VAE – Dossier de recevabilité – ${s.prenom} ${s.nom}`, 2, 4, "vae_livret1_recevabilite", { stagiaireIdx: si });
      add(`vae_c2i4_contrat_accompagnement_${si}`, `CT2 - IND 4 Contrat d'accompagnement VAE – ${s.prenom} ${s.nom}`, 2, 4, "vae_contrat_accompagnement", { stagiaireIdx: si });
      add(`vae_c2i4_convention_tripartite_${si}`, `CT2 - IND 4 Convention tripartite VAE – ${s.prenom} ${s.nom}`, 2, 4, "vae_convention_tripartite", { stagiaireIdx: si });
    });
    add("vae_c2i4_handicap_entretien", "CT2 - IND 4 Accueil handicap – Entretien", 2, 4, "vae_handicap_entretien");
    add("vae_c2i4_handicap_formalisation", "CT2 - IND 4 Accueil handicap – Formalisation", 2, 4, "vae_handicap_formalisation");
    add("vae_c2i4_handicap_bilan", "CT2 - IND 4 Accueil handicap – Bilan", 2, 4, "vae_handicap_bilan");
    add("vae_c2i4_mail_handicap", "CT2 - IND 4 Mail type handicap", 2, 4, "vae_mail_handicap");

    // IND 5 — Objectifs opérationnels
    add("vae_c2i5_referentiel_accompagnement", "CT2 - IND 5 Référentiel d'accompagnement VAE", 2, 5, "vae_referentiel_accompagnement");
    add("vae_c2i5_engagements_respectifs", "CT2 - IND 5 Engagements respectifs VAE", 2, 5, "vae_engagements_respectifs");

    // IND 6 — Contenus et modalités adaptés
    add("vae_c2i6_programme_accompagnement", "CT2 - IND 6 Programme d'accompagnement VAE", 2, 6, "vae_programme_accompagnement");
    stagiaires.forEach((s, si) => {
      add(`vae_c2i6_livret2_vae_${si}`, `CT2 - IND 6 Livret 2 VAE – Dossier de validation – ${s.prenom} ${s.nom}`, 2, 6, "vae_livret2", { stagiaireIdx: si });
    });
    add("vae_c2i6_sequencage_vae", "CT2 - IND 6 Séquençage de la VAE", 2, 6, "vae_sequencage");

    // IND 8 — Positionnement à l'entrée
    stagiaires.forEach((s, si) => {
      add(`vae_c2i8_positionnement_debut_${si}`, `CT2 - IND 8 Positionnement début – ${s.prenom} ${s.nom}`, 2, 8, "vae_positionnement_debut", { stagiaireIdx: si });
      add(`vae_c2i8_positionnement_fin_${si}`, `CT2 - IND 8 Positionnement fin – ${s.prenom} ${s.nom}`, 2, 8, "vae_positionnement_fin", { stagiaireIdx: si });
    });

    // ===== CRITÈRE 3 — ACCUEIL, ACCOMPAGNEMENT, SUIVI ET ÉVALUATION =====
    // IND 9 — Conditions de déroulement
    add("vae_c3i9_livret_accueil", "CT3 - IND 9 Livret d'accueil VAE", 3, 9, "vae_livret_accueil");
    add("vae_c3i9_cgv", "CT3 - IND 9 Conditions générales de vente VAE", 3, 9, "vae_cgv");
    add("vae_c3i9_reglement_interieur", "CT3 - IND 9 Règlement intérieur VAE", 3, 9, "vae_reglement_interieur");
    add("vae_c3i9_droit_image", "CT3 - IND 9 Contrat de cession de droit d'image", 3, 9, "vae_droit_image");
    add("vae_c3i9_infos_peripheriques", "CT3 - IND 9 Informations périphériques à la prestation", 3, 9, "vae_infos_peripheriques");
    stagiaires.forEach((s, si) => {
      add(`vae_c3i9_convention_${si}`, `CT3 - IND 9 Convention d'accompagnement VAE – ${s.prenom} ${s.nom}`, 3, 9, "vae_convention_accompagnement", { stagiaireIdx: si });
      add(`vae_c3i9_certificat_realisation_${si}`, `CT3 - IND 9 Certificat de réalisation – ${s.prenom} ${s.nom}`, 3, 9, "vae_certificat_realisation", { stagiaireIdx: si });
    });
    add("vae_c3i9_mail_introduction", "CT3 - IND 9 Mail introduction au processus VAE", 3, 9, "vae_mail_introduction");
    add("vae_c3i9_mail_preparation_dossier", "CT3 - IND 9 Mail préparation à la rédaction du dossier", 3, 9, "vae_mail_preparation_dossier");
    add("vae_c3i9_mail_recap", "CT3 - IND 9 Mail récapitulatif VAE", 3, 9, "vae_mail_recap");
    add("vae_c3i9_mail_suivi_evolution", "CT3 - IND 9 Mail suivi de l'évolution du dossier", 3, 9, "vae_mail_suivi_evolution");
    add("vae_c3i9_mail_preparation_entretien", "CT3 - IND 9 Mail préparation à l'entretien de validation", 3, 9, "vae_mail_preparation_entretien");
    add("vae_c3i9_mail_post_validation", "CT3 - IND 9 Mail suivi post-validation et bilan", 3, 9, "vae_mail_post_validation");
    add("vae_c3i9_mail_envoi_certificat", "CT3 - IND 9 Mail type envoi du certificat de réalisation", 3, 9, "vae_mail_envoi_certificat");

    // IND 10 — Adaptation et accompagnement
    add("vae_c3i10_adaptation_accompagnement", "CT3 - IND 10 Adaptation de l'accompagnement VAE", 3, 10, "vae_adaptation_accompagnement");
    add("vae_c3i10_fiche_pedagogique", "CT3 - IND 10 Fiche pédagogique VAE", 3, 10, "vae_fiche_pedagogique");
    stagiaires.forEach((s, si) => {
      add(`vae_c3i10_fiche_suivi_${si}`, `CT3 - IND 10 Fiche de suivi individuel VAE – ${s.prenom} ${s.nom}`, 3, 10, "vae_fiche_suivi_individuel", { stagiaireIdx: si });
      add(`vae_c3i10_entretien_intermediaire_${si}`, `CT3 - IND 10 Entretien intermédiaire – ${s.prenom} ${s.nom}`, 3, 10, "vae_entretien_intermediaire", { stagiaireIdx: si });
    });

    // IND 11 — Évaluation de l'atteinte des objectifs
    stagiaires.forEach((s, si) => {
      add(`vae_c3i11_dossier_suivi_${si}`, `CT3 - IND 11 Dossier de suivi parcours VAE – ${s.prenom} ${s.nom}`, 3, 11, "vae_dossier_suivi_parcours", { stagiaireIdx: si });
      add(`vae_c3i11_grille_evaluation_${si}`, `CT3 - IND 11 Grille d'évaluation du dossier VAE – ${s.prenom} ${s.nom}`, 3, 11, "vae_grille_evaluation_dossier", { stagiaireIdx: si });
      add(`vae_c3i11_emargement_${si}`, `CT3 - IND 11 Feuille d'émargement VAE – ${s.prenom} ${s.nom}`, 3, 11, "vae_emargement", { stagiaireIdx: si });
      add(`vae_c3i11_temps_connexion_${si}`, `CT3 - IND 11 Temps de connexion VAE – ${s.prenom} ${s.nom}`, 3, 11, "vae_temps_connexion", { stagiaireIdx: si });
      add(`vae_c3i11_rapport_connexion_${si}`, `CT3 - IND 11 Rapport de connexion LMS VAE – ${s.prenom} ${s.nom}`, 3, 11, "vae_rapport_connexion", { stagiaireIdx: si });
    });

    // IND 12 — Engagement et prévention des ruptures
    add("vae_c3i12_procedure_abandon", "CT3 - IND 12 Procédure de prévention des abandons VAE", 3, 12, "vae_procedure_abandon");
    add("vae_c3i12_eviter_echec", "CT3 - IND 12 Éviter les situations d'échec VAE", 3, 12, "vae_eviter_echec");
    add("vae_c3i12_favoriser_engagement", "CT3 - IND 12 Favoriser l'engagement des bénéficiaires", 3, 12, "vae_favoriser_engagement");
    add("vae_c3i12_guide_entretien_abandons", "CT3 - IND 12 Guide d'entretien des abandons", 3, 12, "vae_guide_entretien_abandons");
    add("vae_c3i12_mail_relance_abandon", "CT3 - IND 12 Mail type relance abandon", 3, 12, "vae_mail_relance_abandon");
    stagiaires.forEach((s, si) => {
      add(`vae_c3i12_attestation_assiduite_${si}`, `CT3 - IND 12 Attestation d'assiduité VAE – ${s.prenom} ${s.nom}`, 3, 12, "vae_attestation_assiduite", { stagiaireIdx: si });
    });

    // IND 16 — Présentation à la certification
    const hasRsrncpVAE = formations.some(f => isCodeRsrncp(f.codeRNCP));
    if (hasRsrncpVAE) {
      add("vae_c3i16_procedure_jury", "CT3 - IND 16 Procédure de passage devant le jury VAE", 3, 16, "vae_procedure_jury");
      add("vae_c3i16_mail_conditions_certification", "CT3 - IND 16 Mail conditions de présentation aux certifications", 3, 16, "vae_mail_conditions_certification");
      stagiaires.forEach((s, si) => {
        add(`vae_c3i16_convocation_jury_${si}`, `CT3 - IND 16 Convocation jury VAE – ${s.prenom} ${s.nom}`, 3, 16, "vae_convocation_jury", { stagiaireIdx: si });
        add(`vae_c3i16_pv_jury_${si}`, `CT3 - IND 16 Procès-verbal de jury VAE – ${s.prenom} ${s.nom}`, 3, 16, "vae_pv_jury", { stagiaireIdx: si });
        add(`vae_c3i16_notification_decision_${si}`, `CT3 - IND 16 Notification de décision VAE – ${s.prenom} ${s.nom}`, 3, 16, "vae_notification_decision", { stagiaireIdx: si });
      });
    }

    // ===== CRITÈRE 4 — ADÉQUATION DES MOYENS =====
    add("vae_c4i17_moyens_dedies", "CT4 - IND 17 Moyens dédiés à l'accompagnement VAE", 4, 17, "vae_moyens_dedies");
    add("vae_c4i17_mail_aide_connexion", "CT4 - IND 17 Mail type aide à la connexion (distanciel)", 4, 17, "vae_mail_aide_connexion");
    add("vae_c4i17_moyens_techniques_presentiel", "CT4 - IND 17 Moyens techniques et environnement (présentiel)", 4, 17, "vae_moyens_techniques_presentiel");
    add("vae_c4i18_coordination_accompagnateurs", "CT4 - IND 18 Coordination des accompagnateurs VAE", 4, 18, "vae_coordination_accompagnateurs");
    add("vae_c4i18_annuaire_contacts", "CT4 - IND 18 Annuaire des contacts", 4, 18, "vae_annuaire_contacts");
    add("vae_c4i18_differents_poles", "CT4 - IND 18 Les différents pôles", 4, 18, "vae_differents_poles");
    add("vae_c4i19_ressources_vae", "CT4 - IND 19 Ressources mises à disposition VAE", 4, 19, "vae_ressources");

    // ===== CRITÈRE 5 — QUALIFICATION DU PERSONNEL =====
    add("vae_c5i21_fiche_poste_accompagnateur", "CT5 - IND 21 Fiche de poste accompagnateur VAE", 5, 21, "vae_fiche_poste_accompagnateur");
    add("vae_c5i22_plan_dev_accompagnateurs", "CT5 - IND 22 Plan de développement des compétences accompagnateurs VAE", 5, 22, "vae_plan_dev_accompagnateurs");

    // ===== CRITÈRE 6 — ENVIRONNEMENT PROFESSIONNEL =====
    add("vae_c6i23_veille_reglementaire", "CT6 - IND 23 Veille réglementaire VAE", 6, 23, "vae_veille_reglementaire");
    add("vae_c6i26_accessibilite_handicap", "CT6 - IND 26 Accessibilité handicap VAE", 6, 26, "vae_accessibilite_handicap");
    add("vae_c6i27_partenaires_vae", "CT6 - IND 27 Liste des partenaires et certificateurs VAE", 6, 27, "vae_partenaires");

    // ===== CRITÈRE 7 — AMÉLIORATION CONTINUE =====
    stagiaires.forEach((s, si) => {
      add(`vae_c7i30_satisfaction_${si}`, `CT7 - IND 30 Questionnaire de satisfaction VAE – ${s.prenom} ${s.nom}`, 7, 30, "vae_satisfaction", { stagiaireIdx: si });
    });
    add("vae_c7i30_synthese_satisfaction", "CT7 - IND 30 Synthèse des appréciations VAE", 7, 30, "vae_synthese_satisfaction");
    add("vae_c7i31_procedure_reclamation", "CT7 - IND 31 Procédure de réclamation VAE", 7, 31, "vae_procedure_reclamation");
    add("vae_c7i32_plan_amelioration", "CT7 - IND 32 Plan d'amélioration continue VAE", 7, 32, "vae_plan_amelioration");
  }

  // =============================================
  // ===== MAIL — MAILS D'ENVOI (per stagiaire) =====
  // =============================================
  if (isAF || isCFA) {
    stagiaires.forEach((s, si) => {
      add(`mail_pre_inscription_${si}`, `MAIL - PRÉ-INSCRIPTION – ${s.prenom} ${s.nom}`, 0, 0, "mail_pre_inscription", { stagiaireIdx: si });
      add(`mail_inscription_${si}`, `MAIL - CONFIRMATION INSCRIPTION – ${s.prenom} ${s.nom}`, 0, 0, "mail_inscription", { stagiaireIdx: si });
      add(`mail_rdv_eval_${si}`, `MAIL - 1er RENDEZ-VOUS (Évaluation des besoins + Test positionnement) – ${s.prenom} ${s.nom}`, 0, 0, "mail_rdv_evaluation_besoins", { stagiaireIdx: si });
      add(`mail_convocation_${si}`, `MAIL - CONVOCATION – ${s.prenom} ${s.nom}`, 0, 0, "mail_convocation", { stagiaireIdx: si });
      add(`mail_envoi_contrat_convocation_ri_${si}`, `MAIL - ENVOI CONTRAT + CONVOCATION + RÈGLEMENT INTÉRIEUR – ${s.prenom} ${s.nom}`, 0, 0, "mail_envoi_contrat_convocation_ri", { stagiaireIdx: si });
      add(`mail_envoie_sc_${si}`, `MAIL - ENVOI SC ET RESSOURCES – ${s.prenom} ${s.nom}`, 0, 0, "mail_envoie_sc_ressources", { stagiaireIdx: si });
      add(`mail_deroulement_examen_${si}`, `MAIL - DÉROULEMENT EXAMEN VTC (RS5637) – ${s.prenom} ${s.nom}`, 0, 0, "mail_deroulement_examen_vtc", { stagiaireIdx: si });
      add(`mail_fin_formation_${si}`, `MAIL - BILAN À CHAUD – ${s.prenom} ${s.nom}`, 0, 0, "mail_fin_formation", { stagiaireIdx: si });
      add(`mail_bilan_froid_${si}`, `MAIL - BILAN À FROID (3 mois après) – ${s.prenom} ${s.nom}`, 0, 0, "mail_bilan_froid_3mois", { stagiaireIdx: si });
      add(`mail_invitation_formateur_externe_${si}`, `MAIL - INVITATION FORMATEUR EXTERNE (Nabih Ouardani) – Session ${s.prenom} ${s.nom}`, 0, 0, "mail_invitation_formateur_externe", { stagiaireIdx: si });
    });
    // Mail conversation élève ↔ formateur Nabih (1 seul stagiaire)
    if (stagiaires[0]) {
      const s0 = stagiaires[0];
      add(`mail_questions_vtc_${0}`, `MAIL - QUESTIONS FORMATION VTC (Échange ${s0.prenom} ${s0.nom} ↔ Nabih)`, 0, 0, "mail_questions_formation_vtc", { stagiaireIdx: 0 });
    }
    // Mail conversation Bilal Nouira ↔ Start Formation (demande aménagement MDPH)
    add(`mail_amenagement_mdph_bilal`, `MAIL - DEMANDE AMÉNAGEMENT MDPH (Échange Bilal Nouira ↔ Start Formation)`, 0, 0, "mail_amenagement_mdph_bilal");
  }

  // ===== MAIL — Envois hebdomadaires QCM 14 missions (CFA uniquement) =====
  if (isCFA) {
    // Mail CFA → Entreprise pour planifier la visite de suivi en entreprise
    stagiaires.forEach((s, si) => {
      add(
        `mail_visite_entreprise_${si}`,
        `MAIL - 🏢 CFA → Entreprise : Planification visite de suivi – ${s.prenom} ${s.nom}`,
        0,
        0,
        "mail_visite_entreprise_cfa",
        { stagiaireIdx: si },
      );
    });

    // Titres alignés sur la numérotation officielle (art. L.6231-2) de MISSIONS_QCM.
    const MISSIONS_TITRES: { num: number; titre: string }[] = MISSIONS_QCM.map((m) => ({
      num: m.numero,
      titre: m.titre.replace(/^Mission \d+\s*—\s*/, "").split(/\s*\(/)[0],
    }));
    // Ne conserver que les mails dont la date d'envoi est ≤ aujourd'hui
    // (les mails futurs — non encore envoyés — sont retirés du dossier).
    const now = new Date();
    const fRef = formations[0];

    stagiaires.forEach((s, si) => {
      MISSIONS_TITRES.forEach((m) => {
        if (!fRef) return;
        const dEnvoi = dateMailMission(fRef, m.num, s);
        if (dEnvoi.getTime() > now.getTime()) return;
        add(
          `mail_mission${m.num}_${si}`,
          `MAIL - ✉️ Envoi QCM Semaine ${String(m.num).padStart(2, "0")} – Mission ${m.num} ${m.titre} – ${s.prenom} ${s.nom}`,
          0,
          0,
          "mail_mission_cfa",
          { stagiaireIdx: si, missionNumero: m.num },
        );
      });
    });

    // ===== MAIL — Annonces de DIFFUSION des 14 missions (J-1) =====
    stagiaires.forEach((s, si) => {
      MISSIONS_TITRES.forEach((m) => {
        if (!fRef) return;
        const dEnvoi = dateMailDiffusionMission(fRef, m.num, s);
        if (dEnvoi.getTime() > now.getTime()) return;
        add(
          `mail_diffusion_mission${m.num}_${si}`,
          `MAIL - 📢 Annonce diffusion J-1 – Mission ${m.num} ${m.titre} – ${s.prenom} ${s.nom}`,
          0,
          0,
          "mail_diffusion_mission_cfa",
          { stagiaireIdx: si, missionNumero: m.num },
        );
      });
    });
  }

  // On ne conserve que les mails réellement générables.
  // Cela évite l'apparition d'un dossier "Critere_0" dans les ZIP et garde l'UI
  // cohérente avec la section MAILS.
  const MAIL_DOCX_TEMPLATES = new Set<string>([
    "mail_pre_inscription",
    "mail_inscription",
    "mail_convocation",
    "mail_envoie_sc_ressources",
    "mail_fin_formation",
    "mail_mission_cfa",
    "mail_diffusion_mission_cfa",
  ]);
  return d.filter((doc) => doc.critere !== 0 || MAIL_DOCX_TEMPLATES.has(doc.template));
}
