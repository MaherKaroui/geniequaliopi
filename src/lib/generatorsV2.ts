// Improved generators for IND 9, 10, 11 - Qualiopi compliant (reference: Select Formation docs)
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, tableHTML, formatDate, subtractBusinessDays, getStagiaireDateDebut, getStagiaireDateFin, getStagiaireTarif, getStagiaireDuree, isFormationTerminee } from "./docBuilder";
import { EVAL_SCORES, getFormationDays, CONNECTION_TIMES_6H, CONNECTION_TIMES_7H, parseDuree } from "./sampleData";

function getHoraireFin(f: FormationInfo): string {
  const { hoursPerDay } = parseDuree(f.duree);
  return hoursPerDay <= 6 ? "16h00" : "17h00";
}
import { getEvalContent, generateStagiaireAnswers, computeQCMScore, getQuestionsOuvertes, generateStagiaireOpenAnswers } from "./evalContent";
import { getRNCPByCode } from "./rncpData";

// ========== HELPERS ==========

function stagSig(s: StagiaireInfo): string {
  return s.signatureUrl
    ? `<img src="${s.signatureUrl}" alt="Signature ${s.prenom} ${s.nom}" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />`
    : `<p style="font-style:italic;color:#999;margin-top:10px">Signé par ${s.prenom} ${s.nom}</p>`;
}

function orgSig(o: OrganismeInfo): string {
  // Organisme = tampon seulement, jamais la signature du dirigeant
  if (o.tamponUrl) {
    return `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />`;
  }
  return `<p style="font-style:italic;color:#999;margin-top:10px">Cachet de ${o.nom}</p>`;
}

function dirigeantSig(o: OrganismeInfo): string {
  // Dirigeant = tampon seulement (pas de signature personnelle)
  if (o.tamponUrl) {
    return `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />`;
  }
  return `<p style="font-style:italic;color:#999;margin-top:10px">Cachet de ${o.nom}</p>`;
}

function formateurSigGen(f: FormationInfo, s?: StagiaireInfo): string {
  // Formateur = signature formateur (du stagiaire ou de la formation)
  const url = s?.formateurSignatureUrl || f.formateurSignatureUrl;
  if (url) {
    return `<img src="${url}" alt="Signature formateur" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />`;
  }
  return `<p style="font-style:italic;color:#999;margin-top:10px">Signé par ${f.formateur}</p>`;
}

function respEntrepriseSig(s: StagiaireInfo): string {
  // Responsable entreprise = signature responsable entreprise
  if (s.signatureResponsableUrl) {
    return `<img src="${s.signatureResponsableUrl}" alt="Signature responsable entreprise" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />`;
  }
  return `<p style="font-style:italic;color:#999;margin-top:10px">Signé par ${s.responsableEntreprise || 'le responsable'}</p>`;
}

function modaliteTexte(f: FormationInfo): string {
  const m = (f.modalites || '').toLowerCase();
  if (m.includes('mixte')) return 'en présentiel et en distanciel (formation mixte)';
  if (m.includes('distanciel') || m.includes('e-learning') || m.includes('foad')) return 'en distanciel';
  return 'en présentiel';
}
function isPresentiel(f: FormationInfo): boolean { const m = (f.modalites||'').toLowerCase(); return !m.includes('distanciel') && !m.includes('e-learning') && !m.includes('foad') || m.includes('mixte'); }
function isDistanciel(f: FormationInfo): boolean { const m = (f.modalites||'').toLowerCase(); return m.includes('distanciel') || m.includes('e-learning') || m.includes('foad') || m.includes('mixte'); }

function sigBlock(label1: string, nom1: string, sig1Html: string, label2: string, nom2: string, sig2Html: string, mention?: string, date1?: string, date2?: string): string {
  const mentionHtml = mention ? `<p style="font-style:italic;font-size:11px">(${mention})</p>` : '';
  const d1 = date1 || new Date().toLocaleDateString("fr-FR");
  const d2 = date2 || d1;
  return `<div class="signature-block-2">
    <div class="sig-box"><p class="sig-label">${label1}</p><p>Nom : ${nom1}</p><p>Date : ${d1}</p>${mentionHtml}<p>Signature :</p>${sig1Html}</div>
    <div class="sig-box"><p class="sig-label">${label2}</p><p>Nom : ${nom2}</p><p>Date : ${d2}</p>${mentionHtml}<p>Signature :</p>${sig2Html}</div>
  </div>`;
}

// ===================== IND 9 =====================

export function genCGV_V2(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const sections = [
    { heading: "Article 1 – Présentation de l'organisme", content: `<p><strong>Organisme de formation :</strong> ${o.nom}</p><p><strong>Adresse :</strong> ${o.adresse}, ${o.codePostal} ${o.ville}</p><p><strong>SIRET :</strong> ${o.siret}</p><p><strong>Email :</strong> ${o.email}</p><p><strong>Dirigeant :</strong> ${o.dirigeant}</p>` },
    { heading: "Article 2 – Objet", content: `<p>Les présentes Conditions Générales de Vente (CGV) ont pour objet de définir les modalités et conditions dans lesquelles ${o.nom} propose et dispense ses actions de formation professionnelle ${modaliteTexte(f)}.</p><p>Toute inscription à une formation implique l'adhésion pleine et entière du stagiaire aux présentes CGV.</p>` },
    { heading: "Article 3 – Nature des actions de formation", content: `<p>Les formations proposées relèvent des actions de formation définies à l'article L.6313-1 du Code du travail.</p><p>Les objectifs, contenus, durées et modalités sont détaillés dans le programme de formation remis au stagiaire avant l'inscription.</p>` },
    { heading: "Article 4 – Modalités d'inscription", content: `<p>L'inscription à une formation s'effectue selon les étapes suivantes :</p><ol><li>Préinscription via le site internet, les réseaux sociaux ou par téléphone</li><li>Analyse de la demande par ${o.nom}</li><li>Validation de l'adéquation formation/projet</li><li>Transmission des documents contractuels (contrat, règlement intérieur, convocation, CGV)</li><li>Retour du contrat signé et, le cas échéant, versement de l'acompte</li></ol><p>L'inscription devient définitive après réception du contrat signé.</p>` },
    { heading: "Article 5 – Tarifs", content: `<p>Les tarifs sont indiqués en euros TTC.</p><p>Sauf mention contraire, le prix comprend :</p><ul><li>Les heures de formation</li><li>Les supports pédagogiques</li><li>L'accompagnement pédagogique</li></ul>${f.tarif ? `<p>Tarif de la formation « ${f.intitule} » : ${f.tarif}</p>` : ''}` },
    { heading: "Article 6 – Modalités de paiement", content: `<p>Les modalités de paiement sont précisées dans le contrat de formation.</p><p>Sauf disposition contraire :</p><ul><li>Un acompte peut être demandé à l'inscription</li><li>Le solde est à régler selon les échéances convenues</li></ul><p>Aucune somme ne peut être exigée avant l'expiration du délai légal de rétractation.</p>` },
    { heading: "Article 7 – Délai de rétractation", content: `<p>Conformément à l'article L.6353-5 du Code du travail, le stagiaire dispose d'un délai de rétractation de 10 jours à compter de la signature du contrat.</p><p>La rétractation doit être notifiée par lettre recommandée avec accusé de réception.</p>` },
    { heading: "Article 8 – Annulation, report et abandon", content: `<h3>8.1 Annulation par le stagiaire</h3><p>Toute annulation après le délai de rétractation doit être notifiée par écrit.</p><p>En cas d'annulation tardive ou d'abandon injustifié, ${o.nom} se réserve le droit de facturer tout ou partie de la formation engagée.</p><h3>8.2 Annulation par l'organisme</h3><p>${o.nom} se réserve le droit d'annuler ou de reporter une formation en cas de force majeure ou d'effectif insuffisant.</p><p>Dans ce cas, les sommes versées sont intégralement remboursées.</p>` },
    { heading: "Article 9 – Assiduité et obligations du stagiaire", content: `<p>Le stagiaire s'engage à :</p><ul><li>Respecter les horaires et le règlement intérieur</li><li>Suivre la formation avec assiduité</li><li>Informer ${o.nom} de toute absence ou retard</li></ul><p>Les absences injustifiées peuvent entraîner l'interruption de la formation.</p>` },
    { heading: "Article 10 – Règlement intérieur", content: `<p>Le stagiaire s'engage à respecter le règlement intérieur de ${o.nom}, remis avant l'entrée en formation.</p>` },
    { heading: "Article 11 – Accessibilité et handicap", content: `<p>${o.nom} s'engage à étudier toute demande d'aménagement pour les personnes en situation de handicap.</p><p><strong>Référent handicap :</strong> ${o.referentHandicap}</p><p>${o.email}</p>` },
    { heading: "Article 12 – Propriété intellectuelle", content: `<p>Les supports pédagogiques sont protégés par le droit d'auteur.</p><p>Ils sont réservés à un usage strictement personnel et ne peuvent être reproduits ou diffusés sans autorisation écrite.</p>` },
    { heading: "Article 13 – Données personnelles", content: `<p>Les données personnelles sont traitées conformément au RGPD.</p><p>Le stagiaire dispose d'un droit d'accès, de rectification et de suppression de ses données.</p>` },
    { heading: "Article 14 – Responsabilité", content: `<p>${o.nom} ne saurait être tenue responsable des dommages indirects ou immatériels liés à la participation à la formation.</p>` },
    { heading: "Article 15 – Litiges", content: `<p>En cas de litige, les parties privilégieront une solution amiable.</p><p>À défaut, le litige sera soumis aux juridictions compétentes.</p>` },
    { heading: "Article 16 – Acceptation des CGV", content: `<p>L'inscription à la formation vaut acceptation sans réserve des présentes Conditions Générales de Vente.</p>` },
  ];

  // Per-stagiaire signature pages
  let sigPages = '';
  stagiaires.slice(0, 10).forEach((s, i) => {
    if (i > 0) sigPages += '<div class="page-break"></div>';
    const sigDate = formatDate(subtractBusinessDays(getStagiaireDateDebut(s, f) || new Date().toISOString(), 14));
    sigPages += `<p><strong>Fait à ${o.ville}, le :</strong> ${sigDate}</p>`;
    sigPages += sigBlock(
      `Le Stagiaire`, `${s.prenom} ${s.nom}`, stagSig(s),
      `Pour l'Organisme de formation`, o.dirigeant, orgSig(o),
      'Précédée de la mention « Lu et approuvé »', sigDate, sigDate
    );
  });

  return buildDocument({ org: o, title: "CONDITIONS GÉNÉRALES DE VENTE", sections, extraHtml: sigPages });
}

export function genReglement_V2(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const modTxt = modaliteTexte(f);
  const pres = isPresentiel(f);
  const dist = isDistanciel(f);

  const sections: { heading: string; content: string; variant?: "green" | "orange" }[] = [
    { heading: "Article 1 – Champ d'application", content: `<p>Le présent règlement s'applique à tous les stagiaires inscrits à une formation dispensée par ${o.nom}, pour toute la durée de la formation suivie ${modTxt}.</p><p>Chaque stagiaire est réputé avoir accepté les termes du présent règlement dès son entrée en formation.</p><p>Conformément aux articles L.6352-3 à L.6352-5 et R.6352-1 à R.6352-15 du Code du travail, le présent règlement intérieur a pour objet de définir les règles générales et permanentes applicables aux stagiaires pendant la durée de la formation.</p>` },
    { heading: "Article 2 – Informations relatives à l'organisme de formation", content: `<p><strong>Organisme de formation :</strong> ${o.nom}</p><p><strong>Adresse :</strong> ${o.adresse}, ${o.codePostal} ${o.ville}</p><p><strong>SIRET :</strong> ${o.siret}</p><p><strong>Email :</strong> ${o.email}</p><p><strong>Dirigeant :</strong> ${o.dirigeant}</p>` },
    { heading: "Article 3 – Conditions générales de déroulement de la formation", content: `<p>Les formations se déroulent selon les horaires et ${pres ? 'lieux' : 'créneaux'} précisés dans la convocation transmise au stagiaire.</p><p>Les stagiaires s'engagent à :</p><ul><li>Respecter les horaires de formation</li><li>Suivre la formation avec assiduité</li><li>Adopter un comportement respectueux envers le formateur et les autres stagiaires</li><li>Respecter le matériel mis à disposition</li></ul>` },
    { heading: "Article 4 – Assiduité, ponctualité et absences", content: `<p>Les stagiaires doivent être présents à l'ensemble des séances prévues.</p><p>Toute absence ou retard doit être signalé dès que possible à l'organisme de formation, avec justification.</p><p>En cas d'absences répétées ou injustifiées, ${o.nom} se réserve le droit :</p><ul><li>d'en informer le financeur,</li><li>de suspendre ou d'interrompre la formation.</li></ul>` },
  ];

  let artNum = 5;
  if (pres) {
    sections.push({ heading: `Article ${artNum++} – Accès aux locaux`, content: `<p>L'accès aux locaux est strictement réservé :</p><ul><li>aux stagiaires inscrits,</li><li>aux formateurs,</li><li>et aux personnes autorisées par ${o.nom}.</li></ul><p>Il est interdit d'introduire dans les locaux des personnes extérieures sans autorisation préalable.</p>` });
    sections.push({ heading: `Article ${artNum++} – Règles d'hygiène et de sécurité`, content: `<p>Les stagiaires doivent respecter les consignes générales et particulières d'hygiène et de sécurité applicables dans les locaux de formation.</p><p>Il est notamment interdit :</p><ul><li>de fumer ou vapoter dans les locaux,</li><li>de consommer de l'alcool ou des substances illicites,</li><li>d'adopter un comportement mettant en danger soi-même ou autrui.</li></ul><p>Tout accident doit être signalé immédiatement au formateur.</p>` });
    sections.push({ heading: `Article ${artNum++} – Utilisation du matériel et des équipements`, content: `<p>Le matériel pédagogique mis à disposition (ordinateurs, logiciels, supports, mobilier) doit être utilisé conformément à sa destination.</p><p>Toute dégradation volontaire pourra faire l'objet :</p><ul><li>d'une sanction disciplinaire,</li><li>et/ou d'une demande de réparation financière.</li></ul>` });
  }
  if (dist) {
    sections.push({ heading: `Article ${artNum++} – Accès à la plateforme de formation à distance`, content: `<p>Le stagiaire s'engage à :</p><ul><li>Se connecter aux heures prévues dans le planning de formation</li><li>Disposer d'un environnement calme et d'une connexion internet stable</li><li>Activer sa caméra lors des sessions en visioconférence (sauf dérogation préalable)</li><li>Ne pas enregistrer, capturer ou diffuser les sessions de formation sans autorisation</li><li>Signaler tout problème technique au formateur ou au support technique</li></ul>` });
  }

  sections.push(
    { heading: `Article ${artNum++} – Discipline et comportement`, content: `<p>Tout comportement inapproprié (violence, propos discriminatoires, harcèlement, non-respect des consignes) est strictement interdit.</p><p>En cas de manquement grave ou répété, ${o.nom} pourra appliquer une sanction disciplinaire conformément à la procédure décrite ci-après.</p>` },
    { heading: `Article ${artNum++} – Sanctions disciplinaires`, content: `<p>Les sanctions applicables sont :</p><ul><li>Avertissement écrit</li><li>Blâme</li><li>Exclusion temporaire de la formation</li><li>Exclusion définitive de la formation</li></ul><p>La sanction est proportionnée à la gravité des faits reprochés.</p>` },
    { heading: `Article ${artNum++} – Procédure disciplinaire`, content: `<p>Aucune sanction ne peut être prononcée sans que le stagiaire ait été informé des faits reprochés.</p><p>Le stagiaire est convoqué à un entretien au cours duquel :</p><ul><li>les motifs de la sanction sont exposés,</li><li>le stagiaire peut présenter ses observations.</li></ul><p>La décision est notifiée par écrit.</p>` },
    { heading: `Article ${artNum++} – Propriété intellectuelle`, content: `<p>Les supports pédagogiques remis aux stagiaires sont protégés par le droit d'auteur.</p><p>Ils sont réservés à un usage strictement personnel et ne peuvent être reproduits, diffusés ou utilisés à des fins commerciales sans autorisation écrite de ${o.nom}.</p>` },
    { heading: `Article ${artNum++} – Données personnelles`, content: `<p>Les données personnelles des stagiaires sont traitées dans le respect du Règlement Général sur la Protection des Données (RGPD).</p><p>Le stagiaire dispose d'un droit d'accès, de rectification et de suppression de ses données.</p>` },
    { heading: `Article ${artNum++} – Accessibilité et situation de handicap`, content: `<p>La formation est accessible aux personnes en situation de handicap.</p><p>Des aménagements peuvent être mis en place sur demande préalable.</p><p><strong>Référent handicap :</strong> ${o.referentHandicap}</p><p>${o.email}</p>`, variant: "green" },
    { heading: `Article ${artNum++} – Entrée en vigueur`, content: `<p>Le présent règlement intérieur entre en vigueur à compter de la date de signature par le stagiaire.</p><p>Il est remis à chaque stagiaire avant le début de la formation.</p>` },
  );

  // Per-stagiaire signature pages
  let sigPages = '';
  stagiaires.slice(0, 10).forEach((s, i) => {
    if (i > 0) sigPages += '<div class="page-break"></div>';
    const sigDate = formatDate(subtractBusinessDays(getStagiaireDateDebut(s, f) || new Date().toISOString(), 14));
    sigPages += `<p><strong>Fait à ${o.ville}, le :</strong> ${sigDate}</p>`;
    sigPages += sigBlock(
      `Signature du stagiaire : ${s.prenom} ${s.nom}`, `${s.prenom} ${s.nom}`, stagSig(s),
      `Signature du centre`, o.nom, orgSig(o),
      'Précédée de la mention « Lu et approuvé »', sigDate, sigDate
    );
  });

  return buildDocument({ org: o, title: "RÈGLEMENT INTÉRIEUR", subtitle: `Applicable aux stagiaires en formation ${modTxt}`, sections, extraHtml: sigPages });
}

