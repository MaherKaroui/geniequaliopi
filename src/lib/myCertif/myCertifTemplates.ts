/**
 * MyCertif – HTML templates for the 5 documents per stagiaire
 */
import { ORG_FORMATION, ORG_CERTIFICATEUR, CERTIFICATION, JURY, COMPETENCES, QUESTIONNAIRE, QUESTIONNAIRE_VARIANTES, STAGIAIRES, FOOTER_ACADEMY, FOOTER_ESCALE, type CertifStagiaire } from "./myCertifData";

const baseStyle = `
  <style>
    @page { size: A4; margin: 0; }
    body { font-family: 'Calibri', Arial, sans-serif; color: #222; font-size: 10.5pt; line-height: 1.45; margin: 0; background:#fff; }
    .mycertif-page { box-sizing: border-box; width: 100%; padding: 14mm 18mm 22mm; }
    .pdf-root > h1, .pdf-root > h2, .pdf-root > p, .pdf-root > table, .pdf-root > div:not(.footer):not(.mycertif-page):not(.pf-cert-page),
    .mycertif-page > h1, .mycertif-page > h2, .mycertif-page > p, .mycertif-page > table, .mycertif-page > div:not(.footer) { max-width: 174mm; margin-left: auto; margin-right: auto; }
    h1 { color: #1a1a1a; font-size: 16pt; text-align: left; margin: 10px 0 10px; font-weight: bold; }
    h2 { color: #1a1a1a; font-size: 11.5pt; margin: 10px 0 5px; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin: 6px 0; }
    th { background: #eef2f7; color: #1a1a1a; padding: 6px 8px; font-size: 9.5pt; text-align: left; border: 1px solid #bbb; font-weight: bold; }
    td { padding: 5px 8px; border: 1px solid #bbb; font-size: 10pt; vertical-align: top; }
    .pf-header-block { border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-bottom: 18px; display:flex; justify-content:space-between; align-items:flex-start; }
    .pf-header-block .org { font-size: 10pt; line-height: 1.5; }
    .pf-header-block .org .name { font-weight: bold; font-size: 12pt; color: #1a1a1a; }
    .pf-header-block img { max-width: 110px; max-height: 90px; }
    .pf-footer-block { margin: 0 18mm; padding-top: 7px; border-top: 1px solid #bbb; text-align: center; font-size: 8.5pt; color: #555; line-height: 1.35; }
    .pf-footer-block strong { color: #1a1a1a; }
    .label { color: #444; font-weight: 600; }
  </style>
`;

const headerAcademy = () => `
  <div class="pf-header-block">
    <div class="org">
      <div class="name">${ORG_FORMATION.nom}</div>
      ${ORG_FORMATION.adresse}, ${ORG_FORMATION.codePostal} ${ORG_FORMATION.ville}<br>
      SIRET : ${ORG_FORMATION.siret} – Numéro de déclaration d'activité : ${ORG_FORMATION.nda}<br>
      Président : ${ORG_FORMATION.presidente}
    </div>
    <img src="/mycertif/proforma_logo.jpg" alt="Pro Forma">
  </div>
`;

const footerProForma = () => `
  <div class="pf-footer-block footer">
    <strong>${ORG_FORMATION.nom}</strong> – ${ORG_FORMATION.adresse}, ${ORG_FORMATION.codePostal} ${ORG_FORMATION.ville}<br>
    SIRET ${ORG_FORMATION.siret} – Numéro de déclaration d'activité : ${ORG_FORMATION.nda} – Président : ${ORG_FORMATION.presidente}
  </div>
`;

