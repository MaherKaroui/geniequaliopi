/**
 * Libellé lisible d'une pièce NEXUS : les noms de fichiers du dossier de référence sont sans
 * accents (« Fiche prealable au bilan de competences ») ; le catalogue affiche les accents.
 */
const ACCENTS: Array<[RegExp, string]> = [
  [/\bdeveloppement\b/g, "développement"], [/\bcompetences\b/g, "compétences"], [/\bprealable\b/g, "préalable"],
  [/\bbeneficiaires\b/g, "bénéficiaires"], [/\bbeneficiaire\b/g, "bénéficiaire"], [/\bsynthese\b/g, "synthèse"],
  [/\brealisation\b/g, "réalisation"], [/\breglementaire\b/g, "réglementaire"], [/\bpedagogique\b/g, "pédagogique"],
  [/\bemargement\b/g, "émargement"], [/\bseance\b/g, "séance"], [/\binterets\b/g, "intérêts"],
  [/\bpreparatoire\b/g, "préparatoire"], [/\bpersonnalite\b/g, "personnalité"], [/\bintermediaire\b/g, "intermédiaire"],
  [/\bReperes\b/g, "Repères"], [/\bqualite\b/g, "qualité"], [/\bevaluation\b/g, "évaluation"], [/\bEvaluation\b/g, "Évaluation"],
  [/\bprevisionnel signe\b/g, "prévisionnel signé"], [/\baleas\b/g, "aléas"], [/\bamelioration\b/g, "amélioration"],
  [/\breclamations\b/g, "réclamations"], [/\breclamation\b/g, "réclamation"], [/\bmediation\b/g, "médiation"], [/\bProcedure\b/g, "Procédure"],
  [/\ba chaud\b/g, "à chaud"], [/\ba froid\b/g, "à froid"], [/\ba disposition\b/g, "à disposition"], [/\ba l'accompagnement\b/g, "à l'accompagnement"],
  [/\bpresentation\b/g, "présentation"], [/\bgenerales\b/g, "générales"], [/\binterieur\b/g, "intérieur"], [/\bdebut\b/g, "début"],
  [/\bspecifiques\b/g, "spécifiques"], [/\bdeontologiques\b/g, "déontologiques"], [/\bperipheriques\b/g, "périphériques"],
  [/\bpresentiel\b/g, "présentiel"], [/\bReferent\b/g, "Référent"], [/\bReseau\b/g, "Réseau"], [/\bsocio-economiques\b/g, "socio-économiques"],
  [/\bnon-applicabilite\b/g, "non-applicabilité"], [/\breponse\b/g, "réponse"], [/\bDefinition\b/g, "Définition"],
  [/\bPrevention\b/g, "Prévention"], [/\bresultats\b/g, "résultats"],
  [/\bmetiers\b/g, "métiers"],
  [/\bpedagogiques\b/g, "pédagogiques"],
];

export function titreNexus(nom: string): string {
  return ACCENTS.reduce((t, [re, rep]) => t.replace(re, rep), nom);
}
