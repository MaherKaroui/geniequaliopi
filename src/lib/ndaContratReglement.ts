/**
 * Génération automatique du Contrat de Formation Professionnelle
 * (Articles L.6353-3 et s. du Code du travail) et du Règlement Intérieur
 * (Articles L.6352-3 et R.6352-1 à R.6352-15 du Code du travail).
 *
 * Les valeurs sont remplies à partir des données déjà saisies dans la
 * section "Demande NDA" (organisme, formation, stagiaires). Aucun champ
 * supplémentaire n'est requis : tout est calculé/déduit automatiquement.
 * Les champs vides apparaissent en pointillés "..........".
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { subtractBusinessDays, getDocStyle, baseStyle, orgHeader } from "@/lib/docBuilder";


const DOTS = "..........";

/** Date longue FR : "4 novembre 2025" */
function fmtDateLong(iso?: string): string {
  if (!iso) return DOTS;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

/** Extrait le nombre d'heures depuis "21 heures" / "21h" / "21" */
function parseHeures(duree?: string): string {
  if (!duree) return DOTS;
  const m = String(duree).match(/(\d+[.,]?\d*)/);
  return m ? m[1].replace(",", ".") : duree;
}

/** Extrait un nombre depuis "1 500 €" / "1500.00" */
function parseMontant(tarif?: string): number | null {
  if (!tarif) return null;
  const cleaned = String(tarif).replace(/[^\d.,]/g, "").replace(",", ".");
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}

function escapeHtml(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function v(value: string | undefined | null): string {
  const s = (value ?? "").trim();
  return s ? escapeHtml(s) : DOTS;
}

function adresseComplete(adresse?: string, cp?: string, ville?: string): string {
  const parts = [adresse, [cp, ville].filter(Boolean).join(" ")].filter(p => p && p.trim());
  const out = parts.join(", ").trim();
  return out || DOTS;
}

/** Style commun à TOUS les documents NDA — applique la personnalisation choisie sur la plateforme. */
export function buildCSS(): string {
  const s = getDocStyle();
  const primary = s.primaryColor || "#1e3a7b";
  const secondary = s.secondaryColor || "#2d8659";
  const bodyFont = s.fontFamily || "Calibri, Arial, sans-serif";
  const headingFont = s.headingFont || bodyFont;
  const fsBody = (s.fontSize || 11);
  // Construit une teinte claire de la couleur primaire pour les lignes alternées
  const lightPrimary = hexToRgba(primary, 0.08);
  return `
<style>
  @page { size: A4; margin: 18mm 17mm 18mm 17mm; }
  html, body { margin: 0; padding: 0; }
  body { font-family: ${bodyFont}; font-size: ${fsBody}pt; color: #111; line-height: 1.4; background: #fff; }
  .doc { width: min(100%, 1120px); margin: 0 auto; padding: 40px 110px; box-sizing: border-box; }
  @media screen and (max-width: 768px) { .doc { width: 100%; padding: 24px 22px; } }
  @media print { .doc { width: 100%; max-width: none; padding: 0; } }
  h1 { font-family: ${headingFont}; font-size: ${fsBody + 4}pt; text-align: center; text-transform: uppercase; margin: 14px 0 6px 0; font-weight: 700; color: ${primary}; letter-spacing: 0.5px; border-bottom: 2px solid ${primary}; padding-bottom: 8px; }
  h2 { font-family: ${headingFont}; font-size: ${fsBody}pt; text-align: center; font-weight: 400; font-style: italic; margin: 0 0 18px 0; color: ${secondary}; }
  h3 { font-family: ${headingFont}; font-size: ${fsBody}pt; margin: 16px 0 6px 0; color: ${primary}; font-weight: 700; }
  p { margin: 7px 0; text-align: justify; }
  ul { margin: 5px 0 9px 28px; padding: 0; }
  li { margin: 4px 0; padding-left: 2px; }
  strong { color: #111; }
  .meta { text-align: center; font-size: ${fsBody}pt; color: ${secondary}; margin-bottom: 18px; font-style: italic; }
  table { border-collapse: collapse; width: 100%; max-width: 100%; margin: 10px 0; font-size: ${fsBody - 0.5}pt; table-layout: fixed; word-wrap: break-word; }
  .pdf-root > table.nda-text-table { width: calc(100% - 220px); max-width: calc(100% - 220px); margin-left: 110px; margin-right: 110px; }
  @media screen and (max-width: 768px) { .pdf-root > table.nda-text-table { width: calc(100% - 44px); max-width: calc(100% - 44px); margin-left: 22px; margin-right: 22px; } }
  th, td { border: 1px solid ${primary}; padding: 7px 9px; vertical-align: top; text-align: left; word-wrap: break-word; overflow-wrap: break-word; }
  th { background: ${primary}; color: #fff; font-weight: 700; font-family: ${headingFont}; }
  tr:nth-child(even) td { background: ${lightPrimary}; }
  tr:nth-child(odd) td { background: #fff; }
  .signatures { margin-top: 34px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
  .signatures .box { font-size: ${fsBody}pt; min-height: 145px; padding: 12px; border-top: 2px solid ${primary}; }
  .signatures .box .title { font-family: ${headingFont}; font-weight: 700; margin-bottom: 8px; color: ${primary}; text-transform: uppercase; font-size: ${fsBody - 0.5}pt; letter-spacing: 0.5px; }
  .signatures .box .mention { font-style: italic; color: #555; font-size: ${fsBody - 1}pt; margin-top: 8px; }
  .signatures .box .sig-img { display: block; max-height: 95px; max-width: 220px; margin: 10px 0 4px 0; }
  .header { text-align: center; margin-bottom: 22px; padding-bottom: 14px; border-bottom: 2px solid ${primary}; }
  .header img { max-height: 80px; max-width: 200px; object-fit: contain; margin-bottom: 8px; }
  .header .org-name { font-family: ${headingFont}; font-size: ${fsBody + 6}pt; font-weight: 700; color: ${primary}; text-transform: uppercase; letter-spacing: 1px; }
  .header .subtitle { font-size: ${fsBody - 1.5}pt; color: #555; margin-top: 4px; }
  .footer { margin-top: 26px; padding-top: 8px; border-top: 2px solid ${primary}; font-size: ${fsBody - 2}pt; color: #333; text-align: center; line-height: 1.5; }
  .footer strong { display: block; font-family: ${headingFont}; font-size: ${fsBody - 1}pt; color: ${primary}; margin-bottom: 2px; }
  .footer p { margin: 0 0 3px; text-align: center; }
  .page-break { page-break-before: always; }
</style>
`;
}


/** Convertit #RRGGBB en rgba(r,g,b,a) */
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
  const r = parseInt(full.slice(0, 2), 16) || 0;
  const g = parseInt(full.slice(2, 4), 16) || 0;
  const b = parseInt(full.slice(4, 6), 16) || 0;
  return `rgba(${r},${g},${b},${alpha})`;
}

/** @deprecated — utilise buildCSS() pour profiter du thème en cours */
export const CSS = "";


/** En-tête identique aux documents Qualiopi AF / CFA (logo + identité organisme). */
export function headerHtml(o: OrganismeInfo, subtitle?: string): string {
  const logo = (o as any).logoUrl
    ? `<div><img src="${(o as any).logoUrl}" alt="Logo ${escapeHtml(o.nom || "")}" /></div>`
    : "";
  const ndaLine = o.nda
    ? `Organisme de formation – NDA : ${escapeHtml(o.nda)}${o.siret ? ` – SIRET : ${escapeHtml(o.siret)}` : ""}`
    : (o.siret ? `Organisme de formation – SIRET : ${escapeHtml(o.siret)}` : "Organisme de formation");
  return `<div class="header">
    ${logo}
    <div class="org-name">${escapeHtml(o.nom || "")}</div>
    <div class="subtitle">${ndaLine}</div>
    ${subtitle ? `<div class="subtitle" style="font-weight:600;">${escapeHtml(subtitle)}</div>` : ""}
  </div>`;
}

export function footerHtml(o: OrganismeInfo): string {
  const version = (o as any).version || "1";
  const dateMaj = (o as any).dateMaj
    ? new Date((o as any).dateMaj).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const adresse = adresseComplete(o.adresse, o.codePostal, o.ville);
  return `<div class="footer">
    <strong>${escapeHtml(o.nom || "")}</strong>
    ${adresse !== DOTS ? `<p>Adresse : ${escapeHtml(adresse)}</p>` : ""}
    ${o.siret ? `<p>Siret : ${escapeHtml(o.siret)}</p>` : ""}
    ${o.nda ? `<p>Nda : ${escapeHtml(o.nda)} — cet enregistrement ne vaut pas agrément de l'État</p>` : ""}
    <p>V${escapeHtml(String(version))} ${dateMaj}</p>
  </div>`;
}

export { escapeHtml, v, fmtDateLong, adresseComplete, parseHeures, parseMontant, DOTS };


/* =========================================================================
 * DOCUMENT 1 : CONTRAT DE FORMATION PROFESSIONNELLE
 * ========================================================================= */
export function genContratNDA(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[]
): string {
  // Date de signature = date de début de formation − 14 jours ouvrés
  // (le calcul exclut weekends + jours fériés français).
  const refStart = f.dateDebut || "";
  const signatureIso = refStart ? subtractBusinessDays(refStart, 14) : new Date().toISOString().slice(0, 10);
  const dateSignature = fmtDateLong(signatureIso);
  const lieuSignature = v(o.ville);


  // Génère un contrat par stagiaire (séparés par saut de page).
  const list: StagiaireInfo[] = (stagiaires && stagiaires.length > 0) ? stagiaires : [{
    civilite: "", nom: "", prenom: "", email: "", telephone: "",
    entreprise: "", poste: "", dateNaissance: "",
    adresse: "", codePostal: "", commune: "",
  }];


  const prixNum = parseMontant(f.tarif);
  const prixHT = prixNum !== null ? prixNum.toFixed(2).replace(".", ",") : DOTS;
  const premierVersement = prixNum !== null ? (prixNum * 0.3).toFixed(2).replace(".", ",") : DOTS;
  const dureeH = parseHeures(f.duree);
  const delaiRetractation = "10"; // 10 jours par défaut (particulier financeur)
  const sanction = "une attestation de fin de formation";
  const categorie = "formation";
  const modalitesPaiement = "Par virement bancaire à réception de facture";
  const echeancier = `Le solde, soit ${prixNum !== null ? (prixNum * 0.7).toFixed(2).replace(".", ",") + " €" : DOTS}, sera réglé en mensualités égales étalées sur la durée de la formation.`;
  const conditionsCessation = "En cas de cessation anticipée de la formation par l'organisme pour un autre motif que la force majeure dûment reconnue, le présent contrat est résilié de plein droit. Seules les prestations effectivement dispensées sont dues au prorata temporis de leur valeur prévue au présent contrat. Si le stagiaire est empêché de suivre la formation par suite de force majeure dûment reconnue, le contrat de formation professionnelle est résilié. Dans ce cas, seules les prestations effectivement dispensées sont dues au prorata temporis de leur valeur prévue au présent contrat.";
  const tribunal = v(o.ville);

  const adresseOrg = adresseComplete(o.adresse, o.codePostal, o.ville);

  const blocks = list.map((s, idx) => {
    const nomStagiaire = `${s.prenom || ""} ${s.nom || ""}`.trim();
    const adresseStagiaire = adresseComplete(s.adresse, s.codePostal, s.commune);
    const pageBreak = idx > 0 ? `<div class="page-break"></div>` : "";

    // Date individuelle si renseignée, sinon date globale (toujours -14 jours ouvrés)
    const indivStart = s.dateDebutFormation || f.dateDebut || "";
    const indivSignIso = indivStart ? subtractBusinessDays(indivStart, 14) : signatureIso;
    const dateSignIndiv = fmtDateLong(indivSignIso);

    // Signature stagiaire (image uploadée ou tracée)
    const sigStagiaire = s.signatureUrl
      ? `<img src="${s.signatureUrl}" class="sig-img" alt="Signature stagiaire" />`
      : "";
    // Tampon organisme uniquement (pas de signature)
    const tamponOrg = o.tamponUrl
      ? `<img src="${o.tamponUrl}" class="sig-img" alt="Tampon organisme" />`
      : "";

    return `${pageBreak}
${headerHtml(o)}
<h1>Contrat de formation professionnelle</h1>
<h2>(Articles L.6353-3 et suivants du Code du travail)</h2>
<div class="meta">Fait à ${lieuSignature}, le ${dateSignIndiv}</div>

<p><strong>Entre les soussignés :</strong></p>
<p>1) <strong>${v(o.nom)}</strong>, dont le siège est situé ${adresseOrg}, représenté par <strong>${v(o.dirigeant)}</strong>, ci-après désigné « l'organisme de formation ».</p>
<p>2) <strong>${nomStagiaire || DOTS}</strong>, demeurant ${adresseStagiaire}, ci-après désigné « le stagiaire ».</p>
<p>Il est conclu le présent contrat de formation professionnelle en application des articles L.6353-3 à L.6353-7 du Code du travail.</p>