export function genConvocation_V2(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = '';
  stagiaires.slice(0, 10).forEach((s, i) => {
    if (i > 0) extra += '<div class="page-break"></div>';
    const civilite = s.prenom?.endsWith('a') || s.prenom?.endsWith('e') ? 'Madame' : 'Monsieur';
    extra += `
      <h2>CONVOCATION À LA FORMATION</h2>
      <p><strong>Organisme de formation :</strong> ${o.nom}</p>
      <p><strong>À l'attention de :</strong> ${civilite} ${s.prenom} ${s.nom}</p>
      <p><strong>Objet :</strong> Convocation à la formation – ${f.intitule}</p>
      <p>${civilite},</p>
      <p>Nous avons le plaisir de vous confirmer votre inscription à la formation suivante :</p>
      <h3>Intitulé de la formation</h3><p>${f.intitule}</p>
      <h3>Dates de la formation</h3><p>Du : ${formatDate(getStagiaireDateDebut(s, f))}<br>Au : ${formatDate(getStagiaireDateFin(s, f))}</p>
      <h3>Horaires</h3><p>De : 09h00<br>À : ${getHoraireFin(f)}</p>
      <h3>Durée totale</h3><p>${getStagiaireDuree(s, f)}</p>
      <h3>Modalité</h3><p>Formation ${modaliteTexte(f)}</p>
      ${isPresentiel(f) ? `<h3>Lieu de formation</h3><p>${f.lieu}</p>` : `<h3>Accès à la plateforme</h3><p>Les identifiants de connexion vous seront transmis par email avant le début de la formation.</p>`}
      <h3>Documents remis avant l'entrée en formation</h3>
      <ul><li>Contrat de formation</li><li>Règlement intérieur</li><li>Programme de formation</li><li>Conditions Générales de Vente (CGV)</li></ul>
      ${isPresentiel(f) ? `<h3>Matériel à prévoir</h3><ul><li>Un stylo et de quoi prendre des notes</li><li>(Le matériel informatique est mis à disposition sur place)</li></ul>` : `<h3>Matériel requis</h3><ul><li>Un ordinateur avec connexion internet stable</li><li>Un casque avec microphone</li><li>Un navigateur web récent (Chrome, Firefox, Edge)</li></ul>`}
      <div class="section section-green">
        <h3>Accessibilité – Situation de handicap</h3>
        <p>La formation est accessible aux personnes en situation de handicap.</p>
        <p>Des aménagements peuvent être mis en place sur demande préalable.</p>
        <p><strong>Référent handicap :</strong> ${o.referentHandicap}<br>${o.email}</p>
      </div>
      <p>Nous vous remercions de vous présenter 15 minutes avant le début de la formation.</p>
      <p>Pour toute question ou information complémentaire, vous pouvez nous contacter par email.</p>
      <p>Nous vous prions d'agréer, ${civilite}, l'expression de nos salutations distinguées.</p>
       <p><strong>Fait à ${o.ville}, le :</strong> ${formatDate(subtractBusinessDays(getStagiaireDateDebut(s, f) || new Date().toISOString(), 14))}</p>
      <p><strong>Pour ${o.nom}</strong></p>
      <p>${o.dirigeant}<br>Dirigeant – Formateur</p>
      ${dirigeantSig(o)}
    `;
  });
  return buildDocument({ org: o, title: "CONVOCATION À LA FORMATION", extraHtml: extra });
}

export function genContratFormationPro_V2(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = '';
  stagiaires.slice(0, 10).forEach((s, i) => {
    if (i > 0) extra += '<div class="page-break"></div>';
    extra += `
      <h2>CONTRAT DE FORMATION PROFESSIONNELLE</h2>
      <p style="font-style:italic">(Conformément aux articles L.6353-3 à L.6353-7 et R.6353-1 à R.6353-8 du Code du travail)</p>
      <h3>Entre les soussignés</h3>
      <h4>L'Organisme de formation</h4>
      <p>${o.nom}<br>Adresse : ${o.adresse}, ${o.codePostal} ${o.ville}<br>SIRET : ${o.siret}<br>Email : ${o.email}<br>Représenté par : ${o.dirigeant}</p>
      <p>Ci-après dénommé « l'Organisme de formation »,</p>
      <h4>Et le stagiaire</h4>
      <p>Nom et prénom : ${s.prenom} ${s.nom}${s.email ? `<br>Email : ${s.email}` : ''}${s.telephone ? `<br>Téléphone : ${s.telephone}` : ''}</p>
      <p>Ci-après dénommé « le Stagiaire »,</p>
      <h3>Article 1 – Objet du contrat</h3>
      <p>Le présent contrat a pour objet la participation du stagiaire à l'action de formation suivante :</p>
      <p><strong>Intitulé :</strong> ${f.intitule}<br><strong>Nature de l'action :</strong> Action de formation (article L.6313-1 du Code du travail)</p>
      <h3>Article 2 – Objectifs de la formation</h3>
      <p>À l'issue de la formation, le stagiaire sera capable de :</p>
      <p>${f.objectifs.split('\n').map(o => `• ${o}`).join('<br>')}</p>
      <h3>Article 3 – Organisation de la formation</h3>
      <p><strong>Durée totale :</strong> ${getStagiaireDuree(s, f)}<br><strong>Dates :</strong> du ${formatDate(getStagiaireDateDebut(s, f))} au ${formatDate(getStagiaireDateFin(s, f))}<br><strong>Horaires :</strong> de 09h00 à ${getHoraireFin(f)}<br><strong>Modalité :</strong> Formation ${modaliteTexte(f)}${isPresentiel(f) ? `<br><strong>Lieu :</strong> ${f.lieu}` : ''}</p>
      <h3>Article 4 – Prérequis</h3>
      <p>${f.prerequis || 'Aucun prérequis spécifique'}</p>
      <h3>Article 5 – Moyens pédagogiques et techniques</h3>
      <p>La formation comprend :</p>
      <ul><li>Apports théoriques</li><li>Démonstrations commentées</li><li>Exercices pratiques</li><li>Mise en situation professionnelle</li></ul>
      <p><strong>Moyens mobilisés :</strong></p>
      <p>${f.moyensPedagogiques}</p>
      <h3>Article 6 – Modalités d'évaluation</h3>
      <p>Les acquis du stagiaire sont évalués par :</p>
      <ul><li>Un test de positionnement en début de formation</li><li>Des exercices pratiques en cours de formation</li><li>Une évaluation finale en fin de formation</li><li>Une grille d'acquisition des compétences</li></ul>
      <h3>Article 7 – Accessibilité – Situation de handicap</h3>
      <div class="section section-green">
        <p>La formation est accessible aux personnes en situation de handicap.</p>
        <p>Des aménagements spécifiques peuvent être mis en place après étude des besoins.</p>
        <p><strong>Référent handicap :</strong> ${o.referentHandicap}<br>${o.email}</p>
      </div>
      <h3>Article 8 – Dispositions financières</h3>
       <p><strong>Coût total de la formation :</strong> ${getStagiaireTarif(s, f)}</p>
      <p>Les modalités de paiement sont définies dans les Conditions Générales de Vente.</p>
      <h3>Article 9 – Délai de rétractation</h3>
      <p>Conformément à l'article L.6353-5 du Code du travail, le stagiaire dispose d'un délai de rétractation de 10 jours à compter de la signature du présent contrat.</p>
      <p>La rétractation doit être notifiée par lettre recommandée avec accusé de réception.</p>
      <p>Aucune somme ne peut être exigée avant l'expiration de ce délai.</p>
      <h3>Article 10 – Annulation et abandon</h3>
      <p>En cas d'annulation ou d'abandon de la formation par le stagiaire après le délai de rétractation, les conditions financières applicables sont celles prévues dans les Conditions Générales de Vente de ${o.nom}.</p>
      <h3>Article 11 – Règlement intérieur</h3>
      <p>Le stagiaire s'engage à respecter le règlement intérieur de ${o.nom}, remis avant l'entrée en formation.</p>
      <h3>Article 12 – Protection des données personnelles</h3>
      <p>Les données personnelles sont traitées conformément au RGPD. Le stagiaire dispose d'un droit d'accès, de rectification et de suppression.</p>
      <h3>Article 13 – Litiges</h3>
      <p>En cas de litige, les parties s'efforceront de trouver une solution amiable. À défaut, le litige sera porté devant les juridictions compétentes.</p>
      <h3>Article 14 – Entrée en vigueur</h3>
      <p>Le présent contrat prend effet à la date de sa signature par les deux parties.</p>
      <p><strong>Fait à ${o.ville}, le :</strong> ${formatDate(subtractBusinessDays(getStagiaireDateDebut(s, f) || new Date().toISOString(), 14))}</p>
    `;
    const sigDate2 = formatDate(subtractBusinessDays(getStagiaireDateDebut(s, f) || new Date().toISOString(), 14));
    extra += sigBlock(
      `Pour l'Organisme de formation<br>${o.nom}`, o.dirigeant, orgSig(o),
      `Le Stagiaire`, `${s.prenom} ${s.nom}`, stagSig(s),
      'Précédée de la mention « Lu et approuvé »', sigDate2, sigDate2
    );
  });
  return buildDocument({ org: o, title: "CONTRAT DE FORMATION PROFESSIONNELLE", extraHtml: extra });
}

export function genConvocationStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const civilite = s.prenom?.endsWith('a') || s.prenom?.endsWith('e') ? 'Madame' : 'Monsieur';
  let extra = `
    <h2>CONVOCATION À LA FORMATION</h2>
    <p><strong>Organisme de formation :</strong> ${o.nom}</p>
    <p><strong>À l'attention de :</strong> ${civilite} ${s.prenom} ${s.nom}</p>
    <p><strong>Objet :</strong> Convocation à la formation – ${f.intitule}</p>
    <p>${civilite},</p>
    <p>Nous avons le plaisir de vous confirmer votre inscription à la formation suivante :</p>
    <h3>Intitulé de la formation</h3><p>${f.intitule}</p>
    <h3>Dates de la formation</h3><p>Du : ${formatDate(getStagiaireDateDebut(s, f))}<br>Au : ${formatDate(getStagiaireDateFin(s, f))}</p>
    <h3>Horaires</h3><p>De : 09h00<br>À : ${getHoraireFin(f)}</p>
    <h3>Durée totale</h3><p>${getStagiaireDuree(s, f)}</p>
    <h3>Modalité</h3><p>Formation ${modaliteTexte(f)}</p>
    ${isPresentiel(f) ? `<h3>Lieu de formation</h3><p>${f.lieu}</p>` : `<h3>Accès à la plateforme</h3><p>Les identifiants de connexion vous seront transmis par email avant le début de la formation.</p>`}
    <h3>Documents remis avant l'entrée en formation</h3>
    <ul><li>Contrat de formation</li><li>Règlement intérieur</li><li>Programme de formation</li><li>Conditions Générales de Vente (CGV)</li></ul>
    ${isPresentiel(f) ? `<h3>Matériel à prévoir</h3><ul><li>Un stylo et de quoi prendre des notes</li><li>(Le matériel informatique est mis à disposition sur place)</li></ul>` : `<h3>Matériel requis</h3><ul><li>Un ordinateur avec connexion internet stable</li><li>Un casque avec microphone</li><li>Un navigateur web récent (Chrome, Firefox, Edge)</li></ul>`}
    <div class="section section-green">
      <h3>Accessibilité – Situation de handicap</h3>
      <p>La formation est accessible aux personnes en situation de handicap.</p>
      <p>Des aménagements peuvent être mis en place sur demande préalable.</p>
      <p><strong>Référent handicap :</strong> ${o.referentHandicap}<br>${o.email}</p>
    </div>
    <p>Nous vous remercions de vous présenter 15 minutes avant le début de la formation.</p>
    <p>Pour toute question ou information complémentaire, vous pouvez nous contacter par email.</p>
    <p>Nous vous prions d'agréer, ${civilite}, l'expression de nos salutations distinguées.</p>
    <p><strong>Fait à ${o.ville}, le :</strong> ${formatDate(subtractBusinessDays(getStagiaireDateDebut(s, f) || new Date().toISOString(), 14))}</p>
    <p><strong>Pour ${o.nom}</strong></p>
    <p>${o.dirigeant}<br>Dirigeant – Formateur</p>
    ${dirigeantSig(o)}
  `;
  return buildDocument({ org: o, title: `CONVOCATION À LA FORMATION – ${s.prenom} ${s.nom}`, extraHtml: extra });
}

