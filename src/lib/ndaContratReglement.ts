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

/** Style commun aux deux documents (sobre, A4, police lisible) */
const CSS = `
<style>
  @page { size: A4; margin: 18mm 18mm 22mm 18mm; }
  body { font-family: 'Times New Roman', Georgia, serif; font-size: 11.5pt; color: #111; line-height: 1.55; }
  h1 { font-size: 16pt; text-align: center; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0; }
  h2 { font-size: 11pt; text-align: center; font-weight: normal; font-style: italic; margin: 0 0 18px 0; color: #444; }
  h3 { font-size: 12pt; margin: 14px 0 6px 0; color: #1a1a1a; }
  p { margin: 6px 0; text-align: justify; }
  ul { margin: 4px 0 8px 22px; padding: 0; }
  li { margin: 2px 0; }
  .meta { text-align: center; font-size: 10pt; color: #555; margin-bottom: 18px; }
  .signatures { margin-top: 28px; display: flex; gap: 40px; justify-content: space-between; }
  .signatures .box { flex: 1; border-top: 1px solid #999; padding-top: 6px; font-size: 10.5pt; min-height: 70px; }
  .footer { margin-top: 24px; padding-top: 6px; border-top: 1px solid #ccc; font-size: 9pt; color: #777; text-align: center; }
  .page-break { page-break-before: always; }
</style>
`;

function footerHtml(o: OrganismeInfo): string {
  const parts = [o.nom, o.siret ? `SIRET ${o.siret}` : "", o.nda ? `Déclaration d'activité n° ${o.nda}` : ""]
    .filter(Boolean).join(" — ");
  return `<div class="footer"><strong>${escapeHtml(o.nom || "")}</strong>${parts.replace(o.nom || "", "") ? " — " + escapeHtml(parts.replace((o.nom || "") + " — ", "")) : ""}</div>`;
}

/* =========================================================================
 * DOCUMENT 1 : CONTRAT DE FORMATION PROFESSIONNELLE
 * ========================================================================= */
export function genContratNDA(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[]
): string {
  const today = new Date().toISOString().slice(0, 10);
  const dateSignature = fmtDateLong(today);
  const lieuSignature = v(o.ville);

  // Génère un contrat par stagiaire (séparés par saut de page).
  const list = (stagiaires && stagiaires.length > 0) ? stagiaires : [{
    nom: "", prenom: "", email: "", telephone: "",
    adresse: "", codePostal: "", ville: "",
  } as StagiaireInfo];

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
    const adresseStagiaire = adresseComplete(s.adresse, s.codePostal, s.ville);
    const pageBreak = idx > 0 ? `<div class="page-break"></div>` : "";

    return `${pageBreak}
<h1>Contrat de formation professionnelle</h1>
<h2>(Articles L.6353-3 et suivants du Code du travail)</h2>
<div class="meta">Fait à ${lieuSignature}, le ${dateSignature}</div>

<p><strong>Entre les soussignés :</strong></p>
<p>1) <strong>${v(o.nom)}</strong>, dont le siège est situé ${adresseOrg}, représenté par <strong>${v(o.dirigeant)}</strong>, enregistré sous le numéro de déclaration d'activité <strong>${v(o.nda)}</strong> auprès de la DRIEETS, ci-après désigné « l'organisme de formation ».</p>
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
<p>La formation donne lieu à la délivrance ${sanction === "une attestation de fin de formation" ? "d'" + sanction : "d'" + sanction} précisant les objectifs, la nature, la durée de l'action et les résultats de l'évaluation des acquis.</p>

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

<p style="margin-top:18px;">Fait en double exemplaire, à <strong>${lieuSignature}</strong>, le <strong>${dateSignature}</strong>.</p>

<div class="signatures">
  <div class="box"><strong>Pour le stagiaire</strong><br>${nomStagiaire || DOTS}<br><em>(signature précédée de la mention « Lu et approuvé »)</em></div>
  <div class="box"><strong>Pour l'organisme de formation</strong><br>${v(o.dirigeant)}<br><em>${v(o.nom)}</em></div>
</div>

${footerHtml(o)}`;
  }).join("\n");

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">${CSS}</head><body>${blocks}</body></html>`;
}

/* =========================================================================
 * DOCUMENT 2 : RÈGLEMENT INTÉRIEUR
 * ========================================================================= */
export function genReglementNDA(o: OrganismeInfo, _f?: FormationInfo, _s?: StagiaireInfo[]): string {
  const today = new Date();
  const dateStr = today.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const ville = v(o.ville);

  const body = `
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

<div class="signatures">
  <div class="box"><strong>Pour l'organisme de formation</strong><br>${v(o.dirigeant)}<br><em>${v(o.nom)}</em><br>Fait à ${ville}, le ${dateStr}</div>
  <div class="box"><strong>Le stagiaire</strong><br><em>(signature précédée de la mention « Lu et approuvé »)</em></div>
</div>

${footerHtml(o)}`;

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">${CSS}</head><body>${body}</body></html>`;
}
