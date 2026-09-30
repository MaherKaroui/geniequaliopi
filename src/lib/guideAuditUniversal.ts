// Guide universel de préparation à l'audit Qualiopi
// Fonctionne pour AF (Actions de Formation), CFA (Apprentissage),
// BDC (Bilan de Compétences) et VAE (Validation des Acquis de l'Expérience).
//
// Pour CFA, on délègue au guide spécialisé (script Dreamers Team complet).
// Pour AF / BDC / VAE, on construit un guide à partir d'INDICATEURS_REFERENCE
// filtré par le périmètre applicable, avec un script « ce qu'il faut dire »
// adapté à chaque type d'action.

import { OrganismeInfo, FormationInfo, StagiaireInfo, DocEntry } from "@/types/qualiopi";
import { INDICATEURS_REFERENCE, CRITERES_TITLES } from "./qualiopiReference";
import { generateGuideAuditCFA } from "./guideAuditCFA";
import { TypeAuditCFA } from "./qualiopiReferenceCFA";

export type TypeActionAudit = "AF" | "CFA" | "BDC" | "VAE";

const ACTION_TO_REF_CODE: Record<TypeActionAudit, string> = {
  AF: "OF",
  CFA: "CFA",
  BDC: "CBC",
  VAE: "VAE",
};

const ACTION_LABELS: Record<TypeActionAudit, string> = {
  AF: "Actions de formation",
  CFA: "Centre de Formation d'Apprentis (CFA)",
  BDC: "Bilan de compétences",
  VAE: "Validation des Acquis de l'Expérience (VAE)",
};

const ACTION_BENEFICIAIRE: Record<TypeActionAudit, string> = {
  AF: "stagiaire",
  CFA: "apprenti",
  BDC: "bénéficiaire",
  VAE: "candidat",
};

// Détecte automatiquement le type d'action à partir des typesActions de l'organisme.
export function detectTypeAction(org: OrganismeInfo): TypeActionAudit {
  const ta = org.typesActions || [];
  if (ta.includes("apprentissage")) return "CFA";
  if (ta.includes("bilans-competences")) return "BDC";
  if (ta.includes("vae")) return "VAE";
  return "AF";
}

