// Questions posées dans les questionnaires du bilan, avec une clé stable pour stocker les réponses.
export type BdcQuestionGroup = "besoins" | "entretien" | "parcours" | "competences" | "motivations" | "metiers" | "satisfaction" | "suivi";

export const BDC_QUESTIONS: Record<BdcQuestionGroup, string[]> = {
  besoins: ["Quelle est l’origine de votre démarche ?", "Quels changements souhaitez-vous envisager ?", "Quels moyens et ressources pouvez-vous mobiliser ?"],
  entretien: ["Format retenu et modalités convenues", "Décision du bénéficiaire et suites à donner"],
  parcours: ["Quelles formations et qualifications avez-vous obtenues ?", "Quelles expériences professionnelles et extra-professionnelles ont marqué votre parcours ?", "Quelles missions et responsabilités avez-vous exercées ?", "Quelles réussites, difficultés et transitions retenez-vous ?", "Quels apprentissages pouvez-vous transférer à un nouveau projet ?"],
  competences: ["Quels savoirs, savoir-faire et savoir-être mobilisez-vous ?", "Quels écarts restent à combler au regard du métier envisagé ?"],
  motivations: ["Quelles activités vous donnent de l’énergie ?", "Quelles valeurs sont essentielles dans votre travail ?", "Préférez-vous agir, analyser, créer, aider, entreprendre ou organiser ? Pourquoi ?", "Quel environnement et quelle autonomie recherchez-vous ?", "Quels critères de choix sont prioritaires et quels compromis sont possibles ?"],
  metiers: ["Intitulé du métier et secteur d’activité", "Missions, conditions de travail et compétences attendues", "Accès au métier : qualifications, expérience et certifications", "Sources consultées (France Travail, ONISEP, France Compétences)", "Enseignements de l’enquête métier", "Atouts, contraintes et faisabilité de la piste"],
  satisfaction: ["Quels points avez-vous appréciés ?", "Quelles améliorations proposez-vous ?"],
  suivi: ["Quelle est votre situation professionnelle actuelle ?", "Quelles étapes du plan d’action ont été engagées ?", "Quelles difficultés et quels résultats constatez-vous ?", "Quel appui complémentaire serait utile ?", "Quel est votre recul sur l’utilité du bilan ?"],
};

export const bdcQuestionKey = (group: BdcQuestionGroup, index: number) => `${group}_${index + 1}`;

/** Questions à faire rédiger : satisfaction seulement si le bilan est terminé, suivi seulement s'il est échu. */
export function bdcQuestionsToDraft(finished: boolean, followupDue: boolean) {
  return (Object.keys(BDC_QUESTIONS) as BdcQuestionGroup[])
    .filter(group => (group !== "satisfaction" || finished) && (group !== "suivi" || followupDue))
    .flatMap(group => BDC_QUESTIONS[group].map((question, i) => ({ key: bdcQuestionKey(group, i), question })));
}

export const BDC_SATISFACTION_CRITERIA = ["Accueil et information", "Organisation et rythme", "Qualité de l’accompagnement", "Outils et supports", "Utilité du bilan", "Satisfaction globale"];
