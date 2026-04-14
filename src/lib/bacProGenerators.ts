/**
 * Auto-generators for Bac Pro Logistique documents (La Maison d'Apprentissage).
 * Each function returns HTML with stagiaire data filled in, ready for PDF export.
 */
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { htmlWrap, formatDate, getDocStyle } from "./docBuilder";

/** Render signature image or empty placeholder */
function sigImg(url?: string, height = 60): string {
  if (!url) return `<p style="height:${height}px"></p>`;
  return `<img src="${url}" alt="Signature" style="max-height:${height}px;max-width:200px;object-fit:contain;" />`;
}

/** Render tampon (stamp) image */
function tamponImg(url?: string, height = 70): string {
  if (!url) return "";
  return `<img src="${url}" alt="Tampon" style="max-height:${height}px;max-width:200px;object-fit:contain;margin-top:4px;" />`;
}

/** Org signature block with tampon */
function orgSigBlock(o: OrganismeInfo): string {
  return `${sigImg(o.signatureUrl)}${tamponImg(o.tamponUrl)}`;
}

/** Stagiaire signature block */
function stagSigImg(s: StagiaireInfo): string {
  return sigImg(s.signatureUrl);
}

const ORG_NAME = "LA MAISON DE L'APPRENTISSAGE";
const ORG_ADDR = "32 RUE GUY MOQUET, 92240 MALAKOFF";
const ORG_SIRET = "93535008200035";
const ORG_NDA = "11922829992";
const ORG_EMAIL = "lamaisondelapprentissage92@gmail.com";
const ORG_TEL = "07.53.35.57.34";
const ORG_PRESIDENT = "Halouane Hacene";

function header() {
  return `<div style="border-bottom:2px solid #1a56db;padding-bottom:8px;margin-bottom:16px;">
    <p style="font-weight:bold;font-size:14px;margin:0">${ORG_NAME}</p>
    <p style="font-size:11px;margin:2px 0">Adresse : ${ORG_ADDR}</p>
    <p style="font-size:11px;margin:2px 0">SIRET : ${ORG_SIRET} / NDA: ${ORG_NDA}</p>
    <p style="font-size:11px;margin:2px 0">Email : ${ORG_EMAIL}</p>
    <p style="font-size:11px;margin:2px 0">Téléphone : ${ORG_TEL}</p>
    <p style="font-size:11px;margin:2px 0">Président: <strong>${ORG_PRESIDENT}</strong></p>
  </div>`;
}

function footerBlock() {
  return `<div style="border-top:1px solid #ccc;margin-top:24px;padding-top:6px;font-size:9px;color:#666;">
    <p>${ORG_NAME} — ${ORG_ADDR}</p>
    <p>SIRET : ${ORG_SIRET} / NDA: ${ORG_NDA}</p>
    <p>Cet enregistrement ne vaut pas agrément de l'état</p>
    <p>Document mis à jour : le 23/07/2025</p>
  </div>`;
}

function stagName(s: StagiaireInfo) {
  return [s.prenom, s.nom].filter(Boolean).join(" ") || "N/A";
}

function stagDateDebut(s: StagiaireInfo, f: FormationInfo) {
  return formatDate((s as any).dateDebutFormation || (s as any).dateDebut || f.dateDebut || "") || "N/A";
}
function stagDateFin(s: StagiaireInfo, f: FormationInfo) {
  return formatDate((s as any).dateFinFormation || (s as any).dateFin || f.dateFin || "") || "N/A";
}
function stagFormateur(s: StagiaireInfo) {
  return s.formateur || "Le formateur";
}
function stagCivilite(s: StagiaireInfo) {
  if (s.civilite === "Mme") return "Madame";
  if (s.civilite === "M.") return "Monsieur";
  return "Madame, Monsieur";
}

function wrap(body: string) {
  return htmlWrap(`${header()}${body}${footerBlock()}`);
}

// Deterministic scores — always good (15-20/20 range)
function getScore(si: number, qIdx: number, max: number): number {
  const seed = ((si + 1) * 7 + qIdx * 13) % 100;
  if (seed < 15) return Math.max(1, max - 1); // occasionally lose 1 point
  return max; // full marks most of the time
}
function getNote20(si: number, nbQ: number, total: number): number {
  let sum = 0;
  for (let i = 0; i < nbQ; i++) sum += getScore(si, i, Math.round(total / nbQ));
  return Math.max(15, Math.min(20, Math.round((sum / total) * 20)));
}
function appreciation(note20: number): string {
  if (note20 >= 16) return "Excellent travail. L'apprenant démontre une maîtrise solide des compétences évaluées. Continuez ainsi.";
  if (note20 >= 12) return "Bon travail dans l'ensemble. Quelques axes d'amélioration identifiés mais les compétences fondamentales sont acquises.";
  if (note20 >= 8) return "Travail satisfaisant. Des lacunes subsistent sur certains points. Un renforcement est recommandé.";
  return "Des difficultés importantes ont été constatées. Un accompagnement renforcé est nécessaire.";
}

/** Vary a stagiaire's open-ended response based on their index + question index.
 *  Returns a slightly modified version of the correction to simulate different answers. */
function varyStagResponse(correction: string, si: number, qIdx: number, score: number, maxPoints: number): string {
  const ratio = score / maxPoints;
  const seed = ((si + 1) * 11 + qIdx * 7) % 10;

  // Perfect score → full answer with slight personal phrasing
  if (ratio >= 1) {
    const prefixes = [
      "", "Selon moi, ", "D'après mes connaissances, ", "Je pense que ",
      "Il me semble que ", "En formation, j'ai appris que ", "À mon avis, ",
      "D'après ce que j'ai étudié, ", "Comme vu en cours, ", "En pratique, "
    ];
    return prefixes[seed] + correction.charAt(0).toLowerCase() + correction.slice(1);
  }

  // Partial score → truncated/incomplete answer
  if (ratio >= 0.5) {
    const sentences = correction.split(/[.!]\s+/).filter(Boolean);
    // Keep ~60% of the sentences
    const keep = Math.max(1, Math.ceil(sentences.length * 0.6));
    const kept = sentences.slice(0, keep).join(". ") + ".";
    const additions = [
      "", " Je ne suis pas sûr(e) pour le reste.", " (réponse incomplète)",
      " Le reste m'échappe.", " Je n'ai pas pu développer davantage.",
      "", " J'hésite sur les autres points.", " Il me manque des éléments.",
      " Je dois approfondir ce sujet.", ""
    ];
    return kept + additions[seed];
  }

  // Low score → vague/wrong answer
  const vagues = [
    "Je ne suis pas sûr(e) mais je pense qu'il faut vérifier les documents.",
    "Il faut respecter les consignes et suivre les procédures en place.",
    "On doit s'assurer que tout est conforme aux normes de sécurité.",
    "Il faut communiquer avec l'équipe et signaler les problèmes.",
    "Je pense qu'il faut organiser le travail de manière efficace.",
    "Il est important de suivre les règles et de bien s'organiser.",
    "On doit vérifier la conformité et noter les anomalies.",
    "Il faut être rigoureux et respecter les étapes.",
    "Je crois qu'il faut informer le responsable et agir vite.",
  ];
  return vagues[si % vagues.length];
}

/** Vary test de positionnement response */
function varyTestResponse(fullAnswer: string, si: number, qIdx: number): string {
  const note = getNote20(si, 4, 20);
  const quality = note >= 14 ? 2 : note >= 10 ? 1 : 0; // 2=good, 1=partial, 0=weak
  return varyStagResponse(fullAnswer, si, qIdx, quality, 2);
}

function gradeLevel(si: number, compIdx: number): string {
  const seed = ((si + 1) * 11 + compIdx * 7) % 100;
  if (seed < 5) return "NA";
  if (seed < 15) return "ECA";
  if (seed < 50) return "A";
  return "MA";
}
function gradeObs(level: string): string {
  if (level === "MA") return "Autonome et efficace";
  if (level === "A") return "Compétence acquise";
  if (level === "ECA") return "En progression";
  return "À renforcer";
}

