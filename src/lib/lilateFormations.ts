import type { FormationInfo } from "@/types/qualiopi";
import lilateEn from "@/data/tpPresets/lilate-en.json";
import lilateFle from "@/data/tpPresets/lilate-fle.json";

/**
 * Formations LILATE du catalogue CRM LMS (parcours e-learning, préparation au test
 * délivré par LINGUEO). Dates, lieu, formateur, tarif et effectif restent à saisir.
 */
type Raw = typeof lilateEn;

const programme = (d: Raw) => d.modules.map((m, i) => `Module ${i + 1} – ${m.titre} : ${m.lecons.join(" ; ")}.`).join("\n");
const heures = (d: Raw) => `${Math.round(d.minutes / 60)} heures (parcours e-learning de ${Math.floor(d.minutes / 60)} h ${String(d.minutes % 60).padStart(2, "0")})`;

function formation(d: Raw, langue: "anglais" | "français", test: string): FormationInfo {
  return {
    intitule: d.titre,
    objectifs: `Communiquer en ${langue} en situation professionnelle et se préparer au ${test} (${d.code}, certificateur ${d.certificateur}).\nÀ l'issue de la formation, le stagiaire sera capable de :\n${d.competences.map((c) => `- ${c.replace(/^C\d — /, "")}.`).join("\n")}`,
    prerequis: `Savoir lire et écrire. Aucun niveau minimal en ${langue} n'est exigé : un test de niveau (CECRL A1 à C1) situe le point de départ et oriente le parcours. Disposer d'un ordinateur ou d'une tablette avec connexion internet, haut-parleurs ou casque et micro.`,
    duree: heures(d),
    dureeSaisiePrioritaire: true,
    modalites: "e-learning (distanciel asynchrone), avec accompagnement du formateur",
    tarif: "",
    programme: programme(d),
    methodesEvaluation: `Test de niveau en début de parcours (10 questions, A1 à C1), QCM de fin de leçon adaptés au niveau du stagiaire, exercices écrits et oraux corrigés, évaluation intermédiaire, examen blanc LILATE (20 QCM et 4 exercices, un par compétence ${d.competences.map((c) => c.slice(0, 2)).join(", ")}), questionnaires de satisfaction à chaud et à froid. Le test LILATE est passé auprès du certificateur ${d.certificateur}, qui délivre le niveau obtenu.`,
    moyensPedagogiques: "Plateforme e-learning : vidéos de cours sous-titrées, cours écrits, vocabulaire par niveau, dialogues audio, exercices écrits et oraux avec corrigés, QCM, carnet de notes, agenda et messagerie avec le formateur ; suivi de la progression et des temps de connexion.",
    publicVise: `Salariés, demandeurs d'emploi et indépendants qui doivent utiliser le ${langue} dans leur activité professionnelle (accueil, échanges avec des clients, collègues ou partenaires).`,
    delaiAcces: "14 jours minimum entre la demande d'inscription et l'entrée en formation",
    dateDebut: "",
    dateFin: "",
    lieu: "",
    nombreParticipants: "",
    formateur: "",
    codeRNCP: d.code,
    typeAction: "actions-formation",
  };
}

export const FORMATION_LILATE_EN = formation(lilateEn, "anglais", "Test d'aptitude à travailler en anglais – LILATE");
/**
 * RS6118 : fiche inactive depuis le 24/10/2025 (échéance d'enregistrement), remplacée par RS7314.
 * À n'utiliser que pour les dossiers de sessions antérieures à cette date.
 */
const rs6118 = formation({ ...lilateEn, code: "RS6118" }, "anglais", "Test d'aptitude à travailler en anglais – LILATE");
export const FORMATION_LILATE_EN_RS6118: FormationInfo = {
  ...rs6118,
  intitule: "Test d’aptitude à travailler en anglais – LILATE (RS6118)",
  methodesEvaluation: `${rs6118.methodesEvaluation} Certification RS6118 (LINGUEO) enregistrée le 24/10/2022 et inactive depuis le 24/10/2025, remplacée par RS7314 : réservée aux sessions antérieures au 24/10/2025.`,
};

export const FORMATION_LILATE_FLE = formation(lilateFle as Raw, "français", "Test d'aptitude à travailler en français langue étrangère – LILATE");
