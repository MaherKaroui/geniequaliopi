import type { FormationInfo } from "@/types/qualiopi";
import { ORIENTA_RAW } from "./formationPresets/builtinOrienta";

/**
 * Parcours d'Orienta Campus proposés au catalogue (fiches France Compétences vérifiées le 26/10/2026) :
 * - VTest Business English – 4 Skills, RS6905 (EXASSESS, enregistrée du 28/11/2024 au 28/11/2027) : parcours A2, B1, B2, C1 ;
 * - Product builder no-code, RNCP41480 niveau 6 (CONSULTING SCHOOL, du 27/10/2025 au 27/10/2028) : titre complet et blocs.
 * Contenu (besoins, QCM, mises en situation, support) : presets intégrés de formationPresets/builtinOrienta.
 * Dates, lieu, formateur, tarif et effectif restent à saisir.
 */
type Raw = Record<string, any>;
const h = (n: number) => String(n).replace(".", ",");

function vtest(d: Raw): FormationInfo {
  const p = d.programme;
  return {
    intitule: d.titre,
    objectifs: `Formation certifiante.\nObjectif général : ${p.subtitle.charAt(0).toLowerCase()}${p.subtitle.slice(1)} et se préparer au VTest Business English – 4 Skills (RS6905, certificateur EXASSESS), niveau visé ${d.niveau} du CECRL.\nÀ l'issue de la formation, le stagiaire sera capable de :\n${p.objectives.map((o: string) => `- ${o}`).join("\n")}`,
    prerequis: `${p.prerequisites} Le niveau A2 du CECRL est le minimum requis pour valider la certification : il est vérifié par le test de positionnement.`,
    duree: `${d.heures} heures (${h(p.sync_hours)} h de classes virtuelles et ${h(p.async_hours)} h d'e-learning)`,
    dureeSaisiePrioritaire: true,
    modalites: "distanciel",
    tarif: "",
    programme: p.modules.map((m: Raw, i: number) => `Module ${i + 1} – ${m.titre} (${h(m.heures)} h, compétences ${m.competences.join(", ")}) : ${m.objectifs.map((o: string) => o.replace(/^À l'issue du module, l'apprenant est capable de /, "")).join(" ; ")}`).join("\n"),
    methodesEvaluation: `${p.evaluation} Le VTest est passé en ligne : compréhension orale et écrite adaptatives, expression orale notée automatiquement, rédaction de 30 minutes (80 mots en A2, 150 mots en B1 et B2.1, 200 mots à partir de B2.2) ; le certificateur délivre le niveau obtenu pour chacune des 4 compétences.`,
    moyensPedagogiques: `${p.means} Leçons, langue clé, vocabulaire, dialogues traduits, fichiers audio avec transcriptions, studio oral et atelier d'écriture, exercices et quiz corrigés.`,
    publicVise: p.public_target,
    delaiAcces: "14 jours minimum entre la demande d'inscription et l'entrée en formation (11 jours ouvrés minimum pour un financement CPF)",
    dateDebut: "",
    dateFin: "",
    lieu: "",
    nombreParticipants: "",
    formateur: "",
    codeRNCP: "RS6905",
    typeAction: "actions-formation",
  };
}

function pbnc(d: Raw): FormationInfo {
  const bloc = d.bloc as number;
  return {
    intitule: d.titre,
    objectifs: `Formation certifiante.\nObjectif général : ${bloc ? `valider le bloc ${bloc} du titre` : "préparer le titre"} RNCP41480 – Product builder no-code (niveau 6, certificateur CONSULTING SCHOOL, enregistrement valable jusqu'au 27/10/2028) pour concevoir, piloter, développer et déployer des produits numériques reposant sur des outils no-code.\nÀ l'issue de la formation, le stagiaire sera capable de :\n${d.competences.map((c: string) => `- ${c.replace(/^BC0\d-C\d+ — /, "")}`).join("\n")}`,
    prerequis: "Être titulaire d'une certification professionnelle de niveau 5 minimum ou d'un diplôme Bac+2, ou d'une certification de niveau inférieur dans le domaine avec au moins 2 ans d'expérience dans un métier de la chaîne de valeur du numérique (fiche RNCP41480). Maîtrise des fonctions de base d'un ordinateur et d'Internet ; ordinateur avec webcam, micro et connexion stable. Aucun prérequis en programmation. Admission après évaluation des besoins, test de positionnement et entretien individuel.",
    duree: `${d.heures} heures (${d.sync} h de classes virtuelles et ${d.async} h en ligne)`,
    dureeSaisiePrioritaire: true,
    modalites: "distanciel",
    tarif: "",
    programme: d.modules.map((m: Raw) => `${m.titre} (${m.heures} h, compétences ${m.competences.join(", ")})`).join("\n"),
    methodesEvaluation: `Évaluation des besoins et test de positionnement en entrée ; quiz d'autoévaluation par capsule et quiz de validation par module (seuil 70 %) ; cas pratique corrigé par module ; évaluation de synthèse notée sur 20 par bloc ; questionnaires de satisfaction à chaud et à froid. Certification : mise en situation professionnelle individuelle par bloc (dossier professionnel ou produit no-code réalisé, puis soutenance orale synchrone devant le jury) ; chaque bloc peut être validé séparément. L'organisme doit être habilité par CONSULTING SCHOOL à préparer au titre.`,
    moyensPedagogiques: `Classes virtuelles (4 demi-journées de 3 h 30 par module), plateforme e-learning accessible 24 h/24 avec ${bloc ? 35 : 140} capsules vidéo sous-titrées, cas fil rouge « Le Panier Compiégnois », outils no-code professionnels (Airtable, Softr, Make, Stripe, Brevo), énoncés et corrigés des cas pratiques, accompagnement individualisé et préparation du dossier professionnel.`,
    publicVise: "Salariés, demandeurs d'emploi, entrepreneurs, porteurs de projet, chefs de projet, consultants ou professionnels souhaitant concevoir, développer, piloter et déployer des produits numériques sans programmation traditionnelle.",
    delaiAcces: "14 jours minimum entre la demande d'inscription et l'entrée en formation (11 jours ouvrés minimum pour un financement CPF)",
    dateDebut: "",
    dateFin: "",
    lieu: "",
    nombreParticipants: "",
    formateur: "",
    codeRNCP: "RNCP41480",
    typeAction: "actions-formation",
  };
}

export const VTEST_FORMATIONS: FormationInfo[] = ORIENTA_RAW.vtest.map(vtest);
export const PBNC_FORMATIONS: FormationInfo[] = ORIENTA_RAW.pbnc.map(pbnc);
