/**
 * BAHO - Static HTML docs (RI, CGV, Facture) — FORMAT SPHERE
 */
import { FORMAT_SPHERE_ORG, type BahoEntreprise, type BahoStagiaire } from "./bahoData";
import { getHotelStampSvg, getFormatSphereStampSvg, svgToDataUri } from "./bahoStamps";

export function formatDateLong(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

/** Calcule les jours fériés français (métropole) pour une année donnée */
export function getFrenchHolidays(year: number): Set<string> {
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

/** true si la date ISO tombe un samedi, un dimanche ou un jour férié français */
export function estJourNonOuvre(iso: string): boolean {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return false;
  const day = d.getUTCDay();
  return day === 0 || day === 6 || getFrenchHolidays(d.getUTCFullYear()).has(iso.slice(0, 10));
}

/** Recule la date jusqu'au jour ouvré précédent (jamais vers l'avant) */
export function jourOuvrePrecedent(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  let guard = 0;
  while (estJourNonOuvre(d.toISOString().slice(0, 10)) && guard < 30) {
    d.setUTCDate(d.getUTCDate() - 1);
    guard++;
  }
  return d.toISOString().slice(0, 10);
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

export const BASE_CSS = `
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

export function header(): string {
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

export function footer(): string {
  return `
  <div class="footer">
    <strong>${FORMAT_SPHERE_ORG.nom}</strong> – ${FORMAT_SPHERE_ORG.adresse}, ${FORMAT_SPHERE_ORG.codePostal} ${FORMAT_SPHERE_ORG.ville}<br/>
    SIRET ${FORMAT_SPHERE_ORG.siret} – Déclaration d'activité enregistrée sous le n° ${FORMAT_SPHERE_ORG.nda} auprès du Préfet de région Île-de-France
  </div>`;
}

export function getRIHTML(e: BahoEntreprise, stagiaire?: BahoStagiaire, customFsStamp?: string): string {
  const civilite = stagiaire ? `${stagiaire.nom.toUpperCase()} ${stagiaire.prenom}` : "";
  const dateRI = subtractWorkingDays(e.dateDebut, 14);
  const titreStagiaire = stagiaire
    ? `<p><strong>Stagiaire :</strong> ${civilite}${stagiaire.emploi ? ` – ${stagiaire.emploi}` : ""}<br/>
       <strong>Code stagiaire :</strong> ${stagiaire.codeStagiaire}</p>`
    : "";

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}</head><body>
  ${header()}
  <h1>RÈGLEMENT INTÉRIEUR</h1>
  <p style="text-align:center; font-style:italic; color:#555;">Action de formation en présentiel intra-entreprise – Hôtellerie & Restauration</p>

  <p><strong>Organisme de formation :</strong> ${FORMAT_SPHERE_ORG.nom}<br/>
  <strong>Bénéficiaire (entreprise) :</strong> ${e.nom} – SIRET ${e.siret}<br/>
  <strong>Lieu de formation :</strong> ${e.adresse}<br/>
  <strong>Date d'application :</strong> ${formatDateLong(dateRI)}</p>
  ${titreStagiaire}

  <h2>Article 1 – Objet et champ d'application</h2>
  <p>Le présent règlement est établi conformément aux dispositions des articles L.6352-3 et L.6352-4 ainsi que R.6352-1 à R.6352-15 du Code du travail.</p>
  <p>Il s'applique à l'ensemble des stagiaires inscrits à l'action de formation « <em>Structuration des pratiques opérationnelles, amélioration de l'expérience client et sécurisation des points critiques d'exploitation en établissement hôtelier et de restauration</em> » dispensée en présentiel au sein de l'établissement <strong>${e.nom}</strong> situé ${e.adresse}, pour toute la durée de ladite formation.</p>
  <p>Le centre de formation <strong>${FORMAT_SPHERE_ORG.nom}</strong>, domicilié au ${FORMAT_SPHERE_ORG.adresse}, ${FORMAT_SPHERE_ORG.codePostal} ${FORMAT_SPHERE_ORG.ville}, dispense ses formations en présentiel sur le site de l'entreprise bénéficiaire.</p>
  <p>Le présent règlement intérieur a pour objet de préciser les règles relatives à la discipline, à l'hygiène, à la sécurité, ainsi qu'aux droits et obligations des stagiaires, afin d'assurer le bon déroulement des formations.</p>

  <h2>Article 2 – Discipline générale</h2>
  <p>Il est formellement interdit aux stagiaires, notamment :</p>
  <ul>
    <li>De se présenter aux sessions de formation en état d'ébriété ou sous l'emprise de substances illicites ;</li>
    <li>De perturber le bon déroulement de la formation (comportement inapproprié, propos déplacés, interruptions répétées) ;</li>
    <li>D'enregistrer, de filmer ou de diffuser tout ou partie des sessions de formation sans autorisation écrite préalable de l'organisme ;</li>
    <li>De diffuser à des tiers les supports pédagogiques remis ou partagés durant la formation ;</li>
    <li>D'utiliser les outils mis à disposition à des fins étrangères à la formation.</li>
  </ul>
  <p>Le stagiaire s'engage à adopter une attitude respectueuse à l'égard du formateur, des collègues et des autres participants, tant à l'oral qu'à l'écrit.</p>

  <h2>Article 3 – Sanctions disciplinaires</h2>
  <p>Tout agissement considéré comme fautif par la direction de l'organisme de formation pourra, en fonction de sa nature et de sa gravité, faire l'objet de l'une des sanctions suivantes, par ordre croissant :</p>
  <ul>
    <li>Avertissement écrit ;</li>
    <li>Blâme ;</li>
    <li>Exclusion définitive de la formation.</li>
  </ul>
  <p>Aucune sanction ne peut être infligée sans que le stagiaire n'ait été informé des griefs retenus contre lui et mis en mesure de présenter ses observations.</p>

  <h2>Article 4 – Organisation de la formation</h2>
  <p>La formation est dispensée en présentiel intra-entreprise, sur 3 jours consécutifs (21 heures, 7h/jour, horaires 09h00–12h30 / 14h00–17h30), selon un planning et des horaires communiqués préalablement au stagiaire par convocation ou par transmission du programme.</p>
  <p>Le stagiaire s'engage à :</p>
  <ul>
    <li>Se présenter aux sessions aux horaires prévus ;</li>
    <li>Émarger les feuilles de présence à chaque demi-journée ;</li>
    <li>Informer l'organisme de formation et son responsable hiérarchique en cas de retard, d'absence ou de difficulté empêchant sa participation.</li>
  </ul>

  <h2>Article 5 – Hygiène, sécurité et environnement de travail</h2>
  <p>Chaque stagiaire est tenu de respecter les consignes générales et particulières d'hygiène et de sécurité en vigueur sur le lieu de formation, notamment celles propres à l'établissement hôtelier.</p>
  <p>Il est interdit de participer à la formation dans des conditions susceptibles de nuire à la concentration ou à la sécurité (consommation d'alcool, de substances interdites, environnement inadapté).</p>
  <p>Tout incident survenu durant une session de formation doit être signalé sans délai à l'organisme de formation et au responsable de l'établissement.</p>

  <h2>Article 6 – Tenue, comportement et assiduité</h2>
  <p>Les stagiaires sont tenus d'adopter une tenue et un comportement corrects, compatibles avec un cadre professionnel hôtelier.</p>
  <p>L'assiduité aux sessions est obligatoire. Toute absence ou retard doit être justifié auprès de ${FORMAT_SPHERE_ORG.nom} dans les meilleurs délais.</p>
  <p>Le non-respect répété des horaires ou des obligations d'assiduité peut entraîner des sanctions disciplinaires.</p>

  <h2>Article 7 – Usage du matériel et des supports pédagogiques</h2>
  <p>Les supports pédagogiques, documents et outils remis durant la formation sont strictement réservés à un usage personnel dans le cadre de la formation.</p>
  <p>Il est interdit de modifier, copier, transmettre ou exploiter ces contenus sans l'autorisation écrite de l'organisme de formation.</p>

  <h2>Article 8 – Enregistrements et captations</h2>
  <p>Sauf autorisation expresse et écrite de ${FORMAT_SPHERE_ORG.nom}, il est strictement interdit d'enregistrer, de filmer ou de diffuser les sessions de formation, y compris les échanges entre participants.</p>

  <h2>Article 9 – Propriété intellectuelle</h2>
  <p>L'ensemble des supports pédagogiques remis ou accessibles durant la formation est protégé par le droit d'auteur. Ils ne peuvent être utilisés que pour un usage strictement personnel et ne peuvent faire l'objet d'aucune reproduction ou diffusion sans autorisation.</p>

  <h2>Article 10 – Responsabilité</h2>
  <p>L'organisme de formation ne saurait être tenu responsable des dommages, pertes ou vols de biens personnels du stagiaire survenus lors de la formation.</p>

  <p style="margin-top:18px;">Un exemplaire du présent règlement intérieur est remis au stagiaire avant toute inscription définitive à la formation.</p>

  <p style="margin-top:18px;"><strong>Fait le :</strong> ${formatDateLong(dateRI)}</p>

  ${stampsBlock(e, customFsStamp)}

  ${stagiaire ? `<p style="margin-top:20px;"><strong>Pour le bénéficiaire :</strong><br/>${civilite}<br/>
  <span style="display:inline-block; border-bottom:1px solid #888; width:300px; height:40px;"></span></p>` : ""}

  ${footer()}
  </body></html>`;
}

/** Build a stamps signature block (FORMAT SPHERE + hotel) used in all PDFs */
export function stampsBlock(e: BahoEntreprise, customFsStamp?: string): string {
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
  const dateConv = subtractWorkingDays(e.dateDebut, 14);
  const civiliteForStg = (s: BahoStagiaire) => {
    const prenomsM = ["Taha", "Mathis", "Roland", "Mohamed", "Ahmed", "Karim", "Said", "Hassan", "Yann", "Pierre", "Jean", "Paul", "Marc", "Luc"];
    const isM = prenomsM.some((p) => s.prenom?.toLowerCase().startsWith(p.toLowerCase()));
    return isM ? "M." : "Mme";
  };

  const participantsList = e.stagiaires
    .map((s) => `<li><strong>${civiliteForStg(s)} ${s.nom.toUpperCase()} ${s.prenom}</strong>${s.emploi ? ` – ${s.emploi}` : ""}</li>`)
    .join("");

  const nbHeures = 21;
  const totalHt = 2000;

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
  <p>L'Organisme s'engage à organiser une action de formation intitulée :<br/>
  « <strong>Structuration des pratiques opérationnelles, amélioration de l'expérience client et sécurisation des points critiques d'exploitation en établissement hôtelier et de restauration</strong> »</p>

  <p class="article-title">Article 2 – Modalités</p>
  <p><strong>Dates :</strong> du ${formatDateLong(e.dateDebut)} au ${formatDateLong(e.dateFin)}<br/>
  <strong>Durée :</strong> ${nbHeures} heures (3 jours consécutifs, 7h/jour)<br/>
  <strong>Horaires :</strong> 09h00 – 12h30 / 14h00 – 17h30<br/>
  <strong>Lieu :</strong> ${e.adresse}<br/>
  <strong>Modalité :</strong> Formation en présentiel intra-entreprise</p>

  <p class="article-title">Article 3 – Participants</p>
  <ul class="participants">
    ${participantsList}
  </ul>

  <p class="article-title">Article 4 – Tarif et financement</p>
  <p><strong>Forfait par établissement HT :</strong> ${totalHt.toLocaleString("fr-FR")} €<br/>
  <strong>Nombre de stagiaires couverts :</strong> ${e.stagiaires.length}<br/>
  TVA non applicable, art. 261-4-4° a du CGI<br/>
  <strong>Total TTC :</strong> ${totalHt.toLocaleString("fr-FR")} €</p>

  <p class="article-title">Article 5 – Modalités de règlement</p>
  <p>Règlement à 30 jours date de facture, par virement bancaire à réception de la facture émise à l'issue de la formation.</p>

  <p class="article-title">Article 6 – Dédit ou abandon</p>
  <p>En cas d'annulation par le Bénéficiaire moins de 14 jours avant le début de la formation, 50 % du montant total sera dû à titre de dédit. En cas d'absence du stagiaire, l'intégralité du coût pédagogique reste due.</p>

  <p class="article-title">Article 7 – Différends éventuels</p>
  <p>Si une contestation ou un différend ne peuvent être réglés à l'amiable, le Tribunal compétent du ressort du siège social de l'Organisme sera seul compétent.</p>

  <p style="margin-top:25px;">Fait à ${e.adresse.split(" ").slice(-1)[0] || FORMAT_SPHERE_ORG.ville}, en double exemplaire, le ${formatDateLong(dateConv)}</p>

  ${stampsBlock(e, customFsStamp)}

  ${footer()}
  </body></html>`;
}

export function getCGVHTML(e: BahoEntreprise, customFsStamp?: string): string {
  const dateCgv = subtractWorkingDays(e.dateDebut, 14);
  const orgNom = FORMAT_SPHERE_ORG.nom;
  const orgAdr = `${FORMAT_SPHERE_ORG.adresse}, ${FORMAT_SPHERE_ORG.codePostal} ${FORMAT_SPHERE_ORG.ville}`;
  const orgMail = FORMAT_SPHERE_ORG.email;
  const orgTel = FORMAT_SPHERE_ORG.telephone;
  const orgSiret = FORMAT_SPHERE_ORG.siret;
  const orgSiren = orgSiret.replace(/\s/g, "").slice(0, 9);

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}</head><body>
  ${header()}
  <h1>CONDITIONS GÉNÉRALES DE VENTES</h1>
  <p style="text-align:center;"><strong>Effectué le :</strong> ${formatDateLong(dateCgv)}</p>

  <p>Les présentes conditions générales de vente régissent :</p>
  <p>– D'une part, les ventes effectuées par <strong>${orgNom}</strong>, organisme de formation enregistré sous le numéro de SIRET ${orgSiret} / SIREN ${orgSiren}, et domicilié au ${orgAdr}.</p>
  <p>Les coordonnées de <strong>${orgNom}</strong> sont les suivantes :<br/>
  Mail : ${orgMail} – Tél : ${orgTel}</p>
  <p>– Et d'autre part, l'achat effectué par toute personne physique ou morale, dénommée ci-après « le client » ou « l'acheteur ».</p>

  <h2>ARTICLE 1 – OBJET</h2>
  <p>Les présentes conditions de vente visent à définir les relations contractuelles entre ${orgNom} et l'acheteur ainsi que les conditions applicables à tout achat effectué auprès de l'organisme, que l'acheteur soit professionnel ou consommateur.</p>
  <p>L'acquisition d'une prestation de formation implique une acceptation sans réserve par l'acheteur des présentes conditions de vente.</p>
  <p>Ces conditions de vente prévaudront sur toutes autres conditions générales ou particulières non expressément agréées par ${orgNom}. Ce dernier se réserve le droit de pouvoir modifier ses conditions de vente à tout moment. Dans ce cas, les conditions applicables seront celles en vigueur à la date de la commande par l'acheteur.</p>

  <h2>ARTICLE 2 – CARACTÉRISTIQUES DES BIENS ET SERVICES PROPOSÉS</h2>
  <p>Les produits et services offerts sont ceux qui figurent au sein du catalogue publié par ${orgNom}. Chaque produit est accompagné d'un descriptif établi par le centre de formation.</p>

  <h2>ARTICLE 3 – TARIFS</h2>
  <p>Les prix figurant dans le catalogue sont indiqués en euros. ${orgNom} se réserve le droit de modifier ses prix à tout moment, étant toutefois entendu que le prix figurant au catalogue le jour de la commande sera le seul applicable à l'acheteur.</p>
  <p>Les prix indiqués comprennent les frais de traitement de commandes. Toutes les commandes quelle que soit leur origine sont payables en euros.</p>
  <p>Les prestations ne peuvent être réalisées que lors du paiement intégral du prix.</p>

  <h2>ARTICLE 4 – COMMANDES</h2>
  <p>Toute commande passée auprès de ${orgNom} suppose l'adhésion aux présentes Conditions Générales. Toute confirmation de commande entraîne acceptation et pleine adhésion aux présentes Conditions Générales, sans exception ni réserve.</p>
  <p>L'acheteur, qui souhaite acheter une prestation, doit obligatoirement :</p>
  <ul>
    <li>Remplir la fiche d'identification sur laquelle il indiquera toutes les coordonnées demandées ;</li>
    <li>Remplir le bon de commande en donnant toutes les références de la prestation choisie ;</li>
    <li>Valider sa commande après l'avoir vérifiée ;</li>
    <li>Effectuer le paiement dans les conditions prévues ;</li>
    <li>Confirmer sa commande et son règlement.</li>
  </ul>
  <p>L'ensemble des données fournies et la confirmation enregistrée vaudront preuve de la transaction. La confirmation vaudra signature et acceptation des opérations effectuées.</p>

  <h2>ARTICLE 5 – PAIEMENT ET MODALITÉS DE PAIEMENT</h2>
  <p>La validation d'une commande par l'acheteur implique le paiement du prix indiqué. Le règlement des achats peut s'effectuer par virement bancaire ou tout autre moyen sécurisé mis en place par ${orgNom}.</p>

  <h2>ARTICLE 6 – RÉTRACTATION</h2>
  <p>Conformément aux dispositions de l'article L.121-21 du Code de la consommation, il est possible de bénéficier d'un délai de rétractation de 14 jours à compter de la signature, sans avoir à justifier de motifs ni à payer de pénalité.</p>
  <p>Le délai légal de rétractation de 14 jours ne s'applique pas dès lors que la mise en œuvre du service a commencé.</p>

  <h2>ARTICLE 7 – RÉSILIATION</h2>
  <p>Le client peut mettre fin à son inscription à ${orgNom} à tout moment, sans frais et sans motif. Aucun remboursement ne pourra avoir lieu pour les prestations achetées et déjà débutées.</p>

  <h2>ARTICLE 8 – LIVRAISONS</h2>
  <p>Le client peut accéder à ses prestations selon les modalités définies dans la convention de formation. Si toutefois le client rencontre un problème, il peut contacter le service client à l'adresse suivante : ${orgMail}.</p>

  <h2>ARTICLE 9 – RESPONSABILITÉ</h2>
  <p>Le vendeur n'est tenu que par une obligation de moyens ; sa responsabilité ne pourra être engagée pour un dommage résultant de l'utilisation du réseau Internet tel que perte de données, intrusion, virus, piratage, rupture du service, ou autres problèmes involontaires.</p>

  <h2>ARTICLE 10 – DONNÉES À CARACTÈRE PERSONNEL</h2>
  <p>Conformément à la loi relative à l'informatique, aux fichiers et aux libertés du 6 janvier 1978 et au RGPD, les informations à caractère nominatif relatives aux acheteurs pourront faire l'objet d'un traitement automatisé.</p>
  <p>Les clients peuvent s'opposer à la divulgation de leurs coordonnées en le signalant à ${orgNom}. De même, les utilisateurs disposent d'un droit d'accès et de rectification des données les concernant.</p>

  <h2>ARTICLE 11 – ARCHIVAGE / PREUVE</h2>
  <p>${orgNom} archive les bons de commandes et factures au sein d'un support fiable et durable, constituant une copie fidèle, conformément aux dispositions de l'article 1348 du Code civil.</p>
  <p>Les registres informatisés de ${orgNom} seront considérés par toutes les parties comme preuve des communications, commandes, paiements et transactions intervenus entre les parties.</p>

  <h2>ARTICLE 12 – PROPRIÉTÉ INTELLECTUELLE</h2>
  <p>Tous les produits et services offerts par ${orgNom} sont destinés à un usage privé. Tous sont la propriété intellectuelle de ${orgNom}. Toute reproduction ou diffusion totale ou partielle des produits et services proposés à des tiers est interdite, sauf en cas d'autorisation préalable écrite.</p>
  <p>Il est interdit de supprimer les mentions de copyrights, de marque ou de toute autre mention légale sur les contenus proposés par ${orgNom}.</p>

  <h2>ARTICLE 13 – DROIT APPLICABLE EN CAS DE LITIGE</h2>
  <p>La langue du présent contrat est la langue française. Les présentes conditions de vente sont soumises à la loi française. En cas de litige, les tribunaux français seront les seuls compétents.</p>

  <p style="margin-top:30px;"><strong>Pour le bénéficiaire :</strong> ${e.nom}<br/>
  Représenté par ${e.dirigeant}</p>

  <p style="margin-top:10px;"><strong>Pour l'organisme :</strong> ${orgNom}</p>

  ${stampsBlock(e, customFsStamp)}

  ${footer()}
  </body></html>`;
}

export function getFactureHTML(e: BahoEntreprise, numero: string, customFsStamp?: string): string {
  const nbStagiaires = e.stagiaires.length;
  const total = 2000;

  const civiliteForStg = (s: BahoStagiaire) => {
    const prenomsM = ["Taha", "Mathis", "Roland", "Mohamed", "Ahmed", "Karim", "Said", "Hassan", "Yann", "Pierre", "Jean", "Paul", "Marc", "Luc"];
    const isM = prenomsM.some((p) => s.prenom?.toLowerCase().startsWith(p.toLowerCase()));
    return isM ? "M." : "Mme";
  };

  const participantsRows = e.stagiaires
    .map(
      (s, idx) => `
    <tr>
      <td style="text-align:center; width:40px;">${idx + 1}</td>
      <td>${civiliteForStg(s)} ${s.nom.toUpperCase()} ${s.prenom}</td>
      <td>${s.emploi || "—"}</td>
      <td style="text-align:center;">${s.codeStagiaire}</td>
    </tr>`
    )
    .join("");

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
  <strong>Période de formation :</strong> du ${formatDateLong(e.dateDebut)} au ${formatDateLong(e.dateFin)}<br/>
  <strong>Modalité :</strong> Formation en <strong>présentiel</strong> intra-entreprise</p>

  <h2>Détail de la prestation</h2>
  <table>
    <thead>
      <tr><th>Désignation</th><th style="width:120px;">Forfait HT</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>Structuration des pratiques opérationnelles et qualité de service en hôtellerie & restauration<br/>
        <em>Formation en <strong>présentiel</strong> intra-entreprise – 21 heures sur 3 jours</em><br/>
        <em>Forfait par établissement (${nbStagiaires} stagiaire${nbStagiaires > 1 ? "s" : ""} couvert${nbStagiaires > 1 ? "s" : ""})</em><br/>
        <em>Période : ${formatDateLong(e.dateDebut)} → ${formatDateLong(e.dateFin)}</em></td>
        <td>${total.toLocaleString("fr-FR")} €</td>
      </tr>
      <tr class="total-row">
        <td style="text-align:right;">Total HT</td>
        <td>${total.toLocaleString("fr-FR")} €</td>
      </tr>
      <tr class="total-row">
        <td style="text-align:right;">TVA (exonérée art. 261-4-4° a CGI)</td>
        <td>0,00 €</td>
      </tr>
      <tr class="total-row">
        <td style="text-align:right;">Total TTC</td>
        <td>${total.toLocaleString("fr-FR")} €</td>
      </tr>
    </tbody>
  </table>

  <h2>Participants couverts par la présente facture</h2>
  <table>
    <thead>
      <tr>
        <th style="width:40px; text-align:center;">N°</th>
        <th>Nom et prénom</th>
        <th>Fonction</th>
        <th style="width:140px; text-align:center;">Code stagiaire</th>
      </tr>
    </thead>
    <tbody>
      ${participantsRows}
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

/** Convocation individuelle par stagiaire — datée 14 jours ouvrés avant le début */
export function getConvocationHTML(e: BahoEntreprise, stagiaire: BahoStagiaire, customFsStamp?: string): string {
  const dateConvoc = subtractWorkingDays(e.dateDebut, 14);
  const civilite = (() => {
    const prenomsM = ["Taha", "Mathis", "Roland", "Mohamed", "Ahmed", "Karim", "Said", "Hassan", "Yann", "Pierre", "Jean", "Paul", "Marc", "Luc"];
    const isM = prenomsM.some((p) => stagiaire.prenom?.toLowerCase().startsWith(p.toLowerCase()));
    return isM ? "M." : "Mme";
  })();
  const fullName = `${civilite} ${stagiaire.nom.toUpperCase()} ${stagiaire.prenom}`;
  const politesse = civilite === "M." ? "Monsieur" : "Madame";

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}</head><body>
  ${header()}
  <h1>CONVOCATION À LA FORMATION</h1>
  <p style="text-align:right; font-size:10pt; color:#555;">${FORMAT_SPHERE_ORG.ville}, le ${formatDateLong(dateConvoc)}</p>

  <p><strong>Destinataire :</strong><br/>
  ${fullName}${stagiaire.emploi ? ` – ${stagiaire.emploi}` : ""}<br/>
  ${stagiaire.adresse}</p>

  <p><strong>Objet :</strong> Convocation à l'action de formation « Structuration des pratiques opérationnelles et qualité de service en hôtellerie & restauration »</p>

  <p>${politesse},</p>

  <p>Nous avons le plaisir de vous convoquer à l'action de formation organisée par <strong>${FORMAT_SPHERE_ORG.nom}</strong> au sein de l'établissement <strong>${e.nom}</strong>, dans les conditions suivantes :</p>

  <table style="margin:14px 0;">
    <tbody>
      <tr><th style="width:35%;">Intitulé de la formation</th><td>Structuration des pratiques opérationnelles, amélioration de l'expérience client et sécurisation des points critiques d'exploitation en établissement hôtelier et de restauration</td></tr>
      <tr><th>Modalité</th><td><strong>Formation en présentiel intra-entreprise</strong></td></tr>
      <tr><th>Lieu de formation</th><td>${e.nom} – ${e.adresse}</td></tr>
      <tr><th>Dates</th><td>Du ${formatDateLong(e.dateDebut)} au ${formatDateLong(e.dateFin)} (3 jours consécutifs)</td></tr>
      <tr><th>Horaires</th><td>09h00 – 12h30 / 14h00 – 17h30 (pause déjeuner de 12h30 à 14h00)</td></tr>
      <tr><th>Durée totale</th><td>21 heures</td></tr>
      <tr><th>Formateur</th><td>Paolo FEOLA</td></tr>
      <tr><th>Code stagiaire</th><td>${stagiaire.codeStagiaire}</td></tr>
    </tbody>
  </table>

  <h2>Documents et consignes</h2>
  <ul>
    <li>Merci de vous présenter <strong>10 minutes avant le début</strong> de la première demi-journée.</li>
    <li>Une feuille d'émargement devra être signée à chaque demi-journée.</li>
    <li>Le règlement intérieur et le programme de la formation vous ont été transmis préalablement.</li>
    <li>Tenue de travail correcte et adaptée à l'environnement hôtelier exigée.</li>
    <li>En cas d'empêchement, merci d'informer sans délai l'organisme de formation et votre responsable hiérarchique.</li>
  </ul>

  <h2>Accessibilité – Référent handicap</h2>
  <p>Si vous avez besoin d'un aménagement particulier (situation de handicap, besoin spécifique), vous pouvez contacter notre référent handicap : <strong>${FORMAT_SPHERE_ORG.dirigeant}</strong> – ${FORMAT_SPHERE_ORG.email} – ${FORMAT_SPHERE_ORG.telephone}.</p>

  <p>Nous vous remercions de votre participation et restons à votre disposition pour toute question relative à l'organisation de cette action de formation.</p>

  <p style="margin-top:18px;">Veuillez agréer, ${politesse}, l'expression de nos salutations distinguées.</p>

  <table style="margin-top:25px; border:none; width:100%;">
    <tr style="border:none;">
      <td style="border:none; width:100%; text-align:center; vertical-align:top;">
        <strong>Pour l'organisme de formation</strong><br/>
        ${FORMAT_SPHERE_ORG.dirigeant}<br/>
        <em>${FORMAT_SPHERE_ORG.nom}</em><br/>
        <img src="${customFsStamp || svgToDataUri(getFormatSphereStampSvg())}" alt="Tampon FORMAT SPHERE" style="width:150px; height:150px; margin-top:8px;"/>
      </td>
    </tr>
  </table>

  ${footer()}
  </body></html>`;
}

/** Certificat de réalisation individuel par stagiaire — daté du dernier jour de formation */
export function getCertificatRealisationHTML(e: BahoEntreprise, stagiaire: BahoStagiaire, customFsStamp?: string): string {
  const civilite = (() => {
    const prenomsM = ["Taha", "Mathis", "Roland", "Mohamed", "Ahmed", "Karim", "Said", "Hassan", "Yann", "Pierre", "Jean", "Paul", "Marc", "Luc"];
    const isM = prenomsM.some((p) => stagiaire.prenom?.toLowerCase().startsWith(p.toLowerCase()));
    return isM ? "M." : "Mme";
  })();
  const fullName = `${civilite} ${stagiaire.nom.toUpperCase()} ${stagiaire.prenom}`;
  const neLe = stagiaire.dateNaissance ? formatDateLong(stagiaire.dateNaissance) : "";
  const lieuNaiss = stagiaire.lieuNaissance || "";

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}
  <style>
    body { padding: 20px 30px !important; font-size: 10.5pt !important; line-height: 1.35 !important; }
    h1 { margin: 8px 0 4px 0 !important; }
    .certif-box { border: 1.5px solid #1a3a6e; padding: 10px 16px; margin: 10px 0; background: #fafcff; }
    .certif-box p { margin: 4px 0; }
    .certif-name { font-size: 13pt; font-weight: bold; color: #1a3a6e; text-align: center; margin: 6px 0 2px 0; }
    .certif-intitule { font-style: italic; text-align: center; color: #333; margin: 4px 0 8px 0; font-size: 10pt; }
    .certif-box table { margin: 6px 0 !important; }
    .certif-box table th, .certif-box table td { padding: 3px 6px !important; font-size: 9.5pt !important; }
    .stamps-tight { margin-top: 12px !important; }
    .stamps-tight img { width: 120px !important; height: 120px !important; margin-top: 4px !important; }
  </style>
  </head><body>
  ${header()}
  <h1 style="text-align:center;">CERTIFICAT DE RÉALISATION</h1>
  <p style="text-align:center; font-size:9pt; color:#555; margin:2px 0 6px 0;">Article L.6353-1 du Code du travail – Décret n° 2019-1143 du 7 novembre 2019</p>

  <div class="certif-box">
    <p>Je soussigné, <strong>${FORMAT_SPHERE_ORG.dirigeant}</strong>, représentant légal de l'organisme de formation <strong>${FORMAT_SPHERE_ORG.nom}</strong> (SIRET ${FORMAT_SPHERE_ORG.siret} – NDA ${FORMAT_SPHERE_ORG.nda}), certifie que :</p>

    <p class="certif-name">${fullName}</p>
    ${neLe || lieuNaiss ? `<p style="text-align:center; margin:2px 0;">${neLe ? `né(e) le ${neLe}` : ""}${neLe && lieuNaiss ? " à " : ""}${lieuNaiss}</p>` : ""}
    <p style="text-align:center; margin:2px 0;">salarié(e) de l'entreprise <strong>${e.nom}</strong> (SIRET ${e.siret})</p>

    <p style="margin-top:8px;">a suivi l'action de formation intitulée :</p>
    <p class="certif-intitule">« Structuration des pratiques opérationnelles, amélioration de l'expérience client et sécurisation des points critiques d'exploitation en établissement hôtelier et de restauration »</p>

    <table>
      <tbody>
        <tr><th style="width:38%;">Nature de l'action</th><td>Action de formation (art. L.6313-1, 1° du Code du travail)</td></tr>
        <tr><th>Modalité de réalisation</th><td><strong>Formation en présentiel intra-entreprise</strong></td></tr>
        <tr><th>Lieu de réalisation</th><td>${e.nom} – ${e.adresse}</td></tr>
        <tr><th>Dates de réalisation</th><td>Du ${formatDateLong(e.dateDebut)} au ${formatDateLong(e.dateFin)}</td></tr>
        <tr><th>Durée totale réalisée</th><td>21 heures (3 jours consécutifs, 7h/jour)</td></tr>
        <tr><th>Assiduité</th><td>Présence intégrale constatée par émargement</td></tr>
        <tr><th>Objectifs atteints</th><td>Oui — évaluation des acquis validée par le formateur</td></tr>
        <tr><th>Formateur</th><td>Paolo FEOLA</td></tr>
        <tr><th>Code stagiaire</th><td>${stagiaire.codeStagiaire}</td></tr>
      </tbody>
    </table>

    <p style="margin-top:6px;">Le présent certificat est délivré pour servir et valoir ce que de droit, conformément aux dispositions réglementaires en vigueur.</p>
  </div>

  <p style="margin:8px 0;">Fait à ${FORMAT_SPHERE_ORG.ville}, le ${formatDateLong(e.dateFin)}</p>

  <div class="stamps-tight">
    <table style="border:none; width:100%;">
      <tr style="border:none;">
        <td style="border:none; width:100%; text-align:center; vertical-align:top;">
          <strong>Pour l'organisme de formation</strong><br/>
          ${FORMAT_SPHERE_ORG.dirigeant}<br/>
          <em>${FORMAT_SPHERE_ORG.nom}</em><br/>
          <img src="${customFsStamp || svgToDataUri(getFormatSphereStampSvg())}" alt="Tampon FORMAT SPHERE"/>
        </td>
      </tr>
    </table>
  </div>

  ${footer()}
  </body></html>`;
}

export function getDevisHTML(e: BahoEntreprise, numero: string, customFsStamp?: string): string {
  const nbStagiaires = e.stagiaires.length;
  const total = 2000;
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
      <tr><th>Désignation</th><th style="width:120px;">Forfait HT</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>Structuration des pratiques opérationnelles et qualité de service en hôtellerie & restauration<br/>
        <em>Formation en présentiel intra-entreprise – 21 heures sur 3 jours</em><br/>
        <em>Forfait par établissement (${nbStagiaires} stagiaire${nbStagiaires > 1 ? "s" : ""} couvert${nbStagiaires > 1 ? "s" : ""})</em><br/>
        <em>Période : ${formatDateLong(e.dateDebut)} → ${formatDateLong(e.dateFin)}</em></td>
        <td>${total.toLocaleString("fr-FR")} €</td>
      </tr>
      <tr class="total-row">
        <td style="text-align:right;">Total HT</td>
        <td>${total.toLocaleString("fr-FR")} €</td>
      </tr>
      <tr class="total-row">
        <td style="text-align:right;">TVA (exonérée art. 261-4-4° a CGI)</td>
        <td>0,00 €</td>
      </tr>
      <tr class="total-row">
        <td style="text-align:right;">Total TTC</td>
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

  ${footer()}
  </body></html>`;
}

/** Calcule les 3 jours consécutifs de formation à partir d'une date de début (saute weekends + fériés) */
export function getThreeWorkingDays(startIso: string): string[] {
  if (!startIso) return ["", "", ""];
  const d = new Date(startIso);
  if (isNaN(d.getTime())) return ["", "", ""];
  const out: string[] = [];
  let holidays = getFrenchHolidays(d.getUTCFullYear());
  let safety = 0;
  while (out.length < 3 && safety < 30) {
    const day = d.getUTCDay();
    const iso10 = d.toISOString().slice(0, 10);
    if (d.getUTCFullYear() !== Number(iso10.slice(0, 4))) {
      holidays = getFrenchHolidays(d.getUTCFullYear());
    }
    if (day !== 0 && day !== 6 && !holidays.has(iso10)) {
      out.push(iso10);
    }
    d.setUTCDate(d.getUTCDate() + 1);
    safety++;
  }
  while (out.length < 3) out.push("");
  return out;
}

/** Feuille d'émargement individuelle par stagiaire — 3 jours × 2 demi-journées */
export function getEmargementHTML(
  e: BahoEntreprise,
  stagiaire: BahoStagiaire,
  customFsStamp?: string,
  overrideStart?: string,
  overrideEnd?: string
): string {
  const startIso = overrideStart || e.dateDebut;
  const days = getThreeWorkingDays(startIso);
  const civilite = (() => {
    const prenomsM = ["Taha", "Mathis", "Roland", "Mohamed", "Ahmed", "Karim", "Said", "Hassan", "Yann", "Pierre", "Jean", "Paul", "Marc", "Luc"];
    const isM = prenomsM.some((p) => stagiaire.prenom?.toLowerCase().startsWith(p.toLowerCase()));
    return isM ? "M." : "Mme";
  })();
  const fullName = `${civilite} ${stagiaire.nom.toUpperCase()} ${stagiaire.prenom}`;

  const rows = days
    .map((iso, idx) => {
      const dateLabel = iso ? formatDateLong(iso) : `Jour ${idx + 1}`;
      return `
        <tr>
          <td rowspan="2" style="text-align:center; font-weight:bold; background:#f6f8fc;">Jour ${idx + 1}<br/><span style="font-weight:normal; font-size:10pt;">${dateLabel}</span></td>
          <td style="text-align:center;">Matin<br/><em>09h00 – 12h30</em></td>
          <td style="height:42px;"></td>
          <td style="height:42px;"></td>
        </tr>
        <tr>
          <td style="text-align:center;">Après-midi<br/><em>14h00 – 17h30</em></td>
          <td style="height:42px;"></td>
          <td style="height:42px;"></td>
        </tr>`;
    })
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}
  <style>
    .emarg-info { margin-bottom: 12px; font-size: 11pt; }
    .emarg-table th { background: #1a3a6e; color: #fff; text-align: center; }
    .emarg-table td { vertical-align: middle; }
  </style>
  </head><body>
  ${header()}
  <h1>FEUILLE D'ÉMARGEMENT</h1>
  <p style="text-align:center; font-style:italic; color:#555;">Action de formation en présentiel intra-entreprise – 21 heures sur 3 jours</p>

  <div class="emarg-info">
    <p><strong>Intitulé :</strong> Structuration des pratiques opérationnelles, amélioration de l'expérience client et sécurisation des points critiques d'exploitation en établissement hôtelier et de restauration<br/>
    <strong>Organisme :</strong> ${FORMAT_SPHERE_ORG.nom} – SIRET ${FORMAT_SPHERE_ORG.siret} – NDA ${FORMAT_SPHERE_ORG.nda}<br/>
    <strong>Bénéficiaire (entreprise) :</strong> ${e.nom} – SIRET ${e.siret}<br/>
    <strong>Lieu de formation :</strong> ${e.adresse}<br/>
    <strong>Formateur :</strong> Paolo FEOLA</p>

    <p><strong>Stagiaire :</strong> ${fullName}${stagiaire.emploi ? ` – ${stagiaire.emploi}` : ""}<br/>
    <strong>Code stagiaire :</strong> ${stagiaire.codeStagiaire}<br/>
    <strong>Période individuelle :</strong> du ${formatDateLong(days[0] || startIso)} au ${formatDateLong(days[2] || overrideEnd || e.dateFin)}</p>
  </div>

  <table class="emarg-table">
    <thead>
      <tr>
        <th style="width:20%;">Date</th>
        <th style="width:20%;">Demi-journée</th>
        <th style="width:30%;">Signature stagiaire</th>
        <th style="width:30%;">Signature formateur</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>

  <p style="margin-top:20px; font-size:10pt;"><em>Le stagiaire et le formateur s'engagent à signer chaque demi-journée effectivement réalisée. Toute absence ou retard doit être justifié auprès de l'organisme de formation.</em></p>

  <p style="margin-top:18px;"><strong>Fait à ${e.adresse.split(" ").slice(-1)[0] || FORMAT_SPHERE_ORG.ville}, le ${formatDateLong(days[0] || startIso)}</strong></p>

  ${stampsBlock(e, customFsStamp)}

  ${footer()}
  </body></html>`;
}

/** Programme de formation officiel BAHO – Format Sphere */
export function getProgrammeHTML(e: BahoEntreprise, customFsStamp?: string): string {
  const dateProg = subtractWorkingDays(e.dateDebut, 14);
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}
  <style>
    .day-block { margin-top: 16px; padding: 10px 14px; border-left: 4px solid #1a3a6e; background: #f6f8fc; }
    .day-block h3 { color: #1a3a6e; margin: 0 0 6px 0; }
    .demi { margin-top: 8px; }
    .demi strong { color: #1a3a6e; }
    ul { margin: 4px 0 8px 22px; }
  </style>
  </head><body>
  ${header()}
  <h1>PROGRAMME DE FORMATION</h1>

  <h2>Intitulé de l'action de formation</h2>
  <p><strong>Structuration des pratiques opérationnelles, amélioration de l'expérience client et sécurisation des points critiques d'exploitation en établissement hôtelier et de restauration</strong></p>

  <p><strong>Bénéficiaire :</strong> ${e.nom} – SIRET ${e.siret}<br/>
  <strong>Lieu :</strong> ${e.adresse}<br/>
  <strong>Référent handicap :</strong> ${FORMAT_SPHERE_ORG.dirigeant}</p>

  <h2>Contexte et finalité de l'action</h2>
  <p>Cette action de formation vise à améliorer l'organisation du travail et la coordination des équipes au sein des établissements hôteliers et de restauration. Elle permet aux salariés de renforcer leurs pratiques professionnelles, de limiter les dysfonctionnements organisationnels, d'améliorer la qualité de service et de contribuer à la satisfaction et à la fidélisation de la clientèle.</p>
  <p>L'action est mise en œuvre comme une action de formation en présentiel, centrée sur l'acquisition de compétences professionnelles transférables dans l'activité quotidienne.</p>

  <h2>Objectif général</h2>
  <p>Permettre aux participants de structurer leurs pratiques professionnelles, d'améliorer la coordination entre services et de sécuriser les situations ayant un impact sur l'expérience client et le bon fonctionnement de l'établissement.</p>

  <h2>Objectifs pédagogiques</h2>
  <p>À l'issue de la formation, les participants seront capables de :</p>
  <ul>
    <li>Identifier les rôles et interactions entre les services</li>
    <li>Repérer les dysfonctionnements organisationnels</li>
    <li>Appliquer des méthodes de travail structurées</li>
    <li>Fiabiliser la transmission des informations</li>
    <li>Adapter leur posture professionnelle aux situations sensibles</li>
    <li>Appliquer une méthode de traitement des réclamations clients</li>
    <li>Réagir de manière adaptée face aux incidents</li>
  </ul>

  <h2>Public visé</h2>
  <p>Personnel intervenant dans le fonctionnement d'un établissement hôtelier et de restauration : réception, hébergement, restauration, personnel administratif, encadrement de proximité.</p>

  <h2>Prérequis</h2>
  <ul>
    <li>Occuper un poste en lien avec l'activité de l'établissement</li>
    <li>Comprendre des consignes simples en français</li>
  </ul>

  <h2>Durée, organisation et modalités</h2>
  <ul>
    <li><strong>Durée totale :</strong> 21 heures</li>
    <li><strong>Organisation :</strong> 3 jours consécutifs</li>
    <li><strong>Horaires :</strong> 09h00 – 12h30 / 14h00 – 17h30</li>
    <li><strong>Durée quotidienne :</strong> 7 heures</li>
    <li><strong>Effectif :</strong> ${e.stagiaires.length} participant${e.stagiaires.length > 1 ? "s" : ""}</li>
    <li><strong>Modalité :</strong> formation en présentiel intra-entreprise</li>
    <li><strong>Lieu :</strong> au sein de l'établissement (${e.adresse})</li>
  </ul>

  <h2>Modalités d'accès et délais d'accès</h2>
  <p>Accès après validation du besoin, signature de la convention et accord de prise en charge.<br/>
  <strong>Délai d'accès :</strong> 15 jours après validation administrative.</p>

  <h2>Inscription CERES – Envoi des documents administratifs</h2>
  <p>L'inscription est confirmée par l'envoi au client de l'ensemble des documents administratifs suivants :</p>
  <ul>
    <li>Contrat de formation professionnelle</li>
    <li>Règlement intérieur</li>
    <li>Convocation à la formation</li>
    <li>Conditions Générales de Vente (CGV)</li>
    <li>Programme de formation</li>
    <li>ECF – Évaluation des Compétences en Fin de formation</li>
    <li>Demande d'acompte et confirmation de l'inscription</li>
  </ul>

  <h2>Moyens pédagogiques, techniques et encadrement</h2>
  <ul>
    <li>Supports pédagogiques structurés</li>
    <li>Études de cas issues du secteur hôtelier</li>
    <li>Exercices pratiques</li>
    <li>Mises en situation pédagogiques encadrées</li>
    <li>Échanges de pratiques</li>
  </ul>
  <p><strong>Formateur :</strong> Paolo FEOLA – Formateur en organisation du travail et communication professionnelle</p>

  <h2>Modalités de suivi, d'évaluation et de validation</h2>
  <ul>
    <li>Évaluation des connaissances en début de formation</li>
    <li>Évaluation des acquis tout au long de la formation</li>
    <li>Exercices pratiques</li>
    <li>Évaluation finale basée sur une mise en situation pédagogique</li>
    <li>Feuilles d'émargement par demi-journée</li>
    <li>Attestation de fin de formation</li>
  </ul>

  <h2>Accessibilité</h2>
  <p>Formation accessible aux personnes en situation de handicap sous réserve d'adaptation. Référent handicap : <strong>${FORMAT_SPHERE_ORG.dirigeant}</strong>.</p>

  <h2>Tarifs et financement</h2>
  <p><strong>Tarif :</strong> 2 000 € TTC<br/>
  TVA non applicable – article 261-4-4° du CGI</p>

  <h1 style="margin-top:30px;">CONTENU DÉTAILLÉ PAR JOURNÉE</h1>

  <div class="day-block">
    <h3>Jour 1 – Organisation et expérience client</h3>
    <div class="demi">
      <strong>Matin (09h00 – 12h30) — Objectifs : Comprendre l'organisation et ses impacts</strong>
      <p><em>Contenu :</em></p>
      <ul>
        <li>Organisation des services et répartition des rôles</li>
        <li>Identification des interactions entre services</li>
        <li>Parcours client et points de contact</li>
        <li>Identification des sources d'insatisfaction</li>
      </ul>
      <p><em>Méthodes :</em> apports structurés, études de cas, échanges dirigés.</p>
    </div>
    <div class="demi">
      <strong>Après-midi (14h00 – 17h30) — Objectifs : Identifier les dysfonctionnements</strong>
      <p><em>Contenu :</em></p>
      <ul>
        <li>Typologie des dysfonctionnements</li>
        <li>Analyse des impacts sur la qualité de service</li>
        <li>Transmission des informations entre services</li>
      </ul>
      <p><em>Méthodes :</em> études de cas, exercices pratiques, mise en application encadrée.</p>
    </div>
  </div>

  <div class="day-block">
    <h3>Jour 2 – Organisation du travail et méthodes</h3>
    <div class="demi">
      <strong>Matin (09h00 – 12h30) — Objectifs : Structurer le travail</strong>
      <p><em>Contenu :</em></p>
      <ul>
        <li>Organisation des tâches</li>
        <li>Priorisation des activités</li>
        <li>Gestion du temps</li>
      </ul>
      <p><em>Méthodes :</em> apports, exercices pratiques.</p>
    </div>
    <div class="demi">
      <strong>Après-midi (14h00 – 17h30) — Objectifs : Harmoniser les pratiques</strong>
      <p><em>Contenu :</em></p>
      <ul>
        <li>Méthodes de travail communes</li>
        <li>Standardisation des pratiques</li>
        <li>Application sur cas concrets</li>
      </ul>
      <p><em>Méthodes :</em> travail en groupe, études de cas, exercices pratiques.</p>
    </div>
  </div>

  <div class="day-block">
    <h3>Jour 3 – Communication et gestion des situations</h3>
    <div class="demi">
      <strong>Matin (09h00 – 12h30) — Objectifs : Améliorer la communication</strong>
      <p><em>Contenu :</em></p>
      <ul>
        <li>Transmission d'informations</li>
        <li>Coordination entre services</li>
        <li>Réduction des erreurs</li>
      </ul>
      <p><em>Méthodes :</em> exercices pratiques, études de cas.</p>
    </div>
    <div class="demi">
      <strong>Après-midi (14h00 – 17h30) — Objectifs : Gérer les situations sensibles</strong>
      <p><em>Contenu :</em></p>
      <ul>
        <li>Identification des situations d'insatisfaction</li>
        <li>Méthode de traitement des réclamations clients (4 étapes)</li>
        <li>Gestion des incidents</li>
        <li>Posture professionnelle</li>
      </ul>
      <p><em>Méthodes :</em> exercices pratiques, mises en situation pédagogiques encadrées.</p>
    </div>
  </div>

  <h2>Clôture de la formation</h2>
  <ul>
    <li>Synthèse des acquis</li>
    <li>Évaluation finale</li>
    <li>Identification des axes de progression</li>
  </ul>

  <p style="margin-top:25px;"><strong>Fait à ${FORMAT_SPHERE_ORG.ville}, le ${formatDateLong(dateProg)}</strong></p>

  ${stampsBlock(e, customFsStamp)}

  ${footer()}
  </body></html>`;
}
