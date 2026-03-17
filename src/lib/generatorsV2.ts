// Improved generators for IND 9, 10, 11 - Qualiopi compliant (reference: Select Formation docs)
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, tableHTML, formatDate, subtractBusinessDays } from "./docBuilder";
import { EVAL_SCORES, getFormationDays } from "./sampleData";
import { getEvalContent, generateStagiaireAnswers, computeQCMScore, getQuestionsOuvertes, generateStagiaireOpenAnswers } from "./evalContent";

// ========== HELPERS ==========

function stagSig(s: StagiaireInfo): string {
  return s.signatureUrl
    ? `<img src="${s.signatureUrl}" alt="Signature ${s.prenom} ${s.nom}" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />`
    : `<p style="font-style:italic;color:#999;margin-top:10px">Signé par ${s.prenom} ${s.nom}</p>`;
}

function orgSig(o: OrganismeInfo): string {
  let h = '';
  if (o.tamponUrl) {
    // If tampon exists, show only tampon (no signature)
    h += `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />`;
  } else if (o.signatureUrl) {
    h += `<img src="${o.signatureUrl}" alt="Signature" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />`;
  } else {
    h += `<p style="font-style:italic;color:#999;margin-top:10px">Signé par ${o.dirigeant}</p>`;
  }
  return h;
}

function modaliteTexte(f: FormationInfo): string {
  const m = (f.modalites || '').toLowerCase();
  if (m.includes('mixte')) return 'en présentiel et en distanciel (formation mixte)';
  if (m.includes('distanciel') || m.includes('e-learning') || m.includes('foad')) return 'en distanciel';
  return 'en présentiel';
}
function isPresentiel(f: FormationInfo): boolean { const m = (f.modalites||'').toLowerCase(); return !m.includes('distanciel') && !m.includes('e-learning') && !m.includes('foad') || m.includes('mixte'); }
function isDistanciel(f: FormationInfo): boolean { const m = (f.modalites||'').toLowerCase(); return m.includes('distanciel') || m.includes('e-learning') || m.includes('foad') || m.includes('mixte'); }

