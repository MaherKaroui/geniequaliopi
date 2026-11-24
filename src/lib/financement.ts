/**
 * Type de financement d'un stagiaire (formulaire Stagiaires, champ « financeur »).
 * Source unique pour toutes les pièces : évaluation des besoins, contrat ou convention,
 * analyse des besoins, enquête financeur, questionnaire de satisfaction.
 */
import type { StagiaireInfo } from "@/types/qualiopi";

export type TypeFinancement = "CPF" | "OPCO" | "Employeur" | "France Travail" | "Région" | "Personnel";

export const TYPES_FINANCEMENT: { value: TypeFinancement; label: string }[] = [
  { value: "CPF", label: "CPF (Mon Compte Formation)" },
  { value: "OPCO", label: "OPCO (plan de développement des compétences)" },
  { value: "Employeur", label: "Employeur (fonds propres de l'entreprise)" },
  { value: "France Travail", label: "France Travail" },
  { value: "Région", label: "Région ou autre financeur public" },
  { value: "Personnel", label: "Financement personnel" },
];

/** Valeur saisie (y compris les anciennes : « Entreprise », « Particulier (fonds propres) »…) → type, ou "" si vide / inconnue. */
export function normaliserFinanceur(v?: string): TypeFinancement | "" {
  const x = (v || "").trim().toLowerCase();
  if (!x) return "";
  if (/cpf|compte (personnel de )?formation/.test(x)) return "CPF";
  if (/opco|plan de d[ée]veloppement/.test(x)) return "OPCO";
  if (/france travail|p[ôo]le emploi|\baif\b/.test(x)) return "France Travail";
  if (/particulier|personnel|autofinanc|auto-financ/.test(x)) return "Personnel";
  if (/entreprise|employeur/.test(x)) return "Employeur";
  if (/r[ée]gion|public|autre/.test(x)) return "Région";
  return "";
}

const entrepriseRenseignee = (s: StagiaireInfo) => {
  const ent = (s.entreprise || "").trim();
  return !!ent && ent.toLowerCase() !== "entreprise";
};

/** Type retenu : le choix du formulaire ; à défaut, entreprise renseignée → OPCO, sinon financement personnel. */
export function typeFinancement(s: StagiaireInfo): TypeFinancement {
  return normaliserFinanceur(s.financeur) || (entrepriseRenseignee(s) ? "OPCO" : "Personnel");
}

/** L'entreprise est partie prenante (convention tripartite, partie entreprise de l'évaluation des besoins). */
export function financeParEntreprise(s: StagiaireInfo): boolean {
  const t = typeFinancement(s);
  return (t === "OPCO" || t === "Employeur") && entrepriseRenseignee(s);
}

export function libelleFinancement(s: StagiaireInfo): string {
  const t = typeFinancement(s);
  return TYPES_FINANCEMENT.find((x) => x.value === t)!.label;
}

/** Libellé court pour les tableaux (colonne « Prise en charge ») : « OPCO », « CPF »… ou « Financement personnel ». */
export function libelleCourtFinancement(s: StagiaireInfo): string {
  const t = typeFinancement(s);
  return t === "Personnel" ? "Financement personnel" : t;
}

/** Organisme financeur à interroger (enquête de satisfaction financeur), null si autofinancement. */
export function nomFinanceur(s: StagiaireInfo): string | null {
  const ent = (s.entreprise || "").trim();
  switch (typeFinancement(s)) {
    case "CPF": return "Caisse des Dépôts et Consignations (Mon Compte Formation)";
    case "OPCO": return ent ? `OPCO de ${ent}` : "OPCO de l'employeur";
    case "Employeur": return ent || "Employeur";
    case "France Travail": return "France Travail";
    case "Région": return "Conseil régional";
    default: return null;
  }
}

/** Réponse « budget / financement » de l'évaluation des besoins (IND 4), à la première personne. */
export function reponseFinancement(s: StagiaireInfo): string {
  const ent = (s.entreprise || "").trim();
  switch (typeFinancement(s)) {
    case "CPF": return "Formation financée par mon Compte Personnel de Formation (CPF), via la plateforme Mon Compte Formation.";
    case "OPCO": return ent
      ? `Formation prise en charge par l'OPCO de ${ent} au titre du plan de développement des compétences.`
      : "Formation prise en charge par l'OPCO de mon employeur au titre du plan de développement des compétences.";
    case "Employeur": return ent
      ? `Formation financée directement par mon employeur, ${ent}, sur ses fonds propres.`
      : "Formation financée directement par mon employeur, sur ses fonds propres.";
    case "France Travail": return "Formation prise en charge par France Travail dans le cadre de mon projet de retour à l'emploi.";
    case "Région": return "Formation prise en charge par la Région (financement public de la formation professionnelle).";
    default: return "Financement personnel";
  }
}

/** Question « financement » de l'évaluation des besoins, accordée au type choisi. */
export function questionFinancement(s: StagiaireInfo): string {
  switch (typeFinancement(s)) {
    case "CPF": return "Comment financez-vous cette formation avec votre Compte Personnel de Formation (CPF) ?";
    case "OPCO": return "Quel dispositif de financement est mobilisé par l'entreprise pour cette formation (OPCO / plan de développement des compétences) ?";
    case "Employeur": return "Comment votre employeur finance-t-il cette formation ?";
    case "France Travail": return "Quelle prise en charge France Travail est mobilisée pour cette formation ?";
    case "Région": return "Quel financement public est mobilisé pour cette formation ?";
    default: return "Quel budget avez-vous prévu pour cette formation et comment la financez-vous ?";
  }
}
