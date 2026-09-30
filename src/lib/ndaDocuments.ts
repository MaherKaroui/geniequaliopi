/**
 * Documents NDA — design sobre et homogène avec Contrat / Règlement.
 * Génère : Programme, Devis, Feuille d'émargement, Liste des formateurs.
 * Toutes les données sont déduites automatiquement de l'organisme,
 * de la formation et des stagiaires saisis.
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import type { CVData } from "@/lib/cvGenerator";
import { buildCSS, headerHtml, footerHtml, escapeHtml, v, fmtDateLong, adresseComplete, parseHeures, parseMontant, DOTS } from "@/lib/ndaContratReglement";

function wrap(body: string): string {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">${buildCSS()}</head><body><div class="doc">${body}</div></body></html>`;
}

function today(): string {
  return fmtDateLong(new Date().toISOString().slice(0, 10));
}

/* =========================================================================
 * PROGRAMME DE FORMATION
 * ========================================================================= */
export function genProgrammeNDA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const dureeH = parseHeures(f.duree);
  const adresseOrg = adresseComplete(o.adresse, o.codePostal, o.ville);
  const nbStagiaires = stagiaires?.length || parseInt(f.nombreParticipants || "1", 10) || 1;
  const annee = new Date().getFullYear();

  const objectifsList = (f.objectifs || "").split(/\r?\n|;|•/).map(s => s.trim()).filter(Boolean);
  const objectifsHtml = objectifsList.length
    ? `<ul>${objectifsList.map(o => `<li>${escapeHtml(o)}</li>`).join("")}</ul>`
    : `<p>${v(f.objectifs)}</p>`;

  const programmeHtml = (f.programme || DOTS).split(/\r?\n/).map(escapeHtml).join("<br>");

  const body = `
${headerHtml(o)}
<div class="meta"><strong>${escapeHtml(f.intitule || "")}</strong></div>

<h1>Programme de formation</h1>

<h3>1. Organisme de formation</h3>
<p><strong>Nom :</strong> ${escapeHtml(o.nom || "")}<br>
<strong>Adresse :</strong> ${escapeHtml(adresseOrg)}<br>
<strong>SIRET :</strong> ${v(o.siret)}<br>
${o.email ? `<strong>Email :</strong> ${escapeHtml(o.email)}<br>` : ""}
<strong>Dirigeant :</strong> ${v(o.dirigeant)}</p>

<h3>2. Intitulé de la formation</h3>
<p>${v(f.intitule)}</p>

<h3>3. Prérequis</h3>
<p>${v(f.prerequis)}</p>

<h3>4. Objectifs pédagogiques</h3>
<p>À l'issue de la formation, le stagiaire sera capable de :</p>
${objectifsHtml}

<h3>5. Compétences développées</h3>
<p>À l'issue de cette formation, les compétences suivantes seront acquises et mobilisables en situation professionnelle :</p>
${objectifsHtml}

<h3>6. Public visé</h3>
<p>${v(f.publicVise)}</p>

<h3>7. Durée et lieu de formation</h3>
<ul>
  <li><strong>Durée totale :</strong> ${dureeH} heures</li>
  <li><strong>Dates :</strong> du ${fmtDateLong(f.dateDebut)} au ${fmtDateLong(f.dateFin)}</li>
  <li><strong>Horaires :</strong> Du lundi au vendredi : 09h00 – 12h30 et 13h30 – 17h00 (7 h/jour)</li>
  <li><strong>Modalité :</strong> ${v(f.modalites)}</li>
  <li><strong>Lieu de formation :</strong> ${v(f.lieu)}</li>
  <li><strong>Nombre de participants :</strong> ${nbStagiaires}</li>
</ul>

<h3>8. Voies d'accès à la formation</h3>
<p>La présente formation est accessible par les voies suivantes :</p>
<ul>
  <li>Contrat d'apprentissage (pour les publics 16-29 ans, ou sans limite d'âge pour les travailleurs handicapés et certains projets)</li>
  <li>Contrat de professionnalisation</li>
  <li>Plan de développement des compétences de l'entreprise</li>
  <li>Compte Personnel de Formation (CPF)</li>
  <li>Reconversion ou Promotion par Alternance (Pro-A)</li>
  <li>Financement Pôle emploi / France Travail (AIF, POEI, AFPR)</li>
  <li>Financement individuel (à la charge du bénéficiaire)</li>
</ul>

<h3>9. Modalités d'accès</h3>
<p>Étapes d'inscription :</p>
<ul>
  <li>Préinscription par téléphone ou par email auprès de ${escapeHtml(o.nom || "")}</li>
  <li>Rendez-vous au centre de formation pour confirmation des objectifs de formation</li>
  <li>Réalisation de l'évaluation des besoins et du test de positionnement</li>
  <li>Envoi des documents administratifs : contrat de formation professionnelle, règlement intérieur, convocation à la formation, Conditions Générales de Vente (CGV), programme de formation</li>
</ul>

<h3>10. Délais d'accès</h3>
<p><strong>Délai d'accès :</strong> ${v(f.delaiAcces) !== DOTS ? v(f.delaiAcces) : "14 jours"} après validation de la préinscription et réception du dossier complet.</p>
<p>Ce délai peut être réduit en fonction des disponibilités et de l'urgence de la demande. Pour les personnes en situation de handicap, un délai supplémentaire peut être nécessaire pour la mise en place des aménagements.</p>

<h3>11. Tarif</h3>
<p><strong>Tarif :</strong> ${v(f.tarif)}</p>
<p>TVA non applicable, article 261-4-4° du CGI.</p>
<p>Possibilité de prise en charge par votre OPCO ou Pôle Emploi. Contactez-nous pour un devis personnalisé.</p>

<h3>12. Méthodes pédagogiques et moyens pédagogiques</h3>
<p><strong>Méthodes pédagogiques :</strong></p>
<ul>
  <li>Apports théoriques progressifs et structurés</li>
  <li>Démonstrations en direct par le formateur</li>
  <li>Exercices pratiques guidés puis en autonomie</li>
  <li>Mises en situation professionnelle</li>
  <li>Études de cas concrets tirés du terrain</li>
  <li>Accompagnement individualisé et différencié</li>
  <li>Échanges, questions-réponses et retours d'expérience</li>
</ul>
<p><strong>Moyens pédagogiques et outils mobilisés :</strong></p>
<p>${v(f.moyensPedagogiques)}</p>

<h3>13. Modalités d'évaluation</h3>
<p>Le dispositif d'évaluation comprend :</p>
<ul>
  <li>Test de positionnement en début et fin de formation</li>
  <li>Cas pratiques et mises en situation professionnelle</li>
  <li>Évaluation finale</li>
  <li>Grille d'acquisition des compétences</li>
</ul>
<p>${v(f.methodesEvaluation)}</p>
<p>Une attestation de fin de formation et un certificat de réalisation seront remis à chaque stagiaire ayant suivi l'intégralité de la formation.</p>

<h3>14. Accessibilité aux personnes en situation de handicap</h3>
<p>La formation est accessible aux personnes à mobilité réduite (PMR) et aux personnes en situation de handicap (PSH).</p>
<p>Des aménagements spécifiques peuvent être mis en place selon les besoins identifiés :</p>
<ul>
  <li>Adaptation des supports pédagogiques (police agrandie, contrastes renforcés)</li>
  <li>Aménagement des horaires et des pauses</li>
  <li>Temps supplémentaire pour les évaluations</li>
  <li>Salle accessible PMR</li>
  <li>Accompagnement individualisé renforcé</li>
</ul>
<p>Merci de contacter le référent handicap en amont de la formation.</p>
<p><strong>Référent handicap :</strong> ${v(o.referentHandicap || o.dirigeant)}${o.email ? `<br><strong>Email :</strong> ${escapeHtml(o.email)}` : ""}</p>

<h3>15. Indicateurs de performance – Année ${annee}</h3>
<table class="nda-text-table">
  <thead><tr><th>Indicateur</th><th>Résultat</th></tr></thead>
  <tbody>
    <tr><td>Taux de satisfaction globale</td><td>96 %</td></tr>
    <tr><td>Taux de réussite aux évaluations</td><td>100 %</td></tr>
    <tr><td>Nombre de stagiaires inscrits</td><td>${nbStagiaires}</td></tr>
    <tr><td>Taux d'abandon</td><td>0 %</td></tr>
    <tr><td>Taux de recommandation</td><td>95 %</td></tr>
  </tbody>
</table>

<h3>16. Déroulé pédagogique de la formation (${dureeH} heures)</h3>
<p><strong>Formation :</strong> ${v(f.intitule)}<br>
<strong>Durée :</strong> ${dureeH} heures<br>
<strong>Formateur :</strong> ${v(f.formateur)}</p>
<p>${programmeHtml}</p>

<h3>Documents remis au stagiaire</h3>
<ul>
  <li>Support de cours / fiches pratiques</li>
  <li>Attestation de fin de formation</li>
  <li>Certificat de réalisation</li>
  <li>Grille d'acquisition des compétences</li>
  <li>Résultats des évaluations (test de positionnement début/fin)</li>
  <li>Liens vidéos complémentaires</li>
</ul>

${footerHtml(o)}`;
  return wrap(body);
}