<h3>Article 1 — Objet</h3>
<p>En exécution du présent contrat, l'organisme de formation s'engage à organiser l'action de formation intitulée <strong>« ${v(f.intitule)} »</strong>.</p>

<h3>Article 2 — Nature et caractéristiques de l'action de formation</h3>
<ul>
  <li>L'action de formation entre dans la catégorie des actions de <strong>${categorie}</strong> prévues par l'article L.6313-1 du Code du travail.</li>
  <li>Elle a pour objectif : ${v(f.objectifs)}.</li>
  <li>À l'issue de la formation, ${sanction} sera délivré(e) au stagiaire.</li>
  <li>Sa durée est fixée à <strong>${dureeH} heures</strong>.</li>
  <li>L'effectif prévu est de <strong>${list.length}</strong> personne(s).</li>
  <li>Le programme détaillé de l'action de formation figure en annexe du présent contrat.</li>
</ul>

<h3>Article 3 — Niveau de connaissances préalables nécessaire</h3>
<p>${v(f.prerequis)}</p>

<h3>Article 4 — Organisation de l'action de formation</h3>
<ul>
  <li>L'action de formation aura lieu du <strong>${fmtDateLong(s.dateDebutFormation || f.dateDebut)}</strong> au <strong>${fmtDateLong(s.dateFinFormation || f.dateFin)}</strong>, à <strong>${v(f.lieu)}</strong>.</li>
  <li>Elle est organisée pour un effectif de ${list.length} personne(s).</li>
  <li>Formateur(s) : ${v(f.formateur)}.</li>
  <li>Moyens pédagogiques et techniques, modalités de contrôle des connaissances : ${v(f.moyensPedagogiques)}.</li>
