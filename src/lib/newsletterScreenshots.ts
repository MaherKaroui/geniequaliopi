// Generates realistic HTML "screenshots" of newsletter subscription forms
// as proof of veille activity for Qualiopi audits
import { OrganismeInfo, FormationInfo } from "@/types/qualiopi";
import { buildDocument, formatDate } from "./docBuilder";

function veilleDate(f: FormationInfo, monthsBefore: number): string {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() - monthsBefore);
  return formatDate(d.toISOString().split("T")[0]);
}

function shortDate(f: FormationInfo, monthsBefore: number): string {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() - monthsBefore);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

interface NewsletterDef {
  id: string;
  orgName: string;
  category: "réglementaire" | "métier" | "technologique" | "handicap";
  indicateur: number;
}

const NEWSLETTERS: NewsletterDef[] = [
  { id: "france_competences", orgName: "France Compétences", category: "réglementaire", indicateur: 23 },
  { id: "drieets", orgName: "DRIEETS", category: "réglementaire", indicateur: 23 },
  { id: "centre_inffo", orgName: "Centre Inffo", category: "réglementaire", indicateur: 23 },
  { id: "microsoft", orgName: "Microsoft Advertising", category: "technologique", indicateur: 25 },
  { id: "openai", orgName: "Open AI Digest", category: "technologique", indicateur: 25 },
  { id: "agefiph", orgName: "AGEFIPH", category: "handicap", indicateur: 26 },
];

function extractNomPrenom(dirigeant: string): { nom: string; prenom: string } {
  const parts = dirigeant.trim().split(/\s+/);
  if (parts.length >= 2) {
    return { prenom: parts[0], nom: parts.slice(1).join(" ") };
  }
  return { prenom: dirigeant, nom: "" };
}

function screenshotFranceCompetences(o: OrganismeInfo, f: FormationInfo): string {
  const { nom, prenom } = extractNomPrenom(o.dirigeant);
  const email = o.email || "contact@organisme.fr";
  return `
<div style="border:1px solid #ccc;border-radius:6px;padding:0;max-width:700px;margin:20px auto;font-family:Arial,sans-serif;background:#fff;overflow:hidden">
  <div style="background:#fff;padding:15px 20px;border-bottom:2px solid #003DA5;display:flex;align-items:center;gap:12px">
    <div style="display:flex;align-items:center;gap:8px">
      <div style="width:30px;height:30px;background:linear-gradient(135deg,#003DA5,#0055CC);border-radius:4px;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:10px">RF</div>
      <div style="display:flex;flex-direction:column">
        <span style="font-size:9px;color:#333;letter-spacing:1px">RÉPUBLIQUE</span>
        <span style="font-size:9px;color:#333;letter-spacing:1px">FRANÇAISE</span>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:6px;margin-left:15px">
      <div style="width:24px;height:24px;background:#003DA5;border-radius:50%"></div>
      <div style="width:24px;height:24px;background:#0077CC;border-radius:50%"></div>
      <div style="width:24px;height:24px;background:#00AACC;border-radius:50%"></div>
      <span style="font-weight:bold;color:#003DA5;font-size:14px;margin-left:4px">FRANCE<br/>compétences</span>
    </div>
  </div>
  <div style="padding:25px 30px">
    <p style="font-size:12px;color:#003DA5;margin-bottom:15px">Tous les champs sont obligatoires sauf ceux indiqués comme étant facultatifs</p>
    <div style="margin-bottom:12px"><div style="border:2px solid #E8730E;border-radius:20px;padding:10px 15px;font-size:14px;color:#333">${nom || "Nom"}</div></div>
    <div style="margin-bottom:12px"><div style="border:2px solid #E8730E;border-radius:20px;padding:10px 15px;font-size:14px;color:#333">${prenom || "Prénom"}</div></div>
    <div style="margin-bottom:12px"><div style="border:2px solid #E8730E;border-radius:20px;padding:10px 15px;font-size:14px;color:#333">${o.nom}</div></div>
    <div style="margin-bottom:12px"><div style="border:2px solid #E8730E;border-radius:20px;padding:10px 15px;font-size:14px;color:#333">Dirigeant</div></div>
    <div style="margin-bottom:15px"><div style="border:2px solid #E8730E;border-radius:20px;padding:10px 15px;font-size:14px;color:#333">${email}</div></div>
    <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:20px">
      <div style="width:20px;height:20px;background:#28a745;border-radius:4px;display:flex;align-items:center;justify-content:center;color:white;font-size:12px;flex-shrink:0;margin-top:2px">✓</div>
      <span style="font-size:12px;color:#003DA5">En cochant cette case, j'accepte que mes données soient utilisées et conservées par France compétences. Conditions générales d'utilisation et politique de confidentialité ci-dessous.</span>
    </div>
    <div style="text-align:center;margin-top:15px">
      <div style="border:2px solid #003DA5;border-radius:20px;padding:10px 30px;display:inline-block;font-size:14px;color:#003DA5;cursor:pointer">S'abonner</div>
    </div>
  </div>
</div>`;
}

