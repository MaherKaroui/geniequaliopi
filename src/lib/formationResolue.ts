import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import { SAMPLE_FORMATIONS } from "./sampleData";
import { getRNCPByCode } from "./rncpData";
import { getFicheFC, ficheToReferentiel } from "./franceCompetences";
import { getFormationPreset } from "./formationPresets/registry";

/** Nombre d'heures déduit des dates (7 h par jour ouvré), 0 si incalculable. */
function heuresDepuisDates(deb?: string, fin?: string): number {
  const parse = (x?: string): Date | null => {
    const t = (x || "").trim();
    if (!t) return null;
    const m = t.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    const d = m ? new Date(+m[3], +m[2] - 1, +m[1]) : new Date(t);
    return isNaN(d.getTime()) ? null : d;
  };
  const a = parse(deb), b = parse(fin);
  if (!a || !b || b < a) return 0;
  let n = 0;
  const cur = new Date(a);
  while (cur <= b && n < 400) {
    const dow = cur.getDay();
    if (dow !== 0 && dow !== 6) n++;
    cur.setDate(cur.getDate() + 1);
  }
  return n * 7;
}

/**
 * Formation effectivement utilisée pour générer un dossier.
 *
 * Remplace l'ancien héritage champ par champ de SAMPLE_FORMATIONS[0] (la formation
 * « prothésie ongulaire RS7302 » d'un autre organisme, qui ressortait dès qu'un champ
 * était vide). Chaque champ vide est désormais déduit de la formation elle-même, de sa
 * fiche RNCP/RS connue, du type d'action, de l'organisme et des stagiaires.
 * Sans intitulé, on reste sur l'exemple : c'est l'aperçu de démonstration.
 */
