/**
 * BAHO - Static HTML docs (RI, CGV, Facture) — FORMAT SPHERE
 */
import { FORMAT_SPHERE_ORG, type BahoEntreprise, type BahoStagiaire } from "./bahoData";
import { getHotelStampSvg, getFormatSphereStampSvg, svgToDataUri } from "./bahoStamps";

function formatDateLong(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

/** Calcule les jours fériés français (métropole) pour une année donnée */
function getFrenchHolidays(year: number): Set<string> {
  const fixed = [
    `${year}-01-01`, // Jour de l'an
    `${year}-05-01`, // Fête du travail
    `${year}-05-08`, // Victoire 1945
    `${year}-07-14`, // Fête nationale
    `${year}-08-15`, // Assomption
    `${year}-11-01`, // Toussaint
    `${year}-11-11`, // Armistice
    `${year}-12-25`, // Noël
  ];
  // Calcul de Pâques (algorithme de Meeus/Jones/Butcher)
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  const easter = new Date(Date.UTC(year, month - 1, day));
  const addDays = (base: Date, n: number) => {
    const x = new Date(base);
    x.setUTCDate(x.getUTCDate() + n);
    return x.toISOString().slice(0, 10);
  };
  fixed.push(addDays(easter, 1));   // Lundi de Pâques
  fixed.push(addDays(easter, 39));  // Ascension
  fixed.push(addDays(easter, 50));  // Lundi de Pentecôte
  return new Set(fixed);
}

/** Soustrait N jours ouvrés (hors weekends + jours fériés FR) à une date ISO */
function subtractWorkingDays(iso: string, n: number): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  let remaining = n;
  let holidays = getFrenchHolidays(d.getUTCFullYear());
  while (remaining > 0) {
    d.setUTCDate(d.getUTCDate() - 1);
    if (d.getUTCFullYear() !== [...holidays][0]?.slice(0, 4) as unknown as number) {
      holidays = getFrenchHolidays(d.getUTCFullYear());
    }
    const day = d.getUTCDay();
    const iso10 = d.toISOString().slice(0, 10);
    if (day !== 0 && day !== 6 && !holidays.has(iso10)) {
      remaining--;
    }
  }
  return d.toISOString().slice(0, 10);
}

const BASE_CSS = `
<style>
  body { font-family: 'Calibri', Arial, sans-serif; font-size: 11pt; color: #222; line-height: 1.5; padding: 30px; }
  h1 { color: #1a3a6e; font-size: 18pt; border-bottom: 2px solid #1a3a6e; padding-bottom: 6px; }
  h2 { color: #1a3a6e; font-size: 13pt; margin-top: 18px; }
  h3 { font-size: 11pt; margin-top: 12px; }
  table { width: 100%; border-collapse: collapse; margin: 10px 0; }
  th, td { border: 1px solid #888; padding: 6px 8px; text-align: left; vertical-align: top; }
  th { background: #e8eef8; }
  .header { display: flex; justify-content: space-between; margin-bottom: 20px; }
  .org-block { font-size: 10pt; }
  .org-name { font-weight: bold; color: #1a3a6e; font-size: 12pt; }
  .footer { margin-top: 30px; font-size: 9pt; text-align: center; color: #555; border-top: 1px solid #ccc; padding-top: 8px; }
  .total-row { font-weight: bold; background: #f4f4f4; }
</style>`;

function header(): string {
  return `
  <div class="header">
    <div class="org-block">
      <div class="org-name">${FORMAT_SPHERE_ORG.nom}</div>
      <div>${FORMAT_SPHERE_ORG.adresse}</div>
      <div>${FORMAT_SPHERE_ORG.codePostal} ${FORMAT_SPHERE_ORG.ville}</div>
      <div>SIRET : ${FORMAT_SPHERE_ORG.siret}</div>
      <div>NDA : ${FORMAT_SPHERE_ORG.nda}</div>
      <div>${FORMAT_SPHERE_ORG.email} – ${FORMAT_SPHERE_ORG.telephone}</div>
    </div>
  </div>`;
}