function sigBlock(label1: string, nom1: string, sig1Html: string, label2: string, nom2: string, sig2Html: string, mention?: string): string {
  const mentionHtml = mention ? `<p style="font-style:italic;font-size:11px">(${mention})</p>` : '';
  return `<div class="signature-block-2">
    <div class="sig-box"><p class="sig-label">${label1}</p><p>Nom : ${nom1}</p>${mentionHtml}<p>Signature :</p>${sig1Html}</div>
    <div class="sig-box"><p class="sig-label">${label2}</p><p>Nom : ${nom2}</p>${mentionHtml}<p>Signature :</p>${sig2Html}</div>
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
    sigPages += `<p><strong>Fait à ${o.ville}, le :</strong> ${formatDate(subtractBusinessDays(f.dateDebut || new Date().toISOString(), 14))}</p>`;
    sigPages += sigBlock(
      `Le Stagiaire`, `${s.prenom} ${s.nom}`, stagSig(s),
      `Pour l'Organisme de formation`, o.dirigeant, orgSig(o),
      'Précédée de la mention « Lu et approuvé »'
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
    sigPages += `<p><strong>Fait à ${o.ville}, le :</strong> ${formatDate(subtractBusinessDays(f.dateDebut || new Date().toISOString(), 14))}</p>`;
    sigPages += sigBlock(
      `Signature du stagiaire : ${s.prenom} ${s.nom}`, `${s.prenom} ${s.nom}`, stagSig(s),
      `Signature du centre`, o.nom, orgSig(o),
      'Précédée de la mention « Lu et approuvé »'
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
      <h3>Dates de la formation</h3><p>Du : ${formatDate(f.dateDebut)}<br>Au : ${formatDate(f.dateFin)}</p>
      <h3>Horaires</h3><p>De : 09h00<br>À : 17h00</p>
      <h3>Durée totale</h3><p>${f.duree}</p>
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
      <p><strong>Fait à ${o.ville}, le :</strong> ${formatDate(subtractBusinessDays(f.dateDebut || new Date().toISOString(), 14))}</p>
      <p><strong>Pour ${o.nom}</strong></p>
      <p>${o.dirigeant}<br>Président – Formateur</p>
      ${orgSig(o)}
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
      <p><strong>Durée totale :</strong> ${f.duree}<br><strong>Dates :</strong> du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}<br><strong>Horaires :</strong> de 09h00 à 17h00<br><strong>Modalité :</strong> Formation ${modaliteTexte(f)}${isPresentiel(f) ? `<br><strong>Lieu :</strong> ${f.lieu}` : ''}</p>
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
      <p><strong>Coût total de la formation :</strong> ${f.tarif}</p>
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
      <p><strong>Fait à ${o.ville}, le :</strong> ${formatDate(subtractBusinessDays(f.dateDebut || new Date().toISOString(), 14))}</p>
    `;
    extra += sigBlock(
      `Pour l'Organisme de formation<br>${o.nom}`, o.dirigeant, orgSig(o),
      `Le Stagiaire`, `${s.prenom} ${s.nom}`, stagSig(s),
      'Précédée de la mention « Lu et approuvé »'
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
    <h3>Dates de la formation</h3><p>Du : ${formatDate(f.dateDebut)}<br>Au : ${formatDate(f.dateFin)}</p>
    <h3>Horaires</h3><p>De : 09h00<br>À : 17h00</p>
    <h3>Durée totale</h3><p>${f.duree}</p>
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
    <p><strong>Fait à ${o.ville}, le :</strong> ${formatDate(subtractBusinessDays(f.dateDebut || new Date().toISOString(), 14))}</p>
    <p><strong>Pour ${o.nom}</strong></p>
    <p>${o.dirigeant}<br>Président – Formateur</p>
    ${orgSig(o)}
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
    <p><strong>Durée totale :</strong> ${f.duree}<br><strong>Dates :</strong> du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}<br><strong>Horaires :</strong> de 09h00 à 17h00<br><strong>Modalité :</strong> Formation ${modaliteTexte(f)}${isPresentiel(f) ? `<br><strong>Lieu :</strong> ${f.lieu}` : ''}</p>
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
    <p><strong>Coût total de la formation :</strong> ${f.tarif}</p>
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
    <p><strong>Fait à ${o.ville}, le :</strong> ${formatDate(subtractBusinessDays(f.dateDebut || new Date().toISOString(), 14))}</p>
  `;
  extra += sigBlock(
    `Pour l'Organisme de formation<br>${o.nom}`, o.dirigeant, orgSig(o),
    `Le Stagiaire`, `${s.prenom} ${s.nom}`, stagSig(s),
    'Précédée de la mention « Lu et approuvé »'
  );
  return buildDocument({ org: o, title: `CONTRAT DE FORMATION – ${s.prenom} ${s.nom}`, extraHtml: extra });
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
      extra += `<h3>Date : ${day}</h3>`;
      extra += `<p><strong>Formateur :</strong> ${f.formateur}<br><strong>Formation :</strong> ${f.intitule}</p>`;
      let rows: string[][] = [];
      stagiaires.slice(0, 10).forEach(s => {
        rows.push([
          day, 'Matin',
          `${s.prenom} ${s.nom}${s.signatureUrl ? `<br><img src="${s.signatureUrl}" alt="Sig" style="max-height:35px;max-width:80px;object-fit:contain" />` : `<br><span style="font-style:italic;color:#999;font-size:10px">Signé ${s.prenom[0]}.${s.nom}</span>`}`,
          `${f.formateur}${o.tamponUrl ? `<br><img src="${o.tamponUrl}" alt="Tampon" style="max-height:35px;max-width:80px;object-fit:contain" />` : (o.signatureUrl ? `<br><img src="${o.signatureUrl}" alt="Sig" style="max-height:35px;max-width:80px;object-fit:contain" />` : '')}`
        ]);
        rows.push([
          '', 'Après-midi',
          `${s.prenom} ${s.nom}${s.signatureUrl ? `<br><img src="${s.signatureUrl}" alt="Sig" style="max-height:35px;max-width:80px;object-fit:contain" />` : `<br><span style="font-style:italic;color:#999;font-size:10px">Signé ${s.prenom[0]}.${s.nom}</span>`}`,
          `${f.formateur}${o.tamponUrl ? `<br><img src="${o.tamponUrl}" alt="Tampon" style="max-height:35px;max-width:80px;object-fit:contain" />` : (o.signatureUrl ? `<br><img src="${o.signatureUrl}" alt="Sig" style="max-height:35px;max-width:80px;object-fit:contain" />` : '')}`
        ]);
      });
      extra += tableHTML(["Date", "Horaires", "Prénom et nom, Signature Du Stagiaire", "Prénom et nom du Formateur"], rows);
    });
  }
  if (dist && !pres) {
    // Distanciel: rapport de connexion
    extra += `<h3>Rapport de connexion – Formation à distance</h3>`;
    const rows: string[][] = [];
    days.forEach(day => {
      stagiaires.slice(0, 10).forEach(s => {
        const seed = (s.nom.charCodeAt(0) + day.charCodeAt(0)) % 5;
        const connexion = `0${8 + seed % 2}h${seed * 5 < 10 ? '0' : ''}${seed * 5}`;
        const deconnexion = `1${6 + seed % 2}h${(seed * 7) % 60 < 10 ? '0' : ''}${(seed * 7) % 60}`;
        rows.push([s.prenom + ' ' + s.nom, day, connexion, deconnexion, `${7 + seed % 2}h${Math.abs(seed * 2 - 5) * 10}min`]);
      });
    });
    extra += tableHTML(["Stagiaire", "Date", "Heure connexion", "Heure déconnexion", "Durée"], rows.slice(0, 30));
  }

  return buildDocument({ org: o, title: pres ? "FEUILLE D'ÉMARGEMENT" : "RAPPORT DE CONNEXION", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra });
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
      formatDate(f.dateDebut), formatDate(f.dateFin),
      formatDate(f.dateDebut), 'aucune', 'aucune', 'aucune',
      ...presences,
      '', `${avg}/10`, avg >= 6 ? 'oui' : 'non', 'oui'
    ];
  });

  return buildDocument({ org: o, title: "TABLEAU DE SUIVI DU PARCOURS BÉNÉFICIAIRES ET ADAPTATIONS", subtitle: f.intitule, formation: f, showFormationInfo: true,
    table: { headers, rows } });
  // NO signatures
}

// ===================== IND 11 =====================