// ============================================
// CONTRAT DE FORMATION PROFESSIONNELLE (BPL_03)
// ============================================
export function genContratBacPro(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  const dateDebut = stagDateDebut(s, f);
  const dateFin = stagDateFin(s, f);
  const tarif = (s as any).tarifFormation || f.tarif || "8200";
  const tarifNum = parseFloat(tarif.replace(/[^\d.]/g, "")) || 8200;
  const part30 = Math.round(tarifNum * 0.3);
  const part35 = Math.round(tarifNum * 0.35);
  const dateSignature = dateDebut;

  return wrap(`
    <h1 style="text-align:center;font-size:18px;margin:20px 0">CONTRAT DE FORMATION PROFESSIONNELLE</h1>
    <p><strong>Entre les soussignés :</strong></p>
    <p><strong>Organisme de formation</strong><br/>
    <strong>Nom :</strong> ${ORG_NAME}<br/>
    <strong>Adresse :</strong> ${ORG_ADDR}<br/>
    <strong>SIRET :</strong> ${ORG_SIRET}<br/>
    <strong>E-mail :</strong> ${ORG_EMAIL}<br/>
    <strong>Représenté par :</strong> Mr ${ORG_PRESIDENT}, Président<br/>
    Ci-après dénommé "l'Organisme de formation",</p>

    <p><strong>Et :</strong></p>
    <p><strong>Nom du stagiaire :</strong> ${stagName(s)}<br/>
    <strong>Date de naissance :</strong> ${formatDate(s.dateNaissance || "") || "N/A"}<br/>
    <strong>Adresse :</strong> ${s.adresse || "N/A"}<br/>
    <strong>Téléphone :</strong> ${s.telephone || "N/A"}<br/>
    <strong>E-mail :</strong> ${s.email || "N/A"}<br/>
    Ci-après dénommé "le Stagiaire",</p>

    <h2>Article 1 – Objet du contrat</h2>
    <p>Le présent contrat est conclu dans le cadre de la formation professionnelle continue, conformément aux dispositions du Code du travail.
    Il a pour objet la participation du stagiaire à la formation intitulée :</p>
    <p style="text-align:center;font-weight:bold;font-size:14px">"BAC PRO LOGISTIQUE"</p>

    <h2>Article 2 – Programme de la formation</h2>
    <p>Le contenu, les objectifs, les compétences visées ainsi que les modalités d'évaluation figurent en annexe jointe au contrat (cf. programme de formation).</p>

    <h2>Article 3 – Durée de la formation</h2>
    <p>La formation se déroule sur un total de <strong>589 heures</strong>, aux dates suivantes : du ${dateDebut} au ${dateFin}, en distanciel</p>

    <h2>Article 4 – Modalités financières</h2>
    <ul>
      <li>Coût total de la formation : ${tarifNum} €</li>
      <li>Modalité de financement : Autofinancement par le stagiaire</li>
      <li>30 % (soit ${part30} €) à payer avant le ${dateDebut}, après le délai de rétractation de 14 jours</li>
      <li>35 % (soit ${part35} €) à payer 14 jours après la date de fin</li>
      <li>35 % (soit ${part35} €) à payer 28 jours après la date de fin</li>
    </ul>

    <h2>Article 5 – Engagements de l'organisme de formation</h2>
    <p>L'organisme s'engage à :</p>
    <ul>
      <li>Mettre à disposition les moyens pédagogiques, humains et techniques nécessaires</li>
      <li>Fournir une attestation de fin de formation au stagiaire</li>
      <li>Respecter les objectifs et le contenu définis dans le programme de formation.</li>
    </ul>

    <h2>Article 6 – Engagements du stagiaire</h2>
    <p>Le stagiaire s'engage à :</p>
    <ul>
      <li>Suivre l'intégralité de la formation</li>
      <li>Respecter les horaires, le règlement intérieur, et participer activement aux activités pédagogiques</li>
      <li>Régler le montant de la formation selon les modalités prévues.</li>
    </ul>

    <h2>Article 7 – Conditions d'annulation</h2>
    <p>En cas d'annulation par le stagiaire moins de 7 jours avant le début de la formation, 50 % du coût restera dû. En cas d'abandon en cours de formation, la totalité du coût reste exigible.</p>

    <p style="margin-top:30px"><strong>Fait à MALAKOFF, le ${dateSignature}</strong></p>
    <p>En deux exemplaires originaux.</p>
    <table style="width:100%;margin-top:20px"><tr>
      <td style="width:50%;vertical-align:top">
        <p><strong>Signature de l'organisme de formation</strong><br/>${ORG_NAME}<br/>Président: Mr ${ORG_PRESIDENT}</p>
        ${orgSigBlock(o)}
      </td>
      <td style="width:50%;vertical-align:top">
        <p><strong>Signature du stagiaire :</strong> ${stagName(s)}</p>
        <p><em>Fait précédé de la mention "Lu et approuvé"</em></p>
        ${stagSigImg(s)}
      </td>
    </tr></table>
  `);
}

// ============================================
// CONVOCATION À LA FORMATION (BPL_04)
// ============================================
export function genConvocationBacPro(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  const dateDebut = stagDateDebut(s, f);
  const dateFin = stagDateFin(s, f);
  const duree = f.duree || "589";
  const civilite = stagCivilite(s);

  return wrap(`
    <h1 style="text-align:center;font-size:18px;margin:20px 0;background:#e8f0fe;padding:10px">CONVOCATION À LA FORMATION</h1>
    <p><strong>Organisme de formation :</strong> ${ORG_NAME}</p>
    <p><strong>À l'attention de :</strong> ${civilite} ${stagName(s)}</p>
    <p><strong>Objet :</strong> Convocation à la formation – BAC PRO LOGISTIQUE</p>
    <p>${civilite},</p>
    <p>Nous avons le plaisir de vous confirmer votre inscription à la formation suivante :</p>
    <table style="width:100%;border-collapse:collapse;margin:12px 0">
      <tr><td style="padding:6px;border:1px solid #ccc;font-weight:bold">Intitulé</td><td style="padding:6px;border:1px solid #ccc">BAC PRO LOGISTIQUE</td></tr>
      <tr><td style="padding:6px;border:1px solid #ccc;font-weight:bold">Du</td><td style="padding:6px;border:1px solid #ccc">${dateDebut}</td></tr>
      <tr><td style="padding:6px;border:1px solid #ccc;font-weight:bold">Au</td><td style="padding:6px;border:1px solid #ccc">${dateFin}</td></tr>
      <tr><td style="padding:6px;border:1px solid #ccc;font-weight:bold">Durée totale</td><td style="padding:6px;border:1px solid #ccc">${duree} heures</td></tr>
      <tr><td style="padding:6px;border:1px solid #ccc;font-weight:bold">Modalité</td><td style="padding:6px;border:1px solid #ccc">Distanciel</td></tr>
    </table>
    <h3>Documents remis avant l'entrée en formation</h3>
    <ul>
      <li>Contrat de formation</li>
      <li>Règlement intérieur</li>
      <li>Programme de formation</li>
      <li>Conditions Générales de Vente (CGV)</li>
    </ul>
    <h3>Matériel à prévoir</h3>
    <ul><li>Un stylo et de quoi prendre des notes</li><li>Le matériel informatique est mis à disposition sur place</li></ul>
    <h3>Accessibilité – Situation de handicap</h3>
    <p>La formation est accessible aux personnes en situation de handicap. Des aménagements peuvent être mis en place sur demande préalable.</p>
    <p><strong>Référent handicap :</strong> ${ORG_PRESIDENT}<br/>${ORG_EMAIL}</p>
    <p>Nous vous remercions de vous présenter <strong>15 minutes avant le début de la formation</strong>.</p>
    <p>Nous vous prions d'agréer, ${civilite}, l'expression de nos salutations distinguées.</p>
    <p style="margin-top:20px"><strong>Fait à MALAKOFF</strong>, le : ${dateDebut}</p>
    <p>${ORG_NAME}<br/>Président: <strong>Mr ${ORG_PRESIDENT}</strong></p>
    <p>Signature :</p>${orgSigBlock(o)}
  `);
}

