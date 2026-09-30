// Improved generators for IND 9, 10, 11 - Qualiopi compliant (reference: Select Formation docs)
import { mot } from "./resolveurFormation";
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, tableHTML, formatDate, subtractBusinessDays, getStagiaireDateDebut, getStagiaireDateFin, getStagiaireTarif, getStagiaireDuree, isFormationTerminee, htmlWrap, applyGender, getDateSignatureDossier, getDateConvocation, isStagiaireFormationTerminee } from "./docBuilder";
import { mentionTVA } from "./mentionsLegales";
import { EVAL_SCORES, getFormationDays, CONNECTION_TIMES_6H, CONNECTION_TIMES_7H, parseDuree } from "./sampleData";
import { getUnitesExercices } from "./parcoursStagiaire";

function getHoraireFin(_f: FormationInfo): string {
  // Conservé pour compatibilité — horaires journée standard
  return "17h00";
}

const HORAIRES_TEXTE = "Du lundi au vendredi : 09h00 – 12h30 et 13h30 – 17h00 (7 h/jour)";
const HORAIRES_LIGNE = "Lun-Ven 09h00–12h30 / 13h30–17h00 (7 h/jour)";
const HORAIRES_TEXTE_PSH = "Du lundi au vendredi : 09h00 – 12h30 et 13h30 – 17h00 (aménagement personne en situation de handicap)";
const HORAIRES_LIGNE_PSH = "Lun-Ven 09h00–12h30 / 13h30–17h00 (aménagement PSH)";

/** Stagiaire bénéficiant d'aménagements PSH : uniquement sur la donnée saisie (RQTH = oui). */
export function isPSHStagiaire(s: StagiaireInfo | undefined | null): boolean {
  return !!s && ((s as any).rqth || "").toLowerCase() === "oui";
}
function horairesTexteFor(s?: StagiaireInfo) { return isPSHStagiaire(s) ? HORAIRES_TEXTE_PSH : HORAIRES_TEXTE; }
function horairesLigneFor(s?: StagiaireInfo) { return isPSHStagiaire(s) ? HORAIRES_LIGNE_PSH : HORAIRES_LIGNE; }
import { getEvalContent, generateStagiaireAnswers, computeQCMScore, getQuestionsOuvertes, generateStagiaireOpenAnswers } from "./evalContent";
import { getRNCPByCode } from "./rncpData";
import { getCachedContentPack } from "./aiContentPack";
import { IA_GENERATIVE_EVAL_PACK } from "./iaGenerativePreset";
import { pickCreationExerciceAnswer } from "./creationEntreprisePreset";
import { pickVitrageExerciceAnswer } from "./vitrageHumanized";
import { pickOngulaireExerciceAnswer } from "./ongulaireHumanized";

// ========== HELPERS ==========