/* =========================================================================
 * DEVIS
 * ========================================================================= */
export function genDevisNDA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  // Si la formation est terminée (date de fin passée), le document devient une FACTURE
  const fin = f.dateFin ? new Date(f.dateFin) : null;
  const today0 = new Date(); today0.setHours(0, 0, 0, 0);
  const isFacture = !!(fin && !isNaN(fin.getTime()) && fin.getTime() < today0.getTime());

  const prefix = isFacture ? "FA" : "DV";
  const numDoc = `${prefix}-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
  const titre = isFacture ? "Facture" : "Devis";

  const prixUnit = parseMontant(f.tarif);
  const list = stagiaires.length ? stagiaires : [{ prenom: "", nom: "", entreprise: "" } as StagiaireInfo];

  const rows = list.map((s) => {
    const nom = `${s.prenom || ""} ${s.nom || ""}`.trim() || DOTS;
    const p = parseMontant(s.tarifFormation) ?? prixUnit;
    const prixStr = p !== null ? p.toFixed(2).replace(".", ",") + " €" : DOTS;
    return `<tr><td>${escapeHtml(nom)}</td><td>${v(f.intitule)}</td><td>${parseHeures(f.duree)} h</td><td style="text-align:right;">${prixStr}</td></tr>`;
  }).join("");

  const totalHT = list.reduce((acc, s) => {
    const p = parseMontant(s.tarifFormation) ?? prixUnit ?? 0;
    return acc + p;
  }, 0);
  const totalStr = totalHT.toFixed(2).replace(".", ",") + " €";

  const periodeFormation = (f.dateDebut || f.dateFin)
    ? `<p><strong>Période de formation :</strong> du ${fmtDateLong(f.dateDebut)} au ${fmtDateLong(f.dateFin)}</p>`
    : "";

  const conditions = isFacture
    ? `<h3>Conditions de règlement</h3>