// Script « ce qu'il faut dire » adapté par type d'action et par indicateur.
// Si pas de variation spécifique, on dérive depuis niveauAttendu.
export function scriptParIndicateur(num: number, type: TypeActionAudit, niveauAttendu: string): string {
  const b = ACTION_BENEFICIAIRE[type];
  const contextes: Record<TypeActionAudit, Record<number, string>> = {
    AF: {
      1: `Nos fiches formation et notre site web publient les 10 items réglementaires (prérequis, objectifs, durée, modalités et délais d'accès, tarifs, contacts, méthodes, modalités d'évaluation, accessibilité PSH). Tout est daté, à jour, accessible avant la contractualisation.`,
      2: `Nous publions chaque année nos indicateurs de résultats (taux de satisfaction, de complétion, d'atteinte des objectifs, d'insertion). Les sources sont les bilans à chaud, à froid et les évaluations finales. Mise à jour annuelle, affichage sur le site et le catalogue.`,
      4: `Avant l'entrée en formation, nous menons un entretien d'analyse des besoins (fiche EVA-001) avec le ${b} et, si financement entreprise, avec le commanditaire. Nous formalisons les attentes, les contraintes, les modalités d'évaluation et les besoins de compensation PSH.`,
      11: `Un test de positionnement initial mesure le niveau d'entrée. Pendant la formation, des évaluations formatives (QCM, exercices, mises en situation) jalonnent le parcours. Une évaluation finale et un bilan à chaud puis à froid vérifient l'atteinte des objectifs.`,
      12: `Nous suivons l'assiduité via les feuilles d'émargement. En cas d'absence, le formateur contacte le ${b} sous 48h. Un livret de suivi pédagogique trace les difficultés et les actions correctives.`,
      22: `Chaque année, nous réalisons un entretien professionnel avec les formateurs, un plan de développement des compétences et un suivi des actions de formation interne.`,
      26: `Nous formalisons notre démarche d'accueil des PSH : référent handicap nommé, processus d'aménagement, partenariats AGEFIPH / Cap Emploi, registre des compensations mises en œuvre.`,
      25: `Nous réalisons une veille pédagogique (newsletters, congrès, communautés de pratiques) et formalisons les évolutions dans nos contenus à chaque mise à jour de programme.`,
      30: `Notre questionnaire de satisfaction à chaud, le bilan à froid (3 à 6 mois après) et le registre des réclamations remontent les appréciations. Toute réclamation reçoit un accusé sous 48h et un traitement formalisé.`,
      31: `Toute réclamation, difficulté ou aléa est enregistré, accusé sous 48 h et traité dans notre registre ; l'analyse alimente le tableau d'amélioration continue.`,
      32: `Notre tableau d'amélioration continue consolide les actions issues des appréciations, des réclamations et de la veille ; depuis le décret n° 2026-728, il est complété par une analyse des risques sur la qualité des formations (probabilité × gravité, mesures, pilotes), revue chaque année.`,
    },
    CFA: {},
    BDC: {
      1: `Notre site et notre catalogue publient les 10 items obligatoires pour le bilan : prérequis, objectifs (3 phases : préliminaire / investigation / conclusions), durée (24 h max), modalités et délais d'accès, tarifs CPF, contacts, méthodes (entretiens, tests), modalités de restitution (document de synthèse), accessibilité PSH.`,
      2: `Nous publions un taux de satisfaction des ${b}s, le pourcentage de projets aboutis (création / formation / mobilité interne) et le délai moyen entre la phase préliminaire et la remise du document de synthèse.`,
      4: `Lors de la phase préliminaire (entretien gratuit), nous analysons le besoin du ${b}, son contexte professionnel et son projet. Le tripartite avec le financeur (employeur, OPCO, France Travail) le cas échéant. Nous formalisons l'engagement réciproque.`,
      11: `Notre processus se déroule en 3 phases formalisées : préliminaire (cadrage), investigation (passation de tests, exploration des pistes), conclusions (restitution + document de synthèse). Chaque entretien fait l'objet d'un compte-rendu.`,
      12: `Le ${b} dispose d'un suivi individualisé par le consultant : RDV planifiés, traçabilité des tests passés, comptes-rendus signés, possibilité d'entretien complémentaire à 6 mois.`,
      22: `Nos consultants sont diplômés (psychologue, conseiller en évolution professionnelle) ou justifient de 3 ans d'expérience. Un plan de DPC annuel, supervision et co-développement entre consultants.`,
      25: `Veille active sur les méthodes de bilan (référentiel FFP, ANC), les nouveaux outils (MBTI, NV7, tests d'intérêts), l'évolution du marché du travail (France Stratégie, ROME).`,
      30: `Questionnaire de satisfaction à chaud post-restitution + bilan à 6 mois sur la concrétisation du projet. Toute réclamation est tracée dans le registre dédié.`,
    },
    VAE: {
      1: `Nous publions les 10 items pour la VAE : prérequis (expérience en rapport direct avec la certification, sans durée minimale depuis la loi n° 2022-1598), objectifs (obtention totale/partielle), durée (24 h d'accompagnement max), modalités et délais d'accès, tarifs (CPF ou France VAE), contacts, méthodes (accompagnement individuel + collectif), modalités d'évaluation (jury), accessibilité PSH.`,
      2: `Nous publions le taux de validation totale, le taux de validation partielle et le délai moyen de l'étude de faisabilité au jury. Mise à jour annuelle.`,
      4: `L'étude personnalisée de faisabilité (gratuite ou en début de parcours) analyse le besoin du ${b}, vérifie l'adéquation de l'expérience par rapport au référentiel du diplôme visé et formalise le plan d'accompagnement.`,
      11: `Le parcours VAE comprend : étude de faisabilité, accompagnement à la rédaction du dossier de validation, aide à la préparation du jury, mise en situation professionnelle si requise. Chaque séance fait l'objet d'une feuille de présence.`,
      12: `Suivi individualisé par un accompagnateur certifié : planning de RDV, échanges écrits, relectures intermédiaires, bilan post-jury. Possibilité d'entretien complémentaire en cas de validation partielle.`,
      22: `Nos accompagnateurs sont formés à la VAE (formation initiale + DPC annuel), connaissent les référentiels des diplômes accompagnés et participent à des supervisions collectives.`,
      25: `Veille sur la réforme France VAE, les évolutions des référentiels RNCP, la jurisprudence des jurys, les nouveaux financements (Transitions Pro, OPCO).`,
      30: `Questionnaire de satisfaction post-accompagnement + bilan post-jury sur le résultat obtenu. Toute réclamation est tracée et traitée sous 15 jours.`,
    },
  };

  const sp = contextes[type][num];
  if (sp) return sp;
  return `Conformément au référentiel : ${niveauAttendu}. Notre processus est formalisé, tracé et appliqué pour chaque ${b}.`;
}