// ============================================
// CONVOCATION À L'EXAMEN (BPL_05)
// ============================================
export function genConvocationExamenBacPro(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  const dateFin = stagDateFin(s, f);
  const civilite = stagCivilite(s);

  return wrap(`
    <h1 style="text-align:center;font-size:18px;margin:20px 0">CONVOCATION À L'EXAMEN</h1>
    <p><strong>Organisme de formation :</strong> ${ORG_NAME}</p>
    <p><strong>À l'attention de :</strong> ${civilite} ${stagName(s)}<br/>
    <strong>Adresse :</strong> ${s.adresse || "N/A"}</p>
    <p><strong>Objet :</strong> Convocation à l'examen final</p>
    <p>${civilite},</p>
    <p>Dans le cadre de votre formation BAC PRO LOGISTIQUE, nous vous informons que vous êtes convoqué(e) à l'examen suivant :</p>
    <h3>Informations pratiques</h3>
    <p><strong>Date :</strong> ${dateFin}<br/><strong>Durée :</strong> 2 heures</p>
    <h3>Documents à présenter</h3>
    <ul><li>Pièce d'identité en cours de validité</li><li>Présente convocation</li></ul>
    <h3>Consignes</h3>
    <p>Nous vous remercions de vous présenter <strong>15 minutes avant</strong> le début de l'épreuve. Tout retard pourra entraîner un refus d'accès à l'examen.</p>
    <p>Veuillez agréer, ${civilite}, l'expression de nos salutations distinguées.</p>
    <p style="margin-top:20px"><strong>Fait à MALAKOFF</strong>, le : ${dateFin}</p>
    <p>${ORG_NAME}<br/>Président: <strong>Mr ${ORG_PRESIDENT}</strong></p>
    <p>Signature :</p>${orgSigBlock(o)}
  `);
}

// ============================================
// TEST DE POSITIONNEMENT (BPL_06)
// ============================================
export function genTestPositionnementBacPro(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  const dateDebut = stagDateDebut(s, f);
  const dateFin = stagDateFin(s, f);
  const formateur = stagFormateur(s);

  const questions = [
    { q: "Citez trois éléments à vérifier avant l'arrivée d'une livraison de marchandises dans un entrepôt. Expliquez brièvement l'importance de chacun.", r: "Vérifier le bon de commande, préparer la zone de réception et s'assurer de la disponibilité du personnel. Cela permet d'anticiper et de garantir une réception efficace." },
    { q: "Décrivez les contrôles à effectuer lors de la réception physique des marchandises.", r: "Contrôle quantitatif (comptage des colis), contrôle qualitatif (état des marchandises), vérification des références et comparaison avec le bon de livraison." },
    { q: "Définissez ce qu'est une zone de stockage dans un entrepôt. Citez deux règles essentielles pour organiser efficacement ces zones.", r: "Une zone de stockage est un espace dédié au rangement des marchandises. Règles : respecter la méthode FIFO et regrouper les produits par famille." },
    { q: "Lors de la réception, vous constatez que plusieurs colis sont endommagés, mais le transporteur est pressé de repartir. Expliquer les actions à mettre en place.", r: "Émettre des réserves sur le bon de livraison, photographier les dommages, informer le responsable, refuser les colis trop abîmés et enregistrer l'anomalie dans le système." },
  ];

  const note = getNote20(si, 4, 20);

  return wrap(`
    <h1 style="text-align:center;font-size:18px;margin:20px 0;background:#fff3cd;padding:10px">TEST DE POSITIONNEMENT</h1>
    <h3>Identité de l'élève</h3>
    <p><strong>Nom et prénom :</strong> ${stagName(s)}<br/>
    <strong>Formateur :</strong> ${formateur}<br/>
    <strong>Session :</strong> du ${dateDebut} au ${dateFin}<br/>
    <strong>Date :</strong> ${dateDebut}</p>
    <p><strong>Thème :</strong> Réception des marchandises et gestion des zones de stockage</p>
    <p><strong>Objectif :</strong> Vérifier les connaissances fondamentales du stagiaire concernant la réception des marchandises et l'organisation du stockage en entrepôt.</p>
    <p><strong>Modalité :</strong> Évaluation écrite individuelle – Durée : 45 minutes</p>

    ${questions.map((q, i) => `
      <h3 style="margin-top:16px">Question ${i + 1} :</h3>
      <p>${q.q}</p>
      <p><strong>Réponse du stagiaire :</strong></p>
      <p style="border:1px solid #ccc;padding:8px;min-height:40px;background:#fafafa">${varyTestResponse(q.r, si, i)}</p>
    `).join("")}

    <h2 style="margin-top:24px">Résultat Final</h2>
    <p><strong>Note :</strong> <span style="background:#fff3cd;padding:2px 8px;font-weight:bold">${note} / 20</span></p>
    <p><strong>Observations du formateur :</strong> ${formateur}</p>
    <p style="background:#fff3cd;padding:8px">${appreciation(note)}</p>
    <table style="width:100%;margin-top:24px"><tr>
      <td style="width:50%;vertical-align:top">
        <p><strong>Signature du formateur :</strong></p>
        ${sigImg(f.formateurSignatureUrl)}
      </td>
      <td style="width:50%;vertical-align:top">
        <p><strong>Signature du stagiaire :</strong></p>
        ${stagSigImg(s)}
      </td>
    </tr></table>
    <p style="margin-top:12px"><strong>Cachet de l'organisme :</strong></p>
    ${orgSigBlock(o)}
  `);
}

