/**
 * MyCertif – HTML templates for the 5 documents per stagiaire
 */
import { ORG_FORMATION, ORG_CERTIFICATEUR, CERTIFICATION, JURY, COMPETENCES, QUESTIONNAIRE, QUESTIONNAIRE_VARIANTES, STAGIAIRES, FOOTER_ACADEMY, FOOTER_ESCALE, type CertifStagiaire } from "./myCertifData";

const baseStyle = `
  <style>
    @page { size: A4; margin: 18mm; }
    body { font-family: 'Calibri', Arial, sans-serif; color: #222; font-size: 11pt; line-height: 1.45; margin: 0; }
    h1 { color: #1a1a1a; font-size: 18pt; text-align: center; margin: 0 0 8px; letter-spacing: 0.5px; }
    h2 { color: #1a1a1a; font-size: 13pt; margin: 14px 0 6px; }
    table { width: 100%; border-collapse: collapse; margin: 8px 0; }
    th { background: #e6007e; color: white; padding: 6px 8px; font-size: 10pt; text-align: left; border: 1px solid #c00067; }
    td { padding: 6px 8px; border: 1px solid #ccc; font-size: 10pt; vertical-align: top; }
    .header-org { font-size: 10pt; color: #555; line-height: 1.4; margin-bottom: 6px; }
    .stamp-img { max-width: 130px; opacity: 0.92; }
    .label { color: #666; font-weight: 600; }
    .checkbox { font-family: monospace; font-size: 11pt; }
  </style>
`;

const headerAcademy = () => `
  <div class="header-org">
    <strong>${ORG_FORMATION.nom}</strong><br>
    ${ORG_FORMATION.adresse}, ${ORG_FORMATION.codePostal} ${ORG_FORMATION.ville}<br>
    SIRET : ${ORG_FORMATION.siret} – Numéro de déclaration d'activité : ${ORG_FORMATION.nda}<br>
    Présidente : ${ORG_FORMATION.presidente}
  </div>
`;

// ======================================================================
// 1. ATTESTATION DE DÉLIVRANCE — recreated from scratch (decorative cert)
// ======================================================================
export function getAttestationDelivranceHTML(s: CertifStagiaire): string {
  return `<!doctype html><html><head><meta charset="utf-8">${baseStyle}<style>
    @page { size: A4 portrait; margin: 0; }
    body { background: linear-gradient(135deg, #fff 0%, #fdf4f9 100%); padding: 40px 50px; min-height: 100vh; box-sizing: border-box; }
    .cert { border: 6px double #d4af37; padding: 30px; min-height: 700px; position: relative; background: white; }
    .cert::before, .cert::after { content: ""; position: absolute; width: 60px; height: 60px; border: 3px solid #d4af37; }
    .cert::before { top: 12px; left: 12px; border-right: none; border-bottom: none; }
    .cert::after { bottom: 12px; right: 12px; border-left: none; border-top: none; }
    .brand { text-align: center; font-family: 'Brush Script MT', cursive; font-size: 28pt; color: #1a1a1a; margin-bottom: 18px; }
    .title { text-align: center; font-size: 22pt; font-weight: bold; letter-spacing: 1px; color: #1a1a1a; margin: 18px 0 6px; }
    .subtitle { text-align: center; font-size: 14pt; color: #555; margin-bottom: 30px; font-style: italic; }
    .attribuee { text-align: center; font-size: 12pt; color: #444; margin: 20px 0 10px; }
    .wreath { text-align: center; margin: 20px 0; position: relative; padding: 30px 60px; }
    .wreath::before { content: "🌿"; position: absolute; left: 30px; top: 50%; transform: translateY(-50%) scale(2.5) rotate(-25deg); opacity: 0.5; }
    .wreath::after { content: "🌿"; position: absolute; right: 30px; top: 50%; transform: translateY(-50%) scale(2.5) rotate(25deg) scaleX(-1); opacity: 0.5; }
    .name { font-size: 26pt; font-weight: bold; color: #1a1a1a; letter-spacing: 2px; }
    .legal { text-align: center; font-size: 10pt; color: #555; margin: 22px 30px; line-height: 1.6; }
    .footer-row { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 38px; padding: 0 10px; }
    .sig-block { font-size: 10pt; }
    .sig-line { border-top: 1px solid #888; width: 200px; margin-top: 30px; padding-top: 4px; }
    .stamp { width: 110px; opacity: 0.9; }
    .bottom-brand { text-align: center; font-size: 8pt; color: #888; margin-top: 25px; padding-top: 10px; border-top: 1px solid #eee; }
  </style></head><body>
    <div class="cert">
      <div class="brand">Academy by Djika</div>
      <div class="title">ATTESTATION DE DÉLIVRANCE DE CERTIFICATION</div>
      <div class="subtitle">${CERTIFICATION.intitule.toUpperCase()}</div>

      <div class="attribuee">Cette certification est attribuée à :</div>
      <div class="wreath"><span class="name">${s.prenom.toUpperCase()} ${s.nom.toUpperCase()}</span></div>

      <div class="legal">
        Certification <strong>${CERTIFICATION.code}</strong> enregistrée au Répertoire Spécifique des Certifications et Habilitations,
        par décision du Directeur Général de France Compétences en date du <strong>${CERTIFICATION.decisionDate}</strong>
        (Code NSF ${CERTIFICATION.codeNSF}).<br><br>
        Délivrée sur décision du jury de certification.
      </div>

      <div class="footer-row">
        <div class="sig-block">
          <div><strong>Fait à :</strong> ${ORG_FORMATION.ville}</div>
          <div><strong>Le :</strong> ${s.sessionDate}</div>
          <div style="margin-top:18px"><strong>Signature de la Présidente :</strong> ${ORG_FORMATION.presidente}</div>
          ${(() => { const sig = typeof localStorage !== 'undefined' ? localStorage.getItem('mycertif_signature_presidente') : null; return sig ? `<img src="${sig}" style="max-height:70px;margin-top:4px" alt="Signature">` : `<div style="font-family: 'Brush Script MT', cursive; font-size: 22pt; color:#1a3a7b; margin-top:4px">NGHA Lydia</div>`; })()}
        </div>
        <div class="sig-block" style="text-align:center">
          <img src="/mycertif/tampon_academy.jpg" class="stamp" alt="Tampon Academy">
        </div>
      </div>

      <div class="bottom-brand">${ORG_FORMATION.nom} — RCS ${ORG_FORMATION.rcs} — ${ORG_FORMATION.adresse}, ${ORG_FORMATION.codePostal} ${ORG_FORMATION.ville}</div>
    </div>
  </body></html>`;
}