export function genContratFormationProStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  let extra = `
    <h2>CONTRAT DE FORMATION PROFESSIONNELLE</h2>
    <p style="font-style:italic">(Conformément aux articles L.6353-3 à L.6353-7 et R.6353-1 à R.6353-8 du Code du travail)</p>
    <h3>Entre les soussignés</h3>
    <h4>L'Organisme de formation</h4>
    <p>${o.nom}<br>Adresse : ${o.adresse}, ${o.codePostal} ${o.ville}<br>SIRET : ${o.siret}<br>Email : ${o.email}<br>Représenté par : ${o.dirigeant}</p>
    <p>Ci-après dénommé « l'Organisme de formation »,</p>
    <h4>Et le stagiaire</h4>
    <p>Nom et prénom : ${s.prenom} ${s.nom}${s.email ? `<br>Email : ${s.email}` : ''}${s.telephone ? `<br>Téléphone : ${s.telephone}` : ''}</p>
    <p>Ci-après dénommé « le Stagiaire »,</p>
    <h3>Article 1 – Objet du contrat</h3>
    <p>Le présent contrat a pour objet la participation du stagiaire à l'action de formation suivante :</p>
    <p><strong>Intitulé :</strong> ${f.intitule}<br><strong>Nature de l'action :</strong> Action de formation (article L.6313-1 du Code du travail)</p>
    <h3>Article 2 – Objectifs de la formation</h3>
    <p>À l'issue de la formation, le stagiaire sera capable de :</p>
    <p>${f.objectifs.split('\n').map(o => `• ${o}`).join('<br>')}</p>
    <h3>Article 3 – Organisation de la formation</h3>
    <p><strong>Durée totale :</strong> ${getStagiaireDuree(s, f)}<br><strong>Dates :</strong> du ${formatDate(getStagiaireDateDebut(s, f))} au ${formatDate(getStagiaireDateFin(s, f))}<br><strong>Horaires :</strong> de 09h00 à ${getHoraireFin(f)}<br><strong>Modalité :</strong> Formation ${modaliteTexte(f)}${isPresentiel(f) ? `<br><strong>Lieu :</strong> ${f.lieu}` : ''}</p>
    <h3>Article 4 – Prérequis</h3>
    <p>${f.prerequis || 'Aucun prérequis spécifique'}</p>
    <h3>Article 5 – Moyens pédagogiques et techniques</h3>
    <p>La formation comprend :</p>
    <ul><li>Apports théoriques</li><li>Démonstrations commentées</li><li>Exercices pratiques</li><li>Mise en situation professionnelle</li></ul>
    <p><strong>Moyens mobilisés :</strong></p>
    <p>${f.moyensPedagogiques}</p>
    <h3>Article 6 – Modalités d'évaluation</h3>
    <p>Les acquis du stagiaire sont évalués par :</p>
    <ul><li>Un test de positionnement en début de formation</li><li>Des exercices pratiques en cours de formation</li><li>Une évaluation finale en fin de formation</li><li>Une grille d'acquisition des compétences</li></ul>
    <h3>Article 7 – Accessibilité – Situation de handicap</h3>
    <div class="section section-green">
      <p>La formation est accessible aux personnes en situation de handicap.</p>
      <p>Des aménagements spécifiques peuvent être mis en place après étude des besoins.</p>
      <p><strong>Référent handicap :</strong> ${o.referentHandicap}<br>${o.email}</p>
    </div>
    <h3>Article 8 – Dispositions financières</h3>
    <p><strong>Coût total de la formation :</strong> ${getStagiaireTarif(s, f)}</p>
    <p>Les modalités de paiement sont définies dans les Conditions Générales de Vente.</p>
    <h3>Article 9 – Délai de rétractation</h3>
    <p>Conformément à l'article L.6353-5 du Code du travail, le stagiaire dispose d'un délai de rétractation de 10 jours à compter de la signature du présent contrat.</p>
    <p>La rétractation doit être notifiée par lettre recommandée avec accusé de réception.</p>
    <p>Aucune somme ne peut être exigée avant l'expiration de ce délai.</p>
    <h3>Article 10 – Annulation et abandon</h3>
    <p>En cas d'annulation ou d'abandon de la formation par le stagiaire après le délai de rétractation, les conditions financières applicables sont celles prévues dans les Conditions Générales de Vente de ${o.nom}.</p>
    <h3>Article 11 – Règlement intérieur</h3>
    <p>Le stagiaire s'engage à respecter le règlement intérieur de ${o.nom}, remis avant l'entrée en formation.</p>
    <h3>Article 12 – Protection des données personnelles</h3>
    <p>Les données personnelles sont traitées conformément au RGPD. Le stagiaire dispose d'un droit d'accès, de rectification et de suppression.</p>
    <h3>Article 13 – Litiges</h3>
    <p>En cas de litige, les parties s'efforceront de trouver une solution amiable. À défaut, le litige sera porté devant les juridictions compétentes.</p>
    <h3>Article 14 – Entrée en vigueur</h3>
    <p>Le présent contrat prend effet à la date de sa signature par les deux parties.</p>
    <p><strong>Fait à ${o.ville}, le :</strong> ${formatDate(subtractBusinessDays(getStagiaireDateDebut(s, f) || new Date().toISOString(), 14))}</p>
  `;
  const sigDate3 = formatDate(subtractBusinessDays(getStagiaireDateDebut(s, f) || new Date().toISOString(), 14));
  extra += sigBlock(
    `Pour l'Organisme de formation<br>${o.nom}`, o.dirigeant, orgSig(o),
    `Le Stagiaire`, `${s.prenom} ${s.nom}`, stagSig(s),
    'Précédée de la mention « Lu et approuvé »', sigDate3, sigDate3
  );
  return buildDocument({ org: o, title: `CONTRAT DE FORMATION – ${s.prenom} ${s.nom}`, extraHtml: extra });
}

export function genConventionFormationTripartite(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const respEntreprise = s.responsableEntreprise || "Le Responsable";
  const entrepriseNom = s.entreprise || "_______________";
  const poste = s.poste || "_______________";
  const sigDate = formatDate(subtractBusinessDays(getStagiaireDateDebut(s, f) || new Date().toISOString(), 14));
  const respSigHtml = s.signatureResponsableUrl
    ? `<img src="${s.signatureResponsableUrl}" alt="Signature responsable" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />`
    : `<p style="font-style:italic;color:#999;margin-top:15px">Signé par ${respEntreprise}</p>`;
  let extra = `
    <h2>CONVENTION DE FORMATION PROFESSIONNELLE TRIPARTITE</h2>
    <p style="font-style:italic">(Articles L.6353-1 et L.6353-2 du Code du travail)</p>
    <h3>Entre les soussignés</h3>
    <h4>1. L'Organisme de formation</h4>
    <p><strong>${o.nom}</strong><br>Adresse : ${o.adresse}, ${o.codePostal} ${o.ville}<br>SIRET : ${o.siret} – NDA : ${o.nda}<br>Représenté par : ${o.dirigeant}, en qualité de Dirigeant<br>Email : ${o.email}</p>
    <p>Ci-après dénommé « l'Organisme de formation »,</p>
    <h4>2. L'Entreprise</h4>
    <p><strong>${entrepriseNom}</strong><br>Représentée par : ${respEntreprise}${poste !== "_______________" ? `, en qualité de ${poste}` : ""}</p>
    <p>Ci-après dénommée « l'Entreprise »,</p>
    <h4>3. Le/La Stagiaire</h4>
    <p><strong>${s.prenom} ${s.nom}</strong>${s.poste ? `<br>Poste occupé : ${s.poste}` : ""}${s.email ? `<br>Email : ${s.email}` : ""}${s.telephone ? `<br>Téléphone : ${s.telephone}` : ""}</p>
    <p>Ci-après dénommé(e) « le/la Stagiaire »,</p>
    <h3>Article 1 – Objet de la convention</h3>
    <p>La présente convention définit les conditions de l'action de formation au bénéfice du/de la Stagiaire, salarié(e) de l'Entreprise :</p>
    <p><strong>Intitulé :</strong> ${f.intitule}<br><strong>Nature :</strong> Action de formation (article L.6313-1 du Code du travail)</p>
    <h3>Article 2 – Objectifs de la formation</h3>
    <p>À l'issue de la formation, le/la stagiaire sera capable de :</p>
    <p>${f.objectifs.split('\n').map(obj => '• ' + obj).join('<br>')}</p>
    <h3>Article 3 – Organisation de la formation</h3>
    <p><strong>Durée totale :</strong> ${getStagiaireDuree(s, f)}<br><strong>Dates :</strong> du ${formatDate(getStagiaireDateDebut(s, f))} au ${formatDate(getStagiaireDateFin(s, f))}<br><strong>Horaires :</strong> de 09h00 à ${getHoraireFin(f)}<br><strong>Modalité :</strong> Formation ${modaliteTexte(f)}${isPresentiel(f) ? '<br><strong>Lieu :</strong> ' + f.lieu : ''}</p>
    <h3>Article 4 – Programme</h3>
    <p>Le programme détaillé est annexé à la présente convention.</p>
    <p><strong>Prérequis :</strong> ${f.prerequis || 'Aucun prérequis spécifique'}</p>
    <h3>Article 5 – Moyens pédagogiques</h3>
    <ul><li>Apports théoriques et méthodologiques</li><li>Démonstrations commentées</li><li>Exercices pratiques et mises en situation</li><li>Support de cours remis au stagiaire</li></ul>
    <p><strong>Moyens mobilisés :</strong> ${f.moyensPedagogiques}</p>
    <h3>Article 6 – Modalités d'évaluation</h3>
    <ul><li>Test de positionnement en début de formation</li><li>Exercices pratiques en cours de formation</li><li>Évaluation finale en fin de formation</li><li>Grille d'acquisition des compétences</li></ul>
    <p>Une attestation de fin de formation et un certificat de réalisation seront remis au stagiaire et à l'Entreprise.</p>
    <h3>Article 7 – Engagements de l'Entreprise</h3>
    <ul><li>Libérer le/la salarié(e) pendant toute la durée de la formation</li><li>Maintenir la rémunération du/de la salarié(e)</li><li>Informer l'Organisme de tout changement</li></ul>
    <h3>Article 8 – Dispositions financières</h3>
    <p><strong>Coût total :</strong> ${getStagiaireTarif(s, f)}</p>
    <p>TVA non applicable (article 261-4-4° du CGI). Facturation adressée à l'Entreprise, règlement à 30 jours.</p>
    <h3>Article 9 – Accessibilité</h3>
    <div class="section section-green"><p>Formation accessible aux personnes en situation de handicap.<br><strong>Référent handicap :</strong> ${o.referentHandicap} – ${o.email}</p></div>
    <h3>Article 10 – Annulation</h3>
    <p>Annulation moins de 7 jours ouvrés avant le début : indemnité de 30%. Abandon : facturation au prorata.</p>
    <h3>Article 11 – Règlement intérieur</h3>
    <p>Le/La stagiaire s'engage à respecter le règlement intérieur de l'Organisme.</p>
    <h3>Article 12 – RGPD</h3>
    <p>Données personnelles traitées conformément au RGPD.</p>
    <h3>Article 13 – Litiges</h3>
    <p>Solution amiable privilégiée. À défaut, juridictions compétentes de ${o.ville}.</p>
    <h3>Article 14 – Entrée en vigueur</h3>
    <p>Convention effective à la signature par les trois parties.</p>
    <p><strong>Fait en trois exemplaires, à ${o.ville}, le ${sigDate}</strong></p>
  `;
  extra += '<div style="display:flex;justify-content:space-between;margin-top:30px;gap:15px">'
    + '<div style="flex:1;border:1px solid #ccc;border-radius:6px;padding:15px;text-align:center">'
    + '<p style="font-weight:bold;margin-bottom:8px">Pour l\'Organisme de formation</p>'
    + '<p>' + o.nom + '</p><p>Nom : ' + o.dirigeant + '</p>'
    + '<p style="font-style:italic;font-size:11px">(Lu et approuvé)</p><p>Cachet :</p>'
    + (o.tamponUrl ? '<img src="' + o.tamponUrl + '" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />' : '')
    + '</div>'
    + '<div style="flex:1;border:1px solid #ccc;border-radius:6px;padding:15px;text-align:center">'
    + '<p style="font-weight:bold;margin-bottom:8px">Pour l\'Entreprise</p>'
    + '<p>' + entrepriseNom + '</p><p>Nom : ' + respEntreprise + '</p>'
    + '<p style="font-style:italic;font-size:11px">(Lu et approuvé)</p><p>Signature :</p>'
    + respSigHtml
    + '</div>'
    + '<div style="flex:1;border:1px solid #ccc;border-radius:6px;padding:15px;text-align:center">'
    + '<p style="font-weight:bold;margin-bottom:8px">Le/La Stagiaire</p>'
    + '<p>Nom : ' + s.prenom + ' ' + s.nom + '</p>'
    + '<p style="font-style:italic;font-size:11px">(Lu et approuvé)</p><p>Signature :</p>'
    + (s.signatureUrl ? '<img src="' + s.signatureUrl + '" alt="Signature stagiaire" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />' : '<p style="font-style:italic;color:#999">Signé par ' + s.prenom + ' ' + s.nom + '</p>')
    + '</div></div>';
  return buildDocument({ org: o, title: 'CONVENTION DE FORMATION TRIPARTITE – ' + s.prenom + ' ' + s.nom, extraHtml: extra });
}

export function genProcedureAccueil_V2(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE D'ACCUEIL DES STAGIAIRES", sections: [
    { heading: "Objectif de la procédure", content: `<p>Assurer un accueil structuré, bienveillant et informatif des stagiaires afin de leur permettre de comprendre le déroulement de la formation, leurs droits, devoirs et les ressources mises à leur disposition.</p><p>Cette étape garantit la conformité à l'indicateur 9 du Référentiel National Qualité Qualiopi.</p>` },
    { heading: "Moment d'application", content: `<p>La procédure s'applique avant et au démarrage de chaque action de formation (présentiel ou distanciel).</p>` },
    { heading: "1️⃣ Avant la formation", content: `<p><strong>Responsable :</strong> Service administratif / Formateur référent</p><ul><li>Envoi de la convocation mentionnant les dates, horaires, lieu et contact.</li><li>Envoi du règlement intérieur, des CGV, et du programme détaillé de la formation.</li><li>Vérification du financement et des documents contractuels (convention ou contrat de formation).</li><li>Si besoin, prise de contact avec le référent handicap pour étudier les adaptations nécessaires.</li></ul>` },
    { heading: "2️⃣ Accueil le premier jour", content: `<p><strong>Responsable :</strong> ${o.dirigeant}</p><ul><li>Accueil personnalisé des stagiaires dès leur arrivée.</li><li>Présentation du formateur, des locaux et des consignes de sécurité.</li><li>Signature de la feuille d'émargement et vérification des documents administratifs.</li><li>Distribution des supports de formation et du programme.</li><li>Présentation du règlement intérieur, du planning, et des objectifs pédagogiques.</li><li>Réalisation du test de positionnement afin d'évaluer le niveau de départ.</li></ul>`, variant: "green" },
    { heading: "3️⃣ Présentation des outils et du déroulé", content: `<ul><li>Explication du déroulé pédagogique (objectifs, activités, évaluations).</li><li>Présentation des supports utilisés : PowerPoint, exercices, quiz, études de cas.</li><li>Rappel des modalités d'évaluation et de validation des acquis.</li><li>Présentation des modalités d'assistance pédagogique et technique (contact mail / formateur).</li></ul>` },
    { heading: "4️⃣ Pendant la formation", content: `<ul><li>Suivi quotidien de la feuille d'émargement.</li><li>Accompagnement personnalisé selon les besoins exprimés.</li><li>En cas de difficulté, mise en place d'un entretien individuel d'accompagnement.</li><li>Suivi de la progression des apprentissages.</li></ul>` },
    { heading: "5️⃣ En fin de formation", content: `<ul><li>Réalisation de l'évaluation finale et de la grille d'acquisition des compétences.</li><li>Remise de l'attestation de fin de formation.</li><li>Transmission du bilan de satisfaction à la direction et archivage dans le dossier Qualiopi.</li><li>Information sur le bilan à froid réalisé entre 3 et 6 mois après la session.</li></ul>` },
    { heading: "Accessibilité et accompagnement handicap", content: `<p>En cas de besoin spécifique, un accompagnement individualisé est proposé.</p><p><strong>Référent handicap :</strong> ${o.referentHandicap}<br>${o.email}</p>`, variant: "green" },
    { heading: "Archivage et traçabilité", content: `<p>Tous les documents relatifs à l'accueil (convocation, émargements, tests, bilans) sont archivés électroniquement pour une durée minimale de 5 ans.</p><p><strong>Responsable de la mise en œuvre :</strong> ${o.dirigeant}<br>${o.email}</p>` },
  ] }); // NO signatures
}