// ============================================
// GRILLE D'ACQUISITION (BPL_07)
// ============================================
export function genGrilleAcquisitionBacPro(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  const dateDebut = stagDateDebut(s, f);
  const dateFin = stagDateFin(s, f);
  const formateur = stagFormateur(s);

  const activities = [
    { title: "Activité 1 – Réception et stockage des marchandises", comps: [
      "Contrôler la conformité des livraisons", "Réaliser les opérations de déchargement en sécurité",
      "Identifier et enregistrer les marchandises", "Affecter les emplacements de stockage",
      "Appliquer les règles de sécurité et d'hygiène"
    ]},
    { title: "Activité 2 – Préparation de commandes et expédition", comps: [
      "Prélever les articles selon un bon de commande", "Utiliser les outils de préparation (scan, WMS, picking...)",
      "Conditionner et étiqueter les colis", "Préparer les documents d'expédition", "Organiser une zone d'expédition"
    ]},
    { title: "Activité 3 – Conduite d'engins et manutention", comps: [
      "Utiliser un chariot de manutention en sécurité", "Respecter les règles de circulation en entrepôt",
      "Optimiser les déplacements et la manutention"
    ]},
    { title: "Activité 4 – Suivi administratif et outils numériques", comps: [
      "Utiliser un logiciel de gestion logistique", "Mettre à jour les stocks informatiquement",
      "Compléter les documents professionnels", "Transmettre des informations fiables à l'équipe"
    ]},
    { title: "Compétences transversales professionnelles", comps: [
      "Travail en équipe", "Communication professionnelle", "Organisation du poste de travail",
      "Respect des consignes et procédures", "Autonomie et ponctualité"
    ]},
  ];

  let compIdx = 0;
  const renderTable = (comps: string[]) => {
    const rows = comps.map(c => {
      const level = gradeLevel(si, compIdx);
      const obs = gradeObs(level);
      compIdx++;
      return `<tr>
        <td style="padding:6px;border:1px solid #ccc">${c}</td>
        <td style="padding:6px;border:1px solid #ccc;text-align:center">${level === "NA" ? "X" : ""}</td>
        <td style="padding:6px;border:1px solid #ccc;text-align:center">${level === "ECA" ? "X" : ""}</td>
        <td style="padding:6px;border:1px solid #ccc;text-align:center">${level === "A" ? "X" : ""}</td>
        <td style="padding:6px;border:1px solid #ccc;text-align:center">${level === "MA" ? "X" : ""}</td>
        <td style="padding:6px;border:1px solid #ccc;font-size:11px">${obs}</td>
      </tr>`;
    }).join("");
    return `<table style="width:100%;border-collapse:collapse;margin:8px 0">
      <thead><tr style="background:#d5e8f0">
        <th style="padding:6px;border:1px solid #ccc;text-align:left">Compétences évaluées</th>
        <th style="padding:6px;border:1px solid #ccc;width:40px">NA</th>
        <th style="padding:6px;border:1px solid #ccc;width:40px">ECA</th>
        <th style="padding:6px;border:1px solid #ccc;width:40px">A</th>
        <th style="padding:6px;border:1px solid #ccc;width:40px">MA</th>
        <th style="padding:6px;border:1px solid #ccc">Observations</th>
      </tr></thead><tbody>${rows}</tbody>
    </table>`;
  };

  const hasGoodLevel = gradeLevel(si, 99) !== "NA";

  return wrap(`
    <h1 style="text-align:center;font-size:18px;margin:20px 0">Grille d'acquisition des compétences</h1>
    <h2 style="text-align:center">Formation: BAC Pro Logistique</h2>
    <p><strong>Nom et prénom de l'apprenant :</strong> ${stagName(s)}<br/>
    <strong>Session :</strong> du ${dateDebut} au ${dateFin}<br/>
    <strong>Date :</strong> ${dateFin}<br/>
    <strong>Formateur :</strong> ${formateur}</p>
    <p><strong>Échelle :</strong> NA = Non acquis | ECA = En cours d'acquisition | A = Acquis | MA = Maîtrisé / Autonome</p>
    ${activities.map(a => `<h3 style="margin-top:16px;color:#1a56db">${a.title}</h3>${renderTable(a.comps)}`).join("")}

    <h3 style="margin-top:16px">Synthèse pédagogique</h3>
    <p><strong>Points forts :</strong> ${hasGoodLevel ? "Bonne maîtrise des opérations de réception et de stockage. Rigueur dans le suivi des procédures." : "Volontaire et assidu(e). Respect des consignes de sécurité."}</p>
    <p><strong>Axes de progression :</strong> Renforcer l'utilisation des outils numériques et la communication professionnelle.</p>
    <p><strong>Avis global du formateur :</strong> [X] ${hasGoodLevel ? "Bon niveau professionnel" : "Progression satisfaisante"}</p>
    <p style="margin-top:20px"><strong>Signature du formateur :</strong> ${formateur}</p>
    ${sigImg(f.formateurSignatureUrl)}
  `);
}

// ============================================
// QUESTIONNAIRE SATISFACTION (BPL_08)
// ============================================
export function genSatisfactionBacPro(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  const dateFin = stagDateFin(s, f);
  const dateDebut = stagDateDebut(s, f);

  function score(si: number, q: number): number {
    return 3 + (((si + 1) * 7 + q * 3) % 2); // 3 or 4
  }

  const sections = [
    { title: "1. Accueil et organisation", qs: [
      "Clarté des informations transmises avant l'entrée en formation",
      "Qualité de l'accueil et de l'intégration",
      "Organisation générale (emploi du temps, alternance)",
      "Suivi administratif (convocations, documents)"
    ]},
    { title: "2. Contenu pédagogique – Bac Pro Logistique", qs: [
      "Les objectifs étaient clairement expliqués",
      "Les enseignements professionnels sont adaptés",
      "Les enseignements généraux complètent efficacement la formation",
      "Les exercices pratiques et mises en situation sont utiles",
      "Les supports pédagogiques sont de qualité"
    ]},
    { title: "3. Formateurs et accompagnement", qs: [
      "Les formateurs maîtrisent leur domaine",
      "Les explications sont claires et adaptées",
      "L'accompagnement individuel est satisfaisant",
      "Le suivi pendant les périodes en entreprise est efficace"
    ]},
    { title: "4. Moyens techniques", qs: [
      "Qualité du matériel logistique",
      "Sécurité et conditions de travail",
      "Accès aux ressources numériques"
    ]},
    { title: "5. Acquisition des compétences", qs: [
      "Développement des compétences en gestion des flux",
      "Plus d'autonomie dans les opérations",
      "Progression dans le travail en équipe",
      "Préparation efficace à l'examen"
    ]},
  ];

  let qGlobal = 0;
  return wrap(`
    <h1 style="text-align:center;font-size:18px;margin:20px 0;text-decoration:underline">Questionnaire Satisfaction</h1>
    <p><strong>Formation :</strong> Bac Pro logistique<br/>
    <strong>Nom et prénom :</strong> ${stagName(s)}<br/>
    <strong>Session :</strong> du ${dateDebut} au ${dateFin}<br/>
    <strong>Date :</strong> ${dateFin}</p>
    <p>Échelle : 1 = Pas du tout satisfait | 2 = Peu satisfait | 3 = Satisfait | 4 = Très satisfait</p>
    ${sections.map(sec => {
      const rows = sec.qs.map(q => {
        const sc = score(si, qGlobal++);
        return `<tr><td style="padding:6px;border:1px solid #ccc">${q}</td><td style="padding:6px;border:1px solid #ccc;text-align:center;font-weight:bold">${sc}</td></tr>`;
      }).join("");
      return `<h3 style="margin-top:12px">${sec.title}</h3>
        <table style="width:100%;border-collapse:collapse"><thead><tr style="background:#e8f0fe">
          <th style="padding:6px;border:1px solid #ccc;text-align:left">Critère</th><th style="padding:6px;border:1px solid #ccc;width:60px">Note</th>
        </tr></thead><tbody>${rows}</tbody></table>`;
    }).join("")}

    <h3 style="margin-top:16px">6. Satisfaction globale</h3>
    <p><strong>Satisfaction générale :</strong> ${score(si, 99)}/4</p>
    <p><strong>Recommanderiez-vous cette formation ?</strong> [X] Oui</p>
    <p><strong>Points forts :</strong> La qualité de l'encadrement et les mises en situation pratiques.</p>
    <p><strong>Axes d'amélioration :</strong> Davantage de temps en situation réelle d'entrepôt.</p>
    <p><strong>Après le Bac Pro Logistique :</strong> [X] Entrer dans la vie professionnelle</p>

    <p style="margin-top:20px"><strong>Signature de l'apprenant :</strong> ${stagName(s)}<br/>
    <strong>Date :</strong> ${dateFin}</p>
    ${stagSigImg(s)}
  `);
}