// Documents-preuves typiques par type d'action et par indicateur.
export function preuvesParIndicateur(num: number, type: TypeActionAudit, base: string[]): string[] {
  const extra: Record<TypeActionAudit, Record<number, string[]>> = {
    AF: {
      1: ["Fiches formation datées", "Pages site web (captures datées)", "Catalogue commercial", "CGV"],
      2: ["Tableau des indicateurs de résultats", "Bilans à chaud consolidés", "Bilans à froid"],
      4: ["Fiche d'analyse des besoins (EVA-001)", "Convention tripartite si applicable"],
      11: ["Test de positionnement", "Évaluations formatives", "Évaluation finale", "Bilan à chaud", "Bilan à froid"],
      22: ["Plan de DPC formateurs", "Entretiens professionnels annuels"],
      26: ["Procédure accueil PSH", "Nomination référent handicap", "Registre des compensations"],
      30: ["Questionnaires de satisfaction", "Registre des réclamations"],
      31: ["Formulaire et registre des réclamations", "Procédure de traitement"],
      32: ["Tableau d'amélioration continue", "Analyse des risques sur la qualité (décret n° 2026-728)", "Revue de direction"],
    },
    CFA: {},
    BDC: {
      1: ["Fiche bilan de compétences", "Page site web BDC datée", "CGV BDC", "Document d'information préalable"],
      2: ["Tableau indicateurs BDC (satisfaction, projets aboutis, délai moyen)"],
      4: ["Compte-rendu entretien préliminaire", "Convention tripartite avec financeur"],
      11: ["Trame phase préliminaire", "Trame phase investigation", "Document de synthèse type", "Comptes-rendus d'entretiens"],
      22: ["Diplômes/CV consultants", "Plan de DPC", "PV supervisions"],
      30: ["Questionnaire satisfaction post-restitution", "Bilan à 6 mois", "Registre des réclamations"],
    },
    VAE: {
      1: ["Fiche accompagnement VAE", "Page site web VAE datée", "CGV VAE"],
      2: ["Tableau indicateurs VAE (taux validation totale/partielle, délai moyen)"],
      4: ["Étude de faisabilité personnalisée", "Dossier de faisabilité et décision du certificateur"],
      11: ["Planning d'accompagnement", "Dossier de validation (trame)", "Compte-rendu de mise en situation", "Relevé de décision du jury (émis par le certificateur)"],
      22: ["Certifications accompagnateurs VAE", "Plan de DPC", "PV supervisions"],
      30: ["Questionnaire satisfaction", "Bilan post-jury", "Registre des réclamations"],
    },
  };

  const ex = extra[type][num] || [];
  if (ex.length) return ex;
  // Fallback : préserver les questions-preuves du référentiel sous forme de liste documentaire.
  return base;
}

export function pointVigilance(num: number, type: TypeActionAudit): string | undefined {
  const v: Record<TypeActionAudit, Record<number, string>> = {
    AF: {
      1: "Vérifier les dates de mise à jour visibles sur chaque fiche et page web.",
      2: "Indicateurs absents = NC mineure. Au moins une donnée chiffrée obligatoire.",
      11: "Pas d'évaluation = NC majeure. Préparer 1 exemple par stagiaire.",
      26: "Référent handicap nommément désigné OBLIGATOIRE même si pas de PSH accueilli.",
      30: "Tracer impérativement le traitement de chaque réclamation, y compris orale.",
    },
    CFA: {},
    BDC: {
      4: "La phase préliminaire (art. R.6313-4) analyse la demande et informe le bénéficiaire ; son consentement est recueilli avant le démarrage.",
      11: "Les 3 phases (préliminaire, investigation, conclusions) doivent être distinctes et tracées.",
      30: "Bilan à 6 mois obligatoire sur la concrétisation du projet.",
    },
    VAE: {
      4: "L'étude de faisabilité conditionne la suite : ne pas la confondre avec la décision de recevabilité du certificateur (plateforme France VAE).",
      11: "Tracer chaque séance d'accompagnement (émargement ou relevé de visioconférence) ; la durée n'est pas plafonnée par la loi.",
      22: "Les accompagnateurs doivent être formés spécifiquement à la VAE.",
    },
  };
  return v[type][num];
}