function screenshotDRIEETS(o: OrganismeInfo, f: FormationInfo): string {
  const email = o.email || "contact@organisme.fr";
  return `
<div style="border:1px solid #ccc;border-radius:6px;padding:30px 40px;max-width:700px;margin:20px auto;font-family:Arial,sans-serif;background:#fff">
  <p style="font-size:13px;color:#555;margin-bottom:25px">○ Un particulier</p>
  <p style="font-weight:bold;font-size:14px;margin-bottom:8px">Adresse email</p>
  <div style="border:2px solid #333;padding:8px 12px;margin-bottom:25px;font-size:14px">${email}</div>
  <p style="font-weight:bold;font-size:13px;margin-bottom:8px;line-height:1.4">Confirmation adresse email<br/>(vérifiez bien qu'il n'y a pas de faute de frappe)<br/>(obligatoire)</p>
  <div style="border:2px solid #0066CC;padding:8px 12px;margin-bottom:25px;font-size:14px">${email}</div>
  <div style="text-align:right;margin-bottom:25px"><div style="border:1px solid #333;display:inline-block;padding:5px 15px;font-size:13px">Valider</div></div>
  <p style="font-weight:bold;font-size:13px;margin-bottom:15px">Déjà plusieurs dizaines de milliers d'inscrits.</p>
  <div style="border:1px solid #ccc;padding:15px;margin-bottom:15px;font-size:12px;color:#333;line-height:1.5">
    Votre adresse de messagerie est uniquement utilisée pour vous envoyer les lettres d'information de la DRIEETS. Vous pouvez à tout moment utiliser le lien de désabonnement intégré dans la newsletter. <a href="#" style="color:#0066CC;text-decoration:underline">En savoir plus sur la gestion de vos données et vos droits</a>.
  </div>
  <div style="background:#1a8a8a;color:white;padding:15px;border-radius:4px;font-size:12px">
    <p style="margin-bottom:5px"><strong>En savoir plus :</strong></p>
    <p>Pour les actualités quotidiennes, abonnez-vous à notre compte <a href="#" style="color:#fff;text-decoration:underline">LinkedIn</a>.</p>
  </div>
</div>`;
}

function screenshotCentreInfoo(o: OrganismeInfo, f: FormationInfo): string {
  const email = o.email || "contact@organisme.fr";
  return `
<div style="border:1px solid #ccc;border-radius:6px;padding:0;max-width:700px;margin:20px auto;font-family:Georgia,serif;background:#fff;overflow:hidden">
  <div style="padding:25px 30px">
    <h2 style="font-size:28px;color:#333;margin-bottom:5px;font-family:Georgia,serif">■ Le Journal de la réforme</h2>
    <p style="font-size:16px;color:#333;line-height:1.5;margin-bottom:10px;font-weight:bold">Le Journal de la réforme vous propose une sélection d'articles : actualités, analyses juridiques, ressources documentaires... suivez la réforme de la formation en vous abonnant à la newsletter envoyée gratuitement tous les mois.</p>
    <p style="font-size:12px;color:#888;margin-bottom:20px">Par Centre Inffo – Le 13 mars 2019.</p>
    <p style="font-size:13px;color:#333;line-height:1.5;margin-bottom:20px">Le Journal de la réforme vous propose une sélection d'articles : actualités, analyses juridiques, ressources documentaires... suivez la réforme de la formation en vous abonnant à la newsletter envoyée gratuitement tous les mois.</p>
    <div style="border:1px solid #ddd;padding:20px;border-radius:6px;margin-top:15px">
      <div style="border:1px solid #ccc;padding:10px 15px;margin-bottom:15px;font-size:14px;border-radius:4px">${email}</div>
      <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:10px">
        <div style="width:18px;height:18px;background:#28a745;border-radius:3px;display:flex;align-items:center;justify-content:center;color:white;font-size:11px;flex-shrink:0;margin-top:2px">✓</div>
        <span style="font-size:12px;color:#333">J'accepte de recevoir vos e-mails et confirme avoir pris connaissance de votre politique de confidentialité et mentions légales.</span>
      </div>
      <p style="font-size:10px;color:#CC0000;margin-bottom:10px">Vous pouvez vous désinscrire à tout moment en cliquant sur le lien présent dans nos emails.</p>
    </div>
  </div>
</div>`;
}