// ============================================
// BILAN DE FORMATION (BPL_09)
// ============================================
export function genBilanFormationBacPro(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  const dateDebut = stagDateDebut(s, f);
  const dateFin = stagDateFin(s, f);
  const formateur = stagFormateur(s);
  const good = ((si + 1) * 7) % 3 === 0;

  return wrap(`
    <h1 style="text-align:center;font-size:18px;margin:20px 0">BILAN DE FORMATION</h1>
    <h2 style="text-align:center">Baccalauréat Professionnel Logistique</h2>
    <p><strong>Stagiaire :</strong> ${stagName(s)}<br/>
    <strong>Session :</strong> du ${dateDebut} au ${dateFin}<br/>
    <strong>Période :</strong> du ${dateDebut} au ${dateFin}<br/>
    <strong>Centre de formation :</strong> ${ORG_NAME}</p>

    <h3>SYNTHÈSE GÉNÉRALE</h3>
    <p>Au cours de la formation, ${stagName(s)} a démontré ${good ? "un très bon niveau d'engagement et une progression constante" : "un niveau d'engagement satisfaisant avec une progression régulière"}.
    Son implication est jugée ${good ? "très bonne" : "satisfaisante"}, avec une assiduité ${good ? "exemplaire" : "régulière"}.</p>

    <h3>ÉVALUATION DES COMPÉTENCES</h3>
    <ul>
      <li>Réception et transfert des marchandises : ${good ? "Maîtrisé" : "Acquis"}</li>
      <li>Préparation et expédition des commandes : ${good ? "Maîtrisé" : "Acquis"}</li>
      <li>Organisation des flux logistiques : ${good ? "Acquis" : "En cours d'acquisition"}</li>
      <li>Gestion et suivi des stocks : ${good ? "Maîtrisé" : "Acquis"}</li>
      <li>Conduite en sécurité des chariots : ${good ? "Acquis" : "En cours d'acquisition"}</li>
      <li>Communication professionnelle : ${good ? "Acquis" : "Acquis"}</li>
    </ul>

    <h3>POINTS FORTS</h3>
    <p>${good ? "Rigueur dans l'application des procédures, bonne gestion du temps, autonomie croissante." : "Volonté d'apprentissage, respect des consignes, bon esprit d'équipe."}</p>

    <h3>AXES D'AMÉLIORATION</h3>
    <p>${good ? "Approfondir la maîtrise des outils numériques de gestion logistique." : "Renforcer l'organisation du poste de travail et l'utilisation des outils WMS."}</p>

    <h3>AVIS DU FORMATEUR</h3>
    <p>${good ? "Apprenant motivé et rigoureux, prêt pour l'insertion professionnelle." : "Apprenant en bonne progression, un accompagnement complémentaire est recommandé."}</p>

    <h3>PRÉCONISATIONS</h3>
    <p>${good ? "Poursuivre en BTS Logistique ou intégrer directement une plateforme logistique." : "Consolider les acquis par une période en entreprise prolongée."}</p>

    <p style="margin-top:30px"><strong>Fait à MALAKOFF, le ${dateFin}</strong></p>
    <p><strong>Nom du formateur :</strong> ${formateur}<br/>
    <strong>Fonction :</strong> Formateur référent logistique</p>
    <p>Signature :</p>${sigImg(f.formateurSignatureUrl)}
    <p style="margin-top:16px"><strong>Signature de l'organisme :</strong></p>
    ${orgSigBlock(o)}
  `);
}

// ============================================
// QCM GENERATORS (Eval 1, 2, 5, 8, 11, 12)
// ============================================
interface QCMQuestion {
  question: string;
  options: string[];
  answer: string;
}

