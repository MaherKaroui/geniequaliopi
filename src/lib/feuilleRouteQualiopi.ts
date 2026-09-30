// Génère une "Feuille de route Qualiopi" Excel (.xlsx) sur le même modèle que
// la trame officielle CFA (33 indicateurs, 7 critères) — listant pour chaque
// indicateur les documents que l'application produit déjà.
//
// Colonnes :
//  - Critère
//  - N° Ind.
//  - Indicateur (intitulé)
//  - Spécificité / Attendu
//  - Preuves / éléments à fournir
//  - Responsable
//  - Statut (✅ Couvert / ⚠ Partiel / À faire)
//  - Documents générés par l'application (liste)

import * as XLSX from "xlsx";
import { DocEntry, OrganismeInfo } from "@/types/qualiopi";

interface RefRow {
  crit: string;
  ind: number;
  titre: string;
  spec: string;
  preuves: string;
}

const REF: RefRow[] = [
  { crit: "C1 - Information du public", ind: 1, titre: "Conditions d'information du public sur les prestations, délais d'accès et résultats obtenus", spec: "Taux d'obtention diplôme, insertion, poursuite d'études, rupture (InserJeunes)", preuves: "Site internet, plaquettes, catalogue, fiches formation avec dates/durées/tarifs, indicateurs de résultats affichés, captures d'écran datées" },
  { crit: "C1 - Information du public", ind: 2, titre: "Indicateurs de résultats adaptés à la nature des prestations et publics", spec: "Indicateurs spécifiques publiés (réussite, insertion, satisfaction, rupture)", preuves: "Tableau de bord des indicateurs, statistiques de réussite, supports de diffusion" },
  { crit: "C1 - Information du public", ind: 3, titre: "Obtention des certifications visées (taux d'obtention, blocs de compétences)", spec: "Taux de réussite aux certifications/diplômes préparés", preuves: "PV d'examens, taux de réussite par diplôme, attestations de certification, publication des résultats" },
  { crit: "C2 - Identification des objectifs", ind: 4, titre: "Analyse du besoin du bénéficiaire en lien avec l'entreprise / financeur", spec: "Positionnement à l'entrée, lien tripartite si CFA", preuves: "Fiches de positionnement, tests de prérequis, entretiens, analyse de la demande, dossiers d'inscription" },
  { crit: "C2 - Identification des objectifs", ind: 5, titre: "Objectifs définis de manière adaptée aux bénéficiaires (objectifs opérationnels et évaluables)", spec: "Référentiels d'activités / de compétences / d'évaluation", preuves: "Référentiels (RNCP, RAP, REAC), programmes détaillés, objectifs pédagogiques par module, syllabus" },
  { crit: "C2 - Identification des objectifs", ind: 6, titre: "Contenus et modalités adaptés en fonction des objectifs et publics", spec: "Adaptation durée, modalités (présentiel/distanciel/alternance)", preuves: "Progressions pédagogiques, plannings, scénarios pédagogiques, supports adaptés" },
  { crit: "C2 - Identification des objectifs", ind: 7, titre: "Adéquation contenus / exigences de la certification visée", spec: "Cartographie contenu vs référentiel de certification", preuves: "Tableau de correspondance contenus/référentiel, ingénierie de formation, livret de suivi" },
  { crit: "C3 - Adaptation aux publics", ind: 8, titre: "Procédures de positionnement et d'évaluation à l'entrée", spec: "Évaluation des acquis et prérequis", preuves: "Tests de positionnement, grilles d'évaluation initiale, comptes-rendus d'entretiens" },
  { crit: "C3 - Adaptation aux publics", ind: 9, titre: "Conditions de déroulement de la prestation (information, modalités, accompagnement)", spec: "Livret d'accueil, règlement intérieur, convocation, calendrier", preuves: "Livret d'accueil, RI, conventions/contrats, plannings, émargements, guide de connexion" },
  { crit: "C3 - Adaptation aux publics", ind: 10, titre: "Adaptation et ajustement de la prestation en cours de réalisation", spec: "Suivi pédagogique, points d'étape, remédiation", preuves: "Comptes-rendus de suivi, bilans intermédiaires, dispositifs de remédiation, fiches de réajustement, newsletters" },
  { crit: "C3 - Adaptation aux publics", ind: 11, titre: "Atteinte des objectifs : évaluation des acquis en cours et en fin de prestation", spec: "Évaluations continues, exercices pratiques, examens", preuves: "Grilles d'évaluation, copies/notes, QCM, CCF, attestations de fin de formation, livret de compétences" },
  { crit: "C3 - Adaptation aux publics", ind: 12, titre: "Engagement et implication des bénéficiaires (mesures pour favoriser l'engagement)", spec: "Suivi de l'assiduité, lutte contre le décrochage", preuves: "Feuilles d'émargement, suivi d'assiduité, actions anti-décrochage, entretiens de motivation" },
  { crit: "C3 - Adaptation aux publics", ind: 13, titre: "[Spécifique apprentissage] Coordination avec l'entreprise et le tuteur/maître d'apprentissage", spec: "OBLIGATOIRE CFA : lien avec le maître d'apprentissage", preuves: "Livret d'apprentissage, fiches de liaison, comptes-rendus de visites, outils numériques de suivi" },
  { crit: "C3 - Adaptation aux publics", ind: 14, titre: "[Spécifique apprentissage] Information de l'apprenti sur droits/devoirs en tant que salarié", spec: "OBLIGATOIRE CFA : statut de salarié, droits et devoirs", preuves: "Livret d'accueil avec volet droits/devoirs, attestations de remise, règlement intérieur" },
  { crit: "C3 - Adaptation aux publics", ind: 15, titre: "[Spécifique apprentissage] Information sur les aides dont les apprentis peuvent bénéficier", spec: "OBLIGATOIRE CFA : logement (Mobili-Jeune, Visale, Loca-Pass), mobilité, restauration, fonds social, premier équipement, prime d'activité", preuves: "Supports d'information sur les aides, plaquettes, affichage, preuves de communication" },
  { crit: "C3 - Adaptation aux publics", ind: 16, titre: "[Spécifique apprentissage] Mesures favorisant la mobilité nationale et internationale", spec: "OBLIGATOIRE CFA : référent mobilité, dispositifs Erasmus+", preuves: "Désignation du référent mobilité, conventions, supports d'information, bilans de mobilité" },
  { crit: "C4 - Moyens", ind: 17, titre: "Moyens humains et techniques adaptés et environnement approprié", spec: "Locaux, plateaux techniques, équipements pédagogiques", preuves: "Inventaire des équipements, plans des locaux, organigramme, contrats, attestations de conformité" },
  { crit: "C4 - Moyens", ind: 18, titre: "Coordination des moyens pédagogiques, techniques et d'encadrement", spec: "Organisation de l'équipe pédagogique, conseil de perfectionnement", preuves: "Organigramme, fiches de poste, CR de réunions pédagogiques, PV conseil de perfectionnement" },
  { crit: "C4 - Moyens", ind: 19, titre: "Ressources pédagogiques mises à disposition et appropriation par les bénéficiaires", spec: "LMS, supports de cours, ressources documentaires", preuves: "Accès LMS, supports de cours, captures d'écran, livrets remis" },
  { crit: "C4 - Moyens", ind: 20, titre: "[Spécifique apprentissage] Personnels dédiés à l'appui à la mobilité, social, médico-social et handicap", spec: "OBLIGATOIRE CFA : référent handicap, accompagnement social", preuves: "Désignation référents, fiches de poste, partenariats (Agefiph, MDPH), procédures d'accompagnement" },
  { crit: "C5 - Qualification des intervenants", ind: 21, titre: "Détermination, mobilisation et évaluation des compétences des intervenants", spec: "Qualification et expérience des formateurs", preuves: "CV formateurs, diplômes, attestations d'expérience, fiches de poste, grilles d'évaluation" },
  { crit: "C5 - Qualification des intervenants", ind: 22, titre: "Entretien, développement et actualisation des compétences des intervenants", spec: "Plan de développement des compétences de l'équipe pédagogique", preuves: "Plan de formation des formateurs, attestations de formation, entretiens professionnels, veille pédagogique" },
  { crit: "C6 - Investissement dans l'environnement", ind: 23, titre: "Veille légale et réglementaire et application aux prestations", spec: "Veille sur la réglementation (Code du travail, France compétences)", preuves: "Sources de veille, fiches de veille, mise à jour des procédures, preuves d'application" },
  { crit: "C6 - Investissement dans l'environnement", ind: 24, titre: "Veille sur les évolutions des compétences, métiers et emplois", spec: "Veille métiers via branches, OPCO, observatoires", preuves: "Fiches de veille métier, échanges avec branches/OPCO, études observatoires, actualisation des contenus" },
  { crit: "C6 - Investissement dans l'environnement", ind: 25, titre: "Veille sur les innovations pédagogiques et technologiques", spec: "Veille sur outils numériques, AFEST, nouvelles modalités", preuves: "Fiches de veille pédagogique, colloques, expérimentations, abonnements professionnels" },
  { crit: "C6 - Investissement dans l'environnement", ind: 26, titre: "Accueil, accompagnement et mobilisation autour du handicap", spec: "Référent handicap actif, aménagements, partenariats", preuves: "Procédures d'accueil PSH, aménagements réalisés, partenariats (Agefiph, MDPH), bilans, registre d'accessibilité" },
  { crit: "C6 - Investissement dans l'environnement", ind: 27, titre: "Sous-traitance / portage : conditions de réalisation", spec: "Cadre contractuel et qualité des sous-traitants/portés", preuves: "Contrats de sous-traitance, cahier des charges, suivi qualité, évaluation des prestataires" },
  { crit: "C6 - Investissement dans l'environnement", ind: 28, titre: "[Spécifique apprentissage] Sollicitation des représentants du monde socio-économique pour la conception", spec: "OBLIGATOIRE CFA : conseil de perfectionnement, branches professionnelles", preuves: "PV du conseil de perfectionnement, CR d'échanges avec professionnels, participation des entreprises à l'ingénierie" },
  { crit: "C7 - Recueil et traitement des appréciations / réclamations", ind: 29, titre: "Recueil des appréciations des parties prenantes (bénéficiaires, entreprises, financeurs, formateurs)", spec: "Enquêtes apprenants, entreprises, formateurs", preuves: "Questionnaires de satisfaction, résultats d'enquêtes, synthèses, taux de retour" },
  { crit: "C7 - Recueil et traitement des appréciations / réclamations", ind: 30, titre: "Traitement des difficultés rencontrées, réclamations et aléas", spec: "Procédure de gestion des réclamations, médiateur", preuves: "Procédure de réclamation, registre des réclamations, fiches de traitement, suivi des actions" },
  { crit: "C7 - Recueil et traitement des appréciations / réclamations", ind: 31, titre: "Mise en œuvre de mesures d'amélioration à partir de l'analyse des appréciations et réclamations", spec: "Plan d'amélioration continue", preuves: "Plan d'amélioration, CR revue qualité, actions correctives, indicateurs de suivi, bilan annuel" },
  { crit: "C7 - Recueil et traitement des appréciations / réclamations", ind: 32, titre: "[Spécifique apprentissage] Investissement dans des actions d'amélioration de l'insertion et de réduction des ruptures", spec: "OBLIGATOIRE CFA : prévention des ruptures de contrat", preuves: "Statistiques de ruptures, actions de médiation, dispositifs anti-décrochage, accompagnement à l'insertion, bilans" },
];