// ======================================================================
// 2. FEUILLE D'ÉMARGEMENT JURY (1 par session)
// ======================================================================
export function getEmargementJuryHTML(sessionDate: string): string {
  return `<!doctype html><html><head><meta charset="utf-8">${baseStyle}</head><body>
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
              ${i === JURY.length - 1
                ? `<img src="/mycertif/tampon_academy.jpg" style="max-height:60px" alt="Tampon">`
                : `<span style="font-family: 'Brush Script MT', cursive; font-size: 16pt; color:#1a3a7b">${j.prenom.charAt(0)}. ${j.nom.split(' ')[0].toLowerCase()}</span>`
              }
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    ${FOOTER_ACADEMY}
  </body></html>`;
}

// ======================================================================
// 3. GRILLE D'ÉVALUATION — 11 pages (Escale Beauty)
// ======================================================================
export function getGrilleEvaluationHTML(s: CertifStagiaire): string {
  const competencesRows = COMPETENCES.map((c) => `
    <tr><td colspan="3" style="background:#fef0f8;padding:10px;font-weight:bold;border-top:2px solid #e6007e">
      ${c.titre}<div style="font-weight:normal;font-size:9pt;color:#555;margin-top:4px;font-style:italic">${c.description}</div>
    </td></tr>
    ${c.criteres.map(cr => `
      <tr>
        <td style="width:55%;padding-left:18px">${cr.texte}</td>
        <td style="width:25%;text-align:center;font-size:10pt">
          ${cr.acquis ? '<span style="color:#0a8a3a;font-weight:bold">☒ Acquis</span>' : '☐ Acquis'}
        </td>
        <td style="width:20%;text-align:center;font-size:10pt;color:#999">
          ${!cr.acquis ? '<span style="font-weight:bold">☒ Non acquis</span>' : '☐ Non acquis'}
        </td>
      </tr>
    `).join("")}
  `).join("");

  const synthese = COMPETENCES.map(c =>
    `<tr><td>Compétence ${c.num}</td><td style="text-align:center"><strong style="color:#0a8a3a">☒ Acquise</strong></td><td style="text-align:center;color:#999">☐ Non acquise</td></tr>`
  ).join("");

  return `<!doctype html><html><head><meta charset="utf-8">${baseStyle}</head><body>
    <div style="text-align:center;font-size:9pt;color:#888;margin-bottom:8px">ANNEXE 3 : GRILLE D'ÉVALUATION</div>
    <h1>GRILLE D'ÉVALUATION</h1>
    <p style="font-size:10pt">L'évaluation se déroule de la manière suivante. Chaque compétence est évaluée par deux modalités :</p>
    <p style="font-size:10pt;font-style:italic;margin:4px 0"><strong>M1</strong> – Mise en situation sur un modèle vivant (de l'accueil à la prestation) : 70% de la note globale.</p>
    <p style="font-size:10pt;font-style:italic;margin:4px 0"><strong>M2</strong> – Questionnaire « Techniques de prothésie ongulaire » : 30% de la note globale.</p>
    <p style="font-size:10pt"><strong>Pour chaque critère il faudra 70% d'indicateurs réussis pour déclarer une compétence acquise.</strong></p>

    <table style="margin-top:14px">
      <thead><tr><th>CANDIDAT</th><th>MEMBRE DU JURY</th><th>SESSION</th></tr></thead>
      <tbody><tr>
        <td>Nom : ${s.nom}<br>Prénom : ${s.prenom}<br>Date de naissance : ${s.dateNaissance}</td>
        <td>${s.membreJury || JURY[0].prenom + " " + JURY[0].nom}<br>Titre : Technique de prothésie ongulaire</td>
        <td>Date : ${s.sessionDate}</td>
      </tr></tbody>
    </table>

    <h2 style="margin-top:18px">« ${CERTIFICATION.intitule.toUpperCase()} »</h2>
    <table>
      <thead><tr><th style="width:55%">CRITÈRES</th><th style="width:25%">ACQUIS</th><th style="width:20%">NON ACQUIS</th></tr></thead>
      <tbody>${competencesRows}</tbody>
    </table>

    <h2 style="margin-top:22px;page-break-before:always">Synthèse des compétences</h2>
    <table>
      <thead><tr><th>Compétence</th><th style="width:25%">Acquise</th><th style="width:25%">Non acquise</th></tr></thead>
      <tbody>${synthese}</tbody>
    </table>

    <p style="margin-top:30px;font-size:10pt"><strong>Décision du jury :</strong> Compétences acquises — certification délivrée.</p>
    <div style="display:flex;gap:30px;margin-top:30px">
      <div style="flex:1">
        <p style="font-size:10pt"><strong>Membre du jury :</strong> ${s.membreJury || JURY[0].prenom + " " + JURY[0].nom}</p>
        <p style="font-size:10pt;color:#666">Signature :</p>
        <div style="font-family: 'Brush Script MT', cursive; font-size: 18pt; color:#1a3a7b">${(s.membreJury || JURY[0].nom).split(' ')[0]}</div>
      </div>
      <div style="flex:1;text-align:right">
        <p style="font-size:10pt"><strong>Session du :</strong> ${s.sessionDate}</p>
        <p style="font-size:10pt;color:#666">Tampon :</p>
        <img src="/mycertif/tampon_academy.jpg" style="max-height:80px" alt="Tampon">
      </div>
    </div>

    ${FOOTER_ESCALE}
  </body></html>`;
}