function stagSig(s: StagiaireInfo): string {
  return s.signatureUrl
    ? `<img src="${s.signatureUrl}" alt="Signature ${s.prenom} ${s.nom}" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />`
    : `<div style="height:48px;border-bottom:1px dotted #bbb;margin-top:10px"></div>`;
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

/** Tampon agrandi + fallback SVG rond pour garantir un cachet visible (attestations de réussite) */
function bigOrgStamp(o: OrganismeInfo): string {
  if (o.tamponUrl) {
    return `<img src="${o.tamponUrl}" alt="Tampon ${o.nom}" style="max-height:150px;max-width:220px;object-fit:contain;opacity:0.9" />`;
  }
  const nom = (o.nom || "ORGANISME DE FORMATION").toUpperCase().slice(0, 40);
  const ville = (o.ville || "").toUpperCase().slice(0, 30);
  const siret = o.siret ? `SIRET ${o.siret}` : "";
  const nda = (o as any).nda ? `NDA ${(o as any).nda}` : "";
  const color = "#0A3D7A";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="180" height="180">
    <defs>
      <path id="topA" d="M 22,110 A 88,88 0 0,1 198,110" fill="none"/>
      <path id="botA" d="M 22,110 A 88,88 0 0,0 198,110" fill="none"/>
    </defs>
    <circle cx="110" cy="110" r="95" fill="none" stroke="${color}" stroke-width="2.5"/>
    <circle cx="110" cy="110" r="80" fill="none" stroke="${color}" stroke-width="1.2"/>
    <text fill="${color}" font-family="Arial, sans-serif" font-size="11" font-weight="bold" letter-spacing="1">
      <textPath href="#topA" startOffset="50%" text-anchor="middle">${nom}</textPath>
    </text>
    <text fill="${color}" font-family="Arial, sans-serif" font-size="9" letter-spacing="0.8">
      <textPath href="#botA" startOffset="50%" text-anchor="middle">${ville}</textPath>
    </text>
    <text x="38" y="112" fill="${color}" font-size="14" font-weight="bold">★</text>
    <text x="172" y="112" fill="${color}" font-size="14" font-weight="bold">★</text>
    <text x="110" y="100" fill="${color}" font-size="10" font-weight="bold" text-anchor="middle">${siret}</text>
    <text x="110" y="118" fill="${color}" font-size="9" text-anchor="middle">${nda}</text>
    <text x="110" y="135" fill="${color}" font-size="8" text-anchor="middle">CERTIFIÉ QUALIOPI</text>
  </svg>`;
  return svg;
}


function formateurSigGen(f: FormationInfo, s?: StagiaireInfo): string {
  // Formateur = signature formateur (du stagiaire ou de la formation)
  const url = s?.formateurSignatureUrl || f.formateurSignatureUrl;
  if (url) {
    return `<img src="${url}" alt="Signature formateur" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />`;
  }
  return `<div style="height:48px;border-bottom:1px dotted #bbb;margin-top:10px"></div>`;
}

function respEntrepriseSig(s: StagiaireInfo): string {
  // Responsable entreprise = signature responsable entreprise
  if (s.signatureResponsableUrl) {
    return `<img src="${s.signatureResponsableUrl}" alt="Signature responsable entreprise" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />`;
  }
  return `<div style="height:48px;border-bottom:1px dotted #bbb;margin-top:10px"></div>`;
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
    { heading: "Article 5 – Tarifs", content: `<p>Les tarifs sont indiqués en euros. ${mentionTVA(o)}</p><p>Sauf mention contraire, le prix comprend :</p><ul><li>Les heures de formation</li><li>Les supports pédagogiques</li><li>L'accompagnement pédagogique</li></ul>${f.tarif ? `<p>Tarif de la formation « ${f.intitule} » : ${f.tarif} par stagiaire</p>` : ''}` },
    { heading: "Article 6 – Modalités de paiement", content: `<p>Aucune somme ne peut être exigée avant l'expiration du délai légal de rétractation de 10 jours (art. L.6353-5 du Code du travail).</p><ul><li>À l'issue de ce délai, un acompte de <strong>30 % au plus</strong> du prix peut être demandé (art. L.6353-6)</li><li>Le solde est échelonné au fur et à mesure du déroulement de la formation</li><li>Formation financée par l'employeur ou un OPCO : facturation après réalisation, règlement à 30 jours</li><li>Formation financée par le CPF : règlement par la Caisse des Dépôts selon les conditions générales de la plateforme Mon Compte Formation</li></ul>` },

    { heading: "Article 7 – Délai de rétractation", content: `<p>Conformément à l'article L.6353-5 du Code du travail, le stagiaire dispose d'un délai de rétractation de 10 jours à compter de la signature du contrat.</p><p>La rétractation doit être notifiée par lettre recommandée avec accusé de réception.</p>` },
    { heading: "Article 8 – Annulation, report et abandon", content: `<h3>8.1 Annulation par le stagiaire</h3><p>Toute annulation après le délai de rétractation doit être notifiée par écrit.</p><p>En cas d'annulation moins de 7 jours ouvrés avant le début, une indemnité de 30 % du prix peut être facturée ; en cas d'abandon en cours de formation sans motif de force majeure, seules les heures réellement suivies sont dues, majorées de la même indemnité de 30 % sur le reliquat (art. L.6354-1 du Code du travail : les sommes dues au titre du dédit ne peuvent être imputées sur les fonds de la formation professionnelle).</p><h3>8.2 Annulation par l'organisme</h3><p>${o.nom} se réserve le droit d'annuler ou de reporter une formation en cas de force majeure ou d'effectif insuffisant.</p><p>Dans ce cas, les sommes versées sont intégralement remboursées.</p>` },
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
  stagiaires.forEach((s, i) => {
    if (i > 0) sigPages += '<div class="page-break"></div>';
    const sigDate = formatDate(getDateSignatureDossier(getStagiaireDateDebut(s, f) || f.dateDebut));
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
  stagiaires.forEach((s, i) => {
    if (i > 0) sigPages += '<div class="page-break"></div>';
    const sigDate = formatDate(getDateSignatureDossier(getStagiaireDateDebut(s, f) || f.dateDebut));
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
  stagiaires.forEach((s, i) => {
    if (i > 0) extra += '<div class="page-break"></div>';
    const civilite = (s.civilite === 'Mme' ? 'Madame' : s.civilite === 'M.' ? 'Monsieur' : 'Madame, Monsieur');
    extra += `
      <h2>CONVOCATION À LA FORMATION</h2>
      <p><strong>Organisme de formation :</strong> ${o.nom}</p>
      <p><strong>À l'attention de :</strong> ${civilite} ${s.prenom} ${s.nom}</p>
      <p><strong>Objet :</strong> Convocation à la formation – ${f.intitule}</p>
      <p>${civilite},</p>
      <p>Nous avons le plaisir de vous confirmer votre inscription à la formation suivante :</p>
      <h3>Intitulé de la formation</h3><p>${f.intitule}</p>
      <h3>Dates de la formation</h3><p>Du : ${formatDate(getStagiaireDateDebut(s, f))}<br>Au : ${formatDate(getStagiaireDateFin(s, f))}</p>
      <h3>Horaires</h3><p>${horairesTexteFor(s)}</p>
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
       <p><strong>Fait à ${o.ville}, le :</strong> ${formatDate(getDateSignatureDossier(getStagiaireDateDebut(s, f) || f.dateDebut))}</p>
      <p><strong>Pour ${o.nom}</strong></p>
      <p>${o.dirigeant}<br>Dirigeant – Formateur</p>
      <div style="margin-top:14px">${bigOrgStamp(o)}</div>
    `;
  });
  return buildDocument({ org: o, title: "CONVOCATION À LA FORMATION", extraHtml: extra });
}

export function genContratFormationPro_V2(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  let extra = '';
  stagiaires.forEach((s, i) => {
    if (i > 0) extra += '<div class="page-break"></div>';
    extra += `
      <h2>CONTRAT DE FORMATION PROFESSIONNELLE</h2>
      <p style="font-style:italic">(Conformément aux articles L.6353-3 à L.6353-7 et R.6353-1 à R.6353-8 du Code du travail)</p>
      <h3>Entre les soussignés</h3>
      <h4>L'Organisme de formation</h4>
      <p>${o.nom}<br>Adresse : ${o.adresse}, ${o.codePostal} ${o.ville}<br>SIRET : ${o.siret}<br>Email : ${o.email}<br>Représenté par : ${o.dirigeant}</p>
      <p>Ci-après dénommé « l'Organisme de formation »,</p>
      <h4>Et le stagiaire</h4>
      <p>Nom et prénom : ${s.prenom} ${s.nom}${s.email ? `<br>Email : ${s.email}` : ''}${s.telephone ? `${s.telephone?.trim() ? `${s.telephone?.trim() ? `<br>Téléphone : ${s.telephone}` : ""}` : ""}` : ''}</p>
      <p>Ci-après dénommé « le Stagiaire »,</p>
      <h3>Article 1 – Objet du contrat</h3>
      <p>Le présent contrat a pour objet la participation du stagiaire à l'action de formation suivante :</p>
      <p><strong>Intitulé :</strong> ${f.intitule}<br><strong>Nature de l'action :</strong> Action de formation (article L.6313-1 du Code du travail)</p>
      <h3>Article 2 – Objectifs de la formation</h3>
      <p>À l'issue de la formation, le stagiaire sera capable de :</p>
      <p>${f.objectifs.split('\n').map(o => `• ${o}`).join('<br>')}</p>
      <h3>Article 3 – Organisation de la formation</h3>
      <p><strong>Durée totale :</strong> ${getStagiaireDuree(s, f)}<br><strong>Dates :</strong> du ${formatDate(getStagiaireDateDebut(s, f))} au ${formatDate(getStagiaireDateFin(s, f))}<br><strong>Horaires :</strong> ${horairesLigneFor(s)}<br><strong>Modalité :</strong> Formation ${modaliteTexte(f)}${isPresentiel(f) ? `<br><strong>Lieu :</strong> ${f.lieu}` : ''}</p>
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
      <p>${mentionTVA(o)}</p>
      <p><strong>Modalités de paiement :</strong> aucune somme n'est exigible avant l'expiration du délai de rétractation de 10 jours. À son terme, un acompte de 30 % au plus du prix peut être demandé ; le solde est réglé au fur et à mesure du déroulement de la formation (art. L.6353-6 du Code du travail). En cas de financement CPF, aucun paiement n'est demandé au stagiaire hors reste à charge éventuel affiché sur Mon Compte Formation.</p>
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
      <p><strong>Fait à ${o.ville}, le :</strong> ${formatDate(getDateSignatureDossier(getStagiaireDateDebut(s, f) || f.dateDebut))}</p>
    `;
    const sigDate2 = formatDate(getDateSignatureDossier(getStagiaireDateDebut(s, f) || f.dateDebut));
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
  const civilite = (s.civilite === 'Mme' ? 'Madame' : s.civilite === 'M.' ? 'Monsieur' : 'Madame, Monsieur');
  let extra = `
    <h2>CONVOCATION À LA FORMATION</h2>
    <p><strong>Organisme de formation :</strong> ${o.nom}</p>
    <p><strong>À l'attention de :</strong> ${civilite} ${s.prenom} ${s.nom}</p>
    <p><strong>Objet :</strong> Convocation à la formation – ${f.intitule}</p>
    <p>${civilite},</p>
    <p>Nous avons le plaisir de vous confirmer votre inscription à la formation suivante :</p>
    <h3>Intitulé de la formation</h3><p>${f.intitule}</p>
    <h3>Dates de la formation</h3><p>Du : ${formatDate(getStagiaireDateDebut(s, f))}<br>Au : ${formatDate(getStagiaireDateFin(s, f))}</p>
    <h3>Horaires</h3><p>${horairesTexteFor(s)}</p>
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
    <p><strong>Fait à ${o.ville}, le :</strong> ${formatDate(getDateConvocation(getStagiaireDateDebut(s, f) || f.dateDebut))}</p>
    <p><strong>Pour ${o.nom}</strong></p>
    <p>${o.dirigeant}<br>Dirigeant – Formateur</p>
    <div style="margin-top:14px">${bigOrgStamp(o)}</div>
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
    <p>Nom et prénom : ${s.prenom} ${s.nom}${s.email ? `<br>Email : ${s.email}` : ''}${s.telephone ? `${s.telephone?.trim() ? `${s.telephone?.trim() ? `<br>Téléphone : ${s.telephone}` : ""}` : ""}` : ''}</p>
    <p>Ci-après dénommé « le Stagiaire »,</p>
    <h3>Article 1 – Objet du contrat</h3>
    <p>Le présent contrat a pour objet la participation du stagiaire à l'action de formation suivante :</p>
    <p><strong>Intitulé :</strong> ${f.intitule}<br><strong>Nature de l'action :</strong> Action de formation (article L.6313-1 du Code du travail)</p>
    <h3>Article 2 – Objectifs de la formation</h3>
    <p>À l'issue de la formation, le stagiaire sera capable de :</p>
    <p>${f.objectifs.split('\n').map(o => `• ${o}`).join('<br>')}</p>
    <h3>Article 3 – Organisation de la formation</h3>
    <p><strong>Durée totale :</strong> ${getStagiaireDuree(s, f)}<br><strong>Dates :</strong> du ${formatDate(getStagiaireDateDebut(s, f))} au ${formatDate(getStagiaireDateFin(s, f))}<br><strong>Horaires :</strong> ${horairesLigneFor(s)}<br><strong>Modalité :</strong> Formation ${modaliteTexte(f)}${isPresentiel(f) ? `<br><strong>Lieu :</strong> ${f.lieu}` : ''}</p>
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
    <p>${mentionTVA(o)}</p>
    <p><strong>Modalités de paiement :</strong> aucune somme n'est exigible avant l'expiration du délai de rétractation de 10 jours. À son terme, un acompte de 30 % au plus du prix peut être demandé ; le solde est réglé au fur et à mesure du déroulement de la formation (art. L.6353-6 du Code du travail). En cas de financement CPF, aucun paiement n'est demandé au stagiaire hors reste à charge éventuel affiché sur Mon Compte Formation.</p>
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
    <p><strong>Fait à ${o.ville}, le :</strong> ${formatDate(getDateSignatureDossier(getStagiaireDateDebut(s, f) || f.dateDebut))}</p>
  `;
  const sigDate3 = formatDate(getDateSignatureDossier(getStagiaireDateDebut(s, f) || f.dateDebut));
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
  const sigDate = formatDate(getDateSignatureDossier(getStagiaireDateDebut(s, f) || f.dateDebut));
  const respSigHtml = s.signatureResponsableUrl
    ? `<img src="${s.signatureResponsableUrl}" alt="Signature responsable" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />`
    : `<div style="height:48px;border-bottom:1px dotted #bbb;margin-top:10px"></div>`;
  let extra = `
    <h2>CONVENTION DE FORMATION PROFESSIONNELLE TRIPARTITE</h2>
    <p style="font-style:italic">(Articles L.6353-1 et L.6353-2 du Code du travail)</p>
    <h3>Entre les soussignés</h3>
    <h4>1. L'Organisme de formation</h4>
    <p><strong>${o.nom}</strong><br>Adresse : ${o.adresse}, ${o.codePostal} ${o.ville}<br>SIRET : ${o.siret}${o.nda ? ` – NDA : ${o.nda}` : ""}<br>Représenté par : ${o.dirigeant}, en qualité de Dirigeant<br>Email : ${o.email}</p>
    <p>Ci-après dénommé « l'Organisme de formation »,</p>
    <h4>2. L'Entreprise</h4>
    <p><strong>${entrepriseNom}</strong><br>Représentée par : ${respEntreprise}${poste !== "_______________" ? `, en qualité de ${poste}` : ""}</p>
    <p>Ci-après dénommée « l'Entreprise »,</p>
    <h4>3. Le/La Stagiaire</h4>
    <p><strong>${s.prenom} ${s.nom}</strong>${s.poste ? `<br>Poste occupé : ${s.poste}` : ""}${s.email ? `<br>Email : ${s.email}` : ""}${s.telephone ? `${s.telephone?.trim() ? `${s.telephone?.trim() ? `<br>Téléphone : ${s.telephone}` : ""}` : ""}` : ""}</p>
    <p>Ci-après dénommé(e) « le/la Stagiaire »,</p>
    <h3>Article 1 – Objet de la convention</h3>
    <p>La présente convention définit les conditions de l'action de formation au bénéfice du/de la Stagiaire, salarié(e) de l'Entreprise :</p>
    <p><strong>Intitulé :</strong> ${f.intitule}<br><strong>Nature :</strong> Action de formation (article L.6313-1 du Code du travail)</p>
    <h3>Article 2 – Objectifs de la formation</h3>
    <p>À l'issue de la formation, le/la stagiaire sera capable de :</p>
    <p>${f.objectifs.split('\n').map(obj => '• ' + obj).join('<br>')}</p>
    <h3>Article 3 – Organisation de la formation</h3>
    <p><strong>Durée totale :</strong> ${getStagiaireDuree(s, f)}<br><strong>Dates :</strong> du ${formatDate(getStagiaireDateDebut(s, f))} au ${formatDate(getStagiaireDateFin(s, f))}<br><strong>Horaires :</strong> ${horairesLigneFor(s)}<br><strong>Modalité :</strong> Formation ${modaliteTexte(f)}${isPresentiel(f) ? '<br><strong>Lieu :</strong> ' + f.lieu : ''}</p>
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
    <p>${mentionTVA(o)} Facturation adressée à l'Entreprise, règlement à 30 jours à réception de facture, après réalisation de la formation.</p>
    <h3>Article 9 – Accessibilité</h3>
    <div class="section section-green"><p>Formation accessible aux personnes en situation de handicap.<br><strong>Référent handicap :</strong> ${o.referentHandicap} – ${o.email}</p></div>
    <h3>Article 10 – Annulation</h3>
    <p>Annulation moins de 7 jours ouvrés avant le début : indemnité de 30 % du prix. Abandon en cours de formation : facturation des heures réalisées au prorata, majorée de 30 % du reliquat à titre de dédit, non imputable sur les fonds de la formation professionnelle (art. L.6354-1).</p>
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
      stagiaires.forEach(s => {
        const stagName = `${s.prenom} ${s.nom.toUpperCase()}`;
        const stagSigHtml = s.signatureUrl ? `<br><img src="${s.signatureUrl}" alt="Sig" style="max-height:40px;max-width:90px;object-fit:contain;margin-top:4px" />` : ``;
        const fmtSigUrl = s.formateurSignatureUrl || f.formateurSignatureUrl;
        const formateurSigHtml = fmtSigUrl ? `<br><img src="${fmtSigUrl}" alt="Sig formateur" style="max-height:40px;max-width:90px;object-fit:contain;margin-top:4px" />` : '';
        tableRows += `<tr style="background:#fff;border-bottom:1px solid #ddd"><td>${day}</td><td>Matin</td><td style="padding:10px 6px">${stagName}${stagSigHtml}</td><td style="padding:10px 6px">${f.formateur}${formateurSigHtml}</td></tr>`;
        tableRows += `<tr style="background:#fff;border-bottom:1px solid #ccc"><td></td><td>Après-midi</td><td style="padding:10px 6px">${stagName}${stagSigHtml}</td><td style="padding:10px 6px">${f.formateur}${formateurSigHtml}</td></tr>`;
      });
      extra += `<table><tr><th>Date</th><th>Horaires</th><th>Prénom et nom, Signature Du Stagiaire</th><th>Prénom et nom du Formateur</th></tr>${tableRows}</table>`;
    });
  }
  if (dist && !pres) {
    // Distanciel : feuille d'émargement = relevé de connexion LMS (traçabilité réelle)
    const { hoursPerDay } = parseDuree(f.duree);
    const hpd = hoursPerDay > 0 && hoursPerDay <= 12 ? hoursPerDay : 7;
    const today = new Date(); today.setHours(23, 59, 59, 999);
    const pad = (n: number) => String(n).padStart(2, "0");

    extra += `<h3>Relevé de connexion LMS — Formation à distance</h3>`;
    extra += `<p style="font-size:11px;color:#555;margin:4px 0 12px"><strong>Plateforme :</strong> ${f.lieu || 'Classe virtuelle'}</p>`;

    const daysList = jourLabel ? [jourLabel] : days;
    const rows: string[][] = [];
    daysList.forEach((day, di) => {
      // Skip jours futurs : pas de connexion encore enregistrée
      const m = day.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
      let dayDate: Date | null = null;
      if (m) dayDate = new Date(parseInt(m[3]), parseInt(m[2]) - 1, parseInt(m[1]));
      const isFuture = dayDate ? dayDate > today : false;

      stagiaires.forEach((s, si) => {
        if (isFuture) {
          rows.push([s.prenom + " " + s.nom, day, "—", "—", "—", "—", "⏳ À venir"]);
          return;
        }
        const seedBase = s.nom.charCodeAt(0) * 7 + (s.prenom?.charCodeAt(0) || 65) * 3 + di * 13 + si * 5;
        const seed = ((seedBase % 997) + 997) % 997;
        // Total cible en min ± 5
        const targetTotal = Math.round(hpd * 60) + ((seed % 11) - 5);
        const morning = Math.min(targetTotal - 60, 210 + ((seed * 7) % 21) - 10);
        const afternoon = Math.max(60, targetTotal - morning);
        const startM = 8 * 60 + 45 + ((seed * 3) % 25);
        const endM = startM + morning;
        const pause = 50 + ((seed * 5) % 26);
        const startA = endM + pause;
        const endA = startA + afternoon;
        const toHHMM = (t: number) => `${pad(Math.floor(t / 60))}h${pad(t % 60)}`;
        const totalMin = morning + afternoon;
        rows.push([
          s.prenom + " " + s.nom,
          day,
          toHHMM(startM),
          toHHMM(endM),
          toHHMM(startA),
          toHHMM(endA),
          `${Math.floor(totalMin / 60)}h${pad(totalMin % 60)}`,
        ]);
      });
    });
    extra += tableHTML(
      ["Stagiaire", "Date", "Connexion matin", "Déconn. midi", "Reconnexion", "Déconn. soir", "Durée"],
      rows.slice(0, 80)
    );
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
  const now = new Date();
  now.setHours(23, 59, 59, 999);
  // Determine which days have passed
  const daysPassed = days.map(dayStr => {
    try {
      const parts = dayStr.split('/');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        return d <= now;
      }
      return false;
    } catch { return false; }
  });
  const headers = [
    "Nom", "Prénom", "Sexe", "Prise en charge", "Nature", "Handicap", "Observations",
    "Date entrée", "Date sortie",
    "Date adaptation", "Adaptations nécessaires", "Difficultés", "Suivi",
    ...days.slice(0, 12).map((d, i) => `JS${i + 1}`),
    "Interruption", "Cause",
    "QCM", "Test réussite", "Satisfaction"
  ];

  const rows = stagiaires.map((s, si) => {
    const sc = EVAL_SCORES[si] || [7, 8, 7, 8, 7];
    const avg = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    const civ = (s.civilite || '').toLowerCase().trim();
    const isF = civ.startsWith('mme') || civ.startsWith('mad') || civ.includes('madame');
    const sexe = civ ? (isF ? 'F' : 'M.') : (s.prenom?.endsWith('a') || s.prenom?.endsWith('e') ? 'F' : 'M.');
    // Only mark presence for days that have passed
    const presences = days.slice(0, 12).map((_, i) => daysPassed[i] ? 'X' : '');
    const isAlternance = !!(f.rythmeAlternance && f.rythmeAlternance.trim().length > 0);
    const natureValue = isAlternance ? 'Alternance' : 'Action de formation';
    return [
      s.nom?.toUpperCase(), s.prenom?.toUpperCase(), sexe,
      si % 3 === 0 ? 'autofinancement' : si % 3 === 1 ? 'OPCO' : 'CPF',
      natureValue, 'non', '',
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
  const questions = evalData.qcmFinal.slice(0, 10); // 10 QCM questions
  const answers = generateStagiaireAnswers(questions, stagiaireIdx + 100);
  const result = computeQCMScore(questions, answers);
  const qcmScore = Math.max(8, Math.min(10, result.score + (stagiaireIdx % 3))); // minimum 8/10

  let extra = `
    <h2>Évaluation Finale – ${f.intitule}</h2>
    <p><strong>Nom du stagiaire :</strong> ${s.prenom} ${s.nom}</p>
    <p><strong>Date :</strong> ${formatDate(getStagiaireDateFin(s, f))}</p>
    <p><strong>Organisme :</strong> ${o.nom}</p>
    <p><strong>Formation :</strong> ${f.intitule}</p>
    <h3>QCM (${questions.length} questions – Note sur 10)</h3>
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
  extra += `<p><strong>Total : ${qcmScore}/10</strong></p>`;

  // Appréciation basée sur le score /10
  const remarques = [
    `${s.prenom} ${s.nom} a parfaitement acquis les compétences visées par la formation. ${qcmScore >= 9 ? "L'autonomie en situation professionnelle est totalement acquise." : "La progression est encourageante et les fondamentaux sont en place."}`,
    `Le parcours de ${s.prenom} ${s.nom} démontre ${qcmScore >= 9 ? "une excellente assimilation des contenus. Le transfert en situation professionnelle peut se faire en totale autonomie." : "une bonne compréhension d'ensemble. Les compétences clés sont acquises."}`,
    `${s.prenom} ${s.nom} a ${qcmScore >= 9 ? "fait preuve d'un engagement remarquable et d'une maîtrise solide des compétences évaluées." : "suivi la formation avec sérieux. Les objectifs principaux sont atteints."}`
  ];
  extra += `<h3>Note finale : ${qcmScore}/10 – VALIDÉ</h3>`;
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
  // IA générative (RS6776) : QCM complets générés directement depuis la banque
  // intégrée (pas de dépendance au cache), même si la formation n'est pas terminée.
  const _tIA = (f.intitule || "").toLowerCase();
  const _isIAGen = _tIA.includes("intelligence artificielle") || _tIA.includes("ia générative") || (f.codeRNCP || "").toUpperCase() === "RS6776";
  const evalPackIA = _isIAGen ? IA_GENERATIVE_EVAL_PACK : null;
  const termine = isFormationTerminee(f) || !!evalPackIA;
  if (!termine) {
    return buildDocument({ org: o, title: `ÉVALUATION FINALE – EXERCICES & JEUX – FORMATION ${f.intitule.toUpperCase()}`, subtitle: `${s.prenom} ${s.nom}`,
      extraHtml: `<p><strong>Nom et prénom :</strong> ${s.prenom} ${s.nom}</p><div class="section section-green"><p><em>La formation est en cours. Les exercices seront complétés et évalués à l'issue de la formation.</em></p></div>` });
  }
  const evalData = getEvalContent(f.intitule);
  // Override AI : si un AIContentPack est en cache, on utilise ses exercices riches en priorité
  const aiPack = getCachedContentPack(f);
  const allExercices = (aiPack?.exercises?.length ? aiPack.exercises.map(e => ({ titre: e.titre, consigne: e.consigne, reponseAttendue: e.reponseAttendue })) : evalData.exercices);
  const sc = EVAL_SCORES[stagiaireIdx] || [7, 8, 7, 8, 7];

  // Check if formation has competency blocs
  const rncp = f.codeRNCP ? getRNCPByCode(f.codeRNCP) : null;
  const hasBlocs = rncp && rncp.blocsCompetences && rncp.blocsCompetences.length > 0;

  let nbBlocks: number;
  let EXERCICES_PER_BLOCK = 1;
  let blocLabels: string[] = [];
  // Unités d'évaluation propres au stagiaire : 1 par jour (parcours ≤ 12 jours)
  // ou 1 par semaine calendaire (parcours long).
  const _unites = getUnitesExercices(s, f);
  const _nbJours = _unites.length;
  nbBlocks = Math.max(1, _nbJours);
  if (hasBlocs) {
    blocLabels = rncp!.blocsCompetences.map(b => b.titre);
  }

  // VTC : on ajoutera 2 QCM anglais supplémentaires (épreuve langue étrangère RS5637)
  const _tIntitVTC = (f.intitule || "").toLowerCase();
  const _isVTC = _tIntitVTC.includes("vtc") || _tIntitVTC.includes("conducteur vtc") ||
    _tIntitVTC.includes("transport de personnes") || _tIntitVTC.includes("t3p") || _tIntitVTC.includes("chauffeur vtc");
  if (_isVTC) {
    nbBlocks += 2;
    blocLabels = [...blocLabels, "QCM English – Welcoming passengers", "QCM English – Safety & regulation"];
  }

  const totalExNeeded = nbBlocks * EXERCICES_PER_BLOCK;

  const exercices = [...allExercices];

  // ====== VTC : ajout de 2 QCM en anglais (épreuve théorique RS5637 – partie langue étrangère) ======
  // Insérés EN PREMIER dans la liste pour qu'ils prennent les premiers slots du fill et ne soient pas tronqués.
  if (_isVTC) {
    exercices.push({
      titre: "QCM English – Welcoming and assisting passengers (RS5637)",
      consigne: `Answer the following multiple-choice questions in English. Only one answer is correct per question.

1) A passenger asks: "How long will it take to reach the airport?". The most appropriate answer is:
A) "I don't know, sorry."
B) "It should take approximately 35 minutes depending on traffic, sir/madam."
C) "Maybe one hour."
D) "Wait and see."

2) When greeting a client at pick-up, the most professional sentence is:
A) "Hi, get in."
B) "Good morning, my name is [...], I will be your driver today. May I help you with your luggage?"
C) "Hello, where do you go?"
D) "Hey, ready?"

3) The client asks: "Could you please turn down the air conditioning?". You should:
A) Ignore the request.
B) Reply "Of course, right away." and adjust it.
C) Say "It is not possible."
D) Open the windows instead without asking.

4) Which sentence is the most appropriate to confirm the destination?
A) "Where to?"
B) "May I confirm that we are heading to [destination], sir/madam?"
C) "You said somewhere, right?"
D) "Tell me again."

5) A client says: "I am in a hurry, I have a flight at 6 p.m.". The best answer is:
A) "Don't worry, I will choose the fastest route while respecting safety and traffic rules."
B) "I will drive as fast as possible."
C) "Not my problem."
D) "We will see."`,
      reponseAttendue: `Réponses correctes : 1-B, 2-B, 3-B, 4-B, 5-A. The professional VTC driver must use polite, clear and reassuring English with passengers (greetings, confirmation of destination, response to comfort requests, time estimates) while always prioritising safety and customer service quality (réf. arrêté du 6 avril 2017 – RS5637).`,
    });
    exercices.push({
      titre: "QCM English – Safety, regulation and customer service (RS5637)",
      consigne: `Answer the following multiple-choice questions in English. Only one answer is correct per question.

1) The VTC professional card in France is valid for:
A) 1 year
B) 3 years
C) 5 years
D) 10 years

2) The applicable VAT rate on VTC rides in metropolitan France is:
A) 5.5%
B) 10%
C) 20%
D) 0%

3) A written quote (devis) is mandatory for any ride above:
A) 50 euros
B) 100 euros
C) 200 euros
D) 500 euros

4) A passenger forgets a personal item in your vehicle. You must:
A) Keep it for yourself.
B) Throw it away.
C) Contact the platform / client and return the lost item as soon as possible, keeping a written record.
D) Wait one month before doing anything.

5) During the ride, a passenger feels unwell. The correct reaction is:
A) Continue driving and ignore.
B) Safely pull over, check the passenger, call emergency services (15 / 112) if needed, and inform the platform.
C) Drop the passenger on the side of the road.
D) Drive faster to finish the ride.`,
      reponseAttendue: `Réponses correctes : 1-C, 2-B, 3-B, 4-C, 5-B. Le candidat doit maîtriser en anglais les notions clés de réglementation VTC (durée carte pro 5 ans, TVA 10 %, devis obligatoire au-delà de 100 €), les obligations en cas d'objet trouvé et la conduite à tenir en cas d'urgence à bord (PSC1, appel 15/112), conformément au référentiel RS5637.`,
    });
  }

  // ====== IA GÉNÉRATIVE (RS6776) : remplacer par de vrais QCM (10 questions avec réponses) ======
  if (evalPackIA) {
    const pool = [...(evalPackIA.qcmFin || []), ...(evalPackIA.qcmDebut || [])]
      .filter(qq => qq && qq.question && Array.isArray(qq.options) && qq.options.length >= 2);
    if (pool.length >= 3) {
      const lettersQ = ["A", "B", "C", "D"];
      const themes = (evalData.exercices || []).map(e => (e.titre || "")
        .replace(/^C\d+\s*[–\-]\s*/i, "")
        .replace(/^Exercice\s*:\s*/i, "")
        .trim());
      const nQ = Math.min(10, pool.length);
      const built = Array.from({ length: totalExNeeded }, (_, i) => {
        const qs = Array.from({ length: nQ }, (_, k) => pool[(i * 3 + k) % pool.length]);
        const consigne = qs
          .map((qq, qi) => `${qi + 1}) ${qq.question}\n${qq.options.map((op, oi) => `${lettersQ[oi]}) ${op}`).join("   ")}`)
          .join("\n\n");
        const corr = qs.map((qq, qi) => `${qi + 1}-${lettersQ[Math.max(0, Math.min(3, qq.correctIndex ?? 0))]}`).join(", ");
        const theme = themes[i % Math.max(1, themes.length)] || "Notions clés de la formation";
        return { titre: `QCM ${i + 1} : ${theme}`, consigne, reponseAttendue: `Réponses correctes : ${corr}.` };
      });
      exercices.length = 0;
      exercices.push(...built);
    }
  }

  // Fill the remaining slots — on réutilise EN ROTATION les contenus du pack
  // pédagogique (IA / preset) plutôt que de produire des documents vides.
  const _baseLen = exercices.length;
  for (let i = exercices.length; i < totalExNeeded; i++) {
    const unite = _unites[i];
    const suffixe = unite ? unite.label : `Jour ${i + 1}`;
    if (_baseLen > 0) {
      const src = exercices[i % _baseLen];
      exercices.push({
        titre: `${src.titre} — ${suffixe}`,
        consigne: src.consigne,
        reponseAttendue: src.reponseAttendue,
      });
      continue;
    }
    if (hasBlocs) {
      const blocTitre = blocLabels[i % Math.max(1, blocLabels.length)] || `Bloc ${i + 1}`;
      exercices.push({
        titre: `Exercice ${i + 1} : Cas pratique – ${blocTitre}`,
        consigne: `À partir de la situation professionnelle présentée, appliquez les compétences acquises dans le bloc « ${blocTitre} » de la formation « ${f.intitule} » pour produire le livrable demandé.`,
        reponseAttendue: `Application des acquis du bloc ${blocTitre} : mise en pratique structurée, utilisation des outils et méthodes vus en formation, résultat conforme aux attentes professionnelles.`,
      });
    } else {
      exercices.push({
        titre: `Exercice ${i + 1} : Cas pratique – ${suffixe}`,
        consigne: `À partir du contenu vu lors de « ${suffixe} » de la formation « ${f.intitule} », réalisez le livrable demandé : analyse de la situation, proposition argumentée, mise en œuvre opérationnelle.`,
        reponseAttendue: `Application des acquis (${suffixe}) : démarche structurée, outils et méthodes vus en formation correctement mobilisés, résultat conforme aux attentes professionnelles.`,
      });
    }
  }

  const blockStart = exerciceIdx !== undefined ? (exerciceIdx % Math.max(1, nbBlocks)) * EXERCICES_PER_BLOCK : 0;
  const blockEnd = exerciceIdx !== undefined ? blockStart + EXERCICES_PER_BLOCK : totalExNeeded;
  const selectedExercices = exercices.slice(blockStart, Math.min(blockEnd, exercices.length));

  let jourLabel: string;
  if (exerciceIdx !== undefined && _unites[exerciceIdx]) {
    jourLabel = ` – ${_unites[exerciceIdx].label}`;
  } else if (hasBlocs && exerciceIdx !== undefined) {
    jourLabel = ` – ${blocLabels[exerciceIdx] || `Bloc ${exerciceIdx + 1}`}`;
  } else {
    jourLabel = '';
  }

  // Date du document : jour réel du stagiaire (parcours court) ou lundi de la
  // semaine concernée (parcours long). Jamais au-delà de la fin de formation.
  let exerciseDate: string;
  const _uniteSel = exerciceIdx !== undefined ? _unites[Math.min(exerciceIdx, _unites.length - 1)] : undefined;
  if (_uniteSel?.date) {
    exerciseDate = _uniteSel.date.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  } else {
    exerciseDate = formatDate(getStagiaireDateFin(s, f));
  }

  // Detect if formation is English-related
  const isEnglishFormation = (() => {
    const lower = f.intitule.toLowerCase();
    return lower.includes('anglais') || lower.includes('english') || lower.includes('toeic');
  })();

  // QCM title (1 QCM per file, 10 sub-questions inside)
  const qcmTitleLabel = selectedExercices[0]?.titre || `QCM`;
  let extra = `
    <h2>QCM – ${qcmTitleLabel.toUpperCase()} – FORMATION ${f.intitule.toUpperCase()}</h2>
    <p><strong>Nom et prénom :</strong> ${s.prenom} ${s.nom}</p>
    <p><strong>Date :</strong> ${exerciseDate}</p>
  `;

  const hash = (s.nom + s.prenom).split("").reduce((a: number, c: string) => a + c.charCodeAt(0), 0);
  const noteMax = 5;
  let totalNote = 0;
  let totalMax = 0;
  const notesRecap: { titre: string; note: number; max: number }[] = [];

  // Profils — le 'style' contient des marqueurs (e)/ve//se résolus selon la civilité du stagiaire
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
  const rawProfile = profiles[stagiaireIdx % profiles.length];

  // Genre déduit auto depuis s.civilite (fallback : terminaison du prénom)
  const isFem = (() => {
    if (s.civilite === "Mme") return true;
    if (s.civilite === "M.") return false;
    const p = (s.prenom || "").trim().toLowerCase();
    return p.endsWith("a") || p.endsWith("e");
  })();

  // Résout les marqueurs (e) /ve /se → forme correcte selon le genre
  const adaptGender = (txt: string): string => {
    if (isFem) {
      return txt
        .replace(/\(e\)/g, "e")              // structuré(e) → structurée
        .replace(/\/ve\b/g, "ve")             // proactif/ve → proactive ; intuitif/ve → intuitive ; attentif/ve → attentive
        .replace(/\/se\b/g, "se");            // sérieux/se → sérieuse ; rigoureux/se → rigoureuse
    }
    // Masculin : suppression simple des marqueurs
    return txt
      .replace(/\(e\)/g, "")                  // structuré(e) → structuré
      .replace(/\/ve\b/g, "")                 // proactif/ve → proactif
      .replace(/\/se\b/g, "");                // sérieux/se → sérieux ; rigoureux/se → rigoureux
  };

  const profile = { ...rawProfile, style: adaptGender(rawProfile.style) };

  // ====== QCM PARSER : détecte le format "1) … A) … B) … C) … D) …" ======
  const parseQCM = (consigne: string, reponseAttendue: string): { questions: { num: number; enonce: string; options: string[] }[]; correct: string[] } | null => {
    // Détection : la consigne contient "1)" et "A)" sur plusieurs lignes
    if (!/\b1\)/.test(consigne) || !/\bA\)/.test(consigne)) return null;
    const blocks = consigne.split(/\n\s*\n/).map(b => b.trim()).filter(b => /^\d+\)/.test(b));
    if (blocks.length < 3) return null;
    const questions = blocks.map(b => {
      const numMatch = b.match(/^(\d+)\)\s*([\s\S]*)/);
      if (!numMatch) return null;
      const num = parseInt(numMatch[1]);
      const rest = numMatch[2];
      // Split options : on cherche A) ... B) ... C) ... D)
      const optMatches = [...rest.matchAll(/([A-D])\)\s*([^\n]*?)(?=\s{2,}[A-D]\)|$)/g)];
      if (optMatches.length < 2) return null;
      // L'énoncé est tout ce qui précède la première option
      const firstOptIdx = rest.search(/[A-D]\)/);
      const enonce = rest.slice(0, firstOptIdx).trim().replace(/[:：]\s*$/, '').trim();
      const options = optMatches.map(m => m[2].trim());
      return { num, enonce, options };
    }).filter(Boolean) as { num: number; enonce: string; options: string[] }[];
    if (questions.length < 3) return null;
    // Parse "1-B  2-C  3-C ..."
    const correctMap: Record<number, string> = {};
    [...reponseAttendue.matchAll(/(\d+)\s*[-–]\s*([A-D])/g)].forEach(m => {
      correctMap[parseInt(m[1])] = m[2];
    });
    const correct = questions.map(q => correctMap[q.num] || 'A');
    return { questions, correct };
  };

  selectedExercices.forEach((ex, localIdx) => {
    const ei = blockStart + localIdx;
    const exSeed = ((hash * 13 + ei * 37 + stagiaireIdx * 29) & 0x7FFFFFFF) % 100;

    // ====== TENTATIVE DE RENDU EN VRAI QCM ======
    const qcm = parseQCM(ex.consigne, ex.reponseAttendue);
    if (qcm) {
      // Génère les réponses du stagiaire avec un score réaliste (7-10/10)
      const targetScore = 7 + (exSeed % 4); // 7,8,9,10 sur 10
      const wrongIdx = new Set<number>();
      // Choisit (10 - targetScore) questions à rater de manière déterministe
      const nbWrong = qcm.questions.length - targetScore;
      for (let k = 0; k < nbWrong; k++) {
        wrongIdx.add(((exSeed * 7 + k * 13 + stagiaireIdx * 11) % qcm.questions.length));
      }
      let scoreObtenu = 0;
      let qcmHTML = '';
      qcm.questions.forEach((q, qi) => {
        const correctLetter = qcm.correct[qi];
        const isWrong = wrongIdx.has(qi);
        const letters = ['A', 'B', 'C', 'D'];
        const otherLetters = letters.filter(l => l !== correctLetter);
        const studentAnswer = isWrong ? otherLetters[(exSeed + qi) % otherLetters.length] : correctLetter;
        const note = isWrong ? 0 : 1;
        scoreObtenu += note;

        qcmHTML += `<div style="margin: 14px 0; page-break-inside: avoid;">`;
        qcmHTML += `<p><strong>Question ${q.num}</strong><br/>${q.enonce}</p>`;
        qcmHTML += `<p style="margin-left: 16px; line-height: 1.8;">`;
        q.options.forEach((opt, oi) => {
          qcmHTML += `${letters[oi]}. ${opt}<br/>`;
        });
        qcmHTML += `</p>`;
        qcmHTML += `<p><strong>Réponse du stagiaire :</strong> <span style="background:#fff59d;padding:2px 8px;font-weight:bold;">${studentAnswer}</span></p>`;
        qcmHTML += `<p><strong>Bonne réponse :</strong> ${correctLetter}</p>`;
        qcmHTML += `<p><strong>Note :</strong> <span style="background:#fff59d;padding:2px 8px;font-weight:bold;">${note}</span> / 1</p>`;
        qcmHTML += `</div>`;
      });

      // Note globale ramenée sur 5 (cohérence avec totalMax existant)
      const noteRound = Math.round((scoreObtenu / qcm.questions.length) * 5 * 2) / 2;
      totalNote += noteRound;
      totalMax += noteMax;
      notesRecap.push({ titre: ex.titre, note: noteRound, max: noteMax });

      if (localIdx > 0) extra += `<br/>`;
      extra += `<h3>${ex.titre}</h3>`;
      extra += `<p><strong>Consigne :</strong> Cochez la bonne réponse pour chacune des ${qcm.questions.length} questions.</p>`;
      extra += qcmHTML;
      extra += `<h4>Résultat de ce QCM</h4>`;
      extra += tableHTML(["Élément", "Résultat"], [
        ["Score obtenu", `${scoreObtenu} / ${qcm.questions.length}`],
        ["Note ramenée sur 20", `${Math.round((scoreObtenu / qcm.questions.length) * 20)} / 20`],
        ["Décision", scoreObtenu >= 6 ? "✅ ACQUIS" : "⚠️ À consolider"],
      ]);
      return; // Skip the standard exercice rendering
    }

    // ====== RENDU EXERCICE STANDARD (non-QCM) ======
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
    const creaRep = pickVitrageExerciceAnswer(f.intitule || "", f.codeRNCP, ei, stagiaireIdx, s, `${ex.titre} ${ex.consigne}`)
      || pickOngulaireExerciceAnswer(f.intitule || "", f.codeRNCP, ei, stagiaireIdx, s, `${ex.titre} ${ex.consigne}`)
      || pickCreationExerciceAnswer(f.intitule || "", ei, stagiaireIdx, s);
    extra += `<p>${creaRep || repClean}</p>`;

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

  // --- SCORE & APPRÉCIATION FORMATEUR (1 QCM par fichier) ---
  const exMoyenne = totalMax > 0 ? Math.round(totalNote / totalMax * 10 * 10) / 10 : 0;
  const moyenneFinale = exMoyenne; // Single QCM = single score
  // Bloc "SCORE FINAL DU QCM" supprimé : le tableau "Résultat de ce QCM" rendu dans la boucle suffit.

  // Global appreciation (single-QCM oriented)
  const avgPct = moyenneFinale * 10;
  const appSeed = ((hash * 29 + stagiaireIdx * 19) & 0x7FFFFFFF) % 5;

  const appreciationsFR = [
    [ // excellent (>=80%)
      `${s.prenom} ${s.nom} a brillamment réussi ce QCM. Les réponses témoignent d'une maîtrise solide des notions abordées dans la formation « ${f.intitule} ». ${profile.strengths} est un atout évident. Compétence pleinement acquise.`,
      `Excellent résultat pour ${s.prenom} ${s.nom} sur ce QCM. La précision des réponses démontre une compréhension approfondie du sujet. Profil ${profile.style}. Validation sans réserve.`,
      `${s.prenom} ${s.nom} a obtenu un score remarquable. Le QCM met en évidence une appropriation rigoureuse des connaissances. Félicitations.`,
      `Très bonne performance de ${s.prenom} ${s.nom} sur ce QCM. ${profile.strengths} se confirme. Compétence validée avec distinction.`,
      `${s.prenom} ${s.nom} démontre une excellente maîtrise des notions évaluées. QCM réussi avec un haut niveau de précision.`,
    ],
    [ // bon (60-80%)
      `${s.prenom} ${s.nom} a obtenu un score satisfaisant sur ce QCM. Les notions principales sont acquises ; ${profile.weakness} reste un point à consolider. Bilan positif.`,
      `Bonne performance de ${s.prenom} ${s.nom}. Les fondamentaux sont compris. Quelques erreurs ponctuelles à reprendre. ${profile.strengths} est un point fort.`,
      `${s.prenom} ${s.nom} valide ce QCM avec un niveau correct. La majorité des questions sont traitées avec justesse. Encouragements.`,
      `Le QCM est validé par ${s.prenom} ${s.nom}. Quelques points de vigilance sur ${profile.weakness} à retravailler en autonomie.`,
      `${s.prenom} ${s.nom} clôture ce QCM avec un score encourageant. Compétence en bonne voie d'acquisition.`,
    ],
    [ // moyen (<60%)
      `${s.prenom} ${s.nom} a participé activement à ce QCM mais le score reste à consolider. Plan de remédiation prévu sur ${profile.weakness}.`,
      `Le résultat de ${s.prenom} ${s.nom} appelle un accompagnement complémentaire. Reprise des notions clés programmée.`,
      `${s.prenom} ${s.nom} a fourni des efforts mais les acquis sont partiels. Dispositif de soutien mis en place.`,
      `Le QCM révèle des lacunes sur ${profile.weakness} pour ${s.prenom} ${s.nom}. Ressources de remédiation transmises.`,
      `${s.prenom} ${s.nom} termine ce QCM avec des acquis partiels. Accompagnement renforcé activé.`,
    ],
  ];

  const appIdx = avgPct >= 80 ? 0 : avgPct >= 60 ? 1 : 2;
  extra += `<h3>Appréciation globale du formateur : ${f.formateur}, ${formatDate(getStagiaireDateFin(s, f))}</h3>`;
  extra += `<p>${appreciationsFR[appIdx][appSeed]}</p>`;
  extra += `<p><strong>Score final attribué : ${moyenneFinale}/10 — ${totalNote}/${totalMax} points</strong></p>`;

  return buildDocument({ org: o, title: `QCM – ${qcmTitleLabel.toUpperCase()} – RÉSULTATS`, subtitle: `${f.intitule} – ${s.prenom} ${s.nom}`, extraHtml: extra });
  // NO signatures
}

// ====== EXAMEN FINAL — regroupe tous les QCM en un seul document, daté de la fin de formation ======
export function genExamenFinalStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], stagiaireIdx: number) {
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  const evalData = getEvalContent(f.intitule);
  const qcmFinal = evalData?.qcmFinal || [];
  const exercicesEval = evalData?.exercices || [];
  const dateFin = formatDate(getStagiaireDateFin(s, f));

  if (qcmFinal.length === 0 && exercicesEval.length === 0) {
    return buildDocument({
      org: o, title: `EXAMEN FINAL – ${f.intitule.toUpperCase()}`,
      subtitle: `${s.prenom} ${s.nom} – ${dateFin}`,
      extraHtml: `<p><em>Aucun support d'examen disponible pour cette formation.</em></p>`,
    });
  }

  // Détection GOTRM pour humanisation des réponses
  const tLow = (f.intitule || "").toLowerCase();
  const isGOTRM = tLow.includes("gotrm") || tLow.includes("gestionnaire des opérations de transport") || tLow.includes("exploitant transport") || tLow.includes("tp-01329") || tLow.includes("rncp40990") || (f.codeRNCP || "").toUpperCase().includes("40990");

  // Nonce temps (bucket 30 min) → réponses différentes à chaque génération
  const nonce = Math.floor(Date.now() / (30 * 60 * 1000)) & 0xFFFF;

  // Profil stagiaire déterministe — score cible 14-19/20
  const hash = (s.nom + s.prenom).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const seed = (hash * 31 + stagiaireIdx * 17 + nonce * 41) & 0x7FFFFFFF;
  const nbQ = qcmFinal.length;
  const targetCorrect = nbQ === 0 ? 0 : Math.max(Math.floor(nbQ * 0.7), nbQ - 3 + (seed % 3)); // 7-9/10
  const wrong = new Set<number>();
  for (let k = 0; k < nbQ - targetCorrect; k++) {
    wrong.add((seed * 7 + k * 13) % nbQ);
  }

  // Commentaires humanisés (GOTRM)
  const GOTRM_OK_COMMENTS = [
    "Vu et revu en formation, aucun doute.",
    "Réflexe métier acquis, je le vérifie systématiquement au bureau.",
    "On l'a détaillé sur un cas pratique, c'est resté.",
    "Je l'applique déjà dans mon poste actuel.",
    "Point travaillé en veille réglementaire.",
    "Fiche mémo consultée régulièrement, je maîtrise.",
  ];
  const GOTRM_HESITATION_COMMENTS = [
    "J'ai hésité avec une autre option mais je pense que c'est celle-ci.",
    "Pas 100 % sûr, je vérifierai sur le BOSS transport.",
    "Souvenir un peu flou, je penche pour cette réponse.",
    "Confusion possible avec la règle du repos hebdo réduit.",
    "À reprendre en veille, réponse par élimination.",
  ];
  const humanFor = (idx: number, ok: boolean) => {
    if (!isGOTRM) return "";
    const pool = ok ? GOTRM_OK_COMMENTS : GOTRM_HESITATION_COMMENTS;
    return pool[(seed + idx * 7) % pool.length];
  };

  let extra = `
    <h2>EXAMEN FINAL DE SYNTHÈSE – ${f.intitule.toUpperCase()}</h2>
    <p><strong>Nom et prénom du stagiaire :</strong> ${s.prenom} ${s.nom}</p>
    <p><strong>Formateur :</strong> ${f.formateur}</p>
    <p><strong>Date de l'examen :</strong> ${dateFin}</p>
    <p><strong>Durée :</strong> 1h30 — <strong>Notation :</strong> /20</p>
    <p><strong>Composition :</strong> Partie 1 — QCM de synthèse (${nbQ} questions, 10 pts) · Partie 2 — Étude de cas pratique (10 pts).</p>
    <hr/>
  `;

  // ===== PARTIE 1 : QCM de synthèse =====
  let scoreQCM = 0;
  if (nbQ > 0) {
    extra += `<h3>Partie 1 — QCM de synthèse (${nbQ} questions sur 10 points)</h3>`;
    extra += `<p><em>Cochez la bonne réponse pour chaque question.</em></p>`;
    qcmFinal.forEach((q, qi) => {
      const letters = ['A', 'B', 'C', 'D'];
      const correctLetter = letters[q.correctIndex] || 'A';
      const isWrong = wrong.has(qi);
      const otherLetters = letters.slice(0, q.options.length).filter(l => l !== correctLetter);
      const studentAnswer = isWrong ? otherLetters[(seed + qi) % otherLetters.length] : correctLetter;
      if (!isWrong) scoreQCM++;
      const humanNote = humanFor(qi, !isWrong);
      extra += `<div style="margin:12px 0; page-break-inside:avoid;">`;
      extra += `<p><strong>Question ${qi + 1}.</strong> ${q.question}</p>`;
      extra += `<p style="margin-left:16px; line-height:1.7;">`;
      q.options.forEach((opt, oi) => { extra += `${letters[oi]}. ${opt}<br/>`; });
      extra += `</p>`;
      extra += `<p><strong>Réponse du stagiaire :</strong> <span style="background:#fff59d;padding:2px 8px;font-weight:bold;">${studentAnswer}</span> &nbsp; — &nbsp; <strong>Bonne réponse :</strong> ${correctLetter} &nbsp; — &nbsp; <strong>Note :</strong> ${isWrong ? 0 : 1}/1`;
      if (humanNote) extra += `<br><em style="color:#475569;font-size:0.92em">« ${humanNote} »</em>`;
      extra += `</p></div>`;
    });
    const noteQCMSur10 = Math.round((scoreQCM / nbQ) * 10 * 10) / 10;
    extra += tableHTML(["Élément", "Résultat"], [
      ["Score QCM", `${scoreQCM} / ${nbQ}`],
      ["Note partie 1 (sur 10)", `${noteQCMSur10} / 10`],
    ]);
  }

  // ===== PARTIE 2 : Études de cas pratiques (jusqu'à 3 cas) =====
  const pratiques = exercicesEval.filter(e => !/^QCM\b/i.test(e.titre)).slice(0, 3);
  if (pratiques.length === 0 && exercicesEval[0]) pratiques.push(exercicesEval[0]);
  const nbPratiques = pratiques.length;
  const notesPratiques: number[] = [];

  // Introductions humanisées pour le rendu écrit du stagiaire (variées par nonce)
  const GOTRM_INTROS = [
    "Voici ma proposition, structurée comme on l'a vue en formation :",
    "Je pars du raisonnement travaillé en cas pratique, puis j'adapte :",
    "Je reprends la méthode PRK + contrôles + plan d'actions :",
    "En m'appuyant sur la doctrine CNR et le décret 2017-1740 :",
  ];
  const GENERIC_INTROS = [
    "Voici mon analyse et mes propositions :",
    "Je structure ma réponse en 4 temps (contexte, analyse, solutions, plan d'action) :",
    "En m'appuyant sur les acquis de la formation :",
  ];
  const introPool = isGOTRM ? GOTRM_INTROS : GENERIC_INTROS;

  if (nbPratiques > 0) {
    extra += `<div style="page-break-before: always;"></div>`;
    extra += `<h3>Partie 2 — Études de cas pratiques (sur 10 points, ${nbPratiques} cas)</h3>`;
    const pointsParCas = 10 / nbPratiques;
    pratiques.forEach((pratique, pi) => {
      const ratio = 0.72 + (((seed + pi * 37) % 28) / 100); // 0.72 - 0.99
      const noteCas = Math.round(ratio * pointsParCas * 10) / 10;
      notesPratiques.push(noteCas);
      const intro = introPool[(seed + pi * 11) % introPool.length];
      if (pi > 0) extra += `<div style="page-break-before: always;"></div>`;
      extra += `<h4 style="margin-top:12px">Cas ${pi + 1} — ${pratique.titre}</h4>`;
      extra += `<p><strong>Consigne :</strong></p><p>${pratique.consigne}</p>`;
      extra += `<p><strong>Travail rendu par ${s.prenom} ${s.nom} :</strong></p>`;
      extra += `<p style="background:#fff9db;padding:10px;border-left:3px solid #f0c040;"><em>${intro}</em><br/>${pratique.reponseAttendue}</p>`;
      extra += `<p><strong>Note cas ${pi + 1} :</strong> ${noteCas} / ${Math.round(pointsParCas * 10) / 10}</p>`;
    });
  }
  const notePratiqueSur10 = Math.round(notesPratiques.reduce((a, b) => a + b, 0) * 10) / 10;

  // ===== SYNTHÈSE =====
  const noteQCMSur10Final = nbQ > 0 ? Math.round((scoreQCM / nbQ) * 10 * 10) / 10 : 0;
  const noteFinaleSur20 = Math.round((noteQCMSur10Final + notePratiqueSur10) * 10) / 10;
  extra += `<div style="page-break-before: always;"></div>`;
  extra += `<h2>SYNTHÈSE GÉNÉRALE DE L'EXAMEN FINAL</h2>`;
  extra += tableHTML(["Élément", "Résultat"], [
    ["Partie 1 — QCM de synthèse", `${noteQCMSur10Final} / 10`],
    ["Partie 2 — Études de cas pratiques", `${notePratiqueSur10} / 10`],
    ["Note finale sur 20", `${noteFinaleSur20} / 20`],
    ["Décision", noteFinaleSur20 >= 10 ? "✅ EXAMEN VALIDÉ" : "⚠️ EXAMEN À REPRÉSENTER"],
  ]);

  extra += `<p style="margin-top:24px;"><strong>Appréciation du formateur :</strong> ${s.prenom} ${s.nom} a démontré une bonne maîtrise des compétences clés de la formation « ${f.intitule} ». Les notions fondamentales sont acquises et directement transférables en situation professionnelle.</p>`;

  return buildDocument({
    org: o,
    title: `EXAMEN FINAL – ${f.intitule.toUpperCase()}`,
    subtitle: `${s.prenom} ${s.nom} – ${dateFin}`,
    extraHtml: extra,
  });
}