function screenshotMicrosoft(o: OrganismeInfo, f: FormationInfo): string {
  const email = o.email || "contact@organisme.fr";
  return `
<div style="border:1px solid #ccc;border-radius:6px;padding:0;max-width:700px;margin:20px auto;font-family:'Segoe UI',Arial,sans-serif;background:#fff;overflow:hidden">
  <div style="background:#fff;padding:10px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;gap:10px">
    <div style="display:flex;align-items:center;gap:6px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;width:16px;height:16px">
        <div style="background:#F25022"></div><div style="background:#7FBA00"></div>
        <div style="background:#00A4EF"></div><div style="background:#FFB900"></div>
      </div>
      <span style="font-size:14px;color:#333">Microsoft Advertising</span>
    </div>
    <div style="margin-left:auto;display:flex;gap:15px;font-size:12px;color:#555">
      <span>Commencer</span><span>Solutions</span><span>Outils</span><span>Ressources</span><span>Blog</span><span>Support</span>
      <span style="background:#000;color:#fff;padding:3px 10px;border-radius:3px;font-size:11px">S'inscrire</span>
    </div>
  </div>
  <div style="background:#00526b;padding:6px 20px;text-align:center">
    <span style="color:#fff;font-size:11px">Découvrez dès aujourd'hui de nouvelles possibilités de croissance avec Microsoft Advertising &gt;</span>
  </div>
  <div style="padding:30px 40px">
    <h1 style="font-size:28px;font-family:'Segoe UI',Arial,sans-serif;color:#333;margin-bottom:20px;font-weight:300">Microsoft Advertising Insider</h1>
    <p style="font-size:14px;color:#333;line-height:1.6;margin-bottom:5px">Recevez les informations les plus récentes (actualités sur les produits, insights et témoignages) dans votre boîte e-mail.</p>
    <p style="font-size:13px;color:#333;margin-bottom:25px">*Obligatoire</p>
    <p style="font-size:13px;color:#333;margin-bottom:8px">Adresse e-mail*</p>
    <div style="border:1px solid #ccc;padding:10px 15px;margin-bottom:20px;font-size:14px;border-radius:3px">${email}</div>
    <p style="font-size:13px;color:#333;margin-bottom:8px">Pays/Région*</p>
    <div style="border:1px solid #ccc;padding:10px 15px;margin-bottom:20px;font-size:14px;border-radius:3px;display:flex;justify-content:space-between;align-items:center"><span>France</span><span style="color:#999">▼</span></div>
    <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:20px">
      <div style="width:20px;height:20px;background:#00526b;border-radius:3px;display:flex;align-items:center;justify-content:center;color:white;font-size:12px;flex-shrink:0;margin-top:2px">✓</div>
      <span style="font-size:12px;color:#00526b;line-height:1.5">Je recevrai des informations, des conseils et des offres relatifs à Microsoft Advertising et à d'autres produits et services de Microsoft. <a href="#" style="color:#00526b;text-decoration:underline">Déclaration de confidentialité.</a></span>
    </div>
    <div style="border:1px solid #ccc;padding:12px 15px;margin-bottom:20px;border-radius:3px;display:flex;align-items:center;gap:10px;max-width:280px">
      <div style="width:20px;height:20px;background:#28a745;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:12px">✓</div>
      <span style="font-size:13px;color:#333">I'm not a robot</span>
      <span style="margin-left:auto;font-size:9px;color:#999">reCAPTCHA</span>
    </div>
    <div style="background:#00526b;color:white;padding:10px 25px;display:inline-block;border-radius:3px;font-size:14px;cursor:pointer">S'abonner</div>
  </div>
</div>`;
}

