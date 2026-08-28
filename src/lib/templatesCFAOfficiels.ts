// =============================================================================
// TEMPLATES CFA OFFICIELS — DP / ECF / PV de session
// Reproduction fidèle des modèles officiels Ministère du Travail (TP)
// Génération automatique adaptée à n'importe quel RNCP CFA
// =============================================================================

import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { getRNCPByCode, RNCPFiche } from "./rncpData";
import { formatDate, isFormationTerminee, isStagiaireFormationTerminee } from "./docBuilder";
import { generateAIDPPack, getCachedDPPack, AIDPExemple } from "./aiDPPack";

// -----------------------------------------------------------------------------
// Helpers communs
// -----------------------------------------------------------------------------

function hashStr(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function getRNCP(f: FormationInfo): RNCPFiche | null {
  if (!f.codeRNCP) return null;
  return getRNCPByCode(f.codeRNCP) || null;
}

function getActivitesTypes(f: FormationInfo): { titre: string; competences: string[] }[] {
  const rncp = getRNCP(f);
  if (rncp && rncp.blocsCompetences.length > 0) {
    return rncp.blocsCompetences.map(b => ({ titre: b.titre, competences: b.competences }));
  }
  // Fallback générique
  return [
    { titre: "Activité-type 1", competences: ["Compétence 1.1", "Compétence 1.2", "Compétence 1.3"] },
    { titre: "Activité-type 2", competences: ["Compétence 2.1", "Compétence 2.2", "Compétence 2.3"] },
  ];
}

function getCodeTitre(f: FormationInfo): string {
  const code = (f.codeRNCP || "").toUpperCase();
  if (code.startsWith("RNCP")) {
    const num = code.replace(/[^0-9]/g, "");
    return `TP-${num.padStart(5, "0").slice(-5)}`;
  }
  return "TP-00000";
}

function getMillesime(f: FormationInfo): string {
  const rncp = getRNCP(f);
  if (rncp?.dateEnregistrement) {
    const y = rncp.dateEnregistrement.split("/").pop();
    if (y) return y.slice(-2);
  }
  return "01";
}

function getDateJO(f: FormationInfo): string {
  const rncp = getRNCP(f);
  return rncp?.dateEnregistrement || formatDate(new Date().toISOString().slice(0, 10));
}

function todayCompact(): string {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

/**
 * Date de mise à jour à afficher dans le footer officiel.
 * Toujours basée sur la date de MAJ du formulaire organisme (o.dateMaj).
 * Si non renseignée, fallback sur la date du jour.
 */
function getDateMajOrg(o: OrganismeInfo): string {
  if (o?.dateMaj) {
    const d = new Date(o.dateMaj);
    if (!isNaN(d.getTime())) {
      return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
    }
  }
  return todayCompact();
}

/**
 * Sépare un nom complet "Prénom NOM" ou "PRÉNOM Nom" en { prenom, nom }.
 */
function splitFormateur(full: string): { prenom: string; nom: string } {
  if (!full) return { prenom: "", nom: "" };
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { prenom: "", nom: parts[0] };
  // On considère que le dernier token est le nom de famille,
  // sauf s'il est en MAJUSCULES (cas "AHMED EL FATHI" => nom = "EL FATHI")
  const upperTokens = parts.filter(p => p === p.toUpperCase() && p.length > 1);
  if (upperTokens.length >= 1 && upperTokens.length < parts.length) {
    const prenomTokens = parts.filter(p => !(p === p.toUpperCase() && p.length > 1));
    return { prenom: prenomTokens.join(" "), nom: upperTokens.join(" ") };
  }
  return { prenom: parts.slice(0, -1).join(" "), nom: parts.slice(-1)[0] };
}

function getStagDateNaissance(s: StagiaireInfo): string {
  if (s.dateNaissance) {
    const d = new Date(s.dateNaissance);
    if (!isNaN(d.getTime())) {
      return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
    }
  }
  // Fallback déterministe
  const seed = hashStr(`${s.prenom}-${s.nom}`);
  const day = String((seed % 28) + 1).padStart(2, "0");
  const month = String((seed % 12) + 1).padStart(2, "0");
  const year = 1985 + (seed % 18);
  return `${day}/${month}/${year}`;
}

function getStagAdresse(s: StagiaireInfo): string {
  return s.adresse ? `${s.adresse}${s.codePostal ? `<br>${s.codePostal} ${s.commune || ""}` : ""}` : "Adresse non renseignée";
}

function getDateDebut(f: FormationInfo, s?: StagiaireInfo): string {
  return s?.dateDebutFormation || f.dateDebut || "";
}

function getDateFin(f: FormationInfo, s?: StagiaireInfo): string {
  return s?.dateFinFormation || f.dateFin || "";
}

function fmtDateFR(d: string): string {
  if (!d) return "";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return d;
  return `${String(dt.getDate()).padStart(2, "0")}/${String(dt.getMonth() + 1).padStart(2, "0")}/${dt.getFullYear()}`;
}

// -----------------------------------------------------------------------------
// CSS officiel (mise en forme Ministère)
// -----------------------------------------------------------------------------

function ministereStyle(): string {
  return `<style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Calibri','Arial',sans-serif;color:#000;font-size:11pt;line-height:1.4}
    /* .page = logical section only. The PDF engine handles the A4 sizing.
       No max-width / no padding / no absolute footer so we don't overflow
       the engine content area and trigger blank pages. */
    .page{background:#fff;padding:10px 18px 18px;margin:0}
    .page + .page{page-break-before:always;break-before:page}
    .ministere-header{margin-bottom:20px}
    .ministere-header img.ministere-logo-img{display:block;max-height:110px;width:auto}
    h1.dp-title{text-align:center;font-size:18pt;font-weight:bold;margin:30px 0 20px;letter-spacing:1px;color:#0055A4}
    h2.section-title{font-size:13pt;font-weight:bold;margin:25px 0 12px;color:#fff;background:#C2185B;padding:8px 14px;border-radius:0}
    h3.subsection{font-size:11pt;font-weight:bold;margin:18px 0 8px}
    .activite-type{background:#C2185B;color:white;padding:8px 14px;font-weight:bold;font-size:11pt;margin:18px 0 10px;border-radius:2px}
    .exemple-titre{font-weight:bold;font-style:italic;margin:10px 0;color:#333}
    .info-block{margin:10px 0;padding:8px 0}
    .info-block strong{display:inline-block;min-width:160px}
    .question-block{margin:14px 0}
    .question-block .q{font-weight:bold;margin-bottom:6px}
    .question-block .a{padding:6px 0;text-align:justify;line-height:1.5}
    table.eval-table,table.candidate-table,table.officiel{width:100%;border-collapse:collapse;margin:12px 0;font-size:10pt}
    table.eval-table th,table.eval-table td,table.candidate-table th,table.candidate-table td,table.officiel th,table.officiel td{border:1px solid #000;padding:6px 8px;vertical-align:top;text-align:left}
    table.eval-table th,table.candidate-table th,table.officiel th{background:#E8EEF7;font-weight:bold;font-size:9pt}
    .check-line{margin:8px 0;font-size:10pt}
    .check-box{display:inline-block;width:14px;height:14px;border:1.5px solid #000;text-align:center;line-height:11px;vertical-align:middle;margin-right:6px;font-weight:bold}
    .check-box.ck::before{content:"X";font-size:11pt}
    /* Footer is no longer absolutely positioned — it sits inline at the end
       of each .page block so it cannot overflow the PDF page area. */
    .footer-table{margin-top:24px;width:100%}
    .footer-table table{width:100%;border-collapse:collapse;font-size:8pt}
    .footer-table th,.footer-table td{border:1px solid #999;padding:3px 5px;text-align:center}
    .footer-table th{background:#F0F0F0}
    .signature-area{margin-top:18px;border-top:1px dashed #999;padding-top:12px}
    .signature-area .sig-line{display:flex;justify-content:space-between;gap:20px;margin:10px 0}
    .signature-area .sig-line .sig-cell{flex:1;border:1px solid #000;min-height:60px;padding:6px;font-size:9pt}
    .obs-box{border:1px solid #000;min-height:50px;padding:8px;margin:8px 0;background:#fafafa;font-style:italic;color:#333}
    p.justify{text-align:justify;margin:8px 0;line-height:1.5}
    ul.dp-list{margin:8px 0 8px 20px}
    ul.dp-list li{margin:3px 0}
    .declaration{margin:20px 0;line-height:1.6;text-align:justify}
    .competence-list{margin:8px 0 12px 22px;font-size:10pt}
    .competence-list li{margin:3px 0}
    .resultat-final{padding:12px;border:2px solid #0055A4;background:#E8EEF7;text-align:center;font-weight:bold;margin:14px 0;font-size:11pt}
    /* Neutralise stray break markers that used to create blank pages. */
    .page-break{display:none}
  </style>`;
}

function ministereHeader(centerTitle: string, subTitle?: string): string {
  return `
    <h1 class="dp-title">${centerTitle}</h1>
    ${subTitle ? `<p style="text-align:center;font-style:italic;margin-bottom:20px;color:#555">${subTitle}</p>` : ""}
  `;
}

function footerOfficiel(sigle: string, typeDoc: string, codeTitre: string, mil: string, dateJo: string, page: string, dateMaj: string): string {
  return `<div class="footer-table"><table>
    <tr><th>SIGLE</th><th>Type de document</th><th>Code titre</th><th>Millésime</th><th>Date JO</th><th>Date de mise à jour</th><th>Page</th></tr>
    <tr><td>${sigle}</td><td>${typeDoc}</td><td>${codeTitre}</td><td>${mil}</td><td>${dateJo}</td><td>${dateMaj}</td><td>${page}</td></tr>
  </table></div>`;
}

// -----------------------------------------------------------------------------
// Banque de scénarios professionnels (par grand domaine)
// -----------------------------------------------------------------------------

const SCENARIOS_PAR_DOMAINE: Record<string, { intitules: string[]; entreprises: string[]; secteur: string }> = {
  commercial: {
    intitules: [
      "Conquête d'un nouveau client grand compte sur le marché B2B",
      "Mise en place d'une stratégie de prospection digitale via LinkedIn",
      "Négociation d'un contrat-cadre avec un distributeur national",
      "Lancement commercial d'une nouvelle gamme de produits",
      "Développement d'un portefeuille de clients PME en région",
    ],
    entreprises: ["TECHSOL France", "INNOV PARTNERS", "GROUPE NORDEST", "PME BUSINESS Plus", "DIGITAL VENTURES"],
    secteur: "Service Commercial",
  },
  conduite: {
    intitules: [
      "Animation d'une session de sensibilisation à la sécurité routière en lycée",
      "Préparation et conduite d'une leçon individuelle B sur boîte manuelle",
      "Évaluation pédagogique d'un élève en difficulté avec plan d'accompagnement",
      "Organisation d'une action collective de prévention des risques routiers",
      "Encadrement d'une formation post-permis pour jeunes conducteurs",
    ],
    entreprises: ["AUTO-ÉCOLE START", "ECF DRIVE", "CER FORMATION", "PERMIS PLUS", "ROUTE ACADEMY"],
    secteur: "Pédagogique",
  },
  management: {
    intitules: [
      "Pilotage de la performance opérationnelle d'une équipe de 8 collaborateurs",
      "Mise en place d'un plan d'actions correctives suite à un audit qualité",
      "Recrutement et intégration d'un nouveau collaborateur en CDI",
      "Élaboration et présentation du budget prévisionnel annuel",
      "Conduite d'un projet de réorganisation interne avec impact RH",
    ],
    entreprises: ["GROUPE LEADER", "STRUCTURE PME+", "ENTREPRISE EXCELLENCE", "MANAGEMENT SOLUTIONS", "ORGA PRO"],
    secteur: "Direction",
  },
  esthetique: {
    intitules: [
      "Mise en place d'un protocole de soins socio-esthétiques en EHPAD",
      "Animation d'un atelier bien-être pour personnes en situation de handicap",
      "Accompagnement individuel d'une bénéficiaire en oncologie",
      "Conception d'une offre de soins adaptée pour public fragilisé",
      "Mise en œuvre d'un partenariat avec un service hospitalier",
    ],
    entreprises: ["INSTITUT BIEN-ÊTRE", "SOIN & PARTAGE", "ESTHÉTIQUE SOLIDAIRE", "BEAUTY CARE PRO", "BIEN-ÊTRE & VOUS"],
    secteur: "Soins",
  },
  numerique: {
    intitules: [
      "Développement d'une application web responsive pour un client retail",
      "Migration d'une base de données legacy vers une architecture cloud",
      "Refonte UX/UI d'un site e-commerce avec hausse du taux de conversion",
      "Mise en production d'un module API avec intégration continue",
      "Audit de sécurité et mise en conformité RGPD d'une plateforme",
    ],
    entreprises: ["DIGITAL FACTORY", "WEB AGENCY PRO", "CODE & CO", "TECH STARTUP", "INNOV NUMÉRIQUE"],
    secteur: "Développement",
  },
  transport: {
    intitules: [
      "Organisation d'un plan de transport régulier Île-de-France ↔ Hauts-de-France pour un chargeur industriel",
      "Tarification et formalisation d'une proposition d'affrètement complet 24T sur l'axe Paris-Lyon-Marseille",
      "Mise en place d'un plan de tournées de messagerie sur la zone Grand Paris avec optimisation TMS",
      "Traitement d'un litige transport (avarie marchandise) sous Convention CMR avec expertise contradictoire",
      "Reconstitution des indicateurs de performance exploitation (OTIF, taux de retour à vide, PRK) et plan d'actions correctives",
      "Sélection et contractualisation d'un panel de sous-traitants conformément au contrat-type sous-traitance transport",
      "Pilotage d'une équipe de 8 conducteurs PL/SPL dans le respect du règlement (CE) 561/2006 et de l'AETR",
      "Gestion d'un aléa exploitation : panne véhicule sur tournée régulière et réorganisation en temps réel",
    ],
    entreprises: [
      "TRANSPORTS GEODIS",
      "DACHSER FRANCE",
      "STEF TRANSPORT",
      "GROUPE CHARLES ANDRÉ (GCA)",
      "TRANSPORTS JACKY PERRENOT",
      "DELANCHY TRANSPORTS",
      "XPO LOGISTICS",
      "HEPPNER TRANSPORTS",
    ],
    secteur: "Exploitation Transport Routier de Marchandises",
  },
  default: {
    intitules: [
      "Mise en œuvre d'une procédure interne d'amélioration des processus",
      "Conduite d'un projet transversal au sein de la structure",
      "Accompagnement individualisé d'un public bénéficiaire",
      "Élaboration d'un plan d'actions sur l'année écoulée",
      "Mise en place d'une démarche de qualité et de suivi",
    ],
    entreprises: ["ENTREPRISE TYPE", "STRUCTURE PRO", "ORGANISATION FRANCE", "GROUPE ACTIVITÉ", "SOCIÉTÉ EXEMPLE"],
    secteur: "Opérations",
  },
};

function detectDomaine(f: FormationInfo): keyof typeof SCENARIOS_PAR_DOMAINE {
  const t = `${f.intitule} ${f.codeRNCP}`.toLowerCase();
  // Transport routier de marchandises (GOTRM, exploitant, affréteur) — AVANT "conduite" car contient "routier"
  if (/gotrm|gestionnaire.*transport|transport.*routier.*marchandises|exploitant.*transport|affr[ée]teur|rncp40990|tp-?01329/i.test(t)) return "transport";
  if (/n[ée]goci|commercial|vente|technico/i.test(t)) return "commercial";
  if (/conduite|ecsr|enseignant.*conduite|s[ée]curit[ée] routi/i.test(t)) return "conduite";
  if (/responsable|petite.*moyenne|management|dirigeant|rpms|assistant.*direction/i.test(t)) return "management";
  if (/esth[ée]ti|massage|bien.?[êe]tre|socio/i.test(t)) return "esthetique";
  if (/d[ée]veloppeur|web|num[ée]rique|informatique|infographiste/i.test(t)) return "numerique";
  return "default";
}

function genererExemplePratique(
  f: FormationInfo,
  s: StagiaireInfo,
  activite: { titre: string; competences: string[] },
  exempleIdx: number
): { intitule: string; tache: string; moyens: string; collegues: string; entreprise: string; periode: string } {
  const dom = detectDomaine(f);
  const scenarios = SCENARIOS_PAR_DOMAINE[dom];
  const seed = hashStr(`${s.prenom}-${s.nom}-${activite.titre}-${exempleIdx}`);
  const intitule = pick(scenarios.intitules, seed);
  const entreprise = s.entreprise || pick(scenarios.entreprises, seed + 7);
  const competence = pick(activite.competences, seed + 13);
  const competence2 = pick(activite.competences, seed + 17);

  const tache = dom === "transport"
    ? `Dans le cadre de mes fonctions d'exploitant transport au sein de ${entreprise}, j'ai été chargé(e) de l'opération suivante : « ${intitule} ». Cette mission s'inscrit dans l'activité-type « ${activite.titre.toLowerCase()} » et m'a conduit(e) à ${competence.toLowerCase()}. J'ai d'abord analysé le cahier des charges client (volumes, délais, contraintes ADR/ATP, incoterms), puis vérifié la faisabilité technique et réglementaire (Code des transports, R(CE) 561/2006, AETR, contrat-type général). J'ai ensuite calculé le prix de revient kilométrique (PRK) à partir des indices CNR, formalisé la proposition commerciale, affecté les moyens (tracteurs, semi-remorques, conducteurs disponibles selon coupures et repos hebdomadaires) et planifié l'opération dans notre TMS. Pendant l'exécution, j'ai assuré le suivi temps réel via géolocalisation, traité les aléas (panne, retard chargement, refus livraison) et tenu informé le donneur d'ordres. À la clôture, j'ai contrôlé les CMR, levé les réserves éventuelles, validé la facturation et alimenté les indicateurs OTIF et marge brute remontés à la direction d'exploitation.`
    : `Dans le cadre de mes fonctions au sein de ${entreprise}, j'ai été chargé(e) de mener à bien l'opération suivante : « ${intitule} ». Cette mission s'inscrivait pleinement dans l'activité « ${activite.titre.toLowerCase()} » et visait à ${competence.toLowerCase()}. J'ai d'abord procédé à une analyse complète du contexte initial pour identifier les besoins, les contraintes et les opportunités. J'ai ensuite défini un plan d'action structuré, validé en interne avec ma hiérarchie, puis mis en œuvre les différentes étapes en assurant le suivi et le pilotage continu de l'activité. Cette démarche m'a permis de mobiliser pleinement mes compétences professionnelles et d'apporter une réponse opérationnelle conforme aux attendus. Les résultats obtenus ont été présentés lors d'une revue de fin de mission, validant l'atteinte des objectifs fixés.`;

  const moyens = dom === "transport"
    ? `Moyens humains et matériels mobilisés : équipe d'exploitation (2 à 3 exploitants + 1 affréteur), 8 conducteurs PL/SPL en propre et un panel de 12 sous-traitants référencés (licence communautaire, attestation de capacité, RC pro à jour). Moyens techniques : TMS exploitation (Akanea / Trans-iX), bourses de fret B2P, Teleroute et Wtransnet pour le complément d'affrètement, géolocalisation embarquée (Shippeo), chronotachygraphes numériques pour le contrôle des temps de conduite, suite bureautique Word® / Excel® pour les états de tournée, indices CNR pour l'indexation gazole, contrat-type général transport et contrat-type sous-traitance (décret du 26/12/2017). J'ai mobilisé les compétences acquises en formation, en particulier « ${competence2.toLowerCase()} », pour sécuriser juridiquement et économiquement l'opération.`
    : `Pour mener à bien cette mission, j'ai utilisé les outils et ressources suivants : suite bureautique (Word, Excel, PowerPoint), outils internes de gestion et de reporting, plateforme collaborative pour le partage documentaire, fiches de procédures internes, supports de communication adaptés, ainsi que les ressources documentaires de référence du métier. J'ai également mobilisé les compétences acquises en formation, notamment celles relatives à « ${competence2.toLowerCase()} », pour structurer ma démarche et garantir la qualité du livrable final.`;

  const seedColl = hashStr(`${s.prenom}-coll-${exempleIdx}`);
  const collColl = dom === "transport"
    ? [
        "le responsable d'exploitation, qui a validé le plan de transport et arbitré les priorités",
        "l'équipe d'affrètement (2 affréteurs) pour la sélection et le suivi des sous-traitants",
        "le service SAV / litiges pour le traitement des réserves CMR et les indemnisations",
        "le service commercial pour la remontée client et la fidélisation du donneur d'ordres",
        "le service comptabilité-facturation pour la clôture financière du dossier",
      ]
    : [
        "ma responsable hiérarchique, qui a validé chaque étape clé",
        "mes collègues du service, en particulier le pôle qualité et le pôle administratif",
        "le service support et la direction, pour la validation finale des livrables",
        "l'équipe projet pluridisciplinaire mobilisée sur ce dossier",
        "mon tuteur pédagogique et mon maître d'apprentissage",
      ];
  const collegues = `J'ai travaillé en collaboration avec ${pick(collColl, seedColl)}. Cette collaboration transversale a été essentielle pour garantir la cohérence de l'action menée et l'adhésion de l'ensemble des parties prenantes.`;

  const periode = (() => {
    const debut = getDateDebut(f, s) || "01/10/2024";
    const fin = getDateFin(f, s) || "30/09/2025";
    return `Du ${fmtDateFR(debut)} au ${fmtDateFR(fin)}`;
  })();

  return { intitule, tache, moyens, collegues, entreprise, periode };
}

// =============================================================================
// 1) DOSSIER PROFESSIONNEL (DP)
// =============================================================================

/**
 * Précharge le contenu IA pour le DP d'un stagiaire.
 * À appeler AVANT genDPOfficiel pour bénéficier de la génération Lovable AI.
 * Si l'appel IA échoue, on retombe sur le moteur déterministe local.
 */
export async function preloadDPAIPack(f: FormationInfo, s: StagiaireInfo): Promise<void> {
  try {
    const activites = getActivitesTypes(f);
    const domaine = detectDomaine(f);
    const debut = getDateDebut(f, s) || "";
    const fin = getDateFin(f, s) || "";
    const periode = `Du ${fmtDateFR(debut) || "—"} au ${fmtDateFR(fin) || "—"}`;
    await generateAIDPPack(f, s, activites, domaine, periode);
  } catch (err) {
    console.warn("[preloadDPAIPack] IA indisponible, fallback déterministe :", err);
  }
}

function buildDPExemple(
  f: FormationInfo,
  s: StagiaireInfo,
  activite: { titre: string; competences: string[] },
  ai: number,
  exNum: number,
  aiPack: AIDPExemple | null,
): { intitule: string; tache: string; moyens: string; collegues: string; entreprise: string; periode: string } {
  // 1 exemple IA par activité ; le 2ème reste local pour rester unique et varié
  if (aiPack && exNum === 1) {
    const dom = detectDomaine(f);
    const seedE = hashStr(`${s.prenom}-${s.nom}-${ai}`);
    const entreprise = s.entreprise || pick(SCENARIOS_PAR_DOMAINE[dom].entreprises, seedE);
    const debut = getDateDebut(f, s) || "01/10/2024";
    const fin = getDateFin(f, s) || "30/09/2025";
    return {
      intitule: aiPack.intitule,
      tache: aiPack.tache,
      moyens: aiPack.moyens,
      collegues: aiPack.collegues,
      entreprise,
      periode: `Du ${fmtDateFR(debut)} au ${fmtDateFR(fin)}`,
    };
  }
  return genererExemplePratique(f, s, activite, ai * 10 + exNum);
}

/**
 * Footer officiel du DP (Version du 01/06/2016).
 * Le PDF ministériel n'utilise pas le tableau tabulaire mais une ligne discrète.
 */
function footerDPOfficiel(pageLabel: string): string {
  return `<div class="footer-dp">
    <span>▶ DOSSIER PROFESSIONNEL — Version du 01/06/2016</span>
    <span>Page ${pageLabel}</span>
  </div>`;
}

export function genDPOfficiel(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], stagiaireIdx: number = 0): string {
  const s = stagiaires[stagiaireIdx];
  if (!s) return "<p>Stagiaire introuvable</p>";

  const dateMaj = getDateMajOrg(o);
  const activites = getActivitesTypes(f);
  const intituleTitre = f.intitule || "Titre professionnel";
  const aiPack = getCachedDPPack(f, s);

  // Style spécifique DP (footer simple + check-box carré vide)
  const dpExtraStyle = `<style>
    .footer-dp{position:absolute;bottom:24px;left:40px;right:40px;display:flex;justify-content:space-between;font-size:9pt;color:#555;border-top:1px solid #ddd;padding-top:6px}
    .dp-cover-field{display:flex;align-items:baseline;gap:10px;margin:14px 0;border-bottom:1px solid #000;padding-bottom:4px}
    .dp-cover-field .lbl{min-width:200px;font-weight:bold}
    .dp-cover-field .val{flex:1;min-height:22px;color:#333}
    .dp-modalite-line{margin:10px 0;font-size:11pt}
    .sommaire-activite{font-weight:bold;margin-top:14px;background:#E8EEF7;padding:6px 10px;border-left:3px solid #0055A4}
    .sommaire-exemple{margin:3px 0 3px 20px;display:flex;justify-content:space-between;border-bottom:1px dotted #999;padding:2px 0}
    .sommaire-other{margin-top:16px;display:flex;justify-content:space-between;border-bottom:1px dotted #999;padding:4px 0;font-weight:bold}
    .annex-table{width:100%;border-collapse:collapse;margin:10px 0;font-size:10pt}
    .annex-table th,.annex-table td{border:1px solid #000;padding:8px;vertical-align:top}
    .annex-table th{background:#E8EEF7;font-weight:bold;text-align:left}
    .annex-table td.empty{height:26px}
  </style>`;

  let html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">${ministereStyle()}${dpExtraStyle}</head><body>`;

  // ===== PAGE 1 - Couverture =====
  const nomUsage = (s.nom || "").toUpperCase();
  html += `<div class="page" style="page-break-before:always;break-before:page">
    <div style="text-align:center;margin-bottom:18px">
      <img src="/__l5e/assets-v1/8eb30e71-1ecc-45e5-a0c2-80298a246489/dp-header-officiel.png" alt="République Française – Dossier Professionnel (DP) – Ministère chargé de l'Emploi" style="width:100%;max-width:640px;height:auto" />
    </div>
    <div style="margin-top:40px">
      <div class="dp-cover-field"><span class="lbl">Nom de naissance ▶</span><span class="val">${nomUsage}</span></div>
      <div class="dp-cover-field"><span class="lbl">Nom d'usage ▶</span><span class="val">${nomUsage}</span></div>
      <div class="dp-cover-field"><span class="lbl">Prénom ▶</span><span class="val">${s.prenom || ""}</span></div>
      <div class="dp-cover-field"><span class="lbl">Adresse ▶</span><span class="val">${getStagAdresse(s).replace(/<br>/g, " – ")}</span></div>
    </div>
    <h2 class="section-title" style="margin-top:30px">Titre professionnel visé</h2>
    <p style="font-size:13pt;font-weight:bold;margin:8px 0">${intituleTitre}</p>
    <h3 class="subsection">MODALITÉ D'ACCÈS :</h3>
    <p class="dp-modalite-line"><span class="check-box"></span> Validation des Acquis de l'Expérience (VAE)</p>
    <p class="dp-modalite-line"><span class="check-box ck"></span> Parcours de formation</p>
    ${footerDPOfficiel("1")}
  </div>`;

  // ===== PAGE 2 - Présentation =====
  html += `<div class="page" style="page-break-before:always;break-before:page">
    <h2 class="section-title">DOSSIER PROFESSIONNEL (DP)</h2>
    <h3 class="subsection">Présentation du dossier</h3>
    <p class="justify">Le dossier professionnel (DP) constitue un élément du système de validation du titre professionnel. <strong>Ce titre est délivré par le Ministère chargé de l'emploi.</strong></p>
    <p class="justify">Le DP appartient au candidat. Il le conserve, l'actualise durant son parcours et le présente <strong>obligatoirement à chaque session d'examen</strong>.</p>
    <p class="justify">Pour rédiger le DP, le candidat peut être aidé par un formateur ou par un accompagnateur VAE. Il est consulté par le jury au moment de la session d'examen.</p>
    <h3 class="subsection">Pour prendre sa décision, le jury dispose :</h3>
    <ol class="dp-list" style="list-style:decimal;margin-left:24px">
      <li>des résultats de la mise en situation professionnelle complétés, éventuellement, du questionnaire professionnel ou de l'entretien professionnel ou de l'entretien technique ou du questionnement à partir de productions ;</li>
      <li>du Dossier Professionnel (DP) dans lequel le candidat a consigné les preuves de sa pratique professionnelle ;</li>
      <li>des résultats des évaluations passées en cours de formation lorsque le candidat évalué est issu d'un parcours de formation ;</li>
      <li>de l'entretien final (dans le cadre de la session titre).</li>
    </ol>
    <p style="font-style:italic;font-size:9pt;margin-top:10px">[Arrêté du 22 décembre 2015, relatif aux conditions de délivrance des titres professionnels du ministère chargé de l'Emploi]</p>
    <h3 class="subsection">Ce dossier comporte :</h3>
    <ul class="dp-list">
      <li>pour chaque activité-type du titre visé, un à trois exemples de pratique professionnelle ;</li>
      <li>un tableau à renseigner si le candidat souhaite porter à la connaissance du jury la détention d'un titre, d'un diplôme, d'un certificat de qualification professionnelle (CQP) ou des attestations de formation ;</li>
      <li>une déclaration sur l'honneur à compléter et à signer ;</li>
      <li>des documents illustrant la pratique professionnelle du candidat <em>(facultatif)</em> ;</li>
      <li>des annexes, si nécessaire.</li>
    </ul>
    <p style="font-style:italic;margin-top:10px">Pour compléter ce dossier, le candidat dispose d'un site web en accès libre : <strong>http://travail-emploi.gouv.fr/titres-professionnels</strong></p>
    ${footerDPOfficiel("2")}
  </div>`;

  // ===== PAGE 3 - Sommaire =====
  let pageExemple = 5; // après couverture(1), présentation(2), sommaire(3), séparateur Exemples(4)
  const sommaireRows = activites.map((act, ai) => {
    const firstPage = pageExemple + ai * 2;
    return `<div class="sommaire-activite">Intitulé de l'activité-type n° ${ai + 1} : ${act.titre}<span style="float:right">p. ${firstPage}</span></div>
      <div class="sommaire-exemple"><span>▶ Exemple n° 1</span><span>p. ${firstPage}</span></div>
      <div class="sommaire-exemple"><span>▶ Exemple n° 2</span><span>p. ${firstPage + 1}</span></div>`;
  }).join("");
  const pageAfterExemples = pageExemple + activites.length * 2;
  html += `<div class="page" style="page-break-before:always;break-before:page">
    <h2 class="section-title">DOSSIER PROFESSIONNEL (DP)</h2>
    <h3 class="subsection" style="text-align:center;font-size:14pt">Sommaire</h3>
    <h4 style="margin-top:20px;text-align:center;font-style:italic">Exemples de pratique professionnelle</h4>
    ${sommaireRows}
    <div class="sommaire-other"><span>Titres, diplômes, CQP, attestations de formation <em style="font-weight:normal">(facultatif)</em></span><span>p. ${pageAfterExemples}</span></div>
    <div class="sommaire-other"><span>Déclaration sur l'honneur</span><span>p. ${pageAfterExemples + 1}</span></div>
    <div class="sommaire-other"><span>Documents illustrant la pratique professionnelle <em style="font-weight:normal">(facultatif)</em></span><span>p. ${pageAfterExemples + 2}</span></div>
    <div class="sommaire-other"><span>Annexes <em style="font-weight:normal">(Si le RC le prévoit)</em></span><span>p. ${pageAfterExemples + 3}</span></div>
    ${footerDPOfficiel("3")}
  </div>`;

  // ===== PAGE 4 - Séparateur Exemples =====
  html += `<div class="page" style="page-break-before:always;break-before:page;display:flex;align-items:center;justify-content:center;flex-direction:column">
    <h2 class="section-title" style="text-align:center;width:100%">DOSSIER PROFESSIONNEL (DP)</h2>
    <h1 style="font-size:22pt;text-align:center;margin:120px 0 80px;letter-spacing:2px;color:#0055A4">EXEMPLES DE PRATIQUE PROFESSIONNELLE</h1>
    ${footerDPOfficiel("4")}
  </div>`;

  // ===== PAGES Activités-types & Exemples =====
  let pageNum = 5;
  activites.forEach((act, ai) => {
    const aiExemple = aiPack?.exemples?.[ai] || null;
    [1, 2].forEach((exNum) => {
      const ex = buildDPExemple(f, s, act, ai, exNum, aiExemple);
      html += `<div class="page" style="page-break-before:always;break-before:page">
        <h2 class="section-title">DOSSIER PROFESSIONNEL (DP)</h2>
        <div class="activite-type">Activité-type ${ai + 1} · ${act.titre.toUpperCase()}</div>
        <p class="exemple-titre">Exemple n°${exNum} ▶ ${ex.intitule}</p>

        <div class="question-block">
          <div class="q">1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :</div>
          <div class="a">${ex.tache}</div>
        </div>
        <div class="question-block">
          <div class="q">2. Précisez les moyens utilisés :</div>
          <div class="a">${ex.moyens}</div>
        </div>
        <div class="question-block">
          <div class="q">3. Avec qui avez-vous travaillé ?</div>
          <div class="a">${ex.collegues}</div>
        </div>
        <div class="question-block">
          <div class="q">4. Contexte</div>
          <div class="a">
            <p><strong>Nom de l'entreprise, organisme ou association ▶</strong> ${ex.entreprise}</p>
            <p><strong>Chantier, atelier, service ▶</strong> ${SCENARIOS_PAR_DOMAINE[detectDomaine(f)].secteur}</p>
            <p><strong>Période d'exercice ▶</strong> ${ex.periode}</p>
          </div>
        </div>
        <div class="question-block">
          <div class="q">5. Informations complémentaires <em>(facultatif)</em></div>
          <div class="a">Cette mission s'inscrit dans la continuité de mon parcours professionnel et illustre ma capacité à mobiliser les compétences attendues par le référentiel.</div>
        </div>
        ${footerDPOfficiel(String(pageNum))}
      </div>`;
      pageNum++;
    });
  });

  // ===== PAGE - Titres, diplômes, CQP, attestations (facultatif) =====
  html += `<div class="page" style="page-break-before:always;break-before:page">
    <h2 class="section-title">DOSSIER PROFESSIONNEL (DP)</h2>
    <h3 class="subsection">Titres, diplômes, CQP, attestations de formation <em style="font-weight:normal">(facultatif)</em></h3>
    <table class="annex-table">
      <tr><th style="width:45%">Intitulé</th><th style="width:35%">Autorité ou organisme</th><th style="width:20%">Date</th></tr>
      ${Array.from({ length: 9 }).map(() => `<tr><td class="empty"></td><td class="empty"></td><td class="empty"></td></tr>`).join("")}
    </table>
    ${footerDPOfficiel(String(pageNum))}
  </div>`;
  pageNum++;

  // ===== PAGE Déclaration sur l'honneur =====
  html += `<div class="page" style="page-break-before:always;break-before:page">
    <h2 class="section-title">DOSSIER PROFESSIONNEL (DP)</h2>
    <h3 class="subsection">Déclaration sur l'honneur</h3>
    <p class="declaration">Je soussigné(e) <strong>${(s.prenom || "").toUpperCase()} ${(s.nom || "").toUpperCase()}</strong>,</p>
    <p class="declaration">déclare sur l'honneur que les renseignements fournis dans ce dossier sont exacts et que je suis l'auteur(e) des réalisations jointes.</p>
    <div style="margin-top:30px;font-size:11pt">
      <p><strong>Fait à</strong> ${o.ville || "Paris"} <strong>le</strong> ${dateMaj}</p>
    </div>
    <p class="declaration" style="margin-top:20px;font-style:italic">Pour faire valoir ce que de droit.</p>
    <div style="margin-top:30px"><strong>Signature :</strong></div>
    <div style="height:80px;border:1px dashed #999;margin-top:10px;display:flex;align-items:center;justify-content:center;background:#fff">
      ${s.signatureUrl ? `<img src="${s.signatureUrl}" alt="Signature candidat" style="max-height:70px;max-width:200px;object-fit:contain" />` : ""}
    </div>
    ${footerDPOfficiel(String(pageNum))}
  </div>`;
  pageNum++;

  // ===== PAGE Documents illustrant la pratique professionnelle (facultatif) =====
  html += `<div class="page" style="page-break-before:always;break-before:page">
    <h2 class="section-title">DOSSIER PROFESSIONNEL (DP)</h2>
    <h3 class="subsection">Documents illustrant la pratique professionnelle <em style="font-weight:normal">(facultatif)</em></h3>
    <table class="annex-table">
      <tr><th>Intitulé</th></tr>
      ${Array.from({ length: 10 }).map(() => `<tr><td class="empty"></td></tr>`).join("")}
    </table>
    ${footerDPOfficiel(String(pageNum))}
  </div>`;
  pageNum++;

  // ===== PAGE Annexes =====
  html += `<div class="page" style="page-break-before:always;break-before:page">
    <h2 class="section-title">DOSSIER PROFESSIONNEL (DP)</h2>
    <h3 class="subsection">ANNEXES</h3>
    <p style="font-style:italic;color:#666">(Si le RC le prévoit)</p>
    <div style="margin-top:20px;height:620px;border:1px dashed #bbb;background:#fafafa"></div>
    ${footerDPOfficiel(String(pageNum))}
  </div>`;

  html += `</body></html>`;
  return html;
}

// =============================================================================
// 2) ECF — Livret d'évaluations passées en cours de formation
// =============================================================================

export function genECFOfficiel(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], stagiaireIdx: number = 0): string {
  const s = stagiaires[stagiaireIdx];
  if (!s) return "<p>Stagiaire introuvable</p>";

  const codeTitre = getCodeTitre(f);
  const mil = getMillesime(f);
  const dateJo = getDateJO(f);
  const dateMaj = getDateMajOrg(o);
  const sigle = "EPR"; // Sigle officiel du Livret ECF selon trame ministérielle
  const typeDoc = "Livret d'évaluations passées en cours de formation";
  const activites = getActivitesTypes(f);
  const intituleTitre = f.intitule || "Titre professionnel";
  const niveau = getRNCP(f)?.niveau || "Niveau 5";

  // Statut de la formation : si non terminée, on n'affiche pas de date d'éval définitive
  const termine = isStagiaireFormationTerminee(s, f);

  // Formateur évaluateur unique = formateur saisi sur le formulaire Formation
  const seed = hashStr(`${s.prenom}-${s.nom}`);
  const formateurPrincipal = (f.formateur || "").trim()
    || pick(["GUEBLI Ghizlan", "MARTIN Sophie", "DUBOIS Pierre", "LEROY Marie", "ROUSSEAU Karim"], seed);
  const formateur1 = formateurPrincipal;
  const responsable = o.dirigeant || o.responsablePedagogique || "OUACHEK Hakim";
  const dateEval = termine ? (fmtDateFR(getDateFin(f, s)) || todayCompact()) : "";
  const dateDebut = termine ? (fmtDateFR(getDateDebut(f, s)) || "") : "";

  // Chaque activité = 3 pages (Fiche résultats + Réévaluation + Évaluations complémentaires)
  // Total = 2 (couverture+présentation) + 3*N + 2 (synthèse + signatures) = 3N + 4
  const totalPages = activites.length * 3 + 4;
  const pageStr = (n: number) => `${n}/${totalPages}`;

  let html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">${ministereStyle()}</head><body>`;

  // ===== PAGE 1 - Couverture =====
  html += `<div class="page" style="page-break-before:always;break-before:page">
    <div style="text-align:center;font-size:10pt;margin-bottom:8px">
      <p style="font-style:italic;color:#555">Liberté • Égalité • Fraternité</p>
      <p style="font-weight:bold;letter-spacing:1px">RÉPUBLIQUE FRANÇAISE</p>
      <p style="margin-top:8px;font-size:9pt">MINISTÈRE CHARGÉ DE L'EMPLOI</p>
    </div>
    ${ministereHeader("LIVRET D'ÉVALUATIONS PASSÉES EN COURS DE FORMATION")}
    <div style="text-align:center;margin:20px 0">
      <p style="font-weight:bold;font-size:13pt">Titre professionnel</p>
      <p style="font-size:14pt;font-weight:bold;color:#0055A4;margin:10px 0">${intituleTitre}</p>
      <p style="font-size:11pt">${niveau}</p>
    </div>
    <div style="margin:20px 0;font-size:10pt;text-align:center">
      <p>Arrêté du : <strong>${dateJo}</strong></p>
      <p>J.O. du : <strong>${dateJo}</strong></p>
      <p>Code titre : <strong>${codeTitre}</strong> — Millésime : <strong>${mil}</strong></p>
    </div>
    <table class="candidate-table">
      <tr><th>Organisme de formation</th><td>${o.nom || ""}</td></tr>
      <tr><th>Lieu de formation</th><td>${o.adresse || ""}, ${o.codePostal || ""} ${o.ville || ""}</td></tr>
    </table>
    <h3 class="subsection" style="margin-top:20px">Candidat(e) :</h3>
    <p class="check-line">
      <span class="check-box${s.civilite === "Mme" ? " ck" : ""}"></span>Mme &nbsp;&nbsp;
      <span class="check-box${s.civilite !== "Mme" ? " ck" : ""}"></span>M.
    </p>
    <table class="candidate-table">
      <tr><th>Nom</th><td>${(s.nom || "").toUpperCase()}</td></tr>
      <tr><th>Prénom</th><td>${s.prenom || ""}</td></tr>
      <tr><th>Date de naissance</th><td>${getStagDateNaissance(s)}</td></tr>
    </table>
    ${footerOfficiel(sigle, typeDoc, codeTitre, mil, dateJo, pageStr(1), dateMaj)}
  </div>`;

  // ===== PAGE 2 - Présentation =====
  html += `<div class="page" style="page-break-before:always;break-before:page">
    <h2 class="section-title">Présentation du dossier</h2>
    <p class="justify">Les évaluations passées en cours de formation décrites dans les fiches qui suivent ont été mises en œuvre en référence aux critères issus des référentiels du titre professionnel, pour les sessions d'examen « Titre », « CCP » et « CCS » telles que prévues par l'arrêté du 22 décembre 2015 relatif aux conditions de délivrance du titre professionnel du ministère chargé de l'emploi.</p>
    <p class="justify" style="margin-top:12px">Le <em>Guide de mise en œuvre</em> des Évaluations passées en cours de formation est à télécharger sur le site du ministère de l'emploi : <strong>http://travail-emploi.gouv.fr/</strong> (rubrique <em>Documents techniques</em>). Il comporte un mode d'emploi du présent Livret d'évaluations passées en cours de formation.</p>
    ${footerOfficiel(sigle, typeDoc, codeTitre, mil, dateJo, pageStr(2), dateMaj)}
  </div>`;

  // ===== Pages par activité-type =====
  let pageNum = 3;
  activites.forEach((act, ai) => {
    // ---- Fiche de résultats ----
    html += `<div class="page" style="page-break-before:always;break-before:page">
      <h2 class="section-title">Fiche de résultats des évaluations</h2>
      <div class="activite-type">Activité-type ${ai + 1} · ${act.titre}</div>
      <h3 class="subsection">Compétences :</h3>
      <ol class="competence-list">
        ${act.competences.map(c => `<li>${c}</li>`).join("")}
      </ol>
      <table class="eval-table">
        <tr><th>Description des évaluations mises en œuvre</th><th>Dates</th><th>Compétences évaluées (cochez)</th></tr>
        <tr>
          <td><strong>1.</strong> Évaluation formative en situation professionnelle reconstituée — étude de cas écrite</td>
          <td>${dateDebut}</td>
          <td>${act.competences.map((_, i) => `${i + 1} <span class="check-box${termine ? " ck" : ""}"></span>`).join(" &nbsp; ")}</td>
        </tr>
        <tr>
          <td><strong>2.</strong> Mise en situation professionnelle reconstituée — oral devant jury de formation</td>
          <td>${dateDebut}</td>
          <td>${act.competences.map((_, i) => `${i + 1} <span class="check-box${termine ? " ck" : ""}"></span>`).join(" &nbsp; ")}</td>
        </tr>
        <tr>
          <td><strong>3.</strong> Évaluation pratique en entreprise — observation sur poste de travail</td>
          <td>${dateEval}</td>
          <td>${act.competences.map((_, i) => `${i + 1} <span class="check-box${termine ? " ck" : ""}"></span>`).join(" &nbsp; ")}</td>
        </tr>
        <tr>
          <td><strong>4.</strong> Questionnement à partir de productions professionnelles</td>
          <td>${dateEval}</td>
          <td>${act.competences.map((_, i) => `${i + 1} <span class="check-box${termine ? " ck" : ""}"></span>`).join(" &nbsp; ")}</td>
        </tr>
      </table>
      <p style="margin-top:14px;font-weight:bold">Lors de l'évaluation ou des évaluations passée(s) en cours de formation, le/la candidat(e) est considéré(e) :</p>
      <p class="check-line"><span class="check-box${termine ? " ck" : ""}"></span>Avoir satisfait aux critères issus des référentiels du titre professionnel attendus pour la réalisation de cette activité-type.</p>
      <p class="check-line"><span class="check-box"></span>Ne pas avoir satisfait aux critères issus des référentiels du titre professionnel.</p>
      ${footerOfficiel(sigle, typeDoc, codeTitre, mil, dateJo, pageStr(pageNum), dateMaj)}
    </div>`;
    pageNum++;

    // ---- Page Compétences à réévaluer ----
    html += `<div class="page" style="page-break-before:always;break-before:page">
      <h2 class="section-title">Fiche de résultats des évaluations (suite)</h2>
      <div class="activite-type">Activité-type ${ai + 1} · ${act.titre}</div>
      <p class="justify" style="margin-top:10px">Si le candidat n'a pas satisfait aux critères issus des référentiels, notez ci-dessous les points d'attention et précisions éventuelles.</p>
      <div class="obs-box" style="min-height:90px">${termine ? `À l'issue des évaluations initiales conduites entre le ${dateDebut} et le ${dateEval}, le/la candidat(e) ${s.prenom} ${(s.nom || "").toUpperCase()} a démontré une maîtrise satisfaisante de l'ensemble des compétences du référentiel pour cette activité-type. Aucune réévaluation n'est nécessaire.` : "&nbsp;"}</div>
      <h3 class="subsection">Compétences à réévaluer :</h3>
      <p style="font-style:italic;color:#555">${termine ? "Aucune — l'ensemble des compétences de l'activité-type est validé." : "(Voir évaluations complémentaires ci-après.)"}</p>
      <table class="eval-table" style="margin-top:10px">
        <tr><th style="width:70%">Compétence à réévaluer</th><th>N° compétence</th></tr>
        ${act.competences.map((_, i) => `<tr>
          <td style="height:28px;${termine ? "font-style:italic;color:#666" : ""}">${termine ? "Sans objet — compétence acquise" : ""}</td>
          <td style="text-align:center">${i + 1}</td>
        </tr>`).join("")}
      </table>
      <h3 class="subsection">Observations du formateur évaluateur</h3>
      <div class="obs-box" style="min-height:80px">${termine ? `Le/la candidat(e) a fait preuve d'une bonne maîtrise des compétences attendues sur l'activité-type « ${act.titre} ». Les productions présentées lors des mises en situation professionnelle sont de qualité et témoignent d'une réelle compréhension des enjeux du métier. L'implication et la progression observées tout au long du parcours confirment l'aptitude à exercer l'activité en autonomie. Aucune réévaluation n'est nécessaire.` : "&nbsp;"}</div>
      ${footerOfficiel(sigle, typeDoc, codeTitre, mil, dateJo, pageStr(pageNum), dateMaj)}
    </div>`;
    pageNum++;

    // ---- Page Évaluations complémentaires ----
    const complLabels = [
      "Entretien technique complémentaire",
      "Questionnement à partir de productions professionnelles",
      "Mise en situation professionnelle reconstituée complémentaire",
    ];
    html += `<div class="page" style="page-break-before:always;break-before:page">
      <h2 class="section-title">Évaluations complémentaires <em style="font-weight:normal;font-size:10pt">(si nécessaire)</em></h2>
      <div class="activite-type">Activité-type ${ai + 1} · ${act.titre}</div>
      <p class="justify" style="margin-top:8px;font-style:italic;color:#555">${termine ? `Les évaluations initiales ayant permis de valider l'ensemble des compétences de l'activité-type, aucune évaluation complémentaire n'a été nécessaire pour ${s.prenom} ${(s.nom || "").toUpperCase()}.` : "Les évaluations complémentaires sont à renseigner uniquement si des compétences restent à valider à l'issue des évaluations initiales."}</p>
      <table class="eval-table" style="margin-top:10px">
        <tr><th>Description des évaluations mises en œuvre</th><th>Dates</th><th>Compétences évaluées (cochez)</th></tr>
        ${complLabels.map((lbl, n) => `<tr>
          <td><strong>${n + 1}.</strong> ${termine ? `<em style="color:#666">Sans objet — ${lbl.toLowerCase()} non mobilisé(e) (activité-type validée)</em>` : lbl}</td>
          <td>${termine ? "—" : ""}</td>
          <td>${act.competences.map((_, i) => `${i + 1} <span class="check-box"></span>`).join(" &nbsp; ")}</td>
        </tr>`).join("")}
      </table>
      <p style="margin-top:14px;font-weight:bold">À l'issue des évaluations complémentaires, le/la candidat(e) est considéré(e) :</p>
      <p class="check-line"><span class="check-box${termine ? " ck" : ""}"></span>Avoir satisfait aux critères issus des référentiels du titre professionnel.</p>
      <p class="check-line"><span class="check-box"></span>Ne pas avoir satisfait aux critères issus des référentiels du titre professionnel.</p>
      <h3 class="subsection">Formateur évaluateur</h3>
      <table class="eval-table">
        <tr><th>Nom</th><th>Date</th><th>Visa</th></tr>
        <tr>
          <td>${formateur1}</td>
          <td>${dateEval}</td>
          <td style="height:50px;text-align:center;vertical-align:middle">
            ${termine && f.formateurSignatureUrl ? `<img src="${f.formateurSignatureUrl}" alt="Signature formateur" style="max-height:42px;max-width:120px;object-fit:contain" />` : ""}
          </td>
        </tr>
      </table>
      ${footerOfficiel(sigle, typeDoc, codeTitre, mil, dateJo, pageStr(pageNum), dateMaj)}
    </div>`;
    pageNum++;
  });

  // ===== Page Synthèse =====
  html += `<div class="page" style="page-break-before:always;break-before:page">
    <h2 class="section-title" style="text-align:center">SYNTHÈSE DES RÉSULTATS OBTENUS PAR LE CANDIDAT À L'ISSUE DU PARCOURS DE FORMATION</h2>
    <table class="eval-table" style="margin-top:14px">
      <tr><th style="width:40%">Intitulé de l'activité-type</th><th>Compétences professionnelles</th><th style="width:18%">Maîtrisée</th></tr>
      ${activites.map((act, ai) => `<tr>
        <td><strong>Activité-type ${ai + 1}</strong><br>${act.titre}</td>
        <td><ol style="margin:0 0 0 18px;padding:0">${act.competences.map(c => `<li>${c}</li>`).join("")}</ol></td>
        <td style="text-align:center;vertical-align:middle">
          <span class="check-box${termine ? " ck" : ""}"></span> OUI<br>
          <span class="check-box"></span> NON
        </td>
      </tr>`).join("")}
    </table>
    <h3 class="subsection">Observations</h3>
    <div class="obs-box">${termine ? `Le/la candidat(e) ${s.prenom} ${(s.nom || "").toUpperCase()} a satisfait à l'ensemble des évaluations prévues au référentiel du titre professionnel « ${intituleTitre} ». Les acquis pédagogiques et professionnels sont conformes aux attendus sur les ${activites.length} activité(s)-type du référentiel. Le parcours a été mené avec assiduité (présence 100%) et les productions rendues témoignent d'une réelle appropriation des compétences. Le/la candidat(e) est prêt(e) à se présenter à la session d'examen du titre professionnel.` : "&nbsp;"}</div>
    ${footerOfficiel(sigle, typeDoc, codeTitre, mil, dateJo, pageStr(pageNum), dateMaj)}
  </div>`;
  pageNum++;

  // ===== Page Signatures finale =====
  html += `<div class="page" style="page-break-before:always;break-before:page">
    <h2 class="section-title">Observations générales</h2>
    <div class="obs-box" style="min-height:80px">${termine ? `Le parcours de formation menant au titre professionnel « ${intituleTitre} » a été mené à son terme dans le respect du référentiel et des modalités pédagogiques prévues. Le/la candidat(e) ${s.prenom} ${(s.nom || "").toUpperCase()} a démontré sa capacité à mobiliser les compétences attendues sur l'ensemble des activités-types. Il/elle peut être présenté(e) à la session d'examen du titre professionnel.` : "&nbsp;"}</div>

    <h3 class="subsection" style="margin-top:20px">Formateur(s) / Évaluateur(s)</h3>
    <table class="eval-table">
      <tr><th style="width:40%">Nom</th><th style="width:30%">Date</th><th>Visa</th></tr>
      <tr>
        <td>${formateur1}</td>
        <td>${dateEval}</td>
        <td style="height:50px;text-align:center;vertical-align:middle">
          ${termine && f.formateurSignatureUrl ? `<img src="${f.formateurSignatureUrl}" alt="Signature formateur" style="max-height:42px;max-width:120px;object-fit:contain" />` : ""}
        </td>
      </tr>
    </table>

    <h3 class="subsection">Représentant de l'organisme de formation</h3>
    <table class="eval-table">
      <tr><th style="width:40%">Nom</th><th style="width:30%">Date</th><th>Visa</th></tr>
      <tr>
        <td>${responsable}</td>
        <td>${dateEval}</td>
        <td style="height:60px;text-align:center;vertical-align:middle">
          ${termine && (o.signatureUrl || o.tamponUrl) ? `
            <div style="display:flex;align-items:center;justify-content:center;gap:6px">
              ${o.signatureUrl ? `<img src="${o.signatureUrl}" alt="Signature dirigeant" style="max-height:50px;max-width:110px;object-fit:contain" />` : ""}
              ${o.tamponUrl ? `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:90px;object-fit:contain" />` : ""}
            </div>` : ""}
        </td>
      </tr>
    </table>

    <p style="margin-top:18px"><strong>Signature du candidat pour information :</strong></p>
    <div style="height:70px;border:1px dashed #999;margin-top:8px;display:flex;align-items:center;justify-content:center;background:#fff">
      ${termine && s.signatureUrl ? `<img src="${s.signatureUrl}" alt="Signature candidat" style="max-height:60px;max-width:200px;object-fit:contain" />` : ""}
    </div>
    ${footerOfficiel(sigle, typeDoc, codeTitre, mil, dateJo, pageStr(pageNum), dateMaj)}
  </div>`;

  html += `</body></html>`;
  return html;
}

// =============================================================================
// 3) PV de session global (1 PV regroupant tous les CCP & stagiaires)
// =============================================================================

export function genPVSessionGlobal(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const codeTitre = getCodeTitre(f);
  const mil = getMillesime(f);
  const dateJo = getDateJO(f);
  const dateMaj = getDateMajOrg(o);
  const sigle = "PV";
  const typeDoc = "Procès-verbal global de session";
  const activites = getActivitesTypes(f);
  const intituleTitre = f.intitule || "Titre professionnel";
  const sessionNum = String(hashStr(`${o.nom}-${f.intitule}-${f.dateDebut || ""}`)).slice(0, 6);

  // Statut de la formation : si non terminée, dates de session, observations et résultats restent vides
  const termine = isFormationTerminee(f, stagiaires);

  // Dates de session : priorité au formulaire de formation, fallback sur dates individuelles stagiaires
  const allDebuts = [f.dateDebut, ...stagiaires.map(s => s.dateDebutFormation)].filter(Boolean) as string[];
  const allFins = [f.dateFin, ...stagiaires.map(s => s.dateFinFormation)].filter(Boolean) as string[];
  const minDebut = allDebuts.sort()[0] || "";
  const maxFin = allFins.sort().slice(-1)[0] || "";
  const dateDebutSession = fmtDateFR(f.dateDebut || minDebut);
  const dateFinSession = fmtDateFR(f.dateFin || maxFin);

  const responsable = o.dirigeant || o.responsablePedagogique || "Responsable de session";

  // Composition du jury : uniquement le formateur (formulaire Formation) + le dirigeant (formulaire Organisme).
  // Si les deux désignent la même personne, on n'affiche qu'une seule ligne.
  const formateurFormation = (f.formateur || "").trim();
  const dirigeantOrg = (o.dirigeant || "").trim();
  const formateurSplit = splitFormateur(formateurFormation);
  const dirigeantSplit = splitFormateur(dirigeantOrg);

  type JuryMember = { nom: string; prenom: string; role: string };
  const juryMembers: JuryMember[] = [];
  if (formateurFormation) {
    juryMembers.push({
      nom: formateurSplit.nom.toUpperCase(),
      prenom: formateurSplit.prenom,
      role: "Formateur évaluateur",
    });
  }
  if (dirigeantOrg) {
    const sameAsFormateur = formateurFormation
      && formateurFormation.toLowerCase().replace(/\s+/g, " ") === dirigeantOrg.toLowerCase().replace(/\s+/g, " ");
    if (!sameAsFormateur) {
      juryMembers.push({
        nom: dirigeantSplit.nom.toUpperCase(),
        prenom: dirigeantSplit.prenom,
        role: "Représentant de l'organisme",
      });
    }
  }
  // Fallback si rien n'est saisi
  if (juryMembers.length === 0) {
    juryMembers.push({ nom: "FORMATEUR", prenom: "", role: "Formateur évaluateur" });
  }
  const presidentJury = juryMembers[0];

  let html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">${ministereStyle()}<style>
    .page-pv{min-height:auto !important;padding:20px 30px !important}
    .page-pv .ministere-header{margin-bottom:8px}
    .page-pv .ministere-header img.ministere-logo-img{max-height:70px}
    .page-pv h1.dp-title{font-size:13pt;margin:8px 0 6px}
    .page-pv h2.section-title{font-size:11pt;margin:10px 0 6px;padding:5px 10px}
    .page-pv table.officiel{margin:6px 0;font-size:9pt}
    .page-pv table.officiel th,.page-pv table.officiel td{padding:4px 6px}
    .page-pv .obs-box{min-height:30px;padding:5px;margin:4px 0;font-size:9pt}
    .page-pv p{font-size:10pt}
  </style></head><body>`;

  // Page unique principale
  html += `<div class="page page-pv" style="page-break-before:always;break-before:page">
    ${ministereHeader("PROCÈS-VERBAL GÉNÉRAL RELATIF À UNE SESSION D'EXAMEN<br>POUR L'OBTENTION DU TITRE PROFESSIONNEL")}
    <p style="text-align:center;font-style:italic;color:#555;margin-bottom:4px;font-size:9pt">Session n° ${sessionNum}</p>
    <p style="text-align:center;font-weight:bold;font-size:10pt;margin-bottom:10px">${codeTitre} — ${intituleTitre}</p>

    <h2 class="section-title">Informations sur la session d'examen</h2>
    <table class="officiel">
      <tr><th style="width:35%">Centre organisateur de la session :</th><td>${o.nom || ""}</td></tr>
      <tr><th>Adresse :</th><td>${o.adresse || ""}<br>${o.codePostal || ""} ${o.ville || ""} — FRANCE</td></tr>
      <tr><th>Date de début de la session :</th><td>${dateDebutSession}</td></tr>
      <tr><th>Date de fin de la session :</th><td>${dateFinSession}</td></tr>
      <tr><th>Responsable de session :</th><td>Nom : <strong>${responsable.split(" ").slice(-1)[0] || responsable}</strong><br>Prénom : ${responsable.split(" ").slice(0, -1).join(" ") || ""}<br>Signature : ${o.signatureUrl ? `<img src="${o.signatureUrl}" alt="Signature" style="max-height:40px;max-width:110px;object-fit:contain;vertical-align:middle" />` : `<em>(signature manuscrite)</em>`}</td></tr>
    </table>

    <h2 class="section-title">Observations du jury sur le déroulement de la session d'examen</h2>
    <div class="obs-box">${termine ? "La session s'est déroulée dans des conditions conformes aux exigences du référentiel. Tous les candidats inscrits étaient présents (sauf mention contraire). Les épreuves ont été conduites selon les modalités prévues : mise en situation professionnelle, entretien technique et questionnement à partir de productions. Le jury salue la qualité globale des prestations présentées." : "&nbsp;"}</div>

    <h2 class="section-title">Composition du jury</h2>
    <table class="officiel">
      <tr><th>Nom</th><th>Prénom</th><th>Qualité</th><th>Signature</th></tr>
      ${juryMembers.map(m => {
        const isFormateur = m.role === "Formateur évaluateur";
        const sigUrl = isFormateur ? f.formateurSignatureUrl : o.signatureUrl;
        return `<tr>
        <td>${m.nom}</td>
        <td>${m.prenom}</td>
        <td>${m.role}</td>
        <td style="height:60px;text-align:center;vertical-align:middle">
          ${sigUrl ? `<img src="${sigUrl}" alt="Signature" style="max-height:50px;max-width:110px;object-fit:contain" />` : `<em>(signature)</em>`}
        </td>
      </tr>`;
      }).join("")}
    </table>

    <h2 class="section-title">Identité des candidats inscrits à la session</h2>
    <table class="officiel">
      <tr>
        <th rowspan="2">Nom de naissance</th>
        <th rowspan="2">Nom d'usage</th>
        <th rowspan="2">Prénom</th>
        <th rowspan="2">Identifiant</th>
        <th colspan="2">Voie d'accès</th>
        <th colspan="3">Résultats</th>
      </tr>
      <tr>
        <th>Formation</th><th>VAE</th>
        <th>Absent</th><th>Réussite</th><th>Échec</th>
      </tr>
      ${stagiaires.map((s) => {
        const ident = String(2597000 + (hashStr(`${s.nom}-${s.prenom}`) % 999)).padStart(7, "0");
        const sTermine = isStagiaireFormationTerminee(s, f);
        // Si la formation du stagiaire n'est pas terminée → résultats vides (en attente de session)
        return `<tr>
          <td>${(s.nom || "").toUpperCase()}</td>
          <td></td>
          <td>${s.prenom || ""}</td>
          <td>${ident}</td>
          <td style="text-align:center;font-weight:bold">X</td>
          <td></td>
          <td></td>
          <td style="text-align:center;font-weight:bold">${sTermine ? "X" : ""}</td>
          <td></td>
        </tr>`;
      }).join("")}
    </table>

    <p style="margin-top:20px;font-size:9pt;font-style:italic">${termine ? `Le présent procès-verbal a été établi le ${dateMaj} et certifie l'exactitude des informations portées ci-dessus relatives à la session d'examen mentionnée en référence.` : "Document préparatoire — la session d'examen n'a pas encore eu lieu. Le procès-verbal définitif sera établi à l'issue de la session."}</p>

    <div style="margin-top:20px;margin-bottom:90px;display:flex;justify-content:space-between;gap:30px">
      <div style="flex:1">
        <p style="margin:0"><strong>Le Président du jury (Formateur évaluateur)</strong></p>
        <p style="margin:4px 0 0;font-size:10pt">${(f.formateur || `${presidentJury.prenom} ${presidentJury.nom}`).trim()}</p>
        <div style="height:70px;border:1px dashed #999;margin-top:6px;display:flex;align-items:center;justify-content:center;background:#fff;gap:8px">
          ${f.formateurSignatureUrl ? `<img src="${f.formateurSignatureUrl}" alt="Signature formateur" style="max-height:60px;max-width:160px;object-fit:contain" />` : ""}
        </div>
      </div>
      <div style="flex:1">
        <p style="margin:0"><strong>Le Responsable de session (Direction)</strong></p>
        <p style="margin:4px 0 0;font-size:10pt">${responsable}</p>
        <div style="height:70px;border:1px dashed #999;margin-top:6px;display:flex;align-items:center;justify-content:center;background:#fff">
          ${o.signatureUrl ? `<img src="${o.signatureUrl}" alt="Signature dirigeant" style="max-height:60px;max-width:160px;object-fit:contain" />` : ""}
        </div>
      </div>
    </div>
    ${footerOfficiel(sigle, typeDoc, codeTitre, mil, dateJo, "1/1", dateMaj)}
  </div>`;

  html += `</body></html>`;
  return html;
}