// ======================================================================
// 1. ATTESTATION DE DÉLIVRANCE — modèle Pro Forma
// ======================================================================
export function getAttestationDelivranceHTML(s: CertifStagiaire): string {
  return `<!doctype html><html><head><meta charset="utf-8">${baseStyle}<style>
    @page { size: A4 portrait; margin: 0; }
    body { font-family: 'Calibri', Arial, sans-serif; color: #222; padding: 0; }
    .pf-cert-page { box-sizing:border-box; width:100%; padding:18mm 20mm 34mm; }
    .pf-header { display:flex; justify-content:space-between; align-items:flex-start; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-bottom: 20px; }
    .pf-org { font-size: 10pt; line-height: 1.5; }
    .pf-org .name { font-weight: bold; font-size: 12pt; color: #1a1a1a; }
    .pf-logo { max-width: 130px; max-height: 110px; }
    .pf-title { text-align:center; font-size: 17pt; font-weight: bold; text-decoration: underline; margin: 30px 0 8px; letter-spacing: 0.5px; }
    .pf-subtitle { text-align:center; font-size: 14pt; font-weight: bold; text-decoration: underline; margin-bottom: 30px; text-transform: uppercase; }
    .pf-attribuee { font-size: 12pt; margin: 20px 0 8px; }
    .pf-name { text-align:center; font-size: 22pt; font-weight: bold; color: #1a1a1a; margin: 18px 0 30px; letter-spacing: 1px; }
    .pf-legal { font-size: 11pt; line-height: 1.6; margin: 18px 0; text-align: justify; }
    .pf-faits { margin-top: 30px; font-size: 11pt; }
    .pf-faits p { margin: 4px 0; }
    .pf-sig-block { margin-top: 28px; }
    .pf-sig-img { max-height: 110px; margin-top: 8px; }
    .pf-footer { margin:0 20mm; text-align: center; font-size: 8.5pt; color: #555; border-top: 1px solid #ccc; padding-top: 6px; line-height: 1.45; }
    .pf-footer strong { color:#1a1a1a; }
  </style></head><body>
    <div class="pf-cert-page">
    <div class="pf-header">
      <div class="pf-org">
        <div class="name">${ORG_FORMATION.nom}</div>
        ${ORG_FORMATION.adresse}, ${ORG_FORMATION.codePostal} ${ORG_FORMATION.ville}<br>
        <strong>Siret</strong> : ${ORG_FORMATION.siret} &nbsp; <strong>Siren</strong> : ${(ORG_FORMATION as any).siren || ORG_FORMATION.siret.slice(0,9)}<br>
        Mail : ${ORG_FORMATION.email}<br>
        Président : <strong>${ORG_FORMATION.presidente}</strong>
      </div>
      <img src="/mycertif/proforma_logo.jpg" class="pf-logo" alt="Pro Forma">
    </div>

    <div class="pf-title">ATTESTATION DE DÉLIVRANCE DE CERTIFICATION</div>
    <div class="pf-subtitle">${CERTIFICATION.intitule}</div>

    <p class="pf-attribuee">Cette certification est attribuée à :</p>
    <div class="pf-name">${s.prenom.toUpperCase()} ${s.nom.toUpperCase()}</div>

    <p class="pf-legal">
      Certification <strong>${CERTIFICATION.code}</strong> enregistrée au Répertoire Spécifique des Certifications et Habilitations,
      par décision du Directeur Général de France Compétences en date du <strong>${CERTIFICATION.decisionDate}</strong>
      (Code NSF ${CERTIFICATION.codeNSF}).
    </p>
    <p class="pf-legal">
      Formation suivie <strong>du ${s.dateDebut} au ${s.dateFin}</strong> auprès de ${ORG_FORMATION.nom}.<br>
      Délivrée sur décision du jury de certification.
    </p>

    <div class="pf-faits">
      <p><strong>Fait à :</strong> ${ORG_FORMATION.ville}</p>
      <p><strong>Le :</strong> ${s.sessionDate}</p>
    </div>

    <div class="pf-sig-block">
      <p><strong>Signature du Président :</strong></p>
      ${(() => { const sig = typeof localStorage !== 'undefined' ? localStorage.getItem('mycertif_signature_presidente') : null; return sig ? `<img src="${sig}" class="pf-sig-img" alt="Signature">` : `<img src="/mycertif/proforma_signature.jpg" class="pf-sig-img" alt="Signature Pro Forma">`; })()}
    </div>
    </div>

    <div class="pf-footer footer">
      <strong>${ORG_FORMATION.nom}</strong><br>
      ${ORG_FORMATION.adresse}, ${ORG_FORMATION.codePostal} ${ORG_FORMATION.ville}<br>
      Siret : ${ORG_FORMATION.siret} &nbsp; Siren : ${(ORG_FORMATION as any).siren || ORG_FORMATION.siret.slice(0,9)}<br>
      NDA : ${ORG_FORMATION.nda} — Cet enregistrement ne vaut pas agrément de l'État. — Document mis à jour le V1 ${s.sessionDate}
    </div>
  </body></html>`;
}

