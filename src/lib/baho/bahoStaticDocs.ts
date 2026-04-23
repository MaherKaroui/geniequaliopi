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
  <p style="text-align:center; font-style:italic; color:#555;">Action de Formation En Situation de Travail (AFEST) – Hôtellerie</p>

  <p><strong>Organisme de formation :</strong> ${FORMAT_SPHERE_ORG.nom}<br/>
  <strong>Bénéficiaire (entreprise) :</strong> ${e.nom} – SIRET ${e.siret}<br/>
  <strong>Lieu de formation :</strong> ${e.adresse}<br/>
  <strong>Date d'application :</strong> ${formatDateLong(dateRI)}</p>
  ${titreStagiaire}

  <h2>Article 1 – Objet et champ d'application</h2>
  <p>Le présent règlement est établi conformément aux dispositions des articles L.6352-3 et L.6352-4 ainsi que R.6352-1 à R.6352-15 du Code du travail.</p>
  <p>Il s'applique à l'ensemble des stagiaires inscrits à une formation dispensée en situation de travail (AFEST) au sein de l'établissement <strong>${e.nom}</strong> situé ${e.adresse}, pour toute la durée de ladite formation.</p>
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
  <p>Les formations sont dispensées en présentiel sur le site de l'entreprise (AFEST), selon un planning et des horaires communiqués préalablement au stagiaire par convocation ou par transmission du programme.</p>
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
  const dateConv = subtractWorkingDays(e.dateDebut, 14);
  const civiliteForStg = (s: BahoStagiaire) => {
    const prenomsM = ["Taha", "Mathis", "Roland", "Mohamed", "Ahmed", "Karim", "Said", "Hassan", "Yann", "Pierre", "Jean", "Paul", "Marc", "Luc"];
    const isM = prenomsM.some((p) => s.prenom?.toLowerCase().startsWith(p.toLowerCase()));
    return isM ? "M." : "Mme";
  };

  const participantsList = e.stagiaires
    .map((s) => `<li><strong>${civiliteForStg(s)} ${s.nom.toUpperCase()} ${s.prenom}</strong>${s.emploi ? ` – ${s.emploi}` : ""}</li>`)
    .join("");

  const nbHeures = 14;
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
  const prixUnitaire = 2000;
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
  const prixUnitaire = 2000;
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