export function genEvaluationFinaleStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], stagiaireIdx: number) {
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  const evalData = getEvalContent(f.intitule);
  const questions = evalData.qcmFinal.slice(0, 5); // 5 QCM questions
  const answers = generateStagiaireAnswers(questions, stagiaireIdx + 100);
  const result = computeQCMScore(questions, answers);
  const qcmScore = Math.min(5, result.score + (stagiaireIdx % 2)); // boost slightly

  let extra = `
    <h2>Évaluation Finale – ${f.intitule}</h2>
    <p><strong>Nom du stagiaire :</strong> ${s.prenom} ${s.nom}</p>
    <p><strong>Date :</strong> ${formatDate(f.dateFin)}</p>
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

  // Calculate number of exercise blocks: 1 block per 2 days of training (minimum 1)
  const days = getFormationDays(f);
  const nbJours = days.length;
  const nbBlocks = Math.max(1, Math.ceil(nbJours / 2));
  const EXERCICES_PER_BLOCK = 2;

  // Total exercises needed = nbBlocks × 2
  const totalExNeeded = nbBlocks * EXERCICES_PER_BLOCK;

  // Build exercise pool: use available ones, generate extras if needed
  const exercices = [...allExercices];
  for (let i = allExercices.length; i < totalExNeeded; i++) {
    const blockIdx = Math.floor(i / EXERCICES_PER_BLOCK);
    const jourDebut = blockIdx * 2 + 1;
    const jourFin = Math.min(blockIdx * 2 + 2, nbJours);
    exercices.push({
      titre: `Exercice ${i + 1} : Cas pratique – Jour ${jourDebut}-${jourFin}`,
      consigne: `À partir de la situation professionnelle présentée, appliquez les compétences acquises durant les jours ${jourDebut} et ${jourFin} de la formation « ${f.intitule} » pour produire le livrable demandé.`,
      reponseAttendue: `Application des acquis des jours ${jourDebut}-${jourFin} : mise en pratique structurée, utilisation des outils et méthodes vus en formation, résultat conforme aux attentes professionnelles.`,
    });
  }

  // Each block file contains 2 exercises
  const blockStart = exerciceIdx !== undefined ? exerciceIdx * EXERCICES_PER_BLOCK : 0;
  const blockEnd = exerciceIdx !== undefined ? blockStart + EXERCICES_PER_BLOCK : totalExNeeded;
  const selectedExercices = exercices.slice(blockStart, Math.min(blockEnd, exercices.length));

  const jourLabel = exerciceIdx !== undefined && nbBlocks > 1
    ? ` – Jour ${exerciceIdx * 2 + 1}-${Math.min(exerciceIdx * 2 + 2, nbJours)}`
    : '';

  // Date of exercise = last day of the 2-day block (or last day of formation for last block)
  const getExerciseDate = (exIdx: number): string => {
    const jourFin = Math.min(exIdx * 2 + 2, nbJours);
    if (days.length >= jourFin && f.dateDebut) {
      return days[jourFin - 1];
    }
    return formatDate(f.dateFin);
  };

  const exerciseDate = exerciceIdx !== undefined ? getExerciseDate(exerciceIdx) : formatDate(f.dateFin);

  let extra = `
    <h2>EXERCICE PRATIQUE${jourLabel} – FORMATION ${f.intitule.toUpperCase()}</h2>
    <p><strong>Nom et prénom :</strong> ${s.prenom} ${s.nom}</p>
    <p><strong>Date :</strong> ${exerciseDate}</p>
  `;

  const hash = (s.nom + s.prenom).split("").reduce((a: number, c: string) => a + c.charCodeAt(0), 0);
  const noteMax = 5;
  let totalNote = 0;
  let totalMax = 0;
  const notesRecap: { titre: string; note: number; max: number }[] = [];

  selectedExercices.forEach((ex, localIdx) => {
    const ei = blockStart + localIdx; // real exercise index for seed uniqueness
    const baseScore = sc[ei % sc.length];
    // More varied notes based on stagiaire hash + exercise index
    const noteVariation = ((hash * 7 + ei * 13 + stagiaireIdx * 3) % 5) * 0.5 - 1; // -1 to +1
    const rawNote = baseScore >= 9 ? 5 : baseScore >= 8 ? 4.5 : baseScore >= 7 ? 4 : baseScore >= 6 ? 3.5 : baseScore >= 5 ? 3 : baseScore >= 4 ? 2.5 : baseScore >= 3 ? 2 : 1.5;
    const note = Math.max(1, Math.min(5, rawNote + noteVariation * 0.5));
    const noteRound = Math.round(note * 2) / 2; // round to 0.5
    totalNote += noteRound;
    totalMax += noteMax;
    notesRecap.push({ titre: ex.titre, note: noteRound, max: noteMax });

    if (localIdx > 0) extra += `<br/>`;
    extra += `<h3>${ex.titre}</h3>`;
    extra += `<p><strong>Consigne :</strong></p><p>${ex.consigne}</p>`;
    extra += `<p><strong>Travail réalisé par ${s.prenom} ${s.nom} :</strong></p>`;

    // Generate truly unique concrete response based on exercise, score and stagiaire identity
    const seed = ((hash * 13 + stagiaireIdx * 7 + ei * 11) & 0x7FFFFFFF) % 4;
    const repBase = ex.reponseAttendue;
    // Personalized response elements based on stagiaire name hash
    const nameHash = ((hash * 31 + stagiaireIdx * 17) & 0x7FFFFFFF);
    const personalDetails = [
      `${s.prenom} a pris l'initiative de vérifier chaque étape avant de passer à la suivante`,
      `${s.prenom} a commencé par relire attentivement la consigne avant de se lancer`,
      `${s.prenom} a d'abord fait un brouillon avant de rédiger sa réponse finale`,
      `${s.prenom} a posé une question de clarification au formateur avant de commencer`,
      `${s.prenom} a utilisé les notes prises pendant le cours pour s'aider`,
      `${s.prenom} a travaillé de manière méthodique en suivant les étapes dans l'ordre`,
    ];
    const personalDetail = personalDetails[(nameHash + ei) % personalDetails.length];

    if (noteRound >= 4.5) {
      const variants = [
        `<p>${repBase}</p><p>${personalDetail}. Le travail est complet et soigné. ${s.prenom} a ajouté des éléments supplémentaires montrant une compréhension approfondie du sujet. La présentation est professionnelle et le résultat directement exploitable.</p>`,
        `<p>${repBase}</p><p>${personalDetail}. ${s.prenom} a réalisé l'exercice avec une grande autonomie. Toutes les étapes ont été respectées méthodiquement. Le rendu final dépasse les attendus avec une mise en forme soignée.</p>`,
        `<p>${repBase}</p><p>${personalDetail}. Travail remarquable de ${s.prenom}. La démarche est structurée, chaque étape est documentée. Le résultat est conforme et prêt pour une utilisation professionnelle.</p>`,
        `<p>${repBase}</p><p>${personalDetail}. ${s.prenom} a démontré une excellente maîtrise. Le travail est rigoureux, les consignes sont parfaitement respectées. Des initiatives pertinentes ont été prises pour enrichir le rendu.</p>`,
      ];
      extra += variants[seed];
    } else if (noteRound >= 3.5) {
      const partialRep = repBase.split('.').slice(0, Math.max(2, Math.ceil(repBase.split('.').length * 0.7))).join('.') + '.';
      const omissions = [
        `La mise en forme finale n'a pas été finalisée dans le temps imparti`,
        `Un détail technique a été omis dans la dernière étape`,
        `La vérification des résultats intermédiaires a été insuffisante`,
        `Une erreur mineure de méthodologie a été corrigée en cours d'exercice`,
      ];
      const omission = omissions[(nameHash + ei * 3) % omissions.length];
      const variants = [
        `<p>${partialRep}</p><p>${personalDetail}. ${s.prenom} a bien suivi la majorité des consignes. ${omission}. L'ensemble reste satisfaisant.</p>`,
        `<p>${partialRep}</p><p>${personalDetail}. Bonne réalisation de ${s.prenom}. Les étapes principales sont correctement exécutées. ${omission}, mais l'ensemble est de bonne qualité.</p>`,
        `<p>${partialRep}</p><p>${personalDetail}. ${s.prenom} a produit un travail de bonne qualité. La compréhension du sujet est démontrée. ${omission}.</p>`,
        `<p>${partialRep}</p><p>${personalDetail}. Le travail de ${s.prenom} est globalement conforme aux attendus. Les points essentiels sont traités correctement. ${omission}.</p>`,
      ];
      extra += variants[seed];
    } else if (noteRound >= 2.5) {
      const partialRep = repBase.split('.').slice(0, Math.max(1, Math.ceil(repBase.split('.').length * 0.4))).join('.') + '.';
      const difficulties = [
        `a hésité longuement sur la méthodologie à appliquer`,
        `a dû recommencer l'exercice après une première tentative infructueuse`,
        `a sollicité l'aide du formateur à plusieurs reprises`,
        `s'est concentré(e) sur les premières étapes mais n'a pas pu finir`,
      ];
      const difficulty = difficulties[(nameHash + ei * 5) % difficulties.length];
      const variants = [
        `<p>${partialRep}</p><p>${s.prenom} ${difficulty}. La compréhension du principe général est là mais la mise en application reste partielle. Plusieurs étapes importantes n'ont pas été complétées.</p>`,
        `<p>${partialRep}</p><p>${s.prenom} ${difficulty}. Le travail montre une compréhension de base du sujet. Cependant, les consignes n'ont été que partiellement suivies.</p>`,
        `<p>${partialRep}</p><p>${s.prenom} ${difficulty}. L'aide du formateur a été nécessaire pour avancer. Le résultat final est incomplet mais montre une volonté de progresser.</p>`,
        `<p>${partialRep}</p><p>${s.prenom} ${difficulty}. Les premières étapes sont correctes mais la suite de l'exercice n'a pas été finalisée dans le temps imparti.</p>`,
      ];
      extra += variants[seed];
    } else {
      const partialRep = repBase.split('.')[0] + '.';
      const struggles = [
        `a eu des difficultés dès la première étape de l'exercice`,
        `n'a pas réussi à identifier la méthodologie appropriée`,
        `a passé beaucoup de temps sur la compréhension de la consigne`,
        `a tenté plusieurs approches sans parvenir à un résultat satisfaisant`,
      ];
      const struggle = struggles[(nameHash + ei * 7) % struggles.length];
      const variants = [
        `<p>${partialRep}</p><p>${s.prenom} ${struggle}. Les consignes n'ont pas été bien comprises malgré les explications complémentaires. Un accompagnement individuel renforcé est recommandé.</p>`,
        `<p>${partialRep}</p><p>${s.prenom} ${struggle}. Les notions de base nécessaires à cet exercice ne sont pas encore suffisamment maîtrisées. Un plan de remédiation est à prévoir.</p>`,
        `<p>${partialRep}</p><p>${s.prenom} ${struggle}. L'aide constante du formateur a été nécessaire. Seule la première partie a été partiellement réalisée.</p>`,
        `<p>${partialRep}</p><p>${s.prenom} ${struggle}. Les difficultés portent sur la compréhension des consignes et la maîtrise des outils. Des exercices complémentaires de renforcement sont nécessaires.</p>`,
      ];
      extra += variants[seed];
    }

    // Formateur correction — unique per stagiaire and exercise
    const corrSeed = ((hash * 17 + stagiaireIdx * 11 + ei * 23) & 0x7FFFFFFF) % 6;
    extra += `<h4>Correction formateur :</h4>`;
    if (noteRound >= 4.5) {
      const corrs = [
        `<p>${s.prenom} ${s.nom} a parfaitement répondu aux exigences de cet exercice. Le travail est complet, structuré et directement exploitable en contexte professionnel. La méthodologie employée est rigoureuse. Aucune correction nécessaire.</p>`,
        `<p>Excellent travail de ${s.prenom}. Les consignes ont été suivies avec précision et le rendu dépasse les attendus. ${s.prenom} fait preuve d'une réelle autonomie et d'une bonne capacité d'analyse. Compétence pleinement validée.</p>`,
        `<p>${s.prenom} ${s.nom} démontre une maîtrise solide du sujet. Le travail est soigné, les étapes sont clairement identifiées et correctement exécutées. La qualité du rendu est professionnelle. Très satisfaisant.</p>`,
        `<p>Le travail rendu par ${s.prenom} est exemplaire. La démarche est logique, le résultat conforme et la présentation soignée. ${s.prenom} a su mobiliser l'ensemble des connaissances acquises durant la formation.</p>`,
        `<p>${s.prenom} ${s.nom} a réalisé cet exercice avec brio. L'approche est méthodique, les outils sont correctement utilisés et le résultat final est de qualité professionnelle. Compétence acquise sans réserve.</p>`,
        `<p>Travail remarquable de ${s.prenom}. Toutes les consignes sont respectées avec rigueur. Le résultat témoigne d'une excellente compréhension des concepts et d'une capacité à les appliquer de manière autonome.</p>`,
      ];
      extra += corrs[corrSeed];
    } else if (noteRound >= 3.5) {
      const corrs = [
        `<p>${s.prenom} ${s.nom} a réalisé un bon travail d'ensemble. Les points essentiels sont traités correctement. Je note cependant quelques imprécisions sur la finalisation qui mériteraient d'être revues. Les compétences sont en bonne voie d'acquisition.</p>`,
        `<p>Bon exercice de ${s.prenom}. La compréhension du sujet est démontrée. Quelques détails techniques pourraient être améliorés, notamment sur la rigueur de la présentation. Avec un peu plus de pratique, le niveau sera optimal.</p>`,
        `<p>Le travail de ${s.prenom} ${s.nom} est satisfaisant. Les étapes principales sont bien menées. Un point de vigilance sur la précision des résultats intermédiaires. Globalement, les objectifs de l'exercice sont atteints.</p>`,
        `<p>${s.prenom} a fourni un travail correct et cohérent. La démarche est bonne mais gagnerait en rigueur sur certains aspects. Les bases sont solides et la progression est encourageante. Quelques ajustements mineurs à apporter.</p>`,
        `<p>Résultat globalement conforme pour ${s.prenom} ${s.nom}. L'essentiel est maîtrisé. Je recommande de retravailler un point spécifique pour atteindre le niveau d'autonomie complète. Bonne dynamique d'apprentissage.</p>`,
        `<p>${s.prenom} a bien travaillé sur cet exercice. Le résultat est proche des attendus. Une relecture plus attentive des consignes aurait permis d'éviter quelques approximations mineures. Performance encourageante.</p>`,
      ];
      extra += corrs[corrSeed];
    } else if (noteRound >= 2.5) {
      const corrs = [
        `<p>${s.prenom} ${s.nom} a réalisé l'exercice de manière partielle. Les bases sont comprises mais l'application manque de rigueur. Je recommande de reprendre les points fondamentaux et de s'entraîner davantage sur ce type d'exercice.</p>`,
        `<p>Le travail de ${s.prenom} est incomplet. Certaines étapes clés sont manquantes. La compréhension est là mais la mise en pratique nécessite un renforcement. Un exercice complémentaire sera proposé en accompagnement.</p>`,
        `<p>${s.prenom} ${s.nom} a rencontré des difficultés sur cet exercice. Les premières étapes sont correctes mais la suite montre des lacunes. Un accompagnement individuel permettrait de progresser sur les points identifiés.</p>`,
        `<p>Réalisation approximative de ${s.prenom}. Les consignes principales ont été suivies mais les détails font défaut. Je préconise un travail de reprise ciblé sur les aspects techniques non maîtrisés.</p>`,
        `<p>Le résultat de ${s.prenom} ${s.nom} ne couvre pas l'ensemble des attendus. Des erreurs de compréhension ont été identifiées. Un plan de remédiation avec des exercices progressifs est recommandé.</p>`,
        `<p>${s.prenom} a tenté l'exercice avec motivation mais le résultat reste en-deçà des objectifs. Les notions de base doivent être consolidées. Je propose des exercices de renforcement pour la prochaine session.</p>`,
      ];
      extra += corrs[corrSeed];
    } else {
      const corrs = [
        `<p>${s.prenom} ${s.nom} n'a pas pu finaliser cet exercice. Les difficultés de compréhension sont importantes. Je recommande un accompagnement individuel renforcé et la reprise des fondamentaux avant de retenter l'exercice.</p>`,
        `<p>Le travail de ${s.prenom} est insuffisant pour valider la compétence. Les consignes n'ont été que partiellement comprises. Un plan de remédiation avec des étapes intermédiaires est nécessaire.</p>`,
        `<p>${s.prenom} ${s.nom} a besoin d'un soutien complémentaire important. L'exercice n'a pas abouti. Je préconise de revoir les prérequis et de proposer des exercices simplifiés avant de revenir sur ce niveau de complexité.</p>`,
        `<p>Malgré les efforts de ${s.prenom}, le résultat est très en-deçà des attendus. Les notions de base ne sont pas suffisamment maîtrisées. Un accompagnement personnalisé et un programme de rattrapage sont indispensables.</p>`,
        `<p>${s.prenom} ${s.nom} a rencontré des blocages majeurs sur cet exercice. Les explications complémentaires fournies n'ont pas suffi. Je recommande fortement un tutorat individuel pour accompagner la progression.</p>`,
        `<p>Le niveau actuel de ${s.prenom} ne permet pas de réaliser cet exercice en autonomie. Un retour sur les fondamentaux est impératif. Des exercices d'application guidés seront proposés dans le cadre du suivi post-formation.</p>`,
      ];
      extra += corrs[corrSeed];
    }
    extra += `<p><strong>Note : ${noteRound} / ${noteMax}</strong></p>`;
  });

  // Recap table
  extra += `<h3>RÉCAPITULATIF DES NOTES</h3>`;
  const recapRows = notesRecap.map(n => [n.titre, `${n.note} / ${n.max}`]);
  extra += tableHTML(["Exercice", "Note"], recapRows);
  extra += `<p><strong>NOTE FINALE : ${totalNote} / ${totalMax}</strong></p>`;

  // Global appreciation — unique per stagiaire based on hash and score
  const avgPct = totalNote / totalMax * 100;
  const appSeed = ((hash * 29 + stagiaireIdx * 19) & 0x7FFFFFFF) % 5;
  const appreciations = [
    [ // excellent (>=80%)
      `${s.prenom} ${s.nom} a fait preuve d'une excellente maîtrise des compétences pratiques tout au long de la formation « ${f.intitule} ». Les exercices sont réalisés avec rigueur, autonomie et professionnalisme. Les objectifs pédagogiques sont pleinement atteints. Je recommande vivement ${s.prenom} pour toute mission nécessitant ces compétences. Avis très favorable.`,
      `Les résultats pratiques de ${s.prenom} ${s.nom} sont remarquables. L'ensemble des exercices témoigne d'une appropriation solide et d'une capacité à transférer les acquis en situation professionnelle. ${s.prenom} a également su prendre des initiatives pertinentes au-delà des consignes. Évaluation : Très bien.`,
      `${s.prenom} ${s.nom} a démontré un niveau de compétence élevé sur l'ensemble des exercices pratiques. Le travail est complet, précis et de qualité professionnelle. ${s.prenom} a su faire preuve d'autonomie et de méthode. Les compétences visées par la formation sont acquises. Félicitations.`,
      `Excellent parcours pratique de ${s.prenom} ${s.nom}. Chaque exercice a été réalisé avec soin et dans le respect des consignes. ${s.prenom} montre une réelle aptitude à appliquer les connaissances en contexte réel. Le transfert en situation de travail est assuré. Note globale : Très satisfaisant.`,
      `${s.prenom} ${s.nom} a brillamment réussi l'ensemble des exercices pratiques de la formation « ${f.intitule} ». La qualité du travail, la rigueur méthodologique et l'autonomie démontrée sont exemplaires. ${s.prenom} est parfaitement opérationnel(le) sur les compétences évaluées. Appréciation : Excellent.`,
    ],
    [ // bon (60-80%)
      `${s.prenom} ${s.nom} a réalisé les exercices pratiques de manière satisfaisante. Les compétences principales sont acquises et les bases sont solides. Quelques points de perfectionnement ont été identifiés, notamment sur la précision et la rigueur méthodologique. La pratique régulière permettra de consolider les acquis. Appréciation : Bien.`,
      `Bonne performance globale de ${s.prenom} ${s.nom}. Les exercices sont réussis avec un niveau de qualité correct. ${s.prenom} a montré une bonne compréhension des concepts et une capacité à les appliquer, même si certains aspects méritent d'être approfondis. Encouragements pour la suite.`,
      `${s.prenom} ${s.nom} a atteint les objectifs principaux de la formation sur le plan pratique. Le travail est de bonne qualité avec de légères améliorations possibles. ${s.prenom} est en bonne voie pour une maîtrise complète des compétences. Je recommande de continuer la pratique pour atteindre l'autonomie totale.`,
      `Le travail pratique de ${s.prenom} ${s.nom} est globalement bon. Les exercices sont réalisés avec sérieux et application. Quelques imprécisions mineures ont été constatées mais n'affectent pas la qualité générale. ${s.prenom} a su progresser au fil de la formation. Appréciation positive.`,
      `${s.prenom} ${s.nom} montre une bonne appropriation des compétences pratiques de « ${f.intitule} ». Les fondamentaux sont maîtrisés. Avec un peu plus d'entraînement sur les cas complexes, ${s.prenom} atteindra un excellent niveau. Le bilan est encourageant et les bases acquises sont solides.`,
    ],
    [ // moyen (<60%)
      `${s.prenom} ${s.nom} a montré des acquis partiels sur les exercices pratiques de la formation « ${f.intitule} ». Les bases sont en cours d'acquisition mais un renforcement est nécessaire pour atteindre l'autonomie. Je recommande un accompagnement complémentaire et des exercices de consolidation ciblés.`,
      `Les résultats pratiques de ${s.prenom} ${s.nom} sont en-deçà des objectifs visés. La compréhension est là mais la mise en application reste fragile. Un plan de progression personnalisé sera proposé pour permettre à ${s.prenom} de consolider les compétences clés de la formation.`,
      `${s.prenom} ${s.nom} a fourni des efforts mais les résultats pratiques nécessitent un approfondissement. Les exercices ont révélé des lacunes sur certains points fondamentaux. Je préconise un suivi post-formation et des ressources complémentaires pour accompagner la montée en compétences.`,
      `Le bilan pratique de ${s.prenom} ${s.nom} est mitigé. Certains exercices sont réussis mais d'autres montrent des difficultés persistantes. ${s.prenom} a besoin de temps et de pratique supplémentaires. Un tutorat ou mentorat serait bénéfique pour la suite du parcours.`,
      `${s.prenom} ${s.nom} a réalisé les exercices avec des résultats inégaux. Les compétences de base sont partiellement acquises. Un travail de consolidation est indispensable pour garantir le transfert en situation professionnelle. Des ressources complémentaires seront mises à disposition.`,
    ],
  ];

  const appIdx = avgPct >= 80 ? 0 : avgPct >= 60 ? 1 : 2;
  extra += `<h3>Appréciation du formateur : ${f.formateur}, ${formatDate(f.dateFin)}</h3>`;
  extra += `<p>${appreciations[appIdx][appSeed]}</p>`;

  return buildDocument({ org: o, title: `EXERCICE PRATIQUE${jourLabel} – RÉSULTATS`, subtitle: `${f.intitule} – ${s.prenom} ${s.nom}`, extraHtml: extra });
  // NO signatures
}