// ======================================================================
// 4. ATTESTATION SUR L'HONNEUR (signée par le stagiaire)
// ======================================================================
export function getAttestationHonneurHTML(s: CertifStagiaire): string {
  return `<!doctype html><html><head><meta charset="utf-8">${baseStyle}</head><body>
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

    ${FOOTER_ACADEMY}
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
    <div style="margin-bottom:14px;page-break-inside:avoid">
      <p style="font-weight:bold;font-size:10.5pt;margin:0 0 4px">${i + 1}. ${q.question}</p>
      <div style="border:1px solid #ddd;border-left:3px solid #e6007e;padding:6px 10px;font-size:10pt;background:#fdfaff;line-height:1.5">${reponse}</div>
    </div>`;
  }).join("");

  return `<!doctype html><html><head><meta charset="utf-8">${baseStyle}</head><body>
    ${headerAcademy()}
    <h1 style="margin-top:20px">QUESTIONNAIRE — FORMATION PROTHÉSISTE ONGULAIRE</h1>
    <p style="text-align:center;font-size:10pt;color:#555">${CERTIFICATION.code} — Modalité M2 (30% de la note globale)</p>

    <table style="margin:12px 0">
      <tbody>
        <tr><td style="width:30%;background:#fef0f8"><strong>Candidat(e)</strong></td><td>${s.prenom} ${s.nom}</td></tr>
        <tr><td style="background:#fef0f8"><strong>Date de naissance</strong></td><td>${s.dateNaissance}</td></tr>
        <tr><td style="background:#fef0f8"><strong>Date de session</strong></td><td>${s.sessionDate}</td></tr>
        <tr><td style="background:#fef0f8"><strong>Membre du jury</strong></td><td>${s.membreJury || JURY[0].prenom + " " + JURY[0].nom}</td></tr>
      </tbody>
    </table>

    <div style="margin-top:18px">${questionsHtml}</div>

    <p style="margin-top:20px;font-size:10pt"><strong>Évaluation du jury :</strong> Réponses satisfaisantes — connaissances acquises (≥ 70%).</p>
    <div style="margin-top:18px;display:flex;gap:30px">
      <div style="flex:1">
        <p style="font-size:10pt"><strong>Signature du candidat :</strong></p>
        <div style="font-family: 'Brush Script MT', cursive; font-size: 18pt; color:#1a3a7b">${s.prenom} ${s.nom}</div>
      </div>
      <div style="flex:1;text-align:right">
        <p style="font-size:10pt"><strong>Tampon :</strong></p>
        <img src="/mycertif/tampon_academy.jpg" style="max-height:80px" alt="Tampon">
      </div>
    </div>

    ${FOOTER_ACADEMY}
  </body></html>`;
}