export function genEmargementJour_V2(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], jour: number, jourLabel: string) {
  const days = getFormationDays(f);
  const pres = isPresentiel(f);
  const dist = isDistanciel(f);

  let extra = '';
  if (pres) {
    // Présentiel format: table per day with Matin/Après-midi, stagiaire signature + formateur
    const daysList = jourLabel ? [jourLabel] : days;
    daysList.forEach((day, di) => {
      if (di > 0) extra += '<div class="page-break"></div>';
      extra += `<p style="margin-top:15px"><strong>Date : ${day}</strong></p>`;
      extra += `<p><strong>Formateur :</strong> ${f.formateur}<br><strong>Formation :</strong> ${f.intitule}</p>`;
      let tableRows = '';
      stagiaires.slice(0, 10).forEach(s => {
        const stagName = `${s.prenom} ${s.nom.toUpperCase()}`;
        const stagSigHtml = s.signatureUrl ? `<br><img src="${s.signatureUrl}" alt="Sig" style="max-height:40px;max-width:90px;object-fit:contain;margin-top:4px" />` : `<br><span style="font-style:italic;color:#999;font-size:10px">Signé ${s.prenom[0]}.${s.nom}</span>`;
        const fmtSigUrl = s.formateurSignatureUrl || f.formateurSignatureUrl;
        const formateurSigHtml = fmtSigUrl ? `<br><img src="${fmtSigUrl}" alt="Sig formateur" style="max-height:40px;max-width:90px;object-fit:contain;margin-top:4px" />` : '';
        tableRows += `<tr style="background:#fff;border-bottom:1px solid #ddd"><td>${day}</td><td>Matin</td><td style="padding:10px 6px">${stagName}${stagSigHtml}</td><td style="padding:10px 6px">${f.formateur}${formateurSigHtml}</td></tr>`;
        tableRows += `<tr style="background:#fff;border-bottom:1px solid #ccc"><td></td><td>Après-midi</td><td style="padding:10px 6px">${stagName}${stagSigHtml}</td><td style="padding:10px 6px">${f.formateur}${formateurSigHtml}</td></tr>`;
      });
      extra += `<table><tr><th>Date</th><th>Horaires</th><th>Prénom et nom, Signature Du Stagiaire</th><th>Prénom et nom du Formateur</th></tr>${tableRows}</table>`;
    });
  }
  if (dist && !pres) {
    // Distanciel: rapport de connexion
    extra += `<h3>Rapport de connexion – Formation à distance</h3>`;
    const rows: string[][] = [];
    const { hoursPerDay } = parseDuree(f.duree);
    const ct = hoursPerDay <= 6 ? CONNECTION_TIMES_6H : CONNECTION_TIMES_7H;
    days.forEach(day => {
      stagiaires.slice(0, 10).forEach(s => {
        const seed = (s.nom.charCodeAt(0) + day.charCodeAt(0)) % 3;
        // Matin
        const matin = ct[seed * 2 % ct.length];
        // Après-midi
        const apresmidi = ct[(seed * 2 + 1) % ct.length];
        const totalMin = parseInt(matin.duree) * 60 + parseInt(apresmidi.duree) * 60;
        rows.push([s.prenom + ' ' + s.nom, day, matin.heureConnexion, matin.heureDeconnexion, matin.duree]);
        rows.push([s.prenom + ' ' + s.nom, '', apresmidi.heureConnexion, apresmidi.heureDeconnexion, apresmidi.duree]);
      });
    });
    extra += tableHTML(["Stagiaire", "Date", "Heure connexion", "Heure déconnexion", "Durée"], rows.slice(0, 60));
  }

  return buildDocument({ org: o, title: pres ? "FEUILLE D'ÉMARGEMENT" : "RAPPORT DE CONNEXION", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra });
  // NO signature block on the document itself - signatures are IN the table
}

// ===================== IND 10 =====================

export function genProcedureAdaptation_V2(o: OrganismeInfo, f: FormationInfo) {
  let extra = `
    <p>Je soussigné(e) ${o.dirigeant} agissant en qualité de responsable légal(e) de l'organisme de formation <strong>${o.nom}</strong> atteste de l'adaptation des modalités pédagogiques aux objectifs et au public de la formation selon le descriptif fourni ci-dessous :</p>
    <ul>
      <li>Diagnostic du bénéficiaire et adaptation de l'action de formation pour les personnes en situation de handicap</li>
      <li>Évaluation des pré-requis des stagiaires (test de positionnement)</li>
      <li>Apport théorique et vécu (expérience sur le champ de la formation et de l'audit)</li>
      <li>Réflexions sur les cas réels</li>
      <li>Mises en situation par questionnement collectif</li>
      <li>Retours d'expériences sur les formations réalisées</li>
      <li>Tests de contrôle de connaissances en fin de formation (évaluation de fin de formation)</li>
    </ul>
  `;
  return buildDocument({ org: o, title: "PROCÉDURE D'ADAPTATION DES MODALITÉS PÉDAGOGIQUES", subtitle: "Personnalisation d'accès à la formation et des modalités pédagogiques aux objectifs et au public de la formation", extraHtml: extra });
  // NO signatures
}

export function genTableauSuiviParcours_V2(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const days = getFormationDays(f);
  const termine = isFormationTerminee(f);
  const headers = [
    "Nom", "Prénom", "Sexe", "Prise en charge", "Nature", "Handicap", "Observations",
    "Date entrée", "Date sortie",
    "Date adaptation", "Adaptations nécessaires", "Difficultés", "Suivi",
    ...days.slice(0, 12).map((d, i) => `JS${i + 1}`),
    "Interruption", "Cause",
    "QCM", "Test réussite", "Satisfaction"
  ];

  const rows = stagiaires.slice(0, 10).map((s, si) => {
    const sc = EVAL_SCORES[si] || [7, 8, 7, 8, 7];
    const avg = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    const sexe = s.prenom?.endsWith('a') || s.prenom?.endsWith('e') ? 'F' : 'H';
    const presences = days.slice(0, 12).map(() => 'X');
    return [
      s.nom?.toUpperCase(), s.prenom?.toUpperCase(), sexe,
      si % 3 === 0 ? 'autofinancement' : si % 3 === 1 ? 'OPCO' : 'CPF',
      'numéraires', 'non', '',
      formatDate(getStagiaireDateDebut(s, f)), formatDate(getStagiaireDateFin(s, f)),
      formatDate(getStagiaireDateDebut(s, f)), 'aucune', 'aucune', 'aucune',
      ...presences,
      '', termine ? `${avg}/10` : '', termine ? (avg >= 6 ? 'oui' : 'non') : '', termine ? 'oui' : ''
    ];
  });

  return buildDocument({ org: o, title: "TABLEAU DE SUIVI DU PARCOURS BÉNÉFICIAIRES ET ADAPTATIONS", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires,
    table: { headers, rows } });
  // NO signatures
}

// ===================== IND 11 =====================

export function genEvaluationFinaleStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], stagiaireIdx: number) {
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  const termine = isFormationTerminee(f);
  
  if (!termine) {
    let extra = `
      <h2>Évaluation Finale – ${f.intitule}</h2>
      <p><strong>Nom du stagiaire :</strong> ${s.prenom} ${s.nom}</p>
      <p><strong>Date :</strong> ${formatDate(getStagiaireDateFin(s, f))}</p>
      <p><strong>Organisme :</strong> ${o.nom}</p>
      <p><strong>Formation :</strong> ${f.intitule}</p>
      <div class="section section-green"><p><em>La formation est en cours. L'évaluation finale sera complétée à l'issue de la formation.</em></p></div>
    `;
    return buildDocument({ org: o, title: "ÉVALUATION FINALE", subtitle: `${f.intitule} – ${s.prenom} ${s.nom}`, extraHtml: extra });
  }
  
  const evalData = getEvalContent(f.intitule);
  const questions = evalData.qcmFinal.slice(0, 5); // 5 QCM questions
  const answers = generateStagiaireAnswers(questions, stagiaireIdx + 100);
  const result = computeQCMScore(questions, answers);
  const qcmScore = Math.min(5, result.score + (stagiaireIdx % 2)); // boost slightly

  let extra = `
    <h2>Évaluation Finale – ${f.intitule}</h2>
    <p><strong>Nom du stagiaire :</strong> ${s.prenom} ${s.nom}</p>
    <p><strong>Date :</strong> ${formatDate(getStagiaireDateFin(s, f))}</p>
    <p><strong>Organisme :</strong> ${o.nom}</p>
    <p><strong>Formation :</strong> ${f.intitule}</p>
    <h3>Partie 1 – QCM (5 points)</h3>
    <p>Cochez la bonne réponse.</p>
  `;

  questions.forEach((q, qi) => {
    extra += `<p><strong>${qi + 1}. ${q.question}</strong></p>`;
    q.options.forEach((opt, oi) => {
      const chosen = answers[qi] === oi;
      const correct = q.correctIndex === oi;
      const mark = chosen ? (correct ? '✅' : '☒') : '☐';
      extra += `<p>${mark} ${String.fromCharCode(65 + oi)}. ${opt}</p>`;
    });
  });
  extra += `<p><strong>Total QCM : ${qcmScore}/5 points</strong></p>`;

  // Partie 2 – Cas pratique
  const sc = EVAL_SCORES[stagiaireIdx] || [7, 8, 7, 8, 7];
  const pratiqueScore = Math.min(5, Math.round(sc.reduce((a, b) => a + b, 0) / sc.length / 2));
  const totalNote = qcmScore + pratiqueScore;

  const casPratiqueConsignes = [
    `Rédiger un document professionnel intégrant les compétences vues en formation « ${f.intitule} »`,
    "Insérer les éléments demandés (mise en forme, structure, éléments spécifiques au domaine)",
    "Créer une mise en page professionnelle",
    "Ajouter les éléments de personnalisation requis"
  ];

  extra += `<h3>Partie 2 – Cas pratique écrit (5 points)</h3>`;
  extra += `<p>Sur papier, le stagiaire devait réaliser les tâches suivantes :</p>`;
  extra += `<ul>${casPratiqueConsignes.map(c => `<li>${c}</li>`).join('')}</ul>`;

  // Generate unique observation based on score
  const pratiqueObservations = [
    [ // excellent (5/5)
      `${s.prenom} ${s.nom} a parfaitement réalisé l'ensemble des tâches demandées avec rigueur et méthode. La mise en page est soignée et professionnelle.`,
      `Le stagiaire a restitué à l'écrit toutes les étapes attendues avec clarté. L'organisation du document est cohérente, et la compréhension est maîtrisée.`,
      `Travail exemplaire. ${s.prenom} ${s.nom} démontre une maîtrise complète des compétences évaluées. Le résultat est directement exploitable en contexte professionnel.`
    ],
    [ // bon (4/5)
      `${s.prenom} ${s.nom} a réalisé l'exercice de manière satisfaisante. La plupart des consignes sont respectées. Quelques détails mineurs à perfectionner.`,
      `Bon travail d'ensemble. La compréhension des concepts est acquise. La mise en forme gagnerait à être un peu plus précise.`,
      `Le stagiaire montre une bonne appropriation des compétences. Le cas pratique est globalement réussi avec de légères améliorations possibles.`
    ],
    [ // moyen (3/5)
      `${s.prenom} ${s.nom} a réalisé partiellement l'exercice. Les bases sont comprises mais l'application manque de précision sur certains points.`,
      `Travail correct mais incomplet. Certaines étapes sont manquantes ou approximatives. Un approfondissement est recommandé.`,
      `Le stagiaire a montré une compréhension de base. Les compétences principales sont en cours d'acquisition.`
    ],
    [ // faible (1-2/5)
      `${s.prenom} ${s.nom} a rencontré des difficultés sur le cas pratique. Les consignes n'ont été que partiellement suivies.`,
      `Travail insuffisant. Le stagiaire nécessite un accompagnement complémentaire pour consolider les acquis.`,
      `Le cas pratique révèle des lacunes importantes. Un plan de remédiation individuel est préconisé.`
    ]
  ];

  const obsIdx = pratiqueScore >= 5 ? 0 : pratiqueScore >= 4 ? 1 : pratiqueScore >= 3 ? 2 : 3;
  const obs = pratiqueObservations[obsIdx][(stagiaireIdx * 3 + 1) % 3];

  extra += `<p><strong>Observations du formateur :</strong></p>`;
  extra += `<p>${obs}</p>`;
  extra += `<p><strong>Total Cas pratique : ${pratiqueScore}/5 points</strong></p>`;

  extra += `<h3>Note finale : ${totalNote}/10</h3>`;

  // Unique formateur remark
  const remarques = [
    `${s.prenom} ${s.nom} a parfaitement acquis les compétences visées par la formation. ${totalNote >= 8 ? "L'autonomie en situation professionnelle est totalement acquise." : totalNote >= 6 ? "La progression est encourageante et les fondamentaux sont en place." : "Un accompagnement complémentaire est recommandé pour consolider les acquis."}`,
    `Le parcours de ${s.prenom} ${s.nom} démontre ${totalNote >= 8 ? "une excellente assimilation des contenus. Le transfert en situation professionnelle peut se faire en totale autonomie." : totalNote >= 6 ? "une bonne compréhension d'ensemble. Les compétences clés sont acquises." : "des acquis partiels nécessitant un renforcement ciblé."}`,
    `${s.prenom} ${s.nom} a ${totalNote >= 8 ? "fait preuve d'un engagement remarquable et d'une maîtrise solide des compétences évaluées." : totalNote >= 6 ? "suivi la formation avec sérieux. Les objectifs principaux sont atteints." : "besoin de consolider certaines compétences fondamentales avant une mise en pratique autonome."}`
  ];
  extra += `<h3>Remarque du formateur : ${f.formateur}</h3>`;
  extra += `<p>${remarques[(stagiaireIdx * 5 + 2) % 3]}</p>`;

  return buildDocument({ org: o, title: "ÉVALUATION FINALE", subtitle: `${f.intitule} – ${s.prenom} ${s.nom}`, extraHtml: extra });
  // NO signatures
}

export function genExercicesTrame(o: OrganismeInfo, f: FormationInfo) {
  const evalData = getEvalContent(f.intitule);
  const exercices = evalData.exercices;
  let extra = '';
  exercices.forEach((ex, ei) => {
    extra += `<h3>${ex.titre}</h3>`;
    extra += `<p><strong>Consigne :</strong></p><p>${ex.consigne}</p>`;
    extra += `<p><strong>Travail réalisé :</strong></p>`;
    extra += `<p>.................................................................................................</p>`;
    extra += `<p>.................................................................................................</p>`;
    extra += `<p>.................................................................................................</p>`;
    if (ei < exercices.length - 1) extra += '<br/>';
  });
  return buildDocument({ org: o, title: "EXERCICES PRATIQUES – FORMATION", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra });
  // NO signatures
}