const STYLES = `<style>
body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a2e;line-height:1.55;font-size:13px;max-width:1100px;margin:0 auto;padding:30px}
h1.title{font-size:30px;color:#0b2545;text-align:center;margin-bottom:6px}
.sub{text-align:center;color:#475569;font-size:14px;margin-bottom:30px}
.intro{background:#eff6ff;border-left:4px solid #1d4ed8;padding:16px;border-radius:8px;margin-bottom:24px}
h2.crit{font-size:18px;color:white;background:linear-gradient(135deg,#0b2545,#1d4ed8);padding:12px 18px;border-radius:10px;margin-top:30px}
h3.ind{font-size:15px;color:#0b2545;margin-top:22px;border-bottom:2px solid #1d4ed8;padding-bottom:6px}
.tag{display:inline-block;font-size:11px;padding:2px 10px;border-radius:10px;margin-left:6px;font-weight:600;vertical-align:middle;background:#e0f2fe;color:#075985}
.tag.spec{background:#fde68a;color:#78350f}
.lvl{background:#f1f5f9;padding:10px 14px;border-radius:8px;margin:8px 0;font-size:12.5px}
.dire{background:#eff6ff;border-left:4px solid #3b82f6;padding:10px 14px;border-radius:8px;margin:8px 0;font-style:italic}
.docs{margin:8px 0}.docs li{margin:3px 0}
.vigilance{background:#fffbeb;border-left:4px solid #f59e0b;padding:10px 14px;border-radius:8px;margin:8px 0;font-size:12.5px}
.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:14px 0}
.kpi{background:white;border:1px solid #cbd5e1;border-left:4px solid #1d4ed8;border-radius:8px;padding:10px 12px}
.kpi .k{font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:.4px}
.kpi .v{font-size:18px;font-weight:700;color:#0b2545;margin-top:2px}
table.fdr{width:100%;border-collapse:collapse;margin:10px 0;font-size:11.5px}
table.fdr th{background:#0b2545;color:white;padding:8px 6px;text-align:left;font-weight:600;border:1px solid #0b2545}
table.fdr td{padding:6px;border:1px solid #cbd5e1;vertical-align:top}
table.fdr tr:nth-child(even) td{background:#f8fafc}
.st-ok{background:#dcfce7;color:#166534;padding:2px 8px;border-radius:10px;font-weight:600;font-size:10.5px;white-space:nowrap}
.st-part{background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:10px;font-weight:600;font-size:10.5px;white-space:nowrap}
.st-ko{background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:10px;font-weight:600;font-size:10.5px;white-space:nowrap}
.footer{margin-top:50px;text-align:center;color:#64748b;font-size:11px;border-top:1px solid #e2e8f0;padding-top:16px}
</style>`;

const fmt = (d?: string) => d ? new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" }) : "—";

