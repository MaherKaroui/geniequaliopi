/**
 * Contrat de Formation Professionnelle — format AFA FORMATION (NDA / Demande NDA)
 * Reproduit fidèlement la structure du modèle officiel :
 *  - Header organisme répété en haut de chaque page
 *  - 9 articles numérotés (Objet, Nature, Niveau, Organisation, Sanction,
 *    Rétractation, Paiement, Cessation, Différend)
 *  - Footer "Cet enregistrement ne vaut agrément d'état" + "Maj : JJ/MM/AAAA"
 *  - Signatures finales (stagiaire « Lu et approuvé » / organisme cachet)
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { formatDate } from "@/lib/docBuilder";

const fmtEuro = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " €";

function todayShort(): string {
  return new Date().toLocaleDateString("fr-FR");
}

function shortDate(dateStr?: string): string {
  if (!dateStr) return "___/___/______";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("fr-FR");
}

function longDate(dateStr?: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function orgHeaderBlock(o: OrganismeInfo): string {
  const adresse = [o.adresse, [o.codePostal, o.ville].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");
  return `
    <div class="org-header">
      ${o.logoUrl ? `<img src="${o.logoUrl}" alt="logo" class="org-logo" />` : ""}
      <div class="org-name">${(o.nom || "").toUpperCase()}</div>
      ${adresse ? `<div class="org-line">${adresse}</div>` : ""}
      ${o.siret ? `<div class="org-line">Siret : ${o.siret}</div>` : ""}
      ${o.email ? `<div class="org-line">Mail : ${o.email}</div>` : ""}
    </div>
  `;
}

function pageFooter(o: OrganismeInfo): string {
  const adresse = [o.adresse, [o.codePostal, o.ville].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");
  const maj = o.dateMaj ? shortDate(o.dateMaj) : todayShort();
  return `
    <div class="page-footer">
      <div class="footer-org"><strong>${(o.nom || "").toUpperCase()}</strong></div>
      ${adresse ? `<div class="footer-line">${adresse}</div>` : ""}
      ${o.siret ? `<div class="footer-line">Siret : ${o.siret}</div>` : ""}
      ${o.email ? `<div class="footer-line">Mail : ${o.email}</div>` : ""}
      <div class="footer-italic">Cet enregistrement ne vaut agrément d'état</div>
      <div class="footer-line">Maj : ${maj}</div>
    </div>
  `;
}

function buildEcheancierAFA(f: FormationInfo, s: StagiaireInfo): string {
  const tarifStr = (s as any)?.tarif || f.tarif || "0";
  const totalNum = parseFloat(String(tarifStr).replace(/[^\d.,]/g, "").replace(",", ".")) || 0;
  const dateDebut = (s as any)?.dateDebutFormation || f.dateDebut || "";
  const dateFin = (s as any)?.dateFinFormation || f.dateFin || "";

  if (totalNum <= 0) {
    return `
      <ul>
        <li><strong>Prix de la formation :</strong> ${f.tarif || "—"} TTC par stagiaire.</li>
        <li><strong>Modalités :</strong> Acompte de 30 % à l'issue du délai de rétractation, solde à régler selon échéancier convenu.</li>
        <li><strong>Mode de paiement :</strong> virement bancaire (autofinancement) ou selon modalités de financement externe (OPCO, CPF, etc.).</li>
      </ul>`;
  }

  const acompte = Math.round(totalNum * 0.3 * 100) / 100;
  const reste = Math.round((totalNum - acompte) * 100) / 100;
  const v1 = Math.round((reste / 2) * 100) / 100;
  const v2 = Math.round((reste - v1) * 100) / 100;

  // Dates des 2 versements solde : à mi-formation et fin de formation (sinon +20j / +40j depuis début)
  let date1 = "";
  let date2 = "";
  if (dateDebut) {
    const dStart = new Date(dateDebut);
    if (!isNaN(dStart.getTime())) {
      const dEnd = dateFin ? new Date(dateFin) : null;
      if (dEnd && !isNaN(dEnd.getTime())) {
        const mid = new Date(dStart.getTime() + (dEnd.getTime() - dStart.getTime()) / 2);
        date1 = mid.toLocaleDateString("fr-FR");
        date2 = dEnd.toLocaleDateString("fr-FR");
      } else {
        const d1 = new Date(dStart); d1.setDate(d1.getDate() + 20);
        const d2 = new Date(dStart); d2.setDate(d2.getDate() + 40);
        date1 = d1.toLocaleDateString("fr-FR");
        date2 = d2.toLocaleDateString("fr-FR");
      }
    }
  }

  return `
    <ul>
      <li><strong>Prix de la formation :</strong> ${fmtEuro(totalNum)} TTC par stagiaire.</li>
      <li><strong>Modalités :</strong>
        <ul>
          <li>Acompte de 30 % (soit ${fmtEuro(acompte)}) à l'issue du délai de rétractation.</li>
          <li>Solde (${fmtEuro(reste)}) réglé aux dates suivantes : ${fmtEuro(v1)} le ${date1 || "____"} – ${fmtEuro(v2)} le ${date2 || "____"}.</li>
        </ul>
      </li>
      <li><strong>Mode de paiement :</strong> virement bancaire (autofinancement) ou selon modalités de financement externe (OPCO, CPF, etc.).</li>
    </ul>`;
}

function buildObjectifsList(f: FormationInfo): string {
  const raw = (f.objectifs || "").trim();
  if (!raw) return "<li>Acquérir les compétences fondamentales liées à la formation.</li>";
  // split par puces/lignes/points-virgules
  const parts = raw
    .split(/\n+|(?:^|\s)[•\-\*]\s+|;\s+/g)
    .map(p => p.trim())
    .filter(p => p.length > 3);
  if (parts.length <= 1) return `<li>${raw}</li>`;
  return parts.map(p => `<li>${p}</li>`).join("");
}

export function genContratFormationNDA(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[]
): string {
  const s = stagiaires[0] || ({ prenom: "___", nom: "___", adresse: "", codePostal: "", ville: "", civilite: "" } as StagiaireInfo);
  const civilite = (s.civilite || "").toLowerCase().startsWith("mme") || (s.civilite || "").toLowerCase().startsWith("mad") ? "Mme" : "M.";
  const stagAdresse = [s.adresse, [s.codePostal, s.ville].filter(Boolean).join(" ")].filter(Boolean).join(", ");

  const dirigeantPrefix = (o.dirigeant || "").toLowerCase().startsWith("mme") ? "sa Présidente " : "son Président ";
  const dirigeantNom = (o.dirigeant || "").replace(/^(M\.|Mme|Madame|Monsieur)\s+/i, "");

  const dateDebut = (s as any)?.dateDebutFormation || f.dateDebut;
  const dateFin = (s as any)?.dateFinFormation || f.dateFin;
  const modaliteText = (f.modalites || "").toLowerCase().includes("distanc")
    ? "en distanciel, via visioconférence et plateforme e-learning"
    : (f.modalites || "").toLowerCase().includes("mixte")
    ? "en modalité mixte (présentiel et distanciel)"
    : "en présentiel";

  const dateSignature = todayShort();
  const ville = o.ville || "____";

  const css = `
    @page { size: A4; margin: 25mm 20mm 30mm 20mm; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.55; color: #111; margin: 0; }
    .org-header { text-align: center; margin: 0 0 18px 0; }
    .org-logo { max-height: 55px; margin-bottom: 6px; }
    .org-name { font-weight: 700; font-size: 13px; color: #1e3a7b; letter-spacing: 0.5px; }
    .org-line { font-size: 11px; color: #444; margin-top: 1px; }
    .doc-title { text-align: center; font-size: 18px; font-weight: 700; text-transform: uppercase; margin: 18px 0 4px 0; letter-spacing: 1px; }
    .doc-subtitle { text-align: center; font-style: italic; font-size: 11px; color: #555; margin-bottom: 22px; }
    .article-title { font-weight: 700; font-size: 13px; color: #1e3a7b; margin: 18px 0 8px 0; border-bottom: 1px solid #1e3a7b; padding-bottom: 3px; }
    p { margin: 6px 0; text-align: justify; }
    ul { margin: 6px 0 6px 18px; padding: 0; }
    ul li { margin: 3px 0; }
    .parties p { margin: 4px 0; }
    .signatures { margin-top: 35px; display: flex; justify-content: space-between; gap: 30px; }
    .signature-box { flex: 1; }
    .signature-box .label { font-weight: 700; margin-bottom: 4px; }
    .signature-box .mention { font-style: italic; font-size: 11px; color: #555; }
    .sig-img { max-height: 70px; margin-top: 6px; }
    .stamp-img { max-height: 80px; margin-top: 6px; }
    .page-break { page-break-after: always; }
    .page-footer { position: running(footer); text-align: center; font-size: 9.5px; color: #444; padding-top: 6px; border-top: 1px solid #cfd6e4; }
    .footer-org { font-weight: 700; color: #1e3a7b; }
    .footer-line { margin-top: 1px; }
    .footer-italic { font-style: italic; margin-top: 3px; color: #666; }
    @page { @bottom-center { content: element(footer); } }
  `;

  const footerHtml = pageFooter(o);

  const body = `
    ${orgHeaderBlock(o)}

    <h1 class="doc-title">Contrat de Formation Professionnelle</h1>
    <div class="doc-subtitle">(Articles L.6353-3 et suivants du Code du travail)</div>

    <div class="parties">
      <p>Entre les soussignés :</p>
      <p><strong>1)</strong> ${o.nom || "____"}, organisme de formation enregistré sous le numéro SIRET : ${o.siret || "____"},
      dont le siège social est situé au ${o.adresse || "____"}, ${o.codePostal || ""} ${o.ville || ""},
      représenté${(o.dirigeant || "").toLowerCase().startsWith("mme") ? "e" : ""} par ${dirigeantPrefix}${(o.dirigeant || "").toLowerCase().startsWith("mme") ? "Madame" : "Monsieur"} ${dirigeantNom || "____"},
      ci-après dénommé « l'organisme de formation »,</p>
      <p><strong>ET</strong></p>
      <p><strong>2)</strong> ${civilite} ${s.prenom || "____"} ${s.nom || "____"},<br>
      Demeurant : ${stagAdresse || "____"}<br>
      Ci-après désigné(e) « le stagiaire ».</p>
    </div>

    <div class="page-break"></div>
    ${orgHeaderBlock(o)}

    <h2 class="article-title">Article 1 : Objet</h2>
    <p>En exécution du présent contrat, l'organisme de formation s'engage à organiser l'action de formation intitulée :</p>
    <p style="text-align:center;font-style:italic;">« ${f.intitule || "____"} »</p>

    <h2 class="article-title">Article 2 : Nature et caractéristiques de l'action de formation</h2>
    <ul>
      <li>L'action de formation entre dans la catégorie des actions prévues à l'article L.6313-1 du Code du travail.</li>
      <li>Elle a pour objectifs pédagogiques :
        <ul>${buildObjectifsList(f)}</ul>
      </li>
      <li>À l'issue de la formation, une attestation de fin de formation sera remise au stagiaire.</li>
      <li>Sa durée est fixée à <strong>${f.duree || "____"}</strong>.</li>
      <li>Le programme détaillé figure en annexe du présent contrat.</li>
    </ul>

    <h2 class="article-title">Article 3 : Niveau de connaissances préalables</h2>
    <p>${f.prerequis || "Avoir au minimum 18 ans. Aucune qualification spécifique n'est requise."}</p>

    <div class="page-break"></div>
    ${orgHeaderBlock(o)}

    <h2 class="article-title">Article 4 : Organisation de l'action de formation</h2>
    <ul>
      <li>La formation se déroulera ${modaliteText}.</li>
      <li><strong>Dates :</strong> du ${shortDate(dateDebut)} au ${shortDate(dateFin)}</li>
      <li><strong>Formateur / Formatrice :</strong> ${f.formateur || o.dirigeant || "____"}</li>
      <li><strong>Moyens pédagogiques et techniques :</strong>
        <ul>
          <li>${f.moyensPedagogiques || "Apports théoriques, études de cas, exercices pratiques et ateliers collaboratifs."}</li>
          <li>Supports numériques (PDF, présentations, vidéos).</li>
          <li>Assistance pédagogique et technique (mail, visioconférence).</li>
        </ul>
      </li>
    </ul>
    <p>Un suivi est assuré après la session :</p>
    <ul>
      <li>Évaluation à chaud et à froid,</li>
      <li>Assistance pédagogique complémentaire en ligne pendant 3 mois.</li>
    </ul>

    <h2 class="article-title">Article 5 : Nature de la sanction</h2>
    <p>À l'issue de la formation, une attestation de fin de formation sera remise au stagiaire, mentionnant les objectifs, la nature, la durée et les résultats de l'évaluation des acquis.</p>

    <div class="page-break"></div>
    ${orgHeaderBlock(o)}

    <h2 class="article-title">Article 6 : Délai de rétractation</h2>
    <p>À compter de la signature du présent contrat, le stagiaire dispose d'un délai de <strong>10 jours</strong> pour se rétracter. Ce délai court à compter de la date de signature (article L.6353-5 du Code du travail).</p>

    <h2 class="article-title">Article 7 : Modalités de paiement</h2>
    ${buildEcheancierAFA(f, s)}

    <h2 class="article-title">Article 8 : Cessation anticipée ou abandon</h2>
    <p>En cas de cessation anticipée du fait de l'organisme ou d'abandon par le stagiaire (hors cas de force majeure), le contrat sera résilié. Seules les heures effectivement réalisées seront dues, au prorata temporis.</p>

    <div class="page-break"></div>
    ${orgHeaderBlock(o)}

    <h2 class="article-title">Article 9 : Différend</h2>
    <p>Tout litige qui ne pourrait être résolu à l'amiable sera porté devant le tribunal compétent du ressort du siège social de l'organisme.</p>

    <p style="margin-top:25px;">Fait en double exemplaire à <strong>${ville}</strong>, le <strong>${dateSignature}</strong>.</p>

    <div class="signatures">
      <div class="signature-box">
        <div class="label">Pour le stagiaire :</div>
        <div>Nom : ${s.prenom || ""} ${s.nom || ""}</div>
        <div class="mention">Signature précédée de la mention « Lu et approuvé »</div>
        ${s.signatureUrl ? `<img src="${s.signatureUrl}" class="sig-img" alt="signature stagiaire" />` : ""}
      </div>
      <div class="signature-box">
        <div class="label">Pour l'organisme de formation :</div>
        <div>${o.dirigeant || ""}${(o.dirigeant || "").toLowerCase().startsWith("mme") ? ", Présidente" : ", Président"}</div>
        <div class="mention">Signature et cachet</div>
        ${o.signatureUrl ? `<img src="${o.signatureUrl}" class="sig-img" alt="signature organisme" />` : ""}
        ${o.tamponUrl ? `<img src="${o.tamponUrl}" class="stamp-img" alt="cachet organisme" />` : ""}
      </div>
    </div>

    ${footerHtml}
  `;

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Contrat de Formation</title><style>${css}</style></head><body>${body}</body></html>`;
}