function frDate(): string {
  return new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

export function generateFeuilleRouteQualiopi(
  organisme: OrganismeInfo,
  catalog: DocEntry[]
): Blob {
  // Index documents par indicateur
  const byInd = new Map<number, string[]>();
  catalog.forEach((d) => {
    if (!byInd.has(d.indicateur)) byInd.set(d.indicateur, []);
    byInd.get(d.indicateur)!.push(d.nom);
  });

  // Construit les lignes
  const header = [
    "Critère",
    "N° Ind.",
    "Indicateur (intitulé)",
    "Spécificité / Attendu",
    "Preuves / éléments à fournir",
    "Responsable",
    "Statut",
    "Documents générés par l'application",
  ];

  const rows: (string | number)[][] = [];
  rows.push([
    `FEUILLE DE ROUTE QUALIOPI — ${organisme.nom || "Organisme"} — Référentiel National Qualité (7 critères / 33 indicateurs) — ${frDate()}`,
  ]);
  rows.push([]);
  rows.push(header);

  REF.forEach((r) => {
    const docs = byInd.get(r.ind) || [];
    const statut = docs.length === 0 ? "À faire" : docs.length < 2 ? "⚠ Partiel" : "✅ Couvert";
    rows.push([
      r.crit,
      r.ind,
      r.titre,
      r.spec,
      r.preuves,
      organisme.referentQualite || organisme.responsablePedagogique || organisme.dirigeant || "",
      `${statut}${docs.length ? ` (${docs.length} doc${docs.length > 1 ? "s" : ""})` : ""}`,
      docs.length ? docs.map((n, i) => `${i + 1}. ${n}`).join("\n") : "—",
    ]);
  });

  // Synthèse par critère
  rows.push([]);
  rows.push(["SYNTHÈSE PAR CRITÈRE"]);
  rows.push(["Critère", "Indicateurs", "Documents générés", "Couverture"]);
  const byCrit = new Map<string, { inds: number[]; docs: number }>();
  REF.forEach((r) => {
    const key = r.crit;
    if (!byCrit.has(key)) byCrit.set(key, { inds: [], docs: 0 });
    const entry = byCrit.get(key)!;
    entry.inds.push(r.ind);
    entry.docs += (byInd.get(r.ind) || []).length;
  });
  byCrit.forEach((v, k) => {
    const covered = v.inds.filter((i) => (byInd.get(i) || []).length > 0).length;
    rows.push([
      k,
      v.inds.length,
      v.docs,
      `${covered}/${v.inds.length} indicateurs couverts`,
    ]);
  });
  rows.push([
    "TOTAL",
    REF.length,
    catalog.length,
    `${REF.filter((r) => (byInd.get(r.ind) || []).length > 0).length}/${REF.length} indicateurs couverts`,
  ]);

  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Largeurs de colonnes
  ws["!cols"] = [
    { wch: 32 }, { wch: 8 }, { wch: 55 }, { wch: 45 },
    { wch: 55 }, { wch: 22 }, { wch: 22 }, { wch: 70 },
  ];

  // Fusion titre
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } },
    { s: { r: rows.length - byCrit.size - 3, c: 0 }, e: { r: rows.length - byCrit.size - 3, c: 7 } },
  ];

  // Wrap + style basique sur toutes les cellules
  const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
  for (let R = range.s.r; R <= range.e.r; R++) {
    for (let C = range.s.c; C <= range.e.c; C++) {
      const addr = XLSX.utils.encode_cell({ r: R, c: C });
      const cell = ws[addr];
      if (!cell) continue;
      cell.s = {
        alignment: { wrapText: true, vertical: "top", horizontal: R === 0 ? "center" : "left" },
        font: R === 0 ? { bold: true, sz: 13, color: { rgb: "FFFFFF" } } : R === 2 ? { bold: true } : {},
        fill:
          R === 0
            ? { fgColor: { rgb: "1E40AF" } }
            : R === 2
              ? { fgColor: { rgb: "DBEAFE" } }
              : undefined,
        border: {
          top: { style: "thin", color: { rgb: "CBD5E1" } },
          bottom: { style: "thin", color: { rgb: "CBD5E1" } },
          left: { style: "thin", color: { rgb: "CBD5E1" } },
          right: { style: "thin", color: { rgb: "CBD5E1" } },
        },
      };
    }
  }

  // Hauteur ligne titre
  ws["!rows"] = [{ hpt: 28 }];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Feuille de route Qualiopi");

  const out = XLSX.write(wb, { type: "array", bookType: "xlsx", cellStyles: true });
  return new Blob([out], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}
