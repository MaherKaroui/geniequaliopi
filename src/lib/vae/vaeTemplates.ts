import type { VAEData, VAECandidat, VAEOrganisme, VAECertification, VAESession, VAEContents } from "./vaeTypes";

function longDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function esc(s: string | undefined | null): string {
  if (!s) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function nl2br(s: string): string {
  return esc(s).replace(/\n/g, "<br/>");
}

const BASE_STYLE = `
<style>
  body { font-family: Calibri, Arial, sans-serif; color: #1a1a1a; font-size: 11pt; line-height: 1.5; }
  h1 { color: #1e3a8a; font-size: 20pt; border-bottom: 2px solid #1e3a8a; padding-bottom: 6px; margin-bottom: 18px; }
  h2 { color: #1e40af; font-size: 14pt; margin-top: 22px; margin-bottom: 10px; }
  h3 { color: #1e40af; font-size: 12pt; margin-top: 16px; margin-bottom: 6px; }
  table { border-collapse: collapse; width: 100%; margin: 10px 0; }
  th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; font-size: 10.5pt; vertical-align: top; }
  th { background: #eff6ff; color: #1e3a8a; font-weight: bold; }
  tr:nth-child(even) td { background: #f8fafc; }
  .footer { margin-top: 32px; padding-top: 10px; border-top: 1px solid #cbd5e1; font-size: 9pt; color: #475569; text-align: center; }
  .sign-block { display: flex; justify-content: space-between; margin-top: 40px; gap: 24px; }
  .sign-box { flex: 1; border-top: 1px solid #cbd5e1; padding-top: 6px; font-size: 10pt; }
  .meta { font-size: 10pt; color: #475569; margin-bottom: 12px; }
  .badge { display: inline-block; background: #eff6ff; color: #1e3a8a; padding: 2px 8px; border-radius: 4px; font-size: 9pt; font-weight: bold; }
  p { margin: 6px 0; }
  ul { margin: 6px 0 6px 20px; }
</style>`;

function footer(org: VAEOrganisme, docTitle: string): string {
  return `<div class="footer">
    <strong>${esc(org.nom)}</strong> — SIRET ${esc(org.siret)} — NDA ${esc(org.nda)}<br/>
    ${esc(org.adresse)} — ${esc(org.email)}<br/>
    ${esc(docTitle)} — Version 1 — ${longDate(new Date().toISOString().slice(0, 10))}
  </div>`;
}

function header(org: VAEOrganisme, title: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(title)}</title>${BASE_STYLE}</head><body>
    <h1>${esc(title)}</h1>
    <div class="meta">
      <strong>${esc(org.nom)}</strong> — ${esc(org.adresse)}<br/>
      SIRET ${esc(org.siret)} — Déclaration d'activité n° ${esc(org.nda)}
    </div>`;
}

function close(org: VAEOrganisme, title: string): string {
  return `${footer(org, title)}</body></html>`;
}

function candidatBlock(c: VAECandidat): string {
  const phone = c.telephone ? `<br/>Téléphone : ${esc(c.telephone)}` : "";
  return `<p><strong>${esc(c.civilite)} ${esc(c.prenom)} ${esc(c.nom)}</strong><br/>
    Né(e) le ${longDate(c.dateNaissance)}${c.lieuNaissance ? " à " + esc(c.lieuNaissance) : ""}<br/>
    ${esc(c.adresse)}, ${esc(c.codePostal)} ${esc(c.ville)}<br/>
    ${esc(c.email)}${phone}</p>`;
}

function certifBlock(cert: VAECertification): string {
  return `<p><strong>${esc(cert.intitule)}</strong><br/>
    Code RNCP : <span class="badge">${esc(cert.rncp)}</span> — Niveau ${esc(cert.niveau)}<br/>
    Certificateur : ${esc(cert.certificateur)}<br/>
    Date d'échéance de l'enregistrement : ${esc(cert.dateEcheance) || "voir France Compétences"}<br/>
    Fiche officielle : <a href="${esc(cert.lien)}">${esc(cert.lien)}</a></p>`;
}

// ------------------------- DOCUMENTS -------------------------

export function getConventionHTML(d: VAEData): string {
  const title = "Convention d'accompagnement VAE";
  const { organisme: o, candidat: c, certification: cert, session: s } = d;
  return `${header(o, title)}
    <h2>Entre les soussignés</h2>
    <p><strong>L'organisme accompagnateur :</strong> ${esc(o.nom)}, ${esc(o.adresse)}, SIRET ${esc(o.siret)}, NDA ${esc(o.nda)}, représenté par ${esc(o.dirigeant)}.</p>
    <p><strong>Et le/la candidat(e) :</strong></p>
    ${candidatBlock(c)}

    <h2>Objet</h2>
    <p>La présente convention a pour objet la mise en œuvre d'un accompagnement à la Validation des Acquis de l'Expérience (VAE) en vue de l'obtention de la certification suivante :</p>
    ${certifBlock(cert)}

    <h2>Modalités</h2>
    <table>
      <tr><th>Durée</th><td>${esc(o.duree)}</td></tr>
      <tr><th>Modalité</th><td>${esc(s.modalite)}</td></tr>
      <tr><th>Lien visioconférence</th><td>${esc(o.lienVisio)}</td></tr>
      <tr><th>Date de début</th><td>${longDate(s.dateDebut)}</td></tr>
      <tr><th>Date de fin</th><td>${longDate(s.dateFin)}</td></tr>
      <tr><th>Entretien de positionnement</th><td>${longDate(s.dateEntretienPositionnement)}</td></tr>
      <tr><th>Demande de recevabilité</th><td>${longDate(s.dateDemandeRecevabilite)}</td></tr>
      <tr><th>Référent handicap</th><td>${esc(o.referentHandicap)}</td></tr>
    </table>

    <h2>Conditions financières</h2>
    <p>Prix forfaitaire : <strong>${esc(o.prixTTC)}</strong> — Mode de financement : ${esc(s.financement)}.</p>

    <h2>Signatures</h2>
    <p>Fait à ${esc(s.lieuSignature)}, le ${longDate(s.dateSignature)}, en deux exemplaires originaux.</p>
    <div class="sign-block">
      <div class="sign-box"><strong>Pour ${esc(o.nom)}</strong><br/>${esc(o.dirigeant)}</div>
      <div class="sign-box"><strong>Le/la candidat(e)</strong><br/>${esc(c.prenom)} ${esc(c.nom)}</div>
    </div>
    ${close(o, title)}`;
}

export function getLivret1HTML(d: VAEData): string {
  const title = "Livret 1 — Demande de recevabilité VAE";
  const { organisme: o, candidat: c, certification: cert } = d;
  const dipl = c.diplomes.map(x => `<tr><td>${esc(x.intitule)}</td><td>${esc(x.etablissement)}</td><td>${esc(x.annee)}</td></tr>`).join("");
  const exp = c.experiences.map(x => `<tr><td>${esc(x.poste)}</td><td>${esc(x.entreprise)}</td><td>${esc(x.dateDebut)} → ${esc(x.dateFin)}</td><td>${nl2br(x.missions)}</td></tr>`).join("");
  return `${header(o, title)}
    <h2>1. Certification visée</h2>
    ${certifBlock(cert)}

    <h2>2. Identité du candidat</h2>
    ${candidatBlock(c)}

    <h2>3. Situation professionnelle actuelle</h2>
    <p>Statut : <strong>${esc(c.statut)}</strong><br/>
    Emploi actuel : ${esc(c.emploiActuel)}${c.employeur ? " chez " + esc(c.employeur) : ""}</p>

    <h2>4. Diplômes et titres obtenus</h2>
    <p>Niveau de formation initiale : ${esc(c.niveauFormation)}</p>
    <table><tr><th>Intitulé</th><th>Établissement</th><th>Année</th></tr>${dipl || "<tr><td colspan='3'>—</td></tr>"}</table>

    <h2>5. Expériences professionnelles</h2>
    <table><tr><th>Poste</th><th>Entreprise</th><th>Période</th><th>Missions</th></tr>${exp || "<tr><td colspan='4'>—</td></tr>"}</table>

    <h2>6. Déclaration sur l'honneur</h2>
    <p>Je soussigné(e) <strong>${esc(c.prenom)} ${esc(c.nom)}</strong> certifie sur l'honneur l'exactitude des informations portées sur le présent livret et n'avoir déposé qu'une seule demande de recevabilité pour la certification visée au cours de l'année civile en cours.</p>

    <p>Fait à ${esc(c.ville)}, le ${longDate(d.session.dateDemandeRecevabilite || d.session.dateSignature)}.</p>
    <div class="sign-block"><div class="sign-box"><strong>Signature du candidat</strong></div></div>
    ${close(o, title)}`;
}

export function getLivret2HTML(d: VAEData): string {
  const title = "Livret 2 — Description des activités et compétences";
  const { organisme: o, candidat: c, certification: cert, contents } = d;
  const blocs = contents.situationsParBloc.map(b => `
    <h3>${esc(b.codeBloc)} — ${esc(b.intitule)}</h3>
    <p>${nl2br(b.situations)}</p>
  `).join("") || cert.blocs.map(b => `<h3>${esc(b.code)} — ${esc(b.intitule)}</h3><p><em>À compléter avec le candidat.</em></p>`).join("");
  return `${header(o, title)}
    <p><strong>Candidat :</strong> ${esc(c.civilite)} ${esc(c.prenom)} ${esc(c.nom)}</p>
    <p><strong>Certification :</strong> ${esc(cert.intitule)} (RNCP ${esc(cert.rncp)})</p>
    <p><a href="${esc(cert.lien)}">${esc(cert.lien)}</a></p>

    <h2>Motivation du candidat</h2>
    <p>${nl2br(contents.motivation) || "<em>À rédiger</em>"}</p>

    <h2>Parcours professionnel</h2>
    <p>${nl2br(contents.parcours) || "<em>À rédiger</em>"}</p>

    <h2>Description des situations de travail par bloc de compétences</h2>
    ${blocs}

    <h2>Synthèse</h2>
    <p>${nl2br(contents.synthese) || "<em>À rédiger</em>"}</p>

    <p style="margin-top:30px;">Fait à ${esc(c.ville)}, le ${longDate(d.session.dateSignature)}.</p>
    <div class="sign-block"><div class="sign-box"><strong>Signature du candidat</strong></div></div>
    ${close(o, title)}`;
}

export function getProgrammeHTML(d: VAEData): string {
  const title = "Programme d'accompagnement VAE";
  const { organisme: o, certification: cert, session: s } = d;
  return `${header(o, title)}
    <h2>Certification visée</h2>
    ${certifBlock(cert)}

    <h2>Objectifs de l'accompagnement</h2>
    <ul>
      <li>Analyser le parcours et identifier les activités significatives</li>
      <li>Rédiger le Livret 2 en lien avec le référentiel de la certification</li>
      <li>Préparer l'entretien avec le jury de validation</li>
    </ul>

    <h2>Durée et modalité</h2>
    <p><strong>${esc(o.duree)}</strong> — ${esc(s.modalite)}</p>

    <h2>Séquençage pédagogique (40 h)</h2>
    <table>
      <tr><th>Phase</th><th>Contenu</th><th>Durée</th></tr>
      <tr><td>1. Positionnement</td><td>Entretien individuel, analyse du parcours</td><td>4 h</td></tr>
      <tr><td>2. Recevabilité</td><td>Aide à la constitution du Livret 1</td><td>4 h</td></tr>
      <tr><td>3. Analyse des activités</td><td>Identification des situations de travail par bloc</td><td>10 h</td></tr>
      <tr><td>4. Rédaction Livret 2</td><td>Accompagnement individualisé à la rédaction</td><td>16 h</td></tr>
      <tr><td>5. Préparation au jury</td><td>Simulations d'entretien, mise en situation</td><td>6 h</td></tr>
    </table>

    <h2>Moyens</h2>
    <p>Visioconférence (${esc(o.lienVisio)}), échanges par email, ressources documentaires France Compétences.</p>

    <h2>Modalités d'évaluation</h2>
    <p>Évaluation continue lors des séances, restitution finale du Livret 2, jury de la certification.</p>

    <h2>Accessibilité handicap</h2>
    <p>Référent : ${esc(o.referentHandicap)} — ${esc(o.email)}</p>
    ${close(o, title)}`;
}

export function getBesoinsHTML(d: VAEData): string {
  const title = "Évaluation des besoins — Candidat VAE";
  const { organisme: o, candidat: c, contents } = d;
  const b = contents.besoins;
  return `${header(o, title)}
    ${candidatBlock(c)}
    <table>
      <tr><th>Attentes</th><td>${nl2br(b.attentes)}</td></tr>
      <tr><th>Freins identifiés</th><td>${nl2br(b.freins)}</td></tr>
      <tr><th>Disponibilités</th><td>${nl2br(b.disponibilites)}</td></tr>
      <tr><th>Matériel / connexion</th><td>${nl2br(b.materiel)}</td></tr>
      <tr><th>Situation de handicap</th><td>${nl2br(b.handicap)}</td></tr>
    </table>
    <p style="margin-top:20px;">Rempli le ${longDate(d.session.dateEntretienPositionnement || d.session.dateSignature)}.</p>
    ${close(o, title)}`;
}

export function getPlanAccompagnementHTML(d: VAEData): string {
  const title = "Plan d'accompagnement personnalisé";
  const { organisme: o, candidat: c, contents } = d;
  return `${header(o, title)}
    <p><strong>Candidat :</strong> ${esc(c.prenom)} ${esc(c.nom)}</p>
    <h2>Plan d'accompagnement</h2>
    <p>${nl2br(contents.planAccompagnement) || "<em>À rédiger</em>"}</p>
    ${close(o, title)}`;
}

export function getDevisHTML(d: VAEData): string {
  const title = "Devis d'accompagnement VAE";
  const { organisme: o, candidat: c, certification: cert, session: s } = d;
  return `${header(o, title)}
    <p><strong>Client :</strong> ${esc(c.prenom)} ${esc(c.nom)} — ${esc(c.adresse)}, ${esc(c.codePostal)} ${esc(c.ville)}</p>
    <p><strong>Date :</strong> ${longDate(s.dateSignature)}</p>
    <table>
      <tr><th>Prestation</th><th>Durée</th><th>Montant TTC</th></tr>
      <tr><td>Accompagnement VAE — ${esc(cert.intitule)} (RNCP ${esc(cert.rncp)})</td><td>${esc(o.duree)}</td><td>${esc(o.prixTTC)}</td></tr>
    </table>
    <p><strong>Financement :</strong> ${esc(s.financement)}</p>
    <p>Devis valable 30 jours à compter de la date d'émission.</p>
    ${close(o, title)}`;
}

export function getAttestationEntreeHTML(d: VAEData): string {
  const title = "Attestation d'entrée en accompagnement VAE";
  const { organisme: o, candidat: c, certification: cert, session: s } = d;
  return `${header(o, title)}
    <p>Je soussigné(e) ${esc(o.dirigeant)}, représentant l'organisme <strong>${esc(o.nom)}</strong>, atteste que :</p>
    ${candidatBlock(c)}
    <p>est entré(e) en accompagnement VAE le <strong>${longDate(s.dateDebut)}</strong> en vue de l'obtention de la certification <strong>${esc(cert.intitule)}</strong> (RNCP ${esc(cert.rncp)}).</p>
    <p>Fait à ${esc(s.lieuSignature)}, le ${longDate(s.dateSignature)}.</p>
    <div class="sign-block"><div class="sign-box"><strong>${esc(o.dirigeant)}</strong></div></div>
    ${close(o, title)}`;
}

export function getLivretSuiviHTML(d: VAEData): string {
  const title = "Livret de suivi de l'accompagnement";
  const { organisme: o, candidat: c, session: s } = d;
  // 10 séances réparties entre dateDebut et dateFin, entretien intermédiaire à mi-parcours
  const rows: string[] = [];
  if (s.dateDebut && s.dateFin) {
    const d1 = new Date(s.dateDebut).getTime();
    const d2 = new Date(s.dateFin).getTime();
    const N = 10;
    for (let i = 0; i < N; i++) {
      const t = d1 + ((d2 - d1) * i) / (N - 1);
      const dt = new Date(t);
      const label = i === Math.floor(N / 2) ? "Entretien intermédiaire" : `Séance ${i + 1}`;
      rows.push(`<tr><td>${label}</td><td>${longDate(dt.toISOString().slice(0,10))}</td><td>4 h</td><td>&nbsp;</td></tr>`);
    }
  }
  return `${header(o, title)}
    <p><strong>Candidat :</strong> ${esc(c.prenom)} ${esc(c.nom)}</p>
    <table>
      <tr><th>Séance</th><th>Date</th><th>Durée</th><th>Objectifs / observations</th></tr>
      ${rows.join("") || "<tr><td colspan='4'>—</td></tr>"}
    </table>
    ${close(o, title)}`;
}

export function getFicheCertifHTML(d: VAEData): string {
  const title = "Fiche récapitulative — Certification visée";
  const { organisme: o, certification: cert } = d;
  const blocs = cert.blocs.map(b => `<tr><td>${esc(b.code)}</td><td>${esc(b.intitule)}</td></tr>`).join("");
  return `${header(o, title)}
    ${certifBlock(cert)}
    <h2>Blocs de compétences</h2>
    <table><tr><th>Code</th><th>Intitulé</th></tr>${blocs || "<tr><td colspan='2'>Voir France Compétences</td></tr>"}</table>
    ${close(o, title)}`;
}