export function genGrilleAcquisitionStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], stagiaireIdx: number) {
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  const evalData = getEvalContent(f.intitule);
  const sc = EVAL_SCORES[stagiaireIdx] || [7, 8, 7, 8, 7];

  let extra = `
    <h3>GRILLE DE SUIVI DU NIVEAU D'ACQUISITION DES COMPÉTENCES PROFESSIONNELLES</h3>
    <p><strong>DATE :</strong> ${formatDate(f.dateDebut)} – ${formatDate(f.dateFin)}</p>
    <p><strong>NOM / PRÉNOM :</strong> ${s.prenom} ${s.nom}</p>
    <p><strong>FORMATION :</strong> ${f.intitule}</p>
  `;

  const headers = ["", "NIVEAU", "", ""];
  const subHeaders = ["COMPÉTENCES PROFESSIONNELLES", "ACQUIS", "NON ACQUIS", "EN COURS D'ACQUISITION"];
  const rows = evalData.competences.map((comp, ci) => {
    const score = sc[ci % sc.length];
    const finalScore = Math.min(10, score + 2); // post-formation improvement
    let acquis = '', nonAcquis = '', enCours = '';
    if (finalScore >= 8) acquis = '✅';
    else if (finalScore < 5) nonAcquis = '❌';
    else enCours = '🔄';
    return [comp, acquis, nonAcquis, enCours];
  });

  extra += tableHTML(subHeaders, rows);
  extra += `<p><strong>${formatDate(f.dateFin)}, par le Formateur : ${f.formateur}</strong></p>`;
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
  const days = getFormationDays(f);
  const dureeHeures = parseInt(f.duree) || (days.length * 7);
  const tauxRealisation = 100; // Default to 100%

  let extra = `
    <div style="text-align:center;padding:30px">
      <h2 style="color:${getDocStyleColor()}">ATTESTATION DE RÉUSSITE</h2>
      <p style="margin-top:20px">${o.nom} atteste que :</p>
      <p><strong>Nom et prénom :</strong> ${s.prenom} ${s.nom}</p>
      ${s.email ? `<p><strong>Email :</strong> ${s.email}</p>` : ''}
      <p style="margin-top:15px">a réussi avec succès la formation suivante :</p>
      <p style="font-size:16px;font-weight:700">${f.intitule}</p>
      <p><strong>Durée de la formation :</strong> ${dureeHeures} heures de formation ${modaliteTexte(f)}</p>
      <p><strong>Date de début :</strong> ${formatDate(f.dateDebut)}</p>
      <p><strong>Date de fin :</strong> ${formatDate(f.dateFin)}</p>
      <p style="margin-top:15px">Cette formation a été dispensée conformément aux normes de qualité et aux exigences pédagogiques de ${o.nom}. L'apprenant(e) a démontré un haut niveau d'engagement, de compétence et de participation active tout au long du programme.</p>
      <h3>Assiduité du stagiaire</h3>
      <p>Durée effective suivie par le/la stagiaire : ${dureeHeures} heures, soit un taux de réalisation de ${tauxRealisation.toFixed(2)} %.</p>
      <p style="margin-top:20px"><strong>Fait à ${o.ville}, le :</strong> ${formatDate(f.dateFin)}</p>
      <p style="margin-top:15px"><strong>Pour ${o.nom}</strong></p>
      <p>${o.dirigeant}<br>Président – Formateur</p>
      ${orgSig(o)}
    </div>
  `;

  return buildDocument({ org: o, title: "ATTESTATION DE RÉUSSITE", subtitle: `${s.prenom} ${s.nom} – ${f.intitule}`, extraHtml: extra });
  // Signature: organisme only (with tampon) - included inline
}