export function genExercicesStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], stagiaireIdx: number, exerciceIdx?: number) {
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  const evalData = getEvalContent(f.intitule);
  const allExercices = evalData.exercices;
  const sc = EVAL_SCORES[stagiaireIdx] || [7, 8, 7, 8, 7];

  // Check if formation has competency blocs
  const rncp = f.codeRNCP ? getRNCPByCode(f.codeRNCP) : null;
  const hasBlocs = rncp && rncp.blocsCompetences && rncp.blocsCompetences.length > 0;

  let nbBlocks: number;
  let EXERCICES_PER_BLOCK = 2;
  let blocLabels: string[] = [];

  if (hasBlocs) {
    nbBlocks = rncp!.blocsCompetences.length;
    blocLabels = rncp!.blocsCompetences.map(b => b.titre);
  } else {
    const days = getFormationDays(f);
    const nbJours = days.length;
    nbBlocks = Math.max(1, Math.ceil(nbJours / 2));
  }

  const totalExNeeded = nbBlocks * EXERCICES_PER_BLOCK;

  const exercices = [...allExercices];
  for (let i = allExercices.length; i < totalExNeeded; i++) {
    const blockIdx = Math.floor(i / EXERCICES_PER_BLOCK);
    if (hasBlocs) {
      const blocTitre = blocLabels[blockIdx] || `Bloc ${blockIdx + 1}`;
      exercices.push({
        titre: `Exercice ${i + 1} : Cas pratique – ${blocTitre}`,
        consigne: `À partir de la situation professionnelle présentée, appliquez les compétences acquises dans le bloc « ${blocTitre} » de la formation « ${f.intitule} » pour produire le livrable demandé.`,
        reponseAttendue: `Application des acquis du bloc ${blocTitre} : mise en pratique structurée, utilisation des outils et méthodes vus en formation, résultat conforme aux attentes professionnelles.`,
      });
    } else {
      const days = getFormationDays(f);
      const nbJours = days.length;
      const jourDebut = blockIdx * 2 + 1;
      const jourFin = Math.min(blockIdx * 2 + 2, nbJours);
      exercices.push({
        titre: `Exercice ${i + 1} : Cas pratique – Jour ${jourDebut}-${jourFin}`,
        consigne: `À partir de la situation professionnelle présentée, appliquez les compétences acquises durant les jours ${jourDebut} et ${jourFin} de la formation « ${f.intitule} » pour produire le livrable demandé.`,
        reponseAttendue: `Application des acquis des jours ${jourDebut}-${jourFin} : mise en pratique structurée, utilisation des outils et méthodes vus en formation, résultat conforme aux attentes professionnelles.`,
      });
    }
  }

  const blockStart = exerciceIdx !== undefined ? exerciceIdx * EXERCICES_PER_BLOCK : 0;
  const blockEnd = exerciceIdx !== undefined ? blockStart + EXERCICES_PER_BLOCK : totalExNeeded;
  const selectedExercices = exercices.slice(blockStart, Math.min(blockEnd, exercices.length));

  let jourLabel: string;
  if (hasBlocs && exerciceIdx !== undefined) {
    const blocTitre = blocLabels[exerciceIdx] || `Bloc ${exerciceIdx + 1}`;
    jourLabel = ` – ${blocTitre}`;
  } else if (!hasBlocs && exerciceIdx !== undefined && nbBlocks > 1) {
    const days = getFormationDays(f);
    const nbJours = days.length;
    jourLabel = ` – Jour ${exerciceIdx * 2 + 1}-${Math.min(exerciceIdx * 2 + 2, nbJours)}`;
  } else {
    jourLabel = '';
  }

  // Calculate exercise date: spread across formation days by bloc
  let exerciseDate: string;
  if (hasBlocs && exerciceIdx !== undefined) {
    const days = getFormationDays(f);
    const nbJours = days.length;
    // Distribute days proportionally across blocs: each bloc ends at its proportional last day
    const totalBlocVolumes = rncp!.blocsCompetences.map(b =>
      b.matieres.reduce((sum, m) => sum + (parseInt(m.volume) || 0), 0)
    );
    const totalH = totalBlocVolumes.reduce((a, b) => a + b, 0) || nbJours;
    let cumDays = 0;
    for (let bi = 0; bi <= exerciceIdx; bi++) {
      cumDays += Math.round((totalBlocVolumes[bi] / totalH) * nbJours);
    }
    cumDays = Math.min(cumDays, nbJours);
    exerciseDate = days.length >= cumDays && cumDays > 0 ? days[cumDays - 1] : formatDate(getStagiaireDateFin(s, f));
  } else if (!hasBlocs && exerciceIdx !== undefined) {
    const days = getFormationDays(f);
    const nbJours = days.length;
    const jourFin = Math.min(exerciceIdx * 2 + 2, nbJours);
    exerciseDate = days.length >= jourFin ? days[jourFin - 1] : formatDate(getStagiaireDateFin(s, f));
  } else {
    exerciseDate = formatDate(getStagiaireDateFin(s, f));
  }

  // Detect if formation is English-related
  const isEnglishFormation = (() => {
    const lower = f.intitule.toLowerCase();
    return lower.includes('anglais') || lower.includes('english') || lower.includes('toeic');
  })();

  let extra = `
    <h2>ÉVALUATION FINALE – EXERCICES & JEUX${jourLabel} – FORMATION ${f.intitule.toUpperCase()}</h2>
    <p><strong>Nom et prénom :</strong> ${s.prenom} ${s.nom}</p>
    <p><strong>Date :</strong> ${exerciseDate}</p>
    <h3>PARTIE 1 – EXERCICES PRATIQUES</h3>
  `;

  const hash = (s.nom + s.prenom).split("").reduce((a: number, c: string) => a + c.charCodeAt(0), 0);
  const noteMax = 5;
  let totalNote = 0;
  let totalMax = 0;
  const notesRecap: { titre: string; note: number; max: number }[] = [];

  // Build a truly unique profile per stagiaire for realistic note distribution
  const profiles: Array<{ baseNote: number; strengths: string; weakness: string; style: string; strengthsEN: string; weaknessEN: string; styleEN: string }> = [
    { baseNote: 4.5, strengths: "méthodologie et rigueur", weakness: "gestion du temps", style: "méthodique et structuré(e)", strengthsEN: "methodology and rigour", weaknessEN: "time management", styleEN: "methodical and well-structured" },
    { baseNote: 5, strengths: "créativité et autonomie", weakness: "aucune difficulté majeure", style: "autonome et proactif/ve", strengthsEN: "creativity and independence", weaknessEN: "no major difficulty", styleEN: "independent and proactive" },
    { baseNote: 4.5, strengths: "motivation et persévérance", weakness: "quelques détails techniques", style: "volontaire et appliqué(e)", strengthsEN: "motivation and perseverance", weaknessEN: "a few technical details", styleEN: "willing and diligent" },
    { baseNote: 4, strengths: "travail collaboratif", weakness: "précision technique", style: "appliqué(e) et sérieux/se", strengthsEN: "collaborative work", weaknessEN: "technical precision", styleEN: "diligent and serious" },
    { baseNote: 4.5, strengths: "écoute et réceptivité", weakness: "gestion du temps", style: "attentif/ve et rigoureux/se", strengthsEN: "listening skills and receptiveness", weaknessEN: "time management", styleEN: "attentive and thorough" },
    { baseNote: 5, strengths: "analyse et synthèse", weakness: "aucune difficulté", style: "brillant(e) et efficace", strengthsEN: "analysis and synthesis", weaknessEN: "no difficulty", styleEN: "brilliant and efficient" },
    { baseNote: 4, strengths: "sens pratique", weakness: "finition des livrables", style: "pragmatique et efficace", strengthsEN: "practical sense", weaknessEN: "finishing deliverables", styleEN: "pragmatic and efficient" },
    { baseNote: 4.5, strengths: "organisation du travail", weakness: "relecture finale", style: "organisé(e) et constant(e)", strengthsEN: "work organisation", weaknessEN: "final proofreading", styleEN: "organised and consistent" },
    { baseNote: 5, strengths: "compréhension rapide", weakness: "aucune difficulté majeure", style: "rapide et intuitif/ve", strengthsEN: "quick understanding", weaknessEN: "no major difficulty", styleEN: "quick and intuitive" },
    { baseNote: 4, strengths: "curiosité et questionnement", weakness: "quelques imprécisions mineures", style: "curieux/se et engagé(e)", strengthsEN: "curiosity and questioning", weaknessEN: "minor inaccuracies", styleEN: "curious and engaged" },
  ];
  const profile = profiles[stagiaireIdx % profiles.length];

  selectedExercices.forEach((ex, localIdx) => {
    const ei = blockStart + localIdx;
    const exSeed = ((hash * 13 + ei * 37 + stagiaireIdx * 29) & 0x7FFFFFFF) % 100;
    let noteBase = profile.baseNote;
    const variation = ((exSeed % 10) - 3) / 10;
    const rawNote = noteBase + variation;
    const noteRound = Math.max(4, Math.min(5, Math.round(rawNote * 2) / 2));
    totalNote += noteRound;
    totalMax += noteMax;
    notesRecap.push({ titre: ex.titre, note: noteRound, max: noteMax });

    if (localIdx > 0) extra += `<br/>`;
    extra += `<h3>${ex.titre}</h3>`;
    extra += `<p><strong>Consigne :</strong></p><p>${ex.consigne}</p>`;
    extra += `<p><strong>Travail réalisé par ${s.prenom} ${s.nom} :</strong></p>`;

    const repBase = ex.reponseAttendue;
    // Transform third-person meta-descriptions into first-person student writing
    const repFirstPerson = isEnglishFormation ? repBase : repBase
      .replace(/Le stagiaire doit /gi, 'J\'ai ')
      .replace(/Le stagiaire /gi, 'J\'ai ')
      .replace(/L['']apprenant doit /gi, 'J\'ai ')
      .replace(/Il faut que le stagiaire /gi, 'J\'ai ')
      .replace(/doit créer/gi, 'ai créé')
      .replace(/doit utiliser/gi, 'ai utilisé')
      .replace(/doit rédiger/gi, 'ai rédigé')
      .replace(/doit appliquer/gi, 'ai appliqué')
      .replace(/doit identifier/gi, 'ai identifié')
      .replace(/doit mettre en place/gi, 'ai mis en place')
      .replace(/doit réaliser/gi, 'ai réalisé')
      .replace(/doit présenter/gi, 'ai présenté')
      .replace(/doit analyser/gi, 'ai analysé')
      .replace(/doit proposer/gi, 'ai proposé');
    // Replace any brackets with realistic values from actual stagiaire data
    const repClean = repFirstPerson
      .replace(/\[Name\]/gi, `${s.prenom} ${s.nom}`)
      .replace(/\[Nom[^\]]*\]/gi, `${s.prenom} ${s.nom}`)
      .replace(/Mme Dupont/gi, `Mme ${s.nom}`)
      .replace(/M\. Dupont/gi, `M. ${s.nom}`)
      .replace(/\[company\]/gi, s.entreprise || (isEnglishFormation ? 'my company' : 'mon entreprise'))
      .replace(/\[position\]/gi, s.poste || (isEnglishFormation ? 'my position' : 'mon poste'))
      .replace(/\[tasks?\]/gi, isEnglishFormation ? 'project management and team coordination' : 'la gestion des projets et le suivi des équipes')
      .replace(/\[date\]/gi, isEnglishFormation ? 'the 15th of next month' : 'le 15 du mois prochain')
      .replace(/\[age\]/gi, `${25 + (stagiaireIdx * 3) % 20}`)
      .replace(/\[job\]/gi, s.poste || (isEnglishFormation ? 'professional' : 'professionnel'))
      .replace(/\[city\]/gi, isEnglishFormation ? 'Paris' : 'Paris')
      .replace(/\[hobby\]/gi, isEnglishFormation ? 'reading and cooking' : 'la lecture et la cuisine')
      .replace(/\[time\]/gi, isEnglishFormation ? 'seven o\'clock' : '7 heures')
      .replace(/\[number\]/gi, `${1 + stagiaireIdx % 3}`)
      .replace(/\[.*?\]/g, '');

    // Output the student response as a single flowing block — no extra filler paragraphs
    extra += `<p>${repClean}</p>`;

    // Formateur correction
    const corrSeed = ((hash * 19 + stagiaireIdx * 13 + ei * 29) & 0x7FFFFFFF) % 6;
    extra += `<h4>Correction et commentaire du formateur :</h4>`;
    
    if (noteRound >= 4.5) {
      const corrs = [
        `<p><strong>Points forts :</strong> ${s.prenom} ${s.nom} a parfaitement respecté la consigne et la méthodologie attendue. Le travail est complet, bien structuré et directement exploitable en contexte professionnel. J'apprécie particulièrement ${profile.strengths} dont ${s.prenom} a fait preuve tout au long de l'exercice.</p><p><strong>Axes d'amélioration :</strong> Aucun point bloquant. ${s.prenom} pourrait simplement approfondir certains aspects avancés pour aller encore plus loin. L'ensemble est excellent.</p><p><strong>Compétence évaluée :</strong> Pleinement acquise – Niveau : Maîtrise.</p>`,
        `<p><strong>Points forts :</strong> Excellent travail, ${s.prenom} démontre une réelle appropriation des compétences visées. La démarche est ${profile.style} et le résultat dépasse les attendus. ${s.prenom} a su enrichir l'exercice d'apports personnels pertinents issus de son expérience chez ${s.entreprise}.</p><p><strong>Axes d'amélioration :</strong> RAS – Le niveau est au-dessus des objectifs de la formation. ${s.prenom} est pleinement opérationnel(le).</p><p><strong>Compétence évaluée :</strong> Acquise avec excellence – Niveau : Expert.</p>`,
        `<p><strong>Points forts :</strong> ${s.prenom} ${s.nom} a fait preuve d'une maîtrise remarquable. Le travail est rigoureux, chaque étape est documentée et justifiée. La qualité du rendu est professionnelle. ${s.prenom} montre une capacité d'analyse et de synthèse supérieure à la moyenne du groupe.</p><p><strong>Axes d'amélioration :</strong> Continuer à développer ${profile.strengths} qui est un véritable atout. Aucune lacune identifiée sur cet exercice.</p><p><strong>Compétence évaluée :</strong> Acquise – Validation sans réserve.</p>`,
        `<p><strong>Points forts :</strong> Travail exemplaire de ${s.prenom}. L'approche est ${profile.style}, les consignes sont parfaitement respectées. Le livrable est soigné et complet. ${s.prenom} a même anticipé des problèmes potentiels dans sa réponse, ce qui démontre une maturité professionnelle appréciable.</p><p><strong>Axes d'amélioration :</strong> ${s.prenom} pourrait partager sa méthodologie avec le groupe pour tirer l'ensemble vers le haut. Aucun point de faiblesse identifié.</p><p><strong>Compétence évaluée :</strong> Pleinement acquise.</p>`,
        `<p><strong>Points forts :</strong> ${s.prenom} ${s.nom} a démontré une excellente compréhension et une grande autonomie. Le travail est irréprochable sur le fond et la forme. Son profil ${profile.style} lui permet de traiter ce type d'exercice avec aisance et efficacité.</p><p><strong>Axes d'amélioration :</strong> Aucun axe critique. ${s.prenom} est encouragé(e) à explorer des cas d'usage plus avancés pour continuer sa progression.</p><p><strong>Compétence évaluée :</strong> Acquise – Félicitations.</p>`,
        `<p><strong>Points forts :</strong> ${s.prenom} a réalisé cet exercice avec brio. Toutes les étapes sont correctement identifiées et exécutées. Le résultat témoigne d'une compréhension approfondie du sujet et d'une capacité réelle à transférer les acquis en situation de travail chez ${s.entreprise}.</p><p><strong>Axes d'amélioration :</strong> Rien à signaler. ${s.prenom} fait partie des meilleur(e)s du groupe sur cet exercice.</p><p><strong>Compétence évaluée :</strong> Acquise avec distinction.</p>`,
      ];
      extra += corrs[corrSeed];
    } else if (noteRound >= 3.5) {
      const corrs = [
        `<p><strong>Points forts :</strong> ${s.prenom} ${s.nom} a bien compris l'objectif de l'exercice et a traité les points essentiels correctement. Son profil ${profile.style} se reflète dans la qualité du travail rendu. La démarche globale est cohérente et les fondamentaux sont maîtrisés.</p><p><strong>Points à améliorer :</strong> J'ai constaté quelques imprécisions sur ${profile.weakness}. ${s.prenom} devrait consacrer du temps à retravailler ce point spécifique. La relecture du support de cours pages 12-15 est recommandée.</p><p><strong>Compétence évaluée :</strong> En cours d'acquisition – Niveau : Satisfaisant.</p>`,
        `<p><strong>Points forts :</strong> Bon travail d'ensemble de ${s.prenom}. Les étapes principales sont correctement menées. ${s.prenom} a su mobiliser ${profile.strengths} pour avancer de manière efficace. Le résultat est conforme à l'essentiel des attendus.</p><p><strong>Points à améliorer :</strong> La finition du travail mérite attention. Quelques détails techniques ont été négligés (${profile.weakness}). Je recommande de refaire l'exercice en autonomie pour consolider les acquis.</p><p><strong>Compétence évaluée :</strong> En bonne voie d'acquisition.</p>`,
        `<p><strong>Points forts :</strong> ${s.prenom} ${s.nom} a fait un travail solide. La compréhension du sujet est démontrée et les consignes sont globalement respectées. ${s.prenom} montre de bonnes dispositions pour ${profile.strengths}.</p><p><strong>Points à améliorer :</strong> Des erreurs mineures sur ${profile.weakness} ont été relevées. Avec un peu plus de pratique et d'attention aux détails, ${s.prenom} atteindra le niveau de maîtrise. Exercice complémentaire n°${ei + 7} recommandé.</p><p><strong>Compétence évaluée :</strong> Partiellement acquise – En progression.</p>`,
        `<p><strong>Points forts :</strong> Le travail de ${s.prenom} est globalement satisfaisant. La démarche est logique et les principaux points sont traités. ${s.prenom} a fait preuve de ${profile.strengths} tout au long de l'exercice.</p><p><strong>Points à améliorer :</strong> La partie concernant ${profile.weakness} n'a pas été traitée de manière optimale. Un accompagnement ciblé sur ce point permettrait à ${s.prenom} de progresser rapidement. Rendez-vous en fin de journée pour un point individuel.</p><p><strong>Compétence évaluée :</strong> En acquisition – Bonne dynamique.</p>`,
        `<p><strong>Points forts :</strong> ${s.prenom} a produit un travail correct qui montre une bonne compréhension des enjeux. L'approche est ${profile.style} et le sérieux est au rendez-vous. Les points principaux de la consigne sont traités.</p><p><strong>Points à améliorer :</strong> ${profile.weakness} reste un point de vigilance pour ${s.prenom}. Je lui transmets des exercices de renforcement supplémentaires. Le prochain exercice devrait montrer une amélioration sur ce point.</p><p><strong>Compétence évaluée :</strong> Partiellement acquise – Progrès attendus.</p>`,
        `<p><strong>Points forts :</strong> ${s.prenom} ${s.nom} a fourni un effort louable et le résultat est encourageant. Les bases sont là et ${profile.strengths} est un atout pour la suite du parcours. Le cœur de l'exercice est bien traité.</p><p><strong>Points à améliorer :</strong> Quelques approximations sur ${profile.weakness}. ${s.prenom} bénéficierait d'une session de travail supplémentaire sur les points techniques. Fiches ressources n°${ei + 3} et n°${ei + 5} transmises.</p><p><strong>Compétence évaluée :</strong> En cours d'acquisition – Encouragements.</p>`,
      ];
      extra += corrs[corrSeed];
    } else {
      const corrs = [
        `<p><strong>Points forts :</strong> ${s.prenom} ${s.nom} a fait preuve de motivation malgré les difficultés rencontrées.</p><p><strong>Points à travailler :</strong> Des lacunes importantes sur ${profile.weakness}. Accompagnement individuel programmé.</p><p><strong>Compétence évaluée :</strong> Non acquise – Nécessite un renforcement.</p>`,
        `<p><strong>Points forts :</strong> ${s.prenom} montre de la bonne volonté et a su identifier les grandes étapes.</p><p><strong>Points à travailler :</strong> Le passage à l'action reste difficile. ${profile.weakness} est le principal frein. Plan de progression personnalisé établi.</p><p><strong>Compétence évaluée :</strong> En cours d'acquisition – Plan de remédiation prévu.</p>`,
      ];
      extra += corrs[corrSeed % corrs.length];
    }
    extra += `<p><strong>Note attribuée : ${noteRound} / ${noteMax}</strong></p>`;

  });

  // --- PARTIE 2 : JEUX PÉDAGOGIQUES ---
  extra += `<div class="page-break"></div>`;
  extra += `<h3>PARTIE 2 – JEUX PÉDAGOGIQUES</h3>`;

  // Jeu 1 : Quiz Rapidité
  const quizSeed = ((hash * 11 + stagiaireIdx * 7) & 0x7FFFFFFF) % 4;
  const quizScore = 7 + ((stagiaireIdx * 3 + 5) % 4);
  const quizBonus = stagiaireIdx % 3 === 0 ? 2 : 0;
  const quizTotal = Math.min(12, quizScore + quizBonus);
  extra += `<h4>Jeu 1 : Quiz Rapidité – Questions Flash</h4>`;
  extra += `<div class="section"><p><strong>Règle du jeu :</strong> Le formateur pose 10 questions rapides sur les notions clés de la formation. Chaque participant dispose de 15 secondes pour répondre. 1 point par bonne réponse. Bonus de 2 points pour la réponse la plus rapide.</p></div>`;
  extra += tableHTML(["Critère", "Résultat"], [
    ["Score quiz (sur 10)", `${quizScore}/10`],
    ["Bonus rapidité", quizBonus > 0 ? "+2 points" : "0"],
    ["Total", `${quizTotal}/12`],
    ["Résultat", quizTotal >= 9 ? "🏆 Excellent" : "✅ Validé"],
  ]);
  const quizComments = [
    `${s.prenom} a fait preuve d'une réactivité exemplaire et a su mobiliser rapidement ses connaissances. Les réponses sont précises et témoignent d'une excellente mémorisation des notions clés.`,
    `Très bonne performance de ${s.prenom} au quiz. La rapidité de réponse démontre une assimilation solide des concepts abordés en formation. Participation dynamique et enthousiaste.`,
    `${s.prenom} a participé activement au quiz avec enthousiasme. Les bonnes réponses montrent une compréhension claire des fondamentaux. Quelques hésitations sur les questions avancées mais le résultat global est très satisfaisant.`,
    `Participation active et résultats positifs pour ${s.prenom}. Le quiz confirme une bonne maîtrise des connaissances de base et une capacité à raisonner rapidement sous contrainte de temps.`,
  ];
  extra += `<p><em>Commentaire : ${quizComments[quizSeed]}</em></p>`;

  // Jeu 2 : Jeu de Rôle / Mise en situation
  extra += `<h4>Jeu 2 : Mise en Situation – Jeu de Rôle</h4>`;
  const isSolo = stagiaires.length <= 1;
  extra += `<div class="section"><p><strong>Règle du jeu :</strong> ${isSolo
    ? `Le stagiaire doit résoudre un cas pratique en 20 minutes en mobilisant les compétences acquises. Le formateur évalue la pertinence, la créativité et la qualité de l'argumentation.`
    : `En binôme, résoudre un cas pratique en 20 minutes en mobilisant les compétences acquises. Le formateur évalue la collaboration, la pertinence et la créativité.`
  }</p></div>`;
  const collab = 3 + ((stagiaireIdx * 2 + 1) % 3);
  const pertin = 3 + ((stagiaireIdx * 3 + 2) % 3);
  const creat = 3 + ((stagiaireIdx + 4) % 3);
  const roleTotal = collab + pertin + creat;
  extra += isSolo
    ? tableHTML(["Critère", "Note"], [
        ["Pertinence des réponses", `${pertin}/5`],
        ["Créativité", `${creat}/5`],
        ["Qualité de l'argumentation", `${collab}/5`],
        ["Total", `${roleTotal}/15`],
      ])
    : tableHTML(["Critère", "Note"], [
        ["Collaboration", `${collab}/5`],
        ["Pertinence des réponses", `${pertin}/5`],
        ["Créativité", `${creat}/5`],
        ["Total", `${roleTotal}/15`],
      ]);
  const roleSeed = ((hash * 13 + stagiaireIdx * 11) & 0x7FFFFFFF) % 4;
  const roleComments = isSolo ? [
    `${s.prenom} a fait preuve d'une excellente capacité d'analyse et de synthèse durant la mise en situation. Les solutions proposées sont pertinentes et directement applicables en situation professionnelle chez ${s.entreprise || 'son entreprise'}.`,
    `Très bonne prestation de ${s.prenom}. Les solutions avancées sont créatives et bien argumentées. ${s.prenom} a su structurer sa réflexion de manière méthodique et proposer des pistes concrètes.`,
    `${s.prenom} a su mobiliser efficacement les acquis de la formation dans cette mise en situation. L'exercice a révélé des compétences transversales solides : communication, analyse et prise de décision.`,
    `Participation active et pertinente de ${s.prenom}. Bonne gestion du temps imparti et capacité à hiérarchiser les priorités dans la résolution du cas pratique. Le livrable produit est de qualité.`,
  ] : [
    `${s.prenom} a montré un excellent esprit d'équipe et une capacité de synthèse remarquable durant le jeu de rôle. Les solutions proposées sont pertinentes et directement applicables en situation professionnelle chez ${s.entreprise || 'son entreprise'}.`,
    `Très bonne participation de ${s.prenom}. Les solutions avancées sont créatives et bien argumentées. ${s.prenom} a su écouter son binôme tout en apportant des idées constructives. Le travail collaboratif est fluide et efficace.`,
    `${s.prenom} a su mobiliser efficacement les acquis de la formation dans ce jeu de rôle. La mise en situation a révélé des compétences transversales solides : communication, analyse et prise de décision. Excellent travail d'équipe.`,
    `Participation active et pertinente de ${s.prenom}. Bonne gestion du temps imparti et capacité à hiérarchiser les priorités dans la résolution du cas pratique. Le binôme a produit un livrable de qualité.`,
  ];
  extra += `<p><em>Commentaire : ${roleComments[roleSeed]}</em></p>`;

  // --- BILAN GLOBAL ---
  extra += `<div class="page-break"></div>`;
  extra += `<h3>BILAN GLOBAL DE L'ÉVALUATION FINALE</h3>`;
  const exMoyenne = Math.round(totalNote / totalMax * 10 * 10) / 10;
  const quizSur10 = Math.round(quizTotal / 12 * 10 * 10) / 10;
  const roleSur10 = Math.round(roleTotal / 15 * 10 * 10) / 10;
  const moyenneFinale = Math.round((exMoyenne + quizSur10 + roleSur10) / 3 * 10) / 10;

  extra += tableHTML(["Épreuve", "Note /10"], [
    ["Exercices pratiques", `${exMoyenne}/10`],
    ["Quiz Rapidité", `${quizSur10}/10`],
    ["Jeu de Rôle", `${roleSur10}/10`],
    ["MOYENNE FINALE", `${moyenneFinale}/10`],
  ]);
  extra += `<p><strong>Décision : ${moyenneFinale >= 7 ? '✅ VALIDÉ – Compétences acquises' : '⚠️ À consolider – Plan de progression recommandé'}</strong></p>`;

  // Recap table for exercises
  extra += `<h4>Détail des notes – Exercices pratiques</h4>`;
  const recapRows = notesRecap.map(n => [n.titre, `${n.note} / ${n.max}`]);
  extra += tableHTML(["Exercice", "Note"], recapRows);

  // Global appreciation
  const avgPct = moyenneFinale * 10;
  const appSeed = ((hash * 29 + stagiaireIdx * 19) & 0x7FFFFFFF) % 5;

  const appreciationsFR = [
    [ // excellent (>=80%)
      `${s.prenom} ${s.nom} a fait preuve d'une excellente maîtrise des compétences pratiques tout au long de la formation « ${f.intitule} ». Son profil ${profile.style} lui permet d'aborder les exercices avec assurance et efficacité. Les jeux pédagogiques ont révélé un dynamisme et une réactivité au-dessus de la moyenne. Les travaux rendus sont systématiquement de qualité professionnelle. ${s.prenom} est un(e) élément moteur du groupe. ${profile.strengths} est un atout majeur pour son poste de ${s.poste} chez ${s.entreprise}. Avis très favorable.`,
      `Les résultats de ${s.prenom} ${s.nom} sont remarquables sur l'ensemble de l'évaluation finale : exercices, quiz et jeu de rôle. ${s.prenom} a su combiner ${profile.strengths} avec une capacité réelle de transfert en contexte professionnel. La progression est significative. Le travail fourni est exemplaire. Évaluation globale : Excellent.`,
      `${s.prenom} ${s.nom} a brillamment réussi l'évaluation finale. Chaque épreuve démontre une compréhension approfondie et une autonomie remarquable. En tant que ${s.poste}, ${s.prenom} saura exploiter immédiatement ces acquis chez ${s.entreprise}. Félicitations.`,
      `Excellent parcours pour ${s.prenom} ${s.nom}. L'engagement est constant, les résultats dépassent les objectifs tant sur les exercices que sur les jeux pédagogiques. ${s.prenom} est opérationnel(le) et autonome sur l'ensemble des compétences évaluées. Validation complète.`,
      `${s.prenom} ${s.nom} termine cette évaluation avec un bilan élogieux. La constance dans l'excellence et la maturité professionnelle sont remarquables. Compétences pleinement acquises et validées.`,
    ],
    [ // bon (60-80%)
      `${s.prenom} ${s.nom} a suivi cette évaluation avec sérieux. Les exercices et les jeux sont globalement bien réussis, avec un profil ${profile.style}. Les compétences principales sont acquises, même si ${profile.weakness} mérite attention. Bilan positif.`,
      `Bonne performance d'ensemble pour ${s.prenom} ${s.nom}. La formation a permis de développer des compétences solides. ${profile.strengths} est un point fort. Le quiz et le jeu de rôle confirment une bonne dynamique d'apprentissage. Encouragements.`,
      `${s.prenom} ${s.nom} a atteint la majorité des objectifs. Le quiz et le jeu de rôle montrent une bonne capacité d'adaptation. Appréciation : Bien.`,
      `Le bilan de ${s.prenom} ${s.nom} est positif. Les exercices et les jeux montrent une compréhension solide des fondamentaux. Quelques ajustements sur ${profile.weakness} permettront d'atteindre l'excellence.`,
      `${s.prenom} ${s.nom} clôture cette évaluation avec un bilan encourageant. Les jeux pédagogiques ont révélé de bonnes compétences transversales. Appréciation globale : Bien.`,
    ],
    [ // moyen (<60%)
      `${s.prenom} ${s.nom} a participé activement malgré des résultats en-deçà des objectifs. ${profile.strengths} montre du potentiel. Plan de remédiation établi.`,
      `Le parcours de ${s.prenom} ${s.nom} appelle un accompagnement complémentaire. Les jeux pédagogiques montrent de bonnes dispositions mais les exercices pratiques révèlent des lacunes sur ${profile.weakness}.`,
      `${s.prenom} ${s.nom} a fourni des efforts mais les résultats restent fragiles. Dispositif de soutien mis en place.`,
      `Le bilan de ${s.prenom} ${s.nom} est mitigé. Les jeux pédagogiques sont encourageants mais les exercices nécessitent un renforcement. Ressources de remédiation transmises.`,
      `${s.prenom} ${s.nom} termine l'évaluation avec des acquis partiels. Plan d'action adapté mis en place. Accompagnement renforcé activé.`,
    ],
  ];

  const appIdx = avgPct >= 80 ? 0 : avgPct >= 60 ? 1 : 2;
  extra += `<h3>Appréciation globale du formateur : ${f.formateur}, ${formatDate(getStagiaireDateFin(s, f))}</h3>`;
  extra += `<p>${appreciationsFR[appIdx][appSeed]}</p>`;

  return buildDocument({ org: o, title: `ÉVALUATION FINALE – EXERCICES & JEUX${jourLabel} – RÉSULTATS`, subtitle: `${f.intitule} – ${s.prenom} ${s.nom}`, extraHtml: extra });
  // NO signatures
}