function genQCMEval(title: string, questions: QCMQuestion[], s: StagiaireInfo, f: FormationInfo, si: number, o?: OrganismeInfo): string {
  const dateDebut = stagDateDebut(s, f);
  const dateFin = stagDateFin(s, f);
  const formateur = stagFormateur(s);
  const nbQ = questions.length;
  let totalScore = 0;

  const qHtml = questions.map((q, i) => {
    const sc = getScore(si, i, 1);
    totalScore += sc;
    const letters = ["A", "B", "C", "D"];
    const correctIdx = letters.indexOf(q.answer);
    const stagAnswer = sc === 1 ? q.answer : letters[((correctIdx + 1 + si) % (q.options.length - 1)) + (((correctIdx + 1 + si) % (q.options.length - 1)) >= correctIdx ? 1 : 0)];
    // Ensure wrong answer is never the correct one
    const safeAnswer = stagAnswer === q.answer ? letters[(correctIdx + 1) % q.options.length] : stagAnswer;
    return `<h3>Question ${i + 1}</h3>
      <p>${q.question}</p>
      ${q.options.map((o, oi) => `<p>${letters[oi]}. ${o}</p>`).join("")}
      <p><strong>Réponse du stagiaire :</strong> ${safeAnswer}</p>
      <p><strong>Bonne réponse :</strong> ${q.answer}</p>
      <p><strong>Note :</strong> <span style="background:#fff3cd;padding:2px 6px">${sc}</span> / 1</p>`;
  }).join("");

  const note20 = Math.round((totalScore / nbQ) * 20);

  return wrap(`
    <h1 style="text-align:center;font-size:18px;margin:20px 0">${title}</h1>
    <p><strong>Formation :</strong> Bac Pro logistique<br/>
    <strong>Nom et prénom :</strong> ${stagName(s)}<br/>
    <strong>Session :</strong> du ${dateDebut} au ${dateFin}<br/>
    <strong>Date :</strong> ${dateFin}<br/>
    <strong>Formateur(ce) :</strong> ${formateur}</p>
    ${qHtml}
    <h2 style="margin-top:20px">RÉSULTAT FINAL</h2>
    <p><strong>Formateur :</strong> ${formateur}</p>
    <p><strong>Score total :</strong> <span style="background:#fff3cd;padding:2px 6px">${totalScore}</span> / ${nbQ}</p>
    <p><strong>Note finale :</strong> <span style="background:#fff3cd;padding:2px 6px">${note20}</span> / 20</p>
    <h3>APPRÉCIATION DU FORMATEUR</h3>
    <p style="background:#fff3cd;padding:8px">${appreciation(note20)}</p>
    <table style="width:100%;margin-top:24px"><tr>
      <td style="width:50%;vertical-align:top">
        <p><strong>Signature du formateur :</strong></p>
        ${sigImg(f.formateurSignatureUrl)}
      </td>
      <td style="width:50%;vertical-align:top">
        <p><strong>Signature du stagiaire :</strong></p>
        ${stagSigImg(s)}
      </td>
    </tr></table>
    ${o ? `<p style="margin-top:12px"><strong>Cachet de l'organisme :</strong></p>${orgSigBlock(o)}` : ""}
  `);
}

// ============================================
// CAS PRATIQUE / EXERCICE / ÉTUDE DE CAS GENERATORS
// ============================================
interface OpenQuestion {
  question: string;
  points: number;
  correction: string;
}

function genOpenEval(title: string, context: string, questions: OpenQuestion[], s: StagiaireInfo, f: FormationInfo, si: number, totalPoints: number, o?: OrganismeInfo): string {
  const dateDebut = stagDateDebut(s, f);
  const dateFin = stagDateFin(s, f);
  const formateur = stagFormateur(s);
  let totalScore = 0;

  const qHtml = questions.map((q, i) => {
    const sc = getScore(si, i, q.points);
    totalScore += sc;
    const stagResponse = varyStagResponse(q.correction, si, i, sc, q.points);
    return `<h3>Question ${i + 1} (${q.points} points)</h3>
      <p>${q.question}</p>
      <p><strong>Réponse du stagiaire :</strong></p>
      <p style="border:1px solid #ccc;padding:8px;background:#fafafa">${stagResponse}</p>
      <p><strong>Correction :</strong></p>
      <p><strong>${q.correction}</strong></p>
      <p><strong>Note :</strong> <span style="background:#fff3cd;padding:2px 6px">${sc}</span> / ${q.points}</p>`;
  }).join("");

  const note20 = Math.round((totalScore / totalPoints) * 20);

  return wrap(`
    <h1 style="text-align:center;font-size:18px;margin:20px 0">${title}</h1>
    <p><strong>Formation :</strong> Bac Pro logistique<br/>
    <strong>Nom et prénom :</strong> ${stagName(s)}<br/>
    <strong>Session :</strong> du ${dateDebut} au ${dateFin}<br/>
    <strong>Date :</strong> ${dateFin}<br/>
    <strong>Formateur(ce) :</strong> ${formateur}</p>
    ${context ? `<h3>Situation professionnelle</h3>${context}` : ""}
    ${qHtml}
    <h2 style="margin-top:20px">RÉSULTAT FINAL</h2>
    <p><strong>Score total :</strong> <span style="background:#fff3cd;padding:2px 6px">${totalScore}</span> / ${totalPoints}</p>
    <p><strong>Note finale :</strong> <span style="background:#fff3cd;padding:2px 6px">${note20}</span> / 20</p>
    <h3>Appréciation du formateur</h3>
    <p style="background:#fff3cd;padding:8px">${appreciation(note20)}</p>
    <table style="width:100%;margin-top:24px"><tr>
      <td style="width:50%;vertical-align:top">
        <p><strong>Signature du formateur :</strong></p>
        ${sigImg(f.formateurSignatureUrl)}
      </td>
      <td style="width:50%;vertical-align:top">
        <p><strong>Signature du stagiaire :</strong></p>
        ${stagSigImg(s)}
      </td>
    </tr></table>
    ${o ? `<p style="margin-top:12px"><strong>Cachet de l'organisme :</strong></p>${orgSigBlock(o)}` : ""}
  `);
}

// ============================================
// EVAL 1 – QCM Introduction à la logistique
// ============================================
export function genEval01(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  return genQCMEval("QCM - Introduction à la logistique", [
    { question: "La logistique consiste principalement à :", options: ["Vendre des produits", "Gérer les flux de marchandises et d'informations", "Faire de la publicité", "Produire des biens"], answer: "B" },
    { question: "Quel est l'objectif principal de la logistique ?", options: ["Augmenter les stocks", "Réduire les coûts uniquement", "Livrer le bon produit au bon moment", "Supprimer les transports"], answer: "C" },
    { question: "Parmi ces éléments, lequel est un flux logistique ?", options: ["Flux physique", "Flux administratif uniquement", "Flux marketing", "Flux commercial"], answer: "A" },
    { question: "Quel acteur fait partie de la chaîne logistique ?", options: ["Le client", "Le comptable uniquement", "Le designer", "Le juriste"], answer: "A" },
    { question: "La logistique permet principalement de :", options: ["Décorer les produits", "Optimiser les opérations", "Faire de la publicité", "Créer des marques"], answer: "B" },
  ], s, f, si, o);
}

// EVAL 2 – QCM Réception des marchandises
export function genEval02(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  return genQCMEval("QCM - Réception des marchandises", [
    { question: "Quelle est la première étape lors de la réception d'une livraison ?", options: ["Ranger les produits", "Accueillir le transporteur", "Vendre les produits", "Jeter les colis"], answer: "B" },
    { question: "Quel document est utilisé pour vérifier une livraison ?", options: ["Bon de commande", "Bon de livraison", "Contrat de travail", "Facture d'électricité"], answer: "B" },
    { question: "Que doit-on vérifier lors du contrôle physique ?", options: ["Le prix du produit", "La quantité et l'état des marchandises", "Le nom du client", "La publicité"], answer: "B" },
    { question: "Que faut-il faire en cas de marchandise abîmée ?", options: ["Rien dire", "Refuser de travailler", "Faire des réserves sur le bon de livraison", "Vendre quand même"], answer: "C" },
    { question: "Pourquoi la traçabilité est-elle importante ?", options: ["Pour décorer les produits", "Pour suivre les marchandises", "Pour faire de la publicité", "Pour ralentir le travail"], answer: "B" },
  ], s, f, si, o);
}

// EVAL 3 – CAS PRATIQUE Réception
export function genEval03(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  return genOpenEval("CAS PRATIQUE - Réception des marchandises",
    `<p>Vous êtes agent logistique au sein de l'entreprise <strong>LOGISTOCK DISTRIBUTION</strong>, située à Gonesse (95).</p>
    <p>Le <strong>14/10/2025 à 08:42</strong>, vous réceptionnez une livraison du fournisseur <strong>TECHIMPORT EUROPE</strong>, transportée par <strong>TRANSFRET LOGISTICS</strong>.</p>
    <ul><li>48 cartons annoncés</li><li>Produits : cafetières et grille-pains</li><li>Bon de livraison : BL-45879-TE</li></ul>
    <p><strong>Anomalies constatées :</strong></p>
    <ul><li>3 cartons manquants</li><li>2 cartons endommagés</li><li>Erreur de référence sur 6 produits</li></ul>`,
    [
      { question: "Quelle est la première action à effectuer à l'arrivée du transporteur ?", points: 2, correction: "Accueillir le transporteur, vérifier son identité et le diriger vers le quai de déchargement approprié. Vérifier les documents de transport." },
      { question: "Quels documents devez-vous vérifier lors de la réception ?", points: 2, correction: "Le bon de livraison, le bon de commande, la lettre de voiture CMR et vérifier la correspondance entre ces documents." },
      { question: "Quelle procédure devez-vous appliquer face aux anomalies constatées ?", points: 3, correction: "Émettre des réserves précises sur le bon de livraison, photographier les dommages, informer le responsable, refuser les produits non conformes et saisir les anomalies dans le WMS." },
      { question: "Pourquoi la traçabilité est-elle essentielle dans cette situation ?", points: 3, correction: "La traçabilité permet de suivre les marchandises, d'identifier l'origine des anomalies, de faciliter les réclamations et d'assurer la qualité du service." },
    ], s, f, si, 10, o);
}

// EVAL 4 – CAS PRATIQUE Stockage
export function genEval04(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  return genOpenEval("CAS PRATIQUE - Stockage des marchandises",
    `<p>Vous travaillez en tant qu'agent logistique au sein de l'entreprise <strong>FRANCE LOGIWARE</strong>, une plateforme logistique située à <strong>Mitry-Mory (77)</strong>, spécialisée dans le stockage de produits alimentaires non périssables.</p>
    <p>Suite à une réception importante, vous devez organiser le stockage de <strong>120 palettes</strong>.</p>
    <p><strong>Difficultés :</strong></p>
    <ul><li>Zone principale quasi saturée</li><li>Palettes avec mélange de références</li><li>Produits à DLC proche (moins de 3 mois)</li></ul>`,
    [
      { question: "Quelle méthode de stockage devez-vous appliquer et pourquoi ?", points: 2, correction: "La méthode FIFO (First In, First Out) car les produits ont des DLC. Les plus anciens doivent sortir en premier pour éviter les pertes." },
      { question: "Comment organiser efficacement les palettes dans l'entrepôt ?", points: 2, correction: "Regrouper par famille de produits, placer les produits à DLC courte en zone accessible, utiliser le WMS pour affecter les emplacements." },
      { question: "Quelles actions mettre en place face aux problèmes rencontrés ?", points: 3, correction: "Trier les palettes mixtes, alerter sur la saturation, réorganiser les emplacements sous-utilisés, signaler les produits à DLC courte." },
      { question: "Quels sont les enjeux d'un bon stockage ?", points: 3, correction: "Optimiser l'espace, garantir la sécurité, faciliter la préparation de commandes, éviter les ruptures et les pertes." },
    ], s, f, si, 10, o);
}

// EVAL 5 – QCM Préparation de commandes
export function genEval05(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  return genQCMEval("QCM - Préparation de commandes", [
    { question: "Quel document permet de préparer une commande ?", options: ["Bon de livraison", "Bon de préparation", "Facture", "Bon de transport"], answer: "B" },
    { question: "Quel est l'objectif principal de la préparation de commandes ?", options: ["Stocker les produits", "Réduire les coûts", "Prélever les produits demandés par le client", "Transporter les marchandises"], answer: "C" },
    { question: "Qu'est-ce que le picking ?", options: ["Le stockage des produits", "Le prélèvement des produits", "Le transport des produits", "L'emballage"], answer: "B" },
    { question: "Pourquoi optimiser le parcours de préparation ?", options: ["Pour perdre du temps", "Pour réduire les déplacements", "Pour augmenter les erreurs", "Pour stocker plus"], answer: "B" },
    { question: "Que faut-il vérifier lors du prélèvement ?", options: ["Le prix", "La quantité et la référence", "Le transporteur", "Le client"], answer: "B" },
    { question: "Quel élément assure la stabilité d'une palette ?", options: ["Le poids uniquement", "L'emballage", "La palettisation correcte", "Le transport"], answer: "C" },
    { question: "Que faut-il faire en cas d'anomalie ?", options: ["Ignorer", "Continuer", "Signaler", "Jeter"], answer: "C" },
    { question: "Quel équipement est obligatoire pour la sécurité ?", options: ["Téléphone", "EPI (équipements de protection individuelle)", "Ordinateur", "Stylo"], answer: "B" },
    { question: "Que signifie étiqueter un colis ?", options: ["Le peser", "Ajouter une information d'identification", "Le stocker", "Le déplacer"], answer: "B" },
    { question: "Où transfère-t-on les commandes préparées ?", options: ["Zone de stockage", "Zone d'expédition", "Bureau", "Quai de réception"], answer: "B" },
  ], s, f, si, o);
}

// EVAL 6 – EXERCICE Préparation de commandes
export function genEval06(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  return genOpenEval("Exercice - Préparation de commandes", "",
    [
      { question: "Vous recevez un bon de préparation avec plusieurs articles. Quelle est la première action ?", points: 1, correction: "Lire attentivement le bon, vérifier les références et les quantités, puis organiser son parcours de prélèvement." },
      { question: "Un produit est manquant en rayon. Que faites-vous ?", points: 1, correction: "Signaler la rupture au responsable, noter l'anomalie, vérifier un emplacement alternatif dans le WMS." },
      { question: "Comment organisez-vous votre parcours de prélèvement ?", points: 1, correction: "Suivre un parcours optimisé (en U ou en S) pour minimiser les déplacements et gagner en efficacité." },
      { question: "Que vérifier avant de valider la commande ?", points: 1, correction: "Vérifier les quantités, les références, l'état des produits et la conformité avec le bon de préparation." },
      { question: "Quelle règle respecter pour préparer une palette ?", points: 1, correction: "Placer les produits lourds en bas, les légers en haut, filmer la palette et respecter la charge maximale." },
      { question: "Un colis est fragile. Que devez-vous faire ?", points: 1, correction: "Le manipuler avec précaution, le signaler avec une étiquette 'Fragile', le placer en haut de la palette." },
      { question: "Avant l'expédition, quelle étape est obligatoire ?", points: 1, correction: "Le contrôle final : vérifier la conformité de la commande, les documents d'expédition et l'étiquetage." },
      { question: "Quel élément est essentiel pour votre sécurité ?", points: 1, correction: "Le port des EPI : chaussures de sécurité, gilet haute visibilité, gants de manutention." },
      { question: "Où déposer une commande terminée ?", points: 1, correction: "En zone d'expédition, dans la zone correspondant au transporteur ou à la destination prévue." },
      { question: "Pourquoi respecter les procédures de préparation ?", points: 1, correction: "Pour garantir la qualité, éviter les erreurs, assurer la traçabilité et la satisfaction client." },
    ], s, f, si, 10, o);
}

// EVAL 7 – Étude de cas Expédition
export function genEval07(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  return genOpenEval("Étude de cas - Expédition",
    `<p>Vous travaillez dans une plateforme logistique spécialisée dans la distribution de matériel informatique. Vous êtes agent au service expédition.</p>
    <p><strong>Informations :</strong> Client : TECHNORD SARL | Commande : CMD2026-1548 | 18 colis, 2 palettes | Transporteur : TRANSLOG FRANCE | Heure : 15h30 | Destination : Lille</p>`,
    [
      { question: "Citez les contrôles à effectuer avant l'expédition.", points: 4, correction: "Vérifier la conformité de la commande, l'état des colis, l'étiquetage, les documents d'expédition, la destination et le transporteur." },
      { question: "Quels documents doivent accompagner la marchandise ?", points: 4, correction: "Le bon de livraison, la lettre de voiture CMR, le bordereau d'expédition et éventuellement la facture." },
      { question: "Indiquez les règles à respecter lors du chargement.", points: 4, correction: "Respecter le plan de chargement, fixer les palettes, vérifier le poids total, ne pas dépasser la charge utile, caler les marchandises." },
      { question: "Quelle procédure en cas de colis endommagé avant expédition ?", points: 4, correction: "Isoler le colis, prévenir le responsable, remplacer si possible, enregistrer l'incident et ne pas expédier en l'état." },
      { question: "Expliquez l'importance du suivi des expéditions.", points: 4, correction: "Le suivi permet de garantir la livraison, d'informer le client, de gérer les litiges et d'améliorer la qualité de service." },
    ], s, f, si, 20, o);
}

// EVAL 8 – QCM Organisation des flux
export function genEval08(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  return genQCMEval("QCM - Organisation des flux", [
    { question: "Le flux logistique correspond :", options: ["Au déplacement des marchandises", "À la gestion des employés", "Au déplacement des informations uniquement", "À la comptabilité"], answer: "A" },
    { question: "Quel est l'objectif principal de l'organisation des flux ?", options: ["Augmenter les déplacements inutiles", "Réduire les coûts et les délais", "Augmenter les stocks", "Supprimer les commandes"], answer: "B" },
    { question: "Le flux entrant correspond :", options: ["Aux expéditions", "Aux réceptions de marchandises", "Aux retours clients", "Aux inventaires"], answer: "B" },
    { question: "Le flux sortant correspond :", options: ["À la réception", "Au stockage", "À l'expédition des marchandises", "Au contrôle qualité"], answer: "C" },
    { question: "L'organisation des flux permet :", options: ["D'améliorer la circulation des marchandises", "De désorganiser l'entrepôt", "D'augmenter les erreurs", "De ralentir les préparations"], answer: "A" },
  ], s, f, si, o);
}

// EVAL 9 – CAS PRATIQUE Organisation des flux
export function genEval09(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  return genOpenEval("CAS PRATIQUE - Organisation des flux",
    `<p>Vous travaillez dans une plateforme logistique de distribution alimentaire.</p>
    <p><strong>Informations :</strong> 5 livraisons, 32 commandes, zone stockage à 85%, 2 quais réception, 2 quais expédition.</p>
    <p><strong>Contraintes :</strong> livraison en retard, commande urgente, risque de saturation, manque de personnel.</p>`,
    [
      { question: "Identifiez les problèmes liés à l'organisation des flux.", points: 4, correction: "Saturation de la zone réception, retard de livraison, commande urgente à traiter en priorité, manque de personnel en préparation." },
      { question: "Comment organiser les réceptions pour éviter la saturation ?", points: 4, correction: "Planifier les créneaux de réception, prioriser les livraisons, libérer la zone rapidement, utiliser une zone tampon." },
      { question: "Proposez des solutions pour améliorer la circulation interne.", points: 4, correction: "Définir des circuits de circulation, séparer les flux entrants et sortants, utiliser le cross-docking pour les urgences." },
      { question: "Comment gérer la commande urgente ?", points: 4, correction: "La traiter en priorité, dédier un préparateur, vérifier la disponibilité des produits et organiser l'expédition en express." },
      { question: "Proposez des actions pour assurer les expéditions dans les délais.", points: 4, correction: "Anticiper les préparations, prioriser les commandes par heure de départ, vérifier les documents et communiquer avec les transporteurs." },
    ], s, f, si, 20, o);
}

// EVAL 10 – EXERCICE Gestion des stocks
export function genEval10(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  return genOpenEval("Exercice - Gestion des stocks",
    `<p>Vous travaillez dans un entrepôt de produits électroménagers.</p>
    <p><strong>Produit :</strong> Grille-pain GT548 | Stock initial : 120 unités</p>
    <p><strong>Mouvements :</strong> +50 (entrée), -30 (sortie), -20 (sortie), +40 (entrée)</p>`,
    [
      { question: "Calculez le stock final après les mouvements.", points: 4, correction: "Stock final = 120 + 50 - 30 - 20 + 40 = 160 unités." },
      { question: "Indiquez les types de mouvements présents.", points: 4, correction: "Entrées de stock (réceptions fournisseur) et sorties de stock (expéditions commandes client)." },
      { question: "Expliquez ce qu'est une rupture de stock.", points: 4, correction: "C'est l'absence totale d'un produit en stock, empêchant de satisfaire les commandes clients." },
      { question: "Pourquoi définir un stock minimum ?", points: 4, correction: "Pour éviter les ruptures, garantir la continuité du service, anticiper les délais de réapprovisionnement." },
      { question: "Expliquez l'utilité de l'inventaire.", points: 4, correction: "L'inventaire permet de vérifier la cohérence entre le stock physique et le stock informatique, de détecter les écarts et d'ajuster les données." },
    ], s, f, si, 20, o);
}

// EVAL 11 – QCM Gestion des stocks
export function genEval11(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  return genQCMEval("QCM - Gestion des stocks", [
    { question: "Le stock correspond :", options: ["Aux marchandises vendues", "Aux marchandises stockées dans l'entreprise", "Aux commandes clients", "Aux documents de transport"], answer: "B" },
    { question: "Une entrée de stock correspond :", options: ["À une expédition", "À une réception de marchandises", "À une casse produit", "À un inventaire"], answer: "B" },
    { question: "Une sortie de stock correspond :", options: ["À une réception fournisseur", "À une entrée en stock", "À une expédition ou consommation", "À un inventaire"], answer: "C" },
    { question: "L'inventaire permet :", options: ["De supprimer les stocks", "De vérifier le stock réel", "D'augmenter les commandes", "De transporter les marchandises"], answer: "B" },
    { question: "La rupture de stock signifie :", options: ["Trop de stock", "Pas assez de commandes", "Absence de produit en stock", "Inventaire terminé"], answer: "C" },
  ], s, f, si, o);
}

// EVAL 12 – QCM Sécurité Conduite d'engins
export function genEval12(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  return genQCMEval("QCM sécurité - Conduite d'engins", [
    { question: "Avant d'utiliser un engin de manutention, vous devez :", options: ["Monter directement", "Vérifier l'état de l'engin", "Aller plus vite", "Charger immédiatement"], answer: "B" },
    { question: "Le port des EPI est :", options: ["Facultatif", "Obligatoire", "Inutile", "Interdit"], answer: "B" },
    { question: "En cas de charge instable, vous devez :", options: ["Continuer à rouler", "Accélérer", "Stabiliser la charge", "Ignorer le problème"], answer: "C" },
    { question: "La circulation dans un entrepôt doit :", options: ["Être libre sans règles", "Respecter un plan de circulation", "Être rapide uniquement", "Être désorganisée"], answer: "B" },
    { question: "En cas d'accident, vous devez :", options: ["Partir", "Ne rien dire", "Prévenir immédiatement", "Continuer à travailler"], answer: "C" },
  ], s, f, si, o);
}

// EVAL 13 – Mise en situation Communication
export function genEval13(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  return genOpenEval("Mise en situation - Communication professionnelle",
    `<p>Vous travaillez dans une plateforme logistique. Une livraison prévue à 10h00 n'est toujours pas arrivée à 11h30.</p>
    <p>Le responsable vous demande de : contacter le transporteur, informer le service préparation, envoyer un e-mail au client, enregistrer l'information dans le logiciel.</p>`,
    [
      { question: "Quel outil utilisez-vous pour contacter le transporteur et pourquoi ?", points: 4, correction: "Le téléphone, car c'est le moyen le plus rapide pour obtenir une réponse immédiate sur le retard et l'heure estimée d'arrivée." },
      { question: "Comment informez-vous le service préparation du retard ?", points: 4, correction: "Par talkie-walkie ou en se déplaçant directement, pour informer en temps réel et permettre de réorganiser les priorités de préparation." },
      { question: "Rédigez le message au client pour l'informer du retard.", points: 4, correction: "Objet : Retard de livraison - Commande [réf]. Bonjour, nous vous informons d'un retard de livraison. Nous mettons tout en œuvre pour résoudre la situation et vous tiendrons informé. Cordialement." },
      { question: "Pourquoi enregistrer l'information dans le logiciel ?", points: 4, correction: "Pour assurer la traçabilité, permettre le suivi de l'incident, faciliter l'analyse des causes et prévenir les récurrences." },
      { question: "Citez des règles de communication en entreprise.", points: 4, correction: "Être clair et concis, utiliser un langage professionnel, respecter la hiérarchie, confirmer les informations par écrit, écouter activement." },
    ], s, f, si, 20, o);
}