function generateGuideAutres(
  org: OrganismeInfo,
  formations: FormationInfo[],
  catalog: DocEntry[],
  stagiaires: StagiaireInfo[],
  type: TypeActionAudit
): string {
  const today = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
  const refCode = ACTION_TO_REF_CODE[type];
  const label = ACTION_LABELS[type];
  const ben = ACTION_BENEFICIAIRE[type];

  const docsByInd = new Map<number, string[]>();
  catalog.forEach(d => {
    if (!docsByInd.has(d.indicateur)) docsByInd.set(d.indicateur, []);
    docsByInd.get(d.indicateur)!.push(d.nom);
  });

  const indicateurs = INDICATEURS_REFERENCE.filter(i => i.applicableActions.includes(refCode));

  let html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">${STYLES}</head><body>`;
  html += `<h1 class="title">GUIDE DE PRÉPARATION À L'AUDIT QUALIOPI</h1>
  <div class="sub">${label} — ${org.nom}<br>Référentiel national qualité (décret n° 2026-728, guide de lecture V9) — ${indicateurs.length} indicateurs applicables · Édition du ${today}</div>

  <h2 class="crit" style="font-size:16px">1. Organisme audité</h2>
  <div class="lvl">
    <strong>${org.nom}</strong><br>
    SIRET : ${org.siret || "—"} · NDA : ${org.nda || "—"}${org.certifications ? ` · Certifications : ${org.certifications}` : ""}<br>
    ${org.adresse || ""} ${org.codePostal || ""} ${org.ville || ""}<br>
    ${org.telephone ? `Tél. : ${org.telephone} · ` : ""}${org.email ? `Email : ${org.email}` : ""}${org.siteWeb ? ` · Site : ${org.siteWeb}` : ""}<br>
    <br>
    <strong>Organisation interne :</strong><br>
    • Dirigeant : ${org.dirigeant || "—"}<br>
    • Responsable pédagogique : ${org.responsablePedagogique || "—"}<br>
    • Référent handicap : ${org.referentHandicap || "—"}<br>
    • Référent qualité : ${org.referentQualite || "—"}<br>
    ${org.poleAdministratif ? `• Pôle administratif : ${org.poleAdministratif}<br>` : ""}
    ${org.relationEntreprises ? `• Relation entreprises : ${org.relationEntreprises}<br>` : ""}
    ${org.referentMobilite ? `• Référent mobilité : ${org.referentMobilite}<br>` : ""}
    ${org.referentDecrochage ? `• Référent décrochage : ${org.referentDecrochage}<br>` : ""}
    ${org.referentNumerique ? `• Référent numérique : ${org.referentNumerique}<br>` : ""}
    <br>
    <strong>Périmètre :</strong> ${label}${org.domainesFormation ? ` · Domaines : ${org.domainesFormation}` : ""}<br>
    ${org.outilsUtilises ? `<strong>Outils :</strong> ${org.outilsUtilises}<br>` : ""}
    <strong>Version SMQ :</strong> ${org.version || "—"} · MAJ : ${fmt(org.dateMaj)}
  </div>

  ${formations.length ? `<h2 class="crit" style="font-size:16px">2. Prestation(s) auditée(s) (${formations.length})</h2>
  ${formations.map((f, i) => `<div class="lvl">
    <strong>${i+1}. ${f.intitule || "—"}</strong>${f.codeRNCP ? ` <span class="tag">${f.codeRNCP}</span>` : ""}<br>
    ${f.publicVise ? `• <strong>Public visé :</strong> ${f.publicVise}<br>` : ""}
    ${f.prerequis ? `• <strong>Prérequis :</strong> ${f.prerequis}<br>` : ""}
    ${f.objectifs ? `• <strong>Objectifs :</strong> ${f.objectifs}<br>` : ""}
    ${f.programme ? `• <strong>Programme :</strong> ${f.programme}<br>` : ""}
    • <strong>Durée :</strong> ${f.duree || "—"}${f.nombreParticipants ? ` · ${f.nombreParticipants} participant(s)` : ""}<br>
    • <strong>Dates :</strong> ${fmt(f.dateDebut)} → ${fmt(f.dateFin)}${f.delaiAcces ? ` · Délai d'accès : ${f.delaiAcces}` : ""}<br>
    ${f.modalites ? `• <strong>Modalités :</strong> ${f.modalites}<br>` : ""}
    ${f.lieu ? `• <strong>Lieu :</strong> ${f.lieu}<br>` : ""}
    ${f.moyensPedagogiques ? `• <strong>Moyens pédagogiques :</strong> ${f.moyensPedagogiques}<br>` : ""}
    ${f.methodesEvaluation ? `• <strong>Modalités d'évaluation :</strong> ${f.methodesEvaluation}<br>` : ""}
    ${f.tarif ? `• <strong>Tarif :</strong> ${f.tarif}<br>` : ""}
    ${f.formateur ? `• <strong>Formateur(s) :</strong> ${f.formateur}` : ""}
  </div>`).join("")}` : ""}

  ${stagiaires.length ? `<h2 class="crit" style="font-size:16px">3. ${ben.charAt(0).toUpperCase()+ben.slice(1)}s concerné(e)s (${stagiaires.length})</h2>
  ${stagiaires.map((s, i) => `<div class="lvl" style="font-size:12px">
    <strong>${i+1}. ${s.civilite||""} ${s.prenom||""} ${s.nom||""}</strong>${s.dateNaissance ? ` · né(e) le ${fmt(s.dateNaissance)}` : ""}${s.rqth === "oui" ? ` <span class="tag spec">RQTH</span>` : ""}<br>
    ${s.email ? `${s.email}` : ""}${s.telephone ? ` · ${s.telephone}` : ""}<br>
    ${s.adresse || s.commune ? `${s.adresse || ""} ${s.codePostal || ""} ${s.commune || ""}<br>` : ""}
    ${s.diplome ? `Diplôme/Niveau : ${s.diplome}<br>` : ""}
    ${s.entreprise ? `<strong>Entreprise :</strong> ${s.entreprise}${s.poste ? ` — ${s.poste}` : ""}${s.responsableEntreprise ? ` · Resp. : ${s.responsableEntreprise}` : ""}<br>` : ""}
    ${s.siretEntreprise ? `SIRET entreprise : ${s.siretEntreprise}<br>` : ""}
    <strong>Parcours :</strong> ${fmt(s.dateDebutFormation)} → ${fmt(s.dateFinFormation)}${s.tarifFormation ? ` · ${s.tarifFormation}` : ""}${s.numeroAction ? ` · Action n° ${s.numeroAction}` : ""}
    ${s.formateur ? `<br>Formateur affecté : ${s.formateur}` : ""}
  </div>`).join("")}` : ""}

  <h2 class="crit" style="font-size:16px">4. Feuille de route — Chiffres clés &amp; tableau de suivi des ${indicateurs.length} indicateurs</h2>

  ${(() => {
    const parseNum = (s?: string): number => {
      if (!s) return 0;
      const m = String(s).replace(/\s|\u00A0/g, "").replace(",", ".").match(/(\d+(?:\.\d+)?)/);
      return m ? parseFloat(m[1]) : 0;
    };
    const caStagiaires = stagiaires.reduce((sum, s) => sum + parseNum(s.tarifFormation), 0);
    let caForm = 0;
    formations.forEach(f => {
      const t = parseNum(f.tarif); const n = parseNum(f.nombreParticipants) || 1;
      caForm += t * n;
    });
    const caTotal = caStagiaires > 0 ? caStagiaires : caForm;
    const psh = stagiaires.filter(s => s.rqth === "oui").length;
    const totalHeures = formations.reduce((s, f) => s + parseNum(f.duree), 0);
    const indCouverts = indicateurs.filter(i => (docsByInd.get(i.numero) || []).length > 0).length;
    const tauxCouv = indicateurs.length ? Math.round((indCouverts / indicateurs.length) * 100) : 0;
    const fmtEur = (n: number) => n > 0 ? n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + " €" : "—";

    let html = `<div class="kpis">
      <div class="kpi"><div class="k">Chiffre d'affaires audité</div><div class="v">${fmtEur(caTotal)}</div></div>
      <div class="kpi"><div class="k">Prestations</div><div class="v">${formations.length}</div></div>
      <div class="kpi"><div class="k">${ben.charAt(0).toUpperCase()+ben.slice(1)}s</div><div class="v">${stagiaires.length}${psh ? ` (${psh} RQTH)` : ""}</div></div>
      <div class="kpi"><div class="k">Volume total</div><div class="v">${totalHeures > 0 ? totalHeures + " h" : "—"}</div></div>
      <div class="kpi"><div class="k">Documents produits</div><div class="v">${catalog.length}</div></div>
      <div class="kpi"><div class="k">Indicateurs couverts</div><div class="v">${indCouverts}/${indicateurs.length}</div></div>
      <div class="kpi"><div class="k">Taux de couverture</div><div class="v">${tauxCouv}%</div></div>
      <div class="kpi"><div class="k">Référent qualité</div><div class="v" style="font-size:13px">${org.referentQualite || org.dirigeant || "—"}</div></div>
    </div>`;

    html += `<table class="fdr"><thead><tr>
      <th style="width:90px">Critère</th><th style="width:38px">N°</th>
      <th>Indicateur</th><th style="width:120px">Type</th>
      <th style="width:60px">Docs</th><th style="width:90px">Statut</th>
      <th style="width:140px">Responsable</th>
    </tr></thead><tbody>`;
    indicateurs.forEach(ind => {
      const nbDocs = (docsByInd.get(ind.numero) || []).length;
      const stCls = nbDocs === 0 ? "st-ko" : nbDocs < 2 ? "st-part" : "st-ok";
      const stLbl = nbDocs === 0 ? "À faire" : nbDocs < 2 ? "Partiel" : "Couvert";
      const typeLbl = ind.type === "specifique" ? `Spécifique ${refCode}` : "Commun";
      const resp = ind.numero >= 17 && ind.numero <= 22 ? (org.responsablePedagogique || org.dirigeant || "—")
                 : ind.numero === 26 ? (org.referentHandicap || "—")
                 : (org.referentQualite || org.dirigeant || "—");
      html += `<tr>
        <td>C${ind.critere}</td><td><strong>${ind.numero}</strong></td>
        <td>${ind.intitule.split(".")[0]}</td><td>${typeLbl}</td>
        <td style="text-align:center">${nbDocs}</td>
        <td><span class="${stCls}">${stLbl}</span></td>
        <td>${resp}</td>
      </tr>`;
    });
    html += `</tbody></table>
    <p style="font-size:11.5px;color:#475569;margin-top:6px"><strong>Lecture :</strong> « Couvert » = 2 documents ou plus produits par l'application pour cet indicateur · « Partiel » = 1 document · « À faire » = aucun document généré, à compléter avant audit.</p>`;
    return html;
  })()}

  <h2 class="crit" style="font-size:16px">5. Indicateurs Qualiopi — Quoi dire à l'auditeur</h2>

  <div class="intro">
    <strong>Comment utiliser ce guide.</strong> Pour chaque indicateur applicable à votre activité (${label}), vous trouverez : (1) le niveau attendu par l'auditeur, (2) un script de ce qu'il faut dire adapté à votre périmètre, (3) la liste des documents à présenter, et (4) les points de vigilance.
    <br><br><strong>Principe d'or :</strong> la conformité repose sur l'appréciation de l'auditeur quant à la mise en œuvre, pas sur la simple présence d'un document. Parlez de votre processus, puis montrez la preuve.
  </div>`;

  Object.entries(CRITERES_TITLES).forEach(([cNum, cTitre]) => {
    const cInd = indicateurs.filter(i => i.critere === parseInt(cNum));
    if (!cInd.length) return;
    html += `<h2 class="crit">Critère ${cNum} — ${cTitre}</h2>`;
    cInd.forEach(ind => {
      const docs = docsByInd.get(ind.numero) || [];
      const tagsHtml = ind.type === "specifique" ? `<span class="tag spec">spécifique ${refCode}</span>` : `<span class="tag">commun</span>`;
      const script = scriptParIndicateur(ind.numero, type, ind.niveauAttendu);
      const preuves = preuvesParIndicateur(ind.numero, type, ind.questionsPreuves);
      const vig = pointVigilance(ind.numero, type);
      html += `<h3 class="ind">Indicateur ${ind.numero} — ${ind.intitule.split(".")[0]} ${tagsHtml}</h3>
      <div class="lvl"><strong>Niveau attendu :</strong> ${ind.niveauAttendu}</div>
      <div class="dire"><strong>✅ Ce qu'il faut dire :</strong> « ${script} »</div>
      <p><strong>📁 Documents à présenter</strong></p>
      <ul class="docs">${preuves.map(p => `<li>${p}</li>`).join("")}</ul>
      ${docs.length ? `<p style="font-size:11.5px;color:#475569"><strong>Documents générés par l'application pour cet indicateur :</strong> ${docs.slice(0, 6).join(" · ")}${docs.length > 6 ? ` … (+${docs.length - 6})` : ""}</p>` : ""}
      ${vig ? `<div class="vigilance"><strong>⚠️ Point de vigilance :</strong> ${vig}</div>` : ""}`;
    });
  });

  html += `<div class="footer">${org.nom} · SIRET ${org.siret || "—"} · NDA ${org.nda || "—"} — Guide Prépa Qualiopi ${label} · ${today}<br>Document préparatoire interne — ne pas diffuser.</div>`;
  html += `</body></html>`;
  return html;
}

export function generateGuideAuditUniversal(
  org: OrganismeInfo,
  formations: FormationInfo[],
  catalog: DocEntry[],
  stagiaires: StagiaireInfo[] = [],
  type: TypeActionAudit,
  typeAuditCFA: TypeAuditCFA = "initial"
): string {
  if (type === "CFA") {
    return generateGuideAuditCFA(org, formations, catalog, stagiaires, typeAuditCFA);
  }
  return generateGuideAutres(org, formations, catalog, stagiaires, type);
}

export const TYPE_ACTION_LABELS = ACTION_LABELS;