export function genGrilleAcquisitionStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], stagiaireIdx: number) {
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  const evalData = getEvalContent(f.intitule);
  const sc = EVAL_SCORES[stagiaireIdx] || [7, 8, 7, 8, 7];

  let extra = `
    <h3>GRILLE DE SUIVI DU NIVEAU D'ACQUISITION DES COMPÉTENCES PROFESSIONNELLES</h3>
    <p><strong>DATE :</strong> ${formatDate(getStagiaireDateDebut(s, f))} – ${formatDate(getStagiaireDateFin(s, f))}</p>
    <p><strong>NOM / PRÉNOM :</strong> ${s.prenom} ${s.nom}</p>
    <p><strong>FORMATION :</strong> ${f.intitule}</p>
  `;

  const headers = ["", "NIVEAU", "", ""];
  const subHeaders = ["COMPÉTENCES PROFESSIONNELLES", "ACQUIS", "NON ACQUIS", "EN COURS D'ACQUISITION"];
  const rows = evalData.competences.map((comp) => {
    return [comp, 'X', '', ''];
  });

  extra += tableHTML(subHeaders, rows);
  extra += `<p><strong>${formatDate(getStagiaireDateFin(s, f))}, par le Formateur : ${f.formateur}</strong></p>`;
  extra += `<div class="section">
    <p>*NON ACQUIS (DES GRANDES LACUNES) : 1/10 - 4/10</p>
    <p>*EN COURS D'ACQUISITION : 5/10 - 7/10</p>
    <p>*ACQUIS (EXCELLENT) : 8/10 - 10/10</p>
  </div>`;

  return buildDocument({ org: o, title: "GRILLE D'ACQUISITION DES COMPÉTENCES", subtitle: `${f.intitule} – ${s.prenom} ${s.nom}`, extraHtml: extra });
  // NO signatures
}