</ul>

<h3>Article 5 — Nature de la sanction</h3>
<p>La formation donne lieu à la délivrance d'${sanction} précisant les objectifs, la nature, la durée de l'action et les résultats de l'évaluation des acquis.</p>

<h3>Article 6 — Délai de rétractation</h3>
<p>À compter de la date de signature du présent contrat, le stagiaire dispose d'un délai de <strong>${delaiRetractation} jours</strong> pour se rétracter. Il en informe l'organisme de formation par lettre recommandée avec accusé de réception. Dans ce cas, aucune somme ne peut être exigée du stagiaire.</p>

<h3>Article 7 — Modalités de paiement</h3>
<p>Le prix de la formation est fixé à <strong>${prixHT} € HT</strong>.</p>
<p>Modalités de règlement : ${modalitesPaiement}.</p>
<p>Après un délai de rétractation mentionné à l'article 6 du présent contrat, le stagiaire effectue un premier versement d'un montant de <strong>${premierVersement} €</strong> (ce versement ne pouvant être supérieur à 30 % du prix de la formation).</p>
<p>Le paiement du solde est échelonné selon l'échéancier suivant : ${echeancier}</p>

<h3>Article 8 — Conditions financières en cas de cessation anticipée ou d'abandon</h3>
<p>${conditionsCessation}</p>