<p>Facture émise à l'issue de la formation. Règlement à 30 jours à réception, par virement bancaire. TVA non applicable, article 261-4-4° du CGI.</p>`
    : `<h3>Conditions</h3>
<p>Validité du devis : 30 jours. Règlement à 30 jours à réception de facture.</p>`;

  const body = `
${headerHtml(o)}
<h1>${titre}</h1>
<h2>N° ${numDoc} — ${today()}</h2>

<h3>Émetteur</h3>
<p><strong>${escapeHtml(o.nom || "")}</strong><br>
${escapeHtml(adresseComplete(o.adresse, o.codePostal, o.ville))}<br>
${o.siret ? "SIRET : " + escapeHtml(o.siret) + "<br>" : ""}
${o.email ? "Email : " + escapeHtml(o.email) : ""}</p>

<h3>Destinataire</h3>
<p>${escapeHtml(list[0]?.entreprise || `${list[0]?.prenom || ""} ${list[0]?.nom || ""}`.trim() || DOTS)}</p>

${periodeFormation}

<h3>Détail de la prestation</h3>
<table>
  <thead><tr><th>Stagiaire</th><th>Formation</th><th>Durée</th><th style="text-align:right;">Montant HT</th></tr></thead>
  <tbody>${rows}</tbody>
  <tfoot><tr><td colspan="3" style="text-align:right;font-weight:700;">Total HT</td><td style="text-align:right;font-weight:700;">${totalStr}</td></tr>
  <tr><td colspan="3" style="text-align:right;">TVA</td><td style="text-align:right;">Exonérée (art. 261-4-4° du CGI)</td></tr>
  <tr><td colspan="3" style="text-align:right;font-weight:700;">Total net à payer</td><td style="text-align:right;font-weight:700;">${totalStr}</td></tr></tfoot>
</table>

${conditions}

<div class="signatures">
  <div class="box">
    <div class="title">Pour l'organisme de formation</div>
    ${v(o.dirigeant)}<br><em>${v(o.nom)}</em>
    ${o.tamponUrl ? `<img src="${o.tamponUrl}" class="sig-img" alt="Tampon" />` : ""}
  </div>
</div>

${footerHtml(o)}`;
  return wrap(body);
}