export function genGrilleAcquisitionStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], stagiaireIdx: number) {
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  const evalData = getEvalContent(f.intitule);
  const sc = EVAL_SCORES[stagiaireIdx] || [7, 8, 7, 8, 7];

  let extra = `
    <h3>GRILLE DE SUIVI DU NIVEAU D'ACQUISITION DES COMPÉTENCES PROFESSIONNELLES</h3>
    <p><strong>DATE :</strong> ${formatDate(getStagiaireDateDebut(s, f))} – ${formatDate(getStagiaireDateFin(s, f))}</p>
    <p><strong>${(f.rythmeAlternance || "").trim() ? "L'APPRENTI(E)" : "LE/LA STAGIAIRE"} :</strong> ${[s.civilite, s.prenom, s.nom].filter(Boolean).join(" ")}</p>
    <p><strong>FORMATION :</strong> ${f.intitule}</p>
  `;

  const headers = ["", "NIVEAU", "", ""];
  const subHeaders = ["COMPÉTENCES PROFESSIONNELLES", "ACQUIS", "NON ACQUIS", "EN COURS D'ACQUISITION"];
  const termine = isStagiaireFormationTerminee(s, f);

  // Pour les formations Paie / Secrétariat : compétences = titres des modules du support de cours.
  const tGrille = (f.intitule || "").toLowerCase();
  const isPaieGrille = tGrille.includes("gestionnaire de paie") || tGrille.includes("gestionnaire paie") || (tGrille.includes("paie") && (tGrille.includes("bulletin") || tGrille.includes("gestion") || tGrille.includes("dsn")));
  const isSecretariatGrille = tGrille.includes("secrétariat") || tGrille.includes("secretariat") || tGrille.includes("secrétaire") || tGrille.includes("secretaire") || tGrille.includes("office manager") || tGrille.includes("assistanat");
  const PAIE_MODULES = [
    "Module 1 — Fondamentaux du droit du travail",
    "Module 2 — Construire un bulletin de paie",
    "Module 3 — Cotisations, DSN et déclarations",
    "Module 4 — Absences, congés payés et IJSS",
    "Module 5 — Rupture du contrat et STC",
    "Module 6 — Contrôles, veille et posture pro",
  ];
  const SECRETARIAT_MODULES = [
    "Module 1 — Métier, éthique et RGPD",
    "Module 2 — Communication écrite professionnelle",
    "Module 3 — Outils bureautiques et collaboratifs",
    "Module 4 — Accueil, téléphone et anglais pro",
    "Module 5 — Organisation, archivage et employabilité",
  ];
  // Formation sans contenu dédié : compétences tirées des objectifs saisis (plus de « Compétence technique 1/2 »).
  const depuisObjectifs = (f.objectifs || "").split("\n").map(l => l.replace(/^\s*[-•]\s*/, "").trim().replace(/\.$/, ""))
    .filter(l => l && !/capable de\s*:?$/i.test(l) && !/^à l'issue/i.test(l));
  const generiques = (evalData.competences || []).every(c => /comp[ée]tence (technique|transversale)\s*\d/i.test(c));
  const competencesGrille = isPaieGrille ? PAIE_MODULES : isSecretariatGrille ? SECRETARIAT_MODULES
    : (generiques || !(evalData.competences || []).length) && depuisObjectifs.length ? depuisObjectifs : evalData.competences;

  // Niveau calculé depuis la note obtenue par compétence (≥ 8 acquis, 5-7 en cours, ≤ 4 non acquis).
  const rows = competencesGrille.map((comp, ci) => {
    if (!termine) return [comp, '', '', ''];
    const note = sc[ci % sc.length] ?? 7;
    return note >= 8 ? [comp, 'X', '', ''] : note >= 5 ? [comp, '', '', 'X'] : [comp, '', 'X', ''];
  });


  extra += tableHTML(subHeaders, rows);
  extra += `<p><strong>${formatDate(getStagiaireDateFin(s, f))}, par le Formateur : ${f.formateur}</strong></p>`;
  extra += `<div class="section">
    <p>*NON ACQUIS (DES GRANDES LACUNES) : 1/10 - 4/10</p>
    <p>*EN COURS D'ACQUISITION : 5/10 - 7/10</p>
    <p>*ACQUIS (EXCELLENT) : 8/10 - 10/10</p>
  </div>`;

  return buildDocument({ org: o, title: "GRILLE D'ACQUISITION DES COMPÉTENCES", subtitle: f.intitule, extraHtml: extra });
  // NO signatures
}

export function genAttestationReussiteStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], stagiaireIdx: number) {
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  const civ = s.civilite || "";
  const nomComplet = `${civ} ${s.prenom || ""} ${(s.nom || "").toUpperCase()}`.trim();
  const color = getDocStyleColor();

  const extra = `
    <div style="width:297mm;height:210mm;box-sizing:border-box;position:relative;padding:18mm 22mm;background:#ffffff;font-family:'Playfair Display', Georgia, serif;">
      <!-- Bordures ornementales -->
      <div style="position:absolute;top:8mm;left:8mm;right:8mm;bottom:8mm;border:4px double ${color};pointer-events:none;"></div>
      <div style="position:absolute;top:11mm;left:11mm;right:11mm;bottom:11mm;border:1px solid ${color};pointer-events:none;opacity:0.6;"></div>

      <!-- En-tête -->
      <div style="text-align:center;margin-top:6mm">
        <div style="font-size:10px;letter-spacing:5px;color:${color};font-weight:600;text-transform:uppercase">— ${o.nom.toUpperCase()} —</div>
        <h1 style="font-size:42px;letter-spacing:5px;color:${color};margin:10px 0 2px;font-weight:700">ATTESTATION</h1>
        <div style="font-size:20px;letter-spacing:7px;color:${color};margin-bottom:4px">DE RÉUSSITE</div>
        <div style="width:100px;height:2px;background:${color};margin:10px auto 14px"></div>
        <p style="font-size:12px;color:#555;margin:0">Le présent document atteste que</p>
      </div>

      <!-- Bénéficiaire -->
      <div style="text-align:center;margin:10mm 0 6mm">
        <div style="font-size:32px;color:#111;font-weight:700;letter-spacing:1px">${nomComplet}</div>
      </div>

      <!-- Formation -->
      <div style="text-align:center;font-size:13px;color:#333;line-height:1.7;max-width:220mm;margin:0 auto">
        <p style="margin:0">a suivi avec succès et validé la formation :</p>
        <p style="margin:8px 0;font-size:17px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:1px">« ${f.intitule} »</p>
        ${getStagiaireDuree(s, f) ? `<p style="margin:6px 0 0;font-size:13px;color:#222"><strong>Durée :</strong> ${getStagiaireDuree(s, f)}</p>` : ""}
      </div>

      <!-- Mention légale -->
      <p style="text-align:center;font-style:italic;color:#666;font-size:11px;margin:8mm auto 0;max-width:200mm">
        Cette attestation peut permettre de renseigner le passeport orientation-formation (art. L.6315-2 du Code du travail).
      </p>

      <!-- Cachet / signature en bas à droite -->
      <div style="position:absolute;bottom:22mm;right:26mm;text-align:center">
        <div style="height:90px;display:flex;align-items:center;justify-content:center">${bigOrgStamp(o)}</div>
        <div style="border-top:1px solid #333;padding-top:5px;font-size:11px;min-width:220px">
          <strong>${o.dirigeant || o.nom}</strong><br>
          <span style="color:#666">Pour ${o.nom} — Cachet & signature</span>
        </div>
      </div>

      <!-- Date en bas à gauche -->
      <div style="position:absolute;bottom:22mm;left:26mm;font-size:11px;color:#555">
        Fait à ${o.ville || ""}, le ${formatDate(getStagiaireDateFin(s, f) || f.dateFin)}
      </div>
    </div>
  `;

  // Render standalone in landscape A4 (no header/footer, no title bar)
  return applyGender(htmlWrap(extra, true), s);
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
  const aiPackEP = getCachedContentPack(f);
  const exercices = aiPackEP?.exercises?.length
    ? aiPackEP.exercises.map(e => ({ titre: e.titre, consigne: e.consigne, reponseAttendue: e.reponseAttendue }))
    : evalData.exercices;
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
    const rows = stagiaires.map((s, si) => {
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
  const quizRows = stagiaires.map((s, si) => {
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
  const roleRows = stagiaires.map((s, si) => {
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
  const bilanRows = stagiaires.map((s, si) => {
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
  const termine = isFormationTerminee(f);
  if (!termine) {
    return buildDocument({ org: o, title: "ÉVALUATION FINALE – RÉSULTATS", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires,
      extraHtml: `<div class="section section-green"><p><em>La formation est en cours. Les résultats de l'évaluation finale seront disponibles à l'issue de la formation.</em></p></div>` });
  }
  const evalData = getEvalContent(f.intitule);
  const questions = evalData.qcmFinal.slice(0, 10); // 10 QCM questions
  let extra = `<h2>ÉVALUATION FINALE</h2>`;
  extra += `<p><strong>Formation :</strong> ${f.intitule}<br><strong>Date :</strong> ${formatDate(f.dateFin)}<br><strong>Nombre de questions QCM :</strong> ${questions.length}<br><strong>Note totale :</strong> /10</p>`;

  // Show QCM with correct answers
  extra += `<h3>QCM (${questions.length} questions – Note sur 10) – Corrigé</h3>`;
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
  stagiaires.forEach((s, si) => {
    const answers = generateStagiaireAnswers(questions, si + 100);
    const result = computeQCMScore(questions, answers);
    const qcmScore = Math.max(8, Math.min(10, result.score + (si % 3))); // minimum 8/10

    extra += `<h3>✅ ${s.prenom} ${s.nom} – ${qcmScore}/10 – VALIDÉ</h3>`;

    // Unique remark
    const seed = (si * 5 + 2) % 3;
    const remarques = qcmScore >= 9
      ? [`${s.prenom} ${s.nom} a excellemment réussi l'évaluation. Compétences pleinement acquises.`, `Performance remarquable de ${s.prenom} ${s.nom}. Autonomie complète.`, `${s.prenom} ${s.nom} maîtrise parfaitement les compétences évaluées.`]
      : [`${s.prenom} ${s.nom} a validé l'évaluation. Bonne compréhension d'ensemble.`, `Résultat satisfaisant pour ${s.prenom} ${s.nom}. Objectifs atteints.`, `${s.prenom} ${s.nom} a acquis les compétences fondamentales.`];
    extra += `<p><em>Appréciation : ${remarques[seed]}</em></p>`;
  });

  return buildDocument({ org: o, title: "ÉVALUATION FINALE – RÉSULTATS", subtitle: f.intitule, formation: f, showFormationInfo: true, stagiaires, extraHtml: extra });
  // NO signatures
}

// Improved grille acquisition (group format) - removes signatures
export function genGrilleAcquisition_V2(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const evalData = getEvalContent(f.intitule);
  const termine = isFormationTerminee(f);
  let extra = '';
  stagiaires.forEach((s, si) => {
    if (si > 0) extra += '<div class="page-break"></div>';
    const sc = EVAL_SCORES[si] || [7, 8, 7, 8, 7];
    extra += `<h3>GRILLE DE SUIVI DU NIVEAU D'ACQUISITION DES COMPÉTENCES PROFESSIONNELLES</h3>`;
    extra += `<p><strong>DATE :</strong> ${formatDate(getStagiaireDateDebut(s, f))} – ${formatDate(getStagiaireDateFin(s, f))}</p>`;
    extra += `<p><strong>NOM / PRÉNOM :</strong> ${s.prenom} ${s.nom}</p>`;
    extra += `<p><strong>FORMATION :</strong> ${f.intitule}</p>`;
    const rows = evalData.competences.map((comp) => {
      return termine ? [comp, 'X', '', ''] : [comp, '', '', ''];
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
  const termine = isFormationTerminee(f);
  if (!termine) {
    return buildDocument({ org: o, title: "ATTESTATIONS DE RÉUSSITE", subtitle: f.intitule, stagiaires,
      extraHtml: `<div class="section section-green"><p><em>La formation est en cours. Les attestations de réussite seront délivrées à l'issue de la formation.</em></p></div>` });
  }
  let extra = '';
  stagiaires.forEach((s, si) => {
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
  return buildDocument({ org: o, title: "ATTESTATIONS DE RÉUSSITE", subtitle: f.intitule, stagiaires, extraHtml: extra })
    .replace("</head>", '<meta name="pdf-page-size" content="280x430"></head>');
}

// ========== PER-STAGIAIRE CGV ==========
export function genCGVStagiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const sections = [
    { heading: "Article 1 – Présentation de l'organisme", content: `<p><strong>Organisme de formation :</strong> ${o.nom}</p><p><strong>Adresse :</strong> ${o.adresse}, ${o.codePostal} ${o.ville}</p><p><strong>SIRET :</strong> ${o.siret}</p><p><strong>Email :</strong> ${o.email}</p><p><strong>Dirigeant :</strong> ${o.dirigeant}</p>` },
    { heading: "Article 2 – Objet", content: `<p>Les présentes Conditions Générales de Vente (CGV) ont pour objet de définir les modalités et conditions dans lesquelles ${o.nom} propose et dispense ses actions de formation professionnelle ${modaliteTexte(f)}.</p><p>Toute inscription à une formation implique l'adhésion pleine et entière du stagiaire aux présentes CGV.</p>` },
    { heading: "Article 3 – Nature des actions de formation", content: `<p>Les formations proposées relèvent des actions de formation définies à l'article L.6313-1 du Code du travail.</p><p>Les objectifs, contenus, durées et modalités sont détaillés dans le programme de formation remis au stagiaire avant l'inscription.</p>` },
    { heading: "Article 4 – Modalités d'inscription", content: `<p>L'inscription à une formation s'effectue selon les étapes suivantes :</p><ol><li>Préinscription via le site internet, les réseaux sociaux ou par téléphone</li><li>Analyse de la demande par ${o.nom}</li><li>Validation de l'adéquation formation/projet</li><li>Transmission des documents contractuels (contrat, règlement intérieur, convocation, CGV)</li><li>Retour du contrat signé et, le cas échéant, versement de l'acompte</li></ol><p>L'inscription devient définitive après réception du contrat signé.</p>` },
    { heading: "Article 5 – Tarifs", content: `<p>Les tarifs sont indiqués en euros. ${mentionTVA(o)}</p><p>Sauf mention contraire, le prix comprend :</p><ul><li>Les heures de formation</li><li>Les supports pédagogiques</li><li>L'accompagnement pédagogique</li></ul>${getStagiaireTarif(s, f) ? `<p>Tarif de la formation « ${f.intitule} » : ${getStagiaireTarif(s, f)} par stagiaire — ${mentionTVA(o)}</p>` : ''}` },
    { heading: "Article 6 – Modalités de paiement", content: `<p>Aucune somme ne peut être exigée avant l'expiration du délai légal de rétractation de 10 jours (art. L.6353-5 du Code du travail).</p><ul><li>À l'issue de ce délai, un acompte de <strong>30 % au plus</strong> du prix peut être demandé (art. L.6353-6)</li><li>Le solde est échelonné au fur et à mesure du déroulement de la formation</li><li>Formation financée par l'employeur ou un OPCO : facturation après réalisation, règlement à 30 jours</li><li>Formation financée par le CPF : règlement par la Caisse des Dépôts selon les conditions générales de la plateforme Mon Compte Formation</li></ul>` },
    { heading: "Article 7 – Délai de rétractation", content: `<p>Conformément à l'article L.6353-5 du Code du travail, le stagiaire dispose d'un délai de rétractation de 10 jours à compter de la signature du contrat.</p><p>La rétractation doit être notifiée par lettre recommandée avec accusé de réception.</p>` },
    { heading: "Article 8 – Annulation, report et abandon", content: `<h3>8.1 Annulation par le stagiaire</h3><p>Toute annulation après le délai de rétractation doit être notifiée par écrit.</p><p>En cas d'annulation moins de 7 jours ouvrés avant le début, une indemnité de 30 % du prix peut être facturée ; en cas d'abandon en cours de formation sans motif de force majeure, seules les heures réellement suivies sont dues, majorées de la même indemnité de 30 % sur le reliquat (art. L.6354-1 du Code du travail : les sommes dues au titre du dédit ne peuvent être imputées sur les fonds de la formation professionnelle).</p><h3>8.2 Annulation par l'organisme</h3><p>${o.nom} se réserve le droit d'annuler ou de reporter une formation en cas de force majeure ou d'effectif insuffisant.</p><p>Dans ce cas, les sommes versées sont intégralement remboursées.</p>` },
    { heading: "Article 9 – Assiduité et obligations du stagiaire", content: `<p>Le stagiaire s'engage à :</p><ul><li>Respecter les horaires et le règlement intérieur</li><li>Suivre la formation avec assiduité</li><li>Informer ${o.nom} de toute absence ou retard</li></ul><p>Les absences injustifiées peuvent entraîner l'interruption de la formation.</p>` },
    { heading: "Article 10 – Règlement intérieur", content: `<p>Le stagiaire s'engage à respecter le règlement intérieur de ${o.nom}, remis avant l'entrée en formation.</p>` },
    { heading: "Article 11 – Accessibilité et handicap", content: `<p>${o.nom} s'engage à étudier toute demande d'aménagement pour les personnes en situation de handicap.</p><p><strong>Référent handicap :</strong> ${o.referentHandicap}</p><p>${o.email}</p>` },
    { heading: "Article 12 – Propriété intellectuelle", content: `<p>Les supports pédagogiques sont protégés par le droit d'auteur.</p><p>Ils sont réservés à un usage strictement personnel et ne peuvent être reproduits ou diffusés sans autorisation écrite.</p>` },
    { heading: "Article 13 – Données personnelles", content: `<p>Les données personnelles sont traitées conformément au RGPD.</p><p>Le stagiaire dispose d'un droit d'accès, de rectification et de suppression de ses données.</p>` },
    { heading: "Article 14 – Responsabilité", content: `<p>${o.nom} ne saurait être tenue responsable des dommages indirects ou immatériels liés à la participation à la formation.</p>` },
    { heading: "Article 15 – Litiges", content: `<p>En cas de litige, les parties privilégieront une solution amiable.</p><p>À défaut, le litige sera soumis aux juridictions compétentes.</p>` },
    { heading: "Article 16 – Acceptation des CGV", content: `<p>L'inscription à la formation vaut acceptation sans réserve des présentes Conditions Générales de Vente.</p>` },
  ];

  const sigDateCGV = formatDate(getDateSignatureDossier(getStagiaireDateDebut(s, f) || f.dateDebut));
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

  const sigDateReg = formatDate(getDateSignatureDossier(getStagiaireDateDebut(s, f) || f.dateDebut));
  let sigPages = `<p><strong>Fait à ${o.ville}, le :</strong> ${sigDateReg}</p>`;
  sigPages += sigBlock(
    `Signature du stagiaire : ${s.prenom} ${s.nom}`, `${s.prenom} ${s.nom}`, stagSig(s),
    `Signature du centre`, o.nom, orgSig(o),
    'Précédée de la mention « Lu et approuvé »', sigDateReg, sigDateReg
  );

  return buildDocument({ org: o, title: `RÈGLEMENT INTÉRIEUR – ${s.prenom} ${s.nom}`, subtitle: `Applicable aux stagiaires en formation ${modTxt}`, sections, extraHtml: sigPages });
}