// ======================================================================
// 2. FEUILLE D'ÉMARGEMENT JURY (1 par session)
// ======================================================================
export function getEmargementJuryHTML(sessionDate: string): string {
  return `<!doctype html><html><head><meta charset="utf-8">${baseStyle}</head><body>
    <div class="mycertif-page">
    ${headerAcademy()}
    <h1 style="margin-top:24px">Feuille d'émargement des membres présents</h1>
    <p style="text-align:center"><strong>DATE :</strong> ${sessionDate}</p>
    <p style="text-align:center"><strong>Formation :</strong> « ${CERTIFICATION.intitule} » — ${CERTIFICATION.code}</p>

    <table style="margin-top:18px">
      <thead><tr><th>NOM</th><th>Prénom</th><th>Fonction</th><th style="width:30%">Émargement</th></tr></thead>
      <tbody>
        ${JURY.map((j, i) => `
          <tr>
            <td>${j.nom}</td>
            <td>${j.prenom}</td>
            <td>${j.fonction}</td>
            <td style="text-align:center;color:#666;font-style:italic">
              ${j.prenom === "Lydia" && j.nom.includes("NGHA")
                ? `<img src="/mycertif/tampon_academy.jpg" style="max-height:60px" alt="Tampon Academy by Djika">`
                : `<span style="font-family: 'Brush Script MT', cursive; font-size: 16pt; color:#1a3a7b">${j.prenom.charAt(0)}. ${j.nom.split(' ')[0].toLowerCase()}</span>`
              }
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    </div>

    ${footerProForma()}
  </body></html>`;
}

// ======================================================================
// 3. GRILLE D'ÉVALUATION — 11 pages (Escale Beauty)
// ======================================================================
// Seeded PRNG for per-trainee deterministic variation
function seededRand(seed: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

export function getGrilleEvaluationHTML(s: CertifStagiaire): string {
  // Per-trainee variation: ~88% acquired criteria. Compétence acquise si ≥70% critères acquis.
  const rand = seededRand(`${s.nom}|${s.prenom}|${s.dateNaissance}`);
  const perCompetence = COMPETENCES.map((c) => {
    const criteres = c.criteres.map((cr) => ({ ...cr, acquis: rand() < 0.88 }));
    const ratio = criteres.filter((x) => x.acquis).length / criteres.length;
    return { c, criteres, competenceAcquise: ratio >= 0.7 };
  });

  const competenceBlocks = perCompetence.map(({ c, criteres }) => `
    <table class="grille-table" style="margin:0 0 6px 0;page-break-inside:avoid">
      <colgroup><col style="width:58%"><col style="width:21%"><col style="width:21%"></colgroup>
      <thead>
        <tr>
          <th colspan="3" style="background:#eef2f7;border-top:2px solid #1a3a7b;padding:6px 8px;font-size:10pt">
            ${c.titre}
            <div style="font-weight:normal;font-size:8.5pt;color:#555;margin-top:2px;font-style:italic">${c.description}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        ${criteres.map(cr => `
          <tr>
            <td style="padding-left:14px">${cr.texte}</td>
            <td style="text-align:center;font-size:9.5pt">
              ${cr.acquis ? '<span style="color:#0a8a3a;font-weight:bold">☒ Acquis</span>' : '☐ Acquis'}
            </td>
            <td style="text-align:center;font-size:9.5pt;color:#999">
              ${!cr.acquis ? '<span style="font-weight:bold;color:#b00020">☒ Non acquis</span>' : '☐ Non acquis'}
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `).join("");

  const synthese = perCompetence.map(({ c, competenceAcquise }) =>
    `<tr><td>Compétence ${c.num}</td>` +
    `<td style="text-align:center">${competenceAcquise ? '<strong style="color:#0a8a3a">☒ Acquise</strong>' : '<span style="color:#999">☐ Acquise</span>'}</td>` +
    `<td style="text-align:center">${!competenceAcquise ? '<strong style="color:#b00020">☒ Non acquise</strong>' : '<span style="color:#999">☐ Non acquise</span>'}</td></tr>`
  ).join("");

  return `<!doctype html><html><head><meta charset="utf-8">${baseStyle}<style>
    .grille-page { padding-left: 17mm; padding-right: 17mm; }
    .grille-intro { max-width: 172mm; margin: 0 auto 8px; }
    .grille-table { max-width: 172mm; margin-left:auto !important; margin-right:auto !important; }
  </style></head><body>
    <div class="mycertif-page grille-page">
    <div style="text-align:center;font-size:8.5pt;color:#888;margin-bottom:4px">ANNEXE 3 : GRILLE D'ÉVALUATION</div>
    <h1 style="text-align:center;margin:4px 0 10px">GRILLE D'ÉVALUATION</h1>
    <div class="grille-intro">
      <p style="font-size:9.5pt;margin:2px 0">L'évaluation se déroule de la manière suivante. Chaque compétence est évaluée par deux modalités :</p>
      <p style="font-size:9.5pt;font-style:italic;margin:2px 0"><strong>M1</strong> – Mise en situation sur un modèle vivant (de l'accueil à la prestation) : 70% de la note globale.</p>
      <p style="font-size:9.5pt;font-style:italic;margin:2px 0"><strong>M2</strong> – Questionnaire « Techniques de prothésie ongulaire » : 30% de la note globale.</p>
      <p style="font-size:9.5pt;margin:4px 0"><strong>Pour chaque critère il faudra 70% d'indicateurs réussis pour déclarer une compétence acquise.</strong></p>
    </div>

    <table class="grille-table" style="margin-top:8px;page-break-inside:avoid">
      <thead><tr><th>CANDIDAT</th><th>MEMBRE DU JURY</th><th>SESSION</th></tr></thead>
      <tbody><tr>
        <td>Nom : ${s.nom}<br>Prénom : ${s.prenom}<br>Date de naissance : ${s.dateNaissance}</td>
        <td>${s.membreJury || JURY[0].prenom + " " + JURY[0].nom}<br>Titre : Technique de prothésie ongulaire</td>
        <td>Date : ${s.sessionDate}</td>
      </tr></tbody>
    </table>

    <h2 style="margin-top:14px">« ${CERTIFICATION.intitule.toUpperCase()} »</h2>
    ${competenceBlocks}

    <h2 style="margin-top:16px;page-break-inside:avoid">Synthèse des compétences</h2>
    <table class="grille-table" style="page-break-inside:avoid">
      <thead><tr><th>Compétence</th><th style="width:25%">Acquise</th><th style="width:25%">Non acquise</th></tr></thead>
      <tbody>${synthese}</tbody>
    </table>

    <div style="page-break-inside:avoid;margin-top:14px">
      <p style="font-size:10pt;margin:6px 0"><strong>Décision du jury :</strong> Compétences acquises — certification délivrée.</p>
      <table style="border:none">
        <tr>
          <td style="border:none;width:50%;vertical-align:top">
            <p style="font-size:10pt;margin:2px 0"><strong>Membre du jury :</strong> ${s.membreJury || JURY[0].prenom + " " + JURY[0].nom}</p>
            <p style="font-size:9.5pt;color:#666;margin:2px 0">Signature :</p>
            <div style="font-family: 'Brush Script MT', cursive; font-size: 18pt; color:#1a3a7b">${(s.membreJury || JURY[0].nom).split(' ')[0]}</div>
          </td>
          <td style="border:none;width:50%;vertical-align:top;text-align:right">
            <p style="font-size:10pt;margin:2px 0"><strong>Session du :</strong> ${s.sessionDate}</p>
            <p style="font-size:9.5pt;color:#666;margin:2px 0">Tampon :</p>
            <img src="/mycertif/proforma_signature.jpg" style="max-height:80px" alt="Tampon Pro Forma">
          </td>
        </tr>
      </table>
    </div>
    </div>

    ${footerProForma()}
  </body></html>`;
}

// ======================================================================
// 4. ATTESTATION SUR L'HONNEUR (signée par le stagiaire)
// ======================================================================
export function getAttestationHonneurHTML(s: CertifStagiaire): string {
  return `<!doctype html><html><head><meta charset="utf-8">${baseStyle}</head><body>
    <div class="mycertif-page">
    ${headerAcademy()}
    <h1 style="margin-top:30px">ATTESTATION SUR L'HONNEUR</h1>

    <p style="margin-top:24px">Je soussigné(e),</p>
    <p><span class="label">Nom et prénom :</span> <strong>${s.nom} ${s.prenom}</strong></p>
    <p><span class="label">Date de naissance :</span> <strong>${s.dateNaissance}</strong></p>
    <p><span class="label">Adresse :</span> <strong>${s.adresse}, ${s.ville}</strong></p>

    <p style="margin-top:18px;text-align:justify">
      Atteste sur l'honneur avoir pour projet la <strong>création d'une entreprise dans le domaine de l'onglerie</strong>
      (prothésie ongulaire / stylisme ongulaire).
    </p>
    <p style="text-align:justify">
      Cette attestation est établie afin de justifier mon entrée en formation, conformément aux prérequis demandés
      pour l'accès à la certification.
    </p>
    <p style="text-align:justify">
      Je m'engage à entreprendre les démarches nécessaires à la création de mon activité professionnelle dans ce
      domaine à l'issue de ma formation <strong>${CERTIFICATION.code} — ${CERTIFICATION.intitule}</strong>.
    </p>

    <p style="margin-top:14px"><em>Fait pour servir et valoir ce que de droit.</em></p>

    <div style="margin-top:34px">
      <p><span class="label">Fait à :</span> ${s.ville}</p>
      <p><span class="label">Le :</span> ${s.sessionDate}</p>
      <p style="margin-top:14px;font-style:italic;font-size:10pt">Signature précédée de la mention « Lu et approuvé, bon pour attestation sur l'honneur »</p>
      <div style="margin-top:8px;font-size:10pt;font-style:italic">Lu et approuvé, bon pour attestation sur l'honneur</div>
      <div style="font-family: 'Brush Script MT', cursive; font-size: 22pt; color:#1a3a7b; margin-top:6px">${s.prenom} ${s.nom}</div>
    </div>
    </div>

    ${footerProForma()}
  </body></html>`;
}

// ======================================================================
// 5. QUESTIONNAIRE PROTHÉSISTE ONGULAIRE (rempli)
// ======================================================================
export function getQuestionnaireHTML(s: CertifStagiaire): string {
  const idx = Math.max(0, STAGIAIRES.findIndex(x => x.nom === s.nom && x.prenom === s.prenom));
  const questionsHtml = QUESTIONNAIRE.map((q, i) => {
    const variantes = QUESTIONNAIRE_VARIANTES[i];
    const reponse = variantes ? variantes[(idx + i) % variantes.length] : q.reponse;
    return `
    <div style="margin-bottom:8px;page-break-inside:avoid">
      <p style="font-weight:bold;font-size:10pt;margin:0 0 3px;color:#1a1a1a">${i + 1}. ${q.question}</p>
      <div style="border:1px solid #d8dde6;border-left:3px solid #1a3a7b;padding:5px 9px;font-size:9.5pt;background:#fafbfd;line-height:1.4">${reponse}</div>
    </div>`;
  }).join("");

  return `<!doctype html><html><head><meta charset="utf-8">${baseStyle}<style>
    .questionnaire-page { padding-left: 17mm; padding-right: 17mm; }
  </style></head><body>
    <div class="mycertif-page questionnaire-page">
    ${headerAcademy()}
    <h1 style="text-align:center;margin:8px 0 4px">QUESTIONNAIRE — FORMATION PROTHÉSISTE ONGULAIRE</h1>
    <p style="text-align:center;font-size:9.5pt;color:#555;margin:0 0 8px">${CERTIFICATION.code} — Modalité M2 (30% de la note globale)</p>

    <table style="margin:6px 0 10px;page-break-inside:avoid">
      <tbody>
        <tr><td style="width:30%;background:#eef2f7"><strong>Candidat(e)</strong></td><td>${s.prenom} ${s.nom}</td>
            <td style="width:25%;background:#eef2f7"><strong>Date de session</strong></td><td>${s.sessionDate}</td></tr>
        <tr><td style="background:#eef2f7"><strong>Date de naissance</strong></td><td>${s.dateNaissance}</td>
            <td style="background:#eef2f7"><strong>Membre du jury</strong></td><td>${s.membreJury || JURY[0].prenom + " " + JURY[0].nom}</td></tr>
      </tbody>
    </table>

    ${questionsHtml}

    <div style="page-break-inside:avoid;margin-top:10px">
      <p style="font-size:9.5pt;margin:4px 0"><strong>Évaluation du jury :</strong> Réponses satisfaisantes — connaissances acquises (≥ 70%).</p>
      <table style="border:none">
        <tr>
          <td style="border:none;width:50%;vertical-align:top">
            <p style="font-size:10pt;margin:2px 0"><strong>Signature du candidat :</strong></p>
            <div style="font-family: 'Brush Script MT', cursive; font-size: 18pt; color:#1a3a7b">${s.prenom} ${s.nom}</div>
          </td>
          <td style="border:none;width:50%;vertical-align:top;text-align:right">
            <p style="font-size:10pt;margin:2px 0"><strong>Tampon :</strong></p>
            <img src="/mycertif/proforma_signature.jpg" style="max-height:80px" alt="Tampon Pro Forma">
          </td>
        </tr>
      </table>
    </div>
    </div>

    ${footerProForma()}
  </body></html>`;
}