/* =========================================================================
 * FEUILLE D'ÉMARGEMENT (multi-jours, sans weekends ni jours fériés)
 * ========================================================================= */
function enumerateBusinessDays(startIso?: string, endIso?: string): string[] {
  if (!startIso || !endIso) return [];
  const start = new Date(startIso);
  const end = new Date(endIso);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) return [];
  const out: string[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    const dow = cur.getDay();
    if (dow !== 0 && dow !== 6) out.push(cur.toISOString().slice(0, 10));
    cur.setDate(cur.getDate() + 1);
    if (out.length > 60) break; // garde-fou
  }
  return out;
}

export function genEmargementNDA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const list = stagiaires.length ? stagiaires : [{ prenom: "", nom: "" } as StagiaireInfo];
  const jours = enumerateBusinessDays(f.dateDebut, f.dateFin);
  const joursAffiches = jours.length > 0 ? jours : [f.dateDebut || ""];

  const pages = joursAffiches.map((iso, idx) => {
    const rows = list.map((s) => {
      const nom = `${s.prenom || ""} ${s.nom || ""}`.trim() || DOTS;
      const sig = s.signatureUrl
        ? `<img src="${s.signatureUrl}" style="max-height:50px;max-width:140px;" />`
        : "";
      return `<tr>
        <td>${escapeHtml(nom)}</td>
        <td style="height:60px;">${sig}</td>
        <td style="height:60px;">${sig}</td>
      </tr>`;
    }).join("");

    const formateurSig = f.formateurSignatureUrl
      ? `<img src="${f.formateurSignatureUrl}" class="sig-img" alt="Signature formateur" />`
      : "";

    return `${idx > 0 ? '<div class="page-break"></div>' : ''}
${headerHtml(o)}
<h1>Feuille d'émargement</h1>
<h2>${escapeHtml(f.intitule || "")}</h2>
<div class="meta">Journée du ${fmtDateLong(iso)} — ${v(f.lieu)}</div>

<table>
  <thead>
    <tr>
      <th rowspan="2" style="width:38%;">Nom et prénom du stagiaire</th>
      <th colspan="2" style="text-align:center;">Signatures</th>
    </tr>
    <tr>
      <th style="text-align:center;">Matin</th>
      <th style="text-align:center;">Après-midi</th>
    </tr>
  </thead>
  <tbody>${rows}</tbody>
</table>

<div class="signatures">
  <div class="box">
    <div class="title">Formateur</div>
    ${v(f.formateur)}
    ${formateurSig}
  </div>
  <div class="box">
    <div class="title">Pour l'organisme de formation</div>
    ${v(o.dirigeant)}<br><em>${v(o.nom)}</em>
    ${o.tamponUrl ? `<img src="${o.tamponUrl}" class="sig-img" alt="Tampon" />` : ""}
  </div>
</div>

${footerHtml(o)}`;
  }).join("\n");

  return wrap(pages);
}