// Helper to get doc style primary color
function getDocStyleColor(): string {
  try {
    const { getDocStyle } = require("./docBuilder");
    return getDocStyle().primaryColor;
  } catch { return "#1e3a7b"; }
}

// Improved existing exercices_pratiques (group format) - removes signatures
export function genExercicesPratiques_V2(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const exercices = evalData.exercices;
  let extra = `<h2>EXERCICES PRATIQUES – RÉSULTATS</h2>`;
  extra += `<p><strong>Formation :</strong> ${f.intitule}<br><strong>Formateur :</strong> ${f.formateur}<br><strong>Nombre d'exercices :</strong> ${exercices.length}</p>`;

  exercices.forEach((ex, ei) => {
    extra += `<div class="page-break"></div>`;
    extra += `<h2>${ex.titre}</h2>`;
    extra += `<div class="section"><p><strong>Consigne :</strong> ${ex.consigne}</p></div>`;
    extra += `<div class="section section-green"><p><strong>Réponse attendue / Corrigé :</strong> ${ex.reponseAttendue}</p></div>`;
    extra += `<h3>Résultats par stagiaire</h3>`;
    const rows = stagiaires.slice(0, 10).map((s, si) => {
      const sc = EVAL_SCORES[si] || [7, 8, 7, 8, 7];
      const note = sc[ei % sc.length];
      const noteFinale = Math.min(10, note + 1);
      // Unique appreciation per stagiaire
      const seed = (si * 7 + ei * 3) % 4;
      const apps = noteFinale >= 9
        ? [`${s.prenom} ${s.nom} a parfaitement réalisé cet exercice. Travail exemplaire.`, `Exercice réalisé avec méthode par ${s.prenom} ${s.nom}. Résultat conforme.`, `${s.prenom} ${s.nom} démontre une maîtrise complète. Excellent travail.`, `Travail de qualité de ${s.prenom} ${s.nom}. Compétence pleinement acquise.`]
        : noteFinale >= 7
        ? [`${s.prenom} ${s.nom} a réalisé un bon travail. Quelques points à perfectionner.`, `Bon exercice de ${s.prenom} ${s.nom}. La compréhension est bonne.`, `${s.prenom} ${s.nom} montre de solides acquis. Léger approfondissement souhaitable.`, `Travail satisfaisant de ${s.prenom} ${s.nom}. Progression encourageante.`]
        : [`${s.prenom} ${s.nom} a réalisé un travail partiel. Approfondissement nécessaire.`, `Exercice incomplet pour ${s.prenom} ${s.nom}. Un accompagnement est recommandé.`, `${s.prenom} ${s.nom} doit consolider les bases. Travail à reprendre.`, `Résultat insuffisant pour ${s.prenom} ${s.nom}. Plan de remédiation conseillé.`];
      return [s.prenom + " " + s.nom, `${noteFinale}/10`, noteFinale >= 7 ? "✅ Validé" : "🔄 À revoir", apps[seed]];
    });
    extra += tableHTML(["Stagiaire", "Note", "Statut", "Appréciation du formateur"], rows);
  });

  return buildDocument({ org: o, title: "EXERCICES PRATIQUES – CORRIGÉS ET RÉSULTATS", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra });
  // NO signatures
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

  return buildDocument({ org: o, title: "ÉVALUATION FINALE – RÉSULTATS", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra });
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
    extra += `<p><strong>DATE :</strong> ${formatDate(f.dateDebut)} – ${formatDate(f.dateFin)}</p>`;
    extra += `<p><strong>NOM / PRÉNOM :</strong> ${s.prenom} ${s.nom}</p>`;
    extra += `<p><strong>FORMATION :</strong> ${f.intitule}</p>`;
    const rows = evalData.competences.map((comp, ci) => {
      const finalScore = Math.min(10, (sc[ci % sc.length]) + 2);
      return [comp, finalScore >= 8 ? '✅' : '', finalScore < 5 ? '❌' : '', finalScore >= 5 && finalScore < 8 ? '🔄' : ''];
    });
    extra += tableHTML(["COMPÉTENCES PROFESSIONNELLES", "ACQUIS", "NON ACQUIS", "EN COURS D'ACQUISITION"], rows);
    extra += `<p>${formatDate(f.dateFin)}, par le Formateur : ${f.formateur}</p>`;
    extra += `<div class="section"><p>*NON ACQUIS : 1/10 - 4/10 | *EN COURS D'ACQUISITION : 5/10 - 7/10 | *ACQUIS : 8/10 - 10/10</p></div>`;
  });
  return buildDocument({ org: o, title: "GRILLE D'ACQUISITION DES COMPÉTENCES", subtitle: f.intitule, formation: f, showFormationInfo: true, extraHtml: extra });
  // NO signatures
}