function screenshotOpenAI(o: OrganismeInfo, f: FormationInfo): string {
  const email = o.email || "contact@organisme.fr";
  return `
<div style="border:1px solid #ccc;border-radius:6px;padding:40px 30px;max-width:600px;margin:20px auto;font-family:Arial,sans-serif;background:#fff;text-align:center">
  <div style="width:60px;height:60px;margin:0 auto 15px;background:linear-gradient(135deg,#00D4AA,#0088FF);border-radius:50%;display:flex;align-items:center;justify-content:center">
    <div style="width:30px;height:30px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px">🤖</div>
  </div>
  <h1 style="font-size:30px;color:#333;margin-bottom:5px;font-weight:bold">Open AI Digest</h1>
  <p style="font-size:13px;color:#888;margin-bottom:15px">A newsletter by Open AI</p>
  <p style="font-size:16px;color:#333;line-height:1.5;margin-bottom:25px;max-width:450px;margin-left:auto;margin-right:auto">Open AI Digest is your go-to newsletter for staying updated on the latest breakthroughs, trends, and applications in artificial intelligence</p>
  <div style="display:flex;gap:10px;max-width:500px;margin:0 auto 15px;align-items:center">
    <div style="flex:1;background:#f5f5f5;padding:12px 15px;border-radius:6px;text-align:left;font-size:14px;color:#333">${email}</div>
    <div style="background:#222;color:white;padding:12px 20px;border-radius:20px;font-size:13px;display:flex;align-items:center;gap:6px;white-space:nowrap;cursor:pointer">✉ Get this newsletter</div>
  </div>
  <p style="font-size:11px;color:#888;line-height:1.5;max-width:450px;margin:0 auto">By signing up, you will create a Medium account if you don't already have one. Review our <a href="#" style="color:#333;text-decoration:underline">Privacy Policy</a> for more information about our privacy practices.</p>
</div>`;
}

function screenshotAgefiph(o: OrganismeInfo, f: FormationInfo): string {
  const { nom, prenom } = extractNomPrenom(o.dirigeant);
  const email = o.email || "contact@organisme.fr";
  const cp = o.codePostal || "75000";
  return `
<div style="border:1px solid #ccc;border-radius:6px;padding:0;max-width:550px;margin:20px auto;font-family:Arial,sans-serif;background:#fff;overflow:hidden">
  <div style="background:#fff;padding:20px 25px;text-align:center;border-bottom:1px solid #eee">
    <h2 style="font-size:20px;color:#333;font-weight:bold">S'abonner à la lettre d'information</h2>
  </div>
  <div style="padding:25px 30px">
    <div style="text-align:right;margin-bottom:15px"><span style="background:#6B2D8B;color:white;padding:6px 14px;border-radius:20px;font-size:12px">Vers les archives</span></div>
    <p style="font-size:13px;color:#333;margin-bottom:5px">En vous abonnant à la <strong>lettre d'information à destination des entreprises</strong>, vous connaîtrez les dernières nouveautés sur l'Agefiph et ses aides et services.</p>
    <p style="font-size:13px;color:#333;margin-bottom:10px">Vous recevrez régulièrement cette lettre dans votre boite mail.</p>
    <p style="font-size:11px;color:#666;margin-bottom:15px">Les champs marqués d'une étoile ( <span style="color:#CC0000">*</span> ) sont obligatoires.</p>
    <p style="font-size:12px;color:#333;margin-bottom:4px">Adresse de courriel <span style="color:#CC0000">*</span></p>
    <div style="border-bottom:2px solid #333;padding:8px 0;margin-bottom:12px;font-size:14px">${email}</div>
    <p style="font-size:12px;color:#333;margin-bottom:4px">Nom <span style="color:#CC0000">*</span></p>
    <div style="border-bottom:2px solid #333;padding:8px 0;margin-bottom:12px;font-size:14px">${nom || "Nom"}</div>
    <p style="font-size:12px;color:#333;margin-bottom:4px">Prénom <span style="color:#CC0000">*</span></p>
    <div style="border-bottom:2px solid #333;padding:8px 0;margin-bottom:12px;font-size:14px">${prenom || "Prénom"}</div>
    <p style="font-size:12px;color:#333;margin-bottom:4px">Vous êtes <span style="color:#CC0000">*</span></p>
    <div style="border-bottom:2px solid #333;padding:8px 0;margin-bottom:12px;font-size:14px;display:flex;justify-content:space-between;align-items:center"><span>Participant Entreprise privée / Employeur public : Référents handicap</span><span style="color:#999">▼</span></div>
    <p style="font-size:12px;color:#333;margin-bottom:4px">Organisation / Entreprise <span style="color:#CC0000">*</span></p>
    <div style="border-bottom:2px solid #333;padding:8px 0;margin-bottom:12px;font-size:14px;font-weight:bold">${o.nom}</div>
    <p style="font-size:12px;color:#333;margin-bottom:4px">Code postal <span style="color:#CC0000">*</span></p>
    <div style="border-bottom:2px solid #333;padding:8px 0;margin-bottom:12px;font-size:14px">${cp}</div>
    <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:15px">
      <div style="width:16px;height:16px;background:#333;border-radius:2px;display:flex;align-items:center;justify-content:center;color:white;font-size:10px;flex-shrink:0;margin-top:2px">✓</div>
      <span style="font-size:11px;color:#333">J'accepte de recevoir les informations sur les services et aides de l'Agefiph et sur les événements organisés par l'Agefiph. <span style="color:#CC0000">*</span></span>
    </div>
    <div style="border:1px solid #ccc;padding:10px 12px;margin-bottom:15px;border-radius:3px;display:flex;align-items:center;gap:8px;max-width:250px">
      <div style="width:18px;height:18px;background:#28a745;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:11px">✓</div>
      <span style="font-size:12px;color:#333">Je ne suis pas un robot</span>
      <span style="margin-left:auto;font-size:8px;color:#999">reCAPTCHA</span>
    </div>
    <div style="text-align:center"><div style="background:#6B2D8B;color:white;padding:12px 0;border-radius:25px;font-size:14px;cursor:pointer;max-width:350px;margin:0 auto">S'inscrire</div></div>
  </div>
</div>`;
}

