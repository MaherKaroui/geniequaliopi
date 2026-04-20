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
    .page{max-width:780px;margin:0 auto;padding:30px 40px;background:#fff;position:relative;min-height:1100px}
    .page-break{page-break-after:always;break-after:page}
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
    .footer-table{position:absolute;bottom:30px;left:40px;right:40px;width:auto}
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
  </style>`;
}

function ministereHeader(centerTitle: string, subTitle?: string): string {
  return `
    <div class="ministere-header">
      <img class="ministere-logo-img" src="/images/ministere-travail-logo.png" alt="Ministère du Travail, de la Santé, des Solidarités et des Familles" />
    </div>
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

  const tache = `Dans le cadre de mes fonctions au sein de ${entreprise}, j'ai été chargé(e) de mener à bien l'opération suivante : « ${intitule} ». Cette mission s'inscrivait pleinement dans l'activité « ${activite.titre.toLowerCase()} » et visait à ${competence.toLowerCase()}. J'ai d'abord procédé à une analyse complète du contexte initial pour identifier les besoins, les contraintes et les opportunités. J'ai ensuite défini un plan d'action structuré, validé en interne avec ma hiérarchie, puis mis en œuvre les différentes étapes en assurant le suivi et le pilotage continu de l'activité. Cette démarche m'a permis de mobiliser pleinement mes compétences professionnelles et d'apporter une réponse opérationnelle conforme aux attendus. Les résultats obtenus ont été présentés lors d'une revue de fin de mission, validant l'atteinte des objectifs fixés.`;

  const moyens = `Pour mener à bien cette mission, j'ai utilisé les outils et ressources suivants : suite bureautique (Word, Excel, PowerPoint), outils internes de gestion et de reporting, plateforme collaborative pour le partage documentaire, fiches de procédures internes, supports de communication adaptés, ainsi que les ressources documentaires de référence du métier. J'ai également mobilisé les compétences acquises en formation, notamment celles relatives à « ${competence2.toLowerCase()} », pour structurer ma démarche et garantir la qualité du livrable final.`;

  const seedColl = hashStr(`${s.prenom}-coll-${exempleIdx}`);
  const collColl = [
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

export function genDPOfficiel(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], stagiaireIdx: number = 0): string {
  const s = stagiaires[stagiaireIdx];
  if (!s) return "<p>Stagiaire introuvable</p>";

  const codeTitre = getCodeTitre(f);
  const mil = getMillesime(f);
  const dateJo = getDateJO(f);
  const dateMaj = getDateMajOrg(o);
  const sigle = "DP";
  const typeDoc = "Dossier professionnel";
  const activites = getActivitesTypes(f);
  const intituleTitre = f.intitule || "Titre professionnel";
  const aiPack = getCachedDPPack(f, s); // null si pas préchargé
  const termineDP = isStagiaireFormationTerminee(s, f);

  let html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">${ministereStyle()}</head><body>`;

  // ===== PAGE 1 - Couverture =====
  html += `<div class="page">
    ${ministereHeader("DOSSIER PROFESSIONNEL (DP)", "MINISTÈRE CHARGÉ DE L'EMPLOI")}
    <div class="info-block" style="margin-top:30px">
      <p><strong>Nom de naissance ▶</strong> ${s.nom?.toUpperCase() || ""}</p>
      <p><strong>Nom d'usage ▶</strong> ${s.nom?.toUpperCase() || ""}</p>
      <p><strong>Prénom ▶</strong> ${s.prenom || ""}</p>
      <p><strong>Date de naissance ▶</strong> ${getStagDateNaissance(s)}</p>
      <p><strong>Adresse ▶</strong><br>${getStagAdresse(s)}</p>
    </div>
    <h2 class="section-title" style="margin-top:30px">Titre professionnel visé</h2>
    <p style="font-size:13pt;font-weight:bold;margin:8px 0">${intituleTitre}</p>
    <h3 class="subsection">MODALITÉ D'ACCÈS :</h3>
    <p class="check-line"><span class="check-box ck"></span>Parcours de formation</p>
    <p class="check-line"><span class="check-box"></span>Validation des Acquis de l'Expérience (VAE)</p>
    ${footerOfficiel(sigle, typeDoc, codeTitre, mil, dateJo, "1", dateMaj)}
  </div><div class="page-break"></div>`;

  // ===== PAGE 2 - Présentation =====
  html += `<div class="page">
    <h2 class="section-title">DOSSIER PROFESSIONNEL (DP)</h2>
    <h3 class="subsection">Présentation du dossier</h3>
    <p class="justify">Le dossier professionnel (DP) constitue un élément du système de validation du titre professionnel. <strong>Ce titre est délivré par le Ministère chargé de l'emploi.</strong></p>
    <p class="justify">Le DP appartient au candidat. Il le conserve, l'actualise durant son parcours et le présente <strong>obligatoirement à chaque session d'examen</strong>.</p>
    <p class="justify">Pour rédiger le DP, le candidat peut être aidé par un formateur ou par un accompagnateur VAE. Il est consulté par le jury au moment de la session d'examen.</p>
    <h3 class="subsection">Pour prendre sa décision, le jury dispose :</h3>
    <ul class="dp-list">
      <li>des résultats de la mise en situation professionnelle complétés, éventuellement, du questionnaire professionnel ou de l'entretien professionnel ou de l'entretien technique ou du questionnement à partir de productions ;</li>
      <li>du Dossier Professionnel (DP) dans lequel le candidat a consigné les preuves de sa pratique professionnelle ;</li>
      <li>des résultats des évaluations passées en cours de formation lorsque le candidat évalué est issu d'un parcours de formation ;</li>
      <li>de l'entretien final (dans le cadre de la session titre).</li>
    </ul>
    <p style="font-style:italic;font-size:9pt;margin-top:10px">[Arrêté du 22 décembre 2015, relatif aux conditions de délivrance des titres professionnels du ministère chargé de l'Emploi]</p>
    <h3 class="subsection">Ce dossier comporte :</h3>
    <ul class="dp-list">
      <li>pour chaque activité-type du titre visé, un à trois exemples de pratique professionnelle ;</li>
      <li>une déclaration sur l'honneur à compléter et à signer ;</li>
      <li>des documents illustrant la pratique professionnelle du candidat (facultatif) ;</li>
      <li>des annexes, si nécessaire.</li>
    </ul>
    ${footerOfficiel(sigle, typeDoc, codeTitre, mil, dateJo, "2", dateMaj)}
  </div><div class="page-break"></div>`;

  // ===== PAGES Activités-types & Exemples =====
  let pageNum = 3;
  activites.forEach((act, ai) => {
    const aiExemple = aiPack?.exemples?.[ai] || null;
    [1, 2].forEach((exNum) => {
      const ex = buildDPExemple(f, s, act, ai, exNum, aiExemple);
      html += `<div class="page">
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
        ${footerOfficiel(sigle, typeDoc, codeTitre, mil, dateJo, String(pageNum), dateMaj)}
      </div><div class="page-break"></div>`;
      pageNum++;
    });
  });

  // ===== PAGE Déclaration sur l'honneur =====
  html += `<div class="page">
    <h2 class="section-title">DOSSIER PROFESSIONNEL (DP)</h2>
    <h3 class="subsection">Déclaration sur l'honneur</h3>
    <p class="declaration">Je soussigné(e) <strong>${(s.prenom || "").toUpperCase()} ${(s.nom || "").toUpperCase()}</strong>,</p>
    <p class="declaration">Déclare sur l'honneur que les informations consignées dans le présent Dossier Professionnel sont exactes et que les exemples de pratique professionnelle relatés correspondent à des situations vécues dans le cadre de mon activité professionnelle ou de mon parcours de formation.</p>
    <p class="declaration">Je certifie l'authenticité des documents joints en annexe et m'engage à pouvoir en justifier l'origine si demande en est faite.</p>
    <p class="declaration">Pour faire valoir ce que de droit.</p>
    <div style="margin-top:40px;display:flex;justify-content:space-between;font-size:10pt">
      <div><strong>Fait à :</strong> ${o.ville || "Paris"}</div>
      <div><strong>Le :</strong> ${dateMaj}</div>
    </div>
    <div style="margin-top:30px"><strong>Signature du candidat :</strong></div>
    <div style="height:80px;border:1px dashed #999;margin-top:10px;display:flex;align-items:center;justify-content:center;background:#fff">
      ${s.signatureUrl ? `<img src="${s.signatureUrl}" alt="Signature candidat" style="max-height:70px;max-width:200px;object-fit:contain" />` : ""}
    </div>
    ${footerOfficiel(sigle, typeDoc, codeTitre, mil, dateJo, String(pageNum), dateMaj)}
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
  const sigle = "ECF";
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

  let html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">${ministereStyle()}</head><body>`;

  // ===== PAGE 1 - Couverture =====
  html += `<div class="page">
    ${ministereHeader("LIVRET D'ÉVALUATIONS PASSÉES EN COURS DE FORMATION")}
    <div style="text-align:center;margin:20px 0">
      <p style="font-weight:bold;font-size:13pt">Titre professionnel</p>
      <p style="font-size:14pt;font-weight:bold;color:#0055A4;margin:10px 0">${intituleTitre}</p>
      <p style="font-size:11pt">${niveau}</p>
    </div>
    <div style="margin:30px 0;font-size:10pt;text-align:center">
      <p>Code : <strong>${codeTitre}</strong></p>
      <p>Date JO : ${dateJo}</p>
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
    ${footerOfficiel(sigle, typeDoc, codeTitre, mil, dateJo, "1", dateMaj)}
  </div><div class="page-break"></div>`;

  // ===== PAGE 2 - Présentation =====
  html += `<div class="page">
    <h2 class="section-title">Présentation du dossier</h2>
    <p class="justify">Les évaluations passées en cours de formation décrites dans les fiches qui suivent ont été mises en œuvre en référence aux critères issus des référentiels du titre professionnel, pour les sessions d'examen « Titre », « CCP » et « CCS » telles que prévues par l'arrêté du 22 décembre 2015 relatif aux conditions de délivrance du titre professionnel du ministère chargé de l'emploi.</p>
    <p class="justify" style="margin-top:12px">Le <em>Guide de mise en œuvre</em> des Évaluations passées en cours de formation est à télécharger sur le site du ministère de l'emploi : http://travail-emploi.gouv.fr/ (rubrique <em>Documents techniques</em>). Il comporte un mode d'emploi du présent Livret d'évaluations passées en cours de formation.</p>
    ${footerOfficiel(sigle, typeDoc, codeTitre, mil, dateJo, "2", dateMaj)}
  </div><div class="page-break"></div>`;

  // ===== Pages Fiches de résultats =====
  let pageNum = 3;
  activites.forEach((act, ai) => {
    // Fiche de résultats
    const evalSeed = hashStr(`${s.nom}-${ai}`);
    html += `<div class="page">
      <h2 class="section-title">Fiche de résultats des évaluations</h2>
      <div class="activite-type">Activité-type ${ai + 1} · ${act.titre}</div>
      <h3 class="subsection">Compétences :</h3>
      <ol class="competence-list">
        ${act.competences.map(c => `<li>${c}</li>`).join("")}
      </ol>
      <table class="eval-table">
        <tr><th>Description des évaluations mises en œuvre</th><th>Dates</th><th>Compétences évaluées</th></tr>
        <tr>
          <td><strong>1.</strong> Évaluation formative en situation professionnelle reconstituée — étude de cas écrite</td>
          <td>${termine ? fmtDateFR(getDateDebut(f, s)) : ""}</td>
          <td>${act.competences.map((_, i) => `${i + 1} <span class="check-box${termine ? " ck" : ""}"></span>`).join(" ")}</td>
        </tr>
        <tr>
          <td><strong>2.</strong> Mise en situation professionnelle reconstituée — oral devant jury de formation</td>
          <td>${termine ? fmtDateFR(getDateDebut(f, s)) : ""}</td>
          <td>${act.competences.map((_, i) => `${i + 1} <span class="check-box${termine ? " ck" : ""}"></span>`).join(" ")}</td>
        </tr>
        <tr>
          <td><strong>3.</strong> Évaluation pratique en entreprise — observation sur poste de travail</td>
          <td>${termine ? fmtDateFR(getDateFin(f, s)) : ""}</td>
          <td>${act.competences.map((_, i) => `${i + 1} <span class="check-box${termine ? " ck" : ""}"></span>`).join(" ")}</td>
        </tr>
        <tr>
          <td><strong>4.</strong> Questionnement à partir de productions professionnelles</td>
          <td>${dateEval}</td>
          <td>${act.competences.map((_, i) => `${i + 1} <span class="check-box${termine ? " ck" : ""}"></span>`).join(" ")}</td>
        </tr>
      </table>
      <p style="margin-top:14px;font-weight:bold">Lors de l'évaluation ou des évaluations passée(s) en cours de formation, le/la candidat(e) est considéré(e) :</p>
      <p class="check-line"><span class="check-box${termine ? " ck" : ""}"></span>Avoir satisfait aux critères issus des référentiels du titre professionnel attendus pour la réalisation de cette activité-type.</p>
      <p class="check-line"><span class="check-box"></span>Ne pas avoir satisfait aux critères issus des référentiels du titre professionnel.</p>

      <h3 class="subsection">Observations</h3>
      <div class="obs-box">Le/la candidat(e) a fait preuve d'une bonne maîtrise des compétences attendues sur cette activité-type. Les productions présentées sont de qualité et témoignent d'une réelle compréhension des enjeux professionnels.</div>

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
      ${footerOfficiel(sigle, typeDoc, codeTitre, mil, dateJo, `${pageNum}/${activites.length + 4}`, dateMaj)}
    </div><div class="page-break"></div>`;
    pageNum++;
  });

  // ===== Page Synthèse =====
  html += `<div class="page">
    <h2 class="section-title" style="text-align:center">SYNTHÈSE DES RÉSULTATS OBTENUS PAR LE CANDIDAT À L'ISSUE DU PARCOURS DE FORMATION</h2>
    <table class="eval-table">
      <tr><th style="width:50%">Intitulé de l'activité-type</th><th>Activité maîtrisée</th></tr>
      ${activites.map((act, ai) => `<tr>
        <td><strong>${act.titre}</strong></td>
        <td>L'activité ${ai + 1} est maîtrisée : <span class="check-box${termine ? " ck" : ""}"></span> OUI &nbsp;&nbsp; <span class="check-box"></span> NON</td>
      </tr>`).join("")}
    </table>

    <h3 class="subsection">Observations</h3>
    <div class="obs-box">${termine ? "Le candidat a satisfait à l'ensemble des évaluations prévues au référentiel du titre professionnel. Les acquis pédagogiques et professionnels sont conformes aux attendus." : "&nbsp;"}</div>

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

    <h3 class="subsection">Représentant de l'organisme de formation</h3>
    <table class="eval-table">
      <tr><th>Nom</th><th>Date</th><th>Visa</th></tr>
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
    ${footerOfficiel(sigle, typeDoc, codeTitre, mil, dateJo, `${pageNum}/${activites.length + 4}`, dateMaj)}
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

  const dateDebutSession = termine ? (fmtDateFR(f.dateFin || f.dateDebut) || todayCompact()) : "";
  const dateFinSession = termine
    ? (() => {
        if (f.dateFin) {
          const d = new Date(f.dateFin);
          d.setDate(d.getDate() + 1);
          return fmtDateFR(d.toISOString().slice(0, 10));
        }
        return todayCompact();
      })()
    : "";

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

  let html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">${ministereStyle()}</head><body>`;

  // Page unique principale
  html += `<div class="page">
    <div style="text-align:left;margin-bottom:10px;font-size:9pt;font-weight:bold">MINISTÈRE DU TRAVAIL, DE LA SANTÉ, DES SOLIDARITÉS ET DES FAMILLES</div>
    <h1 class="dp-title" style="font-size:14pt">PROCÈS-VERBAL GÉNÉRAL RELATIF À UNE SESSION D'EXAMEN<br>POUR L'OBTENTION DU TITRE PROFESSIONNEL</h1>
    <p style="text-align:center;font-style:italic;color:#555;margin-bottom:8px">Session n° ${sessionNum}</p>
    <p style="text-align:center;font-weight:bold;font-size:11pt;margin-bottom:20px">${codeTitre} — ${intituleTitre}</p>

    <h2 class="section-title">Informations sur la session d'examen</h2>
    <table class="officiel">
      <tr><th style="width:35%">Centre organisateur de la session :</th><td>${o.nom || ""}</td></tr>
      <tr><th>Adresse :</th><td>${o.adresse || ""}<br>${o.codePostal || ""} ${o.ville || ""} — FRANCE</td></tr>
      <tr><th>Date de début de la session :</th><td>${dateDebutSession}</td></tr>
      <tr><th>Date de fin de la session :</th><td>${dateFinSession}</td></tr>
      <tr><th>Responsable de session :</th><td>Nom : <strong>${responsable.split(" ").slice(-1)[0] || responsable}</strong><br>Prénom : ${responsable.split(" ").slice(0, -1).join(" ") || ""}<br>Signature : ${termine && (o.signatureUrl || o.tamponUrl) ? `<span style="display:inline-flex;align-items:center;gap:6px;vertical-align:middle">${o.signatureUrl ? `<img src="${o.signatureUrl}" alt="Signature" style="max-height:40px;max-width:110px;object-fit:contain;vertical-align:middle" />` : ""}${o.tamponUrl ? `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:50px;max-width:80px;object-fit:contain;vertical-align:middle" />` : ""}</span>` : `<em>(signature manuscrite)</em>`}</td></tr>
    </table>

    <h2 class="section-title">Observations du jury sur le déroulement de la session d'examen</h2>
    <div class="obs-box">${termine ? "La session s'est déroulée dans des conditions conformes aux exigences du référentiel. Tous les candidats inscrits étaient présents (sauf mention contraire). Les épreuves ont été conduites selon les modalités prévues : mise en situation professionnelle, entretien technique et questionnement à partir de productions. Le jury salue la qualité globale des prestations présentées." : "&nbsp;"}</div>

    <h2 class="section-title">Composition du jury</h2>
    <table class="officiel">
      <tr><th>Nom</th><th>Prénom</th><th>Qualité</th><th>Signature</th></tr>
      ${juryMembers.map(m => {
        const isFormateur = m.role === "Formateur évaluateur";
        const sigUrl = isFormateur ? f.formateurSignatureUrl : o.signatureUrl;
        const stampUrl = !isFormateur ? o.tamponUrl : null;
        return `<tr>
        <td>${m.nom}</td>
        <td>${m.prenom}</td>
        <td>${m.role}</td>
        <td style="height:60px;text-align:center;vertical-align:middle">
          ${termine && (sigUrl || stampUrl) ? `
            <div style="display:inline-flex;align-items:center;justify-content:center;gap:4px">
              ${sigUrl ? `<img src="${sigUrl}" alt="Signature" style="max-height:50px;max-width:110px;object-fit:contain" />` : ""}
              ${stampUrl ? `<img src="${stampUrl}" alt="Tampon" style="max-height:55px;max-width:75px;object-fit:contain" />` : ""}
            </div>` : `<em>(signature)</em>`}
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

    <div style="margin-top:30px;display:flex;justify-content:space-between;gap:30px">
      <div style="flex:1">
        <p><strong>Le Président du jury</strong></p>
        <p style="margin-top:4px;font-size:10pt">${presidentJury.prenom} ${presidentJury.nom}</p>
        <div style="height:80px;border:1px dashed #999;margin-top:8px;display:flex;align-items:center;justify-content:center;background:#fff;gap:6px">
          ${termine ? (() => {
            const isForm = presidentJury.role === "Formateur évaluateur";
            const sigUrl = isForm ? f.formateurSignatureUrl : o.signatureUrl;
            const stampUrl = !isForm ? o.tamponUrl : null;
            return `${sigUrl ? `<img src="${sigUrl}" alt="Signature" style="max-height:65px;max-width:150px;object-fit:contain" />` : ""}${stampUrl ? `<img src="${stampUrl}" alt="Tampon" style="max-height:75px;max-width:100px;object-fit:contain" />` : ""}`;
          })() : ""}
        </div>
      </div>
      <div style="flex:1">
        <p><strong>Le Responsable de session</strong></p>
        <p style="margin-top:4px;font-size:10pt">${responsable}</p>
        <div style="height:80px;border:1px dashed #999;margin-top:8px;display:flex;align-items:center;justify-content:center;background:#fff;gap:6px">
          ${termine && (o.signatureUrl || o.tamponUrl) ? `${o.signatureUrl ? `<img src="${o.signatureUrl}" alt="Signature" style="max-height:65px;max-width:150px;object-fit:contain" />` : ""}${o.tamponUrl ? `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:75px;max-width:100px;object-fit:contain" />` : ""}` : ""}
        </div>
      </div>
    </div>
    ${footerOfficiel(sigle, typeDoc, codeTitre, mil, dateJo, "1/1", dateMaj)}
  </div>`;

  html += `</body></html>`;
  return html;
}