// EVAL 14 – Révisions globales / Examen blanc
export function genEval14(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  return genOpenEval("REVISIONS GLOBALES - Examen blanc",
    `<p>Vous travaillez dans une plateforme logistique qui gère la réception, le stockage, la préparation de commandes et l'expédition. Vous devez répondre à des questions couvrant l'ensemble des activités logistiques.</p>`,
    [
      { question: "Partie 1 – Réception : Indiquez les contrôles à effectuer lors de la réception.", points: 4, correction: "Accueil du transporteur, contrôle quantitatif et qualitatif, vérification des documents, émission de réserves si nécessaire, saisie dans le WMS." },
      { question: "Partie 2 – Gestion des stocks : Expliquez l'utilité de l'inventaire.", points: 4, correction: "Vérifier la concordance entre stock physique et informatique, détecter les écarts, les pertes et les vols, ajuster les données." },
      { question: "Partie 3 – Préparation : Indiquez les étapes de la préparation de commandes.", points: 4, correction: "Réception du bon de préparation, organisation du parcours, prélèvement, contrôle, conditionnement, étiquetage, mise en zone d'expédition." },
      { question: "Partie 4 – Expédition : Documents nécessaires pour l'expédition.", points: 4, correction: "Bon de livraison, lettre de voiture CMR, bordereau d'expédition, facture, documents douaniers si export." },
      { question: "Partie 5 – Organisation des flux : Objectif de l'organisation des flux.", points: 4, correction: "Optimiser la circulation des marchandises et des informations, réduire les délais et les coûts, améliorer la productivité." },
      { question: "Partie 6 – Sécurité : Règles de sécurité pour la conduite d'engins.", points: 4, correction: "Vérification quotidienne de l'engin, port des EPI, respect du plan de circulation, charge maximale, klaxonner aux intersections." },
      { question: "Partie 7 – Communication : Importance de la communication professionnelle.", points: 4, correction: "Assurer la coordination des équipes, éviter les erreurs, transmettre les informations importantes, faciliter la résolution des problèmes." },
    ], s, f, si, 28, o);
}