<h3>Article 9 — Cas de différend</h3>
<p>Si une contestation ou un différend ne peuvent être réglés à l'amiable, le tribunal de <strong>${tribunal}</strong> sera seul compétent pour se prononcer.</p>

<p style="margin-top:18px;">Fait en double exemplaire, à <strong>${lieuSignature}</strong>, le <strong>${dateSignIndiv}</strong>.</p>

<div class="signatures">
  <div class="box">
    <div class="title">Pour le stagiaire</div>
    ${nomStagiaire || DOTS}
    ${sigStagiaire}
    <div class="mention">(signature précédée de la mention « Lu et approuvé »)</div>
  </div>
  <div class="box">
    <div class="title">Pour l'organisme de formation</div>
    ${v(o.dirigeant)}<br><em>${v(o.nom)}</em>
    ${tamponOrg}
  </div>
</div>

${footerHtml(o)}`;
  }).join("\n");

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">${buildCSS()}</head><body><div class="doc">${blocks}</div></body></html>`;
}


/* =========================================================================
 * DOCUMENT 2 : RÈGLEMENT INTÉRIEUR
 * ========================================================================= */
export function genReglementNDA(o: OrganismeInfo, f?: FormationInfo, s?: StagiaireInfo[]): string {
  // Date d'établissement = date de début de formation − 14 jours ouvrés
  // (exclut weekends + jours fériés). À défaut, date du jour.
  const refStart = f?.dateDebut || "";
  const dateIso = refStart ? subtractBusinessDays(refStart, 14) : new Date().toISOString().slice(0, 10);
  const dateStr = fmtDateLong(dateIso);
  const ville = v(o.ville);

  const firstStag = s && s[0];
  const nomStagiaire = firstStag ? `${firstStag.prenom || ""} ${firstStag.nom || ""}`.trim() : "";
  const sigStagiaire = firstStag?.signatureUrl
    ? `<img src="${firstStag.signatureUrl}" class="sig-img" alt="Signature stagiaire" />` : "";
  // Tampon organisme uniquement (pas de signature)
  const tamponOrg = o.tamponUrl
    ? `<img src="${o.tamponUrl}" class="sig-img" alt="Tampon organisme" />` : "";

  const body = `
${headerHtml(o)}
<h1>Règlement intérieur</h1>
<h2>${escapeHtml(o.nom || "")}</h2>
<div class="meta">Établi à ${ville}, le ${dateStr}</div>

<h3>Article 1</h3>
<p>Le présent règlement est établi conformément aux dispositions des articles L.6352-3 et R.6352-1 à R.6352-15 du Code du travail. Il s'applique à tous les stagiaires, et ce pour la durée de la formation suivie.</p>

<h3>Article 2 — Discipline</h3>
<p>Il est formellement interdit aux stagiaires :</p>
<ul>
  <li>d'introduire des boissons alcoolisées dans les locaux de l'organisme ;</li>
  <li>de se présenter aux formations en état d'ébriété ;</li>
  <li>d'emporter, de copier ou de modifier les supports de formation ;</li>
  <li>de modifier les réglages des ordinateurs mis à disposition ;</li>
  <li>de manger dans les salles de cours ;</li>
  <li>d'utiliser leur téléphone portable durant les sessions de formation ;</li>
  <li>d'une manière générale, d'avoir un comportement contraire aux bonnes mœurs et au respect dû aux personnes et aux biens.</li>
</ul>

<h3>Article 3 — Sanctions</h3>
<p>Tout agissement considéré comme fautif par la direction de l'organisme de formation pourra, en fonction de sa nature et de sa gravité, faire l'objet de l'une ou l'autre des sanctions ci-après par ordre croissant d'importance :</p>
<ul>
  <li>avertissement écrit par le Directeur de l'organisme de formation ;</li>
  <li>blâme ;</li>
  <li>exclusion définitive de la formation.</li>
</ul>

<h3>Article 4 — Entretien préalable à une sanction et procédure</h3>
<p>Aucune sanction ne peut être infligée au stagiaire sans que celui-ci ne soit informé dans le même temps et par écrit des griefs retenus contre lui.</p>
<p>Lorsque l'organisme de formation envisage de prendre une sanction qui a une incidence, immédiate ou non, sur la présence du stagiaire dans une formation, il est procédé ainsi qu'il suit : l'organisme convoque le stagiaire par lettre recommandée avec accusé de réception ou remise contre décharge en lui indiquant l'objet de la convocation, la date, l'heure et le lieu de l'entretien, sauf si la sanction envisagée n'a pas d'incidence sur la présence du stagiaire à la formation.</p>
<p>Au cours de l'entretien, le stagiaire peut se faire assister par une personne de son choix, stagiaire ou salarié de l'organisme de formation. Le motif de la sanction envisagée lui est indiqué et ses explications sont recueillies.</p>
<p>Lorsqu'une mesure conservatoire d'exclusion temporaire à effet immédiat est considérée comme indispensable par l'organisme de formation, aucune sanction définitive relative à l'agissement fautif à l'origine de cette exclusion ne peut être prise sans que la procédure ci-dessus n'ait été respectée.</p>
<p>La sanction ne peut intervenir moins d'un jour franc ni plus de 15 jours après l'entretien. Elle fait l'objet d'une notification écrite et motivée au stagiaire sous forme d'une lettre recommandée ou remise contre décharge. L'organisme de formation informe concomitamment l'employeur, et éventuellement l'organisme financeur, de la sanction prise.</p>

<h3>Article 5 — Représentation des stagiaires</h3>
<p>Lorsqu'un stage a une durée supérieure à 500 heures, il est procédé à l'élection d'un délégué titulaire et d'un délégué suppléant en scrutin uninominal à deux tours. Tous les stagiaires sont électeurs et éligibles. Le scrutin a lieu pendant les heures de formation, au plus tôt 20 heures et au plus tard 40 heures après le début du stage.</p>
<p>En cas d'impossibilité de désigner les représentants des stagiaires, l'organisme de formation dresse un procès-verbal de carence qu'il transmet au préfet de région territorialement compétent. Les délégués sont élus pour la durée de la formation. Ils font toute suggestion pour améliorer le déroulement des stages et les conditions de vie des stagiaires dans l'organisme de formation. Ils présentent toutes les réclamations individuelles ou collectives relatives à ces matières, aux conditions d'hygiène et de sécurité et à l'application du règlement intérieur.</p>

<h3>Article 6 — Hygiène et sécurité</h3>
<p>La prévention des risques d'accidents et de maladies est impérative et exige de chacun le respect total de toutes les prescriptions applicables en matière d'hygiène et de sécurité. À cet effet, les consignes générales et particulières d'hygiène et de sécurité en vigueur dans l'organisme, lorsqu'elles existent, doivent être strictement respectées sous peine de sanctions disciplinaires. Lorsque la formation a lieu sur le site d'une entreprise ou d'un établissement, les consignes générales et particulières d'hygiène et de sécurité applicables sont celles de l'entreprise ou de l'établissement d'accueil.</p>

<h3>Article 7</h3>
<p>Un exemplaire du présent règlement est tenu à la disposition de chaque stagiaire (avant toute inscription définitive) ou lui est remis dans le cadre d'un contrat de formation professionnelle.</p>

<p style="margin-top:18px;">Fait à <strong>${ville}</strong>, le <strong>${dateStr}</strong>.</p>

<div class="signatures">
  <div class="box">
    <div class="title">Pour l'organisme de formation</div>
    ${v(o.dirigeant)}<br><em>${v(o.nom)}</em>
    ${tamponOrg}
  </div>
  <div class="box">
    <div class="title">Le stagiaire</div>
    ${nomStagiaire || DOTS}
    ${sigStagiaire}
    <div class="mention">(signature précédée de la mention « Lu et approuvé »)</div>
  </div>
</div>

${footerHtml(o)}`;

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">${buildCSS()}</head><body><div class="doc">${body}</div></body></html>`;
}