export function resolveFormation(
  userFormation: FormationInfo,
  org?: Partial<OrganismeInfo>,
  stagiaires?: StagiaireInfo[],
): FormationInfo {
  if (!userFormation || !(userFormation.intitule || "").trim()) return SAMPLE_FORMATIONS[0];
  const f: FormationInfo = { ...userFormation };
  const dedicated = getFormationPreset(userFormation)?.data.plan?.formation;
  if (dedicated) {
    for (const key of ["objectifs", "prerequis", "publicVise", "programme", "methodesEvaluation", "moyensPedagogiques"] as const) {
      if (dedicated[key]) f[key] = dedicated[key];
    }
  }
  const v = (x: unknown) => (x == null ? "" : String(x).trim());
  const types = org?.typesActions || [];
  const isVAE = types.includes("vae");
  const isBC = types.includes("bilans-competences");
  const isCFA = types.includes("apprentissage");
  const code = v(f.codeRNCP);
  const fiche = code ? getRNCPByCode(code) : undefined;
  const ref = f.referentiel;
  const intitule = v(f.intitule);
  const competences = (fiche?.blocsCompetences || []).flatMap((b) => b.competences).slice(0, 6);
  const publicNom = isBC ? "le bénéficiaire" : isVAE ? "le candidat" : isCFA ? "l'apprenti" : "le stagiaire";

  if (!v(f.objectifs)) {
    const lignes = competences.length
      ? competences
      : isBC
        ? ["Analyser ses compétences professionnelles et personnelles, ses aptitudes et ses motivations", "Définir un projet professionnel réaliste et, le cas échéant, un projet de formation", "Construire un plan d'action daté pour mettre en œuvre ce projet"]
        : isVAE
          ? ["Identifier les activités de son expérience en rapport direct avec la certification visée", "Rédiger un dossier de validation décrivant précisément ces activités", "Présenter et argumenter son expérience devant le jury"]
          : [`Mettre en œuvre les savoir-faire fondamentaux de la formation « ${intitule} » en situation professionnelle`, "Appliquer les méthodes et outils présentés à des cas concrets de son activité", "Évaluer sa pratique et identifier ses axes de progrès"];
    f.objectifs = `À l'issue de ${isBC ? "la prestation" : isVAE ? "l'accompagnement" : "la formation"}, ${publicNom} sera capable de :\n${lignes.map((l) => `- ${l.replace(/\.$/, "")}.`).join("\n")}`;
  }
  if (!v(f.prerequis)) {
    f.prerequis = v(ref?.prerequis)
      || (isVAE ? "Justifier d'une expérience professionnelle ou bénévole en rapport direct avec la certification visée (aucune durée minimale depuis la loi n° 2022-1598 du 21 décembre 2022)."
        : isBC ? "Aucun prérequis. Le bilan est ouvert à tout actif ; un entretien préalable gratuit vérifie l'adéquation de la démarche."
        : "Aucun prérequis spécifique. Un entretien préalable et un test de positionnement vérifient l'adéquation du projet.");
  }
  if (!v(f.duree)) {
    const h = heuresDepuisDates(f.dateDebut, f.dateFin);
    f.duree = isVAE || isBC ? "24 heures" : h ? `${h} heures (${h / 7} jours)` : "";
  }
  if (!v(f.modalites)) f.modalites = "distanciel";
  if (!v(f.tarif)) f.tarif = "Sur devis";
  if (!v(f.programme)) {
    f.programme = fiche?.blocsCompetences?.length
      ? fiche.blocsCompetences.map((b, i) => `Module ${i + 1} : ${b.titre.replace(/^(Bloc\s*\d+|BC\d+)\s*[–—-]\s*/i, "")}\n${b.competences.slice(0, 4).map((c) => `- ${c}.`).join("\n")}`).join("\n")
      : isBC
        ? "Phase préliminaire : analyse de la demande, définition des besoins, information sur le déroulement (art. R.6313-4 C. trav.).\nPhase d'investigation : analyse des motivations, intérêts, compétences et aptitudes ; exploration de pistes professionnelles.\nPhase de conclusion : synthèse des résultats, projet professionnel et plan d'action ; remise du document de synthèse au seul bénéficiaire."
        : isVAE
          ? "Étape 1 : information, entretien de faisabilité et choix de la certification.\nÉtape 2 : dossier de faisabilité et décision de recevabilité du certificateur.\nÉtape 3 : accompagnement à la rédaction du dossier de validation.\nÉtape 4 : préparation à l'entretien avec le jury (mise en situation)."
          : f.objectifs.split("\n").filter((l) => /^\s*-/.test(l)).map((l, i) => `Module ${i + 1} : ${l.replace(/^\s*-\s*/, "").replace(/\.$/, "")}`).join("\n");
  }
  if (!v(f.methodesEvaluation)) {
    f.methodesEvaluation = isBC
      ? "Entretiens individuels, tests et questionnaires d'investigation, document de synthèse, entretien de suivi à 6 mois, questionnaire de satisfaction."
      : isVAE
        ? "Entretien de faisabilité, grille d'analyse du dossier de validation, entretien intermédiaire, mise en situation d'entretien avec le jury, questionnaire de satisfaction."
        : "Test de positionnement à l'entrée, exercices pratiques corrigés, évaluation finale (QCM et mise en situation), test de fin de formation, questionnaire de satisfaction à chaud et à froid.";
  }
  if (!v(f.moyensPedagogiques)) {
    f.moyensPedagogiques = /pr[ée]sentiel/i.test(f.modalites) && !/distanciel/i.test(f.modalites)
      ? "Salle équipée, vidéoprojecteur, supports de cours remis à chaque participant, exercices corrigés, études de cas."
      : "Classe virtuelle (Google Meet / Zoom), partage d'écran, supports de cours numériques, exercices corrigés, études de cas, assistance par messagerie.";
  }
  if (!v(f.publicVise)) {
    f.publicVise = v(ref?.publicVise)
      || (isCFA ? "Jeunes de 16 à 29 ans révolus en contrat d'apprentissage (sans limite d'âge pour les personnes en situation de handicap)." : "Tout public : salariés, demandeurs d'emploi, indépendants.");
  }
  if (!v(f.delaiAcces)) {
    f.delaiAcces = isCFA
      ? "Entrée possible tout au long de l'année, dans la limite de 3 mois après le début d'exécution du contrat d'apprentissage"
      : "11 jours ouvrés minimum entre l'inscription et l'entrée en formation";
  }
  if (!v(f.lieu)) {
    const adr = [v(org?.adresse), [v(org?.codePostal), v(org?.ville)].filter(Boolean).join(" ")].filter(Boolean).join(", ");
    f.lieu = /pr[ée]sentiel/i.test(f.modalites) && adr ? adr : "Google Meet / Zoom";
  }
  if (!v(f.formateur)) f.formateur = v(org?.responsablePedagogique) || v(org?.dirigeant);
  if (!v(f.nombreParticipants)) f.nombreParticipants = String((stagiaires || []).filter((s) => v(s?.nom)).length || 1);
  // Référentiel officiel (base synchronisée France Compétences) si aucune analyse n'a été enregistrée.
  const fc = code ? getFicheFC(code) : null;
  if (fc && !f.referentiel?.code) f.referentiel = ficheToReferentiel(fc);
  // Le code certification n'est jamais hérité : vide = formation non RS/RNCP (IND 3, 7 et 16 masqués).
  f.codeRNCP = code;
  return f;
}

/** Vrai si le code saisi est une certification RS ou RNCP. */
export function estCertifiante(f?: Partial<FormationInfo>): boolean {
  return /^(RS|RNCP)\d+$/i.test(String(f?.codeRNCP || "").replace(/\s+/g, ""));
}

/**
 * Financeur réellement applicable à chaque stagiaire.
 * Action de formation NON certifiante (ni RS ni RNCP) : pas d'éligibilité au CPF,
 * le financement est toujours personnel (contrat de formation professionnelle,
 * art. L.6353-3 et suivants, rétractation de 10 jours).
 */
export function financeursEffectifs(stagiaires: StagiaireInfo[], f?: Partial<FormationInfo>, org?: Partial<OrganismeInfo>): StagiaireInfo[] {
  const types = org?.typesActions || [];
  const isAF = types.length === 0 || types.includes("actions-formation");
  if (!isAF || estCertifiante(f)) return stagiaires;
  return (stagiaires || []).map((s) => (s && s.financeur !== "Personnel" ? { ...s, financeur: "Personnel" } : s));
}
