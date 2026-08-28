// =============================================================================
// TEMPLATES CFA OFFICIELS — DP / ECF / PV de session
// Reproduction fidèle des modèles officiels Ministère du Travail (TP)
// Génération automatique adaptée à n'importe quel RNCP CFA
// =============================================================================

import { genDPUnifie, genECFUnifie } from "@/lib/gotrm/ecfDp";
import { detectDomaine } from "@/lib/dp/dpBanques";
import { resolveReferentiel } from "@/lib/dp/referentielTitres";
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
  // Moteur unique : voir src/lib/gotrm/ecfDp.ts
  return genDPUnifie(o, f, stagiaires, stagiaireIdx);
}

// =============================================================================
// 2) ECF — Livret d'évaluations passées en cours de formation
// =============================================================================

export function genECFOfficiel(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], stagiaireIdx: number = 0): string {
  // Moteur unique : voir src/lib/gotrm/ecfDp.ts
  return genECFUnifie(o, f, stagiaires, stagiaireIdx);
}

// =============================================================================
// 3) PV de session global (1 PV regroupant tous les CCP & stagiaires)
// =============================================================================

export function genPVSessionGlobal(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const codeTitre = resolveReferentiel(f).codeTitre || "";
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