function footer(): string {
  return `
  <div class="footer">
    <strong>${FORMAT_SPHERE_ORG.nom}</strong> – ${FORMAT_SPHERE_ORG.adresse}, ${FORMAT_SPHERE_ORG.codePostal} ${FORMAT_SPHERE_ORG.ville}<br/>
    SIRET ${FORMAT_SPHERE_ORG.siret} – Déclaration d'activité enregistrée sous le n° ${FORMAT_SPHERE_ORG.nda} auprès du Préfet de région Île-de-France<br/>
    Version 1.0 – ${formatDateLong(new Date().toISOString())}
  </div>`;
}

export function getRIHTML(e: BahoEntreprise, stagiaire?: BahoStagiaire, customFsStamp?: string): string {
  const civilite = stagiaire ? `${stagiaire.prenom} ${stagiaire.nom}` : "";
  const titreStagiaire = stagiaire
    ? `<p><strong>Stagiaire :</strong> ${civilite}${stagiaire.emploi ? ` – ${stagiaire.emploi}` : ""}<br/>
       <strong>Code stagiaire :</strong> ${stagiaire.codeStagiaire}</p>`
    : "";

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}</head><body>
  ${header()}
  <h1>Règlement intérieur</h1>
  <p><strong>Organisme de formation :</strong> ${FORMAT_SPHERE_ORG.nom}<br/>
  <strong>Bénéficiaire (entreprise) :</strong> ${e.nom} – SIRET ${e.siret}<br/>
  <strong>Date d'application :</strong> ${formatDateLong(e.dateConvention)}</p>
  ${titreStagiaire}

  <h2>Article 1 – Objet et champ d'application</h2>
  <p>Le présent règlement intérieur est établi conformément aux articles L.6352-3 et L.6352-4 et R.6352-1 à R.6352-15 du Code du travail. Il s'applique à tous les stagiaires inscrits à une session dispensée par ${FORMAT_SPHERE_ORG.nom} et ce, pour toute la durée de la formation suivie.</p>

  <h2>Article 2 – Discipline générale</h2>
  <p>Les stagiaires sont tenus de respecter les horaires de formation fixés par l'organisme. Toute absence ou retard doit être signalé au formateur référent. Il est interdit de fumer, de vapoter, de consommer de l'alcool ou des stupéfiants dans les locaux de formation.</p>

  <h2>Article 3 – Hygiène et sécurité</h2>
  <p>Chaque stagiaire doit veiller à sa sécurité personnelle et à celle des autres en respectant les consignes générales et particulières de sécurité en vigueur sur les lieux de stage. Les consignes d'évacuation en cas d'incendie sont affichées dans les locaux.</p>

  <h2>Article 4 – Tenue et comportement</h2>
  <p>Les stagiaires sont invités à se présenter au lieu de formation en tenue décente et à avoir un comportement correct à l'égard de toute personne présente.</p>

  <h2>Article 5 – Sanctions disciplinaires</h2>
  <p>Tout manquement du stagiaire à l'une des dispositions du présent règlement intérieur pourra faire l'objet d'une sanction. Les sanctions applicables sont, par ordre d'importance croissante : avertissement écrit, blâme, exclusion temporaire, exclusion définitive.</p>

  <h2>Article 6 – Garanties disciplinaires</h2>
  <p>Aucune sanction ne peut être infligée au stagiaire sans qu'il ait été informé au préalable des griefs retenus contre lui. Le stagiaire convoqué peut se faire assister par une personne de son choix.</p>

  <h2>Article 7 – Représentation des stagiaires</h2>
  <p>Pour les sessions d'une durée supérieure à 500 heures, il est procédé simultanément à l'élection d'un délégué titulaire et d'un délégué suppléant au scrutin uninominal à deux tours.</p>

  <h2>Article 8 – Publicité du règlement</h2>
  <p>Un exemplaire du présent règlement est remis à chaque stagiaire avant le début de la formation.</p>

  <p style="margin-top:30px;">Fait à ${FORMAT_SPHERE_ORG.ville}, le ${formatDateLong(e.dateConvention)}</p>

  ${stampsBlock(e, customFsStamp)}

  ${stagiaire ? `<p style="margin-top:20px;"><strong>Signature du stagiaire</strong> (${civilite}) :<br/>
  <span style="display:inline-block; border-bottom:1px solid #888; width:300px; height:40px;"></span></p>` : ""}

  ${footer()}
  </body></html>`;
}

/** Build a stamps signature block (FORMAT SPHERE + hotel) used in all PDFs */
function stampsBlock(e: BahoEntreprise, customFsStamp?: string): string {
  const hotelStamp = svgToDataUri(getHotelStampSvg(e));
  const fsStamp = customFsStamp || svgToDataUri(getFormatSphereStampSvg());
  return `
  <table style="margin-top:25px; border:none; width:100%;">
    <tr style="border:none;">
      <td style="border:none; width:50%; text-align:center; vertical-align:top;">
        <strong>Pour l'organisme de formation</strong><br/>
        ${FORMAT_SPHERE_ORG.dirigeant}<br/>
        <em>${FORMAT_SPHERE_ORG.nom}</em><br/>
        <img src="${fsStamp}" alt="Tampon FORMAT SPHERE" style="width:150px; height:150px; margin-top:8px;"/>
      </td>
      <td style="border:none; width:50%; text-align:center; vertical-align:top;">
        <strong>Pour l'entreprise bénéficiaire</strong><br/>
        ${e.dirigeant}<br/>
        <em>${e.nom}</em><br/>
        <img src="${hotelStamp}" alt="Tampon hôtel" style="width:150px; height:150px; margin-top:8px;"/>
      </td>
    </tr>
  </table>`;
}

/** Convention de formation per hotel — includes Article 3 - Participants (all stagiaires) + tampons */
export function getConventionHTML(e: BahoEntreprise, customFsStamp?: string): string {
  const civiliteForStg = (s: BahoStagiaire) => {
    // Default to "Mme" unless prenom looks masculine — keep it simple, follow screenshot style
    const prenomsM = ["Taha", "Mathis", "Roland", "Mohamed", "Ahmed", "Karim", "Said", "Hassan", "Yann", "Pierre", "Jean", "Paul", "Marc", "Luc"];
    const isM = prenomsM.some((p) => s.prenom?.toLowerCase().startsWith(p.toLowerCase()));
    return isM ? "M." : "Mme";
  };

  const participantsList = e.stagiaires
    .map((s) => `<li><strong>${civiliteForStg(s)} ${s.nom.toUpperCase()} ${s.prenom}</strong>${s.emploi ? ` – ${s.emploi}` : ""}</li>`)
    .join("");

  const nbHeures = 14; // AFEST hôtellerie standard
  const prixUnit = 1400;
  const totalHt = e.stagiaires.length * prixUnit;

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}
  <style>
    ul.participants { margin: 12px 0 12px 24px; padding: 0; list-style: disc; }
    ul.participants li { margin: 8px 0; font-size: 11pt; }
    .article-title { font-weight: bold; font-size: 14pt; margin-top: 18px; color: #1a3a6e; }
  </style>
  </head><body>
  ${header()}
  <h1>Convention de formation professionnelle</h1>
  <p style="font-size:10pt; color:#555;">Articles L.6353-1 et L.6353-2 du Code du travail</p>

  <p><strong>Entre les soussignés :</strong></p>
  <p><strong>${FORMAT_SPHERE_ORG.nom}</strong>, organisme de formation<br/>
  ${FORMAT_SPHERE_ORG.adresse}, ${FORMAT_SPHERE_ORG.codePostal} ${FORMAT_SPHERE_ORG.ville}<br/>
  SIRET ${FORMAT_SPHERE_ORG.siret} – NDA ${FORMAT_SPHERE_ORG.nda}<br/>
  Représenté par ${FORMAT_SPHERE_ORG.dirigeant}, dirigeant<br/>
  Ci-après désigné « l'Organisme »</p>

  <p><strong>Et</strong></p>
  <p><strong>${e.nom}</strong><br/>
  ${e.adresse}<br/>
  SIRET ${e.siret}<br/>
  Représenté par ${e.dirigeant}<br/>
  Ci-après désigné « le Bénéficiaire »</p>

  <p class="article-title">Article 1 – Objet</p>
  <p>L'Organisme s'engage à organiser une Action de Formation En Situation de Travail (AFEST) intitulée :<br/>
  « <strong>Hygiène, sécurité et qualité de service en hôtellerie</strong> »</p>

  <p class="article-title">Article 2 – Modalités</p>
  <p><strong>Dates :</strong> du ${formatDateLong(e.dateDebut)} au ${formatDateLong(e.dateFin)}<br/>
  <strong>Durée :</strong> ${nbHeures} heures<br/>
  <strong>Lieu :</strong> ${e.adresse}<br/>
  <strong>Modalité :</strong> AFEST – Action de Formation En Situation de Travail</p>

  <p class="article-title">Article 3 – Participants</p>
  <ul class="participants">
    ${participantsList}
  </ul>

  <p class="article-title">Article 4 – Tarif et financement</p>
  <p><strong>Prix unitaire HT :</strong> ${prixUnit.toLocaleString("fr-FR")} € par stagiaire<br/>
  <strong>Nombre de stagiaires :</strong> ${e.stagiaires.length}<br/>
  <strong>Total HT :</strong> ${totalHt.toLocaleString("fr-FR")} €<br/>
  TVA non applicable, art. 261-4-4° a du CGI<br/>
  <strong>Total TTC :</strong> ${totalHt.toLocaleString("fr-FR")} €</p>

  <p class="article-title">Article 5 – Modalités de règlement</p>
  <p>Règlement à 30 jours date de facture, par virement bancaire à réception de la facture émise à l'issue de la formation.</p>

  <p class="article-title">Article 6 – Dédit ou abandon</p>
  <p>En cas d'annulation par le Bénéficiaire moins de 14 jours avant le début de la formation, 50 % du montant total sera dû à titre de dédit. En cas d'absence du stagiaire, l'intégralité du coût pédagogique reste due.</p>

  <p class="article-title">Article 7 – Différends éventuels</p>
  <p>Si une contestation ou un différend ne peuvent être réglés à l'amiable, le Tribunal compétent du ressort du siège social de l'Organisme sera seul compétent.</p>

  <p style="margin-top:25px;">Fait à ${e.adresse.split(" ").slice(-1)[0] || FORMAT_SPHERE_ORG.ville}, en double exemplaire, le ${formatDateLong(e.dateConvention)}</p>

  ${stampsBlock(e, customFsStamp)}

  ${footer()}
  </body></html>`;
}