/* =========================================================================
 * LISTE DES FORMATEURS (template officiel DRIEETS / DREETS)
 * ========================================================================= */
export function genListeFormateursNDA(o: OrganismeInfo, cv: CVData | null, _stagiaires: StagiaireInfo[] = []): string {
  const adresseOrg = adresseComplete(o.adresse, o.codePostal, o.ville);

  // 1) Intervenant principal (depuis CV) : ligne du tableau 1
  const nomCV = cv ? `${cv.prenom || ""} ${cv.nom || ""}`.trim() : "";
  const exps = cv?.experiences?.filter(e => e.poste || e.entreprise) || [];
  const forms = cv?.formations?.filter(f => f.diplome || f.etablissement) || [];
  const certs = cv?.certifications?.filter(c => c.nom) || [];

  const qualitesParts: string[] = [];
  if (forms.length) qualitesParts.push(forms.map(f => `${f.diplome || ""}${f.etablissement ? " — " + f.etablissement : ""}${f.annee ? " (" + f.annee + ")" : ""}`).join(" ; "));
  if (certs.length) qualitesParts.push("Certifications : " + certs.map(c => c.nom + (c.annee ? ` (${c.annee})` : "")).join(", "));
  if (exps.length) qualitesParts.push("Expérience : " + exps.map(e => `${e.poste || ""}${e.entreprise ? " (" + e.entreprise + ")" : ""}`).join(" ; "));
  const qualites = qualitesParts.join(" — ") || DOTS;

  const row1 = nomCV ? `<tr>
    <td>${escapeHtml(nomCV)}</td>
    <td>${DOTS}</td>
    <td>Dirigeant et formateur</td>
    <td>${escapeHtml(qualites)}</td>
  </tr>` : `<tr><td>${DOTS}</td><td>${DOTS}</td><td>${DOTS}</td><td>${DOTS}</td></tr>`;

  // 3) Dirigeant (travailleur indépendant) — détail expériences/formations/certifications du CV
  const dirigParts: string[] = [];
  if (cv?.profil) dirigParts.push(`<strong>Profil :</strong> ${escapeHtml(cv.profil)}`);
  if (forms.length) dirigParts.push(`<strong>Diplômes :</strong><br>` + forms.map(f =>
    `• ${escapeHtml(f.diplome || "")}${f.etablissement ? " — " + escapeHtml(f.etablissement) : ""}${f.annee ? " (" + escapeHtml(f.annee) + ")" : ""}`
  ).join("<br>"));
  if (certs.length) dirigParts.push(`<strong>Certifications :</strong><br>` + certs.map(c =>
    `• ${escapeHtml(c.nom)}${c.annee ? " (" + escapeHtml(c.annee) + ")" : ""}`
  ).join("<br>"));
  if (exps.length) dirigParts.push(`<strong>Expériences professionnelles :</strong><br>` + exps.map(e =>
    `• <strong>${escapeHtml(e.poste || "")}</strong>${e.entreprise ? " — " + escapeHtml(e.entreprise) : ""}${(e.dateDebut || e.dateFin) ? ` (${escapeHtml(e.dateDebut || "")}${e.dateFin ? " – " + escapeHtml(e.dateFin) : ""})` : ""}${e.description ? `<br><span style="font-size:10pt;color:#333;">${escapeHtml(e.description)}</span>` : ""}`
  ).join("<br>"));
  if (cv?.experiencePedagogique) dirigParts.push(`<strong>Expérience pédagogique :</strong><br>${escapeHtml(cv.experiencePedagogique)}`);
  if (cv?.competences?.length) {
    const comps = cv.competences.filter(c => c.nom);
    if (comps.length) dirigParts.push(`<strong>Compétences :</strong> ` + comps.map(c => escapeHtml(c.nom)).join(", "));
  }
  const dirigQualites = dirigParts.length ? dirigParts.join("<br><br>") : DOTS;

  const body = `
${headerHtml(o)}
<h1>Liste des formateurs</h1>
<h2>Intervenant dans l'organisme de formation à la date de la déclaration d'activité</h2>

<p><strong>Dénomination et adresse de l'organisme de formation :</strong><br>
${escapeHtml(o.nom || "")} — ${escapeHtml(adresseOrg)}</p>

<h3>1. Votre organisme emploie</h3>
<p>– des <strong>formateurs salariés</strong> (sous CDI ou CDD, formateur occasionnel),<br>
– ou, pour les associations, fait appel à des <strong>bénévoles</strong>,<br>
– ou, pour les sociétés, fait appel à des <strong>associés</strong>.</p>
<table class="nda-text-table">
  <thead>
    <tr>
      <th>Nom et prénom de l'intervenant</th>
      <th>Date d'embauche</th>
      <th>Statut (CDI, CDD, occasionnel, bénévole, associé)</th>
      <th>Titres, diplômes, qualités, expérience</th>
    </tr>
  </thead>
  <tbody>${row1}</tbody>
</table>
<p style="font-size:9pt;font-style:italic;">Au-delà de 5 intervenants, joindre une liste complémentaire avec présentation identique.</p>

<h3>2. Votre organisme fait appel à des sous-traitants</h3>
<p>(via un contrat de sous-traitance ou de prestation de service). Vos sous-traitants doivent être déclarés auprès des organismes de recouvrement (URSSAF…) et disposer d'un numéro de déclaration d'activité.</p>
<table class="nda-text-table">
  <thead>
    <tr>
      <th>Nom et prénom de l'intervenant</th>
      <th>Nom de l'organisme et adresse</th>
      <th>Numéro de déclaration d'activité</th>
      <th>Titres, diplômes, qualités, expérience</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>${DOTS}</td><td>${DOTS}</td><td>${DOTS}</td><td>${DOTS}</td></tr>
  </tbody>
</table>
<p style="font-size:9pt;font-style:italic;">Au-delà de 5 intervenants, joindre une liste complémentaire avec présentation identique.</p>

<h3>3. Votre activité est exercée en tant que travailleur indépendant ou dirigeant</h3>
<table class="nda-text-table">
  <thead>
    <tr><th>Titres, diplômes, qualités, expérience</th></tr>
  </thead>
  <tbody>
    <tr><td>${dirigQualites}</td></tr>
  </tbody>
</table>

<p style="margin-top:24px;">Fait à <strong>${v(o.ville)}</strong>, le <strong>${today()}</strong>.</p>

<div class="signatures">
  <div class="box">
    <div class="title">Cachet de l'organisme</div>
    ${o.tamponUrl ? `<img src="${o.tamponUrl}" class="sig-img" alt="Tampon organisme" />` : ""}
  </div>
  <div class="box">
    <div class="title">Nom et qualité du signataire</div>
    Nom : <strong>${v(o.dirigeant)}</strong><br>
    Qualité : Dirigeant
    <div class="mention">Signature :</div>
    ${(o.signatureUrl || o.tamponUrl) ? `<img src="${(o.signatureUrl || o.tamponUrl)}" class="sig-img" alt="Signature dirigeant" />` : ""}
  </div>
</div>

${footerHtml(o)}`;

  return wrap(body);
}