// EVAL 15 – Examen blanc final
export function genEval15(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number): string {
  const s = stagiaires[si] || stagiaires[0];
  return genOpenEval("EXAMEN BLANC FINAL - Préparation certification",
    `<p>Évaluation complète portant sur les activités logistiques principales en préparation à la certification.</p>`,
    [
      { question: "Partie 1 – Réception : Indiquez les étapes de la réception.", points: 4, correction: "Accueil transporteur, déchargement, contrôle quantitatif/qualitatif, rapprochement documents, émission réserves, saisie WMS, mise en stock." },
      { question: "Partie 2 – Stockage : Règles de stockage dans un entrepôt.", points: 4, correction: "Respecter le plan d'adressage, les méthodes FIFO/LIFO, la compatibilité des produits, la charge maximale des rayonnages, les consignes de sécurité." },
      { question: "Partie 3 – Gestion stocks : Différence stock réel et informatique.", points: 4, correction: "Le stock réel est le stock physiquement présent. Le stock informatique est celui enregistré dans le WMS. Les écarts proviennent de casses, vols, erreurs de saisie." },
      { question: "Partie 4 – Préparation : Étapes de la préparation de commandes.", points: 4, correction: "Réception bon de préparation, planification du parcours, picking, contrôle, conditionnement, étiquetage, transfert en zone expédition." },
      { question: "Partie 5 – Expédition : Contrôles avant l'expédition.", points: 4, correction: "Vérifier la conformité commande/colis, l'état des emballages, l'étiquetage, les documents, l'identité du transporteur, le véhicule." },
      { question: "Partie 6 – Organisation des flux : Objectif des flux logistiques.", points: 4, correction: "Assurer la fluidité de la chaîne logistique, de la réception à l'expédition, en minimisant les temps d'attente et les manipulations." },
      { question: "Partie 7 – Sécurité : Règles lors de la conduite d'engins.", points: 4, correction: "Contrôle préalable, port EPI, respect vitesse et plan de circulation, stabilité de la charge, signalisation, formation obligatoire (CACES)." },
      { question: "Partie 8 – Communication : Importance de la communication.", points: 4, correction: "Coordonner les équipes, transmettre les consignes, signaler les anomalies, informer les clients et les partenaires, assurer la traçabilité." },
    ], s, f, si, 32, o);
}