export function getCGVHTML(e: BahoEntreprise, customFsStamp?: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}</head><body>
  ${header()}
  <h1>Conditions Générales de Vente</h1>
  <p><strong>Prestataire :</strong> ${FORMAT_SPHERE_ORG.nom} – SIRET ${FORMAT_SPHERE_ORG.siret}<br/>
  <strong>Client :</strong> ${e.nom} – SIRET ${e.siret}<br/>
  <strong>Date :</strong> ${formatDateLong(e.dateConvention)}</p>

  <h2>Article 1 – Objet</h2>
  <p>Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre ${FORMAT_SPHERE_ORG.nom}, organisme de formation, et toute personne physique ou morale (le « Client ») souhaitant bénéficier de prestations de formation professionnelle, notamment d'Actions de Formation En Situation de Travail (AFEST) en hôtellerie.</p>

  <h2>Article 2 – Inscription et conditions d'accès</h2>
  <p>L'inscription est validée par la signature d'une convention de formation professionnelle entre les parties. ${FORMAT_SPHERE_ORG.nom} se réserve le droit de refuser une inscription en cas d'incompatibilité avec les prérequis de la formation.</p>

  <h2>Article 3 – Tarifs et conditions de paiement</h2>
  <p>Les prix sont indiqués en euros, exonérés de TVA selon l'article 261-4-4° a du CGI. Les factures sont payables à 30 jours date de facture, par virement bancaire. Tout retard de paiement entraînera l'application de pénalités au taux d'intérêt légal majoré, ainsi qu'une indemnité forfaitaire de recouvrement de 40 € (article L.441-10 du Code de commerce).</p>

  <h2>Article 4 – Annulation et report</h2>
  <p>Toute annulation par le Client doit être notifiée par écrit. En cas d'annulation moins de 14 jours avant le début de la formation, 50 % du montant total sera dû à titre de dédit. En cas d'absence totale du stagiaire, l'intégralité du coût pédagogique reste due.</p>

  <h2>Article 5 – Force majeure</h2>
  <p>${FORMAT_SPHERE_ORG.nom} ne pourra être tenu responsable en cas de force majeure rendant impossible l'exécution de la prestation.</p>

  <h2>Article 6 – Propriété intellectuelle</h2>
  <p>Les supports pédagogiques remis lors des formations sont la propriété exclusive de ${FORMAT_SPHERE_ORG.nom}. Toute reproduction ou diffusion sans autorisation écrite est interdite.</p>

  <h2>Article 7 – Confidentialité et RGPD</h2>
  <p>${FORMAT_SPHERE_ORG.nom} s'engage à respecter la confidentialité des informations communiquées par le Client. Les données personnelles sont traitées conformément au RGPD. Le Client dispose d'un droit d'accès, de rectification et de suppression.</p>

  <h2>Article 8 – Litiges</h2>
  <p>En cas de différend, les parties s'efforceront de trouver une solution amiable. À défaut, tout litige sera soumis aux tribunaux compétents du ressort du siège social de ${FORMAT_SPHERE_ORG.nom}.</p>

  <p style="margin-top:30px;">Fait à ${FORMAT_SPHERE_ORG.ville}, le ${formatDateLong(e.dateConvention)}<br/>
  ${FORMAT_SPHERE_ORG.dirigeant} – Dirigeant</p>

  ${stampsBlock(e, customFsStamp)}

  ${footer()}
  </body></html>`;
}

export function getFactureHTML(e: BahoEntreprise, numero: string, customFsStamp?: string): string {
  const nbStagiaires = e.stagiaires.length;
  const prixUnitaire = 1400;
  const total = nbStagiaires * prixUnitaire;

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}</head><body>
  ${header()}
  <h1>Facture n° ${numero}</h1>

  <table style="margin-bottom:20px;">
    <tr>
      <td style="width:50%;">
        <strong>Émetteur :</strong><br/>
        ${FORMAT_SPHERE_ORG.nom}<br/>
        ${FORMAT_SPHERE_ORG.adresse}<br/>
        ${FORMAT_SPHERE_ORG.codePostal} ${FORMAT_SPHERE_ORG.ville}<br/>
        SIRET ${FORMAT_SPHERE_ORG.siret}<br/>
        NDA ${FORMAT_SPHERE_ORG.nda}
      </td>
      <td style="width:50%;">
        <strong>Client :</strong><br/>
        ${e.nom}<br/>
        ${e.adresse}<br/>
        SIRET ${e.siret}<br/>
        ${e.email}
      </td>
    </tr>
  </table>

  <p><strong>Date de facture :</strong> ${formatDateLong(e.dateConvention)}<br/>
  <strong>Période de formation :</strong> du ${formatDateLong(e.dateDebut)} au ${formatDateLong(e.dateFin)}</p>

  <h2>Détail de la prestation</h2>
  <table>
    <thead>
      <tr><th>Désignation</th><th style="width:80px;">Quantité</th><th style="width:110px;">Prix unitaire HT</th><th style="width:110px;">Total HT</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>Action de Formation En Situation de Travail (AFEST) – Hôtellerie<br/>
        <em>Période : ${formatDateLong(e.dateDebut)} → ${formatDateLong(e.dateFin)}</em></td>
        <td>${nbStagiaires}</td>
        <td>${prixUnitaire.toLocaleString("fr-FR")} €</td>
        <td>${total.toLocaleString("fr-FR")} €</td>
      </tr>
      <tr class="total-row">
        <td colspan="3" style="text-align:right;">Total HT</td>
        <td>${total.toLocaleString("fr-FR")} €</td>
      </tr>
      <tr class="total-row">
        <td colspan="3" style="text-align:right;">TVA (exonérée art. 261-4-4° a CGI)</td>
        <td>0,00 €</td>
      </tr>
      <tr class="total-row">
        <td colspan="3" style="text-align:right;">Total TTC</td>
        <td>${total.toLocaleString("fr-FR")} €</td>
      </tr>
    </tbody>
  </table>

  <h2>Conditions de paiement</h2>
  <p>Règlement à 30 jours par virement bancaire.<br/>
  TVA non applicable, art. 261-4-4° a du CGI.<br/>
  En cas de retard, pénalités au taux d'intérêt légal majoré + indemnité forfaitaire de 40 € (art. L.441-10 C. com.).</p>

  <p style="margin-top:30px;">Fait à ${FORMAT_SPHERE_ORG.ville}, le ${formatDateLong(e.dateConvention)}<br/>
  ${FORMAT_SPHERE_ORG.dirigeant}</p>

  ${stampsBlock(e, customFsStamp)}

  ${footer()}
  </body></html>`;
}