// =====================================================
// Main generator: produces a full page of newsletter screenshots
// =====================================================

export function genNewsletterScreenshots(
  o: OrganismeInfo,
  f: FormationInfo,
  category: "réglementaire" | "métier" | "technologique" | "handicap" | "all"
): string {
  const selected = category === "all"
    ? NEWSLETTERS
    : NEWSLETTERS.filter(n => n.category === category);

  const screenshots = selected.map(n => {
    let screenshotHtml = "";
    switch (n.id) {
      case "france_competences": screenshotHtml = screenshotFranceCompetences(o, f); break;
      case "drieets": screenshotHtml = screenshotDRIEETS(o, f); break;
      case "centre_inffo": screenshotHtml = screenshotCentreInfoo(o, f); break;
      case "microsoft": screenshotHtml = screenshotMicrosoft(o, f); break;
      case "openai": screenshotHtml = screenshotOpenAI(o, f); break;
      case "agefiph": screenshotHtml = screenshotAgefiph(o, f); break;
    }
    return `
      <div style="margin-bottom:30px">
        <h3 style="font-size:14px;color:#333;margin-bottom:10px;text-align:center;font-family:Arial,sans-serif">
          ✅ Inscription newsletter – ${n.orgName}
        </h3>
        <div style="box-shadow:0 2px 12px rgba(0,0,0,0.12);border-radius:8px;overflow:hidden">
          ${screenshotHtml}
        </div>
      </div>`;
  }).join("\n");

  const categoryLabel = category === "all" ? "Veille réglementaire, technologique et handicap"
    : category === "réglementaire" ? "Veille réglementaire"
    : category === "technologique" ? "Veille technologique et innovation"
    : category === "handicap" ? "Veille handicap"
    : "Veille métier";

  return buildDocument({
    org: o,
    title: `PREUVES D'INSCRIPTION AUX NEWSLETTERS – ${categoryLabel.toUpperCase()}`,
    sections: [
      {
        heading: "Objet",
        content: `<p>Le présent document atteste de l'inscription de <strong>${o.nom}</strong> aux newsletters professionnelles ci-dessous, dans le cadre de sa démarche de veille ${category === "all" ? "réglementaire, technologique et handicap" : category}.</p>
        <p>Ces inscriptions permettent de suivre l'actualité du secteur de la formation professionnelle et de garantir la conformité aux exigences Qualiopi (Critère 6).</p>`
      }
    ],
    extraHtml: screenshots
  });
}

