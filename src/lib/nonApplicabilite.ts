/**
 * Déclarations de non-applicabilité : chaque indicateur 1 à 33 du référentiel
 * (décret n° 2026-728) a une pièce dans le dossier. Un indicateur sans objet pour
 * l'organisme reçoit une déclaration motivée, que l'auditeur attend explicitement.
 */
import type { OrganismeInfo, FormationInfo, DocEntry } from "@/types/qualiopi";
import { CRITERES_INFO } from "@/types/qualiopi";
import { buildDocument, formatDate } from "./docBuilder";
import { INDICATEURS_REFERENCE } from "./qualiopiReference";

type Type = OrganismeInfo["typesActions"][number];

const critereDe = (ind: number) => CRITERES_INFO.find((c) => c.indicateurs.some((i) => i.numero === ind))?.numero ?? 0;
const titreDe = (ind: number) => CRITERES_INFO.flatMap((c) => c.indicateurs).find((i) => i.numero === ind)?.titre ?? "";
const certifiante = (f: FormationInfo) => /^(RS|RNCP)\d+$/i.test(String(f.codeRNCP || "").replace(/\s+/g, ""));

/** Motif de non-applicabilité, ou null si l'indicateur s'applique. */
export function motifNonApplicable(ind: number, type: Type, f: FormationInfo): string | null {
  const libType = type === "bilans-competences" ? "bilans de compétences" : type === "vae" ? "accompagnement VAE" : type === "apprentissage" ? "formation par apprentissage" : "actions de formation";
  if ([14, 15, 20, 29, 33].includes(ind) && type !== "apprentissage") {
    return `Indicateur propre aux centres de formation d'apprentis (missions de l'article L.6231-2 du Code du travail). L'organisme ne dispense pas de formation par apprentissage : il réalise des ${libType}.`;
  }
  if (ind === 13 && type !== "apprentissage" && !(f.rythmeAlternance || "").trim()) {
    return `Indicateur applicable aux formations en alternance. La prestation « ${f.intitule} » ne comporte pas d'alternance entre centre de formation et entreprise.`;
  }
  if (ind === 28 && type !== "apprentissage" && !(f.rythmeAlternance || "").trim()) {
    return `Indicateur applicable lorsque la prestation comprend des périodes de formation en situation de travail. La prestation « ${f.intitule} » n'en comporte pas.`;
  }
  if ([3, 7, 16].includes(ind)) {
    if (type === "bilans-competences") return "Le bilan de compétences ne conduit pas à une certification professionnelle : l'indicateur est sans objet (guide de lecture, indicateurs 3, 7 et 16).";
    if (ind === 7 && type === "vae") return "En VAE, l'adéquation au référentiel de certification est démontrée par l'étude de faisabilité (IND 4) et l'accompagnement à la rédaction du dossier de validation ; l'indicateur 7 vise les contenus de formation et est sans objet pour l'accompagnement VAE.";
    if (!certifiante(f) && type !== "vae") return `La prestation « ${f.intitule} » ne conduit pas à une certification professionnelle enregistrée au RNCP ou au répertoire spécifique : l'indicateur est sans objet. Il deviendrait applicable si l'organisme proposait une formation certifiante.`;
  }
  if (ind === 8) {
    if (type === "bilans-competences") return "Le positionnement et l'évaluation des acquis à l'entrée ne s'appliquent pas au bilan de compétences : l'analyse de la demande est réalisée lors de la phase préliminaire (IND 4).";
    if (type === "vae") return "En VAE, le positionnement à l'entrée est remplacé par l'étude de faisabilité au regard du référentiel de la certification visée (IND 4).";
  }
  return null;
}

export function genDeclarationNonApplicabilite(o: OrganismeInfo, f: FormationInfo, ind: number, motif: string): string {
  const ref = INDICATEURS_REFERENCE.find((r) => r.numero === ind);
  const date = o.dateMaj ? formatDate(o.dateMaj) : formatDate(new Date().toISOString().slice(0, 10));
  return buildDocument({
    org: o,
    title: `INDICATEUR ${ind} — DÉCLARATION DE NON-APPLICABILITÉ`,
    subtitle: `Critère ${critereDe(ind)} — ${titreDe(ind)}`,
    sections: [
      ...(ref ? [{ heading: "Libellé de l'indicateur (décret n° 2026-728)", content: `<p>${ref.intitule}</p>` }] : []),
      { heading: "Motif de non-applicabilité", content: `<p>${motif}</p>`, variant: "green" as const },
      { heading: "Suivi", content: `<p>Cette déclaration est revue à chaque évolution de l'offre de ${o.nom} (nouvelle prestation, nouvelle modalité, recours à l'alternance ou à une certification). L'auditeur peut en vérifier le bien-fondé à partir du catalogue et des contrats de l'organisme.</p>` },
    ],
    signatures: { type: "2", labels: ["Le dirigeant", "Le référent qualité"], names: [o.dirigeant, o.referentQualite || o.dirigeant], dates: [date, date] },
  });
}

/** Entrées de catalogue pour les indicateurs 1 à 33 sans aucune pièce. */
export function entreesNonApplicables(catalogue: DocEntry[], type: Type, f: FormationInfo): DocEntry[] {
  const couverts = new Set(catalogue.map((d) => d.indicateur));
  const out: DocEntry[] = [];
  for (let ind = 1; ind <= 33; ind++) {
    if (couverts.has(ind)) continue;
    const motif = motifNonApplicable(ind, type, f);
    const c = critereDe(ind);
    out.push({
      id: `na_ind${ind}`,
      nom: motif ? `CT${c} - IND ${ind} DÉCLARATION DE NON-APPLICABILITÉ` : `CT${c} - IND ${ind} PIÈCES À PRODUIRE`,
      critere: c, indicateur: ind, template: "indicateur_non_applicable",
      params: { ind },
    });
  }
  return out;
}