export function getDevisHTML(e: BahoEntreprise, numero: string, customFsStamp?: string): string {
  const nbStagiaires = e.stagiaires.length;
  const prixUnitaire = 1400;
  const total = nbStagiaires * prixUnitaire;
  const devisDate = (() => {
    if (!e.dateConvention) return "";
    const d = new Date(e.dateConvention);
    d.setDate(d.getDate() - 7);
    return d.toISOString().slice(0, 10);
  })();
  const validiteDate = (() => {
    if (!devisDate) return "";
    const d = new Date(devisDate);
    d.setDate(d.getDate() + 30);
    return d.toISOString().slice(0, 10);
  })();

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}</head><body>
  ${header()}
  <h1>Devis n° ${numero}</h1>

  <table style="margin-bottom:20px;">
    <tr>
      <td style="width:50%;">
        <strong>Émetteur :</strong><br/>
        ${FORMAT_SPHERE_ORG.nom}<br/>
        ${FORMAT_SPHERE_ORG.adresse}<br/>
        ${FORMAT_SPHERE_ORG.codePostal} ${FORMAT_SPHERE_ORG.ville}<br/>
        SIRET ${FORMAT_SPHERE_ORG.siret}<br/>
        NDA ${FORMAT_SPHERE_ORG.nda}
      </td>
      <td style="width:50%;">
        <strong>Client :</strong><br/>
        ${e.nom}<br/>
        ${e.adresse}<br/>
        SIRET ${e.siret}<br/>
        ${e.email}
      </td>
    </tr>
  </table>

  <p><strong>Date du devis :</strong> ${formatDateLong(devisDate)}<br/>
  <strong>Validité :</strong> jusqu'au ${formatDateLong(validiteDate)}<br/>
  <strong>Période de formation prévue :</strong> du ${formatDateLong(e.dateDebut)} au ${formatDateLong(e.dateFin)}</p>

  <h2>Détail de la prestation</h2>
  <table>
    <thead>
      <tr><th>Désignation</th><th style="width:80px;">Quantité</th><th style="width:110px;">Prix unitaire HT</th><th style="width:110px;">Total HT</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>Action de Formation En Situation de Travail (AFEST) – Hôtellerie<br/>
        <em>Hygiène, sécurité et qualité de service</em><br/>
        <em>Période : ${formatDateLong(e.dateDebut)} → ${formatDateLong(e.dateFin)}</em></td>
        <td>${nbStagiaires}</td>
        <td>${prixUnitaire.toLocaleString("fr-FR")} €</td>
        <td>${total.toLocaleString("fr-FR")} €</td>
      </tr>
      <tr class="total-row">
        <td colspan="3" style="text-align:right;">Total HT</td>
        <td>${total.toLocaleString("fr-FR")} €</td>
      </tr>
      <tr class="total-row">
        <td colspan="3" style="text-align:right;">TVA (exonérée art. 261-4-4° a CGI)</td>
        <td>0,00 €</td>
      </tr>
      <tr class="total-row">
        <td colspan="3" style="text-align:right;">Total TTC</td>
        <td>${total.toLocaleString("fr-FR")} €</td>
      </tr>
    </tbody>
  </table>

  <h2>Conditions</h2>
  <p>Devis valable 30 jours à compter de sa date d'émission.<br/>
  Règlement à 30 jours par virement bancaire à réception de facture.<br/>
  TVA non applicable, art. 261-4-4° a du CGI.<br/>
  Bon pour accord vaut signature de la convention de formation professionnelle annexée.</p>

  <p style="margin-top:30px;">Fait à ${FORMAT_SPHERE_ORG.ville}, le ${formatDateLong(devisDate)}<br/>
  ${FORMAT_SPHERE_ORG.dirigeant}</p>

  ${stampsBlock(e, customFsStamp)}

  <p style="margin-top:20px;"><strong>Bon pour accord</strong> (à retourner signé) :<br/>
  Nom et qualité du signataire : <span style="display:inline-block; border-bottom:1px solid #888; width:300px;">&nbsp;</span><br/>
  Date : <span style="display:inline-block; border-bottom:1px solid #888; width:120px;">&nbsp;</span> &nbsp; Signature et cachet :</p>

  ${footer()}
  </body></html>`;
}
