/**
 * MyCertif – HTML templates for the 5 documents per stagiaire
 */
import { ORG_FORMATION, ORG_CERTIFICATEUR, CERTIFICATION, JURY, COMPETENCES, QUESTIONNAIRE, QUESTIONNAIRE_VARIANTES, STAGIAIRES, FOOTER_ACADEMY, FOOTER_ESCALE, type CertifStagiaire } from "./myCertifData";

const baseStyle = `
  <style>
    @page { size: A4; margin: 18mm; }
    body { font-family: 'Calibri', Arial, sans-serif; color: #222; font-size: 11pt; line-height: 1.5; margin: 0; }
    h1 { color: #1a1a1a; font-size: 17pt; text-align: left; margin: 18px 0 14px; font-weight: bold; }
    h2 { color: #1a1a1a; font-size: 12pt; margin: 14px 0 6px; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin: 8px 0; }
    th { background: #f3f3f3; color: #1a1a1a; padding: 7px 9px; font-size: 10pt; text-align: left; border: 1px solid #bbb; font-weight: bold; }
    td { padding: 7px 9px; border: 1px solid #bbb; font-size: 10.5pt; vertical-align: top; }
    .pf-header-block { border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-bottom: 18px; display:flex; justify-content:space-between; align-items:flex-start; }
    .pf-header-block .org { font-size: 10pt; line-height: 1.5; }
    .pf-header-block .org .name { font-weight: bold; font-size: 12pt; color: #1a1a1a; }
    .pf-header-block img { max-width: 110px; max-height: 90px; }
    .pf-footer-block { margin-top: 30px; padding-top: 8px; border-top: 1px solid #bbb; text-align: center; font-size: 9pt; color: #555; line-height: 1.5; }
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
  <div class="pf-footer-block">
    <strong>${ORG_FORMATION.nom}</strong> – ${ORG_FORMATION.adresse}, ${ORG_FORMATION.codePostal} ${ORG_FORMATION.ville}<br>
    SIRET ${ORG_FORMATION.siret} – Numéro de déclaration d'activité : ${ORG_FORMATION.nda} – Président : ${ORG_FORMATION.presidente}
  </div>
`;

// ======================================================================
// 1. ATTESTATION DE DÉLIVRANCE — modèle Pro Forma
// ======================================================================
export function getAttestationDelivranceHTML(s: CertifStagiaire): string {
  return `<!doctype html><html><head><meta charset="utf-8">${baseStyle}<style>
    @page { size: A4 portrait; margin: 18mm; }
    body { font-family: 'Calibri', Arial, sans-serif; color: #222; padding: 0; }
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
    .pf-footer { position: fixed; bottom: 12mm; left: 18mm; right: 18mm; text-align: center; font-size: 8.5pt; color: #555; border-top: 1px solid #ccc; padding-top: 6px; line-height: 1.45; }
    .pf-footer strong { color:#1a1a1a; }
  </style></head><body>
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

    <div class="pf-footer">
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

    ${footerProForma()}
  </body></html>`;
}

// ======================================================================
// 3. GRILLE D'ÉVALUATION — 11 pages (Escale Beauty)
// ======================================================================
export function getGrilleEvaluationHTML(s: CertifStagiaire): string {
  const competencesRows = COMPETENCES.map((c) => `
    <tr><td colspan="3" style="background:#f8f4e8;padding:10px;font-weight:bold;border-top:2px solid #d4af37">
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
        <img src="/mycertif/proforma_signature.jpg" style="max-height:80px" alt="Tampon Pro Forma">
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
    <div style="margin-bottom:14px;page-break-inside:avoid">
      <p style="font-weight:bold;font-size:10.5pt;margin:0 0 4px">${i + 1}. ${q.question}</p>
      <div style="border:1px solid #ddd;border-left:3px solid #d4af37;padding:6px 10px;font-size:10pt;background:#fcfaf3;line-height:1.5">${reponse}</div>
    </div>`;
  }).join("");

  return `<!doctype html><html><head><meta charset="utf-8">${baseStyle}</head><body>
    ${headerAcademy()}
    <h1 style="margin-top:20px">QUESTIONNAIRE — FORMATION PROTHÉSISTE ONGULAIRE</h1>
    <p style="text-align:center;font-size:10pt;color:#555">${CERTIFICATION.code} — Modalité M2 (30% de la note globale)</p>

    <table style="margin:12px 0">
      <tbody>
        <tr><td style="width:30%;background:#f8f4e8"><strong>Candidat(e)</strong></td><td>${s.prenom} ${s.nom}</td></tr>
        <tr><td style="background:#f8f4e8"><strong>Date de naissance</strong></td><td>${s.dateNaissance}</td></tr>
        <tr><td style="background:#f8f4e8"><strong>Date de session</strong></td><td>${s.sessionDate}</td></tr>
        <tr><td style="background:#f8f4e8"><strong>Membre du jury</strong></td><td>${s.membreJury || JURY[0].prenom + " " + JURY[0].nom}</td></tr>
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
        <img src="/mycertif/proforma_signature.jpg" style="max-height:80px" alt="Tampon Pro Forma">
      </div>
    </div>

    ${footerProForma()}
  </body></html>`;
}
