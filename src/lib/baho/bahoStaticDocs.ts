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

export function getRIHTML(e: BahoEntreprise): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}</head><body>
  ${header()}
  <h1>Règlement intérieur</h1>
  <p><strong>Organisme de formation :</strong> ${FORMAT_SPHERE_ORG.nom}<br/>
  <strong>Bénéficiaire :</strong> ${e.nom} – SIRET ${e.siret}<br/>
  <strong>Date d'application :</strong> ${formatDateLong(e.dateConvention)}</p>

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

  <p style="margin-top:30px;">Fait à ${FORMAT_SPHERE_ORG.ville}, le ${formatDateLong(e.dateConvention)}<br/>
  ${FORMAT_SPHERE_ORG.dirigeant} – Dirigeant ${FORMAT_SPHERE_ORG.nom}</p>

  ${footer()}
  </body></html>`;
}

export function getCGVHTML(e: BahoEntreprise): string {
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

  ${footer()}
  </body></html>`;
}

export function getFactureHTML(e: BahoEntreprise, numero: string): string {
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

  ${footer()}
  </body></html>`;
}
