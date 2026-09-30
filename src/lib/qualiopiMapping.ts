// Qualiopi mapping engine: document → critère → indicateur
import { DocEntry } from "@/types/qualiopi";

export interface MappingEntry {
  document: string;
  type: "Administratif" | "Pédagogique" | "Qualité" | "Preuve" | "Excel";
  critere: number;
  critereLabel: string;
  indicateur: number;
  indicateurLabel: string;
  statut: "✅ Généré" | "📋 Planifié";
  preuveAssociee: string;
}

const CRITERE_LABELS: Record<number, string> = {
  1: "Information du public",
  2: "Objectifs et adaptation",
  3: "Accueil, accompagnement, suivi",
  4: "Adéquation des moyens",
  5: "Qualification du personnel",
  6: "Investissement environnement pro",
  7: "Amélioration continue",
};

const INDICATEUR_LABELS: Record<number, string> = {
  1: "Information accessible",
  2: "Indicateurs de résultats",
  3: "Taux certifications",
  4: "Analyse du besoin",
  5: "Objectifs opérationnels",
  6: "Contenus adaptés",
  7: "Adéquation certification",
  8: "Positionnement entrée",
  9: "Conditions déroulement",
  10: "Adaptation prestation",
  11: "Évaluation objectifs",
  12: "Engagement bénéficiaires",
  13: "Coordination alternance",
  14: "Accompagnement socio-pro",
  15: "Droits et devoirs apprenti",
  16: "Présentation certification",
  17: "Moyens humains/techniques",
  18: "Coordination intervenants",
  19: "Ressources pédagogiques",
  20: "Personnels dédiés",
  21: "Compétences intervenants",
  22: "Développement compétences",
  23: "Veille réglementaire",
  24: "Veille métiers",
  25: "Veille innovations pédagogiques",
  26: "Accueil handicap",
  27: "Sous-traitance et portage salarial",
  28: "Formation situation travail",
  29: "Insertion professionnelle",
  30: "Recueil appréciations",
  31: "Traitement réclamations",
  32: "Amélioration continue et analyse des risques",
  33: "Évaluation des enseignements (CFA)",
};

function getDocType(template: string): MappingEntry["type"] {
  if (template.includes("preuve") || template.includes("proof")) return "Preuve";
  if (template.includes("satisfaction") || template.includes("reclamation") || template.includes("amelioration") || template.includes("audit") || template.includes("qualite") || template.includes("indicateur")) return "Qualité";
  if (template.includes("eval") || template.includes("qcm") || template.includes("programme") || template.includes("pedagogique") || template.includes("exercice") || template.includes("competence") || template.includes("positionnement") || template.includes("cours")) return "Pédagogique";
  return "Administratif";
}

export function buildMappingTable(catalog: DocEntry[]): MappingEntry[] {
  return catalog.map(doc => ({
    document: doc.nom,
    type: getDocType(doc.template),
    critere: doc.critere,
    critereLabel: CRITERE_LABELS[doc.critere] || `Critère ${doc.critere}`,
    indicateur: doc.indicateur,
    indicateurLabel: INDICATEUR_LABELS[doc.indicateur] || `Indicateur ${doc.indicateur}`,
    statut: "✅ Généré",
    preuveAssociee: getPreuveAssociee(doc.indicateur),
  }));
}

function getPreuveAssociee(indicateur: number): string {
  const map: Record<number, string> = {
    1: "Fiche info, catalogue, site web",
    2: "Statistiques, taux satisfaction",
    3: "Taux certifications, débouchés",
    4: "Questionnaire positionnement, analyse besoins",
    5: "Programme, objectifs pédagogiques",
    6: "Plan pédagogique, adaptation contenu",
    7: "Référentiel certification",
    8: "Test entrée, QCM positionnement",
    9: "Livret accueil, convocation, convention",
    10: "Émargement, présence, connexion",
    11: "Évaluations, QCM, exercices pratiques",
    12: "Attestation, certificat, suivi abandon",
    13: "Livret apprentissage, suivi tuteur",
    14: "Suivi 3 mois, insertion",
    15: "Charte accueil, conditions",
    16: "Livret apprentissage, suivi tuteur",
    17: "Liste moyens, inventaire",
    18: "CR réunions, planning formateurs",
    19: "Supports cours, guide LMS",
    20: "Référents mobilité et handicap, conseil de perfectionnement",
    21: "CV, diplômes, compétences formateur",
    22: "Plan développement, formations continues",
    23: "Tableaux veille réglementaire",
    24: "Veille métiers, analyses sectorielles",
    25: "Fiches innovation, benchmark",
    26: "Procédure handicap, réseau de partenaires, aménagements",
    27: "Registre et contrats de sous-traitance / portage (clause qualité)",
    28: "Convention partenariat",
    29: "Taux insertion",
    30: "Questionnaires satisfaction, synthèses",
    31: "Registre réclamations, fiches traitement",
    32: "Tableau d'amélioration, analyse des risques qualité",
    33: "Grilles d'évaluation des enseignements, synthèse partagée, plan d'action",
  };
  return map[indicateur] || "";
}

export function generateMappingHTML(catalog: DocEntry[], orgName: string): string {
  const mapping = buildMappingTable(catalog);
  
  // Group by critère
  const byCritere = new Map<number, MappingEntry[]>();
  mapping.forEach(m => {
    if (!byCritere.has(m.critere)) byCritere.set(m.critere, []);
    byCritere.get(m.critere)!.push(m);
  });

  let html = `<h1>TABLEAU DE CORRESPONDANCE QUALIOPI</h1>
    <p><strong>Organisme :</strong> ${orgName}<br><strong>Nombre total de documents :</strong> ${catalog.length}<br><strong>Date de génération :</strong> ${new Date().toLocaleDateString('fr-FR')}</p>`;

  // Summary
  const types = { Administratif: 0, Pédagogique: 0, Qualité: 0, Preuve: 0 };
  mapping.forEach(m => { if (m.type in types) (types as any)[m.type]++; });
  html += `<table><tr><th>Type</th><th>Nombre</th></tr>`;
  Object.entries(types).forEach(([t, n]) => { html += `<tr><td>${t}</td><td>${n}</td></tr>`; });
  html += `<tr style="font-weight:bold"><td>TOTAL</td><td>${catalog.length}</td></tr></table>`;

  // Detailed table per critère
  byCritere.forEach((entries, critere) => {
    html += `<h2>Critère ${critere} – ${CRITERE_LABELS[critere]}</h2>`;
    html += `<table><tr><th>Document</th><th>Type</th><th>Indicateur</th><th>Statut</th><th>Preuve associée</th></tr>`;
    entries.forEach(e => {
      html += `<tr><td>${e.document}</td><td>${e.type}</td><td>I${e.indicateur} – ${e.indicateurLabel}</td><td>${e.statut}</td><td>${e.preuveAssociee}</td></tr>`;
    });
    html += `</table>`;
  });

  return html;
}
