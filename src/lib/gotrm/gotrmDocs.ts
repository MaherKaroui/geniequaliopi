/**
 * GOTRM — Documents d'organisation et d'évaluation de session.
 *
 * IMPORTANT : ce module ne génère PAS les réponses des candidats aux dossiers
 * AC1 / AC2. Ces fichiers sont les productions rédigées par le candidat lui-même
 * pendant les 10 heures de MSP sous surveillance. Ils sont ici traités uniquement
 * comme un inventaire de pièces attendues.
 */
import {
  GOTRM_TITRE,
  GOTRM_CCP,
  GOTRM_EPREUVES,
  GOTRM_MSP_PARTIES,
  GOTRM_MATRICE_DTE,
  GOTRM_COMPETENCES_TRANSVERSALES,
  GOTRM_DUREE_TOTALE,
  GOTRM_TOTAL_CRITERES,
} from "@/data/gotrm";
import type { GotrmCandidat, GotrmSession } from "./gotrmTypes";
import { gotrmCandidatNomComplet } from "./gotrmTypes";

const BOX = "☐";

export function dateLongue(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function esc(v?: string): string {
  return (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Ligne clé/valeur omise entièrement si la valeur est vide */
function row(label: string, value?: string): string {
  const v = (value ?? "").trim();
  if (!v) return "";
  return `<tr><th style="width:32%">${esc(label)}</th><td>${esc(v)}</td></tr>`;
}

const CSS = `<style>
  @page { size: A4; margin: 14mm; }
  body { font-family: Calibri, Arial, sans-serif; font-size: 10.5pt; color: #1f2937; line-height: 1.45; }
  h1 { font-size: 16pt; color: #12395f; margin: 0 0 4px; letter-spacing: .3px; }
  h2 { font-size: 12pt; color: #12395f; margin: 18px 0 6px; border-bottom: 1px solid #c9d8ea; padding-bottom: 3px; }
  h3 { font-size: 10.5pt; margin: 12px 0 4px; color: #1f3b57; }
  table { width: 100%; border-collapse: collapse; margin: 8px 0; }
  th, td { border: 1px solid #b8c8da; padding: 5px 7px; text-align: left; vertical-align: top; font-size: 9.5pt; }
  thead th { background: #12395f; color: #ffffff; font-weight: 600; }
  th { background: #eaf1f8; font-weight: 600; }
  tbody tr:nth-child(even) td { background: #f2f7fc; }
  tbody tr:nth-child(odd) td { background: #ffffff; }
  .doc-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #12395f; padding-bottom: 8px; margin-bottom: 14px; }
  .org { font-size: 9pt; }
  .org-name { font-weight: bold; color: #12395f; font-size: 11.5pt; }
  .title-block { text-align: right; font-size: 9pt; }
  .muted { color: #56677a; font-size: 9pt; }
  .note { background: #f2f7fc; border-left: 3px solid #12395f; padding: 8px 10px; margin: 10px 0; font-size: 9.5pt; }
  .sign-grid { display: flex; gap: 14px; margin-top: 22px; }
  .sign-box { flex: 1; border: 1px solid #b8c8da; min-height: 92px; padding: 6px 8px; font-size: 9pt; }
  .footer { margin-top: 26px; border-top: 1px solid #c9d8ea; padding-top: 6px; font-size: 8pt; color: #56677a; text-align: center; }
  .footer b { color: #12395f; }
  .box { font-size: 11pt; letter-spacing: 2px; }
  ul { margin: 4px 0 4px 18px; padding: 0; }
  li { margin: 2px 0; }
</style>`;

function header(s: GotrmSession, docTitle: string): string {
  const o = s.organisme;
  const lines = [
    o.adresse,
    [o.codePostal, o.ville].filter(Boolean).join(" "),
    o.siret ? `SIRET : ${o.siret}` : "",
    o.nda ? `NDA : ${o.nda}` : "",
    o.email,
  ].filter(Boolean);
  return `<div class="doc-header">
    <div class="org">
      <div class="org-name">${esc(o.nom || "Organisme")}</div>
      ${lines.map((l) => `<div>${esc(l)}</div>`).join("")}
    </div>
    <div class="title-block">
      <div><b>${esc(GOTRM_TITRE.sigle)}</b> — ${esc(GOTRM_TITRE.codeTitre)} — Millésime ${esc(GOTRM_TITRE.millesime)}</div>
      <div>${esc(GOTRM_TITRE.rncp)} — ${esc(GOTRM_TITRE.niveau)} (${esc(GOTRM_TITRE.cadre)})</div>
      ${s.intitule ? `<div>Session : ${esc(s.intitule)}</div>` : ""}
    </div>
  </div>
  <h1>${esc(docTitle)}</h1>`;
}

function footer(s: GotrmSession): string {
  const o = s.organisme;
  const parts = [
    o.siret ? `SIRET : ${o.siret}` : "",
    o.nda ? `NDA : ${o.nda}` : "",
    o.version ? `Version ${o.version}` : "",
    o.dateMaj ? `Mise à jour du ${dateLongue(o.dateMaj)}` : "",
  ].filter(Boolean);
  return `<div class="footer"><b>${esc(o.nom || "Organisme")}</b> — ${parts.map(esc).join(" — ")}</div>`;
}

function wrap(s: GotrmSession, docTitle: string, body: string, landscape = false): string {
  const page = landscape ? `<style>@page { size: A4 landscape; margin: 12mm; }</style>` : "";
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>${esc(docTitle)}</title>${CSS}${page}</head>
  <body>${header(s, docTitle)}${body}${footer(s)}</body></html>`;
}

function sessionBlock(s: GotrmSession): string {
  return `<table><tbody>
    ${row("Session", s.intitule)}
    ${row("Période", [dateLongue(s.dateDebut), dateLongue(s.dateFin)].filter(Boolean).join(" au "))}
    ${row("Centre organisateur", s.organisme.nom)}
    ${row("Lieu de la session", s.lieu)}
    ${row("Titre visé", `${GOTRM_TITRE.intitule} (${GOTRM_TITRE.codeTitre}, millésime ${GOTRM_TITRE.millesime})`)}
    ${row("Référentiels", GOTRM_TITRE.referentiels)}
    ${row("Textes", `${GOTRM_TITRE.arrete}, ${GOTRM_TITRE.jo}, date d'effet ${GOTRM_TITRE.dateEffet}`)}
  </tbody></table>`;
}

function juryTable(s: GotrmSession): string {
  const jury = s.jury.filter((j) => j.nom.trim() || j.qualite.trim());
  const surv = s.surveillants.filter((x) => x.trim());
  if (!jury.length && !surv.length) return "";
  let html = "";
  if (jury.length) {
    html += `<h3>Membres du jury</h3><table><thead><tr><th>Nom</th><th>Qualité</th></tr></thead><tbody>
      ${jury.map((j) => `<tr><td>${esc(j.nom)}</td><td>${esc(j.qualite)}</td></tr>`).join("")}</tbody></table>`;
  }
  if (surv.length) {
    html += `<h3>Surveillance</h3><table><tbody>${surv
      .map((x) => `<tr><td>${esc(x)}</td></tr>`)
      .join("")}</tbody></table>`;
  }
  return html;
}

function derouleTable(): string {
  return `<table><thead><tr><th>Épreuve</th><th>Durée</th><th>Précisions</th></tr></thead><tbody>
    ${GOTRM_EPREUVES.map(
      (e) => `<tr><td><b>${esc(e.libelle)}</b></td><td>${esc(e.duree)}</td><td>${esc(e.precisions)}</td></tr>`,
    ).join("")}
    <tr><td colspan="3"><b>Durée totale : ${esc(GOTRM_DUREE_TOTALE)}</b> — ${GOTRM_MSP_PARTIES.map(
      (p) => `${esc(p.libelle)} (${esc(p.duree)}) : ${esc(p.perimetre)}`,
    ).join(" ; ")}</td></tr>
  </tbody></table>`;
}

/** Vérifie que les deux parties de MSP ne sont pas planifiées le même jour */
export function mspConflit(c: GotrmCandidat): boolean {
  return Boolean(c.msp1Date && c.msp2Date && c.msp1Date === c.msp2Date);
}

/* ------------------------------------------------------------------ */
/* 1. Fiche candidat / page de garde                                   */
/* ------------------------------------------------------------------ */
export function buildFicheCandidat(s: GotrmSession, c: GotrmCandidat): string {
  const dossier = c.dossierComplet
    ? "Complet"
    : ["Incomplet", c.motifIncomplet.trim()].filter(Boolean).join(" — ");

  const bordereau = GOTRM_MATRICE_DTE.map(
    (f) => `<tr>
      <td>${esc(f.ac)}</td>
      <td>${esc(f.dossier)}</td>
      <td>${esc(f.fichier)}</td>
      <td>${esc(f.cp)}</td>
      <td>${esc(f.ccp)}</td>
      <td class="box">${BOX}</td>
    </tr>`,
  ).join("");

  const body = `
  ${sessionBlock(s)}
  <h2>Identité du candidat</h2>
  <table><tbody>
    ${row("Candidat", gotrmCandidatNomComplet(c))}
    ${row("Date de naissance", dateLongue(c.dateNaissance))}
    ${row("Identifiant candidat", c.identifiant)}
    ${row("Parcours", c.parcours)}
    ${row("CCP visés", c.ccpVises.join(", "))}
    ${row("Dossier d'inscription", dossier)}
    ${row("Ordre de passage", c.ordrePassage ? `N° ${c.ordrePassage}` : "")}
  </tbody></table>

  <h2>Déroulé de l'épreuve (${esc(GOTRM_DUREE_TOTALE)})</h2>
  ${derouleTable()}
  ${
    c.msp1Date || c.msp2Date
      ? `<table><tbody>
          ${row("MSP partie 1 (CCP1)", [dateLongue(c.msp1Date), c.msp1Horaire].filter(Boolean).join(" — "))}
          ${row("MSP partie 2 (CCP2 + CCP3)", [dateLongue(c.msp2Date), c.msp2Horaire].filter(Boolean).join(" — "))}
        </tbody></table>`
      : ""
  }
  ${juryTable(s)}

  <h2>Bordereau de remise des productions</h2>
  <p class="muted">Les fichiers listés ci-dessous sont produits par le candidat durant la mise en situation professionnelle. Le surveillant vise chaque pièce effectivement remise.</p>
  <table><thead><tr><th>AC</th><th>Dossier</th><th>Fichier attendu</th><th>CP évalué</th><th>CCP</th><th>Visa surveillant</th></tr></thead>
  <tbody>${bordereau}</tbody></table>

  <div class="sign-grid">
    <div class="sign-box"><b>Signature du candidat</b><br><span class="muted">${esc(gotrmCandidatNomComplet(c))}</span></div>
    <div class="sign-box"><b>Signature du surveillant</b><br><span class="muted">${esc(s.surveillants.filter(Boolean).join(", "))}</span></div>
  </div>`;

  return wrap(s, "Fiche candidat — page de garde", body);
}

/* ------------------------------------------------------------------ */
/* 2. Convocation candidat                                             */
/* ------------------------------------------------------------------ */
export function buildConvocation(s: GotrmSession, c: GotrmCandidat): string {
  const body = `
  <p>${esc(gotrmCandidatNomComplet(c))}${c.identifiant ? ` — identifiant candidat ${esc(c.identifiant)}` : ""}</p>
  <p>Vous êtes convoqué(e) à la session d'examen du titre professionnel <b>${esc(GOTRM_TITRE.intitule)}</b>
  (${esc(GOTRM_TITRE.codeTitre)}, millésime ${esc(GOTRM_TITRE.millesime)}, ${esc(GOTRM_TITRE.niveau)}).</p>
  ${sessionBlock(s)}

  <h2>Dates et horaires de la mise en situation professionnelle</h2>
  <table><thead><tr><th>Partie</th><th>Périmètre</th><th>Date</th><th>Horaire</th><th>Durée</th></tr></thead><tbody>
    <tr><td>MSP partie 1</td><td>CCP1</td><td>${esc(dateLongue(c.msp1Date))}</td><td>${esc(c.msp1Horaire)}</td><td>5h00</td></tr>
    <tr><td>MSP partie 2</td><td>CCP2 + CCP3</td><td>${esc(dateLongue(c.msp2Date))}</td><td>${esc(c.msp2Horaire)}</td><td>5h00</td></tr>
  </tbody></table>
  ${mspConflit(c) ? `<div class="note"><b>Anomalie de planification :</b> les deux parties de la mise en situation professionnelle sont positionnées le même jour, ce qui est interdit. Elles doivent se dérouler sur deux jours distincts.</div>` : ""}
  <p class="muted">L'entretien technique (1h00, dont 20 minutes de préparation non décomptées), le questionnement à partir de production(s) (30 minutes) et l'entretien final (30 minutes) se déroulent à l'issue de la mise en situation professionnelle.</p>

  <h2>Pièces à présenter</h2>
  <ul>
    <li>Pièce d'identité en cours de validité</li>
    <li>La présente convocation</li>
    <li>Le dossier professionnel renseigné, le cas échéant</li>
  </ul>

  <h2>Consignes de déroulement</h2>
  <ul>
    <li>Les fichiers informatiques personnels sont interdits.</li>
    <li>L'accès à internet est limité à la consultation des textes législatifs et réglementaires.</li>
    <li>Le travail est réalisé sur poste informatique : dossier technique sous Word incluant des travaux sous Excel.</li>
    <li>La production, les sujets et les brouillons sont restitués au surveillant à la fin de chaque partie.</li>
    <li>Les candidats sont sous surveillance pendant toute la durée de la mise en situation professionnelle ; la présence du jury n'est pas requise.</li>
  </ul>

  <p>Fait à ${esc(s.organisme.ville || s.lieu)}, le ${esc(dateLongue(s.organisme.dateMaj || new Date().toISOString().slice(0, 10)))}.</p>

  <div class="sign-grid">
    <div class="sign-box"><b>Le centre organisateur</b><br><span class="muted">${esc(s.organisme.dirigeant || s.organisme.nom)}</span></div>
  </div>`;

  return wrap(s, "Convocation à la session d'examen", body);
}

/* ------------------------------------------------------------------ */
/* 3. Grille d'évaluation jury                                         */
/* ------------------------------------------------------------------ */
export function buildGrilleEvaluation(s: GotrmSession, c: GotrmCandidat): string {
  const blocs = GOTRM_CCP.map((ccp) => {
    const comps = ccp.competences
      .map((cp) => {
        const lignes = cp.criteres
          .map(
            (crit, i) => `<tr>
              <td style="width:4%">${i + 1}</td>
              <td>${esc(crit)}</td>
              <td class="box" style="width:9%">${BOX}</td>
              <td class="box" style="width:9%">${BOX}</td>
              <td class="box" style="width:9%">${BOX}</td>
              <td style="width:24%"></td>
            </tr>`,
          )
          .join("");
        return `<h3>${esc(cp.code)} — ${esc(cp.libelle)}</h3>
        <p class="muted">Modalité : ${esc(cp.modalite)} — Support : ${esc(cp.support)}</p>
        <table><thead><tr><th>N°</th><th>Critère de performance</th><th>Acquis</th><th>Non acquis</th><th>À revoir</th><th>Observations</th></tr></thead>
        <tbody>${lignes}</tbody></table>`;
      })
      .join("");

    return `<h2>${esc(ccp.code)} — ${esc(ccp.libelle)}</h2>
    ${comps}
    <table><tbody>
      <tr><th style="width:32%">Décision ${esc(ccp.code)}</th><td class="box">${BOX} Obtenu &nbsp;&nbsp; ${BOX} Non obtenu</td></tr>
      <tr><th>Motivation de la décision</th><td style="height:52px"></td></tr>
    </tbody></table>`;
  }).join("");

  const body = `
  ${sessionBlock(s)}
  <table><tbody>
    ${row("Candidat", gotrmCandidatNomComplet(c))}
    ${row("Identifiant candidat", c.identifiant)}
    ${row("Parcours", c.parcours)}
    ${row("CCP visés", c.ccpVises.join(", "))}
  </tbody></table>
  <p class="muted">${GOTRM_TOTAL_CRITERES} critères de performance répartis sur 9 compétences professionnelles et 3 CCP.</p>

  ${blocs}

  <h2>Compétences transversales observées</h2>
  <table><tbody>${GOTRM_COMPETENCES_TRANSVERSALES.map(
    (t) => `<tr><td>${esc(t)}</td><td class="box" style="width:22%">${BOX} Observée &nbsp; ${BOX} Non observée</td></tr>`,
  ).join("")}</tbody></table>

  <h2>Entretien final</h2>
  <table><tbody>
    <tr><th style="width:32%">Appréciation de l'entretien final</th><td style="height:70px"></td></tr>
  </tbody></table>

  <h2>Résultat du titre</h2>
  <table><tbody>
    <tr><td class="box">${BOX} Titre obtenu &nbsp;&nbsp; ${BOX} CCP obtenu(s) uniquement &nbsp;&nbsp; ${BOX} Titre non obtenu</td></tr>
  </tbody></table>

  <div class="sign-grid">
    ${
      (s.jury.filter((j) => j.nom.trim()).length ? s.jury.filter((j) => j.nom.trim()) : [{ nom: "", qualite: "Membre du jury" }])
        .map(
          (j) =>
            `<div class="sign-box"><b>${esc(j.qualite || "Membre du jury")}</b><br><span class="muted">${esc(j.nom)}</span></div>`,
        )
        .join("")
    }
  </div>`;

  return wrap(s, `Grille d'évaluation du jury`, body);
}

/* ------------------------------------------------------------------ */
/* 4. Feuille d'émargement de session                                  */
/* ------------------------------------------------------------------ */
export function buildEmargement(s: GotrmSession): string {
  const seances: { date: string; libelle: string; candidats: GotrmCandidat[] }[] = [];
  const push = (date: string, libelle: string, c: GotrmCandidat) => {
    if (!date) return;
    const key = seances.find((x) => x.date === date && x.libelle === libelle);
    if (key) key.candidats.push(c);
    else seances.push({ date, libelle, candidats: [c] });
  };
  for (const c of s.candidats) {
    push(c.msp1Date, "MSP partie 1 (CCP1)", c);
    push(c.msp2Date, "MSP partie 2 (CCP2 + CCP3)", c);
  }
  seances.sort((a, b) => a.date.localeCompare(b.date) || a.libelle.localeCompare(b.libelle));

  const jury = s.jury.filter((j) => j.nom.trim());
  const surv = s.surveillants.filter((x) => x.trim());

  const blocs = seances.length
    ? seances
        .map(
          (se) => `<h2>${esc(se.libelle)} — ${esc(dateLongue(se.date))}</h2>
      <table><thead><tr><th style="width:34%">Candidat</th><th style="width:12%">Identifiant</th><th>Signature matin</th><th>Signature après-midi</th></tr></thead>
      <tbody>
        ${se.candidats
          .map(
            (c) =>
              `<tr><td>${esc(gotrmCandidatNomComplet(c))}</td><td>${esc(c.identifiant)}</td><td style="height:34px"></td><td></td></tr>`,
          )
          .join("")}
        ${surv
          .map((x) => `<tr><td><b>Surveillant</b> — ${esc(x)}</td><td></td><td style="height:34px"></td><td></td></tr>`)
          .join("")}
        ${jury
          .map(
            (j) =>
              `<tr><td><b>Jury</b> — ${esc(j.nom)}${j.qualite ? ` (${esc(j.qualite)})` : ""}</td><td></td><td style="height:34px"></td><td></td></tr>`,
          )
          .join("")}
      </tbody></table>`,
        )
        .join("")
    : `<div class="note">Aucune demi-journée de mise en situation professionnelle n'est planifiée : renseignez les dates de MSP des candidats.</div>`;

  return wrap(s, "Feuille d'émargement de session", `${sessionBlock(s)}${blocs}`, true);
}

/* ------------------------------------------------------------------ */
/* 5. Procès-verbal de session                                         */
/* ------------------------------------------------------------------ */
export function buildProcesVerbal(s: GotrmSession): string {
  const lignes = s.candidats
    .map(
      (c) => `<tr>
      <td>${esc(gotrmCandidatNomComplet(c))}</td>
      <td>${esc(c.identifiant)}</td>
      <td>${esc(c.parcours)}</td>
      ${GOTRM_CCP.map(
        (ccp) =>
          `<td class="box">${c.ccpVises.includes(ccp.code) ? `${BOX} Obtenu ${BOX} Non obtenu` : "Non visé"}</td>`,
      ).join("")}
      <td class="box">${BOX} Titre &nbsp; ${BOX} CCP &nbsp; ${BOX} Refus</td>
    </tr>`,
    )
    .join("");

  const body = `
  ${sessionBlock(s)}
  ${juryTable(s)}
  <h2>Résultats des candidats</h2>
  <table><thead><tr><th>Candidat</th><th>Identifiant</th><th>Parcours</th>${GOTRM_CCP.map(
    (c) => `<th>${esc(c.code)}</th>`,
  ).join("")}<th>Résultat titre</th></tr></thead><tbody>${lignes}</tbody></table>

  <h2>Statistiques de session</h2>
  <table><tbody>
    <tr><th style="width:40%">Nombre de candidats inscrits</th><td>${s.candidats.length}</td></tr>
    <tr><th>Nombre de candidats présents</th><td></td></tr>
    <tr><th>Nombre de titres délivrés</th><td></td></tr>
    <tr><th>Taux de réussite au titre</th><td></td></tr>
  </tbody></table>

  <div class="sign-grid">
    ${
      (s.jury.filter((j) => j.nom.trim()).length ? s.jury.filter((j) => j.nom.trim()) : [{ nom: "", qualite: "Membre du jury" }])
        .map(
          (j) =>
            `<div class="sign-box"><b>${esc(j.qualite || "Membre du jury")}</b><br><span class="muted">${esc(j.nom)}</span></div>`,
        )
        .join("")
    }
  </div>`;

  return wrap(s, "Procès-verbal de session", body, true);
}

/* ------------------------------------------------------------------ */
/* 6. Livret de certification (parcours par capitalisation de CCP)     */
/* ------------------------------------------------------------------ */
export function buildLivretCertification(s: GotrmSession, c: GotrmCandidat): string {
  const lignes = GOTRM_CCP.map((ccp) => {
    const acquis = c.ccpObtenus.find((x) => x.ccp === ccp.code);
    return `<tr>
      <td>${esc(ccp.code)}</td>
      <td>${esc(ccp.libelle)}</td>
      <td class="box">${acquis ? "☒ Obtenu" : c.ccpVises.includes(ccp.code) ? `${BOX} En cours sur cette session` : `${BOX} Non visé`}</td>
      <td>${esc(acquis ? dateLongue(acquis.date) : "")}</td>
      <td>${esc(acquis?.session ?? "")}</td>
    </tr>`;
  }).join("");

  const body = `
  ${sessionBlock(s)}
  <table><tbody>
    ${row("Candidat", gotrmCandidatNomComplet(c))}
    ${row("Identifiant candidat", c.identifiant)}
    ${row("Date de naissance", dateLongue(c.dateNaissance))}
    ${row("Parcours", c.parcours)}
  </tbody></table>

  <h2>Suivi des certificats de compétences professionnelles</h2>
  <table><thead><tr><th style="width:9%">CCP</th><th>Intitulé</th><th style="width:22%">État</th><th style="width:16%">Date d'obtention</th><th style="width:18%">Session</th></tr></thead>
  <tbody>${lignes}</tbody></table>

  <div class="note">Le titre professionnel est délivré lorsque les trois CCP sont obtenus et à l'issue de l'entretien final devant le jury.</div>

  <div class="sign-grid">
    <div class="sign-box"><b>Le centre organisateur</b><br><span class="muted">${esc(s.organisme.dirigeant || s.organisme.nom)}</span></div>
    <div class="sign-box"><b>Signature du candidat</b><br><span class="muted">${esc(gotrmCandidatNomComplet(c))}</span></div>
  </div>`;

  return wrap(s, "Livret de certification — capitalisation de CCP", body);
}

/* ------------------------------------------------------------------ */
/* 7. Synthèse de session                                              */
/* ------------------------------------------------------------------ */
export function buildSyntheseSession(s: GotrmSession): string {
  const lignes = s.candidats
    .map(
      (c) => `<tr>
      <td>${esc(gotrmCandidatNomComplet(c))}</td>
      ${GOTRM_CCP.map((ccp) => `<td class="box">${c.ccpVises.includes(ccp.code) ? BOX : "—"}</td>`).join("")}
      <td class="box">${BOX}</td>
    </tr>`,
    )
    .join("");

  const parcoursCount = s.candidats.reduce<Record<string, number>>((acc, c) => {
    acc[c.parcours] = (acc[c.parcours] ?? 0) + 1;
    return acc;
  }, {});
  const dossiersIncomplets = s.candidats.filter((c) => !c.dossierComplet).length;

  const body = `
  ${sessionBlock(s)}
  <h2>Tableau récapitulatif</h2>
  <table><thead><tr><th style="width:40%">Candidat</th>${GOTRM_CCP.map(
    (c) => `<th>${esc(c.code)}</th>`,
  ).join("")}<th>Résultat titre</th></tr></thead><tbody>${lignes}</tbody></table>

  <h2>Statistiques de session</h2>
  <table><tbody>
    <tr><th style="width:45%">Candidats inscrits</th><td>${s.candidats.length}</td></tr>
    ${Object.entries(parcoursCount)
      .map(([k, v]) => `<tr><th>Parcours — ${esc(k)}</th><td>${v}</td></tr>`)
      .join("")}
    ${dossiersIncomplets ? `<tr><th>Dossiers d'inscription incomplets</th><td>${dossiersIncomplets}</td></tr>` : ""}
    <tr><th>Demi-journées de MSP planifiées</th><td>${s.candidats.filter((c) => c.msp1Date).length + s.candidats.filter((c) => c.msp2Date).length}</td></tr>
    <tr><th>Titres délivrés</th><td></td></tr>
    <tr><th>Taux de réussite</th><td></td></tr>
  </tbody></table>`;

  return wrap(s, "Synthèse de session", body, true);
}