// Individual generators for each newsletter (for standalone docs)
export function genScreenshotFranceCompetences(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({
    org: o,
    title: "PREUVE D'INSCRIPTION NEWSLETTER – FRANCE COMPÉTENCES",
    sections: [{ heading: "", content: `<p>Capture d'écran de l'inscription à la newsletter France Compétences par <strong>${o.nom}</strong>.</p>` }],
    extraHtml: `<div style="box-shadow:0 2px 12px rgba(0,0,0,0.12);border-radius:8px;overflow:hidden">${screenshotFranceCompetences(o, f)}</div>`
  });
}

export function genScreenshotDRIEETS(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({
    org: o,
    title: "PREUVE D'INSCRIPTION NEWSLETTER – DRIEETS",
    sections: [{ heading: "", content: `<p>Capture d'écran de l'inscription à la newsletter DRIEETS par <strong>${o.nom}</strong>.</p>` }],
    extraHtml: `<div style="box-shadow:0 2px 12px rgba(0,0,0,0.12);border-radius:8px;overflow:hidden">${screenshotDRIEETS(o, f)}</div>`
  });
}

export function genScreenshotCentreInfoo(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({
    org: o,
    title: "PREUVE D'INSCRIPTION NEWSLETTER – CENTRE INFFO",
    sections: [{ heading: "", content: `<p>Capture d'écran de l'inscription à la newsletter Centre Inffo par <strong>${o.nom}</strong>.</p>` }],
    extraHtml: `<div style="box-shadow:0 2px 12px rgba(0,0,0,0.12);border-radius:8px;overflow:hidden">${screenshotCentreInfoo(o, f)}</div>`
  });
}

export function genScreenshotMicrosoft(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({
    org: o,
    title: "PREUVE D'INSCRIPTION NEWSLETTER – MICROSOFT ADVERTISING",
    sections: [{ heading: "", content: `<p>Capture d'écran de l'inscription à la newsletter Microsoft Advertising Insider par <strong>${o.nom}</strong>.</p>` }],
    extraHtml: `<div style="box-shadow:0 2px 12px rgba(0,0,0,0.12);border-radius:8px;overflow:hidden">${screenshotMicrosoft(o, f)}</div>`
  });
}

export function genScreenshotOpenAI(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({
    org: o,
    title: "PREUVE D'INSCRIPTION NEWSLETTER – OPEN AI DIGEST",
    sections: [{ heading: "", content: `<p>Capture d'écran de l'inscription à la newsletter Open AI Digest par <strong>${o.nom}</strong>.</p>` }],
    extraHtml: `<div style="box-shadow:0 2px 12px rgba(0,0,0,0.12);border-radius:8px;overflow:hidden">${screenshotOpenAI(o, f)}</div>`
  });
}

export function genScreenshotAgefiph(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({
    org: o,
    title: "PREUVE D'INSCRIPTION NEWSLETTER – AGEFIPH",
    sections: [{ heading: "", content: `<p>Capture d'écran de l'inscription à la newsletter AGEFIPH par <strong>${o.nom}</strong>.</p>` }],
    extraHtml: `<div style="box-shadow:0 2px 12px rgba(0,0,0,0.12);border-radius:8px;overflow:hidden">${screenshotAgefiph(o, f)}</div>`
  });
}

// ===== CERTIFICAT COURSERA / UCI =====

function certificateMonthYear(f: FormationInfo): string {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() - 2);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