// Improved certificat_reussite (group format) with assiduité - signature organisme only
export function genCertificatReussite_V2(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const days = getFormationDays(f);
  const dureeHeures = parseInt(f.duree) || (days.length * 7);

  let extra = '';
  stagiaires.slice(0, 10).forEach((s, si) => {
    if (si > 0) extra += '<div class="page-break"></div>';
    extra += `
      <div style="text-align:center;padding:30px">
        <h2>ATTESTATION DE RÉUSSITE</h2>
        <p style="margin-top:20px">${o.nom} atteste que :</p>
        <p><strong>Nom et prénom :</strong> ${s.prenom} ${s.nom}</p>
        ${s.email ? `<p><strong>Email :</strong> ${s.email}</p>` : ''}
        <p style="margin-top:15px">a réussi avec succès la formation suivante :</p>
        <p style="font-size:16px;font-weight:700">${f.intitule}</p>
        <p><strong>Durée :</strong> ${dureeHeures} heures ${modaliteTexte(f)}</p>
        <p>Du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}</p>
        <p style="margin-top:15px">Cette formation a été dispensée conformément aux normes de qualité et aux exigences pédagogiques de ${o.nom}. L'apprenant(e) a démontré un haut niveau d'engagement et de participation active tout au long du programme.</p>
        <h3>Assiduité</h3>
        <p>Durée effective suivie : ${dureeHeures} heures, soit un taux de réalisation de 100.00 %.</p>
        <p style="margin-top:20px"><strong>Fait à ${o.ville}, le :</strong> ${formatDate(f.dateFin)}</p>
        <p><strong>Pour ${o.nom}</strong></p>
        <p>${o.dirigeant}</p>
        ${orgSig(o)}
      </div>`;
  });
  return buildDocument({ org: o, title: "ATTESTATIONS DE RÉUSSITE", subtitle: f.intitule, extraHtml: extra });
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

  let sigPages = `<p><strong>Fait à ${o.ville}, le :</strong> ${formatDate(subtractBusinessDays(f.dateDebut || new Date().toISOString(), 14))}</p>`;
  sigPages += sigBlock(
    `Le Stagiaire`, `${s.prenom} ${s.nom}`, stagSig(s),
    `Pour l'Organisme de formation`, o.dirigeant, orgSig(o),
    'Précédée de la mention « Lu et approuvé »'
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

  let sigPages = `<p><strong>Fait à ${o.ville}, le :</strong> ${formatDate(subtractBusinessDays(f.dateDebut || new Date().toISOString(), 14))}</p>`;
  sigPages += sigBlock(
    `Signature du stagiaire : ${s.prenom} ${s.nom}`, `${s.prenom} ${s.nom}`, stagSig(s),
    `Signature du centre`, o.nom, orgSig(o),
    'Précédée de la mention « Lu et approuvé »'
  );

  return buildDocument({ org: o, title: `RÈGLEMENT INTÉRIEUR – ${s.prenom} ${s.nom}`, subtitle: `Applicable aux stagiaires en formation ${modTxt}`, sections, extraHtml: sigPages });
}