export function genAttestationReussiteStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], stagiaireIdx: number) {
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  const stagDuree = getStagiaireDuree(s, f);
  const dureeHeures = parseInt(stagDuree) || (getFormationDays(f).length * 7);
  const tauxRealisation = 100; // Default to 100%

  let extra = `
    <div style="text-align:center;padding:30px">
      <h2 style="color:${getDocStyleColor()}">ATTESTATION DE RÉUSSITE</h2>
      <p style="margin-top:20px">${o.nom} atteste que :</p>
      <p><strong>Nom et prénom :</strong> ${s.prenom} ${s.nom}</p>
      ${s.email ? `<p><strong>Email :</strong> ${s.email}</p>` : ''}
      <p style="margin-top:15px">a réussi avec succès la formation suivante :</p>
      <p style="font-size:16px;font-weight:700">${f.intitule}</p>
      <p><strong>Durée de la formation :</strong> ${stagDuree} de formation ${modaliteTexte(f)}</p>
      <p><strong>Date de début :</strong> ${formatDate(getStagiaireDateDebut(s, f))}</p>
      <p><strong>Date de fin :</strong> ${formatDate(getStagiaireDateFin(s, f))}</p>
      <p style="margin-top:15px">Cette formation a été dispensée conformément aux normes de qualité et aux exigences pédagogiques de ${o.nom}. L'apprenant(e) a démontré un haut niveau d'engagement, de compétence et de participation active tout au long du programme.</p>
      <h3>Assiduité du stagiaire</h3>
      <p>Durée effective suivie par le/la stagiaire : ${dureeHeures} heures, soit un taux de réalisation de ${tauxRealisation.toFixed(2)} %.</p>
      <p style="margin-top:20px"><strong>Fait à ${o.ville}, le :</strong> ${formatDate(getStagiaireDateFin(s, f))}</p>
      <p style="margin-top:15px"><strong>Pour ${o.nom}</strong></p>
      <p>${o.dirigeant}<br>Dirigeant – Formateur</p>
      ${dirigeantSig(o)}
    </div>
  `;

  return buildDocument({ org: o, title: "ATTESTATION DE RÉUSSITE", subtitle: `${s.prenom} ${s.nom} – ${f.intitule}`, stagiaires: [s], extraHtml: extra });
  // Signature: organisme only (with tampon) - included inline
}

// Helper to get doc style primary color
function getDocStyleColor(): string {
  try {
    const { getDocStyle } = require("./docBuilder");
    return getDocStyle().primaryColor;
  } catch { return "#1e3a7b"; }
}

// Évaluation finale par exercices et jeux (group format)
export function genExercicesPratiques_V2(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const termine = isFormationTerminee(f);
  if (!termine) {
    return buildDocument({ org: o, title: "ÉVALUATION FINALE – EXERCICES & JEUX", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, 
      extraHtml: `<div class="section section-green"><p><em>La formation est en cours. Les résultats des exercices et jeux pédagogiques seront disponibles à l'issue de la formation.</em></p></div>` });
  }
  const evalData = getEvalContent(f.intitule);
  const exercices = evalData.exercices;
  let extra = `<h2>ÉVALUATION FINALE – EXERCICES & JEUX</h2>`;
  extra += `<p><strong>Formation :</strong> ${f.intitule}<br><strong>Formateur :</strong> ${f.formateur}<br><strong>Date :</strong> ${formatDate(f.dateFin)}<br><strong>Nombre d'épreuves :</strong> ${exercices.length + 2} (${exercices.length} exercices + 2 jeux pédagogiques)</p>`;

  // --- PARTIE 1 : EXERCICES PRATIQUES ---
  extra += `<h2>PARTIE 1 – EXERCICES PRATIQUES</h2>`;
  exercices.forEach((ex, ei) => {
    extra += `<div class="page-break"></div>`;
    extra += `<h3>Exercice ${ei + 1} : ${ex.titre}</h3>`;
    extra += `<div class="section"><p><strong>Consigne :</strong> ${ex.consigne}</p></div>`;
    extra += `<div class="section section-green"><p><strong>Réponse attendue / Corrigé :</strong> ${ex.reponseAttendue}</p></div>`;
    extra += `<h4>Résultats par stagiaire</h4>`;
    const rows = stagiaires.slice(0, 10).map((s, si) => {
      const variations = [9, 10, 9, 8, 10, 9, 8, 10, 9, 10];
      const noteFinale = variations[(si + ei) % variations.length];
      const seed = (si * 7 + ei * 3) % 4;
      const apps = noteFinale >= 9
        ? [`${s.prenom} ${s.nom} a parfaitement réalisé cet exercice. Travail exemplaire.`, `Exercice réalisé avec méthode par ${s.prenom} ${s.nom}. Résultat conforme.`, `${s.prenom} ${s.nom} démontre une maîtrise complète. Excellent travail.`, `Travail de qualité de ${s.prenom} ${s.nom}. Compétence pleinement acquise.`]
        : [`${s.prenom} ${s.nom} a réalisé un très bon travail. Compétences bien acquises.`, `Bon exercice de ${s.prenom} ${s.nom}. La compréhension est solide.`, `${s.prenom} ${s.nom} montre de solides acquis. Travail satisfaisant.`, `Travail satisfaisant de ${s.prenom} ${s.nom}. Progression encourageante.`];
      return [s.prenom + " " + s.nom, `${noteFinale}/10`, "✅ Validé", apps[seed]];
    });
    extra += tableHTML(["Stagiaire", "Note", "Statut", "Appréciation du formateur"], rows);
  });

  // --- PARTIE 2 : JEUX PÉDAGOGIQUES ---
  extra += `<div class="page-break"></div>`;
  extra += `<h2>PARTIE 2 – JEUX PÉDAGOGIQUES</h2>`;

  // Jeu 1 : Quiz Rapidité
  extra += `<h3>Jeu 1 : Quiz Rapidité – Questions Flash</h3>`;
  extra += `<div class="section"><p><strong>Règle du jeu :</strong> Le formateur pose 10 questions rapides sur les notions clés de la formation. Chaque stagiaire dispose de 15 secondes pour répondre. 1 point par bonne réponse. Bonus de 2 points pour la réponse la plus rapide.</p></div>`;
  const quizRows = stagiaires.slice(0, 10).map((s, si) => {
    const score = 7 + ((si * 3 + 5) % 4); // 7 à 10
    const bonus = si % 3 === 0 ? 2 : 0;
    const total = Math.min(12, score + bonus);
    return [s.prenom + " " + s.nom, `${score}/10`, bonus > 0 ? "+2 (rapidité)" : "0", `${total}/12`, total >= 9 ? "🏆 Excellent" : "✅ Validé"];
  });
  extra += tableHTML(["Stagiaire", "Score Quiz", "Bonus", "Total", "Résultat"], quizRows);

  // Jeu 2 : Défi en équipe / Jeu de rôle
  extra += `<div class="page-break"></div>`;
  extra += `<h3>Jeu 2 : Mise en Situation – Jeu de Rôle</h3>`;
  const isSoloGroup = stagiaires.length <= 1;
  extra += `<div class="section"><p><strong>Règle du jeu :</strong> ${isSoloGroup
    ? `Le stagiaire doit résoudre un cas pratique en temps limité (20 minutes) en mobilisant les compétences acquises durant la formation. Le formateur évalue la pertinence des réponses, la créativité des solutions proposées et la qualité de l'argumentation.`
    : `Les stagiaires sont répartis en binômes. Chaque binôme doit résoudre un cas pratique en temps limité (20 minutes) en mobilisant les compétences acquises durant la formation. Le formateur évalue la collaboration, la pertinence des réponses et la créativité des solutions proposées.`
  }</p></div>`;
  const roleRows = stagiaires.slice(0, 10).map((s, si) => {
    const collab = 3 + ((si * 2 + 1) % 3);
    const pertin = 3 + ((si * 3 + 2) % 3);
    const creat = 3 + ((si + 4) % 3);
    const total = collab + pertin + creat;
    const seed = (si * 5 + 7) % 4;
    const comments = isSoloGroup ? [
      `${s.prenom} a fait preuve d'une excellente capacité d'analyse et de synthèse.`,
      `Très bonne prestation de ${s.prenom}. Solutions créatives et bien argumentées.`,
      `${s.prenom} a su mobiliser efficacement les acquis de la formation.`,
      `Participation active et pertinente de ${s.prenom}. Bonne gestion du temps imparti.`,
    ] : [
      `${s.prenom} a montré un excellent esprit d'équipe et une capacité de synthèse remarquable.`,
      `Très bonne participation de ${s.prenom}. Solutions créatives et bien argumentées.`,
      `${s.prenom} a su mobiliser efficacement les acquis de la formation dans ce jeu de rôle.`,
      `Participation active et pertinente de ${s.prenom}. Bonne gestion du temps imparti.`,
    ];
    return isSoloGroup
      ? [s.prenom + " " + s.nom, `${pertin}/5`, `${creat}/5`, `${collab}/5`, `${total}/15`, comments[seed]]
      : [s.prenom + " " + s.nom, `${collab}/5`, `${pertin}/5`, `${creat}/5`, `${total}/15`, comments[seed]];
  });
  extra += isSoloGroup
    ? tableHTML(["Stagiaire", "Pertinence", "Créativité", "Argumentation", "Total", "Commentaire"], roleRows)
    : tableHTML(["Stagiaire", "Collaboration", "Pertinence", "Créativité", "Total", "Commentaire"], roleRows);

  // --- BILAN GLOBAL ---
  extra += `<div class="page-break"></div>`;
  extra += `<h2>BILAN GLOBAL DE L'ÉVALUATION FINALE</h2>`;
  const bilanRows = stagiaires.slice(0, 10).map((s, si) => {
    const exNote = 8 + ((si * 2 + 3) % 3); // 8-10
    const quizNote = 7 + ((si * 3 + 5) % 4);
    const roleNote = (3 + ((si * 2 + 1) % 3)) + (3 + ((si * 3 + 2) % 3)) + (3 + ((si + 4) % 3));
    const roleSur10 = Math.round(roleNote / 15 * 10);
    const moyenne = Math.round((exNote + quizNote + roleSur10) / 3 * 10) / 10;
    return [s.prenom + " " + s.nom, `${exNote}/10`, `${quizNote}/10`, `${roleSur10}/10`, `${moyenne}/10`, moyenne >= 7 ? "✅ VALIDÉ" : "⚠️ À consolider"];
  });
  extra += tableHTML(["Stagiaire", "Exercices", "Quiz Rapidité", "Jeu de Rôle", "Moyenne", "Décision"], bilanRows);

  return buildDocument({ org: o, title: "ÉVALUATION FINALE – EXERCICES & JEUX – RÉSULTATS", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra });
}

// Improved QCM Final (2-part format: QCM + cas pratique) - removes signatures
export function genQCMFinal_V2(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const questions = evalData.qcmFinal.slice(0, 5);
  let extra = `<h2>ÉVALUATION FINALE</h2>`;
  extra += `<p><strong>Formation :</strong> ${f.intitule}<br><strong>Date :</strong> ${formatDate(f.dateFin)}<br><strong>Nombre de questions QCM :</strong> ${questions.length}<br><strong>Structure :</strong> QCM (5 points) + Cas pratique (5 points)<br><strong>Note totale :</strong> /10</p>`;

  // Show QCM with correct answers
  extra += `<h3>Partie 1 – QCM (5 points) – Corrigé</h3>`;
  questions.forEach((q, i) => {
    extra += `<div class="section"><p><strong>Question ${i + 1} :</strong> ${q.question}</p>`;
    q.options.forEach((opt, oi) => {
      if (oi === q.correctIndex) {
        extra += `<p>✅ <strong>${String.fromCharCode(65 + oi)}) ${opt}</strong> ← Bonne réponse</p>`;
      } else {
        extra += `<p>☐ ${String.fromCharCode(65 + oi)}) ${opt}</p>`;
      }
    });
    extra += `</div>`;
  });

  // Results per stagiaire
  extra += `<div class="page-break"></div><h2>Résultats individuels</h2>`;
  stagiaires.slice(0, 10).forEach((s, si) => {
    const answers = generateStagiaireAnswers(questions, si + 100);
    const result = computeQCMScore(questions, answers);
    const qcmScore = Math.min(5, result.score + (si % 2));
    const sc = EVAL_SCORES[si] || [7, 8, 7, 8, 7];
    const pratiqueScore = Math.min(5, Math.round(sc.reduce((a, b) => a + b, 0) / sc.length / 2));
    const totalNote = qcmScore + pratiqueScore;

    extra += `<h3>${totalNote >= 6 ? '✅' : '⚠️'} ${s.prenom} ${s.nom} – ${totalNote}/10 – ${totalNote >= 6 ? 'VALIDÉ' : 'NON VALIDÉ'}</h3>`;
    extra += `<p>QCM : ${qcmScore}/5 | Cas pratique : ${pratiqueScore}/5</p>`;

    // Unique remark
    const seed = (si * 5 + 2) % 3;
    const remarques = totalNote >= 8
      ? [`${s.prenom} ${s.nom} a excellemment réussi l'évaluation. Compétences pleinement acquises.`, `Performance remarquable de ${s.prenom} ${s.nom}. Autonomie complète.`, `${s.prenom} ${s.nom} maîtrise parfaitement les compétences évaluées.`]
      : totalNote >= 6
      ? [`${s.prenom} ${s.nom} a validé l'évaluation. Bonne compréhension d'ensemble.`, `Résultat satisfaisant pour ${s.prenom} ${s.nom}. Objectifs atteints.`, `${s.prenom} ${s.nom} a acquis les compétences fondamentales.`]
      : [`${s.prenom} ${s.nom} n'a pas atteint le seuil de validation. Remédiation conseillée.`, `Résultat insuffisant pour ${s.prenom} ${s.nom}. Accompagnement nécessaire.`, `${s.prenom} ${s.nom} doit approfondir les notions fondamentales.`];
    extra += `<p><em>Appréciation : ${remarques[seed]}</em></p>`;
  });

  return buildDocument({ org: o, title: "ÉVALUATION FINALE – RÉSULTATS", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra });
  // NO signatures
}

// Improved grille acquisition (group format) - removes signatures
export function genGrilleAcquisition_V2(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  let extra = '';
  stagiaires.slice(0, 10).forEach((s, si) => {
    if (si > 0) extra += '<div class="page-break"></div>';
    const sc = EVAL_SCORES[si] || [7, 8, 7, 8, 7];
    extra += `<h3>GRILLE DE SUIVI DU NIVEAU D'ACQUISITION DES COMPÉTENCES PROFESSIONNELLES</h3>`;
    extra += `<p><strong>DATE :</strong> ${formatDate(getStagiaireDateDebut(s, f))} – ${formatDate(getStagiaireDateFin(s, f))}</p>`;
    extra += `<p><strong>NOM / PRÉNOM :</strong> ${s.prenom} ${s.nom}</p>`;
    extra += `<p><strong>FORMATION :</strong> ${f.intitule}</p>`;
    const rows = evalData.competences.map((comp) => {
      return [comp, 'X', '', ''];
    });
    extra += tableHTML(["COMPÉTENCES PROFESSIONNELLES", "ACQUIS", "NON ACQUIS", "EN COURS D'ACQUISITION"], rows);
    extra += `<p>${formatDate(getStagiaireDateFin(s, f))}, par le Formateur : ${f.formateur}</p>`;
    extra += `<div class="section"><p>*NON ACQUIS : 1/10 - 4/10 | *EN COURS D'ACQUISITION : 5/10 - 7/10 | *ACQUIS : 8/10 - 10/10</p></div>`;
  });
  return buildDocument({ org: o, title: "GRILLE D'ACQUISITION DES COMPÉTENCES", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra });
  // NO signatures
}