function courseCertificateHtml(o: OrganismeInfo, f: FormationInfo): string {
  const dirigeant = o.dirigeant || "Le Dirigeant";
  const nameUpper = dirigeant.toUpperCase();
  const formationTitle = f.intitule || "Formation professionnelle";
  const monthYear = certificateMonthYear(f);

  return `
<div style="width:100%;max-width:780px;margin:20px auto;font-family:Georgia,'Times New Roman',serif;position:relative;background:#fff;border:1px solid #ddd;box-shadow:0 4px 20px rgba(0,0,0,0.1)">
  <!-- Right ribbon -->
  <div style="position:absolute;top:0;right:0;width:200px;height:100%;background:linear-gradient(180deg,#f5f0e8 0%,#ece6d8 100%);border-left:1px solid #ddd;display:flex;flex-direction:column;align-items:center;padding-top:40px">
    <div style="font-family:Arial,sans-serif;font-weight:700;font-size:14px;letter-spacing:2px;color:#333;text-align:center;line-height:1.4">COURSE<br>CERTIFICATE</div>
    <!-- Coursera seal -->
    <div style="margin-top:60px;width:140px;height:140px;border-radius:50%;border:3px solid #333;display:flex;align-items:center;justify-content:center;position:relative">
      <div style="width:120px;height:120px;border-radius:50%;border:2px dotted #555;display:flex;align-items:center;justify-content:center;flex-direction:column">
        <div style="font-size:7px;letter-spacing:1.5px;color:#444;font-family:Arial,sans-serif;text-transform:uppercase;margin-bottom:2px">· Education for Everyone ·</div>
        <div style="font-family:'Palatino Linotype',Georgia,serif;font-size:18px;font-weight:700;color:#222;letter-spacing:1px">coursera</div>
        <div style="font-size:7px;letter-spacing:1px;color:#555;font-family:Arial,sans-serif;text-transform:uppercase;margin-top:2px">· Course Certificate ·</div>
      </div>
    </div>
    <!-- Hexagon watermark -->
    <div style="margin-top:40px;width:80px;height:90px;opacity:0.08">
      <svg viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg"><polygon points="40,0 80,22 80,68 40,90 0,68 0,22" fill="#333"/></svg>
    </div>
  </div>
  <!-- Main content -->
  <div style="padding:50px 60px 40px 50px;margin-right:200px">
    <!-- UCI Header -->
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:40px">
      <div style="font-family:Arial,Helvetica,sans-serif">
        <span style="font-size:42px;font-weight:900;color:#555;letter-spacing:-1px">UCI</span>
        <span style="font-size:22px;color:#333;margin-left:8px;font-weight:300">Division of<br><span style="margin-left:58px">Continuing Education</span></span>
      </div>
    </div>
    <!-- Date -->
    <div style="font-size:13px;color:#666;margin-bottom:20px;font-family:Arial,sans-serif">${monthYear}</div>
    <!-- Name -->
    <div style="font-size:32px;font-weight:400;color:#111;margin-bottom:10px;letter-spacing:0.5px">${nameUpper}</div>
    <!-- "a réussi" -->
    <div style="font-size:13px;color:#888;font-style:italic;margin-bottom:15px">a réussi</div>
    <!-- Course title -->
    <div style="font-size:16px;color:#222;margin-bottom:15px;line-height:1.5">${formationTitle}</div>
    <!-- Disclaimer -->
    <div style="font-size:10px;color:#999;margin-bottom:60px;line-height:1.6;max-width:420px">
      Cours en ligne sans crédit académique proposé par l'Université de Californie à Irvine via une plateforme intermédiaire.
    </div>
    <!-- Signature -->
    <div style="margin-top:30px">
      <div style="font-family:'Brush Script MT','Segoe Script',cursive;font-size:28px;color:#1a1a4e;margin-bottom:5px;transform:rotate(-2deg)">Roger D. Stone</div>
      <div style="font-size:11px;color:#666;font-family:Arial,sans-serif">Instructor</div>
      <div style="font-size:11px;color:#666;font-family:Arial,sans-serif">University of California Irvine</div>
      <div style="font-size:11px;color:#666;font-family:Arial,sans-serif">Extension</div>
    </div>
    <!-- Verify -->
    <div style="margin-top:50px;text-align:right">
      <div style="font-size:10px;color:#0066cc;font-family:Arial,sans-serif">Verify at</div>
      <div style="font-size:9px;color:#0066cc;font-family:Arial,sans-serif;text-decoration:underline">coursera.org/verify/${Math.random().toString(36).substring(2, 14).toUpperCase()}</div>
      <div style="font-size:8px;color:#999;font-family:Arial,sans-serif;margin-top:4px">Coursera a confirmé l'identité de cette personne et sa<br>participation au cours</div>
    </div>
  </div>
</div>`;
}

export function genCertificatCoursera(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({
    org: o,
    title: "CERTIFICAT DE FORMATION – COURSERA / UCI",
    sections: [{ heading: "", content: `<p>Certificat de réussite Coursera/UCI pour <strong>${o.dirigeant || "le dirigeant"}</strong> – formation « ${f.intitule || "Formation"} ».</p>` }],
    extraHtml: `<div style="box-shadow:0 2px 12px rgba(0,0,0,0.12);border-radius:8px;overflow:hidden">${courseCertificateHtml(o, f)}</div>`
  });
}