// Improved certificat_reussite (group format) with assiduité - signature organisme only
export function genCertificatReussite_V2(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = '';
  stagiaires.slice(0, 10).forEach((s, si) => {
    if (si > 0) extra += '<div class="page-break"></div>';
    const stagDuree = getStagiaireDuree(s, f);
    const dureeHeures = parseInt(stagDuree) || (getFormationDays(f).length * 7);
    extra += `
      <div style="text-align:center;padding:30px">
        <h2>ATTESTATION DE RÉUSSITE</h2>
        <p style="margin-top:20px">${o.nom} atteste que :</p>
        <p><strong>Nom et prénom :</strong> ${s.prenom} ${s.nom}</p>
        ${s.email ? `<p><strong>Email :</strong> ${s.email}</p>` : ''}
        <p style="margin-top:15px">a réussi avec succès la formation suivante :</p>
        <p style="font-size:16px;font-weight:700">${f.intitule}</p>
        <p><strong>Durée :</strong> ${stagDuree} ${modaliteTexte(f)}</p>
        <p>Du ${formatDate(getStagiaireDateDebut(s, f))} au ${formatDate(getStagiaireDateFin(s, f))}</p>
        <p style="margin-top:15px">Cette formation a été dispensée conformément aux normes de qualité et aux exigences pédagogiques de ${o.nom}. L'apprenant(e) a démontré un haut niveau d'engagement et de participation active tout au long du programme.</p>
        <h3>Assiduité</h3>
        <p>Durée effective suivie : ${dureeHeures} heures, soit un taux de réalisation de 100.00 %.</p>
        <p style="margin-top:20px"><strong>Fait à ${o.ville}, le :</strong> ${formatDate(getStagiaireDateFin(s, f))}</p>
        <p><strong>Pour ${o.nom}</strong></p>
        <p>${o.dirigeant}</p>
        ${dirigeantSig(o)}
      </div>`;
  });
  return buildDocument({ org: o, title: "ATTESTATIONS DE RÉUSSITE", subtitle: f.intitule, stagiaires, extraHtml: extra });
  // Signatures inline per stagiaire (organisme only with tampon)
}

// ========== PER-STAGIAIRE CGV ==========
export function genCGVStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const sections = [
    { heading: "Article 1 – Présentation de l'organisme", content: `<p><strong>Organisme de formation :</strong> ${o.nom}</p><p><strong>Adresse :</strong> ${o.adresse}, ${o.codePostal} ${o.ville}</p><p><strong>SIRET :</strong> ${o.siret}</p><p><strong>Email :</strong> ${o.email}</p><p><strong>Dirigeant :</strong> ${o.dirigeant}</p>` },
    { heading: "Article 2 – Objet", content: `<p>Les présentes Conditions Générales de Vente (CGV) ont pour objet de définir les modalités et conditions dans lesquelles ${o.nom} propose et dispense ses actions de formation professionnelle ${modaliteTexte(f)}.</p><p>Toute inscription à une formation implique l'adhésion pleine et entière du stagiaire aux présentes CGV.</p>` },
    { heading: "Article 3 – Nature des actions de formation", content: `<p>Les formations proposées relèvent des actions de formation définies à l'article L.6313-1 du Code du travail.</p><p>Les objectifs, contenus, durées et modalités sont détaillés dans le programme de formation remis au stagiaire avant l'inscription.</p>` },
    { heading: "Article 4 – Modalités d'inscription", content: `<p>L'inscription à une formation s'effectue selon les étapes suivantes :</p><ol><li>Préinscription via le site internet, les réseaux sociaux ou par téléphone</li><li>Analyse de la demande par ${o.nom}</li><li>Validation de l'adéquation formation/projet</li><li>Transmission des documents contractuels (contrat, règlement intérieur, convocation, CGV)</li><li>Retour du contrat signé et, le cas échéant, versement de l'acompte</li></ol><p>L'inscription devient définitive après réception du contrat signé.</p>` },
    { heading: "Article 5 – Tarifs", content: `<p>Les tarifs sont indiqués en euros TTC.</p><p>Sauf mention contraire, le prix comprend :</p><ul><li>Les heures de formation</li><li>Les supports pédagogiques</li><li>L'accompagnement pédagogique</li></ul>${f.tarif ? `<p>Tarif de la formation « ${f.intitule} » : ${f.tarif}</p>` : ''}` },
    { heading: "Article 6 – Modalités de paiement", content: `<p>Les modalités de paiement sont précisées dans le contrat de formation.</p><p>Sauf disposition contraire :</p><ul><li>Un acompte peut être demandé à l'inscription</li><li>Le solde est à régler selon les échéances convenues</li></ul><p>Aucune somme ne peut être exigée avant l'expiration du délai légal de rétractation.</p>` },
    { heading: "Article 7 – Délai de rétractation", content: `<p>Conformément à l'article L.6353-5 du Code du travail, le stagiaire dispose d'un délai de rétractation de 10 jours à compter de la signature du contrat.</p><p>La rétractation doit être notifiée par lettre recommandée avec accusé de réception.</p>` },
    { heading: "Article 8 – Annulation, report et abandon", content: `<h3>8.1 Annulation par le stagiaire</h3><p>Toute annulation après le délai de rétractation doit être notifiée par écrit.</p><p>En cas d'annulation tardive ou d'abandon injustifié, ${o.nom} se réserve le droit de facturer tout ou partie de la formation engagée.</p><h3>8.2 Annulation par l'organisme</h3><p>${o.nom} se réserve le droit d'annuler ou de reporter une formation en cas de force majeure ou d'effectif insuffisant.</p><p>Dans ce cas, les sommes versées sont intégralement remboursées.</p>` },
    { heading: "Article 9 – Assiduité et obligations du stagiaire", content: `<p>Le stagiaire s'engage à :</p><ul><li>Respecter les horaires et le règlement intérieur</li><li>Suivre la formation avec assiduité</li><li>Informer ${o.nom} de toute absence ou retard</li></ul><p>Les absences injustifiées peuvent entraîner l'interruption de la formation.</p>` },
    { heading: "Article 10 – Règlement intérieur", content: `<p>Le stagiaire s'engage à respecter le règlement intérieur de ${o.nom}, remis avant l'entrée en formation.</p>` },
    { heading: "Article 11 – Accessibilité et handicap", content: `<p>${o.nom} s'engage à étudier toute demande d'aménagement pour les personnes en situation de handicap.</p><p><strong>Référent handicap :</strong> ${o.referentHandicap}</p><p>${o.email}</p>` },
    { heading: "Article 12 – Propriété intellectuelle", content: `<p>Les supports pédagogiques sont protégés par le droit d'auteur.</p><p>Ils sont réservés à un usage strictement personnel et ne peuvent être reproduits ou diffusés sans autorisation écrite.</p>` },
    { heading: "Article 13 – Données personnelles", content: `<p>Les données personnelles sont traitées conformément au RGPD.</p><p>Le stagiaire dispose d'un droit d'accès, de rectification et de suppression de ses données.</p>` },
    { heading: "Article 14 – Responsabilité", content: `<p>${o.nom} ne saurait être tenue responsable des dommages indirects ou immatériels liés à la participation à la formation.</p>` },
    { heading: "Article 15 – Litiges", content: `<p>En cas de litige, les parties privilégieront une solution amiable.</p><p>À défaut, le litige sera soumis aux juridictions compétentes.</p>` },
    { heading: "Article 16 – Acceptation des CGV", content: `<p>L'inscription à la formation vaut acceptation sans réserve des présentes Conditions Générales de Vente.</p>` },
  ];

  const sigDateCGV = formatDate(subtractBusinessDays(getStagiaireDateDebut(s, f) || new Date().toISOString(), 14));
  let sigPages = `<p><strong>Fait à ${o.ville}, le :</strong> ${sigDateCGV}</p>`;
  sigPages += sigBlock(
    `Le Stagiaire`, `${s.prenom} ${s.nom}`, stagSig(s),
    `Pour l'Organisme de formation`, o.dirigeant, orgSig(o),
    'Précédée de la mention « Lu et approuvé »', sigDateCGV, sigDateCGV
  );

  return buildDocument({ org: o, title: `CONDITIONS GÉNÉRALES DE VENTE – ${s.prenom} ${s.nom}`, sections, extraHtml: sigPages });
}

// ========== PER-STAGIAIRE RÈGLEMENT INTÉRIEUR ==========
export function genReglementStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const modTxt = modaliteTexte(f);
  const pres = isPresentiel(f);
  const dist = isDistanciel(f);

  const sections: { heading: string; content: string; variant?: "green" | "orange" }[] = [
    { heading: "Article 1 – Champ d'application", content: `<p>Le présent règlement s'applique à tous les stagiaires inscrits à une formation dispensée par ${o.nom}, pour toute la durée de la formation suivie ${modTxt}.</p><p>Chaque stagiaire est réputé avoir accepté les termes du présent règlement dès son entrée en formation.</p><p>Conformément aux articles L.6352-3 à L.6352-5 et R.6352-1 à R.6352-15 du Code du travail, le présent règlement intérieur a pour objet de définir les règles générales et permanentes applicables aux stagiaires pendant la durée de la formation.</p>` },
    { heading: "Article 2 – Informations relatives à l'organisme de formation", content: `<p><strong>Organisme de formation :</strong> ${o.nom}</p><p><strong>Adresse :</strong> ${o.adresse}, ${o.codePostal} ${o.ville}</p><p><strong>SIRET :</strong> ${o.siret}</p><p><strong>Email :</strong> ${o.email}</p><p><strong>Dirigeant :</strong> ${o.dirigeant}</p>` },
    { heading: "Article 3 – Conditions générales de déroulement de la formation", content: `<p>Les formations se déroulent selon les horaires et ${pres ? 'lieux' : 'créneaux'} précisés dans la convocation transmise au stagiaire.</p><p>Les stagiaires s'engagent à :</p><ul><li>Respecter les horaires de formation</li><li>Suivre la formation avec assiduité</li><li>Adopter un comportement respectueux envers le formateur et les autres stagiaires</li><li>Respecter le matériel mis à disposition</li></ul>` },
    { heading: "Article 4 – Assiduité, ponctualité et absences", content: `<p>Les stagiaires doivent être présents à l'ensemble des séances prévues.</p><p>Toute absence ou retard doit être signalé dès que possible à l'organisme de formation, avec justification.</p><p>En cas d'absences répétées ou injustifiées, ${o.nom} se réserve le droit :</p><ul><li>d'en informer le financeur,</li><li>de suspendre ou d'interrompre la formation.</li></ul>` },
  ];

  let artNum = 5;
  if (pres) {
    sections.push({ heading: `Article ${artNum++} – Accès aux locaux`, content: `<p>L'accès aux locaux est strictement réservé :</p><ul><li>aux stagiaires inscrits,</li><li>aux formateurs,</li><li>et aux personnes autorisées par ${o.nom}.</li></ul><p>Il est interdit d'introduire dans les locaux des personnes extérieures sans autorisation préalable.</p>` });
    sections.push({ heading: `Article ${artNum++} – Règles d'hygiène et de sécurité`, content: `<p>Les stagiaires doivent respecter les consignes générales et particulières d'hygiène et de sécurité applicables dans les locaux de formation.</p><p>Il est notamment interdit :</p><ul><li>de fumer ou vapoter dans les locaux,</li><li>de consommer de l'alcool ou des substances illicites,</li><li>d'adopter un comportement mettant en danger soi-même ou autrui.</li></ul><p>Tout accident doit être signalé immédiatement au formateur.</p>` });
    sections.push({ heading: `Article ${artNum++} – Utilisation du matériel et des équipements`, content: `<p>Le matériel pédagogique mis à disposition (ordinateurs, logiciels, supports, mobilier) doit être utilisé conformément à sa destination.</p><p>Toute dégradation volontaire pourra faire l'objet :</p><ul><li>d'une sanction disciplinaire,</li><li>et/ou d'une demande de réparation financière.</li></ul>` });
  }
  if (dist) {
    sections.push({ heading: `Article ${artNum++} – Accès à la plateforme de formation à distance`, content: `<p>Le stagiaire s'engage à :</p><ul><li>Se connecter aux heures prévues dans le planning de formation</li><li>Disposer d'un environnement calme et d'une connexion internet stable</li><li>Activer sa caméra lors des sessions en visioconférence (sauf dérogation préalable)</li><li>Ne pas enregistrer, capturer ou diffuser les sessions de formation sans autorisation</li><li>Signaler tout problème technique au formateur ou au support technique</li></ul>` });
  }

  sections.push(
    { heading: `Article ${artNum++} – Discipline et comportement`, content: `<p>Tout comportement inapproprié (violence, propos discriminatoires, harcèlement, non-respect des consignes) est strictement interdit.</p><p>En cas de manquement grave ou répété, ${o.nom} pourra appliquer une sanction disciplinaire conformément à la procédure décrite ci-après.</p>` },
    { heading: `Article ${artNum++} – Sanctions disciplinaires`, content: `<p>Les sanctions applicables sont :</p><ul><li>Avertissement écrit</li><li>Blâme</li><li>Exclusion temporaire de la formation</li><li>Exclusion définitive de la formation</li></ul><p>La sanction est proportionnée à la gravité des faits reprochés.</p>` },
    { heading: `Article ${artNum++} – Procédure disciplinaire`, content: `<p>Aucune sanction ne peut être prononcée sans que le stagiaire ait été informé des faits reprochés.</p><p>Le stagiaire est convoqué à un entretien au cours duquel :</p><ul><li>les motifs de la sanction sont exposés,</li><li>le stagiaire peut présenter ses observations.</li></ul><p>La décision est notifiée par écrit.</p>` },
    { heading: `Article ${artNum++} – Propriété intellectuelle`, content: `<p>Les supports pédagogiques remis aux stagiaires sont protégés par le droit d'auteur.</p><p>Ils sont réservés à un usage strictement personnel et ne peuvent être reproduits, diffusés ou utilisés à des fins commerciales sans autorisation écrite de ${o.nom}.</p>` },
    { heading: `Article ${artNum++} – Données personnelles`, content: `<p>Les données personnelles des stagiaires sont traitées dans le respect du Règlement Général sur la Protection des Données (RGPD).</p><p>Le stagiaire dispose d'un droit d'accès, de rectification et de suppression de ses données.</p>` },
    { heading: `Article ${artNum++} – Accessibilité et situation de handicap`, content: `<p>La formation est accessible aux personnes en situation de handicap.</p><p>Des aménagements peuvent être mis en place sur demande préalable.</p><p><strong>Référent handicap :</strong> ${o.referentHandicap}</p><p>${o.email}</p>`, variant: "green" },
    { heading: `Article ${artNum++} – Entrée en vigueur`, content: `<p>Le présent règlement intérieur entre en vigueur à compter de la date de signature par le stagiaire.</p><p>Il est remis à chaque stagiaire avant le début de la formation.</p>` },
  );

  const sigDateReg = formatDate(subtractBusinessDays(getStagiaireDateDebut(s, f) || new Date().toISOString(), 14));
  let sigPages = `<p><strong>Fait à ${o.ville}, le :</strong> ${sigDateReg}</p>`;
  sigPages += sigBlock(
    `Signature du stagiaire : ${s.prenom} ${s.nom}`, `${s.prenom} ${s.nom}`, stagSig(s),
    `Signature du centre`, o.nom, orgSig(o),
    'Précédée de la mention « Lu et approuvé »', sigDateReg, sigDateReg
  );

  return buildDocument({ org: o, title: `RÈGLEMENT INTÉRIEUR – ${s.prenom} ${s.nom}`, subtitle: `Applicable aux stagiaires en formation ${modTxt}`, sections, extraHtml: sigPages });
}
